// js/github_activity.js

const username = 'pol3105'; // Necesita su propia constante username

async function cargarUltimaActividad() {
    const statusText = document.getElementById('status-text');
    const statusPulse = document.querySelector('.status-pulse');
    const eventosUrl = `https://api.github.com/users/${username}/events`; 

    try {
        statusText.textContent = 'Buscando commits recientes...';
        
        const respuesta = await fetch(eventosUrl);
        if (!respuesta.ok) throw new Error(`Error en API de Eventos: ${respuesta.status}`);

        const eventos = await respuesta.json();

        // Filtrar el evento de tipo PushEvent (el commit)
        const ultimoPush = eventos.find(e => e.type === 'PushEvent');

        if (!ultimoPush) {
            statusText.textContent = 'No se encontró actividad reciente (PushEvent).';
            statusPulse.style.backgroundColor = '#ccc';
            return;
        }

        const repoNombre = ultimoPush.repo.name.split('/')[1]; 
        const fechaEvento = new Date(ultimoPush.created_at);
        const ahora = new Date();
        
        // Calcular el tiempo transcurrido
        const diferenciaMs = ahora - fechaEvento;
        const diferenciaHoras = Math.round(diferenciaMs / (1000 * 60 * 60));

        // Formato del texto
        let tiempoTexto;
        if (diferenciaHoras < 1) {
            tiempoTexto = "hace menos de una hora";
        } else if (diferenciaHoras < 24) {
            tiempoTexto = `hace ${diferenciaHoras} horas`;
        } else {
            const diferenciaDias = Math.floor(diferenciaHoras / 24);
            tiempoTexto = `hace ${diferenciaDias} días`;
        }
        
        statusText.innerHTML = `👨‍💻 Última Actividad: ${tiempoTexto} hice push en '${repoNombre}'`;
        
        // Activar el estilo de latido
        statusPulse.classList.add('status-active');
        statusPulse.style.backgroundColor = '#2ecc71'; 

    } catch (error) {
        console.error("❌ No se pudo cargar la actividad de GitHub:", error);
        statusText.textContent = '❌ Error al cargar actividad. Límite de API alcanzado.';
        statusPulse.style.backgroundColor = '#e74c3c';
    }
}

// Ejecutamos la función de actividad
cargarUltimaActividad();