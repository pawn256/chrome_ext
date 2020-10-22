var link_class_name = '.sw-Card__title.sw-Card__title--cite .sw-Card__titleInner';
const lists = Array.from(document.querySelectorAll(link_class_name));
lists.forEach(link => {
    link.addEventListener("focus", e => {
        const index = lists.findIndex(list => list === e.target);
        e.target.setAttribute('data-content-idx',(index+1)+"/"+lists.length+" ▶");
    });
    link.addEventListener("blur", e => {
        e.target.setAttribute('data-content-idx',"");
    });
});
var link=document.querySelectorAll(link_class_name);
var focus_idx = 0;
var max_idx = link.length-1;
link[focus_idx].focus(); // default focus.

var search_form = document.querySelector('.SearchBox__searchInput.js-SearchBox__searchInput.rapid-noclick-resp')
var btnprev = document.querySelector('.Pagenation__prev > a');
var btnnext = document.querySelector('.Pagenation__next > a');
document.addEventListener('keydown', (event) => {
    var keyName = event.key;
    console.log(keyName);
    if(document.activeElement == search_form && keyName != "Tab"){
    }else{

        if(event.ctrlKey){
        }else if(event.shiftKey){
        }else{
            if(keyName == "h" || keyName == "ArrowLeft"){
                event.preventDefault();
                if(btnprev != null){
                    btnprev.click();
                }
            }else if(keyName == "j" || keyName == "ArrowDown"){
                event.preventDefault();
                if(focus_idx < max_idx){
                    focus_idx++;
                    link[focus_idx].focus();
                }else{
                    link[focus_idx].focus();
                }
            }else if(keyName == "k" || keyName == "ArrowUp"){
                event.preventDefault();
                if(focus_idx > 0){
                    focus_idx--;
                    link[focus_idx].focus();
                }else{
                    link[focus_idx].focus();
                }
            }else if(keyName == "l" || keyName == "ArrowRight"){
                event.preventDefault();
                if(btnnext != null){
                    btnnext.click();
                }
            }else if(keyName == "Escape"){
            }
        }
    }
});


document.addEventListener('keypress', (event) => {
    var keyName = event.key;

    if (event.ctrlKey) {
    } else if (event.shiftKey) {
    } else {
    }
});

document.addEventListener('keyup', (event) => {
    var keyName = event.key;
    if(document.activeElement == search_form && keyName != "Tab" && keyName != "Escape"){
    }else{

        if(event.ctrlKey){
        }else if(event.shiftKey) {
        }else{
            if(keyName == "/"){
                //var maxlen=search_form.getAttribute('maxlength');
                var maxlen = document.querySelector('.SearchBox__searchInput.js-SearchBox__searchInput.rapid-noclick-resp').value.length;
                search_form.focus();
                search_form.setSelectionRange(maxlen,maxlen);
            }else if(keyName == "Escape"){
                search_form.blur();
            }
        }
    }
});
