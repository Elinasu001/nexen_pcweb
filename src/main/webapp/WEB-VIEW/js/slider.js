$(document).ready(function(){


	bx1 = $('.bxslider').bxSlider({
		 slideWidth: 210,
		 slideMargin: 1,
		 minSlides: 1,
		 maxSlides: 3,
		 moveSlides: 1,
		 pager:false

    });

	bx2 = $('.bxslider2').bxSlider({
		 slideWidth: 200,
		 slideMargin: 1,
		 minSlides: 1,
		 maxSlides: 3,
		 moveSlides: 1,
		 pager:false
    });

	bx3 = $('.bxslider3').bxSlider({
		 slideWidth: 210,
		 slideMargin: 1,
		 minSlides: 1,
		 maxSlides: 3,
		 moveSlides: 1,
		 pager:false
    });
    
    //세로형
    bx4 = $('.bxslider4').bxSlider({
         mode: 'vertical',
		 slideWidth: 210,
		 slideMargin: 1,
		 minSlides: 3,
		 maxSlides: 3,
		 moveSlides: 1,
		 pager:false
    });
    
    //최근에 본상품
    bx5 = $('.bxslider5').bxSlider({
		 slideWidth: 345,
         controls: false,
		 slideMargin: 1,
		 minSlides: 1,
		 maxSlides: 1,
		 moveSlides: 1,
		 pager:true
    });

	// popup index show
	$(".addView a img").click(function(){		 
		 var idx = $(this).index();
		 var $imgShow = $(this);

		 $('.popupWrapGall').eq(idx).addClass('md-show');
		 $("#gallImg").attr("src", $imgShow.attr("data-large"));	
	});

	$(".gallPopClose").click(function(){
		$(".popupWrapGall").removeClass('md-show');		
	});
    
      
});	

