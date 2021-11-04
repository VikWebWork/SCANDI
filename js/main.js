
$(function () {

    let height;   // Высота для контроля появления "липкого меню"
    let width = $(document).width();  // забираем значение ширины документа при загрузке

    if (width < 700) {
        height = 580;
    } else {
        height = 800;
    }

    textChange();
    scrollBtn(height);
    activeItemMenu();


    /* Initializing sliders ============= */

    $('.reviews__text').slick({
        nextArrow: $('.reviews__arrow-next'),
        prevArrow: $('.reviews__arrow-prev'),
        rows: 1,
        fade: true,
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    rows: 1,
                    nextArrow: false,
                    prevArrow: false,
                    dots: true,
                }
            }
        ],
        asNavFor: ('.reviews__slider'),
    });

    $('.reviews__slider').slick({
        nextArrow: $('.reviews__arrow-next'),
        prevArrow: $('.reviews__arrow-prev'),
        rows: 2,
        responsive: [
            {
                breakpoint: 1100,
                settings: "unslick"
            }
        ],
        asNavFor: ('.reviews__text'),
    });

    $('.gallery__slider').slick({
        nextArrow: $('.gallery__btn'),
        prevArrow: false,
        rows: 1,
        slidesToShow: 1,
        centerMode: true,
        fade: true,
        dots: true,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1250,
                settings: "unslick",
            }
        ],
        mobileFirst: true
    });


    /* Text change control ============= */

    $('.reviews__slider').on('beforeChange', textChange);


    /* Resize controls ============= */

    $(window).on('resize', function () {
        width = $(document).width();  // нужно чтобы значение width обновлялось при ресайзе окна

        if (width < 1250) {
            $('.gallery__slider').slick("init");
        }

        if (width < 1100) {
            $('.reviews__slider').slick("init");
        }

        if (width < 700) {
            height = 580;
        } else {
            height = 800;
        }

        if (width < 1100) {
            textChange();
        } else {
            textChange();
        }
    });

    window.addEventListener("orientationchange", function () {
        textChange();
    }, false);


    /* Large gallery slider control ============= */

    $('.gallery__btn').on('click', function () {
        let width = $(window).width();

        if (width > 1250) {
            let activeSlide = $('.gallery__slider-inner').filter('.active');
            let inactiveSlide = $('.gallery__slider-inner').filter('.inactive');

            $('.gallery__slider-inner').not('.active').addClass('active');
            activeSlide.removeClass('active');

            $('.gallery__slider-inner').not('.inactive').addClass('inactive');
            inactiveSlide.removeClass('inactive');
        }
    });


    /* Burger menu control ============= */

    $('.menu__btn').on('click', function () {
        $('.menu__btn').toggleClass('menu__btn--active');
        $('.menu__items').toggleClass('menu__items--active');
    });

    $('.menu__item-link').on('click', function () {
        $('.menu__btn').removeClass('menu__btn--active');
        $('.menu__items').removeClass('menu__items--active');
    });


    /* Initializing modal & submit module============= */

    $('.intro__btn-link').fancybox();

    $('#form__box').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/mail.php",
            type: "POST",
            data: $('#form__box').serialize(),
            success: function (response) {
                //обработка успешной отправки
                $.fancybox.close();
                $.fancybox.open({
                    src: '#popup__text',
                    type: 'inline',
                });

                $('#name').val('');
                $('#phone').val('');

            },
            error: function (response) {

                //обработка ошибок при отправке
            }
        });
    });

    $('#form__popup-box').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: "/mail.php",
            type: "POST",
            data: $('#form__popup-box').serialize(),
            success: function (response) {
                //обработка успешной отправки
                $.fancybox.close();
                $.fancybox.open({
                    src: '#popup__text',
                    type: 'inline',
                });

                $('#name-popup').val('');
                $('#phone-popup').val('');

            },
            error: function (response) {
                //обработка ошибок при отправке
            }
        });
    });


    /* About-blocks appearence function ============= */

    let aboutImg = $('.about__info-img');
    aboutText = $('.about__info-text');

    aboutImg.css({
        left: '-100%',
        display: 'none'
    });
    aboutText.css({
        right: '-100%',
        display: 'none'
    });

    function scrollAboutblocksAppearance() {
        if ($(window).scrollTop() > 400) {
            aboutImg.css({
                display: 'block'
            })
                .animate({
                    left: 0
                }, 1000);
            aboutText.css({
                display: 'block'
            })
                .animate({
                    display: 'block',
                    right: 0
                }, 1000);
        }
    }
    scrollAboutblocksAppearance();
    $(document).on("scroll", scrollAboutblocksAppearance);


    /* Person appearence function ============= */

    $('.team__view-item').css({
        opacity: 0,
        bottom: '-50px'
    });

    function scrollTeamAppearence() {
        if ($(window).scrollTop() > 2400) {
            $('.team__view-item').animate({
                opacity: '1',
                bottom: 0
            }, 800);
        }
    }
    scrollTeamAppearence()
    $(document).on("scroll", scrollTeamAppearence);


    /* Мenu highlighting & sticky menu initializing ============= */


    $(document).on("scroll", function (e) {
        scrollBtn(height);
        activeItemMenu();
    });


    /* Smooth scroll initialization ============= */

    $('.menu__item-link').on('click', function (e) {
        e.preventDefault();

        var selector = $(this).attr('href');
        var section = $(selector);

        if (width < 700) {
            $('html, body').animate({
                scrollTop: section.offset().top - 20
            }, 1000);
        }else {
            $('html, body').animate({
                scrollTop: section.offset().top - 80
            }, 1000);
        }
    });


});



/* Sticky menu function ============= */

function scrollBtn(scrollLevel) {   // передаём в функцию переменную для задания значения граничной высоты в функцию
    let flag = 1;
    if ($(window).scrollTop() > scrollLevel) {  // вот она
        if (flag) {
            $('.header').addClass('header__sticky')
            flag = 0;
        }
    }
    else {
        $('.header').removeClass('header__sticky')
        $('.menu__items a').removeClass('menu__active');
        flag = 1;
    }
}


/* Мenu highlighting function ============= */

function activeItemMenu() {
    $('.menu__item-link').each(function () {
        var selector = $(this).attr('href');
        var section = $(selector);
        var windowTop = $(document).scrollTop();
        var sectionTop = section.offset().top;

        if (windowTop > sectionTop - 240) {
            $('.menu__items a')
                .removeClass('menu__active')
                .filter(this)
                .addClass('menu__active');
        };
    });
}


/* Text change function ============= */

function textChange() {
    var doChangeText;

    clearTimeout(doChangeText);
    doit = setTimeout(function () {
        let id = $('.reviews__slider .slick-current img').attr('data-img');

        $('.reviews__text-content').removeClass('text-visible')

        $('.reviews__text-content[data-text=' + id + ']').addClass('text-visible')
    }, 200);  //  задержка-антидребезг для стабильной работы
}