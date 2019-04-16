// 编辑用户
import React from 'react';
import { connect } from 'dva';
import {
	Form,
	Input,
	Checkbox,
	Button,
	Tabs,
	Tree,
	Badge,
	Modal
} from 'antd';

function CompileUser({checkTree,visibleC, form, confirmDirty, result, dispatch, checked, visibleA, checkedValues, tree, checkedKeys,record,arr,lengths,visibleB,jurisdictionTree }) {
 console.log(jurisdictionTree, '树18');

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
	function callback(key) {}
	const TabPane = Tabs.TabPane;
	const { getFieldDecorator } = form;
	let handleSubmit = (e) => {
		e.preventDefault();
console.log(e,"真")
		form.validateFields((err, values) => {
			console.log(values, '窝 ');
			if (!err) {
				dispatch({
					type: 'usertablemodels/setState',
					payload: { visibleA: false }
				});
				dispatch({
					type: 'usertablemodels/CreateOrUpdateUser',
					payload: {
						assignedRoleNames: checkedValues,
						organizations: checkedKeys,
						
						sendActivationEmail: values.sendActivationEmail,
						sendActivationMessage: values.sendActivationMessage,

						user: {
							emailAddress: values.emailAddress,
							isActive: values.isActive,
							isLockoutEnabled: values.isLockoutEnabled,
							name: values.name,
							password: values.password,
							phoneNumber: values.phoneNumber,
							shouldChangePasswordOnNextLogin: values.shouldChangePasswordOnNextLogin,
							surname: values.surname,
							userName: values.userName,
							idCode: values.idCode
						}
					}
				});
			}
		});
	};

	let validateToNextPassword = (rule, value, callback) => {
		const form = form;
		if (value && confirmDirty) {
			form.validateFields([ 'confirm' ], { force: true });
		}
		callback();
	};
	const Search = Input.Search;
	const { TreeNode } = Tree;
	let onSelect = (selectedKeys, info) => {
		console.log('selected', selectedKeys, info);
	};

	let onCheck = (checkedKeys, info) => {
		 console.log('onCheck', checkedKeys);
		dispatch({
			type: 'usertablemodels/setState',
			payload: {
				checkTree: checkedKeys
			}
		});
	};
	const handleOk = (e) => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleB: false }
		});
		dispatch({
			type:'usertablemodels/UpdateUserPermissions',
			payload:{
				grantedPermissionNames:checkTree,
				id:record.id
			}
		})
	};
	const handleCancel = (e) => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleA: false }
		});
	};

	let showModalB = () => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleB: false }
		});
	};
	let showModalC = () => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleC: false }
		});
	};
	let recover = () => {
		dispatch({
			type: 'usertablemodels/ResetUserSpecificPermissions',
			payload: {
				id:record.id
			 }
		});
	};
	function onChange(checkedValues) {
		console.log(checkedValues)
		dispatch({
			type: 'usertablemodels/setState',
			payload: { lengths: checkedValues ,
			// arr:checkedValues
			}
		});
	}
	const CheckboxGroup = Checkbox.Group;
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

	function cao(datas) {
		var data=datas.permissions
		return (
			<Tree checkable={true}  onSelect={onSelect} onCheck={onCheck} defaultCheckedKeys={datas.grantedPermissionNames}>
				{treeDom(data)}
			</Tree>
		);
	}
	// 修改密码
	let handleSubmitC = (e) => {
		e.preventDefault();

		form.validateFields((err, values) => {
			if (!err) {
				console.log(values.remember);
				
				if (values.newPassword == values.password) {
					dispatch({
						type: 'usertablemodels/ChangeUserPassword',
						payload: {
							userid:record.id,
							newPassword: values.newPassword
						}
					});
					dispatch({
						type: 'usertablemodels/setState',
						payload: {
							visibleC: false
						}
					});
				} else {
					
					dispatch({
						type: 'usertablemodels/setState',
						payload: {
							visibleC: true
						}
					});
				}
			}
		});
	};

// // 树结构

	return (
		<div>
			{visibleC?<Modal
			
			title="修改密码"
			visible={visibleC}
			onOk={handleSubmitC}
			onCancel={showModalC}
			>
<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmitC}>
						<Form.Item label="新密码：">
							{getFieldDecorator('newPassword', {
								rules: [ { required: true, message: '请输入密码' } ]
							})(<Input type="password" />)}
						</Form.Item>

						<Form.Item label="确认密码:">
							{getFieldDecorator('password', {
								rules: [
									{
										required: true,
										message: '请输入密码!'
									},
									{
										
									}
								]
							})(<Input type="password" />)}
						</Form.Item>

					
					</Form>
			</Modal>:null}
			{visibleB?<Modal 
			
			title="修改权限"
			visible={visibleB}
			
	footer={
		<div>
		<Button onClick={handleOk}>保存</Button>
		<Button onClick={showModalB}>取消</Button>
		<Button onClick={recover}>恢复默认权限</Button>
		</div>
	}
		onCancel={showModalB}>
		
		{jurisdictionTree?cao(jurisdictionTree):null}

			</Modal>:null}
			
			{visibleA?<Modal
				cancelText="取消"
				okText="保存"
				title="修改用户信息"
				visible={visibleA}
				onOk={handleSubmit}
				onCancel={handleCancel}
			>
				<Form {...formItemLayout} onSubmit={handleSubmit}>
					<Tabs defaultActiveKey="1" onChange={callback}>
						<TabPane key="1" tab="基础信息">
							<Form.Item label="姓名">
								{getFieldDecorator('userName', {
									rules: [ { required: true, message: '请填写名字' } ],
									initialValue: record.userName
								})(<Input placeholder="请输入" />)}
							</Form.Item>
							<Form.Item label="邮箱地址">
								{getFieldDecorator('emailAddress', {
									rules: [
										{
											required: true,
											message: '请输入您的电子邮件!'
										}
									],
									initialValue: record.emailAddress
								})(<Input placeholder="请输入" />)}
							</Form.Item>
							<Form.Item label="电话号码">
								{getFieldDecorator('phoneNumber', {
									rules: [ { message: '请填写正确的电话号码' } ],
									initialValue: record.phoneNumber
								})(<Input placeholder="请输入" maxLength="11" minLength="11" />)}
							</Form.Item>
							<Form.Item label="用户名">
								{getFieldDecorator('name', {
									rules: [ { required: true, message: '请填写正确用户名' } ],
									initialValue: record.name
								})(<Input placeholder="请输入" />)}
							</Form.Item>
							
							<Form.Item label="身份证">
								{getFieldDecorator('idCode', {
									rules: [ { required: true, message: '请填写正确身份证' } ],
									initialValue: record.idCode
								})(<Input placeholder="请输入" />)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator('shouldChangePasswordOnNextLogin', {
									valuePropName: 'checked',
									initialValue: record.shouldChangePasswordOnNextLogin
								})(
									<Checkbox
										defaultChecked={true}
										style={{ marginLeft: '100px', marginBottom: '15px' }}
									>
										下次登录需要修改密码
									</Checkbox>
								)}
								
								
								{getFieldDecorator('isActive', {
									valuePropName: 'checked',
									initialValue: record.isActive
								})(
									<Checkbox
										defaultChecked={true}
										style={{ marginLeft: '100px', marginBottom: '15px' }}
									>
										启用
									</Checkbox>
								)}
								{getFieldDecorator('isLockoutEnabled', {
									valuePropName: 'checked',
									initialValue: record.isLockoutEnabled
								})(
									<Checkbox
										defaultChecked={true}
										style={{ marginLeft: '100px', marginBottom: '15px' }}
									>
										启用锁定
									</Checkbox>
								)}
							</Form.Item>
						</TabPane>

						<TabPane
							tab="角色"
							tab={
								<Badge count={lengths.length} offset={[ 10, 0 ]} size={'large'}>
									角色
								</Badge>
							}
							key="2"
						>
							<CheckboxGroup
								onChange={onChange}
								defaultValue={
									lengths
							}
							>
								{result ? (
									result.map((items, index) => (
										<p>
											<Checkbox value={items.name}>{items.displayName}</Checkbox>
										</p>
									))
								) : null}
							</CheckboxGroup>
						</TabPane>
						<TabPane tab=" 组织机构" key="3">
							<Search
								placeholder="输入关键字搜索，将搜索[用户名][姓名][邮箱][手机号]"
								style={{ width: 400, marginBottom: 15 }}
							/>
							
						</TabPane>
					</Tabs>
				</Form>
			</Modal>:null
		}
		</div>
	);
}
const CompileUsers = Form.create({ name: 'register' })(CompileUser);
export default connect(({ usertablemodels }) => ({ ...usertablemodels }))(CompileUsers);
