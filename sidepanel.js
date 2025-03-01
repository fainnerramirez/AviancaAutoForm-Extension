document.addEventListener("DOMContentLoaded", function () {
    let countValueUsesAutoForm = 0;
    
    const getCountUsesStorage = () => {
        return localStorage.getItem("extension-avianca-autoform");
    }

    const setCountUsesStorage = (countValue = 0) => {
        localStorage.setItem("extension-avianca-autoform", countValue);
        const countUses = document.querySelector(".avianca__count");
        if(countUses) countUses.textContent = getCountUsesStorage();
    }

    const dateElement = document.querySelector("#date");
    if (dateElement) dateElement.textContent = new Date().getFullYear();

    const buttonPassenger = document.querySelector("#avianca__action__passenger");
    const buttonPayments = document.querySelector("#avianca__action__payment");

    if (buttonPassenger) {
        buttonPassenger.addEventListener("click", function () {
            setCountUsesStorage(++countValueUsesAutoForm);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, { action: 'setDefaultFormPassengerValues' });
                console.log("Message Send");
            });
        });
    } else {
        console.error("No se ha encontrado el botón de PASAJEROS en el side panel.");
    }

    if (buttonPayments) {
        buttonPayments.addEventListener("click", function () {
            setCountUsesStorage(++countValueUsesAutoForm);
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const tabId = tabs[0].id;
                chrome.tabs.sendMessage(tabId, { action: 'setDefaultFormPaymentValues' });
                console.log("Message Send");
            });
        });
    } else {
        console.error("No se ha encontrado el botón de PAGOS en el side panel.");
    }
});
