# Bitácora de uso de IA - Semana 6

## 2026-10-05 · Modal de detalle de Pokémon

**Herramienta:** ChatGPT / Copilot
**Spec que usé:**
Genera un modal nativo usando la etiqueta HTML `<dialog>` para mi aplicación. El modal debe tener un fondo borroso. 
En su interior, debe mostrar: una imagen, un badge para el personaje, un h2 para el nombre, y un párrafo para la descripción. 
Todo debe usar clases de utilidad de Tailwind CSS (versión 4). Dame también el script para que los botones con la clase '.btn-detalle' 
lean los atributos `data-*` y abran el modal.

**Auditoría contra la spec:**
- [x] Usa `<dialog>` y `showModal()`
- [x] Cierra con la tecla Esc y con el botón de "Cerrar"
- [ ] Cierre con clic en el fondo oscuro → la IA no implementó esto correctamente, lo tuve que agregar manualmente 
validando que `e.target === modal`.
- [ ] Estilos del fondo → La IA sugirió clases CSS tradicionales, tuve que cambiarlas por los 
modificadores `backdrop:bg-slate-900/70 backdrop:backdrop-blur-sm` de Tailwind.

**Clases o sintaxis inventadas que encontré:**
- La IA intentó usar `bg-opacity-50` para el fondo del dialog, pero en Tailwind v4 es mejor usar la sintaxis moderna 
con barra fraccionaria (ej. `bg-slate-900/60`).

**Qué no entendí y cómo lo resolví:**
- Al principio no entendía por qué el modal quedaba detrás de otros elementos. Resolví leyendo la documentación: al usar `showModal()` 
en lugar de mostrarlo como un div normal, el navegador lo pone automáticamente en la capa superior (Top Layer) sin necesidad de usar `z-index`.

**¿Puedo explicar cada línea?** 
Sí, entiendo cómo los atributos `data-*` pasan la información desde la tarjeta hacia los elementos con ID dentro del modal.

---

## 2026-10-07 · Implementación de Dark Mode

**Herramienta:** ChatGPT / Copilot
**Spec que usé:**
Toma el HTML que te paso y agrega soporte para modo oscuro usando la variante `dark:` de Tailwind CSS. Aquí tienes la tabla 
de conversión que debes respetar:
- Fondos principales: de `bg-[#EDEFF3]` a `dark:bg-slate-900`
- Fondos de tarjetas: de `bg-white` a `dark:bg-slate-800`
- Texto principal: de `text-[#1F2340]` a `dark:text-slate-100`
No alteres la estructura HTML ni los colores.

**Auditoría contra la spec:**
- [x] Aplicó correctamente la variante `dark:` en todos los fondos y textos.
- [ ] Formularios legibles → olvidó cambiar el color del borde en los `<input>` al estar en modo oscuro.

**Clases o sintaxis inventadas que encontré:**
- Ninguna clase inventada, pero omitió oscurecer las sombras (`shadow-xl`). Lo dejé así ya que en modo oscuro las sombras 
no se notan igual.

**Qué no entendí y cómo lo resolví:**
- No sabía cómo probar el modo oscuro sin cambiar la configuración de todo mi Windows. Lo resolví usando la pestaña "Rendering" 
en DevTools de Chrome y emulando `prefers-color-scheme: dark`.

**¿Puedo explicar cada línea?** 
Sí, entiendo que el prefijo `dark:` solo se activa cuando el navegador detecta que el usuario prefiere un tema oscuro.