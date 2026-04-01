import Job from '../models/Job.js';

// @desc    Get user jobs (with search, sort, filter, pagination)
// @route   GET /api/jobs
export const getJobs = async (req, res) => {
    try {
        const { search, status, sort, page = 1, limit = 10 } = req.query;
        let query = { userId: req.user.id };

        // Search by company or role
        if (search) {
            query.$or = [
                { company: { $regex: search, $options: 'i' } },
                { position: { $regex: search, $options: 'i' } }
            ];
        }

        // Filter by status
        if (status && status !== 'All') {
            query.status = status;
        }

        let jobsQuery = Job.find(query);

        // Sort applications based on date or company
        if (sort) {
            if (sort === 'Date') {
                jobsQuery = jobsQuery.sort({ dateApplied: -1 });
            } else if (sort === 'Company') {
                jobsQuery = jobsQuery.sort({ company: 1 });
            }
        } else {
            jobsQuery = jobsQuery.sort({ createdAt: -1 }); // Default sort
        }

        // Pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        jobsQuery = jobsQuery.skip(skip).limit(parseInt(limit));

        const jobs = await jobsQuery;
        const total = await Job.countDocuments(query);

        res.json({ 
            jobs, 
            totalPages: Math.ceil(total / parseInt(limit)),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a job
// @route   POST /api/jobs
export const setJob = async (req, res) => {
    const { company, position, location, salary, status, notes, dateApplied } = req.body;
    try {
        const job = await Job.create({
            company,
            position,
            location,
            salary,
            status: status || 'Applied',
            notes,
            dateApplied: dateApplied || new Date(),
            userId: req.user.id
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a job
// @route   PUT /api/jobs/:id
export const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        // Ensure user owns the job
        if (job.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a job
// @route   DELETE /api/jobs/:id
export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        // Ensure user owns the job
        if (job.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }
        
        await job.deleteOne();
        res.json({ id: req.params.id, message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
