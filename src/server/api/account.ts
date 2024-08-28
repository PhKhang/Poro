import accountController from "../controllers/accountController";
import { getToken } from '#auth'
import { stringifyQuery } from "vue-router";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const token = await getToken({ event })

    console.log('Request body:', body);

    if (!body) {
        return { error: 'Request body is missing' };
    }

    const { action, ...data } = body;

    if (!action) {
        return { error: 'Action is missing in the request body' };
    }

    switch (action) {
        case 'getName':
            if (!token) {
                return { error: 'Not logged in' };
            }
            return token.name

        case 'getEmail':
            if (!token) {
                return { error: 'Not logged in' };
            }
            return token.email

        case 'getAvatar':
            if (!token) {
                return { error: 'Not logged in' };
            }
            return token.picture

        case 'getProfile':
            if (!token) {
                return { error: 'Not logged in' };
            }
            return {
                name: token.name,
                email: token.email,
                image: token.picture
            }

        case 'changeUsername':
            if (!token) {
                return { error: 'Login is required for this action' };
            }
            if (!data.newName) {
                return { error: 'newName is required for this action' };
            }
            console.log('Change username:', data.newName, ' for ', token.id)
            const re = await accountController.changeUsername(token.id, data.newName)
            console.log('Updated', re)
            return re;

        case 'changePassword':
            if (!token) {
                return { error: 'Login is required for this action' };
            }
            if (!data.newPassword) {
                return { error: 'newPassword is required for this action' };
            }
            return accountController.changeUsername(token.id, data.newPassword);

        case 'deleteUser':
            if (!token) {
                return { error: 'Login is required for deleteUser action' };
            }
            return accountController.deleteUser(String(token.id));

        default:
            return { error: 'Unknown action' };
    }
});