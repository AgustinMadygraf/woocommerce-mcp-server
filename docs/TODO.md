# TODO - WooCommerce MCP Server (Virtual CEO Edition)

## Fase 1: Poda Técnica y Consolidación (En Curso)
- [ ] **Desactivación de Herramientas**: Eliminar o comentar las 124 herramientas no esenciales del `tools/list` en `src/index.ts`.
- [ ] **Limpieza de Controladores**: Remover la lógica de los controladores que ya no se expondrán para reducir la superficie de ataque y complejidad.
- [ ] **Validación de Endpoints Core**: Asegurar que las 12 herramientas seleccionadas para el CEO Virtual funcionan correctamente y devuelven el `email` para interoperabilidad.

## Fase 2: Seguridad y Operación Estratégica
- [ ] **Confirmación de Batch**: Implementar lógica en el cliente o agente para requerir confirmación humana en `batch_products` cuando afecte >10% del catálogo.
- [ ] **Mejora de Reportes**: Verificar si los reportes actuales cubren los KPIs necesarios o si se requiere agregación manual en el servidor.
- [ ] **Log de Auditoría**: Investigar e implementar un sistema ligero de logging para acciones críticas tomadas por la IA.

## Fase 3: Interoperabilidad Cross-MCP
- [ ] **Pruebas de Correlación**: Validar el flujo de datos usando el email entre este MCP y Chatwoot/Clarity.
- [ ] **Manejo de Latencia**: Implementar advertencias en las respuestas de reportes si se detecta que los datos podrían no estar sincronizados con otros MCPs (ej. Analytics).

---
**Estado: Fase de Poda Técnica Iniciada**
Consulte [TODO.done.md](./TODO.done.md) para ver las tareas completadas recientemente.
