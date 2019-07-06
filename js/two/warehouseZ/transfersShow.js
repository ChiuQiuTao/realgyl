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
            Theoldcuiway('plant/StorageManage/getPlantStorageAllocate', 
            { id: id },
             "GET").done(function(resp) {
                console.log('__________')
                console.log(resp)
                document.querySelector('#chargeperson').value=resp.data.chargeperson,
                document.querySelector('#inareaname').value=resp.data.inareaname,
                document.querySelector('#instoragename').value=resp.data.instoragename,
                document.querySelector('#num').value=resp.data.num;
                document.querySelector('#ordercode').value=resp.data.ordercode;
                var orderdate = new Date(resp.data.orderdate);
                orderdate=orderdate.getFullYear() + '-' + (orderdate.getMonth() + 1) + '-' + orderdate.getDate();
                document.querySelector('#orderdate').value=orderdate;
                document.querySelector('#outareaname').value=resp.data.outareaname;
                document.querySelector('#outstoragename').value=resp.data.outstoragename;
                document.querySelector('#allocateType').value=resp.data.allocateType;
                document.querySelector('#allocateName').value=resp.data.allocateName;
                document.querySelector('#batch').value=resp.data.batch;
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err)
            });
        }
  



        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../transfers.html";
        })
    })


})()