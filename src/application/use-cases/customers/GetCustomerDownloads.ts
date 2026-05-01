import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetCustomerDownloadsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(customerId: number) {
    return this.client.get(`/customers/${customerId}/downloads`);
  }
}
