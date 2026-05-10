# Dominios y Bounded Contexts (Edición Virtual CEO)

En esta edición optimizada del servidor MCP de WooCommerce, nos centramos en los subdominios que aportan valor estratégico para la toma de decisiones:

## 1. Catálogo Estratégico (Products)
Enfoque en la visibilidad y ajustes masivos del catálogo.
- **Entidades**: Product.
- **Operaciones**: Consulta de catálogo y operaciones `batch` para ajustes de stock/precio.

## 2. Flujo Transaccional (Orders)
Maneja el ciclo de vida de los pedidos para seguimiento de ingresos.
- **Entidades**: Order.
- **Operaciones**: Seguimiento de flujo y actualización de estados críticos.

## 3. Inteligencia de Clientes (Customers)
Gestión de la información de clientes con enfoque en interoperabilidad (Email).
- **Entidades**: Customer.
- **Operaciones**: Vista 360 del cliente y gestión de perfiles VIP.

## 4. Promociones y Fidelización (Coupons)
Control de cupones para evaluar impacto comercial.
- **Entidades**: Coupon.

## 5. Análisis y Salud del Sistema (Reports & System)
Información agregada y estado técnico.
- **Entidades**: SalesReport, ProductsReport, StockReport, SystemStatus.
- **Operaciones**: Reportes de rendimiento macro y verificación de salud técnica.

---
*Nota: Los dominios de Logística, Impuestos, Media y Gestión granular de Meta-data han sido eliminados en esta edición para simplificar el modelo de IA.*
