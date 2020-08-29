import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';
import Select from './select';

class Form extends Component {
  state = { data: {}, errors: {} };
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = (name, value) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    if (!error) return null;
    return error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(
      e.currentTarget.name,
      e.currentTarget.value
    );
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors: errors || {} });
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className='btn btn-primary'>
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = 'text') => {
    return (
      <Input
        type={type}
        name={name}
        value={this.state.data[name]}
        label={label}
        onChange={this.handleChange}
        errors={this.state.errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    return (
      <Select
        name={name}
        value={this.state.data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        errors={this.state.errors[name]}
      />
    );
  };
}

export default Form;
