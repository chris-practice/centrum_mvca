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
  $colordark = $row->field_field_dark_color[0]['raw']['value'];
 $colorlight = $row->field_field_light_color[0]['raw']['value'];
 $title = $row->field_name_field[0]['raw']['value'];

?>

<div style="background:#<?php print $colordark; ?>" class="health-benefits-image">
	<div class="field-content">
		<?php print $output; ?>
	</div>
</div>

<div style="background:#<?php print $colorlight; ?>" class="health-benefits-title">
	<div class="field-content">
		<?php print $title; ?>
	</div>
</div>