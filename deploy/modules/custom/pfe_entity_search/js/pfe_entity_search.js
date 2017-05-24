jQuery(document).ready(function(){
	jQuery("#custom-entity-form").hide();
	jQuery(".search-wrapper p").on('click', function(){
		jQuery("#custom-entity-form").toggle();
	});
});

(function($) {
Drupal.behaviors.pfe_entity_search = {
  attach: function (context, settings) {
	var pager = jQuery(".view-display-id-page .text-center").html();
	jQuery(pager).insertAfter(".view-header");  
  }
};
})(jQuery);	