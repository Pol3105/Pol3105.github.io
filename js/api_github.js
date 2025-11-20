const username = 'pol3105';
const url = `https://api.github.com/users/${username}/repos?sort=updated`;

// --- DICCIONARIO DE TRADUCCIONES ---
// Aquí escribimos manualmente la descripción en español para cada proyecto.
// La clave (izquierda) debe ser EL NOMBRE EXACTO del repositorio.
const traducciones = {
    'Data-Insight-Lab': 'Dashboard Financiero Interactivo construido con Python. Consume datos en tiempo real, realiza limpieza con Pandas y renderiza gráficos dinámicos.',
    'university': 'Agrupación de todos mis proyectos universitarios. Código documentado mostrando habilidades en PHP, MySQL, APIs y desarrollo web.',
    'Pol3105.github.io': 'Código fuente de mi portfolio personal. Web estática alojada en GitHub Pages usando HTML, CSS y JavaScript vainilla.',
    // Si añades otro repo importante en el futuro, añade su traducción aquí
};

async function cargarRepositorios() {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
        
        const datosBrutos = await respuesta.json();

        // 1. LISTA NEGRA
        const reposOcultos = ['Pol3105', 'PW_pe2', 'GuardianVision', 'Courtly'];

        // 2. FILTRADO
        const reposFiltrados = datosBrutos.filter(repo => !reposOcultos.includes(repo.name));
        
        const contenedor = document.getElementById('proyectos-container');
        if (!contenedor) return;

        contenedor.innerHTML = ''; 

        reposFiltrados.forEach(repo => {
            
            // Estilos
            const lenguaje = repo.language || 'Code';
            const lenguajeColor = encodeURIComponent(lenguaje);
            const badgeUrl = `https://img.shields.io/badge/${lenguajeColor}-222?style=flat&logo=${lenguaje.toLowerCase()}&logoColor=white`;

            // --- LÓGICA DE TEXTOS ---
            // 1. Descripción en Inglés (Viene directa de GitHub)
            const descEN = repo.description || "Project without description";

            // 2. Descripción en Español (La buscamos en nuestro diccionario)
            // Si no existe en el diccionario, usamos la de inglés como plan B
            const descES = traducciones[repo.name] || descEN;

            // --- LÓGICA DE URLS ---
            const urlEn = repo.html_url; 
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

                  <p data-lang-en="${descEN}"
                     data-lang-es="${descES}">
                     ${descEN} </p>
                  
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

        // Sincronización final por si el usuario ya tiene la web en español
        verificarIdiomaActual();

    } catch (error) {
        console.error("❌ Error cargando repos:", error);
    }
}

function verificarIdiomaActual() {
    const botonIdioma = document.getElementById('lang-switch');
    // Si el botón ofrece cambiar a 'EN', es que estamos en 'ES'
    if (botonIdioma && botonIdioma.textContent.includes('EN')) {
        
        // Actualizamos links y textos de las nuevas tarjetas
        const tarjetas = document.querySelectorAll('#proyectos-container .project-card');
        
        tarjetas.forEach(card => {
            // Actualizar descripción (párrafo)
            const p = card.querySelector('p');
            if(p) p.textContent = p.getAttribute('data-lang-es');

            // Actualizar enlace
            const a = card.querySelector('a');
            if(a) {
                a.textContent = a.getAttribute('data-lang-es');
                a.href = a.getAttribute('data-link-es');
            }
        });
    }
}

cargarRepositorios();