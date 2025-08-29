// src/modules/users/types.ts

/**
 * Define la estructura de un objeto User.
 * El campo `password` no se incluye aquí porque es de solo escritura y
 * el API nunca lo devolverá en las respuestas.
 */
export interface User {
    id: number;
    email: string;
    username: string;
    isAdmin: boolean;
  }