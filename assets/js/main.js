$(function(){
    var menu = $("ul.nav.nav-list").find("#main"),
        src = menu.find('img').attr('src');
    menu.attr("class","active").find('img').attr('src', src.replace('.png', '-w.png'));
});
