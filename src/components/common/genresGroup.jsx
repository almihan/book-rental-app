import React, { Component } from 'react';

const GenresGroup = (props) => {
  const {
    items,
    textProperty,
    valueProperty,
    onItemSeltect,
    selectedItem,
  } = props;
  return (
    <ul className='list-group'>
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            selectedItem === item ? 'list-group-item active' : 'list-group-item'
          }
          onClick={() => onItemSeltect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

GenresGroup.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default GenresGroup;
