import { FC, createContext, useState, useEffect, useMemo, useCallback } from "react";

import { useAPIContext } from '../../apis/useAPI';

import SORT_ORDER from '../../constants/sortOrder';

/**
 * define context and return components
 */

type SongsContextProviderType = {
  children: any,
};

type SongContextType = {
  state: {
    pending: boolean,
    error: string | null,
    sortOrder: SORT_ORDER,
    songIds: Array<string>,
    songsById: {[id: string]: Song},
  },
  actions: {
    getSongs: () => ({}) | void,
    createSong: (newSong: NewSong) => ({}) | void,
    updateSong: (song: Song) => ({}) | void,
    setChecked: (id: string, checked: boolean) => ({}) | void,
    deleteSong: (id: string) => ({}) | void,
    setSortOrder: (sortOrder: SORT_ORDER) => ({}) | void,
  },
};

const SongsContext = createContext<SongContextType>({
  state: {
    pending: false,
    error: null,
    songIds: [],
    sortOrder: SORT_ORDER.ASC,
    songsById: {},
  },
  actions: {
    getSongs: () => ({}),
    createSong: () => ({}),
    updateSong: () => ({}),
    setChecked: () => ({}),
    deleteSong: () => ({}),
    setSortOrder: () => ({}),
  },
});

const SongsContextProvider: FC<SongsContextProviderType> = ({ children }) => {
  const { apis: { SongsAPI } } = useAPIContext();

  if (!SongsAPI) {
    throw new Error('SongsAPI is undefined');
  }

  /**
   * define data
   */
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SORT_ORDER>(SORT_ORDER.ASC);
  const [songsById, setSongsById] = useState<{[id: string]: Song}>({});
  const [songIds, setSongIds] = useState<Array<string>>([]);

  /**
   * define actions
   */
  const updateSortOrder = useCallback(() => {
    const sortedSongs = Object.values(songsById)
      .sort((songA: Song, songB: Song) => {
        if (songA.name < songB.name) return 1;
        return -1;
      });
    
    if (sortOrder === SORT_ORDER.DESC) {
      sortedSongs.reverse();
    }

    setSongIds(sortedSongs.map((song: Song) => song.id));
  }, [songsById, sortOrder]);

  const getSongs = useCallback(() => {
    setPending(true);
    SongsAPI.getSongs()
      .then((fetchedSongs) => {
        const songsById = fetchedSongs.reduce((prev: {[id: string]: Song}, cur: Song) => ({
          ...prev,
          [cur.id]: cur,
        }), {} as {[id: string]: Song});
        setSongsById(songsById);
        setError(null);
      })
      .catch((error) => {
        setSongsById({});
        setError(error.message);
      })
      .finally(() => {
        setPending(false);
      });
  }, [SongsAPI]);

  const createSong = useCallback((newSong: NewSong) => {
    const prevSongsById = { ...songsById };

    setPending(true);

    return SongsAPI.createSong(newSong)
      .then((createdSong) => {
        setError(null);
        setSongsById({
          ...songsById,
          [createdSong.id]: createdSong,
        });
        return createdSong;
      })
      .catch((error) => {
        setError(error.message);
        setSongsById(prevSongsById);
      })
      .finally(() => {
        setPending(false);
      })
  }, [SongsAPI, songsById]);

  const updateSong = useCallback((newSong: Song) => {
    const prevSongsById = { ...songsById };

    setSongsById({
      ...songsById,
      [newSong.id]: newSong,
    });

    setPending(true);

    SongsAPI.updateSong(newSong)
      .then((updatedSong) => {
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setSongsById(prevSongsById);
      })
      .finally(() => {
        setPending(false);
      })
  }, [SongsAPI, songsById]);

  const setChecked = useCallback((id: string, checked: boolean) => {
    const newSong: Song = {
      ...songsById[id],
      learned: checked,
    };

    return updateSong(newSong);
  }, [updateSong, songsById]);

  const deleteSong = useCallback((id: string) => {
    const prevSongsById = { ...songsById };
    const newSongsById = { ...songsById };
    delete newSongsById[id];

    setPending(true);
    setSongsById(newSongsById);

    SongsAPI.deleteSong(id)
      .then(() => {
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setSongsById(prevSongsById);
      })
      .finally(() => {
        setPending(false);
      })
  }, [SongsAPI, songsById]);

  /**
   * handle data effects
   */
  useEffect(() => {
    updateSortOrder();
  }, [songsById, sortOrder]);

  /**
   * define context data
   */
  const state = useMemo(() => ({
    pending,
    error,
    songsById,
    songIds,
    sortOrder,
  }), [pending, error, songsById, songIds]);

  const actions = useMemo(() => ({
    getSongs,
    createSong,
    updateSong,
    setChecked,
    deleteSong,
    setSortOrder,
  }), [getSongs, updateSong, setChecked, deleteSong]);

  const value: SongContextType = useMemo(() => ({
    state,
    actions,
  }), [state, actions]);

  return (
    <SongsContext.Provider value={value}>
      {children}
    </SongsContext.Provider>
  );
};

export {
  SongsContext,
  SongsContextProvider,
};
