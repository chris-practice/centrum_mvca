<?php

/**
 * @file
 * This template is used to print a single field in a view.
 *
 * It is not actually used in default Views, as this is registered as a theme
 * function which has better performance. For single overrides, the template is
 * perfectly okay.
 *
 * Variables available:
 * - $view: The view object
 * - $field: The field handler object that can process the input
 * - $row: The raw SQL result that can be used
 * - $output: The processed output that will normally be used.
 *
 * When fetching output from the $row, this construct should be used:
 * $data = $row->{$field->field_alias}
 *
 * The above will guarantee that you'll always get the correct data,
 * regardless of any changes in the aliasing that might happen if
 * the view is modified.
 */
?>
<?php

global $language ;
$lang_name = $language->language;

if (isset($view->exposed_raw_input['combine']) && isset($row->_field_data['nid']['entity']->body[$lang_name][0]['value']) && $row->_field_data['nid']['entity']->body[$lang_name][0]['value'] != "") {
	$body_value = strip_tags($row->_field_data['nid']['entity']->body[$lang_name][0]["value"]);
	$to_match = ' '.strip_tags($view->exposed_raw_input['combine']).' ';
	
	$matchtring = strpos($body_value, $to_match);
	if ($matchtring === false) {
		print substr($body_value,0,200).'.....';
	} else {
		$aftercharacs = $matchtring + 200;
		$beforecharacs = $matchtring - 5;
		
		$start_pos = strlen($to_match) + $matchtring;
		$end_pos = $matchtring - strlen($to_match);
		$matched_str = '<b>'.$to_match.'</b>';
		
		print '....'.substr($body_value,$end_pos,strlen($to_match)).$matched_str.substr($body_value,$start_pos,200).'.....';	
	}
}
?>