import express from 'express';
import { sayHello } from '../controllers/controllers';
const router = express.Router();

router.get('/say-hello', sayHello);

export default router;
