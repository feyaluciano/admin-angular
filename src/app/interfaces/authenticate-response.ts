export interface AuthenticateResponse {
    id: number;
    email?: string;
    jwtToken?: string;
    refreshToken?: string;    
}
