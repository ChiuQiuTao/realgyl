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

        //时间
        laydate.render({
            elem: '#orderdate' //指定元素 
        });
        laydate.render({
            elem: '#factorydate' //指定元素
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
            }
            
        }
        function getEnterpriseById(id){
            console.log(id)
            Theoldcuiway('plant/StockSellSaveManage/getPlantProcure', 
            { id: id },
             "GET").done(function(resp) {
                console.log(resp)
                
                document.querySelector('#enterpriseclass').value= resp.data.plantProcure.enterpriseclass;
                var orderdate=new Date(resp.data.plantProcure.orderdate);
                orderdate = orderdate.getFullYear()+'-'+(orderdate.getMonth()+1)+'-'+orderdate.getDate();
                document.querySelector('#orderdate').value= orderdate,
                document.querySelector('#enterprisename').value= resp.data.plantProcure.enterpriseid,
                enterprisename= resp.data.plantProcure.enterprisename,
                document.querySelector('#putseedclass').value= resp.data.plantProcureProduct[0].putseedclass,
                getSeedList(resp.data.plantProcureProduct[0].putseedclass);
                getTwoRepostoryList(resp.data.plantProcureProduct[0].storageid);
                putseedname= resp.data.plantProcureProduct[0].putseedname,
                storagename= resp.data.plantProcureProduct[0].storagename,
                areaname= resp.data.plantProcureProduct[0].areaname;
                var factorydate=new Date(resp.data.plantProcureProduct[0].factorydate);
                factorydate = factorydate.getFullYear()+'-'+(factorydate.getMonth()+1)+'-'+factorydate.getDate();
                document.querySelector('#factorydate').value= factorydate,
                document.querySelector('#batch').value= resp.data.plantProcureProduct[0].batch,
                document.querySelector('#num').value= resp.data.plantProcureProduct[0].num,
                document.querySelector('#purchaseprice').value= resp.data.plantProcureProduct[0].purchaseprice,
                document.querySelector('#imgpath').value= resp.data.plantProcureProduct[0].file;
                $('#showimg').attr('src', resp.data.plantProcureProduct[0].file)

                setTimeout(function(){
                    document.querySelector('#chargeperson').value= resp.data.plantProcure.chargeperson,
                    document.querySelector('#putseedname').value= resp.data.plantProcureProduct[0].putseedid,
                    document.querySelector('#storagename').value= resp.data.plantProcureProduct[0].storageid,
                    document.querySelector('#areaname').value= resp.data.plantProcureProduct[0].areaid;
                    layui.form.render("select");
                },500)
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
            console.log(putseedname); //得到被选中的值
        });
        form.on('select(areaname)', function(data) {
            areaname=data.elem[data.elem.selectedIndex].innerHTML;
            console.log(areaname); //得到被选中的值
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
            var imgs = $('#imgpath').val();
            Theoldcuiway(
                "plant/StockSellSaveManage/savePlantProcure", {
                    enterpriseclass:$('#enterpriseclass').val(),
                    orderdate:$('#orderdate').val(),
                    enterpriseid:$('#enterprisename').val(),
                    enterprisename:enterprisename,
                    chargeperson:$('#chargeperson').val(),
                    putseedclass:$('#putseedclass').val(),
                    putseedid:$('#putseedname').val(),
                    putseedname:putseedname,
                    storageid:$('#storagename').val(),
                    storagename:storagename,
                    areaid:$('#areaname').val(),
                    areaname:areaname,
                    factorydate:$('#factorydate').val(),
                    batch:$('#batch').val(),
                    num:$('#num').val(),
                    purchaseprice:$('#purchaseprice').val(),
                    file:imgs,
                    // auditstaus:0,
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../inputsprocurement.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }

        
        


        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../inputsprocurement.html";
        })
    })


})()