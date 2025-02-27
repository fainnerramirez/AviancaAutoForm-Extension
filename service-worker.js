const AVIANCA_ORIGIN = 'https://www.avianca.com';

// Abre el side panel al darle click en el icono de la extensión.

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (!tab.url) return;
  const url = new URL(tab.url);
  // habilitar el sidepanel en avianca.com
  if (url.origin.includes(AVIANCA_ORIGIN)) {
    await chrome.sidePanel.setOptions({
      tabId,
      path: 'public/sidepanel.html',
      enabled: true
    });
  } else {
    // Desabilitar el side panel en sitios diferentes
    await chrome.sidePanel.setOptions({
      tabId,
      enabled: false
    });
  }
});