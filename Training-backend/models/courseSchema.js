const mongoose= require('mongoose')


const courseSchema = new mongoose.Schema({
    course: {
        type:String,
        ref: 'TrainerSchema',
        required: true
    },
    desc: {
        type:String,
        required: true
    },
    cat: {
        type: String,
        required: true
    },
    int_aud: {
        type: String,
        required: true
    },
    benefits: {
        type: String,
        required: true
    },
    trainer_name: {
        type: String,
        ref: 'TrainerSchema',
        required: true
    }
})


const Course = new mongoose.model("Course", courseSchema )

module.exports = Course;


// course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }, //reference to the associated course
// trainer_name: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true }, //reference to the assigned trainer
