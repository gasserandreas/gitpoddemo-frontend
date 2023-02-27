import { FC } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

type ContainerProps = {
  pending: boolean,
  error: string | null,
  children: any,
};

const Container: FC<ContainerProps> = ({ children, pending, error }) => {
  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (pending) {
    return <CircularProgress />;
  }

  return children;
};

export default Container;
