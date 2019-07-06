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

        var producttypeid=null;//种类
        var earlywarning=false;//是否预警
        var producttypename='';

        // 选择框选择显示
            form.on('select(producttypeid)', function(data){
               
                producttypename=data.elem[data.elem.selectedIndex].innerHTML;
                var index = data.elem.selectedIndex;
                index = index-1;
                // var ctypelist = document.querySelectorAll('.inline-ctype');
                // for(var i=0;i<ctypelist.length;i++){
                //     ctypelist[i].style.display='none';
                // }
                // ctypelist[index].style.display='block';
            });    
        // form.on('select(ctype)', function(data){
        //     console.log(data);
        //     producttypeid=data.value;
        // });    
        // 是否预警
        form.on('checkbox(earlywarning)', function(data){
            earlywarning=data.elem.checked;
            var stock = document.querySelectorAll('.stock');
            if(data.elem.checked){
                for(var i=0;i<stock.length;i++){
                    stock[i].style.display='block'
                }
            }else{
                for(var i=0;i<stock.length;i++){
                    stock[i].style.display='none'
                }
            }
            
        }); 


        getProducttype('4');
        //种子种类查询
        function getProducttype(tabItemId){
            var id='';
            
            if(tabItemId==1){
                id='0000000000003';
            }else if(tabItemId==2){
                id='25b13fdd-9b01-11e5-83f4-000c29365478';
            }else if(tabItemId==3){
                id='25ca81fb-9b01-11e5-83f4-000c29365478';
            }else if(tabItemId==4){
                id='25f64f62-9b01-11e5-83f4-000c29365478';
            }
            Theoldcuiway('plant/getProducttype', {
                pid:id
            }, "GET").done(function(resp) {
                console.log(resp);
                document.querySelector('#producttypeid').innerHTML='<option value="">请选择</option>'
                for(var i=0;i<resp.data.length;i++){
                    document.querySelector('#producttypeid').innerHTML=document.querySelector('#producttypeid').innerHTML+'<option value="'+resp.data[i].id+'" data-val="'+resp.data[i].name+'">'+resp.data[i].name+'</option>'
                    // document.querySelector('#inline-type').innerHTML=document.querySelector('#inline-type').innerHTML
                    // +'<div class="layui-input-inline inline-ctype" style="display:none;"><select name="ctype" lay-filter="ctype" class="ctype"><option value="">请选择</option></select></div>'
                    // var ctypelist = document.querySelectorAll('.ctype');
                    // for(var j=0;j<resp.list[i].viList.length;j++){
                    //     ctypelist[i].innerHTML=ctypelist[i].innerHTML+'<option value="'+resp.list[i].viList[j].pid+'">'+resp.list[i].viList[j].pname+'</option>'
                    // }
                }
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err);
                return
            });
        }

        // 获取id
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
                    console.log(arr);
                }
                console.log(res.id);
                getBasPutseed(res.id);
                document.querySelector('#uploadImg').style.display='none';
                document.querySelector('#updateImg').style.display='block';
                /*更新*/
                document.querySelector('#updateImg').addEventListener('click',function(){
                    updateBasPutseed(res.id);
                })
                
            }else{
            }
        }
        
        // 更新
        function updateBasPutseed(id){
            Theoldcuiway(
                "plant/basis/updatePlantPutseed", {
                    id:id,
                    putseedclass:4,
                    putseedsource:1,
                    putseedname:$('#putseedname').val(),
                    producttypeid:$('#producttypeid').val(),
                    specifications:$('#specifications').val(),
                    unit:$('#unit').val(),
                    registrationcode:$('#registrationcode').val(),
                    lifedate:$('#lifedate').val(),
                    lifedateunit:$('#lifedateunit').val(),
                    standardno:$('#standardno').val(),
                    enterprisename:$('#enterprisename').val(),
                    brand:$('#brand').val(),
                    suitablearea:$('#suitablearea').val(),
                    purchaseprice:$('#purchaseprice').val(),
                    remarks:$('#remarks').val(),
                    earlywarning:$('#earlywarning').val(),
                    minstock:$('#minstock').val(),
                    maxstock:$('#maxstock').val(),
                    imgs:$('#pathimg').val(),
                    producttypename:producttypename
                    // auditstaus:0,
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('更新成功');
                setTimeout(function(){
                    window.location.href = '../inputs.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }
        // 查询投入品详情
        function getBasPutseed(id){
            Theoldcuiway('plant/basis/getPlantPutseed', {
                id:id,
            }, "GET").done(function(resp) {
                console.log(resp);
                document.querySelector('#putseedname').value=resp.data.putseedname
                document.querySelector('#specifications').value=resp.data.specifications
                document.querySelector('#unit').value=resp.data.unit
                document.querySelector('#registrationcode').value=resp.data.registrationcode
                document.querySelector('#lifedate').value=resp.data.lifedate
                document.querySelector('#lifedateunit').value=resp.data.lifedateunit
                document.querySelector('#standardno').value=resp.data.standardno
                document.querySelector('#enterprisename').value=resp.data.enterprisename
                document.querySelector('#brand').value=resp.data.brand
                document.querySelector('#suitablearea').value=resp.data.suitablearea
                document.querySelector('#purchaseprice').value=resp.data.purchaseprice
                document.querySelector('#remarks').value=resp.data.remarks
                document.querySelector('#minstock').value=resp.data.minstock
                document.querySelector('#maxstock').value=resp.data.maxstock
                $('#showimg').attr('src', resp.data.imgs)
                document.querySelector("#pathimg").value=resp.data.imgs;
                // $('#showimg').attr('src', resp.data.remarks); 
                if(resp.data.earlywarning==1){
                    console.log(123123)
                    $('#earlywarning').attr('checked', true);

                    layui.form.render();
                    
                    var stock = document.querySelectorAll('.stock');
                    for(var i=0;i<stock.length;i++){
                        stock[i].style.display='block'
                    }
                        
                }
               
                // earlywarning
                return
            }).fail(function(err) {
                console.log(err);
                return
            });
        }
        // 种类
        // getBasProducttype();
        // function getBasProducttype(){
        //     handleAjax('PlantBasPutseed/getBasProducttype', {
        //         parentid:'0000000000003'
        //     }, "GET").done(function(resp) {
        //         console.log(resp);
    
        //         for(var i=0;i<resp.list.length;i++){
        //             document.querySelector('#producttypeid').innerHTML=document.querySelector('#producttypeid').innerHTML+'<option value="'+resp.list[i].pid+'" data-id="'+i+'">'+resp.list[i].pname+'</option>'
        //             document.querySelector('#inline-type').innerHTML=document.querySelector('#inline-type').innerHTML
        //             +'<div class="layui-input-inline inline-ctype" style="display:none;"><select name="ctype" lay-filter="ctype" class="ctype"><option value="">请选择</option></select></div>'
        //             var ctypelist = document.querySelectorAll('.ctype');
        //             for(var j=0;j<resp.list[i].viList.length;j++){
        //                 ctypelist[i].innerHTML=ctypelist[i].innerHTML+'<option value="'+resp.list[i].viList[j].pid+'">'+resp.list[i].viList[j].pname+'</option>'
        //             }
        //         }
        //         layui.form.render("select");
        //         showSelect();
        //         return
        //     }).fail(function(err) {
        //         console.log(err);
        //         return
        //     });
        // }

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
                document.querySelector("#pathimg").value=filePath;
                $('#showimg').attr('src', filePath)
                console.log(filePath);
            }
        });



        document.querySelector('#uploadImg').addEventListener('click',function(){
            uploadImg();
        })
        //新增
        function uploadImg(){
            Theoldcuiway(
                "plant/basis/savePlantPutseed", {
                    putseedclass:4,
                    putseedsource:1,
                    putseedname:$('#putseedname').val(),
                    producttypeid:$('#producttypeid').val(),
                    specifications:$('#specifications').val(),
                    unit:$('#unit').val(),
                    registrationcode:$('#registrationcode').val(),
                    lifedate:$('#lifedate').val(),
                    lifedateunit:$('#lifedateunit').val(),
                    standardno:$('#standardno').val(),
                    enterprisename:$('#enterprisename').val(),
                    brand:$('#brand').val(),
                    suitablearea:$('#suitablearea').val(),
                    purchaseprice:$('#purchaseprice').val(),
                    remarks:$('#remarks').val(),
                    earlywarning:$('#earlywarning').val(),
                    minstock:$('#minstock').val(),
                    maxstock:$('#maxstock').val(),
                    imgs:$('#pathimg').val(),
                    // auditstaus:0,
                    producttypename:producttypename
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../inputs.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }
    })
})()