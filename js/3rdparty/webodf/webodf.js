// Input 0
var webodf_version="0.4.2-2050-g8d8fc02";
// Input 1
function Runtime(){}Runtime.prototype.getVariable=function(m){};Runtime.prototype.toJson=function(m){};Runtime.prototype.fromJson=function(m){};Runtime.prototype.byteArrayFromString=function(m,h){};Runtime.prototype.byteArrayToString=function(m,h){};Runtime.prototype.read=function(m,h,b,g){};Runtime.prototype.readFile=function(m,h,b){};Runtime.prototype.readFileSync=function(m,h){};Runtime.prototype.loadXML=function(m,h){};Runtime.prototype.writeFile=function(m,h,b){};
Runtime.prototype.isFile=function(m,h){};Runtime.prototype.getFileSize=function(m,h){};Runtime.prototype.deleteFile=function(m,h){};Runtime.prototype.log=function(m,h){};Runtime.prototype.setTimeout=function(m,h){};Runtime.prototype.clearTimeout=function(m){};Runtime.prototype.libraryPaths=function(){};Runtime.prototype.currentDirectory=function(){};Runtime.prototype.setCurrentDirectory=function(m){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};
Runtime.prototype.parseXML=function(m){};Runtime.prototype.exit=function(m){};Runtime.prototype.getWindow=function(){};Runtime.prototype.requestAnimationFrame=function(m){};Runtime.prototype.cancelAnimationFrame=function(m){};Runtime.prototype.assert=function(m,h,b){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(m,h){function b(b){var p="",k,d=b.length;for(k=0;k<d;k+=1)p+=String.fromCharCode(b[k]&255);return p}function g(b){var d="",k,g=b.length,e=[],r,a,c,l;for(k=0;k<g;k+=1)r=b[k],128>r?e.push(r):(k+=1,a=b[k],194<=r&&224>r?e.push((r&31)<<6|a&63):(k+=1,c=b[k],224<=r&&240>r?e.push((r&15)<<12|(a&63)<<6|c&63):(k+=1,l=b[k],240<=r&&245>r&&(r=(r&7)<<18|(a&63)<<12|(c&63)<<6|l&63,r-=65536,e.push((r>>10)+55296,(r&1023)+56320))))),1E3===e.length&&(d+=String.fromCharCode.apply(null,
e),e.length=0);return d+String.fromCharCode.apply(null,e)}var d;"utf8"===h?d=g(m):("binary"!==h&&this.log("Unsupported encoding: "+h),d=b(m));return d};Runtime.getVariable=function(m){try{return eval(m)}catch(h){}};Runtime.toJson=function(m){return JSON.stringify(m)};Runtime.fromJson=function(m){return JSON.parse(m)};Runtime.getFunctionName=function(m){return void 0===m.name?(m=/function\s+(\w+)/.exec(m))&&m[1]:m.name};
function BrowserRuntime(m){function h(r){var a=r.length,c,l,f=0;for(c=0;c<a;c+=1)l=r.charCodeAt(c),f+=1+(128<l)+(2048<l),55040<l&&57344>l&&(f+=1,c+=1);return f}function b(r,a,c){var l=r.length,f,b;a=new Uint8Array(new ArrayBuffer(a));c?(a[0]=239,a[1]=187,a[2]=191,b=3):b=0;for(c=0;c<l;c+=1)f=r.charCodeAt(c),128>f?(a[b]=f,b+=1):2048>f?(a[b]=192|f>>>6,a[b+1]=128|f&63,b+=2):55040>=f||57344<=f?(a[b]=224|f>>>12&15,a[b+1]=128|f>>>6&63,a[b+2]=128|f&63,b+=3):(c+=1,f=(f-55296<<10|r.charCodeAt(c)-56320)+65536,
a[b]=240|f>>>18&7,a[b+1]=128|f>>>12&63,a[b+2]=128|f>>>6&63,a[b+3]=128|f&63,b+=4);return a}function g(b){var a=b.length,c=new Uint8Array(new ArrayBuffer(a)),l;for(l=0;l<a;l+=1)c[l]=b.charCodeAt(l)&255;return c}function d(b,a){var c,l,f;void 0!==a?f=b:a=b;m?(l=m.ownerDocument,f&&(c=l.createElement("span"),c.className=f,c.appendChild(l.createTextNode(f)),m.appendChild(c),m.appendChild(l.createTextNode(" "))),c=l.createElement("span"),0<a.length&&"<"===a[0]?c.innerHTML=a:c.appendChild(l.createTextNode(a)),
m.appendChild(c),m.appendChild(l.createElement("br"))):console&&console.log(a);"alert"===f&&alert(a)}function n(r,a,c){if(0!==c.status||c.responseText)if(200===c.status||0===c.status){if(c.response&&"string"!==typeof c.response)"binary"===a?(c=c.response,c=new Uint8Array(c)):c=String(c.response);else if("binary"===a)if(null!==c.responseBody&&"undefined"!==String(typeof VBArray)){c=(new VBArray(c.responseBody)).toArray();var l=c.length,f=new Uint8Array(new ArrayBuffer(l));for(a=0;a<l;a+=1)f[a]=c[a];
c=f}else{(a=c.getResponseHeader("Content-Length"))&&(a=parseInt(a,10));if(a&&a!==c.responseText.length)a:{var l=c.responseText,f=!1,k=h(l);if("number"===typeof a){if(a!==k&&a!==k+3){l=void 0;break a}f=k+3===a;k=a}l=b(l,k,f)}void 0===l&&(l=g(c.responseText));c=l}else c=c.responseText;e[r]=c;r={err:null,data:c}}else r={err:c.responseText||c.statusText,data:null};else r={err:"File "+r+" is empty.",data:null};return r}function p(b,a,c){var l=new XMLHttpRequest;l.open("GET",b,c);l.overrideMimeType&&("binary"!==
a?l.overrideMimeType("text/plain; charset="+a):l.overrideMimeType("text/plain; charset=x-user-defined"));return l}function k(b,a,c){function l(){var l;4===f.readyState&&(l=n(b,a,f),c(l.err,l.data))}if(e.hasOwnProperty(b))c(null,e[b]);else{var f=p(b,a,!0);f.onreadystatechange=l;try{f.send(null)}catch(k){c(k.message,null)}}}var q=this,e={};this.byteArrayFromString=function(r,a){var c;"utf8"===a?c=b(r,h(r),!1):("binary"!==a&&q.log("unknown encoding: "+a),c=g(r));return c};this.byteArrayToString=Runtime.byteArrayToString;
this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=k;this.read=function(b,a,c,l){k(b,"binary",function(f,b){var r=null;if(b){if("string"===typeof b)throw"This should not happen.";r=b.subarray(a,a+c)}l(f,r)})};this.readFileSync=function(b,a){var c=p(b,a,!1),l;try{c.send(null);l=n(b,a,c);if(l.err)throw l.err;if(null===l.data)throw"No data read from "+b+".";}catch(f){throw f;}return l.data};this.writeFile=function(b,a,c){e[b]=a;var l=new XMLHttpRequest,
f;l.open("PUT",b,!0);l.onreadystatechange=function(){4===l.readyState&&(0!==l.status||l.responseText?200<=l.status&&300>l.status||0===l.status?c(null):c("Status "+String(l.status)+": "+l.responseText||l.statusText):c("File "+b+" is empty."))};f=a.buffer&&!l.sendAsBinary?a.buffer:q.byteArrayToString(a,"binary");try{l.sendAsBinary?l.sendAsBinary(f):l.send(f)}catch(k){q.log("HUH? "+k+" "+a),c(k.message)}};this.deleteFile=function(b,a){delete e[b];var c=new XMLHttpRequest;c.open("DELETE",b,!0);c.onreadystatechange=
function(){4===c.readyState&&(200>c.status&&300<=c.status?a(c.responseText):a(null))};c.send(null)};this.loadXML=function(b,a){var c=new XMLHttpRequest;c.open("GET",b,!0);c.overrideMimeType&&c.overrideMimeType("text/xml");c.onreadystatechange=function(){4===c.readyState&&(0!==c.status||c.responseText?200===c.status||0===c.status?a(null,c.responseXML):a(c.responseText,null):a("File "+b+" is empty.",null))};try{c.send(null)}catch(l){a(l.message,null)}};this.isFile=function(b,a){q.getFileSize(b,function(c){a(-1!==
c)})};this.getFileSize=function(b,a){if(e.hasOwnProperty(b)&&"string"!==typeof e[b])a(e[b].length);else{var c=new XMLHttpRequest;c.open("HEAD",b,!0);c.onreadystatechange=function(){if(4===c.readyState){var l=c.getResponseHeader("Content-Length");l?a(parseInt(l,10)):k(b,"binary",function(c,l){c?a(-1):a(l.length)})}};c.send(null)}};this.log=d;this.assert=function(b,a,c){if(!b)throw d("alert","ASSERTION FAILED:\n"+a),c&&c(),a;};this.setTimeout=function(b,a){return setTimeout(function(){b()},a)};this.clearTimeout=
function(b){clearTimeout(b)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.currentDirectory=function(){return""};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(b){return(new DOMParser).parseFromString(b,"text/xml")};this.exit=function(b){d("Calling exit with code "+String(b)+", but exit() is not implemented.")};this.getWindow=function(){return window};this.requestAnimationFrame=
function(b){var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,c=0;if(a)a.bind(window),c=a(b);else return setTimeout(b,15);return c};this.cancelAnimationFrame=function(b){var a=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame;a?(a.bind(window),a(b)):clearTimeout(b)}}
function NodeJSRuntime(){function m(b){var e=b.length,k,a=new Uint8Array(new ArrayBuffer(e));for(k=0;k<e;k+=1)a[k]=b[k];return a}function h(b,e,k){function a(a,l){if(a)return k(a,null);if(!l)return k("No data for "+b+".",null);if("string"===typeof l)return k(a,l);k(a,m(l))}b=d.resolve(n,b);"binary"!==e?g.readFile(b,e,a):g.readFile(b,null,a)}var b=this,g=require("fs"),d=require("path"),n="",p,k;this.byteArrayFromString=function(b,e){var k=new Buffer(b,e),a,c=k.length,l=new Uint8Array(new ArrayBuffer(c));
for(a=0;a<c;a+=1)l[a]=k[a];return l};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=h;this.loadXML=function(k,e){h(k,"utf-8",function(d,a){if(d)return e(d,null);if(!a)return e("No data for "+k+".",null);e(null,b.parseXML(a))})};this.writeFile=function(b,e,k){e=new Buffer(e);b=d.resolve(n,b);g.writeFile(b,e,"binary",function(a){k(a||null)})};this.deleteFile=function(b,e){b=d.resolve(n,b);
g.unlink(b,e)};this.read=function(b,e,k,a){b=d.resolve(n,b);g.open(b,"r+",666,function(c,l){if(c)a(c,null);else{var f=new Buffer(k);g.read(l,f,0,k,e,function(c){g.close(l);a(c,m(f))})}})};this.readFileSync=function(b,e){var k;k=g.readFileSync(b,"binary"===e?null:e);if(null===k)throw"File "+b+" could not be read.";"binary"===e&&(k=m(k));return k};this.isFile=function(b,k){b=d.resolve(n,b);g.stat(b,function(b,a){k(!b&&a.isFile())})};this.getFileSize=function(b,k){b=d.resolve(n,b);g.stat(b,function(b,
a){b?k(-1):k(a.size)})};this.log=function(b,k){var d;void 0!==k?d=b:k=b;"alert"===d&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(k+"\n");"alert"===d&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(b,k,d){b||(process.stderr.write("ASSERTION FAILED: "+k),d&&d())};this.setTimeout=function(b,k){return setTimeout(function(){b()},k)};this.clearTimeout=function(b){clearTimeout(b)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(b){n=
b};this.currentDirectory=function(){return n};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return k};this.parseXML=function(b){return p.parseFromString(b,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};this.requestAnimationFrame=function(b){return setTimeout(b,15)};this.cancelAnimationFrame=function(b){clearTimeout(b)};p=new (require("xmldom").DOMParser);k=b.parseXML("<a/>").implementation}
function RhinoRuntime(){function m(b,d){var e;void 0!==d?e=b:d=b;"alert"===e&&print("\n!!!!! ALERT !!!!!");print(d);"alert"===e&&print("!!!!! ALERT !!!!!")}var h=this,b={},g=b.javax.xml.parsers.DocumentBuilderFactory.newInstance(),d,n,p="";g.setValidating(!1);g.setNamespaceAware(!0);g.setExpandEntityReferences(!1);g.setSchema(null);n=b.org.xml.sax.EntityResolver({resolveEntity:function(k,d){var e=new b.java.io.FileReader(d);return new b.org.xml.sax.InputSource(e)}});d=g.newDocumentBuilder();d.setEntityResolver(n);
this.byteArrayFromString=function(b,d){var e,g=b.length,a=new Uint8Array(new ArrayBuffer(g));for(e=0;e<g;e+=1)a[e]=b.charCodeAt(e)&255;return a};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.loadXML=function(k,g){var e=new b.java.io.File(k),p=null;try{p=d.parse(e)}catch(a){return print(a),g(a,null)}g(null,p)};this.readFile=function(k,d,e){p&&(k=p+"/"+k);var g=new b.java.io.File(k),a="binary"===d?
"latin1":d;g.isFile()?((k=readFile(k,a))&&"binary"===d&&(k=h.byteArrayFromString(k,"binary")),e(null,k)):e(k+" is not a file.",null)};this.writeFile=function(k,d,e){p&&(k=p+"/"+k);k=new b.java.io.FileOutputStream(k);var g,a=d.length;for(g=0;g<a;g+=1)k.write(d[g]);k.close();e(null)};this.deleteFile=function(k,d){p&&(k=p+"/"+k);var e=new b.java.io.File(k),g=k+Math.random(),g=new b.java.io.File(g);e.rename(g)?(g.deleteOnExit(),d(null)):d("Could not delete "+k)};this.read=function(k,d,e,g){p&&(k=p+"/"+
k);var a;a=k;var c="binary";(new b.java.io.File(a)).isFile()?("binary"===c&&(c="latin1"),a=readFile(a,c)):a=null;a?g(null,this.byteArrayFromString(a.substring(d,d+e),"binary")):g("Cannot read "+k,null)};this.readFileSync=function(b,d){if(!d)return"";var e=readFile(b,d);if(null===e)throw"File could not be read.";return e};this.isFile=function(k,d){p&&(k=p+"/"+k);var e=new b.java.io.File(k);d(e.isFile())};this.getFileSize=function(k,d){p&&(k=p+"/"+k);var e=new b.java.io.File(k);d(e.length())};this.log=
m;this.assert=function(b,d,e){b||(m("alert","ASSERTION FAILED: "+d),e&&e())};this.setTimeout=function(b){b();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(b){p=b};this.currentDirectory=function(){return p};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return d.getDOMImplementation()};this.parseXML=function(k){k=new b.java.io.StringReader(k);k=new b.org.xml.sax.InputSource(k);return d.parse(k)};
this.exit=quit;this.getWindow=function(){return null};this.requestAnimationFrame=function(b){b();return 0};this.cancelAnimationFrame=function(){}}Runtime.create=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime};var runtime=Runtime.create(),core={},gui={},xmldom={},odf={},ops={};
(function(){function m(b,d,e){var g=b+"/manifest.json",a,c;runtime.log("Loading manifest: "+g);try{a=runtime.readFileSync(g,"utf-8")}catch(l){if(e)runtime.log("No loadable manifest found.");else throw console.log(String(l)),l;return}e=JSON.parse(a);for(c in e)e.hasOwnProperty(c)&&(d[c]={dir:b,deps:e[c]})}function h(b,d,e){function g(b){if(!l[b]&&!e(b)){if(c[b])throw"Circular dependency detected for "+b+".";c[b]=!0;if(!d[b])throw"Missing dependency information for class "+b+".";var k=d[b],p=k.deps,
h,n=p.length;for(h=0;h<n;h+=1)g(p[h]);c[b]=!1;l[b]=!0;a.push(k.dir+"/"+b.replace(".","/")+".js")}}var a=[],c={},l={};b.forEach(g);return a}function b(b,d){return d=d+("\n//# sourceURL="+b)+("\n//@ sourceURL="+b)}function g(d){var g,e;for(g=0;g<d.length;g+=1)e=runtime.readFileSync(d[g],"utf-8"),e=b(d[g],e),eval(e)}function d(b){b=b.split(".");var d,e=p,g=b.length;for(d=0;d<g;d+=1){if(!e.hasOwnProperty(b[d]))return!1;e=e[b[d]]}return!0}var n,p={core:core,gui:gui,xmldom:xmldom,odf:odf,ops:ops};runtime.loadClasses=
function(b,p){if(IS_COMPILED_CODE||0===b.length)return p&&p();var e;if(!(e=n)){e=[];var r=runtime.libraryPaths(),a;runtime.currentDirectory()&&-1===r.indexOf(runtime.currentDirectory())&&m(runtime.currentDirectory(),e,!0);for(a=0;a<r.length;a+=1)m(r[a],e)}n=e;b=h(b,n,d);if(0===b.length)return p&&p();if("BrowserRuntime"===runtime.type()&&p){e=b;r=document.currentScript||document.documentElement.lastChild;a=document.createDocumentFragment();var c,l;for(l=0;l<e.length;l+=1)c=document.createElement("script"),
c.type="text/javascript",c.charset="utf-8",c.async=!1,c.setAttribute("src",e[l]),a.appendChild(c);p&&(c.onload=p);r.parentNode.insertBefore(a,r)}else g(b),p&&p()};runtime.loadClass=function(b,d){runtime.loadClasses([b],d)}})();(function(){var m=function(h){return h};runtime.getTranslator=function(){return m};runtime.setTranslator=function(h){m=h};runtime.tr=function(h){var b=m(h);return b&&"string"===String(typeof b)?b:h}})();
(function(m){function h(b){if(b.length){var g=b[0];runtime.readFile(g,"utf8",function(d,h){function p(){var b;(b=eval(m))&&runtime.exit(b)}var k="",k=g.lastIndexOf("/"),m=h,k=-1!==k?g.substring(0,k):".";runtime.setCurrentDirectory(k);d?(runtime.log(d),runtime.exit(1)):null===m?(runtime.log("No code found for "+g),runtime.exit(1)):p.apply(null,b)})}}m=m?Array.prototype.slice.call(m):[];"NodeJSRuntime"===runtime.type()?h(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?h(m):h(m.slice(1))})("undefined"!==
String(typeof arguments)&&arguments);
// Input 2
core.Async=function(){this.forEach=function(m,h,b){function g(d){p!==n&&(d?(p=n,b(d)):(p+=1,p===n&&b(null)))}var d,n=m.length,p=0;for(d=0;d<n;d+=1)h(m[d],g)};this.destroyAll=function(m,h){function b(g,d){if(d)h(d);else if(g<m.length)m[g](function(d){b(g+1,d)});else h()}b(0,void 0)}};
// Input 3
function makeBase64(){function m(a){var c,b=a.length,l=new Uint8Array(new ArrayBuffer(b));for(c=0;c<b;c+=1)l[c]=a.charCodeAt(c)&255;return l}function h(a){var c,b="",l,f=a.length-2;for(l=0;l<f;l+=3)c=a[l]<<16|a[l+1]<<8|a[l+2],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>18],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12&63],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&
63];l===f+1?(c=a[l]<<4,b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],b+="=="):l===f&&(c=a[l]<<10|a[l+1]<<2,b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],b+="=");return b}function b(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,
"");var c=a.length,b=new Uint8Array(new ArrayBuffer(3*c)),l=a.length%4,d=0,e,g;for(e=0;e<c;e+=4)g=(f[a.charAt(e)]||0)<<18|(f[a.charAt(e+1)]||0)<<12|(f[a.charAt(e+2)]||0)<<6|(f[a.charAt(e+3)]||0),b[d]=g>>16,b[d+1]=g>>8&255,b[d+2]=g&255,d+=3;c=3*c-[0,0,2,1][l];return b.subarray(0,c)}function g(a){var c,b,l=a.length,f=0,d=new Uint8Array(new ArrayBuffer(3*l));for(c=0;c<l;c+=1)b=a[c],128>b?d[f++]=b:(2048>b?d[f++]=192|b>>>6:(d[f++]=224|b>>>12&15,d[f++]=128|b>>>6&63),d[f++]=128|b&63);return d.subarray(0,
f)}function d(a){var c,b,l,f,d=a.length,e=new Uint8Array(new ArrayBuffer(d)),g=0;for(c=0;c<d;c+=1)b=a[c],128>b?e[g++]=b:(c+=1,l=a[c],224>b?e[g++]=(b&31)<<6|l&63:(c+=1,f=a[c],e[g++]=(b&15)<<12|(l&63)<<6|f&63));return e.subarray(0,g)}function n(a){return h(m(a))}function p(a){return String.fromCharCode.apply(String,b(a))}function k(a){return d(m(a))}function q(a){a=d(a);for(var c="",b=0;b<a.length;)c+=String.fromCharCode.apply(String,a.subarray(b,b+45E3)),b+=45E3;return c}function e(a,c,b){var l,f,
d,e="";for(d=c;d<b;d+=1)c=a.charCodeAt(d)&255,128>c?e+=String.fromCharCode(c):(d+=1,l=a.charCodeAt(d)&255,224>c?e+=String.fromCharCode((c&31)<<6|l&63):(d+=1,f=a.charCodeAt(d)&255,e+=String.fromCharCode((c&15)<<12|(l&63)<<6|f&63)));return e}function r(a,c){function b(){var d=f+1E5;d>a.length&&(d=a.length);l+=e(a,f,d);f=d;d=f===a.length;c(l,d)&&!d&&runtime.setTimeout(b,0)}var l="",f=0;1E5>a.length?c(e(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),b())}function a(a){return g(m(a))}function c(a){return String.fromCharCode.apply(String,
g(a))}function l(a){return String.fromCharCode.apply(String,g(m(a)))}var f=function(a){var c={},b,l;b=0;for(l=a.length;b<l;b+=1)c[a.charAt(b)]=b;return c}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),v,w,z=runtime.getWindow(),x,t;z&&z.btoa?(x=z.btoa,v=function(a){return x(l(a))}):(x=n,v=function(c){return h(a(c))});z&&z.atob?(t=z.atob,w=function(a){a=t(a);return e(a,0,a.length)}):(t=p,w=function(a){return q(b(a))});core.Base64=function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=
h;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=b;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=g;this.convertByteArrayToUTF16Array=this.convertUTF8ArrayToUTF16Array=d;this.convertUTF8StringToBase64=n;this.convertBase64ToUTF8String=p;this.convertUTF8StringToUTF16Array=k;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=q;this.convertUTF8StringToUTF16String=r;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=a;this.convertUTF16ArrayToUTF8String=
c;this.convertUTF16StringToUTF8String=l;this.convertUTF16StringToBase64=v;this.convertBase64ToUTF16String=w;this.fromBase64=p;this.toBase64=n;this.atob=t;this.btoa=x;this.utob=l;this.btou=r;this.encode=v;this.encodeURI=function(a){return v(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return w(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))};return this};return core.Base64}core.Base64=makeBase64();
// Input 4
core.ByteArray=function(m){this.pos=0;this.data=m;this.readUInt32LE=function(){this.pos+=4;var h=this.data,b=this.pos;return h[--b]<<24|h[--b]<<16|h[--b]<<8|h[--b]};this.readUInt16LE=function(){this.pos+=2;var h=this.data,b=this.pos;return h[--b]<<8|h[--b]}};
// Input 5
core.ByteArrayWriter=function(m){function h(b){b>d-g&&(d=Math.max(2*d,g+b),b=new Uint8Array(new ArrayBuffer(d)),b.set(n),n=b)}var b=this,g=0,d=1024,n=new Uint8Array(new ArrayBuffer(d));this.appendByteArrayWriter=function(d){b.appendByteArray(d.getByteArray())};this.appendByteArray=function(b){var d=b.length;h(d);n.set(b,g);g+=d};this.appendArray=function(b){var d=b.length;h(d);n.set(b,g);g+=d};this.appendUInt16LE=function(d){b.appendArray([d&255,d>>8&255])};this.appendUInt32LE=function(d){b.appendArray([d&
255,d>>8&255,d>>16&255,d>>24&255])};this.appendString=function(d){b.appendByteArray(runtime.byteArrayFromString(d,m))};this.getLength=function(){return g};this.getByteArray=function(){var b=new Uint8Array(new ArrayBuffer(g));b.set(n.subarray(0,g));return b}};
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
(function(){function m(){var g,d,h,p,k,m,e,r,a;void 0===b&&(d=(g=runtime.getWindow())&&g.document,m=d.documentElement,e=d.body,b={rangeBCRIgnoresElementBCR:!1,unscaledRangeClientRects:!1,elementBCRIgnoresBodyScroll:!1},d&&(p=d.createElement("div"),p.style.position="absolute",p.style.left="-99999px",p.style.transform="scale(2)",p.style["-webkit-transform"]="scale(2)",k=d.createElement("div"),p.appendChild(k),e.appendChild(p),g=d.createRange(),g.selectNode(k),b.rangeBCRIgnoresElementBCR=0===g.getClientRects().length,
k.appendChild(d.createTextNode("Rect transform test")),d=k.getBoundingClientRect(),h=g.getBoundingClientRect(),b.unscaledRangeClientRects=2<Math.abs(d.height-h.height),p.style.transform="",p.style["-webkit-transform"]="",d=m.style.overflow,h=e.style.overflow,r=e.style.height,a=e.scrollTop,m.style.overflow="visible",e.style.overflow="visible",e.style.height="200%",e.scrollTop=e.scrollHeight,b.elementBCRIgnoresBodyScroll=g.getBoundingClientRect().top!==k.getBoundingClientRect().top,e.scrollTop=a,e.style.height=
r,e.style.overflow=h,m.style.overflow=d,g.detach(),e.removeChild(p),g=Object.keys(b).map(function(a){return a+":"+String(b[a])}).join(", "),runtime.log("Detected browser quirks - "+g)));return b}function h(b,d,h){for(b=b?b.firstElementChild:null;b;){if(b.localName===h&&b.namespaceURI===d)return b;b=b.nextElementSibling}return null}var b;core.DomUtils=function(){function b(a,c){for(var l=0,f;a.parentNode!==c;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(f=c.firstChild;f!==
a;)l+=1,f=f.nextSibling;return l}function d(a,c){return 0>=a.compareBoundaryPoints(Range.START_TO_START,c)&&0<=a.compareBoundaryPoints(Range.END_TO_END,c)}function n(a,c){var b=null;a.nodeType===Node.TEXT_NODE&&(0===a.length?(a.parentNode.removeChild(a),c.nodeType===Node.TEXT_NODE&&(b=c)):(c.nodeType===Node.TEXT_NODE&&(a.appendData(c.data),c.parentNode.removeChild(c)),b=a));return b}function p(a){for(var c=a.parentNode;a.firstChild;)c.insertBefore(a.firstChild,a);c.removeChild(a);return c}function k(a,
c){for(var b=a.parentNode,f=a.firstChild,d;f;)d=f.nextSibling,k(f,c),f=d;b&&c(a)&&p(a);return b}function q(a,c){return a===c||Boolean(a.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY)}function e(a,c,b){Object.keys(c).forEach(function(f){var d=f.split(":"),g=d[1],k=b(d[0]),d=c[f],h=typeof d;"object"===h?Object.keys(d).length&&(f=k?a.getElementsByTagNameNS(k,g)[0]||a.ownerDocument.createElementNS(k,f):a.getElementsByTagName(g)[0]||a.ownerDocument.createElement(f),a.appendChild(f),e(f,
d,b)):k&&(runtime.assert("number"===h||"string"===h,"attempting to map unsupported type '"+h+"' (key: "+f+")"),a.setAttributeNS(k,f,String(d)))})}var r=null;this.splitBoundaries=function(a){var c,l=[],f,d,e;if(a.startContainer.nodeType===Node.TEXT_NODE||a.endContainer.nodeType===Node.TEXT_NODE){f=a.endContainer;d=a.endContainer.nodeType!==Node.TEXT_NODE?a.endOffset===a.endContainer.childNodes.length:!1;e=a.endOffset;c=a.endContainer;if(e<c.childNodes.length)for(c=c.childNodes.item(e),e=0;c.firstChild;)c=
c.firstChild;else for(;c.lastChild;)c=c.lastChild,e=c.nodeType===Node.TEXT_NODE?c.textContent.length:c.childNodes.length;c===f&&(f=null);a.setEnd(c,e);e=a.endContainer;0!==a.endOffset&&e.nodeType===Node.TEXT_NODE&&(c=e,a.endOffset!==c.length&&(l.push(c.splitText(a.endOffset)),l.push(c)));e=a.startContainer;0!==a.startOffset&&e.nodeType===Node.TEXT_NODE&&(c=e,a.startOffset!==c.length&&(e=c.splitText(a.startOffset),l.push(c),l.push(e),a.setStart(e,0)));if(null!==f){for(e=a.endContainer;e.parentNode&&
e.parentNode!==f;)e=e.parentNode;d=d?f.childNodes.length:b(e,f);a.setEnd(f,d)}}return l};this.containsRange=d;this.rangesIntersect=function(a,c){return 0>=a.compareBoundaryPoints(Range.END_TO_START,c)&&0<=a.compareBoundaryPoints(Range.START_TO_END,c)};this.getNodesInRange=function(a,c,b){var f=[],d=a.commonAncestorContainer;b=a.startContainer.ownerDocument.createTreeWalker(d.nodeType===Node.TEXT_NODE?d.parentNode:d,b,c,!1);var e;a.endContainer.childNodes[a.endOffset-1]?(d=a.endContainer.childNodes[a.endOffset-
1],e=Node.DOCUMENT_POSITION_PRECEDING|Node.DOCUMENT_POSITION_CONTAINED_BY):(d=a.endContainer,e=Node.DOCUMENT_POSITION_PRECEDING);a.startContainer.childNodes[a.startOffset]?(a=a.startContainer.childNodes[a.startOffset],b.currentNode=a):a.startOffset===(a.startContainer.nodeType===Node.TEXT_NODE?a.startContainer.length:a.startContainer.childNodes.length)?(a=a.startContainer,b.currentNode=a,b.lastChild(),a=b.nextNode()):(a=a.startContainer,b.currentNode=a);a&&c(a)===NodeFilter.FILTER_ACCEPT&&f.push(a);
for(a=b.nextNode();a;){c=d.compareDocumentPosition(a);if(0!==c&&0===(c&e))break;f.push(a);a=b.nextNode()}return f};this.normalizeTextNodes=function(a){a&&a.nextSibling&&(a=n(a,a.nextSibling));a&&a.previousSibling&&n(a.previousSibling,a)};this.rangeContainsNode=function(a,c){var b=c.ownerDocument.createRange(),f=c.ownerDocument.createRange(),e;b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset);f.selectNodeContents(c);e=d(b,f);b.detach();f.detach();return e};this.mergeIntoParent=
p;this.removeUnwantedNodes=k;this.getElementsByTagNameNS=function(a,c,b){var f=[];a=a.getElementsByTagNameNS(c,b);f.length=b=a.length;for(c=0;c<b;c+=1)f[c]=a.item(c);return f};this.containsNode=function(a,c){return a===c||a.contains(c)};this.comparePoints=function(a,c,l,f){if(a===l)return f-c;var d=a.compareDocumentPosition(l);2===d?d=-1:4===d?d=1:10===d?(c=b(a,l),d=c<f?1:-1):(f=b(l,a),d=f<c?-1:1);return d};this.adaptRangeDifferenceToZoomLevel=function(a,c){return m().unscaledRangeClientRects?a:a/
c};this.getBoundingClientRect=function(a){var c=a.ownerDocument,b=m(),f=c.body;if((!1===b.unscaledRangeClientRects||b.rangeBCRIgnoresElementBCR)&&a.nodeType===Node.ELEMENT_NODE)return a=a.getBoundingClientRect(),b.elementBCRIgnoresBodyScroll?{left:a.left+f.scrollLeft,right:a.right+f.scrollLeft,top:a.top+f.scrollTop,bottom:a.bottom+f.scrollTop,width:a.width,height:a.height}:a;var d;r?d=r:r=d=c.createRange();b=d;b.selectNode(a);return b.getBoundingClientRect()};this.mapKeyValObjOntoNode=function(a,
c,b){Object.keys(c).forEach(function(f){var d=f.split(":"),e=d[1],d=b(d[0]),g=c[f];d?(e=a.getElementsByTagNameNS(d,e)[0],e||(e=a.ownerDocument.createElementNS(d,f),a.appendChild(e)),e.textContent=g):runtime.log("Key ignored: "+f)})};this.removeKeyElementsFromNode=function(a,c,b){c.forEach(function(c){var d=c.split(":"),e=d[1];(d=b(d[0]))?(e=a.getElementsByTagNameNS(d,e)[0])?e.parentNode.removeChild(e):runtime.log("Element for "+c+" not found."):runtime.log("Property Name ignored: "+c)})};this.getKeyValRepresentationOfNode=
function(a,c){for(var b={},f=a.firstElementChild,d;f;){if(d=c(f.namespaceURI))b[d+":"+f.localName]=f.textContent;f=f.nextElementSibling}return b};this.mapObjOntoNode=e;this.getDirectChild=h;(function(a){var c,b;b=runtime.getWindow();null!==b&&(c=b.navigator.appVersion.toLowerCase(),b=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")),c=c.indexOf("msie"),b||c)&&(a.containsNode=q)})(this)};return core.DomUtils})();
// Input 8
core.Cursor=function(m,h){function b(a){a.parentNode&&(k.push(a.previousSibling),k.push(a.nextSibling),a.parentNode.removeChild(a))}function g(a,c,b){if(c.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(c),"putCursorIntoTextNode: invalid container");var d=c.parentNode;runtime.assert(Boolean(d),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=c.length,"putCursorIntoTextNode: offset is out of bounds");0===b?d.insertBefore(a,c):(b!==c.length&&c.splitText(b),d.insertBefore(a,
c.nextSibling))}else c.nodeType===Node.ELEMENT_NODE&&c.insertBefore(a,c.childNodes.item(b));k.push(a.previousSibling);k.push(a.nextSibling)}var d=m.createElementNS("urn:webodf:names:cursor","cursor"),n=m.createElementNS("urn:webodf:names:cursor","anchor"),p,k=[],q=m.createRange(),e,r=new core.DomUtils;this.getNode=function(){return d};this.getAnchorNode=function(){return n.parentNode?n:d};this.getSelectedRange=function(){e?(q.setStartBefore(d),q.collapse(!0)):(q.setStartAfter(p?n:d),q.setEndBefore(p?
d:n));return q};this.setSelectedRange=function(a,c){q&&q!==a&&q.detach();q=a;p=!1!==c;(e=a.collapsed)?(b(n),b(d),g(d,a.startContainer,a.startOffset)):(b(n),b(d),g(p?d:n,a.endContainer,a.endOffset),g(p?n:d,a.startContainer,a.startOffset));k.forEach(r.normalizeTextNodes);k.length=0};this.hasForwardSelection=function(){return p};this.remove=function(){b(d);k.forEach(r.normalizeTextNodes);k.length=0};d.setAttributeNS("urn:webodf:names:cursor","memberId",h);n.setAttributeNS("urn:webodf:names:cursor","memberId",
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
core.EventNotifier=function(m){var h={};this.emit=function(b,g){var d,n;runtime.assert(h.hasOwnProperty(b),'unknown event fired "'+b+'"');n=h[b];for(d=0;d<n.length;d+=1)n[d](g)};this.subscribe=function(b,g){runtime.assert(h.hasOwnProperty(b),'tried to subscribe to unknown event "'+b+'"');h[b].push(g)};this.unsubscribe=function(b,g){var d;runtime.assert(h.hasOwnProperty(b),'tried to unsubscribe from unknown event "'+b+'"');d=h[b].indexOf(g);runtime.assert(-1!==d,'tried to unsubscribe unknown callback from event "'+
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
core.PositionIterator=function(m,h,b,g){function d(){this.acceptNode=function(a){return!a||a.nodeType===l&&0===a.length?w:v}}function n(a){this.acceptNode=function(c){return!c||c.nodeType===l&&0===c.length?w:a.acceptNode(c)}}function p(){var c=r.currentNode,b=c.nodeType;a=b===l?c.length-1:b===f?1:0}function k(){if(null===r.previousSibling()){if(!r.parentNode()||r.currentNode===m)return r.firstChild(),!1;a=0}else p();return!0}function q(){var b=r.currentNode,l;l=c(b);if(b!==m)for(b=b.parentNode;b&&
b!==m;)c(b)===w&&(r.currentNode=b,l=w),b=b.parentNode;l===w?(a=1,b=e.nextPosition()):b=l===v?!0:e.nextPosition();b&&runtime.assert(c(r.currentNode)===v,"moveToAcceptedNode did not result in walker being on an accepted node");return b}var e=this,r,a,c,l=Node.TEXT_NODE,f=Node.ELEMENT_NODE,v=NodeFilter.FILTER_ACCEPT,w=NodeFilter.FILTER_REJECT;this.nextPosition=function(){var c=r.currentNode,b=c.nodeType;if(c===m)return!1;if(0===a&&b===f)null===r.firstChild()&&(a=1);else if(b===l&&a+1<c.length)a+=1;else if(null!==
r.nextSibling())a=0;else if(r.parentNode())a=1;else return!1;return!0};this.previousPosition=function(){var c=!0,b=r.currentNode;0===a?c=k():b.nodeType===l?a-=1:null!==r.lastChild()?p():b===m?c=!1:a=0;return c};this.previousNode=k;this.container=function(){var c=r.currentNode,b=c.nodeType;0===a&&b!==l&&(c=c.parentNode);return c};this.rightNode=function(){var b=r.currentNode,d=b.nodeType;if(d===l&&a===b.length)for(b=b.nextSibling;b&&c(b)!==v;)b=b.nextSibling;else d===f&&1===a&&(b=null);return b};this.leftNode=
function(){var b=r.currentNode;if(0===a)for(b=b.previousSibling;b&&c(b)!==v;)b=b.previousSibling;else if(b.nodeType===f)for(b=b.lastChild;b&&c(b)!==v;)b=b.previousSibling;return b};this.getCurrentNode=function(){return r.currentNode};this.unfilteredDomOffset=function(){if(r.currentNode.nodeType===l)return a;for(var c=0,b=r.currentNode,b=1===a?b.lastChild:b.previousSibling;b;)c+=1,b=b.previousSibling;return c};this.getPreviousSibling=function(){var a=r.currentNode,c=r.previousSibling();r.currentNode=
a;return c};this.getNextSibling=function(){var a=r.currentNode,c=r.nextSibling();r.currentNode=a;return c};this.setPositionBeforeElement=function(c){runtime.assert(Boolean(c),"setPositionBeforeElement called without element");r.currentNode=c;a=0;return q()};this.setUnfilteredPosition=function(c,b){runtime.assert(Boolean(c),"PositionIterator.setUnfilteredPosition called without container");r.currentNode=c;if(c.nodeType===l)return a=b,runtime.assert(b<=c.length,"Error in setPosition: "+b+" > "+c.length),
runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),b===c.length&&(r.nextSibling()?a=0:r.parentNode()?a=1:runtime.assert(!1,"Error in setUnfilteredPosition: position not valid.")),!0;b<c.childNodes.length?(r.currentNode=c.childNodes.item(b),a=0):a=1;return q()};this.moveToEnd=function(){r.currentNode=m;a=1};this.moveToEndOfNode=function(c){c.nodeType===l?e.setUnfilteredPosition(c,c.length):(r.currentNode=c,a=1)};this.isBeforeNode=function(){return 0===a};this.getNodeFilter=function(){return c};
c=(b?new n(b):new d).acceptNode;c.acceptNode=c;h=h||NodeFilter.SHOW_ALL;runtime.assert(m.nodeType!==Node.TEXT_NODE,"Internet Explorer doesn't allow tree walker roots to be text nodes");r=m.ownerDocument.createTreeWalker(m,h,c,g);a=0;null===r.firstChild()&&(a=1)};
// Input 13
core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(m){};(function(){return core.PositionFilter})();
// Input 14
core.PositionFilterChain=function(){var m=[],h=core.PositionFilter.FilterResult.FILTER_ACCEPT,b=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(g){var d;for(d=0;d<m.length;d+=1)if(m[d].acceptPosition(g)===b)return b;return h};this.addFilter=function(b){m.push(b)}};
// Input 15
core.zip_HuftNode=function(){this.n=this.b=this.e=0;this.t=null};core.zip_HuftList=function(){this.list=this.next=null};
core.RawInflate=function(){function m(a,c,b,l,d,f){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var e=Array(this.BMAX+1),g,k,h,p,n,y,m,r=Array(this.BMAX+1),s,H,L,q=new core.zip_HuftNode,v=Array(this.BMAX);p=Array(this.N_MAX);var F,t=Array(this.BMAX+1),u,O,w;w=this.root=null;for(n=0;n<e.length;n++)e[n]=0;for(n=0;n<r.length;n++)r[n]=0;for(n=0;n<v.length;n++)v[n]=null;for(n=0;n<p.length;n++)p[n]=0;for(n=0;n<t.length;n++)t[n]=0;g=256<c?a[256]:this.BMAX;s=a;H=0;n=c;do e[s[H]]++,H++;
while(0<--n);if(e[0]===c)this.root=null,this.status=this.m=0;else{for(y=1;y<=this.BMAX&&0===e[y];y++);m=y;f<y&&(f=y);for(n=this.BMAX;0!==n&&0===e[n];n--);h=n;f>n&&(f=n);for(u=1<<y;y<n;y++,u<<=1)if(u-=e[y],0>u){this.status=2;this.m=f;return}u-=e[n];if(0>u)this.status=2,this.m=f;else{e[n]+=u;t[1]=y=0;s=e;H=1;for(L=2;0<--n;)y+=s[H++],t[L++]=y;s=a;n=H=0;do y=s[H++],0!==y&&(p[t[y]++]=n);while(++n<c);c=t[h];t[0]=n=0;s=p;H=0;p=-1;F=r[0]=0;L=null;O=0;for(m=m-1+1;m<=h;m++)for(a=e[m];0<a--;){for(;m>F+r[1+p];){F+=
r[1+p];p++;O=h-F;O=O>f?f:O;y=m-F;k=1<<y;if(k>a+1)for(k-=a+1,L=m;++y<O;){k<<=1;if(k<=e[++L])break;k-=e[L]}F+y>g&&F<g&&(y=g-F);O=1<<y;r[1+p]=y;L=Array(O);for(k=0;k<O;k++)L[k]=new core.zip_HuftNode;w=null===w?this.root=new core.zip_HuftList:w.next=new core.zip_HuftList;w.next=null;w.list=L;v[p]=L;0<p&&(t[p]=n,q.b=r[p],q.e=16+y,q.t=L,y=(n&(1<<F)-1)>>F-r[p],v[p-1][y].e=q.e,v[p-1][y].b=q.b,v[p-1][y].n=q.n,v[p-1][y].t=q.t)}q.b=m-F;H>=c?q.e=99:s[H]<b?(q.e=256>s[H]?16:15,q.n=s[H++]):(q.e=d[s[H]-b],q.n=l[s[H++]-
b]);k=1<<m-F;for(y=n>>F;y<O;y+=k)L[y].e=q.e,L[y].b=q.b,L[y].n=q.n,L[y].t=q.t;for(y=1<<m-1;0!==(n&y);y>>=1)n^=y;for(n^=y;(n&(1<<F)-1)!==t[p];)F-=r[p],p--}this.m=r[1];this.status=0!==u&&1!==h?1:0}}}function h(b){for(;c<b;){var l=a,d;d=s.length===y?-1:s[y++];a=l|d<<c;c+=8}}function b(c){return a&F[c]}function g(b){a>>=b;c-=b}function d(a,c,d){var f,e,n;if(0===d)return 0;for(n=0;;){h(t);e=z.list[b(t)];for(f=e.e;16<f;){if(99===f)return-1;g(e.b);f-=16;h(f);e=e.t[b(f)];f=e.e}g(e.b);if(16===f)k&=32767,a[c+
n++]=p[k++]=e.n;else{if(15===f)break;h(f);v=e.n+b(f);g(f);h(u);e=x.list[b(u)];for(f=e.e;16<f;){if(99===f)return-1;g(e.b);f-=16;h(f);e=e.t[b(f)];f=e.e}g(e.b);h(f);w=k-e.n-b(f);for(g(f);0<v&&n<d;)v--,w&=32767,k&=32767,a[c+n++]=p[k++]=p[w++]}if(n===d)return d}l=-1;return n}function n(a,c,l){var f,e,k,n,p,y,r,s=Array(316);for(f=0;f<s.length;f++)s[f]=0;h(5);y=257+b(5);g(5);h(5);r=1+b(5);g(5);h(4);f=4+b(4);g(4);if(286<y||30<r)return-1;for(e=0;e<f;e++)h(3),s[T[e]]=b(3),g(3);for(e=f;19>e;e++)s[T[e]]=0;t=
7;e=new m(s,19,19,null,null,t);if(0!==e.status)return-1;z=e.root;t=e.m;n=y+r;for(f=k=0;f<n;)if(h(t),p=z.list[b(t)],e=p.b,g(e),e=p.n,16>e)s[f++]=k=e;else if(16===e){h(2);e=3+b(2);g(2);if(f+e>n)return-1;for(;0<e--;)s[f++]=k}else{17===e?(h(3),e=3+b(3),g(3)):(h(7),e=11+b(7),g(7));if(f+e>n)return-1;for(;0<e--;)s[f++]=0;k=0}t=9;e=new m(s,y,257,L,O,t);0===t&&(e.status=1);if(0!==e.status)return-1;z=e.root;t=e.m;for(f=0;f<r;f++)s[f]=s[f+y];u=6;e=new m(s,r,0,H,U,u);x=e.root;u=e.m;return 0===u&&257<y||0!==e.status?
-1:d(a,c,l)}var p=[],k,q=null,e,r,a,c,l,f,v,w,z,x,t,u,s,y,F=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],L=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],O=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],H=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],U=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],T=[16,17,18,0,8,7,9,6,
10,5,11,4,12,3,13,2,14,1,15],X;this.inflate=function(F,T){p.length=65536;c=a=k=0;l=-1;f=!1;v=w=0;z=null;s=F;y=0;var G=new Uint8Array(new ArrayBuffer(T));a:for(var J=0,Q;J<T&&(!f||-1!==l);){if(0<v){if(0!==l)for(;0<v&&J<T;)v--,w&=32767,k&=32767,G[0+J]=p[k]=p[w],J+=1,k+=1,w+=1;else{for(;0<v&&J<T;)v-=1,k&=32767,h(8),G[0+J]=p[k]=b(8),J+=1,k+=1,g(8);0===v&&(l=-1)}if(J===T)break}if(-1===l){if(f)break;h(1);0!==b(1)&&(f=!0);g(1);h(2);l=b(2);g(2);z=null;v=0}switch(l){case 0:Q=G;var ea=0+J,P=T-J,N=void 0,N=
c&7;g(N);h(16);N=b(16);g(16);h(16);if(N!==(~a&65535))Q=-1;else{g(16);v=N;for(N=0;0<v&&N<P;)v--,k&=32767,h(8),Q[ea+N++]=p[k++]=b(8),g(8);0===v&&(l=-1);Q=N}break;case 1:if(null!==z)Q=d(G,0+J,T-J);else b:{Q=G;ea=0+J;P=T-J;if(null===q){for(var I=void 0,N=Array(288),I=void 0,I=0;144>I;I++)N[I]=8;for(I=144;256>I;I++)N[I]=9;for(I=256;280>I;I++)N[I]=7;for(I=280;288>I;I++)N[I]=8;r=7;I=new m(N,288,257,L,O,r);if(0!==I.status){alert("HufBuild error: "+I.status);Q=-1;break b}q=I.root;r=I.m;for(I=0;30>I;I++)N[I]=
5;X=5;I=new m(N,30,0,H,U,X);if(1<I.status){q=null;alert("HufBuild error: "+I.status);Q=-1;break b}e=I.root;X=I.m}z=q;x=e;t=r;u=X;Q=d(Q,ea,P)}break;case 2:Q=null!==z?d(G,0+J,T-J):n(G,0+J,T-J);break;default:Q=-1}if(-1===Q)break a;J+=Q}s=new Uint8Array(new ArrayBuffer(0));return G}};
// Input 16
core.ScheduledTask=function(m,h){function b(){n&&(runtime.clearTimeout(d),n=!1)}function g(){b();m.apply(void 0,p);p=null}var d,n=!1,p=[];this.trigger=function(){p=Array.prototype.slice.call(arguments);n||(n=!0,d=runtime.setTimeout(g,h))};this.triggerImmediate=function(){p=Array.prototype.slice.call(arguments);g()};this.processRequests=function(){n&&g()};this.cancel=b;this.destroy=function(d){b();d()}};
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
core.StepIterator=function(m,h){function b(){r=null;c=a=void 0}function g(){void 0===c&&(c=m.acceptPosition(h)===e);return c}function d(a,c){b();return h.setUnfilteredPosition(a,c)}function n(){r||(r=h.container());return r}function p(){void 0===a&&(a=h.unfilteredDomOffset());return a}function k(){for(b();h.nextPosition();)if(b(),g())return!0;return!1}function q(){for(b();h.previousPosition();)if(b(),g())return!0;return!1}var e=core.PositionFilter.FilterResult.FILTER_ACCEPT,r,a,c;this.isStep=g;this.setPosition=
d;this.container=n;this.offset=p;this.nextStep=k;this.previousStep=q;this.roundToClosestStep=function(){var a=n(),c=p(),b=g();b||(b=q(),b||(d(a,c),b=k()));return b};this.roundToPreviousStep=function(){var a=g();a||(a=q());return a};this.roundToNextStep=function(){var a=g();a||(a=k());return a}};
// Input 18
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var m=runtime.getWindow().document,h=m.getElementById("testarea");runtime.assert(!h,'Unclean test environment, found a div with id "testarea".');h=m.createElement("div");h.setAttribute("id","testarea");m.body.appendChild(h);return h};
core.UnitTest.cleanupTestAreaDiv=function(){var m=runtime.getWindow().document,h=m.getElementById("testarea");runtime.assert(!!h&&h.parentNode===m.body,'Test environment broken, found no div with id "testarea" below body.');m.body.removeChild(h)};core.UnitTest.createOdtDocument=function(m,h){var b="<?xml version='1.0' encoding='UTF-8'?>",b=b+"<office:document";Object.keys(h).forEach(function(g){b+=" xmlns:"+g+'="'+h[g]+'"'});b+=">";b+=m;b+="</office:document>";return runtime.parseXML(b)};
core.UnitTestLogger=function(){var m=[],h=0,b=0,g="",d="";this.startTest=function(n,p){m=[];h=0;g=n;d=p;b=(new Date).getTime()};this.endTest=function(){var n=(new Date).getTime();return{description:d,suite:[g,d],success:0===h,log:m,time:n-b}};this.debug=function(b){m.push({category:"debug",message:b})};this.fail=function(b){h+=1;m.push({category:"fail",message:b})};this.pass=function(b){m.push({category:"pass",message:b})}};
core.UnitTestRunner=function(m,h){function b(c){q+=1;a?h.debug(c):h.fail(c)}function g(a,l){var f;try{if(a.length!==l.length)return b("array of length "+a.length+" should be "+l.length+" long"),!1;for(f=0;f<a.length;f+=1)if(a[f]!==l[f])return b(a[f]+" should be "+l[f]+" at array index "+f),!1}catch(d){return!1}return!0}function d(a,l,f){var e=a.attributes,k=e.length,g,n,h;for(g=0;g<k;g+=1)if(n=e.item(g),"xmlns"!==n.prefix&&"urn:webodf:names:steps"!==n.namespaceURI){h=l.getAttributeNS(n.namespaceURI,
n.localName);if(!l.hasAttributeNS(n.namespaceURI,n.localName))return b("Attribute "+n.localName+" with value "+n.value+" was not present"),!1;if(h!==n.value)return b("Attribute "+n.localName+" was "+h+" should be "+n.value),!1}return f?!0:d(l,a,!0)}function n(a,l){var f,e;f=a.nodeType;e=l.nodeType;if(f!==e)return b("Nodetype '"+f+"' should be '"+e+"'"),!1;if(f===Node.TEXT_NODE){if(a.data===l.data)return!0;b("Textnode data '"+a.data+"' should be '"+l.data+"'");return!1}runtime.assert(f===Node.ELEMENT_NODE,
"Only textnodes and elements supported.");if(a.namespaceURI!==l.namespaceURI)return b("namespace '"+a.namespaceURI+"' should be '"+l.namespaceURI+"'"),!1;if(a.localName!==l.localName)return b("localName '"+a.localName+"' should be '"+l.localName+"'"),!1;if(!d(a,l,!1))return!1;f=a.firstChild;for(e=l.firstChild;f;){if(!e)return b("Nodetype '"+f.nodeType+"' is unexpected here."),!1;if(!n(f,e))return!1;f=f.nextSibling;e=e.nextSibling}return e?(b("Nodetype '"+e.nodeType+"' is missing here."),!1):!0}function p(a,
b){return 0===b?a===b&&1/a===1/b:a===b?!0:null===a||null===b?!1:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?g(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?n(a,b):r(a,b):!1}function k(a,l,f){"string"===typeof l&&"string"===typeof f||h.debug("WARN: shouldBe() expects string arguments");var d,e;try{e=eval(l)}catch(k){d=k}a=eval(f);d?b(l+" should be "+a+". Threw exception "+
d):p(e,a)?h.pass(l+" is "+f):String(typeof e)===String(typeof a)?(f=0===e&&0>1/e?"-0":String(e),b(l+" should be "+a+". Was "+f+".")):b(l+" should be "+a+" (of type "+typeof a+"). Was "+e+" (of type "+typeof e+").")}var q=0,e,r,a=!1;this.resourcePrefix=function(){return m};this.beginExpectFail=function(){e=q;a=!0};this.endExpectFail=function(){var c=e===q;a=!1;q=e;c&&(q+=1,h.fail("Expected at least one failed test, but none registered."))};r=function(a,l){var f=Object.keys(a),d=Object.keys(l);f.sort();
d.sort();return g(f,d)&&Object.keys(a).every(function(f){var d=a[f],e=l[f];return p(d,e)?!0:(b(d+" should be "+e+" for key "+f),!1)})};this.areNodesEqual=n;this.shouldBeNull=function(a,b){k(a,b,"null")};this.shouldBeNonNull=function(a,l){var f,d;try{d=eval(l)}catch(e){f=e}f?b(l+" should be non-null. Threw exception "+f):null!==d?h.pass(l+" is non-null."):b(l+" should be non-null. Was "+d)};this.shouldBe=k;this.testFailed=b;this.countFailedTests=function(){return q};this.name=function(a){var b,f,d=
[],e=a.length;d.length=e;for(b=0;b<e;b+=1){f=Runtime.getFunctionName(a[b])||"";if(""===f)throw"Found a function without a name.";d[b]={f:a[b],name:f}}return d}};
core.UnitTester=function(){function m(b,d){return"<span style='color:blue;cursor:pointer' onclick='"+d+"'>"+b+"</span>"}function h(d){b.reporter&&b.reporter(d)}var b=this,g=0,d=new core.UnitTestLogger,n={},p="BrowserRuntime"===runtime.type();this.resourcePrefix="";this.reporter=function(b){var d,e;p?runtime.log("<span>Running "+m(b.description,'runTest("'+b.suite[0]+'","'+b.description+'")')+"</span>"):runtime.log("Running "+b.description);if(!b.success)for(d=0;d<b.log.length;d+=1)e=b.log[d],runtime.log(e.category,
e.message)};this.runTests=function(k,q,e){function r(b){if(0===b.length)n[a]=f,g+=c.countFailedTests(),q();else{w=b[0].f;var k=b[0].name,p=!0===b[0].expectFail;t=c.countFailedTests();e.length&&-1===e.indexOf(k)?r(b.slice(1)):(l.setUp(),d.startTest(a,k),p&&c.beginExpectFail(),w(function(){p&&c.endExpectFail();h(d.endTest());l.tearDown();f[k]=t===c.countFailedTests();r(b.slice(1))}))}}var a=Runtime.getFunctionName(k)||"",c=new core.UnitTestRunner(b.resourcePrefix,d),l=new k(c),f={},v,w,z,x,t;if(n.hasOwnProperty(a))runtime.log("Test "+
a+" has already run.");else{p?runtime.log("<span>Running "+m(a,'runSuite("'+a+'");')+": "+l.description()+"</span>"):runtime.log("Running "+a+": "+l.description);z=l.tests();for(v=0;v<z.length;v+=1)if(w=z[v].f,k=z[v].name,x=!0===z[v].expectFail,!e.length||-1!==e.indexOf(k)){t=c.countFailedTests();l.setUp();d.startTest(a,k);x&&c.beginExpectFail();try{w()}catch(u){c.testFailed("Unexpected exception encountered: "+u.toString()+"\n"+u.stack)}x&&c.endExpectFail();h(d.endTest());l.tearDown();f[k]=t===c.countFailedTests()}r(l.asyncTests())}};
this.countFailedTests=function(){return g};this.results=function(){return n}};
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
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,f,d=a.length,l=0,l=0;b=-1;for(f=0;f<d;f+=1)l=(b^a[f])&255,l=c[l],b=b>>>8^l;return b^-1}function g(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function d(a){var c=a.getFullYear();return 1980>c?0:c-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function n(a,c){var b,d,l,e,k,n,h,p=this;this.load=function(c){if(null!==p.data)c(null,p.data);else{var b=k+34+d+l+256;b+h>f&&(b=f-h);runtime.read(a,h,b,function(b,f){if(b||null===f)c(b,f);else a:{var d=f,l=new core.ByteArray(d),g=l.readUInt32LE(),h;if(67324752!==g)c("File entry signature is wrong."+g.toString()+" "+d.length.toString(),null);else{l.pos+=22;g=l.readUInt16LE();h=l.readUInt16LE();l.pos+=g+h;if(e){d=
d.subarray(l.pos,l.pos+k);if(k!==d.length){c("The amount of compressed bytes read was "+d.length.toString()+" instead of "+k.toString()+" for "+p.filename+" in "+a+".",null);break a}d=w(d,n)}else d=d.subarray(l.pos,l.pos+n);n!==d.length?c("The amount of bytes read was "+d.length.toString()+" instead of "+n.toString()+" for "+p.filename+" in "+a+".",null):(p.data=d,c(null,d))}}})}};this.set=function(a,c,b,d){p.filename=a;p.data=c;p.compressed=b;p.date=d};this.error=null;c&&(b=c.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+a+'": '+c.data.length.toString():(c.pos+=6,e=c.readUInt16LE(),this.date=g(c.readUInt32LE()),c.readUInt32LE(),k=c.readUInt32LE(),n=c.readUInt32LE(),d=c.readUInt16LE(),l=c.readUInt16LE(),b=c.readUInt16LE(),c.pos+=8,h=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.subarray(c.pos,c.pos+d),"utf8"),this.data=null,c.pos+=d+l+b))}function p(a,c){if(22!==a.length)c("Central directory length should be 22.",
z);else{var b=new core.ByteArray(a),d;d=b.readUInt32LE();101010256!==d?c("Central directory signature is wrong: "+d.toString(),z):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",z):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",z):(d=b.readUInt16LE(),v=b.readUInt16LE(),d!==v?c("Number of entries is inconsistent.",z):(d=b.readUInt32LE(),b=b.readUInt16LE(),b=f-22-d,runtime.read(m,b,f-b,function(a,b){if(a||null===b)c(a,z);else a:{var d=
new core.ByteArray(b),f,e;l=[];for(f=0;f<v;f+=1){e=new n(m,d);if(e.error){c(e.error,z);break a}l[l.length]=e}c(null,z)}})))))}}function k(a,c){var b=null,d,f;for(f=0;f<l.length;f+=1)if(d=l[f],d.filename===a){b=d;break}b?b.data?c(null,b.data):b.load(c):c(a+" not found.",null)}function q(a){var c=new core.ByteArrayWriter("utf8"),f=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(f=a.data.length);c.appendUInt32LE(d(a.date));c.appendUInt32LE(a.data?b(a.data):0);c.appendUInt32LE(f);c.appendUInt32LE(f);
c.appendUInt16LE(a.filename.length);c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function e(a,c){var f=new core.ByteArrayWriter("utf8"),l=0;f.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(l=a.data.length);f.appendUInt32LE(d(a.date));f.appendUInt32LE(a.data?b(a.data):0);f.appendUInt32LE(l);f.appendUInt32LE(l);f.appendUInt16LE(a.filename.length);f.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);f.appendUInt32LE(c);f.appendString(a.filename);return f}function r(a,
c){if(a===l.length)c(null);else{var b=l[a];null!==b.data?r(a+1,c):b.load(function(b){b?c(b):r(a+1,c)})}}function a(a,c){r(0,function(b){if(b)c(b);else{var d,f,g=new core.ByteArrayWriter("utf8"),k=[0];for(d=0;d<l.length;d+=1)g.appendByteArrayWriter(q(l[d])),k.push(g.getLength());b=g.getLength();for(d=0;d<l.length;d+=1)f=l[d],g.appendByteArrayWriter(e(f,k[d]));d=g.getLength()-b;g.appendArray([80,75,5,6,0,0,0,0]);g.appendUInt16LE(l.length);g.appendUInt16LE(l.length);g.appendUInt32LE(d);g.appendUInt32LE(b);
g.appendArray([0,0]);a(g.getByteArray())}})}function c(c,b){a(function(a){runtime.writeFile(c,a,b)},b)}var l,f,v,w=(new core.RawInflate).inflate,z=this,x=new core.Base64;this.load=k;this.save=function(a,c,b,d){var f,e;for(f=0;f<l.length;f+=1)if(e=l[f],e.filename===a){e.set(a,c,b,d);return}e=new n(m);e.set(a,c,b,d);l.push(e)};this.remove=function(a){var c,b;for(c=0;c<l.length;c+=1)if(b=l[c],b.filename===a)return l.splice(c,1),!0;return!1};this.write=function(a){c(m,a)};this.writeAs=c;this.createByteArray=
a;this.loadContentXmlAsFragments=function(a,c){z.loadAsString(a,function(a,b){if(a)return c.rootElementReady(a);c.rootElementReady(null,b,!0)})};this.loadAsString=function(a,c){k(a,function(a,b){if(a||null===b)return c(a,null);var d=runtime.byteArrayToString(b,"utf8");c(null,d)})};this.loadAsDOM=function(a,c){z.loadAsString(a,function(a,b){if(a||null===b)c(a,null);else{var d=(new DOMParser).parseFromString(b,"text/xml");c(null,d)}})};this.loadAsDataURL=function(a,c,b){k(a,function(a,d){if(a||!d)return b(a,
null);var f=0,l;c||(c=80===d[1]&&78===d[2]&&71===d[3]?"image/png":255===d[0]&&216===d[1]&&255===d[2]?"image/jpeg":71===d[0]&&73===d[1]&&70===d[2]?"image/gif":"");for(l="data:"+c+";base64,";f<d.length;)l+=x.convertUTF8ArrayToBase64(d.subarray(f,Math.min(f+45E3,d.length))),f+=45E3;b(null,l)})};this.getEntries=function(){return l.slice()};f=-1;null===h?l=[]:runtime.getFileSize(m,function(a){f=a;0>f?h("File '"+m+"' cannot be read.",z):runtime.read(m,f-22,22,function(a,c){a||null===h||null===c?h(a,z):
p(c,h)})})};
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
function createXPathSingleton(){function m(b,a,c){return-1!==b&&(b<a||-1===a)&&(b<c||-1===c)}function h(b){for(var a=[],c=0,d=b.length,f;c<d;){var g=b,k=d,n=a,h="",p=[],q=g.indexOf("[",c),s=g.indexOf("/",c),y=g.indexOf("=",c);m(s,q,y)?(h=g.substring(c,s),c=s+1):m(q,s,y)?(h=g.substring(c,q),c=e(g,q,p)):m(y,s,q)?(h=g.substring(c,y),c=y):(h=g.substring(c,k),c=k);n.push({location:h,predicates:p});if(c<d&&"="===b[c]){f=b.substring(c+1,d);if(2<f.length&&("'"===f[0]||'"'===f[0]))f=f.slice(1,f.length-1);
else try{f=parseInt(f,10)}catch(F){}c=d}}return{steps:a,value:f}}function b(){var b=null,a=!1;this.setNode=function(a){b=a};this.reset=function(){a=!1};this.next=function(){var c=a?null:b;a=!0;return c}}function g(b,a,c){this.reset=function(){b.reset()};this.next=function(){for(var d=b.next();d;){d.nodeType===Node.ELEMENT_NODE&&(d=d.getAttributeNodeNS(a,c));if(d)break;d=b.next()}return d}}function d(b,a){var c=b.next(),d=null;this.reset=function(){b.reset();c=b.next();d=null};this.next=function(){for(;c;){if(d)if(a&&
d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&d!==c;)d=d.parentNode;d===c?c=b.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=b.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function n(b,a){this.reset=function(){b.reset()};this.next=function(){for(var c=b.next();c&&!a(c);)c=b.next();return c}}function p(b,a,c){a=a.split(":",2);var d=c(a[0]),f=a[1];return new n(b,function(a){return a.localName===f&&a.namespaceURI===d})}function k(d,a,c){var e=new b,f=q(e,
a,c),g=a.value;return void 0===g?new n(d,function(a){e.setNode(a);f.reset();return null!==f.next()}):new n(d,function(a){e.setNode(a);f.reset();return(a=f.next())?a.nodeValue===g:!1})}var q,e;e=function(b,a,c){for(var d=a,f=b.length,e=0;d<f;)"]"===b[d]?(e-=1,0>=e&&c.push(h(b.substring(a,d)))):"["===b[d]&&(0>=e&&(a=d+1),e+=1),d+=1;return d};q=function(b,a,c){var e,f,n,h;for(e=0;e<a.steps.length;e+=1){n=a.steps[e];f=n.location;if(""===f)b=new d(b,!1);else if("@"===f[0]){f=f.substr(1).split(":",2);h=
c(f[0]);if(!h)throw"No namespace associated with the prefix "+f[0];b=new g(b,h,f[1])}else"."!==f&&(b=new d(b,!1),-1!==f.indexOf(":")&&(b=p(b,f,c)));for(f=0;f<n.predicates.length;f+=1)h=n.predicates[f],b=k(b,h,c)}return b};return{getODFElementsWithXPath:function(d,a,c){var e=d.ownerDocument,f=[],g=null;if(e&&"function"===typeof e.evaluate)for(c=e.evaluate(a,d,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),g=c.iterateNext();null!==g;)g.nodeType===Node.ELEMENT_NODE&&f.push(g),g=c.iterateNext();else{f=
new b;f.setNode(d);d=h(a);f=q(f,d,c);d=[];for(c=f.next();c;)d.push(c),c=f.next();f=d}return f}}}xmldom.XPath=createXPathSingleton();
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
odf.StyleInfo=function(){function m(a,c){var b,d,f,e,l,g=0;if(b=L[a.localName])if(f=b[a.namespaceURI])g=f.length;for(b=0;b<g;b+=1)d=f[b],e=d.ns,l=d.localname,(d=a.getAttributeNS(e,l))&&a.setAttributeNS(e,y[e]+l,c+d);for(f=a.firstElementChild;f;)m(f,c),f=f.nextElementSibling}function h(a,c){var b,d,f,e,l,g=0;if(b=L[a.localName])if(f=b[a.namespaceURI])g=f.length;for(b=0;b<g;b+=1)if(d=f[b],e=d.ns,l=d.localname,d=a.getAttributeNS(e,l))d=d.replace(c,""),a.setAttributeNS(e,y[e]+l,d);for(f=a.firstElementChild;f;)h(f,
c),f=f.nextElementSibling}function b(a,c){var b,d,f,e,l,g=0;if(b=L[a.localName])if(f=b[a.namespaceURI])g=f.length;for(b=0;b<g;b+=1)if(e=f[b],d=e.ns,l=e.localname,d=a.getAttributeNS(d,l))c=c||{},e=e.keyname,c.hasOwnProperty(e)?c[e][d]=1:(l={},l[d]=1,c[e]=l);return c}function g(a,c){var d,f;b(a,c);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(f=d,g(f,c)),d=d.nextSibling}function d(a,c,b){this.key=a;this.name=c;this.family=b;this.requires={}}function n(a,c,b){var f=a+'"'+c,e=b[f];e||(e=b[f]=
new d(f,a,c));return e}function p(a,c,b){var d,f,e,l,g,k=0;d=a.getAttributeNS(t,"name");l=a.getAttributeNS(t,"family");d&&l&&(c=n(d,l,b));if(c){if(d=L[a.localName])if(e=d[a.namespaceURI])k=e.length;for(d=0;d<k;d+=1)if(l=e[d],f=l.ns,g=l.localname,f=a.getAttributeNS(f,g))l=l.keyname,l=n(f,l,b),c.requires[l.key]=l}for(a=a.firstElementChild;a;)p(a,c,b),a=a.nextElementSibling;return b}function k(a,c){var b=c[a.family];b||(b=c[a.family]={});b[a.name]=1;Object.keys(a.requires).forEach(function(b){k(a.requires[b],
c)})}function q(a,c){var b=p(a,null,{});Object.keys(b).forEach(function(a){a=b[a];var d=c[a.family];d&&d.hasOwnProperty(a.name)&&k(a,c)})}function e(a,c){function b(c){(c=l.getAttributeNS(t,c))&&(a[c]=!0)}var d=["font-name","font-name-asian","font-name-complex"],f,l;for(f=c&&c.firstElementChild;f;)l=f,d.forEach(b),e(a,l),f=f.nextElementSibling}function r(a,c){function b(a){var d=e.getAttributeNS(t,a);d&&c.hasOwnProperty(d)&&e.setAttributeNS(t,"style:"+a,c[d])}var d=["font-name","font-name-asian",
"font-name-complex"],f,e;for(f=a&&a.firstElementChild;f;)e=f,d.forEach(b),r(e,c),f=f.nextElementSibling}var a=odf.Namespaces.chartns,c=odf.Namespaces.dbns,l=odf.Namespaces.dr3dns,f=odf.Namespaces.drawns,v=odf.Namespaces.formns,w=odf.Namespaces.numberns,z=odf.Namespaces.officens,x=odf.Namespaces.presentationns,t=odf.Namespaces.stylens,u=odf.Namespaces.tablens,s=odf.Namespaces.textns,y={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},F={text:[{ens:t,en:"tab-stop",ans:t,a:"leader-text-style"},{ens:t,en:"drop-cap",ans:t,a:"style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-body-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-style-name"},{ens:s,en:"a",ans:s,a:"style-name"},{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"linenumbering-configuration",
ans:s,a:"style-name"},{ens:s,en:"list-level-style-number",ans:s,a:"style-name"},{ens:s,en:"ruby-text",ans:s,a:"style-name"},{ens:s,en:"span",ans:s,a:"style-name"},{ens:s,en:"a",ans:s,a:"visited-style-name"},{ens:t,en:"text-properties",ans:t,a:"text-line-through-text-style"},{ens:s,en:"alphabetical-index-source",ans:s,a:"main-entry-style-name"},{ens:s,en:"index-entry-bibliography",ans:s,a:"style-name"},{ens:s,en:"index-entry-chapter",ans:s,a:"style-name"},{ens:s,en:"index-entry-link-end",ans:s,a:"style-name"},
{ens:s,en:"index-entry-link-start",ans:s,a:"style-name"},{ens:s,en:"index-entry-page-number",ans:s,a:"style-name"},{ens:s,en:"index-entry-span",ans:s,a:"style-name"},{ens:s,en:"index-entry-tab-stop",ans:s,a:"style-name"},{ens:s,en:"index-entry-text",ans:s,a:"style-name"},{ens:s,en:"index-title-template",ans:s,a:"style-name"},{ens:s,en:"list-level-style-bullet",ans:s,a:"style-name"},{ens:s,en:"outline-level-style",ans:s,a:"style-name"}],paragraph:[{ens:f,en:"caption",ans:f,a:"text-style-name"},{ens:f,
en:"circle",ans:f,a:"text-style-name"},{ens:f,en:"connector",ans:f,a:"text-style-name"},{ens:f,en:"control",ans:f,a:"text-style-name"},{ens:f,en:"custom-shape",ans:f,a:"text-style-name"},{ens:f,en:"ellipse",ans:f,a:"text-style-name"},{ens:f,en:"frame",ans:f,a:"text-style-name"},{ens:f,en:"line",ans:f,a:"text-style-name"},{ens:f,en:"measure",ans:f,a:"text-style-name"},{ens:f,en:"path",ans:f,a:"text-style-name"},{ens:f,en:"polygon",ans:f,a:"text-style-name"},{ens:f,en:"polyline",ans:f,a:"text-style-name"},
{ens:f,en:"rect",ans:f,a:"text-style-name"},{ens:f,en:"regular-polygon",ans:f,a:"text-style-name"},{ens:z,en:"annotation",ans:f,a:"text-style-name"},{ens:v,en:"column",ans:v,a:"text-style-name"},{ens:t,en:"style",ans:t,a:"next-style-name"},{ens:u,en:"body",ans:u,a:"paragraph-style-name"},{ens:u,en:"even-columns",ans:u,a:"paragraph-style-name"},{ens:u,en:"even-rows",ans:u,a:"paragraph-style-name"},{ens:u,en:"first-column",ans:u,a:"paragraph-style-name"},{ens:u,en:"first-row",ans:u,a:"paragraph-style-name"},
{ens:u,en:"last-column",ans:u,a:"paragraph-style-name"},{ens:u,en:"last-row",ans:u,a:"paragraph-style-name"},{ens:u,en:"odd-columns",ans:u,a:"paragraph-style-name"},{ens:u,en:"odd-rows",ans:u,a:"paragraph-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"default-style-name"},{ens:s,en:"alphabetical-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"bibliography-entry-template",ans:s,a:"style-name"},{ens:s,en:"h",ans:s,a:"style-name"},{ens:s,en:"illustration-index-entry-template",ans:s,a:"style-name"},
{ens:s,en:"index-source-style",ans:s,a:"style-name"},{ens:s,en:"object-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"p",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-of-content-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"user-index-entry-template",ans:s,a:"style-name"},{ens:t,en:"page-layout-properties",ans:t,a:"register-truth-ref-style-name"}],chart:[{ens:a,en:"axis",ans:a,
a:"style-name"},{ens:a,en:"chart",ans:a,a:"style-name"},{ens:a,en:"data-label",ans:a,a:"style-name"},{ens:a,en:"data-point",ans:a,a:"style-name"},{ens:a,en:"equation",ans:a,a:"style-name"},{ens:a,en:"error-indicator",ans:a,a:"style-name"},{ens:a,en:"floor",ans:a,a:"style-name"},{ens:a,en:"footer",ans:a,a:"style-name"},{ens:a,en:"grid",ans:a,a:"style-name"},{ens:a,en:"legend",ans:a,a:"style-name"},{ens:a,en:"mean-value",ans:a,a:"style-name"},{ens:a,en:"plot-area",ans:a,a:"style-name"},{ens:a,en:"regression-curve",
ans:a,a:"style-name"},{ens:a,en:"series",ans:a,a:"style-name"},{ens:a,en:"stock-gain-marker",ans:a,a:"style-name"},{ens:a,en:"stock-loss-marker",ans:a,a:"style-name"},{ens:a,en:"stock-range-line",ans:a,a:"style-name"},{ens:a,en:"subtitle",ans:a,a:"style-name"},{ens:a,en:"title",ans:a,a:"style-name"},{ens:a,en:"wall",ans:a,a:"style-name"}],section:[{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"bibliography",ans:s,a:"style-name"},{ens:s,en:"illustration-index",ans:s,a:"style-name"},
{ens:s,en:"index-title",ans:s,a:"style-name"},{ens:s,en:"object-index",ans:s,a:"style-name"},{ens:s,en:"section",ans:s,a:"style-name"},{ens:s,en:"table-of-content",ans:s,a:"style-name"},{ens:s,en:"table-index",ans:s,a:"style-name"},{ens:s,en:"user-index",ans:s,a:"style-name"}],ruby:[{ens:s,en:"ruby",ans:s,a:"style-name"}],table:[{ens:c,en:"query",ans:c,a:"style-name"},{ens:c,en:"table-representation",ans:c,a:"style-name"},{ens:u,en:"background",ans:u,a:"style-name"},{ens:u,en:"table",ans:u,a:"style-name"}],
"table-column":[{ens:c,en:"column",ans:c,a:"style-name"},{ens:u,en:"table-column",ans:u,a:"style-name"}],"table-row":[{ens:c,en:"query",ans:c,a:"default-row-style-name"},{ens:c,en:"table-representation",ans:c,a:"default-row-style-name"},{ens:u,en:"table-row",ans:u,a:"style-name"}],"table-cell":[{ens:c,en:"column",ans:c,a:"default-cell-style-name"},{ens:u,en:"table-column",ans:u,a:"default-cell-style-name"},{ens:u,en:"table-row",ans:u,a:"default-cell-style-name"},{ens:u,en:"body",ans:u,a:"style-name"},
{ens:u,en:"covered-table-cell",ans:u,a:"style-name"},{ens:u,en:"even-columns",ans:u,a:"style-name"},{ens:u,en:"covered-table-cell",ans:u,a:"style-name"},{ens:u,en:"even-columns",ans:u,a:"style-name"},{ens:u,en:"even-rows",ans:u,a:"style-name"},{ens:u,en:"first-column",ans:u,a:"style-name"},{ens:u,en:"first-row",ans:u,a:"style-name"},{ens:u,en:"last-column",ans:u,a:"style-name"},{ens:u,en:"last-row",ans:u,a:"style-name"},{ens:u,en:"odd-columns",ans:u,a:"style-name"},{ens:u,en:"odd-rows",ans:u,a:"style-name"},
{ens:u,en:"table-cell",ans:u,a:"style-name"}],graphic:[{ens:l,en:"cube",ans:f,a:"style-name"},{ens:l,en:"extrude",ans:f,a:"style-name"},{ens:l,en:"rotate",ans:f,a:"style-name"},{ens:l,en:"scene",ans:f,a:"style-name"},{ens:l,en:"sphere",ans:f,a:"style-name"},{ens:f,en:"caption",ans:f,a:"style-name"},{ens:f,en:"circle",ans:f,a:"style-name"},{ens:f,en:"connector",ans:f,a:"style-name"},{ens:f,en:"control",ans:f,a:"style-name"},{ens:f,en:"custom-shape",ans:f,a:"style-name"},{ens:f,en:"ellipse",ans:f,a:"style-name"},
{ens:f,en:"frame",ans:f,a:"style-name"},{ens:f,en:"g",ans:f,a:"style-name"},{ens:f,en:"line",ans:f,a:"style-name"},{ens:f,en:"measure",ans:f,a:"style-name"},{ens:f,en:"page-thumbnail",ans:f,a:"style-name"},{ens:f,en:"path",ans:f,a:"style-name"},{ens:f,en:"polygon",ans:f,a:"style-name"},{ens:f,en:"polyline",ans:f,a:"style-name"},{ens:f,en:"rect",ans:f,a:"style-name"},{ens:f,en:"regular-polygon",ans:f,a:"style-name"},{ens:z,en:"annotation",ans:f,a:"style-name"}],presentation:[{ens:l,en:"cube",ans:x,
a:"style-name"},{ens:l,en:"extrude",ans:x,a:"style-name"},{ens:l,en:"rotate",ans:x,a:"style-name"},{ens:l,en:"scene",ans:x,a:"style-name"},{ens:l,en:"sphere",ans:x,a:"style-name"},{ens:f,en:"caption",ans:x,a:"style-name"},{ens:f,en:"circle",ans:x,a:"style-name"},{ens:f,en:"connector",ans:x,a:"style-name"},{ens:f,en:"control",ans:x,a:"style-name"},{ens:f,en:"custom-shape",ans:x,a:"style-name"},{ens:f,en:"ellipse",ans:x,a:"style-name"},{ens:f,en:"frame",ans:x,a:"style-name"},{ens:f,en:"g",ans:x,a:"style-name"},
{ens:f,en:"line",ans:x,a:"style-name"},{ens:f,en:"measure",ans:x,a:"style-name"},{ens:f,en:"page-thumbnail",ans:x,a:"style-name"},{ens:f,en:"path",ans:x,a:"style-name"},{ens:f,en:"polygon",ans:x,a:"style-name"},{ens:f,en:"polyline",ans:x,a:"style-name"},{ens:f,en:"rect",ans:x,a:"style-name"},{ens:f,en:"regular-polygon",ans:x,a:"style-name"},{ens:z,en:"annotation",ans:x,a:"style-name"}],"drawing-page":[{ens:f,en:"page",ans:f,a:"style-name"},{ens:x,en:"notes",ans:f,a:"style-name"},{ens:t,en:"handout-master",
ans:f,a:"style-name"},{ens:t,en:"master-page",ans:f,a:"style-name"}],"list-style":[{ens:s,en:"list",ans:s,a:"style-name"},{ens:s,en:"numbered-paragraph",ans:s,a:"style-name"},{ens:s,en:"list-item",ans:s,a:"style-override"},{ens:t,en:"style",ans:t,a:"list-style-name"}],data:[{ens:t,en:"style",ans:t,a:"data-style-name"},{ens:t,en:"style",ans:t,a:"percentage-data-style-name"},{ens:x,en:"date-time-decl",ans:t,a:"data-style-name"},{ens:s,en:"creation-date",ans:t,a:"data-style-name"},{ens:s,en:"creation-time",
ans:t,a:"data-style-name"},{ens:s,en:"database-display",ans:t,a:"data-style-name"},{ens:s,en:"date",ans:t,a:"data-style-name"},{ens:s,en:"editing-duration",ans:t,a:"data-style-name"},{ens:s,en:"expression",ans:t,a:"data-style-name"},{ens:s,en:"meta-field",ans:t,a:"data-style-name"},{ens:s,en:"modification-date",ans:t,a:"data-style-name"},{ens:s,en:"modification-time",ans:t,a:"data-style-name"},{ens:s,en:"print-date",ans:t,a:"data-style-name"},{ens:s,en:"print-time",ans:t,a:"data-style-name"},{ens:s,
en:"table-formula",ans:t,a:"data-style-name"},{ens:s,en:"time",ans:t,a:"data-style-name"},{ens:s,en:"user-defined",ans:t,a:"data-style-name"},{ens:s,en:"user-field-get",ans:t,a:"data-style-name"},{ens:s,en:"user-field-input",ans:t,a:"data-style-name"},{ens:s,en:"variable-get",ans:t,a:"data-style-name"},{ens:s,en:"variable-input",ans:t,a:"data-style-name"},{ens:s,en:"variable-set",ans:t,a:"data-style-name"}],"page-layout":[{ens:x,en:"notes",ans:t,a:"page-layout-name"},{ens:t,en:"handout-master",ans:t,
a:"page-layout-name"},{ens:t,en:"master-page",ans:t,a:"page-layout-name"}]},L,O=xmldom.XPath;this.collectUsedFontFaces=e;this.changeFontFaceNames=r;this.UsedStyleList=function(a,c){var b={};this.uses=function(a){var c=a.localName,d=a.getAttributeNS(f,"name")||a.getAttributeNS(t,"name");a="style"===c?a.getAttributeNS(t,"family"):a.namespaceURI===w?"data":c;return(a=b[a])?0<a[d]:!1};g(a,b);c&&q(c,b)};this.hasDerivedStyles=function(a,c,b){var d=b.getAttributeNS(t,"name");b=b.getAttributeNS(t,"family");
return O.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+d+"'][@style:family='"+b+"']",c).length?!0:!1};this.prefixStyleNames=function(a,c,b){var d;if(a){for(d=a.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d,l=c,g=e.getAttributeNS(f,"name"),k=void 0;g?k=f:(g=e.getAttributeNS(t,"name"))&&(k=t);k&&e.setAttributeNS(k,y[k]+"name",l+g)}d=d.nextSibling}m(a,c);b&&m(b,c)}};this.removePrefixFromStyleNames=function(a,c,b){var d=RegExp("^"+c);if(a){for(c=a.firstChild;c;){if(c.nodeType===
Node.ELEMENT_NODE){var e=c,l=d,g=e.getAttributeNS(f,"name"),k=void 0;g?k=f:(g=e.getAttributeNS(t,"name"))&&(k=t);k&&(g=g.replace(l,""),e.setAttributeNS(k,y[k]+"name",g))}c=c.nextSibling}h(a,d);b&&h(b,d)}};this.determineStylesForNode=b;L=function(){var a,c,b,d,f,e={},l,g,k,n;for(b in F)if(F.hasOwnProperty(b))for(d=F[b],c=d.length,a=0;a<c;a+=1)f=d[a],k=f.en,n=f.ens,e.hasOwnProperty(k)?l=e[k]:e[k]=l={},l.hasOwnProperty(n)?g=l[n]:l[n]=g=[],g.push({ns:f.ans,localname:f.a,keyname:b});return e}()};
// Input 26
"function"!==typeof Object.create&&(Object.create=function(m){var h=function(){};h.prototype=m;return new h});
xmldom.LSSerializer=function(){function m(b){var g=b||{},h=function(b){var a={},c;for(c in b)b.hasOwnProperty(c)&&(a[b[c]]=c);return a}(b),k=[g],m=[h],e=0;this.push=function(){e+=1;g=k[e]=Object.create(g);h=m[e]=Object.create(h)};this.pop=function(){k.pop();m.pop();e-=1;g=k[e];h=m[e]};this.getLocalNamespaceDefinitions=function(){return h};this.getQName=function(b){var a=b.namespaceURI,c=0,d;if(!a)return b.localName;if(d=h[a])return d+":"+b.localName;do{d||!b.prefix?(d="ns"+c,c+=1):d=b.prefix;if(g[d]===
a)break;if(!g[d]){g[d]=a;h[a]=d;break}d=null}while(null===d);return d+":"+b.localName}}function h(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function b(d,n){var p="",k=g.filter?g.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,m;if(k===NodeFilter.FILTER_ACCEPT&&n.nodeType===Node.ELEMENT_NODE){d.push();m=d.getQName(n);var e,r=n.attributes,a,c,l,f="",v;e="<"+m;a=r.length;for(c=0;c<a;c+=1)l=r.item(c),"http://www.w3.org/2000/xmlns/"!==
l.namespaceURI&&(v=g.filter?g.filter.acceptNode(l):NodeFilter.FILTER_ACCEPT,v===NodeFilter.FILTER_ACCEPT&&(v=d.getQName(l),l="string"===typeof l.value?h(l.value):l.value,f+=" "+(v+'="'+l+'"')));a=d.getLocalNamespaceDefinitions();for(c in a)a.hasOwnProperty(c)&&((r=a[c])?"xmlns"!==r&&(e+=" xmlns:"+a[c]+'="'+c+'"'):e+=' xmlns="'+c+'"');p+=e+(f+">")}if(k===NodeFilter.FILTER_ACCEPT||k===NodeFilter.FILTER_SKIP){for(k=n.firstChild;k;)p+=b(d,k),k=k.nextSibling;n.nodeValue&&(p+=h(n.nodeValue))}m&&(p+="</"+
m+">",d.pop());return p}var g=this;this.filter=null;this.writeToString=function(d,g){if(!d)return"";var h=new m(g);return b(h,d)}};
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
(function(){function m(b){var a,c=k.length;for(a=0;a<c;a+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI&&b.localName===k[a])return a;return-1}function h(b,a){var c=new d.UsedStyleList(b,a),e=new odf.OdfNodeFilter;this.acceptNode=function(b){var d=e.acceptNode(b);d===NodeFilter.FILTER_ACCEPT&&b.parentNode===a&&b.nodeType===Node.ELEMENT_NODE&&(d=c.uses(b)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return d}}function b(b,a){var c=new h(b,a);this.acceptNode=function(a){var b=
c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName||(b=NodeFilter.FILTER_REJECT);return b}}function g(b,a){if(a){var c=m(a),d,f=b.firstChild;if(-1!==c){for(;f;){d=m(f);if(-1!==d&&d>c)break;f=f.nextSibling}b.insertBefore(a,f)}}}var d=new odf.StyleInfo,n=new core.DomUtils,p=odf.Namespaces.stylens,k="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),
q=(new Date).getTime()+"_webodf_",e=new core.Base64;odf.ODFElement=function(){};odf.ODFDocumentElement=function(){};odf.ODFDocumentElement.prototype=new odf.ODFElement;odf.ODFDocumentElement.prototype.constructor=odf.ODFDocumentElement;odf.ODFDocumentElement.prototype.fontFaceDecls=null;odf.ODFDocumentElement.prototype.manifest=null;odf.ODFDocumentElement.prototype.settings=null;odf.ODFDocumentElement.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";odf.ODFDocumentElement.localName=
"document";odf.AnnotationElement=function(){};odf.OdfPart=function(b,a,c,d){var f=this;this.size=0;this.type=null;this.name=b;this.container=c;this.url=null;this.mimetype=a;this.onstatereadychange=this.document=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.data="";this.load=function(){null!==d&&(this.mimetype=a,d.loadAsDataURL(b,a,function(a,b){a&&runtime.log(a);f.url=b;if(f.onchange)f.onchange(f);if(f.onstatereadychange)f.onstatereadychange(f)}))}};odf.OdfPart.prototype.load=
function(){};odf.OdfPart.prototype.getUrl=function(){return this.data?"data:;base64,"+e.toBase64(this.data):null};odf.OdfContainer=function a(c,l){function f(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?f(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function k(a){var b={},c,d,f=a.ownerDocument.createNodeIterator(a,NodeFilter.SHOW_ELEMENT,null,!1);for(a=f.nextNode();a;)"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&("annotation"===
a.localName?(c=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","name"))&&(b.hasOwnProperty(c)?runtime.log("Warning: annotation name used more than once with <office:annotation/>: '"+c+"'"):b[c]=a):"annotation-end"===a.localName&&((c=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","name"))?b.hasOwnProperty(c)?(d=b[c],d.annotationEndElement?runtime.log("Warning: annotation name used more than once with <office:annotation-end/>: '"+c+"'"):d.annotationEndElement=
a):runtime.log("Warning: annotation end without an annotation start, name: '"+c+"'"):runtime.log("Warning: annotation end without a name found"))),a=f.nextNode()}function m(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS("urn:webodf:names:scope","scope",b),c=c.nextSibling}function z(a){var b={},c;for(a=a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&a.namespaceURI===p&&"font-face"===a.localName&&(c=a.getAttributeNS(p,"name"),b[c]=a),a=a.nextSibling;return b}function x(a,
b){var c=null,d,f,e;if(a)for(c=a.cloneNode(!0),d=c.firstElementChild;d;)f=d.nextElementSibling,(e=d.getAttributeNS("urn:webodf:names:scope","scope"))&&e!==b&&c.removeChild(d),d=f;return c}function t(a,b){var c,f,e,l=null,g={};if(a)for(b.forEach(function(a){d.collectUsedFontFaces(g,a)}),l=a.cloneNode(!0),c=l.firstElementChild;c;)f=c.nextElementSibling,e=c.getAttributeNS(p,"name"),g[e]||l.removeChild(c),c=f;return l}function u(a){var b=M.rootElement.ownerDocument,c;if(a){f(a.documentElement);try{c=
b.importNode(a.documentElement,!0)}catch(d){}}return c}function s(a){M.state=a;if(M.onchange)M.onchange(M);if(M.onstatereadychange)M.onstatereadychange(M)}function y(a){S=null;M.rootElement=a;a.fontFaceDecls=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");a.styles=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");a.automaticStyles=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");a.masterStyles=
n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");a.body=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");a.meta=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta");k(a)}function F(b){var c=u(b),f=M.rootElement,e;c&&"document-styles"===c.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===c.namespaceURI?(f.fontFaceDecls=n.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),
g(f,f.fontFaceDecls),e=n.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),f.styles=e||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),g(f,f.styles),e=n.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),f.automaticStyles=e||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),m(f.automaticStyles,"document-styles"),g(f,f.automaticStyles),c=n.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"master-styles"),f.masterStyles=c||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),g(f,f.masterStyles),d.prefixStyleNames(f.automaticStyles,q,f.masterStyles)):s(a.INVALID)}function L(b){b=u(b);var c,f,e,l;if(b&&"document-content"===b.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI){c=M.rootElement;e=n.getDirectChild(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");if(c.fontFaceDecls&&e){l=c.fontFaceDecls;var k,
h,y,L,q={};f=z(l);L=z(e);for(e=e.firstElementChild;e;){k=e.nextElementSibling;if(e.namespaceURI===p&&"font-face"===e.localName)if(h=e.getAttributeNS(p,"name"),f.hasOwnProperty(h)){if(!e.isEqualNode(f[h])){y=h;for(var H=f,G=L,F=0,v=void 0,v=y=y.replace(/\d+$/,"");H.hasOwnProperty(v)||G.hasOwnProperty(v);)F+=1,v=y+F;y=v;e.setAttributeNS(p,"style:name",y);l.appendChild(e);f[y]=e;delete L[h];q[h]=y}}else l.appendChild(e),f[h]=e,delete L[h];e=k}l=q}else e&&(c.fontFaceDecls=e,g(c,e));f=n.getDirectChild(b,
"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");m(f,"document-content");l&&d.changeFontFaceNames(f,l);if(c.automaticStyles&&f)for(l=f.firstChild;l;)c.automaticStyles.appendChild(l),l=f.firstChild;else f&&(c.automaticStyles=f,g(c,f));b=n.getDirectChild(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");if(null===b)throw"<office:body/> tag is mising.";c.body=b;g(c,c.body)}else s(a.INVALID)}function O(a){a=u(a);var b;a&&"document-meta"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===
a.namespaceURI&&(b=M.rootElement,b.meta=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),g(b,b.meta))}function H(a){a=u(a);var b;a&&"document-settings"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(b=M.rootElement,b.settings=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),g(b,b.settings))}function U(a){a=u(a);var b;if(a&&"manifest"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===
a.namespaceURI)for(b=M.rootElement,b.manifest=a,a=b.manifest.firstElementChild;a;)"file-entry"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI&&(W[a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),a=a.nextElementSibling}function T(b){var c=b.shift();c?$.loadAsDOM(c.path,function(d,f){c.handler(f);d||M.state===a.INVALID||T(b)}):(k(M.rootElement),
s(a.DONE))}function X(a){var b="";odf.Namespaces.forEachPrefix(function(a,c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function D(){var a=new xmldom.LSSerializer,b=X("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(M.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function ba(a,b){var c=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");
c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:full-path",a);c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:media-type",b);return c}function G(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'),b=a.documentElement,c=new xmldom.LSSerializer,d;for(d in W)W.hasOwnProperty(d)&&b.appendChild(ba(d,W[d]));c.filter=new odf.OdfNodeFilter;
return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+c.writeToString(a,odf.Namespaces.namespaceMap)}function J(){var a=new xmldom.LSSerializer,b=X("document-settings");a.filter=new odf.OdfNodeFilter;M.rootElement.settings.firstElementChild&&(b+=a.writeToString(M.rootElement.settings,odf.Namespaces.namespaceMap));return b+"</office:document-settings>"}function Q(){var a,b,c,f=odf.Namespaces.namespaceMap,e=new xmldom.LSSerializer,l=X("document-styles");b=x(M.rootElement.automaticStyles,
"document-styles");c=M.rootElement.masterStyles.cloneNode(!0);a=t(M.rootElement.fontFaceDecls,[c,M.rootElement.styles,b]);d.removePrefixFromStyleNames(b,q,c);e.filter=new h(c,b);l+=e.writeToString(a,f);l+=e.writeToString(M.rootElement.styles,f);l+=e.writeToString(b,f);l+=e.writeToString(c,f);return l+"</office:document-styles>"}function ea(){var a,c,d=odf.Namespaces.namespaceMap,f=new xmldom.LSSerializer,e=X("document-content");c=x(M.rootElement.automaticStyles,"document-content");a=t(M.rootElement.fontFaceDecls,
[c]);f.filter=new b(M.rootElement.body,c);e+=f.writeToString(a,d);e+=f.writeToString(c,d);e+=f.writeToString(M.rootElement.body,d);return e+"</office:document-content>"}function P(b,c){runtime.loadXML(b,function(b,d){if(b)c(b);else{var f=u(d);f&&"document"===f.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===f.namespaceURI?(y(f),s(a.DONE)):s(a.INVALID)}})}function N(a,b){var c;c=M.rootElement;var d=c.meta;d||(c.meta=d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta"),g(c,d));c=d;a&&n.mapKeyValObjOntoNode(c,a,odf.Namespaces.lookupNamespaceURI);b&&n.removeKeyElementsFromNode(c,b,odf.Namespaces.lookupNamespaceURI)}function I(){function b(a,c){var d;c||(c=a);d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",c);f[a]=d;f.appendChild(d)}var c=new core.Zip("",null),d=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),f=M.rootElement,e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"text");c.save("mimetype",d,!1,new Date);b("meta");b("settings");b("scripts");b("fontFaceDecls","font-face-decls");b("styles");b("automaticStyles","automatic-styles");b("masterStyles","master-styles");b("body");f.body.appendChild(e);W["/"]="application/vnd.oasis.opendocument.text";W["settings.xml"]="text/xml";W["meta.xml"]="text/xml";W["styles.xml"]="text/xml";W["content.xml"]="text/xml";s(a.DONE);return c}function B(){var a,b=new Date,c=runtime.getWindow();a="WebODF/"+("undefined"!==String(typeof webodf_version)?
webodf_version:"FromSource");c&&(a=a+" "+c.navigator.userAgent);N({"meta:generator":a},null);a=runtime.byteArrayFromString(J(),"utf8");$.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(D(),"utf8");$.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(Q(),"utf8");$.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(ea(),"utf8");$.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(G(),"utf8");$.save("META-INF/manifest.xml",a,!0,b)}function V(a,b){B();$.writeAs(a,function(a){b(a)})}
var M=this,$,W={},S;this.onstatereadychange=l;this.state=this.onchange=null;this.setRootElement=y;this.getContentElement=function(){var a;S||(a=M.rootElement.body,S=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","text")||n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","presentation")||n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet"));if(!S)throw"Could not find content element in <office:body/>.";return S};this.getDocumentType=
function(){var a=M.getContentElement();return a&&a.localName};this.getPart=function(a){return new odf.OdfPart(a,W[a],M,$)};this.getPartData=function(a,b){$.load(a,b)};this.setMetadata=N;this.incrementEditingCycles=function(){var a;for(a=(a=M.rootElement.meta)&&a.firstChild;a&&(a.namespaceURI!==odf.Namespaces.metans||"editing-cycles"!==a.localName);)a=a.nextSibling;for(a=a&&a.firstChild;a&&a.nodeType!==Node.TEXT_NODE;)a=a.nextSibling;a=a?a.data:null;a=a?parseInt(a,10):0;isNaN(a)&&(a=0);N({"meta:editing-cycles":a+
1},null)};this.createByteArray=function(a,b){B();$.createByteArray(a,b)};this.saveAs=V;this.save=function(a){V(c,a)};this.getUrl=function(){return c};this.setBlob=function(a,b,c){c=e.convertBase64ToByteArray(c);$.save(a,c,!1,new Date);W.hasOwnProperty(a)&&runtime.log(a+" has been overwritten.");W[a]=b};this.removeBlob=function(a){var b=$.remove(a);runtime.assert(b,"file is not found: "+a);delete W[a]};this.state=a.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,
a.localName),c;a=new a.Type;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}({Type:odf.ODFDocumentElement,namespaceURI:odf.ODFDocumentElement.namespaceURI,localName:odf.ODFDocumentElement.localName});$=c?new core.Zip(c,function(b,d){$=d;b?P(c,function(c){b&&($.error=b+"\n"+c,s(a.INVALID))}):T([{path:"styles.xml",handler:F},{path:"content.xml",handler:L},{path:"meta.xml",handler:O},{path:"settings.xml",handler:H},{path:"META-INF/manifest.xml",handler:U}])}):I()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=
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
odf.OdfUtils=function(){function m(a){return"image"===(a&&a.localName)&&a.namespaceURI===T}function h(a){return null!==a&&a.nodeType===Node.ELEMENT_NODE&&"frame"===a.localName&&a.namespaceURI===T&&"as-char"===a.getAttributeNS(U,"anchor-type")}function b(a){var b;(b="annotation"===(a&&a.localName)&&a.namespaceURI===odf.Namespaces.officens)||(b="div"===(a&&a.localName)&&"annotationWrapper"===a.className);return b}function g(a){return"a"===(a&&a.localName)&&a.namespaceURI===U}function d(a){var b=a&&
a.localName;return("p"===b||"h"===b)&&a.namespaceURI===U}function n(a){for(;a&&!d(a);)a=a.parentNode;return a}function p(a){return/^[ \t\r\n]+$/.test(a)}function k(a){if(null===a||a.nodeType!==Node.ELEMENT_NODE)return!1;var b=a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===U||"span"===b&&"annotationHighlight"===a.className}function q(a){var b=a&&a.localName,c=!1;b&&(a=a.namespaceURI,a===U&&(c="s"===b||"tab"===b||"line-break"===b));return c}function e(a){return q(a)||h(a)||b(a)}function r(a){var b=
a&&a.localName,c=!1;b&&(a=a.namespaceURI,a===U&&(c="s"===b));return c}function a(a){for(;null!==a.firstChild&&k(a);)a=a.firstChild;return a}function c(a){for(;null!==a.lastChild&&k(a);)a=a.lastChild;return a}function l(a){for(;!d(a)&&null===a.previousSibling;)a=a.parentNode;return d(a)?null:c(a.previousSibling)}function f(b){for(;!d(b)&&null===b.nextSibling;)b=b.parentNode;return d(b)?null:a(b.nextSibling)}function v(a){for(var b=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=l(a);else return!p(a.data.substr(a.length-
1,1));else e(a)?(b=!1===r(a),a=null):a=l(a);return b}function w(b){var c=!1,d;for(b=b&&a(b);b;){d=b.nodeType===Node.TEXT_NODE?b.length:0;if(0<d&&!p(b.data)){c=!0;break}if(e(b)){c=!0;break}b=f(b)}return c}function z(a,b){return p(a.data.substr(b))?!w(f(a)):!1}function x(a,b){var c=a.data,d;if(!p(c[b])||e(a.parentNode))return!1;0<b?p(c[b-1])||(d=!0):v(l(a))&&(d=!0);return!0===d?z(a,b)?!1:!0:!1}function t(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function u(a){return(a=t(a))&&(0>a.value||"%"===a.unit)?null:a}function s(a){return(a=t(a))&&"%"!==a.unit?null:a}function y(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "cursor":case "editinfo":return!1}}return!0}
function F(a,b){for(;0<b.length&&!ba.rangeContainsNode(a,b[0]);)b.shift();for(;0<b.length&&!ba.rangeContainsNode(a,b[b.length-1]);)b.pop()}function L(a,c,d){var f;f=ba.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_REJECT;if(q(a.parentNode)||b(a))c=NodeFilter.FILTER_REJECT;else if(a.nodeType===Node.TEXT_NODE){if(d||Boolean(n(a)&&(!p(a.textContent)||x(a,0))))c=NodeFilter.FILTER_ACCEPT}else if(e(a))c=NodeFilter.FILTER_ACCEPT;else if(y(a)||k(a))c=NodeFilter.FILTER_SKIP;return c},NodeFilter.SHOW_ELEMENT|
NodeFilter.SHOW_TEXT);c||F(a,f);return f}function O(a,c,d){for(;a;){if(d(a)){c[0]!==a&&c.unshift(a);break}if(b(a))break;a=a.parentNode}}function H(a,b){var c=a;if(b<c.childNodes.length-1)c=c.childNodes[b+1];else{for(;!c.nextSibling;)c=c.parentNode;c=c.nextSibling}for(;c.firstChild;)c=c.firstChild;return c}var U=odf.Namespaces.textns,T=odf.Namespaces.drawns,X=odf.Namespaces.xlinkns,D=/^\s*$/,ba=new core.DomUtils;this.isImage=m;this.isCharacterFrame=h;this.isInlineRoot=b;this.isTextSpan=function(a){return"span"===
(a&&a.localName)&&a.namespaceURI===U};this.isHyperlink=g;this.getHyperlinkTarget=function(a){return a.getAttributeNS(X,"href")};this.isParagraph=d;this.getParagraphElement=n;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===U&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===U};this.isLineBreak=function(a){return"line-break"===(a&&a.localName)&&a.namespaceURI===U};this.isODFWhitespace=
p;this.isGroupingElement=k;this.isCharacterElement=q;this.isAnchoredAsCharacterElement=e;this.isSpaceElement=r;this.firstChild=a;this.lastChild=c;this.previousNode=l;this.nextNode=f;this.scanLeftForNonSpace=v;this.lookLeftForCharacter=function(a){var b,c=b=0;a.nodeType===Node.TEXT_NODE&&(c=a.length);0<c?(b=a.data,b=p(b.substr(c-1,1))?1===c?v(l(a))?2:0:p(b.substr(c-2,1))?0:2:1):e(a)&&(b=1);return b};this.lookRightForCharacter=function(a){var b=!1,c=0;a&&a.nodeType===Node.TEXT_NODE&&(c=a.length);0<
c?b=!p(a.data.substr(0,1)):e(a)&&(b=!0);return b};this.scanLeftForAnyCharacter=function(a){var b=!1,d;for(a=a&&c(a);a;){d=a.nodeType===Node.TEXT_NODE?a.length:0;if(0<d&&!p(a.data)){b=!0;break}if(e(a)){b=!0;break}a=l(a)}return b};this.scanRightForAnyCharacter=w;this.isTrailingWhitespace=z;this.isSignificantWhitespace=x;this.isDowngradableSpaceElement=function(a){return a.namespaceURI===U&&"s"===a.localName?v(l(a))&&w(f(a)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===
Node.TEXT_NODE&&D.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=t;this.parseNonNegativeLength=u;this.parseFoFontSize=function(a){var b;b=(b=t(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||s(a)};this.parseFoLineHeight=function(a){return u(a)||s(a)};this.isTextContentContainingNode=y;this.getTextNodes=function(a,b){var c;c=ba.getNodesInRange(a,function(a){var b=NodeFilter.FILTER_REJECT;a.nodeType===Node.TEXT_NODE?Boolean(n(a)&&(!p(a.textContent)||x(a,0)))&&(b=NodeFilter.FILTER_ACCEPT):
y(a)&&(b=NodeFilter.FILTER_SKIP);return b},NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);b||F(a,c);return c};this.getTextElements=L;this.getParagraphElements=function(a){var b;b=ba.getNodesInRange(a,function(a){var b=NodeFilter.FILTER_REJECT;if(d(a))b=NodeFilter.FILTER_ACCEPT;else if(y(a)||k(a))b=NodeFilter.FILTER_SKIP;return b},NodeFilter.SHOW_ELEMENT);O(a.startContainer,b,d);return b};this.getImageElements=function(a){var b;b=ba.getNodesInRange(a,function(a){var b=NodeFilter.FILTER_SKIP;m(a)&&(b=
NodeFilter.FILTER_ACCEPT);return b},NodeFilter.SHOW_ELEMENT);O(a.startContainer,b,m);return b};this.getHyperlinkElements=function(a){var b=[],c=a.cloneRange();a.collapsed&&a.endContainer.nodeType===Node.ELEMENT_NODE&&(a=H(a.endContainer,a.endOffset),a.nodeType===Node.TEXT_NODE&&c.setEnd(a,1));L(c,!0,!1).forEach(function(a){for(a=a.parentNode;!d(a);){if(g(a)&&-1===b.indexOf(a)){b.push(a);break}a=a.parentNode}});c.detach();return b}};
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
gui.AnnotationViewManager=function(m,h,b,g){function d(a){var b=a.annotationEndElement,d=e.createRange(),g=a.getAttributeNS(odf.Namespaces.officens,"name");b&&(d.setStart(a,a.childNodes.length),d.setEnd(b,0),a=r.getTextNodes(d,!1),a.forEach(function(a){var b=e.createElement("span");b.className="annotationHighlight";b.setAttribute("annotation",g);a.parentNode.insertBefore(b,a);b.appendChild(a)}));d.detach()}function n(c){var d=m.getSizer();c?(b.style.display="inline-block",d.style.paddingRight=a.getComputedStyle(b).width):
(b.style.display="none",d.style.paddingRight=0);m.refreshSize()}function p(){q.sort(function(a,b){return 0!==(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1})}function k(){var a;for(a=0;a<q.length;a+=1){var d=q[a],f=d.parentNode,e=f.nextElementSibling,g=e.nextElementSibling,k=f.parentNode,h=0,h=q[q.indexOf(d)-1],n=void 0,d=m.getZoomLevel();f.style.left=(b.getBoundingClientRect().left-k.getBoundingClientRect().left)/d+"px";f.style.width=b.getBoundingClientRect().width/d+"px";e.style.width=
parseFloat(f.style.left)-30+"px";h&&(n=h.parentNode.getBoundingClientRect(),20>=(k.getBoundingClientRect().top-n.bottom)/d?f.style.top=Math.abs(k.getBoundingClientRect().top-n.bottom)/d+20+"px":f.style.top="0px");g.style.left=e.getBoundingClientRect().width/d+"px";var e=g.style,k=g.getBoundingClientRect().left/d,h=g.getBoundingClientRect().top/d,n=f.getBoundingClientRect().left/d,p=f.getBoundingClientRect().top/d,r=0,y=0,r=n-k,r=r*r,y=p-h,y=y*y,k=Math.sqrt(r+y);e.width=k+"px";h=Math.asin((f.getBoundingClientRect().top-
g.getBoundingClientRect().top)/(d*parseFloat(g.style.width)));g.style.transform="rotate("+h+"rad)";g.style.MozTransform="rotate("+h+"rad)";g.style.WebkitTransform="rotate("+h+"rad)";g.style.msTransform="rotate("+h+"rad)"}}var q=[],e=h.ownerDocument,r=new odf.OdfUtils,a=runtime.getWindow();runtime.assert(Boolean(a),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=k;this.getMinimumHeightForAnnotationPane=function(){return"none"!==b.style.display&&
0<q.length?(q[q.length-1].parentNode.getBoundingClientRect().bottom-b.getBoundingClientRect().top)/m.getZoomLevel()+"px":null};this.addAnnotation=function(a){n(!0);q.push(a);p();var b=e.createElement("div"),f=e.createElement("div"),h=e.createElement("div"),m=e.createElement("div"),r;b.className="annotationWrapper";a.parentNode.insertBefore(b,a);f.className="annotationNote";f.appendChild(a);g&&(r=e.createElement("div"),r.className="annotationRemoveButton",f.appendChild(r));h.className="annotationConnector horizontal";
m.className="annotationConnector angular";b.appendChild(f);b.appendChild(h);b.appendChild(m);a.annotationEndElement&&d(a);k()};this.forgetAnnotations=function(){for(;q.length;){var a=q[0],b=q.indexOf(a),d=a.parentNode.parentNode;"div"===d.localName&&(d.parentNode.insertBefore(a,d),d.parentNode.removeChild(d));for(var a=a.getAttributeNS(odf.Namespaces.officens,"name"),a=e.querySelectorAll('span.annotationHighlight[annotation="'+a+'"]'),g=d=void 0,d=0;d<a.length;d+=1){for(g=a.item(d);g.firstChild;)g.parentNode.insertBefore(g.firstChild,
g);g.parentNode.removeChild(g)}-1!==b&&q.splice(b,1);0===q.length&&n(!1)}}};
// Input 30
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
(function(){function m(g,d,h,p,k){var q,e=0,r;for(r in g)if(g.hasOwnProperty(r)){if(e===h){q=r;break}e+=1}q?d.getPartData(g[q].href,function(a,c){if(a)runtime.log(a);else if(c){var e="@font-face { font-family: '"+(g[q].family||q)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+b.convertUTF8ArrayToBase64(c)+') format("truetype"); }';try{p.insertRule(e,p.cssRules.length)}catch(f){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(f)+"\nRule: "+e)}}else runtime.log("missing font data for "+
g[q].href);m(g,d,h+1,p,k)}):k&&k()}var h=xmldom.XPath,b=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(b,d){for(var n=b.rootElement.fontFaceDecls;d.cssRules.length;)d.deleteRule(d.cssRules.length-1);if(n){var p={},k,q,e,r;if(n)for(n=h.getODFElementsWithXPath(n,"style:font-face[svg:font-face-src]",odf.Namespaces.lookupNamespaceURI),k=0;k<n.length;k+=1)q=n[k],e=q.getAttributeNS(odf.Namespaces.stylens,"name"),r=q.getAttributeNS(odf.Namespaces.svgns,"font-family"),q=h.getODFElementsWithXPath(q,
"svg:font-face-src/svg:font-face-uri",odf.Namespaces.lookupNamespaceURI),0<q.length&&(q=q[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),p[e]={href:q,family:r});m(p,b,0,d)}}};return odf.FontLoader})();
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
odf.Formatting=function(){function m(a){return(a=u[a])?t.mergeObjects({},a):{}}function h(){for(var a=r.rootElement.fontFaceDecls,b={},d,f,a=a&&a.firstElementChild;a;){if(d=a.getAttributeNS(l,"name"))if((f=a.getAttributeNS(c,"font-family"))||0<a.getElementsByTagNameNS(c,"font-face-uri").length)b[d]=f;a=a.nextElementSibling}return b}function b(a){for(var b=r.rootElement.styles.firstElementChild;b;){if(b.namespaceURI===l&&"default-style"===b.localName&&b.getAttributeNS(l,"family")===a)return b;b=b.nextElementSibling}return null}
function g(a,b,c){var d,e,g;c=c||[r.rootElement.automaticStyles,r.rootElement.styles];for(g=0;g<c.length;g+=1)for(d=c[g],d=d.firstElementChild;d;){e=d.getAttributeNS(l,"name");if(d.namespaceURI===l&&"style"===d.localName&&d.getAttributeNS(l,"family")===b&&e===a||"list-style"===b&&d.namespaceURI===f&&"list-style"===d.localName&&e===a||"data"===b&&d.namespaceURI===v&&e===a)return d;d=d.nextElementSibling}return null}function d(a){for(var b,c,d,f,e={},g=a.firstElementChild;g;){if(g.namespaceURI===l)for(d=
e[g.nodeName]={},c=g.attributes,b=0;b<c.length;b+=1)f=c.item(b),d[f.name]=f.value;g=g.nextElementSibling}c=a.attributes;for(b=0;b<c.length;b+=1)f=c.item(b),e[f.name]=f.value;return e}function n(a,c){for(var f=r.rootElement.styles,e,k={},h=a.getAttributeNS(l,"family"),n=a;n;)e=d(n),k=t.mergeObjects(e,k),n=(e=n.getAttributeNS(l,"parent-style-name"))?g(e,h,[f]):null;if(n=b(h))e=d(n),k=t.mergeObjects(e,k);!1!==c&&(e=m(h),k=t.mergeObjects(e,k));return k}function p(b,c){function d(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){g+=
"|"+b+":"+a+"|"})})}for(var f=b.nodeType===Node.TEXT_NODE?b.parentNode:b,e,l=[],g="",k=!1;f;)!k&&z.isGroupingElement(f)&&(k=!0),(e=a.determineStylesForNode(f))&&l.push(e),f=f.parentNode;k&&(l.forEach(d),c&&(c[g]=l));return k?l:void 0}function k(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var d=Object.keys(a[c])[0],f={name:d,family:c,displayName:void 0,isCommonStyle:!1},e;(e=g(d,c))?(c=n(e),b=t.mergeObjects(c,b),f.displayName=e.getAttributeNS(l,"display-name"),
f.isCommonStyle=e.parentNode===r.rootElement.styles):runtime.log("No style element found for '"+d+"' of family '"+c+"'");b.orderedStyles.push(f)})});return b}function q(a,b){var c={},d=[];b||(b={});a.forEach(function(a){p(a,c)});Object.keys(c).forEach(function(a){b[a]||(b[a]=k(c[a]));d.push(b[a])});return d}function e(a,b){var c=z.parseLength(a),d=b;if(c)switch(c.unit){case "cm":d=c.value;break;case "mm":d=0.1*c.value;break;case "in":d=2.54*c.value;break;case "pt":d=0.035277778*c.value;break;case "pc":case "px":case "em":break;
default:runtime.log("Unit identifier: "+c.unit+" is not supported.")}return d}var r,a=new odf.StyleInfo,c=odf.Namespaces.svgns,l=odf.Namespaces.stylens,f=odf.Namespaces.textns,v=odf.Namespaces.numberns,w=odf.Namespaces.fons,z=new odf.OdfUtils,x=new core.DomUtils,t=new core.Utils,u={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.getSystemDefaultStyleAttributes=m;this.setOdfContainer=function(a){r=a};this.getFontMap=h;this.getAvailableParagraphStyles=function(){for(var a=r.rootElement.styles,
b,c,d=[],a=a&&a.firstElementChild;a;)"style"===a.localName&&a.namespaceURI===l&&(b=a.getAttributeNS(l,"family"),"paragraph"===b&&(b=a.getAttributeNS(l,"name"),c=a.getAttributeNS(l,"display-name")||b,b&&c&&d.push({name:b,displayName:c}))),a=a.nextElementSibling;return d};this.isStyleUsed=function(b){var c,d=r.rootElement;c=a.hasDerivedStyles(d,odf.Namespaces.lookupNamespaceURI,b);b=(new a.UsedStyleList(d.styles)).uses(b)||(new a.UsedStyleList(d.automaticStyles)).uses(b)||(new a.UsedStyleList(d.body)).uses(b);
return c||b};this.getDefaultStyleElement=b;this.getStyleElement=g;this.getStyleAttributes=d;this.getInheritedStyleAttributes=n;this.getFirstCommonParentStyleNameOrSelf=function(a){var b=r.rootElement.automaticStyles,c=r.rootElement.styles,d;for(d=g(a,"paragraph",[b]);d;)a=d.getAttributeNS(l,"parent-style-name"),d=g(a,"paragraph",[b]);return(d=g(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(g(a,"paragraph"))};this.getAppliedStyles=q;this.getAppliedStylesForElement=function(a,
b){return q([a],b)[0]};this.updateStyle=function(a,b){var d,f;x.mapObjOntoNode(a,b,odf.Namespaces.lookupNamespaceURI);(d=b["style:text-properties"]&&b["style:text-properties"]["style:font-name"])&&!h().hasOwnProperty(d)&&(f=a.ownerDocument.createElementNS(l,"style:font-face"),f.setAttributeNS(l,"style:name",d),f.setAttributeNS(c,"svg:font-family",d),r.rootElement.fontFaceDecls.appendChild(f))};this.createDerivedStyleObject=function(a,b,c){var f=g(a,b);runtime.assert(Boolean(f),"No style element found for '"+
a+"' of family '"+b+"'");a=f.parentNode===r.rootElement.styles?{"style:parent-style-name":a}:d(f);a["style:family"]=b;t.mergeObjects(a,c);return a};this.getDefaultTabStopDistance=function(){for(var a=b("paragraph"),a=a&&a.firstElementChild,c;a;)a.namespaceURI===l&&"paragraph-properties"===a.localName&&(c=a.getAttributeNS(l,"tab-stop-distance")),a=a.nextElementSibling;c||(c="1.25cm");return z.parseNonNegativeLength(c)};this.getContentSize=function(a,b){var c,d,f,k,h,n,p,m,q,v,t;a:{var u,z,P;c=g(a,
b);runtime.assert("paragraph"===b||"table"===b,"styleFamily has to be either paragraph or table");if(c){u=c.getAttributeNS(l,"master-page-name")||"Standard";for(c=r.rootElement.masterStyles.lastElementChild;c&&c.getAttributeNS(l,"name")!==u;)c=c.previousElementSibling;u=c.getAttributeNS(l,"page-layout-name");z=x.getElementsByTagNameNS(r.rootElement.automaticStyles,l,"page-layout");for(P=0;P<z.length;P+=1)if(c=z[P],c.getAttributeNS(l,"name")===u)break a}c=null}c||(c=x.getDirectChild(r.rootElement.styles,
l,"default-page-layout"));if(c=x.getDirectChild(c,l,"page-layout-properties"))d=c.getAttributeNS(l,"print-orientation")||"portrait","portrait"===d?(d=21.001,f=29.7):(d=29.7,f=21.001),d=e(c.getAttributeNS(w,"page-width"),d),f=e(c.getAttributeNS(w,"page-height"),f),k=e(c.getAttributeNS(w,"margin"),null),null===k?(k=e(c.getAttributeNS(w,"margin-left"),2),h=e(c.getAttributeNS(w,"margin-right"),2),n=e(c.getAttributeNS(w,"margin-top"),2),p=e(c.getAttributeNS(w,"margin-bottom"),2)):k=h=n=p=k,m=e(c.getAttributeNS(w,
"padding"),null),null===m?(m=e(c.getAttributeNS(w,"padding-left"),0),q=e(c.getAttributeNS(w,"padding-right"),0),v=e(c.getAttributeNS(w,"padding-top"),0),t=e(c.getAttributeNS(w,"padding-bottom"),0)):m=q=v=t=m;return{width:d-k-h-m-q,height:f-n-p-v-t}}};
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
odf.StyleTreeNode=function(m){this.derivedStyles={};this.element=m};
odf.Style2CSS=function(){function m(a){var b,c,d,f={};if(!a)return f;for(a=a.firstElementChild;a;){if(c=a.namespaceURI!==l||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===w&&"list-style"===a.localName?"list":a.namespaceURI!==l||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(l,"family"))(b=a.getAttributeNS(l,"name"))||(b=""),f.hasOwnProperty(c)?d=f[c]:f[c]=d={},d[b]=a;a=a.nextElementSibling}return f}function h(a,b){if(a.hasOwnProperty(b))return a[b];
var c,d=null;for(c in a)if(a.hasOwnProperty(c)&&(d=h(a[c].derivedStyles,b)))break;return d}function b(a,c,d){var f,e,g;if(!c.hasOwnProperty(a))return null;f=new odf.StyleTreeNode(c[a]);e=f.element.getAttributeNS(l,"parent-style-name");g=null;e&&(g=h(d,e)||b(e,c,d));g?g.derivedStyles[a]=f:d[a]=f;delete c[a];return f}function g(a,c){for(var d in a)a.hasOwnProperty(d)&&b(d,a,c)}function d(a,b,c){var f=[];c=c.derivedStyles;var e;var l=u[a],g;void 0===l?b=null:(g=b?"["+l+'|style-name="'+b+'"]':"","presentation"===
l&&(l="draw",g=b?'[presentation|style-name="'+b+'"]':""),b=l+"|"+s[a].join(g+","+l+"|")+g);null!==b&&f.push(b);for(e in c)c.hasOwnProperty(e)&&(b=d(a,e,c[e]),f=f.concat(b));return f}function n(a,b){var c="",d,f,e;for(d=0;d<b.length;d+=1)if(f=b[d],e=a.getAttributeNS(f[0],f[1])){e=e.trim();if(G.hasOwnProperty(f[1])){var l=e.indexOf(" "),g=void 0,k=void 0;-1!==l?(g=e.substring(0,l),k=e.substring(l)):(g=e,k="");(g=Q.parseLength(g))&&"pt"===g.unit&&0.75>g.value&&(e="0.75pt"+k)}f[2]&&(c+=f[2]+":"+e+";")}return c}
function p(b){return(b=t.getDirectChild(b,l,"text-properties"))?Q.parseFoFontSize(b.getAttributeNS(a,"font-size")):null}function k(a,b,c,d){return b+b+c+c+d+d}function q(b,c,d,f){c='text|list[text|style-name="'+c+'"]';var e=d.getAttributeNS(w,"level");d=t.getDirectChild(d,l,"list-level-properties");d=t.getDirectChild(d,l,"list-level-label-alignment");var g,k;d&&(g=d.getAttributeNS(a,"text-indent"),k=d.getAttributeNS(a,"margin-left"));g||(g="-0.6cm");d="-"===g.charAt(0)?g.substring(1):"-"+g;for(e=
e&&parseInt(e,10);1<e;)c+=" > text|list-item > text|list",e-=1;if(k){e=c+" > text|list-item > *:not(text|list):first-child";e+="{";e=e+("margin-left:"+k+";")+"}";try{b.insertRule(e,b.cssRules.length)}catch(h){runtime.log("cannot load rule: "+e)}}f=c+" > text|list-item > *:not(text|list):first-child:before{"+f+";";f=f+"counter-increment:list;"+("margin-left:"+g+";");f+="width:"+d+";";f+="display:inline-block}";try{b.insertRule(f,b.cssRules.length)}catch(n){runtime.log("cannot load rule: "+f)}}function e(b,
f,g,h){if("list"===f)for(var m=h.element.firstChild,s,u;m;){if(m.namespaceURI===w)if(s=m,"list-level-style-number"===m.localName){var G=s;u=G.getAttributeNS(l,"num-format");var A=G.getAttributeNS(l,"num-suffix")||"",G=G.getAttributeNS(l,"num-prefix")||"",Y={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},R="";G&&(R+=' "'+G+'"');R=Y.hasOwnProperty(u)?R+(" counter(list, "+Y[u]+")"):u?R+(' "'+u+'"'):R+" ''";u="content:"+R+' "'+A+'"';q(b,g,s,u)}else"list-level-style-image"===
m.localName?(u="content: none;",q(b,g,s,u)):"list-level-style-bullet"===m.localName&&(u="content: '"+s.getAttributeNS(w,"bullet-char")+"';",q(b,g,s,u));m=m.nextSibling}else if("page"===f){if(u=h.element,G=A=g="",m=t.getDirectChild(u,l,"page-layout-properties"))if(s=u.getAttributeNS(l,"name"),g+=n(m,D),(A=t.getDirectChild(m,l,"background-image"))&&(G=A.getAttributeNS(z,"href"))&&(g=g+("background-image: url('odfkit:"+G+"');")+n(A,F)),"presentation"===ea)for(u=(u=t.getDirectChild(u.parentNode.parentNode,
c,"master-styles"))&&u.firstElementChild;u;){if(u.namespaceURI===l&&"master-page"===u.localName&&u.getAttributeNS(l,"page-layout-name")===s){G=u.getAttributeNS(l,"name");A="draw|page[draw|master-page-name="+G+"] {"+g+"}";G="office|body, draw|page[draw|master-page-name="+G+"] {"+n(m,ba)+" }";try{b.insertRule(A,b.cssRules.length),b.insertRule(G,b.cssRules.length)}catch(aa){throw aa;}}u=u.nextElementSibling}else if("text"===ea){A="office|text {"+g+"}";G="office|body {width: "+m.getAttributeNS(a,"page-width")+
";}";try{b.insertRule(A,b.cssRules.length),b.insertRule(G,b.cssRules.length)}catch(ia){throw ia;}}}else{g=d(f,g,h).join(",");m="";if(s=t.getDirectChild(h.element,l,"text-properties")){G=s;u=R="";A=1;s=""+n(G,y);Y=G.getAttributeNS(l,"text-underline-style");"solid"===Y&&(R+=" underline");Y=G.getAttributeNS(l,"text-line-through-style");"solid"===Y&&(R+=" line-through");R.length&&(s+="text-decoration:"+R+";");if(R=G.getAttributeNS(l,"font-name")||G.getAttributeNS(a,"font-family"))Y=J[R],s+="font-family: "+
(Y||R)+";";Y=G.parentNode;if(G=p(Y)){for(;Y;){if(G=p(Y)){if("%"!==G.unit){u="font-size: "+G.value*A+G.unit+";";break}A*=G.value/100}G=Y;R=Y="";Y=null;"default-style"===G.localName?Y=null:(Y=G.getAttributeNS(l,"parent-style-name"),R=G.getAttributeNS(l,"family"),Y=I.getODFElementsWithXPath(P,Y?"//style:*[@style:name='"+Y+"'][@style:family='"+R+"']":"//style:default-style[@style:family='"+R+"']",odf.Namespaces.lookupNamespaceURI)[0])}u||(u="font-size: "+parseFloat(N)*A+B.getUnits(N)+";");s+=u}m+=s}if(s=
t.getDirectChild(h.element,l,"paragraph-properties"))u=s,s=""+n(u,L),(A=t.getDirectChild(u,l,"background-image"))&&(G=A.getAttributeNS(z,"href"))&&(s=s+("background-image: url('odfkit:"+G+"');")+n(A,F)),(u=u.getAttributeNS(a,"line-height"))&&"normal"!==u&&(u=Q.parseFoLineHeight(u),s="%"!==u.unit?s+("line-height: "+u.value+u.unit+";"):s+("line-height: "+u.value/100+";")),m+=s;if(s=t.getDirectChild(h.element,l,"graphic-properties"))G=s,s=""+n(G,O),u=G.getAttributeNS(r,"opacity"),A=G.getAttributeNS(r,
"fill"),G=G.getAttributeNS(r,"fill-color"),"solid"===A||"hatch"===A?G&&"none"!==G?(u=isNaN(parseFloat(u))?1:parseFloat(u)/100,A=G.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,k),(G=(A=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(A))?{r:parseInt(A[1],16),g:parseInt(A[2],16),b:parseInt(A[3],16)}:null)&&(s+="background-color: rgba("+G.r+","+G.g+","+G.b+","+u+");")):s+="background: none;":"none"===A&&(s+="background: none;"),m+=s;if(s=t.getDirectChild(h.element,l,"drawing-page-properties"))u=""+n(s,
O),"true"===s.getAttributeNS(x,"background-visible")&&(u+="background: none;"),m+=u;if(s=t.getDirectChild(h.element,l,"table-cell-properties"))s=""+n(s,H),m+=s;if(s=t.getDirectChild(h.element,l,"table-row-properties"))s=""+n(s,T),m+=s;if(s=t.getDirectChild(h.element,l,"table-column-properties"))s=""+n(s,U),m+=s;if(s=t.getDirectChild(h.element,l,"table-properties"))u=s,s=""+n(u,X),u=u.getAttributeNS(v,"border-model"),"collapsing"===u?s+="border-collapse:collapse;":"separating"===u&&(s+="border-collapse:separate;"),
m+=s;if(0!==m.length)try{b.insertRule(g+"{"+m+"}",b.cssRules.length)}catch(ga){throw ga;}}for(var da in h.derivedStyles)h.derivedStyles.hasOwnProperty(da)&&e(b,f,da,h.derivedStyles[da])}var r=odf.Namespaces.drawns,a=odf.Namespaces.fons,c=odf.Namespaces.officens,l=odf.Namespaces.stylens,f=odf.Namespaces.svgns,v=odf.Namespaces.tablens,w=odf.Namespaces.textns,z=odf.Namespaces.xlinkns,x=odf.Namespaces.presentationns,t=new core.DomUtils,u={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",
ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),
presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background",
"table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},y=[[a,"color","color"],[a,"background-color","background-color"],[a,"font-weight","font-weight"],[a,"font-style","font-style"]],F=[[l,"repeat","background-repeat"]],L=[[a,"background-color","background-color"],[a,"text-align","text-align"],[a,"text-indent","text-indent"],[a,"padding","padding"],[a,"padding-left","padding-left"],[a,"padding-right","padding-right"],[a,"padding-top","padding-top"],[a,"padding-bottom","padding-bottom"],[a,"border-left","border-left"],[a,"border-right",
"border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"margin","margin"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"],[a,"border","border"]],O=[[a,"background-color","background-color"],[a,"min-height","min-height"],[r,"stroke","border"],[f,"stroke-color","border-color"],[f,"stroke-width","border-width"],[a,"border","border"],[a,"border-left","border-left"],[a,"border-right","border-right"],
[a,"border-top","border-top"],[a,"border-bottom","border-bottom"]],H=[[a,"background-color","background-color"],[a,"border-left","border-left"],[a,"border-right","border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"border","border"]],U=[[l,"column-width","width"]],T=[[l,"row-height","height"],[a,"keep-together",null]],X=[[l,"width","width"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"]],
D=[[a,"background-color","background-color"],[a,"padding","padding"],[a,"padding-left","padding-left"],[a,"padding-right","padding-right"],[a,"padding-top","padding-top"],[a,"padding-bottom","padding-bottom"],[a,"border","border"],[a,"border-left","border-left"],[a,"border-right","border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"margin","margin"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"]],
ba=[[a,"page-width","width"],[a,"page-height","height"]],G={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,"stroke-width":!0},J={},Q=new odf.OdfUtils,ea,P,N,I=xmldom.XPath,B=new core.CSSUnits;this.style2css=function(a,b,c,d,f){for(var l,k,h,n;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);l=null;d&&(l=d.ownerDocument,P=d.parentNode);f&&(l=f.ownerDocument,P=f.parentNode);if(l)for(n in odf.Namespaces.forEachPrefix(function(a,c){k="@namespace "+a+" url("+c+");";
try{b.insertRule(k,b.cssRules.length)}catch(d){}}),J=c,ea=a,N=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=m(d),d=m(f),f={},u)if(u.hasOwnProperty(n))for(h in c=f[n]={},g(a[n],c),g(d[n],c),c)c.hasOwnProperty(h)&&e(b,n,h,c[h])}};
// Input 33
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
(function(){function m(h,b){var g=this;this.getDistance=function(b){var h=g.x-b.x;b=g.y-b.y;return Math.sqrt(h*h+b*b)};this.getCenter=function(b){return new m((g.x+b.x)/2,(g.y+b.y)/2)};g.x=h;g.y=b}gui.ZoomHelper=function(){function h(a,b,d,f){a=f?"translate3d("+a+"px, "+b+"px, 0) scale3d("+d+", "+d+", 1)":"translate("+a+"px, "+b+"px) scale("+d+")";c.style.WebkitTransform=a;c.style.MozTransform=a;c.style.msTransform=a;c.style.OTransform=a;c.style.transform=a}function b(a){a?h(-l.x,-l.y,w,!0):(h(0,
0,w,!0),h(0,0,w,!1))}function g(a){if(t&&F){var b=t.style.overflow,c=t.classList.contains("customScrollbars");a&&c||!a&&!c||(a?(t.classList.add("customScrollbars"),t.style.overflow="hidden",runtime.requestAnimationFrame(function(){t.style.overflow=b})):t.classList.remove("customScrollbars"))}}function d(){h(-l.x,-l.y,w,!0);t.scrollLeft=0;t.scrollTop=0;g(!1)}function n(){h(0,0,w,!0);t.scrollLeft=l.x;t.scrollTop=l.y;g(!0)}function p(a){return new m(a.pageX-c.offsetLeft,a.pageY-c.offsetTop)}function k(a){f&&
(l.x-=a.x-f.x,l.y-=a.y-f.y,l=new m(Math.min(Math.max(l.x,c.offsetLeft),(c.offsetLeft+c.offsetWidth)*w-t.clientWidth),Math.min(Math.max(l.y,c.offsetTop),(c.offsetTop+c.offsetHeight)*w-t.clientHeight)));f=a}function q(a){var b=a.touches.length,c=0<b?p(a.touches[0]):null;a=1<b?p(a.touches[1]):null;c&&a?(v=c.getDistance(a),z=w,f=c.getCenter(a),d(),y=s.PINCH):c&&(f=c,y=s.SCROLL)}function e(a){var f=a.touches.length,e=0<f?p(a.touches[0]):null,f=1<f?p(a.touches[1]):null;if(e&&f)if(a.preventDefault(),y===
s.SCROLL)y=s.PINCH,d(),v=e.getDistance(f);else{a=e.getCenter(f);e=e.getDistance(f)/v;k(a);var f=w,g=Math.min(x,c.offsetParent.clientWidth/c.offsetWidth);w=z*e;w=Math.min(Math.max(w,g),x);e=w/f;l.x+=(e-1)*(a.x+l.x);l.y+=(e-1)*(a.y+l.y);b(!0)}else e&&(y===s.PINCH?(y=s.SCROLL,n()):k(e))}function r(){y===s.PINCH&&(u.emit(gui.ZoomHelper.signalZoomChanged,w),n(),b(!1));y=s.NONE}function a(){t&&(t.removeEventListener("touchstart",q,!1),t.removeEventListener("touchmove",e,!1),t.removeEventListener("touchend",
r,!1))}var c,l,f,v,w,z,x=4,t,u=new core.EventNotifier([gui.ZoomHelper.signalZoomChanged]),s={NONE:0,SCROLL:1,PINCH:2},y=s.NONE,F=runtime.getWindow().hasOwnProperty("ontouchstart");this.subscribe=function(a,b){u.subscribe(a,b)};this.unsubscribe=function(a,b){u.unsubscribe(a,b)};this.getZoomLevel=function(){return w};this.setZoomLevel=function(a){c&&(w=a,b(!1),u.emit(gui.ZoomHelper.signalZoomChanged,w))};this.destroy=function(b){a();g(!1);b()};this.setZoomableElement=function(d){a();c=d;t=c.offsetParent;
b(!1);t&&(t.addEventListener("touchstart",q,!1),t.addEventListener("touchmove",e,!1),t.addEventListener("touchend",r,!1));g(!0)};z=w=1;l=new m(0,0)};gui.ZoomHelper.signalZoomChanged="zoomChanged"})();
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
ops.Canvas=function(){};ops.Canvas.prototype.getZoomLevel=function(){};ops.Canvas.prototype.getElement=function(){};ops.Canvas.prototype.getZoomHelper=function(){};
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
(function(){function m(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(f){runtime.log(String(f))}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function h(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function b(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function g(a){a=a.sheet;for(var b=a.cssRules;b.length;)a.deleteRule(b.length-
1)}function d(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function n(a,b,c){var d=null;a=a.rootElement.body.getElementsByTagNameNS(H,c+"-decl");c=b.getAttributeNS(H,"use-"+c+"-name");var f;if(c&&0<a.length)for(b=0;b<a.length;b+=1)if(f=a[b],f.getAttributeNS(H,"name")===c){d=f.textContent;break}return d}function p(a,c,d,f){var e=a.ownerDocument;c=a.getElementsByTagNameNS(c,d);for(a=0;a<c.length;a+=1)b(c[a]),f&&(d=
c[a],d.appendChild(e.createTextNode(f)))}function k(a,b,c){b.setAttributeNS("urn:webodf:names:helper","styleid",a);var d,f=b.getAttributeNS(F,"anchor-type"),e=b.getAttributeNS(s,"x"),l=b.getAttributeNS(s,"y"),g=b.getAttributeNS(s,"width"),k=b.getAttributeNS(s,"height"),h=b.getAttributeNS(x,"min-height"),n=b.getAttributeNS(x,"min-width");if("as-char"===f)d="display: inline-block;";else if(f||e||l)d="position: absolute;";else if(g||k||h||n)d="display: block;";e&&(d+="left: "+e+";");l&&(d+="top: "+l+
";");g&&(d+="width: "+g+";");k&&(d+="height: "+k+";");h&&(d+="min-height: "+h+";");n&&(d+="min-width: "+n+";");d&&(d="draw|"+b.localName+'[webodfhelper|styleid="'+a+'"] {'+d+"}",c.insertRule(d,c.cssRules.length))}function q(a){for(a=a.firstChild;a;){if(a.namespaceURI===t&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function e(a,b,c,d){function f(b){b&&(b='draw|image[webodfhelper|styleid="'+a+'"] {'+("background-image: url("+
b+");")+"}",d.insertRule(b,d.cssRules.length))}function e(a){f(a.url)}c.setAttributeNS("urn:webodf:names:helper","styleid",a);var l=c.getAttributeNS(L,"href"),g;if(l)try{g=b.getPart(l),g.onchange=e,g.load()}catch(k){runtime.log("slight problem: "+String(k))}else l=q(c),f(l)}function r(a){var b=a.ownerDocument;D.getElementsByTagNameNS(a,F,"line-break").forEach(function(a){a.hasChildNodes()||a.appendChild(b.createElement("br"))})}function a(a){var b=a.ownerDocument;D.getElementsByTagNameNS(a,F,"s").forEach(function(a){for(var c,
d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(F,"c"),10);if(1<d)for(a.removeAttributeNS(F,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function c(a){D.getElementsByTagNameNS(a,F,"tab").forEach(function(a){a.textContent="\t"})}function l(a,b){function c(a,d){var l=g.documentElement.namespaceURI;"video/"===d.substr(0,6)?(f=g.createElementNS(l,"video"),f.setAttribute("controls","controls"),e=g.createElementNS(l,"source"),
a&&e.setAttribute("src",a),e.setAttribute("type",d),f.appendChild(e),b.parentNode.appendChild(f)):b.innerHtml="Unrecognised Plugin"}function d(a){c(a.url,a.mimetype)}var f,e,l,g=b.ownerDocument,k;if(l=b.getAttributeNS(L,"href"))try{k=a.getPart(l),k.onchange=d,k.load()}catch(h){runtime.log("slight problem: "+String(h))}else runtime.log("using MP4 data fallback"),l=q(b),c(l,"video/mp4")}function f(a){var b=a.getElementsByTagName("head")[0],c,d;c=a.styleSheets.length;for(d=b.firstElementChild;d&&("style"!==
d.localName||!d.hasAttribute("webodfcss"));)d=d.nextElementSibling;if(d)return c=parseInt(d.getAttribute("webodfcss"),10),d.setAttribute("webodfcss",c+1),d;"string"===String(typeof webodf_css)?c=webodf_css:(d="webodf.css",runtime.currentDirectory&&(d=runtime.currentDirectory(),0<d.length&&"/"!==d.substr(-1)&&(d+="/"),d+="../webodf.css"),c=runtime.readFileSync(d,"utf-8"));d=a.createElementNS(b.namespaceURI,"style");d.setAttribute("media","screen, print, handheld, projection");d.setAttribute("type",
"text/css");d.setAttribute("webodfcss","1");d.appendChild(a.createTextNode(c));b.appendChild(d);return d}function v(a){var b=parseInt(a.getAttribute("webodfcss"),10);1===b?a.parentNode.removeChild(a):a.setAttribute("count",b-1)}function w(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});
d+="@namespace webodfhelper url(urn:webodf:names:helper);\n";c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var z=odf.Namespaces.drawns,x=odf.Namespaces.fons,t=odf.Namespaces.officens,u=odf.Namespaces.stylens,s=odf.Namespaces.svgns,y=odf.Namespaces.tablens,F=odf.Namespaces.textns,L=odf.Namespaces.xlinkns,O=odf.Namespaces.xmlns,H=odf.Namespaces.presentationns,U=runtime.getWindow(),T=xmldom.XPath,X=new odf.OdfUtils,D=new core.DomUtils;odf.OdfCanvas=function(q){function s(a,b,c){function d(a,
b,c,f){ka.addToQueue(function(){e(a,b,c,f)})}var f,l;f=b.getElementsByTagNameNS(z,"image");for(b=0;b<f.length;b+=1)l=f.item(b),d("image"+String(b),a,l,c)}function L(a,b){function c(a,b){ka.addToQueue(function(){l(a,b)})}var d,f,e;f=b.getElementsByTagNameNS(z,"plugin");for(d=0;d<f.length;d+=1)e=f.item(d),c(a,e)}function x(){var a;a=S.firstChild;var b=Z.getZoomLevel();a&&(S.style.WebkitTransformOrigin="0% 0%",S.style.MozTransformOrigin="0% 0%",S.style.msTransformOrigin="0% 0%",S.style.OTransformOrigin=
"0% 0%",S.style.transformOrigin="0% 0%",A&&((a=A.getMinimumHeightForAnnotationPane())?S.style.minHeight=a:S.style.removeProperty("min-height")),q.style.width=Math.round(b*S.offsetWidth)+"px",q.style.height=Math.round(b*S.offsetHeight)+"px")}function ea(a){ma?(fa.parentNode||S.appendChild(fa),A&&A.forgetAnnotations(),A=new gui.AnnotationViewManager(I,a.body,fa,ca),D.getElementsByTagNameNS(a.body,t,"annotation").forEach(A.addAnnotation),A.rerenderAnnotations(),x()):fa.parentNode&&(S.removeChild(fa),
A.forgetAnnotations(),x())}function P(f){function e(){g(R);g(aa);g(ia);b(q);q.style.display="inline-block";var l=M.rootElement;q.ownerDocument.importNode(l,!0);$.setOdfContainer(M);var h=M,m=R;(new odf.FontLoader).loadFonts(h,m.sheet);d(M,$,aa);m=M;h=ia.sheet;b(q);S=B.createElementNS(q.namespaceURI,"div");S.style.display="inline-block";S.style.background="white";S.style.setProperty("float","left","important");S.appendChild(l);q.appendChild(S);fa=B.createElementNS(q.namespaceURI,"div");fa.id="annotationsPane";
ga=B.createElementNS(q.namespaceURI,"div");ga.id="shadowContent";ga.style.position="absolute";ga.style.top=0;ga.style.left=0;m.getContentElement().appendChild(ga);var v=l.body,w,x=[],D;for(w=v.firstElementChild;w&&w!==v;)if(w.namespaceURI===z&&(x[x.length]=w),w.firstElementChild)w=w.firstElementChild;else{for(;w&&w!==v&&!w.nextElementSibling;)w=w.parentNode;w&&w.nextElementSibling&&(w=w.nextElementSibling)}for(D=0;D<x.length;D+=1)w=x[D],k("frame"+String(D),w,h);x=T.getODFElementsWithXPath(v,".//*[*[@text:anchor-type='paragraph']]",
odf.Namespaces.lookupNamespaceURI);for(w=0;w<x.length;w+=1)v=x[w],v.setAttributeNS&&v.setAttributeNS("urn:webodf:names:helper","containsparagraphanchor",!0);var v=ga,P,A,N;N=0;var I,K,x=m.rootElement.ownerDocument;if((w=l.body.firstElementChild)&&w.namespaceURI===t&&("presentation"===w.localName||"drawing"===w.localName))for(w=w.firstElementChild;w;){D=w.getAttributeNS(z,"master-page-name");if(D){for(P=m.rootElement.masterStyles.firstElementChild;P&&(P.getAttributeNS(u,"name")!==D||"master-page"!==
P.localName||P.namespaceURI!==u);)P=P.nextElementSibling;D=P}else D=null;if(D){P=w.getAttributeNS("urn:webodf:names:helper","styleid");A=x.createElementNS(z,"draw:page");K=D.firstElementChild;for(I=0;K;)"true"!==K.getAttributeNS(H,"placeholder")&&(N=K.cloneNode(!0),A.appendChild(N),k(P+"_"+I,N,h)),K=K.nextElementSibling,I+=1;K=I=N=void 0;var Q=A.getElementsByTagNameNS(z,"frame");for(N=0;N<Q.length;N+=1)I=Q[N],(K=I.getAttributeNS(H,"class"))&&!/^(date-time|footer|header|page-number)$/.test(K)&&I.parentNode.removeChild(I);
v.appendChild(A);N=String(v.getElementsByTagNameNS(z,"page").length);p(A,F,"page-number",N);p(A,H,"header",n(m,w,"header"));p(A,H,"footer",n(m,w,"footer"));k(P,A,h);A.setAttributeNS(z,"draw:master-page-name",D.getAttributeNS(u,"name"))}w=w.nextElementSibling}v=q.namespaceURI;x=l.body.getElementsByTagNameNS(y,"table-cell");for(w=0;w<x.length;w+=1)D=x.item(w),D.hasAttributeNS(y,"number-columns-spanned")&&D.setAttributeNS(v,"colspan",D.getAttributeNS(y,"number-columns-spanned")),D.hasAttributeNS(y,"number-rows-spanned")&&
D.setAttributeNS(v,"rowspan",D.getAttributeNS(y,"number-rows-spanned"));r(l.body);a(l.body);c(l.body);s(m,l.body,h);L(m,l.body);D=l.body;m=q.namespaceURI;w={};var x={},V;P=U.document.getElementsByTagNameNS(F,"list-style");for(v=0;v<P.length;v+=1)I=P.item(v),(K=I.getAttributeNS(u,"name"))&&(x[K]=I);D=D.getElementsByTagNameNS(F,"list");for(v=0;v<D.length;v+=1)if(I=D.item(v),P=I.getAttributeNS(O,"id")){A=I.getAttributeNS(F,"continue-list");I.setAttributeNS(m,"id",P);N="text|list#"+P+" > text|list-item > *:first-child:before {";
if(K=I.getAttributeNS(F,"style-name")){I=x[K];V=X.getFirstNonWhitespaceChild(I);I=void 0;if(V)if("list-level-style-number"===V.localName){I=V.getAttributeNS(u,"num-format");K=V.getAttributeNS(u,"num-suffix")||"";var Q="",Q={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},W=void 0,W=V.getAttributeNS(u,"num-prefix")||"",W=Q.hasOwnProperty(I)?W+(" counter(list, "+Q[I]+")"):I?W+("'"+I+"';"):W+" ''";K&&(W+=" '"+K+"'");I=Q="content: "+W+";"}else"list-level-style-image"===V.localName?
I="content: none;":"list-level-style-bullet"===V.localName&&(I="content: '"+V.getAttributeNS(F,"bullet-char")+"';");V=I}if(A){for(I=w[A];I;)I=w[I];N+="counter-increment:"+A+";";V?(V=V.replace("list",A),N+=V):N+="content:counter("+A+");"}else A="",V?(V=V.replace("list",P),N+=V):N+="content: counter("+P+");",N+="counter-increment:"+P+";",h.insertRule("text|list#"+P+" {counter-reset:"+P+"}",h.cssRules.length);N+="}";w[P]=A;N&&h.insertRule(N,h.cssRules.length)}S.insertBefore(ga,S.firstChild);Z.setZoomableElement(S);
ea(l);if(!f&&(l=[M],da.hasOwnProperty("statereadychange")))for(h=da.statereadychange,V=0;V<h.length;V+=1)h[V].apply(null,l)}M.state===odf.OdfContainer.DONE?e():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),la=runtime.setTimeout(function C(){M.state===odf.OdfContainer.DONE?e():(runtime.log("will be back later..."),la=runtime.setTimeout(C,500))},100))}function N(a){ka.clearQueue();q.innerHTML=runtime.tr("Loading")+" "+a+"...";q.removeAttribute("style");M=new odf.OdfContainer(a,function(a){M=
a;P(!1)})}runtime.assert(null!==q&&void 0!==q,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==q.ownerDocument&&void 0!==q.ownerDocument,"odf.OdfCanvas constructor needs DOM");var I=this,B=q.ownerDocument,V=new core.Async,M,$=new odf.Formatting,W,S=null,fa=null,ma=!1,ca=!1,A=null,Y,R,aa,ia,ga,da={},la,ja,na=!1,ha=!1,ka=new m,Z=new gui.ZoomHelper;this.refreshCSS=function(){na=!0;ja.trigger()};this.refreshSize=function(){ja.trigger()};this.odfContainer=function(){return M};this.setOdfContainer=
function(a,b){M=a;P(!0===b)};this.load=this.load=N;this.save=function(a){M.save(a)};this.addListener=function(a,b){switch(a){case "click":var c=q,d=a;c.addEventListener?c.addEventListener(d,b,!1):c.attachEvent?c.attachEvent("on"+d,b):c["on"+d]=b;break;default:c=da.hasOwnProperty(a)?da[a]:da[a]=[],b&&-1===c.indexOf(b)&&c.push(b)}};this.getFormatting=function(){return $};this.getAnnotationViewManager=function(){return A};this.refreshAnnotations=function(){ea(M.rootElement)};this.rerenderAnnotations=
function(){A&&(ha=!0,ja.trigger())};this.getSizer=function(){return S};this.enableAnnotations=function(a,b){a!==ma&&(ma=a,ca=b,M&&ea(M.rootElement))};this.addAnnotation=function(a){A&&(A.addAnnotation(a),x())};this.forgetAnnotations=function(){A&&(A.forgetAnnotations(),x())};this.getZoomHelper=function(){return Z};this.setZoomLevel=function(a){Z.setZoomLevel(a)};this.getZoomLevel=function(){return Z.getZoomLevel()};this.fitToContainingElement=function(a,b){var c=Z.getZoomLevel(),d=q.offsetHeight/
c,c=a/(q.offsetWidth/c);b/d<c&&(c=b/d);Z.setZoomLevel(c)};this.fitToWidth=function(a){var b=q.offsetWidth/Z.getZoomLevel();Z.setZoomLevel(a/b)};this.fitSmart=function(a,b){var c,d;d=Z.getZoomLevel();c=q.offsetWidth/d;d=q.offsetHeight/d;c=a/c;void 0!==b&&b/d<c&&(c=b/d);Z.setZoomLevel(Math.min(1,c))};this.fitToHeight=function(a){var b=q.offsetHeight/Z.getZoomLevel();Z.setZoomLevel(a/b)};this.showFirstPage=function(){W.showFirstPage()};this.showNextPage=function(){W.showNextPage()};this.showPreviousPage=
function(){W.showPreviousPage()};this.showPage=function(a){W.showPage(a);x()};this.getElement=function(){return q};this.addCssForFrameWithImage=function(a){var b=a.getAttributeNS(z,"name"),c=a.firstElementChild;k(b,a,ia.sheet);c&&e(b+"img",M,c,ia.sheet)};this.destroy=function(a){var b=B.getElementsByTagName("head")[0],c=[W.destroy,ja.destroy];runtime.clearTimeout(la);fa&&fa.parentNode&&fa.parentNode.removeChild(fa);Z.destroy(function(){S&&(q.removeChild(S),S=null)});v(Y);b.removeChild(R);b.removeChild(aa);
b.removeChild(ia);V.destroyAll(c,a)};Y=f(B);W=new h(w(B));R=w(B);aa=w(B);ia=w(B);ja=new core.ScheduledTask(function(){na&&(d(M,$,aa),na=!1);ha&&(A&&A.rerenderAnnotations(),ha=!1);x()},0);Z.subscribe(gui.ZoomHelper.signalZoomChanged,x)}})();
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
gui.SelectionMover=function(m,h){function b(){r.setUnfilteredPosition(m.getNode(),0);return r}function g(a,b){var d,e=null;a&&0<a.length&&(d=b?a.item(a.length-1):a.item(0));d&&(e={top:d.top,left:b?d.right:d.left,bottom:d.bottom});return e}function d(a,b,f,e){var k=a.nodeType;f.setStart(a,b);f.collapse(!e);e=g(f.getClientRects(),!0===e);!e&&0<b&&(f.setStart(a,b-1),f.setEnd(a,b),e=g(f.getClientRects(),!0));e||(k===Node.ELEMENT_NODE&&0<b&&a.childNodes.length>=b?e=d(a,b-1,f,!0):a.nodeType===Node.TEXT_NODE&&
0<b?e=d(a,b-1,f,!0):a.previousSibling?e=d(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,f,!0):a.parentNode&&a.parentNode!==h?e=d(a.parentNode,0,f,!1):(f.selectNode(h),e=g(f.getClientRects(),!1)));runtime.assert(Boolean(e),"No visible rectangle found");return e}function n(c,d,f){for(var e=b(),g=new core.LoopWatchDog(1E4),k=0,h=0;0<c&&e.nextPosition();)g.check(),f.acceptPosition(e)===a&&(k+=1,d.acceptPosition(e)===
a&&(h+=k,k=0,c-=1));return h}function p(c,d,f){for(var e=b(),g=new core.LoopWatchDog(1E4),k=0,h=0;0<c&&e.previousPosition();)g.check(),f.acceptPosition(e)===a&&(k+=1,d.acceptPosition(e)===a&&(h+=k,k=0,c-=1));return h}function k(c,e){var f=b(),g=0,k=0,n=0>c?-1:1;for(c=Math.abs(c);0<c;){for(var m=e,p=n,r=f,q=r.container(),y=0,F=null,L=void 0,O=10,H=void 0,U=0,T=void 0,X=void 0,D=void 0,H=void 0,ba=h.ownerDocument.createRange(),G=new core.LoopWatchDog(1E4),H=d(q,r.unfilteredDomOffset(),ba),T=H.top,X=
H.left,D=T;!0===(0>p?r.previousPosition():r.nextPosition());)if(G.check(),m.acceptPosition(r)===a&&(y+=1,q=r.container(),H=d(q,r.unfilteredDomOffset(),ba),H.top!==T)){if(H.top!==D&&D!==T)break;D=H.top;H=Math.abs(X-H.left);if(null===F||H<O)F=q,L=r.unfilteredDomOffset(),O=H,U=y}null!==F?(r.setUnfilteredPosition(F,L),y=U):y=0;ba.detach();g+=y;if(0===g)break;k+=g;c-=1}return k*n}function q(c,l){var f,g,k,n,m=b(),p=e.getParagraphElement(m.getCurrentNode()),r=0,q=h.ownerDocument.createRange();0>c?(f=m.previousPosition,
g=-1):(f=m.nextPosition,g=1);for(k=d(m.container(),m.unfilteredDomOffset(),q);f.call(m);)if(l.acceptPosition(m)===a){if(e.getParagraphElement(m.getCurrentNode())!==p)break;n=d(m.container(),m.unfilteredDomOffset(),q);if(n.bottom!==k.bottom&&(k=n.top>=k.top&&n.bottom<k.bottom||n.top<=k.top&&n.bottom>k.bottom,!k))break;r+=g;k=n}q.detach();return r}var e=new odf.OdfUtils,r,a=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.getStepCounter=function(){return{convertForwardStepsBetweenFilters:n,convertBackwardStepsBetweenFilters:p,
countLinesSteps:k,countStepsToLineBoundary:q}};(function(){r=gui.SelectionMover.createPositionIterator(h);var a=h.ownerDocument.createRange();a.setStart(r.container(),r.unfilteredDomOffset());a.collapse(!0);m.setSelectedRange(a)})()};
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
ops.OdtCursor=function(m,h){var b=this,g={},d,n,p,k=new core.EventNotifier([ops.OdtCursor.signalCursorUpdated]);this.removeFromDocument=function(){p.remove()};this.subscribe=function(b,d){k.subscribe(b,d)};this.unsubscribe=function(b,d){k.unsubscribe(b,d)};this.getStepCounter=function(){return n.getStepCounter()};this.getMemberId=function(){return m};this.getNode=function(){return p.getNode()};this.getAnchorNode=function(){return p.getAnchorNode()};this.getSelectedRange=function(){return p.getSelectedRange()};
this.setSelectedRange=function(d,e){p.setSelectedRange(d,e);k.emit(ops.OdtCursor.signalCursorUpdated,b)};this.hasForwardSelection=function(){return p.hasForwardSelection()};this.getDocument=function(){return h};this.getSelectionType=function(){return d};this.setSelectionType=function(b){g.hasOwnProperty(b)?d=b:runtime.log("Invalid selection type: "+b)};this.resetSelectionType=function(){b.setSelectionType(ops.OdtCursor.RangeSelection)};p=new core.Cursor(h.getDOMDocument(),m);n=new gui.SelectionMover(p,
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
(function(){var m=0;ops.StepsCache=function(h,b,g){function d(a,c,d){this.nodeId=a;this.steps=c;this.node=d;this.previousBookmark=this.nextBookmark=null;this.setIteratorPosition=function(a){a.setPositionBeforeElement(d);do if(b.acceptPosition(a)===u)break;while(a.nextPosition())}}function n(a,c,d){this.nodeId=a;this.steps=c;this.node=d;this.previousBookmark=this.nextBookmark=null;this.setIteratorPosition=function(a){a.setUnfilteredPosition(d,0);do if(b.acceptPosition(a)===u)break;while(a.nextPosition())}}
function p(a,b){var c="["+a.nodeId;b&&(c+=" => "+b.nodeId);return c+"]"}function k(){for(var a=x,b,c,d,f=new core.LoopWatchDog(0,1E5);a;){f.check();(b=a.previousBookmark)?runtime.assert(b.nextBookmark===a,"Broken bookmark link to previous @"+p(b,a)):(runtime.assert(a===x,"Broken bookmark link @"+p(a)),runtime.assert(void 0===t||x.steps<=t,"Base point is damaged @"+p(a)));(c=a.nextBookmark)&&runtime.assert(c.previousBookmark===a,"Broken bookmark link to next @"+p(a,c));if(void 0===t||a.steps<=t)runtime.assert(z.containsNode(h,
a.node),"Disconnected node is being reported as undamaged @"+p(a)),b&&(d=a.node.compareDocumentPosition(b.node),runtime.assert(0===d||0!==(d&Node.DOCUMENT_POSITION_PRECEDING),"Bookmark order with previous does not reflect DOM order @"+p(b,a))),c&&z.containsNode(h,c.node)&&(d=a.node.compareDocumentPosition(c.node),runtime.assert(0===d||0!==(d&Node.DOCUMENT_POSITION_FOLLOWING),"Bookmark order with next does not reflect DOM order @"+p(a,c)));a=a.nextBookmark}}function q(a){var b="";a.nodeType===Node.ELEMENT_NODE&&
(b=a.getAttributeNS(l,"nodeId"));return b}function e(a){var b=m.toString();a.setAttributeNS(l,"nodeId",b);m+=1;return b}function r(a){var b,c,d=new core.LoopWatchDog(0,1E4);void 0!==t&&a>t&&(a=t);for(b=Math.floor(a/g)*g;!c&&0!==b;)c=f[b],b-=g;for(c=c||x;c.nextBookmark&&c.nextBookmark.steps<=a;)d.check(),c=c.nextBookmark;return c}function a(a){a.previousBookmark&&(a.previousBookmark.nextBookmark=a.nextBookmark);a.nextBookmark&&(a.nextBookmark.previousBookmark=a.previousBookmark)}function c(a){for(var b,
c=null;!c&&a&&a!==h;)(b=q(a))&&(c=v[b])&&c.node!==a&&(runtime.log("Cloned node detected. Creating new bookmark"),c=null,a.removeAttributeNS(l,"nodeId")),a=a.parentNode;return c}var l="urn:webodf:names:steps",f={},v={},w=new odf.OdfUtils,z=new core.DomUtils,x,t,u=core.PositionFilter.FilterResult.FILTER_ACCEPT,s;this.updateCache=function(b,c,l){var k;k=c.getCurrentNode();if(c.isBeforeNode()&&w.isParagraph(k)){l||(b+=1);c=b;var n,m,p;if(void 0!==t&&t<c){n=r(t);for(l=n.nextBookmark;l&&l.steps<=c;)m=l.nextBookmark,
p=Math.ceil(l.steps/g)*g,f[p]===l&&delete f[p],z.containsNode(h,l.node)?l.steps=c+1:(a(l),delete v[l.nodeId]),l=m;t=c}else n=r(c);c=n;l=q(k)||e(k);(n=v[l])?n.node===k?n.steps=b:(runtime.log("Cloned node detected. Creating new bookmark"),l=e(k),n=v[l]=new d(l,b,k)):n=v[l]=new d(l,b,k);k=n;c!==k&&c.nextBookmark!==k&&(a(k),b=c.nextBookmark,k.nextBookmark=c.nextBookmark,k.previousBookmark=c,c.nextBookmark=k,b&&(b.previousBookmark=k));b=Math.ceil(k.steps/g)*g;c=f[b];if(!c||k.steps>c.steps)f[b]=k;s()}};
this.setToClosestStep=function(a,b){var c;s();c=r(a);c.setIteratorPosition(b);return c.steps};this.setToClosestDomPoint=function(a,b,d){var e,l;s();if(a===h&&0===b)e=x;else if(a===h&&b===h.childNodes.length)for(l in e=x,f)f.hasOwnProperty(l)&&(a=f[l],a.steps>e.steps&&(e=a));else if(e=c(a.childNodes.item(b)||a),!e)for(d.setUnfilteredPosition(a,b);!e&&d.previousNode();)e=c(d.getCurrentNode());e=e||x;void 0!==t&&e.steps>t&&(e=r(t));e.setIteratorPosition(d);return e.steps};this.damageCacheAfterStep=function(a){0>
a&&(a=0);void 0===t?t=a:a<t&&(t=a);s()};(function(){var a=q(h)||e(h);x=new n(a,0,h);s=ops.StepsCache.ENABLE_CACHE_VERIFICATION?k:function(){}})()};ops.StepsCache.ENABLE_CACHE_VERIFICATION=!1;ops.StepsCache.Bookmark=function(){};ops.StepsCache.Bookmark.prototype.setIteratorPosition=function(h){}})();
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
(function(){ops.StepsTranslator=function(m,h,b,g){function d(){var a=m();a!==p&&(runtime.log("Undo detected. Resetting steps cache"),p=a,k=new ops.StepsCache(p,b,g),e=h(p))}function n(a,c){if(!c||b.acceptPosition(a)===r)return!0;for(;a.previousPosition();)if(b.acceptPosition(a)===r){if(c(0,a.container(),a.unfilteredDomOffset()))return!0;break}for(;a.nextPosition();)if(b.acceptPosition(a)===r){if(c(1,a.container(),a.unfilteredDomOffset()))return!0;break}return!1}var p=m(),k=new ops.StepsCache(p,b,
g),q=new core.DomUtils,e=h(m()),r=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.convertStepsToDomPoint=function(a){var c,l;if(isNaN(a))throw new TypeError("Requested steps is not numeric ("+a+")");if(0>a)throw new RangeError("Requested steps is negative ("+a+")");d();for(c=k.setToClosestStep(a,e);c<a&&e.nextPosition();)(l=b.acceptPosition(e)===r)&&(c+=1),k.updateCache(c,e,l);if(c!==a)throw new RangeError("Requested steps ("+a+") exceeds available steps ("+c+")");return{node:e.container(),offset:e.unfilteredDomOffset()}};
this.convertDomPointToSteps=function(a,c,l){var f;d();q.containsNode(p,a)||(c=0>q.comparePoints(p,0,a,c),a=p,c=c?0:p.childNodes.length);e.setUnfilteredPosition(a,c);n(e,l)||e.setUnfilteredPosition(a,c);l=e.container();c=e.unfilteredDomOffset();a=k.setToClosestDomPoint(l,c,e);if(0>q.comparePoints(e.container(),e.unfilteredDomOffset(),l,c))return 0<a?a-1:a;for(;(e.container()!==l||e.unfilteredDomOffset()!==c)&&e.nextPosition();)(f=b.acceptPosition(e)===r)&&(a+=1),k.updateCache(a,e,f);return a+0};this.prime=
function(){var a,c;d();for(a=k.setToClosestStep(0,e);e.nextPosition();)(c=b.acceptPosition(e)===r)&&(a+=1),k.updateCache(a,e,c)};this.handleStepsInserted=function(a){d();k.damageCacheAfterStep(a.position)};this.handleStepsRemoved=function(a){d();k.damageCacheAfterStep(a.position-1)}};ops.StepsTranslator.PREVIOUS_STEP=0;ops.StepsTranslator.NEXT_STEP=1;return ops.StepsTranslator})();
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
ops.TextPositionFilter=function(m){function h(d,g,e){var h,a;if(g){if(b.isInlineRoot(g)&&b.isGroupingElement(e))return p;h=b.lookLeftForCharacter(g);if(1===h||2===h&&(b.scanRightForAnyCharacter(e)||b.scanRightForAnyCharacter(b.nextNode(d))))return n}h=null===g&&b.isParagraph(d);a=b.lookRightForCharacter(e);if(h)return a?n:b.scanRightForAnyCharacter(e)?p:n;if(!a)return p;g=g||b.previousNode(d);return b.scanLeftForAnyCharacter(g)?p:n}var b=new odf.OdfUtils,g=Node.ELEMENT_NODE,d=Node.TEXT_NODE,n=core.PositionFilter.FilterResult.FILTER_ACCEPT,
p=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(k){var q=k.container(),e=q.nodeType,r,a,c;if(e!==g&&e!==d)return p;if(e===d){if(!b.isGroupingElement(q.parentNode)||b.isWithinTrackedChanges(q.parentNode,m()))return p;e=k.unfilteredDomOffset();r=q.data;runtime.assert(e!==r.length,"Unexpected offset.");if(0<e){k=r[e-1];if(!b.isODFWhitespace(k))return n;if(1<e)if(k=r[e-2],!b.isODFWhitespace(k))a=n;else{if(!b.isODFWhitespace(r.substr(0,e)))return p}else c=b.previousNode(q),
b.scanLeftForNonSpace(c)&&(a=n);if(a===n)return b.isTrailingWhitespace(q,e)?p:n;a=r[e];return b.isODFWhitespace(a)?p:b.scanLeftForAnyCharacter(b.previousNode(q))?p:n}c=k.leftNode();a=q;q=q.parentNode;a=h(q,c,a)}else!b.isGroupingElement(q)||b.isWithinTrackedChanges(q,m())?a=p:(c=k.leftNode(),a=k.rightNode(),a=h(q,c,a));return a}};
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
ops.OdtDocument=function(m){function h(){var a=m.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"' for OdtDocument");return a}function b(){return a.getDocumentElement().ownerDocument}function g(a){for(;a&&!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}function d(a){this.acceptPosition=function(b){b=b.container();var c;
c="string"===typeof a?f[a].getNode():a;return g(b)===g(c)?z:x}}function n(a,b,c,d){d=gui.SelectionMover.createPositionIterator(d);var f;1===c.length?f=c[0]:(f=new core.PositionFilterChain,c.forEach(f.addFilter));c=new core.StepIterator(f,d);c.setPosition(a,b);return c}function p(a){var b=gui.SelectionMover.createPositionIterator(h());a=u.convertStepsToDomPoint(a);b.setUnfilteredPosition(a.node,a.offset);return b}function k(a){return c.getParagraphElement(a)}function q(a,b){return m.getFormatting().getStyleElement(a,
b)}function e(a){return q(a,"paragraph")}function r(a,b,c){a=a.childNodes.item(b)||a;return(a=k(a))&&l.containsNode(c,a)?a:c}var a=this,c,l,f={},v={},w=new core.EventNotifier([ops.Document.signalMemberAdded,ops.Document.signalMemberUpdated,ops.Document.signalMemberRemoved,ops.Document.signalCursorAdded,ops.Document.signalCursorRemoved,ops.Document.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonStyleCreated,ops.OdtDocument.signalCommonStyleDeleted,
ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationStart,ops.OdtDocument.signalOperationEnd,ops.OdtDocument.signalProcessingBatchStart,ops.OdtDocument.signalProcessingBatchEnd,ops.OdtDocument.signalUndoStackChanged,ops.OdtDocument.signalStepsInserted,ops.OdtDocument.signalStepsRemoved]),z=core.PositionFilter.FilterResult.FILTER_ACCEPT,x=core.PositionFilter.FilterResult.FILTER_REJECT,t,u,s;this.getDocumentElement=function(){return m.odfContainer().rootElement};this.getDOMDocument=function(){return this.getDocumentElement().ownerDocument};
this.cloneDocumentElement=function(){var b=a.getDocumentElement(),c=m.getAnnotationViewManager();c&&c.forgetAnnotations();b=b.cloneNode(!0);m.refreshAnnotations();return b};this.setDocumentElement=function(a){var b=m.odfContainer();b.setRootElement(a);m.setOdfContainer(b,!0);m.refreshCSS()};this.getDOMDocument=b;this.getRootElement=g;this.createStepIterator=n;this.getIteratorAtPosition=p;this.convertDomPointToCursorStep=function(a,b,c){return u.convertDomPointToSteps(a,b,c)};this.convertDomToCursorRange=
function(a,b){var c,d;c=b&&b(a.anchorNode,a.anchorOffset);c=u.convertDomPointToSteps(a.anchorNode,a.anchorOffset,c);b||a.anchorNode!==a.focusNode||a.anchorOffset!==a.focusOffset?(d=b&&b(a.focusNode,a.focusOffset),d=u.convertDomPointToSteps(a.focusNode,a.focusOffset,d)):d=c;return{position:c,length:d-c}};this.convertCursorToDomRange=function(a,c){var d=b().createRange(),f,e;f=u.convertStepsToDomPoint(a);c?(e=u.convertStepsToDomPoint(a+c),0<c?(d.setStart(f.node,f.offset),d.setEnd(e.node,e.offset)):
(d.setStart(e.node,e.offset),d.setEnd(f.node,f.offset))):d.setStart(f.node,f.offset);return d};this.getStyleElement=q;this.upgradeWhitespacesAtPosition=function(a){a=p(a);var b,d,f;a.previousPosition();a.previousPosition();for(f=-1;1>=f;f+=1){b=a.container();d=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[d]&&c.isSignificantWhitespace(b,d)){runtime.assert(" "===b.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var e=b.ownerDocument.createElementNS(odf.Namespaces.textns,
"text:s"),l=b.parentNode,g=b;e.appendChild(b.ownerDocument.createTextNode(" "));1===b.length?l.replaceChild(e,b):(b.deleteData(d,1),0<d&&(d<b.length&&b.splitText(d),g=b.nextSibling),l.insertBefore(e,g));b=e;a.moveToEndOfNode(b)}a.nextPosition()}};this.downgradeWhitespacesAtPosition=function(a){var b=p(a),d;a=b.container();for(b=b.unfilteredDomOffset();!c.isSpaceElement(a)&&a.childNodes.item(b);)a=a.childNodes.item(b),b=0;a.nodeType===Node.TEXT_NODE&&(a=a.parentNode);c.isDowngradableSpaceElement(a)&&
(b=a.firstChild,d=a.lastChild,l.mergeIntoParent(a),d!==b&&l.normalizeTextNodes(d),l.normalizeTextNodes(b))};this.getParagraphStyleElement=e;this.getParagraphElement=k;this.getParagraphStyleAttributes=function(a){return(a=e(a))?m.getFormatting().getInheritedStyleAttributes(a,!1):null};this.getTextNodeAtStep=function(c,d){var e=p(c),l=e.container(),g,k=0,h=null;l.nodeType===Node.TEXT_NODE?(g=l,k=e.unfilteredDomOffset(),0<g.length&&(0<k&&(g=g.splitText(k)),g.parentNode.insertBefore(b().createTextNode(""),
g),g=g.previousSibling,k=0)):(g=b().createTextNode(""),k=0,l.insertBefore(g,e.rightNode()));if(d){if(f[d]&&a.getCursorPosition(d)===c){for(h=f[d].getNode();h.nextSibling&&"cursor"===h.nextSibling.localName;)h.parentNode.insertBefore(h.nextSibling,h);0<g.length&&g.nextSibling!==h&&(g=b().createTextNode(""),k=0);h.parentNode.insertBefore(g,h)}}else for(;g.nextSibling&&"cursor"===g.nextSibling.localName;)g.parentNode.insertBefore(g.nextSibling,g);for(;g.previousSibling&&g.previousSibling.nodeType===
Node.TEXT_NODE;)e=g.previousSibling,e.appendData(g.data),k=e.length,g=e,g.parentNode.removeChild(g.nextSibling);for(;g.nextSibling&&g.nextSibling.nodeType===Node.TEXT_NODE;)e=g.nextSibling,g.appendData(e.data),g.parentNode.removeChild(e);return{textNode:g,offset:k}};this.fixCursorPositions=function(){Object.keys(f).forEach(function(b){var c=f[b],d=g(c.getNode()),e=a.createRootFilter(d),l,k,h,m=!1;h=c.getSelectedRange();l=r(h.startContainer,h.startOffset,d);k=n(h.startContainer,h.startOffset,[t,e],
l);h.collapsed?d=k:(l=r(h.endContainer,h.endOffset,d),d=n(h.endContainer,h.endOffset,[t,e],l));k.isStep()&&d.isStep()?k.container()!==d.container()||k.offset()!==d.offset()||h.collapsed&&c.getAnchorNode()===c.getNode()||(m=!0,h.setStart(k.container(),k.offset()),h.collapse(!0)):(m=!0,runtime.assert(k.roundToClosestStep(),"No walkable step found for cursor owned by "+b),h.setStart(k.container(),k.offset()),runtime.assert(d.roundToClosestStep(),"No walkable step found for cursor owned by "+b),h.setEnd(d.container(),
d.offset()));m&&(c.setSelectedRange(h,c.hasForwardSelection()),a.emit(ops.Document.signalCursorMoved,c))})};this.getCursorPosition=function(a){return(a=f[a])?u.convertDomPointToSteps(a.getNode(),0):0};this.getCursorSelection=function(a){a=f[a];var b=0,c=0;a&&(b=u.convertDomPointToSteps(a.getNode(),0),c=u.convertDomPointToSteps(a.getAnchorNode(),0));return{position:c,length:b-c}};this.getPositionFilter=function(){return t};this.getOdfCanvas=function(){return m};this.getCanvas=function(){return m};
this.getRootNode=h;this.addMember=function(a){runtime.assert(void 0===v[a.getMemberId()],"This member already exists");v[a.getMemberId()]=a};this.getMember=function(a){return v.hasOwnProperty(a)?v[a]:null};this.removeMember=function(a){delete v[a]};this.getCursor=function(a){return f[a]};this.getMemberIds=function(){var a=[],b;for(b in f)f.hasOwnProperty(b)&&a.push(f[b].getMemberId());return a};this.addCursor=function(b){runtime.assert(Boolean(b),"OdtDocument::addCursor without cursor");var c=b.getMemberId(),
d=a.convertCursorToDomRange(0,0);runtime.assert("string"===typeof c,"OdtDocument::addCursor has cursor without memberid");runtime.assert(!f[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);b.setSelectedRange(d,!0);f[c]=b};this.removeCursor=function(b){var c=f[b];return c?(c.removeFromDocument(),delete f[b],a.emit(ops.Document.signalCursorRemoved,b),!0):!1};this.moveCursor=function(b,c,d,e){b=f[b];c=a.convertCursorToDomRange(c,d);b&&(b.setSelectedRange(c,0<=d),b.setSelectionType(e||
ops.OdtCursor.RangeSelection))};this.getFormatting=function(){return m.getFormatting()};this.emit=function(a,b){w.emit(a,b)};this.subscribe=function(a,b){w.subscribe(a,b)};this.unsubscribe=function(a,b){w.unsubscribe(a,b)};this.createRootFilter=function(a){return new d(a)};this.close=function(a){a()};this.destroy=function(a){a()};t=new ops.TextPositionFilter(h);c=new odf.OdfUtils;l=new core.DomUtils;u=new ops.StepsTranslator(h,gui.SelectionMover.createPositionIterator,t,500);w.subscribe(ops.OdtDocument.signalStepsInserted,
u.handleStepsInserted);w.subscribe(ops.OdtDocument.signalStepsRemoved,u.handleStepsRemoved);w.subscribe(ops.OdtDocument.signalOperationEnd,function(b){var c=b.spec(),d=c.memberid,c=(new Date(c.timestamp)).toISOString(),f=m.odfContainer();b.isEdit&&(d=a.getMember(d).getProperties().fullName,f.setMetadata({"dc:creator":d,"dc:date":c},null),s||(f.incrementEditingCycles(),f.setMetadata(null,["meta:editing-duration","meta:document-statistic"])),s=b)})};ops.OdtDocument.signalParagraphChanged="paragraph/changed";
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
ops.OpAddAnnotation=function(){function m(b,d,e){var g=b.getTextNodeAtStep(e,h);g&&(b=g.textNode,e=b.parentNode,g.offset!==b.length&&b.splitText(g.offset),e.insertBefore(d,b.nextSibling),0===b.length&&e.removeChild(b))}var h,b,g,d,n,p;this.init=function(k){h=k.memberid;b=parseInt(k.timestamp,10);g=parseInt(k.position,10);d=parseInt(k.length,10)||0;n=k.name};this.isEdit=!0;this.group=void 0;this.execute=function(k){var q=k.getCursor(h),e,r;r=new core.DomUtils;p=k.getDOMDocument();var a=new Date(b),
c,l,f,v;c=p.createElementNS(odf.Namespaces.officens,"office:annotation");c.setAttributeNS(odf.Namespaces.officens,"office:name",n);e=p.createElementNS(odf.Namespaces.dcns,"dc:creator");e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h);e.textContent=k.getMember(h).getProperties().fullName;l=p.createElementNS(odf.Namespaces.dcns,"dc:date");l.appendChild(p.createTextNode(a.toISOString()));a=p.createElementNS(odf.Namespaces.textns,"text:list");f=p.createElementNS(odf.Namespaces.textns,
"text:list-item");v=p.createElementNS(odf.Namespaces.textns,"text:p");f.appendChild(v);a.appendChild(f);c.appendChild(e);c.appendChild(l);c.appendChild(a);d&&(e=p.createElementNS(odf.Namespaces.officens,"office:annotation-end"),e.setAttributeNS(odf.Namespaces.officens,"office:name",n),c.annotationEndElement=e,m(k,e,g+d));m(k,c,g);k.emit(ops.OdtDocument.signalStepsInserted,{position:g,length:d});q&&(e=p.createRange(),r=r.getElementsByTagNameNS(c,odf.Namespaces.textns,"p")[0],e.selectNodeContents(r),
q.setSelectedRange(e,!1),k.emit(ops.Document.signalCursorMoved,q));k.getOdfCanvas().addAnnotation(c);k.fixCursorPositions();return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:h,timestamp:b,position:g,length:d,name:n}}};
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
ops.OpAddStyle=function(){var m,h,b,g,d,n,p=odf.Namespaces.stylens;this.init=function(k){m=k.memberid;h=k.timestamp;b=k.styleName;g=k.styleFamily;d="true"===k.isAutomaticStyle||!0===k.isAutomaticStyle;n=k.setProperties};this.isEdit=!0;this.group=void 0;this.execute=function(k){var h=k.getOdfCanvas().odfContainer(),e=k.getFormatting(),m=k.getDOMDocument().createElementNS(p,"style:style");if(!m)return!1;n&&e.updateStyle(m,n);m.setAttributeNS(p,"style:family",g);m.setAttributeNS(p,"style:name",b);d?
h.rootElement.automaticStyles.appendChild(m):h.rootElement.styles.appendChild(m);k.getOdfCanvas().refreshCSS();d||k.emit(ops.OdtDocument.signalCommonStyleCreated,{name:b,family:g});return!0};this.spec=function(){return{optype:"AddStyle",memberid:m,timestamp:h,styleName:b,styleFamily:g,isAutomaticStyle:d,setProperties:n}}};
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
odf.ObjectNameGenerator=function(m,h){function b(a,b){var c={};this.generateName=function(){var d=b(),e=0,g;do g=a+e,e+=1;while(c[g]||d[g]);c[g]=!0;return g}}function g(){var a={};[m.rootElement.automaticStyles,m.rootElement.styles].forEach(function(b){for(b=b.firstElementChild;b;)b.namespaceURI===d&&"style"===b.localName&&(a[b.getAttributeNS(d,"name")]=!0),b=b.nextElementSibling});return a}var d=odf.Namespaces.stylens,n=odf.Namespaces.drawns,p=odf.Namespaces.xlinkns,k=new core.DomUtils,q=(new core.Utils).hashString(h),
e=null,r=null,a=null,c={},l={};this.generateStyleName=function(){null===e&&(e=new b("auto"+q+"_",function(){return g()}));return e.generateName()};this.generateFrameName=function(){null===r&&(k.getElementsByTagNameNS(m.rootElement.body,n,"frame").forEach(function(a){c[a.getAttributeNS(n,"name")]=!0}),r=new b("fr"+q+"_",function(){return c}));return r.generateName()};this.generateImageName=function(){null===a&&(k.getElementsByTagNameNS(m.rootElement.body,n,"image").forEach(function(a){a=a.getAttributeNS(p,
"href");a=a.substring(9,a.lastIndexOf("."));l[a]=!0}),a=new b("img"+q+"_",function(){return l}));return a.generateName()}};
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
odf.TextStyleApplicator=function(m,h,b){function g(b){function d(a,b){return"object"===typeof a&&"object"===typeof b?Object.keys(a).every(function(e){return d(a[e],b[e])}):a===b}var a={};this.isStyleApplied=function(c){c=h.getAppliedStylesForElement(c,a);return d(b,c)}}function d(d){var g={};this.applyStyleToContainer=function(a){var c;c=a.getAttributeNS(k,"style-name");var l=a.ownerDocument;c=c||"";if(!g.hasOwnProperty(c)){var f=c,n;n=c?h.createDerivedStyleObject(c,"text",d):d;l=l.createElementNS(q,
"style:style");h.updateStyle(l,n);l.setAttributeNS(q,"style:name",m.generateStyleName());l.setAttributeNS(q,"style:family","text");l.setAttributeNS("urn:webodf:names:scope","scope","document-content");b.appendChild(l);g[f]=l}c=g[c].getAttributeNS(q,"name");a.setAttributeNS(k,"text:style-name",c)}}function n(b,d){var a=b.ownerDocument,c=b.parentNode,g,f,h=new core.LoopWatchDog(1E4);f=[];"span"!==c.localName||c.namespaceURI!==k?(g=a.createElementNS(k,"text:span"),c.insertBefore(g,b),c=!1):(b.previousSibling&&
!p.rangeContainsNode(d,c.firstChild)?(g=c.cloneNode(!1),c.parentNode.insertBefore(g,c.nextSibling)):g=c,c=!0);f.push(b);for(a=b.nextSibling;a&&p.rangeContainsNode(d,a);)h.check(),f.push(a),a=a.nextSibling;f.forEach(function(a){a.parentNode!==g&&g.appendChild(a)});if(a&&c)for(f=g.cloneNode(!1),g.parentNode.insertBefore(f,g.nextSibling);a;)h.check(),c=a.nextSibling,f.appendChild(a),a=c;return g}var p=new core.DomUtils,k=odf.Namespaces.textns,q=odf.Namespaces.stylens;this.applyStyle=function(b,k,a){var c=
{},l,f,h,m;runtime.assert(a&&a.hasOwnProperty("style:text-properties"),"applyStyle without any text properties");c["style:text-properties"]=a["style:text-properties"];h=new d(c);m=new g(c);b.forEach(function(a){l=m.isStyleApplied(a);!1===l&&(f=n(a,k),h.applyStyleToContainer(f))})}};
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
ops.OpApplyDirectStyling=function(){function m(b,d,g){var a=b.getOdfCanvas().odfContainer(),c=k.splitBoundaries(d),l=p.getTextNodes(d,!1);d={startContainer:d.startContainer,startOffset:d.startOffset,endContainer:d.endContainer,endOffset:d.endOffset};(new odf.TextStyleApplicator(new odf.ObjectNameGenerator(a,h),b.getFormatting(),a.rootElement.automaticStyles)).applyStyle(l,d,g);c.forEach(k.normalizeTextNodes)}var h,b,g,d,n,p=new odf.OdfUtils,k=new core.DomUtils;this.init=function(k){h=k.memberid;b=
k.timestamp;g=parseInt(k.position,10);d=parseInt(k.length,10);n=k.setProperties};this.isEdit=!0;this.group=void 0;this.execute=function(k){var e=k.convertCursorToDomRange(g,d),r=p.getParagraphElements(e);m(k,e,n);e.detach();k.getOdfCanvas().refreshCSS();k.fixCursorPositions();r.forEach(function(a){k.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:h,timeStamp:b})});k.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:h,
timestamp:b,position:g,length:d,setProperties:n}}};
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
ops.OpApplyHyperlink=function(){function m(b){for(;b;){if(k.isHyperlink(b))return!0;b=b.parentNode}return!1}var h,b,g,d,n,p=new core.DomUtils,k=new odf.OdfUtils;this.init=function(k){h=k.memberid;b=k.timestamp;g=k.position;d=k.length;n=k.hyperlink};this.isEdit=!0;this.group=void 0;this.execute=function(q){var e=q.getDOMDocument(),r=q.convertCursorToDomRange(g,d),a=p.splitBoundaries(r),c=[],l=k.getTextNodes(r,!1);if(0===l.length)return!1;l.forEach(function(a){var b=k.getParagraphElement(a);runtime.assert(!1===
m(a),"The given range should not contain any link.");var d=n,g=e.createElementNS(odf.Namespaces.textns,"text:a");g.setAttributeNS(odf.Namespaces.xlinkns,"xlink:type","simple");g.setAttributeNS(odf.Namespaces.xlinkns,"xlink:href",d);a.parentNode.insertBefore(g,a);g.appendChild(a);-1===c.indexOf(b)&&c.push(b)});a.forEach(p.normalizeTextNodes);r.detach();q.getOdfCanvas().refreshSize();q.getOdfCanvas().rerenderAnnotations();c.forEach(function(a){q.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,
memberId:h,timeStamp:b})});return!0};this.spec=function(){return{optype:"ApplyHyperlink",memberid:h,timestamp:b,position:g,length:d,hyperlink:n}}};
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
ops.OpInsertImage=function(){var m,h,b,g,d,n,p,k,q=odf.Namespaces.drawns,e=odf.Namespaces.svgns,r=odf.Namespaces.textns,a=odf.Namespaces.xlinkns;this.init=function(a){m=a.memberid;h=a.timestamp;b=a.position;g=a.filename;d=a.frameWidth;n=a.frameHeight;p=a.frameStyleName;k=a.frameName};this.isEdit=!0;this.group=void 0;this.execute=function(c){var l=c.getOdfCanvas(),f=c.getTextNodeAtStep(b,m),v,w;if(!f)return!1;v=f.textNode;w=c.getParagraphElement(v);var f=f.offset!==v.length?v.splitText(f.offset):v.nextSibling,
z=c.getDOMDocument(),x=z.createElementNS(q,"draw:image"),z=z.createElementNS(q,"draw:frame");x.setAttributeNS(a,"xlink:href",g);x.setAttributeNS(a,"xlink:type","simple");x.setAttributeNS(a,"xlink:show","embed");x.setAttributeNS(a,"xlink:actuate","onLoad");z.setAttributeNS(q,"draw:style-name",p);z.setAttributeNS(q,"draw:name",k);z.setAttributeNS(r,"text:anchor-type","as-char");z.setAttributeNS(e,"svg:width",d);z.setAttributeNS(e,"svg:height",n);z.appendChild(x);v.parentNode.insertBefore(z,f);c.emit(ops.OdtDocument.signalStepsInserted,
{position:b,length:1});0===v.length&&v.parentNode.removeChild(v);l.addCssForFrameWithImage(z);l.refreshCSS();c.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:w,memberId:m,timeStamp:h});l.rerenderAnnotations();return!0};this.spec=function(){return{optype:"InsertImage",memberid:m,timestamp:h,filename:g,position:b,frameWidth:d,frameHeight:n,frameStyleName:p,frameName:k}}};
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
ops.OpInsertTable=function(){function m(b,a){var c;if(1===e.length)c=e[0];else if(3===e.length)switch(b){case 0:c=e[0];break;case g-1:c=e[2];break;default:c=e[1]}else c=e[b];if(1===c.length)return c[0];if(3===c.length)switch(a){case 0:return c[0];case d-1:return c[2];default:return c[1]}return c[a]}var h,b,g,d,n,p,k,q,e;this.init=function(m){h=m.memberid;b=m.timestamp;n=m.position;g=m.initialRows;d=m.initialColumns;p=m.tableName;k=m.tableStyleName;q=m.tableColumnStyleName;e=m.tableCellStyleMatrix};
this.isEdit=!0;this.group=void 0;this.execute=function(e){var a=e.getTextNodeAtStep(n),c=e.getRootNode();if(a){var l=e.getDOMDocument(),f=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),v=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),w,z,x,t;k&&f.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",k);p&&f.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",p);v.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:number-columns-repeated",d);q&&v.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",q);f.appendChild(v);for(x=0;x<g;x+=1){v=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(t=0;t<d;t+=1)w=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(z=m(x,t))&&w.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",z),z=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"text:p"),w.appendChild(z),v.appendChild(w);f.appendChild(v)}a=e.getParagraphElement(a.textNode);c.insertBefore(f,a.nextSibling);e.emit(ops.OdtDocument.signalStepsInserted,{position:n,length:d*g+1});e.getOdfCanvas().refreshSize();e.emit(ops.OdtDocument.signalTableAdded,{tableElement:f,memberId:h,timeStamp:b});e.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:h,timestamp:b,position:n,initialRows:g,initialColumns:d,tableName:p,tableStyleName:k,
tableColumnStyleName:q,tableCellStyleMatrix:e}}};
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
ops.OpInsertText=function(){var m,h,b,g,d;this.init=function(n){m=n.memberid;h=n.timestamp;b=n.position;d=n.text;g="true"===n.moveCursor||!0===n.moveCursor};this.isEdit=!0;this.group=void 0;this.execute=function(n){var p,k,q,e=null,r=n.getDOMDocument(),a,c=0,l,f=n.getCursor(m),v;n.upgradeWhitespacesAtPosition(b);if(p=n.getTextNodeAtStep(b)){k=p.textNode;e=k.nextSibling;q=k.parentNode;a=n.getParagraphElement(k);for(v=0;v<d.length;v+=1)if(" "===d[v]&&(0===v||v===d.length-1||" "===d[v-1])||"\t"===d[v])0===
c?(p.offset!==k.length&&(e=k.splitText(p.offset)),0<v&&k.appendData(d.substring(0,v))):c<v&&(c=d.substring(c,v),q.insertBefore(r.createTextNode(c),e)),c=v+1,l=" "===d[v]?"text:s":"text:tab",l=r.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",l),l.appendChild(r.createTextNode(d[v])),q.insertBefore(l,e);0===c?k.insertData(p.offset,d):c<d.length&&(p=d.substring(c),q.insertBefore(r.createTextNode(p),e));q=k.parentNode;e=k.nextSibling;q.removeChild(k);q.insertBefore(k,e);0===k.length&&
k.parentNode.removeChild(k);n.emit(ops.OdtDocument.signalStepsInserted,{position:b,length:d.length});f&&g&&(n.moveCursor(m,b+d.length,0),n.emit(ops.Document.signalCursorMoved,f));0<b&&(1<b&&n.downgradeWhitespacesAtPosition(b-2),n.downgradeWhitespacesAtPosition(b-1));n.downgradeWhitespacesAtPosition(b);n.downgradeWhitespacesAtPosition(b+d.length-1);n.downgradeWhitespacesAtPosition(b+d.length);n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,
timeStamp:h});n.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:m,timestamp:h,position:b,text:d,moveCursor:g}}};
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
ops.OpMoveCursor=function(){var m,h,b,g,d;this.init=function(n){m=n.memberid;h=n.timestamp;b=n.position;g=n.length||0;d=n.selectionType||ops.OdtCursor.RangeSelection};this.isEdit=!1;this.group=void 0;this.execute=function(h){var p=h.getCursor(m),k;if(!p)return!1;k=h.convertCursorToDomRange(b,g);p.setSelectedRange(k,0<=g);p.setSelectionType(d);h.emit(ops.Document.signalCursorMoved,p);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:m,timestamp:h,position:b,length:g,selectionType:d}}};
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
ops.OpRemoveAnnotation=function(){var m,h,b,g,d;this.init=function(n){m=n.memberid;h=n.timestamp;b=parseInt(n.position,10);g=parseInt(n.length,10);d=new core.DomUtils};this.isEdit=!0;this.group=void 0;this.execute=function(h){function m(b){q.parentNode.insertBefore(b,q)}for(var k=h.getIteratorAtPosition(b).container(),q;k.namespaceURI!==odf.Namespaces.officens||"annotation"!==k.localName;)k=k.parentNode;if(null===k)return!1;q=k;k=q.annotationEndElement;h.getOdfCanvas().forgetAnnotations();d.getElementsByTagNameNS(q,
"urn:webodf:names:cursor","cursor").forEach(m);d.getElementsByTagNameNS(q,"urn:webodf:names:cursor","anchor").forEach(m);q.parentNode.removeChild(q);k&&k.parentNode.removeChild(k);h.emit(ops.OdtDocument.signalStepsRemoved,{position:0<b?b-1:b,length:g});h.fixCursorPositions();h.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:m,timestamp:h,position:b,length:g}}};
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
ops.OpRemoveHyperlink=function(){var m,h,b,g,d=new core.DomUtils,n=new odf.OdfUtils;this.init=function(d){m=d.memberid;h=d.timestamp;b=d.position;g=d.length};this.isEdit=!0;this.group=void 0;this.execute=function(p){var k=p.convertCursorToDomRange(b,g),q=n.getHyperlinkElements(k);runtime.assert(1===q.length,"The given range should only contain a single link.");q=d.mergeIntoParent(q[0]);k.detach();p.getOdfCanvas().refreshSize();p.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:n.getParagraphElement(q),
memberId:m,timeStamp:h});p.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveHyperlink",memberid:m,timestamp:h,position:b,length:g}}};
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
ops.OpRemoveText=function(){function m(b){function d(a){return k.hasOwnProperty(a.namespaceURI)||"br"===a.localName&&n.isLineBreak(a.parentNode)||a.nodeType===Node.TEXT_NODE&&k.hasOwnProperty(a.parentNode.namespaceURI)}function g(a){if(n.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(k.hasOwnProperty(a.namespaceURI)||!g(a))return!1;a=a.nextSibling}return!0}function a(c){var l;c.nodeType===Node.TEXT_NODE?(l=c.parentNode,l.removeChild(c)):
l=p.removeUnwantedNodes(c,d);return l&&!n.isParagraph(l)&&l!==b&&g(l)?a(l):l}this.isEmpty=g;this.mergeChildrenIntoParent=a}var h,b,g,d,n,p,k={};this.init=function(m){runtime.assert(0<=m.length,"OpRemoveText only supports positive lengths");h=m.memberid;b=m.timestamp;g=parseInt(m.position,10);d=parseInt(m.length,10);n=new odf.OdfUtils;p=new core.DomUtils;k[odf.Namespaces.dbns]=!0;k[odf.Namespaces.dcns]=!0;k[odf.Namespaces.dr3dns]=!0;k[odf.Namespaces.drawns]=!0;k[odf.Namespaces.chartns]=!0;k[odf.Namespaces.formns]=
!0;k[odf.Namespaces.numberns]=!0;k[odf.Namespaces.officens]=!0;k[odf.Namespaces.presentationns]=!0;k[odf.Namespaces.stylens]=!0;k[odf.Namespaces.svgns]=!0;k[odf.Namespaces.tablens]=!0;k[odf.Namespaces.textns]=!0};this.isEdit=!0;this.group=void 0;this.execute=function(k){var e,r,a,c,l=k.getCursor(h),f=new m(k.getRootNode());k.upgradeWhitespacesAtPosition(g);k.upgradeWhitespacesAtPosition(g+d);r=k.convertCursorToDomRange(g,d);p.splitBoundaries(r);e=k.getParagraphElement(r.startContainer);a=n.getTextElements(r,
!1,!0);c=n.getParagraphElements(r);r.detach();a.forEach(function(a){a.parentNode?f.mergeChildrenIntoParent(a):runtime.log("WARN: text element has already been removed from it's container")});r=c.reduce(function(a,b){var c,d=a,e=b,g,l=null;f.isEmpty(a)&&(b.parentNode!==a.parentNode&&(g=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),e=a,d=b,l=d.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo").item(0)||d.firstChild);for(;e.firstChild;)c=e.firstChild,e.removeChild(c),"editinfo"!==
c.localName&&d.insertBefore(c,l);g&&f.isEmpty(g)&&f.mergeChildrenIntoParent(g);f.mergeChildrenIntoParent(e);return d});k.emit(ops.OdtDocument.signalStepsRemoved,{position:g,length:d});k.downgradeWhitespacesAtPosition(g);k.fixCursorPositions();k.getOdfCanvas().refreshSize();k.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:r||e,memberId:h,timeStamp:b});l&&(l.resetSelectionType(),k.emit(ops.Document.signalCursorMoved,l));k.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",
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
ops.OpSetBlob=function(){var m,h,b,g,d;this.init=function(n){m=n.memberid;h=n.timestamp;b=n.filename;g=n.mimetype;d=n.content};this.isEdit=!0;this.group=void 0;this.execute=function(h){h.getOdfCanvas().odfContainer().setBlob(b,g,d);return!0};this.spec=function(){return{optype:"SetBlob",memberid:m,timestamp:h,filename:b,mimetype:g,content:d}}};
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
ops.OpSetParagraphStyle=function(){var m,h,b,g;this.init=function(d){m=d.memberid;h=d.timestamp;b=d.position;g=d.styleName};this.isEdit=!0;this.group=void 0;this.execute=function(d){var n;n=d.getIteratorAtPosition(b);return(n=d.getParagraphElement(n.container()))?(""!==g?n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",g):n.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","style-name"),d.getOdfCanvas().refreshSize(),d.emit(ops.OdtDocument.signalParagraphChanged,
{paragraphElement:n,timeStamp:h,memberId:m}),d.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:m,timestamp:h,position:b,styleName:g}}};
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
ops.OpSplitParagraph=function(){var m,h,b,g,d;this.init=function(n){m=n.memberid;h=n.timestamp;b=n.position;g="true"===n.moveCursor||!0===n.moveCursor;d=new odf.OdfUtils};this.isEdit=!0;this.group=void 0;this.execute=function(n){var p,k,q,e,r,a,c,l=n.getCursor(m);n.upgradeWhitespacesAtPosition(b);p=n.getTextNodeAtStep(b);if(!p)return!1;k=n.getParagraphElement(p.textNode);if(!k)return!1;q=d.isListItem(k.parentNode)?k.parentNode:k;0===p.offset?(c=p.textNode.previousSibling,a=null):(c=p.textNode,a=p.offset>=
p.textNode.length?null:p.textNode.splitText(p.offset));for(e=p.textNode;e!==q;){e=e.parentNode;r=e.cloneNode(!1);a&&r.appendChild(a);if(c)for(;c&&c.nextSibling;)r.appendChild(c.nextSibling);else for(;e.firstChild;)r.appendChild(e.firstChild);e.parentNode.insertBefore(r,e.nextSibling);c=e;a=r}d.isListItem(a)&&(a=a.childNodes.item(0));0===p.textNode.length&&p.textNode.parentNode.removeChild(p.textNode);n.emit(ops.OdtDocument.signalStepsInserted,{position:b,length:1});l&&g&&(n.moveCursor(m,b+1,0),n.emit(ops.Document.signalCursorMoved,
l));n.fixCursorPositions();n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:m,timeStamp:h});n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,timeStamp:h});n.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:m,timestamp:h,position:b,moveCursor:g}}};
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
ops.OpUpdateMember=function(){function m(b){var d="//dc:creator[@editinfo:memberid='"+h+"']";b=xmldom.XPath.getODFElementsWithXPath(b.getRootNode(),d,function(b){return"editinfo"===b?"urn:webodf:names:editinfo":odf.Namespaces.lookupNamespaceURI(b)});for(d=0;d<b.length;d+=1)b[d].textContent=g.fullName}var h,b,g,d;this.init=function(m){h=m.memberid;b=parseInt(m.timestamp,10);g=m.setProperties;d=m.removedProperties};this.isEdit=!1;this.group=void 0;this.execute=function(b){var p=b.getMember(h);if(!p)return!1;
d&&p.removeProperties(d);g&&(p.setProperties(g),g.fullName&&m(b));b.emit(ops.Document.signalMemberUpdated,p);return!0};this.spec=function(){return{optype:"UpdateMember",memberid:h,timestamp:b,setProperties:g,removedProperties:d}}};
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
ops.OpUpdateParagraphStyle=function(){function m(b,d){var e,g,a=d?d.split(","):[];for(e=0;e<a.length;e+=1)g=a[e].split(":"),b.removeAttributeNS(odf.Namespaces.lookupNamespaceURI(g[0]),g[1])}var h,b,g,d,n,p=odf.Namespaces.stylens;this.init=function(k){h=k.memberid;b=k.timestamp;g=k.styleName;d=k.setProperties;n=k.removedProperties};this.isEdit=!0;this.group=void 0;this.execute=function(b){var h=b.getFormatting(),e,r,a;return(e=""!==g?b.getParagraphStyleElement(g):h.getDefaultStyleElement("paragraph"))?
(r=e.getElementsByTagNameNS(p,"paragraph-properties").item(0),a=e.getElementsByTagNameNS(p,"text-properties").item(0),d&&h.updateStyle(e,d),n&&(h=n["style:paragraph-properties"],r&&h&&(m(r,h.attributes),0===r.attributes.length&&e.removeChild(r)),h=n["style:text-properties"],a&&h&&(m(a,h.attributes),0===a.attributes.length&&e.removeChild(a)),m(e,n.attributes)),b.getOdfCanvas().refreshCSS(),b.emit(ops.OdtDocument.signalParagraphStyleModified,g),b.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=
function(){return{optype:"UpdateParagraphStyle",memberid:h,timestamp:b,styleName:g,setProperties:d,removedProperties:n}}};
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
ops.Session=function(m){function h(b){d.emit(ops.OdtDocument.signalProcessingBatchStart,b)}function b(b){d.emit(ops.OdtDocument.signalProcessingBatchEnd,b)}var g=new ops.OperationFactory,d=new ops.OdtDocument(m),n=null;this.setOperationFactory=function(b){g=b;n&&n.setOperationFactory(g)};this.setOperationRouter=function(m){n&&(n.unsubscribe(ops.OperationRouter.signalProcessingBatchStart,h),n.unsubscribe(ops.OperationRouter.signalProcessingBatchEnd,b));n=m;n.subscribe(ops.OperationRouter.signalProcessingBatchStart,
h);n.subscribe(ops.OperationRouter.signalProcessingBatchEnd,b);m.setPlaybackFunction(function(b){d.emit(ops.OdtDocument.signalOperationStart,b);return b.execute(d)?(d.emit(ops.OdtDocument.signalOperationEnd,b),!0):!1});m.setOperationFactory(g)};this.getOperationFactory=function(){return g};this.getOdtDocument=function(){return d};this.enqueue=function(b){n.push(b)};this.close=function(b){n.close(function(g){g?b(g):d.close(b)})};this.destroy=function(b){d.destroy(b)};this.setOperationRouter(new ops.TrivialOperationRouter)};
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
gui.AnnotationController=function(m,h){function b(){var b=p.getCursor(h),b=b&&b.getNode(),a=!1;if(b){a:{for(a=p.getRootNode();b&&b!==a;){if(b.namespaceURI===e&&"annotation"===b.localName){b=!0;break a}b=b.parentNode}b=!1}a=!b}a!==k&&(k=a,q.emit(gui.AnnotationController.annotatableChanged,k))}function g(d){d.getMemberId()===h&&b()}function d(d){d===h&&b()}function n(d){d.getMemberId()===h&&b()}var p=m.getOdtDocument(),k=!1,q=new core.EventNotifier([gui.AnnotationController.annotatableChanged]),e=odf.Namespaces.officens;
this.isAnnotatable=function(){return k};this.addAnnotation=function(){var b=new ops.OpAddAnnotation,a=p.getCursorSelection(h),c=a.length,a=a.position;k&&(a=0<=c?a:a+c,c=Math.abs(c),b.init({memberid:h,position:a,length:c,name:h+Date.now()}),m.enqueue([b]))};this.removeAnnotation=function(b){var a,c;a=p.convertDomPointToCursorStep(b,0)+1;c=p.convertDomPointToCursorStep(b,b.childNodes.length);b=new ops.OpRemoveAnnotation;b.init({memberid:h,position:a,length:c-a});c=new ops.OpMoveCursor;c.init({memberid:h,
position:0<a?a-1:a,length:0});m.enqueue([b,c])};this.subscribe=function(b,a){q.subscribe(b,a)};this.unsubscribe=function(b,a){q.unsubscribe(b,a)};this.destroy=function(b){p.unsubscribe(ops.Document.signalCursorAdded,g);p.unsubscribe(ops.Document.signalCursorRemoved,d);p.unsubscribe(ops.Document.signalCursorMoved,n);b()};p.subscribe(ops.Document.signalCursorAdded,g);p.subscribe(ops.Document.signalCursorRemoved,d);p.subscribe(ops.Document.signalCursorMoved,n);b()};
gui.AnnotationController.annotatableChanged="annotatable/changed";(function(){return gui.AnnotationController})();
// Input 75
gui.Avatar=function(m,h){var b=this,g,d,n;this.setColor=function(b){d.style.borderColor=b};this.setImageUrl=function(g){b.isVisible()?d.src=g:n=g};this.isVisible=function(){return"block"===g.style.display};this.show=function(){n&&(d.src=n,n=void 0);g.style.display="block"};this.hide=function(){g.style.display="none"};this.markAsFocussed=function(b){b?g.classList.add("active"):g.classList.remove("active")};this.destroy=function(b){m.removeChild(g);b()};(function(){var b=m.ownerDocument,k=b.documentElement.namespaceURI;
g=b.createElementNS(k,"div");d=b.createElementNS(k,"img");d.width=64;d.height=64;g.appendChild(d);g.style.width="64px";g.style.height="70px";g.style.position="absolute";g.style.top="-80px";g.style.left="-34px";g.style.display=h?"block":"none";g.className="handle";m.appendChild(g)})()};
// Input 76
gui.Caret=function(m,h,b){function g(){q.style.opacity="0"===q.style.opacity?"1":"0";v.trigger()}function d(a,b){var c=a.getBoundingClientRect(),d=0,e=0;c&&b&&(d=Math.max(c.top,b.top),e=Math.min(c.bottom,b.bottom));return e-d}function n(){Object.keys(t).forEach(function(a){u[a]=t[a]})}function p(){var f,g,l,h;if(!1===t.isShown||m.getSelectionType()!==ops.OdtCursor.RangeSelection||!b&&!m.getSelectedRange().collapsed)t.visibility="hidden",q.style.visibility="hidden",v.cancel();else{t.visibility="visible";
q.style.visibility="visible";if(!1===t.isFocused)q.style.opacity="1",v.cancel();else{if(w||u.visibility!==t.visibility)q.style.opacity="1",v.cancel();v.trigger()}if(x||z||u.visibility!==t.visibility){f=m.getSelectedRange().cloneRange();g=m.getNode();var k=null;g.previousSibling&&(l=g.previousSibling.nodeType===Node.TEXT_NODE?g.previousSibling.textContent.length:g.previousSibling.childNodes.length,f.setStart(g.previousSibling,0<l?l-1:0),f.setEnd(g.previousSibling,l),(l=f.getBoundingClientRect())&&
l.height&&(k=l));g.nextSibling&&(f.setStart(g.nextSibling,0),f.setEnd(g.nextSibling,0<(g.nextSibling.nodeType===Node.TEXT_NODE?g.nextSibling.textContent.length:g.nextSibling.childNodes.length)?1:0),(l=f.getBoundingClientRect())&&l.height&&(!k||d(g,l)>d(g,k))&&(k=l));g=k;k=m.getDocument().getCanvas();f=k.getZoomLevel();k=c.getBoundingClientRect(k.getSizer());g?(q.style.top="0",l=c.getBoundingClientRect(q),8>g.height&&(g={top:g.top-(8-g.height)/2,height:8}),q.style.height=c.adaptRangeDifferenceToZoomLevel(g.height,
f)+"px",q.style.top=c.adaptRangeDifferenceToZoomLevel(g.top-l.top,f)+"px"):(q.style.height="1em",q.style.top="5%");a&&(g=runtime.getWindow().getComputedStyle(q,null),l=c.getBoundingClientRect(q),a.style.bottom=c.adaptRangeDifferenceToZoomLevel(k.bottom-l.bottom,f)+"px",a.style.left=c.adaptRangeDifferenceToZoomLevel(l.right-k.left,f)+"px",g.font?a.style.font=g.font:(a.style.fontStyle=g.fontStyle,a.style.fontVariant=g.fontVariant,a.style.fontWeight=g.fontWeight,a.style.fontSize=g.fontSize,a.style.lineHeight=
g.lineHeight,a.style.fontFamily=g.fontFamily))}if(z){var k=m.getDocument().getCanvas().getElement().parentNode,p;l=k.offsetWidth-k.clientWidth+5;h=k.offsetHeight-k.clientHeight+5;p=q.getBoundingClientRect();f=p.left-l;g=p.top-h;l=p.right+l;h=p.bottom+h;p=k.getBoundingClientRect();g<p.top?k.scrollTop-=p.top-g:h>p.bottom&&(k.scrollTop+=h-p.bottom);f<p.left?k.scrollLeft-=p.left-f:l>p.right&&(k.scrollLeft+=l-p.right)}}u.isFocused!==t.isFocused&&e.markAsFocussed(t.isFocused);n();x=z=w=!1}function k(a){r.removeChild(q);
a()}var q,e,r,a,c=new core.DomUtils,l=new core.Async,f,v,w=!1,z=!1,x=!1,t={isFocused:!1,isShown:!0,visibility:"hidden"},u={isFocused:!t.isFocused,isShown:!t.isShown,visibility:"hidden"};this.handleUpdate=function(){x=!0;"hidden"!==t.visibility&&(t.visibility="hidden",q.style.visibility="hidden");f.trigger()};this.refreshCursorBlinking=function(){w=!0;f.trigger()};this.setFocus=function(){t.isFocused=!0;f.trigger()};this.removeFocus=function(){t.isFocused=!1;f.trigger()};this.show=function(){t.isShown=
!0;f.trigger()};this.hide=function(){t.isShown=!1;f.trigger()};this.setAvatarImageUrl=function(a){e.setImageUrl(a)};this.setColor=function(a){q.style.borderColor=a;e.setColor(a)};this.getCursor=function(){return m};this.getFocusElement=function(){return q};this.toggleHandleVisibility=function(){e.isVisible()?e.hide():e.show()};this.showHandle=function(){e.show()};this.hideHandle=function(){e.hide()};this.setOverlayElement=function(b){a=b;x=!0;f.trigger()};this.ensureVisible=function(){z=!0;f.trigger()};
this.destroy=function(a){l.destroyAll([f.destroy,v.destroy,e.destroy,k],a)};(function(){var a=m.getDocument().getDOMDocument();q=a.createElementNS(a.documentElement.namespaceURI,"span");q.className="caret";q.style.top="5%";r=m.getNode();r.appendChild(q);e=new gui.Avatar(r,h);f=new core.ScheduledTask(p,0);v=new core.ScheduledTask(g,500);f.triggerImmediate()})()};
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
odf.TextSerializer=function(){function m(g){var d="",n=h.filter?h.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,p=g.nodeType,k;if((n===NodeFilter.FILTER_ACCEPT||n===NodeFilter.FILTER_SKIP)&&b.isTextContentContainingNode(g))for(k=g.firstChild;k;)d+=m(k),k=k.nextSibling;n===NodeFilter.FILTER_ACCEPT&&(p===Node.ELEMENT_NODE&&b.isParagraph(g)?d+="\n":p===Node.TEXT_NODE&&g.textContent&&(d+=g.textContent));return d}var h=this,b=new odf.OdfUtils;this.filter=null;this.writeToString=function(b){if(!b)return"";
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
gui.StyleSummary=function(m){function h(b,g){var k=b+"|"+g,h;d.hasOwnProperty(k)||(h=[],m.forEach(function(d){d=(d=d[b])&&d[g];-1===h.indexOf(d)&&h.push(d)}),d[k]=h);return d[k]}function b(b,d,g){return function(){var m=h(b,d);return g.length>=m.length&&m.every(function(b){return-1!==g.indexOf(b)})}}function g(b,d){var g=h(b,d);return 1===g.length?g[0]:void 0}var d={};this.getPropertyValues=h;this.getCommonValue=g;this.isBold=b("style:text-properties","fo:font-weight",["bold"]);this.isItalic=b("style:text-properties",
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
gui.DirectFormattingController=function(m,h,b,g){function d(a){var b;a.collapsed?(b=a.startContainer,b.hasChildNodes()&&a.startOffset<b.childNodes.length&&(b=b.childNodes.item(a.startOffset)),a=[b]):a=T.getTextNodes(a,!0);return a}function n(a,b){var c={};Object.keys(a).forEach(function(d){var f=a[d](),e=b[d]();f!==e&&(c[d]=e)});return c}function p(){var a,b,c;a=(a=(a=H.getCursor(h))&&a.getSelectedRange())?d(a):[];a=H.getFormatting().getAppliedStyles(a);a[0]&&G&&(a[0]=U.mergeObjects(a[0],G));J=a;
c=new gui.StyleSummary(J);a=n(Q.text,c.text);b=n(Q.paragraph,c.paragraph);Q=c;0<Object.keys(a).length&&X.emit(gui.DirectFormattingController.textStylingChanged,a);0<Object.keys(b).length&&X.emit(gui.DirectFormattingController.paragraphStylingChanged,b)}function k(a){("string"===typeof a?a:a.getMemberId())===h&&p()}function q(){p()}function e(a){var b=H.getCursor(h);a=a.paragraphElement;b&&H.getParagraphElement(b.getNode())===a&&p()}function r(a,b){b(!a());return!0}function a(a){var b=H.getCursorSelection(h),
c={"style:text-properties":a};0!==b.length?(a=new ops.OpApplyDirectStyling,a.init({memberid:h,position:b.position,length:b.length,setProperties:c}),m.enqueue([a])):(G=U.mergeObjects(G||{},c),p())}function c(b,c){var d={};d[b]=c;a(d)}function l(a){a=a.spec();G&&a.memberid===h&&"SplitParagraph"!==a.optype&&(G=null,p())}function f(a){c("fo:font-weight",a?"bold":"normal")}function v(a){c("fo:font-style",a?"italic":"normal")}function w(a){c("style:text-underline-style",a?"solid":"none")}function z(a){c("style:text-line-through-style",
a?"solid":"none")}function x(a){return a===ops.StepsTranslator.NEXT_STEP}function t(a){var c=H.getCursor(h).getSelectedRange(),c=T.getParagraphElements(c),d=H.getFormatting(),f=[],e={},g;c.forEach(function(c){var l=H.convertDomPointToCursorStep(c,0,x),k=c.getAttributeNS(odf.Namespaces.textns,"style-name"),m;c=k?e.hasOwnProperty(k)?e[k]:void 0:g;c||(c=b.generateStyleName(),k?(e[k]=c,m=d.createDerivedStyleObject(k,"paragraph",{})):(g=c,m={}),m=a(m),k=new ops.OpAddStyle,k.init({memberid:h,styleName:c.toString(),
styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:m}),f.push(k));k=new ops.OpSetParagraphStyle;k.init({memberid:h,styleName:c.toString(),position:l});f.push(k)});m.enqueue(f)}function u(a){t(function(b){return U.mergeObjects(b,a)})}function s(a){u({"style:paragraph-properties":{"fo:text-align":a}})}function y(a,b){var c=H.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],f;d&&(d=d["fo:margin-left"])&&(f=T.parseLength(d));return U.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":f&&
f.unit===c.unit?f.value+a*c.value+f.unit:a*c.value+c.unit}})}function F(a,b){var c=d(a),f=H.getFormatting().getAppliedStyles(c)[0],e=H.getFormatting().getAppliedStylesForElement(b);if(!f||"text"!==f["style:family"]||!f["style:text-properties"])return!1;if(!e||!e["style:text-properties"])return!0;f=f["style:text-properties"];e=e["style:text-properties"];return!Object.keys(f).every(function(a){return f[a]===e[a]})}function L(){}var O=this,H=m.getOdtDocument(),U=new core.Utils,T=new odf.OdfUtils,X=new core.EventNotifier([gui.DirectFormattingController.textStylingChanged,
gui.DirectFormattingController.paragraphStylingChanged]),D=odf.Namespaces.textns,ba=core.PositionFilter.FilterResult.FILTER_ACCEPT,G,J=[],Q=new gui.StyleSummary(J);this.formatTextSelection=a;this.createCursorStyleOp=function(a,b,c){var d=null;(c=c?J[0]:G)&&c["style:text-properties"]&&(d=new ops.OpApplyDirectStyling,d.init({memberid:h,position:a,length:b,setProperties:{"style:text-properties":c["style:text-properties"]}}),G=null,p());return d};this.setBold=f;this.setItalic=v;this.setHasUnderline=w;
this.setHasStrikethrough=z;this.setFontSize=function(a){c("fo:font-size",a+"pt")};this.setFontName=function(a){c("style:font-name",a)};this.getAppliedStyles=function(){return J};this.toggleBold=r.bind(O,function(){return Q.isBold()},f);this.toggleItalic=r.bind(O,function(){return Q.isItalic()},v);this.toggleUnderline=r.bind(O,function(){return Q.hasUnderline()},w);this.toggleStrikethrough=r.bind(O,function(){return Q.hasStrikeThrough()},z);this.isBold=function(){return Q.isBold()};this.isItalic=function(){return Q.isItalic()};
this.hasUnderline=function(){return Q.hasUnderline()};this.hasStrikeThrough=function(){return Q.hasStrikeThrough()};this.fontSize=function(){return Q.fontSize()};this.fontName=function(){return Q.fontName()};this.isAlignedLeft=function(){return Q.isAlignedLeft()};this.isAlignedCenter=function(){return Q.isAlignedCenter()};this.isAlignedRight=function(){return Q.isAlignedRight()};this.isAlignedJustified=function(){return Q.isAlignedJustified()};this.alignParagraphLeft=function(){s("left");return!0};
this.alignParagraphCenter=function(){s("center");return!0};this.alignParagraphRight=function(){s("right");return!0};this.alignParagraphJustified=function(){s("justify");return!0};this.indent=function(){t(y.bind(null,1));return!0};this.outdent=function(){t(y.bind(null,-1));return!0};this.createParagraphStyleOps=function(a){var c=H.getCursor(h),d=c.getSelectedRange(),f=[],e,g;c.hasForwardSelection()?(e=c.getAnchorNode(),g=c.getNode()):(e=c.getNode(),g=c.getAnchorNode());c=H.getParagraphElement(g);runtime.assert(Boolean(c),
"DirectFormattingController: Cursor outside paragraph");var l;a:{l=c;var k=gui.SelectionMover.createPositionIterator(l),m=new core.PositionFilterChain;m.addFilter(H.getPositionFilter());m.addFilter(H.createRootFilter(h));for(k.setUnfilteredPosition(d.endContainer,d.endOffset);k.nextPosition();)if(m.acceptPosition(k)===ba){l=H.getParagraphElement(k.getCurrentNode())!==l;break a}l=!0}if(!l)return f;g!==e&&(c=H.getParagraphElement(e));if(!G&&!F(d,c))return f;d=J[0];if(!d)return f;if(e=c.getAttributeNS(D,
"style-name"))d={"style:text-properties":d["style:text-properties"]},d=H.getFormatting().createDerivedStyleObject(e,"paragraph",d);c=b.generateStyleName();e=new ops.OpAddStyle;e.init({memberid:h,styleName:c,styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:d});f.push(e);e=new ops.OpSetParagraphStyle;e.init({memberid:h,styleName:c,position:a});f.push(e);return f};this.subscribe=function(a,b){X.subscribe(a,b)};this.unsubscribe=function(a,b){X.unsubscribe(a,b)};this.destroy=function(a){H.unsubscribe(ops.Document.signalCursorAdded,
k);H.unsubscribe(ops.Document.signalCursorRemoved,k);H.unsubscribe(ops.Document.signalCursorMoved,k);H.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,q);H.unsubscribe(ops.OdtDocument.signalParagraphChanged,e);H.unsubscribe(ops.OdtDocument.signalOperationEnd,l);a()};(function(){H.subscribe(ops.Document.signalCursorAdded,k);H.subscribe(ops.Document.signalCursorRemoved,k);H.subscribe(ops.Document.signalCursorMoved,k);H.subscribe(ops.OdtDocument.signalParagraphStyleModified,q);H.subscribe(ops.OdtDocument.signalParagraphChanged,
e);H.subscribe(ops.OdtDocument.signalOperationEnd,l);p();g||(O.alignParagraphCenter=L,O.alignParagraphJustified=L,O.alignParagraphLeft=L,O.alignParagraphRight=L,O.createParagraphStyleOps=function(){return[]},O.indent=L,O.outdent=L)})()};gui.DirectFormattingController.textStylingChanged="textStyling/changed";gui.DirectFormattingController.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectFormattingController})();
// Input 82
gui.HyperlinkClickHandler=function(m){function h(){m().removeAttributeNS("urn:webodf:names:helper","links")}function b(){m().setAttributeNS("urn:webodf:names:helper","links","inactive")}var g=gui.HyperlinkClickHandler.Modifier.None,d=gui.HyperlinkClickHandler.Modifier.Ctrl,n=gui.HyperlinkClickHandler.Modifier.Meta,p=new odf.OdfUtils,k=xmldom.XPath,q=g;this.handleClick=function(b){var h=b.target||b.srcElement,a,c;b.ctrlKey?a=d:b.metaKey&&(a=n);if(q===g||q===a){a:{for(;null!==h;){if(p.isHyperlink(h))break a;
if(p.isParagraph(h))break;h=h.parentNode}h=null}h&&(h=p.getHyperlinkTarget(h),""!==h&&("#"===h[0]?(h=h.substring(1),a=m(),c=k.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+h+"']",odf.Namespaces.lookupNamespaceURI),0===c.length&&(c=k.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+h+"']",odf.Namespaces.lookupNamespaceURI)),0<c.length&&c[0].scrollIntoView(!0)):runtime.getWindow().open(h),b.preventDefault?b.preventDefault():b.returnValue=!1))}};this.showPointerCursor=h;this.showTextCursor=
b;this.setModifier=function(d){q=d;q!==g?b():h()}};gui.HyperlinkClickHandler.Modifier={None:0,Ctrl:1,Meta:2};
// Input 83
gui.HyperlinkController=function(m,h){var b=new odf.OdfUtils,g=m.getOdtDocument();this.addHyperlink=function(b,n){var p=g.getCursorSelection(h),k=new ops.OpApplyHyperlink,q=[];if(0===p.length||n)n=n||b,k=new ops.OpInsertText,k.init({memberid:h,position:p.position,text:n}),p.length=n.length,q.push(k);k=new ops.OpApplyHyperlink;k.init({memberid:h,position:p.position,length:p.length,hyperlink:b});q.push(k);m.enqueue(q)};this.removeHyperlinks=function(){var d=gui.SelectionMover.createPositionIterator(g.getRootNode()),
n=g.getCursor(h).getSelectedRange(),p=b.getHyperlinkElements(n),k=n.collapsed&&1===p.length,q=g.getDOMDocument().createRange(),e=[],r,a;0!==p.length&&(p.forEach(function(b){q.selectNodeContents(b);r=g.convertDomToCursorRange({anchorNode:q.startContainer,anchorOffset:q.startOffset,focusNode:q.endContainer,focusOffset:q.endOffset});a=new ops.OpRemoveHyperlink;a.init({memberid:h,position:r.position,length:r.length});e.push(a)}),k||(k=p[0],-1===n.comparePoint(k,0)&&(q.setStart(k,0),q.setEnd(n.startContainer,
n.startOffset),r=g.convertDomToCursorRange({anchorNode:q.startContainer,anchorOffset:q.startOffset,focusNode:q.endContainer,focusOffset:q.endOffset}),0<r.length&&(a=new ops.OpApplyHyperlink,a.init({memberid:h,position:r.position,length:r.length,hyperlink:b.getHyperlinkTarget(k)}),e.push(a))),p=p[p.length-1],d.moveToEndOfNode(p),d=d.unfilteredDomOffset(),1===n.comparePoint(p,d)&&(q.setStart(n.endContainer,n.endOffset),q.setEnd(p,d),r=g.convertDomToCursorRange({anchorNode:q.startContainer,anchorOffset:q.startOffset,
focusNode:q.endContainer,focusOffset:q.endOffset}),0<r.length&&(a=new ops.OpApplyHyperlink,a.init({memberid:h,position:r.position,length:r.length,hyperlink:b.getHyperlinkTarget(p)}),e.push(a)))),m.enqueue(e),q.detach())}};
// Input 84
gui.EventManager=function(m){function h(){var a=this,b=[];this.filters=[];this.handlers=[];this.handleEvent=function(c){-1===b.indexOf(c)&&(b.push(c),a.filters.every(function(a){return a(c)})&&a.handlers.forEach(function(a){a(c)}),runtime.setTimeout(function(){b.splice(b.indexOf(c),1)},0))}}function b(a,b,c){function d(b){c(b,f,function(b){b.type=a;e.emit("eventTriggered",b)})}var f={},e=new core.EventNotifier(["eventTriggered"]);this.subscribe=function(a){e.subscribe("eventTriggered",a)};this.unsubscribe=
function(a){e.unsubscribe("eventTriggered",a)};this.destroy=function(){b.forEach(function(a){y.unsubscribe(a,d)})};(function(){b.forEach(function(a){y.subscribe(a,d)})})()}function g(a){runtime.clearTimeout(a);delete F[a]}function d(a,b){var c=runtime.setTimeout(function(){a();g(c)},b);F[c]=!0;return c}function n(a,b,c){var f=a.touches.length,e=a.touches[0],l=b.timer;"touchmove"===a.type||"touchend"===a.type?l&&g(l):"touchstart"===a.type&&(1!==f?runtime.clearTimeout(l):l=d(function(){c({clientX:e.clientX,
clientY:e.clientY,pageX:e.pageX,pageY:e.pageY,target:a.target||a.srcElement||null,detail:1})},400));b.timer=l}function p(a,b,c){var d=a.touches[0],f=a.target||a.srcElement||null,e=b.target;1!==a.touches.length||"touchend"===a.type?e=null:"touchstart"===a.type&&"draggable"===f.getAttribute("class")?e=f:"touchmove"===a.type&&e&&(a.preventDefault(),a.stopPropagation(),c({clientX:d.clientX,clientY:d.clientY,pageX:d.pageX,pageY:d.pageY,target:e,detail:1}));b.target=e}function k(a,b,c){var d=a.target||
a.srcElement||null,f=b.dragging;"drag"===a.type?f=!0:"touchend"===a.type&&f&&(f=!1,a=a.changedTouches[0],c({clientX:a.clientX,clientY:a.clientY,pageX:a.pageX,pageY:a.pageY,target:d,detail:1}));b.dragging=f}function q(){s.classList.add("webodf-touchEnabled");y.unsubscribe("touchstart",q)}function e(a){var b=a.scrollX,c=a.scrollY;this.restore=function(){a.scrollX===b&&a.scrollY===c||a.scrollTo(b,c)}}function r(a){var b=a.scrollTop,c=a.scrollLeft;this.restore=function(){if(a.scrollTop!==b||a.scrollLeft!==
c)a.scrollTop=b,a.scrollLeft=c}}function a(a,b,c){var d,f=!1;x.hasOwnProperty(b)?x[b].subscribe(c):(d="on"+b,a.attachEvent&&(a.attachEvent(d,c),f=!0),!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0),f&&!w[b]||!a.hasOwnProperty(d)||(a[d]=c))}function c(b,c){var d=t[b]||null;!d&&c&&(d=t[b]=new h,z[b]&&a(v,b,d.handleEvent),a(u,b,d.handleEvent),a(s,b,d.handleEvent));return d}function l(){return m.getDOMDocument().activeElement===u}function f(a){for(var b=[];a;)(a.scrollWidth>a.clientWidth||a.scrollHeight>
a.clientHeight)&&b.push(new r(a)),a=a.parentNode;b.push(new e(v));return b}var v=runtime.getWindow(),w={beforecut:!0,beforepaste:!0,longpress:!0,drag:!0,dragstop:!0},z={mousedown:!0,mouseup:!0,focus:!0},x={},t={},u,s=m.getCanvas().getElement(),y=this,F={};this.addFilter=function(a,b){c(a,!0).filters.push(b)};this.removeFilter=function(a,b){var d=c(a,!0),f=d.filters.indexOf(b);-1!==f&&d.filters.splice(f,1)};this.subscribe=function(a,b){c(a,!0).handlers.push(b)};this.unsubscribe=function(a,b){var d=
c(a,!1),f=d&&d.handlers.indexOf(b);d&&-1!==f&&d.handlers.splice(f,1)};this.hasFocus=l;this.focus=function(){var a;l()||(a=f(u),u.focus(),a.forEach(function(a){a.restore()}))};this.getEventTrap=function(){return u};this.blur=function(){l()&&u.blur()};this.destroy=function(a){Object.keys(F).forEach(function(a){g(parseInt(a,10))});F.length=0;Object.keys(x).forEach(function(a){x[a].destroy()});x={};y.unsubscribe("touchstart",q);u.parentNode.removeChild(u);a()};(function(){var a=m.getOdfCanvas().getSizer(),
c=a.ownerDocument;runtime.assert(Boolean(v),"EventManager requires a window object to operate correctly");u=c.createElement("input");u.id="eventTrap";u.setAttribute("tabindex",-1);a.appendChild(u);x.longpress=new b("longpress",["touchstart","touchmove","touchend"],n);x.drag=new b("drag",["touchstart","touchmove","touchend"],p);x.dragstop=new b("dragstop",["drag","touchend"],k);y.subscribe("touchstart",q)})()};
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
gui.ImageController=function(m,h,b){var g={"image/gif":".gif","image/jpeg":".jpg","image/png":".png"},d=odf.Namespaces.textns,n=m.getOdtDocument(),p=n.getFormatting(),k={};this.insertImage=function(q,e,r,a){var c;runtime.assert(0<r&&0<a,"Both width and height of the image should be greater than 0px.");c=n.getParagraphElement(n.getCursor(h).getNode()).getAttributeNS(d,"style-name");k.hasOwnProperty(c)||(k[c]=p.getContentSize(c,"paragraph"));c=k[c];r*=0.0264583333333334;a*=0.0264583333333334;var l=
1,f=1;r>c.width&&(l=c.width/r);a>c.height&&(f=c.height/a);l=Math.min(l,f);c=r*l;r=a*l;f=n.getOdfCanvas().odfContainer().rootElement.styles;a=q.toLowerCase();var l=g.hasOwnProperty(a)?g[a]:null,v;a=[];runtime.assert(null!==l,"Image type is not supported: "+q);l="Pictures/"+b.generateImageName()+l;v=new ops.OpSetBlob;v.init({memberid:h,filename:l,mimetype:q,content:e});a.push(v);p.getStyleElement("Graphics","graphic",[f])||(q=new ops.OpAddStyle,q.init({memberid:h,styleName:"Graphics",styleFamily:"graphic",
isAutomaticStyle:!1,setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph","svg:x":"0cm","svg:y":"0cm","style:wrap":"dynamic","style:number-wrapped-paragraphs":"no-limit","style:wrap-contour":"false","style:vertical-pos":"top","style:vertical-rel":"paragraph","style:horizontal-pos":"center","style:horizontal-rel":"paragraph"}}}),a.push(q));q=b.generateStyleName();e=new ops.OpAddStyle;e.init({memberid:h,styleName:q,styleFamily:"graphic",isAutomaticStyle:!0,setProperties:{"style:parent-style-name":"Graphics",
"style:graphic-properties":{"style:vertical-pos":"top","style:vertical-rel":"baseline","style:horizontal-pos":"center","style:horizontal-rel":"paragraph","fo:background-color":"transparent","style:background-transparency":"100%","style:shadow":"none","style:mirror":"none","fo:clip":"rect(0cm, 0cm, 0cm, 0cm)","draw:luminance":"0%","draw:contrast":"0%","draw:red":"0%","draw:green":"0%","draw:blue":"0%","draw:gamma":"100%","draw:color-inversion":"false","draw:image-opacity":"100%","draw:color-mode":"standard"}}});
a.push(e);v=new ops.OpInsertImage;v.init({memberid:h,position:n.getCursorPosition(h),filename:l,frameWidth:c+"cm",frameHeight:r+"cm",frameStyleName:q,frameName:b.generateFrameName()});a.push(v);m.enqueue(a)}};
// Input 87
gui.ImageSelector=function(m){function h(){var b=m.getSizer(),h=d.createElement("div");h.id="imageSelector";h.style.borderWidth="1px";b.appendChild(h);g.forEach(function(b){var e=d.createElement("div");e.className=b;h.appendChild(e)});return h}var b=odf.Namespaces.svgns,g="topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(" "),d=m.getElement().ownerDocument,n=!1;this.select=function(g){var k,q,e=d.getElementById("imageSelector");e||(e=h());n=!0;k=e.parentNode;
q=g.getBoundingClientRect();var r=k.getBoundingClientRect(),a=m.getZoomLevel();k=(q.left-r.left)/a-1;q=(q.top-r.top)/a-1;e.style.display="block";e.style.left=k+"px";e.style.top=q+"px";e.style.width=g.getAttributeNS(b,"width");e.style.height=g.getAttributeNS(b,"height")};this.clearSelection=function(){var b;n&&(b=d.getElementById("imageSelector"))&&(b.style.display="none");n=!1};this.isSelectorElement=function(b){var g=d.getElementById("imageSelector");return g?b===g||b.parentNode===g:!1}};
// Input 88
(function(){function m(h){function b(b){p=b.which&&String.fromCharCode(b.which)===m;m=void 0;return!1===p}function g(){p=!1}function d(b){m=b.data;p=!1}var m,p=!1;this.destroy=function(k){h.unsubscribe("textInput",g);h.unsubscribe("compositionend",d);h.removeFilter("keypress",b);k()};h.subscribe("textInput",g);h.subscribe("compositionend",d);h.addFilter("keypress",b)}gui.InputMethodEditor=function(h,b){function g(a){l&&(a?l.getNode().setAttributeNS(c,"composing","true"):(l.getNode().removeAttributeNS(c,
"composing"),w.textContent=""))}function d(){u&&(u=!1,g(!1),y.emit(gui.InputMethodEditor.signalCompositionEnd,{data:s}),s="")}function n(){d();l&&l.getSelectedRange().collapsed?f.value="":f.value=x;f.setSelectionRange(0,f.value.length)}function p(){F=void 0;t.cancel();g(!0);u||y.emit(gui.InputMethodEditor.signalCompositionStart,{data:""})}function k(a){a=F=a.data;u=!0;s+=a;t.trigger()}function q(a){a.data!==F&&(a=a.data,u=!0,s+=a,t.trigger());F=void 0}function e(){w.textContent=f.value}function r(){b.blur();
f.setAttribute("disabled",!0)}function a(){var a=b.hasFocus();a&&b.blur();H?f.removeAttribute("disabled"):f.setAttribute("disabled",!0);a&&b.focus()}var c="urn:webodf:names:cursor",l=null,f=b.getEventTrap(),v=f.ownerDocument,w,z=new core.Async,x="b",t,u=!1,s="",y=new core.EventNotifier([gui.InputMethodEditor.signalCompositionStart,gui.InputMethodEditor.signalCompositionEnd]),F,L=[],O,H=!1;this.subscribe=y.subscribe;this.unsubscribe=y.unsubscribe;this.registerCursor=function(a){a.getMemberId()===h&&
(l=a,l.getNode().appendChild(w),b.subscribe("input",e),b.subscribe("compositionupdate",e))};this.removeCursor=function(a){l&&a===h&&(l.getNode().removeChild(w),b.unsubscribe("input",e),b.unsubscribe("compositionupdate",e),l=null)};this.setEditing=function(b){H=b;a()};this.destroy=function(c){b.unsubscribe("compositionstart",p);b.unsubscribe("compositionend",k);b.unsubscribe("textInput",q);b.unsubscribe("keypress",d);b.unsubscribe("mousedown",r);b.unsubscribe("mouseup",a);b.unsubscribe("focus",n);
z.destroyAll(O,c)};(function(){b.subscribe("compositionstart",p);b.subscribe("compositionend",k);b.subscribe("textInput",q);b.subscribe("keypress",d);b.subscribe("mousedown",r);b.subscribe("mouseup",a);b.subscribe("focus",n);L.push(new m(b));O=L.map(function(a){return a.destroy});w=v.createElement("span");w.setAttribute("id","composer");t=new core.ScheduledTask(n,1);O.push(t.destroy)})()};gui.InputMethodEditor.signalCompositionStart="input/compositionstart";gui.InputMethodEditor.signalCompositionEnd=
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
gui.KeyboardHandler=function(){function m(b,g){g||(g=h.None);return b+":"+g}var h=gui.KeyboardHandler.Modifier,b=null,g={};this.setDefault=function(d){b=d};this.bind=function(b,h,p,k){b=m(b,h);runtime.assert(k||!1===g.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);g[b]=p};this.unbind=function(b,h){var p=m(b,h);delete g[p]};this.reset=function(){b=null;g={}};this.handleEvent=function(d){var n=d.keyCode,p=h.None;d.metaKey&&(p|=h.Meta);d.ctrlKey&&(p|=h.Ctrl);d.altKey&&
(p|=h.Alt);d.shiftKey&&(p|=h.Shift);n=m(n,p);n=g[n];p=!1;n?p=n():null!==b&&(p=b(d));p&&(d.preventDefault?d.preventDefault():d.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,CtrlAlt:6,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};
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
gui.PlainTextPasteboard=function(m,h){function b(b,d){b.init(d);return b}this.createPasteOps=function(g){var d=m.getCursorPosition(h),n=d,p=[];g.replace(/\r/g,"").split("\n").forEach(function(d){p.push(b(new ops.OpSplitParagraph,{memberid:h,position:n,moveCursor:!0}));n+=1;p.push(b(new ops.OpInsertText,{memberid:h,position:n,text:d,moveCursor:!0}));n+=d.length});p.push(b(new ops.OpRemoveText,{memberid:h,position:d,length:1}));return p}};
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
odf.WordBoundaryFilter=function(m,h){function b(a,b,c){for(var d=null,e=m.getRootNode(),g;a!==e&&null!==a&&null===d;)g=0>b?a.previousSibling:a.nextSibling,c(g)===NodeFilter.FILTER_ACCEPT&&(d=g),a=a.parentNode;return d}function g(a,b){var c;return null===a?l.NO_NEIGHBOUR:p.isCharacterElement(a)?l.SPACE_CHAR:a.nodeType===d||p.isTextSpan(a)||p.isHyperlink(a)?(c=a.textContent.charAt(b()),q.test(c)?l.SPACE_CHAR:k.test(c)?l.PUNCTUATION_CHAR:l.WORD_CHAR):l.OTHER}var d=Node.TEXT_NODE,n=Node.ELEMENT_NODE,
p=new odf.OdfUtils,k=/[!-#%-*,-\/:-;?-@\[-\]_{}\u00a1\u00ab\u00b7\u00bb\u00bf;\u00b7\u055a-\u055f\u0589-\u058a\u05be\u05c0\u05c3\u05c6\u05f3-\u05f4\u0609-\u060a\u060c-\u060d\u061b\u061e-\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0964-\u0965\u0970\u0df4\u0e4f\u0e5a-\u0e5b\u0f04-\u0f12\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u104a-\u104f\u10fb\u1361-\u1368\u166d-\u166e\u169b-\u169c\u16eb-\u16ed\u1735-\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944-\u1945\u19de-\u19df\u1a1e-\u1a1f\u1b5a-\u1b60\u1c3b-\u1c3f\u1c7e-\u1c7f\u2000-\u206e\u207d-\u207e\u208d-\u208e\u3008-\u3009\u2768-\u2775\u27c5-\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc-\u29fd\u2cf9-\u2cfc\u2cfe-\u2cff\u2e00-\u2e7e\u3000-\u303f\u30a0\u30fb\ua60d-\ua60f\ua673\ua67e\ua874-\ua877\ua8ce-\ua8cf\ua92e-\ua92f\ua95f\uaa5c-\uaa5f\ufd3e-\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a-\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a-\uff1b\uff1f-\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]|\ud800[\udd00-\udd01\udf9f\udfd0]|\ud802[\udd1f\udd3f\ude50-\ude58]|\ud809[\udc00-\udc7e]/,
q=/\s/,e=core.PositionFilter.FilterResult.FILTER_ACCEPT,r=core.PositionFilter.FilterResult.FILTER_REJECT,a=odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,c=odf.WordBoundaryFilter.IncludeWhitespace.LEADING,l={NO_NEIGHBOUR:0,SPACE_CHAR:1,PUNCTUATION_CHAR:2,WORD_CHAR:3,OTHER:4};this.acceptPosition=function(d){var k=d.container(),m=d.leftNode(),p=d.rightNode(),q=d.unfilteredDomOffset,t=function(){return d.unfilteredDomOffset()-1};k.nodeType===n&&(null===p&&(p=b(k,1,d.getNodeFilter())),null===m&&(m=
b(k,-1,d.getNodeFilter())));k!==p&&(q=function(){return 0});k!==m&&null!==m&&(t=function(){return m.textContent.length-1});k=g(m,t);p=g(p,q);return k===l.WORD_CHAR&&p===l.WORD_CHAR||k===l.PUNCTUATION_CHAR&&p===l.PUNCTUATION_CHAR||h===a&&k!==l.NO_NEIGHBOUR&&p===l.SPACE_CHAR||h===c&&k===l.SPACE_CHAR&&p!==l.NO_NEIGHBOUR?r:e}};odf.WordBoundaryFilter.IncludeWhitespace={None:0,TRAILING:1,LEADING:2};(function(){return odf.WordBoundaryFilter})();
// Input 92
gui.SelectionController=function(m,h){function b(){var a=x.getCursor(h).getNode();return x.createStepIterator(a,0,[s,F],x.getRootElement(a))}function g(a,b,c){c=new odf.WordBoundaryFilter(x,c);return x.createStepIterator(a,b,[s,F,c],x.getRootElement(a))}function d(a){return function(b){var c=a(b);return function(b,d){return a(d)===c}}}function n(a,b){return b?{anchorNode:a.startContainer,anchorOffset:a.startOffset,focusNode:a.endContainer,focusOffset:a.endOffset}:{anchorNode:a.endContainer,anchorOffset:a.endOffset,
focusNode:a.startContainer,focusOffset:a.startOffset}}function p(a,b,c){var d=new ops.OpMoveCursor;d.init({memberid:h,position:a,length:b||0,selectionType:c});return d}function k(a){var b;b=g(a.startContainer,a.startOffset,L);b.roundToPreviousStep()&&a.setStart(b.container(),b.offset());b=g(a.endContainer,a.endOffset,O);b.roundToNextStep()&&a.setEnd(b.container(),b.offset())}function q(a){var b=u.getParagraphElements(a),c=b[0],b=b[b.length-1];c&&a.setStart(c,0);b&&(u.isParagraph(a.endContainer)&&
0===a.endOffset?a.setEndBefore(b):a.setEnd(b,b.childNodes.length))}function e(a){var b=x.getCursorSelection(h),c=x.getCursor(h).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,y,s):-c.convertBackwardStepsBetweenFilters(-a,y,s),a=b.length+a,m.enqueue([p(b.position,a)]))}function r(a){var c=b(),d=x.getCursor(h).getAnchorNode();a(c)&&(a=x.convertDomToCursorRange({anchorNode:d,anchorOffset:0,focusNode:c.container(),focusOffset:c.offset()}),m.enqueue([p(a.position,a.length)]))}function a(a){var b=
x.getCursorPosition(h),c=x.getCursor(h).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,y,s):-c.convertBackwardStepsBetweenFilters(-a,y,s),m.enqueue([p(b+a,0)]))}function c(a){var c=b();a(c)&&(a=x.convertDomPointToCursorStep(c.container(),c.offset()),m.enqueue([p(a,0)]))}function l(b,c){var d=x.getParagraphElement(x.getCursor(h).getNode());runtime.assert(Boolean(d),"SelectionController: Cursor outside paragraph");d=x.getCursor(h).getStepCounter().countLinesSteps(b,y);c?e(d):a(d)}
function f(b,c){var d=x.getCursor(h).getStepCounter().countStepsToLineBoundary(b,y);c?e(d):a(d)}function v(a,b){var c=x.getCursor(h),c=n(c.getSelectedRange(),c.hasForwardSelection()),d=g(c.focusNode,c.focusOffset,L);if(0<=a?d.nextStep():d.previousStep())c.focusNode=d.container(),c.focusOffset=d.offset(),b||(c.anchorNode=c.focusNode,c.anchorOffset=c.focusOffset),c=x.convertDomToCursorRange(c),m.enqueue([p(c.position,c.length)])}function w(a,b){var c=x.getCursor(h),f=b(c.getNode()),c=n(c.getSelectedRange(),
c.hasForwardSelection());runtime.assert(Boolean(f),"SelectionController: Cursor outside root");0>a?(c.focusNode=f,c.focusOffset=0):(c.focusNode=f,c.focusOffset=f.childNodes.length);f=x.convertDomToCursorRange(c,d(b));m.enqueue([p(f.position,f.length)])}function z(a){var b=x.getCursor(h),b=x.getRootElement(b.getNode());runtime.assert(Boolean(b),"SelectionController: Cursor outside root");a=0>a?x.convertDomPointToCursorStep(b,0,function(a){return a===ops.StepsTranslator.NEXT_STEP}):x.convertDomPointToCursorStep(b,
b.childNodes.length);m.enqueue([p(a,0)]);return!0}var x=m.getOdtDocument(),t=new core.DomUtils,u=new odf.OdfUtils,s=x.getPositionFilter(),y=new core.PositionFilterChain,F=x.createRootFilter(h),L=odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,O=odf.WordBoundaryFilter.IncludeWhitespace.LEADING;this.selectionToRange=function(a){var b=0<=t.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset),c=a.focusNode.ownerDocument.createRange();b?(c.setStart(a.anchorNode,a.anchorOffset),c.setEnd(a.focusNode,
a.focusOffset)):(c.setStart(a.focusNode,a.focusOffset),c.setEnd(a.anchorNode,a.anchorOffset));return{range:c,hasForwardSelection:b}};this.rangeToSelection=n;this.selectImage=function(a){var b=x.getRootElement(a),c=x.createRootFilter(b),b=x.createStepIterator(a,0,[c,x.getPositionFilter()],b),d;b.roundToPreviousStep()||runtime.assert(!1,"No walkable position before frame");c=b.container();d=b.offset();b.setPosition(a,a.childNodes.length);b.roundToNextStep()||runtime.assert(!1,"No walkable position after frame");
a=x.convertDomToCursorRange({anchorNode:c,anchorOffset:d,focusNode:b.container(),focusOffset:b.offset()});a=p(a.position,a.length,ops.OdtCursor.RegionSelection);m.enqueue([a])};this.expandToWordBoundaries=k;this.expandToParagraphBoundaries=q;this.selectRange=function(a,b,c){var f=x.getOdfCanvas().getElement(),e;e=t.containsNode(f,a.startContainer);f=t.containsNode(f,a.endContainer);if(e||f)if(e&&f&&(2===c?k(a):3<=c&&q(a)),a=n(a,b),b=x.convertDomToCursorRange(a,d(u.getParagraphElement)),a=x.getCursorSelection(h),
b.position!==a.position||b.length!==a.length)a=p(b.position,b.length,ops.OdtCursor.RangeSelection),m.enqueue([a])};this.moveCursorToLeft=function(){c(function(a){return a.previousStep()});return!0};this.moveCursorToRight=function(){c(function(a){return a.nextStep()});return!0};this.extendSelectionToLeft=function(){r(function(a){return a.previousStep()});return!0};this.extendSelectionToRight=function(){r(function(a){return a.nextStep()});return!0};this.moveCursorUp=function(){l(-1,!1);return!0};this.moveCursorDown=
function(){l(1,!1);return!0};this.extendSelectionUp=function(){l(-1,!0);return!0};this.extendSelectionDown=function(){l(1,!0);return!0};this.moveCursorBeforeWord=function(){v(-1,!1);return!0};this.moveCursorPastWord=function(){v(1,!1);return!0};this.extendSelectionBeforeWord=function(){v(-1,!0);return!0};this.extendSelectionPastWord=function(){v(1,!0);return!0};this.moveCursorToLineStart=function(){f(-1,!1);return!0};this.moveCursorToLineEnd=function(){f(1,!1);return!0};this.extendSelectionToLineStart=
function(){f(-1,!0);return!0};this.extendSelectionToLineEnd=function(){f(1,!0);return!0};this.extendSelectionToParagraphStart=function(){w(-1,x.getParagraphElement);return!0};this.extendSelectionToParagraphEnd=function(){w(1,x.getParagraphElement);return!0};this.moveCursorToDocumentStart=function(){z(-1);return!0};this.moveCursorToDocumentEnd=function(){z(1);return!0};this.extendSelectionToDocumentStart=function(){w(-1,x.getRootElement);return!0};this.extendSelectionToDocumentEnd=function(){w(1,x.getRootElement);
return!0};this.extendSelectionToEntireDocument=function(){var a=x.getCursor(h),a=x.getRootElement(a.getNode());runtime.assert(Boolean(a),"SelectionController: Cursor outside root");a=x.convertDomToCursorRange({anchorNode:a,anchorOffset:0,focusNode:a,focusOffset:a.childNodes.length},d(x.getRootElement));m.enqueue([p(a.position,a.length)]);return!0};y.addFilter(s);y.addFilter(x.createRootFilter(h))};
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
gui.TextController=function(m,h,b,g){function d(b){var d=new ops.OpRemoveText;d.init({memberid:h,position:b.position,length:b.length});return d}function n(b){0>b.length&&(b.position+=b.length,b.length=-b.length);return b}function p(b,d){var a=new core.PositionFilterChain,c=gui.SelectionMover.createPositionIterator(k.getRootElement(b)),g=d?c.nextPosition:c.previousPosition;a.addFilter(k.getPositionFilter());a.addFilter(k.createRootFilter(h));for(c.setUnfilteredPosition(b,0);g();)if(a.acceptPosition(c)===
q)return!0;return!1}var k=m.getOdtDocument(),q=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.enqueueParagraphSplittingOps=function(){var b=n(k.getCursorSelection(h)),p,a=[];0<b.length&&(p=d(b),a.push(p));p=new ops.OpSplitParagraph;p.init({memberid:h,position:b.position,moveCursor:!0});a.push(p);g&&(b=g(b.position+1),a=a.concat(b));m.enqueue(a);return!0};this.removeTextByBackspaceKey=function(){var b=k.getCursor(h),g=n(k.getCursorSelection(h)),a=null;0===g.length?p(b.getNode(),!1)&&(a=new ops.OpRemoveText,
a.init({memberid:h,position:g.position-1,length:1}),m.enqueue([a])):(a=d(g),m.enqueue([a]));return null!==a};this.removeTextByDeleteKey=function(){var b=k.getCursor(h),g=n(k.getCursorSelection(h)),a=null;0===g.length?p(b.getNode(),!0)&&(a=new ops.OpRemoveText,a.init({memberid:h,position:g.position,length:1}),m.enqueue([a])):(a=d(g),m.enqueue([a]));return null!==a};this.removeCurrentSelection=function(){var b=n(k.getCursorSelection(h));0!==b.length&&(b=d(b),m.enqueue([b]));return!0};this.insertText=
function(e){var g=n(k.getCursorSelection(h)),a,c=[],l=!1;0<g.length&&(a=d(g),c.push(a),l=!0);a=new ops.OpInsertText;a.init({memberid:h,position:g.position,text:e,moveCursor:!0});c.push(a);b&&(e=b(g.position,e.length,l))&&c.push(e);m.enqueue(c)}};(function(){return gui.TextController})();
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
(function(){var m=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(h,b,g,d){function n(a){return a.target||a.srcElement||null}function p(a,b){var c=J.getDOMDocument(),d=null;c.caretRangeFromPoint?(c=c.caretRangeFromPoint(a,b),d={container:c.startContainer,offset:c.startOffset}):c.caretPositionFromPoint&&(c=c.caretPositionFromPoint(a,b))&&c.offsetNode&&(d={container:c.offsetNode,offset:c.offset});return d}function k(a){var c=J.getCursor(b).getSelectedRange();c.collapsed?
a.preventDefault():I.setDataFromRange(a,c)?aa.removeCurrentSelection():runtime.log("Cut operation failed")}function q(){return!1!==J.getCursor(b).getSelectedRange().collapsed}function e(a){var c=J.getCursor(b).getSelectedRange();c.collapsed?a.preventDefault():I.setDataFromRange(a,c)||runtime.log("Copy operation failed")}function r(a){var b;G.clipboardData&&G.clipboardData.getData?b=G.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));
b&&(aa.removeCurrentSelection(),h.enqueue(na.createPasteOps(b)));a.preventDefault?a.preventDefault():a.returnValue=!1}function a(){return!1}function c(a){if(ca)ca.onOperationExecuted(a)}function l(a){J.emit(ops.OdtDocument.signalUndoStackChanged,a)}function f(){var a=A.getEventTrap(),b,c;return ca?(c=A.hasFocus(),ca.moveBackward(1),b=J.getOdfCanvas().getSizer(),ea.containsNode(b,a)||(b.appendChild(a),c&&A.focus()),!0):!1}function v(){var a;return ca?(a=A.hasFocus(),ca.moveForward(1),a&&A.focus(),
!0):!1}function w(a){var c=J.getCursor(b).getSelectedRange(),d=n(a).getAttribute("end");c&&d&&(a=p(a.clientX,a.clientY))&&(da.setUnfilteredPosition(a.container,a.offset),fa.acceptPosition(da)===m&&(c=c.cloneRange(),"left"===d?c.setStart(da.container(),da.unfilteredDomOffset()):c.setEnd(da.container(),da.unfilteredDomOffset()),g.setSelectedRange(c,"right"===d),J.emit(ops.Document.signalCursorMoved,g)))}function z(){K.selectRange(g.getSelectedRange(),g.hasForwardSelection(),1)}function x(){var a=G.getSelection(),
b=0<a.rangeCount&&K.selectionToRange(a);$&&b&&(S=!0,ga.clearSelection(),da.setUnfilteredPosition(a.focusNode,a.focusOffset),fa.acceptPosition(da)===m&&(2===ka?K.expandToWordBoundaries(b.range):3<=ka&&K.expandToParagraphBoundaries(b.range),g.setSelectedRange(b.range,b.hasForwardSelection),J.emit(ops.Document.signalCursorMoved,g)))}function t(a){var c=n(a),d=J.getCursor(b);if($=null!==c&&ea.containsNode(J.getOdfCanvas().getElement(),c))S=!1,fa=J.createRootFilter(c),ka=a.detail,d&&a.shiftKey?G.getSelection().collapse(d.getAnchorNode(),
0):(a=G.getSelection(),c=d.getSelectedRange(),a.extend?d.hasForwardSelection()?(a.collapse(c.startContainer,c.startOffset),a.extend(c.endContainer,c.endOffset)):(a.collapse(c.endContainer,c.endOffset),a.extend(c.startContainer,c.startOffset)):(a.removeAllRanges(),a.addRange(c.cloneRange()))),1<ka&&x()}function u(a){var b=J.getRootElement(a),c=J.createRootFilter(b),b=J.createStepIterator(a,0,[c,J.getPositionFilter()],b);b.setPosition(a,a.childNodes.length);return b.roundToNextStep()?{container:b.container(),
offset:b.offset()}:null}function s(a){var b;b=(b=G.getSelection())?{anchorNode:b.anchorNode,anchorOffset:b.anchorOffset,focusNode:b.focusNode,focusOffset:b.focusOffset}:null;var c,d;b.anchorNode||b.focusNode||!(c=p(a.clientX,a.clientY))||(b.anchorNode=c.container,b.anchorOffset=c.offset,b.focusNode=b.anchorNode,b.focusOffset=b.anchorOffset);if(P.isImage(b.focusNode)&&0===b.focusOffset&&P.isCharacterFrame(b.focusNode.parentNode)){if(d=b.focusNode.parentNode,c=d.getBoundingClientRect(),a.clientX>c.right&&
(c=u(d)))b.anchorNode=b.focusNode=c.container,b.anchorOffset=b.focusOffset=c.offset}else P.isImage(b.focusNode.firstChild)&&1===b.focusOffset&&P.isCharacterFrame(b.focusNode)&&(c=u(b.focusNode))&&(b.anchorNode=b.focusNode=c.container,b.anchorOffset=b.focusOffset=c.offset);b.anchorNode&&b.focusNode&&(b=K.selectionToRange(b),K.selectRange(b.range,b.hasForwardSelection,a.detail));A.focus()}function y(a){var b;if(b=p(a.clientX,a.clientY))a=b.container,b=b.offset,a={anchorNode:a,anchorOffset:b,focusNode:a,
focusOffset:b},a=K.selectionToRange(a),K.selectRange(a.range,a.hasForwardSelection,2),A.focus()}function F(a){var b=n(a),c,d;la.processRequests();P.isImage(b)&&P.isCharacterFrame(b.parentNode)&&G.getSelection().isCollapsed?(K.selectImage(b.parentNode),A.focus()):ga.isSelectorElement(b)?A.focus():$&&(S?(b=g.getSelectedRange(),c=b.collapsed,P.isImage(b.endContainer)&&0===b.endOffset&&P.isCharacterFrame(b.endContainer.parentNode)&&(d=b.endContainer.parentNode,d=u(d))&&(b.setEnd(d.container,d.offset),
c&&b.collapse(!1)),K.selectRange(b,g.hasForwardSelection(),a.detail),A.focus()):qa?s(a):ma=runtime.setTimeout(function(){s(a)},0));ka=0;S=$=!1}function L(a){var c=J.getCursor(b).getSelectedRange();c.collapsed||N.exportRangeToDataTransfer(a.dataTransfer,c)}function O(){$&&A.focus();ka=0;S=$=!1}function H(a){F(a)}function U(a){var b=n(a),c=null;"annotationRemoveButton"===b.className?(c=ea.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0],Y.removeAnnotation(c),A.focus()):"draggable"!==
b.getAttribute("class")&&F(a)}function T(a){(a=a.data)&&aa.insertText(a)}function X(a){return function(){a();return!0}}function D(a){return function(c){return J.getCursor(b).getSelectionType()===ops.OdtCursor.RangeSelection?a(c):!0}}function ba(a){A.unsubscribe("keydown",B.handleEvent);A.unsubscribe("keypress",V.handleEvent);A.unsubscribe("keyup",M.handleEvent);A.unsubscribe("copy",e);A.unsubscribe("mousedown",t);A.unsubscribe("mousemove",la.trigger);A.unsubscribe("mouseup",U);A.unsubscribe("contextmenu",
H);A.unsubscribe("dragstart",L);A.unsubscribe("dragend",O);A.unsubscribe("click",Z.handleClick);A.unsubscribe("longpress",y);A.unsubscribe("drag",w);A.unsubscribe("dragstop",z);J.unsubscribe(ops.OdtDocument.signalOperationEnd,ja.trigger);J.unsubscribe(ops.Document.signalCursorAdded,ha.registerCursor);J.unsubscribe(ops.Document.signalCursorRemoved,ha.removeCursor);J.unsubscribe(ops.OdtDocument.signalOperationEnd,c);a()}var G=runtime.getWindow(),J=h.getOdtDocument(),Q=new core.Async,ea=new core.DomUtils,
P=new odf.OdfUtils,N=new gui.MimeDataExporter,I=new gui.Clipboard(N),B=new gui.KeyboardHandler,V=new gui.KeyboardHandler,M=new gui.KeyboardHandler,$=!1,W=new odf.ObjectNameGenerator(J.getOdfCanvas().odfContainer(),b),S=!1,fa=null,ma,ca=null,A=new gui.EventManager(J),Y=new gui.AnnotationController(h,b),R=new gui.DirectFormattingController(h,b,W,d.directParagraphStylingEnabled),aa=new gui.TextController(h,b,R.createCursorStyleOp,R.createParagraphStyleOps),ia=new gui.ImageController(h,b,W),ga=new gui.ImageSelector(J.getOdfCanvas()),
da=gui.SelectionMover.createPositionIterator(J.getRootNode()),la,ja,na=new gui.PlainTextPasteboard(J,b),ha=new gui.InputMethodEditor(b,A),ka=0,Z=new gui.HyperlinkClickHandler(J.getRootNode),ra=new gui.HyperlinkController(h,b),K=new gui.SelectionController(h,b),E=gui.KeyboardHandler.Modifier,C=gui.KeyboardHandler.KeyCode,oa=-1!==G.navigator.appVersion.toLowerCase().indexOf("mac"),qa=-1!==["iPad","iPod","iPhone"].indexOf(G.navigator.platform),pa;runtime.assert(null!==G,"Expected to be run in an environment which has a global window, like a browser.");
this.undo=f;this.redo=v;this.insertLocalCursor=function(){runtime.assert(void 0===h.getOdtDocument().getCursor(b),"Inserting local cursor a second time.");var a=new ops.OpAddCursor;a.init({memberid:b});h.enqueue([a]);A.focus()};this.removeLocalCursor=function(){runtime.assert(void 0!==h.getOdtDocument().getCursor(b),"Removing local cursor without inserting before.");var a=new ops.OpRemoveCursor;a.init({memberid:b});h.enqueue([a])};this.startEditing=function(){ha.subscribe(gui.InputMethodEditor.signalCompositionStart,
aa.removeCurrentSelection);ha.subscribe(gui.InputMethodEditor.signalCompositionEnd,T);A.subscribe("beforecut",q);A.subscribe("cut",k);A.subscribe("beforepaste",a);A.subscribe("paste",r);G.addEventListener("focus",Z.showTextCursor,!1);ca&&ca.initialize();ha.setEditing(!0);Z.setModifier(oa?gui.HyperlinkClickHandler.Modifier.Meta:gui.HyperlinkClickHandler.Modifier.Ctrl);B.bind(C.Backspace,E.None,X(aa.removeTextByBackspaceKey),!0);B.bind(C.Delete,E.None,aa.removeTextByDeleteKey);B.bind(C.Tab,E.None,D(function(){aa.insertText("\t");
return!0}));oa?(B.bind(C.Clear,E.None,aa.removeCurrentSelection),B.bind(C.B,E.Meta,D(R.toggleBold)),B.bind(C.I,E.Meta,D(R.toggleItalic)),B.bind(C.U,E.Meta,D(R.toggleUnderline)),B.bind(C.L,E.MetaShift,D(R.alignParagraphLeft)),B.bind(C.E,E.MetaShift,D(R.alignParagraphCenter)),B.bind(C.R,E.MetaShift,D(R.alignParagraphRight)),B.bind(C.J,E.MetaShift,D(R.alignParagraphJustified)),B.bind(C.C,E.MetaShift,Y.addAnnotation),B.bind(C.Z,E.Meta,f),B.bind(C.Z,E.MetaShift,v),B.bind(C.LeftMeta,E.Meta,Z.showPointerCursor),
B.bind(C.MetaInMozilla,E.Meta,Z.showPointerCursor),M.bind(C.LeftMeta,E.None,Z.showTextCursor),M.bind(C.MetaInMozilla,E.None,Z.showTextCursor)):(B.bind(C.B,E.Ctrl,D(R.toggleBold)),B.bind(C.I,E.Ctrl,D(R.toggleItalic)),B.bind(C.U,E.Ctrl,D(R.toggleUnderline)),B.bind(C.L,E.CtrlShift,D(R.alignParagraphLeft)),B.bind(C.E,E.CtrlShift,D(R.alignParagraphCenter)),B.bind(C.R,E.CtrlShift,D(R.alignParagraphRight)),B.bind(C.J,E.CtrlShift,D(R.alignParagraphJustified)),B.bind(C.C,E.CtrlAlt,Y.addAnnotation),B.bind(C.Z,
E.Ctrl,f),B.bind(C.Z,E.CtrlShift,v),B.bind(C.Ctrl,E.Ctrl,Z.showPointerCursor),M.bind(C.Ctrl,E.None,Z.showTextCursor));V.setDefault(D(function(a){var b;b=null===a.which||void 0===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(aa.insertText(b),!0)}));V.bind(C.Enter,E.None,D(aa.enqueueParagraphSplittingOps))};this.endEditing=function(){ha.unsubscribe(gui.InputMethodEditor.signalCompositionStart,aa.removeCurrentSelection);
ha.unsubscribe(gui.InputMethodEditor.signalCompositionEnd,T);A.unsubscribe("cut",k);A.unsubscribe("beforecut",q);A.unsubscribe("paste",r);A.unsubscribe("beforepaste",a);G.removeEventListener("focus",Z.showTextCursor,!1);ha.setEditing(!1);Z.setModifier(gui.HyperlinkClickHandler.Modifier.None);B.bind(C.Backspace,E.None,function(){return!0},!0);B.unbind(C.Delete,E.None);B.unbind(C.Tab,E.None);oa?(B.unbind(C.Clear,E.None),B.unbind(C.B,E.Meta),B.unbind(C.I,E.Meta),B.unbind(C.U,E.Meta),B.unbind(C.L,E.MetaShift),
B.unbind(C.E,E.MetaShift),B.unbind(C.R,E.MetaShift),B.unbind(C.J,E.MetaShift),B.unbind(C.C,E.MetaShift),B.unbind(C.Z,E.Meta),B.unbind(C.Z,E.MetaShift),B.unbind(C.LeftMeta,E.Meta),B.unbind(C.MetaInMozilla,E.Meta),M.unbind(C.LeftMeta,E.None),M.unbind(C.MetaInMozilla,E.None)):(B.unbind(C.B,E.Ctrl),B.unbind(C.I,E.Ctrl),B.unbind(C.U,E.Ctrl),B.unbind(C.L,E.CtrlShift),B.unbind(C.E,E.CtrlShift),B.unbind(C.R,E.CtrlShift),B.unbind(C.J,E.CtrlShift),B.unbind(C.C,E.CtrlAlt),B.unbind(C.Z,E.Ctrl),B.unbind(C.Z,E.CtrlShift),
B.unbind(C.Ctrl,E.Ctrl),M.unbind(C.Ctrl,E.None));V.setDefault(null);V.unbind(C.Enter,E.None)};this.getInputMemberId=function(){return b};this.getSession=function(){return h};this.setUndoManager=function(a){ca&&ca.unsubscribe(gui.UndoManager.signalUndoStackChanged,l);if(ca=a)ca.setDocument(J),ca.setPlaybackFunction(h.enqueue),ca.subscribe(gui.UndoManager.signalUndoStackChanged,l)};this.getUndoManager=function(){return ca};this.getAnnotationController=function(){return Y};this.getDirectFormattingController=
function(){return R};this.getHyperlinkController=function(){return ra};this.getImageController=function(){return ia};this.getSelectionController=function(){return K};this.getTextController=function(){return aa};this.getEventManager=function(){return A};this.getKeyboardHandlers=function(){return{keydown:B,keypress:V}};this.destroy=function(a){var b=[];pa&&b.push(pa.destroy);b=b.concat([la.destroy,ja.destroy,R.destroy,ha.destroy,A.destroy,ba]);runtime.clearTimeout(ma);Q.destroyAll(b,a)};la=new core.ScheduledTask(x,
0);ja=new core.ScheduledTask(function(){var a=J.getCursor(b);if(a&&a.getSelectionType()===ops.OdtCursor.RegionSelection&&(a=P.getImageElements(a.getSelectedRange())[0])){ga.select(a.parentNode);return}ga.clearSelection()},0);B.bind(C.Left,E.None,D(K.moveCursorToLeft));B.bind(C.Right,E.None,D(K.moveCursorToRight));B.bind(C.Up,E.None,D(K.moveCursorUp));B.bind(C.Down,E.None,D(K.moveCursorDown));B.bind(C.Left,E.Shift,D(K.extendSelectionToLeft));B.bind(C.Right,E.Shift,D(K.extendSelectionToRight));B.bind(C.Up,
E.Shift,D(K.extendSelectionUp));B.bind(C.Down,E.Shift,D(K.extendSelectionDown));B.bind(C.Home,E.None,D(K.moveCursorToLineStart));B.bind(C.End,E.None,D(K.moveCursorToLineEnd));B.bind(C.Home,E.Ctrl,D(K.moveCursorToDocumentStart));B.bind(C.End,E.Ctrl,D(K.moveCursorToDocumentEnd));B.bind(C.Home,E.Shift,D(K.extendSelectionToLineStart));B.bind(C.End,E.Shift,D(K.extendSelectionToLineEnd));B.bind(C.Up,E.CtrlShift,D(K.extendSelectionToParagraphStart));B.bind(C.Down,E.CtrlShift,D(K.extendSelectionToParagraphEnd));
B.bind(C.Home,E.CtrlShift,D(K.extendSelectionToDocumentStart));B.bind(C.End,E.CtrlShift,D(K.extendSelectionToDocumentEnd));oa?(B.bind(C.Left,E.Alt,D(K.moveCursorBeforeWord)),B.bind(C.Right,E.Alt,D(K.moveCursorPastWord)),B.bind(C.Left,E.Meta,D(K.moveCursorToLineStart)),B.bind(C.Right,E.Meta,D(K.moveCursorToLineEnd)),B.bind(C.Home,E.Meta,D(K.moveCursorToDocumentStart)),B.bind(C.End,E.Meta,D(K.moveCursorToDocumentEnd)),B.bind(C.Left,E.AltShift,D(K.extendSelectionBeforeWord)),B.bind(C.Right,E.AltShift,
D(K.extendSelectionPastWord)),B.bind(C.Left,E.MetaShift,D(K.extendSelectionToLineStart)),B.bind(C.Right,E.MetaShift,D(K.extendSelectionToLineEnd)),B.bind(C.Up,E.AltShift,D(K.extendSelectionToParagraphStart)),B.bind(C.Down,E.AltShift,D(K.extendSelectionToParagraphEnd)),B.bind(C.Up,E.MetaShift,D(K.extendSelectionToDocumentStart)),B.bind(C.Down,E.MetaShift,D(K.extendSelectionToDocumentEnd)),B.bind(C.A,E.Meta,D(K.extendSelectionToEntireDocument))):(B.bind(C.Left,E.Ctrl,D(K.moveCursorBeforeWord)),B.bind(C.Right,
E.Ctrl,D(K.moveCursorPastWord)),B.bind(C.Left,E.CtrlShift,D(K.extendSelectionBeforeWord)),B.bind(C.Right,E.CtrlShift,D(K.extendSelectionPastWord)),B.bind(C.A,E.Ctrl,D(K.extendSelectionToEntireDocument)));qa&&(pa=new gui.IOSSafariSupport(A));A.subscribe("keydown",B.handleEvent);A.subscribe("keypress",V.handleEvent);A.subscribe("keyup",M.handleEvent);A.subscribe("copy",e);A.subscribe("mousedown",t);A.subscribe("mousemove",la.trigger);A.subscribe("mouseup",U);A.subscribe("contextmenu",H);A.subscribe("dragstart",
L);A.subscribe("dragend",O);A.subscribe("click",Z.handleClick);A.subscribe("longpress",y);A.subscribe("drag",w);A.subscribe("dragstop",z);J.subscribe(ops.OdtDocument.signalOperationEnd,ja.trigger);J.subscribe(ops.Document.signalCursorAdded,ha.registerCursor);J.subscribe(ops.Document.signalCursorRemoved,ha.removeCursor);J.subscribe(ops.OdtDocument.signalOperationEnd,c)};return gui.SessionController})();
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
gui.CaretManager=function(m){function h(a){return c.hasOwnProperty(a)?c[a]:null}function b(){return Object.keys(c).map(function(a){return c[a]})}function g(a){var b=c[a];b&&(b.destroy(function(){}),delete c[a])}function d(a){a=a.getMemberId();a===m.getInputMemberId()&&(a=h(a))&&a.refreshCursorBlinking()}function n(){var a=h(m.getInputMemberId());w=!1;a&&a.ensureVisible()}function p(){var a=h(m.getInputMemberId());a&&(a.handleUpdate(),w||(w=!0,v=runtime.setTimeout(n,50)))}function k(a){a.memberId===
m.getInputMemberId()&&p()}function q(){var a=h(m.getInputMemberId());a&&a.setFocus()}function e(){var a=h(m.getInputMemberId());a&&a.removeFocus()}function r(){var a=h(m.getInputMemberId());a&&a.show()}function a(){var a=h(m.getInputMemberId());a&&a.hide()}var c={},l=new core.Async,f=runtime.getWindow(),v,w=!1;this.registerCursor=function(a,b,d){var f=a.getMemberId();b=new gui.Caret(a,b,d);d=m.getEventManager();c[f]=b;f===m.getInputMemberId()?(runtime.log("Starting to track input on new cursor of "+
f),a.subscribe(ops.OdtCursor.signalCursorUpdated,p),b.setOverlayElement(d.getEventTrap())):a.subscribe(ops.OdtCursor.signalCursorUpdated,b.handleUpdate);return b};this.getCaret=h;this.getCarets=b;this.destroy=function(h){var n=m.getSession().getOdtDocument(),p=m.getEventManager(),u=b().map(function(a){return a.destroy});runtime.clearTimeout(v);n.unsubscribe(ops.OdtDocument.signalParagraphChanged,k);n.unsubscribe(ops.Document.signalCursorMoved,d);n.unsubscribe(ops.Document.signalCursorRemoved,g);p.unsubscribe("focus",
q);p.unsubscribe("blur",e);f.removeEventListener("focus",r,!1);f.removeEventListener("blur",a,!1);c={};l.destroyAll(u,h)};(function(){var b=m.getSession().getOdtDocument(),c=m.getEventManager();b.subscribe(ops.OdtDocument.signalParagraphChanged,k);b.subscribe(ops.Document.signalCursorMoved,d);b.subscribe(ops.Document.signalCursorRemoved,g);c.subscribe("focus",q);c.subscribe("blur",e);f.addEventListener("focus",r,!1);f.addEventListener("blur",a,!1)})()};
// Input 97
gui.EditInfoHandle=function(m){var h=[],b,g=m.ownerDocument,d=g.documentElement.namespaceURI;this.setEdits=function(m){h=m;var p,k,q,e;b.innerHTML="";for(m=0;m<h.length;m+=1)p=g.createElementNS(d,"div"),p.className="editInfo",k=g.createElementNS(d,"span"),k.className="editInfoColor",k.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[m].memberid),q=g.createElementNS(d,"span"),q.className="editInfoAuthor",q.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[m].memberid),
e=g.createElementNS(d,"span"),e.className="editInfoTime",e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[m].memberid),e.innerHTML=h[m].time,p.appendChild(k),p.appendChild(q),p.appendChild(e),b.appendChild(p)};this.show=function(){b.style.display="block"};this.hide=function(){b.style.display="none"};this.destroy=function(d){m.removeChild(b);d()};b=g.createElementNS(d,"div");b.setAttribute("class","editInfoHandle");b.style.display="none";m.appendChild(b)};
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
gui.EditInfoMarker=function(m,h){function b(b,a){return runtime.setTimeout(function(){p.style.opacity=b},a)}var g=this,d,n,p,k,q,e;this.addEdit=function(d,a){var c=Date.now()-a;m.addEdit(d,a);n.setEdits(m.getSortedEdits());p.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",d);runtime.clearTimeout(q);runtime.clearTimeout(e);1E4>c?(k=b(1,0),q=b(0.5,1E4-c),e=b(0.2,2E4-c)):1E4<=c&&2E4>c?(k=b(0.5,0),e=b(0.2,2E4-c)):k=b(0.2,0)};this.getEdits=function(){return m.getEdits()};this.clearEdits=
function(){m.clearEdits();n.setEdits([]);p.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&p.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return m};this.show=function(){p.style.display="block"};this.hide=function(){g.hideHandle();p.style.display="none"};this.showHandle=function(){n.show()};this.hideHandle=function(){n.hide()};this.destroy=function(b){runtime.clearTimeout(k);runtime.clearTimeout(q);runtime.clearTimeout(e);d.removeChild(p);
n.destroy(function(a){a?b(a):m.destroy(b)})};(function(){var b=m.getOdtDocument().getDOMDocument();p=b.createElementNS(b.documentElement.namespaceURI,"div");p.setAttribute("class","editInfoMarker");p.onmouseover=function(){g.showHandle()};p.onmouseout=function(){g.hideHandle()};d=m.getNode();d.appendChild(p);n=new gui.EditInfoHandle(d);h||g.hide()})()};
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
this.registerCursor=function(g,d){var h=g.getMemberId(),p=new m(g);d?p.show():p.hide();return b[h]=p};this.destroy=function(b){function d(h,k){k?b(k):h<m.length?m[h].destroy(function(b){d(h+1,b)}):b()}var m=h();d(0,void 0)}};
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
(function(){gui.SessionView=function(m,h,b,g,d){function n(a,b,c){function d(b,c,f){c=b+'[editinfo|memberid="'+a+'"]'+f+c;a:{var e=l.firstChild;for(b=b+'[editinfo|memberid="'+a+'"]'+f+"{";e;){if(e.nodeType===Node.TEXT_NODE&&0===e.data.indexOf(b)){b=e;break a}e=e.nextSibling}b=null}b?b.data=c:l.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator","{ background-color: "+c+"; }","");d(".selectionOverlay","{ fill: "+c+"; stroke: "+c+";}","");a!==gui.ShadowCursor.ShadowCursorMemberId&&a!==h||d(".webodf-touchEnabled .selectionOverlay","{ display: block; }"," > .draggable")}function p(a){var b,c;for(c in v)v.hasOwnProperty(c)&&(b=v[c],a?b.show():b.hide())}function k(a){g.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function q(a){var b=a.getMemberId();a=a.getProperties();n(b,a.fullName,a.color);h===b&&n("","",
a.color)}function e(a){var c=a.getMemberId(),f=b.getOdtDocument().getMember(c).getProperties();g.registerCursor(a,z,x);d.registerCursor(a,!0);if(a=g.getCaret(c))a.setAvatarImageUrl(f.imageUrl),a.setColor(f.color);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function r(a){a=a.getMemberId();var b=d.getSelectionView(h),c=d.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),f=g.getCaret(h);a===h?(c.hide(),b&&b.show(),f&&f.show()):a===gui.ShadowCursor.ShadowCursorMemberId&&
(c.show(),b&&b.hide(),f&&f.hide())}function a(a){d.removeSelectionView(a)}function c(a){var c=a.paragraphElement,d=a.memberId;a=a.timeStamp;var e,g="",l=c.getElementsByTagNameNS(f,"editinfo").item(0);l?(g=l.getAttributeNS(f,"id"),e=v[g]):(g=Math.random().toString(),e=new ops.EditInfo(c,b.getOdtDocument()),e=new gui.EditInfoMarker(e,w),l=c.getElementsByTagNameNS(f,"editinfo").item(0),l.setAttributeNS(f,"id",g),v[g]=e);e.addEdit(d,new Date(a))}var l,f="urn:webodf:names:editinfo",v={},w=void 0!==m.editInfoMarkersInitiallyVisible?
Boolean(m.editInfoMarkersInitiallyVisible):!0,z=void 0!==m.caretAvatarsInitiallyVisible?Boolean(m.caretAvatarsInitiallyVisible):!0,x=void 0!==m.caretBlinksOnRangeSelect?Boolean(m.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=function(){w||(w=!0,p(w))};this.hideEditInfoMarkers=function(){w&&(w=!1,p(w))};this.showCaretAvatars=function(){z||(z=!0,k(z))};this.hideCaretAvatars=function(){z&&(z=!1,k(z))};this.getSession=function(){return b};this.getCaret=function(a){return g.getCaret(a)};this.destroy=
function(f){var g=b.getOdtDocument(),h=Object.keys(v).map(function(a){return v[a]});g.unsubscribe(ops.Document.signalMemberAdded,q);g.unsubscribe(ops.Document.signalMemberUpdated,q);g.unsubscribe(ops.Document.signalCursorAdded,e);g.unsubscribe(ops.Document.signalCursorRemoved,a);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,c);g.unsubscribe(ops.Document.signalCursorMoved,r);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,d.rerenderSelectionViews);g.unsubscribe(ops.OdtDocument.signalTableAdded,
d.rerenderSelectionViews);g.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,d.rerenderSelectionViews);l.parentNode.removeChild(l);(function F(a,b){b?f(b):a<h.length?h[a].destroy(function(b){F(a+1,b)}):f()})(0,void 0)};(function(){var f=b.getOdtDocument(),g=document.getElementsByTagName("head").item(0);f.subscribe(ops.Document.signalMemberAdded,q);f.subscribe(ops.Document.signalMemberUpdated,q);f.subscribe(ops.Document.signalCursorAdded,e);f.subscribe(ops.Document.signalCursorRemoved,a);f.subscribe(ops.OdtDocument.signalParagraphChanged,
c);f.subscribe(ops.Document.signalCursorMoved,r);f.subscribe(ops.OdtDocument.signalParagraphChanged,d.rerenderSelectionViews);f.subscribe(ops.OdtDocument.signalTableAdded,d.rerenderSelectionViews);f.subscribe(ops.OdtDocument.signalParagraphStyleModified,d.rerenderSelectionViews);l=document.createElementNS(g.namespaceURI,"style");l.type="text/css";l.media="screen, print, handheld, projection";l.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));l.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));
g.appendChild(l)})()}})();
// Input 104
gui.SvgSelectionView=function(m){function h(){var a=l.getRootNode();f!==a&&(f=a,v=f.parentNode.parentNode.parentNode,v.appendChild(x),x.setAttribute("class","selectionOverlay"),u.setAttribute("class","draggable"),s.setAttribute("class","draggable"),u.setAttribute("end","left"),s.setAttribute("end","right"),u.setAttribute("r",8),s.setAttribute("r",8),x.appendChild(t),x.appendChild(u),x.appendChild(s))}function b(a){var b=F.getBoundingClientRect(v),c=L.getZoomLevel(),d={};d.top=F.adaptRangeDifferenceToZoomLevel(a.top-
b.top,c);d.left=F.adaptRangeDifferenceToZoomLevel(a.left-b.left,c);d.bottom=F.adaptRangeDifferenceToZoomLevel(a.bottom-b.top,c);d.right=F.adaptRangeDifferenceToZoomLevel(a.right-b.left,c);d.width=F.adaptRangeDifferenceToZoomLevel(a.width,c);d.height=F.adaptRangeDifferenceToZoomLevel(a.height,c);return d}function g(a){a=a.getBoundingClientRect();return Boolean(a&&0!==a.height)}function d(a){var b=y.getTextElements(a,!0,!1),c=a.cloneRange(),d=a.cloneRange();a=a.cloneRange();if(!b.length)return null;
var f;a:{f=0;var e=b[f],l=c.startContainer===e?c.startOffset:0,h=l;c.setStart(e,l);for(c.setEnd(e,h);!g(c);){if(e.nodeType===Node.ELEMENT_NODE&&h<e.childNodes.length)h=e.childNodes.length;else if(e.nodeType===Node.TEXT_NODE&&h<e.length)h+=1;else if(b[f])e=b[f],f+=1,l=h=0;else{f=!1;break a}c.setStart(e,l);c.setEnd(e,h)}f=!0}if(!f)return null;a:{f=b.length-1;e=b[f];h=l=d.endContainer===e?d.endOffset:e.nodeType===Node.TEXT_NODE?e.length:e.childNodes.length;d.setStart(e,l);for(d.setEnd(e,h);!g(d);){if(e.nodeType===
Node.ELEMENT_NODE&&0<l)l=0;else if(e.nodeType===Node.TEXT_NODE&&0<l)l-=1;else if(b[f])e=b[f],f-=1,l=h=e.length||e.childNodes.length;else{b=!1;break a}d.setStart(e,l);d.setEnd(e,h)}b=!0}if(!b)return null;a.setStart(c.startContainer,c.startOffset);a.setEnd(d.endContainer,d.endOffset);return{firstRange:c,lastRange:d,fillerRange:a}}function n(a,b){var c={};c.top=Math.min(a.top,b.top);c.left=Math.min(a.left,b.left);c.right=Math.max(a.right,b.right);c.bottom=Math.max(a.bottom,b.bottom);c.width=c.right-
c.left;c.height=c.bottom-c.top;return c}function p(a,b){b&&0<b.width&&0<b.height&&(a=a?n(a,b):b);return a}function k(a){function b(a){H.setUnfilteredPosition(a,0);return v.acceptNode(a)===U&&s.acceptPosition(H)===U?U:T}function c(a){var d=null;b(a)===U&&(d=F.getBoundingClientRect(a));return d}var d=a.commonAncestorContainer,f=a.startContainer,e=a.endContainer,g=a.startOffset,h=a.endOffset,k,m,n=null,q,r=w.createRange(),s,v=new odf.OdfNodeFilter,t;if(f===d||e===d)return r=a.cloneRange(),n=r.getBoundingClientRect(),
r.detach(),n;for(a=f;a.parentNode!==d;)a=a.parentNode;for(m=e;m.parentNode!==d;)m=m.parentNode;s=l.createRootFilter(f);for(d=a.nextSibling;d&&d!==m;)q=c(d),n=p(n,q),d=d.nextSibling;if(y.isParagraph(a))n=p(n,F.getBoundingClientRect(a));else if(a.nodeType===Node.TEXT_NODE)d=a,r.setStart(d,g),r.setEnd(d,d===m?h:d.length),q=r.getBoundingClientRect(),n=p(n,q);else for(t=w.createTreeWalker(a,NodeFilter.SHOW_TEXT,b,!1),d=t.currentNode=f;d&&d!==e;)r.setStart(d,g),r.setEnd(d,d.length),q=r.getBoundingClientRect(),
n=p(n,q),k=d,g=0,d=t.nextNode();k||(k=f);if(y.isParagraph(m))n=p(n,F.getBoundingClientRect(m));else if(m.nodeType===Node.TEXT_NODE)d=m,r.setStart(d,d===a?g:0),r.setEnd(d,h),q=r.getBoundingClientRect(),n=p(n,q);else for(t=w.createTreeWalker(m,NodeFilter.SHOW_TEXT,b,!1),d=t.currentNode=e;d&&d!==k;)if(r.setStart(d,0),r.setEnd(d,h),q=r.getBoundingClientRect(),n=p(n,q),d=t.previousNode())h=d.length;return n}function q(a,b){var c=a.getBoundingClientRect(),d={width:0};d.top=c.top;d.bottom=c.bottom;d.height=
c.height;d.left=d.right=b?c.right:c.left;return d}function e(){var a=m.getSelectedRange(),c;if(c=O&&m.getSelectionType()===ops.OdtCursor.RangeSelection&&!a.collapsed){h();var a=d(a),f,e,g,l,p,r,v,w;if(a){c=a.firstRange;f=a.lastRange;e=a.fillerRange;g=b(q(c,!1));p=b(q(f,!0));l=(l=k(e))?b(l):n(g,p);r=l.left;v=g.left+Math.max(0,l.width-(g.left-l.left));l=Math.min(g.top,p.top);w=p.top+p.height;r=[{x:g.left,y:l+g.height},{x:g.left,y:l},{x:v,y:l},{x:v,y:w-p.height},{x:p.right,y:w-p.height},{x:p.right,y:w},
{x:r,y:w},{x:r,y:l+g.height},{x:g.left,y:l+g.height}];v="";var y;for(y=0;y<r.length;y+=1)v+=r[y].x+","+r[y].y+" ";t.setAttribute("points",v);u.setAttribute("cx",g.left);u.setAttribute("cy",l+g.height/2);s.setAttribute("cx",p.right);s.setAttribute("cy",w-p.height/2);c.detach();f.detach();e.detach()}c=Boolean(a)}x.style.display=c?"block":"none"}function r(a){O&&a===m&&X.trigger()}function a(a){a=8/a;u.setAttribute("r",a);s.setAttribute("r",a)}function c(b){v.removeChild(x);m.getDocument().unsubscribe(ops.Document.signalCursorMoved,
r);L.unsubscribe(gui.ZoomHelper.signalZoomChanged,a);b()}var l=m.getDocument(),f,v,w=l.getDOMDocument(),z=new core.Async,x=w.createElementNS("http://www.w3.org/2000/svg","svg"),t=w.createElementNS("http://www.w3.org/2000/svg","polygon"),u=w.createElementNS("http://www.w3.org/2000/svg","circle"),s=w.createElementNS("http://www.w3.org/2000/svg","circle"),y=new odf.OdfUtils,F=new core.DomUtils,L=l.getCanvas().getZoomHelper(),O=!0,H=gui.SelectionMover.createPositionIterator(l.getRootNode()),U=NodeFilter.FILTER_ACCEPT,
T=NodeFilter.FILTER_REJECT,X;this.rerender=function(){O&&X.trigger()};this.show=function(){O=!0;X.trigger()};this.hide=function(){O=!1;X.trigger()};this.destroy=function(a){z.destroyAll([X.destroy,c],a)};(function(){var b=m.getMemberId();X=new core.ScheduledTask(e,0);h();x.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);m.getDocument().subscribe(ops.Document.signalCursorMoved,r);L.subscribe(gui.ZoomHelper.signalZoomChanged,a);a(L.getZoomLevel())})()};
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
gui.UndoStateRules=function(){function m(b,g){var h=b.length;this.previous=function(){for(h-=1;0<=h;h-=1)if(g(b[h]))return b[h];return null}}function h(b){b=b.spec();var g;b.hasOwnProperty("position")&&(g=b.position);return g}function b(b){return b.isEdit}function g(b,g,m){if(!m)return m=h(b)-h(g),0===m||1===Math.abs(m);b=h(b);g=h(g);m=h(m);return b-g===g-m}this.isEditOperation=b;this.isPartOfOperationSet=function(d,h){var p=void 0!==d.group,k;if(!d.isEdit||0===h.length)return!0;k=h[h.length-1];if(p&&
d.group===k.group)return!0;a:switch(d.spec().optype){case "RemoveText":case "InsertText":k=!0;break a;default:k=!1}if(k&&h.some(b)){if(p){var q;p=d.spec().optype;k=new m(h,b);var e=k.previous(),r=null,a,c;runtime.assert(Boolean(e),"No edit operations found in state");c=e.group;runtime.assert(void 0!==c,"Operation has no group");for(a=1;e&&e.group===c;){if(p===e.spec().optype){q=e;break}e=k.previous()}if(q){for(e=k.previous();e;){if(e.group!==c){if(2===a)break;c=e.group;a+=1}if(p===e.spec().optype){r=
e;break}e=k.previous()}q=g(d,q,r)}else q=!1;return q}q=d.spec().optype;p=new m(h,b);k=p.previous();runtime.assert(Boolean(k),"No edit operations found in state");q=q===k.spec().optype?g(d,k,p.previous()):!1;return q}return!1}};
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
gui.TrivialUndoManager=function(m){function h(a){0<a.length&&(u=!0,l(a),u=!1)}function b(){x.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:q.hasUndoStates(),redoAvailable:q.hasRedoStates()})}function g(){v!==c&&v!==w[w.length-1]&&w.push(v)}function d(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);r.normalizeTextNodes(b)}function n(a){return Object.keys(a).map(function(b){return a[b]})}function p(a){function b(a){var f=a.spec();if(e[f.memberid])switch(f.optype){case "AddCursor":c[f.memberid]||
(c[f.memberid]=a,delete e[f.memberid],g-=1);break;case "MoveCursor":d[f.memberid]||(d[f.memberid]=a)}}var c={},d={},e={},g,l=a.pop();f.getMemberIds().forEach(function(a){e[a]=!0});for(g=Object.keys(e).length;l&&0<g;)l.reverse(),l.forEach(b),l=a.pop();return n(c).concat(n(d))}function k(){var l=a=f.cloneDocumentElement();r.getElementsByTagNameNS(l,e,"cursor").forEach(d);r.getElementsByTagNameNS(l,e,"anchor").forEach(d);g();v=c=p([c].concat(w));w.length=0;z.length=0;b()}var q=this,e="urn:webodf:names:cursor",
r=new core.DomUtils,a,c=[],l,f,v=[],w=[],z=[],x=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),t=m||new gui.UndoStateRules,u=!1;this.subscribe=function(a,b){x.subscribe(a,b)};this.unsubscribe=function(a,b){x.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<w.length};this.hasRedoStates=function(){return 0<z.length};this.setDocument=function(a){f=
a};this.purgeInitialState=function(){w.length=0;z.length=0;c.length=0;v.length=0;a=null;b()};this.setInitialState=k;this.initialize=function(){a||k()};this.setPlaybackFunction=function(a){l=a};this.onOperationExecuted=function(a){u||(t.isEditOperation(a)&&(v===c||0<z.length)||!t.isPartOfOperationSet(a,v)?(z.length=0,g(),v=[a],w.push(v),x.emit(gui.UndoManager.signalUndoStateCreated,{operations:v}),b()):(v.push(a),x.emit(gui.UndoManager.signalUndoStateModified,{operations:v})))};this.moveForward=function(a){for(var c=
0,d;a&&z.length;)d=z.pop(),w.push(d),h(d),a-=1,c+=1;c&&(v=w[w.length-1],b());return c};this.moveBackward=function(d){for(var e=0;d&&w.length;)z.push(w.pop()),d-=1,e+=1;e&&(f.setDocumentElement(a.cloneNode(!0)),x.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),f.getMemberIds().forEach(function(a){f.removeCursor(a)}),h(c),w.forEach(h),v=w[w.length-1]||c,b());return e}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
ops.OperationTransformMatrix=function(){function m(a){a.position+=a.length;a.length*=-1}function h(a){var b=0>a.length;b&&m(a);return b}function b(a,b){function d(e){a[e]===b&&f.push(e)}var f=[];a&&["style:parent-style-name","style:next-style-name"].forEach(d);return f}function g(a,b){function d(f){a[f]===b&&delete a[f]}a&&["style:parent-style-name","style:next-style-name"].forEach(d)}function d(a){var b={};Object.keys(a).forEach(function(e){b[e]="object"===typeof a[e]?d(a[e]):a[e]});return b}function n(a,
b,d,f){var e,g=!1,h=!1,k,m=[];f&&f.attributes&&(m=f.attributes.split(","));a&&(d||0<m.length)&&Object.keys(a).forEach(function(b){var c=a[b],f;"object"!==typeof c&&(d&&(f=d[b]),void 0!==f?(delete a[b],h=!0,f===c&&(delete d[b],g=!0)):-1!==m.indexOf(b)&&(delete a[b],h=!0))});if(b&&b.attributes&&(d||0<m.length)){k=b.attributes.split(",");for(f=0;f<k.length;f+=1)if(e=k[f],d&&void 0!==d[e]||m&&-1!==m.indexOf(e))k.splice(f,1),f-=1,h=!0;0<k.length?b.attributes=k.join(","):delete b.attributes}return{majorChanged:g,
minorChanged:h}}function p(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function k(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function q(a,b,d,f,e){var g=a?a[e]:null,h=b?b[e]:null,m=d?d[e]:null,q=f?f[e]:null,r;r=n(g,h,m,q);g&&!p(g)&&delete a[e];h&&!k(h)&&delete b[e];m&&!p(m)&&delete d[e];q&&!k(q)&&delete f[e];return r}function e(a,b){return{opSpecsA:[a],opSpecsB:[b]}}var r;r={AddCursor:{AddCursor:e,AddMember:e,AddStyle:e,ApplyDirectStyling:e,
InsertText:e,MoveCursor:e,RemoveCursor:e,RemoveMember:e,RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},AddMember:{AddStyle:e,InsertText:e,MoveCursor:e,RemoveCursor:e,RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMetadata:e,UpdateParagraphStyle:e},AddStyle:{AddStyle:e,ApplyDirectStyling:e,InsertText:e,MoveCursor:e,RemoveCursor:e,RemoveMember:e,RemoveStyle:function(a,c){var d,f=[a],e=[c];a.styleFamily===
c.styleFamily&&(d=b(a.setProperties,c.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:c.memberid,timestamp:c.timestamp,styleName:a.styleName,removedProperties:{attributes:d.join(",")}},e.unshift(d)),g(a.setProperties,c.styleName));return{opSpecsA:f,opSpecsB:e}},RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},ApplyDirectStyling:{ApplyDirectStyling:function(a,b,e){var f,g,h,k,m,n,r,s;k=[a];h=[b];if(!(a.position+a.length<=b.position||
a.position>=b.position+b.length)){f=e?a:b;g=e?b:a;if(a.position!==b.position||a.length!==b.length)n=d(f),r=d(g);b=q(g.setProperties,null,f.setProperties,null,"style:text-properties");if(b.majorChanged||b.minorChanged)h=[],a=[],k=f.position+f.length,m=g.position+g.length,g.position<f.position?b.minorChanged&&(s=d(r),s.length=f.position-g.position,a.push(s),g.position=f.position,g.length=m-g.position):f.position<g.position&&b.majorChanged&&(s=d(n),s.length=g.position-f.position,h.push(s),f.position=
g.position,f.length=k-f.position),m>k?b.minorChanged&&(n=r,n.position=k,n.length=m-k,a.push(n),g.length=k-g.position):k>m&&b.majorChanged&&(n.position=m,n.length=k-m,h.push(n),f.length=m-f.position),f.setProperties&&p(f.setProperties)&&h.push(f),g.setProperties&&p(g.setProperties)&&a.push(g),e?(k=h,h=a):k=a}return{opSpecsA:k,opSpecsB:h}},InsertText:function(a,b){b.position<=a.position?a.position+=b.text.length:b.position<=a.position+a.length&&(a.length+=b.text.length);return{opSpecsA:[a],opSpecsB:[b]}},
MoveCursor:e,RemoveCursor:e,RemoveStyle:e,RemoveText:function(a,b){var d=a.position+a.length,f=b.position+b.length,e=[a],g=[b];f<=a.position?a.position-=b.length:b.position<d&&(a.position<b.position?a.length=f<d?a.length-b.length:b.position-a.position:(a.position=b.position,f<d?a.length=d-f:e=[]));return{opSpecsA:e,opSpecsB:g}},SetParagraphStyle:e,SplitParagraph:function(a,b){b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMetadata:e,
UpdateParagraphStyle:e},InsertText:{InsertText:function(a,b,d){a.position<b.position?b.position+=a.text.length:a.position>b.position?a.position+=b.text.length:d?b.position+=a.text.length:a.position+=b.text.length;return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:function(a,b){var d=h(b);a.position<b.position?b.position+=a.text.length:a.position<b.position+b.length&&(b.length+=a.text.length);d&&m(b);return{opSpecsA:[a],opSpecsB:[b]}},RemoveCursor:e,RemoveMember:e,RemoveStyle:e,RemoveText:function(a,b){var d;
d=b.position+b.length;var f=[a],e=[b];d<=a.position?a.position-=b.length:a.position<=b.position?b.position+=a.text.length:(b.length=a.position-b.position,d={optype:"RemoveText",memberid:b.memberid,timestamp:b.timestamp,position:a.position+a.text.length,length:d-a.position},e.unshift(d),a.position=b.position);return{opSpecsA:f,opSpecsB:e}},SplitParagraph:function(a,b,d){if(a.position<b.position)b.position+=a.text.length;else if(a.position>b.position)a.position+=1;else return d?b.position+=a.text.length:
a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},MoveCursor:{MoveCursor:e,RemoveCursor:function(a,b){return{opSpecsA:a.memberid===b.memberid?[]:[a],opSpecsB:[b]}},RemoveMember:e,RemoveStyle:e,RemoveText:function(a,b){var d=h(a),f=a.position+a.length,e=b.position+b.length;e<=a.position?a.position-=b.length:b.position<f&&(a.position<b.position?a.length=e<f?a.length-b.length:b.position-a.position:(a.position=b.position,a.length=e<f?f-e:0));
d&&m(a);return{opSpecsA:[a],opSpecsB:[b]}},SetParagraphStyle:e,SplitParagraph:function(a,b){var d=h(a);b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);d&&m(a);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},RemoveCursor:{RemoveCursor:function(a,b){var d=a.memberid===b.memberid;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveMember:e,RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMember:e,UpdateMetadata:e,
UpdateParagraphStyle:e},RemoveMember:{RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMetadata:e,UpdateParagraphStyle:e},RemoveStyle:{RemoveStyle:function(a,b){var d=a.styleName===b.styleName&&a.styleFamily===b.styleFamily;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveText:e,SetParagraphStyle:function(a,b){var d,f=[a],e=[b];"paragraph"===a.styleFamily&&a.styleName===b.styleName&&(d={optype:"SetParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,position:b.position,
styleName:""},f.unshift(d),b.styleName="");return{opSpecsA:f,opSpecsB:e}},SplitParagraph:e,UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:function(a,c){var d,f=[a],e=[c];"paragraph"===a.styleFamily&&(d=b(c.setProperties,a.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,styleName:c.styleName,removedProperties:{attributes:d.join(",")}},f.unshift(d)),a.styleName===c.styleName?e=[]:g(c.setProperties,a.styleName));return{opSpecsA:f,opSpecsB:e}}},
RemoveText:{RemoveText:function(a,b){var d=a.position+a.length,f=b.position+b.length,e=[a],g=[b];f<=a.position?a.position-=b.length:d<=b.position?b.position-=a.length:b.position<d&&(a.position<b.position?(a.length=f<d?a.length-b.length:b.position-a.position,d<f?(b.position=a.position,b.length=f-d):g=[]):(d<f?b.length-=a.length:b.position<a.position?b.length=a.position-b.position:g=[],f<d?(a.position=b.position,a.length=d-f):e=[]));return{opSpecsA:e,opSpecsB:g}},SplitParagraph:function(a,b){var d=
a.position+a.length,f=[a],e=[b];b.position<=a.position?a.position+=1:b.position<d&&(a.length=b.position-a.position,d={optype:"RemoveText",memberid:a.memberid,timestamp:a.timestamp,position:b.position+1,length:d-b.position},f.unshift(d));a.position+a.length<=b.position?b.position-=a.length:a.position<b.position&&(b.position=a.position);return{opSpecsA:f,opSpecsB:e}},UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},SetParagraphStyle:{UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},SplitParagraph:{SplitParagraph:function(a,
b,d){a.position<b.position?b.position+=1:a.position>b.position?a.position+=1:a.position===b.position&&(d?b.position+=1:a.position+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},UpdateMember:{UpdateMetadata:e,UpdateParagraphStyle:e},UpdateMetadata:{UpdateMetadata:function(a,b,d){var f,e=[a],g=[b];f=d?a:b;a=d?b:a;n(a.setProperties||null,a.removedProperties||null,f.setProperties||null,f.removedProperties||null);f.setProperties&&p(f.setProperties)||f.removedProperties&&
k(f.removedProperties)||(d?e=[]:g=[]);a.setProperties&&p(a.setProperties)||a.removedProperties&&k(a.removedProperties)||(d?g=[]:e=[]);return{opSpecsA:e,opSpecsB:g}},UpdateParagraphStyle:e},UpdateParagraphStyle:{UpdateParagraphStyle:function(a,b,d){var f,e=[a],g=[b];a.styleName===b.styleName&&(f=d?a:b,a=d?b:a,q(a.setProperties,a.removedProperties,f.setProperties,f.removedProperties,"style:paragraph-properties"),q(a.setProperties,a.removedProperties,f.setProperties,f.removedProperties,"style:text-properties"),
n(a.setProperties||null,a.removedProperties||null,f.setProperties||null,f.removedProperties||null),f.setProperties&&p(f.setProperties)||f.removedProperties&&k(f.removedProperties)||(d?e=[]:g=[]),a.setProperties&&p(a.setProperties)||a.removedProperties&&k(a.removedProperties)||(d?g=[]:e=[]));return{opSpecsA:e,opSpecsB:g}}}};this.passUnchanged=e;this.extendTransformations=function(a){Object.keys(a).forEach(function(b){var d=a[b],f,e=r.hasOwnProperty(b);runtime.log((e?"Extending":"Adding")+" map for optypeA: "+
b);e||(r[b]={});f=r[b];Object.keys(d).forEach(function(a){var e=f.hasOwnProperty(a);runtime.assert(b<=a,"Wrong order:"+b+", "+a);runtime.log("  "+(e?"Overwriting":"Adding")+" entry for optypeB: "+a);f[a]=d[a]})})};this.transformOpspecVsOpspec=function(a,b){var d=a.optype<=b.optype,e;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(a));runtime.log(runtime.toJson(b));d||(e=a,a=b,b=e);(e=(e=r[a.optype])&&e[b.optype])?(e=e(a,b,!d),d||null===e||(e={opSpecsA:e.opSpecsB,opSpecsB:e.opSpecsA})):
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
ops.OperationTransformer=function(){function m(d){var g=[];d.forEach(function(d){g.push(b.create(d))});return g}function h(b,m){for(var p,k,q=[],e=[];0<b.length&&m;){p=b.shift();p=g.transformOpspecVsOpspec(p,m);if(!p)return null;q=q.concat(p.opSpecsA);if(0===p.opSpecsB.length){q=q.concat(b);m=null;break}for(;1<p.opSpecsB.length;){k=h(b,p.opSpecsB.shift());if(!k)return null;e=e.concat(k.opSpecsB);b=k.opSpecsA}m=p.opSpecsB.pop()}m&&e.push(m);return{opSpecsA:q,opSpecsB:e}}var b,g=new ops.OperationTransformMatrix;
this.setOperationFactory=function(d){b=d};this.getOperationTransformMatrix=function(){return g};this.transform=function(b,g){for(var p,k=[];0<g.length;){p=h(b,g.shift());if(!p)return null;b=p.opSpecsA;k=k.concat(p.opSpecsB)}return{opsA:m(b),opsB:m(k)}}};
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
var webodf_css='@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n@namespace svgns url(http://www.w3.org/2000/svg);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let\'s not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\noffice|document *::selection {\n  background: transparent;\n}\noffice|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\ndraw|frame {\n  /** make sure frames are above the main body. */\n  z-index: 1;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:"";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\noffice|text[webodfhelper|links="inactive"] text|a {\n    cursor: text;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n    pointer-events: none;\n}\n\ncursor|cursor > .caret {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > .handle {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > .handle > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > .handle.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > .handle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n/** Input Method Editor input pane & behaviours */\n/* not within a cursor */\n#eventTrap {\n    height: auto;\n    display: block;\n    position: absolute;\n    width: 1px;\n    outline: none;\n    opacity: 0;\n    color: rgba(255, 255, 255, 0); /* hide the blinking caret by setting the colour to fully transparent */\n    overflow: hidden; /* The overflow visibility is used to hide and show characters being entered */\n    pointer-events: none;\n}\n\n/* within a cursor */\ncursor|cursor > #composer {\n    text-decoration: underline;\n}\n\ncursor|cursor[cursor|composing="true"] > #composer {\n    display: inline-block;\n    height: auto;\n    width: auto;\n}\n\ncursor|cursor[cursor|composing="true"] {\n    display: inline-block;\n    width: auto;\n    height: inherit;\n}\n\ncursor|cursor[cursor|composing="true"] > .caret {\n    /* during composition, the caret should be pushed along by the composition text, inline with the text */\n    position: static;\n    /* as it is now part of an inline-block, it will no longer need correct to top or height values to align properly */\n    height: auto !important;\n    top: auto !important;\n}\n\neditinfo|editinfo {\n    /* Empty or invisible display:inline elements respond very badly to mouse selection.\n       Inline blocks are much more reliably selectable in Chrome & friends */\n    display: inline-block;\n}\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: \'\u00d7\';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: \'\';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n    color: black;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 15;\n}\n.selectionOverlay > polygon {\n    fill-opacity: 0.3;\n    stroke-opacity: 0.8;\n    stroke-width: 1;\n    fill-rule: evenodd;\n}\n\n.selectionOverlay > .draggable {\n    fill-opacity: 0.8;\n    stroke-opacity: 0;\n    stroke-width: 8;\n    pointer-events: all;\n    display: none;\n\n    -moz-transform-origin: center center;\n    -webkit-transform-origin: center center;\n    -ms-transform-origin: center center;\n    transform-origin: center center;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\ndiv.customScrollbars::-webkit-scrollbar\n{\n    width: 8px;\n    height: 8px;\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-track\n{\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-thumb\n{\n    background-color: #444;\n    border-radius: 4px;\n}\n';
