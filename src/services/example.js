import request from '../utils/request';


export function login(userinfo) {
    
  return request(`/api/Account/Login`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function GetUserMenus(userinfo) {
    
  return request(`/api/services/app/menu/GetUserMenus`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function ChangePassword(userinfo) {
    
  return request(`/api/services/app/profile/ChangePassword`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function UpdateCurrentUser(userinfo) {
    
  return request(`/api/services/app/user/UpdateCurrentUser`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function GetCurrentLoginInformations(userinfo) {
    
  return request(`/api/services/app/session/GetCurrentLoginInformations`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function GetRecentUserLoginAttempts(userinfo) {
    
  return request(`/api/services/app/userLogin/GetRecentUserLoginAttempts`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function GetUsers(userinfo) {
    
  return request(`/api/services/app/user/GetUsers`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function GetUsersToExcel(userinfo) {
	return request(`api/services/app/user/GetUsersToExcel`, {
		method: 'post',
		body: JSON.stringify(userinfo)
	});
}
export function CreateOrUpdateUser(userinfo) {

return request(`api/services/app/user/CreateOrUpdateUser`, {
		method: 'post',
		body: JSON.stringify(userinfo)
	});
}

export function GetRoles(userinfo) {
    
  return request(`/api/services/app/user/GetRoles`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function GetOrganizationUnits(userinfo) {
    
  return request(`api/services/app/organizationUnit/GetOrganizationUnits`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}