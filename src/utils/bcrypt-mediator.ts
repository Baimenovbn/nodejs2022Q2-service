import { hash, genSalt } from 'bcrypt';
import { CreateUserDto } from '../modules/users/dto/create-user.dto';

const DEFAULT_SALT = 10;

export const getHashedPassword = async (password: string) => {
  const salt = await genSalt(+process.env.CRYPT_SALT || DEFAULT_SALT);

  return hash(password, salt);
};

export const getUserWithHashedPassword = async (user: CreateUserDto) => {
  const hashedPassword = await getHashedPassword(user.password);

  return {
    password: hashedPassword,
    login: user.login,
  };
};
