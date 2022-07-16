// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  document.title="pacoDevelop";

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  function getImagesByAlt(alt) {
    var allImages = document.getElementsByTagName("img");
    var images = [];
    for (var i = 0, len = allImages.length; i < len; ++i) {
        if (allImages[i].alt == alt) {
            images.push(allImages[i]);
        }
    }
    return images;
}
let images=getImagesByAlt("Hoy");
images.length>0?images.forEach((e)=>e.src="https://avatars.githubusercontent.com/u/70912492?s=400&u=d15db5912c2ae7dbe2edaacbefb5091dcc3136c5&v=4"):null;

})
