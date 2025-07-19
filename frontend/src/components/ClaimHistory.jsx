import React from 'react';
import PropTypes from 'prop-types';

const ClaimHistory = ({ history }) => {
    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleString(undefined, options);
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">
                Claim History
            </h2>
            
            {history.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                    {history.map((item) => (
                        <div 
                            key={item._id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-2 sm:mb-0">
                                <span className="bg-purple-100 text-purple-800 font-bold rounded-full w-8 h-8 flex items-center justify-center mr-3">
                                    +
                                </span>
                                <div>
                                    <p className="font-medium text-gray-800">
                                        {item.claimedPoints} points
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Claimed by: <span className="font-semibold">{item.userId?.name}</span>
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500 sm:text-right">
                                {formatDate(item.claimedAt)}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-6">
                    <p className="text-gray-500 mb-2 ">
                        No claim history yet
                    </p>
                    <p className="text-sm text-gray-400">
                        Claim points to see history appear here
                    </p>
                </div>
            )}
        </div>
    );
};

ClaimHistory.propTypes = {
    history: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            claimedPoints: PropTypes.number.isRequired,
            claimedAt: PropTypes.string.isRequired,
            userId: PropTypes.shape({
                name: PropTypes.string.isRequired,
            }),
        })
    ).isRequired,
};

export default ClaimHistory;
