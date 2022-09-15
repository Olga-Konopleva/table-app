import { v4 as uuidv4 } from 'uuid';
import actions from './actions';

const {
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
} = actions;

const generateTableRow = (columns) => {
  const id = uuidv4().slice(30);
  const element = { key: id, rows: [] };
  let sum = 0;
  // let mean = 0;
  for (let i = 0; i < columns; i += 1) {
    const randomNumber = Math.random() * (999 - 100) + 100;
    const cell = { id: uuidv4(), amount: Number.parseInt(randomNumber) };
    sum += cell.amount;
    // mean = sum/i;
    element.rows.push(cell);
  }

  element.sum = sum;

  element.rows.forEach(cell => {
    const percent = Math.round((cell.amount / sum) * 100);
    cell.percent = `${percent}%`;
  })

  return element;
}

const generateOneRow = () => (dispatch, getState) => {
  dispatch(addedTableRowRequest());

  try {
    const columns = getState().table.params.columns;
    const element = generateTableRow(columns);

    dispatch(addedTableRowSuccess(element));
  } catch (error) {
    dispatch(addedTableRowError(error));
  }
}

const generateTableData = ({ rows, columns }) => dispatch => {
  dispatch(generateTableDataRequest());

  const data = [];

  try {
    for (let i = 0; i < (rows + 1); i += 1) {
      const row = generateTableRow(columns);
      data.push(row);
    }

    dispatch(generateTableDataSuccess(data));
  } catch (error) {
    dispatch(generateTableDataError(error));
  }
};

const updateCellData = (data) => (dispatch, getState) => {
  dispatch(oneClickCellRequest());

  try {
    const row = getState().table.data.find((el) => el.rows.includes(data));
    const index = row.rows.indexOf(data);
    const payload = { key: row.key, data, index }

    dispatch(oneClickCellSuccess(payload));
  } catch (error) {
    dispatch(oneClickCellError(error));
  }
}

const findFloorAmounts = (data) => (dispatch, getState) => {
  dispatch(findFloorAmountsRequest());
  const highlights = getState().table.params.highlights;
  const tableBodyCells = getState().table.data;

  const allCells = tableBodyCells.slice(0, tableBodyCells.length - 1).flatMap(el => el.rows);

  const arrWithDiff = allCells.map((el) => ({ ...el, diff: Math.abs(data.amount - el.amount) }));
  arrWithDiff.sort((a, b) => a.diff - b.diff).shift();
  const amounts = arrWithDiff.slice(0, highlights);
  arrWithDiff.forEach((el) => delete el.diff);

  try {
    dispatch(findFloorAmountsSuccess(amounts));
  } catch (error) {
    dispatch(findFloorAmountsError(error));
  }
}

const operations = {
  generateOneRow,
  generateTableData,
  updateCellData,
  findFloorAmounts,
}

export default operations;