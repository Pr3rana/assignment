var initial_width;

//attach click event
function attachClick(argument) {
    var acc = document.getElementsByClassName("accordion");
    var content = document.getElementsByClassName("content")[0];
    var changeText = document.getElementById('change-text')
    var i;
    for (i = 0; i < acc.length; i++) {
      acc[i].onclick = function(e) {
        if (e.target.getAttribute("depth")) {
            var panel = this.getElementsByTagName("div")[0];
            changeText.innerText = 'Click Sub menu to change Text';
            //collapse the main item incase it is open
            if( panel.className == 'overlayOpen') {
                
                panel.className = 'overlayClose';
                return;
            }
            //call dropdown function to show the sub item
            else{
                dropDown(this);
                panel.className = 'overlayOpen';

            }
        }
        //print the name of sub item
        else {
              changeText.innerText = e.target.innerText;
          }
        }
    }
    //add click event to hide menu panel when window innerwidth is < 780
    content.onclick = function() {
        if (window.innerWidth < 780) {
            hideMenu()
        }
    }
    
}
//dropdown and show the sub-item (accordion)
function dropDown(el) {
    var arr = document.querySelectorAll('.overlayOpen');
    if(arr instanceof NodeList && arr.length == 0){
        return;
    }
    else{
        arr.forEach(function(el){
            el.classList.remove("overlayOpen");
            el.classList.add("overlayClose");
            return;
        });
    }
}
//show menu panel onclick of menu icon
function showMenu() {
    var menu  = document.querySelector(".menu-container .main")
    var menuIcon = document.querySelector(".menu-container #menu")
    menu.style.display = "block"
    menuIcon.style.display = "none"
}
//hide the menu panel
function hideMenu() {
    var menu  = document.querySelector(".menu-container .main")
    var menuIcon = document.querySelector(".menu-container #menu")
    menu.style.display = "none"
    menuIcon.style.display = "block"
}
 //Attach the eventlisteners on window load to the window object
window.onload = function () {
    initial_width = window.innerWidth;
    attachClick.call(this)
}
 //Attach the eventlisteners on window resize to load the reload the page
window.addEventListener("resize", function(){
    var diff = initial_width - window.innerWidth;
    if (diff < 0){
        diff = diff*-1
    }
    if(diff > 200){
        location.reload();
    }
});

