import express from 'express';
const router = express.Router();
import * as petfinderAuth from '../controllers/Petfinder';

router.get('/test', petfinderAuth.test);
router.get('/token', petfinderAuth.getToken);

export { router }
