export const setFavorite = payload => ({
  type: 'SET_FAVORITE',
  payload
})
// funcion que describe lo que vamos hacer: exportar nuestra constante llamada setFavorite porque ahí vamos aguardar nuestros favoritos

export const deleteFavorite = payload => (
  {
    type: 'DELETE_FAVORITE',
    payload
  }
)

export const loginRequest = payload => ({
  type: 'LOGIN_REQUEST',
  payload
})

export const logoutRequest = payload => (
  {
    type: 'LOGOUT_REQUEST',
    payload
  }
)

export const registerRequest = payload => (
  {
    type: 'REGISTER_REQUEST',
    payload
  }
)
export const getVideoSource = payload => (
  {
    type: 'GET_VIDEO_SOURCE',
    payload
  }
)
