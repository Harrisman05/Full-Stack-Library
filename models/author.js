const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({ // creating a schema using mongoose
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Author', authorSchema); // create the model, and name it. It needs to be exported to the appropriate route so that the ejs file has access to it. 'Author' is the name of table, authorSchema defindes the table