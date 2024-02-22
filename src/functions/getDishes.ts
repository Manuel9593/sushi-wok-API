import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import "dotenv/config"
import { createConnection } from "mysql2/promise";
import { options } from "../data/MySQL";
import { User } from "../data/Dish";

export async function allDishesHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Function invoked with id ${context.invocationId}`)
    try {
        const connection = await createConnection(options);
        context.log("Connection", connection);
        const [result] = await connection.query<User[]>('SELECT * FROM `dishes`');
        connection.end()
        context.log("Result", result);
        return { jsonBody: { data: result } };
    } catch (err) {
        context.error(err);
        return { status: 500, jsonBody: { message: "Error on Connection", exception: err } }
    }
};

app.http('getDishes', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: allDishesHandler
});