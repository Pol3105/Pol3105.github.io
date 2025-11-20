const username = 'pol3105';
const url = `https://api.github.com/users/${username}/repos?sort=updated`;

async function cargarRepositorios() {
    try {
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error(`Error: ${respuesta.status}`);
        
        const datos = await respuesta.json();

        // --- LISTA NEGRA (Repositorios a ocultar) ---
        // Aquí he puesto exactamente los que me has dicho que NO quieres
        const reposOcultos = [
            'Pol3105',        // Tu repo de perfil (README especial)
            'PW_pe2',         // Uni (Práctica suelta)
            'GuardianVision', // Uni (Tienda cámaras)
            'Courtly'         // Uni (App ISI)
        ];

        const contenedor = document.getElementById('proyectos-container');
        contenedor.innerHTML = ''; // Limpiamos antes de pintar

        datos.forEach(repo => {
            // 1. FILTRO: Si el nombre está en la lista negra, lo saltamos
            if (reposOcultos.includes(repo.name)) {
                return; 
            }

            // --- Renderizado de los que SÍ queremos ---

            // Cálculo de fechas para el punto verde (7 días)
            const fechaActualizacion = new Date(repo.updated_at);
            const haceUnaSemana = new Date();
            haceUnaSemana.setDate(haceUnaSemana.getDate() - 7);
            
            const actividadReciente = fechaActualizacion > haceUnaSemana 
                ? '<span style="color: #2ecc71; font-size: 0.8em; margin-left: 5px;" title="Actualizado esta semana">🟢 Reciente</span>' 
                : '';

            // Creamos la tarjeta HTML
            const tarjeta = `
                <div class="project-card" style="border: 1px solid #ddd; padding: 15px; margin: 10px; border-radius: 8px; background-color: #fff;">
                    <h3>
                        <a href="${repo.html_url}" target="_blank" style="text-decoration: none; color: #000; font-weight: bold;">
                            ${repo.name}
                        </a>
                    </h3>
                    <p style="font-size: 0.9em; color: #666;">${repo.description || "Sin descripción"}</p>
                    
                    <div style="margin-top: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 0.85em;">
                        <span style="background: #f0f0f0; padding: 2px 6px; border-radius: 4px;">💻 ${repo.language || "Varios"}</span>
                        <span>⭐ ${repo.stargazers_count}</span>
                    </div>
                    
                    <div style="margin-top: 10px; font-size: 0.75em; color: #888; border-top: 1px solid #eee; padding-top: 5px;">
                        📅 Actualizado: ${new Date(repo.updated_at).toLocaleDateString('es-ES')}
                        ${actividadReciente}
                    </div>
                </div>
            `;

            contenedor.innerHTML += tarjeta;
        });

    } catch (error) {
        console.error("❌ Error cargando repos:", error);
    }
}

cargarRepositorios();