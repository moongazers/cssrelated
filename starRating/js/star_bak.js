/* 
 * Edited by Moongazer
 */
var elem = document.querySelectorAll("#jsStar span");
//console.log(elem[0]);
var reset = document.getElementsByTagName("button");
//console.log(reset[0].innerHTML);

for(var i = 0 ; i < elem.length ; i++ ) {
    elem[i].onmouseover = function() {
        displayStar(this);
    };
    elem[i].onmouseout = function() {
        removeStar(this);
    };
    elem[i].onclick = function() {
//        console.log(this);
//        console.log(elem[0]);
//        console.log(this === elem[0]);
        pinStar(this);
    };
    
}

reset[0].onclick = function() {
    location.reload();
    //get sibling issue now, can write without reload.
};


function displayStar(elemChosen) {
    elemChosen.innerHTML = "&#9733";
    elemChosen.style.color = "orange";
    var psib = elemChosen.previousSibling;
    while(psib.innerHTML !== undefined){
//        console.log("in!");
        psib.innerHTML = "&#9733";
        psib.style.color = "orange";
        psib = psib.previousSibling;
    }
//    console.log(elemChosen.previousSibling.innerHTML !== undefined);
}

function removeStar(elemPicked) {
    elemPicked.innerHTML = "&#9734";
    elemPicked.style.color = "black";
    var psib = elemPicked.previousSibling;
    while(psib.innerHTML !== undefined){
//        console.log("in!");
        psib.innerHTML = "&#9734";
        psib.style.color = "black";
        psib = psib.previousSibling;
    }
}

function pinStar(elemClicked) {
    elemClicked.innerHTML = "&#9733";
    elemClicked.style.color = "orange";
    var psib = elemClicked.previousSibling;
    var nxsib = elemClicked.nextSibling;
    
    //Once clicked, nothing can change it.
    while(psib.innerHTML !== undefined){
//        console.log(psib);
        psib.innerHTML = "&#9733";
        psib.style.color = "orange";
        psib.onmouseover=function(){}; 
        psib.onmouseout=function(){};
        psib = psib.previousSibling;
    }
    while(nxsib.innerHTML !== undefined){
//        console.log(nxsib);
        nxsib.onmouseover=function(){}; 
        nxsib.onmouseout=function(){};
        nxsib.onclick=function(){};
        nxsib = nxsib.nextSibling;
    }
    elemClicked.onmouseover=function(){}; 
    elemClicked.onmouseout=function(){};
}

/***sibling issue***/
//Even whitespace, new line,etc... would stand for a node!



//function clearStar() {
////    //think more about siblings.
////    for(var i = 0 ; i < elem.length ; i++ ) {
////        elem[i].innerHTML = "&#9734";
////        elem[i].style.color = "black";
////    }
//    //reload cleared functions
//    location.reload();
//}