// Input 0
var webodf_version="0.4.2-2039-gdbdc4e9";
// Input 1
function Runtime(){}Runtime.prototype.getVariable=function(k){};Runtime.prototype.toJson=function(k){};Runtime.prototype.fromJson=function(k){};Runtime.prototype.byteArrayFromString=function(k,h){};Runtime.prototype.byteArrayToString=function(k,h){};Runtime.prototype.read=function(k,h,b,p){};Runtime.prototype.readFile=function(k,h,b){};Runtime.prototype.readFileSync=function(k,h){};Runtime.prototype.loadXML=function(k,h){};Runtime.prototype.writeFile=function(k,h,b){};
Runtime.prototype.isFile=function(k,h){};Runtime.prototype.getFileSize=function(k,h){};Runtime.prototype.deleteFile=function(k,h){};Runtime.prototype.log=function(k,h){};Runtime.prototype.setTimeout=function(k,h){};Runtime.prototype.clearTimeout=function(k){};Runtime.prototype.libraryPaths=function(){};Runtime.prototype.currentDirectory=function(){};Runtime.prototype.setCurrentDirectory=function(k){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};
Runtime.prototype.parseXML=function(k){};Runtime.prototype.exit=function(k){};Runtime.prototype.getWindow=function(){};Runtime.prototype.requestAnimationFrame=function(k){};Runtime.prototype.cancelAnimationFrame=function(k){};Runtime.prototype.assert=function(k,h,b){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(k,h){function b(b){var g="",q,d=b.length;for(q=0;q<d;q+=1)g+=String.fromCharCode(b[q]&255);return g}function p(b){var g="",q,d=b.length,l=[],f,c,a,m;for(q=0;q<d;q+=1)f=b[q],128>f?l.push(f):(q+=1,c=b[q],194<=f&&224>f?l.push((f&31)<<6|c&63):(q+=1,a=b[q],224<=f&&240>f?l.push((f&15)<<12|(c&63)<<6|a&63):(q+=1,m=b[q],240<=f&&245>f&&(f=(f&7)<<18|(c&63)<<12|(a&63)<<6|m&63,f-=65536,l.push((f>>10)+55296,(f&1023)+56320))))),1E3===l.length&&(g+=String.fromCharCode.apply(null,
l),l.length=0);return g+String.fromCharCode.apply(null,l)}var d;"utf8"===h?d=p(k):("binary"!==h&&this.log("Unsupported encoding: "+h),d=b(k));return d};Runtime.getVariable=function(k){try{return eval(k)}catch(h){}};Runtime.toJson=function(k){return JSON.stringify(k)};Runtime.fromJson=function(k){return JSON.parse(k)};Runtime.getFunctionName=function(k){return void 0===k.name?(k=/function\s+(\w+)/.exec(k))&&k[1]:k.name};
function BrowserRuntime(k){function h(f){var c=f.length,a,m,e=0;for(a=0;a<c;a+=1)m=f.charCodeAt(a),e+=1+(128<m)+(2048<m),55040<m&&57344>m&&(e+=1,a+=1);return e}function b(f,c,a){var m=f.length,e,b;c=new Uint8Array(new ArrayBuffer(c));a?(c[0]=239,c[1]=187,c[2]=191,b=3):b=0;for(a=0;a<m;a+=1)e=f.charCodeAt(a),128>e?(c[b]=e,b+=1):2048>e?(c[b]=192|e>>>6,c[b+1]=128|e&63,b+=2):55040>=e||57344<=e?(c[b]=224|e>>>12&15,c[b+1]=128|e>>>6&63,c[b+2]=128|e&63,b+=3):(a+=1,e=(e-55296<<10|f.charCodeAt(a)-56320)+65536,
c[b]=240|e>>>18&7,c[b+1]=128|e>>>12&63,c[b+2]=128|e>>>6&63,c[b+3]=128|e&63,b+=4);return c}function p(f){var c=f.length,a=new Uint8Array(new ArrayBuffer(c)),m;for(m=0;m<c;m+=1)a[m]=f.charCodeAt(m)&255;return a}function d(f,c){var a,m,e;void 0!==c?e=f:c=f;k?(m=k.ownerDocument,e&&(a=m.createElement("span"),a.className=e,a.appendChild(m.createTextNode(e)),k.appendChild(a),k.appendChild(m.createTextNode(" "))),a=m.createElement("span"),0<c.length&&"<"===c[0]?a.innerHTML=c:a.appendChild(m.createTextNode(c)),
k.appendChild(a),k.appendChild(m.createElement("br"))):console&&console.log(c);"alert"===e&&alert(c)}function n(f,c,a){if(0!==a.status||a.responseText)if(200===a.status||0===a.status){if(a.response&&"string"!==typeof a.response)"binary"===c?(a=a.response,a=new Uint8Array(a)):a=String(a.response);else if("binary"===c)if(null!==a.responseBody&&"undefined"!==String(typeof VBArray)){a=(new VBArray(a.responseBody)).toArray();var m=a.length,e=new Uint8Array(new ArrayBuffer(m));for(c=0;c<m;c+=1)e[c]=a[c];
a=e}else{(c=a.getResponseHeader("Content-Length"))&&(c=parseInt(c,10));if(c&&c!==a.responseText.length)a:{var m=a.responseText,e=!1,q=h(m);if("number"===typeof c){if(c!==q&&c!==q+3){m=void 0;break a}e=q+3===c;q=c}m=b(m,q,e)}void 0===m&&(m=p(a.responseText));a=m}else a=a.responseText;l[f]=a;f={err:null,data:a}}else f={err:a.responseText||a.statusText,data:null};else f={err:"File "+f+" is empty.",data:null};return f}function g(f,c,a){var m=new XMLHttpRequest;m.open("GET",f,a);m.overrideMimeType&&("binary"!==
c?m.overrideMimeType("text/plain; charset="+c):m.overrideMimeType("text/plain; charset=x-user-defined"));return m}function q(f,c,a){function m(){var m;4===e.readyState&&(m=n(f,c,e),a(m.err,m.data))}if(l.hasOwnProperty(f))a(null,l[f]);else{var e=g(f,c,!0);e.onreadystatechange=m;try{e.send(null)}catch(b){a(b.message,null)}}}var r=this,l={};this.byteArrayFromString=function(f,c){var a;"utf8"===c?a=b(f,h(f),!1):("binary"!==c&&r.log("unknown encoding: "+c),a=p(f));return a};this.byteArrayToString=Runtime.byteArrayToString;
this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=q;this.read=function(f,c,a,m){q(f,"binary",function(e,f){var b=null;if(f){if("string"===typeof f)throw"This should not happen.";b=f.subarray(c,c+a)}m(e,b)})};this.readFileSync=function(f,c){var a=g(f,c,!1),m;try{a.send(null);m=n(f,c,a);if(m.err)throw m.err;if(null===m.data)throw"No data read from "+f+".";}catch(e){throw e;}return m.data};this.writeFile=function(f,c,a){l[f]=c;var m=new XMLHttpRequest,
e;m.open("PUT",f,!0);m.onreadystatechange=function(){4===m.readyState&&(0!==m.status||m.responseText?200<=m.status&&300>m.status||0===m.status?a(null):a("Status "+String(m.status)+": "+m.responseText||m.statusText):a("File "+f+" is empty."))};e=c.buffer&&!m.sendAsBinary?c.buffer:r.byteArrayToString(c,"binary");try{m.sendAsBinary?m.sendAsBinary(e):m.send(e)}catch(b){r.log("HUH? "+b+" "+c),a(b.message)}};this.deleteFile=function(f,c){delete l[f];var a=new XMLHttpRequest;a.open("DELETE",f,!0);a.onreadystatechange=
function(){4===a.readyState&&(200>a.status&&300<=a.status?c(a.responseText):c(null))};a.send(null)};this.loadXML=function(f,c){var a=new XMLHttpRequest;a.open("GET",f,!0);a.overrideMimeType&&a.overrideMimeType("text/xml");a.onreadystatechange=function(){4===a.readyState&&(0!==a.status||a.responseText?200===a.status||0===a.status?c(null,a.responseXML):c(a.responseText,null):c("File "+f+" is empty.",null))};try{a.send(null)}catch(m){c(m.message,null)}};this.isFile=function(f,c){r.getFileSize(f,function(a){c(-1!==
a)})};this.getFileSize=function(f,c){if(l.hasOwnProperty(f)&&"string"!==typeof l[f])c(l[f].length);else{var a=new XMLHttpRequest;a.open("HEAD",f,!0);a.onreadystatechange=function(){if(4===a.readyState){var m=a.getResponseHeader("Content-Length");m?c(parseInt(m,10)):q(f,"binary",function(a,f){a?c(-1):c(f.length)})}};a.send(null)}};this.log=d;this.assert=function(f,c,a){if(!f)throw d("alert","ASSERTION FAILED:\n"+c),a&&a(),c;};this.setTimeout=function(f,c){return setTimeout(function(){f()},c)};this.clearTimeout=
function(f){clearTimeout(f)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.currentDirectory=function(){return""};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(f){return(new DOMParser).parseFromString(f,"text/xml")};this.exit=function(f){d("Calling exit with code "+String(f)+", but exit() is not implemented.")};this.getWindow=function(){return window};this.requestAnimationFrame=
function(f){var c=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,a=0;if(c)c.bind(window),a=c(f);else return setTimeout(f,15);return a};this.cancelAnimationFrame=function(f){var c=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame;c?(c.bind(window),c(f)):clearTimeout(f)}}
function NodeJSRuntime(){function k(b){var l=b.length,f,c=new Uint8Array(new ArrayBuffer(l));for(f=0;f<l;f+=1)c[f]=b[f];return c}function h(b,l,f){function c(a,c){if(a)return f(a,null);if(!c)return f("No data for "+b+".",null);if("string"===typeof c)return f(a,c);f(a,k(c))}b=d.resolve(n,b);"binary"!==l?p.readFile(b,l,c):p.readFile(b,null,c)}var b=this,p=require("fs"),d=require("path"),n="",g,q;this.byteArrayFromString=function(b,l){var f=new Buffer(b,l),c,a=f.length,m=new Uint8Array(new ArrayBuffer(a));
for(c=0;c<a;c+=1)m[c]=f[c];return m};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=h;this.loadXML=function(q,l){h(q,"utf-8",function(f,c){if(f)return l(f,null);if(!c)return l("No data for "+q+".",null);l(null,b.parseXML(c))})};this.writeFile=function(b,l,f){l=new Buffer(l);b=d.resolve(n,b);p.writeFile(b,l,"binary",function(c){f(c||null)})};this.deleteFile=function(b,l){b=d.resolve(n,b);
p.unlink(b,l)};this.read=function(b,l,f,c){b=d.resolve(n,b);p.open(b,"r+",666,function(a,m){if(a)c(a,null);else{var e=new Buffer(f);p.read(m,e,0,f,l,function(a){p.close(m);c(a,k(e))})}})};this.readFileSync=function(b,l){var f;f=p.readFileSync(b,"binary"===l?null:l);if(null===f)throw"File "+b+" could not be read.";"binary"===l&&(f=k(f));return f};this.isFile=function(b,l){b=d.resolve(n,b);p.stat(b,function(f,c){l(!f&&c.isFile())})};this.getFileSize=function(b,l){b=d.resolve(n,b);p.stat(b,function(f,
c){f?l(-1):l(c.size)})};this.log=function(b,l){var f;void 0!==l?f=b:l=b;"alert"===f&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(l+"\n");"alert"===f&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(b,l,f){b||(process.stderr.write("ASSERTION FAILED: "+l),f&&f())};this.setTimeout=function(b,l){return setTimeout(function(){b()},l)};this.clearTimeout=function(b){clearTimeout(b)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(b){n=
b};this.currentDirectory=function(){return n};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return q};this.parseXML=function(b){return g.parseFromString(b,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};this.requestAnimationFrame=function(b){return setTimeout(b,15)};this.cancelAnimationFrame=function(b){clearTimeout(b)};g=new (require("xmldom").DOMParser);q=b.parseXML("<a/>").implementation}
function RhinoRuntime(){function k(b,g){var l;void 0!==g?l=b:g=b;"alert"===l&&print("\n!!!!! ALERT !!!!!");print(g);"alert"===l&&print("!!!!! ALERT !!!!!")}var h=this,b={},p=b.javax.xml.parsers.DocumentBuilderFactory.newInstance(),d,n,g="";p.setValidating(!1);p.setNamespaceAware(!0);p.setExpandEntityReferences(!1);p.setSchema(null);n=b.org.xml.sax.EntityResolver({resolveEntity:function(q,g){var l=new b.java.io.FileReader(g);return new b.org.xml.sax.InputSource(l)}});d=p.newDocumentBuilder();d.setEntityResolver(n);
this.byteArrayFromString=function(b,g){var l,f=b.length,c=new Uint8Array(new ArrayBuffer(f));for(l=0;l<f;l+=1)c[l]=b.charCodeAt(l)&255;return c};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.loadXML=function(q,g){var l=new b.java.io.File(q),f=null;try{f=d.parse(l)}catch(c){return print(c),g(c,null)}g(null,f)};this.readFile=function(q,d,l){g&&(q=g+"/"+q);var f=new b.java.io.File(q),c="binary"===d?
"latin1":d;f.isFile()?((q=readFile(q,c))&&"binary"===d&&(q=h.byteArrayFromString(q,"binary")),l(null,q)):l(q+" is not a file.",null)};this.writeFile=function(q,d,l){g&&(q=g+"/"+q);q=new b.java.io.FileOutputStream(q);var f,c=d.length;for(f=0;f<c;f+=1)q.write(d[f]);q.close();l(null)};this.deleteFile=function(q,d){g&&(q=g+"/"+q);var l=new b.java.io.File(q),f=q+Math.random(),f=new b.java.io.File(f);l.rename(f)?(f.deleteOnExit(),d(null)):d("Could not delete "+q)};this.read=function(q,d,l,f){g&&(q=g+"/"+
q);var c;c=q;var a="binary";(new b.java.io.File(c)).isFile()?("binary"===a&&(a="latin1"),c=readFile(c,a)):c=null;c?f(null,this.byteArrayFromString(c.substring(d,d+l),"binary")):f("Cannot read "+q,null)};this.readFileSync=function(b,d){if(!d)return"";var l=readFile(b,d);if(null===l)throw"File could not be read.";return l};this.isFile=function(d,h){g&&(d=g+"/"+d);var l=new b.java.io.File(d);h(l.isFile())};this.getFileSize=function(d,h){g&&(d=g+"/"+d);var l=new b.java.io.File(d);h(l.length())};this.log=
k;this.assert=function(b,d,l){b||(k("alert","ASSERTION FAILED: "+d),l&&l())};this.setTimeout=function(b){b();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(b){g=b};this.currentDirectory=function(){return g};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return d.getDOMImplementation()};this.parseXML=function(g){g=new b.java.io.StringReader(g);g=new b.org.xml.sax.InputSource(g);return d.parse(g)};
this.exit=quit;this.getWindow=function(){return null};this.requestAnimationFrame=function(b){b();return 0};this.cancelAnimationFrame=function(){}}Runtime.create=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime};var runtime=Runtime.create(),core={},gui={},xmldom={},odf={},ops={};
(function(){function k(b,d,l){var f=b+"/manifest.json",c,a;runtime.log("Loading manifest: "+f);try{c=runtime.readFileSync(f,"utf-8")}catch(m){if(l)runtime.log("No loadable manifest found.");else throw console.log(String(m)),m;return}l=JSON.parse(c);for(a in l)l.hasOwnProperty(a)&&(d[a]={dir:b,deps:l[a]})}function h(b,d,l){function f(e){if(!m[e]&&!l(e)){if(a[e])throw"Circular dependency detected for "+e+".";a[e]=!0;if(!d[e])throw"Missing dependency information for class "+e+".";var b=d[e],g=b.deps,
h,q=g.length;for(h=0;h<q;h+=1)f(g[h]);a[e]=!1;m[e]=!0;c.push(b.dir+"/"+e.replace(".","/")+".js")}}var c=[],a={},m={};b.forEach(f);return c}function b(b,d){return d=d+("\n//# sourceURL="+b)+("\n//@ sourceURL="+b)}function p(d){var g,l;for(g=0;g<d.length;g+=1)l=runtime.readFileSync(d[g],"utf-8"),l=b(d[g],l),eval(l)}function d(b){b=b.split(".");var d,l=g,f=b.length;for(d=0;d<f;d+=1){if(!l.hasOwnProperty(b[d]))return!1;l=l[b[d]]}return!0}var n,g={core:core,gui:gui,xmldom:xmldom,odf:odf,ops:ops};runtime.loadClasses=
function(b,g){if(IS_COMPILED_CODE||0===b.length)return g&&g();var l;if(!(l=n)){l=[];var f=runtime.libraryPaths(),c;runtime.currentDirectory()&&-1===f.indexOf(runtime.currentDirectory())&&k(runtime.currentDirectory(),l,!0);for(c=0;c<f.length;c+=1)k(f[c],l)}n=l;b=h(b,n,d);if(0===b.length)return g&&g();if("BrowserRuntime"===runtime.type()&&g){l=b;f=document.currentScript||document.documentElement.lastChild;c=document.createDocumentFragment();var a,m;for(m=0;m<l.length;m+=1)a=document.createElement("script"),
a.type="text/javascript",a.charset="utf-8",a.async=!1,a.setAttribute("src",l[m]),c.appendChild(a);g&&(a.onload=g);f.parentNode.insertBefore(c,f)}else p(b),g&&g()};runtime.loadClass=function(b,d){runtime.loadClasses([b],d)}})();(function(){var k=function(h){return h};runtime.getTranslator=function(){return k};runtime.setTranslator=function(h){k=h};runtime.tr=function(h){var b=k(h);return b&&"string"===String(typeof b)?b:h}})();
(function(k){function h(b){if(b.length){var h=b[0];runtime.readFile(h,"utf8",function(d,n){function g(){var b;(b=eval(k))&&runtime.exit(b)}var q="",q=h.lastIndexOf("/"),k=n,q=-1!==q?h.substring(0,q):".";runtime.setCurrentDirectory(q);d?(runtime.log(d),runtime.exit(1)):null===k?(runtime.log("No code found for "+h),runtime.exit(1)):g.apply(null,b)})}}k=k?Array.prototype.slice.call(k):[];"NodeJSRuntime"===runtime.type()?h(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?h(k):h(k.slice(1))})("undefined"!==
String(typeof arguments)&&arguments);
// Input 2
core.Async=function(){this.forEach=function(k,h,b){function p(d){g!==n&&(d?(g=n,b(d)):(g+=1,g===n&&b(null)))}var d,n=k.length,g=0;for(d=0;d<n;d+=1)h(k[d],p)};this.destroyAll=function(k,h){function b(p,d){if(d)h(d);else if(p<k.length)k[p](function(d){b(p+1,d)});else h()}b(0,void 0)}};
// Input 3
function makeBase64(){function k(a){var c,e=a.length,f=new Uint8Array(new ArrayBuffer(e));for(c=0;c<e;c+=1)f[c]=a.charCodeAt(c)&255;return f}function h(a){var c,e="",f,b=a.length-2;for(f=0;f<b;f+=3)c=a[f]<<16|a[f+1]<<8|a[f+2],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>18],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12&63],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&
63];f===b+1?(c=a[f]<<4,e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],e+="=="):f===b&&(c=a[f]<<10|a[f+1]<<2,e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],e+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],e+="=");return e}function b(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,
"");var c=a.length,f=new Uint8Array(new ArrayBuffer(3*c)),b=a.length%4,m=0,d,g;for(d=0;d<c;d+=4)g=(e[a.charAt(d)]||0)<<18|(e[a.charAt(d+1)]||0)<<12|(e[a.charAt(d+2)]||0)<<6|(e[a.charAt(d+3)]||0),f[m]=g>>16,f[m+1]=g>>8&255,f[m+2]=g&255,m+=3;c=3*c-[0,0,2,1][b];return f.subarray(0,c)}function p(a){var c,e,f=a.length,b=0,m=new Uint8Array(new ArrayBuffer(3*f));for(c=0;c<f;c+=1)e=a[c],128>e?m[b++]=e:(2048>e?m[b++]=192|e>>>6:(m[b++]=224|e>>>12&15,m[b++]=128|e>>>6&63),m[b++]=128|e&63);return m.subarray(0,
b)}function d(a){var c,e,f,b,m=a.length,d=new Uint8Array(new ArrayBuffer(m)),g=0;for(c=0;c<m;c+=1)e=a[c],128>e?d[g++]=e:(c+=1,f=a[c],224>e?d[g++]=(e&31)<<6|f&63:(c+=1,b=a[c],d[g++]=(e&15)<<12|(f&63)<<6|b&63));return d.subarray(0,g)}function n(a){return h(k(a))}function g(a){return String.fromCharCode.apply(String,b(a))}function q(a){return d(k(a))}function r(a){a=d(a);for(var c="",e=0;e<a.length;)c+=String.fromCharCode.apply(String,a.subarray(e,e+45E3)),e+=45E3;return c}function l(a,c,e){var f,b,
m,d="";for(m=c;m<e;m+=1)c=a.charCodeAt(m)&255,128>c?d+=String.fromCharCode(c):(m+=1,f=a.charCodeAt(m)&255,224>c?d+=String.fromCharCode((c&31)<<6|f&63):(m+=1,b=a.charCodeAt(m)&255,d+=String.fromCharCode((c&15)<<12|(f&63)<<6|b&63)));return d}function f(a,c){function e(){var m=b+1E5;m>a.length&&(m=a.length);f+=l(a,b,m);b=m;m=b===a.length;c(f,m)&&!m&&runtime.setTimeout(e,0)}var f="",b=0;1E5>a.length?c(l(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),e())}function c(a){return p(k(a))}function a(a){return String.fromCharCode.apply(String,
p(a))}function m(a){return String.fromCharCode.apply(String,p(k(a)))}var e=function(a){var c={},e,f;e=0;for(f=a.length;e<f;e+=1)c[a.charAt(e)]=e;return c}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),t,w,z=runtime.getWindow(),x,v;z&&z.btoa?(x=z.btoa,t=function(a){return x(m(a))}):(x=n,t=function(a){return h(c(a))});z&&z.atob?(v=z.atob,w=function(a){a=v(a);return l(a,0,a.length)}):(v=g,w=function(a){return r(b(a))});core.Base64=function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=
h;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=b;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=p;this.convertByteArrayToUTF16Array=this.convertUTF8ArrayToUTF16Array=d;this.convertUTF8StringToBase64=n;this.convertBase64ToUTF8String=g;this.convertUTF8StringToUTF16Array=q;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=r;this.convertUTF8StringToUTF16String=f;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=c;this.convertUTF16ArrayToUTF8String=
a;this.convertUTF16StringToUTF8String=m;this.convertUTF16StringToBase64=t;this.convertBase64ToUTF16String=w;this.fromBase64=g;this.toBase64=n;this.atob=v;this.btoa=x;this.utob=m;this.btou=f;this.encode=t;this.encodeURI=function(a){return t(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return w(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))};return this};return core.Base64}core.Base64=makeBase64();
// Input 4
core.ByteArray=function(k){this.pos=0;this.data=k;this.readUInt32LE=function(){this.pos+=4;var h=this.data,b=this.pos;return h[--b]<<24|h[--b]<<16|h[--b]<<8|h[--b]};this.readUInt16LE=function(){this.pos+=2;var h=this.data,b=this.pos;return h[--b]<<8|h[--b]}};
// Input 5
core.ByteArrayWriter=function(k){function h(b){b>d-p&&(d=Math.max(2*d,p+b),b=new Uint8Array(new ArrayBuffer(d)),b.set(n),n=b)}var b=this,p=0,d=1024,n=new Uint8Array(new ArrayBuffer(d));this.appendByteArrayWriter=function(d){b.appendByteArray(d.getByteArray())};this.appendByteArray=function(b){var d=b.length;h(d);n.set(b,p);p+=d};this.appendArray=function(b){var d=b.length;h(d);n.set(b,p);p+=d};this.appendUInt16LE=function(d){b.appendArray([d&255,d>>8&255])};this.appendUInt32LE=function(d){b.appendArray([d&
255,d>>8&255,d>>16&255,d>>24&255])};this.appendString=function(d){b.appendByteArray(runtime.byteArrayFromString(d,k))};this.getLength=function(){return p};this.getByteArray=function(){var b=new Uint8Array(new ArrayBuffer(p));b.set(n.subarray(0,p));return b}};
// Input 6
core.CSSUnits=function(){var k=this,h={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(b,k,d){return b*h[d]/h[k]};this.convertMeasure=function(b,h){var d,n;b&&h?(d=parseFloat(b),n=b.replace(d.toString(),""),d=k.convert(d,n,h).toString()):d="";return d};this.getUnits=function(b){return b.substr(b.length-2,b.length)}};
// Input 7
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
(function(){function k(){var b,k,d,n,g,q,r,l,f;void 0===h&&(k=(b=runtime.getWindow())&&b.document,q=k.documentElement,r=k.body,h={rangeBCRIgnoresElementBCR:!1,unscaledRangeClientRects:!1,elementBCRIgnoresBodyScroll:!1},k&&(n=k.createElement("div"),n.style.position="absolute",n.style.left="-99999px",n.style.transform="scale(2)",n.style["-webkit-transform"]="scale(2)",g=k.createElement("div"),n.appendChild(g),r.appendChild(n),b=k.createRange(),b.selectNode(g),h.rangeBCRIgnoresElementBCR=0===b.getClientRects().length,
g.appendChild(k.createTextNode("Rect transform test")),k=g.getBoundingClientRect(),d=b.getBoundingClientRect(),h.unscaledRangeClientRects=2<Math.abs(k.height-d.height),n.style.transform="",n.style["-webkit-transform"]="",k=q.style.overflow,d=r.style.overflow,l=r.style.height,f=r.scrollTop,q.style.overflow="visible",r.style.overflow="visible",r.style.height="200%",r.scrollTop=r.scrollHeight,h.elementBCRIgnoresBodyScroll=b.getBoundingClientRect().top!==g.getBoundingClientRect().top,r.scrollTop=f,r.style.height=
l,r.style.overflow=d,q.style.overflow=k,b.detach(),r.removeChild(n),b=Object.keys(h).map(function(c){return c+":"+String(h[c])}).join(", "),runtime.log("Detected browser quirks - "+b)));return h}var h;core.DomUtils=function(){function b(f,c){for(var a=0,b;f.parentNode!==c;)runtime.assert(null!==f.parentNode,"parent is null"),f=f.parentNode;for(b=c.firstChild;b!==f;)a+=1,b=b.nextSibling;return a}function h(f,c){return 0>=f.compareBoundaryPoints(Range.START_TO_START,c)&&0<=f.compareBoundaryPoints(Range.END_TO_END,
c)}function d(f,c){var a=null;f.nodeType===Node.TEXT_NODE&&(0===f.length?(f.parentNode.removeChild(f),c.nodeType===Node.TEXT_NODE&&(a=c)):(c.nodeType===Node.TEXT_NODE&&(f.appendData(c.data),c.parentNode.removeChild(c)),a=f));return a}function n(f){for(var c=f.parentNode;f.firstChild;)c.insertBefore(f.firstChild,f);c.removeChild(f);return c}function g(f,c){for(var a=f.parentNode,b=f.firstChild,e;b;)e=b.nextSibling,g(b,c),b=e;a&&c(f)&&n(f);return a}function q(b,c){return b===c||Boolean(b.compareDocumentPosition(c)&
Node.DOCUMENT_POSITION_CONTAINED_BY)}function r(b,c,a){Object.keys(c).forEach(function(m){var e=m.split(":"),d=e[1],l=a(e[0]),e=c[m],g=typeof e;"object"===g?Object.keys(e).length&&(m=l?b.getElementsByTagNameNS(l,d)[0]||b.ownerDocument.createElementNS(l,m):b.getElementsByTagName(d)[0]||b.ownerDocument.createElement(m),b.appendChild(m),r(m,e,a)):l&&(runtime.assert("number"===g||"string"===g,"attempting to map unsupported type '"+g+"' (key: "+m+")"),b.setAttributeNS(l,m,String(e)))})}var l=null;this.splitBoundaries=
function(f){var c,a=[],m,e,d;if(f.startContainer.nodeType===Node.TEXT_NODE||f.endContainer.nodeType===Node.TEXT_NODE){m=f.endContainer;e=f.endContainer.nodeType!==Node.TEXT_NODE?f.endOffset===f.endContainer.childNodes.length:!1;d=f.endOffset;c=f.endContainer;if(d<c.childNodes.length)for(c=c.childNodes.item(d),d=0;c.firstChild;)c=c.firstChild;else for(;c.lastChild;)c=c.lastChild,d=c.nodeType===Node.TEXT_NODE?c.textContent.length:c.childNodes.length;c===m&&(m=null);f.setEnd(c,d);d=f.endContainer;0!==
f.endOffset&&d.nodeType===Node.TEXT_NODE&&(c=d,f.endOffset!==c.length&&(a.push(c.splitText(f.endOffset)),a.push(c)));d=f.startContainer;0!==f.startOffset&&d.nodeType===Node.TEXT_NODE&&(c=d,f.startOffset!==c.length&&(d=c.splitText(f.startOffset),a.push(c),a.push(d),f.setStart(d,0)));if(null!==m){for(d=f.endContainer;d.parentNode&&d.parentNode!==m;)d=d.parentNode;e=e?m.childNodes.length:b(d,m);f.setEnd(m,e)}}return a};this.containsRange=h;this.rangesIntersect=function(b,c){return 0>=b.compareBoundaryPoints(Range.END_TO_START,
c)&&0<=b.compareBoundaryPoints(Range.START_TO_END,c)};this.getNodesInRange=function(b,c,a){var m=[],e=b.commonAncestorContainer;a=b.startContainer.ownerDocument.createTreeWalker(e.nodeType===Node.TEXT_NODE?e.parentNode:e,a,c,!1);var d;b.endContainer.childNodes[b.endOffset-1]?(e=b.endContainer.childNodes[b.endOffset-1],d=Node.DOCUMENT_POSITION_PRECEDING|Node.DOCUMENT_POSITION_CONTAINED_BY):(e=b.endContainer,d=Node.DOCUMENT_POSITION_PRECEDING);b.startContainer.childNodes[b.startOffset]?(b=b.startContainer.childNodes[b.startOffset],
a.currentNode=b):b.startOffset===(b.startContainer.nodeType===Node.TEXT_NODE?b.startContainer.length:b.startContainer.childNodes.length)?(b=b.startContainer,a.currentNode=b,a.lastChild(),b=a.nextNode()):(b=b.startContainer,a.currentNode=b);b&&c(b)===NodeFilter.FILTER_ACCEPT&&m.push(b);for(b=a.nextNode();b;){c=e.compareDocumentPosition(b);if(0!==c&&0===(c&d))break;m.push(b);b=a.nextNode()}return m};this.normalizeTextNodes=function(b){b&&b.nextSibling&&(b=d(b,b.nextSibling));b&&b.previousSibling&&d(b.previousSibling,
b)};this.rangeContainsNode=function(b,c){var a=c.ownerDocument.createRange(),m=c.ownerDocument.createRange(),e;a.setStart(b.startContainer,b.startOffset);a.setEnd(b.endContainer,b.endOffset);m.selectNodeContents(c);e=h(a,m);a.detach();m.detach();return e};this.mergeIntoParent=n;this.removeUnwantedNodes=g;this.getElementsByTagNameNS=function(b,c,a){var m=[];b=b.getElementsByTagNameNS(c,a);m.length=a=b.length;for(c=0;c<a;c+=1)m[c]=b.item(c);return m};this.containsNode=function(b,c){return b===c||b.contains(c)};
this.comparePoints=function(f,c,a,m){if(f===a)return m-c;var e=f.compareDocumentPosition(a);2===e?e=-1:4===e?e=1:10===e?(c=b(f,a),e=c<m?1:-1):(m=b(a,f),e=m<c?-1:1);return e};this.adaptRangeDifferenceToZoomLevel=function(b,c){return k().unscaledRangeClientRects?b:b/c};this.getBoundingClientRect=function(b){var c=b.ownerDocument,a=k(),m=c.body;if((!1===a.unscaledRangeClientRects||a.rangeBCRIgnoresElementBCR)&&b.nodeType===Node.ELEMENT_NODE)return b=b.getBoundingClientRect(),a.elementBCRIgnoresBodyScroll?
{left:b.left+m.scrollLeft,right:b.right+m.scrollLeft,top:b.top+m.scrollTop,bottom:b.bottom+m.scrollTop,width:b.width,height:b.height}:b;var e;l?e=l:l=e=c.createRange();a=e;a.selectNode(b);return a.getBoundingClientRect()};this.mapKeyValObjOntoNode=function(b,c,a){Object.keys(c).forEach(function(m){var e=m.split(":"),d=e[1],e=a(e[0]),l=c[m];e?(d=b.getElementsByTagNameNS(e,d)[0],d||(d=b.ownerDocument.createElementNS(e,m),b.appendChild(d)),d.textContent=l):runtime.log("Key ignored: "+m)})};this.removeKeyElementsFromNode=
function(b,c,a){c.forEach(function(c){var e=c.split(":"),d=e[1];(e=a(e[0]))?(d=b.getElementsByTagNameNS(e,d)[0])?d.parentNode.removeChild(d):runtime.log("Element for "+c+" not found."):runtime.log("Property Name ignored: "+c)})};this.getKeyValRepresentationOfNode=function(b,c){for(var a={},m=b.firstElementChild,e;m;){if(e=c(m.namespaceURI))a[e+":"+m.localName]=m.textContent;m=m.nextElementSibling}return a};this.mapObjOntoNode=r;(function(b){var c,a;a=runtime.getWindow();null!==a&&(c=a.navigator.appVersion.toLowerCase(),
a=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")),c=c.indexOf("msie"),a||c)&&(b.containsNode=q)})(this)};return core.DomUtils})();
// Input 8
core.Cursor=function(k,h){function b(c){c.parentNode&&(q.push(c.previousSibling),q.push(c.nextSibling),c.parentNode.removeChild(c))}function p(c,a,b){if(a.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(a),"putCursorIntoTextNode: invalid container");var e=a.parentNode;runtime.assert(Boolean(e),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=a.length,"putCursorIntoTextNode: offset is out of bounds");0===b?e.insertBefore(c,a):(b!==a.length&&a.splitText(b),e.insertBefore(c,
a.nextSibling))}else a.nodeType===Node.ELEMENT_NODE&&a.insertBefore(c,a.childNodes.item(b));q.push(c.previousSibling);q.push(c.nextSibling)}var d=k.createElementNS("urn:webodf:names:cursor","cursor"),n=k.createElementNS("urn:webodf:names:cursor","anchor"),g,q=[],r=k.createRange(),l,f=new core.DomUtils;this.getNode=function(){return d};this.getAnchorNode=function(){return n.parentNode?n:d};this.getSelectedRange=function(){l?(r.setStartBefore(d),r.collapse(!0)):(r.setStartAfter(g?n:d),r.setEndBefore(g?
d:n));return r};this.setSelectedRange=function(c,a){r&&r!==c&&r.detach();r=c;g=!1!==a;(l=c.collapsed)?(b(n),b(d),p(d,c.startContainer,c.startOffset)):(b(n),b(d),p(g?d:n,c.endContainer,c.endOffset),p(g?n:d,c.startContainer,c.startOffset));q.forEach(f.normalizeTextNodes);q.length=0};this.hasForwardSelection=function(){return g};this.remove=function(){b(d);q.forEach(f.normalizeTextNodes);q.length=0};d.setAttributeNS("urn:webodf:names:cursor","memberId",h);n.setAttributeNS("urn:webodf:names:cursor","memberId",
h)};
// Input 9
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
core.Destroyable=function(){};core.Destroyable.prototype.destroy=function(k){};
// Input 10
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
core.EventNotifier=function(k){var h={};this.emit=function(b,k){var d,n;runtime.assert(h.hasOwnProperty(b),'unknown event fired "'+b+'"');n=h[b];for(d=0;d<n.length;d+=1)n[d](k)};this.subscribe=function(b,k){runtime.assert(h.hasOwnProperty(b),'tried to subscribe to unknown event "'+b+'"');h[b].push(k)};this.unsubscribe=function(b,k){var d;runtime.assert(h.hasOwnProperty(b),'tried to unsubscribe from unknown event "'+b+'"');d=h[b].indexOf(k);runtime.assert(-1!==d,'tried to unsubscribe unknown callback from event "'+
b+'"');-1!==d&&h[b].splice(d,1)};(function(){var b,p;for(b=0;b<k.length;b+=1)p=k[b],runtime.assert(!h.hasOwnProperty(p),'Duplicated event ids: "'+p+'" registered more than once.'),h[p]=[]})()};
// Input 11
/*

 Copyright (C) 2012 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
core.LoopWatchDog=function(k,h){var b=Date.now(),p=0;this.check=function(){var d;if(k&&(d=Date.now(),d-b>k))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<h&&(p+=1,p>h))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 12
core.PositionIterator=function(k,h,b,p){function d(){this.acceptNode=function(a){return!a||a.nodeType===m&&0===a.length?w:t}}function n(a){this.acceptNode=function(c){return!c||c.nodeType===m&&0===c.length?w:a.acceptNode(c)}}function g(){var a=f.currentNode,b=a.nodeType;c=b===m?a.length-1:b===e?1:0}function q(){if(null===f.previousSibling()){if(!f.parentNode()||f.currentNode===k)return f.firstChild(),!1;c=0}else g();return!0}function r(){var b=f.currentNode,e;e=a(b);if(b!==k)for(b=b.parentNode;b&&
b!==k;)a(b)===w&&(f.currentNode=b,e=w),b=b.parentNode;e===w?(c=1,b=l.nextPosition()):b=e===t?!0:l.nextPosition();b&&runtime.assert(a(f.currentNode)===t,"moveToAcceptedNode did not result in walker being on an accepted node");return b}var l=this,f,c,a,m=Node.TEXT_NODE,e=Node.ELEMENT_NODE,t=NodeFilter.FILTER_ACCEPT,w=NodeFilter.FILTER_REJECT;this.nextPosition=function(){var a=f.currentNode,b=a.nodeType;if(a===k)return!1;if(0===c&&b===e)null===f.firstChild()&&(c=1);else if(b===m&&c+1<a.length)c+=1;else if(null!==
f.nextSibling())c=0;else if(f.parentNode())c=1;else return!1;return!0};this.previousPosition=function(){var a=!0,b=f.currentNode;0===c?a=q():b.nodeType===m?c-=1:null!==f.lastChild()?g():b===k?a=!1:c=0;return a};this.previousNode=q;this.container=function(){var a=f.currentNode,b=a.nodeType;0===c&&b!==m&&(a=a.parentNode);return a};this.rightNode=function(){var b=f.currentNode,d=b.nodeType;if(d===m&&c===b.length)for(b=b.nextSibling;b&&a(b)!==t;)b=b.nextSibling;else d===e&&1===c&&(b=null);return b};this.leftNode=
function(){var b=f.currentNode;if(0===c)for(b=b.previousSibling;b&&a(b)!==t;)b=b.previousSibling;else if(b.nodeType===e)for(b=b.lastChild;b&&a(b)!==t;)b=b.previousSibling;return b};this.getCurrentNode=function(){return f.currentNode};this.unfilteredDomOffset=function(){if(f.currentNode.nodeType===m)return c;for(var a=0,b=f.currentNode,b=1===c?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=function(){var a=f.currentNode,c=f.previousSibling();f.currentNode=
a;return c};this.getNextSibling=function(){var a=f.currentNode,c=f.nextSibling();f.currentNode=a;return c};this.setPositionBeforeElement=function(a){runtime.assert(Boolean(a),"setPositionBeforeElement called without element");f.currentNode=a;c=0;return r()};this.setUnfilteredPosition=function(a,b){runtime.assert(Boolean(a),"PositionIterator.setUnfilteredPosition called without container");f.currentNode=a;if(a.nodeType===m)return c=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),
runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),b===a.length&&(f.nextSibling()?c=0:f.parentNode()?c=1:runtime.assert(!1,"Error in setUnfilteredPosition: position not valid.")),!0;b<a.childNodes.length?(f.currentNode=a.childNodes.item(b),c=0):c=1;return r()};this.moveToEnd=function(){f.currentNode=k;c=1};this.moveToEndOfNode=function(a){a.nodeType===m?l.setUnfilteredPosition(a,a.length):(f.currentNode=a,c=1)};this.isBeforeNode=function(){return 0===c};this.getNodeFilter=function(){return a};
a=(b?new n(b):new d).acceptNode;a.acceptNode=a;h=h||NodeFilter.SHOW_ALL;runtime.assert(k.nodeType!==Node.TEXT_NODE,"Internet Explorer doesn't allow tree walker roots to be text nodes");f=k.ownerDocument.createTreeWalker(k,h,a,p);c=0;null===f.firstChild()&&(c=1)};
// Input 13
core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(k){};(function(){return core.PositionFilter})();
// Input 14
core.PositionFilterChain=function(){var k=[],h=core.PositionFilter.FilterResult.FILTER_ACCEPT,b=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(p){var d;for(d=0;d<k.length;d+=1)if(k[d].acceptPosition(p)===b)return b;return h};this.addFilter=function(b){k.push(b)}};
// Input 15
core.zip_HuftNode=function(){this.n=this.b=this.e=0;this.t=null};core.zip_HuftList=function(){this.list=this.next=null};
core.RawInflate=function(){function k(a,c,b,e,m,f){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var d=Array(this.BMAX+1),l,g,h,k,A,n,q,p=Array(this.BMAX+1),F,t,r,s=new core.zip_HuftNode,J=Array(this.BMAX);k=Array(this.N_MAX);var v,G=Array(this.BMAX+1),D,u,O;O=this.root=null;for(A=0;A<d.length;A++)d[A]=0;for(A=0;A<p.length;A++)p[A]=0;for(A=0;A<J.length;A++)J[A]=null;for(A=0;A<k.length;A++)k[A]=0;for(A=0;A<G.length;A++)G[A]=0;l=256<c?a[256]:this.BMAX;F=a;t=0;A=c;do d[F[t]]++,t++;
while(0<--A);if(d[0]===c)this.root=null,this.status=this.m=0;else{for(n=1;n<=this.BMAX&&0===d[n];n++);q=n;f<n&&(f=n);for(A=this.BMAX;0!==A&&0===d[A];A--);h=A;f>A&&(f=A);for(D=1<<n;n<A;n++,D<<=1)if(D-=d[n],0>D){this.status=2;this.m=f;return}D-=d[A];if(0>D)this.status=2,this.m=f;else{d[A]+=D;G[1]=n=0;F=d;t=1;for(r=2;0<--A;)n+=F[t++],G[r++]=n;F=a;A=t=0;do n=F[t++],0!==n&&(k[G[n]++]=A);while(++A<c);c=G[h];G[0]=A=0;F=k;t=0;k=-1;v=p[0]=0;r=null;u=0;for(q=q-1+1;q<=h;q++)for(a=d[q];0<a--;){for(;q>v+p[1+k];){v+=
p[1+k];k++;u=h-v;u=u>f?f:u;n=q-v;g=1<<n;if(g>a+1)for(g-=a+1,r=q;++n<u;){g<<=1;if(g<=d[++r])break;g-=d[r]}v+n>l&&v<l&&(n=l-v);u=1<<n;p[1+k]=n;r=Array(u);for(g=0;g<u;g++)r[g]=new core.zip_HuftNode;O=null===O?this.root=new core.zip_HuftList:O.next=new core.zip_HuftList;O.next=null;O.list=r;J[k]=r;0<k&&(G[k]=A,s.b=p[k],s.e=16+n,s.t=r,n=(A&(1<<v)-1)>>v-p[k],J[k-1][n].e=s.e,J[k-1][n].b=s.b,J[k-1][n].n=s.n,J[k-1][n].t=s.t)}s.b=q-v;t>=c?s.e=99:F[t]<b?(s.e=256>F[t]?16:15,s.n=F[t++]):(s.e=m[F[t]-b],s.n=e[F[t++]-
b]);g=1<<q-v;for(n=A>>v;n<u;n+=g)r[n].e=s.e,r[n].b=s.b,r[n].n=s.n,r[n].t=s.t;for(n=1<<q-1;0!==(A&n);n>>=1)A^=n;for(A^=n;(A&(1<<v)-1)!==G[k];)v-=p[k],k--}this.m=p[1];this.status=0!==D&&1!==h?1:0}}}function h(b){for(;a<b;){var e=c,m;m=s.length===A?-1:s[A++];c=e|m<<a;a+=8}}function b(a){return c&J[a]}function p(b){c>>=b;a-=b}function d(a,c,e){var f,d,l;if(0===e)return 0;for(l=0;;){h(v);d=z.list[b(v)];for(f=d.e;16<f;){if(99===f)return-1;p(d.b);f-=16;h(f);d=d.t[b(f)];f=d.e}p(d.b);if(16===f)q&=32767,a[c+
l++]=g[q++]=d.n;else{if(15===f)break;h(f);t=d.n+b(f);p(f);h(u);d=x.list[b(u)];for(f=d.e;16<f;){if(99===f)return-1;p(d.b);f-=16;h(f);d=d.t[b(f)];f=d.e}p(d.b);h(f);w=q-d.n-b(f);for(p(f);0<t&&l<e;)t--,w&=32767,q&=32767,a[c+l++]=g[q++]=g[w++]}if(l===e)return e}m=-1;return l}function n(a,c,e){var m,f,l,g,A,n,q,t=Array(316);for(m=0;m<t.length;m++)t[m]=0;h(5);n=257+b(5);p(5);h(5);q=1+b(5);p(5);h(4);m=4+b(4);p(4);if(286<n||30<q)return-1;for(f=0;f<m;f++)h(3),t[K[f]]=b(3),p(3);for(f=m;19>f;f++)t[K[f]]=0;v=
7;f=new k(t,19,19,null,null,v);if(0!==f.status)return-1;z=f.root;v=f.m;g=n+q;for(m=l=0;m<g;)if(h(v),A=z.list[b(v)],f=A.b,p(f),f=A.n,16>f)t[m++]=l=f;else if(16===f){h(2);f=3+b(2);p(2);if(m+f>g)return-1;for(;0<f--;)t[m++]=l}else{17===f?(h(3),f=3+b(3),p(3)):(h(7),f=11+b(7),p(7));if(m+f>g)return-1;for(;0<f--;)t[m++]=0;l=0}v=9;f=new k(t,n,257,G,D,v);0===v&&(f.status=1);if(0!==f.status)return-1;z=f.root;v=f.m;for(m=0;m<q;m++)t[m]=t[m+n];u=6;f=new k(t,q,0,F,O,u);x=f.root;u=f.m;return 0===u&&257<n||0!==f.status?
-1:d(a,c,e)}var g=[],q,r=null,l,f,c,a,m,e,t,w,z,x,v,u,s,A,J=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],G=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],D=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],F=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],O=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],K=[16,17,18,0,8,7,9,6,
10,5,11,4,12,3,13,2,14,1,15],Z;this.inflate=function(J,K){g.length=65536;a=c=q=0;m=-1;e=!1;t=w=0;z=null;s=J;A=0;var H=new Uint8Array(new ArrayBuffer(K));a:for(var T=0,y;T<K&&(!e||-1!==m);){if(0<t){if(0!==m)for(;0<t&&T<K;)t--,w&=32767,q&=32767,H[0+T]=g[q]=g[w],T+=1,q+=1,w+=1;else{for(;0<t&&T<K;)t-=1,q&=32767,h(8),H[0+T]=g[q]=b(8),T+=1,q+=1,p(8);0===t&&(m=-1)}if(T===K)break}if(-1===m){if(e)break;h(1);0!==b(1)&&(e=!0);p(1);h(2);m=b(2);p(2);z=null;t=0}switch(m){case 0:y=H;var aa=0+T,N=K-T,R=void 0,R=
a&7;p(R);h(16);R=b(16);p(16);h(16);if(R!==(~c&65535))y=-1;else{p(16);t=R;for(R=0;0<t&&R<N;)t--,q&=32767,h(8),y[aa+R++]=g[q++]=b(8),p(8);0===t&&(m=-1);y=R}break;case 1:if(null!==z)y=d(H,0+T,K-T);else b:{y=H;aa=0+T;N=K-T;if(null===r){for(var I=void 0,R=Array(288),I=void 0,I=0;144>I;I++)R[I]=8;for(I=144;256>I;I++)R[I]=9;for(I=256;280>I;I++)R[I]=7;for(I=280;288>I;I++)R[I]=8;f=7;I=new k(R,288,257,G,D,f);if(0!==I.status){alert("HufBuild error: "+I.status);y=-1;break b}r=I.root;f=I.m;for(I=0;30>I;I++)R[I]=
5;Z=5;I=new k(R,30,0,F,O,Z);if(1<I.status){r=null;alert("HufBuild error: "+I.status);y=-1;break b}l=I.root;Z=I.m}z=r;x=l;v=f;u=Z;y=d(y,aa,N)}break;case 2:y=null!==z?d(H,0+T,K-T):n(H,0+T,K-T);break;default:y=-1}if(-1===y)break a;T+=y}s=new Uint8Array(new ArrayBuffer(0));return H}};
// Input 16
core.ScheduledTask=function(k,h){function b(){n&&(runtime.clearTimeout(d),n=!1)}function p(){b();k.apply(void 0,g);g=null}var d,n=!1,g=[];this.trigger=function(){g=Array.prototype.slice.call(arguments);n||(n=!0,d=runtime.setTimeout(p,h))};this.triggerImmediate=function(){g=Array.prototype.slice.call(arguments);p()};this.processRequests=function(){n&&p()};this.cancel=b;this.destroy=function(d){b();d()}};
// Input 17
/*

 Copyright (C) 2014 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
core.StepIterator=function(k,h){function b(){f=null;a=c=void 0}function p(){void 0===a&&(a=k.acceptPosition(h)===l);return a}function d(a,c){b();return h.setUnfilteredPosition(a,c)}function n(){f||(f=h.container());return f}function g(){void 0===c&&(c=h.unfilteredDomOffset());return c}function q(){for(b();h.nextPosition();)if(b(),p())return!0;return!1}function r(){for(b();h.previousPosition();)if(b(),p())return!0;return!1}var l=core.PositionFilter.FilterResult.FILTER_ACCEPT,f,c,a;this.isStep=p;this.setPosition=
d;this.container=n;this.offset=g;this.nextStep=q;this.previousStep=r;this.roundToClosestStep=function(){var a=n(),c=g(),b=p();b||(b=r(),b||(d(a,c),b=q()));return b};this.roundToPreviousStep=function(){var a=p();a||(a=r());return a};this.roundToNextStep=function(){var a=p();a||(a=q());return a}};
// Input 18
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var k=runtime.getWindow().document,h=k.getElementById("testarea");runtime.assert(!h,'Unclean test environment, found a div with id "testarea".');h=k.createElement("div");h.setAttribute("id","testarea");k.body.appendChild(h);return h};
core.UnitTest.cleanupTestAreaDiv=function(){var k=runtime.getWindow().document,h=k.getElementById("testarea");runtime.assert(!!h&&h.parentNode===k.body,'Test environment broken, found no div with id "testarea" below body.');k.body.removeChild(h)};core.UnitTest.createOdtDocument=function(k,h){var b="<?xml version='1.0' encoding='UTF-8'?>",b=b+"<office:document";Object.keys(h).forEach(function(k){b+=" xmlns:"+k+'="'+h[k]+'"'});b+=">";b+=k;b+="</office:document>";return runtime.parseXML(b)};
core.UnitTestLogger=function(){var k=[],h=0,b=0,p="",d="";this.startTest=function(n,g){k=[];h=0;p=n;d=g;b=(new Date).getTime()};this.endTest=function(){var n=(new Date).getTime();return{description:d,suite:[p,d],success:0===h,log:k,time:n-b}};this.debug=function(b){k.push({category:"debug",message:b})};this.fail=function(b){h+=1;k.push({category:"fail",message:b})};this.pass=function(b){k.push({category:"pass",message:b})}};
core.UnitTestRunner=function(k,h){function b(a){r+=1;c?h.debug(a):h.fail(a)}function p(a,c){var e;try{if(a.length!==c.length)return b("array of length "+a.length+" should be "+c.length+" long"),!1;for(e=0;e<a.length;e+=1)if(a[e]!==c[e])return b(a[e]+" should be "+c[e]+" at array index "+e),!1}catch(f){return!1}return!0}function d(a,c,e){var f=a.attributes,l=f.length,g,n,h;for(g=0;g<l;g+=1)if(n=f.item(g),"xmlns"!==n.prefix&&"urn:webodf:names:steps"!==n.namespaceURI){h=c.getAttributeNS(n.namespaceURI,
n.localName);if(!c.hasAttributeNS(n.namespaceURI,n.localName))return b("Attribute "+n.localName+" with value "+n.value+" was not present"),!1;if(h!==n.value)return b("Attribute "+n.localName+" was "+h+" should be "+n.value),!1}return e?!0:d(c,a,!0)}function n(a,c){var e,f;e=a.nodeType;f=c.nodeType;if(e!==f)return b("Nodetype '"+e+"' should be '"+f+"'"),!1;if(e===Node.TEXT_NODE){if(a.data===c.data)return!0;b("Textnode data '"+a.data+"' should be '"+c.data+"'");return!1}runtime.assert(e===Node.ELEMENT_NODE,
"Only textnodes and elements supported.");if(a.namespaceURI!==c.namespaceURI)return b("namespace '"+a.namespaceURI+"' should be '"+c.namespaceURI+"'"),!1;if(a.localName!==c.localName)return b("localName '"+a.localName+"' should be '"+c.localName+"'"),!1;if(!d(a,c,!1))return!1;e=a.firstChild;for(f=c.firstChild;e;){if(!f)return b("Nodetype '"+e.nodeType+"' is unexpected here."),!1;if(!n(e,f))return!1;e=e.nextSibling;f=f.nextSibling}return f?(b("Nodetype '"+f.nodeType+"' is missing here."),!1):!0}function g(a,
c){return 0===c?a===c&&1/a===1/c:a===c?!0:null===a||null===c?!1:"number"===typeof c&&isNaN(c)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(c)===Object.prototype.toString.call([])?p(a,c):"object"===typeof c&&"object"===typeof a?c.constructor===Element||c.constructor===Node?n(a,c):f(a,c):!1}function q(a,c,e){"string"===typeof c&&"string"===typeof e||h.debug("WARN: shouldBe() expects string arguments");var f,d;try{d=eval(c)}catch(l){f=l}a=eval(e);f?b(c+" should be "+a+". Threw exception "+
f):g(d,a)?h.pass(c+" is "+e):String(typeof d)===String(typeof a)?(e=0===d&&0>1/d?"-0":String(d),b(c+" should be "+a+". Was "+e+".")):b(c+" should be "+a+" (of type "+typeof a+"). Was "+d+" (of type "+typeof d+").")}var r=0,l,f,c=!1;this.resourcePrefix=function(){return k};this.beginExpectFail=function(){l=r;c=!0};this.endExpectFail=function(){var a=l===r;c=!1;r=l;a&&(r+=1,h.fail("Expected at least one failed test, but none registered."))};f=function(a,c){var e=Object.keys(a),f=Object.keys(c);e.sort();
f.sort();return p(e,f)&&Object.keys(a).every(function(e){var f=a[e],d=c[e];return g(f,d)?!0:(b(f+" should be "+d+" for key "+e),!1)})};this.areNodesEqual=n;this.shouldBeNull=function(a,c){q(a,c,"null")};this.shouldBeNonNull=function(a,c){var e,f;try{f=eval(c)}catch(d){e=d}e?b(c+" should be non-null. Threw exception "+e):null!==f?h.pass(c+" is non-null."):b(c+" should be non-null. Was "+f)};this.shouldBe=q;this.testFailed=b;this.countFailedTests=function(){return r};this.name=function(a){var c,b,f=
[],d=a.length;f.length=d;for(c=0;c<d;c+=1){b=Runtime.getFunctionName(a[c])||"";if(""===b)throw"Found a function without a name.";f[c]={f:a[c],name:b}}return f}};
core.UnitTester=function(){function k(b,d){return"<span style='color:blue;cursor:pointer' onclick='"+d+"'>"+b+"</span>"}function h(d){b.reporter&&b.reporter(d)}var b=this,p=0,d=new core.UnitTestLogger,n={},g="BrowserRuntime"===runtime.type();this.resourcePrefix="";this.reporter=function(b){var d,l;g?runtime.log("<span>Running "+k(b.description,'runTest("'+b.suite[0]+'","'+b.description+'")')+"</span>"):runtime.log("Running "+b.description);if(!b.success)for(d=0;d<b.log.length;d+=1)l=b.log[d],runtime.log(l.category,
l.message)};this.runTests=function(q,r,l){function f(b){if(0===b.length)n[c]=e,p+=a.countFailedTests(),r();else{w=b[0].f;var g=b[0].name,k=!0===b[0].expectFail;v=a.countFailedTests();l.length&&-1===l.indexOf(g)?f(b.slice(1)):(m.setUp(),d.startTest(c,g),k&&a.beginExpectFail(),w(function(){k&&a.endExpectFail();h(d.endTest());m.tearDown();e[g]=v===a.countFailedTests();f(b.slice(1))}))}}var c=Runtime.getFunctionName(q)||"",a=new core.UnitTestRunner(b.resourcePrefix,d),m=new q(a),e={},t,w,z,x,v;if(n.hasOwnProperty(c))runtime.log("Test "+
c+" has already run.");else{g?runtime.log("<span>Running "+k(c,'runSuite("'+c+'");')+": "+m.description()+"</span>"):runtime.log("Running "+c+": "+m.description);z=m.tests();for(t=0;t<z.length;t+=1)if(w=z[t].f,q=z[t].name,x=!0===z[t].expectFail,!l.length||-1!==l.indexOf(q)){v=a.countFailedTests();m.setUp();d.startTest(c,q);x&&a.beginExpectFail();try{w()}catch(u){a.testFailed("Unexpected exception encountered: "+u.toString()+"\n"+u.stack)}x&&a.endExpectFail();h(d.endTest());m.tearDown();e[q]=v===a.countFailedTests()}f(m.asyncTests())}};
this.countFailedTests=function(){return p};this.results=function(){return n}};
// Input 19
core.Utils=function(){function k(h,b){if(b&&Array.isArray(b)){h=h||[];if(!Array.isArray(h))throw"Destination is not an array.";h=h.concat(b.map(function(b){return k(null,b)}))}else if(b&&"object"===typeof b){h=h||{};if("object"!==typeof h)throw"Destination is not an object.";Object.keys(b).forEach(function(p){h[p]=k(h[p],b[p])})}else h=b;return h}this.hashString=function(h){var b=0,k,d;k=0;for(d=h.length;k<d;k+=1)b=(b<<5)-b+h.charCodeAt(k),b|=0;return b};this.mergeObjects=function(h,b){Object.keys(b).forEach(function(p){h[p]=
k(h[p],b[p])});return h}};
// Input 20
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
core.Zip=function(k,h){function b(a){var c=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,e,f=a.length,d=0,d=0;b=-1;for(e=0;e<f;e+=1)d=(b^a[e])&255,d=c[d],b=b>>>8^d;return b^-1}function p(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function d(a){var c=a.getFullYear();return 1980>c?0:c-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function n(a,c){var b,f,d,m,l,g,n,k=this;this.load=function(c){if(null!==k.data)c(null,k.data);else{var b=l+34+f+d+256;b+n>e&&(b=e-n);runtime.read(a,n,b,function(b,e){if(b||null===e)c(b,e);else a:{var f=e,d=new core.ByteArray(f),n=d.readUInt32LE(),h;if(67324752!==n)c("File entry signature is wrong."+n.toString()+" "+f.length.toString(),null);else{d.pos+=22;n=d.readUInt16LE();h=d.readUInt16LE();d.pos+=n+h;if(m){f=
f.subarray(d.pos,d.pos+l);if(l!==f.length){c("The amount of compressed bytes read was "+f.length.toString()+" instead of "+l.toString()+" for "+k.filename+" in "+a+".",null);break a}f=w(f,g)}else f=f.subarray(d.pos,d.pos+g);g!==f.length?c("The amount of bytes read was "+f.length.toString()+" instead of "+g.toString()+" for "+k.filename+" in "+a+".",null):(k.data=f,c(null,f))}}})}};this.set=function(a,c,b,e){k.filename=a;k.data=c;k.compressed=b;k.date=e};this.error=null;c&&(b=c.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+a+'": '+c.data.length.toString():(c.pos+=6,m=c.readUInt16LE(),this.date=p(c.readUInt32LE()),c.readUInt32LE(),l=c.readUInt32LE(),g=c.readUInt32LE(),f=c.readUInt16LE(),d=c.readUInt16LE(),b=c.readUInt16LE(),c.pos+=8,n=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.subarray(c.pos,c.pos+f),"utf8"),this.data=null,c.pos+=f+d+b))}function g(a,c){if(22!==a.length)c("Central directory length should be 22.",
z);else{var b=new core.ByteArray(a),f;f=b.readUInt32LE();101010256!==f?c("Central directory signature is wrong: "+f.toString(),z):(f=b.readUInt16LE(),0!==f?c("Zip files with non-zero disk numbers are not supported.",z):(f=b.readUInt16LE(),0!==f?c("Zip files with non-zero disk numbers are not supported.",z):(f=b.readUInt16LE(),t=b.readUInt16LE(),f!==t?c("Number of entries is inconsistent.",z):(f=b.readUInt32LE(),b=b.readUInt16LE(),b=e-22-f,runtime.read(k,b,e-b,function(a,b){if(a||null===b)c(a,z);else a:{var e=
new core.ByteArray(b),f,d;m=[];for(f=0;f<t;f+=1){d=new n(k,e);if(d.error){c(d.error,z);break a}m[m.length]=d}c(null,z)}})))))}}function q(a,c){var b=null,e,f;for(f=0;f<m.length;f+=1)if(e=m[f],e.filename===a){b=e;break}b?b.data?c(null,b.data):b.load(c):c(a+" not found.",null)}function r(a){var c=new core.ByteArrayWriter("utf8"),e=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(e=a.data.length);c.appendUInt32LE(d(a.date));c.appendUInt32LE(a.data?b(a.data):0);c.appendUInt32LE(e);c.appendUInt32LE(e);
c.appendUInt16LE(a.filename.length);c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function l(a,c){var e=new core.ByteArrayWriter("utf8"),f=0;e.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(f=a.data.length);e.appendUInt32LE(d(a.date));e.appendUInt32LE(a.data?b(a.data):0);e.appendUInt32LE(f);e.appendUInt32LE(f);e.appendUInt16LE(a.filename.length);e.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);e.appendUInt32LE(c);e.appendString(a.filename);return e}function f(a,
c){if(a===m.length)c(null);else{var b=m[a];null!==b.data?f(a+1,c):b.load(function(b){b?c(b):f(a+1,c)})}}function c(a,c){f(0,function(b){if(b)c(b);else{var e,f,d=new core.ByteArrayWriter("utf8"),g=[0];for(e=0;e<m.length;e+=1)d.appendByteArrayWriter(r(m[e])),g.push(d.getLength());b=d.getLength();for(e=0;e<m.length;e+=1)f=m[e],d.appendByteArrayWriter(l(f,g[e]));e=d.getLength()-b;d.appendArray([80,75,5,6,0,0,0,0]);d.appendUInt16LE(m.length);d.appendUInt16LE(m.length);d.appendUInt32LE(e);d.appendUInt32LE(b);
d.appendArray([0,0]);a(d.getByteArray())}})}function a(a,b){c(function(c){runtime.writeFile(a,c,b)},b)}var m,e,t,w=(new core.RawInflate).inflate,z=this,x=new core.Base64;this.load=q;this.save=function(a,c,b,e){var f,d;for(f=0;f<m.length;f+=1)if(d=m[f],d.filename===a){d.set(a,c,b,e);return}d=new n(k);d.set(a,c,b,e);m.push(d)};this.remove=function(a){var c,b;for(c=0;c<m.length;c+=1)if(b=m[c],b.filename===a)return m.splice(c,1),!0;return!1};this.write=function(c){a(k,c)};this.writeAs=a;this.createByteArray=
c;this.loadContentXmlAsFragments=function(a,c){z.loadAsString(a,function(a,b){if(a)return c.rootElementReady(a);c.rootElementReady(null,b,!0)})};this.loadAsString=function(a,c){q(a,function(a,b){if(a||null===b)return c(a,null);var e=runtime.byteArrayToString(b,"utf8");c(null,e)})};this.loadAsDOM=function(a,c){z.loadAsString(a,function(a,b){if(a||null===b)c(a,null);else{var e=(new DOMParser).parseFromString(b,"text/xml");c(null,e)}})};this.loadAsDataURL=function(a,c,b){q(a,function(a,e){if(a||!e)return b(a,
null);var f=0,d;c||(c=80===e[1]&&78===e[2]&&71===e[3]?"image/png":255===e[0]&&216===e[1]&&255===e[2]?"image/jpeg":71===e[0]&&73===e[1]&&70===e[2]?"image/gif":"");for(d="data:"+c+";base64,";f<e.length;)d+=x.convertUTF8ArrayToBase64(e.subarray(f,Math.min(f+45E3,e.length))),f+=45E3;b(null,d)})};this.getEntries=function(){return m.slice()};e=-1;null===h?m=[]:runtime.getFileSize(k,function(a){e=a;0>e?h("File '"+k+"' cannot be read.",z):runtime.read(k,e-22,22,function(a,c){a||null===h||null===c?h(a,z):
g(c,h)})})};
// Input 21
xmldom.LSSerializerFilter=function(){};xmldom.LSSerializerFilter.prototype.acceptNode=function(k){};
// Input 22
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.OdfNodeFilter=function(){this.acceptNode=function(k){return"http://www.w3.org/1999/xhtml"===k.namespaceURI?NodeFilter.FILTER_SKIP:k.namespaceURI&&k.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
// Input 23
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.Namespaces={namespaceMap:{db:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",dc:"http://purl.org/dc/elements/1.1/",dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chart:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",form:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",meta:"urn:oasis:names:tc:opendocument:xmlns:meta:1.0",number:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},prefixMap:{},dbns:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",
dcns:"http://purl.org/dc/elements/1.1/",dr3dns:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",drawns:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chartns:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fons:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",formns:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",metans:"urn:oasis:names:tc:opendocument:xmlns:meta:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",officens:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
presentationns:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",stylens:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svgns:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",tablens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",textns:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlinkns:"http://www.w3.org/1999/xlink",xmlns:"http://www.w3.org/XML/1998/namespace"};
(function(){var k=odf.Namespaces.namespaceMap,h=odf.Namespaces.prefixMap,b;for(b in k)k.hasOwnProperty(b)&&(h[k[b]]=b)})();odf.Namespaces.forEachPrefix=function(k){var h=odf.Namespaces.namespaceMap,b;for(b in h)h.hasOwnProperty(b)&&k(b,h[b])};odf.Namespaces.lookupNamespaceURI=function(k){var h=null;odf.Namespaces.namespaceMap.hasOwnProperty(k)&&(h=odf.Namespaces.namespaceMap[k]);return h};odf.Namespaces.lookupPrefix=function(k){var h=odf.Namespaces.prefixMap;return h.hasOwnProperty(k)?h[k]:null};
odf.Namespaces.lookupNamespaceURI.lookupNamespaceURI=odf.Namespaces.lookupNamespaceURI;
// Input 24
xmldom.XPathIterator=function(){};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};
function createXPathSingleton(){function k(b,c,a){return-1!==b&&(b<c||-1===c)&&(b<a||-1===a)}function h(b){for(var c=[],a=0,d=b.length,e;a<d;){var g=b,n=d,h=c,q="",p=[],r=g.indexOf("[",a),s=g.indexOf("/",a),A=g.indexOf("=",a);k(s,r,A)?(q=g.substring(a,s),a=s+1):k(r,s,A)?(q=g.substring(a,r),a=l(g,r,p)):k(A,s,r)?(q=g.substring(a,A),a=A):(q=g.substring(a,n),a=n);h.push({location:q,predicates:p});if(a<d&&"="===b[a]){e=b.substring(a+1,d);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);
else try{e=parseInt(e,10)}catch(J){}a=d}}return{steps:c,value:e}}function b(){var b=null,c=!1;this.setNode=function(a){b=a};this.reset=function(){c=!1};this.next=function(){var a=c?null:b;c=!0;return a}}function p(b,c,a){this.reset=function(){b.reset()};this.next=function(){for(var d=b.next();d;){d.nodeType===Node.ELEMENT_NODE&&(d=d.getAttributeNodeNS(c,a));if(d)break;d=b.next()}return d}}function d(b,c){var a=b.next(),d=null;this.reset=function(){b.reset();a=b.next();d=null};this.next=function(){for(;a;){if(d)if(c&&
d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&d!==a;)d=d.parentNode;d===a?a=b.next():d=d.nextSibling}else{do(d=a.firstChild)||(a=b.next());while(a&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function n(b,c){this.reset=function(){b.reset()};this.next=function(){for(var a=b.next();a&&!c(a);)a=b.next();return a}}function g(b,c,a){c=c.split(":",2);var d=a(c[0]),e=c[1];return new n(b,function(a){return a.localName===e&&a.namespaceURI===d})}function q(d,c,a){var m=new b,e=r(m,
c,a),g=c.value;return void 0===g?new n(d,function(a){m.setNode(a);e.reset();return null!==e.next()}):new n(d,function(a){m.setNode(a);e.reset();return(a=e.next())?a.nodeValue===g:!1})}var r,l;l=function(b,c,a){for(var d=c,e=b.length,g=0;d<e;)"]"===b[d]?(g-=1,0>=g&&a.push(h(b.substring(c,d)))):"["===b[d]&&(0>=g&&(c=d+1),g+=1),d+=1;return d};r=function(b,c,a){var m,e,l,n;for(m=0;m<c.steps.length;m+=1){l=c.steps[m];e=l.location;if(""===e)b=new d(b,!1);else if("@"===e[0]){e=e.substr(1).split(":",2);n=
a(e[0]);if(!n)throw"No namespace associated with the prefix "+e[0];b=new p(b,n,e[1])}else"."!==e&&(b=new d(b,!1),-1!==e.indexOf(":")&&(b=g(b,e,a)));for(e=0;e<l.predicates.length;e+=1)n=l.predicates[e],b=q(b,n,a)}return b};return{getODFElementsWithXPath:function(d,c,a){var m=d.ownerDocument,e=[],g=null;if(m&&"function"===typeof m.evaluate)for(a=m.evaluate(c,d,a,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),g=a.iterateNext();null!==g;)g.nodeType===Node.ELEMENT_NODE&&e.push(g),g=a.iterateNext();else{e=
new b;e.setNode(d);d=h(c);e=r(e,d,a);d=[];for(a=e.next();a;)d.push(a),a=e.next();e=d}return e}}}xmldom.XPath=createXPathSingleton();
// Input 25
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.StyleInfo=function(){function k(a,c){var b,e,d,f,m,g=0;if(b=G[a.localName])if(d=b[a.namespaceURI])g=d.length;for(b=0;b<g;b+=1)e=d[b],f=e.ns,m=e.localname,(e=a.getAttributeNS(f,m))&&a.setAttributeNS(f,A[f]+m,c+e);for(d=a.firstElementChild;d;)k(d,c),d=d.nextElementSibling}function h(a,c){var b,e,d,f,m,g=0;if(b=G[a.localName])if(d=b[a.namespaceURI])g=d.length;for(b=0;b<g;b+=1)if(e=d[b],f=e.ns,m=e.localname,e=a.getAttributeNS(f,m))e=e.replace(c,""),a.setAttributeNS(f,A[f]+m,e);for(d=a.firstElementChild;d;)h(d,
c),d=d.nextElementSibling}function b(a,c){var b,e,d,f,m,g=0;if(b=G[a.localName])if(d=b[a.namespaceURI])g=d.length;for(b=0;b<g;b+=1)if(f=d[b],e=f.ns,m=f.localname,e=a.getAttributeNS(e,m))c=c||{},f=f.keyname,c.hasOwnProperty(f)?c[f][e]=1:(m={},m[e]=1,c[f]=m);return c}function p(a,c){var e,d;b(a,c);for(e=a.firstChild;e;)e.nodeType===Node.ELEMENT_NODE&&(d=e,p(d,c)),e=e.nextSibling}function d(a,c,b){this.key=a;this.name=c;this.family=b;this.requires={}}function n(a,c,b){var e=a+'"'+c,f=b[e];f||(f=b[e]=
new d(e,a,c));return f}function g(a,c,b){var e,d,f,m,l,k=0;e=a.getAttributeNS(v,"name");m=a.getAttributeNS(v,"family");e&&m&&(c=n(e,m,b));if(c){if(e=G[a.localName])if(f=e[a.namespaceURI])k=f.length;for(e=0;e<k;e+=1)if(m=f[e],d=m.ns,l=m.localname,d=a.getAttributeNS(d,l))m=m.keyname,m=n(d,m,b),c.requires[m.key]=m}for(a=a.firstElementChild;a;)g(a,c,b),a=a.nextElementSibling;return b}function q(a,c){var b=c[a.family];b||(b=c[a.family]={});b[a.name]=1;Object.keys(a.requires).forEach(function(b){q(a.requires[b],
c)})}function r(a,c){var b=g(a,null,{});Object.keys(b).forEach(function(a){a=b[a];var e=c[a.family];e&&e.hasOwnProperty(a.name)&&q(a,c)})}function l(a,c){function b(c){(c=f.getAttributeNS(v,c))&&(a[c]=!0)}var e=["font-name","font-name-asian","font-name-complex"],d,f;for(d=c&&c.firstElementChild;d;)f=d,e.forEach(b),l(a,f),d=d.nextElementSibling}function f(a,c){function b(a){var e=m.getAttributeNS(v,a);e&&c.hasOwnProperty(e)&&m.setAttributeNS(v,"style:"+a,c[e])}var e=["font-name","font-name-asian",
"font-name-complex"],d,m;for(d=a&&a.firstElementChild;d;)m=d,e.forEach(b),f(m,c),d=d.nextElementSibling}var c=odf.Namespaces.chartns,a=odf.Namespaces.dbns,m=odf.Namespaces.dr3dns,e=odf.Namespaces.drawns,t=odf.Namespaces.formns,w=odf.Namespaces.numberns,z=odf.Namespaces.officens,x=odf.Namespaces.presentationns,v=odf.Namespaces.stylens,u=odf.Namespaces.tablens,s=odf.Namespaces.textns,A={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},J={text:[{ens:v,en:"tab-stop",ans:v,a:"leader-text-style"},{ens:v,en:"drop-cap",ans:v,a:"style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-body-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-style-name"},{ens:s,en:"a",ans:s,a:"style-name"},{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"linenumbering-configuration",
ans:s,a:"style-name"},{ens:s,en:"list-level-style-number",ans:s,a:"style-name"},{ens:s,en:"ruby-text",ans:s,a:"style-name"},{ens:s,en:"span",ans:s,a:"style-name"},{ens:s,en:"a",ans:s,a:"visited-style-name"},{ens:v,en:"text-properties",ans:v,a:"text-line-through-text-style"},{ens:s,en:"alphabetical-index-source",ans:s,a:"main-entry-style-name"},{ens:s,en:"index-entry-bibliography",ans:s,a:"style-name"},{ens:s,en:"index-entry-chapter",ans:s,a:"style-name"},{ens:s,en:"index-entry-link-end",ans:s,a:"style-name"},
{ens:s,en:"index-entry-link-start",ans:s,a:"style-name"},{ens:s,en:"index-entry-page-number",ans:s,a:"style-name"},{ens:s,en:"index-entry-span",ans:s,a:"style-name"},{ens:s,en:"index-entry-tab-stop",ans:s,a:"style-name"},{ens:s,en:"index-entry-text",ans:s,a:"style-name"},{ens:s,en:"index-title-template",ans:s,a:"style-name"},{ens:s,en:"list-level-style-bullet",ans:s,a:"style-name"},{ens:s,en:"outline-level-style",ans:s,a:"style-name"}],paragraph:[{ens:e,en:"caption",ans:e,a:"text-style-name"},{ens:e,
en:"circle",ans:e,a:"text-style-name"},{ens:e,en:"connector",ans:e,a:"text-style-name"},{ens:e,en:"control",ans:e,a:"text-style-name"},{ens:e,en:"custom-shape",ans:e,a:"text-style-name"},{ens:e,en:"ellipse",ans:e,a:"text-style-name"},{ens:e,en:"frame",ans:e,a:"text-style-name"},{ens:e,en:"line",ans:e,a:"text-style-name"},{ens:e,en:"measure",ans:e,a:"text-style-name"},{ens:e,en:"path",ans:e,a:"text-style-name"},{ens:e,en:"polygon",ans:e,a:"text-style-name"},{ens:e,en:"polyline",ans:e,a:"text-style-name"},
{ens:e,en:"rect",ans:e,a:"text-style-name"},{ens:e,en:"regular-polygon",ans:e,a:"text-style-name"},{ens:z,en:"annotation",ans:e,a:"text-style-name"},{ens:t,en:"column",ans:t,a:"text-style-name"},{ens:v,en:"style",ans:v,a:"next-style-name"},{ens:u,en:"body",ans:u,a:"paragraph-style-name"},{ens:u,en:"even-columns",ans:u,a:"paragraph-style-name"},{ens:u,en:"even-rows",ans:u,a:"paragraph-style-name"},{ens:u,en:"first-column",ans:u,a:"paragraph-style-name"},{ens:u,en:"first-row",ans:u,a:"paragraph-style-name"},
{ens:u,en:"last-column",ans:u,a:"paragraph-style-name"},{ens:u,en:"last-row",ans:u,a:"paragraph-style-name"},{ens:u,en:"odd-columns",ans:u,a:"paragraph-style-name"},{ens:u,en:"odd-rows",ans:u,a:"paragraph-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"default-style-name"},{ens:s,en:"alphabetical-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"bibliography-entry-template",ans:s,a:"style-name"},{ens:s,en:"h",ans:s,a:"style-name"},{ens:s,en:"illustration-index-entry-template",ans:s,a:"style-name"},
{ens:s,en:"index-source-style",ans:s,a:"style-name"},{ens:s,en:"object-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"p",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-of-content-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"user-index-entry-template",ans:s,a:"style-name"},{ens:v,en:"page-layout-properties",ans:v,a:"register-truth-ref-style-name"}],chart:[{ens:c,en:"axis",ans:c,
a:"style-name"},{ens:c,en:"chart",ans:c,a:"style-name"},{ens:c,en:"data-label",ans:c,a:"style-name"},{ens:c,en:"data-point",ans:c,a:"style-name"},{ens:c,en:"equation",ans:c,a:"style-name"},{ens:c,en:"error-indicator",ans:c,a:"style-name"},{ens:c,en:"floor",ans:c,a:"style-name"},{ens:c,en:"footer",ans:c,a:"style-name"},{ens:c,en:"grid",ans:c,a:"style-name"},{ens:c,en:"legend",ans:c,a:"style-name"},{ens:c,en:"mean-value",ans:c,a:"style-name"},{ens:c,en:"plot-area",ans:c,a:"style-name"},{ens:c,en:"regression-curve",
ans:c,a:"style-name"},{ens:c,en:"series",ans:c,a:"style-name"},{ens:c,en:"stock-gain-marker",ans:c,a:"style-name"},{ens:c,en:"stock-loss-marker",ans:c,a:"style-name"},{ens:c,en:"stock-range-line",ans:c,a:"style-name"},{ens:c,en:"subtitle",ans:c,a:"style-name"},{ens:c,en:"title",ans:c,a:"style-name"},{ens:c,en:"wall",ans:c,a:"style-name"}],section:[{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"bibliography",ans:s,a:"style-name"},{ens:s,en:"illustration-index",ans:s,a:"style-name"},
{ens:s,en:"index-title",ans:s,a:"style-name"},{ens:s,en:"object-index",ans:s,a:"style-name"},{ens:s,en:"section",ans:s,a:"style-name"},{ens:s,en:"table-of-content",ans:s,a:"style-name"},{ens:s,en:"table-index",ans:s,a:"style-name"},{ens:s,en:"user-index",ans:s,a:"style-name"}],ruby:[{ens:s,en:"ruby",ans:s,a:"style-name"}],table:[{ens:a,en:"query",ans:a,a:"style-name"},{ens:a,en:"table-representation",ans:a,a:"style-name"},{ens:u,en:"background",ans:u,a:"style-name"},{ens:u,en:"table",ans:u,a:"style-name"}],
"table-column":[{ens:a,en:"column",ans:a,a:"style-name"},{ens:u,en:"table-column",ans:u,a:"style-name"}],"table-row":[{ens:a,en:"query",ans:a,a:"default-row-style-name"},{ens:a,en:"table-representation",ans:a,a:"default-row-style-name"},{ens:u,en:"table-row",ans:u,a:"style-name"}],"table-cell":[{ens:a,en:"column",ans:a,a:"default-cell-style-name"},{ens:u,en:"table-column",ans:u,a:"default-cell-style-name"},{ens:u,en:"table-row",ans:u,a:"default-cell-style-name"},{ens:u,en:"body",ans:u,a:"style-name"},
{ens:u,en:"covered-table-cell",ans:u,a:"style-name"},{ens:u,en:"even-columns",ans:u,a:"style-name"},{ens:u,en:"covered-table-cell",ans:u,a:"style-name"},{ens:u,en:"even-columns",ans:u,a:"style-name"},{ens:u,en:"even-rows",ans:u,a:"style-name"},{ens:u,en:"first-column",ans:u,a:"style-name"},{ens:u,en:"first-row",ans:u,a:"style-name"},{ens:u,en:"last-column",ans:u,a:"style-name"},{ens:u,en:"last-row",ans:u,a:"style-name"},{ens:u,en:"odd-columns",ans:u,a:"style-name"},{ens:u,en:"odd-rows",ans:u,a:"style-name"},
{ens:u,en:"table-cell",ans:u,a:"style-name"}],graphic:[{ens:m,en:"cube",ans:e,a:"style-name"},{ens:m,en:"extrude",ans:e,a:"style-name"},{ens:m,en:"rotate",ans:e,a:"style-name"},{ens:m,en:"scene",ans:e,a:"style-name"},{ens:m,en:"sphere",ans:e,a:"style-name"},{ens:e,en:"caption",ans:e,a:"style-name"},{ens:e,en:"circle",ans:e,a:"style-name"},{ens:e,en:"connector",ans:e,a:"style-name"},{ens:e,en:"control",ans:e,a:"style-name"},{ens:e,en:"custom-shape",ans:e,a:"style-name"},{ens:e,en:"ellipse",ans:e,a:"style-name"},
{ens:e,en:"frame",ans:e,a:"style-name"},{ens:e,en:"g",ans:e,a:"style-name"},{ens:e,en:"line",ans:e,a:"style-name"},{ens:e,en:"measure",ans:e,a:"style-name"},{ens:e,en:"page-thumbnail",ans:e,a:"style-name"},{ens:e,en:"path",ans:e,a:"style-name"},{ens:e,en:"polygon",ans:e,a:"style-name"},{ens:e,en:"polyline",ans:e,a:"style-name"},{ens:e,en:"rect",ans:e,a:"style-name"},{ens:e,en:"regular-polygon",ans:e,a:"style-name"},{ens:z,en:"annotation",ans:e,a:"style-name"}],presentation:[{ens:m,en:"cube",ans:x,
a:"style-name"},{ens:m,en:"extrude",ans:x,a:"style-name"},{ens:m,en:"rotate",ans:x,a:"style-name"},{ens:m,en:"scene",ans:x,a:"style-name"},{ens:m,en:"sphere",ans:x,a:"style-name"},{ens:e,en:"caption",ans:x,a:"style-name"},{ens:e,en:"circle",ans:x,a:"style-name"},{ens:e,en:"connector",ans:x,a:"style-name"},{ens:e,en:"control",ans:x,a:"style-name"},{ens:e,en:"custom-shape",ans:x,a:"style-name"},{ens:e,en:"ellipse",ans:x,a:"style-name"},{ens:e,en:"frame",ans:x,a:"style-name"},{ens:e,en:"g",ans:x,a:"style-name"},
{ens:e,en:"line",ans:x,a:"style-name"},{ens:e,en:"measure",ans:x,a:"style-name"},{ens:e,en:"page-thumbnail",ans:x,a:"style-name"},{ens:e,en:"path",ans:x,a:"style-name"},{ens:e,en:"polygon",ans:x,a:"style-name"},{ens:e,en:"polyline",ans:x,a:"style-name"},{ens:e,en:"rect",ans:x,a:"style-name"},{ens:e,en:"regular-polygon",ans:x,a:"style-name"},{ens:z,en:"annotation",ans:x,a:"style-name"}],"drawing-page":[{ens:e,en:"page",ans:e,a:"style-name"},{ens:x,en:"notes",ans:e,a:"style-name"},{ens:v,en:"handout-master",
ans:e,a:"style-name"},{ens:v,en:"master-page",ans:e,a:"style-name"}],"list-style":[{ens:s,en:"list",ans:s,a:"style-name"},{ens:s,en:"numbered-paragraph",ans:s,a:"style-name"},{ens:s,en:"list-item",ans:s,a:"style-override"},{ens:v,en:"style",ans:v,a:"list-style-name"}],data:[{ens:v,en:"style",ans:v,a:"data-style-name"},{ens:v,en:"style",ans:v,a:"percentage-data-style-name"},{ens:x,en:"date-time-decl",ans:v,a:"data-style-name"},{ens:s,en:"creation-date",ans:v,a:"data-style-name"},{ens:s,en:"creation-time",
ans:v,a:"data-style-name"},{ens:s,en:"database-display",ans:v,a:"data-style-name"},{ens:s,en:"date",ans:v,a:"data-style-name"},{ens:s,en:"editing-duration",ans:v,a:"data-style-name"},{ens:s,en:"expression",ans:v,a:"data-style-name"},{ens:s,en:"meta-field",ans:v,a:"data-style-name"},{ens:s,en:"modification-date",ans:v,a:"data-style-name"},{ens:s,en:"modification-time",ans:v,a:"data-style-name"},{ens:s,en:"print-date",ans:v,a:"data-style-name"},{ens:s,en:"print-time",ans:v,a:"data-style-name"},{ens:s,
en:"table-formula",ans:v,a:"data-style-name"},{ens:s,en:"time",ans:v,a:"data-style-name"},{ens:s,en:"user-defined",ans:v,a:"data-style-name"},{ens:s,en:"user-field-get",ans:v,a:"data-style-name"},{ens:s,en:"user-field-input",ans:v,a:"data-style-name"},{ens:s,en:"variable-get",ans:v,a:"data-style-name"},{ens:s,en:"variable-input",ans:v,a:"data-style-name"},{ens:s,en:"variable-set",ans:v,a:"data-style-name"}],"page-layout":[{ens:x,en:"notes",ans:v,a:"page-layout-name"},{ens:v,en:"handout-master",ans:v,
a:"page-layout-name"},{ens:v,en:"master-page",ans:v,a:"page-layout-name"}]},G,D=xmldom.XPath;this.collectUsedFontFaces=l;this.changeFontFaceNames=f;this.UsedStyleList=function(a,c){var b={};this.uses=function(a){var c=a.localName,d=a.getAttributeNS(e,"name")||a.getAttributeNS(v,"name");a="style"===c?a.getAttributeNS(v,"family"):a.namespaceURI===w?"data":c;return(a=b[a])?0<a[d]:!1};p(a,b);c&&r(c,b)};this.hasDerivedStyles=function(a,c,b){var e=b.getAttributeNS(v,"name");b=b.getAttributeNS(v,"family");
return D.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+b+"']",c).length?!0:!1};this.prefixStyleNames=function(a,c,b){var d;if(a){for(d=a.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE){var f=d,m=c,g=f.getAttributeNS(e,"name"),l=void 0;g?l=e:(g=f.getAttributeNS(v,"name"))&&(l=v);l&&f.setAttributeNS(l,A[l]+"name",m+g)}d=d.nextSibling}k(a,c);b&&k(b,c)}};this.removePrefixFromStyleNames=function(a,c,b){var d=RegExp("^"+c);if(a){for(c=a.firstChild;c;){if(c.nodeType===
Node.ELEMENT_NODE){var f=c,m=d,g=f.getAttributeNS(e,"name"),l=void 0;g?l=e:(g=f.getAttributeNS(v,"name"))&&(l=v);l&&(g=g.replace(m,""),f.setAttributeNS(l,A[l]+"name",g))}c=c.nextSibling}h(a,d);b&&h(b,d)}};this.determineStylesForNode=b;G=function(){var a,c,b,e,d,f={},m,g,l,n;for(b in J)if(J.hasOwnProperty(b))for(e=J[b],c=e.length,a=0;a<c;a+=1)d=e[a],l=d.en,n=d.ens,f.hasOwnProperty(l)?m=f[l]:f[l]=m={},m.hasOwnProperty(n)?g=m[n]:m[n]=g=[],g.push({ns:d.ans,localname:d.a,keyname:b});return f}()};
// Input 26
"function"!==typeof Object.create&&(Object.create=function(k){var h=function(){};h.prototype=k;return new h});
xmldom.LSSerializer=function(){function k(b){var n=b||{},g=function(b){var c={},a;for(a in b)b.hasOwnProperty(a)&&(c[b[a]]=a);return c}(b),k=[n],h=[g],l=0;this.push=function(){l+=1;n=k[l]=Object.create(n);g=h[l]=Object.create(g)};this.pop=function(){k.pop();h.pop();l-=1;n=k[l];g=h[l]};this.getLocalNamespaceDefinitions=function(){return g};this.getQName=function(b){var c=b.namespaceURI,a=0,d;if(!c)return b.localName;if(d=g[c])return d+":"+b.localName;do{d||!b.prefix?(d="ns"+a,a+=1):d=b.prefix;if(n[d]===
c)break;if(!n[d]){n[d]=c;g[c]=d;break}d=null}while(null===d);return d+":"+b.localName}}function h(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function b(d,n){var g="",k=p.filter?p.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,r;if(k===NodeFilter.FILTER_ACCEPT&&n.nodeType===Node.ELEMENT_NODE){d.push();r=d.getQName(n);var l,f=n.attributes,c,a,m,e="",t;l="<"+r;c=f.length;for(a=0;a<c;a+=1)m=f.item(a),"http://www.w3.org/2000/xmlns/"!==
m.namespaceURI&&(t=p.filter?p.filter.acceptNode(m):NodeFilter.FILTER_ACCEPT,t===NodeFilter.FILTER_ACCEPT&&(t=d.getQName(m),m="string"===typeof m.value?h(m.value):m.value,e+=" "+(t+'="'+m+'"')));c=d.getLocalNamespaceDefinitions();for(a in c)c.hasOwnProperty(a)&&((f=c[a])?"xmlns"!==f&&(l+=" xmlns:"+c[a]+'="'+a+'"'):l+=' xmlns="'+a+'"');g+=l+(e+">")}if(k===NodeFilter.FILTER_ACCEPT||k===NodeFilter.FILTER_SKIP){for(k=n.firstChild;k;)g+=b(d,k),k=k.nextSibling;n.nodeValue&&(g+=h(n.nodeValue))}r&&(g+="</"+
r+">",d.pop());return g}var p=this;this.filter=null;this.writeToString=function(d,n){if(!d)return"";var g=new k(n);return b(g,d)}};
// Input 27
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
(function(){function k(c,a,b){for(c=c?c.firstChild:null;c;){if(c.localName===b&&c.namespaceURI===a)return c;c=c.nextSibling}return null}function h(c){var a,b=r.length;for(a=0;a<b;a+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===c.namespaceURI&&c.localName===r[a])return a;return-1}function b(c,a){var b=new n.UsedStyleList(c,a),e=new odf.OdfNodeFilter;this.acceptNode=function(c){var d=e.acceptNode(c);d===NodeFilter.FILTER_ACCEPT&&c.parentNode===a&&c.nodeType===Node.ELEMENT_NODE&&(d=b.uses(c)?
NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return d}}function p(c,a){var d=new b(c,a);this.acceptNode=function(a){var c=d.acceptNode(a);c!==NodeFilter.FILTER_ACCEPT||!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName||(c=NodeFilter.FILTER_REJECT);return c}}function d(c,a){if(a){var b=h(a),e,d=c.firstChild;if(-1!==b){for(;d;){e=h(d);if(-1!==e&&e>b)break;d=d.nextSibling}c.insertBefore(a,d)}}}var n=new odf.StyleInfo,
g=new core.DomUtils,q=odf.Namespaces.stylens,r="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),l=(new Date).getTime()+"_webodf_",f=new core.Base64;odf.ODFElement=function(){};odf.ODFDocumentElement=function(){};odf.ODFDocumentElement.prototype=new odf.ODFElement;odf.ODFDocumentElement.prototype.constructor=odf.ODFDocumentElement;odf.ODFDocumentElement.prototype.fontFaceDecls=null;odf.ODFDocumentElement.prototype.manifest=null;odf.ODFDocumentElement.prototype.settings=
null;odf.ODFDocumentElement.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";odf.ODFDocumentElement.localName="document";odf.AnnotationElement=function(){};odf.OdfPart=function(c,a,b,e){var d=this;this.size=0;this.type=null;this.name=c;this.container=b;this.url=null;this.mimetype=a;this.onstatereadychange=this.document=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.data="";this.load=function(){null!==e&&(this.mimetype=a,e.loadAsDataURL(c,a,function(a,c){a&&
runtime.log(a);d.url=c;if(d.onchange)d.onchange(d);if(d.onstatereadychange)d.onstatereadychange(d)}))}};odf.OdfPart.prototype.load=function(){};odf.OdfPart.prototype.getUrl=function(){return this.data?"data:;base64,"+f.toBase64(this.data):null};odf.OdfContainer=function a(m,e){function h(a){for(var b=a.firstChild,e;b;)e=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?h(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=e}function r(a){var b={},e,d,f=a.ownerDocument.createNodeIterator(a,
NodeFilter.SHOW_ELEMENT,null,!1);for(a=f.nextNode();a;)"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&("annotation"===a.localName?(e=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","name"))&&(b.hasOwnProperty(e)?runtime.log("Warning: annotation name used more than once with <office:annotation/>: '"+e+"'"):b[e]=a):"annotation-end"===a.localName&&((e=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","name"))?b.hasOwnProperty(e)?(d=b[e],d.annotationEndElement?
runtime.log("Warning: annotation name used more than once with <office:annotation-end/>: '"+e+"'"):d.annotationEndElement=a):runtime.log("Warning: annotation end without an annotation start, name: '"+e+"'"):runtime.log("Warning: annotation end without a name found"))),a=f.nextNode()}function z(a,b){for(var e=a&&a.firstChild;e;)e.nodeType===Node.ELEMENT_NODE&&e.setAttributeNS("urn:webodf:names:scope","scope",b),e=e.nextSibling}function x(a){var b={},e;for(a=a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&
a.namespaceURI===q&&"font-face"===a.localName&&(e=a.getAttributeNS(q,"name"),b[e]=a),a=a.nextSibling;return b}function v(a,b){var e=null,d,f,m;if(a)for(e=a.cloneNode(!0),d=e.firstElementChild;d;)f=d.nextElementSibling,(m=d.getAttributeNS("urn:webodf:names:scope","scope"))&&m!==b&&e.removeChild(d),d=f;return e}function u(a,b){var e,d,f,m=null,g={};if(a)for(b.forEach(function(a){n.collectUsedFontFaces(g,a)}),m=a.cloneNode(!0),e=m.firstElementChild;e;)d=e.nextElementSibling,f=e.getAttributeNS(q,"name"),
g[f]||m.removeChild(e),e=d;return m}function s(a){var b=M.rootElement.ownerDocument,e;if(a){h(a.documentElement);try{e=b.importNode(a.documentElement,!0)}catch(d){}}return e}function A(a){M.state=a;if(M.onchange)M.onchange(M);if(M.onstatereadychange)M.onstatereadychange(M)}function J(a){U=null;M.rootElement=a;a.fontFaceDecls=k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");a.styles=k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");a.automaticStyles=k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"automatic-styles");a.masterStyles=k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");a.body=k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");a.meta=k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta");r(a)}function G(b){var e=s(b),f=M.rootElement,m;e&&"document-styles"===e.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===e.namespaceURI?(f.fontFaceDecls=k(e,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),d(f,f.fontFaceDecls),
m=k(e,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),f.styles=m||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),d(f,f.styles),m=k(e,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),f.automaticStyles=m||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),z(f.automaticStyles,"document-styles"),d(f,f.automaticStyles),e=k(e,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),f.masterStyles=
e||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),d(f,f.masterStyles),n.prefixStyleNames(f.automaticStyles,l,f.masterStyles)):A(a.INVALID)}function D(b){b=s(b);var e,f,m,g;if(b&&"document-content"===b.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI){e=M.rootElement;m=k(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");if(e.fontFaceDecls&&m){g=e.fontFaceDecls;var l,h,p,r,F={};f=x(g);r=x(m);for(m=m.firstElementChild;m;){l=
m.nextElementSibling;if(m.namespaceURI===q&&"font-face"===m.localName)if(h=m.getAttributeNS(q,"name"),f.hasOwnProperty(h)){if(!m.isEqualNode(f[h])){p=h;for(var t=f,H=r,J=0,G=void 0,G=p=p.replace(/\d+$/,"");t.hasOwnProperty(G)||H.hasOwnProperty(G);)J+=1,G=p+J;p=G;m.setAttributeNS(q,"style:name",p);g.appendChild(m);f[p]=m;delete r[h];F[h]=p}}else g.appendChild(m),f[h]=m,delete r[h];m=l}g=F}else m&&(e.fontFaceDecls=m,d(e,m));f=k(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");
z(f,"document-content");g&&n.changeFontFaceNames(f,g);if(e.automaticStyles&&f)for(g=f.firstChild;g;)e.automaticStyles.appendChild(g),g=f.firstChild;else f&&(e.automaticStyles=f,d(e,f));b=k(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");if(null===b)throw"<office:body/> tag is mising.";e.body=b;d(e,e.body)}else A(a.INVALID)}function F(a){a=s(a);var b;a&&"document-meta"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(b=M.rootElement,b.meta=k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta"),d(b,b.meta))}function O(a){a=s(a);var b;a&&"document-settings"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(b=M.rootElement,b.settings=k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),d(b,b.settings))}function K(a){a=s(a);var b;if(a&&"manifest"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI)for(b=M.rootElement,b.manifest=a,a=b.manifest.firstElementChild;a;)"file-entry"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===
a.namespaceURI&&(S[a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),a=a.nextElementSibling}function Z(b){var e=b.shift();e?E.loadAsDOM(e.path,function(d,f){e.handler(f);d||M.state===a.INVALID||Z(b)}):(r(M.rootElement),A(a.DONE))}function Q(a){var b="";odf.Namespaces.forEachPrefix(function(a,e){b+=" xmlns:"+a+'="'+e+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+
b+' office:version="1.2">'}function W(){var a=new xmldom.LSSerializer,b=Q("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(M.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function H(a,b){var e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");e.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:full-path",a);e.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
"manifest:media-type",b);return e}function T(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'),b=k(a,"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest"),e=new xmldom.LSSerializer,d;for(d in S)S.hasOwnProperty(d)&&b.appendChild(H(d,S[d]));e.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+e.writeToString(a,odf.Namespaces.namespaceMap)}
function y(){var a=new xmldom.LSSerializer,b=Q("document-settings");a.filter=new odf.OdfNodeFilter;M.rootElement.settings.firstElementChild&&(b+=a.writeToString(M.rootElement.settings,odf.Namespaces.namespaceMap));return b+"</office:document-settings>"}function aa(){var a,e,d,f=odf.Namespaces.namespaceMap,m=new xmldom.LSSerializer,g=Q("document-styles");e=v(M.rootElement.automaticStyles,"document-styles");d=M.rootElement.masterStyles.cloneNode(!0);a=u(M.rootElement.fontFaceDecls,[d,M.rootElement.styles,
e]);n.removePrefixFromStyleNames(e,l,d);m.filter=new b(d,e);g+=m.writeToString(a,f);g+=m.writeToString(M.rootElement.styles,f);g+=m.writeToString(e,f);g+=m.writeToString(d,f);return g+"</office:document-styles>"}function N(){var a,b,e=odf.Namespaces.namespaceMap,d=new xmldom.LSSerializer,f=Q("document-content");b=v(M.rootElement.automaticStyles,"document-content");a=u(M.rootElement.fontFaceDecls,[b]);d.filter=new p(M.rootElement.body,b);f+=d.writeToString(a,e);f+=d.writeToString(b,e);f+=d.writeToString(M.rootElement.body,
e);return f+"</office:document-content>"}function R(b,e){runtime.loadXML(b,function(b,d){if(b)e(b);else{var f=s(d);f&&"document"===f.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===f.namespaceURI?(J(f),A(a.DONE)):A(a.INVALID)}})}function I(a,b){var e;e=M.rootElement;var f=e.meta;f||(e.meta=f=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),d(e,f));e=f;a&&g.mapKeyValObjOntoNode(e,a,odf.Namespaces.lookupNamespaceURI);b&&g.removeKeyElementsFromNode(e,
b,odf.Namespaces.lookupNamespaceURI)}function ca(){function b(a,e){var d;e||(e=a);d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",e);f[a]=d;f.appendChild(d)}var e=new core.Zip("",null),d=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),f=M.rootElement,m=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","text");e.save("mimetype",d,!1,new Date);b("meta");b("settings");b("scripts");b("fontFaceDecls","font-face-decls");
b("styles");b("automaticStyles","automatic-styles");b("masterStyles","master-styles");b("body");f.body.appendChild(m);S["/"]="application/vnd.oasis.opendocument.text";S["settings.xml"]="text/xml";S["meta.xml"]="text/xml";S["styles.xml"]="text/xml";S["content.xml"]="text/xml";A(a.DONE);return e}function ia(){var a,b=new Date,e=runtime.getWindow();a="WebODF/"+("undefined"!==String(typeof webodf_version)?webodf_version:"FromSource");e&&(a=a+" "+e.navigator.userAgent);I({"meta:generator":a},null);a=runtime.byteArrayFromString(y(),
"utf8");E.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(W(),"utf8");E.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(aa(),"utf8");E.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(N(),"utf8");E.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(T(),"utf8");E.save("META-INF/manifest.xml",a,!0,b)}function Y(a,b){ia();E.writeAs(a,function(a){b(a)})}var M=this,E,S={},U;this.onstatereadychange=e;this.state=this.onchange=null;this.setRootElement=J;this.getContentElement=
function(){var a;U||(a=M.rootElement.body,U=k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","text")||k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","presentation")||k(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet"));if(!U)throw"Could not find content element in <office:body/>.";return U};this.getDocumentType=function(){var a=M.getContentElement();return a&&a.localName};this.getPart=function(a){return new odf.OdfPart(a,S[a],M,E)};this.getPartData=function(a,b){E.load(a,
b)};this.setMetadata=I;this.incrementEditingCycles=function(){var a;for(a=(a=M.rootElement.meta)&&a.firstChild;a&&(a.namespaceURI!==odf.Namespaces.metans||"editing-cycles"!==a.localName);)a=a.nextSibling;for(a=a&&a.firstChild;a&&a.nodeType!==Node.TEXT_NODE;)a=a.nextSibling;a=a?a.data:null;a=a?parseInt(a,10):0;isNaN(a)&&(a=0);I({"meta:editing-cycles":a+1},null)};this.createByteArray=function(a,b){ia();E.createByteArray(a,b)};this.saveAs=Y;this.save=function(a){Y(m,a)};this.getUrl=function(){return m};
this.setBlob=function(a,b,e){e=f.convertBase64ToByteArray(e);E.save(a,e,!1,new Date);S.hasOwnProperty(a)&&runtime.log(a+" has been overwritten.");S[a]=b};this.removeBlob=function(a){var b=E.remove(a);runtime.assert(b,"file is not found: "+a);delete S[a]};this.state=a.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),e;a=new a.Type;for(e in a)a.hasOwnProperty(e)&&(b[e]=a[e]);return b}({Type:odf.ODFDocumentElement,namespaceURI:odf.ODFDocumentElement.namespaceURI,
localName:odf.ODFDocumentElement.localName});E=m?new core.Zip(m,function(b,e){E=e;b?R(m,function(e){b&&(E.error=b+"\n"+e,A(a.INVALID))}):Z([{path:"styles.xml",handler:G},{path:"content.xml",handler:D},{path:"meta.xml",handler:F},{path:"settings.xml",handler:O},{path:"META-INF/manifest.xml",handler:K}])}):ca()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,
null)};return odf.OdfContainer})();
// Input 28
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.OdfUtils=function(){function k(a){return"image"===(a&&a.localName)&&a.namespaceURI===K}function h(a){return null!==a&&a.nodeType===Node.ELEMENT_NODE&&"frame"===a.localName&&a.namespaceURI===K&&"as-char"===a.getAttributeNS(O,"anchor-type")}function b(a){var c;(c="annotation"===(a&&a.localName)&&a.namespaceURI===odf.Namespaces.officens)||(c="div"===(a&&a.localName)&&"annotationWrapper"===a.className);return c}function p(a){return"a"===(a&&a.localName)&&a.namespaceURI===O}function d(a){var c=a&&
a.localName;return("p"===c||"h"===c)&&a.namespaceURI===O}function n(a){for(;a&&!d(a);)a=a.parentNode;return a}function g(a){return/^[ \t\r\n]+$/.test(a)}function q(a){if(null===a||a.nodeType!==Node.ELEMENT_NODE)return!1;var c=a.localName;return/^(span|p|h|a|meta)$/.test(c)&&a.namespaceURI===O||"span"===c&&"annotationHighlight"===a.className}function r(a){var c=a&&a.localName,b=!1;c&&(a=a.namespaceURI,a===O&&(b="s"===c||"tab"===c||"line-break"===c));return b}function l(a){return r(a)||h(a)||b(a)}function f(a){var c=
a&&a.localName,b=!1;c&&(a=a.namespaceURI,a===O&&(b="s"===c));return b}function c(a){for(;null!==a.firstChild&&q(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&q(a);)a=a.lastChild;return a}function m(c){for(;!d(c)&&null===c.previousSibling;)c=c.parentNode;return d(c)?null:a(c.previousSibling)}function e(a){for(;!d(a)&&null===a.nextSibling;)a=a.parentNode;return d(a)?null:c(a.nextSibling)}function t(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=m(a);else return!g(a.data.substr(a.length-
1,1));else l(a)?(c=!1===f(a),a=null):a=m(a);return c}function w(a){var b=!1,d;for(a=a&&c(a);a;){d=a.nodeType===Node.TEXT_NODE?a.length:0;if(0<d&&!g(a.data)){b=!0;break}if(l(a)){b=!0;break}a=e(a)}return b}function z(a,c){return g(a.data.substr(c))?!w(e(a)):!1}function x(a,c){var b=a.data,e;if(!g(b[c])||l(a.parentNode))return!1;0<c?g(b[c-1])||(e=!0):t(m(a))&&(e=!0);return!0===e?z(a,c)?!1:!0:!1}function v(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function u(a){return(a=v(a))&&(0>a.value||"%"===a.unit)?null:a}function s(a){return(a=v(a))&&"%"!==a.unit?null:a}function A(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "cursor":case "editinfo":return!1}}return!0}
function J(a,c){for(;0<c.length&&!W.rangeContainsNode(a,c[0]);)c.shift();for(;0<c.length&&!W.rangeContainsNode(a,c[c.length-1]);)c.pop()}function G(a,c,e){var d;d=W.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_REJECT;if(r(a.parentNode)||b(a))c=NodeFilter.FILTER_REJECT;else if(a.nodeType===Node.TEXT_NODE){if(e||Boolean(n(a)&&(!g(a.textContent)||x(a,0))))c=NodeFilter.FILTER_ACCEPT}else if(l(a))c=NodeFilter.FILTER_ACCEPT;else if(A(a)||q(a))c=NodeFilter.FILTER_SKIP;return c},NodeFilter.SHOW_ELEMENT|
NodeFilter.SHOW_TEXT);c||J(a,d);return d}function D(a,c,e){for(;a;){if(e(a)){c[0]!==a&&c.unshift(a);break}if(b(a))break;a=a.parentNode}}function F(a,c){var b=a;if(c<b.childNodes.length-1)b=b.childNodes[c+1];else{for(;!b.nextSibling;)b=b.parentNode;b=b.nextSibling}for(;b.firstChild;)b=b.firstChild;return b}var O=odf.Namespaces.textns,K=odf.Namespaces.drawns,Z=odf.Namespaces.xlinkns,Q=/^\s*$/,W=new core.DomUtils;this.isImage=k;this.isCharacterFrame=h;this.isInlineRoot=b;this.isTextSpan=function(a){return"span"===
(a&&a.localName)&&a.namespaceURI===O};this.isHyperlink=p;this.getHyperlinkTarget=function(a){return a.getAttributeNS(Z,"href")};this.isParagraph=d;this.getParagraphElement=n;this.isWithinTrackedChanges=function(a,c){for(;a&&a!==c;){if(a.namespaceURI===O&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===O};this.isLineBreak=function(a){return"line-break"===(a&&a.localName)&&a.namespaceURI===O};this.isODFWhitespace=
g;this.isGroupingElement=q;this.isCharacterElement=r;this.isAnchoredAsCharacterElement=l;this.isSpaceElement=f;this.firstChild=c;this.lastChild=a;this.previousNode=m;this.nextNode=e;this.scanLeftForNonSpace=t;this.lookLeftForCharacter=function(a){var c,b=c=0;a.nodeType===Node.TEXT_NODE&&(b=a.length);0<b?(c=a.data,c=g(c.substr(b-1,1))?1===b?t(m(a))?2:0:g(c.substr(b-2,1))?0:2:1):l(a)&&(c=1);return c};this.lookRightForCharacter=function(a){var c=!1,b=0;a&&a.nodeType===Node.TEXT_NODE&&(b=a.length);0<
b?c=!g(a.data.substr(0,1)):l(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(c){var b=!1,e;for(c=c&&a(c);c;){e=c.nodeType===Node.TEXT_NODE?c.length:0;if(0<e&&!g(c.data)){b=!0;break}if(l(c)){b=!0;break}c=m(c)}return b};this.scanRightForAnyCharacter=w;this.isTrailingWhitespace=z;this.isSignificantWhitespace=x;this.isDowngradableSpaceElement=function(a){return a.namespaceURI===O&&"s"===a.localName?t(m(a))&&w(e(a)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===
Node.TEXT_NODE&&Q.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=v;this.parseNonNegativeLength=u;this.parseFoFontSize=function(a){var c;c=(c=v(a))&&(0>=c.value||"%"===c.unit)?null:c;return c||s(a)};this.parseFoLineHeight=function(a){return u(a)||s(a)};this.isTextContentContainingNode=A;this.getTextNodes=function(a,c){var b;b=W.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_REJECT;a.nodeType===Node.TEXT_NODE?Boolean(n(a)&&(!g(a.textContent)||x(a,0)))&&(c=NodeFilter.FILTER_ACCEPT):
A(a)&&(c=NodeFilter.FILTER_SKIP);return c},NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);c||J(a,b);return b};this.getTextElements=G;this.getParagraphElements=function(a){var c;c=W.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_REJECT;if(d(a))c=NodeFilter.FILTER_ACCEPT;else if(A(a)||q(a))c=NodeFilter.FILTER_SKIP;return c},NodeFilter.SHOW_ELEMENT);D(a.startContainer,c,d);return c};this.getImageElements=function(a){var c;c=W.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_SKIP;k(a)&&(c=
NodeFilter.FILTER_ACCEPT);return c},NodeFilter.SHOW_ELEMENT);D(a.startContainer,c,k);return c};this.getHyperlinkElements=function(a){var c=[],b=a.cloneRange();a.collapsed&&a.endContainer.nodeType===Node.ELEMENT_NODE&&(a=F(a.endContainer,a.endOffset),a.nodeType===Node.TEXT_NODE&&b.setEnd(a,1));G(b,!0,!1).forEach(function(a){for(a=a.parentNode;!d(a);){if(p(a)&&-1===c.indexOf(a)){c.push(a);break}a=a.parentNode}});b.detach();return c}};
// Input 29
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.AnnotatableCanvas=function(){};gui.AnnotatableCanvas.prototype.refreshSize=function(){};gui.AnnotatableCanvas.prototype.getZoomLevel=function(){};gui.AnnotatableCanvas.prototype.getSizer=function(){};
gui.AnnotationViewManager=function(k,h,b,p){function d(a){var c=a.annotationEndElement,b=l.createRange(),d=a.getAttributeNS(odf.Namespaces.officens,"name");c&&(b.setStart(a,a.childNodes.length),b.setEnd(c,0),a=f.getTextNodes(b,!1),a.forEach(function(a){var c=l.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",d);a.parentNode.insertBefore(c,a);c.appendChild(a)}));b.detach()}function n(a){var d=k.getSizer();a?(b.style.display="inline-block",d.style.paddingRight=c.getComputedStyle(b).width):
(b.style.display="none",d.style.paddingRight=0);k.refreshSize()}function g(){r.sort(function(a,c){return 0!==(a.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1})}function q(){var a;for(a=0;a<r.length;a+=1){var c=r[a],e=c.parentNode,d=e.nextElementSibling,f=d.nextElementSibling,g=e.parentNode,l=0,l=r[r.indexOf(c)-1],n=void 0,c=k.getZoomLevel();e.style.left=(b.getBoundingClientRect().left-g.getBoundingClientRect().left)/c+"px";e.style.width=b.getBoundingClientRect().width/c+"px";d.style.width=
parseFloat(e.style.left)-30+"px";l&&(n=l.parentNode.getBoundingClientRect(),20>=(g.getBoundingClientRect().top-n.bottom)/c?e.style.top=Math.abs(g.getBoundingClientRect().top-n.bottom)/c+20+"px":e.style.top="0px");f.style.left=d.getBoundingClientRect().width/c+"px";var d=f.style,g=f.getBoundingClientRect().left/c,l=f.getBoundingClientRect().top/c,n=e.getBoundingClientRect().left/c,h=e.getBoundingClientRect().top/c,q=0,A=0,q=n-g,q=q*q,A=h-l,A=A*A,g=Math.sqrt(q+A);d.width=g+"px";l=Math.asin((e.getBoundingClientRect().top-
f.getBoundingClientRect().top)/(c*parseFloat(f.style.width)));f.style.transform="rotate("+l+"rad)";f.style.MozTransform="rotate("+l+"rad)";f.style.WebkitTransform="rotate("+l+"rad)";f.style.msTransform="rotate("+l+"rad)"}}var r=[],l=h.ownerDocument,f=new odf.OdfUtils,c=runtime.getWindow();runtime.assert(Boolean(c),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=q;this.getMinimumHeightForAnnotationPane=function(){return"none"!==b.style.display&&
0<r.length?(r[r.length-1].parentNode.getBoundingClientRect().bottom-b.getBoundingClientRect().top)/k.getZoomLevel()+"px":null};this.addAnnotation=function(a){n(!0);r.push(a);g();var c=l.createElement("div"),b=l.createElement("div"),f=l.createElement("div"),k=l.createElement("div"),h;c.className="annotationWrapper";a.parentNode.insertBefore(c,a);b.className="annotationNote";b.appendChild(a);p&&(h=l.createElement("div"),h.className="annotationRemoveButton",b.appendChild(h));f.className="annotationConnector horizontal";
k.className="annotationConnector angular";c.appendChild(b);c.appendChild(f);c.appendChild(k);a.annotationEndElement&&d(a);q()};this.forgetAnnotations=function(){for(;r.length;){var a=r[0],c=r.indexOf(a),b=a.parentNode.parentNode;"div"===b.localName&&(b.parentNode.insertBefore(a,b),b.parentNode.removeChild(b));for(var a=a.getAttributeNS(odf.Namespaces.officens,"name"),a=l.querySelectorAll('span.annotationHighlight[annotation="'+a+'"]'),d=b=void 0,b=0;b<a.length;b+=1){for(d=a.item(b);d.firstChild;)d.parentNode.insertBefore(d.firstChild,
d);d.parentNode.removeChild(d)}-1!==c&&r.splice(c,1);0===r.length&&n(!1)}}};
// Input 30
/*

 Copyright (C) 2014 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
(function(){function k(h,b){var p=this;this.getDistance=function(b){var n=p.x-b.x;b=p.y-b.y;return Math.sqrt(n*n+b*b)};this.getCenter=function(b){return new k((p.x+b.x)/2,(p.y+b.y)/2)};p.x=h;p.y=b}gui.ZoomHelper=function(){function h(c,b,e,d){c=d?"translate3d("+c+"px, "+b+"px, 0) scale3d("+e+", "+e+", 1)":"translate("+c+"px, "+b+"px) scale("+e+")";a.style.WebkitTransform=c;a.style.MozTransform=c;a.style.msTransform=c;a.style.OTransform=c;a.style.transform=c}function b(a){a?h(-m.x,-m.y,w,!0):(h(0,
0,w,!0),h(0,0,w,!1))}function p(a){if(v&&J){var c=v.style.overflow,b=v.classList.contains("customScrollbars");a&&b||!a&&!b||(a?(v.classList.add("customScrollbars"),v.style.overflow="hidden",runtime.requestAnimationFrame(function(){v.style.overflow=c})):v.classList.remove("customScrollbars"))}}function d(){h(-m.x,-m.y,w,!0);v.scrollLeft=0;v.scrollTop=0;p(!1)}function n(){h(0,0,w,!0);v.scrollLeft=m.x;v.scrollTop=m.y;p(!0)}function g(c){return new k(c.pageX-a.offsetLeft,c.pageY-a.offsetTop)}function q(c){e&&
(m.x-=c.x-e.x,m.y-=c.y-e.y,m=new k(Math.min(Math.max(m.x,a.offsetLeft),(a.offsetLeft+a.offsetWidth)*w-v.clientWidth),Math.min(Math.max(m.y,a.offsetTop),(a.offsetTop+a.offsetHeight)*w-v.clientHeight)));e=c}function r(a){var c=a.touches.length,b=0<c?g(a.touches[0]):null;a=1<c?g(a.touches[1]):null;b&&a?(t=b.getDistance(a),z=w,e=b.getCenter(a),d(),A=s.PINCH):b&&(e=b,A=s.SCROLL)}function l(c){var e=c.touches.length,f=0<e?g(c.touches[0]):null,e=1<e?g(c.touches[1]):null;if(f&&e)if(c.preventDefault(),A===
s.SCROLL)A=s.PINCH,d(),t=f.getDistance(e);else{c=f.getCenter(e);f=f.getDistance(e)/t;q(c);var e=w,l=Math.min(x,a.offsetParent.clientWidth/a.offsetWidth);w=z*f;w=Math.min(Math.max(w,l),x);f=w/e;m.x+=(f-1)*(c.x+m.x);m.y+=(f-1)*(c.y+m.y);b(!0)}else f&&(A===s.PINCH?(A=s.SCROLL,n()):q(f))}function f(){A===s.PINCH&&(u.emit(gui.ZoomHelper.signalZoomChanged,w),n(),b(!1));A=s.NONE}function c(){v&&(v.removeEventListener("touchstart",r,!1),v.removeEventListener("touchmove",l,!1),v.removeEventListener("touchend",
f,!1))}var a,m,e,t,w,z,x=4,v,u=new core.EventNotifier([gui.ZoomHelper.signalZoomChanged]),s={NONE:0,SCROLL:1,PINCH:2},A=s.NONE,J=runtime.getWindow().hasOwnProperty("ontouchstart");this.subscribe=function(a,c){u.subscribe(a,c)};this.unsubscribe=function(a,c){u.unsubscribe(a,c)};this.getZoomLevel=function(){return w};this.setZoomLevel=function(c){a&&(w=c,b(!1),u.emit(gui.ZoomHelper.signalZoomChanged,w))};this.destroy=function(a){c();p(!1);a()};this.setZoomableElement=function(e){c();a=e;v=a.offsetParent;
b(!1);v&&(v.addEventListener("touchstart",r,!1),v.addEventListener("touchmove",l,!1),v.addEventListener("touchend",f,!1));p(!0)};z=w=1;m=new k(0,0)};gui.ZoomHelper.signalZoomChanged="zoomChanged"})();
// Input 31
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
(function(){function k(h,d,n,g,q){var r,l=0,f;for(f in h)if(h.hasOwnProperty(f)){if(l===n){r=f;break}l+=1}r?d.getPartData(h[r].href,function(c,a){if(c)runtime.log(c);else if(a){var f="@font-face { font-family: '"+(h[r].family||r)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+b.convertUTF8ArrayToBase64(a)+') format("truetype"); }';try{g.insertRule(f,g.cssRules.length)}catch(e){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(e)+"\nRule: "+f)}}else runtime.log("missing font data for "+
h[r].href);k(h,d,n+1,g,q)}):q&&q()}var h=xmldom.XPath,b=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(b,d){for(var n=b.rootElement.fontFaceDecls;d.cssRules.length;)d.deleteRule(d.cssRules.length-1);if(n){var g={},q,r,l,f;if(n)for(n=h.getODFElementsWithXPath(n,"style:font-face[svg:font-face-src]",odf.Namespaces.lookupNamespaceURI),q=0;q<n.length;q+=1)r=n[q],l=r.getAttributeNS(odf.Namespaces.stylens,"name"),f=r.getAttributeNS(odf.Namespaces.svgns,"font-family"),r=h.getODFElementsWithXPath(r,
"svg:font-face-src/svg:font-face-uri",odf.Namespaces.lookupNamespaceURI),0<r.length&&(r=r[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),g[l]={href:r,family:f});k(g,b,0,d)}}};return odf.FontLoader})();
// Input 32
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.Formatting=function(){function k(a){return(a=s[a])?u.mergeObjects({},a):{}}function h(a,c,b){for(a=a&&a.firstElementChild;a&&(a.namespaceURI!==c||a.localName!==b);)a=a.nextElementSibling;return a}function b(){for(var a=c.rootElement.fontFaceDecls,b={},d,f,a=a&&a.firstElementChild;a;){if(d=a.getAttributeNS(e,"name"))if((f=a.getAttributeNS(m,"font-family"))||0<a.getElementsByTagNameNS(m,"font-face-uri").length)b[d]=f;a=a.nextElementSibling}return b}function p(a){for(var b=c.rootElement.styles.firstElementChild;b;){if(b.namespaceURI===
e&&"default-style"===b.localName&&b.getAttributeNS(e,"family")===a)return b;b=b.nextElementSibling}return null}function d(a,b,d){var f,g,m;d=d||[c.rootElement.automaticStyles,c.rootElement.styles];for(m=0;m<d.length;m+=1)for(f=d[m],f=f.firstElementChild;f;){g=f.getAttributeNS(e,"name");if(f.namespaceURI===e&&"style"===f.localName&&f.getAttributeNS(e,"family")===b&&g===a||"list-style"===b&&f.namespaceURI===t&&"list-style"===f.localName&&g===a||"data"===b&&f.namespaceURI===w&&g===a)return f;f=f.nextElementSibling}return null}
function n(a){for(var c,b,d,f,g={},m=a.firstElementChild;m;){if(m.namespaceURI===e)for(d=g[m.nodeName]={},b=m.attributes,c=0;c<b.length;c+=1)f=b.item(c),d[f.name]=f.value;m=m.nextElementSibling}b=a.attributes;for(c=0;c<b.length;c+=1)f=b.item(c),g[f.name]=f.value;return g}function g(a,b){for(var f=c.rootElement.styles,g,m={},l=a.getAttributeNS(e,"family"),h=a;h;)g=n(h),m=u.mergeObjects(g,m),h=(g=h.getAttributeNS(e,"parent-style-name"))?d(g,l,[f]):null;if(h=p(l))g=n(h),m=u.mergeObjects(g,m);!1!==b&&
(g=k(l),m=u.mergeObjects(g,m));return m}function q(c,b){function e(a){Object.keys(a).forEach(function(c){Object.keys(a[c]).forEach(function(a){m+="|"+c+":"+a+"|"})})}for(var d=c.nodeType===Node.TEXT_NODE?c.parentNode:c,f,g=[],m="",l=!1;d;)!l&&x.isGroupingElement(d)&&(l=!0),(f=a.determineStylesForNode(d))&&g.push(f),d=d.parentNode;l&&(g.forEach(e),b&&(b[m]=g));return l?g:void 0}function r(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(f){var m=Object.keys(a[f])[0],
l={name:m,family:f,displayName:void 0,isCommonStyle:!1},h;(h=d(m,f))?(f=g(h),b=u.mergeObjects(f,b),l.displayName=h.getAttributeNS(e,"display-name"),l.isCommonStyle=h.parentNode===c.rootElement.styles):runtime.log("No style element found for '"+m+"' of family '"+f+"'");b.orderedStyles.push(l)})});return b}function l(a,c){var b={},e=[];c||(c={});a.forEach(function(a){q(a,b)});Object.keys(b).forEach(function(a){c[a]||(c[a]=r(b[a]));e.push(c[a])});return e}function f(a,c){var b=x.parseLength(a),e=c;if(b)switch(b.unit){case "cm":e=
b.value;break;case "mm":e=0.1*b.value;break;case "in":e=2.54*b.value;break;case "pt":e=0.035277778*b.value;break;case "pc":case "px":case "em":break;default:runtime.log("Unit identifier: "+b.unit+" is not supported.")}return e}var c,a=new odf.StyleInfo,m=odf.Namespaces.svgns,e=odf.Namespaces.stylens,t=odf.Namespaces.textns,w=odf.Namespaces.numberns,z=odf.Namespaces.fons,x=new odf.OdfUtils,v=new core.DomUtils,u=new core.Utils,s={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.getSystemDefaultStyleAttributes=
k;this.setOdfContainer=function(a){c=a};this.getFontMap=b;this.getAvailableParagraphStyles=function(){for(var a=c.rootElement.styles,b,d,f=[],a=a&&a.firstElementChild;a;)"style"===a.localName&&a.namespaceURI===e&&(b=a.getAttributeNS(e,"family"),"paragraph"===b&&(b=a.getAttributeNS(e,"name"),d=a.getAttributeNS(e,"display-name")||b,b&&d&&f.push({name:b,displayName:d}))),a=a.nextElementSibling;return f};this.isStyleUsed=function(b){var e,d=c.rootElement;e=a.hasDerivedStyles(d,odf.Namespaces.lookupNamespaceURI,
b);b=(new a.UsedStyleList(d.styles)).uses(b)||(new a.UsedStyleList(d.automaticStyles)).uses(b)||(new a.UsedStyleList(d.body)).uses(b);return e||b};this.getDefaultStyleElement=p;this.getStyleElement=d;this.getStyleAttributes=n;this.getInheritedStyleAttributes=g;this.getFirstCommonParentStyleNameOrSelf=function(a){var b=c.rootElement.automaticStyles,f=c.rootElement.styles,g;for(g=d(a,"paragraph",[b]);g;)a=g.getAttributeNS(e,"parent-style-name"),g=d(a,"paragraph",[b]);return(g=d(a,"paragraph",[f]))?
a:null};this.hasParagraphStyle=function(a){return Boolean(d(a,"paragraph"))};this.getAppliedStyles=l;this.getAppliedStylesForElement=function(a,c){return l([a],c)[0]};this.updateStyle=function(a,d){var f,g;v.mapObjOntoNode(a,d,odf.Namespaces.lookupNamespaceURI);(f=d["style:text-properties"]&&d["style:text-properties"]["style:font-name"])&&!b().hasOwnProperty(f)&&(g=a.ownerDocument.createElementNS(e,"style:font-face"),g.setAttributeNS(e,"style:name",f),g.setAttributeNS(m,"svg:font-family",f),c.rootElement.fontFaceDecls.appendChild(g))};
this.createDerivedStyleObject=function(a,b,e){var f=d(a,b);runtime.assert(Boolean(f),"No style element found for '"+a+"' of family '"+b+"'");a=f.parentNode===c.rootElement.styles?{"style:parent-style-name":a}:n(f);a["style:family"]=b;u.mergeObjects(a,e);return a};this.getDefaultTabStopDistance=function(){for(var a=p("paragraph"),a=a&&a.firstElementChild,c;a;)a.namespaceURI===e&&"paragraph-properties"===a.localName&&(c=a.getAttributeNS(e,"tab-stop-distance")),a=a.nextElementSibling;c||(c="1.25cm");
return x.parseNonNegativeLength(c)};this.getContentSize=function(a,b){var g,m,l,n,k,q,p,r,t,s,w;a:{var u,x,R;g=d(a,b);runtime.assert("paragraph"===b||"table"===b,"styleFamily has to be either paragraph or table");if(g){u=g.getAttributeNS(e,"master-page-name")||"Standard";for(g=c.rootElement.masterStyles.lastElementChild;g&&g.getAttributeNS(e,"name")!==u;)g=g.previousElementSibling;u=g.getAttributeNS(e,"page-layout-name");x=v.getElementsByTagNameNS(c.rootElement.automaticStyles,e,"page-layout");for(R=
0;R<x.length;R+=1)if(g=x[R],g.getAttributeNS(e,"name")===u)break a}g=null}g||(g=h(c.rootElement.styles,e,"default-page-layout"));if(g=h(g,e,"page-layout-properties"))m=g.getAttributeNS(e,"print-orientation")||"portrait","portrait"===m?(m=21.001,l=29.7):(m=29.7,l=21.001),m=f(g.getAttributeNS(z,"page-width"),m),l=f(g.getAttributeNS(z,"page-height"),l),n=f(g.getAttributeNS(z,"margin"),null),null===n?(n=f(g.getAttributeNS(z,"margin-left"),2),k=f(g.getAttributeNS(z,"margin-right"),2),q=f(g.getAttributeNS(z,
"margin-top"),2),p=f(g.getAttributeNS(z,"margin-bottom"),2)):n=k=q=p=n,r=f(g.getAttributeNS(z,"padding"),null),null===r?(r=f(g.getAttributeNS(z,"padding-left"),0),t=f(g.getAttributeNS(z,"padding-right"),0),s=f(g.getAttributeNS(z,"padding-top"),0),w=f(g.getAttributeNS(z,"padding-bottom"),0)):r=t=s=w=r;return{width:m-n-k-r-t,height:l-q-p-s-w}}};
// Input 33
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.StyleTreeNode=function(k){this.derivedStyles={};this.element=k};
odf.Style2CSS=function(){function k(a){var c,b,d,f={};if(!a)return f;for(a=a.firstElementChild;a;){if(b=a.namespaceURI!==e||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===z&&"list-style"===a.localName?"list":a.namespaceURI!==e||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(e,"family"))(c=a.getAttributeNS(e,"name"))||(c=""),f.hasOwnProperty(b)?d=f[b]:f[b]=d={},d[c]=a;a=a.nextElementSibling}return f}function h(a,c){if(a.hasOwnProperty(c))return a[c];
var b,e=null;for(b in a)if(a.hasOwnProperty(b)&&(e=h(a[b].derivedStyles,c)))break;return e}function b(a,c,d){var f,g,m;if(!c.hasOwnProperty(a))return null;f=new odf.StyleTreeNode(c[a]);g=f.element.getAttributeNS(e,"parent-style-name");m=null;g&&(m=h(d,g)||b(g,c,d));m?m.derivedStyles[a]=f:d[a]=f;delete c[a];return f}function p(a,c){for(var e in a)a.hasOwnProperty(e)&&b(e,a,c)}function d(a,c,b){var e=[];b=b.derivedStyles;var f;var g=u[a],m;void 0===g?c=null:(m=c?"["+g+'|style-name="'+c+'"]':"","presentation"===
g&&(g="draw",m=c?'[presentation|style-name="'+c+'"]':""),c=g+"|"+s[a].join(m+","+g+"|")+m);null!==c&&e.push(c);for(f in b)b.hasOwnProperty(f)&&(c=d(a,f,b[f]),e=e.concat(c));return e}function n(a,c,b){for(a=a&&a.firstElementChild;a&&(a.namespaceURI!==c||a.localName!==b);)a=a.nextElementSibling;return a}function g(a,c){var b="",e,d,f;for(e=0;e<c.length;e+=1)if(d=c[e],f=a.getAttributeNS(d[0],d[1])){f=f.trim();if(H.hasOwnProperty(d[1])){var g=f.indexOf(" "),m=void 0,l=void 0;-1!==g?(m=f.substring(0,g),
l=f.substring(g)):(m=f,l="");(m=y.parseLength(m))&&"pt"===m.unit&&0.75>m.value&&(f="0.75pt"+l)}d[2]&&(b+=d[2]+":"+f+";")}return b}function q(c){return(c=n(c,e,"text-properties"))?y.parseFoFontSize(c.getAttributeNS(a,"font-size")):null}function r(a,c,b,e){return c+c+b+b+e+e}function l(c,b,d,f){b='text|list[text|style-name="'+b+'"]';var g=d.getAttributeNS(z,"level");d=n(d,e,"list-level-properties");d=n(d,e,"list-level-label-alignment");var m,l;d&&(m=d.getAttributeNS(a,"text-indent"),l=d.getAttributeNS(a,
"margin-left"));m||(m="-0.6cm");d="-"===m.charAt(0)?m.substring(1):"-"+m;for(g=g&&parseInt(g,10);1<g;)b+=" > text|list-item > text|list",g-=1;if(l){g=b+" > text|list-item > *:not(text|list):first-child";g+="{";g=g+("margin-left:"+l+";")+"}";try{c.insertRule(g,c.cssRules.length)}catch(h){runtime.log("cannot load rule: "+g)}}f=b+" > text|list-item > *:not(text|list):first-child:before{"+f+";";f=f+"counter-increment:list;"+("margin-left:"+m+";");f+="width:"+d+";";f+="display:inline-block}";try{c.insertRule(f,
c.cssRules.length)}catch(k){runtime.log("cannot load rule: "+f)}}function f(b,h,k,p){if("list"===h)for(var t=p.element.firstChild,s,u;t;){if(t.namespaceURI===z)if(s=t,"list-level-style-number"===t.localName){var H=s;u=H.getAttributeNS(e,"num-format");var P=H.getAttributeNS(e,"num-suffix")||"",H=H.getAttributeNS(e,"num-prefix")||"",X={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},V="";H&&(V+=' "'+H+'"');V=X.hasOwnProperty(u)?V+(" counter(list, "+X[u]+")"):u?V+(' "'+u+
'"'):V+" ''";u="content:"+V+' "'+P+'"';l(b,k,s,u)}else"list-level-style-image"===t.localName?(u="content: none;",l(b,k,s,u)):"list-level-style-bullet"===t.localName&&(u="content: '"+s.getAttributeNS(z,"bullet-char")+"';",l(b,k,s,u));t=t.nextSibling}else if("page"===h){if(u=p.element,H=P=k="",t=n(u,e,"page-layout-properties"))if(s=u.getAttributeNS(e,"name"),k+=g(t,Q),(P=n(t,e,"background-image"))&&(H=P.getAttributeNS(x,"href"))&&(k=k+("background-image: url('odfkit:"+H+"');")+g(P,J)),"presentation"===
aa)for(u=(u=n(u.parentNode.parentNode,m,"master-styles"))&&u.firstElementChild;u;){if(u.namespaceURI===e&&"master-page"===u.localName&&u.getAttributeNS(e,"page-layout-name")===s){H=u.getAttributeNS(e,"name");P="draw|page[draw|master-page-name="+H+"] {"+k+"}";H="office|body, draw|page[draw|master-page-name="+H+"] {"+g(t,W)+" }";try{b.insertRule(P,b.cssRules.length),b.insertRule(H,b.cssRules.length)}catch(ga){throw ga;}}u=u.nextElementSibling}else if("text"===aa){P="office|text {"+k+"}";H="office|body {width: "+
t.getAttributeNS(a,"page-width")+";}";try{b.insertRule(P,b.cssRules.length),b.insertRule(H,b.cssRules.length)}catch(ha){throw ha;}}}else{k=d(h,k,p).join(",");t="";if(s=n(p.element,e,"text-properties")){H=s;u=V="";P=1;s=""+g(H,A);X=H.getAttributeNS(e,"text-underline-style");"solid"===X&&(V+=" underline");X=H.getAttributeNS(e,"text-line-through-style");"solid"===X&&(V+=" line-through");V.length&&(s+="text-decoration:"+V+";");if(V=H.getAttributeNS(e,"font-name")||H.getAttributeNS(a,"font-family"))X=
T[V],s+="font-family: "+(X||V)+";";X=H.parentNode;if(H=q(X)){for(;X;){if(H=q(X)){if("%"!==H.unit){u="font-size: "+H.value*P+H.unit+";";break}P*=H.value/100}H=X;V=X="";X=null;"default-style"===H.localName?X=null:(X=H.getAttributeNS(e,"parent-style-name"),V=H.getAttributeNS(e,"family"),X=I.getODFElementsWithXPath(N,X?"//style:*[@style:name='"+X+"'][@style:family='"+V+"']":"//style:default-style[@style:family='"+V+"']",odf.Namespaces.lookupNamespaceURI)[0])}u||(u="font-size: "+parseFloat(R)*P+ca.getUnits(R)+
";");s+=u}t+=s}if(s=n(p.element,e,"paragraph-properties"))u=s,s=""+g(u,G),(P=n(u,e,"background-image"))&&(H=P.getAttributeNS(x,"href"))&&(s=s+("background-image: url('odfkit:"+H+"');")+g(P,J)),(u=u.getAttributeNS(a,"line-height"))&&"normal"!==u&&(u=y.parseFoLineHeight(u),s="%"!==u.unit?s+("line-height: "+u.value+u.unit+";"):s+("line-height: "+u.value/100+";")),t+=s;if(s=n(p.element,e,"graphic-properties"))H=s,s=""+g(H,D),u=H.getAttributeNS(c,"opacity"),P=H.getAttributeNS(c,"fill"),H=H.getAttributeNS(c,
"fill-color"),"solid"===P||"hatch"===P?H&&"none"!==H?(u=isNaN(parseFloat(u))?1:parseFloat(u)/100,P=H.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r),(H=(P=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(P))?{r:parseInt(P[1],16),g:parseInt(P[2],16),b:parseInt(P[3],16)}:null)&&(s+="background-color: rgba("+H.r+","+H.g+","+H.b+","+u+");")):s+="background: none;":"none"===P&&(s+="background: none;"),t+=s;if(s=n(p.element,e,"drawing-page-properties"))u=""+g(s,D),"true"===s.getAttributeNS(v,"background-visible")&&
(u+="background: none;"),t+=u;if(s=n(p.element,e,"table-cell-properties"))s=""+g(s,F),t+=s;if(s=n(p.element,e,"table-row-properties"))s=""+g(s,K),t+=s;if(s=n(p.element,e,"table-column-properties"))s=""+g(s,O),t+=s;if(s=n(p.element,e,"table-properties"))u=s,s=""+g(u,Z),u=u.getAttributeNS(w,"border-model"),"collapsing"===u?s+="border-collapse:collapse;":"separating"===u&&(s+="border-collapse:separate;"),t+=s;if(0!==t.length)try{b.insertRule(k+"{"+t+"}",b.cssRules.length)}catch($){throw $;}}for(var ea in p.derivedStyles)p.derivedStyles.hasOwnProperty(ea)&&
f(b,h,ea,p.derivedStyles[ea])}var c=odf.Namespaces.drawns,a=odf.Namespaces.fons,m=odf.Namespaces.officens,e=odf.Namespaces.stylens,t=odf.Namespaces.svgns,w=odf.Namespaces.tablens,z=odf.Namespaces.textns,x=odf.Namespaces.xlinkns,v=odf.Namespaces.presentationns,u={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),
paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},A=[[a,"color","color"],[a,"background-color","background-color"],[a,"font-weight","font-weight"],[a,"font-style","font-style"]],J=[[e,"repeat","background-repeat"]],G=[[a,"background-color","background-color"],[a,"text-align","text-align"],[a,"text-indent","text-indent"],[a,"padding","padding"],[a,"padding-left","padding-left"],[a,"padding-right","padding-right"],[a,"padding-top","padding-top"],[a,"padding-bottom","padding-bottom"],[a,"border-left","border-left"],[a,"border-right",
"border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"margin","margin"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"],[a,"border","border"]],D=[[a,"background-color","background-color"],[a,"min-height","min-height"],[c,"stroke","border"],[t,"stroke-color","border-color"],[t,"stroke-width","border-width"],[a,"border","border"],[a,"border-left","border-left"],[a,"border-right","border-right"],
[a,"border-top","border-top"],[a,"border-bottom","border-bottom"]],F=[[a,"background-color","background-color"],[a,"border-left","border-left"],[a,"border-right","border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"border","border"]],O=[[e,"column-width","width"]],K=[[e,"row-height","height"],[a,"keep-together",null]],Z=[[e,"width","width"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"]],
Q=[[a,"background-color","background-color"],[a,"padding","padding"],[a,"padding-left","padding-left"],[a,"padding-right","padding-right"],[a,"padding-top","padding-top"],[a,"padding-bottom","padding-bottom"],[a,"border","border"],[a,"border-left","border-left"],[a,"border-right","border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"margin","margin"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"]],
W=[[a,"page-width","width"],[a,"page-height","height"]],H={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,"stroke-width":!0},T={},y=new odf.OdfUtils,aa,N,R,I=xmldom.XPath,ca=new core.CSSUnits;this.style2css=function(a,c,b,e,d){for(var g,m,l,h;c.cssRules.length;)c.deleteRule(c.cssRules.length-1);g=null;e&&(g=e.ownerDocument,N=e.parentNode);d&&(g=d.ownerDocument,N=d.parentNode);if(g)for(h in odf.Namespaces.forEachPrefix(function(a,b){m="@namespace "+a+" url("+b+");";
try{c.insertRule(m,c.cssRules.length)}catch(e){}}),T=b,aa=a,R=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=k(e),e=k(d),d={},u)if(u.hasOwnProperty(h))for(l in b=d[h]={},p(a[h],b),p(e[h],b),b)b.hasOwnProperty(l)&&f(c,h,l,b[l])}};
// Input 34
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.Canvas=function(){};ops.Canvas.prototype.getZoomLevel=function(){};ops.Canvas.prototype.getElement=function(){};
// Input 35
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
(function(){function k(){function a(e){b=!0;runtime.setTimeout(function(){try{e()}catch(d){runtime.log(String(d))}b=!1;0<c.length&&a(c.pop())},10)}var c=[],b=!1;this.clearQueue=function(){c.length=0};this.addToQueue=function(e){if(0===c.length&&!b)return a(e);c.push(e)}}function h(a){function c(){for(;0<b.cssRules.length;)b.deleteRule(0);b.insertRule("#shadowContent draw|page {display:none;}",0);b.insertRule("office|presentation draw|page {display:none;}",1);b.insertRule("#shadowContent draw|page:nth-of-type("+
e+") {display:block;}",2);b.insertRule("office|presentation draw|page:nth-of-type("+e+") {display:block;}",3)}var b=a.sheet,e=1;this.showFirstPage=function(){e=1;c()};this.showNextPage=function(){e+=1;c()};this.showPreviousPage=function(){1<e&&(e-=1,c())};this.showPage=function(a){0<a&&(e=a,c())};this.css=a;this.destroy=function(c){a.parentNode.removeChild(a);c()}}function b(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function p(a){a=a.sheet;for(var c=a.cssRules;c.length;)a.deleteRule(c.length-
1)}function d(a,c,b){(new odf.Style2CSS).style2css(a.getDocumentType(),b.sheet,c.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function n(a,c,b){var e=null;a=a.rootElement.body.getElementsByTagNameNS(F,b+"-decl");b=c.getAttributeNS(F,"use-"+b+"-name");var d;if(b&&0<a.length)for(c=0;c<a.length;c+=1)if(d=a[c],d.getAttributeNS(F,"name")===b){e=d.textContent;break}return e}function g(a,c,e,d){var f=a.ownerDocument;c=a.getElementsByTagNameNS(c,e);for(a=0;a<c.length;a+=1)b(c[a]),d&&(e=
c[a],e.appendChild(f.createTextNode(d)))}function q(a,c,b){c.setAttributeNS("urn:webodf:names:helper","styleid",a);var e,d=c.getAttributeNS(J,"anchor-type"),f=c.getAttributeNS(s,"x"),g=c.getAttributeNS(s,"y"),m=c.getAttributeNS(s,"width"),l=c.getAttributeNS(s,"height"),h=c.getAttributeNS(x,"min-height"),k=c.getAttributeNS(x,"min-width");if("as-char"===d)e="display: inline-block;";else if(d||f||g)e="position: absolute;";else if(m||l||h||k)e="display: block;";f&&(e+="left: "+f+";");g&&(e+="top: "+g+
";");m&&(e+="width: "+m+";");l&&(e+="height: "+l+";");h&&(e+="min-height: "+h+";");k&&(e+="min-width: "+k+";");e&&(e="draw|"+c.localName+'[webodfhelper|styleid="'+a+'"] {'+e+"}",b.insertRule(e,b.cssRules.length))}function r(a){for(a=a.firstChild;a;){if(a.namespaceURI===v&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function l(a,c,b,e){function d(c){c&&(c='draw|image[webodfhelper|styleid="'+a+'"] {'+("background-image: url("+
c+");")+"}",e.insertRule(c,e.cssRules.length))}function f(a){d(a.url)}b.setAttributeNS("urn:webodf:names:helper","styleid",a);var g=b.getAttributeNS(G,"href"),m;if(g)try{m=c.getPart(g),m.onchange=f,m.load()}catch(l){runtime.log("slight problem: "+String(l))}else g=r(b),d(g)}function f(a){var c=a.ownerDocument;Q.getElementsByTagNameNS(a,J,"line-break").forEach(function(a){a.hasChildNodes()||a.appendChild(c.createElement("br"))})}function c(a){var c=a.ownerDocument;Q.getElementsByTagNameNS(a,J,"s").forEach(function(a){for(var b,
e;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(c.createTextNode(" "));e=parseInt(a.getAttributeNS(J,"c"),10);if(1<e)for(a.removeAttributeNS(J,"c"),b=1;b<e;b+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function a(a){Q.getElementsByTagNameNS(a,J,"tab").forEach(function(a){a.textContent="\t"})}function m(a,c){function b(a,e){var g=m.documentElement.namespaceURI;"video/"===e.substr(0,6)?(d=m.createElementNS(g,"video"),d.setAttribute("controls","controls"),f=m.createElementNS(g,"source"),
a&&f.setAttribute("src",a),f.setAttribute("type",e),d.appendChild(f),c.parentNode.appendChild(d)):c.innerHtml="Unrecognised Plugin"}function e(a){b(a.url,a.mimetype)}var d,f,g,m=c.ownerDocument,l;if(g=c.getAttributeNS(G,"href"))try{l=a.getPart(g),l.onchange=e,l.load()}catch(h){runtime.log("slight problem: "+String(h))}else runtime.log("using MP4 data fallback"),g=r(c),b(g,"video/mp4")}function e(a){var c=a.getElementsByTagName("head")[0],b,e;b=a.styleSheets.length;for(e=c.firstElementChild;e&&("style"!==
e.localName||!e.hasAttribute("webodfcss"));)e=e.nextElementSibling;if(e)return b=parseInt(e.getAttribute("webodfcss"),10),e.setAttribute("webodfcss",b+1),e;"string"===String(typeof webodf_css)?b=webodf_css:(e="webodf.css",runtime.currentDirectory&&(e=runtime.currentDirectory(),0<e.length&&"/"!==e.substr(-1)&&(e+="/"),e+="../webodf.css"),b=runtime.readFileSync(e,"utf-8"));e=a.createElementNS(c.namespaceURI,"style");e.setAttribute("media","screen, print, handheld, projection");e.setAttribute("type",
"text/css");e.setAttribute("webodfcss","1");e.appendChild(a.createTextNode(b));c.appendChild(e);return e}function t(a){var c=parseInt(a.getAttribute("webodfcss"),10);1===c?a.parentNode.removeChild(a):a.setAttribute("count",c-1)}function w(a){var c=a.getElementsByTagName("head")[0],b=a.createElementNS(c.namespaceURI,"style"),e="";b.setAttribute("type","text/css");b.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,c){e+="@namespace "+a+" url("+c+");\n"});
e+="@namespace webodfhelper url(urn:webodf:names:helper);\n";b.appendChild(a.createTextNode(e));c.appendChild(b);return b}var z=odf.Namespaces.drawns,x=odf.Namespaces.fons,v=odf.Namespaces.officens,u=odf.Namespaces.stylens,s=odf.Namespaces.svgns,A=odf.Namespaces.tablens,J=odf.Namespaces.textns,G=odf.Namespaces.xlinkns,D=odf.Namespaces.xmlns,F=odf.Namespaces.presentationns,O=runtime.getWindow(),K=xmldom.XPath,Z=new odf.OdfUtils,Q=new core.DomUtils;odf.OdfCanvas=function(r){function s(a,c,b){function e(a,
c,b,d){C.addToQueue(function(){l(a,c,b,d)})}var d,f;d=c.getElementsByTagNameNS(z,"image");for(c=0;c<d.length;c+=1)f=d.item(c),e("image"+String(c),a,f,b)}function x(a,c){function b(a,c){C.addToQueue(function(){m(a,c)})}var e,d,f;d=c.getElementsByTagNameNS(z,"plugin");for(e=0;e<d.length;e+=1)f=d.item(e),b(a,f)}function G(){var a;a=S.firstChild;var c=ba.getZoomLevel();a&&(S.style.WebkitTransformOrigin="0% 0%",S.style.MozTransformOrigin="0% 0%",S.style.msTransformOrigin="0% 0%",S.style.OTransformOrigin=
"0% 0%",S.style.transformOrigin="0% 0%",P&&((a=P.getMinimumHeightForAnnotationPane())?S.style.minHeight=a:S.style.removeProperty("min-height")),r.style.width=Math.round(c*S.offsetWidth)+"px",r.style.height=Math.round(c*S.offsetHeight)+"px")}function aa(a){da?(U.parentNode||S.appendChild(U),P&&P.forgetAnnotations(),P=new gui.AnnotationViewManager(I,a.body,U,ka),Q.getElementsByTagNameNS(a.body,v,"annotation").forEach(P.addAnnotation),P.rerenderAnnotations(),G()):U.parentNode&&(S.removeChild(U),P.forgetAnnotations(),
G())}function N(e){function m(){p(V);p(ga);p(ha);b(r);r.style.display="inline-block";var l=Y.rootElement;r.ownerDocument.importNode(l,!0);M.setOdfContainer(Y);var h=Y,k=V;(new odf.FontLoader).loadFonts(h,k.sheet);d(Y,M,ga);k=Y;h=ha.sheet;b(r);S=ca.createElementNS(r.namespaceURI,"div");S.style.display="inline-block";S.style.background="white";S.style.setProperty("float","left","important");S.appendChild(l);r.appendChild(S);U=ca.createElementNS(r.namespaceURI,"div");U.id="annotationsPane";$=ca.createElementNS(r.namespaceURI,
"div");$.id="shadowContent";$.style.position="absolute";$.style.top=0;$.style.left=0;k.getContentElement().appendChild($);var t=l.body,w,G=[],y;for(w=t.firstElementChild;w&&w!==t;)if(w.namespaceURI===z&&(G[G.length]=w),w.firstElementChild)w=w.firstElementChild;else{for(;w&&w!==t&&!w.nextElementSibling;)w=w.parentNode;w&&w.nextElementSibling&&(w=w.nextElementSibling)}for(y=0;y<G.length;y+=1)w=G[y],q("frame"+String(y),w,h);G=K.getODFElementsWithXPath(t,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.lookupNamespaceURI);
for(w=0;w<G.length;w+=1)t=G[w],t.setAttributeNS&&t.setAttributeNS("urn:webodf:names:helper","containsparagraphanchor",!0);var t=$,B,C,N;N=0;var I,E,G=k.rootElement.ownerDocument;if((w=l.body.firstElementChild)&&w.namespaceURI===v&&("presentation"===w.localName||"drawing"===w.localName))for(w=w.firstElementChild;w;){y=w.getAttributeNS(z,"master-page-name");if(y){for(B=k.rootElement.masterStyles.firstElementChild;B&&(B.getAttributeNS(u,"name")!==y||"master-page"!==B.localName||B.namespaceURI!==u);)B=
B.nextElementSibling;y=B}else y=null;if(y){B=w.getAttributeNS("urn:webodf:names:helper","styleid");C=G.createElementNS(z,"draw:page");E=y.firstElementChild;for(I=0;E;)"true"!==E.getAttributeNS(F,"placeholder")&&(N=E.cloneNode(!0),C.appendChild(N),q(B+"_"+I,N,h)),E=E.nextElementSibling,I+=1;E=I=N=void 0;var R=C.getElementsByTagNameNS(z,"frame");for(N=0;N<R.length;N+=1)I=R[N],(E=I.getAttributeNS(F,"class"))&&!/^(date-time|footer|header|page-number)$/.test(E)&&I.parentNode.removeChild(I);t.appendChild(C);
N=String(t.getElementsByTagNameNS(z,"page").length);g(C,J,"page-number",N);g(C,F,"header",n(k,w,"header"));g(C,F,"footer",n(k,w,"footer"));q(B,C,h);C.setAttributeNS(z,"draw:master-page-name",y.getAttributeNS(u,"name"))}w=w.nextElementSibling}t=r.namespaceURI;G=l.body.getElementsByTagNameNS(A,"table-cell");for(w=0;w<G.length;w+=1)y=G.item(w),y.hasAttributeNS(A,"number-columns-spanned")&&y.setAttributeNS(t,"colspan",y.getAttributeNS(A,"number-columns-spanned")),y.hasAttributeNS(A,"number-rows-spanned")&&
y.setAttributeNS(t,"rowspan",y.getAttributeNS(A,"number-rows-spanned"));f(l.body);c(l.body);a(l.body);s(k,l.body,h);x(k,l.body);y=l.body;k=r.namespaceURI;w={};var G={},Q;B=O.document.getElementsByTagNameNS(J,"list-style");for(t=0;t<B.length;t+=1)I=B.item(t),(E=I.getAttributeNS(u,"name"))&&(G[E]=I);y=y.getElementsByTagNameNS(J,"list");for(t=0;t<y.length;t+=1)if(I=y.item(t),B=I.getAttributeNS(D,"id")){C=I.getAttributeNS(J,"continue-list");I.setAttributeNS(k,"id",B);N="text|list#"+B+" > text|list-item > *:first-child:before {";
if(E=I.getAttributeNS(J,"style-name")){I=G[E];Q=Z.getFirstNonWhitespaceChild(I);I=void 0;if(Q)if("list-level-style-number"===Q.localName){I=Q.getAttributeNS(u,"num-format");E=Q.getAttributeNS(u,"num-suffix")||"";var R="",R={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},L=void 0,L=Q.getAttributeNS(u,"num-prefix")||"",L=R.hasOwnProperty(I)?L+(" counter(list, "+R[I]+")"):I?L+("'"+I+"';"):L+" ''";E&&(L+=" '"+E+"'");I=R="content: "+L+";"}else"list-level-style-image"===Q.localName?
I="content: none;":"list-level-style-bullet"===Q.localName&&(I="content: '"+Q.getAttributeNS(J,"bullet-char")+"';");Q=I}if(C){for(I=w[C];I;)I=w[I];N+="counter-increment:"+C+";";Q?(Q=Q.replace("list",C),N+=Q):N+="content:counter("+C+");"}else C="",Q?(Q=Q.replace("list",B),N+=Q):N+="content: counter("+B+");",N+="counter-increment:"+B+";",h.insertRule("text|list#"+B+" {counter-reset:"+B+"}",h.cssRules.length);N+="}";w[B]=C;N&&h.insertRule(N,h.cssRules.length)}S.insertBefore($,S.firstChild);ba.setZoomableElement(S);
aa(l);if(!e&&(l=[Y],ea.hasOwnProperty("statereadychange")))for(h=ea.statereadychange,Q=0;Q<h.length;Q+=1)h[Q].apply(null,l)}Y.state===odf.OdfContainer.DONE?m():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),fa=runtime.setTimeout(function na(){Y.state===odf.OdfContainer.DONE?m():(runtime.log("will be back later..."),fa=runtime.setTimeout(na,500))},100))}function R(a){C.clearQueue();r.innerHTML=runtime.tr("Loading")+" "+a+"...";r.removeAttribute("style");Y=new odf.OdfContainer(a,function(a){Y=
a;N(!1)})}runtime.assert(null!==r&&void 0!==r,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==r.ownerDocument&&void 0!==r.ownerDocument,"odf.OdfCanvas constructor needs DOM");var I=this,ca=r.ownerDocument,ia=new core.Async,Y,M=new odf.Formatting,E,S=null,U=null,da=!1,ka=!1,P=null,X,V,ga,ha,$,ea={},fa,ja,L=!1,B=!1,C=new k,ba=new gui.ZoomHelper;this.refreshCSS=function(){L=!0;ja.trigger()};this.refreshSize=function(){ja.trigger()};this.odfContainer=function(){return Y};this.setOdfContainer=
function(a,c){Y=a;N(!0===c)};this.load=this.load=R;this.save=function(a){Y.save(a)};this.addListener=function(a,c){switch(a){case "click":var b=r,e=a;b.addEventListener?b.addEventListener(e,c,!1):b.attachEvent?b.attachEvent("on"+e,c):b["on"+e]=c;break;default:b=ea.hasOwnProperty(a)?ea[a]:ea[a]=[],c&&-1===b.indexOf(c)&&b.push(c)}};this.getFormatting=function(){return M};this.getAnnotationViewManager=function(){return P};this.refreshAnnotations=function(){aa(Y.rootElement)};this.rerenderAnnotations=
function(){P&&(B=!0,ja.trigger())};this.getSizer=function(){return S};this.enableAnnotations=function(a,c){a!==da&&(da=a,ka=c,Y&&aa(Y.rootElement))};this.addAnnotation=function(a){P&&(P.addAnnotation(a),G())};this.forgetAnnotations=function(){P&&(P.forgetAnnotations(),G())};this.getZoomHelper=function(){return ba};this.setZoomLevel=function(a){ba.setZoomLevel(a)};this.getZoomLevel=function(){return ba.getZoomLevel()};this.fitToContainingElement=function(a,c){var b=ba.getZoomLevel(),e=r.offsetHeight/
b,b=a/(r.offsetWidth/b);c/e<b&&(b=c/e);ba.setZoomLevel(b)};this.fitToWidth=function(a){var c=r.offsetWidth/ba.getZoomLevel();ba.setZoomLevel(a/c)};this.fitSmart=function(a,c){var b,e;e=ba.getZoomLevel();b=r.offsetWidth/e;e=r.offsetHeight/e;b=a/b;void 0!==c&&c/e<b&&(b=c/e);ba.setZoomLevel(Math.min(1,b))};this.fitToHeight=function(a){var c=r.offsetHeight/ba.getZoomLevel();ba.setZoomLevel(a/c)};this.showFirstPage=function(){E.showFirstPage()};this.showNextPage=function(){E.showNextPage()};this.showPreviousPage=
function(){E.showPreviousPage()};this.showPage=function(a){E.showPage(a);G()};this.getElement=function(){return r};this.addCssForFrameWithImage=function(a){var c=a.getAttributeNS(z,"name"),b=a.firstElementChild;q(c,a,ha.sheet);b&&l(c+"img",Y,b,ha.sheet)};this.destroy=function(a){var c=ca.getElementsByTagName("head")[0],b=[E.destroy,ja.destroy];runtime.clearTimeout(fa);U&&U.parentNode&&U.parentNode.removeChild(U);ba.destroy(function(){S&&(r.removeChild(S),S=null)});t(X);c.removeChild(V);c.removeChild(ga);
c.removeChild(ha);ia.destroyAll(b,a)};X=e(ca);E=new h(w(ca));V=w(ca);ga=w(ca);ha=w(ca);ja=new core.ScheduledTask(function(){L&&(d(Y,M,ga),L=!1);B&&(P&&P.rerenderAnnotations(),B=!1);G()},0);ba.subscribe(gui.ZoomHelper.signalZoomChanged,G)}})();
// Input 36
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.MemberProperties=function(){};
ops.Member=function(k,h){var b=new ops.MemberProperties;this.getMemberId=function(){return k};this.getProperties=function(){return b};this.setProperties=function(h){Object.keys(h).forEach(function(d){b[d]=h[d]})};this.removeProperties=function(h){Object.keys(h).forEach(function(d){"fullName"!==d&&"color"!==d&&"imageUrl"!==d&&b.hasOwnProperty(d)&&delete b[d]})};runtime.assert(Boolean(k),"No memberId was supplied!");h.fullName||(h.fullName=runtime.tr("Unknown Author"));h.color||(h.color="black");h.imageUrl||
(h.imageUrl="avatar-joe.png");b=h};
// Input 37
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.SelectionMover=function(k,h){function b(){f.setUnfilteredPosition(k.getNode(),0);return f}function p(a,c){var b,d=null;a&&0<a.length&&(b=c?a.item(a.length-1):a.item(0));b&&(d={top:b.top,left:c?b.right:b.left,bottom:b.bottom});return d}function d(a,c,b,f){var g=a.nodeType;b.setStart(a,c);b.collapse(!f);f=p(b.getClientRects(),!0===f);!f&&0<c&&(b.setStart(a,c-1),b.setEnd(a,c),f=p(b.getClientRects(),!0));f||(g===Node.ELEMENT_NODE&&0<c&&a.childNodes.length>=c?f=d(a,c-1,b,!0):a.nodeType===Node.TEXT_NODE&&
0<c?f=d(a,c-1,b,!0):a.previousSibling?f=d(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,b,!0):a.parentNode&&a.parentNode!==h?f=d(a.parentNode,0,b,!1):(b.selectNode(h),f=p(b.getClientRects(),!1)));runtime.assert(Boolean(f),"No visible rectangle found");return f}function n(a,d,e){for(var f=b(),g=new core.LoopWatchDog(1E4),l=0,h=0;0<a&&f.nextPosition();)g.check(),e.acceptPosition(f)===c&&(l+=1,d.acceptPosition(f)===
c&&(h+=l,l=0,a-=1));return h}function g(a,d,e){for(var f=b(),g=new core.LoopWatchDog(1E4),l=0,h=0;0<a&&f.previousPosition();)g.check(),e.acceptPosition(f)===c&&(l+=1,d.acceptPosition(f)===c&&(h+=l,l=0,a-=1));return h}function q(a,f){var e=b(),g=0,l=0,k=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var n=f,q=k,p=e,r=p.container(),A=0,J=null,G=void 0,D=10,F=void 0,O=0,K=void 0,Z=void 0,Q=void 0,F=void 0,W=h.ownerDocument.createRange(),H=new core.LoopWatchDog(1E4),F=d(r,p.unfilteredDomOffset(),W),K=F.top,Z=F.left,
Q=K;!0===(0>q?p.previousPosition():p.nextPosition());)if(H.check(),n.acceptPosition(p)===c&&(A+=1,r=p.container(),F=d(r,p.unfilteredDomOffset(),W),F.top!==K)){if(F.top!==Q&&Q!==K)break;Q=F.top;F=Math.abs(Z-F.left);if(null===J||F<D)J=r,G=p.unfilteredDomOffset(),D=F,O=A}null!==J?(p.setUnfilteredPosition(J,G),A=O):A=0;W.detach();g+=A;if(0===g)break;l+=g;a-=1}return l*k}function r(a,f){var e,g,k,n,q=b(),p=l.getParagraphElement(q.getCurrentNode()),r=0,s=h.ownerDocument.createRange();0>a?(e=q.previousPosition,
g=-1):(e=q.nextPosition,g=1);for(k=d(q.container(),q.unfilteredDomOffset(),s);e.call(q);)if(f.acceptPosition(q)===c){if(l.getParagraphElement(q.getCurrentNode())!==p)break;n=d(q.container(),q.unfilteredDomOffset(),s);if(n.bottom!==k.bottom&&(k=n.top>=k.top&&n.bottom<k.bottom||n.top<=k.top&&n.bottom>k.bottom,!k))break;r+=g;k=n}s.detach();return r}var l=new odf.OdfUtils,f,c=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.getStepCounter=function(){return{convertForwardStepsBetweenFilters:n,convertBackwardStepsBetweenFilters:g,
countLinesSteps:q,countStepsToLineBoundary:r}};(function(){f=gui.SelectionMover.createPositionIterator(h);var a=h.ownerDocument.createRange();a.setStart(f.container(),f.unfilteredDomOffset());a.collapse(!0);k.setSelectedRange(a)})()};
gui.SelectionMover.createPositionIterator=function(k){var h=new function(){this.acceptNode=function(b){return b&&"urn:webodf:names:cursor"!==b.namespaceURI&&"urn:webodf:names:editinfo"!==b.namespaceURI?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}};return new core.PositionIterator(k,5,h,!1)};(function(){return gui.SelectionMover})();
// Input 38
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.Document=function(){};ops.Document.prototype.getMemberIds=function(){};ops.Document.prototype.removeCursor=function(k){};ops.Document.prototype.getDocumentElement=function(){};ops.Document.prototype.getRootNode=function(){};ops.Document.prototype.getDOMDocument=function(){};ops.Document.prototype.cloneDocumentElement=function(){};ops.Document.prototype.setDocumentElement=function(k){};ops.Document.prototype.subscribe=function(k,h){};ops.Document.prototype.unsubscribe=function(k,h){};
ops.Document.prototype.getCanvas=function(){};ops.Document.prototype.createRootFilter=function(k){};ops.Document.signalCursorAdded="cursor/added";ops.Document.signalCursorRemoved="cursor/removed";ops.Document.signalCursorMoved="cursor/moved";ops.Document.signalMemberAdded="member/added";ops.Document.signalMemberUpdated="member/updated";ops.Document.signalMemberRemoved="member/removed";
// Input 39
ops.OdtCursor=function(k,h){var b=this,p={},d,n,g,q=new core.EventNotifier([ops.OdtCursor.signalCursorUpdated]);this.removeFromDocument=function(){g.remove()};this.subscribe=function(b,d){q.subscribe(b,d)};this.unsubscribe=function(b,d){q.unsubscribe(b,d)};this.getStepCounter=function(){return n.getStepCounter()};this.getMemberId=function(){return k};this.getNode=function(){return g.getNode()};this.getAnchorNode=function(){return g.getAnchorNode()};this.getSelectedRange=function(){return g.getSelectedRange()};
this.setSelectedRange=function(d,l){g.setSelectedRange(d,l);q.emit(ops.OdtCursor.signalCursorUpdated,b)};this.hasForwardSelection=function(){return g.hasForwardSelection()};this.getDocument=function(){return h};this.getSelectionType=function(){return d};this.setSelectionType=function(b){p.hasOwnProperty(b)?d=b:runtime.log("Invalid selection type: "+b)};this.resetSelectionType=function(){b.setSelectionType(ops.OdtCursor.RangeSelection)};g=new core.Cursor(h.getDOMDocument(),k);n=new gui.SelectionMover(g,
h.getRootNode());p[ops.OdtCursor.RangeSelection]=!0;p[ops.OdtCursor.RegionSelection]=!0;b.resetSelectionType()};ops.OdtCursor.RangeSelection="Range";ops.OdtCursor.RegionSelection="Region";ops.OdtCursor.signalCursorUpdated="cursorUpdated";(function(){return ops.OdtCursor})();
// Input 40
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.Operation=function(){};ops.Operation.prototype.init=function(k){};ops.Operation.prototype.execute=function(k){};ops.Operation.prototype.spec=function(){};
// Input 41
/*

 Copyright (C) 2010-2014 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
(function(){var k=0;ops.StepsCache=function(h,b,p){function d(a,c,e){this.nodeId=a;this.steps=c;this.node=e;this.previousBookmark=this.nextBookmark=null;this.setIteratorPosition=function(a){a.setPositionBeforeElement(e);do if(b.acceptPosition(a)===u)break;while(a.nextPosition())}}function n(a,c,e){this.nodeId=a;this.steps=c;this.node=e;this.previousBookmark=this.nextBookmark=null;this.setIteratorPosition=function(a){a.setUnfilteredPosition(e,0);do if(b.acceptPosition(a)===u)break;while(a.nextPosition())}}
function g(a,c){var b="["+a.nodeId;c&&(b+=" => "+c.nodeId);return b+"]"}function q(){for(var a=x,c,b,e,d=new core.LoopWatchDog(0,1E5);a;){d.check();(c=a.previousBookmark)?runtime.assert(c.nextBookmark===a,"Broken bookmark link to previous @"+g(c,a)):(runtime.assert(a===x,"Broken bookmark link @"+g(a)),runtime.assert(void 0===v||x.steps<=v,"Base point is damaged @"+g(a)));(b=a.nextBookmark)&&runtime.assert(b.previousBookmark===a,"Broken bookmark link to next @"+g(a,b));if(void 0===v||a.steps<=v)runtime.assert(z.containsNode(h,
a.node),"Disconnected node is being reported as undamaged @"+g(a)),c&&(e=a.node.compareDocumentPosition(c.node),runtime.assert(0===e||0!==(e&Node.DOCUMENT_POSITION_PRECEDING),"Bookmark order with previous does not reflect DOM order @"+g(c,a))),b&&z.containsNode(h,b.node)&&(e=a.node.compareDocumentPosition(b.node),runtime.assert(0===e||0!==(e&Node.DOCUMENT_POSITION_FOLLOWING),"Bookmark order with next does not reflect DOM order @"+g(a,b)));a=a.nextBookmark}}function r(a){var c="";a.nodeType===Node.ELEMENT_NODE&&
(c=a.getAttributeNS(m,"nodeId"));return c}function l(a){var c=k.toString();a.setAttributeNS(m,"nodeId",c);k+=1;return c}function f(a){var c,b,d=new core.LoopWatchDog(0,1E4);void 0!==v&&a>v&&(a=v);for(c=Math.floor(a/p)*p;!b&&0!==c;)b=e[c],c-=p;for(b=b||x;b.nextBookmark&&b.nextBookmark.steps<=a;)d.check(),b=b.nextBookmark;return b}function c(a){a.previousBookmark&&(a.previousBookmark.nextBookmark=a.nextBookmark);a.nextBookmark&&(a.nextBookmark.previousBookmark=a.previousBookmark)}function a(a){for(var c,
b=null;!b&&a&&a!==h;)(c=r(a))&&(b=t[c])&&b.node!==a&&(runtime.log("Cloned node detected. Creating new bookmark"),b=null,a.removeAttributeNS(m,"nodeId")),a=a.parentNode;return b}var m="urn:webodf:names:steps",e={},t={},w=new odf.OdfUtils,z=new core.DomUtils,x,v,u=core.PositionFilter.FilterResult.FILTER_ACCEPT,s;this.updateCache=function(a,b,g){var m;m=b.getCurrentNode();if(b.isBeforeNode()&&w.isParagraph(m)){g||(a+=1);b=a;var k,n,q;if(void 0!==v&&v<b){k=f(v);for(g=k.nextBookmark;g&&g.steps<=b;)n=g.nextBookmark,
q=Math.ceil(g.steps/p)*p,e[q]===g&&delete e[q],z.containsNode(h,g.node)?g.steps=b+1:(c(g),delete t[g.nodeId]),g=n;v=b}else k=f(b);b=k;g=r(m)||l(m);(k=t[g])?k.node===m?k.steps=a:(runtime.log("Cloned node detected. Creating new bookmark"),g=l(m),k=t[g]=new d(g,a,m)):k=t[g]=new d(g,a,m);m=k;b!==m&&b.nextBookmark!==m&&(c(m),a=b.nextBookmark,m.nextBookmark=b.nextBookmark,m.previousBookmark=b,b.nextBookmark=m,a&&(a.previousBookmark=m));a=Math.ceil(m.steps/p)*p;b=e[a];if(!b||m.steps>b.steps)e[a]=m;s()}};
this.setToClosestStep=function(a,c){var b;s();b=f(a);b.setIteratorPosition(c);return b.steps};this.setToClosestDomPoint=function(c,b,d){var g,m;s();if(c===h&&0===b)g=x;else if(c===h&&b===h.childNodes.length)for(m in g=x,e)e.hasOwnProperty(m)&&(c=e[m],c.steps>g.steps&&(g=c));else if(g=a(c.childNodes.item(b)||c),!g)for(d.setUnfilteredPosition(c,b);!g&&d.previousNode();)g=a(d.getCurrentNode());g=g||x;void 0!==v&&g.steps>v&&(g=f(v));g.setIteratorPosition(d);return g.steps};this.damageCacheAfterStep=function(a){0>
a&&(a=0);void 0===v?v=a:a<v&&(v=a);s()};(function(){var a=r(h)||l(h);x=new n(a,0,h);s=ops.StepsCache.ENABLE_CACHE_VERIFICATION?q:function(){}})()};ops.StepsCache.ENABLE_CACHE_VERIFICATION=!1;ops.StepsCache.Bookmark=function(){};ops.StepsCache.Bookmark.prototype.setIteratorPosition=function(h){}})();
// Input 42
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
(function(){ops.StepsTranslator=function(k,h,b,p){function d(){var c=k();c!==g&&(runtime.log("Undo detected. Resetting steps cache"),g=c,q=new ops.StepsCache(g,b,p),l=h(g))}function n(c,a){if(!a||b.acceptPosition(c)===f)return!0;for(;c.previousPosition();)if(b.acceptPosition(c)===f){if(a(0,c.container(),c.unfilteredDomOffset()))return!0;break}for(;c.nextPosition();)if(b.acceptPosition(c)===f){if(a(1,c.container(),c.unfilteredDomOffset()))return!0;break}return!1}var g=k(),q=new ops.StepsCache(g,b,
p),r=new core.DomUtils,l=h(k()),f=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.convertStepsToDomPoint=function(c){var a,g;if(isNaN(c))throw new TypeError("Requested steps is not numeric ("+c+")");if(0>c)throw new RangeError("Requested steps is negative ("+c+")");d();for(a=q.setToClosestStep(c,l);a<c&&l.nextPosition();)(g=b.acceptPosition(l)===f)&&(a+=1),q.updateCache(a,l,g);if(a!==c)throw new RangeError("Requested steps ("+c+") exceeds available steps ("+a+")");return{node:l.container(),offset:l.unfilteredDomOffset()}};
this.convertDomPointToSteps=function(c,a,m){var e;d();r.containsNode(g,c)||(a=0>r.comparePoints(g,0,c,a),c=g,a=a?0:g.childNodes.length);l.setUnfilteredPosition(c,a);n(l,m)||l.setUnfilteredPosition(c,a);m=l.container();a=l.unfilteredDomOffset();c=q.setToClosestDomPoint(m,a,l);if(0>r.comparePoints(l.container(),l.unfilteredDomOffset(),m,a))return 0<c?c-1:c;for(;(l.container()!==m||l.unfilteredDomOffset()!==a)&&l.nextPosition();)(e=b.acceptPosition(l)===f)&&(c+=1),q.updateCache(c,l,e);return c+0};this.prime=
function(){var c,a;d();for(c=q.setToClosestStep(0,l);l.nextPosition();)(a=b.acceptPosition(l)===f)&&(c+=1),q.updateCache(c,l,a)};this.handleStepsInserted=function(c){d();q.damageCacheAfterStep(c.position)};this.handleStepsRemoved=function(c){d();q.damageCacheAfterStep(c.position-1)}};ops.StepsTranslator.PREVIOUS_STEP=0;ops.StepsTranslator.NEXT_STEP=1;return ops.StepsTranslator})();
// Input 43
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.TextPositionFilter=function(k){function h(d,h,l){var f,c;if(h){if(b.isInlineRoot(h)&&b.isGroupingElement(l))return g;f=b.lookLeftForCharacter(h);if(1===f||2===f&&(b.scanRightForAnyCharacter(l)||b.scanRightForAnyCharacter(b.nextNode(d))))return n}f=null===h&&b.isParagraph(d);c=b.lookRightForCharacter(l);if(f)return c?n:b.scanRightForAnyCharacter(l)?g:n;if(!c)return g;h=h||b.previousNode(d);return b.scanLeftForAnyCharacter(h)?g:n}var b=new odf.OdfUtils,p=Node.ELEMENT_NODE,d=Node.TEXT_NODE,n=core.PositionFilter.FilterResult.FILTER_ACCEPT,
g=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(q){var r=q.container(),l=r.nodeType,f,c,a;if(l!==p&&l!==d)return g;if(l===d){if(!b.isGroupingElement(r.parentNode)||b.isWithinTrackedChanges(r.parentNode,k()))return g;l=q.unfilteredDomOffset();f=r.data;runtime.assert(l!==f.length,"Unexpected offset.");if(0<l){q=f[l-1];if(!b.isODFWhitespace(q))return n;if(1<l)if(q=f[l-2],!b.isODFWhitespace(q))c=n;else{if(!b.isODFWhitespace(f.substr(0,l)))return g}else a=b.previousNode(r),
b.scanLeftForNonSpace(a)&&(c=n);if(c===n)return b.isTrailingWhitespace(r,l)?g:n;c=f[l];return b.isODFWhitespace(c)?g:b.scanLeftForAnyCharacter(b.previousNode(r))?g:n}a=q.leftNode();c=r;r=r.parentNode;c=h(r,a,c)}else!b.isGroupingElement(r)||b.isWithinTrackedChanges(r,k())?c=g:(a=q.leftNode(),c=q.rightNode(),c=h(r,a,c));return c}};
// Input 44
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OdtDocument=function(k){function h(){var a=k.odfContainer().getContentElement(),c=a&&a.localName;runtime.assert("text"===c,"Unsupported content element type '"+c+"' for OdtDocument");return a}function b(){return c.getDocumentElement().ownerDocument}function p(a){for(;a&&!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}function d(a){this.acceptPosition=function(c){c=c.container();var b;
b="string"===typeof a?e[a].getNode():a;return p(c)===p(b)?z:x}}function n(a,c,b,e){e=gui.SelectionMover.createPositionIterator(e);var d;1===b.length?d=b[0]:(d=new core.PositionFilterChain,b.forEach(d.addFilter));b=new core.StepIterator(d,e);b.setPosition(a,c);return b}function g(a){var c=gui.SelectionMover.createPositionIterator(h());a=u.convertStepsToDomPoint(a);c.setUnfilteredPosition(a.node,a.offset);return c}function q(c){return a.getParagraphElement(c)}function r(a,c){return k.getFormatting().getStyleElement(a,
c)}function l(a){return r(a,"paragraph")}function f(a,c,b){a=a.childNodes.item(c)||a;return(a=q(a))&&m.containsNode(b,a)?a:b}var c=this,a,m,e={},t={},w=new core.EventNotifier([ops.Document.signalMemberAdded,ops.Document.signalMemberUpdated,ops.Document.signalMemberRemoved,ops.Document.signalCursorAdded,ops.Document.signalCursorRemoved,ops.Document.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonStyleCreated,ops.OdtDocument.signalCommonStyleDeleted,
ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationStart,ops.OdtDocument.signalOperationEnd,ops.OdtDocument.signalProcessingBatchStart,ops.OdtDocument.signalProcessingBatchEnd,ops.OdtDocument.signalUndoStackChanged,ops.OdtDocument.signalStepsInserted,ops.OdtDocument.signalStepsRemoved]),z=core.PositionFilter.FilterResult.FILTER_ACCEPT,x=core.PositionFilter.FilterResult.FILTER_REJECT,v,u,s;this.getDocumentElement=function(){return k.odfContainer().rootElement};this.getDOMDocument=function(){return this.getDocumentElement().ownerDocument};
this.cloneDocumentElement=function(){var a=c.getDocumentElement(),b=k.getAnnotationViewManager();b&&b.forgetAnnotations();a=a.cloneNode(!0);k.refreshAnnotations();return a};this.setDocumentElement=function(a){var c=k.odfContainer();c.setRootElement(a);k.setOdfContainer(c,!0);k.refreshCSS()};this.getDOMDocument=b;this.getRootElement=p;this.createStepIterator=n;this.getIteratorAtPosition=g;this.convertDomPointToCursorStep=function(a,c,b){return u.convertDomPointToSteps(a,c,b)};this.convertDomToCursorRange=
function(a,c){var b,e;b=c&&c(a.anchorNode,a.anchorOffset);b=u.convertDomPointToSteps(a.anchorNode,a.anchorOffset,b);c||a.anchorNode!==a.focusNode||a.anchorOffset!==a.focusOffset?(e=c&&c(a.focusNode,a.focusOffset),e=u.convertDomPointToSteps(a.focusNode,a.focusOffset,e)):e=b;return{position:b,length:e-b}};this.convertCursorToDomRange=function(a,c){var e=b().createRange(),d,f;d=u.convertStepsToDomPoint(a);c?(f=u.convertStepsToDomPoint(a+c),0<c?(e.setStart(d.node,d.offset),e.setEnd(f.node,f.offset)):
(e.setStart(f.node,f.offset),e.setEnd(d.node,d.offset))):e.setStart(d.node,d.offset);return e};this.getStyleElement=r;this.upgradeWhitespacesAtPosition=function(c){c=g(c);var b,e,d;c.previousPosition();c.previousPosition();for(d=-1;1>=d;d+=1){b=c.container();e=c.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[e]&&a.isSignificantWhitespace(b,e)){runtime.assert(" "===b.data[e],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=b.ownerDocument.createElementNS(odf.Namespaces.textns,
"text:s"),m=b.parentNode,l=b;f.appendChild(b.ownerDocument.createTextNode(" "));1===b.length?m.replaceChild(f,b):(b.deleteData(e,1),0<e&&(e<b.length&&b.splitText(e),l=b.nextSibling),m.insertBefore(f,l));b=f;c.moveToEndOfNode(b)}c.nextPosition()}};this.downgradeWhitespacesAtPosition=function(c){var b=g(c),e;c=b.container();for(b=b.unfilteredDomOffset();!a.isSpaceElement(c)&&c.childNodes.item(b);)c=c.childNodes.item(b),b=0;c.nodeType===Node.TEXT_NODE&&(c=c.parentNode);a.isDowngradableSpaceElement(c)&&
(b=c.firstChild,e=c.lastChild,m.mergeIntoParent(c),e!==b&&m.normalizeTextNodes(e),m.normalizeTextNodes(b))};this.getParagraphStyleElement=l;this.getParagraphElement=q;this.getParagraphStyleAttributes=function(a){return(a=l(a))?k.getFormatting().getInheritedStyleAttributes(a,!1):null};this.getTextNodeAtStep=function(a,d){var f=g(a),m=f.container(),l,h=0,k=null;m.nodeType===Node.TEXT_NODE?(l=m,h=f.unfilteredDomOffset(),0<l.length&&(0<h&&(l=l.splitText(h)),l.parentNode.insertBefore(b().createTextNode(""),
l),l=l.previousSibling,h=0)):(l=b().createTextNode(""),h=0,m.insertBefore(l,f.rightNode()));if(d){if(e[d]&&c.getCursorPosition(d)===a){for(k=e[d].getNode();k.nextSibling&&"cursor"===k.nextSibling.localName;)k.parentNode.insertBefore(k.nextSibling,k);0<l.length&&l.nextSibling!==k&&(l=b().createTextNode(""),h=0);k.parentNode.insertBefore(l,k)}}else for(;l.nextSibling&&"cursor"===l.nextSibling.localName;)l.parentNode.insertBefore(l.nextSibling,l);for(;l.previousSibling&&l.previousSibling.nodeType===
Node.TEXT_NODE;)f=l.previousSibling,f.appendData(l.data),h=f.length,l=f,l.parentNode.removeChild(l.nextSibling);for(;l.nextSibling&&l.nextSibling.nodeType===Node.TEXT_NODE;)f=l.nextSibling,l.appendData(f.data),l.parentNode.removeChild(f);return{textNode:l,offset:h}};this.fixCursorPositions=function(){Object.keys(e).forEach(function(a){var b=e[a],d=p(b.getNode()),g=c.createRootFilter(d),m,l,h,k=!1;h=b.getSelectedRange();m=f(h.startContainer,h.startOffset,d);l=n(h.startContainer,h.startOffset,[v,g],
m);h.collapsed?d=l:(m=f(h.endContainer,h.endOffset,d),d=n(h.endContainer,h.endOffset,[v,g],m));l.isStep()&&d.isStep()?l.container()!==d.container()||l.offset()!==d.offset()||h.collapsed&&b.getAnchorNode()===b.getNode()||(k=!0,h.setStart(l.container(),l.offset()),h.collapse(!0)):(k=!0,runtime.assert(l.roundToClosestStep(),"No walkable step found for cursor owned by "+a),h.setStart(l.container(),l.offset()),runtime.assert(d.roundToClosestStep(),"No walkable step found for cursor owned by "+a),h.setEnd(d.container(),
d.offset()));k&&(b.setSelectedRange(h,b.hasForwardSelection()),c.emit(ops.Document.signalCursorMoved,b))})};this.getCursorPosition=function(a){return(a=e[a])?u.convertDomPointToSteps(a.getNode(),0):0};this.getCursorSelection=function(a){a=e[a];var c=0,b=0;a&&(c=u.convertDomPointToSteps(a.getNode(),0),b=u.convertDomPointToSteps(a.getAnchorNode(),0));return{position:b,length:c-b}};this.getPositionFilter=function(){return v};this.getOdfCanvas=function(){return k};this.getCanvas=function(){return k};
this.getRootNode=h;this.addMember=function(a){runtime.assert(void 0===t[a.getMemberId()],"This member already exists");t[a.getMemberId()]=a};this.getMember=function(a){return t.hasOwnProperty(a)?t[a]:null};this.removeMember=function(a){delete t[a]};this.getCursor=function(a){return e[a]};this.getMemberIds=function(){var a=[],c;for(c in e)e.hasOwnProperty(c)&&a.push(e[c].getMemberId());return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getMemberId(),
d=c.convertCursorToDomRange(0,0);runtime.assert("string"===typeof b,"OdtDocument::addCursor has cursor without memberid");runtime.assert(!e[b],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+b);a.setSelectedRange(d,!0);e[b]=a};this.removeCursor=function(a){var b=e[a];return b?(b.removeFromDocument(),delete e[a],c.emit(ops.Document.signalCursorRemoved,a),!0):!1};this.moveCursor=function(a,b,d,f){a=e[a];b=c.convertCursorToDomRange(b,d);a&&(a.setSelectedRange(b,0<=d),a.setSelectionType(f||
ops.OdtCursor.RangeSelection))};this.getFormatting=function(){return k.getFormatting()};this.emit=function(a,c){w.emit(a,c)};this.subscribe=function(a,c){w.subscribe(a,c)};this.unsubscribe=function(a,c){w.unsubscribe(a,c)};this.createRootFilter=function(a){return new d(a)};this.close=function(a){a()};this.destroy=function(a){a()};v=new ops.TextPositionFilter(h);a=new odf.OdfUtils;m=new core.DomUtils;u=new ops.StepsTranslator(h,gui.SelectionMover.createPositionIterator,v,500);w.subscribe(ops.OdtDocument.signalStepsInserted,
u.handleStepsInserted);w.subscribe(ops.OdtDocument.signalStepsRemoved,u.handleStepsRemoved);w.subscribe(ops.OdtDocument.signalOperationEnd,function(a){var b=a.spec(),e=b.memberid,b=(new Date(b.timestamp)).toISOString(),d=k.odfContainer();a.isEdit&&(e=c.getMember(e).getProperties().fullName,d.setMetadata({"dc:creator":e,"dc:date":b},null),s||(d.incrementEditingCycles(),d.setMetadata(null,["meta:editing-duration","meta:document-statistic"])),s=a)})};ops.OdtDocument.signalParagraphChanged="paragraph/changed";
ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalCommonStyleCreated="style/created";ops.OdtDocument.signalCommonStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationStart="operation/start";ops.OdtDocument.signalOperationEnd="operation/end";ops.OdtDocument.signalProcessingBatchStart="router/batchstart";ops.OdtDocument.signalProcessingBatchEnd="router/batchend";ops.OdtDocument.signalUndoStackChanged="undo/changed";
ops.OdtDocument.signalStepsInserted="steps/inserted";ops.OdtDocument.signalStepsRemoved="steps/removed";(function(){return ops.OdtDocument})();
// Input 45
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpAddAnnotation=function(){function k(b,d,g){var f=b.getTextNodeAtStep(g,h);f&&(b=f.textNode,g=b.parentNode,f.offset!==b.length&&b.splitText(f.offset),g.insertBefore(d,b.nextSibling),0===b.length&&g.removeChild(b))}var h,b,p,d,n,g;this.init=function(g){h=g.memberid;b=parseInt(g.timestamp,10);p=parseInt(g.position,10);d=parseInt(g.length,10)||0;n=g.name};this.isEdit=!0;this.group=void 0;this.execute=function(q){var r=q.getCursor(h),l,f;f=new core.DomUtils;g=q.getDOMDocument();var c=new Date(b),
a,m,e,t;a=g.createElementNS(odf.Namespaces.officens,"office:annotation");a.setAttributeNS(odf.Namespaces.officens,"office:name",n);l=g.createElementNS(odf.Namespaces.dcns,"dc:creator");l.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h);l.textContent=q.getMember(h).getProperties().fullName;m=g.createElementNS(odf.Namespaces.dcns,"dc:date");m.appendChild(g.createTextNode(c.toISOString()));c=g.createElementNS(odf.Namespaces.textns,"text:list");e=g.createElementNS(odf.Namespaces.textns,
"text:list-item");t=g.createElementNS(odf.Namespaces.textns,"text:p");e.appendChild(t);c.appendChild(e);a.appendChild(l);a.appendChild(m);a.appendChild(c);d&&(l=g.createElementNS(odf.Namespaces.officens,"office:annotation-end"),l.setAttributeNS(odf.Namespaces.officens,"office:name",n),a.annotationEndElement=l,k(q,l,p+d));k(q,a,p);q.emit(ops.OdtDocument.signalStepsInserted,{position:p,length:d});r&&(l=g.createRange(),f=f.getElementsByTagNameNS(a,odf.Namespaces.textns,"p")[0],l.selectNodeContents(f),
r.setSelectedRange(l,!1),q.emit(ops.Document.signalCursorMoved,r));q.getOdfCanvas().addAnnotation(a);q.fixCursorPositions();return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:h,timestamp:b,position:p,length:d,name:n}}};
// Input 46
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpAddCursor=function(){var k,h;this.init=function(b){k=b.memberid;h=b.timestamp};this.isEdit=!1;this.group=void 0;this.execute=function(b){var h=b.getCursor(k);if(h)return!1;h=new ops.OdtCursor(k,b);b.addCursor(h);b.emit(ops.Document.signalCursorAdded,h);return!0};this.spec=function(){return{optype:"AddCursor",memberid:k,timestamp:h}}};
// Input 47
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpAddMember=function(){var k,h,b;this.init=function(p){k=p.memberid;h=parseInt(p.timestamp,10);b=p.setProperties};this.isEdit=!1;this.group=void 0;this.execute=function(h){var d;if(h.getMember(k))return!1;d=new ops.Member(k,b);h.addMember(d);h.emit(ops.Document.signalMemberAdded,d);return!0};this.spec=function(){return{optype:"AddMember",memberid:k,timestamp:h,setProperties:b}}};
// Input 48
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpAddStyle=function(){var k,h,b,p,d,n,g=odf.Namespaces.stylens;this.init=function(g){k=g.memberid;h=g.timestamp;b=g.styleName;p=g.styleFamily;d="true"===g.isAutomaticStyle||!0===g.isAutomaticStyle;n=g.setProperties};this.isEdit=!0;this.group=void 0;this.execute=function(h){var k=h.getOdfCanvas().odfContainer(),l=h.getFormatting(),f=h.getDOMDocument().createElementNS(g,"style:style");if(!f)return!1;n&&l.updateStyle(f,n);f.setAttributeNS(g,"style:family",p);f.setAttributeNS(g,"style:name",b);d?
k.rootElement.automaticStyles.appendChild(f):k.rootElement.styles.appendChild(f);h.getOdfCanvas().refreshCSS();d||h.emit(ops.OdtDocument.signalCommonStyleCreated,{name:b,family:p});return!0};this.spec=function(){return{optype:"AddStyle",memberid:k,timestamp:h,styleName:b,styleFamily:p,isAutomaticStyle:d,setProperties:n}}};
// Input 49
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.ObjectNameGenerator=function(k,h){function b(a,c){var b={};this.generateName=function(){var d=c(),f=0,g;do g=a+f,f+=1;while(b[g]||d[g]);b[g]=!0;return g}}function p(){var a={};[k.rootElement.automaticStyles,k.rootElement.styles].forEach(function(c){for(c=c.firstElementChild;c;)c.namespaceURI===d&&"style"===c.localName&&(a[c.getAttributeNS(d,"name")]=!0),c=c.nextElementSibling});return a}var d=odf.Namespaces.stylens,n=odf.Namespaces.drawns,g=odf.Namespaces.xlinkns,q=new core.DomUtils,r=(new core.Utils).hashString(h),
l=null,f=null,c=null,a={},m={};this.generateStyleName=function(){null===l&&(l=new b("auto"+r+"_",function(){return p()}));return l.generateName()};this.generateFrameName=function(){null===f&&(q.getElementsByTagNameNS(k.rootElement.body,n,"frame").forEach(function(c){a[c.getAttributeNS(n,"name")]=!0}),f=new b("fr"+r+"_",function(){return a}));return f.generateName()};this.generateImageName=function(){null===c&&(q.getElementsByTagNameNS(k.rootElement.body,n,"image").forEach(function(a){a=a.getAttributeNS(g,
"href");a=a.substring(9,a.lastIndexOf("."));m[a]=!0}),c=new b("img"+r+"_",function(){return m}));return c.generateName()}};
// Input 50
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.TextStyleApplicator=function(k,h,b){function p(b){function d(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(b){return d(a[b],c[b])}):a===c}var c={};this.isStyleApplied=function(a){a=h.getAppliedStylesForElement(a,c);return d(b,a)}}function d(d){var f={};this.applyStyleToContainer=function(c){var a;a=c.getAttributeNS(q,"style-name");var g=c.ownerDocument;a=a||"";if(!f.hasOwnProperty(a)){var e=a,n;n=a?h.createDerivedStyleObject(a,"text",d):d;g=g.createElementNS(r,
"style:style");h.updateStyle(g,n);g.setAttributeNS(r,"style:name",k.generateStyleName());g.setAttributeNS(r,"style:family","text");g.setAttributeNS("urn:webodf:names:scope","scope","document-content");b.appendChild(g);f[e]=g}a=f[a].getAttributeNS(r,"name");c.setAttributeNS(q,"text:style-name",a)}}function n(b,d){var c=b.ownerDocument,a=b.parentNode,m,e,h=new core.LoopWatchDog(1E4);e=[];"span"!==a.localName||a.namespaceURI!==q?(m=c.createElementNS(q,"text:span"),a.insertBefore(m,b),a=!1):(b.previousSibling&&
!g.rangeContainsNode(d,a.firstChild)?(m=a.cloneNode(!1),a.parentNode.insertBefore(m,a.nextSibling)):m=a,a=!0);e.push(b);for(c=b.nextSibling;c&&g.rangeContainsNode(d,c);)h.check(),e.push(c),c=c.nextSibling;e.forEach(function(a){a.parentNode!==m&&m.appendChild(a)});if(c&&a)for(e=m.cloneNode(!1),m.parentNode.insertBefore(e,m.nextSibling);c;)h.check(),a=c.nextSibling,e.appendChild(c),c=a;return m}var g=new core.DomUtils,q=odf.Namespaces.textns,r=odf.Namespaces.stylens;this.applyStyle=function(b,f,c){var a=
{},g,e,h,k;runtime.assert(c&&c.hasOwnProperty("style:text-properties"),"applyStyle without any text properties");a["style:text-properties"]=c["style:text-properties"];h=new d(a);k=new p(a);b.forEach(function(a){g=k.isStyleApplied(a);!1===g&&(e=n(a,f),h.applyStyleToContainer(e))})}};
// Input 51
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpApplyDirectStyling=function(){function k(b,d,f){var c=b.getOdfCanvas().odfContainer(),a=q.splitBoundaries(d),m=g.getTextNodes(d,!1);d={startContainer:d.startContainer,startOffset:d.startOffset,endContainer:d.endContainer,endOffset:d.endOffset};(new odf.TextStyleApplicator(new odf.ObjectNameGenerator(c,h),b.getFormatting(),c.rootElement.automaticStyles)).applyStyle(m,d,f);a.forEach(q.normalizeTextNodes)}var h,b,p,d,n,g=new odf.OdfUtils,q=new core.DomUtils;this.init=function(g){h=g.memberid;b=
g.timestamp;p=parseInt(g.position,10);d=parseInt(g.length,10);n=g.setProperties};this.isEdit=!0;this.group=void 0;this.execute=function(q){var l=q.convertCursorToDomRange(p,d),f=g.getParagraphElements(l);k(q,l,n);l.detach();q.getOdfCanvas().refreshCSS();q.fixCursorPositions();f.forEach(function(c){q.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:c,memberId:h,timeStamp:b})});q.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:h,
timestamp:b,position:p,length:d,setProperties:n}}};
// Input 52
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpApplyHyperlink=function(){function k(b){for(;b;){if(q.isHyperlink(b))return!0;b=b.parentNode}return!1}var h,b,p,d,n,g=new core.DomUtils,q=new odf.OdfUtils;this.init=function(g){h=g.memberid;b=g.timestamp;p=g.position;d=g.length;n=g.hyperlink};this.isEdit=!0;this.group=void 0;this.execute=function(r){var l=r.getDOMDocument(),f=r.convertCursorToDomRange(p,d),c=g.splitBoundaries(f),a=[],m=q.getTextNodes(f,!1);if(0===m.length)return!1;m.forEach(function(c){var b=q.getParagraphElement(c);runtime.assert(!1===
k(c),"The given range should not contain any link.");var d=n,f=l.createElementNS(odf.Namespaces.textns,"text:a");f.setAttributeNS(odf.Namespaces.xlinkns,"xlink:type","simple");f.setAttributeNS(odf.Namespaces.xlinkns,"xlink:href",d);c.parentNode.insertBefore(f,c);f.appendChild(c);-1===a.indexOf(b)&&a.push(b)});c.forEach(g.normalizeTextNodes);f.detach();r.getOdfCanvas().refreshSize();r.getOdfCanvas().rerenderAnnotations();a.forEach(function(a){r.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,
memberId:h,timeStamp:b})});return!0};this.spec=function(){return{optype:"ApplyHyperlink",memberid:h,timestamp:b,position:p,length:d,hyperlink:n}}};
// Input 53
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpInsertImage=function(){var k,h,b,p,d,n,g,q,r=odf.Namespaces.drawns,l=odf.Namespaces.svgns,f=odf.Namespaces.textns,c=odf.Namespaces.xlinkns;this.init=function(a){k=a.memberid;h=a.timestamp;b=a.position;p=a.filename;d=a.frameWidth;n=a.frameHeight;g=a.frameStyleName;q=a.frameName};this.isEdit=!0;this.group=void 0;this.execute=function(a){var m=a.getOdfCanvas(),e=a.getTextNodeAtStep(b,k),t,w;if(!e)return!1;t=e.textNode;w=a.getParagraphElement(t);var e=e.offset!==t.length?t.splitText(e.offset):t.nextSibling,
z=a.getDOMDocument(),x=z.createElementNS(r,"draw:image"),z=z.createElementNS(r,"draw:frame");x.setAttributeNS(c,"xlink:href",p);x.setAttributeNS(c,"xlink:type","simple");x.setAttributeNS(c,"xlink:show","embed");x.setAttributeNS(c,"xlink:actuate","onLoad");z.setAttributeNS(r,"draw:style-name",g);z.setAttributeNS(r,"draw:name",q);z.setAttributeNS(f,"text:anchor-type","as-char");z.setAttributeNS(l,"svg:width",d);z.setAttributeNS(l,"svg:height",n);z.appendChild(x);t.parentNode.insertBefore(z,e);a.emit(ops.OdtDocument.signalStepsInserted,
{position:b,length:1});0===t.length&&t.parentNode.removeChild(t);m.addCssForFrameWithImage(z);m.refreshCSS();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:w,memberId:k,timeStamp:h});m.rerenderAnnotations();return!0};this.spec=function(){return{optype:"InsertImage",memberid:k,timestamp:h,filename:p,position:b,frameWidth:d,frameHeight:n,frameStyleName:g,frameName:q}}};
// Input 54
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpInsertTable=function(){function k(b,c){var a;if(1===l.length)a=l[0];else if(3===l.length)switch(b){case 0:a=l[0];break;case p-1:a=l[2];break;default:a=l[1]}else a=l[b];if(1===a.length)return a[0];if(3===a.length)switch(c){case 0:return a[0];case d-1:return a[2];default:return a[1]}return a[c]}var h,b,p,d,n,g,q,r,l;this.init=function(f){h=f.memberid;b=f.timestamp;n=f.position;p=f.initialRows;d=f.initialColumns;g=f.tableName;q=f.tableStyleName;r=f.tableColumnStyleName;l=f.tableCellStyleMatrix};
this.isEdit=!0;this.group=void 0;this.execute=function(f){var c=f.getTextNodeAtStep(n),a=f.getRootNode();if(c){var m=f.getDOMDocument(),e=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),l=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),w,z,x,v;q&&e.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",q);g&&e.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",g);l.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:number-columns-repeated",d);r&&l.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",r);e.appendChild(l);for(x=0;x<p;x+=1){l=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(v=0;v<d;v+=1)w=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(z=k(x,v))&&w.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",z),z=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"text:p"),w.appendChild(z),l.appendChild(w);e.appendChild(l)}c=f.getParagraphElement(c.textNode);a.insertBefore(e,c.nextSibling);f.emit(ops.OdtDocument.signalStepsInserted,{position:n,length:d*p+1});f.getOdfCanvas().refreshSize();f.emit(ops.OdtDocument.signalTableAdded,{tableElement:e,memberId:h,timeStamp:b});f.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:h,timestamp:b,position:n,initialRows:p,initialColumns:d,tableName:g,tableStyleName:q,
tableColumnStyleName:r,tableCellStyleMatrix:l}}};
// Input 55
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpInsertText=function(){var k,h,b,p,d;this.init=function(n){k=n.memberid;h=n.timestamp;b=n.position;d=n.text;p="true"===n.moveCursor||!0===n.moveCursor};this.isEdit=!0;this.group=void 0;this.execute=function(n){var g,q,r,l=null,f=n.getDOMDocument(),c,a=0,m,e=n.getCursor(k),t;n.upgradeWhitespacesAtPosition(b);if(g=n.getTextNodeAtStep(b)){q=g.textNode;l=q.nextSibling;r=q.parentNode;c=n.getParagraphElement(q);for(t=0;t<d.length;t+=1)if(" "===d[t]&&(0===t||t===d.length-1||" "===d[t-1])||"\t"===d[t])0===
a?(g.offset!==q.length&&(l=q.splitText(g.offset)),0<t&&q.appendData(d.substring(0,t))):a<t&&(a=d.substring(a,t),r.insertBefore(f.createTextNode(a),l)),a=t+1,m=" "===d[t]?"text:s":"text:tab",m=f.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",m),m.appendChild(f.createTextNode(d[t])),r.insertBefore(m,l);0===a?q.insertData(g.offset,d):a<d.length&&(g=d.substring(a),r.insertBefore(f.createTextNode(g),l));r=q.parentNode;l=q.nextSibling;r.removeChild(q);r.insertBefore(q,l);0===q.length&&
q.parentNode.removeChild(q);n.emit(ops.OdtDocument.signalStepsInserted,{position:b,length:d.length});e&&p&&(n.moveCursor(k,b+d.length,0),n.emit(ops.Document.signalCursorMoved,e));0<b&&(1<b&&n.downgradeWhitespacesAtPosition(b-2),n.downgradeWhitespacesAtPosition(b-1));n.downgradeWhitespacesAtPosition(b);n.downgradeWhitespacesAtPosition(b+d.length-1);n.downgradeWhitespacesAtPosition(b+d.length);n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:c,memberId:k,
timeStamp:h});n.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:k,timestamp:h,position:b,text:d,moveCursor:p}}};
// Input 56
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpMoveCursor=function(){var k,h,b,p,d;this.init=function(n){k=n.memberid;h=n.timestamp;b=n.position;p=n.length||0;d=n.selectionType||ops.OdtCursor.RangeSelection};this.isEdit=!1;this.group=void 0;this.execute=function(h){var g=h.getCursor(k),q;if(!g)return!1;q=h.convertCursorToDomRange(b,p);g.setSelectedRange(q,0<=p);g.setSelectionType(d);h.emit(ops.Document.signalCursorMoved,g);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:k,timestamp:h,position:b,length:p,selectionType:d}}};
// Input 57
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveAnnotation=function(){var k,h,b,p,d;this.init=function(n){k=n.memberid;h=n.timestamp;b=parseInt(n.position,10);p=parseInt(n.length,10);d=new core.DomUtils};this.isEdit=!0;this.group=void 0;this.execute=function(h){function g(b){r.parentNode.insertBefore(b,r)}for(var k=h.getIteratorAtPosition(b).container(),r;k.namespaceURI!==odf.Namespaces.officens||"annotation"!==k.localName;)k=k.parentNode;if(null===k)return!1;r=k;k=r.annotationEndElement;h.getOdfCanvas().forgetAnnotations();d.getElementsByTagNameNS(r,
"urn:webodf:names:cursor","cursor").forEach(g);d.getElementsByTagNameNS(r,"urn:webodf:names:cursor","anchor").forEach(g);r.parentNode.removeChild(r);k&&k.parentNode.removeChild(k);h.emit(ops.OdtDocument.signalStepsRemoved,{position:0<b?b-1:b,length:p});h.fixCursorPositions();h.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:k,timestamp:h,position:b,length:p}}};
// Input 58
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveBlob=function(){var k,h,b;this.init=function(p){k=p.memberid;h=p.timestamp;b=p.filename};this.isEdit=!0;this.group=void 0;this.execute=function(h){h.getOdfCanvas().odfContainer().removeBlob(b);return!0};this.spec=function(){return{optype:"RemoveBlob",memberid:k,timestamp:h,filename:b}}};
// Input 59
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveCursor=function(){var k,h;this.init=function(b){k=b.memberid;h=b.timestamp};this.isEdit=!1;this.group=void 0;this.execute=function(b){return b.removeCursor(k)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:k,timestamp:h}}};
// Input 60
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveHyperlink=function(){var k,h,b,p,d=new core.DomUtils,n=new odf.OdfUtils;this.init=function(d){k=d.memberid;h=d.timestamp;b=d.position;p=d.length};this.isEdit=!0;this.group=void 0;this.execute=function(g){var q=g.convertCursorToDomRange(b,p),r=n.getHyperlinkElements(q);runtime.assert(1===r.length,"The given range should only contain a single link.");r=d.mergeIntoParent(r[0]);q.detach();g.getOdfCanvas().refreshSize();g.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:n.getParagraphElement(r),
memberId:k,timeStamp:h});g.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveHyperlink",memberid:k,timestamp:h,position:b,length:p}}};
// Input 61
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveMember=function(){var k,h;this.init=function(b){k=b.memberid;h=parseInt(b.timestamp,10)};this.isEdit=!1;this.group=void 0;this.execute=function(b){if(!b.getMember(k))return!1;b.removeMember(k);b.emit(ops.Document.signalMemberRemoved,k);return!0};this.spec=function(){return{optype:"RemoveMember",memberid:k,timestamp:h}}};
// Input 62
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveStyle=function(){var k,h,b,p;this.init=function(d){k=d.memberid;h=d.timestamp;b=d.styleName;p=d.styleFamily};this.isEdit=!0;this.group=void 0;this.execute=function(d){var h=d.getStyleElement(b,p);if(!h)return!1;h.parentNode.removeChild(h);d.getOdfCanvas().refreshCSS();d.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:b,family:p});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:k,timestamp:h,styleName:b,styleFamily:p}}};
// Input 63
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveText=function(){function k(b){function d(a){return q.hasOwnProperty(a.namespaceURI)||"br"===a.localName&&n.isLineBreak(a.parentNode)||a.nodeType===Node.TEXT_NODE&&q.hasOwnProperty(a.parentNode.namespaceURI)}function f(a){if(n.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(q.hasOwnProperty(a.namespaceURI)||!f(a))return!1;a=a.nextSibling}return!0}function c(a){var m;a.nodeType===Node.TEXT_NODE?(m=a.parentNode,m.removeChild(a)):
m=g.removeUnwantedNodes(a,d);return m&&!n.isParagraph(m)&&m!==b&&f(m)?c(m):m}this.isEmpty=f;this.mergeChildrenIntoParent=c}var h,b,p,d,n,g,q={};this.init=function(k){runtime.assert(0<=k.length,"OpRemoveText only supports positive lengths");h=k.memberid;b=k.timestamp;p=parseInt(k.position,10);d=parseInt(k.length,10);n=new odf.OdfUtils;g=new core.DomUtils;q[odf.Namespaces.dbns]=!0;q[odf.Namespaces.dcns]=!0;q[odf.Namespaces.dr3dns]=!0;q[odf.Namespaces.drawns]=!0;q[odf.Namespaces.chartns]=!0;q[odf.Namespaces.formns]=
!0;q[odf.Namespaces.numberns]=!0;q[odf.Namespaces.officens]=!0;q[odf.Namespaces.presentationns]=!0;q[odf.Namespaces.stylens]=!0;q[odf.Namespaces.svgns]=!0;q[odf.Namespaces.tablens]=!0;q[odf.Namespaces.textns]=!0};this.isEdit=!0;this.group=void 0;this.execute=function(q){var l,f,c,a,m=q.getCursor(h),e=new k(q.getRootNode());q.upgradeWhitespacesAtPosition(p);q.upgradeWhitespacesAtPosition(p+d);f=q.convertCursorToDomRange(p,d);g.splitBoundaries(f);l=q.getParagraphElement(f.startContainer);c=n.getTextElements(f,
!1,!0);a=n.getParagraphElements(f);f.detach();c.forEach(function(a){a.parentNode?e.mergeChildrenIntoParent(a):runtime.log("WARN: text element has already been removed from it's container")});f=a.reduce(function(a,c){var b,d=a,f=c,g,m=null;e.isEmpty(a)&&(c.parentNode!==a.parentNode&&(g=c.parentNode,a.parentNode.insertBefore(c,a.nextSibling)),f=a,d=c,m=d.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo").item(0)||d.firstChild);for(;f.firstChild;)b=f.firstChild,f.removeChild(b),"editinfo"!==
b.localName&&d.insertBefore(b,m);g&&e.isEmpty(g)&&e.mergeChildrenIntoParent(g);e.mergeChildrenIntoParent(f);return d});q.emit(ops.OdtDocument.signalStepsRemoved,{position:p,length:d});q.downgradeWhitespacesAtPosition(p);q.fixCursorPositions();q.getOdfCanvas().refreshSize();q.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f||l,memberId:h,timeStamp:b});m&&(m.resetSelectionType(),q.emit(ops.Document.signalCursorMoved,m));q.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",
memberid:h,timestamp:b,position:p,length:d}}};
// Input 64
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpSetBlob=function(){var k,h,b,p,d;this.init=function(n){k=n.memberid;h=n.timestamp;b=n.filename;p=n.mimetype;d=n.content};this.isEdit=!0;this.group=void 0;this.execute=function(h){h.getOdfCanvas().odfContainer().setBlob(b,p,d);return!0};this.spec=function(){return{optype:"SetBlob",memberid:k,timestamp:h,filename:b,mimetype:p,content:d}}};
// Input 65
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpSetParagraphStyle=function(){var k,h,b,p;this.init=function(d){k=d.memberid;h=d.timestamp;b=d.position;p=d.styleName};this.isEdit=!0;this.group=void 0;this.execute=function(d){var n;n=d.getIteratorAtPosition(b);return(n=d.getParagraphElement(n.container()))?(""!==p?n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",p):n.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","style-name"),d.getOdfCanvas().refreshSize(),d.emit(ops.OdtDocument.signalParagraphChanged,
{paragraphElement:n,timeStamp:h,memberId:k}),d.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:k,timestamp:h,position:b,styleName:p}}};
// Input 66
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpSplitParagraph=function(){var k,h,b,p,d;this.init=function(n){k=n.memberid;h=n.timestamp;b=n.position;p="true"===n.moveCursor||!0===n.moveCursor;d=new odf.OdfUtils};this.isEdit=!0;this.group=void 0;this.execute=function(n){var g,q,r,l,f,c,a,m=n.getCursor(k);n.upgradeWhitespacesAtPosition(b);g=n.getTextNodeAtStep(b);if(!g)return!1;q=n.getParagraphElement(g.textNode);if(!q)return!1;r=d.isListItem(q.parentNode)?q.parentNode:q;0===g.offset?(a=g.textNode.previousSibling,c=null):(a=g.textNode,c=g.offset>=
g.textNode.length?null:g.textNode.splitText(g.offset));for(l=g.textNode;l!==r;){l=l.parentNode;f=l.cloneNode(!1);c&&f.appendChild(c);if(a)for(;a&&a.nextSibling;)f.appendChild(a.nextSibling);else for(;l.firstChild;)f.appendChild(l.firstChild);l.parentNode.insertBefore(f,l.nextSibling);a=l;c=f}d.isListItem(c)&&(c=c.childNodes.item(0));0===g.textNode.length&&g.textNode.parentNode.removeChild(g.textNode);n.emit(ops.OdtDocument.signalStepsInserted,{position:b,length:1});m&&p&&(n.moveCursor(k,b+1,0),n.emit(ops.Document.signalCursorMoved,
m));n.fixCursorPositions();n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:q,memberId:k,timeStamp:h});n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:c,memberId:k,timeStamp:h});n.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:k,timestamp:h,position:b,moveCursor:p}}};
// Input 67
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpUpdateMember=function(){function k(b){var d="//dc:creator[@editinfo:memberid='"+h+"']";b=xmldom.XPath.getODFElementsWithXPath(b.getRootNode(),d,function(b){return"editinfo"===b?"urn:webodf:names:editinfo":odf.Namespaces.lookupNamespaceURI(b)});for(d=0;d<b.length;d+=1)b[d].textContent=p.fullName}var h,b,p,d;this.init=function(k){h=k.memberid;b=parseInt(k.timestamp,10);p=k.setProperties;d=k.removedProperties};this.isEdit=!1;this.group=void 0;this.execute=function(b){var g=b.getMember(h);if(!g)return!1;
d&&g.removeProperties(d);p&&(g.setProperties(p),p.fullName&&k(b));b.emit(ops.Document.signalMemberUpdated,g);return!0};this.spec=function(){return{optype:"UpdateMember",memberid:h,timestamp:b,setProperties:p,removedProperties:d}}};
// Input 68
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpUpdateMetadata=function(){var k,h,b,p;this.init=function(d){k=d.memberid;h=parseInt(d.timestamp,10);b=d.setProperties;p=d.removedProperties};this.isEdit=!0;this.group=void 0;this.execute=function(d){d=d.getOdfCanvas().odfContainer();var h=[];p&&(h=p.attributes.split(","));d.setMetadata(b,h);return!0};this.spec=function(){return{optype:"UpdateMetadata",memberid:k,timestamp:h,setProperties:b,removedProperties:p}}};
// Input 69
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpUpdateParagraphStyle=function(){function k(b,d){var g,f,c=d?d.split(","):[];for(g=0;g<c.length;g+=1)f=c[g].split(":"),b.removeAttributeNS(odf.Namespaces.lookupNamespaceURI(f[0]),f[1])}var h,b,p,d,n,g=odf.Namespaces.stylens;this.init=function(g){h=g.memberid;b=g.timestamp;p=g.styleName;d=g.setProperties;n=g.removedProperties};this.isEdit=!0;this.group=void 0;this.execute=function(b){var h=b.getFormatting(),l,f,c;return(l=""!==p?b.getParagraphStyleElement(p):h.getDefaultStyleElement("paragraph"))?
(f=l.getElementsByTagNameNS(g,"paragraph-properties").item(0),c=l.getElementsByTagNameNS(g,"text-properties").item(0),d&&h.updateStyle(l,d),n&&(h=n["style:paragraph-properties"],f&&h&&(k(f,h.attributes),0===f.attributes.length&&l.removeChild(f)),h=n["style:text-properties"],c&&h&&(k(c,h.attributes),0===c.attributes.length&&l.removeChild(c)),k(l,n.attributes)),b.getOdfCanvas().refreshCSS(),b.emit(ops.OdtDocument.signalParagraphStyleModified,p),b.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=
function(){return{optype:"UpdateParagraphStyle",memberid:h,timestamp:b,styleName:p,setProperties:d,removedProperties:n}}};
// Input 70
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OperationFactory=function(){var k;this.register=function(h,b){k[h]=b};this.create=function(h){var b=null,p=k[h.optype];p&&(b=new p,b.init(h));return b};k={AddMember:ops.OpAddMember,UpdateMember:ops.OpUpdateMember,RemoveMember:ops.OpRemoveMember,AddCursor:ops.OpAddCursor,ApplyDirectStyling:ops.OpApplyDirectStyling,SetBlob:ops.OpSetBlob,RemoveBlob:ops.OpRemoveBlob,InsertImage:ops.OpInsertImage,InsertTable:ops.OpInsertTable,InsertText:ops.OpInsertText,RemoveText:ops.OpRemoveText,SplitParagraph:ops.OpSplitParagraph,
SetParagraphStyle:ops.OpSetParagraphStyle,UpdateParagraphStyle:ops.OpUpdateParagraphStyle,AddStyle:ops.OpAddStyle,RemoveStyle:ops.OpRemoveStyle,MoveCursor:ops.OpMoveCursor,RemoveCursor:ops.OpRemoveCursor,AddAnnotation:ops.OpAddAnnotation,RemoveAnnotation:ops.OpRemoveAnnotation,UpdateMetadata:ops.OpUpdateMetadata,ApplyHyperlink:ops.OpApplyHyperlink,RemoveHyperlink:ops.OpRemoveHyperlink}};
// Input 71
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(k){};ops.OperationRouter.prototype.setPlaybackFunction=function(k){};ops.OperationRouter.prototype.push=function(k){};ops.OperationRouter.prototype.close=function(k){};ops.OperationRouter.prototype.subscribe=function(k,h){};ops.OperationRouter.prototype.unsubscribe=function(k,h){};ops.OperationRouter.prototype.hasLocalUnsyncedOps=function(){};ops.OperationRouter.prototype.hasSessionHostConnection=function(){};
ops.OperationRouter.signalProcessingBatchStart="router/batchstart";ops.OperationRouter.signalProcessingBatchEnd="router/batchend";
// Input 72
/*

 Copyright (C) 2012 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.TrivialOperationRouter=function(){var k=new core.EventNotifier([ops.OperationRouter.signalProcessingBatchStart,ops.OperationRouter.signalProcessingBatchEnd]),h,b,p=0;this.setOperationFactory=function(b){h=b};this.setPlaybackFunction=function(d){b=d};this.push=function(d){p+=1;k.emit(ops.OperationRouter.signalProcessingBatchStart,{});d.forEach(function(d){d=d.spec();d.timestamp=(new Date).getTime();d=h.create(d);d.group="g"+p;b(d)});k.emit(ops.OperationRouter.signalProcessingBatchEnd,{})};this.close=
function(b){b()};this.subscribe=function(b,h){k.subscribe(b,h)};this.unsubscribe=function(b,h){k.unsubscribe(b,h)};this.hasLocalUnsyncedOps=function(){return!1};this.hasSessionHostConnection=function(){return!0}};
// Input 73
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.Session=function(k){function h(b){d.emit(ops.OdtDocument.signalProcessingBatchStart,b)}function b(b){d.emit(ops.OdtDocument.signalProcessingBatchEnd,b)}var p=new ops.OperationFactory,d=new ops.OdtDocument(k),n=null;this.setOperationFactory=function(b){p=b;n&&n.setOperationFactory(p)};this.setOperationRouter=function(g){n&&(n.unsubscribe(ops.OperationRouter.signalProcessingBatchStart,h),n.unsubscribe(ops.OperationRouter.signalProcessingBatchEnd,b));n=g;n.subscribe(ops.OperationRouter.signalProcessingBatchStart,
h);n.subscribe(ops.OperationRouter.signalProcessingBatchEnd,b);g.setPlaybackFunction(function(b){d.emit(ops.OdtDocument.signalOperationStart,b);return b.execute(d)?(d.emit(ops.OdtDocument.signalOperationEnd,b),!0):!1});g.setOperationFactory(p)};this.getOperationFactory=function(){return p};this.getOdtDocument=function(){return d};this.enqueue=function(b){n.push(b)};this.close=function(b){n.close(function(h){h?b(h):d.close(b)})};this.destroy=function(b){d.destroy(b)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 74
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.AnnotationController=function(k,h){function b(){var b=g.getCursor(h),b=b&&b.getNode(),c=!1;if(b){a:{for(c=g.getRootNode();b&&b!==c;){if(b.namespaceURI===l&&"annotation"===b.localName){b=!0;break a}b=b.parentNode}b=!1}c=!b}c!==q&&(q=c,r.emit(gui.AnnotationController.annotatableChanged,q))}function p(d){d.getMemberId()===h&&b()}function d(d){d===h&&b()}function n(d){d.getMemberId()===h&&b()}var g=k.getOdtDocument(),q=!1,r=new core.EventNotifier([gui.AnnotationController.annotatableChanged]),l=odf.Namespaces.officens;
this.isAnnotatable=function(){return q};this.addAnnotation=function(){var b=new ops.OpAddAnnotation,c=g.getCursorSelection(h),a=c.length,c=c.position;q&&(c=0<=a?c:c+a,a=Math.abs(a),b.init({memberid:h,position:c,length:a,name:h+Date.now()}),k.enqueue([b]))};this.removeAnnotation=function(b){var c,a;c=g.convertDomPointToCursorStep(b,0)+1;a=g.convertDomPointToCursorStep(b,b.childNodes.length);b=new ops.OpRemoveAnnotation;b.init({memberid:h,position:c,length:a-c});a=new ops.OpMoveCursor;a.init({memberid:h,
position:0<c?c-1:c,length:0});k.enqueue([b,a])};this.subscribe=function(b,c){r.subscribe(b,c)};this.unsubscribe=function(b,c){r.unsubscribe(b,c)};this.destroy=function(b){g.unsubscribe(ops.Document.signalCursorAdded,p);g.unsubscribe(ops.Document.signalCursorRemoved,d);g.unsubscribe(ops.Document.signalCursorMoved,n);b()};g.subscribe(ops.Document.signalCursorAdded,p);g.subscribe(ops.Document.signalCursorRemoved,d);g.subscribe(ops.Document.signalCursorMoved,n);b()};
gui.AnnotationController.annotatableChanged="annotatable/changed";(function(){return gui.AnnotationController})();
// Input 75
gui.Avatar=function(k,h){var b=this,p,d,n;this.setColor=function(b){d.style.borderColor=b};this.setImageUrl=function(g){b.isVisible()?d.src=g:n=g};this.isVisible=function(){return"block"===p.style.display};this.show=function(){n&&(d.src=n,n=void 0);p.style.display="block"};this.hide=function(){p.style.display="none"};this.markAsFocussed=function(b){b?p.classList.add("active"):p.classList.remove("active")};this.destroy=function(b){k.removeChild(p);b()};(function(){var b=k.ownerDocument,n=b.documentElement.namespaceURI;
p=b.createElementNS(n,"div");d=b.createElementNS(n,"img");d.width=64;d.height=64;p.appendChild(d);p.style.width="64px";p.style.height="70px";p.style.position="absolute";p.style.top="-80px";p.style.left="-34px";p.style.display=h?"block":"none";p.className="handle";k.appendChild(p)})()};
// Input 76
gui.Caret=function(k,h,b){function p(){r.style.opacity="0"===r.style.opacity?"1":"0";t.trigger()}function d(a,b){var c=a.getBoundingClientRect(),e=0,d=0;c&&b&&(e=Math.max(c.top,b.top),d=Math.min(c.bottom,b.bottom));return d-e}function n(){Object.keys(v).forEach(function(a){u[a]=v[a]})}function g(){var e,f,g,m;if(!1===v.isShown||k.getSelectionType()!==ops.OdtCursor.RangeSelection||!b&&!k.getSelectedRange().collapsed)v.visibility="hidden",r.style.visibility="hidden",t.cancel();else{v.visibility="visible";
r.style.visibility="visible";if(!1===v.isFocused)r.style.opacity="1",t.cancel();else{if(w||u.visibility!==v.visibility)r.style.opacity="1",t.cancel();t.trigger()}if(x||z||u.visibility!==v.visibility){e=k.getSelectedRange().cloneRange();f=k.getNode();var h=null;f.previousSibling&&(g=f.previousSibling.nodeType===Node.TEXT_NODE?f.previousSibling.textContent.length:f.previousSibling.childNodes.length,e.setStart(f.previousSibling,0<g?g-1:0),e.setEnd(f.previousSibling,g),(g=e.getBoundingClientRect())&&
g.height&&(h=g));f.nextSibling&&(e.setStart(f.nextSibling,0),e.setEnd(f.nextSibling,0<(f.nextSibling.nodeType===Node.TEXT_NODE?f.nextSibling.textContent.length:f.nextSibling.childNodes.length)?1:0),(g=e.getBoundingClientRect())&&g.height&&(!h||d(f,g)>d(f,h))&&(h=g));f=h;h=k.getDocument().getCanvas();e=h.getZoomLevel();h=a.getBoundingClientRect(h.getSizer());f?(r.style.top="0",g=a.getBoundingClientRect(r),8>f.height&&(f={top:f.top-(8-f.height)/2,height:8}),r.style.height=a.adaptRangeDifferenceToZoomLevel(f.height,
e)+"px",r.style.top=a.adaptRangeDifferenceToZoomLevel(f.top-g.top,e)+"px"):(r.style.height="1em",r.style.top="5%");c&&(f=runtime.getWindow().getComputedStyle(r,null),g=a.getBoundingClientRect(r),c.style.bottom=a.adaptRangeDifferenceToZoomLevel(h.bottom-g.bottom,e)+"px",c.style.left=a.adaptRangeDifferenceToZoomLevel(g.right-h.left,e)+"px",f.font?c.style.font=f.font:(c.style.fontStyle=f.fontStyle,c.style.fontVariant=f.fontVariant,c.style.fontWeight=f.fontWeight,c.style.fontSize=f.fontSize,c.style.lineHeight=
f.lineHeight,c.style.fontFamily=f.fontFamily))}if(z){var h=k.getDocument().getCanvas().getElement().parentNode,p;g=h.offsetWidth-h.clientWidth+5;m=h.offsetHeight-h.clientHeight+5;p=r.getBoundingClientRect();e=p.left-g;f=p.top-m;g=p.right+g;m=p.bottom+m;p=h.getBoundingClientRect();f<p.top?h.scrollTop-=p.top-f:m>p.bottom&&(h.scrollTop+=m-p.bottom);e<p.left?h.scrollLeft-=p.left-e:g>p.right&&(h.scrollLeft+=g-p.right)}}u.isFocused!==v.isFocused&&l.markAsFocussed(v.isFocused);n();x=z=w=!1}function q(a){f.removeChild(r);
a()}var r,l,f,c,a=new core.DomUtils,m=new core.Async,e,t,w=!1,z=!1,x=!1,v={isFocused:!1,isShown:!0,visibility:"hidden"},u={isFocused:!v.isFocused,isShown:!v.isShown,visibility:"hidden"};this.handleUpdate=function(){x=!0;"hidden"!==v.visibility&&(v.visibility="hidden",r.style.visibility="hidden");e.trigger()};this.refreshCursorBlinking=function(){w=!0;e.trigger()};this.setFocus=function(){v.isFocused=!0;e.trigger()};this.removeFocus=function(){v.isFocused=!1;e.trigger()};this.show=function(){v.isShown=
!0;e.trigger()};this.hide=function(){v.isShown=!1;e.trigger()};this.setAvatarImageUrl=function(a){l.setImageUrl(a)};this.setColor=function(a){r.style.borderColor=a;l.setColor(a)};this.getCursor=function(){return k};this.getFocusElement=function(){return r};this.toggleHandleVisibility=function(){l.isVisible()?l.hide():l.show()};this.showHandle=function(){l.show()};this.hideHandle=function(){l.hide()};this.setOverlayElement=function(a){c=a;x=!0;e.trigger()};this.ensureVisible=function(){z=!0;e.trigger()};
this.destroy=function(a){m.destroyAll([e.destroy,t.destroy,l.destroy,q],a)};(function(){var a=k.getDocument().getDOMDocument();r=a.createElementNS(a.documentElement.namespaceURI,"span");r.className="caret";r.style.top="5%";f=k.getNode();f.appendChild(r);l=new gui.Avatar(f,h);e=new core.ScheduledTask(g,0);t=new core.ScheduledTask(p,500);e.triggerImmediate()})()};
// Input 77
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.TextSerializer=function(){function k(p){var d="",n=h.filter?h.filter.acceptNode(p):NodeFilter.FILTER_ACCEPT,g=p.nodeType,q;if((n===NodeFilter.FILTER_ACCEPT||n===NodeFilter.FILTER_SKIP)&&b.isTextContentContainingNode(p))for(q=p.firstChild;q;)d+=k(q),q=q.nextSibling;n===NodeFilter.FILTER_ACCEPT&&(g===Node.ELEMENT_NODE&&b.isParagraph(p)?d+="\n":g===Node.TEXT_NODE&&p.textContent&&(d+=p.textContent));return d}var h=this,b=new odf.OdfUtils;this.filter=null;this.writeToString=function(b){if(!b)return"";
b=k(b);"\n"===b[b.length-1]&&(b=b.substr(0,b.length-1));return b}};
// Input 78
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.MimeDataExporter=function(){var k,h;this.exportRangeToDataTransfer=function(b,h){var d;d=h.startContainer.ownerDocument.createElement("span");d.appendChild(h.cloneContents());d=k.writeToString(d);try{b.setData("text/plain",d)}catch(n){b.setData("Text",d)}};k=new odf.TextSerializer;h=new odf.OdfNodeFilter;k.filter=h};
// Input 79
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.Clipboard=function(k){this.setDataFromRange=function(h,b){var p,d=h.clipboardData;p=runtime.getWindow();!d&&p&&(d=p.clipboardData);d?(p=!0,k.exportRangeToDataTransfer(d,b),h.preventDefault()):p=!1;return p}};
// Input 80
/*

 Copyright (C) 2012-2014 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.StyleSummary=function(k){function h(b,g){var h=b+"|"+g,p;d.hasOwnProperty(h)||(p=[],k.forEach(function(d){d=(d=d[b])&&d[g];-1===p.indexOf(d)&&p.push(d)}),d[h]=p);return d[h]}function b(b,d,k){return function(){var p=h(b,d);return k.length>=p.length&&p.every(function(b){return-1!==k.indexOf(b)})}}function p(b,d){var k=h(b,d);return 1===k.length?k[0]:void 0}var d={};this.getPropertyValues=h;this.getCommonValue=p;this.isBold=b("style:text-properties","fo:font-weight",["bold"]);this.isItalic=b("style:text-properties",
"fo:font-style",["italic"]);this.hasUnderline=b("style:text-properties","style:text-underline-style",["solid"]);this.hasStrikeThrough=b("style:text-properties","style:text-line-through-style",["solid"]);this.fontSize=function(){var b=p("style:text-properties","fo:font-size");return b&&parseFloat(b)};this.fontName=function(){return p("style:text-properties","style:font-name")};this.isAlignedLeft=b("style:paragraph-properties","fo:text-align",["left","start"]);this.isAlignedCenter=b("style:paragraph-properties",
"fo:text-align",["center"]);this.isAlignedRight=b("style:paragraph-properties","fo:text-align",["right","end"]);this.isAlignedJustified=b("style:paragraph-properties","fo:text-align",["justify"]);this.text={isBold:this.isBold,isItalic:this.isItalic,hasUnderline:this.hasUnderline,hasStrikeThrough:this.hasStrikeThrough,fontSize:this.fontSize,fontName:this.fontName};this.paragraph={isAlignedLeft:this.isAlignedLeft,isAlignedCenter:this.isAlignedCenter,isAlignedRight:this.isAlignedRight,isAlignedJustified:this.isAlignedJustified}};
// Input 81
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.DirectFormattingController=function(k,h,b,p){function d(a){var b;a.collapsed?(b=a.startContainer,b.hasChildNodes()&&a.startOffset<b.childNodes.length&&(b=b.childNodes.item(a.startOffset)),a=[b]):a=K.getTextNodes(a,!0);return a}function n(a,b){var c={};Object.keys(a).forEach(function(e){var d=a[e](),f=b[e]();d!==f&&(c[e]=f)});return c}function g(){var a,b,c;a=(a=(a=F.getCursor(h))&&a.getSelectedRange())?d(a):[];a=F.getFormatting().getAppliedStyles(a);a[0]&&H&&(a[0]=O.mergeObjects(a[0],H));T=a;
c=new gui.StyleSummary(T);a=n(y.text,c.text);b=n(y.paragraph,c.paragraph);y=c;0<Object.keys(a).length&&Z.emit(gui.DirectFormattingController.textStylingChanged,a);0<Object.keys(b).length&&Z.emit(gui.DirectFormattingController.paragraphStylingChanged,b)}function q(a){("string"===typeof a?a:a.getMemberId())===h&&g()}function r(){g()}function l(a){var b=F.getCursor(h);a=a.paragraphElement;b&&F.getParagraphElement(b.getNode())===a&&g()}function f(a,b){b(!a());return!0}function c(a){var b=F.getCursorSelection(h),
c={"style:text-properties":a};0!==b.length?(a=new ops.OpApplyDirectStyling,a.init({memberid:h,position:b.position,length:b.length,setProperties:c}),k.enqueue([a])):(H=O.mergeObjects(H||{},c),g())}function a(a,b){var e={};e[a]=b;c(e)}function m(a){a=a.spec();H&&a.memberid===h&&"SplitParagraph"!==a.optype&&(H=null,g())}function e(b){a("fo:font-weight",b?"bold":"normal")}function t(b){a("fo:font-style",b?"italic":"normal")}function w(b){a("style:text-underline-style",b?"solid":"none")}function z(b){a("style:text-line-through-style",
b?"solid":"none")}function x(a){return a===ops.StepsTranslator.NEXT_STEP}function v(a){var c=F.getCursor(h).getSelectedRange(),c=K.getParagraphElements(c),e=F.getFormatting(),d=[],f={},g;c.forEach(function(c){var m=F.convertDomPointToCursorStep(c,0,x),l=c.getAttributeNS(odf.Namespaces.textns,"style-name"),k;c=l?f.hasOwnProperty(l)?f[l]:void 0:g;c||(c=b.generateStyleName(),l?(f[l]=c,k=e.createDerivedStyleObject(l,"paragraph",{})):(g=c,k={}),k=a(k),l=new ops.OpAddStyle,l.init({memberid:h,styleName:c.toString(),
styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:k}),d.push(l));l=new ops.OpSetParagraphStyle;l.init({memberid:h,styleName:c.toString(),position:m});d.push(l)});k.enqueue(d)}function u(a){v(function(b){return O.mergeObjects(b,a)})}function s(a){u({"style:paragraph-properties":{"fo:text-align":a}})}function A(a,b){var c=F.getFormatting().getDefaultTabStopDistance(),e=b["style:paragraph-properties"],d;e&&(e=e["fo:margin-left"])&&(d=K.parseLength(e));return O.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}function J(a,b){var c=d(a),e=F.getFormatting().getAppliedStyles(c)[0],f=F.getFormatting().getAppliedStylesForElement(b);if(!e||"text"!==e["style:family"]||!e["style:text-properties"])return!1;if(!f||!f["style:text-properties"])return!0;e=e["style:text-properties"];f=f["style:text-properties"];return!Object.keys(e).every(function(a){return e[a]===f[a]})}function G(){}var D=this,F=k.getOdtDocument(),O=new core.Utils,K=new odf.OdfUtils,Z=new core.EventNotifier([gui.DirectFormattingController.textStylingChanged,
gui.DirectFormattingController.paragraphStylingChanged]),Q=odf.Namespaces.textns,W=core.PositionFilter.FilterResult.FILTER_ACCEPT,H,T=[],y=new gui.StyleSummary(T);this.formatTextSelection=c;this.createCursorStyleOp=function(a,b,c){var e=null;(c=c?T[0]:H)&&c["style:text-properties"]&&(e=new ops.OpApplyDirectStyling,e.init({memberid:h,position:a,length:b,setProperties:{"style:text-properties":c["style:text-properties"]}}),H=null,g());return e};this.setBold=e;this.setItalic=t;this.setHasUnderline=w;
this.setHasStrikethrough=z;this.setFontSize=function(b){a("fo:font-size",b+"pt")};this.setFontName=function(b){a("style:font-name",b)};this.getAppliedStyles=function(){return T};this.toggleBold=f.bind(D,function(){return y.isBold()},e);this.toggleItalic=f.bind(D,function(){return y.isItalic()},t);this.toggleUnderline=f.bind(D,function(){return y.hasUnderline()},w);this.toggleStrikethrough=f.bind(D,function(){return y.hasStrikeThrough()},z);this.isBold=function(){return y.isBold()};this.isItalic=function(){return y.isItalic()};
this.hasUnderline=function(){return y.hasUnderline()};this.hasStrikeThrough=function(){return y.hasStrikeThrough()};this.fontSize=function(){return y.fontSize()};this.fontName=function(){return y.fontName()};this.isAlignedLeft=function(){return y.isAlignedLeft()};this.isAlignedCenter=function(){return y.isAlignedCenter()};this.isAlignedRight=function(){return y.isAlignedRight()};this.isAlignedJustified=function(){return y.isAlignedJustified()};this.alignParagraphLeft=function(){s("left");return!0};
this.alignParagraphCenter=function(){s("center");return!0};this.alignParagraphRight=function(){s("right");return!0};this.alignParagraphJustified=function(){s("justify");return!0};this.indent=function(){v(A.bind(null,1));return!0};this.outdent=function(){v(A.bind(null,-1));return!0};this.createParagraphStyleOps=function(a){var c=F.getCursor(h),e=c.getSelectedRange(),d=[],f,g;c.hasForwardSelection()?(f=c.getAnchorNode(),g=c.getNode()):(f=c.getNode(),g=c.getAnchorNode());c=F.getParagraphElement(g);runtime.assert(Boolean(c),
"DirectFormattingController: Cursor outside paragraph");var m;a:{m=c;var l=gui.SelectionMover.createPositionIterator(m),k=new core.PositionFilterChain;k.addFilter(F.getPositionFilter());k.addFilter(F.createRootFilter(h));for(l.setUnfilteredPosition(e.endContainer,e.endOffset);l.nextPosition();)if(k.acceptPosition(l)===W){m=F.getParagraphElement(l.getCurrentNode())!==m;break a}m=!0}if(!m)return d;g!==f&&(c=F.getParagraphElement(f));if(!H&&!J(e,c))return d;e=T[0];if(!e)return d;if(f=c.getAttributeNS(Q,
"style-name"))e={"style:text-properties":e["style:text-properties"]},e=F.getFormatting().createDerivedStyleObject(f,"paragraph",e);c=b.generateStyleName();f=new ops.OpAddStyle;f.init({memberid:h,styleName:c,styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:e});d.push(f);f=new ops.OpSetParagraphStyle;f.init({memberid:h,styleName:c,position:a});d.push(f);return d};this.subscribe=function(a,b){Z.subscribe(a,b)};this.unsubscribe=function(a,b){Z.unsubscribe(a,b)};this.destroy=function(a){F.unsubscribe(ops.Document.signalCursorAdded,
q);F.unsubscribe(ops.Document.signalCursorRemoved,q);F.unsubscribe(ops.Document.signalCursorMoved,q);F.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,r);F.unsubscribe(ops.OdtDocument.signalParagraphChanged,l);F.unsubscribe(ops.OdtDocument.signalOperationEnd,m);a()};(function(){F.subscribe(ops.Document.signalCursorAdded,q);F.subscribe(ops.Document.signalCursorRemoved,q);F.subscribe(ops.Document.signalCursorMoved,q);F.subscribe(ops.OdtDocument.signalParagraphStyleModified,r);F.subscribe(ops.OdtDocument.signalParagraphChanged,
l);F.subscribe(ops.OdtDocument.signalOperationEnd,m);g();p||(D.alignParagraphCenter=G,D.alignParagraphJustified=G,D.alignParagraphLeft=G,D.alignParagraphRight=G,D.createParagraphStyleOps=function(){return[]},D.indent=G,D.outdent=G)})()};gui.DirectFormattingController.textStylingChanged="textStyling/changed";gui.DirectFormattingController.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectFormattingController})();
// Input 82
gui.HyperlinkClickHandler=function(k){function h(){k().removeAttributeNS("urn:webodf:names:helper","links")}function b(){k().setAttributeNS("urn:webodf:names:helper","links","inactive")}var p=gui.HyperlinkClickHandler.Modifier.None,d=gui.HyperlinkClickHandler.Modifier.Ctrl,n=gui.HyperlinkClickHandler.Modifier.Meta,g=new odf.OdfUtils,q=xmldom.XPath,r=p;this.handleClick=function(b){var f=b.target||b.srcElement,c,a;b.ctrlKey?c=d:b.metaKey&&(c=n);if(r===p||r===c){a:{for(;null!==f;){if(g.isHyperlink(f))break a;
if(g.isParagraph(f))break;f=f.parentNode}f=null}f&&(f=g.getHyperlinkTarget(f),""!==f&&("#"===f[0]?(f=f.substring(1),c=k(),a=q.getODFElementsWithXPath(c,"//text:bookmark-start[@text:name='"+f+"']",odf.Namespaces.lookupNamespaceURI),0===a.length&&(a=q.getODFElementsWithXPath(c,"//text:bookmark[@text:name='"+f+"']",odf.Namespaces.lookupNamespaceURI)),0<a.length&&a[0].scrollIntoView(!0)):runtime.getWindow().open(f),b.preventDefault?b.preventDefault():b.returnValue=!1))}};this.showPointerCursor=h;this.showTextCursor=
b;this.setModifier=function(d){r=d;r!==p?b():h()}};gui.HyperlinkClickHandler.Modifier={None:0,Ctrl:1,Meta:2};
// Input 83
gui.HyperlinkController=function(k,h){var b=new odf.OdfUtils,p=k.getOdtDocument();this.addHyperlink=function(b,n){var g=p.getCursorSelection(h),q=new ops.OpApplyHyperlink,r=[];if(0===g.length||n)n=n||b,q=new ops.OpInsertText,q.init({memberid:h,position:g.position,text:n}),g.length=n.length,r.push(q);q=new ops.OpApplyHyperlink;q.init({memberid:h,position:g.position,length:g.length,hyperlink:b});r.push(q);k.enqueue(r)};this.removeHyperlinks=function(){var d=gui.SelectionMover.createPositionIterator(p.getRootNode()),
n=p.getCursor(h).getSelectedRange(),g=b.getHyperlinkElements(n),q=n.collapsed&&1===g.length,r=p.getDOMDocument().createRange(),l=[],f,c;0!==g.length&&(g.forEach(function(a){r.selectNodeContents(a);f=p.convertDomToCursorRange({anchorNode:r.startContainer,anchorOffset:r.startOffset,focusNode:r.endContainer,focusOffset:r.endOffset});c=new ops.OpRemoveHyperlink;c.init({memberid:h,position:f.position,length:f.length});l.push(c)}),q||(q=g[0],-1===n.comparePoint(q,0)&&(r.setStart(q,0),r.setEnd(n.startContainer,
n.startOffset),f=p.convertDomToCursorRange({anchorNode:r.startContainer,anchorOffset:r.startOffset,focusNode:r.endContainer,focusOffset:r.endOffset}),0<f.length&&(c=new ops.OpApplyHyperlink,c.init({memberid:h,position:f.position,length:f.length,hyperlink:b.getHyperlinkTarget(q)}),l.push(c))),g=g[g.length-1],d.moveToEndOfNode(g),d=d.unfilteredDomOffset(),1===n.comparePoint(g,d)&&(r.setStart(n.endContainer,n.endOffset),r.setEnd(g,d),f=p.convertDomToCursorRange({anchorNode:r.startContainer,anchorOffset:r.startOffset,
focusNode:r.endContainer,focusOffset:r.endOffset}),0<f.length&&(c=new ops.OpApplyHyperlink,c.init({memberid:h,position:f.position,length:f.length,hyperlink:b.getHyperlinkTarget(g)}),l.push(c)))),k.enqueue(l),r.detach())}};
// Input 84
gui.EventManager=function(k){function h(){var a=this,b=[];this.filters=[];this.handlers=[];this.handleEvent=function(c){-1===b.indexOf(c)&&(b.push(c),a.filters.every(function(a){return a(c)})&&a.handlers.forEach(function(a){a(c)}),runtime.setTimeout(function(){b.splice(b.indexOf(c),1)},0))}}function b(a){var b=a.scrollX,c=a.scrollY;this.restore=function(){a.scrollX===b&&a.scrollY===c||a.scrollTo(b,c)}}function p(a){var b=a.scrollTop,c=a.scrollLeft;this.restore=function(){if(a.scrollTop!==b||a.scrollLeft!==
c)a.scrollTop=b,a.scrollLeft=c}}function d(a,b,c){var d="on"+b,f=!1;a.attachEvent&&(a.attachEvent(d,c),f=!0);!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0);f&&!l[b]||!a.hasOwnProperty(d)||(a[d]=c)}function n(b,g){var l=c[b]||null;!l&&g&&(l=c[b]=new h,f[b]&&d(r,b,l.handleEvent),d(a,b,l.handleEvent),d(m,b,l.handleEvent));return l}function g(){return k.getDOMDocument().activeElement===a}function q(a){for(var c=[];a;)(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight)&&c.push(new p(a)),
a=a.parentNode;c.push(new b(r));return c}var r=runtime.getWindow(),l={beforecut:!0,beforepaste:!0},f={mousedown:!0,mouseup:!0,focus:!0},c={},a,m=k.getCanvas().getElement();this.addFilter=function(a,b){n(a,!0).filters.push(b)};this.removeFilter=function(a,b){var c=n(a,!0),d=c.filters.indexOf(b);-1!==d&&c.filters.splice(d,1)};this.subscribe=function(a,b){n(a,!0).handlers.push(b)};this.unsubscribe=function(a,b){var c=n(a,!1),d=c&&c.handlers.indexOf(b);c&&-1!==d&&c.handlers.splice(d,1)};this.hasFocus=
g;this.focus=function(){var b;g()||(b=q(a),a.focus(),b.forEach(function(a){a.restore()}))};this.getEventTrap=function(){return a};this.blur=function(){g()&&a.blur()};this.destroy=function(b){a.parentNode.removeChild(a);b()};(function(){var b=k.getOdfCanvas().getSizer(),c=b.ownerDocument;runtime.assert(Boolean(r),"EventManager requires a window object to operate correctly");a=c.createElement("input");a.id="eventTrap";a.setAttribute("tabindex",-1);b.appendChild(a)})()};
// Input 85
/*

 Copyright (C) 2014 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.IOSSafariSupport=function(k){function h(){b.innerHeight!==b.outerHeight&&(p.style.display="none",runtime.requestAnimationFrame(function(){p.style.display="block"}))}var b=runtime.getWindow(),p=k.getEventTrap();this.destroy=function(b){k.unsubscribe("focus",h);p.removeAttribute("autocapitalize");p.style.WebkitTransform="";b()};k.subscribe("focus",h);p.setAttribute("autocapitalize","off");p.style.WebkitTransform="translateX(-10000px)"};
// Input 86
gui.ImageController=function(k,h,b){var p={"image/gif":".gif","image/jpeg":".jpg","image/png":".png"},d=odf.Namespaces.textns,n=k.getOdtDocument(),g=n.getFormatting(),q={};this.insertImage=function(r,l,f,c){var a;runtime.assert(0<f&&0<c,"Both width and height of the image should be greater than 0px.");a=n.getParagraphElement(n.getCursor(h).getNode()).getAttributeNS(d,"style-name");q.hasOwnProperty(a)||(q[a]=g.getContentSize(a,"paragraph"));a=q[a];f*=0.0264583333333334;c*=0.0264583333333334;var m=
1,e=1;f>a.width&&(m=a.width/f);c>a.height&&(e=a.height/c);m=Math.min(m,e);a=f*m;f=c*m;e=n.getOdfCanvas().odfContainer().rootElement.styles;c=r.toLowerCase();var m=p.hasOwnProperty(c)?p[c]:null,t;c=[];runtime.assert(null!==m,"Image type is not supported: "+r);m="Pictures/"+b.generateImageName()+m;t=new ops.OpSetBlob;t.init({memberid:h,filename:m,mimetype:r,content:l});c.push(t);g.getStyleElement("Graphics","graphic",[e])||(r=new ops.OpAddStyle,r.init({memberid:h,styleName:"Graphics",styleFamily:"graphic",
isAutomaticStyle:!1,setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph","svg:x":"0cm","svg:y":"0cm","style:wrap":"dynamic","style:number-wrapped-paragraphs":"no-limit","style:wrap-contour":"false","style:vertical-pos":"top","style:vertical-rel":"paragraph","style:horizontal-pos":"center","style:horizontal-rel":"paragraph"}}}),c.push(r));r=b.generateStyleName();l=new ops.OpAddStyle;l.init({memberid:h,styleName:r,styleFamily:"graphic",isAutomaticStyle:!0,setProperties:{"style:parent-style-name":"Graphics",
"style:graphic-properties":{"style:vertical-pos":"top","style:vertical-rel":"baseline","style:horizontal-pos":"center","style:horizontal-rel":"paragraph","fo:background-color":"transparent","style:background-transparency":"100%","style:shadow":"none","style:mirror":"none","fo:clip":"rect(0cm, 0cm, 0cm, 0cm)","draw:luminance":"0%","draw:contrast":"0%","draw:red":"0%","draw:green":"0%","draw:blue":"0%","draw:gamma":"100%","draw:color-inversion":"false","draw:image-opacity":"100%","draw:color-mode":"standard"}}});
c.push(l);t=new ops.OpInsertImage;t.init({memberid:h,position:n.getCursorPosition(h),filename:m,frameWidth:a+"cm",frameHeight:f+"cm",frameStyleName:r,frameName:b.generateFrameName()});c.push(t);k.enqueue(c)}};
// Input 87
gui.ImageSelector=function(k){function h(){var b=k.getSizer(),h=d.createElement("div");h.id="imageSelector";h.style.borderWidth="1px";b.appendChild(h);p.forEach(function(b){var g=d.createElement("div");g.className=b;h.appendChild(g)});return h}var b=odf.Namespaces.svgns,p="topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(" "),d=k.getElement().ownerDocument,n=!1;this.select=function(g){var p,r,l=d.getElementById("imageSelector");l||(l=h());n=!0;p=l.parentNode;
r=g.getBoundingClientRect();var f=p.getBoundingClientRect(),c=k.getZoomLevel();p=(r.left-f.left)/c-1;r=(r.top-f.top)/c-1;l.style.display="block";l.style.left=p+"px";l.style.top=r+"px";l.style.width=g.getAttributeNS(b,"width");l.style.height=g.getAttributeNS(b,"height")};this.clearSelection=function(){var b;n&&(b=d.getElementById("imageSelector"))&&(b.style.display="none");n=!1};this.isSelectorElement=function(b){var h=d.getElementById("imageSelector");return h?b===h||b.parentNode===h:!1}};
// Input 88
(function(){function k(h){function b(b){g=b.which&&String.fromCharCode(b.which)===n;n=void 0;return!1===g}function k(){g=!1}function d(b){n=b.data;g=!1}var n,g=!1;this.destroy=function(g){h.unsubscribe("textInput",k);h.unsubscribe("compositionend",d);h.removeFilter("keypress",b);g()};h.subscribe("textInput",k);h.subscribe("compositionend",d);h.addFilter("keypress",b)}gui.InputMethodEditor=function(h,b){function p(b){m&&(b?m.getNode().setAttributeNS(a,"composing","true"):(m.getNode().removeAttributeNS(a,
"composing"),w.textContent=""))}function d(){u&&(u=!1,p(!1),A.emit(gui.InputMethodEditor.signalCompositionEnd,{data:s}),s="")}function n(){d();m&&m.getSelectedRange().collapsed?e.value="":e.value=x;e.setSelectionRange(0,e.value.length)}function g(){J=void 0;v.cancel();p(!0);u||A.emit(gui.InputMethodEditor.signalCompositionStart,{data:""})}function q(a){a=J=a.data;u=!0;s+=a;v.trigger()}function r(a){a.data!==J&&(a=a.data,u=!0,s+=a,v.trigger());J=void 0}function l(){w.textContent=e.value}function f(){b.blur();
e.setAttribute("disabled",!0)}function c(){var a=b.hasFocus();a&&b.blur();F?e.removeAttribute("disabled"):e.setAttribute("disabled",!0);a&&b.focus()}var a="urn:webodf:names:cursor",m=null,e=b.getEventTrap(),t=e.ownerDocument,w,z=new core.Async,x="b",v,u=!1,s="",A=new core.EventNotifier([gui.InputMethodEditor.signalCompositionStart,gui.InputMethodEditor.signalCompositionEnd]),J,G=[],D,F=!1;this.subscribe=A.subscribe;this.unsubscribe=A.unsubscribe;this.registerCursor=function(a){a.getMemberId()===h&&
(m=a,m.getNode().appendChild(w),b.subscribe("input",l),b.subscribe("compositionupdate",l))};this.removeCursor=function(a){m&&a===h&&(m.getNode().removeChild(w),b.unsubscribe("input",l),b.unsubscribe("compositionupdate",l),m=null)};this.setEditing=function(a){F=a;c()};this.destroy=function(a){b.unsubscribe("compositionstart",g);b.unsubscribe("compositionend",q);b.unsubscribe("textInput",r);b.unsubscribe("keypress",d);b.unsubscribe("mousedown",f);b.unsubscribe("mouseup",c);b.unsubscribe("focus",n);
z.destroyAll(D,a)};(function(){b.subscribe("compositionstart",g);b.subscribe("compositionend",q);b.subscribe("textInput",r);b.subscribe("keypress",d);b.subscribe("mousedown",f);b.subscribe("mouseup",c);b.subscribe("focus",n);G.push(new k(b));D=G.map(function(a){return a.destroy});w=t.createElement("span");w.setAttribute("id","composer");v=new core.ScheduledTask(n,1);D.push(v.destroy)})()};gui.InputMethodEditor.signalCompositionStart="input/compositionstart";gui.InputMethodEditor.signalCompositionEnd=
"input/compositionend";return gui.InputMethodEditor})();
// Input 89
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.KeyboardHandler=function(){function k(b,k){k||(k=h.None);return b+":"+k}var h=gui.KeyboardHandler.Modifier,b=null,p={};this.setDefault=function(d){b=d};this.bind=function(b,h,g,q){b=k(b,h);runtime.assert(q||!1===p.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);p[b]=g};this.unbind=function(b,h){var g=k(b,h);delete p[g]};this.reset=function(){b=null;p={}};this.handleEvent=function(d){var n=d.keyCode,g=h.None;d.metaKey&&(g|=h.Meta);d.ctrlKey&&(g|=h.Ctrl);d.altKey&&
(g|=h.Alt);d.shiftKey&&(g|=h.Shift);n=k(n,g);n=p[n];g=!1;n?g=n():null!==b&&(g=b(d));g&&(d.preventDefault?d.preventDefault():d.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,CtrlAlt:6,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};
gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,Ctrl:17,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,LeftMeta:91,MetaInMozilla:224};(function(){return gui.KeyboardHandler})();
// Input 90
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.PlainTextPasteboard=function(k,h){function b(b,d){b.init(d);return b}this.createPasteOps=function(p){var d=k.getCursorPosition(h),n=d,g=[];p.replace(/\r/g,"").split("\n").forEach(function(d){g.push(b(new ops.OpSplitParagraph,{memberid:h,position:n,moveCursor:!0}));n+=1;g.push(b(new ops.OpInsertText,{memberid:h,position:n,text:d,moveCursor:!0}));n+=d.length});g.push(b(new ops.OpRemoveText,{memberid:h,position:d,length:1}));return g}};
// Input 91
/*

 Copyright (C) 2014 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.WordBoundaryFilter=function(k,h){function b(a,b,c){for(var d=null,f=k.getRootNode(),g;a!==f&&null!==a&&null===d;)g=0>b?a.previousSibling:a.nextSibling,c(g)===NodeFilter.FILTER_ACCEPT&&(d=g),a=a.parentNode;return d}function p(a,b){var c;return null===a?m.NO_NEIGHBOUR:g.isCharacterElement(a)?m.SPACE_CHAR:a.nodeType===d||g.isTextSpan(a)||g.isHyperlink(a)?(c=a.textContent.charAt(b()),r.test(c)?m.SPACE_CHAR:q.test(c)?m.PUNCTUATION_CHAR:m.WORD_CHAR):m.OTHER}var d=Node.TEXT_NODE,n=Node.ELEMENT_NODE,
g=new odf.OdfUtils,q=/[!-#%-*,-\/:-;?-@\[-\]_{}\u00a1\u00ab\u00b7\u00bb\u00bf;\u00b7\u055a-\u055f\u0589-\u058a\u05be\u05c0\u05c3\u05c6\u05f3-\u05f4\u0609-\u060a\u060c-\u060d\u061b\u061e-\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0964-\u0965\u0970\u0df4\u0e4f\u0e5a-\u0e5b\u0f04-\u0f12\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u104a-\u104f\u10fb\u1361-\u1368\u166d-\u166e\u169b-\u169c\u16eb-\u16ed\u1735-\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944-\u1945\u19de-\u19df\u1a1e-\u1a1f\u1b5a-\u1b60\u1c3b-\u1c3f\u1c7e-\u1c7f\u2000-\u206e\u207d-\u207e\u208d-\u208e\u3008-\u3009\u2768-\u2775\u27c5-\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc-\u29fd\u2cf9-\u2cfc\u2cfe-\u2cff\u2e00-\u2e7e\u3000-\u303f\u30a0\u30fb\ua60d-\ua60f\ua673\ua67e\ua874-\ua877\ua8ce-\ua8cf\ua92e-\ua92f\ua95f\uaa5c-\uaa5f\ufd3e-\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a-\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a-\uff1b\uff1f-\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]|\ud800[\udd00-\udd01\udf9f\udfd0]|\ud802[\udd1f\udd3f\ude50-\ude58]|\ud809[\udc00-\udc7e]/,
r=/\s/,l=core.PositionFilter.FilterResult.FILTER_ACCEPT,f=core.PositionFilter.FilterResult.FILTER_REJECT,c=odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,a=odf.WordBoundaryFilter.IncludeWhitespace.LEADING,m={NO_NEIGHBOUR:0,SPACE_CHAR:1,PUNCTUATION_CHAR:2,WORD_CHAR:3,OTHER:4};this.acceptPosition=function(e){var d=e.container(),g=e.leftNode(),k=e.rightNode(),q=e.unfilteredDomOffset,r=function(){return e.unfilteredDomOffset()-1};d.nodeType===n&&(null===k&&(k=b(d,1,e.getNodeFilter())),null===g&&(g=
b(d,-1,e.getNodeFilter())));d!==k&&(q=function(){return 0});d!==g&&null!==g&&(r=function(){return g.textContent.length-1});d=p(g,r);k=p(k,q);return d===m.WORD_CHAR&&k===m.WORD_CHAR||d===m.PUNCTUATION_CHAR&&k===m.PUNCTUATION_CHAR||h===c&&d!==m.NO_NEIGHBOUR&&k===m.SPACE_CHAR||h===a&&d===m.SPACE_CHAR&&k!==m.NO_NEIGHBOUR?f:l}};odf.WordBoundaryFilter.IncludeWhitespace={None:0,TRAILING:1,LEADING:2};(function(){return odf.WordBoundaryFilter})();
// Input 92
gui.SelectionController=function(k,h){function b(){var a=x.getCursor(h).getNode();return x.createStepIterator(a,0,[s,J],x.getRootElement(a))}function p(a,b,c){c=new odf.WordBoundaryFilter(x,c);return x.createStepIterator(a,b,[s,J,c],x.getRootElement(a))}function d(a){return function(b){var c=a(b);return function(b,d){return a(d)===c}}}function n(a,b){return b?{anchorNode:a.startContainer,anchorOffset:a.startOffset,focusNode:a.endContainer,focusOffset:a.endOffset}:{anchorNode:a.endContainer,anchorOffset:a.endOffset,
focusNode:a.startContainer,focusOffset:a.startOffset}}function g(a,b,c){var d=new ops.OpMoveCursor;d.init({memberid:h,position:a,length:b||0,selectionType:c});return d}function q(a){var b;b=p(a.startContainer,a.startOffset,G);b.roundToPreviousStep()&&a.setStart(b.container(),b.offset());b=p(a.endContainer,a.endOffset,D);b.roundToNextStep()&&a.setEnd(b.container(),b.offset())}function r(a){var b=u.getParagraphElements(a),c=b[0],b=b[b.length-1];c&&a.setStart(c,0);b&&(u.isParagraph(a.endContainer)&&
0===a.endOffset?a.setEndBefore(b):a.setEnd(b,b.childNodes.length))}function l(a){var b=x.getCursorSelection(h),c=x.getCursor(h).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,A,s):-c.convertBackwardStepsBetweenFilters(-a,A,s),a=b.length+a,k.enqueue([g(b.position,a)]))}function f(a){var c=b(),d=x.getCursor(h).getAnchorNode();a(c)&&(a=x.convertDomToCursorRange({anchorNode:d,anchorOffset:0,focusNode:c.container(),focusOffset:c.offset()}),k.enqueue([g(a.position,a.length)]))}function c(a){var b=
x.getCursorPosition(h),c=x.getCursor(h).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,A,s):-c.convertBackwardStepsBetweenFilters(-a,A,s),k.enqueue([g(b+a,0)]))}function a(a){var c=b();a(c)&&(a=x.convertDomPointToCursorStep(c.container(),c.offset()),k.enqueue([g(a,0)]))}function m(a,b){var d=x.getParagraphElement(x.getCursor(h).getNode());runtime.assert(Boolean(d),"SelectionController: Cursor outside paragraph");d=x.getCursor(h).getStepCounter().countLinesSteps(a,A);b?l(d):c(d)}
function e(a,b){var d=x.getCursor(h).getStepCounter().countStepsToLineBoundary(a,A);b?l(d):c(d)}function t(a,b){var c=x.getCursor(h),c=n(c.getSelectedRange(),c.hasForwardSelection()),d=p(c.focusNode,c.focusOffset,G);if(0<=a?d.nextStep():d.previousStep())c.focusNode=d.container(),c.focusOffset=d.offset(),b||(c.anchorNode=c.focusNode,c.anchorOffset=c.focusOffset),c=x.convertDomToCursorRange(c),k.enqueue([g(c.position,c.length)])}function w(a,b){var c=x.getCursor(h),e=b(c.getNode()),c=n(c.getSelectedRange(),
c.hasForwardSelection());runtime.assert(Boolean(e),"SelectionController: Cursor outside root");0>a?(c.focusNode=e,c.focusOffset=0):(c.focusNode=e,c.focusOffset=e.childNodes.length);e=x.convertDomToCursorRange(c,d(b));k.enqueue([g(e.position,e.length)])}function z(a){var b=x.getCursor(h),b=x.getRootElement(b.getNode());runtime.assert(Boolean(b),"SelectionController: Cursor outside root");a=0>a?x.convertDomPointToCursorStep(b,0,function(a){return a===ops.StepsTranslator.NEXT_STEP}):x.convertDomPointToCursorStep(b,
b.childNodes.length);k.enqueue([g(a,0)]);return!0}var x=k.getOdtDocument(),v=new core.DomUtils,u=new odf.OdfUtils,s=x.getPositionFilter(),A=new core.PositionFilterChain,J=x.createRootFilter(h),G=odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,D=odf.WordBoundaryFilter.IncludeWhitespace.LEADING;this.selectionToRange=function(a){var b=0<=v.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset),c=a.focusNode.ownerDocument.createRange();b?(c.setStart(a.anchorNode,a.anchorOffset),c.setEnd(a.focusNode,
a.focusOffset)):(c.setStart(a.focusNode,a.focusOffset),c.setEnd(a.anchorNode,a.anchorOffset));return{range:c,hasForwardSelection:b}};this.rangeToSelection=n;this.selectImage=function(a){var b=x.getRootElement(a),c=x.createRootFilter(b),b=x.createStepIterator(a,0,[c,x.getPositionFilter()],b),d;b.roundToPreviousStep()||runtime.assert(!1,"No walkable position before frame");c=b.container();d=b.offset();b.setPosition(a,a.childNodes.length);b.roundToNextStep()||runtime.assert(!1,"No walkable position after frame");
a=x.convertDomToCursorRange({anchorNode:c,anchorOffset:d,focusNode:b.container(),focusOffset:b.offset()});a=g(a.position,a.length,ops.OdtCursor.RegionSelection);k.enqueue([a])};this.expandToWordBoundaries=q;this.expandToParagraphBoundaries=r;this.selectRange=function(a,b,c){var e=x.getOdfCanvas().getElement(),f;f=v.containsNode(e,a.startContainer);e=v.containsNode(e,a.endContainer);if(f||e)if(f&&e&&(2===c?q(a):3<=c&&r(a)),a=n(a,b),b=x.convertDomToCursorRange(a,d(u.getParagraphElement)),a=x.getCursorSelection(h),
b.position!==a.position||b.length!==a.length)a=g(b.position,b.length,ops.OdtCursor.RangeSelection),k.enqueue([a])};this.moveCursorToLeft=function(){a(function(a){return a.previousStep()});return!0};this.moveCursorToRight=function(){a(function(a){return a.nextStep()});return!0};this.extendSelectionToLeft=function(){f(function(a){return a.previousStep()});return!0};this.extendSelectionToRight=function(){f(function(a){return a.nextStep()});return!0};this.moveCursorUp=function(){m(-1,!1);return!0};this.moveCursorDown=
function(){m(1,!1);return!0};this.extendSelectionUp=function(){m(-1,!0);return!0};this.extendSelectionDown=function(){m(1,!0);return!0};this.moveCursorBeforeWord=function(){t(-1,!1);return!0};this.moveCursorPastWord=function(){t(1,!1);return!0};this.extendSelectionBeforeWord=function(){t(-1,!0);return!0};this.extendSelectionPastWord=function(){t(1,!0);return!0};this.moveCursorToLineStart=function(){e(-1,!1);return!0};this.moveCursorToLineEnd=function(){e(1,!1);return!0};this.extendSelectionToLineStart=
function(){e(-1,!0);return!0};this.extendSelectionToLineEnd=function(){e(1,!0);return!0};this.extendSelectionToParagraphStart=function(){w(-1,x.getParagraphElement);return!0};this.extendSelectionToParagraphEnd=function(){w(1,x.getParagraphElement);return!0};this.moveCursorToDocumentStart=function(){z(-1);return!0};this.moveCursorToDocumentEnd=function(){z(1);return!0};this.extendSelectionToDocumentStart=function(){w(-1,x.getRootElement);return!0};this.extendSelectionToDocumentEnd=function(){w(1,x.getRootElement);
return!0};this.extendSelectionToEntireDocument=function(){var a=x.getCursor(h),a=x.getRootElement(a.getNode());runtime.assert(Boolean(a),"SelectionController: Cursor outside root");a=x.convertDomToCursorRange({anchorNode:a,anchorOffset:0,focusNode:a,focusOffset:a.childNodes.length},d(x.getRootElement));k.enqueue([g(a.position,a.length)]);return!0};A.addFilter(s);A.addFilter(x.createRootFilter(h))};
// Input 93
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.TextController=function(k,h,b,p){function d(b){var d=new ops.OpRemoveText;d.init({memberid:h,position:b.position,length:b.length});return d}function n(b){0>b.length&&(b.position+=b.length,b.length=-b.length);return b}function g(b,d){var c=new core.PositionFilterChain,a=gui.SelectionMover.createPositionIterator(q.getRootElement(b)),g=d?a.nextPosition:a.previousPosition;c.addFilter(q.getPositionFilter());c.addFilter(q.createRootFilter(h));for(a.setUnfilteredPosition(b,0);g();)if(c.acceptPosition(a)===
r)return!0;return!1}var q=k.getOdtDocument(),r=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.enqueueParagraphSplittingOps=function(){var b=n(q.getCursorSelection(h)),f,c=[];0<b.length&&(f=d(b),c.push(f));f=new ops.OpSplitParagraph;f.init({memberid:h,position:b.position,moveCursor:!0});c.push(f);p&&(b=p(b.position+1),c=c.concat(b));k.enqueue(c);return!0};this.removeTextByBackspaceKey=function(){var b=q.getCursor(h),f=n(q.getCursorSelection(h)),c=null;0===f.length?g(b.getNode(),!1)&&(c=new ops.OpRemoveText,
c.init({memberid:h,position:f.position-1,length:1}),k.enqueue([c])):(c=d(f),k.enqueue([c]));return null!==c};this.removeTextByDeleteKey=function(){var b=q.getCursor(h),f=n(q.getCursorSelection(h)),c=null;0===f.length?g(b.getNode(),!0)&&(c=new ops.OpRemoveText,c.init({memberid:h,position:f.position,length:1}),k.enqueue([c])):(c=d(f),k.enqueue([c]));return null!==c};this.removeCurrentSelection=function(){var b=n(q.getCursorSelection(h));0!==b.length&&(b=d(b),k.enqueue([b]));return!0};this.insertText=
function(g){var f=n(q.getCursorSelection(h)),c,a=[],m=!1;0<f.length&&(c=d(f),a.push(c),m=!0);c=new ops.OpInsertText;c.init({memberid:h,position:f.position,text:g,moveCursor:!0});a.push(c);b&&(g=b(f.position,g.length,m))&&a.push(g);k.enqueue(a)}};(function(){return gui.TextController})();
// Input 94
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(k,h){};gui.UndoManager.prototype.unsubscribe=function(k,h){};gui.UndoManager.prototype.setDocument=function(k){};gui.UndoManager.prototype.setInitialState=function(){};gui.UndoManager.prototype.initialize=function(){};gui.UndoManager.prototype.purgeInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(k){};gui.UndoManager.prototype.hasUndoStates=function(){};
gui.UndoManager.prototype.hasRedoStates=function(){};gui.UndoManager.prototype.moveForward=function(k){};gui.UndoManager.prototype.moveBackward=function(k){};gui.UndoManager.prototype.onOperationExecuted=function(k){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
// Input 95
(function(){var k=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(h,b,p,d){function n(a){var c=K.getCursor(b).getSelectedRange();c.collapsed?a.preventDefault():T.setDataFromRange(a,c)?da.removeCurrentSelection():runtime.log("Cut operation failed")}function g(){return!1!==K.getCursor(b).getSelectedRange().collapsed}function q(a){var c=K.getCursor(b).getSelectedRange();c.collapsed?a.preventDefault():T.setDataFromRange(a,c)||runtime.log("Copy operation failed")}function r(a){var b;
O.clipboardData&&O.clipboardData.getData?b=O.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(da.removeCurrentSelection(),h.enqueue(ha.createPasteOps(b)));a.preventDefault?a.preventDefault():a.returnValue=!1}function l(){return!1}function f(a){if(M)M.onOperationExecuted(a)}function c(a){K.emit(ops.OdtDocument.signalUndoStackChanged,a)}function a(){var a=E.getEventTrap(),b,c;return M?(c=E.hasFocus(),M.moveBackward(1),b=K.getOdfCanvas().getSizer(),
Q.containsNode(b,a)||(b.appendChild(a),c&&E.focus()),!0):!1}function m(){var a;return M?(a=E.hasFocus(),M.moveForward(1),a&&E.focus(),!0):!1}function e(){var a=O.getSelection(),b=0<a.rangeCount&&L.selectionToRange(a);R&&b&&(ca=!0,P.clearSelection(),X.setUnfilteredPosition(a.focusNode,a.focusOffset),ia.acceptPosition(X)===k&&(2===ea?L.expandToWordBoundaries(b.range):3<=ea&&L.expandToParagraphBoundaries(b.range),p.setSelectedRange(b.range,b.hasForwardSelection),K.emit(ops.Document.signalCursorMoved,
p)))}function t(a){var c=a.target||a.srcElement||null,d=K.getCursor(b);if(R=null!==c&&Q.containsNode(K.getOdfCanvas().getElement(),c))ca=!1,ia=K.createRootFilter(c),ea=a.detail,d&&a.shiftKey?O.getSelection().collapse(d.getAnchorNode(),0):(a=O.getSelection(),c=d.getSelectedRange(),a.extend?d.hasForwardSelection()?(a.collapse(c.startContainer,c.startOffset),a.extend(c.endContainer,c.endOffset)):(a.collapse(c.endContainer,c.endOffset),a.extend(c.startContainer,c.startOffset)):(a.removeAllRanges(),a.addRange(c.cloneRange()))),
1<ea&&e()}function w(a){var b=K.getRootElement(a),c=K.createRootFilter(b),b=K.createStepIterator(a,0,[c,K.getPositionFilter()],b);b.setPosition(a,a.childNodes.length);return b.roundToNextStep()?{container:b.container(),offset:b.offset()}:null}function z(a){var b;b=(b=O.getSelection())?{anchorNode:b.anchorNode,anchorOffset:b.anchorOffset,focusNode:b.focusNode,focusOffset:b.focusOffset}:null;var c,d;if(!b.anchorNode&&!b.focusNode){d=a.clientX;var e=a.clientY,f=K.getDOMDocument();c=null;f.caretRangeFromPoint?
(d=f.caretRangeFromPoint(d,e),c={container:d.startContainer,offset:d.startOffset}):f.caretPositionFromPoint&&(d=f.caretPositionFromPoint(d,e))&&d.offsetNode&&(c={container:d.offsetNode,offset:d.offset});c&&(b.anchorNode=c.container,b.anchorOffset=c.offset,b.focusNode=b.anchorNode,b.focusOffset=b.anchorOffset)}if(W.isImage(b.focusNode)&&0===b.focusOffset&&W.isCharacterFrame(b.focusNode.parentNode)){if(d=b.focusNode.parentNode,c=d.getBoundingClientRect(),a.clientX>c.right&&(c=w(d)))b.anchorNode=b.focusNode=
c.container,b.anchorOffset=b.focusOffset=c.offset}else W.isImage(b.focusNode.firstChild)&&1===b.focusOffset&&W.isCharacterFrame(b.focusNode)&&(c=w(b.focusNode))&&(b.anchorNode=b.focusNode=c.container,b.anchorOffset=b.focusOffset=c.offset);b.anchorNode&&b.focusNode&&(b=L.selectionToRange(b),L.selectRange(b.range,b.hasForwardSelection,a.detail));E.focus()}function x(a){var b=a.target||a.srcElement||null,c,d;V.processRequests();W.isImage(b)&&W.isCharacterFrame(b.parentNode)&&O.getSelection().isCollapsed?
(L.selectImage(b.parentNode),E.focus()):P.isSelectorElement(b)?E.focus():R&&(ca?(b=p.getSelectedRange(),c=b.collapsed,W.isImage(b.endContainer)&&0===b.endOffset&&W.isCharacterFrame(b.endContainer.parentNode)&&(d=b.endContainer.parentNode,d=w(d))&&(b.setEnd(d.container,d.offset),c&&b.collapse(!1)),L.selectRange(b,p.hasForwardSelection(),a.detail),E.focus()):ma?z(a):Y=runtime.setTimeout(function(){z(a)},0));ea=0;ca=R=!1}function v(a){var c=K.getCursor(b).getSelectedRange();c.collapsed||H.exportRangeToDataTransfer(a.dataTransfer,
c)}function u(){R&&E.focus();ea=0;ca=R=!1}function s(a){x(a)}function A(a){var b=a.target||a.srcElement||null,c=null;"annotationRemoveButton"===b.className?(c=Q.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0],S.removeAnnotation(c),E.focus()):x(a)}function J(a){(a=a.data)&&da.insertText(a)}function G(a){return function(){a();return!0}}function D(a){return function(c){return K.getCursor(b).getSelectionType()===ops.OdtCursor.RangeSelection?a(c):!0}}function F(a){E.unsubscribe("keydown",
y.handleEvent);E.unsubscribe("keypress",aa.handleEvent);E.unsubscribe("keyup",N.handleEvent);E.unsubscribe("copy",q);E.unsubscribe("mousedown",t);E.unsubscribe("mousemove",V.trigger);E.unsubscribe("mouseup",A);E.unsubscribe("contextmenu",s);E.unsubscribe("dragstart",v);E.unsubscribe("dragend",u);E.unsubscribe("click",fa.handleClick);K.unsubscribe(ops.OdtDocument.signalOperationEnd,ga.trigger);K.unsubscribe(ops.Document.signalCursorAdded,$.registerCursor);K.unsubscribe(ops.Document.signalCursorRemoved,
$.removeCursor);K.unsubscribe(ops.OdtDocument.signalOperationEnd,f);a()}var O=runtime.getWindow(),K=h.getOdtDocument(),Z=new core.Async,Q=new core.DomUtils,W=new odf.OdfUtils,H=new gui.MimeDataExporter,T=new gui.Clipboard(H),y=new gui.KeyboardHandler,aa=new gui.KeyboardHandler,N=new gui.KeyboardHandler,R=!1,I=new odf.ObjectNameGenerator(K.getOdfCanvas().odfContainer(),b),ca=!1,ia=null,Y,M=null,E=new gui.EventManager(K),S=new gui.AnnotationController(h,b),U=new gui.DirectFormattingController(h,b,I,
d.directParagraphStylingEnabled),da=new gui.TextController(h,b,U.createCursorStyleOp,U.createParagraphStyleOps),ka=new gui.ImageController(h,b,I),P=new gui.ImageSelector(K.getOdfCanvas()),X=gui.SelectionMover.createPositionIterator(K.getRootNode()),V,ga,ha=new gui.PlainTextPasteboard(K,b),$=new gui.InputMethodEditor(b,E),ea=0,fa=new gui.HyperlinkClickHandler(K.getRootNode),ja=new gui.HyperlinkController(h,b),L=new gui.SelectionController(h,b),B=gui.KeyboardHandler.Modifier,C=gui.KeyboardHandler.KeyCode,
ba=-1!==O.navigator.appVersion.toLowerCase().indexOf("mac"),ma=-1!==["iPad","iPod","iPhone"].indexOf(O.navigator.platform),la;runtime.assert(null!==O,"Expected to be run in an environment which has a global window, like a browser.");this.undo=a;this.redo=m;this.insertLocalCursor=function(){runtime.assert(void 0===h.getOdtDocument().getCursor(b),"Inserting local cursor a second time.");var a=new ops.OpAddCursor;a.init({memberid:b});h.enqueue([a]);E.focus()};this.removeLocalCursor=function(){runtime.assert(void 0!==
h.getOdtDocument().getCursor(b),"Removing local cursor without inserting before.");var a=new ops.OpRemoveCursor;a.init({memberid:b});h.enqueue([a])};this.startEditing=function(){$.subscribe(gui.InputMethodEditor.signalCompositionStart,da.removeCurrentSelection);$.subscribe(gui.InputMethodEditor.signalCompositionEnd,J);E.subscribe("beforecut",g);E.subscribe("cut",n);E.subscribe("beforepaste",l);E.subscribe("paste",r);O.addEventListener("focus",fa.showTextCursor,!1);M&&M.initialize();$.setEditing(!0);
fa.setModifier(ba?gui.HyperlinkClickHandler.Modifier.Meta:gui.HyperlinkClickHandler.Modifier.Ctrl);y.bind(C.Backspace,B.None,G(da.removeTextByBackspaceKey),!0);y.bind(C.Delete,B.None,da.removeTextByDeleteKey);y.bind(C.Tab,B.None,D(function(){da.insertText("\t");return!0}));ba?(y.bind(C.Clear,B.None,da.removeCurrentSelection),y.bind(C.B,B.Meta,D(U.toggleBold)),y.bind(C.I,B.Meta,D(U.toggleItalic)),y.bind(C.U,B.Meta,D(U.toggleUnderline)),y.bind(C.L,B.MetaShift,D(U.alignParagraphLeft)),y.bind(C.E,B.MetaShift,
D(U.alignParagraphCenter)),y.bind(C.R,B.MetaShift,D(U.alignParagraphRight)),y.bind(C.J,B.MetaShift,D(U.alignParagraphJustified)),y.bind(C.C,B.MetaShift,S.addAnnotation),y.bind(C.Z,B.Meta,a),y.bind(C.Z,B.MetaShift,m),y.bind(C.LeftMeta,B.Meta,fa.showPointerCursor),y.bind(C.MetaInMozilla,B.Meta,fa.showPointerCursor),N.bind(C.LeftMeta,B.None,fa.showTextCursor),N.bind(C.MetaInMozilla,B.None,fa.showTextCursor)):(y.bind(C.B,B.Ctrl,D(U.toggleBold)),y.bind(C.I,B.Ctrl,D(U.toggleItalic)),y.bind(C.U,B.Ctrl,D(U.toggleUnderline)),
y.bind(C.L,B.CtrlShift,D(U.alignParagraphLeft)),y.bind(C.E,B.CtrlShift,D(U.alignParagraphCenter)),y.bind(C.R,B.CtrlShift,D(U.alignParagraphRight)),y.bind(C.J,B.CtrlShift,D(U.alignParagraphJustified)),y.bind(C.C,B.CtrlAlt,S.addAnnotation),y.bind(C.Z,B.Ctrl,a),y.bind(C.Z,B.CtrlShift,m),y.bind(C.Ctrl,B.Ctrl,fa.showPointerCursor),N.bind(C.Ctrl,B.None,fa.showTextCursor));aa.setDefault(D(function(a){var b;b=null===a.which||void 0===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):
null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(da.insertText(b),!0)}));aa.bind(C.Enter,B.None,D(da.enqueueParagraphSplittingOps))};this.endEditing=function(){$.unsubscribe(gui.InputMethodEditor.signalCompositionStart,da.removeCurrentSelection);$.unsubscribe(gui.InputMethodEditor.signalCompositionEnd,J);E.unsubscribe("cut",n);E.unsubscribe("beforecut",g);E.unsubscribe("paste",r);E.unsubscribe("beforepaste",l);O.removeEventListener("focus",fa.showTextCursor,!1);$.setEditing(!1);fa.setModifier(gui.HyperlinkClickHandler.Modifier.None);
y.bind(C.Backspace,B.None,function(){return!0},!0);y.unbind(C.Delete,B.None);y.unbind(C.Tab,B.None);ba?(y.unbind(C.Clear,B.None),y.unbind(C.B,B.Meta),y.unbind(C.I,B.Meta),y.unbind(C.U,B.Meta),y.unbind(C.L,B.MetaShift),y.unbind(C.E,B.MetaShift),y.unbind(C.R,B.MetaShift),y.unbind(C.J,B.MetaShift),y.unbind(C.C,B.MetaShift),y.unbind(C.Z,B.Meta),y.unbind(C.Z,B.MetaShift),y.unbind(C.LeftMeta,B.Meta),y.unbind(C.MetaInMozilla,B.Meta),N.unbind(C.LeftMeta,B.None),N.unbind(C.MetaInMozilla,B.None)):(y.unbind(C.B,
B.Ctrl),y.unbind(C.I,B.Ctrl),y.unbind(C.U,B.Ctrl),y.unbind(C.L,B.CtrlShift),y.unbind(C.E,B.CtrlShift),y.unbind(C.R,B.CtrlShift),y.unbind(C.J,B.CtrlShift),y.unbind(C.C,B.CtrlAlt),y.unbind(C.Z,B.Ctrl),y.unbind(C.Z,B.CtrlShift),y.unbind(C.Ctrl,B.Ctrl),N.unbind(C.Ctrl,B.None));aa.setDefault(null);aa.unbind(C.Enter,B.None)};this.getInputMemberId=function(){return b};this.getSession=function(){return h};this.setUndoManager=function(a){M&&M.unsubscribe(gui.UndoManager.signalUndoStackChanged,c);if(M=a)M.setDocument(K),
M.setPlaybackFunction(h.enqueue),M.subscribe(gui.UndoManager.signalUndoStackChanged,c)};this.getUndoManager=function(){return M};this.getAnnotationController=function(){return S};this.getDirectFormattingController=function(){return U};this.getHyperlinkController=function(){return ja};this.getImageController=function(){return ka};this.getSelectionController=function(){return L};this.getTextController=function(){return da};this.getEventManager=function(){return E};this.getKeyboardHandlers=function(){return{keydown:y,
keypress:aa}};this.destroy=function(a){var b=[];la&&b.push(la.destroy);b=b.concat([V.destroy,ga.destroy,U.destroy,$.destroy,E.destroy,F]);runtime.clearTimeout(Y);Z.destroyAll(b,a)};V=new core.ScheduledTask(e,0);ga=new core.ScheduledTask(function(){var a=K.getCursor(b);if(a&&a.getSelectionType()===ops.OdtCursor.RegionSelection&&(a=W.getImageElements(a.getSelectedRange())[0])){P.select(a.parentNode);return}P.clearSelection()},0);y.bind(C.Left,B.None,D(L.moveCursorToLeft));y.bind(C.Right,B.None,D(L.moveCursorToRight));
y.bind(C.Up,B.None,D(L.moveCursorUp));y.bind(C.Down,B.None,D(L.moveCursorDown));y.bind(C.Left,B.Shift,D(L.extendSelectionToLeft));y.bind(C.Right,B.Shift,D(L.extendSelectionToRight));y.bind(C.Up,B.Shift,D(L.extendSelectionUp));y.bind(C.Down,B.Shift,D(L.extendSelectionDown));y.bind(C.Home,B.None,D(L.moveCursorToLineStart));y.bind(C.End,B.None,D(L.moveCursorToLineEnd));y.bind(C.Home,B.Ctrl,D(L.moveCursorToDocumentStart));y.bind(C.End,B.Ctrl,D(L.moveCursorToDocumentEnd));y.bind(C.Home,B.Shift,D(L.extendSelectionToLineStart));
y.bind(C.End,B.Shift,D(L.extendSelectionToLineEnd));y.bind(C.Up,B.CtrlShift,D(L.extendSelectionToParagraphStart));y.bind(C.Down,B.CtrlShift,D(L.extendSelectionToParagraphEnd));y.bind(C.Home,B.CtrlShift,D(L.extendSelectionToDocumentStart));y.bind(C.End,B.CtrlShift,D(L.extendSelectionToDocumentEnd));ba?(y.bind(C.Left,B.Alt,D(L.moveCursorBeforeWord)),y.bind(C.Right,B.Alt,D(L.moveCursorPastWord)),y.bind(C.Left,B.Meta,D(L.moveCursorToLineStart)),y.bind(C.Right,B.Meta,D(L.moveCursorToLineEnd)),y.bind(C.Home,
B.Meta,D(L.moveCursorToDocumentStart)),y.bind(C.End,B.Meta,D(L.moveCursorToDocumentEnd)),y.bind(C.Left,B.AltShift,D(L.extendSelectionBeforeWord)),y.bind(C.Right,B.AltShift,D(L.extendSelectionPastWord)),y.bind(C.Left,B.MetaShift,D(L.extendSelectionToLineStart)),y.bind(C.Right,B.MetaShift,D(L.extendSelectionToLineEnd)),y.bind(C.Up,B.AltShift,D(L.extendSelectionToParagraphStart)),y.bind(C.Down,B.AltShift,D(L.extendSelectionToParagraphEnd)),y.bind(C.Up,B.MetaShift,D(L.extendSelectionToDocumentStart)),
y.bind(C.Down,B.MetaShift,D(L.extendSelectionToDocumentEnd)),y.bind(C.A,B.Meta,D(L.extendSelectionToEntireDocument))):(y.bind(C.Left,B.Ctrl,D(L.moveCursorBeforeWord)),y.bind(C.Right,B.Ctrl,D(L.moveCursorPastWord)),y.bind(C.Left,B.CtrlShift,D(L.extendSelectionBeforeWord)),y.bind(C.Right,B.CtrlShift,D(L.extendSelectionPastWord)),y.bind(C.A,B.Ctrl,D(L.extendSelectionToEntireDocument)));ma&&(la=new gui.IOSSafariSupport(E));E.subscribe("keydown",y.handleEvent);E.subscribe("keypress",aa.handleEvent);E.subscribe("keyup",
N.handleEvent);E.subscribe("copy",q);E.subscribe("mousedown",t);E.subscribe("mousemove",V.trigger);E.subscribe("mouseup",A);E.subscribe("contextmenu",s);E.subscribe("dragstart",v);E.subscribe("dragend",u);E.subscribe("click",fa.handleClick);K.subscribe(ops.OdtDocument.signalOperationEnd,ga.trigger);K.subscribe(ops.Document.signalCursorAdded,$.registerCursor);K.subscribe(ops.Document.signalCursorRemoved,$.removeCursor);K.subscribe(ops.OdtDocument.signalOperationEnd,f)};return gui.SessionController})();
// Input 96
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.CaretManager=function(k){function h(b){return a.hasOwnProperty(b)?a[b]:null}function b(){return Object.keys(a).map(function(b){return a[b]})}function p(b){var c=a[b];c&&(c.destroy(function(){}),delete a[b])}function d(a){a=a.getMemberId();a===k.getInputMemberId()&&(a=h(a))&&a.refreshCursorBlinking()}function n(){var a=h(k.getInputMemberId());w=!1;a&&a.ensureVisible()}function g(){var a=h(k.getInputMemberId());a&&(a.handleUpdate(),w||(w=!0,t=runtime.setTimeout(n,50)))}function q(a){a.memberId===
k.getInputMemberId()&&g()}function r(){var a=h(k.getInputMemberId());a&&a.setFocus()}function l(){var a=h(k.getInputMemberId());a&&a.removeFocus()}function f(){var a=h(k.getInputMemberId());a&&a.show()}function c(){var a=h(k.getInputMemberId());a&&a.hide()}var a={},m=new core.Async,e=runtime.getWindow(),t,w=!1;this.registerCursor=function(b,c,d){var e=b.getMemberId();c=new gui.Caret(b,c,d);d=k.getEventManager();a[e]=c;e===k.getInputMemberId()?(runtime.log("Starting to track input on new cursor of "+
e),b.subscribe(ops.OdtCursor.signalCursorUpdated,g),c.setOverlayElement(d.getEventTrap())):b.subscribe(ops.OdtCursor.signalCursorUpdated,c.handleUpdate);return c};this.getCaret=h;this.getCarets=b;this.destroy=function(g){var h=k.getSession().getOdtDocument(),n=k.getEventManager(),u=b().map(function(a){return a.destroy});runtime.clearTimeout(t);h.unsubscribe(ops.OdtDocument.signalParagraphChanged,q);h.unsubscribe(ops.Document.signalCursorMoved,d);h.unsubscribe(ops.Document.signalCursorRemoved,p);n.unsubscribe("focus",
r);n.unsubscribe("blur",l);e.removeEventListener("focus",f,!1);e.removeEventListener("blur",c,!1);a={};m.destroyAll(u,g)};(function(){var a=k.getSession().getOdtDocument(),b=k.getEventManager();a.subscribe(ops.OdtDocument.signalParagraphChanged,q);a.subscribe(ops.Document.signalCursorMoved,d);a.subscribe(ops.Document.signalCursorRemoved,p);b.subscribe("focus",r);b.subscribe("blur",l);e.addEventListener("focus",f,!1);e.addEventListener("blur",c,!1)})()};
// Input 97
gui.EditInfoHandle=function(k){var h=[],b,p=k.ownerDocument,d=p.documentElement.namespaceURI;this.setEdits=function(k){h=k;var g,q,r,l;b.innerHTML="";for(k=0;k<h.length;k+=1)g=p.createElementNS(d,"div"),g.className="editInfo",q=p.createElementNS(d,"span"),q.className="editInfoColor",q.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[k].memberid),r=p.createElementNS(d,"span"),r.className="editInfoAuthor",r.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[k].memberid),
l=p.createElementNS(d,"span"),l.className="editInfoTime",l.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[k].memberid),l.innerHTML=h[k].time,g.appendChild(q),g.appendChild(r),g.appendChild(l),b.appendChild(g)};this.show=function(){b.style.display="block"};this.hide=function(){b.style.display="none"};this.destroy=function(d){k.removeChild(b);d()};b=p.createElementNS(d,"div");b.setAttribute("class","editInfoHandle");b.style.display="none";k.appendChild(b)};
// Input 98
/*

 Copyright (C) 2012 KO GmbH <aditya.bhatt@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.EditInfo=function(k,h){function b(){var b=[],g;for(g in d)d.hasOwnProperty(g)&&b.push({memberid:g,time:d[g].time});b.sort(function(b,d){return b.time-d.time});return b}var p,d={};this.getNode=function(){return p};this.getOdtDocument=function(){return h};this.getEdits=function(){return d};this.getSortedEdits=function(){return b()};this.addEdit=function(b,g){d[b]={time:g}};this.clearEdits=function(){d={}};this.destroy=function(b){k.parentNode&&k.removeChild(p);b()};p=h.getDOMDocument().createElementNS("urn:webodf:names:editinfo",
"editinfo");k.insertBefore(p,k.firstChild)};
// Input 99
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.EditInfoMarker=function(k,h){function b(b,c){return runtime.setTimeout(function(){g.style.opacity=b},c)}var p=this,d,n,g,q,r,l;this.addEdit=function(d,c){var a=Date.now()-c;k.addEdit(d,c);n.setEdits(k.getSortedEdits());g.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",d);runtime.clearTimeout(r);runtime.clearTimeout(l);1E4>a?(q=b(1,0),r=b(0.5,1E4-a),l=b(0.2,2E4-a)):1E4<=a&&2E4>a?(q=b(0.5,0),l=b(0.2,2E4-a)):q=b(0.2,0)};this.getEdits=function(){return k.getEdits()};this.clearEdits=
function(){k.clearEdits();n.setEdits([]);g.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&g.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return k};this.show=function(){g.style.display="block"};this.hide=function(){p.hideHandle();g.style.display="none"};this.showHandle=function(){n.show()};this.hideHandle=function(){n.hide()};this.destroy=function(b){runtime.clearTimeout(q);runtime.clearTimeout(r);runtime.clearTimeout(l);d.removeChild(g);
n.destroy(function(c){c?b(c):k.destroy(b)})};(function(){var b=k.getOdtDocument().getDOMDocument();g=b.createElementNS(b.documentElement.namespaceURI,"div");g.setAttribute("class","editInfoMarker");g.onmouseover=function(){p.showHandle()};g.onmouseout=function(){p.hideHandle()};d=k.getNode();d.appendChild(g);n=new gui.EditInfoHandle(d);h||p.hide()})()};
// Input 100
gui.ShadowCursor=function(k){var h=k.getDOMDocument().createRange(),b=!0;this.removeFromDocument=function(){};this.getMemberId=function(){return gui.ShadowCursor.ShadowCursorMemberId};this.getSelectedRange=function(){return h};this.setSelectedRange=function(k,d){h=k;b=!1!==d};this.hasForwardSelection=function(){return b};this.getDocument=function(){return k};this.getSelectionType=function(){return ops.OdtCursor.RangeSelection};h.setStart(k.getRootNode(),0)};gui.ShadowCursor.ShadowCursorMemberId="";
(function(){return gui.ShadowCursor})();
// Input 101
gui.SelectionView=function(k){};gui.SelectionView.prototype.rerender=function(){};gui.SelectionView.prototype.show=function(){};gui.SelectionView.prototype.hide=function(){};gui.SelectionView.prototype.destroy=function(k){};
// Input 102
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.SelectionViewManager=function(k){function h(){return Object.keys(b).map(function(h){return b[h]})}var b={};this.getSelectionView=function(h){return b.hasOwnProperty(h)?b[h]:null};this.getSelectionViews=h;this.removeSelectionView=function(h){b.hasOwnProperty(h)&&(b[h].destroy(function(){}),delete b[h])};this.hideSelectionView=function(h){b.hasOwnProperty(h)&&b[h].hide()};this.showSelectionView=function(h){b.hasOwnProperty(h)&&b[h].show()};this.rerenderSelectionViews=function(){Object.keys(b).forEach(function(h){b[h].rerender()})};
this.registerCursor=function(h,d){var n=h.getMemberId(),g=new k(h);d?g.show():g.hide();return b[n]=g};this.destroy=function(b){function d(g,h){h?b(h):g<k.length?k[g].destroy(function(b){d(g+1,b)}):b()}var k=h();d(0,void 0)}};
// Input 103
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
(function(){gui.SessionView=function(k,h,b,p,d){function n(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid="'+a+'"]'+e+c;a:{var f=m.firstChild;for(b=b+'[editinfo|memberid="'+a+'"]'+e+"{";f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:m.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator","{ background-color: "+c+"; }","");d(".selectionOverlay","{ fill: "+c+"; stroke: "+c+";}","")}function g(a){var b,c;for(c in t)t.hasOwnProperty(c)&&(b=t[c],a?b.show():b.hide())}function q(a){p.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function r(a){var b=a.getMemberId();a=a.getProperties();n(b,a.fullName,a.color);h===b&&n("","",a.color)}function l(a){var c=a.getMemberId(),e=b.getOdtDocument().getMember(c).getProperties();p.registerCursor(a,z,x);d.registerCursor(a,
!0);if(a=p.getCaret(c))a.setAvatarImageUrl(e.imageUrl),a.setColor(e.color);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function f(a){a=a.getMemberId();var b=d.getSelectionView(h),c=d.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),e=p.getCaret(h);a===h?(c.hide(),b&&b.show(),e&&e.show()):a===gui.ShadowCursor.ShadowCursorMemberId&&(c.show(),b&&b.hide(),e&&e.hide())}function c(a){d.removeSelectionView(a)}function a(a){var c=a.paragraphElement,d=a.memberId;a=a.timeStamp;
var f,g="",h=c.getElementsByTagNameNS(e,"editinfo").item(0);h?(g=h.getAttributeNS(e,"id"),f=t[g]):(g=Math.random().toString(),f=new ops.EditInfo(c,b.getOdtDocument()),f=new gui.EditInfoMarker(f,w),h=c.getElementsByTagNameNS(e,"editinfo").item(0),h.setAttributeNS(e,"id",g),t[g]=f);f.addEdit(d,new Date(a))}var m,e="urn:webodf:names:editinfo",t={},w=void 0!==k.editInfoMarkersInitiallyVisible?Boolean(k.editInfoMarkersInitiallyVisible):!0,z=void 0!==k.caretAvatarsInitiallyVisible?Boolean(k.caretAvatarsInitiallyVisible):
!0,x=void 0!==k.caretBlinksOnRangeSelect?Boolean(k.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=function(){w||(w=!0,g(w))};this.hideEditInfoMarkers=function(){w&&(w=!1,g(w))};this.showCaretAvatars=function(){z||(z=!0,q(z))};this.hideCaretAvatars=function(){z&&(z=!1,q(z))};this.getSession=function(){return b};this.getCaret=function(a){return p.getCaret(a)};this.destroy=function(e){var g=b.getOdtDocument(),h=Object.keys(t).map(function(a){return t[a]});g.unsubscribe(ops.Document.signalMemberAdded,
r);g.unsubscribe(ops.Document.signalMemberUpdated,r);g.unsubscribe(ops.Document.signalCursorAdded,l);g.unsubscribe(ops.Document.signalCursorRemoved,c);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,a);g.unsubscribe(ops.Document.signalCursorMoved,f);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,d.rerenderSelectionViews);g.unsubscribe(ops.OdtDocument.signalTableAdded,d.rerenderSelectionViews);g.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,d.rerenderSelectionViews);m.parentNode.removeChild(m);
(function J(a,b){b?e(b):a<h.length?h[a].destroy(function(b){J(a+1,b)}):e()})(0,void 0)};(function(){var e=b.getOdtDocument(),g=document.getElementsByTagName("head").item(0);e.subscribe(ops.Document.signalMemberAdded,r);e.subscribe(ops.Document.signalMemberUpdated,r);e.subscribe(ops.Document.signalCursorAdded,l);e.subscribe(ops.Document.signalCursorRemoved,c);e.subscribe(ops.OdtDocument.signalParagraphChanged,a);e.subscribe(ops.Document.signalCursorMoved,f);e.subscribe(ops.OdtDocument.signalParagraphChanged,
d.rerenderSelectionViews);e.subscribe(ops.OdtDocument.signalTableAdded,d.rerenderSelectionViews);e.subscribe(ops.OdtDocument.signalParagraphStyleModified,d.rerenderSelectionViews);m=document.createElementNS(g.namespaceURI,"style");m.type="text/css";m.media="screen, print, handheld, projection";m.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));m.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));g.appendChild(m)})()}})();
// Input 104
gui.SvgSelectionView=function(k){function h(){var b=a.getRootNode();m!==b&&(m=b,e=m.parentNode.parentNode.parentNode,e.appendChild(z),z.setAttribute("class","selectionOverlay"),z.appendChild(x))}function b(b){var c=u.getBoundingClientRect(e),d=a.getCanvas().getZoomLevel(),f={};f.top=u.adaptRangeDifferenceToZoomLevel(b.top-c.top,d);f.left=u.adaptRangeDifferenceToZoomLevel(b.left-c.left,d);f.bottom=u.adaptRangeDifferenceToZoomLevel(b.bottom-c.top,d);f.right=u.adaptRangeDifferenceToZoomLevel(b.right-
c.left,d);f.width=u.adaptRangeDifferenceToZoomLevel(b.width,d);f.height=u.adaptRangeDifferenceToZoomLevel(b.height,d);return f}function p(a){a=a.getBoundingClientRect();return Boolean(a&&0!==a.height)}function d(a){var b=v.getTextElements(a,!0,!1),c=a.cloneRange(),d=a.cloneRange();a=a.cloneRange();if(!b.length)return null;var e;a:{e=0;var f=b[e],g=c.startContainer===f?c.startOffset:0,h=g;c.setStart(f,g);for(c.setEnd(f,h);!p(c);){if(f.nodeType===Node.ELEMENT_NODE&&h<f.childNodes.length)h=f.childNodes.length;
else if(f.nodeType===Node.TEXT_NODE&&h<f.length)h+=1;else if(b[e])f=b[e],e+=1,g=h=0;else{e=!1;break a}c.setStart(f,g);c.setEnd(f,h)}e=!0}if(!e)return null;a:{e=b.length-1;f=b[e];h=g=d.endContainer===f?d.endOffset:f.nodeType===Node.TEXT_NODE?f.length:f.childNodes.length;d.setStart(f,g);for(d.setEnd(f,h);!p(d);){if(f.nodeType===Node.ELEMENT_NODE&&0<g)g=0;else if(f.nodeType===Node.TEXT_NODE&&0<g)g-=1;else if(b[e])f=b[e],e-=1,g=h=f.length||f.childNodes.length;else{b=!1;break a}d.setStart(f,g);d.setEnd(f,
h)}b=!0}if(!b)return null;a.setStart(c.startContainer,c.startOffset);a.setEnd(d.endContainer,d.endOffset);return{firstRange:c,lastRange:d,fillerRange:a}}function n(a,b){var c={};c.top=Math.min(a.top,b.top);c.left=Math.min(a.left,b.left);c.right=Math.max(a.right,b.right);c.bottom=Math.max(a.bottom,b.bottom);c.width=c.right-c.left;c.height=c.bottom-c.top;return c}function g(a,b){b&&0<b.width&&0<b.height&&(a=a?n(a,b):b);return a}function q(b){function c(a){A.setUnfilteredPosition(a,0);return w.acceptNode(a)===
J&&s.acceptPosition(A)===J?J:G}function d(a){var b=null;c(a)===J&&(b=u.getBoundingClientRect(a));return b}var e=b.commonAncestorContainer,f=b.startContainer,h=b.endContainer,m=b.startOffset,k=b.endOffset,l,n,p=null,q,r=t.createRange(),s,w=new odf.OdfNodeFilter,x;if(f===e||h===e)return r=b.cloneRange(),p=r.getBoundingClientRect(),r.detach(),p;for(b=f;b.parentNode!==e;)b=b.parentNode;for(n=h;n.parentNode!==e;)n=n.parentNode;s=a.createRootFilter(f);for(e=b.nextSibling;e&&e!==n;)q=d(e),p=g(p,q),e=e.nextSibling;
if(v.isParagraph(b))p=g(p,u.getBoundingClientRect(b));else if(b.nodeType===Node.TEXT_NODE)e=b,r.setStart(e,m),r.setEnd(e,e===n?k:e.length),q=r.getBoundingClientRect(),p=g(p,q);else for(x=t.createTreeWalker(b,NodeFilter.SHOW_TEXT,c,!1),e=x.currentNode=f;e&&e!==h;)r.setStart(e,m),r.setEnd(e,e.length),q=r.getBoundingClientRect(),p=g(p,q),l=e,m=0,e=x.nextNode();l||(l=f);if(v.isParagraph(n))p=g(p,u.getBoundingClientRect(n));else if(n.nodeType===Node.TEXT_NODE)e=n,r.setStart(e,e===b?m:0),r.setEnd(e,k),
q=r.getBoundingClientRect(),p=g(p,q);else for(x=t.createTreeWalker(n,NodeFilter.SHOW_TEXT,c,!1),e=x.currentNode=h;e&&e!==l;)if(r.setStart(e,0),r.setEnd(e,k),q=r.getBoundingClientRect(),p=g(p,q),e=x.previousNode())k=e.length;return p}function r(a,b){var c=a.getBoundingClientRect(),d={width:0};d.top=c.top;d.bottom=c.bottom;d.height=c.height;d.left=d.right=b?c.right:c.left;return d}function l(){var a=k.getSelectedRange(),c;if(c=s&&k.getSelectionType()===ops.OdtCursor.RangeSelection&&!a.collapsed){h();
var a=d(a),e,f,g,m,l,p,t,u;if(a){c=a.firstRange;e=a.lastRange;f=a.fillerRange;g=b(r(c,!1));l=b(r(e,!0));m=(m=q(f))?b(m):n(g,l);p=m.left;m=g.left+Math.max(0,m.width-(g.left-m.left));t=Math.min(g.top,l.top);u=l.top+l.height;g=[{x:g.left,y:t+g.height},{x:g.left,y:t},{x:m,y:t},{x:m,y:u-l.height},{x:l.right,y:u-l.height},{x:l.right,y:u},{x:p,y:u},{x:p,y:t+g.height},{x:g.left,y:t+g.height}];l="";for(p=0;p<g.length;p+=1)l+=g[p].x+","+g[p].y+" ";x.setAttribute("points",l);c.detach();e.detach();f.detach()}c=
Boolean(a)}z.style.display=c?"block":"none"}function f(a){s&&a===k&&D.trigger()}function c(a){e.removeChild(z);k.getDocument().unsubscribe(ops.Document.signalCursorMoved,f);a()}var a=k.getDocument(),m,e,t=a.getDOMDocument(),w=new core.Async,z=t.createElementNS("http://www.w3.org/2000/svg","svg"),x=t.createElementNS("http://www.w3.org/2000/svg","polygon"),v=new odf.OdfUtils,u=new core.DomUtils,s=!0,A=gui.SelectionMover.createPositionIterator(a.getRootNode()),J=NodeFilter.FILTER_ACCEPT,G=NodeFilter.FILTER_REJECT,
D;this.rerender=function(){s&&D.trigger()};this.show=function(){s=!0;D.trigger()};this.hide=function(){s=!1;D.trigger()};this.destroy=function(a){w.destroyAll([D.destroy,c],a)};(function(){var a=k.getMemberId();D=new core.ScheduledTask(l,0);h();z.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);k.getDocument().subscribe(ops.Document.signalCursorMoved,f)})()};
// Input 105
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.UndoStateRules=function(){function k(b,h){var g=b.length;this.previous=function(){for(g-=1;0<=g;g-=1)if(h(b[g]))return b[g];return null}}function h(b){b=b.spec();var h;b.hasOwnProperty("position")&&(h=b.position);return h}function b(b){return b.isEdit}function p(b,k,g){if(!g)return g=h(b)-h(k),0===g||1===Math.abs(g);b=h(b);k=h(k);g=h(g);return b-k===k-g}this.isEditOperation=b;this.isPartOfOperationSet=function(d,h){var g=void 0!==d.group,q;if(!d.isEdit||0===h.length)return!0;q=h[h.length-1];if(g&&
d.group===q.group)return!0;a:switch(d.spec().optype){case "RemoveText":case "InsertText":q=!0;break a;default:q=!1}if(q&&h.some(b)){if(g){var r;g=d.spec().optype;q=new k(h,b);var l=q.previous(),f=null,c,a;runtime.assert(Boolean(l),"No edit operations found in state");a=l.group;runtime.assert(void 0!==a,"Operation has no group");for(c=1;l&&l.group===a;){if(g===l.spec().optype){r=l;break}l=q.previous()}if(r){for(l=q.previous();l;){if(l.group!==a){if(2===c)break;a=l.group;c+=1}if(g===l.spec().optype){f=
l;break}l=q.previous()}r=p(d,r,f)}else r=!1;return r}r=d.spec().optype;g=new k(h,b);q=g.previous();runtime.assert(Boolean(q),"No edit operations found in state");r=r===q.spec().optype?p(d,q,g.previous()):!1;return r}return!1}};
// Input 106
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.TrivialUndoManager=function(k){function h(a){0<a.length&&(u=!0,m(a),u=!1)}function b(){x.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:r.hasUndoStates(),redoAvailable:r.hasRedoStates()})}function p(){t!==a&&t!==w[w.length-1]&&w.push(t)}function d(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);f.normalizeTextNodes(b)}function n(a){return Object.keys(a).map(function(b){return a[b]})}function g(a){function b(a){var e=a.spec();if(f[e.memberid])switch(e.optype){case "AddCursor":c[e.memberid]||
(c[e.memberid]=a,delete f[e.memberid],g-=1);break;case "MoveCursor":d[e.memberid]||(d[e.memberid]=a)}}var c={},d={},f={},g,h=a.pop();e.getMemberIds().forEach(function(a){f[a]=!0});for(g=Object.keys(f).length;h&&0<g;)h.reverse(),h.forEach(b),h=a.pop();return n(c).concat(n(d))}function q(){var h=c=e.cloneDocumentElement();f.getElementsByTagNameNS(h,l,"cursor").forEach(d);f.getElementsByTagNameNS(h,l,"anchor").forEach(d);p();t=a=g([a].concat(w));w.length=0;z.length=0;b()}var r=this,l="urn:webodf:names:cursor",
f=new core.DomUtils,c,a=[],m,e,t=[],w=[],z=[],x=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),v=k||new gui.UndoStateRules,u=!1;this.subscribe=function(a,b){x.subscribe(a,b)};this.unsubscribe=function(a,b){x.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<w.length};this.hasRedoStates=function(){return 0<z.length};this.setDocument=function(a){e=
a};this.purgeInitialState=function(){w.length=0;z.length=0;a.length=0;t.length=0;c=null;b()};this.setInitialState=q;this.initialize=function(){c||q()};this.setPlaybackFunction=function(a){m=a};this.onOperationExecuted=function(c){u||(v.isEditOperation(c)&&(t===a||0<z.length)||!v.isPartOfOperationSet(c,t)?(z.length=0,p(),t=[c],w.push(t),x.emit(gui.UndoManager.signalUndoStateCreated,{operations:t}),b()):(t.push(c),x.emit(gui.UndoManager.signalUndoStateModified,{operations:t})))};this.moveForward=function(a){for(var c=
0,e;a&&z.length;)e=z.pop(),w.push(e),h(e),a-=1,c+=1;c&&(t=w[w.length-1],b());return c};this.moveBackward=function(d){for(var f=0;d&&w.length;)z.push(w.pop()),d-=1,f+=1;f&&(e.setDocumentElement(c.cloneNode(!0)),x.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),e.getMemberIds().forEach(function(a){e.removeCursor(a)}),h(a),w.forEach(h),t=w[w.length-1]||a,b());return f}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
// Input 107
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OperationTransformMatrix=function(){function k(b){b.position+=b.length;b.length*=-1}function h(b){var a=0>b.length;a&&k(b);return a}function b(b,a){function d(f){b[f]===a&&e.push(f)}var e=[];b&&["style:parent-style-name","style:next-style-name"].forEach(d);return e}function p(b,a){function d(e){b[e]===a&&delete b[e]}b&&["style:parent-style-name","style:next-style-name"].forEach(d)}function d(b){var a={};Object.keys(b).forEach(function(f){a[f]="object"===typeof b[f]?d(b[f]):b[f]});return a}function n(b,
a,d,e){var f,g=!1,h=!1,k,l=[];e&&e.attributes&&(l=e.attributes.split(","));b&&(d||0<l.length)&&Object.keys(b).forEach(function(a){var e=b[a],f;"object"!==typeof e&&(d&&(f=d[a]),void 0!==f?(delete b[a],h=!0,f===e&&(delete d[a],g=!0)):-1!==l.indexOf(a)&&(delete b[a],h=!0))});if(a&&a.attributes&&(d||0<l.length)){k=a.attributes.split(",");for(e=0;e<k.length;e+=1)if(f=k[e],d&&void 0!==d[f]||l&&-1!==l.indexOf(f))k.splice(e,1),e-=1,h=!0;0<k.length?a.attributes=k.join(","):delete a.attributes}return{majorChanged:g,
minorChanged:h}}function g(b){for(var a in b)if(b.hasOwnProperty(a))return!0;return!1}function q(b){for(var a in b)if(b.hasOwnProperty(a)&&("attributes"!==a||0<b.attributes.length))return!0;return!1}function r(b,a,d,e,f){var h=b?b[f]:null,k=a?a[f]:null,l=d?d[f]:null,p=e?e[f]:null,r;r=n(h,k,l,p);h&&!g(h)&&delete b[f];k&&!q(k)&&delete a[f];l&&!g(l)&&delete d[f];p&&!q(p)&&delete e[f];return r}function l(b,a){return{opSpecsA:[b],opSpecsB:[a]}}var f;f={AddCursor:{AddCursor:l,AddMember:l,AddStyle:l,ApplyDirectStyling:l,
InsertText:l,MoveCursor:l,RemoveCursor:l,RemoveMember:l,RemoveStyle:l,RemoveText:l,SetParagraphStyle:l,SplitParagraph:l,UpdateMember:l,UpdateMetadata:l,UpdateParagraphStyle:l},AddMember:{AddStyle:l,InsertText:l,MoveCursor:l,RemoveCursor:l,RemoveStyle:l,RemoveText:l,SetParagraphStyle:l,SplitParagraph:l,UpdateMetadata:l,UpdateParagraphStyle:l},AddStyle:{AddStyle:l,ApplyDirectStyling:l,InsertText:l,MoveCursor:l,RemoveCursor:l,RemoveMember:l,RemoveStyle:function(c,a){var d,e=[c],f=[a];c.styleFamily===
a.styleFamily&&(d=b(c.setProperties,a.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,styleName:c.styleName,removedProperties:{attributes:d.join(",")}},f.unshift(d)),p(c.setProperties,a.styleName));return{opSpecsA:e,opSpecsB:f}},RemoveText:l,SetParagraphStyle:l,SplitParagraph:l,UpdateMember:l,UpdateMetadata:l,UpdateParagraphStyle:l},ApplyDirectStyling:{ApplyDirectStyling:function(b,a,f){var e,h,k,l,n,p,q,s;l=[b];k=[a];if(!(b.position+b.length<=a.position||
b.position>=a.position+a.length)){e=f?b:a;h=f?a:b;if(b.position!==a.position||b.length!==a.length)p=d(e),q=d(h);a=r(h.setProperties,null,e.setProperties,null,"style:text-properties");if(a.majorChanged||a.minorChanged)k=[],b=[],l=e.position+e.length,n=h.position+h.length,h.position<e.position?a.minorChanged&&(s=d(q),s.length=e.position-h.position,b.push(s),h.position=e.position,h.length=n-h.position):e.position<h.position&&a.majorChanged&&(s=d(p),s.length=h.position-e.position,k.push(s),e.position=
h.position,e.length=l-e.position),n>l?a.minorChanged&&(p=q,p.position=l,p.length=n-l,b.push(p),h.length=l-h.position):l>n&&a.majorChanged&&(p.position=n,p.length=l-n,k.push(p),e.length=n-e.position),e.setProperties&&g(e.setProperties)&&k.push(e),h.setProperties&&g(h.setProperties)&&b.push(h),f?(l=k,k=b):l=b}return{opSpecsA:l,opSpecsB:k}},InsertText:function(b,a){a.position<=b.position?b.position+=a.text.length:a.position<=b.position+b.length&&(b.length+=a.text.length);return{opSpecsA:[b],opSpecsB:[a]}},
MoveCursor:l,RemoveCursor:l,RemoveStyle:l,RemoveText:function(b,a){var d=b.position+b.length,e=a.position+a.length,f=[b],g=[a];e<=b.position?b.position-=a.length:a.position<d&&(b.position<a.position?b.length=e<d?b.length-a.length:a.position-b.position:(b.position=a.position,e<d?b.length=d-e:f=[]));return{opSpecsA:f,opSpecsB:g}},SetParagraphStyle:l,SplitParagraph:function(b,a){a.position<b.position?b.position+=1:a.position<b.position+b.length&&(b.length+=1);return{opSpecsA:[b],opSpecsB:[a]}},UpdateMetadata:l,
UpdateParagraphStyle:l},InsertText:{InsertText:function(b,a,d){b.position<a.position?a.position+=b.text.length:b.position>a.position?b.position+=a.text.length:d?a.position+=b.text.length:b.position+=a.text.length;return{opSpecsA:[b],opSpecsB:[a]}},MoveCursor:function(b,a){var d=h(a);b.position<a.position?a.position+=b.text.length:b.position<a.position+a.length&&(a.length+=b.text.length);d&&k(a);return{opSpecsA:[b],opSpecsB:[a]}},RemoveCursor:l,RemoveMember:l,RemoveStyle:l,RemoveText:function(b,a){var d;
d=a.position+a.length;var e=[b],f=[a];d<=b.position?b.position-=a.length:b.position<=a.position?a.position+=b.text.length:(a.length=b.position-a.position,d={optype:"RemoveText",memberid:a.memberid,timestamp:a.timestamp,position:b.position+b.text.length,length:d-b.position},f.unshift(d),b.position=a.position);return{opSpecsA:e,opSpecsB:f}},SplitParagraph:function(b,a,d){if(b.position<a.position)a.position+=b.text.length;else if(b.position>a.position)b.position+=1;else return d?a.position+=b.text.length:
b.position+=1,null;return{opSpecsA:[b],opSpecsB:[a]}},UpdateMember:l,UpdateMetadata:l,UpdateParagraphStyle:l},MoveCursor:{MoveCursor:l,RemoveCursor:function(b,a){return{opSpecsA:b.memberid===a.memberid?[]:[b],opSpecsB:[a]}},RemoveMember:l,RemoveStyle:l,RemoveText:function(b,a){var d=h(b),e=b.position+b.length,f=a.position+a.length;f<=b.position?b.position-=a.length:a.position<e&&(b.position<a.position?b.length=f<e?b.length-a.length:a.position-b.position:(b.position=a.position,b.length=f<e?e-f:0));
d&&k(b);return{opSpecsA:[b],opSpecsB:[a]}},SetParagraphStyle:l,SplitParagraph:function(b,a){var d=h(b);a.position<b.position?b.position+=1:a.position<b.position+b.length&&(b.length+=1);d&&k(b);return{opSpecsA:[b],opSpecsB:[a]}},UpdateMember:l,UpdateMetadata:l,UpdateParagraphStyle:l},RemoveCursor:{RemoveCursor:function(b,a){var d=b.memberid===a.memberid;return{opSpecsA:d?[]:[b],opSpecsB:d?[]:[a]}},RemoveMember:l,RemoveStyle:l,RemoveText:l,SetParagraphStyle:l,SplitParagraph:l,UpdateMember:l,UpdateMetadata:l,
UpdateParagraphStyle:l},RemoveMember:{RemoveStyle:l,RemoveText:l,SetParagraphStyle:l,SplitParagraph:l,UpdateMetadata:l,UpdateParagraphStyle:l},RemoveStyle:{RemoveStyle:function(b,a){var d=b.styleName===a.styleName&&b.styleFamily===a.styleFamily;return{opSpecsA:d?[]:[b],opSpecsB:d?[]:[a]}},RemoveText:l,SetParagraphStyle:function(b,a){var d,e=[b],f=[a];"paragraph"===b.styleFamily&&b.styleName===a.styleName&&(d={optype:"SetParagraphStyle",memberid:b.memberid,timestamp:b.timestamp,position:a.position,
styleName:""},e.unshift(d),a.styleName="");return{opSpecsA:e,opSpecsB:f}},SplitParagraph:l,UpdateMember:l,UpdateMetadata:l,UpdateParagraphStyle:function(c,a){var d,e=[c],f=[a];"paragraph"===c.styleFamily&&(d=b(a.setProperties,c.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:c.memberid,timestamp:c.timestamp,styleName:a.styleName,removedProperties:{attributes:d.join(",")}},e.unshift(d)),c.styleName===a.styleName?f=[]:p(a.setProperties,c.styleName));return{opSpecsA:e,opSpecsB:f}}},
RemoveText:{RemoveText:function(b,a){var d=b.position+b.length,e=a.position+a.length,f=[b],g=[a];e<=b.position?b.position-=a.length:d<=a.position?a.position-=b.length:a.position<d&&(b.position<a.position?(b.length=e<d?b.length-a.length:a.position-b.position,d<e?(a.position=b.position,a.length=e-d):g=[]):(d<e?a.length-=b.length:a.position<b.position?a.length=b.position-a.position:g=[],e<d?(b.position=a.position,b.length=d-e):f=[]));return{opSpecsA:f,opSpecsB:g}},SplitParagraph:function(b,a){var d=
b.position+b.length,e=[b],f=[a];a.position<=b.position?b.position+=1:a.position<d&&(b.length=a.position-b.position,d={optype:"RemoveText",memberid:b.memberid,timestamp:b.timestamp,position:a.position+1,length:d-a.position},e.unshift(d));b.position+b.length<=a.position?a.position-=b.length:b.position<a.position&&(a.position=b.position);return{opSpecsA:e,opSpecsB:f}},UpdateMember:l,UpdateMetadata:l,UpdateParagraphStyle:l},SetParagraphStyle:{UpdateMember:l,UpdateMetadata:l,UpdateParagraphStyle:l},SplitParagraph:{SplitParagraph:function(b,
a,d){b.position<a.position?a.position+=1:b.position>a.position?b.position+=1:b.position===a.position&&(d?a.position+=1:b.position+=1);return{opSpecsA:[b],opSpecsB:[a]}},UpdateMember:l,UpdateMetadata:l,UpdateParagraphStyle:l},UpdateMember:{UpdateMetadata:l,UpdateParagraphStyle:l},UpdateMetadata:{UpdateMetadata:function(b,a,d){var e,f=[b],h=[a];e=d?b:a;b=d?a:b;n(b.setProperties||null,b.removedProperties||null,e.setProperties||null,e.removedProperties||null);e.setProperties&&g(e.setProperties)||e.removedProperties&&
q(e.removedProperties)||(d?f=[]:h=[]);b.setProperties&&g(b.setProperties)||b.removedProperties&&q(b.removedProperties)||(d?h=[]:f=[]);return{opSpecsA:f,opSpecsB:h}},UpdateParagraphStyle:l},UpdateParagraphStyle:{UpdateParagraphStyle:function(b,a,d){var e,f=[b],h=[a];b.styleName===a.styleName&&(e=d?b:a,b=d?a:b,r(b.setProperties,b.removedProperties,e.setProperties,e.removedProperties,"style:paragraph-properties"),r(b.setProperties,b.removedProperties,e.setProperties,e.removedProperties,"style:text-properties"),
n(b.setProperties||null,b.removedProperties||null,e.setProperties||null,e.removedProperties||null),e.setProperties&&g(e.setProperties)||e.removedProperties&&q(e.removedProperties)||(d?f=[]:h=[]),b.setProperties&&g(b.setProperties)||b.removedProperties&&q(b.removedProperties)||(d?h=[]:f=[]));return{opSpecsA:f,opSpecsB:h}}}};this.passUnchanged=l;this.extendTransformations=function(b){Object.keys(b).forEach(function(a){var d=b[a],e,g=f.hasOwnProperty(a);runtime.log((g?"Extending":"Adding")+" map for optypeA: "+
a);g||(f[a]={});e=f[a];Object.keys(d).forEach(function(b){var c=e.hasOwnProperty(b);runtime.assert(a<=b,"Wrong order:"+a+", "+b);runtime.log("  "+(c?"Overwriting":"Adding")+" entry for optypeB: "+b);e[b]=d[b]})})};this.transformOpspecVsOpspec=function(b,a){var d=b.optype<=a.optype,e;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b));runtime.log(runtime.toJson(a));d||(e=b,b=a,a=e);(e=(e=f[b.optype])&&e[a.optype])?(e=e(b,a,!d),d||null===e||(e={opSpecsA:e.opSpecsB,opSpecsB:e.opSpecsA})):
e=null;runtime.log("result:");e?(runtime.log(runtime.toJson(e.opSpecsA)),runtime.log(runtime.toJson(e.opSpecsB))):runtime.log("null");return e}};
// Input 108
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OperationTransformer=function(){function k(d){var h=[];d.forEach(function(d){h.push(b.create(d))});return h}function h(b,k){for(var g,q,r=[],l=[];0<b.length&&k;){g=b.shift();g=p.transformOpspecVsOpspec(g,k);if(!g)return null;r=r.concat(g.opSpecsA);if(0===g.opSpecsB.length){r=r.concat(b);k=null;break}for(;1<g.opSpecsB.length;){q=h(b,g.opSpecsB.shift());if(!q)return null;l=l.concat(q.opSpecsB);b=q.opSpecsA}k=g.opSpecsB.pop()}k&&l.push(k);return{opSpecsA:r,opSpecsB:l}}var b,p=new ops.OperationTransformMatrix;
this.setOperationFactory=function(d){b=d};this.getOperationTransformMatrix=function(){return p};this.transform=function(b,n){for(var g,p=[];0<n.length;){g=h(b,n.shift());if(!g)return null;b=g.opSpecsA;p=p.concat(g.opSpecsB)}return{opsA:k(b),opsB:k(p)}}};
// Input 109
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.Server=function(){};ops.Server.prototype.connect=function(k,h){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(k,h,b,p){};ops.Server.prototype.joinSession=function(k,h,b,p){};ops.Server.prototype.leaveSession=function(k,h,b,p){};ops.Server.prototype.getGenesisUrl=function(k){};
// Input 110
var webodf_css='@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n@namespace svgns url(http://www.w3.org/2000/svg);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let\'s not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\noffice|document *::selection {\n  background: transparent;\n}\noffice|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\ndraw|frame {\n  /** make sure frames are above the main body. */\n  z-index: 1;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:"";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\noffice|text[webodfhelper|links="inactive"] text|a {\n    cursor: text;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n    pointer-events: none;\n}\n\ncursor|cursor > .caret {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > .handle {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > .handle > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > .handle.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > .handle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n/** Input Method Editor input pane & behaviours */\n/* not within a cursor */\n#eventTrap {\n    height: auto;\n    display: block;\n    position: absolute;\n    width: 1px;\n    outline: none;\n    opacity: 0;\n    color: rgba(255, 255, 255, 0); /* hide the blinking caret by setting the colour to fully transparent */\n    overflow: hidden; /* The overflow visibility is used to hide and show characters being entered */\n    pointer-events: none;\n}\n\n/* within a cursor */\ncursor|cursor > #composer {\n    text-decoration: underline;\n}\n\ncursor|cursor[cursor|composing="true"] > #composer {\n    display: inline-block;\n    height: auto;\n    width: auto;\n}\n\ncursor|cursor[cursor|composing="true"] {\n    display: inline-block;\n    width: auto;\n    height: inherit;\n}\n\ncursor|cursor[cursor|composing="true"] > .caret {\n    /* during composition, the caret should be pushed along by the composition text, inline with the text */\n    position: static;\n    /* as it is now part of an inline-block, it will no longer need correct to top or height values to align properly */\n    height: auto !important;\n    top: auto !important;\n}\n\neditinfo|editinfo {\n    /* Empty or invisible display:inline elements respond very badly to mouse selection.\n       Inline blocks are much more reliably selectable in Chrome & friends */\n    display: inline-block;\n}\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: \'\u00d7\';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: \'\';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n    color: black;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 15;\n}\n.selectionOverlay > polygon {\n    fill-opacity: 0.3;\n    stroke-opacity: 0.8;\n    stroke-width: 1;\n    fill-rule: evenodd;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\ndiv.customScrollbars::-webkit-scrollbar\n{\n    width: 8px;\n    height: 8px;\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-track\n{\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-thumb\n{\n    background-color: #444;\n    border-radius: 4px;\n}\n';
