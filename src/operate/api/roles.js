import network from "./utils";

export default {
    //获取用户列表
    getUserList: params => (network.nodeGet('roles/getUserList', params)),
    // 开通关闭账号
    setLocked: params => (network.node('roles/setLocked', params)),
    // 新增/修改用户
    addUser: params => (network.node('roles/addUser', params)),
    // 删除用户
    delUser: params => (network.node('roles/delUser', params)),
    
    // 获取角色列表
    getRoleList: params => (network.nodeGet('/roles/getRoleList', params)),
    // 新增/修改角色
    addRole: params => (network.node('roles/addRole', params)),
    // 删除角色
    delRole: params => (network.node('roles/delRole', params)),

    // 获取路由列表
    getPersissionList: params => (network.nodeGet('/roles/getPersissionList', params)),
    // 新增/修改路由
    addPersission: params => (network.node('roles/addPersission', params)),
    // 删除路由
    delPersission: params => (network.node('roles/delPersission', params)),
    
    // 添加角色-路由
    addRolePersission: params => (network.node('roles/addRolePersission', params)),
    getRolePersission: params => (network.node('roles/getRolePersission', params)),
    
    // 添加用户-角色
    addUserRole: params => (network.node('roles/addUserRole', params)),
    getUserRole: params => (network.node('roles/getUserRole', params)),


}