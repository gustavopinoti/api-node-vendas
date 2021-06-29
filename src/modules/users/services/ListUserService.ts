import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';

export default class ListUserService {
    public async execute(): Promise<User[]> {
        const repository = getCustomRepository(UsersRepository);

        return await repository.find();
    }
}
