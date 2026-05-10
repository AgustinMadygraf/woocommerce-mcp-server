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
    // List only the core tools for the Virtual CEO persona
    const tools = [
      "get_sales_report",
      "get_products_report",
      "get_stock_report",
      "get_orders",
      "update_order",
      "get_customers_report",
      "get_customer",
      "update_customer",
      "get_products",
      "batch_products",
      "get_coupons",
      "get_system_status"
    ];

    const toolDescriptions: Record<string, string> = {
      get_sales_report: "Análisis de ingresos y salud financiera (CEO)",
      get_products_report: "Identificación de productos de alto/bajo rendimiento",
      get_stock_report: "Supervisión de niveles de inventario estratégicos",
      get_orders: "Seguimiento de flujo transaccional y pedidos",
      update_order: "Gestión de excepciones y cambios de estado críticos en pedidos",
      get_customers_report: "Análisis de LTV (Lifetime Value) y fidelidad de clientes",
      get_customer: "Vista 360 del cliente (email para cruce con Chatwoot/Clarity)",
      update_customer: "Segmentación y gestión de perfiles de clientes VIP",
      get_products: "Consulta y filtrado del catálogo de productos",
      batch_products: "Ajustes masivos de stock o precios (requiere precaución)",
      get_coupons: "Evaluación de impacto y gestión de promociones/cupones",
      get_system_status: "Verificación de integridad técnica y salud del ecosistema"
    };

    return {
      tools: tools.map((name) => ({
        name,
        description: toolDescriptions[name] || `Manage WooCommerce ${name.replace(/_/g, " ")}`,
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
