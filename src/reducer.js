export const initialState = {
    user: null,
    balance: parseFloat(localStorage.getItem('balance')) || 100,
    tablerows: [ 
    ],
};

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_BALANCE: "SET_BALANCE",
    ADD_ROW: 'ADD_ROW',
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {...state,user: action.user,};
        case actionTypes.SET_BALANCE:
            return {...state, balance: action.balance};
        case actionTypes.ADD_ROW:
            return {...state, tablerows: action.tablerows};
        default:
            return state;
    }
};

export default reducer;