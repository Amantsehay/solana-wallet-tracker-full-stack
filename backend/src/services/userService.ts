import { PrismaUserRepository } from '../repositories/prisma/user'
import { GeneralMessages } from '../bot/messages/general-messages'

interface StartCommandPayload {
  chatId: number
  firstName: string
  lastName: string
  username: string
  userId: string
}

export class UserService {
  private prismaUserRepository: PrismaUserRepository
  private generalMessages: GeneralMessages

  constructor() {
    this.prismaUserRepository = new PrismaUserRepository()
    this.generalMessages = new GeneralMessages()
  }

  public async handleStartCommand({
    chatId,
    firstName,
    lastName,
    username,
    userId,
  }: StartCommandPayload): Promise<string> {
    // Check if user exists
    const user = await this.prismaUserRepository.getById(userId)

    // If user doesn't exist, create a new user
    if (!user) {
      await this.prismaUserRepository.create({ firstName, id: userId, lastName, username })
    }

    // Generate and return the welcome message
    return this.generalMessages.sendStartMessage()
  }
}
