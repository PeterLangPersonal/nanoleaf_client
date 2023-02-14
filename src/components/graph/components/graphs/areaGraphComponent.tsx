import dayjs from "dayjs";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid
} from "recharts";

import { DataFormat } from "../../graph";

type AreaGraphComponentProps = {
    data: DataFormat[];
    graphColour: string;
};

const dateFormatter = (date: string) => {
    return dayjs(date).format('DD/MM/YY');
  };

export const AreaGraphComponent = ({ data, graphColour }: AreaGraphComponentProps) => {
    return (
        <ResponsiveContainer width="80%" height={500}>
            <AreaChart
                width={900}
                height={250}
                data={data}
                margin={{
                    left:8,
                    right: 8
                }}
            >
                <XAxis
                    dataKey="date"
                    tickFormatter={dateFormatter}
                />
                <YAxis />
                <Area
                    dataKey="val"
                    type="monotone"
                    stroke="#ffffff"
                    fill={graphColour}
                />
                <Tooltip />
                <CartesianGrid strokeDasharray="4 4" />
            </AreaChart>
        </ResponsiveContainer>);
};