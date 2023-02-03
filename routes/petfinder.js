import express from 'express';
const router = express.Router();
import * as petfinderAuth from '../controllers/Petfinder';

router.post('/test', petfinderAuth.test);
router.get('/token', petfinderAuth.getToken);
router.get('/petData', petfinderAuth.basePetData);
router.post('/queryPetData', petfinderAuth.queryPetData )

export { router }
