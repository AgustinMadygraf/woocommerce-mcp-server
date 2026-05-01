import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class GetDataIndexUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.indexId) {
      throw new Error("Index ID is required");
    }
    return this.client.get(`/data/${params.indexId}`);
  }
}
