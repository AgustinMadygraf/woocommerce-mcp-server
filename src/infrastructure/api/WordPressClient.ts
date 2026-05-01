import { ApiClient } from "./ApiClient";
import { config } from "../config/env";

export class WordPressClient extends ApiClient {
  constructor(siteUrl?: string) {
    const baseURL = `${siteUrl || config.wordpress.siteUrl}/wp-json/wp/v2`;
    super({ baseURL, authType: "basic" });
  }
}
