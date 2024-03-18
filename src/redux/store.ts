import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { logActionMiddleware } from './logActionMiddleware'
import { orderReducer } from './orderReducer'
import { productsReducer } from './productsReducer'
import thunkMiddleware from 'redux-thunk'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { composeWithDevTools } from '@redux-devtools/extension'

const rootReducer = persistReducer(
  { key: 'redux', storage: storage },
  // { key: 'redux', storage: storage, throttle: 100000 },
  combineReducers({
    products: productsReducer,
    order: orderReducer,
  })
)

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware, logActionMiddleware))
)

export const persistor = persistStore(store)

// @ts-ignore
window.persistor = persistor
// window.persistor.purge() - метод purge() очищает store в нашем случае LocalStorage
// window.persistor.pause() - метод pause() останавливает store в нашем случае LocalStorage
// window.persistor.persist() - метод persist() возобновляет store в нашем случае LocalStorage
// window.persistor.flush() - метод flush() позволяет сохранить и не потерять данные в случае выполнения throttle: 100000. Он полезен когда есть какой-нибудь throttle и пользвоатель выходит из приложения закрывая страницу и мы хотим сохранить эти данные для того что бы их не потерять

export type RootState = ReturnType<typeof rootReducer>
