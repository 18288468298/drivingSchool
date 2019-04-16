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

export function GetUserPermissionsForEdit(userinfo) {
    
  return request(`api/services/app/user/GetUserPermissionsForEdit`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function UpdateUserPermissions(userinfo) {
    
  return request(`api/services/app/user/UpdateUserPermissions`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function ResetUserSpecificPermissions(userinfo) {
    
  return request(`api/services/app/user/ResetUserSpecificPermissions`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function ResetUserPassword(userinfo) {
    
  return request(`api/services/app/profile/ResetUserPassword`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function ChangeUserPassword(userinfo) {
    
  return request(`api/services/app/profile/ChangeUserPassword`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function ToggleActiveStatus(userinfo) {
    
  return request(`api/services/app/user/ToggleActiveStatus`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function DeleteUser(userinfo) {
    
  return request(`api/services/app/user/DeleteUser`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function BatchDeleteUser(userinfo) {
    
  return request(`api/services/app/user/BatchDeleteUser`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function BatchActiveUser(userinfo) {
    
  return request(`api/services/app/user/BatchActiveUser`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function BatchUnlockUser(userinfo) {
    
  return request(`api/services/app/user/BatchUnlockUser`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function GetAllPermissionTree(userinfo) {
    
  return request(`api/services/app/permission/GetAllPermissionTree`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function RoleGetRoles(userinfo) {
    
  return request(`api/services/app/role/GetRoles`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function CreateOrUpdateRole(userinfo) {
    
  return request(`api/services/app/role/CreateOrUpdateRole`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}
export function GetRoleForEdit(userinfo) {
    
  return request(`api/services/app/role/GetRoleForEdit`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function DeleteRole(userinfo) {
    
  return request(`api/services/app/role/DeleteRole`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function OrganizationGetOrganizationUnits(userinfo) {
    
  return request(`api/services/app/organizationUnit/GetOrganizationUnits`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function GetOrganizationUnitUsers(userinfo) {
    
  return request(`api/services/app/organizationUnit/GetOrganizationUnitUsers`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function CreateOrganizationUnit(userinfo) {
    
  return request(`api/services/app/organizationUnit/CreateOrganizationUnit`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}


export function UpdateOrganizationUnit(userinfo) {
    
  return request(`api/services/app/organizationUnit/UpdateOrganizationUnit`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function DeleteOrganizationUnit(userinfo) {
    
  return request(`api/services/app/organizationUnit/DeleteOrganizationUnit`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function GetOrganizationUnitJoinableUserList(userinfo) {
    
  return request(`api/services/app/organizationUnit/GetOrganizationUnitJoinableUserList`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}

export function AddUserToOrganizationUnit(userinfo) {
    
  return request(`api/services/app/organizationUnit/AddUserToOrganizationUnit`,{
      method: 'post',
      body: JSON.stringify(userinfo)
    })
  
}