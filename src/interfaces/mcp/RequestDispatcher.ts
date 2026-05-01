import { WooCommerceClient } from "../../infrastructure/api/WooCommerceClient";
import { WordPressClient } from "../../infrastructure/api/WordPressClient";
import { ProductController } from "./controllers/ProductController";
import { OrderController } from "./controllers/OrderController";
import { CustomerController } from "./controllers/CustomerController";
import { ReportController } from "./controllers/ReportController";
import { PostController } from "./controllers/PostController";

export class RequestDispatcher {
  private productController: ProductController;
  private orderController: OrderController;
  private customerController: CustomerController;
  private reportController: ReportController;
  private postController: PostController;

  constructor(wooClient: WooCommerceClient, wpClient: WordPressClient) {
    this.productController = new ProductController(wooClient);
    this.orderController = new OrderController(wooClient);
    this.customerController = new CustomerController(wooClient);
    this.reportController = new ReportController(wooClient);
    this.postController = new PostController(wpClient);
  }

  async dispatch(method: string, params: any) {
    const productMethods = [
      "get_products", "get_product", "create_product", "update_product", "delete_product"
    ];

    const orderMethods = [
      "get_orders", "get_order", "create_order", "update_order", "delete_order"
    ];

    const customerMethods = [
      "get_customers", "get_customer", "create_customer", "update_customer", "delete_customer"
    ];

    const reportMethods = [
      "get_sales_report", "get_products_report", "get_orders_report", 
      "get_categories_report", "get_customers_report", "get_stock_report", 
      "get_coupons_report", "get_taxes_report"
    ];

    const postMethods = ["get_posts", "create_post", "update_post"];

    if (productMethods.includes(method)) return this.productController.handle(method, params);
    if (orderMethods.includes(method)) return this.orderController.handle(method, params);
    if (customerMethods.includes(method)) return this.customerController.handle(method, params);
    if (reportMethods.includes(method)) return this.reportController.handle(method, params);
    if (postMethods.includes(method)) return this.postController.handle(method, params);
    
    return null; 
  }
}
