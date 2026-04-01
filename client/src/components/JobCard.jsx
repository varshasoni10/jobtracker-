import { Link } from 'react-router-dom';
import { FaBuilding, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

const JobCard = ({ job, onDelete }) => {
    const getStatusColor = (status) => {
        switch (status) {
            case 'Applied': return 'bg-blue-100 text-blue-800';
            case 'Interviewing': return 'bg-yellow-100 text-yellow-800';
            case 'Offer': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <Link to={`/jobs/${job._id}`} className="hover:text-indigo-600 transition-colors">
                        <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600">{job.position}</h3>
                    </Link>
                    <div className="flex items-center text-gray-600 mt-1">
                        <FaBuilding className="mr-2" />
                        <span className="font-medium">{job.company}</span>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(job.status)}`}>
                    {job.status}
                </span>
            </div>

            <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-gray-400" />
                    {job.location || 'Remote'}
                </div>
                <div className="flex items-center">
                    <FaMoneyBillWave className="mr-2 text-gray-400" />
                    {job.salary || 'N/A'}
                </div>
                <div className="flex items-center col-span-2">
                    <FaCalendarAlt className="mr-2 text-gray-400" />
                    Applied: {new Date(job.dateApplied).toLocaleDateString()}
                </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
                <Link
                    to={`/jobs/edit/${job._id}`}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors text-sm font-medium"
                >
                    Edit
                </Link>
                <button
                    onClick={() => onDelete(job._id)}
                    className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors text-sm font-medium"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default JobCard;
