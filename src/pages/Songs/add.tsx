import { FC, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Form from './components/Form';
import { SongsContext } from './SongsContext';

import * as PATHS from '../../paths';

const Add: FC = () => {
  const navigate = useNavigate();

  const { state, actions } = useContext(SongsContext);
  const { songsById, pending, error } = state;
  const { createSong } = actions;

  const [song, setSong] = useState<NewSong>({
    name: '',
    artist: '',
    learned: false,
  });

  const handleOnChange = useCallback((newSong: NewSong) => {
    setSong(newSong);
  }, []);

  const handleOnSave = useCallback(() => {
    createSong(song)
    navigate(PATHS.SONGS);
  }, [song]);

  return (
    <Box>
      <Typography variant="h5">Details</Typography>
      <Form initialSong={song} onChange={handleOnChange} />
      <Box flex="1" flexDirection="row-reverse">
        <Button
          color="primary"
          variant="contained"
          onClick={handleOnSave}
        >Save</Button>
      </Box>
    </Box>
  );
};

export default Add;
