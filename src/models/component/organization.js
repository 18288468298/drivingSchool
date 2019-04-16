import { OrganizationGetOrganizationUnits, GetOrganizationUnitUsers,
     CreateOrganizationUnit, UpdateOrganizationUnit, DeleteOrganizationUnit,
    AddUserToOrganizationUnit, GetOrganizationUnitJoinableUserList } from '../../services/example'

export default {
    namespace: 'organization',

    state: {
        trees: '',
        GroupList: '',
        visibleA: false,
        visibleB: false,
        ids: '',
        parentId: '',
        items: '',
        visibleC: false,
        visibleE: false,
        disabled: true,
        addTable:'',
        maxResultCount:5,
        skipCounts:0,
        selectedRowKeys:''


    },

    subscriptions: {
        setup({ dispatch, history }) {
            // eslint-disable-line
            return history.listen(({ pathname, state }) => {
                if (pathname.toLowerCase().indexOf('/menu/organization') > -1) {
                    dispatch({
                        type: 'OrganizationGetOrganizationUnits',
                        payload: {}
                    })

                }
            });
        }
    },

    effects: {
        *OrganizationGetOrganizationUnits({ payload }, { call, put }) {
            const result = yield call(OrganizationGetOrganizationUnits, payload);
            if (result.data.success) {
                yield put({
                    type: 'setState',
                    payload: {
                        trees: result.data.result.items
                    }
                })
            }

        },
        *GetOrganizationUnitUsers({ payload }, { call, put }) {
            const result = yield call(GetOrganizationUnitUsers, payload);
         
            if (result.data.success) {
                yield put({
                    type: 'setState',
                    payload: {
                        GroupList: result.data.result.items
                    }
                })
            }

        },

        *CreateOrganizationUnit({ payload }, { call, put }) {
            const result = yield call(CreateOrganizationUnit, payload);
           
            if (result.data.success) {
                yield put({
                    type: 'OrganizationGetOrganizationUnits',
                    payload: {

                    }
                })
            }

        },

        *UpdateOrganizationUnit({ payload }, { call, put }) {
            const result = yield call(UpdateOrganizationUnit, payload);
           
            if (result.data.success) {
                yield put({
                    type: 'OrganizationGetOrganizationUnits',
                    payload: {

                    }
                })
            }

        },

        *DeleteOrganizationUnit({ payload }, { call, put }) {
            const result = yield call(DeleteOrganizationUnit, payload);
      
            if (result.data.success) {
                yield put({
                    type: 'OrganizationGetOrganizationUnits',
                    payload: {

                    }
                })
            }

        },
        *GetOrganizationUnitJoinableUserList({ payload }, { call, put }) {
            const result = yield call(GetOrganizationUnitJoinableUserList, payload);
            console.log(result)
            if (result.data.success) {
                yield put({
                    // type: 'OrganizationGetOrganizationUnits',
                    // payload: {

                    // }
                    type:'setState',
                    payload:{
                        addTable:result.data.result
                    }
                })
            }

        },
        
        *AddUserToOrganizationUnit({ payload }, { call, put }) {
            const result = yield call(AddUserToOrganizationUnit, payload);
            console.log(result)
            if (result.data.success) {
                yield put({
                    type: 'OrganizationGetOrganizationUnits',
                    payload: {

                    }
                    // type:'setState',
                    // payload:{
                    //     addTable:result.data.result
                    // }
                })
            }

        },
        
    },

    reducers: {
        setState(state, action) {
            return { ...state, ...action.payload };
        }
    }
}

