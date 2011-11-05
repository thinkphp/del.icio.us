var deliciousbadge = new Class({          
        /* Implements */
        Implements: [Options, Events],
        /* set options */
        options: {
           badgeid: 'delicious',
           outputid: 'deliciouslist',
           loadingMessage: ' (Loading...)',
           amount: 10,
           timeoutdelay: 1000,
           o : null
         },
         /* constructor of class */
         initialize: function(options) {           
            this.setOptions(options);
            this.options.o = document.id(this.options.badgeid);
            if(this.options.o && this.options.o.href) {
                    this.options.o.addEvent('click',this.callData.bind(this));
            } 

         },
         retrieveData: function(dataset) {         
                 clearTimeout(this.deliciousbadgeto); 
                 this.displayData(dataset);
         }, 
         failure: function() {
            clearTimeout(this.deliciousbadgeto);
            window.location = this.options.o.href;

         },
         callData: function(event){                        
            if(!$(this.options.outputid)) { 
                  event.stop();
                  this.deliciousbadgeto = window.setTimeout(function(){this.failure()}.bind(this),this.options.timeoutdelay);
                  user = this.options.o.href.replace(/.*\//g,'');  
                  msg = new Element('span').set('html', this.options.loadingMessage).injectInside(this.options.o); 
                  seeder = new Element('script');     
                  srcurl = 'http://feeds.del.icio.us/v2/json/'+ user +'?count='+ this.options.amount+'&callback=callback';
                  seeder.setProperties({'type':'text/javascript','src': srcurl}); 
                  seeder.injectInside(document.head);
                    window.callback = function(dataset) {                      
                           this.retrieveData(dataset);
                    }.bind(this);
            }//end if 
                            
         },
         displayData: function(dataset) {
                output = new Element('ul');
                output.id = this.options.outputid;
            for(var i=0;dataset[i];i++) {
                  entry = new Element('li');
                  entryLink = new Element('a').set('html',dataset[i].d);
                  entryLink.setProperty('href',dataset[i].u);
                  entryLink.injectInside(entry);  
                  entry.injectInside(output);       
            }
             this.options.o.parentNode.insertBefore(output,this.options.o.nextSibling);
             this.options.o.removeChild(this.options.o.lastChild);
             output.getElementsByTagName('a')[0].focus();
         }        
});//end class

