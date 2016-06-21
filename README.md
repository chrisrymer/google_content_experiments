# A few modules for dojo and other stuff

## cxApi helper
Abstract the cxApi to a simple helper function that can be required in to dojo build.

The aim is to enable easy usage of the cxApi mechanism for running A/B tests which are not reliant on split testing.

i.e. Page loads, deliver a differnt treatment to the visitor based upon variation returned from cxApi within the same page load. Send non tracking beacon back to Google to register experiment.


