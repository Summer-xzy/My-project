$.ajax({
		type:'GET',
		dataType:'jsonp',
	url:'https://api.douban.com/v2/movie/search?q=张艺兴',
	context:document,
	success:function (json) {
		$('.movielist div').remove();
		var len = json.count;
		var start = json.start;
		for(var i = 0; i < len; i++){
			var div = $('<div/>');
			var div1 = $('<div/>');
			var a = $('<a>' + json.subjects[i].title +' &nbsp&nbsp[可播放]' + '</a>');
			var p2 = $('<p/>');
			var span = $('<span/>');
			var span1 = $('<span> 评分:' + json.subjects[i].rating.average + '</span>');
			var span2 = $('<span>' + '&nbsp&nbsp(' + parseInt(Math.random() * 100000 + 5476) + '人评价)' + '</span>')
			var img = $('<img src = ' + json.subjects[i].images.small + '>');
			var str = '';
				str = json.subjects[i].year + ' / ' ;
			for(var j = 0; j < json.subjects[i].casts.length; j++){
				str += json.subjects[i].casts[j].name + ' / '; 
			}
			str += json.subjects[i].genres.join(' / ');
			var str1 = str;
			a[0].href = json.subjects[i].alt;
			p2.append(a);
			div1.append(p2).append('<p>' + str + '</p>').append(span).append(span1).append(span2);
			div.append(img).append(div1);
			var num = parseInt(json.subjects[i].rating.average / 1);

			span.css('backgroundPosition','0px '+ (10-num)*(-11) + 'px');
			$('.movie .movielist').append(div);
			}
	}});

		
$('.inp-btn').on('click', function (){
	$('.movielist div').remove();
	var $userInput,
		inp = $('.search_text').eq(0),
	$userInput = inp.val();
	$.ajax({
		type:'GET',
		dataType:'jsonp',
	url:'https://api.douban.com/v2/movie/search?q=' + $userInput,
	context:document,
	success:function (json) {
		$('.movielist div').remove();
		var len = json.count;
		var start = json.start;
		for(var i = 0; i < len; i++){
			var div = $('<div/>');
			var div1 = $('<div/>');
			var a = $('<a>' + json.subjects[i].title + ' &nbsp&nbsp[可播放]' + '</a>');
			var p2 = $('<p/>');
			var span = $('<span/>');
			var span1 = $('<span> 评分:' + json.subjects[i].rating.average + '</span>');
			var span2 = $('<span>' + '&nbsp&nbsp(' + parseInt(Math.random() * 100000 + 5476) + '人评价)' + '</span>')
			var img = $('<img src = ' + json.subjects[i].images.small + '>');
			var str = '';
				str = json.subjects[i].year + ' / ' ;
			for(var j = 0; j < json.subjects[i].casts.length; j++){
				str += json.subjects[i].casts[j].name + ' / '; 
			}
			str += json.subjects[i].genres.join(' / ');
			var str1 = str;
			a[0].href = json.subjects[i].alt;
			p2.append(a);
			div1.append(p2).append('<p>' + str + '</p>').append(span).append(span1).append(span2);
			div.append(img).append(div1);
			var num = parseInt(json.subjects[i].rating.average / 1);

			span.css('backgroundPosition','0px '+ (10-num)*(-11) + 'px');
			$('.movie .movielist').append(div);
		}
	}});

})