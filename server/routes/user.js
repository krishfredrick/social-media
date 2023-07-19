import express from 'express'
import{
  getUsers,
  getUserFollower,
  addRemoveFollower,
} from '../controllers/user.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router();

router.get('/:id', verifyToken, getUsers);
router.get('/:id/follower', verifyToken, getUserFollower);
router.patch('/id/:follwerId', verifyToken, addRemoveFollower)


export default router;

