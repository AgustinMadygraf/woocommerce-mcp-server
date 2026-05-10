import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";
import { AuditLogger } from "../../../infrastructure/logging/AuditLogger";

export class BatchProductsUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(batchData: { create?: any[]; update?: any[]; delete?: number[] }) {
    if (!batchData.create && !batchData.update && !batchData.delete) {
      throw new Error("Batch data must contain at least one of: create, update, delete");
    }

    const impact = {
      created: batchData.create?.length || 0,
      updated: batchData.update?.length || 0,
      deleted: batchData.delete?.length || 0,
      total: (batchData.create?.length || 0) + (batchData.update?.length || 0) + (batchData.delete?.length || 0)
    };

    AuditLogger.logAction("BATCH_PRODUCTS", impact);

    return this.client.post("/products/batch", batchData);
  }
}
