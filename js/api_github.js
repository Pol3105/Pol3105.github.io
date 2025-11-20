const username = 'pol3105';
const url = `https://api.github.com/users/${username}/repos?sort=updated`;

async function cargarRepositorios() {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
        
        const datosBrutos = await respuesta.json();

        // 1. LISTA NEGRA
        const reposOcultos = ['Pol3105', 'PW_pe2', 'GuardianVision', 'Courtly'];

        // 2. FILTRADO
        const reposFiltrados = datosBrutos.filter(repo => !reposOcultos.includes(repo.name));
        
        // 3. RENDERIZADO
        const contenedor = document.getElementById('proyectos-container');
        
        if (!contenedor) {
            return;
        }

        contenedor.innerHTML = ''; 

        reposFiltrados.forEach(repo => {
            
            // --- LÓGICA DE ESTILOS Y DATOS ---
            const lenguaje = repo.language || 'Code';
            const lenguajeColor = encodeURIComponent(lenguaje);
            const badgeUrl = `https://img.shields.io/badge/${lenguajeColor}-222?style=flat&logo=${lenguaje.toLowerCase()}&logoColor=white`;
            const descripcion = repo.description || "Project without description";

            // --- LÓGICA DE URLS (La parte nueva) ---
            const urlEn = repo.html_url; // URL base (lleva al README.md por defecto)
            
            // Construimos la URL en español asumiendo que la rama es 'main'
            // Si alguno de tus repos usa 'master', avísame para ajustarlo.
            const urlEs = `${repo.html_url}/blob/main/README_ES.md`;

            // --- PLANTILLA HTML ---
            const tarjeta = `
                <div class="project-card">
                  <h3 data-lang-en="${repo.name}" data-lang-es="${repo.name}">
                    ${repo.name}
                  </h3>
                  
                  <div style="margin: 10px 0;">
                    <img src="${badgeUrl}" alt="${lenguaje}">
                    <img src="https://img.shields.io/badge/Stars-${repo.stargazers_count}-yellow?style=flat&logo=github" alt="Stars">
                  </div>

                  <p data-lang-en="${descripcion}"
                     data-lang-es="${descripcion}">
                     ${descripcion}
                  </p>
                  
                  <a href="${urlEn}"
                     target="_blank"
                     class="repo-link"
                     data-lang-en="View Repository"
                     data-lang-es="Ver Repositorio"
                     data-link-en="${urlEn}"
                     data-link-es="${urlEs}">
                     View Repository
                  </a>
                </div>
            `;

            contenedor.innerHTML += tarjeta;
        });

        // --- PASO EXTRA: SINCRONIZACIÓN ---
        // Si el usuario ya había pulsado "ES" antes de que cargaran los repos,
        // forzamos una comprobación rápida para actualizar los links recién creados.
        verificarIdiomaActual();

    } catch (error) {
        console.error("❌ Error cargando repos:", error);
    }
}

// Pequeña función auxiliar para sincronizar con tu botón de idioma
function verificarIdiomaActual() {
    const botonIdioma = document.getElementById('lang-switch');
    // Si el botón dice "EN", significa que estamos viendo la web en ESPAÑOL (porque el botón ofrece cambiar a inglés)
    // O si tienes una variable global 'currentLang', úsala.
    if (botonIdioma && botonIdioma.textContent.includes('EN')) {
        const nuevosLinks = document.querySelectorAll('.repo-link');
        nuevosLinks.forEach(link => {
            if(link.hasAttribute('data-link-es')) {
                link.href = link.getAttribute('data-link-es');
                link.textContent = link.getAttribute('data-lang-es');
            }
        });
    }
}

cargarRepositorios();