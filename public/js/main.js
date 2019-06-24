// const multer = require("multer");
// const jimp = require("jimp");
// const path = require("path");

// if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require("node-localstorage").LocalStorage;
//   localStorage = new LocalStorage("./scratch");
// }

// //*multer
// var upload = multer({ dest: "uploads/" });

// let fileName = "";
// const storage = multer.diskStorage({
//   destination: "public/uploads/",
//   filename: function(req, file, cb) {
//     fileName =
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname);
//     cb(null, fileName);
//   }
// });

// const storage = multer.memoryStorage();

// const upload = multer({
//   storage: storage
// }).single("avatar");

// let stores = [];
// app.post("/add/store", (req, res) => {
//   upload(req, res, () => {
//     const newStore = {
//       name: req.body.name,
//       des: req.body.des,
//       tags: req.body.tags,
//       updated: Date.now(),
//       avatar: fileName
//     };
//     stores.push(newStore);
//     // localStorage.setItem("stores", JSON.stringify(stores));
//     console.log(stores);
//     // jimp.read("public/uploads/" + fileName, (err, img) => {
//     //   if (err) throw err;
//     //   img.resize(50, 50).write("public/uploads/" + fileName);
//     // });
//     res.redirect("/");
//   });
// });

// //*localstorage
// app.use("/", (req, res) => {
//   res.render("index", {
//     store: JSON.parse(localStorage.getItem("stores"))
//   });
//   localStorage.clear();
// });

// getLocation();
// function getLocation() {
//   var location = "100 Hüttenstraße";
//   fetch("https://maps.googleapis.com/maps/api/geocode/json", {
//     params: {
//       address: location,
//       key: "AIzaSyBPpLmiojA25PuYuA2hXzQKbVCSl1YEkzo"
//     }
//   })
//     // .then(res => res.json())
//     .then(json => console.log(json));
//   var formattedAddress = response.data.results[0].formatted_address;
//   var latitude = response.data.results[0].geometry.location.lat;
//   var longitude = response.data.results[0].geometry.location.lng;

//   console.log(formattedAddress);
//   console.log(latitude);
//   console.log(longitude).catch(error => console.error("Error:", error));
// }

// var infowindow = new google.maps.InfoWindow();

// for (var i = 0; i < arraylng.length - 1; i++) {
//   var marker = new google.maps.Marker({
//     position: new google.maps.LatLng(arraylng[i], arraylat[i]),
//     map: map
//   });

//   makeInfoWindowEvent(map, infowindow, "test" + i, marker);

//   markers.push(marker);
// }

// function makeInfoWindowEvent(map, infowindow, contentString, marker) {
//   google.maps.event.addListener(marker, "click", function() {
//     infowindow.setContent(contentString);
//     infowindow.open(map, marker);
//   });
// }
// google map code
