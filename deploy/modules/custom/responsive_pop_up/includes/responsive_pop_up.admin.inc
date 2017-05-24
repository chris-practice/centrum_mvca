<?php
/**
 * Implement system configration.
 */ 

function responsive_pop_up_form() {

  // This form calls the form builder function via the
  // drupal_get_form() function which takes the name of this form builder
  // function as an argument. It returns the results to display the form.
  return drupal_get_form('responsive_pop_up_my_form');

}

/**
* This function is called the "form builder". It builds the form.
* Notice, it takes one argument, the $form_state
*/
function responsive_pop_up_variable_info() {
  $variable['normal_pop_up'] = array(
    'type' => 'fieldset',
    'title' => t('Normal POP UP'),
    'localize' => TRUE,
    'group' => 'Responsive_pop_up',
		'description' => t('Responsive Pop Up Module')
  );

  return $variable;
}
function responsive_pop_up_my_form($form, $form_state) {  
  $form['normal_pop_up']['normal_pop_up_content'] = array(
    '#type' => 'textarea',
    '#title' => t('Pop Up Content for English'),
		'#default_value' => variable_get('normal_pop_up_content'),
  );
	$form['normal_pop_up']['normal_pop_up_content_fr'] = array(
    '#type' => 'textarea',
    '#title' => t('Pop Up Content for French'),
		'#default_value' => variable_get('normal_pop_up_content_fr'),
  );
	
	return system_settings_form($form);
}

