import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import cartItems from './Reducers/cartitem'
const reducers = combineReducers({

    cartItems: cartItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(ThunkMiddleware))
)

export default store;