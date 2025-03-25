import {
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    updatePassword,
    updateUsername,
    getCurrentUser,
} from "../controllers/user.controller.js"
import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js"

const router = express.Router();

// router.route("/signup").post(registerUser);


router.post("/signup", registerUser);
router.post("/login", loginUser);

// app.use(verifyJWT);
router.post("/logout", verifyJWT, logoutUser);
router.delete("/delete", verifyJWT, deleteUser);
router.put("/update-password", verifyJWT, updatePassword);
router.put("/update-username", verifyJWT, updateUsername);
router.get("/get-user", verifyJWT, getCurrentUser);

export default router;