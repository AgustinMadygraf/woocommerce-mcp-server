# Discovery - WooCommerce MCP Server

Este documento registra las dudas despejadas y las áreas de investigación para el **CEO Virtual**.

## Certezas y Decisiones (Dudas Despejadas)

### 1. Integración Cross-MCP (Mapeo de Identidades)
- **Identificador Universal:** El **Email** es el ancla principal.
    - **WooCommerce:** Disponible en el objeto `customer` y `order`.
    - **Chatwoot:** Los contactos se identifican primariamente por email.
    - **Clarity:** Soporta la identificación de usuarios vía `window.clarity("identify", email)`.
- **Acción:** El servidor garantiza que el email esté presente en las respuestas clave para facilitar este cruce.

### 2. Capacidad de "Acción" del CEO
- **Escritura Estratégica:** Se han incluido `update_customer` y `update_order` para gestiones críticas.
- **Seguridad en Batch:** Se ha implementado un sistema de **Audit Logging** y se ha actualizado la descripción de la herramienta `batch_products` con una regla de seguridad estricta para el agente de IA.

### 3. Auditoría y Logs
- **Implementación:** Se ha creado un `AuditLogger` que registra acciones críticas (`BATCH_PRODUCTS`, `UPDATE_ORDER`, `UPDATE_CUSTOMER`) tanto en `stderr` (para el host MCP) como en un archivo local `audit.log`.

### 4. Reportes vs. Datos Crudos
- **Agregación:** Los reportes del CEO (`sales`, `products`, `customers`, `orders`) se han mapeado a los endpoints de `/totals` de WooCommerce para proporcionar una visión macro eficiente.

## Preguntas Abiertas e Incertidumbres

### 1. Sincronización de Datos (Latencia)
- **Nota Operativa:** Existe una latencia inherente en Google Analytics (hasta 24-48hs). El CEO Virtual debe tratar a este MCP de WooCommerce como la **Fuente de Verdad Transaccional** en tiempo real.

---
*Este documento captura la evolución del entendimiento. Las decisiones finales se consolidan en SRS.md.*
