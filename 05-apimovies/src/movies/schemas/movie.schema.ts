import { Schema } from 'mongoose';

export const MovieSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, default: new Date().getFullYear() },
    director: { type: String, required: true },
    plot: { type: String, required: true },
    poster: { type: String, required: true },
    genres: [{ type: String, required: true }],
    imdb: {
      rating: { type: Number, required: true },
      votes: { type: Number, required: true },
    },
    favorite: { type: Boolean, default: false },
    /*
  El versionkey detecta la version que tenemos y si queremos cambiarla
   */
  },
  { versionKey: false },
);
