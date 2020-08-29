import React, { Component } from 'react';
import { render } from '@testing-library/react';

const SearchBox = (props) => {
  const { value, onChange } = props;

  return (
    <input
      type='text'
      name='query'
      className='form-control my-3'
      placeholder='Search...'
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
