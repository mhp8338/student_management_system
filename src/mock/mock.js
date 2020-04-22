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


// post请求,带参数,参数会在data中返回,会返回url,type,body三个参数,可以把data打印出来看看
Mock.mock('http://localhost:8081/test/cityInfo', 'post', (data) => {
    // 请求传过来的参数在body中,传回的是json字符串,需要转义一下
    const info = JSON.parse(data.body)
    return {
        img: Random.image('200x100', '#4A7BF7', info.name)
    }
})
