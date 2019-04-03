import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, LocaleProvider, Badge, Dropdown, Icon, Menu, Input, ButtonMenu,Button,Modal } from 'antd';
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AddUsers from './addUsers';
import CompileUsers from './compileuser';
function UserTable({ dispatch, users, ceshi, totalCount, size, fileName, fileToken, fileType, filter, tree,Ids,visibleA, }) {
	console.log(Ids, 123);
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
		},
		{
			title: '邮箱地址验证',
			dataIndex: 'isEmailConfirmed',
			key: '789isEmailConfirmed',
			width: 190,
			render: (text, record) => (
				<span>
					{users.isEmailConfirmed ? (
						<span>
							<Badge status="success" />验证
						</span>
					) : (
						<span>
							<Badge status="error" /> 未验证
						</span>
					)}
				</span>
			),
			sorter: true
		},
		{
			title: '手机号码验证',
			dataIndex: 'isPhoneNumberConfirmed',
			key: 'isPhoneNumberConfirmed',
			width: 190,
			sorter: true,
			render: (text, record) => (
				<span>
					{users.isPhoneNumberConfirmed ? (
						<span>
							<Badge status="success" />验证
						</span>
					) : (
						<span>
							<Badge status="error" /> 未验证
						</span>
					)}
				</span>
			)
		},
		{
			title: '启用',
			dataIndex: 'isActive',
			key: '23isActive',
			width: 100,
			render: (text, record) => (
				<span>
					{users.isActive ? (
						<span>
							<Badge status="success" />已启用
						</span>
					) : (
						<span>
							<Badge status="error" /> 已禁用
						</span>
					)}
				</span>
			),
			sorter: true
		},
		{
			title: '锁定',
			dataIndex: 'isLocked',
			key: 'a8',
			width: 100,
			render: (text, record) => (
				<span>
					{users.isLocked ? (
						<span>
							<Badge status="success" />已锁定
						</span>
					) : (
						<span>
							<Badge status="error" /> 未锁定
						</span>
					)}
				</span>
			),
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
			
			width: 100,
			render: (text, record) => (
				// console.log(record2,'古树'),
					// dispatch({
					// 	type:'usertablemodels/setState',
					// 	payload:{
					// 		record:record
					// 	}
					// }),
				
				<Dropdown
					overlay={menus}
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
					<a href="javascript:;" onMouseOver={()=>{
						console.log(record,"是")
						var arr=[];
						// record.roles.map((items)=>{
						// 	items.roleName?arr.push(items.name)
						// 	items.roleName=='Admin'?arr.push('Admin'):null,
						// 	items.roleName=='安全员'?arr.push('50d31fd08541499eb18af45ebd0674a4'):null,
						// 	items.roleName=='信息员'?arr.push('c7ec25e79ca54f92a3e3c9e86cabcd43'):null,
						// 	items.roleName=='财务'?arr.push('1477abd906fc45fdbb89a0553174052b'):null}
					
							// ),
					
						dispatch({
						
								type:'usertablemodels/setState',
							payload:{
								record:record,
								arr:arr
							}
						})
					}}>
						操作 <Icon type="down" />
					</a>
				</Dropdown>
			)
		}
	];
	// 编辑
	const handleCancel = (e) => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleA: false }
		});
	};
	const compile=()=>{
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleA: true }
		});
		
	}
	const menus = (
		<Menu>
			<Menu.Item>
				<a href="javascript:;" onClick={compile}>编辑</a>
			</Menu.Item>
			<Menu.Item>
				<a href="javascript:;">修改权限</a>
			</Menu.Item>
			<Menu.Item>
				<a href="javascript:;">重置密码</a>
			</Menu.Item>
			<Menu.Item>
				<a href="javascript:;">修改密码</a>
			</Menu.Item>
			<Menu.Item>
				<a href="javascript:;">禁用</a>
			</Menu.Item>
			<Menu.Item>
				<a
					rel="noopener noreferrer"
					href="javascript:;"
					//  onClick={confirm}
				>
					删除
				</a>
			</Menu.Item>
		</Menu>
	);
	const pages = (page, pageSize) => {
		dispatch({
			type: 'usertablemodels/GetUsers',
			payload: {
				maxResultCount: pageSize,
				skipCount: (page - 1) * 10
			}
		});
	};
	const showsize = (current, size) => {
		console.log(current, size);
		dispatch({
			type: 'usertablemodels/setState',
			payload: {
				size: size
			}
		});
		dispatch({
			type: 'usertablemodels/GetUsers',
			payload: {
				maxResultCount: size,
				skipCount: (current - 1) * 10
			}
		});
	};
	function onChange(pagination, filters, sorter) {
	
		dispatch({
			type: 'usertablemodels/GetUsers',
			payload: {
				sorting:
					sorter && sorter.column && sorter.column.dataIndex
						? sorter.field + ' ' + (sorter.order == 'ascend' ? 'asc' : 'desc')
						: null,
				maxResultCount: size
			}
		});
	}
	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			 console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			 
			 dispatch({
				 type:'usertablemodels/setState',
				 payload:{
					 Ids:`${selectedRowKeys}`
				 }
			 })
		 },
		// onSelect: (record, selected, selectedRows) => {
		// 	console.log(record, selected, selectedRows);
		// },
		// onSelectAll: (selected, selectedRows, changeRows) => {
		// 	console.log(selected, selectedRows, changeRows);
		// }
	};
	function showTotal(totalCount) {
		return `共 ${totalCount} 条`;
	}
	const Search = Input.Search;
	// 批量操作
	const mores = (
		<Menu>
			<Menu.Item  >批量删除</Menu.Item>
			<Menu.Item >批量解锁</Menu.Item>
			<Menu.Item >批量禁用</Menu.Item>
			<Menu.Item >批量启用</Menu.Item>
		</Menu>
	);
	return (
		<div>
			{/* 编辑 */}

			<CompileUsers/>
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
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
				<div style={{ display: 'flex' }}>
					<AddUsers />
					<Button
						style={{ marginRight: 20 }}
						onClick={() => {
							dispatch({
								type: 'usertablemodels/GetUsersToExcel',
								payload: {
									filter: filter
								}
							});

							if (fileName) {
								window.location =
									'http://220.165.143.82:6810//File/DownloadTempFile?filename=' +
									fileName +
									'&fileType=' +
									fileType +
									'&fileToken=' +
									fileToken;
							}
						}}
					>
						导出到EXCEL
					</Button>
					<Dropdown overlay={mores}>
						<Button>
							更多操作 <Icon type="down" />
							</Button>
					</Dropdown>,
				</div>
			</div>
			<Table
			rowKey='id'
				columns={fullColumns}
				onChange={onChange}
				bordered
				dataSource={users}
				pagination={false}
				rowSelection={rowSelection}
				size="middle"
			/>,
			<LocaleProvider locale={zhCN}>
				<Pagination
					defaultCurrent={1}
					total={totalCount}
					showSizeChanger="true"
					showQuickJumper="true"
					onChange={pages}
					onShowSizeChange={showsize}
					showTotal={showTotal}
					style={{ marginLeft: '1100px' }}
				/>
			</LocaleProvider>
		</div>
	);
}
export default connect(({ usertablemodels }) => ({ ...usertablemodels }))(UserTable);
