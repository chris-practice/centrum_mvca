(function($) {
  $(document).ready(function() {
    $('.fertility-calc-block').hide();
  });
  Drupal.behaviors.centrum_fertility_calculator = {
    attach: function(context, settings) {
      // Function to hide email-popup div when user click outside of email-popup div
      $(document).mouseup(function(e) {
        var container = $('.email-popup');
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if (container.hasClass('display')) {
            container.hide();
            container.removeClass('display');
          }
        }
      });
      $.fn.calcomnitracking = function(data) {
        var menu_title = jQuery(this).text(); 
		// var parent_title = jQuery(this).parents('.expanded').find('a.disabled').text();
		var title_section = Drupal.t('Fertility Calc result');
		omnitureEventTrack(menu_title,'event62',this,title_section);
      }
	/*   $.fn.emailomnitracking = function(data) {
        var menu_title = jQuery(this).text(); 
		// var parent_title = jQuery(this).parents('.expanded').find('a.disabled').text();
		var parent_title = 'Fertility Calc email';
		var title_section = Drupal.t('email button send');
		omnitureSubMenuTagging(menu_title, parent_title, this, title_section);
      } */
	  $.fn.emailpopupomnitracking = function(data) {
        var menu_title = jQuery(this).text(); 
		// var parent_title = jQuery(this).parents('.expanded').find('a.disabled').text();
		//var parent_title = Drupal.t('email button popup');
		var title_section = Drupal.t('Fertility Calculator|Email Results');
		omnitureEventTrack(menu_title,'event63',this,title_section);
      }
	  $.fn.showresultfooterblock = function(data) {
        $(data).show();
      }
      $.fn.hideresultfooterblock = function(data) {
        $(data).hide();
      }
      $.fn.scrolltoblocktop = function(data) {
        $(data).animate({
          scrollTop: $("#centrum-fertility-calculator-form").offset().top
        }, 2000);
      }
      $.fn.visibilityhidden = function(data) {
        $(data).css('visibility', 'hidden');
        $(data).addClass('data-hidden');
        $(data).addClass('section-container-hide');
        $(data).removeClass('data-visible');
        // $('.section-container-hide').delay(120).hide();
      }
      $.fn.visibilityvisible = function(data) {
          $(data).css('visibility', 'visible');
          $(data).addClass('data-visible');
          $(data).removeClass('data-hidden');
          $(data).removeClass('section-container-hide');
          // $('.section-container-hide').show();
        }
        // calendar settings exist
      $.fn.myfertiledays = function(data) {
          var fertile_days = [];
          // adding array keys for every event
          $.each(data, function(index, value) {
            fertile_days.push({
              title: 'Fertile Days',
              start: value.start_date,
              end: value.end_date,
              className: 'hide-fertile-days',
            }, {
              title: 'Pregnancy Dectection Date',
              start: value.erliest_pregnancy_detection_date,
              className: 'hide-detection-day',
            });
          });
          $('.calendar-highlight').fullCalendar('gotoDate', fertile_days[0].start);
          $('.calendar-highlight').fullCalendar('defaultDate', fertile_days[0].start);
          $('.calendar-highlight').fullCalendar('removeEvents');
          $('.calendar-highlight').fullCalendar('addEventSource', fertile_days);
          $('.calendar-highlight').fullCalendar('rerenderEvents');

        }
        // Mapping select box with date-popup
      var day = month = year = 0;
      // helper function which assign value to date-popup
      function mappingSelectBoxToDatePopup(day, month, year) {
        if ((day !== 0) && (month !== 0) && (year !== 0)) {
          // adding trailing zero to the values
          if (day < 10) {
            day = '0' + day;
          }
          if (month < 10) {
            month = '0' + month;
          }
          // assigning select box with date-popup
          $('#edit-date-popup-datepicker-popup-0').val(month + '-' + day + '-' + year);
        }
      }
      // return range dates between start and end of event
      function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate)._d;
        var endDate = moment(stopDate)._d;
        while (currentDate <= endDate) {
          dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
          currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
      }
      // fetching month dropdown value
      $('#edit-date-select-month', context).change(function() {
        month = $('option:selected', this).val();
        mappingSelectBoxToDatePopup(day, month, year);
      });
      // fetching day dropdown value
      $('#edit-date-select-day', context).change(function() {
        day = $('option:selected', this).val();
        mappingSelectBoxToDatePopup(day, month, year);
      });
      // fetching year dropdown value
      $('#edit-date-select-year', context).change(function() {
        year = $('option:selected', this).val();
        mappingSelectBoxToDatePopup(day, month, year);
      });
      // Mapping date-popup with select box
      $('#edit-date-popup-datepicker-popup-0', context).change(function() {
        date = $(this).val();
        var arr = date.split('-');
        // need to remove trailing 0 from all values which are less than 10
        // month adjustment & mapping
        if (arr[0] < 10) {
          arr[0] = arr[0].replace('0', '');
        }
        $('#edit-date-select-month').val(arr[0]);
        // day adjustment & mapping
        if (arr[1] < 10) {
          arr[1] = arr[1].replace('0', '');
        }
        $('#edit-date-select-day').val(arr[1]);
        // year mapping
        $('#edit-date-select-year').val(arr[2]);
      });

      $('.calendar-highlight').fullCalendar({
        header: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        dayNamesShort: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        weekMode: 'liquid',
        editable: false,
        eventLimit: false,
        lang: $('html').attr('lang'),
        eventRender: function(event, element, view) {
          if ((event.end != null) && (event.end._i)) {
            var fertileDuration = getDates(event.start._i, event.end._i);
            $.each(fertileDuration, function(index, value) {
              view.el.find('.fc-day-number[data-date="' + value + '"]').addClass('fertile-days');
            });
          } else {
            view.el.find('.fc-day-number[data-date="' + event.start._i + '"]').addClass('detection-date');
          }
        }
      });
    }
  };
}(jQuery));
