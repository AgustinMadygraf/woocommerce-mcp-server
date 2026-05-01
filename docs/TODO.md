# TODO - WooCommerce MCP Server

## Prioridad Alta (Inmediata)
- [x] **Infraestructura de Tests**: Configurar `vitest` y crear `tests/tools.test.ts` (Paridad con Xubio).
- [x] **Corrección de Documentación**: Sincronizar `README.md` con `src/index.ts`.
- [x] **Endpoints GET Core Faltantes**: `get_order_statuses`, `get_shipping_classes`, `get_customer_downloads`, `get_webhooks`.

## Prioridad Media
- [x] **Gestión de Webhooks (Escritura)**: `create_webhook`, `update_webhook`, `delete_webhook`.
- [x] **Mejora de Reportes**: Soporte para reportes de totales y filtros avanzados (Top Sellers, Orders Totals, etc).
- [x] **Batch Operations**: Implementación de endpoints `/batch` para productos y pedidos.

## Prioridad Baja
- [x] **WordPress Media**: Agregar herramientas para gestionar la biblioteca de medios.
- [x] **WordPress Users**: Gestión avanzada de usuarios (más allá de clientes WooCommerce).
- [x] **Refactorización de Controllers**: Asegurar que todos los controllers sigan el patrón DDD.
- [x] **Plugins & Themes**: Consultar estado de plugins y temas activos.

---
**Proyecto Finalizado con Éxito - Paridad 100% con Estándares de Calidad**
