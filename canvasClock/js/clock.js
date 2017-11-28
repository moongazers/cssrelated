function drawClock(){
    var canv = document.getElementById("clock-canvas");
    var tools = canv.getContext('2d');
    var midwidth = canv.width/2;
    var midheight = canv.height/2;
    var radius = 250;
    var centerRad = 10;
    // clear canvas
    tools.clearRect(0, 0, canv.width, canv.height);
    
    initiate(tools, midwidth, midheight, radius, centerRad);
    draw(tools, radius, midwidth, midheight);
}
    

function initiate(tools, midwidth, midheight, radius, centerRad) {
   
    // Draw plate
    tools.beginPath();
    tools.arc(midwidth, midheight, radius, 0 , 2* Math.PI);
    tools.lineWidth = 10;
    tools.stroke();
    
    //change circle center
    tools.translate(midwidth, midheight);

    /**Draw circle center**/
    tools.beginPath();

    tools.arc(0, 0, centerRad, 0 , 2* Math.PI);
    tools.fillStyle = "blue";
    tools.fill();
    tools.strokeStyle = "green";
    tools.stroke();
    
    //draw scale
    tools.beginPath();
    tools.lineWidth = 5;
    tools.strokeStyle = "black";
    tools.moveTo(-radius,0);
    tools.lineTo(-radius+20, 0);
    var scale = 12; // divide into 12 scales
    while(scale > 0) {
        tools.rotate(30*Math.PI/180);
        tools.moveTo(-radius,0);
        tools.lineTo(-radius+20, 0);
        scale--;
    }
    tools.stroke();

}

function draw(tools, radius, midwidth, midheight){
    
    //get date info.
    var date = new Date();
    hour = date.getHours();
    min = date.getMinutes();
    sec = date.getSeconds();
    hour += min/60;
      
    tools.save(); // restore sec hand rotation
    tools.save(); // restore min hand rotation
    tools.save(); // restore hour hand rotation

    //Hour
    drawHands(tools, 30*hour*Math.PI/180, -radius + 120, "orange");
    //Min
    drawHands(tools, 6*min*Math.PI/180, -radius + 50, "grey");
    //Sec
    drawHands(tools, 6*sec*Math.PI/180, -radius + 20, "red");
   
    //restore to (0,0);
    tools.translate(-midwidth, -midheight);
    
    function drawHands(tools, rotatePar, linetoPar, color) {
        tools.beginPath();
        tools.rotate(rotatePar);
        tools.moveTo(0, 0);
        tools.lineTo(0, linetoPar);
        tools.strokeStyle = color;
        tools.stroke();
        tools.restore();
    }
}

drawClock();
window.setInterval(drawClock, 1000);



