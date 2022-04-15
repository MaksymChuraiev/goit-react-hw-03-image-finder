import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImage, largeImage }) => {
  return (
    <GalleryItem>
      <GalleryImage src={smallImage} />
    </GalleryItem>
  );
};
