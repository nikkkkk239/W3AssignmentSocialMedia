import express from "express";
import { login ,addTask ,checkAuth ,logout} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/login",login);
router.post("/addTask",addTask);
router.get("/checkauth",protectedRoute,checkAuth);
router.post("/logout",logout)

export default router;