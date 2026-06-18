"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await Workout_1.default.find().lean();
    res.json({ message: 'List workouts', data: workouts });
});
router.post('/', async (req, res) => {
    const workout = new Workout_1.default(req.body);
    await workout.save();
    res.status(201).json({ message: 'Create workout', body: workout });
});
exports.default = router;
