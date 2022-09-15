import { memo } from 'react'
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import SummaryCell from 'components/Table/SummaryCell';
import TableOneCell from 'components/Table/TableOneCell';

import selectors from 'redux/selectors';


const TableRow = memo(({ oneRowData, id, highlights }) => {
  const tableFooterData = useSelector(selectors.getTableFooterData);
  const isSummaryCell = tableFooterData === oneRowData;

  const check = (id) => {
    if (!highlights) return;

    let result;

    highlights.forEach((cell) => {
      if (cell.id === id) result = true;
    })

    return result;
  }

  // console.log('render TableRow')

  return <tr>
    {oneRowData.map((el, index) =>
      <TableOneCell
        key={el.id}
        rowId={id}
        {...check(el.id) && { highlights: true }}
        index={index}
        data={el}
        isSummary={isSummaryCell}
      />)}


    {isSummaryCell ? <SummaryCell id={id} data={oneRowData} isAddRowButton={isSummaryCell} /> : <>
      <SummaryCell id={id} data={oneRowData} />
      <SummaryCell id={id} data={oneRowData} isDeleteRowButton />
    </>}
  </tr>
})

TableRow.propTypes = {
  oneRowData: PropTypes.array.isRequired,
  id: PropTypes.string,
}

export default TableRow;