/* React */
import React from "react";

//Cookies
import { setCookie } from "nookies";
interface Props {
    children: React.ReactNode;
}

type Product = {
    id: string;
    product_name:string;
    img_url:string;
    price:number;
    user_id?:string;
    forSale:boolean;
}
interface CartContextValue {
    cartProducts: Product[];
    cartTotal: number;
    setCartTotal: (param: number) => void;
    setCartProducts: (param: Product[]) => void;
    getCartCookie: (param: Product[]) => void;
    addCart: (param: Product) => void;
    deleteCart: (param: string) => void;
    getProductInCart: (param: string) => boolean;
    getTotalValue: (param:string, balance:number) => string;
}

const listInitial: CartContextValue = {
    cartProducts: [{
        id: "",
        product_name: "",
        img_url: "",
        price: 0,
        forSale:false,
    }],
    cartTotal: 0,
    setCartTotal:  data => {},
    setCartProducts: data => {},
    getCartCookie: data => {},
    addCart: data => {},
    deleteCart: data => {},
    getProductInCart: data => false,
    getTotalValue: data => '0',
};

const CartContext = React.createContext<CartContextValue>(listInitial);

export function CartProvider({ children }: Props) {
    const [ cartProducts, setCartProducts ] = React.useState<Product[]>([]);
    const [ cartTotal, setCartTotal ]  = React.useState<number>(0);

    const getCartCookie = (products: Product[]) => {
        setCartProducts(products);
    }

    const getTotalValue = (param:string, balance:number) => {
        const initialValue = 0;
        const normalValue = cartProducts.reduce(
            (acumulador , valorAtual) => acumulador + valorAtual.price, 
            initialValue
        );
        
        return param === 'normal' 
                ? String(normalValue) 
                : String(normalValue/balance).substr(0, 7);
    }

    const getProductInCart = (id:string) => {
        const index = cartProducts.findIndex(elemento => elemento.id === id);
        return (index === -1) ? false : true;
    }

    const addCart = (products: Product) => {
        cartProducts.push(products);
        setCartProducts([...cartProducts]);
        setCookies();
    }

    const deleteCart = (id: string) => {
        const index = cartProducts.findIndex(elemento => elemento.id === id);
        cartProducts.splice(index, 1);
        setCartProducts([...cartProducts]);
        setCookies();
    }  

    const setCookies = () => {
          setCookie(
            null,
            "CART",
            JSON.stringify([ { cart: cartProducts }, ]),
            { maxAge: 86400 * 7, path: "/" }
          );
    }

    return (
        <CartContext.Provider value={{ 
            cartTotal, setCartTotal,
            cartProducts, setCartProducts, 
            getCartCookie, addCart, deleteCart,
            getProductInCart, getTotalValue,
        }}>
        {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = React.useContext(CartContext);
    const  { 
        cartTotal, setCartTotal,
        cartProducts, setCartProducts,
        getCartCookie, addCart, deleteCart,
        getProductInCart, getTotalValue,
    } = context;
    return {
        cartTotal, setCartTotal,
        cartProducts, setCartProducts, 
        getCartCookie, addCart, deleteCart,
        getProductInCart, getTotalValue,
    };
}