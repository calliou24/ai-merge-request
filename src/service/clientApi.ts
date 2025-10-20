import { ApiConfig } from "./config";

export class ApiError extends Error {
  status: number;
  details?: any;

  constructor(message: string, status: number, details?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export class ClientApi {
  private baseUrl: string;

  constructor(url?: string) {
    this.baseUrl = url ?? ApiConfig.GITLAB_API_URL;
  }

  async request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      method: options.method,
    };

    const response = await fetch(url, config);

    // Handle non-JSON responses (like 204 No Content)
    if (response.status === 204) {
      return {} as T;
    }

    const data = await response.json();

    try {
      if (!response.ok) {
        // Handle API error responses
        throw new ApiError("Failed to parse JSON response", response.status);
      }

      return data;
    } catch (error) {
      // Handle network or parsing errors
      throw new ApiError(
        data?.message || response.statusText,
        response.status,
        data
      );
    }
  }
}
