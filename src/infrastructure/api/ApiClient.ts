import axios, { AxiosInstance } from "axios";
import { config } from "../config/env";
import { Logger } from "../logging/Logger";

export interface ApiClientOptions {
  baseURL: string;
  authType: "basic" | "woo";
}

export class ApiClient {
  protected client: AxiosInstance;

  constructor(options: ApiClientOptions) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    let params: Record<string, string> = {};

    if (options.authType === "basic") {
      const auth = Buffer.from(
        `${config.wordpress.username}:${config.wordpress.password}`
      ).toString("base64");
      headers["Authorization"] = `Basic ${auth}`;
    } else {
      params = {
        consumer_key: config.woocommerce.consumerKey,
        consumer_secret: config.woocommerce.consumerSecret,
      };
    }

    this.client = axios.create({
      baseURL: options.baseURL,
      headers,
      params,
    });
  }

  async get<T>(url: string, params?: any): Promise<T> {
    Logger.debug(`GET ${this.client.defaults.baseURL}${url}`, { params });
    const response = await this.client.get<T>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    Logger.debug(`POST ${this.client.defaults.baseURL}${url}`, { data });
    const response = await this.client.post<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    Logger.debug(`PUT ${this.client.defaults.baseURL}${url}`, { data });
    const response = await this.client.put<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string, params?: any): Promise<T> {
    Logger.debug(`DELETE ${this.client.defaults.baseURL}${url}`, { params });
    const response = await this.client.delete<T>(url, { params });
    return response.data;
  }
}
