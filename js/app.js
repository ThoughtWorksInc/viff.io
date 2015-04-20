import $ from 'jquery';

const $body = $('body');
const registerSectionOffset = $('#registerSection').offset().top

$('#registerHook').on('click', function() {
  $body.animate({
    scrollTop: registerSectionOffset 
  }, 500);
});

