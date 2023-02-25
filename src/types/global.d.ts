

declare type Song = {
  id: string;
  artist: string;
  name: string;
  learned: boolean;
};

declare type NewSong = {
  artist: string;
  name: string;
  learned: boolean;
};

declare type ById = {
  [id: string]: T,
};

