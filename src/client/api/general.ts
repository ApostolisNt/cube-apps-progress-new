export async function getApiBaseUrl(): Promise<string> {
  return await "http://localhost:5001/cube/cube_api";
}

// Helper function to get configured API client instance
export async function getApiClient() {
  return await ApiClient.getInstance();
}

/**
 * Singleton API client class
 */
export class ApiClient {
  private static instance: ApiClient;
  private baseUrl: URL;

  private constructor(baseUrl: string) {
    this.baseUrl = new URL(baseUrl);
  }

  /**
   * Get or create singleton instance
   */
  static async getInstance(): Promise<ApiClient> {
    if (!ApiClient.instance) {
      const baseUrl = await getApiBaseUrl();
      console.info(
        `Creating new API client instance with base URL [${baseUrl}]`
      );
      // Create new instance
      ApiClient.instance = new ApiClient(baseUrl);
    }

    return ApiClient.instance;
  }

  /**
   * Reset singleton instance (useful for testing)
   */
  static resetInstance() {
    ApiClient.instance = undefined as unknown as ApiClient;
  }

  /**
   * Update the base URL for the singleton instance
   */
  updateBaseUrl(baseUrl: string) {
    this.baseUrl = new URL(baseUrl);
  }

  /**
   * Get current base URL
   */
  getBaseUrl() {
    return this.baseUrl.toString();
  }

  /**
   * Get URL for the given endpoint
   */
  getUrl(endpoint: string) {
    // Otherwise, append to the base URL path
    const result = new URL(this.baseUrl);

    // If endpoint is absolute, don't prepend base URL path
    // Replace `//` with `/` to avoid double slashes
    const path = endpoint.startsWith("/")
      ? endpoint
      : `${result.pathname}/${endpoint}`;
    const fullPath = path.replace(/\/+/g, "/");

    // Parse URL, as fullPath might contain query params
    const url = new URL(fullPath, this.baseUrl);

    // Set pathname
    result.pathname = url.pathname;
    // Set hash
    result.hash = url.hash;
    // Set search params
    for (const [key, value] of url.searchParams) {
      result.searchParams.append(key, value);
    }

    return result;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(this.getUrl(endpoint));
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(this.getUrl(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    const response = await fetch(this.getUrl(endpoint), {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}
