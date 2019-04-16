import login from './login'
import menu from './menu'
import usertable from './usertable';
import roleMangement from './roleMangement';
import organization from './organization';
export function users(app){
    app.model(login)
    app.model(menu)
    app.model(usertable)
    app.model(roleMangement)
    app.model(organization)
}