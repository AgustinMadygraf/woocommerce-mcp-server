# Discovery - WooCommerce MCP Server

Este documento registra **únicamente** las dudas, áreas de investigación e incertidumbres pendientes para el **CEO Virtual**. Las certezas se encuentran en `SRS.md` y `architecture.md`.

## Preguntas Abiertas e Incertidumbres

### 1. Sincronización de Datos (Latencia)
- ¿Qué tan "frescos" son los datos de Google Analytics vs WooCommerce? Si hay una discrepancia de 24hs en Analytics, el CEO debe ser consciente de que los reportes de WooCommerce son la "verdad" transaccional actual. Es necesario investigar si Analytics permite consultas en tiempo real de la misma granularidad.

### 2. Auditoría y Logs de Decisión
- **Trazabilidad:** ¿Debemos implementar un log de auditoría interno en el servidor MCP para registrar las "razones" de un cambio masivo de precio, o delegamos esto totalmente al cliente que orqueste al CEO Virtual?
- **Persistencia de Logs:** Si el servidor es stateless, ¿dónde se guardarían estos logs de auditoría sin añadir una base de datos pesada?

### 3. Profundidad de Reportes Nativos
- ¿Existen KPIs críticos para un CEO (ej. ROAS por producto) que el API de WooCommerce no entregue y que requieran que este servidor haga cálculos complejos uniendo datos de `orders`?

---
*Este documento captura lo que aún NO sabemos.*
