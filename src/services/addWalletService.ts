import { PrismaWalletRepository } from '../repositories/prisma/wallet'
import { PublicKey } from '@solana/web3.js';
import { BANNED_WALLETS } from '../constants/banned-wallets';
import { GeneralMessages } from '../bot/messages/general-messages';
import { UserPlan } from '../lib/user-plan';

const prismaWalletRepository = new PrismaWalletRepository();
const userPlan = new UserPlan();
const generalMessages = new GeneralMessages();

export const addWalletService = {
  async addWallets(userId: string, walletEntries: string[]): Promise<string[]> {
    const responses: string[] = [];
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

    for (const entry of walletEntries) {
      const [walletAddress, walletName] = entry.split(' ');

      // Check if the wallet address is banned
      if (BANNED_WALLETS.has(walletAddress)) {
        responses.push(generalMessages.sendBotWalletError());
        continue;
      }

      // Validate wallet address format
      if (!base58Regex.test(walletAddress)) {
        responses.push(`😾 Address provided is not a valid Solana wallet.`);
        continue;
      }

      // Check plan limits for user
      const planWallets = await userPlan.getUserPlanWallets(userId);
      const userWallets = await prismaWalletRepository.getUserWallets(userId);
      if (userWallets && userWallets.length >= planWallets) {
        responses.push(generalMessages.sendWalletLimitMessageError(walletName, walletAddress, planWallets));
        continue;
      }

      // Check if wallet is valid and on Solana's curve
      const isValidWallet =
        PublicKey.isOnCurve(new PublicKey(walletAddress).toBytes());
      if (!isValidWallet) {
        responses.push(`😾 Address provided is not a valid Solana wallet`);
        continue;
      }

      // Check if the wallet is already tracked
      const isWalletAlready = await prismaWalletRepository.getUserWalletById(userId, walletAddress);
      if (isWalletAlready) {
        responses.push(`🙀 You already follow the wallet: ${walletAddress}`);
        continue;
      }

      // Add wallet to the database
      await prismaWalletRepository.create(userId, walletAddress, walletName);
      responses.push(`🎉 Wallet ${walletAddress} has been added.`);
    }

    return responses;
  },
};
