//let changeColor = document.getElementById('changeColor');

//changeColor.onclick = function(element) {
//    let color = element.target.value;
//    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//        chrome.tabs.executeScript(
//            tabs[0].id,
//            {code: 'document.body.style.backgroundColor = "' + color + '";'});
//    });
//};
function popup(){
    //document.querySelector('#screen_on').addEventListener('click', function(){
    //    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){ // The active tab of the currently focused window.
    //        chrome.tabs.sendMessage(tabs[0].id, {message: 'ON'}, function(res){
    //            if(!res){
    //                return;
    //            }
    //            //$('#memo').val($('#memo').val() + item);
    //        });

    //    });
    //    chrome.runtime.sendMessage({icon1: true}); // to background.js
    //});
    //document.querySelector('#screen_off').addEventListener('click', function(){
    //    chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){ // The active tab of the currently focused window.
    //        chrome.tabs.sendMessage(tabs[0].id, {message: 'OFF'}, function(res){
    //            if(!res){
    //                return;
    //            }
    //            //$('#memo').val($('#memo').val() + item);
    //        });
    //        chrome.browserAction.setBadgeText({text:"OFF"});
    //    });
    //    chrome.runtime.sendMessage({icon1: false}); // to background.js
    //});
    let toggle_btn_elem = document.querySelector('#toggle-btn');
    let toggle_bck_elem = document.querySelector('#toggle-bck');
    let switch_chk_elem = document.querySelector('#switch-chk');
    chrome.storage.sync.get('checked', function(data) {
        //changeColor.style.backgroundColor = data.color;
        //changeColor.setAttribute('value', data.color);
        if(data.checked == 1){
            switch_chk_elem.value = 1;
            toggle_btn_elem.style.marginLeft = "24px";
            toggle_bck_elem.style.background = "#4CAF50";
        }else{
            switch_chk_elem.value = 0;
            toggle_btn_elem.style.marginLeft = "2px";
            toggle_bck_elem.style.background = "#808080";
        }
    });
    toggle_btn_elem.addEventListener('click',function(){
        if(switch_chk_elem.value == 0){
            chrome.storage.sync.set({checked: 1}, function() {});
            chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){ // The active tab of the currently focused window.
                chrome.tabs.sendMessage(tabs[0].id, {message: 'ON'}, function(res){
                });
            });
            switch_chk_elem.value = 1;
            toggle_btn_elem.style.marginLeft = "24px";
            toggle_bck_elem.style.background = "#4CAF50";
        }else{
            chrome.storage.sync.set({checked: 0}, function() {});
            chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){ // The active tab of the currently focused window.
                chrome.tabs.sendMessage(tabs[0].id, {message: 'OFF'}, function(res){
                });
            });
            switch_chk_elem.value = 0;
            toggle_btn_elem.style.marginLeft = "2px";
            toggle_bck_elem.style.background = "#808080";
        }
    });
}
