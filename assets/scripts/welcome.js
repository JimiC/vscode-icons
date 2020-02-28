(() => {
  const vscode = acquireVsCodeApi();
  cbwelcome.addEventListener('change', event => {
    vscode.postMessage({
      command: 'cbwelcomeChanged',
      bool: event.target.checked,
    });
  });
  window.addEventListener('message', event => {
    const cbwelcome = document.getElementById('cbwelcome');
    const message = event.data;
    switch (message.command) {
      case 'dontShowThis':
        if (message.bool) {
          cbwelcome.setAttribute('checked', '');
        } else {
          cbwelcome.removeAttribute('checked');
        }
        break;
    }
  });
})();
