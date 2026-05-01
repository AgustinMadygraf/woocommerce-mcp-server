# Dominios y Bounded Contexts

En este servidor MCP de WooCommerce, hemos identificado los siguientes subdominios clave (Bounded Contexts) basados en la API de WooCommerce:

## 1. Catálogo de Productos (Products)
Gestiona todo lo relacionado con los productos, variaciones, atributos, categorías y etiquetas.
- **Entidades**: Product, Variation, Attribute, Category, Tag.
- **Operaciones**: CRUD completo, gestión de stock, revisiones.

## 2. Gestión de Ventas (Orders)
Maneja el ciclo de vida de los pedidos, reembolsos y notas de pedido.
- **Entidades**: Order, Refund, OrderNote.
- **Operaciones**: Creación de pedidos, actualización de estado, reembolsos parciales/totales.

## 3. Clientes (Customers)
Gestiona la información de los usuarios que realizan compras.
- **Entidades**: Customer.
- **Operaciones**: Registro, actualización de perfiles, gestión de direcciones.

## 4. Promociones (Coupons)
Controla los cupones de descuento y sus reglas de aplicación.
- **Entidades**: Coupon.
- **Operaciones**: Gestión de cupones, límites de uso.

## 5. Logística y Tasas (Shipping & Taxes)
Configuración de zonas de envío y tasas impositivas.
- **Entidades**: ShippingZone, TaxRate, TaxClass.

## 6. Reportes y Sistema (Reports & System)
Información analítica y estado del sistema.
- **Entidades**: SalesReport, StockReport, SystemStatus.
- **Operaciones**: Obtención de estadísticas, ejecución de herramientas de mantenimiento.

## Ubicuas Language (Ejemplos)
- **Meta Data**: Información adicional flexible adjunta a productos, pedidos o clientes.
- **Slug**: Identificador amigable para URLs usado en categorías y etiquetas.
- **SKU**: Stock Keeping Unit, identificador único de inventario.
