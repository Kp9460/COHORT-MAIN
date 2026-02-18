var allElems = document.querySelectorAll(".elem");
var allFullElems = document.querySelectorAll(".fullElem")

allElems.forEach(function(elem){
    elem.addEventListener("click",function(){
        allFullElems[elem.id].style.display = 'block'
    })
})