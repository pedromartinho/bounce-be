import express from 'express';
import { env } from '../../configs/env.config';
import OrderController from '../controllers/order.controller';

const router = express.Router();

router.get('/', (_, res) => res.json([` Welcome to Bounce Challenge API - ${env.node}!`]));
router.use(`/api/orders`, OrderController.register());

export { router };