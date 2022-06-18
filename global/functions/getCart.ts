

const getCart = (session:any) => {
    const data = session.CART;
    return (data !== undefined) 
             ? JSON.parse(session.CART)
             : [];
}

export default getCart;