(function(){
    layui.use(['form'], function() {
        var $ = layui.jquery,
            form = layui.form;
        var one = document.querySelector('#one');
        var two = document.querySelector('#two');
        var select = 1;
        // 选择仓库等级 
        form.on('select(storagelevel)', function(data) {
            if(data.value==1){
                one.style.display = 'block';
                two.style.display = 'none';
                select=1;
            }else if(data.value==2){
                one.style.display = 'none';
                two.style.display = 'block';
                select=2;
            }
        });
        // 新增按钮
        document.querySelector('#addBasStorage').addEventListener('click',function(){
            addBasStorage();
        })


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
                console.log(res.id);
                getBasStorageVo(res.id);
                document.querySelector('#addBasStorage').style.display='none';
                document.querySelector('#updateBasStorage').style.display='block';
                /*更新*/
                document.querySelector('#updateBasStorage').addEventListener('click',function(){
                    updateBasStorage(res.id);
                })
            }else{
                
            }
        }
        // 更新
        function updateBasStorage(id){
            var parentid = document.querySelector('#parentid').value;
            var storagelevel = document.querySelector('#storagelevel').value;
            var parentname =$('#parentid option:selected').attr("data-name");
            var storagename = document.querySelector('#storagename2').value;
            var chargeperson = document.querySelector('#chargeperson').value;
            var remarks = document.querySelector('#remarks').value;
            Theoldcuiway('plant/basis/updatePlantRepository', { 
                id:id,
                parentid:parentid,
                parentname:parentname,
                repositoryname: storagename,
                chargeperson: chargeperson,
                remarks: remarks,
                storagelevel:2
            }, "POST").done(function(resp) {
                console.log(resp);
                layer.msg('更新成功');
                setTimeout(function(){
                    window.location.href = '../inventory.html'
                },1500)
                return
            }).fail(function(err) {
                console.log(err)
                layui.form.render("select");

            });
        }
        //查看详情
        function getBasStorageVo(delid){
            Theoldcuiway('plant/basis/getPlantRepository', { 
                id: delid,
            }, "GET").done(function(resp) {
                console.log(resp);
                one.style.display = 'none';
                two.style.display = 'block';
                setTimeout(function(){
                    document.querySelector('#parentid').value = resp.data.parentid;
                    document.querySelector('#storagelevel').value = resp.data.storagelevel;
                    document.querySelector('#storagename2').value = resp.data.repositoryname;
                    document.querySelector('#chargeperson').value = resp.data.chargeperson;
                    document.querySelector('#remarks').value = resp.data.remarks;
                    layui.form.render("select");
                },500)
                
                return
            }).fail(function(err) {
                console.log(err)
                
            });
        }
        // 查询企业仓库
        getBasStorage();
        function getBasStorage(){
            Theoldcuiway('plant/getOneRepostoryList', { 
            }, "GET").done(function(resp) {
                console.log(resp)
                var selectList='';
                for(var i=0;i<resp.data.length;i++){
                    selectList = selectList + '<option value="'+resp.data[i].parentid+'"  data-name="'+resp.data[i].parentname+'">'+resp.data[i].parentname+'</option>';
                }
                document.querySelector('#parentid').innerHTML=selectList;
                
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err)
                
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
        function addBasStorage(){
            var parentid = document.querySelector('#parentid').value;
            var storagelevel = document.querySelector('#storagelevel').value;
            var parentname=null;
            console.log(parentname);
            if(select ==1){
                storagename = document.querySelector('#storagename1').value;
                parentid=null;
            }else{
                parentname =$('#parentid option:selected').attr("data-name");
                storagename = document.querySelector('#storagename2').value;
            }
            var chargeperson = document.querySelector('#chargeperson').value;
            var remarks = document.querySelector('#remarks').value;
    
            Theoldcuiway('plant/basis/savePlantRepository', { 
                parentid:parentid,
                parentname:parentname,
                storagelevel: storagelevel,
                repositoryname: storagename,
                chargeperson: chargeperson,
                remarks: remarks,
                repositorytype:1
            }, "POST").done(function(resp) {
                console.log(resp)
                
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../inventory.html'
                },1500)
                return
            }).fail(function(err) {
                console.log(err)
                alert('新增失败');
            });
        }

        document.querySelector('.cancels').addEventListener('click',function(){
            window.location.href = '../inventory.html'
        })
    })
    

})()