chrome.browserAction.onClicked.addListener(buttonClicked);

//Detects when user clicked on Icon
function buttonClicked(tab){
    let msg = {
        txt: "clicked"
    }
    chrome.tabs.sendMessage(tab.id, msg.txt);
}

