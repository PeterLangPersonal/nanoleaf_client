import { Context, useContext } from 'react';

export const useAppContext = (AppContext: Context<any | undefined>) => {
    const contextValues = useContext(AppContext) as {[key: string]: any} | undefined;
    if (contextValues === undefined) throw new Error ("Expected context values to be set");
    return contextValues;
};
