
function toggleMenu(){
    const element = document.getElementById("toggle-menu");
    if(!element.classList.contains("dropdown-menu-visible")){
        element.classList.add("dropdown-menu-visible");
    } else {
        element.classList.remove("dropdown-menu-visible");
    }
}
