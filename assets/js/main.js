$( function (){
	var $images = $( "#main" ).find( 'img' ),
		src = $images.attr( 'src' );
	$images.attr( 'src', src.replace( '.png', '-w.png' ) )
} )