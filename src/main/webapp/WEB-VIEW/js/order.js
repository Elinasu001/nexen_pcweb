$(document).ready(function(){


    // 주문확인 sidebar
    var offset = $("#sidebar").offset();
    var topPadding  = 200;
    var downPadding = 100;
    
    $(window).scroll(function() {
        
        var box_height = $("#sidebar").height();
        var top_max =$(document).height() - box_height - topPadding - offset.top;
        var new_offset = $(window).scrollTop() - offset.top + downPadding;

        if( top_max < new_offset ) new_offset = top_max;

    	if ($(window).scrollTop() > offset.top ) {
            $("#sidebar").stop().animate({
                marginTop: new_offset
            });
        } else {
            $("#sidebar").stop().animate({marginTop:topPadding});
        }

    });

    /*//datepicker
    $( "#datepicker").datepicker({
          showOn: "button",
          buttonImage: "../img/common/calendar.png",
          buttonImageOnly: true,
          //buttonText: "Select date"
    });

    //timepicker
    $('.timepicker').timepicker();*/

});

