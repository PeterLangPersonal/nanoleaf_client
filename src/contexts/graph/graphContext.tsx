import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { getMarketingData, getProduct, getSalesOrder } from '../../api';
import { graphTypes } from '../../types';

interface IProviderProps {
    children?: any;
}

type GraphContextValues = {
    graphType: graphTypes;
    setGraphType: Dispatch<SetStateAction<graphTypes>>;
    marketingData: Record<string, any>[];
    salesOrder: Record<string, any>[];
    product: Record<string, any>[];
};

export const GraphContext = createContext<GraphContextValues | undefined>(undefined);

export const GraphProvider = (props: IProviderProps) => {
    const [graphType, setGraphType] = useState<graphTypes>(graphTypes.SALES_REVENUE);
    const [marketingData, setMarketingData] = useState<Record<string, any>[]>([]);
    const [salesOrder, setSalesOrder] = useState<Record<string, any>[]>([]);
    const [product, setProduct] = useState<Record<string, any>[]>([]);


    const fetchMarketingData = async () => {
        try {
            const response = await getMarketingData();
            setMarketingData(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await getProduct();
            setProduct(response.data);
        } catch(e) {
            console.log(e);
        }
    }
    const fetchSalesOrder = async () => {
        try {
            const response = await getSalesOrder();
            setSalesOrder(response.data);
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchMarketingData();
        fetchProduct();
        fetchSalesOrder();
    }, [])

    return (
        <GraphContext.Provider value={{
            graphType,
            setGraphType,
            marketingData,
            salesOrder,
            product
        }}>
            {props.children}
        </GraphContext.Provider>
    )
}
