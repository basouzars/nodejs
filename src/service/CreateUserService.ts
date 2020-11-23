/* eslint-disable class-methods-use-this */
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/Users';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async run({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('E-mail ja cadastrado');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name, email, password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;