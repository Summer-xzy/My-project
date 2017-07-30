//简单提交验证
(function($) {
	$.fn.validate = function() {
			var form=$(this);
			return handle();
			function handle() {
				var flag=true;
				$('.required',form).each(function(){
					var t=$(this);
					if ( t.is('input,textarea') && t.val()=='') {
						alert('请输入'+t.prev('label').text());
						t.focus();
						flag=false;
						return false
					}
				});
				return flag
			}
	}
})(jQuery);