const initState = {
    cart: []
}

const rootReducer = (state=initState, action) => {
    if (action.type === 'add_cart'){
        let newArray=state.cart;
        for (let i = 0; i < action.count; i++) {
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
        }
        // }
        return {
            ...state,
            cart: newArray
        }
    }
    if (action.type === 'remove_cart'){
        let removal;
        for (let i = 0; i < state.cart.length; i++) {
            if (state.cart[i]._id === action.cart._id) {
                removal = i;
                break;
            }
        }
        let newArray = [];
        for (let i = 0; i < state.cart.length; i++) {
            if(i !== removal) {
                newArray.push(state.cart[i]);
            }
        }
        // }
        return {
            ...state,
            cart: newArray
        }
    }
    return state;   
}

export default rootReducer;