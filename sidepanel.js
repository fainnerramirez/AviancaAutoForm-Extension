document.addEventListener("DOMContentLoaded", function () {
    let countAutoFormUse = 0;
    const getCountUsesStorage = () => {
        return localStorage.getItem("extension-avianca-autoform") || "0";
    }

    const countUses = document.querySelector(".avianca__count");
    if(countUses) countUses.textContent = getCountUsesStorage();

    const setCountUsesStorage = (countValue = 0) => {
        localStorage.setItem("extension-avianca-autoform", countValue);
        if(countUses) countUses.textContent = getCountUsesStorage();
    }

    const dateElement = document.querySelector("#date");
    if (dateElement) dateElement.textContent = new Date().getFullYear();

    const buttonPassenger = document.querySelector("#avianca__action__passenger");

    if (buttonPassenger) {
        buttonPassenger.addEventListener("click", function () {
            setCountUsesStorage(++countAutoFormUse);
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
