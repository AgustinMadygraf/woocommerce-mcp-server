[![MseeP.ai Security Assessment Badge](https://mseep.net/mseep-audited.png)](https://mseep.ai/app/techspawn-woocommerce-mcp-server)

# WooCommerce MCP Server (Virtual CEO Edition)

A Model Context Protocol (MCP) server optimized for strategic store management, providing high-level tools for a "Virtual CEO" persona.

## Overview

This server is a specialized edition of the WooCommerce MCP, designed to minimize context overhead for AI agents while maximizing strategic impact. It provides 12 core tools that integrate with a broader ecosystem (Clarity, Chatwoot, Xubio) using the customer's email as a universal identifier.

## Core Features

- **Strategic Reporting**: High-level sales, product, and stock reports.
- **Identity Mapping**: Guaranteed email presence in responses for cross-platform correlation.
- **Safety Protocol**: Built-in rules for mass operations (`batch_products`).
- **Audit Logging**: Full traceability of critical actions.

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Build the project:
```bash
npm run build
```

## Configuration

The server requires 3 core environment variables:

```env
WOOCOMMERCE_URL=https://your-store.com
WOOCOMMERCE_CONSUMER_KEY=ck_your_consumer_key
WOOCOMMERCE_CONSUMER_SECRET=cs_your_consumer_secret
```

Optional for WordPress System status:
- `WORDPRESS_USERNAME`: WordPress username.
- `WORDPRESS_PASSWORD`: WordPress application password.

## API Tools (Virtual CEO Set)

| Method | Description |
|--------|-------------|
| `get_sales_report` | Financial health and revenue analysis. |
| `get_products_report` | Performance analysis of the product catalog. |
| `get_stock_report` | Strategic inventory level supervision. |
| `get_orders` | Transactional flow tracking. |
| `update_order` | Management of critical order status changes. |
| `get_customers_report` | Analysis of LTV (Lifetime Value) and loyalty. |
| `get_customer` | 360° customer view (linked via Email). |
| `update_customer` | Segmentation and management of VIP profiles. |
| `get_products` | Catalog consultation and filtering. |
| `batch_products` | Bulk adjustments (Safety rule: confirmation for >10% change). |
| `get_coupons` | Promotion impact evaluation. |
| `get_system_status` | Technical health and ecosystem integrity check. |

## Documentation

- [Architecture Overview](docs/architecture.md)
- [Domain Model](docs/domain.md)
- [Security & Audit](docs/DISCOVERY.md)

## License

MIT License - See LICENSE file for details
