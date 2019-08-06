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


      
        getHrefId();
        function getHrefId(){
            var loc = location.href;
            var url = loc.split("?")[1];
            if(url && url!=''){
                // document.querySelector('#uploadImg').style.display='none';
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
            Theoldcuiway('plant/StockSellSaveManage/getPlantStockFruit', 
            { id: id },
             "GET").done(function(resp) {
                console.log(resp)
                
                document.querySelector('#areaname').value = resp.data[0].areaname,
                document.querySelector('#pickBatch').value = resp.data[0].pickBatch;
                var pickDate = new Date(resp.data[0].pickDate);
                pickDate=pickDate.getFullYear() + '-' + (pickDate.getMonth() + 1) + '-' + pickDate.getDate();
                document.querySelector('#pickDate').value = pickDate,
                document.querySelector('#storagename').value = resp.data[0].storagename,
                document.querySelector('#weight').value = resp.data[0].weight;
                // document.querySelector('#remark').value = resp.data[0].remark;
                if(resp.data[0].istest){
                    document.querySelector('#istest').value = '检测';
                }else{
                    document.querySelector('#istest').value = '未检测';
                }
                return
            }).fail(function(err) {
                console.log(err)

            });
        }
        
    

        


        


        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../productinventory.html";
        })
    })


})()