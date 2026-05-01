import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class GetProductReviewUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.reviewId) {
      throw new Error("Review ID is required");
    }
    return this.client.get(`/products/reviews/${params.reviewId}`);
  }
}
