import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import operations from 'redux/operations';
import actions from 'redux/actions'

import Button from '@mui/material/Button';
import styles from './TableForm.module.css';

function TableForm() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [highlights, setHighlights] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    const data = {
      rows: Number(rows),
      columns: Number(columns),
      highlights: Number(highlights),
    };

    dispatch(actions.writeTableParams(data));
    dispatch(operations.generateTableData(data));
  }

  const handleChange = useCallback((evt) => {
    const { name, value } = evt.target;
    switch (name) {
      case 'rows':
        setRows(value);
        break;

      case 'columns':
        setColumns(value);
        break;

      case 'highlights':
        setHighlights(value);
        break;

      default:
        console.warn(`No field in this name: ${name}`);
    }
  }, [])

  return (
    <section className={styles.wrapper}>
      <form onSubmit={evt => handleSubmit(evt)} className={styles.form}>
        <div>
          <label className={styles.formItem}>
            <span className={styles.fieldTitle}>Rows</span>
            <input type="number"
              value={rows} name="rows"
              onChange={handleChange} 
              className={styles.formInput}
            />
          </label>

          <label className={styles.formItem}>
            <span className={styles.fieldTitle}>Columns</span>
            <input type="number"
              value={columns}
              name="columns"
              onChange={handleChange}
              className={styles.formInput}
            />
          </label>

          <label className={styles.formItem}>
            <span className={styles.fieldTitle}>Highlights</span>
            <input type="number"
              value={highlights}
              name="highlights"
              onChange={handleChange}
              className={styles.formInput}
            />
          </label>
        </div>

        <Button variant="contained" type="submit">Create</Button>
      </form>
    </section>
  )
}

export default TableForm;