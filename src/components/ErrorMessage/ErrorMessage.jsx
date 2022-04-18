import { ErrorThumb, ErrorText } from './ErrorMessage.styled';
import PropTypes from 'prop-types';

export const ErrorMessage = ({ message }) => {
  return (
    <ErrorThumb>
      <ErrorText>{message}</ErrorText>
    </ErrorThumb>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
