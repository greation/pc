!function(){
    var mySwiper = new Swiper('.apple-banner .apple-container', {
        autoplay: 3000,
        speed: 1000,
        loop: true,
        effect : 'fade',
        fadeEffect: {
            crossFade: false,
        },
        runCallbacksOnInit: false,
        watchSlidesProgress : true,
        pagination: '.apple-banner .swiper-pagination',
        paginationClickable :true,
        autoplayDisableOnInteraction : false,
        paginationBulletRender: function (swiper, index, className) {
            return '<li class="' +className + '"><span><i></i></span></li>';
        },
        onProgress: function(swiper) {
            for (var i = 0; i < swiper.slides.length; i++) {
                var slide = swiper.slides.eq(i);
                var progress = slide[0].progress;//获取slide的progress
                var translate;//slide的位移

                //左边出去时，slide位移减慢，slide缩放，文字Y视差。else右边进时，文字X视差
                if (progress > 0) {
                    translate = progress * 0.9 * swiper.width;
                    scale = 1 - progress * 0.1
                    if (progress > 1) {
                        scale = 0.9
                    }
                    txtPositionX = 0
                    txtPositionY = progress * 30 + 'px'
                } else {
                    translate = 0;
                    scale = 1
                    txtPositionX = -progress * 1000 + 'px'
                    txtPositionY = 0
                }
                //赋加动画到slide和txt
                var txts = slide.find('.txt');
                for (var j = 0; j < txts.length; j++) {
                    txts.eq(j).transform('translate3d(' + txtPositionX + ',' + txtPositionY + ',0)');
                }
                slide.transform( 'translate3d(' + (translate) + 'px,0,0) scale(' + scale + ')');
            }
        },
        onSetTransition: function(swiper, speed) {
            for (var i = 0; i < swiper.slides.length; i++) {
                //赋加动画时间到slide和txt
                slide=swiper.slides.eq(i)
                slide.transition(speed)
                var txts = slide.find('.txt');
                for (var j = 0; j < txts.length; j++) {
                    txts.eq(j).transition(speed)
                }
            }
        },
        onSlideChangeStart: function(swiper) {
            if (swiper.autoplaying) {
                // swiper.bullets.eq(swiper.realIndex-1).addClass('replace');
                swiper.bullets.eq(swiper.realIndex-1).removeClass('current firsrCurrent');
                swiper.bullets.eq(swiper.realIndex).addClass('current');
                if(swiper.realIndex==0){
                    swiper.bullets.removeClass('replace');
                }
            }
        },
        //自动切换停止后，使用静态分页器
        onAutoplayStop: function(swiper) {
            swiper.$('.autoplay').removeClass('autoplay');
        },
    })
// Set Z-Indexes
    for (var i = 0; i < mySwiper.slides.length; i++) {
        mySwiper.slides[i].style.zIndex = i;
    }
    setTimeout(firstAdd ,1);
    function firstAdd(){
        mySwiper.bullets.eq(0).addClass('firsrCurrent')

    }
}();
