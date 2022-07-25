export const add_cart=(cart, count)=>{
    return{
        type:"add_cart",
        cart:cart,
        count:count
    }
}
export const remove_cart=(cart)=>{
    return{
        type:"remove_cart",
        cart:cart
    }
}