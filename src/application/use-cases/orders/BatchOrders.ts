import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class BatchOrdersUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(batchData: { create?: any[]; update?: any[]; delete?: number[] }) {
    if (!batchData.create && !batchData.update && !batchData.delete) {
      throw new Error("Batch data must contain at least one of: create, update, delete");
    }
    return this.client.post("/orders/batch", batchData);
  }
}
