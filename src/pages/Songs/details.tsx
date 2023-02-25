import { FC, useCallback, useContext, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

import Container from '../../components/Loading/Container';

import Form from './components/Form';
import { SongsContext } from './SongsContext';

const SAVE_TIMEOUT = 1000;

const Details: FC = () => {
  const { songId } = useParams();
  const { state, actions } = useContext(SongsContext);
  const { songsById, pending, error } = state;
  const { updateSong } = actions;

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const song = useMemo(() => {
    if (!songId) return null;
    return songsById[songId];
  },[songId, songsById]);

  const handleOnChange = useCallback((updatedSong: Song | NewSong) => {
    const newSong: Song = {
      ...song,
      ...updatedSong
    } as Song;
    
    /**
     * clean existing timeout before adding update call
     * into new timeout
     */
    const { current } = timeoutRef;
    if (current) {
      clearTimeout(current);
    }
    timeoutRef.current = setTimeout(() => {
      updateSong(newSong);
    }, SAVE_TIMEOUT);
  }, []);

  return (
    <Box>
      <Container pending={pending} error={error}>
        <Typography variant="h5">Details</Typography>
        { !song
          ? <Alert severity="info">No song found with id: {songId}</Alert>
          : <Form initialSong={song} onChange={handleOnChange} />
        }
      </Container>
    </Box>
  );
};

export default Details;
