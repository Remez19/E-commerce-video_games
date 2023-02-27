import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import { isAuthAdmin, isAuth } from "../middleware/is-auth.mjs";
import { addItem } from "../controllers/admin.mjs";
import { body } from "express-validator";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, `../images/Games_Images/`));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending .jpg
  },
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload a valid image file"));
    }
    cb(undefined, true);
  },
});

const upload = multer({ storage: storage });

const adminRouter = Router();

adminRouter.post(
  "/add-item",
  upload.single("image"),
  isAuth,
  isAuthAdmin,
  [
    body("name").isAlpha().isLength({ min: 1 }),
    body("price")
      .isNumeric()
      .custom((value) => value > 0),
    body("description").isAlphanumeric().isLength({ min: 10 }),
    body("platforms").custom((value) => value.length > 0),
  ],
  addItem
);

export default adminRouter;
