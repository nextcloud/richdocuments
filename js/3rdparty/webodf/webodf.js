// Input 0
var webodf_version="0.4.2-2050-g8d8fc02-dirty";
// Input 1
function Runtime(){}Runtime.prototype.getVariable=function(m){};Runtime.prototype.toJson=function(m){};Runtime.prototype.fromJson=function(m){};Runtime.prototype.byteArrayFromString=function(m,g){};Runtime.prototype.byteArrayToString=function(m,g){};Runtime.prototype.read=function(m,g,b,k){};Runtime.prototype.readFile=function(m,g,b){};Runtime.prototype.readFileSync=function(m,g){};Runtime.prototype.loadXML=function(m,g){};Runtime.prototype.writeFile=function(m,g,b){};
Runtime.prototype.isFile=function(m,g){};Runtime.prototype.getFileSize=function(m,g){};Runtime.prototype.deleteFile=function(m,g){};Runtime.prototype.log=function(m,g){};Runtime.prototype.setTimeout=function(m,g){};Runtime.prototype.clearTimeout=function(m){};Runtime.prototype.libraryPaths=function(){};Runtime.prototype.currentDirectory=function(){};Runtime.prototype.setCurrentDirectory=function(m){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};
Runtime.prototype.parseXML=function(m){};Runtime.prototype.exit=function(m){};Runtime.prototype.getWindow=function(){};Runtime.prototype.requestAnimationFrame=function(m){};Runtime.prototype.cancelAnimationFrame=function(m){};Runtime.prototype.assert=function(m,g,b){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(m,g){function b(b){var p="",f,d=b.length;for(f=0;f<d;f+=1)p+=String.fromCharCode(b[f]&255);return p}function k(b){var d="",f,k=b.length,e=[],r,a,c,l;for(f=0;f<k;f+=1)r=b[f],128>r?e.push(r):(f+=1,a=b[f],194<=r&&224>r?e.push((r&31)<<6|a&63):(f+=1,c=b[f],224<=r&&240>r?e.push((r&15)<<12|(a&63)<<6|c&63):(f+=1,l=b[f],240<=r&&245>r&&(r=(r&7)<<18|(a&63)<<12|(c&63)<<6|l&63,r-=65536,e.push((r>>10)+55296,(r&1023)+56320))))),1E3===e.length&&(d+=String.fromCharCode.apply(null,
e),e.length=0);return d+String.fromCharCode.apply(null,e)}var d;"utf8"===g?d=k(m):("binary"!==g&&this.log("Unsupported encoding: "+g),d=b(m));return d};Runtime.getVariable=function(m){try{return eval(m)}catch(g){}};Runtime.toJson=function(m){return JSON.stringify(m)};Runtime.fromJson=function(m){return JSON.parse(m)};Runtime.getFunctionName=function(m){return void 0===m.name?(m=/function\s+(\w+)/.exec(m))&&m[1]:m.name};
function BrowserRuntime(m){function g(r){var a=r.length,c,l,h=0;for(c=0;c<a;c+=1)l=r.charCodeAt(c),h+=1+(128<l)+(2048<l),55040<l&&57344>l&&(h+=1,c+=1);return h}function b(r,a,c){var l=r.length,h,b;a=new Uint8Array(new ArrayBuffer(a));c?(a[0]=239,a[1]=187,a[2]=191,b=3):b=0;for(c=0;c<l;c+=1)h=r.charCodeAt(c),128>h?(a[b]=h,b+=1):2048>h?(a[b]=192|h>>>6,a[b+1]=128|h&63,b+=2):55040>=h||57344<=h?(a[b]=224|h>>>12&15,a[b+1]=128|h>>>6&63,a[b+2]=128|h&63,b+=3):(c+=1,h=(h-55296<<10|r.charCodeAt(c)-56320)+65536,
a[b]=240|h>>>18&7,a[b+1]=128|h>>>12&63,a[b+2]=128|h>>>6&63,a[b+3]=128|h&63,b+=4);return a}function k(b){var a=b.length,c=new Uint8Array(new ArrayBuffer(a)),l;for(l=0;l<a;l+=1)c[l]=b.charCodeAt(l)&255;return c}function d(b,a){var c,l,h;void 0!==a?h=b:a=b;m?(l=m.ownerDocument,h&&(c=l.createElement("span"),c.className=h,c.appendChild(l.createTextNode(h)),m.appendChild(c),m.appendChild(l.createTextNode(" "))),c=l.createElement("span"),0<a.length&&"<"===a[0]?c.innerHTML=a:c.appendChild(l.createTextNode(a)),
m.appendChild(c),m.appendChild(l.createElement("br"))):console&&console.log(a);"alert"===h&&alert(a)}function n(r,a,c){if(0!==c.status||c.responseText)if(200===c.status||0===c.status){if(c.response&&"string"!==typeof c.response)"binary"===a?(c=c.response,c=new Uint8Array(c)):c=String(c.response);else if("binary"===a)if(null!==c.responseBody&&"undefined"!==String(typeof VBArray)){c=(new VBArray(c.responseBody)).toArray();var l=c.length,h=new Uint8Array(new ArrayBuffer(l));for(a=0;a<l;a+=1)h[a]=c[a];
c=h}else{(a=c.getResponseHeader("Content-Length"))&&(a=parseInt(a,10));if(a&&a!==c.responseText.length)a:{var l=c.responseText,h=!1,f=g(l);if("number"===typeof a){if(a!==f&&a!==f+3){l=void 0;break a}h=f+3===a;f=a}l=b(l,f,h)}void 0===l&&(l=k(c.responseText));c=l}else c=c.responseText;e[r]=c;r={err:null,data:c}}else r={err:c.responseText||c.statusText,data:null};else r={err:"File "+r+" is empty.",data:null};return r}function p(b,a,c){var l=new XMLHttpRequest;l.open("GET",b,c);l.overrideMimeType&&("binary"!==
a?l.overrideMimeType("text/plain; charset="+a):l.overrideMimeType("text/plain; charset=x-user-defined"));return l}function f(b,a,c){function l(){var l;4===h.readyState&&(l=n(b,a,h),c(l.err,l.data))}if(e.hasOwnProperty(b))c(null,e[b]);else{var h=p(b,a,!0);h.onreadystatechange=l;try{h.send(null)}catch(f){c(f.message,null)}}}var q=this,e={};this.byteArrayFromString=function(r,a){var c;"utf8"===a?c=b(r,g(r),!1):("binary"!==a&&q.log("unknown encoding: "+a),c=k(r));return c};this.byteArrayToString=Runtime.byteArrayToString;
this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=f;this.read=function(b,a,c,l){f(b,"binary",function(h,b){var r=null;if(b){if("string"===typeof b)throw"This should not happen.";r=b.subarray(a,a+c)}l(h,r)})};this.readFileSync=function(b,a){var c=p(b,a,!1),l;try{c.send(null);l=n(b,a,c);if(l.err)throw l.err;if(null===l.data)throw"No data read from "+b+".";}catch(h){throw h;}return l.data};this.writeFile=function(b,a,c){e[b]=a;var l=new XMLHttpRequest,
h;l.open("PUT",b,!0);l.onreadystatechange=function(){4===l.readyState&&(0!==l.status||l.responseText?200<=l.status&&300>l.status||0===l.status?c(null):c("Status "+String(l.status)+": "+l.responseText||l.statusText):c("File "+b+" is empty."))};h=a.buffer&&!l.sendAsBinary?a.buffer:q.byteArrayToString(a,"binary");try{l.sendAsBinary?l.sendAsBinary(h):l.send(h)}catch(f){q.log("HUH? "+f+" "+a),c(f.message)}};this.deleteFile=function(b,a){delete e[b];var c=new XMLHttpRequest;c.open("DELETE",b,!0);c.onreadystatechange=
function(){4===c.readyState&&(200>c.status&&300<=c.status?a(c.responseText):a(null))};c.send(null)};this.loadXML=function(b,a){var c=new XMLHttpRequest;c.open("GET",b,!0);c.overrideMimeType&&c.overrideMimeType("text/xml");c.onreadystatechange=function(){4===c.readyState&&(0!==c.status||c.responseText?200===c.status||0===c.status?a(null,c.responseXML):a(c.responseText,null):a("File "+b+" is empty.",null))};try{c.send(null)}catch(l){a(l.message,null)}};this.isFile=function(b,a){q.getFileSize(b,function(c){a(-1!==
c)})};this.getFileSize=function(b,a){if(e.hasOwnProperty(b)&&"string"!==typeof e[b])a(e[b].length);else{var c=new XMLHttpRequest;c.open("HEAD",b,!0);c.onreadystatechange=function(){if(4===c.readyState){var l=c.getResponseHeader("Content-Length");l?a(parseInt(l,10)):f(b,"binary",function(c,l){c?a(-1):a(l.length)})}};c.send(null)}};this.log=d;this.assert=function(b,a,c){if(!b)throw d("alert","ASSERTION FAILED:\n"+a),c&&c(),a;};this.setTimeout=function(b,a){return setTimeout(function(){b()},a)};this.clearTimeout=
function(b){clearTimeout(b)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.currentDirectory=function(){return""};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(b){return(new DOMParser).parseFromString(b,"text/xml")};this.exit=function(b){d("Calling exit with code "+String(b)+", but exit() is not implemented.")};this.getWindow=function(){return window};this.requestAnimationFrame=
function(b){var a=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame,c=0;if(a)a.bind(window),c=a(b);else return setTimeout(b,15);return c};this.cancelAnimationFrame=function(b){var a=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.msCancelAnimationFrame;a?(a.bind(window),a(b)):clearTimeout(b)}}
function NodeJSRuntime(){function m(b){var e=b.length,f,a=new Uint8Array(new ArrayBuffer(e));for(f=0;f<e;f+=1)a[f]=b[f];return a}function g(b,e,f){function a(a,l){if(a)return f(a,null);if(!l)return f("No data for "+b+".",null);if("string"===typeof l)return f(a,l);f(a,m(l))}b=d.resolve(n,b);"binary"!==e?k.readFile(b,e,a):k.readFile(b,null,a)}var b=this,k=require("fs"),d=require("path"),n="",p,f;this.byteArrayFromString=function(b,e){var f=new Buffer(b,e),a,c=f.length,l=new Uint8Array(new ArrayBuffer(c));
for(a=0;a<c;a+=1)l[a]=f[a];return l};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=g;this.loadXML=function(f,e){g(f,"utf-8",function(r,a){if(r)return e(r,null);if(!a)return e("No data for "+f+".",null);e(null,b.parseXML(a))})};this.writeFile=function(b,e,f){e=new Buffer(e);b=d.resolve(n,b);k.writeFile(b,e,"binary",function(a){f(a||null)})};this.deleteFile=function(b,e){b=d.resolve(n,b);
k.unlink(b,e)};this.read=function(b,e,f,a){b=d.resolve(n,b);k.open(b,"r+",666,function(c,l){if(c)a(c,null);else{var h=new Buffer(f);k.read(l,h,0,f,e,function(c){k.close(l);a(c,m(h))})}})};this.readFileSync=function(b,e){var f;f=k.readFileSync(b,"binary"===e?null:e);if(null===f)throw"File "+b+" could not be read.";"binary"===e&&(f=m(f));return f};this.isFile=function(b,f){b=d.resolve(n,b);k.stat(b,function(b,a){f(!b&&a.isFile())})};this.getFileSize=function(b,f){b=d.resolve(n,b);k.stat(b,function(b,
a){b?f(-1):f(a.size)})};this.log=function(b,f){var d;void 0!==f?d=b:f=b;"alert"===d&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(f+"\n");"alert"===d&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(b,f,d){b||(process.stderr.write("ASSERTION FAILED: "+f),d&&d())};this.setTimeout=function(b,f){return setTimeout(function(){b()},f)};this.clearTimeout=function(b){clearTimeout(b)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(b){n=
b};this.currentDirectory=function(){return n};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return f};this.parseXML=function(b){return p.parseFromString(b,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};this.requestAnimationFrame=function(b){return setTimeout(b,15)};this.cancelAnimationFrame=function(b){clearTimeout(b)};p=new (require("xmldom").DOMParser);f=b.parseXML("<a/>").implementation}
function RhinoRuntime(){function m(b,d){var e;void 0!==d?e=b:d=b;"alert"===e&&print("\n!!!!! ALERT !!!!!");print(d);"alert"===e&&print("!!!!! ALERT !!!!!")}var g=this,b={},k=b.javax.xml.parsers.DocumentBuilderFactory.newInstance(),d,n,p="";k.setValidating(!1);k.setNamespaceAware(!0);k.setExpandEntityReferences(!1);k.setSchema(null);n=b.org.xml.sax.EntityResolver({resolveEntity:function(f,d){var e=new b.java.io.FileReader(d);return new b.org.xml.sax.InputSource(e)}});d=k.newDocumentBuilder();d.setEntityResolver(n);
this.byteArrayFromString=function(b,d){var e,k=b.length,a=new Uint8Array(new ArrayBuffer(k));for(e=0;e<k;e+=1)a[e]=b.charCodeAt(e)&255;return a};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.loadXML=function(f,k){var e=new b.java.io.File(f),p=null;try{p=d.parse(e)}catch(a){return print(a),k(a,null)}k(null,p)};this.readFile=function(f,d,e){p&&(f=p+"/"+f);var k=new b.java.io.File(f),a="binary"===d?
"latin1":d;k.isFile()?((f=readFile(f,a))&&"binary"===d&&(f=g.byteArrayFromString(f,"binary")),e(null,f)):e(f+" is not a file.",null)};this.writeFile=function(f,d,e){p&&(f=p+"/"+f);f=new b.java.io.FileOutputStream(f);var k,a=d.length;for(k=0;k<a;k+=1)f.write(d[k]);f.close();e(null)};this.deleteFile=function(f,d){p&&(f=p+"/"+f);var e=new b.java.io.File(f),k=f+Math.random(),k=new b.java.io.File(k);e.rename(k)?(k.deleteOnExit(),d(null)):d("Could not delete "+f)};this.read=function(f,d,e,k){p&&(f=p+"/"+
f);var a;a=f;var c="binary";(new b.java.io.File(a)).isFile()?("binary"===c&&(c="latin1"),a=readFile(a,c)):a=null;a?k(null,this.byteArrayFromString(a.substring(d,d+e),"binary")):k("Cannot read "+f,null)};this.readFileSync=function(b,d){if(!d)return"";var e=readFile(b,d);if(null===e)throw"File could not be read.";return e};this.isFile=function(f,d){p&&(f=p+"/"+f);var e=new b.java.io.File(f);d(e.isFile())};this.getFileSize=function(f,d){p&&(f=p+"/"+f);var e=new b.java.io.File(f);d(e.length())};this.log=
m;this.assert=function(b,d,e){b||(m("alert","ASSERTION FAILED: "+d),e&&e())};this.setTimeout=function(b){b();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(b){p=b};this.currentDirectory=function(){return p};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return d.getDOMImplementation()};this.parseXML=function(f){f=new b.java.io.StringReader(f);f=new b.org.xml.sax.InputSource(f);return d.parse(f)};
this.exit=quit;this.getWindow=function(){return null};this.requestAnimationFrame=function(b){b();return 0};this.cancelAnimationFrame=function(){}}Runtime.create=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime};var runtime=Runtime.create(),core={},gui={},xmldom={},odf={},ops={};
(function(){function m(b,d,e){var k=b+"/manifest.json",a,c;runtime.log("Loading manifest: "+k);try{a=runtime.readFileSync(k,"utf-8")}catch(l){if(e)runtime.log("No loadable manifest found.");else throw console.log(String(l)),l;return}e=JSON.parse(a);for(c in e)e.hasOwnProperty(c)&&(d[c]={dir:b,deps:e[c]})}function g(b,d,e){function k(b){if(!l[b]&&!e(b)){if(c[b])throw"Circular dependency detected for "+b+".";c[b]=!0;if(!d[b])throw"Missing dependency information for class "+b+".";var f=d[b],p=f.deps,
g,n=p.length;for(g=0;g<n;g+=1)k(p[g]);c[b]=!1;l[b]=!0;a.push(f.dir+"/"+b.replace(".","/")+".js")}}var a=[],c={},l={};b.forEach(k);return a}function b(b,d){return d=d+("\n//# sourceURL="+b)+("\n//@ sourceURL="+b)}function k(d){var k,e;for(k=0;k<d.length;k+=1)e=runtime.readFileSync(d[k],"utf-8"),e=b(d[k],e),eval(e)}function d(b){b=b.split(".");var d,e=p,k=b.length;for(d=0;d<k;d+=1){if(!e.hasOwnProperty(b[d]))return!1;e=e[b[d]]}return!0}var n,p={core:core,gui:gui,xmldom:xmldom,odf:odf,ops:ops};runtime.loadClasses=
function(b,p){if(IS_COMPILED_CODE||0===b.length)return p&&p();var e;if(!(e=n)){e=[];var r=runtime.libraryPaths(),a;runtime.currentDirectory()&&-1===r.indexOf(runtime.currentDirectory())&&m(runtime.currentDirectory(),e,!0);for(a=0;a<r.length;a+=1)m(r[a],e)}n=e;b=g(b,n,d);if(0===b.length)return p&&p();if("BrowserRuntime"===runtime.type()&&p){e=b;r=document.currentScript||document.documentElement.lastChild;a=document.createDocumentFragment();var c,l;for(l=0;l<e.length;l+=1)c=document.createElement("script"),
c.type="text/javascript",c.charset="utf-8",c.async=!1,c.setAttribute("src",e[l]),a.appendChild(c);p&&(c.onload=p);r.parentNode.insertBefore(a,r)}else k(b),p&&p()};runtime.loadClass=function(b,d){runtime.loadClasses([b],d)}})();(function(){var m=function(g){return g};runtime.getTranslator=function(){return m};runtime.setTranslator=function(g){m=g};runtime.tr=function(g){var b=m(g);return b&&"string"===String(typeof b)?b:g}})();
(function(m){function g(b){if(b.length){var k=b[0];runtime.readFile(k,"utf8",function(d,g){function p(){var b;(b=eval(m))&&runtime.exit(b)}var f="",f=k.lastIndexOf("/"),m=g,f=-1!==f?k.substring(0,f):".";runtime.setCurrentDirectory(f);d?(runtime.log(d),runtime.exit(1)):null===m?(runtime.log("No code found for "+k),runtime.exit(1)):p.apply(null,b)})}}m=m?Array.prototype.slice.call(m):[];"NodeJSRuntime"===runtime.type()?g(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?g(m):g(m.slice(1))})("undefined"!==
String(typeof arguments)&&arguments);
// Input 2
core.Async=function(){this.forEach=function(m,g,b){function k(d){p!==n&&(d?(p=n,b(d)):(p+=1,p===n&&b(null)))}var d,n=m.length,p=0;for(d=0;d<n;d+=1)g(m[d],k)};this.destroyAll=function(m,g){function b(k,d){if(d)g(d);else if(k<m.length)m[k](function(d){b(k+1,d)});else g()}b(0,void 0)}};
// Input 3
function makeBase64(){function m(a){var c,b=a.length,l=new Uint8Array(new ArrayBuffer(b));for(c=0;c<b;c+=1)l[c]=a.charCodeAt(c)&255;return l}function g(a){var c,b="",l,h=a.length-2;for(l=0;l<h;l+=3)c=a[l]<<16|a[l+1]<<8|a[l+2],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>18],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12&63],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&
63];l===h+1?(c=a[l]<<4,b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],b+="=="):l===h&&(c=a[l]<<10|a[l+1]<<2,b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],b+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],b+="=");return b}function b(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,
"");var c=a.length,b=new Uint8Array(new ArrayBuffer(3*c)),l=a.length%4,d=0,e,k;for(e=0;e<c;e+=4)k=(h[a.charAt(e)]||0)<<18|(h[a.charAt(e+1)]||0)<<12|(h[a.charAt(e+2)]||0)<<6|(h[a.charAt(e+3)]||0),b[d]=k>>16,b[d+1]=k>>8&255,b[d+2]=k&255,d+=3;c=3*c-[0,0,2,1][l];return b.subarray(0,c)}function k(a){var c,b,l=a.length,h=0,d=new Uint8Array(new ArrayBuffer(3*l));for(c=0;c<l;c+=1)b=a[c],128>b?d[h++]=b:(2048>b?d[h++]=192|b>>>6:(d[h++]=224|b>>>12&15,d[h++]=128|b>>>6&63),d[h++]=128|b&63);return d.subarray(0,
h)}function d(a){var c,b,l,h,d=a.length,e=new Uint8Array(new ArrayBuffer(d)),k=0;for(c=0;c<d;c+=1)b=a[c],128>b?e[k++]=b:(c+=1,l=a[c],224>b?e[k++]=(b&31)<<6|l&63:(c+=1,h=a[c],e[k++]=(b&15)<<12|(l&63)<<6|h&63));return e.subarray(0,k)}function n(a){return g(m(a))}function p(a){return String.fromCharCode.apply(String,b(a))}function f(a){return d(m(a))}function q(a){a=d(a);for(var c="",b=0;b<a.length;)c+=String.fromCharCode.apply(String,a.subarray(b,b+45E3)),b+=45E3;return c}function e(a,c,b){var l,h,
d,e="";for(d=c;d<b;d+=1)c=a.charCodeAt(d)&255,128>c?e+=String.fromCharCode(c):(d+=1,l=a.charCodeAt(d)&255,224>c?e+=String.fromCharCode((c&31)<<6|l&63):(d+=1,h=a.charCodeAt(d)&255,e+=String.fromCharCode((c&15)<<12|(l&63)<<6|h&63)));return e}function r(a,c){function b(){var d=h+1E5;d>a.length&&(d=a.length);l+=e(a,h,d);h=d;d=h===a.length;c(l,d)&&!d&&runtime.setTimeout(b,0)}var l="",h=0;1E5>a.length?c(e(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),b())}function a(a){return k(m(a))}function c(a){return String.fromCharCode.apply(String,
k(a))}function l(a){return String.fromCharCode.apply(String,k(m(a)))}var h=function(a){var c={},b,l;b=0;for(l=a.length;b<l;b+=1)c[a.charAt(b)]=b;return c}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),v,w,z=runtime.getWindow(),x,u;z&&z.btoa?(x=z.btoa,v=function(a){return x(l(a))}):(x=n,v=function(c){return g(a(c))});z&&z.atob?(u=z.atob,w=function(a){a=u(a);return e(a,0,a.length)}):(u=p,w=function(a){return q(b(a))});core.Base64=function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=
g;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=b;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=k;this.convertByteArrayToUTF16Array=this.convertUTF8ArrayToUTF16Array=d;this.convertUTF8StringToBase64=n;this.convertBase64ToUTF8String=p;this.convertUTF8StringToUTF16Array=f;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=q;this.convertUTF8StringToUTF16String=r;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=a;this.convertUTF16ArrayToUTF8String=
c;this.convertUTF16StringToUTF8String=l;this.convertUTF16StringToBase64=v;this.convertBase64ToUTF16String=w;this.fromBase64=p;this.toBase64=n;this.atob=u;this.btoa=x;this.utob=l;this.btou=r;this.encode=v;this.encodeURI=function(a){return v(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return w(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))};return this};return core.Base64}core.Base64=makeBase64();
// Input 4
core.ByteArray=function(m){this.pos=0;this.data=m;this.readUInt32LE=function(){this.pos+=4;var g=this.data,b=this.pos;return g[--b]<<24|g[--b]<<16|g[--b]<<8|g[--b]};this.readUInt16LE=function(){this.pos+=2;var g=this.data,b=this.pos;return g[--b]<<8|g[--b]}};
// Input 5
core.ByteArrayWriter=function(m){function g(b){b>d-k&&(d=Math.max(2*d,k+b),b=new Uint8Array(new ArrayBuffer(d)),b.set(n),n=b)}var b=this,k=0,d=1024,n=new Uint8Array(new ArrayBuffer(d));this.appendByteArrayWriter=function(d){b.appendByteArray(d.getByteArray())};this.appendByteArray=function(b){var d=b.length;g(d);n.set(b,k);k+=d};this.appendArray=function(b){var d=b.length;g(d);n.set(b,k);k+=d};this.appendUInt16LE=function(d){b.appendArray([d&255,d>>8&255])};this.appendUInt32LE=function(d){b.appendArray([d&
255,d>>8&255,d>>16&255,d>>24&255])};this.appendString=function(d){b.appendByteArray(runtime.byteArrayFromString(d,m))};this.getLength=function(){return k};this.getByteArray=function(){var b=new Uint8Array(new ArrayBuffer(k));b.set(n.subarray(0,k));return b}};
// Input 6
core.CSSUnits=function(){var m=this,g={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(b,k,d){return b*g[d]/g[k]};this.convertMeasure=function(b,k){var d,g;b&&k?(d=parseFloat(b),g=b.replace(d.toString(),""),d=m.convert(d,g,k).toString()):d="";return d};this.getUnits=function(b){return b.substr(b.length-2,b.length)}};
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
(function(){function m(){var k,d,g,p,f,m,e,r,a;void 0===b&&(d=(k=runtime.getWindow())&&k.document,m=d.documentElement,e=d.body,b={rangeBCRIgnoresElementBCR:!1,unscaledRangeClientRects:!1,elementBCRIgnoresBodyScroll:!1},d&&(p=d.createElement("div"),p.style.position="absolute",p.style.left="-99999px",p.style.transform="scale(2)",p.style["-webkit-transform"]="scale(2)",f=d.createElement("div"),p.appendChild(f),e.appendChild(p),k=d.createRange(),k.selectNode(f),b.rangeBCRIgnoresElementBCR=0===k.getClientRects().length,
f.appendChild(d.createTextNode("Rect transform test")),d=f.getBoundingClientRect(),g=k.getBoundingClientRect(),b.unscaledRangeClientRects=2<Math.abs(d.height-g.height),p.style.transform="",p.style["-webkit-transform"]="",d=m.style.overflow,g=e.style.overflow,r=e.style.height,a=e.scrollTop,m.style.overflow="visible",e.style.overflow="visible",e.style.height="200%",e.scrollTop=e.scrollHeight,b.elementBCRIgnoresBodyScroll=k.getBoundingClientRect().top!==f.getBoundingClientRect().top,e.scrollTop=a,e.style.height=
r,e.style.overflow=g,m.style.overflow=d,k.detach(),e.removeChild(p),k=Object.keys(b).map(function(a){return a+":"+String(b[a])}).join(", "),runtime.log("Detected browser quirks - "+k)));return b}function g(b,d,g){for(b=b?b.firstElementChild:null;b;){if(b.localName===g&&b.namespaceURI===d)return b;b=b.nextElementSibling}return null}var b;core.DomUtils=function(){function b(a,c){for(var l=0,h;a.parentNode!==c;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(h=c.firstChild;h!==
a;)l+=1,h=h.nextSibling;return l}function d(a,c){return 0>=a.compareBoundaryPoints(Range.START_TO_START,c)&&0<=a.compareBoundaryPoints(Range.END_TO_END,c)}function n(a,c){var b=null;a.nodeType===Node.TEXT_NODE&&(0===a.length?(a.parentNode.removeChild(a),c.nodeType===Node.TEXT_NODE&&(b=c)):(c.nodeType===Node.TEXT_NODE&&(a.appendData(c.data),c.parentNode.removeChild(c)),b=a));return b}function p(a){for(var c=a.parentNode;a.firstChild;)c.insertBefore(a.firstChild,a);c.removeChild(a);return c}function f(a,
c){for(var b=a.parentNode,h=a.firstChild,d;h;)d=h.nextSibling,f(h,c),h=d;b&&c(a)&&p(a);return b}function q(a,c){return a===c||Boolean(a.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY)}function e(a,c,b){Object.keys(c).forEach(function(h){var d=h.split(":"),k=d[1],f=b(d[0]),d=c[h],g=typeof d;"object"===g?Object.keys(d).length&&(h=f?a.getElementsByTagNameNS(f,k)[0]||a.ownerDocument.createElementNS(f,h):a.getElementsByTagName(k)[0]||a.ownerDocument.createElement(h),a.appendChild(h),e(h,
d,b)):f&&(runtime.assert("number"===g||"string"===g,"attempting to map unsupported type '"+g+"' (key: "+h+")"),a.setAttributeNS(f,h,String(d)))})}var r=null;this.splitBoundaries=function(a){var c,l=[],h,d,e;if(a.startContainer.nodeType===Node.TEXT_NODE||a.endContainer.nodeType===Node.TEXT_NODE){h=a.endContainer;d=a.endContainer.nodeType!==Node.TEXT_NODE?a.endOffset===a.endContainer.childNodes.length:!1;e=a.endOffset;c=a.endContainer;if(e<c.childNodes.length)for(c=c.childNodes.item(e),e=0;c.firstChild;)c=
c.firstChild;else for(;c.lastChild;)c=c.lastChild,e=c.nodeType===Node.TEXT_NODE?c.textContent.length:c.childNodes.length;c===h&&(h=null);a.setEnd(c,e);e=a.endContainer;0!==a.endOffset&&e.nodeType===Node.TEXT_NODE&&(c=e,a.endOffset!==c.length&&(l.push(c.splitText(a.endOffset)),l.push(c)));e=a.startContainer;0!==a.startOffset&&e.nodeType===Node.TEXT_NODE&&(c=e,a.startOffset!==c.length&&(e=c.splitText(a.startOffset),l.push(c),l.push(e),a.setStart(e,0)));if(null!==h){for(e=a.endContainer;e.parentNode&&
e.parentNode!==h;)e=e.parentNode;d=d?h.childNodes.length:b(e,h);a.setEnd(h,d)}}return l};this.containsRange=d;this.rangesIntersect=function(a,c){return 0>=a.compareBoundaryPoints(Range.END_TO_START,c)&&0<=a.compareBoundaryPoints(Range.START_TO_END,c)};this.getNodesInRange=function(a,c,b){var h=[],d=a.commonAncestorContainer;b=a.startContainer.ownerDocument.createTreeWalker(d.nodeType===Node.TEXT_NODE?d.parentNode:d,b,c,!1);var e;a.endContainer.childNodes[a.endOffset-1]?(d=a.endContainer.childNodes[a.endOffset-
1],e=Node.DOCUMENT_POSITION_PRECEDING|Node.DOCUMENT_POSITION_CONTAINED_BY):(d=a.endContainer,e=Node.DOCUMENT_POSITION_PRECEDING);a.startContainer.childNodes[a.startOffset]?(a=a.startContainer.childNodes[a.startOffset],b.currentNode=a):a.startOffset===(a.startContainer.nodeType===Node.TEXT_NODE?a.startContainer.length:a.startContainer.childNodes.length)?(a=a.startContainer,b.currentNode=a,b.lastChild(),a=b.nextNode()):(a=a.startContainer,b.currentNode=a);a&&c(a)===NodeFilter.FILTER_ACCEPT&&h.push(a);
for(a=b.nextNode();a;){c=d.compareDocumentPosition(a);if(0!==c&&0===(c&e))break;h.push(a);a=b.nextNode()}return h};this.normalizeTextNodes=function(a){a&&a.nextSibling&&(a=n(a,a.nextSibling));a&&a.previousSibling&&n(a.previousSibling,a)};this.rangeContainsNode=function(a,c){var b=c.ownerDocument.createRange(),h=c.ownerDocument.createRange(),e;b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset);h.selectNodeContents(c);e=d(b,h);b.detach();h.detach();return e};this.mergeIntoParent=
p;this.removeUnwantedNodes=f;this.getElementsByTagNameNS=function(a,c,b){var h=[];a=a.getElementsByTagNameNS(c,b);h.length=b=a.length;for(c=0;c<b;c+=1)h[c]=a.item(c);return h};this.containsNode=function(a,c){return a===c||a.contains(c)};this.comparePoints=function(a,c,l,h){if(a===l)return h-c;var d=a.compareDocumentPosition(l);2===d?d=-1:4===d?d=1:10===d?(c=b(a,l),d=c<h?1:-1):(h=b(l,a),d=h<c?-1:1);return d};this.adaptRangeDifferenceToZoomLevel=function(a,c){return m().unscaledRangeClientRects?a:a/
c};this.getBoundingClientRect=function(a){var c=a.ownerDocument,b=m(),h=c.body;if((!1===b.unscaledRangeClientRects||b.rangeBCRIgnoresElementBCR)&&a.nodeType===Node.ELEMENT_NODE)return a=a.getBoundingClientRect(),b.elementBCRIgnoresBodyScroll?{left:a.left+h.scrollLeft,right:a.right+h.scrollLeft,top:a.top+h.scrollTop,bottom:a.bottom+h.scrollTop,width:a.width,height:a.height}:a;var d;r?d=r:r=d=c.createRange();b=d;b.selectNode(a);return b.getBoundingClientRect()};this.mapKeyValObjOntoNode=function(a,
c,b){Object.keys(c).forEach(function(h){var d=h.split(":"),e=d[1],d=b(d[0]),k=c[h];d?(e=a.getElementsByTagNameNS(d,e)[0],e||(e=a.ownerDocument.createElementNS(d,h),a.appendChild(e)),e.textContent=k):runtime.log("Key ignored: "+h)})};this.removeKeyElementsFromNode=function(a,c,b){c.forEach(function(c){var d=c.split(":"),e=d[1];(d=b(d[0]))?(e=a.getElementsByTagNameNS(d,e)[0])?e.parentNode.removeChild(e):runtime.log("Element for "+c+" not found."):runtime.log("Property Name ignored: "+c)})};this.getKeyValRepresentationOfNode=
function(a,c){for(var b={},h=a.firstElementChild,d;h;){if(d=c(h.namespaceURI))b[d+":"+h.localName]=h.textContent;h=h.nextElementSibling}return b};this.mapObjOntoNode=e;this.getDirectChild=g;(function(a){var c,b;b=runtime.getWindow();null!==b&&(c=b.navigator.appVersion.toLowerCase(),b=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")),c=c.indexOf("msie"),b||c)&&(a.containsNode=q)})(this)};return core.DomUtils})();
// Input 8
core.Cursor=function(m,g){function b(a){a.parentNode&&(f.push(a.previousSibling),f.push(a.nextSibling),a.parentNode.removeChild(a))}function k(a,c,b){if(c.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(c),"putCursorIntoTextNode: invalid container");var h=c.parentNode;runtime.assert(Boolean(h),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=c.length,"putCursorIntoTextNode: offset is out of bounds");0===b?h.insertBefore(a,c):(b!==c.length&&c.splitText(b),h.insertBefore(a,
c.nextSibling))}else c.nodeType===Node.ELEMENT_NODE&&c.insertBefore(a,c.childNodes.item(b));f.push(a.previousSibling);f.push(a.nextSibling)}var d=m.createElementNS("urn:webodf:names:cursor","cursor"),n=m.createElementNS("urn:webodf:names:cursor","anchor"),p,f=[],q=m.createRange(),e,r=new core.DomUtils;this.getNode=function(){return d};this.getAnchorNode=function(){return n.parentNode?n:d};this.getSelectedRange=function(){e?(q.setStartBefore(d),q.collapse(!0)):(q.setStartAfter(p?n:d),q.setEndBefore(p?
d:n));return q};this.setSelectedRange=function(a,c){q&&q!==a&&q.detach();q=a;p=!1!==c;(e=a.collapsed)?(b(n),b(d),k(d,a.startContainer,a.startOffset)):(b(n),b(d),k(p?d:n,a.endContainer,a.endOffset),k(p?n:d,a.startContainer,a.startOffset));f.forEach(r.normalizeTextNodes);f.length=0};this.hasForwardSelection=function(){return p};this.remove=function(){b(d);f.forEach(r.normalizeTextNodes);f.length=0};d.setAttributeNS("urn:webodf:names:cursor","memberId",g);n.setAttributeNS("urn:webodf:names:cursor","memberId",
g)};
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
core.EventNotifier=function(m){var g={};this.emit=function(b,k){var d,n;runtime.assert(g.hasOwnProperty(b),'unknown event fired "'+b+'"');n=g[b];for(d=0;d<n.length;d+=1)n[d](k)};this.subscribe=function(b,k){runtime.assert(g.hasOwnProperty(b),'tried to subscribe to unknown event "'+b+'"');g[b].push(k)};this.unsubscribe=function(b,k){var d;runtime.assert(g.hasOwnProperty(b),'tried to unsubscribe from unknown event "'+b+'"');d=g[b].indexOf(k);runtime.assert(-1!==d,'tried to unsubscribe unknown callback from event "'+
b+'"');-1!==d&&g[b].splice(d,1)};(function(){var b,k;for(b=0;b<m.length;b+=1)k=m[b],runtime.assert(!g.hasOwnProperty(k),'Duplicated event ids: "'+k+'" registered more than once.'),g[k]=[]})()};
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
core.LoopWatchDog=function(m,g){var b=Date.now(),k=0;this.check=function(){var d;if(m&&(d=Date.now(),d-b>m))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<g&&(k+=1,k>g))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 12
core.PositionIterator=function(m,g,b,k){function d(){this.acceptNode=function(a){return!a||a.nodeType===l&&0===a.length?w:v}}function n(a){this.acceptNode=function(c){return!c||c.nodeType===l&&0===c.length?w:a.acceptNode(c)}}function p(){var c=r.currentNode,b=c.nodeType;a=b===l?c.length-1:b===h?1:0}function f(){if(null===r.previousSibling()){if(!r.parentNode()||r.currentNode===m)return r.firstChild(),!1;a=0}else p();return!0}function q(){var b=r.currentNode,l;l=c(b);if(b!==m)for(b=b.parentNode;b&&
b!==m;)c(b)===w&&(r.currentNode=b,l=w),b=b.parentNode;l===w?(a=1,b=e.nextPosition()):b=l===v?!0:e.nextPosition();b&&runtime.assert(c(r.currentNode)===v,"moveToAcceptedNode did not result in walker being on an accepted node");return b}var e=this,r,a,c,l=Node.TEXT_NODE,h=Node.ELEMENT_NODE,v=NodeFilter.FILTER_ACCEPT,w=NodeFilter.FILTER_REJECT;this.nextPosition=function(){var c=r.currentNode,b=c.nodeType;if(c===m)return!1;if(0===a&&b===h)null===r.firstChild()&&(a=1);else if(b===l&&a+1<c.length)a+=1;else if(null!==
r.nextSibling())a=0;else if(r.parentNode())a=1;else return!1;return!0};this.previousPosition=function(){var c=!0,b=r.currentNode;0===a?c=f():b.nodeType===l?a-=1:null!==r.lastChild()?p():b===m?c=!1:a=0;return c};this.previousNode=f;this.container=function(){var c=r.currentNode,b=c.nodeType;0===a&&b!==l&&(c=c.parentNode);return c};this.rightNode=function(){var b=r.currentNode,d=b.nodeType;if(d===l&&a===b.length)for(b=b.nextSibling;b&&c(b)!==v;)b=b.nextSibling;else d===h&&1===a&&(b=null);return b};this.leftNode=
function(){var b=r.currentNode;if(0===a)for(b=b.previousSibling;b&&c(b)!==v;)b=b.previousSibling;else if(b.nodeType===h)for(b=b.lastChild;b&&c(b)!==v;)b=b.previousSibling;return b};this.getCurrentNode=function(){return r.currentNode};this.unfilteredDomOffset=function(){if(r.currentNode.nodeType===l)return a;for(var c=0,b=r.currentNode,b=1===a?b.lastChild:b.previousSibling;b;)c+=1,b=b.previousSibling;return c};this.getPreviousSibling=function(){var a=r.currentNode,c=r.previousSibling();r.currentNode=
a;return c};this.getNextSibling=function(){var a=r.currentNode,c=r.nextSibling();r.currentNode=a;return c};this.setPositionBeforeElement=function(c){runtime.assert(Boolean(c),"setPositionBeforeElement called without element");r.currentNode=c;a=0;return q()};this.setUnfilteredPosition=function(c,b){runtime.assert(Boolean(c),"PositionIterator.setUnfilteredPosition called without container");r.currentNode=c;if(c.nodeType===l)return a=b,runtime.assert(b<=c.length,"Error in setPosition: "+b+" > "+c.length),
runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),b===c.length&&(r.nextSibling()?a=0:r.parentNode()?a=1:runtime.assert(!1,"Error in setUnfilteredPosition: position not valid.")),!0;b<c.childNodes.length?(r.currentNode=c.childNodes.item(b),a=0):a=1;return q()};this.moveToEnd=function(){r.currentNode=m;a=1};this.moveToEndOfNode=function(c){c.nodeType===l?e.setUnfilteredPosition(c,c.length):(r.currentNode=c,a=1)};this.isBeforeNode=function(){return 0===a};this.getNodeFilter=function(){return c};
c=(b?new n(b):new d).acceptNode;c.acceptNode=c;g=g||NodeFilter.SHOW_ALL;runtime.assert(m.nodeType!==Node.TEXT_NODE,"Internet Explorer doesn't allow tree walker roots to be text nodes");r=m.ownerDocument.createTreeWalker(m,g,c,k);a=0;null===r.firstChild()&&(a=1)};
// Input 13
core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(m){};(function(){return core.PositionFilter})();
// Input 14
core.PositionFilterChain=function(){var m=[],g=core.PositionFilter.FilterResult.FILTER_ACCEPT,b=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(k){var d;for(d=0;d<m.length;d+=1)if(m[d].acceptPosition(k)===b)return b;return g};this.addFilter=function(b){m.push(b)}};
// Input 15
core.zip_HuftNode=function(){this.n=this.b=this.e=0;this.t=null};core.zip_HuftList=function(){this.list=this.next=null};
core.RawInflate=function(){function m(a,c,b,l,d,h){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var e=Array(this.BMAX+1),k,f,g,p,n,y,m,r=Array(this.BMAX+1),s,H,L,q=new core.zip_HuftNode,v=Array(this.BMAX);p=Array(this.N_MAX);var F,u=Array(this.BMAX+1),t,O,w;w=this.root=null;for(n=0;n<e.length;n++)e[n]=0;for(n=0;n<r.length;n++)r[n]=0;for(n=0;n<v.length;n++)v[n]=null;for(n=0;n<p.length;n++)p[n]=0;for(n=0;n<u.length;n++)u[n]=0;k=256<c?a[256]:this.BMAX;s=a;H=0;n=c;do e[s[H]]++,H++;
while(0<--n);if(e[0]===c)this.root=null,this.status=this.m=0;else{for(y=1;y<=this.BMAX&&0===e[y];y++);m=y;h<y&&(h=y);for(n=this.BMAX;0!==n&&0===e[n];n--);g=n;h>n&&(h=n);for(t=1<<y;y<n;y++,t<<=1)if(t-=e[y],0>t){this.status=2;this.m=h;return}t-=e[n];if(0>t)this.status=2,this.m=h;else{e[n]+=t;u[1]=y=0;s=e;H=1;for(L=2;0<--n;)y+=s[H++],u[L++]=y;s=a;n=H=0;do y=s[H++],0!==y&&(p[u[y]++]=n);while(++n<c);c=u[g];u[0]=n=0;s=p;H=0;p=-1;F=r[0]=0;L=null;O=0;for(m=m-1+1;m<=g;m++)for(a=e[m];0<a--;){for(;m>F+r[1+p];){F+=
r[1+p];p++;O=g-F;O=O>h?h:O;y=m-F;f=1<<y;if(f>a+1)for(f-=a+1,L=m;++y<O;){f<<=1;if(f<=e[++L])break;f-=e[L]}F+y>k&&F<k&&(y=k-F);O=1<<y;r[1+p]=y;L=Array(O);for(f=0;f<O;f++)L[f]=new core.zip_HuftNode;w=null===w?this.root=new core.zip_HuftList:w.next=new core.zip_HuftList;w.next=null;w.list=L;v[p]=L;0<p&&(u[p]=n,q.b=r[p],q.e=16+y,q.t=L,y=(n&(1<<F)-1)>>F-r[p],v[p-1][y].e=q.e,v[p-1][y].b=q.b,v[p-1][y].n=q.n,v[p-1][y].t=q.t)}q.b=m-F;H>=c?q.e=99:s[H]<b?(q.e=256>s[H]?16:15,q.n=s[H++]):(q.e=d[s[H]-b],q.n=l[s[H++]-
b]);f=1<<m-F;for(y=n>>F;y<O;y+=f)L[y].e=q.e,L[y].b=q.b,L[y].n=q.n,L[y].t=q.t;for(y=1<<m-1;0!==(n&y);y>>=1)n^=y;for(n^=y;(n&(1<<F)-1)!==u[p];)F-=r[p],p--}this.m=r[1];this.status=0!==t&&1!==g?1:0}}}function g(b){for(;c<b;){var l=a,h;h=s.length===y?-1:s[y++];a=l|h<<c;c+=8}}function b(c){return a&F[c]}function k(b){a>>=b;c-=b}function d(a,c,h){var d,e,n;if(0===h)return 0;for(n=0;;){g(u);e=z.list[b(u)];for(d=e.e;16<d;){if(99===d)return-1;k(e.b);d-=16;g(d);e=e.t[b(d)];d=e.e}k(e.b);if(16===d)f&=32767,a[c+
n++]=p[f++]=e.n;else{if(15===d)break;g(d);v=e.n+b(d);k(d);g(t);e=x.list[b(t)];for(d=e.e;16<d;){if(99===d)return-1;k(e.b);d-=16;g(d);e=e.t[b(d)];d=e.e}k(e.b);g(d);w=f-e.n-b(d);for(k(d);0<v&&n<h;)v--,w&=32767,f&=32767,a[c+n++]=p[f++]=p[w++]}if(n===h)return h}l=-1;return n}function n(a,c,l){var h,e,f,n,p,y,r,s=Array(316);for(h=0;h<s.length;h++)s[h]=0;g(5);y=257+b(5);k(5);g(5);r=1+b(5);k(5);g(4);h=4+b(4);k(4);if(286<y||30<r)return-1;for(e=0;e<h;e++)g(3),s[T[e]]=b(3),k(3);for(e=h;19>e;e++)s[T[e]]=0;u=
7;e=new m(s,19,19,null,null,u);if(0!==e.status)return-1;z=e.root;u=e.m;n=y+r;for(h=f=0;h<n;)if(g(u),p=z.list[b(u)],e=p.b,k(e),e=p.n,16>e)s[h++]=f=e;else if(16===e){g(2);e=3+b(2);k(2);if(h+e>n)return-1;for(;0<e--;)s[h++]=f}else{17===e?(g(3),e=3+b(3),k(3)):(g(7),e=11+b(7),k(7));if(h+e>n)return-1;for(;0<e--;)s[h++]=0;f=0}u=9;e=new m(s,y,257,L,O,u);0===u&&(e.status=1);if(0!==e.status)return-1;z=e.root;u=e.m;for(h=0;h<r;h++)s[h]=s[h+y];t=6;e=new m(s,r,0,H,U,t);x=e.root;t=e.m;return 0===t&&257<y||0!==e.status?
-1:d(a,c,l)}var p=[],f,q=null,e,r,a,c,l,h,v,w,z,x,u,t,s,y,F=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],L=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],O=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],H=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],U=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],T=[16,17,18,0,8,7,9,6,
10,5,11,4,12,3,13,2,14,1,15],X;this.inflate=function(F,T){p.length=65536;c=a=f=0;l=-1;h=!1;v=w=0;z=null;s=F;y=0;var G=new Uint8Array(new ArrayBuffer(T));a:for(var J=0,Q;J<T&&(!h||-1!==l);){if(0<v){if(0!==l)for(;0<v&&J<T;)v--,w&=32767,f&=32767,G[0+J]=p[f]=p[w],J+=1,f+=1,w+=1;else{for(;0<v&&J<T;)v-=1,f&=32767,g(8),G[0+J]=p[f]=b(8),J+=1,f+=1,k(8);0===v&&(l=-1)}if(J===T)break}if(-1===l){if(h)break;g(1);0!==b(1)&&(h=!0);k(1);g(2);l=b(2);k(2);z=null;v=0}switch(l){case 0:Q=G;var ea=0+J,P=T-J,N=void 0,N=
c&7;k(N);g(16);N=b(16);k(16);g(16);if(N!==(~a&65535))Q=-1;else{k(16);v=N;for(N=0;0<v&&N<P;)v--,f&=32767,g(8),Q[ea+N++]=p[f++]=b(8),k(8);0===v&&(l=-1);Q=N}break;case 1:if(null!==z)Q=d(G,0+J,T-J);else b:{Q=G;ea=0+J;P=T-J;if(null===q){for(var I=void 0,N=Array(288),I=void 0,I=0;144>I;I++)N[I]=8;for(I=144;256>I;I++)N[I]=9;for(I=256;280>I;I++)N[I]=7;for(I=280;288>I;I++)N[I]=8;r=7;I=new m(N,288,257,L,O,r);if(0!==I.status){alert("HufBuild error: "+I.status);Q=-1;break b}q=I.root;r=I.m;for(I=0;30>I;I++)N[I]=
5;X=5;I=new m(N,30,0,H,U,X);if(1<I.status){q=null;alert("HufBuild error: "+I.status);Q=-1;break b}e=I.root;X=I.m}z=q;x=e;u=r;t=X;Q=d(Q,ea,P)}break;case 2:Q=null!==z?d(G,0+J,T-J):n(G,0+J,T-J);break;default:Q=-1}if(-1===Q)break a;J+=Q}s=new Uint8Array(new ArrayBuffer(0));return G}};
// Input 16
core.ScheduledTask=function(m,g){function b(){n&&(runtime.clearTimeout(d),n=!1)}function k(){b();m.apply(void 0,p);p=null}var d,n=!1,p=[];this.trigger=function(){p=Array.prototype.slice.call(arguments);n||(n=!0,d=runtime.setTimeout(k,g))};this.triggerImmediate=function(){p=Array.prototype.slice.call(arguments);k()};this.processRequests=function(){n&&k()};this.cancel=b;this.destroy=function(d){b();d()}};
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
core.StepIterator=function(m,g){function b(){r=null;c=a=void 0}function k(){void 0===c&&(c=m.acceptPosition(g)===e);return c}function d(a,c){b();return g.setUnfilteredPosition(a,c)}function n(){r||(r=g.container());return r}function p(){void 0===a&&(a=g.unfilteredDomOffset());return a}function f(){for(b();g.nextPosition();)if(b(),k())return!0;return!1}function q(){for(b();g.previousPosition();)if(b(),k())return!0;return!1}var e=core.PositionFilter.FilterResult.FILTER_ACCEPT,r,a,c;this.isStep=k;this.setPosition=
d;this.container=n;this.offset=p;this.nextStep=f;this.previousStep=q;this.roundToClosestStep=function(){var a=n(),c=p(),b=k();b||(b=q(),b||(d(a,c),b=f()));return b};this.roundToPreviousStep=function(){var a=k();a||(a=q());return a};this.roundToNextStep=function(){var a=k();a||(a=f());return a}};
// Input 18
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var m=runtime.getWindow().document,g=m.getElementById("testarea");runtime.assert(!g,'Unclean test environment, found a div with id "testarea".');g=m.createElement("div");g.setAttribute("id","testarea");m.body.appendChild(g);return g};
core.UnitTest.cleanupTestAreaDiv=function(){var m=runtime.getWindow().document,g=m.getElementById("testarea");runtime.assert(!!g&&g.parentNode===m.body,'Test environment broken, found no div with id "testarea" below body.');m.body.removeChild(g)};core.UnitTest.createOdtDocument=function(m,g){var b="<?xml version='1.0' encoding='UTF-8'?>",b=b+"<office:document";Object.keys(g).forEach(function(k){b+=" xmlns:"+k+'="'+g[k]+'"'});b+=">";b+=m;b+="</office:document>";return runtime.parseXML(b)};
core.UnitTestLogger=function(){var m=[],g=0,b=0,k="",d="";this.startTest=function(n,p){m=[];g=0;k=n;d=p;b=(new Date).getTime()};this.endTest=function(){var n=(new Date).getTime();return{description:d,suite:[k,d],success:0===g,log:m,time:n-b}};this.debug=function(b){m.push({category:"debug",message:b})};this.fail=function(b){g+=1;m.push({category:"fail",message:b})};this.pass=function(b){m.push({category:"pass",message:b})}};
core.UnitTestRunner=function(m,g){function b(c){q+=1;a?g.debug(c):g.fail(c)}function k(a,l){var h;try{if(a.length!==l.length)return b("array of length "+a.length+" should be "+l.length+" long"),!1;for(h=0;h<a.length;h+=1)if(a[h]!==l[h])return b(a[h]+" should be "+l[h]+" at array index "+h),!1}catch(d){return!1}return!0}function d(a,l,h){var e=a.attributes,f=e.length,k,n,g;for(k=0;k<f;k+=1)if(n=e.item(k),"xmlns"!==n.prefix&&"urn:webodf:names:steps"!==n.namespaceURI){g=l.getAttributeNS(n.namespaceURI,
n.localName);if(!l.hasAttributeNS(n.namespaceURI,n.localName))return b("Attribute "+n.localName+" with value "+n.value+" was not present"),!1;if(g!==n.value)return b("Attribute "+n.localName+" was "+g+" should be "+n.value),!1}return h?!0:d(l,a,!0)}function n(a,l){var h,e;h=a.nodeType;e=l.nodeType;if(h!==e)return b("Nodetype '"+h+"' should be '"+e+"'"),!1;if(h===Node.TEXT_NODE){if(a.data===l.data)return!0;b("Textnode data '"+a.data+"' should be '"+l.data+"'");return!1}runtime.assert(h===Node.ELEMENT_NODE,
"Only textnodes and elements supported.");if(a.namespaceURI!==l.namespaceURI)return b("namespace '"+a.namespaceURI+"' should be '"+l.namespaceURI+"'"),!1;if(a.localName!==l.localName)return b("localName '"+a.localName+"' should be '"+l.localName+"'"),!1;if(!d(a,l,!1))return!1;h=a.firstChild;for(e=l.firstChild;h;){if(!e)return b("Nodetype '"+h.nodeType+"' is unexpected here."),!1;if(!n(h,e))return!1;h=h.nextSibling;e=e.nextSibling}return e?(b("Nodetype '"+e.nodeType+"' is missing here."),!1):!0}function p(a,
b){return 0===b?a===b&&1/a===1/b:a===b?!0:null===a||null===b?!1:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?k(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?n(a,b):r(a,b):!1}function f(a,l,h){"string"===typeof l&&"string"===typeof h||g.debug("WARN: shouldBe() expects string arguments");var d,e;try{e=eval(l)}catch(f){d=f}a=eval(h);d?b(l+" should be "+a+". Threw exception "+
d):p(e,a)?g.pass(l+" is "+h):String(typeof e)===String(typeof a)?(h=0===e&&0>1/e?"-0":String(e),b(l+" should be "+a+". Was "+h+".")):b(l+" should be "+a+" (of type "+typeof a+"). Was "+e+" (of type "+typeof e+").")}var q=0,e,r,a=!1;this.resourcePrefix=function(){return m};this.beginExpectFail=function(){e=q;a=!0};this.endExpectFail=function(){var c=e===q;a=!1;q=e;c&&(q+=1,g.fail("Expected at least one failed test, but none registered."))};r=function(a,l){var d=Object.keys(a),e=Object.keys(l);d.sort();
e.sort();return k(d,e)&&Object.keys(a).every(function(d){var h=a[d],e=l[d];return p(h,e)?!0:(b(h+" should be "+e+" for key "+d),!1)})};this.areNodesEqual=n;this.shouldBeNull=function(a,b){f(a,b,"null")};this.shouldBeNonNull=function(a,d){var h,e;try{e=eval(d)}catch(f){h=f}h?b(d+" should be non-null. Threw exception "+h):null!==e?g.pass(d+" is non-null."):b(d+" should be non-null. Was "+e)};this.shouldBe=f;this.testFailed=b;this.countFailedTests=function(){return q};this.name=function(a){var b,d,e=
[],f=a.length;e.length=f;for(b=0;b<f;b+=1){d=Runtime.getFunctionName(a[b])||"";if(""===d)throw"Found a function without a name.";e[b]={f:a[b],name:d}}return e}};
core.UnitTester=function(){function m(b,d){return"<span style='color:blue;cursor:pointer' onclick='"+d+"'>"+b+"</span>"}function g(d){b.reporter&&b.reporter(d)}var b=this,k=0,d=new core.UnitTestLogger,n={},p="BrowserRuntime"===runtime.type();this.resourcePrefix="";this.reporter=function(b){var d,e;p?runtime.log("<span>Running "+m(b.description,'runTest("'+b.suite[0]+'","'+b.description+'")')+"</span>"):runtime.log("Running "+b.description);if(!b.success)for(d=0;d<b.log.length;d+=1)e=b.log[d],runtime.log(e.category,
e.message)};this.runTests=function(f,q,e){function r(b){if(0===b.length)n[a]=h,k+=c.countFailedTests(),q();else{w=b[0].f;var f=b[0].name,p=!0===b[0].expectFail;u=c.countFailedTests();e.length&&-1===e.indexOf(f)?r(b.slice(1)):(l.setUp(),d.startTest(a,f),p&&c.beginExpectFail(),w(function(){p&&c.endExpectFail();g(d.endTest());l.tearDown();h[f]=u===c.countFailedTests();r(b.slice(1))}))}}var a=Runtime.getFunctionName(f)||"",c=new core.UnitTestRunner(b.resourcePrefix,d),l=new f(c),h={},v,w,z,x,u;if(n.hasOwnProperty(a))runtime.log("Test "+
a+" has already run.");else{p?runtime.log("<span>Running "+m(a,'runSuite("'+a+'");')+": "+l.description()+"</span>"):runtime.log("Running "+a+": "+l.description);z=l.tests();for(v=0;v<z.length;v+=1)if(w=z[v].f,f=z[v].name,x=!0===z[v].expectFail,!e.length||-1!==e.indexOf(f)){u=c.countFailedTests();l.setUp();d.startTest(a,f);x&&c.beginExpectFail();try{w()}catch(t){c.testFailed("Unexpected exception encountered: "+t.toString()+"\n"+t.stack)}x&&c.endExpectFail();g(d.endTest());l.tearDown();h[f]=u===c.countFailedTests()}r(l.asyncTests())}};
this.countFailedTests=function(){return k};this.results=function(){return n}};
// Input 19
core.Utils=function(){function m(g,b){if(b&&Array.isArray(b)){g=g||[];if(!Array.isArray(g))throw"Destination is not an array.";g=g.concat(b.map(function(b){return m(null,b)}))}else if(b&&"object"===typeof b){g=g||{};if("object"!==typeof g)throw"Destination is not an object.";Object.keys(b).forEach(function(k){g[k]=m(g[k],b[k])})}else g=b;return g}this.hashString=function(g){var b=0,k,d;k=0;for(d=g.length;k<d;k+=1)b=(b<<5)-b+g.charCodeAt(k),b|=0;return b};this.mergeObjects=function(g,b){Object.keys(b).forEach(function(k){g[k]=
m(g[k],b[k])});return g}};
// Input 20
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
core.Zip=function(m,g){function b(a){var c=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,d,e=a.length,h=0,h=0;b=-1;for(d=0;d<e;d+=1)h=(b^a[d])&255,h=c[h],b=b>>>8^h;return b^-1}function k(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function d(a){var c=a.getFullYear();return 1980>c?0:c-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function n(a,c){var b,d,e,l,f,n,g,p=this;this.load=function(c){if(null!==p.data)c(null,p.data);else{var b=f+34+d+e+256;b+g>h&&(b=h-g);runtime.read(a,g,b,function(b,d){if(b||null===d)c(b,d);else a:{var e=d,h=new core.ByteArray(e),k=h.readUInt32LE(),g;if(67324752!==k)c("File entry signature is wrong."+k.toString()+" "+e.length.toString(),null);else{h.pos+=22;k=h.readUInt16LE();g=h.readUInt16LE();h.pos+=k+g;if(l){e=
e.subarray(h.pos,h.pos+f);if(f!==e.length){c("The amount of compressed bytes read was "+e.length.toString()+" instead of "+f.toString()+" for "+p.filename+" in "+a+".",null);break a}e=w(e,n)}else e=e.subarray(h.pos,h.pos+n);n!==e.length?c("The amount of bytes read was "+e.length.toString()+" instead of "+n.toString()+" for "+p.filename+" in "+a+".",null):(p.data=e,c(null,e))}}})}};this.set=function(a,c,b,d){p.filename=a;p.data=c;p.compressed=b;p.date=d};this.error=null;c&&(b=c.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+a+'": '+c.data.length.toString():(c.pos+=6,l=c.readUInt16LE(),this.date=k(c.readUInt32LE()),c.readUInt32LE(),f=c.readUInt32LE(),n=c.readUInt32LE(),d=c.readUInt16LE(),e=c.readUInt16LE(),b=c.readUInt16LE(),c.pos+=8,g=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.subarray(c.pos,c.pos+d),"utf8"),this.data=null,c.pos+=d+e+b))}function p(a,c){if(22!==a.length)c("Central directory length should be 22.",
z);else{var b=new core.ByteArray(a),d;d=b.readUInt32LE();101010256!==d?c("Central directory signature is wrong: "+d.toString(),z):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",z):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",z):(d=b.readUInt16LE(),v=b.readUInt16LE(),d!==v?c("Number of entries is inconsistent.",z):(d=b.readUInt32LE(),b=b.readUInt16LE(),b=h-22-d,runtime.read(m,b,h-b,function(a,b){if(a||null===b)c(a,z);else a:{var d=
new core.ByteArray(b),e,h;l=[];for(e=0;e<v;e+=1){h=new n(m,d);if(h.error){c(h.error,z);break a}l[l.length]=h}c(null,z)}})))))}}function f(a,c){var b=null,d,e;for(e=0;e<l.length;e+=1)if(d=l[e],d.filename===a){b=d;break}b?b.data?c(null,b.data):b.load(c):c(a+" not found.",null)}function q(a){var c=new core.ByteArrayWriter("utf8"),e=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(e=a.data.length);c.appendUInt32LE(d(a.date));c.appendUInt32LE(a.data?b(a.data):0);c.appendUInt32LE(e);c.appendUInt32LE(e);
c.appendUInt16LE(a.filename.length);c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function e(a,c){var e=new core.ByteArrayWriter("utf8"),h=0;e.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(h=a.data.length);e.appendUInt32LE(d(a.date));e.appendUInt32LE(a.data?b(a.data):0);e.appendUInt32LE(h);e.appendUInt32LE(h);e.appendUInt16LE(a.filename.length);e.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);e.appendUInt32LE(c);e.appendString(a.filename);return e}function r(a,
c){if(a===l.length)c(null);else{var b=l[a];null!==b.data?r(a+1,c):b.load(function(b){b?c(b):r(a+1,c)})}}function a(a,c){r(0,function(b){if(b)c(b);else{var d,h,f=new core.ByteArrayWriter("utf8"),k=[0];for(d=0;d<l.length;d+=1)f.appendByteArrayWriter(q(l[d])),k.push(f.getLength());b=f.getLength();for(d=0;d<l.length;d+=1)h=l[d],f.appendByteArrayWriter(e(h,k[d]));d=f.getLength()-b;f.appendArray([80,75,5,6,0,0,0,0]);f.appendUInt16LE(l.length);f.appendUInt16LE(l.length);f.appendUInt32LE(d);f.appendUInt32LE(b);
f.appendArray([0,0]);a(f.getByteArray())}})}function c(c,b){a(function(a){runtime.writeFile(c,a,b)},b)}var l,h,v,w=(new core.RawInflate).inflate,z=this,x=new core.Base64;this.load=f;this.save=function(a,c,b,d){var e,h;for(e=0;e<l.length;e+=1)if(h=l[e],h.filename===a){h.set(a,c,b,d);return}h=new n(m);h.set(a,c,b,d);l.push(h)};this.remove=function(a){var c,b;for(c=0;c<l.length;c+=1)if(b=l[c],b.filename===a)return l.splice(c,1),!0;return!1};this.write=function(a){c(m,a)};this.writeAs=c;this.createByteArray=
a;this.loadContentXmlAsFragments=function(a,c){z.loadAsString(a,function(a,b){if(a)return c.rootElementReady(a);c.rootElementReady(null,b,!0)})};this.loadAsString=function(a,c){f(a,function(a,b){if(a||null===b)return c(a,null);var d=runtime.byteArrayToString(b,"utf8");c(null,d)})};this.loadAsDOM=function(a,c){z.loadAsString(a,function(a,b){if(a||null===b)c(a,null);else{var d=(new DOMParser).parseFromString(b,"text/xml");c(null,d)}})};this.loadAsDataURL=function(a,c,b){f(a,function(a,d){if(a||!d)return b(a,
null);var e=0,h;c||(c=80===d[1]&&78===d[2]&&71===d[3]?"image/png":255===d[0]&&216===d[1]&&255===d[2]?"image/jpeg":71===d[0]&&73===d[1]&&70===d[2]?"image/gif":"");for(h="data:"+c+";base64,";e<d.length;)h+=x.convertUTF8ArrayToBase64(d.subarray(e,Math.min(e+45E3,d.length))),e+=45E3;b(null,h)})};this.getEntries=function(){return l.slice()};h=-1;null===g?l=[]:runtime.getFileSize(m,function(a){h=a;0>h?g("File '"+m+"' cannot be read.",z):runtime.read(m,h-22,22,function(a,c){a||null===g||null===c?g(a,z):
p(c,g)})})};
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
(function(){var m=odf.Namespaces.namespaceMap,g=odf.Namespaces.prefixMap,b;for(b in m)m.hasOwnProperty(b)&&(g[m[b]]=b)})();odf.Namespaces.forEachPrefix=function(m){var g=odf.Namespaces.namespaceMap,b;for(b in g)g.hasOwnProperty(b)&&m(b,g[b])};odf.Namespaces.lookupNamespaceURI=function(m){var g=null;odf.Namespaces.namespaceMap.hasOwnProperty(m)&&(g=odf.Namespaces.namespaceMap[m]);return g};odf.Namespaces.lookupPrefix=function(m){var g=odf.Namespaces.prefixMap;return g.hasOwnProperty(m)?g[m]:null};
odf.Namespaces.lookupNamespaceURI.lookupNamespaceURI=odf.Namespaces.lookupNamespaceURI;
// Input 24
xmldom.XPathIterator=function(){};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};
function createXPathSingleton(){function m(b,a,c){return-1!==b&&(b<a||-1===a)&&(b<c||-1===c)}function g(b){for(var a=[],c=0,d=b.length,h;c<d;){var f=b,k=d,n=a,g="",p=[],q=f.indexOf("[",c),s=f.indexOf("/",c),y=f.indexOf("=",c);m(s,q,y)?(g=f.substring(c,s),c=s+1):m(q,s,y)?(g=f.substring(c,q),c=e(f,q,p)):m(y,s,q)?(g=f.substring(c,y),c=y):(g=f.substring(c,k),c=k);n.push({location:g,predicates:p});if(c<d&&"="===b[c]){h=b.substring(c+1,d);if(2<h.length&&("'"===h[0]||'"'===h[0]))h=h.slice(1,h.length-1);
else try{h=parseInt(h,10)}catch(F){}c=d}}return{steps:a,value:h}}function b(){var b=null,a=!1;this.setNode=function(a){b=a};this.reset=function(){a=!1};this.next=function(){var c=a?null:b;a=!0;return c}}function k(b,a,c){this.reset=function(){b.reset()};this.next=function(){for(var d=b.next();d;){d.nodeType===Node.ELEMENT_NODE&&(d=d.getAttributeNodeNS(a,c));if(d)break;d=b.next()}return d}}function d(b,a){var c=b.next(),d=null;this.reset=function(){b.reset();c=b.next();d=null};this.next=function(){for(;c;){if(d)if(a&&
d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&d!==c;)d=d.parentNode;d===c?c=b.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=b.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function n(b,a){this.reset=function(){b.reset()};this.next=function(){for(var c=b.next();c&&!a(c);)c=b.next();return c}}function p(b,a,c){a=a.split(":",2);var d=c(a[0]),e=a[1];return new n(b,function(a){return a.localName===e&&a.namespaceURI===d})}function f(d,a,c){var e=new b,h=q(e,
a,c),f=a.value;return void 0===f?new n(d,function(a){e.setNode(a);h.reset();return null!==h.next()}):new n(d,function(a){e.setNode(a);h.reset();return(a=h.next())?a.nodeValue===f:!1})}var q,e;e=function(b,a,c){for(var d=a,e=b.length,f=0;d<e;)"]"===b[d]?(f-=1,0>=f&&c.push(g(b.substring(a,d)))):"["===b[d]&&(0>=f&&(a=d+1),f+=1),d+=1;return d};q=function(b,a,c){var e,h,n,g;for(e=0;e<a.steps.length;e+=1){n=a.steps[e];h=n.location;if(""===h)b=new d(b,!1);else if("@"===h[0]){h=h.substr(1).split(":",2);g=
c(h[0]);if(!g)throw"No namespace associated with the prefix "+h[0];b=new k(b,g,h[1])}else"."!==h&&(b=new d(b,!1),-1!==h.indexOf(":")&&(b=p(b,h,c)));for(h=0;h<n.predicates.length;h+=1)g=n.predicates[h],b=f(b,g,c)}return b};return{getODFElementsWithXPath:function(d,a,c){var e=d.ownerDocument,h=[],f=null;if(e&&"function"===typeof e.evaluate)for(c=e.evaluate(a,d,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),f=c.iterateNext();null!==f;)f.nodeType===Node.ELEMENT_NODE&&h.push(f),f=c.iterateNext();else{h=
new b;h.setNode(d);d=g(a);h=q(h,d,c);d=[];for(c=h.next();c;)d.push(c),c=h.next();h=d}return h}}}xmldom.XPath=createXPathSingleton();
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
odf.StyleInfo=function(){function m(a,c){var b,d,e,h,l,f=0;if(b=L[a.localName])if(e=b[a.namespaceURI])f=e.length;for(b=0;b<f;b+=1)d=e[b],h=d.ns,l=d.localname,(d=a.getAttributeNS(h,l))&&a.setAttributeNS(h,y[h]+l,c+d);for(e=a.firstElementChild;e;)m(e,c),e=e.nextElementSibling}function g(a,c){var b,d,e,h,l,f=0;if(b=L[a.localName])if(e=b[a.namespaceURI])f=e.length;for(b=0;b<f;b+=1)if(d=e[b],h=d.ns,l=d.localname,d=a.getAttributeNS(h,l))d=d.replace(c,""),a.setAttributeNS(h,y[h]+l,d);for(e=a.firstElementChild;e;)g(e,
c),e=e.nextElementSibling}function b(a,c){var b,d,e,h,l,f=0;if(b=L[a.localName])if(e=b[a.namespaceURI])f=e.length;for(b=0;b<f;b+=1)if(h=e[b],d=h.ns,l=h.localname,d=a.getAttributeNS(d,l))c=c||{},h=h.keyname,c.hasOwnProperty(h)?c[h][d]=1:(l={},l[d]=1,c[h]=l);return c}function k(a,c){var d,e;b(a,c);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(e=d,k(e,c)),d=d.nextSibling}function d(a,c,b){this.key=a;this.name=c;this.family=b;this.requires={}}function n(a,c,b){var e=a+'"'+c,h=b[e];h||(h=b[e]=
new d(e,a,c));return h}function p(a,c,b){var d,e,h,l,f,k=0;d=a.getAttributeNS(u,"name");l=a.getAttributeNS(u,"family");d&&l&&(c=n(d,l,b));if(c){if(d=L[a.localName])if(h=d[a.namespaceURI])k=h.length;for(d=0;d<k;d+=1)if(l=h[d],e=l.ns,f=l.localname,e=a.getAttributeNS(e,f))l=l.keyname,l=n(e,l,b),c.requires[l.key]=l}for(a=a.firstElementChild;a;)p(a,c,b),a=a.nextElementSibling;return b}function f(a,c){var b=c[a.family];b||(b=c[a.family]={});b[a.name]=1;Object.keys(a.requires).forEach(function(b){f(a.requires[b],
c)})}function q(a,c){var b=p(a,null,{});Object.keys(b).forEach(function(a){a=b[a];var d=c[a.family];d&&d.hasOwnProperty(a.name)&&f(a,c)})}function e(a,c){function b(c){(c=l.getAttributeNS(u,c))&&(a[c]=!0)}var d=["font-name","font-name-asian","font-name-complex"],h,l;for(h=c&&c.firstElementChild;h;)l=h,d.forEach(b),e(a,l),h=h.nextElementSibling}function r(a,c){function b(a){var d=h.getAttributeNS(u,a);d&&c.hasOwnProperty(d)&&h.setAttributeNS(u,"style:"+a,c[d])}var d=["font-name","font-name-asian",
"font-name-complex"],e,h;for(e=a&&a.firstElementChild;e;)h=e,d.forEach(b),r(h,c),e=e.nextElementSibling}var a=odf.Namespaces.chartns,c=odf.Namespaces.dbns,l=odf.Namespaces.dr3dns,h=odf.Namespaces.drawns,v=odf.Namespaces.formns,w=odf.Namespaces.numberns,z=odf.Namespaces.officens,x=odf.Namespaces.presentationns,u=odf.Namespaces.stylens,t=odf.Namespaces.tablens,s=odf.Namespaces.textns,y={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},F={text:[{ens:u,en:"tab-stop",ans:u,a:"leader-text-style"},{ens:u,en:"drop-cap",ans:u,a:"style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-body-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-style-name"},{ens:s,en:"a",ans:s,a:"style-name"},{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"linenumbering-configuration",
ans:s,a:"style-name"},{ens:s,en:"list-level-style-number",ans:s,a:"style-name"},{ens:s,en:"ruby-text",ans:s,a:"style-name"},{ens:s,en:"span",ans:s,a:"style-name"},{ens:s,en:"a",ans:s,a:"visited-style-name"},{ens:u,en:"text-properties",ans:u,a:"text-line-through-text-style"},{ens:s,en:"alphabetical-index-source",ans:s,a:"main-entry-style-name"},{ens:s,en:"index-entry-bibliography",ans:s,a:"style-name"},{ens:s,en:"index-entry-chapter",ans:s,a:"style-name"},{ens:s,en:"index-entry-link-end",ans:s,a:"style-name"},
{ens:s,en:"index-entry-link-start",ans:s,a:"style-name"},{ens:s,en:"index-entry-page-number",ans:s,a:"style-name"},{ens:s,en:"index-entry-span",ans:s,a:"style-name"},{ens:s,en:"index-entry-tab-stop",ans:s,a:"style-name"},{ens:s,en:"index-entry-text",ans:s,a:"style-name"},{ens:s,en:"index-title-template",ans:s,a:"style-name"},{ens:s,en:"list-level-style-bullet",ans:s,a:"style-name"},{ens:s,en:"outline-level-style",ans:s,a:"style-name"}],paragraph:[{ens:h,en:"caption",ans:h,a:"text-style-name"},{ens:h,
en:"circle",ans:h,a:"text-style-name"},{ens:h,en:"connector",ans:h,a:"text-style-name"},{ens:h,en:"control",ans:h,a:"text-style-name"},{ens:h,en:"custom-shape",ans:h,a:"text-style-name"},{ens:h,en:"ellipse",ans:h,a:"text-style-name"},{ens:h,en:"frame",ans:h,a:"text-style-name"},{ens:h,en:"line",ans:h,a:"text-style-name"},{ens:h,en:"measure",ans:h,a:"text-style-name"},{ens:h,en:"path",ans:h,a:"text-style-name"},{ens:h,en:"polygon",ans:h,a:"text-style-name"},{ens:h,en:"polyline",ans:h,a:"text-style-name"},
{ens:h,en:"rect",ans:h,a:"text-style-name"},{ens:h,en:"regular-polygon",ans:h,a:"text-style-name"},{ens:z,en:"annotation",ans:h,a:"text-style-name"},{ens:v,en:"column",ans:v,a:"text-style-name"},{ens:u,en:"style",ans:u,a:"next-style-name"},{ens:t,en:"body",ans:t,a:"paragraph-style-name"},{ens:t,en:"even-columns",ans:t,a:"paragraph-style-name"},{ens:t,en:"even-rows",ans:t,a:"paragraph-style-name"},{ens:t,en:"first-column",ans:t,a:"paragraph-style-name"},{ens:t,en:"first-row",ans:t,a:"paragraph-style-name"},
{ens:t,en:"last-column",ans:t,a:"paragraph-style-name"},{ens:t,en:"last-row",ans:t,a:"paragraph-style-name"},{ens:t,en:"odd-columns",ans:t,a:"paragraph-style-name"},{ens:t,en:"odd-rows",ans:t,a:"paragraph-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"default-style-name"},{ens:s,en:"alphabetical-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"bibliography-entry-template",ans:s,a:"style-name"},{ens:s,en:"h",ans:s,a:"style-name"},{ens:s,en:"illustration-index-entry-template",ans:s,a:"style-name"},
{ens:s,en:"index-source-style",ans:s,a:"style-name"},{ens:s,en:"object-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"p",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-of-content-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"user-index-entry-template",ans:s,a:"style-name"},{ens:u,en:"page-layout-properties",ans:u,a:"register-truth-ref-style-name"}],chart:[{ens:a,en:"axis",ans:a,
a:"style-name"},{ens:a,en:"chart",ans:a,a:"style-name"},{ens:a,en:"data-label",ans:a,a:"style-name"},{ens:a,en:"data-point",ans:a,a:"style-name"},{ens:a,en:"equation",ans:a,a:"style-name"},{ens:a,en:"error-indicator",ans:a,a:"style-name"},{ens:a,en:"floor",ans:a,a:"style-name"},{ens:a,en:"footer",ans:a,a:"style-name"},{ens:a,en:"grid",ans:a,a:"style-name"},{ens:a,en:"legend",ans:a,a:"style-name"},{ens:a,en:"mean-value",ans:a,a:"style-name"},{ens:a,en:"plot-area",ans:a,a:"style-name"},{ens:a,en:"regression-curve",
ans:a,a:"style-name"},{ens:a,en:"series",ans:a,a:"style-name"},{ens:a,en:"stock-gain-marker",ans:a,a:"style-name"},{ens:a,en:"stock-loss-marker",ans:a,a:"style-name"},{ens:a,en:"stock-range-line",ans:a,a:"style-name"},{ens:a,en:"subtitle",ans:a,a:"style-name"},{ens:a,en:"title",ans:a,a:"style-name"},{ens:a,en:"wall",ans:a,a:"style-name"}],section:[{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"bibliography",ans:s,a:"style-name"},{ens:s,en:"illustration-index",ans:s,a:"style-name"},
{ens:s,en:"index-title",ans:s,a:"style-name"},{ens:s,en:"object-index",ans:s,a:"style-name"},{ens:s,en:"section",ans:s,a:"style-name"},{ens:s,en:"table-of-content",ans:s,a:"style-name"},{ens:s,en:"table-index",ans:s,a:"style-name"},{ens:s,en:"user-index",ans:s,a:"style-name"}],ruby:[{ens:s,en:"ruby",ans:s,a:"style-name"}],table:[{ens:c,en:"query",ans:c,a:"style-name"},{ens:c,en:"table-representation",ans:c,a:"style-name"},{ens:t,en:"background",ans:t,a:"style-name"},{ens:t,en:"table",ans:t,a:"style-name"}],
"table-column":[{ens:c,en:"column",ans:c,a:"style-name"},{ens:t,en:"table-column",ans:t,a:"style-name"}],"table-row":[{ens:c,en:"query",ans:c,a:"default-row-style-name"},{ens:c,en:"table-representation",ans:c,a:"default-row-style-name"},{ens:t,en:"table-row",ans:t,a:"style-name"}],"table-cell":[{ens:c,en:"column",ans:c,a:"default-cell-style-name"},{ens:t,en:"table-column",ans:t,a:"default-cell-style-name"},{ens:t,en:"table-row",ans:t,a:"default-cell-style-name"},{ens:t,en:"body",ans:t,a:"style-name"},
{ens:t,en:"covered-table-cell",ans:t,a:"style-name"},{ens:t,en:"even-columns",ans:t,a:"style-name"},{ens:t,en:"covered-table-cell",ans:t,a:"style-name"},{ens:t,en:"even-columns",ans:t,a:"style-name"},{ens:t,en:"even-rows",ans:t,a:"style-name"},{ens:t,en:"first-column",ans:t,a:"style-name"},{ens:t,en:"first-row",ans:t,a:"style-name"},{ens:t,en:"last-column",ans:t,a:"style-name"},{ens:t,en:"last-row",ans:t,a:"style-name"},{ens:t,en:"odd-columns",ans:t,a:"style-name"},{ens:t,en:"odd-rows",ans:t,a:"style-name"},
{ens:t,en:"table-cell",ans:t,a:"style-name"}],graphic:[{ens:l,en:"cube",ans:h,a:"style-name"},{ens:l,en:"extrude",ans:h,a:"style-name"},{ens:l,en:"rotate",ans:h,a:"style-name"},{ens:l,en:"scene",ans:h,a:"style-name"},{ens:l,en:"sphere",ans:h,a:"style-name"},{ens:h,en:"caption",ans:h,a:"style-name"},{ens:h,en:"circle",ans:h,a:"style-name"},{ens:h,en:"connector",ans:h,a:"style-name"},{ens:h,en:"control",ans:h,a:"style-name"},{ens:h,en:"custom-shape",ans:h,a:"style-name"},{ens:h,en:"ellipse",ans:h,a:"style-name"},
{ens:h,en:"frame",ans:h,a:"style-name"},{ens:h,en:"g",ans:h,a:"style-name"},{ens:h,en:"line",ans:h,a:"style-name"},{ens:h,en:"measure",ans:h,a:"style-name"},{ens:h,en:"page-thumbnail",ans:h,a:"style-name"},{ens:h,en:"path",ans:h,a:"style-name"},{ens:h,en:"polygon",ans:h,a:"style-name"},{ens:h,en:"polyline",ans:h,a:"style-name"},{ens:h,en:"rect",ans:h,a:"style-name"},{ens:h,en:"regular-polygon",ans:h,a:"style-name"},{ens:z,en:"annotation",ans:h,a:"style-name"}],presentation:[{ens:l,en:"cube",ans:x,
a:"style-name"},{ens:l,en:"extrude",ans:x,a:"style-name"},{ens:l,en:"rotate",ans:x,a:"style-name"},{ens:l,en:"scene",ans:x,a:"style-name"},{ens:l,en:"sphere",ans:x,a:"style-name"},{ens:h,en:"caption",ans:x,a:"style-name"},{ens:h,en:"circle",ans:x,a:"style-name"},{ens:h,en:"connector",ans:x,a:"style-name"},{ens:h,en:"control",ans:x,a:"style-name"},{ens:h,en:"custom-shape",ans:x,a:"style-name"},{ens:h,en:"ellipse",ans:x,a:"style-name"},{ens:h,en:"frame",ans:x,a:"style-name"},{ens:h,en:"g",ans:x,a:"style-name"},
{ens:h,en:"line",ans:x,a:"style-name"},{ens:h,en:"measure",ans:x,a:"style-name"},{ens:h,en:"page-thumbnail",ans:x,a:"style-name"},{ens:h,en:"path",ans:x,a:"style-name"},{ens:h,en:"polygon",ans:x,a:"style-name"},{ens:h,en:"polyline",ans:x,a:"style-name"},{ens:h,en:"rect",ans:x,a:"style-name"},{ens:h,en:"regular-polygon",ans:x,a:"style-name"},{ens:z,en:"annotation",ans:x,a:"style-name"}],"drawing-page":[{ens:h,en:"page",ans:h,a:"style-name"},{ens:x,en:"notes",ans:h,a:"style-name"},{ens:u,en:"handout-master",
ans:h,a:"style-name"},{ens:u,en:"master-page",ans:h,a:"style-name"}],"list-style":[{ens:s,en:"list",ans:s,a:"style-name"},{ens:s,en:"numbered-paragraph",ans:s,a:"style-name"},{ens:s,en:"list-item",ans:s,a:"style-override"},{ens:u,en:"style",ans:u,a:"list-style-name"}],data:[{ens:u,en:"style",ans:u,a:"data-style-name"},{ens:u,en:"style",ans:u,a:"percentage-data-style-name"},{ens:x,en:"date-time-decl",ans:u,a:"data-style-name"},{ens:s,en:"creation-date",ans:u,a:"data-style-name"},{ens:s,en:"creation-time",
ans:u,a:"data-style-name"},{ens:s,en:"database-display",ans:u,a:"data-style-name"},{ens:s,en:"date",ans:u,a:"data-style-name"},{ens:s,en:"editing-duration",ans:u,a:"data-style-name"},{ens:s,en:"expression",ans:u,a:"data-style-name"},{ens:s,en:"meta-field",ans:u,a:"data-style-name"},{ens:s,en:"modification-date",ans:u,a:"data-style-name"},{ens:s,en:"modification-time",ans:u,a:"data-style-name"},{ens:s,en:"print-date",ans:u,a:"data-style-name"},{ens:s,en:"print-time",ans:u,a:"data-style-name"},{ens:s,
en:"table-formula",ans:u,a:"data-style-name"},{ens:s,en:"time",ans:u,a:"data-style-name"},{ens:s,en:"user-defined",ans:u,a:"data-style-name"},{ens:s,en:"user-field-get",ans:u,a:"data-style-name"},{ens:s,en:"user-field-input",ans:u,a:"data-style-name"},{ens:s,en:"variable-get",ans:u,a:"data-style-name"},{ens:s,en:"variable-input",ans:u,a:"data-style-name"},{ens:s,en:"variable-set",ans:u,a:"data-style-name"}],"page-layout":[{ens:x,en:"notes",ans:u,a:"page-layout-name"},{ens:u,en:"handout-master",ans:u,
a:"page-layout-name"},{ens:u,en:"master-page",ans:u,a:"page-layout-name"}]},L,O=xmldom.XPath;this.collectUsedFontFaces=e;this.changeFontFaceNames=r;this.UsedStyleList=function(a,c){var b={};this.uses=function(a){var c=a.localName,d=a.getAttributeNS(h,"name")||a.getAttributeNS(u,"name");a="style"===c?a.getAttributeNS(u,"family"):a.namespaceURI===w?"data":c;return(a=b[a])?0<a[d]:!1};k(a,b);c&&q(c,b)};this.hasDerivedStyles=function(a,c,b){var d=b.getAttributeNS(u,"name");b=b.getAttributeNS(u,"family");
return O.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+d+"'][@style:family='"+b+"']",c).length?!0:!1};this.prefixStyleNames=function(a,c,b){var d;if(a){for(d=a.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d,l=c,f=e.getAttributeNS(h,"name"),k=void 0;f?k=h:(f=e.getAttributeNS(u,"name"))&&(k=u);k&&e.setAttributeNS(k,y[k]+"name",l+f)}d=d.nextSibling}m(a,c);b&&m(b,c)}};this.removePrefixFromStyleNames=function(a,c,b){var d=RegExp("^"+c);if(a){for(c=a.firstChild;c;){if(c.nodeType===
Node.ELEMENT_NODE){var e=c,l=d,f=e.getAttributeNS(h,"name"),k=void 0;f?k=h:(f=e.getAttributeNS(u,"name"))&&(k=u);k&&(f=f.replace(l,""),e.setAttributeNS(k,y[k]+"name",f))}c=c.nextSibling}g(a,d);b&&g(b,d)}};this.determineStylesForNode=b;L=function(){var a,c,b,d,e,h={},l,f,k,n;for(b in F)if(F.hasOwnProperty(b))for(d=F[b],c=d.length,a=0;a<c;a+=1)e=d[a],k=e.en,n=e.ens,h.hasOwnProperty(k)?l=h[k]:h[k]=l={},l.hasOwnProperty(n)?f=l[n]:l[n]=f=[],f.push({ns:e.ans,localname:e.a,keyname:b});return h}()};
// Input 26
"function"!==typeof Object.create&&(Object.create=function(m){var g=function(){};g.prototype=m;return new g});
xmldom.LSSerializer=function(){function m(b){var k=b||{},g=function(b){var a={},c;for(c in b)b.hasOwnProperty(c)&&(a[b[c]]=c);return a}(b),f=[k],m=[g],e=0;this.push=function(){e+=1;k=f[e]=Object.create(k);g=m[e]=Object.create(g)};this.pop=function(){f.pop();m.pop();e-=1;k=f[e];g=m[e]};this.getLocalNamespaceDefinitions=function(){return g};this.getQName=function(b){var a=b.namespaceURI,c=0,d;if(!a)return b.localName;if(d=g[a])return d+":"+b.localName;do{d||!b.prefix?(d="ns"+c,c+=1):d=b.prefix;if(k[d]===
a)break;if(!k[d]){k[d]=a;g[a]=d;break}d=null}while(null===d);return d+":"+b.localName}}function g(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function b(d,n){var p="",f=k.filter?k.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,m;if(f===NodeFilter.FILTER_ACCEPT&&n.nodeType===Node.ELEMENT_NODE){d.push();m=d.getQName(n);var e,r=n.attributes,a,c,l,h="",v;e="<"+m;a=r.length;for(c=0;c<a;c+=1)l=r.item(c),"http://www.w3.org/2000/xmlns/"!==
l.namespaceURI&&(v=k.filter?k.filter.acceptNode(l):NodeFilter.FILTER_ACCEPT,v===NodeFilter.FILTER_ACCEPT&&(v=d.getQName(l),l="string"===typeof l.value?g(l.value):l.value,h+=" "+(v+'="'+l+'"')));a=d.getLocalNamespaceDefinitions();for(c in a)a.hasOwnProperty(c)&&((r=a[c])?"xmlns"!==r&&(e+=" xmlns:"+a[c]+'="'+c+'"'):e+=' xmlns="'+c+'"');p+=e+(h+">")}if(f===NodeFilter.FILTER_ACCEPT||f===NodeFilter.FILTER_SKIP){for(f=n.firstChild;f;)p+=b(d,f),f=f.nextSibling;n.nodeValue&&(p+=g(n.nodeValue))}m&&(p+="</"+
m+">",d.pop());return p}var k=this;this.filter=null;this.writeToString=function(d,k){if(!d)return"";var g=new m(k);return b(g,d)}};
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
(function(){function m(b){var a,c=f.length;for(a=0;a<c;a+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI&&b.localName===f[a])return a;return-1}function g(b,a){var c=new d.UsedStyleList(b,a),e=new odf.OdfNodeFilter;this.acceptNode=function(b){var d=e.acceptNode(b);d===NodeFilter.FILTER_ACCEPT&&b.parentNode===a&&b.nodeType===Node.ELEMENT_NODE&&(d=c.uses(b)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return d}}function b(b,a){var c=new g(b,a);this.acceptNode=function(a){var b=
c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName||(b=NodeFilter.FILTER_REJECT);return b}}function k(b,a){if(a){var c=m(a),d,e=b.firstChild;if(-1!==c){for(;e;){d=m(e);if(-1!==d&&d>c)break;e=e.nextSibling}b.insertBefore(a,e)}}}var d=new odf.StyleInfo,n=new core.DomUtils,p=odf.Namespaces.stylens,f="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),
q=(new Date).getTime()+"_webodf_",e=new core.Base64;odf.ODFElement=function(){};odf.ODFDocumentElement=function(){};odf.ODFDocumentElement.prototype=new odf.ODFElement;odf.ODFDocumentElement.prototype.constructor=odf.ODFDocumentElement;odf.ODFDocumentElement.prototype.fontFaceDecls=null;odf.ODFDocumentElement.prototype.manifest=null;odf.ODFDocumentElement.prototype.settings=null;odf.ODFDocumentElement.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";odf.ODFDocumentElement.localName=
"document";odf.AnnotationElement=function(){};odf.OdfPart=function(b,a,c,d){var e=this;this.size=0;this.type=null;this.name=b;this.container=c;this.url=null;this.mimetype=a;this.onstatereadychange=this.document=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.data="";this.load=function(){null!==d&&(this.mimetype=a,d.loadAsDataURL(b,a,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}};odf.OdfPart.prototype.load=
function(){};odf.OdfPart.prototype.getUrl=function(){return this.data?"data:;base64,"+e.toBase64(this.data):null};odf.OdfContainer=function a(c,l){function h(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?h(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function f(a){var b={},c,d,e=a.ownerDocument.createNodeIterator(a,NodeFilter.SHOW_ELEMENT,null,!1);for(a=e.nextNode();a;)"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&("annotation"===
a.localName?(c=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","name"))&&(b.hasOwnProperty(c)?runtime.log("Warning: annotation name used more than once with <office:annotation/>: '"+c+"'"):b[c]=a):"annotation-end"===a.localName&&((c=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","name"))?b.hasOwnProperty(c)?(d=b[c],d.annotationEndElement?runtime.log("Warning: annotation name used more than once with <office:annotation-end/>: '"+c+"'"):d.annotationEndElement=
a):runtime.log("Warning: annotation end without an annotation start, name: '"+c+"'"):runtime.log("Warning: annotation end without a name found"))),a=e.nextNode()}function m(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS("urn:webodf:names:scope","scope",b),c=c.nextSibling}function z(a){var b={},c;for(a=a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&a.namespaceURI===p&&"font-face"===a.localName&&(c=a.getAttributeNS(p,"name"),b[c]=a),a=a.nextSibling;return b}function x(a,
b){var c=null,d,e,h;if(a)for(c=a.cloneNode(!0),d=c.firstElementChild;d;)e=d.nextElementSibling,(h=d.getAttributeNS("urn:webodf:names:scope","scope"))&&h!==b&&c.removeChild(d),d=e;return c}function u(a,b){var c,e,h,l=null,f={};if(a)for(b.forEach(function(a){d.collectUsedFontFaces(f,a)}),l=a.cloneNode(!0),c=l.firstElementChild;c;)e=c.nextElementSibling,h=c.getAttributeNS(p,"name"),f[h]||l.removeChild(c),c=e;return l}function t(a){var b=M.rootElement.ownerDocument,c;if(a){h(a.documentElement);try{c=
b.importNode(a.documentElement,!0)}catch(d){}}return c}function s(a){M.state=a;if(M.onchange)M.onchange(M);if(M.onstatereadychange)M.onstatereadychange(M)}function y(a){S=null;M.rootElement=a;a.fontFaceDecls=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");a.styles=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");a.automaticStyles=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");a.masterStyles=
n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");a.body=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");a.meta=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta");f(a)}function F(b){var c=t(b),e=M.rootElement,h;c&&"document-styles"===c.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===c.namespaceURI?(e.fontFaceDecls=n.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),
k(e,e.fontFaceDecls),h=n.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),e.styles=h||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),k(e,e.styles),h=n.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),e.automaticStyles=h||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),m(e.automaticStyles,"document-styles"),k(e,e.automaticStyles),c=n.getDirectChild(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"master-styles"),e.masterStyles=c||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),k(e,e.masterStyles),d.prefixStyleNames(e.automaticStyles,q,e.masterStyles)):s(a.INVALID)}function L(b){b=t(b);var c,e,h,l;if(b&&"document-content"===b.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI){c=M.rootElement;h=n.getDirectChild(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");if(c.fontFaceDecls&&h){l=c.fontFaceDecls;var f,
g,y,L,q={};e=z(l);L=z(h);for(h=h.firstElementChild;h;){f=h.nextElementSibling;if(h.namespaceURI===p&&"font-face"===h.localName)if(g=h.getAttributeNS(p,"name"),e.hasOwnProperty(g)){if(!h.isEqualNode(e[g])){y=g;for(var H=e,G=L,F=0,v=void 0,v=y=y.replace(/\d+$/,"");H.hasOwnProperty(v)||G.hasOwnProperty(v);)F+=1,v=y+F;y=v;h.setAttributeNS(p,"style:name",y);l.appendChild(h);e[y]=h;delete L[g];q[g]=y}}else l.appendChild(h),e[g]=h,delete L[g];h=f}l=q}else h&&(c.fontFaceDecls=h,k(c,h));e=n.getDirectChild(b,
"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");m(e,"document-content");l&&d.changeFontFaceNames(e,l);if(c.automaticStyles&&e)for(l=e.firstChild;l;)c.automaticStyles.appendChild(l),l=e.firstChild;else e&&(c.automaticStyles=e,k(c,e));b=n.getDirectChild(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");if(null===b)throw"<office:body/> tag is mising.";c.body=b;k(c,c.body)}else s(a.INVALID)}function O(a){a=t(a);var b;a&&"document-meta"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===
a.namespaceURI&&(b=M.rootElement,b.meta=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),k(b,b.meta))}function H(a){a=t(a);var b;a&&"document-settings"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(b=M.rootElement,b.settings=n.getDirectChild(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),k(b,b.settings))}function U(a){a=t(a);var b;if(a&&"manifest"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===
a.namespaceURI)for(b=M.rootElement,b.manifest=a,a=b.manifest.firstElementChild;a;)"file-entry"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI&&(W[a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),a=a.nextElementSibling}function T(b){var c=b.shift();c?$.loadAsDOM(c.path,function(d,e){c.handler(e);d||M.state===a.INVALID||T(b)}):(f(M.rootElement),
s(a.DONE))}function X(a){var b="";odf.Namespaces.forEachPrefix(function(a,c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function D(){var a=new xmldom.LSSerializer,b=X("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(M.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function ba(a,b){var c=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");
c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:full-path",a);c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:media-type",b);return c}function G(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'),b=a.documentElement,c=new xmldom.LSSerializer,d;for(d in W)W.hasOwnProperty(d)&&b.appendChild(ba(d,W[d]));c.filter=new odf.OdfNodeFilter;
return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+c.writeToString(a,odf.Namespaces.namespaceMap)}function J(){var a=new xmldom.LSSerializer,b=X("document-settings");a.filter=new odf.OdfNodeFilter;M.rootElement.settings.firstElementChild&&(b+=a.writeToString(M.rootElement.settings,odf.Namespaces.namespaceMap));return b+"</office:document-settings>"}function Q(){var a,b,c,e=odf.Namespaces.namespaceMap,h=new xmldom.LSSerializer,l=X("document-styles");b=x(M.rootElement.automaticStyles,
"document-styles");c=M.rootElement.masterStyles.cloneNode(!0);a=u(M.rootElement.fontFaceDecls,[c,M.rootElement.styles,b]);d.removePrefixFromStyleNames(b,q,c);h.filter=new g(c,b);l+=h.writeToString(a,e);l+=h.writeToString(M.rootElement.styles,e);l+=h.writeToString(b,e);l+=h.writeToString(c,e);return l+"</office:document-styles>"}function ea(){var a,c,d=odf.Namespaces.namespaceMap,e=new xmldom.LSSerializer,h=X("document-content");c=x(M.rootElement.automaticStyles,"document-content");a=u(M.rootElement.fontFaceDecls,
[c]);e.filter=new b(M.rootElement.body,c);h+=e.writeToString(a,d);h+=e.writeToString(c,d);h+=e.writeToString(M.rootElement.body,d);return h+"</office:document-content>"}function P(b,c){runtime.loadXML(b,function(b,d){if(b)c(b);else{var e=t(d);e&&"document"===e.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===e.namespaceURI?(y(e),s(a.DONE)):s(a.INVALID)}})}function N(a,b){var c;c=M.rootElement;var d=c.meta;d||(c.meta=d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta"),k(c,d));c=d;a&&n.mapKeyValObjOntoNode(c,a,odf.Namespaces.lookupNamespaceURI);b&&n.removeKeyElementsFromNode(c,b,odf.Namespaces.lookupNamespaceURI)}function I(){function b(a,c){var d;c||(c=a);d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",c);e[a]=d;e.appendChild(d)}var c=new core.Zip("",null),d=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),e=M.rootElement,h=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"text");c.save("mimetype",d,!1,new Date);b("meta");b("settings");b("scripts");b("fontFaceDecls","font-face-decls");b("styles");b("automaticStyles","automatic-styles");b("masterStyles","master-styles");b("body");e.body.appendChild(h);W["/"]="application/vnd.oasis.opendocument.text";W["settings.xml"]="text/xml";W["meta.xml"]="text/xml";W["styles.xml"]="text/xml";W["content.xml"]="text/xml";s(a.DONE);return c}function B(){var a,b=new Date,c=runtime.getWindow();a="WebODF/"+("undefined"!==String(typeof webodf_version)?
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
odf.OdfUtils=function(){function m(a){return"image"===(a&&a.localName)&&a.namespaceURI===T}function g(a){return null!==a&&a.nodeType===Node.ELEMENT_NODE&&"frame"===a.localName&&a.namespaceURI===T&&"as-char"===a.getAttributeNS(U,"anchor-type")}function b(a){var b;(b="annotation"===(a&&a.localName)&&a.namespaceURI===odf.Namespaces.officens)||(b="div"===(a&&a.localName)&&"annotationWrapper"===a.className);return b}function k(a){return"a"===(a&&a.localName)&&a.namespaceURI===U}function d(a){var b=a&&
a.localName;return("p"===b||"h"===b)&&a.namespaceURI===U}function n(a){for(;a&&!d(a);)a=a.parentNode;return a}function p(a){return/^[ \t\r\n]+$/.test(a)}function f(a){if(null===a||a.nodeType!==Node.ELEMENT_NODE)return!1;var b=a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===U||"span"===b&&"annotationHighlight"===a.className}function q(a){var b=a&&a.localName,c=!1;b&&(a=a.namespaceURI,a===U&&(c="s"===b||"tab"===b||"line-break"===b));return c}function e(a){return q(a)||g(a)||b(a)}function r(a){var b=
a&&a.localName,c=!1;b&&(a=a.namespaceURI,a===U&&(c="s"===b));return c}function a(a){for(;null!==a.firstChild&&f(a);)a=a.firstChild;return a}function c(a){for(;null!==a.lastChild&&f(a);)a=a.lastChild;return a}function l(a){for(;!d(a)&&null===a.previousSibling;)a=a.parentNode;return d(a)?null:c(a.previousSibling)}function h(b){for(;!d(b)&&null===b.nextSibling;)b=b.parentNode;return d(b)?null:a(b.nextSibling)}function v(a){for(var b=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=l(a);else return!p(a.data.substr(a.length-
1,1));else e(a)?(b=!1===r(a),a=null):a=l(a);return b}function w(b){var c=!1,d;for(b=b&&a(b);b;){d=b.nodeType===Node.TEXT_NODE?b.length:0;if(0<d&&!p(b.data)){c=!0;break}if(e(b)){c=!0;break}b=h(b)}return c}function z(a,b){return p(a.data.substr(b))?!w(h(a)):!1}function x(a,b){var c=a.data,d;if(!p(c[b])||e(a.parentNode))return!1;0<b?p(c[b-1])||(d=!0):v(l(a))&&(d=!0);return!0===d?z(a,b)?!1:!0:!1}function u(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function t(a){return(a=u(a))&&(0>a.value||"%"===a.unit)?null:a}function s(a){return(a=u(a))&&"%"!==a.unit?null:a}function y(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "cursor":case "editinfo":return!1}}return!0}
function F(a,b){for(;0<b.length&&!ba.rangeContainsNode(a,b[0]);)b.shift();for(;0<b.length&&!ba.rangeContainsNode(a,b[b.length-1]);)b.pop()}function L(a,c,d){var h;h=ba.getNodesInRange(a,function(a){var c=NodeFilter.FILTER_REJECT;if(q(a.parentNode)||b(a))c=NodeFilter.FILTER_REJECT;else if(a.nodeType===Node.TEXT_NODE){if(d||Boolean(n(a)&&(!p(a.textContent)||x(a,0))))c=NodeFilter.FILTER_ACCEPT}else if(e(a))c=NodeFilter.FILTER_ACCEPT;else if(y(a)||f(a))c=NodeFilter.FILTER_SKIP;return c},NodeFilter.SHOW_ELEMENT|
NodeFilter.SHOW_TEXT);c||F(a,h);return h}function O(a,c,d){for(;a;){if(d(a)){c[0]!==a&&c.unshift(a);break}if(b(a))break;a=a.parentNode}}function H(a,b){var c=a;if(b<c.childNodes.length-1)c=c.childNodes[b+1];else{for(;!c.nextSibling;)c=c.parentNode;c=c.nextSibling}for(;c.firstChild;)c=c.firstChild;return c}var U=odf.Namespaces.textns,T=odf.Namespaces.drawns,X=odf.Namespaces.xlinkns,D=/^\s*$/,ba=new core.DomUtils;this.isImage=m;this.isCharacterFrame=g;this.isInlineRoot=b;this.isTextSpan=function(a){return"span"===
(a&&a.localName)&&a.namespaceURI===U};this.isHyperlink=k;this.getHyperlinkTarget=function(a){return a.getAttributeNS(X,"href")};this.isParagraph=d;this.getParagraphElement=n;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===U&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===U};this.isLineBreak=function(a){return"line-break"===(a&&a.localName)&&a.namespaceURI===U};this.isODFWhitespace=
p;this.isGroupingElement=f;this.isCharacterElement=q;this.isAnchoredAsCharacterElement=e;this.isSpaceElement=r;this.firstChild=a;this.lastChild=c;this.previousNode=l;this.nextNode=h;this.scanLeftForNonSpace=v;this.lookLeftForCharacter=function(a){var b,c=b=0;a.nodeType===Node.TEXT_NODE&&(c=a.length);0<c?(b=a.data,b=p(b.substr(c-1,1))?1===c?v(l(a))?2:0:p(b.substr(c-2,1))?0:2:1):e(a)&&(b=1);return b};this.lookRightForCharacter=function(a){var b=!1,c=0;a&&a.nodeType===Node.TEXT_NODE&&(c=a.length);0<
c?b=!p(a.data.substr(0,1)):e(a)&&(b=!0);return b};this.scanLeftForAnyCharacter=function(a){var b=!1,d;for(a=a&&c(a);a;){d=a.nodeType===Node.TEXT_NODE?a.length:0;if(0<d&&!p(a.data)){b=!0;break}if(e(a)){b=!0;break}a=l(a)}return b};this.scanRightForAnyCharacter=w;this.isTrailingWhitespace=z;this.isSignificantWhitespace=x;this.isDowngradableSpaceElement=function(a){return a.namespaceURI===U&&"s"===a.localName?v(l(a))&&w(h(a)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===
Node.TEXT_NODE&&D.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=u;this.parseNonNegativeLength=t;this.parseFoFontSize=function(a){var b;b=(b=u(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||s(a)};this.parseFoLineHeight=function(a){return t(a)||s(a)};this.isTextContentContainingNode=y;this.getTextNodes=function(a,b){var c;c=ba.getNodesInRange(a,function(a){var b=NodeFilter.FILTER_REJECT;a.nodeType===Node.TEXT_NODE?Boolean(n(a)&&(!p(a.textContent)||x(a,0)))&&(b=NodeFilter.FILTER_ACCEPT):
y(a)&&(b=NodeFilter.FILTER_SKIP);return b},NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);b||F(a,c);return c};this.getTextElements=L;this.getParagraphElements=function(a){var b;b=ba.getNodesInRange(a,function(a){var b=NodeFilter.FILTER_REJECT;if(d(a))b=NodeFilter.FILTER_ACCEPT;else if(y(a)||f(a))b=NodeFilter.FILTER_SKIP;return b},NodeFilter.SHOW_ELEMENT);O(a.startContainer,b,d);return b};this.getImageElements=function(a){var b;b=ba.getNodesInRange(a,function(a){var b=NodeFilter.FILTER_SKIP;m(a)&&(b=
NodeFilter.FILTER_ACCEPT);return b},NodeFilter.SHOW_ELEMENT);O(a.startContainer,b,m);return b};this.getHyperlinkElements=function(a){var b=[],c=a.cloneRange();a.collapsed&&a.endContainer.nodeType===Node.ELEMENT_NODE&&(a=H(a.endContainer,a.endOffset),a.nodeType===Node.TEXT_NODE&&c.setEnd(a,1));L(c,!0,!1).forEach(function(a){for(a=a.parentNode;!d(a);){if(k(a)&&-1===b.indexOf(a)){b.push(a);break}a=a.parentNode}});c.detach();return b}};
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
gui.AnnotationViewManager=function(m,g,b,k){function d(a){var b=a.annotationEndElement,d=e.createRange(),f=a.getAttributeNS(odf.Namespaces.officens,"name");b&&(d.setStart(a,a.childNodes.length),d.setEnd(b,0),a=r.getTextNodes(d,!1),a.forEach(function(a){var b=e.createElement("span");b.className="annotationHighlight";b.setAttribute("annotation",f);a.parentNode.insertBefore(b,a);b.appendChild(a)}));d.detach()}function n(c){var d=m.getSizer();c?(b.style.display="inline-block",d.style.paddingRight=a.getComputedStyle(b).width):
(b.style.display="none",d.style.paddingRight=0);m.refreshSize()}function p(){q.sort(function(a,b){return 0!==(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_FOLLOWING)?-1:1})}function f(){var a;for(a=0;a<q.length;a+=1){var d=q[a],e=d.parentNode,f=e.nextElementSibling,k=f.nextElementSibling,g=e.parentNode,n=0,n=q[q.indexOf(d)-1],p=void 0,d=m.getZoomLevel();e.style.left=(b.getBoundingClientRect().left-g.getBoundingClientRect().left)/d+"px";e.style.width=b.getBoundingClientRect().width/d+"px";f.style.width=
parseFloat(e.style.left)-30+"px";n&&(p=n.parentNode.getBoundingClientRect(),20>=(g.getBoundingClientRect().top-p.bottom)/d?e.style.top=Math.abs(g.getBoundingClientRect().top-p.bottom)/d+20+"px":e.style.top="0px");k.style.left=f.getBoundingClientRect().width/d+"px";var f=k.style,g=k.getBoundingClientRect().left/d,n=k.getBoundingClientRect().top/d,p=e.getBoundingClientRect().left/d,r=e.getBoundingClientRect().top/d,s=0,y=0,s=p-g,s=s*s,y=r-n,y=y*y,g=Math.sqrt(s+y);f.width=g+"px";n=Math.asin((e.getBoundingClientRect().top-
k.getBoundingClientRect().top)/(d*parseFloat(k.style.width)));k.style.transform="rotate("+n+"rad)";k.style.MozTransform="rotate("+n+"rad)";k.style.WebkitTransform="rotate("+n+"rad)";k.style.msTransform="rotate("+n+"rad)"}}var q=[],e=g.ownerDocument,r=new odf.OdfUtils,a=runtime.getWindow();runtime.assert(Boolean(a),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=f;this.getMinimumHeightForAnnotationPane=function(){return"none"!==b.style.display&&
0<q.length?(q[q.length-1].parentNode.getBoundingClientRect().bottom-b.getBoundingClientRect().top)/m.getZoomLevel()+"px":null};this.addAnnotation=function(a){n(!0);q.push(a);p();var b=e.createElement("div"),h=e.createElement("div"),g=e.createElement("div"),m=e.createElement("div"),r;b.className="annotationWrapper";a.parentNode.insertBefore(b,a);h.className="annotationNote";h.appendChild(a);k&&(r=e.createElement("div"),r.className="annotationRemoveButton",h.appendChild(r));g.className="annotationConnector horizontal";
m.className="annotationConnector angular";b.appendChild(h);b.appendChild(g);b.appendChild(m);a.annotationEndElement&&d(a);f()};this.forgetAnnotations=function(){for(;q.length;){var a=q[0],b=q.indexOf(a),d=a.parentNode.parentNode;"div"===d.localName&&(d.parentNode.insertBefore(a,d),d.parentNode.removeChild(d));for(var a=a.getAttributeNS(odf.Namespaces.officens,"name"),a=e.querySelectorAll('span.annotationHighlight[annotation="'+a+'"]'),f=d=void 0,d=0;d<a.length;d+=1){for(f=a.item(d);f.firstChild;)f.parentNode.insertBefore(f.firstChild,
f);f.parentNode.removeChild(f)}-1!==b&&q.splice(b,1);0===q.length&&n(!1)}}};
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
(function(){function m(k,d,g,p,f){var q,e=0,r;for(r in k)if(k.hasOwnProperty(r)){if(e===g){q=r;break}e+=1}q?d.getPartData(k[q].href,function(a,c){if(a)runtime.log(a);else if(c){var e="@font-face { font-family: '"+(k[q].family||q)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+b.convertUTF8ArrayToBase64(c)+') format("truetype"); }';try{p.insertRule(e,p.cssRules.length)}catch(h){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(h)+"\nRule: "+e)}}else runtime.log("missing font data for "+
k[q].href);m(k,d,g+1,p,f)}):f&&f()}var g=xmldom.XPath,b=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(b,d){for(var n=b.rootElement.fontFaceDecls;d.cssRules.length;)d.deleteRule(d.cssRules.length-1);if(n){var p={},f,q,e,r;if(n)for(n=g.getODFElementsWithXPath(n,"style:font-face[svg:font-face-src]",odf.Namespaces.lookupNamespaceURI),f=0;f<n.length;f+=1)q=n[f],e=q.getAttributeNS(odf.Namespaces.stylens,"name"),r=q.getAttributeNS(odf.Namespaces.svgns,"font-family"),q=g.getODFElementsWithXPath(q,
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
odf.Formatting=function(){function m(a){return(a=t[a])?u.mergeObjects({},a):{}}function g(){for(var a=r.rootElement.fontFaceDecls,b={},d,e,a=a&&a.firstElementChild;a;){if(d=a.getAttributeNS(l,"name"))if((e=a.getAttributeNS(c,"font-family"))||0<a.getElementsByTagNameNS(c,"font-face-uri").length)b[d]=e;a=a.nextElementSibling}return b}function b(a){for(var b=r.rootElement.styles.firstElementChild;b;){if(b.namespaceURI===l&&"default-style"===b.localName&&b.getAttributeNS(l,"family")===a)return b;b=b.nextElementSibling}return null}
function k(a,b,c){var d,e,f;c=c||[r.rootElement.automaticStyles,r.rootElement.styles];for(f=0;f<c.length;f+=1)for(d=c[f],d=d.firstElementChild;d;){e=d.getAttributeNS(l,"name");if(d.namespaceURI===l&&"style"===d.localName&&d.getAttributeNS(l,"family")===b&&e===a||"list-style"===b&&d.namespaceURI===h&&"list-style"===d.localName&&e===a||"data"===b&&d.namespaceURI===v&&e===a)return d;d=d.nextElementSibling}return null}function d(a){for(var b,c,d,e,h={},f=a.firstElementChild;f;){if(f.namespaceURI===l)for(d=
h[f.nodeName]={},c=f.attributes,b=0;b<c.length;b+=1)e=c.item(b),d[e.name]=e.value;f=f.nextElementSibling}c=a.attributes;for(b=0;b<c.length;b+=1)e=c.item(b),h[e.name]=e.value;return h}function n(a,c){for(var e=r.rootElement.styles,h,f={},g=a.getAttributeNS(l,"family"),n=a;n;)h=d(n),f=u.mergeObjects(h,f),n=(h=n.getAttributeNS(l,"parent-style-name"))?k(h,g,[e]):null;if(n=b(g))h=d(n),f=u.mergeObjects(h,f);!1!==c&&(h=m(g),f=u.mergeObjects(h,f));return f}function p(b,c){function d(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){l+=
"|"+b+":"+a+"|"})})}for(var e=b.nodeType===Node.TEXT_NODE?b.parentNode:b,h,f=[],l="",k=!1;e;)!k&&z.isGroupingElement(e)&&(k=!0),(h=a.determineStylesForNode(e))&&f.push(h),e=e.parentNode;k&&(f.forEach(d),c&&(c[l]=f));return k?f:void 0}function f(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var d=Object.keys(a[c])[0],e={name:d,family:c,displayName:void 0,isCommonStyle:!1},h;(h=k(d,c))?(c=n(h),b=u.mergeObjects(c,b),e.displayName=h.getAttributeNS(l,"display-name"),
e.isCommonStyle=h.parentNode===r.rootElement.styles):runtime.log("No style element found for '"+d+"' of family '"+c+"'");b.orderedStyles.push(e)})});return b}function q(a,b){var c={},d=[];b||(b={});a.forEach(function(a){p(a,c)});Object.keys(c).forEach(function(a){b[a]||(b[a]=f(c[a]));d.push(b[a])});return d}function e(a,b){var c=z.parseLength(a),d=b;if(c)switch(c.unit){case "cm":d=c.value;break;case "mm":d=0.1*c.value;break;case "in":d=2.54*c.value;break;case "pt":d=0.035277778*c.value;break;case "pc":case "px":case "em":break;
default:runtime.log("Unit identifier: "+c.unit+" is not supported.")}return d}var r,a=new odf.StyleInfo,c=odf.Namespaces.svgns,l=odf.Namespaces.stylens,h=odf.Namespaces.textns,v=odf.Namespaces.numberns,w=odf.Namespaces.fons,z=new odf.OdfUtils,x=new core.DomUtils,u=new core.Utils,t={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.getSystemDefaultStyleAttributes=m;this.setOdfContainer=function(a){r=a};this.getFontMap=g;this.getAvailableParagraphStyles=function(){for(var a=r.rootElement.styles,
b,c,d=[],a=a&&a.firstElementChild;a;)"style"===a.localName&&a.namespaceURI===l&&(b=a.getAttributeNS(l,"family"),"paragraph"===b&&(b=a.getAttributeNS(l,"name"),c=a.getAttributeNS(l,"display-name")||b,b&&c&&d.push({name:b,displayName:c}))),a=a.nextElementSibling;return d};this.isStyleUsed=function(b){var c,d=r.rootElement;c=a.hasDerivedStyles(d,odf.Namespaces.lookupNamespaceURI,b);b=(new a.UsedStyleList(d.styles)).uses(b)||(new a.UsedStyleList(d.automaticStyles)).uses(b)||(new a.UsedStyleList(d.body)).uses(b);
return c||b};this.getDefaultStyleElement=b;this.getStyleElement=k;this.getStyleAttributes=d;this.getInheritedStyleAttributes=n;this.getFirstCommonParentStyleNameOrSelf=function(a){var b=r.rootElement.automaticStyles,c=r.rootElement.styles,d;for(d=k(a,"paragraph",[b]);d;)a=d.getAttributeNS(l,"parent-style-name"),d=k(a,"paragraph",[b]);return(d=k(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(k(a,"paragraph"))};this.getAppliedStyles=q;this.getAppliedStylesForElement=function(a,
b){return q([a],b)[0]};this.updateStyle=function(a,b){var d,e;x.mapObjOntoNode(a,b,odf.Namespaces.lookupNamespaceURI);(d=b["style:text-properties"]&&b["style:text-properties"]["style:font-name"])&&!g().hasOwnProperty(d)&&(e=a.ownerDocument.createElementNS(l,"style:font-face"),e.setAttributeNS(l,"style:name",d),e.setAttributeNS(c,"svg:font-family",d),r.rootElement.fontFaceDecls.appendChild(e))};this.createDerivedStyleObject=function(a,b,c){var e=k(a,b);runtime.assert(Boolean(e),"No style element found for '"+
a+"' of family '"+b+"'");a=e.parentNode===r.rootElement.styles?{"style:parent-style-name":a}:d(e);a["style:family"]=b;u.mergeObjects(a,c);return a};this.getDefaultTabStopDistance=function(){for(var a=b("paragraph"),a=a&&a.firstElementChild,c;a;)a.namespaceURI===l&&"paragraph-properties"===a.localName&&(c=a.getAttributeNS(l,"tab-stop-distance")),a=a.nextElementSibling;c||(c="1.25cm");return z.parseNonNegativeLength(c)};this.getContentSize=function(a,b){var c,d,h,f,g,n,p,m,q,v,u;a:{var t,z,P;c=k(a,
b);runtime.assert("paragraph"===b||"table"===b,"styleFamily has to be either paragraph or table");if(c){t=c.getAttributeNS(l,"master-page-name")||"Standard";for(c=r.rootElement.masterStyles.lastElementChild;c&&c.getAttributeNS(l,"name")!==t;)c=c.previousElementSibling;t=c.getAttributeNS(l,"page-layout-name");z=x.getElementsByTagNameNS(r.rootElement.automaticStyles,l,"page-layout");for(P=0;P<z.length;P+=1)if(c=z[P],c.getAttributeNS(l,"name")===t)break a}c=null}c||(c=x.getDirectChild(r.rootElement.styles,
l,"default-page-layout"));if(c=x.getDirectChild(c,l,"page-layout-properties"))d=c.getAttributeNS(l,"print-orientation")||"portrait","portrait"===d?(d=21.001,h=29.7):(d=29.7,h=21.001),d=e(c.getAttributeNS(w,"page-width"),d),h=e(c.getAttributeNS(w,"page-height"),h),f=e(c.getAttributeNS(w,"margin"),null),null===f?(f=e(c.getAttributeNS(w,"margin-left"),2),g=e(c.getAttributeNS(w,"margin-right"),2),n=e(c.getAttributeNS(w,"margin-top"),2),p=e(c.getAttributeNS(w,"margin-bottom"),2)):f=g=n=p=f,m=e(c.getAttributeNS(w,
"padding"),null),null===m?(m=e(c.getAttributeNS(w,"padding-left"),0),q=e(c.getAttributeNS(w,"padding-right"),0),v=e(c.getAttributeNS(w,"padding-top"),0),u=e(c.getAttributeNS(w,"padding-bottom"),0)):m=q=v=u=m;return{width:d-f-g-m-q,height:h-n-p-v-u}}};
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
odf.Style2CSS=function(){function m(a){var b,c,d,e={};if(!a)return e;for(a=a.firstElementChild;a;){if(c=a.namespaceURI!==l||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===w&&"list-style"===a.localName?"list":a.namespaceURI!==l||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(l,"family"))(b=a.getAttributeNS(l,"name"))||(b=""),e.hasOwnProperty(c)?d=e[c]:e[c]=d={},d[b]=a;a=a.nextElementSibling}return e}function g(a,b){if(a.hasOwnProperty(b))return a[b];
var c,d=null;for(c in a)if(a.hasOwnProperty(c)&&(d=g(a[c].derivedStyles,b)))break;return d}function b(a,c,d){var e,h,f;if(!c.hasOwnProperty(a))return null;e=new odf.StyleTreeNode(c[a]);h=e.element.getAttributeNS(l,"parent-style-name");f=null;h&&(f=g(d,h)||b(h,c,d));f?f.derivedStyles[a]=e:d[a]=e;delete c[a];return e}function k(a,c){for(var d in a)a.hasOwnProperty(d)&&b(d,a,c)}function d(a,b,c){var e=[];c=c.derivedStyles;var h;var f=t[a],l;void 0===f?b=null:(l=b?"["+f+'|style-name="'+b+'"]':"","presentation"===
f&&(f="draw",l=b?'[presentation|style-name="'+b+'"]':""),b=f+"|"+s[a].join(l+","+f+"|")+l);null!==b&&e.push(b);for(h in c)c.hasOwnProperty(h)&&(b=d(a,h,c[h]),e=e.concat(b));return e}function n(a,b){var c="",d,e,h;for(d=0;d<b.length;d+=1)if(e=b[d],h=a.getAttributeNS(e[0],e[1])){h=h.trim();if(G.hasOwnProperty(e[1])){var f=h.indexOf(" "),l=void 0,k=void 0;-1!==f?(l=h.substring(0,f),k=h.substring(f)):(l=h,k="");(l=Q.parseLength(l))&&"pt"===l.unit&&0.75>l.value&&(h="0.75pt"+k)}e[2]&&(c+=e[2]+":"+h+";")}return c}
function p(b){return(b=u.getDirectChild(b,l,"text-properties"))?Q.parseFoFontSize(b.getAttributeNS(a,"font-size")):null}function f(a,b,c,d){return b+b+c+c+d+d}function q(b,c,d,e){c='text|list[text|style-name="'+c+'"]';var h=d.getAttributeNS(w,"level");d=u.getDirectChild(d,l,"list-level-properties");d=u.getDirectChild(d,l,"list-level-label-alignment");var f,k;d&&(f=d.getAttributeNS(a,"text-indent"),k=d.getAttributeNS(a,"margin-left"));f||(f="-0.6cm");d="-"===f.charAt(0)?f.substring(1):"-"+f;for(h=
h&&parseInt(h,10);1<h;)c+=" > text|list-item > text|list",h-=1;if(k){h=c+" > text|list-item > *:not(text|list):first-child";h+="{";h=h+("margin-left:"+k+";")+"}";try{b.insertRule(h,b.cssRules.length)}catch(g){runtime.log("cannot load rule: "+h)}}e=c+" > text|list-item > *:not(text|list):first-child:before{"+e+";";e=e+"counter-increment:list;"+("margin-left:"+f+";");e+="width:"+d+";";e+="display:inline-block}";try{b.insertRule(e,b.cssRules.length)}catch(n){runtime.log("cannot load rule: "+e)}}function e(b,
h,k,g){if("list"===h)for(var m=g.element.firstChild,s,t;m;){if(m.namespaceURI===w)if(s=m,"list-level-style-number"===m.localName){var G=s;t=G.getAttributeNS(l,"num-format");var A=G.getAttributeNS(l,"num-suffix")||"",G=G.getAttributeNS(l,"num-prefix")||"",Y={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},R="";G&&(R+=' "'+G+'"');R=Y.hasOwnProperty(t)?R+(" counter(list, "+Y[t]+")"):t?R+(' "'+t+'"'):R+" ''";t="content:"+R+' "'+A+'"';q(b,k,s,t)}else"list-level-style-image"===
m.localName?(t="content: none;",q(b,k,s,t)):"list-level-style-bullet"===m.localName&&(t="content: '"+s.getAttributeNS(w,"bullet-char")+"';",q(b,k,s,t));m=m.nextSibling}else if("page"===h){if(t=g.element,G=A=k="",m=u.getDirectChild(t,l,"page-layout-properties"))if(s=t.getAttributeNS(l,"name"),k+=n(m,D),(A=u.getDirectChild(m,l,"background-image"))&&(G=A.getAttributeNS(z,"href"))&&(k=k+("background-image: url('odfkit:"+G+"');")+n(A,F)),"presentation"===ea)for(t=(t=u.getDirectChild(t.parentNode.parentNode,
c,"master-styles"))&&t.firstElementChild;t;){if(t.namespaceURI===l&&"master-page"===t.localName&&t.getAttributeNS(l,"page-layout-name")===s){G=t.getAttributeNS(l,"name");A="draw|page[draw|master-page-name="+G+"] {"+k+"}";G="office|body, draw|page[draw|master-page-name="+G+"] {"+n(m,ba)+" }";try{b.insertRule(A,b.cssRules.length),b.insertRule(G,b.cssRules.length)}catch(aa){throw aa;}}t=t.nextElementSibling}else if("text"===ea){A="office|text {"+k+"}";G="office|body {width: "+m.getAttributeNS(a,"page-width")+
";}";try{b.insertRule(A,b.cssRules.length),b.insertRule(G,b.cssRules.length)}catch(ia){throw ia;}}}else{k=d(h,k,g).join(",");m="";if(s=u.getDirectChild(g.element,l,"text-properties")){G=s;t=R="";A=1;s=""+n(G,y);Y=G.getAttributeNS(l,"text-underline-style");"solid"===Y&&(R+=" underline");Y=G.getAttributeNS(l,"text-line-through-style");"solid"===Y&&(R+=" line-through");R.length&&(s+="text-decoration:"+R+";");if(R=G.getAttributeNS(l,"font-name")||G.getAttributeNS(a,"font-family"))Y=J[R],s+="font-family: "+
(Y||R)+";";Y=G.parentNode;if(G=p(Y)){for(;Y;){if(G=p(Y)){if("%"!==G.unit){t="font-size: "+G.value*A+G.unit+";";break}A*=G.value/100}G=Y;R=Y="";Y=null;"default-style"===G.localName?Y=null:(Y=G.getAttributeNS(l,"parent-style-name"),R=G.getAttributeNS(l,"family"),Y=I.getODFElementsWithXPath(P,Y?"//style:*[@style:name='"+Y+"'][@style:family='"+R+"']":"//style:default-style[@style:family='"+R+"']",odf.Namespaces.lookupNamespaceURI)[0])}t||(t="font-size: "+parseFloat(N)*A+B.getUnits(N)+";");s+=t}m+=s}if(s=
u.getDirectChild(g.element,l,"paragraph-properties"))t=s,s=""+n(t,L),(A=u.getDirectChild(t,l,"background-image"))&&(G=A.getAttributeNS(z,"href"))&&(s=s+("background-image: url('odfkit:"+G+"');")+n(A,F)),(t=t.getAttributeNS(a,"line-height"))&&"normal"!==t&&(t=Q.parseFoLineHeight(t),s="%"!==t.unit?s+("line-height: "+t.value+t.unit+";"):s+("line-height: "+t.value/100+";")),m+=s;if(s=u.getDirectChild(g.element,l,"graphic-properties"))G=s,s=""+n(G,O),t=G.getAttributeNS(r,"opacity"),A=G.getAttributeNS(r,
"fill"),G=G.getAttributeNS(r,"fill-color"),"solid"===A||"hatch"===A?G&&"none"!==G?(t=isNaN(parseFloat(t))?1:parseFloat(t)/100,A=G.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,f),(G=(A=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(A))?{r:parseInt(A[1],16),g:parseInt(A[2],16),b:parseInt(A[3],16)}:null)&&(s+="background-color: rgba("+G.r+","+G.g+","+G.b+","+t+");")):s+="background: none;":"none"===A&&(s+="background: none;"),m+=s;if(s=u.getDirectChild(g.element,l,"drawing-page-properties"))t=""+n(s,
O),"true"===s.getAttributeNS(x,"background-visible")&&(t+="background: none;"),m+=t;if(s=u.getDirectChild(g.element,l,"table-cell-properties"))s=""+n(s,H),m+=s;if(s=u.getDirectChild(g.element,l,"table-row-properties"))s=""+n(s,T),m+=s;if(s=u.getDirectChild(g.element,l,"table-column-properties"))s=""+n(s,U),m+=s;if(s=u.getDirectChild(g.element,l,"table-properties"))t=s,s=""+n(t,X),t=t.getAttributeNS(v,"border-model"),"collapsing"===t?s+="border-collapse:collapse;":"separating"===t&&(s+="border-collapse:separate;"),
m+=s;if(0!==m.length)try{b.insertRule(k+"{"+m+"}",b.cssRules.length)}catch(ga){throw ga;}}for(var da in g.derivedStyles)g.derivedStyles.hasOwnProperty(da)&&e(b,h,da,g.derivedStyles[da])}var r=odf.Namespaces.drawns,a=odf.Namespaces.fons,c=odf.Namespaces.officens,l=odf.Namespaces.stylens,h=odf.Namespaces.svgns,v=odf.Namespaces.tablens,w=odf.Namespaces.textns,z=odf.Namespaces.xlinkns,x=odf.Namespaces.presentationns,u=new core.DomUtils,t={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",
ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),
presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background",
"table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},y=[[a,"color","color"],[a,"background-color","background-color"],[a,"font-weight","font-weight"],[a,"font-style","font-style"]],F=[[l,"repeat","background-repeat"]],L=[[a,"background-color","background-color"],[a,"text-align","text-align"],[a,"text-indent","text-indent"],[a,"padding","padding"],[a,"padding-left","padding-left"],[a,"padding-right","padding-right"],[a,"padding-top","padding-top"],[a,"padding-bottom","padding-bottom"],[a,"border-left","border-left"],[a,"border-right",
"border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"margin","margin"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"],[a,"border","border"]],O=[[a,"background-color","background-color"],[a,"min-height","min-height"],[r,"stroke","border"],[h,"stroke-color","border-color"],[h,"stroke-width","border-width"],[a,"border","border"],[a,"border-left","border-left"],[a,"border-right","border-right"],
[a,"border-top","border-top"],[a,"border-bottom","border-bottom"]],H=[[a,"background-color","background-color"],[a,"border-left","border-left"],[a,"border-right","border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"border","border"]],U=[[l,"column-width","width"]],T=[[l,"row-height","height"],[a,"keep-together",null]],X=[[l,"width","width"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"]],
D=[[a,"background-color","background-color"],[a,"padding","padding"],[a,"padding-left","padding-left"],[a,"padding-right","padding-right"],[a,"padding-top","padding-top"],[a,"padding-bottom","padding-bottom"],[a,"border","border"],[a,"border-left","border-left"],[a,"border-right","border-right"],[a,"border-top","border-top"],[a,"border-bottom","border-bottom"],[a,"margin","margin"],[a,"margin-left","margin-left"],[a,"margin-right","margin-right"],[a,"margin-top","margin-top"],[a,"margin-bottom","margin-bottom"]],
ba=[[a,"page-width","width"],[a,"page-height","height"]],G={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,"stroke-width":!0},J={},Q=new odf.OdfUtils,ea,P,N,I=xmldom.XPath,B=new core.CSSUnits;this.style2css=function(a,b,c,d,h){for(var f,l,g,n;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);f=null;d&&(f=d.ownerDocument,P=d.parentNode);h&&(f=h.ownerDocument,P=h.parentNode);if(f)for(n in odf.Namespaces.forEachPrefix(function(a,c){l="@namespace "+a+" url("+c+");";
try{b.insertRule(l,b.cssRules.length)}catch(d){}}),J=c,ea=a,N=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=m(d),d=m(h),h={},t)if(t.hasOwnProperty(n))for(g in c=h[n]={},k(a[n],c),k(d[n],c),c)c.hasOwnProperty(g)&&e(b,n,g,c[g])}};
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
(function(){function m(g,b){var k=this;this.getDistance=function(b){var g=k.x-b.x;b=k.y-b.y;return Math.sqrt(g*g+b*b)};this.getCenter=function(b){return new m((k.x+b.x)/2,(k.y+b.y)/2)};k.x=g;k.y=b}gui.ZoomHelper=function(){function g(a,b,d,e){a=e?"translate3d("+a+"px, "+b+"px, 0) scale3d("+d+", "+d+", 1)":"translate("+a+"px, "+b+"px) scale("+d+")";c.style.WebkitTransform=a;c.style.MozTransform=a;c.style.msTransform=a;c.style.OTransform=a;c.style.transform=a}function b(a){a?g(-l.x,-l.y,w,!0):(g(0,
0,w,!0),g(0,0,w,!1))}function k(a){if(u&&F){var b=u.style.overflow,c=u.classList.contains("customScrollbars");a&&c||!a&&!c||(a?(u.classList.add("customScrollbars"),u.style.overflow="hidden",runtime.requestAnimationFrame(function(){u.style.overflow=b})):u.classList.remove("customScrollbars"))}}function d(){g(-l.x,-l.y,w,!0);u.scrollLeft=0;u.scrollTop=0;k(!1)}function n(){g(0,0,w,!0);u.scrollLeft=l.x;u.scrollTop=l.y;k(!0)}function p(a){return new m(a.pageX-c.offsetLeft,a.pageY-c.offsetTop)}function f(a){h&&
(l.x-=a.x-h.x,l.y-=a.y-h.y,l=new m(Math.min(Math.max(l.x,c.offsetLeft),(c.offsetLeft+c.offsetWidth)*w-u.clientWidth),Math.min(Math.max(l.y,c.offsetTop),(c.offsetTop+c.offsetHeight)*w-u.clientHeight)));h=a}function q(a){var b=a.touches.length,c=0<b?p(a.touches[0]):null;a=1<b?p(a.touches[1]):null;c&&a?(v=c.getDistance(a),z=w,h=c.getCenter(a),d(),y=s.PINCH):c&&(h=c,y=s.SCROLL)}function e(a){var e=a.touches.length,h=0<e?p(a.touches[0]):null,e=1<e?p(a.touches[1]):null;if(h&&e)if(a.preventDefault(),y===
s.SCROLL)y=s.PINCH,d(),v=h.getDistance(e);else{a=h.getCenter(e);h=h.getDistance(e)/v;f(a);var e=w,k=Math.min(x,c.offsetParent.clientWidth/c.offsetWidth);w=z*h;w=Math.min(Math.max(w,k),x);h=w/e;l.x+=(h-1)*(a.x+l.x);l.y+=(h-1)*(a.y+l.y);b(!0)}else h&&(y===s.PINCH?(y=s.SCROLL,n()):f(h))}function r(){y===s.PINCH&&(t.emit(gui.ZoomHelper.signalZoomChanged,w),n(),b(!1));y=s.NONE}function a(){u&&(u.removeEventListener("touchstart",q,!1),u.removeEventListener("touchmove",e,!1),u.removeEventListener("touchend",
r,!1))}var c,l,h,v,w,z,x=4,u,t=new core.EventNotifier([gui.ZoomHelper.signalZoomChanged]),s={NONE:0,SCROLL:1,PINCH:2},y=s.NONE,F=runtime.getWindow().hasOwnProperty("ontouchstart");this.subscribe=function(a,b){t.subscribe(a,b)};this.unsubscribe=function(a,b){t.unsubscribe(a,b)};this.getZoomLevel=function(){return w};this.setZoomLevel=function(a){c&&(w=a,b(!1),t.emit(gui.ZoomHelper.signalZoomChanged,w))};this.destroy=function(b){a();k(!1);b()};this.setZoomableElement=function(d){a();c=d;u=c.offsetParent;
b(!1);u&&(u.addEventListener("touchstart",q,!1),u.addEventListener("touchmove",e,!1),u.addEventListener("touchend",r,!1));k(!0)};z=w=1;l=new m(0,0)};gui.ZoomHelper.signalZoomChanged="zoomChanged"})();
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
(function(){function m(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(String(e))}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function g(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function b(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function k(a){a=a.sheet;for(var b=a.cssRules;b.length;)a.deleteRule(b.length-
1)}function d(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function n(a,b,c){var d=null;a=a.rootElement.body.getElementsByTagNameNS(H,c+"-decl");c=b.getAttributeNS(H,"use-"+c+"-name");var e;if(c&&0<a.length)for(b=0;b<a.length;b+=1)if(e=a[b],e.getAttributeNS(H,"name")===c){d=e.textContent;break}return d}function p(a,c,d,e){var h=a.ownerDocument;c=a.getElementsByTagNameNS(c,d);for(a=0;a<c.length;a+=1)b(c[a]),e&&(d=
c[a],d.appendChild(h.createTextNode(e)))}function f(a,b,c){b.setAttributeNS("urn:webodf:names:helper","styleid",a);var d,e=b.getAttributeNS(F,"anchor-type"),h=b.getAttributeNS(s,"x"),f=b.getAttributeNS(s,"y"),l=b.getAttributeNS(s,"width"),k=b.getAttributeNS(s,"height"),g=b.getAttributeNS(x,"min-height"),n=b.getAttributeNS(x,"min-width");if("as-char"===e)d="display: inline-block;";else if(e||h||f)d="position: absolute;";else if(l||k||g||n)d="display: block;";h&&(d+="left: "+h+";");f&&(d+="top: "+f+
";");l&&(d+="width: "+l+";");k&&(d+="height: "+k+";");g&&(d+="min-height: "+g+";");n&&(d+="min-width: "+n+";");d&&(d="draw|"+b.localName+'[webodfhelper|styleid="'+a+'"] {'+d+"}",c.insertRule(d,c.cssRules.length))}function q(a){for(a=a.firstChild;a;){if(a.namespaceURI===u&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function e(a,b,c,d){function e(b){b&&(b='draw|image[webodfhelper|styleid="'+a+'"] {'+("background-image: url("+
b+");")+"}",d.insertRule(b,d.cssRules.length))}function h(a){e(a.url)}c.setAttributeNS("urn:webodf:names:helper","styleid",a);var f=c.getAttributeNS(L,"href"),l;if(f)try{l=b.getPart(f),l.onchange=h,l.load()}catch(k){runtime.log("slight problem: "+String(k))}else f=q(c),e(f)}function r(a){var b=a.ownerDocument;D.getElementsByTagNameNS(a,F,"line-break").forEach(function(a){a.hasChildNodes()||a.appendChild(b.createElement("br"))})}function a(a){var b=a.ownerDocument;D.getElementsByTagNameNS(a,F,"s").forEach(function(a){for(var c,
d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(F,"c"),10);if(1<d)for(a.removeAttributeNS(F,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function c(a){D.getElementsByTagNameNS(a,F,"tab").forEach(function(a){a.textContent="\t"})}function l(a,b){function c(a,d){var f=l.documentElement.namespaceURI;"video/"===d.substr(0,6)?(e=l.createElementNS(f,"video"),e.setAttribute("controls","controls"),h=l.createElementNS(f,"source"),
a&&h.setAttribute("src",a),h.setAttribute("type",d),e.appendChild(h),b.parentNode.appendChild(e)):b.innerHtml="Unrecognised Plugin"}function d(a){c(a.url,a.mimetype)}var e,h,f,l=b.ownerDocument,k;if(f=b.getAttributeNS(L,"href"))try{k=a.getPart(f),k.onchange=d,k.load()}catch(g){runtime.log("slight problem: "+String(g))}else runtime.log("using MP4 data fallback"),f=q(b),c(f,"video/mp4")}function h(a){var b=a.getElementsByTagName("head")[0],c,d;c=a.styleSheets.length;for(d=b.firstElementChild;d&&("style"!==
d.localName||!d.hasAttribute("webodfcss"));)d=d.nextElementSibling;if(d)return c=parseInt(d.getAttribute("webodfcss"),10),d.setAttribute("webodfcss",c+1),d;"string"===String(typeof webodf_css)?c=webodf_css:(d="webodf.css",runtime.currentDirectory&&(d=runtime.currentDirectory(),0<d.length&&"/"!==d.substr(-1)&&(d+="/"),d+="../webodf.css"),c=runtime.readFileSync(d,"utf-8"));d=a.createElementNS(b.namespaceURI,"style");d.setAttribute("media","screen, print, handheld, projection");d.setAttribute("type",
"text/css");d.setAttribute("webodfcss","1");d.appendChild(a.createTextNode(c));b.appendChild(d);return d}function v(a){var b=parseInt(a.getAttribute("webodfcss"),10);1===b?a.parentNode.removeChild(a):a.setAttribute("count",b-1)}function w(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});
d+="@namespace webodfhelper url(urn:webodf:names:helper);\n";c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var z=odf.Namespaces.drawns,x=odf.Namespaces.fons,u=odf.Namespaces.officens,t=odf.Namespaces.stylens,s=odf.Namespaces.svgns,y=odf.Namespaces.tablens,F=odf.Namespaces.textns,L=odf.Namespaces.xlinkns,O=odf.Namespaces.xmlns,H=odf.Namespaces.presentationns,U=runtime.getWindow(),T=xmldom.XPath,X=new odf.OdfUtils,D=new core.DomUtils;odf.OdfCanvas=function(q){function s(a,b,c){function d(a,
b,c,h){ka.addToQueue(function(){e(a,b,c,h)})}var h,f;h=b.getElementsByTagNameNS(z,"image");for(b=0;b<h.length;b+=1)f=h.item(b),d("image"+String(b),a,f,c)}function L(a,b){function c(a,b){ka.addToQueue(function(){l(a,b)})}var d,e,h;e=b.getElementsByTagNameNS(z,"plugin");for(d=0;d<e.length;d+=1)h=e.item(d),c(a,h)}function x(){var a;a=S.firstChild;var b=Z.getZoomLevel();a&&(S.style.WebkitTransformOrigin="0% 0%",S.style.MozTransformOrigin="0% 0%",S.style.msTransformOrigin="0% 0%",S.style.OTransformOrigin=
"0% 0%",S.style.transformOrigin="0% 0%",A&&((a=A.getMinimumHeightForAnnotationPane())?S.style.minHeight=a:S.style.removeProperty("min-height")),q.style.width=Math.round(b*S.offsetWidth)+"px",q.style.height=Math.round(b*S.offsetHeight)+"px")}function ea(a){ma?(fa.parentNode||S.appendChild(fa),A&&A.forgetAnnotations(),A=new gui.AnnotationViewManager(I,a.body,fa,ca),D.getElementsByTagNameNS(a.body,u,"annotation").forEach(A.addAnnotation),A.rerenderAnnotations(),x()):fa.parentNode&&(S.removeChild(fa),
A.forgetAnnotations(),x())}function P(e){function h(){k(R);k(aa);k(ia);b(q);q.style.display="inline-block";var l=M.rootElement;q.ownerDocument.importNode(l,!0);$.setOdfContainer(M);var g=M,m=R;(new odf.FontLoader).loadFonts(g,m.sheet);d(M,$,aa);m=M;g=ia.sheet;b(q);S=B.createElementNS(q.namespaceURI,"div");S.style.display="inline-block";S.style.background="white";S.style.setProperty("float","left","important");S.appendChild(l);q.appendChild(S);fa=B.createElementNS(q.namespaceURI,"div");fa.id="annotationsPane";
ga=B.createElementNS(q.namespaceURI,"div");ga.id="shadowContent";ga.style.position="absolute";ga.style.top=0;ga.style.left=0;m.getContentElement().appendChild(ga);var v=l.body,w,x=[],D;for(w=v.firstElementChild;w&&w!==v;)if(w.namespaceURI===z&&(x[x.length]=w),w.firstElementChild)w=w.firstElementChild;else{for(;w&&w!==v&&!w.nextElementSibling;)w=w.parentNode;w&&w.nextElementSibling&&(w=w.nextElementSibling)}for(D=0;D<x.length;D+=1)w=x[D],f("frame"+String(D),w,g);x=T.getODFElementsWithXPath(v,".//*[*[@text:anchor-type='paragraph']]",
odf.Namespaces.lookupNamespaceURI);for(w=0;w<x.length;w+=1)v=x[w],v.setAttributeNS&&v.setAttributeNS("urn:webodf:names:helper","containsparagraphanchor",!0);var v=ga,P,A,N;N=0;var I,K,x=m.rootElement.ownerDocument;if((w=l.body.firstElementChild)&&w.namespaceURI===u&&("presentation"===w.localName||"drawing"===w.localName))for(w=w.firstElementChild;w;){D=w.getAttributeNS(z,"master-page-name");if(D){for(P=m.rootElement.masterStyles.firstElementChild;P&&(P.getAttributeNS(t,"name")!==D||"master-page"!==
P.localName||P.namespaceURI!==t);)P=P.nextElementSibling;D=P}else D=null;if(D){P=w.getAttributeNS("urn:webodf:names:helper","styleid");A=x.createElementNS(z,"draw:page");K=D.firstElementChild;for(I=0;K;)"true"!==K.getAttributeNS(H,"placeholder")&&(N=K.cloneNode(!0),A.appendChild(N),f(P+"_"+I,N,g)),K=K.nextElementSibling,I+=1;K=I=N=void 0;var Q=A.getElementsByTagNameNS(z,"frame");for(N=0;N<Q.length;N+=1)I=Q[N],(K=I.getAttributeNS(H,"class"))&&!/^(date-time|footer|header|page-number)$/.test(K)&&I.parentNode.removeChild(I);
v.appendChild(A);N=String(v.getElementsByTagNameNS(z,"page").length);p(A,F,"page-number",N);p(A,H,"header",n(m,w,"header"));p(A,H,"footer",n(m,w,"footer"));f(P,A,g);A.setAttributeNS(z,"draw:master-page-name",D.getAttributeNS(t,"name"))}w=w.nextElementSibling}v=q.namespaceURI;x=l.body.getElementsByTagNameNS(y,"table-cell");for(w=0;w<x.length;w+=1)D=x.item(w),D.hasAttributeNS(y,"number-columns-spanned")&&D.setAttributeNS(v,"colspan",D.getAttributeNS(y,"number-columns-spanned")),D.hasAttributeNS(y,"number-rows-spanned")&&
D.setAttributeNS(v,"rowspan",D.getAttributeNS(y,"number-rows-spanned"));r(l.body);a(l.body);c(l.body);s(m,l.body,g);L(m,l.body);D=l.body;m=q.namespaceURI;w={};var x={},V;P=U.document.getElementsByTagNameNS(F,"list-style");for(v=0;v<P.length;v+=1)I=P.item(v),(K=I.getAttributeNS(t,"name"))&&(x[K]=I);D=D.getElementsByTagNameNS(F,"list");for(v=0;v<D.length;v+=1)if(I=D.item(v),P=I.getAttributeNS(O,"id")){A=I.getAttributeNS(F,"continue-list");I.setAttributeNS(m,"id",P);N="text|list#"+P+" > text|list-item > *:first-child:before {";
if(K=I.getAttributeNS(F,"style-name")){I=x[K];V=X.getFirstNonWhitespaceChild(I);I=void 0;if(V)if("list-level-style-number"===V.localName){I=V.getAttributeNS(t,"num-format");K=V.getAttributeNS(t,"num-suffix")||"";var Q="",Q={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},W=void 0,W=V.getAttributeNS(t,"num-prefix")||"",W=Q.hasOwnProperty(I)?W+(" counter(list, "+Q[I]+")"):I?W+("'"+I+"';"):W+" ''";K&&(W+=" '"+K+"'");I=Q="content: "+W+";"}else"list-level-style-image"===V.localName?
I="content: none;":"list-level-style-bullet"===V.localName&&(I="content: '"+V.getAttributeNS(F,"bullet-char")+"';");V=I}if(A){for(I=w[A];I;)I=w[I];N+="counter-increment:"+A+";";V?(V=V.replace("list",A),N+=V):N+="content:counter("+A+");"}else A="",V?(V=V.replace("list",P),N+=V):N+="content: counter("+P+");",N+="counter-increment:"+P+";",g.insertRule("text|list#"+P+" {counter-reset:"+P+"}",g.cssRules.length);N+="}";w[P]=A;N&&g.insertRule(N,g.cssRules.length)}S.insertBefore(ga,S.firstChild);Z.setZoomableElement(S);
ea(l);if(!e&&(l=[M],da.hasOwnProperty("statereadychange")))for(g=da.statereadychange,V=0;V<g.length;V+=1)g[V].apply(null,l)}M.state===odf.OdfContainer.DONE?h():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),la=runtime.setTimeout(function C(){M.state===odf.OdfContainer.DONE?h():(runtime.log("will be back later..."),la=runtime.setTimeout(C,500))},100))}function N(a){ka.clearQueue();q.innerHTML=runtime.tr("Loading")+" "+a+"...";q.removeAttribute("style");M=new odf.OdfContainer(a,function(a){M=
a;P(!1)})}runtime.assert(null!==q&&void 0!==q,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==q.ownerDocument&&void 0!==q.ownerDocument,"odf.OdfCanvas constructor needs DOM");var I=this,B=q.ownerDocument,V=new core.Async,M,$=new odf.Formatting,W,S=null,fa=null,ma=!1,ca=!1,A=null,Y,R,aa,ia,ga,da={},la,ja,na=!1,ha=!1,ka=new m,Z=new gui.ZoomHelper;this.refreshCSS=function(){na=!0;ja.trigger()};this.refreshSize=function(){ja.trigger()};this.odfContainer=function(){return M};this.setOdfContainer=
function(a,b){M=a;P(!0===b)};this.load=this.load=N;this.save=function(a){M.save(a)};this.addListener=function(a,b){switch(a){case "click":var c=q,d=a;c.addEventListener?c.addEventListener(d,b,!1):c.attachEvent?c.attachEvent("on"+d,b):c["on"+d]=b;break;default:c=da.hasOwnProperty(a)?da[a]:da[a]=[],b&&-1===c.indexOf(b)&&c.push(b)}};this.getFormatting=function(){return $};this.getAnnotationViewManager=function(){return A};this.refreshAnnotations=function(){ea(M.rootElement)};this.rerenderAnnotations=
function(){A&&(ha=!0,ja.trigger())};this.getSizer=function(){return S};this.enableAnnotations=function(a,b){a!==ma&&(ma=a,ca=b,M&&ea(M.rootElement))};this.addAnnotation=function(a){A&&(A.addAnnotation(a),x())};this.forgetAnnotations=function(){A&&(A.forgetAnnotations(),x())};this.getZoomHelper=function(){return Z};this.setZoomLevel=function(a){Z.setZoomLevel(a)};this.getZoomLevel=function(){return Z.getZoomLevel()};this.fitToContainingElement=function(a,b){var c=Z.getZoomLevel(),d=q.offsetHeight/
c,c=a/(q.offsetWidth/c);b/d<c&&(c=b/d);Z.setZoomLevel(c)};this.fitToWidth=function(a){var b=q.offsetWidth/Z.getZoomLevel();Z.setZoomLevel(a/b)};this.fitSmart=function(a,b){var c,d;d=Z.getZoomLevel();c=q.offsetWidth/d;d=q.offsetHeight/d;c=a/c;void 0!==b&&b/d<c&&(c=b/d);Z.setZoomLevel(Math.min(1,c))};this.fitToHeight=function(a){var b=q.offsetHeight/Z.getZoomLevel();Z.setZoomLevel(a/b)};this.showFirstPage=function(){W.showFirstPage()};this.showNextPage=function(){W.showNextPage()};this.showPreviousPage=
function(){W.showPreviousPage()};this.showPage=function(a){W.showPage(a);x()};this.getElement=function(){return q};this.addCssForFrameWithImage=function(a){var b=a.getAttributeNS(z,"name"),c=a.firstElementChild;f(b,a,ia.sheet);c&&e(b+"img",M,c,ia.sheet)};this.destroy=function(a){var b=B.getElementsByTagName("head")[0],c=[W.destroy,ja.destroy];runtime.clearTimeout(la);fa&&fa.parentNode&&fa.parentNode.removeChild(fa);Z.destroy(function(){S&&(q.removeChild(S),S=null)});v(Y);b.removeChild(R);b.removeChild(aa);
b.removeChild(ia);V.destroyAll(c,a)};Y=h(B);W=new g(w(B));R=w(B);aa=w(B);ia=w(B);ja=new core.ScheduledTask(function(){na&&(d(M,$,aa),na=!1);ha&&(A&&A.rerenderAnnotations(),ha=!1);x()},0);Z.subscribe(gui.ZoomHelper.signalZoomChanged,x)}})();
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
ops.Member=function(m,g){var b=new ops.MemberProperties;this.getMemberId=function(){return m};this.getProperties=function(){return b};this.setProperties=function(k){Object.keys(k).forEach(function(d){b[d]=k[d]})};this.removeProperties=function(k){Object.keys(k).forEach(function(d){"fullName"!==d&&"color"!==d&&"imageUrl"!==d&&b.hasOwnProperty(d)&&delete b[d]})};runtime.assert(Boolean(m),"No memberId was supplied!");g.fullName||(g.fullName=runtime.tr("Unknown Author"));g.color||(g.color="black");g.imageUrl||
(g.imageUrl="avatar-joe.png");b=g};
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
gui.SelectionMover=function(m,g){function b(){r.setUnfilteredPosition(m.getNode(),0);return r}function k(a,b){var d,e=null;a&&0<a.length&&(d=b?a.item(a.length-1):a.item(0));d&&(e={top:d.top,left:b?d.right:d.left,bottom:d.bottom});return e}function d(a,b,e,f){var n=a.nodeType;e.setStart(a,b);e.collapse(!f);f=k(e.getClientRects(),!0===f);!f&&0<b&&(e.setStart(a,b-1),e.setEnd(a,b),f=k(e.getClientRects(),!0));f||(n===Node.ELEMENT_NODE&&0<b&&a.childNodes.length>=b?f=d(a,b-1,e,!0):a.nodeType===Node.TEXT_NODE&&
0<b?f=d(a,b-1,e,!0):a.previousSibling?f=d(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,e,!0):a.parentNode&&a.parentNode!==g?f=d(a.parentNode,0,e,!1):(e.selectNode(g),f=k(e.getClientRects(),!1)));runtime.assert(Boolean(f),"No visible rectangle found");return f}function n(c,d,e){for(var f=b(),k=new core.LoopWatchDog(1E4),g=0,n=0;0<c&&f.nextPosition();)k.check(),e.acceptPosition(f)===a&&(g+=1,d.acceptPosition(f)===
a&&(n+=g,g=0,c-=1));return n}function p(c,d,e){for(var f=b(),k=new core.LoopWatchDog(1E4),g=0,n=0;0<c&&f.previousPosition();)k.check(),e.acceptPosition(f)===a&&(g+=1,d.acceptPosition(f)===a&&(n+=g,g=0,c-=1));return n}function f(c,e){var h=b(),f=0,k=0,n=0>c?-1:1;for(c=Math.abs(c);0<c;){for(var m=e,p=n,r=h,q=r.container(),y=0,F=null,L=void 0,O=10,H=void 0,U=0,T=void 0,X=void 0,D=void 0,H=void 0,ba=g.ownerDocument.createRange(),G=new core.LoopWatchDog(1E4),H=d(q,r.unfilteredDomOffset(),ba),T=H.top,X=
H.left,D=T;!0===(0>p?r.previousPosition():r.nextPosition());)if(G.check(),m.acceptPosition(r)===a&&(y+=1,q=r.container(),H=d(q,r.unfilteredDomOffset(),ba),H.top!==T)){if(H.top!==D&&D!==T)break;D=H.top;H=Math.abs(X-H.left);if(null===F||H<O)F=q,L=r.unfilteredDomOffset(),O=H,U=y}null!==F?(r.setUnfilteredPosition(F,L),y=U):y=0;ba.detach();f+=y;if(0===f)break;k+=f;c-=1}return k*n}function q(c,f){var h,k,n,m,p=b(),r=e.getParagraphElement(p.getCurrentNode()),q=0,s=g.ownerDocument.createRange();0>c?(h=p.previousPosition,
k=-1):(h=p.nextPosition,k=1);for(n=d(p.container(),p.unfilteredDomOffset(),s);h.call(p);)if(f.acceptPosition(p)===a){if(e.getParagraphElement(p.getCurrentNode())!==r)break;m=d(p.container(),p.unfilteredDomOffset(),s);if(m.bottom!==n.bottom&&(n=m.top>=n.top&&m.bottom<n.bottom||m.top<=n.top&&m.bottom>n.bottom,!n))break;q+=k;n=m}s.detach();return q}var e=new odf.OdfUtils,r,a=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.getStepCounter=function(){return{convertForwardStepsBetweenFilters:n,convertBackwardStepsBetweenFilters:p,
countLinesSteps:f,countStepsToLineBoundary:q}};(function(){r=gui.SelectionMover.createPositionIterator(g);var a=g.ownerDocument.createRange();a.setStart(r.container(),r.unfilteredDomOffset());a.collapse(!0);m.setSelectedRange(a)})()};
gui.SelectionMover.createPositionIterator=function(m){var g=new function(){this.acceptNode=function(b){return b&&"urn:webodf:names:cursor"!==b.namespaceURI&&"urn:webodf:names:editinfo"!==b.namespaceURI?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}};return new core.PositionIterator(m,5,g,!1)};(function(){return gui.SelectionMover})();
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
ops.Document=function(){};ops.Document.prototype.getMemberIds=function(){};ops.Document.prototype.removeCursor=function(m){};ops.Document.prototype.getDocumentElement=function(){};ops.Document.prototype.getRootNode=function(){};ops.Document.prototype.getDOMDocument=function(){};ops.Document.prototype.cloneDocumentElement=function(){};ops.Document.prototype.setDocumentElement=function(m){};ops.Document.prototype.subscribe=function(m,g){};ops.Document.prototype.unsubscribe=function(m,g){};
ops.Document.prototype.getCanvas=function(){};ops.Document.prototype.createRootFilter=function(m){};ops.Document.signalCursorAdded="cursor/added";ops.Document.signalCursorRemoved="cursor/removed";ops.Document.signalCursorMoved="cursor/moved";ops.Document.signalMemberAdded="member/added";ops.Document.signalMemberUpdated="member/updated";ops.Document.signalMemberRemoved="member/removed";
// Input 39
ops.OdtCursor=function(m,g){var b=this,k={},d,n,p,f=new core.EventNotifier([ops.OdtCursor.signalCursorUpdated]);this.removeFromDocument=function(){p.remove()};this.subscribe=function(b,d){f.subscribe(b,d)};this.unsubscribe=function(b,d){f.unsubscribe(b,d)};this.getStepCounter=function(){return n.getStepCounter()};this.getMemberId=function(){return m};this.getNode=function(){return p.getNode()};this.getAnchorNode=function(){return p.getAnchorNode()};this.getSelectedRange=function(){return p.getSelectedRange()};
this.setSelectedRange=function(d,e){p.setSelectedRange(d,e);f.emit(ops.OdtCursor.signalCursorUpdated,b)};this.hasForwardSelection=function(){return p.hasForwardSelection()};this.getDocument=function(){return g};this.getSelectionType=function(){return d};this.setSelectionType=function(b){k.hasOwnProperty(b)?d=b:runtime.log("Invalid selection type: "+b)};this.resetSelectionType=function(){b.setSelectionType(ops.OdtCursor.RangeSelection)};p=new core.Cursor(g.getDOMDocument(),m);n=new gui.SelectionMover(p,
g.getRootNode());k[ops.OdtCursor.RangeSelection]=!0;k[ops.OdtCursor.RegionSelection]=!0;b.resetSelectionType()};ops.OdtCursor.RangeSelection="Range";ops.OdtCursor.RegionSelection="Region";ops.OdtCursor.signalCursorUpdated="cursorUpdated";(function(){return ops.OdtCursor})();
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
(function(){var m=0;ops.StepsCache=function(g,b,k){function d(a,c,d){this.nodeId=a;this.steps=c;this.node=d;this.previousBookmark=this.nextBookmark=null;this.setIteratorPosition=function(a){a.setPositionBeforeElement(d);do if(b.acceptPosition(a)===t)break;while(a.nextPosition())}}function n(a,c,d){this.nodeId=a;this.steps=c;this.node=d;this.previousBookmark=this.nextBookmark=null;this.setIteratorPosition=function(a){a.setUnfilteredPosition(d,0);do if(b.acceptPosition(a)===t)break;while(a.nextPosition())}}
function p(a,b){var c="["+a.nodeId;b&&(c+=" => "+b.nodeId);return c+"]"}function f(){for(var a=x,b,c,d,e=new core.LoopWatchDog(0,1E5);a;){e.check();(b=a.previousBookmark)?runtime.assert(b.nextBookmark===a,"Broken bookmark link to previous @"+p(b,a)):(runtime.assert(a===x,"Broken bookmark link @"+p(a)),runtime.assert(void 0===u||x.steps<=u,"Base point is damaged @"+p(a)));(c=a.nextBookmark)&&runtime.assert(c.previousBookmark===a,"Broken bookmark link to next @"+p(a,c));if(void 0===u||a.steps<=u)runtime.assert(z.containsNode(g,
a.node),"Disconnected node is being reported as undamaged @"+p(a)),b&&(d=a.node.compareDocumentPosition(b.node),runtime.assert(0===d||0!==(d&Node.DOCUMENT_POSITION_PRECEDING),"Bookmark order with previous does not reflect DOM order @"+p(b,a))),c&&z.containsNode(g,c.node)&&(d=a.node.compareDocumentPosition(c.node),runtime.assert(0===d||0!==(d&Node.DOCUMENT_POSITION_FOLLOWING),"Bookmark order with next does not reflect DOM order @"+p(a,c)));a=a.nextBookmark}}function q(a){var b="";a.nodeType===Node.ELEMENT_NODE&&
(b=a.getAttributeNS(l,"nodeId"));return b}function e(a){var b=m.toString();a.setAttributeNS(l,"nodeId",b);m+=1;return b}function r(a){var b,c,d=new core.LoopWatchDog(0,1E4);void 0!==u&&a>u&&(a=u);for(b=Math.floor(a/k)*k;!c&&0!==b;)c=h[b],b-=k;for(c=c||x;c.nextBookmark&&c.nextBookmark.steps<=a;)d.check(),c=c.nextBookmark;return c}function a(a){a.previousBookmark&&(a.previousBookmark.nextBookmark=a.nextBookmark);a.nextBookmark&&(a.nextBookmark.previousBookmark=a.previousBookmark)}function c(a){for(var b,
c=null;!c&&a&&a!==g;)(b=q(a))&&(c=v[b])&&c.node!==a&&(runtime.log("Cloned node detected. Creating new bookmark"),c=null,a.removeAttributeNS(l,"nodeId")),a=a.parentNode;return c}var l="urn:webodf:names:steps",h={},v={},w=new odf.OdfUtils,z=new core.DomUtils,x,u,t=core.PositionFilter.FilterResult.FILTER_ACCEPT,s;this.updateCache=function(b,c,f){var l;l=c.getCurrentNode();if(c.isBeforeNode()&&w.isParagraph(l)){f||(b+=1);c=b;var n,m,p;if(void 0!==u&&u<c){n=r(u);for(f=n.nextBookmark;f&&f.steps<=c;)m=f.nextBookmark,
p=Math.ceil(f.steps/k)*k,h[p]===f&&delete h[p],z.containsNode(g,f.node)?f.steps=c+1:(a(f),delete v[f.nodeId]),f=m;u=c}else n=r(c);c=n;f=q(l)||e(l);(n=v[f])?n.node===l?n.steps=b:(runtime.log("Cloned node detected. Creating new bookmark"),f=e(l),n=v[f]=new d(f,b,l)):n=v[f]=new d(f,b,l);l=n;c!==l&&c.nextBookmark!==l&&(a(l),b=c.nextBookmark,l.nextBookmark=c.nextBookmark,l.previousBookmark=c,c.nextBookmark=l,b&&(b.previousBookmark=l));b=Math.ceil(l.steps/k)*k;c=h[b];if(!c||l.steps>c.steps)h[b]=l;s()}};
this.setToClosestStep=function(a,b){var c;s();c=r(a);c.setIteratorPosition(b);return c.steps};this.setToClosestDomPoint=function(a,b,d){var e,f;s();if(a===g&&0===b)e=x;else if(a===g&&b===g.childNodes.length)for(f in e=x,h)h.hasOwnProperty(f)&&(a=h[f],a.steps>e.steps&&(e=a));else if(e=c(a.childNodes.item(b)||a),!e)for(d.setUnfilteredPosition(a,b);!e&&d.previousNode();)e=c(d.getCurrentNode());e=e||x;void 0!==u&&e.steps>u&&(e=r(u));e.setIteratorPosition(d);return e.steps};this.damageCacheAfterStep=function(a){0>
a&&(a=0);void 0===u?u=a:a<u&&(u=a);s()};(function(){var a=q(g)||e(g);x=new n(a,0,g);s=ops.StepsCache.ENABLE_CACHE_VERIFICATION?f:function(){}})()};ops.StepsCache.ENABLE_CACHE_VERIFICATION=!1;ops.StepsCache.Bookmark=function(){};ops.StepsCache.Bookmark.prototype.setIteratorPosition=function(g){}})();
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
(function(){ops.StepsTranslator=function(m,g,b,k){function d(){var a=m();a!==p&&(runtime.log("Undo detected. Resetting steps cache"),p=a,f=new ops.StepsCache(p,b,k),e=g(p))}function n(a,c){if(!c||b.acceptPosition(a)===r)return!0;for(;a.previousPosition();)if(b.acceptPosition(a)===r){if(c(0,a.container(),a.unfilteredDomOffset()))return!0;break}for(;a.nextPosition();)if(b.acceptPosition(a)===r){if(c(1,a.container(),a.unfilteredDomOffset()))return!0;break}return!1}var p=m(),f=new ops.StepsCache(p,b,
k),q=new core.DomUtils,e=g(m()),r=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.convertStepsToDomPoint=function(a){var c,l;if(isNaN(a))throw new TypeError("Requested steps is not numeric ("+a+")");if(0>a)throw new RangeError("Requested steps is negative ("+a+")");d();for(c=f.setToClosestStep(a,e);c<a&&e.nextPosition();)(l=b.acceptPosition(e)===r)&&(c+=1),f.updateCache(c,e,l);if(c!==a)throw new RangeError("Requested steps ("+a+") exceeds available steps ("+c+")");return{node:e.container(),offset:e.unfilteredDomOffset()}};
this.convertDomPointToSteps=function(a,c,l){var h;d();q.containsNode(p,a)||(c=0>q.comparePoints(p,0,a,c),a=p,c=c?0:p.childNodes.length);e.setUnfilteredPosition(a,c);n(e,l)||e.setUnfilteredPosition(a,c);l=e.container();c=e.unfilteredDomOffset();a=f.setToClosestDomPoint(l,c,e);if(0>q.comparePoints(e.container(),e.unfilteredDomOffset(),l,c))return 0<a?a-1:a;for(;(e.container()!==l||e.unfilteredDomOffset()!==c)&&e.nextPosition();)(h=b.acceptPosition(e)===r)&&(a+=1),f.updateCache(a,e,h);return a+0};this.prime=
function(){var a,c;d();for(a=f.setToClosestStep(0,e);e.nextPosition();)(c=b.acceptPosition(e)===r)&&(a+=1),f.updateCache(a,e,c)};this.handleStepsInserted=function(a){d();f.damageCacheAfterStep(a.position)};this.handleStepsRemoved=function(a){d();f.damageCacheAfterStep(a.position-1)}};ops.StepsTranslator.PREVIOUS_STEP=0;ops.StepsTranslator.NEXT_STEP=1;return ops.StepsTranslator})();
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
ops.TextPositionFilter=function(m){function g(d,k,e){var g,a;if(k){if(b.isInlineRoot(k)&&b.isGroupingElement(e))return p;g=b.lookLeftForCharacter(k);if(1===g||2===g&&(b.scanRightForAnyCharacter(e)||b.scanRightForAnyCharacter(b.nextNode(d))))return n}g=null===k&&b.isParagraph(d);a=b.lookRightForCharacter(e);if(g)return a?n:b.scanRightForAnyCharacter(e)?p:n;if(!a)return p;k=k||b.previousNode(d);return b.scanLeftForAnyCharacter(k)?p:n}var b=new odf.OdfUtils,k=Node.ELEMENT_NODE,d=Node.TEXT_NODE,n=core.PositionFilter.FilterResult.FILTER_ACCEPT,
p=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(f){var q=f.container(),e=q.nodeType,r,a,c;if(e!==k&&e!==d)return p;if(e===d){if(!b.isGroupingElement(q.parentNode)||b.isWithinTrackedChanges(q.parentNode,m()))return p;e=f.unfilteredDomOffset();r=q.data;runtime.assert(e!==r.length,"Unexpected offset.");if(0<e){f=r[e-1];if(!b.isODFWhitespace(f))return n;if(1<e)if(f=r[e-2],!b.isODFWhitespace(f))a=n;else{if(!b.isODFWhitespace(r.substr(0,e)))return p}else c=b.previousNode(q),
b.scanLeftForNonSpace(c)&&(a=n);if(a===n)return b.isTrailingWhitespace(q,e)?p:n;a=r[e];return b.isODFWhitespace(a)?p:b.scanLeftForAnyCharacter(b.previousNode(q))?p:n}c=f.leftNode();a=q;q=q.parentNode;a=g(q,c,a)}else!b.isGroupingElement(q)||b.isWithinTrackedChanges(q,m())?a=p:(c=f.leftNode(),a=f.rightNode(),a=g(q,c,a));return a}};
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
ops.OdtDocument=function(m){function g(){var a=m.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"' for OdtDocument");return a}function b(){return a.getDocumentElement().ownerDocument}function k(a){for(;a&&!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}function d(a){this.acceptPosition=function(b){b=b.container();var c;
c="string"===typeof a?h[a].getNode():a;return k(b)===k(c)?z:x}}function n(a,b,c,d){d=gui.SelectionMover.createPositionIterator(d);var e;1===c.length?e=c[0]:(e=new core.PositionFilterChain,c.forEach(e.addFilter));c=new core.StepIterator(e,d);c.setPosition(a,b);return c}function p(a){var b=gui.SelectionMover.createPositionIterator(g());a=t.convertStepsToDomPoint(a);b.setUnfilteredPosition(a.node,a.offset);return b}function f(a){return c.getParagraphElement(a)}function q(a,b){return m.getFormatting().getStyleElement(a,
b)}function e(a){return q(a,"paragraph")}function r(a,b,c){a=a.childNodes.item(b)||a;return(a=f(a))&&l.containsNode(c,a)?a:c}var a=this,c,l,h={},v={},w=new core.EventNotifier([ops.Document.signalMemberAdded,ops.Document.signalMemberUpdated,ops.Document.signalMemberRemoved,ops.Document.signalCursorAdded,ops.Document.signalCursorRemoved,ops.Document.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonStyleCreated,ops.OdtDocument.signalCommonStyleDeleted,
ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationStart,ops.OdtDocument.signalOperationEnd,ops.OdtDocument.signalProcessingBatchStart,ops.OdtDocument.signalProcessingBatchEnd,ops.OdtDocument.signalUndoStackChanged,ops.OdtDocument.signalStepsInserted,ops.OdtDocument.signalStepsRemoved]),z=core.PositionFilter.FilterResult.FILTER_ACCEPT,x=core.PositionFilter.FilterResult.FILTER_REJECT,u,t,s;this.getDocumentElement=function(){return m.odfContainer().rootElement};this.getDOMDocument=function(){return this.getDocumentElement().ownerDocument};
this.cloneDocumentElement=function(){var b=a.getDocumentElement(),c=m.getAnnotationViewManager();c&&c.forgetAnnotations();b=b.cloneNode(!0);m.refreshAnnotations();return b};this.setDocumentElement=function(a){var b=m.odfContainer();b.setRootElement(a);m.setOdfContainer(b,!0);m.refreshCSS()};this.getDOMDocument=b;this.getRootElement=k;this.createStepIterator=n;this.getIteratorAtPosition=p;this.convertDomPointToCursorStep=function(a,b,c){return t.convertDomPointToSteps(a,b,c)};this.convertDomToCursorRange=
function(a,b){var c,d;c=b&&b(a.anchorNode,a.anchorOffset);c=t.convertDomPointToSteps(a.anchorNode,a.anchorOffset,c);b||a.anchorNode!==a.focusNode||a.anchorOffset!==a.focusOffset?(d=b&&b(a.focusNode,a.focusOffset),d=t.convertDomPointToSteps(a.focusNode,a.focusOffset,d)):d=c;return{position:c,length:d-c}};this.convertCursorToDomRange=function(a,c){var d=b().createRange(),e,h;e=t.convertStepsToDomPoint(a);c?(h=t.convertStepsToDomPoint(a+c),0<c?(d.setStart(e.node,e.offset),d.setEnd(h.node,h.offset)):
(d.setStart(h.node,h.offset),d.setEnd(e.node,e.offset))):d.setStart(e.node,e.offset);return d};this.getStyleElement=q;this.upgradeWhitespacesAtPosition=function(a){a=p(a);var b,d,e;a.previousPosition();a.previousPosition();for(e=-1;1>=e;e+=1){b=a.container();d=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[d]&&c.isSignificantWhitespace(b,d)){runtime.assert(" "===b.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var h=b.ownerDocument.createElementNS(odf.Namespaces.textns,
"text:s"),f=b.parentNode,l=b;h.appendChild(b.ownerDocument.createTextNode(" "));1===b.length?f.replaceChild(h,b):(b.deleteData(d,1),0<d&&(d<b.length&&b.splitText(d),l=b.nextSibling),f.insertBefore(h,l));b=h;a.moveToEndOfNode(b)}a.nextPosition()}};this.downgradeWhitespacesAtPosition=function(a){var b=p(a),d;a=b.container();for(b=b.unfilteredDomOffset();!c.isSpaceElement(a)&&a.childNodes.item(b);)a=a.childNodes.item(b),b=0;a.nodeType===Node.TEXT_NODE&&(a=a.parentNode);c.isDowngradableSpaceElement(a)&&
(b=a.firstChild,d=a.lastChild,l.mergeIntoParent(a),d!==b&&l.normalizeTextNodes(d),l.normalizeTextNodes(b))};this.getParagraphStyleElement=e;this.getParagraphElement=f;this.getParagraphStyleAttributes=function(a){return(a=e(a))?m.getFormatting().getInheritedStyleAttributes(a,!1):null};this.getTextNodeAtStep=function(c,d){var e=p(c),f=e.container(),l,k=0,g=null;f.nodeType===Node.TEXT_NODE?(l=f,k=e.unfilteredDomOffset(),0<l.length&&(0<k&&(l=l.splitText(k)),l.parentNode.insertBefore(b().createTextNode(""),
l),l=l.previousSibling,k=0)):(l=b().createTextNode(""),k=0,f.insertBefore(l,e.rightNode()));if(d){if(h[d]&&a.getCursorPosition(d)===c){for(g=h[d].getNode();g.nextSibling&&"cursor"===g.nextSibling.localName;)g.parentNode.insertBefore(g.nextSibling,g);0<l.length&&l.nextSibling!==g&&(l=b().createTextNode(""),k=0);g.parentNode.insertBefore(l,g)}}else for(;l.nextSibling&&"cursor"===l.nextSibling.localName;)l.parentNode.insertBefore(l.nextSibling,l);for(;l.previousSibling&&l.previousSibling.nodeType===
Node.TEXT_NODE;)e=l.previousSibling,e.appendData(l.data),k=e.length,l=e,l.parentNode.removeChild(l.nextSibling);for(;l.nextSibling&&l.nextSibling.nodeType===Node.TEXT_NODE;)e=l.nextSibling,l.appendData(e.data),l.parentNode.removeChild(e);return{textNode:l,offset:k}};this.fixCursorPositions=function(){Object.keys(h).forEach(function(b){var c=h[b],d=k(c.getNode()),e=a.createRootFilter(d),f,l,g,m=!1;g=c.getSelectedRange();f=r(g.startContainer,g.startOffset,d);l=n(g.startContainer,g.startOffset,[u,e],
f);g.collapsed?d=l:(f=r(g.endContainer,g.endOffset,d),d=n(g.endContainer,g.endOffset,[u,e],f));l.isStep()&&d.isStep()?l.container()!==d.container()||l.offset()!==d.offset()||g.collapsed&&c.getAnchorNode()===c.getNode()||(m=!0,g.setStart(l.container(),l.offset()),g.collapse(!0)):(m=!0,runtime.assert(l.roundToClosestStep(),"No walkable step found for cursor owned by "+b),g.setStart(l.container(),l.offset()),runtime.assert(d.roundToClosestStep(),"No walkable step found for cursor owned by "+b),g.setEnd(d.container(),
d.offset()));m&&(c.setSelectedRange(g,c.hasForwardSelection()),a.emit(ops.Document.signalCursorMoved,c))})};this.getCursorPosition=function(a){return(a=h[a])?t.convertDomPointToSteps(a.getNode(),0):0};this.getCursorSelection=function(a){a=h[a];var b=0,c=0;a&&(b=t.convertDomPointToSteps(a.getNode(),0),c=t.convertDomPointToSteps(a.getAnchorNode(),0));return{position:c,length:b-c}};this.getPositionFilter=function(){return u};this.getOdfCanvas=function(){return m};this.getCanvas=function(){return m};
this.getRootNode=g;this.addMember=function(a){runtime.assert(void 0===v[a.getMemberId()],"This member already exists");v[a.getMemberId()]=a};this.getMember=function(a){return v.hasOwnProperty(a)?v[a]:null};this.removeMember=function(a){delete v[a]};this.getCursor=function(a){return h[a]};this.getMemberIds=function(){var a=[],b;for(b in h)h.hasOwnProperty(b)&&a.push(h[b].getMemberId());return a};this.addCursor=function(b){runtime.assert(Boolean(b),"OdtDocument::addCursor without cursor");var c=b.getMemberId(),
d=a.convertCursorToDomRange(0,0);runtime.assert("string"===typeof c,"OdtDocument::addCursor has cursor without memberid");runtime.assert(!h[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);b.setSelectedRange(d,!0);h[c]=b};this.removeCursor=function(b){var c=h[b];return c?(c.removeFromDocument(),delete h[b],a.emit(ops.Document.signalCursorRemoved,b),!0):!1};this.moveCursor=function(b,c,d,e){b=h[b];c=a.convertCursorToDomRange(c,d);b&&(b.setSelectedRange(c,0<=d),b.setSelectionType(e||
ops.OdtCursor.RangeSelection))};this.getFormatting=function(){return m.getFormatting()};this.emit=function(a,b){w.emit(a,b)};this.subscribe=function(a,b){w.subscribe(a,b)};this.unsubscribe=function(a,b){w.unsubscribe(a,b)};this.createRootFilter=function(a){return new d(a)};this.close=function(a){a()};this.destroy=function(a){a()};u=new ops.TextPositionFilter(g);c=new odf.OdfUtils;l=new core.DomUtils;t=new ops.StepsTranslator(g,gui.SelectionMover.createPositionIterator,u,500);w.subscribe(ops.OdtDocument.signalStepsInserted,
t.handleStepsInserted);w.subscribe(ops.OdtDocument.signalStepsRemoved,t.handleStepsRemoved);w.subscribe(ops.OdtDocument.signalOperationEnd,function(b){var c=b.spec(),d=c.memberid,c=(new Date(c.timestamp)).toISOString(),e=m.odfContainer();b.isEdit&&(d=a.getMember(d).getProperties().fullName,e.setMetadata({"dc:creator":d,"dc:date":c},null),s||(e.incrementEditingCycles(),e.setMetadata(null,["meta:editing-duration","meta:document-statistic"])),s=b)})};ops.OdtDocument.signalParagraphChanged="paragraph/changed";
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
ops.OpAddAnnotation=function(){function m(b,d,e){var k=b.getTextNodeAtStep(e,g);k&&(b=k.textNode,e=b.parentNode,k.offset!==b.length&&b.splitText(k.offset),e.insertBefore(d,b.nextSibling),0===b.length&&e.removeChild(b))}var g,b,k,d,n,p;this.init=function(f){g=f.memberid;b=parseInt(f.timestamp,10);k=parseInt(f.position,10);d=parseInt(f.length,10)||0;n=f.name};this.isEdit=!0;this.group=void 0;this.execute=function(f){var q=f.getCursor(g),e,r;r=new core.DomUtils;p=f.getDOMDocument();var a=new Date(b),
c,l,h,v;c=p.createElementNS(odf.Namespaces.officens,"office:annotation");c.setAttributeNS(odf.Namespaces.officens,"office:name",n);e=p.createElementNS(odf.Namespaces.dcns,"dc:creator");e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",g);e.textContent=f.getMember(g).getProperties().fullName;l=p.createElementNS(odf.Namespaces.dcns,"dc:date");l.appendChild(p.createTextNode(a.toISOString()));a=p.createElementNS(odf.Namespaces.textns,"text:list");h=p.createElementNS(odf.Namespaces.textns,
"text:list-item");v=p.createElementNS(odf.Namespaces.textns,"text:p");h.appendChild(v);a.appendChild(h);c.appendChild(e);c.appendChild(l);c.appendChild(a);d&&(e=p.createElementNS(odf.Namespaces.officens,"office:annotation-end"),e.setAttributeNS(odf.Namespaces.officens,"office:name",n),c.annotationEndElement=e,m(f,e,k+d));m(f,c,k);f.emit(ops.OdtDocument.signalStepsInserted,{position:k,length:d});q&&(e=p.createRange(),r=r.getElementsByTagNameNS(c,odf.Namespaces.textns,"p")[0],e.selectNodeContents(r),
q.setSelectedRange(e,!1),f.emit(ops.Document.signalCursorMoved,q));f.getOdfCanvas().addAnnotation(c);f.fixCursorPositions();return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:g,timestamp:b,position:k,length:d,name:n}}};
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
ops.OpAddCursor=function(){var m,g;this.init=function(b){m=b.memberid;g=b.timestamp};this.isEdit=!1;this.group=void 0;this.execute=function(b){var g=b.getCursor(m);if(g)return!1;g=new ops.OdtCursor(m,b);b.addCursor(g);b.emit(ops.Document.signalCursorAdded,g);return!0};this.spec=function(){return{optype:"AddCursor",memberid:m,timestamp:g}}};
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
ops.OpAddMember=function(){var m,g,b;this.init=function(k){m=k.memberid;g=parseInt(k.timestamp,10);b=k.setProperties};this.isEdit=!1;this.group=void 0;this.execute=function(g){var d;if(g.getMember(m))return!1;d=new ops.Member(m,b);g.addMember(d);g.emit(ops.Document.signalMemberAdded,d);return!0};this.spec=function(){return{optype:"AddMember",memberid:m,timestamp:g,setProperties:b}}};
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
ops.OpAddStyle=function(){var m,g,b,k,d,n,p=odf.Namespaces.stylens;this.init=function(f){m=f.memberid;g=f.timestamp;b=f.styleName;k=f.styleFamily;d="true"===f.isAutomaticStyle||!0===f.isAutomaticStyle;n=f.setProperties};this.isEdit=!0;this.group=void 0;this.execute=function(f){var g=f.getOdfCanvas().odfContainer(),e=f.getFormatting(),m=f.getDOMDocument().createElementNS(p,"style:style");if(!m)return!1;n&&e.updateStyle(m,n);m.setAttributeNS(p,"style:family",k);m.setAttributeNS(p,"style:name",b);d?
g.rootElement.automaticStyles.appendChild(m):g.rootElement.styles.appendChild(m);f.getOdfCanvas().refreshCSS();d||f.emit(ops.OdtDocument.signalCommonStyleCreated,{name:b,family:k});return!0};this.spec=function(){return{optype:"AddStyle",memberid:m,timestamp:g,styleName:b,styleFamily:k,isAutomaticStyle:d,setProperties:n}}};
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
odf.ObjectNameGenerator=function(m,g){function b(a,b){var c={};this.generateName=function(){var d=b(),e=0,f;do f=a+e,e+=1;while(c[f]||d[f]);c[f]=!0;return f}}function k(){var a={};[m.rootElement.automaticStyles,m.rootElement.styles].forEach(function(b){for(b=b.firstElementChild;b;)b.namespaceURI===d&&"style"===b.localName&&(a[b.getAttributeNS(d,"name")]=!0),b=b.nextElementSibling});return a}var d=odf.Namespaces.stylens,n=odf.Namespaces.drawns,p=odf.Namespaces.xlinkns,f=new core.DomUtils,q=(new core.Utils).hashString(g),
e=null,r=null,a=null,c={},l={};this.generateStyleName=function(){null===e&&(e=new b("auto"+q+"_",function(){return k()}));return e.generateName()};this.generateFrameName=function(){null===r&&(f.getElementsByTagNameNS(m.rootElement.body,n,"frame").forEach(function(a){c[a.getAttributeNS(n,"name")]=!0}),r=new b("fr"+q+"_",function(){return c}));return r.generateName()};this.generateImageName=function(){null===a&&(f.getElementsByTagNameNS(m.rootElement.body,n,"image").forEach(function(a){a=a.getAttributeNS(p,
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
odf.TextStyleApplicator=function(m,g,b){function k(b){function d(a,b){return"object"===typeof a&&"object"===typeof b?Object.keys(a).every(function(e){return d(a[e],b[e])}):a===b}var a={};this.isStyleApplied=function(c){c=g.getAppliedStylesForElement(c,a);return d(b,c)}}function d(d){var k={};this.applyStyleToContainer=function(a){var c;c=a.getAttributeNS(f,"style-name");var l=a.ownerDocument;c=c||"";if(!k.hasOwnProperty(c)){var h=c,n;n=c?g.createDerivedStyleObject(c,"text",d):d;l=l.createElementNS(q,
"style:style");g.updateStyle(l,n);l.setAttributeNS(q,"style:name",m.generateStyleName());l.setAttributeNS(q,"style:family","text");l.setAttributeNS("urn:webodf:names:scope","scope","document-content");b.appendChild(l);k[h]=l}c=k[c].getAttributeNS(q,"name");a.setAttributeNS(f,"text:style-name",c)}}function n(b,d){var a=b.ownerDocument,c=b.parentNode,l,h,g=new core.LoopWatchDog(1E4);h=[];"span"!==c.localName||c.namespaceURI!==f?(l=a.createElementNS(f,"text:span"),c.insertBefore(l,b),c=!1):(b.previousSibling&&
!p.rangeContainsNode(d,c.firstChild)?(l=c.cloneNode(!1),c.parentNode.insertBefore(l,c.nextSibling)):l=c,c=!0);h.push(b);for(a=b.nextSibling;a&&p.rangeContainsNode(d,a);)g.check(),h.push(a),a=a.nextSibling;h.forEach(function(a){a.parentNode!==l&&l.appendChild(a)});if(a&&c)for(h=l.cloneNode(!1),l.parentNode.insertBefore(h,l.nextSibling);a;)g.check(),c=a.nextSibling,h.appendChild(a),a=c;return l}var p=new core.DomUtils,f=odf.Namespaces.textns,q=odf.Namespaces.stylens;this.applyStyle=function(b,f,a){var c=
{},l,h,g,m;runtime.assert(a&&a.hasOwnProperty("style:text-properties"),"applyStyle without any text properties");c["style:text-properties"]=a["style:text-properties"];g=new d(c);m=new k(c);b.forEach(function(a){l=m.isStyleApplied(a);!1===l&&(h=n(a,f),g.applyStyleToContainer(h))})}};
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
ops.OpApplyDirectStyling=function(){function m(b,d,k){var a=b.getOdfCanvas().odfContainer(),c=f.splitBoundaries(d),l=p.getTextNodes(d,!1);d={startContainer:d.startContainer,startOffset:d.startOffset,endContainer:d.endContainer,endOffset:d.endOffset};(new odf.TextStyleApplicator(new odf.ObjectNameGenerator(a,g),b.getFormatting(),a.rootElement.automaticStyles)).applyStyle(l,d,k);c.forEach(f.normalizeTextNodes)}var g,b,k,d,n,p=new odf.OdfUtils,f=new core.DomUtils;this.init=function(f){g=f.memberid;b=
f.timestamp;k=parseInt(f.position,10);d=parseInt(f.length,10);n=f.setProperties};this.isEdit=!0;this.group=void 0;this.execute=function(f){var e=f.convertCursorToDomRange(k,d),r=p.getParagraphElements(e);m(f,e,n);e.detach();f.getOdfCanvas().refreshCSS();f.fixCursorPositions();r.forEach(function(a){f.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:g,timeStamp:b})});f.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:g,
timestamp:b,position:k,length:d,setProperties:n}}};
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
ops.OpApplyHyperlink=function(){function m(b){for(;b;){if(f.isHyperlink(b))return!0;b=b.parentNode}return!1}var g,b,k,d,n,p=new core.DomUtils,f=new odf.OdfUtils;this.init=function(f){g=f.memberid;b=f.timestamp;k=f.position;d=f.length;n=f.hyperlink};this.isEdit=!0;this.group=void 0;this.execute=function(q){var e=q.getDOMDocument(),r=q.convertCursorToDomRange(k,d),a=p.splitBoundaries(r),c=[],l=f.getTextNodes(r,!1);if(0===l.length)return!1;l.forEach(function(a){var b=f.getParagraphElement(a);runtime.assert(!1===
m(a),"The given range should not contain any link.");var d=n,l=e.createElementNS(odf.Namespaces.textns,"text:a");l.setAttributeNS(odf.Namespaces.xlinkns,"xlink:type","simple");l.setAttributeNS(odf.Namespaces.xlinkns,"xlink:href",d);a.parentNode.insertBefore(l,a);l.appendChild(a);-1===c.indexOf(b)&&c.push(b)});a.forEach(p.normalizeTextNodes);r.detach();q.getOdfCanvas().refreshSize();q.getOdfCanvas().rerenderAnnotations();c.forEach(function(a){q.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,
memberId:g,timeStamp:b})});return!0};this.spec=function(){return{optype:"ApplyHyperlink",memberid:g,timestamp:b,position:k,length:d,hyperlink:n}}};
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
ops.OpInsertImage=function(){var m,g,b,k,d,n,p,f,q=odf.Namespaces.drawns,e=odf.Namespaces.svgns,r=odf.Namespaces.textns,a=odf.Namespaces.xlinkns;this.init=function(a){m=a.memberid;g=a.timestamp;b=a.position;k=a.filename;d=a.frameWidth;n=a.frameHeight;p=a.frameStyleName;f=a.frameName};this.isEdit=!0;this.group=void 0;this.execute=function(c){var l=c.getOdfCanvas(),h=c.getTextNodeAtStep(b,m),v,w;if(!h)return!1;v=h.textNode;w=c.getParagraphElement(v);var h=h.offset!==v.length?v.splitText(h.offset):v.nextSibling,
z=c.getDOMDocument(),x=z.createElementNS(q,"draw:image"),z=z.createElementNS(q,"draw:frame");x.setAttributeNS(a,"xlink:href",k);x.setAttributeNS(a,"xlink:type","simple");x.setAttributeNS(a,"xlink:show","embed");x.setAttributeNS(a,"xlink:actuate","onLoad");z.setAttributeNS(q,"draw:style-name",p);z.setAttributeNS(q,"draw:name",f);z.setAttributeNS(r,"text:anchor-type","as-char");z.setAttributeNS(e,"svg:width",d);z.setAttributeNS(e,"svg:height",n);z.appendChild(x);v.parentNode.insertBefore(z,h);c.emit(ops.OdtDocument.signalStepsInserted,
{position:b,length:1});0===v.length&&v.parentNode.removeChild(v);l.addCssForFrameWithImage(z);l.refreshCSS();c.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:w,memberId:m,timeStamp:g});l.rerenderAnnotations();return!0};this.spec=function(){return{optype:"InsertImage",memberid:m,timestamp:g,filename:k,position:b,frameWidth:d,frameHeight:n,frameStyleName:p,frameName:f}}};
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
ops.OpInsertTable=function(){function m(b,a){var c;if(1===e.length)c=e[0];else if(3===e.length)switch(b){case 0:c=e[0];break;case k-1:c=e[2];break;default:c=e[1]}else c=e[b];if(1===c.length)return c[0];if(3===c.length)switch(a){case 0:return c[0];case d-1:return c[2];default:return c[1]}return c[a]}var g,b,k,d,n,p,f,q,e;this.init=function(m){g=m.memberid;b=m.timestamp;n=m.position;k=m.initialRows;d=m.initialColumns;p=m.tableName;f=m.tableStyleName;q=m.tableColumnStyleName;e=m.tableCellStyleMatrix};
this.isEdit=!0;this.group=void 0;this.execute=function(e){var a=e.getTextNodeAtStep(n),c=e.getRootNode();if(a){var l=e.getDOMDocument(),h=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),v=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),w,z,x,u;f&&h.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",f);p&&h.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",p);v.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:number-columns-repeated",d);q&&v.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",q);h.appendChild(v);for(x=0;x<k;x+=1){v=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(u=0;u<d;u+=1)w=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(z=m(x,u))&&w.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",z),z=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"text:p"),w.appendChild(z),v.appendChild(w);h.appendChild(v)}a=e.getParagraphElement(a.textNode);c.insertBefore(h,a.nextSibling);e.emit(ops.OdtDocument.signalStepsInserted,{position:n,length:d*k+1});e.getOdfCanvas().refreshSize();e.emit(ops.OdtDocument.signalTableAdded,{tableElement:h,memberId:g,timeStamp:b});e.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:g,timestamp:b,position:n,initialRows:k,initialColumns:d,tableName:p,tableStyleName:f,
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
ops.OpInsertText=function(){var m,g,b,k,d;this.init=function(n){m=n.memberid;g=n.timestamp;b=n.position;d=n.text;k="true"===n.moveCursor||!0===n.moveCursor};this.isEdit=!0;this.group=void 0;this.execute=function(n){var p,f,q,e=null,r=n.getDOMDocument(),a,c=0,l,h=n.getCursor(m),v;n.upgradeWhitespacesAtPosition(b);if(p=n.getTextNodeAtStep(b)){f=p.textNode;e=f.nextSibling;q=f.parentNode;a=n.getParagraphElement(f);for(v=0;v<d.length;v+=1)if(" "===d[v]&&(0===v||v===d.length-1||" "===d[v-1])||"\t"===d[v])0===
c?(p.offset!==f.length&&(e=f.splitText(p.offset)),0<v&&f.appendData(d.substring(0,v))):c<v&&(c=d.substring(c,v),q.insertBefore(r.createTextNode(c),e)),c=v+1,l=" "===d[v]?"text:s":"text:tab",l=r.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",l),l.appendChild(r.createTextNode(d[v])),q.insertBefore(l,e);0===c?f.insertData(p.offset,d):c<d.length&&(p=d.substring(c),q.insertBefore(r.createTextNode(p),e));q=f.parentNode;e=f.nextSibling;q.removeChild(f);q.insertBefore(f,e);0===f.length&&
f.parentNode.removeChild(f);n.emit(ops.OdtDocument.signalStepsInserted,{position:b,length:d.length});h&&k&&(n.moveCursor(m,b+d.length,0),n.emit(ops.Document.signalCursorMoved,h));0<b&&(1<b&&n.downgradeWhitespacesAtPosition(b-2),n.downgradeWhitespacesAtPosition(b-1));n.downgradeWhitespacesAtPosition(b);n.downgradeWhitespacesAtPosition(b+d.length-1);n.downgradeWhitespacesAtPosition(b+d.length);n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,
timeStamp:g});n.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:m,timestamp:g,position:b,text:d,moveCursor:k}}};
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
ops.OpMoveCursor=function(){var m,g,b,k,d;this.init=function(n){m=n.memberid;g=n.timestamp;b=n.position;k=n.length||0;d=n.selectionType||ops.OdtCursor.RangeSelection};this.isEdit=!1;this.group=void 0;this.execute=function(g){var p=g.getCursor(m),f;if(!p)return!1;f=g.convertCursorToDomRange(b,k);p.setSelectedRange(f,0<=k);p.setSelectionType(d);g.emit(ops.Document.signalCursorMoved,p);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:m,timestamp:g,position:b,length:k,selectionType:d}}};
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
ops.OpRemoveAnnotation=function(){var m,g,b,k,d;this.init=function(n){m=n.memberid;g=n.timestamp;b=parseInt(n.position,10);k=parseInt(n.length,10);d=new core.DomUtils};this.isEdit=!0;this.group=void 0;this.execute=function(g){function m(b){q.parentNode.insertBefore(b,q)}for(var f=g.getIteratorAtPosition(b).container(),q;f.namespaceURI!==odf.Namespaces.officens||"annotation"!==f.localName;)f=f.parentNode;if(null===f)return!1;q=f;f=q.annotationEndElement;g.getOdfCanvas().forgetAnnotations();d.getElementsByTagNameNS(q,
"urn:webodf:names:cursor","cursor").forEach(m);d.getElementsByTagNameNS(q,"urn:webodf:names:cursor","anchor").forEach(m);q.parentNode.removeChild(q);f&&f.parentNode.removeChild(f);g.emit(ops.OdtDocument.signalStepsRemoved,{position:0<b?b-1:b,length:k});g.fixCursorPositions();g.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:m,timestamp:g,position:b,length:k}}};
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
ops.OpRemoveBlob=function(){var m,g,b;this.init=function(k){m=k.memberid;g=k.timestamp;b=k.filename};this.isEdit=!0;this.group=void 0;this.execute=function(g){g.getOdfCanvas().odfContainer().removeBlob(b);return!0};this.spec=function(){return{optype:"RemoveBlob",memberid:m,timestamp:g,filename:b}}};
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
ops.OpRemoveCursor=function(){var m,g;this.init=function(b){m=b.memberid;g=b.timestamp};this.isEdit=!1;this.group=void 0;this.execute=function(b){return b.removeCursor(m)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:m,timestamp:g}}};
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
ops.OpRemoveHyperlink=function(){var m,g,b,k,d=new core.DomUtils,n=new odf.OdfUtils;this.init=function(d){m=d.memberid;g=d.timestamp;b=d.position;k=d.length};this.isEdit=!0;this.group=void 0;this.execute=function(p){var f=p.convertCursorToDomRange(b,k),q=n.getHyperlinkElements(f);runtime.assert(1===q.length,"The given range should only contain a single link.");q=d.mergeIntoParent(q[0]);f.detach();p.getOdfCanvas().refreshSize();p.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:n.getParagraphElement(q),
memberId:m,timeStamp:g});p.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveHyperlink",memberid:m,timestamp:g,position:b,length:k}}};
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
ops.OpRemoveMember=function(){var m,g;this.init=function(b){m=b.memberid;g=parseInt(b.timestamp,10)};this.isEdit=!1;this.group=void 0;this.execute=function(b){if(!b.getMember(m))return!1;b.removeMember(m);b.emit(ops.Document.signalMemberRemoved,m);return!0};this.spec=function(){return{optype:"RemoveMember",memberid:m,timestamp:g}}};
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
ops.OpRemoveStyle=function(){var m,g,b,k;this.init=function(d){m=d.memberid;g=d.timestamp;b=d.styleName;k=d.styleFamily};this.isEdit=!0;this.group=void 0;this.execute=function(d){var g=d.getStyleElement(b,k);if(!g)return!1;g.parentNode.removeChild(g);d.getOdfCanvas().refreshCSS();d.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:b,family:k});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:m,timestamp:g,styleName:b,styleFamily:k}}};
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
ops.OpRemoveText=function(){function m(b){function d(a){return f.hasOwnProperty(a.namespaceURI)||"br"===a.localName&&n.isLineBreak(a.parentNode)||a.nodeType===Node.TEXT_NODE&&f.hasOwnProperty(a.parentNode.namespaceURI)}function g(a){if(n.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(f.hasOwnProperty(a.namespaceURI)||!g(a))return!1;a=a.nextSibling}return!0}function a(c){var f;c.nodeType===Node.TEXT_NODE?(f=c.parentNode,f.removeChild(c)):
f=p.removeUnwantedNodes(c,d);return f&&!n.isParagraph(f)&&f!==b&&g(f)?a(f):f}this.isEmpty=g;this.mergeChildrenIntoParent=a}var g,b,k,d,n,p,f={};this.init=function(m){runtime.assert(0<=m.length,"OpRemoveText only supports positive lengths");g=m.memberid;b=m.timestamp;k=parseInt(m.position,10);d=parseInt(m.length,10);n=new odf.OdfUtils;p=new core.DomUtils;f[odf.Namespaces.dbns]=!0;f[odf.Namespaces.dcns]=!0;f[odf.Namespaces.dr3dns]=!0;f[odf.Namespaces.drawns]=!0;f[odf.Namespaces.chartns]=!0;f[odf.Namespaces.formns]=
!0;f[odf.Namespaces.numberns]=!0;f[odf.Namespaces.officens]=!0;f[odf.Namespaces.presentationns]=!0;f[odf.Namespaces.stylens]=!0;f[odf.Namespaces.svgns]=!0;f[odf.Namespaces.tablens]=!0;f[odf.Namespaces.textns]=!0};this.isEdit=!0;this.group=void 0;this.execute=function(f){var e,r,a,c,l=f.getCursor(g),h=new m(f.getRootNode());f.upgradeWhitespacesAtPosition(k);f.upgradeWhitespacesAtPosition(k+d);r=f.convertCursorToDomRange(k,d);p.splitBoundaries(r);e=f.getParagraphElement(r.startContainer);a=n.getTextElements(r,
!1,!0);c=n.getParagraphElements(r);r.detach();a.forEach(function(a){a.parentNode?h.mergeChildrenIntoParent(a):runtime.log("WARN: text element has already been removed from it's container")});r=c.reduce(function(a,b){var c,d=a,e=b,f,l=null;h.isEmpty(a)&&(b.parentNode!==a.parentNode&&(f=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),e=a,d=b,l=d.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo").item(0)||d.firstChild);for(;e.firstChild;)c=e.firstChild,e.removeChild(c),"editinfo"!==
c.localName&&d.insertBefore(c,l);f&&h.isEmpty(f)&&h.mergeChildrenIntoParent(f);h.mergeChildrenIntoParent(e);return d});f.emit(ops.OdtDocument.signalStepsRemoved,{position:k,length:d});f.downgradeWhitespacesAtPosition(k);f.fixCursorPositions();f.getOdfCanvas().refreshSize();f.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:r||e,memberId:g,timeStamp:b});l&&(l.resetSelectionType(),f.emit(ops.Document.signalCursorMoved,l));f.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",
memberid:g,timestamp:b,position:k,length:d}}};
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
ops.OpSetBlob=function(){var m,g,b,k,d;this.init=function(n){m=n.memberid;g=n.timestamp;b=n.filename;k=n.mimetype;d=n.content};this.isEdit=!0;this.group=void 0;this.execute=function(g){g.getOdfCanvas().odfContainer().setBlob(b,k,d);return!0};this.spec=function(){return{optype:"SetBlob",memberid:m,timestamp:g,filename:b,mimetype:k,content:d}}};
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
ops.OpSetParagraphStyle=function(){var m,g,b,k;this.init=function(d){m=d.memberid;g=d.timestamp;b=d.position;k=d.styleName};this.isEdit=!0;this.group=void 0;this.execute=function(d){var n;n=d.getIteratorAtPosition(b);return(n=d.getParagraphElement(n.container()))?(""!==k?n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",k):n.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","style-name"),d.getOdfCanvas().refreshSize(),d.emit(ops.OdtDocument.signalParagraphChanged,
{paragraphElement:n,timeStamp:g,memberId:m}),d.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:m,timestamp:g,position:b,styleName:k}}};
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
ops.OpSplitParagraph=function(){var m,g,b,k,d;this.init=function(n){m=n.memberid;g=n.timestamp;b=n.position;k="true"===n.moveCursor||!0===n.moveCursor;d=new odf.OdfUtils};this.isEdit=!0;this.group=void 0;this.execute=function(n){var p,f,q,e,r,a,c,l=n.getCursor(m);n.upgradeWhitespacesAtPosition(b);p=n.getTextNodeAtStep(b);if(!p)return!1;f=n.getParagraphElement(p.textNode);if(!f)return!1;q=d.isListItem(f.parentNode)?f.parentNode:f;0===p.offset?(c=p.textNode.previousSibling,a=null):(c=p.textNode,a=p.offset>=
p.textNode.length?null:p.textNode.splitText(p.offset));for(e=p.textNode;e!==q;){e=e.parentNode;r=e.cloneNode(!1);a&&r.appendChild(a);if(c)for(;c&&c.nextSibling;)r.appendChild(c.nextSibling);else for(;e.firstChild;)r.appendChild(e.firstChild);e.parentNode.insertBefore(r,e.nextSibling);c=e;a=r}d.isListItem(a)&&(a=a.childNodes.item(0));0===p.textNode.length&&p.textNode.parentNode.removeChild(p.textNode);n.emit(ops.OdtDocument.signalStepsInserted,{position:b,length:1});l&&k&&(n.moveCursor(m,b+1,0),n.emit(ops.Document.signalCursorMoved,
l));n.fixCursorPositions();n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f,memberId:m,timeStamp:g});n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,timeStamp:g});n.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:m,timestamp:g,position:b,moveCursor:k}}};
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
ops.OpUpdateMember=function(){function m(b){var d="//dc:creator[@editinfo:memberid='"+g+"']";b=xmldom.XPath.getODFElementsWithXPath(b.getRootNode(),d,function(b){return"editinfo"===b?"urn:webodf:names:editinfo":odf.Namespaces.lookupNamespaceURI(b)});for(d=0;d<b.length;d+=1)b[d].textContent=k.fullName}var g,b,k,d;this.init=function(n){g=n.memberid;b=parseInt(n.timestamp,10);k=n.setProperties;d=n.removedProperties};this.isEdit=!1;this.group=void 0;this.execute=function(b){var p=b.getMember(g);if(!p)return!1;
d&&p.removeProperties(d);k&&(p.setProperties(k),k.fullName&&m(b));b.emit(ops.Document.signalMemberUpdated,p);return!0};this.spec=function(){return{optype:"UpdateMember",memberid:g,timestamp:b,setProperties:k,removedProperties:d}}};
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
ops.OpUpdateMetadata=function(){var m,g,b,k;this.init=function(d){m=d.memberid;g=parseInt(d.timestamp,10);b=d.setProperties;k=d.removedProperties};this.isEdit=!0;this.group=void 0;this.execute=function(d){d=d.getOdfCanvas().odfContainer();var g=[];k&&(g=k.attributes.split(","));d.setMetadata(b,g);return!0};this.spec=function(){return{optype:"UpdateMetadata",memberid:m,timestamp:g,setProperties:b,removedProperties:k}}};
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
ops.OpUpdateParagraphStyle=function(){function m(b,d){var e,g,a=d?d.split(","):[];for(e=0;e<a.length;e+=1)g=a[e].split(":"),b.removeAttributeNS(odf.Namespaces.lookupNamespaceURI(g[0]),g[1])}var g,b,k,d,n,p=odf.Namespaces.stylens;this.init=function(f){g=f.memberid;b=f.timestamp;k=f.styleName;d=f.setProperties;n=f.removedProperties};this.isEdit=!0;this.group=void 0;this.execute=function(b){var g=b.getFormatting(),e,r,a;return(e=""!==k?b.getParagraphStyleElement(k):g.getDefaultStyleElement("paragraph"))?
(r=e.getElementsByTagNameNS(p,"paragraph-properties").item(0),a=e.getElementsByTagNameNS(p,"text-properties").item(0),d&&g.updateStyle(e,d),n&&(g=n["style:paragraph-properties"],r&&g&&(m(r,g.attributes),0===r.attributes.length&&e.removeChild(r)),g=n["style:text-properties"],a&&g&&(m(a,g.attributes),0===a.attributes.length&&e.removeChild(a)),m(e,n.attributes)),b.getOdfCanvas().refreshCSS(),b.emit(ops.OdtDocument.signalParagraphStyleModified,k),b.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=
function(){return{optype:"UpdateParagraphStyle",memberid:g,timestamp:b,styleName:k,setProperties:d,removedProperties:n}}};
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
ops.OperationFactory=function(){var m;this.register=function(g,b){m[g]=b};this.create=function(g){var b=null,k=m[g.optype];k&&(b=new k,b.init(g));return b};m={AddMember:ops.OpAddMember,UpdateMember:ops.OpUpdateMember,RemoveMember:ops.OpRemoveMember,AddCursor:ops.OpAddCursor,ApplyDirectStyling:ops.OpApplyDirectStyling,SetBlob:ops.OpSetBlob,RemoveBlob:ops.OpRemoveBlob,InsertImage:ops.OpInsertImage,InsertTable:ops.OpInsertTable,InsertText:ops.OpInsertText,RemoveText:ops.OpRemoveText,SplitParagraph:ops.OpSplitParagraph,
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(m){};ops.OperationRouter.prototype.setPlaybackFunction=function(m){};ops.OperationRouter.prototype.push=function(m){};ops.OperationRouter.prototype.close=function(m){};ops.OperationRouter.prototype.subscribe=function(m,g){};ops.OperationRouter.prototype.unsubscribe=function(m,g){};ops.OperationRouter.prototype.hasLocalUnsyncedOps=function(){};ops.OperationRouter.prototype.hasSessionHostConnection=function(){};
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
ops.TrivialOperationRouter=function(){var m=new core.EventNotifier([ops.OperationRouter.signalProcessingBatchStart,ops.OperationRouter.signalProcessingBatchEnd]),g,b,k=0;this.setOperationFactory=function(b){g=b};this.setPlaybackFunction=function(d){b=d};this.push=function(d){k+=1;m.emit(ops.OperationRouter.signalProcessingBatchStart,{});d.forEach(function(d){d=d.spec();d.timestamp=(new Date).getTime();d=g.create(d);d.group="g"+k;b(d)});m.emit(ops.OperationRouter.signalProcessingBatchEnd,{})};this.close=
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
ops.Session=function(m){function g(b){d.emit(ops.OdtDocument.signalProcessingBatchStart,b)}function b(b){d.emit(ops.OdtDocument.signalProcessingBatchEnd,b)}var k=new ops.OperationFactory,d=new ops.OdtDocument(m),n=null;this.setOperationFactory=function(b){k=b;n&&n.setOperationFactory(k)};this.setOperationRouter=function(m){n&&(n.unsubscribe(ops.OperationRouter.signalProcessingBatchStart,g),n.unsubscribe(ops.OperationRouter.signalProcessingBatchEnd,b));n=m;n.subscribe(ops.OperationRouter.signalProcessingBatchStart,
g);n.subscribe(ops.OperationRouter.signalProcessingBatchEnd,b);m.setPlaybackFunction(function(b){d.emit(ops.OdtDocument.signalOperationStart,b);return b.execute(d)?(d.emit(ops.OdtDocument.signalOperationEnd,b),!0):!1});m.setOperationFactory(k)};this.getOperationFactory=function(){return k};this.getOdtDocument=function(){return d};this.enqueue=function(b){n.push(b)};this.close=function(b){n.close(function(f){f?b(f):d.close(b)})};this.destroy=function(b){d.destroy(b)};this.setOperationRouter(new ops.TrivialOperationRouter)};
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
gui.AnnotationController=function(m,g){function b(){var b=p.getCursor(g),b=b&&b.getNode(),a=!1;if(b){a:{for(a=p.getRootNode();b&&b!==a;){if(b.namespaceURI===e&&"annotation"===b.localName){b=!0;break a}b=b.parentNode}b=!1}a=!b}a!==f&&(f=a,q.emit(gui.AnnotationController.annotatableChanged,f))}function k(d){d.getMemberId()===g&&b()}function d(d){d===g&&b()}function n(d){d.getMemberId()===g&&b()}var p=m.getOdtDocument(),f=!1,q=new core.EventNotifier([gui.AnnotationController.annotatableChanged]),e=odf.Namespaces.officens;
this.isAnnotatable=function(){return f};this.addAnnotation=function(){var b=new ops.OpAddAnnotation,a=p.getCursorSelection(g),c=a.length,a=a.position;f&&(a=0<=c?a:a+c,c=Math.abs(c),b.init({memberid:g,position:a,length:c,name:g+Date.now()}),m.enqueue([b]))};this.removeAnnotation=function(b){var a,c;a=p.convertDomPointToCursorStep(b,0)+1;c=p.convertDomPointToCursorStep(b,b.childNodes.length);b=new ops.OpRemoveAnnotation;b.init({memberid:g,position:a,length:c-a});c=new ops.OpMoveCursor;c.init({memberid:g,
position:0<a?a-1:a,length:0});m.enqueue([b,c])};this.subscribe=function(b,a){q.subscribe(b,a)};this.unsubscribe=function(b,a){q.unsubscribe(b,a)};this.destroy=function(b){p.unsubscribe(ops.Document.signalCursorAdded,k);p.unsubscribe(ops.Document.signalCursorRemoved,d);p.unsubscribe(ops.Document.signalCursorMoved,n);b()};p.subscribe(ops.Document.signalCursorAdded,k);p.subscribe(ops.Document.signalCursorRemoved,d);p.subscribe(ops.Document.signalCursorMoved,n);b()};
gui.AnnotationController.annotatableChanged="annotatable/changed";(function(){return gui.AnnotationController})();
// Input 75
gui.Avatar=function(m,g){var b=this,k,d,n;this.setColor=function(b){d.style.borderColor=b};this.setImageUrl=function(g){b.isVisible()?d.src=g:n=g};this.isVisible=function(){return"block"===k.style.display};this.show=function(){n&&(d.src=n,n=void 0);k.style.display="block"};this.hide=function(){k.style.display="none"};this.markAsFocussed=function(b){b?k.classList.add("active"):k.classList.remove("active")};this.destroy=function(b){m.removeChild(k);b()};(function(){var b=m.ownerDocument,f=b.documentElement.namespaceURI;
k=b.createElementNS(f,"div");d=b.createElementNS(f,"img");d.width=64;d.height=64;k.appendChild(d);k.style.width="64px";k.style.height="70px";k.style.position="absolute";k.style.top="-80px";k.style.left="-34px";k.style.display=g?"block":"none";k.className="handle";m.appendChild(k)})()};
// Input 76
gui.Caret=function(m,g,b){function k(){q.style.opacity="0"===q.style.opacity?"1":"0";v.trigger()}function d(a,b){var c=a.getBoundingClientRect(),d=0,e=0;c&&b&&(d=Math.max(c.top,b.top),e=Math.min(c.bottom,b.bottom));return e-d}function n(){Object.keys(u).forEach(function(a){t[a]=u[a]})}function p(){var h,f,l,g;if(!1===u.isShown||m.getSelectionType()!==ops.OdtCursor.RangeSelection||!b&&!m.getSelectedRange().collapsed)u.visibility="hidden",q.style.visibility="hidden",v.cancel();else{u.visibility="visible";
q.style.visibility="visible";if(!1===u.isFocused)q.style.opacity="1",v.cancel();else{if(w||t.visibility!==u.visibility)q.style.opacity="1",v.cancel();v.trigger()}if(x||z||t.visibility!==u.visibility){h=m.getSelectedRange().cloneRange();f=m.getNode();var k=null;f.previousSibling&&(l=f.previousSibling.nodeType===Node.TEXT_NODE?f.previousSibling.textContent.length:f.previousSibling.childNodes.length,h.setStart(f.previousSibling,0<l?l-1:0),h.setEnd(f.previousSibling,l),(l=h.getBoundingClientRect())&&
l.height&&(k=l));f.nextSibling&&(h.setStart(f.nextSibling,0),h.setEnd(f.nextSibling,0<(f.nextSibling.nodeType===Node.TEXT_NODE?f.nextSibling.textContent.length:f.nextSibling.childNodes.length)?1:0),(l=h.getBoundingClientRect())&&l.height&&(!k||d(f,l)>d(f,k))&&(k=l));f=k;k=m.getDocument().getCanvas();h=k.getZoomLevel();k=c.getBoundingClientRect(k.getSizer());f?(q.style.top="0",l=c.getBoundingClientRect(q),8>f.height&&(f={top:f.top-(8-f.height)/2,height:8}),q.style.height=c.adaptRangeDifferenceToZoomLevel(f.height,
h)+"px",q.style.top=c.adaptRangeDifferenceToZoomLevel(f.top-l.top,h)+"px"):(q.style.height="1em",q.style.top="5%");a&&(f=runtime.getWindow().getComputedStyle(q,null),l=c.getBoundingClientRect(q),a.style.bottom=c.adaptRangeDifferenceToZoomLevel(k.bottom-l.bottom,h)+"px",a.style.left=c.adaptRangeDifferenceToZoomLevel(l.right-k.left,h)+"px",f.font?a.style.font=f.font:(a.style.fontStyle=f.fontStyle,a.style.fontVariant=f.fontVariant,a.style.fontWeight=f.fontWeight,a.style.fontSize=f.fontSize,a.style.lineHeight=
f.lineHeight,a.style.fontFamily=f.fontFamily))}if(z){var k=m.getDocument().getCanvas().getElement().parentNode,p;l=k.offsetWidth-k.clientWidth+5;g=k.offsetHeight-k.clientHeight+5;p=q.getBoundingClientRect();h=p.left-l;f=p.top-g;l=p.right+l;g=p.bottom+g;p=k.getBoundingClientRect();f<p.top?k.scrollTop-=p.top-f:g>p.bottom&&(k.scrollTop+=g-p.bottom);h<p.left?k.scrollLeft-=p.left-h:l>p.right&&(k.scrollLeft+=l-p.right)}}t.isFocused!==u.isFocused&&e.markAsFocussed(u.isFocused);n();x=z=w=!1}function f(a){r.removeChild(q);
a()}var q,e,r,a,c=new core.DomUtils,l=new core.Async,h,v,w=!1,z=!1,x=!1,u={isFocused:!1,isShown:!0,visibility:"hidden"},t={isFocused:!u.isFocused,isShown:!u.isShown,visibility:"hidden"};this.handleUpdate=function(){x=!0;"hidden"!==u.visibility&&(u.visibility="hidden",q.style.visibility="hidden");h.trigger()};this.refreshCursorBlinking=function(){w=!0;h.trigger()};this.setFocus=function(){u.isFocused=!0;h.trigger()};this.removeFocus=function(){u.isFocused=!1;h.trigger()};this.show=function(){u.isShown=
!0;h.trigger()};this.hide=function(){u.isShown=!1;h.trigger()};this.setAvatarImageUrl=function(a){e.setImageUrl(a)};this.setColor=function(a){q.style.borderColor=a;e.setColor(a)};this.getCursor=function(){return m};this.getFocusElement=function(){return q};this.toggleHandleVisibility=function(){e.isVisible()?e.hide():e.show()};this.showHandle=function(){e.show()};this.hideHandle=function(){e.hide()};this.setOverlayElement=function(b){a=b;x=!0;h.trigger()};this.ensureVisible=function(){z=!0;h.trigger()};
this.destroy=function(a){l.destroyAll([h.destroy,v.destroy,e.destroy,f],a)};(function(){var a=m.getDocument().getDOMDocument();q=a.createElementNS(a.documentElement.namespaceURI,"span");q.className="caret";q.style.top="5%";r=m.getNode();r.appendChild(q);e=new gui.Avatar(r,g);h=new core.ScheduledTask(p,0);v=new core.ScheduledTask(k,500);h.triggerImmediate()})()};
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
odf.TextSerializer=function(){function m(k){var d="",n=g.filter?g.filter.acceptNode(k):NodeFilter.FILTER_ACCEPT,p=k.nodeType,f;if((n===NodeFilter.FILTER_ACCEPT||n===NodeFilter.FILTER_SKIP)&&b.isTextContentContainingNode(k))for(f=k.firstChild;f;)d+=m(f),f=f.nextSibling;n===NodeFilter.FILTER_ACCEPT&&(p===Node.ELEMENT_NODE&&b.isParagraph(k)?d+="\n":p===Node.TEXT_NODE&&k.textContent&&(d+=k.textContent));return d}var g=this,b=new odf.OdfUtils;this.filter=null;this.writeToString=function(b){if(!b)return"";
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
gui.MimeDataExporter=function(){var m,g;this.exportRangeToDataTransfer=function(b,g){var d;d=g.startContainer.ownerDocument.createElement("span");d.appendChild(g.cloneContents());d=m.writeToString(d);try{b.setData("text/plain",d)}catch(n){b.setData("Text",d)}};m=new odf.TextSerializer;g=new odf.OdfNodeFilter;m.filter=g};
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
gui.Clipboard=function(m){this.setDataFromRange=function(g,b){var k,d=g.clipboardData;k=runtime.getWindow();!d&&k&&(d=k.clipboardData);d?(k=!0,m.exportRangeToDataTransfer(d,b),g.preventDefault()):k=!1;return k}};
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
gui.StyleSummary=function(m){function g(b,g){var f=b+"|"+g,k;d.hasOwnProperty(f)||(k=[],m.forEach(function(d){d=(d=d[b])&&d[g];-1===k.indexOf(d)&&k.push(d)}),d[f]=k);return d[f]}function b(b,d,f){return function(){var k=g(b,d);return f.length>=k.length&&k.every(function(b){return-1!==f.indexOf(b)})}}function k(b,d){var f=g(b,d);return 1===f.length?f[0]:void 0}var d={};this.getPropertyValues=g;this.getCommonValue=k;this.isBold=b("style:text-properties","fo:font-weight",["bold"]);this.isItalic=b("style:text-properties",
"fo:font-style",["italic"]);this.hasUnderline=b("style:text-properties","style:text-underline-style",["solid"]);this.hasStrikeThrough=b("style:text-properties","style:text-line-through-style",["solid"]);this.fontSize=function(){var b=k("style:text-properties","fo:font-size");return b&&parseFloat(b)};this.fontName=function(){return k("style:text-properties","style:font-name")};this.isAlignedLeft=b("style:paragraph-properties","fo:text-align",["left","start"]);this.isAlignedCenter=b("style:paragraph-properties",
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
gui.DirectFormattingController=function(m,g,b,k){function d(a){var b;a.collapsed?(b=a.startContainer,b.hasChildNodes()&&a.startOffset<b.childNodes.length&&(b=b.childNodes.item(a.startOffset)),a=[b]):a=T.getTextNodes(a,!0);return a}function n(a,b){var c={};Object.keys(a).forEach(function(d){var e=a[d](),h=b[d]();e!==h&&(c[d]=h)});return c}function p(){var a,b,c;a=(a=(a=H.getCursor(g))&&a.getSelectedRange())?d(a):[];a=H.getFormatting().getAppliedStyles(a);a[0]&&G&&(a[0]=U.mergeObjects(a[0],G));J=a;
c=new gui.StyleSummary(J);a=n(Q.text,c.text);b=n(Q.paragraph,c.paragraph);Q=c;0<Object.keys(a).length&&X.emit(gui.DirectFormattingController.textStylingChanged,a);0<Object.keys(b).length&&X.emit(gui.DirectFormattingController.paragraphStylingChanged,b)}function f(a){("string"===typeof a?a:a.getMemberId())===g&&p()}function q(){p()}function e(a){var b=H.getCursor(g);a=a.paragraphElement;b&&H.getParagraphElement(b.getNode())===a&&p()}function r(a,b){b(!a());return!0}function a(a){var b=H.getCursorSelection(g),
c={"style:text-properties":a};0!==b.length?(a=new ops.OpApplyDirectStyling,a.init({memberid:g,position:b.position,length:b.length,setProperties:c}),m.enqueue([a])):(G=U.mergeObjects(G||{},c),p())}function c(b,c){var d={};d[b]=c;a(d)}function l(a){a=a.spec();G&&a.memberid===g&&"SplitParagraph"!==a.optype&&(G=null,p())}function h(a){c("fo:font-weight",a?"bold":"normal")}function v(a){c("fo:font-style",a?"italic":"normal")}function w(a){c("style:text-underline-style",a?"solid":"none")}function z(a){c("style:text-line-through-style",
a?"solid":"none")}function x(a){return a===ops.StepsTranslator.NEXT_STEP}function u(a){var c=H.getCursor(g).getSelectedRange(),c=T.getParagraphElements(c),d=H.getFormatting(),e=[],h={},f;c.forEach(function(c){var l=H.convertDomPointToCursorStep(c,0,x),k=c.getAttributeNS(odf.Namespaces.textns,"style-name"),m;c=k?h.hasOwnProperty(k)?h[k]:void 0:f;c||(c=b.generateStyleName(),k?(h[k]=c,m=d.createDerivedStyleObject(k,"paragraph",{})):(f=c,m={}),m=a(m),k=new ops.OpAddStyle,k.init({memberid:g,styleName:c.toString(),
styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:m}),e.push(k));k=new ops.OpSetParagraphStyle;k.init({memberid:g,styleName:c.toString(),position:l});e.push(k)});m.enqueue(e)}function t(a){u(function(b){return U.mergeObjects(b,a)})}function s(a){t({"style:paragraph-properties":{"fo:text-align":a}})}function y(a,b){var c=H.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],e;d&&(d=d["fo:margin-left"])&&(e=T.parseLength(d));return U.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":e&&
e.unit===c.unit?e.value+a*c.value+e.unit:a*c.value+c.unit}})}function F(a,b){var c=d(a),e=H.getFormatting().getAppliedStyles(c)[0],h=H.getFormatting().getAppliedStylesForElement(b);if(!e||"text"!==e["style:family"]||!e["style:text-properties"])return!1;if(!h||!h["style:text-properties"])return!0;e=e["style:text-properties"];h=h["style:text-properties"];return!Object.keys(e).every(function(a){return e[a]===h[a]})}function L(){}var O=this,H=m.getOdtDocument(),U=new core.Utils,T=new odf.OdfUtils,X=new core.EventNotifier([gui.DirectFormattingController.textStylingChanged,
gui.DirectFormattingController.paragraphStylingChanged]),D=odf.Namespaces.textns,ba=core.PositionFilter.FilterResult.FILTER_ACCEPT,G,J=[],Q=new gui.StyleSummary(J);this.formatTextSelection=a;this.createCursorStyleOp=function(a,b,c){var d=null;(c=c?J[0]:G)&&c["style:text-properties"]&&(d=new ops.OpApplyDirectStyling,d.init({memberid:g,position:a,length:b,setProperties:{"style:text-properties":c["style:text-properties"]}}),G=null,p());return d};this.setBold=h;this.setItalic=v;this.setHasUnderline=w;
this.setHasStrikethrough=z;this.setFontSize=function(a){c("fo:font-size",a+"pt")};this.setFontName=function(a){c("style:font-name",a)};this.getAppliedStyles=function(){return J};this.toggleBold=r.bind(O,function(){return Q.isBold()},h);this.toggleItalic=r.bind(O,function(){return Q.isItalic()},v);this.toggleUnderline=r.bind(O,function(){return Q.hasUnderline()},w);this.toggleStrikethrough=r.bind(O,function(){return Q.hasStrikeThrough()},z);this.isBold=function(){return Q.isBold()};this.isItalic=function(){return Q.isItalic()};
this.hasUnderline=function(){return Q.hasUnderline()};this.hasStrikeThrough=function(){return Q.hasStrikeThrough()};this.fontSize=function(){return Q.fontSize()};this.fontName=function(){return Q.fontName()};this.isAlignedLeft=function(){return Q.isAlignedLeft()};this.isAlignedCenter=function(){return Q.isAlignedCenter()};this.isAlignedRight=function(){return Q.isAlignedRight()};this.isAlignedJustified=function(){return Q.isAlignedJustified()};this.alignParagraphLeft=function(){s("left");return!0};
this.alignParagraphCenter=function(){s("center");return!0};this.alignParagraphRight=function(){s("right");return!0};this.alignParagraphJustified=function(){s("justify");return!0};this.indent=function(){u(y.bind(null,1));return!0};this.outdent=function(){u(y.bind(null,-1));return!0};this.createParagraphStyleOps=function(a){var c=H.getCursor(g),d=c.getSelectedRange(),e=[],h,f;c.hasForwardSelection()?(h=c.getAnchorNode(),f=c.getNode()):(h=c.getNode(),f=c.getAnchorNode());c=H.getParagraphElement(f);runtime.assert(Boolean(c),
"DirectFormattingController: Cursor outside paragraph");var l;a:{l=c;var k=gui.SelectionMover.createPositionIterator(l),m=new core.PositionFilterChain;m.addFilter(H.getPositionFilter());m.addFilter(H.createRootFilter(g));for(k.setUnfilteredPosition(d.endContainer,d.endOffset);k.nextPosition();)if(m.acceptPosition(k)===ba){l=H.getParagraphElement(k.getCurrentNode())!==l;break a}l=!0}if(!l)return e;f!==h&&(c=H.getParagraphElement(h));if(!G&&!F(d,c))return e;d=J[0];if(!d)return e;if(h=c.getAttributeNS(D,
"style-name"))d={"style:text-properties":d["style:text-properties"]},d=H.getFormatting().createDerivedStyleObject(h,"paragraph",d);c=b.generateStyleName();h=new ops.OpAddStyle;h.init({memberid:g,styleName:c,styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:d});e.push(h);h=new ops.OpSetParagraphStyle;h.init({memberid:g,styleName:c,position:a});e.push(h);return e};this.subscribe=function(a,b){X.subscribe(a,b)};this.unsubscribe=function(a,b){X.unsubscribe(a,b)};this.destroy=function(a){H.unsubscribe(ops.Document.signalCursorAdded,
f);H.unsubscribe(ops.Document.signalCursorRemoved,f);H.unsubscribe(ops.Document.signalCursorMoved,f);H.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,q);H.unsubscribe(ops.OdtDocument.signalParagraphChanged,e);H.unsubscribe(ops.OdtDocument.signalOperationEnd,l);a()};(function(){H.subscribe(ops.Document.signalCursorAdded,f);H.subscribe(ops.Document.signalCursorRemoved,f);H.subscribe(ops.Document.signalCursorMoved,f);H.subscribe(ops.OdtDocument.signalParagraphStyleModified,q);H.subscribe(ops.OdtDocument.signalParagraphChanged,
e);H.subscribe(ops.OdtDocument.signalOperationEnd,l);p();k||(O.alignParagraphCenter=L,O.alignParagraphJustified=L,O.alignParagraphLeft=L,O.alignParagraphRight=L,O.createParagraphStyleOps=function(){return[]},O.indent=L,O.outdent=L)})()};gui.DirectFormattingController.textStylingChanged="textStyling/changed";gui.DirectFormattingController.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectFormattingController})();
// Input 82
gui.HyperlinkClickHandler=function(m){function g(){m().removeAttributeNS("urn:webodf:names:helper","links")}function b(){m().setAttributeNS("urn:webodf:names:helper","links","inactive")}var k=gui.HyperlinkClickHandler.Modifier.None,d=gui.HyperlinkClickHandler.Modifier.Ctrl,n=gui.HyperlinkClickHandler.Modifier.Meta,p=new odf.OdfUtils,f=xmldom.XPath,q=k;this.handleClick=function(b){var g=b.target||b.srcElement,a,c;b.ctrlKey?a=d:b.metaKey&&(a=n);if(q===k||q===a){a:{for(;null!==g;){if(p.isHyperlink(g))break a;
if(p.isParagraph(g))break;g=g.parentNode}g=null}g&&(g=p.getHyperlinkTarget(g),""!==g&&("#"===g[0]?(g=g.substring(1),a=m(),c=f.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+g+"']",odf.Namespaces.lookupNamespaceURI),0===c.length&&(c=f.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+g+"']",odf.Namespaces.lookupNamespaceURI)),0<c.length&&c[0].scrollIntoView(!0)):/^\s*(javascript|data):/.test(g)?runtime.log("WARN:","potentially malicious URL ignored"):runtime.getWindow().open(g),
b.preventDefault?b.preventDefault():b.returnValue=!1))}};this.showPointerCursor=g;this.showTextCursor=b;this.setModifier=function(d){q=d;q!==k?b():g()}};gui.HyperlinkClickHandler.Modifier={None:0,Ctrl:1,Meta:2};
// Input 83
gui.HyperlinkController=function(m,g){var b=new odf.OdfUtils,k=m.getOdtDocument();this.addHyperlink=function(b,n){var p=k.getCursorSelection(g),f=new ops.OpApplyHyperlink,q=[];if(0===p.length||n)n=n||b,f=new ops.OpInsertText,f.init({memberid:g,position:p.position,text:n}),p.length=n.length,q.push(f);f=new ops.OpApplyHyperlink;f.init({memberid:g,position:p.position,length:p.length,hyperlink:b});q.push(f);m.enqueue(q)};this.removeHyperlinks=function(){var d=gui.SelectionMover.createPositionIterator(k.getRootNode()),
n=k.getCursor(g).getSelectedRange(),p=b.getHyperlinkElements(n),f=n.collapsed&&1===p.length,q=k.getDOMDocument().createRange(),e=[],r,a;0!==p.length&&(p.forEach(function(b){q.selectNodeContents(b);r=k.convertDomToCursorRange({anchorNode:q.startContainer,anchorOffset:q.startOffset,focusNode:q.endContainer,focusOffset:q.endOffset});a=new ops.OpRemoveHyperlink;a.init({memberid:g,position:r.position,length:r.length});e.push(a)}),f||(f=p[0],-1===n.comparePoint(f,0)&&(q.setStart(f,0),q.setEnd(n.startContainer,
n.startOffset),r=k.convertDomToCursorRange({anchorNode:q.startContainer,anchorOffset:q.startOffset,focusNode:q.endContainer,focusOffset:q.endOffset}),0<r.length&&(a=new ops.OpApplyHyperlink,a.init({memberid:g,position:r.position,length:r.length,hyperlink:b.getHyperlinkTarget(f)}),e.push(a))),p=p[p.length-1],d.moveToEndOfNode(p),d=d.unfilteredDomOffset(),1===n.comparePoint(p,d)&&(q.setStart(n.endContainer,n.endOffset),q.setEnd(p,d),r=k.convertDomToCursorRange({anchorNode:q.startContainer,anchorOffset:q.startOffset,
focusNode:q.endContainer,focusOffset:q.endOffset}),0<r.length&&(a=new ops.OpApplyHyperlink,a.init({memberid:g,position:r.position,length:r.length,hyperlink:b.getHyperlinkTarget(p)}),e.push(a)))),m.enqueue(e),q.detach())}};
// Input 84
gui.EventManager=function(m){function g(){var a=this,b=[];this.filters=[];this.handlers=[];this.handleEvent=function(c){-1===b.indexOf(c)&&(b.push(c),a.filters.every(function(a){return a(c)})&&a.handlers.forEach(function(a){a(c)}),runtime.setTimeout(function(){b.splice(b.indexOf(c),1)},0))}}function b(a,b,c){function d(b){c(b,e,function(b){b.type=a;h.emit("eventTriggered",b)})}var e={},h=new core.EventNotifier(["eventTriggered"]);this.subscribe=function(a){h.subscribe("eventTriggered",a)};this.unsubscribe=
function(a){h.unsubscribe("eventTriggered",a)};this.destroy=function(){b.forEach(function(a){y.unsubscribe(a,d)})};(function(){b.forEach(function(a){y.subscribe(a,d)})})()}function k(a){runtime.clearTimeout(a);delete F[a]}function d(a,b){var c=runtime.setTimeout(function(){a();k(c)},b);F[c]=!0;return c}function n(a,b,c){var e=a.touches.length,h=a.touches[0],f=b.timer;"touchmove"===a.type||"touchend"===a.type?f&&k(f):"touchstart"===a.type&&(1!==e?runtime.clearTimeout(f):f=d(function(){c({clientX:h.clientX,
clientY:h.clientY,pageX:h.pageX,pageY:h.pageY,target:a.target||a.srcElement||null,detail:1})},400));b.timer=f}function p(a,b,c){var d=a.touches[0],e=a.target||a.srcElement||null,h=b.target;1!==a.touches.length||"touchend"===a.type?h=null:"touchstart"===a.type&&"draggable"===e.getAttribute("class")?h=e:"touchmove"===a.type&&h&&(a.preventDefault(),a.stopPropagation(),c({clientX:d.clientX,clientY:d.clientY,pageX:d.pageX,pageY:d.pageY,target:h,detail:1}));b.target=h}function f(a,b,c){var d=a.target||
a.srcElement||null,e=b.dragging;"drag"===a.type?e=!0:"touchend"===a.type&&e&&(e=!1,a=a.changedTouches[0],c({clientX:a.clientX,clientY:a.clientY,pageX:a.pageX,pageY:a.pageY,target:d,detail:1}));b.dragging=e}function q(){s.classList.add("webodf-touchEnabled");y.unsubscribe("touchstart",q)}function e(a){var b=a.scrollX,c=a.scrollY;this.restore=function(){a.scrollX===b&&a.scrollY===c||a.scrollTo(b,c)}}function r(a){var b=a.scrollTop,c=a.scrollLeft;this.restore=function(){if(a.scrollTop!==b||a.scrollLeft!==
c)a.scrollTop=b,a.scrollLeft=c}}function a(a,b,c){var d,e=!1;x.hasOwnProperty(b)?x[b].subscribe(c):(d="on"+b,a.attachEvent&&(a.attachEvent(d,c),e=!0),!e&&a.addEventListener&&(a.addEventListener(b,c,!1),e=!0),e&&!w[b]||!a.hasOwnProperty(d)||(a[d]=c))}function c(b,c){var d=u[b]||null;!d&&c&&(d=u[b]=new g,z[b]&&a(v,b,d.handleEvent),a(t,b,d.handleEvent),a(s,b,d.handleEvent));return d}function l(){return m.getDOMDocument().activeElement===t}function h(a){for(var b=[];a;)(a.scrollWidth>a.clientWidth||a.scrollHeight>
a.clientHeight)&&b.push(new r(a)),a=a.parentNode;b.push(new e(v));return b}var v=runtime.getWindow(),w={beforecut:!0,beforepaste:!0,longpress:!0,drag:!0,dragstop:!0},z={mousedown:!0,mouseup:!0,focus:!0},x={},u={},t,s=m.getCanvas().getElement(),y=this,F={};this.addFilter=function(a,b){c(a,!0).filters.push(b)};this.removeFilter=function(a,b){var d=c(a,!0),e=d.filters.indexOf(b);-1!==e&&d.filters.splice(e,1)};this.subscribe=function(a,b){c(a,!0).handlers.push(b)};this.unsubscribe=function(a,b){var d=
c(a,!1),e=d&&d.handlers.indexOf(b);d&&-1!==e&&d.handlers.splice(e,1)};this.hasFocus=l;this.focus=function(){var a;l()||(a=h(t),t.focus(),a.forEach(function(a){a.restore()}))};this.getEventTrap=function(){return t};this.blur=function(){l()&&t.blur()};this.destroy=function(a){Object.keys(F).forEach(function(a){k(parseInt(a,10))});F.length=0;Object.keys(x).forEach(function(a){x[a].destroy()});x={};y.unsubscribe("touchstart",q);t.parentNode.removeChild(t);a()};(function(){var a=m.getOdfCanvas().getSizer(),
c=a.ownerDocument;runtime.assert(Boolean(v),"EventManager requires a window object to operate correctly");t=c.createElement("input");t.id="eventTrap";t.setAttribute("tabindex",-1);a.appendChild(t);x.longpress=new b("longpress",["touchstart","touchmove","touchend"],n);x.drag=new b("drag",["touchstart","touchmove","touchend"],p);x.dragstop=new b("dragstop",["drag","touchend"],f);y.subscribe("touchstart",q)})()};
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
gui.IOSSafariSupport=function(m){function g(){b.innerHeight!==b.outerHeight&&(k.style.display="none",runtime.requestAnimationFrame(function(){k.style.display="block"}))}var b=runtime.getWindow(),k=m.getEventTrap();this.destroy=function(b){m.unsubscribe("focus",g);k.removeAttribute("autocapitalize");k.style.WebkitTransform="";b()};m.subscribe("focus",g);k.setAttribute("autocapitalize","off");k.style.WebkitTransform="translateX(-10000px)"};
// Input 86
gui.ImageController=function(m,g,b){var k={"image/gif":".gif","image/jpeg":".jpg","image/png":".png"},d=odf.Namespaces.textns,n=m.getOdtDocument(),p=n.getFormatting(),f={};this.insertImage=function(q,e,r,a){var c;runtime.assert(0<r&&0<a,"Both width and height of the image should be greater than 0px.");c=n.getParagraphElement(n.getCursor(g).getNode()).getAttributeNS(d,"style-name");f.hasOwnProperty(c)||(f[c]=p.getContentSize(c,"paragraph"));c=f[c];r*=0.0264583333333334;a*=0.0264583333333334;var l=
1,h=1;r>c.width&&(l=c.width/r);a>c.height&&(h=c.height/a);l=Math.min(l,h);c=r*l;r=a*l;h=n.getOdfCanvas().odfContainer().rootElement.styles;a=q.toLowerCase();var l=k.hasOwnProperty(a)?k[a]:null,v;a=[];runtime.assert(null!==l,"Image type is not supported: "+q);l="Pictures/"+b.generateImageName()+l;v=new ops.OpSetBlob;v.init({memberid:g,filename:l,mimetype:q,content:e});a.push(v);p.getStyleElement("Graphics","graphic",[h])||(q=new ops.OpAddStyle,q.init({memberid:g,styleName:"Graphics",styleFamily:"graphic",
isAutomaticStyle:!1,setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph","svg:x":"0cm","svg:y":"0cm","style:wrap":"dynamic","style:number-wrapped-paragraphs":"no-limit","style:wrap-contour":"false","style:vertical-pos":"top","style:vertical-rel":"paragraph","style:horizontal-pos":"center","style:horizontal-rel":"paragraph"}}}),a.push(q));q=b.generateStyleName();e=new ops.OpAddStyle;e.init({memberid:g,styleName:q,styleFamily:"graphic",isAutomaticStyle:!0,setProperties:{"style:parent-style-name":"Graphics",
"style:graphic-properties":{"style:vertical-pos":"top","style:vertical-rel":"baseline","style:horizontal-pos":"center","style:horizontal-rel":"paragraph","fo:background-color":"transparent","style:background-transparency":"100%","style:shadow":"none","style:mirror":"none","fo:clip":"rect(0cm, 0cm, 0cm, 0cm)","draw:luminance":"0%","draw:contrast":"0%","draw:red":"0%","draw:green":"0%","draw:blue":"0%","draw:gamma":"100%","draw:color-inversion":"false","draw:image-opacity":"100%","draw:color-mode":"standard"}}});
a.push(e);v=new ops.OpInsertImage;v.init({memberid:g,position:n.getCursorPosition(g),filename:l,frameWidth:c+"cm",frameHeight:r+"cm",frameStyleName:q,frameName:b.generateFrameName()});a.push(v);m.enqueue(a)}};
// Input 87
gui.ImageSelector=function(m){function g(){var b=m.getSizer(),f=d.createElement("div");f.id="imageSelector";f.style.borderWidth="1px";b.appendChild(f);k.forEach(function(b){var e=d.createElement("div");e.className=b;f.appendChild(e)});return f}var b=odf.Namespaces.svgns,k="topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(" "),d=m.getElement().ownerDocument,n=!1;this.select=function(k){var f,q,e=d.getElementById("imageSelector");e||(e=g());n=!0;f=e.parentNode;
q=k.getBoundingClientRect();var r=f.getBoundingClientRect(),a=m.getZoomLevel();f=(q.left-r.left)/a-1;q=(q.top-r.top)/a-1;e.style.display="block";e.style.left=f+"px";e.style.top=q+"px";e.style.width=k.getAttributeNS(b,"width");e.style.height=k.getAttributeNS(b,"height")};this.clearSelection=function(){var b;n&&(b=d.getElementById("imageSelector"))&&(b.style.display="none");n=!1};this.isSelectorElement=function(b){var f=d.getElementById("imageSelector");return f?b===f||b.parentNode===f:!1}};
// Input 88
(function(){function m(g){function b(b){p=b.which&&String.fromCharCode(b.which)===m;m=void 0;return!1===p}function k(){p=!1}function d(b){m=b.data;p=!1}var m,p=!1;this.destroy=function(f){g.unsubscribe("textInput",k);g.unsubscribe("compositionend",d);g.removeFilter("keypress",b);f()};g.subscribe("textInput",k);g.subscribe("compositionend",d);g.addFilter("keypress",b)}gui.InputMethodEditor=function(g,b){function k(a){l&&(a?l.getNode().setAttributeNS(c,"composing","true"):(l.getNode().removeAttributeNS(c,
"composing"),w.textContent=""))}function d(){t&&(t=!1,k(!1),y.emit(gui.InputMethodEditor.signalCompositionEnd,{data:s}),s="")}function n(){d();l&&l.getSelectedRange().collapsed?h.value="":h.value=x;h.setSelectionRange(0,h.value.length)}function p(){F=void 0;u.cancel();k(!0);t||y.emit(gui.InputMethodEditor.signalCompositionStart,{data:""})}function f(a){a=F=a.data;t=!0;s+=a;u.trigger()}function q(a){a.data!==F&&(a=a.data,t=!0,s+=a,u.trigger());F=void 0}function e(){w.textContent=h.value}function r(){b.blur();
h.setAttribute("disabled",!0)}function a(){var a=b.hasFocus();a&&b.blur();H?h.removeAttribute("disabled"):h.setAttribute("disabled",!0);a&&b.focus()}var c="urn:webodf:names:cursor",l=null,h=b.getEventTrap(),v=h.ownerDocument,w,z=new core.Async,x="b",u,t=!1,s="",y=new core.EventNotifier([gui.InputMethodEditor.signalCompositionStart,gui.InputMethodEditor.signalCompositionEnd]),F,L=[],O,H=!1;this.subscribe=y.subscribe;this.unsubscribe=y.unsubscribe;this.registerCursor=function(a){a.getMemberId()===g&&
(l=a,l.getNode().appendChild(w),b.subscribe("input",e),b.subscribe("compositionupdate",e))};this.removeCursor=function(a){l&&a===g&&(l.getNode().removeChild(w),b.unsubscribe("input",e),b.unsubscribe("compositionupdate",e),l=null)};this.setEditing=function(b){H=b;a()};this.destroy=function(c){b.unsubscribe("compositionstart",p);b.unsubscribe("compositionend",f);b.unsubscribe("textInput",q);b.unsubscribe("keypress",d);b.unsubscribe("mousedown",r);b.unsubscribe("mouseup",a);b.unsubscribe("focus",n);
z.destroyAll(O,c)};(function(){b.subscribe("compositionstart",p);b.subscribe("compositionend",f);b.subscribe("textInput",q);b.subscribe("keypress",d);b.subscribe("mousedown",r);b.subscribe("mouseup",a);b.subscribe("focus",n);L.push(new m(b));O=L.map(function(a){return a.destroy});w=v.createElement("span");w.setAttribute("id","composer");u=new core.ScheduledTask(n,1);O.push(u.destroy)})()};gui.InputMethodEditor.signalCompositionStart="input/compositionstart";gui.InputMethodEditor.signalCompositionEnd=
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
gui.KeyboardHandler=function(){function m(b,k){k||(k=g.None);return b+":"+k}var g=gui.KeyboardHandler.Modifier,b=null,k={};this.setDefault=function(d){b=d};this.bind=function(b,g,p,f){b=m(b,g);runtime.assert(f||!1===k.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);k[b]=p};this.unbind=function(b,g){var p=m(b,g);delete k[p]};this.reset=function(){b=null;k={}};this.handleEvent=function(d){var n=d.keyCode,p=g.None;d.metaKey&&(p|=g.Meta);d.ctrlKey&&(p|=g.Ctrl);d.altKey&&
(p|=g.Alt);d.shiftKey&&(p|=g.Shift);n=m(n,p);n=k[n];p=!1;n?p=n():null!==b&&(p=b(d));p&&(d.preventDefault?d.preventDefault():d.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,CtrlAlt:6,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};
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
gui.PlainTextPasteboard=function(m,g){function b(b,d){b.init(d);return b}this.createPasteOps=function(k){var d=m.getCursorPosition(g),n=d,p=[];k.replace(/\r/g,"").split("\n").forEach(function(d){p.push(b(new ops.OpSplitParagraph,{memberid:g,position:n,moveCursor:!0}));n+=1;p.push(b(new ops.OpInsertText,{memberid:g,position:n,text:d,moveCursor:!0}));n+=d.length});p.push(b(new ops.OpRemoveText,{memberid:g,position:d,length:1}));return p}};
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
odf.WordBoundaryFilter=function(m,g){function b(a,b,c){for(var d=null,e=m.getRootNode(),f;a!==e&&null!==a&&null===d;)f=0>b?a.previousSibling:a.nextSibling,c(f)===NodeFilter.FILTER_ACCEPT&&(d=f),a=a.parentNode;return d}function k(a,b){var c;return null===a?l.NO_NEIGHBOUR:p.isCharacterElement(a)?l.SPACE_CHAR:a.nodeType===d||p.isTextSpan(a)||p.isHyperlink(a)?(c=a.textContent.charAt(b()),q.test(c)?l.SPACE_CHAR:f.test(c)?l.PUNCTUATION_CHAR:l.WORD_CHAR):l.OTHER}var d=Node.TEXT_NODE,n=Node.ELEMENT_NODE,
p=new odf.OdfUtils,f=/[!-#%-*,-\/:-;?-@\[-\]_{}\u00a1\u00ab\u00b7\u00bb\u00bf;\u00b7\u055a-\u055f\u0589-\u058a\u05be\u05c0\u05c3\u05c6\u05f3-\u05f4\u0609-\u060a\u060c-\u060d\u061b\u061e-\u061f\u066a-\u066d\u06d4\u0700-\u070d\u07f7-\u07f9\u0964-\u0965\u0970\u0df4\u0e4f\u0e5a-\u0e5b\u0f04-\u0f12\u0f3a-\u0f3d\u0f85\u0fd0-\u0fd4\u104a-\u104f\u10fb\u1361-\u1368\u166d-\u166e\u169b-\u169c\u16eb-\u16ed\u1735-\u1736\u17d4-\u17d6\u17d8-\u17da\u1800-\u180a\u1944-\u1945\u19de-\u19df\u1a1e-\u1a1f\u1b5a-\u1b60\u1c3b-\u1c3f\u1c7e-\u1c7f\u2000-\u206e\u207d-\u207e\u208d-\u208e\u3008-\u3009\u2768-\u2775\u27c5-\u27c6\u27e6-\u27ef\u2983-\u2998\u29d8-\u29db\u29fc-\u29fd\u2cf9-\u2cfc\u2cfe-\u2cff\u2e00-\u2e7e\u3000-\u303f\u30a0\u30fb\ua60d-\ua60f\ua673\ua67e\ua874-\ua877\ua8ce-\ua8cf\ua92e-\ua92f\ua95f\uaa5c-\uaa5f\ufd3e-\ufd3f\ufe10-\ufe19\ufe30-\ufe52\ufe54-\ufe61\ufe63\ufe68\ufe6a-\ufe6b\uff01-\uff03\uff05-\uff0a\uff0c-\uff0f\uff1a-\uff1b\uff1f-\uff20\uff3b-\uff3d\uff3f\uff5b\uff5d\uff5f-\uff65]|\ud800[\udd00-\udd01\udf9f\udfd0]|\ud802[\udd1f\udd3f\ude50-\ude58]|\ud809[\udc00-\udc7e]/,
q=/\s/,e=core.PositionFilter.FilterResult.FILTER_ACCEPT,r=core.PositionFilter.FilterResult.FILTER_REJECT,a=odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,c=odf.WordBoundaryFilter.IncludeWhitespace.LEADING,l={NO_NEIGHBOUR:0,SPACE_CHAR:1,PUNCTUATION_CHAR:2,WORD_CHAR:3,OTHER:4};this.acceptPosition=function(d){var f=d.container(),m=d.leftNode(),p=d.rightNode(),q=d.unfilteredDomOffset,u=function(){return d.unfilteredDomOffset()-1};f.nodeType===n&&(null===p&&(p=b(f,1,d.getNodeFilter())),null===m&&(m=
b(f,-1,d.getNodeFilter())));f!==p&&(q=function(){return 0});f!==m&&null!==m&&(u=function(){return m.textContent.length-1});f=k(m,u);p=k(p,q);return f===l.WORD_CHAR&&p===l.WORD_CHAR||f===l.PUNCTUATION_CHAR&&p===l.PUNCTUATION_CHAR||g===a&&f!==l.NO_NEIGHBOUR&&p===l.SPACE_CHAR||g===c&&f===l.SPACE_CHAR&&p!==l.NO_NEIGHBOUR?r:e}};odf.WordBoundaryFilter.IncludeWhitespace={None:0,TRAILING:1,LEADING:2};(function(){return odf.WordBoundaryFilter})();
// Input 92
gui.SelectionController=function(m,g){function b(){var a=x.getCursor(g).getNode();return x.createStepIterator(a,0,[s,F],x.getRootElement(a))}function k(a,b,c){c=new odf.WordBoundaryFilter(x,c);return x.createStepIterator(a,b,[s,F,c],x.getRootElement(a))}function d(a){return function(b){var c=a(b);return function(b,d){return a(d)===c}}}function n(a,b){return b?{anchorNode:a.startContainer,anchorOffset:a.startOffset,focusNode:a.endContainer,focusOffset:a.endOffset}:{anchorNode:a.endContainer,anchorOffset:a.endOffset,
focusNode:a.startContainer,focusOffset:a.startOffset}}function p(a,b,c){var d=new ops.OpMoveCursor;d.init({memberid:g,position:a,length:b||0,selectionType:c});return d}function f(a){var b;b=k(a.startContainer,a.startOffset,L);b.roundToPreviousStep()&&a.setStart(b.container(),b.offset());b=k(a.endContainer,a.endOffset,O);b.roundToNextStep()&&a.setEnd(b.container(),b.offset())}function q(a){var b=t.getParagraphElements(a),c=b[0],b=b[b.length-1];c&&a.setStart(c,0);b&&(t.isParagraph(a.endContainer)&&
0===a.endOffset?a.setEndBefore(b):a.setEnd(b,b.childNodes.length))}function e(a){var b=x.getCursorSelection(g),c=x.getCursor(g).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,y,s):-c.convertBackwardStepsBetweenFilters(-a,y,s),a=b.length+a,m.enqueue([p(b.position,a)]))}function r(a){var c=b(),d=x.getCursor(g).getAnchorNode();a(c)&&(a=x.convertDomToCursorRange({anchorNode:d,anchorOffset:0,focusNode:c.container(),focusOffset:c.offset()}),m.enqueue([p(a.position,a.length)]))}function a(a){var b=
x.getCursorPosition(g),c=x.getCursor(g).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,y,s):-c.convertBackwardStepsBetweenFilters(-a,y,s),m.enqueue([p(b+a,0)]))}function c(a){var c=b();a(c)&&(a=x.convertDomPointToCursorStep(c.container(),c.offset()),m.enqueue([p(a,0)]))}function l(b,c){var d=x.getParagraphElement(x.getCursor(g).getNode());runtime.assert(Boolean(d),"SelectionController: Cursor outside paragraph");d=x.getCursor(g).getStepCounter().countLinesSteps(b,y);c?e(d):a(d)}
function h(b,c){var d=x.getCursor(g).getStepCounter().countStepsToLineBoundary(b,y);c?e(d):a(d)}function v(a,b){var c=x.getCursor(g),c=n(c.getSelectedRange(),c.hasForwardSelection()),d=k(c.focusNode,c.focusOffset,L);if(0<=a?d.nextStep():d.previousStep())c.focusNode=d.container(),c.focusOffset=d.offset(),b||(c.anchorNode=c.focusNode,c.anchorOffset=c.focusOffset),c=x.convertDomToCursorRange(c),m.enqueue([p(c.position,c.length)])}function w(a,b){var c=x.getCursor(g),e=b(c.getNode()),c=n(c.getSelectedRange(),
c.hasForwardSelection());runtime.assert(Boolean(e),"SelectionController: Cursor outside root");0>a?(c.focusNode=e,c.focusOffset=0):(c.focusNode=e,c.focusOffset=e.childNodes.length);e=x.convertDomToCursorRange(c,d(b));m.enqueue([p(e.position,e.length)])}function z(a){var b=x.getCursor(g),b=x.getRootElement(b.getNode());runtime.assert(Boolean(b),"SelectionController: Cursor outside root");a=0>a?x.convertDomPointToCursorStep(b,0,function(a){return a===ops.StepsTranslator.NEXT_STEP}):x.convertDomPointToCursorStep(b,
b.childNodes.length);m.enqueue([p(a,0)]);return!0}var x=m.getOdtDocument(),u=new core.DomUtils,t=new odf.OdfUtils,s=x.getPositionFilter(),y=new core.PositionFilterChain,F=x.createRootFilter(g),L=odf.WordBoundaryFilter.IncludeWhitespace.TRAILING,O=odf.WordBoundaryFilter.IncludeWhitespace.LEADING;this.selectionToRange=function(a){var b=0<=u.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset),c=a.focusNode.ownerDocument.createRange();b?(c.setStart(a.anchorNode,a.anchorOffset),c.setEnd(a.focusNode,
a.focusOffset)):(c.setStart(a.focusNode,a.focusOffset),c.setEnd(a.anchorNode,a.anchorOffset));return{range:c,hasForwardSelection:b}};this.rangeToSelection=n;this.selectImage=function(a){var b=x.getRootElement(a),c=x.createRootFilter(b),b=x.createStepIterator(a,0,[c,x.getPositionFilter()],b),d;b.roundToPreviousStep()||runtime.assert(!1,"No walkable position before frame");c=b.container();d=b.offset();b.setPosition(a,a.childNodes.length);b.roundToNextStep()||runtime.assert(!1,"No walkable position after frame");
a=x.convertDomToCursorRange({anchorNode:c,anchorOffset:d,focusNode:b.container(),focusOffset:b.offset()});a=p(a.position,a.length,ops.OdtCursor.RegionSelection);m.enqueue([a])};this.expandToWordBoundaries=f;this.expandToParagraphBoundaries=q;this.selectRange=function(a,b,c){var e=x.getOdfCanvas().getElement(),h;h=u.containsNode(e,a.startContainer);e=u.containsNode(e,a.endContainer);if(h||e)if(h&&e&&(2===c?f(a):3<=c&&q(a)),a=n(a,b),b=x.convertDomToCursorRange(a,d(t.getParagraphElement)),a=x.getCursorSelection(g),
b.position!==a.position||b.length!==a.length)a=p(b.position,b.length,ops.OdtCursor.RangeSelection),m.enqueue([a])};this.moveCursorToLeft=function(){c(function(a){return a.previousStep()});return!0};this.moveCursorToRight=function(){c(function(a){return a.nextStep()});return!0};this.extendSelectionToLeft=function(){r(function(a){return a.previousStep()});return!0};this.extendSelectionToRight=function(){r(function(a){return a.nextStep()});return!0};this.moveCursorUp=function(){l(-1,!1);return!0};this.moveCursorDown=
function(){l(1,!1);return!0};this.extendSelectionUp=function(){l(-1,!0);return!0};this.extendSelectionDown=function(){l(1,!0);return!0};this.moveCursorBeforeWord=function(){v(-1,!1);return!0};this.moveCursorPastWord=function(){v(1,!1);return!0};this.extendSelectionBeforeWord=function(){v(-1,!0);return!0};this.extendSelectionPastWord=function(){v(1,!0);return!0};this.moveCursorToLineStart=function(){h(-1,!1);return!0};this.moveCursorToLineEnd=function(){h(1,!1);return!0};this.extendSelectionToLineStart=
function(){h(-1,!0);return!0};this.extendSelectionToLineEnd=function(){h(1,!0);return!0};this.extendSelectionToParagraphStart=function(){w(-1,x.getParagraphElement);return!0};this.extendSelectionToParagraphEnd=function(){w(1,x.getParagraphElement);return!0};this.moveCursorToDocumentStart=function(){z(-1);return!0};this.moveCursorToDocumentEnd=function(){z(1);return!0};this.extendSelectionToDocumentStart=function(){w(-1,x.getRootElement);return!0};this.extendSelectionToDocumentEnd=function(){w(1,x.getRootElement);
return!0};this.extendSelectionToEntireDocument=function(){var a=x.getCursor(g),a=x.getRootElement(a.getNode());runtime.assert(Boolean(a),"SelectionController: Cursor outside root");a=x.convertDomToCursorRange({anchorNode:a,anchorOffset:0,focusNode:a,focusOffset:a.childNodes.length},d(x.getRootElement));m.enqueue([p(a.position,a.length)]);return!0};y.addFilter(s);y.addFilter(x.createRootFilter(g))};
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
gui.TextController=function(m,g,b,k){function d(b){var d=new ops.OpRemoveText;d.init({memberid:g,position:b.position,length:b.length});return d}function n(b){0>b.length&&(b.position+=b.length,b.length=-b.length);return b}function p(b,d){var a=new core.PositionFilterChain,c=gui.SelectionMover.createPositionIterator(f.getRootElement(b)),l=d?c.nextPosition:c.previousPosition;a.addFilter(f.getPositionFilter());a.addFilter(f.createRootFilter(g));for(c.setUnfilteredPosition(b,0);l();)if(a.acceptPosition(c)===
q)return!0;return!1}var f=m.getOdtDocument(),q=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.enqueueParagraphSplittingOps=function(){var b=n(f.getCursorSelection(g)),p,a=[];0<b.length&&(p=d(b),a.push(p));p=new ops.OpSplitParagraph;p.init({memberid:g,position:b.position,moveCursor:!0});a.push(p);k&&(b=k(b.position+1),a=a.concat(b));m.enqueue(a);return!0};this.removeTextByBackspaceKey=function(){var b=f.getCursor(g),k=n(f.getCursorSelection(g)),a=null;0===k.length?p(b.getNode(),!1)&&(a=new ops.OpRemoveText,
a.init({memberid:g,position:k.position-1,length:1}),m.enqueue([a])):(a=d(k),m.enqueue([a]));return null!==a};this.removeTextByDeleteKey=function(){var b=f.getCursor(g),k=n(f.getCursorSelection(g)),a=null;0===k.length?p(b.getNode(),!0)&&(a=new ops.OpRemoveText,a.init({memberid:g,position:k.position,length:1}),m.enqueue([a])):(a=d(k),m.enqueue([a]));return null!==a};this.removeCurrentSelection=function(){var b=n(f.getCursorSelection(g));0!==b.length&&(b=d(b),m.enqueue([b]));return!0};this.insertText=
function(e){var k=n(f.getCursorSelection(g)),a,c=[],l=!1;0<k.length&&(a=d(k),c.push(a),l=!0);a=new ops.OpInsertText;a.init({memberid:g,position:k.position,text:e,moveCursor:!0});c.push(a);b&&(e=b(k.position,e.length,l))&&c.push(e);m.enqueue(c)}};(function(){return gui.TextController})();
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(m,g){};gui.UndoManager.prototype.unsubscribe=function(m,g){};gui.UndoManager.prototype.setDocument=function(m){};gui.UndoManager.prototype.setInitialState=function(){};gui.UndoManager.prototype.initialize=function(){};gui.UndoManager.prototype.purgeInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(m){};gui.UndoManager.prototype.hasUndoStates=function(){};
gui.UndoManager.prototype.hasRedoStates=function(){};gui.UndoManager.prototype.moveForward=function(m){};gui.UndoManager.prototype.moveBackward=function(m){};gui.UndoManager.prototype.onOperationExecuted=function(m){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
// Input 95
(function(){var m=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(g,b,k,d){function n(a){return a.target||a.srcElement||null}function p(a,b){var c=J.getDOMDocument(),d=null;c.caretRangeFromPoint?(c=c.caretRangeFromPoint(a,b),d={container:c.startContainer,offset:c.startOffset}):c.caretPositionFromPoint&&(c=c.caretPositionFromPoint(a,b))&&c.offsetNode&&(d={container:c.offsetNode,offset:c.offset});return d}function f(a){var c=J.getCursor(b).getSelectedRange();c.collapsed?
a.preventDefault():I.setDataFromRange(a,c)?aa.removeCurrentSelection():runtime.log("Cut operation failed")}function q(){return!1!==J.getCursor(b).getSelectedRange().collapsed}function e(a){var c=J.getCursor(b).getSelectedRange();c.collapsed?a.preventDefault():I.setDataFromRange(a,c)||runtime.log("Copy operation failed")}function r(a){var b;G.clipboardData&&G.clipboardData.getData?b=G.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));
b&&(aa.removeCurrentSelection(),g.enqueue(na.createPasteOps(b)));a.preventDefault?a.preventDefault():a.returnValue=!1}function a(){return!1}function c(a){if(ca)ca.onOperationExecuted(a)}function l(a){J.emit(ops.OdtDocument.signalUndoStackChanged,a)}function h(){var a=A.getEventTrap(),b,c;return ca?(c=A.hasFocus(),ca.moveBackward(1),b=J.getOdfCanvas().getSizer(),ea.containsNode(b,a)||(b.appendChild(a),c&&A.focus()),!0):!1}function v(){var a;return ca?(a=A.hasFocus(),ca.moveForward(1),a&&A.focus(),
!0):!1}function w(a){var c=J.getCursor(b).getSelectedRange(),d=n(a).getAttribute("end");c&&d&&(a=p(a.clientX,a.clientY))&&(da.setUnfilteredPosition(a.container,a.offset),fa.acceptPosition(da)===m&&(c=c.cloneRange(),"left"===d?c.setStart(da.container(),da.unfilteredDomOffset()):c.setEnd(da.container(),da.unfilteredDomOffset()),k.setSelectedRange(c,"right"===d),J.emit(ops.Document.signalCursorMoved,k)))}function z(){K.selectRange(k.getSelectedRange(),k.hasForwardSelection(),1)}function x(){var a=G.getSelection(),
b=0<a.rangeCount&&K.selectionToRange(a);$&&b&&(S=!0,ga.clearSelection(),da.setUnfilteredPosition(a.focusNode,a.focusOffset),fa.acceptPosition(da)===m&&(2===ka?K.expandToWordBoundaries(b.range):3<=ka&&K.expandToParagraphBoundaries(b.range),k.setSelectedRange(b.range,b.hasForwardSelection),J.emit(ops.Document.signalCursorMoved,k)))}function u(a){var c=n(a),d=J.getCursor(b);if($=null!==c&&ea.containsNode(J.getOdfCanvas().getElement(),c))S=!1,fa=J.createRootFilter(c),ka=a.detail,d&&a.shiftKey?G.getSelection().collapse(d.getAnchorNode(),
0):(a=G.getSelection(),c=d.getSelectedRange(),a.extend?d.hasForwardSelection()?(a.collapse(c.startContainer,c.startOffset),a.extend(c.endContainer,c.endOffset)):(a.collapse(c.endContainer,c.endOffset),a.extend(c.startContainer,c.startOffset)):(a.removeAllRanges(),a.addRange(c.cloneRange()))),1<ka&&x()}function t(a){var b=J.getRootElement(a),c=J.createRootFilter(b),b=J.createStepIterator(a,0,[c,J.getPositionFilter()],b);b.setPosition(a,a.childNodes.length);return b.roundToNextStep()?{container:b.container(),
offset:b.offset()}:null}function s(a){var b;b=(b=G.getSelection())?{anchorNode:b.anchorNode,anchorOffset:b.anchorOffset,focusNode:b.focusNode,focusOffset:b.focusOffset}:null;var c,d;b.anchorNode||b.focusNode||!(c=p(a.clientX,a.clientY))||(b.anchorNode=c.container,b.anchorOffset=c.offset,b.focusNode=b.anchorNode,b.focusOffset=b.anchorOffset);if(P.isImage(b.focusNode)&&0===b.focusOffset&&P.isCharacterFrame(b.focusNode.parentNode)){if(d=b.focusNode.parentNode,c=d.getBoundingClientRect(),a.clientX>c.right&&
(c=t(d)))b.anchorNode=b.focusNode=c.container,b.anchorOffset=b.focusOffset=c.offset}else P.isImage(b.focusNode.firstChild)&&1===b.focusOffset&&P.isCharacterFrame(b.focusNode)&&(c=t(b.focusNode))&&(b.anchorNode=b.focusNode=c.container,b.anchorOffset=b.focusOffset=c.offset);b.anchorNode&&b.focusNode&&(b=K.selectionToRange(b),K.selectRange(b.range,b.hasForwardSelection,a.detail));A.focus()}function y(a){var b;if(b=p(a.clientX,a.clientY))a=b.container,b=b.offset,a={anchorNode:a,anchorOffset:b,focusNode:a,
focusOffset:b},a=K.selectionToRange(a),K.selectRange(a.range,a.hasForwardSelection,2),A.focus()}function F(a){var b=n(a),c,d;la.processRequests();P.isImage(b)&&P.isCharacterFrame(b.parentNode)&&G.getSelection().isCollapsed?(K.selectImage(b.parentNode),A.focus()):ga.isSelectorElement(b)?A.focus():$&&(S?(b=k.getSelectedRange(),c=b.collapsed,P.isImage(b.endContainer)&&0===b.endOffset&&P.isCharacterFrame(b.endContainer.parentNode)&&(d=b.endContainer.parentNode,d=t(d))&&(b.setEnd(d.container,d.offset),
c&&b.collapse(!1)),K.selectRange(b,k.hasForwardSelection(),a.detail),A.focus()):qa?s(a):ma=runtime.setTimeout(function(){s(a)},0));ka=0;S=$=!1}function L(a){var c=J.getCursor(b).getSelectedRange();c.collapsed||N.exportRangeToDataTransfer(a.dataTransfer,c)}function O(){$&&A.focus();ka=0;S=$=!1}function H(a){F(a)}function U(a){var b=n(a),c=null;"annotationRemoveButton"===b.className?(c=ea.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0],Y.removeAnnotation(c),A.focus()):"draggable"!==
b.getAttribute("class")&&F(a)}function T(a){(a=a.data)&&aa.insertText(a)}function X(a){return function(){a();return!0}}function D(a){return function(c){return J.getCursor(b).getSelectionType()===ops.OdtCursor.RangeSelection?a(c):!0}}function ba(a){A.unsubscribe("keydown",B.handleEvent);A.unsubscribe("keypress",V.handleEvent);A.unsubscribe("keyup",M.handleEvent);A.unsubscribe("copy",e);A.unsubscribe("mousedown",u);A.unsubscribe("mousemove",la.trigger);A.unsubscribe("mouseup",U);A.unsubscribe("contextmenu",
H);A.unsubscribe("dragstart",L);A.unsubscribe("dragend",O);A.unsubscribe("click",Z.handleClick);A.unsubscribe("longpress",y);A.unsubscribe("drag",w);A.unsubscribe("dragstop",z);J.unsubscribe(ops.OdtDocument.signalOperationEnd,ja.trigger);J.unsubscribe(ops.Document.signalCursorAdded,ha.registerCursor);J.unsubscribe(ops.Document.signalCursorRemoved,ha.removeCursor);J.unsubscribe(ops.OdtDocument.signalOperationEnd,c);a()}var G=runtime.getWindow(),J=g.getOdtDocument(),Q=new core.Async,ea=new core.DomUtils,
P=new odf.OdfUtils,N=new gui.MimeDataExporter,I=new gui.Clipboard(N),B=new gui.KeyboardHandler,V=new gui.KeyboardHandler,M=new gui.KeyboardHandler,$=!1,W=new odf.ObjectNameGenerator(J.getOdfCanvas().odfContainer(),b),S=!1,fa=null,ma,ca=null,A=new gui.EventManager(J),Y=new gui.AnnotationController(g,b),R=new gui.DirectFormattingController(g,b,W,d.directParagraphStylingEnabled),aa=new gui.TextController(g,b,R.createCursorStyleOp,R.createParagraphStyleOps),ia=new gui.ImageController(g,b,W),ga=new gui.ImageSelector(J.getOdfCanvas()),
da=gui.SelectionMover.createPositionIterator(J.getRootNode()),la,ja,na=new gui.PlainTextPasteboard(J,b),ha=new gui.InputMethodEditor(b,A),ka=0,Z=new gui.HyperlinkClickHandler(J.getRootNode),ra=new gui.HyperlinkController(g,b),K=new gui.SelectionController(g,b),E=gui.KeyboardHandler.Modifier,C=gui.KeyboardHandler.KeyCode,oa=-1!==G.navigator.appVersion.toLowerCase().indexOf("mac"),qa=-1!==["iPad","iPod","iPhone"].indexOf(G.navigator.platform),pa;runtime.assert(null!==G,"Expected to be run in an environment which has a global window, like a browser.");
this.undo=h;this.redo=v;this.insertLocalCursor=function(){runtime.assert(void 0===g.getOdtDocument().getCursor(b),"Inserting local cursor a second time.");var a=new ops.OpAddCursor;a.init({memberid:b});g.enqueue([a]);A.focus()};this.removeLocalCursor=function(){runtime.assert(void 0!==g.getOdtDocument().getCursor(b),"Removing local cursor without inserting before.");var a=new ops.OpRemoveCursor;a.init({memberid:b});g.enqueue([a])};this.startEditing=function(){ha.subscribe(gui.InputMethodEditor.signalCompositionStart,
aa.removeCurrentSelection);ha.subscribe(gui.InputMethodEditor.signalCompositionEnd,T);A.subscribe("beforecut",q);A.subscribe("cut",f);A.subscribe("beforepaste",a);A.subscribe("paste",r);G.addEventListener("focus",Z.showTextCursor,!1);ca&&ca.initialize();ha.setEditing(!0);Z.setModifier(oa?gui.HyperlinkClickHandler.Modifier.Meta:gui.HyperlinkClickHandler.Modifier.Ctrl);B.bind(C.Backspace,E.None,X(aa.removeTextByBackspaceKey),!0);B.bind(C.Delete,E.None,aa.removeTextByDeleteKey);B.bind(C.Tab,E.None,D(function(){aa.insertText("\t");
return!0}));oa?(B.bind(C.Clear,E.None,aa.removeCurrentSelection),B.bind(C.B,E.Meta,D(R.toggleBold)),B.bind(C.I,E.Meta,D(R.toggleItalic)),B.bind(C.U,E.Meta,D(R.toggleUnderline)),B.bind(C.L,E.MetaShift,D(R.alignParagraphLeft)),B.bind(C.E,E.MetaShift,D(R.alignParagraphCenter)),B.bind(C.R,E.MetaShift,D(R.alignParagraphRight)),B.bind(C.J,E.MetaShift,D(R.alignParagraphJustified)),B.bind(C.C,E.MetaShift,Y.addAnnotation),B.bind(C.Z,E.Meta,h),B.bind(C.Z,E.MetaShift,v),B.bind(C.LeftMeta,E.Meta,Z.showPointerCursor),
B.bind(C.MetaInMozilla,E.Meta,Z.showPointerCursor),M.bind(C.LeftMeta,E.None,Z.showTextCursor),M.bind(C.MetaInMozilla,E.None,Z.showTextCursor)):(B.bind(C.B,E.Ctrl,D(R.toggleBold)),B.bind(C.I,E.Ctrl,D(R.toggleItalic)),B.bind(C.U,E.Ctrl,D(R.toggleUnderline)),B.bind(C.L,E.CtrlShift,D(R.alignParagraphLeft)),B.bind(C.E,E.CtrlShift,D(R.alignParagraphCenter)),B.bind(C.R,E.CtrlShift,D(R.alignParagraphRight)),B.bind(C.J,E.CtrlShift,D(R.alignParagraphJustified)),B.bind(C.C,E.CtrlAlt,Y.addAnnotation),B.bind(C.Z,
E.Ctrl,h),B.bind(C.Z,E.CtrlShift,v),B.bind(C.Ctrl,E.Ctrl,Z.showPointerCursor),M.bind(C.Ctrl,E.None,Z.showTextCursor));V.setDefault(D(function(a){var b;b=null===a.which||void 0===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(aa.insertText(b),!0)}));V.bind(C.Enter,E.None,D(aa.enqueueParagraphSplittingOps))};this.endEditing=function(){ha.unsubscribe(gui.InputMethodEditor.signalCompositionStart,aa.removeCurrentSelection);
ha.unsubscribe(gui.InputMethodEditor.signalCompositionEnd,T);A.unsubscribe("cut",f);A.unsubscribe("beforecut",q);A.unsubscribe("paste",r);A.unsubscribe("beforepaste",a);G.removeEventListener("focus",Z.showTextCursor,!1);ha.setEditing(!1);Z.setModifier(gui.HyperlinkClickHandler.Modifier.None);B.bind(C.Backspace,E.None,function(){return!0},!0);B.unbind(C.Delete,E.None);B.unbind(C.Tab,E.None);oa?(B.unbind(C.Clear,E.None),B.unbind(C.B,E.Meta),B.unbind(C.I,E.Meta),B.unbind(C.U,E.Meta),B.unbind(C.L,E.MetaShift),
B.unbind(C.E,E.MetaShift),B.unbind(C.R,E.MetaShift),B.unbind(C.J,E.MetaShift),B.unbind(C.C,E.MetaShift),B.unbind(C.Z,E.Meta),B.unbind(C.Z,E.MetaShift),B.unbind(C.LeftMeta,E.Meta),B.unbind(C.MetaInMozilla,E.Meta),M.unbind(C.LeftMeta,E.None),M.unbind(C.MetaInMozilla,E.None)):(B.unbind(C.B,E.Ctrl),B.unbind(C.I,E.Ctrl),B.unbind(C.U,E.Ctrl),B.unbind(C.L,E.CtrlShift),B.unbind(C.E,E.CtrlShift),B.unbind(C.R,E.CtrlShift),B.unbind(C.J,E.CtrlShift),B.unbind(C.C,E.CtrlAlt),B.unbind(C.Z,E.Ctrl),B.unbind(C.Z,E.CtrlShift),
B.unbind(C.Ctrl,E.Ctrl),M.unbind(C.Ctrl,E.None));V.setDefault(null);V.unbind(C.Enter,E.None)};this.getInputMemberId=function(){return b};this.getSession=function(){return g};this.setUndoManager=function(a){ca&&ca.unsubscribe(gui.UndoManager.signalUndoStackChanged,l);if(ca=a)ca.setDocument(J),ca.setPlaybackFunction(g.enqueue),ca.subscribe(gui.UndoManager.signalUndoStackChanged,l)};this.getUndoManager=function(){return ca};this.getAnnotationController=function(){return Y};this.getDirectFormattingController=
function(){return R};this.getHyperlinkController=function(){return ra};this.getImageController=function(){return ia};this.getSelectionController=function(){return K};this.getTextController=function(){return aa};this.getEventManager=function(){return A};this.getKeyboardHandlers=function(){return{keydown:B,keypress:V}};this.destroy=function(a){var b=[];pa&&b.push(pa.destroy);b=b.concat([la.destroy,ja.destroy,R.destroy,ha.destroy,A.destroy,ba]);runtime.clearTimeout(ma);Q.destroyAll(b,a)};la=new core.ScheduledTask(x,
0);ja=new core.ScheduledTask(function(){var a=J.getCursor(b);if(a&&a.getSelectionType()===ops.OdtCursor.RegionSelection&&(a=P.getImageElements(a.getSelectedRange())[0])){ga.select(a.parentNode);return}ga.clearSelection()},0);B.bind(C.Left,E.None,D(K.moveCursorToLeft));B.bind(C.Right,E.None,D(K.moveCursorToRight));B.bind(C.Up,E.None,D(K.moveCursorUp));B.bind(C.Down,E.None,D(K.moveCursorDown));B.bind(C.Left,E.Shift,D(K.extendSelectionToLeft));B.bind(C.Right,E.Shift,D(K.extendSelectionToRight));B.bind(C.Up,
E.Shift,D(K.extendSelectionUp));B.bind(C.Down,E.Shift,D(K.extendSelectionDown));B.bind(C.Home,E.None,D(K.moveCursorToLineStart));B.bind(C.End,E.None,D(K.moveCursorToLineEnd));B.bind(C.Home,E.Ctrl,D(K.moveCursorToDocumentStart));B.bind(C.End,E.Ctrl,D(K.moveCursorToDocumentEnd));B.bind(C.Home,E.Shift,D(K.extendSelectionToLineStart));B.bind(C.End,E.Shift,D(K.extendSelectionToLineEnd));B.bind(C.Up,E.CtrlShift,D(K.extendSelectionToParagraphStart));B.bind(C.Down,E.CtrlShift,D(K.extendSelectionToParagraphEnd));
B.bind(C.Home,E.CtrlShift,D(K.extendSelectionToDocumentStart));B.bind(C.End,E.CtrlShift,D(K.extendSelectionToDocumentEnd));oa?(B.bind(C.Left,E.Alt,D(K.moveCursorBeforeWord)),B.bind(C.Right,E.Alt,D(K.moveCursorPastWord)),B.bind(C.Left,E.Meta,D(K.moveCursorToLineStart)),B.bind(C.Right,E.Meta,D(K.moveCursorToLineEnd)),B.bind(C.Home,E.Meta,D(K.moveCursorToDocumentStart)),B.bind(C.End,E.Meta,D(K.moveCursorToDocumentEnd)),B.bind(C.Left,E.AltShift,D(K.extendSelectionBeforeWord)),B.bind(C.Right,E.AltShift,
D(K.extendSelectionPastWord)),B.bind(C.Left,E.MetaShift,D(K.extendSelectionToLineStart)),B.bind(C.Right,E.MetaShift,D(K.extendSelectionToLineEnd)),B.bind(C.Up,E.AltShift,D(K.extendSelectionToParagraphStart)),B.bind(C.Down,E.AltShift,D(K.extendSelectionToParagraphEnd)),B.bind(C.Up,E.MetaShift,D(K.extendSelectionToDocumentStart)),B.bind(C.Down,E.MetaShift,D(K.extendSelectionToDocumentEnd)),B.bind(C.A,E.Meta,D(K.extendSelectionToEntireDocument))):(B.bind(C.Left,E.Ctrl,D(K.moveCursorBeforeWord)),B.bind(C.Right,
E.Ctrl,D(K.moveCursorPastWord)),B.bind(C.Left,E.CtrlShift,D(K.extendSelectionBeforeWord)),B.bind(C.Right,E.CtrlShift,D(K.extendSelectionPastWord)),B.bind(C.A,E.Ctrl,D(K.extendSelectionToEntireDocument)));qa&&(pa=new gui.IOSSafariSupport(A));A.subscribe("keydown",B.handleEvent);A.subscribe("keypress",V.handleEvent);A.subscribe("keyup",M.handleEvent);A.subscribe("copy",e);A.subscribe("mousedown",u);A.subscribe("mousemove",la.trigger);A.subscribe("mouseup",U);A.subscribe("contextmenu",H);A.subscribe("dragstart",
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
gui.CaretManager=function(m){function g(a){return c.hasOwnProperty(a)?c[a]:null}function b(){return Object.keys(c).map(function(a){return c[a]})}function k(a){var b=c[a];b&&(b.destroy(function(){}),delete c[a])}function d(a){a=a.getMemberId();a===m.getInputMemberId()&&(a=g(a))&&a.refreshCursorBlinking()}function n(){var a=g(m.getInputMemberId());w=!1;a&&a.ensureVisible()}function p(){var a=g(m.getInputMemberId());a&&(a.handleUpdate(),w||(w=!0,v=runtime.setTimeout(n,50)))}function f(a){a.memberId===
m.getInputMemberId()&&p()}function q(){var a=g(m.getInputMemberId());a&&a.setFocus()}function e(){var a=g(m.getInputMemberId());a&&a.removeFocus()}function r(){var a=g(m.getInputMemberId());a&&a.show()}function a(){var a=g(m.getInputMemberId());a&&a.hide()}var c={},l=new core.Async,h=runtime.getWindow(),v,w=!1;this.registerCursor=function(a,b,d){var e=a.getMemberId();b=new gui.Caret(a,b,d);d=m.getEventManager();c[e]=b;e===m.getInputMemberId()?(runtime.log("Starting to track input on new cursor of "+
e),a.subscribe(ops.OdtCursor.signalCursorUpdated,p),b.setOverlayElement(d.getEventTrap())):a.subscribe(ops.OdtCursor.signalCursorUpdated,b.handleUpdate);return b};this.getCaret=g;this.getCarets=b;this.destroy=function(g){var n=m.getSession().getOdtDocument(),p=m.getEventManager(),t=b().map(function(a){return a.destroy});runtime.clearTimeout(v);n.unsubscribe(ops.OdtDocument.signalParagraphChanged,f);n.unsubscribe(ops.Document.signalCursorMoved,d);n.unsubscribe(ops.Document.signalCursorRemoved,k);p.unsubscribe("focus",
q);p.unsubscribe("blur",e);h.removeEventListener("focus",r,!1);h.removeEventListener("blur",a,!1);c={};l.destroyAll(t,g)};(function(){var b=m.getSession().getOdtDocument(),c=m.getEventManager();b.subscribe(ops.OdtDocument.signalParagraphChanged,f);b.subscribe(ops.Document.signalCursorMoved,d);b.subscribe(ops.Document.signalCursorRemoved,k);c.subscribe("focus",q);c.subscribe("blur",e);h.addEventListener("focus",r,!1);h.addEventListener("blur",a,!1)})()};
// Input 97
gui.EditInfoHandle=function(m){var g=[],b,k=m.ownerDocument,d=k.documentElement.namespaceURI;this.setEdits=function(m){g=m;var p,f,q,e;b.innerHTML="";for(m=0;m<g.length;m+=1)p=k.createElementNS(d,"div"),p.className="editInfo",f=k.createElementNS(d,"span"),f.className="editInfoColor",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",g[m].memberid),q=k.createElementNS(d,"span"),q.className="editInfoAuthor",q.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",g[m].memberid),
e=k.createElementNS(d,"span"),e.className="editInfoTime",e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",g[m].memberid),e.innerHTML=g[m].time,p.appendChild(f),p.appendChild(q),p.appendChild(e),b.appendChild(p)};this.show=function(){b.style.display="block"};this.hide=function(){b.style.display="none"};this.destroy=function(d){m.removeChild(b);d()};b=k.createElementNS(d,"div");b.setAttribute("class","editInfoHandle");b.style.display="none";m.appendChild(b)};
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
ops.EditInfo=function(m,g){function b(){var b=[],g;for(g in d)d.hasOwnProperty(g)&&b.push({memberid:g,time:d[g].time});b.sort(function(b,d){return b.time-d.time});return b}var k,d={};this.getNode=function(){return k};this.getOdtDocument=function(){return g};this.getEdits=function(){return d};this.getSortedEdits=function(){return b()};this.addEdit=function(b,g){d[b]={time:g}};this.clearEdits=function(){d={}};this.destroy=function(b){m.parentNode&&m.removeChild(k);b()};k=g.getDOMDocument().createElementNS("urn:webodf:names:editinfo",
"editinfo");m.insertBefore(k,m.firstChild)};
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
gui.EditInfoMarker=function(m,g){function b(b,a){return runtime.setTimeout(function(){p.style.opacity=b},a)}var k=this,d,n,p,f,q,e;this.addEdit=function(d,a){var c=Date.now()-a;m.addEdit(d,a);n.setEdits(m.getSortedEdits());p.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",d);runtime.clearTimeout(q);runtime.clearTimeout(e);1E4>c?(f=b(1,0),q=b(0.5,1E4-c),e=b(0.2,2E4-c)):1E4<=c&&2E4>c?(f=b(0.5,0),e=b(0.2,2E4-c)):f=b(0.2,0)};this.getEdits=function(){return m.getEdits()};this.clearEdits=
function(){m.clearEdits();n.setEdits([]);p.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&p.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return m};this.show=function(){p.style.display="block"};this.hide=function(){k.hideHandle();p.style.display="none"};this.showHandle=function(){n.show()};this.hideHandle=function(){n.hide()};this.destroy=function(b){runtime.clearTimeout(f);runtime.clearTimeout(q);runtime.clearTimeout(e);d.removeChild(p);
n.destroy(function(a){a?b(a):m.destroy(b)})};(function(){var b=m.getOdtDocument().getDOMDocument();p=b.createElementNS(b.documentElement.namespaceURI,"div");p.setAttribute("class","editInfoMarker");p.onmouseover=function(){k.showHandle()};p.onmouseout=function(){k.hideHandle()};d=m.getNode();d.appendChild(p);n=new gui.EditInfoHandle(d);g||k.hide()})()};
// Input 100
gui.ShadowCursor=function(m){var g=m.getDOMDocument().createRange(),b=!0;this.removeFromDocument=function(){};this.getMemberId=function(){return gui.ShadowCursor.ShadowCursorMemberId};this.getSelectedRange=function(){return g};this.setSelectedRange=function(k,d){g=k;b=!1!==d};this.hasForwardSelection=function(){return b};this.getDocument=function(){return m};this.getSelectionType=function(){return ops.OdtCursor.RangeSelection};g.setStart(m.getRootNode(),0)};gui.ShadowCursor.ShadowCursorMemberId="";
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
gui.SelectionViewManager=function(m){function g(){return Object.keys(b).map(function(g){return b[g]})}var b={};this.getSelectionView=function(g){return b.hasOwnProperty(g)?b[g]:null};this.getSelectionViews=g;this.removeSelectionView=function(g){b.hasOwnProperty(g)&&(b[g].destroy(function(){}),delete b[g])};this.hideSelectionView=function(g){b.hasOwnProperty(g)&&b[g].hide()};this.showSelectionView=function(g){b.hasOwnProperty(g)&&b[g].show()};this.rerenderSelectionViews=function(){Object.keys(b).forEach(function(g){b[g].rerender()})};
this.registerCursor=function(g,d){var n=g.getMemberId(),p=new m(g);d?p.show():p.hide();return b[n]=p};this.destroy=function(b){function d(g,f){f?b(f):g<m.length?m[g].destroy(function(b){d(g+1,b)}):b()}var m=g();d(0,void 0)}};
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
(function(){gui.SessionView=function(m,g,b,k,d){function n(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid="'+a+'"]'+e+c;a:{var h=l.firstChild;for(b=b+'[editinfo|memberid="'+a+'"]'+e+"{";h;){if(h.nodeType===Node.TEXT_NODE&&0===h.data.indexOf(b)){b=h;break a}h=h.nextSibling}b=null}b?b.data=c:l.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator","{ background-color: "+c+"; }","");d(".selectionOverlay","{ fill: "+c+"; stroke: "+c+";}","");a!==gui.ShadowCursor.ShadowCursorMemberId&&a!==g||d(".webodf-touchEnabled .selectionOverlay","{ display: block; }"," > .draggable")}function p(a){var b,c;for(c in v)v.hasOwnProperty(c)&&(b=v[c],a?b.show():b.hide())}function f(a){k.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function q(a){var b=a.getMemberId();a=a.getProperties();n(b,a.fullName,a.color);g===b&&n("","",
a.color)}function e(a){var c=a.getMemberId(),e=b.getOdtDocument().getMember(c).getProperties();k.registerCursor(a,z,x);d.registerCursor(a,!0);if(a=k.getCaret(c))a.setAvatarImageUrl(e.imageUrl),a.setColor(e.color);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function r(a){a=a.getMemberId();var b=d.getSelectionView(g),c=d.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),e=k.getCaret(g);a===g?(c.hide(),b&&b.show(),e&&e.show()):a===gui.ShadowCursor.ShadowCursorMemberId&&
(c.show(),b&&b.hide(),e&&e.hide())}function a(a){d.removeSelectionView(a)}function c(a){var c=a.paragraphElement,d=a.memberId;a=a.timeStamp;var e,f="",g=c.getElementsByTagNameNS(h,"editinfo").item(0);g?(f=g.getAttributeNS(h,"id"),e=v[f]):(f=Math.random().toString(),e=new ops.EditInfo(c,b.getOdtDocument()),e=new gui.EditInfoMarker(e,w),g=c.getElementsByTagNameNS(h,"editinfo").item(0),g.setAttributeNS(h,"id",f),v[f]=e);e.addEdit(d,new Date(a))}var l,h="urn:webodf:names:editinfo",v={},w=void 0!==m.editInfoMarkersInitiallyVisible?
Boolean(m.editInfoMarkersInitiallyVisible):!0,z=void 0!==m.caretAvatarsInitiallyVisible?Boolean(m.caretAvatarsInitiallyVisible):!0,x=void 0!==m.caretBlinksOnRangeSelect?Boolean(m.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=function(){w||(w=!0,p(w))};this.hideEditInfoMarkers=function(){w&&(w=!1,p(w))};this.showCaretAvatars=function(){z||(z=!0,f(z))};this.hideCaretAvatars=function(){z&&(z=!1,f(z))};this.getSession=function(){return b};this.getCaret=function(a){return k.getCaret(a)};this.destroy=
function(h){var f=b.getOdtDocument(),g=Object.keys(v).map(function(a){return v[a]});f.unsubscribe(ops.Document.signalMemberAdded,q);f.unsubscribe(ops.Document.signalMemberUpdated,q);f.unsubscribe(ops.Document.signalCursorAdded,e);f.unsubscribe(ops.Document.signalCursorRemoved,a);f.unsubscribe(ops.OdtDocument.signalParagraphChanged,c);f.unsubscribe(ops.Document.signalCursorMoved,r);f.unsubscribe(ops.OdtDocument.signalParagraphChanged,d.rerenderSelectionViews);f.unsubscribe(ops.OdtDocument.signalTableAdded,
d.rerenderSelectionViews);f.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,d.rerenderSelectionViews);l.parentNode.removeChild(l);(function F(a,b){b?h(b):a<g.length?g[a].destroy(function(b){F(a+1,b)}):h()})(0,void 0)};(function(){var h=b.getOdtDocument(),f=document.getElementsByTagName("head").item(0);h.subscribe(ops.Document.signalMemberAdded,q);h.subscribe(ops.Document.signalMemberUpdated,q);h.subscribe(ops.Document.signalCursorAdded,e);h.subscribe(ops.Document.signalCursorRemoved,a);h.subscribe(ops.OdtDocument.signalParagraphChanged,
c);h.subscribe(ops.Document.signalCursorMoved,r);h.subscribe(ops.OdtDocument.signalParagraphChanged,d.rerenderSelectionViews);h.subscribe(ops.OdtDocument.signalTableAdded,d.rerenderSelectionViews);h.subscribe(ops.OdtDocument.signalParagraphStyleModified,d.rerenderSelectionViews);l=document.createElementNS(f.namespaceURI,"style");l.type="text/css";l.media="screen, print, handheld, projection";l.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));l.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));
f.appendChild(l)})()}})();
// Input 104
gui.SvgSelectionView=function(m){function g(){var a=l.getRootNode();h!==a&&(h=a,v=h.parentNode.parentNode.parentNode,v.appendChild(x),x.setAttribute("class","selectionOverlay"),t.setAttribute("class","draggable"),s.setAttribute("class","draggable"),t.setAttribute("end","left"),s.setAttribute("end","right"),t.setAttribute("r",8),s.setAttribute("r",8),x.appendChild(u),x.appendChild(t),x.appendChild(s))}function b(a){var b=F.getBoundingClientRect(v),c=L.getZoomLevel(),d={};d.top=F.adaptRangeDifferenceToZoomLevel(a.top-
b.top,c);d.left=F.adaptRangeDifferenceToZoomLevel(a.left-b.left,c);d.bottom=F.adaptRangeDifferenceToZoomLevel(a.bottom-b.top,c);d.right=F.adaptRangeDifferenceToZoomLevel(a.right-b.left,c);d.width=F.adaptRangeDifferenceToZoomLevel(a.width,c);d.height=F.adaptRangeDifferenceToZoomLevel(a.height,c);return d}function k(a){a=a.getBoundingClientRect();return Boolean(a&&0!==a.height)}function d(a){var b=y.getTextElements(a,!0,!1),c=a.cloneRange(),d=a.cloneRange();a=a.cloneRange();if(!b.length)return null;
var e;a:{e=0;var h=b[e],f=c.startContainer===h?c.startOffset:0,g=f;c.setStart(h,f);for(c.setEnd(h,g);!k(c);){if(h.nodeType===Node.ELEMENT_NODE&&g<h.childNodes.length)g=h.childNodes.length;else if(h.nodeType===Node.TEXT_NODE&&g<h.length)g+=1;else if(b[e])h=b[e],e+=1,f=g=0;else{e=!1;break a}c.setStart(h,f);c.setEnd(h,g)}e=!0}if(!e)return null;a:{e=b.length-1;h=b[e];g=f=d.endContainer===h?d.endOffset:h.nodeType===Node.TEXT_NODE?h.length:h.childNodes.length;d.setStart(h,f);for(d.setEnd(h,g);!k(d);){if(h.nodeType===
Node.ELEMENT_NODE&&0<f)f=0;else if(h.nodeType===Node.TEXT_NODE&&0<f)f-=1;else if(b[e])h=b[e],e-=1,f=g=h.length||h.childNodes.length;else{b=!1;break a}d.setStart(h,f);d.setEnd(h,g)}b=!0}if(!b)return null;a.setStart(c.startContainer,c.startOffset);a.setEnd(d.endContainer,d.endOffset);return{firstRange:c,lastRange:d,fillerRange:a}}function n(a,b){var c={};c.top=Math.min(a.top,b.top);c.left=Math.min(a.left,b.left);c.right=Math.max(a.right,b.right);c.bottom=Math.max(a.bottom,b.bottom);c.width=c.right-
c.left;c.height=c.bottom-c.top;return c}function p(a,b){b&&0<b.width&&0<b.height&&(a=a?n(a,b):b);return a}function f(a){function b(a){H.setUnfilteredPosition(a,0);return v.acceptNode(a)===U&&s.acceptPosition(H)===U?U:T}function c(a){var d=null;b(a)===U&&(d=F.getBoundingClientRect(a));return d}var d=a.commonAncestorContainer,e=a.startContainer,h=a.endContainer,f=a.startOffset,g=a.endOffset,k,m,n=null,q,r=w.createRange(),s,v=new odf.OdfNodeFilter,u;if(e===d||h===d)return r=a.cloneRange(),n=r.getBoundingClientRect(),
r.detach(),n;for(a=e;a.parentNode!==d;)a=a.parentNode;for(m=h;m.parentNode!==d;)m=m.parentNode;s=l.createRootFilter(e);for(d=a.nextSibling;d&&d!==m;)q=c(d),n=p(n,q),d=d.nextSibling;if(y.isParagraph(a))n=p(n,F.getBoundingClientRect(a));else if(a.nodeType===Node.TEXT_NODE)d=a,r.setStart(d,f),r.setEnd(d,d===m?g:d.length),q=r.getBoundingClientRect(),n=p(n,q);else for(u=w.createTreeWalker(a,NodeFilter.SHOW_TEXT,b,!1),d=u.currentNode=e;d&&d!==h;)r.setStart(d,f),r.setEnd(d,d.length),q=r.getBoundingClientRect(),
n=p(n,q),k=d,f=0,d=u.nextNode();k||(k=e);if(y.isParagraph(m))n=p(n,F.getBoundingClientRect(m));else if(m.nodeType===Node.TEXT_NODE)d=m,r.setStart(d,d===a?f:0),r.setEnd(d,g),q=r.getBoundingClientRect(),n=p(n,q);else for(u=w.createTreeWalker(m,NodeFilter.SHOW_TEXT,b,!1),d=u.currentNode=h;d&&d!==k;)if(r.setStart(d,0),r.setEnd(d,g),q=r.getBoundingClientRect(),n=p(n,q),d=u.previousNode())g=d.length;return n}function q(a,b){var c=a.getBoundingClientRect(),d={width:0};d.top=c.top;d.bottom=c.bottom;d.height=
c.height;d.left=d.right=b?c.right:c.left;return d}function e(){var a=m.getSelectedRange(),c;if(c=O&&m.getSelectionType()===ops.OdtCursor.RangeSelection&&!a.collapsed){g();var a=d(a),e,h,l,k,p,r,v,w;if(a){c=a.firstRange;e=a.lastRange;h=a.fillerRange;l=b(q(c,!1));p=b(q(e,!0));k=(k=f(h))?b(k):n(l,p);r=k.left;v=l.left+Math.max(0,k.width-(l.left-k.left));k=Math.min(l.top,p.top);w=p.top+p.height;r=[{x:l.left,y:k+l.height},{x:l.left,y:k},{x:v,y:k},{x:v,y:w-p.height},{x:p.right,y:w-p.height},{x:p.right,y:w},
{x:r,y:w},{x:r,y:k+l.height},{x:l.left,y:k+l.height}];v="";var y;for(y=0;y<r.length;y+=1)v+=r[y].x+","+r[y].y+" ";u.setAttribute("points",v);t.setAttribute("cx",l.left);t.setAttribute("cy",k+l.height/2);s.setAttribute("cx",p.right);s.setAttribute("cy",w-p.height/2);c.detach();e.detach();h.detach()}c=Boolean(a)}x.style.display=c?"block":"none"}function r(a){O&&a===m&&X.trigger()}function a(a){a=8/a;t.setAttribute("r",a);s.setAttribute("r",a)}function c(b){v.removeChild(x);m.getDocument().unsubscribe(ops.Document.signalCursorMoved,
r);L.unsubscribe(gui.ZoomHelper.signalZoomChanged,a);b()}var l=m.getDocument(),h,v,w=l.getDOMDocument(),z=new core.Async,x=w.createElementNS("http://www.w3.org/2000/svg","svg"),u=w.createElementNS("http://www.w3.org/2000/svg","polygon"),t=w.createElementNS("http://www.w3.org/2000/svg","circle"),s=w.createElementNS("http://www.w3.org/2000/svg","circle"),y=new odf.OdfUtils,F=new core.DomUtils,L=l.getCanvas().getZoomHelper(),O=!0,H=gui.SelectionMover.createPositionIterator(l.getRootNode()),U=NodeFilter.FILTER_ACCEPT,
T=NodeFilter.FILTER_REJECT,X;this.rerender=function(){O&&X.trigger()};this.show=function(){O=!0;X.trigger()};this.hide=function(){O=!1;X.trigger()};this.destroy=function(a){z.destroyAll([X.destroy,c],a)};(function(){var b=m.getMemberId();X=new core.ScheduledTask(e,0);g();x.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);m.getDocument().subscribe(ops.Document.signalCursorMoved,r);L.subscribe(gui.ZoomHelper.signalZoomChanged,a);a(L.getZoomLevel())})()};
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
gui.UndoStateRules=function(){function m(b,g){var k=b.length;this.previous=function(){for(k-=1;0<=k;k-=1)if(g(b[k]))return b[k];return null}}function g(b){b=b.spec();var g;b.hasOwnProperty("position")&&(g=b.position);return g}function b(b){return b.isEdit}function k(b,k,m){if(!m)return m=g(b)-g(k),0===m||1===Math.abs(m);b=g(b);k=g(k);m=g(m);return b-k===k-m}this.isEditOperation=b;this.isPartOfOperationSet=function(d,g){var p=void 0!==d.group,f;if(!d.isEdit||0===g.length)return!0;f=g[g.length-1];if(p&&
d.group===f.group)return!0;a:switch(d.spec().optype){case "RemoveText":case "InsertText":f=!0;break a;default:f=!1}if(f&&g.some(b)){if(p){var q;p=d.spec().optype;f=new m(g,b);var e=f.previous(),r=null,a,c;runtime.assert(Boolean(e),"No edit operations found in state");c=e.group;runtime.assert(void 0!==c,"Operation has no group");for(a=1;e&&e.group===c;){if(p===e.spec().optype){q=e;break}e=f.previous()}if(q){for(e=f.previous();e;){if(e.group!==c){if(2===a)break;c=e.group;a+=1}if(p===e.spec().optype){r=
e;break}e=f.previous()}q=k(d,q,r)}else q=!1;return q}q=d.spec().optype;p=new m(g,b);f=p.previous();runtime.assert(Boolean(f),"No edit operations found in state");q=q===f.spec().optype?k(d,f,p.previous()):!1;return q}return!1}};
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
gui.TrivialUndoManager=function(m){function g(a){0<a.length&&(t=!0,l(a),t=!1)}function b(){x.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:q.hasUndoStates(),redoAvailable:q.hasRedoStates()})}function k(){v!==c&&v!==w[w.length-1]&&w.push(v)}function d(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);r.normalizeTextNodes(b)}function n(a){return Object.keys(a).map(function(b){return a[b]})}function p(a){function b(a){var h=a.spec();if(e[h.memberid])switch(h.optype){case "AddCursor":c[h.memberid]||
(c[h.memberid]=a,delete e[h.memberid],f-=1);break;case "MoveCursor":d[h.memberid]||(d[h.memberid]=a)}}var c={},d={},e={},f,g=a.pop();h.getMemberIds().forEach(function(a){e[a]=!0});for(f=Object.keys(e).length;g&&0<f;)g.reverse(),g.forEach(b),g=a.pop();return n(c).concat(n(d))}function f(){var f=a=h.cloneDocumentElement();r.getElementsByTagNameNS(f,e,"cursor").forEach(d);r.getElementsByTagNameNS(f,e,"anchor").forEach(d);k();v=c=p([c].concat(w));w.length=0;z.length=0;b()}var q=this,e="urn:webodf:names:cursor",
r=new core.DomUtils,a,c=[],l,h,v=[],w=[],z=[],x=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),u=m||new gui.UndoStateRules,t=!1;this.subscribe=function(a,b){x.subscribe(a,b)};this.unsubscribe=function(a,b){x.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<w.length};this.hasRedoStates=function(){return 0<z.length};this.setDocument=function(a){h=
a};this.purgeInitialState=function(){w.length=0;z.length=0;c.length=0;v.length=0;a=null;b()};this.setInitialState=f;this.initialize=function(){a||f()};this.setPlaybackFunction=function(a){l=a};this.onOperationExecuted=function(a){t||(u.isEditOperation(a)&&(v===c||0<z.length)||!u.isPartOfOperationSet(a,v)?(z.length=0,k(),v=[a],w.push(v),x.emit(gui.UndoManager.signalUndoStateCreated,{operations:v}),b()):(v.push(a),x.emit(gui.UndoManager.signalUndoStateModified,{operations:v})))};this.moveForward=function(a){for(var c=
0,d;a&&z.length;)d=z.pop(),w.push(d),g(d),a-=1,c+=1;c&&(v=w[w.length-1],b());return c};this.moveBackward=function(d){for(var e=0;d&&w.length;)z.push(w.pop()),d-=1,e+=1;e&&(h.setDocumentElement(a.cloneNode(!0)),x.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),h.getMemberIds().forEach(function(a){h.removeCursor(a)}),g(c),w.forEach(g),v=w[w.length-1]||c,b());return e}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
ops.OperationTransformMatrix=function(){function m(a){a.position+=a.length;a.length*=-1}function g(a){var b=0>a.length;b&&m(a);return b}function b(a,b){function d(f){a[f]===b&&e.push(f)}var e=[];a&&["style:parent-style-name","style:next-style-name"].forEach(d);return e}function k(a,b){function d(e){a[e]===b&&delete a[e]}a&&["style:parent-style-name","style:next-style-name"].forEach(d)}function d(a){var b={};Object.keys(a).forEach(function(e){b[e]="object"===typeof a[e]?d(a[e]):a[e]});return b}function n(a,
b,d,e){var f,g=!1,k=!1,m,n=[];e&&e.attributes&&(n=e.attributes.split(","));a&&(d||0<n.length)&&Object.keys(a).forEach(function(b){var c=a[b],e;"object"!==typeof c&&(d&&(e=d[b]),void 0!==e?(delete a[b],k=!0,e===c&&(delete d[b],g=!0)):-1!==n.indexOf(b)&&(delete a[b],k=!0))});if(b&&b.attributes&&(d||0<n.length)){m=b.attributes.split(",");for(e=0;e<m.length;e+=1)if(f=m[e],d&&void 0!==d[f]||n&&-1!==n.indexOf(f))m.splice(e,1),e-=1,k=!0;0<m.length?b.attributes=m.join(","):delete b.attributes}return{majorChanged:g,
minorChanged:k}}function p(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function f(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function q(a,b,d,e,g){var k=a?a[g]:null,m=b?b[g]:null,q=d?d[g]:null,r=e?e[g]:null,t;t=n(k,m,q,r);k&&!p(k)&&delete a[g];m&&!f(m)&&delete b[g];q&&!p(q)&&delete d[g];r&&!f(r)&&delete e[g];return t}function e(a,b){return{opSpecsA:[a],opSpecsB:[b]}}var r;r={AddCursor:{AddCursor:e,AddMember:e,AddStyle:e,ApplyDirectStyling:e,
InsertText:e,MoveCursor:e,RemoveCursor:e,RemoveMember:e,RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},AddMember:{AddStyle:e,InsertText:e,MoveCursor:e,RemoveCursor:e,RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMetadata:e,UpdateParagraphStyle:e},AddStyle:{AddStyle:e,ApplyDirectStyling:e,InsertText:e,MoveCursor:e,RemoveCursor:e,RemoveMember:e,RemoveStyle:function(a,c){var d,e=[a],f=[c];a.styleFamily===
c.styleFamily&&(d=b(a.setProperties,c.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:c.memberid,timestamp:c.timestamp,styleName:a.styleName,removedProperties:{attributes:d.join(",")}},f.unshift(d)),k(a.setProperties,c.styleName));return{opSpecsA:e,opSpecsB:f}},RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},ApplyDirectStyling:{ApplyDirectStyling:function(a,b,e){var h,f,g,k,m,n,r,s;k=[a];g=[b];if(!(a.position+a.length<=b.position||
a.position>=b.position+b.length)){h=e?a:b;f=e?b:a;if(a.position!==b.position||a.length!==b.length)n=d(h),r=d(f);b=q(f.setProperties,null,h.setProperties,null,"style:text-properties");if(b.majorChanged||b.minorChanged)g=[],a=[],k=h.position+h.length,m=f.position+f.length,f.position<h.position?b.minorChanged&&(s=d(r),s.length=h.position-f.position,a.push(s),f.position=h.position,f.length=m-f.position):h.position<f.position&&b.majorChanged&&(s=d(n),s.length=f.position-h.position,g.push(s),h.position=
f.position,h.length=k-h.position),m>k?b.minorChanged&&(n=r,n.position=k,n.length=m-k,a.push(n),f.length=k-f.position):k>m&&b.majorChanged&&(n.position=m,n.length=k-m,g.push(n),h.length=m-h.position),h.setProperties&&p(h.setProperties)&&g.push(h),f.setProperties&&p(f.setProperties)&&a.push(f),e?(k=g,g=a):k=a}return{opSpecsA:k,opSpecsB:g}},InsertText:function(a,b){b.position<=a.position?a.position+=b.text.length:b.position<=a.position+a.length&&(a.length+=b.text.length);return{opSpecsA:[a],opSpecsB:[b]}},
MoveCursor:e,RemoveCursor:e,RemoveStyle:e,RemoveText:function(a,b){var d=a.position+a.length,e=b.position+b.length,f=[a],g=[b];e<=a.position?a.position-=b.length:b.position<d&&(a.position<b.position?a.length=e<d?a.length-b.length:b.position-a.position:(a.position=b.position,e<d?a.length=d-e:f=[]));return{opSpecsA:f,opSpecsB:g}},SetParagraphStyle:e,SplitParagraph:function(a,b){b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMetadata:e,
UpdateParagraphStyle:e},InsertText:{InsertText:function(a,b,d){a.position<b.position?b.position+=a.text.length:a.position>b.position?a.position+=b.text.length:d?b.position+=a.text.length:a.position+=b.text.length;return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:function(a,b){var d=g(b);a.position<b.position?b.position+=a.text.length:a.position<b.position+b.length&&(b.length+=a.text.length);d&&m(b);return{opSpecsA:[a],opSpecsB:[b]}},RemoveCursor:e,RemoveMember:e,RemoveStyle:e,RemoveText:function(a,b){var d;
d=b.position+b.length;var e=[a],f=[b];d<=a.position?a.position-=b.length:a.position<=b.position?b.position+=a.text.length:(b.length=a.position-b.position,d={optype:"RemoveText",memberid:b.memberid,timestamp:b.timestamp,position:a.position+a.text.length,length:d-a.position},f.unshift(d),a.position=b.position);return{opSpecsA:e,opSpecsB:f}},SplitParagraph:function(a,b,d){if(a.position<b.position)b.position+=a.text.length;else if(a.position>b.position)a.position+=1;else return d?b.position+=a.text.length:
a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},MoveCursor:{MoveCursor:e,RemoveCursor:function(a,b){return{opSpecsA:a.memberid===b.memberid?[]:[a],opSpecsB:[b]}},RemoveMember:e,RemoveStyle:e,RemoveText:function(a,b){var d=g(a),e=a.position+a.length,f=b.position+b.length;f<=a.position?a.position-=b.length:b.position<e&&(a.position<b.position?a.length=f<e?a.length-b.length:b.position-a.position:(a.position=b.position,a.length=f<e?e-f:0));
d&&m(a);return{opSpecsA:[a],opSpecsB:[b]}},SetParagraphStyle:e,SplitParagraph:function(a,b){var d=g(a);b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);d&&m(a);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},RemoveCursor:{RemoveCursor:function(a,b){var d=a.memberid===b.memberid;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveMember:e,RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMember:e,UpdateMetadata:e,
UpdateParagraphStyle:e},RemoveMember:{RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateMetadata:e,UpdateParagraphStyle:e},RemoveStyle:{RemoveStyle:function(a,b){var d=a.styleName===b.styleName&&a.styleFamily===b.styleFamily;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveText:e,SetParagraphStyle:function(a,b){var d,e=[a],f=[b];"paragraph"===a.styleFamily&&a.styleName===b.styleName&&(d={optype:"SetParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,position:b.position,
styleName:""},e.unshift(d),b.styleName="");return{opSpecsA:e,opSpecsB:f}},SplitParagraph:e,UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:function(a,c){var d,e=[a],f=[c];"paragraph"===a.styleFamily&&(d=b(c.setProperties,a.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,styleName:c.styleName,removedProperties:{attributes:d.join(",")}},e.unshift(d)),a.styleName===c.styleName?f=[]:k(c.setProperties,a.styleName));return{opSpecsA:e,opSpecsB:f}}},
RemoveText:{RemoveText:function(a,b){var d=a.position+a.length,e=b.position+b.length,f=[a],g=[b];e<=a.position?a.position-=b.length:d<=b.position?b.position-=a.length:b.position<d&&(a.position<b.position?(a.length=e<d?a.length-b.length:b.position-a.position,d<e?(b.position=a.position,b.length=e-d):g=[]):(d<e?b.length-=a.length:b.position<a.position?b.length=a.position-b.position:g=[],e<d?(a.position=b.position,a.length=d-e):f=[]));return{opSpecsA:f,opSpecsB:g}},SplitParagraph:function(a,b){var d=
a.position+a.length,e=[a],f=[b];b.position<=a.position?a.position+=1:b.position<d&&(a.length=b.position-a.position,d={optype:"RemoveText",memberid:a.memberid,timestamp:a.timestamp,position:b.position+1,length:d-b.position},e.unshift(d));a.position+a.length<=b.position?b.position-=a.length:a.position<b.position&&(b.position=a.position);return{opSpecsA:e,opSpecsB:f}},UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},SetParagraphStyle:{UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},SplitParagraph:{SplitParagraph:function(a,
b,d){a.position<b.position?b.position+=1:a.position>b.position?a.position+=1:a.position===b.position&&(d?b.position+=1:a.position+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:e,UpdateMetadata:e,UpdateParagraphStyle:e},UpdateMember:{UpdateMetadata:e,UpdateParagraphStyle:e},UpdateMetadata:{UpdateMetadata:function(a,b,d){var e,g=[a],k=[b];e=d?a:b;a=d?b:a;n(a.setProperties||null,a.removedProperties||null,e.setProperties||null,e.removedProperties||null);e.setProperties&&p(e.setProperties)||e.removedProperties&&
f(e.removedProperties)||(d?g=[]:k=[]);a.setProperties&&p(a.setProperties)||a.removedProperties&&f(a.removedProperties)||(d?k=[]:g=[]);return{opSpecsA:g,opSpecsB:k}},UpdateParagraphStyle:e},UpdateParagraphStyle:{UpdateParagraphStyle:function(a,b,d){var e,g=[a],k=[b];a.styleName===b.styleName&&(e=d?a:b,a=d?b:a,q(a.setProperties,a.removedProperties,e.setProperties,e.removedProperties,"style:paragraph-properties"),q(a.setProperties,a.removedProperties,e.setProperties,e.removedProperties,"style:text-properties"),
n(a.setProperties||null,a.removedProperties||null,e.setProperties||null,e.removedProperties||null),e.setProperties&&p(e.setProperties)||e.removedProperties&&f(e.removedProperties)||(d?g=[]:k=[]),a.setProperties&&p(a.setProperties)||a.removedProperties&&f(a.removedProperties)||(d?k=[]:g=[]));return{opSpecsA:g,opSpecsB:k}}}};this.passUnchanged=e;this.extendTransformations=function(a){Object.keys(a).forEach(function(b){var d=a[b],e,f=r.hasOwnProperty(b);runtime.log((f?"Extending":"Adding")+" map for optypeA: "+
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
ops.OperationTransformer=function(){function m(d){var g=[];d.forEach(function(d){g.push(b.create(d))});return g}function g(b,m){for(var p,f,q=[],e=[];0<b.length&&m;){p=b.shift();p=k.transformOpspecVsOpspec(p,m);if(!p)return null;q=q.concat(p.opSpecsA);if(0===p.opSpecsB.length){q=q.concat(b);m=null;break}for(;1<p.opSpecsB.length;){f=g(b,p.opSpecsB.shift());if(!f)return null;e=e.concat(f.opSpecsB);b=f.opSpecsA}m=p.opSpecsB.pop()}m&&e.push(m);return{opSpecsA:q,opSpecsB:e}}var b,k=new ops.OperationTransformMatrix;
this.setOperationFactory=function(d){b=d};this.getOperationTransformMatrix=function(){return k};this.transform=function(b,k){for(var p,f=[];0<k.length;){p=g(b,k.shift());if(!p)return null;b=p.opSpecsA;f=f.concat(p.opSpecsB)}return{opsA:m(b),opsB:m(f)}}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(m,g){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(m,g,b,k){};ops.Server.prototype.joinSession=function(m,g,b,k){};ops.Server.prototype.leaveSession=function(m,g,b,k){};ops.Server.prototype.getGenesisUrl=function(m){};
// Input 110
var webodf_css='@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n@namespace svgns url(http://www.w3.org/2000/svg);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let\'s not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\noffice|document *::selection {\n  background: transparent;\n}\noffice|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\ndraw|frame {\n  /** make sure frames are above the main body. */\n  z-index: 1;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:"";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\noffice|text[webodfhelper|links="inactive"] text|a {\n    cursor: text;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n    pointer-events: none;\n}\n\ncursor|cursor > .caret {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > .handle {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > .handle > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > .handle.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > .handle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n/** Input Method Editor input pane & behaviours */\n/* not within a cursor */\n#eventTrap {\n    height: auto;\n    display: block;\n    position: absolute;\n    width: 1px;\n    outline: none;\n    opacity: 0;\n    color: rgba(255, 255, 255, 0); /* hide the blinking caret by setting the colour to fully transparent */\n    overflow: hidden; /* The overflow visibility is used to hide and show characters being entered */\n    pointer-events: none;\n}\n\n/* within a cursor */\ncursor|cursor > #composer {\n    text-decoration: underline;\n}\n\ncursor|cursor[cursor|composing="true"] > #composer {\n    display: inline-block;\n    height: auto;\n    width: auto;\n}\n\ncursor|cursor[cursor|composing="true"] {\n    display: inline-block;\n    width: auto;\n    height: inherit;\n}\n\ncursor|cursor[cursor|composing="true"] > .caret {\n    /* during composition, the caret should be pushed along by the composition text, inline with the text */\n    position: static;\n    /* as it is now part of an inline-block, it will no longer need correct to top or height values to align properly */\n    height: auto !important;\n    top: auto !important;\n}\n\neditinfo|editinfo {\n    /* Empty or invisible display:inline elements respond very badly to mouse selection.\n       Inline blocks are much more reliably selectable in Chrome & friends */\n    display: inline-block;\n}\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: \' \';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: \'\u00d7\';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: \'\';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n    color: black;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    z-index: 15;\n}\n.selectionOverlay > polygon {\n    fill-opacity: 0.3;\n    stroke-opacity: 0.8;\n    stroke-width: 1;\n    fill-rule: evenodd;\n}\n\n.selectionOverlay > .draggable {\n    fill-opacity: 0.8;\n    stroke-opacity: 0;\n    stroke-width: 8;\n    pointer-events: all;\n    display: none;\n\n    -moz-transform-origin: center center;\n    -webkit-transform-origin: center center;\n    -ms-transform-origin: center center;\n    transform-origin: center center;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\ndiv.customScrollbars::-webkit-scrollbar\n{\n    width: 8px;\n    height: 8px;\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-track\n{\n    background-color: transparent;\n}\n\ndiv.customScrollbars::-webkit-scrollbar-thumb\n{\n    background-color: #444;\n    border-radius: 4px;\n}\n';
