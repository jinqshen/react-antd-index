import React from 'react';
import { Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setRoles } from '@/store/actions/user';
import { closeOtherTab } from '@/store/actions/visitedhistory';

function Permission() {

    const dispatch = useDispatch();

    const changeAdminRole = () => {
        dispatch(setRoles(['admin']));
	}

	const changeBasicRole = () => {
        dispatch(setRoles(['visitor']));
        dispatch(closeOtherTab('changerole'));
	}

    return (
        <Space>
            <Button type="primary" onClick={changeAdminRole}>修改为管理员权限</Button>
            <Button type="primary" onClick={changeBasicRole}>修改为普通用户权限</Button>
            <Link to="/react-admin/manager/articlemgr">文章管理页(普通用户无法访问)</Link>
        </Space>
    )
}

export default Permission;