import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getApi } from 'services/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Main } from './App.styled';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { Modal } from './Modal/Modal';
import * as Scroll from 'react-scroll';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  LOADER: 'loader',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    search: '',
    modalImage: '',
    page: 1,
    images: [],
    error: null,
    showModal: false,

    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const nextSearch = this.state.search;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch) {
      this.setState({ images: [] });
      this.loadImage();
    }

    if (nextPage > prevPage) {
      this.loadImage();
    }
  }

  loadImage = () => {
    const { search, page } = this.state;
    this.setState({ status: Status.PENDING });

    getApi(search, page)
      .then(res => {
        this.setState(prevState => ({
          images: [...prevState.images, ...res],
          status: Status.RESOLVED,
        }));
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  loadMore = () => {
    Scroll.animateScroll.scrollMore(500);
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSearchName = async ({ name }) => {
    this.setState({ search: name, page: 1 });
  };

  togleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  modalImage = image => {
    this.setState({ modalImage: image });
  };

  render() {
    const { status, error, showModal, modalImage, images } = this.state;

    return (
      <Main>
        <Searchbar onSubmit={this.onSearchName} />
        {images.length > 0 && (
          <ImageGallery
            images={images}
            modalImage={this.modalImage}
            togleModal={this.togleModal}
          />
        )}
        {status === Status.PENDING && <Loader />}
        {status === Status.RESOLVED && <Button onClick={this.loadMore} />}
        {status === Status.REJECTED && <ErrorMessage message={error.message} />}
        {showModal && (
          <Modal onClose={this.togleModal} modalImage={modalImage} />
        )}
      </Main>
    );
  }
}
