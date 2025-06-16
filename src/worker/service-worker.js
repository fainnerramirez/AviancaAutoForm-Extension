const URLS_AVIANCA = [
  "https://www.avianca.com",
  "https://nuxqa.avtest.ink",
  "https://nuxqa2.avtest.ink",
  "https://nuxqa3.avtest.ink",
  "https://nuxqa4.avtest.ink",
  "https://nuxqa5.avtest.ink",
  "https://nuxqa6.avtest.ink"
];

chrome.runtime.onInstalled.addListener(() => {
  console.log("La extensión ha sido instalada.");
});

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

// Habilitar el side panel solo en avianca.com
chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  if (URLS_AVIANCA.includes(url.origin)) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'sidepanel.html',
      enabled: true,
    });
  } else {
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false,
    });
  }
});