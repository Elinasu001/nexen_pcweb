$(document).ready(function(){
	// gnb
	$( ".gnb > ul > li").mouseover(function() {
		$(".subMenuWrap").stop().slideDown("fast");     
		}).mouseout(function(){
		$(".subMenuWrap").stop().slideUp("slow");      
    });
    
    $(document).on('scroll',function(){
        // console.log('scroll',event,$(document).scrollTop() );

        if( $(document).scrollTop() != 0 ){
            $(".topAreaWrap").addClass('white');
        }else{
            $(".topAreaWrap").removeClass('white');
        }
    });
      
	// sub allMenu  
    $( ".allMenuClose").click(function() {
		$(".allMenuWrap").hide();
        $(".allWrap").after( '<div class="allMenuBg"></div>' ).parent().css({'overflow' : 'auto'});
        $(".allMenuBg").remove();
	});
    
    $( ".allMenu" ).click(function() {         
        $(".allMenuWrap").show();
        $(".allWrap").after( '<div class="allMenuBg"></div>' ).parent().css({'overflow' : 'hidden'});
	});


	// main top button
    $("#fp-nav ul li:nth-child(6)").after( '<a href="#" class="mTop"></a>' ).css({'pointer-events' : 'none'});
    

	// Quick menu Show Hide
	$(window).scroll(function() {
		var st = $(this).scrollTop();
		if (st < 0) {
			$(".quickMenu").hide();
		} else if (st > 100) {
			$(".quickMenu").fadeIn('500');
		} else {
			$(".quickMenu").fadeOut('500');
		}
	});

	//Page Top
	$('.quickMenu .top').bind('click', function(){
		$('body, html').animate({scrollTop:0}, 500);
		return false;
	});

    
     //quick menu
    $( ".quick").click(function() {
		$(".quickBoxWrap").show();
        
        bx5.reloadSlider();
	});
    
     $( ".quickClose").click(function() {
		$(".quickBoxWrap").fadeOut(200);
	});
    
    //tooltip info
    $(".tip,.size,.guide").hover( 
        function(){
            $('#tip' + this.id).show();
        },function(){
            $('#tip' + this.id).hide();
    });
	
    //popupWrap 
    //$(".scrollBox").hide();   
    $('.ser01').click(function () {  
        $('.scrollBox.serView01').show();
    }); 
        
    $('.ser02').click(function () {  
        $('.scrollBox.serView02').show();
    }); 

    $('.serClose01').click(function () {  
        // $('.scrollBox.serView01').hide();
    }); 

    $('.serClose02').click(function () {  
        // $('.scrollBox.serView02').hide();
    }); 


	// tab contents
	$(".tabContent").hide();
    $(".tabContent:first").show();

    // 로그인 이미지 tab
    $(".titleArea ul.tabs li").click(function (){
        $(".titleArea ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".memberBoxWrap .tabContent").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn(); 
    });
    
    
    // 상품상세 ,주문 tab / 
    $(".productInfo ul.tabs li,.orderInfo ul.tabs li").click(function (){
        $(".productInfo ul.tabs li,.orderInfo ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".productInfo .tabContent,.orderInfo .tabContent").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn(); 
    });
    

    // 두번째만 100% 라인
    $("li[rel=tab02]").click(function (){
        $(this).parents().find(".productInfoView").css({'background-image':'url(../img/common/line_03.gif','background-repeat' : 'repeat-x','background-position' : '0 488px'});
        //$("footerSearchBar").reload();
		//$(this).parents().next().find(".selInfoBar").css({'position':'relative','left':'-217px'});
		//console.log($(this).parents().next().css('border','2px solid red'));
    });
 
   
     $("li[rel=tab01],li[rel=tab03]").click(function (){
        $(this).parents().find(".productInfoView").css({'background-image':'none'});
		$(this).parents().next().find(".selInfoBar").css({'position':'relative','left':'0'});
     });

    // 상품상세 tab in tab
    $(".orderWrap ul.tabs li").click(function (){
        $(".orderWrap ul.tabs li").removeClass("active");
        $(this).addClass("active");
        $(".orderWrap .tabContent").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn(); 
    });
    
    // inTab
    $(".intabContent").hide();
    $(".intabContent:first").show();
    
    $(".inTabWrap ul.intabs li").click(function (){
        $(".inTabWrap ul.intabs li").removeClass("active");
        $(this).addClass("active");
        $(".inTabWrap .intabContent").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn(); 
    });
    


    
     //order 하단으로 바로가기
     $('.order').click(function(e){
        $(this).toggleClass("close");
         
        //$(".quickBoxWrap").fadeOut(200);  // 최근본상품 닫기
        
        $(".orderWrap .tabContent:first").show();

        $('.footerSearchBar').toggleClass('open');
        e.stopPropagation();
			 
			if (this.hash !== "") {
				event.preventDefault();

				var hash = this.hash;

				$('html, body').animate({
					scrollTop: $(hash).offset().top
				}, 500, function(){
	   
				window.location.hash = hash;
			});
        } 
     });  
    
  
	// div dropdown
    $('.arrow').click(function(){
        $('.selBox').slideUp();
		
		if ($('#sel'+ $(this).attr('target')).is(':visible'))
			$('#sel'+ $(this).attr('target')).slideUp(300);
		else
			$('#sel'+ $(this).attr('target')).slideDown(300);
    });
    
    
    //toggle show hide
    $(".moShow").on("click", function(){
        var target = $(this).parent().parent().parent().next('.addView');
        $(this).toggleClass("expanded");
        target.slideToggle();
        $('.addView').not(target).slideUp();
            
        bx1.reloadSlider();
        bx2.reloadSlider();
        bx3.reloadSlider();        
    });
    
    
    //accordion
    $(".reviewCon").hide();
    $(".reviewCon.open:first").show();
    
    $('.accordion').find('.header').on('click', function(){
        var current = $(this).closest('.reviewBox');
        var otherView = current.siblings().not(current);
            
        $(this).parent().toggleClass('open');
        
        /*if($(this).hasClass('open')) {
			$(this).parent().removeClass('open');
			$(this).addClass('open');
		}else{
			$(this).parent().removeClass('open');
		}*/
        
        // hide the otherView
        otherView.find('.reviewCon').slideUp('100');
        otherView.find('.nameScore i').addClass('minus').removeClass('plus');

        // toggle current View
        current.find('.reviewCon').slideToggle('100');
        current.find('.nameScore i').toggleClass('minus plus');
    });

	
    
    // 상품 리스트
    var addContent =  $(".orderList").show();   

    $(".orderListBtn").on("click", function(){
         $(this).toggleClass("open");
         addContent.slideToggle(); 
    });    
    

    // layerPopup bg overlay
	$('.md-trigger').click(function(){
		$('body').addClass('bgFix');
	});
	
	$('.md-close,.layPopClose').click(function(e){
		$('body').removeClass('bgFix');
        // $('.popupWrap').removeClass('md-show');	
        $(event.target).parents(".popupWrap").removeClass('md-show');	
		// $(".scrollBox").hide();
		$(".orderList .scrollBox").show();        
		e.preventDefault();
	});
	
	// 시간선택
    $('.timeCheck li span').click(function(){
        $('span.on').removeClass('on');
        $(this).addClass('on');      
    });
    
});	


$(window).scroll(function(){ 
    var scrollTop = $(window).scrollTop();

	if(scrollTop > 500){
		  $('.selInfoBarWrap').addClass('fixed');
	} 
	else{
		$('.selInfoBarWrap').removeClass('fixed');
	}
});



    