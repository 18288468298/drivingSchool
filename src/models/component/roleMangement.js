export default {
	namespace: 'roleMangement',

	state: {
		
	},

	subscriptions: {
		setup({ dispatch, history }) {
			// eslint-disable-line
			return history.listen(({ pathname, state }) => {
				if (pathname.toLowerCase().indexOf('/menu/role') > -1) {
				
				}
			});
		}
	},

	effects: {
		*GetUsers({ payload }, { call, put }) {
			// eslint-disable-line
			// const result = yield call(GetUsers, payload);

			// yield put({
			// 	type: 'setState',
			// 	payload: {
			// 		users: result.data.result.items,
			// 		totalCount: result.data.result.totalCount
			// 	}
			// });
		},
		
		
	
	
    },
	reducers: {
		setState(state, action) {
			return { ...state, ...action.payload };
		}
	}
};