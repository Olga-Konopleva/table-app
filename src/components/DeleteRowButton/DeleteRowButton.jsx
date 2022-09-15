import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/RemoveCircleOutline';
import actions from 'redux/actions';

function DeleteRowButton({ id }) {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(actions.deleteRow(id));
  }, [dispatch, id]);

  return <>
    <IconButton aria-label="delete" size="small" onClick={handleClick}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  </>
}

DeleteRowButton.propTypes = {
  id: PropTypes.string.isRequired,
}

export default DeleteRowButton;