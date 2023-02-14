import Sketch from "react-color/lib/components/sketch/Sketch";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";

import './graph.scss';
import { GraphContext } from "../../contexts/graph";
import { graphTypes, MarketingData, SalesOrder } from "../../types";
import { useAppContext } from "../../utils";
import { AreaGraphComponent } from "./components";

export type DataFormat = {
    date: string;
    val: number;
};

export const Graph = () => {
    const { marketingData, salesOrder, graphType } = useAppContext(GraphContext);
    
    const [ graphColour, setGraphColour ] = useState('#3cdfff');
    const [ renderData, setRenderData ] = useState<DataFormat[]>([]);

    useEffect(() => {
        let data:DataFormat[] = [];
        if (graphType === graphTypes.NUMBER_OF_VISITORS) {
            data = (marketingData as MarketingData[]).reduce((dailyVisits, currentData) => {
                const index = dailyVisits.findIndex(dailyVisits => currentData.dateCreated === dailyVisits.date);
                if (index > -1) {
                    dailyVisits[index].val += currentData.webVisitors
                } else {
                    dailyVisits.push({
                        date: currentData.dateCreated,
                        val: currentData.webVisitors,
                    });
                }
                return dailyVisits;
            }, [] as DataFormat[])
        }
        if (graphType === graphTypes.ITEMS_SOLD) {
            data = (salesOrder as SalesOrder[]).reduce((dailyOrders, currentOrder) => {
                const index = dailyOrders.findIndex(dailyOrder => currentOrder.dateCreated === dailyOrder.date);
                if (index > -1) {
                    dailyOrders[index].val += Object.values(currentOrder.lineItems).reduce((itemsSold, currentItemSold) => itemsSold + currentItemSold, 0)
                } else {
                    dailyOrders.push({
                        date: currentOrder.dateCreated,
                        val: Object.values(currentOrder.lineItems).reduce((itemsSold, currentItemSold) => itemsSold + currentItemSold, 0),
                    });
                }
                return dailyOrders;
            }, [] as DataFormat[])
        }
        if (graphType === graphTypes.NUMBER_OF_SHIPMENTS) {
            data = (salesOrder as SalesOrder[]).reduce((dailyOrders, currentOrder) => {
                const index = dailyOrders.findIndex(dailyOrder => currentOrder.dateCreated === dailyOrder.date);
                const currentVal = currentOrder.fulfillments.reduce((totalFulfillments, currentFulfillment) => totalFulfillments + (currentFulfillment[0] as number), 0)
                if (index > -1) {
                    dailyOrders[index].val += currentVal;
                } else {
                    dailyOrders.push({
                        date: currentOrder.dateCreated,
                        val: currentVal,
                    });
                }
                return dailyOrders;
            }, [] as DataFormat[])
        }
        if (graphType === graphTypes.ORDERS_PLACED) {
            data = (salesOrder as SalesOrder[]).reduce((dailyOrders, currentOrder) => {
                const index = dailyOrders.findIndex(dailyOrder => currentOrder.dateCreated === dailyOrder.date);
                if (index > -1) {
                    dailyOrders[index].val += 1
                } else {
                    dailyOrders.push({
                        date: currentOrder.dateCreated,
                        val: 1,
                    });
                }
                return dailyOrders;
            }, [] as DataFormat[])
        }
        if (graphType === graphTypes.SALES_REVENUE) {
            data = (salesOrder as SalesOrder[]).reduce((dailyOrders, currentOrder) => {
                const index = dailyOrders.findIndex(dailyOrder => currentOrder.dateCreated === dailyOrder.date);
                if (index > -1) {
                    dailyOrders[index].val += currentOrder.total
                } else {
                    dailyOrders.push({
                        date: currentOrder.dateCreated,
                        val: currentOrder.total,
                    });
                }
                return dailyOrders;
            }, [] as DataFormat[])
        }
        setRenderData(data);
    }, [graphType, marketingData, salesOrder])

    return <div className="graphContainer">
        <AreaGraphComponent data={renderData} graphColour={graphColour} />
        <div className="graphUI">
            <Sketch color={ graphColour } onChangeComplete={(colour: any) => setGraphColour(colour.hex)}/>
            <div className="graphUIDock">
                <CSVLink data={renderData} filename="data">⤓</CSVLink>
            </div>
        </div>
    </div>
};