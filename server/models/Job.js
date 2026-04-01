import mongoose from 'mongoose';

const jobSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    company: {
        type: String,
        required: [true, 'Please add a company name']
    },
    position: {
        type: String,
        required: [true, 'Please add a position']
    },
    location: {
        type: String
    },
    salary: {
        type: String
    },
    applicationLink: {
        type: String
    },
    status: {
        type: String,
        enum: ['Applied', 'Interviewing', 'Offer', 'Rejected'],
        default: 'Applied'
    },
    dateApplied: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String
    }
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
