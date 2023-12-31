import express from 'express'
import{
  getUsers,
  getUserFollower,
  addRemoveFollower,
} from '../controllers/user.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/:id', verifyToken, getUsers);
router.get('/:id/followers', verifyToken, getUserFollower);
router.patch('/id/:followerId', verifyToken, addRemoveFollower)


export default router;

