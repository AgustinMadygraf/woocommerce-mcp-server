import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetCountriesUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/data/countries");
  }
}
