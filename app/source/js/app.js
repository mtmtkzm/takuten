/*  randomFade
 ************************* */
var $f_target = $('.js-randomFade'); // FadeInさせる要素
var $o_target = $('.js-randomOrder'); // FadeInさせる要素

var interval = 150; // 150ms感覚でFadeInする
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
        $f_target.eq(num).fadeIn(500);
    }, interval * count);
}
for (var i = random(); i != null; i = random()) {
    randomFadeIn(i);
}


/*  randomOrder
 ************************* */
var originArray = []; // 初期表示順

// 各要素を取得
var list = document.querySelector('.js-randomList');
var listItem = document.querySelectorAll('.js-randomListItem');
var progressAnchor = document.querySelectorAll('.js-progressAnchor');

listItem.forEach(function(v, i, a) {
    originArray.push(v.outerHTML);
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
Array.prototype.forEach.call(listItem, function(node) {
    list.removeChild(node);
});

// ランダムで並び替えたものを、入れ直し
for (var i = 0; i < randomArray.length; i++) {
    list.insertAdjacentHTML('beforeend', randomArray[i]);
}

/*  Attach href Attr
 ************************* */
function attachHref() {
    progressAnchor.forEach(function(v, i, a) {
        a[i].setAttribute('href', '#' + document.querySelectorAll('.js-progress')[i].id);
    });
}
attachHref();


/*  Parallax Scroll
 ************************* */
$('.js-parallax').enllax();


/*  Change Nav-status
 ************************* */
var $jsNav = $('.js-nav');
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
    var featureOptions = [{
        'stylers': [{
            'hue': '#EFF2F5'
        }],
        'elementType': 'all',
        'featureType': 'all'
    }];
    var mapOptions = {
        zoom: 15,
        center: LatLng,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        scrollwheel: false, // スクロールの制限
        mapTypeId: MY_MAPTYPE_ID
    };
    var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    var marker = new google.maps.Marker({
        icon: new google.maps.MarkerImage(
            './images/map/gm_icon.png', //画像ファイルのパス
            new google.maps.Size(50, 80), //アイコンの表示サイズ(縦,横)
            new google.maps.Point(0, 0)
        ),
        position: LatLng,
        map: map
    });
    var styledMapOptions = {
        name: '卓展2016 会場'
    };
    var customMapType = new google.maps.StyledMapType(featureOptions, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, customMapType);
}

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
