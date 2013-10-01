$( function (){
	var PNG = '.png';
	var $main = $( "#main" ),
		$images = $main.find( 'img' ),
		src = $images.attr( 'src' ),
		newExtension = src.replace( PNG, '-w' + PNG );
	$main.addClass( 'active' );
	$images.attr( 'src', newExtension )
} );