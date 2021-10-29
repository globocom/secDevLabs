<?php
/**
 * @file
 * Default theme implementation to display a single Drupal page while offline.
 *
 * All the available variables are mirrored in page.tpl.php. Some may be left
 * blank but they are provided for consistency.
 *
 * @see template_preprocess()
 * @see template_preprocess_maintenance_page()
 */
?>
<!DOCTYPE html>
<html lang="<?php print $language->language; ?>" dir="<?php print $language->dir; ?>">

<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
  <!--[if lt IE 9]><script src="<?php print base_path() . drupal_get_path('theme', 'nexus') . '/js/html5.js'; ?>"></script><![endif]-->
</head>

<body class="<?php print $classes; ?>" <?php print $attributes;?>>


<div id="page" class="clearfix">
  <header id="masthead" class="site-header container" role="banner">
    <div class="row">
      <div id="logo" class="site-branding col-sm-6">
        <?php if ($logo): ?><div id="site-logo"><a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>">
          <img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" />
        </a></div><?php endif; ?>
        <h1 id="site-title">
          <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>"><?php print $site_name; ?></a>
        </h1>
      </div>
  </header>
  <div class="head-ribbon"></div>
  <div class="container"> 
    <div class="row">
      <div id="primary">
        <section id="content" role="main" class="container clearfix">
          <div id="content-wrap">
            <?php print $messages; ?>
            <a id="main-content"></a>
            <?php if ($title): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
            <?php print $content; ?><br/><br/>
          </div>
        </section> <!-- /#main -->
      </div>
    </div>
  </div>
  
</div>

</body>
</html>
