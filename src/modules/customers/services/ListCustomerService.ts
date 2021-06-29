import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

export default class ListCustomerService {
    public async execute(): Promise<Customer[]> {
        const repository = getCustomRepository(CustomersRepository);

        return await repository.find();
    }
}
