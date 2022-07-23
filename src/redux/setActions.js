export const add_cart=(cart, count)=>{
    return{
        type:"add_cart",
        cart:cart,
        count:count
    }
}