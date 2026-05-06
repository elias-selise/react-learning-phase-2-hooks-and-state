import { useState, useRef, useEffect } from "react";
import useFetch from "./useFetch";
import UsersList from "./UsersList";

const App = () => {
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');
    const [showUsers, setShowUsers] = useState(true);
    const searchInputRef = useRef(null);

    // Demonstrating useRef + useEffect for initial focus
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    const buildUrl = () => {
    const params = new URLSearchParams({
        x_cg_demo_api_key: import.meta.env.VITE_API_KEY,
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: `${limit}`,
        page: 1,
        sparkline: false
    });
    return `${import.meta.env.VITE_API_URL}?${params.toString()}`;
};

    const { data: coins, loading, error } = useFetch(buildUrl());

    const filteredCoin = coins.filter(c =>
                                c.name.toLowerCase().includes(filter.toLowerCase()) ||
                                c.symbol.toLowerCase().includes(filter.toLowerCase()));

    return ( <div>
        <h2> Crypto Dash</h2>
        <div className="view-toggler" style={{ marginBottom: "2rem", textAlign: "center" }}>
            <button className="toggle-btn" onClick={() => setShowUsers(!showUsers)}>
                {showUsers ? "Show Crypto List" : "Show Users List"}
            </button>
        </div>

        {!showUsers ? (
            <>
                {loading && <p>Loading...</p>}
                {error && <div className="error">{error}</div>}
                <div className="top-controls">
                    <div className="filter">
                        <input type="text" value={filter}
                        ref={searchInputRef}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Type to search..." />

                    </div>
                </div>
                <div className="controls">
                    <label htmlFor="limit">Coins per page : </label>
                    <select id="limit" value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
                {!loading && !error && (
                    <main className="grid">
                        {filteredCoin.map((coin)=> (
                            <div className="coin-card" key={coin.id}>
                                <div className="coin-header">
                                    <img src={coin.image} alt="{coin.name}" className="coin-image"/>
                                    <h2>{coin.name}</h2>
                                    <p className="symbol">{coin.symbol.toUpperCase()}</p>
                                </div>
                                <div className="coin-info">
                                    <p className="price">
                                        <strong>Price:</strong>
                                        ${coin.current_price.toLocaleString()}
                                    </p>
                                    <p className="coin-market-cap">
                                        <strong>Market Cap:</strong>
                                        ${coin.market_cap.toLocaleString()}
                                    </p>
                                    <p className={`coin-price-change ${coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'}`}>

</p>
                                </div>
                            </div>
                        ))}
                    </main>
                )}
            </>
        ) : (
            <UsersList />
        )}
    </div> );
}

export default App;
