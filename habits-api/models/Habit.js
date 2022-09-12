const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({
    habit_author: {
        type: String,
        required: true,
    },
    habit_name: {
        type: String,
        required: true,
        
    },
    habit_reason: {
        type: String,
        required: true
    },
    habit_start_date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    habit_completion_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    habit_is_new: {
        type: Boolean,
        default: false,
        required: true
    }
})

const model = mongoose.model("habit", HabitSchema);

module.exports = model;