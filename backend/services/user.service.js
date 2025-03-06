import userModel from '../models/user.model.js';

export const createUser = async (
    {email,password}
) => {

    if (!email || !password) {
        throw new Error('All fields are required');
    }
}