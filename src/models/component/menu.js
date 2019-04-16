import { GetUserMenus, ChangePassword,UpdateCurrentUser,GetCurrentLoginInformations,GetRecentUserLoginAttempts } from '../../services/example';
import { notification,Modal  } from 'antd';


export default {
	namespace: 'menumodels',

	state: {
		collapsed: false,
		result: '',
		visible: false,
		confirmDirty: false,
        success: false,
        visibleA: false,
        username:'',
        emailAddress:"",
        phoneNumber:"",
        loading: false,
		imageUrl:'',
		profile:"",
		visibleB:false,
		loginRecords:"",
		total:'',
		dateString:'',
		size:''
	},

	subscriptions: {
		setup({ dispatch, history }) {
			// eslint-disable-line
			return history.listen(({ pathname, state }) => {
				if (pathname.toLowerCase().indexOf('/menu') > -1) {
					dispatch({
						type: 'GetUserMenus'
                    });
                    dispatch({
						type: 'GetCurrentLoginInformations'
					});
				}
			});
		}
	},

	effects: {
		*GetUserMenus({ payload }, { call, put }) {
			const result = yield call(GetUserMenus, payload);
			console.log(result.data.result[0].displayName);
			yield put({
				type: 'setState',
				payload: {
					result: result.data.result
				}
			});
        },
        *GetCurrentLoginInformations({ payload }, { call, put }) {
			const result = yield call(GetCurrentLoginInformations, payload);
			
			yield put({
				type: 'setState',
				payload: {
                    username:result.data.result.user.name,
                    emailAddress:result.data.result.user.emailAddress,
					phoneNumber:result.data.result.user.phoneNumber,
					profile:result.data.result.user.profile
				}
			});
        },
        
		*ChangePassword({ payload }, { call, put }) {
			const result = yield call(ChangePassword, payload);
            console.log(result,110);
            if(result.data.success){ 
				 Modal.success({ 
                 	title: '修改成功',
                okText:"朕知道了"
                 });
               
			}else{
				notification['error']({
                    message:result.data.error.message,
				
				})
			}
			
        },
        *UpdateCurrentUser({ payload }, { call, put }) {
			const result = yield call(UpdateCurrentUser, payload);
			if(result.data.success){ 
                Modal.success({ 
                    title: '修改成功',
               okText:"朕知道了"
                });
              
           }
			
		},
		*GetRecentUserLoginAttempts({ payload }, { call, put }) {
			const result = yield call(GetRecentUserLoginAttempts, payload);
			console.log(result.data.result.totalCount ,12);
			yield put({
				type: 'setState',
				payload: {
				   loginRecords:result.data.result.items ,
				   total:result.data.result.totalCount
				   
				}
			});
        },
	},

	reducers: {
		setState(state, action) {
			return { ...state, ...action.payload };
		}
	}
};
