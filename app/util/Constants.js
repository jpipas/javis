Ext.define('JavisERP.util.Constants', {

    singleton: true,

    bogusMarkup: '<div id="start-div" style="padding:5px;">'+
    '<div style="float:right;"><img src="resources/images/NCLogo.jpg"></div>'+		
    '<div style="padding:0px 10px;"><h2>Welcome!</h2><p>'+
    'This is your dashboard.  A dashboard is information at your fingertips!  Above you will find the navigation menu. Eventually '+
    'we can spice this welcome screen up a bit to show statistics, or whatever else is needed for a moments glance.<br /><br /></p>'+
	  '</div>'+
	  '<div style="padding-left:10px;"><h2>What\'s New!?</h2>'+
	  '<p>This "app" is currently just frontend enabled.  What that means is that it is not reading data from a database, nor is it able to save data to a database.<br /><br /></p>'+
	  '<p>That being said, you\'re still able to move around and demonstrate the following functionality:<br /><br />'+
	  '<ul><li><h3>Portlet Drag and Drop</h3></li><li><h3>Menu Navigation:</h3><ul style="margin-left:10px;"><li>Navigation Menu (Administrators View)</li><li>List->Clients (view/edit icons bring up client record)</li><li>List->Publications</li><li>List->Contracts</li><li>List->Territories</li></ul></li>'+
	  '<li><h3>Client Record:</h3><ul style="margin-left:10px;"><li>General Tab, Sales Tab</li><li>General Tab->Contat Tab->New Contact (shows new contact window)</li></ul></li>'+
	  '</div><div class="clear">&nbsp;</div></div>',


    shortBogusMarkup: '<div class="portlet-content"><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, '+
    'sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales '+
    'non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet '+
    'tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla.</p></div>'
}); 