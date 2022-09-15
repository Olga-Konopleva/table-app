import { useMemo, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './TableOneCell.module.css';
import selectors from 'redux/selectors';
import operations from 'redux/operations';

const TableOneCell = memo(({ data, isSummary, index, rowId, highlights }) => {
  const dispatch = useDispatch();
  const tableBodyData = useSelector(selectors.getTableBodyData);
  const rowSumHover = useSelector(selectors.getRowHoverId);

  // console.log('render TableOneCell')

  const handleClick = () => {
    dispatch(operations.updateCellData(data));
  }

  const handleHover = () => {
    if (isSummary) return;
    dispatch(operations.findFloorAmounts(data))
  }

  const calculate = useMemo(() => (index) => {
    const oneColumn = tableBodyData.map(el => el.rows[index]);
    return oneColumn.reduce((acc, el) => acc += el.amount, 0);
  }, [tableBodyData])

  const classes = () => {
    const classes = isSummary ? [styles.summary] : [styles.cell];
    if (highlights) classes.push(styles.highlight);
    if (rowSumHover === rowId) classes.push(styles.rowId);
    return classes.join(' ');
  }

  const sum = isSummary
    ? calculate(index)
    : (rowSumHover === rowId ? data.percent : data.amount);

  return <td
    style={{ '--percent': sum }}
    className={classes()}
    onMouseOver={handleHover}
    onClick={handleClick}>{sum}
  </td>
})

TableOneCell.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    percent: PropTypes.string,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  isSummary: PropTypes.bool,
  index: PropTypes.number,
  rowId: PropTypes.string,
  highlights: PropTypes.bool,
}

export default TableOneCell;