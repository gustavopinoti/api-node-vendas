import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const service = new ListUserService();

        console.log(request.user.id);

        const users = await service.execute();

        return response.json(classToClass(users));
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;
        const service = new CreateUserService();

        const user = await service.execute({ name, email, password });

        return response.json(classToClass(user));
    }
}
