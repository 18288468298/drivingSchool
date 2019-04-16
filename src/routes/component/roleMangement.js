import React from 'react';
import { connect } from 'dva';
import { Input, Table, Badge, Dropdown, Icon, Button, Modal, Tabs, Form, Checkbox,Tree } from 'antd';
function RoleMangement({ form, dispatch, roleUser, visibleA,tree,grantedPermissionNames,visibleB,record,arry }) {
	const Search = Input.Search;
	const TabPane = Tabs.TabPane;
	const { getFieldDecorator } = form;
	const { TreeNode } = Tree;
	console.log(record)
	const fullColumns = [
		{
			title: '角色名称',
			width: 100,
			dataIndex: 'displayName',
			key: 'displayName',
			sorter: true
		},
		{
			title: '角色标签',
			width: 150,
			dataIndex: 'isDefault',
			key: 'isDefault',
			sorter: true,
			render: (text, record) =>
				record.isDefault ? (
					<Button size="small" style={{
						color: '#1890ff', background: '#e6f7ff',
						borderColor: '#91d5ff'
					}}>	默认</Button>


				) : (
						<span>
							<Button size="small" style={{
								color: '#1890ff', background: '#e6f7ff',
								borderColor: '#91d5ff'
							}} >	系统</Button>

						</span>
					),
		},
		{
			title: '创建时间',
			dataIndex: 'creationTime',
			key: 'creationTime',
			width: 100,
			sorter: true

		},
		{
			title: '操作',
			key: 'operation',
			dataIndex: 'action',
			width: 100,
			render: (text, record) => (

				<div>
					<a href="javascript:;" onClick={()=>{
							dispatch({
								type: 'roleMangement/setState',
								payload: {
									visibleB: true,
									record:record
								}
							})
							dispatch({
								type: 'roleMangement/GetRoleForEdit',
								payload: {
								id:	record.id
								}
							})

					}}>
						编辑
					</a>
					<a href="javascript:;" style={{ marginLeft: '10px' }}
					onClick={()=>{
					
							Modal.confirm({
								title: '警告',
								content: '你确定要删除此角色'+record.displayName+'吗?拥有此角色的用户将移除此角色',
								okText: '确认',
								cancelText: '取消',
								onOk(){
									dispatch({
											type: 'roleMangement/DeleteRole',
											payload: {
											id:	record.id
											}
										})
								}
							});
						
						
					}}
					>
						删除
					</a>
				</div>

			)
		}
	];


	// 添加用户

	const addRole = () => {
		dispatch({
			type: 'roleMangement/setState',
			payload: {
				visibleA: true
			}
		})
	}
	const hideModal = () => {
		dispatch({
			type: 'roleMangement/setState',
			payload: {
				visibleA: false
			}
		})
	}
	function callback(key) {
		// console.log(key);
	}

	const formItemLayout = {
		labelCol: {
			xs: { span: 1 },
			sm: { span: 5 }
		},
		wrapperCol: {
			xs: { span: 5 },
			sm: { span: 15 }
		}
	};
	// 树结构
	function treeDom(data) {

		return data.map((items, index) => {
			if (items.children && items.children.length) {
				return (
					<TreeNode title={items.displayName} key={items.name}>
						{treeDom(items.children)}
					</TreeNode>
				);
			}
			return <TreeNode key={items.name} title={items.displayName} />;
		});
	}

	function cao(data,arry) {
	
		// var data = datas.permissions
		return (
			<Tree checkable={true} 
			onSelect={onSelect} onCheck={onCheck} 
			
			// defaultCheckedKeys={arry}
			defaultCheckedKeys={arry}
			>
				{treeDom(data,arry)}
			</Tree>
		);
	}

const onCheck = (checkedKeys, info) => {
		// console.log('onCheck', checkedKeys, info);
		dispatch({
			type:'roleMangement/setState',
			payload:{
				grantedPermissionNames:checkedKeys
			}
		})
	}
	const onSelect = (selectedKeys, info) => {
    // console.log('selected', selectedKeys, info);
  }
const	handleSubmit = (e) => {
    e.preventDefault();
form.validateFields((err, values) => {

      if (!err) {
				dispatch({
					type: 'roleMangement/setState',
					payload: {
						visibleA: false
					}
				})
				dispatch({
					type: 'roleMangement/CreateOrUpdateRole',
					payload: {
						grantedPermissionNames:grantedPermissionNames,
					role:{
						displayName:values.displayName,
						isDefault:values.isDefault
					}
					}
				})
				dispatch({
					type: 'roleMangement/RoleGetRoles',
					payload: {
		
					}
				})
       
      }
    });
	}
	// 编辑用户提交
	const	handleSubmitRole = (e) => {
    e.preventDefault();
form.validateFields((err, values) => {

      if (!err) {
				dispatch({
					type: 'roleMangement/setState',
					payload: {
						visibleB: false
					}
				})
				dispatch({
					type: 'roleMangement/CreateOrUpdateRole',
					payload: {
						grantedPermissionNames:grantedPermissionNames,
					role:{
						id:record.id,
						displayName:values.displayName,
						isDefault:values.isDefault
					}
					}
				})
			
       
      }
    });
	}
	const tailFormItemLayout = {
		wrapperCol: {
			xs: {
				span: 24,
				offset: 0,
			},
			sm: {
				span: 16,
				offset: 8,
			},
		},
	};
	// 编辑用户
	const hideModalB = () => {
		dispatch({
			type: 'roleMangement/setState',
			payload: {
				visibleB: false
			}
		})
	}
	return (
		<div>
			{visibleA?
			<Modal
				title="添加角色"
				visible={visibleA}
				onOk={handleSubmit}
				onCancel={hideModal}
				okText="保存"
				cancelText="取消"
			>
				<Form {...formItemLayout} onSubmit={handleSubmit}>
					<Tabs defaultActiveKey="1" onChange={callback}>

						<TabPane tab="角色属性" key="1">
							<Form.Item label="角色名称">
								{getFieldDecorator('displayName', {
									rules: [{ required: true, message: '请输入' }]
								})(<Input placeholder="请输入角色名称" />
								)}
									
							</Form.Item>

							<Form.Item {...tailFormItemLayout} >
								{getFieldDecorator('isDefault', {
									rules: [{ required: true, message: '请输入' }]
								})(<Checkbox defaultChecked={true} style={{marginTop:'20px',fontWeight:'600'}}>设置为默认角色</Checkbox>
								)}
									
							<div style={{marginTop:'20px'}}>新增用户将会默认拥有此角色</div>
							</Form.Item>
						
							</TabPane>

						<TabPane tab="操作权限" key="2">
						{tree?cao(tree):null}
						</TabPane>

					</Tabs>
				</Form>

			</Modal>:null}
			{/* 编辑角色 */}
			{visibleB?
			<Modal
				title="编辑角色"
				visible={visibleB}
				onOk={handleSubmitRole}
				onCancel={hideModalB}
				okText="保存"
				cancelText="取消"
			>
				<Form {...formItemLayout} onSubmit={handleSubmitRole}>
					<Tabs defaultActiveKey="1" onChange={callback}>

						<TabPane tab="角色属性" key="1">
							<Form.Item label="角色名称">
								{getFieldDecorator('displayName', {
									rules: [{ required: true, message: '请输入' }],
									initialValue: record.displayName
								})(<Input placeholder="请输入角色名称" />
								)}
									
							</Form.Item>

							<Form.Item {...tailFormItemLayout} >
								{getFieldDecorator('isDefault', {
									rules: [{ required: false }],
									
								})(<Checkbox defaultChecked={record.isDefault} style={{marginTop:'20px',fontWeight:'600'}}>设置为默认角色</Checkbox>
								)}
									
							<div style={{marginTop:'20px'}}>新增用户将会默认拥有此角色</div>
							</Form.Item>
						
							</TabPane>

						<TabPane tab="操作权限" key="2">
						{tree?cao(tree,arry):null}
						</TabPane>

					</Tabs>
				</Form>

			</Modal>:null}
			{/* 搜索框 */}
			<div style={{ marginBottom: 15, borderBottom: '1px solid #e0e0e0' }}>
				<Search
					placeholder="请输入关键字搜索"
					onSearch={(value) => {
						// console.log(value);

						dispatch({
							type: 'roleMangement/RoleGetRoles',
							payload: {
								filter: value
							}
						});
					}}
					style={{ width: 659, marginBottom: 15 }}
				/>
			</div>
			<Button  type="primary" style={{ marginBottom: '10px' }} onClick={addRole}>添加角色</Button>
			<Table
				columns={fullColumns}
				// onChange={onChange}
				bordered
				dataSource={roleUser}
				pagination={true}
				// rowSelection={rowSelection}
				size="middle"

			/>
		</div>
	);
}
const RoleMangementS = Form.create({ name: 'register' })(RoleMangement);
export default connect(({ roleMangement }) => ({ ...roleMangement }))(RoleMangementS);
