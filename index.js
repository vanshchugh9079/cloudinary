//import area
import express from 'express';
import dotenv from "dotenv";
import multer from "multer"
import fs from "fs";
import { v2 as cloudinary } from 'cloudinary';
let id = 1
dotenv.config();
const app = express();
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads"); // Use the defined uploads directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname) // Append the file extension
    }
});
// Configuration
cloudinary.config({
    cloud_name: "dix0eftos",
    api_key: "379598821128542",
    api_secret: "-k1Jj6PB2JHCXWyQxMY74jTI4I8" // Click 'View Credentials' below to copy your API secret
});
// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

let port = process.env.PORT || 3000
app.post("/", upload.single("file"), (req, res) => {
    let path = req.file.path
    cloudinary.uploader.upload(path).then(data => {
        console.log(data)
        fs.unlink(path, (err) => {
            console.log(err);
        })
        res.json({
            message: "file uploded successfully",
            url:data.secure_url
        })
    })
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
