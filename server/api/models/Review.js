const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const reviewSchema = new Schema({
    rating: {
        type: Number, 
        min: 1, 
        max: 5,
        required: 'You must supply the rating!'
    },
    created: {
        type: Date, 
        dafault: Date.now
    }, 
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User', 
        required: 'You must supply an author!'
    }, 
    // reviews are referencing either a gym or a boulder
    gym: {
        type: mongoose.Schema.ObjectId,
        ref: 'Gym'
    },
    boulder: {
        type: mongoose.Schema.ObjectId,
        ref: 'Boulder'
    }
});

reviewSchema.index({ "author": 1, "boulder": 1}, { "unique": true });

/* function autopopulate(next){
    this.populate('author');
    next();
} */

/* reviewSchema.pre('find', autopopulate);
reviewSchema.pre('findOne', autopopulate); */

module.exports = mongoose.model('Review', reviewSchema);
