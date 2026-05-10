// =============================================================================
// Job Types
// =============================================================================

export interface JobLink {
  linkText: string;
  url: string;
}

export interface Job {
  company: string;
  companySubTitle?: string;
  role: string;
  location: string;
  dates: string;
  desc: string;
  bullets?: string[];
  tags?: string[];
  link: JobLink;
}

// =============================================================================
// Project Types
// =============================================================================

export interface ProjectImage {
  src: string;
  alt: string;
  height: number;
  width: number;
}

export interface ProjectLink {
  linkText: string;
  url: string;
}

export type VideoSource = { kind: 'youtube'; id: string } | { kind: 'mp4'; src: string };

export interface Project {
  title: string;
  video: VideoSource | null;
  images: ProjectImage[];
  description: string[];
  tags: string[];
  links: ProjectLink[];
}
