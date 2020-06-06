import { ObjectId } from 'mongodb'

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO'

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = []

 

  public async create ({ content, recipientId }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification()
    
    Object.assign(notification, { id: new ObjectId(), content, recipientId })
    
    this.notifications.push(notification)
    

    return notification
  }

}

export default NotificationsRepository
