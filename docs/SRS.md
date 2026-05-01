# SRS - WooCommerce MCP Server

## 1. Propósito
El propósito de este servidor MCP es proporcionar una interfaz estandarizada para interactuar con tiendas WooCommerce y sitios WordPress, permitiendo a agentes de IA gestionar productos, pedidos, clientes y configuraciones de manera eficiente.

## 2. Alcance
El servidor debe cubrir la totalidad de la API REST de WooCommerce v3 y funcionalidades clave de la API REST de WordPress.

### 2.1 Módulos Core (WooCommerce)
- **Productos**: Gestión de catálogo, variaciones, atributos, categorías, etiquetas y reseñas.
- **Pedidos**: Ciclo de vida de pedidos, notas y reembolsos.
- **Clientes**: Gestión de perfiles y descargas.
- **Cupones**: Gestión de descuentos.
- **Envíos y Tasas**: Configuración de zonas, métodos y clases de impuestos.
- **Reportes**: Análisis de ventas, stock, clientes y reportes de totales.
- **Sistema**: Estado del sistema, herramientas de mantenimiento, ajustes de tienda, webhooks, plugins y temas.
- **Operaciones Batch**: Soporte para creación y actualización masiva de productos y pedidos.

### 2.2 Módulos WordPress
- **Posts**: Gestión de contenido básico.
- **Media**: Gestión de la biblioteca de medios.
- **Usuarios**: Gestión completa de usuarios y roles de WordPress.
- **Meta Data**: Gestión de metadatos personalizados para posts, productos, pedidos y clientes.

## 3. Requerimientos Técnicos
- **Lenguaje**: TypeScript.
- **Arquitectura**: Clean Architecture + DDD.
- **Protocolo**: JSON-RPC 2.0 (MCP).
- **Comunicación**: Stdin/Stdout para compatibilidad con clientes MCP.
- **Seguridad**: Autenticación vía Consumer Key/Secret para WooCommerce y Basic Auth para WordPress.

## 4. Requerimientos de Calidad (Paridad con Xubio)
- **Paridad de API**: Implementación del 100% de los endpoints GET disponibles en la documentación oficial de WooCommerce v3.
- **Testeabilidad**: Cobertura de tests de integración para todas las herramientas registradas.
- **Documentación**: README actualizado con todas las herramientas disponibles y ejemplos de uso.
