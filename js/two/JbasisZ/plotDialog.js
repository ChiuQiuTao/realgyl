(function(){
    (function(){
        layui.use(['upload', 'form', 'element', 'table', "layer", "laydate", "util"], function() {
            var $ = layui.jquery,
            table = layui.table,
            layer = layui.layer,
            laydate = layui.laydate,
            util = layui.util,
            form = layui.form,
            element = layui.element,
            upload = layui.upload;
            var basename = '';
            document.querySelector('#addBasStandard').addEventListener('click',function(){
                addBasStandard();
            })
            form.on('select(landnameP)', function(data){
                console.log(data);
                basename=data.elem[data.elem.selectedIndex].innerHTML
            });   
            getjdxxs();
            function getjdxxs(){
                Theoldcuiway('plant/getPlantBaseList', 
                { },
                 "GET").done(function(resp) {
                    console.log(resp);
                    var landnameP = document.querySelector('#landnameP');
                    for(var i=0;i<resp.data.length;i++){
                        landnameP.innerHTML = landnameP.innerHTML+'<option value="'+resp.data[i].baseid+'" class="persontypeitem">'+resp.data[i].basename+'</option>'
                    }
                    layui.form.render();
                    return
                }).fail(function(err) {
                    console.log(err)
    
                });
            }
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
                    getdetail(res.id);
                    document.querySelector('#addBasStandard').style.display='none';
                    document.querySelector('#updateBasStandard').style.display='block';
                    /*更新*/
                    document.querySelector('#updateBasStandard').addEventListener('click',function(){
                        updateId(res.id);
                    })
                }else{
                    
                }
                
            }
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
            function updateId(id){
                var landname = document.querySelector('#landname').value;
                var landnameP = document.querySelector('#landnameP').value;
                var floorarea = document.querySelector('#floorarea').value;
                var remarks = document.querySelector('#remarks').value;
                var imgs = document.querySelector("#imgpath").value;
                Theoldcuiway('plant/basis/updatePlantLand', { 
                    id:id,
                    landname:landname,
                    basename:basename,
                    baseid:landnameP,
                    area:floorarea,
                    remarks:remarks,
                    imgs:imgs
                }, "POST").done(function(resp) {
                    console.log(resp)
                    layer.msg('修改成功');
                    setTimeout(function(){
                        window.location.href = '../plot.html'
                    },1500)
                    return
                }).fail(function(err) {
                    console.log(err)
                    alert('修改失败');
                });
            }
           
            function getdetail(id){
                Theoldcuiway('plant/basis/getPlantLand', 
                { id: id },
                 "GET").done(function(resp) {
                    console.log(resp);
                    document.querySelector('#landname').value=resp.data.landname;
                    document.querySelector('#landnameP').value=resp.data.baseid;
                    document.querySelector('#floorarea').value=resp.data.area;
                    document.querySelector('#remarks').value=resp.data.remarks;
                    basename=basename;
                    $('#showimg').attr('src',resp.data.imgs);
                    document.querySelector('#imgpath').value=resp.data.imgs;
                    layui.form.render();
                    return
                }).fail(function(err) {
                    console.log(err)
    
                });
            }
            function addBasStandard(){
                var landname = document.querySelector('#landname').value;
                var landnameP = document.querySelector('#landnameP').value;
                var floorarea = document.querySelector('#floorarea').value;
                var remarks = document.querySelector('#remarks').value;
                var imgs = document.querySelector("#imgpath").value;
                Theoldcuiway(
                    "plant/basis/savePlantLand", {
                        landname:landname,
                        basename:basename,
                        baseid:landnameP,
                        area:floorarea,
                        remarks:remarks,
                        imgs:imgs
                    },
                    "POST"
                )
                .done(function(resp) {
                    console.log(resp);
                    layer.msg('新增成功');
                    setTimeout(function(){
                        window.location.href = '../plot.html'
                    },1500)
                    return;
                })
                .fail(function(err) {
                    console.log(err);
                });
            }
            document.querySelector('.cancels').addEventListener('click',function(){
                window.location.href = '../plot.html'
            })
        })
    
    })()
})()