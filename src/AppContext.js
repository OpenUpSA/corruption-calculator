import { createContext, use, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [cases, setCases] = useState([]);
    const [items, setItems] = useState([]);

    const location = useLocation();

    const fetchNocoDB = async (endpoint) => {
        try {
            const res = await fetch(
                process.env.NOCO + endpoint,
                {
                    headers: {
                        "accept": "application/json",
                        "xc-token": process.env.API_KEY,
                    }
                }
            );
            const json = await res.json();

            if (endpoint === 'Case') {
                setCases(json.list);
            } else if (endpoint === 'Item') {
                setItems(json.list);
            }


        } catch (err) {
            console.error("NocoDB fetch error:", err);
        }
    };


	useEffect(() => {

		fetchNocoDB('Case');
        fetchNocoDB('Item');

		
	}, []);

    useEffect(() => {
        console.log(cases);
    }, [cases]);


    return (
        <AppContext.Provider value={
            { 
                location,
                cases,
                items
            }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
