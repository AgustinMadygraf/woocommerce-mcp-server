export interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string | number;
  method: string;
  params?: any;
}

export interface JsonRpcResponse {
  jsonrpc: "2.0";
  id: string | number | null;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export const createErrorResponse = (id: string | number | null, code: number, message: string, data?: any): JsonRpcResponse => ({
  jsonrpc: "2.0",
  id,
  error: { code, message, data }
});

export const createSuccessResponse = (id: string | number, result: any): JsonRpcResponse => ({
  jsonrpc: "2.0",
  id,
  result
});
