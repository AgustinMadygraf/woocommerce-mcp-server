import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetDataIndicesUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute() {
    return this.client.get("/data");
  }
}
