import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetWebhooksUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    return this.client.get("/webhooks", params);
  }
}
