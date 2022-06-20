/* React */
import React from "react";

interface Props {
    children: React.ReactNode;
}

interface SessionContextValue {
    products: string;
    setProducts: (param: string) => void;
}

const listInitial: SessionContextValue = {
    products: '',
    setProducts:  data => {},
};

const ProductsContext = React.createContext<SessionContextValue>(listInitial);

export function ProductsProvider({ children }: Props) {
    const [ products, setProducts ]  = React.useState<string>(listInitial.products);

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
        {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = React.useContext(ProductsContext);
    const  { products, setProducts } = context;
    return { products, setProducts };
}