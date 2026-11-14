const {app,BrowserWindow}=require('electron'),fs=require('fs'),path=require('path');
let win;
const fileArg=a=>a.slice(1).find(x=>/\.(pdf|jpe?g|png)$/i.test(x)&&fs.existsSync(x));
function send(p){if(!p||!win)return;win.webContents.send('ft-file',{name:path.basename(p),data:fs.readFileSync(p)})}
function create(){
  win=new BrowserWindow({width:1200,height:850,title:'FT Scanner',webPreferences:{preload:path.join(__dirname,'preload.js')}});
  win.removeMenu();win.loadFile('index.html');
  win.webContents.on('did-finish-load',()=>send(fileArg(process.argv)));
}
if(!app.requestSingleInstanceLock())app.quit();
else{
  app.on('second-instance',(e,argv)=>{if(win){if(win.isMinimized())win.restore();win.focus();send(fileArg(argv))}});
  app.whenReady().then(create);
  app.on('window-all-closed',()=>app.quit());
}
