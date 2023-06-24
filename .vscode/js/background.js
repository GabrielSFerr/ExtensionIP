chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var activeTab = tabs[0];
        var url = new URL(activeTab.url);
        
        // Verificar se o URL corresponde à página do AbuseIP
        if (url.hostname === 'www.abuseipdb.com') {
          // Capturar o print da página ativa
          chrome.tabs.captureVisibleTab(null, { format: 'png' }, function(dataUrl) {
            // Enviar uma mensagem para a página popup.js com o print capturado
            chrome.tabs.sendMessage(activeTab.id, { action: 'printCaptured', dataUrl: dataUrl });
          });
        }
      });
    }
  });
  