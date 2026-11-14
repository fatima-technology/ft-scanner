const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('ft',{onFile:cb=>ipcRenderer.on('ft-file',(e,f)=>cb(f))});
