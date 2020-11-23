import 'reflect-metadata';
import express, { NextFunction, Request, response, Response } from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import routes from './routes/index';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/files', express.static(uploadConfig.directory));

app.get('/', (req, res) => res.json({ message: 'Funcionando!!' }));

app.use(routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Erro interno no servidor',
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando (3000)!');
});
