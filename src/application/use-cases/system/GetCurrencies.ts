import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetCurrenciesUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/data/currencies");
  }
}
