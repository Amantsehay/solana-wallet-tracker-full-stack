import { Request, Response } from 'express';
import { addWalletsService, deleteWalletsService} from '../services/walletService';


const addWalletsController = {
  async handleAddWallet(req: Request, res: Response) {
    const { userId, walletAddresses } = req.body;

    // Validate the request
    if (!userId || !walletAddresses || !Array.isArray(walletAddresses)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    try {
      // Call the service to process adding wallets
      const responseMessages = await addWalletsService.addWallets(userId, walletAddresses);
      return res.status(200).json({ messages: responseMessages });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};


const deleteWalletsController = {
  async handleDeleteWallet(req: Request, res: Response) {
    const { userId, walletAddresses } = req.body;

    if (!userId || !walletAddresses || !Array.isArray(walletAddresses)) {
      return res.status(400).json({ message: 'Invalid request data. Provide userId and walletAddresses as an array.' });
    }

    try {
      const { deletedCount, failedAddresses } = await deleteWalletsService(userId, walletAddresses);

      return res.status(200).json({
        message: `${deletedCount} wallet(s) deleted.`,
        failedAddresses,
      });
    } catch (error) {
      console.error('Error in deleteWalletController:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  },
};

// const myWalletController = {
//   async handleShowMyWallet(req: Request, res: Response) {
//     const { userId } = req.body; // Assume the user ID is provided in the request body
    
//     if (!userId) {
//       return res.status(400).json({ message: 'User ID is required' });
//     }

//     const walletMessage = await showMyWallet(userId);

//     if (!walletMessage) {
//       return res.status(404).json({ message: 'No wallet found for the user' });
//     }

//     return res.status(200).json({ message: walletMessage });
//   },

//   async handleShowPrivateKey(req: Request, res: Response) {
//     const { userId } = req.body; // Assume the user ID is provided in the request body

//     if (!userId) {
//       return res.status(400).json({ message: 'User ID is required' });
//     }

//     const privateKeyMessage = await showPrivateKey(userId);

//     if (!privateKeyMessage) {
//       return res.status(404).json({ message: 'No private key found for the user' });
//     }

//     return res.status(200).json({ message: privateKeyMessage });
//   }
// };


export {deleteWalletsController, addWalletsController}
