import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const UserList = ({ users, setUsers, selectedUser, onSelectUser }) => {
    const [newUserName, setNewUserName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAddUser = async () => {
        if (!newUserName.trim()) {
            setError('Please enter a valid user name');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/api/users', { name: newUserName });

            const newUser = response.data;
            setUsers(prev => [...prev, newUser]); //  add to local state
            setNewUserName('');
            setError('');
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddUser();
        }
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Select User
            </h2>

            <div className="flex justify-center mb-6">
                <select
                    value={selectedUser?._id || ''}
                    onChange={(e) => onSelectUser(e.target.value)}
                    className="block w-full md:w-2/3 lg:w-1/2 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base"
                >
                    <option value="" disabled>Select a user</option>
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="add-user bg-white p-6 rounded-lg shadow-inner">
                <h3 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                    Add New User
                </h3>

                <div className="flex flex-col sm:flex-row gap-3">
                    <input
                        type="text"
                        placeholder="Enter new user name"
                        value={newUserName}
                        onChange={(e) => {
                            setNewUserName(e.target.value);
                            setError('');
                        }}
                        onKeyPress={handleKeyPress}
                        className={`flex-grow p-3 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-base`}
                    />
                    <button
                        onClick={handleAddUser}
                        disabled={loading}
                        className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                        {loading ? 'Adding...' : 'Add User'}
                    </button>
                </div>

                {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                )}
            </div>
        </div>
    );
};

UserList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
    setUsers: PropTypes.func.isRequired,
    selectedUser: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
    }),
    onSelectUser: PropTypes.func.isRequired,
};

UserList.defaultProps = {
    selectedUser: null,
};

export default UserList;
