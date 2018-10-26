
var menu1 = {
    id: "meaning",
    title: "Meaning and Translation",
    contexts: ["selection"]
};

var menu2 = {
    id: "speak",
    title: "Pronunciation",
    contexts: ["selection"]
};

function fixedEncodeURI (str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']');
}

chrome.contextMenus.create(menu1);
chrome.contextMenus.create(menu2);

chrome.contextMenus.onClicked.addListener( function(clickData,$scope){
    if (clickData.menuItemId == "meaning" && clickData.selectionText )
    {
        var googleUrl = "https://translate.google.com/#auto/en/" + fixedEncodeURI(clickData.selectionText);
        var search = {
            "url": googleUrl,
            "type": "popup",
            "top": 5,
            "left": 5,
            "width": Math.round(screen.availWidth/2),
            "height": Math.round(screen.availHeight/2)
        };
        chrome.windows.create(search,function(){});
    }

    if(clickData.menuItemId == "speak" && clickData.selectionText)
    {
        chrome.tts.speak(clickData.selectionText, {'lang': 'es','rate': 0.7});
    }

});
console.log('Background Working')

function blockRequest(details) {
    return {
         cancel: true
    }; 
}
function updateFilters(urls) {
      if(chrome.webRequest.onBeforeRequest.hasListener(blockRequest)) {
        chrome.webRequest.onBeforeRequest.removeListener(blockRequest); 
      }
      
      chrome.webRequest.onBeforeRequest.addListener(blockRequest, {
          urls: [
              "*://*.facebook.com/*"
            ]}, ['blocking']); 
} updateFilters(); 
