// asset/js/lib/modules
define(["dojo/_base/declare","./analytics/Omniture"], function(declare, Omniture){
    return declare(null, {
        version: "0.0.1",
        constructor: function(expID, label, variationFN, override) {

            /**
             * Resusable Content Experiment Function - with override
             *
             * @public
             * @param {string} expID GA Experiment ID from admin console
             * @param {string} valueToPassToOmniture value to assign to Omniture event (E.G. "collapseClick")
             * @param {function} Function to execute, function can accept an integer as the argument to active multiple variants
             * @param {boolean} true default: (false) Allows developer to bypass experiment code without modifying URL
             *
             * Override: add a parameter to the url e.g. cxExp=1 (1 being the variation number)
             */

            var variation = null, search = window.location.search;
            expID = expID || null;

            // Fail if ga is not available or override not applied
            if(ga === undefined) return false;

            // Check for programatic override or default to check url
            if(override && override != undefined) {
                variation = 1;
            } else if(/cxExp/g.test(search) && variation == null){
                if(override == undefined) {
                    override = search.substring(search.indexOf("cxExp")+6);
                    if(/[01]{1}/.test(override)) {
                        variation = override;
                    }
                } else {
                    variation = 1;
                }
            }

            // Fail is experiment is not set and override is not applied
            if(expID == null && variation == null) return false;

            dojo.io.script.get({
                url:"//www.google-analytics.com/cx/api.js",
                content: {
                    experiment: expID
                },
                load:function(){

                    if(!variation) {
                        cxApi.chooseVariation();
                        variation = cxApi.getChosenVariation();
                    }

                    if(variation  < 0) {
                        if(variation == -2) {
                            console.debug("Excluded from test");
                        } else {
                            console.debug("Test Inactive");
                        }
                        return;
                    }

                    variationFN(variation);

                    ga("send", "event", "experiment", label);

                },
                error: function(err) {
                    console.error(err);
                }
            });
        }
    })
});