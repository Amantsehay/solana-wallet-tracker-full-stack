import express from 'express';
import { addWalletController } from "../controllers/addWalletController";

const router = express.Router();

router.post('/add-wallet', addWalletController.handleAddWallet);

export default router;
