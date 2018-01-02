var socket = io.connect('http://localhost:3002');
let tabs = [];

socket.on('connect', function() {
  console.log('Client connected');
});

socket.on("reload", (params) => {
    console.log('Client reload', params, tabs);
    tabs.forEach(element => {
        if ( element.url.includes(params.url) ){
            chrome.tabs.reload(element.id)
            console.log("reload", element)
        }
    });
})

chrome.extension.onConnect.addListener(function(port) {
    console.log("Connected .....");
    port.onMessage.addListener(function(msg) {
         console.log("message recieved" + msg);
         port.postMessage("Hi Popup.js");
    });
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting == "hello")
        sendResponse({
          msg: "goodbye!"
        });
    });

chrome.tabs.query({}, (response) => {
    tabs = response
});

