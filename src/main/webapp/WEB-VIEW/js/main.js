
	
	$('#fullpage').fullpage({
	  menu: '#menu',
	  navigation: true,
      navigationPosition: 'right',
      menu: '#menu',
	  slidesNavigation: true,

        //callback
        afterLoad: function(anchorLink, index){
           if(index == 1){
                $('.txtArea').css({"position":"relative","top":"0px"});       
                $('.txtArea ul li:first-child').css({"position":"relative","top":"0px"}); 
            }
            
           if(index == 2){
                $('.txtArea').css({"position":"relative","top":"0px"});
                $('.txtArea ul li:first-child').css({"position":"relative","top":"0px"}); 
            }
            
           if(index == 3){
                $('.txtArea').css({"position":"relative","top":"0px"});
                $('.txtArea ul li:first-child').css({"position":"relative","top":"0px"});       
			} 
            
           if(index == 4){
                $('.txtArea').css({"position":"relative","top":"0px"});
                $('.txtArea ul li:first-child').css({"position":"relative","top":"0px"}); 
            }
            
           if(index == 5){
                $('.txtArea').css({"padding-top":"50px","padding-bottom":"50px"});
            } else if (index != 5) {
                 $('.txtArea').css({"padding-top":"50px","padding-bottom":"0px"});  //.css({"border":"1px solid blue"})
            }               
            
           if(index == 6){
                $('.txtArea').css({"padding-top":"50px","padding-bottom":"150px"});
            }else if (index != 6) {
                 $('.txtArea').css({"padding-top":"0px"});   //.css({"border":"1px solid red"})
            }   
        }

    });

    $(document).on('click', '.mTop', function () {
       $.fn.fullpage.moveTo(1);        
       $('.txtArea').css({"padding-top":"0px","padding-bottom":"0px"});
    });
