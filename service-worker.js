const AVIANCA_ORIGIN = 'https://www.avianca.com';

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
  if (url.origin.includes(AVIANCA_ORIGIN)) {
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