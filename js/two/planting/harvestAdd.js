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
                }
                console.log(res)
            }else{
            }
            
        }
        function getEnterpriseById(id){
            console.log(id)
            Theoldcuiway('plant/PlantManage/getPlantPick', 
            { id: id },
             "GET").done(function(resp) {
                console.log('__________')
                console.log(resp)
                document.querySelector('#areaname').value=resp.data.areaname,
                document.querySelector('#chargeperson').value=resp.data.chargeperson,
                document.querySelector('#level').value=resp.data.level,
                document.querySelector('#ordercode').value=resp.data.ordercode;
                document.querySelector('#orderdate').value=resp.data.orderdate;
                document.querySelector('#pickBatch').value=resp.data.pickBatch;
                document.querySelector('#storagename').value=resp.data.storagename;
                document.querySelector('#weight').value=resp.data.weight;
                document.querySelector('#productname').value=resp.data.productname;
                document.querySelector('#putseedname').value=resp.data.putseedname;
                document.querySelector('#batch').value=resp.data.batch;
                return
            }).fail(function(err) {
                console.log(err)
            });
        }
  



        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../harvest.html";
        })
    })


})()