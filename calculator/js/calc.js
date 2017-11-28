/* 
 * Edited by Moongazer
 */

//getElementsByTagName is ok, but it has many buttons...need to specify
//console.log(document.getElementsByTagName("button")[0]);

//select all the keys
var keys = document.getElementsByTagName("button");
//console.log(keys[0]);
//nice way for css selector
//var key2 = document.querySelectorAll(".frame button");
//
// screen is a reserved keyword? Yes
//var screenSelector = document.getElementById("screen");
var screenSelector = document.querySelector(".frame label span");
//console.log(typeof screenSelector.innerHTML); // default to be string!!

////eval is powerful
//var a = "5 * (8 + 4)";
//console.log(a);

//var aa = "+96+336 ";
//console.log(aa.lastIndexOf("+"));

//check for "=" pressing
var flagEqual = 0;



for(var i = 0 ; i < keys.length ; i++){
    //[i] is very critical. See line 5
    keys[i].onclick = function() {
//        console.log(this); // understand this here: return keys[i]; cannot use keys[i], cuz pass by REFERENCE
        var value = this.childNodes[0].nodeValue;
        var screenValue = 0; //evaluate the screen string
        var screenString = "";
        var screenLength = 0;
        var pos = 0; //specific char index;
        var symbol = ""; //specific char;
        
        nullDeal();
        if(value === "=") {
            try {
                eval(screenSelector.innerHTML);
            }
            catch(err) {
                screenSelector.innerHTML = err.message;
            }
            //eval powerful
            screenValue = eval(screenSelector.innerHTML);
            screenSelector.innerHTML = screenValue;
            flagEqual = 1;
        } else if(value === "C"){
            screenSelector.innerHTML = "";
            nullDeal();
        } else if(value === "+/-"){
            screenString = screenSelector.innerHTML;
//            console.log(screenString);
            //repeated used, so encapsulate in a func.
            pos = getCharPos(screenString);
//            console.log(pos);
            //There is no placeAt() in js, so need detour;
            symbol = screenString.charAt(pos);
//            console.log(symbol);
            if(pos === 0 && !screenString[0].match(/[\+\-\/\*]/)){
                screenString = '-' + screenString;
            } else if(symbol === "+"){
                screenString = screenString.substr(0, pos) + '-' + screenString.substr(pos + 1);
            } else if(symbol === "-") {
                screenString = screenString.substr(0, pos) + '+' + screenString.substr(pos + 1);
            } else if(symbol === "*" || symbol === "/") {
                screenString = screenString.substr(0, pos+1) + '-' + screenString.substr(pos + 1);
            }
            
//            console.log(screenString);
            screenSelector.innerHTML = screenString;
            
        } else if(value === "←") {
            screenString = screenSelector.innerHTML;
            screenLength = screenSelector.innerHTML.length;
            screenString = screenString.substr(0, screenLength-1);
            screenSelector.innerHTML = screenString;
            nullDeal();
            
        } else if(value === "CE") {
            screenString = screenSelector.innerHTML;
            pos = getCharPos(screenString);
            screenString = screenString.substr(0, pos+1);
            screenSelector.innerHTML = screenString;
        } else if(value === "√") {
            screenString = screenSelector.innerHTML;
//            screenLength = screenSelector.innerHTML.length;
            
            pos = getCharPosWithNegative(screenString);
//            console.log(pos);
            
            if(pos === 999){
                screenSelector.innerHTML = "Negative value!";
            } else if(pos === 0 ){
  
                screenString = Math.sqrt(screenString);
                screenSelector.innerHTML = screenString;
                screenString = "";
                //deal with sqrt() with operator
            } else {
                checkLastChar(screenString);
                
                screenString = screenString.substr(0, pos + 1) + Math.sqrt(screenString.substr(pos + 1)).toFixed(10); 
//                console.log(screenString);
                screenSelector.innerHTML = screenString;
            }       
            
            // not good!
            try {
                eval(screenString);
            }
            catch(err) {
                screenSelector.innerHTML = err.message;
            }
            nullDeal();
            
        } else if(value === "1/x") {
            screenString = screenSelector.innerHTML;
//            screenLength = screenSelector.innerHTML.length;

            pos = getCharPos(screenString);
//            console.log('ff ' + screenString.substr(pos + 1));
            checkLastChar(screenString);
            if(screenString.match(/[\+\-\/\*]/)) {
                screenString = screenString.substr(0, pos + 1) + (1/(screenString.substr(pos + 1))).toFixed(10); 
                screenSelector.innerHTML = screenString;
            } else if(pos === 0){
                screenSelector.innerHTML = 1 / screenString;
            }
            
        } else if(value === "%") {
            screenString = screenSelector.innerHTML;
            pos = getCharPos(screenString);
//            console.log(pos);
            if(pos === 0) {
                screenSelector.innerHTML = "0";
            } else {
                checkLastChar(screenString);
                var parentNum = eval(screenString.substr(0, pos));
                var childNum = (screenString.substr(pos + 1) * 0.01 * parentNum).toFixed(5);
                if(screenString.substr(pos + 1)) {
                    screenString = screenString.substr(0, pos + 1) + childNum; 
                    screenSelector.innerHTML = screenString;
                }
            }
            //TODO: more work here.
        }
        else {
            if(flagEqual === 1){
                screenSelector.innerHTML = "";
                flagEqual = 0;
            }
            if(screenSelector.innerHTML === "0"){
//                console.log(value);
                if(value !== "+" && value !=="-" && value !=="*" && value !=="/"){
                    screenSelector.innerHTML = "";
                }
            }
            //Deal with duplicate operators
            if(value === "+" || value === "-" || value === "*" || value === "/"){
                screenString = screenSelector.innerHTML;
                screenLength = screenSelector.innerHTML.length;
                if(screenString[screenLength-1] === "+" || screenString[screenLength-1] === "-" || screenString[screenLength-1] === "*" || screenString[screenLength-1] === "/"){
                    screenString = screenString.substr(0, screenLength-1);
                    screenSelector.innerHTML = screenString; 
                }
            }
            screenSelector.innerHTML += value;
        }
        
    };
}

function getCharPos(string) {
    var index = -1;
    var cache1 = 0, cache2 = 0, cache3 = 0, cache4 = 0;
    if(string.lastIndexOf("+") !== -1){
        cache1 = string.lastIndexOf("+");
    }
    if(string.lastIndexOf("-") !== -1){
        cache2 = string.lastIndexOf("-");
    }
    if(string.lastIndexOf("*") !== -1){
        cache3 = string.lastIndexOf("*");
    }
    if(string.lastIndexOf("/") !== -1){
        cache4 = string.lastIndexOf("/");
    }
    index = Math.max(cache1, cache2, cache3, cache4);
//    console.log(index);
    return index;
}

function checkLastChar(string) {
    var lastChar = string[string.length-1];

    //check if lastChar is operator
    //Plus is a special character in regular expressions, 
    //so to express the character as data you must escape it by prefixing it with \.
    try {
        if(lastChar.match(/[\+\-\/\*]/)) throw "Unexpected end of input";
    }
    catch(err) {
        screenSelector.innerHTML = err;
    }
}

function nullDeal() {
    if (screenSelector.innerHTML === ""){
        screenSelector.innerHTML = "0";
    }
}


function getCharPosWithNegative(string) {
    var index = -1;
    var cache1 = 0, cache2 = 0, cache3 = 0, cache4 = 0;
    if(string.lastIndexOf("+") !== -1){
        cache1 = string.lastIndexOf("+");
    }
    if(string.lastIndexOf("-") !== -1){
        cache2 = string.lastIndexOf("-");
    }
    if(string.lastIndexOf("*") !== -1){
        cache3 = string.lastIndexOf("*");
    }
    if(string.lastIndexOf("/") !== -1){
        cache4 = string.lastIndexOf("/");
    }
    index = Math.max(cache1, cache2, cache3, cache4);
//    if(cache2 === index && (cache2 > cache1) && (cache2 > cache3) && (cache2 > cache4)) {
//        console.log("in1");
//        return 999;
//    }
    var diff1 = cache2 - cache1, diff2 = cache2 - cache3, diff3 = cache2 - cache4;
    if(cache2 === index && (diff1 === 1 || diff2 === 1 || diff3 === 1) && 
      (cache1 !== 0 || cache3 !==0 || cache4 !== 0)){
//        console.log("in2");
        return 999;
    }
//    console.log(index);
    return index;
}