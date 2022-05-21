const mongoose= require('mongoose')


const trainerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qualif: {
        type: String,
        required: true
    },
    short_desc: {
        type: String,
        required: true
    },
    yoe: {
        type: Number,
        required: true
    }

})


const Trainer = new mongoose.model("TrainerSchema", trainerSchema )

module.exports = Trainer;
