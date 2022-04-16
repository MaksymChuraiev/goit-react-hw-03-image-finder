import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getApi } from 'services/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Main } from './App.styled';

import { smoothScroll } from 'services/scroll';

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
    page: 1,
    images: [],
    status: Status.IDLE,
  };

  componentDidMount() {
    this.setState({ images: [] });
  }

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
    smoothScroll();
  }

  loadImage = () => {
    const { search, page } = this.state;
    this.setState({ status: Status.PENDING });

    getApi
      .api(search, page)
      .then(res => {
        this.setState(prevState => ({
          images: [...prevState.images, ...res.data.hits],
          status: Status.RESOLVED,
        }));
      })
      .catch(this.setState({ status: Status.REJECTED }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSearchName = async ({ name }) => {
    this.setState({ search: name, page: 1 });
  };

  render() {
    const { status } = this.state;
    return (
      <Main>
        <Searchbar onSubmit={this.onSearchName} />
        {status === Status.RESOLVED && (
          <ImageGallery images={this.state.images} />
        )}
        {status === Status.PENDING && <Loader />}
        <Button onClick={this.loadMore} />
      </Main>
    );
  }
}
