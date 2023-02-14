export type MarketingData = {
    prClippings: number;
    dateCreated: string;
    webVisitors: number;
};

export type Product = {
    barcode: string;
    parentSku: string;
    regionCode: number;
    itemType: string;
    supplier: string;
    brand: string;
    packData: {
        packType: string;
        components: string[];
        Metric: {[key: string]: number}[]; // Typed as generic for futureproofing
        Imperial: {[key: string]: number}[];
    };
    priceData: {
        Buy: {[key: string]: number}[];
        Sell: {[key: string]: number}[];
    };
    variantName: string;
    shortDesc: string;
    stockLink: string;
    lastUpdated: string;
};

export type SalesOrder = {
    dateCreated: string;
    salesChannel: string;
    isoCurrency: string;
    subtotal: number;
    discountAmt: number;
    shipping: number;
    taxes: {[key: string]: number}[];
    taxType: string;
    total: number;
    lineItems: {[key: string]: number};
    fulfillments: (string | number)[][];
    payments: (string | number)[]; 
};
