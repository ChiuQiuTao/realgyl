(function(){
    layui.use(["table","laydate"], function() {
        var $ = layui.jquery,
        laydate = layui.laydate,
        table = layui.table;


        laydate.render({
            elem: '#startDate' //指定元素
        });
        laydate.render({
            elem: '#endDate' //指定元素
        });
            /*重置*/
    $(".agains").click(function() {
        window.location.reload();
    })
           //监听头部监听
            table.on('toolbar(testdome)', function(obj) {
                var checkStatus = table.checkStatus(obj.config.id),
                    data = checkStatus.data; //获取选中的数据
                switch (obj.event) {
                    case 'add':
                        if(data.length === 1){
                            window.location.href = "./newpage/newfield.html?addid="+data[0].id;
                        } else{
                            layer.msg('请选择并且只能选择一个');
                        }
                        break;
                    case 'update':
                        if(data.length === 0){
                            layer.msg('请选择一行');
                        } else if(data.length > 1){
                            layer.msg('只能同时编辑一个');
                        } else {
                            
                            window.location.href = "./newpage/newfield.html?id="+data[0].id;
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
                    "plant/basis/deletePlantRepository", {
                        id:id,
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
              var startDate = document.querySelector('#startDate').value;
              var endDate = document.querySelector('#endDate').value;
              var productname = document.querySelector('#productname').value;
              var landid = document.querySelector('#landid').value;
              var areaid = document.querySelector('#areaid').value;
            //获取列表
            var tableIns = table.render({
                elem: "#test",
                url: baseaip + "plant/PlantManage/getPlantFieldManages",
                method: "GET",
                where: {
                    startDate: startDate,
                    endDate: endDate,
                    productname:productname,
                    landid: landid,
                    areaid: areaid,
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
                    field: "endmanagedate",
                    title: "管理日期",
                    minWidth: 120,
                    align: "center",
                    },
                    {
                    field: "ordercode",
                    title: "播种单号",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "basename",
                    title: "基地",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "landname",
                    title: "地块",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "productname",
                    title: "农产品名称",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "batch",
                    title: "批次",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "managecount",
                    title: "管理次数",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "status",
                    title: "采收状态",
                    minWidth: 120,
                    align: "center"
                    },
                ]
                ]
            });
          }
        
      });
     
})()