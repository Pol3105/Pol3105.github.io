const username = 'pol3105';
const url = `https://api.github.com/users/${username}/repos?sort=updated`;

// --- DICCIONARIO DE TRADUCCIONES ---
// Asegúrate de que las claves (izquierda) sean IDÉNTICAS al nombre del repo
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
            
            // Estilos Badge
            const lenguaje = repo.language || 'Code';
            const lenguajeColor = encodeURIComponent(lenguaje);
            const badgeUrl = `https://img.shields.io/badge/${lenguajeColor}-222?style=flat&logo=${lenguaje.toLowerCase()}&logoColor=white`;

            // --- LÓGICA DE TEXTOS CORREGIDA ---
            // 1. Definimos la descripción en Inglés (Si es null, ponemos texto genérico)
            let descEN = repo.description;
            if (!descEN) {
                descEN = "Project without description";
            }

            // 2. Definimos la descripción en Español
            // Prioridad: 1º Diccionario, 2º Descripción de GitHub, 3º Texto genérico
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

        // IMPORTANTE: Forzamos la actualización de idioma INMEDIATAMENTE después de pintar
        // Esto arregla que se vean en inglés aunque estés en modo español
        setTimeout(verificarIdiomaActual, 50);

    } catch (error) {
        console.error("❌ Error cargando repos:", error);
    }
}

function verificarIdiomaActual() {
    const botonIdioma = document.getElementById('lang-switch');
    
    // Si el botón existe y dice "EN", significa que la web está visualmente en ESPAÑOL
    if (botonIdioma && botonIdioma.textContent.includes('EN')) {
        console.log("🔄 Detectado modo Español: Traduciendo tarjetas dinámicas...");
        
        const tarjetas = document.querySelectorAll('#proyectos-container .project-card');
        
        tarjetas.forEach(card => {
            // Traducir título (por si acaso)
            const h3 = card.querySelector('h3');
            if(h3) h3.textContent = h3.getAttribute('data-lang-es');

            // Traducir descripción
            const p = card.querySelector('p');
            if(p) p.textContent = p.getAttribute('data-lang-es');

            // Traducir botón
            const a = card.querySelector('.repo-link');
            if(a) {
                a.textContent = a.getAttribute('data-lang-es');
                a.href = a.getAttribute('data-link-es');
            }
        });
    }
}

cargarRepositorios();