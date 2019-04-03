import React from 'react';
import { connect } from 'dva';
import { Input, Table,Badge,Dropdown,Icon } from 'antd';
function RoleMangement(dispatch) {
    const Search = Input.Search;
    const fullColumns = [
		{
			title: ' 用户名',
			width: 100,
			dataIndex: 'name',
			key: 'name+1',
			sorter: true
		},
		{
			title: '用户编号',
			width: 150,
			dataIndex: 'id',
			key: 'id',
			sorter: true
		},
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
			width: 100,
			sorter: true
		},
		{
			title: '角色',
			dataIndex: 'roles[0].roleName',
			key: '2',
			width: 100,
			sorter: true
		},
		{
			title: '邮箱地址',
			dataIndex: 'emailAddress',
			key: 'emailAddress',
			width: 200,
			sorter: true
		},
		{
			title: '手机号',
			dataIndex: 'phoneNumber',
			key: 'phoneNumber',
			width: 150,
			sorter: true
		},

		{
			title: '身份证号',
			dataIndex: 'idCode',
			key: '234idCode',
			width: 180,
			sorter: true
		}
		,
		{
			title: '启用',
			dataIndex: 'isActive',
			key: '23isActive',
			width: 100,
			
			sorter: true
		},
		{
			title: '锁定',
			dataIndex: 'isLocked',
			key: 'a8',
			width: 100,
			
			sorter: true
		},
		{
			title: '上次登录时间',
			dataIndex: 'lastLoginTime',
			key: '7a9',
			width: 170,
			sorter: true
		},
		{
			title: '创建时间',
			dataIndex: 'creationTime',
			key: '8b',
			width: 170,
			sorter: true
		},

		{
			title: '操作',
			key: 'operation',
			dataIndex: 'action',
			width: 100,
			render: (text, record) => (
				<Dropdown
					// overlay={menus}
					onVisibleChange={(v) => {
						v;
						// ? dispatch({
						// 		type: 'usertable/upState',
						// 		payload: {
						// 			record: record
						// 		}
						// 	})
						// : null;
					}}
				>
					<a href="javascript:;">
						操作 <Icon type="down" />
					</a>
				</Dropdown>
			)
		}
	];
	return (
		<div>
			{/* 搜索框 */}
			<div style={{ marginBottom: 15, borderBottom: '1px solid #e0e0e0' }}>
				<Search
					placeholder="输入关键字搜索，将搜索[用户名][姓名][邮箱][手机号]"
					onSearch={(value) => {
						console.log(value);

						dispatch({
							type: 'usertablemodels/GetUsers',
							payload: {
								filter: value
							}
						});
					}}
					style={{ width: 659, marginBottom: 15 }}
				/>
			</div>
            <Table
            columns={fullColumns}
            // onChange={onChange}
            bordered
            // dataSource={users}
            pagination={false}
            // rowSelection={rowSelection}
            size="middle"

            />
		</div>
	);
}
export default connect(({ roleMangement }) => ({ ...roleMangement }))(RoleMangement);
