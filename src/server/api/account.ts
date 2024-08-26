import accountController from "../controllers/accountController";
import { getToken } from '#auth'

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
                picture: token.picture
            }

        case 'changeUsername':
            if (!data.userId) {
                return { error: 'userId is required for this action' };
            }
            if (!data.newName) {
                return { error: 'newName is required for this action' };
            }
            return accountController.changeUsername(data.userId, data.newName);

        case 'changePassword':
            if (!data.userId) {
                return { error: 'userId is required for this action' };
            }
            if (!data.newPassword) {
                return { error: 'newPassword is required for this action' };
            }
            return accountController.changeUsername(data.userId, data.newPassword);

        case 'deleteUser':
            if (!data.userId) {
                return { error: 'userId is required for deleteUser action' };
            }
            return accountController.deleteUser(data.userId);

        default:
            return { error: 'Unknown action' };
    }
});