import { User, UserModel } from '../entities';
export declare class UsersService {
    protected userModel: UserModel;
    constructor(userModel: UserModel);
    getUser(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}
