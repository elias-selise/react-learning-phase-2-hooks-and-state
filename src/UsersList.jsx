import useFetch from './useFetch';

const UsersList = () => {
    // Using jsonplaceholder for a simple, free users list API
    const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

    return (
        <div className="table-container">
            <h2>Users Data Table</h2>
            {loading && <p>Loading users...</p>}
            {error && <div className="error">{error}</div>}
            
            {!loading && !error && users && (
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Website</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.website}</td>
                                <td>{user.company.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UsersList;
