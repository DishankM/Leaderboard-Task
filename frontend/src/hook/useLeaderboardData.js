
import {useState,useEffect,useCallback} from 'react';
import {
    getUsers,
    addUser,
    claimPoints,
    getRankings,
    getClaimHistory
} from '../api/userApi';

/**
 * Custom React Hook for managing leaderboard data and interactions.
 * Encapsulates state, data fetching, and event handlers related to users,
 * rankings, and claim history.
 */
const useLeaderboardData = () => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [rankings, setRankings] = useState([]);
    const [claimedPoints, setClaimedPoints] = useState(null);
    const [claimHistory, setClaimHistory] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [claimStatus, setClaimStatus] = useState(null);


    //  Data Fetching Callbacks 

    const fetchUsers = useCallback(async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
            // If no user is selected, default to the first user in the list
            if (response.data.length > 0 && !selectedUserId) {
                setSelectedUserId(response.data[0]._id);
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to load users.');
        }
    }, [selectedUserId]); // Dependency on selectedUserId to avoid re-selecting if already set

    const fetchRankings = useCallback(async () => {
        try {
            const response = await getRankings();
            setRankings(response.data);
        } catch (err) {
            console.error('Error fetching rankings:', err);
            setError('Failed to load rankings.');
        }
    }, []); // No dependencies, as rankings are global

    const fetchClaimHistory = useCallback(async () => {
        if (selectedUserId) { // Only fetch if a user is selected
            try {
                const response = await getClaimHistory(selectedUserId);
                setClaimHistory(response.data);
            } catch (err) {
                console.error('Error fetching claim history:', err);
                setError('Failed to load claim history.');
            }
        } else {
            setClaimHistory([]); // Clear history if no user is selected
        }
    }, [selectedUserId]); // Dependency on selectedUserId to fetch history for the current user

    // Effects for Initial Data Load and Updates 

    useEffect(() => {
        // Fetch users and rankings on component mount
        fetchUsers();
        fetchRankings();
    }, [fetchUsers, fetchRankings]); // Re-run if fetch functions themselves change

    useEffect(() => {
        // Fetch claim history whenever the selected user changes
        fetchClaimHistory();
    }, [selectedUserId, fetchClaimHistory]); // Re-run if selectedUserId or fetchClaimHistory changes

    // --- Event Handlers 

    const handleSelectUser = (userId) => {
        setSelectedUserId(userId);
        setClaimedPoints(null); // Reset claimed points display
        setError(null); // Clear any previous errors
    };

    const handleAddUser = async (name) => {
        try {
            await addUser(name); // Call API to add user
            await fetchUsers(); // Re-fetch users to update the list
            setError(null); // Clear any previous errors
        } catch (err) {
            console.error('Error adding user:', err);
            setError(err.response ? err.response.data.message : 'Failed to add user.');
        }
    };

    const handleClaimPoints = async () => {
    if (!selectedUserId) {
        setError('Please select a user first.');
        return;
    }

    setIsLoading(true);
    try {
        const response = await claimPoints(selectedUserId);
        setClaimedPoints(response.data.claimedPoints);
        setClaimStatus('success');
        await fetchUsers();
        await fetchRankings();
        await fetchClaimHistory();
        setError(null);
    } catch (err) {
        console.error('Error claiming points:', err);
        setError(err.response?.data?.message || 'Failed to claim points.');
        setClaimedPoints(null);
        setClaimStatus('error');
    } finally {
        setIsLoading(false);
    }
};


    // --- Derived State ---
    // Find the currently selected user object for display purposes
    const selectedUser = users.find(user => user._id === selectedUserId);

    // Return all necessary states, handlers, and derived values
    return {
        users,
        selectedUser,
        rankings,
        claimedPoints,
        claimHistory,
        error,
        handleSelectUser,
        handleAddUser,
        handleClaimPoints,
    };
};

export default useLeaderboardData;
