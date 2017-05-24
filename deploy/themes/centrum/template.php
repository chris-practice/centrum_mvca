<?php
/**
 * @file
 * The primary PHP file for this theme.
 */
 
 

function centrum_preprocess_page(&$variables) {
  if ($variables['node']->type == 'products') {
    $variables['title'] = FALSE;
  }
	
	
  // Add information about the number of sidebars.
  if (!empty($variables['page']['sidebar_first']) && !empty($variables['page']['sidebar_second'])) {
    $variables['content_column_class'] = ' class="col-sm-6"';
  }
  elseif (!empty($variables['page']['sidebar_first']) || !empty($variables['page']['sidebar_second'])) {
    $variables['content_column_class'] = ' class="col-sm-9"';
  }
  else {
    $variables['content_column_class'] = ' class="col-sm-12 nopadding"';
  }

  if (bootstrap_setting('fluid_container') == 1) {
    $variables['container_class'] = 'container-fluid';
  }
  else {
    $variables['container_class'] = 'container';
  }

  // Primary nav.
  $variables['primary_nav'] = FALSE;
  if ($variables['main_menu']) {
    // Build links.
    $variables['primary_nav'] = menu_tree(variable_get('menu_main_links_source', 'main-menu'));
    // Provide default theme wrapper function.
    $variables['primary_nav']['#theme_wrappers'] = array('menu_tree__primary');
  }

  // Secondary nav.
  $variables['secondary_nav'] = FALSE;
  if ($variables['secondary_menu']) {
    // Build links.
    $variables['secondary_nav'] = menu_tree(variable_get('menu_secondary_links_source', 'user-menu'));
    // Provide default theme wrapper function.
    $variables['secondary_nav']['#theme_wrappers'] = array('menu_tree__secondary');
  }

  $variables['navbar_classes_array'] = array('navbar');

  if (bootstrap_setting('navbar_position') !== '') {
    $variables['navbar_classes_array'][] = 'navbar-' . bootstrap_setting('navbar_position');
  }
  elseif (bootstrap_setting('fluid_container') == 1) {
    $variables['navbar_classes_array'][] = 'container-fluid';
  }
  else {
    $variables['navbar_classes_array'][] = '';
  }
  if (bootstrap_setting('navbar_inverse')) {
    $variables['navbar_classes_array'][] = 'navbar-inverse';
  }
  else {
    $variables['navbar_classes_array'][] = 'navbar-default';
  }

  // content using page tpl
  /* if (isset($variables['node']->type)) {
    // This code looks for any page--custom_content_type.tpl.php page
    $variables['theme_hook_suggestions'][] = 'page__' . $variables['node']->type;
  }

  $nid = arg(1);
  if (arg(0) == 'node' && is_numeric($nid)) {
    if (isset($variables['page']['content']['system_main']['nodes'][$nid])) {
      $variables['node_content'] = & $variables['page']['content']['system_main']['nodes'][$nid];
    }
  } */
}

function centrum_ife_form_element($variables) {
  $output = '';
  $output = $variables['element']['#children'];
  if (isset($variables['element']['#id'])) {
    $error = ife_errors('get', $variables['element']['#id']);
    if (!empty($error)) {
      if (substr($output, -6) == '</div>') {
        $output = substr($output, 0, -6);
        $output .= '<div class="error-msg">' . $error . '</div>';
        $output .= '</div>';
      }
    }
  }
  return $output;
}

/**
* Preprocesses the wrapping HTML.
*
* @param array &$variables
*   Template variables.
*/
function centrum_preprocess_html(&$vars) {

  // Setup Google Webmasters Verification Meta Tag
  $google_webmasters_verification = array(
    '#type' => 'html_tag',
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'google-site-verification',
      // REPLACE THIS CODE WITH THE ONE GOOGLE SUPPLIED YOU WITH
      'content' => 'googled23ac63a5af2d4ee',
    )
  );

  // Add Google Webmasters Verification Meta Tag to head
  drupal_add_html_head($google_webmasters_verification, 'google_webmasters_verification');

  // set title for these custom coupon landing pages
  if ($_SERVER["REQUEST_URI"] == '/coupons/centrum-gummies-chews') {
	$vars['head_title'] = 'Centrum Gummies & Chews Coupon | Centrum Multivitamins';
  }
  else if ($_SERVER["REQUEST_URI"] == '/fr/coupons/centrum-gummies-chews') {
	$vars['head_title'] = 'Gelées et comprimés à croquer Centrum | Multivitamines Centrum';  
  }
  else if ($_SERVER["REQUEST_URI"] == '/coupons/centrumplus') {
	$vars['head_title'] = 'Centrum Coupon | Centrum Multivitamins';  
  }
  else if ($_SERVER["REQUEST_URI"] == '/fr/coupons/centrumplus') {
	$vars['head_title'] = 'Centrum | Multivitamines Centrum';  
  }
}

/**
 * Implements hook_preprocess_search_results().
 */
function centrum_preprocess_search_results(&$vars) {
  // search.module shows 10 items per page (this isn't customizable)
  $itemsPerPage = 10;

  // Determine which page is being viewed
  // If $_REQUEST['page'] is not set, we are on page 1
  $currentPage = (isset($_REQUEST['page']) ? $_REQUEST['page'] : 0) + 1;

  // Get the total number of results from the global pager
  $total = $GLOBALS['pager_total_items'][0];

  // Determine which results are being shown ("Showing results x through y")
  $start = (10 * $currentPage) - 9;
  // If on the last page, only go up to $total, not the total that COULD be
  // shown on the page. This prevents things like "Displaying 11-20 of 17".
  $end = (($itemsPerPage * $currentPage) >= $total) ? $total : ($itemsPerPage * $currentPage);
  
  $result_text = '<span class = "result_count_text">' . $start . '-' . $end . ' of ' . $total . '</span>';

  // If there is more than one page of results:
  if ($total > $itemsPerPage) {
    $vars['search_totals'] = t('Showing !count results', array(
      '!count' => $result_text,
    ));
  }
  else {
    // Only one page of results, so make it simpler
    $vars['search_totals'] = t('Showing !total !results_label', array(
      '!total' => $total,
      // Be smart about labels: show "result" for one, "results" for multiple
      '!results_label' => format_plural($total, 'result', 'results'),
    ));
  }
}
