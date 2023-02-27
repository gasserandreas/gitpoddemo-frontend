import { ChangeEvent, ChangeEventHandler, FC, useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type FormProps = {
  initialSong: Song | NewSong,
  onChange: (song: Song | NewSong) => void,
}

const SongForm: FC<FormProps> = ({ initialSong, onChange }) => {
  const [song, setSong] = useState(initialSong || {
    name: '',
    artist: '',
    learned: false,
  });

  const handleOnNameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    const newSong: Song | NewSong = {
      ...song,
      name: newValue,
    };
    setSong(newSong);
    onChange(newSong);
  }, [song]);

  const handleOnArtistChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    const newSong = {
      ...song,
      artist: newValue,
    };
    setSong(newSong);
    onChange(newSong);
  }, [song]);

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate
    >
      <TextField
        required
        id="outlined-required"
        label="Name"
        value={song.name}
        onChange={handleOnNameChange}
        margin="normal"
        fullWidth
      />
      <TextField
        required
        id="outlined-required"
        label="Artist"
        value={song.artist}
        onChange={handleOnArtistChange}
        margin="normal"
        fullWidth
      />
    </Box>
  )
};

export default SongForm;
