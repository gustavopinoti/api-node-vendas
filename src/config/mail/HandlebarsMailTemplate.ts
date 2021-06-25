import handlebars from 'handlebars';
import fs from 'fs';

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
    public async parse({
        file,
        variables,
    }: IParseMailTemplate): Promise<string> {
        const templateFileContect = await fs.promises.readFile(file, {
            encoding: 'utf-8',
        });
        const parseTemplate = handlebars.compile(templateFileContect);

        return parseTemplate(variables);
    }
}
