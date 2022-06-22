import { User } from '../models/user-model';
import LoggedInViewModel from '../types/logged-in-view-model';

const createLoggedInViewModel = (
    userDoc: User,
    token: string,
    noFormat = false,
): LoggedInViewModel => ({
    user: {
        email: userDoc.email,
        name: userDoc.name,
    },
    token: noFormat ? token : `Bearer ${token}`,
});

export default createLoggedInViewModel;
