class ProcessValuesFormAvianca {
    constructor(){}
    getDevice(){
        return document.querySelector("html").offsetWidth >= 992 ? "des" : "mob";
    }

    setValuesDefaultPassengers = () => {
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

    handleExtensionChromeAvianca = () => {
        document.querySelector("#avianca__extension__button")?.addEventListener("click", () => {
            console.log("Click en setear valores por defecto en formulario");
            setValuesDefaultPassengers();
        });
    }

    Init = () => {
        console.log("Se inicio el proceso de avianca");
        const element = document.querySelector(".passenger_data");
        console.log("Elemento padre extension avianca: ", element);
        if (element) {
            handleExtensionChromeAvianca();
        }
    }
}

const app = new ProcessValuesFormAvianca();
app.Init();