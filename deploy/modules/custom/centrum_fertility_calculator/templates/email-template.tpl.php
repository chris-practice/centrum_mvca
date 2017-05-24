<div class="result-top-section-container" style="display: none;">
  <p class="top-section"><?php print t('You\'re most likely to get pregnant from:'); ?></p>
  <h2 class="result-top-section-period"><?php print $items['fertile_days'][0]['duration']; ?></h2>
  <p class="result-top-section-pregnancy-detected"><?php print t('Earliest date a pregnancy could be detected:'); ?></p>
  <p class="result-top-section-pregnancy-detected-result"><?php print $items['fertile_days'][0]['detection']; ?></p>
</div>
<div class="right-section">
  <div class="results">
    <span><?php print t('Your next three fertile time periods:'); ?></span>
    <div class="row-1">
      <p class="row-1-result-period result-period"><?php print $items['fertile_days'][1]['duration']; ?></p>
      <p class="row-1-result-description result-description"><?php print t('Earliest date a pregnancy could be detected:'); ?></p>
      <p class="row-1-result-test-date result-test-date"><?php print $items['fertile_days'][1]['detection']; ?></p>
    </div>
    <div class="row-2">
      <p class="row-2-result-period result-period"><?php print $items['fertile_days'][2]['duration']; ?></p>
      <p class="row-2-result-description result-description"><?php print t('Earliest date a pregnancy could be detected:'); ?></p>
      <p class="row-2-result-test-date result-test-date"><?php print $items['fertile_days'][2]['detection']; ?></p>
    </div>
    <div class="row-3">
      <p class="row-3-result-period result-period"><?php print $items['fertile_days'][3]['duration']; ?></p>
      <p class="row-3-result-description result-description"><?php print t('Earliest date a pregnancy could be detected:'); ?></p>
      <p class="row-3-result-test-date result-test-date"><?php print $items['fertile_days'][3]['detection']; ?></p>
    </div>
  </div>
</div>