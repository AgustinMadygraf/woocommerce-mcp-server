import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetTaxClassesUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/taxes/classes");
  }
}
