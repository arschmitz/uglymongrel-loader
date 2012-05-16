//auto initalize
var uglyMongrel = new l();

function l(){ 
	//define child functions 
	this.loadScript=ls;
	this.loadCSS=cs;
}
//load script function n= script name , s = search, r = replace, d=callback
function ls(n,s,r,d){
	//set defaults
	var cb = cb || 'true';
	var d = d || 'skip';
	if((typeof(uglymongrel.search) != 'undefined' && typeof(s) === "undefined") || (s == '' && typeof(uglymongrel.search) != 'undefined') ){s = uglymongrel.search;}
	if(typeof(uglymongrel.replace) != 'undefined'){r = uglymongrel.replace;} 
	//create new script element
	var sc= document.createElement("script");
	sc.type = "text/javascript";
	//construct src
	sc.src = "http://uglymongrel.com/script.php?scriptname="+n+"&search="+s+"&replace="+r;
	//find head element
	var head = document.getElementsByTagName('head')[0]; 
	//if head dosent exist create it 
    if (!head) {  
     head = document.body.parentNode.appendChild(document.createElement('head'));  
    }
	//if a callback is defined trigger it when script finishes loading
	if(d != 'skip'){
		//if in ie5 or quirks mode
		if(document.documentMode == "5"){
		  	sc.onreadystatechange= function () { 
			  if (this.readyState == 'loaded' || this.readyState == 'complete') d();
		} 
		 }
		//if in ie 6,7,8 
		if(msieversion() <= 8){
			
		sc.onreadystatechange= function () { 
			  if (this.readyState == 'loaded' || this.readyState == 'complete') d();
		}
		}
		//everything else
		sc.onload = d;
	}
	//sppend script
    head.appendChild(sc);
}
//load css file function n=name s = search r = replace
function cs(n,s,r){
	//determin search and replace 
	if(typeof(searchcss) != 'undefined' && typeof(s) === "undefined"){s = uglymongrel.searchcss;}
	if(typeof(replacecss) != 'undefined'){r = uglymongrel.replacecss;}
	//create link element for style sheet
	var cs= document.createElement("link");
	cs.rel = "stylesheet";
	cs.type = "text/css";
	//if no search provided skip proxy
	if(s == "none"){
		cs.href = n;	 
	}else cs.href = "http://uglymongrel.com/script.php?css=true&scriptname="+n+"&search="+s+"&replace="+r;
	//get head element
	var head = document.getElementsByTagName('head')[0];  
	//append link tag
    head.appendChild(cs);
	
}
//determin IE version needed to tell when load is complete ie 9 calls both standards and old ie events
 function msieversion()
   {
      var ua = window.navigator.userAgent
      var msie = ua.indexOf ( "MSIE " )

      if ( msie > 0 )      // If Internet Explorer, return version number
         return parseInt (ua.substring (msie+5, ua.indexOf (".", msie )))
      else                 // If another browser, return 0
         return 0

   }