var delicioustagsbadge = function(){ 

     /* configurations */

      var config = {

        countDefault: 20,

        badgeID: 'delicioustagsbadge',

        outputID: 'delicioustagslist',

        tagcloud_class: 'tag_cloud',

        stylesmatch: /skin-(\w+)/,

        amountmatch: /amount-(\d+)/,

        styles: {
                 'green': 'skin-badge-green.css',            
                 'blue': 'skin-badge-blue.css',
                 'orange': 'skin-badge-orange.css'
                }
         
      }; 


    /* private methods */

    var badge; 

    var name;

        function init() {

            badge = document.getElementById(config.badgeID);

            head = document.getElementsByTagName('head')[0]; 

               if(badge) {

                   var link = badge.getElementsByTagName('a')[0];

                      if(link) {
  
                               classdata = badge.className;

                           var amount = config.amountmatch.exec(classdata);

                               amount = amount ? amount[1] : config.countDefault;

                           var skin = config.stylesmatch.exec(classdata);

                               name = link.href.split('/');

                           var url = 'http://feeds.del.icio.us/v2/json/tags/' + name[name.length-1] + '?count=' + amount + '&sort=alpha&callback=delicioustagsbadge.show';

                               if(skin && skin[1]) {

                                   addSkin(skin[1]);

                               }//end if 

                       addData(url);     
                     
                      } //end if

               }//end if


        };

        function addData(url) {

            var script = document.createElement('script');

                script.setAttribute('type','text/javascript');
 
                script.setAttribute('src',url);

                document.getElementsByTagName('head')[0].appendChild(script); 

        }; 

        function show(result) {

               var minfontsize = 15;

               var maxfontsize = 35;

               var minimum_count = 1000;

               var maximum_count = -1000;
 
               for(var i in result) {

                    if(result[i] < minimum_count)  minimum_count = parseInt(result[i]); 

                    if(result[i] > maximum_count)  maximum_count = parseInt(result[i]); 
               }  

 
               var spread = parseInt(maximum_count - minimum_count); 

               if(spread == 0) spread = 1;
               
               var px = 'px';

               var deliciouslist = document.createElement('div');
                    
                   deliciouslist.id = config.outputID;

                     for(var i in result) {
                              
                         //var size = 'font-size: ';

                           var size = '';  

                         var count = parseInt(result[i]);

                         var a = document.createElement('a');

                             a.setAttribute('href','http://del.icio.us/' + name[name.length-1]+'/' + i);
         
                             a.setAttribute('title',result[i] + ' posts');

                             size += parseInt(minfontsize + (result[i] - minimum_count)*(maxfontsize - minfontsize) / spread);
  
                             //a.setAttribute('style',size + px); 

                             //a.setAttribute('class',config.tagcloud_class);

                               a.style.fontSize = size + px;

                               a.className = config.tagcloud_class;  
                               
                             a.appendChild(document.createTextNode(i));

                             deliciouslist.appendChild(a);

                             deliciouslist.appendChild(document.createTextNode(" "));
                    } 

             badge.appendChild(deliciouslist);
 
        };

       function addSkin(skin) {

             var style = document.createElement('link');

                 style.setAttribute('rel','stylesheet');

                 style.setAttribute('type','text/css');

                 style.setAttribute('href',config.styles[skin]);

                 document.getElementsByTagName('head')[0].insertBefore(style,head.firstChild);

       };
       


    /* public methods */

      return {

         show: show,

         init: init
      }
 

}();

delicioustagsbadge.init();