import { WooCommerceClient } from "../../infrastructure/api/WooCommerceClient";
import { WordPressClient } from "../../infrastructure/api/WordPressClient";
import { ProductController } from "./controllers/ProductController";
import { OrderController } from "./controllers/OrderController";
import { CustomerController } from "./controllers/CustomerController";
import { ReportController } from "./controllers/ReportController";
import { CouponController } from "./controllers/CouponController";
import { SystemController } from "./controllers/SystemController";

export class RequestDispatcher {
  private productController: ProductController;
  private orderController: OrderController;
  private customerController: CustomerController;
  private reportController: ReportController;
  private couponController: CouponController;
  private systemController: SystemController;

  constructor(wooClient: WooCommerceClient, wpClient: WordPressClient) {
    this.productController = new ProductController(wooClient);
    this.orderController = new OrderController(wooClient);
    this.customerController = new CustomerController(wooClient);
    this.reportController = new ReportController(wooClient);
    this.couponController = new CouponController(wooClient);
    this.systemController = new SystemController(wooClient, wpClient);
  }

  async dispatch(method: string, params: any) {
    const productMethods = ["get_products", "batch_products"];
    const orderMethods = ["get_orders", "update_order"];
    const customerMethods = ["get_customer", "update_customer"];
    const reportMethods = ["get_sales_report", "get_products_report", "get_stock_report", "get_customers_report"];
    const couponMethods = ["get_coupons"];
    const systemMethods = ["get_system_status"];

    if (productMethods.includes(method)) return this.productController.handle(method, params);
    if (orderMethods.includes(method)) return this.orderController.handle(method, params);
    if (customerMethods.includes(method)) return this.customerController.handle(method, params);
    if (reportMethods.includes(method)) return this.reportController.handle(method, params);
    if (couponMethods.includes(method)) return this.couponController.handle(method, params);
    if (systemMethods.includes(method)) return this.systemController.handle(method, params);
    
    throw new Error(`Method ${method} is not available in this Virtual CEO edition.`);
  }
}
