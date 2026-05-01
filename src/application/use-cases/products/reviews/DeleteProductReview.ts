import { WooCommerceClient } from "../../../../infrastructure/api/WooCommerceClient";

export class DeleteProductReviewUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.reviewId) {
      throw new Error("Review ID is required");
    }
    return this.client.delete(`/products/reviews/${params.reviewId}`, {
      force: params.force || true,
    });
  }
}
