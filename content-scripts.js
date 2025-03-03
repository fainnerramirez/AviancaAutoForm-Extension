userNamesData = [
  "john doe",
  "jane smith",
  "alexander wilson",
  "maria gomez",
  "roberto perez",
  "lucia martinez",
  "david hernandez",
  "carla jones",
  "luis vega",
  "susan brown"
];

lastNamesData = [
  "Doe",
  "Smith",
  "Wilson",
  "Gomez",
  "Perez",
  "Martinez",
  "Hernandez",
  "Jones",
  "Vega",
  "Brown"
];

emailsData = [
 "monitoreo.digital@avianca.com"
];

phoneNumbersData = [
  "123456",
  "987654",
  "654321",
  "321654",
  "987123",
  "456789",
  "102938",
  "112233",
  "778899",
  "334455"
];

const getDataRandom = (data = []) => {
  return data[Math.floor(Math.random() * data.length)];
}

const getValueElement = (element) => {
  let value = null;
  if (element.name === "email") {
    value = getDataRandom(emailsData);
  }
  else if (element.name === "phone_phoneNumberId") {
    value = getDataRandom(phoneNumbersData);
  }
  else if (element.id.includes("IdFirstName")) {
    value = getDataRandom(userNamesData);
  }
  else {
    value = getDataRandom(lastNamesData);
  }
  return value;
}

const setValuesDefaultAutoForm = () => {
  const elements = document.querySelectorAll('.ui-input');
  console.log("elements: ", elements);
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
      element.value = getValueElement(element);
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
  if (fieldAuthoritation) fieldAuthoritation.checked = true;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Message received: ", { message, sender, sendResponse });
  if (message.action === 'setDefaultFormValues') {
    setValuesDefaultAutoForm();
  }
});