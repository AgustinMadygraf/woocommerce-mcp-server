import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetOrderStatusesUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/orders/statuses");
  }
}
