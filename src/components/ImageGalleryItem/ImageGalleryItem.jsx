import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  smallImage,
  largeImage,
  togleModal,
  modalImage,
}) => {
  return (
    <GalleryItem>
      <GalleryImage
        src={smallImage}
        onClick={() => {
          togleModal();
          modalImage(largeImage);
        }}
      />
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  togleModal: PropTypes.func.isRequired,
  modalImage: PropTypes.func.isRequired,
};
