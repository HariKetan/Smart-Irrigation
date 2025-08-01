import { Router } from 'express';
import { login } from './login';
import { register } from './register';
import { me } from './me';
import usersRouter from './users';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get('/me', me);
router.use('/users', usersRouter);

export default router; 