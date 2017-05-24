<?php
/**
* @file
* Coupon image generation functions and iframe generation
*/

define('COUPONS_IMAGE_FONT_ANGLE', 0);

/**
 * Generates the image of the coupon with code and expiration date
 */
function coupons_generate_image($node, $coupon_code = NULL) {
  module_load_include('inc', 'new_coupons', 'new_coupons.code');
  global $user;
  $language =  $GLOBALS['language']->language;

  // $coupon_code = coupons_decode_coupon_code($coupon_code);

  // If output buffering is on: discard current content and disable further buffering
  _coupons_clean_output_buffer();

  // Get text positions
  // $security_code_positions = _coupons_get_security_code_area_positions($node);
  $expiration_date_positions = _coupons_get_expiration_date_area_positions($node);

  // Get expiration date
  $expiration_date = _coupons_get_coupon_expiration_date($node);

  // Image
  $image = $node->field_coupon_image[$language][0]['uri'];

  // Prepare texts to merge with image
  // $security_code_string   = _coupons_get_security_code_information_to_print($node, $coupon_code);
  $expiration_date_string = _coupons_get_expiration_date_information_to_print($node, $expiration_date);

  $texts_to_merge = array(
    /* $security_code_string => array(
      'x' => $security_code_positions['x'],
      'y' => $security_code_positions['y'],
    ), */
    $expiration_date_string => array(
      'x' => $expiration_date_positions['x'],
      'y' => $expiration_date_positions['y'],
    ),
  );

  drupal_add_http_header('Content-type', 'image/png');
  _coupons_render_image_by_gd($image, $texts_to_merge);

  drupal_exit();
}

/**
 * This function works like sprintf php funcion,
 * the difference is that is you can set your token strings.
 *
 * @param string $string
 * @param array $vars
 *
 * @return string
 */
function _coupons_sprintf($format, $variables) {
  return str_replace(array_keys($variables), array_values($variables), $format);
}

/**
 * Renders image by GD library
 *
 * @param string $image
 * @param array $texts
 *   'text' => array(
 *     'x' => x axis position value,
 *     'y' => y axis position value,
 *   )
 */
function _coupons_render_image_by_gd($image, $texts) {
  $image = image_load($image);

  //$image_url = file_create_url($image);
  //$image = imagecreatefrompng($image_url);
  //$image = imagecreatefrompng('sites/default/files/prenatalcoupon_3_pre_en.png');
  image_gd_load($image);

  // Settings
  $textcolor = imagecolorallocate($image->resource, 0, 0, 0);
  $font_path = drupal_get_path('module', 'new_coupons') . '/fonts/Adamina-Regular.ttf';
  $font_size = 9;
  $rotate_factor = _coupons_get_rotate_factor();

  // Merge texts to image
  foreach ($texts as $text => $position) {
    imagettftext($image->resource, $font_size, COUPONS_IMAGE_FONT_ANGLE, $position['x'], $position['y'], $textcolor, $font_path, $text);
  }

  //$rendered_image = imagepng(imagerotate($image->resource, $rotate_factor, imageColorAllocateAlpha($image->resource, 0, 0, 0, 127)));
  //imagefill($image->resource,0,0,0x7fff0000);

  $color = imagecolorallocatealpha($image->resource, 0, 0, 0, 127); //fill transparent back
  imagefill($image->resource, 0, 0, $color);
  imagesavealpha($image->resource, true);
  
  //$rendered_image = imagepng(imagerotate($image->resource, $rotate_factor, 0));
  $rendered_image = imagepng($image->resource);

  imagedestroy($image->resource);

  return $rendered_image;
}

/**
 * Returns the coupon expiration date
 *
 * @param object $node
 *
 * @return string $expiration_date
 */
function _coupons_get_coupon_expiration_date($node) {
  $coupon_end_date = strtotime($node->field_coupon_end_date[$node->language][0]['value']);
  $expiration_date = mktime(0, 0, 0, date('m'), date('d') + $node->field_coupon_exp_time[$node->language][0]['value'], date('Y'));

  if ($expiration_date > $coupon_end_date) {
    $expiration_date = $coupon_end_date;
  }

  return $expiration_date;
}

/**
 * Returns the security code information to be printed
 *
 * @param object $node
 * @param string $coupon_code
 *
 * @return string
 */
function _coupons_get_security_code_information_to_print($node, $coupon_code) {
  $label_prefix = NULL;

  if (isset($node->field_coupon_code_prefix_text[$node->language][0]['value'])) {
    $label_prefix = $node->field_coupon_code_prefix_text[$node->language][0]['value'];
  }

  return $label_prefix ? t($label_prefix) . $coupon_code : $coupon_code;
}

/**
 * Returns the expiration date information to be printed
 *
 * @param object $node
 * @param string $coupon_code
 *
 * @return string
 */
function _coupons_get_expiration_date_information_to_print($node, $expiration_date) {
  $language =  $GLOBALS['language']->language;
  $label_prefix = NULL;

  // Define date format
  $date_variables = array(
    '%d%' => date('d', $expiration_date),
    '%m%' => t(date('F', $expiration_date)),
    '%y%' => date('Y', $expiration_date),
  );
  $date_format = $node->field_coupon_date_print_format[$node->language][0]['value'];
  $expiration = _coupons_sprintf($date_format, $date_variables);

  if (isset($node->field_coupon_date_prefix_text[$language][0]['value'])) {
    $label_prefix = $node->field_coupon_date_prefix_text[$language][0]['value'];
  }

  return $label_prefix ? t($label_prefix) . $expiration : $expiration;
}

/**
 * Clean (erase) the output buffer and turn off output buffering
 */
function _coupons_clean_output_buffer() {
  if (ob_get_level()) {
    ob_end_clean();
  }
}

/**
 * Returns an array with the positions of the security code on coupon image.
 *
 * @param object $node
 *   type: coupon
 *
 * @return array
 */
function _coupons_get_security_code_area_positions($node) {
  return array(
    'x' => $node->field_coupon_code_pos_x[$node->language][0]['value'],
    'y' => $node->field_coupon_code_pos_y[$node->language][0]['value']
  );
}

/**
 * Returns an array with the positions of the expiration date on coupon image.
 *
 * @param object $node
 *   type: coupon
 *
 * @return array
 */
function _coupons_get_expiration_date_area_positions($node) {
  return array(
    'x' => $node->field_coupon_code_date_x[$node->language][0]['value'],
    'y' => $node->field_coupon_code_date_y[$node->language][0]['value']
  );
}

function _coupons_get_rotate_factor() {
  $safari_version = _coupon_get_safari_version();
  $is_browser_safari = ($safari_version !== NULL);
  $orientation = variable_get('coupon_orientation', 'portrait');
  $rotate_factor = 0;
  if (($is_browser_safari && $safari_version < 5)  || $orientation == 'landscape') {
    $rotate_factor = -90;
  }

  return $rotate_factor;
}

function _coupon_get_safari_version() {
  $version = NULL;

  if (preg_match('#Version/([0-9]).*Safari/[0-9\.]+$#', $_SERVER['HTTP_USER_AGENT'], $matches)) {
    $version = $matches[1];
  }

  return $version;
}


function coupons_generate_coupon($node, $coupon_code = NULL) {
  $language =  $GLOBALS['language']->language;
  module_load_include('inc', 'new_coupons', 'new_coupons.code');
  drupal_add_css(drupal_get_path('module', 'new_coupons') . '/styles/coupons.print.css', array('media' => 'print'));

  // $coupon_code = coupons_decode_coupon_code($coupon_code);

  // global $user;
  /* $is_admin = coupons_is_user_admin($user);
  if (!$is_admin) {
    coupons_redirect_to_coupon_form_on_invalid_coupon_code($coupon_code, $node);
  } */

  if ($language == 'en') {
    $node->field_coupon_image['und'][0]['path'] = 'coupon-image/' . $node->nid;
  }
  else {
	$node->field_coupon_image['und'][0]['path'] = 'fr/coupon-image/' . $node->nid;  
  }

  $image_markup = theme('image', $node->field_coupon_image['und'][0]);

  $safari_version = _coupon_get_safari_version();
  $is_browser_safari = ($safari_version !== NULL);
  $orientation = variable_get('coupon_orientation', 'portrait');

  if (($is_browser_safari && $safari_version < 5) || $orientation == 'landscape') {
    $output = <<<HTML
    <div class="coupon-image-code landscape">
      {$image_markup}
    </div>
HTML;
  }
  else {
   $output = <<<HTML
    <div class="coupon-image-code">
      {$image_markup}
    </div>
HTML;
  }

  return $output;
}

function coupons_iframe_content($page_callback_result) {
  $page = array(
    '#theme_wrappers' => array('html'),
      'content' => array(
        '#markup' => $page_callback_result,
    ),
  );

  print drupal_render($page);
}
