import { GetUsers, GetUsersToExcel,CreateOrUpdateUser,GetRoles,GetOrganizationUnits } from '../../services/example';
export default {
	namespace: 'usertablemodels',

	state: {
		users: '',
		totalCount: '',
		size: '10',
		filter:'',
		fileName: '',
		fileToken: '',
		fileType: '',
		visible:false,
		checkedValues:["50d31fd08541499eb18af45ebd0674a4", "c7ec25e79ca54f92a3e3c9e86cabcd43", "1477abd906fc45fdbb89a0553174052b"],
		tree:'',
		checkedKeys:[],
		Ids:[],
		visibleA:false,
		record:'',
		arr:[],
		lengths:[]

	},

	subscriptions: {
		setup({ dispatch, history }) {
			// eslint-disable-line
			return history.listen(({ pathname, state }) => {
				if (pathname.toLowerCase().indexOf('/menu/usertable') > -1) {
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
			console.log(result);
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
			
			// if (result.data.success) {
			// 	yield put({
			// 		type: 'setState',
			// 		payload: {
			// 			fileName: result.data.result.fileName,
			// 			fileToken: result.data.result.fileToken,
			// 			fileType: result.data.result.fileType
			// 		}
			// 	});
			// }
		},
		*GetRoles({ payload }, { call, put }) {
			const result = yield call(GetRoles, payload);
			console.log(result)
			yield put({
				type:'setState',
				payload:{
					result:result.data.result.items
				}
			})
			
		},
		*GetOrganizationUnits({ payload }, { call, put }) {
			const result = yield call(GetOrganizationUnits, payload);
			console.log(result,"树")
			yield put({
				type:'setState',
				payload:{
				tree:result.data.result.items
				}
			})
			
		}
	},

	reducers: {
		setState(state, action) {
			return { ...state, ...action.payload };
		}
	}
};
