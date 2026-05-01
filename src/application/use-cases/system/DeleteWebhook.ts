import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class DeleteWebhookUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(webhookId: number, force: boolean = false) {
    if (!webhookId) {
      throw new Error("Webhook ID is required");
    }
    return this.client.delete(`/webhooks/${webhookId}`, { force });
  }
}
