import { login } from '../../services/example';
import { routerRedux } from 'dva/router';
import  {getCookie,setCookie } from '../../utils/request';

export default {
	namespace: 'loginmodels',

	state: {},

	subscriptions: {
		setup({ dispatch, history}) {
			// eslint-disable-line
			// function getCookie(name) {
			// 	var arr,
			// 		reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
		
			// 	if ((arr = document.cookie.match(reg))) {
			// 		return unescape(arr[2]);
			// 	} else return null;
			// }
			// return history.listen(({ pathname, state }) => {
            //     if (pathname.toLowerCase().indexOf('/login') > -1) {
			// 		dispatch({
			// 			type:"autofetch",
						
			// 		})

            //     }
            // });
        }	
			
		
				
			
		
		
	},

	effects: {
		*autofetch({ payload }, { call, put }){
			let token=getCookie('token')
			if(token){
				yield put(routerRedux.push({ pathname: '/menu' }));
			}
			
		},
		*fetch({ payload }, { call, put }) {
			// eslint-disable-line

			yield put({ type: 'save' });
			const result = yield call(login, payload);
			
			
			if (result.data.success && payload.remember) {
                const token = result.data.result;
				setCookie('token',token,1);

            }
            if (result.data.success) {
				yield put(routerRedux.push({ pathname: '/menu' }));
			}

		}
	},

	reducers: {
		setState(state, action) {
			return { ...state, ...action.payload };
		}
	}
};
