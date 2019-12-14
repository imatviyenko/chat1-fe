import { useState, useEffect } from 'react';

export function useFetch(fetchFunc) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  
    
    async function effectFunc() {
        const data = await fetchFunc();
        setData(data);
        setLoading(false);
    }  
    
    useEffect( () => {
        effectFunc();
    }, []);

    return [data, loading];
}

