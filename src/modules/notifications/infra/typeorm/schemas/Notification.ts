import { ObjectID, Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn } from 'typeorm'

@Entity('notifications')
class Notification {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  content: string

  @Column({ type: 'uuid', name: 'recipient_id'})
  recipientId: string 

  @Column({ default: false })
  read: boolean

  @CreateDateColumn('create_at')
  createdAt: Date

  @UpdateDateColumn('updated_at')
  updatedAt: Date

}

export default Notification