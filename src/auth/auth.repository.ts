import { Repository } from 'typeorm'
import { type User } from './auth.entity'

export class UserRepository extends Repository<User> {

}
