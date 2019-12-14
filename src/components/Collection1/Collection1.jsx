import React, {useContext} from 'react';

import './Collection1.css';

import ServicesContext from '../../context/ServicesContext';
import { useFetch } from "../../hooks";

function Collection1() {
    const services = useContext(ServicesContext); // get reference to services object via the React context
    const [data, loading] = useFetch(services.getCollection1Items);

    console.log('Collection1 -> loading: ', loading);
    console.log('Collection1 -> data: ', JSON.stringify(data));

    const loadingElement = <span>Loading data...</span>;

    return (
        <div className="chat1-collection1">
            <h3>Component: Collection1</h3>
            { 
                loading ? 
                    loadingElement
                    :
                    (
                        <ul>
                            {data.map(({ index, title }) => (
                                <li key={index}>
                                    <span>{title}</span>
                                </li>
                            ))}
                        </ul>
                    )
            }
        </div>
    );
}

export default Collection1;
