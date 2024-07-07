export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    country: string;
    address: string;
    dateBirth: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    authTokens: AuthTokens | null;
}
