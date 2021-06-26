import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

export default class UpdateProfileService {
    public async execute({
        user_id,
        name,
        email,
        password,
        old_password,
    }: IRequest): Promise<User> {
        const repository = getCustomRepository(UsersRepository);

        const user = await repository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        const userUpdateEmail = await repository.findByEmail(email);

        if (userUpdateEmail && userUpdateEmail.id !== user_id) {
            throw new AppError('Email already used');
        }

        if (password && !old_password) {
            throw new AppError('Old password is required');
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError('Old password does not match');
            }

            user.password = await hash(password, 8);
        }

        user.name = name;
        user.email = email;

        await repository.save(user);

        return user;
    }
}