import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import Menu from './menu'
function Login({ form,dispatch }) {
	const { getFieldDecorator } = form;
	let handleSubmit = (e) => {
		e.preventDefault();
		form.validateFields((err, values) => {
           
			if (!err) {
            console.log(values.remember)
                    dispatch({
                        type:'loginmodels/fetch',
                        payload:{
                            usernameOrEmailAddress:values.userName,
                            password:values.password,
                            remember:values.remember
                            
                        }
                    })
			}
		});
	};

	return (
		<div>
			<div style={{ fontSize: '40px', width: '400px', margin: 'auto', paddingBottom: '50px',color:'#fff' }}>楚雄锦星考试服务中心</div>
			<div style={{ background: '#fff', width: '400px', margin: 'auto', borderRadius: '5px', height: '500px' }}>
				<Form onSubmit={handleSubmit} style={{ width: '345px', margin: 'auto' }}>
					<div
						style={{
                          
						paddingLeft:'20px',
							fontSize: '20px',
							height: '60px',
							borderBottom: '1px solid #e6eaf1',
                            marginBottom: '10px',
                            marginTop:'20px',
                            fontWeight:'900',
                            lineHeight:'60px'
                            
						}}
					>
						请登录
					</div>
					<Form.Item>
                    <div><strong>用户名:</strong></div>
						{getFieldDecorator('userName', {
							rules: [ { required: true, message: '请输入您的用户名!' } ]
						})(
                           
							<Input 
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="请输入"
							/>
						)}
					</Form.Item>
					<Form.Item>
                    <div><strong>登录密码:</strong></div>
						{getFieldDecorator('password', {
							rules: [ { required: true, message: '请输入你的密码!' } ]
						})(
                            
							<Input
								prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
								type="password"
								placeholder="请输入密码"
							/>
						)}
					</Form.Item>
					<Form.Item>
						{getFieldDecorator('remember', {
							valuePropName: 'checked',
							initialValue: true
						})(<Checkbox>记住密码</Checkbox>)}
						
						<Button type="primary" htmlType="submit" block='true'>
						登录
						</Button>
						
					</Form.Item>
				</Form>
			</div>
            
		</div>
	);
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default connect(({ loginmodels }) => ({ ...loginmodels }))(WrappedNormalLoginForm);
