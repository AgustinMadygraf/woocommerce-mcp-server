# TODO - WooCommerce MCP Server

## Prioridad Alta (Inmediata)
- [ ] **Infraestructura de Tests**: Configurar `vitest` y crear `tests/tools.test.ts` (Paridad con Xubio).
- [ ] **Corrección de Documentación**: Sincronizar `README.md` con `src/index.ts` (Faltan 4 herramientas y corregir `update_settings_option`).
- [ ] **Endpoints GET Core Faltantes**:
    - [ ] `get_order_statuses`
    - [ ] `get_shipping_classes`
    - [ ] `get_customer_downloads`
    - [ ] `get_webhooks` (y `get_webhook`)

## Prioridad Media
- [ ] **Gestión de Webhooks (Escritura)**: `create_webhook`, `update_webhook`, `delete_webhook`.
- [ ] **Mejora de Reportes**: Añadir filtros adicionales y nuevos tipos de reportes si están disponibles en la API.
- [ ] **Batch Operations**: Explorar la implementación de endpoints `/batch` para productos y pedidos.

## Prioridad Baja
- [ ] **WordPress Media**: Agregar herramientas para gestionar la biblioteca de medios.
- [ ] **WordPress Users**: Gestión avanzada de usuarios (más allá de clientes WooCommerce).
- [ ] **Refactorización de Controllers**: Asegurar que todos los controllers sigan estrictamente el patrón de Xubio para facilitar el mantenimiento.
