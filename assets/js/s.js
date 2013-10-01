function preloadImage(url) {
    var img = new Image();
    img.src = url;
}

preloadImage("assets/img/photo_head.jpg");
preloadImage("assets/img/ico-main-w.png");
preloadImage("assets/img/ico-new.png");
preloadImage("assets/img/ico-agenda.png");
preloadImage("assets/img/ico-crown.png");
preloadImage("assets/img/ico-pay.png");
preloadImage("assets/img/ico-helicopter.png");
preloadImage("assets/img/banner.png");
preloadImage("assets/img/photo_01.jpg");
preloadImage("assets/img/photo_02.jpg");

window.onload = function () {
    var h = document.getElementById('h');
    h.style.backgroundImage = "url(assets/img/photo_head.jpg)";
};