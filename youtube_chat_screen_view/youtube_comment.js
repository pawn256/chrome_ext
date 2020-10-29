let chat_frame_id = "chatframe";
let chat_id = "chat";
let items_id = "items";
let user_icon_id = "img";
let user_post_time_id = "timestamp";
let user_comment_id = "message";
let user_name_id = "author-name";
let player_id = "player-container";
let my_comment_list_id = "my-comment-list";
let my_comment_list_bottom_parent_id = "my-comment-list-bottom-parent";
let my_comment_list_bottom_child_id = "my-comment-list-bottom-child";
let my_comment_class = "my-comment";
let my_message_class = "my-message";
let my_user_icon_class = "my-user-icon";
let my_user_data_class = "my-user-data";
let my_user_name_class = "my-user-name";
let my_user_timestamp_class = "my-user-timestamp";
let my_user_data_header_class = "my-user-data-header";
let my_user_data_content_class = "my-user-data-content";
let my_user_data_header_text_class = "my-user-data-header-text";
let comment_transparent_intid = null;
let comment_transparent_timid = null;
let observer = null;
let my_comment_list_elem = null;
let my_comment_list_bottom_parent_elem = null;
let my_comment_list_bottom_child_elem = null;
const MAX_COUNT = 10;

function callback(mutationList, observer) {
    mutationList.forEach((mutation) => {
        switch(mutation.type) {
            case 'childList':
                mutation.addedNodes.forEach((node) => {
                    if(node.tagName == "YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER"){
                        // comment element
                        let player = document.querySelector(`#${player_id}`);
                        my_comment_list_elem = document.querySelector(`#${player_id} #${my_comment_list_id}`);
                        my_comment_list_bottom_parent_elem = document.querySelector(`#${player_id} #${my_comment_list_id} #${my_comment_list_bottom_parent_id}`);
                        my_comment_list_bottom_child_elem = document.querySelector(`#${player_id} #${my_comment_list_id} #${my_comment_list_bottom_parent_id} #${my_comment_list_bottom_child_id}`);
                        if(my_comment_list_elem == null){
                            my_comment_list_elem = document.createElement('div');
                            my_comment_list_elem.setAttribute("id",my_comment_list_id);

                            my_comment_list_bottom_parent_elem = document.createElement('div');
                            my_comment_list_bottom_parent_elem.setAttribute("id",my_comment_list_bottom_parent_id);

                            my_comment_list_bottom_child_elem = document.createElement('div');
                            my_comment_list_bottom_child_elem.setAttribute("id",my_comment_list_bottom_child_id);

                            my_comment_list_bottom_parent_elem.appendChild(my_comment_list_bottom_child_elem);
                            my_comment_list_elem.appendChild(my_comment_list_bottom_parent_elem);
                            player.insertBefore(my_comment_list_elem,player.firstChild);
                        }
                        my_comment_list_bottom_child_elem.style.opacity = 1.0; // initialize
                        if(comment_transparent_intid != null){
                            clearInterval(comment_transparent_intid);
                        }
                        if(comment_transparent_timid != null){
                            clearInterval(comment_transparent_timid);
                        }
                        comment_transparent_timid = setTimeout(function(){
                            comment_transparent_intid = setInterval(function(){
                                if(my_comment_list_bottom_child_elem.style.opacity > 0){
                                    my_comment_list_bottom_child_elem.style.opacity -= 0.01;
                                }else{
                                    my_comment_list_bottom_child_elem.style.opacity = 0;
                                    clearInterval(comment_transparent_intid);
                                }
                            },30);
                        },3000);

                        let user_comment_text = document.createTextNode(node.querySelector(`#${user_comment_id}`).textContent);
                        let user_comment_timestamp = document.createTextNode(node.querySelector(`#${user_post_time_id}`).textContent);
                        let user_name = document.createTextNode(node.querySelector(`#${user_name_id}`).textContent);
                        let user_comment_html = node.querySelector(`#${user_comment_id}`).innerHTML;
                        let user_icon_url = node.querySelector(`#${user_icon_id}`).src;


                        let my_comment_elem = document.createElement('div');
                        my_comment_elem.setAttribute("class",my_comment_class);

                        let my_user_icon_elem = document.createElement('img');
                        my_user_icon_elem.setAttribute("class",my_user_icon_class);
                        my_user_icon_elem.src = user_icon_url;

                        let my_user_name_elem = document.createElement('span');
                        my_user_name_elem.setAttribute("class",my_user_name_class);
                        my_user_name_elem.appendChild(user_name);

                        let my_user_timestamp_elem = document.createElement('p');
                        my_user_timestamp_elem.setAttribute("class",my_user_timestamp_class);
                        my_user_timestamp_elem.appendChild(user_comment_timestamp);

                        let my_message_elem = document.createElement('span');
                        my_message_elem.setAttribute("class",my_message_class);
                        //my_message_elem.appendChild(user_comment_text);
                        my_message_elem.insertAdjacentHTML("afterbegin",user_comment_html);
                        // <!-- beforebegin -->
                        // <element>
                        //   <!-- afterbegin -->
                        //   <child>Text</child>
                        //   <!-- beforeend -->
                        // </element>
                        // <!-- afterend -->
                        // element.insertAdjacentHTML('afterbegin', '<b>Test:</b>');

                        let my_user_data_elem = document.createElement('div');
                        my_user_data_elem.setAttribute("class",my_user_data_class);

                        let my_user_data_header_elem = document.createElement('div');
                        my_user_data_header_elem.setAttribute("class",my_user_data_header_class);

                        let my_user_data_content_elem = document.createElement('div');
                        my_user_data_content_elem.setAttribute("class",my_user_data_content_class);

                        let my_user_data_header_text_elem = document.createElement('div');
                        my_user_data_header_text_elem.setAttribute("class",my_user_data_header_text_class);
                        my_user_data_header_text_elem.appendChild(my_user_name_elem);
                        my_user_data_header_text_elem.appendChild(my_user_timestamp_elem);

                        my_user_data_header_elem.appendChild(my_user_icon_elem);
                        //my_user_data_header_elem.appendChild(my_user_name_elem);
                        //my_user_data_header_elem.appendChild(my_user_timestamp_elem);
                        my_user_data_header_elem.appendChild(my_user_data_header_text_elem);

                        my_user_data_content_elem.appendChild(my_message_elem);

                        my_user_data_elem.appendChild(my_user_data_header_elem);
                        my_user_data_elem.appendChild(my_user_data_content_elem);
                        my_comment_elem.appendChild(my_user_data_elem);
                        my_comment_list_bottom_child_elem.appendChild(my_comment_elem);
                        // <div id="my-comment-list">
                        //    <div id="my-comment-list-bottom-parent">
                        //        <div id="my-comment-list-bottom-child">
                        //            <div class="my-comment">
                        //                <div class="my-user-data">
                        //                    <div class="my-user-data-header">
                        //                        <img class="my-user-icon"></img>
                        //                        <div class="my-user-data-header-text">
                        //                            <span class="my-user-name"></span>
                        //                            <span class="my-user-timestamp"></span>
                        //                        </div>
                        //                    </div>
                        //                    <div class="my-user-data-content">
                        //                        <span class="my-message">
                        //                        </span>
                        //                    </div>
                        //                </div>
                        //            </div>
                        //        </div>
                        //    </div>
                        // </div>
                    }
                });
                break;
            case 'attributes':
                break;
        }
    });
}

function myfunc1(){
    let chat_frame_elem = null;
    let counter = 0;

    let id = setInterval(function(){
        counter++;
        if(counter > MAX_COUNT){
            clearInterval(id);
        }
        chat_frame_elem = document.querySelector(`#${chat_frame_id}`);
        if(chat_frame_elem != null){
            clearInterval(id);
            myfunc2();
        }
    },1000);
}
function myfunc2(){
    chat_frame_elem = document.querySelector(`#${chat_frame_id}`);
    let chat_elem = null;
    let counter = 0;

    let id = setInterval(function(){
        counter++;
        if(counter > MAX_COUNT){
            clearInterval(id);
        }
        chat_elem = chat_frame_elem.contentDocument.querySelector(`#${chat_id}`);
        if(chat_elem != null){
            clearInterval(id);
            myfunc3();
        }
    },1000);
}
function myfunc3(){
    let chat_frame_elem = document.querySelector(`#${chat_frame_id}`);
    let chat_elem = chat_frame_elem.contentDocument.querySelector(`#${chat_id}`);
    let chat_items_elem = chat_elem.querySelector(`#${items_id}`);
    let observerOptions = {
        characterData: true,
        childList: true,
        attributes: true,
        subtree: true
    }

    observer = new MutationObserver(callback);
    //observer.observe(chat_elem, observerOptions); // target element in chat
    observer.observe(chat_items_elem, observerOptions); // target element in chat
}
chrome.storage.sync.get('checked', function(data) {
    if(data.checked == 1){
        myfunc1();
    }else{
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    //console.log(request.message); // received message
    if(request.message == "ON"){
        //comment_transparent_intid = null;
        //comment_transparent_timid = null;
        //observer = null;
        myfunc1();
    }else if(request.message == "OFF"){
        if(comment_transparent_intid != null){
            clearInterval(comment_transparent_intid);
        }
        if(comment_transparent_timid != null){
            clearInterval(comment_transparent_timid);
        }
        if(observer != null){
            observer.disconnect();
        }
        if(my_comment_list_elem != null){
            my_comment_list_elem.remove();
        }
    }
    sendResponse("RES");
});
