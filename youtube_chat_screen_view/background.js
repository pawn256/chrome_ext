chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({checked: 1}, function() {
        //console.log('The color is green.');
    });
    //chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    //    chrome.declarativeContent.onPageChanged.addRules([{
    //        conditions: [new chrome.declarativeContent.PageStateMatcher({
    //            pageUrl: {hostEquals: 'www.youtube.com'},
    //        })
    //        ],
    //        actions: [new chrome.declarativeContent.ShowPageAction()]
    //    }]);
    //});
});
//chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse)
//    {
//        if(msg.icon1) {
//            chrome.tabs.query({active:true, windowType:"normal", currentWindow: true},function(d){
//                var tabId = d[0].id;
//                //chrome.browserAction.setIcon({path: '../icon1.png', tabId: tabId});
//                
//                //var counter = 0;
//                //chrome.browserAction.setBadgeText({text:String(counter)});
//                //chrome.browserAction.onClicked.addListener(
//                //    function(tab){
//                //        counter++;
//                //        chrome.browserAction.setBadgeText({text:String(counter)});
//                //    }
//                //);
//            });
//            //chrome.browserAction.setBadgeText({text:"ON"});
//            var counter = 0;
//
//            chrome.browserAction.setBadgeText({text:String(counter)})
//        }else{
//            chrome.browserAction.setBadgeText({text:"OFF"});
//        }
//    }
//);
