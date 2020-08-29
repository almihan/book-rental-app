import React, { Component } from 'react';

const Input = (props) => {
  return (
    <div className='form-group'>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        id={props.name}
        type={props.type}
        className='form-control'
      />
      {props.errors && <div className='alert alert-danger'>{props.errors}</div>}
    </div>
  );
};

export default Input;
