import { FC } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

type SongsListProps = {
  songs: Array<Song>,
  onDelete: (id: string) => void,
  onCheck: (id: string, checked: boolean) => void,
  onItemClick: (id: string) => void,
}

const  SongsList:FC<SongsListProps> = ({ songs, onDelete, onCheck, onItemClick }) => (
  <List>
    {songs
      .map((song) =>{
        if (!song) return null;
        return (
          <ListItem
            secondaryAction={
              <IconButton onClick={() => onDelete(song.id)} edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
            key={`song-list-item-${song.id}`}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={song.learned}
                tabIndex={-1}
                disableRipple
                onClick={() => onCheck(song.id, !song.learned)}
              />
            </ListItemIcon>
            <ListItemText
              primary={song.name}
              secondary={song.artist}
              onClick={() => onItemClick(song.id)}
            />
          </ListItem>
        );
    })}
  </List>
);

export default SongsList;
