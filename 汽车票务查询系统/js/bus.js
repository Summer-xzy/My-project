$(function(){

init_select();

//隐藏浮层
$('.pop-backdrop,#btn_cancel').click(function(){
	$('.popp').hide();
});


//车次查询
$('#bus_query').click(function(){
	var t=$(this);
	t.attr('disabled',true);
	var r = $('.query-form').validate();
	if (r){
		showbus();
	}
	setTimeout(function(){t.attr('disabled',false)},1000);
	return false
});


//点击购票按钮，显示浮层
$('.btn_buy').live('click',function(){
	var id = parseInt($(this).attr('rel')),s='';

	$.post('bus.asp','id='+id+'&act=getbus',function(d){$("#tbl-buy tbody").html(d)},'html')

	$('#btn_ok').attr("rel",id);
	$('.popp').show();
});

//确定购买、该车次余票减一、保存购票记录
$('#btn_ok').click(function(){
	var t=$(this),busid=t.attr('rel');
	var r = $('.buyform').validate();
	if (r){
		var f=$('.buyform'),s=f.serialize()+'&id='+busid+'&act=buyticket';
		$.post('bus.asp',s,function(d){
				if (d==1){
						alert('购票成功');
						showbus(); //刷新列表
						$('.popp').hide(); //隐藏弹层
				}else{
					alert(d)
				}
			},'text');
		
				
		
	}
});

//显示查询结果
function showbus(){
	var f=$('.query-form'),s=f.serialize()+'&act=querybus';
	$.post('bus.asp',s,function(d){$("#tbl tbody").html(d)},'html');
	$('#tbl').show();
}


function init_select(){
	var s=$('select[name=date]'),d=new Date();
	for (var i=0; i<10;i++ ){
		d.setDate(d.getDate() + 1); 
		s.append('<option>'+(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1))+'</option>');
	}
}


});