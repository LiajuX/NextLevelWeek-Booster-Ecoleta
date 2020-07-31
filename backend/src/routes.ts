import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// index, show, create, update, delete

// Listar itens de coleta
routes.get('/items', itemsController.index);

// Cadastro do ponto de coleta
routes.post('/points', pointsController.create);
// Listar pontos filtrando por estado/cidade/itens
routes.get('/points', pointsController.index);
// Listar um ponto de coleta específico
routes.get('/points/:id', pointsController.show);


export default routes;