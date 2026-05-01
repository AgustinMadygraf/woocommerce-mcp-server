import { WooCommerceClient } from "../../../infrastructure/api/WooCommerceClient";

export class DeleteCouponUseCase {
  constructor(private client: WooCommerceClient) {}

  async execute(params: any) {
    if (!params.couponId) {
      throw new Error("Coupon ID is required");
    }
    return this.client.delete(`/coupons/${params.couponId}`, {
      force: params.force || true,
    });
  }
}
