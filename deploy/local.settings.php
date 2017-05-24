<?php
/**
 * @file
 * Drupal site-specific configuration file.
 * 
 */

if (!empty($_SERVER['AH_SITE_ENVIRONMENT']) && $_SERVER['AH_SITE_ENVIRONMENT'] == 'prod') {
  // Omniture.
  $conf['omniture_siteID'] = 'centrumca';
  $conf['omniture_s_account'] = 'pfizercentrumcaprod2';
}
else {
  $conf['omniture_siteID'] = 'centrumca';
  $conf['omniture_s_account'] = 'pfizercentrumcadev2';
}
