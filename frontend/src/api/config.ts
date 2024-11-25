// API configuration
export const API_BASE_URL = 'http://localhost:5000';

// Add this to handle API errors consistently
export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}