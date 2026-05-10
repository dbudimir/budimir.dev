'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';

const IS_DEV = process.env.NODE_ENV === 'development';
const DEV_STORAGE_KEY = 'frit-dev-tuning-v5';
const DEV_PANEL_VISIBLE_KEY = 'frit-dev-panel-visible';

// Dot color knob — accepts any CSS color (var, hex, rgba, etc).
const DOT_COLOR = 'var(--color-text)';

// Frit canvas dimensions in CSS pixels. Fixed so the entire pattern (focal,
// spans, hole, mask) renders at the same absolute size and position regardless
// of viewport. The canvas is anchored to the top-right of its parent and
// extends down-and-left from there.
const FRIT_WIDTH = 1440;
const FRIT_HEIGHT = 900;

const FritWrapper = styled.div`
  position: absolute;
  top: -30px;
  right: -18px;
  width: ${FRIT_WIDTH}px;
  height: ${FRIT_HEIGHT}px;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  opacity: var(--opacity-faded);
  
  svg {
    display: block;
  }
`;

export type FritTuning = {
  /** Frit anchor X (where dots are largest), as fraction of frit layer width. */
  focalXMul: number;
  /** Frit anchor Y (where dots are largest), as fraction of frit layer height. */
  focalYMul: number;
  /** Ellipse semi-axis on the X axis, × frit layer width. */
  spanTopMul: number;
  /** Ellipse semi-axis on the Y axis, × frit layer height. */
  spanRightMul: number;
  /** Falloff using ellipse norm: 0 at focal, 1 on the boundary `(ux/spanX)² + (vy/spanY)² = 1`. */
  cornerExponent: number;
  /** Softens the outer boundary (px), scaled against the smaller ellipse axis. */
  edgeFeatherPx: number;
  /** Hole center X (the masked shape the frit wraps around), × frit layer width. */
  holeCenterXMul: number;
  /** Hole center Y, × frit layer height. */
  holeCenterYMul: number;
  /** Hole horizontal radius, × min(viewport width, height). Set to 0 to disable. */
  holeRadiusMul: number;
  /** Hole vertical radius, × min(viewport width, height). */
  holeRadiusYMul: number;
  /** Superellipse exponent: 1=diamond, 2=ellipse, 4=squircle, ∞=rectangle. */
  holeShapeExponent: number;
  /** Softens the hole edge (px). */
  holeFeatherPx: number;
};

/** Defaults; dev panel overrides via state / localStorage. */
export const DEFAULT_FRIT_TUNING: FritTuning = {
  focalXMul: 1,
  focalYMul: 0,
  spanTopMul: 0.49,
  spanRightMul: 0.5,
  cornerExponent: 0.6,
  edgeFeatherPx: 15,
  holeCenterXMul: 0.7173817051159366,
  holeCenterYMul: 0.43314277590818273,
  holeRadiusMul: 0.44,
  holeRadiusYMul: 0.425,
  holeShapeExponent: 9,
  holeFeatherPx: 34,
};

const FRIT_TUNING_KEYS = [
  'focalXMul',
  'focalYMul',
  'spanTopMul',
  'spanRightMul',
  'cornerExponent',
  'edgeFeatherPx',
  'holeCenterXMul',
  'holeCenterYMul',
  'holeRadiusMul',
  'holeRadiusYMul',
  'holeShapeExponent',
  'holeFeatherPx',
] as const;

interface Dot {
  cx: number;
  cy: number;
  r: number;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/** Unit superellipse path (rx=ry=1). Caller stretches it via the SVG viewBox. */
function superellipseUnitPath(exponent: number, samples = 96): string {
  const n = Math.max(0.5, exponent);
  const inv = 2 / n;
  let path = '';
  for (let i = 0; i < samples; i++) {
    const theta = (i / samples) * Math.PI * 2;
    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const x = Math.sign(cosT) * Math.abs(cosT) ** inv;
    const y = Math.sign(sinT) * Math.abs(sinT) ** inv;
    path += `${i === 0 ? 'M' : 'L'}${x.toFixed(4)} ${y.toFixed(4)}`;
  }
  return `${path}Z`;
}

function generateDots(width: number, height: number, tuning: FritTuning): Dot[] {
  const dots: Dot[] = [];
  const spacing = width < 640 ? 8 : 10;
  const rowSpacing = (spacing * Math.sqrt(3)) / 2;
  const maxDotRadius = spacing * 0.38;

  const focalX = width * tuning.focalXMul;
  const focalY = height * tuning.focalYMul;
  const spanX = Math.max(width * tuning.spanTopMul, spacing);
  const spanY = Math.max(height * tuning.spanRightMul, spacing);

  const holeX = width * tuning.holeCenterXMul;
  const holeY = height * tuning.holeCenterYMul;
  const minDim = Math.min(width, height);
  const holeRX = minDim * tuning.holeRadiusMul;
  const holeRY = minDim * tuning.holeRadiusYMul;
  const holeN = Math.max(0.5, tuning.holeShapeExponent);
  const holeInvN = 1 / holeN;
  const holeFeather = tuning.holeFeatherPx;
  const holeActive = holeRX > 0 && holeRY > 0;
  const holeMinR = Math.min(holeRX, holeRY);

  const cols = Math.ceil(width / spacing) + 2;
  const rows = Math.ceil(height / rowSpacing) + 2;

  const feather = tuning.edgeFeatherPx;
  const featherNorm = feather > 0 ? feather / Math.min(spanX, spanY) : 0;
  const blobOuterCutoff = 1 + featherNorm;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const xOffset = (row % 2) * (spacing / 2);
      const cx = col * spacing + xOffset;
      const cy = row * rowSpacing;

      if (cx > width + spacing || cy > height + rowSpacing) continue;

      const ux = cx - focalX;
      const vy = cy - focalY;
      const norm = Math.hypot(ux / spanX, vy / spanY);

      let insideBlob: number;
      if (feather <= 0) {
        if (norm > 1) continue;
        insideBlob = 1;
      } else {
        if (norm > blobOuterCutoff) continue;
        insideBlob = 1 - smoothstep(1 - featherNorm, 1 + featherNorm, norm);
      }

      let outsideHole = 1;
      if (holeActive) {
        const dxN = Math.abs(cx - holeX) / holeRX;
        const dyN = Math.abs(cy - holeY) / holeRY;
        const holeNorm = (dxN ** holeN + dyN ** holeN) ** holeInvN;
        if (holeFeather <= 0) {
          if (holeNorm < 1) continue;
        } else {
          const featherNorm = holeFeather / holeMinR;
          outsideHole = smoothstep(1 - featherNorm, 1 + featherNorm, holeNorm);
          if (outsideHole <= 0) continue;
        }
      }

      const t = Math.min(1, norm);
      const rRaw = insideBlob * outsideHole * (1 - t) ** tuning.cornerExponent * maxDotRadius;

      if (rRaw < 0.45) continue;

      // Round to keep SSR and client byte-identical: Math.pow isn't required
      // to be correctly-rounded across engines, so the last ulp of `rRaw`
      // can differ between Node and the browser and break hydration.
      const r = Math.round(rRaw * 10000) / 10000;

      dots.push({ cx, cy, r });
    }
  }

  return dots;
}

const HoleHandle = styled.div<{ $x: number; $y: number; $rx: number; $ry: number; $dragging: boolean }>`
  position: absolute;
  left: ${p => p.$x - p.$rx}px;
  top: ${p => p.$y - p.$ry}px;
  width: ${p => p.$rx * 2}px;
  height: ${p => p.$ry * 2}px;
  pointer-events: auto;
  cursor: ${p => (p.$dragging ? 'grabbing' : 'grab')};
  z-index: 99998;
  touch-action: none;
  user-select: none;
  background: transparent;

  svg {
    width: 100%;
    height: 100%;
    display: block;
    overflow: visible;
  }

  path {
    fill: rgba(165, 180, 252, 0.08);
    stroke: rgba(165, 180, 252, 0.85);
    stroke-dasharray: 4 4;
    stroke-width: 1.5;
    vector-effect: non-scaling-stroke;
    transition: ${p => (p.$dragging ? 'none' : 'fill 0.15s ease, stroke 0.15s ease')};
  }

  &:hover path {
    fill: rgba(165, 180, 252, 0.18);
    stroke: rgba(199, 210, 254, 1);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 6px;
    height: 6px;
    margin: -3px 0 0 -3px;
    border-radius: 50%;
    background: rgba(165, 180, 252, 0.95);
    pointer-events: none;
  }
`;

const DevPanel = styled.aside`
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: 99999;
  pointer-events: auto;
  width: min(300px, calc(100vw - 24px));
  max-height: min(640px, calc(100vh - 24px));
  overflow: auto;
  padding: 10px 12px;
  border-radius: 10px;
  font-family: ui-monospace, monospace;
  font-size: 11px;
  line-height: 1.35;
  color: #e8e8ec;
  background: rgba(22, 22, 28, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
`;

const DevPanelHeaderActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: flex-end;
`;

const DevPeekButton = styled.button`
  position: fixed;
  right: 12px;
  bottom: 12px;
  z-index: 99999;
  pointer-events: auto;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(22, 22, 28, 0.92);
  color: #a5b4fc;
  border-radius: 8px;
  padding: 6px 10px;
  font-family: ui-monospace, monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35);

  &:hover {
    background: rgba(36, 36, 44, 0.96);
    color: #c7d2fe;
  }
`;

const DevPanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #a5b4fc;
`;

const DevRow = styled.label`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px 10px;
  align-items: center;
  margin-bottom: 8px;

  span:first-child {
    opacity: 0.85;
  }

  span:last-child {
    font-variant-numeric: tabular-nums;
    opacity: 0.95;
    min-width: 3.2rem;
    text-align: right;
  }

  input[type='range'] {
    grid-column: 1 / -1;
    width: 100%;
    accent-color: #818cf8;
  }
`;

const DevActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const DevButton = styled.button`
  pointer-events: auto;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.06);
  color: #e8e8ec;
  border-radius: 6px;
  padding: 5px 8px;
  font: inherit;
  font-size: 10px;

  &:hover {
    background: rgba(255, 255, 255, 0.12);
  }
`;

function loadDevPanelVisible(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const v = localStorage.getItem(DEV_PANEL_VISIBLE_KEY);
    if (v === null) return false;
    return v === '1';
  } catch {
    return false;
  }
}

function loadDevTuning(): FritTuning {
  const base: FritTuning = { ...DEFAULT_FRIT_TUNING };
  if (typeof window === 'undefined') return base;
  try {
    const raw = localStorage.getItem(DEV_STORAGE_KEY);
    if (!raw) return base;
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    for (const key of FRIT_TUNING_KEYS) {
      const v = parsed[key];
      if (typeof v === 'number' && Number.isFinite(v)) {
        base[key] = v;
      }
    }
    // Migration: when Y radius wasn't stored, mirror X so the hole stays circular.
    if (!('holeRadiusYMul' in parsed) && typeof parsed.holeRadiusMul === 'number') {
      base.holeRadiusYMul = parsed.holeRadiusMul as number;
    }
    return base;
  } catch {
    return base;
  }
}

function FritDevControls({
  tuning,
  onChange,
  onHide,
}: {
  tuning: FritTuning;
  onChange: (next: FritTuning) => void;
  onHide: () => void;
}) {
  const set = useCallback(
    <K extends keyof FritTuning>(key: K, value: FritTuning[K]) => {
      onChange({ ...tuning, [key]: value });
    },
    [onChange, tuning],
  );

  const reset = useCallback(() => {
    try {
      localStorage.removeItem(DEV_STORAGE_KEY);
    } catch {
      /* ignore */
    }
    onChange({ ...DEFAULT_FRIT_TUNING });
  }, [onChange]);

  const copyJson = useCallback(() => {
    void navigator.clipboard.writeText(JSON.stringify(tuning, null, 2));
  }, [tuning]);

  const sliders: {
    key: keyof FritTuning;
    label: string;
    min: number;
    max: number;
    step: number;
    fmt: (v: number) => string;
  }[] = [
    {
      key: 'focalXMul',
      label: 'Frit X position (× width)',
      min: 0,
      max: 1,
      step: 0.01,
      fmt: v => v.toFixed(2),
    },
    {
      key: 'focalYMul',
      label: 'Frit Y position (× height)',
      min: 0,
      max: 1,
      step: 0.01,
      fmt: v => v.toFixed(2),
    },
    {
      key: 'spanTopMul',
      label: 'Spread X (× width)',
      min: 0.06,
      max: 1.5,
      step: 0.01,
      fmt: v => v.toFixed(2),
    },
    {
      key: 'spanRightMul',
      label: 'Spread Y (× height)',
      min: 0.06,
      max: 1.5,
      step: 0.01,
      fmt: v => v.toFixed(2),
    },
    {
      key: 'cornerExponent',
      label: 'Falloff exponent',
      min: 0.5,
      max: 3.5,
      step: 0.05,
      fmt: v => v.toFixed(2),
    },
    {
      key: 'edgeFeatherPx',
      label: 'Outer boundary feather (px)',
      min: 0,
      max: 80,
      step: 1,
      fmt: v => String(Math.round(v)),
    },
    {
      key: 'holeCenterXMul',
      label: 'Hole X position (× width)',
      min: 0,
      max: 1,
      step: 0.01,
      fmt: v => v.toFixed(2),
    },
    {
      key: 'holeCenterYMul',
      label: 'Hole Y position (× height)',
      min: 0,
      max: 1,
      step: 0.01,
      fmt: v => v.toFixed(2),
    },
    {
      key: 'holeRadiusMul',
      label: 'Hole radius X (× min dim)',
      min: 0,
      max: 0.5,
      step: 0.005,
      fmt: v => v.toFixed(3),
    },
    {
      key: 'holeRadiusYMul',
      label: 'Hole radius Y (× min dim)',
      min: 0,
      max: 0.5,
      step: 0.005,
      fmt: v => v.toFixed(3),
    },
    {
      key: 'holeShapeExponent',
      label: 'Hole shape (2=ellipse, 4=squircle, ∞=rect)',
      min: 1,
      max: 10,
      step: 0.1,
      fmt: v => v.toFixed(1),
    },
    {
      key: 'holeFeatherPx',
      label: 'Hole feather (px)',
      min: 0,
      max: 80,
      step: 1,
      fmt: v => String(Math.round(v)),
    },
  ];

  return (
    <DevPanel aria-label="Frit tuning (dev only)">
      <DevPanelHeader>
        <span>Frit (dev)</span>
        <DevPanelHeaderActions>
          <DevButton type="button" onClick={onHide}>
            Hide
          </DevButton>
          <DevButton type="button" onClick={reset}>
            Reset
          </DevButton>
        </DevPanelHeaderActions>
      </DevPanelHeader>
      {sliders.map(s => (
        <DevRow key={s.key}>
          <span>{s.label}</span>
          <span>{s.fmt(tuning[s.key])}</span>
          <input
            type="range"
            min={s.min}
            max={s.max}
            step={s.step}
            value={tuning[s.key]}
            onChange={e => set(s.key, Number(e.target.value) as FritTuning[typeof s.key])}
          />
        </DevRow>
      ))}
      <DevActions>
        <DevButton type="button" onClick={copyJson}>
          Copy JSON
        </DevButton>
      </DevActions>
    </DevPanel>
  );
}

const Frit = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [devTuning, setDevTuning] = useState<FritTuning>(DEFAULT_FRIT_TUNING);
  const [devPanelVisible, setDevPanelVisible] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragOffsetRef = useRef({ dx: 0, dy: 0 });

  useEffect(() => {
    if (!IS_DEV) {
      setHydrated(true);
      return;
    }
    setDevTuning(loadDevTuning());
    setDevPanelVisible(loadDevPanelVisible());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!IS_DEV || !hydrated) return;
    try {
      localStorage.setItem(DEV_STORAGE_KEY, JSON.stringify(devTuning));
    } catch {
      /* ignore quota */
    }
  }, [devTuning, hydrated]);

  useEffect(() => {
    if (!IS_DEV || !hydrated) return;
    try {
      localStorage.setItem(DEV_PANEL_VISIBLE_KEY, devPanelVisible ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [devPanelVisible, hydrated]);

  const tuning = IS_DEV && hydrated ? devTuning : DEFAULT_FRIT_TUNING;

  const dots = useMemo(() => generateDots(FRIT_WIDTH, FRIT_HEIGHT, tuning), [tuning]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!wrapperRef.current) return;
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      const rect = wrapperRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      const holeX = FRIT_WIDTH * devTuning.holeCenterXMul;
      const holeY = FRIT_HEIGHT * devTuning.holeCenterYMul;
      dragOffsetRef.current = { dx: localX - holeX, dy: localY - holeY };
      setDragging(true);
    },
    [devTuning.holeCenterXMul, devTuning.holeCenterYMul],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging || !wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;
      const nextX = (localX - dragOffsetRef.current.dx) / FRIT_WIDTH;
      const nextY = (localY - dragOffsetRef.current.dy) / FRIT_HEIGHT;
      setDevTuning(prev => ({
        ...prev,
        holeCenterXMul: Math.max(0, Math.min(1, nextX)),
        holeCenterYMul: Math.max(0, Math.min(1, nextY)),
      }));
    },
    [dragging],
  );

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setDragging(false);
  }, []);

  const holePath = useMemo(() => superellipseUnitPath(devTuning.holeShapeExponent), [devTuning.holeShapeExponent]);

  const showHoleHandle =
    IS_DEV && hydrated && devPanelVisible && devTuning.holeRadiusMul > 0 && devTuning.holeRadiusYMul > 0;
  const minDimPx = Math.min(FRIT_WIDTH, FRIT_HEIGHT);
  const holePxRX = minDimPx * devTuning.holeRadiusMul;
  const holePxRY = minDimPx * devTuning.holeRadiusYMul;
  const handleRX = Math.max(14, holePxRX);
  const handleRY = Math.max(14, holePxRY);

  return (
    <>
      <FritWrapper ref={wrapperRef} aria-hidden="true">
        <svg width={FRIT_WIDTH} height={FRIT_HEIGHT}>
          <title>Frit pattern</title>
          {dots.map(dot => (
            <circle key={`${dot.cx}-${dot.cy}`} cx={dot.cx} cy={dot.cy} r={dot.r} fill={DOT_COLOR} />
          ))}
        </svg>
        {showHoleHandle ? (
          <HoleHandle
            $x={FRIT_WIDTH * devTuning.holeCenterXMul}
            $y={FRIT_HEIGHT * devTuning.holeCenterYMul}
            $rx={handleRX}
            $ry={handleRY}
            $dragging={dragging}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            aria-label="Drag to reposition frit hole"
            role="slider"
          >
            <svg viewBox="-1 -1 2 2" preserveAspectRatio="none">
              <title>Hole shape</title>
              <path d={holePath} />
            </svg>
          </HoleHandle>
        ) : null}
      </FritWrapper>
      {IS_DEV && hydrated ? (
        devPanelVisible ? (
          <FritDevControls tuning={devTuning} onChange={setDevTuning} onHide={() => setDevPanelVisible(false)} />
        ) : (
          <DevPeekButton type="button" onClick={() => setDevPanelVisible(true)} aria-label="Show frit dev panel">
            Frit dev
          </DevPeekButton>
        )
      ) : null}
    </>
  );
};

export default Frit;
