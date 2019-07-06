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
            var putseedclass = '';
            var basename = '';
            var landname = '';
            var storagename = '';
            var areaname = '';

            var plantStockBatchId ='';
            var plantCommodityId = '';
            var plantInputSeedId = '';
        //时间
        laydate.render({
            elem: '#managedate' //指定元素 
        });
        
        //监听头部监听
        table.on('toolbar(testdome)', function(obj) {
            var checkStatus = table.checkStatus(obj.config.id),
                data = checkStatus.data; //获取选中的数据
            switch (obj.event) {
                case 'harvest':
                        if (data.length === 0) {
                            layer.msg('请选择一行');
                        } else {
                    document.querySelector('.showharvest').style.display='block';
                        }
                    // obj.stopPropagation();
                    break;
                case 'delete':
                    if (data.length === 0) {
                        layer.msg('请选择一行');
                    } else {
                        // deleteId(data[0].id);
                        layer.msg('请选择一行');
                    }
                    break;
            };
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
                layui.form.render("select");
                return
            }).fail(function(err) {
            });
        }
        // 获取基地
        getPlantBaseList();
        function getPlantBaseList(){
            var baseid = document.querySelector('#baseid');
            Theoldcuiway('plant/getPlantBaseList', { 
            }, "GET").done(function(resp) {
                console.log(111)
                console.log(resp);
                for(var i=0;i<resp.data.length;i++){
                    baseid.innerHTML = baseid.innerHTML+'<option value="'+resp.data[i].baseid+'">'+resp.data[i].basename+'</option>';
                }
                layui.form.render("select");
                return
            }).fail(function(err) {
            }); 
        }
        function getLandListByBase(id){
            var landid = document.querySelector('#landid');
            Theoldcuiway('plant/getLandListByBase', { 
                baseid:id
            }, "GET").done(function(resp) {
                console.log(resp);
                landid.innerHTML = '<option value="">请选择</option>';
                for(var i=0;i<resp.data.length;i++){
                    landid.innerHTML = landid.innerHTML+'<option value="'+resp.data[i].landid+'">'+resp.data[i].landname+'</option>';
                }
                layui.form.render("select");
                return
            }).fail(function(err) {
            }); 
        }



        // 获取仓库
        getOneRepostoryList();
        function getOneRepostoryList(){
            var storageid = document.querySelector('#storageid');
            Theoldcuiway('plant/getOneRepostoryList', { 
            }, "GET").done(function(resp) {
                console.log(resp);
                for(var i=0;i<resp.data.length;i++){
                    storageid.innerHTML = storageid.innerHTML+'<option value="'+resp.data[i].parentid+'">'+resp.data[i].parentname+'</option>';
                }
                layui.form.render("select");
                return
            }).fail(function(err) {
            }); 
        }
        function getTwoRepostoryList(id){
            var areaid = document.querySelector('#areaid');
            Theoldcuiway('plant/getTwoRepostoryList', { 
                parentid:id
            }, "GET").done(function(resp) {
                console.log(resp);
                areaid.innerHTML = '<option value="">请选择</option>';
                for(var i=0;i<resp.data.length;i++){
                    areaid.innerHTML = areaid.innerHTML+'<option value="'+resp.data[i].repositoryid+'">'+resp.data[i].repositoryname+'</option>';
                }
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
                var para = url.split("&");
                var len = para.length;
                var res = {};
                var arr = [];
                for(var i=0;i<len;i++){
                    arr = para[i].split("=");
                    res[arr[0]] = arr[1];
                }
                if(res.id){
                    getEnterpriseById(res.id);
                }else{
                    plantInputSeedId = res.addid;
                }
                console.log(res)
            }else{
            }
            
        }
        function getEnterpriseById(id){
            console.log(id)
            Theoldcuiway('plant/PlantManage/getPlantInputProduct', 
            { id: id },
             "GET").done(function(resp) {
                console.log('__________')
                console.log(resp)
               
                
                document.querySelector('#chargeperson').value=resp.data.chargeperson,
                plantInputSeedId=resp.data.plantInputSeedId,
                document.querySelector('#putseedclass').value=resp.data.putseedclass,
                plantStockBatchId=resp.data.plantStockBatchId,
                getList1(resp.data.putseedclass);
                document.querySelector('#outputnum').value=resp.data.outputnum,
                document.querySelector('#orderdate').value=resp.data.orderdate;
                setTimeout(function(){
                    document.querySelector('#chargeperson').value = resp.data.chargeperson;
                    layui.form.render("select");
                },500)
                getList2();
                // if(resp.data.list[0]){
                //     document.querySelector('#managedate').value = resp.data.list[0].managedate,
                //     document.querySelector('#measureManageName').value = resp.data.list[0].measureManageName;
                //     document.querySelector('#manageType').value = resp.data.list[0].manageType;
                //     document.querySelector('#remark').value = resp.data.list[0].remark;
                //     setTimeout(function(){
                //         document.querySelector('#chargeperson').value = resp.data.list[0].chargeperson;
                //         layui.form.render("select");
                //     },500)
                // }
                
                // getList();
                return
            }).fail(function(err) {
                console.log(err)
            });
        }
        table.on('radio(testdome)', function(obj){
            console.log(obj.data);
            plantInputSeedId = obj.data.id;//库存批次表id
        });
        form.on('select(baseid)', function(data) {
            // putseedclass=data.elem[data.elem.selectedIndex].innerHTML;
            // console.log(data.elem[data.elem.selectedIndex].innerHTML);
            getLandListByBase(data.value);
        });
        form.on('select(landid)', function(data) {
            // putseedclass=data.elem[data.elem.selectedIndex].innerHTML;
            // console.log(data.elem[data.elem.selectedIndex].innerHTML);
            getList(data.value);
        });
        form.on('select(storageid)', function(data) {
            storagename=data.elem[data.elem.selectedIndex].innerHTML;
            // console.log(data.elem[data.elem.selectedIndex].innerHTML);
            getTwoRepostoryList(data.value);
        });
        form.on('select(areaid)', function(data) {
            areaname=data.elem[data.elem.selectedIndex].innerHTML;
            // console.log(data.elem[data.elem.selectedIndex].innerHTML);
            
        });
        document.querySelector('#uploadImg').addEventListener('click',function(){
            uploadImg();
        })
       
        
        //新增
        function uploadImg(){
            Theoldcuiway(
                "plant/PlantManage/savePlantPick", {
                    orderdate:document.querySelector('#orderdate').value,
                    chargeperson:document.querySelector('#chargeperson').value,
                    // baseid:document.querySelector('#baseid').value,
                    plantInputSeedId:plantInputSeedId,
                    // landid:document.querySelector('#landid').value,
                    weight:document.querySelector('#weight').value,
                    pickBatch:document.querySelector('#pickBatch').value,
                    storageid:document.querySelector('#storageid').value,
                    storagename:storagename,
                    areaid:document.querySelector('#areaid').value,
                    areaname:areaname,
                    level:document.querySelector('#level').value,
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../harvest.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }

      
        function getList(id){
             
            //获取列表
            var tableIns = table.render({
                elem: "#test",
                url: baseaip + "plant/PlantManage/getPlantInputSeedStatusInFalseByLandid",
                method: "GET",
                where: {
                    landid:id
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
                    console.log(plantStockBatchId);
                    console.log('111');
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].id==plantStockBatchId){
                            res.data[i].LAY_CHECKED=true;
                        }
                    }
                    
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
                    field: "productname",
                    title: "农产品名字",
                    minWidth: 120,
                    align: "center",
                    },
                   
                    {
                    field: "putseedname",
                    title: "种子名字",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "batch",
                    title: "种子批次",
                    minWidth: 120,
                    align: "center",
                    },
                   
                ]
                ]
            });
        }



        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../harvest.html";
        })
    })


})()