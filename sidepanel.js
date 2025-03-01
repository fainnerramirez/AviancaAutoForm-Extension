document.addEventListener("DOMContentLoaded", function () {
    const dateElement = document.querySelector("#date");
    if (dateElement) dateElement.textContent = new Date().getFullYear();
    const button = document.querySelector("#avianca__button");

    if (button) {
        button.addEventListener("click", function () {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, { action: 'setDefaultFormValues' });
                console.log("Message Send");
            });
        });
    } else {
        console.error("No se ha encontrado el botón en el side panel.");
    }
});
