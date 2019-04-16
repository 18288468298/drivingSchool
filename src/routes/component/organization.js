import React from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Tree, Menu, Dropdown, Icon, Table, Modal, Input, Form, LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
function Organization({ dispatch, trees, GroupList, visibleA,
    form, ids, parentId, visibleB, items, visibleC, disabled, visibleE, addTable,selectedRowKeys }) {
    console.log(addTable)
    const { TreeNode } = Tree;
    const menu = (
        <Menu>
            <Menu.Item>
                <a href="javascript:;" onClick={() => {
                    dispatch({
                        type: 'organization/setState',
                        payload: {
                            visibleA: true
                        }
                    })
                }} >添加子集</a>
            </Menu.Item>
            <Menu.Item>
                <a href="javascript:;" onClick={() => {
                    dispatch({
                        type: 'organization/setState',
                        payload: {
                            visibleB: true
                        }
                    })
                }}>修改 </a>
            </Menu.Item>
            <Menu.Item>
                <a href="javascript:;"
                    // onClick={()=>{
                    //     dispatch({
                    //         type:'organization/setState',
                    //         payload:{
                    //             visibleC:true
                    //         }
                    //     })}}
                    onClick={confirm}
                >删除</a>
            </Menu.Item>
        </Menu>
    );
    function confirm() {
        Modal.confirm({
            title: '警告',
            content: '你确定要删除' + items.displayName + '吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {

                dispatch({
                    type: 'organization/DeleteOrganizationUnit',
                    payload: {
                        id: ids
                    }
                })
            }

        });
    }

    function treeDom(data) {

        return data.map((items, index) => {
            if (items.children) {
                return (
                    <TreeNode title={<div>{items.displayName}{"(" + items.memberCount + ")"} &nbsp;&nbsp;&nbsp;
                <Dropdown overlay={menu}
                            trigger='[onclick]'>
                            <a href="javascript:;" onClick={() => {

                                dispatch({
                                    type: 'organization/GetOrganizationUnitUsers',
                                    payload: { id: items.id }
                                })
                                dispatch({
                                    type: 'organization/setState',
                                    payload: {
                                        ids: items.id,
                                        parentId: items.parentId,
                                        items,
                                        disabled: false
                                    }
                                })
                            }}>
                                操作<Icon type="down" />
                            </a>
                        </Dropdown></div>}
                        key={items.name}>
                        {treeDom(items.children)}

                    </TreeNode>
                );
            }
            return <TreeNode key={items.name} title={items.displayName} />
        });
    }

    function cao(data, arry) {

        // var data = datas.permissions 
        return (
            <Tree checkable={false}
                showLine
            >
                {treeDom(data)}
            </Tree>
        );
    }
    const TreeColumns = [{
        title: '用户',
        dataIndex: 'userName',
        key: 'userName',
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'id',
    }, {
        title: '手机号',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    }
        , {
        title: '添加时间',
        dataIndex: 'addedTime',
        key: 'addedTime',
    }
        , {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
    }];
    const addGroupTable = [{
        title: '用户',
        dataIndex: 'userName',
        key: 'userName',
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'id',
    }, {
        title: '手机号',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
    }
        , {
        title: '添加时间',
        dataIndex: 'creationTime',
        key: 'creationTime',
    }];
    const { getFieldDecorator } = form;
    const handleSubmit = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'organization/setState',
                    payload: {
                        visibleA: false
                    }
                })
                dispatch({
                    type: 'organization/CreateOrganizationUnit',
                    payload: {
                        displayName: values.displayName,
                        id: ids,
                        parentId: parentId
                    }
                }),

                    console.log('Received values of form: ', values);
            }
        });
    }
    //  修改
    const handleSubmitB = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                dispatch({
                    type: 'organization/setState',
                    payload: {
                        visibleB: false
                    }
                })
                dispatch({
                    type: 'organization/UpdateOrganizationUnit',
                    payload: {
                        displayName: values.displayName,
                        id: ids,
                        parentId: parentId
                    }
                }),

                    console.log('Received values of form: ', values);
            }
        });
    }
    // 添加组织机构
    const addGroup = () => {
        dispatch({
            type: 'organization/setState',
            payload: {
                visibleC: true
            }
        })
    }
    const handleSubmitC = (e) => {
        e.preventDefault();
        form.validateFields((err, values) => {
            console.log(values,158)
            if (!err) {
               
                dispatch({
                    type: 'organization/setState',
                    payload: {
                        visibleC: false
                    }
                })
                dispatch({
                    type: 'organization/CreateOrganizationUnit',
                    payload: {
                        displayName: values.displayName,
                      
                        parentId:0
                    }
                })

                // console.log('Received values of form: ', values);
            }
        });
    }
    const handleSubmitE = () => {
       
               
                dispatch({
                    type: 'organization/setState',
                    payload: {
                        visibleE: false
                    }
                })
                dispatch({
                    type: 'organization/AddUserToOrganizationUnit',
                    payload: {
                        organizationUnitId: ids,
                        userIdListStr: selectedRowKeys.join(',')
                    }
                })

                // console.log('Received values of form: ', values);
            }
        
    
   
    // 添加成员
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows.id);
            dispatch({
                type:'organization/setState',
                payload:{
                    selectedRowKeys:selectedRowKeys
                }
            })
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };
    function onChange(pageNumber, pageSize) {

        dispatch({
            type: 'organization/GetOrganizationUnitJoinableUserList',
            payload: {
                filter: "",
                id: ids,
                maxResultCount: pageSize,
                skipCount: pageSize * (pageNumber - 1)
            }
        })
    }
    function onShowSizeChange(current, size) {
        console.log(current, size)
        dispatch({
            type: 'organization/GetOrganizationUnitJoinableUserList',
            payload: {
                filter: "",
                id: ids,
                maxResultCount: size,
                skipCount: size * (current - 1)
            }
        })
    }

    return (
        <div>
            {/* 添加子集 */}
            {visibleA ? <Modal
                visible={visibleA}
                title="添加组织机构"
                cancelText='取消'
                okText='保存'

                onCancel={() => {
                    dispatch({
                        type: 'organization/setState',
                        payload: {
                            visibleA: false
                        }
                    })
                }}
                onOk={handleSubmit}
            >
                <Form onSubmit={handleSubmit} >
                    <Form.Item
                        label='组织机构名称:'>
                        {getFieldDecorator('displayName', {
                            rules: [{ required: true, message: '请填写组织机构名称' }],

                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal> : null}
            {/* 修改 */}
            {visibleB ? <Modal
                visible={visibleB}
                title="添加组织机构"
                cancelText='取消'
                okText='保存'

                onCancel={() => {
                    dispatch({
                        type: 'organization/setState',
                        payload: {
                            visibleB: false
                        }
                    })
                }}
                onOk={handleSubmitB}
            >
                <Form onSubmit={handleSubmitB} >
                    <Form.Item
                        label='组织机构名称:'>
                        {getFieldDecorator('displayName', {
                            rules: [{ required: true, message: '请填写组织机构名称' }],
                            initialValue: items.displayName
                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal> : null}
            {/* 添加组织机构 */}
            {visibleC ? <Modal
                visible={visibleC}
                title="添加组织机构"
                cancelText='取消'
                okText='保存'

                onCancel={() => {
                    dispatch({
                        type: 'organization/setState',
                        payload: {
                            visibleC: false
                        }
                    })
                }}
                onOk={handleSubmitC}
            >
                <Form onSubmit={handleSubmitC} >
                    <Form.Item
                        label='组织机构名称:'>
                        {getFieldDecorator('displayName', {
                            rules: [{ required: true, message: '请填写组织机构名称' }],

                        })(<Input />)}
                    </Form.Item>
                </Form>
            </Modal> : null}
            {/* 添加成员 */}

            {visibleE ? <Modal
                visible={visibleE}
                title="添加成员"
                cancelText='取消'
                okText='保存'
                width='700px'
                onCancel={() => {
                    dispatch({
                        type: 'organization/setState',
                        payload: {
                            visibleE: false
                        }
                    })
                }}

                onOk={handleSubmitE}
            >
                <LocaleProvider locale={zhCN}>
                    <Table
                        rowSelection={rowSelection}
                        columns={addGroupTable}
                        dataSource={addTable.items}
                        rowKey='id'
                        pagination={{
                            showQuickJumper: true,
                            defaultCurrent: 1,
                            total: addTable.totalCount,
                            onChange: onChange,
                            showSizeChanger: true,
                            defaultPageSize: 5,
                            pageSizeOptions: ['5', '10', '20', '30'],
                            // showTotal:addTable.totalCount
                            onShowSizeChange: onShowSizeChange
                        }}
                    >

                    </Table>
                </LocaleProvider>
            </Modal> : null}
            <Row type="flex">
                <Col span={11} style={{ borderBottom: '1px solid #e6eaf1', padding: '20px' }} >
                    <Col span={8} style={{
                        fontSize: '18px',
                        color: '#4c5976',
                        fontWeight: 900
                    }}>组织机构
                </Col>
                    <Col offset={12} span={4}>
                        <Button type="primary" style={{ marginRight: '0px' }} onClick={addGroup} >添加跟组织机构</Button>
                    </Col>
                </Col>
                <Col span={2}></Col>
                <Col span={11} style={{ borderBottom: '1px solid #e6eaf1', padding: '20px' }}>
                    <Col span={8} style={{
                        fontSize: '18px',
                        color: '#4c5976',
                        fontWeight: 900
                    }}>组织成员
                </Col>
                    <Col offset={12} span={4}>
                        <Button type="primary"
                            disabled={disabled}
                            onClick={() => {
                                dispatch({
                                    type: 'organization/setState',
                                    payload: {
                                        visibleE: true
                                    }
                                }),
                                    dispatch({
                                        type: 'organization/GetOrganizationUnitJoinableUserList',
                                        payload: {
                                            filter: "",
                                            id: ids,
                                            maxResultCount: 5,
                                            skipCount: 0
                                        }
                                    })

                            }}>添加成员</Button>
                    </Col>
                </Col>

            </Row>
            <Row type="flex">
                <Col span={11} style={{ padding: '20px' }} >
                    {trees ? cao(trees) : null}
                </Col>
                <Col span={2}></Col>
                <Col span={11} style={{ padding: '20px' }}>
                    <Table columns={TreeColumns}
                        dataSource={GroupList} />
                </Col>



            </Row>


        </div>
    )
}
const Organizations = Form.create({ name: 'register' })(Organization);
export default connect(({ organization }) => ({ ...organization }))(Organizations);