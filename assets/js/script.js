/////////////MENU///////////
document.getElementById("menu").style.display = "block";
document.getElementById("velocitySpan").style.display = "none";
//document.getElementById("adjust_speed").style.display = "block";
document.getElementById("radiusSpan").style.display = "block";
//CHECKBOXES
var checkbox0 = document.querySelector("input[name=dis]");
var checkbox1 = document.querySelector("input[name=randColor]");
var checkbox2 = document.querySelector("input[name=randSize]");
var checkbox3 = document.querySelector("input[name=randSpeed]");

var sliderNumCircle = document.getElementById("circles");
var sliderRadius = document.getElementById("radius");
var sliderVelocity = document.getElementById("velocity");
var sliderMaxV = document.getElementById("max_speed");
var sliderMinV = document.getElementById("min_speed");

var radiusInput = 35;
var numberCircles = 50;
sliderRadius.oninput = function() {
 radiusInput = this.value;
}

sliderNumCircle.oninput = function() {
 numberCircles = this.value;
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

checkbox0.addEventListener( 'change', function() {
    console.log("checked");
    if(this.checked) {
        dissapear = true;
    } else {
        dissapear = false;
    }
});

checkbox1.addEventListener( 'change', function() {
    console.log("checked");
    if(this.checked) {
        randomColors = true;
    } else {
        randomColors = false;
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
        var dx = 0;//10 * (Math.random() - 0.5);
        var dy = 0;//10 * (Math.random() - 0.5);
        var color = randomColor();

        circleArray.push(new DrawCircle(x, y, r, dx, dy, color, index, rRand, dxSet, dySet));
    }
}

animate(); 

function start() { 
    document.getElementById("canvas").style.display = "block";
    document.getElementById("menu").style.display = "none";
   
    window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
        
    window.addEventListener("click", function(event) {
        var x = event.clientX;
        var y = event.clientY;

        circleArray.forEach(element => {
            if (x > element.x - element.r && x < element.x + element.r && y > element.y - element.r && y < element.y + element.r) {
                //console.log("X: " + x + ", EX: " + Math.round(element.x) +  ", Y: " + y + ", EY: " + Math.round(element.y));
                //console.log("Index: ", element.index, dissapear);
                if (dissapear == true) { 
                    bad.push(element.index); 
                    element.x = 0 - (2 * element.r);
                    element.y = 0 - (2 * element.r);
                }
                score ++;
                console.log(score);
                if (element.index == 0) {
                    alert("DUBS, Score: " + score.toString());
                }
            }
        });        
    });
}

function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth,innerHeight);
    for (i = 0; i < circleArray.length; i++){
        if(!bad.includes(i)) {
            circleArray[i].update();  
        }
    }
}


function DrawCircle(x, y, r, dx, dy, color, index, rRand, dxSet, dySet) {
    this.index = index;
    
    this.x = x;
    this.y = y;
    this.r = r;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
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
        
        this.x += this.dx;
        this.y += this.dy;
        
        this.draw();
    }
}



function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; 
    }
    if (randomColors == true) {
        return color;
    }
    else if (!randomColors) {
        return "blue";
    }
}
/*
//////PROJECT//////
Make a random circle be 'the chosen one'
When clicked circles dissapear on option
Animated menu
Circles clicked counter
Speed Counter
*/
