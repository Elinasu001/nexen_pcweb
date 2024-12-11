
$(document).ready(function(){
	
	
	
	$('#fullpage').fullpage({
		menu: '#menu',
		navigation: false,
		navigationPosition: 'right',
		menu: '#menu',
		slidesNavigation: false,
		afterLoad: function(anchorLink, index){
			// alert(111);
			//   if(index == 1){
			//        $('.txtArea').css({"position":"relative","top":"0px"});       
			//        $('.txtArea ul li:first-child').css({"position":"relative","top":"0px"}); 
			//    }
			
			//   if(index == 2){
			//        $('.txtArea').css({"position":"relative","top":"0px"});
			//        $('.txtArea ul li:first-child').css({"position":"relative","top":"0px"}); 
			//    }
			
			//   if(index == 3){
			//        $('.txtArea').css({"position":"relative","top":"0px"});
			//        $('.txtArea ul li:first-child').css({"position":"relative","top":"0px"});       
			// } 
			
			//   if(index == 4){
			//        $('.txtArea').css({"position":"relative","top":"0px"});
			//        $('.txtArea ul li:first-child').css({"position":"relative","top":"0px"}); 
			//    }
			
			//   if(index == 5){
			//        $('.txtArea').css({"padding-top":"50px","padding-bottom":"50px"});
			//    } else if (index != 5) {
			//         $('.txtArea').css({"padding-top":"50px","padding-bottom":"0px"});  //.css({"border":"1px solid blue"})
			//    }               
			
			//   if(index == 6){
			//        $('.txtArea').css({"padding-top":"50px","padding-bottom":"150px"});
			//    }else if (index != 6) {
			//         $('.txtArea').css({"padding-top":"0px"});   //.css({"border":"1px solid red"})
			//    }   
		},
		onLeave:function( anchorLink, index ){
			if( index > 1 ){
				$(".topAreaWrap").addClass('white');
			}else{
				$(".topAreaWrap").removeClass('white');
			}
			
		}
		
	});
	
	
	$('.main-caroucel').slick({
		// arrows:false,
		dots:false,
		// draggable:false,
		pauseOnHover:true,
		accessibility:false,
		adaptiveHeight:true,
		autoplay: true,
        autoplaySpeed: 3000
	});
	
	$('.review-caroucel').slick({
		arrows:false,
		dots:true,
		// draggable:false,
		pauseOnHover:true,
		accessibility:false,
		adaptiveHeight:true,
		slidesToShow: 2,
		slidesToScroll: 2
	});
	
	$('.specialprice-caroucel').slick({
		arrows:false,
		dots:true,
		// draggable:false,
		pauseOnHover:true,
		accessibility:false,
		adaptiveHeight:true,
		slidesToShow: 4,
		slidesToScroll: 4
	  
	});
	
	
	$('.event-popup .popup-body').slick({
		arrows:true,
		dots:false,
		// draggable:false,
		pauseOnHover:true,
		accessibility:false,
		adaptiveHeight:true,
		autoplay: true,
        autoplaySpeed: 3000,
	});
	
	
	
	
	$(document).on('click', '.mTop', function () {
		$.fn.fullpage.moveTo(1);        
		$('.txtArea').css({"padding-top":"0px","padding-bottom":"0px"});
	});
	


	/**
	 * 메인 fullpage.js 화면 :: 퀵메뉴 버튼 [20241210 퍼블]
	 */
	function handleScrollButtons() {
		var $quickMenu = $(".action-buttons-wrap");
		var $footer = $(".fp-auto-height");

		$quickMenu.show().addClass("keyframes");

		$(window).on('scroll', function() {
			var footerOffsetTop = $footer.offset().top; // 푸터의 위치
			var scrollTop = $(window).scrollTop();
			var windowHeight = $(window).height();

			var footerVisible = (scrollTop + windowHeight) > footerOffsetTop;

			var newBottom;
			if (footerVisible) {
				newBottom = (scrollTop + windowHeight - footerOffsetTop) + 50;
			} else {
				newBottom = 100;
			}

			$quickMenu.stop().animate({
				bottom: newBottom + "px"
			}, 300);
		});
	}
	handleScrollButtons();


});