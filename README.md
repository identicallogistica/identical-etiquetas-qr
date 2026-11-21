# Identical · Sistema Logístico

[Ingresar al portal](https://identicallogistica.github.io/identical-etiquetas-qr/)

El portal integra Kardex, Data Maestra y las herramientas QR existentes. El acceso se valida en el servicio privado de Apps Script de Identical.

- **Kardex** permite consultar stock por almacén, ubicación, lote y vencimiento. Registra ingresos, salidas a sedes, traslados y consumo con confirmación e identificador de operación.
- **Data Maestra** administra productos, códigos, descripciones, imágenes, proveedores, tipos de ítem, sedes, aprobaciones, servicios y configuración de pagos recurrentes. Incluye consulta del historial de cambios.
- **QR** conserva escáner, etiquetas de productos y ubicaciones, formatos de impresión, PDF y el historial.
- **Requerimientos** y **Compras** aparecen como módulos no disponibles.

Las hojas de Google Sheets contienen los datos operativos. El portal consulta sus cambios al actualizar y periódicamente mientras está abierto. Los registros de la web se confirman en esas mismas hojas.

Los scripts del servidor y la configuración de acceso se conservan en los proyectos privados de Apps Script de Identical.
