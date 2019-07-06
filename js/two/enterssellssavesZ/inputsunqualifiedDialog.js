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
            putseedname='';
            var stockBatchId ='';
        //时间
        laydate.render({
            elem: '#expectno' //指定元素 
        });
        laydate.render({
            elem: '#factorydate' //指定元素
        });


        //监听行单击事件（单击事件为：rowDouble）
        table.on('radio(testdome)', function(obj){
            console.log(obj.data);
            stockBatchId = obj.data.stockBatchId;
          });
        getSupplierAndClient();
        function getSupplierAndClient(){
            var enterprisename = document.querySelector('#enterprisename');
            Theoldcuiway('plant/getSupplierAndClient', { 
                type:1,
                enterpriseclass:1,
            }, "GET").done(function(resp) {
                console.log(resp);
                console.log(11111);
                for(var i=0;i<resp.data.length;i++){
                    enterprisename.innerHTML = enterprisename.innerHTML+'<option value="'+resp.data[i].id+'">'+resp.data[i].name+'</option>';
                }
                console.log(resp);
                layui.form.render("select");
                return
            }).fail(function(err) {
            });
        }
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
        // 获取一级仓库
        getOneRepostoryList();
        function getOneRepostoryList(){
            var storagename = document.querySelector('#storagename');
            Theoldcuiway('plant/getOneRepostoryList', { 
            }, "GET").done(function(resp) {
                console.log(resp);
                for(var i=0;i<resp.data.length;i++){
                    storagename.innerHTML = storagename.innerHTML+'<option value="'+resp.data[i].parentid+'">'+resp.data[i].parentname+'</option>';
                }
                layui.form.render("select");
                return
            }).fail(function(err) {
            }); 
        }
        function getTwoRepostoryList(id){
            var areaname = document.querySelector('#areaname');
            Theoldcuiway('plant/getTwoRepostoryList', { 
                parentid:id
            }, "GET").done(function(resp) {
                console.log(resp);
                areaname.innerHTML = '';
                for(var i=0;i<resp.data.length;i++){
                    areaname.innerHTML = areaname.innerHTML+'<option value="'+resp.data[i].repositoryid+'">'+resp.data[i].repositoryname+'</option>';
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
                getList();

            }
            
        }
        function getEnterpriseById(id){
            console.log(id)
            Theoldcuiway('plant/StockSellSaveManage/getPlantHandle', 
            { id: id },
             "GET").done(function(resp) {
                console.log(resp)
                
                document.querySelector('#expectno').value = resp.data.expectno,
                document.querySelector('#measure').value = resp.data.measure,
                document.querySelector('#measureaddr').value = resp.data.measureaddr,
                stockBatchId = resp.data.stockBatchId,
                document.querySelector('#weight').value = resp.data.weight,
                document.querySelector('#reason').value = resp.data.reason,
                document.querySelector('#remark').value = resp.data.remark;
                setTimeout(function(){
                    document.querySelector('#chargeperson').value = resp.data.chargeperson;
                    layui.form.render("select");
                },500)
                getList();
                return
            }).fail(function(err) {
                console.log(err)

            });
        }
        form.on('select(enterprisename)', function(data) {
            enterprisename=data.elem[data.elem.selectedIndex].innerHTML;
            console.log(data.elem[data.elem.selectedIndex].innerHTML);
            console.log(data.value); //得到被选中的值
        });
        form.on('select(putseedclass)', function(data) {
            console.log(data.value); //得到被选中的值
            getSeedList(data.value);
        });
        form.on('select(putseedname)', function(data) {
            putseedname=data.elem[data.elem.selectedIndex].innerHTML;
            console.log(data.value); //得到被选中的值
            getSeedList(data.value);
        });
        form.on('select(areaname)', function(data) {
            areaname=data.elem[data.elem.selectedIndex].innerHTML;
            console.log(data.value); //得到被选中的值
            getSeedList(data.value);
        });
        form.on('select(storagename)', function(data) {
            storagename=data.elem[data.elem.selectedIndex].innerHTML;
            console.log(data.value); //得到被选中的值
            getTwoRepostoryList(data.value);
        });
        //选择框列表加载
        function getSeedList(e) {
            Theoldcuiway('plant/getSeedList', { putseedclass: e }, "GET").done(function(resp) {
                console.log(resp);
                document.querySelector('#putseedname').innerHTML=''
                $.each(resp.data, function(index, item) {
                    $('#putseedname').append(new Option(item.putseedname, item.putseedid)); // 下拉菜单里添加元素
                });
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err)

            });
        }

       


        

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
            
            Theoldcuiway(
                "plant/StockSellSaveManage/savePlantHandle", {
                    expectno:document.querySelector('#expectno').value,
                    chargeperson:document.querySelector('#chargeperson').value,
                    measure:document.querySelector('#measure').value,
                    measureaddr:document.querySelector('#measureaddr').value,
                    stockBatchId:stockBatchId,
                    weight:document.querySelector('#weight').value,
                    reason:document.querySelector('#reason').value,
                    remark:document.querySelector('#remark').value,
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../inputsunqualified.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }

        
        

          function getList(){
             
            //获取列表
            var tableIns = table.render({
                elem: "#test",
                url: baseaip + "plant/StockSellSaveManage/getPlantStockBatchList",
                method: "GET",
                where: {
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
                    console.log(stockBatchId);
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].stockBatchId==stockBatchId){
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
                    field: "putseedname",
                    title: "投入品名称",
                    minWidth: 120,
                    align: "center",
                    },
                   
                    {
                    field: "storagename",
                    title: "仓库名称",
                    minWidth: 120,
                    align: "center"
                    },
                    {
                    field: "areaname",
                    title: "二级仓库名称",
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
                    field: "stocknum",
                    title: "数量",
                    minWidth: 120,
                    align: "center"
                    },
                ]
                ]
            });
          }

        


        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../inputsunqualified.html";
        })
    })


})()