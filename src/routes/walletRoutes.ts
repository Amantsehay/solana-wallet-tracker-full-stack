import express from 'express';
import { addWalletsController, deleteWalletsController } from "../controllers/walletController";

const router = express.Router();

router.post('/add-wallet', addWalletsController.handleAddWallet);
router.delete('/delete-wallets', deleteWalletsController.handleDeleteWallet);


export default router;
