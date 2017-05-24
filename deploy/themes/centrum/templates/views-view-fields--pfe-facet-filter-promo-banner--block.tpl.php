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
$background_style = file_create_url($row->field_field_background_image_et[0]['raw']['uri']);
$title = 'title_field_et';
$body = 'body_et';
$promo_image = 'field_promo_banner_image_et';


?>

<div class = 'promo-wrapper' style = "background-image:url('/sites/default/themes/centrum/images/Black20Cover.png'),url('/sites/default/themes/centrum/images/Gradient.png'),url('<?php print $background_style; ?>')">
 
 <div class="promo-product-body">
<div class = 'promo_image'>
 <?php 

	print $fields[$promo_image]->content;
 ?>
</div>
</div>
 <div class="promo-text-body">
<div class = 'title_and_body'> 
 <?php
 	
 	print $fields[$body]->content;

 ?>

</div>
</div>

</div>
