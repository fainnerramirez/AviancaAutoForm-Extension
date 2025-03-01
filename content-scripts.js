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
  "john_doe123@example.com",
  "jane_smith89@example.com",
  "alexander.wilson@domain.com",
  "maria.gomez22@email.com",
  "roberto.perez@company.org",
  "lucia.martinez@domain.com",
  "david_hernandez12@gmail.com",
  "carla.jones@yahoo.com",
  "luis.vega@hotmail.com",
  "susan.brown@outlook.com"
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
      
      if(element.name === "email"){
        element.value = getDataRandom(emailsData);
      }
      else if(element.name === "phone_phoneNumberId"){
        element.value = getDataRandom(phoneNumbersData);
      }
      else if(element.id.includes("IdFirstName")){
        element.value = getDataRandom(userNamesData);
      }
      else {
        element.value = getDataRandom(lastNamesData);
      }
      
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
  console.log("Message received: ", message);
  if (message.action === 'setDefaultFormValues') {
    setValuesDefaultPassengers();
  }
});