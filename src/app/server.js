"use strict";
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// 设置学生成绩信息
var score = [
    { id: '01', RFID: 100, Web: 100 },
    { id: '02', RFID: 99, Web: 99 }
];

// 设置学生用户
var USERS = [
    { id: '01', userName: 'ych', password: '123456' },
    { id: '02', userName: 'fph', password: '123456' }
];
//设置管理员账号,只有一个
const administrator = [
    { id: '0', userName: 'admin', password: 'admin' }
];

var current = { id: '', userName: '', password: '' };

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept, X - Requested - With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
});

//获取学生信息名单
app.get('/users', function (req, resp) {
    resp.send(USERS);
    resp.end();
});

//查询id对应学生信息
app.get('/users/:id', function (req, resp) {
    const id = req.params.id;
    console.log(id);
    for (let user of USERS) {
        if (user.id === req.params.id) {
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

app.get('/usersName/:userName', function (req, resp) {
    const userName = req.params.userName;
    for (let user of USERS) {
        if (user.userName === userName) {
            console.log(true);
            resp.send([user]);
            break;
        }
    }
    resp.end();
});

//监听8080端口
app.listen(8080, function () {
    console.log('服务器在8080端口启动！');
});

app.post('/userid', function (req, resp) {
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            resp.send({ succ: true });
            founded = true;
        }
    }
    if (founded == false) {
        resp.send({ succ: false });
    }
    resp.end();
})

//查询学生信息是否存在
app.post('/users', function (req, resp) {
    let founded = false;
    for (let user of USERS) {
        if (user.userName === req.body.userName && user.password === req.body.password) {
            resp.send({ succ: true });
            founded = true;
        }
    }
    if (founded == false) {
        resp.send({ succ: false });
    }
    resp.end();
});

//添加学生用户，学号唯一
app.post('/user', function (req, resp) {
    let founded = true;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            resp.send({ succ: false });
            founded = false;
        }
    }
    if (founded == true) {
        USERS.push(req.body);
        resp.send({ succ: true });
    }
    resp.end();
});

//修改学生信息，根据id
app.put('/user', function (req, resp) {
    let founded = false;
    for (let user of USERS) {
        if (user.id === req.body.id) {
            user.userName = req.body.userName;
            user.password = req.body.password;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

//删除学生信息
app.delete('/user/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let user of USERS) {
        if (user.id === req.params.id) {
            USERS.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});


//验证管理员账户
app.post('/admin', function (req, resp) {
    for (let ad of administrator) {
        if (ad.userName === req.body.userName && ad.password === req.body.password) {
            resp.send({ succ: true });
            break;
        }
    }
    resp.end();
});

app.post('/current', function (req, resp) {
    current.id = req.body.id;
    current.password = req.body.password;
    current.userName = req.body.userName;
    resp.send({ succ: true });
    console.log(current);
    resp.end();
})

app.get('/current', function (req, resp) {
    resp.send(current);
    resp.end();
})

app.get('/score', function (req, resp) {
    resp.send(score);
    resp.end();
})
app.get('/score/:id', function (req, resp) {
    const id = req.params.id;
    for (let sc of score) {
        if (sc.id === req.params.id) {
            resp.send([sc]);
            break;
        }
    }
    resp.end();
});

app.post('/score', function (req, resp) {
    let founded = true;
    for (let sc of score) {
        if (sc.id === req.body.id) {
            resp.send({ succ: false });
            founded = false;
        }
    }
    if (founded == true) {
        score.push(req.body);
        resp.send({ succ: true });
    }
    resp.end();
});

//修改学生成绩信息，根据id
app.put('/score', function (req, resp) {
    let founded = false;
    for (let sc of score) {
        if (sc.id === req.body.id) {
            sc.WEB = req.body.Web;
            sc.RFID = req.body.RFID;
            founded = true;
            break;
        }
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});

//删除学生成绩信息
app.delete('/score/:id', function (req, resp) {
    let founded = false;
    let index = 0;
    for (let sc of score) {
        if (sc.id === req.params.id) {
            score.splice(index, 1);
            founded = true;
            break;
        }
        index++;
    }
    if (founded) {
        resp.send({ succ: true });
    }
    else {
        resp.send({ succ: false, msg: '没有找到用户！' });
    }
    resp.end();
});