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
            basename = '',
            landname = '',
            putseedname='';
            var plantStockBatchId ='';
            var plantCommodityId = '';
            var plantInputSeedId = '';
        //时间
        laydate.render({
            elem: '#managedate' //指定元素 
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
        // 获取基地
        // getPlantBaseList();
        // function getPlantBaseList(){
        //     var baseid = document.querySelector('#baseid');
        //     Theoldcuiway('plant/getPlantBaseList', { 
        //     }, "GET").done(function(resp) {
        //         console.log(resp);
        //         for(var i=0;i<resp.data.length;i++){
        //             baseid.innerHTML = baseid.innerHTML+'<option value="'+resp.data[i].baseid+'">'+resp.data[i].basename+'</option>';
        //         }
        //         layui.form.render("select");
        //         return
        //     }).fail(function(err) {
        //     }); 
        // }
        // function getLandListByBase(id){
        //     var landid = document.querySelector('#landid');
        //     Theoldcuiway('plant/getLandListByBase', { 
        //         baseid:id
        //     }, "GET").done(function(resp) {
        //         console.log(resp);
        //         landid.innerHTML = '<option value="">请选择</option>';
        //         for(var i=0;i<resp.data.length;i++){
        //             landid.innerHTML = landid.innerHTML+'<option value="'+resp.data[i].landid+'">'+resp.data[i].landname+'</option>';
        //         }
        //         layui.form.render("select");
        //         return
        //     }).fail(function(err) {
        //     }); 
        // }
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
            document.querySelector('.showdetail').style.display='block';
            Theoldcuiway('plant/PlantManage/getPlantFieldManage', 
            { id: id },
             "GET").done(function(resp) {
                console.log('__________')
                console.log(resp)
               
                
                document.querySelector('#ordercode').value = resp.data.ordercode;
                document.querySelector('#status').value = resp.data.status;
                document.querySelector('#productname').value = resp.data.productname;
                document.querySelector('#basename').value = resp.data.basename;
                document.querySelector('#landname').value = resp.data.landname;

                if(resp.data.list[0]){
                    document.querySelector('#managedate').value = resp.data.list[0].managedate,
                    document.querySelector('#measureManageName').value = resp.data.list[0].measureManageName;
                    document.querySelector('#manageType').value = resp.data.list[0].manageType;
                    document.querySelector('#remark').value = resp.data.list[0].remark;
                    setTimeout(function(){
                        document.querySelector('#chargeperson').value = resp.data.list[0].chargeperson;
                        layui.form.render("select");
                    },500)
                }
                
                // getList();
                return
            }).fail(function(err) {
                console.log(err)
            });
        }
        // form.on('select(enterprisename)', function(data) {
        //     enterprisename=data.elem[data.elem.selectedIndex].innerHTML;
        //     console.log(data.elem[data.elem.selectedIndex].innerHTML);
        // });
        // form.on('select(putseedclass)', function(data) {
        //     getSeedList(data.value);
        // });
        // form.on('select(putseedid)', function(data) {
        //     putseedname=data.elem[data.elem.selectedIndex].innerHTML;
        //     getList(data.value);
        //     getCommodityByPutseed(data.value);
        // });
        
        // form.on('select(baseid)', function(data) {
        //     basename=data.elem[data.elem.selectedIndex].innerHTML;
        //     getLandListByBase(data.value);
        // });
        // form.on('select(landid)', function(data) {
        //     landname=data.elem[data.elem.selectedIndex].innerHTML;
        // });
        document.querySelector('#uploadImg').addEventListener('click',function(){
            uploadImg();
        })
       
        //新增
        function uploadImg(){
            console.log(plantStockBatchId);
            Theoldcuiway(
                "plant/PlantManage/savePlantFieldManage", {
                    managedate:document.querySelector('#managedate').value,
                    chargeperson:document.querySelector('#chargeperson').value,
                    measureManageName:document.querySelector('#measureManageName').value,
                    manageType:document.querySelector('#manageType').value,
                    remark:document.querySelector('#remark').value,
                    plantInputSeedId:plantInputSeedId,
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../field.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }

        
        

        


        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../field.html";
        })
    })


})()