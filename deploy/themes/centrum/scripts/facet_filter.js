jQuery(window).bind("load", function() {
   // code here
   var pathname = window.location.pathname; // Returns path only
var url = window.location.href;
});

jQuery(document).ready(function() {
var url = window.location.href; 
var yetVisited = localStorage[url];
var bannerLength = jQuery('.view-promo-tile .views-row').length;
    if (!yetVisited) {
    // localStorage[url] = "yes";
   
      var session = 1;
      jQuery('.view-promo-tile .views-row:nth-child(1)').addClass('active');
       localStorage.setItem(url,session);
        }
      else {
      var session = localStorage.getItem(url);
      var bannerLength1 = bannerLength +1;
            jQuery('.view-promo-tile .view-content .views-row').removeClass('active');
            session++;
            if( session < bannerLength1 ) {
             jQuery('.view-promo-tile .view-content .views-row:nth-child('+session+')').addClass('active');
            }
            else {
            session = 1;
              jQuery('.view-promo-tile .view-content .views-row:nth-child(1)').addClass('active');
            }
           localStorage.setItem(url,session);
      }
      
      	jQuery( "aside input[type=checkbox]" ).each(function() {
	  jQuery(this).attr('checked', false);
		var cr_sp_val = jQuery(this).parents('label').text().split(/\(([^)]+)\)/);
		var cur_val = cr_sp_val[0].trim();
		jQuery('.filterby ul').append('<li class="text inactive">' +cur_val+ ' <span class="close-txt">&nbsp;</span></li>');

});

	/*jQuery( document ).ready(function() {
 jQuery for adding all products in list 

		
		
		
	});*/
	
			

	
	jQuery('.filterby').append('<a class="reset inactive-reset">Clear all filters</a>');
		jQuery('.reset').click(function() {
		
			jQuery("aside input[type=checkbox]").each(function() {
			
					jQuery(this).attr('checked', false);
					jQuery(this).trigger('change');
					jQuery.uniform.update();
						jQuery('.filterby .reset').addClass('inactive-reset');
            jQuery('.filterby .reset').removeClass('active-reset');
				});
				jQuery('.filterby ul li').removeClass('active');
			});
});
	
 
  
Drupal.behaviors.filter = {
 attach: function (context, settings) {
  var $= jQuery;
				
				//Code added due to dependency of Clear all text filter
			if(!jQuery('.filterby ul li').hasClass('active')) {
				jQuery('.filterby .reset').addClass('inactive-reset');
				jQuery('.filterby .reset').removeClass('active-reset'); 
			}
				//Code added due to dependency of Clear all text filter
			var numItems = jQuery('div.facet-product-list').length;
	//console.log(numItems);
	jQuery("aside input[type=checkbox]").on('change', function() {
			
			numItems = jQuery('div.facet-product-list').length;
	//console.log(numItems);
		
		});
    /* jQuery for Ajax loading image */
		var $loading = $('#loadingDiv').hide();
		$(document)
			.ajaxStart(function () {
			$loading.show();
			//console.log('start');
		})
			.ajaxStop(function () {
			$loading.hide();
			//console.log('stop');
		});
		$('.filterby .prod-count').remove();
		jQuery('.filterby').append('<div class="prod-count">' + Drupal.t("Products:") + '<span>' +numItems+'</span></div>');
	
	  /* jQuery for toggling 'active' class for every change event on checkbox  */
		$("aside input[type=checkbox]").on('change', function() {
			var sel_sp_item = $(this).parents('label').text().split(/\(([^)]+)\)/);
			var sel_val = sel_sp_item[0].trim();
			
			$('.filterby ul li:contains("'+sel_val+'")').toggleClass('active');
			if(jQuery('.filterby li').hasClass('active') && !jQuery('.filterby .inactive-reset').hasClass('active-reset')) {
			jQuery('.filterby .inactive-reset').addClass('active-reset');
			jQuery('.filterby .inactive-reset').removeClass('inactive-reset');
			numItems = jQuery('div.facet-product-list').length;
	//console.log(numItems);
		
		}
			
				
		});
		
	
			
		/* jQuery for removing product filter after click on CLOSE link */
		$('.filterby ul li span.close-txt').click(function() {
			var removed_item  = $(this).parent().text().replace('Close', '').trim();
			
				$("aside input[type=checkbox]").each(function() {
				var cr_sp_value = $(this).parents('label').text().split(/\(([^)]+)\)/);
				var cur_value = cr_sp_value[0].trim();
					if (cur_value == removed_item) {
					$(this).attr('checked', false);
					$(this).trigger('change');
					$.uniform.update();
					}
				});
			$(this).parent().removeClass('active');
/* 									jQuery('.filterby .reset').addClass('inactive-reset');
            jQuery('.filterby .reset').removeClass('active-reset'); */
		}); 

	}
};
    

  


    
