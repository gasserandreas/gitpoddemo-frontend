import { getUrl, genericJsonFetch, defaultConfig, genericFetch } from '../utils';

const BASE_URL = `${getUrl('backend')}/songs`;

async function getSongs(): Promise<Array<Song>> {
  const songs = await genericJsonFetch(BASE_URL) as Array<Song>;
  return songs;
};

async function createSong(song: NewSong): Promise<Song> {
  const config = {
    ...defaultConfig,
    method: 'POST',
    body: JSON.stringify(song),
  };
  const songs = await genericJsonFetch(BASE_URL, config) as Song;
  return songs;
};

async function updateSong(song: Song): Promise<Song> {
  const config = {
    ...defaultConfig,
    method: 'PUT',
    body: JSON.stringify(song),
  };
  const url = `${BASE_URL}/${song.id}`;
  const songs = await genericJsonFetch(url, config) as Song;
  return songs;
};

async function deleteSong(id: string): Promise<string> {
  const config = {
    ...defaultConfig,
    method: 'DELETE',
  };
  const url = `${BASE_URL}/${id}`;
  await genericFetch(url, config);
  return id;
};

const API = {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
};

export default API;
