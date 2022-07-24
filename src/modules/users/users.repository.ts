import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Database } from '../../DB';

export class UsersRepository {
  private static initialVersion = 1;

  private static generateDefaultUser() {
    const now = Date.now();
    return {
      id: uuidv4(),
      version: this.initialVersion,
      createdAt: now,
      updatedAt: now,
    };
  }

  static getById(id: string) {
    return Database.usersTable.get(id);
  }

  static getAll() {
    return Array.from(Database.usersTable.values());
  }

  static removeById(id: string) {
    return Database.usersTable.delete(id);
  }

  static create(user: CreateUserDto) {
    const newUser = { ...user, ...this.generateDefaultUser() };
    Database.usersTable.set(newUser.id, newUser);
    return newUser;
  }

  static update(id: string, updatedUser: User) {
    Database.usersTable.set(id, updatedUser);
    return updatedUser;
  }
}
