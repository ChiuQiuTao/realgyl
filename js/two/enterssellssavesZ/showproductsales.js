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
            Theoldcuiway('plant/StockSellSaveManage/getPlantSelling', 
            { id: id },
             "GET").done(function(resp) {
                console.log('__________')
                console.log(resp)
                document.querySelector('#clientName').value=resp.data.plantSelling.clientName,
                document.querySelector('#clientType').value=resp.data.plantSelling.clientType,
                document.querySelector('#ordercode').value=resp.data.plantSelling.ordercode,
                document.querySelector('#orderdate').value=resp.data.plantSelling.orderdate;
                document.querySelector('#amount').value=resp.data.plantSelling.amount;
                document.querySelector('#chargeperson').value=resp.data.plantSelling.chargeperson;
                document.querySelector('#sellingWeight').value=resp.data.plantSelling.sellingWeight;
                document.querySelector('#sellingprice').value=resp.data.plantSelling.sellingprice;
                document.querySelector('#storagename').value=resp.data.plantStockFruitBatch.storagename;
                document.querySelector('#areaname').value=resp.data.plantStockFruitBatch.areaname;
                document.querySelector('#pickBatch').value=resp.data.plantStockFruitBatch.pickBatch;
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err)
            });
        }
  



        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../productsales.html";
        })
    })


})()