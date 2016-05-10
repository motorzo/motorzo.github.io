/*
 Copyright (c) 2013
 Willmer, Jens (http://jwillmer.de)

 Permission is hereby granted, free of charge, to any person obtaining
 a copy of this software and associated documentation files (the
 "Software"), to deal in the Software without restriction, including
 without limitation the rights to use, copy, modify, merge, publish,
 distribute, sublicense, and/or sell copies of the Software, and to
 permit persons to whom the Software is furnished to do so, subject to
 the following conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


 feedBackBox: A small feedback box realized as jQuery Plugin.
 @author: Willmer, Jens
 @url: https://github.com/jwillmer/feedBackBox
 @documentation: https://github.com/jwillmer/feedBackBox/wiki
 @version: 0.0.1
 */
; (function ($) {
    $.fn.extend({
        feedBackBox: function (options) {

            // default options
            this.defaultOptions = {
                title: 'Contact us',
                titleMessage: 'Book your car service now.',
                userName: '',
                userEmail:'',
                userService:'',
                userPhone:'',
                isUsernameEnabled: true,
                message: '',
                ajaxUrl: 'http://..',
                successMessage: 'Thank your for your feedback.',
                errorMessage: 'Something wen\'t wrong!'
            };

            var settings = $.extend(true, {}, this.defaultOptions, options);

            return this.each(function () {
                var $this = $(this);
                var thisSettings = $.extend({}, settings);

                var diableUsername;
                if (!thisSettings.isUsernameEnabled) {
                    diableUsername = 'disabled="disabled"';
                }

                // add feedback box
                $this.html('<div id="fpi_feedback"><div id="fpi_title" class="rotate"><h3>'
                    + thisSettings.title
                    + '</h3></div><div id="fpi_content"><div id="fpi_header_message">'
                    + thisSettings.titleMessage
                    + '</div><form action="assets/inc/booknow.php" id="booknowForm"><div id="fpi_submit_username"><label for="username">Name</label><input type="text" required name="username" '
                    + diableUsername
                    + ' value="'
                    + thisSettings.userName
                    + '"></div><div id="fpi_submit_email"><label for="email">Email</label><input type="text" name="email" required '
                    + diableUsername
                    + ' value="'
                    + thisSettings.userEmail
                    + '"></div><div id="fpi_submit_email"><label for="Mobile">Mobile Number</label><input type="text" name="userPhone" required '
                    + diableUsername
                    + ' value="'
                    + thisSettings.userPhone
                    + '"></div>' +
                    '<div id="fpi_submit_service"><label for="service">Select service</label>' +
                    '<select name="selectedService"><option value="On Demand Eco Car Wash(from ₹199)">On Demand Eco Car Wash(from ₹199)</option>' +
                    '<option value="Full Wash + Vaccum + Wax Polish(from ₹499)">Full Wash + Vaccum + Wax Polish(from ₹499)</option>' +
                    '<option value="Full Wash + Service Pro(from ₹399)">Full Wash + Service Pro(from ₹399)</option>' +
                    '<option value="General Check-Up and Full Service (from ₹2499)">General Check-Up and Full Service (from ₹2499)</option>' +
                    '<option value="A/C Neutrilizer (from ₹749)">A/C Neutrilizer (from ₹749)</option>' +
                    '<option value="Uphoistery Cleaning (from ₹999)">Uphoistery Cleaning (from ₹999)</option>' +
                    '<option value="New Tyres (₹100 off)">New Tyres (₹100 off)</option></select></div><div id="fpi_submit_message">'+
                    '<div id="fpi_submit_message"><label for="message">Message</label><textarea name="userMessage"></textarea></div>'
                    + '<div id="fpi_submit_loading"></div><div id="fpi_submit_submit">' +
                    '<input type="submit" class="btn th-btn th-btn-small th-btn-default" value="Send">' +
                    '<div class="form-message z-depth-1" style="display:none"></div>'
                    + '</div></form><div id="fpi_ajax_message"><h2></h2></div></div></div>');

                // remove error indication on text change
                $('#fpi_submit_username input').change(function () {
                    if ($(this).val() != '') {
                        $(this).removeClass('error');
                    }
                });
                $('#fpi_submit_message textarea').change(function () {
                    if ($(this).val() != '') {
                        $(this).removeClass('error');
                    }
                });

                // submit action

                // open and close animation
                var isOpen = false;
                $('#fpi_title').click(function () {
                    if (isOpen) {
                        $('#fpi_feedback').animate({ "width": "+=5px" }, "fast")
                            .animate({ "width": "55px" }, "slow")
                            .animate({ "width": "60px" }, "fast");
                        isOpen = !isOpen;
                    } else {
                        $('#fpi_feedback').animate({ "width": "-=5px" }, "fast")
                            .animate({ "width": "365px" }, "slow")
                            .animate({ "width": "360px" }, "fast");

                        // reset properties
                        $('#fpi_submit_loading').hide();
                        $('#fpi_content form').show()
                        $('#fpi_content form .error').removeClass("error");
                        $('#fpi_submit_submit input').removeAttr('disabled');
                        isOpen = !isOpen;
                    }
                });

            });
        }
    });
})(jQuery);