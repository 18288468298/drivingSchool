import React from 'react';
import { connect } from 'dva';
import {
	Table,
	Pagination,
	LocaleProvider,
	Badge,
	Dropdown,
	Icon,
	Menu,
	Input,
	ButtonMenu,
	Button,
	Modal,
	notification,
	Checkbox,
	Popover
} from 'antd';
import moment from 'moment';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AddUsers from './addUsers';
import CompileUsers from './compileuser';
function UserTable({
	dispatch,
	users,
	ceshi,
	totalCount,
	size,
	fileName,
	fileToken,
	fileType,
	filter,
	tree,
	Ids,
	record,
	success,
	names,
	validColumns
}) {
	console.log(validColumns, 123);

	const fullColumns = [
		{
			title: ' 用户名',
			width: 100,
			dataIndex: 'userName',
			key: 'userName',
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
			render: (text, record) =>
				record.isEmailConfirmed ? (
					<span>
						<Badge status="success" />验证
					</span>
				) : (
					<span>
						<Badge status="error" /> 未验证
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
			render: (text, record) =>
				record.isPhoneNumberConfirmed ? (
					<span>
						<Badge status="success" />验证
					</span>
				) : (
					<span>
						<Badge status="error" /> 未验证
					</span>
				)
		},
		{
			title: '启用',
			dataIndex: 'isActive',
			key: '23isActive',
			width: 100,
			render: (text, record) =>
				record.isActive ? (
					<span>
						<Badge status="success" />已启用
					</span>
				) : (
					<span>
						<Badge status="error" /> 已禁用
					</span>
				),
			sorter: true
		},
		{
			title: '锁定',
			dataIndex: 'isLocked',
			key: 'a8',
			width: 100,
			render: (text, record) =>
				record.isLocked ? (
					<span>
						<Badge status="success" />已锁定
					</span>
				) : (
					<span>
						<Badge status="error" /> 未锁定
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
			dataIndex:'operation',
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
					<a
						href="javascript:;"
						onMouseOver={() => {
							dispatch({
								type: 'usertablemodels/setState',
								payload: {
									record: record
								}
							});
						}}
					>
						操作 <Icon type="down" />
					</a>
				</Dropdown>
			)
		}
	];
	// 编辑
	const showModelC = (e) => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleC: true }
		});
	};
	const compile = () => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleA: true }
		});
	};
	const jurisdiction = () => {
		dispatch({
			type: 'usertablemodels/setState',
			payload: { visibleB: true }
		});

		dispatch({
			type: 'usertablemodels/GetUserPermissionsForEdit',
			payload: {
				id: record.id
			}
		});
	};
	const confirm = Modal.confirm;
	// 修改密码
	function showConfirm() {
		console.log(record);
		confirm({
			title: '警告',
			content: '你确定要重置用户' + record.name + '的登录密码么?',
			onOk() {
				dispatch({
					type: 'usertablemodels/ResetUserPassword',
					payload: {
						id: record.id
					}
				});
			},
			onCancel() {
				console.log('Cancel');
			}
		});
	}
	// 禁用
	success
		? Modal.success({
				title: '操作成功',
				content: '您已成功切换' + record.neme + '的禁用状态'
			})
		: null;

	const forbidden = (current) => {
		dispatch({
			type: 'usertablemodels/ToggleActiveStatus',
			payload: {
				id: record.id
			}
		});
		dispatch({
			type: 'usertablemodels/GetUsers',
			payload: {}
		});
	};
	// 删除
	function deletes() {
		console.log(record);
		confirm({
			title: '警告',
			content: '你确定要删除' + record.name + '用户?',
			onOk() {
				dispatch({
					type: 'usertablemodels/DeleteUser',
					payload: {
						id: record.id
					}
				});
				dispatch({
					type: 'usertablemodels/GetUsers',
					payload: {}
				});
			},
			onCancel() {
				console.log('Cancel');
			}
		});
	}
	const menus = (
		<Menu>
			<Menu.Item>
				<a href="javascript:;" onClick={compile}>
					编辑
				</a>
			</Menu.Item>
			<Menu.Item>
				<a href="javascript:;" onClick={jurisdiction}>
					修改权限
				</a>
			</Menu.Item>
			<Menu.Item>
				<a href="javascript:;" onClick={showConfirm}>
					重置密码
				</a>
			</Menu.Item>
			<Menu.Item>
				<a href="javascript:;" onClick={showModelC}>
					修改密码
				</a>
			</Menu.Item>
			<Menu.Item>
				<a href="javascript:;" onClick={forbidden}>
					{record.isActive ? '禁用' : '启用'}
				</a>
			</Menu.Item>
			<Menu.Item>
				<a href="javascript:;" onClick={deletes}>
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
				type: 'usertablemodels/setState',
				payload: {
					Ids: selectedRowKeys,
					names: selectedRows
				}
			});
		}
	};
	function showTotal(totalCount) {
		return `共 ${totalCount} 条`;
	}
	const Search = Input.Search;
	// 批量操作

	//
	const batchDeleteUser = () => {
		confirm({
			title: '警告',
			content: '你确定要删除' + names[0].name + '等' + Ids.length + '名用户?',
			onOk() {
				dispatch({
					type: 'usertablemodels/BatchDeleteUser',
					payload: {
						value: Ids
					}
				});
				dispatch({
					type: 'usertablemodels/GetUsers',
					payload: {}
				});
			},
			onCancel() {}
		});
	};
	const batchActiveUser = () => {
		confirm({
			title: '警告',
			content: '你确定要启用' + names[0].name + '等' + Ids.length + '名用户?',
			onOk() {
				dispatch({
					type: 'usertablemodels/BatchActiveUser',
					payload: {
						Ids: Ids,
						isActive: true,
						value: Ids
					}
				});
				dispatch({
					type: 'usertablemodels/GetUsers',
					payload: {}
				});
			},
			onCancel() {}
		});
	};
	const batchActiveUserA = () => {
		confirm({
			title: '警告',
			content: '你确定要禁用' + names[0].name + '等' + Ids.length + '名用户?',
			onOk() {
				dispatch({
					type: 'usertablemodels/BatchActiveUser',
					payload: {
						Ids: Ids,
						value: Ids,
						isActive: false
					}
				});
				dispatch({
					type: 'usertablemodels/GetUsers',
					payload: {}
				});
			},
			onCancel() {}
		});
	};
	const batchUnlockUser = () => {
		confirm({
			title: '警告',
			content: '你确定要解锁' + names[0].name + '等' + Ids.length + '名用户?',
			onOk() {
				dispatch({
					type: 'usertablemodels/BatchUnlockUser',
					payload: {
						Ids: Ids,
						value: Ids
					}
				});
				dispatch({
					type: 'usertablemodels/GetUsers',
					payload: {}
				});
			},
			onCancel() {}
		});
	};
	const mores = (
		<Menu>
			<Menu.Item onClick={batchDeleteUser}>批量删除</Menu.Item>
			<Menu.Item onClick={batchUnlockUser}>批量解锁</Menu.Item>
			<Menu.Item onClick={batchActiveUserA}>批量禁用</Menu.Item>
			<Menu.Item onClick={batchActiveUser}>批量启用</Menu.Item>
		</Menu>
	);
	// 按需加载
	let columns = fullColumns.filter(function(column) {
		return validColumns.filter((v) => v == column.dataIndex).length > 0;
	});
	function onChanges(dataIndex, e) {
		
		if (e.target.checked) {
			validColumns.push(dataIndex);
		} else {
			validColumns = validColumns.filter((v) => v != dataIndex);
		}
		dispatch({
			type: 'usertablemodels/setState',
			payload: { validColumns: JSON.parse(JSON.stringify(validColumns)) }
		});
	}
	const alls=()=>{
		dispatch({
			type: 'usertablemodels/setState',
			payload: {
				validColumns:['name','userName','id','roles[0].roleName','emailAddress',
				'phoneNumber','isEmailConfirmed','isPhoneNumberConfirmed',
			'isActive','isLocked','lastLoginTime','creationTime','idCode','operation']
			 }
		});
	}
	const content = (
		<div style={{ width: '300px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
				<span>列表显示条目</span>
				<a href="javascript:;" onClick={alls

				}>恢复默认</a>
			</div>
			{fullColumns.map((column) => (
				
				<Checkbox
					style={{ margin: '0', width: '50%' }}
					checked={validColumns.filter((v) => v == column.dataIndex).length > 0}
					onChange={onChanges.bind(this, column.dataIndex)}
				>
				
					{column.title}
				</Checkbox>
			))}
		</div>
	);
	return (
		<div>
			{/* 编辑 */}
			<CompileUsers />
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
					</Dropdown>
					<div style={{ marginLeft: '1092px' }}>
					<Popover placement="bottom" content={content} title="列表显示条目">
						<Button>
							自定义列表条目 <Icon type="down" />
						</Button>
					</Popover>
					</div>
				</div>
			</div>
			<Table
				rowKey="id"
				columns={columns}
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
