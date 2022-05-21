const mongoose= require('mongoose')


const scheduleSchema = new mongoose.Schema({
    course: {
        type:String,
        required: true
    },
    trainer_name: {
        type:String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    starting_time:{
        type: String,
        required: true
    },
    ending_time: {
        type: String,
        required: true
    },
    fee_amount: {
        type: Number,
        required: true
    },
    disc_amount: {
        type: Number,
        required: true
    },
    batch_size: {
        type: Number,
        required: true
    }
})


const Schedule = new mongoose.model("Schedule", scheduleSchema )

module.exports = Schedule;



// var TrainingSchema = new Schema(
//     {
//       course: { type: Schema.Types.ObjectId, ref: 'Course', required: true }, //reference to the associated course
//       trainer_name: { type: Schema.Types.ObjectId, ref: 'Trainer', required: true }, //reference to the assigned trainer
//       status: {type: String, required: true, enum: ['Completed', 'Ongoing'], default: 'Ongoing'},
//       start_time: {type: Date, default: Date.now},  
//       end_time: {type: Date, default: Date.now}, 
//       location: {type: String, required: true, maxlength:100},
//       fee_amount: {type: String, required: true, maxlength:100},
//       disc_amount: {type: String, required: true, maxlength:100},
//       batch_size: {type: String, required: true, maxlength:100},
   
//     }
//   );