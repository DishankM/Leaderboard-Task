import React, { useState } from 'react';
import UserList from './components/UserList';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';
import ClaimHistory from './components/ClaimHistory';
import useLeaderboardData from './hook/useLeaderboardData';

function App() {
    const {
        users,
        selectedUser,
        rankings,
        claimedPoints,
        claimHistory,
        error,
        isLoading,
        handleSelectUser,
        handleAddUser,
        handleClaimPoints,
    } = useLeaderboardData();

    const [currentView] = useState('main'); 

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md md:max-w-xl lg:max-w-4xl">
                <header className="mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 text-center">
                        Leaderboard Challenge
                    </h1>
                    <p className="text-gray-500 text-center mt-2">
                        Track and compete with your friends!
                    </p>
                </header>

                {error && (
                    <div className="bg-red-100 border-red-500 text-red-700 p-4 mb-6 rounded">
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {currentView === 'main' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <UserList 
                                    users={users}
                                    selectedUser={selectedUser}
                                    onSelectUser={handleSelectUser}
                                    onAddUser={handleAddUser}
                                />
                                
                                <ClaimButton 
                                    onClaim={handleClaimPoints}
                                    selectedUser={selectedUser}
                                    claimedPoints={claimedPoints}
                                    isLoading={isLoading}
                                />
                            </div>

                            <div className="lg:col-span-1">
                                <Leaderboard rankings={rankings} />
                            </div>
                        </div>

                        {selectedUser && (
                            <div className="mt-6">
                                <ClaimHistory history={claimHistory} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;