import { createSelector } from '@reduxjs/toolkit';

const getTableData = state => state.table.data;

const getTableBodyData = createSelector(
  [getTableData],
  (data) => data.slice(0, data.length - 1)
);

const getTableFooterData = createSelector(
  [getTableData],
  (data) => data.slice(-1)[0].rows
);

const getTableParams = state => state.table.params;

const getRowHoverId = state => state.rowHoverId;

const getFloorAmounts = state => state.floorAmounts;


const selectors = {
  getTableData,
  getTableBodyData,
  getTableFooterData,
  getTableParams,
  getRowHoverId,
  getFloorAmounts,
}

export default selectors;