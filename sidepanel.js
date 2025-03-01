document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.querySelector("#date");
    if (dateElement) dateElement.textContent = new Date().getFullYear();
    const buttonPassenger = document.querySelector("#avianca__action__passenger");
    if (buttonPassenger) {
        buttonPassenger.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, { action: 'setDefaultFormValues' });
                console.log("Message Send");
            });
        });
    } else {
        console.error("No se ha encontrado el botón de PASAJEROS en el side panel.");
    }
});