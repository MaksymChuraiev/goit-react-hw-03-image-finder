import { LoadMore, LoadMoreWrap } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <LoadMoreWrap>
      <LoadMore onClick={onClick}>LoadMore</LoadMore>
    </LoadMoreWrap>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
