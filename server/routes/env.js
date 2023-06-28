import express from "express";
import { fetchGoogleClientId } from "../controllers/env.js";

const router=express.Router();

router.get('/clientid',fetchGoogleClientId);

export default router