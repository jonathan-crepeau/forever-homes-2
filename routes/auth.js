import express from 'express';
const router = express.Router();
import * as authController from '../controllers/Auth';

router.get('/test', authController.test);

export {router}