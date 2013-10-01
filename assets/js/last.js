jQuery(document).ready(function(evt){
    jQuery("ul.nav.nav-list").find("#main").attr("class","active")
    var src = jQuery("ul.nav.nav-list").find("#main").find('img').attr('src')
    jQuery("ul.nav.nav-list").find("#main").find('img').attr('src', src.replace('.png', '-w.png'))
})