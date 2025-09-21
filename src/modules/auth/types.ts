export interface User {
    id: number;
    email: string;
    username: string;
    role: string;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string;
    user: User;
  }