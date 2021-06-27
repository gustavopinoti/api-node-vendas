import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    name: string;
    email: string;
}

export default class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
        const repository = getCustomRepository(CustomersRepository);

        const emailExists = await repository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address already used.');
        }

        const customer = repository.create({
            name,
            email,
        });

        await repository.save(customer);

        return customer;
    }
}
