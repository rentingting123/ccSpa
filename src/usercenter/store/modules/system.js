import api from "@/api/utils";
import network from '../../api/network.js'
const state = {
    asideShow: false,//侧边栏是否隐藏
    roleAll: [],//全部角色数据
    orgaAll: [],//组织名称数据
    orgaAllInner: [],//组织名称数据
    fromGroupId: '',//被合并项数据
    toGroupId: '',//合并之后存在数据
    colorBlue: '',//合并之后存在数据显示蓝色
    colorGray: '',//合并之后存在数据显示灰色
    codes: [
        'managerPermission', 'manageAccount', 'manageCollege', 'setPassword', 'setPermission', 'manageOrganization', 'addOrganization',
        'addSubordinate', 'addReport', 'editAuditMessage', 'manageRole', 'addRole', 'editRole', 'delRole', 'managePermissionlist',
        'addPermission', 'editPermission', 'delPermission', 'manageExpertAccount', 'manageExpertGroup', 'manageTemporaryExpert', 'manageMessage'
    ],
    authorityManagement: {}
}

const getters = {
    getAsideShow: state => {
        return state.asideShow
    },
    toGroupId: state => {
        return state.toGroupId
    },
    fromGroupId: state => {
        return state.fromGroupId
    },
    getAuthority: state => {
        return state.authorityManagement
    }

}

const mutations = {
    //全部角色数据
    roleAllSystem(state, data) {
        state.roleAll = data;
    },
    asideShow(state, asideShow) {
        state.asideShow = asideShow
    },
    // 组织名称数据
    orgaAllSystem(state, data) {
        state.orgaAll = data;
    },
    // 组织名称数据
    orgaAllInnerSystem(state, data) {
        state.orgaAllInner = data;
    },
    // 被合并项数据
    fromGroupIdSystem(state, data) {
        state.fromGroupId = data;
    },
    // 合并之后存在数据
    toGroupIdSystem(state, data) {
        state.toGroupId = data;
        console.log(state.toGroupId);
    },
    authorityManagements(state, codes) {
        // console.log(state,codes)
        state.authorityManagement = codes
    },
}

const actions = {
    //全部角色数据
    roleAllSystem({ commit }, data) {
        // const parmas={
        //     id:data.value
        // }
        return new Promise((resolve, reject) => {
            api.get('api/usercenter/role/all', {}).then((res) => {
                // if (res.code === 0) {
                    // _this.alldata = res.data
                    commit('roleAllSystem', res)
                    resolve(res.data)
                // } else {
                //     network.getApiCode(res)
                // }
            })
        })
    },
    // 所有权限
    getAuthority: async function ({ commit, state }, cId) {
        //login判断是否登陆，登陆获取操作权限
        let codes = [].concat(state.codes);
        var res = await api.post('api/usercenter/user/authority', {
            data: { codes: codes },
        }).then(reset => {
            // if (reset.code == 0) {
                let authorityList = {};
                reset.forEach((obj, i) => {
                    authorityList[obj.code] = obj.allow;
                });
                commit('authorityManagements', authorityList)
                // let Authority={}
                // reset.data.forEach(ele => {
                //     Authority[ele.code]=ele.allow
                // });
                // let aut=JSON.stringify(Authority)
                // this.$webapi.savelocal('Authority',aut)
                // this.Authority=JSON.parse(this.$webapi.getlocal("Authority"))
            // } else {
            //     network.getApiCode(reset)
            // }
        })
    },
}

export default ({
    state,
    getters,
    mutations,
    actions
})
