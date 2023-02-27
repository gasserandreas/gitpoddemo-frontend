import { createContext, useContext } from 'react';

import SongsAPI from './SongsAPI';

type APIContextProps = {
  apis: {
    SongsAPI: typeof SongsAPI | null,
  },
};

export const APIContext = createContext<APIContextProps>({
  apis: {
    SongsAPI: null,
  },
});

export const useAPIContext = () => useContext(APIContext)
