(function(){
    layui.use(['form','table'], function() {
        var $ = layui.jquery,
            form = layui.form,
            table = layui.table;
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
                getList(res.id);
            }else{
                
            }
        }
       
        //查看详情
        function getList(id){
          //获取列表
          var tableIns = table.render({
              elem: "#test",
              url: baseaip + "plant/StorageManage/getPlantRepository",
              method: "GET",
              where: {
                id:id
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
                  totalNum: res.data.length, //解析数据长度
                  lists: res.data //解析数据列表
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
              // height: 'full-20',//满高
              cols: [
              [
                  {
                  title: "编号",
                  type: "numbers",
                  align: "center",
                  },
                  {
                  field: "allocateName",
                  title: "名称",
                  minWidth: 120,
                  align: "center"
                  },
                  {
                  field: "allocateType",
                  title: "类型",
                  minWidth: 120,
                  align: "center"
                  },
                  {
                  field: "batch",
                  title: "批次",
                  minWidth: 120,
                  align: "center"
                  },
                  {
                  field: "num",
                  title: "重量/数量",
                  minWidth: 120,
                  align: "center"
                  },
                  
              ]
              ]
          });
        }
      
       

       
      
        document.querySelector('.cancels').addEventListener('click',function(){
            window.location.href = '../examine.html'
        })
    })
    

})()