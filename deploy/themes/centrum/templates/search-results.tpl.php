<?php

/**
 * @file
 * Default theme implementation for displaying search results.
 *
 * This template collects each invocation of theme_search_result(). This and
 * the child template are dependent to one another sharing the markup for
 * definition lists.
 *
 * Note that modules may implement their own search type and theme function
 * completely bypassing this template.
 *
 * Available variables:
 * - $search_results: All results as it is rendered through
 *   search-result.tpl.php
 * - $type: The type of search, e.g., "node" or "user".
 *
 *
 * @see template_preprocess_custom_search_results()
 */
?>
<?php if ($search_results) : ?>
  <?php print $title; ?>
  <?php print $search_totals; ?>
  <?php print $pager; ?>
  <div class="hr_bottom">&nbsp;</div>
  <?php if (isset($filter) && $filter != '' && $filter_position == 'above') : ?>
    <div class="custom-search-filter">
      <?php print $filter; ?>
    </div>
  <?php endif; ?>
  <ol class="search-results <?php print $module; ?>-results">
    <?php print $search_results; ?>
  </ol>
  <?php if (isset($filter) && $filter != '' && $filter_position == 'below') : ?>
    <div class="custom-search-filter">
      <?php print $filter; ?>
    </div>
  <?php endif; ?>
  <div class="hr_top">&nbsp;</div>
  <?php print $search_totals; ?>
  <?php print $pager; ?>
<?php else : ?>
  <p class="search-error-tips"><strong><?php print t('Search Tips');?></strong></p>
  <?php print t('Looking for something in particular? Here are a few things to keep in mind:');?><br/>
  <?php 
    $language =  $GLOBALS['language']->language;
	
	if ($language == 'en') {
	  $content = '<ul>';
      $content .= '<li>Choose words carefully: Use specific words that you imagine will be on the page you are searching for.</li>';
      $content .= '<li>Keep it simple: Since searches contain all words, each additional word you include will limit your results. So if you use too many words, you risk returning no results.</li>';
      $content .= '<li>Use quotes: If you want to search an exact phrase, put it in quotation marks. For example: “Vitamin A”.</li>';
	  $content .= '<li>Minus symbol: You can exclude words by using the minus ( - ) symbol. For example: “Folate – Pregnancy”.</li>';
      $content .= '</ul>';
	}
	else {
	  $content = '<ul>';
      $content .= '<li>Bien choisir les mots : Utilisez des mots précis qui, à votre avis, se trouveront sur la page que vous cherchez.</li>';
      $content .= '<li>S’en tenir à la simplicité : Comme la recherche porte sur tous les mots inscrits, chaque mot ajouté limite les résultats obtenus. Donc, si vous utilisez trop de mots, il se peut que votre recherche ne donne aucun résultat.</li>';
      $content .= '<li>Utiliser les guillemets : Si vous souhaitez chercher une phrase précise, utilisez les guillemets. Par exemple : « Vitamine A ».</li>';
	  $content .= '<li>Utiliser le signe moins : Vous pouvez exclure des mots en utilisant le signe moins (−). Par exemple : « acide folique −grossesse ».</li>';
      $content .= '</ul>';
	}
    
	$output = '<div>'. $content .'</div>';
	print $output;
  ?>
<?php endif; ?>
