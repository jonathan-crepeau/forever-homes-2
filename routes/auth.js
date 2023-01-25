import express from 'express';
const router = express.Router();
import * as authController from '../controllers/Auth';

router.get('/test', authController.test);
router.post('/signup', authController.signup);
router.post('/login', authController.createSession);
router.get('/verify', authController.verify);
router.delete('/logout', authController.deleteSession);


export {router}