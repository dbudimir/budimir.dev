import { ExternalLink } from '../shared/external-link';
import Experience from './experience';
import Frit from './frit';
import { HeroName } from './hero-name';
import { NormCoreSticker } from './sticker';
import Work from './work';

const Content = () => {
  return (
    <figure className="hero-figure">
      <Frit />
      <div className="content-container">
        <div className="hero-intro">
          <HeroName />

          <div className="norm-core-sticker-slot">
            <NormCoreSticker />
          </div>
        </div>

        <ExternalLink href="/static/pdfs/david-budimir-resume.pdf" className="resume" ariaLabel="Download resume (PDF)">
          resume
        </ExternalLink>

        <Experience />
        <Work />
      </div>
    </figure>
  );
};

export default Content;
