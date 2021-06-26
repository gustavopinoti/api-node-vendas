import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
}

export default class ShowProfileService {
    public async execute({ user_id }: IRequest): Promise<User> {
        const repository = getCustomRepository(UsersRepository);

        const user = await repository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        return user;
    }
}
