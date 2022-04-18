import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalImageWrap, Overlay, ModalImage } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    modalImage: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <ModalImageWrap>
          <ModalImage src={this.props.modalImage} />
        </ModalImageWrap>
      </Overlay>,
      modalRoot
    );
  }
}
