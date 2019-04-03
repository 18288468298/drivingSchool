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

function AddUsers({ form, confirmDirty, result, dispatch, checked, visible, checkedValues, tree, checkedKeys }) {
	console.log(result, '树');
	var sb=[];
	if(result){
		for(var i=0;i<result.length;i++){
			if(result[i].isDefault){
				sb.push(result[i].name)
			}
		}
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
	function callback(key) {}
	const TabPane = Tabs.TabPane;
	const { getFieldDecorator } = form;
	let handleSubmit = (e) => {
		e.preventDefault();

		form.validateFields((err, values) => {
			console.log(values, '窝 ');
			if (!err) {
				dispatch({
					type: 'usertablemodels/setState',
					payload: { visible: false }
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
			payload: { visible: false }
		});
	};
	const handleCancel = (e) => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visible: false }
		});
	};

	let showModal = () => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visible: true }
		});
	};
	function onChange(checkedValues) {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { checkedValues: checkedValues }
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
	return (
		<div>
			<Button type="primary" onClick={showModal} style={{ marginRight: 20 }}>
				添加用户
			</Button>
			<Modal
				cancelText="取消"
				okText="保存"
				title="添加用户"
				visible={visible}
				onOk={handleSubmit}
				onCancel={handleCancel}
			>
				<Form {...formItemLayout} onSubmit={handleSubmit}>
					<Tabs defaultActiveKey="1" onChange={callback}>
						<TabPane key="1" tab="添加用户">
							<Form.Item label="姓名">
								{getFieldDecorator('userName', {
									rules: [ { required: true, message: '请填写名字' } ]
								})(<Input placeholder="请输入" />)}
							</Form.Item>
							<Form.Item label="邮箱地址">
								{getFieldDecorator('emailAddress', {
									rules: [
										{
											required: true,
											message: '请输入您的电子邮件!'
										}
									]
								})(<Input placeholder="请输入" />)}
							</Form.Item>
							<Form.Item label="电话号码">
								{getFieldDecorator('phoneNumber', {
									rules: [ { message: '请填写正确的电话号码' } ]
								})(<Input placeholder="请输入" maxLength="11" minLength="11" />)}
							</Form.Item>
							<Form.Item label="用户名">
								{getFieldDecorator('name', {
									rules: [ { required: true, message: '请填写正确用户名' } ]
								})(<Input placeholder="请输入" />)}
							</Form.Item>
							<Form.Item label="初始密码">
								{getFieldDecorator('password', {
									rules: [
										{
											required: true,
											message: '请输入密码'
										},
										{
											validator: validateToNextPassword
										}
									]
								})(<Input type="password" placeholder="请输入" />)}
							</Form.Item>
							<Form.Item label="身份证">
								{getFieldDecorator('idCode', {
									rules: [ { required: true, message: '请填写正确身份证' } ]
								})(<Input placeholder="请输入" />)}
							</Form.Item>
							<Form.Item>
								{getFieldDecorator('shouldChangePasswordOnNextLogin', {
									valuePropName: 'checked',
									initialValue: true
								})(
									<Checkbox
										defaultChecked={true}
										style={{ marginLeft: '100px', marginBottom: '15px' }}
									>
										下次登录需要修改密码
									</Checkbox>
								)}
								{getFieldDecorator('sendActivationMessage', {
									valuePropName: 'checked',
									initialValue: true
								})(
									<Checkbox
										defaultChecked={true}
										style={{ marginLeft: '100px', marginBottom: '15px' }}
									>
										发送通知短信
									</Checkbox>
								)}
								{getFieldDecorator('sendActivationEmail', {
									valuePropName: 'checked',
									initialValue: true
								})(
									<Checkbox
										defaultChecked={true}
										style={{ marginLeft: '100px', marginBottom: '15px' }}
									>
										发送通知邮件
									</Checkbox>
								)}
								{getFieldDecorator('isActive', {
									valuePropName: 'checked',
									initialValue: true
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
									initialValue: true
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
								<Badge count={checkedValues.length} offset={[ 10, 0 ]} size={'large'}>
									角色
								</Badge>
							}
							key="2"
						>
							{/* <CheckboxGroup
								onChange={onChange}
								defaultValue={[
									'Admin'
								]}
							> */}
								{result ? (
									result.map((items, index) => (
										<p>
											<Checkbox defaultChecked={items.isDefault } value={items.name} onChange={(a)=>{
												console.log(a);
												if(a.target.checked){
													sb.push(a.target.value)
												}else{
													// console.log(sb.indexOf(a.target.value))
													// sb.splice(a.target.value,1)
													for(var i=0;i<sb.length;i++){
														if(sb[i]==a.target.value){
															sb.splice(i,1)
														}
													}
												}
												console.log(sb)
											}}>{items.displayName}</Checkbox>
										</p>
									))
								) : null}
							{/* </CheckboxGroup> */}
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
			</Modal>
		</div>
	);
}
const AddUsersa = Form.create({ name: 'register' })(AddUsers);
export default connect(({ usertablemodels }) => ({ ...usertablemodels }))(AddUsersa);
