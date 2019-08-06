layui.use(['form','element','table', "layer", "util"], function() {
    var $ = layui.jquery,
        table = layui.table,
        layer = layui.layer,
        element = layui.element,
        util = layui.util,
        form=layui.form;

    //监听头部监听 ||新增
    table.on('toolbar(testdome)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id),
            data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'add':
                window.location.href = "./dialog/supplierDialog.html";
                break;
            case 'update':
                if(data.length === 0){
                  layer.msg('请选择一行');
                } else if(data.length > 1){
                  layer.msg('只能同时编辑一个');
                } else {
                    window.location.href = "./dialog/supplierDialog.html?id="+data[0].id;
                }
                break;
            case 'delete':
                if(data.length === 0){
                  layer.msg('请选择一行');
                } else {
                    console.log(data);
                    for(var i=0;i<data.length;i++){
                        delBasEnterpriseById(data[i].id);
                    }
                    // layer.msg('删除成功');
                    setTimeout(function(){
                        getBasEnterprise();

                    },1500)
                }
                break;
        };
    });


    //监听头部监听 ||新增
    table.on('toolbar(personalfilter)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id),
            data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'add':
                window.location.href = "./dialog/supplierDialogR.html";
                break;
            case 'update':
                if(data.length === 0){
                  layer.msg('请选择一行');
                } else if(data.length > 1){
                  layer.msg('只能同时编辑一个');
                } else {
                    window.location.href = "./dialog/supplierDialogR.html?id="+data[0].id;
                }
                break;
            case 'delete':
                if(data.length === 0){
                  layer.msg('请选择一行');
                } else {
                    console.log(data);
                    for(var i=0;i<data.length;i++){
                        delBasPersonById(data[i].id);
                    }
                    setTimeout(function(){
                        getBasPerson();

                    },1500)
                }
                break;
        };
    });


    //监听表格里面按钮
    table.on('tool(testdome)', function(obj) {
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        if(obj.event === 'showImg'){
            console.log(data);
            var photosdata = {
            "title": "营业执照", //相册标题
            "id": 123, //相册id
            "start": 0, //初始显示的图片序号，默认0
            "data": [   //相册包含的图片，数组格式
                {
                // "alt": "图片名",
                "pid": 666, //图片id
                "src": data.imgs, //原图地址
                "thumb": data.imgs //缩略图地址
                }
            ]
            }
            layer.photos({
                photos: photosdata //格式见API文档手册页
                ,anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机
                });
            }
    });

    
    //查询
    document.querySelector('#selectcondition').addEventListener('click', function() {
        getBasEnterprise();
    })
    document.querySelector('#selectperson').addEventListener('click', function() {
        getBasPerson();
    })
    function delBasPersonById(delid){
        Theoldcuiway('plant/deleteGRGYS',
        {
            grkhxxId:delid
        }, "post").done(function(resp) {
            console.log(resp);
            
            layer.msg('删除成功');
            
               return
           }).fail(function(err) {
               console.log(err)

        })
    }
    function delBasEnterpriseById(delid){
        Theoldcuiway(
            "plant/basis/deletePlantEnterpriseaudit", {
                id:delid,
            },
            "POST"
        )
        .done(function(resp) {
            console.log(resp);
            layer.msg('删除成功');
            setTimeout(function(){
                getList();
            },1500)
            return;
        })
        .fail(function(err) {
            console.log(err);
        });
    }
    // 企业供应商
    getBasEnterprise();

    function getBasEnterprise() {
        var enterprisename = $('#enterprisename').val();
        var license = $('#license').val();
        var auditStaus = $('#auditStaus').val();
        //获取列表
        console.log(baseaip);
        var tableIns = table.render({
            elem: "#testee",
            url: baseaip + "plant/basis/getPlantEnterpriseaudits",
            method: "GET",
            where: {
            enterpriseclass:1,
            license: license,
            enterprisename: enterprisename,
            auditstaus:auditStaus,
            },
            headers: {
            Authorization: "Bearer" + " " + sessions
            },
            request: {
            pageName: "page",
            limitName: "limit"
            },
            limits: [10, 20],
            parseData: function(res) {
            //res 即为原始返回的数据
            console.log(res);
            return {
                code: res.code, //解析接口状态
                msg: res.msg, //解析提示文本
                totalNum: res.data.total, //解析数据长度
                lists: res.data.list //解析数据列表
            };
            },
            toolbar: "#toolbarinter",
            response: {
            statusName: "code", //数据状态的字段名称，默认：code
            statusCode: 200, //成功的状态码，默认：0
            msgName: "msg", //状态信息的字段名称，默认：msg
            countName: "totalNum", //数据总数的字段名称，默认：count
            dataName: "lists" //数据列表的字段名称，默认：data
            },
            cellMinWidth: 80,
            page: {
            //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ["prev", "page", "next", "skip", "count"], //自定义分页布局
            //,curr: 5 //设定初始在第 5 页
            groups: 5, //只显示 1 个连续页码
            first: true, //不显示首页
            last: true, //不显示尾页
            prev: "下一页",
            next: "上一页",
            theme: "#c81623"
            },
            // height: 'full-20',//满高
            cols: [
            [
                {
                    type: 'checkbox', 
                    fixed: 'left'
                },{
                title: "编号",
                type: "numbers",
                align: "center",
                },
                {
                field: "enterprisename",
                title: "企业名称",
                minWidth: 120,
                align: "center"
                },
                {
                field: "license",
                title: "营业执照号",
                minWidth: 120,
                align: "center"
                },
                 {
                    field: 'linkman',
                    title: '联系人',
                    align: "center",
                    minWidth: 130
                }, {
                    field: 'linkphone',
                    title: '联系人电话',
                    align: "center",
                    minWidth: 150
                }, {
                    field: 'auditstaus',
                    title: '审核状态',
                    align: "center",
                    minWidth: 100,
                    templet: function(d) {
                        var num = null;
                        console.log(d.auditstaus)
                        if (d.auditstaus == "1") {
                            num = "未审核"
                            return num
                        }

                        if (d.auditstaus == "2") {
                            num = "通过审核"
                            return num
                        }
                        if (d.auditstaus == "3") {
                            num = "未通过审核"
                            return num
                        }
                    }
                }
                            
            ]
            ]
        });
    }



    // 个人供应商/客户
    getBasPerson();

    function getBasPerson() {

        var userName = document.querySelector('#personname').value;
        var idCard = document.querySelector('#personcard').value;
        var auditStaus = document.querySelector('#auditStaus2').value;
        //获取列表
        var tableIns = table.render({
            elem: "#personaltable",
            url: baseaip + "plant/basis/getPlantPersonnels",
            method: "GET",
            where: {
            persontype:1,
            personname: userName,
            personcard: idCard,
            auditstaus:auditStaus,
            },
            headers: {
            Authorization: "Bearer" + " " + sessions
            },
            request: {
            pageName: "page",
            limitName: "limit"
            },
            limits: [10, 20],
            parseData: function(res) {
            //res 即为原始返回的数据
            console.log(res);
            return {
                code: res.code, //解析接口状态
                msg: res.msg, //解析提示文本
                totalNum: res.data.total, //解析数据长度
                lists: res.data.records //解析数据列表
            };
            },
            toolbar: "#toolbarinter",
            response: {
            statusName: "code", //数据状态的字段名称，默认：code
            statusCode: 200, //成功的状态码，默认：0
            msgName: "msg", //状态信息的字段名称，默认：msg
            countName: "totalNum", //数据总数的字段名称，默认：count
            dataName: "lists" //数据列表的字段名称，默认：data
            },
            cellMinWidth: 80,
            page: {
            //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
            layout: ["prev", "page", "next", "skip", "count"], //自定义分页布局
            //,curr: 5 //设定初始在第 5 页
            groups: 5, //只显示 1 个连续页码
            first: true, //不显示首页
            last: true, //不显示尾页
            prev: "下一页",
            next: "上一页",
            theme: "#c81623"
            },
            // height: 'full-20',//满高
            cols: [
            [
                {
                    type: 'checkbox', 
                    fixed: 'left'
                },{
                title: "编号",
                type: "numbers",
                align: "center",
                },
                {
                field: "personcard",
                title: "身份证号",
                minWidth: 120,
                align: "center"
                },
                {
                field: "personname",
                title: "姓名",
                minWidth: 120,
                align: "center"
                },
                {
                field: "address",
                title: "详细地址",
                minWidth: 120,
                align: "center"
                },
                {
                field: "phone",
                title: "联系电话",
                minWidth: 120,
                align: "center"
                }
            ]
            ]
        });
    }


    /*重置*/
    $(".agains").click(function() {
        window.location.reload();
    })
    document.querySelector('.againsperson').addEventListener('click',function(){
        document.querySelector('#personname').value='';
        document.querySelector('#personcard').value='';
        document.querySelector('#auditStaus2').value=1;

        // document.querySelector('#personinline').innerHTML='<select name="persontype" lay-verify="" id="persontype"><option value="1" class="persontypeitem" selected="selected">供应商</option><option value="2" class="persontypeitem">客户</option></select>'
        getBasPerson();

        layui.form.render('select');
    })
    
})