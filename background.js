var BlinkUrl = 'http://cogdev.net/blink';

var local_files = {
  'arrow_refresh.png': 'images',
  'favicon.ico': 'images',
  'blink.min.js': 'js',
  'jquery.min.js': 'js',
  'blink.css': 'css'
};

chrome.browserAction.onClicked.addListener(function(activeTab) {
  if(activeTab.url.indexOf(BlinkUrl) === 0) {
    chrome.tabs.update(activeTab.id, {
      url: BlinkUrl + '/?act=home'
    })
  } else {
    chrome.tabs.getAllInWindow(null, function(tabs){
      //find the first blink tab, switch to it
      for (var i=0; i < tabs.length; i++) {
        if(tabs[i].url.indexOf(BlinkUrl) === 0) {
          chrome.tabs.update(tabs[i].id, {selected: true});
          chrome.tabs.reload(tabs[i].id);
          return;
        }
      }
               
      // "ill take a tab" - Homer
      chrome.tabs.create({url: BlinkUrl });
    })

  }
});

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    chrome.tabs.getSelected(function(at){
      activeTab = at;
    });
    
    //if this is the parent request
    if(typeof activeTab == 'undefined') return;

    url = details.url.replace(/#(.*?)$/, '');
    
    if(activeTab.url.indexOf(BlinkUrl) === 0) {
      file = url.substr(url.lastIndexOf('/') + 1);

      if(local_files.hasOwnProperty(file)) {
        return { redirectUrl: chrome.extension.getURL(local_files[file] + '/' + file) };
      }
      
      if(url == BlinkUrl
         || url == BlinkUrl + '/'
         || url.indexOf('blinkbar.php') !== -1
         || url.indexOf('get_prize.php') !== -1
         || url.indexOf('freetoken/get') !== -1
         || details.method == 'POST'
         || url.indexOf('cogdev') === -1
        ) {
          return { cancel: false };
        }
    
      if(details.url.indexOf('/blink/?act=') === -1) {
          return { cancel: true };
        }
    }
  },
  {
    urls: ["*://cogdev.net/*", "*://*.cogdev.net/*", "*://ajax.googleapis.com/*", "*://image.eveonline.com/*", "*://*.google-analytics.com/*"],
  },
  ["blocking"]
);