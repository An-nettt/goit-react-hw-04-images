import { useEffect } from 'react';
import { Overlay, ModalEl } from './ModalStyled';

export default function Modal({ onClose, children }) {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeydownEscape = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeydownEscape);

    return () => {
      window.removeEventListener('keydown', handleKeydownEscape);
    };
  }, [onClose]);

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalEl>{children}</ModalEl>
    </Overlay>
  );
}
