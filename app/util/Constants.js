Ext.define('JavisERP.util.Constants', {

    singleton: true,

    bogusMarkup: '<div id="start-div" style="padding:5px;">'+
    '<div style="float:right;"><img src="/resources/images/BVM_logo_stacked_shadow.jpg" width="200"></div>'+
    '<div style="padding:0px 10px;"><h2>Welcome!</h2><p>'+
    'This is your dashboard.  A dashboard is information at your fingertips!  Above you will find the navigation menu. Eventually '+
    'we can spice this welcome screen up a bit to show statistics, or whatever else is needed for a moments glance.<br /><br /></p>'+
    '</div>'+
    '<div style="padding-left:10px;"><h2>What\'s New!?</h2>'+
    '<iframe src="http://player.vimeo.com/video/67298836" width="500" height="313" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe> <p><a href="http://vimeo.com/67298836">JavisERP - Best Version Media</a> from <a href="http://vimeo.com/user5720016">Jeff Pipas</a> on <a href="http://vimeo.com">Vimeo</a>.</p>'+
    '</div><div class="clear">&nbsp;</div></div>',


    shortBogusMarkup: '<div class="portlet-content"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, '+
    'sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales '+
    'non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet '+
    'tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla.</p></div>'
});

Ext.apply(Ext.form.field.VTypes, {
    phone:  function(v) {
        return (/^(\d{3}[-]?){1,2}(\d{4})$/).test(v);
    },
    phoneText: 'Not a valid phone number.  Must be in the format 123-4567 or 123-456-7890 (dashes optional)',
    phoneMask:/[\d-]/
});