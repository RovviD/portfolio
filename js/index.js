function checkMenu() {
    if ($(document).scrollTop() > 20) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
    }
}

window.sr = ScrollReveal();
sr.reveal('#skills');

$('body').scrollspy({offset: 120, target: '.navbar-fixed-top'});

var skillsReady = false;

$('.navbar-fixed-top ul li:eq(3)').on('activate.bs.scrollspy', function () {
    if (!skillsReady) {
        skillsReady = true;
        $('.chart').each(function(i, object) {
            createProgressbar(object, $(object).data('percentage'), $(object).data('color'));
        });
        $('#skills h2').css('opacity', 1).addClass('animated fadeIn');
    }
});

$(function() {
    $('body').on('click', '.navbar a, .btn-scroll', function(event) {
        event.preventDefault();
        var newPosition = $($(this).attr('href')).offset().top - 83;

        if ($(this).attr('href') === '#home') {
            newPosition = 0;
        }

        $('html, body').stop().animate({
            scrollTop: newPosition
        }, 1000, 'easeInOutExpo');
    });

    checkMenu();

    $('[data-toggle="popover"]').popover();
});


$(window).scroll(function() {
    checkMenu();
});

function createProgressbar(container, percentage, color) {
    var bar = new ProgressBar.Circle(container, {
        color: '#000',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 40,
        trailWidth: 10,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#000', width: 1 },
        to: { color: color, width: 4 },
        // Set default step function for all animate calls
        step: function(state, circle) {
            circle.path.setAttribute('stroke', state.color);
            circle.path.setAttribute('stroke-width', state.width);

            var value = Math.round(circle.value() * 100);
            if (value === 0) {
                circle.setText('');
            } else {
                circle.setText(value + '%');
            }

        }
    });
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';

    bar.animate(percentage / 100);
}


$('#contact .action-button').click(function(event){
    var email = $('[name="email"]', '#contact form').val();
    var name = $('[name="name"]', '#contact form').val();
    var text = $('[name="text"]', '#contact form').val();

    if (email && name && text) {
        $('#contact form').submit();
    } else {
        $(event.currentTarget).popover({
            title: 'Error!',
            content: 'Please fill out all fields before sending the form.',
        });
    }

});