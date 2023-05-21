// import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from 'components/Modal/Modal';
import {
  ImageGalleryItemEl,
  ImageGalleryItemImage,
} from './ImageGalleryItemStyled';

export default function ImageGalleryItem({ img, largeImg, tags }) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <ImageGalleryItemEl onClick={openModal}>
        <ImageGalleryItemImage src={img} alt={tags} />
      </ImageGalleryItemEl>
      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImg} alt={tags} />
        </Modal>
      )}
    </>
  );
}

// ImageGalleryItem.propTypes = {
//   showModal: PropTypes.bool.isRequired,
// };
