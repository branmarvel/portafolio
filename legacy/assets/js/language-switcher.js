
document.addEventListener('DOMContentLoaded', function() {
    const langToggleButton = document.getElementById('language-toggle-btn');

    if (langToggleButton) {
        langToggleButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevenir la navegación inmediata
            const targetUrl = this.href;

            // Añade una clase para el fade out
            document.body.classList.add('page-fade-out');

            // Espera a que termine la animación y luego navega
            setTimeout(function() {
                window.location.href = targetUrl;
            }, 300); // Debe coincidir con la duración de tu transición CSS (ej. 0.3s)
        });
    }

    // Opcional: Para un fade-in al cargar la nueva página
    // Esta clase se añadirá al body en cada carga de página.
    // El CSS se encargará de la animación.
    // Asegúrate de que no interfiera con tu preloader si tienes uno.
    if (!document.body.classList.contains('page-fade-out')) { // Solo aplica fade-in si no estamos saliendo
        document.body.classList.add('page-fade-in');
    }

    // Si estás usando un preloader que ya maneja el fade-in inicial,
    // podrías querer quitar la lógica de 'page-fade-in' de aquí
    // y solo concentrarte en el 'page-fade-out'.

    // O, si tu preloader quita una clase como 'is-preload', puedes hacer:
    // window.addEventListener('load', () => {
    //    if (!document.body.classList.contains('is-preload')) {
    //        document.body.classList.add('page-fade-in');
    //    }
    // });
});