import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import DbUtils from "../data/DbUtils";
import { User } from "../data/Dish";

export async function allDishesHandler(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Function invoked with id ${context.invocationId}`);
    try {
        const connection = await DbUtils.getConnection();
        // context.log("Connection", connection);
        const [result] = await connection.query<User[]>('SELECT * FROM `dishes`');
        connection.release();
        context.log("Result", result);
        return { jsonBody: { data: result } };
    } catch (err) {
        context.error(err);
        return { status: 500, jsonBody: { message: "Error on Connection", exception: err } }
    }
};