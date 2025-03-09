import { Event } from '../models/calendari';
import { Model, DataTypes } from 'sequelize';
import { Request, Response } from 'express';

const EventController = {
  // Obtenir tots els esdeveniments
  getEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Afegir un nou esdeveniment
  addEvent: async (req, res) => {
    try {
      const { titol, data, descripcio } = req.body;
      const newEvent = await Event.create({ titol, data, descripcio });
      res.status(201).json(newEvent);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Eliminar un esdeveniment
  deleteEvent: async (req, res) => {
    try {
      const { id } = req.params;
      await Event.destroy({ where: { id } });
      res.status(204).send(); // 204: No Content
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = EventController;