# Nikistore
Mini ERP
## 🏷️ Tabla: productos 

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | INTEGER (PK, autoincrement) | Identificador único del producto |
| nombre | TEXT | Nombre del producto |
| categoria_id | INTEGER (FK → categorias.id) | Categoría a la que pertenece el producto |
| precio_compra | REAL | Costo de adquisición |
| precio_venta | REAL | Precio al público |
| stock | INTEGER | Unidades disponibles |
| fecha_ingreso | DATETIME | Fecha en que se agregó el producto |
| activo | BOOLEAN (default TRUE) | Si el producto está disponible para la venta |



## 🗂️ Tabla: categorias

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | INTEGER (PK, autoincrement) | Identificador único de la categoría |
| nombre | TEXT (UNIQUE) | Nombre de la categoría (ej. "Figuras", "Papelería", "Moda") |
| descripcion | TEXT (nullable) | Descripción breve o uso de la categoría |
| fecha_creacion | DATETIME | Fecha de registro de la categoría |
| activa | BOOLEAN (default TRUE) | Si la categoría está disponible |


## 🧾 Tabla: ventas

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | INTEGER (PK, autoincrement) | Identificador de la venta |
| fecha | DATETIME | Fecha y hora de la venta |
| cliente | TEXT (nullable) | Nombre del cliente (si aplica) |
| metodo_pago | TEXT (ENUM: efectivo, tarjeta, transferencia, otro) | Método de pago |
| subtotal | REAL | Suma de todos los productos sin descuentos ni impuestos |
| descuento | REAL (default 0) | Descuento aplicado a la venta |
| impuestos | REAL (default 0) | Impuestos calculados |
| total | REAL | Total final de la venta |
| estado | TEXT (ENUM: completada, anulada) | Estado actual de la venta |


## 📦 Tabla: venta_items

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | INTEGER (PK, autoincrement) | Identificador del registro |
| venta_id | INTEGER (FK → ventas.id) | Venta a la que pertenece |
| producto_id | INTEGER (FK → productos.id) | Producto vendido |
| cantidad | INTEGER | Cantidad de unidades vendidas |
| precio_unitario | REAL | Precio por unidad en el momento de la venta |
| total_linea | REAL | Total de la línea (cantidad × precio_unitario) |


## 🔄 Tabla: movimientos_stock

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | INTEGER (PK, autoincrement) | Identificador del movimiento |
| producto_id | INTEGER (FK → productos.id) | Producto afectado |
| tipo | TEXT (ENUM: entrada, salida, ajuste) | Tipo de movimiento |
| cantidad | INTEGER | Cantidad de unidades (positiva) |
| referencia | TEXT | Ej. “venta:12”, “ajuste manual” |
| fecha | DATETIME | Fecha del movimiento |


## 💰 Tabla: ingresos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | INTEGER (PK, autoincrement) | Identificador del ingreso |
| fecha | DATETIME | Fecha del ingreso |
| origen | TEXT (ENUM: venta, otro) | Tipo de ingreso |
| monto | REAL | Monto recibido |
| descripcion | TEXT | Detalle del ingreso |
| relacion_id | TEXT (nullable) | Relación con otra entidad (ej. “venta:5”) |


## 💸 Tabla: gastos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | INTEGER (PK, autoincrement) | Identificador del gasto |
| fecha | DATETIME | Fecha del gasto |
| categoria | TEXT | Tipo de gasto (ej. renta, envío, papelería) |
| monto | REAL | Cantidad gastada |
| descripcion | TEXT | Detalle del gasto |


## 📊 Tabla: presupuestos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id | INTEGER (PK, autoincrement) | Identificador del presupuesto |
| nombre | TEXT | Nombre o etiqueta (ej. “Presupuesto Octubre”) |
| monto_planeado | REAL | Cantidad esperada o planificada |
| monto_real | REAL | Cantidad real gastada o ingresada |
| fecha_inicio | DATE | Fecha de inicio del período |
| fecha_fin | DATE | Fecha de fin del período |


## 🔗 Relaciones

| Relación | Descripción |
|-----------|-------------|
| `productos` 1..N `venta_items` | Un producto puede estar en muchas ventas |
| `ventas` 1..N `venta_items` | Una venta contiene varios productos |
| `productos` 1..N `movimientos_stock` | Cada producto tiene su historial de movimientos |
| `ventas` 1..1 `ingresos` | Cada venta genera un ingreso automático |
| `gastos` y `presupuestos` | Se relacionan en reportes (no FK directa) |

# ⚙️ Requisitos Funcionales — NipponStore

---

## 🏷️ 1. Módulo de Categorías

### RF1.1 — Crear categoría
El sistema debe permitir **registrar una nueva categoría** indicando su nombre y descripción.  
**Ejemplo:** “Papelería”, “Ropa”, “Figuras de anime”.

### RF1.2 — Listar categorías
El sistema debe mostrar una **lista de todas las categorías activas** para poder asignarlas a productos o filtrarlas.

### RF1.3 — Editar categoría
El sistema debe permitir **modificar el nombre o la descripción** de una categoría existente.

### RF1.4 — Desactivar categoría
El usuario puede **desactivar una categoría**, lo que la oculta del selector de productos, pero conserva su historial.

---

## 📦 2. Módulo de Productos (Inventario)

### RF2.1 — Registrar producto
El sistema debe permitir **crear un producto** con nombre, categoría, precios, stock inicial y fecha de ingreso.  
Al guardar el producto, debe generarse automáticamente un **MovimientoStock (entrada)** para reflejar su stock inicial.

### RF2.2 — Editar producto
El usuario puede **actualizar la información** de un producto (nombre, precios, categoría, stock).

### RF2.3 — Eliminar o desactivar producto
El sistema debe permitir **desactivar un producto** para ocultarlo de las ventas, pero sin eliminarlo del historial.

### RF2.4 — Listar productos
El usuario puede ver un **listado completo de productos**, con opciones de **filtrar por categoría, nombre o stock**.

### RF2.5 — Ajustar stock
El usuario puede **aumentar o disminuir stock manualmente**, especificando el motivo.  
Cada ajuste genera un **MovimientoStock (tipo “ajuste”)**.

### RF2.6 — Ver historial de movimientos
El usuario puede consultar los **movimientos de stock** de cada producto (entradas, salidas, ajustes) ordenados por fecha.

---

## 🧾 3. Módulo de Ventas

### RF3.1 — Registrar venta
El sistema debe permitir **crear una nueva venta**, seleccionando productos, cantidades y método de pago.  
Al confirmar:
- Se crea un registro en `ventas`.
- Se crean los registros correspondientes en `venta_items`.
- Se genera un **MovimientoStock (salida)** por cada producto.
- Se genera automáticamente un **Ingreso** con origen `venta`.

### RF3.2 — Consultar historial de ventas
El usuario puede **ver todas las ventas realizadas**, con filtros por fecha, cliente o método de pago.

### RF3.3 — Ver detalle de venta
El usuario puede **abrir una venta específica** para ver los productos vendidos y su detalle (`venta_items`).

### RF3.4 — Anular venta
El sistema debe permitir **anular una venta**, lo cual:
- Cambia su estado a `anulada`.
- Crea movimientos inversos en `movimientos_stock` (entradas).
- Reversa el ingreso asociado (crea uno negativo o marca como revertido).

---

## 💰 4. Módulo de Finanzas

### RF4.1 — Registrar gasto
El usuario puede **registrar un gasto** especificando fecha, categoría, monto y descripción.

### RF4.2 — Registrar ingreso manual
Además de los ingresos por ventas, el usuario puede **crear ingresos adicionales**, por ejemplo “inversión” o “devolución”.

### RF4.3 — Ver lista de ingresos y gastos
El sistema debe mostrar los **ingresos y gastos registrados**, con posibilidad de **filtrar por fecha o categoría**.

### RF4.4 — Consultar resumen financiero
El usuario puede ver un **resumen mensual** con:
- Total de ingresos  
- Total de gastos  
- Utilidad neta *(ingresos - gastos)*

---

## 📊 5. Módulo de Presupuestos

### RF5.1 — Crear presupuesto
Permite **definir un presupuesto** con nombre, monto planeado y periodo de fechas (inicio y fin).

### RF5.2 — Actualizar monto real
El usuario puede **ingresar el monto real gastado o ahorrado** al finalizar el periodo.

### RF5.3 — Comparar presupuesto
El sistema debe **calcular y mostrar la diferencia** entre lo planeado y lo real, tanto en pesos como en porcentaje.

---

## 📈 6. Módulo de Dashboard

### RF6.1 — Ver resumen general
El dashboard principal debe mostrar:
- Total de ventas del mes  
- Total de gastos del mes  
- Balance (ganancia neta)  
- Productos con bajo stock (por debajo de cierto umbral, ej. 5 unidades)  
- Gráfica de ventas por día o semana  

### RF6.2 — Alertas
El sistema debe mostrar **alertas visuales** si:
- Algún producto tiene bajo stock.  
- Hay un presupuesto excedido.

---

## 👩‍💻 7. Módulo de Usuario (opcional para más adelante)

### RF7.1 — Autenticación
El sistema debe permitir **iniciar sesión** con correo y contraseña, usando JWT.

### RF7.2 — Perfil
Debe mostrar **información del usuario autenticado** (nombre, correo, fecha de registro).

