deliciousbadge = function() {


      /* configuration */

    //  link and output list IDs
    var badgeid = 'delicious';
    var outputid = 'deliciouslist';

    //message to add to the link while loading
    var loadingMessage = ' (loading...)';

    //amount of links
    var amount = 10;

    //timeout in milliseconds;
    var timeoutdelay = 1000;
   
    //store the link that was clicked
    var o = null;



     /* public methods */


      return { 

                //addEvent
                addEvent: function(elem,evnType,fn,useCapture) {

                    if(elem.addEventListener) {

                            elem.addEventListener(evnType,fn,useCapture);    

                    } else if(elem.attachEvent) {

                            r = elem.attachEvent('on' + evnType, fn); 

                            return r;


                           } else {

                                    elem['on' + evnType] = fn;

                                  } 
           

                },

                //check for DOM and element support 
                init: function() {

                        if(document.getElementById && document.createTextNode) {

                              o = document.getElementById(badgeid);

                                  if(o && o.href) {

                                           deliciousbadge.addEvent(o, 'click', callData, false);
                                  }
                        }

  
                },

                retrieveData: function(dataset) {

                      clearTimeout(deliciousbadge.to);

                      displayData(dataset);
                },


               failure: function(){ 
       
                   clearTimeout(deliciousbadge.to);

                   window.location = o.getAttribute('href'); 

               }

            };



     /* private methods */
 
        //callData assembles the JSON call and initiates the timeout
        function callData(e) {

              if(!document.getElementById(outputid)) {

                     deliciousbadge.to = window.setTimeout('deliciousbadge.failure()',timeoutdelay);

                 var user = o.href.replace(/.*\//g,'');

                 var msg = document.createElement('span');

                     msg.appendChild(document.createTextNode(loadingMessage));

                     o.appendChild(msg);

                 var seeder = document.createElement('script');

                 var srcurl = 'http://feeds.del.icio.us/v2/json/'+ user +'?count='+ amount + '&callback=deliciousbadge.retrieveData';
 
                    seeder.setAttribute('src', srcurl);
                     
                    document.getElementsByTagName('head')[0].appendChild(seeder);

                    cancelClick(e);

              }

        };


       // displayData - assembles the list of links from JSON dataset
       function displayData(dataset) {


            var output = document.createElement('ul');

                output.id = outputid;

                for(var i=0;dataset[i];i++) {

                         var entry = document.createElement('li');

                         var entryLink = document.createElement('a');

                             entryLink.appendChild(document.createTextNode(dataset[i].d));

                             entryLink.setAttribute('href',dataset[i].u);

                             entry.appendChild(entryLink);

                             output.appendChild(entry);                             
                } 

               o.parentNode.insertBefore(output,o.nextSibling);

               o.removeChild(o.lastChild);

               output.getElementsByTagName('a')[0].focus();
       };



       //cancelClick - prevents the link from being followed
       function cancelClick(e) {

              if(window.event) {

                  window.event.cancelBubble = true;
                  window.event.returnValue = false; 

                   return;
              } 

              if(e) {

                 e.stopPropagation();

                 e.preventDefault();
              }


       };
                     
 

}();
deliciousbadge.addEvent(window,'load',deliciousbadge.init,false);



