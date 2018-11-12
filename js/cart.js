$(function(){
    init();

    function init(){
        eventlist();
    }
    function eventlist(){

        $('.mui-pull-right').on('tap',function(){
            // console.log(111);
            $('body').toggleClass('active');
        })
        $('#del_btn').on('tap',function(){
            console.log(111);
        var  $activeLis = $(".Order_details ul .Item:checked").parents("li");
        if($activeLis.length==0){
            mui.toast('请选择你要删除的订单');
            return;
        }else{
            mui.confirm("您确定要删除此订单？","请选择",["确定","取消"],function(eType){
                if(eType.index==0){

                    var $unActiveLis=$(".Order_details ul .Item").not(':checked').parents("li");
                    // 调用同步的方法

                }else if(eType==1){

                }
            }) 
               }
        })
    }
    
 
    var infoToken=sessionStorage.getItem('userInfo');
  
    
    var token=JSON.parse(infoToken).token;
    // var arr=[]
// console.log(token);
   $.ajax({
       url:'my/cart/all',
       type:'get',
        headers:{
            Authorization:token
        },
        success:function(res){
            console.log(res);
            if(res.meta.status==200){
                var infoStr=JSON.parse(res.data.cart_info);
                console.log(infoStr);
              
              if(infoStr){
                var html=template('orderTmpId',{data:infoStr});
                $('.Order_details ul').html(html);
                mui('.mui-numbox').numbox();

              }
                
            //   for()
            }
   
   
        }
    })  

// 获取所有的li
    var $lis=$(".Order_details li")
// 定义一个变量来接收总价格
var total_price=0
for (var  i = 0; i < $lis.length; i++) {
    var li=$lis[i];
    li
    
}
    // $.ajax({
    //     url:'my/cart/add',
    //     type:'post',
    //     // data:{
    //     //     info:info_objStr
    //     // },
    //     headers:{
    //         Authorization:token
            
    //     },
    //     success:function(res){

    //         // console.log(res);
    //         if(res.meta.status==200){

    //         }
    //     }
    // })
})


  