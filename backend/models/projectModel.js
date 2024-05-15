// a library for MongoDB and Node.js that provides a straightforward, schema-based solution to model your application data
const mongoose = require('mongoose') 

const Schema = mongoose.Schema

// Project schematic
const projectSchema = new Schema({
    // general schema templates

    // sdg
    sdg: [{
        type: String,
        required: true
    }],
    // description of the project
    goal: {
        type: String,
        required: true
    },
    orginization: {
        type: String,
    },
    source: {
        type: String,
    },
    location: {
        type: String,
    },
    // year published
    published: { 
        type: Number,
        required: true
    },
    website_url: {
        type: String,
    },
    assignment_type: {
        type: String,
        required: true
    },

    // array of keywords
    keywords: [{
        type: String,
        required: true
    }],

    // assignment specific schema templates
    // ONLY APPLIES TO TIER 1 AND 2 ASSIGNMENTS, NOT REQUIRED
    statement: {
        type: String
    },

    // ONLY APPLIES TO TIER 3 ASSIGNMENTS, NOT REQUIRED
    sharepoint_link: {
        type: String
    },

    relationship_manager: {
        type: String
    },

    img_filename: {
        type: String
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)


