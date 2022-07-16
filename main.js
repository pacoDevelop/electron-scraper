// Modules to control application life and create native browser window
const {app, BrowserWindow,ipcMain} = require('electron')
const path = require('path')
const { dialog } = require('electron')


  
function createWindow () {
  const spinner=new BrowserWindow({
    width: 170,
    height: 190,
    backgroundColor: '#2e2c29',
    title: "Cargando",
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, 'asset/img/ico.png'),
    autoHideMenuBar: true});

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#2e2c29',
    title: "pacoDevelop",
    icon: path.join(__dirname, 'asset/img/ico.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  
  spinner.loadFile("spinner.html")
  mainWindow.loadFile('index.html');
  spinner.hide()
  mainWindow.hide();
  mainWindow.webContents.on('did-finish-load', function () {
    mainWindow.show();
    spinner.hide();
  });

  ipcMain.on('submitForm', function(event, data) {
    console.log(data)
    if(data){
    mainWindow.hide();
    spinner.show();
    mainWindow.webContents.on('did-finish-load', function () {
      mainWindow.show();
      spinner.hide()
    });
    mainWindow.loadURL('http://'+data);
    }
  });

  mainWindow.webContents.on("did-fail-load", function() {
    console.log("did-fail-load");
    mainWindow.hide()
    spinner.show();
    mainWindow.webContents.on('did-finish-load', function () {
      mainWindow.show();
      spinner.hide()
    });
    mainWindow.loadFile('index.html');
  });  

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault()
    dialog.showMessageBox(mainWindow, {
      title: 'No autorizado',
      buttons: ['Cerrar mensaje'],
      type: 'warning',
      message: 'No puede abrir ese enlace',
     });
    mainWindow.webContents.send('blocked-new-window', url)
  })
  
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })