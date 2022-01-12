quick_draw_dataset=["aircraft carrier","airplane","alarm clock","ambulance","angel","animal migration","ant","anvil","apple","arm","asparagus","axe","backpack","banana","bandage","barn","baseball","baseball bat","basket","basketball","bat","bathtub","beach","bear","beard","bed","bee","belt","bench","bicycle","binoculars","bird","birthday cake","blackberry","blueberry","book","boomerang","bottlecap","bowtie","bracelet","brain","bread","bridge","broccoli","broom","bucket","bulldozer","bus","bush","butterfly","cactus","cake","calculator","calendar","camel","camera","camouflage","campfire","candle","cannon","canoe","car","carrot","castle","cat","ceiling fan","cello","cell phone","chair","chandelier","church","circle","clarinet","clock","cloud","coffee cup","compass","computer","cookie","cooler","couch","cow","crab","crayon","crocodile","crown","cruise ship","cup","diamond","dishwasher","diving board","dog","dolphin","donut","door","dragon","dresser","drill","drums","duck","dumbbell","ear", "elbow","elephant","envelope","eraser","eye"];
random_number=Math.floor((Math.random()*quick_draw_dataset.length)+1);
sketch=quick_draw_dataset[random_number];
document.getElementById("stbd").innerHTML="Sketch to be drawn:       "+sketch;
timer_counter=0;
answer_holder="";
timer_check="";
drawn_sketch="";
score=0;


function update_canvas(){
    background("white");
    random_number=Math.floor((Math.random()*quick_draw_dataset.length)+1);
    sketch=quick_draw_dataset[random_number];
    document.getElementById("stbd").innerHTML="Sketch to be drawn:       "+sketch;  
}
function preload(){
 classifier=ml5.imageClassifier("DoodleNet");
}

function setup(){
canvas=createCanvas(280,280);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line( pmouseX,pmouseY,mouseX,mouseY);
        
    }
    check_sketch();
    if(drawn_sketch==sketch){
        answer_holder="Set";
        score++;   
        document.getElementById("score").innerHTML="Score:        "+score;
    }
}

function check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML="timer-    "+timer_counter;
    if(timer_counter > 400){
        timer_counter=0;
        timer_check="Done";
    }
    if(timer_check=="Done"||answer_holder=="Set"){
        timer_check="";
        answer_holder="";
        update_canvas();
    }
}

function classifyCanvas(){
    classifier.classify(canvas,gotResult);

}

function gotResult(error,results){
    if(error){
    console.error(error);
    }
    console.log(results);
drawn_sketch=results[0].label;
document.getElementById("your_sketch").innerHTML="Your Sketch:    "+results[0].label;
document.getElementById("confi").innerHTML="Confidence:            "+Math.round(results[0].confidence*100)+"%";

}