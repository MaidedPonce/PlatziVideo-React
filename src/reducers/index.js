// recibe dos parámetros
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FAVORITE':
      return {
        ...state,
        myList: [...state.myList, action.payload]
      }
    case 'DELETE_FAVORITE':
      return {
        ...state,
        // comparar que items.id tenga esa desigualdad para saber si tenemos el item que estamos buscando y en caso que no lo tenga, regresamos un arreglo nuevo con elemento que está cumpliendo esta condición
        myList: state.myList.filter(items => items.id !== action.payload)
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        // a user le voy a transmitir el objeto que estoy creando en action
        user: action.payload
      }
    case 'LOGOUT_REQUEST':
      return {
        ...state,
        user: action.payload
      }
    case 'REGISTER_REQUEST':
      return {
        ...state,
        user: action.payload
      }
    case 'GET_VIDEO_SOURCE':
      return {
        ...state,
        playing: state.trends.find(item => item.id === Number(action.payload)) ||
      state.original.find(item => item.id === Number(action.payload)) ||
      []
      }
    default:
      return state
  }
}
export default reducer
