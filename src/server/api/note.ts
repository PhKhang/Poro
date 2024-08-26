import accountController from "../controllers/accountController";
import { getToken } from '#auth'
import noteController from "../controllers/noteController";

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
        case 'getNoteList':
            if (!token) {
                return { error: 'Not logged in' };
            }
            return noteController.getNoteList(token.id)

        case 'editNote':
            if (!token) {
                return { error: 'Login is required for this action' };
            }
            if (!data.noteId) {
                return { error: 'noteId is required for this action' };
            }
            if (!data.newNoteBody) {
                return { error: 'newNoteBody is required for this action' };
            }
            return noteController.editNote(token.id, data.noteId, data.newNoteBody);

        case 'createNote':
            if (!token) {
                return { error: 'Login is required for this action' };
            }
            if (!data.newNoteBody) {
                return { error: 'newNoteBody is required for this action' };
            }
            return noteController.createNote(token.id, data.newNoteBody);

        case 'deleteNote':
            if (!token) {
                return { error: 'Login is required for this action' };
            }
            if (!data.noteId) {
                return { error: 'noteId is required for this action' };
            }
            return noteController.deleteNode(token.id, data.noteId);

        default:
            return { error: 'Unknown action' };
    }
});