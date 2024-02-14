const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isAuth = require("../middlewares/isAuth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, age, favoriteGenre,image } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      res.send({ msg: "Existed user" });
    } else {
      const newUser = new User({
        fullName,
        email,
        password,
        age,
        favoriteGenre,
        image
      });
      const saltRounds = 10;
      const cryptedPassword = await bcrypt.hash(password, saltRounds);
      newUser.password = cryptedPassword;
      await newUser.save();
      const payload = {
        id: newUser._id,
      };
      const token = await jwt.sign(payload, "jhvbekvbkeubv", {
        expiresIn: "24h",
      });
      res.send({ msg: "user created !", newUser, token });
    }
  } catch (err) {
    console.error(err, "server error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.send({ msg: "user not found" });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.send({ msg: "Bad password" });
        const payload = {
          id: user._id,
        };
        const token = await jwt.sign(payload, "jhvbekvbkeubv", {
          expiresIn: "24h",
        });
        res.send({ msg: "User connected", user, token });
      }
    }
  } catch (err) {
    console.error(err, "server error");
  }
});

router.get("/isAuth", isAuth, async (req, res) => {
  res.send({ user: req.user });
});

router.put("/updateUser/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let updatedUser = await User.findById(id);
    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (req.file) {
      if (updatedUser.image) {
        const imagePath = path.join(__dirname, "..", updatedUser.image);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
      updatedUser.image = req.file.path;
    }

    updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

    res.status(200).json({ msg: "User updated", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.post("/uploadProfileImage", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }
    res.send(`/uploads/${req.file.filename}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

router.get("/images/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (!user.image) {
      return res.status(404).send("User does not have an image");
    }
    const normalizedPath = path.normalize(user.image);
    const filePath = path.join(__dirname, "..", normalizedPath);
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send("Image not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
