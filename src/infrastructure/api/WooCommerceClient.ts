import { ApiClient } from "./ApiClient";
import { config } from "../config/env";

export class WooCommerceClient extends ApiClient {
  constructor(siteUrl?: string) {
    const baseURL = `${siteUrl || config.wordpress.siteUrl}/wp-json/wc/v3`;
    super({ baseURL, authType: "woo" });
  }
}
