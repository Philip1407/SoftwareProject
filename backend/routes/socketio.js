module.exports = function (server) {
    var io = require("socket.io")(server);

    io.on("connection",function(socket){
        console.log("cos nguoi ket noi", socket.id);
        socket.on("QuanLyTre",function(data){
            data=JSON.parse(data);
            socket.join(data.Phong);
            socket.Phong=data.Phong;
        })
        socket.on("YeuCauGhiAm",function(data){
            console.log("1  "+" server  Nhaan  " + data)
            socket.to(socket.Phong).emit('NhanYeuCauGhiAm',socket.id);
        })
        socket.on("HuyCauGhiAm",function(data){
            console.log("3  "+socket.id+ "  Nhaan  " + data)
            socket.to(socket.Phong).emit('HuyYeuCauGhiAm',socket.id);
        })
        socket.on("TaiFileGhiAm",function(data){
            console.log("5  "+socket.id+ "  Nhaan  " + data)
            socket.to(socket.Phong).emit('TaiFileGhiAmVeMayPH',socket.id);
        })
        socket.on("disconnect",function(socket){
            console.log("Ngat ket noi",socket.id)
        })
    })
 
}