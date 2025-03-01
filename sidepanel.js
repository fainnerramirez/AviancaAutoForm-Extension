// Este código se ejecuta dentro del contexto del side panel, no en la página de Avianca

document.addEventListener("DOMContentLoaded", function () {
    // Asegúrate de que el DOM del side panel esté completamente cargado
    const button = document.querySelector("#avianca__button");

    if (button) {
        button.addEventListener("click", function () {
            console.log("Botón presionado en el side panel");

            // Aquí puedes llamar a cualquier otra función que desees ejecutar
            // como enviar un mensaje a la página principal para modificar el formulario, por ejemplo
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, { action: 'setDefaultFormValues' });
            });
        });
    } else {
        console.error("No se ha encontrado el botón en el side panel.");
    }
});
