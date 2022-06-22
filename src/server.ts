/* eslint-disable no-console */
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouther from './routers/auth-router';
import config from './config';
import placesRouter from './routers/places-router';
import itemsRouter from './routers/items-router';

const server = express();

// Middlewares
server.use(cors());
server.use(morgan(':method :url :status'));
server.use(express.static('public'));
server.use(express.json());
server.use('/api/auth', authRouther);
server.use('/api/places', placesRouter);
server.use('/api/items', itemsRouter);

mongoose.connect(
  config.db.connectionUrl,
  {
    retryWrites: true,
    w: 'majority',
  },
  (error) => {
    if (error) {
      console.log(`Error while connecting to database:\n${error.message}`);
      return;
    }
    console.log('Successfully connected to MongoDB');
    server.listen(1337, () => console.log(`Appliaction server is running on: ${config.server.domain}`));
  },
);
