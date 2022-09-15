import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import AddedIcon from '@mui/icons-material/Add';

import operations from 'redux/operations';

function AddRowButton() {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(operations.generateOneRow());
  }, [dispatch]);

  return <>
    <IconButton onClick={handleClick} color="primary" aria-label="add row">
      <AddedIcon />
    </IconButton>
  </>
}

export default AddRowButton;
