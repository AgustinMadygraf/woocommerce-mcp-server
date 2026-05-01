import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class UpdateWebhookUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(webhookId: number, webhookData: any) {
    if (!webhookId) {
      throw new Error("Webhook ID is required");
    }
    return this.client.put(`/webhooks/${webhookId}`, webhookData);
  }
}
