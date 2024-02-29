import { app } from "@azure/functions";
import { getDish } from "./functions/getDish";
import { allDishesHandler } from "./functions/getDishes";
import { postOrder } from "./functions/postOrder";

app.http('getDishes', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: allDishesHandler
});

app.http('getDish', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'getDishes/{id}',
    handler: getDish
});

app.http('postOrder', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: postOrder
});
