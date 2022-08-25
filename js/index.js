//JavaScript document
$(document).ready(()=> {

  $('.addBtn').click(()=> {
    $('.addND').addClass('active');
    $('#wrapper').addClass('active');
  });

  $('.clBtn').click(()=> {
    $('.addND').removeClass('active');
    $('#wrapper').removeClass('active');
  });

});