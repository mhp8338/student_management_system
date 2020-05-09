import Mock from 'mockjs'

const Random = Mock.Random

// mock需要给三个参数,url(与axios请求是传的url一致,我这个是本地启动的项目就直接用本地域名了)
// 请求类型: get post...其他看文档
// 数据处理函数,函数需要return数据
Mock.mock('http://localhost:8081/test/login', 'post', () => {
    let loginObj = {
        "data": {
            "id": Random.integer(0, 100),
            "rid": Random.integer(0, 10),
            "username": Random.string(0, 11),
            "mobile": Random.string('number', 11),
            "email": Random.email(),
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM"
        },
        "meta": {
            "msg": "登录成功",
            "status": 200
        }
    }
    return loginObj
})

/* menus api */
Mock.mock('http://localhost:8081/test/menus', 'get', () => {
        let menusObj = {
            "data":
                [{
                    "id": 101,
                    "authName": "用户管理", // admin
                    "path": null,
                    "children": [
                        {
                            "id": 1014,
                            "authName": "用户列表",
                            "path": "users",
                            "children": []
                        }
                    ]
                }, {
                    "id": 102,
                    "authName": "权限管理",
                    "path": null,
                    "children": [
                        {
                            "id": 1102,
                            "authName": "角色列表",
                            "path": "roles",
                            "children": []
                        }, {
                            "id": 1103,
                            "authName": "权限列表",
                            "path": "authorize",
                            "children": []
                        }
                    ]
                }, {
                    "id": 103,
                    "authName": "活动管理",
                    "path": null,
                    "children": [
                        {
                            "id": 1033,
                            "authName": "活动列表",
                            "path": "workList",
                            "children": []
                        }
                    ]
                }],
            "meta": {
                "msg": "获取菜单列表成功",
                "status": 200
            }
        }
        return menusObj
    }
)

/* users api */
Mock.mock(RegExp('http://localhost:8081/test/users'), 'get', () => {
    let userObj = {
        "data": {
            "totalpage": 2,
            "pagenum": 1,
            "users": [
                {
                    "id": 25,
                    "username": "admin",
                    "mobile": "18616358651",
                    "type": 1,
                    "email": "tige112@163.com",
                    "create_time": "2017-11-09T20:36:26.000Z",
                    "mg_state": true, // 当前用户的状态
                    "role_name": "炒鸡管理员"
                }, {
                    "id": 26,
                    "username": "大大大",
                    "mobile": "181818181881",
                    "type": 2,
                    "email": "das@163.com",
                    "create_time": "2017-11-09T20:36:26.000Z",
                    "mg_state": false, // 当前用户的状态
                    "role_name": "普通用户"
                }
            ]
        },
        "meta": {
            "msg": "获取用户列表成功",
            "status": 200
        }
    }
    return userObj
})

/* get user by id api */
Mock.mock(RegExp('http://localhost:8081/test/getuserbyid'), 'get', () => {
    return {
        "data": {
            "id": 503,
            "username": "admin3",
            "role_id": 0,
            "mobile": "00000",
            "email": "new@new.com"
        },
        "meta": {
            "msg": "查询成功",
            "status": 200
        }
    }
})

/* update API */
Mock.mock(RegExp('http://localhost:8081/test/users/*'), 'put', () => {
    let stateObj = {
        "data": {
            "id": 26,
            "username": "大大大",
            "role_id": 0,
            "mobile": "181818181881",
            "email": "das@163.com"
        },
        "meta": {
            "msg": "更新用户状态成功",
            "status": 200
        }
    }
    return stateObj
})

/*add user api*/
Mock.mock(RegExp('http://localhost:8081/test/users/*'), 'post', () => {
    let addUserApiObj = {
        "data": {
            "id": 28,
            "username": "tige1200",
            "mobile": "test",
            "type": 1,
            "openid": "",
            "email": "test@test.com",
            "create_time": "2017-11-10T03:47:13.533Z",
            "modify_time": null,
            "is_delete": false,
            "is_active": false
        },
        "meta": {
            "msg": "用户添加成功",
            "status": 201
        }
    }
    return addUserApiObj
})

/*编辑用户提交（修改）api*/
Mock.mock(RegExp('http://localhost:8081/test/edituserinfobyid/*'), 'put', () => {

    return {
        "data": {
            "id": 503,
            "username": "admin3",
            "role_id": 0,
            "mobile": "111",
            "email": "123@123.com"
        },
        "meta": {
            "msg": "编辑用户提交成功",
            "status": 200
        }
    }
})

/*删除用户api*/
Mock.mock(RegExp('http://localhost:8081/test/deleteuser'), 'delete', () => {

    return {
        "data": null,
        "meta": {
            "msg": "删除成功",
            "status": 200
        }
    }
})

/*获取所有权限列表*/
Mock.mock(RegExp('http://localhost:8081/test/rights/list'), 'get', () => {

    return {
        "data": [
            {
                "id": 101,
                "authName": "用户管理",
                "level": "0",
                "pid": 0,
                "path": "asd"
            },
            {
                "id": 102,
                "authName": "权限管理",
                "level": "0",
                "pid": 0,
                "path": "null"
            },
            {
                "id": 103,
                "authName": "活动管理",
                "level": "1",
                "pid": 0,
                "path": "null"
            }
        ],
        "meta": {
            "msg": "获取权限列表成功",
            "status": 200
        }
    }
})

/*获取所有权限列表*/
Mock.mock(RegExp('http://localhost:8081/test/rights/tree'), 'get', () => {

    return {
        data: [
            {
                id: 101,
                authName: '活动管理',
                path: null,
                pid: 0,
                children: [
                    {
                        id: 1001,
                        authName: '活动列表',
                        path: null,
                        pid: 101,
                        children: [
                            {
                                id: 10001,
                                authName: '添加活动',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10002,
                                authName: '删除活动',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10003,
                                authName: '修改活动',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10004,
                                authName: '参加活动',
                                path: null,
                                pid: '104,101'
                            }
                        ]
                    }
                ]
            }, {
                id: 102,
                authName: '权限管理',
                path: null,
                pid: 0,
                children: [
                    {
                        id: 1002,
                        authName: '角色列表',
                        path: null,
                        pid: 101,
                        children: [
                            {
                                id: 10005,
                                authName: '创建角色',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10006,
                                authName: '删除角色',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10007,
                                authName: '编辑角色',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10008,
                                authName: '分配权限',
                                path: null,
                                pid: '104,101'
                            }
                        ]
                    },
                    {
                        id: 1003,
                        authName: '权限列表',
                        path: null,
                        pid: 101,
                        children: [{
                            id: 10014,
                            authName: '查看用户权限',
                            path: null,
                            pid: '104,101'
                        }]
                    }
                ]
            }, {
                id: 103,
                authName: '用户管理',
                path: null,
                pid: 0,
                children: [
                    {
                        id: 1004,
                        authName: '用户列表',
                        path: null,
                        pid: 101,
                        children: [
                            {
                                id: 10009,
                                authName: '添加用户',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10010,
                                authName: '删除用户',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10011,
                                authName: '编辑用户',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10012,
                                authName: '分配角色',
                                path: null,
                                pid: '104,101'
                            },
                            {
                                id: 10013,
                                authName: '控制状态',
                                path: null,
                                pid: '104,101'
                            }
                        ]
                    }
                ]
            }
        ],
        meta: {
            msg: '获取权限列表成功',
            status: 200
        }
    }
})

/*获取所有角色列表*/
Mock.mock(RegExp('http://localhost:8081/test/roles'), 'get', () => {

    return {
        "data": [
            {
                "id": 30,
                "roleName": "超级管理员",
                "roleDesc": "技术负责人",
                "children": [
                    {
                        "id": 101,
                        "authName": "活动管理",
                        "path": null,
                        "children": [
                            {
                                "id": 1001,
                                "authName": "活动列表",
                                "path": null,
                                "children": [
                                    {
                                        "id": 10001,
                                        "authName": "添加活动",
                                        "path": null
                                    }, {
                                        "id": 10002,
                                        "authName": "删除活动",
                                        "path": null
                                    }, {
                                        "id": 10003,
                                        "authName": "修改活动",
                                        "path": null
                                    }, {
                                        "id": 10004,
                                        "authName": "参加活动",
                                        "path": null
                                    }
                                ]
                            }
                        ]
                    }, {
                        "id": 102,
                        "authName": "权限管理",
                        "path": null,
                        "children": [
                            {
                                "id": 1002,
                                "authName": "角色列表",
                                "path": null,
                                "children": [
                                    {
                                        "id": 10005,
                                        "authName": "创建角色",
                                        "path": null
                                    },
                                    {
                                        "id": 10006,
                                        "authName": "删除角色",
                                        "path": null
                                    },
                                    {
                                        "id": 10007,
                                        "authName": "编辑角色",
                                        "path": null
                                    },
                                    {
                                        "id": 10008,
                                        "authName": "分配权限",
                                        "path": null
                                    }
                                ]
                            }, {
                                "id": 1003,
                                "authName": "权限列表",
                                "path": null,
                                "children": [
                                    {
                                        "id": 10014,
                                        "authName": "查看用户权限",
                                        "path": null
                                    }
                                ]
                            }
                        ]
                    }, {
                        "id": 103,
                        "authName": "用户管理",
                        "path": null,
                        "children": [
                            {
                                "id": 1004,
                                "authName": "用户列表",
                                "path": null,
                                "children": [
                                    {
                                        "id": 10009,
                                        "authName": "添加用户",
                                        "path": null
                                    },
                                    {
                                        "id": 10010,
                                        "authName": "删除用户",
                                        "path": null
                                    },
                                    {
                                        "id": 10011,
                                        "authName": "编辑用户",
                                        "path": null
                                    },
                                    {
                                        "id": 10012,
                                        "authName": "分配角色",
                                        "path": null
                                    }, {
                                        "id": 10013,
                                        "authName": "控制状态",
                                        "path": null
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    }
})

/*添加角色API*/
Mock.mock(RegExp('http://localhost:8081/test/addRoles'), 'post', () => {

    return {
        "data": {
            "roleId": 40,
            "roleName": "admin2",
            "roleDesc": "admin2Desc"
        },
        "meta": {
            "msg": "角色创建成功",
            "status": 201
        }
    }
})

/*根据 ID 查询角色API*/
Mock.mock(RegExp('http://localhost:8081/test/getrolebyid'), 'get', () => {

    return {
        "data": {
            "roleId": 31,
            "roleName": "测试角色",
            "roleDesc": "测试负责人"
        },
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    }
})

/*编辑提交角色*/
Mock.mock(RegExp('http://localhost:8081/test/editroleinfobyid'), 'put', () => {

    return {
        "data": {
            "roleId": 31,
            "roleName": "测试角色",
            "roleDesc": "测试角色描述"
        },
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    }
})

/*根据id删除角色*/
Mock.mock(RegExp('http://localhost:8081/test/deleterole'), 'delete', () => {

    return {
        "data": null,
        "meta": {
            "msg": "删除成功",
            "status": 200
        }
    }
})

/*删除角色指定的权限*/
Mock.mock(RegExp('http://localhost:8081/test/rolesright'), 'delete', () => {

    return {
        "data": [
            {
                "id": 101,
                "authName": "活动管理",
                "path": null,
                "children": [
                    {
                        "id": 1001,
                        "authName": "活动列表",
                        "path": null,
                        "children": [
                            {
                                "id": 10001,
                                "authName": "添加活动",
                                "path": null
                            }, {
                                "id": 10002,
                                "authName": "删除活动",
                                "path": null
                            }, {
                                "id": 10003,
                                "authName": "修改活动",
                                "path": null
                            }, {
                                "id": 10004,
                                "authName": "参加活动",
                                "path": null
                            }
                        ]
                    }
                ]
            }, {
                "id": 102,
                "authName": "权限管理",
                "path": null,
                "children": [
                    {
                        "id": 1002,
                        "authName": "角色列表",
                        "path": null,
                        "children": [
                            {
                                "id": 10005,
                                "authName": "创建角色",
                                "path": null
                            },
                            {
                                "id": 10006,
                                "authName": "删除角色",
                                "path": null
                            },
                            {
                                "id": 10007,
                                "authName": "编辑角色",
                                "path": null
                            },
                            {
                                "id": 10008,
                                "authName": "分配权限",
                                "path": null
                            }
                        ]
                    }, {
                        "id": 1003,
                        "authName": "权限列表",
                        "path": null,
                        "children": []
                    }
                ]
            }, {
                "id": 103,
                "authName": "用户管理",
                "path": null,
                "children": [
                    {
                        "id": 1004,
                        "authName": "用户列表",
                        "path": null,
                        "children": [
                            {
                                "id": 10009,
                                "authName": "添加用户",
                                "path": null
                            },
                            {
                                "id": 10010,
                                "authName": "删除用户",
                                "path": null
                            },
                            {
                                "id": 10011,
                                "authName": "编辑用户",
                                "path": null
                            },
                            {
                                "id": 10012,
                                "authName": "分配角色",
                                "path": null
                            }
                        ]
                    }
                ]
            }
        ],
        "meta": {
            "msg": "删除成功",
            "status": 200
        }
    }
})

/*角色授权*/
Mock.mock(RegExp('http://localhost:8081/test/addRightToRoles'), 'post', () => {

    return {
        "data": null,
        "meta": {
            "msg": "更新成功",
            "status": 200
        }
    }
})

/*分配用户角色*/
Mock.mock(RegExp('http://localhost:8081/test/putusers'), 'put', () => {

    return {
        "data": {
            "id": 508,
            "rid": "30",
            "username": "asdf1",
            "mobile": "123123",
            "email": "adfsa@qq.com"
        },
        "meta": {
            "msg": "设置角色成功",
            "status": 200
        }
    }
})

/*活动列表数据*/
Mock.mock(RegExp('http://localhost:8081/test/activity'), 'get', () => {

    return {
        "data": {
            "total": 3,
            "pagenum": "1",
            "activities": [
                {
                    "activity_id": 144,
                    "activity_name": "asfdsd",
                    "activity_desc": "这是一个活动活动",
                    "activity_limit_num": 40,
                    "activity_term": 1,
                    "activity_start_time": 1512954923,
                    "activity_end_time": 1512954923,
                    "activity_deadline": 1512954923,
                    "activity_signIn_time": 1512954923,
                    "activity_signOut_time": 1512954923,
                    "activity_site": "威海校区"
                }, {
                    "activity_id": 145,
                    "activity_name": "zxc",
                    "activity_desc": "这是一个活动活动",
                    "activity_limit_num": 40,
                    "activity_term": 1,
                    "activity_start_time": 1512954923,
                    "activity_end_time": 1512954923,
                    "activity_deadline": 1512954923,
                    "activity_signIn_time": 1512954923,
                    "activity_signOut_time": 1512954923
                }, {
                    "activity_id": 146,
                    "activity_name": "zwx",
                    "activity_desc": "这是一个活动活动",
                    "activity_limit_num": 40,
                    "activity_term": 1,
                    "activity_start_time": 1512954923,
                    "activity_end_time": 1512954923,
                    "activity_deadline": 1512954923,
                    "activity_signIn_time": 1512954923,
                    "activity_signOut_time": 1512954923
                }
            ]
        },
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    }
})

/*根据ID删除活动*/
Mock.mock(RegExp('http://localhost:8081/test/deleteActivitiesById'), 'delete', () => {

    return {
        "data": null,
        "meta": {
            "msg": "删除成功",
            "status": 200
        }
    }
})

/*添加活动*/
Mock.mock(RegExp('http://localhost:8081/test/addActivities'), 'post', () => {

    return {
        "data": {
            "activity_id": 144,
            "activity_name": "asfdsd",
            "activity_desc": "这是一个活动活动",
            "activity_limit_num": 40,
            "activity_term": 1,
            "activity_start_time": 1512954923,
            "activity_end_time": 1512954923,
            "activity_deadline": 1512954923,
            "activity_signIn_time": 1512954923,
            "activity_signOut_time": 1512954923,
            "activity_site": "威海校区"
        },
        "meta": {
            "msg": "创建活动成功",
            "status": 201
        }
    }
})

/*根据ID查活动*/
Mock.mock(RegExp('http://localhost:8081/test/getactivitybyid'), 'get', () => {

    return {
        "data": {
            "activity_id": 1,
            "activity_name": "asfdsd",
            "activity_desc": "这是一个活动活动",
            "activity_limit_num": 40,
            "activity_term": 1,
            "activity_start_time": 1512954923,
            "activity_end_time": 1512954923,
            "activity_deadline": 1512954923,
            "activity_signIn_time": 1512954923,
            "activity_signOut_time": 1512954923,
            "activity_site": "威海校区"
        },
        "meta": {
            "msg": "获取成功",
            "status": 200
        }
    }
})

/*编辑提交活动*/
Mock.mock(RegExp('http://localhost:8081/test/editactivityinfobyid'), 'put', () => {

    return {
        "data": {
            "activity_id": 1,
            "activity_name": "asfdsd",
            "activity_desc": "这是一个活动活动",
            "activity_limit_num": 40,
            "activity_term": 1,
            "activity_start_time": 1512954923,
            "activity_end_time": 1512954923,
            "activity_deadline": 1512954923,
            "activity_signIn_time": 1512954923,
            "activity_signOut_time": 1512954923,
            "activity_site": "威海校区"
        },
        "meta": {
            "msg": "提交成功",
            "status": 200
        }
    }
})

// post请求,带参数,参数会在data中返回,会返回url,type,body三个参数,可以把data打印出来看看
Mock.mock('http://localhost:8081/test/cityInfo', 'post', (data) => {
    // 请求传过来的参数在body中,传回的是json字符串,需要转义一下
    const info = JSON.parse(data.body)
    return {
        img: Random.image('200x100', '#4A7BF7', info.name)
    }
})
