/*
AUTHOR   : Hitesh Jariwala
TEMPLATE : Avail - Creative Coming Soon Template
VERSION  : 1.0
*/

(function ($) {
    "use strict";

    /*-- ================================ --
    1.0 TEMPLATE SETTINGS
    /*-- ================================ --*/
    $.bg_type = 1;
    /*
    * 1. Backstretch slideshow background
    * 2. Slideshow background with Kenburns Effect
    * 3. Single image background + star effect (constellation)
    * 4. YouTube video background
    * 5. Self hosted video background
    */


    /*-- ================================ --
    2.0 FUNCTIONS & PUBLIC VARIABLES
    /*-- ================================ --*/


    /*-- ================================ --
    3.0 window.resize FUNCTION
    /*-- ================================ --*/
    $(window).resize(function (e) {

    });
    //-- end window.resize function

    /*-- ================================ --
    4.0 window.load FUNCTION
    /*-- ================================ --*/
    $(window).load(function (e) {
        var delay = setTimeout(function () {
            $('.preloader-container').addClass('is-hidden');
            $('.page-container').addClass('is-visible');

            clearTimeout(this);
        }, 1000);
    });
    //-- end window.load function

    /*-- ================================ --
    5.0 window.scroll FUNCTION
    /*-- ================================ --*/
    $(window).scroll(function (e) {

    });
    //-- end window.scroll function


    /*-- ================================ --
    6.0 document.ready FUNCTION
    /*-- ================================ --*/
    $(document).ready(function (e) {
        $('.page-container').stellar({
            horizontalScrolling: false,
            responsive: true
        });

    });
    //-- end document.ready function
})(jQuery);