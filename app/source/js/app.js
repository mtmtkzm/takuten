/*  randomFade
 ************************* */
function symbolFadeIn() {
    var $f_target = $('.js-randomFade'); // FadeInさせる要素
    var $o_target = $('.js-randomOrder'); // FadeInさせる要素

    var interval = 70; // 150ms感覚でFadeInする
    var length = $f_target.length;
    var count = 0;

    function randomNumber(n) {
        var i, j, tmp, a = new Array(n);
        return function() {
            if (n > 0) {
                i = n - 1;
                j = Math.floor(Math.random() * (n));
                tmp = a[i] || i;
                a[i] = a[j] || j;
                a[j] = tmp;
                n = i;
                return a[i];
            } else {
                return null;
            }
        }
    }

    // ランダムフェードイン
    var random = randomNumber(length);

    function randomFadeIn(num) {
        count++;
        setTimeout(function() {
            $f_target.eq(num).fadeIn(300);
        }, interval * count);
    }
    for (var i = random(); i != null; i = random()) {
        randomFadeIn(i);
    }
}

/*  title Animation
 ************************* */
var mvTitle = $('.js-title');
var defaultWidth = mvTitle.width();

function titleAnimate() {
    mvTitle.css('width', defaultWidth * 0.1);
    mvTitle.animate({
        width: defaultWidth * 1.03,
        opacity: 1
    }, 800, function() {
        mvTitle.animate({
            width: defaultWidth
        }, 200, function() {
            symbolFadeIn();
        });
    });
}

function titleReady() {
    mvTitle.css('width', defaultWidth * 0.7);
    titleAnimate();
}

$(window).on('load', function() {
    titleReady();
    mvTitle.css('width', $(window).width() * 0.37);
});
$(window).on('resize', function() {
    mvTitle.css('width', $(window).width() * 0.37);
});

function dotAnimation() {
    // Convert rad
    function rad(deg) {
        return deg * (Math.PI / 180);
    }
    // Delete under priod
    function floatFormat(number, n) {
        var _pow = Math.pow(10, n);
        return Math.round(number * _pow) / _pow;
    }

    var whole_r = $(window).width() * 0.36 / 2; // 円全体の半径
    var dot_r = 5; // 各円（dot）の半径

    function arrangeDot() {
        var coor = { x: [], y: [] };
        for (var i = 0; i < 72; i++) {
            var originCX = Math.sin(rad(5 * i)) * whole_r;
            var originCY = Math.cos(rad(5 * i)) * whole_r;
            var cx = floatFormat(originCX, 3);
            var cy = floatFormat(originCY, 3);
            coor.x[i] = cx + whole_r + dot_r;
            coor.y[i] = cy + whole_r + dot_r;
        }

        $('.circle').each(function(i) {
            $(this).css({
                cx: coor.x[i],
                cy: coor.y[i],
                r: dot_r
            });
        });
    }

    function randomDot(i, elm, ranX, ranY) {
        setTimeout(function() {
            $(elm).attr({
                cx: ranX,
                cy: ranY,
                r: 5
            });
            $(elm).animate({
                opacity: 1
            })
            if (i > 70) {
                setTimeout(function() {
                    arrangeDot();
                }, 2000)
            }
        }, i * 50);
    }

    function orderFade(i, elm) {
        setTimeout(function() {
            $(elm).animate({
                opacity: 1
            });
        }, i * 11);
    }

    arrangeDot();
    $('.circle').each(function(i, elm) {
        orderFade(i, elm);
    });
}
// dotAnimation();






/*  randomOrder
 ************************* */
var originArray = []; // 初期表示順

// 各要素を取得
var list = document.querySelector('.js-randomList');
var listItem = $('.js-randomListItem');
var progressAnchor = $('.js-progressAnchor');

listItem.each(function(v) {
    originArray.push($(this).prop('outerHTML'));
});

var randomNum = [];
// 配列を並び替える
function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        // 配列
        var arrayTemp = array[i];
        array[i] = array[r];
        array[r] = arrayTemp;
        randomNum.push(r);
    }
    return array;
}
var randomArray = shuffle(originArray);

// 元の表示をクリア（削除）
$('.js-randomListItem').remove();

// ランダムで並び替えたものを、入れ直し
for (var i = 0; i < randomArray.length; i++) {
    list.insertAdjacentHTML('beforeend', randomArray[i]);
}

/*  Attach href Attr
 ************************* */
function attachHref() {
    progressAnchor.each(function(i, elm) {
        var id = $('.js-progress').eq(i).attr('id');
        $(elm).attr('href', '#' + id);
    });
}
attachHref();


/*  Parallax Scroll
 ************************* */
$(window).on('load resize', function() {
    var ww = $(window).width();
    if (ww > 768) {
        $('.js-parallax').enllax();
    }
});


/*  Scroll Fadein
 ************************* */
var scrollFadein = $('.js-scrollFadein');
$(window).on('scroll load', function() {
    var scrollTop = $(window).scrollTop();
    scrollFadein.each(function(i, elm) {
        var targetPos = $(this).offset().top;
        if (scrollTop > targetPos - $(window).height() + 300) {
            $(this).animate({ opacity: 1 }, 500);
        }
    });
});

/*  Change Nav-status
 ************************* */
var $jsNav = $('.js-nav');
var $jsNavSP = $('.js-sp-nav');
var os = $jsNav.offset().top;
$(window).on('scroll load', function() {
    var st = $(window).scrollTop();
    if (st > os) {
        $jsNav.addClass('fixed');
        $jsNav.removeClass('static');
    } else {
        $jsNav.addClass('static');
        $jsNav.removeClass('fixed');
    }
    if (st > $('#main').offset().top) {
        $('#nav-sp').fadeIn();
    } else {
        $('#nav-sp').fadeOut();
    }
});

$('.trigger').on('click', function() {
    if ($(this).hasClass('open')) {
        $('.gnav-sp').fadeOut();
        $(this).removeClass('open');
    } else {
        $('.gnav-sp').fadeIn();
        $(this).addClass('open');
    }
});

$('.gnav-sp-item').on('click', function() {
    $('.gnav-sp').fadeOut();
    $(this).removeClass('open');
});

/*  Change menu Progress
 ************************* */
var $jsDots = $('.js-progress-dots circle');
var $jsProgress = $('.js-progress');
var changePoint = [$jsProgress.length]; // 各要素の高さ

$jsProgress.each(function(i, el) {
    var ot = $(el).offset().top;
    changePoint[i] = ot;
});

$(window).on('scroll load', function() {
    var st = $(window).scrollTop();
    for (var i = 0; i < changePoint.length; i++) {
        if (changePoint[i] < st) {
            $jsDots.eq(i).removeClass('now');
            $jsDots.eq(i).addClass('visible');
            if (st < changePoint[i + 1]) {
                $jsDots.eq(i).addClass('now');
            }
        } else {
            $jsDots.eq(i).removeClass('visible now');
        }
    }
});

/*  Google Maps API
 ************************* */
function initialize() {
    var LatLng = new google.maps.LatLng(35.181691, 136.947799);
    var MY_MAPTYPE_ID = '卓展2016 会場';
    var mapOptions = {
        zoom: 15,
        center: LatLng,
        scrollwheel: false, // スクロールの制限
        mapTypeId: MY_MAPTYPE_ID
    };
    var styledMapOptions = {
        name: '卓展2016 会場'
    };
    var featureOptions = [{
        'stylers': [{
            'hue': '#EFF2F5'
        }],
        'elementType': 'all',
        'featureType': 'all'
    }];
    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    var image = {
        url: './images/access/gm_icon.png',
        scaledSize: new google.maps.Size(56, 64)
    }
    var marker = new google.maps.Marker({
        icon: image,
        position: LatLng,
        map: map
    });
    var customMapType = new google.maps.StyledMapType(featureOptions, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}
initialize();

/*  Smooth Scroll
 ************************* */
$('a[href^="#"]').on('click', function() {
    var speed = 400;
    var offsetY = -1;
    var href = $(this).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    var position = target.offset().top;
    $('body, html').animate({ scrollTop: position - offsetY }, speed, 'swing');
    return false;
});


/* かいてん */
var rotateCount = 0;
function animationDeg () {
    console.log('deg');
    $({ deg: 0 }).animate({ deg: 360 }, {
        duration: 50000,
        progress: function() {
            $('.dots').css({
                transform: 'translate(-50%, -50%) rotate(' + this.deg + 'deg)'
            });
        },
        complete: function() {
            animationDeg();
        }
    });    
}
animationDeg();
