(() => {
  const vscode = acquireVsCodeApi();
  const cbwelcome = document.getElementById('cbwelcome');
  setTimeout(() => {
    cbwelcome.removeAttribute('checked');
    vscode.postMessage({
      command: 'alert',
      text: 'Checkbox changed',
    });
  }, 5000);
  window.addEventListener('message', event => {
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
