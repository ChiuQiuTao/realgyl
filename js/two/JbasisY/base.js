(function(){
    layui.use(["table"], function() {
        var $ = layui.jquery,
          table = layui.table;
        

           /*重置*/
    $(".reset").click(function() {
        window.location.reload();
    })
           //监听头部监听
            table.on('toolbar(testdome)', function(obj) {
                var checkStatus = table.checkStatus(obj.config.id),
                    data = checkStatus.data; //获取选中的数据
                switch (obj.event) {
                    case 'add':
                            window.location.href = "./dialog/baseDialog.html";
                        break;
                    case 'update':
                        if(data.length === 0){
                            layer.msg('请选择一行');
                        } else if(data.length > 1){
                            layer.msg('只能同时编辑一个');
                        } else {
                            
                            window.location.href = "./dialog/baseDialog.html?id="+data[0].id;
                        }
                        break;
                    case 'delete':
                        if (data.length === 0) {
                            layer.msg('请选择一行');
                        } else {
                            deleteId(data[0].id);
                        }
                        break;
                };
            });

            function deleteId(id){
                Theoldcuiway(
                    "plant/deleteJdxx", {
                        jdxxId:id,
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
          document.querySelector('.Rawquery').addEventListener('click',function(){
            getList();
          })
          getList();
          function getList(){
              var landName = document.querySelector('.landName').value
            //获取列表
            var tableIns = table.render({
                elem: "#test",
                url: baseaip + "breed/bases",
                method: "GET",
                where: {
                    baseName:''
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
                    totalNum: res.data.totalElements, //解析数据长度
                    lists: res.data.content //解析数据列表
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
                    field: "landname",
                    title: "基地名称",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "chargeperson",
                    title: "负责人",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "phone",
                    title: "联系电话",
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
                    field: "floorarea",
                    title: "占地面积(m2)",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "coveredarea",
                    title: "建筑面积()m2",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "environment",
                    title: "产地环境",
                    minWidth: 100,
                    align: "center"
                    },
                ]
                ]
            });
          }
        
      });
})()