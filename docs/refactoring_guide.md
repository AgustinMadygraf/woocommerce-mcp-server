# Guía de Migración de Métodos

Para refactorizar cada método del `switch` gigante en `index.ts`, sigue estos pasos:

1. **Identificar el Dominio**: Determina si el método pertenece a `Products`, `Orders`, etc.
2. **Crear el Caso de Uso**: Crea un archivo en `src/application/use-cases/[Domain]/[Action].ts`.
3. **Definir el DTO**: Si el método requiere parámetros complejos, define una interfaz para ellos.
4. **Implementar la Lógica**: Usa el `WooCommerceClient` o `WordPressClient` dentro del caso de uso.
5. **Registrar en el Controlador**: Crea un controlador en `src/interfaces/mcp/controllers/` que invoque al caso de uso.
6. **Actualizar `index.ts`**: Reemplaza el bloque de código en el `switch` por una llamada al controlador/caso de uso.

## Ejemplo: `get_products`

### Antes (`index.ts`)
```typescript
case "get_products":
  const productsResponse = await client.get("/products", {
    params: {
      per_page: params.perPage || 10,
      page: params.page || 1,
      ...params.filters,
    },
  });
  return productsResponse.data;
```

### Después
Se crearía `GetProductsUseCase` que usa `WooCommerceClient` y se invoca desde un `ProductController`.
