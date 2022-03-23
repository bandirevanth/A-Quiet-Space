//welcome to my stream of consciousness code - read at your own risk - no planning here, just messing around and not cleaning up aftermyself.

let nStars=1000;
let starArray=[];
let terrain1 = [];
let terrain2 = [];
let x,y,p1,p2,p3,h;
let playBool = true;

function setup(){
  c=500  //min(windowWidth,windowHeight)*0.9
  createCanvas(c,c);
  angleMode(DEGREES)
  r1=random(0,20);
  g1=random(0,60)
  b1=random(0,90);
  terrain1[0]=[]
  terrain2[0]=[]
  h=random(-360,360)
  p1 = random(0.3,1.2);
  p2 = random(0.2,1.2);
  p3 = random(0.2,1.2);
  stars()
  setTer()
  t=h;
}

function draw(){
  if (playBool){ t+=0.25}
  background(r1,g1,b1);
  translate(width/2,height/2);
  rotate(t/10)
  plotStars();
  moons();
  push()
  translate(0,-height/3)
  scale(1.6,1.4)
  ter1();
  pop()
}

function stars(){
  for(let i=0;i<nStars;i++){
    x =int(random(-c,c));
    y= int(random(-c,c));
    starArray[i]=createVector(x,y);
  }
}

function plotStars(){
  push()
  rotate(t)
  noStroke();
  fill(255-r1,255-g1,255-b1);
  for(let i=0;i<nStars;i++){
    circle(starArray[i].x,starArray[i].y,1)
  }
  pop()
}

function ter1(){
  push()
  noFill()
  strokeWeight(12)
  for(let j=0;j<60;j+=5){
    stroke(120-r1-j*3,120-g1-j*1.5,120-b1-j)
    scale(1+sqrt(j)/100,1+sqrt(j)/100)
    beginShape()
    for (let i=0; i < terrain1[0].length; i++) {
      vertex(terrain1[0][i].x,terrain1[0][i].y) 
    }
    endShape(CLOSE);
  }
  
  pop()
  scale(1,1)
  push()
  noFill()
  strokeWeight(10)
  
  for(let j=0;j<30;j++){
    stroke(180-r1-j*4,220-g1-j*3,240-b1-j*5)
    scale(1+j/1000,1+j/1000)
    beginShape()
    for (let i=0; i < terrain2[0].length; i++) {
      vertex(terrain2[0][i].x,terrain2[0][i].y) 
    }
    endShape(CLOSE);
  }
  pop()

}

function setTer(){
  innerLand();
  outerLand();
}

function outerLand(){
  r=c/2;
  cnt = 0;
   for (let i=0; i <= 360; i+=2) {
      rand1 = random(-2,2);
      x = (r+rand1)*cos(i);
      y = (r+rand1)*sin(i);
     terrain2[0][cnt]=createVector(x,y);
     cnt++
   }
 }
function innerLand(){
  r=c/2.3;
  cnt = 0;
   for (let i=-180; i <= 180; i+=7) {
      rand1 = random(-50,30);
      x = (r+rand1)*cos(i);
      y = (r+rand1)*sin(i);
     terrain1[0][cnt]=createVector(x,y);
     cnt++
   } 
}

function moons(){
  push()
  translate(width/2,0)
  scale(p1,p1)
  rotate(t*p1)
  fill(255)
  t1=-1.5*t*p1
  circle(c/2*sin(t1),c/2*cos(t1),c/5.1);
  stroke(b1*2)
  noFill()
  strokeWeight(4)
  
  for(let i = -90;i<90;i+=1){
    stroke(r1*cos(i*3/p3),g1*sin(i/p2),b1*2*cos(i*i*p3+h),90)
    line(c/2*sin(t1)+c/10*sin(i),c/2*cos(t1)+c/10*cos(i),c/2*sin(t1)+c/10*sin(i),c/2*cos(t1)-c/10*cos(i))
  }
  
  fill(255,255,255,40)
  noStroke()
  circle(c/2*sin(t1),c/2*cos(t1),c/4.95);
  stroke(r1*4*p2+50,g1*4*p2+50,b1*5*p2+60,90)
  noFill()
  strokeWeight(2)
  arc(c/2*sin(t1),c/2*cos(t1),c/4,c/8,-23,202)
  arc(c/2*sin(t1),c/2*cos(t1),c/3.8,c/7,-30,210)
  pop()
  push()
  t2=-t-p2*100
  scale(p2,p2)
  strokeWeight(7)
  translate(c/5,c/3)
  
  for(let i = -90;i<90;i+=5){
    stroke(170-i*p2,180-i*p2,200-i*p3)
    line(c/3*sin(t2)+c/20*sin(i),c/3*cos(t2)+c/20*cos(i),c/3*sin(t2)+c/20*sin(i),c/3*cos(t2)-c/20*cos(i))
  }
  
  pop()
  push()
  strokeWeight(4)
  scale(p3,p3)
  rotate(90*p3)
  t3=t*3*p3
  translate(-c/5,-c/2)
  
  for(let i = -90;i<90;i+=5){
    stroke(g1*cos(i)+80,g1*cos(i*p2)+20,b1*sin(i*p3)+40)
    line(c/2*sin(t3)+c/30*sin(i),c/2*cos(t3)+c/30*cos(i),c/2*sin(t3)+c/30*sin(i),c/2*cos(t3)-c/30*cos(i))
  }
  pop()
 }

function keyPressed(){
  setup()
  draw()
  
}

function mousePressed(){
  playBool=!playBool;
}
