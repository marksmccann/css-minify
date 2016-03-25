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
    }

    /**
     * return the minify function
     */
    return function( styles, options ) {
        // set minifier settings
        var settings = extend( defaults, options || {} );

    }

})();