<?php
function my_admin_function($form, &$form_state){
  $form=array();
  $form['send_mail_to']=array(
    '#title' => 'Send Mail To',
    '#discription' => 'To whom you want to send form',
    '#size' => 40,
    '#type' => 'textfield',
    '#required' => TRUE,
    '#default_value' => variable_get('send_mail_to'),
    );

//here the admin can wite subject for the mail.
  $form['mail_subject']=array(
      '#title' => 'Subject',
      '#discription' => 'the purpous of this mail',
      '#type' => 'textfield',
      '#size' =>40,
      '#maxlenght' =>120,
      '#required'=>TRUE,
      '#default_value' => variable_get('mail_subject'),
    );

  $form['mail_send_form']=array(
      '#title' => 'Send mail From',
     '#discription' => 'From whom you want to send form',
    '#size' => 40,
    '#type' => 'textfield',
    '#required' => TRUE,
    '#default_value' => variable_get('mail_send_form'),
    );
     /* $form['mail_cc']=array(
     '#title' => 'CC this mail',
     '#discription' => 'From whom you want to send form',
    '#size' => 40,
    '#type' => 'textfield',
    '#required' => TRUE,
    '#default_value' => variable_get('mail_cc'),

    ); */
   /* $form['mail_bcc']=array(
      '#title' => 'BCC this mail to all',
      '#type' => 'checkbox',

    ); */

   $form['submit']=array(
    '#type' => 'submit',
    '#value' => 'Send!',
    );

  return system_settings_form($form);
}
//admin config end//