import { LoggedUserViewModel } from './logged-user-view-model';

type LoggedInViewModel = {
    user: LoggedUserViewModel,
    token: string
};

export default LoggedInViewModel;
