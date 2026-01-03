import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export const useKonamiCode = () => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeySequence((prev) => {
        const updated = [...prev, e.key];
        if (updated.length > KONAMI_CODE.length) {
          updated.shift();
        }
        return updated;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (JSON.stringify(keySequence) === JSON.stringify(KONAMI_CODE)) {
      setSuccess(true);
      // Reset after animation usually
      setTimeout(() => setSuccess(false), 5000);
    }
  }, [keySequence]);

  return success;
};