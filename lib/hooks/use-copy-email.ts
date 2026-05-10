import { useCallback, useState } from 'react';
import { CONTACT_EMAIL, CONTACT_EMAIL_COPY_FEEDBACK_MS } from '../contact';

export function useCopyEmail() {
  const [showCopied, setShowCopied] = useState(false);

  const copyEmail = useCallback(() => {
    setShowCopied(true);
    void navigator.clipboard.writeText(CONTACT_EMAIL);
    window.setTimeout(() => {
      setShowCopied(false);
    }, CONTACT_EMAIL_COPY_FEEDBACK_MS);
  }, []);

  return { showCopied, copyEmail };
}
