import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetWebhookUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(webhookId: number) {
    return this.client.get(`/webhooks/${webhookId}`);
  }
}
