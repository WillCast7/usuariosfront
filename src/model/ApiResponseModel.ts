import { UserModel } from "./UserModel";


export interface ApiResponseModel {
    success: boolean;
    message: string;
    data: UserModel[];
    params?: number[];
}