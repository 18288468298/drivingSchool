import { GetAllPermissionTree, RoleGetRoles,GetRoles, CreateOrUpdateRole, GetRoleForEdit, DeleteRole } from '../../services/example'
import { notification, Modal } from 'antd'
export default {
	namespace: 'roleMangement',

	state: {
		roleUser: '',
		visibleA: false,
		tree: "",
		grantedPermissionNames: [],
		visibleB: false,
		record: ''

	},

	subscriptions: {
		setup({ dispatch, history }) {
			// eslint-disable-line
			return history.listen(({ pathname, state }) => {
				if (pathname.toLowerCase().indexOf('/menu/role') > -1) {
					dispatch({
						type: 'GetAllPermissionTree',
						payload: {}
					})
					dispatch({
						type: 'RoleGetRoles',
						payload: {}
					})
				}
			});
		}
	},

	effects: {
		*GetAllPermissionTree({ payload }, { call, put }) {

			const result = yield call(GetAllPermissionTree, payload);

			yield put({
				type: 'setState',
				payload: {
					tree: result.data.result

				}
			});
		},

		*RoleGetRoles({ payload }, { call, put }) {

			const result = yield call(RoleGetRoles, payload);

			yield put({
				type: 'setState',
				payload: {
					roleUser: result.data.result.items
				}
			})
		},
		*CreateOrUpdateRole({ payload }, { call, put }) {

			const result = yield call(CreateOrUpdateRole, payload);

			if (result.data.success) {
				notification.open({
					message: '添加成功',
					//   description: '',
					onClick: () => {

					},
				});
				yield put({
					type: 'RoleGetRoles',
					payload: {}
				})

			} else {
				notification.open({
					message: result.data.error.message,
					//   description: '',
					onClick: () => {

					},
				});

			}


		},
		// 编辑
		*GetRoleForEdit({ payload }, { call, put }) {

			const result = yield call(GetRoleForEdit, payload);
			console.log(result.data.result)
			yield put({
				type: "setState",
				payload: {
					arry: result.data.result.grantedPermissionNames
				}
			})
		},
		*DeleteRole({ payload }, { call, put }) {

			const result = yield call(DeleteRole, payload);
			if (result.data.success) {
				yield put({
					type: 'RoleGetRoles',
					payload: {}
				})
			}
		},
		


	},
	
	reducers: {
		setState(state, action) {
			return { ...state, ...action.payload };
		}
	}
};