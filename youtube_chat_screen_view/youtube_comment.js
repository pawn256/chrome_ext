var chat_frame_id = "chatframe";
var chat_id = "chat";
var items_id = "items";
var user_icon_id = "img";
var user_post_time_id = "timestamp";
var user_comment_id = "message";
var user_name_id = "author-name";
var player_id = "player-container";
var my_comment_list_id = "my-comment-list";
var my_comment_list_bottom_parent_id = "my-comment-list-bottom-parent";
var my_comment_list_bottom_child_id = "my-comment-list-bottom-child";
var my_comment_class = "my-comment";
var my_message_class = "my-message";
var my_user_icon_class = "my-user-icon";
var my_user_data_class = "my-user-data";
var my_user_name_class = "my-user-name";
var my_user_timestamp_class = "my-user-timestamp";
var my_user_data_header_class = "my-user-data-header";
var my_user_data_content_class = "my-user-data-content";
var my_user_data_header_text_class = "my-user-data-header-text";
var comment_transparent_intid = null;
var comment_transparent_timid = null;
const MAX_COUNT = 10;

function callback(mutationList, observer) {
    mutationList.forEach((mutation) => {
        switch(mutation.type) {
            case 'childList':
                mutation.addedNodes.forEach((node) => {
                    if(node.tagName == "YT-LIVE-CHAT-TEXT-MESSAGE-RENDERER"){
                        // comment element
                        var player = document.querySelector(`#${player_id}`);
                        var my_comment_list_elem = document.querySelector(`#${player_id} #${my_comment_list_id}`);
                        var my_comment_list_bottom_parent_elem = document.querySelector(`#${player_id} #${my_comment_list_id} #${my_comment_list_bottom_parent_id}`);
                        var my_comment_list_bottom_child_elem = document.querySelector(`#${player_id} #${my_comment_list_id} #${my_comment_list_bottom_parent_id} #${my_comment_list_bottom_child_id}`);
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

                        var user_comment_text = document.createTextNode(node.querySelector(`#${user_comment_id}`).textContent);
                        var user_comment_timestamp = document.createTextNode(node.querySelector(`#${user_post_time_id}`).textContent);
                        var user_name = document.createTextNode(node.querySelector(`#${user_name_id}`).textContent);
                        var user_comment_html = node.querySelector(`#${user_comment_id}`).innerHTML;
                        var user_icon_url = node.querySelector(`#${user_icon_id}`).src;


                        var my_comment_elem = document.createElement('div');
                        my_comment_elem.setAttribute("class",my_comment_class);

                        var my_user_icon_elem = document.createElement('img');
                        my_user_icon_elem.setAttribute("class",my_user_icon_class);
                        my_user_icon_elem.src = user_icon_url;

                        var my_user_name_elem = document.createElement('span');
                        my_user_name_elem.setAttribute("class",my_user_name_class);
                        my_user_name_elem.appendChild(user_name);

                        var my_user_timestamp_elem = document.createElement('p');
                        my_user_timestamp_elem.setAttribute("class",my_user_timestamp_class);
                        my_user_timestamp_elem.appendChild(user_comment_timestamp);

                        var my_message_elem = document.createElement('span');
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

                        var my_user_data_elem = document.createElement('div');
                        my_user_data_elem.setAttribute("class",my_user_data_class);

                        var my_user_data_header_elem = document.createElement('div');
                        my_user_data_header_elem.setAttribute("class",my_user_data_header_class);

                        var my_user_data_content_elem = document.createElement('div');
                        my_user_data_content_elem.setAttribute("class",my_user_data_content_class);

                        var my_user_data_header_text_elem = document.createElement('div');
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
    var chat_frame_elem = null;
    var counter = 0;

    var id = setInterval(function(){
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
    var chat_elem = null;
    var counter = 0;

    var id = setInterval(function(){
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
    var chat_frame_elem = document.querySelector(`#${chat_frame_id}`);
    var chat_elem = chat_frame_elem.contentDocument.querySelector(`#${chat_id}`);
    var chat_items_elem = chat_elem.querySelector(`#${items_id}`);
    var observerOptions = {
        characterData: true,
        childList: true,
        attributes: true,
        subtree: true
    }

    var observer = new MutationObserver(callback);
    //observer.observe(chat_elem, observerOptions); // target element in chat
    observer.observe(chat_items_elem, observerOptions); // target element in chat
}
myfunc1();
