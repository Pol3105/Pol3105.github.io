const username = 'pol3105';
const url = `https://api.github.com/users/${username}/repos?sort=updated`;

async function cargarRepositorios() {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
        
        const datosBrutos = await respuesta.json();

        // 1. LISTA NEGRA (Ocultar los que no queremos)
        const reposOcultos = ['Pol3105', 'PW_pe2', 'GuardianVision', 'Courtly'];

        // 2. FILTRADO
        const reposFiltrados = datosBrutos.filter(repo => !reposOcultos.includes(repo.name));
        
        console.log("✅ Cargando proyectos con diseño original...");

        // 3. RENDERIZADO
        const contenedor = document.getElementById('proyectos-container');
        
        if (!contenedor) {
            console.error("❌ ERROR: No encuentro <div id='proyectos-container'> en el HTML");
            return;
        }

        contenedor.innerHTML = ''; // Limpiar

        reposFiltrados.forEach(repo => {
            
            // Detectar lenguaje para el Badge (Insignia)
            const lenguaje = repo.language || 'Code';
            const lenguajeColor = encodeURIComponent(lenguaje); // Para que funcione en la URL
            
            // Generamos la URL del badge estilo shields.io dinámicamente
            const badgeUrl = `https://img.shields.io/badge/${lenguajeColor}-222?style=flat&logo=${lenguaje.toLowerCase()}&logoColor=white`;

            // Descripción (Si no hay, ponemos un texto genérico)
            const descripcion = repo.description || "Project without description";

            // PLANTILLA EXACTA A TU DISEÑO ORIGINAL
            // Usamos tus clases: project-card, data-lang, etc.
            // Nota: Como la API viene en inglés, ponemos la misma descripción en ES y EN por ahora.
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
                  
                  <a href="${repo.html_url}"
                     target="_blank"
                     data-lang-en="View Repository"
                     data-lang-es="Ver Repositorio"
                     data-link-en="${repo.html_url}"
                     data-link-es="${repo.html_url}">
                     View Repository
                  </a>
                </div>
            `;

            contenedor.innerHTML += tarjeta;
        });

    } catch (error) {
        console.error("❌ Error cargando repos:", error);
    }
}

cargarRepositorios();