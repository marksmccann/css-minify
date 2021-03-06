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
     * default settings for minifier
     */
    var defaults = {
        lastSemiColon: true,
        leadingZeros: true,
        zeroUnits: true,
        shortenHex: true
    }

    /**
     * return the minify function
     */
    return function( styles, options ) {
        // set minifier settings
        var settings = extend( defaults, options || {} );
        // minify the styles
        return styles
            // remove all comments
            .replace(/\/\*((?!\*\/)(.|\n))*\*\//g, '')
            // rules with nested styles
            .replace(/[^{}]*{([^{}]*{(\/\*((?!\*\/)(.|\n))*\*\/|[("'].*["')]|[^{}"'])*})*\s*}/g, function(query){
                return query
                    // query selector
                    .replace(/^[^{]*{/, function(selector){
                        return selector
                            // remove spaces around open bracket
                            .replace(/\s*{\s*$/,'{')
                            // remove an spaces inside parenthesis
                            .replace(/\s+\)/g, ')').replace(/\(\s+/g, '(')
                            // remove spaces around colons
                            .replace(/\s*:\s*/g, ':')
                            // remove spaces from start
                            .replace(/^\s*/,'');
                    })
                    // remove spaces around closing bracket
                    .replace(/\s*}\s*$/, '}');
            })
            // standard rules
            .replace(/[^{}]*{(\/\*((?!\*\/)(.|\n))*\*\/|[("'].*["')]|[^{}"'])*}/g, function(rule) {
                return rule
                    // the selector
                    .replace(/^[^{]*{/, function(selector){
                        return selector
                            // remove spaces around open bracket
                            .replace(/\s*{\s*$/,'{')
                            // remove spaces from start
                            .replace(/^\s*/,'')
                            // remove spaces around combinators
                            .replace(/\s*([>~+,])\s*/g,'$1')
                            // remove an spaces inside parenthesis
                            .replace(/\s+\)/g, ')').replace(/\(\s+/g, '(')
                            // reduce decendants to single space
                            .replace(/ *\n+ */g, ' ')
                            // reduce any multiple spaces to one
                            .replace(/\s{2,}/g, ' ');
                    })
                    // the contents
                    .replace(/{(\/\*((?!\*\/)(.|\n))*\*\/|[("'].*["')]|[^{}"'])*}\s*$/, function(contents){
                        return contents
                            // each declaration
                            .replace(/([\w\s-]*):(([^;'"(}])*(\(["']?[^'")]*['"]?\)|["'][^'"]*['"])?([^;}])*);?\s*/g, function(declaration, property, value){
                                return declaration
                                    // property
                                    .replace(property, function(prop){
                                        return prop
                                            // remove spaces from end
                                            .replace(/\s*$/,'')
                                            // remove spaces from start
                                            .replace(/^\s*/,'');
                                    })
                                    // value
                                    .replace(value, function(val){
                                        return val
                                            // remove spaces from end
                                            .replace(/\s*$/,'')
                                            // remove spaces from start
                                            .replace(/^\s*/,'')
                                            // remove spaces around certain characters
                                            .replace(/\s*([,])\s*/g, '$1')
                                            // shorten qualifying hexadecmials
                                            .replace(/(#([\w\d])\2([\w\d])\3([\w\d])\4)/g, (settings.shortenHex?'#$2$3$4':'$1') )
                                            // remove leading zero if setting set
                                            .replace( /0(\.\d+)/g, (settings.leadingZeros?'':'0')+'$1' )
                                            // remove any spaces inside parenthesis
                                            .replace(/\s+\)/g, ')').replace(/\(\s+/g, '(')
                                            // remove units on zeros if setting set
                                            .replace( /0(em|ex|%|px|cm|mm|in|pt|pc|ch|rem|vh|vw|vmin|vmax)/g, '0'+(settings.zeroUnits?'':'$1') );
                                    })
                                    // remove spaces from end
                                    .replace(/\s*$/,'')
                                    // remove spaces from start
                                    .replace(/^\s*/,'');
                            })
                            // replace any new lines with single space
                            .replace( / *\n+ */g, ' ')
                            // remove final semicolon if set
                            .replace( /;\s*}\s*$/g, (settings.lastSemiColon?'':';')+'}')
                    })
            })
            // remove any trailing spaces
            .trim();
    }

})();