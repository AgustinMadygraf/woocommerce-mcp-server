import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetCurrentCurrencyUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/data/currencies/current");
  }
}
