/* React */
import React from "react";

interface Props {
    children: React.ReactNode;
}

interface CartContextValue {
    cartTotal: number;
    setCart: (param: number) => void;
}

const listInitial: CartContextValue = {
    cartTotal: 0,
    setCart:  data => {},
};

const CartContext = React.createContext<CartContextValue>(listInitial);

export function CartProvider({ children }: Props) {
    const [ cartTotal, setCart ]  = React.useState<number>(0);

    return (
        <CartContext.Provider value={{ cartTotal, setCart }}>
        {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = React.useContext(CartContext);
    const  { cartTotal, setCart } = context;
    return { cartTotal, setCart };
}