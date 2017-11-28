/* 
 * Edited by Moongazer
 */
var x = function rotatehand() {
//    function rotatehand() {
    var date = new Date();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    if(hour > 12){
        hour -= 12;
    }
    hour += min/60;
    hourdeg = 30*hour;
    mindeg = 6*min;
    secdeg = 6*sec;
    
    console.log(date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds());
    
    document.getElementById("hourcontainer").style.transform = 'rotate(' + hourdeg + 'deg)';
    document.getElementById("mincontainer").style.transform = 'rotate(' + mindeg + 'deg)';
    document.getElementById("seccontainer").style.transform = 'rotate(' + secdeg + 'deg)';
};
x();
//+function () {
//    window.setInterval(x, 1000);
//}();
//!function () {
//    window.setInterval(x, 1000);
//}();
(function () {
    window.setInterval(x, 1000);
})();
