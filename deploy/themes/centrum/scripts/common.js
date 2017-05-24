
Drupal.behaviors.myBehavior = {
  attach: function (context, settings) {
  var $= jQuery;
  $(".custom_images, .main-search").hide();   
  
  // Social sharing icons
  $(".shareit").on("click", function() {
      $(this).next(".custom_images").slideToggle(0);   
  });

   /******************************************************
         Article Print
*******************************************************/

$('.node-type-article .print-article a').click(function() {
  window.print();
});
  // Search show/hide
  $(".search-wrapper").on("click", function() {
    $(".main-search").slideToggle(0);
    $(this).toggleClass('close-search');      
  });
/*****************************************************************				
                        Body class JS				
****************************************************************/				
var url = window.location.pathname;				
if (url != '/') {				
    var parent_q = document.URL.split('/')[4];				
    var parent_y = document.URL.split('/')[3];				
		jQuery('body').addClass(parent_q);				
    jQuery('body').addClass(parent_y);				
}
  /****** Omniture*******/
    /*Product facet*/

 $('.sidebar-wrapper .form-type-checkbox .control-label').once().mouseup(function(){
   var gender = $(this).text().split(/\(([^)]+)\)/);
  var menu_title = gender[0].trim();
  var parent_title = $(this).parents('.block ').find(' h2.block-title').text();
  var title_section = 'Product Filter';
  omnitureProductFilterTagging(menu_title,parent_title,this,title_section);
});
  //Find your centrum//
$('#edit-step1-age .form-item-step1-age .control-label').mouseup(function(){
  var menu_title = $(this).text();
  omnitureFindYourCentrumAgePage(menu_title,'event51',this);
});
$('#edit-step2-gender .form-item-step2-gender .control-label').once().mouseup(function(){
  var menu_title = $(this).text();
  omnitureFindYourCentrumGenderPage(menu_title,this);
});
/* $('#edit-step3-other-considerations-new .form-type-checkbox .control-label').once().click(function(){
  if($(this).prop( "checked" )){
  var menu_title = $(this).text();
  omnitureFindYourCentrumOtherConsiderationsPage(menu_title,this);
  }
});
$('#edit-step4-health-interest-new .form-type-checkbox .control-label span input:checkbox').once().click(function(){
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
}); */
 

//Coupon email//
$('.webform-client-form  .form-group .form-submit').click(function(){
 var menu_title = $(this).text();
 var title_section = 'Email send successfully';
 omnitureEventTrack(menu_title,'event15',this,title_section);
});

 
	// Product filter page check if value is 0
	
	if ($('label:contains("(0)")').length > 0) {
    $('label:contains("(0)")').css( "color", "#999" );
		$('label:contains("(0)")').children('input').prop("disabled", true);
  }
  $('.view-health-benefits .plus, .views-field-nothing .plus').on('click',function(e) {
		e.preventDefault();
    $(this).parents('.views-field-nothing').siblings(".views-field-nothing-1, .views-field-description-field-et").fadeIn();
    $(this).parents('.views-field-nothing').fadeOut();    
  });
  $('.view-health-benefits .cross, .views-field-nothing-1 .cross').on('click',function() {
      $(this).parents('.views-field-nothing-1').siblings(".views-field-nothing").fadeIn();
      $(this).parents('.views-field-nothing-1').siblings(".views-field-description-field-et").fadeOut();
      $(this).parents('.views-field-nothing-1').fadeOut();
  });
  jQuery(document).ready(function() {
    var desktopTab = document.getElementById('block-quicktabs-atozinc-desktop');
    var mobileAcoordian = document.getElementById('block-quicktabs-atozinc-mobile');
    var PrenatalDesktop = document.getElementById('block-quicktabs-key-nutrients-quicktab');
    var PrenatalMobile = document.getElementById('block-quicktabs-key-nutrients-mobile');       
    function removeDesktopTab() {
    $(desktopTab).detach();
    $(PrenatalDesktop).detach();
    }
    function removeMobileAccordian() {
    $(mobileAcoordian).detach();
    $(PrenatalMobile).detach();
    }    
    if($(document).width() >= 768) {
      removeMobileAccordian();
      $('.a-to-zinc-library .region-content').append(desktopTab);
      $('.node-type-section-landing-pages .region-content').prepend(PrenatalDesktop);    
      $('#navbar ul.nav li.dropdown').hover(function() {
        $(this). find('.dropdown-menu'). stop(true, true). delay(200). fadeIn(300);
        }, function() {
          $(this). find('.dropdown-menu'). stop(true, true). delay(200). fadeOut(300);
          $('.navbar .dropdown > a').click(function(){ location.href = this.href; });
      });
    }
    else if ($(document).width() < 768) {
      removeDesktopTab();
		$('.a-to-zinc-library .region-content').append(mobileAcoordian);
		$('.node-type-section-landing-pages .region-content').prepend(PrenatalMobile);
		$('#navbar ul.nav li.dropdown > a').removeClass('disabled');
		$('#navbar ul.nav li.dropdown').on('click', function() {
			var $el = $(this);
			if ($el.hasClass('open')) {
				var $a = $el.children('a.dropdown-toggle');
				if ($a.length && $a.attr('href')) {
					location.href = $a.attr('href');
				}
			} 
      }); 
    }
  $(window).resize(function() {
    if($(document).width() >= 768){
      removeMobileAccordian();
      $('.a-to-zinc-library .region-content').append(desktopTab);
      $('.node-type-section-landing-pages .region-content').prepend(PrenatalDesktop);
    }
    else if($(document).width() < 768){
      removeDesktopTab();
      $('.a-to-zinc-library .region-content').append(mobileAcoordian);
      $('.node-type-section-landing-pages .region-content').prepend(PrenatalMobile);
    }
  });
 /*omniture contact-us-loaded*/
     if (jQuery('body').hasClass('page-node-28')) {
    var text = 'Contact Us loaded';
    //alert('loaded');
   omnitureContactUs(text,'event1',this);
               
                
};
/*omniture fertility calculator loaded*/
     if (jQuery('body').hasClass('fertility-calculator')) {
    var text = 'Fertility Calculator loaded';
    //alert('loaded');
   omnitureContactUs(text,'event61',this);
               
                
};
/*omniture product page loaded*/

    if (jQuery('body').hasClass('products')) {
   //var menu_title = 'product page loaded';
    var parent_title = jQuery(this).find('.prod-content h1').text();
    // alert(parent_title);//alert('loaded');
  omnitureProductPage(parent_title,'event8',this);
    };
  
  
    

/*************************************************************************
              Uniform Js
**************************************************************************/  
jQuery("select, checkbox, input, .form-type-radio").uniform({
  selectAutoWidth: false
});     

/*************************************************************************
                        Ipad Js
**************************************************************************/ 
if( /iPad/i.test(navigator.userAgent) ) {
  jQuery('meta[name=viewport]').remove();
  jQuery('head').append('<meta name="viewport" content="width=1100, user-scalable=no" />'); 
}

/*************************************************************************
                        Ipad Navigation  Dropdown click
**************************************************************************/ 
if( /iPad/i.test(navigator.userAgent) ) {
  jQuery('ul.navbar-nav li.dropdown a').on('click',function(e){
    if (jQuery(this).parent().hasClass( 'dropdown' )) {
      jQuery(this).parent().removeClass('touchOpen');
      jQuery(this).parent().addClass('touchOpen');
      return false;
    }
  });
}
/*************************************************************************
                    Find your centrum js
**************************************************************************/ 
/*****************Age Tout*******************/ 
if($('#other_considerations_new').is(':visible')) {

if($(this).hasClass('checked')) {
			$(this).parents('.checkbox').addClass('active');
		} else {
			$(this).parents('.checkbox').removeClass('active');
		}
		
		
$('#other_considerations_new .control-label span').unbind('click').bind('click', function() {
		if($(this).hasClass('checked')) {
			$(this).parents('.checkbox').addClass('active');
		} else {
			$(this).parents('.checkbox').removeClass('active');
		}
});



$('#other_considerations_new .inactive  input').prop("disabled", true);
	$('#other_considerations_inactive .form-checkboxes > div').addClass('inactive').appendTo('#edit-step3-other-considerations-new');
 
 $('#other_considerations_inactive .form-checkboxes > div').addClass('inactive').appendTo('#other_considerations_new .form-checkboxes');
}
if($('#health_interest_new').is(':visible')) {
  $('#health_interest_new .form-checkboxes .inactive input').prop("disabled", true);
} 

    
//    Find your centrum 4th step
jQuery(document).ready(function() {

if($('#health_interest_new .form-checkboxes').is(':visible')) {
$('#product_result').insertAfter('#health_interest_new');
$('#health_interest_legal').insertAfter('#prev');


	$( ".health-wrap" ).each(function(index) {
		var healthTitledata = $(this).find('.health-title').text();
		var healthTitle = healthTitledata.split('*');
		var healthLight = $(this).find('.health-light').text();
		var healthDark = $(this).find('.health-dark').text();
		var healthDesc = $(this).find('.health-desc').text();
		var healthResult = $(this).find('.health-result').html();
		var legalnumber = $(this).find('.legal_numbers').text();
		
		var html1 = '<div class="views-field views-field-nothing"><span class="field-content"><div class="plus">&nbsp;</div></span></div>';
		var html2 = '<div style="background:#'+healthDark+'" class="health-benefits-image"><div class="field-content">'+healthResult+'</div></div>';
		var html3 = '<div style="background:#'+healthLight+'" class="health-benefits-title"><div class="field-content">' +healthTitle[0]+  '<sup>'+legalnumber+'</sup></div></div>';
		var html4 = '<div class="views-field views-field-field-health-benefits-image-et">'+html2+html3+'</div>';
		var html5 = '<div class="views-field views-field-nothing-1"><span class="field-content"><div class="cross">&nbsp;</div></span></div>';
		var html6 = '<div class="views-field views-field-description-field-et"><div class="field-content"><p>'+healthDesc+'</p></div>  </div>';
		var htmltxt = '<div class="after-txt">' + html1 + html4 + html5 + html6 + '</div>';
		if($( this ).parent().find('div.after-txt').length == 0){
			$( this ).after(htmltxt);
			

		}

	});
}
});

  jQuery('#edit-step1-age input:radio').change(function() { 
		jQuery('#continue .btn-default').trigger('mousedown'); 
	});
  jQuery('#edit-step2-gender input:radio').change(function() {
		jQuery('#continue .btn-default').trigger('mousedown'); 
	});


/*************************************************************************
                    Fertility calculator hidden-visible js
**************************************************************************/   
if (jQuery(".result-bottom-section-container").css('visibility') == 'hidden') {
  jQuery(".result-bottom-section-container").css("position", "absolute");
}
else {
  jQuery(".result-bottom-section-container").css("position", "relative");
}
/*************************************************************************
                    Find your centrum Flip Effect Js
**************************************************************************/
jQuery('#health_interest_new .after-txt').on('click',function(e) {
  e.preventDefault();
});
/*************************************************************************
                    Fertility calc block hidden-visible js
**************************************************************************/ 
jQuery('.fertility-calc-block h2').once().click(function() {
  if (jQuery(this).hasClass('active')) {
    jQuery(this).removeClass('active');
    jQuery('.fertility-calc-block .fertility-calc-block-p').slideDown();
  }
  else {      
    jQuery(this).addClass('active');  
    jQuery('.fertility-calc-block .fertility-calc-block-p').slideUp();
  }
});

/******************************************************
          overlay for mobile
*******************************************************/
if ( bodywidth  < 768) {
  jQuery('.navbar-toggle').click (function() {
    if(!jQuery('.navbar-collapse').hasClass('in')){
      jQuery('#skip-link').addClass('overlay');
    }
    else {
      jQuery('#skip-link').removeClass('overlay');
    } 
  });
}
/****************************************************************
              For Products menu active class js
*****************************************************************/
jQuery('.navbar-collapse .menu li.active .dropdown-menu li a').removeClass('active');
jQuery('.navbar-collapse .menu li.active .dropdown-menu li a').removeClass('active-trail');
var web_url = window.location.href.replace(window.location.origin, '').replace('fr/', '');
var web_url_replace = web_url.replace('/', '');
jQuery('.menu li ul.dropdown-menu li a').each(function() {
  var link_url = jQuery(this).attr('href').replace('fr/', '');
  var link_url_replace = link_url.replace('/', '');
  if (link_url_replace == web_url_replace) {
    jQuery(this).addClass('active');
    jQuery(this).parent().parent().prev('a').addClass('active');
    return false;
  }
});
jQuery('.menu li.products-link ul.dropdown-menu li a').each(function() {
  var link_url = jQuery(this).attr('href').replace('fr/', '');
  var link_url_replace = link_url.replace('/', '');
  if (link_url_replace == web_url_replace) {
    jQuery(this).addClass('active');
    if (jQuery(this).hasClass('active')) {
      var active_url = jQuery('.menu li.products-link ul.dropdown-menu li a.active').text();
      jQuery('.page-header').html(active_url);
    }
  }
});
/****************************************************************
          Mobile Product Page category drop down JS
****************************************************************/
var web_url_three = window.location.href.replace(window.location.origin, '').slice(-3);
jQuery('#edit-jump option').removeAttr("selected");
jQuery('#edit-jump option').each(function() {
  var value = jQuery(this).val().slice(-3);
  if(value == web_url_three) {
    jQuery(this).addClass('active');
    jQuery(this).attr('selected','selected');
    if ( jQuery(this).is(':selected') ) {
      var active_option = jQuery('#edit-jump option.active').text();
      jQuery('#uniform-edit-jump span').html(active_option);
    }
  }
});
/****************************************************************
              For Products active class js
*****************************************************************/
var current_url = window.location.href.replace(window.location.origin, '').replace('fr/', '');
var current_url_replace = current_url.replace('/', '');
jQuery('.view-product-category-tout .view-content .browse-category a').each(function() {
  var current_link_url = jQuery(this).attr('href').replace('/', '');
  if (current_link_url == current_url_replace) {
    jQuery(this).addClass('active');
    if (jQuery(this).hasClass('active')) {
      var active_category = jQuery('.view-product-category-tout .view-content .browse-category a.active .category-name').text();
      jQuery('.page-header').html(active_category);
    }
  }
  if (current_url_replace == "products"){
    jQuery('.page-header').html(Drupal.t("All Centrum Products"));
  }
}); 
jQuery(window).load(function(){ 
  jQuery('.page-products .page-header').css('visibility','visible');
});
/******************************************************
               For Promo banner Text
*******************************************************/
var promo_lentgh = jQuery('.views-row.active .promo-wrapper .promo_image img').length; 
if ( promo_lentgh === 0) {
  jQuery('.promo-wrapper').css('display' ,'table');
  jQuery('.promo-banner .promo-wrapper .promo-text-body').css("display","table-cell");
} 
/******************************************************
               For Promo banner Text
*******************************************************/
jQuery(".popups-close.close").click(function() {
  jQuery("body").removeClass("modal-open");
});
/**********************/
jQuery(".view-footer").clone().insertBefore(".text-center");
/******************************************************
            Back to top translation
*******************************************************/
if(jQuery('body').hasClass('i18n-fr')) {
  jQuery('#backtotop').html('HAUT DE PAGE');
}
/******************************************************
            Search translation
*******************************************************/
if(jQuery('body').hasClass('i18n-fr')) {
  jQuery('.search-form #edit-actions .form-submit').html("Lancer");
}
if(jQuery('body').hasClass('i18n-fr')) {
  jQuery('.search-form .custom-search-box').remove();
  jQuery('.search-form .form-type-textfield').append('<input title="Enter the terms you wish to search for." class="custom-search-box form-control form-text uniform-input text" placeholder="Rechercher" type="text" id="edit-custom-search-blocks-form-1--2" name="custom_search_blocks_form_1" value="" size="15" maxlength="128">');
}
if(jQuery('body').hasClass('i18n-fr')) {
  jQuery('.page-view-search .page-header').html("Recherche");
}
if(jQuery('body').hasClass('i18n-fr')) {
  jQuery('#edit-submit-view-search').html("Recherche");
}
/******************************************************
                For Promo banner
*******************************************************/

});


    
    
  }
};
var bodywidth = jQuery(window).width(); 
var windowWidth;
jQuery(window).on('resize load', function() {
  windowWidth = jQuery(window).width();
});

/*************************************************************************
                        Language Text Trim
**************************************************************************/ 
var languageChangeText = function(){
  var bodywidth = jQuery(document).width();

    if( bodywidth  < 768){  
      jQuery('.language-switcher-locale-url li.last a').text('FR');
      jQuery('.language-switcher-locale-url li.first a').text('EN');
    }
    else  {
      jQuery('.language-switcher-locale-url li.last a').text('FRANÇAIS');
      jQuery('.language-switcher-locale-url li.first a').text('ENGLISH');
    }
    
     
};
jQuery(document).ready(languageChangeText);
jQuery(window).resize(languageChangeText);  
/******************************************************
          Prenatal Stages Pregnancy
*******************************************************/
var PrenetalStages = function () {
  
  var bodywidth = jQuery(window).width();
  if( bodywidth  >= 768) {  
    jQuery('.prenatal .views-field-body').appendTo('.view-stages-of-pregnancy').wrap("<div class='prenetal-tab-container' id=></div>");
    var ID = 0;
    jQuery('div.prenetal-tab-container').each(function() {
      ID++;
      jQuery(this).attr('id', 'article_'+ID);
    });
    jQuery('.view-stages-of-pregnancy').on('click', '.prenatal-learn-more', function(e) {
      var j = jQuery(this).index(".view-stages-of-pregnancy .prenatal-learn-more");   
      jQuery('.prenetal-tab-container').hide();
      jQuery('#article_' + (j + 1)).show();
      e.preventDefault();
      
    });
    
    jQuery(".stages-of-pregnancy .close").click(function(){
      jQuery('.prenetal-tab-container').hide();
    }); 


  }
  else if ( bodywidth  < 768) {

    jQuery('.stages-of-pregnancy .views-field-body').hide();
  
    jQuery('.view-stages-of-pregnancy').on('click', '.prenatal-learn-more', function(e) {
      e.preventDefault();
      if (jQuery(this).hasClass('active')) {
        jQuery(this).removeClass('active'); 
        jQuery(this).parent().parent().next().slideUp('fast');
        
      }
      else {
        jQuery('.stages-of-pregnancy .close').click(function() { 		        		        
			console.log('hi');				
			jQuery(this).parent().parent().slideUp();				
			jQuery(this).parent().parent().prev().find('.prenatal-learn-more').removeClass('active');				
	    });		  
        
        jQuery(this).parent().parent().next().slideDown('fast');
        jQuery(this).addClass('active');
         
      } 
    
    
    });
}

};
jQuery(document).ready(PrenetalStages);

/******************************************************
          Product filter Accordion
*******************************************************/   
var ProductFilter = function () {  
  var bodywidth_product = jQuery(window).width(); 
  jQuery('.page-products .region-sidebar-first section h2.block-title').addClass('active');
  jQuery('.page-products .region-sidebar-first section h2.block-title').once().click(function() {
    if (jQuery(this).hasClass('active')) {
        jQuery(this).removeClass('active');
        jQuery(this).nextAll().slideUp();
      
      }
      else {      
        jQuery(this).addClass('active');  
        jQuery(this).nextAll().slideDown();
        
      }
  });
  if ( windowWidth < 768 || bodywidth_product < 768) {
    jQuery('.page-products .sidebar-wrapper .region-sidebar-first').css('display','none');
    jQuery('.page-products .refine-search-title h4').once().click(function() {
      if (jQuery(this).hasClass('active')) {
        jQuery(this).removeClass('active');
        jQuery('.page-products  .sidebar-wrapper .region-sidebar-first').css('display','none');
      }
      else {      
        jQuery(this).addClass('active');  
        jQuery('.page-products .sidebar-wrapper .region-sidebar-first').css('display','block');
      }
    });
  }
  else {
    jQuery('.page-products  .sidebar-wrapper .region-sidebar-first').css('display','block');
  }
}
jQuery(document).ready(ProductFilter);
jQuery(window).resize(function() {
  ProductFilter();
}); 

jQuery(window).load(function(){
var text;
var status;
var title_section = 'Top-Nav';
jQuery('#edit-search').focusout(function(e){
e.preventDefault();
text=jQuery('#custom-entity-form .form-control').val();
status = localStorage.setItem('text1',text);
});
var store_text=localStorage.getItem('text1');
var type = window.location.href;
var rest = type.substring(0, type.lastIndexOf("/") + 1);
var last = type.substring(type.lastIndexOf("=") + 1, type.length); 
console.log(last); 
if(store_text==last){
if(jQuery('.view-display-id-page').find('span').hasClass('no-results')){
console.log('error');
var menu_title = 'Error page';
omnitureNullSearchTerms(store_text,'event5',this);
} else {
var menu_title = 'Search results';
console.log('search result');
}
omnitureSearchPage(menu_title,'event5',this,title_section);

}

});