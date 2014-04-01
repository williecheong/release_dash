$(window).scroll(function(){
    $('#sidebar li.active ul').show('fast');
    $('#sidebar li:not(.active) ul').hide('fast');
});


/*******************
    Adapted from: 
    http://bootstrapzero.com/bootstrap-template/affix-sidebar
*******************/ 
    $('#sidebar').affix({
          offset: {
            top: 50
          }
    });

    $(document.body).scrollspy({
        target: '#rightCol',
        offset: $('.navbar').outerHeight(true) + 10
    });

    /* smooth scrolling sections */
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 60
            }, 1000);
            return false;
          }
        }
    });

