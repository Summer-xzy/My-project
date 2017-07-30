	//圣杯模式
       function inherit(C,P){
        function F(){};
        F.prototype = P.prototype;
        c.prototype = new F();
        c.prototype.construction = C;
        c.prototype.uber = P.prototype;
       }
	// 获取元素
	function getElementOffset(){
		var box = ele.getBoundingClientRect();
		var w = box.width || (box.right - box.left);
		var h = box.height || (box.bottom - box.top);
		return {
			w:w,
			h:h
		}
	}

//获取浏览器视口尺寸
		function getViewportOffset(){
			if (window.innerWidth){
				return {
					"w": window.innerWidth,
					"h": window.innerHeight
				}
			}
			if (document.compatMode == "CSS1Compat"){
				return {
					"w": window.documentElement.clientWidth,
					"h": window.documentElement.clientHeight
				}
			}else {
				return {
					"w": document.body.clientWidht,
					"h": document.body.clientHeight
				}
			}
		}
		//获取滚动条距离
		function getScrollOffset(){
			if (window.pageXOffset) {
				return {
					"w": window.pageXOffset,
					"h": window.pageYOffset
				}
			}
			var dis = {
				"w": document.body.scrollLeft + document.documentElement.scrollLeft,
				"h": document.body.scrollTop + document.documentElement.scrollTop

			}
			return dis;

		}
		// 获取元素的样式
		function getStyle (ele, prop){
			if (ele.currentStyle){
				return ele.currentStyle[prop];
			}else {
				return window.getComputedStyle(ele, null)[prop];
			}
		}


	    
	  

	    // 增加事件
	function addEvent(ele, type, handle){
		if(ele.addEventListener){
			ele.addEventListener(type, handle, false);
		}else if(ele.attachEvent){
			ele['temp' + type + handle] = handle;
			ele[type + handle] = function(){
				ele['temp' + type + handle].call(ele);
			}
			ele.attachEvent('on' + type, ele[type + handle]);
		}else{
			ele['on' + type] = handle;
		}
	}

		//解除事件绑定   
		function removeEvent(ele, type, handler){
			if(ele.removeEventListener){
				ele.removeEventListener(type, handler, false);

			}else if (ele.detachEvent){
				ele.detachEvent('on' + type, handler);
				//handler --> ele[type + handler];
			}else{
				ele['on' + type] = null;
			}
		}

	// 阻止默认事件
    function cancelHandler(event){
    	if(event.pervenDefault){
    		event.pervenDefault();
    	}else{
    		event.returnValue = false;
    	}
    }
    // 取消冒泡
	function stopBubble(event){
		if (event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}


//    	// 拖拽
//    function drag(elem){

// 	   	var disX,
// 	   		disY;

//    		addEvent(elem, 'mousedown', function(e){
//    			var event = e || window.event;
//    			disX = event.clientX - parseInt(getStyle(elem,'left'));
//    			disY = event.clientY - parseInt(getStyle(elem,'top'));
//    			addEvent(document, 'mousemove', mouseMove);
//    			addEvent(document, 'mouseup', mouseUp);
//    			stopBubble(event);
//    			cancelHandler(event);
//    		});
   		// 鼠标移动
   		function mouseMove(e){
   			var event = e || window.event;
   			elem.style.left = event.clientX - disX +"px";
   			elem.style.top = event.clientY - disY +"px";
   		}
//    		// 鼠标抬起
//    		function mouseUp(e){
//    			var event = e || window.event;
//    			removeEvent(document, 'mousemove', mouseMove);
//    			removeEvent(document, 'mouseup', arguments.callee);
//    		}
//    }
// 	   	var div =document.getElementsByTagName('div')[0];
// 	   	drag(div);

		// 获取与上一个父级的距离
	   	function getElementPosition(elem){
	   		var x = elem.offsetLeft,
	   			y = elem.offsetTop;

	   		while(elem.offsetParent != document.body){
	   			elem = elem.offsetParent;
	   			x += elem.offsetLeft;
	   			y += elem.offsetTop;
	   		}
	   		return {
	   			x : x,
	   			y : y
	   		}
	   	}
	   	// fixed 定位
	   	function fixed(elem){
			var x = parseInt(getStyle(elem,'left')),
				y = parseInt(getStyle(elem,'top'));

			window.onscroll = function(e){
				elem.style.left = getScrollOffset().x + x + 'px';
				elem.style.top = getScrollOffset().y + y + 'px';
			}
		}
		//异步加载js
		function asyncLoaded(url, callback){
			var script = document.createElement('script');
			script.type = 'text/javascript';
			if(script.readyState){//IE
				script.onreadystatechange = function(){
					if(script.readyState = 'loaded' || script.readyState == 'complete'){
						script.onreadystate = null;
						callback();
					}
				}
			}else{
			script.onload = function(e){//Safari Chrome Opera Firefox
				callback();
				}
			}
			script.src = url;
			document.body.appendChild(script);
		}

		//运动框架
		function startMove (obj,json) {
		    clearInterval(obj.timer);
		    var iSpeed;
		    var iCur;       
		    var name;     
		    obj.timer = setInterval(function () {
        var bStop = true;
        for (var attr in json) {
            if (attr === 'opacity') {
                name = attr;
                iCur = parseFloat(getStyle(obj,attr)) * 100;
            }else {
                iCur = parseInt(getStyle(obj,attr));
            }
            iSpeed = (json[attr] - iCur) / 7;
            
            if (iSpeed > 0) {
                iSpeed = Math.ceil(iSpeed);
            }else {
                iSpeed = Math.floor(iSpeed);
            }                
            if (attr === 'opacity') {
                obj.style.opacity = (iCur + iSpeed) / 100;
            }else {
                obj.style[attr] = iCur + iSpeed + 'px'; 
            }                    
            if (Math.floor(Math.abs(json[attr] - iCur)) != 0) {
                bStop = false;
            }
        } 
        if (bStop) {
            if (name === 'opacity') {
                obj.style.opacity = json[name] / 100;   
            }
            clearInterval(obj.timer);
            // func();
        }               
    },30);
}
// 		//byclassName 方法
// 		document.prototype.getByClassName = function(className){
// 			var allEle = document.getElementsByTagName('*'),
// 				len = allEle.length,
// 				retArr = [],
// 				reg = /^\s+|\s+$/g;
// 			for(var i = 0; i < len; i++){
// 				if (allEle[i].className.replace(reg,"") == className) {
// 					retArr.push(allEle[i]);
// 				}
// 			}
// 			return retArr;
// 		}
	//封装好的 Ajax ：打开方式 地址 是否异步 回调函数 提交数据
	function Ajax (method,address,flag,callBacks,data) {
		var xhr = null;
		if(window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else {
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		if (method == 'get') {
			xhr.open('get',address,flag);
			xhr.send();		
		}else if (method == 'post') {
			xhr.open('post',address,flag);
			xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
			xhr.send(data);			
		}
		
		xhr.onreadystatechange = function() {
			if ( xhr.readyState == 4 ) {
				if ( xhr.status == 200 ) {
					callBacks(xhr.responseText);
				} else {
					alert('出错了,Err：' + xhr.status);
				}
			}
			
		}	
	}