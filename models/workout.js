const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workout = new Schema(
    {
        date: {
            type: Date,
            default: () => new Date()
        },
        exercises: [
            {
                type: {
                    type: String,
                    trim: true,
                    required: "Please include the type of exercise completed"
                },
                name: {
                    type: String,
                    trim: true, 
                    required: "Please include the name of the exercise completed"
                },
                duration: {
                    type: Number,
                    required: "Please include the duration of the exercise (in minutes)"
                },
                distance: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                weight: {
                    type: Number
                },
            }
        ]
    },
    {
        toJSON: {
            // allows for easier getting/setting data on client side
            virtuals: true
        }
    }
);

// this will dynamically create a property for the total duration of workout 
workout.virtual('totalDuration').get(function() {
    return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0); // initial value needed, otherwise funky things happen! 
})

const Workout = mongoose.model("Workout", workout);

module.exports = Workout;