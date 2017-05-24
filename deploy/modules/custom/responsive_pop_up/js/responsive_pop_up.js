 (function($) {
   Drupal.behaviors.responsive_pop_up = {
     attach: function(context, settings) {
/******************************************************
               External Link Popup JS
*******************************************************/
      jQuery('a').each(function() {
        var a = new RegExp('/' + window.location.host + '/');
        if (!a.test(this.href)) {
          // This is an external link
          jQuery(this).addClass('external');
        }
      });
      jQuery('.responsive-pop-up a, .share-coupon-btn a, .addthis_toolbox a, .filterby a, .view-id-view_search a').each(function() {
        var a = new RegExp('/' + window.location.host + '/');
        if (!a.test(this.href)) {
          // This is an external link
          jQuery(this).removeClass('external');
        }
      });
      
			$('.external, .popclose, .popcancel').click(function(e){
        var url = $(this).attr('href');
        $('.responsive-pop-up .text-block .pop-ok').attr("href", url);
				$('.responsive-pop-up').toggleClass('active');
				e.preventDefault();
			});
      $('.pop-ok').click(function(e){
				$('.responsive-pop-up').toggleClass('active');
				//e.preventDefault();
			});
     }
   };
 }(jQuery));