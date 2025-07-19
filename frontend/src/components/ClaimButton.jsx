import React from 'react';
import PropTypes from 'prop-types';

const ClaimButton = ({ onClaim, selectedUser, claimedPoints, isLoading }) => {
    const handleClick = () => {
        if (selectedUser && !isLoading) {
            onClaim();
        }
    };

    return (
        <div className="text-center my-8">
            <button
                onClick={handleClick}
                disabled={!selectedUser || isLoading}
                className={`
                    px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg 
                    transform transition-all duration-300 ease-in-out
                    ${selectedUser 
                        ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 hover:scale-105' 
                        : 'bg-gray-400 cursor-not-allowed'
                    }
                    ${isLoading ? 'opacity-75' : ''}
                    focus:outline-none focus:ring-4 focus:ring-offset-2
                `}
                aria-label={selectedUser ? `Claim points for ${selectedUser.name}` : 'Select a user to claim points'}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                    </span>
                ) : (
                    `Claim Random Points${selectedUser ? ` for ${selectedUser.name}` : ''}`
                )}
            </button>

            {claimedPoints !== null && (
                <div className="mt-4 animate-fade-in">
                    <p className="text-green-600 font-extrabold text-2xl transform transition-transform duration-300 hover:scale-110">
                        +{claimedPoints} points!
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                        Added to {selectedUser?.name}'s total
                    </p>
                </div>
            )}
        </div>
    );
};

ClaimButton.propTypes = {
    onClaim: PropTypes.func.isRequired,
    selectedUser: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
    }),
    claimedPoints: PropTypes.number,
    isLoading: PropTypes.bool,
};

ClaimButton.defaultProps = {
    selectedUser: null,
    claimedPoints: null,
    isLoading: false,
};

export default ClaimButton;