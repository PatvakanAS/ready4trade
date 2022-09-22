//pagination plugin start
// (function ($) {

//     $.paginate = function (element, options) {

//         /*
//             #Defaults
//         */
//         var defaults = {
//             perPage: 3,              //how many items per page
//             autoScroll: true,           //boolean: scroll to top of the container if a user clicks on a pagination link
//             scope: '',             //which elements to target
//             paginatePosition: ['bottom'],     //defines where the pagination will be displayed
//             containerTag: 'nav',
//             paginationTag: 'ul',
//             itemTag: 'li',
//             linkTag: 'a',
//             useHashLocation: true,           //Determines whether or not the plugin makes use of hash locations
//             onPageClick: function () { }   //Triggered when a pagination link is clicked

//         };

//         var plugin = this;
//         var plugin_index = $('.paginate').length;

//         plugin.settings = {};

//         var $element = $(element);

//         var curPage, items, offset, maxPage;

//         /*
//             #Initliazes plugin
//         */
//         plugin.init = function () {
//             plugin.settings = $.extend({}, defaults, options);

//             curPage = 1;
//             items = $element.children(plugin.settings.scope);
//             maxPage = Math.ceil(items.length / plugin.settings.perPage); //determines how many pages exist

//             var paginationHTML = generatePagination(); //generate HTML for pageination

//             if ($.inArray('top', plugin.settings.paginatePosition) > -1) {
//                 $element.before(paginationHTML);
//             }

//             if ($.inArray('bottom', plugin.settings.paginatePosition) > -1) {
//                 $element.after(paginationHTML);
//             }

//             $element.addClass("paginate");
//             $element.addClass("paginate-" + plugin_index);

//             var hash = location.hash.match(/\#paginate\-(\d)/i);

//             //Check if URL has matching location hash
//             if (hash && plugin.settings.useHashLocation) {
//                 plugin.switchPage(hash[1]);
//             } else {
//                 plugin.switchPage(1); //go to initial page
//             }

//         };

//         /*
//             #Switch to Page > 'page'
//         */
//         plugin.switchPage = function (page) {

//             if (page == "next") {
//                 page = curPage + 1;
//             }

//             if (page == "prev") {
//                 page = curPage - 1;
//             }

//             //If page is out of range return false
//             if (page < 1 || page > maxPage) {
//                 return false;
//             }

//             if (page > maxPage) {
//                 $('.paginate-pagination-' + plugin_index).find('.page-next').addClass("deactive");
//                 return false;
//             } else {
//                 $('.paginate-pagination-' + plugin_index).find('.page-next').removeClass("deactive");
//             }

//             $('.paginate-pagination-' + plugin_index).find('.active').removeClass('active');
//             $('.paginate-pagination-' + plugin_index).find('.page-' + page).addClass('active');

//             offset = (page - 1) * plugin.settings.perPage;

//             $(items).hide();

//             //Display items of page
//             for (i = 0; i < plugin.settings.perPage; i++) {
//                 if ($(items[i + offset]).length)
//                     $(items[i + offset]).fadeTo(100, 1);
//             }

//             //Deactive prev button
//             if (page == 1) {
//                 $('.paginate-pagination-' + plugin_index).find('.page-prev').addClass("deactive");
//             } else {
//                 $('.paginate-pagination-' + plugin_index).find('.page-prev').removeClass("deactive");

//             }

//             //Deactive next button
//             if (page == maxPage) {
//                 $('.paginate-pagination-' + plugin_index).find('.page-next').addClass("deactive");
//             } else {
//                 $('.paginate-pagination-' + plugin_index).find('.page-next').removeClass("deactive");
//             }

//             curPage = page;

//             return curPage;

//         };

//         /*
//         #Kills plugin
//         */
//         plugin.kill = function () {

//             $(items).show();
//             $('.paginate-pagination-' + plugin_index).remove();
//             $element.removeClass('paginate');
//             $element.removeData('paginate');

//         };

//         /*
//         #Generates HTML for pagination (nav)
//         */
//         var generatePagination = function () {

//             var paginationEl = '<' + plugin.settings.containerTag + ' class="paginate-pagination paginate-pagination-' + plugin_index + '" data-parent="' + plugin_index + '">';
//             paginationEl += '<' + plugin.settings.paginationTag + '>';

//             paginationEl += '<' + plugin.settings.itemTag + '>';
//             paginationEl += '<' + plugin.settings.linkTag + ' href="#" data-page="prev" class="page page-prev">&laquo;</' + plugin.settings.linkTag + '>';
//             paginationEl += '</' + plugin.settings.itemTag + '>';

//             for (i = 1; i <= maxPage; i++) {
//                 paginationEl += '<' + plugin.settings.itemTag + '>';
//                 paginationEl += '<' + plugin.settings.linkTag + ' href="#paginate-' + i + '" data-page="' + i + '" class="page page-' + i + '">' + i + '</' + plugin.settings.linkTag + '>';
//                 paginationEl += '</' + plugin.settings.itemTag + '>';
//             }

//             paginationEl += '<' + plugin.settings.itemTag + '>';
//             paginationEl += '<' + plugin.settings.linkTag + ' href="#" data-page="next" class="page page-next">&raquo;</' + plugin.settings.linkTag + '>';
//             paginationEl += '</' + plugin.settings.itemTag + '>';

//             paginationEl += '</' + plugin.settings.paginationTag + '>';
//             paginationEl += '</' + plugin.settings.containerTag + '>';

//             //Adds event listener for the buttons
//             $(document).on('click', '.paginate-pagination-' + plugin_index + ' .page', function (e) {
//                 e.preventDefault();

//                 var page = $(this).data('page');
//                 var paginateParent = $(this).parents('.paginate-pagination').data('parent');

//                 //Call onPageClick callback function
//                 $('.paginate-' + paginateParent).data('paginate').settings.onPageClick();

//                 page = $('.paginate-' + paginateParent).data('paginate').switchPage(page);

//                 if (page) {
//                     if (plugin.settings.useHashLocation)
//                         location.hash = '#paginate-' + page; //set location hash

//                     if (plugin.settings.autoScroll)
//                         $('html, body').animate({ scrollTop: $('.paginate-' + paginateParent).offset().top }, 'slow');

//                 }

//             });

//             return paginationEl;

//         };

//         plugin.init();

//     };

//     $.fn.paginate = function (options) {

//         return this.each(function () {
//             if (undefined === $(this).data('paginate')) {
//                 var plugin = new $.paginate(this, options);
//                 $(this).data('paginate', plugin);
//             }
//         });

//     };

// }(jQuery));

// $(document).ready(function () {
//     var tags = $('.tags_select')
//     var tags = $('.tags_select_news_main_area');

  
       
//         tags.on('change', function () {
//             $('.pagination_block').empty();
//         })
//         $('.pagination_block').append(window.filtered_blogs);


//     $('.pagination_block').paginate();



//     var _gaq = _gaq || [];
//     _gaq.push(['_setAccount', 'UA-36251023-1']);
//     _gaq.push(['_setDomainName', 'jqueryscript.net']);
//     _gaq.push(['_trackPageview']);

//     (function () {
//         var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//         ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
//         var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
//     })();

// })
//  pagination plugin end



// --------------------------------------------------------------------------- filter start ------------------------------------------------------------------------------------------------

$(document).ready(function () {
    function filter() {

        var projects = $('.newsblock');

        window.raw_blogs = $('.pagination_block');

        window.filtered_blogs = window.raw_blogs.children().clone();
        var tags = $('.tags_select')

        tags.on('change', function () {
            opt_country = $(this).val();
            if (typeof opt === "undefined") {
                opt = "All"
            }
            $.each(projects, function (i, x) {
                if ((opt_country == "All" && opt == $(x).attr('data-keywords')) || opt_country == "All" && opt === "All") {
                    $(x).show();
                } else {
                    if ($(x).find('.country').text() == opt_country && opt === "All") {
                        $(x).show();
                    } else if ($(x).find('.country').text() == opt_country && opt == $(x).attr('data-keywords')) {
                        $(x).show();
                    } else {
                        $(x).hide();
                    }
                }
            })
        });

        var projects = $('.newsblock');
        var tags = $('.tags_select_news_main_area');

        tags.on('change', function () {

            opt = $(this).val();
            if (typeof opt_country === "undefined") {
                opt_country = "All"
            }
            $.each(projects, function (i, x) {
                if ((opt == "All" && $(x).find('.country').text() == opt_country) || opt_country == "All" && opt === "All") {
                    $(x).show();
                } else {
                    if (opt == $(x).attr('data-keywords') && opt_country === "All") {
                        $(x).show();
                    } else if (opt == $(x).attr('data-keywords') && $(x).find('.country').text() == opt_country) {
                        $(x).show();
                    } else {
                        $(x).hide();
                    }
                }
            })
        });

    }

    filter();
});

// --------------------------------------------------------------------------- filter end ------------------------------------------------------------------------------------------------


jQuery(function (jQuery) {
    jQuery("#back-top").hide();
    jQuery(function () {
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 50) {
                jQuery('#back-top').fadeIn();
            } else {
                jQuery('#back-top').fadeOut();
            }
        });
        jQuery('#back-top a').click(function () {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
    jQuery('a.scrollto[href*="#"]').click(function () {
    });
    var $page = $('html, body');
    jQuery('a.scrollto[href*="#"]').click(function () {
        $page.animate({
            scrollTop: jQuery(jQuery.attr(this, 'href')).offset().top
        }, 800);
        return false;
    });
});
jQuery('.nlcowl').owlCarousel({
    rewind: true,
    nav: true,
    pagination: true,
    dots: true,
    autoplay: true,
    items: 1,
    smartSpeed: 1500,
    lazyLoad: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    margin: 10,
    navText: [
        '<svg width="33" height="35" viewBox="0 0 33 35" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.7" x="0.834961" y="0.802246" width="31.402" height="33.4023" rx="5" fill="#AAAAAA"/><path d="M18.8262 12.1729L13.9196 17.503L18.8262 22.8332" stroke="white" stroke-width="2"/></svg>',
        '<svg width="32" height="35" viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.7" width="31.402" height="33.4023" rx="5" transform="matrix(-1 0 0 1 31.6387 0.802246)" fill="#AAAAAA"/><path d="M13.6484 12.1729L18.555 17.503L13.6484 22.8332" stroke="white" stroke-width="2"/></svg>'
    ],
    responsive: {
        0: {
            nav: false
        },
        600: {
            nav: false
        },
        900: {
            nav: false
        },
        1300: {
            nav: true
        }
    }
});
jQuery('.part').owlCarousel({
    loop: true,
    nav: true,
    pagination: true,
    dots: true,
    autoplay: true,
    smartSpeed: 1500,
    lazyLoad: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    margin: 50,
    navText: [
        '<svg width="33" height="34" viewBox="0 0 33 34" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.7" x="0.848633" y="0.110352" width="31.402" height="33.4023" rx="5" fill="#AAAAAA"/><path d="M18.8398 11.4814L13.9333 16.8116L18.8398 22.1418" stroke="white" stroke-width="2"/></svg>',
        '<svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg"><rect opacity="0.7" width="31.402" height="33.4023" rx="5" transform="matrix(-1 0 0 1 31.6533 0.110352)" fill="#AAAAAA"/><path d="M13.6621 11.4814L18.5687 16.8116L13.6621 22.1418" stroke="white" stroke-width="2"/></svg>'
    ],
    responsive: {
        0: {
            nav: false,
            margin: 15,
            items: 2
        },
        600: {
            nav: false,
            margin: 25,
            items: 3
        },
        900: {
            nav: false,
            margin: 30,
            items: 4
        },
        1200: {
            margin: 50,
            nav: false,
            items: 6
        },
        1300: {
            nav: true
        }
    }
});
$(function () {
    $('input[type="tel"]').mask("+7 (999) 999-99-99");
});
$.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
        $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
        var range = $(this).get(0).createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
};
$('input[type="tel"]').click(function () {
    $(this).setCursorPosition(3);
});
/*$(document).ready(function () {
    if ($(window).width() < 1025) {   
          t = jQuery("body");
    var c = jQuery("#megamenu-menu").mmenu({
       "slidingSubmenus": true,
       extensions:  {
       all: ["position-left", "pagedim-black"],
            "(min-width: 1430px)": ["widescreen"]
       }, 
       "navbars": [
                      {
                         "position": "bottom",
                         "content": [
                            `<a href="#" data-request="onSwitchLocale" data-request-data="locale: 'ru'">RU</a>`,
                            `<a href="#" data-request="onSwitchLocale" data-request-data="locale: 'en'">EN</a>`,
                            "<a class='' href='/search'><i class='icon-search'></i></a>"
                         ]
                      }
                   ],
       navbar: {
          title: "Menu"
       }, 
        pageScroll : {
          scrollOffset : 300 
        }
        }).data("mmenu"),
        d = jQuery("#hamburger").on("click", function(e) {
             e.preventDefault(), jQuery("html").hasClass("mm-wrapper_opening") ? c.close() : c.open()
         }).children(".hamburger");
        c.bind("close:finish", function() {
            setTimeout(function() {
        d.removeClass("is-active")
        }, 100)
        }), c.bind("open:finish", function() {
             setTimeout(function() {
                  d.addClass("is-active")
        }, 100)
     })
    }
});*/
if (/\/kz/.test(location.href)) {
    $(document).ready(function () {
        $(".mm-navbar__title").text("Мәзір");
    })
} else if (/\/ru/.test(location.href)) {
    $(document).ready(function () {
        $(".mm-navbar__title").text("Меню");
    })
} else if (/\/en/.test(location.href)) {
    $(document).ready(function () {
        $(".mm-navbar__title").text("Menu");
    })
}
jQuery(document).ready(function ($) {
    $(".menucountry").on("click", "a", function (event) {
        event.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({ scrollTop: top }, 1500);
    });
    jQuery('a#touch-menu').click(function () {
        jQuery('#mob-menu').toggleClass('raskriv');
    });
});
$('.timeyear').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '1px',
    arrows: true,
    prevArrow: '<svg width="68" height="69" viewBox="0 0 68 69" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.986328" y="0.0117188" width="66.9111" height="68.2837" fill="#3E9AD5"/><path d="M40.8486 21.3408L28.0352 34.1538L40.8486 46.9673" stroke="white" stroke-width="3"/></svg>',
    nextArrow: '<svg width="68" height="69" viewBox="0 0 68 69" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.452148" y="0.0117188" width="66.9111" height="68.2837" fill="#3E9AD5"/><path d="M27.501 21.3408L40.3145 34.1538L27.501 46.9673" stroke="white" stroke-width="3"/></svg>',
    asNavFor: '.tyinfo'
});
$('.tyinfo').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.timeyear',
    dots: false,
    arrows: false,
    centerMode: true,
    fade: true,
    focusOnSelect: true
});
$(document).ready(function () {
    if ($(window).width() < 1025) {
        window.onscroll = function () {
            scrollFunction()
        };

        function scrollFunction() {
            if (document.body.scrollTop > 107 || document.documentElement.scrollTop > 107) {
                jQuery('#touch-menu').addClass('burfix');
            } else {
                jQuery('#touch-menu').removeClass('burfix');
            }
        }
    }
})



$(document).ready(function () {
    $(".paginate-pagination ul li").on("click", function () {
        filter();
    })
})

// news post links open new tab start
$(document).ready(function () {
    $(".vnutstran.blogvnut a").on("click", function () {
        $(".vnutstran.blogvnut a").attr("target", "_blank")
    })
})
// news post links open new tab end

$(document).ready(function () {
    $('.ncdescr p:nth-child(1)').remove();
})
