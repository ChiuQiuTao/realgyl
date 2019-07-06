layui.use(['form','table', "laydate"], function() {
    var $ = layui.jquery,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate;

    laydate.render({
        elem: '#date1' //指定元素 
    });
    laydate.render({
        elem: '#date2' //指定元素
    });
    /*重置*/
    $(".agains").click(function() {
        window.location.reload();
    })
    // 切换tab
    var tabItemId='1';
    var enterpriseid='';
    tabItems = document.querySelectorAll('.select-tab>.item');
    for(var i=0;i<tabItems.length;i++){
        (function(i){
            tabItems[i].addEventListener('click',function(){
                var tabItemThis = document.querySelector('.select-tab>.item-this');
                tabItemThis.classList.remove('item-this');
                tabItems[i].classList.add('item-this');
                tabItemId = tabItems[i].getAttribute("data-id");
                console.log(tabItemId);
                
                getPlantPutseeds(tabItemId);
                getProducttype(tabItemId);
            })
        })(i)
        
    }
    //监听头部监听
    table.on('toolbar(testdome)', function(obj) {
        var checkStatus = table.checkStatus(obj.config.id),
            data = checkStatus.data; //获取选中的数据
        switch (obj.event) {
            case 'add':
                if(tabItemId==1){
                    window.location.href = "./dialog/inputsDialog1.html";
                }else if(tabItemId==2){
                    window.location.href = "./dialog/inputsDialog2.html";
                }else if(tabItemId==3){
                    window.location.href = "./dialog/inputsDialog3.html";
                }else if(tabItemId==4){
                    window.location.href = "./dialog/inputsDialog4.html";
                }
                break;
            case 'update':
                if(data.length === 0){
                    layer.msg('请选择一行');
                } else if(data.length > 1){
                    layer.msg('只能同时编辑一个');
                } else {
                    if(tabItemId==1){
                        window.location.href = "./dialog/inputsDialog1.html?id="+data[0].id;
                    }else if(tabItemId==2){
                        window.location.href = "./dialog/inputsDialog2.html?id="+data[0].id;
                    }else if(tabItemId==3){
                        window.location.href = "./dialog/inputsDialog3.html?id="+data[0].id;
                    }else if(tabItemId==4){
                        window.location.href = "./dialog/inputsDialog4.html?id="+data[0].id;
                    }
                }
                break;
            case 'delete':
                if (data.length === 0) {
                    layer.msg('请选择一行');
                } 
                else if(data.length > 1){
                    layer.msg('只能同时编辑一个');
                } else {
                    delId(data[0].id);
                }
                break;
        };
    });
    //监听表格里面按钮
    table.on('tool(testdome)', function(obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        
    });

    function delId(id){
        Theoldcuiway('plant/basis/deletePlantPutseed', {
            id:id
        }, "post").done(function(resp) {
            layer.msg('删除成功');
            setTimeout(function(){
                getPlantPutseeds(tabItemId);
            },1500)
            return
        }).fail(function(err) {
            console.log(err);
            return
        });
    }
    // var producttypeid=null;
    // // 选择框选择显示
    // function showSelect(){
    //     form.on('select(type)', function(data){
    //         console.log(data);
    //         var index = data.elem.selectedIndex;
    //         index = index-1;
    //         var ctypelist = document.querySelectorAll('.inline-ctype');
    //         for(var i=0;i<ctypelist.length;i++){
    //             ctypelist[i].style.display='none';
    //         }
    //         ctypelist[index].style.display='block';
    //     });    
    // }
    // form.on('select(ctype)', function(data){
    //     console.log(data);
    //     producttypeid=data.value;
    // });    
    


    // 获取用户信息
    // getUser();
    // function getUser() {
    //     handleAjax('user/getUser', {}, "GET").done(function(resp) {
    //         console.log(resp);
    //         enterpriseid = resp.enterpriseId;
    //         findBasPutseedList(enterpriseid);
    //         return
    //     }).fail(function(err) {
    //         console.log(err);
    //         enterpriseid = err.enterpriseId;
    //         findBasPutseedList(enterpriseid);
    //         return
    //     });
    // }
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
            document.querySelector('#type').innerHTML='<option value="">请选择</option>'
            for(var i=0;i<resp.data.length;i++){
                document.querySelector('#type').innerHTML=document.querySelector('#type').innerHTML+'<option value="'+resp.data[i].id+'" data-id="'+i+'">'+resp.data[i].name+'</option>'
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
    // // 农药/其它投入品种别查询
    // function getTypeParentidByName(){
    //     var listVo={
    //         'pid':'0000000000002',
    //         'pname':'农药/其他投入品'
    //     }
    //     var listVo = JSON.stringify(listVo);
    //     handleAjax('PlantBasPutseed/getTypeParentidByName', {
    //         listVo:listVo
    //     }, "GET").done(function(resp) {
    //         console.log(resp);

    //         for(var i=0;i<resp.list.length;i++){
    //             document.querySelector('#typefarm').innerHTML = document.querySelector('#typefarm').innerHTML+'<option value="'+resp.list[i].pid+'" data-id="'+i+'">'+resp.list[i].pname+'</option>'
    //         }
    //         layui.form.render("select");
    //         // showSelect();
    //         return
    //     }).fail(function(err) {
    //         console.log(err);
    //         return
    //     });
    // }
    // // 肥料投入品种别查询
    // getTypegetParentidByCaregoryName();
    // function getTypegetParentidByCaregoryName(){
    //     var listVo={
    //         'pid':'0000000000002',
    //         'pname':'肥料'
    //     }
    //     var listVo = JSON.stringify(listVo);
    //     handleAjax('PlantBasPutseed/getTypegetParentidByCaregoryName', {
    //         listVo:listVo
    //     }, "GET").done(function(resp) {
    //         console.log(resp);
    //         for(var i=0;i<resp.list.length;i++){
    //             document.querySelector('#typefertilizer').innerHTML = document.querySelector('#typefertilizer').innerHTML+'<option value="'+resp.list[i].pid+'" data-id="'+i+'">'+resp.list[i].pname+'</option>'
    //         }
    //         layui.form.render("select");
    //         return
    //     }).fail(function(err) {
    //         console.log(err);
    //         return
    //     });
    // }
    document.querySelector('#findBasPutseedList').addEventListener('click',function(){
        getPlantPutseeds();
    })
    // 列表
    getPlantPutseeds(1);
    function getPlantPutseeds(id){
        console.log(111);
        var putseedname=document.querySelector('#putseedname').value;
        var approval=document.querySelector('#approval').value;
        var producttypeid=document.querySelector('#type').value;
        table.render({
            elem: '#testdome',
            url: baseaip + "plant/basis/getPlantPutseeds",
            method: "GET",
            where: {
                putseedclass:id,
                // putseedsource:1,
                auditstaus:approval,
                putseedname:putseedname,
                producttypeid:producttypeid
            },
            headers: {
                Authorization: "Bearer" + " " + sessions
            },
            request: {
                pageName: "page",
                limitName: "limit"
            },
            limits: [10, 20],
            parseData: function(res) {
            //res 即为原始返回的数据
                console.log(res);
                return {
                    code: res.code, //解析接口状态
                    msg: res.msg, //解析提示文本
                    totalNum: res.data.total, //解析数据长度
                    lists: res.data.records //解析数据列表
                };
            },
            toolbar: "#toolbarinter",
            response: {
                statusName: "code", //数据状态的字段名称，默认：code
                statusCode: 200, //成功的状态码，默认：0
                msgName: "msg", //状态信息的字段名称，默认：msg
                countName: "totalNum", //数据总数的字段名称，默认：count
                dataName: "lists" //数据列表的字段名称，默认：data
            },
            cellMinWidth: 80,
            page: {
            //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ["prev", "page", "next", "skip", "count"], //自定义分页布局
                //,curr: 5 //设定初始在第 5 页
                groups: 5, //只显示 1 个连续页码
                first: true, //不显示首页
                last: true, //不显示尾页
                prev: "下一页",
                next: "上一页",
                theme: "#c81623"
            },
            
            cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                ,
            page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
                layout: ['prev', 'page', 'next', 'skip', 'count'] //自定义分页布局
                    //,curr: 5 //设定初始在第 5 页
                    ,
                groups: 5 //只显示 1 个连续页码
                    ,
                first: false //不显示首页
                    ,
                last: false //不显示尾页
                    ,
                prev: '上一页',
                next: "下一页",
                theme: "#c81623",
            },
            // height: 'full-20',//满高
            cols: [
                [{
                    type: 'checkbox', 
                    fixed: 'left'
                },{
                    title: '编号',
                    type: 'numbers',
                }
                , {
                    field: 'putseedname',
                    title: '投入品名称',
                    align: "center",
                    minWidth: 150
                }, {
                    field: 'lifedate',
                    title: '保质期',
                    align: "center",
                    minWidth: 80
                }, {
                    field: 'lifedateunit',
                    title: '保质期单位',
                    align: "center",
                    minWidth: 50
                }, 
                {
                    field: 'enterprisename',
                    title: '生产企业名称',
                    align: "center",
                    minWidth: 130
                }, 
                {
                    field: 'registrationcode',
                    title: '审定/登记号',
                    align: "center",
                    minWidth: 150
                }, 
                
                {
                    field: 'putseedclass',
                    title: '投入品类别',
                    align: "center",
                    minWidth: 150
                }, 
                {
                    field: 'putseedsource',
                    title: '投入品来源类别',
                    align: "center",
                    minWidth: 150
                }, 
               
            ]
            ]
            
        });
    
    }
})