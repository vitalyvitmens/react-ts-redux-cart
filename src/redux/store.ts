import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { productsReducer } from './productsReducer'
import { logActionMiddleware } from './logActionMiddleware'

const rootReducer = combineReducers({
  products: productsReducer,
})

export const store = createStore(
  rootReducer,
  applyMiddleware(logActionMiddleware)
)

export type RootState = ReturnType<typeof rootReducer>
