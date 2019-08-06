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
        var putseedname='';
        // 选择框选择显示
            form.on('select(producttypeid)', function(data){
               
                producttypename=data.elem[data.elem.selectedIndex].innerHTML
                var index = data.elem.selectedIndex;
                index = index-1;
                getSeedListByProducttypeId(data.value);
                // var ctypelist = document.querySelectorAll('.inline-ctype');
                // for(var i=0;i<ctypelist.length;i++){
                //     ctypelist[i].style.display='none';
                // }
                // ctypelist[index].style.display='block';
            });    
        form.on('select(putseedid)', function(data){
            console.log(data);
            putseedname=data.elem[data.elem.selectedIndex].innerHTML
        });    
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

        function getSeedListByProducttypeId(id){
            Theoldcuiway('plant/getSeedListByProducttypeId', {
                producttypeid:id
            }, "GET").done(function(resp) {
                console.log(resp);
                document.querySelector('#putseedid').innerHTML='<option value="">请选择</option>'
                for(var i=0;i<resp.data.length;i++){
                    document.querySelector('#putseedid').innerHTML=document.querySelector('#putseedid').innerHTML+'<option value="'+resp.data[i].putseedid+'" >'+resp.data[i].putseedname+'</option>'
                }
                layui.form.render("select");
                return
            }).fail(function(err) {
                console.log(err);
                return
            });
        }


        getProducttype('1');
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
            var earlywarn;
            if(earlywarning){
                earlywarn=1
            }else{
                earlywarn=0
            }
            Theoldcuiway(
                "plant/basis/updatePlantCommodity", {
                    id:id,
                    putseedname:putseedname,
                    productname:$('#productname').val(),
                    putseedid:$('#putseedid').val(),
                    producttypeid:$('#producttypeid').val(),
                    cycle:$('#cycle').val(),
                    cycleunit:$('#cycleunit').val(),
                    sellingprice:$('#sellingprice').val(),
                    lifedate:$('#lifedate').val(),
                    lifedateunit:$('#lifedateunit').val(),
                    unit:$('#unit').val(),
                    remarks:$('#remarks').val(),
                    earlywarning:earlywarn,
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
                    window.location.href = '../nonpro.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }
        // 查询投入品详情
        function getBasPutseed(id){
            Theoldcuiway('plant/basis/getPlantCommodity', {
                id:id,
            }, "GET").done(function(resp) {
                console.log(resp);
                getSeedListByProducttypeId(resp.data.producttypeid);
                putseedname=putseedname;
                document.querySelector('#productname').value=resp.data.productname
                document.querySelector('#unit').value=resp.data.unit
                document.querySelector('#sellingprice').value=resp.data.sellingprice
                document.querySelector('#lifedate').value=resp.data.lifedate
                document.querySelector('#lifedateunit').value=resp.data.lifedateunit
                document.querySelector('#cycle').value=resp.data.cycle
                document.querySelector('#cycleunit').value=resp.data.cycleunit
                document.querySelector('#remarks').value=resp.data.remarks
                document.querySelector('#minstock').value=resp.data.minstock
                document.querySelector('#maxstock').value=resp.data.maxstock
                $('#showimg').attr('src', resp.data.imgs)
                document.querySelector("#pathimg").value=resp.data.imgs;
                // $('#showimg').attr('src', resp.data.remarks); 
                if(resp.data.earlywarning==1){
                    console.log(123123)
                    $('#earlywarning').attr('checked', true);
                    var stock = document.querySelectorAll('.stock');
                    for(var i=0;i<stock.length;i++){
                        stock[i].style.display='block'
                    }
                        
                }
                setTimeout(function(){
                document.querySelector('#putseedid').value=resp.data.putseedid
                    document.querySelector('#producttypeid').value=resp.data.producttypeid
                    layui.form.render();

                },500)
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
            var earlywarn;
            if(earlywarning){
                earlywarn=1
            }else{
                earlywarn=0
            }
            Theoldcuiway(
                "plant/basis/savePlantCommodity", {
                    productname:$('#productname').val(),
                    putseedid:$('#putseedid').val(),
                    putseedname:putseedname,
                    producttypeid:$('#producttypeid').val(),
                    cycle:$('#cycle').val(),
                    cycleunit:$('#cycleunit').val(),
                    sellingprice:$('#sellingprice').val(),
                    lifedate:$('#lifedate').val(),
                    lifedateunit:$('#lifedateunit').val(),
                    unit:$('#unit').val(),
                    remarks:$('#remarks').val(),
                    earlywarning:earlywarn,
                    minstock:$('#minstock').val(),
                    maxstock:$('#maxstock').val(),
                    imgs:$('#pathimg').val(),
                    producttypename:producttypename
                },
                "POST"
            )
            .done(function(resp) {
                console.log(resp);
                layer.msg('新增成功');
                setTimeout(function(){
                    window.location.href = '../nonpro.html'
                },1500)
                return;
            })
            .fail(function(err) {
                console.log(err);
            });
        }
    })
})()