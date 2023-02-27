import { FC, useCallback, useContext, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';

import Container from '../../components/Loading/Container';

import List from './components/List';
import ListHeader from './components/ListHeader';
import { SongsContext } from './SongsContext';

import * as PATHS from '../../paths';

type SongsProps = {};

const Songs: FC<SongsProps> = () => {
  const { state, actions } = useContext(SongsContext);
  const { songsById, songIds, pending, error } = state;
  const  { deleteSong, setChecked } = actions;
  const navigate = useNavigate();

  const handleOnItemClick = useCallback((id: string) => {
    const path = `${PATHS.SONGS}/${id}`;
    navigate(path);
  }, [navigate]);

  const songs = songIds.map((id) => songsById[id]);

  return (
    <Box>
      <ListHeader />
      <Container
        error={error}
        pending={pending}
      >
        <List
          songs={songs}
          onItemClick={handleOnItemClick}
          onDelete={deleteSong}
          onCheck={setChecked}
        />
      </Container>
    </Box>
  );
};

export default Songs;
