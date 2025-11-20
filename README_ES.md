# 👨‍💻 Pol3105 - Portfolio Personal

Bienvenido al código fuente de mi página web personal. Este proyecto sirve como mi tarjeta de presentación digital, donde muestro mis habilidades, proyectos académicos y mi evolución en el desarrollo de software.

🚀 **Web en vivo:** [https://pol3105.github.io/](https://pol3105.github.io/)

## 💡 Sobre el Proyecto

Aunque es un sitio web estático alojado en GitHub Pages, incluye funcionalidades dinámicas para mantenerse actualizado automáticamente. En lugar de editar el código HTML manualmente cada vez que comienzo un nuevo proyecto, la web "habla" con GitHub para mostrar mi trabajo más reciente en tiempo real.

### Características Principales

* **⚡ Carga Dinámica de Proyectos:** Utiliza la API REST de GitHub para obtener automáticamente mis repositorios públicos.
* **🧹 Filtrado Inteligente:** Un motor en JavaScript filtra los sub-repositorios menores (como prácticas universitarias sueltas) y los agrupa de forma lógica para no ensuciar la vista principal.
* **🟢 Rastreador de Actividad:** Un indicador visual muestra qué proyectos han recibido actualizaciones en los últimos 7 días.
* **🌍 Internacionalización (i18n):** Soporte completo para Inglés y Español (EN/ES) mediante un sistema propio en JavaScript (sin librerías externas).
* **📱 Diseño Responsivo:** Diseño totalmente adaptable a escritorio y dispositivos móviles.

## 🛠️ Stack Tecnológico

* **Núcleo:** HTML5, CSS3.
* **Lógica:** Vanilla JavaScript (ES6+) - Sin frameworks pesados, solo lógica pura.
* **Datos:** GitHub REST API (Endpoints de Usuarios y Repositorios).
* **Visuales:** FontAwesome y Badges dinámicos de Shields.io.

## 📂 Cómo Funciona

La lógica principal se encuentra en el archivo `js/api_github.js`. El flujo de datos es el siguiente:

1.  **Consulta (Fetch):** La web pide mi lista de repositorios ordenada por fecha de actualización.
2.  **Filtrado:** Aplica una "lista de exclusión" para omitir repositorios de configuración o prácticas sueltas.
3.  **Enriquecimiento:** Genera insignias (badges) de colores dinámicamente según el lenguaje de programación usado.
4.  **Traducción:** Cruza los nombres de los repositorios con un diccionario interno para mostrar las descripciones en español cuando el usuario cambia el idioma.
5.  **Renderizado:** Finalmente, inyecta las tarjetas HTML limpias en el DOM de la página.

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