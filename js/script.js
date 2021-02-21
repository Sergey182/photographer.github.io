$(document).ready(function () {
    $('.burger-btn').on('click', function (e) {
        e.preventDefault();
        let headerNav = $('.header__nav');
        $('.burger-btn').toggleClass('burger-btn--active');
        headerNav.toggleClass('header__nav--active');
        headerNav.click(function () {
            $('.burger-btn').removeClass('burger-btn--active');
            $('.header__nav').removeClass('header__nav--active');
        });
    });

    $("#menu").on("click", "a", function (e) {
        e.preventDefault();
        const id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 1500);
    });

    $('.intro__sliders').slick({
            autoplay: true,
            dots: true,
            infinite: true,
            pauseOnHover: false,
            speed: 1000,
            slidesToShow: 1,
            slidesToScroll: 1
        }
    );

    $('.name').on('keypress', function () {
        let that = this;
        setTimeout(function () {
            let text = /[^а-я ]/g.exec(that.value);
            that.value = that.value.replace(text, '');
        }, 0);
    });

    $(function () {
        $(".phone").mask("8(999) 999-9999");
    });

    $(".price__list-button").click(function () {
        $("#popup").show();
    });

    $("#popup__close_button").click(function () {
        $("#popup").hide();
    });
});




