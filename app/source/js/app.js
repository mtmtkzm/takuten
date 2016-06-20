/*  randomFade
******************** */
var $target = $('.js-randomFade'); // FadeInさせる要素
var interval = 150; // 150ms感覚でFadeInする
var length = $target.length;

var count = 0;

function randomNumber(n) {
    var i, j, tmp, a = new Array(n);
    return function (){
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
for(var i=random(); i!=null; i=random()) {
    randomFadeIn(i);
}


/*  Parallax Scroll
******************** */
$('.js-parallax').enllax();
