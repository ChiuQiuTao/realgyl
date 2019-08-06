(function() {
    layui.use(['upload', 'form', 'element', 'table', "layer", "laydate", "util"], function() {
        var $ = layui.jquery,
            table = layui.table,
            layer = layui.layer,
            laydate = layui.laydate,
            util = layui.util,
            form = layui.form,
            element = layui.element,
            upload = layui.upload;
            var enterprisename = '',
            storagename = '',
            areaname = '';
            var plantSellingId='';
            var clientName='';
        //时间
        laydate.render({
            elem: '#orderdate' //指定元素 
        });
       
        
        // 获取负责人列表
        getckrzr();
        function getckrzr(){
            var chargeperson = document.querySelector('#chargeperson');
            Theoldcuiway('plant/getPlantChargePerson', { 
            }, "GET").done(function(resp) {
                console.log(resp);
                for(var i=0;i<resp.data.length;i++){
                    chargeperson.innerHTML = chargeperson.innerHTML+'<option value="'+resp.data[i].name+'">'+resp.data[i].name+'</option>';
                }
                console.log(resp);
                layui.form.render("select");
                return
            }).fail(function(err) {
            });
        }


        // 供应商/客户列表
        function getSupplierAndClient(type){
            var clientName = document.querySelector('#clientName');
            Theoldcuiway('plant/getSupplierAndClient', { 
                type:type,
                enterpriseclass:2,
            }, "GET").done(function(resp) {
                console.log(resp);
                clientName.innerHTML = '<option value="">请选择</option>'
                for(var i=0;i<resp.data.length;i++){
                    clientName.innerHTML = clientName.innerHTML+'<option value="'+resp.data[i].id+'">'+resp.data[i].name+'</option>';
                }
                console.log(resp);
                layui.form.render("select");
                return
            }).fail(function(err) {
            });
        }
       
        getHrefId();
        function getHrefId(){
            var loc = location.href;
            var url = loc.split("?")[1];
            if(url && url!=''){
                document.querySelector('#uploadImg').style.display='none';
                // document.querySelector('#update').style.display='block';
                var para = url.split("&");
                var len = para.length;
                var res = {};
                var arr = [];
                for(var i=0;i<len;i++){
                    arr = para[i].split("=");
                    res[arr[0]] = arr[1];
                }
                getEnterpriseById(res.id);
                // updateImg(res.id);
                console.log(res.id)
                // document.querySelector('#update').addEventListener('click',function(){
                //     updateInfo(res.id);
                // })
            }else{
            }
            
        }
        
        form.on('select(clientType)', function(data) {
            // enterprisename=data.elem[data.elem.selectedIndex].innerHTML;
            // console.log(data.elem[data.elem.selectedIndex].innerHTML);
            getSupplierAndClient(data.value);
        });
        form.on('select(clientName)', function(data) {
            clientName=data.elem[data.elem.selectedIndex].innerHTML;
            getList(data.value);
            // console.log(data.elem[data.elem.selectedIndex].innerHTML);
        });


        
        

        document.querySelector('#uploadImg').addEventListener('click',function(){
            uploadImg();
        })
        
        //新增
        function uploadImg(){
            Theoldcuiway(
                "plant/StockSellSaveManage/savePlantReturn", {
                    clientType:$('#clientType').val(),
                    clientId:$('#clientName').val(),
                    clientName:clientName,
                    orderdate:$('#orderdate').val(),
                    chargeperson:$('#chargeperson').val(),
                    plantSellingId:plantSellingId,
                    returnCause:$('#returnCause').val(),
                    returnWeight:$('#returnWeight').val(),
                    processMode:$('#processMode').val(),
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../productreturn.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }

        
        table.on('radio(testdome)', function(obj){
            console.log(obj.data);
            plantSellingId = obj.data.id;//库存批次表id
           
        });
          function getList(id){
            
            //获取列表
            var tableIns = table.render({
                elem: "#test",
                url: baseaip + "plant/StockSellSaveManage/getYesReturnList",
                method: "GET",
                where: {
                    clientId:id
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
                    totalNum: res.data.length, //解析数据长度
                    lists: res.data //解析数据列表
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
                        type: 'radio', 
                        fixed: 'left'
                    },{
                    title: "编号",
                    type: "numbers",
                    align: "center",
                    },
                   
                    {
                    field: "ordercode",
                    title: "销售单号",
                    minWidth: 120,
                    align: "center",
                    },
                    {
                    field: "orderdate",
                    title: "销售日期",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "sellingWeight",
                    title: "销售重量",
                    minWidth: 120,
                    align: "center",
                    },
                    {
                    field: "pickBatch",
                    title: "采收批次",
                    minWidth: 120,
                    align: "center"
                    },
                    
                    {
                    field: "productname",
                    title: "农产品名称",
                    minWidth: 120,
                    align: "center"
                    },
                   
                ]
                ]
            });
        }



        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../productreturn.html";
        })
    })


})()