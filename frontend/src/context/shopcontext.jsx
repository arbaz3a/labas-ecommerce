import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";
export const shopcontext = createContext();

const ShopContextProvider = (props)=>{
    const currency = 'Rs ';
    const delivery_fee = '199';
    const value = {products, currency, delivery_fee}

    return(
        <shopcontext.Provider value={value}>
            {props.children}
        </shopcontext.Provider>
    )
}

export default ShopContextProvider;