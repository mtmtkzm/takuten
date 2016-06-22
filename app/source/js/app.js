/*  randomFade
 ************************* */
var $target = $('.js-randomFade'); // FadeInさせる要素
var interval = 150; // 150ms感覚でFadeInする
var length = $target.length;

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
var random = randomNumber(length);

function randomFadeIn(num) {
    count++;
    setTimeout(function() {
        $target.eq(num).fadeIn(500);
    }, interval * count);
}
for (var i = random(); i != null; i = random()) {
    randomFadeIn(i);
}


/*  Parallax Scroll
 ************************* */
$('.js-parallax').enllax();


/*  Change Nav-status
 ************************* */
var $jsNav = $('.js-nav');
var os = $jsNav.offset().top;
$(window).scroll(function() {
    var st = $(window).scrollTop();
    if (st > os) {
        $jsNav.addClass('fixed');
        $jsNav.removeClass('static');
    } else {
        $jsNav.addClass('static');
        $jsNav.removeClass('fixed');
    }
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

$(window).scroll(function() {
    var st = $(window).scrollTop();
    for (var i = 0; i < changePoint.length; i++) {
        if (changePoint[i] < st) {
            $jsDots.eq(i).removeClass('now');
            $jsDots.eq(i).addClass('visible');
            if (st < changePoint[i+1]) {
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
    var latlng = new google.maps.LatLng(35.181691, 136.947799);
    var myOptions = {
        zoom: 16, // 拡大比率
        center: latlng, // 表示枠内の中心点
        mapTypeId: google.maps.MapTypeId.ROADMAP, // 表示タイプの指定
        scrollwheel: false // スクロールの制限
    };

    var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
}
