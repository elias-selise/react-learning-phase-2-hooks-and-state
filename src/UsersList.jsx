import useFetch from './useFetch';

const UsersList = () => {
    // Using jsonplaceholder for a simple, free users list API
    const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

    return (
        <div style={{ marginTop: '2rem', padding: '1rem', borderTop: '2px solid #ccc' }}>
            <h2>Users List (API Integration Task)</h2>
            {loading && <p>Loading users...</p>}
            {error && <div className="error">{error}</div>}
            
            {!loading && !error && users && (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {users.map(user => (
                        <li key={user.id} style={{ padding: '0.5rem', borderBottom: '1px solid #eee' }}>
                            <strong>{user.name}</strong> - {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UsersList;
