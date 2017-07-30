$(function(){

//显示所有车次
function show_bus(){
	$.post('bus.asp','act=listbus',function(d){$("#bus_list tbody").html(d)},'html')

}
//显示所有售出车票
function show_ticket(){ 
	$.post('bus.asp','act=listticket',function(d){$("#ticket_list tbody").html(d)},'html')
}


show_bus();
show_ticket();


//添加车次
$('#bus_add').click(function(){ 
	var t=$(this);
	t.attr('disabled',true);
	var r = $('.form').validate();
	if (r){
		var f=$('.form'),s=f.serialize()+'&act=addbus';
		$.post('bus.asp',s,function(d){
				if (d==1){
						alert('添加成功');
						show_bus();
				}else{
					alert(d)
				}
			},'text');
	}
	setTimeout(function(){t.attr('disabled',false)},1000);
		
	
	
});

//删除车次 (注：会导致该车次已售出车票查不到车次
$('.btn_delete_bus').live('click',function(){
	var id=parseInt($(this).attr('rel'));
	$.post('bus.asp','act=deletebus&id='+id,function(d){
		if (d==1){
			alert('删除车次成功');
			show_bus();
		}else{
			alert(d)
		}
	},'text');
	
});

//删除售出车票记录
$('.btn_delete_ticket').live('click',function(){
	var id=parseInt($(this).attr('rel'));
	$.post('bus.asp','act=deleteticket&id='+id,function(d){
		if (d==1){
			alert('删除车票信息成功');
			show_ticket();
		}else{
			alert(d)
		}
	},'text');
	
});



function init_select(){
	var s=$('select[name=date]'),d=new Date();
	for (var i=0; i<10;i++ ){
		d.setDate(d.getDate() + 1); 
		s.append('<option>'+(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1))+'</option>');
	}
}

init_select();


});