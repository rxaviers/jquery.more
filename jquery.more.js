/*
 * jQuery.more: a jQuery plugin, version 0.1
 * @requires jQuery
 *
 * More is a jQuery plugin that makes paging or infinite scrolling easier.
 * 
 * Dual licensed under the MIT and GPL Version 2 licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 * Copyright (c) 2011 Rafael Xavier de Souza (http://rafael.xavier.blog.br)
 */
;(function( $, undefined ) {

  var defaults = {
    more_el: null,
    bind: "click.more",
    afterbind: null,
    trigger: {
      find: "find",
      more: "more"
    }
  };

  function More( element, options ) {
    this.element = $( element );
    this.options = options;
    this._create();
  };

  More.prototype = {
    _create: function() {
      if( !this.options.more_el ) {
        this.options.more_el = $( "<div></div>" )
          .addClass( "more-meristem" )
          .appendTo( this.element );
      }
      this._bind();
    },

    _run: function() {
      var self = this,
        cb = function() {
          self._more.apply( self, arguments );
        };
      this._unbind();
      this.element.triggerHandler( this.options.trigger.find, [ cb ] );
    },

    _more: function() {
      if( !this.element.triggerHandler( this.options.trigger.more, arguments ) ) {
        this.options.more_el.remove();
        return;
      }
      this._bind();
    },

    _bind: function() {
      var self = this;
      this.options.more_el.bind( this.options.bind, function() {
        self._run.call( self );
      });
      if( this.options.afterbind ) {
        this.options.afterbind.call( this.element[0] );
      }
    },

    _unbind: function() {
      this.options.more_el.unbind( this.options.bind );
    }
  };

  $.fn.more = function( options ) {
    options = $.extend( $.extend( true, {}, $.fn.more.defaults ), options);
    this.each( function() {
      new More( this, options );
    });
    return this;
  };

  $.fn.more.defaults = defaults;

})( jQuery );
