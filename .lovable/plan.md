# PIT STOP MOTOR — primera versión

## Objetivo
Crear una web corporativa premium y técnica para convertir visitas en citas, con contenido en español, transparencia digital y una experiencia impecable en móvil y escritorio.

## Páginas y navegación
- Inicio editorial con presentación, confianza, servicios, flujo de trabajo, presupuesto digital, seguimiento, motivos para elegir el taller, opiniones de demostración y contacto.
- Página de servicios con los ocho servicios reservables y accesos directos a cita.
- Página “Cómo trabajamos” con el proceso completo y foco en autorización previa.
- Página de presupuesto digital con mockup móvil y explicación detallada.
- Página de seguimiento con prototipo visual de estados del vehículo.
- Página de opiniones, marcadas inequívocamente como ejemplos de diseño.
- Página de contacto con los horarios facilitados y datos editables claramente señalados.
- Página “Pedir cita” conectada al endpoint indicado, sin cuenta obligatoria.
- Página “Mi cuenta” como acceso visual al futuro seguimiento, sin fingir autenticación.
- Ruta `/admin` como prototipo privado no operativo y excluido de indexación.

## Reserva real
- Formulario por pasos: servicio, fecha, hueco disponible y datos del cliente/vehículo.
- Matrícula obligatoria; modelo y notas opcionales.
- Consulta GET con fecha y código de servicio; creación POST JSON.
- Validación en el navegador y en una función intermedia del servidor, estados de carga, éxito, error y hueco ocupado.
- No se mostrarán datos de otros clientes ni servicios no permitidos.

## Dirección visual
- Negro/antracita mate, blanco técnico, rojo como acción y azul como información.
- Tipografía sans contundente, líneas de precisión, fotografía automoción oscura y mockups de producto.
- Animaciones discretas, foco visible, alto contraste y adaptación móvil completa.

## Contenido y edición futura
- Contenido, servicios, horarios, datos de contacto y navegación centralizados para facilitar un futuro PIT STOP ADMIN.
- Teléfono, email, dirección y WhatsApp permanecerán como campos editables señalados, sin inventar datos.

## Detalles técnicos
- Componentes reutilizables y páginas independientes para SEO y enlaces compartibles.
- Metadatos únicos por página; `/admin` y “Mi cuenta” no se indexarán.
- La reserva se canalizará desde el servidor para validar y normalizar las respuestas del endpoint existente.
- Se comprobarán los recorridos principales en escritorio y móvil.
