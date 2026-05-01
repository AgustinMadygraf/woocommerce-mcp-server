import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class CreateProductReviewUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.reviewData) {
      throw new Error("Review data is required");
    }
    return this.client.post("/products/reviews", params.reviewData);
  }
}
