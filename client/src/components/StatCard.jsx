const StatCard = ({ title, value, icon, bgColor }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center">
            <div className={`p-4 rounded-full mr-4 ${bgColor} text-white`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
                <p className="text-3xl font-bold text-gray-800">{value}</p>
            </div>
        </div>
    );
};

export default StatCard;
