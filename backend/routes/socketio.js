module.exports = function (server) {
    var io = require("socket.io")(server);

    io.on("connection",async function(socket){
        console.log("cos nguoi ket noi", socket.id);
        socket.on("QuanLyTre",function(data){ //{tenphong socedid iduser}
        console.log("phong123")
            data=JSON.parse(data);
            socket.join(data.Phong);
            socket.Phong=data.Phong;
            console.log(socket.adapter.rooms)
        })

        await socket.on("location",async function(data){ 
            let adata= JSON.parse(data); //{ ...data.region, date} 
            await socket.to(socket.Phong).emit("locationcerrnet",data)
             console.log("location",adata)
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