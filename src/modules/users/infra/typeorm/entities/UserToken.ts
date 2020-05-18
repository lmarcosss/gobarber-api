import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm'

@Entity('user_tokens')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @Generated('uuid')
  token: string

  @Column()
  userId: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date
}

export default User
