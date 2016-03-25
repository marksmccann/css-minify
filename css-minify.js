/**
 * minifies css
 * @author: Mark McCann <www.markmccann.me>
 * @license: MIT
 */

var cssMinify = (function(){

    /**
     * extends object
     */
    var extend = function () {
        var a = arguments;
        for( var i = 1; i < a.length; i++ )
            for( var key in a[i] )
                if(a[i].hasOwnProperty(key))
                    a[0][key] = a[i][key];
        return a[0];
    }

    /**
     * default settings for alphabetizer
     */
    var defaults = {
        lastSemicolon: false,
        comments: true,
        leadingZeros: true,
        zeroUnits: true
    }

    /**
     * return the minify function
     */
    return function( styles, options ) {
        // set minifier settings
        var settings = extend( defaults, options || {} );
        // remove comments if setting is set
        if( settings.comments ) styles = styles.replace(/\/\*((?!\*\/)(.|\n))*\*\//g, '');
        // else remove space before and after comment
        else styles = styles.replace( /(\*\/)\s*/g, '$1' );
        // remove all unnecessary spaces
        styles = styles.replace(/\s*([:;,{}])\s*/g,'$1');
        // remove final semi-colon if setting set
        if( settings.lastSemicolon ) styles = styles.replace( /;((?:\/\*((?!\*\/)(.|\n))*\*\/)*})/g, '$1' );
        // remove leading zero if setting set
        if( settings.leadingZeros ) styles = styles.replace( /0(\.\d+)/g, '$1' );
        // remove leading zero if setting set
        if( settings.zeroUnits ) styles = styles.replace( /0(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/g, '0' );
        // return the minified css
        return styles.trim();
    }

})();