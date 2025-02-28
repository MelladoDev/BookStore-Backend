import express from 'express';
import AuthController from '../Controllers/authController.js';

const router = express.Router();

router.post('/', AuthController.login);

export default router;
