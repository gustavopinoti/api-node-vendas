import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomereService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomereService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

export default class CustomerController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listProducts = new ListCustomerService();

        const customers = await listProducts.execute();

        return response.json(customers);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const showCustomers = new ShowCustomereService();

        const customer = await showCustomers.execute({ id });

        return response.json(customer);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;

        const createCustomer = new CreateCustomerService();

        const customer = await createCustomer.execute({ name, email });

        return response.json(customer);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;
        const { id } = request.params;

        const updateCustomer = new UpdateCustomerService();

        const customer = await updateCustomer.execute({
            id,
            name,
            email,
        });

        return response.json(customer);
    }

    public async delete(request: Request, response: Response): Promise<void> {
        const { id } = request.params;
        const deleteCustomer = new DeleteCustomereService();

        await deleteCustomer.execute({ id });

        response.json([]);
    }
}
