<?php
/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 *
 * @ingroup templates
 */
 
?>


<article id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
 <?php

	
	
  if ((!$page && !empty($title)) || !empty($title_prefix) || !empty($title_suffix) || $display_submitted): ?>
	
	
	
	
  <header>
    <?php print render($title_prefix); ?>
    <?php if (!$page && !empty($title)): ?>
    <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
    <?php endif; ?>
    <?php print render($title_suffix); ?>
    <?php if ($display_submitted): ?>
    <span class="submitted">
      <?php print $user_picture; ?>
      <?php print $submitted; ?>
    </span>
    <?php endif; ?>
  </header>
  <?php endif; ?>
 <?php
    // Hide comments, tags, and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    hide($content['field_tags']);
		?>
	
	<div class="prod-image "> 
	<?php print render($content['field_product_image']); ?>	
	</div>
	
	<div class="prod-content"> 
	<h1><?php print render($title); ?></h1>
	<div class="prod-summary">
		<?php print render ($content['body']['#items'][0]['summary']);?>
	</div>
  <div class="get-add-where">
  <div class="get-coupons">
	<?php print l(t('Get Coupon'), 'coupons', array('attributes' => array('class' => array('big', 'blue', 'box-shadow'))));?>
  </div>

  <?php 
  $language =  $GLOBALS['language']->language;
  if ($language == 'en') {
	$share_button = '<a class="big blue box-shadow shareit">Share</a>';
  }
  else {
	$share_button = '<a class="big blue box-shadow shareit">Partager</a>';
  }
  ?>

	 <!-- Go to www.addthis.com/dashboard to customize your tools -->
		<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-4ef48e4e04fb79af"></script>
		<div class="addthis_toolbox">
      <?php //print l(t('Share'), '', array('external' => TRUE, 'fragment' => NULL, 'attributes' => array('class' => array('big', 'blue', 'box-shadow', 'shareit')))); 
	    print $share_button;
	  ?>
      <div class="custom_images">
        <a class="addthis_button_facebook">Facebook</a>		
        <a class="addthis_button_twitter">Twitter</a>
        <a class="addthis_button_email">Email</a>		
      </div>
		</div>
		
		<!-- <div class="where-to-buy"> -->
	  <?php // print l(t('Where to Buy'), NULL, array('external' => TRUE, 'fragment' => FALSE, 'attributes' => array('class' => array('big', 'blue', 'box-shadow')))); ?>
    <!-- </div> -->
    </div>
		
	<div class="prod-body ">
		<?php print render($content['body']); ?>
	</div>
	<div class="prod-dosage">
		<?php 	 print render($content['field_dosage']); ?>
	</div>	
	</div>
	<div class="separator">&nbsp;</div>
<div class="prod-health-benefits">
<?php 
  $related_products_block = module_invoke('views', 'block_view', 'health_benefits-block');
  print render($related_products_block['subject']);
  print render($related_products_block['content']);
?>
</div>
<div class="separator">&nbsp;</div>
<div class="related-coupon">

<?php
  $related_coupons_block = module_invoke('views', 'block_view', 'related_coupon-block');
  print render($related_coupons_block['subject']);
  print render($related_coupons_block['content']);
?>
</div>
<div class="prod-nutrients-info">
<?php 
  $related_products_block = module_invoke('views', 'block_view', 'pfe_nutrients_info-block');
  print render($related_products_block['subject']);
  print render($related_products_block['content']);
?>
</div>

<div class="related-section">

<?php
  $related_products_block = module_invoke('views', 'block_view', 'vitamin_related-block_5');
  print render($related_products_block['subject']);
  print render($related_products_block['content']);
?>
</div>
<div style="clear:both"></div>
	<div class="related-article"> 

<?php
  $related_articles_block = module_invoke('views', 'block_view', 'vitamin_related-block_1');
  print render($related_articles_block['subject']);
  print render($related_articles_block['content']);
?>
</div>

	<div class="related-article"> 
<?php print render($content['field_product_video']); ?>
<?php print render($content['field_embedded_video']); ?>

</div>