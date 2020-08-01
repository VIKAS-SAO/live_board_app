{

const nav2 = document.querySelector('.nav2');
 nav2.setAttribute('hidden' , 'hidden');
 let THICKNESS = 2;
let COLOR = 'black';

button0.addEventListener('click',function(){
    mode0 = true;  mode1 = false;  mode2 = false; mode3 = false; mode4 = false; 
    nav2.removeAttribute('hidden');
    activeAdderTool(0);
 })
button1.addEventListener('click',function(){
    mode0 = false;  mode1 = true;  mode2 = false; mode3 = false; mode4 = false; 
    nav2.removeAttribute('hidden');
    activeAdderTool(1);
 
})
button2.addEventListener('click',function(){
    mode0 = false;  mode1 = false;  mode2 = true; mode3 = false; mode4 = false; 
    nav2.setAttribute('hidden' , 'hidden');
    activeAdderTool(2);
 
})
button3.addEventListener('click',function(){
    mode0 = false;  mode1 = false;  mode2 = false; mode3 = true; mode4 = false; 
    nav2.setAttribute('hidden' , 'hidden');
    activeAdderTool(3);
 
})
button4.addEventListener('click',function(){
    mode0 = false;  mode1 = false;  mode2 = false; mode3 = false; mode4 = true;
    nav2.setAttribute('hidden' , 'hidden');  
    activeAdderTool(4);

 
})
button5.addEventListener('click',function(){
    mode0 = false;  mode1 = false;  mode2 = false; mode3 = false; mode4 = true;
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
colorList.push('blue');
colorList.push('green');
colorList.push('yellow');
colorList.push('orange');
colorList.push('red');
for(let i=0;i<colors.length;i++){
    colors[i].style.backgroundColor = colorList[i];
}
for(let i=0;i<colors.length;i++){
    colors[i].addEventListener('click',function(){
           COLOR = colorList[i];
     })

}





}

 