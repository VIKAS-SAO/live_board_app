const canvas = document.querySelectorAll('.canvas'); 
const button = document.querySelectorAll('.button'); 
 for(let i=0;i<canvas.length;i++){
    canvas[i].height = window.innerHeight*.8;
    canvas[i].width = window.innerWidth*.86;
  }
 
const ctx0 = canvas[0].getContext('2d');
const ctx1 = canvas[1].getContext('2d');


function copyToCanvas0(){
    ctx0.drawImage(canvas[1] ,0, 0); 
 }
 
 
const button0 = button[0];
const button1 = button[1];
const button2 = button[2];
const button3 = button[3];
const button4 = button[4];
const button5 = button[5];
const button6 = button[6];
let mode0 = false;
let mode1 = false;
let mode2 = false;
let mode3 = false;
let mode4 = false;
let mode5 = false;
let MODE = -1;


// this is the interface file
 
 
    
    const nav2 = document.querySelector('.nav2');
     nav2.setAttribute('hidden' , 'hidden');
     let THICKNESS = 2;
    let COLOR = 'black';
    
    button0.addEventListener('click',function(){
        MODE = 0;
         nav2.removeAttribute('hidden');
        activeAdderTool(0);
     })
    button1.addEventListener('click',function(){
        MODE = 1;
        nav2.removeAttribute('hidden');
        activeAdderTool(1);
     
    })
    button2.addEventListener('click',function(){
        MODE = 2;
        nav2.removeAttribute('hidden');
        activeAdderTool(2);
     
    })
    button3.addEventListener('click',function(){
        MODE = 3;
        nav2.removeAttribute('hidden');
        activeAdderTool(3);
     
    })
    button4.addEventListener('click',function(){
        MODE = 4;
        nav2.removeAttribute('hidden');
        activeAdderTool(4);
    
     
    })
    button5.addEventListener('click',function(){
        MODE = 5;
        nav2.removeAttribute('hidden');
        activeAdderTool(5);
      
    })
    
    
    
    function activeAdderTool(index){
        for(let i=0;i<button.length;i++){
            button[i].classList.remove('activeTool'); 
        }
        button[index].classList.add('activeTool'); 
    
    }
    // handling the thickness tools
    const thickness = document.querySelectorAll('.thickness');
    function activeAdderThickness(index){
        for(let i=0;i<thickness.length;i++){
            thickness[i].classList.remove('activeThick'); 
        }
        thickness[index].classList.add('activeThick'); 
    
    } 
    for(let i=0;i<thickness.length;i++){
        thickness[i].addEventListener('click',function(){
              activeAdderThickness(i);
              THICKNESS = (i+1)*3;
        })
    
    }
    
    // handling the colors button
    const colors = document.querySelectorAll('.colors'); 
    let colorList =[];
    colorList.push('black');
    colorList.push('brown');
    colorList.push('purple');
    colorList.push('blue');
    colorList.push('green');
    colorList.push('yellow');
    colorList.push('orange');
    colorList.push('red');
    colorList.push('white');
    const colorbox = document.querySelectorAll('.colorbox');
    function activeAdderColorbox(index){
        for(let i=0;i<colorbox.length;i++){
            colorbox[i].classList.remove('activeColorbox'); 
        }
        colorbox[index].classList.add('activeColorbox'); 
    } 
    for(let i=0;i<colors.length;i++){
        colors[i].style.backgroundColor = colorList[i];
    }
    for(let i=0;i<colors.length;i++){
        colors[i].addEventListener('click',function(){
               COLOR = colorList[i];
               activeAdderColorbox(i);
         })
    
    }
    
    
   ////////////////////////////////////////////////////////////////// 
    // all the functions


   const socket=io()

     




const parameter = new URLSearchParams(window.location.search)
let ROOM  = parameter.get('room');

let mouseX = null;
let mouseY = null;


 

 

let mousedown = 0;
document.addEventListener('mousedown',function(){
    mousedown = 1;
})
document.addEventListener('mouseup',function(){
    mousedown = 0;
})
document.addEventListener('mousemove',function(event){
    mouseX =  event.clientX-canvas[0].getBoundingClientRect().left;
    mouseY =  event.clientY-canvas[0].getBoundingClientRect().top;
    if(MODE==0){
        if(mousedown){
            
            let data = {
                mouseX:mouseX,
                mouseY:mouseY,
                color:COLOR,
                thickness:THICKNESS,
                room:ROOM
            } 
              socket.emit('drawPencil',data);
       
        }
    }

    if(MODE==5){
         if(mousedown){ 
            let data = {
                mouseX:mouseX,
                mouseY:mouseY,
                color:COLOR,
                thickness:THICKNESS,
                room:ROOM
            }
            socket.emit('drawEraser',data);

            
       
        }


    }

   


})
// all event and function listeners
socket.on('drawPencil',function(data){
     drawPencil(data); 
 })

 socket.on('drawEraser',function(data){
    drawEraser(data); 
})





function drawPencil( data){ 
     ctx0.beginPath(); 
    ctx0.arc(data.mouseX, data.mouseY, data.thickness, 0, Math.PI*2 ,false);
     ctx0.fillStyle=data.color;
     ctx0.fill(); 
}

function drawEraser( data){ 
     ctx0.clearRect(data.mouseX-data.thickness , data.mouseY-data.thickness , data.thickness*2 ,data.thickness*2 ) 

}

   

 



///////////////  funtioon for making the line tool

  
let mousedownLineTool = 0;
let startX = null;
let startY = null;
document.addEventListener('mousedown',function(){
    if(MODE == 1){
          startX = mouseX;
          startY = mouseY;
        mousedownLineTool = 1;  
    }
})
document.addEventListener('mouseup',function(e){
     if(MODE == 1){
        mousedownLineTool = 0; 
         socket.emit('copyToCanvas0');  
    }
})
document.addEventListener('mousemove',function(){
    if(MODE ==1 && mousedownLineTool==1){
        let data = {
            startX:startX,
            startY:startY, 
            mouseX:mouseX,
            mouseY:mouseY,
            color:COLOR,
            thickness:THICKNESS,
            room:ROOM
        }
         socket.emit('drawLine',data);


    }

})

function drawLine(data){
    ctx1.clearRect(0,0,canvas[1].width ,canvas[1].height );  
    ctx1.beginPath();
    ctx1.moveTo(data.startX , data.startY);
    ctx1.lineTo(data.mouseX ,  data.mouseY);
    ctx1.lineWidth=data.thickness/2;
    ctx1.strokeStyle=data.color;
    ctx1.stroke() 
}
socket.on('drawLine',function(data){
    drawLine(data); 
})
socket.on('copyToCanvas0',function(data){
    copyToCanvas0();
    ctx1.clearRect(0,0,canvas[1].width , canvas[1].height)
 })




 /////////////////////////////////// function for the box tool

 
  
let mousedownBoxTool = 0;
// let startX = null;
// let startY = null;
document.addEventListener('mousedown',function(){
    if(MODE == 2){
          startX = mouseX;
          startY = mouseY;
          mousedownBoxTool = 1;  
    }
})
document.addEventListener('mouseup',function(e){
     if(MODE == 2){
        mousedownBoxTool = 0; 
         socket.emit('copyToCanvas0');  
    }
})
document.addEventListener('mousemove',function(){
    if(MODE ==2 && mousedownBoxTool==1){
        let data = {
            startX:startX,
            startY:startY, 
            mouseX:mouseX,
            mouseY:mouseY,
            color:COLOR,
            thickness:THICKNESS,
            room:ROOM
        }
         socket.emit('drawBox',data);


    }

})

function drawBox(data){
    ctx1.clearRect(0,0,canvas[1].width ,canvas[1].height );  
    ctx1.beginPath(); 
    ctx1.lineWidth=data.thickness/2;
    ctx1.strokeStyle=data.color;
    ctx1.rect(data.startX , data.startY , data.mouseX - data.startX, data.mouseY - data.startY )
    ctx1.stroke() 
}
socket.on('drawBox',function(data){
    drawBox(data); 
})
socket.on('copyToCanvas0',function(data){
    copyToCanvas0();
    ctx1.clearRect(0,0,canvas[1].width , canvas[1].height)
 })


 /////////////////// function for the circle tool
 
  
let mousedownCircleTool = 0;
// let startX = null;
// let startY = null;
document.addEventListener('mousedown',function(){
    if(MODE == 3){
          startX = mouseX;
          startY = mouseY;
          mousedownCircleTool = 1;  
    }
})
document.addEventListener('mouseup',function(e){
     if(MODE == 3){
        mousedownCircleTool = 0; 
         socket.emit('copyToCanvas0');  
    }
})
document.addEventListener('mousemove',function(){
    if(MODE == 3 && mousedownCircleTool==1){
        let data = {
            startX:startX,
            startY:startY, 
            mouseX:mouseX,
            mouseY:mouseY,
            color:COLOR,
            thickness:THICKNESS,
            room:ROOM
        }
         socket.emit('drawCircle',data);


    }

})

function drawCircle(data){
    ctx1.clearRect(0,0,canvas[1].width ,canvas[1].height );  
    ctx1.beginPath(); 
    ctx1.lineWidth=data.thickness/2;
    ctx1.strokeStyle=data.color;
    let radius = Math.sqrt((data.startX-data.mouseX)*(data.startX-data.mouseX)+
                           (data.startY-data.mouseY)*(data.startY-data.mouseY))
    ctx1.arc(data.startX , data.startY ,  radius, 0,Math.PI*2 , false)
    ctx1.stroke() 
}
socket.on('drawCircle',function(data){
    drawCircle(data); 
})
socket.on('copyToCanvas0',function(data){
    copyToCanvas0();
    ctx1.clearRect(0,0,canvas[1].width , canvas[1].height)
 })


 //////////////////////////// function for the text tool


 let mousedownTextTool=0;
 let textPositionX ;
 let textPositionY ;
   
 let keywords =[];

canvas[1].addEventListener('click',function(){
    if(MODE == 4){ 
        if(mousedownTextTool ==0){
            keywords = [] ;
            startX = mouseX;  
            startY = mouseY;
            mousedownTextTool = 1; 
            textPositionX = startX;
            textPositionY = startY; 
            console.log('on');
        }
        else if(mousedownTextTool ==1){
            mousedownTextTool = 0;
            socket.emit('copyToCanvas0'); 
            console.log('off');
        }
        
     }
 })
 

// to convert to the ascii value
function ascii(s){
    return  parseInt( s.charCodeAt(0));
}
function checkAlpha(s){

    if(s.length != 1){return false;}
    s=ascii(s);
    if(s>=65 && s<=90 || s>=97 && s<=122){return true;}
    return false;
}
document.addEventListener('keydown' ,function(e){
      if(MODE == 4 && mousedownTextTool == 1  ){
        if(checkAlpha( e.key)){
            let data={
                key:e.key,
                x:textPositionX,
                y:textPositionY,
                color:COLOR,
                thickness:THICKNESS*7, 
            }
            keywords.push(data);
            socket.emit('drawText', keywords);
            textPositionX += ctx1.measureText(e.key).width;  
        }else if(e.key === ' '){
            let data={
                key:e.key,
                x:textPositionX,
                y:textPositionY,
                color:COLOR,
                thickness:THICKNESS*7, 
            }
            keywords.push(data);
            socket.emit('drawText', keywords);
            textPositionX += ctx1.measureText(e.key).width; 
             
        }else if(e.key == 'Enter'){
            textPositionX = startX;
            textPositionY += THICKNESS*7+4; 
        }else if(e.key == 'Backspace'){
            keywords.pop();
            textPositionX = keywords[keywords.length-1].x;
            textPositionY = keywords[keywords.length-1].y;
            socket.emit('drawText', keywords); 
        }

           
    }
})
socket.on('drawText',function(keywords){
    drawText(keywords);
})

function drawText(keywords){
    ctx1.clearRect(0,0,canvas[1].width , canvas[1].height);
    keywords.forEach(function(item) {
            ctx1.fillStyle = item.color;
            ctx1.font = item.thickness+"px Arial";
            ctx1.fillText(item.key , item.x , item.y);
            
        });
}


 

//// ///////////////////// fucntion for clearing the board

button[6].addEventListener('click',function(){
    socket.emit('clearBoard')
})
function clearBoard(){
    ctx0.clearRect(0,0,canvas[0].width ,  canvas[0].height); 
}
socket.on('clearBoard',function(){
    clearBoard();
})
