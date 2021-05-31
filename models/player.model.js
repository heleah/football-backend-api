import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
  name: String,
  price: Number,
  freeTransfer: Boolean,
  club: String,
  position: String,
  skills: Array,
  email: String,
});

const Player = mongoose.model('player', playerSchema);

export default Player;
