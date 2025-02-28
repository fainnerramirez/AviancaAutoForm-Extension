(function () {
    const device = document.querySelector("html").offsetWidth >= 992 ? "des" : "mob";
    const numScript = "[FB_PASAJEROS_DINÁMICOS]";
    console.log(numScript);

    const preload = (maxIntents) => {
        setTimeout(() => {
            const element = document.querySelector(".passenger_data");
            if (element) {
                handleExtensionChromeAvianca();
            } else if (maxIntents >= 75) {
                console.warn(numScript, "Elemento no ha cargado!");
            } else {
                preload(maxIntents + 1);
            }
        }, 300);
    };

    const setValuesDefaultPassengers = () => {
        const elements = document.querySelectorAll(".ui-input");
        Array.from(elements).forEach((element, index) => {
            if (element.tagName === "BUTTON") {
                element.click();
                const listOptions = document.querySelector(".ui-dropdown_list");
                listOptions?.querySelector(".ui-dropdown_item>button").click();
            }
            else if (element.tagName === "INPUT") {
                const containers = document.querySelectorAll(".ui-input-container");
                Array.from(containers).forEach(e => { e.classList.add("is-focused") });
                let eventBlur = new Event("blur");
                let eventFocus = new Event("focus");
                element.value = element.name === "email" ? "monitoria.digital@avianca.com" : (element.name === "phone_phoneNumberId" ? "123456789" : "Example user");
                ['change', 'input'].forEach(event => {
                    let handleEvent = new Event(event, { bubbles: true, cancelable: false });
                    element.dispatchEvent(handleEvent);
                });
                element.dispatchEvent(eventFocus);
                setTimeout(() => {
                    element.dispatchEvent(eventBlur);
                    Array.from(containers).forEach(e => { e.classList.remove("is-focused") });
                }, 100);
            }
        });
        document.querySelector("#acceptNewCheckbox").checked = true;
    }

    const handleExtensionChromeAvianca = () => {
        document.querySelector("#avianca__extension__button")?.addEventListener("click", () => {
            setValuesDefaultPassengers();
        });
    }

    if (device === "des" || device === "mob") preload(0);
})();