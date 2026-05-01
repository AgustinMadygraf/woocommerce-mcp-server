import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class UpdateProductReviewUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.reviewId) {
      throw new Error("Review ID is required");
    }
    if (!params.reviewData) {
      throw new Error("Review data is required");
    }
    return this.client.put(`/products/reviews/${params.reviewId}`, params.reviewData);
  }
}
