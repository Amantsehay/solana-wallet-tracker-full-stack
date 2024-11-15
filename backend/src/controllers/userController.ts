import { Request, Response } from 'express'
import { UserService } from '../services/userService'
import { START_MENU } from '../config/bot-menus'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  public async start(req: Request, res: Response) {
    const { chatId, firstName, lastName, username, userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'Invalid user ID' })
    }

    try {
      // Call the service to handle the business logic
      const messageText = await this.userService.handleStartCommand({
        chatId,
        firstName,
        lastName,
        username,
        userId,
      })

      return res.status(200).json({
        message: messageText,
        reply_markup: START_MENU,
      })
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
}
