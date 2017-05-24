<?php

/**
 * @file
 * Default simple view template to all the fields as a row.
 *
 * - $view: The view in use.
 * - $fields: an array of $field objects. Each one contains:
 *   - $field->content: The output of the field.
 *   - $field->raw: The raw data for the field, if it exists. This is NOT output safe.
 *   - $field->class: The safe class id to use.
 *   - $field->handler: The Views field handler object controlling this field. Do not use
 *     var_export to dump this object, as it can't handle the recursion.
 *   - $field->inline: Whether or not the field should be inline.
 *   - $field->inline_html: either div or span based on the above flag.
 *   - $field->wrapper_prefix: A complete wrapper containing the inline_html to use.
 *   - $field->wrapper_suffix: The closing tag for the wrapper.
 *   - $field->separator: an optional separator that may appear before a field.
 *   - $field->label: The wrap label text to use.
 *   - $field->label_html: The full HTML of the label to use including
 *     configured element type.
 * - $row: The raw result object from the query, with all data it fetched.
 *
 * @ingroup views_templates
 */

?>

<?php
  global $base_url;

  drupal_add_js(drupal_get_path('module', 'new_coupons') . '/scripts/coupons.print.js');
  drupal_add_css(drupal_get_path('module', 'new_coupons') . '/styles/coupons.page.css', array('media' => 'screen'));

  $coupon_node_title = $row->_field_data['node_field_data_field_product_coupon_nid']['entity']->title;

  $language =  $GLOBALS['language']->language;
  $generation_path = '/generate-coupon/'. $row->node_field_data_field_product_coupon_nid;
  $iframe_id = 'iframe-coupon-image';

  $coupon_category_url = 'get-coupons/' . $row->_field_data['node_field_data_field_product_coupon_nid']['entity']->field_coupon_category[$language][0]['target_id'];
  $coupon_node_alias = drupal_get_path_alias($coupon_category_url);

  if ($language == 'en') {
	$webform_id = '311';
	$print_button_class = '<span class="engl">PRINT COUPON</span>';
	$share_button = '<a class="big blue box-shadow shareit">Share Coupon</a>';
  }
  else {
	$webform_id = '316';
	$print_button_class = '<span class="fren">IMPRIMER LE COUPON</span>';
	$share_button = '<a class="big blue box-shadow shareit">PARTAGER LE BON DE RÉDUCTION</a>';
	$coupon_node_alias = 'fr/' . $coupon_node_alias;
	$generation_path = '/fr' . $generation_path; 
  }

  $email_coupon = l(t('EMAIL COUPON'), 'modal_forms/nojs/webform/' . $webform_id, array('query' => array('coupon' => $row->node_field_data_field_product_coupon_nid, 'currentpage' => $coupon_node_alias), 'attributes' => array('class' => array('ctools-use-modal', 'ctools-modal-modal-popup-large', 'big', 'blue', 'box-shadow'))));
  
  $iframe_content = '<iframe src="'. $generation_path .'"
                      name="iframecouponimage"
                      id="' . $iframe_id . '"
                      frameborder="0"
                      scrolling="no"
                      width="1"
                      height="1"
                      class="coupon-image-code"></iframe>';
  
  $print_coupon_button = '<a href="#" id="btnPrintCoupon" class="big blue box-shadow">' . $print_button_class . '</a>';
  
  $share_coupon_button = '<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4ef48e4e04fb79af"></script>
		<div class="addthis_toolbox" addthis:url="' . $base_url . '/' . $coupon_node_alias . '" addthis:title="' . $coupon_node_title . '">
        ' . $share_button . '
        <div class="custom_images">
        <a class="addthis_button_facebook">Facebook</a>		
        <a class="addthis_button_twitter">Twitter</a>	
        </div>
		</div>';
  
  print '<div class="coupon-container"><div class="coupon-buttons"><div class="email-coupon">' . $email_coupon . '</div><div class="print-coupon-btn">' . $print_coupon_button . '</div><div class="share-coupon-btn">' . $share_coupon_button . '</div></div>' . $iframe_content . '</div>';
?>
