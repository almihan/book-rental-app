import React, { Component } from 'react';
import TabelHeader from './tableHeader';
import TabelBody from './tableBody';

const Table = ({ columns, sortColumn, onSort, data }) => {
  return (
    <table className='table'>
      <TabelHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TabelBody data={data} columns={columns} />
    </table>
  );
};

export default Table;
