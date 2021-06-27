import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

export default class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const repository = getCustomRepository(CustomersRepository);

        const customer = await repository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found');
        }

        const customerExists = await repository.findByEmail(email);

        if (customerExists && email !== customer.email) {
            throw new AppError('Email already used');
        }

        customer.name = name;
        customer.email = email;

        await repository.save(customer);

        return customer;
    }
}
