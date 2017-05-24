(function($){
  /* Print coupon */
  function checkIsIE() {
    if (navigator.appName.toUpperCase() == 'MICROSOFT INTERNET EXPLORER') {
      return true;
    }
    else {
      return false;
    }
  }

  function printThisPage() {

    if (checkIsIE() == true) {
      document.iframecouponimage.focus();
      document.iframecouponimage.print();
    }
    else {
      window.frames['iframecouponimage'].focus();
      window.frames['iframecouponimage'].print();
    }
  }

  $(document).ready(function(){
    $('.print-coupon-btn a').on('click',function(){
	  var iframe = $(this).parents('.coupon-container').find('iframe');
	  var src = $(iframe).attr('id');
	  console.log(src);
		document.getElementById(src).contentWindow.focus();
		document.getElementById(src).contentWindow.print();
	

    });

    /*Show button to print coupon only if iframe is completely loaded*/
    $('iframe#iframe-coupon-image').load(function(){
      $('input.print-coupon-button, #btnPrintCoupon, .field-name-field-coupon-image-sample img').show();
      $('div#loader-print-button').hide();
    });

  });

})(jQuery);