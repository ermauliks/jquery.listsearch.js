(function ( $ ) {

    function fuzzy(s, t) {
        var hay = t.toLowerCase(),
        	i = 0,
        	n = 0,
        	l;

        s = s.toLowerCase();
        for (; l = s[i++] ;) {
        	if ((n = hay.indexOf(l, n)) === -1){
        		return false;
        	}
        }
        return true;
    };


    $.fn.listsearch = function (options) {

        var settings = $.extend({
            elements: '',
            highlight: false,
            highlightClass : ''
        }, options); 

        var targetElements = (settings.elements);
        
        this.keyup(function() {

           	q = jQuery(this).val();

            targetElements.each(function(){
                $(this).html($(this).text());
            });

            if (q && q.length) {

            	var regex = new RegExp(q, "gi");

            	targetElements.each(function() {

                    if (jQuery(this).is(':contains("'+q+'")')  ||  fuzzy(q, jQuery(this).text()) ) {

                        if(settings.highlight){

                            targetElements.each(function () {

                                jQuery(this).contents()
                                    .filter(function() {

                                    	return this.nodeType == 3 && regex.test(this.nodeValue);

                                    })
                                    .replaceWith(function() {

                                        return (this.nodeValue || "").replace(regex, function(match) {
                                            return "<span class=\"" + settings.highlightClass + "\">" + match + "</span>";
                                        });

                                    });

                            });

                        }

                        jQuery(this).stop().fadeTo('slow', 1);

                    } else {

                        jQuery(this).stop().fadeTo('slow', 0.2);

                    }

                });

            } else {

                targetElements.stop().fadeTo('slow', 1, function() {

                    targetElements.each(function(){
                        var temp = jQuery(this);
                        temp.html(temp.text());
                    });

                });

            }
            
        });
		
	};

}( jQuery ));