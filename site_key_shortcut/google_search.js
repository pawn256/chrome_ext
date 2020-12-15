//var link=document.querySelectorAll('#rso > .g:not(.kno-kp) .rc .yuRUbf > a');
var link=document.querySelectorAll('.hlcw0c .rc .yuRUbf > a')
//const lists = Array.from(document.querySelectorAll("#rso > .g:not(.kno-kp) .rc .yuRUbf > a"));
const lists = Array.from(document.querySelectorAll(".hlcw0c .rc .yuRUbf > a"));
lists.forEach(link => {
    link.addEventListener("focus", e => {
        const index = lists.findIndex(list => list === e.target);
        e.target.setAttribute('data-content-idx',(index+1)+"/"+lists.length+" ▶");
    });
    link.addEventListener("blur", e => {
        e.target.setAttribute('data-content-idx',"");
    });
});
var focus_idx=0;
var max_idx=link.length-1;
link[focus_idx].focus(); // default focus.

document.addEventListener('keydown', (event) => {
    var search_form=document.querySelector('.gLFyf.gsfi');
    var keyName = event.key;
    var btnnext = document.querySelector('#pnnext');
    var btnprev = document.querySelector('#pnprev');
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
            }else if(keyName == "/"){
                event.preventDefault();
                var maxlen=search_form.getAttribute('maxlength');
                search_form.focus();
                search_form.setSelectionRange(maxlen,maxlen);
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
    var search_form=document.querySelector('.gLFyf.gsfi');
    var keyName = event.key;
    var btnnext = document.querySelector('#pnnext');
    var btnprev = document.querySelector('#pnprev');
    if(document.activeElement == search_form && keyName != "Tab" && keyName != "Escape"){
    }else{

        if(event.ctrlKey){
        }else if(event.shiftKey) {
        }else{
            if(keyName == "/"){
            }else if(keyName == "Escape"){
                search_form.blur();
            }
        }
    }
});
