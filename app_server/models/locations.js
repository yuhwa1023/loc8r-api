var mongoose = require('mongoose');
const Loc = mongoose.model('Location');

const locationsReadOne = async(req, res) => {
    try {
        const location =await Loc.findById(req.params.locationid).exec();
        res.status(200).json(location);
    } catch (err) {
        res.status(500).json({ error: 'An error occurred.'});
    }
};
var reviewSchema = new mongoose.Schema ({
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    reviewText: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date, 
        'default': Date.now
    }
});

var openingTimeSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

var locationSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    address: String,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    facilities: [String],
    coords: {type: [Number], index: '2dsphere'},
    openingTimes: [openingTimeSchema],
    reviews: [reviewSchema]
});

locationSchema.index({coords: '2dsphere'});

mongoose.model('Location', locationSchema);