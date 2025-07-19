import React from 'react';
import PropTypes from 'prop-types';

const Leaderboard = ({ rankings }) => {
    const getRankColor = (index) => {
        switch (index) {
            case 0: return {
                bg: 'bg-yellow-100',
                text: 'text-yellow-800',
                border: 'border-yellow-300',
                rankText: 'text-yellow-600',
                rankSize: 'text-2xl'
            };
            case 1: return {
                bg: 'bg-gray-100',
                text: 'text-gray-800',
                border: 'border-gray-300',
                rankText: 'text-gray-600',
                rankSize: 'text-xl'
            };
            case 2: return {
                bg: 'bg-orange-100',
                text: 'text-orange-800',
                border: 'border-orange-300',
                rankText: 'text-orange-600',
                rankSize: 'text-xl'
            };
            default: return {
                bg: 'bg-white',
                text: 'text-gray-700',
                border: 'border-gray-200',
                rankText: 'text-gray-500',
                rankSize: 'text-base'
            };
        }
    };

    const getMedalIcon = (index) => {
        switch (index) {
            case 0: return '🥇';
            case 1: return '🥈';
            case 2: return '🥉';
            default: return null;
        }
    };

    return (
        <div className="bg-blue-50 p-6 rounded-lg shadow-sm mb-6 h-96  overflow-y-auto">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center ">
                Leaderboard
            </h2>
            
            {rankings.length > 0 ? (
                <ul className="space-y-3">
                    {rankings.map((user, index) => {
                        const colors = getRankColor(index);
                        const medal = getMedalIcon(index);
                        
                        return (
                            <li 
                                key={user._id}
                                className={`flex justify-between items-center p-4 rounded-lg
                                    ${colors.bg} ${colors.text} ${colors.border}
                                    border shadow-sm transition-transform hover:scale-[1.02]`}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className={`${colors.rankText} ${colors.rankSize} font-bold w-6 text-center`}>
                                        {medal || `${index + 1}.`}
                                    </span>
                                    <span className="font-medium">
                                        {user.name}
                                    </span>
                                </div>
                                <span className="font-semibold">
                                    {user.totalPoints.toLocaleString()} points
                                </span>
                            </li>
                        );
                    })}
                </ul> 
            ) : (
                <div className="text-center py-6">
                    <p className="text-gray-500 mb-2">
                        No rankings available yet.
                    </p>
                    <p className="text-sm text-gray-400">
                        Claim points to see the leaderboard update!
                    </p>
                </div>
            )}
        </div>
    );
};

Leaderboard.propTypes = {
    rankings: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            totalPoints: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default Leaderboard;