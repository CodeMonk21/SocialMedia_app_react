//Already regiser users
export const getRegisterUsers = () => JSON.parse(localStorage.getItem("RegisterUsers"))
export const setRegisterUsers = (users) => localStorage.setItem("RegisterUsers",JSON.stringify(users))

//logged user
export const getLoggedUser = () => JSON.parse(localStorage.getItem("LoggedUser")) || false
export const setLoggedUser = (user) => localStorage.setItem("LoggedUser",JSON.stringify(user))

//Remove logged user
export const removeLoggedUser = () => localStorage.removeItem("LoggedUser")
