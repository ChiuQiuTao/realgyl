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
            Theoldcuiway('plant/StockSellSaveManage/getPlantReturn', 
            { id: id },
             "GET").done(function(resp) {
                console.log('__________')
                console.log(resp)
                document.querySelector('#clientName').value=resp.data.plantReturn.clientName,
                document.querySelector('#clientType').value=resp.data.plantReturn.clientType,
                document.querySelector('#ordercode').value=resp.data.plantReturn.ordercode;
                var orderdate = new Date(resp.data.plantReturn.orderdate);
                orderdate=orderdate.getFullYear() + '-' + (orderdate.getMonth() + 1) + '-' + orderdate.getDate();
                document.querySelector('#orderdate').value=orderdate;
                document.querySelector('#chargeperson').value=resp.data.plantReturn.chargeperson;
                document.querySelector('#processMode').value=resp.data.plantReturn.processMode;
                document.querySelector('#returnCause').value=resp.data.plantReturn.returnCause;
                document.querySelector('#returnWeight').value=resp.data.plantReturn.returnWeight;

                document.querySelector('#sellingWeight').value=resp.data.plantSelling.sellingWeight;
                document.querySelector('#sellingprice').value=resp.data.plantSelling.sellingprice;
                document.querySelector('#ordercodes').value=resp.data.plantSelling.ordercode;
                var orderdates = new Date(resp.data.plantSelling.orderdate);
                orderdates=orderdates.getFullYear() + '-' + (orderdates.getMonth() + 1) + '-' + orderdates.getDate();
                document.querySelector('#orderdates').value=orderdates;
                // document.querySelector('#pickBatch').value=resp.data.plantSelling.pickBatch;
                document.querySelector('#amount').value=resp.data.plantSelling.amount;
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