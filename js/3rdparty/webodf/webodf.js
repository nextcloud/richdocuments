// Input 0
var webodf_version="0.4.2-2041-g9de1ecc";
// Input 1
function Runtime(){}Runtime.prototype.getVariable=function(m){};Runtime.prototype.toJson=function(m){};Runtime.prototype.fromJson=function(m){};Runtime.prototype.byteArrayFromString=function(m,h){};Runtime.prototype.byteArrayToString=function(m,h){};Runtime.prototype.read=function(m,h,b,g){};Runtime.prototype.readFile=function(m,h,b){};Runtime.prototype.readFileSync=function(m,h){};Runtime.prototype.loadXML=function(m,h){};Runtime.prototype.writeFile=function(m,h,b){};
Runtime.prototype.isFile=function(m,h){};Runtime.prototype.getFileSize=function(m,h){};Runtime.prototype.deleteFile=function(m,h){};Runtime.prototype.log=function(m,h){};Runtime.prototype.setTimeout=function(m,h){};Runtime.prototype.clearTimeout=function(m){};Runtime.prototype.libraryPaths=function(){};Runtime.prototype.currentDirectory=function(){};Runtime.prototype.setCurrentDirectory=function(m){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};
Runtime.prototype.parseXML=function(m){};Runtime.prototype.exit=function(m){};Runtime.prototype.getWindow=function(){};Runtime.prototype.requestAnimationFrame=function(m){};Runtime.prototype.cancelAnimationFrame=function(m){};Runtime.prototype.assert=function(m,h,b){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(m,h){function b(b){var n="",l,d=b.length;for(l=0;l<d;l+=1)n+=String.fromCharCode(b[l]&255);return n}function g(b){var d="",l,g=b.length,f=[],r,a,c,k;for(l=0;l<g;l+=1)r=b[l],128>r?f.push(r):(l+=1,a=b[l],194<=r&&224>r?f.push((r&31)<<6|a&63):(l+=1,c=b[l],224<=r&&240>r?f.push((r&15)<<12|(a&63)<<6|c&63):(l+=1,k=b[l],240<=r&&245>r&&(r=(r&7)<<18|(a&63)<<12|(c&63)<<6|k&63,r-=65536,f.push((r>>10)+55296,(r&1023)+56320))))),1E3===f.length&&(d+=String.fromCharCode.apply(null,
f),f.length=0);return d+String.fromCharCode.apply(null,f)}var d;"utf8"===h?d=g(m):("binary"!==h&&this.log("Unsupported encoding: "+h),d=b(m));return d};Runtime.getVariable=function(m){try{return eval(m)}catch(h){}};Runtime.toJson=function(m){return JSON.stringify(m)};Runtime.fromJson=function(m){return JSON.parse(m)};Runtime.getFunctionName=function(m){return void 0===m.name?(m=/function\s+(\w+)/.exec(m))&&m[1]:m.name};
function BrowserRuntime(m){function h(r){var a=r.length,c,k,e=0;for(c=0;c<a;c+=1)k=r.charCodeAt(c),e+=1+(128<k)+(2048<k),55040<k&&57344>k&&(e+=1,c+=1);return e}function b(r,a,c){var k=r.length,e,b;a=new Uint8Array(new ArrayBuffer(a));c?(a[0]=239,a[1]=187,a[2]=191,b=3):b=0;for(c=0;c<k;c+=1)e=r.charCodeAt(c),128>e?(a[b]=e,b+=1):2048>e?(a[b]=192|e>>>6,a[b+1]=128|e&63,b+=2):55040>=e||57344<=e?(a[b]=224|e>>>12&15,a[b+1]=128|e>>>6&63,a[b+2]=128|e&63,b+=3):(c+=1,e=(e-55296<<10|r.charCodeAt(c)-56320)+65536,
a[b]=240|e>>>18&7,a[b+1]=128|e>>>12&63,a[b+2]=128|e>>>6&63,a[b+3]=128|e&63,b+=4);return a}function g(b){var a=b.length,c=new Uint8Array(new ArrayBuffer(a)),k;for(k=0;k<a;k+=1)c[k]=b.charCodeAt(k)&255;return c}function d(b,a){var c,k,e;void 0!==a?e=b:a=b;m?(k=m.ownerDocument,e&&(c=k.createElement("span"),c.className=e,c.appendChild(k.createTextNode(e)),m.appendChild(c),m.appendChild(k.createTextNode(" "))),c=k.createElement("span"),0<a.length&&"<"===a[0]?c.innerHTML=a:c.appendChild(k.createTextNode(a)),
m.appendChild(c),m.appendChild(k.createElement("br"))):console&&console.log(a);"alert"===e&&alert(a)}function p(r,a,c){if(0!==c.status||c.responseText)if(200===c.status||0===c.status){if(c.response&&"string"!==typeof c.response)"binary"===a?(c=c.response,c=new Uint8Array(c)):c=String(c.response);else if("binary"===a)if(null!==c.responseBody&&"undefined"!==String(typeof VBArray)){c=(new VBArray(c.responseBody)).toArray();var k=c.length,e=new Uint8Array(new ArrayBuffer(k));for(a=0;a<k;a+=1)e[a]=c[a];
c=e}else{(a=c.getResponseHeader("Content-Length"))&&(a=parseInt(a,10));if(a&&a!==c.responseText.length)a:{var k=c.responseText,e=!1,l=h(k);if("number"===typeof a){if(a!==l&&a!==l+3){k=void 0;break a}e=l+3===a;l=a}k=b(k,l,e)}void 0===k&&(k=g(c.responseText));c=k}else c=c.responseText;f[r]=c;r={err:null,data:c}}else r={err:c.responseText||c.statusText,data:null};else r={err:"File "+r+" is empty.",data:null};return r}function n(b,a,c){var k=new XMLHttpRequest;k.open("GET",b,c);k.overrideMimeType&&("binary"!==
a?k.overrideMimeType("text/plain; charset="+a):k.overrideMimeType("text/plain; charset=x-user-defined"));return k}function l(b,a,c){function k(){var k;4===e.readyState&&(k=p(b,a,e),c(k.err,k.data))}if(f.hasOwnProperty(b))c(null,f[b]);else{var e=n(b,a,!0);e.onreadystatechange=k;try{e.send(null)}catch(l){c(l.message,null)}}}var q=this,f={};this.byteArrayFromString=function(r,a){var c;"utf8"===a?c=b(r,h(r),!1):("binary"!==a&&q.log("unknown encoding: "+a),c=g(r));return c};this.byteArrayToString=Runtime.byteArrayToString;
this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=l;this.read=function(b,a,c,k){l(b,"binary",function(e,b){var r=null;if(b){if("string"===typeof b)throw"This should not happen.";r=b.subarray(a,a+c)}k(e,r)})};this.readFileSync=function(b,a){var c=n(b,a,!1),k;try{c.send(null);k=p(b,a,c);if(k.err)throw k.err;if(null===k.data)throw"No data read from "+b+".";}catch(e){throw e;}return k.data};this.writeFile=function(b,a,c){f[b]=a;var k=new XMLHttpRequest,
e;k.open("PUT",b,!0);k.onreadystatechange=function(){4===k.readyState&&(0!==k.status||k.responseText?200<=k.status&&300>k.status||0===k.status?c(null):c("Status "+String(k.status)+": "+k.responseText||k.statusText):c("File "+b+" is empty."))};e=a.buffer&&!k.sendAsBinary?a.buffer:q.byteArrayToString(a,"binary");try{k.sendAsBinary?k.sendAsBinary(e):k.send(e)}catch(l){q.log("HUH? "+l+" "+a),c(l.message)}};this.deleteFile=function(b,a){delete f[b];var c=new XMLHttpRequest;c.open("DELETE",b,!0);c.onreadystatechange=
function(){4===c.readyState&&(200>c.status&&300<=c.status?a(c.responseText):a(null))};c.send(null)};this.loadXML=function(b,a){var c=new XMLHttpRequest;c.open("GET",b,!0);c.overrideMimeType&&c.overrideMimeType("text/xml");c.onreadystatechange=function(){4===c.readyState&&(0!==c.status||c.responseText?200===c.status||0===c.status?a(null,c.responseXML):a(c.responseText,null):a("File "+b+" is empty.",null))};try{c.send(null)}catch(k){a(k.message,null)}};this.isFile=function(b,a){q.getFileSize(b,function(c){a(-1!==
c)})};this.getFileSize=function(b,a){if(f.hasOwnProperty(b)&&"string"!==typeof f[b])a(f[b].length);else{var c=new XMLHttpRequest;c.open("HEAD",b,!0);c.onreadystatechange=function(){if(4===c.readyState){var k=c.getResponseHeader("Content-Length");k?a(parseInt(k,10)):l(b,"binary",function(c,k){c?a(-1):a(k.length)})}};c.send(null)}};this.log=d;this.assert=function(b,a,c){if(!b)throw d("alert","ASSERTION FAILED:\n"+a),c&&c(),a;};this.setTimeout=function(b,a){return setTimeout(function(){b()},a)};this.clearTimeout=
function(b){clearTimeout(b)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.currentDirectory=function(){return""};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(b){return(new DOMParser).parseFromString(b,"text/xml")};this.exit=function(b){d("Calling exit with code "+String(b)+", but exit() is not implemented.")};this.getWindow=function(){return window};this.requestAnimationFrame=
function(b){var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,c=0;if(a)a.bind(window),c=a(b);else return setTimeout(b,15);return c};this.cancelAnimationFrame=function(b){var a=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame;a?(a.bind(window),a(b)):clearTimeout(b)}}
function NodeJSRuntime(){function m(b){var f=b.length,l,a=new Uint8Array(new ArrayBuffer(f));for(l=0;l<f;l+=1)a[l]=b[l];return a}function h(b,f,l){function a(a,k){if(a)return l(a,null);if(!k)return l("No data for "+b+".",null);if("string"===typeof k)return l(a,k);l(a,m(k))}b=d.resolve(p,b);"binary"!==f?g.readFile(b,f,a):g.readFile(b,null,a)}var b=this,g=require("fs"),d=require("path"),p="",n,l;this.byteArrayFromString=function(b,f){var l=new Buffer(b,f),a,c=l.length,k=new Uint8Array(new ArrayBuffer(c));
for(a=0;a<c;a+=1)k[a]=l[a];return k};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=h;this.loadXML=function(l,f){h(l,"utf-8",function(d,a){if(d)return f(d,null);if(!a)return f("No data for "+l+".",null);f(null,b.parseXML(a))})};this.writeFile=function(b,f,l){f=new Buffer(f);b=d.resolve(p,b);g.writeFile(b,f,"binary",function(a){l(a||null)})};this.deleteFile=function(b,f){b=d.resolve(p,b);
g.unlink(b,f)};this.read=function(b,f,l,a){b=d.resolve(p,b);g.open(b,"r+",666,function(c,k){if(c)a(c,null);else{var e=new Buffer(l);g.read(k,e,0,l,f,function(c){g.close(k);a(c,m(e))})}})};this.readFileSync=function(b,f){var l;l=g.readFileSync(b,"binary"===f?null:f);if(null===l)throw"File "+b+" could not be read.";"binary"===f&&(l=m(l));return l};this.isFile=function(b,l){b=d.resolve(p,b);g.stat(b,function(b,a){l(!b&&a.isFile())})};this.getFileSize=function(b,l){b=d.resolve(p,b);g.stat(b,function(b,
a){b?l(-1):l(a.size)})};this.log=function(b,l){var d;void 0!==l?d=b:l=b;"alert"===d&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(l+"\n");"alert"===d&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(b,l,d){b||(process.stderr.write("ASSERTION FAILED: "+l),d&&d())};this.setTimeout=function(b,l){return setTimeout(function(){b()},l)};this.clearTimeout=function(b){clearTimeout(b)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(b){p=
b};this.currentDirectory=function(){return p};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return l};this.parseXML=function(b){return n.parseFromString(b,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};this.requestAnimationFrame=function(b){return setTimeout(b,15)};this.cancelAnimationFrame=function(b){clearTimeout(b)};n=new (require("xmldom").DOMParser);l=b.parseXML("<a/>").implementation}
function RhinoRuntime(){function m(b,d){var f;void 0!==d?f=b:d=b;"alert"===f&&print("\n!!!!! ALERT !!!!!");print(d);"alert"===f&&print("!!!!! ALERT !!!!!")}var h=this,b={},g=b.javax.xml.parsers.DocumentBuilderFactory.newInstance(),d,p,n="";g.setValidating(!1);g.setNamespaceAware(!0);g.setExpandEntityReferences(!1);g.setSchema(null);p=b.org.xml.sax.EntityResolver({resolveEntity:function(l,d){var f=new b.java.io.FileReader(d);return new b.org.xml.sax.InputSource(f)}});d=g.newDocumentBuilder();d.setEntityResolver(p);
this.byteArrayFromString=function(b,d){var f,n=b.length,a=new Uint8Array(new ArrayBuffer(n));for(f=0;f<n;f+=1)a[f]=b.charCodeAt(f)&255;return a};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.loadXML=function(l,n){var f=new b.java.io.File(l),g=null;try{g=d.parse(f)}catch(a){return print(a),n(a,null)}n(null,g)};this.readFile=function(l,d,f){n&&(l=n+"/"+l);var g=new b.java.io.File(l),a="binary"===d?
"latin1":d;g.isFile()?((l=readFile(l,a))&&"binary"===d&&(l=h.byteArrayFromString(l,"binary")),f(null,l)):f(l+" is not a file.",null)};this.writeFile=function(l,d,f){n&&(l=n+"/"+l);l=new b.java.io.FileOutputStream(l);var g,a=d.length;for(g=0;g<a;g+=1)l.write(d[g]);l.close();f(null)};this.deleteFile=function(l,d){n&&(l=n+"/"+l);var f=new b.java.io.File(l),g=l+Math.random(),g=new b.java.io.File(g);f.rename(g)?(g.deleteOnExit(),d(null)):d("Could not delete "+l)};this.read=function(l,d,f,g){n&&(l=n+"/"+
l);var a;a=l;var c="binary";(new b.java.io.File(a)).isFile()?("binary"===c&&(c="latin1"),a=readFile(a,c)):a=null;a?g(null,this.byteArrayFromString(a.substring(d,d+f),"binary")):g("Cannot read "+l,null)};this.readFileSync=function(b,d){if(!d)return"";var f=readFile(b,d);if(null===f)throw"File could not be read.";return f};this.isFile=function(l,d){n&&(l=n+"/"+l);var f=new b.java.io.File(l);d(f.isFile())};this.getFileSize=function(l,d){n&&(l=n+"/"+l);var f=new b.java.io.File(l);d(f.length())};this.log=
m;this.assert=function(b,d,f){b||(m("alert","ASSERTION FAILED: "+d),f&&f())};this.setTimeout=function(b){b();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(b){n=b};this.currentDirectory=function(){return n};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return d.getDOMImplementation()};this.parseXML=function(l){l=new b.java.io.StringReader(l);l=new b.org.xml.sax.InputSource(l);return d.parse(l)};
this.exit=quit;this.getWindow=function(){return null};this.requestAnimationFrame=function(b){b();return 0};this.cancelAnimationFrame=function(){}}Runtime.create=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime};var runtime=Runtime.create(),core={},gui={},xmldom={},odf={},ops={};
(function(){function m(b,d,f){var g=b+"/manifest.json",a,c;runtime.log("Loading manifest: "+g);try{a=runtime.readFileSync(g,"utf-8")}catch(k){if(f)runtime.log("No loadable manifest found.");else throw console.log(String(k)),k;return}f=JSON.parse(a);for(c in f)f.hasOwnProperty(c)&&(d[c]={dir:b,deps:f[c]})}function h(b,d,f){function g(e){if(!k[e]&&!f(e)){if(c[e])throw"Circular dependency detected for "+e+".";c[e]=!0;if(!d[e])throw"Missing dependency information for class "+e+".";var b=d[e],l=b.deps,
n,h=l.length;for(n=0;n<h;n+=1)g(l[n]);c[e]=!1;k[e]=!0;a.push(b.dir+"/"+e.replace(".","/")+".js")}}var a=[],c={},k={};b.forEach(g);return a}function b(b,d){return d=d+("\n//# sourceURL="+b)+("\n//@ sourceURL="+b)}function g(d){var g,f;for(g=0;g<d.length;g+=1)f=runtime.readFileSync(d[g],"utf-8"),f=b(d[g],f),eval(f)}function d(b){b=b.split(".");var d,f=n,g=b.length;for(d=0;d<g;d+=1){if(!f.hasOwnProperty(b[d]))return!1;f=f[b[d]]}return!0}var p,n={core:core,gui:gui,xmldom:xmldom,odf:odf,ops:ops};runtime.loadClasses=
function(b,n){if(IS_COMPILED_CODE||0===b.length)return n&&n();var f;if(!(f=p)){f=[];var r=runtime.libraryPaths(),a;runtime.currentDirectory()&&-1===r.indexOf(runtime.currentDirectory())&&m(runtime.currentDirectory(),f,!0);for(a=0;a<r.length;a+=1)m(r[a],f)}p=f;b=h(b,p,d);if(0===b.length)return n&&n();if("BrowserRuntime"===runtime.type()&&n){f=b;r=document.currentScript||document.documentElement.lastChild;a=document.createDocumentFragment();var c,k;for(k=0;k<f.length;k+=1)c=document.createElement("script"),
c.type="text/javascript",c.charset="utf-8",c.async=!1,c.setAttribute("src",f[k]),a.appendChild(c);n&&(c.onload=n);r.parentNode.insertBefore(a,r)}else g(b),n&&n()};runtime.loadClass=function(b,d){runtime.loadClasses([b],d)}})();(function(){var m=function(h){return h};runtime.getTranslator=function(){return m};runtime.setTranslator=function(h){m=h};runtime.tr=function(h){var b=m(h);return b&&"string"===String(typeof b)?b:h}})();
(function(m){function h(b){if(b.length){var g=b[0];runtime.readFile(g,"utf8",function(d,h){function n(){var b;(b=eval(m))&&runtime.exit(b)}var l="",l=g.lastIndexOf("/"),m=h,l=-1!==l?g.substring(0,l):".";runtime.setCurrentDirectory(l);d?(runtime.log(d),runtime.exit(1)):null===m?(runtime.log("No code found for "+g),runtime.exit(1)):n.apply(null,b)})}}m=m?Array.prototype.slice.call(m):[];"NodeJSRuntime"===runtime.type()?h(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?h(m):h(m.slice(1))})("undefined"!==
String(typeof arguments)&&arguments);
// Input 2
core.Async=function(){this.forEach=function(m,h,b){function g(d){n!==p&&(d?(n=p,b(d)):(n+=1,n===p&&b(null)))}var d,p=m.length,n=0;for(d=0;d<p;d+=1)h(m[d],g)};this.destroyAll=function(m,h){function b(g,d){if(d)h(d);else if(g<m.length)m[g](function(d){b(g+1,d)});else h()}b(0,void 0)}};
// Input 3
function makeBase64(){function m(a){var c,k=a.length,b=new Uint8Array(new ArrayBuffer(k));for(c=0;c<k;c+=1)b[c]=a.charCodeAt(c)&255;return b}function h(a){var c,k="",b,e=a.length-2;for(b=0;b<e;b+=3)c=a[b]<<16|a[b+1]<<8|a[b+2],k+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>18],k+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12&63],k+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],k+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&
63];b===e+1?(c=a[b]<<4,k+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6],k+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],k+="=="):b===e&&(c=a[b]<<10|a[b+1]<<2,k+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12],k+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],k+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],k+="=");return k}function b(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,
"");var c=a.length,k=new Uint8Array(new ArrayBuffer(3*c)),b=a.length%4,d=0,f,g;for(f=0;f<c;f+=4)g=(e[a.charAt(f)]||0)<<18|(e[a.charAt(f+1)]||0)<<12|(e[a.charAt(f+2)]||0)<<6|(e[a.charAt(f+3)]||0),k[d]=g>>16,k[d+1]=g>>8&255,k[d+2]=g&255,d+=3;c=3*c-[0,0,2,1][b];return k.subarray(0,c)}function g(a){var c,k,b=a.length,e=0,d=new Uint8Array(new ArrayBuffer(3*b));for(c=0;c<b;c+=1)k=a[c],128>k?d[e++]=k:(2048>k?d[e++]=192|k>>>6:(d[e++]=224|k>>>12&15,d[e++]=128|k>>>6&63),d[e++]=128|k&63);return d.subarray(0,
e)}function d(a){var c,k,b,e,d=a.length,f=new Uint8Array(new ArrayBuffer(d)),g=0;for(c=0;c<d;c+=1)k=a[c],128>k?f[g++]=k:(c+=1,b=a[c],224>k?f[g++]=(k&31)<<6|b&63:(c+=1,e=a[c],f[g++]=(k&15)<<12|(b&63)<<6|e&63));return f.subarray(0,g)}function p(a){return h(m(a))}function n(a){return String.fromCharCode.apply(String,b(a))}function l(a){return d(m(a))}function q(a){a=d(a);for(var c="",k=0;k<a.length;)c+=String.fromCharCode.apply(String,a.subarray(k,k+45E3)),k+=45E3;return c}function f(a,c,k){var b,e,
d,f="";for(d=c;d<k;d+=1)c=a.charCodeAt(d)&255,128>c?f+=String.fromCharCode(c):(d+=1,b=a.charCodeAt(d)&255,224>c?f+=String.fromCharCode((c&31)<<6|b&63):(d+=1,e=a.charCodeAt(d)&255,f+=String.fromCharCode((c&15)<<12|(b&63)<<6|e&63)));return f}function r(a,c){function k(){var d=e+1E5;d>a.length&&(d=a.length);b+=f(a,e,d);e=d;d=e===a.length;c(b,d)&&!d&&runtime.setTimeout(k,0)}var b="",e=0;1E5>a.length?c(f(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),k())}function a(a){return g(m(a))}function c(a){return String.fromCharCode.apply(String,
g(a))}function k(a){return String.fromCharCode.apply(String,g(m(a)))}var e=function(a){var c={},k,b;k=0;for(b=a.length;k<b;k+=1)c[a.charAt(k)]=k;return c}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),u,w,z=runtime.getWindow(),x,t;z&&z.btoa?(x=z.btoa,u=function(a){return x(k(a))}):(x=p,u=function(c){return h(a(c))});z&&z.atob?(t=z.atob,w=function(a){a=t(a);return f(a,0,a.length)}):(t=n,w=function(a){return q(b(a))});core.Base64=function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=
h;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=b;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=g;this.convertByteArrayToUTF16Array=this.convertUTF8ArrayToUTF16Array=d;this.convertUTF8StringToBase64=p;this.convertBase64ToUTF8String=n;this.convertUTF8StringToUTF16Array=l;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=q;this.convertUTF8StringToUTF16String=r;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=a;this.convertUTF16ArrayToUTF8String=
c;this.convertUTF16StringToUTF8String=k;this.convertUTF16StringToBase64=u;this.convertBase64ToUTF16String=w;this.fromBase64=n;this.toBase64=p;this.atob=t;this.btoa=x;this.utob=k;this.btou=r;this.encode=u;this.encodeURI=function(a){return u(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return w(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))};return this};return core.Base64}core.Base64=makeBase64();
// Input 4
core.ByteArray=function(m){this.pos=0;this.data=m;this.readUInt32LE=function(){this.pos+=4;var h=this.data,b=this.pos;return h[--b]<<24|h[--b]<<16|h[--b]<<8|h[--b]};this.readUInt16LE=function(){this.pos+=2;var h=this.data,b=this.pos;return h[--b]<<8|h[--b]}};
// Input 5
core.ByteArrayWriter=function(m){function h(b){b>d-g&&(d=Math.max(2*d,g+b),b=new Uint8Array(new ArrayBuffer(d)),b.set(p),p=b)}var b=this,g=0,d=1024,p=new Uint8Array(new ArrayBuffer(d));this.appendByteArrayWriter=function(d){b.appendByteArray(d.getByteArray())};this.appendByteArray=function(b){var d=b.length;h(d);p.set(b,g);g+=d};this.appendArray=function(b){var d=b.length;h(d);p.set(b,g);g+=d};this.appendUInt16LE=function(d){b.appendArray([d&255,d>>8&255])};this.appendUInt32LE=function(d){b.appendArray([d&
255,d>>8&255,d>>16&255,d>>24&255])};this.appendString=function(d){b.appendByteArray(runtime.byteArrayFromString(d,m))};this.getLength=function(){return g};this.getByteArray=function(){var b=new Uint8Array(new ArrayBuffer(g));b.set(p.subarray(0,g));return b}};
// Input 6
core.CSSUnits=function(){var m=this,h={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(b,g,d){return b*h[d]/h[g]};this.convertMeasure=function(b,g){var d,h;b&&g?(d=parseFloat(b),h=b.replace(d.toString(),""),d=m.convert(d,h,g).toString()):d="";return d};this.getUnits=function(b){return b.substr(b.length-2,b.length)}};
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
(function(){function m(){var g,d,h,n,l,m,f,r,a;void 0===b&&(d=(g=runtime.getWindow())&&g.document,m=d.documentElement,f=d.body,b={rangeBCRIgnoresElementBCR:!1,unscaledRangeClientRects:!1,elementBCRIgnoresBodyScroll:!1},d&&(n=d.createElement("div"),n.style.position="absolute",n.style.left="-99999px",n.style.transform="scale(2)",n.style["-webkit-transform"]="scale(2)",l=d.createElement("div"),n.appendChild(l),f.appendChild(n),g=d.createRange(),g.selectNode(l),b.rangeBCRIgnoresElementBCR=0===g.getClientRects().length,
l.appendChild(d.createTextNode("Rect transform test")),d=l.getBoundingClientRect(),h=g.getBoundingClientRect(),b.unscaledRangeClientRects=2<Math.abs(d.height-h.height),n.style.transform="",n.style["-webkit-transform"]="",d=m.style.overflow,h=f.style.overflow,r=f.style.height,a=f.scrollTop,m.style.overflow="visible",f.style.overflow="visible",f.style.height="200%",f.scrollTop=f.scrollHeight,b.elementBCRIgnoresBodyScroll=g.getBoundingClientRect().top!==l.getBoundingClientRect().top,f.scrollTop=a,f.style.height=
r,f.style.overflow=h,m.style.overflow=d,g.detach(),f.removeChild(n),g=Object.keys(b).map(function(a){return a+":"+String(b[a])}).join(", "),runtime.log("Detected browser quirks - "+g)));return b}function h(b,d,h){for(b=b?b.firstElementChild:null;b;){if(b.localName===h&&b.namespaceURI===d)return b;b=b.nextElementSibling}return null}var b;core.DomUtils=function(){function b(a,c){for(var k=0,e;a.parentNode!==c;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(e=c.firstChild;e!==
a;)k+=1,e=e.nextSibling;return k}function d(a,c){return 0>=a.compareBoundaryPoints(Range.START_TO_START,c)&&0<=a.compareBoundaryPoints(Range.END_TO_END,c)}function p(a,c){var k=null;a.nodeType===Node.TEXT_NODE&&(0===a.length?(a.parentNode.removeChild(a),c.nodeType===Node.TEXT_NODE&&(k=c)):(c.nodeType===Node.TEXT_NODE&&(a.appendData(c.data),c.parentNode.removeChild(c)),k=a));return k}function n(a){for(var c=a.parentNode;a.firstChild;)c.insertBefore(a.firstChild,a);c.removeChild(a);return c}function l(a,
c){for(var k=a.parentNode,b=a.firstChild,d;b;)d=b.nextSibling,l(b,c),b=d;k&&c(a)&&n(a);return k}function q(a,c){return a===c||Boolean(a.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY)}function f(a,c,b){Object.keys(c).forEach(function(e){var d=e.split(":"),g=d[1],l=b(d[0]),d=c[e],h=typeof d;"object"===h?Object.keys(d).length&&(e=l?a.getElementsByTagNameNS(l,g)[0]||a.ownerDocument.createElementNS(l,e):a.getElementsByTagName(g)[0]||a.ownerDocument.createElement(e),a.appendChild(e),f(e,
d,b)):l&&(runtime.assert("number"===h||"string"===h,"attempting to map unsupported type '"+h+"' (key: "+e+")"),a.setAttributeNS(l,e,String(d)))})}var r=null;this.splitBoundaries=function(a){var c,k=[],e,d,f;if(a.startContainer.nodeType===Node.TEXT_NODE||a.endContainer.nodeType===Node.TEXT_NODE){e=a.endContainer;d=a.endContainer.nodeType!==Node.TEXT_NODE?a.endOffset===a.endContainer.childNodes.length:!1;f=a.endOffset;c=a.endContainer;if(f<c.childNodes.length)for(c=c.childNodes.item(f),f=0;c.firstChild;)c=
c.firstChild;else for(;c.lastChild;)c=c.lastChild,f=c.nodeType===Node.TEXT_NODE?c.textContent.length:c.childNodes.length;c===e&&(e=null);a.setEnd(c,f);f=a.endContainer;0!==a.endOffset&&f.nodeType===Node.TEXT_NODE&&(c=f,a.endOffset!==c.length&&(k.push(c.splitText(a.endOffset)),k.push(c)));f=a.startContainer;0!==a.startOffset&&f.nodeType===Node.TEXT_NODE&&(c=f,a.startOffset!==c.length&&(f=c.splitText(a.startOffset),k.push(c),k.push(f),a.setStart(f,0)));if(null!==e){for(f=a.endContainer;f.parentNode&&
f.parentNode!==e;)f=f.parentNode;d=d?e.childNodes.length:b(f,e);a.setEnd(e,d)}}return k};this.containsRange=d;this.rangesIntersect=function(a,c){return 0>=a.compareBoundaryPoints(Range.END_TO_START,c)&&0<=a.compareBoundaryPoints(Range.START_TO_END,c)};this.getNodesInRange=function(a,c,b){var e=[],d=a.commonAncestorContainer;b=a.startContainer.ownerDocument.createTreeWalker(d.nodeType===Node.TEXT_NODE?d.parentNode:d,b,c,!1);var f;a.endContainer.childNodes[a.endOffset-1]?(d=a.endContainer.childNodes[a.endOffset-
1],f=Node.DOCUMENT_POSITION_PRECEDING|Node.DOCUMENT_POSITION_CONTAINED_BY):(d=a.endContainer,f=Node.DOCUMENT_POSITION_PRECEDING);a.startContainer.childNodes[a.startOffset]?(a=a.startContainer.childNodes[a.startOffset],b.currentNode=a):a.startOffset===(a.startContainer.nodeType===Node.TEXT_NODE?a.startContainer.length:a.startContainer.childNodes.length)?(a=a.startContainer,b.currentNode=a,b.lastChild(),a=b.nextNode()):(a=a.startContainer,b.currentNode=a);a&&c(a)===NodeFilter.FILTER_ACCEPT&&e.push(a);
for(a=b.nextNode();a;){c=d.compareDocumentPosition(a);if(0!==c&&0===(c&f))break;e.push(a);a=b.nextNode()}return e};this.normalizeTextNodes=function(a){a&&a.nextSibling&&(a=p(a,a.nextSibling));a&&a.previousSibling&&p(a.previousSibling,a)};this.rangeContainsNode=function(a,c){var b=c.ownerDocument.createRange(),e=c.ownerDocument.createRange(),f;b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset);e.selectNodeContents(c);f=d(b,e);b.detach();e.detach();return f};this.mergeIntoParent=
n;this.removeUnwantedNodes=l;this.getElementsByTagNameNS=function(a,c,b){var e=[];a=a.getElementsByTagNameNS(c,b);e.length=b=a.length;for(c=0;c<b;c+=1)e[c]=a.item(c);return e};this.containsNode=function(a,c){return a===c||a.contains(c)};this.comparePoints=function(a,c,k,e){if(a===k)return e-c;var d=a.compareDocumentPosition(k);2===d?d=-1:4===d?d=1:10===d?(c=b(a,k),d=c<e?1:-1):(e=b(k,a),d=e<c?-1:1);return d};this.adaptRangeDifferenceToZoomLevel=function(a,c){return m().unscaledRangeClientRects?a:a/
c};this.getBoundingClientRect=function(a){var c=a.ownerDocument,b=m(),e=c.body;if((!1===b.unscaledRangeClientRects||b.rangeBCRIgnoresElementBCR)&&a.nodeType===Node.ELEMENT_NODE)return a=a.getBoundingClientRect(),b.elementBCRIgnoresBodyScroll?{left:a.left+e.scrollLeft,right:a.right+e.scrollLeft,top:a.top+e.scrollTop,bottom:a.bottom+e.scrollTop,width:a.width,height:a.height}:a;var d;r?d=r:r=d=c.createRange();b=d;b.selectNode(a);return b.getBoundingClientRect()};this.mapKeyValObjOntoNode=function(a,
c,b){Object.keys(c).forEach(function(e){var d=e.split(":"),f=d[1],d=b(d[0]),l=c[e];d?(f=a.getElementsByTagNameNS(d,f)[0],f||(f=a.ownerDocument.createElementNS(d,e),a.appendChild(f)),f.textContent=l):runtime.log("Key ignored: "+e)})};this.removeKeyElementsFromNode=function(a,c,b){c.forEach(function(c){var d=c.split(":"),f=d[1];(d=b(d[0]))?(f=a.getElementsByTagNameNS(d,f)[0])?f.parentNode.removeChild(f):runtime.log("Element for "+c+" not found."):runtime.log("Property Name ignored: "+c)})};this.getKeyValRepresentationOfNode=
function(a,c){for(var b={},e=a.firstElementChild,d;e;){if(d=c(e.namespaceURI))b[d+":"+e.localName]=e.textContent;e=e.nextElementSibling}return b};this.mapObjOntoNode=f;this.getDirectChild=h;(function(a){var c,b;b=runtime.getWindow();null!==b&&(c=b.navigator.appVersion.toLowerCase(),b=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")),c=c.indexOf("msie"),b||c)&&(a.containsNode=q)})(this)};return core.DomUtils})();
// Input 8
core.Cursor=function(m,h){function b(a){a.parentNode&&(l.push(a.previousSibling),l.push(a.nextSibling),a.parentNode.removeChild(a))}function g(a,c,b){if(c.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(c),"putCursorIntoTextNode: invalid container");var e=c.parentNode;runtime.assert(Boolean(e),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=c.length,"putCursorIntoTextNode: offset is out of bounds");0===b?e.insertBefore(a,c):(b!==c.length&&c.splitText(b),e.insertBefore(a,
c.nextSibling))}else c.nodeType===Node.ELEMENT_NODE&&c.insertBefore(a,c.childNodes.item(b));l.push(a.previousSibling);l.push(a.nextSibling)}var d=m.createElementNS("urn:webodf:names:cursor","cursor"),p=m.createElementNS("urn:webodf:names:cursor","anchor"),n,l=[],q=m.createRange(),f,r=new core.DomUtils;this.getNode=function(){return d};this.getAnchorNode=function(){return p.parentNode?p:d};this.getSelectedRange=function(){f?(q.setStartBefore(d),q.collapse(!0)):(q.setStartAfter(n?p:d),q.setEndBefore(n?
d:p));return q};this.setSelectedRange=function(a,c){q&&q!==a&&q.detach();q=a;n=!1!==c;(f=a.collapsed)?(b(p),b(d),g(d,a.startContainer,a.startOffset)):(b(p),b(d),g(n?d:p,a.endContainer,a.endOffset),g(n?p:d,a.startContainer,a.startOffset));l.forEach(r.normalizeTextNodes);l.length=0};this.hasForwardSelection=function(){return n};this.remove=function(){b(d);l.forEach(r.normalizeTextNodes);l.length=0};d.setAttributeNS("urn:webodf:names:cursor","memberId",h);p.setAttributeNS("urn:webodf:names:cursor","memberId",
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
core.Destroyable=function(){};core.Destroyable.prototype.destroy=function(m){};
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
core.EventNotifier=function(m){var h={};this.emit=function(b,g){var d,p;runtime.assert(h.hasOwnProperty(b),'unknown event fired "'+b+'"');p=h[b];for(d=0;d<p.length;d+=1)p[d](g)};this.subscribe=function(b,g){runtime.assert(h.hasOwnProperty(b),'tried to subscribe to unknown event "'+b+'"');h[b].push(g)};this.unsubscribe=function(b,g){var d;runtime.assert(h.hasOwnProperty(b),'tried to unsubscribe from unknown event "'+b+'"');d=h[b].indexOf(g);runtime.assert(-1!==d,'tried to unsubscribe unknown callback from event "'+
b+'"');-1!==d&&h[b].splice(d,1)};(function(){var b,g;for(b=0;b<m.length;b+=1)g=m[b],runtime.assert(!h.hasOwnProperty(g),'Duplicated event ids: "'+g+'" registered more than once.'),h[g]=[]})()};
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
core.LoopWatchDog=function(m,h){var b=Date.now(),g=0;this.check=function(){var d;if(m&&(d=Date.now(),d-b>m))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<h&&(g+=1,g>h))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 12
core.PositionIterator=function(m,h,b,g){function d(){this.acceptNode=function(a){return!a||a.nodeType===k&&0===a.length?w:u}}function p(a){this.acceptNode=function(c){return!c||c.nodeType===k&&0===c.length?w:a.acceptNode(c)}}function n(){var c=r.currentNode,b=c.nodeType;a=b===k?c.length-1:b===e?1:0}function l(){if(null===r.previousSibling()){if(!r.parentNode()||r.currentNode===m)return r.firstChild(),!1;a=0}else n();return!0}function q(){var b=r.currentNode,k;k=c(b);if(b!==m)for(b=b.parentNode;b&&
b!==m;)c(b)===w&&(r.currentNode=b,k=w),b=b.parentNode;k===w?(a=1,b=f.nextPosition()):b=k===u?!0:f.nextPosition();b&&runtime.assert(c(r.currentNode)===u,"moveToAcceptedNode did not result in walker being on an accepted node");return b}var f=this,r,a,c,k=Node.TEXT_NODE,e=Node.ELEMENT_NODE,u=NodeFilter.FILTER_ACCEPT,w=NodeFilter.FILTER_REJECT;this.nextPosition=function(){var c=r.currentNode,b=c.nodeType;if(c===m)return!1;if(0===a&&b===e)null===r.firstChild()&&(a=1);else if(b===k&&a+1<c.length)a+=1;else if(null!==
r.nextSibling())a=0;else if(r.parentNode())a=1;else return!1;return!0};this.previousPosition=function(){var c=!0,b=r.currentNode;0===a?c=l():b.nodeType===k?a-=1:null!==r.lastChild()?n():b===m?c=!1:a=0;return c};this.previousNode=l;this.container=function(){var c=r.currentNode,b=c.nodeType;0===a&&b!==k&&(c=c.parentNode);return c};this.rightNode=function(){var b=r.currentNode,d=b.nodeType;if(d===k&&a===b.length)for(b=b.nextSibling;b&&c(b)!==u;)b=b.nextSibling;else d===e&&1===a&&(b=null);return b};this.leftNode=
function(){var b=r.currentNode;if(0===a)for(b=b.previousSibling;b&&c(b)!==u;)b=b.previousSibling;else if(b.nodeType===e)for(b=b.lastChild;b&&c(b)!==u;)b=b.previousSibling;return b};this.getCurrentNode=function(){return r.currentNode};this.unfilteredDomOffset=function(){if(r.currentNode.nodeType===k)return a;for(var c=0,b=r.currentNode,b=1===a?b.lastChild:b.previousSibling;b;)c+=1,b=b.previousSibling;return c};this.getPreviousSibling=function(){var a=r.currentNode,c=r.previousSibling();r.currentNode=
a;return c};this.getNextSibling=function(){var a=r.currentNode,c=r.nextSibling();r.currentNode=a;return c};this.setPositionBeforeElement=function(c){runtime.assert(Boolean(c),"setPositionBeforeElement called without element");r.currentNode=c;a=0;return q()};this.setUnfilteredPosition=function(c,b){runtime.assert(Boolean(c),"PositionIterator.setUnfilteredPosition called without container");r.currentNode=c;if(c.nodeType===k)return a=b,runtime.assert(b<=c.length,"Error in setPosition: "+b+" > "+c.length),
runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),b===c.length&&(r.nextSibling()?a=0:r.parentNode()?a=1:runtime.assert(!1,"Error in setUnfilteredPosition: position not valid.")),!0;b<c.childNodes.length?(r.currentNode=c.childNodes.item(b),a=0):a=1;return q()};this.moveToEnd=function(){r.currentNode=m;a=1};this.moveToEndOfNode=function(c){c.nodeType===k?f.setUnfilteredPosition(c,c.length):(r.currentNode=c,a=1)};this.isBeforeNode=function(){return 0===a};this.getNodeFilter=function(){return c};
c=(b?new p(b):new d).acceptNode;c.acceptNode=c;h=h||NodeFilter.SHOW_ALL;runtime.assert(m.nodeType!==Node.TEXT_NODE,"Internet Explorer doesn't allow tree walker roots to be text nodes");r=m.ownerDocument.createTreeWalker(m,h,c,g);a=0;null===r.firstChild()&&(a=1)};
// Input 13
core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(m){};(function(){return core.PositionFilter})();
// Input 14
core.PositionFilterChain=function(){var m=[],h=core.PositionFilter.FilterResult.FILTER_ACCEPT,b=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(g){var d;for(d=0;d<m.length;d+=1)if(m[d].acceptPosition(g)===b)return b;return h};this.addFilter=function(b){m.push(b)}};
// Input 15
core.zip_HuftNode=function(){this.n=this.b=this.e=0;this.t=null};core.zip_HuftList=function(){this.list=this.next=null};
core.RawInflate=function(){function m(a,c,b,k,e,d){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var f=Array(this.BMAX+1),l,g,h,n,p,m,C,r=Array(this.BMAX+1),F,s,u,q=new core.zip_HuftNode,t=Array(this.BMAX);n=Array(this.N_MAX);var I,H=Array(this.BMAX+1),w,v,O;O=this.root=null;for(p=0;p<f.length;p++)f[p]=0;for(p=0;p<r.length;p++)r[p]=0;for(p=0;p<t.length;p++)t[p]=null;for(p=0;p<n.length;p++)n[p]=0;for(p=0;p<H.length;p++)H[p]=0;l=256<c?a[256]:this.BMAX;F=a;s=0;p=c;do f[F[s]]++,s++;
while(0<--p);if(f[0]===c)this.root=null,this.status=this.m=0;else{for(m=1;m<=this.BMAX&&0===f[m];m++);C=m;d<m&&(d=m);for(p=this.BMAX;0!==p&&0===f[p];p--);h=p;d>p&&(d=p);for(w=1<<m;m<p;m++,w<<=1)if(w-=f[m],0>w){this.status=2;this.m=d;return}w-=f[p];if(0>w)this.status=2,this.m=d;else{f[p]+=w;H[1]=m=0;F=f;s=1;for(u=2;0<--p;)m+=F[s++],H[u++]=m;F=a;p=s=0;do m=F[s++],0!==m&&(n[H[m]++]=p);while(++p<c);c=H[h];H[0]=p=0;F=n;s=0;n=-1;I=r[0]=0;u=null;v=0;for(C=C-1+1;C<=h;C++)for(a=f[C];0<a--;){for(;C>I+r[1+n];){I+=
r[1+n];n++;v=h-I;v=v>d?d:v;m=C-I;g=1<<m;if(g>a+1)for(g-=a+1,u=C;++m<v;){g<<=1;if(g<=f[++u])break;g-=f[u]}I+m>l&&I<l&&(m=l-I);v=1<<m;r[1+n]=m;u=Array(v);for(g=0;g<v;g++)u[g]=new core.zip_HuftNode;O=null===O?this.root=new core.zip_HuftList:O.next=new core.zip_HuftList;O.next=null;O.list=u;t[n]=u;0<n&&(H[n]=p,q.b=r[n],q.e=16+m,q.t=u,m=(p&(1<<I)-1)>>I-r[n],t[n-1][m].e=q.e,t[n-1][m].b=q.b,t[n-1][m].n=q.n,t[n-1][m].t=q.t)}q.b=C-I;s>=c?q.e=99:F[s]<b?(q.e=256>F[s]?16:15,q.n=F[s++]):(q.e=e[F[s]-b],q.n=k[F[s++]-
b]);g=1<<C-I;for(m=p>>I;m<v;m+=g)u[m].e=q.e,u[m].b=q.b,u[m].n=q.n,u[m].t=q.t;for(m=1<<C-1;0!==(p&m);m>>=1)p^=m;for(p^=m;(p&(1<<I)-1)!==H[n];)I-=r[n],n--}this.m=r[1];this.status=0!==w&&1!==h?1:0}}}function h(b){for(;c<b;){var k=a,e;e=s.length===C?-1:s[C++];a=k|e<<c;c+=8}}function b(c){return a&I[c]}function g(b){a>>=b;c-=b}function d(a,c,e){var d,f,p;if(0===e)return 0;for(p=0;;){h(t);f=z.list[b(t)];for(d=f.e;16<d;){if(99===d)return-1;g(f.b);d-=16;h(d);f=f.t[b(d)];d=f.e}g(f.b);if(16===d)l&=32767,a[c+
p++]=n[l++]=f.n;else{if(15===d)break;h(d);u=f.n+b(d);g(d);h(v);f=x.list[b(v)];for(d=f.e;16<d;){if(99===d)return-1;g(f.b);d-=16;h(d);f=f.t[b(d)];d=f.e}g(f.b);h(d);w=l-f.n-b(d);for(g(d);0<u&&p<e;)u--,w&=32767,l&=32767,a[c+p++]=n[l++]=n[w++]}if(p===e)return e}k=-1;return p}function p(a,c,k){var e,f,l,p,n,C,r,s=Array(316);for(e=0;e<s.length;e++)s[e]=0;h(5);C=257+b(5);g(5);h(5);r=1+b(5);g(5);h(4);e=4+b(4);g(4);if(286<C||30<r)return-1;for(f=0;f<e;f++)h(3),s[K[f]]=b(3),g(3);for(f=e;19>f;f++)s[K[f]]=0;t=
7;f=new m(s,19,19,null,null,t);if(0!==f.status)return-1;z=f.root;t=f.m;p=C+r;for(e=l=0;e<p;)if(h(t),n=z.list[b(t)],f=n.b,g(f),f=n.n,16>f)s[e++]=l=f;else if(16===f){h(2);f=3+b(2);g(2);if(e+f>p)return-1;for(;0<f--;)s[e++]=l}else{17===f?(h(3),f=3+b(3),g(3)):(h(7),f=11+b(7),g(7));if(e+f>p)return-1;for(;0<f--;)s[e++]=0;l=0}t=9;f=new m(s,C,257,H,D,t);0===t&&(f.status=1);if(0!==f.status)return-1;z=f.root;t=f.m;for(e=0;e<r;e++)s[e]=s[e+C];v=6;f=new m(s,r,0,F,O,v);x=f.root;v=f.m;return 0===v&&257<C||0!==f.status?
-1:d(a,c,k)}var n=[],l,q=null,f,r,a,c,k,e,u,w,z,x,t,v,s,C,I=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],H=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],D=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],F=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],O=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],K=[16,17,18,0,8,7,9,6,
10,5,11,4,12,3,13,2,14,1,15],Z;this.inflate=function(I,K){n.length=65536;c=a=l=0;k=-1;e=!1;u=w=0;z=null;s=I;C=0;var G=new Uint8Array(new ArrayBuffer(K));a:for(var S=0,y;S<K&&(!e||-1!==k);){if(0<u){if(0!==k)for(;0<u&&S<K;)u--,w&=32767,l&=32767,G[0+S]=n[l]=n[w],S+=1,l+=1,w+=1;else{for(;0<u&&S<K;)u-=1,l&=32767,h(8),G[0+S]=n[l]=b(8),S+=1,l+=1,g(8);0===u&&(k=-1)}if(S===K)break}if(-1===k){if(e)break;h(1);0!==b(1)&&(e=!0);g(1);h(2);k=b(2);g(2);z=null;u=0}switch(k){case 0:y=G;var aa=0+S,M=K-S,R=void 0,R=
c&7;g(R);h(16);R=b(16);g(16);h(16);if(R!==(~a&65535))y=-1;else{g(16);u=R;for(R=0;0<u&&R<M;)u--,l&=32767,h(8),y[aa+R++]=n[l++]=b(8),g(8);0===u&&(k=-1);y=R}break;case 1:if(null!==z)y=d(G,0+S,K-S);else b:{y=G;aa=0+S;M=K-S;if(null===q){for(var J=void 0,R=Array(288),J=void 0,J=0;144>J;J++)R[J]=8;for(J=144;256>J;J++)R[J]=9;for(J=256;280>J;J++)R[J]=7;for(J=280;288>J;J++)R[J]=8;r=7;J=new m(R,288,257,H,D,r);if(0!==J.status){alert("HufBuild error: "+J.status);y=-1;break b}q=J.root;r=J.m;for(J=0;30>J;J++)R[J]=
5;Z=5;J=new m(R,30,0,F,O,Z);if(1<J.status){q=null;alert("HufBuild error: "+J.status);y=-1;break b}f=J.root;Z=J.m}z=q;x=f;t=r;v=Z;y=d(y,aa,M)}break;case 2:y=null!==z?d(G,0+S,K-S):p(G,0+S,K-S);break;default:y=-1}if(-1===y)break a;S+=y}s=new Uint8Array(new ArrayBuffer(0));return G}};
// Input 16
core.ScheduledTask=function(m,h){function b(){p&&(runtime.clearTimeout(d),p=!1)}function g(){b();m.apply(void 0,n);n=null}var d,p=!1,n=[];this.trigger=function(){n=Array.prototype.slice.call(arguments);p||(p=!0,d=runtime.setTimeout(g,h))};this.triggerImmediate=function(){n=Array.prototype.slice.call(arguments);g()};this.processRequests=function(){p&&g()};this.cancel=b;this.destroy=function(d){b();d()}};
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
core.StepIterator=function(m,h){function b(){r=null;c=a=void 0}function g(){void 0===c&&(c=m.acceptPosition(h)===f);return c}function d(a,c){b();return h.setUnfilteredPosition(a,c)}function p(){r||(r=h.container());return r}function n(){void 0===a&&(a=h.unfilteredDomOffset());return a}function l(){for(b();h.nextPosition();)if(b(),g())return!0;return!1}function q(){for(b();h.previousPosition();)if(b(),g())return!0;return!1}var f=core.PositionFilter.FilterResult.FILTER_ACCEPT,r,a,c;this.isStep=g;this.setPosition=
d;this.container=p;this.offset=n;this.nextStep=l;this.previousStep=q;this.roundToClosestStep=function(){var a=p(),c=n(),b=g();b||(b=q(),b||(d(a,c),b=l()));return b};this.roundToPreviousStep=function(){var a=g();a||(a=q());return a};this.roundToNextStep=function(){var a=g();a||(a=l());return a}};
// Input 18
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var m=runtime.getWindow().document,h=m.getElementById("testarea");runtime.assert(!h,'Unclean test environment, found a div with id "testarea".');h=m.createElement("div");h.setAttribute("id","testarea");m.body.appendChild(h);return h};
core.UnitTest.cleanupTestAreaDiv=function(){var m=runtime.getWindow().document,h=m.getElementById("testarea");runtime.assert(!!h&&h.parentNode===m.body,'Test environment broken, found no div with id "testarea" below body.');m.body.removeChild(h)};core.UnitTest.createOdtDocument=function(m,h){var b="<?xml version='1.0' encoding='UTF-8'?>",b=b+"<office:document";Object.keys(h).forEach(function(g){b+=" xmlns:"+g+'="'+h[g]+'"'});b+=">";b+=m;b+="</office:document>";return runtime.parseXML(b)};
core.UnitTestLogger=function(){var m=[],h=0,b=0,g="",d="";this.startTest=function(p,n){m=[];h=0;g=p;d=n;b=(new Date).getTime()};this.endTest=function(){var p=(new Date).getTime();return{description:d,suite:[g,d],success:0===h,log:m,time:p-b}};this.debug=function(b){m.push({category:"debug",message:b})};this.fail=function(b){h+=1;m.push({category:"fail",message:b})};this.pass=function(b){m.push({category:"pass",message:b})}};
core.UnitTestRunner=function(m,h){function b(c){q+=1;a?h.debug(c):h.fail(c)}function g(a,k){var e;try{if(a.length!==k.length)return b("array of length "+a.length+" should be "+k.length+" long"),!1;for(e=0;e<a.length;e+=1)if(a[e]!==k[e])return b(a[e]+" should be "+k[e]+" at array index "+e),!1}catch(d){return!1}return!0}function d(a,k,e){var f=a.attributes,g=f.length,l,p,n;for(l=0;l<g;l+=1)if(p=f.item(l),"xmlns"!==p.prefix&&"urn:webodf:names:steps"!==p.namespaceURI){n=k.getAttributeNS(p.namespaceURI,
p.localName);if(!k.hasAttributeNS(p.namespaceURI,p.localName))return b("Attribute "+p.localName+" with value "+p.value+" was not present"),!1;if(n!==p.value)return b("Attribute "+p.localName+" was "+n+" should be "+p.value),!1}return e?!0:d(k,a,!0)}function p(a,k){var e,f;e=a.nodeType;f=k.nodeType;if(e!==f)return b("Nodetype '"+e+"' should be '"+f+"'"),!1;if(e===Node.TEXT_NODE){if(a.data===k.data)return!0;b("Textnode data '"+a.data+"' should be '"+k.data+"'");return!1}runtime.assert(e===Node.ELEMENT_NODE,
"Only textnodes and elements supported.");if(a.namespaceURI!==k.namespaceURI)return b("namespace '"+a.namespaceURI+"' should be '"+k.namespaceURI+"'"),!1;if(a.localName!==k.localName)return b("localName '"+a.localName+"' should be '"+k.localName+"'"),!1;if(!d(a,k,!1))return!1;e=a.firstChild;for(f=k.firstChild;e;){if(!f)return b("Nodetype '"+e.nodeType+"' is unexpected here."),!1;if(!p(e,f))return!1;e=e.nextSibling;f=f.nextSibling}return f?(b("Nodetype '"+f.nodeType+"' is missing here."),!1):!0}function n(a,
b){return 0===b?a===b&&1/a===1/b:a===b?!0:null===a||null===b?!1:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?g(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?p(a,b):r(a,b):!1}function l(a,k,e){"string"===typeof k&&"string"===typeof e||h.debug("WARN: shouldBe() expects string arguments");var d,f;try{f=eval(k)}catch(l){d=l}a=eval(e);d?b(k+" should be "+a+". Threw exception "+
d):n(f,a)?h.pass(k+" is "+e):String(typeof f)===String(typeof a)?(e=0===f&&0>1/f?"-0":String(f),b(k+" should be "+a+". Was "+e+".")):b(k+" should be "+a+" (of type "+typeof a+"). Was "+f+" (of type "+typeof f+").")}var q=0,f,r,a=!1;this.resourcePrefix=function(){return m};this.beginExpectFail=function(){f=q;a=!0};this.endExpectFail=function(){var c=f===q;a=!1;q=f;c&&(q+=1,h.fail("Expected at least one failed test, but none registered."))};r=function(a,k){var e=Object.keys(a),d=Object.keys(k);e.sort();
d.sort();return g(e,d)&&Object.keys(a).every(function(e){var d=a[e],f=k[e];return n(d,f)?!0:(b(d+" should be "+f+" for key "+e),!1)})};this.areNodesEqual=p;this.shouldBeNull=function(a,b){l(a,b,"null")};this.shouldBeNonNull=function(a,k){var e,d;try{d=eval(k)}catch(f){e=f}e?b(k+" should be non-null. Threw exception "+e):null!==d?h.pass(k+" is non-null."):b(k+" should be non-null. Was "+d)};this.shouldBe=l;this.testFailed=b;this.countFailedTests=function(){return q};this.name=function(a){var b,e,d=
[],f=a.length;d.length=f;for(b=0;b<f;b+=1){e=Runtime.getFunctionName(a[b])||"";if(""===e)throw"Found a function without a name.";d[b]={f:a[b],name:e}}return d}};
core.UnitTester=function(){function m(b,d){return"<span style='color:blue;cursor:pointer' onclick='"+d+"'>"+b+"</span>"}function h(d){b.reporter&&b.reporter(d)}var b=this,g=0,d=new core.UnitTestLogger,p={},n="BrowserRuntime"===runtime.type();this.resourcePrefix="";this.reporter=function(b){var d,f;n?runtime.log("<span>Running "+m(b.description,'runTest("'+b.suite[0]+'","'+b.description+'")')+"</span>"):runtime.log("Running "+b.description);if(!b.success)for(d=0;d<b.log.length;d+=1)f=b.log[d],runtime.log(f.category,
f.message)};this.runTests=function(l,q,f){function r(b){if(0===b.length)p[a]=e,g+=c.countFailedTests(),q();else{w=b[0].f;var l=b[0].name,n=!0===b[0].expectFail;t=c.countFailedTests();f.length&&-1===f.indexOf(l)?r(b.slice(1)):(k.setUp(),d.startTest(a,l),n&&c.beginExpectFail(),w(function(){n&&c.endExpectFail();h(d.endTest());k.tearDown();e[l]=t===c.countFailedTests();r(b.slice(1))}))}}var a=Runtime.getFunctionName(l)||"",c=new core.UnitTestRunner(b.resourcePrefix,d),k=new l(c),e={},u,w,z,x,t;if(p.hasOwnProperty(a))runtime.log("Test "+
a+" has already run.");else{n?runtime.log("<span>Running "+m(a,'runSuite("'+a+'");')+": "+k.description()+"</span>"):runtime.log("Running "+a+": "+k.description);z=k.tests();for(u=0;u<z.length;u+=1)if(w=z[u].f,l=z[u].name,x=!0===z[u].expectFail,!f.length||-1!==f.indexOf(l)){t=c.countFailedTests();k.setUp();d.startTest(a,l);x&&c.beginExpectFail();try{w()}catch(v){c.testFailed("Unexpected exception encountered: "+v.toString()+"\n"+v.stack)}x&&c.endExpectFail();h(d.endTest());k.tearDown();e[l]=t===c.countFailedTests()}r(k.asyncTests())}};
this.countFailedTests=function(){return g};this.results=function(){return p}};
// Input 19
core.Utils=function(){function m(h,b){if(b&&Array.isArray(b)){h=h||[];if(!Array.isArray(h))throw"Destination is not an array.";h=h.concat(b.map(function(b){return m(null,b)}))}else if(b&&"object"===typeof b){h=h||{};if("object"!==typeof h)throw"Destination is not an object.";Object.keys(b).forEach(function(g){h[g]=m(h[g],b[g])})}else h=b;return h}this.hashString=function(h){var b=0,g,d;g=0;for(d=h.length;g<d;g+=1)b=(b<<5)-b+h.charCodeAt(g),b|=0;return b};this.mergeObjects=function(h,b){Object.keys(b).forEach(function(g){h[g]=
m(h[g],b[g])});return h}};
// Input 20
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
core.Zip=function(m,h){function b(a){var c=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,e,d=a.length,k=0,k=0;b=-1;for(e=0;e<d;e+=1)k=(b^a[e])&255,k=c[k],b=b>>>8^k;return b^-1}function g(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function d(a){var c=a.getFullYear();return 1980>c?0:c-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function p(a,c){var b,d,k,f,l,p,n,h=this;this.load=function(c){if(null!==h.data)c(null,h.data);else{var b=l+34+d+k+256;b+n>e&&(b=e-n);runtime.read(a,n,b,function(b,e){if(b||null===e)c(b,e);else a:{var d=e,k=new core.ByteArray(d),g=k.readUInt32LE(),n;if(67324752!==g)c("File entry signature is wrong."+g.toString()+" "+d.length.toString(),null);else{k.pos+=22;g=k.readUInt16LE();n=k.readUInt16LE();k.pos+=g+n;if(f){d=
d.subarray(k.pos,k.pos+l);if(l!==d.length){c("The amount of compressed bytes read was "+d.length.toString()+" instead of "+l.toString()+" for "+h.filename+" in "+a+".",null);break a}d=w(d,p)}else d=d.subarray(k.pos,k.pos+p);p!==d.length?c("The amount of bytes read was "+d.length.toString()+" instead of "+p.toString()+" for "+h.filename+" in "+a+".",null):(h.data=d,c(null,d))}}})}};this.set=function(a,c,b,e){h.filename=a;h.data=c;h.compressed=b;h.date=e};this.error=null;c&&(b=c.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+a+'": '+c.data.length.toString():(c.pos+=6,f=c.readUInt16LE(),this.date=g(c.readUInt32LE()),c.readUInt32LE(),l=c.readUInt32LE(),p=c.readUInt32LE(),d=c.readUInt16LE(),k=c.readUInt16LE(),b=c.readUInt16LE(),c.pos+=8,n=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.subarray(c.pos,c.pos+d),"utf8"),this.data=null,c.pos+=d+k+b))}function n(a,c){if(22!==a.length)c("Central directory length should be 22.",
z);else{var b=new core.ByteArray(a),d;d=b.readUInt32LE();101010256!==d?c("Central directory signature is wrong: "+d.toString(),z):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",z):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",z):(d=b.readUInt16LE(),u=b.readUInt16LE(),d!==u?c("Number of entries is inconsistent.",z):(d=b.readUInt32LE(),b=b.readUInt16LE(),b=e-22-d,runtime.read(m,b,e-b,function(a,b){if(a||null===b)c(a,z);else a:{var d=
new core.ByteArray(b),e,f;k=[];for(e=0;e<u;e+=1){f=new p(m,d);if(f.error){c(f.error,z);break a}k[k.length]=f}c(null,z)}})))))}}function l(a,c){var b=null,e,d;for(d=0;d<k.length;d+=1)if(e=k[d],e.filename===a){b=e;break}b?b.data?c(null,b.data):b.load(c):c(a+" not found.",null)}function q(a){var c=new core.ByteArrayWriter("utf8"),e=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(e=a.data.length);c.appendUInt32LE(d(a.date));c.appendUInt32LE(a.data?b(a.data):0);c.appendUInt32LE(e);c.appendUInt32LE(e);
c.appendUInt16LE(a.filename.length);c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function f(a,c){var e=new core.ByteArrayWriter("utf8"),k=0;e.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(k=a.data.length);e.appendUInt32LE(d(a.date));e.appendUInt32LE(a.data?b(a.data):0);e.appendUInt32LE(k);e.appendUInt32LE(k);e.appendUInt16LE(a.filename.length);e.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);e.appendUInt32LE(c);e.appendString(a.filename);return e}function r(a,
c){if(a===k.length)c(null);else{var b=k[a];null!==b.data?r(a+1,c):b.load(function(b){b?c(b):r(a+1,c)})}}function a(a,c){r(0,function(b){if(b)c(b);else{var e,d,g=new core.ByteArrayWriter("utf8"),l=[0];for(e=0;e<k.length;e+=1)g.appendByteArrayWriter(q(k[e])),l.push(g.getLength());b=g.getLength();for(e=0;e<k.length;e+=1)d=k[e],g.appendByteArrayWriter(f(d,l[e]));e=g.getLength()-b;g.appendArray([80,75,5,6,0,0,0,0]);g.appendUInt16LE(k.length);g.appendUInt16LE(k.length);g.appendUInt32LE(e);g.appendUInt32LE(b);
g.appendArray([0,0]);a(g.getByteArray())}})}function c(c,b){a(function(a){runtime.writeFile(c,a,b)},b)}var k,e,u,w=(new core.RawInflate).inflate,z=this,x=new core.Base64;this.load=l;this.save=function(a,c,b,e){var d,f;for(d=0;d<k.length;d+=1)if(f=k[d],f.filename===a){f.set(a,c,b,e);return}f=new p(m);f.set(a,c,b,e);k.push(f)};this.remove=function(a){var c,b;for(c=0;c<k.length;c+=1)if(b=k[c],b.filename===a)return k.splice(c,1),!0;return!1};this.write=function(a){c(m,a)};this.writeAs=c;this.createByteArray=
a;this.loadContentXmlAsFragments=function(a,c){z.loadAsString(a,function(a,b){if(a)return c.rootElementReady(a);c.rootElementReady(null,b,!0)})};this.loadAsString=function(a,c){l(a,function(a,b){if(a||null===b)return c(a,null);var e=runtime.byteArrayToString(b,"utf8");c(null,e)})};this.loadAsDOM=function(a,c){z.loadAsString(a,function(a,b){if(a||null===b)c(a,null);else{var e=(new DOMParser).parseFromString(b,"text/xml");c(null,e)}})};this.loadAsDataURL=function(a,c,b){l(a,function(a,e){if(a||!e)return b(a,
null);var d=0,k;c||(c=80===e[1]&&78===e[2]&&71===e[3]?"image/png":255===e[0]&&216===e[1]&&255===e[2]?"image/jpeg":71===e[0]&&73===e[1]&&70===e[2]?"image/gif":"");for(k="data:"+c+";base64,";d<e.length;)k+=x.convertUTF8ArrayToBase64(e.subarray(d,Math.min(d+45E3,e.length))),d+=45E3;b(null,k)})};this.getEntries=function(){return k.slice()};e=-1;null===h?k=[]:runtime.getFileSize(m,function(a){e=a;0>e?h("File '"+m+"' cannot be read.",z):runtime.read(m,e-22,22,function(a,c){a||null===h||null===c?h(a,z):
n(c,h)})})};
// Input 21
xmldom.LSSerializerFilter=function(){};xmldom.LSSerializerFilter.prototype.acceptNode=function(m){};
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
odf.OdfNodeFilter=function(){this.acceptNode=function(m){return"http://www.w3.org/1999/xhtml"===m.namespaceURI?NodeFilter.FILTER_SKIP:m.namespaceURI&&m.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
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
(function(){var m=odf.Namespaces.namespaceMap,h=odf.Namespaces.prefixMap,b;for(b in m)m.hasOwnProperty(b)&&(h[m[b]]=b)})();odf.Namespaces.forEachPrefix=function(m){var h=odf.Namespaces.namespaceMap,b;for(b in h)h.hasOwnProperty(b)&&m(b,h[b])};odf.Namespaces.lookupNamespaceURI=function(m){var h=null;odf.Namespaces.namespaceMap.hasOwnProperty(m)&&(h=odf.Namespaces.namespaceMap[m]);return h};odf.Namespaces.lookupPrefix=function(m){var h=odf.Namespaces.prefixMap;return h.hasOwnProperty(m)?h[m]:null};
odf.Namespaces.lookupNamespaceURI.lookupNamespaceURI=odf.Namespaces.lookupNamespaceURI;
// Input 24
xmldom.XPathIterator=function(){};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};
function createXPathSingleton(){function m(b,a,c){return-1!==b&&(b<a||-1===a)&&(b<c||-1===c)}function h(b){for(var a=[],c=0,d=b.length,e;c<d;){var g=b,l=d,p=a,n="",h=[],q=g.indexOf("[",c),s=g.indexOf("/",c),C=g.indexOf("=",c);m(s,q,C)?(n=g.substring(c,s),c=s+1):m(q,s,C)?(n=g.substring(c,q),c=f(g,q,h)):m(C,s,q)?(n=g.substring(c,C),c=C):(n=g.substring(c,l),c=l);p.push({location:n,predicates:h});if(c<d&&"="===b[c]){e=b.substring(c+1,d);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);
else try{e=parseInt(e,10)}catch(I){}c=d}}return{steps:a,value:e}}function b(){var b=null,a=!1;this.setNode=function(a){b=a};this.reset=function(){a=!1};this.next=function(){var c=a?null:b;a=!0;return c}}function g(b,a,c){this.reset=function(){b.reset()};this.next=function(){for(var d=b.next();d;){d.nodeType===Node.ELEMENT_NODE&&(d=d.getAttributeNodeNS(a,c));if(d)break;d=b.next()}return d}}function d(b,a){var c=b.next(),d=null;this.reset=function(){b.reset();c=b.next();d=null};this.next=function(){for(;c;){if(d)if(a&&
d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&d!==c;)d=d.parentNode;d===c?c=b.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=b.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function p(b,a){this.reset=function(){b.reset()};this.next=function(){for(var c=b.next();c&&!a(c);)c=b.next();return c}}function n(b,a,c){a=a.split(":",2);var d=c(a[0]),e=a[1];return new p(b,function(a){return a.localName===e&&a.namespaceURI===d})}function l(d,a,c){var k=new b,e=q(k,
a,c),f=a.value;return void 0===f?new p(d,function(a){k.setNode(a);e.reset();return null!==e.next()}):new p(d,function(a){k.setNode(a);e.reset();return(a=e.next())?a.nodeValue===f:!1})}var q,f;f=function(b,a,c){for(var d=a,e=b.length,f=0;d<e;)"]"===b[d]?(f-=1,0>=f&&c.push(h(b.substring(a,d)))):"["===b[d]&&(0>=f&&(a=d+1),f+=1),d+=1;return d};q=function(b,a,c){var f,e,p,h;for(f=0;f<a.steps.length;f+=1){p=a.steps[f];e=p.location;if(""===e)b=new d(b,!1);else if("@"===e[0]){e=e.substr(1).split(":",2);h=
c(e[0]);if(!h)throw"No namespace associated with the prefix "+e[0];b=new g(b,h,e[1])}else"."!==e&&(b=new d(b,!1),-1!==e.indexOf(":")&&(b=n(b,e,c)));for(e=0;e<p.predicates.length;e+=1)h=p.predicates[e],b=l(b,h,c)}return b};return{getODFElementsWithXPath:function(d,a,c){var f=d.ownerDocument,e=[],g=null;if(f&&"function"===typeof f.evaluate)for(c=f.evaluate(a,d,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),g=c.iterateNext();null!==g;)g.nodeType===Node.ELEMENT_NODE&&e.push(g),g=c.iterateNext();else{e=
new b;e.setNode(d);d=h(a);e=q(e,d,c);d=[];for(c=e.next();c;)d.push(c),c=e.next();e=d}return e}}}xmldom.XPath=createXPathSingleton();
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
odf.StyleInfo=function(){function m(a,c){var b,d,e,f,k,g=0;if(b=H[a.localName])if(e=b[a.namespaceURI])g=e.length;for(b=0;b<g;b+=1)d=e[b],f=d.ns,k=d.localname,(d=a.getAttributeNS(f,k))&&a.setAttributeNS(f,C[f]+k,c+d);for(e=a.firstElementChild;e;)m(e,c),e=e.nextElementSibling}function h(a,c){var b,d,e,f,k,g=0;if(b=H[a.localName])if(e=b[a.namespaceURI])g=e.length;for(b=0;b<g;b+=1)if(d=e[b],f=d.ns,k=d.localname,d=a.getAttributeNS(f,k))d=d.replace(c,""),a.setAttributeNS(f,C[f]+k,d);for(e=a.firstElementChild;e;)h(e,
c),e=e.nextElementSibling}function b(a,c){var b,d,e,f,k,g=0;if(b=H[a.localName])if(e=b[a.namespaceURI])g=e.length;for(b=0;b<g;b+=1)if(f=e[b],d=f.ns,k=f.localname,d=a.getAttributeNS(d,k))c=c||{},f=f.keyname,c.hasOwnProperty(f)?c[f][d]=1:(k={},k[d]=1,c[f]=k);return c}function g(a,c){var d,e;b(a,c);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(e=d,g(e,c)),d=d.nextSibling}function d(a,c,b){this.key=a;this.name=c;this.family=b;this.requires={}}function p(a,c,b){var e=a+'"'+c,f=b[e];f||(f=b[e]=
new d(e,a,c));return f}function n(a,c,b){var d,e,f,k,g,l=0;d=a.getAttributeNS(t,"name");k=a.getAttributeNS(t,"family");d&&k&&(c=p(d,k,b));if(c){if(d=H[a.localName])if(f=d[a.namespaceURI])l=f.length;for(d=0;d<l;d+=1)if(k=f[d],e=k.ns,g=k.localname,e=a.getAttributeNS(e,g))k=k.keyname,k=p(e,k,b),c.requires[k.key]=k}for(a=a.firstElementChild;a;)n(a,c,b),a=a.nextElementSibling;return b}function l(a,c){var b=c[a.family];b||(b=c[a.family]={});b[a.name]=1;Object.keys(a.requires).forEach(function(b){l(a.requires[b],
c)})}function q(a,c){var b=n(a,null,{});Object.keys(b).forEach(function(a){a=b[a];var d=c[a.family];d&&d.hasOwnProperty(a.name)&&l(a,c)})}function f(a,c){function b(c){(c=k.getAttributeNS(t,c))&&(a[c]=!0)}var d=["font-name","font-name-asian","font-name-complex"],e,k;for(e=c&&c.firstElementChild;e;)k=e,d.forEach(b),f(a,k),e=e.nextElementSibling}function r(a,c){function b(a){var d=f.getAttributeNS(t,a);d&&c.hasOwnProperty(d)&&f.setAttributeNS(t,"style:"+a,c[d])}var d=["font-name","font-name-asian",
"font-name-complex"],e,f;for(e=a&&a.firstElementChild;e;)f=e,d.forEach(b),r(f,c),e=e.nextElementSibling}var a=odf.Namespaces.chartns,c=odf.Namespaces.dbns,k=odf.Namespaces.dr3dns,e=odf.Namespaces.drawns,u=odf.Namespaces.formns,w=odf.Namespaces.numberns,z=odf.Namespaces.officens,x=odf.Namespaces.presentationns,t=odf.Namespaces.stylens,v=odf.Namespaces.tablens,s=odf.Namespaces.textns,C={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},I={text:[{ens:t,en:"tab-stop",ans:t,a:"leader-text-style"},{ens:t,en:"drop-cap",ans:t,a:"style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-body-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-style-name"},{ens:s,en:"a",ans:s,a:"style-name"},{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"linenumbering-configuration",
ans:s,a:"style-name"},{ens:s,en:"list-level-style-number",ans:s,a:"style-name"},{ens:s,en:"ruby-text",ans:s,a:"style-name"},{ens:s,en:"span",ans:s,a:"style-name"},{ens:s,en:"a",ans:s,a:"visited-style-name"},{ens:t,en:"text-properties",ans:t,a:"text-line-through-text-style"},{ens:s,en:"alphabetical-index-source",ans:s,a:"main-entry-style-name"},{ens:s,en:"index-entry-bibliography",ans:s,a:"style-name"},{ens:s,en:"index-entry-chapter",ans:s,a:"style-name"},{ens:s,en:"index-entry-link-end",ans:s,a:"style-name"},
{ens:s,en:"index-entry-link-start",ans:s,a:"style-name"},{ens:s,en:"index-entry-page-number",ans:s,a:"style-name"},{ens:s,en:"index-entry-span",ans:s,a:"style-name"},{ens:s,en:"index-entry-tab-stop",ans:s,a:"style-name"},{ens:s,en:"index-entry-text",ans:s,a:"style-name"},{ens:s,en:"index-title-template",ans:s,a:"style-name"},{ens:s,en:"list-level-style-bullet",ans:s,a:"style-name"},{ens:s,en:"outline-level-style",ans:s,a:"style-name"}],paragraph:[{ens:e,en:"caption",ans:e,a:"text-style-name"},{ens:e,
en:"circle",ans:e,a:"text-style-name"},{ens:e,en:"connector",ans:e,a:"text-style-name"},{ens:e,en:"control",ans:e,a:"text-style-name"},{ens:e,en:"custom-shape",ans:e,a:"text-style-name"},{ens:e,en:"ellipse",ans:e,a:"text-style-name"},{ens:e,en:"frame",ans:e,a:"text-style-name"},{ens:e,en:"line",ans:e,a:"text-style-name"},{ens:e,en:"measure",ans:e,a:"text-style-name"},{ens:e,en:"path",ans:e,a:"text-style-name"},{ens:e,en:"polygon",ans:e,a:"text-style-name"},{ens:e,en:"polyline",ans:e,a:"text-style-name"},
{ens:e,en:"rect",ans:e,a:"text-style-name"},{ens:e,en:"regular-polygon",ans:e,a:"text-style-name"},{ens:z,en:"annotation",ans:e,a:"text-style-name"},{ens:u,en:"column",ans:u,a:"text-style-name"},{ens:t,en:"style",ans:t,a:"next-style-name"},{ens:v,en:"body",ans:v,a:"paragraph-style-name"},{ens:v,en:"even-columns",ans:v,a:"paragraph-style-name"},{ens:v,en:"even-rows",ans:v,a:"paragraph-style-name"},{ens:v,en:"first-column",ans:v,a:"paragraph-style-name"},{ens:v,en:"first-row",ans:v,a:"paragraph-style-name"},
{ens:v,en:"last-column",ans:v,a:"paragraph-style-name"},{ens:v,en:"last-row",ans:v,a:"paragraph-style-name"},{ens:v,en:"odd-columns",ans:v,a:"paragraph-style-name"},{ens:v,en:"odd-rows",ans:v,a:"paragraph-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"default-style-name"},{ens:s,en:"alphabetical-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"bibliography-entry-template",ans:s,a:"style-name"},{ens:s,en:"h",ans:s,a:"style-name"},{ens:s,en:"illustration-index-entry-template",ans:s,a:"style-name"},
{ens:s,en:"index-source-style",ans:s,a:"style-name"},{ens:s,en:"object-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"p",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-of-content-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"user-index-entry-template",ans:s,a:"style-name"},{ens:t,en:"page-layout-properties",ans:t,a:"register-truth-ref-style-name"}],chart:[{ens:a,en:"axis",ans:a,
a:"style-name"},{ens:a,en:"chart",ans:a,a:"style-name"},{ens:a,en:"data-label",ans:a,a:"style-name"},{ens:a,en:"data-point",ans:a,a:"style-name"},{ens:a,en:"equation",ans:a,a:"style-name"},{ens:a,en:"error-indicator",ans:a,a:"style-name"},{ens:a,en:"floor",ans:a,a:"style-name"},{ens:a,en:"footer",ans:a,a:"style-name"},{ens:a,en:"grid",ans:a,a:"style-name"},{ens:a,en:"legend",ans:a,a:"style-name"},{ens:a,en:"mean-value",ans:a,a:"style-name"},{ens:a,en:"plot-area",ans:a,a:"style-name"},{ens:a,en:"regression-curve",
ans:a,a:"style-name"},{ens:a,en:"series",ans:a,a:"style-name"},{ens:a,en:"stock-gain-marker",ans:a,a:"style-name"},{ens:a,en:"stock-loss-marker",ans:a,a:"style-name"},{ens:a,en:"stock-range-line",ans:a,a:"style-name"},{ens:a,en:"subtitle",ans:a,a:"style-name"},{ens:a,en:"title",ans:a,a:"style-name"},{ens:a,en:"wall",ans:a,a:"style-name"}],section:[{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"bibliography",ans:s,a:"style-name"},{ens:s,en:"illustration-index",ans:s,a:"style-name"},
{ens:s,en:"index-title",ans:s,a:"style-name"},{ens:s,en:"object-index",ans:s,a:"style-name"},{ens:s,en:"section",ans:s,a:"style-name"},{ens:s,en:"table-of-content",ans:s,a:"style-name"},{ens:s,en:"table-index",ans:s,a:"style-name"},{ens:s,en:"user-index",ans:s,a:"style-name"}],ruby:[{ens:s,en:"ruby",ans:s,a:"style-name"}],table:[{ens:c,en:"query",ans:c,a:"style-name"},{ens:c,en:"table-representation",ans:c,a:"style-name"},{ens:v,en:"background",ans:v,a:"style-name"},{ens:v,en:"table",ans:v,a:"style-name"}],
"table-column":[{ens:c,en:"column",ans:c,a:"style-name"},{ens:v,en:"table-column",ans:v,a:"style-name"}],"table-row":[{ens:c,en:"query",ans:c,a:"default-row-style-name"},{ens:c,en:"table-representation",ans:c,a:"default-row-style-name"},{ens:v,en:"table-row",ans:v,a:"style-name"}],"table-cell":[{ens:c,en:"column",ans:c,a:"default-cell-style-name"},{ens:v,en:"table-column",ans:v,a:"default-cell-style-name"},{ens:v,en:"table-row",ans:v,a:"default-cell-style-name"},{ens:v,en:"body",ans:v,a:"style-name"},
{ens:v,en:"covered-table-cell",ans:v,a:"style-name"},{ens:v,en:"even-columns",ans:v,a:"style-name"},{ens:v,en:"covered-table-cell",ans:v,a:"style-name"},{ens:v,en:"even-columns",ans:v,a:"style-name"},{ens:v,en:"even-rows",ans:v,a:"style-name"},{ens:v,en:"first-column",ans:v,a:"style-name"},{ens:v,en:"first-row",ans:v,a:"style-name"},{ens:v,en:"last-column",ans:v,a:"style-name"},{ens:v,en:"last-row",ans:v,a:"style-name"},{ens:v,en:"odd-columns",ans:v,a:"style-name"},{ens:v,en:"odd-rows",ans:v,a:"style-name"},
{ens:v,en:"table-cell",ans:v,a:"style-name"}],graphic:[{ens:k,en:"cube",ans:e,a:"style-name"},{ens:k,en:"extrude",ans:e,a:"style-name"},{ens:k,en:"rotate",ans:e,a:"style-name"},{ens:k,en:"scene",ans:e,a:"style-name"},{ens:k,en:"sphere",ans:e,a:"style-name"},{ens:e,en:"caption",ans:e,a:"style-name"},{ens:e,en:"circle",ans:e,a:"style-name"},{ens:e,en:"connector",ans:e,a:"style-name"},{ens:e,en:"control",ans:e,a:"style-name"},{ens:e,en:"custom-shape",ans:e,a:"style-name"},{ens:e,en:"ellipse",ans:e,a:"style-name"},
{ens:e,en:"frame",ans:e,a:"style-name"},{ens:e,en:"g",ans:e,a:"style-name"},{ens:e,en:"line",ans:e,a:"style-name"},{ens:e,en:"measure",ans:e,a:"style-name"},{ens:e,en:"page-thumbnail",ans:e,a:"style-name"},{ens:e,en:"path",ans:e,a:"style-name"},{ens:e,en:"polygon",ans:e,a:"style-name"},{ens:e,en:"polyline",ans:e,a:"style-name"},{ens:e,en:"rect",ans:e,a:"style-name"},{ens:e,en:"regular-polygon",ans:e,a:"style-name"},{ens:z,en:"annotation",ans:e,a:"style-name"}],presentation:[{ens:k,en:"cube",ans:x,
a:"style-name"},{ens:k,en:"extrude",ans:x,a:"style-name"},{ens:k,en:"rotate",ans:x,a:"style-name"},{ens:k,en:"scene",ans:x,a:"style-name"},{ens:k,en:"sphere",ans:x,a:"style-name"},{ens:e,en:"caption",ans:x,a:"style-name"},{ens:e,en:"circle",ans:x,a:"style-name"},{ens:e,en:"connector",ans:x,a:"style-name"},{ens:e,en:"control",ans:x,a:"style-name"},{ens:e,en:"custom-shape",ans:x,a:"style-name"},{ens:e,en:"ellipse",ans:x,a:"style-name"},{ens:e,en:"frame",ans:x,a:"style-name"},{ens:e,en:"g",ans:x,a:"style-name"},
{ens:e,en:"line",ans:x,a:"style-name"},{ens:e,en:"measure",ans:x,a:"style-name"},{ens:e,en:"page-thumbnail",ans:x,a:"style-name"},{ens:e,en:"path",ans:x,a:"style-name"},{ens:e,en:"polygon",ans:x,a:"style-name"},{ens:e,en:"polyline",ans:x,a:"style-name"},{ens:e,en:"rect",ans:x,a:"style-name"},{ens:e,en:"regular-polygon",ans:x,a:"style-name"},{ens:z,en:"annotation",ans:x,a:"style-name"}],"drawing-page":[{ens:e,en:"page",ans:e,a:"style-name"},{ens:x,en:"notes",ans:e,a:"style-name"},{ens:t,en:"handout-master",
ans:e,a:"style-name"},{ens:t,en:"master-page",ans:e,a:"style-name"}],"list-style":[{ens:s,en:"list",ans:s,a:"style-name"},{ens:s,en:"numbered-paragraph",ans:s,a:"style-name"},{ens:s,en:"list-item",ans:s,a:"style-override"},{ens:t,en:"style",ans:t,a:"list-style-name"}],data:[{ens:t,en:"style",ans:t,a:"data-style-name"},{ens:t,en:"style",ans:t,a:"percentage-data-style-name"},{ens:x,en:"date-time-decl",ans:t,a:"data-style-name"},{ens:s,en:"creation-date",ans:t,a:"data-style-name"},{ens:s,en:"creation-time",
ans:t,a:"data-style-name"},{ens:s,en:"database-display",ans:t,a:"data-style-name"},{ens:s,en:"date",ans:t,a:"data-style-name"},{ens:s,en:"editing-duration",ans:t,a:"data-style-name"},{ens:s,en:"expression",ans:t,a:"data-style-name"},{ens:s,en:"meta-field",ans:t,a:"data-style-name"},{ens:s,en:"modification-date",ans:t,a:"data-style-name"},{ens:s,en:"modification-time",ans:t,a:"data-style-name"},{ens:s,en:"print-date",ans:t,a:"data-style-name"},{ens:s,en:"print-time",ans:t,a:"data-style-name"},{ens:s,
en:"table-formula",ans:t,a:"data-style-name"},{ens:s,en:"time",ans:t,a:"data-style-name"},{ens:s,en:"user-defined",ans:t,a:"data-style-name"},{ens:s,en:"user-field-get",ans:t,a:"data-style-name"},{ens:s,en:"user-field-input",ans:t,a:"data-style-name"},{ens:s,en:"variable-get",ans:t,a:"data-style-name"},{ens:s,en:"variable-input",ans:t,a:"data-style-name"},{ens:s,en:"variable-set",ans:t,a:"data-style-name"}],"page-layout":[{ens:x,en:"notes",ans:t,a:"page-layout-name"},{ens:t,en:"handout-master",ans:t,
a:"page-layout-name"},{ens:t,en:"master-page",ans:t,a:"page-layout-name"}]},H,D=xmldom.XPath;this.collectUsedFontFaces=f;this.changeFontFaceNames=r;this.UsedStyleList=function(a,c){var b={};this.uses=function(a){var c=a.localName,d=a.getAttributeNS(e,"name")||a.getAttributeNS(t,"name");a="style"===c?a.getAttributeNS(t,"family"):a.namespaceURI===w?"data":c;return(a=b[a])?0<a[d]:!1};g(a,b);c&&q(c,b)};this.hasDerivedStyles=function(a,c,b){var d=b.getAttributeNS(t,"name");b=b.getAttributeNS(t,"family");
return D.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+d+"'][@style:family='"+b+"']",c).length?!0:!1};this.prefixStyleNames=function(a,c,b){var d;if(a){for(d=a.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE){var f=d,k=c,g=f.getAttributeNS(e,"name"),l=void 0;g?l=e:(g=f.getAttributeNS(t,"name"))&&(l=t);l&&f.setAttributeNS(l,C[l]+"name",k+g)}d=d.nextSibling}m(a,c);b&&m(b,c)}};this.removePrefixFromStyleNames=function(a,c,b){var d=RegExp("^"+c);if(a){for(c=a.firstChild;c;){if(c.nodeType===
Node.ELEMENT_NODE){var f=c,k=d,g=f.getAttributeNS(e,"name"),l=void 0;g?l=e:(g=f.getAttributeNS(t,"name"))&&(l=t);l&&(g=g.replace(k,""),f.setAttributeNS(l,C[l]+"name",g))}c=c.nextSibling}h(a,d);b&&h(b,d)}};this.determineStylesForNode=b;H=function(){var a,c,b,d,e,f={},k,g,l,p;for(b in I)if(I.hasOwnProperty(b))for(d=I[b],c=d.length,a=0;a<c;a+=1)e=d[a],l=e.en,p=e.ens,f.hasOwnProperty(l)?k=f[l]:f[l]=k={},k.hasOwnProperty(p)?g=k[p]:k[p]=g=[],g.push({ns:e.ans,localname:e.a,keyname:b});return f}()};
// Input 26
"function"!==typeof Object.create&&(Object.create=function(m){var h=function(){};h.prototype=m;return new h});
xmldom.LSSerializer=function(){function m(b){var g=b||{},n=function(b){var a={},c;for(c in b)b.hasOwnProperty(c)&&(a[b[c]]=c);return a}(b),l=[g],h=[n],f=0;this.push=function(){f+=1;g=l[f]=Object.create(g);n=h[f]=Object.create(n)};this.pop=function(){l.pop();h.pop();f-=1;g=l[f];n=h[f]};this.getLocalNamespaceDefinitions=function(){return n};this.getQName=function(b){var a=b.namespaceURI,c=0,d;if(!a)return b.localName;if(d=n[a])return d+":"+b.localName;do{d||!b.prefix?(d="ns"+c,c+=1):d=b.prefix;if(g[d]===
a)break;if(!g[d]){g[d]=a;n[a]=d;break}d=null}while(null===d);return d+":"+b.localName}}function h(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function b(d,p){var n="",l=g.filter?g.filter.acceptNode(p):NodeFilter.FILTER_ACCEPT,m;if(l===NodeFilter.FILTER_ACCEPT&&p.nodeType===Node.ELEMENT_NODE){d.push();m=d.getQName(p);var f,r=p.attributes,a,c,k,e="",u;f="<"+m;a=r.length;for(c=0;c<a;c+=1)k=r.item(c),"http://www.w3.org/2000/xmlns/"!==
k.namespaceURI&&(u=g.filter?g.filter.acceptNode(k):NodeFilter.FILTER_ACCEPT,u===NodeFilter.FILTER_ACCEPT&&(u=d.getQName(k),k="string"===typeof k.value?h(k.value):k.value,e+=" "+(u+'="'+k+'"')));a=d.getLocalNamespaceDefinitions();for(c in a)a.hasOwnProperty(c)&&((r=a[c])?"xmlns"!==r&&(f+=" xmlns:"+a[c]+'="'+c+'"'):f+=' xmlns="'+c+'"');n+=f+(e+">")}if(l===NodeFilter.FILTER_ACCEPT||l===NodeFilter.FILTER_SKIP){for(l=p.firstChild;l;)n+=b(d,l),l=l.nextSibling;p.nodeValue&&(n+=h(p.nodeValue))}m&&(n+="</"+
m+">",d.pop());return n}var g=this;this.filter=null;this.writeToString=function(d,g){if(!d)return"";var n=new m(g);return b(n,d)}};
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
(function(){function m(b){var a,c=l.length;for(a=0;a<c;a+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI&&b.localName===l[a])return a;return-1}function h(b,a){var c=new d.UsedStyleList(b,a),f=new odf.OdfNodeFilter;this.acceptNode=function(b){var d=f.acceptNode(b);d===NodeFilter.FILTER_ACCEPT&&b.parentNode===a&&b.nodeType===Node.ELEMENT_NODE&&(d=c.uses(b)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return d}}function b(b,a){var c=new h(b,a);this.acceptNode=function(a){var b=
c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName||(b=NodeFilter.FILTER_REJECT);return b}}function g(b,a){if(a){var c=m(a),d,e=b.firstChild;if(-1!==c){for(;e;){d=m(e);if(-1!==d&&d>c)break;e=e.nextSibling}b.insertBefore(a,e)}}}var d=new odf.StyleInfo,p=new core.DomUtils,n=odf.Namespaces.stylens,l="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),
q=(new Date).getTime()+"_webodf_",f=new core.Base64;odf.ODFElement=function(){};odf.ODFDocumentElement=function(){};odf.ODFDocumentElement.prototype=new odf.ODFElement;odf.ODFDocumentElement.prototype.constructor=odf.ODFDocumentElement;odf.ODFDocumentElement.prototype.fontFaceDecls=null;odf.ODFDocumentElement.prototype.manifest=null;odf.ODFDocumentElement.prototype.settings=null;odf.ODFDocumentElement.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";odf.ODFDocumentElement.localName=
"document";odf.AnnotationElement=function(){};odf.OdfPart=function(b,a,c,d){var e=this;this.size=0;this.type=null;this.name=b;this.container=c;this.url=null;this.mimetype=a;this.onstatereadychange=this.document=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.data="";this.load=function(){null!==d&&(this.mimetype=a,d.loadAsDataURL(b,a,function(a,c){a&&runtime.log(a);e.url=c;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}};odf.OdfPart.prototype.load=
function(){};odf.OdfPart.prototype.getUrl=function(){return this.data?"data:;base64,"+f.toBase64(this.data):null};odf.OdfContainer=function a(c,k){function e(a){for(var c=a.firstChild,b;c;)b=c.nextSibling,c.nodeType===Node.ELEMENT_NODE?e(c):c.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(c),c=b}function l(a){var c={},b,d,e=a.ownerDocument.createNodeIterator(a,NodeFilter.SHOW_ELEMENT,null,!1);for(a=e.nextNode();a;)"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&("annotation"===
a.localName?(b=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","name"))&&(c.hasOwnProperty(b)?runtime.log("Warning: annotation name used more than once with <office:annotation/>: '"+b+"'"):c[b]=a):"annotation-end"===a.localName&&((b=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","name"))?c.hasOwnProperty(b)?(d=c[b],d.annotationEndElement?runtime.log("Warning: annotation name used more than once with <office:annotation-end/>: '"+b+"'"):d.annotationEndElement=
a):runtime.log("Warning: annotation end without an annotation start, name: '"+b+"'"):runtime.log("Warning: annotation end without a name found"))),a=e.nextNode()}function m(a,c){for(var b=a&&a.firstChild;b;)b.nodeType===Node.ELEMENT_NODE&&b.setAttributeNS("urn:webodf:names:scope","scope",c),b=b.nextSibling}function z(a){var c={},b;for(a=a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&a.namespaceURI===n&&"font-face"===a.localName&&(b=a.getAttributeNS(n,"name"),c[b]=a),a=a.nextSibling;return c}function x(a,
c){var b=null,d,e,f;if(a)for(b=a.cloneNode(!0),d=b.firstElementChild;d;)e=d.nextElementSibling,(f=d.getAttributeNS("urn:webodf:names:scope","scope"))&&f!==c&&b.removeChild(d),d=e;return b}function t(a,c){var b,e,f,k=null,g={};if(a)for(c.forEach(function(a){d.collectUsedFontFaces(g,a)}),k=a.cloneNode(!0),b=k.firstElementChild;b;)e=b.nextElementSibling,f=b.getAttributeNS(n,"name"),g[f]||k.removeChild(b),b=e;return k}function v(a){var c=N.rootElement.ownerDocument,b;if(a){e(a.documentElement);try{b=
c.importNode(a.documentElement,!0)}catch(d){}}return b}function s(a){N.state=a;if(N.onchange)N.onchange(N);if(N.onstatereadychange)N.onstatereadychange(N)}function C(a){U=null;N.rootElement=a;a.fontFaceDecls=p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");a.styles=p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");a.automaticStyles=p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");a.masterStyles=
p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");a.body=p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");a.meta=p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta");l(a)}function I(c){var b=v(c),e=N.rootElement,f;b&&"document-styles"===b.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI?(e.fontFaceDecls=p.getDirectChild(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),
g(e,e.fontFaceDecls),f=p.getDirectChild(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),e.styles=f||c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),g(e,e.styles),f=p.getDirectChild(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),e.automaticStyles=f||c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),m(e.automaticStyles,"document-styles"),g(e,e.automaticStyles),b=p.getDirectChild(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"master-styles"),e.masterStyles=b||c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),g(e,e.masterStyles),d.prefixStyleNames(e.automaticStyles,q,e.masterStyles)):s(a.INVALID)}function H(c){c=v(c);var b,e,f,k;if(c&&"document-content"===c.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===c.namespaceURI){b=N.rootElement;f=p.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");if(b.fontFaceDecls&&f){k=b.fontFaceDecls;var l,
h,C,q,F={};e=z(k);q=z(f);for(f=f.firstElementChild;f;){l=f.nextElementSibling;if(f.namespaceURI===n&&"font-face"===f.localName)if(h=f.getAttributeNS(n,"name"),e.hasOwnProperty(h)){if(!f.isEqualNode(e[h])){C=h;for(var u=e,I=q,G=0,H=void 0,H=C=C.replace(/\d+$/,"");u.hasOwnProperty(H)||I.hasOwnProperty(H);)G+=1,H=C+G;C=H;f.setAttributeNS(n,"style:name",C);k.appendChild(f);e[C]=f;delete q[h];F[h]=C}}else k.appendChild(f),e[h]=f,delete q[h];f=l}k=F}else f&&(b.fontFaceDecls=f,g(b,f));e=p.getDirectChild(c,
"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");m(e,"document-content");k&&d.changeFontFaceNames(e,k);if(b.automaticStyles&&e)for(k=e.firstChild;k;)b.automaticStyles.appendChild(k),k=e.firstChild;else e&&(b.automaticStyles=e,g(b,e));c=p.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");if(null===c)throw"<office:body/> tag is mising.";b.body=c;g(b,b.body)}else s(a.INVALID)}function D(a){a=v(a);var c;a&&"document-meta"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===
a.namespaceURI&&(c=N.rootElement,c.meta=p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),g(c,c.meta))}function F(a){a=v(a);var c;a&&"document-settings"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(c=N.rootElement,c.settings=p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),g(c,c.settings))}function O(a){a=v(a);var c;if(a&&"manifest"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===
a.namespaceURI)for(c=N.rootElement,c.manifest=a,a=c.manifest.firstElementChild;a;)"file-entry"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI&&(E[a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),a=a.nextElementSibling}function K(c){var b=c.shift();b?T.loadAsDOM(b.path,function(d,e){b.handler(e);d||N.state===a.INVALID||K(c)}):(l(N.rootElement),
s(a.DONE))}function Z(a){var c="";odf.Namespaces.forEachPrefix(function(a,b){c+=" xmlns:"+a+'="'+b+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+c+' office:version="1.2">'}function Q(){var a=new xmldom.LSSerializer,c=Z("document-meta");a.filter=new odf.OdfNodeFilter;c+=a.writeToString(N.rootElement.meta,odf.Namespaces.namespaceMap);return c+"</office:document-meta>"}function X(a,c){var b=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");
b.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:full-path",a);b.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:media-type",c);return b}function G(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'),c=a.documentElement,b=new xmldom.LSSerializer,d;for(d in E)E.hasOwnProperty(d)&&c.appendChild(X(d,E[d]));b.filter=new odf.OdfNodeFilter;
return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+b.writeToString(a,odf.Namespaces.namespaceMap)}function S(){var a=new xmldom.LSSerializer,c=Z("document-settings");a.filter=new odf.OdfNodeFilter;N.rootElement.settings.firstElementChild&&(c+=a.writeToString(N.rootElement.settings,odf.Namespaces.namespaceMap));return c+"</office:document-settings>"}function y(){var a,c,b,e=odf.Namespaces.namespaceMap,f=new xmldom.LSSerializer,k=Z("document-styles");c=x(N.rootElement.automaticStyles,
"document-styles");b=N.rootElement.masterStyles.cloneNode(!0);a=t(N.rootElement.fontFaceDecls,[b,N.rootElement.styles,c]);d.removePrefixFromStyleNames(c,q,b);f.filter=new h(b,c);k+=f.writeToString(a,e);k+=f.writeToString(N.rootElement.styles,e);k+=f.writeToString(c,e);k+=f.writeToString(b,e);return k+"</office:document-styles>"}function aa(){var a,c,d=odf.Namespaces.namespaceMap,e=new xmldom.LSSerializer,f=Z("document-content");c=x(N.rootElement.automaticStyles,"document-content");a=t(N.rootElement.fontFaceDecls,
[c]);e.filter=new b(N.rootElement.body,c);f+=e.writeToString(a,d);f+=e.writeToString(c,d);f+=e.writeToString(N.rootElement.body,d);return f+"</office:document-content>"}function M(c,b){runtime.loadXML(c,function(c,d){if(c)b(c);else{var e=v(d);e&&"document"===e.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===e.namespaceURI?(C(e),s(a.DONE)):s(a.INVALID)}})}function R(a,c){var b;b=N.rootElement;var d=b.meta;d||(b.meta=d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta"),g(b,d));b=d;a&&p.mapKeyValObjOntoNode(b,a,odf.Namespaces.lookupNamespaceURI);c&&p.removeKeyElementsFromNode(b,c,odf.Namespaces.lookupNamespaceURI)}function J(){function c(a,b){var d;b||(b=a);d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",b);e[a]=d;e.appendChild(d)}var b=new core.Zip("",null),d=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),e=N.rootElement,f=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"text");b.save("mimetype",d,!1,new Date);c("meta");c("settings");c("scripts");c("fontFaceDecls","font-face-decls");c("styles");c("automaticStyles","automatic-styles");c("masterStyles","master-styles");c("body");e.body.appendChild(f);E["/"]="application/vnd.oasis.opendocument.text";E["settings.xml"]="text/xml";E["meta.xml"]="text/xml";E["styles.xml"]="text/xml";E["content.xml"]="text/xml";s(a.DONE);return b}function ba(){var a,c=new Date,b=runtime.getWindow();a="WebODF/"+("undefined"!==String(typeof webodf_version)?
webodf_version:"FromSource");b&&(a=a+" "+b.navigator.userAgent);R({"meta:generator":a},null);a=runtime.byteArrayFromString(S(),"utf8");T.save("settings.xml",a,!0,c);a=runtime.byteArrayFromString(Q(),"utf8");T.save("meta.xml",a,!0,c);a=runtime.byteArrayFromString(y(),"utf8");T.save("styles.xml",a,!0,c);a=runtime.byteArrayFromString(aa(),"utf8");T.save("content.xml",a,!0,c);a=runtime.byteArrayFromString(G(),"utf8");T.save("META-INF/manifest.xml",a,!0,c)}function ia(a,c){ba();T.writeAs(a,function(a){c(a)})}
var N=this,T,E={},U;this.onstatereadychange=k;this.state=this.onchange=null;this.setRootElement=C;this.getContentElement=function(){var a;U||(a=N.rootElement.body,U=p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","text")||p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","presentation")||p.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet"));if(!U)throw"Could not find content element in <office:body/>.";return U};this.getDocumentType=
function(){var a=N.getContentElement();return a&&a.localName};this.getPart=function(a){return new odf.OdfPart(a,E[a],N,T)};this.getPartData=function(a,c){T.load(a,c)};this.setMetadata=R;this.incrementEditingCycles=function(){var a;for(a=(a=N.rootElement.meta)&&a.firstChild;a&&(a.namespaceURI!==odf.Namespaces.metans||"editing-cycles"!==a.localName);)a=a.nextSibling;for(a=a&&a.firstChild;a&&a.nodeType!==Node.TEXT_NODE;)a=a.nextSibling;a=a?a.data:null;a=a?parseInt(a,10):0;isNaN(a)&&(a=0);R({"meta:editing-cycles":a+
1},null)};this.createByteArray=function(a,c){ba();T.createByteArray(a,c)};this.saveAs=ia;this.save=function(a){ia(c,a)};this.getUrl=function(){return c};this.setBlob=function(a,c,b){b=f.convertBase64ToByteArray(b);T.save(a,b,!1,new Date);E.hasOwnProperty(a)&&runtime.log(a+" has been overwritten.");E[a]=c};this.removeBlob=function(a){var c=T.remove(a);runtime.assert(c,"file is not found: "+a);delete E[a]};this.state=a.LOADING;this.rootElement=function(a){var c=document.createElementNS(a.namespaceURI,
a.localName),b;a=new a.Type;for(b in a)a.hasOwnProperty(b)&&(c[b]=a[b]);return c}({Type:odf.ODFDocumentElement,namespaceURI:odf.ODFDocumentElement.namespaceURI,localName:odf.ODFDocumentElement.localName});T=c?new core.Zip(c,function(b,d){T=d;b?M(c,function(c){b&&(T.error=b+"\n"+c,s(a.INVALID))}):K([{path:"styles.xml",handler:I},{path:"content.xml",handler:H},{path:"meta.xml",handler:D},{path:"settings.xml",handler:F},{path:"META-INF/manifest.xml",handler:O}])}):J()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=
1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,null)};return odf.OdfContainer})();
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
odf.OdfUtils=function(){function m(a){return"image"===(a&&a.localName)&&a.namespaceURI===K}function h(a){return null!==a&&a.nodeType===Node.ELEMENT_NODE&&"frame"===a.localName&&a.namespaceURI===K&&"as-char"===a.getAttributeNS(O,"anchor-type")}function b(a){var c;(c="annotation"===(a&&a.localName)&&a.namespaceURI===odf.Namespaces.officens)||(c="div"===(a&&a.localName)&&"annotationWrapper"===a.className);return c}function g(a){return"a"===(a&&a.localName)&&a.namespaceURI===O}function d(a){var c=a&&
a.localName;return("p"===c||"h"===c)&&a.namespaceURI===O}function p(a){for(;a&&!d(a);)a=a.parentNode;return a}function n(a){return/^[ \t\r\n]+$/.test(a)}function l(a){if(null===a||a.nodeType!==Node.ELEMENT_NODE)return!1;var c=a.localName;return/^(span|p|h|a|meta)$/.test(c)&&a.namespaceURI===O||"span"===c&&"annotationHighlight"===a.className}function q(a){var c=a&&a.localName,b=!1;c&&(a=a.namespaceURI,a===O&&(b="s"===c||"tab"===c||"line-break"===c));return b}function f(a){return q(a)||h(a)||b(a)}function r(a){var c=
a&&a.localName,b=!1;c&&(a=a.namespaceURI,a===O&&(b="s"===c));return b}function a(a){for(;null!==a.firstChild&&l(a);)a=a.firstChild;return a}function c(a){for(;null!==a.lastChild&&l(a);)a=a.lastChild;return a}function k(a){for(;!d(a)&&null===a.previousSibling;)a=a.parentNode;return d(a)?null:c(a.previousSibling)}function e(c){for(;!d(c)&&null===c.nextSibling;)c=c.parentNode;return d(c)?null:a(c.nextSibling)}function u(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=k(a);else return!n(a.data.substr(a.length-
1,1));else f(a)?(c=!1===r(a),a=null):a=k(a);return c}function w(c){var b=!1,d;for(c=c&&a(c);c;){d=c.nodeType===Node.TEXT_NODE?c.length:0;if(0<d&&!n(c.data)){b=!0;break}if(f(c)){b=!0;break}c=e(c)}return b}function z(a,c){return n(a.data.substr(c))?!w(e(a)):!1}function x(a,c){var b=a.data,d;if(!n(b[c])||f(a.parentNode))return!1;0<c?n(b[c-1])||(d=!0):u(k(a))&&(d=!0);return!0===d?z(a,c)?!1:!0:!1}function t(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function v(a){return(a=t(a))&&(0>a.value||"%"===a.unit)?null:a}function s(a){return(a=t(a))&&"%"!==a.unit?null:a}function C(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "cursor":case "editinfo":return!1}}return!0}
function I(a,c){for(;0<c.length&&!X.rangeContainsNode(a,c[0]);)c.shift();for(;0<c.length&&!X.rangeContainsNode(a,c[c.length-1]);)c.pop()}function H(a,c,d){var e;e=X.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_REJECT;if(q(a.parentNode)||b(a))c=NodeFilter.FILTER_REJECT;else if(a.nodeType===Node.TEXT_NODE){if(d||Boolean(p(a)&&(!n(a.textContent)||x(a,0))))c=NodeFilter.FILTER_ACCEPT}else if(f(a))c=NodeFilter.FILTER_ACCEPT;else if(C(a)||l(a))c=NodeFilter.FILTER_SKIP;return c},NodeFilter.SHOW_ELEMENT|
NodeFilter.SHOW_TEXT);c||I(a,e);return e}function D(a,c,d){for(;a;){if(d(a)){c[0]!==a&&c.unshift(a);break}if(b(a))break;a=a.parentNode}}function F(a,c){var b=a;if(c<b.childNodes.length-1)b=b.childNodes[c+1];else{for(;!b.nextSibling;)b=b.parentNode;b=b.nextSibling}for(;b.firstChild;)b=b.firstChild;return b}var O=odf.Namespaces.textns,K=odf.Namespaces.drawns,Z=odf.Namespaces.xlinkns,Q=/^\s*$/,X=new core.DomUtils;this.isImage=m;this.isCharacterFrame=h;this.isInlineRoot=b;this.isTextSpan=function(a){return"span"===
(a&&a.localName)&&a.namespaceURI===O};this.isHyperlink=g;this.getHyperlinkTarget=function(a){return a.getAttributeNS(Z,"href")};this.isParagraph=d;this.getParagraphElement=p;this.isWithinTrackedChanges=function(a,c){for(;a&&a!==c;){if(a.namespaceURI===O&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===O};this.isLineBreak=function(a){return"line-break"===(a&&a.localName)&&a.namespaceURI===O};this.isODFWhitespace=
n;this.isGroupingElement=l;this.isCharacterElement=q;this.isAnchoredAsCharacterElement=f;this.isSpaceElement=r;this.firstChild=a;this.lastChild=c;this.previousNode=k;this.nextNode=e;this.scanLeftForNonSpace=u;this.lookLeftForCharacter=function(a){var c,b=c=0;a.nodeType===Node.TEXT_NODE&&(b=a.length);0<b?(c=a.data,c=n(c.substr(b-1,1))?1===b?u(k(a))?2:0:n(c.substr(b-2,1))?0:2:1):f(a)&&(c=1);return c};this.lookRightForCharacter=function(a){var c=!1,b=0;a&&a.nodeType===Node.TEXT_NODE&&(b=a.length);0<
b?c=!n(a.data.substr(0,1)):f(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(a){var b=!1,d;for(a=a&&c(a);a;){d=a.nodeType===Node.TEXT_NODE?a.length:0;if(0<d&&!n(a.data)){b=!0;break}if(f(a)){b=!0;break}a=k(a)}return b};this.scanRightForAnyCharacter=w;this.isTrailingWhitespace=z;this.isSignificantWhitespace=x;this.isDowngradableSpaceElement=function(a){return a.namespaceURI===O&&"s"===a.localName?u(k(a))&&w(e(a)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===
Node.TEXT_NODE&&Q.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=t;this.parseNonNegativeLength=v;this.parseFoFontSize=function(a){var c;c=(c=t(a))&&(0>=c.value||"%"===c.unit)?null:c;return c||s(a)};this.parseFoLineHeight=function(a){return v(a)||s(a)};this.isTextContentContainingNode=C;this.getTextNodes=function(a,c){var b;b=X.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_REJECT;a.nodeType===Node.TEXT_NODE?Boolean(p(a)&&(!n(a.textContent)||x(a,0)))&&(c=NodeFilter.FILTER_ACCEPT):
C(a)&&(c=NodeFilter.FILTER_SKIP);return c},NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);c||I(a,b);return b};this.getTextElements=H;this.getParagraphElements=function(a){var c;c=X.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_REJECT;if(d(a))c=NodeFilter.FILTER_ACCEPT;else if(C(a)||l(a))c=NodeFilter.FILTER_SKIP;return c},NodeFilter.SHOW_ELEMENT);D(a.startContainer,c,d);return c};this.getImageElements=function(a){var c;c=X.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_SKIP;m(a)&&(c=
NodeFilter.FILTER_ACCEPT);return c},NodeFilter.SHOW_ELEMENT);D(a.startContainer,c,m);return c};this.getHyperlinkElements=function(a){var c=[],b=a.cloneRange();a.collapsed&&a.endContainer.nodeType===Node.ELEMENT_NODE&&(a=F(a.endContainer,a.endOffset),a.nodeType===Node.TEXT_NODE&&b.setEnd(a,1));H(b,!0,!1).forEach(function(a){for(a=a.parentNode;!d(a);){if(g(a)&&-1===c.indexOf(a)){c.push(a);break}a=a.parentNode}});b.detach();return c}};
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
gui.AnnotationViewManager=function(m,h,b,g){function d(a){var b=a.annotationEndElement,d=f.createRange(),g=a.getAttributeNS(odf.Namespaces.officens,"name");b&&(d.setStart(a,a.childNodes.length),d.setEnd(b,0),a=r.getTextNodes(d,!1),a.forEach(function(a){var c=f.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",g);a.parentNode.insertBefore(c,a);c.appendChild(a)}));d.detach()}function p(c){var d=m.getSizer();c?(b.style.display="inline-block",d.style.paddingRight=a.getComputedStyle(b).width):
(b.style.display="none",d.style.paddingRight=0);m.refreshSize()}function n(){q.sort(function(a,b){return 0!==(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1})}function l(){var a;for(a=0;a<q.length;a+=1){var d=q[a],e=d.parentNode,f=e.nextElementSibling,g=f.nextElementSibling,l=e.parentNode,h=0,h=q[q.indexOf(d)-1],p=void 0,d=m.getZoomLevel();e.style.left=(b.getBoundingClientRect().left-l.getBoundingClientRect().left)/d+"px";e.style.width=b.getBoundingClientRect().width/d+"px";f.style.width=
parseFloat(e.style.left)-30+"px";h&&(p=h.parentNode.getBoundingClientRect(),20>=(l.getBoundingClientRect().top-p.bottom)/d?e.style.top=Math.abs(l.getBoundingClientRect().top-p.bottom)/d+20+"px":e.style.top="0px");g.style.left=f.getBoundingClientRect().width/d+"px";var f=g.style,l=g.getBoundingClientRect().left/d,h=g.getBoundingClientRect().top/d,p=e.getBoundingClientRect().left/d,n=e.getBoundingClientRect().top/d,r=0,C=0,r=p-l,r=r*r,C=n-h,C=C*C,l=Math.sqrt(r+C);f.width=l+"px";h=Math.asin((e.getBoundingClientRect().top-
g.getBoundingClientRect().top)/(d*parseFloat(g.style.width)));g.style.transform="rotate("+h+"rad)";g.style.MozTransform="rotate("+h+"rad)";g.style.WebkitTransform="rotate("+h+"rad)";g.style.msTransform="rotate("+h+"rad)"}}var q=[],f=h.ownerDocument,r=new odf.OdfUtils,a=runtime.getWindow();runtime.assert(Boolean(a),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=l;this.getMinimumHeightForAnnotationPane=function(){return"none"!==b.style.display&&
0<q.length?(q[q.length-1].parentNode.getBoundingClientRect().bottom-b.getBoundingClientRect().top)/m.getZoomLevel()+"px":null};this.addAnnotation=function(a){p(!0);q.push(a);n();var b=f.createElement("div"),e=f.createElement("div"),h=f.createElement("div"),m=f.createElement("div"),r;b.className="annotationWrapper";a.parentNode.insertBefore(b,a);e.className="annotationNote";e.appendChild(a);g&&(r=f.createElement("div"),r.className="annotationRemoveButton",e.appendChild(r));h.className="annotationConnector horizontal";
m.className="annotationConnector angular";b.appendChild(e);b.appendChild(h);b.appendChild(m);a.annotationEndElement&&d(a);l()};this.forgetAnnotations=function(){for(;q.length;){var a=q[0],b=q.indexOf(a),d=a.parentNode.parentNode;"div"===d.localName&&(d.parentNode.insertBefore(a,d),d.parentNode.removeChild(d));for(var a=a.getAttributeNS(odf.Namespaces.officens,"name"),a=f.querySelectorAll('span.annotationHighlight[annotation="'+a+'"]'),g=d=void 0,d=0;d<a.length;d+=1){for(g=a.item(d);g.firstChild;)g.parentNode.insertBefore(g.firstChild,
g);g.parentNode.removeChild(g)}-1!==b&&q.splice(b,1);0===q.length&&p(!1)}}};
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
(function(){function m(h,b){var g=this;this.getDistance=function(b){var h=g.x-b.x;b=g.y-b.y;return Math.sqrt(h*h+b*b)};this.getCenter=function(b){return new m((g.x+b.x)/2,(g.y+b.y)/2)};g.x=h;g.y=b}gui.ZoomHelper=function(){function h(a,b,d,e){a=e?"translate3d("+a+"px, "+b+"px, 0) scale3d("+d+", "+d+", 1)":"translate("+a+"px, "+b+"px) scale("+d+")";c.style.WebkitTransform=a;c.style.MozTransform=a;c.style.msTransform=a;c.style.OTransform=a;c.style.transform=a}function b(a){a?h(-k.x,-k.y,w,!0):(h(0,
0,w,!0),h(0,0,w,!1))}function g(a){if(t&&I){var c=t.style.overflow,b=t.classList.contains("customScrollbars");a&&b||!a&&!b||(a?(t.classList.add("customScrollbars"),t.style.overflow="hidden",runtime.requestAnimationFrame(function(){t.style.overflow=c})):t.classList.remove("customScrollbars"))}}function d(){h(-k.x,-k.y,w,!0);t.scrollLeft=0;t.scrollTop=0;g(!1)}function p(){h(0,0,w,!0);t.scrollLeft=k.x;t.scrollTop=k.y;g(!0)}function n(a){return new m(a.pageX-c.offsetLeft,a.pageY-c.offsetTop)}function l(a){e&&
(k.x-=a.x-e.x,k.y-=a.y-e.y,k=new m(Math.min(Math.max(k.x,c.offsetLeft),(c.offsetLeft+c.offsetWidth)*w-t.clientWidth),Math.min(Math.max(k.y,c.offsetTop),(c.offsetTop+c.offsetHeight)*w-t.clientHeight)));e=a}function q(a){var c=a.touches.length,b=0<c?n(a.touches[0]):null;a=1<c?n(a.touches[1]):null;b&&a?(u=b.getDistance(a),z=w,e=b.getCenter(a),d(),C=s.PINCH):b&&(e=b,C=s.SCROLL)}function f(a){var e=a.touches.length,f=0<e?n(a.touches[0]):null,e=1<e?n(a.touches[1]):null;if(f&&e)if(a.preventDefault(),C===
s.SCROLL)C=s.PINCH,d(),u=f.getDistance(e);else{a=f.getCenter(e);f=f.getDistance(e)/u;l(a);var e=w,g=Math.min(x,c.offsetParent.clientWidth/c.offsetWidth);w=z*f;w=Math.min(Math.max(w,g),x);f=w/e;k.x+=(f-1)*(a.x+k.x);k.y+=(f-1)*(a.y+k.y);b(!0)}else f&&(C===s.PINCH?(C=s.SCROLL,p()):l(f))}function r(){C===s.PINCH&&(v.emit(gui.ZoomHelper.signalZoomChanged,w),p(),b(!1));C=s.NONE}function a(){t&&(t.removeEventListener("touchstart",q,!1),t.removeEventListener("touchmove",f,!1),t.removeEventListener("touchend",
r,!1))}var c,k,e,u,w,z,x=4,t,v=new core.EventNotifier([gui.ZoomHelper.signalZoomChanged]),s={NONE:0,SCROLL:1,PINCH:2},C=s.NONE,I=runtime.getWindow().hasOwnProperty("ontouchstart");this.subscribe=function(a,c){v.subscribe(a,c)};this.unsubscribe=function(a,c){v.unsubscribe(a,c)};this.getZoomLevel=function(){return w};this.setZoomLevel=function(a){c&&(w=a,b(!1),v.emit(gui.ZoomHelper.signalZoomChanged,w))};this.destroy=function(c){a();g(!1);c()};this.setZoomableElement=function(d){a();c=d;t=c.offsetParent;
b(!1);t&&(t.addEventListener("touchstart",q,!1),t.addEventListener("touchmove",f,!1),t.addEventListener("touchend",r,!1));g(!0)};z=w=1;k=new m(0,0)};gui.ZoomHelper.signalZoomChanged="zoomChanged"})();
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
(function(){function m(g,d,h,n,l){var q,f=0,r;for(r in g)if(g.hasOwnProperty(r)){if(f===h){q=r;break}f+=1}q?d.getPartData(g[q].href,function(a,c){if(a)runtime.log(a);else if(c){var f="@font-face { font-family: '"+(g[q].family||q)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+b.convertUTF8ArrayToBase64(c)+') format("truetype"); }';try{n.insertRule(f,n.cssRules.length)}catch(e){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(e)+"\nRule: "+f)}}else runtime.log("missing font data for "+
g[q].href);m(g,d,h+1,n,l)}):l&&l()}var h=xmldom.XPath,b=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(b,d){for(var p=b.rootElement.fontFaceDecls;d.cssRules.length;)d.deleteRule(d.cssRules.length-1);if(p){var n={},l,q,f,r;if(p)for(p=h.getODFElementsWithXPath(p,"style:font-face[svg:font-face-src]",odf.Namespaces.lookupNamespaceURI),l=0;l<p.length;l+=1)q=p[l],f=q.getAttributeNS(odf.Namespaces.stylens,"name"),r=q.getAttributeNS(odf.Namespaces.svgns,"font-family"),q=h.getODFElementsWithXPath(q,
"svg:font-face-src/svg:font-face-uri",odf.Namespaces.lookupNamespaceURI),0<q.length&&(q=q[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),n[f]={href:q,family:r});m(n,b,0,d)}}};return odf.FontLoader})();
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
odf.Formatting=function(){function m(a){return(a=v[a])?t.mergeObjects({},a):{}}function h(){for(var a=r.rootElement.fontFaceDecls,b={},d,e,a=a&&a.firstElementChild;a;){if(d=a.getAttributeNS(k,"name"))if((e=a.getAttributeNS(c,"font-family"))||0<a.getElementsByTagNameNS(c,"font-face-uri").length)b[d]=e;a=a.nextElementSibling}return b}function b(a){for(var c=r.rootElement.styles.firstElementChild;c;){if(c.namespaceURI===k&&"default-style"===c.localName&&c.getAttributeNS(k,"family")===a)return c;c=c.nextElementSibling}return null}
function g(a,c,b){var d,f,g;b=b||[r.rootElement.automaticStyles,r.rootElement.styles];for(g=0;g<b.length;g+=1)for(d=b[g],d=d.firstElementChild;d;){f=d.getAttributeNS(k,"name");if(d.namespaceURI===k&&"style"===d.localName&&d.getAttributeNS(k,"family")===c&&f===a||"list-style"===c&&d.namespaceURI===e&&"list-style"===d.localName&&f===a||"data"===c&&d.namespaceURI===u&&f===a)return d;d=d.nextElementSibling}return null}function d(a){for(var c,b,d,e,f={},g=a.firstElementChild;g;){if(g.namespaceURI===k)for(d=
f[g.nodeName]={},b=g.attributes,c=0;c<b.length;c+=1)e=b.item(c),d[e.name]=e.value;g=g.nextElementSibling}b=a.attributes;for(c=0;c<b.length;c+=1)e=b.item(c),f[e.name]=e.value;return f}function p(a,c){for(var e=r.rootElement.styles,f,l={},h=a.getAttributeNS(k,"family"),p=a;p;)f=d(p),l=t.mergeObjects(f,l),p=(f=p.getAttributeNS(k,"parent-style-name"))?g(f,h,[e]):null;if(p=b(h))f=d(p),l=t.mergeObjects(f,l);!1!==c&&(f=m(h),l=t.mergeObjects(f,l));return l}function n(c,b){function d(a){Object.keys(a).forEach(function(c){Object.keys(a[c]).forEach(function(a){g+=
"|"+c+":"+a+"|"})})}for(var e=c.nodeType===Node.TEXT_NODE?c.parentNode:c,f,k=[],g="",l=!1;e;)!l&&z.isGroupingElement(e)&&(l=!0),(f=a.determineStylesForNode(e))&&k.push(f),e=e.parentNode;l&&(k.forEach(d),b&&(b[g]=k));return l?k:void 0}function l(a){var c={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(b){var d=Object.keys(a[b])[0],e={name:d,family:b,displayName:void 0,isCommonStyle:!1},f;(f=g(d,b))?(b=p(f),c=t.mergeObjects(b,c),e.displayName=f.getAttributeNS(k,"display-name"),
e.isCommonStyle=f.parentNode===r.rootElement.styles):runtime.log("No style element found for '"+d+"' of family '"+b+"'");c.orderedStyles.push(e)})});return c}function q(a,c){var b={},d=[];c||(c={});a.forEach(function(a){n(a,b)});Object.keys(b).forEach(function(a){c[a]||(c[a]=l(b[a]));d.push(c[a])});return d}function f(a,c){var b=z.parseLength(a),d=c;if(b)switch(b.unit){case "cm":d=b.value;break;case "mm":d=0.1*b.value;break;case "in":d=2.54*b.value;break;case "pt":d=0.035277778*b.value;break;case "pc":case "px":case "em":break;
default:runtime.log("Unit identifier: "+b.unit+" is not supported.")}return d}var r,a=new odf.StyleInfo,c=odf.Namespaces.svgns,k=odf.Namespaces.stylens,e=odf.Namespaces.textns,u=odf.Namespaces.numberns,w=odf.Namespaces.fons,z=new odf.OdfUtils,x=new core.DomUtils,t=new core.Utils,v={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.getSystemDefaultStyleAttributes=m;this.setOdfContainer=function(a){r=a};this.getFontMap=h;this.getAvailableParagraphStyles=function(){for(var a=r.rootElement.styles,
c,b,d=[],a=a&&a.firstElementChild;a;)"style"===a.localName&&a.namespaceURI===k&&(c=a.getAttributeNS(k,"family"),"paragraph"===c&&(c=a.getAttributeNS(k,"name"),b=a.getAttributeNS(k,"display-name")||c,c&&b&&d.push({name:c,displayName:b}))),a=a.nextElementSibling;return d};this.isStyleUsed=function(c){var b,d=r.rootElement;b=a.hasDerivedStyles(d,odf.Namespaces.lookupNamespaceURI,c);c=(new a.UsedStyleList(d.styles)).uses(c)||(new a.UsedStyleList(d.automaticStyles)).uses(c)||(new a.UsedStyleList(d.body)).uses(c);
return b||c};this.getDefaultStyleElement=b;this.getStyleElement=g;this.getStyleAttributes=d;this.getInheritedStyleAttributes=p;this.getFirstCommonParentStyleNameOrSelf=function(a){var c=r.rootElement.automaticStyles,b=r.rootElement.styles,d;for(d=g(a,"paragraph",[c]);d;)a=d.getAttributeNS(k,"parent-style-name"),d=g(a,"paragraph",[c]);return(d=g(a,"paragraph",[b]))?a:null};this.hasParagraphStyle=function(a){return Boolean(g(a,"paragraph"))};this.getAppliedStyles=q;this.getAppliedStylesForElement=function(a,
c){return q([a],c)[0]};this.updateStyle=function(a,b){var d,e;x.mapObjOntoNode(a,b,odf.Namespaces.lookupNamespaceURI);(d=b["style:text-properties"]&&b["style:text-properties"]["style:font-name"])&&!h().hasOwnProperty(d)&&(e=a.ownerDocument.createElementNS(k,"style:font-face"),e.setAttributeNS(k,"style:name",d),e.setAttributeNS(c,"svg:font-family",d),r.rootElement.fontFaceDecls.appendChild(e))};this.createDerivedStyleObject=function(a,c,b){var e=g(a,c);runtime.assert(Boolean(e),"No style element found for '"+
a+"' of family '"+c+"'");a=e.parentNode===r.rootElement.styles?{"style:parent-style-name":a}:d(e);a["style:family"]=c;t.mergeObjects(a,b);return a};this.getDefaultTabStopDistance=function(){for(var a=b("paragraph"),a=a&&a.firstElementChild,c;a;)a.namespaceURI===k&&"paragraph-properties"===a.localName&&(c=a.getAttributeNS(k,"tab-stop-distance")),a=a.nextElementSibling;c||(c="1.25cm");return z.parseNonNegativeLength(c)};this.getContentSize=function(a,c){var b,d,e,l,h,p,n,m,q,u,t;a:{var z,v,M;b=g(a,
c);runtime.assert("paragraph"===c||"table"===c,"styleFamily has to be either paragraph or table");if(b){z=b.getAttributeNS(k,"master-page-name")||"Standard";for(b=r.rootElement.masterStyles.lastElementChild;b&&b.getAttributeNS(k,"name")!==z;)b=b.previousElementSibling;z=b.getAttributeNS(k,"page-layout-name");v=x.getElementsByTagNameNS(r.rootElement.automaticStyles,k,"page-layout");for(M=0;M<v.length;M+=1)if(b=v[M],b.getAttributeNS(k,"name")===z)break a}b=null}b||(b=x.getDirectChild(r.rootElement.styles,
k,"default-page-layout"));if(b=x.getDirectChild(b,k,"page-layout-properties"))d=b.getAttributeNS(k,"print-orientation")||"portrait","portrait"===d?(d=21.001,e=29.7):(d=29.7,e=21.001),d=f(b.getAttributeNS(w,"page-width"),d),e=f(b.getAttributeNS(w,"page-height"),e),l=f(b.getAttributeNS(w,"margin"),null),null===l?(l=f(b.getAttributeNS(w,"margin-left"),2),h=f(b.getAttributeNS(w,"margin-right"),2),p=f(b.getAttributeNS(w,"margin-top"),2),n=f(b.getAttributeNS(w,"margin-bottom"),2)):l=h=p=n=l,m=f(b.getAttributeNS(w,
"padding"),null),null===m?(m=f(b.getAttributeNS(w,"padding-left"),0),q=f(b.getAttributeNS(w,"padding-right"),0),u=f(b.getAttributeNS(w,"padding-top"),0),t=f(b.getAttributeNS(w,"padding-bottom"),0)):m=q=u=t=m;return{width:d-l-h-m-q,height:e-p-n-u-t}}};
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
odf.StyleTreeNode=function(m){this.derivedStyles={};this.element=m};
odf.Style2CSS=function(){function m(a){var c,b,d,e={};if(!a)return e;for(a=a.firstElementChild;a;){if(b=a.namespaceURI!==k||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===w&&"list-style"===a.localName?"list":a.namespaceURI!==k||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(k,"family"))(c=a.getAttributeNS(k,"name"))||(c=""),e.hasOwnProperty(b)?d=e[b]:e[b]=d={},d[c]=a;a=a.nextElementSibling}return e}function h(a,c){if(a.hasOwnProperty(c))return a[c];
var b,d=null;for(b in a)if(a.hasOwnProperty(b)&&(d=h(a[b].derivedStyles,c)))break;return d}function b(a,c,d){var e,f,g;if(!c.hasOwnProperty(a))return null;e=new odf.StyleTreeNode(c[a]);f=e.element.getAttributeNS(k,"parent-style-name");g=null;f&&(g=h(d,f)||b(f,c,d));g?g.derivedStyles[a]=e:d[a]=e;delete c[a];return e}function g(a,c){for(var d in a)a.hasOwnProperty(d)&&b(d,a,c)}function d(a,c,b){var e=[];b=b.derivedStyles;var f;var k=v[a],g;void 0===k?c=null:(g=c?"["+k+'|style-name="'+c+'"]':"","presentation"===
k&&(k="draw",g=c?'[presentation|style-name="'+c+'"]':""),c=k+"|"+s[a].join(g+","+k+"|")+g);null!==c&&e.push(c);for(f in b)b.hasOwnProperty(f)&&(c=d(a,f,b[f]),e=e.concat(c));return e}function p(a,c){var b="",d,e,f;for(d=0;d<c.length;d+=1)if(e=c[d],f=a.getAttributeNS(e[0],e[1])){f=f.trim();if(G.hasOwnProperty(e[1])){var k=f.indexOf(" "),g=void 0,l=void 0;-1!==k?(g=f.substring(0,k),l=f.substring(k)):(g=f,l="");(g=y.parseLength(g))&&"pt"===g.unit&&0.75>g.value&&(f="0.75pt"+l)}e[2]&&(b+=e[2]+":"+f+";")}return b}
function n(c){return(c=t.getDirectChild(c,k,"text-properties"))?y.parseFoFontSize(c.getAttributeNS(a,"font-size")):null}function l(a,c,b,d){return c+c+b+b+d+d}function q(c,b,d,e){b='text|list[text|style-name="'+b+'"]';var f=d.getAttributeNS(w,"level");d=t.getDirectChild(d,k,"list-level-properties");d=t.getDirectChild(d,k,"list-level-label-alignment");var g,l;d&&(g=d.getAttributeNS(a,"text-indent"),l=d.getAttributeNS(a,"margin-left"));g||(g="-0.6cm");d="-"===g.charAt(0)?g.substring(1):"-"+g;for(f=
f&&parseInt(f,10);1<f;)b+=" > text|list-item > text|list",f-=1;if(l){f=b+" > text|list-item > *:not(text|list):first-child";f+="{";f=f+("margin-left:"+l+";")+"}";try{c.insertRule(f,c.cssRules.length)}catch(h){runtime.log("cannot load rule: "+f)}}e=b+" > text|list-item > *:not(text|list):first-child:before{"+e+";";e=e+"counter-increment:list;"+("margin-left:"+g+";");e+="width:"+d+";";e+="display:inline-block}";try{c.insertRule(e,c.cssRules.length)}catch(p){runtime.log("cannot load rule: "+e)}}function f(b,
e,g,h){if("list"===e)for(var m=h.element.firstChild,s,v;m;){if(m.namespaceURI===w)if(s=m,"list-level-style-number"===m.localName){var G=s;v=G.getAttributeNS(k,"num-format");var P=G.getAttributeNS(k,"num-suffix")||"",G=G.getAttributeNS(k,"num-prefix")||"",Y={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},V="";G&&(V+=' "'+G+'"');V=Y.hasOwnProperty(v)?V+(" counter(list, "+Y[v]+")"):v?V+(' "'+v+'"'):V+" ''";v="content:"+V+' "'+P+'"';q(b,g,s,v)}else"list-level-style-image"===
m.localName?(v="content: none;",q(b,g,s,v)):"list-level-style-bullet"===m.localName&&(v="content: '"+s.getAttributeNS(w,"bullet-char")+"';",q(b,g,s,v));m=m.nextSibling}else if("page"===e){if(v=h.element,G=P=g="",m=t.getDirectChild(v,k,"page-layout-properties"))if(s=v.getAttributeNS(k,"name"),g+=p(m,Q),(P=t.getDirectChild(m,k,"background-image"))&&(G=P.getAttributeNS(z,"href"))&&(g=g+("background-image: url('odfkit:"+G+"');")+p(P,I)),"presentation"===aa)for(v=(v=t.getDirectChild(v.parentNode.parentNode,
c,"master-styles"))&&v.firstElementChild;v;){if(v.namespaceURI===k&&"master-page"===v.localName&&v.getAttributeNS(k,"page-layout-name")===s){G=v.getAttributeNS(k,"name");P="draw|page[draw|master-page-name="+G+"] {"+g+"}";G="office|body, draw|page[draw|master-page-name="+G+"] {"+p(m,X)+" }";try{b.insertRule(P,b.cssRules.length),b.insertRule(G,b.cssRules.length)}catch(ga){throw ga;}}v=v.nextElementSibling}else if("text"===aa){P="office|text {"+g+"}";G="office|body {width: "+m.getAttributeNS(a,"page-width")+
";}";try{b.insertRule(P,b.cssRules.length),b.insertRule(G,b.cssRules.length)}catch(ha){throw ha;}}}else{g=d(e,g,h).join(",");m="";if(s=t.getDirectChild(h.element,k,"text-properties")){G=s;v=V="";P=1;s=""+p(G,C);Y=G.getAttributeNS(k,"text-underline-style");"solid"===Y&&(V+=" underline");Y=G.getAttributeNS(k,"text-line-through-style");"solid"===Y&&(V+=" line-through");V.length&&(s+="text-decoration:"+V+";");if(V=G.getAttributeNS(k,"font-name")||G.getAttributeNS(a,"font-family"))Y=S[V],s+="font-family: "+
(Y||V)+";";Y=G.parentNode;if(G=n(Y)){for(;Y;){if(G=n(Y)){if("%"!==G.unit){v="font-size: "+G.value*P+G.unit+";";break}P*=G.value/100}G=Y;V=Y="";Y=null;"default-style"===G.localName?Y=null:(Y=G.getAttributeNS(k,"parent-style-name"),V=G.getAttributeNS(k,"family"),Y=J.getODFElementsWithXPath(M,Y?"//style:*[@style:name='"+Y+"'][@style:family='"+V+"']":"//style:default-style[@style:family='"+V+"']",odf.Namespaces.lookupNamespaceURI)[0])}v||(v="font-size: "+parseFloat(R)*P+ba.getUnits(R)+";");s+=v}m+=s}if(s=
t.getDirectChild(h.element,k,"paragraph-properties"))v=s,s=""+p(v,H),(P=t.getDirectChild(v,k,"background-image"))&&(G=P.getAttributeNS(z,"href"))&&(s=s+("background-image: url('odfkit:"+G+"');")+p(P,I)),(v=v.getAttributeNS(a,"line-height"))&&"normal"!==v&&(v=y.parseFoLineHeight(v),s="%"!==v.unit?s+("line-height: "+v.value+v.unit+";"):s+("line-height: "+v.value/100+";")),m+=s;if(s=t.getDirectChild(h.element,k,"graphic-properties"))G=s,s=""+p(G,D),v=G.getAttributeNS(r,"opacity"),P=G.getAttributeNS(r,
"fill"),G=G.getAttributeNS(r,"fill-color"),"solid"===P||"hatch"===P?G&&"none"!==G?(v=isNaN(parseFloat(v))?1:parseFloat(v)/100,P=G.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,l),(G=(P=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(P))?{r:parseInt(P[1],16),g:parseInt(P[2],16),b:parseInt(P[3],16)}:null)&&(s+="background-color: rgba("+G.r+","+G.g+","+G.b+","+v+");")):s+="background: none;":"none"===P&&(s+="background: none;"),m+=s;if(s=t.getDirectChild(h.element,k,"drawing-page-properties"))v=""+p(s,
D),"true"===s.getAttributeNS(x,"background-visible")&&(v+="background: none;"),m+=v;if(s=t.getDirectChild(h.element,k,"table-cell-properties"))s=""+p(s,F),m+=s;if(s=t.getDirectChild(h.element,k,"table-row-properties"))s=""+p(s,K),m+=s;if(s=t.getDirectChild(h.element,k,"table-column-properties"))s=""+p(s,O),m+=s;if(s=t.getDirectChild(h.element,k,"table-properties"))v=s,s=""+p(v,Z),v=v.getAttributeNS(u,"border-model"),"collapsing"===v?s+="border-collapse:collapse;":"separating"===v&&(s+="border-collapse:separate;"),
m+=s;if(0!==m.length)try{b.insertRule(g+"{"+m+"}",b.cssRules.length)}catch($){throw $;}}for(var ea in h.derivedStyles)h.derivedStyles.hasOwnProperty(ea)&&f(b,e,ea,h.derivedStyles[ea])}var r=odf.Namespaces.drawns,a=odf.Namespaces.fons,c=odf.Namespaces.officens,k=odf.Namespaces.stylens,e=odf.Namespaces.svgns,u=odf.Namespaces.tablens,w=odf.Namespaces.textns,z=odf.Namespaces.xlinkns,x=odf.Namespaces.presentationns,t=new core.DomUtils,v={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",
ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),
presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background",
"table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},C=[[a,"color","color"],[a,"background-color","background-color"],[a,"font-weight","font-weight"],[a,"font-style","font-style"]],I=[[k,"repeat","background-repeat"]],H=[[a,"background-color","background-color"],[a,"text-align","text-align"],[a,"text-indent","text-indent"],[a,"padding","padding"],[a,"padding-left","padding-left"],[a,"padding-right","padding-right"],[a,"padding-top","padding-top"],[a,"padding-bottom","padding-bottom"],[a,"border-left","border-left"],[a,"border-right",
"border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"margin","margin"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"],[a,"border","border"]],D=[[a,"background-color","background-color"],[a,"min-height","min-height"],[r,"stroke","border"],[e,"stroke-color","border-color"],[e,"stroke-width","border-width"],[a,"border","border"],[a,"border-left","border-left"],[a,"border-right","border-right"],
[a,"border-top","border-top"],[a,"border-bottom","border-bottom"]],F=[[a,"background-color","background-color"],[a,"border-left","border-left"],[a,"border-right","border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"border","border"]],O=[[k,"column-width","width"]],K=[[k,"row-height","height"],[a,"keep-together",null]],Z=[[k,"width","width"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"]],
Q=[[a,"background-color","background-color"],[a,"padding","padding"],[a,"padding-left","padding-left"],[a,"padding-right","padding-right"],[a,"padding-top","padding-top"],[a,"padding-bottom","padding-bottom"],[a,"border","border"],[a,"border-left","border-left"],[a,"border-right","border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"margin","margin"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"]],
X=[[a,"page-width","width"],[a,"page-height","height"]],G={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,"stroke-width":!0},S={},y=new odf.OdfUtils,aa,M,R,J=xmldom.XPath,ba=new core.CSSUnits;this.style2css=function(a,c,b,d,e){for(var k,l,h,p;c.cssRules.length;)c.deleteRule(c.cssRules.length-1);k=null;d&&(k=d.ownerDocument,M=d.parentNode);e&&(k=e.ownerDocument,M=e.parentNode);if(k)for(p in odf.Namespaces.forEachPrefix(function(a,b){l="@namespace "+a+" url("+b+");";
try{c.insertRule(l,c.cssRules.length)}catch(d){}}),S=b,aa=a,R=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=m(d),d=m(e),e={},v)if(v.hasOwnProperty(p))for(h in b=e[p]={},g(a[p],b),g(d[p],b),b)b.hasOwnProperty(h)&&f(c,p,h,b[h])}};
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
(function(){function m(){function a(d){b=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(String(e))}b=!1;0<c.length&&a(c.pop())},10)}var c=[],b=!1;this.clearQueue=function(){c.length=0};this.addToQueue=function(d){if(0===c.length&&!b)return a(d);c.push(d)}}function h(a){function c(){for(;0<b.cssRules.length;)b.deleteRule(0);b.insertRule("#shadowContent draw|page {display:none;}",0);b.insertRule("office|presentation draw|page {display:none;}",1);b.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);b.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var b=a.sheet,d=1;this.showFirstPage=function(){d=1;c()};this.showNextPage=function(){d+=1;c()};this.showPreviousPage=function(){1<d&&(d-=1,c())};this.showPage=function(a){0<a&&(d=a,c())};this.css=a;this.destroy=function(c){a.parentNode.removeChild(a);c()}}function b(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function g(a){a=a.sheet;for(var c=a.cssRules;c.length;)a.deleteRule(c.length-
1)}function d(a,c,b){(new odf.Style2CSS).style2css(a.getDocumentType(),b.sheet,c.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function p(a,c,b){var d=null;a=a.rootElement.body.getElementsByTagNameNS(F,b+"-decl");b=c.getAttributeNS(F,"use-"+b+"-name");var e;if(b&&0<a.length)for(c=0;c<a.length;c+=1)if(e=a[c],e.getAttributeNS(F,"name")===b){d=e.textContent;break}return d}function n(a,c,d,e){var f=a.ownerDocument;c=a.getElementsByTagNameNS(c,d);for(a=0;a<c.length;a+=1)b(c[a]),e&&(d=
c[a],d.appendChild(f.createTextNode(e)))}function l(a,c,b){c.setAttributeNS("urn:webodf:names:helper","styleid",a);var d,e=c.getAttributeNS(I,"anchor-type"),f=c.getAttributeNS(s,"x"),k=c.getAttributeNS(s,"y"),g=c.getAttributeNS(s,"width"),l=c.getAttributeNS(s,"height"),h=c.getAttributeNS(x,"min-height"),p=c.getAttributeNS(x,"min-width");if("as-char"===e)d="display: inline-block;";else if(e||f||k)d="position: absolute;";else if(g||l||h||p)d="display: block;";f&&(d+="left: "+f+";");k&&(d+="top: "+k+
";");g&&(d+="width: "+g+";");l&&(d+="height: "+l+";");h&&(d+="min-height: "+h+";");p&&(d+="min-width: "+p+";");d&&(d="draw|"+c.localName+'[webodfhelper|styleid="'+a+'"] {'+d+"}",b.insertRule(d,b.cssRules.length))}function q(a){for(a=a.firstChild;a;){if(a.namespaceURI===t&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function f(a,c,b,d){function e(c){c&&(c='draw|image[webodfhelper|styleid="'+a+'"] {'+("background-image: url("+
c+");")+"}",d.insertRule(c,d.cssRules.length))}function f(a){e(a.url)}b.setAttributeNS("urn:webodf:names:helper","styleid",a);var k=b.getAttributeNS(H,"href"),g;if(k)try{g=c.getPart(k),g.onchange=f,g.load()}catch(l){runtime.log("slight problem: "+String(l))}else k=q(b),e(k)}function r(a){var c=a.ownerDocument;Q.getElementsByTagNameNS(a,I,"line-break").forEach(function(a){a.hasChildNodes()||a.appendChild(c.createElement("br"))})}function a(a){var c=a.ownerDocument;Q.getElementsByTagNameNS(a,I,"s").forEach(function(a){for(var b,
d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(c.createTextNode(" "));d=parseInt(a.getAttributeNS(I,"c"),10);if(1<d)for(a.removeAttributeNS(I,"c"),b=1;b<d;b+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function c(a){Q.getElementsByTagNameNS(a,I,"tab").forEach(function(a){a.textContent="\t"})}function k(a,c){function b(a,d){var k=g.documentElement.namespaceURI;"video/"===d.substr(0,6)?(e=g.createElementNS(k,"video"),e.setAttribute("controls","controls"),f=g.createElementNS(k,"source"),
a&&f.setAttribute("src",a),f.setAttribute("type",d),e.appendChild(f),c.parentNode.appendChild(e)):c.innerHtml="Unrecognised Plugin"}function d(a){b(a.url,a.mimetype)}var e,f,k,g=c.ownerDocument,l;if(k=c.getAttributeNS(H,"href"))try{l=a.getPart(k),l.onchange=d,l.load()}catch(h){runtime.log("slight problem: "+String(h))}else runtime.log("using MP4 data fallback"),k=q(c),b(k,"video/mp4")}function e(a){var c=a.getElementsByTagName("head")[0],b,d;b=a.styleSheets.length;for(d=c.firstElementChild;d&&("style"!==
d.localName||!d.hasAttribute("webodfcss"));)d=d.nextElementSibling;if(d)return b=parseInt(d.getAttribute("webodfcss"),10),d.setAttribute("webodfcss",b+1),d;"string"===String(typeof webodf_css)?b=webodf_css:(d="webodf.css",runtime.currentDirectory&&(d=runtime.currentDirectory(),0<d.length&&"/"!==d.substr(-1)&&(d+="/"),d+="../webodf.css"),b=runtime.readFileSync(d,"utf-8"));d=a.createElementNS(c.namespaceURI,"style");d.setAttribute("media","screen, print, handheld, projection");d.setAttribute("type",
"text/css");d.setAttribute("webodfcss","1");d.appendChild(a.createTextNode(b));c.appendChild(d);return d}function u(a){var c=parseInt(a.getAttribute("webodfcss"),10);1===c?a.parentNode.removeChild(a):a.setAttribute("count",c-1)}function w(a){var c=a.getElementsByTagName("head")[0],b=a.createElementNS(c.namespaceURI,"style"),d="";b.setAttribute("type","text/css");b.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,c){d+="@namespace "+a+" url("+c+");\n"});
d+="@namespace webodfhelper url(urn:webodf:names:helper);\n";b.appendChild(a.createTextNode(d));c.appendChild(b);return b}var z=odf.Namespaces.drawns,x=odf.Namespaces.fons,t=odf.Namespaces.officens,v=odf.Namespaces.stylens,s=odf.Namespaces.svgns,C=odf.Namespaces.tablens,I=odf.Namespaces.textns,H=odf.Namespaces.xlinkns,D=odf.Namespaces.xmlns,F=odf.Namespaces.presentationns,O=runtime.getWindow(),K=xmldom.XPath,Z=new odf.OdfUtils,Q=new core.DomUtils;odf.OdfCanvas=function(q){function s(a,c,b){function d(a,
c,b,e){B.addToQueue(function(){f(a,c,b,e)})}var e,k;e=c.getElementsByTagNameNS(z,"image");for(c=0;c<e.length;c+=1)k=e.item(c),d("image"+String(c),a,k,b)}function x(a,c){function b(a,c){B.addToQueue(function(){k(a,c)})}var d,e,f;e=c.getElementsByTagNameNS(z,"plugin");for(d=0;d<e.length;d+=1)f=e.item(d),b(a,f)}function H(){var a;a=U.firstChild;var c=ca.getZoomLevel();a&&(U.style.WebkitTransformOrigin="0% 0%",U.style.MozTransformOrigin="0% 0%",U.style.msTransformOrigin="0% 0%",U.style.OTransformOrigin=
"0% 0%",U.style.transformOrigin="0% 0%",P&&((a=P.getMinimumHeightForAnnotationPane())?U.style.minHeight=a:U.style.removeProperty("min-height")),q.style.width=Math.round(c*U.offsetWidth)+"px",q.style.height=Math.round(c*U.offsetHeight)+"px")}function aa(a){da?(W.parentNode||U.appendChild(W),P&&P.forgetAnnotations(),P=new gui.AnnotationViewManager(J,a.body,W,ka),Q.getElementsByTagNameNS(a.body,t,"annotation").forEach(P.addAnnotation),P.rerenderAnnotations(),H()):W.parentNode&&(U.removeChild(W),P.forgetAnnotations(),
H())}function M(e){function f(){g(V);g(ga);g(ha);b(q);q.style.display="inline-block";var k=N.rootElement;q.ownerDocument.importNode(k,!0);T.setOdfContainer(N);var h=N,m=V;(new odf.FontLoader).loadFonts(h,m.sheet);d(N,T,ga);m=N;h=ha.sheet;b(q);U=ba.createElementNS(q.namespaceURI,"div");U.style.display="inline-block";U.style.background="white";U.style.setProperty("float","left","important");U.appendChild(k);q.appendChild(U);W=ba.createElementNS(q.namespaceURI,"div");W.id="annotationsPane";$=ba.createElementNS(q.namespaceURI,
"div");$.id="shadowContent";$.style.position="absolute";$.style.top=0;$.style.left=0;m.getContentElement().appendChild($);var u=k.body,w,H=[],y;for(w=u.firstElementChild;w&&w!==u;)if(w.namespaceURI===z&&(H[H.length]=w),w.firstElementChild)w=w.firstElementChild;else{for(;w&&w!==u&&!w.nextElementSibling;)w=w.parentNode;w&&w.nextElementSibling&&(w=w.nextElementSibling)}for(y=0;y<H.length;y+=1)w=H[y],l("frame"+String(y),w,h);H=K.getODFElementsWithXPath(u,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.lookupNamespaceURI);
for(w=0;w<H.length;w+=1)u=H[w],u.setAttributeNS&&u.setAttributeNS("urn:webodf:names:helper","containsparagraphanchor",!0);var u=$,A,B,M;M=0;var J,E,H=m.rootElement.ownerDocument;if((w=k.body.firstElementChild)&&w.namespaceURI===t&&("presentation"===w.localName||"drawing"===w.localName))for(w=w.firstElementChild;w;){y=w.getAttributeNS(z,"master-page-name");if(y){for(A=m.rootElement.masterStyles.firstElementChild;A&&(A.getAttributeNS(v,"name")!==y||"master-page"!==A.localName||A.namespaceURI!==v);)A=
A.nextElementSibling;y=A}else y=null;if(y){A=w.getAttributeNS("urn:webodf:names:helper","styleid");B=H.createElementNS(z,"draw:page");E=y.firstElementChild;for(J=0;E;)"true"!==E.getAttributeNS(F,"placeholder")&&(M=E.cloneNode(!0),B.appendChild(M),l(A+"_"+J,M,h)),E=E.nextElementSibling,J+=1;E=J=M=void 0;var R=B.getElementsByTagNameNS(z,"frame");for(M=0;M<R.length;M+=1)J=R[M],(E=J.getAttributeNS(F,"class"))&&!/^(date-time|footer|header|page-number)$/.test(E)&&J.parentNode.removeChild(J);u.appendChild(B);
M=String(u.getElementsByTagNameNS(z,"page").length);n(B,I,"page-number",M);n(B,F,"header",p(m,w,"header"));n(B,F,"footer",p(m,w,"footer"));l(A,B,h);B.setAttributeNS(z,"draw:master-page-name",y.getAttributeNS(v,"name"))}w=w.nextElementSibling}u=q.namespaceURI;H=k.body.getElementsByTagNameNS(C,"table-cell");for(w=0;w<H.length;w+=1)y=H.item(w),y.hasAttributeNS(C,"number-columns-spanned")&&y.setAttributeNS(u,"colspan",y.getAttributeNS(C,"number-columns-spanned")),y.hasAttributeNS(C,"number-rows-spanned")&&
y.setAttributeNS(u,"rowspan",y.getAttributeNS(C,"number-rows-spanned"));r(k.body);a(k.body);c(k.body);s(m,k.body,h);x(m,k.body);y=k.body;m=q.namespaceURI;w={};var H={},Q;A=O.document.getElementsByTagNameNS(I,"list-style");for(u=0;u<A.length;u+=1)J=A.item(u),(E=J.getAttributeNS(v,"name"))&&(H[E]=J);y=y.getElementsByTagNameNS(I,"list");for(u=0;u<y.length;u+=1)if(J=y.item(u),A=J.getAttributeNS(D,"id")){B=J.getAttributeNS(I,"continue-list");J.setAttributeNS(m,"id",A);M="text|list#"+A+" > text|list-item > *:first-child:before {";
if(E=J.getAttributeNS(I,"style-name")){J=H[E];Q=Z.getFirstNonWhitespaceChild(J);J=void 0;if(Q)if("list-level-style-number"===Q.localName){J=Q.getAttributeNS(v,"num-format");E=Q.getAttributeNS(v,"num-suffix")||"";var R="",R={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},L=void 0,L=Q.getAttributeNS(v,"num-prefix")||"",L=R.hasOwnProperty(J)?L+(" counter(list, "+R[J]+")"):J?L+("'"+J+"';"):L+" ''";E&&(L+=" '"+E+"'");J=R="content: "+L+";"}else"list-level-style-image"===Q.localName?
J="content: none;":"list-level-style-bullet"===Q.localName&&(J="content: '"+Q.getAttributeNS(I,"bullet-char")+"';");Q=J}if(B){for(J=w[B];J;)J=w[J];M+="counter-increment:"+B+";";Q?(Q=Q.replace("list",B),M+=Q):M+="content:counter("+B+");"}else B="",Q?(Q=Q.replace("list",A),M+=Q):M+="content: counter("+A+");",M+="counter-increment:"+A+";",h.insertRule("text|list#"+A+" {counter-reset:"+A+"}",h.cssRules.length);M+="}";w[A]=B;M&&h.insertRule(M,h.cssRules.length)}U.insertBefore($,U.firstChild);ca.setZoomableElement(U);
aa(k);if(!e&&(k=[N],ea.hasOwnProperty("statereadychange")))for(h=ea.statereadychange,Q=0;Q<h.length;Q+=1)h[Q].apply(null,k)}N.state===odf.OdfContainer.DONE?f():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),fa=runtime.setTimeout(function na(){N.state===odf.OdfContainer.DONE?f():(runtime.log("will be back later..."),fa=runtime.setTimeout(na,500))},100))}function R(a){B.clearQueue();q.innerHTML=runtime.tr("Loading")+" "+a+"...";q.removeAttribute("style");N=new odf.OdfContainer(a,function(a){N=
a;M(!1)})}runtime.assert(null!==q&&void 0!==q,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==q.ownerDocument&&void 0!==q.ownerDocument,"odf.OdfCanvas constructor needs DOM");var J=this,ba=q.ownerDocument,ia=new core.Async,N,T=new odf.Formatting,E,U=null,W=null,da=!1,ka=!1,P=null,Y,V,ga,ha,$,ea={},fa,ja,L=!1,A=!1,B=new m,ca=new gui.ZoomHelper;this.refreshCSS=function(){L=!0;ja.trigger()};this.refreshSize=function(){ja.trigger()};this.odfContainer=function(){return N};this.setOdfContainer=
function(a,c){N=a;M(!0===c)};this.load=this.load=R;this.save=function(a){N.save(a)};this.addListener=function(a,c){switch(a){case "click":var b=q,d=a;b.addEventListener?b.addEventListener(d,c,!1):b.attachEvent?b.attachEvent("on"+d,c):b["on"+d]=c;break;default:b=ea.hasOwnProperty(a)?ea[a]:ea[a]=[],c&&-1===b.indexOf(c)&&b.push(c)}};this.getFormatting=function(){return T};this.getAnnotationViewManager=function(){return P};this.refreshAnnotations=function(){aa(N.rootElement)};this.rerenderAnnotations=
function(){P&&(A=!0,ja.trigger())};this.getSizer=function(){return U};this.enableAnnotations=function(a,c){a!==da&&(da=a,ka=c,N&&aa(N.rootElement))};this.addAnnotation=function(a){P&&(P.addAnnotation(a),H())};this.forgetAnnotations=function(){P&&(P.forgetAnnotations(),H())};this.getZoomHelper=function(){return ca};this.setZoomLevel=function(a){ca.setZoomLevel(a)};this.getZoomLevel=function(){return ca.getZoomLevel()};this.fitToContainingElement=function(a,c){var b=ca.getZoomLevel(),d=q.offsetHeight/
b,b=a/(q.offsetWidth/b);c/d<b&&(b=c/d);ca.setZoomLevel(b)};this.fitToWidth=function(a){var c=q.offsetWidth/ca.getZoomLevel();ca.setZoomLevel(a/c)};this.fitSmart=function(a,c){var b,d;d=ca.getZoomLevel();b=q.offsetWidth/d;d=q.offsetHeight/d;b=a/b;void 0!==c&&c/d<b&&(b=c/d);ca.setZoomLevel(Math.min(1,b))};this.fitToHeight=function(a){var c=q.offsetHeight/ca.getZoomLevel();ca.setZoomLevel(a/c)};this.showFirstPage=function(){E.showFirstPage()};this.showNextPage=function(){E.showNextPage()};this.showPreviousPage=
function(){E.showPreviousPage()};this.showPage=function(a){E.showPage(a);H()};this.getElement=function(){return q};this.addCssForFrameWithImage=function(a){var c=a.getAttributeNS(z,"name"),b=a.firstElementChild;l(c,a,ha.sheet);b&&f(c+"img",N,b,ha.sheet)};this.destroy=function(a){var c=ba.getElementsByTagName("head")[0],b=[E.destroy,ja.destroy];runtime.clearTimeout(fa);W&&W.parentNode&&W.parentNode.removeChild(W);ca.destroy(function(){U&&(q.removeChild(U),U=null)});u(Y);c.removeChild(V);c.removeChild(ga);
c.removeChild(ha);ia.destroyAll(b,a)};Y=e(ba);E=new h(w(ba));V=w(ba);ga=w(ba);ha=w(ba);ja=new core.ScheduledTask(function(){L&&(d(N,T,ga),L=!1);A&&(P&&P.rerenderAnnotations(),A=!1);H()},0);ca.subscribe(gui.ZoomHelper.signalZoomChanged,H)}})();
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
ops.Member=function(m,h){var b=new ops.MemberProperties;this.getMemberId=function(){return m};this.getProperties=function(){return b};this.setProperties=function(g){Object.keys(g).forEach(function(d){b[d]=g[d]})};this.removeProperties=function(g){Object.keys(g).forEach(function(d){"fullName"!==d&&"color"!==d&&"imageUrl"!==d&&b.hasOwnProperty(d)&&delete b[d]})};runtime.assert(Boolean(m),"No memberId was supplied!");h.fullName||(h.fullName=runtime.tr("Unknown Author"));h.color||(h.color="black");h.imageUrl||
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
gui.SelectionMover=function(m,h){function b(){r.setUnfilteredPosition(m.getNode(),0);return r}function g(a,b){var d,f=null;a&&0<a.length&&(d=b?a.item(a.length-1):a.item(0));d&&(f={top:d.top,left:b?d.right:d.left,bottom:d.bottom});return f}function d(a,b,e,f){var l=a.nodeType;e.setStart(a,b);e.collapse(!f);f=g(e.getClientRects(),!0===f);!f&&0<b&&(e.setStart(a,b-1),e.setEnd(a,b),f=g(e.getClientRects(),!0));f||(l===Node.ELEMENT_NODE&&0<b&&a.childNodes.length>=b?f=d(a,b-1,e,!0):a.nodeType===Node.TEXT_NODE&&
0<b?f=d(a,b-1,e,!0):a.previousSibling?f=d(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,e,!0):a.parentNode&&a.parentNode!==h?f=d(a.parentNode,0,e,!1):(e.selectNode(h),f=g(e.getClientRects(),!1)));runtime.assert(Boolean(f),"No visible rectangle found");return f}function p(c,d,e){for(var f=b(),g=new core.LoopWatchDog(1E4),l=0,h=0;0<c&&f.nextPosition();)g.check(),e.acceptPosition(f)===a&&(l+=1,d.acceptPosition(f)===
a&&(h+=l,l=0,c-=1));return h}function n(c,d,e){for(var f=b(),g=new core.LoopWatchDog(1E4),l=0,h=0;0<c&&f.previousPosition();)g.check(),e.acceptPosition(f)===a&&(l+=1,d.acceptPosition(f)===a&&(h+=l,l=0,c-=1));return h}function l(c,f){var e=b(),g=0,l=0,p=0>c?-1:1;for(c=Math.abs(c);0<c;){for(var m=f,n=p,q=e,r=q.container(),C=0,I=null,H=void 0,D=10,F=void 0,O=0,K=void 0,Z=void 0,Q=void 0,F=void 0,X=h.ownerDocument.createRange(),G=new core.LoopWatchDog(1E4),F=d(r,q.unfilteredDomOffset(),X),K=F.top,Z=F.left,
Q=K;!0===(0>n?q.previousPosition():q.nextPosition());)if(G.check(),m.acceptPosition(q)===a&&(C+=1,r=q.container(),F=d(r,q.unfilteredDomOffset(),X),F.top!==K)){if(F.top!==Q&&Q!==K)break;Q=F.top;F=Math.abs(Z-F.left);if(null===I||F<D)I=r,H=q.unfilteredDomOffset(),D=F,O=C}null!==I?(q.setUnfilteredPosition(I,H),C=O):C=0;X.detach();g+=C;if(0===g)break;l+=g;c-=1}return l*p}function q(c,k){var e,g,l,p,m=b(),n=f.getParagraphElement(m.getCurrentNode()),q=0,r=h.ownerDocument.createRange();0>c?(e=m.previousPosition,
g=-1):(e=m.nextPosition,g=1);for(l=d(m.container(),m.unfilteredDomOffset(),r);e.call(m);)if(k.acceptPosition(m)===a){if(f.getParagraphElement(m.getCurrentNode())!==n)break;p=d(m.container(),m.unfilteredDomOffset(),r);if(p.bottom!==l.bottom&&(l=p.top>=l.top&&p.bottom<l.bottom||p.top<=l.top&&p.bottom>l.bottom,!l))break;q+=g;l=p}r.detach();return q}var f=new odf.OdfUtils,r,a=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.getStepCounter=function(){return{convertForwardStepsBetweenFilters:p,convertBackwardStepsBetweenFilters:n,
countLinesSteps:l,countStepsToLineBoundary:q}};(function(){r=gui.SelectionMover.createPositionIterator(h);var a=h.ownerDocument.createRange();a.setStart(r.container(),r.unfilteredDomOffset());a.collapse(!0);m.setSelectedRange(a)})()};
gui.SelectionMover.createPositionIterator=function(m){var h=new function(){this.acceptNode=function(b){return b&&"urn:webodf:names:cursor"!==b.namespaceURI&&"urn:webodf:names:editinfo"!==b.namespaceURI?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}};return new core.PositionIterator(m,5,h,!1)};(function(){return gui.SelectionMover})();
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
ops.Document=function(){};ops.Document.prototype.getMemberIds=function(){};ops.Document.prototype.removeCursor=function(m){};ops.Document.prototype.getDocumentElement=function(){};ops.Document.prototype.getRootNode=function(){};ops.Document.prototype.getDOMDocument=function(){};ops.Document.prototype.cloneDocumentElement=function(){};ops.Document.prototype.setDocumentElement=function(m){};ops.Document.prototype.subscribe=function(m,h){};ops.Document.prototype.unsubscribe=function(m,h){};
ops.Document.prototype.getCanvas=function(){};ops.Document.prototype.createRootFilter=function(m){};ops.Document.signalCursorAdded="cursor/added";ops.Document.signalCursorRemoved="cursor/removed";ops.Document.signalCursorMoved="cursor/moved";ops.Document.signalMemberAdded="member/added";ops.Document.signalMemberUpdated="member/updated";ops.Document.signalMemberRemoved="member/removed";
// Input 39
ops.OdtCursor=function(m,h){var b=this,g={},d,p,n,l=new core.EventNotifier([ops.OdtCursor.signalCursorUpdated]);this.removeFromDocument=function(){n.remove()};this.subscribe=function(b,d){l.subscribe(b,d)};this.unsubscribe=function(b,d){l.unsubscribe(b,d)};this.getStepCounter=function(){return p.getStepCounter()};this.getMemberId=function(){return m};this.getNode=function(){return n.getNode()};this.getAnchorNode=function(){return n.getAnchorNode()};this.getSelectedRange=function(){return n.getSelectedRange()};
this.setSelectedRange=function(d,f){n.setSelectedRange(d,f);l.emit(ops.OdtCursor.signalCursorUpdated,b)};this.hasForwardSelection=function(){return n.hasForwardSelection()};this.getDocument=function(){return h};this.getSelectionType=function(){return d};this.setSelectionType=function(b){g.hasOwnProperty(b)?d=b:runtime.log("Invalid selection type: "+b)};this.resetSelectionType=function(){b.setSelectionType(ops.OdtCursor.RangeSelection)};n=new core.Cursor(h.getDOMDocument(),m);p=new gui.SelectionMover(n,
h.getRootNode());g[ops.OdtCursor.RangeSelection]=!0;g[ops.OdtCursor.RegionSelection]=!0;b.resetSelectionType()};ops.OdtCursor.RangeSelection="Range";ops.OdtCursor.RegionSelection="Region";ops.OdtCursor.signalCursorUpdated="cursorUpdated";(function(){return ops.OdtCursor})();
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
ops.Operation=function(){};ops.Operation.prototype.init=function(m){};ops.Operation.prototype.execute=function(m){};ops.Operation.prototype.spec=function(){};
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
(function(){var m=0;ops.StepsCache=function(h,b,g){function d(a,c,d){this.nodeId=a;this.steps=c;this.node=d;this.previousBookmark=this.nextBookmark=null;this.setIteratorPosition=function(a){a.setPositionBeforeElement(d);do if(b.acceptPosition(a)===v)break;while(a.nextPosition())}}function p(a,c,d){this.nodeId=a;this.steps=c;this.node=d;this.previousBookmark=this.nextBookmark=null;this.setIteratorPosition=function(a){a.setUnfilteredPosition(d,0);do if(b.acceptPosition(a)===v)break;while(a.nextPosition())}}
function n(a,c){var b="["+a.nodeId;c&&(b+=" => "+c.nodeId);return b+"]"}function l(){for(var a=x,c,b,d,e=new core.LoopWatchDog(0,1E5);a;){e.check();(c=a.previousBookmark)?runtime.assert(c.nextBookmark===a,"Broken bookmark link to previous @"+n(c,a)):(runtime.assert(a===x,"Broken bookmark link @"+n(a)),runtime.assert(void 0===t||x.steps<=t,"Base point is damaged @"+n(a)));(b=a.nextBookmark)&&runtime.assert(b.previousBookmark===a,"Broken bookmark link to next @"+n(a,b));if(void 0===t||a.steps<=t)runtime.assert(z.containsNode(h,
a.node),"Disconnected node is being reported as undamaged @"+n(a)),c&&(d=a.node.compareDocumentPosition(c.node),runtime.assert(0===d||0!==(d&Node.DOCUMENT_POSITION_PRECEDING),"Bookmark order with previous does not reflect DOM order @"+n(c,a))),b&&z.containsNode(h,b.node)&&(d=a.node.compareDocumentPosition(b.node),runtime.assert(0===d||0!==(d&Node.DOCUMENT_POSITION_FOLLOWING),"Bookmark order with next does not reflect DOM order @"+n(a,b)));a=a.nextBookmark}}function q(a){var c="";a.nodeType===Node.ELEMENT_NODE&&
(c=a.getAttributeNS(k,"nodeId"));return c}function f(a){var c=m.toString();a.setAttributeNS(k,"nodeId",c);m+=1;return c}function r(a){var c,b,d=new core.LoopWatchDog(0,1E4);void 0!==t&&a>t&&(a=t);for(c=Math.floor(a/g)*g;!b&&0!==c;)b=e[c],c-=g;for(b=b||x;b.nextBookmark&&b.nextBookmark.steps<=a;)d.check(),b=b.nextBookmark;return b}function a(a){a.previousBookmark&&(a.previousBookmark.nextBookmark=a.nextBookmark);a.nextBookmark&&(a.nextBookmark.previousBookmark=a.previousBookmark)}function c(a){for(var c,
b=null;!b&&a&&a!==h;)(c=q(a))&&(b=u[c])&&b.node!==a&&(runtime.log("Cloned node detected. Creating new bookmark"),b=null,a.removeAttributeNS(k,"nodeId")),a=a.parentNode;return b}var k="urn:webodf:names:steps",e={},u={},w=new odf.OdfUtils,z=new core.DomUtils,x,t,v=core.PositionFilter.FilterResult.FILTER_ACCEPT,s;this.updateCache=function(c,b,k){var l;l=b.getCurrentNode();if(b.isBeforeNode()&&w.isParagraph(l)){k||(c+=1);b=c;var m,p,n;if(void 0!==t&&t<b){m=r(t);for(k=m.nextBookmark;k&&k.steps<=b;)p=k.nextBookmark,
n=Math.ceil(k.steps/g)*g,e[n]===k&&delete e[n],z.containsNode(h,k.node)?k.steps=b+1:(a(k),delete u[k.nodeId]),k=p;t=b}else m=r(b);b=m;k=q(l)||f(l);(m=u[k])?m.node===l?m.steps=c:(runtime.log("Cloned node detected. Creating new bookmark"),k=f(l),m=u[k]=new d(k,c,l)):m=u[k]=new d(k,c,l);l=m;b!==l&&b.nextBookmark!==l&&(a(l),c=b.nextBookmark,l.nextBookmark=b.nextBookmark,l.previousBookmark=b,b.nextBookmark=l,c&&(c.previousBookmark=l));c=Math.ceil(l.steps/g)*g;b=e[c];if(!b||l.steps>b.steps)e[c]=l;s()}};
this.setToClosestStep=function(a,c){var b;s();b=r(a);b.setIteratorPosition(c);return b.steps};this.setToClosestDomPoint=function(a,b,d){var f,k;s();if(a===h&&0===b)f=x;else if(a===h&&b===h.childNodes.length)for(k in f=x,e)e.hasOwnProperty(k)&&(a=e[k],a.steps>f.steps&&(f=a));else if(f=c(a.childNodes.item(b)||a),!f)for(d.setUnfilteredPosition(a,b);!f&&d.previousNode();)f=c(d.getCurrentNode());f=f||x;void 0!==t&&f.steps>t&&(f=r(t));f.setIteratorPosition(d);return f.steps};this.damageCacheAfterStep=function(a){0>
a&&(a=0);void 0===t?t=a:a<t&&(t=a);s()};(function(){var a=q(h)||f(h);x=new p(a,0,h);s=ops.StepsCache.ENABLE_CACHE_VERIFICATION?l:function(){}})()};ops.StepsCache.ENABLE_CACHE_VERIFICATION=!1;ops.StepsCache.Bookmark=function(){};ops.StepsCache.Bookmark.prototype.setIteratorPosition=function(h){}})();
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
(function(){ops.StepsTranslator=function(m,h,b,g){function d(){var a=m();a!==n&&(runtime.log("Undo detected. Resetting steps cache"),n=a,l=new ops.StepsCache(n,b,g),f=h(n))}function p(a,c){if(!c||b.acceptPosition(a)===r)return!0;for(;a.previousPosition();)if(b.acceptPosition(a)===r){if(c(0,a.container(),a.unfilteredDomOffset()))return!0;break}for(;a.nextPosition();)if(b.acceptPosition(a)===r){if(c(1,a.container(),a.unfilteredDomOffset()))return!0;break}return!1}var n=m(),l=new ops.StepsCache(n,b,
g),q=new core.DomUtils,f=h(m()),r=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.convertStepsToDomPoint=function(a){var c,k;if(isNaN(a))throw new TypeError("Requested steps is not numeric ("+a+")");if(0>a)throw new RangeError("Requested steps is negative ("+a+")");d();for(c=l.setToClosestStep(a,f);c<a&&f.nextPosition();)(k=b.acceptPosition(f)===r)&&(c+=1),l.updateCache(c,f,k);if(c!==a)throw new RangeError("Requested steps ("+a+") exceeds available steps ("+c+")");return{node:f.container(),offset:f.unfilteredDomOffset()}};
this.convertDomPointToSteps=function(a,c,k){var e;d();q.containsNode(n,a)||(c=0>q.comparePoints(n,0,a,c),a=n,c=c?0:n.childNodes.length);f.setUnfilteredPosition(a,c);p(f,k)||f.setUnfilteredPosition(a,c);k=f.container();c=f.unfilteredDomOffset();a=l.setToClosestDomPoint(k,c,f);if(0>q.comparePoints(f.container(),f.unfilteredDomOffset(),k,c))return 0<a?a-1:a;for(;(f.container()!==k||f.unfilteredDomOffset()!==c)&&f.nextPosition();)(e=b.acceptPosition(f)===r)&&(a+=1),l.updateCache(a,f,e);return a+0};this.prime=
function(){var a,c;d();for(a=l.setToClosestStep(0,f);f.nextPosition();)(c=b.acceptPosition(f)===r)&&(a+=1),l.updateCache(a,f,c)};this.handleStepsInserted=function(a){d();l.damageCacheAfterStep(a.position)};this.handleStepsRemoved=function(a){d();l.damageCacheAfterStep(a.position-1)}};ops.StepsTranslator.PREVIOUS_STEP=0;ops.StepsTranslator.NEXT_STEP=1;return ops.StepsTranslator})();
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
ops.TextPositionFilter=function(m){function h(d,g,f){var h,a;if(g){if(b.isInlineRoot(g)&&b.isGroupingElement(f))return n;h=b.lookLeftForCharacter(g);if(1===h||2===h&&(b.scanRightForAnyCharacter(f)||b.scanRightForAnyCharacter(b.nextNode(d))))return p}h=null===g&&b.isParagraph(d);a=b.lookRightForCharacter(f);if(h)return a?p:b.scanRightForAnyCharacter(f)?n:p;if(!a)return n;g=g||b.previousNode(d);return b.scanLeftForAnyCharacter(g)?n:p}var b=new odf.OdfUtils,g=Node.ELEMENT_NODE,d=Node.TEXT_NODE,p=core.PositionFilter.FilterResult.FILTER_ACCEPT,
n=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(l){var q=l.container(),f=q.nodeType,r,a,c;if(f!==g&&f!==d)return n;if(f===d){if(!b.isGroupingElement(q.parentNode)||b.isWithinTrackedChanges(q.parentNode,m()))return n;f=l.unfilteredDomOffset();r=q.data;runtime.assert(f!==r.length,"Unexpected offset.");if(0<f){l=r[f-1];if(!b.isODFWhitespace(l))return p;if(1<f)if(l=r[f-2],!b.isODFWhitespace(l))a=p;else{if(!b.isODFWhitespace(r.substr(0,f)))return n}else c=b.previousNode(q),
b.scanLeftForNonSpace(c)&&(a=p);if(a===p)return b.isTrailingWhitespace(q,f)?n:p;a=r[f];return b.isODFWhitespace(a)?n:b.scanLeftForAnyCharacter(b.previousNode(q))?n:p}c=l.leftNode();a=q;q=q.parentNode;a=h(q,c,a)}else!b.isGroupingElement(q)||b.isWithinTrackedChanges(q,m())?a=n:(c=l.leftNode(),a=l.rightNode(),a=h(q,c,a));return a}};
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
ops.OdtDocument=function(m){function h(){var a=m.odfContainer().getContentElement(),c=a&&a.localName;runtime.assert("text"===c,"Unsupported content element type '"+c+"' for OdtDocument");return a}function b(){return a.getDocumentElement().ownerDocument}function g(a){for(;a&&!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}function d(a){this.acceptPosition=function(c){c=c.container();var b;
b="string"===typeof a?e[a].getNode():a;return g(c)===g(b)?z:x}}function p(a,c,b,d){d=gui.SelectionMover.createPositionIterator(d);var e;1===b.length?e=b[0]:(e=new core.PositionFilterChain,b.forEach(e.addFilter));b=new core.StepIterator(e,d);b.setPosition(a,c);return b}function n(a){var c=gui.SelectionMover.createPositionIterator(h());a=v.convertStepsToDomPoint(a);c.setUnfilteredPosition(a.node,a.offset);return c}function l(a){return c.getParagraphElement(a)}function q(a,c){return m.getFormatting().getStyleElement(a,
c)}function f(a){return q(a,"paragraph")}function r(a,c,b){a=a.childNodes.item(c)||a;return(a=l(a))&&k.containsNode(b,a)?a:b}var a=this,c,k,e={},u={},w=new core.EventNotifier([ops.Document.signalMemberAdded,ops.Document.signalMemberUpdated,ops.Document.signalMemberRemoved,ops.Document.signalCursorAdded,ops.Document.signalCursorRemoved,ops.Document.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonStyleCreated,ops.OdtDocument.signalCommonStyleDeleted,
ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationStart,ops.OdtDocument.signalOperationEnd,ops.OdtDocument.signalProcessingBatchStart,ops.OdtDocument.signalProcessingBatchEnd,ops.OdtDocument.signalUndoStackChanged,ops.OdtDocument.signalStepsInserted,ops.OdtDocument.signalStepsRemoved]),z=core.PositionFilter.FilterResult.FILTER_ACCEPT,x=core.PositionFilter.FilterResult.FILTER_REJECT,t,v,s;this.getDocumentElement=function(){return m.odfContainer().rootElement};this.getDOMDocument=function(){return this.getDocumentElement().ownerDocument};
this.cloneDocumentElement=function(){var c=a.getDocumentElement(),b=m.getAnnotationViewManager();b&&b.forgetAnnotations();c=c.cloneNode(!0);m.refreshAnnotations();return c};this.setDocumentElement=function(a){var c=m.odfContainer();c.setRootElement(a);m.setOdfContainer(c,!0);m.refreshCSS()};this.getDOMDocument=b;this.getRootElement=g;this.createStepIterator=p;this.getIteratorAtPosition=n;this.convertDomPointToCursorStep=function(a,c,b){return v.convertDomPointToSteps(a,c,b)};this.convertDomToCursorRange=
function(a,c){var b,d;b=c&&c(a.anchorNode,a.anchorOffset);b=v.convertDomPointToSteps(a.anchorNode,a.anchorOffset,b);c||a.anchorNode!==a.focusNode||a.anchorOffset!==a.focusOffset?(d=c&&c(a.focusNode,a.focusOffset),d=v.convertDomPointToSteps(a.focusNode,a.focusOffset,d)):d=b;return{position:b,length:d-b}};this.convertCursorToDomRange=function(a,c){var d=b().createRange(),e,f;e=v.convertStepsToDomPoint(a);c?(f=v.convertStepsToDomPoint(a+c),0<c?(d.setStart(e.node,e.offset),d.setEnd(f.node,f.offset)):
(d.setStart(f.node,f.offset),d.setEnd(e.node,e.offset))):d.setStart(e.node,e.offset);return d};this.getStyleElement=q;this.upgradeWhitespacesAtPosition=function(a){a=n(a);var b,d,e;a.previousPosition();a.previousPosition();for(e=-1;1>=e;e+=1){b=a.container();d=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[d]&&c.isSignificantWhitespace(b,d)){runtime.assert(" "===b.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=b.ownerDocument.createElementNS(odf.Namespaces.textns,
"text:s"),k=b.parentNode,g=b;f.appendChild(b.ownerDocument.createTextNode(" "));1===b.length?k.replaceChild(f,b):(b.deleteData(d,1),0<d&&(d<b.length&&b.splitText(d),g=b.nextSibling),k.insertBefore(f,g));b=f;a.moveToEndOfNode(b)}a.nextPosition()}};this.downgradeWhitespacesAtPosition=function(a){var b=n(a),d;a=b.container();for(b=b.unfilteredDomOffset();!c.isSpaceElement(a)&&a.childNodes.item(b);)a=a.childNodes.item(b),b=0;a.nodeType===Node.TEXT_NODE&&(a=a.parentNode);c.isDowngradableSpaceElement(a)&&
(b=a.firstChild,d=a.lastChild,k.mergeIntoParent(a),d!==b&&k.normalizeTextNodes(d),k.normalizeTextNodes(b))};this.getParagraphStyleElement=f;this.getParagraphElement=l;this.getParagraphStyleAttributes=function(a){return(a=f(a))?m.getFormatting().getInheritedStyleAttributes(a,!1):null};this.getTextNodeAtStep=function(c,d){var f=n(c),k=f.container(),g,l=0,h=null;k.nodeType===Node.TEXT_NODE?(g=k,l=f.unfilteredDomOffset(),0<g.length&&(0<l&&(g=g.splitText(l)),g.parentNode.insertBefore(b().createTextNode(""),
g),g=g.previousSibling,l=0)):(g=b().createTextNode(""),l=0,k.insertBefore(g,f.rightNode()));if(d){if(e[d]&&a.getCursorPosition(d)===c){for(h=e[d].getNode();h.nextSibling&&"cursor"===h.nextSibling.localName;)h.parentNode.insertBefore(h.nextSibling,h);0<g.length&&g.nextSibling!==h&&(g=b().createTextNode(""),l=0);h.parentNode.insertBefore(g,h)}}else for(;g.nextSibling&&"cursor"===g.nextSibling.localName;)g.parentNode.insertBefore(g.nextSibling,g);for(;g.previousSibling&&g.previousSibling.nodeType===
Node.TEXT_NODE;)f=g.previousSibling,f.appendData(g.data),l=f.length,g=f,g.parentNode.removeChild(g.nextSibling);for(;g.nextSibling&&g.nextSibling.nodeType===Node.TEXT_NODE;)f=g.nextSibling,g.appendData(f.data),g.parentNode.removeChild(f);return{textNode:g,offset:l}};this.fixCursorPositions=function(){Object.keys(e).forEach(function(c){var b=e[c],d=g(b.getNode()),f=a.createRootFilter(d),k,l,h,m=!1;h=b.getSelectedRange();k=r(h.startContainer,h.startOffset,d);l=p(h.startContainer,h.startOffset,[t,f],
k);h.collapsed?d=l:(k=r(h.endContainer,h.endOffset,d),d=p(h.endContainer,h.endOffset,[t,f],k));l.isStep()&&d.isStep()?l.container()!==d.container()||l.offset()!==d.offset()||h.collapsed&&b.getAnchorNode()===b.getNode()||(m=!0,h.setStart(l.container(),l.offset()),h.collapse(!0)):(m=!0,runtime.assert(l.roundToClosestStep(),"No walkable step found for cursor owned by "+c),h.setStart(l.container(),l.offset()),runtime.assert(d.roundToClosestStep(),"No walkable step found for cursor owned by "+c),h.setEnd(d.container(),
d.offset()));m&&(b.setSelectedRange(h,b.hasForwardSelection()),a.emit(ops.Document.signalCursorMoved,b))})};this.getCursorPosition=function(a){return(a=e[a])?v.convertDomPointToSteps(a.getNode(),0):0};this.getCursorSelection=function(a){a=e[a];var c=0,b=0;a&&(c=v.convertDomPointToSteps(a.getNode(),0),b=v.convertDomPointToSteps(a.getAnchorNode(),0));return{position:b,length:c-b}};this.getPositionFilter=function(){return t};this.getOdfCanvas=function(){return m};this.getCanvas=function(){return m};
this.getRootNode=h;this.addMember=function(a){runtime.assert(void 0===u[a.getMemberId()],"This member already exists");u[a.getMemberId()]=a};this.getMember=function(a){return u.hasOwnProperty(a)?u[a]:null};this.removeMember=function(a){delete u[a]};this.getCursor=function(a){return e[a]};this.getMemberIds=function(){var a=[],c;for(c in e)e.hasOwnProperty(c)&&a.push(e[c].getMemberId());return a};this.addCursor=function(c){runtime.assert(Boolean(c),"OdtDocument::addCursor without cursor");var b=c.getMemberId(),
d=a.convertCursorToDomRange(0,0);runtime.assert("string"===typeof b,"OdtDocument::addCursor has cursor without memberid");runtime.assert(!e[b],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+b);c.setSelectedRange(d,!0);e[b]=c};this.removeCursor=function(c){var b=e[c];return b?(b.removeFromDocument(),delete e[c],a.emit(ops.Document.signalCursorRemoved,c),!0):!1};this.moveCursor=function(c,b,d,f){c=e[c];b=a.convertCursorToDomRange(b,d);c&&(c.setSelectedRange(b,0<=d),c.setSelectionType(f||
ops.OdtCursor.RangeSelection))};this.getFormatting=function(){return m.getFormatting()};this.emit=function(a,c){w.emit(a,c)};this.subscribe=function(a,c){w.subscribe(a,c)};this.unsubscribe=function(a,c){w.unsubscribe(a,c)};this.createRootFilter=function(a){return new d(a)};this.close=function(a){a()};this.destroy=function(a){a()};t=new ops.TextPositionFilter(h);c=new odf.OdfUtils;k=new core.DomUtils;v=new ops.StepsTranslator(h,gui.SelectionMover.createPositionIterator,t,500);w.subscribe(ops.OdtDocument.signalStepsInserted,
v.handleStepsInserted);w.subscribe(ops.OdtDocument.signalStepsRemoved,v.handleStepsRemoved);w.subscribe(ops.OdtDocument.signalOperationEnd,function(c){var b=c.spec(),d=b.memberid,b=(new Date(b.timestamp)).toISOString(),e=m.odfContainer();c.isEdit&&(d=a.getMember(d).getProperties().fullName,e.setMetadata({"dc:creator":d,"dc:date":b},null),s||(e.incrementEditingCycles(),e.setMetadata(null,["meta:editing-duration","meta:document-statistic"])),s=c)})};ops.OdtDocument.signalParagraphChanged="paragraph/changed";
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
ops.OpAddAnnotation=function(){function m(b,d,f){var g=b.getTextNodeAtStep(f,h);g&&(b=g.textNode,f=b.parentNode,g.offset!==b.length&&b.splitText(g.offset),f.insertBefore(d,b.nextSibling),0===b.length&&f.removeChild(b))}var h,b,g,d,p,n;this.init=function(l){h=l.memberid;b=parseInt(l.timestamp,10);g=parseInt(l.position,10);d=parseInt(l.length,10)||0;p=l.name};this.isEdit=!0;this.group=void 0;this.execute=function(l){var q=l.getCursor(h),f,r;r=new core.DomUtils;n=l.getDOMDocument();var a=new Date(b),
c,k,e,u;c=n.createElementNS(odf.Namespaces.officens,"office:annotation");c.setAttributeNS(odf.Namespaces.officens,"office:name",p);f=n.createElementNS(odf.Namespaces.dcns,"dc:creator");f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h);f.textContent=l.getMember(h).getProperties().fullName;k=n.createElementNS(odf.Namespaces.dcns,"dc:date");k.appendChild(n.createTextNode(a.toISOString()));a=n.createElementNS(odf.Namespaces.textns,"text:list");e=n.createElementNS(odf.Namespaces.textns,
"text:list-item");u=n.createElementNS(odf.Namespaces.textns,"text:p");e.appendChild(u);a.appendChild(e);c.appendChild(f);c.appendChild(k);c.appendChild(a);d&&(f=n.createElementNS(odf.Namespaces.officens,"office:annotation-end"),f.setAttributeNS(odf.Namespaces.officens,"office:name",p),c.annotationEndElement=f,m(l,f,g+d));m(l,c,g);l.emit(ops.OdtDocument.signalStepsInserted,{position:g,length:d});q&&(f=n.createRange(),r=r.getElementsByTagNameNS(c,odf.Namespaces.textns,"p")[0],f.selectNodeContents(r),
q.setSelectedRange(f,!1),l.emit(ops.Document.signalCursorMoved,q));l.getOdfCanvas().addAnnotation(c);l.fixCursorPositions();return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:h,timestamp:b,position:g,length:d,name:p}}};
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
ops.OpAddCursor=function(){var m,h;this.init=function(b){m=b.memberid;h=b.timestamp};this.isEdit=!1;this.group=void 0;this.execute=function(b){var g=b.getCursor(m);if(g)return!1;g=new ops.OdtCursor(m,b);b.addCursor(g);b.emit(ops.Document.signalCursorAdded,g);return!0};this.spec=function(){return{optype:"AddCursor",memberid:m,timestamp:h}}};
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
ops.OpAddMember=function(){var m,h,b;this.init=function(g){m=g.memberid;h=parseInt(g.timestamp,10);b=g.setProperties};this.isEdit=!1;this.group=void 0;this.execute=function(g){var d;if(g.getMember(m))return!1;d=new ops.Member(m,b);g.addMember(d);g.emit(ops.Document.signalMemberAdded,d);return!0};this.spec=function(){return{optype:"AddMember",memberid:m,timestamp:h,setProperties:b}}};
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
ops.OpAddStyle=function(){var m,h,b,g,d,p,n=odf.Namespaces.stylens;this.init=function(l){m=l.memberid;h=l.timestamp;b=l.styleName;g=l.styleFamily;d="true"===l.isAutomaticStyle||!0===l.isAutomaticStyle;p=l.setProperties};this.isEdit=!0;this.group=void 0;this.execute=function(l){var h=l.getOdfCanvas().odfContainer(),f=l.getFormatting(),m=l.getDOMDocument().createElementNS(n,"style:style");if(!m)return!1;p&&f.updateStyle(m,p);m.setAttributeNS(n,"style:family",g);m.setAttributeNS(n,"style:name",b);d?
h.rootElement.automaticStyles.appendChild(m):h.rootElement.styles.appendChild(m);l.getOdfCanvas().refreshCSS();d||l.emit(ops.OdtDocument.signalCommonStyleCreated,{name:b,family:g});return!0};this.spec=function(){return{optype:"AddStyle",memberid:m,timestamp:h,styleName:b,styleFamily:g,isAutomaticStyle:d,setProperties:p}}};
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
odf.ObjectNameGenerator=function(m,h){function b(a,c){var b={};this.generateName=function(){var d=c(),f=0,k;do k=a+f,f+=1;while(b[k]||d[k]);b[k]=!0;return k}}function g(){var a={};[m.rootElement.automaticStyles,m.rootElement.styles].forEach(function(c){for(c=c.firstElementChild;c;)c.namespaceURI===d&&"style"===c.localName&&(a[c.getAttributeNS(d,"name")]=!0),c=c.nextElementSibling});return a}var d=odf.Namespaces.stylens,p=odf.Namespaces.drawns,n=odf.Namespaces.xlinkns,l=new core.DomUtils,q=(new core.Utils).hashString(h),
f=null,r=null,a=null,c={},k={};this.generateStyleName=function(){null===f&&(f=new b("auto"+q+"_",function(){return g()}));return f.generateName()};this.generateFrameName=function(){null===r&&(l.getElementsByTagNameNS(m.rootElement.body,p,"frame").forEach(function(a){c[a.getAttributeNS(p,"name")]=!0}),r=new b("fr"+q+"_",function(){return c}));return r.generateName()};this.generateImageName=function(){null===a&&(l.getElementsByTagNameNS(m.rootElement.body,p,"image").forEach(function(a){a=a.getAttributeNS(n,
"href");a=a.substring(9,a.lastIndexOf("."));k[a]=!0}),a=new b("img"+q+"_",function(){return k}));return a.generateName()}};
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
odf.TextStyleApplicator=function(m,h,b){function g(b){function d(a,b){return"object"===typeof a&&"object"===typeof b?Object.keys(a).every(function(e){return d(a[e],b[e])}):a===b}var a={};this.isStyleApplied=function(c){c=h.getAppliedStylesForElement(c,a);return d(b,c)}}function d(d){var g={};this.applyStyleToContainer=function(a){var c;c=a.getAttributeNS(l,"style-name");var k=a.ownerDocument;c=c||"";if(!g.hasOwnProperty(c)){var e=c,p;p=c?h.createDerivedStyleObject(c,"text",d):d;k=k.createElementNS(q,
"style:style");h.updateStyle(k,p);k.setAttributeNS(q,"style:name",m.generateStyleName());k.setAttributeNS(q,"style:family","text");k.setAttributeNS("urn:webodf:names:scope","scope","document-content");b.appendChild(k);g[e]=k}c=g[c].getAttributeNS(q,"name");a.setAttributeNS(l,"text:style-name",c)}}function p(b,d){var a=b.ownerDocument,c=b.parentNode,k,e,g=new core.LoopWatchDog(1E4);e=[];"span"!==c.localName||c.namespaceURI!==l?(k=a.createElementNS(l,"text:span"),c.insertBefore(k,b),c=!1):(b.previousSibling&&
!n.rangeContainsNode(d,c.firstChild)?(k=c.cloneNode(!1),c.parentNode.insertBefore(k,c.nextSibling)):k=c,c=!0);e.push(b);for(a=b.nextSibling;a&&n.rangeContainsNode(d,a);)g.check(),e.push(a),a=a.nextSibling;e.forEach(function(a){a.parentNode!==k&&k.appendChild(a)});if(a&&c)for(e=k.cloneNode(!1),k.parentNode.insertBefore(e,k.nextSibling);a;)g.check(),c=a.nextSibling,e.appendChild(a),a=c;return k}var n=new core.DomUtils,l=odf.Namespaces.textns,q=odf.Namespaces.stylens;this.applyStyle=function(b,l,a){var c=
{},k,e,h,m;runtime.assert(a&&a.hasOwnProperty("style:text-properties"),"applyStyle without any text properties");c["style:text-properties"]=a["style:text-properties"];h=new d(c);m=new g(c);b.forEach(function(a){k=m.isStyleApplied(a);!1===k&&(e=p(a,l),h.applyStyleToContainer(e))})}};
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
ops.OpApplyDirectStyling=function(){function m(b,d,g){var a=b.getOdfCanvas().odfContainer(),c=l.splitBoundaries(d),k=n.getTextNodes(d,!1);d={startContainer:d.startContainer,startOffset:d.startOffset,endContainer:d.endContainer,endOffset:d.endOffset};(new odf.TextStyleApplicator(new odf.ObjectNameGenerator(a,h),b.getFormatting(),a.rootElement.automaticStyles)).applyStyle(k,d,g);c.forEach(l.normalizeTextNodes)}var h,b,g,d,p,n=new odf.OdfUtils,l=new core.DomUtils;this.init=function(l){h=l.memberid;b=
l.timestamp;g=parseInt(l.position,10);d=parseInt(l.length,10);p=l.setProperties};this.isEdit=!0;this.group=void 0;this.execute=function(l){var f=l.convertCursorToDomRange(g,d),r=n.getParagraphElements(f);m(l,f,p);f.detach();l.getOdfCanvas().refreshCSS();l.fixCursorPositions();r.forEach(function(a){l.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:h,timeStamp:b})});l.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:h,
timestamp:b,position:g,length:d,setProperties:p}}};
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
ops.OpApplyHyperlink=function(){function m(b){for(;b;){if(l.isHyperlink(b))return!0;b=b.parentNode}return!1}var h,b,g,d,p,n=new core.DomUtils,l=new odf.OdfUtils;this.init=function(l){h=l.memberid;b=l.timestamp;g=l.position;d=l.length;p=l.hyperlink};this.isEdit=!0;this.group=void 0;this.execute=function(q){var f=q.getDOMDocument(),r=q.convertCursorToDomRange(g,d),a=n.splitBoundaries(r),c=[],k=l.getTextNodes(r,!1);if(0===k.length)return!1;k.forEach(function(a){var b=l.getParagraphElement(a);runtime.assert(!1===
m(a),"The given range should not contain any link.");var d=p,k=f.createElementNS(odf.Namespaces.textns,"text:a");k.setAttributeNS(odf.Namespaces.xlinkns,"xlink:type","simple");k.setAttributeNS(odf.Namespaces.xlinkns,"xlink:href",d);a.parentNode.insertBefore(k,a);k.appendChild(a);-1===c.indexOf(b)&&c.push(b)});a.forEach(n.normalizeTextNodes);r.detach();q.getOdfCanvas().refreshSize();q.getOdfCanvas().rerenderAnnotations();c.forEach(function(a){q.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,
memberId:h,timeStamp:b})});return!0};this.spec=function(){return{optype:"ApplyHyperlink",memberid:h,timestamp:b,position:g,length:d,hyperlink:p}}};
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
ops.OpInsertImage=function(){var m,h,b,g,d,p,n,l,q=odf.Namespaces.drawns,f=odf.Namespaces.svgns,r=odf.Namespaces.textns,a=odf.Namespaces.xlinkns;this.init=function(a){m=a.memberid;h=a.timestamp;b=a.position;g=a.filename;d=a.frameWidth;p=a.frameHeight;n=a.frameStyleName;l=a.frameName};this.isEdit=!0;this.group=void 0;this.execute=function(c){var k=c.getOdfCanvas(),e=c.getTextNodeAtStep(b,m),u,w;if(!e)return!1;u=e.textNode;w=c.getParagraphElement(u);var e=e.offset!==u.length?u.splitText(e.offset):u.nextSibling,
z=c.getDOMDocument(),x=z.createElementNS(q,"draw:image"),z=z.createElementNS(q,"draw:frame");x.setAttributeNS(a,"xlink:href",g);x.setAttributeNS(a,"xlink:type","simple");x.setAttributeNS(a,"xlink:show","embed");x.setAttributeNS(a,"xlink:actuate","onLoad");z.setAttributeNS(q,"draw:style-name",n);z.setAttributeNS(q,"draw:name",l);z.setAttributeNS(r,"text:anchor-type","as-char");z.setAttributeNS(f,"svg:width",d);z.setAttributeNS(f,"svg:height",p);z.appendChild(x);u.parentNode.insertBefore(z,e);c.emit(ops.OdtDocument.signalStepsInserted,
{position:b,length:1});0===u.length&&u.parentNode.removeChild(u);k.addCssForFrameWithImage(z);k.refreshCSS();c.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:w,memberId:m,timeStamp:h});k.rerenderAnnotations();return!0};this.spec=function(){return{optype:"InsertImage",memberid:m,timestamp:h,filename:g,position:b,frameWidth:d,frameHeight:p,frameStyleName:n,frameName:l}}};
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
ops.OpInsertTable=function(){function m(b,a){var c;if(1===f.length)c=f[0];else if(3===f.length)switch(b){case 0:c=f[0];break;case g-1:c=f[2];break;default:c=f[1]}else c=f[b];if(1===c.length)return c[0];if(3===c.length)switch(a){case 0:return c[0];case d-1:return c[2];default:return c[1]}return c[a]}var h,b,g,d,p,n,l,q,f;this.init=function(m){h=m.memberid;b=m.timestamp;p=m.position;g=m.initialRows;d=m.initialColumns;n=m.tableName;l=m.tableStyleName;q=m.tableColumnStyleName;f=m.tableCellStyleMatrix};
this.isEdit=!0;this.group=void 0;this.execute=function(f){var a=f.getTextNodeAtStep(p),c=f.getRootNode();if(a){var k=f.getDOMDocument(),e=k.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),u=k.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),w,z,x,t;l&&e.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",l);n&&e.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",n);u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:number-columns-repeated",d);q&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",q);e.appendChild(u);for(x=0;x<g;x+=1){u=k.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(t=0;t<d;t+=1)w=k.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(z=m(x,t))&&w.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",z),z=k.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"text:p"),w.appendChild(z),u.appendChild(w);e.appendChild(u)}a=f.getParagraphElement(a.textNode);c.insertBefore(e,a.nextSibling);f.emit(ops.OdtDocument.signalStepsInserted,{position:p,length:d*g+1});f.getOdfCanvas().refreshSize();f.emit(ops.OdtDocument.signalTableAdded,{tableElement:e,memberId:h,timeStamp:b});f.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:h,timestamp:b,position:p,initialRows:g,initialColumns:d,tableName:n,tableStyleName:l,
tableColumnStyleName:q,tableCellStyleMatrix:f}}};
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
ops.OpInsertText=function(){var m,h,b,g,d;this.init=function(p){m=p.memberid;h=p.timestamp;b=p.position;d=p.text;g="true"===p.moveCursor||!0===p.moveCursor};this.isEdit=!0;this.group=void 0;this.execute=function(p){var n,l,q,f=null,r=p.getDOMDocument(),a,c=0,k,e=p.getCursor(m),u;p.upgradeWhitespacesAtPosition(b);if(n=p.getTextNodeAtStep(b)){l=n.textNode;f=l.nextSibling;q=l.parentNode;a=p.getParagraphElement(l);for(u=0;u<d.length;u+=1)if(" "===d[u]&&(0===u||u===d.length-1||" "===d[u-1])||"\t"===d[u])0===
c?(n.offset!==l.length&&(f=l.splitText(n.offset)),0<u&&l.appendData(d.substring(0,u))):c<u&&(c=d.substring(c,u),q.insertBefore(r.createTextNode(c),f)),c=u+1,k=" "===d[u]?"text:s":"text:tab",k=r.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",k),k.appendChild(r.createTextNode(d[u])),q.insertBefore(k,f);0===c?l.insertData(n.offset,d):c<d.length&&(n=d.substring(c),q.insertBefore(r.createTextNode(n),f));q=l.parentNode;f=l.nextSibling;q.removeChild(l);q.insertBefore(l,f);0===l.length&&
l.parentNode.removeChild(l);p.emit(ops.OdtDocument.signalStepsInserted,{position:b,length:d.length});e&&g&&(p.moveCursor(m,b+d.length,0),p.emit(ops.Document.signalCursorMoved,e));0<b&&(1<b&&p.downgradeWhitespacesAtPosition(b-2),p.downgradeWhitespacesAtPosition(b-1));p.downgradeWhitespacesAtPosition(b);p.downgradeWhitespacesAtPosition(b+d.length-1);p.downgradeWhitespacesAtPosition(b+d.length);p.getOdfCanvas().refreshSize();p.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,
timeStamp:h});p.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:m,timestamp:h,position:b,text:d,moveCursor:g}}};
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
ops.OpMoveCursor=function(){var m,h,b,g,d;this.init=function(p){m=p.memberid;h=p.timestamp;b=p.position;g=p.length||0;d=p.selectionType||ops.OdtCursor.RangeSelection};this.isEdit=!1;this.group=void 0;this.execute=function(h){var n=h.getCursor(m),l;if(!n)return!1;l=h.convertCursorToDomRange(b,g);n.setSelectedRange(l,0<=g);n.setSelectionType(d);h.emit(ops.Document.signalCursorMoved,n);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:m,timestamp:h,position:b,length:g,selectionType:d}}};
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
ops.OpRemoveAnnotation=function(){var m,h,b,g,d;this.init=function(p){m=p.memberid;h=p.timestamp;b=parseInt(p.position,10);g=parseInt(p.length,10);d=new core.DomUtils};this.isEdit=!0;this.group=void 0;this.execute=function(h){function m(b){q.parentNode.insertBefore(b,q)}for(var l=h.getIteratorAtPosition(b).container(),q;l.namespaceURI!==odf.Namespaces.officens||"annotation"!==l.localName;)l=l.parentNode;if(null===l)return!1;q=l;l=q.annotationEndElement;h.getOdfCanvas().forgetAnnotations();d.getElementsByTagNameNS(q,
"urn:webodf:names:cursor","cursor").forEach(m);d.getElementsByTagNameNS(q,"urn:webodf:names:cursor","anchor").forEach(m);q.parentNode.removeChild(q);l&&l.parentNode.removeChild(l);h.emit(ops.OdtDocument.signalStepsRemoved,{position:0<b?b-1:b,length:g});h.fixCursorPositions();h.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:m,timestamp:h,position:b,length:g}}};
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
ops.OpRemoveBlob=function(){var m,h,b;this.init=function(g){m=g.memberid;h=g.timestamp;b=g.filename};this.isEdit=!0;this.group=void 0;this.execute=function(g){g.getOdfCanvas().odfContainer().removeBlob(b);return!0};this.spec=function(){return{optype:"RemoveBlob",memberid:m,timestamp:h,filename:b}}};
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
ops.OpRemoveCursor=function(){var m,h;this.init=function(b){m=b.memberid;h=b.timestamp};this.isEdit=!1;this.group=void 0;this.execute=function(b){return b.removeCursor(m)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:m,timestamp:h}}};
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
ops.OpRemoveHyperlink=function(){var m,h,b,g,d=new core.DomUtils,p=new odf.OdfUtils;this.init=function(d){m=d.memberid;h=d.timestamp;b=d.position;g=d.length};this.isEdit=!0;this.group=void 0;this.execute=function(n){var l=n.convertCursorToDomRange(b,g),q=p.getHyperlinkElements(l);runtime.assert(1===q.length,"The given range should only contain a single link.");q=d.mergeIntoParent(q[0]);l.detach();n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:p.getParagraphElement(q),
memberId:m,timeStamp:h});n.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveHyperlink",memberid:m,timestamp:h,position:b,length:g}}};
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
ops.OpRemoveMember=function(){var m,h;this.init=function(b){m=b.memberid;h=parseInt(b.timestamp,10)};this.isEdit=!1;this.group=void 0;this.execute=function(b){if(!b.getMember(m))return!1;b.removeMember(m);b.emit(ops.Document.signalMemberRemoved,m);return!0};this.spec=function(){return{optype:"RemoveMember",memberid:m,timestamp:h}}};
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
ops.OpRemoveStyle=function(){var m,h,b,g;this.init=function(d){m=d.memberid;h=d.timestamp;b=d.styleName;g=d.styleFamily};this.isEdit=!0;this.group=void 0;this.execute=function(d){var h=d.getStyleElement(b,g);if(!h)return!1;h.parentNode.removeChild(h);d.getOdfCanvas().refreshCSS();d.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:b,family:g});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:m,timestamp:h,styleName:b,styleFamily:g}}};
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
ops.OpRemoveText=function(){function m(b){function d(a){return l.hasOwnProperty(a.namespaceURI)||"br"===a.localName&&p.isLineBreak(a.parentNode)||a.nodeType===Node.TEXT_NODE&&l.hasOwnProperty(a.parentNode.namespaceURI)}function g(a){if(p.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(l.hasOwnProperty(a.namespaceURI)||!g(a))return!1;a=a.nextSibling}return!0}function a(c){var k;c.nodeType===Node.TEXT_NODE?(k=c.parentNode,k.removeChild(c)):
k=n.removeUnwantedNodes(c,d);return k&&!p.isParagraph(k)&&k!==b&&g(k)?a(k):k}this.isEmpty=g;this.mergeChildrenIntoParent=a}var h,b,g,d,p,n,l={};this.init=function(m){runtime.assert(0<=m.length,"OpRemoveText only supports positive lengths");h=m.memberid;b=m.timestamp;g=parseInt(m.position,10);d=parseInt(m.length,10);p=new odf.OdfUtils;n=new core.DomUtils;l[odf.Namespaces.dbns]=!0;l[odf.Namespaces.dcns]=!0;l[odf.Namespaces.dr3dns]=!0;l[odf.Namespaces.drawns]=!0;l[odf.Namespaces.chartns]=!0;l[odf.Namespaces.formns]=
!0;l[odf.Namespaces.numberns]=!0;l[odf.Namespaces.officens]=!0;l[odf.Namespaces.presentationns]=!0;l[odf.Namespaces.stylens]=!0;l[odf.Namespaces.svgns]=!0;l[odf.Namespaces.tablens]=!0;l[odf.Namespaces.textns]=!0};this.isEdit=!0;this.group=void 0;this.execute=function(l){var f,r,a,c,k=l.getCursor(h),e=new m(l.getRootNode());l.upgradeWhitespacesAtPosition(g);l.upgradeWhitespacesAtPosition(g+d);r=l.convertCursorToDomRange(g,d);n.splitBoundaries(r);f=l.getParagraphElement(r.startContainer);a=p.getTextElements(r,
!1,!0);c=p.getParagraphElements(r);r.detach();a.forEach(function(a){a.parentNode?e.mergeChildrenIntoParent(a):runtime.log("WARN: text element has already been removed from it's container")});r=c.reduce(function(a,b){var c,d=a,f=b,k,g=null;e.isEmpty(a)&&(b.parentNode!==a.parentNode&&(k=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),f=a,d=b,g=d.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo").item(0)||d.firstChild);for(;f.firstChild;)c=f.firstChild,f.removeChild(c),"editinfo"!==
c.localName&&d.insertBefore(c,g);k&&e.isEmpty(k)&&e.mergeChildrenIntoParent(k);e.mergeChildrenIntoParent(f);return d});l.emit(ops.OdtDocument.signalStepsRemoved,{position:g,length:d});l.downgradeWhitespacesAtPosition(g);l.fixCursorPositions();l.getOdfCanvas().refreshSize();l.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:r||f,memberId:h,timeStamp:b});k&&(k.resetSelectionType(),l.emit(ops.Document.signalCursorMoved,k));l.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",
memberid:h,timestamp:b,position:g,length:d}}};
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
ops.OpSetBlob=function(){var m,h,b,g,d;this.init=function(p){m=p.memberid;h=p.timestamp;b=p.filename;g=p.mimetype;d=p.content};this.isEdit=!0;this.group=void 0;this.execute=function(h){h.getOdfCanvas().odfContainer().setBlob(b,g,d);return!0};this.spec=function(){return{optype:"SetBlob",memberid:m,timestamp:h,filename:b,mimetype:g,content:d}}};
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
ops.OpSetParagraphStyle=function(){var m,h,b,g;this.init=function(d){m=d.memberid;h=d.timestamp;b=d.position;g=d.styleName};this.isEdit=!0;this.group=void 0;this.execute=function(d){var p;p=d.getIteratorAtPosition(b);return(p=d.getParagraphElement(p.container()))?(""!==g?p.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",g):p.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","style-name"),d.getOdfCanvas().refreshSize(),d.emit(ops.OdtDocument.signalParagraphChanged,
{paragraphElement:p,timeStamp:h,memberId:m}),d.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:m,timestamp:h,position:b,styleName:g}}};
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
ops.OpSplitParagraph=function(){var m,h,b,g,d;this.init=function(p){m=p.memberid;h=p.timestamp;b=p.position;g="true"===p.moveCursor||!0===p.moveCursor;d=new odf.OdfUtils};this.isEdit=!0;this.group=void 0;this.execute=function(p){var n,l,q,f,r,a,c,k=p.getCursor(m);p.upgradeWhitespacesAtPosition(b);n=p.getTextNodeAtStep(b);if(!n)return!1;l=p.getParagraphElement(n.textNode);if(!l)return!1;q=d.isListItem(l.parentNode)?l.parentNode:l;0===n.offset?(c=n.textNode.previousSibling,a=null):(c=n.textNode,a=n.offset>=
n.textNode.length?null:n.textNode.splitText(n.offset));for(f=n.textNode;f!==q;){f=f.parentNode;r=f.cloneNode(!1);a&&r.appendChild(a);if(c)for(;c&&c.nextSibling;)r.appendChild(c.nextSibling);else for(;f.firstChild;)r.appendChild(f.firstChild);f.parentNode.insertBefore(r,f.nextSibling);c=f;a=r}d.isListItem(a)&&(a=a.childNodes.item(0));0===n.textNode.length&&n.textNode.parentNode.removeChild(n.textNode);p.emit(ops.OdtDocument.signalStepsInserted,{position:b,length:1});k&&g&&(p.moveCursor(m,b+1,0),p.emit(ops.Document.signalCursorMoved,
k));p.fixCursorPositions();p.getOdfCanvas().refreshSize();p.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:l,memberId:m,timeStamp:h});p.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,timeStamp:h});p.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:m,timestamp:h,position:b,moveCursor:g}}};
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
ops.OpUpdateMember=function(){function m(b){var d="//dc:creator[@editinfo:memberid='"+h+"']";b=xmldom.XPath.getODFElementsWithXPath(b.getRootNode(),d,function(b){return"editinfo"===b?"urn:webodf:names:editinfo":odf.Namespaces.lookupNamespaceURI(b)});for(d=0;d<b.length;d+=1)b[d].textContent=g.fullName}var h,b,g,d;this.init=function(m){h=m.memberid;b=parseInt(m.timestamp,10);g=m.setProperties;d=m.removedProperties};this.isEdit=!1;this.group=void 0;this.execute=function(b){var n=b.getMember(h);if(!n)return!1;
d&&n.removeProperties(d);g&&(n.setProperties(g),g.fullName&&m(b));b.emit(ops.Document.signalMemberUpdated,n);return!0};this.spec=function(){return{optype:"UpdateMember",memberid:h,timestamp:b,setProperties:g,removedProperties:d}}};
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
ops.OpUpdateMetadata=function(){var m,h,b,g;this.init=function(d){m=d.memberid;h=parseInt(d.timestamp,10);b=d.setProperties;g=d.removedProperties};this.isEdit=!0;this.group=void 0;this.execute=function(d){d=d.getOdfCanvas().odfContainer();var h=[];g&&(h=g.attributes.split(","));d.setMetadata(b,h);return!0};this.spec=function(){return{optype:"UpdateMetadata",memberid:m,timestamp:h,setProperties:b,removedProperties:g}}};
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
ops.OpUpdateParagraphStyle=function(){function m(b,d){var f,g,a=d?d.split(","):[];for(f=0;f<a.length;f+=1)g=a[f].split(":"),b.removeAttributeNS(odf.Namespaces.lookupNamespaceURI(g[0]),g[1])}var h,b,g,d,p,n=odf.Namespaces.stylens;this.init=function(l){h=l.memberid;b=l.timestamp;g=l.styleName;d=l.setProperties;p=l.removedProperties};this.isEdit=!0;this.group=void 0;this.execute=function(b){var h=b.getFormatting(),f,r,a;return(f=""!==g?b.getParagraphStyleElement(g):h.getDefaultStyleElement("paragraph"))?
(r=f.getElementsByTagNameNS(n,"paragraph-properties").item(0),a=f.getElementsByTagNameNS(n,"text-properties").item(0),d&&h.updateStyle(f,d),p&&(h=p["style:paragraph-properties"],r&&h&&(m(r,h.attributes),0===r.attributes.length&&f.removeChild(r)),h=p["style:text-properties"],a&&h&&(m(a,h.attributes),0===a.attributes.length&&f.removeChild(a)),m(f,p.attributes)),b.getOdfCanvas().refreshCSS(),b.emit(ops.OdtDocument.signalParagraphStyleModified,g),b.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=
function(){return{optype:"UpdateParagraphStyle",memberid:h,timestamp:b,styleName:g,setProperties:d,removedProperties:p}}};
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
ops.OperationFactory=function(){var m;this.register=function(h,b){m[h]=b};this.create=function(h){var b=null,g=m[h.optype];g&&(b=new g,b.init(h));return b};m={AddMember:ops.OpAddMember,UpdateMember:ops.OpUpdateMember,RemoveMember:ops.OpRemoveMember,AddCursor:ops.OpAddCursor,ApplyDirectStyling:ops.OpApplyDirectStyling,SetBlob:ops.OpSetBlob,RemoveBlob:ops.OpRemoveBlob,InsertImage:ops.OpInsertImage,InsertTable:ops.OpInsertTable,InsertText:ops.OpInsertText,RemoveText:ops.OpRemoveText,SplitParagraph:ops.OpSplitParagraph,
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(m){};ops.OperationRouter.prototype.setPlaybackFunction=function(m){};ops.OperationRouter.prototype.push=function(m){};ops.OperationRouter.prototype.close=function(m){};ops.OperationRouter.prototype.subscribe=function(m,h){};ops.OperationRouter.prototype.unsubscribe=function(m,h){};ops.OperationRouter.prototype.hasLocalUnsyncedOps=function(){};ops.OperationRouter.prototype.hasSessionHostConnection=function(){};
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
ops.TrivialOperationRouter=function(){var m=new core.EventNotifier([ops.OperationRouter.signalProcessingBatchStart,ops.OperationRouter.signalProcessingBatchEnd]),h,b,g=0;this.setOperationFactory=function(b){h=b};this.setPlaybackFunction=function(d){b=d};this.push=function(d){g+=1;m.emit(ops.OperationRouter.signalProcessingBatchStart,{});d.forEach(function(d){d=d.spec();d.timestamp=(new Date).getTime();d=h.create(d);d.group="g"+g;b(d)});m.emit(ops.OperationRouter.signalProcessingBatchEnd,{})};this.close=
function(b){b()};this.subscribe=function(b,g){m.subscribe(b,g)};this.unsubscribe=function(b,g){m.unsubscribe(b,g)};this.hasLocalUnsyncedOps=function(){return!1};this.hasSessionHostConnection=function(){return!0}};
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
ops.Session=function(m){function h(b){d.emit(ops.OdtDocument.signalProcessingBatchStart,b)}function b(b){d.emit(ops.OdtDocument.signalProcessingBatchEnd,b)}var g=new ops.OperationFactory,d=new ops.OdtDocument(m),p=null;this.setOperationFactory=function(b){g=b;p&&p.setOperationFactory(g)};this.setOperationRouter=function(m){p&&(p.unsubscribe(ops.OperationRouter.signalProcessingBatchStart,h),p.unsubscribe(ops.OperationRouter.signalProcessingBatchEnd,b));p=m;p.subscribe(ops.OperationRouter.signalProcessingBatchStart,
h);p.subscribe(ops.OperationRouter.signalProcessingBatchEnd,b);m.setPlaybackFunction(function(b){d.emit(ops.OdtDocument.signalOperationStart,b);return b.execute(d)?(d.emit(ops.OdtDocument.signalOperationEnd,b),!0):!1});m.setOperationFactory(g)};this.getOperationFactory=function(){return g};this.getOdtDocument=function(){return d};this.enqueue=function(b){p.push(b)};this.close=function(b){p.close(function(g){g?b(g):d.close(b)})};this.destroy=function(b){d.destroy(b)};this.setOperationRouter(new ops.TrivialOperationRouter)};
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
gui.AnnotationController=function(m,h){function b(){var b=n.getCursor(h),b=b&&b.getNode(),a=!1;if(b){a:{for(a=n.getRootNode();b&&b!==a;){if(b.namespaceURI===f&&"annotation"===b.localName){b=!0;break a}b=b.parentNode}b=!1}a=!b}a!==l&&(l=a,q.emit(gui.AnnotationController.annotatableChanged,l))}function g(d){d.getMemberId()===h&&b()}function d(d){d===h&&b()}function p(d){d.getMemberId()===h&&b()}var n=m.getOdtDocument(),l=!1,q=new core.EventNotifier([gui.AnnotationController.annotatableChanged]),f=odf.Namespaces.officens;
this.isAnnotatable=function(){return l};this.addAnnotation=function(){var b=new ops.OpAddAnnotation,a=n.getCursorSelection(h),c=a.length,a=a.position;l&&(a=0<=c?a:a+c,c=Math.abs(c),b.init({memberid:h,position:a,length:c,name:h+Date.now()}),m.enqueue([b]))};this.removeAnnotation=function(b){var a,c;a=n.convertDomPointToCursorStep(b,0)+1;c=n.convertDomPointToCursorStep(b,b.childNodes.length);b=new ops.OpRemoveAnnotation;b.init({memberid:h,position:a,length:c-a});c=new ops.OpMoveCursor;c.init({memberid:h,
position:0<a?a-1:a,length:0});m.enqueue([b,c])};this.subscribe=function(b,a){q.subscribe(b,a)};this.unsubscribe=function(b,a){q.unsubscribe(b,a)};this.destroy=function(b){n.unsubscribe(ops.Document.signalCursorAdded,g);n.unsubscribe(ops.Document.signalCursorRemoved,d);n.unsubscribe(ops.Document.signalCursorMoved,p);b()};n.subscribe(ops.Document.signalCursorAdded,g);n.subscribe(ops.Document.signalCursorRemoved,d);n.subscribe(ops.Document.signalCursorMoved,p);b()};
gui.AnnotationController.annotatableChanged="annotatable/changed";(function(){return gui.AnnotationController})();
// Input 75
gui.Avatar=function(m,h){var b=this,g,d,p;this.setColor=function(b){d.style.borderColor=b};this.setImageUrl=function(g){b.isVisible()?d.src=g:p=g};this.isVisible=function(){return"block"===g.style.display};this.show=function(){p&&(d.src=p,p=void 0);g.style.display="block"};this.hide=function(){g.style.display="none"};this.markAsFocussed=function(b){b?g.classList.add("active"):g.classList.remove("active")};this.destroy=function(b){m.removeChild(g);b()};(function(){var b=m.ownerDocument,l=b.documentElement.namespaceURI;
g=b.createElementNS(l,"div");d=b.createElementNS(l,"img");d.width=64;d.height=64;g.appendChild(d);g.style.width="64px";g.style.height="70px";g.style.position="absolute";g.style.top="-80px";g.style.left="-34px";g.style.display=h?"block":"none";g.className="handle";m.appendChild(g)})()};
// Input 76
gui.Caret=function(m,h,b){function g(){q.style.opacity="0"===q.style.opacity?"1":"0";u.trigger()}function d(a,b){var c=a.getBoundingClientRect(),d=0,e=0;c&&b&&(d=Math.max(c.top,b.top),e=Math.min(c.bottom,b.bottom));return e-d}function p(){Object.keys(t).forEach(function(a){v[a]=t[a]})}function n(){var e,k,g,l;if(!1===t.isShown||m.getSelectionType()!==ops.OdtCursor.RangeSelection||!b&&!m.getSelectedRange().collapsed)t.visibility="hidden",q.style.visibility="hidden",u.cancel();else{t.visibility="visible";
q.style.visibility="visible";if(!1===t.isFocused)q.style.opacity="1",u.cancel();else{if(w||v.visibility!==t.visibility)q.style.opacity="1",u.cancel();u.trigger()}if(x||z||v.visibility!==t.visibility){e=m.getSelectedRange().cloneRange();k=m.getNode();var h=null;k.previousSibling&&(g=k.previousSibling.nodeType===Node.TEXT_NODE?k.previousSibling.textContent.length:k.previousSibling.childNodes.length,e.setStart(k.previousSibling,0<g?g-1:0),e.setEnd(k.previousSibling,g),(g=e.getBoundingClientRect())&&
g.height&&(h=g));k.nextSibling&&(e.setStart(k.nextSibling,0),e.setEnd(k.nextSibling,0<(k.nextSibling.nodeType===Node.TEXT_NODE?k.nextSibling.textContent.length:k.nextSibling.childNodes.length)?1:0),(g=e.getBoundingClientRect())&&g.height&&(!h||d(k,g)>d(k,h))&&(h=g));k=h;h=m.getDocument().getCanvas();e=h.getZoomLevel();h=c.getBoundingClientRect(h.getSizer());k?(q.style.top="0",g=c.getBoundingClientRect(q),8>k.height&&(k={top:k.top-(8-k.height)/2,height:8}),q.style.height=c.adaptRangeDifferenceToZoomLevel(k.height,
e)+"px",q.style.top=c.adaptRangeDifferenceToZoomLevel(k.top-g.top,e)+"px"):(q.style.height="1em",q.style.top="5%");a&&(k=runtime.getWindow().getComputedStyle(q,null),g=c.getBoundingClientRect(q),a.style.bottom=c.adaptRangeDifferenceToZoomLevel(h.bottom-g.bottom,e)+"px",a.style.left=c.adaptRangeDifferenceToZoomLevel(g.right-h.left,e)+"px",k.font?a.style.font=k.font:(a.style.fontStyle=k.fontStyle,a.style.fontVariant=k.fontVariant,a.style.fontWeight=k.fontWeight,a.style.fontSize=k.fontSize,a.style.lineHeight=
k.lineHeight,a.style.fontFamily=k.fontFamily))}if(z){var h=m.getDocument().getCanvas().getElement().parentNode,n;g=h.offsetWidth-h.clientWidth+5;l=h.offsetHeight-h.clientHeight+5;n=q.getBoundingClientRect();e=n.left-g;k=n.top-l;g=n.right+g;l=n.bottom+l;n=h.getBoundingClientRect();k<n.top?h.scrollTop-=n.top-k:l>n.bottom&&(h.scrollTop+=l-n.bottom);e<n.left?h.scrollLeft-=n.left-e:g>n.right&&(h.scrollLeft+=g-n.right)}}v.isFocused!==t.isFocused&&f.markAsFocussed(t.isFocused);p();x=z=w=!1}function l(a){r.removeChild(q);
a()}var q,f,r,a,c=new core.DomUtils,k=new core.Async,e,u,w=!1,z=!1,x=!1,t={isFocused:!1,isShown:!0,visibility:"hidden"},v={isFocused:!t.isFocused,isShown:!t.isShown,visibility:"hidden"};this.handleUpdate=function(){x=!0;"hidden"!==t.visibility&&(t.visibility="hidden",q.style.visibility="hidden");e.trigger()};this.refreshCursorBlinking=function(){w=!0;e.trigger()};this.setFocus=function(){t.isFocused=!0;e.trigger()};this.removeFocus=function(){t.isFocused=!1;e.trigger()};this.show=function(){t.isShown=
!0;e.trigger()};this.hide=function(){t.isShown=!1;e.trigger()};this.setAvatarImageUrl=function(a){f.setImageUrl(a)};this.setColor=function(a){q.style.borderColor=a;f.setColor(a)};this.getCursor=function(){return m};this.getFocusElement=function(){return q};this.toggleHandleVisibility=function(){f.isVisible()?f.hide():f.show()};this.showHandle=function(){f.show()};this.hideHandle=function(){f.hide()};this.setOverlayElement=function(b){a=b;x=!0;e.trigger()};this.ensureVisible=function(){z=!0;e.trigger()};
this.destroy=function(a){k.destroyAll([e.destroy,u.destroy,f.destroy,l],a)};(function(){var a=m.getDocument().getDOMDocument();q=a.createElementNS(a.documentElement.namespaceURI,"span");q.className="caret";q.style.top="5%";r=m.getNode();r.appendChild(q);f=new gui.Avatar(r,h);e=new core.ScheduledTask(n,0);u=new core.ScheduledTask(g,500);e.triggerImmediate()})()};
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
odf.TextSerializer=function(){function m(g){var d="",p=h.filter?h.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,n=g.nodeType,l;if((p===NodeFilter.FILTER_ACCEPT||p===NodeFilter.FILTER_SKIP)&&b.isTextContentContainingNode(g))for(l=g.firstChild;l;)d+=m(l),l=l.nextSibling;p===NodeFilter.FILTER_ACCEPT&&(n===Node.ELEMENT_NODE&&b.isParagraph(g)?d+="\n":n===Node.TEXT_NODE&&g.textContent&&(d+=g.textContent));return d}var h=this,b=new odf.OdfUtils;this.filter=null;this.writeToString=function(b){if(!b)return"";
b=m(b);"\n"===b[b.length-1]&&(b=b.substr(0,b.length-1));return b}};
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
gui.MimeDataExporter=function(){var m,h;this.exportRangeToDataTransfer=function(b,g){var d;d=g.startContainer.ownerDocument.createElement("span");d.appendChild(g.cloneContents());d=m.writeToString(d);try{b.setData("text/plain",d)}catch(h){b.setData("Text",d)}};m=new odf.TextSerializer;h=new odf.OdfNodeFilter;m.filter=h};
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
gui.Clipboard=function(m){this.setDataFromRange=function(h,b){var g,d=h.clipboardData;g=runtime.getWindow();!d&&g&&(d=g.clipboardData);d?(g=!0,m.exportRangeToDataTransfer(d,b),h.preventDefault()):g=!1;return g}};
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
gui.StyleSummary=function(m){function h(b,g){var h=b+"|"+g,q;d.hasOwnProperty(h)||(q=[],m.forEach(function(d){d=(d=d[b])&&d[g];-1===q.indexOf(d)&&q.push(d)}),d[h]=q);return d[h]}function b(b,d,g){return function(){var m=h(b,d);return g.length>=m.length&&m.every(function(b){return-1!==g.indexOf(b)})}}function g(b,d){var g=h(b,d);return 1===g.length?g[0]:void 0}var d={};this.getPropertyValues=h;this.getCommonValue=g;this.isBold=b("style:text-properties","fo:font-weight",["bold"]);this.isItalic=b("style:text-properties",
"fo:font-style",["italic"]);this.hasUnderline=b("style:text-properties","style:text-underline-style",["solid"]);this.hasStrikeThrough=b("style:text-properties","style:text-line-through-style",["solid"]);this.fontSize=function(){var b=g("style:text-properties","fo:font-size");return b&&parseFloat(b)};this.fontName=function(){return g("style:text-properties","style:font-name")};this.isAlignedLeft=b("style:paragraph-properties","fo:text-align",["left","start"]);this.isAlignedCenter=b("style:paragraph-properties",
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
gui.DirectFormattingController=function(m,h,b,g){function d(a){var b;a.collapsed?(b=a.startContainer,b.hasChildNodes()&&a.startOffset<b.childNodes.length&&(b=b.childNodes.item(a.startOffset)),a=[b]):a=K.getTextNodes(a,!0);return a}function p(a,b){var c={};Object.keys(a).forEach(function(d){var e=a[d](),f=b[d]();e!==f&&(c[d]=f)});return c}function n(){var a,b,c;a=(a=(a=F.getCursor(h))&&a.getSelectedRange())?d(a):[];a=F.getFormatting().getAppliedStyles(a);a[0]&&G&&(a[0]=O.mergeObjects(a[0],G));S=a;
c=new gui.StyleSummary(S);a=p(y.text,c.text);b=p(y.paragraph,c.paragraph);y=c;0<Object.keys(a).length&&Z.emit(gui.DirectFormattingController.textStylingChanged,a);0<Object.keys(b).length&&Z.emit(gui.DirectFormattingController.paragraphStylingChanged,b)}function l(a){("string"===typeof a?a:a.getMemberId())===h&&n()}function q(){n()}function f(a){var b=F.getCursor(h);a=a.paragraphElement;b&&F.getParagraphElement(b.getNode())===a&&n()}function r(a,b){b(!a());return!0}function a(a){var b=F.getCursorSelection(h),
c={"style:text-properties":a};0!==b.length?(a=new ops.OpApplyDirectStyling,a.init({memberid:h,position:b.position,length:b.length,setProperties:c}),m.enqueue([a])):(G=O.mergeObjects(G||{},c),n())}function c(b,c){var d={};d[b]=c;a(d)}function k(a){a=a.spec();G&&a.memberid===h&&"SplitParagraph"!==a.optype&&(G=null,n())}function e(a){c("fo:font-weight",a?"bold":"normal")}function u(a){c("fo:font-style",a?"italic":"normal")}function w(a){c("style:text-underline-style",a?"solid":"none")}function z(a){c("style:text-line-through-style",
a?"solid":"none")}function x(a){return a===ops.StepsTranslator.NEXT_STEP}function t(a){var c=F.getCursor(h).getSelectedRange(),c=K.getParagraphElements(c),d=F.getFormatting(),e=[],f={},k;c.forEach(function(c){var g=F.convertDomPointToCursorStep(c,0,x),l=c.getAttributeNS(odf.Namespaces.textns,"style-name"),m;c=l?f.hasOwnProperty(l)?f[l]:void 0:k;c||(c=b.generateStyleName(),l?(f[l]=c,m=d.createDerivedStyleObject(l,"paragraph",{})):(k=c,m={}),m=a(m),l=new ops.OpAddStyle,l.init({memberid:h,styleName:c.toString(),
styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:m}),e.push(l));l=new ops.OpSetParagraphStyle;l.init({memberid:h,styleName:c.toString(),position:g});e.push(l)});m.enqueue(e)}function v(a){t(function(b){return O.mergeObjects(b,a)})}function s(a){v({"style:paragraph-properties":{"fo:text-align":a}})}function C(a,b){var c=F.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],e;d&&(d=d["fo:margin-left"])&&(e=K.parseLength(d));return O.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":e&&
e.unit===c.unit?e.value+a*c.value+e.unit:a*c.value+c.unit}})}function I(a,b){var c=d(a),e=F.getFormatting().getAppliedStyles(c)[0],f=F.getFormatting().getAppliedStylesForElement(b);if(!e||"text"!==e["style:family"]||!e["style:text-properties"])return!1;if(!f||!f["style:text-properties"])return!0;e=e["style:text-properties"];f=f["style:text-properties"];return!Object.keys(e).every(function(a){return e[a]===f[a]})}function H(){}var D=this,F=m.getOdtDocument(),O=new core.Utils,K=new odf.OdfUtils,Z=new core.EventNotifier([gui.DirectFormattingController.textStylingChanged,
gui.DirectFormattingController.paragraphStylingChanged]),Q=odf.Namespaces.textns,X=core.PositionFilter.FilterResult.FILTER_ACCEPT,G,S=[],y=new gui.StyleSummary(S);this.formatTextSelection=a;this.createCursorStyleOp=function(a,b,c){var d=null;(c=c?S[0]:G)&&c["style:text-properties"]&&(d=new ops.OpApplyDirectStyling,d.init({memberid:h,position:a,length:b,setProperties:{"style:text-properties":c["style:text-properties"]}}),G=null,n());return d};this.setBold=e;this.setItalic=u;this.setHasUnderline=w;
this.setHasStrikethrough=z;this.setFontSize=function(a){c("fo:font-size",a+"pt")};this.setFontName=function(a){c("style:font-name",a)};this.getAppliedStyles=function(){return S};this.toggleBold=r.bind(D,function(){return y.isBold()},e);this.toggleItalic=r.bind(D,function(){return y.isItalic()},u);this.toggleUnderline=r.bind(D,function(){return y.hasUnderline()},w);this.toggleStrikethrough=r.bind(D,function(){return y.hasStrikeThrough()},z);this.isBold=function(){return y.isBold()};this.isItalic=function(){return y.isItalic()};
this.hasUnderline=function(){return y.hasUnderline()};this.hasStrikeThrough=function(){return y.hasStrikeThrough()};this.fontSize=function(){return y.fontSize()};this.fontName=function(){return y.fontName()};this.isAlignedLeft=function(){return y.isAlignedLeft()};this.isAlignedCenter=function(){return y.isAlignedCenter()};this.isAlignedRight=function(){return y.isAlignedRight()};this.isAlignedJustified=function(){return y.isAlignedJustified()};this.alignParagraphLeft=function(){s("left");return!0};
this.alignParagraphCenter=function(){s("center");return!0};this.alignParagraphRight=function(){s("right");return!0};this.alignParagraphJustified=function(){s("justify");return!0};this.indent=function(){t(C.bind(null,1));return!0};this.outdent=function(){t(C.bind(null,-1));return!0};this.createParagraphStyleOps=function(a){var c=F.getCursor(h),d=c.getSelectedRange(),e=[],f,k;c.hasForwardSelection()?(f=c.getAnchorNode(),k=c.getNode()):(f=c.getNode(),k=c.getAnchorNode());c=F.getParagraphElement(k);runtime.assert(Boolean(c),
"DirectFormattingController: Cursor outside paragraph");var g;a:{g=c;var l=gui.SelectionMover.createPositionIterator(g),m=new core.PositionFilterChain;m.addFilter(F.getPositionFilter());m.addFilter(F.createRootFilter(h));for(l.setUnfilteredPosition(d.endContainer,d.endOffset);l.nextPosition();)if(m.acceptPosition(l)===X){g=F.getParagraphElement(l.getCurrentNode())!==g;break a}g=!0}if(!g)return e;k!==f&&(c=F.getParagraphElement(f));if(!G&&!I(d,c))return e;d=S[0];if(!d)return e;if(f=c.getAttributeNS(Q,
"style-name"))d={"style:text-properties":d["style:text-properties"]},d=F.getFormatting().createDerivedStyleObject(f,"paragraph",d);c=b.generateStyleName();f=new ops.OpAddStyle;f.init({memberid:h,styleName:c,styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:d});e.push(f);f=new ops.OpSetParagraphStyle;f.init({memberid:h,styleName:c,position:a});e.push(f);return e};this.subscribe=function(a,b){Z.subscribe(a,b)};this.unsubscribe=function(a,b){Z.unsubscribe(a,b)};this.destroy=function(a){F.unsubscribe(ops.Document.signalCursorAdded,
l);F.unsubscribe(ops.Document.signalCursorRemoved,l);F.unsubscribe(ops.Document.signalCursorMoved,l);F.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,q);F.unsubscribe(ops.OdtDocument.signalParagraphChanged,f);F.unsubscribe(ops.OdtDocument.signalOperationEnd,k);a()};(function(){F.subscribe(ops.Document.signalCursorAdded,l);F.subscribe(ops.Document.signalCursorRemoved,l);F.subscribe(ops.Document.signalCursorMoved,l);F.subscribe(ops.OdtDocument.signalParagraphStyleModified,q);F.subscribe(ops.OdtDocument.signalParagraphChanged,
f);F.subscribe(ops.OdtDocument.signalOperationEnd,k);n();g||(D.alignParagraphCenter=H,D.alignParagraphJustified=H,D.alignParagraphLeft=H,D.alignParagraphRight=H,D.createParagraphStyleOps=function(){return[]},D.indent=H,D.outdent=H)})()};gui.DirectFormattingController.textStylingChanged="textStyling/changed";gui.DirectFormattingController.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectFormattingController})();
// Input 82
gui.HyperlinkClickHandler=function(m){function h(){m().removeAttributeNS("urn:webodf:names:helper","links")}function b(){m().setAttributeNS("urn:webodf:names:helper","links","inactive")}var g=gui.HyperlinkClickHandler.Modifier.None,d=gui.HyperlinkClickHandler.Modifier.Ctrl,p=gui.HyperlinkClickHandler.Modifier.Meta,n=new odf.OdfUtils,l=xmldom.XPath,q=g;this.handleClick=function(b){var h=b.target||b.srcElement,a,c;b.ctrlKey?a=d:b.metaKey&&(a=p);if(q===g||q===a){a:{for(;null!==h;){if(n.isHyperlink(h))break a;
if(n.isParagraph(h))break;h=h.parentNode}h=null}h&&(h=n.getHyperlinkTarget(h),""!==h&&("#"===h[0]?(h=h.substring(1),a=m(),c=l.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+h+"']",odf.Namespaces.lookupNamespaceURI),0===c.length&&(c=l.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+h+"']",odf.Namespaces.lookupNamespaceURI)),0<c.length&&c[0].scrollIntoView(!0)):runtime.getWindow().open(h),b.preventDefault?b.preventDefault():b.returnValue=!1))}};this.showPointerCursor=h;this.showTextCursor=
b;this.setModifier=function(d){q=d;q!==g?b():h()}};gui.HyperlinkClickHandler.Modifier={None:0,Ctrl:1,Meta:2};
// Input 83
gui.HyperlinkController=function(m,h){var b=new odf.OdfUtils,g=m.getOdtDocument();this.addHyperlink=function(b,p){var n=g.getCursorSelection(h),l=new ops.OpApplyHyperlink,q=[];if(0===n.length||p)p=p||b,l=new ops.OpInsertText,l.init({memberid:h,position:n.position,text:p}),n.length=p.length,q.push(l);l=new ops.OpApplyHyperlink;l.init({memberid:h,position:n.position,length:n.length,hyperlink:b});q.push(l);m.enqueue(q)};this.removeHyperlinks=function(){var d=gui.SelectionMover.createPositionIterator(g.getRootNode()),
p=g.getCursor(h).getSelectedRange(),n=b.getHyperlinkElements(p),l=p.collapsed&&1===n.length,q=g.getDOMDocument().createRange(),f=[],r,a;0!==n.length&&(n.forEach(function(b){q.selectNodeContents(b);r=g.convertDomToCursorRange({anchorNode:q.startContainer,anchorOffset:q.startOffset,focusNode:q.endContainer,focusOffset:q.endOffset});a=new ops.OpRemoveHyperlink;a.init({memberid:h,position:r.position,length:r.length});f.push(a)}),l||(l=n[0],-1===p.comparePoint(l,0)&&(q.setStart(l,0),q.setEnd(p.startContainer,
p.startOffset),r=g.convertDomToCursorRange({anchorNode:q.startContainer,anchorOffset:q.startOffset,focusNode:q.endContainer,focusOffset:q.endOffset}),0<r.length&&(a=new ops.OpApplyHyperlink,a.init({memberid:h,position:r.position,length:r.length,hyperlink:b.getHyperlinkTarget(l)}),f.push(a))),n=n[n.length-1],d.moveToEndOfNode(n),d=d.unfilteredDomOffset(),1===p.comparePoint(n,d)&&(q.setStart(p.endContainer,p.endOffset),q.setEnd(n,d),r=g.convertDomToCursorRange({anchorNode:q.startContainer,anchorOffset:q.startOffset,
focusNode:q.endContainer,focusOffset:q.endOffset}),0<r.length&&(a=new ops.OpApplyHyperlink,a.init({memberid:h,position:r.position,length:r.length,hyperlink:b.getHyperlinkTarget(n)}),f.push(a)))),m.enqueue(f),q.detach())}};
// Input 84
gui.EventManager=function(m){function h(){var a=this,b=[];this.filters=[];this.handlers=[];this.handleEvent=function(c){-1===b.indexOf(c)&&(b.push(c),a.filters.every(function(a){return a(c)})&&a.handlers.forEach(function(a){a(c)}),runtime.setTimeout(function(){b.splice(b.indexOf(c),1)},0))}}function b(a){var b=a.scrollX,c=a.scrollY;this.restore=function(){a.scrollX===b&&a.scrollY===c||a.scrollTo(b,c)}}function g(a){var b=a.scrollTop,c=a.scrollLeft;this.restore=function(){if(a.scrollTop!==b||a.scrollLeft!==
c)a.scrollTop=b,a.scrollLeft=c}}function d(a,b,c){var d="on"+b,k=!1;a.attachEvent&&(a.attachEvent(d,c),k=!0);!k&&a.addEventListener&&(a.addEventListener(b,c,!1),k=!0);k&&!f[b]||!a.hasOwnProperty(d)||(a[d]=c)}function p(b,f){var g=a[b]||null;!g&&f&&(g=a[b]=new h,r[b]&&d(q,b,g.handleEvent),d(c,b,g.handleEvent),d(k,b,g.handleEvent));return g}function n(){return m.getDOMDocument().activeElement===c}function l(a){for(var c=[];a;)(a.scrollWidth>a.clientWidth||a.scrollHeight>a.clientHeight)&&c.push(new g(a)),
a=a.parentNode;c.push(new b(q));return c}var q=runtime.getWindow(),f={beforecut:!0,beforepaste:!0},r={mousedown:!0,mouseup:!0,focus:!0},a={},c,k=m.getCanvas().getElement();this.addFilter=function(a,b){p(a,!0).filters.push(b)};this.removeFilter=function(a,b){var c=p(a,!0),d=c.filters.indexOf(b);-1!==d&&c.filters.splice(d,1)};this.subscribe=function(a,b){p(a,!0).handlers.push(b)};this.unsubscribe=function(a,b){var c=p(a,!1),d=c&&c.handlers.indexOf(b);c&&-1!==d&&c.handlers.splice(d,1)};this.hasFocus=
n;this.focus=function(){var a;n()||(a=l(c),c.focus(),a.forEach(function(a){a.restore()}))};this.getEventTrap=function(){return c};this.blur=function(){n()&&c.blur()};this.destroy=function(a){c.parentNode.removeChild(c);a()};(function(){var a=m.getOdfCanvas().getSizer(),b=a.ownerDocument;runtime.assert(Boolean(q),"EventManager requires a window object to operate correctly");c=b.createElement("input");c.id="eventTrap";c.setAttribute("tabindex",-1);a.appendChild(c)})()};
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
gui.IOSSafariSupport=function(m){function h(){b.innerHeight!==b.outerHeight&&(g.style.display="none",runtime.requestAnimationFrame(function(){g.style.display="block"}))}var b=runtime.getWindow(),g=m.getEventTrap();this.destroy=function(b){m.unsubscribe("focus",h);g.removeAttribute("autocapitalize");g.style.WebkitTransform="";b()};m.subscribe("focus",h);g.setAttribute("autocapitalize","off");g.style.WebkitTransform="translateX(-10000px)"};
// Input 86
gui.ImageController=function(m,h,b){var g={"image/gif":".gif","image/jpeg":".jpg","image/png":".png"},d=odf.Namespaces.textns,p=m.getOdtDocument(),n=p.getFormatting(),l={};this.insertImage=function(q,f,r,a){var c;runtime.assert(0<r&&0<a,"Both width and height of the image should be greater than 0px.");c=p.getParagraphElement(p.getCursor(h).getNode()).getAttributeNS(d,"style-name");l.hasOwnProperty(c)||(l[c]=n.getContentSize(c,"paragraph"));c=l[c];r*=0.0264583333333334;a*=0.0264583333333334;var k=
1,e=1;r>c.width&&(k=c.width/r);a>c.height&&(e=c.height/a);k=Math.min(k,e);c=r*k;r=a*k;e=p.getOdfCanvas().odfContainer().rootElement.styles;a=q.toLowerCase();var k=g.hasOwnProperty(a)?g[a]:null,u;a=[];runtime.assert(null!==k,"Image type is not supported: "+q);k="Pictures/"+b.generateImageName()+k;u=new ops.OpSetBlob;u.init({memberid:h,filename:k,mimetype:q,content:f});a.push(u);n.getStyleElement("Graphics","graphic",[e])||(q=new ops.OpAddStyle,q.init({memberid:h,styleName:"Graphics",styleFamily:"graphic",
isAutomaticStyle:!1,setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph","svg:x":"0cm","svg:y":"0cm","style:wrap":"dynamic","style:number-wrapped-paragraphs":"no-limit","style:wrap-contour":"false","style:vertical-pos":"top","style:vertical-rel":"paragraph","style:horizontal-pos":"center","style:horizontal-rel":"paragraph"}}}),a.push(q));q=b.generateStyleName();f=new ops.OpAddStyle;f.init({memberid:h,styleName:q,styleFamily:"graphic",isAutomaticStyle:!0,setProperties:{"style:parent-style-name":"Graphics",
"style:graphic-properties":{"style:vertical-pos":"top","style:vertical-rel":"baseline","style:horizontal-pos":"center","style:horizontal-rel":"paragraph","fo:background-color":"transparent","style:background-transparency":"100%","style:shadow":"none","style:mirror":"none","fo:clip":"rect(0cm, 0cm, 0cm, 0cm)","draw:luminance":"0%","draw:contrast":"0%","draw:red":"0%","draw:green":"0%","draw:blue":"0%","draw:gamma":"100%","draw:color-inversion":"false","draw:image-opacity":"100%","draw:color-mode":"standard"}}});
a.push(f);u=new ops.OpInsertImage;u.init({memberid:h,position:p.getCursorPosition(h),filename:k,frameWidth:c+"cm",frameHeight:r+"cm",frameStyleName:q,frameName:b.generateFrameName()});a.push(u);m.enqueue(a)}};
// Input 87
gui.ImageSelector=function(m){function h(){var b=m.getSizer(),h=d.createElement("div");h.id="imageSelector";h.style.borderWidth="1px";b.appendChild(h);g.forEach(function(b){var f=d.createElement("div");f.className=b;h.appendChild(f)});return h}var b=odf.Namespaces.svgns,g="topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(" "),d=m.getElement().ownerDocument,p=!1;this.select=function(g){var l,q,f=d.getElementById("imageSelector");f||(f=h());p=!0;l=f.parentNode;
q=g.getBoundingClientRect();var r=l.getBoundingClientRect(),a=m.getZoomLevel();l=(q.left-r.left)/a-1;q=(q.top-r.top)/a-1;f.style.display="block";f.style.left=l+"px";f.style.top=q+"px";f.style.width=g.getAttributeNS(b,"width");f.style.height=g.getAttributeNS(b,"height")};this.clearSelection=function(){var b;p&&(b=d.getElementById("imageSelector"))&&(b.style.display="none");p=!1};this.isSelectorElement=function(b){var g=d.getElementById("imageSelector");return g?b===g||b.parentNode===g:!1}};
// Input 88
(function(){function m(h){function b(b){n=b.which&&String.fromCharCode(b.which)===m;m=void 0;return!1===n}function g(){n=!1}function d(b){m=b.data;n=!1}var m,n=!1;this.destroy=function(l){h.unsubscribe("textInput",g);h.unsubscribe("compositionend",d);h.removeFilter("keypress",b);l()};h.subscribe("textInput",g);h.subscribe("compositionend",d);h.addFilter("keypress",b)}gui.InputMethodEditor=function(h,b){function g(a){k&&(a?k.getNode().setAttributeNS(c,"composing","true"):(k.getNode().removeAttributeNS(c,
"composing"),w.textContent=""))}function d(){v&&(v=!1,g(!1),C.emit(gui.InputMethodEditor.signalCompositionEnd,{data:s}),s="")}function p(){d();k&&k.getSelectedRange().collapsed?e.value="":e.value=x;e.setSelectionRange(0,e.value.length)}function n(){I=void 0;t.cancel();g(!0);v||C.emit(gui.InputMethodEditor.signalCompositionStart,{data:""})}function l(a){a=I=a.data;v=!0;s+=a;t.trigger()}function q(a){a.data!==I&&(a=a.data,v=!0,s+=a,t.trigger());I=void 0}function f(){w.textContent=e.value}function r(){b.blur();
e.setAttribute("disabled",!0)}function a(){var a=b.hasFocus();a&&b.blur();F?e.removeAttribute("disabled"):e.setAttribute("disabled",!0);a&&b.focus()}var c="urn:webodf:names:cursor",k=null,e=b.getEventTrap(),u=e.ownerDocument,w,z=new core.Async,x="b",t,v=!1,s="",C=new core.EventNotifier([gui.InputMethodEditor.signalCompositionStart,gui.InputMethodEditor.signalCompositionEnd]),I,H=[],D,F=!1;this.subscribe=C.subscribe;this.unsubscribe=C.unsubscribe;this.registerCursor=function(a){a.getMemberId()===h&&
(k=a,k.getNode().appendChild(w),b.subscribe("input",f),b.subscribe("compositionupdate",f))};this.removeCursor=function(a){k&&a===h&&(k.getNode().removeChild(w),b.unsubscribe("input",f),b.unsubscribe("compositionupdate",f),k=null)};this.setEditing=function(b){F=b;a()};this.destroy=function(c){b.unsubscribe("compositionstart",n);b.unsubscribe("compositionend",l);b.unsubscribe("textInput",q);b.unsubscribe("keypress",d);b.unsubscribe("mousedown",r);b.unsubscribe("mouseup",a);b.unsubscribe("focus",p);
z.destroyAll(D,c)};(function(){b.subscribe("compositionstart",n);b.subscribe("compositionend",l);b.subscribe("textInput",q);b.subscribe("keypress",d);b.subscribe("mousedown",r);b.subscribe("mouseup",a);b.subscribe("focus",p);H.push(new m(b));D=H.map(function(a){return a.destroy});w=u.createElement("span");w.setAttribute("id","composer");t=new core.ScheduledTask(p,1);D.push(t.destroy)})()};gui.InputMethodEditor.signalCompositionStart="input/compositionstart";gui.InputMethodEditor.signalCompositionEnd=
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
gui.KeyboardHandler=function(){function m(b,g){g||(g=h.None);return b+":"+g}var h=gui.KeyboardHandler.Modifier,b=null,g={};this.setDefault=function(d){b=d};this.bind=function(b,h,n,l){b=m(b,h);runtime.assert(l||!1===g.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);g[b]=n};this.unbind=function(b,h){var n=m(b,h);delete g[n]};this.reset=function(){b=null;g={}};this.handleEvent=function(d){var p=d.keyCode,n=h.None;d.metaKey&&(n|=h.Meta);d.ctrlKey&&(n|=h.Ctrl);d.altKey&&
(n|=h.Alt);d.shiftKey&&(n|=h.Shift);p=m(p,n);p=g[p];n=!1;p?n=p():null!==b&&(n=b(d));n&&(d.preventDefault?d.preventDefault():d.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,CtrlAlt:6,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};
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
gui.PlainTextPasteboard=function(m,h){function b(b,d){b.init(d);return b}this.createPasteOps=function(g){var d=m.getCursorPosition(h),p=d,n=[];g.replace(/\r/g,"").split("\n").forEach(function(d){n.push(b(new ops.OpSplitParagraph,{memberid:h,position:p,moveCursor:!0}));p+=1;n.push(b(new ops.OpInsertText,{memberid:h,position:p,text:d,moveCursor:!0}));p+=d.length});n.push(b(new ops.OpRemoveText,{memberid:h,position:d,length:1}));return n}};
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
odf.WordBoundaryFilter=function(m,h){function b(a,b,c){for(var d=null,f=m.getRootNode(),k;a!==f&&null!==a&&null===d;)k=0>b?a.previousSibling:a.nextSibling,c(k)===NodeFilter.FILTER_ACCEPT&&(d=k),a=a.parentNode;return d}function g(a,b){var c;return null===a?k.NO_NEIGHBOUR:n.isCharacterElement(a)?k.SPACE_CHAR:a.nodeType===d||n.isTextSpan(a)||n.isHyperlink(a)?(c=a.textContent.charAt(b()),q.test(c)?k.SPACE_CHAR:l.test(c)?k.PUNCTUATION_CHAR:k.WORD_CHAR):k.OTHER}var d=Node.TEXT_NODE,p=Node.ELEMENT_NODE,
n=new odf.OdfUtils,l=/[!-#%-*,-\/:-;?-@\[-\]_{}\u00a1\u00ab\u00b7\u00bb\u00bf;\u00b7\u055a-\u055f\u0589-\u058a\u05be\u05c0\u05c3\u05c6\u05f3-\u05f4\u0609-\u060a\u060c-\u060d\u061b\u061e-\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0964-\u0965\u0970\u0df4\u0e4f\u0e5a-\u0e5b\u0f04-\u0f12\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u104a-\u104f\u10fb\u1361-\u1368\u166d-\u166e\u169b-\u169c\u16eb-\u16ed\u1735-\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944-\u1945\u19de-\u19df\u1a1e-\u1a1f\u1b5a-\u1b60\u1c3b-\u1c3f\u1c7e-\u1c7f\u2000-\u206e\u207d-\u207e\u208d-\u208e\u3008-\u3009\u2768-\u2775\u27c5-\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc-\u29fd\u2cf9-\u2cfc\u2cfe-\u2cff\u2e00-\u2e7e\u3000-\u303f\u30a0\u30fb\ua60d-\ua60f\ua673\ua67e\ua874-\ua877\ua8ce-\ua8cf\ua92e-\ua92f\ua95f\uaa5c-\uaa5f\ufd3e-\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a-\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a-\uff1b\uff1f-\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]|\ud800[\udd00-\udd01\udf9f\udfd0]|\ud802[\udd1f\udd3f\ude50-\ude58]|\ud809[\udc00-\udc7e]/,
q=/\s/,f=core.PositionFilter.FilterResult.FILTER_ACCEPT,r=core.PositionFilter.FilterResult.FILTER_REJECT,a=odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,c=odf.WordBoundaryFilter.IncludeWhitespace.LEADING,k={NO_NEIGHBOUR:0,SPACE_CHAR:1,PUNCTUATION_CHAR:2,WORD_CHAR:3,OTHER:4};this.acceptPosition=function(d){var l=d.container(),m=d.leftNode(),n=d.rightNode(),q=d.unfilteredDomOffset,t=function(){return d.unfilteredDomOffset()-1};l.nodeType===p&&(null===n&&(n=b(l,1,d.getNodeFilter())),null===m&&(m=
b(l,-1,d.getNodeFilter())));l!==n&&(q=function(){return 0});l!==m&&null!==m&&(t=function(){return m.textContent.length-1});l=g(m,t);n=g(n,q);return l===k.WORD_CHAR&&n===k.WORD_CHAR||l===k.PUNCTUATION_CHAR&&n===k.PUNCTUATION_CHAR||h===a&&l!==k.NO_NEIGHBOUR&&n===k.SPACE_CHAR||h===c&&l===k.SPACE_CHAR&&n!==k.NO_NEIGHBOUR?r:f}};odf.WordBoundaryFilter.IncludeWhitespace={None:0,TRAILING:1,LEADING:2};(function(){return odf.WordBoundaryFilter})();
// Input 92
gui.SelectionController=function(m,h){function b(){var a=x.getCursor(h).getNode();return x.createStepIterator(a,0,[s,I],x.getRootElement(a))}function g(a,b,c){c=new odf.WordBoundaryFilter(x,c);return x.createStepIterator(a,b,[s,I,c],x.getRootElement(a))}function d(a){return function(b){var c=a(b);return function(b,d){return a(d)===c}}}function p(a,b){return b?{anchorNode:a.startContainer,anchorOffset:a.startOffset,focusNode:a.endContainer,focusOffset:a.endOffset}:{anchorNode:a.endContainer,anchorOffset:a.endOffset,
focusNode:a.startContainer,focusOffset:a.startOffset}}function n(a,b,c){var d=new ops.OpMoveCursor;d.init({memberid:h,position:a,length:b||0,selectionType:c});return d}function l(a){var b;b=g(a.startContainer,a.startOffset,H);b.roundToPreviousStep()&&a.setStart(b.container(),b.offset());b=g(a.endContainer,a.endOffset,D);b.roundToNextStep()&&a.setEnd(b.container(),b.offset())}function q(a){var b=v.getParagraphElements(a),c=b[0],b=b[b.length-1];c&&a.setStart(c,0);b&&(v.isParagraph(a.endContainer)&&
0===a.endOffset?a.setEndBefore(b):a.setEnd(b,b.childNodes.length))}function f(a){var b=x.getCursorSelection(h),c=x.getCursor(h).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,C,s):-c.convertBackwardStepsBetweenFilters(-a,C,s),a=b.length+a,m.enqueue([n(b.position,a)]))}function r(a){var c=b(),d=x.getCursor(h).getAnchorNode();a(c)&&(a=x.convertDomToCursorRange({anchorNode:d,anchorOffset:0,focusNode:c.container(),focusOffset:c.offset()}),m.enqueue([n(a.position,a.length)]))}function a(a){var b=
x.getCursorPosition(h),c=x.getCursor(h).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,C,s):-c.convertBackwardStepsBetweenFilters(-a,C,s),m.enqueue([n(b+a,0)]))}function c(a){var c=b();a(c)&&(a=x.convertDomPointToCursorStep(c.container(),c.offset()),m.enqueue([n(a,0)]))}function k(b,c){var d=x.getParagraphElement(x.getCursor(h).getNode());runtime.assert(Boolean(d),"SelectionController: Cursor outside paragraph");d=x.getCursor(h).getStepCounter().countLinesSteps(b,C);c?f(d):a(d)}
function e(b,c){var d=x.getCursor(h).getStepCounter().countStepsToLineBoundary(b,C);c?f(d):a(d)}function u(a,b){var c=x.getCursor(h),c=p(c.getSelectedRange(),c.hasForwardSelection()),d=g(c.focusNode,c.focusOffset,H);if(0<=a?d.nextStep():d.previousStep())c.focusNode=d.container(),c.focusOffset=d.offset(),b||(c.anchorNode=c.focusNode,c.anchorOffset=c.focusOffset),c=x.convertDomToCursorRange(c),m.enqueue([n(c.position,c.length)])}function w(a,b){var c=x.getCursor(h),e=b(c.getNode()),c=p(c.getSelectedRange(),
c.hasForwardSelection());runtime.assert(Boolean(e),"SelectionController: Cursor outside root");0>a?(c.focusNode=e,c.focusOffset=0):(c.focusNode=e,c.focusOffset=e.childNodes.length);e=x.convertDomToCursorRange(c,d(b));m.enqueue([n(e.position,e.length)])}function z(a){var b=x.getCursor(h),b=x.getRootElement(b.getNode());runtime.assert(Boolean(b),"SelectionController: Cursor outside root");a=0>a?x.convertDomPointToCursorStep(b,0,function(a){return a===ops.StepsTranslator.NEXT_STEP}):x.convertDomPointToCursorStep(b,
b.childNodes.length);m.enqueue([n(a,0)]);return!0}var x=m.getOdtDocument(),t=new core.DomUtils,v=new odf.OdfUtils,s=x.getPositionFilter(),C=new core.PositionFilterChain,I=x.createRootFilter(h),H=odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,D=odf.WordBoundaryFilter.IncludeWhitespace.LEADING;this.selectionToRange=function(a){var b=0<=t.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset),c=a.focusNode.ownerDocument.createRange();b?(c.setStart(a.anchorNode,a.anchorOffset),c.setEnd(a.focusNode,
a.focusOffset)):(c.setStart(a.focusNode,a.focusOffset),c.setEnd(a.anchorNode,a.anchorOffset));return{range:c,hasForwardSelection:b}};this.rangeToSelection=p;this.selectImage=function(a){var b=x.getRootElement(a),c=x.createRootFilter(b),b=x.createStepIterator(a,0,[c,x.getPositionFilter()],b),d;b.roundToPreviousStep()||runtime.assert(!1,"No walkable position before frame");c=b.container();d=b.offset();b.setPosition(a,a.childNodes.length);b.roundToNextStep()||runtime.assert(!1,"No walkable position after frame");
a=x.convertDomToCursorRange({anchorNode:c,anchorOffset:d,focusNode:b.container(),focusOffset:b.offset()});a=n(a.position,a.length,ops.OdtCursor.RegionSelection);m.enqueue([a])};this.expandToWordBoundaries=l;this.expandToParagraphBoundaries=q;this.selectRange=function(a,b,c){var e=x.getOdfCanvas().getElement(),f;f=t.containsNode(e,a.startContainer);e=t.containsNode(e,a.endContainer);if(f||e)if(f&&e&&(2===c?l(a):3<=c&&q(a)),a=p(a,b),b=x.convertDomToCursorRange(a,d(v.getParagraphElement)),a=x.getCursorSelection(h),
b.position!==a.position||b.length!==a.length)a=n(b.position,b.length,ops.OdtCursor.RangeSelection),m.enqueue([a])};this.moveCursorToLeft=function(){c(function(a){return a.previousStep()});return!0};this.moveCursorToRight=function(){c(function(a){return a.nextStep()});return!0};this.extendSelectionToLeft=function(){r(function(a){return a.previousStep()});return!0};this.extendSelectionToRight=function(){r(function(a){return a.nextStep()});return!0};this.moveCursorUp=function(){k(-1,!1);return!0};this.moveCursorDown=
function(){k(1,!1);return!0};this.extendSelectionUp=function(){k(-1,!0);return!0};this.extendSelectionDown=function(){k(1,!0);return!0};this.moveCursorBeforeWord=function(){u(-1,!1);return!0};this.moveCursorPastWord=function(){u(1,!1);return!0};this.extendSelectionBeforeWord=function(){u(-1,!0);return!0};this.extendSelectionPastWord=function(){u(1,!0);return!0};this.moveCursorToLineStart=function(){e(-1,!1);return!0};this.moveCursorToLineEnd=function(){e(1,!1);return!0};this.extendSelectionToLineStart=
function(){e(-1,!0);return!0};this.extendSelectionToLineEnd=function(){e(1,!0);return!0};this.extendSelectionToParagraphStart=function(){w(-1,x.getParagraphElement);return!0};this.extendSelectionToParagraphEnd=function(){w(1,x.getParagraphElement);return!0};this.moveCursorToDocumentStart=function(){z(-1);return!0};this.moveCursorToDocumentEnd=function(){z(1);return!0};this.extendSelectionToDocumentStart=function(){w(-1,x.getRootElement);return!0};this.extendSelectionToDocumentEnd=function(){w(1,x.getRootElement);
return!0};this.extendSelectionToEntireDocument=function(){var a=x.getCursor(h),a=x.getRootElement(a.getNode());runtime.assert(Boolean(a),"SelectionController: Cursor outside root");a=x.convertDomToCursorRange({anchorNode:a,anchorOffset:0,focusNode:a,focusOffset:a.childNodes.length},d(x.getRootElement));m.enqueue([n(a.position,a.length)]);return!0};C.addFilter(s);C.addFilter(x.createRootFilter(h))};
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
gui.TextController=function(m,h,b,g){function d(b){var d=new ops.OpRemoveText;d.init({memberid:h,position:b.position,length:b.length});return d}function p(b){0>b.length&&(b.position+=b.length,b.length=-b.length);return b}function n(b,d){var a=new core.PositionFilterChain,c=gui.SelectionMover.createPositionIterator(l.getRootElement(b)),k=d?c.nextPosition:c.previousPosition;a.addFilter(l.getPositionFilter());a.addFilter(l.createRootFilter(h));for(c.setUnfilteredPosition(b,0);k();)if(a.acceptPosition(c)===
q)return!0;return!1}var l=m.getOdtDocument(),q=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.enqueueParagraphSplittingOps=function(){var b=p(l.getCursorSelection(h)),n,a=[];0<b.length&&(n=d(b),a.push(n));n=new ops.OpSplitParagraph;n.init({memberid:h,position:b.position,moveCursor:!0});a.push(n);g&&(b=g(b.position+1),a=a.concat(b));m.enqueue(a);return!0};this.removeTextByBackspaceKey=function(){var b=l.getCursor(h),g=p(l.getCursorSelection(h)),a=null;0===g.length?n(b.getNode(),!1)&&(a=new ops.OpRemoveText,
a.init({memberid:h,position:g.position-1,length:1}),m.enqueue([a])):(a=d(g),m.enqueue([a]));return null!==a};this.removeTextByDeleteKey=function(){var b=l.getCursor(h),g=p(l.getCursorSelection(h)),a=null;0===g.length?n(b.getNode(),!0)&&(a=new ops.OpRemoveText,a.init({memberid:h,position:g.position,length:1}),m.enqueue([a])):(a=d(g),m.enqueue([a]));return null!==a};this.removeCurrentSelection=function(){var b=p(l.getCursorSelection(h));0!==b.length&&(b=d(b),m.enqueue([b]));return!0};this.insertText=
function(f){var g=p(l.getCursorSelection(h)),a,c=[],k=!1;0<g.length&&(a=d(g),c.push(a),k=!0);a=new ops.OpInsertText;a.init({memberid:h,position:g.position,text:f,moveCursor:!0});c.push(a);b&&(f=b(g.position,f.length,k))&&c.push(f);m.enqueue(c)}};(function(){return gui.TextController})();
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(m,h){};gui.UndoManager.prototype.unsubscribe=function(m,h){};gui.UndoManager.prototype.setDocument=function(m){};gui.UndoManager.prototype.setInitialState=function(){};gui.UndoManager.prototype.initialize=function(){};gui.UndoManager.prototype.purgeInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(m){};gui.UndoManager.prototype.hasUndoStates=function(){};
gui.UndoManager.prototype.hasRedoStates=function(){};gui.UndoManager.prototype.moveForward=function(m){};gui.UndoManager.prototype.moveBackward=function(m){};gui.UndoManager.prototype.onOperationExecuted=function(m){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
// Input 95
(function(){var m=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(h,b,g,d){function p(a){var c=K.getCursor(b).getSelectedRange();c.collapsed?a.preventDefault():S.setDataFromRange(a,c)?da.removeCurrentSelection():runtime.log("Cut operation failed")}function n(){return!1!==K.getCursor(b).getSelectedRange().collapsed}function l(a){var c=K.getCursor(b).getSelectedRange();c.collapsed?a.preventDefault():S.setDataFromRange(a,c)||runtime.log("Copy operation failed")}function q(a){var b;
O.clipboardData&&O.clipboardData.getData?b=O.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(da.removeCurrentSelection(),h.enqueue(ha.createPasteOps(b)));a.preventDefault?a.preventDefault():a.returnValue=!1}function f(){return!1}function r(a){if(T)T.onOperationExecuted(a)}function a(a){K.emit(ops.OdtDocument.signalUndoStackChanged,a)}function c(){var a=E.getEventTrap(),b,c;return T?(c=E.hasFocus(),T.moveBackward(1),b=K.getOdfCanvas().getSizer(),
Q.containsNode(b,a)||(b.appendChild(a),c&&E.focus()),!0):!1}function k(){var a;return T?(a=E.hasFocus(),T.moveForward(1),a&&E.focus(),!0):!1}function e(){var a=O.getSelection(),b=0<a.rangeCount&&L.selectionToRange(a);R&&b&&(ba=!0,P.clearSelection(),Y.setUnfilteredPosition(a.focusNode,a.focusOffset),ia.acceptPosition(Y)===m&&(2===ea?L.expandToWordBoundaries(b.range):3<=ea&&L.expandToParagraphBoundaries(b.range),g.setSelectedRange(b.range,b.hasForwardSelection),K.emit(ops.Document.signalCursorMoved,
g)))}function u(a){var c=a.target||a.srcElement||null,d=K.getCursor(b);if(R=null!==c&&Q.containsNode(K.getOdfCanvas().getElement(),c))ba=!1,ia=K.createRootFilter(c),ea=a.detail,d&&a.shiftKey?O.getSelection().collapse(d.getAnchorNode(),0):(a=O.getSelection(),c=d.getSelectedRange(),a.extend?d.hasForwardSelection()?(a.collapse(c.startContainer,c.startOffset),a.extend(c.endContainer,c.endOffset)):(a.collapse(c.endContainer,c.endOffset),a.extend(c.startContainer,c.startOffset)):(a.removeAllRanges(),a.addRange(c.cloneRange()))),
1<ea&&e()}function w(a){var b=K.getRootElement(a),c=K.createRootFilter(b),b=K.createStepIterator(a,0,[c,K.getPositionFilter()],b);b.setPosition(a,a.childNodes.length);return b.roundToNextStep()?{container:b.container(),offset:b.offset()}:null}function z(a){var b;b=(b=O.getSelection())?{anchorNode:b.anchorNode,anchorOffset:b.anchorOffset,focusNode:b.focusNode,focusOffset:b.focusOffset}:null;var c,d;if(!b.anchorNode&&!b.focusNode){d=a.clientX;var e=a.clientY,f=K.getDOMDocument();c=null;f.caretRangeFromPoint?
(d=f.caretRangeFromPoint(d,e),c={container:d.startContainer,offset:d.startOffset}):f.caretPositionFromPoint&&(d=f.caretPositionFromPoint(d,e))&&d.offsetNode&&(c={container:d.offsetNode,offset:d.offset});c&&(b.anchorNode=c.container,b.anchorOffset=c.offset,b.focusNode=b.anchorNode,b.focusOffset=b.anchorOffset)}if(X.isImage(b.focusNode)&&0===b.focusOffset&&X.isCharacterFrame(b.focusNode.parentNode)){if(d=b.focusNode.parentNode,c=d.getBoundingClientRect(),a.clientX>c.right&&(c=w(d)))b.anchorNode=b.focusNode=
c.container,b.anchorOffset=b.focusOffset=c.offset}else X.isImage(b.focusNode.firstChild)&&1===b.focusOffset&&X.isCharacterFrame(b.focusNode)&&(c=w(b.focusNode))&&(b.anchorNode=b.focusNode=c.container,b.anchorOffset=b.focusOffset=c.offset);b.anchorNode&&b.focusNode&&(b=L.selectionToRange(b),L.selectRange(b.range,b.hasForwardSelection,a.detail));E.focus()}function x(a){var b=a.target||a.srcElement||null,c,d;V.processRequests();X.isImage(b)&&X.isCharacterFrame(b.parentNode)&&O.getSelection().isCollapsed?
(L.selectImage(b.parentNode),E.focus()):P.isSelectorElement(b)?E.focus():R&&(ba?(b=g.getSelectedRange(),c=b.collapsed,X.isImage(b.endContainer)&&0===b.endOffset&&X.isCharacterFrame(b.endContainer.parentNode)&&(d=b.endContainer.parentNode,d=w(d))&&(b.setEnd(d.container,d.offset),c&&b.collapse(!1)),L.selectRange(b,g.hasForwardSelection(),a.detail),E.focus()):ma?z(a):N=runtime.setTimeout(function(){z(a)},0));ea=0;ba=R=!1}function t(a){var c=K.getCursor(b).getSelectedRange();c.collapsed||G.exportRangeToDataTransfer(a.dataTransfer,
c)}function v(){R&&E.focus();ea=0;ba=R=!1}function s(a){x(a)}function C(a){var b=a.target||a.srcElement||null,c=null;"annotationRemoveButton"===b.className?(c=Q.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0],U.removeAnnotation(c),E.focus()):x(a)}function I(a){(a=a.data)&&da.insertText(a)}function H(a){return function(){a();return!0}}function D(a){return function(c){return K.getCursor(b).getSelectionType()===ops.OdtCursor.RangeSelection?a(c):!0}}function F(a){E.unsubscribe("keydown",
y.handleEvent);E.unsubscribe("keypress",aa.handleEvent);E.unsubscribe("keyup",M.handleEvent);E.unsubscribe("copy",l);E.unsubscribe("mousedown",u);E.unsubscribe("mousemove",V.trigger);E.unsubscribe("mouseup",C);E.unsubscribe("contextmenu",s);E.unsubscribe("dragstart",t);E.unsubscribe("dragend",v);E.unsubscribe("click",fa.handleClick);K.unsubscribe(ops.OdtDocument.signalOperationEnd,ga.trigger);K.unsubscribe(ops.Document.signalCursorAdded,$.registerCursor);K.unsubscribe(ops.Document.signalCursorRemoved,
$.removeCursor);K.unsubscribe(ops.OdtDocument.signalOperationEnd,r);a()}var O=runtime.getWindow(),K=h.getOdtDocument(),Z=new core.Async,Q=new core.DomUtils,X=new odf.OdfUtils,G=new gui.MimeDataExporter,S=new gui.Clipboard(G),y=new gui.KeyboardHandler,aa=new gui.KeyboardHandler,M=new gui.KeyboardHandler,R=!1,J=new odf.ObjectNameGenerator(K.getOdfCanvas().odfContainer(),b),ba=!1,ia=null,N,T=null,E=new gui.EventManager(K),U=new gui.AnnotationController(h,b),W=new gui.DirectFormattingController(h,b,J,
d.directParagraphStylingEnabled),da=new gui.TextController(h,b,W.createCursorStyleOp,W.createParagraphStyleOps),ka=new gui.ImageController(h,b,J),P=new gui.ImageSelector(K.getOdfCanvas()),Y=gui.SelectionMover.createPositionIterator(K.getRootNode()),V,ga,ha=new gui.PlainTextPasteboard(K,b),$=new gui.InputMethodEditor(b,E),ea=0,fa=new gui.HyperlinkClickHandler(K.getRootNode),ja=new gui.HyperlinkController(h,b),L=new gui.SelectionController(h,b),A=gui.KeyboardHandler.Modifier,B=gui.KeyboardHandler.KeyCode,
ca=-1!==O.navigator.appVersion.toLowerCase().indexOf("mac"),ma=-1!==["iPad","iPod","iPhone"].indexOf(O.navigator.platform),la;runtime.assert(null!==O,"Expected to be run in an environment which has a global window, like a browser.");this.undo=c;this.redo=k;this.insertLocalCursor=function(){runtime.assert(void 0===h.getOdtDocument().getCursor(b),"Inserting local cursor a second time.");var a=new ops.OpAddCursor;a.init({memberid:b});h.enqueue([a]);E.focus()};this.removeLocalCursor=function(){runtime.assert(void 0!==
h.getOdtDocument().getCursor(b),"Removing local cursor without inserting before.");var a=new ops.OpRemoveCursor;a.init({memberid:b});h.enqueue([a])};this.startEditing=function(){$.subscribe(gui.InputMethodEditor.signalCompositionStart,da.removeCurrentSelection);$.subscribe(gui.InputMethodEditor.signalCompositionEnd,I);E.subscribe("beforecut",n);E.subscribe("cut",p);E.subscribe("beforepaste",f);E.subscribe("paste",q);O.addEventListener("focus",fa.showTextCursor,!1);T&&T.initialize();$.setEditing(!0);
fa.setModifier(ca?gui.HyperlinkClickHandler.Modifier.Meta:gui.HyperlinkClickHandler.Modifier.Ctrl);y.bind(B.Backspace,A.None,H(da.removeTextByBackspaceKey),!0);y.bind(B.Delete,A.None,da.removeTextByDeleteKey);y.bind(B.Tab,A.None,D(function(){da.insertText("\t");return!0}));ca?(y.bind(B.Clear,A.None,da.removeCurrentSelection),y.bind(B.B,A.Meta,D(W.toggleBold)),y.bind(B.I,A.Meta,D(W.toggleItalic)),y.bind(B.U,A.Meta,D(W.toggleUnderline)),y.bind(B.L,A.MetaShift,D(W.alignParagraphLeft)),y.bind(B.E,A.MetaShift,
D(W.alignParagraphCenter)),y.bind(B.R,A.MetaShift,D(W.alignParagraphRight)),y.bind(B.J,A.MetaShift,D(W.alignParagraphJustified)),y.bind(B.C,A.MetaShift,U.addAnnotation),y.bind(B.Z,A.Meta,c),y.bind(B.Z,A.MetaShift,k),y.bind(B.LeftMeta,A.Meta,fa.showPointerCursor),y.bind(B.MetaInMozilla,A.Meta,fa.showPointerCursor),M.bind(B.LeftMeta,A.None,fa.showTextCursor),M.bind(B.MetaInMozilla,A.None,fa.showTextCursor)):(y.bind(B.B,A.Ctrl,D(W.toggleBold)),y.bind(B.I,A.Ctrl,D(W.toggleItalic)),y.bind(B.U,A.Ctrl,D(W.toggleUnderline)),
y.bind(B.L,A.CtrlShift,D(W.alignParagraphLeft)),y.bind(B.E,A.CtrlShift,D(W.alignParagraphCenter)),y.bind(B.R,A.CtrlShift,D(W.alignParagraphRight)),y.bind(B.J,A.CtrlShift,D(W.alignParagraphJustified)),y.bind(B.C,A.CtrlAlt,U.addAnnotation),y.bind(B.Z,A.Ctrl,c),y.bind(B.Z,A.CtrlShift,k),y.bind(B.Ctrl,A.Ctrl,fa.showPointerCursor),M.bind(B.Ctrl,A.None,fa.showTextCursor));aa.setDefault(D(function(a){var b;b=null===a.which||void 0===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):
null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(da.insertText(b),!0)}));aa.bind(B.Enter,A.None,D(da.enqueueParagraphSplittingOps))};this.endEditing=function(){$.unsubscribe(gui.InputMethodEditor.signalCompositionStart,da.removeCurrentSelection);$.unsubscribe(gui.InputMethodEditor.signalCompositionEnd,I);E.unsubscribe("cut",p);E.unsubscribe("beforecut",n);E.unsubscribe("paste",q);E.unsubscribe("beforepaste",f);O.removeEventListener("focus",fa.showTextCursor,!1);$.setEditing(!1);fa.setModifier(gui.HyperlinkClickHandler.Modifier.None);
y.bind(B.Backspace,A.None,function(){return!0},!0);y.unbind(B.Delete,A.None);y.unbind(B.Tab,A.None);ca?(y.unbind(B.Clear,A.None),y.unbind(B.B,A.Meta),y.unbind(B.I,A.Meta),y.unbind(B.U,A.Meta),y.unbind(B.L,A.MetaShift),y.unbind(B.E,A.MetaShift),y.unbind(B.R,A.MetaShift),y.unbind(B.J,A.MetaShift),y.unbind(B.C,A.MetaShift),y.unbind(B.Z,A.Meta),y.unbind(B.Z,A.MetaShift),y.unbind(B.LeftMeta,A.Meta),y.unbind(B.MetaInMozilla,A.Meta),M.unbind(B.LeftMeta,A.None),M.unbind(B.MetaInMozilla,A.None)):(y.unbind(B.B,
A.Ctrl),y.unbind(B.I,A.Ctrl),y.unbind(B.U,A.Ctrl),y.unbind(B.L,A.CtrlShift),y.unbind(B.E,A.CtrlShift),y.unbind(B.R,A.CtrlShift),y.unbind(B.J,A.CtrlShift),y.unbind(B.C,A.CtrlAlt),y.unbind(B.Z,A.Ctrl),y.unbind(B.Z,A.CtrlShift),y.unbind(B.Ctrl,A.Ctrl),M.unbind(B.Ctrl,A.None));aa.setDefault(null);aa.unbind(B.Enter,A.None)};this.getInputMemberId=function(){return b};this.getSession=function(){return h};this.setUndoManager=function(b){T&&T.unsubscribe(gui.UndoManager.signalUndoStackChanged,a);if(T=b)T.setDocument(K),
T.setPlaybackFunction(h.enqueue),T.subscribe(gui.UndoManager.signalUndoStackChanged,a)};this.getUndoManager=function(){return T};this.getAnnotationController=function(){return U};this.getDirectFormattingController=function(){return W};this.getHyperlinkController=function(){return ja};this.getImageController=function(){return ka};this.getSelectionController=function(){return L};this.getTextController=function(){return da};this.getEventManager=function(){return E};this.getKeyboardHandlers=function(){return{keydown:y,
keypress:aa}};this.destroy=function(a){var b=[];la&&b.push(la.destroy);b=b.concat([V.destroy,ga.destroy,W.destroy,$.destroy,E.destroy,F]);runtime.clearTimeout(N);Z.destroyAll(b,a)};V=new core.ScheduledTask(e,0);ga=new core.ScheduledTask(function(){var a=K.getCursor(b);if(a&&a.getSelectionType()===ops.OdtCursor.RegionSelection&&(a=X.getImageElements(a.getSelectedRange())[0])){P.select(a.parentNode);return}P.clearSelection()},0);y.bind(B.Left,A.None,D(L.moveCursorToLeft));y.bind(B.Right,A.None,D(L.moveCursorToRight));
y.bind(B.Up,A.None,D(L.moveCursorUp));y.bind(B.Down,A.None,D(L.moveCursorDown));y.bind(B.Left,A.Shift,D(L.extendSelectionToLeft));y.bind(B.Right,A.Shift,D(L.extendSelectionToRight));y.bind(B.Up,A.Shift,D(L.extendSelectionUp));y.bind(B.Down,A.Shift,D(L.extendSelectionDown));y.bind(B.Home,A.None,D(L.moveCursorToLineStart));y.bind(B.End,A.None,D(L.moveCursorToLineEnd));y.bind(B.Home,A.Ctrl,D(L.moveCursorToDocumentStart));y.bind(B.End,A.Ctrl,D(L.moveCursorToDocumentEnd));y.bind(B.Home,A.Shift,D(L.extendSelectionToLineStart));
y.bind(B.End,A.Shift,D(L.extendSelectionToLineEnd));y.bind(B.Up,A.CtrlShift,D(L.extendSelectionToParagraphStart));y.bind(B.Down,A.CtrlShift,D(L.extendSelectionToParagraphEnd));y.bind(B.Home,A.CtrlShift,D(L.extendSelectionToDocumentStart));y.bind(B.End,A.CtrlShift,D(L.extendSelectionToDocumentEnd));ca?(y.bind(B.Left,A.Alt,D(L.moveCursorBeforeWord)),y.bind(B.Right,A.Alt,D(L.moveCursorPastWord)),y.bind(B.Left,A.Meta,D(L.moveCursorToLineStart)),y.bind(B.Right,A.Meta,D(L.moveCursorToLineEnd)),y.bind(B.Home,
A.Meta,D(L.moveCursorToDocumentStart)),y.bind(B.End,A.Meta,D(L.moveCursorToDocumentEnd)),y.bind(B.Left,A.AltShift,D(L.extendSelectionBeforeWord)),y.bind(B.Right,A.AltShift,D(L.extendSelectionPastWord)),y.bind(B.Left,A.MetaShift,D(L.extendSelectionToLineStart)),y.bind(B.Right,A.MetaShift,D(L.extendSelectionToLineEnd)),y.bind(B.Up,A.AltShift,D(L.extendSelectionToParagraphStart)),y.bind(B.Down,A.AltShift,D(L.extendSelectionToParagraphEnd)),y.bind(B.Up,A.MetaShift,D(L.extendSelectionToDocumentStart)),
y.bind(B.Down,A.MetaShift,D(L.extendSelectionToDocumentEnd)),y.bind(B.A,A.Meta,D(L.extendSelectionToEntireDocument))):(y.bind(B.Left,A.Ctrl,D(L.moveCursorBeforeWord)),y.bind(B.Right,A.Ctrl,D(L.moveCursorPastWord)),y.bind(B.Left,A.CtrlShift,D(L.extendSelectionBeforeWord)),y.bind(B.Right,A.CtrlShift,D(L.extendSelectionPastWord)),y.bind(B.A,A.Ctrl,D(L.extendSelectionToEntireDocument)));ma&&(la=new gui.IOSSafariSupport(E));E.subscribe("keydown",y.handleEvent);E.subscribe("keypress",aa.handleEvent);E.subscribe("keyup",
M.handleEvent);E.subscribe("copy",l);E.subscribe("mousedown",u);E.subscribe("mousemove",V.trigger);E.subscribe("mouseup",C);E.subscribe("contextmenu",s);E.subscribe("dragstart",t);E.subscribe("dragend",v);E.subscribe("click",fa.handleClick);K.subscribe(ops.OdtDocument.signalOperationEnd,ga.trigger);K.subscribe(ops.Document.signalCursorAdded,$.registerCursor);K.subscribe(ops.Document.signalCursorRemoved,$.removeCursor);K.subscribe(ops.OdtDocument.signalOperationEnd,r)};return gui.SessionController})();
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
gui.CaretManager=function(m){function h(a){return c.hasOwnProperty(a)?c[a]:null}function b(){return Object.keys(c).map(function(a){return c[a]})}function g(a){var b=c[a];b&&(b.destroy(function(){}),delete c[a])}function d(a){a=a.getMemberId();a===m.getInputMemberId()&&(a=h(a))&&a.refreshCursorBlinking()}function p(){var a=h(m.getInputMemberId());w=!1;a&&a.ensureVisible()}function n(){var a=h(m.getInputMemberId());a&&(a.handleUpdate(),w||(w=!0,u=runtime.setTimeout(p,50)))}function l(a){a.memberId===
m.getInputMemberId()&&n()}function q(){var a=h(m.getInputMemberId());a&&a.setFocus()}function f(){var a=h(m.getInputMemberId());a&&a.removeFocus()}function r(){var a=h(m.getInputMemberId());a&&a.show()}function a(){var a=h(m.getInputMemberId());a&&a.hide()}var c={},k=new core.Async,e=runtime.getWindow(),u,w=!1;this.registerCursor=function(a,b,d){var e=a.getMemberId();b=new gui.Caret(a,b,d);d=m.getEventManager();c[e]=b;e===m.getInputMemberId()?(runtime.log("Starting to track input on new cursor of "+
e),a.subscribe(ops.OdtCursor.signalCursorUpdated,n),b.setOverlayElement(d.getEventTrap())):a.subscribe(ops.OdtCursor.signalCursorUpdated,b.handleUpdate);return b};this.getCaret=h;this.getCarets=b;this.destroy=function(h){var n=m.getSession().getOdtDocument(),p=m.getEventManager(),v=b().map(function(a){return a.destroy});runtime.clearTimeout(u);n.unsubscribe(ops.OdtDocument.signalParagraphChanged,l);n.unsubscribe(ops.Document.signalCursorMoved,d);n.unsubscribe(ops.Document.signalCursorRemoved,g);p.unsubscribe("focus",
q);p.unsubscribe("blur",f);e.removeEventListener("focus",r,!1);e.removeEventListener("blur",a,!1);c={};k.destroyAll(v,h)};(function(){var b=m.getSession().getOdtDocument(),c=m.getEventManager();b.subscribe(ops.OdtDocument.signalParagraphChanged,l);b.subscribe(ops.Document.signalCursorMoved,d);b.subscribe(ops.Document.signalCursorRemoved,g);c.subscribe("focus",q);c.subscribe("blur",f);e.addEventListener("focus",r,!1);e.addEventListener("blur",a,!1)})()};
// Input 97
gui.EditInfoHandle=function(m){var h=[],b,g=m.ownerDocument,d=g.documentElement.namespaceURI;this.setEdits=function(m){h=m;var n,l,q,f;b.innerHTML="";for(m=0;m<h.length;m+=1)n=g.createElementNS(d,"div"),n.className="editInfo",l=g.createElementNS(d,"span"),l.className="editInfoColor",l.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[m].memberid),q=g.createElementNS(d,"span"),q.className="editInfoAuthor",q.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[m].memberid),
f=g.createElementNS(d,"span"),f.className="editInfoTime",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[m].memberid),f.innerHTML=h[m].time,n.appendChild(l),n.appendChild(q),n.appendChild(f),b.appendChild(n)};this.show=function(){b.style.display="block"};this.hide=function(){b.style.display="none"};this.destroy=function(d){m.removeChild(b);d()};b=g.createElementNS(d,"div");b.setAttribute("class","editInfoHandle");b.style.display="none";m.appendChild(b)};
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
ops.EditInfo=function(m,h){function b(){var b=[],g;for(g in d)d.hasOwnProperty(g)&&b.push({memberid:g,time:d[g].time});b.sort(function(b,d){return b.time-d.time});return b}var g,d={};this.getNode=function(){return g};this.getOdtDocument=function(){return h};this.getEdits=function(){return d};this.getSortedEdits=function(){return b()};this.addEdit=function(b,g){d[b]={time:g}};this.clearEdits=function(){d={}};this.destroy=function(b){m.parentNode&&m.removeChild(g);b()};g=h.getDOMDocument().createElementNS("urn:webodf:names:editinfo",
"editinfo");m.insertBefore(g,m.firstChild)};
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
gui.EditInfoMarker=function(m,h){function b(b,a){return runtime.setTimeout(function(){n.style.opacity=b},a)}var g=this,d,p,n,l,q,f;this.addEdit=function(d,a){var c=Date.now()-a;m.addEdit(d,a);p.setEdits(m.getSortedEdits());n.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",d);runtime.clearTimeout(q);runtime.clearTimeout(f);1E4>c?(l=b(1,0),q=b(0.5,1E4-c),f=b(0.2,2E4-c)):1E4<=c&&2E4>c?(l=b(0.5,0),f=b(0.2,2E4-c)):l=b(0.2,0)};this.getEdits=function(){return m.getEdits()};this.clearEdits=
function(){m.clearEdits();p.setEdits([]);n.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&n.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return m};this.show=function(){n.style.display="block"};this.hide=function(){g.hideHandle();n.style.display="none"};this.showHandle=function(){p.show()};this.hideHandle=function(){p.hide()};this.destroy=function(b){runtime.clearTimeout(l);runtime.clearTimeout(q);runtime.clearTimeout(f);d.removeChild(n);
p.destroy(function(a){a?b(a):m.destroy(b)})};(function(){var b=m.getOdtDocument().getDOMDocument();n=b.createElementNS(b.documentElement.namespaceURI,"div");n.setAttribute("class","editInfoMarker");n.onmouseover=function(){g.showHandle()};n.onmouseout=function(){g.hideHandle()};d=m.getNode();d.appendChild(n);p=new gui.EditInfoHandle(d);h||g.hide()})()};
// Input 100
gui.ShadowCursor=function(m){var h=m.getDOMDocument().createRange(),b=!0;this.removeFromDocument=function(){};this.getMemberId=function(){return gui.ShadowCursor.ShadowCursorMemberId};this.getSelectedRange=function(){return h};this.setSelectedRange=function(g,d){h=g;b=!1!==d};this.hasForwardSelection=function(){return b};this.getDocument=function(){return m};this.getSelectionType=function(){return ops.OdtCursor.RangeSelection};h.setStart(m.getRootNode(),0)};gui.ShadowCursor.ShadowCursorMemberId="";
(function(){return gui.ShadowCursor})();
// Input 101
gui.SelectionView=function(m){};gui.SelectionView.prototype.rerender=function(){};gui.SelectionView.prototype.show=function(){};gui.SelectionView.prototype.hide=function(){};gui.SelectionView.prototype.destroy=function(m){};
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
gui.SelectionViewManager=function(m){function h(){return Object.keys(b).map(function(g){return b[g]})}var b={};this.getSelectionView=function(g){return b.hasOwnProperty(g)?b[g]:null};this.getSelectionViews=h;this.removeSelectionView=function(g){b.hasOwnProperty(g)&&(b[g].destroy(function(){}),delete b[g])};this.hideSelectionView=function(g){b.hasOwnProperty(g)&&b[g].hide()};this.showSelectionView=function(g){b.hasOwnProperty(g)&&b[g].show()};this.rerenderSelectionViews=function(){Object.keys(b).forEach(function(g){b[g].rerender()})};
this.registerCursor=function(g,d){var h=g.getMemberId(),n=new m(g);d?n.show():n.hide();return b[h]=n};this.destroy=function(b){function d(h,l){l?b(l):h<m.length?m[h].destroy(function(b){d(h+1,b)}):b()}var m=h();d(0,void 0)}};
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
(function(){gui.SessionView=function(m,h,b,g,d){function p(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid="'+a+'"]'+e+c;a:{var f=k.firstChild;for(b=b+'[editinfo|memberid="'+a+'"]'+e+"{";f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:k.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator","{ background-color: "+c+"; }","");d(".selectionOverlay","{ fill: "+c+"; stroke: "+c+";}","")}function n(a){var b,c;for(c in u)u.hasOwnProperty(c)&&(b=u[c],a?b.show():b.hide())}function l(a){g.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function q(a){var b=a.getMemberId();a=a.getProperties();p(b,a.fullName,a.color);h===b&&p("","",a.color)}function f(a){var c=a.getMemberId(),e=b.getOdtDocument().getMember(c).getProperties();g.registerCursor(a,z,x);d.registerCursor(a,
!0);if(a=g.getCaret(c))a.setAvatarImageUrl(e.imageUrl),a.setColor(e.color);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function r(a){a=a.getMemberId();var b=d.getSelectionView(h),c=d.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),e=g.getCaret(h);a===h?(c.hide(),b&&b.show(),e&&e.show()):a===gui.ShadowCursor.ShadowCursorMemberId&&(c.show(),b&&b.hide(),e&&e.hide())}function a(a){d.removeSelectionView(a)}function c(a){var c=a.paragraphElement,d=a.memberId;a=a.timeStamp;
var f,k="",g=c.getElementsByTagNameNS(e,"editinfo").item(0);g?(k=g.getAttributeNS(e,"id"),f=u[k]):(k=Math.random().toString(),f=new ops.EditInfo(c,b.getOdtDocument()),f=new gui.EditInfoMarker(f,w),g=c.getElementsByTagNameNS(e,"editinfo").item(0),g.setAttributeNS(e,"id",k),u[k]=f);f.addEdit(d,new Date(a))}var k,e="urn:webodf:names:editinfo",u={},w=void 0!==m.editInfoMarkersInitiallyVisible?Boolean(m.editInfoMarkersInitiallyVisible):!0,z=void 0!==m.caretAvatarsInitiallyVisible?Boolean(m.caretAvatarsInitiallyVisible):
!0,x=void 0!==m.caretBlinksOnRangeSelect?Boolean(m.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=function(){w||(w=!0,n(w))};this.hideEditInfoMarkers=function(){w&&(w=!1,n(w))};this.showCaretAvatars=function(){z||(z=!0,l(z))};this.hideCaretAvatars=function(){z&&(z=!1,l(z))};this.getSession=function(){return b};this.getCaret=function(a){return g.getCaret(a)};this.destroy=function(e){var g=b.getOdtDocument(),h=Object.keys(u).map(function(a){return u[a]});g.unsubscribe(ops.Document.signalMemberAdded,
q);g.unsubscribe(ops.Document.signalMemberUpdated,q);g.unsubscribe(ops.Document.signalCursorAdded,f);g.unsubscribe(ops.Document.signalCursorRemoved,a);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,c);g.unsubscribe(ops.Document.signalCursorMoved,r);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,d.rerenderSelectionViews);g.unsubscribe(ops.OdtDocument.signalTableAdded,d.rerenderSelectionViews);g.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,d.rerenderSelectionViews);k.parentNode.removeChild(k);
(function I(a,b){b?e(b):a<h.length?h[a].destroy(function(b){I(a+1,b)}):e()})(0,void 0)};(function(){var e=b.getOdtDocument(),g=document.getElementsByTagName("head").item(0);e.subscribe(ops.Document.signalMemberAdded,q);e.subscribe(ops.Document.signalMemberUpdated,q);e.subscribe(ops.Document.signalCursorAdded,f);e.subscribe(ops.Document.signalCursorRemoved,a);e.subscribe(ops.OdtDocument.signalParagraphChanged,c);e.subscribe(ops.Document.signalCursorMoved,r);e.subscribe(ops.OdtDocument.signalParagraphChanged,
d.rerenderSelectionViews);e.subscribe(ops.OdtDocument.signalTableAdded,d.rerenderSelectionViews);e.subscribe(ops.OdtDocument.signalParagraphStyleModified,d.rerenderSelectionViews);k=document.createElementNS(g.namespaceURI,"style");k.type="text/css";k.media="screen, print, handheld, projection";k.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));k.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));g.appendChild(k)})()}})();
// Input 104
gui.SvgSelectionView=function(m){function h(){var a=c.getRootNode();k!==a&&(k=a,e=k.parentNode.parentNode.parentNode,e.appendChild(z),z.setAttribute("class","selectionOverlay"),z.appendChild(x))}function b(a){var b=v.getBoundingClientRect(e),d=c.getCanvas().getZoomLevel(),f={};f.top=v.adaptRangeDifferenceToZoomLevel(a.top-b.top,d);f.left=v.adaptRangeDifferenceToZoomLevel(a.left-b.left,d);f.bottom=v.adaptRangeDifferenceToZoomLevel(a.bottom-b.top,d);f.right=v.adaptRangeDifferenceToZoomLevel(a.right-
b.left,d);f.width=v.adaptRangeDifferenceToZoomLevel(a.width,d);f.height=v.adaptRangeDifferenceToZoomLevel(a.height,d);return f}function g(a){a=a.getBoundingClientRect();return Boolean(a&&0!==a.height)}function d(a){var b=t.getTextElements(a,!0,!1),c=a.cloneRange(),d=a.cloneRange();a=a.cloneRange();if(!b.length)return null;var e;a:{e=0;var f=b[e],k=c.startContainer===f?c.startOffset:0,h=k;c.setStart(f,k);for(c.setEnd(f,h);!g(c);){if(f.nodeType===Node.ELEMENT_NODE&&h<f.childNodes.length)h=f.childNodes.length;
else if(f.nodeType===Node.TEXT_NODE&&h<f.length)h+=1;else if(b[e])f=b[e],e+=1,k=h=0;else{e=!1;break a}c.setStart(f,k);c.setEnd(f,h)}e=!0}if(!e)return null;a:{e=b.length-1;f=b[e];h=k=d.endContainer===f?d.endOffset:f.nodeType===Node.TEXT_NODE?f.length:f.childNodes.length;d.setStart(f,k);for(d.setEnd(f,h);!g(d);){if(f.nodeType===Node.ELEMENT_NODE&&0<k)k=0;else if(f.nodeType===Node.TEXT_NODE&&0<k)k-=1;else if(b[e])f=b[e],e-=1,k=h=f.length||f.childNodes.length;else{b=!1;break a}d.setStart(f,k);d.setEnd(f,
h)}b=!0}if(!b)return null;a.setStart(c.startContainer,c.startOffset);a.setEnd(d.endContainer,d.endOffset);return{firstRange:c,lastRange:d,fillerRange:a}}function p(a,b){var c={};c.top=Math.min(a.top,b.top);c.left=Math.min(a.left,b.left);c.right=Math.max(a.right,b.right);c.bottom=Math.max(a.bottom,b.bottom);c.width=c.right-c.left;c.height=c.bottom-c.top;return c}function n(a,b){b&&0<b.width&&0<b.height&&(a=a?p(a,b):b);return a}function l(a){function b(a){C.setUnfilteredPosition(a,0);return w.acceptNode(a)===
I&&s.acceptPosition(C)===I?I:H}function d(a){var c=null;b(a)===I&&(c=v.getBoundingClientRect(a));return c}var e=a.commonAncestorContainer,f=a.startContainer,k=a.endContainer,g=a.startOffset,h=a.endOffset,l,m,p=null,q,r=u.createRange(),s,w=new odf.OdfNodeFilter,x;if(f===e||k===e)return r=a.cloneRange(),p=r.getBoundingClientRect(),r.detach(),p;for(a=f;a.parentNode!==e;)a=a.parentNode;for(m=k;m.parentNode!==e;)m=m.parentNode;s=c.createRootFilter(f);for(e=a.nextSibling;e&&e!==m;)q=d(e),p=n(p,q),e=e.nextSibling;
if(t.isParagraph(a))p=n(p,v.getBoundingClientRect(a));else if(a.nodeType===Node.TEXT_NODE)e=a,r.setStart(e,g),r.setEnd(e,e===m?h:e.length),q=r.getBoundingClientRect(),p=n(p,q);else for(x=u.createTreeWalker(a,NodeFilter.SHOW_TEXT,b,!1),e=x.currentNode=f;e&&e!==k;)r.setStart(e,g),r.setEnd(e,e.length),q=r.getBoundingClientRect(),p=n(p,q),l=e,g=0,e=x.nextNode();l||(l=f);if(t.isParagraph(m))p=n(p,v.getBoundingClientRect(m));else if(m.nodeType===Node.TEXT_NODE)e=m,r.setStart(e,e===a?g:0),r.setEnd(e,h),
q=r.getBoundingClientRect(),p=n(p,q);else for(x=u.createTreeWalker(m,NodeFilter.SHOW_TEXT,b,!1),e=x.currentNode=k;e&&e!==l;)if(r.setStart(e,0),r.setEnd(e,h),q=r.getBoundingClientRect(),p=n(p,q),e=x.previousNode())h=e.length;return p}function q(a,b){var c=a.getBoundingClientRect(),d={width:0};d.top=c.top;d.bottom=c.bottom;d.height=c.height;d.left=d.right=b?c.right:c.left;return d}function f(){var a=m.getSelectedRange(),c;if(c=s&&m.getSelectionType()===ops.OdtCursor.RangeSelection&&!a.collapsed){h();
var a=d(a),e,f,k,g,n,r,u,t;if(a){c=a.firstRange;e=a.lastRange;f=a.fillerRange;k=b(q(c,!1));n=b(q(e,!0));g=(g=l(f))?b(g):p(k,n);r=g.left;g=k.left+Math.max(0,g.width-(k.left-g.left));u=Math.min(k.top,n.top);t=n.top+n.height;k=[{x:k.left,y:u+k.height},{x:k.left,y:u},{x:g,y:u},{x:g,y:t-n.height},{x:n.right,y:t-n.height},{x:n.right,y:t},{x:r,y:t},{x:r,y:u+k.height},{x:k.left,y:u+k.height}];n="";for(r=0;r<k.length;r+=1)n+=k[r].x+","+k[r].y+" ";x.setAttribute("points",n);c.detach();e.detach();f.detach()}c=
Boolean(a)}z.style.display=c?"block":"none"}function r(a){s&&a===m&&D.trigger()}function a(a){e.removeChild(z);m.getDocument().unsubscribe(ops.Document.signalCursorMoved,r);a()}var c=m.getDocument(),k,e,u=c.getDOMDocument(),w=new core.Async,z=u.createElementNS("http://www.w3.org/2000/svg","svg"),x=u.createElementNS("http://www.w3.org/2000/svg","polygon"),t=new odf.OdfUtils,v=new core.DomUtils,s=!0,C=gui.SelectionMover.createPositionIterator(c.getRootNode()),I=NodeFilter.FILTER_ACCEPT,H=NodeFilter.FILTER_REJECT,
D;this.rerender=function(){s&&D.trigger()};this.show=function(){s=!0;D.trigger()};this.hide=function(){s=!1;D.trigger()};this.destroy=function(b){w.destroyAll([D.destroy,a],b)};(function(){var a=m.getMemberId();D=new core.ScheduledTask(f,0);h();z.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);m.getDocument().subscribe(ops.Document.signalCursorMoved,r)})()};
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
gui.UndoStateRules=function(){function m(b,g){var h=b.length;this.previous=function(){for(h-=1;0<=h;h-=1)if(g(b[h]))return b[h];return null}}function h(b){b=b.spec();var g;b.hasOwnProperty("position")&&(g=b.position);return g}function b(b){return b.isEdit}function g(b,g,m){if(!m)return m=h(b)-h(g),0===m||1===Math.abs(m);b=h(b);g=h(g);m=h(m);return b-g===g-m}this.isEditOperation=b;this.isPartOfOperationSet=function(d,h){var n=void 0!==d.group,l;if(!d.isEdit||0===h.length)return!0;l=h[h.length-1];if(n&&
d.group===l.group)return!0;a:switch(d.spec().optype){case "RemoveText":case "InsertText":l=!0;break a;default:l=!1}if(l&&h.some(b)){if(n){var q;n=d.spec().optype;l=new m(h,b);var f=l.previous(),r=null,a,c;runtime.assert(Boolean(f),"No edit operations found in state");c=f.group;runtime.assert(void 0!==c,"Operation has no group");for(a=1;f&&f.group===c;){if(n===f.spec().optype){q=f;break}f=l.previous()}if(q){for(f=l.previous();f;){if(f.group!==c){if(2===a)break;c=f.group;a+=1}if(n===f.spec().optype){r=
f;break}f=l.previous()}q=g(d,q,r)}else q=!1;return q}q=d.spec().optype;n=new m(h,b);l=n.previous();runtime.assert(Boolean(l),"No edit operations found in state");q=q===l.spec().optype?g(d,l,n.previous()):!1;return q}return!1}};
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
gui.TrivialUndoManager=function(m){function h(a){0<a.length&&(v=!0,k(a),v=!1)}function b(){x.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:q.hasUndoStates(),redoAvailable:q.hasRedoStates()})}function g(){u!==c&&u!==w[w.length-1]&&w.push(u)}function d(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);r.normalizeTextNodes(b)}function p(a){return Object.keys(a).map(function(b){return a[b]})}function n(a){function b(a){var e=a.spec();if(f[e.memberid])switch(e.optype){case "AddCursor":c[e.memberid]||
(c[e.memberid]=a,delete f[e.memberid],g-=1);break;case "MoveCursor":d[e.memberid]||(d[e.memberid]=a)}}var c={},d={},f={},g,k=a.pop();e.getMemberIds().forEach(function(a){f[a]=!0});for(g=Object.keys(f).length;k&&0<g;)k.reverse(),k.forEach(b),k=a.pop();return p(c).concat(p(d))}function l(){var k=a=e.cloneDocumentElement();r.getElementsByTagNameNS(k,f,"cursor").forEach(d);r.getElementsByTagNameNS(k,f,"anchor").forEach(d);g();u=c=n([c].concat(w));w.length=0;z.length=0;b()}var q=this,f="urn:webodf:names:cursor",
r=new core.DomUtils,a,c=[],k,e,u=[],w=[],z=[],x=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),t=m||new gui.UndoStateRules,v=!1;this.subscribe=function(a,b){x.subscribe(a,b)};this.unsubscribe=function(a,b){x.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<w.length};this.hasRedoStates=function(){return 0<z.length};this.setDocument=function(a){e=
a};this.purgeInitialState=function(){w.length=0;z.length=0;c.length=0;u.length=0;a=null;b()};this.setInitialState=l;this.initialize=function(){a||l()};this.setPlaybackFunction=function(a){k=a};this.onOperationExecuted=function(a){v||(t.isEditOperation(a)&&(u===c||0<z.length)||!t.isPartOfOperationSet(a,u)?(z.length=0,g(),u=[a],w.push(u),x.emit(gui.UndoManager.signalUndoStateCreated,{operations:u}),b()):(u.push(a),x.emit(gui.UndoManager.signalUndoStateModified,{operations:u})))};this.moveForward=function(a){for(var c=
0,d;a&&z.length;)d=z.pop(),w.push(d),h(d),a-=1,c+=1;c&&(u=w[w.length-1],b());return c};this.moveBackward=function(d){for(var f=0;d&&w.length;)z.push(w.pop()),d-=1,f+=1;f&&(e.setDocumentElement(a.cloneNode(!0)),x.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),e.getMemberIds().forEach(function(a){e.removeCursor(a)}),h(c),w.forEach(h),u=w[w.length-1]||c,b());return f}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
ops.OperationTransformMatrix=function(){function m(a){a.position+=a.length;a.length*=-1}function h(a){var b=0>a.length;b&&m(a);return b}function b(a,b){function d(f){a[f]===b&&e.push(f)}var e=[];a&&["style:parent-style-name","style:next-style-name"].forEach(d);return e}function g(a,b){function d(e){a[e]===b&&delete a[e]}a&&["style:parent-style-name","style:next-style-name"].forEach(d)}function d(a){var b={};Object.keys(a).forEach(function(f){b[f]="object"===typeof a[f]?d(a[f]):a[f]});return b}function p(a,
b,d,e){var f,g=!1,h=!1,l,m=[];e&&e.attributes&&(m=e.attributes.split(","));a&&(d||0<m.length)&&Object.keys(a).forEach(function(b){var c=a[b],e;"object"!==typeof c&&(d&&(e=d[b]),void 0!==e?(delete a[b],h=!0,e===c&&(delete d[b],g=!0)):-1!==m.indexOf(b)&&(delete a[b],h=!0))});if(b&&b.attributes&&(d||0<m.length)){l=b.attributes.split(",");for(e=0;e<l.length;e+=1)if(f=l[e],d&&void 0!==d[f]||m&&-1!==m.indexOf(f))l.splice(e,1),e-=1,h=!0;0<l.length?b.attributes=l.join(","):delete b.attributes}return{majorChanged:g,
minorChanged:h}}function n(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function l(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function q(a,b,d,e,f){var g=a?a[f]:null,h=b?b[f]:null,m=d?d[f]:null,q=e?e[f]:null,r;r=p(g,h,m,q);g&&!n(g)&&delete a[f];h&&!l(h)&&delete b[f];m&&!n(m)&&delete d[f];q&&!l(q)&&delete e[f];return r}function f(a,b){return{opSpecsA:[a],opSpecsB:[b]}}var r;r={AddCursor:{AddCursor:f,AddMember:f,AddStyle:f,ApplyDirectStyling:f,
InsertText:f,MoveCursor:f,RemoveCursor:f,RemoveMember:f,RemoveStyle:f,RemoveText:f,SetParagraphStyle:f,SplitParagraph:f,UpdateMember:f,UpdateMetadata:f,UpdateParagraphStyle:f},AddMember:{AddStyle:f,InsertText:f,MoveCursor:f,RemoveCursor:f,RemoveStyle:f,RemoveText:f,SetParagraphStyle:f,SplitParagraph:f,UpdateMetadata:f,UpdateParagraphStyle:f},AddStyle:{AddStyle:f,ApplyDirectStyling:f,InsertText:f,MoveCursor:f,RemoveCursor:f,RemoveMember:f,RemoveStyle:function(a,c){var d,e=[a],f=[c];a.styleFamily===
c.styleFamily&&(d=b(a.setProperties,c.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:c.memberid,timestamp:c.timestamp,styleName:a.styleName,removedProperties:{attributes:d.join(",")}},f.unshift(d)),g(a.setProperties,c.styleName));return{opSpecsA:e,opSpecsB:f}},RemoveText:f,SetParagraphStyle:f,SplitParagraph:f,UpdateMember:f,UpdateMetadata:f,UpdateParagraphStyle:f},ApplyDirectStyling:{ApplyDirectStyling:function(a,b,f){var e,g,h,l,m,p,r,s;l=[a];h=[b];if(!(a.position+a.length<=b.position||
a.position>=b.position+b.length)){e=f?a:b;g=f?b:a;if(a.position!==b.position||a.length!==b.length)p=d(e),r=d(g);b=q(g.setProperties,null,e.setProperties,null,"style:text-properties");if(b.majorChanged||b.minorChanged)h=[],a=[],l=e.position+e.length,m=g.position+g.length,g.position<e.position?b.minorChanged&&(s=d(r),s.length=e.position-g.position,a.push(s),g.position=e.position,g.length=m-g.position):e.position<g.position&&b.majorChanged&&(s=d(p),s.length=g.position-e.position,h.push(s),e.position=
g.position,e.length=l-e.position),m>l?b.minorChanged&&(p=r,p.position=l,p.length=m-l,a.push(p),g.length=l-g.position):l>m&&b.majorChanged&&(p.position=m,p.length=l-m,h.push(p),e.length=m-e.position),e.setProperties&&n(e.setProperties)&&h.push(e),g.setProperties&&n(g.setProperties)&&a.push(g),f?(l=h,h=a):l=a}return{opSpecsA:l,opSpecsB:h}},InsertText:function(a,b){b.position<=a.position?a.position+=b.text.length:b.position<=a.position+a.length&&(a.length+=b.text.length);return{opSpecsA:[a],opSpecsB:[b]}},
MoveCursor:f,RemoveCursor:f,RemoveStyle:f,RemoveText:function(a,b){var d=a.position+a.length,e=b.position+b.length,f=[a],g=[b];e<=a.position?a.position-=b.length:b.position<d&&(a.position<b.position?a.length=e<d?a.length-b.length:b.position-a.position:(a.position=b.position,e<d?a.length=d-e:f=[]));return{opSpecsA:f,opSpecsB:g}},SetParagraphStyle:f,SplitParagraph:function(a,b){b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMetadata:f,
UpdateParagraphStyle:f},InsertText:{InsertText:function(a,b,d){a.position<b.position?b.position+=a.text.length:a.position>b.position?a.position+=b.text.length:d?b.position+=a.text.length:a.position+=b.text.length;return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:function(a,b){var d=h(b);a.position<b.position?b.position+=a.text.length:a.position<b.position+b.length&&(b.length+=a.text.length);d&&m(b);return{opSpecsA:[a],opSpecsB:[b]}},RemoveCursor:f,RemoveMember:f,RemoveStyle:f,RemoveText:function(a,b){var d;
d=b.position+b.length;var e=[a],f=[b];d<=a.position?a.position-=b.length:a.position<=b.position?b.position+=a.text.length:(b.length=a.position-b.position,d={optype:"RemoveText",memberid:b.memberid,timestamp:b.timestamp,position:a.position+a.text.length,length:d-a.position},f.unshift(d),a.position=b.position);return{opSpecsA:e,opSpecsB:f}},SplitParagraph:function(a,b,d){if(a.position<b.position)b.position+=a.text.length;else if(a.position>b.position)a.position+=1;else return d?b.position+=a.text.length:
a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:f,UpdateMetadata:f,UpdateParagraphStyle:f},MoveCursor:{MoveCursor:f,RemoveCursor:function(a,b){return{opSpecsA:a.memberid===b.memberid?[]:[a],opSpecsB:[b]}},RemoveMember:f,RemoveStyle:f,RemoveText:function(a,b){var d=h(a),e=a.position+a.length,f=b.position+b.length;f<=a.position?a.position-=b.length:b.position<e&&(a.position<b.position?a.length=f<e?a.length-b.length:b.position-a.position:(a.position=b.position,a.length=f<e?e-f:0));
d&&m(a);return{opSpecsA:[a],opSpecsB:[b]}},SetParagraphStyle:f,SplitParagraph:function(a,b){var d=h(a);b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);d&&m(a);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:f,UpdateMetadata:f,UpdateParagraphStyle:f},RemoveCursor:{RemoveCursor:function(a,b){var d=a.memberid===b.memberid;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveMember:f,RemoveStyle:f,RemoveText:f,SetParagraphStyle:f,SplitParagraph:f,UpdateMember:f,UpdateMetadata:f,
UpdateParagraphStyle:f},RemoveMember:{RemoveStyle:f,RemoveText:f,SetParagraphStyle:f,SplitParagraph:f,UpdateMetadata:f,UpdateParagraphStyle:f},RemoveStyle:{RemoveStyle:function(a,b){var d=a.styleName===b.styleName&&a.styleFamily===b.styleFamily;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveText:f,SetParagraphStyle:function(a,b){var d,e=[a],f=[b];"paragraph"===a.styleFamily&&a.styleName===b.styleName&&(d={optype:"SetParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,position:b.position,
styleName:""},e.unshift(d),b.styleName="");return{opSpecsA:e,opSpecsB:f}},SplitParagraph:f,UpdateMember:f,UpdateMetadata:f,UpdateParagraphStyle:function(a,c){var d,e=[a],f=[c];"paragraph"===a.styleFamily&&(d=b(c.setProperties,a.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,styleName:c.styleName,removedProperties:{attributes:d.join(",")}},e.unshift(d)),a.styleName===c.styleName?f=[]:g(c.setProperties,a.styleName));return{opSpecsA:e,opSpecsB:f}}},
RemoveText:{RemoveText:function(a,b){var d=a.position+a.length,e=b.position+b.length,f=[a],g=[b];e<=a.position?a.position-=b.length:d<=b.position?b.position-=a.length:b.position<d&&(a.position<b.position?(a.length=e<d?a.length-b.length:b.position-a.position,d<e?(b.position=a.position,b.length=e-d):g=[]):(d<e?b.length-=a.length:b.position<a.position?b.length=a.position-b.position:g=[],e<d?(a.position=b.position,a.length=d-e):f=[]));return{opSpecsA:f,opSpecsB:g}},SplitParagraph:function(a,b){var d=
a.position+a.length,e=[a],f=[b];b.position<=a.position?a.position+=1:b.position<d&&(a.length=b.position-a.position,d={optype:"RemoveText",memberid:a.memberid,timestamp:a.timestamp,position:b.position+1,length:d-b.position},e.unshift(d));a.position+a.length<=b.position?b.position-=a.length:a.position<b.position&&(b.position=a.position);return{opSpecsA:e,opSpecsB:f}},UpdateMember:f,UpdateMetadata:f,UpdateParagraphStyle:f},SetParagraphStyle:{UpdateMember:f,UpdateMetadata:f,UpdateParagraphStyle:f},SplitParagraph:{SplitParagraph:function(a,
b,d){a.position<b.position?b.position+=1:a.position>b.position?a.position+=1:a.position===b.position&&(d?b.position+=1:a.position+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:f,UpdateMetadata:f,UpdateParagraphStyle:f},UpdateMember:{UpdateMetadata:f,UpdateParagraphStyle:f},UpdateMetadata:{UpdateMetadata:function(a,b,d){var e,f=[a],g=[b];e=d?a:b;a=d?b:a;p(a.setProperties||null,a.removedProperties||null,e.setProperties||null,e.removedProperties||null);e.setProperties&&n(e.setProperties)||e.removedProperties&&
l(e.removedProperties)||(d?f=[]:g=[]);a.setProperties&&n(a.setProperties)||a.removedProperties&&l(a.removedProperties)||(d?g=[]:f=[]);return{opSpecsA:f,opSpecsB:g}},UpdateParagraphStyle:f},UpdateParagraphStyle:{UpdateParagraphStyle:function(a,b,d){var e,f=[a],g=[b];a.styleName===b.styleName&&(e=d?a:b,a=d?b:a,q(a.setProperties,a.removedProperties,e.setProperties,e.removedProperties,"style:paragraph-properties"),q(a.setProperties,a.removedProperties,e.setProperties,e.removedProperties,"style:text-properties"),
p(a.setProperties||null,a.removedProperties||null,e.setProperties||null,e.removedProperties||null),e.setProperties&&n(e.setProperties)||e.removedProperties&&l(e.removedProperties)||(d?f=[]:g=[]),a.setProperties&&n(a.setProperties)||a.removedProperties&&l(a.removedProperties)||(d?g=[]:f=[]));return{opSpecsA:f,opSpecsB:g}}}};this.passUnchanged=f;this.extendTransformations=function(a){Object.keys(a).forEach(function(b){var d=a[b],e,f=r.hasOwnProperty(b);runtime.log((f?"Extending":"Adding")+" map for optypeA: "+
b);f||(r[b]={});e=r[b];Object.keys(d).forEach(function(a){var f=e.hasOwnProperty(a);runtime.assert(b<=a,"Wrong order:"+b+", "+a);runtime.log("  "+(f?"Overwriting":"Adding")+" entry for optypeB: "+a);e[a]=d[a]})})};this.transformOpspecVsOpspec=function(a,b){var d=a.optype<=b.optype,e;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(a));runtime.log(runtime.toJson(b));d||(e=a,a=b,b=e);(e=(e=r[a.optype])&&e[b.optype])?(e=e(a,b,!d),d||null===e||(e={opSpecsA:e.opSpecsB,opSpecsB:e.opSpecsA})):
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
ops.OperationTransformer=function(){function m(d){var g=[];d.forEach(function(d){g.push(b.create(d))});return g}function h(b,m){for(var n,l,q=[],f=[];0<b.length&&m;){n=b.shift();n=g.transformOpspecVsOpspec(n,m);if(!n)return null;q=q.concat(n.opSpecsA);if(0===n.opSpecsB.length){q=q.concat(b);m=null;break}for(;1<n.opSpecsB.length;){l=h(b,n.opSpecsB.shift());if(!l)return null;f=f.concat(l.opSpecsB);b=l.opSpecsA}m=n.opSpecsB.pop()}m&&f.push(m);return{opSpecsA:q,opSpecsB:f}}var b,g=new ops.OperationTransformMatrix;
this.setOperationFactory=function(d){b=d};this.getOperationTransformMatrix=function(){return g};this.transform=function(b,g){for(var n,l=[];0<g.length;){n=h(b,g.shift());if(!n)return null;b=n.opSpecsA;l=l.concat(n.opSpecsB)}return{opsA:m(b),opsB:m(l)}}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(m,h){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(m,h,b,g){};ops.Server.prototype.joinSession=function(m,h,b,g){};ops.Server.prototype.leaveSession=function(m,h,b,g){};ops.Server.prototype.getGenesisUrl=function(m){};
// Input 110
var webodf_css='@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n@namespace svgns url(http://www.w3.org/2000/svg);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let\'s not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\noffice|document *::selection {\n  background: transparent;\n}\noffice|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\ndraw|frame {\n  /** make sure frames are above the main body. */\n  z-index: 1;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:"";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\noffice|text[webodfhelper|links="inactive"] text|a {\n    cursor: text;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n    pointer-events: none;\n}\n\ncursor|cursor > .caret {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > .handle {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > .handle > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > .handle.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > .handle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n/** Input Method Editor input pane & behaviours */\n/* not within a cursor */\n#eventTrap {\n    height: auto;\n    display: block;\n    position: absolute;\n    width: 1px;\n    outline: none;\n    opacity: 0;\n    color: rgba(255, 255, 255, 0); /* hide the blinking caret by setting the colour to fully transparent */\n    overflow: hidden; /* The overflow visibility is used to hide and show characters being entered */\n    pointer-events: none;\n}\n\n/* within a cursor */\ncursor|cursor > #composer {\n    text-decoration: underline;\n}\n\ncursor|cursor[cursor|composing="true"] > #composer {\n    display: inline-block;\n    height: auto;\n    width: auto;\n}\n\ncursor|cursor[cursor|composing="true"] {\n    display: inline-block;\n    width: auto;\n    height: inherit;\n}\n\ncursor|cursor[cursor|composing="true"] > .caret {\n    /* during composition, the caret should be pushed along by the composition text, inline with the text */\n    position: static;\n    /* as it is now part of an inline-block, it will no longer need correct to top or height values to align properly */\n    height: auto !important;\n    top: auto !important;\n}\n\neditinfo|editinfo {\n    /* Empty or invisible display:inline elements respond very badly to mouse selection.\n       Inline blocks are much more reliably selectable in Chrome & friends */\n    display: inline-block;\n}\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: \'\u00d7\';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: \'\';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n    color: black;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 15;\n}\n.selectionOverlay > polygon {\n    fill-opacity: 0.3;\n    stroke-opacity: 0.8;\n    stroke-width: 1;\n    fill-rule: evenodd;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\ndiv.customScrollbars::-webkit-scrollbar\n{\n    width: 8px;\n    height: 8px;\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-track\n{\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-thumb\n{\n    background-color: #444;\n    border-radius: 4px;\n}\n';
