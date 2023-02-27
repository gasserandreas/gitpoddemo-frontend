import { FC, useCallback, useContext } from 'react';
import { useNavigate, Link } from "react-router-dom";

import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';

import { SongsContext } from '../../SongsContext';

import * as PATHS from '../../../../paths';
import SORT_ORDER from '../../../../constants/sortOrder';

type ListHeaderProps = {};

const ListHeader: FC<ListHeaderProps> = () => {
  const { state, actions } = useContext(SongsContext);
  const { sortOrder } = state;
  const { setSortOrder } = actions;

  const handleOnChangeSortOrder = useCallback((event: SelectChangeEvent) => {
    const value = event.target.value as SORT_ORDER;
    setSortOrder(value);
  }, [setSortOrder]);

  return (
    <Box display="flex" flex="row" justifyContent="space-between">
      <Box display="flex" flex={1} alignItems="baseline">
        <Typography variant="body1">Ordered by:</Typography>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sortOrder}
          onChange={handleOnChangeSortOrder}
          label=""
          size="small"
        >
          <MenuItem value={SORT_ORDER.ASC}>asc</MenuItem>
          <MenuItem value={SORT_ORDER.DESC}>desc</MenuItem>
        </Select>
        </Box>
      <Box display="flex" flex={1} alignItems="baseline" justifyContent="flex-end">
        <Link to={`${PATHS.SONGS}/add`}>Add new Song</Link>
      </Box>
    </Box>
  )
};

export default ListHeader;
