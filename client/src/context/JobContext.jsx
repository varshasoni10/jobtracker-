import { createContext, useState, useContext, useCallback } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });

    const fetchJobs = useCallback(async (params = {}) => {
        if (!user) return;
        setLoading(true);
        try {
            const { data } = await api.get('/jobs', { params });
            setJobs(data.jobs);
            setPagination({ currentPage: data.currentPage, totalPages: data.totalPages });
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    }, [user]);

    const addJob = async (jobData) => {
        try {
            const { data } = await api.post('/jobs', jobData);
            setJobs([data, ...jobs]);
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || err.message };
        }
    };

    const updateJob = async (id, jobData) => {
        try {
            const { data } = await api.put(`/jobs/${id}`, jobData);
            setJobs(jobs.map(j => (j._id === id ? data : j)));
            return { success: true, data };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || err.message };
        }
    };

    const deleteJob = async (id) => {
        try {
            await api.delete(`/jobs/${id}`);
            setJobs(jobs.filter(j => j._id !== id));
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.message || err.message };
        }
    };

    return (
        <JobContext.Provider value={{ jobs, loading, error, pagination, fetchJobs, addJob, updateJob, deleteJob }}>
            {children}
        </JobContext.Provider>
    );
};
