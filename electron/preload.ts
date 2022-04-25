const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  test: () => console.log('This is a test'),
});
