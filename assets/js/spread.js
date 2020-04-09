/////////////MENU///////////
document.getElementById("menu").style.display = "block";
document.getElementById("restartMenu").style.display = "none";
document.getElementById("restartAllMenu").style.display = "none";
document.getElementById("velocitySpan").style.display = "none";
document.getElementById("radiusSpan").style.display = "block";
//CHECKBOXES
var checkbox2 = document.querySelector("input[name=randSize]");
var checkbox3 = document.querySelector("input[name=randSpeed]");

var sliderNumCircle = document.getElementById("circles");
var sliderNumCorona = document.getElementById("corona");
var sliderRadius = document.getElementById("radius");
var sliderVelocity = document.getElementById("velocity");
var sliderMaxV = document.getElementById("max_speed");
var sliderMinV = document.getElementById("min_speed");

var radiusInput = 35;
var numberCircles = 20;
var numberCorona = 1;
sliderRadius.oninput = function() {
 radiusInput = this.value;
}

sliderNumCircle.oninput = function() {
 numberCircles = this.value;
 //numberCorona = document.getElementById("corona").value;
 generate();
}

sliderNumCorona.oninput = function() {
 numberCorona = this.value;
 //numberCircles = document.getElementById("circles").value;
 generate();
}

var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var score = 0;
var circleArray = [];
var bad = [];

var dissapear = true;
var randomColors = true;
var randomRadius = false;
var randomVelocity = true;
var remove = false;

var cKey = false;
var sKey = true;

var menu = true;

var display = true;
window.addEventListener("keydown", event => {
    if (event.keyCode == 32 || event.keyCode == 13 && menu) {
        startBtn();
    }
    if (event.keyCode == 82 && !menu) { //R
       restart();
       return; 
    }
    if (event.keyCode == 27 && !menu || event.keyCode == 77 && !menu) { //ESC
       openMenu();
       return; 
    }
    if (event.keyCode == 83) { //C
       if (sKey) {
           sKey = false;
           randomRadius = true;
           document.querySelector("input[name=randSize]").checked = true;
           return;
       }
       if (!sKey) {
           sKey = true;
           randomRadius = false;
           document.querySelector("input[name=randSize]").checked = false;
           return;
       }
       return; 
    }
});

checkbox2.addEventListener( 'change', function() {
    console.log("checked");
    if(this.checked) {
        randomRadius = true;
        document.getElementById("radiusSpan").style.display = "none";
    } else {
        randomRadius = false;
        document.getElementById("radiusSpan").style.display = "block";
    }
});

checkbox3.addEventListener( 'change', function() {
    console.log("checked");
    if(this.checked) {
        randomVelocity = true;
        document.getElementById("adjust_speed").style.display = "block";
        document.getElementById("velocitySpan").style.display = "none";
    } else {
        randomVelocity = false;
        //document.getElementById("adjust_speed").style.display = "none";
        document.getElementById("velocitySpan").style.display = "block";
    }
});
generate();
function generate() {
    circleArray = [];
    
    for (i = 0; i < numberCircles; i++){
        var index = i;
        var rRand = Math.random() * (50 - 1) + 1;
        var r = 35;
        var x = Math.random() * (innerWidth - r * 2) + r;
        var y = Math.random() * (innerHeight - r * 2) + r;
        var dxSet = 10;
        var dySet = 10;
        var dx = 10 * (Math.random() - 0.5);
        var dy = 10 * (Math.random() - 0.5);
        var color = "white";
        var type = 0;
        circleArray.push(new DrawCircle(x, y, r, dx, dy, color, index, rRand, dxSet, dySet, type));
    }
    for (i = 0; i < numberCorona; i++){
        var index = numberCircles + i;
        var rRand = Math.random() * (50 - 1) + 1;
        var r = 35;
        var x = Math.random() * (innerWidth - r * 2) + r;
        var y = Math.random() * (innerHeight - r * 2) + r;
        var dxSet = 10;
        var dySet = 10;
        var dx = 15 * (Math.random() - 0.4);
        var dy = 15 * (Math.random() - 0.4);
        var color = "red";
        var type = 1;
        circleArray.push(new DrawCircle(x, y, r, dx, dy, color, index, rRand, dxSet, dySet, type));
    }
}

animate(); 
var infected = numberCorona;
function startBtn() {
    remove = false;
    start();
}

function start() { 
    infected = numberCorona;
    display = true;
    var totalCircle = parseInt(numberCircles) + parseInt(numberCorona);
    console.log("Circles: " + numberCircles + ", Corona: " + numberCorona + ", Total: " + totalCircle);
    document.getElementById("canvas").style.display = "block";
    document.getElementById("menu").style.display = "none";
    menu = false;
   
    window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    if (remove == true) {
        window.removeEventListener("mousedown", MouseDown);
    }
    window.addEventListener("mousedown", MouseDown);
    
    function MouseDown(event) {
        if (!remove) {
            console.log(infected);
            var x = event.clientX;
            var y = event.clientY;
            var total = 0;
            circleArray.forEach(element => {
                if (x > element.x - element.r && x < element.x + element.r && y > element.y - element.r && y < element.y + element.r && element.type == 1) {
                    //bad.push(element.index); 
                    //element.x = 0 - (2 * element.r);
                    //element.y = 0 - (2 * element.r);
                    element.type = 0;
                    element.color = "white";
                    infected--;
                }  
                
                if (infected == 0) {
                    console.log("WIN");
                    //score = (((circleArray.length - 1) - infected)/circleArray.length) * 100;
                    document.getElementById("restartMenu").style.display = "block";
                    document.getElementById("score").innerHTML = '100';
                }
            });  
        }
    }
}

/*
if (total == 0) {
    score = (((circleArray.length - 1) - infected)/circleArray.length) * 100;
    document.getElementById("restartMenu").style.display = "block";
    document.getElementById("score").innerHTML = score;
}
if (total == numberCircles) {
    console.log("SORRY ALL EXISTANCE IS DEAD");
    document.getElementById("restartAllMenu").style.display = "block";
    document.getElementById("restartMenu").style.display = "none";
}

if (element.type == 1){
    total++;
    console.log(total);
}
*/
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth,innerHeight);
    for (i = 0; i < circleArray.length; i++){
        if(!bad.includes(i)) {
            circleArray[i].update();  
        }
    }
}

function DrawCircle(x, y, r, dx, dy, color, index, rRand, dxSet, dySet, type) {
    this.index = index;
    
    this.x = x;
    this.y = y;
    this.r = r;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.type = type;
    this.draw = function() {
            c.beginPath();
            if (randomColors == true) {
                c.fillStyle = this.color;
                c.strokeStyle = this.color;
            }
            else {
                c.fillStyle = "blue";
                c.strokeStyle = "blue";
            }
            c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            c.stroke();
            c.fill();
    }
    
    this.update = function() {
        if (randomRadius == true) {
            this.r = rRand;
        }
        else if (!randomRadius) {
            this.r = radiusInput;
        }
        if (this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        
        if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
        
        if (this.type == 1) {
            if (!menu) {
                circleArray.forEach(element =>{
                    if (element.type == 0) {
                        if(this.x < element.x + (2 * element.r) && this.x + (2 * this.r) > element.x  && this.y < element.y + (2 * element.r) && this.y + (2 * this.r) > element.y) {
                            element.type = 1;
                            element.color = "red";
                            infected++;
                            console.log(infected);
                        }   
                    }
                }); 
            }
        }
        if (display) {
            //console.log(parseInt(numberCircles) + parseInt(numberCorona));
            if (infected == parseInt(numberCircles) + parseInt(numberCorona)) {
                console.log("LOSE");
                document.getElementById("restartAllMenu").style.display = "block";
                document.getElementById("restartMenu").style.display = "none";
                display = false;
            }
        }
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
    }
}

function openMenu() {
    infected = numberCorona;
    display = true;
    menu = true;
    score = 0;
    circleArray = [];
    bad = [];
    generate();
    remove = true;
    document.getElementById("menu").style.display = "block";
    document.getElementById("restartMenu").style.display = "none";
    document.getElementById("restartAllMenu").style.display = "none";
}

function restart(){
    infected = numberCorona;
    display = true;
    menu = false;
    score = 0;
    circleArray = [];
    bad = [];
    document.getElementById("menu").style.display = "none";
    document.getElementById("restartMenu").style.display = "none";
    document.getElementById("restartAllMenu").style.display = "none";
    generate();
}
/*
//////PROJECT//////
Make a random circle be 'the chosen one'
When clicked circles dissapear on option
Animated menu
Circles clicked counter
Speed Counter
*/
