(function($) {
/* $.fn.grid_content_loading = function($argument1, $argument2) {
  alert('done');
}; */

$.fn.grid_content_loaded = function($argument1) {
  //alert($argument1);
  
  var res = $argument1.split(",");
  for (index = 0; index < res.length; index++) {
		jQuery('.form-item-step4-health-interest-new-'+res[index]).addClass('inactive');
	}
};
})(jQuery);
(function($) {
  Drupal.behaviors.find_your_centrum = {
    attach: function(context, settings) {
    $('.edit-step3-other-considerations-new .form-type-checkbox .control-label span input:checkbox').once().click(function(){
  if($(this).prop( "checked" )){
  var menu_title = $(this).parents('.control-label').text();
  omnitureFindYourCentrumOtherConsiderationsPage(menu_title,this);
  }
});
$('.edit-step4-health-interest-new .form-type-checkbox .control-label span input:checkbox').once().click(function(){
  if($(this).prop( "checked" )){
  var menu_title = $(this).parents('.control-label').find('.after-txt .health-benefits-title .field-content').text();
  omnitureFindYourCentrumHealthBenefitsPage(menu_title,this);
  }
});
$('.recommended_results a span.node-title').once().mouseup(function(){
  var menu_title = $(this).text();
  var parent_title = 'Product|Result Page';
  var title_section = 'Find Your Centrum';
  omnitureFindYourCentrumResultPage(menu_title,parent_title,'event53',this,title_section);
});
/* 
$('.product-result').mouseup(function(){console.log('maro muze');
  var menu_title = 'Submit Result'
  omnitureFindYourCentrumResult(menu_title,'event51',this);
 
  
  }); */ 
  $.fn.finalsubmit = function(data) {
    var menu_title = 'Submit Result'
  omnitureFindYourCentrumResult(menu_title,'event51',this);
  }
       }
  };
}(jQuery));