import { useSelector } from 'react-redux';

import Container from 'components/Container';
import TableForm from 'components/TableForm';
import Table from 'components/Table';

import selectors from './redux/selectors';


function App() {
  const table = useSelector(selectors.getTableData);
  return (
    <Container>
      <header>
        <h1 style={{ textAlign: 'center', color: '#1976d2'}}>
          Table
        </h1>
      </header>

      <TableForm />

      {Object.keys(table).length > 0 && <Table />}

    </Container>
  );
}

export default App;