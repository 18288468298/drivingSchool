import login from './login'
import menu from './menu'
import usertable from './usertable';
import roleMangement from './roleMangement';
export function users(app){
    app.model(login)
    app.model(menu)
    app.model(usertable)
    app.model(roleMangement)
}