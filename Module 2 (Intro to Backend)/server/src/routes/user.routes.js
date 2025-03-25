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
router.post("/logout", verifyJWT, logoutUser);
router.delete("/delete", deleteUser);
router.put("/update-password", verifyJWT, updatePassword);
router.put("/update-username", updateUsername);
router.put("/get-user", getCurrentUser);

export default router;
