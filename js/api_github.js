// --- FASE 1: Lógica de Conexión y Filtrado ---

const username = 'pol3105';
// Pedimos los repos ordenados por actualización para ver los recientes primero
const url = `https://api.github.com/users/${username}/repos?sort=updated`;

async function cargarRepositorios() {
    try {
        console.log("⏳ Consultando a GitHub...");
        
        // 1. La llamada (Fetch)
        const respuesta = await fetch(url);

        // Si la respuesta no es correcta (ej. 404 o 500), lanzamos error
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }

        const datos = await respuesta.json();

        // 2. Filtrado de datos
        // Nos quedamos solo con las 5 propiedades que definiste en tu plan
        const misProyectos = datos.map(repo => {
            return {
                nombre: repo.name,
                descripcion: repo.description || "Sin descripción disponible", 
                lenguaje: repo.language || "Varios",
                estrellas: repo.stargazers_count,
                // Formateamos la fecha para que se lea bien
                actualizado: new Date(repo.updated_at).toLocaleDateString('es-ES') 
            };
        });

        // 3. Prueba en consola
        console.log("✅ Datos recibidos y limpiados:");
        console.table(misProyectos); // .table muestra una tabla perfecta en la consola

        return misProyectos; // Devolvemos los datos para usarlos en la Fase 2

    } catch (error) {
        console.error("❌ Hubo un error al conectar con GitHub:", error);
    }
}

// Ejecutamos la función para probar
cargarRepositorios();