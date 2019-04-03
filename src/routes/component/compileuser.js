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

function CompileUser({ form, confirmDirty, result, dispatch, checked, visibleA, checkedValues, tree, checkedKeys,record,arr,lengths }) {
	console.log(lengths, '树');

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
		// console.log('onCheck', checkedKeys, info);
		dispatch({
			type: 'usertablemodels/setState',
			payload: {
				checkedKeys: checkedKeys.checked
			}
		});
	};
	const handleOk = (e) => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleA: false }
		});
	};
	const handleCancel = (e) => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleA: false }
		});
	};

	let showModal = () => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleA: true }
		});
	};
	function onChange(checkedValues) {
		console.log(checkedValues)
		dispatch({
			type: 'usertablemodels/setState',
			payload: { checkedValues: checkedValues ,
			// arr:checkedValues
			}
		});
	}
	const CheckboxGroup = Checkbox.Group;
	function treeDom(data) {
		return data.map((items, index) => {
			if (items.children && items.children.length) {
				return (
					<TreeNode title={items.displayName} key={items.id}>
						{treeDom(items.children)}
					</TreeNode>
				);
			}
			return <TreeNode key={items.id} title={items.displayName} />;
		});
	}

	function cao(data) {
		return (
			<Tree checkable={true} checkStrictly={true} onSelect={onSelect} onCheck={onCheck}>
				{treeDom(data)}
			</Tree>
		);
	}
	
// 	arr.map((items)=>{
// 	items?(
// 		items=='Admin'?'Admin':null,
// 		items=='安全员'?'50d31fd08541499eb18af45ebd0674a4':null,
// 		items=='信息员'?'c7ec25e79ca54f92a3e3c9e86cabcd43':null,
// 		items=='财务'?'1477abd906fc45fdbb89a0553174052b':null,


// 	):null,
	
// }))
	return (
		<div>
			
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
								<Badge count={arr.length} offset={[ 10, 0 ]} size={'large'}>
									角色
								</Badge>
							}
							key="2"
						>
							<CheckboxGroup
								onChange={onChange}
								defaultValue={
									
								arr
								
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
							{tree ? cao(tree) : null}
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
