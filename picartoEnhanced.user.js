// ==UserScript==
// @name				Picarto Enhanced
// @namespace			http://codingtoby.com/
// @version				0.1.0.0
// @description			Makes Picarto.tv better.
// @author				Toby
// @include				/((http)(s)?(\:\/\/)(www\.)?(picarto\.tv)(\/)?([\s\S]*))/
// @exclude				/((http)(s)?(\:\/\/)(www\.)?(picarto\.tv)(\/)?(site\/)([\s\S]*))/
// @require				https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js
// @grant				unsafeWindow
// ==/UserScript==

// SOMETHING = Site Name
// ABBR = Abbreviation


"use strict";

(function (w, $, jQuery)
{
	var pe =
		{
			status : {},
			css    : {},
			fn     : {},
			sel    : {}
		};

	pe.status.theatreMode = false;

	pe.css.normalize
				   = `.tusl-normalize{font-family:sans-serif;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}.tusl-normalize article,.tusl-normalize aside,.tusl-normalize details,.tusl-normalize figcaption,.tusl-normalize figure,.tusl-normalize footer,.tusl-normalize header,.tusl-normalize hgroup,.tusl-normalize main,.tusl-normalize menu,.tusl-normalize nav,.tusl-normalize section,.tusl-normalize summary{display:block}.tusl-normalize audio,.tusl-normalize canvas,.tusl-normalize progress,.tusl-normalize video{display:inline-block;vertical-align:baseline}.tusl-normalize audio:not([controls]){display:none;height:0}.tusl-normalize [hidden],.tusl-normalize template{display:none}.tusl-normalize a{background-color:transparent}.tusl-normalize a:active,.tusl-normalize a:hover{outline:0}.tusl-normalize abbr[title]{border-bottom:1px dotted}.tusl-normalize b,.tusl-normalize strong{font-weight:700}.tusl-normalize dfn{font-style:italic}.tusl-normalize h1{font-size:2em;margin:.67em 0}.tusl-normalize mark{background:#ff0;color:#000}.tusl-normalize small{font-size:80%}.tusl-normalize sub,.tusl-normalize sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}.tusl-normalize sup{top:-.5em}.tusl-normalize sub{bottom:-.25em}.tusl-normalize img{border:0}.tusl-normalize svg:not(:root){overflow:hidden}.tusl-normalize figure{margin:1em 40px}.tusl-normalize hr{box-sizing:content-box;height:0}.tusl-normalize pre{overflow:auto}.tusl-normalize code,.tusl-normalize kbd,.tusl-normalize pre,.tusl-normalize samp{font-family:monospace,monospace;font-size:1em}.tusl-normalize button,.tusl-normalize input,.tusl-normalize optgroup,.tusl-normalize select,.tusl-normalize textarea{color:inherit;font:inherit;margin:0}.tusl-normalize button{overflow:visible}.tusl-normalize button,.tusl-normalize select{text-transform:none}.tusl-normalize button,.tusl-normalize html input[type=button],.tusl-normalize input[type=reset],.tusl-normalize input[type=submit]{-webkit-appearance:button;cursor:pointer}.tusl-normalize button[disabled],.tusl-normalize html input[disabled]{cursor:default}.tusl-normalize button::-moz-focus-inner,.tusl-normalize input::-moz-focus-inner{border:0;padding:0}.tusl-normalize input{line-height:normal}.tusl-normalize input[type=checkbox],.tusl-normalize input[type=radio]{box-sizing:border-box;padding:0}.tusl-normalize input[type=number]::-webkit-inner-spin-button,.tusl-normalize input[type=number]::-webkit-outer-spin-button{height:auto}.tusl-normalize input[type=search]{-webkit-appearance:textfield;box-sizing:content-box}.tusl-normalize input[type=search]::-webkit-search-cancel-button,.tusl-normalize input[type=search]::-webkit-search-decoration{-webkit-appearance:none}.tusl-normalize fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}.tusl-normalize legend{border:0;padding:0}.tusl-normalize textarea{overflow:auto}.tusl-normalize optgroup{font-weight:700}.tusl-normalize table{border-collapse:collapse;border-spacing:0}.tusl-normalize td,.tusl-normalize th{padding:0}`;
	pe.css.webfont = `
	@font-face
	{
		font-family: 'picartoEnhanced';
		src: url(data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAANkAA8AAAAACBQAAAMHAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP0ZGVE0cGiAGYACCfggEEQgKghyCGgE2AiQDVAssAAQgBYNqB4FiP3dlYmYGG98GyK6wKcP1UEABmNhbLdfCKif8NBlBT/iH7fsOyfYkd2SZuRKuXEOoiCrJHZxr2UAHtA9+/dlX0SLahgPgr4N/cMgB8RlSq1qOcfv5IIPCBoMMJyAU+cSx9L9IwTZJo2qsbqB/0Md/jugVpU1gNxzNeQ5gm3i/dRMggJsNR+4AuP8zeS85AgKBaAAMhAhHWIlrwDS+ajc2ll1qHwYlohPzMdMNDZ2SglnRDPqjwcb/wOnFaUIgPBkBpiWKL3auBEfJSRZjQQglGHNRu5LpA9/kouQJGf0/Gu7e0gdkf/f/p7113rx/c+6voCeIBc4GYYIckKmKjI0WaPAvYqET3uYz2m0Vof8JAiACgFzAAxqAYeRkCyjEQICMEuEnZFkm9VNWht+aoHmyyPqLeMU13lK933dr7nSWp32Dtw6v3E0j5heybVhgxjFuizhPO+SwZKvbF22HHx2ctpF8+bL43N/AxIpbv7JOwDRXb3Z4NkMDA/Scx/XWKhID/54pBuAMSlH9Wdfia+kZx34ZwkxDwRlcAdi2s66jfkkg6TYBgs3awfwJQYe/XpIHfJ1cz+jh9NIqAxqbnN7/9pHhFDyu70QYX2gHAePoDgdYgJnRLcebYkSD9oL8rSlcA7WCMAr0YrH5YZJwARFkLCDvQbP3b5c/BxETWT6IRIjkBoEcEzwzEOUDbVFIr8om8mvSgHZIZCfal3KOo68SyVv0NYr5h76Op0zUDfxV+M7PTGJVy0JiXGwaOkqOFETYFLj4eNzxCenJKstoVkZFIxgm/o1PQ0tM9qYAKKGQ4u4CA8kdwAx8Cplny8yh/SczA/RQ8pITSYdcZwS0DkEn5hT0KmcB0Mk6gVJKWf9qaqmgylGWUFbEK2b/tpI5+PhUdNj0NPS0C8EfQk1P3L7BJ/ubFdS/IAJkyJSFKVuOXHnyka/85K8ABSpIwQpRqMIU7syYO1fRzvXZu8vmx1sISzx4SzFvn2IBVAIqBZWBykEVoEpQFagaVANsQZZ2AiuoNL8NY4xtWTvo8Bt9Pw==) format('woff2'),
			 url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAVMAA8AAAAACBQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABWAAAABsAAAAcciBERkdERUYAAAF0AAAAHQAAACAAQgAET1MvMgAAAZQAAABAAAAAYBvyFARjbWFwAAAB1AAAAGgAAAF+IAFlVGN2dCAAAAI8AAAABAAAAAQARAURZ2FzcAAAAkAAAAAIAAAACAAAABBnbHlmAAACSAAAAM8AAAEcbCwSUmhlYWQAAAMYAAAAKwAAADYNFOz5aGhlYQAAA0QAAAAcAAAAJA5MB5ZobXR4AAADYAAAADkAAABUN1YARGxvY2EAAAOcAAAAGQAAACwC2ANGbWF4cAAAA7gAAAAaAAAAIAAYAFVuYW1lAAAD1AAAAPoAAAHqA2tQYXBvc3QAAATQAAAAcQAAAOIKqgRXd2ViZgAABUQAAAAGAAAABqBaVst42mNgYGBkAIIztovOg+hLHwPmQumbAFI7CBgAeNpjYGRgYOADYgkGEGBiYARCESBmAfMYAAUmAEcAAAB42mNgZnrLOIGBlYGF1Yh1BgMDoxyEZr7GkMYkxIAKGAXQBBgcGBg/2LI3/G9gYGDzYmgAqUGSVWBgBADtOQkeeNpjYGBgZoBgGQZGBhCoAPIYwXwWhhggLcQgABRhAoopMCxQ4FLQV4hX/fPB9v9/sGqQGAOy2P8n/1MfsN1/dH/zLXH+60BdQgzogBFkHyMbEDNDBZiABBOGKqADhgpgJUsXAI31FsoARAURAAEAAf//AA942mNgYnBhYGBKYQ1lYGZgZ9DbyMigb7OJnYXhrdFGNtY7NpuYmYBMho3MIGFWkPAmdjbGPzabGEHixoKKgqqKgoouTAr/VBhn/MtgDf212oXlLAMDAyMDDDAxMFgyUcBnBvKZwfxJHAxsXgwqQMMFRdjZlJXUGUVBtKKSupqpoIm5mbGikbiYLCOjmTGQFuVg0BHgkxP5Z5SQ0PHnTkdSQkJSB7NKR0IC4zkROT4BHdY7v1UMRNjEGM/tQ0gmJSV07GE8JcYmZMAAAIZMMdkAeNpjYGRgYADiGULTdOL5bb4yyHMwgMCljwE3kWkOBjYvMMUE4gEAGnwJbwB42mNgZGBg8/rfwMDAwQACQJKRARWIAgA39QH3eNpjesPgwgAETKsYwIAFiplVGRjYvBA0kwQDA+MkIOaBYIaTQNoJSEdCaJAc8wsGBg6gEAAZcQbMAAAAeNpjYGDQYTABQhsGFwYfPDCEoQ8Ac/oGHwAAAHjaY2BkYGAQZVBlYGIAAQgJAXogAgAHSQBuAAB42oWPvUoDURBGz3WjmBAsLSxkKytZNsY/0huIkEbB1InGJBh2dd0FfQlLn8IHMfoEdj6FtV/uDgopEpZ7OTNz7swsUOeVAFep4tgF4zW2FJUciPaNK0ScG6+zzZPxhpwX4xqHvBm/y/k2nhHzY/zBptsz/qTuopK/AnZci3smXNMnIyfljISxokS5ITdc6B5RMPXGcnd5NVzodaUo41FvUjkhDf1tvKJH27u57JHixHfoKy77D3jW3ZGb0tWZuxE9VQfc/r0s53RtattXQw70zWuntDjiRHeDps/HomPu5A21Xa55haYW2vx/m0selJkon8ma/gJnoEjZAAB42n3IOQ7CQBAAwWkbbO6bf8yuWY7QAu1XAAkhEgJ+D9ZMTCcltRTyv60IBSU9KelTUTNgyIgxE6bMmLNgyYo1m+r6+LxuwYj1+3lX1WC22hl/ww1udBt35yZ37x7co3tyWzNmM5kpnzuzNpcv55Qp8wAAAAABVsugWQAA) format('woff');
		font-weight: normal;
		font-style: normal;
    }

    .pe_icon_theatreView:before
    {
    	font-family: 'picartoEnhanced' !important;
    	content: "\\f03d";
	}

	`;

	pe.status.timeout = "";

	pe.css.injectCSS = pe.css.normalize + pe.css.webfont;
	pe.css.injectCSS +=
		`
	.pe_hidden { display: none !important; }
	.pe_theatre_chat { top: 0 !important; width:20%; }
	.pe_theatre_columnpadding { margin:0 !important; max-width:100% !important; height:100% !important; min-height:100% !important;
	 							display: flex !important; flex-direction: column !important; align-items: stretch; background-color:#000000 !important; }
	.pe_theatre_scrollContent { height:100% !important; width:100%; background-color:#000000 !important; }
	.pe_theatre_scrollWrapper { position:absolute; left:0; top:0 !important; width:80%; background-color:#000000 !important; }
	.pe_theatre_player { width:100% !important; }
	.pe_theatre_playerHolder { height:100% !important; }
	.pe_theatre_gridcell { flex: 1; flex-shrink:1; }
	.pe_theatre_tse-content { height:100% !important; background-color:#000000 !important;  }
	.pe_theatre_resizeable { height:100% !important; }
	.pe_noselect { outline: none !important; -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; }
		`;


	pe.fn.checkState = function ()
	{
		pe.status.timeout = setTimeout( function ()
		{
			if ( (unsafeWindow.jwplayer( "player_holder" ).getState() != "playing") && (unsafeWindow.jwplayer( "player_holder" ).getState() != "buffering") )
			{
				console.log( "Recheck... (" + unsafeWindow.jwplayer( "player_holder" ).getState() + ")" );
				pe.fn.checkState();
			}
			else
			{
				console.log( unsafeWindow.jwplayer( "player_holder" ).getState() );
				clearTimeout( pe.status.timeout );

				$( ".jw-icon-fullscreen" ).before( `<div id="pe_theatre_button" class="jw-icon jw-icon-inline jw-button-color jw-reset pe_icon_theatreView"></div>` );

				// Hide Picarto Logo
				//$(".jw-logo").addClass("pe_hidden");

				$( "#pe_theatre_button" ).click( function ()
				{
					if ( !pe.status.theatreMode )
					{
						pe.fn.activateTheatreMode();
					}
					else
					{
						pe.fn.deactivateTheatreMode();
					}
				} );
			}
		}, 1000 );
	};


	$( document ).ready( function ()
	{
		$( "head" ).append( "<style>" + pe.css.injectCSS + "</style>" );
		$( ".chat_hide_banner" ).click( function ()
		{
			$( "#channel_chatbanner" ).addClass( "pe_hidden" );
		} );
		pe.sel.player          = $( "#player_window" );
		pe.sel.chatContainer   = $( "#resizeable2" );
		pe.sel.chat            = $( "#channel_chat" );
		pe.sel.playerHolder    = $( "#player_holder" );
		pe.sel.theatreViewIcon
							   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuOWwzfk4AAADySURBVDhPrZJLCsIwFEU7cSHOdA1OHNjFCA4Eh467C50ouAhBBHEsrkBch5/Ge0JSrBYTbC4c8m5oTj+aGWOSkh0TB6spy3Ih5qyuM8NOXN46M3u2N521wpmSK6x0ZrJSzoqrOTN7ruZNZ/0T3sWtJfdKqAyF/agtwGEH8iXUHaei/7n/g6BwLx5iEykOC7XaRIrjhT7aeyLW2BO168VfQn5N/ndd1dr1Il4YEHnCwkiRJygcR4o8NeFIdFqCoxImixXq1SZiwOo6MyzF6a0zs2d701krXCuFwkpnJgflqrhaMLPnatF0lo+/TQlPmBCTvQDnaRrE7tA43gAAAABJRU5ErkJggg==";

		$( ".columnpadding" )
			.wrapInner( '<div id="pe_theatre_playerContainerCell" class="pe_theatre_gridcell"></div>' )
			.prepend( '<div id="pe_spacer1" class="pe_theatre_gridcell">&nbsp;</div>' )
			.append( '<div id="pe_spacer2" class="pe_theatre_gridcell">&nbsp;</div>' );

		pe.fn.checkState();
	} );

	pe.fn.activateTheatreMode = function ()
	{
		// Hide non-player and non-chat elements.
		$( "#menu_holder" ).addClass( "pe_hidden" );
		$( ".streamer_infos" ).addClass( "pe_hidden" );
		$( ".streamer_extras" ).addClass( "pe_hidden" );
		$( ".specialbanner" ).addClass( "pe_hidden" );
		$( ".streamer_desc" ).addClass( "pe_hidden" );
		$( ".streamer_prembanner" ).addClass( "pe_hidden" );


		// Add classes to override basic styles
		$( ".tse-scrollable.scrollwrapper" ).addClass( "pe_theatre_scrollWrapper" );
		$( ".tse-scroll-content" ).addClass( "pe_theatre_scrollContent" );
		$( ".tse-content" ).addClass( "pe_theatre_tse-content" );
		$( "#resizeable" ).addClass( "pe_theatre_resizeable" );
		$( pe.sel.chatContainer ).addClass( "pe_theatre_chat" );
		$( pe.sel.player ).addClass( "pe_theatre_player" );
		$( pe.sel.playerHolder ).addClass( "pe_theatre_playerHolder" );
		$( ".columnpadding" ).addClass( "pe_theatre_columnpadding" );

		$( "#pe_theatre_playerContainerCell" ).addClass( "pe_theatre_gridcell" );
		$( "#pe_spacer1" ).addClass( "pe_theatre_gridcell" );
		$( "#pe_spacer2" ).addClass( "pe_theatre_gridcell" );

		// Remove special classes from chat.
		$( pe.sel.chatContainer ).find( ".pe_theatre_scrollContent" ).removeClass( "pe_theatre_scrollContent" );
		$( pe.sel.chatContainer ).find( ".pe_theatre_tse-content" ).removeClass( "pe_theatre_tse-content" );

		// Change theatre mode status to true.
		pe.status.theatreMode = true;
	};

	pe.fn.deactivateTheatreMode = function ()
	{
		$( ".pe_theatre_scrollWrapper" ).removeClass( "pe_theatre_scrollWrapper" );
		$( ".pe_theatre_scrollContent" ).removeClass( "pe_theatre_scrollContent" );
		$( ".pe_theatre_tse-content" ).removeClass( "pe_theatre_tse-content" );
		$( ".pe_theatre_resizeable" ).removeClass( "pe_theatre_resizeable" );
		$( ".pe_theatre_chat" ).removeClass( "pe_theatre_chat" );
		$( ".pe_theatre_player" ).removeClass( "pe_theatre_player" );
		$( ".pe_theatre_playerHolder" ).removeClass( "pe_theatre_playerHolder" );
		$( ".pe_theatre_columnpadding" ).removeClass( "pe_theatre_columnpadding" );
		$( ".pe_theatre_gridcell" ).removeClass( "pe_theatre_gridcell" );
		$( ".pe_hidden" ).each( function ()
		{
			if ( ($( this ).attr( "id" ) != "channel_chatbanner") && ( !$( this ).hasClass( "jw-logo" ) ) )
			{
				$( this ).removeClass( "pe_hidden" );
			}
		} );

		// Change theatre mode status to false.
		pe.status.theatreMode = false;
	};

})( window, this.jQuery, this.jQuery );