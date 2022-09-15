import { createAction } from '@reduxjs/toolkit';

const writeTableParams = createAction('writeTableParams');

const setRowSumHoverId = createAction('setRowSumHoverId');

const deleteRow = createAction('deleteRow');

const addedTableRowRequest = createAction('addedTableRowRequest');
const addedTableRowSuccess = createAction('addedTableRowSuccess');
const addedTableRowError = createAction('addedTableRowError');

const generateTableDataRequest = createAction('generateTableDataRequest');
const generateTableDataSuccess = createAction('generateTableDataSuccess');
const generateTableDataError = createAction('generateTableDataError');

const oneClickCellRequest = createAction('oneClickCellRequest');
const oneClickCellSuccess = createAction('oneClickCellSuccess');
const oneClickCellError = createAction('oneClickCellError');

const findFloorAmountsRequest = createAction('findFloorAmountsRequest');
const findFloorAmountsSuccess = createAction('findFloorAmountsSuccess');
const findFloorAmountsError = createAction('findFloorAmountsError');

const actions = {
  writeTableParams,
  setRowSumHoverId,
  deleteRow,

  generateTableDataRequest,
  generateTableDataSuccess,
  generateTableDataError,

  oneClickCellRequest,
  oneClickCellSuccess,
  oneClickCellError,

  findFloorAmountsRequest,
  findFloorAmountsSuccess,
  findFloorAmountsError,

  addedTableRowRequest,
  addedTableRowSuccess,
  addedTableRowError,
};

export default actions;