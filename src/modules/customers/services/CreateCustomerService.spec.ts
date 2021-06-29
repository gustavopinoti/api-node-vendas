import AppError from '@shared/errors/AppError';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomer', () => {
    let fakeCustomerRepository: FakeCustomersRepository;
    let createCustomer: CreateCustomerService;

    beforeEach(() => {
        fakeCustomerRepository = new FakeCustomersRepository();

        createCustomer = new CreateCustomerService(fakeCustomerRepository);
    });

    it('should be able to create a new customer', async () => {
        const customer = await createCustomer.execute({
            name: 'Gustavo Pinoti',
            email: 'gustavo@email.com',
        });

        expect(customer).toHaveProperty('id');
    });

    it('should not be able to create two customers with same email', async () => {
        await createCustomer.execute({
            name: 'Gustavo Pinoti',
            email: 'gustavo@email.com',
        });

        expect(
            createCustomer.execute({
                name: 'Gustavo Pinoti',
                email: 'gustavo@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
