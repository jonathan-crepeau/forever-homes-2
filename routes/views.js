import express from 'express';
const router = express.Router();
import * as viewsController from '../controllers/Views';

router.get('/test', viewsController.test);
router.get('/', viewsController.root);
// router.get('/signup', viewsController.signup);
router.get('/login', viewsController.login);
router.get('/search', viewsController.search);
router.get('/profile', viewsController.profile);

export {router}