const initState = {
    cart: [],
    count: []
}

const rootReducer = (state=initState, action) => {
    if (action.type === 'add_cart'){
        let newArray=state.cart;
        let newArray2=state.count;
        // for (let i = 0; i < action.count; i++) {
        newArray.push({
            _id: action.cart._id,
            name: action.cart.name,
            strength: action.cart.strength,
            dexterity: action.cart.dexterity,
            constitution: action.cart.constitution,
            intelligence: action.cart.intelligence,
            wisdom: action.cart.wisdom,
            charisma: action.cart.charisma,
            initiative: action.cart.initiative,
            max_hp: action.cart.max_hp,
            armor_class: action.cart.armor_class,
            passive_perception: action.cart.passive_perception,
            combatantType: action.cart.combatantType,
            __v: action.cart.__v,
        });
        newArray2.push({
            id: action.cart._id,
            count: action.count,
        });
        // }
        return {
            ...state,
            cart: newArray,
            count: newArray2
        }
    }
    return state;   
}

export default rootReducer;