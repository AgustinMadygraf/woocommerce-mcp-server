import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetContinentsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/data/continents");
  }
}
