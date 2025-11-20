const username = 'pol3105';
const url = `https://api.github.com/users/${username}/repos?sort=updated`;

// --- DICCIONARIO DE TRADUCCIONES ---
const traducciones = {
    'Data-Insight-Lab': 'Dashboard Financiero Interactivo construido con Python. Consume datos en tiempo real, realiza limpieza con Pandas y renderiza gráficos dinámicos.',
    'university': 'Agrupación de todos mis proyectos universitarios. Código documentado mostrando habilidades en PHP, MySQL, APIs y desarrollo web.',
    'Pol3105.github.io': 'Código fuente de mi portfolio personal. Web estática alojada en GitHub Pages usando HTML, CSS y JavaScript vainilla.'
};

async function cargarRepositorios() {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
        
        const datosBrutos = await respuesta.json();

        // 1. LISTA NEGRA (Repositorios a ocultar)
        const reposOcultos = ['Pol3105', 'PW_pe2', 'GuardianVision', 'Courtly'];

        // 2. FILTRADO
        const reposFiltrados = datosBrutos.filter(repo => !reposOcultos.includes(repo.name));
        
        const contenedor = document.getElementById('proyectos-container');
        if (!contenedor) return;

        contenedor.innerHTML = ''; 

        reposFiltrados.forEach(repo => {
            
            // --- LÓGICA DEL BADGE (LENGUAJE) ---
            let lenguaje = repo.language;

            // Truco visual: Si es el repo de la uni, forzamos que diga 'PHP' para que se vea bonito
            if (repo.name === 'university') {
                lenguaje = 'PHP'; 
            } else if (!lenguaje) {
                // Si GitHub no devuelve nada, ponemos 'Code'
                lenguaje = 'Code';
            }

            // Generamos la URL del badge
            const lenguajeColor = encodeURIComponent(lenguaje);
            // Nota: logo=${lenguaje.toLowerCase()} intenta buscar el logo oficial. Si no existe, sale solo texto.
            const badgeUrl = `https://img.shields.io/badge/${lenguajeColor}-222?style=flat&logo=${lenguaje.toLowerCase()}&logoColor=white`;


            // --- LÓGICA DE TEXTOS ---
            // 1. Descripción en Inglés (control de nulls)
            let descEN = repo.description;
            if (!descEN) {
                descEN = "Project without description";
            }

            // 2. Descripción en Español (Diccionario -> GitHub -> Genérico)
            const descES = traducciones[repo.name] || repo.description || "Proyecto sin descripción";


            // --- URLS ---
            const urlEn = repo.html_url; 
            const urlEs = `${repo.html_url}/blob/main/README_ES.md`;


            // --- PLANTILLA HTML ---
            const tarjeta = `
                <div class="project-card">
                  <h3 data-lang-en="${repo.name}" data-lang-es="${repo.name}">
                    ${repo.name}
                  </h3>
                  
                  <div style="margin: 10px 0; display: flex; justify-content: space-between; align-items: center;">
                    <img src="${badgeUrl}" alt="${lenguaje}">
                    
                    <img src="https://img.shields.io/badge/Stars-${repo.stargazers_count}-yellow?style=flat&logo=github" alt="Stars">
                  </div>

                  <p data-lang-en="${descEN}"
                     data-lang-es="${descES}">
                     ${descEN} 
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

        // Sincronización inmediata de idioma (útil si ya estabas en modo ES al recargar)
        setTimeout(verificarIdiomaActual, 50);

    } catch (error) {
        console.error("❌ Error cargando repos:", error);
    }
}

function verificarIdiomaActual() {
    const botonIdioma = document.getElementById('lang-switch');
    
    // Si el botón dice "EN", es que estamos viendo la web en Español
    if (botonIdioma && botonIdioma.textContent.includes('EN')) {
        console.log("🔄 Aplicando traducción inicial...");
        
        const tarjetas = document.querySelectorAll('#proyectos-container .project-card');
        
        tarjetas.forEach(card => {
            // Descripción
            const p = card.querySelector('p');
            if(p) p.textContent = p.getAttribute('data-lang-es');

            // Enlace
            const a = card.querySelector('.repo-link');
            if(a) {
                a.textContent = a.getAttribute('data-lang-es');
                a.href = a.getAttribute('data-link-es');
            }
        });
    }
}

cargarRepositorios();