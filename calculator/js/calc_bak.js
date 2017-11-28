/* 
 * Edited by Moongazer
 */

var keys = document.getElementsByTagName("button");
console.log(keys[0].childNodes[0]);
//var vals= document.getElementsByClassName("number");
//var operators= document.getElementsByClassName("operator");
//console.log(vals[0].childNodes[0].nodeValue);
//console.log(operators);
//console.log(document.getElementById("screen").innerHTML);

//var a = "34+45";
//console.log(eval(a));

//variable that store everything
var calcVar = 0;

var input = document.getElementById("screen");
console.log(input);

for(var i = 0 ; i < keys.length ; i++){
    keys[i].onclick = function() {
        value = this.childNodes[0].nodeValue;
             
        screenValue = input.innerHTML;
        
        console.log( input.innerHTML);
        
        if(value === "=") {
            console.log("in value: " +  screenValue);
            input.innerHTML= eval(screenValue);
        } else {
            input.innerHTML += value;
        }
    };
}


//for(var i = 0 ; i < vals.length ; i++){
////    var num = vals[i].childNodes[0].nodeValue;
//    
//    vals[i].onclick = function() {
//        // this critical!
////        console.log(this.childNodes[0].nodeValue); // or this.innerHTML
////        document.getElementsByTagName("label").innerHTML = 456;  //by tag name seems lame
////        var inputTry = document.getElementById("screen").innerHTML; //Qs: cannot write with innerhtml??
//        
//        var value = this.childNodes[0].nodeValue;
//        
//        input.innerHTML += value;
//        console.log( input.innerHTML);
////        calcVar += input.innerHTML;
//    };
//}

//for(var i = 0 ; i < operators.length ; i++){
//    operators[i].onclick = function() {
//        
////        calcVar += input.innerHTML;
//        var value = this.childNodes[0].nodeValue;
//        input.innerHTML += value;
////        console.log( input.innerHTML);
////        calcVar += input.innerHTML;
//        console.log( input.innerHTML);
//    };
//}