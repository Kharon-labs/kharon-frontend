export class AuthError extends Error {
  constructor(message: string, public code?: string, public status?: number) {
    super(message);
    this.name = "AuthError";
  }
}

export function handleAuthError(error: unknown): AuthError {
  if (error instanceof AuthError) {
    return error;
  }

  if (error instanceof Error) {
    return new AuthError(error.message);
  }

  return new AuthError("An unexpected error occurred");
}
