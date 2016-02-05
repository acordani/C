$('.advanced-search').hide();
    $('.btn-search-advanced').on('click',function(){
      $('.advanced-search').toggleClass('open');
      if($('.advanced-search').hasClass('open')){
        $('.advanced-search').slideDown('fast');
        $('.btn-search-advanced').text('Moins de critÃ¨res');
      }else{
        $('.advanced-search').slideUp('fast');
        $('.btn-search-advanced').text('Plus de critÃ¨res');
        }
      });

