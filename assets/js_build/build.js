/*! my-project-name 2013-10-01 */
!function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.options = a.extend( {}, a.fn.affix.defaults, c ), this.$window = a( window ).on( "scroll.affix.data-api", a.proxy( this.checkPosition, this ) ).on( "click.affix.data-api", a.proxy( function (){
			setTimeout( a.proxy( this.checkPosition, this ), 1 )
		}, this ) ), this.$element = a( b ), this.checkPosition()
	};
	b.prototype.checkPosition = function (){
		if ( this.$element.is( ":visible" ) ) {
			var b, c = a( document ).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.bottom, h = f.top, i = "affix affix-top affix-bottom";
			"object" != typeof f && (g = h = f), "function" == typeof h && (h = f.top()), "function" == typeof g && (g = f.bottom()), b = null != this.unpin && d + this.unpin <= e.top ? !1 : null != g && e.top + this.$element.height() >= c - g ? "bottom" : null != h && h >= d ? "top" : !1, this.affixed !== b && (this.affixed = b, this.unpin = "bottom" == b ? e.top - d : null, this.$element.removeClass( i ).addClass( "affix" + (b ? "-" + b : "") ))
		}
	};
	var c = a.fn.affix;
	a.fn.affix = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "affix" ), f = "object" == typeof c && c;
			e || d.data( "affix", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.affix.Constructor = b, a.fn.affix.defaults = {offset: 0}, a.fn.affix.noConflict = function (){
		return a.fn.affix = c, this
	}, a( window ).on( "load", function (){
		a( '[data-spy="affix"]' ).each( function (){
			var b = a( this ), c = b.data();
			c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix( c )
		} )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = '[data-dismiss="alert"]', c = function ( c ){
		a( c ).on( "click", b, this.close )
	};
	c.prototype.close = function ( b ){
		function c(){
			d.trigger( "closed" ).remove()
		}

		var d, e = a( this ), f = e.attr( "data-target" );
		f || (f = e.attr( "href" ), f = f && f.replace( /.*(?=#[^\s]*$)/, "" )), d = a( f ), b && b.preventDefault(), d.length || (d = e.hasClass( "alert" ) ? e : e.parent()), d.trigger( b = a.Event( "close" ) ), b.isDefaultPrevented() || (d.removeClass( "in" ), a.support.transition && d.hasClass( "fade" ) ? d.on( a.support.transition.end, c ) : c())
	};
	var d = a.fn.alert;
	a.fn.alert = function ( b ){
		return this.each( function (){
			var d = a( this ), e = d.data( "alert" );
			e || d.data( "alert", e = new c( this ) ), "string" == typeof b && e[b].call( d )
		} )
	}, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function (){
		return a.fn.alert = d, this
	}, a( document ).on( "click.alert.data-api", b, c.prototype.close )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.$element = a( b ), this.options = a.extend( {}, a.fn.button.defaults, c )
	};
	b.prototype.setState = function ( a ){
		var b = "disabled", c = this.$element, d = c.data(), e = c.is( "input" ) ? "val" : "html";
		a += "Text", d.resetText || c.data( "resetText", c[e]() ), c[e]( d[a] || this.options[a] ), setTimeout( function (){
			"loadingText" == a ? c.addClass( b ).attr( b, b ) : c.removeClass( b ).removeAttr( b )
		}, 0 )
	}, b.prototype.toggle = function (){
		var a = this.$element.closest( '[data-toggle="buttons-radio"]' );
		a && a.find( ".active" ).removeClass( "active" ), this.$element.toggleClass( "active" )
	};
	var c = a.fn.button;
	a.fn.button = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "button" ), f = "object" == typeof c && c;
			e || d.data( "button", e = new b( this, f ) ), "toggle" == c ? e.toggle() : c && e.setState( c )
		} )
	}, a.fn.button.defaults = {loadingText: "loading..."}, a.fn.button.Constructor = b, a.fn.button.noConflict = function (){
		return a.fn.button = c, this
	}, a( document ).on( "click.button.data-api", "[data-toggle^=button]", function ( b ){
		var c = a( b.target );
		c.hasClass( "btn" ) || (c = c.closest( ".btn" )), c.button( "toggle" )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.$element = a( b ), this.$indicators = this.$element.find( ".carousel-indicators" ), this.options = c, "hover" == this.options.pause && this.$element.on( "mouseenter", a.proxy( this.pause, this ) ).on( "mouseleave", a.proxy( this.cycle, this ) )
	};
	b.prototype = {cycle: function ( b ){
		return b || (this.paused = !1), this.interval && clearInterval( this.interval ), this.options.interval && !this.paused && (this.interval = setInterval( a.proxy( this.next, this ), this.options.interval )), this
	}, getActiveIndex   : function (){
		return this.$active = this.$element.find( ".item.active" ), this.$items = this.$active.parent().children(), this.$items.index( this.$active )
	}, to               : function ( b ){
		var c = this.getActiveIndex(), d = this;
		if ( !(b > this.$items.length - 1 || 0 > b) )return this.sliding ? this.$element.one( "slid", function (){
			d.to( b )
		} ) : c == b ? this.pause().cycle() : this.slide( b > c ? "next" : "prev", a( this.$items[b] ) )
	}, pause            : function ( b ){
		return b || (this.paused = !0), this.$element.find( ".next, .prev" ).length && a.support.transition.end && (this.$element.trigger( a.support.transition.end ), this.cycle( !0 )), clearInterval( this.interval ), this.interval = null, this
	}, next             : function (){
		return this.sliding ? void 0 : this.slide( "next" )
	}, prev             : function (){
		return this.sliding ? void 0 : this.slide( "prev" )
	}, slide            : function ( b, c ){
		var d, e = this.$element.find( ".item.active" ), f = c || e[b](), g = this.interval, h = "next" == b ? "left" : "right", i = "next" == b ? "first" : "last", j = this;
		if ( this.sliding = !0, g && this.pause(), f = f.length ? f : this.$element.find( ".item" )[i](), d = a.Event( "slide", {relatedTarget: f[0], direction: h} ), !f.hasClass( "active" ) ) {
			if ( this.$indicators.length && (this.$indicators.find( ".active" ).removeClass( "active" ), this.$element.one( "slid", function (){
				var b = a( j.$indicators.children()[j.getActiveIndex()] );
				b && b.addClass( "active" )
			} )), a.support.transition && this.$element.hasClass( "slide" ) ) {
				if ( this.$element.trigger( d ), d.isDefaultPrevented() )return;
				f.addClass( b ), f[0].offsetWidth, e.addClass( h ), f.addClass( h ), this.$element.one( a.support.transition.end, function (){
					f.removeClass( [b, h].join( " " ) ).addClass( "active" ), e.removeClass( ["active", h].join( " " ) ), j.sliding = !1, setTimeout( function (){
						j.$element.trigger( "slid" )
					}, 0 )
				} )
			} else {
				if ( this.$element.trigger( d ), d.isDefaultPrevented() )return;
				e.removeClass( "active" ), f.addClass( "active" ), this.sliding = !1, this.$element.trigger( "slid" )
			}
			return g && this.cycle(), this
		}
	}};
	var c = a.fn.carousel;
	a.fn.carousel = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "carousel" ), f = a.extend( {}, a.fn.carousel.defaults, "object" == typeof c && c ), g = "string" == typeof c ? c : f.slide;
			e || d.data( "carousel", e = new b( this, f ) ), "number" == typeof c ? e.to( c ) : g ? e[g]() : f.interval && e.pause().cycle()
		} )
	}, a.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function (){
		return a.fn.carousel = c, this
	}, a( document ).on( "click.carousel.data-api", "[data-slide], [data-slide-to]", function ( b ){
		var c, d, e = a( this ), f = a( e.attr( "data-target" ) || (c = e.attr( "href" )) && c.replace( /.*(?=#[^\s]+$)/, "" ) ), g = a.extend( {}, f.data(), e.data() );
		f.carousel( g ), (d = e.attr( "data-slide-to" )) && f.data( "carousel" ).pause().to( d ).cycle(), b.preventDefault()
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.$element = a( b ), this.options = a.extend( {}, a.fn.collapse.defaults, c ), this.options.parent && (this.$parent = a( this.options.parent )), this.options.toggle && this.toggle()
	};
	b.prototype = {constructor: b, dimension: function (){
		var a = this.$element.hasClass( "width" );
		return a ? "width" : "height"
	}, show                   : function (){
		var b, c, d, e;
		if ( !this.transitioning && !this.$element.hasClass( "in" ) ) {
			if ( b = this.dimension(), c = a.camelCase( ["scroll", b].join( "-" ) ), d = this.$parent && this.$parent.find( "> .accordion-group > .in" ), d && d.length ) {
				if ( e = d.data( "collapse" ), e && e.transitioning )return;
				d.collapse( "hide" ), e || d.data( "collapse", null )
			}
			this.$element[b]( 0 ), this.transition( "addClass", a.Event( "show" ), "shown" ), a.support.transition && this.$element[b]( this.$element[0][c] )
		}
	}, hide                   : function (){
		var b;
		!this.transitioning && this.$element.hasClass( "in" ) && (b = this.dimension(), this.reset( this.$element[b]() ), this.transition( "removeClass", a.Event( "hide" ), "hidden" ), this.$element[b]( 0 ))
	}, reset                  : function ( a ){
		var b = this.dimension();
		return this.$element.removeClass( "collapse" )[b]( a || "auto" )[0].offsetWidth, this.$element[null !== a ? "addClass" : "removeClass"]( "collapse" ), this
	}, transition             : function ( b, c, d ){
		var e = this, f = function (){
			"show" == c.type && e.reset(), e.transitioning = 0, e.$element.trigger( d )
		};
		this.$element.trigger( c ), c.isDefaultPrevented() || (this.transitioning = 1, this.$element[b]( "in" ), a.support.transition && this.$element.hasClass( "collapse" ) ? this.$element.one( a.support.transition.end, f ) : f())
	}, toggle                 : function (){
		this[this.$element.hasClass( "in" ) ? "hide" : "show"]()
	}};
	var c = a.fn.collapse;
	a.fn.collapse = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "collapse" ), f = a.extend( {}, a.fn.collapse.defaults, d.data(), "object" == typeof c && c );
			e || d.data( "collapse", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.collapse.defaults = {toggle: !0}, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function (){
		return a.fn.collapse = c, this
	}, a( document ).on( "click.collapse.data-api", "[data-toggle=collapse]", function ( b ){
		var c, d = a( this ), e = d.attr( "data-target" ) || b.preventDefault() || (c = d.attr( "href" )) && c.replace( /.*(?=#[^\s]+$)/, "" ), f = a( e ).data( "collapse" ) ? "toggle" : d.data();
		d[a( e ).hasClass( "in" ) ? "addClass" : "removeClass"]( "collapsed" ), a( e ).collapse( f )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	function b(){
		a( ".dropdown-backdrop" ).remove(), a( d ).each( function (){
			c( a( this ) ).removeClass( "open" )
		} )
	}

	function c( b ){
		var c, d = b.attr( "data-target" );
		return d || (d = b.attr( "href" ), d = d && /#/.test( d ) && d.replace( /.*(?=#[^\s]*$)/, "" )), c = d && a( d ), c && c.length || (c = b.parent()), c
	}

	var d = "[data-toggle=dropdown]", e = function ( b ){
		var c = a( b ).on( "click.dropdown.data-api", this.toggle );
		a( "html" ).on( "click.dropdown.data-api", function (){
			c.parent().removeClass( "open" )
		} )
	};
	e.prototype = {constructor: e, toggle: function (){
		var d, e, f = a( this );
		if ( !f.is( ".disabled, :disabled" ) )return d = c( f ), e = d.hasClass( "open" ), b(), e || ("ontouchstart"in document.documentElement && a( '<div class="dropdown-backdrop"/>' ).insertBefore( a( this ) ).on( "click", b ), d.toggleClass( "open" )), f.focus(), !1
	}, keydown                : function ( b ){
		var e, f, g, h, i;
		if ( /(38|40|27)/.test( b.keyCode ) && (e = a( this ), b.preventDefault(), b.stopPropagation(), !e.is( ".disabled, :disabled" )) ) {
			if ( g = c( e ), h = g.hasClass( "open" ), !h || h && 27 == b.keyCode )return 27 == b.which && g.find( d ).focus(), e.click();
			f = a( "[role=menu] li:not(.divider):visible a", g ), f.length && (i = f.index( f.filter( ":focus" ) ), 38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < f.length - 1 && i++, ~i || (i = 0), f.eq( i ).focus())
		}
	}};
	var f = a.fn.dropdown;
	a.fn.dropdown = function ( b ){
		return this.each( function (){
			var c = a( this ), d = c.data( "dropdown" );
			d || c.data( "dropdown", d = new e( this ) ), "string" == typeof b && d[b].call( c )
		} )
	}, a.fn.dropdown.Constructor = e, a.fn.dropdown.noConflict = function (){
		return a.fn.dropdown = f, this
	}, a( document ).on( "click.dropdown.data-api", b ).on( "click.dropdown.data-api", ".dropdown form",function ( a ){
		a.stopPropagation()
	} ).on( "click.dropdown.data-api", d, e.prototype.toggle ).on( "keydown.dropdown.data-api", d + ", [role=menu]", e.prototype.keydown )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.options = c, this.$element = a( b ).delegate( '[data-dismiss="modal"]', "click.dismiss.modal", a.proxy( this.hide, this ) ), this.options.remote && this.$element.find( ".modal-body" ).load( this.options.remote )
	};
	b.prototype = {constructor: b, toggle: function (){
		return this[this.isShown ? "hide" : "show"]()
	}, show                   : function (){
		var b = this, c = a.Event( "show" );
		this.$element.trigger( c ), this.isShown || c.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop( function (){
			var c = a.support.transition && b.$element.hasClass( "fade" );
			b.$element.parent().length || b.$element.appendTo( document.body ), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass( "in" ).attr( "aria-hidden", !1 ), b.enforceFocus(), c ? b.$element.one( a.support.transition.end, function (){
				b.$element.focus().trigger( "shown" )
			} ) : b.$element.focus().trigger( "shown" )
		} ))
	}, hide                   : function ( b ){
		b && b.preventDefault(), b = a.Event( "hide" ), this.$element.trigger( b ), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a( document ).off( "focusin.modal" ), this.$element.removeClass( "in" ).attr( "aria-hidden", !0 ), a.support.transition && this.$element.hasClass( "fade" ) ? this.hideWithTransition() : this.hideModal())
	}, enforceFocus           : function (){
		var b = this;
		a( document ).on( "focusin.modal", function ( a ){
			b.$element[0] === a.target || b.$element.has( a.target ).length || b.$element.focus()
		} )
	}, escape                 : function (){
		var a = this;
		this.isShown && this.options.keyboard ? this.$element.on( "keyup.dismiss.modal", function ( b ){
			27 == b.which && a.hide()
		} ) : this.isShown || this.$element.off( "keyup.dismiss.modal" )
	}, hideWithTransition     : function (){
		var b = this, c = setTimeout( function (){
			b.$element.off( a.support.transition.end ), b.hideModal()
		}, 500 );
		this.$element.one( a.support.transition.end, function (){
			clearTimeout( c ), b.hideModal()
		} )
	}, hideModal              : function (){
		var a = this;
		this.$element.hide(), this.backdrop( function (){
			a.removeBackdrop(), a.$element.trigger( "hidden" )
		} )
	}, removeBackdrop         : function (){
		this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
	}, backdrop               : function ( b ){
		var c = this.$element.hasClass( "fade" ) ? "fade" : "";
		if ( this.isShown && this.options.backdrop ) {
			var d = a.support.transition && c;
			if ( this.$backdrop = a( '<div class="modal-backdrop ' + c + '" />' ).appendTo( document.body ), this.$backdrop.click( "static" == this.options.backdrop ? a.proxy( this.$element[0].focus, this.$element[0] ) : a.proxy( this.hide, this ) ), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass( "in" ), !b )return;
			d ? this.$backdrop.one( a.support.transition.end, b ) : b()
		} else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass( "in" ), a.support.transition && this.$element.hasClass( "fade" ) ? this.$backdrop.one( a.support.transition.end, b ) : b()) : b && b()
	}};
	var c = a.fn.modal;
	a.fn.modal = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "modal" ), f = a.extend( {}, a.fn.modal.defaults, d.data(), "object" == typeof c && c );
			e || d.data( "modal", e = new b( this, f ) ), "string" == typeof c ? e[c]() : f.show && e.show()
		} )
	}, a.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function (){
		return a.fn.modal = c, this
	}, a( document ).on( "click.modal.data-api", '[data-toggle="modal"]', function ( b ){
		var c = a( this ), d = c.attr( "href" ), e = a( c.attr( "data-target" ) || d && d.replace( /.*(?=#[^\s]+$)/, "" ) ), f = e.data( "modal" ) ? "toggle" : a.extend( {remote: !/#/.test( d ) && d}, e.data(), c.data() );
		b.preventDefault(), e.modal( f ).one( "hide", function (){
			c.focus()
		} )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( a, b ){
		this.init( "popover", a, b )
	};
	b.prototype = a.extend( {}, a.fn.tooltip.Constructor.prototype, {constructor: b, setContent: function (){
		var a = this.tip(), b = this.getTitle(), c = this.getContent();
		a.find( ".popover-title" )[this.options.html ? "html" : "text"]( b ), a.find( ".popover-content" )[this.options.html ? "html" : "text"]( c ), a.removeClass( "fade top bottom left right in" )
	}, hasContent                                                               : function (){
		return this.getTitle() || this.getContent()
	}, getContent                                                               : function (){
		var a, b = this.$element, c = this.options;
		return a = ("function" == typeof c.content ? c.content.call( b[0] ) : c.content) || b.attr( "data-content" )
	}, tip                                                                      : function (){
		return this.$tip || (this.$tip = a( this.options.template )), this.$tip
	}, destroy                                                                  : function (){
		this.hide().$element.off( "." + this.type ).removeData( this.type )
	}} );
	var c = a.fn.popover;
	a.fn.popover = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "popover" ), f = "object" == typeof c && c;
			e || d.data( "popover", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend( {}, a.fn.tooltip.defaults, {placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'} ), a.fn.popover.noConflict = function (){
		return a.fn.popover = c, this
	}
}( window.jQuery ), !function ( a ){
	"use strict";
	function b( b, c ){
		var d, e = a.proxy( this.process, this ), f = a( b ).is( "body" ) ? a( window ) : a( b );
		this.options = a.extend( {}, a.fn.scrollspy.defaults, c ), this.$scrollElement = f.on( "scroll.scroll-spy.data-api", e ), this.selector = (this.options.target || (d = a( b ).attr( "href" )) && d.replace( /.*(?=#[^\s]+$)/, "" ) || "") + " .nav li > a", this.$body = a( "body" ), this.refresh(), this.process()
	}

	b.prototype = {constructor: b, refresh: function (){
		var b, c = this;
		this.offsets = a( [] ), this.targets = a( [] ), b = this.$body.find( this.selector ).map(function (){
			var b = a( this ), d = b.data( "target" ) || b.attr( "href" ), e = /^#\w/.test( d ) && a( d );
			return e && e.length && [
				[e.position().top + (!a.isWindow( c.$scrollElement.get( 0 ) ) && c.$scrollElement.scrollTop()), d]
			] || null
		} ).sort(function ( a, b ){
			return a[0] - b[0]
		} ).each( function (){
			c.offsets.push( this[0] ), c.targets.push( this[1] )
		} )
	}, process                : function (){
		var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
		if ( b >= d )return g != (a = f.last()[0]) && this.activate( a );
		for ( a = e.length; a--; )g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate( f[a] )
	}, activate               : function ( b ){
		var c, d;
		this.activeTarget = b, a( this.selector ).parent( ".active" ).removeClass( "active" ), d = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', c = a( d ).parent( "li" ).addClass( "active" ), c.parent( ".dropdown-menu" ).length && (c = c.closest( "li.dropdown" ).addClass( "active" )), c.trigger( "activate" )
	}};
	var c = a.fn.scrollspy;
	a.fn.scrollspy = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "scrollspy" ), f = "object" == typeof c && c;
			e || d.data( "scrollspy", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.defaults = {offset: 10}, a.fn.scrollspy.noConflict = function (){
		return a.fn.scrollspy = c, this
	}, a( window ).on( "load", function (){
		a( '[data-spy="scroll"]' ).each( function (){
			var b = a( this );
			b.scrollspy( b.data() )
		} )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b ){
		this.element = a( b )
	};
	b.prototype = {constructor: b, show: function (){
		var b, c, d, e = this.element, f = e.closest( "ul:not(.dropdown-menu)" ), g = e.attr( "data-target" );
		g || (g = e.attr( "href" ), g = g && g.replace( /.*(?=#[^\s]*$)/, "" )), e.parent( "li" ).hasClass( "active" ) || (b = f.find( ".active:last a" )[0], d = a.Event( "show", {relatedTarget: b} ), e.trigger( d ), d.isDefaultPrevented() || (c = a( g ), this.activate( e.parent( "li" ), f ), this.activate( c, c.parent(), function (){
			e.trigger( {type: "shown", relatedTarget: b} )
		} )))
	}, activate               : function ( b, c, d ){
		function e(){
			f.removeClass( "active" ).find( "> .dropdown-menu > .active" ).removeClass( "active" ), b.addClass( "active" ), g ? (b[0].offsetWidth, b.addClass( "in" )) : b.removeClass( "fade" ), b.parent( ".dropdown-menu" ) && b.closest( "li.dropdown" ).addClass( "active" ), d && d()
		}

		var f = c.find( "> .active" ), g = d && a.support.transition && f.hasClass( "fade" );
		g ? f.one( a.support.transition.end, e ) : e(), f.removeClass( "in" )
	}};
	var c = a.fn.tab;
	a.fn.tab = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "tab" );
			e || d.data( "tab", e = new b( this ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function (){
		return a.fn.tab = c, this
	}, a( document ).on( "click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function ( b ){
		b.preventDefault(), a( this ).tab( "show" )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( a, b ){
		this.init( "tooltip", a, b )
	};
	b.prototype = {constructor: b, init: function ( b, c, d ){
		var e, f, g, h, i;
		for ( this.type = b, this.$element = a( c ), this.options = this.getOptions( d ), this.enabled = !0, g = this.options.trigger.split( " " ), i = g.length; i--; )h = g[i], "click" == h ? this.$element.on( "click." + this.type, this.options.selector, a.proxy( this.toggle, this ) ) : "manual" != h && (e = "hover" == h ? "mouseenter" : "focus", f = "hover" == h ? "mouseleave" : "blur", this.$element.on( e + "." + this.type, this.options.selector, a.proxy( this.enter, this ) ), this.$element.on( f + "." + this.type, this.options.selector, a.proxy( this.leave, this ) ));
		this.options.selector ? this._options = a.extend( {}, this.options, {trigger: "manual", selector: ""} ) : this.fixTitle()
	}, getOptions             : function ( b ){
		return b = a.extend( {}, a.fn[this.type].defaults, this.$element.data(), b ), b.delay && "number" == typeof b.delay && (b.delay = {show: b.delay, hide: b.delay}), b
	}, enter                  : function ( b ){
		var c, d = a.fn[this.type].defaults, e = {};
		return this._options && a.each( this._options, function ( a, b ){
			d[a] != b && (e[a] = b)
		}, this ), c = a( b.currentTarget )[this.type]( e ).data( this.type ), c.options.delay && c.options.delay.show ? (clearTimeout( this.timeout ), c.hoverState = "in", this.timeout = setTimeout( function (){
			"in" == c.hoverState && c.show()
		}, c.options.delay.show ), void 0) : c.show()
	}, leave                  : function ( b ){
		var c = a( b.currentTarget )[this.type]( this._options ).data( this.type );
		return this.timeout && clearTimeout( this.timeout ), c.options.delay && c.options.delay.hide ? (c.hoverState = "out", this.timeout = setTimeout( function (){
			"out" == c.hoverState && c.hide()
		}, c.options.delay.hide ), void 0) : c.hide()
	}, show                   : function (){
		var b, c, d, e, f, g, h = a.Event( "show" );
		if ( this.hasContent() && this.enabled ) {
			if ( this.$element.trigger( h ), h.isDefaultPrevented() )return;
			switch ( b = this.tip(), this.setContent(), this.options.animation && b.addClass( "fade" ), f = "function" == typeof this.options.placement ? this.options.placement.call( this, b[0], this.$element[0] ) : this.options.placement, b.detach().css( {top: 0, left: 0, display: "block"} ), this.options.container ? b.appendTo( this.options.container ) : b.insertAfter( this.$element ), c = this.getPosition(), d = b[0].offsetWidth, e = b[0].offsetHeight, f ) {
				case"bottom":
					g = {top: c.top + c.height, left: c.left + c.width / 2 - d / 2};
					break;
				case"top":
					g = {top: c.top - e, left: c.left + c.width / 2 - d / 2};
					break;
				case"left":
					g = {top: c.top + c.height / 2 - e / 2, left: c.left - d};
					break;
				case"right":
					g = {top: c.top + c.height / 2 - e / 2, left: c.left + c.width}
			}
			this.applyPlacement( g, f ), this.$element.trigger( "shown" )
		}
	}, applyPlacement         : function ( a, b ){
		var c, d, e, f, g = this.tip(), h = g[0].offsetWidth, i = g[0].offsetHeight;
		g.offset( a ).addClass( b ).addClass( "in" ), c = g[0].offsetWidth, d = g[0].offsetHeight, "top" == b && d != i && (a.top = a.top + i - d, f = !0), "bottom" == b || "top" == b ? (e = 0, a.left < 0 && (e = -2 * a.left, a.left = 0, g.offset( a ), c = g[0].offsetWidth, d = g[0].offsetHeight), this.replaceArrow( e - h + c, c, "left" )) : this.replaceArrow( d - i, d, "top" ), f && g.offset( a )
	}, replaceArrow           : function ( a, b, c ){
		this.arrow().css( c, a ? 50 * (1 - a / b) + "%" : "" )
	}, setContent             : function (){
		var a = this.tip(), b = this.getTitle();
		a.find( ".tooltip-inner" )[this.options.html ? "html" : "text"]( b ), a.removeClass( "fade in top bottom left right" )
	}, hide                   : function (){
		function b(){
			var b = setTimeout( function (){
				c.off( a.support.transition.end ).detach()
			}, 500 );
			c.one( a.support.transition.end, function (){
				clearTimeout( b ), c.detach()
			} )
		}

		var c = this.tip(), d = a.Event( "hide" );
		return this.$element.trigger( d ), d.isDefaultPrevented() ? void 0 : (c.removeClass( "in" ), a.support.transition && this.$tip.hasClass( "fade" ) ? b() : c.detach(), this.$element.trigger( "hidden" ), this)
	}, fixTitle               : function (){
		var a = this.$element;
		(a.attr( "title" ) || "string" != typeof a.attr( "data-original-title" )) && a.attr( "data-original-title", a.attr( "title" ) || "" ).attr( "title", "" )
	}, hasContent             : function (){
		return this.getTitle()
	}, getPosition            : function (){
		var b = this.$element[0];
		return a.extend( {}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {width: b.offsetWidth, height: b.offsetHeight}, this.$element.offset() )
	}, getTitle               : function (){
		var a, b = this.$element, c = this.options;
		return a = b.attr( "data-original-title" ) || ("function" == typeof c.title ? c.title.call( b[0] ) : c.title)
	}, tip                    : function (){
		return this.$tip = this.$tip || a( this.options.template )
	}, arrow                  : function (){
		return this.$arrow = this.$arrow || this.tip().find( ".tooltip-arrow" )
	}, validate               : function (){
		this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
	}, enable                 : function (){
		this.enabled = !0
	}, disable                : function (){
		this.enabled = !1
	}, toggleEnabled          : function (){
		this.enabled = !this.enabled
	}, toggle                 : function ( b ){
		var c = b ? a( b.currentTarget )[this.type]( this._options ).data( this.type ) : this;
		c.tip().hasClass( "in" ) ? c.hide() : c.show()
	}, destroy                : function (){
		this.hide().$element.off( "." + this.type ).removeData( this.type )
	}};
	var c = a.fn.tooltip;
	a.fn.tooltip = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "tooltip" ), f = "object" == typeof c && c;
			e || d.data( "tooltip", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1}, a.fn.tooltip.noConflict = function (){
		return a.fn.tooltip = c, this
	}
}( window.jQuery ), !function ( a ){
	"use strict";
	a( function (){
		a.support.transition = function (){
			var a = function (){
				var a, b = document.createElement( "bootstrap" ), c = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"};
				for ( a in c )if ( void 0 !== b.style[a] )return c[a]
			}();
			return a && {end: a}
		}()
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.$element = a( b ), this.options = a.extend( {}, a.fn.typeahead.defaults, c ), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = a( this.options.menu ), this.shown = !1, this.listen()
	};
	b.prototype = {constructor: b, select: function (){
		var a = this.$menu.find( ".active" ).attr( "data-value" );
		return this.$element.val( this.updater( a ) ).change(), this.hide()
	}, updater                : function ( a ){
		return a
	}, show                   : function (){
		var b = a.extend( {}, this.$element.position(), {height: this.$element[0].offsetHeight} );
		return this.$menu.insertAfter( this.$element ).css( {top: b.top + b.height, left: b.left} ).show(), this.shown = !0, this
	}, hide                   : function (){
		return this.$menu.hide(), this.shown = !1, this
	}, lookup                 : function (){
		var b;
		return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (b = a.isFunction( this.source ) ? this.source( this.query, a.proxy( this.process, this ) ) : this.source, b ? this.process( b ) : this)
	}, process                : function ( b ){
		var c = this;
		return b = a.grep( b, function ( a ){
			return c.matcher( a )
		} ), b = this.sorter( b ), b.length ? this.render( b.slice( 0, this.options.items ) ).show() : this.shown ? this.hide() : this
	}, matcher                : function ( a ){
		return~a.toLowerCase().indexOf( this.query.toLowerCase() )
	}, sorter                 : function ( a ){
		for ( var b, c = [], d = [], e = []; b = a.shift(); )b.toLowerCase().indexOf( this.query.toLowerCase() ) ? ~b.indexOf( this.query ) ? d.push( b ) : e.push( b ) : c.push( b );
		return c.concat( d, e )
	}, highlighter            : function ( a ){
		var b = this.query.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
		return a.replace( new RegExp( "(" + b + ")", "ig" ), function ( a, b ){
			return"<strong>" + b + "</strong>"
		} )
	}, render                 : function ( b ){
		var c = this;
		return b = a( b ).map( function ( b, d ){
			return b = a( c.options.item ).attr( "data-value", d ), b.find( "a" ).html( c.highlighter( d ) ), b[0]
		} ), b.first().addClass( "active" ), this.$menu.html( b ), this
	}, next                   : function (){
		var b = this.$menu.find( ".active" ).removeClass( "active" ), c = b.next();
		c.length || (c = a( this.$menu.find( "li" )[0] )), c.addClass( "active" )
	}, prev                   : function (){
		var a = this.$menu.find( ".active" ).removeClass( "active" ), b = a.prev();
		b.length || (b = this.$menu.find( "li" ).last()), b.addClass( "active" )
	}, listen                 : function (){
		this.$element.on( "focus", a.proxy( this.focus, this ) ).on( "blur", a.proxy( this.blur, this ) ).on( "keypress", a.proxy( this.keypress, this ) ).on( "keyup", a.proxy( this.keyup, this ) ), this.eventSupported( "keydown" ) && this.$element.on( "keydown", a.proxy( this.keydown, this ) ), this.$menu.on( "click", a.proxy( this.click, this ) ).on( "mouseenter", "li", a.proxy( this.mouseenter, this ) ).on( "mouseleave", "li", a.proxy( this.mouseleave, this ) )
	}, eventSupported         : function ( a ){
		var b = a in this.$element;
		return b || (this.$element.setAttribute( a, "return;" ), b = "function" == typeof this.$element[a]), b
	}, move                   : function ( a ){
		if ( this.shown ) {
			switch ( a.keyCode ) {
				case 9:
				case 13:
				case 27:
					a.preventDefault();
					break;
				case 38:
					a.preventDefault(), this.prev();
					break;
				case 40:
					a.preventDefault(), this.next()
			}
			a.stopPropagation()
		}
	}, keydown                : function ( b ){
		this.suppressKeyPressRepeat = ~a.inArray( b.keyCode, [40, 38, 9, 13, 27] ), this.move( b )
	}, keypress               : function ( a ){
		this.suppressKeyPressRepeat || this.move( a )
	}, keyup                  : function ( a ){
		switch ( a.keyCode ) {
			case 40:
			case 38:
			case 16:
			case 17:
			case 18:
				break;
			case 9:
			case 13:
				if ( !this.shown )return;
				this.select();
				break;
			case 27:
				if ( !this.shown )return;
				this.hide();
				break;
			default:
				this.lookup()
		}
		a.stopPropagation(), a.preventDefault()
	}, focus                  : function (){
		this.focused = !0
	}, blur                   : function (){
		this.focused = !1, !this.mousedover && this.shown && this.hide()
	}, click                  : function ( a ){
		a.stopPropagation(), a.preventDefault(), this.select(), this.$element.focus()
	}, mouseenter             : function ( b ){
		this.mousedover = !0, this.$menu.find( ".active" ).removeClass( "active" ), a( b.currentTarget ).addClass( "active" )
	}, mouseleave             : function (){
		this.mousedover = !1, !this.focused && this.shown && this.hide()
	}};
	var c = a.fn.typeahead;
	a.fn.typeahead = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "typeahead" ), f = "object" == typeof c && c;
			e || d.data( "typeahead", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.typeahead.defaults = {source: [], items: 8, menu: '<ul class="typeahead dropdown-menu"></ul>', item: '<li><a href="#"></a></li>', minLength: 1}, a.fn.typeahead.Constructor = b, a.fn.typeahead.noConflict = function (){
		return a.fn.typeahead = c, this
	}, a( document ).on( "focus.typeahead.data-api", '[data-provide="typeahead"]', function (){
		var b = a( this );
		b.data( "typeahead" ) || b.typeahead( b.data() )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	a( function (){
		a.support.transition = function (){
			var a = function (){
				var a, b = document.createElement( "bootstrap" ), c = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"};
				for ( a in c )if ( void 0 !== b.style[a] )return c[a]
			}();
			return a && {end: a}
		}()
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = '[data-dismiss="alert"]', c = function ( c ){
		a( c ).on( "click", b, this.close )
	};
	c.prototype.close = function ( b ){
		function c(){
			d.trigger( "closed" ).remove()
		}

		var d, e = a( this ), f = e.attr( "data-target" );
		f || (f = e.attr( "href" ), f = f && f.replace( /.*(?=#[^\s]*$)/, "" )), d = a( f ), b && b.preventDefault(), d.length || (d = e.hasClass( "alert" ) ? e : e.parent()), d.trigger( b = a.Event( "close" ) ), b.isDefaultPrevented() || (d.removeClass( "in" ), a.support.transition && d.hasClass( "fade" ) ? d.on( a.support.transition.end, c ) : c())
	};
	var d = a.fn.alert;
	a.fn.alert = function ( b ){
		return this.each( function (){
			var d = a( this ), e = d.data( "alert" );
			e || d.data( "alert", e = new c( this ) ), "string" == typeof b && e[b].call( d )
		} )
	}, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function (){
		return a.fn.alert = d, this
	}, a( document ).on( "click.alert.data-api", b, c.prototype.close )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.$element = a( b ), this.options = a.extend( {}, a.fn.button.defaults, c )
	};
	b.prototype.setState = function ( a ){
		var b = "disabled", c = this.$element, d = c.data(), e = c.is( "input" ) ? "val" : "html";
		a += "Text", d.resetText || c.data( "resetText", c[e]() ), c[e]( d[a] || this.options[a] ), setTimeout( function (){
			"loadingText" == a ? c.addClass( b ).attr( b, b ) : c.removeClass( b ).removeAttr( b )
		}, 0 )
	}, b.prototype.toggle = function (){
		var a = this.$element.closest( '[data-toggle="buttons-radio"]' );
		a && a.find( ".active" ).removeClass( "active" ), this.$element.toggleClass( "active" )
	};
	var c = a.fn.button;
	a.fn.button = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "button" ), f = "object" == typeof c && c;
			e || d.data( "button", e = new b( this, f ) ), "toggle" == c ? e.toggle() : c && e.setState( c )
		} )
	}, a.fn.button.defaults = {loadingText: "loading..."}, a.fn.button.Constructor = b, a.fn.button.noConflict = function (){
		return a.fn.button = c, this
	}, a( document ).on( "click.button.data-api", "[data-toggle^=button]", function ( b ){
		var c = a( b.target );
		c.hasClass( "btn" ) || (c = c.closest( ".btn" )), c.button( "toggle" )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.$element = a( b ), this.$indicators = this.$element.find( ".carousel-indicators" ), this.options = c, "hover" == this.options.pause && this.$element.on( "mouseenter", a.proxy( this.pause, this ) ).on( "mouseleave", a.proxy( this.cycle, this ) )
	};
	b.prototype = {cycle: function ( b ){
		return b || (this.paused = !1), this.interval && clearInterval( this.interval ), this.options.interval && !this.paused && (this.interval = setInterval( a.proxy( this.next, this ), this.options.interval )), this
	}, getActiveIndex   : function (){
		return this.$active = this.$element.find( ".item.active" ), this.$items = this.$active.parent().children(), this.$items.index( this.$active )
	}, to               : function ( b ){
		var c = this.getActiveIndex(), d = this;
		if ( !(b > this.$items.length - 1 || 0 > b) )return this.sliding ? this.$element.one( "slid", function (){
			d.to( b )
		} ) : c == b ? this.pause().cycle() : this.slide( b > c ? "next" : "prev", a( this.$items[b] ) )
	}, pause            : function ( b ){
		return b || (this.paused = !0), this.$element.find( ".next, .prev" ).length && a.support.transition.end && (this.$element.trigger( a.support.transition.end ), this.cycle( !0 )), clearInterval( this.interval ), this.interval = null, this
	}, next             : function (){
		return this.sliding ? void 0 : this.slide( "next" )
	}, prev             : function (){
		return this.sliding ? void 0 : this.slide( "prev" )
	}, slide            : function ( b, c ){
		var d, e = this.$element.find( ".item.active" ), f = c || e[b](), g = this.interval, h = "next" == b ? "left" : "right", i = "next" == b ? "first" : "last", j = this;
		if ( this.sliding = !0, g && this.pause(), f = f.length ? f : this.$element.find( ".item" )[i](), d = a.Event( "slide", {relatedTarget: f[0], direction: h} ), !f.hasClass( "active" ) ) {
			if ( this.$indicators.length && (this.$indicators.find( ".active" ).removeClass( "active" ), this.$element.one( "slid", function (){
				var b = a( j.$indicators.children()[j.getActiveIndex()] );
				b && b.addClass( "active" )
			} )), a.support.transition && this.$element.hasClass( "slide" ) ) {
				if ( this.$element.trigger( d ), d.isDefaultPrevented() )return;
				f.addClass( b ), f[0].offsetWidth, e.addClass( h ), f.addClass( h ), this.$element.one( a.support.transition.end, function (){
					f.removeClass( [b, h].join( " " ) ).addClass( "active" ), e.removeClass( ["active", h].join( " " ) ), j.sliding = !1, setTimeout( function (){
						j.$element.trigger( "slid" )
					}, 0 )
				} )
			} else {
				if ( this.$element.trigger( d ), d.isDefaultPrevented() )return;
				e.removeClass( "active" ), f.addClass( "active" ), this.sliding = !1, this.$element.trigger( "slid" )
			}
			return g && this.cycle(), this
		}
	}};
	var c = a.fn.carousel;
	a.fn.carousel = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "carousel" ), f = a.extend( {}, a.fn.carousel.defaults, "object" == typeof c && c ), g = "string" == typeof c ? c : f.slide;
			e || d.data( "carousel", e = new b( this, f ) ), "number" == typeof c ? e.to( c ) : g ? e[g]() : f.interval && e.pause().cycle()
		} )
	}, a.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function (){
		return a.fn.carousel = c, this
	}, a( document ).on( "click.carousel.data-api", "[data-slide], [data-slide-to]", function ( b ){
		var c, d, e = a( this ), f = a( e.attr( "data-target" ) || (c = e.attr( "href" )) && c.replace( /.*(?=#[^\s]+$)/, "" ) ), g = a.extend( {}, f.data(), e.data() );
		f.carousel( g ), (d = e.attr( "data-slide-to" )) && f.data( "carousel" ).pause().to( d ).cycle(), b.preventDefault()
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.$element = a( b ), this.options = a.extend( {}, a.fn.collapse.defaults, c ), this.options.parent && (this.$parent = a( this.options.parent )), this.options.toggle && this.toggle()
	};
	b.prototype = {constructor: b, dimension: function (){
		var a = this.$element.hasClass( "width" );
		return a ? "width" : "height"
	}, show                   : function (){
		var b, c, d, e;
		if ( !this.transitioning && !this.$element.hasClass( "in" ) ) {
			if ( b = this.dimension(), c = a.camelCase( ["scroll", b].join( "-" ) ), d = this.$parent && this.$parent.find( "> .accordion-group > .in" ), d && d.length ) {
				if ( e = d.data( "collapse" ), e && e.transitioning )return;
				d.collapse( "hide" ), e || d.data( "collapse", null )
			}
			this.$element[b]( 0 ), this.transition( "addClass", a.Event( "show" ), "shown" ), a.support.transition && this.$element[b]( this.$element[0][c] )
		}
	}, hide                   : function (){
		var b;
		!this.transitioning && this.$element.hasClass( "in" ) && (b = this.dimension(), this.reset( this.$element[b]() ), this.transition( "removeClass", a.Event( "hide" ), "hidden" ), this.$element[b]( 0 ))
	}, reset                  : function ( a ){
		var b = this.dimension();
		return this.$element.removeClass( "collapse" )[b]( a || "auto" )[0].offsetWidth, this.$element[null !== a ? "addClass" : "removeClass"]( "collapse" ), this
	}, transition             : function ( b, c, d ){
		var e = this, f = function (){
			"show" == c.type && e.reset(), e.transitioning = 0, e.$element.trigger( d )
		};
		this.$element.trigger( c ), c.isDefaultPrevented() || (this.transitioning = 1, this.$element[b]( "in" ), a.support.transition && this.$element.hasClass( "collapse" ) ? this.$element.one( a.support.transition.end, f ) : f())
	}, toggle                 : function (){
		this[this.$element.hasClass( "in" ) ? "hide" : "show"]()
	}};
	var c = a.fn.collapse;
	a.fn.collapse = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "collapse" ), f = a.extend( {}, a.fn.collapse.defaults, d.data(), "object" == typeof c && c );
			e || d.data( "collapse", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.collapse.defaults = {toggle: !0}, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function (){
		return a.fn.collapse = c, this
	}, a( document ).on( "click.collapse.data-api", "[data-toggle=collapse]", function ( b ){
		var c, d = a( this ), e = d.attr( "data-target" ) || b.preventDefault() || (c = d.attr( "href" )) && c.replace( /.*(?=#[^\s]+$)/, "" ), f = a( e ).data( "collapse" ) ? "toggle" : d.data();
		d[a( e ).hasClass( "in" ) ? "addClass" : "removeClass"]( "collapsed" ), a( e ).collapse( f )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	function b(){
		a( ".dropdown-backdrop" ).remove(), a( d ).each( function (){
			c( a( this ) ).removeClass( "open" )
		} )
	}

	function c( b ){
		var c, d = b.attr( "data-target" );
		return d || (d = b.attr( "href" ), d = d && /#/.test( d ) && d.replace( /.*(?=#[^\s]*$)/, "" )), c = d && a( d ), c && c.length || (c = b.parent()), c
	}

	var d = "[data-toggle=dropdown]", e = function ( b ){
		var c = a( b ).on( "click.dropdown.data-api", this.toggle );
		a( "html" ).on( "click.dropdown.data-api", function (){
			c.parent().removeClass( "open" )
		} )
	};
	e.prototype = {constructor: e, toggle: function (){
		var d, e, f = a( this );
		if ( !f.is( ".disabled, :disabled" ) )return d = c( f ), e = d.hasClass( "open" ), b(), e || ("ontouchstart"in document.documentElement && a( '<div class="dropdown-backdrop"/>' ).insertBefore( a( this ) ).on( "click", b ), d.toggleClass( "open" )), f.focus(), !1
	}, keydown                : function ( b ){
		var e, f, g, h, i;
		if ( /(38|40|27)/.test( b.keyCode ) && (e = a( this ), b.preventDefault(), b.stopPropagation(), !e.is( ".disabled, :disabled" )) ) {
			if ( g = c( e ), h = g.hasClass( "open" ), !h || h && 27 == b.keyCode )return 27 == b.which && g.find( d ).focus(), e.click();
			f = a( "[role=menu] li:not(.divider):visible a", g ), f.length && (i = f.index( f.filter( ":focus" ) ), 38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < f.length - 1 && i++, ~i || (i = 0), f.eq( i ).focus())
		}
	}};
	var f = a.fn.dropdown;
	a.fn.dropdown = function ( b ){
		return this.each( function (){
			var c = a( this ), d = c.data( "dropdown" );
			d || c.data( "dropdown", d = new e( this ) ), "string" == typeof b && d[b].call( c )
		} )
	}, a.fn.dropdown.Constructor = e, a.fn.dropdown.noConflict = function (){
		return a.fn.dropdown = f, this
	}, a( document ).on( "click.dropdown.data-api", b ).on( "click.dropdown.data-api", ".dropdown form",function ( a ){
		a.stopPropagation()
	} ).on( "click.dropdown.data-api", d, e.prototype.toggle ).on( "keydown.dropdown.data-api", d + ", [role=menu]", e.prototype.keydown )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.options = c, this.$element = a( b ).delegate( '[data-dismiss="modal"]', "click.dismiss.modal", a.proxy( this.hide, this ) ), this.options.remote && this.$element.find( ".modal-body" ).load( this.options.remote )
	};
	b.prototype = {constructor: b, toggle: function (){
		return this[this.isShown ? "hide" : "show"]()
	}, show                   : function (){
		var b = this, c = a.Event( "show" );
		this.$element.trigger( c ), this.isShown || c.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop( function (){
			var c = a.support.transition && b.$element.hasClass( "fade" );
			b.$element.parent().length || b.$element.appendTo( document.body ), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass( "in" ).attr( "aria-hidden", !1 ), b.enforceFocus(), c ? b.$element.one( a.support.transition.end, function (){
				b.$element.focus().trigger( "shown" )
			} ) : b.$element.focus().trigger( "shown" )
		} ))
	}, hide                   : function ( b ){
		b && b.preventDefault(), b = a.Event( "hide" ), this.$element.trigger( b ), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a( document ).off( "focusin.modal" ), this.$element.removeClass( "in" ).attr( "aria-hidden", !0 ), a.support.transition && this.$element.hasClass( "fade" ) ? this.hideWithTransition() : this.hideModal())
	}, enforceFocus           : function (){
		var b = this;
		a( document ).on( "focusin.modal", function ( a ){
			b.$element[0] === a.target || b.$element.has( a.target ).length || b.$element.focus()
		} )
	}, escape                 : function (){
		var a = this;
		this.isShown && this.options.keyboard ? this.$element.on( "keyup.dismiss.modal", function ( b ){
			27 == b.which && a.hide()
		} ) : this.isShown || this.$element.off( "keyup.dismiss.modal" )
	}, hideWithTransition     : function (){
		var b = this, c = setTimeout( function (){
			b.$element.off( a.support.transition.end ), b.hideModal()
		}, 500 );
		this.$element.one( a.support.transition.end, function (){
			clearTimeout( c ), b.hideModal()
		} )
	}, hideModal              : function (){
		var a = this;
		this.$element.hide(), this.backdrop( function (){
			a.removeBackdrop(), a.$element.trigger( "hidden" )
		} )
	}, removeBackdrop         : function (){
		this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
	}, backdrop               : function ( b ){
		var c = this.$element.hasClass( "fade" ) ? "fade" : "";
		if ( this.isShown && this.options.backdrop ) {
			var d = a.support.transition && c;
			if ( this.$backdrop = a( '<div class="modal-backdrop ' + c + '" />' ).appendTo( document.body ), this.$backdrop.click( "static" == this.options.backdrop ? a.proxy( this.$element[0].focus, this.$element[0] ) : a.proxy( this.hide, this ) ), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass( "in" ), !b )return;
			d ? this.$backdrop.one( a.support.transition.end, b ) : b()
		} else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass( "in" ), a.support.transition && this.$element.hasClass( "fade" ) ? this.$backdrop.one( a.support.transition.end, b ) : b()) : b && b()
	}};
	var c = a.fn.modal;
	a.fn.modal = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "modal" ), f = a.extend( {}, a.fn.modal.defaults, d.data(), "object" == typeof c && c );
			e || d.data( "modal", e = new b( this, f ) ), "string" == typeof c ? e[c]() : f.show && e.show()
		} )
	}, a.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function (){
		return a.fn.modal = c, this
	}, a( document ).on( "click.modal.data-api", '[data-toggle="modal"]', function ( b ){
		var c = a( this ), d = c.attr( "href" ), e = a( c.attr( "data-target" ) || d && d.replace( /.*(?=#[^\s]+$)/, "" ) ), f = e.data( "modal" ) ? "toggle" : a.extend( {remote: !/#/.test( d ) && d}, e.data(), c.data() );
		b.preventDefault(), e.modal( f ).one( "hide", function (){
			c.focus()
		} )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( a, b ){
		this.init( "tooltip", a, b )
	};
	b.prototype = {constructor: b, init: function ( b, c, d ){
		var e, f, g, h, i;
		for ( this.type = b, this.$element = a( c ), this.options = this.getOptions( d ), this.enabled = !0, g = this.options.trigger.split( " " ), i = g.length; i--; )h = g[i], "click" == h ? this.$element.on( "click." + this.type, this.options.selector, a.proxy( this.toggle, this ) ) : "manual" != h && (e = "hover" == h ? "mouseenter" : "focus", f = "hover" == h ? "mouseleave" : "blur", this.$element.on( e + "." + this.type, this.options.selector, a.proxy( this.enter, this ) ), this.$element.on( f + "." + this.type, this.options.selector, a.proxy( this.leave, this ) ));
		this.options.selector ? this._options = a.extend( {}, this.options, {trigger: "manual", selector: ""} ) : this.fixTitle()
	}, getOptions             : function ( b ){
		return b = a.extend( {}, a.fn[this.type].defaults, this.$element.data(), b ), b.delay && "number" == typeof b.delay && (b.delay = {show: b.delay, hide: b.delay}), b
	}, enter                  : function ( b ){
		var c, d = a.fn[this.type].defaults, e = {};
		return this._options && a.each( this._options, function ( a, b ){
			d[a] != b && (e[a] = b)
		}, this ), c = a( b.currentTarget )[this.type]( e ).data( this.type ), c.options.delay && c.options.delay.show ? (clearTimeout( this.timeout ), c.hoverState = "in", this.timeout = setTimeout( function (){
			"in" == c.hoverState && c.show()
		}, c.options.delay.show ), void 0) : c.show()
	}, leave                  : function ( b ){
		var c = a( b.currentTarget )[this.type]( this._options ).data( this.type );
		return this.timeout && clearTimeout( this.timeout ), c.options.delay && c.options.delay.hide ? (c.hoverState = "out", this.timeout = setTimeout( function (){
			"out" == c.hoverState && c.hide()
		}, c.options.delay.hide ), void 0) : c.hide()
	}, show                   : function (){
		var b, c, d, e, f, g, h = a.Event( "show" );
		if ( this.hasContent() && this.enabled ) {
			if ( this.$element.trigger( h ), h.isDefaultPrevented() )return;
			switch ( b = this.tip(), this.setContent(), this.options.animation && b.addClass( "fade" ), f = "function" == typeof this.options.placement ? this.options.placement.call( this, b[0], this.$element[0] ) : this.options.placement, b.detach().css( {top: 0, left: 0, display: "block"} ), this.options.container ? b.appendTo( this.options.container ) : b.insertAfter( this.$element ), c = this.getPosition(), d = b[0].offsetWidth, e = b[0].offsetHeight, f ) {
				case"bottom":
					g = {top: c.top + c.height, left: c.left + c.width / 2 - d / 2};
					break;
				case"top":
					g = {top: c.top - e, left: c.left + c.width / 2 - d / 2};
					break;
				case"left":
					g = {top: c.top + c.height / 2 - e / 2, left: c.left - d};
					break;
				case"right":
					g = {top: c.top + c.height / 2 - e / 2, left: c.left + c.width}
			}
			this.applyPlacement( g, f ), this.$element.trigger( "shown" )
		}
	}, applyPlacement         : function ( a, b ){
		var c, d, e, f, g = this.tip(), h = g[0].offsetWidth, i = g[0].offsetHeight;
		g.offset( a ).addClass( b ).addClass( "in" ), c = g[0].offsetWidth, d = g[0].offsetHeight, "top" == b && d != i && (a.top = a.top + i - d, f = !0), "bottom" == b || "top" == b ? (e = 0, a.left < 0 && (e = -2 * a.left, a.left = 0, g.offset( a ), c = g[0].offsetWidth, d = g[0].offsetHeight), this.replaceArrow( e - h + c, c, "left" )) : this.replaceArrow( d - i, d, "top" ), f && g.offset( a )
	}, replaceArrow           : function ( a, b, c ){
		this.arrow().css( c, a ? 50 * (1 - a / b) + "%" : "" )
	}, setContent             : function (){
		var a = this.tip(), b = this.getTitle();
		a.find( ".tooltip-inner" )[this.options.html ? "html" : "text"]( b ), a.removeClass( "fade in top bottom left right" )
	}, hide                   : function (){
		function b(){
			var b = setTimeout( function (){
				c.off( a.support.transition.end ).detach()
			}, 500 );
			c.one( a.support.transition.end, function (){
				clearTimeout( b ), c.detach()
			} )
		}

		var c = this.tip(), d = a.Event( "hide" );
		return this.$element.trigger( d ), d.isDefaultPrevented() ? void 0 : (c.removeClass( "in" ), a.support.transition && this.$tip.hasClass( "fade" ) ? b() : c.detach(), this.$element.trigger( "hidden" ), this)
	}, fixTitle               : function (){
		var a = this.$element;
		(a.attr( "title" ) || "string" != typeof a.attr( "data-original-title" )) && a.attr( "data-original-title", a.attr( "title" ) || "" ).attr( "title", "" )
	}, hasContent             : function (){
		return this.getTitle()
	}, getPosition            : function (){
		var b = this.$element[0];
		return a.extend( {}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {width: b.offsetWidth, height: b.offsetHeight}, this.$element.offset() )
	}, getTitle               : function (){
		var a, b = this.$element, c = this.options;
		return a = b.attr( "data-original-title" ) || ("function" == typeof c.title ? c.title.call( b[0] ) : c.title)
	}, tip                    : function (){
		return this.$tip = this.$tip || a( this.options.template )
	}, arrow                  : function (){
		return this.$arrow = this.$arrow || this.tip().find( ".tooltip-arrow" )
	}, validate               : function (){
		this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
	}, enable                 : function (){
		this.enabled = !0
	}, disable                : function (){
		this.enabled = !1
	}, toggleEnabled          : function (){
		this.enabled = !this.enabled
	}, toggle                 : function ( b ){
		var c = b ? a( b.currentTarget )[this.type]( this._options ).data( this.type ) : this;
		c.tip().hasClass( "in" ) ? c.hide() : c.show()
	}, destroy                : function (){
		this.hide().$element.off( "." + this.type ).removeData( this.type )
	}};
	var c = a.fn.tooltip;
	a.fn.tooltip = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "tooltip" ), f = "object" == typeof c && c;
			e || d.data( "tooltip", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1}, a.fn.tooltip.noConflict = function (){
		return a.fn.tooltip = c, this
	}
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( a, b ){
		this.init( "popover", a, b )
	};
	b.prototype = a.extend( {}, a.fn.tooltip.Constructor.prototype, {constructor: b, setContent: function (){
		var a = this.tip(), b = this.getTitle(), c = this.getContent();
		a.find( ".popover-title" )[this.options.html ? "html" : "text"]( b ), a.find( ".popover-content" )[this.options.html ? "html" : "text"]( c ), a.removeClass( "fade top bottom left right in" )
	}, hasContent                                                               : function (){
		return this.getTitle() || this.getContent()
	}, getContent                                                               : function (){
		var a, b = this.$element, c = this.options;
		return a = ("function" == typeof c.content ? c.content.call( b[0] ) : c.content) || b.attr( "data-content" )
	}, tip                                                                      : function (){
		return this.$tip || (this.$tip = a( this.options.template )), this.$tip
	}, destroy                                                                  : function (){
		this.hide().$element.off( "." + this.type ).removeData( this.type )
	}} );
	var c = a.fn.popover;
	a.fn.popover = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "popover" ), f = "object" == typeof c && c;
			e || d.data( "popover", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend( {}, a.fn.tooltip.defaults, {placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'} ), a.fn.popover.noConflict = function (){
		return a.fn.popover = c, this
	}
}( window.jQuery ), !function ( a ){
	"use strict";
	function b( b, c ){
		var d, e = a.proxy( this.process, this ), f = a( b ).is( "body" ) ? a( window ) : a( b );
		this.options = a.extend( {}, a.fn.scrollspy.defaults, c ), this.$scrollElement = f.on( "scroll.scroll-spy.data-api", e ), this.selector = (this.options.target || (d = a( b ).attr( "href" )) && d.replace( /.*(?=#[^\s]+$)/, "" ) || "") + " .nav li > a", this.$body = a( "body" ), this.refresh(), this.process()
	}

	b.prototype = {constructor: b, refresh: function (){
		var b, c = this;
		this.offsets = a( [] ), this.targets = a( [] ), b = this.$body.find( this.selector ).map(function (){
			var b = a( this ), d = b.data( "target" ) || b.attr( "href" ), e = /^#\w/.test( d ) && a( d );
			return e && e.length && [
				[e.position().top + (!a.isWindow( c.$scrollElement.get( 0 ) ) && c.$scrollElement.scrollTop()), d]
			] || null
		} ).sort(function ( a, b ){
			return a[0] - b[0]
		} ).each( function (){
			c.offsets.push( this[0] ), c.targets.push( this[1] )
		} )
	}, process                : function (){
		var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
		if ( b >= d )return g != (a = f.last()[0]) && this.activate( a );
		for ( a = e.length; a--; )g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate( f[a] )
	}, activate               : function ( b ){
		var c, d;
		this.activeTarget = b, a( this.selector ).parent( ".active" ).removeClass( "active" ), d = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', c = a( d ).parent( "li" ).addClass( "active" ), c.parent( ".dropdown-menu" ).length && (c = c.closest( "li.dropdown" ).addClass( "active" )), c.trigger( "activate" )
	}};
	var c = a.fn.scrollspy;
	a.fn.scrollspy = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "scrollspy" ), f = "object" == typeof c && c;
			e || d.data( "scrollspy", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.defaults = {offset: 10}, a.fn.scrollspy.noConflict = function (){
		return a.fn.scrollspy = c, this
	}, a( window ).on( "load", function (){
		a( '[data-spy="scroll"]' ).each( function (){
			var b = a( this );
			b.scrollspy( b.data() )
		} )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b ){
		this.element = a( b )
	};
	b.prototype = {constructor: b, show: function (){
		var b, c, d, e = this.element, f = e.closest( "ul:not(.dropdown-menu)" ), g = e.attr( "data-target" );
		g || (g = e.attr( "href" ), g = g && g.replace( /.*(?=#[^\s]*$)/, "" )), e.parent( "li" ).hasClass( "active" ) || (b = f.find( ".active:last a" )[0], d = a.Event( "show", {relatedTarget: b} ), e.trigger( d ), d.isDefaultPrevented() || (c = a( g ), this.activate( e.parent( "li" ), f ), this.activate( c, c.parent(), function (){
			e.trigger( {type: "shown", relatedTarget: b} )
		} )))
	}, activate               : function ( b, c, d ){
		function e(){
			f.removeClass( "active" ).find( "> .dropdown-menu > .active" ).removeClass( "active" ), b.addClass( "active" ), g ? (b[0].offsetWidth, b.addClass( "in" )) : b.removeClass( "fade" ), b.parent( ".dropdown-menu" ) && b.closest( "li.dropdown" ).addClass( "active" ), d && d()
		}

		var f = c.find( "> .active" ), g = d && a.support.transition && f.hasClass( "fade" );
		g ? f.one( a.support.transition.end, e ) : e(), f.removeClass( "in" )
	}};
	var c = a.fn.tab;
	a.fn.tab = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "tab" );
			e || d.data( "tab", e = new b( this ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function (){
		return a.fn.tab = c, this
	}, a( document ).on( "click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function ( b ){
		b.preventDefault(), a( this ).tab( "show" )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.$element = a( b ), this.options = a.extend( {}, a.fn.typeahead.defaults, c ), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = a( this.options.menu ), this.shown = !1, this.listen()
	};
	b.prototype = {constructor: b, select: function (){
		var a = this.$menu.find( ".active" ).attr( "data-value" );
		return this.$element.val( this.updater( a ) ).change(), this.hide()
	}, updater                : function ( a ){
		return a
	}, show                   : function (){
		var b = a.extend( {}, this.$element.position(), {height: this.$element[0].offsetHeight} );
		return this.$menu.insertAfter( this.$element ).css( {top: b.top + b.height, left: b.left} ).show(), this.shown = !0, this
	}, hide                   : function (){
		return this.$menu.hide(), this.shown = !1, this
	}, lookup                 : function (){
		var b;
		return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (b = a.isFunction( this.source ) ? this.source( this.query, a.proxy( this.process, this ) ) : this.source, b ? this.process( b ) : this)
	}, process                : function ( b ){
		var c = this;
		return b = a.grep( b, function ( a ){
			return c.matcher( a )
		} ), b = this.sorter( b ), b.length ? this.render( b.slice( 0, this.options.items ) ).show() : this.shown ? this.hide() : this
	}, matcher                : function ( a ){
		return~a.toLowerCase().indexOf( this.query.toLowerCase() )
	}, sorter                 : function ( a ){
		for ( var b, c = [], d = [], e = []; b = a.shift(); )b.toLowerCase().indexOf( this.query.toLowerCase() ) ? ~b.indexOf( this.query ) ? d.push( b ) : e.push( b ) : c.push( b );
		return c.concat( d, e )
	}, highlighter            : function ( a ){
		var b = this.query.replace( /[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&" );
		return a.replace( new RegExp( "(" + b + ")", "ig" ), function ( a, b ){
			return"<strong>" + b + "</strong>"
		} )
	}, render                 : function ( b ){
		var c = this;
		return b = a( b ).map( function ( b, d ){
			return b = a( c.options.item ).attr( "data-value", d ), b.find( "a" ).html( c.highlighter( d ) ), b[0]
		} ), b.first().addClass( "active" ), this.$menu.html( b ), this
	}, next                   : function (){
		var b = this.$menu.find( ".active" ).removeClass( "active" ), c = b.next();
		c.length || (c = a( this.$menu.find( "li" )[0] )), c.addClass( "active" )
	}, prev                   : function (){
		var a = this.$menu.find( ".active" ).removeClass( "active" ), b = a.prev();
		b.length || (b = this.$menu.find( "li" ).last()), b.addClass( "active" )
	}, listen                 : function (){
		this.$element.on( "focus", a.proxy( this.focus, this ) ).on( "blur", a.proxy( this.blur, this ) ).on( "keypress", a.proxy( this.keypress, this ) ).on( "keyup", a.proxy( this.keyup, this ) ), this.eventSupported( "keydown" ) && this.$element.on( "keydown", a.proxy( this.keydown, this ) ), this.$menu.on( "click", a.proxy( this.click, this ) ).on( "mouseenter", "li", a.proxy( this.mouseenter, this ) ).on( "mouseleave", "li", a.proxy( this.mouseleave, this ) )
	}, eventSupported         : function ( a ){
		var b = a in this.$element;
		return b || (this.$element.setAttribute( a, "return;" ), b = "function" == typeof this.$element[a]), b
	}, move                   : function ( a ){
		if ( this.shown ) {
			switch ( a.keyCode ) {
				case 9:
				case 13:
				case 27:
					a.preventDefault();
					break;
				case 38:
					a.preventDefault(), this.prev();
					break;
				case 40:
					a.preventDefault(), this.next()
			}
			a.stopPropagation()
		}
	}, keydown                : function ( b ){
		this.suppressKeyPressRepeat = ~a.inArray( b.keyCode, [40, 38, 9, 13, 27] ), this.move( b )
	}, keypress               : function ( a ){
		this.suppressKeyPressRepeat || this.move( a )
	}, keyup                  : function ( a ){
		switch ( a.keyCode ) {
			case 40:
			case 38:
			case 16:
			case 17:
			case 18:
				break;
			case 9:
			case 13:
				if ( !this.shown )return;
				this.select();
				break;
			case 27:
				if ( !this.shown )return;
				this.hide();
				break;
			default:
				this.lookup()
		}
		a.stopPropagation(), a.preventDefault()
	}, focus                  : function (){
		this.focused = !0
	}, blur                   : function (){
		this.focused = !1, !this.mousedover && this.shown && this.hide()
	}, click                  : function ( a ){
		a.stopPropagation(), a.preventDefault(), this.select(), this.$element.focus()
	}, mouseenter             : function ( b ){
		this.mousedover = !0, this.$menu.find( ".active" ).removeClass( "active" ), a( b.currentTarget ).addClass( "active" )
	}, mouseleave             : function (){
		this.mousedover = !1, !this.focused && this.shown && this.hide()
	}};
	var c = a.fn.typeahead;
	a.fn.typeahead = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "typeahead" ), f = "object" == typeof c && c;
			e || d.data( "typeahead", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.typeahead.defaults = {source: [], items: 8, menu: '<ul class="typeahead dropdown-menu"></ul>', item: '<li><a href="#"></a></li>', minLength: 1}, a.fn.typeahead.Constructor = b, a.fn.typeahead.noConflict = function (){
		return a.fn.typeahead = c, this
	}, a( document ).on( "focus.typeahead.data-api", '[data-provide="typeahead"]', function (){
		var b = a( this );
		b.data( "typeahead" ) || b.typeahead( b.data() )
	} )
}( window.jQuery ), !function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.options = a.extend( {}, a.fn.affix.defaults, c ), this.$window = a( window ).on( "scroll.affix.data-api", a.proxy( this.checkPosition, this ) ).on( "click.affix.data-api", a.proxy( function (){
			setTimeout( a.proxy( this.checkPosition, this ), 1 )
		}, this ) ), this.$element = a( b ), this.checkPosition()
	};
	b.prototype.checkPosition = function (){
		if ( this.$element.is( ":visible" ) ) {
			var b, c = a( document ).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.bottom, h = f.top, i = "affix affix-top affix-bottom";
			"object" != typeof f && (g = h = f), "function" == typeof h && (h = f.top()), "function" == typeof g && (g = f.bottom()), b = null != this.unpin && d + this.unpin <= e.top ? !1 : null != g && e.top + this.$element.height() >= c - g ? "bottom" : null != h && h >= d ? "top" : !1, this.affixed !== b && (this.affixed = b, this.unpin = "bottom" == b ? e.top - d : null, this.$element.removeClass( i ).addClass( "affix" + (b ? "-" + b : "") ))
		}
	};
	var c = a.fn.affix;
	a.fn.affix = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "affix" ), f = "object" == typeof c && c;
			e || d.data( "affix", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.affix.Constructor = b, a.fn.affix.defaults = {offset: 0}, a.fn.affix.noConflict = function (){
		return a.fn.affix = c, this
	}, a( window ).on( "load", function (){
		a( '[data-spy="affix"]' ).each( function (){
			var b = a( this ), c = b.data();
			c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix( c )
		} )
	} )
}( window.jQuery ), +function ( a ){
	"use strict";
	var b = '[data-dismiss="alert"]', c = function ( c ){
		a( c ).on( "click", b, this.close )
	};
	c.prototype.close = function ( b ){
		function c(){
			f.trigger( "closed.bs.alert" ).remove()
		}

		var d = a( this ), e = d.attr( "data-target" );
		e || (e = d.attr( "href" ), e = e && e.replace( /.*(?=#[^\s]*$)/, "" ));
		var f = a( e );
		b && b.preventDefault(), f.length || (f = d.hasClass( "alert" ) ? d : d.parent()), f.trigger( b = a.Event( "close.bs.alert" ) ), b.isDefaultPrevented() || (f.removeClass( "in" ), a.support.transition && f.hasClass( "fade" ) ? f.one( a.support.transition.end, c ).emulateTransitionEnd( 150 ) : c())
	};
	var d = a.fn.alert;
	a.fn.alert = function ( b ){
		return this.each( function (){
			var d = a( this ), e = d.data( "bs.alert" );
			e || d.data( "bs.alert", e = new c( this ) ), "string" == typeof b && e[b].call( d )
		} )
	}, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function (){
		return a.fn.alert = d, this
	}, a( document ).on( "click.bs.alert.data-api", b, c.prototype.close )
}( window.jQuery ), +function ( a ){
	"use strict";
	var b = function ( c, d ){
		this.$element = a( c ), this.options = a.extend( {}, b.DEFAULTS, d )
	};
	b.DEFAULTS = {loadingText: "loading..."}, b.prototype.setState = function ( a ){
		var b = "disabled", c = this.$element, d = c.is( "input" ) ? "val" : "html", e = c.data();
		a += "Text", e.resetText || c.data( "resetText", c[d]() ), c[d]( e[a] || this.options[a] ), setTimeout( function (){
			"loadingText" == a ? c.addClass( b ).attr( b, b ) : c.removeClass( b ).removeAttr( b )
		}, 0 )
	}, b.prototype.toggle = function (){
		var a = this.$element.closest( '[data-toggle="buttons"]' );
		if ( a.length ) {
			var b = this.$element.find( "input" ).prop( "checked", !this.$element.hasClass( "active" ) ).trigger( "change" );
			"radio" === b.prop( "type" ) && a.find( ".active" ).removeClass( "active" )
		}
		this.$element.toggleClass( "active" )
	};
	var c = a.fn.button;
	a.fn.button = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "bs.button" ), f = "object" == typeof c && c;
			e || d.data( "bs.button", e = new b( this, f ) ), "toggle" == c ? e.toggle() : c && e.setState( c )
		} )
	}, a.fn.button.Constructor = b, a.fn.button.noConflict = function (){
		return a.fn.button = c, this
	}, a( document ).on( "click.bs.button.data-api", "[data-toggle^=button]", function ( b ){
		var c = a( b.target );
		c.hasClass( "btn" ) || (c = c.closest( ".btn" )), c.button( "toggle" ), b.preventDefault()
	} )
}( window.jQuery ), +function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.$element = a( b ), this.$indicators = this.$element.find( ".carousel-indicators" ), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on( "mouseenter", a.proxy( this.pause, this ) ).on( "mouseleave", a.proxy( this.cycle, this ) )
	};
	b.DEFAULTS = {interval: 5e3, pause: "hover", wrap: !0}, b.prototype.cycle = function ( b ){
		return b || (this.paused = !1), this.interval && clearInterval( this.interval ), this.options.interval && !this.paused && (this.interval = setInterval( a.proxy( this.next, this ), this.options.interval )), this
	}, b.prototype.getActiveIndex = function (){
		return this.$active = this.$element.find( ".item.active" ), this.$items = this.$active.parent().children(), this.$items.index( this.$active )
	}, b.prototype.to = function ( b ){
		var c = this, d = this.getActiveIndex();
		if ( !(b > this.$items.length - 1 || 0 > b) )return this.sliding ? this.$element.one( "slid", function (){
			c.to( b )
		} ) : d == b ? this.pause().cycle() : this.slide( b > d ? "next" : "prev", a( this.$items[b] ) )
	}, b.prototype.pause = function ( b ){
		return b || (this.paused = !0), this.$element.find( ".next, .prev" ).length && a.support.transition.end && (this.$element.trigger( a.support.transition.end ), this.cycle( !0 )), this.interval = clearInterval( this.interval ), this
	}, b.prototype.next = function (){
		return this.sliding ? void 0 : this.slide( "next" )
	}, b.prototype.prev = function (){
		return this.sliding ? void 0 : this.slide( "prev" )
	}, b.prototype.slide = function ( b, c ){
		var d = this.$element.find( ".item.active" ), e = c || d[b](), f = this.interval, g = "next" == b ? "left" : "right", h = "next" == b ? "first" : "last", i = this;
		if ( !e.length ) {
			if ( !this.options.wrap )return;
			e = this.$element.find( ".item" )[h]()
		}
		this.sliding = !0, f && this.pause();
		var j = a.Event( "slide.bs.carousel", {relatedTarget: e[0], direction: g} );
		if ( !e.hasClass( "active" ) ) {
			if ( this.$indicators.length && (this.$indicators.find( ".active" ).removeClass( "active" ), this.$element.one( "slid", function (){
				var b = a( i.$indicators.children()[i.getActiveIndex()] );
				b && b.addClass( "active" )
			} )), a.support.transition && this.$element.hasClass( "slide" ) ) {
				if ( this.$element.trigger( j ), j.isDefaultPrevented() )return;
				e.addClass( b ), e[0].offsetWidth, d.addClass( g ), e.addClass( g ), d.one( a.support.transition.end,function (){
					e.removeClass( [b, g].join( " " ) ).addClass( "active" ), d.removeClass( ["active", g].join( " " ) ), i.sliding = !1, setTimeout( function (){
						i.$element.trigger( "slid" )
					}, 0 )
				} ).emulateTransitionEnd( 600 )
			} else {
				if ( this.$element.trigger( j ), j.isDefaultPrevented() )return;
				d.removeClass( "active" ), e.addClass( "active" ), this.sliding = !1, this.$element.trigger( "slid" )
			}
			return f && this.cycle(), this
		}
	};
	var c = a.fn.carousel;
	a.fn.carousel = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "bs.carousel" ), f = a.extend( {}, b.DEFAULTS, d.data(), "object" == typeof c && c ), g = "string" == typeof c ? c : f.slide;
			e || d.data( "bs.carousel", e = new b( this, f ) ), "number" == typeof c ? e.to( c ) : g ? e[g]() : f.interval && e.pause().cycle()
		} )
	}, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function (){
		return a.fn.carousel = c, this
	}, a( document ).on( "click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function ( b ){
		var c, d = a( this ), e = a( d.attr( "data-target" ) || (c = d.attr( "href" )) && c.replace( /.*(?=#[^\s]+$)/, "" ) ), f = a.extend( {}, e.data(), d.data() ), g = d.attr( "data-slide-to" );
		g && (f.interval = !1), e.carousel( f ), (g = d.attr( "data-slide-to" )) && e.data( "bs.carousel" ).to( g ), b.preventDefault()
	} ), a( window ).on( "load", function (){
		a( '[data-ride="carousel"]' ).each( function (){
			var b = a( this );
			b.carousel( b.data() )
		} )
	} )
}( window.jQuery ), +function ( a ){
	function b(){
		a( d ).remove(), a( e ).each( function ( b ){
			var d = c( a( this ) );
			d.hasClass( "open" ) && (d.trigger( b = a.Event( "hide.bs.dropdown" ) ), b.isDefaultPrevented() || d.removeClass( "open" ).trigger( "hidden.bs.dropdown" ))
		} )
	}

	function c( b ){
		var c = b.attr( "data-target" );
		c || (c = b.attr( "href" ), c = c && /#/.test( c ) && c.replace( /.*(?=#[^\s]*$)/, "" ));
		var d = c && a( c );
		return d && d.length ? d : b.parent()
	}

	var d = ".dropdown-backdrop", e = "[data-toggle=dropdown]", f = function ( b ){
		a( b ).on( "click.bs.dropdown", this.toggle )
	};
	f.prototype.toggle = function ( d ){
		var e = a( this );
		if ( !e.is( ".disabled, :disabled" ) ) {
			var f = c( e ), g = f.hasClass( "open" );
			if ( b(), !g ) {
				if ( "ontouchstart"in document.documentElement && !f.closest( ".navbar-nav" ).length && a( '<div class="dropdown-backdrop"/>' ).insertAfter( a( this ) ).on( "click", b ), f.trigger( d = a.Event( "show.bs.dropdown" ) ), d.isDefaultPrevented() )return;
				f.toggleClass( "open" ).trigger( "shown.bs.dropdown" ), e.focus()
			}
			return!1
		}
	}, f.prototype.keydown = function ( b ){
		if ( /(38|40|27)/.test( b.keyCode ) ) {
			var d = a( this );
			if ( b.preventDefault(), b.stopPropagation(), !d.is( ".disabled, :disabled" ) ) {
				var f = c( d ), g = f.hasClass( "open" );
				if ( !g || g && 27 == b.keyCode )return 27 == b.which && f.find( e ).focus(), d.click();
				var h = a( "[role=menu] li:not(.divider):visible a", f );
				if ( h.length ) {
					var i = h.index( h.filter( ":focus" ) );
					38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < h.length - 1 && i++, ~i || (i = 0), h.eq( i ).focus()
				}
			}
		}
	};
	var g = a.fn.dropdown;
	a.fn.dropdown = function ( b ){
		return this.each( function (){
			var c = a( this ), d = c.data( "dropdown" );
			d || c.data( "dropdown", d = new f( this ) ), "string" == typeof b && d[b].call( c )
		} )
	}, a.fn.dropdown.Constructor = f, a.fn.dropdown.noConflict = function (){
		return a.fn.dropdown = g, this
	}, a( document ).on( "click.bs.dropdown.data-api", b ).on( "click.bs.dropdown.data-api", ".dropdown form",function ( a ){
		a.stopPropagation()
	} ).on( "click.bs.dropdown.data-api", e, f.prototype.toggle ).on( "keydown.bs.dropdown.data-api", e + ", [role=menu]", f.prototype.keydown )
}( window.jQuery ), +function ( a ){
	"use strict";
	var b = function ( b, c ){
		this.options = c, this.$element = a( b ), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load( this.options.remote )
	};
	b.DEFAULTS = {backdrop: !0, keyboard: !0, show: !0}, b.prototype.toggle = function ( a ){
		return this[this.isShown ? "hide" : "show"]( a )
	}, b.prototype.show = function ( b ){
		var c = this, d = a.Event( "show.bs.modal", {relatedTarget: b} );
		this.$element.trigger( d ), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on( "click.dismiss.modal", '[data-dismiss="modal"]', a.proxy( this.hide, this ) ), this.backdrop( function (){
			var d = a.support.transition && c.$element.hasClass( "fade" );
			c.$element.parent().length || c.$element.appendTo( document.body ), c.$element.show(), d && c.$element[0].offsetWidth, c.$element.addClass( "in" ).attr( "aria-hidden", !1 ), c.enforceFocus();
			var e = a.Event( "shown.bs.modal", {relatedTarget: b} );
			d ? c.$element.find( ".modal-dialog" ).one( a.support.transition.end,function (){
				c.$element.focus().trigger( e )
			} ).emulateTransitionEnd( 300 ) : c.$element.focus().trigger( e )
		} ))
	}, b.prototype.hide = function ( b ){
		b && b.preventDefault(), b = a.Event( "hide.bs.modal" ), this.$element.trigger( b ), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a( document ).off( "focusin.bs.modal" ), this.$element.removeClass( "in" ).attr( "aria-hidden", !0 ).off( "click.dismiss.modal" ), a.support.transition && this.$element.hasClass( "fade" ) ? this.$element.one( a.support.transition.end, a.proxy( this.hideModal, this ) ).emulateTransitionEnd( 300 ) : this.hideModal())
	}, b.prototype.enforceFocus = function (){
		a( document ).off( "focusin.bs.modal" ).on( "focusin.bs.modal", a.proxy( function ( a ){
			this.$element[0] !== a.target && !this.$element.has( a.target ).length && this.$element.focus()
		}, this ) )
	}, b.prototype.escape = function (){
		this.isShown && this.options.keyboard ? this.$element.on( "keyup.dismiss.bs.modal", a.proxy( function ( a ){
			27 == a.which && this.hide()
		}, this ) ) : this.isShown || this.$element.off( "keyup.dismiss.bs.modal" )
	}, b.prototype.hideModal = function (){
		var a = this;
		this.$element.hide(), this.backdrop( function (){
			a.removeBackdrop(), a.$element.trigger( "hidden.bs.modal" )
		} )
	}, b.prototype.removeBackdrop = function (){
		this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
	}, b.prototype.backdrop = function ( b ){
		var c = this.$element.hasClass( "fade" ) ? "fade" : "";
		if ( this.isShown && this.options.backdrop ) {
			var d = a.support.transition && c;
			if ( this.$backdrop = a( '<div class="modal-backdrop ' + c + '" />' ).appendTo( document.body ), this.$element.on( "click.dismiss.modal", a.proxy( function ( a ){
				a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call( this.$element[0] ) : this.hide.call( this ))
			}, this ) ), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass( "in" ), !b )return;
			d ? this.$backdrop.one( a.support.transition.end, b ).emulateTransitionEnd( 150 ) : b()
		} else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass( "in" ), a.support.transition && this.$element.hasClass( "fade" ) ? this.$backdrop.one( a.support.transition.end, b ).emulateTransitionEnd( 150 ) : b()) : b && b()
	};
	var c = a.fn.modal;
	a.fn.modal = function ( c, d ){
		return this.each( function (){
			var e = a( this ), f = e.data( "bs.modal" ), g = a.extend( {}, b.DEFAULTS, e.data(), "object" == typeof c && c );
			f || e.data( "bs.modal", f = new b( this, g ) ), "string" == typeof c ? f[c]( d ) : g.show && f.show( d )
		} )
	}, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function (){
		return a.fn.modal = c, this
	}, a( document ).on( "click.bs.modal.data-api", '[data-toggle="modal"]', function ( b ){
		var c = a( this ), d = c.attr( "href" ), e = a( c.attr( "data-target" ) || d && d.replace( /.*(?=#[^\s]+$)/, "" ) ), f = e.data( "modal" ) ? "toggle" : a.extend( {remote: !/#/.test( d ) && d}, e.data(), c.data() );
		b.preventDefault(), e.modal( f, this ).one( "hide", function (){
			c.is( ":visible" ) && c.focus()
		} )
	} ), a( document ).on( "show.bs.modal", ".modal",function (){
		a( document.body ).addClass( "modal-open" )
	} ).on( "hidden.bs.modal", ".modal", function (){
		a( document.body ).removeClass( "modal-open" )
	} )
}( window.jQuery ), +function ( a ){
	"use strict";
	var b = function ( a, b ){
		this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init( "tooltip", a, b )
	};
	b.DEFAULTS = {animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1}, b.prototype.init = function ( b, c, d ){
		this.enabled = !0, this.type = b, this.$element = a( c ), this.options = this.getOptions( d );
		for ( var e = this.options.trigger.split( " " ), f = e.length; f--; ) {
			var g = e[f];
			if ( "click" == g )this.$element.on( "click." + this.type, this.options.selector, a.proxy( this.toggle, this ) ); else if ( "manual" != g ) {
				var h = "hover" == g ? "mouseenter" : "focus", i = "hover" == g ? "mouseleave" : "blur";
				this.$element.on( h + "." + this.type, this.options.selector, a.proxy( this.enter, this ) ), this.$element.on( i + "." + this.type, this.options.selector, a.proxy( this.leave, this ) )
			}
		}
		this.options.selector ? this._options = a.extend( {}, this.options, {trigger: "manual", selector: ""} ) : this.fixTitle()
	}, b.prototype.getDefaults = function (){
		return b.DEFAULTS
	}, b.prototype.getOptions = function ( b ){
		return b = a.extend( {}, this.getDefaults(), this.$element.data(), b ), b.delay && "number" == typeof b.delay && (b.delay = {show: b.delay, hide: b.delay}), b
	}, b.prototype.getDelegateOptions = function (){
		var b = {}, c = this.getDefaults();
		return this._options && a.each( this._options, function ( a, d ){
			c[a] != d && (b[a] = d)
		} ), b
	}, b.prototype.enter = function ( b ){
		var c = b instanceof this.constructor ? b : a( b.currentTarget )[this.type]( this.getDelegateOptions() ).data( "bs." + this.type );
		return clearTimeout( c.timeout ), c.hoverState = "in", c.options.delay && c.options.delay.show ? (c.timeout = setTimeout( function (){
			"in" == c.hoverState && c.show()
		}, c.options.delay.show ), void 0) : c.show()
	}, b.prototype.leave = function ( b ){
		var c = b instanceof this.constructor ? b : a( b.currentTarget )[this.type]( this.getDelegateOptions() ).data( "bs." + this.type );
		return clearTimeout( c.timeout ), c.hoverState = "out", c.options.delay && c.options.delay.hide ? (c.timeout = setTimeout( function (){
			"out" == c.hoverState && c.hide()
		}, c.options.delay.hide ), void 0) : c.hide()
	}, b.prototype.show = function (){
		var b = a.Event( "show.bs." + this.type );
		if ( this.hasContent() && this.enabled ) {
			if ( this.$element.trigger( b ), b.isDefaultPrevented() )return;
			var c = this.tip();
			this.setContent(), this.options.animation && c.addClass( "fade" );
			var d = "function" == typeof this.options.placement ? this.options.placement.call( this, c[0], this.$element[0] ) : this.options.placement, e = /\s?auto?\s?/i, f = e.test( d );
			f && (d = d.replace( e, "" ) || "top"), c.detach().css( {top: 0, left: 0, display: "block"} ).addClass( d ), this.options.container ? c.appendTo( this.options.container ) : c.insertAfter( this.$element );
			var g = this.getPosition(), h = c[0].offsetWidth, i = c[0].offsetHeight;
			if ( f ) {
				var j = this.$element.parent(), k = d, l = document.documentElement.scrollTop || document.body.scrollTop, m = "body" == this.options.container ? window.innerWidth : j.outerWidth(), n = "body" == this.options.container ? window.innerHeight : j.outerHeight(), o = "body" == this.options.container ? 0 : j.offset().left;
				d = "bottom" == d && g.top + g.height + i - l > n ? "top" : "top" == d && g.top - l - i < 0 ? "bottom" : "right" == d && g.right + h > m ? "left" : "left" == d && g.left - h < o ? "right" : d, c.removeClass( k ).addClass( d )
			}
			var p = this.getCalculatedOffset( d, g, h, i );
			this.applyPlacement( p, d ), this.$element.trigger( "shown.bs." + this.type )
		}
	}, b.prototype.applyPlacement = function ( a, b ){
		var c, d = this.tip(), e = d[0].offsetWidth, f = d[0].offsetHeight, g = parseInt( d.css( "margin-top" ), 10 ), h = parseInt( d.css( "margin-left" ), 10 );
		isNaN( g ) && (g = 0), isNaN( h ) && (h = 0), a.top = a.top + g, a.left = a.left + h, d.offset( a ).addClass( "in" );
		var i = d[0].offsetWidth, j = d[0].offsetHeight;
		if ( "top" == b && j != f && (c = !0, a.top = a.top + f - j), /bottom|top/.test( b ) ) {
			var k = 0;
			a.left < 0 && (k = -2 * a.left, a.left = 0, d.offset( a ), i = d[0].offsetWidth, j = d[0].offsetHeight), this.replaceArrow( k - e + i, i, "left" )
		} else this.replaceArrow( j - f, j, "top" );
		c && d.offset( a )
	}, b.prototype.replaceArrow = function ( a, b, c ){
		this.arrow().css( c, a ? 50 * (1 - a / b) + "%" : "" )
	}, b.prototype.setContent = function (){
		var a = this.tip(), b = this.getTitle();
		a.find( ".tooltip-inner" )[this.options.html ? "html" : "text"]( b ), a.removeClass( "fade in top bottom left right" )
	}, b.prototype.hide = function (){
		function b(){
			"in" != c.hoverState && d.detach()
		}

		var c = this, d = this.tip(), e = a.Event( "hide.bs." + this.type );
		return this.$element.trigger( e ), e.isDefaultPrevented() ? void 0 : (d.removeClass( "in" ), a.support.transition && this.$tip.hasClass( "fade" ) ? d.one( a.support.transition.end, b ).emulateTransitionEnd( 150 ) : b(), this.$element.trigger( "hidden.bs." + this.type ), this)
	}, b.prototype.fixTitle = function (){
		var a = this.$element;
		(a.attr( "title" ) || "string" != typeof a.attr( "data-original-title" )) && a.attr( "data-original-title", a.attr( "title" ) || "" ).attr( "title", "" )
	}, b.prototype.hasContent = function (){
		return this.getTitle()
	}, b.prototype.getPosition = function (){
		var b = this.$element[0];
		return a.extend( {}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {width: b.offsetWidth, height: b.offsetHeight}, this.$element.offset() )
	}, b.prototype.getCalculatedOffset = function ( a, b, c, d ){
		return"bottom" == a ? {top: b.top + b.height, left: b.left + b.width / 2 - c / 2} : "top" == a ? {top: b.top - d, left: b.left + b.width / 2 - c / 2} : "left" == a ? {top: b.top + b.height / 2 - d / 2, left: b.left - c} : {top: b.top + b.height / 2 - d / 2, left: b.left + b.width}
	}, b.prototype.getTitle = function (){
		var a, b = this.$element, c = this.options;
		return a = b.attr( "data-original-title" ) || ("function" == typeof c.title ? c.title.call( b[0] ) : c.title)
	}, b.prototype.tip = function (){
		return this.$tip = this.$tip || a( this.options.template )
	}, b.prototype.arrow = function (){
		return this.$arrow = this.$arrow || this.tip().find( ".tooltip-arrow" )
	}, b.prototype.validate = function (){
		this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
	}, b.prototype.enable = function (){
		this.enabled = !0
	}, b.prototype.disable = function (){
		this.enabled = !1
	}, b.prototype.toggleEnabled = function (){
		this.enabled = !this.enabled
	}, b.prototype.toggle = function ( b ){
		var c = b ? a( b.currentTarget )[this.type]( this.getDelegateOptions() ).data( "bs." + this.type ) : this;
		c.tip().hasClass( "in" ) ? c.leave( c ) : c.enter( c )
	}, b.prototype.destroy = function (){
		this.hide().$element.off( "." + this.type ).removeData( "bs." + this.type )
	};
	var c = a.fn.tooltip;
	a.fn.tooltip = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "bs.tooltip" ), f = "object" == typeof c && c;
			e || d.data( "bs.tooltip", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function (){
		return a.fn.tooltip = c, this
	}
}( window.jQuery ), +function ( a ){
	"use strict";
	var b = function ( a, b ){
		this.init( "popover", a, b )
	};
	if ( !a.fn.tooltip )throw new Error( "Popover requires tooltip.js" );
	b.DEFAULTS = a.extend( {}, a.fn.tooltip.Constructor.DEFAULTS, {placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'} ), b.prototype = a.extend( {}, a.fn.tooltip.Constructor.prototype ), b.prototype.constructor = b, b.prototype.getDefaults = function (){
		return b.DEFAULTS
	}, b.prototype.setContent = function (){
		var a = this.tip(), b = this.getTitle(), c = this.getContent();
		a.find( ".popover-title" )[this.options.html ? "html" : "text"]( b ), a.find( ".popover-content" )[this.options.html ? "html" : "text"]( c ), a.removeClass( "fade top bottom left right in" ), a.find( ".popover-title" ).html() || a.find( ".popover-title" ).hide()
	}, b.prototype.hasContent = function (){
		return this.getTitle() || this.getContent()
	}, b.prototype.getContent = function (){
		var a = this.$element, b = this.options;
		return a.attr( "data-content" ) || ("function" == typeof b.content ? b.content.call( a[0] ) : b.content)
	}, b.prototype.arrow = function (){
		return this.$arrow = this.$arrow || this.tip().find( ".arrow" )
	}, b.prototype.tip = function (){
		return this.$tip || (this.$tip = a( this.options.template )), this.$tip
	};
	var c = a.fn.popover;
	a.fn.popover = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "bs.popover" ), f = "object" == typeof c && c;
			e || d.data( "bs.popover", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function (){
		return a.fn.popover = c, this
	}
}( window.jQuery ), +function ( a ){
	"use strict";
	var b = function ( b ){
		this.element = a( b )
	};
	b.prototype.show = function (){
		var b = this.element, c = b.closest( "ul:not(.dropdown-menu)" ), d = b.attr( "data-target" );
		if ( d || (d = b.attr( "href" ), d = d && d.replace( /.*(?=#[^\s]*$)/, "" )), !b.parent( "li" ).hasClass( "active" ) ) {
			var e = c.find( ".active:last a" )[0], f = a.Event( "show.bs.tab", {relatedTarget: e} );
			if ( b.trigger( f ), !f.isDefaultPrevented() ) {
				var g = a( d );
				this.activate( b.parent( "li" ), c ), this.activate( g, g.parent(), function (){
					b.trigger( {type: "shown.bs.tab", relatedTarget: e} )
				} )
			}
		}
	}, b.prototype.activate = function ( b, c, d ){
		function e(){
			f.removeClass( "active" ).find( "> .dropdown-menu > .active" ).removeClass( "active" ), b.addClass( "active" ), g ? (b[0].offsetWidth, b.addClass( "in" )) : b.removeClass( "fade" ), b.parent( ".dropdown-menu" ) && b.closest( "li.dropdown" ).addClass( "active" ), d && d()
		}

		var f = c.find( "> .active" ), g = d && a.support.transition && f.hasClass( "fade" );
		g ? f.one( a.support.transition.end, e ).emulateTransitionEnd( 150 ) : e(), f.removeClass( "in" )
	};
	var c = a.fn.tab;
	a.fn.tab = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "bs.tab" );
			e || d.data( "bs.tab", e = new b( this ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function (){
		return a.fn.tab = c, this
	}, a( document ).on( "click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function ( b ){
		b.preventDefault(), a( this ).tab( "show" )
	} )
}( window.jQuery ), +function ( a ){
	"use strict";
	var b = function ( c, d ){
		this.options = a.extend( {}, b.DEFAULTS, d ), this.$window = a( window ).on( "scroll.bs.affix.data-api", a.proxy( this.checkPosition, this ) ).on( "click.bs.affix.data-api", a.proxy( this.checkPositionWithEventLoop, this ) ), this.$element = a( c ), this.affixed = this.unpin = null, this.checkPosition()
	};
	b.RESET = "affix affix-top affix-bottom", b.DEFAULTS = {offset: 0}, b.prototype.checkPositionWithEventLoop = function (){
		setTimeout( a.proxy( this.checkPosition, this ), 1 )
	}, b.prototype.checkPosition = function (){
		if ( this.$element.is( ":visible" ) ) {
			var c = a( document ).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.top, h = f.bottom;
			"object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top()), "function" == typeof h && (h = f.bottom());
			var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= c - h ? "bottom" : null != g && g >= d ? "top" : !1;
			this.affixed !== i && (this.unpin && this.$element.css( "top", "" ), this.affixed = i, this.unpin = "bottom" == i ? e.top - d : null, this.$element.removeClass( b.RESET ).addClass( "affix" + (i ? "-" + i : "") ), "bottom" == i && this.$element.offset( {top: document.body.offsetHeight - h - this.$element.height()} ))
		}
	};
	var c = a.fn.affix;
	a.fn.affix = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "bs.affix" ), f = "object" == typeof c && c;
			e || d.data( "bs.affix", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.affix.Constructor = b, a.fn.affix.noConflict = function (){
		return a.fn.affix = c, this
	}, a( window ).on( "load", function (){
		a( '[data-spy="affix"]' ).each( function (){
			var b = a( this ), c = b.data();
			c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix( c )
		} )
	} )
}( window.jQuery ), +function ( a ){
	"use strict";
	var b = function ( c, d ){
		this.$element = a( c ), this.options = a.extend( {}, b.DEFAULTS, d ), this.transitioning = null, this.options.parent && (this.$parent = a( this.options.parent )), this.options.toggle && this.toggle()
	};
	b.DEFAULTS = {toggle: !0}, b.prototype.dimension = function (){
		var a = this.$element.hasClass( "width" );
		return a ? "width" : "height"
	}, b.prototype.show = function (){
		if ( !this.transitioning && !this.$element.hasClass( "in" ) ) {
			var b = a.Event( "show.bs.collapse" );
			if ( this.$element.trigger( b ), !b.isDefaultPrevented() ) {
				var c = this.$parent && this.$parent.find( "> .panel > .in" );
				if ( c && c.length ) {
					var d = c.data( "bs.collapse" );
					if ( d && d.transitioning )return;
					c.collapse( "hide" ), d || c.data( "bs.collapse", null )
				}
				var e = this.dimension();
				this.$element.removeClass( "collapse" ).addClass( "collapsing" )[e]( 0 ), this.transitioning = 1;
				var f = function (){
					this.$element.removeClass( "collapsing" ).addClass( "in" )[e]( "auto" ), this.transitioning = 0, this.$element.trigger( "shown.bs.collapse" )
				};
				if ( !a.support.transition )return f.call( this );
				var g = a.camelCase( ["scroll", e].join( "-" ) );
				this.$element.one( a.support.transition.end, a.proxy( f, this ) ).emulateTransitionEnd( 350 )[e]( this.$element[0][g] )
			}
		}
	}, b.prototype.hide = function (){
		if ( !this.transitioning && this.$element.hasClass( "in" ) ) {
			var b = a.Event( "hide.bs.collapse" );
			if ( this.$element.trigger( b ), !b.isDefaultPrevented() ) {
				var c = this.dimension();
				this.$element[c]( this.$element[c]() )[0].offsetHeight, this.$element.addClass( "collapsing" ).removeClass( "collapse" ).removeClass( "in" ), this.transitioning = 1;
				var d = function (){
					this.transitioning = 0, this.$element.trigger( "hidden.bs.collapse" ).removeClass( "collapsing" ).addClass( "collapse" )
				};
				return a.support.transition ? (this.$element[c]( 0 ).one( a.support.transition.end, a.proxy( d, this ) ).emulateTransitionEnd( 350 ), void 0) : d.call( this )
			}
		}
	}, b.prototype.toggle = function (){
		this[this.$element.hasClass( "in" ) ? "hide" : "show"]()
	};
	var c = a.fn.collapse;
	a.fn.collapse = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "bs.collapse" ), f = a.extend( {}, b.DEFAULTS, d.data(), "object" == typeof c && c );
			e || d.data( "bs.collapse", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function (){
		return a.fn.collapse = c, this
	}, a( document ).on( "click.bs.collapse.data-api", "[data-toggle=collapse]", function ( b ){
		var c, d = a( this ), e = d.attr( "data-target" ) || b.preventDefault() || (c = d.attr( "href" )) && c.replace( /.*(?=#[^\s]+$)/, "" ), f = a( e ), g = f.data( "bs.collapse" ), h = g ? "toggle" : d.data(), i = d.attr( "data-parent" ), j = i && a( i );
		g && g.transitioning || (j && j.find( '[data-toggle=collapse][data-parent="' + i + '"]' ).not( d ).addClass( "collapsed" ), d[f.hasClass( "in" ) ? "addClass" : "removeClass"]( "collapsed" )), f.collapse( h )
	} )
}( window.jQuery ), +function ( a ){
	function b( c, d ){
		var e, f = a.proxy( this.process, this );
		this.$element = a( c ).is( "body" ) ? a( window ) : a( c ), this.$body = a( "body" ), this.$scrollElement = this.$element.on( "scroll.bs.scroll-spy.data-api", f ), this.options = a.extend( {}, b.DEFAULTS, d ), this.selector = (this.options.target || (e = a( c ).attr( "href" )) && e.replace( /.*(?=#[^\s]+$)/, "" ) || "") + " .nav li > a", this.offsets = a( [] ), this.targets = a( [] ), this.activeTarget = null, this.refresh(), this.process()
	}

	b.DEFAULTS = {offset: 10}, b.prototype.refresh = function (){
		var b = this.$element[0] == window ? "offset" : "position";
		this.offsets = a( [] ), this.targets = a( [] );
		var c = this;
		this.$body.find( this.selector ).map(function (){
			var d = a( this ), e = d.data( "target" ) || d.attr( "href" ), f = /^#\w/.test( e ) && a( e );
			return f && f.length && [
				[f[b]().top + (!a.isWindow( c.$scrollElement.get( 0 ) ) && c.$scrollElement.scrollTop()), e]
			] || null
		} ).sort(function ( a, b ){
			return a[0] - b[0]
		} ).each( function (){
			c.offsets.push( this[0] ), c.targets.push( this[1] )
		} )
	}, b.prototype.process = function (){
		var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
		if ( b >= d )return g != (a = f.last()[0]) && this.activate( a );
		for ( a = e.length; a--; )g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate( f[a] )
	}, b.prototype.activate = function ( b ){
		this.activeTarget = b, a( this.selector ).parents( ".active" ).removeClass( "active" );
		var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', d = a( c ).parents( "li" ).addClass( "active" );
		d.parent( ".dropdown-menu" ).length && (d = d.closest( "li.dropdown" ).addClass( "active" )), d.trigger( "activate" )
	};
	var c = a.fn.scrollspy;
	a.fn.scrollspy = function ( c ){
		return this.each( function (){
			var d = a( this ), e = d.data( "bs.scrollspy" ), f = "object" == typeof c && c;
			e || d.data( "bs.scrollspy", e = new b( this, f ) ), "string" == typeof c && e[c]()
		} )
	}, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function (){
		return a.fn.scrollspy = c, this
	}, a( window ).on( "load", function (){
		a( '[data-spy="scroll"]' ).each( function (){
			var b = a( this );
			b.scrollspy( b.data() )
		} )
	} )
}( window.jQuery ), +function ( a ){
	function b(){
		var a = document.createElement( "bootstrap" ), b = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"};
		for ( var c in b )if ( void 0 !== a.style[c] )return{end: b[c]}
	}

	a.fn.emulateTransitionEnd = function ( b ){
		var c = !1, d = this;
		a( this ).one( a.support.transition.end, function (){
			c = !0
		} );
		var e = function (){
			c || a( d ).trigger( a.support.transition.end )
		};
		return setTimeout( e, b ), this
	}, a( function (){
		a.support.transition = b()
	} )
}( window.jQuery ), function ( a, b ){
	function c(){
		var a = p.elements;
		return"string" == typeof a ? a.split( " " ) : a
	}

	function d( a ){
		var b = o[a[m]];
		return b || (b = {}, n++, a[m] = n, o[n] = b), b
	}

	function e( a, c, e ){
		return c || (c = b), i ? c.createElement( a ) : (e || (e = d( c )), c = e.cache[a] ? e.cache[a].cloneNode() : l.test( a ) ? (e.cache[a] = e.createElem( a )).cloneNode() : e.createElem( a ), c.canHaveChildren && !k.test( a ) ? e.frag.appendChild( c ) : c)
	}

	function f( a, b ){
		b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function ( c ){
			return p.shivMethods ? e( c, a, b ) : b.createElem( c )
		}, a.createDocumentFragment = Function( "h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + c().join().replace( /\w+/g, function ( a ){
			return b.createElem( a ), b.frag.createElement( a ), 'c("' + a + '")'
		} ) + ");return n}" )( p, b.frag )
	}

	function g( a ){
		a || (a = b);
		var c = d( a );
		if ( p.shivCSS && !h && !c.hasCSS ) {
			var e, g = a;
			e = g.createElement( "p" ), g = g.getElementsByTagName( "head" )[0] || g.documentElement, e.innerHTML = "x<style>article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}</style>", e = g.insertBefore( e.lastChild, g.firstChild ), c.hasCSS = !!e
		}
		return i || f( a, c ), a
	}

	var h, i, j = a.html5 || {}, k = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, l = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i, m = "_html5shiv", n = 0, o = {};
	!function (){
		try {
			var a = b.createElement( "a" );
			a.innerHTML = "<xyz></xyz>", h = "hidden"in a;
			var c;
			if ( !(c = 1 == a.childNodes.length) ) {
				b.createElement( "a" );
				var d = b.createDocumentFragment();
				c = "undefined" == typeof d.cloneNode || "undefined" == typeof d.createDocumentFragment || "undefined" == typeof d.createElement
			}
			i = c
		} catch ( e ) {
			i = h = !0
		}
	}();
	var p = {elements: j.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video", version: "3.6.2pre", shivCSS: !1 !== j.shivCSS, supportsUnknownElements: i, shivMethods: !1 !== j.shivMethods, type: "default", shivDocument: g, createElement: e, createDocumentFragment: function ( a, e ){
		if ( a || (a = b), i )return a.createDocumentFragment();
		for ( var e = e || d( a ), f = e.frag.cloneNode(), g = 0, h = c(), j = h.length; j > g; g++ )f.createElement( h[g] );
		return f
	}};
	a.html5 = p, g( b )
}( this, document ), $( function (){
	var a = ".png", b = $( "#main" ), c = b.find( "img" ), d = c.attr( "src" ), e = d.replace( a, "-w" + a );
	b.addClass( "active" ), c.attr( "src", e )
} );