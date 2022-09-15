import { useCallback, useMemo, memo } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './SummaryCell.module.css';
import actions from 'redux/actions';

import DeleteRowButton from 'components/DeleteRowButton';
import AddRowButton from 'components/AddRowButton';

const SummaryCell = memo(({ data, id, isAddRowButton, isDeleteRowButton }) => {
  const dispatch = useDispatch();
  const sum = useMemo(() => data.reduce((acc, el) => acc + el.amount, 0), [data]);
  const isButtonsCell = isAddRowButton || isDeleteRowButton;

  // console.log('render SummaryCell')

  const handleMouseOver = useCallback(() => {
    if (isButtonsCell) return;
    dispatch(actions.setRowSumHoverId(id));
  }, [dispatch, id, isButtonsCell]);

  const handleMouseOut = useCallback(() => {
    if (isButtonsCell) return;
    dispatch(actions.setRowSumHoverId(null));
  }, [dispatch, isButtonsCell])

  const classes = () => {
    const classes = isButtonsCell ? [styles.footerCell] : [styles.sumCell];
    if (isAddRowButton) classes.push(styles.right);
    return classes.join(' ');
  }

  return <td
    className={classes()}
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
  >
    {!isButtonsCell && sum}
    {isDeleteRowButton && <DeleteRowButton id={id} />}
    {isAddRowButton && <AddRowButton />}
  </td>
})

SummaryCell.propTypes = {
  oneRowData: PropTypes.array,
  id: PropTypes.string,
  isAddRowButton: PropTypes.bool,
  isDeleteRowButton: PropTypes.bool,
}

export default SummaryCell;