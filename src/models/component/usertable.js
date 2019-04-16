import { BatchActiveUser,BatchDeleteUser,BatchUnlockUser,GetUsers, GetUsersToExcel, CreateOrUpdateUser, GetRoles, GetOrganizationUnits,DeleteUser 
	,ResetUserSpecificPermissions,ChangeUserPassword,ToggleActiveStatus,GetUserPermissionsForEdit,UpdateUserPermissions,ResetUserPassword} from '../../services/example';
import{notification,Modal}from 'antd'
export default {
	namespace: 'usertablemodels',

	state: {
		users: '',
		totalCount: '',
		size: '10',
		filter: '',
		fileName: '',
		fileToken: '',
		fileType: '',
		visible: false,
		visibleB: false,
	
		tree: '',
		checkedKeys: [],
		Ids: [],
		visibleA: false,
		record: '',
		names:[],
		lengths: [],
		jurisdictionTree:"",
		result:'',
		checkTree:"",
		visibleC: false,
		success:false,
		validColumns:['name','userName','id','roles[0].roleName','emailAddress',
		'phoneNumber','isEmailConfirmed','isPhoneNumberConfirmed',
	'isActive','isLocked','lastLoginTime','creationTime','operation','idCode'],
	},

	subscriptions: {
		setup({ dispatch, history }) {
			// eslint-disable-line
			return history.listen(({ pathname, state }) => {
				if (pathname.toLowerCase().indexOf('/menu/user') > -1) {
					dispatch({
						type: 'GetUsers',
						payload: {}
					});
					dispatch({
						type: 'GetRoles',
						payload: {}
					});
					dispatch({
						type: 'GetOrganizationUnits',
						payload: {}
					});
				}
			});
		}
	},

	effects: {
		*GetUsers({ payload }, { call, put }) {
			// eslint-disable-line
			const result = yield call(GetUsers, payload);

			yield put({
				type: 'setState',
				payload: {
					users: result.data.result.items,
					totalCount: result.data.result.totalCount
				}
			});
		},
		*GetUsersToExcel({ payload }, { call, put }) {
			const result = yield call(GetUsersToExcel, payload);
		
			if (result.data.success) {
				yield put({
					type: 'setState',
					payload: {
						fileName: result.data.result.fileName,
						fileToken: result.data.result.fileToken,
						fileType: result.data.result.fileType
					}
				});
			}
		},
		*CreateOrUpdateUser({ payload }, { call, put }) {
			const result = yield call(CreateOrUpdateUser, payload);
console.log(result)
			if (result.data.success) {
				
					notification.open({
					  message: '添加成功',
					//   description: '',
					  onClick: () => {
						console.log('Notification Clicked!');
					  },
					});
				  
			
			}else{
				notification.open({
					message: result.data.error.message,
				  //   description: '',
					onClick: () => {
					  console.log('Notification Clicked!');
					},
				  });
			}
		},
		*GetRoles({ payload }, { call, put,select }) {
			const result = yield call(GetRoles, payload);
			const lengths = yield select((state) => state.usertablemodels.lengths)
		
			const results = result.data.result.items;
			console.log(result,"角色")
			if (results) {
				for (var i = 0; i < results.length; i++) {
					if (results[i].isDefault) {
						lengths.push(results[i].name)
					
					}
				}
				yield put({
					type: 'setState',
					payload: {
						lengths
					}
				});
			}
			yield put({
				type: 'setState',
				payload: {
					result: result.data.result.items
				}
			});
		},
		*GetOrganizationUnits({ payload }, { call, put }) {
			const result = yield call(GetOrganizationUnits, payload);
		
			yield put({
				type: 'setState',
				payload: {
					tree: result.data.result.items
				}
			});
		},
		*GetUserPermissionsForEdit({ payload }, { call, put }) {
			const result = yield call(GetUserPermissionsForEdit, payload);
		console.log(result,123)
			
			yield put({
				type: 'setState',
				payload: {
				
					jurisdictionTree: result.data.result
			
				}
			});
			
		},
		*UpdateUserPermissions({ payload }, { call, put }) {
			const result = yield call(UpdateUserPermissions, payload);
		
			// yield put({
			// 	type: 'setState',
			// 	payload: {
			// 		tree: result.data.result.items
			// 	}
			// });
		},
		*ResetUserSpecificPermissions({ payload }, { call, put }) {
			const result = yield call(ResetUserSpecificPermissions, payload);
		
		result.data.success?notification.open({
			message: '恢复默认权限成功',
		  
			onClick: () => {
			  console.log('Notification Clicked!');
			},
		  }):null
		},
		*ResetUserPassword({ payload }, { call, put }) {
			const result = yield call(ResetUserPassword, payload);
			result.data.success?notification.open({
				message: '重置密码成功',
			  
				onClick: () => {
				  console.log('Notification Clicked!');
				},
			  }):null
			
		},
		
		*ChangeUserPassword({ payload }, { call, put }) {
			const result = yield call(ChangeUserPassword, payload);
			console.log(result)
			result.data.success?notification.open({
				message: '密码修改成功',
			  
				onClick: () => {
				  console.log('Notification Clicked!');
				},
			  }):notification.open({
				message:result.data.error.message,
			  
				onClick: () => {
				  console.log('Notification Clicked!');
				},
			  })
			
		},
		*ToggleActiveStatus({ payload }, { call, put,select }) {
			const result = yield call(ToggleActiveStatus, payload);
			const records = yield select((state) => state.usertablemodels.record)
			console.log(result)
			records.isActive?
			// yield put({
			// 	type:'setState',
			// 	payload:{
			// 		success:result.data.success
			// 	}
			// })
			Modal.success({
				title: '操作成功',
				content: '您已成功切换'+records.name+'的禁用状态',
			  })
			:Modal.success({
				title: '操作成功',
				content: '您已成功切换'+records.name+'的启用状态',
			  })
			
		},
		*DeleteUser({ payload }, { call, put,select }) {
			const result = yield call(DeleteUser, payload);
			const records = yield select((state) => state.usertablemodels.record)
			console.log(result)
			records.isActive?
			
			Modal.success({
				title: '操作成功',
				content: '您已成功删除'+records.name+'用户',
			  })
			:Modal.success({
				title: '操作成功',
				content: '您没有成功删除'+records.name+'用户',
			  })
			
		},
		// 批量删除
		*BatchDeleteUser({ payload }, { call, put }) {
			const result = yield call(BatchDeleteUser, payload);

			if (result.data.success) {
				
					notification.open({
					  message: '删除成功',
					//   description: '',
					  onClick: () => {
						console.log('Notification Clicked!');
					  },
					});
				  
			
			}else{
				notification.open({
					message: result.data.error.message,
				  //   description: '',
					onClick: () => {
					  console.log('Notification Clicked!');
					},
				  });
			}
		},
		// 批量启用
		*BatchActiveUser({ payload }, { call, put }) {
			const result = yield call(BatchActiveUser, payload);

			if (result.data.success) {
				
					notification.open({
					  message: '启动成功',
					//   description: '',
					  onClick: () => {
						console.log('Notification Clicked!');
					  },
					});
				  
			
			}else{
				notification.open({
					message: result.data.error.message,
				  //   description: '',
					onClick: () => {
					  console.log('Notification Clicked!');
					},
				  });
			}
		},
		// 批量解锁
		*BatchUnlockUser({ payload }, { call, put }) {
			const result = yield call(BatchUnlockUser, payload);

			if (result.data.success) {
				
					notification.open({
					  message: '解锁成功',
					//   description: '',
					  onClick: () => {
						console.log('Notification Clicked!');
					  },
					});
				  
			
			}else{
				notification.open({
					message: result.data.error.message,
				  //   description: '',
					onClick: () => {
					  console.log('Notification Clicked!');
					},
				  });
			}
		},
	},

	reducers: {
		setState(state, action) {
			return { ...state, ...action.payload };
		}
	}
};
