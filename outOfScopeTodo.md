
This is a list of things that should be handled but I'm considering out of scope for a 1 day project:

-All concerns of malicious html/js.  As long as our server is protected, the customer is free to do malicious
things to their visitor.  They could already do such things via their own code.

-Route security - anyone w/ the URL will be able to fetch the dynamic JS file.  We should be validating that the request
originating from the expected site.