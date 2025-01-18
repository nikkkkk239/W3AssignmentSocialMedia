import express from "express";
import {getDetails} from "../controller/admin.controller.js"
import { protectedRoute } from "../middleware/protectedRoute.js";
import { AdminOnlyRoute } from "../middleware/AdminOnlyRoute.js";

const router = express.Router();

router.get("/getDetails",protectedRoute,AdminOnlyRoute,getDetails);

export default router;