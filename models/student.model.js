const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_id: Number,
    name: String,
    gpa: Number,
    created_at: String,
    modified_at: String
});

studentSchema.plugin(AutoIncrement, {inc_field: 'student_id'});

module.exports = mongoose.model('Student', studentSchema);
