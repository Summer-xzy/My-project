function addCity(){
		var city = [
			['石家庄', '北京', '上海', '天津', '重庆', '广州', '深圳', '东莞', '杭州', '成都', '沈阳', '大连', '南京', '苏州', '哈尔滨', '武汉', '长沙', '不限'],
			['巴音郭楞', '包头', '宝鸡', '北京', '博罗', '沧州', '常州', '长春', '长沙', '成都', '西双版纳', '重庆'],
			['大连', '大庆', '德宏', '东莞', '佛山', '福州', '广州', '桂林', '贵港', '贵阳'],
			['哈尔滨', '海安', '海口', '海门', '海宁', '杭州', '合肥', '河池', '贺州', '呼和浩特', '淮安', '惠州', '鸡西', '吉林', '济南', '佳木斯', '江门', '金华', '晋江'],
			['开封', '昆明', '临沧', '柳州', '洛阳', '南安', '南昌', '南京', '南宁', '南通', '南阳', '宁波'],
			['莆田', '普洱', '七台河', '齐齐哈尔', '启东', '黔东南', '钦州', '青岛', '泉州', '如皋', '三门峡', '三明', '汕头', '汕尾', '上海', '深圳', '沈阳', '石家庄', '石狮', '松原', '苏州', '宿迁', '台州', '太原', '天津'],
			['威海', '潍坊', '温州', '乌鲁木齐', '无锡', '梧州', '武汉', '西安', '厦门', '湘潭', '新沂', '信阳', '徐州', '许昌', '延边', '阳江', '伊春', '义务', '益阳', '玉溪', '岳阳', '云浮', '肇庆', '郑州', '中山', '周口', '珠海', '株洲', '驻马店', '淄博', '遵义']
		];

		for(var i = 0; i < city[0].length; i++){
			$('<li>' + city[0][i] + '</li>').on('click', function(){
				$('.xinxi .invitePosition').html($(this).html());
				$('.xinxi .city_catalog').css('display', 'none');
			}).appendTo($('.city_detail'));
		}
		$('.city_catalog .city_title').on('mouseenter', 'li', function(){
			$(this).siblings().removeClass();
			$(this).addClass('avtive');
			var index = $(this).index();
			$('.city_detail').html('');
			for(var i = 0; i < city[index].length; i++){
				$('<li>' + city[index][i] + '</li>').on('click', function(){
					$('.xinxi .invitePosition').html($(this).html());
					$('.xinxi .city_catalog').css('display', 'none');
				}).appendTo($('.city_detail'));
			}
		})

		$('.xinxi .invitePosition').add('.xinxi .city_catalog').on('mouseenter', function(){
			$('.xinxi .city_catalog').css('display', 'block');
		})

		$('.xinxi .invitePosition').add('.xinxi .city_catalog').on('mouseleave', function(){
			$('.xinxi .city_catalog').css('display', 'none');
		})
	}
	addCity();

	function chooseJob(){
		$('.jobcate').on('mouseenter', 'li', function(){
			if(this.className != 'bg-head'){
				$(this).addClass('bg-head');
				$(this).on('mouseleave', function(){
					if( !$(this).hasClass('avtive')){
						$(this).removeClass('bg-head');
					}
					
				})
			} 
		})
		$('.jobcate').on('click', 'li', function(){
			$(this).siblings().removeClass();
			$(this).addClass('bg-head selected');

		})
	}
chooseJob();

	function slideshow() {
	  		var oPrevDiv1 = document.getElementsByClassName('left-btn')[0];
	  		var oPrevDiv2 = document.getElementsByClassName('right-btn')[0];
	  		var oLi = document.getElementsByClassName('poster-item');
	  		var arr = [];
	  		function getStyle(obj,attr){
				if (obj.currentStyle) {
					return obj.currentStyle[attr];

				}else{
					return getComputedStyle(obj,false)[attr];
				}
			}
			for (var i = 0; i < oLi.length; i++) {
				arr.push([getStyle(oLi[i],"left"),getStyle(oLi[i],"top"),getStyle(oLi[i],"opacity")*100,getStyle(oLi[i],"z-index"),getStyle(oLi[i],"width"),getStyle(oLi[i],"height")]);
			}
			function move(){
				for (var i = 0; i < oLi.length; i++) {
					oLi[i].style.zIndex = arr[i][3];
					oLi[i].style.left = arr[i][0];
					oLi[i].style.top = arr[i][1];
					oLi[i].style.opacity = arr[i][2];
					oLi[i].style.width = arr[i][4];
					oLi[i].style.height = arr[i][5];
				}
			}
			oPrevDiv1.onclick = function(){
				arr.push(arr[0]);
				arr.shift();
				move();
			}
			oPrevDiv2.onclick = function(){
				arr.unshift(arr[arr.length-1]);
				arr.pop();
				move();
			}
	  	}
	slideshow();

	function Request(){
		$.ajax ({type: 'GET',url: 'job.txt',data: '',dataType: 'json',success: function (json){
				page(iJson, json);
			},
			error: function(){
				alert('数据请求失败');
			}
		});
	}
	function page(iJson, json) {
	 	           
	    var nowNum = iJson.nowNum || 1;
	    var allNum = iJson.allNum || 3;
	    var oDiv = $('.turnPage');

	    if(nowNum == 3) {
	    	var oA = $('<a href="#p" class="up-page"><span>' + '上一页' + '</span></a>');
	    	oDiv.append(oA);
	    }

		for(var i = 1; i <= 3; i++ ) {
			var oA = $('<a href="#' + i + '"><span>' + i + '</span></a>');
			if(i == nowNum){
				oA.prop('class', 'choosed');

			}
			oDiv.append(oA);
		}
		if(nowNum == 1) {
			var oA = $('<a href="#n" class="down-page"><span>' + '下一页' + '</span></a>');
	    	oDiv.append(oA);
		}

		for(var i = 0; i < oDiv.children().length; i++ ) {
			oDiv.children().eq(i).on('click', function (e){
				var hr = $(this).prop('href').slice(-1);
				if(hr == 'p') {
					nowNum = nowNum - 1;
				}else if(hr == 'n') {
					nowNum = nowNum + 1;
				}else {
					nowNum = parseInt(hr);
				}

				oDiv.html('');
				iJson.nowNum = nowNum;
	            page(iJson, json); 
			});
		}
	   iJson.callBack(nowNum, allNum, json);                                                                                                                               
	}        

	var arr = [];
	var iNow = 10 - 1; 
	var iJson = {
		nowNum: 1,
	    allNum: 3,
	    callBack: function (now, all, json) {    
	        var num = now * 10 < json.length ? 10 : json.length % 10;
	        if ( $('.infor .infor-list').length === 0) {                                       
	            for (var i = 0; i < num; i++) {
	            	var oUl = $('<ul class="infor-list"><li class="first"><a href="#">' + json[(now - 1) * 10 + i].name + '</a></li><li>' + json[(now - 1) * 10 + i].address + '</li><li>' + json[(now - 1) * 10 + i].salary + '</li><li>' + json[(now - 1) * 10 + i].experience + '</li><li>' + json[(now - 1) * 10 + i].degree + '</li><li>' + json[(now - 1) * 10 + i].time + '</li></ul>');
	                $('.infor').append(oUl);                      
	            }                 

	            for (var i = 0; i < $('.infor .infor-list').length; i++) {
	                arr.push( [ $('.infor .infor-list').eq(i).position().left, $('.infor .infor-list').eq(i).position().top ] );                        
	            }    

	            for (var i = 0; i < $('.infor .infor-list').length; i++) {                        
	                $('.infor .infor-list').eq(i).css({
	                	position: 'absolute',
	                	left: arr[i][0] + 'px',
	                	top: arr[i][1] + 'px',
	                });

	            }                                                    
	        }else {                   
	           var timer1 = setInterval(function (){
	           		$('.infor .infor-list').eq(iNow).animate({
	           			left: '-60px',
						top: '396px',
	           			opacity: '0'
	           		}, 'slow');
					 $('.near-other-city').css({
						 top: arr[num - 1][1] + 50 + 'px',
						 left: '-60x'
						 
					 }) ;

	           		if(iNow == 0) {
	           			clearInterval(timer1);
	           			var timer = setTimeout(function (){
	           				clearTimeout(timer);
	           				iNow = num - 1;

							   
		           			for(var i = 0; i < num; i++ ) {
		           				$('.infor .infor-list').eq(i).html('<li class="first"><a href="#">' + json[(now - 1) * 10 + i].name + '</a></li><li>' + json[(now - 1) * 10 + i].address + '</li><li>' + json[(now - 1) * 10 + i].salary + '</li><li>' + json[(now - 1) * 10 + i].experience + '</li><li>' + json[(now - 1) * 10 + i].degree + '</li><li>' + json[(now - 1) * 10 + i].time + '</li>');
								  
		           			}
							 $('.near-city').animate({opacity:'1', left: '0px'}, 'slow');
		           			var timer2 = setInterval(function (){
		           				$('.infor .infor-list').eq(iNow).animate({
		           					left: '0px',
		           					top: arr[iNow][1] + 'px',
		           					opacity: '1'
		           				},'slow' );
		           				if(iNow == 0) {
		           					clearInterval(timer2);
		           					iNow = num - 1;
		           				}else {
		           					iNow--;
		           				}
		           			}, 50);
	           			},100);
	           			
	           		}else {
	           			iNow--;
	           		}
	           },50)              
	          
	        }                  
		}
	}
Request();