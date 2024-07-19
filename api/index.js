const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let multer = require("multer");
const path = require("path");
const bookingmodel = require("./models/bookings.js");
require("dotenv").config();
const app = express();
const user = require("./models/user.js");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSalt = "nxjadjw23ni2bd";
const cookieparser = require("cookie-parser");
const imagedown = require("image-downloader");
const placemodel = require("./models/place.js");
const PORT =  4000||process.env.PORT;
app.use(express.json());
app.use(cookieparser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
 cors({
    credentials: true,
    origin: ["https://airbnb-clone-client-eight.vercel.app"],
    methods:["POST" , "GET","DELETE","PUT"]
  })
);
const url =  "mongodb+srv://nishchayparashar1008:Nishchay@cluster1.ywkdbhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1"
mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Utility function for token verification
const verifyToken = (token, res, callback) => {
  if (token) {
    jwt.verify(token, jwtSalt, {}, (err, userdata) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      callback(userdata);
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
};
app.get("/",(req,res)=>{
  res.json("OK");
})

  
app.post("/register", async (req, res) => {
  const { Name, Email, Pass } = req.body;
  if (!Name || !Email || !Pass) {
    return res
      .status(400)
      .json({ error: "Name, Email, and Password are required" });
  }

  try {
    const existingUser = await user.findOne({ Email });
    if (existingUser) {
      return res.status(400).json("Email is already in use");
    }
    const userdoc = await user.create({
      Name,
      Email,
      Pass: bcrypt.hashSync(Pass, bcryptSalt),
    });
    res.json(userdoc);
  } catch (e) {
    console.error("Error during user registration", e);
    res.status(500).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { Email, Pass } = req.body;
  try {
    const userdoc = await user.findOne({ Email });
    if (userdoc) {
      const passok = bcrypt.compareSync(Pass, userdoc.Pass);
      if (passok) {
        jwt.sign(
          { Email: userdoc.Email, id: userdoc._id },
          jwtSalt,
          {},
          (err, token) => {
            if (err) {
              console.error("JWT signing error:", err);
              return res.status(500).json({ message: "Internal server error" });
            }
            res.cookie("token", token, { httpOnly: true }).json(userdoc);
          }
        );
      } else {
        res.status(422).json({ message: "Password not ok" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.error("Error during login", e);
    res.status(500).json({ message: "Internal server error", error: e });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  verifyToken(token, res, async (userdata) => {
    const { Name, Email, _id } = await user.findById(userdata.id);
    res.json({ Name, Email, _id });
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const extension = Date.now() + ".jpg";
  try {
    await imagedown.image({
      url: link,
      dest: __dirname + "/uploads/" + extension,
    });
    res.json(extension);
  } catch (error) {
    console.error("Error downloading image:", error);
    res.status(500).json({ error: "Failed to download image" });
  }
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    Email,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    maxGuests,
    Price,
  } = req.body;

  verifyToken(token, res, async (userdata) => {
    try {
      const placedoc = await placemodel.create({
        Email,
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkInTime,
        checkOutTime,
        maxGuests,
        Price,
      });
      res.json(placedoc);
    } catch (error) {
      res.status(400).json({ message: "Error creating place", error });
    }
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload-by-multer", upload.array("photos", 100), (req, res) => {
  const filenames = req.files.map(file => file.filename);
  res.json(filenames);
});
app.get("/places", async (req, res) => {
  const { Email } = req.query;
  try {
    const places = await placemodel.find({ Email });
    res.json(places);
  } catch (error) {
    res.status(400).json({ message: "Error fetching places", error });
  }
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const place = await placemodel.findById(id);
    res.json(place);
  } catch (error) {
    res.status(400).json({ message: "Error fetching place", error });
  }
});

app.put("/places/:id", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;
  const {
    Email,
    title,
    address,
    photos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    maxGuests,
    Price,
  } = req.body;

  verifyToken(token, res, async (userdata) => {
    try {
      const placedoc = await placemodel.findById(id);
      // console.log(title,placedoc.Email);
      if (Email !== placedoc.Email) {
        return res.status(403).json("Unauthorized access");
      }

      placedoc.set({
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkInTime,
        checkOutTime,
        maxGuests,
        Price,
      });
      
      await placedoc.save();
      res.json("Data updated");
    } catch (error) {
      res.status(400).json({ message: "Error updating place", error });
    }
  });
});


app.get("/list-places", async (req, res) => {
  try {
    const data = await placemodel.find();
    res.json(data);
  } catch (error) {
    console.error("Error fetching places:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/places-delete/:id", async (req,res)=>{
  const{id} =  req.params;
  try{
    const usedoc =  await placemodel.findByIdAndDelete(id);
     res.json(usedoc);
  }
  catch{
    res.json('server error');
  }
})



app.get("/photos/:id", async (req, res) => {
  const { id } = req.params;
  const model = await placemodel.findById(id);
  const arrofpics = model.photos;
  res.json(arrofpics);
});

app.post("/booking", async (req, res) => {
  const { token } = req.cookies;
  verifyToken(token, res, async (userdata) => {
    const { id } = userdata;
    try {
      const { checkIn, checkOut, Guests, Name, Mob, place, price } = req.body;

      if (
        !checkIn ||
        !checkOut ||
        !Guests ||
        !Name ||
        !Mob ||
        !place ||
        !price
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const userd = await bookingmodel.create({
        place,
        user: id,
        checkIn,
        checkOut,
        guests: Guests,
        name: Name,
        phone: Mob,
        price,
      });
      res.json(userd);
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;
  verifyToken(token, res, async (userdata) => {
    const { id } = userdata;
    try {
      const bookings = await bookingmodel.find({ user: id }).populate("place");
      res.json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.get("/booking/:id", async (req, res) => {
  const { token } = req.cookies;
  verifyToken(token, res, async (userdata) => {
    try {
      const { id } = req.params;
      const data = await bookingmodel.findById(id);
      res.json(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
});

app.delete("/delete-bookings/:id", async (req, res) => {
  const { id } = req.params;
  const data = await bookingmodel.findByIdAndDelete(id);
  res.json(data);
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:4000");
});
