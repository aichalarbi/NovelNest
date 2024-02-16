const express = require("express");
const axios = require("axios");
const router = express.Router();
const book = require("../models/bookModel");
// const User = require("../models/user");
// const FavoriteBook = require("../models/favoriteBook");

router.get("/api/sync-google-books", async (req, res) => {
    try {
        const response = await axios.get(
            "https://www.googleapis.com/books/v1/volumes?q=Colleen"
        );

        if (!response.data || !response.data.items) {
            throw new Error("Invalid response from external API");
        }

        const books = response.data.items.map((item) => {
            const volumeInfo = item.volumeInfo;
            return {
                title: volumeInfo.title,
                authors: volumeInfo.authors || [],
                description: volumeInfo.description || "",
                image: volumeInfo.imageLinks?.thumbnail || "",
                link: volumeInfo.infoLink || "",
            };
        });

        await book.insertMany(books);

        res.json({ message: "Books synced successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/addBook", async (req, res) => {
    try {
        const newBook = {
            title: req.body.title,
            authors: req.body.authors,
            description: req.body.description,
            image: req.body.image,
        };

        const result = await book.create(newBook);
        res.status(201).json({ msg: "Book added", result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
// router.get('/favorites', async (req, res) => {
//     try {
//       const userId = req.user.id;
//       const favoriteBooks = await FavoriteBook.find({ userId });
//       res.json({ favoriteBooks });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
router.get("/getAllBooks", async (req,res) => {
    try {
      const result = await book.find()
      res.send({msg: "books list :", result})
    } catch (err) {
      console.error(err)
    }
  })
router.get("/getBook/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const foundBook = await book.findById(id);
        if (!foundBook) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json({ msg: "Book retrieved", book: foundBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.put("/updateBook/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updatedBook = await book.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json({ msg: "Book updated", book: updatedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.delete("/deleteBook/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBook = await book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ msg: "Book not found" });
        }
        res.status(200).json({ msg: "Book deleted", book: deletedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});


module.exports = router;
