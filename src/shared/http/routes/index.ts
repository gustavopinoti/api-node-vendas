import { Router } from 'express';

const routes = Router();

routes.get('/:id', (request, response) => {
    const { id } = request.params;

    console.log(id);

    return response.json({ message: 'Hello Dev!' });
});

export default routes;
