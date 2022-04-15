// import PropTypes from 'prop-types'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  SearchSection,
  SearchForm,
  SearchButton,
  SearchInput,
  SearchSvg,
} from './Searchbar.styled';

const initialValues = {
  name: '',
};

const validationShema = Yup.object({
  name: Yup.string().required(),
});

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <SearchSection>
      <Formik
        validationSchema={validationShema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <SearchForm>
          <SearchButton type="submit">
            <SearchSvg />
          </SearchButton>
          <SearchInput
            name="name"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchSection>
  );
};
