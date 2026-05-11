import { CopyEmailButton } from '../shared/copy-email-button';
import { ExternalLink } from '../shared/external-link';
import { Tagline } from '../shared/tagline';
import Experience from './experience';
import { HeroName } from './hero-name';
import { NormCoreSticker } from './sticker';
import Work from './work';

const Content = () => {
  return (
    <figure className="hero-figure">
      {/* <Frit /> */}
      <div className="content-container">
        <div className="hero-intro">
          <div className="hero-lead">
            <HeroName />

            <Tagline>{'SOFTWARE // DESIGN // MKTG'}</Tagline>
            <CopyEmailButton />
          </div>
        </div>

        <ExternalLink href="/static/pdfs/david-budimir-resume.pdf" className="resume" ariaLabel="Download resume (PDF)">
          resume
        </ExternalLink>

        <Experience />
        <Work />

        <div className="norm-core-sticker-slot">
          <NormCoreSticker />
        </div>
      </div>
    </figure>
  );
};

export default Content;
