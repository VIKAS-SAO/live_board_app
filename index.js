const path = require('path')
const express = require('express')
const http = require('http')
const socketio = require('socket.io')
  
  
 
  
 
const port=process.env.PORT||1000

const app=express()
const server=http.createServer(app)
const io=socketio(server)

const publicdirectory=path.join(__dirname,'./public') 
app.use(express.static(publicdirectory))
//app.set('view engine', 'html');
// app.get('/index1.html' , function(request , response){
//       //response.render('index');
//       console.log(request.query)
// })
 

 io.on('connection',onConnection )

 function onConnection(socket){
 socket.on('drawPencil', function(data){
      //socket.join(data.room)  do it later on
 
        io.emit('drawPencil' , data);
  
  }) 
    socket.on('drawEraser', function(data){
       //socket.join(data.room)  do it later on

      io.emit('drawEraser' , data);

   }) 

   socket.on('drawLine', function(data){
       //socket.join(data.room)  do it later on 
       io.emit('drawLine' , data); 
   }) 
   socket.on('drawBox', function(data){
    //socket.join(data.room)  do it later on 
    io.emit('drawBox' , data); 
    }) 
    socket.on('drawCircle', function(data){
      //socket.join(data.room)  do it later on 
      io.emit('drawCircle' , data); 
      }) 
    
      socket.on('drawText', function(keywords){
        //socket.join(data.room)  do it later on 
        io.emit('drawText' , keywords); 
       }) 



       //// function for clearing the board
       socket.on('clearBoard', function( ){
        //socket.join(data.room)  do it later on 
        io.emit('clearBoard'    ); 
       }) 










// for copy the shapes to the real canvas
    socket.on('copyToCanvas0', function( ){
    //socket.join(data.room)  do it later on 
        io.emit('copyToCanvas0'  );

    }) 







}
    























server.listen(port,function(){
    console.log('listeing to port  '+port )
})
 
 