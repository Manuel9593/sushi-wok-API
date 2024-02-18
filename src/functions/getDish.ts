import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import MySQL from "../data/MySQL";
import "dotenv/config"
import { PoolOptions } from "mysql2/promise";

const options: PoolOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_AUTH_STRING,
    database: process.env.MYSQL_DEF_SCHEMA,
    connectTimeout: 10000,
    ssl: {
        rejectUnauthorized: true,
        ca: process.env.MYSQL_CA_CERT
    }
}

export async function getDish(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Function invoked with id ${context.invocationId}\n\twith id [${request.params.id}]`)
    const id = Number.parseInt(request.params.id);
    const connection = new MySQL()
    if (id === Number.NaN)
        return { status: 400, jsonBody: { message: "Wrong format for id parameter" } }
    try {
        const [result] = await connection.executeRows('SELECT * FROM `dishes` WHERE dish_id = ?', [id])
        connection.end()
        return { jsonBody: { data: result } };
    } catch (err) {
        context.error(err);
        return { jsonBody: { data: null } }
    }
};

app.http('getDish', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'getDishes/{id}',
    handler: getDish
});
