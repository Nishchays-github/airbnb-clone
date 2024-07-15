const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const bookingmodel = require("./models/bookings.js");
require("dotenv").config();
const app = express();
const user = require("./models/user.js");
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSalt = "nxjadjw23ni2bd";
const cookieparser = require("cookie-parser");
const imagedown = require("image-downloader");
const multer = require("multer");
const placemodel = require("./models/place.js");
app.use(express.json());
app.use(cookieparser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

const url =
  "mongodb+srv://nishchayparashar1008:Nishchay@cluster1.ywkdbhr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.post("/register", async (req, res) => {
  const { Name, Email, Pass } = req.body;

  // Log incoming request body to check the values

  // Check for missing fields
  if (!Name || !Email || !Pass) {
    return res
      .status(400)
      .json({ error: "Name, Email, and Password are required" });
  }

  try {
    const existingUser = await user.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const userdoc = await user.create({
      Name,
      Email,
      Pass: bcrypt.hashSync(Pass, bcryptSalt),
    });
    console.log("User registered successfully");
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
      const passok = bcrypt.compareSync(Pass, userdoc.Pass); // Ensure the property name matches your schema
      if (passok) {
        console.log("Password ok");
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
        console.log("Password not ok");
        res.status(422).json({ message: "Password not ok" });
      }
    } else {
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    console.error("Error during login", e);
    res.status(500).json({ message: "Internal server error", error: e });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSalt, {}, async (err, userdata) => {
      if (err) throw err;
      const { Name, Email, _id } = await user.findById(userdata.id);
      res.json({ Name, Email, _id });
    });
  } else res.json(token);
});

// logout function

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

// upload by link
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
    title,
    address,
    photoLink,
    photos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    maxGuests,
    Price
  } = req.body;
  if (token) {
    jwt.verify(token, jwtSalt, {}, async (err, userdata) => {
      if (err) throw err;
      const placedoc = await placemodel.create({
        owner: userdata.id,
        title,
        address,
        photoLink,
        photos: photos,
        description,
        perks,
        extraInfo,
        checkInTime,
        checkOutTime,
        maxGuests,
        Price
      });
      res.json(placedoc);
    });
  }
});

app.get("/places", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSalt, {}, async (err, userdata) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      const { _id } = userdata;
      try {
        const places = await placemodel.find({ owner: _id });
        res.json(places);
      } catch (error) {
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});
app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await placemodel.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    photoLink,
    photos,
    description,
    perks,
    extraInfo,
    checkInTime,
    checkOutTime,
    maxGuests,
    Price
  } = req.body;

  jwt.verify(token, jwtSalt, {}, async (err, userdata) => {
    if (err) return res.status(401).send("Unauthorized");

    const placedoc = await placemodel.findById(id);
    if (id === placedoc._id.toString()) {
      placedoc.set({
        owner: userdata._id,
        title,
        address,
        photoLink,
        photos,
        description,
        perks,
        extraInfo,
        checkInTime,
        checkOutTime,
        maxGuests,
        Price
      });
      await placedoc.save();
      res.json("data updated");
    } else {
      res.status(403).send("Forbidden");
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

app.get("/photos/:id", async (req, res) => {
  const { id } = req.params;
  const model = await placemodel.findById(id);
  const arrofpics = model.photos;
  res.json(arrofpics);
});

app.post("/booking", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSalt, {}, async (err, userdata) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
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
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSalt, {}, async (err, userdata) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      const { id } = userdata;
      try {
        const bookings = await bookingmodel
          .find({ user: id })
          .populate("place");
        // console.log(bookings);
        res.json(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});

app.get("/booking/:id", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSalt, {}, async (err, userdata) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized access" });
      }
      try {
        const { id } = req.params;
        const data = await bookingmodel.findById(id);
        res.json(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });
  } else {
    res.status(401).json({ message: "No token provided" });
  }
});

app.delete("/delete-bookings/:id", async (req, res) => {
  const { id } = req.params;
  const data =  await bookingmodel.findByIdAndDelete(id);
  res.json(data);
});
app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
// lywMrbdGs02xfFKq
