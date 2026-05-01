import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class CreateWebhookUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(webhookData: any) {
    if (!webhookData.name || !webhookData.topic || !webhookData.delivery_url) {
      throw new Error("Missing required fields: name, topic, delivery_url");
    }
    return this.client.post("/webhooks", webhookData);
  }
}
