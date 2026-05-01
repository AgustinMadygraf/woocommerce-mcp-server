#!/usr/bin/env node
import { createInterface } from "readline";
import { config } from "./infrastructure/config/env";
import { WooCommerceClient } from "./infrastructure/api/WooCommerceClient";
import { WordPressClient } from "./infrastructure/api/WordPressClient";
import { RequestDispatcher } from "./interfaces/mcp/RequestDispatcher";
import { Logger, LogLevel } from "./infrastructure/logging/Logger";
import { JsonRpcRequest } from "./interfaces/mcp/JsonRpc";

// Configure Logger
const logLevelMap: Record<string, LogLevel> = {
  DEBUG: LogLevel.DEBUG,
  INFO: LogLevel.INFO,
  WARN: LogLevel.WARN,
  ERROR: LogLevel.ERROR,
};
Logger.setLevel(logLevelMap[config.logging.level] ?? LogLevel.INFO);

const wooClient = new WooCommerceClient();
const wpClient = new WordPressClient();
const dispatcher = new RequestDispatcher(wooClient, wpClient);

/**
 * Main request handler that enroutes MCP methods to the dispatcher
 */
async function handleMcpRequest(method: string, params: any): Promise<any> {
  Logger.debug(`MCP Request: ${method}`, params);
  
  // 1. Handle Protocol Lifecycle
  if (method === "initialize") {
    return {
      protocolVersion: "2024-11-05",
      capabilities: { tools: {} },
      serverInfo: { name: "woocommerce-mcp-server", version: "1.1.0" },
    };
  }

  if (method === "notifications/initialized") {
    return null;
  }

  // 2. Handle Tool Discovery
  if (method === "tools/list") {
    // List all tools supported by the dispatcher
    const tools = [
      // WordPress Posts
      "get_posts", "get_post", "create_post", "update_post", "delete_post",
      "get_post_meta", "create_post_meta", "update_post_meta", "delete_post_meta",
      
      // WordPress Users
      "get_users", "get_user", "create_user", "update_user", "delete_user",
      
      // WordPress Media
      "get_media", "get_medium",
      
      // WooCommerce Products
      "get_products", "get_product", "create_product", "update_product", "delete_product", "batch_products",
      "get_product_variations", "get_product_variation", "create_product_variation", "update_product_variation", "delete_product_variation",
      "get_product_attributes", "get_product_attribute", "create_product_attribute", "update_product_attribute", "delete_product_attribute",
      "get_attribute_terms", "get_attribute_term", "create_attribute_term", "update_attribute_term", "delete_attribute_term",
      "get_product_categories", "get_product_category", "create_product_category", "update_product_category", "delete_product_category",
      "get_product_tags", "get_product_tag", "create_product_tag", "update_product_tag", "delete_product_tag",
      "get_product_reviews", "get_product_review", "create_product_review", "update_product_review", "delete_product_review",
      
      // WooCommerce Orders
      "get_orders", "get_order", "create_order", "update_order", "delete_order",
      "get_order_notes", "get_order_note", "create_order_note", "delete_order_note",
      "get_order_refunds", "get_order_refund", "create_order_refund", "delete_order_refund",
      "get_order_statuses", "batch_orders",
      
      // WooCommerce Customers
      "get_customers", "get_customer", "create_customer", "update_customer", "delete_customer", "get_customer_downloads",
      
      // WooCommerce Coupons
      "get_coupons", "get_coupon", "create_coupon", "update_coupon", "delete_coupon",
      
      // WooCommerce Taxes
      "get_tax_rates", "get_tax_rate", "create_tax_rate", "update_tax_rate", "delete_tax_rate",
      "get_tax_classes", "create_tax_class", "delete_tax_class",
      
      // WooCommerce Shipping
      "get_shipping_zones", "get_shipping_zone", "create_shipping_zone", "update_shipping_zone", "delete_shipping_zone",
      "get_shipping_methods", "get_shipping_zone_methods", "create_shipping_zone_method", "update_shipping_zone_method", "delete_shipping_zone_method",
      "get_shipping_zone_locations", "update_shipping_zone_locations", "get_shipping_classes", "get_shipping_class",
      
      // WooCommerce Reports
      "get_sales_report", "get_top_sellers_report", "get_products_report", "get_orders_report", "get_categories_report", "get_customers_report", "get_stock_report", "get_coupons_report", "get_taxes_report",
      "get_orders_totals_report", "get_products_totals_report", "get_customers_totals_report", "get_coupons_totals_report",
      
      // Meta Data (Direct access)
      "get_product_meta", "update_product_meta", "create_product_meta", "delete_product_meta",
      "get_order_meta", "update_order_meta", "create_order_meta", "delete_order_meta",
      "get_customer_meta", "update_customer_meta", "create_customer_meta", "delete_customer_meta",
      
      // System & Settings
      "get_payment_gateways", "get_payment_gateway", "update_payment_gateway",
      "get_settings", "get_setting_options", "get_setting_option", "update_settings_option",
      "get_system_status", "get_system_status_tools", "run_system_status_tool",
      "get_data", "get_data_index", "get_continents", "get_countries", "get_currencies", "get_current_currency",
      "get_webhooks", "get_webhook", "create_webhook", "update_webhook", "delete_webhook",
      "get_plugins", "get_themes"
    ];

    return {
      tools: tools.map((name) => ({
        name,
        description: `Manage WooCommerce/WordPress ${name.replace(/_/g, " ")}`,
        inputSchema: { type: "object", properties: {} },
      })),
    };
  }

  // 3. Handle Tool Execution
  if (method === "tools/call") {
    const toolName = params.name;
    const toolArgs = params.arguments || {};
    return dispatcher.dispatch(toolName, toolArgs);
  }

  // 4. Default Dispatch for any other direct methods
  return dispatcher.dispatch(method, params);
}

// Stdin/Stdout JSON-RPC loop
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", async (line) => {
  let request: JsonRpcRequest;
  try {
    request = JSON.parse(line);
    if (request.jsonrpc !== "2.0") throw new Error("Invalid JSON-RPC version");
  } catch (error) {
    console.log(JSON.stringify({
      jsonrpc: "2.0", id: null,
      error: { code: -32700, message: "Parse error", data: String(error) }
    }));
    return;
  }

  try {
    const result = await handleMcpRequest(request.method, request.params);
    
    // Notifications (no id) should not get a response
    if (request.id === undefined || request.id === null) return;

    // MCP Response format
    const response: any = { jsonrpc: "2.0", id: request.id };
    
    if (request.method === "tools/call") {
      response.result = {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    } else {
      response.result = result;
    }

    console.log(JSON.stringify(response));
  } catch (error) {
    console.log(JSON.stringify({
      jsonrpc: "2.0", id: request.id,
      error: {
        code: -32000,
        message: error instanceof Error ? error.message : String(error),
      },
    }));
  }
});

process.on("SIGINT", () => {
  Logger.info("Shutting down WooCommerce MCP server...");
  rl.close();
  process.exit(0);
});

Logger.info("WooCommerce MCP server running on stdin/stdout");
