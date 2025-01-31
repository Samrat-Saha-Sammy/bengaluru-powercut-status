const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

// Define IoT Data Schema
const iotDataSchema = new mongoose.Schema({
	deviceId: String,
	status: Number,
	timestamp: { type: Date, default: Date.now },
});

const IoTData = mongoose.model("IoTData", iotDataSchema);

// API Route to receive IoT data
app.post("/api/iot-data", async (req, res) => {
	try {
		const { deviceId, status } = req.body;
		if (!deviceId || status === undefined) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const newData = new IoTData({ deviceId, status });
		await newData.save();
		res.status(201).json({ message: "Data stored successfully" });
	} catch (error) {
		res.status(500).json({ error: "Internal server error" });
	}
});

// Start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
