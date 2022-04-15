import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getApi } from 'services/api';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    search: '',
    page: 0,
    images: [],
    status: Status.IDLE,
  };

  componentDidMount() {
    this.setState({ images: [] });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   const prevSearch = prevProps.onSearchName;
  //   const nextSearch = this.props.onSearchName;
  //   console.log(prevSearch);
  //   // const responce = getApi(nextSearch);
  //   // console.log(responce.hits);

  //   if (prevSearch !== nextSearch) {
  //     this.setState({ status: Status.PENDING });
  //     console.log(prevSearch !== nextSearch);
  //     // try {
  //     //   const responce = getApi(nextSearch);
  //     //   console.log(responce.hits);
  //     //   this.setState(({ images }) => ({
  //     //     images: [...responce.hits, ...images],
  //     //   }));
  //     // } catch (error) {
  //     //   console.log(error);
  //     // }
  //   }
  // }

  // onSearchName = async ({ name }) => {
  //   this.setState({ search: name, page: 1 });
  // };

  onSearchName = async ({ name }) => {
    try {
      const responce = await getApi(name);

      this.setState(({ images }) => ({
        images: [...images, ...responce.hits],
      }));
    } catch (error) {}
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSearchName} />
        <ImageGallery images={this.state.images} />
      </>
    );
  }
}
