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
  const fieldAuthoritation = document.querySelector("#acceptNewCheckbox");
  if(fieldAuthoritation) fieldAuthoritation.checked = true;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received: ", message);
  if (message.action === 'setDefaultFormValues') {
    setValuesDefaultPassengers();
  }
});
