import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();

    res.status(200).json({
      success: true,
      service: "Portfolio Backend",
      backend: "awake",
      mongodb: "reachable",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Health Check Failed:", err);

    res.status(500).json({
      success: false,
      service: "Portfolio Backend",
      backend: "awake",
      mongodb: "not reachable",
    });
  }
});

export default router;