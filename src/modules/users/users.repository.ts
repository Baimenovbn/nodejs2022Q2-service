import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

export class UsersRepository {
  private static userTable = new Map<string, User>();
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
    return this.userTable.get(id);
  }

  static getAll() {
    return Array.from(this.userTable.values());
  }

  static removeById(id: string) {
    return this.userTable.delete(id);
  }

  static create(user: CreateUserDto) {
    const newUser = { ...user, ...this.generateDefaultUser() };
    this.userTable.set(newUser.id, newUser);
    return newUser;
  }

  static update(id: string, updatedUser: User) {
    this.userTable.set(id, updatedUser);
    return updatedUser;
  }
}
