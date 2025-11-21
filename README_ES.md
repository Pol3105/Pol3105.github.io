# 👨‍💻 Pol3105 - Portfolio Personal

Bienvenido al código fuente de mi página web personal. Este proyecto sirve como mi tarjeta de presentación digital, mostrando mis habilidades, proyectos académicos y mi evolución en el desarrollo de software.

🚀 **Web en vivo:** [https://pol3105.github.io/](https://pol3105.github.io/)

## 💡 Sobre el Proyecto

Aunque es un sitio web estático alojado en GitHub Pages, incluye funcionalidades dinámicas para mantenerse actualizado automáticamente. En lugar de editar el código HTML manualmente cada vez que comienzo un nuevo proyecto, la web "habla" con GitHub para traer mi trabajo más reciente.

### Características Principales

* **🟢 Widget de Estado en Tiempo Real (¡Nuevo!):** Muestra el mensaje exacto y la hora de mi último commit usando la API de Eventos de GitHub, demostrando desarrollo activo.
* **⚡ Carga Dinámica de Proyectos:** Utiliza la API REST de GitHub para obtener automáticamente mis repositorios públicos.
* **🧹 Filtrado Inteligente:** Un motor en JavaScript filtra los sub-repositorios menores (como tareas universitarias específicas) y los agrupa de forma lógica.
* **📅 Rastreador de Actividad:** Indicadores visuales muestran qué proyectos han recibido actualizaciones en los últimos 7 días.
* **🌍 Internacionalización (i18n):** Soporte completo para Inglés y Español (EN/ES) con un selector personalizado en JS nativo.
* **📱 Diseño Responsivo:** Diseño totalmente adaptable a escritorio y dispositivos móviles.

## 🛠️ Stack Tecnológico

* **Núcleo:** HTML5, CSS3.
* **Lógica:** Vanilla JavaScript (ES6+) - Sin frameworks pesados, solo lógica pura.
* **Datos:** GitHub REST API (Endpoints de Usuarios, Repositorios y **Eventos**).
* **Visuales:** FontAwesome y Badges dinámicos de Shields.io.

## 📂 Cómo Funciona

La lógica del proyecto se divide en dos archivos (`js/api_github.js` para proyectos y `js/github_activity.js` para el widget). Este es el flujo consolidado:

### Lógica de Renderizado de Proyectos

1.  **Consulta:** La web pide mi lista de repositorios ordenada por fecha de actualización.
2.  **Filtro:** Aplica una "lista de exclusión" para omitir repositorios de configuración o prácticas sueltas.
3.  **Enriquecimiento:** Genera insignias dinámicas y mapea los nombres de los repositorios con un diccionario personalizado para las descripciones en español.
4.  **Renderizado:** Inyecta las tarjetas HTML limpias en el DOM de la página.

### Lógica del Widget de Estado en Tiempo Real

El script consulta la API de Eventos de GitHub para obtener el último `PushEvent` y actualiza dinámicamente el encabezado con la hora del commit y el nombre del repositorio.

## 🚀 Desarrollo Local

Si quieres ejecutar este proyecto en tu equipo o revisar el código:

1.  **Clona el repositorio:**
    ```bash
    git clone [https://github.com/Pol3105/Pol3105.github.io.git](https://github.com/Pol3105/Pol3105.github.io.git)
    ```
2.  **Abre el proyecto:**
    Simplemente abre el archivo `index.html` en tu navegador favorito.

## 📬 Contacto

¡No dudes en contactarme si quieres colaborar o charlar sobre código!

* **GitHub:** [Pol3105](https://github.com/Pol3105)
* **Web:** [pol3105.github.io](https://pol3105.github.io/)

---
*Este portfolio se actualiza automáticamente a través de la API de GitHub.*