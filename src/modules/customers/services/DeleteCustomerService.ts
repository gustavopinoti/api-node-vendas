import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

export default class DeleteCustomereService {
    public async execute({ id }: IRequest): Promise<void> {
        const repository = getCustomRepository(CustomersRepository);

        const customer = await repository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        await repository.remove(customer);
    }
}
