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
            areaname = '',
            putseedname='';

        //时间
        laydate.render({
            elem: '#orderdate' //指定元素 
        });
        laydate.render({
            elem: '#factorydate' //指定元素
        });
      
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
            Theoldcuiway('plant/StockSellSaveManage/getPlantStock', 
            { putseedid: id },
             "GET").done(function(resp) {
                console.log(resp)
                
               document.querySelector('#batch').value=resp.data[0].batch;
               document.querySelector('#num').value=resp.data[0].num;
               var factorydate = new Date(resp.data[0].factorydate);
               factorydate=factorydate.getFullYear()+'-'+(factorydate.getMonth()+1)+'-'+factorydate.getDate()
               document.querySelector('#factorydate').value=resp.data[0].factorydate;
               document.querySelector('#lifedate').value=resp.data[0].lifedate;
               document.querySelector('#lifedateunit').value=resp.data[0].lifedateunit;
               document.querySelector('#status').value=resp.data[0].status;
               getPlantStockBatch(resp.data[0].id);
                return
            }).fail(function(err) {
                console.log(err)

            });
        }
        

        function getPlantStockBatch(id){
            Theoldcuiway('plant/StockSellSaveManage/getPlantStockBatch', 
            { id: id },
             "GET").done(function(resp) {
                console.log(resp)
                
               document.querySelector('#putseedname').value=resp.data.putseedname;
               document.querySelector('#putseedclass').value=resp.data.putseedclass;
               document.querySelector('#storagename').value=resp.data.storagename;
               document.querySelector('#areaname').value=resp.data.areaname;
                return
            }).fail(function(err) {
                console.log(err)

            });
        }
        


        

       
       

        
        


        /*取消*/
        $(".cancels").click(function() {
            window.location.href = "../inputsinventory.html";
        })
    })


})()