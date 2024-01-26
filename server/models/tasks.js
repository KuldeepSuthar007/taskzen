const mongoose = require('mongoose');

const { Schema } = mongoose;

const TaskSchema = new Schema({
    uniqueId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Task', TaskSchema);