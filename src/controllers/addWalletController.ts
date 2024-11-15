import { Request, Response } from 'express';
import { addWalletService } from '../services/addWalletService';

export const addWalletController = {
  async handleAddWallet(req: Request, res: Response) {
    const { userId, walletEntries } = req.body;

    // Validate the request
    if (!userId || !walletEntries || !Array.isArray(walletEntries)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    try {
      // Call the service to process adding wallets
      const responseMessages = await addWalletService.addWallets(userId, walletEntries);
      return res.status(200).json({ messages: responseMessages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};
