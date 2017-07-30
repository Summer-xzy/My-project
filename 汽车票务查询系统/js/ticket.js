$(function(){

//按姓名身份证号查询车票
$('#ticket_query').click(function(){
	var t=$(this);
	t.attr('disabled',true);
	var r = t.parent('.query-form').validate();
	if (r){
		show_ticket();
	}
	setTimeout(function(){t.attr('disabled',false)},1000);
});


//退票
$('.btn_refund_ticket').live('click',function(){
	var id=parseInt($(this).attr('rel'));
	if (confirm('您确定退票吗？'))	{
		$.post('bus.asp','act=refundticket&id='+id,function(d){
			if (d==1){
				alert('退票成功');
				show_ticket();
			}else{
				alert(d)
			}
		},'text');
		
	}

});

//显示车票查询结果
function show_ticket(){
	var f=$('.query-form'),s=f.serialize()+'&act=queryticket';
	$.post('bus.asp',s,function(d){$("#ticket_list tbody").html(d)},'html');
	$('#ticket_list').show();
}





});