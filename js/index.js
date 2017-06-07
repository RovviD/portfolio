$('body').scrollspy({offset: 120, target: '.navbar-fixed-top'})

$(function() {
    $('body').on('click', 'a', function(event) {
        event.preventDefault();
        var newPosition = $($(this).attr('href')).offset().top - 83;

        if ($(this).attr('href') === '#home') {
            newPosition = 0;
        }

        $('html, body').stop().animate({
            scrollTop: newPosition
        }, 1000, 'easeInOutExpo');
    });
});

$(window).scroll(function() {
    if ($(document).scrollTop() > 20) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
    }
});