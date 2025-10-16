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

fecha_fin	DATE	Fecha de fin del período
