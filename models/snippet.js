const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    // This has to be one of ace edits modes.
    // Ex: https://github.com/ajaxorg/ace/blob/master/lib/ace/ext/modelist.js#L45
    filetype: {
        type: String,
        required: true
    },
    content: String
});

const SnippetSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    files: [fileSchema],
    tags: {
        type: [String],
        validate: {
            validator: function (tags) {
                var result = Joi.validate(tags, Joi.array().unique());

                return result.error === null;
            },
            message: 'The tags have to be unique.'
        },
    },

}, {
    timestamps: true
});

const Snippet = mongoose.model('Snippet', SnippetSchema);

module.exports = Snippet;