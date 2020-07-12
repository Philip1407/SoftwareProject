module.exports = function (server) {
  var io = require("socket.io")(server);
  let User = require("../models/user");
  let location = require("../models/location");
  const moment = require("moment");

  io.on("connection", async function (socket) {
    console.log("cos nguoi ket noi", socket.id);
    socket.on("QuanLyTre", function (data) {
      //{tenphong socedid iduser}
      data = JSON.parse(data);
      socket.join(data.Phong);
      socket.Phong = data.Phong;
      console.log(socket.adapter.rooms);
    });

    await socket.on("location", async function (data) {
      let adata = JSON.parse(data); //{ ...data.region, date}
      console.log("data gui len  ", adata);
      if (adata.region.latitude != null) {
        if (adata.username === "") {
          let Phong = socket.Phong;
          let D = moment().format("YYYY-MM-DD");
          let re = {
            ...adata.region,
            timestamp: D,
            Kids: Phong,
          };
          await location.insertMany(re);
        }
      }

      // await User.update({ 'Kids': socket.Phong },{'path':lo})
      await socket.to(socket.Phong).emit("locationcerrnet", data);
      //  console.log("location",lo)
    });

    socket.on("YeuCauGhiAm", function (data) {
      console.log("1  " + " server  Nhaan  " + data);
      socket.to(socket.Phong).emit("NhanYeuCauGhiAm", socket.id);
    });
    socket.on("HuyCauGhiAm", function (data) {
      console.log("3  " + socket.id + "  Nhaan  " + data);
      socket.to(socket.Phong).emit("HuyYeuCauGhiAm", socket.id);
    });
    socket.on("TaiFileGhiAm", function (data) {
      console.log("5  " + socket.id + "  Nhaan  " + data);
      socket.to(socket.Phong).emit("TaiFileGhiAmVeMayPH", socket.id);
    });
    socket.on("disconnect", function (socket) {
      console.log("Ngat ket noi", socket.id);
    });

    socket.on("ConGuiThongBao", function (data) {
      //{tenphongCha socedid iduser content}
      data = JSON.parse(data);
      let Phong = data.Phong;
      socket.to(Phong).emit("BameNhanThongBao", data.content);
    });
  });
};
