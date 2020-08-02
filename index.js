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
 let room; 
 function onConnection(socket){

   socket.on('join',function(ROOM){
    room  = ROOM; 
    socket.join(room) 
  
   })


  socket.on('drawPencil', function(data){ 
        io.to(room).emit('drawPencil' , data); 
  }) 
    socket.on('drawEraser', function(data){ 
      io.to(room).emit('drawEraser' , data); 
   }) 

   socket.on('drawLine', function(data){
        io.to(room).emit('drawLine' , data); 
   }) 
   socket.on('drawBox', function(data){
     io.to(room).emit('drawBox' , data); 
    }) 
    socket.on('drawCircle', function(data){
       io.to(room).emit('drawCircle' , data); 
      }) 
    
      socket.on('drawText', function(keywords){
         io.to(room).emit('drawText' , keywords); 
       }) 
 

       //// function for clearing the board
       socket.on('clearBoard', function( ){
         io.to(room).emit('clearBoard'    ); 
       }) 
 
      // for copy the shapes to the real canvas
      socket.on('copyToCanvas0', function( ){
          io.to(room).emit('copyToCanvas0'  );

      }) 
      socket.on('disconnect', function( ){
        io.to(room).emit('clearBoard'    ); 
        io.emit('join'    ); 
        socket.join(room) 


    }) 
 

}
    























server.listen(port,function(){
    console.log('listeing to port  '+port )
})
 
 