export interface IUser {
    login: string,
    id: number,
    password: string,
}

export type AuthState = {
    isAuth: Boolean,
    token: string | null,
    isLoading: Boolean,
    user: IUser | null | undefined,
    msg: string
}

export type AuthResponse = {
    code: number,
    object: object | null | undefined,
    token: string | undefined
}
export type AuthIncome = {
    login: string,
    password: string
}
