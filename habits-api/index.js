"use strict";

require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const port = process.env.PORT || 3002;

const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors());


const Habit = require('./models/Habit');


// database connection method
(() => {
    const uri = process.env.DB_CONNECTION_STRING;
    try {
        mongoose.connect(uri, () => console.log('connected to database'))
    }
    catch (err) {
        console.log(err);
    }
    
})();

// home route
app.get('/', (req, res) => {
    res.send('hello world')
})
//____________________________________________________________________________
// read all habits
const readAllHabits = async (req, res) => {
    try {
        const allHabits = await Habit.find({})
        res.send(allHabits)
    } catch (err) {
        console.log(err)
    }
    
}
app.get('/allhabits', readAllHabits);
//____________________________________________________________________________
// read one habit
const readOneHabit = async (req,res) => {
    const _id = req.params.id
    const habit = await Habit.findById(_id);
    res.send(habit)
}
app.get('/habit/:id', readOneHabit);
//____________________________________________________________________________
// post new habit
const postNewHabit = async(req, res,) => {
    try {
        const newHabit = new Habit(req.body);
        await newHabit.save();
        res.send(newHabit);
    } catch (err) {
        console.log(err);
    }
}


app.post('/newhabit',postNewHabit)
//____________________________________________________________________________
// update a habit by id
const updateHabit =  async(req, res) => { 
    try {
        const _id = req.params.id;
        const updatedContent = req.body;
        const habitToUpdate = await Habit.findById(_id);
        await habitToUpdate.updateOne(updatedContent, { new: true });
        res.send(habitToUpdate); 
    } catch (err) {
        console.log(err);
    }
}
app.put('/updatehabit/:id',updateHabit)
//____________________________________________________________________________
// delete a habit by id
const deleteHabit = async (req,res) => {
   try{ const _id = req.params.id;
    const habitToDelete = await Habit.findById(_id);
    const deleteTime = new Date();
    const deletedObject = {
        habit_deleted_author: habitToDelete.habit_author,
        habit_deleted_name: habitToDelete.habit_name,
        habit_delete_time: deleteTime.toLocaleTimeString()
    }
       await Habit.deleteOne(_id, () => {
        res.send(deletedObject)
        console.log(deletedObject);
    })
   } catch (err) {
       console.log(err);
    }
}
app.delete('/deletehabit/:id',deleteHabit)
//____________________________________________________________________________
// listen
app.listen(port, () => {
    try {
        console.log('listening on port ' + port)
    } catch (err) {
        console.log(err);
    }
    
});
