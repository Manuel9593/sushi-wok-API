import { HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { User } from "../data/Dish";
import DbUtils from "../data/DbUtils";

export async function getDish(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Function invoked with id ${context.invocationId}\n\twith id [${request.params.id}]`)
    const id = Number.parseInt(request.params.id);
    if (id === Number.NaN)
        return { status: 400, jsonBody: { message: "Wrong format for id parameter" } }
    try {
        const connection = await DbUtils.getConnection();
        // context.log("Connection", connection);
        const [result] = await connection.execute<User[]>('SELECT * FROM `dishes` WHERE dish_id = ?', [id]);
        connection.release();
        context.log("Result", result);
        return { jsonBody: { data: result } };
    } catch (err) {
        context.error(err);
        return { status: 500, jsonBody: { message: "Error in Connection", exception: err } }
    }
};