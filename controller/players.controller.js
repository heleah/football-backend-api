import mongoose from 'mongoose';
import Player from '../models/player.model.js';

function getPlayers(req, res) {
  Player.find()
    .then((players) => res.json(players))
    .catch((error) =>
      res.json({ success: false, message: 'Could not retrieve players' })
    );
}

function getPlayer(req, res) {
  const { playerId } = req.params;
  Player.findById(playerId)
    .then((player) => res.json(player))
    .catch((error) =>
      res.json({ success: false, message: '400: Player not found' })
    );
}

function postPlayer(req, res) {
  const newPlayer = new Player({
    name: req.body.name,
    price: req.body.price,
    freeTransfer: req.body.freeTransfer,
    club: req.body.club,
    position: req.body.position,
    skills: req.body.skills,
    email: req.body.email,
  });
  newPlayer
    .save()
    .then((savedPlayer) => res.json(savedPlayer))
    .catch((error) =>
      res.json({ success: false, message: 'Could not save player to database' })
    );
}

function updatePlayer(req, res) {
  const { playerId } = req.params;
  const updatedPlayer = req.body;
  Player.findByIdAndUpdate({ _id: playerId }, updatedPlayer, (error, doc) => {
    if (error) {
      res.json({ success: false, message: 'Could not update this player.' });
      return;
    }
    res.json(doc);
  });
}

function deletePlayer(req, res) {
  const { playerId } = req.params;
  Player.findByIdAndDelete({ _id: playerId }, (error, doc) => {
    if (error) {
      res.json({ success: false, message: 'Could not delete this player' });
      return;
    }
    res.json({
      success: true,
      message: `Player ${doc.name} has been deleted`,
      data: doc,
    });
  });
}

export { getPlayers, getPlayer, postPlayer, updatePlayer, deletePlayer };
