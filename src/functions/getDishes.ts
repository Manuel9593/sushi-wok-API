import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import MySQL from "../data/MySQL";
import "dotenv/config"

export async function allDishesHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Function invoked with id ${context.invocationId}`)
    try {
        const connection = new MySQL();
        const [result] = await connection.queryResult('SELECT * FROM `dishes`')
        return { jsonBody: { data: result } };
    } catch (err) {
        context.error(err);
        return { jsonBody: { data: null } }
    }
};

app.http('getDishes', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: allDishesHandler
});