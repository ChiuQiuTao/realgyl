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

            var plantStockFruitBatchId ='';
            var plantCommodityId = '';
            var plantInputSeedId = '';
        //时间
        laydate.render({
            elem: '#orderdate' //指定元素 
        });
        
        
        var dels;
        if(document.querySelector('.btns-del')){
            dels=document.querySelectorAll('.btns-del');
        }
        $("#addproject").click(function() {
            console.log('1111')
            $(".border").append('<div class="border-item"><div class="layui-form-item layui-form-item-a"><div class="layui-inline layui-inline-a"><label class="layui-form-label">检测机构:</label><div class="layui-input-inline"><input type="text" class="layui-input proname"/></div></div></div><div class="layui-form-item layui-form-item-a"><div class="layui-inline layui-inline-a"><label class="layui-form-label">检测依据:</label><div class="layui-input-inline"><input type="text" class="layui-input proresult"/></div></div></div><div class="layui-bg-green comquery btns-del">删除</div></div>')
            dels=document.querySelectorAll('.btns-del');
            for(var i=0;i<dels.length;i++){
                (function(i){
                    dels[i].addEventListener('click',function(){
                        if(dels[i].parentNode.parentNode){
                            dels[i].parentNode.parentNode.removeChild(dels[i].parentNode);
                        }
                    })
                })(i)
            }
        })
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


        // 获取农产品全部列表
        getAllCommodityList();
        function getAllCommodityList(){
            var productname = document.querySelector('#productname');
            Theoldcuiway('plant/getAllCommodityList', { 
            }, "GET").done(function(resp) {
                console.log(resp);
                for(var i=0;i<resp.data.length;i++){
                    productname.innerHTML = productname.innerHTML+'<option value="'+resp.data[i].plantCommodityId+'">'+resp.data[i].productname+'</option>';
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
                document.querySelector('#uploadImg').style.display = 'none';
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
            Theoldcuiway('plant/PlantManage/getPlantTest', 
            { id: id },
             "GET").done(function(resp) {
                console.log('__________')
                console.log(resp)
                document.querySelector('#orderdate').value=resp.data.plantTest.orderdate,
                plantStockFruitBatchId=resp.data.plantTest.plantStockFruitBatchId,
                // document.querySelector('#chargeperson').value=resp.data.chargeperson,
                document.querySelector('#testWeight').value=resp.data.plantTest.testWeight,
                document.querySelector('#testLocation').value=resp.data.plantTest.testLocation,
                document.querySelector('#testOrgnazation').value=resp.data.plantTest.testOrgnazation,
                document.querySelector('#testBasic').value=resp.data.plantTest.testBasic,
                testNameResult=resp.data.plantTest.testNameResult,
                testNameResult = JSON.parse(testNameResult);
                console.log(testNameResult);
                for(var i=0;i<testNameResult.length;i++){
                    if(i==0){
                        var name = document.querySelectorAll('.proname');
                        var Result = document.querySelectorAll('.proresult');
                        name[i].value=testNameResult[0].names;
                        Result[i].value=testNameResult[0].result;

                    }else{
                        $(".border").append('<div class="border-item"><div class="layui-form-item layui-form-item-a"><div class="layui-inline layui-inline-a"><label class="layui-form-label">检测机构:</label><div class="layui-input-inline"><input type="text" class="layui-input proname"/></div></div></div><div class="layui-form-item layui-form-item-a"><div class="layui-inline layui-inline-a"><label class="layui-form-label">检测依据:</label><div class="layui-input-inline"><input type="text" class="layui-input proresult"/></div></div></div><div class="layui-bg-green comquery btns-del">删除</div></div>')
                        var name = document.querySelectorAll('.proname');
                        var Result = document.querySelectorAll('.proresult');
                        name[i].value=testNameResult[i].names;
                        Result[i].value=testNameResult[i].result;
                    }
                }
                if(testNameResult.length>1){
                    
                }
                $('#showimg').attr('src', resp.data.plantTest.file)
                document.querySelector('#pickBatch').value=resp.data.plantStockFruitBatch.pickBatch
                document.querySelector('#storagename').value=resp.data.plantStockFruitBatch.storagename
                document.querySelector('#areaname').value=resp.data.plantStockFruitBatch.areaname
                document.querySelector('#weight').value=resp.data.plantStockFruitBatch.weight


                if(resp.data.testResult){
                    document.querySelector('#testResult').value=1
                }else{
                    document.querySelector('#testResult').value=0
                }
                console.log(resp.data.plantCommodityId)
                // getList(resp.data.plantCommodityId);
                setTimeout(function(){
                    document.querySelector('#productname').value=resp.data.plantTest.plantCommodityId,
                    document.querySelector('#chargeperson').value = resp.data.plantTest.chargeperson;
                    layui.form.render("select");
                },500)
                return
            }).fail(function(err) {
                console.log(err)
            });
        }
        table.on('radio(testdome)', function(obj){
            console.log(obj.data);
            plantStockFruitBatchId = obj.data.id;//库存批次表id
            document.querySelector('#pickBatch').value=obj.data.pickBatch
            document.querySelector('#storagename').value=obj.data.storagename
            document.querySelector('#areaname').value=obj.data.areaname
            document.querySelector('#weight').value=obj.data.weight
        });
    
        form.on('select(productname)', function(data) {
            // productname=data.elem[data.elem.selectedIndex].innerHTML;
            // console.log(data.elem[data.elem.selectedIndex].innerHTML);
            getList(data.value);
            
           

            
        });
        document.querySelector('#uploadImg').addEventListener('click',function(){
            uploadImg();
        })
       
        
        //指定允许上传的文件类型
        layui.upload.render({
            elem: '#selectImg'
            ,url: baseaip+"plant/file/upload"
            ,headers: {
                Authorization: "Bearer" + " " + sessions
            }
            ,accept: 'file'
            ,exts: 'doc|docx|pdf|png|jpg'
            ,field:"file"
            ,done: function(res){
                var filePath = res.data;
                filePath = filePath.substring(0,filePath.length - 1 );
                document.querySelector("#imgpath").value=filePath;
                $('#showimg').attr('src', filePath)
                console.log(filePath);
            }
        });
        //新增
        function uploadImg(){

            var names = document.querySelectorAll('.proname');
            var proresults = document.querySelectorAll('.proresult');
            var testNameResult=[];
            for(var i=0;i<names.length;i++){
                testNameResult.push({"names":names[i].value,"result":proresults[i].value})
                
            }
            testNameResult=JSON.stringify(testNameResult);
            console.log(testNameResult);
            Theoldcuiway(
                "plant/PlantManage/savePlantTest", {
                    orderdate:document.querySelector('#orderdate').value,
                    plantStockFruitBatchId:plantStockFruitBatchId,
                    chargeperson:document.querySelector('#chargeperson').value,
                    testWeight:document.querySelector('#testWeight').value,
                    testLocation:document.querySelector('#testLocation').value,
                    testOrgnazation:document.querySelector('#testOrgnazation').value,
                    testBasic:document.querySelector('#testBasic').value,
                    testNameResult:testNameResult,
                    testResult:document.querySelector('#testResult').value,
                    file:document.querySelector('#imgpath').value,
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../detection.html'
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
                url: baseaip + "plant/PlantManage/getpickBatchList",
                method: "GET",
                where: {
                    plantCommodityId:id
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
                    console.log(plantStockFruitBatchId);
                    console.log('111');
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].id==plantStockFruitBatchId){
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
                    field: "storagename",
                    title: "仓库名称",
                    minWidth: 120,
                    align: "center",
                    },
                   
                    {
                    field: "areaname",
                    title: "二级仓库名称",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "pickBatch",
                    title: "批次",
                    minWidth: 120,
                    align: "center",
                    },
                    {
                    field: "weight",
                    title: "库存重量(KG)",
                    minWidth: 120,
                    align: "center",
                    },
                    
                ]
                ]
            });
        }



        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../detection.html";
        })
    })


})()