/* 
 * Edited by Moongazer
 */
var elem = document.querySelectorAll("#jsStar span");
//elem[0].className = "oranged";
//console.log(elem[0]);
var reset = document.getElementsByTagName("button");
//reset[0].className = "oranged";
//console.log(reset[0]);

// onload() good here for reuse
function initialize() {
    for(var i = 0 ; i < elem.length ; i++ ) {   
//        elem[i].addEventListener("mouseover", function mov() {
//            displayStar(this);
//        });
//        elem[i].addEventListener("mouseout", function mou() {
//            removeStar(this);
//        });
//        elem[i].addEventListener("click", function cl() {
//            pinStar(this);
//        });
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
}


reset[0].onclick = function() {
//    location.reload();
    initialize();
    for(var i = 0 ; i < elem.length ; i++ ) {
        elem[i].className = "";
    }
    
};



function displayStar(elemChosen) {
    elemChosen.className = "oranged";
    var psib = elemChosen.previousSibling;
    while(psib.innerHTML !== undefined){
        psib.className = "oranged";
        psib = psib.previousSibling;
    }
//    console.log(elemChosen.previousSibling.innerHTML !== undefined);
}

function removeStar(elemPicked) {
    elemPicked.className = "";
    var psib = elemPicked.previousSibling;
    while(psib.innerHTML !== undefined){
        psib.className = "";
        psib = psib.previousSibling;
    }
}

function pinStar(elemClicked) {
    elemClicked.className = "oranged";
    var psib = elemClicked.previousSibling;
    var nxsib = elemClicked.nextSibling;
    
    //Once clicked, nothing can change.
    while(psib.innerHTML !== undefined){
        psib.className = "oranged";
//        psib.removeEventListener("mouseover", mov);
//        psib.removeEventListener("mouseout", mou);
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
//    elemClicked.removeEventListener("mouseover", mov);
//    elemClicked.removeEventListener("mouseout", mou);
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

