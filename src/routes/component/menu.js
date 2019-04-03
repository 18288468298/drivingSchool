import React from 'react';
import { connect } from 'dva';
import {setCookie} from '../../utils/request'
import {
	Layout,
	Menu,
	Icon,
	Dropdown,
	Button,
	Popover,
	Modal,
	Form,
	Input,
	Upload,
	message,
	Table,
	DatePicker,
	Pagination,
	LocaleProvider,
	Badge,

} from 'antd';
import { Route, Link } from 'dva/router';
import UserTable from './usertable';
import { getCookie } from '../../utils/request';
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';

import RoleMangement from './roleMangement';
function Menus({
	collapsed,
	dispatch,
	result,
	visible,
	form,
	confirmDirty,
	visibleA,
	username,
	emailAddress,
	phoneNumber,
	loading,
	imageUrl,
	profile,
	visibleB,
	loginRecords,
	total,
	
	dateString,
	size
}) {
	const { Header, Sider, Content, Footer } = Layout;
	let toggle = () => {
		dispatch({
			type: 'menumodels/setState',
			payload: {
				collapsed: !collapsed
			}
		});
	};
	const SubMenu = Menu.SubMenu;
	const { MonthPicker, RangePicker } = DatePicker;
	const dateFormat = 'YYYY/MM/DD';
	let showModal = () => {
		dispatch({
			type: 'menumodels/setState',
			payload: {
				visible: true
			}
		});
	};
	let showModalA = () => {
		dispatch({
			type: 'menumodels/setState',
			payload: {
				visibleA: true
			}
		});
	};
	let showModalB = () => {
		dispatch({
			type: 'menumodels/setState',
			payload: {
				visibleB: true
			}
		});
		dispatch({
			type: 'menumodels/GetRecentUserLoginAttempts',
			payload: {}
		});
	};

	let handleCancel = () => {
		dispatch({
			type: 'menumodels/setState',
			payload: {
				visible: false
			}
		});
	};
	let handleCancelA = () => {
		dispatch({
			type: 'menumodels/setState',
			payload: {
				visibleA: false
			}
		});
	};
	let handleCancelB = () => {
		dispatch({
			type: 'menumodels/setState',
			payload: {
				visibleB: false
			}
		});
	};

	const { getFieldDecorator } = form;
	let validateToNextPassword = (rule, value, callback) => {
		if (value && confirmDirty) {
			form.validateFields([ 'confirm' ], { force: true });
		}
		callback();
	};
	let compareToFirstPassword = (rule, value, callback) => {
		if (value && value !== form.getFieldValue('password')) {
			callback('您输入的两个密码不一致!');
		} else {
			callback();
		}
	};
	let handleConfirmBlur = (e) => {
		const value = e.target.value;
		dispatch({
			type: 'menumodels/setState',
			payload: {
				confirmDirty: confirmDirty || !!value
			}
		});
	};

	let handleSubmit = (e) => {
		e.preventDefault();

		form.validateFields((err, values) => {
			if (!err) {
				console.log(values.remember);
				dispatch({
					type: 'menumodels/ChangePassword',
					payload: {
						currentPassword: values.currentPassword,
						newPassword: values.newPassword
					}
				});
				if (values.newPassword == values.password) {
					dispatch({
						type: 'menumodels/setState',
						payload: {
							visible: false
						}
					});
				} else {
					alert('你输入的密码有误！');
					dispatch({
						type: 'menumodels/setState',
						payload: {
							visible: true
						}
					});
				}
			}
		});
	};

	let handleSubmitA = (e) => {
		e.preventDefault();
		dispatch({
			type: 'menumodels/setState',
			payload: {
				visibleA: false
			}
		});

		form.validateFields((err, values) => {
			if (!err) {
				console.log(values.remember);
				dispatch({
					type: 'menumodels/UpdateCurrentUser',
					payload: {
						emailAddress: values.emailAddress,
						name: values.name,
						phoneNumber: values.phoneNumber
					}
				});
			}
		});
	};

	// 上传头像
	function getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	function beforeUpload(file) {
		const isJPG = file.type === 'image/jpeg';
		const isPNG = file.type === 'image/png';

		if (!isJPG && !isPNG) {
			message.error('您只能上传JPG/PNG文件!');
		}
		const isLt2M = file.size / 1024 / 1024 < 0.3;
		if (!isLt2M) {
			message.error('图片不能大于30k!');
		}
		return (isJPG || isPNG) && isLt2M;
	}
	let handleChange = (info) => {
		if (info.file.status === 'uploading') {
			dispatch({
				type: 'menumodels/setState',
				payload: {
					loading: true
				}
			});

			return;
			console.log('1');
		}
		if (info.file.status === 'done') {
			// console.log('2')
			getBase64(info.file.originFileObj, (imageUrl) =>
				// console.log(imageUrl),
				dispatch({
					type: 'menumodels/setState',
					payload: {
						imageUrl: imageUrl,
						loading: false
					}
				})
			);
		}
	};
	const uploadButton = (
		<div>
			<Icon type={loading ? 'loading' : 'plus'} />
			<div className="ant-upload-text">点击上传</div>
		</div>
	);
	// 登录记录
	const date = new Date();
	function showTotal(total) {
		return `Total ${total} items`;
	}

	function onChange(pagination, filters, sorter) {
		console.log('params', pagination, filters, sorter);
	}
	
	const loginRecord = [
		{
			title: ' 登录状态',
			width: 100,
			dataIndex: 'result',
			key: 'result',
			render: () => (
				<span>
					{result ? (
						<span>
							{' '}
							<Badge status="success" />成功
						</span>
					) : (
						<span>
							<Badge status="error" /> 失败
						</span>
					)}
				</span>
			),
			sorter: true
		},
		{
			title: '时间',
			width: 200,
			dataIndex: 'creationTime',
			key: 'creationTime',
			sorter: true
		},
		{
			title: '用户名',
			dataIndex: 'userNameOrEmailAddress',
			key: 'userNameOrEmailAddress',
			width: 100,
			sorter: true
		},
		{
			title: '登录IP地址',
			dataIndex: 'clientIpAddress',
			key: 'clientIpAddress',
			width: 200,
			sorter: true
		},
		{
			title: '客户端',
			dataIndex: 'clientName',
			key: 'clientName',
			width: 100,
			sorter: true
		},
		{
			title: '浏览器',
			dataIndex: 'browserInfo',
			key: 'browserInfo',
			width: 200,
			sorter: true
		}
	];
	const pages = (page, pageSize) => {
		dispatch({
			type: 'menumodels/GetRecentUserLoginAttempts',
			payload: {
				maxResultCount: pageSize,
				skipCount: (page - 1) * 10
			}
		});
	};
	const showsize = (current, size) => {
		console.log(current, size);
		dispatch({
			type: 'menumodels/setState',
			payload: {
				size:size
			}
		})
		dispatch({
			type: 'menumodels/GetRecentUserLoginAttempts',
			payload: {
				maxResultCount: size,
				skipCount: (current - 1) * 10
			}
		});
	};
	const dateSub=()=>{
		console.log(size)
		dispatch({
			type: 'menumodels/GetRecentUserLoginAttempts',
			payload: {
				maxResultCount:size?size:10,
				endDate:dateString[1],
				startDate:dateString[0]
			}
		});
	}
	const datechange = ( dateString) => {
		dispatch({
			type: 'menumodels/setState',
			payload: {
				dateString
			}
		})
	};
	// 退出登录
	const quitLogin=()=>{
		setCookie("token", "", 1); //name,token值，失效天数
		window.location = "/";
	}
	const Administrator = (
		<Menu>
			<Menu.Item key="0" onClick={showModal}>
				修改密码
			</Menu.Item>
			<Menu.Item key="1" onClick={showModalA}>
				修改个人信息
			</Menu.Item>

			<Menu.Item key="4" onClick={showModalB}>
				登陆记录
			</Menu.Item>
			<Menu.Item key="5" onClick={quitLogin}>退出登录</Menu.Item>
			<Menu.Divider />
		</Menu>
	);
	return (
		<Layout>
			{visible ? (
				<Modal
					title="修改密码"
					okText="保存"
					cancelText="取消"
					visible={visible}
					onOk={handleSubmit}
					onCancel={handleCancel}
				>
					<Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={handleSubmit}>
						<Form.Item label="旧密码：">
							{getFieldDecorator('currentPassword', {
								rules: [ { required: true, message: '请输入旧密码' } ]
							})(<Input type="password" />)}
						</Form.Item>

						<Form.Item label="新密码:">
							{getFieldDecorator('password', {
								rules: [
									{
										required: true,
										message: '请输入新密码!'
									},
									{
										validator: validateToNextPassword
									}
								]
							})(<Input type="password" />)}
						</Form.Item>

						<Form.Item label="确认密码:">
							{getFieldDecorator('newPassword', {
								rules: [
									{
										required: true,
										message: '请输入密码!'
									},
									{
										validator: compareToFirstPassword
									}
								]
							})(<Input type="password" onBlur={handleConfirmBlur} />)}
						</Form.Item>
					</Form>
				</Modal>
			) : null}
			{/* 个人信息 */}
			<Modal
				title="修改个人信息"
				okText="保存"
				cancelText="取消"
				visible={visibleA}
				onOk={handleSubmitA}
				onCancel={handleCancelA}
				width="600px"
			>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-around'
					}}
				>
					<div style={{ width: '150px', height: '200px' }} title="头像">
						<header style={{ borderBottom: '1px solid #f1f1f1 ', color: '#8891a6' }}>头像</header>

						<Upload
							style={{ width: '150px', height: '170px', display: 'inline-block' }}
							name="file"
							showUploadList={false}
							action="/Profile/ChangeProfilePicture"
							headers={{
								authorization: 'Bearer ' + getCookie('token')
							}}
							beforeUpload={beforeUpload}
							onChange={handleChange}
						>
							<img src={profile} alt="" />
							{imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
						</Upload>
					</div>
					<div>
						<header style={{ borderBottom: '1px solid #f1f1f1', marginBottom: '20px', color: '#8891a6' }}>
							个人信息
						</header>
						<Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onSubmit={handleSubmit}>
							<Form.Item label="姓名:">
								{getFieldDecorator('name', {
									rules: [ { required: false, message: '请输入旧密码' } ],
									initialValue: username
								})(<Input />)}
							</Form.Item>

							<Form.Item label="邮箱地址:">
								{getFieldDecorator('emailAddress', {
									rules: [
										{
											required: false,
											message: '请输入新密码!'
										}
									],
									initialValue: emailAddress
								})(<Input />)}
							</Form.Item>
							<Form.Item label="手机号码">
								{getFieldDecorator('phoneNumber', {
									rules: [ { required: false, message: '请输入旧密码' } ],
									initialValue: phoneNumber
								})(<Input />)}
							</Form.Item>
						</Form>
					</div>
				</div>
			</Modal>
			{/* 登录记录 */}
			<Modal
				width="900px"
				title="登录记录"
				onCancel={handleCancelB}
				visible={visibleB}
				footer={[
					<Button key="back"style={{color:'#fff',background:"#d7c16b"}} onClick={handleCancelB}>
						关闭
					</Button>
				]}
			>
				<LocaleProvider locale={zhCN}>
					<RangePicker
						defaultValue={[ moment(date, dateFormat).subtract(3, 'days'), moment(date, dateFormat) ]}
						format={dateFormat}
						style={{ marginBottom: '30px' }}
						onChange={datechange}
					/>
				</LocaleProvider>
				<Button style={{ marginLeft: '20px',color:'#fff',background:"#d7c16b" }}onClick={dateSub}>查询</Button>
				<Table
					columns={loginRecord}
					onChange={onChange}
					bordered
					dataSource={loginRecords}
					pagination={false}
				/>,
				<LocaleProvider locale={zhCN}>
					<Pagination
						defaultCurrent={1}
						total={total}
						showSizeChanger={true}
						showQuickJumper
						onChange={pages}
						onShowSizeChange={showsize}
					/>
				</LocaleProvider>
			</Modal>

			<Sider
				trigger={null}
				collapsible
				theme="light"
				collapsed={collapsed}
				style={{ maxHeight: '900px', overflow: 'auto' }}
			>
				<div className="logo" style={{ width: '100%' }}>
					<img src="http://220.165.143.82:6810//Logo/GetLogoPicture" alt="" style={{ width: '100%' }} />
				</div>
				<Menu theme="light" mode="inline" defaultSelectedKeys={[ '1' ]}>
					{result ? (
						result.map(
							(items, index) =>
								items.items.length == 0 ? (
									<Menu.Item key={items.url}>
										<Icon type={items.icon} />
										<span>{items.displayName}</span>
									</Menu.Item>
								) : (
									<SubMenu
										key={index}
										title={
											<span>
												<Icon type={items.icon} />
												<span>{items.displayName}</span>
											</span>
										}
									>
										{items.items ? (
											items.items.map((array, indexs) => (
												<Menu.Item key={array.url}>
													<Icon type={array.icon} />
													<span>{array.displayName}</span>
													{array.url == '/user' ? <Link to="/menu/usertable" /> : null}
													{array.url == '/role' ? <Link to="/menu/role" /> : null}
												</Menu.Item>
											))
										) : null}
									</SubMenu>
								)
						)
					) : null}
				</Menu>
			</Sider>

			<Layout>
				<Header style={{ background: '#fff', padding: 0 }}>
					<div style={{ float: 'right', marginRight: '100px' }}>
						<Dropdown overlay={Administrator} trigger={[ 'click' ]}>
							<a href="javascript:;" style={{ textdecoration: 'none' }}>
								<img
									src={profile}
									style={{
										display: 'inlineBlock',
										width: '20px',
										height: '20px',
										marginRight: '10px'
									}}
								/>
								{username}
								<Icon type="down" />
							</a>
						</Dropdown>
					</div>
					<div style={{ float: 'right', marginRight: '50px' }}>
						<Popover content={2}>
							<Button style={{ border: 'none' }}>
								<img src="http://mf.kingyuer.cn/static/notification.e7a6ee9c.svg" />
							</Button>
						</Popover>
					</div>
					<Icon className="trigger" type={collapsed ? 'menu-unfold' : 'menu-fold'} onClick={toggle} />
				</Header>

				<Content
					style={{
						// margin: '24px 16px', padding: 24, background: '#fff', maxHeight: "100%",
						margin: '24px 16px',
						padding: 24,
						background: '#fff',
						minHeight: 400
					}}
				>
					<Route path="/menu/usertable" component={UserTable} />
					<Route path="/menu/role" component={RoleMangement} />
					{/* <UserTable/> */}
				</Content>

				<Footer style={{ textAlign: 'center' }}>GAIA ©2017 Created by 青才信息科技有限公司</Footer>
			</Layout>
		</Layout>
	);
}
const WrappedDynamicRule = Form.create({ name: 'register' })(Menus);
export default connect(({ menumodels }) => ({ ...menumodels }))(WrappedDynamicRule);
