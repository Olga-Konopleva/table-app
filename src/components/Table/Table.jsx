import { useSelector } from 'react-redux';

import styles from './Table.module.css';
import selectors from 'redux/selectors';

import TableRow from 'components/Table/TableRow';

function Table() {
  const tableBodyData = useSelector(selectors.getTableBodyData);
  const tableFooterData = useSelector(selectors.getTableFooterData);
  const tableParams = useSelector(selectors.getTableParams);
  const floorAmounts = useSelector(selectors.getFloorAmounts);

  const checkHihglights = (rows) => {
    let highlightsCells = [];

    floorAmounts.forEach((el) => {
      if (rows.find((cell) => cell.id === el.id)) {
        highlightsCells.push(rows.find((cell) => cell.id === el.id));
      }
    })

    return highlightsCells;
  };

  // console.log('render Table');

  return <div className={styles.scrollWrapper}>

    <table className={styles.table}>
      <thead className={styles.visuallyHidden}>
        <tr>
          <th colSpan={tableParams.columns}>amount</th>
        </tr>
      </thead>
      <tbody>
        {tableBodyData.map((el) => <TableRow key={el.key} id={el.key} oneRowData={el.rows} {...checkHihglights(el.rows).length > 0 && { highlights: checkHihglights(el.rows) }} />)}
      </tbody>
      <tfoot>
        <TableRow oneRowData={tableFooterData} />
      </tfoot>
    </table>
  </div>
}

export default Table;