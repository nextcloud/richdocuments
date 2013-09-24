// Input 0
/*


 Copyright (C) 2012 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
var core={},gui={},xmldom={},odf={},ops={};
// Input 1
function Runtime(){}Runtime.ByteArray=function(l){};Runtime.prototype.getVariable=function(l){};Runtime.prototype.toJson=function(l){};Runtime.prototype.fromJson=function(l){};Runtime.ByteArray.prototype.slice=function(l,m){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(l){};Runtime.prototype.byteArrayFromString=function(l,m){};Runtime.prototype.byteArrayToString=function(l,m){};Runtime.prototype.concatByteArrays=function(l,m){};
Runtime.prototype.read=function(l,m,h,a){};Runtime.prototype.readFile=function(l,m,h){};Runtime.prototype.readFileSync=function(l,m){};Runtime.prototype.loadXML=function(l,m){};Runtime.prototype.writeFile=function(l,m,h){};Runtime.prototype.isFile=function(l,m){};Runtime.prototype.getFileSize=function(l,m){};Runtime.prototype.deleteFile=function(l,m){};Runtime.prototype.log=function(l,m){};Runtime.prototype.setTimeout=function(l,m){};Runtime.prototype.clearTimeout=function(l){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(l){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(l,m,h){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(l,m){function h(a){var g="",d,b=a.length;for(d=0;d<b;d+=1)g+=String.fromCharCode(a[d]&255);return g}function a(a){var g="",d,b=a.length,c,q,k,f;for(d=0;d<b;d+=1)c=a[d],128>c?g+=String.fromCharCode(c):(d+=1,q=a[d],194<=c&&224>c?g+=String.fromCharCode((c&31)<<6|q&63):(d+=1,k=a[d],224<=c&&240>c?g+=String.fromCharCode((c&15)<<12|(q&63)<<6|k&63):(d+=1,f=a[d],240<=c&&245>c&&(c=(c&7)<<18|(q&63)<<12|(k&63)<<6|f&63,c-=65536,g+=String.fromCharCode((c>>10)+55296,(c&1023)+56320)))));
return g}var b;"utf8"===m?b=a(l):("binary"!==m&&this.log("Unsupported encoding: "+m),b=h(l));return b};Runtime.getVariable=function(l){try{return eval(l)}catch(m){}};Runtime.toJson=function(l){return JSON.stringify(l)};Runtime.fromJson=function(l){return JSON.parse(l)};Runtime.getFunctionName=function(l){return void 0===l.name?(l=/function\s+(\w+)/.exec(l))&&l[1]:l.name};
function BrowserRuntime(l){function m(g,d){var a,c,b;void 0!==d?b=g:d=g;l?(c=l.ownerDocument,b&&(a=c.createElement("span"),a.className=b,a.appendChild(c.createTextNode(b)),l.appendChild(a),l.appendChild(c.createTextNode(" "))),a=c.createElement("span"),0<d.length&&"<"===d[0]?a.innerHTML=d:a.appendChild(c.createTextNode(d)),l.appendChild(a),l.appendChild(c.createElement("br"))):console&&console.log(d);"alert"===b&&alert(d)}function h(g,d,p){function c(){var c;4===e.readyState&&(0!==e.status||e.responseText?
200===e.status||0===e.status?(c="binary"===d?null!==e.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(e.responseBody)).toArray():a.byteArrayFromString(e.responseText,"binary"):e.responseText,b[g]=c,p(null,c)):p(e.responseText||e.statusText):p("File "+g+" is empty."))}if(b.hasOwnProperty(g))p(null,b[g]);else{var e=new XMLHttpRequest;e.open("GET",g,!0);e.onreadystatechange=c;e.overrideMimeType&&("binary"!==d?e.overrideMimeType("text/plain; charset="+d):e.overrideMimeType("text/plain; charset=x-user-defined"));
try{e.send(null)}catch(k){p(k.message)}}}var a=this,b={},e=window.ArrayBuffer&&window.Uint8Array;e&&(Uint8Array.prototype.slice=function(g,d){void 0===d&&(void 0===g&&(g=0),d=this.length);var a=this.subarray(g,d),c,b;d-=g;c=new Uint8Array(new ArrayBuffer(d));for(b=0;b<d;b+=1)c[b]=a[b];return c});this.ByteArray=e?function(g){return new Uint8Array(new ArrayBuffer(g))}:function(g){var d=[];d.length=g;return d};this.concatByteArrays=e?function(g,d){var a,c=g.length,b=d.length,k=new this.ByteArray(c+b);
for(a=0;a<c;a+=1)k[a]=g[a];for(a=0;a<b;a+=1)k[a+c]=d[a];return k}:function(g,d){return g.concat(d)};this.byteArrayFromArray=function(g){return g.slice()};this.byteArrayFromString=function(g,d){var b;if("utf8"===d){b=g.length;var c,e,k,f=0;for(e=0;e<b;e+=1)k=g.charCodeAt(e),f+=1+(128<k)+(2048<k);c=new a.ByteArray(f);for(e=f=0;e<b;e+=1)k=g.charCodeAt(e),128>k?(c[f]=k,f+=1):2048>k?(c[f]=192|k>>>6,c[f+1]=128|k&63,f+=2):(c[f]=224|k>>>12&15,c[f+1]=128|k>>>6&63,c[f+2]=128|k&63,f+=3)}else for("binary"!==
d&&a.log("unknown encoding: "+d),b=g.length,c=new a.ByteArray(b),e=0;e<b;e+=1)c[e]=g.charCodeAt(e)&255;return b=c};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=h;this.read=function(g,d,e,c){function h(){var f;4===k.readyState&&(0!==k.status||k.responseText?200===k.status||0===k.status?(k.response?(f=k.response,f=new Uint8Array(f)):f=null!==k.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(k.responseBody)).toArray():a.byteArrayFromString(k.responseText,"binary"),b[g]=f,c(null,f.slice(d,d+e))):c(k.responseText||k.statusText):c("File "+g+" is empty."))}if(b.hasOwnProperty(g))c(null,b[g].slice(d,d+e));else{var k=new XMLHttpRequest;k.open("GET",g,!0);k.onreadystatechange=h;k.overrideMimeType&&k.overrideMimeType("text/plain; charset=x-user-defined");k.responseType="arraybuffer";try{k.send(null)}catch(f){c(f.message)}}};this.readFileSync=function(g,d){var a=new XMLHttpRequest,
c;a.open("GET",g,!1);a.overrideMimeType&&("binary"!==d?a.overrideMimeType("text/plain; charset="+d):a.overrideMimeType("text/plain; charset=x-user-defined"));try{if(a.send(null),200===a.status||0===a.status)c=a.responseText}catch(b){}return c};this.writeFile=function(g,d,e){b[g]=d;var c=new XMLHttpRequest;c.open("PUT",g,!0);c.onreadystatechange=function(){4===c.readyState&&(0!==c.status||c.responseText?200<=c.status&&300>c.status||0===c.status?e(null):e("Status "+String(c.status)+": "+c.responseText||
c.statusText):e("File "+g+" is empty."))};d=d.buffer&&!c.sendAsBinary?d.buffer:a.byteArrayToString(d,"binary");try{c.sendAsBinary?c.sendAsBinary(d):c.send(d)}catch(h){a.log("HUH? "+h+" "+d),e(h.message)}};this.deleteFile=function(g,d){delete b[g];var a=new XMLHttpRequest;a.open("DELETE",g,!0);a.onreadystatechange=function(){4===a.readyState&&(200>a.status&&300<=a.status?d(a.responseText):d(null))};a.send(null)};this.loadXML=function(a,d){var b=new XMLHttpRequest;b.open("GET",a,!0);b.overrideMimeType&&
b.overrideMimeType("text/xml");b.onreadystatechange=function(){4===b.readyState&&(0!==b.status||b.responseText?200===b.status||0===b.status?d(null,b.responseXML):d(b.responseText):d("File "+a+" is empty."))};try{b.send(null)}catch(c){d(c.message)}};this.isFile=function(g,d){a.getFileSize(g,function(a){d(-1!==a)})};this.getFileSize=function(a,d){var b=new XMLHttpRequest;b.open("HEAD",a,!0);b.onreadystatechange=function(){if(4===b.readyState){var c=b.getResponseHeader("Content-Length");c?d(parseInt(c,
10)):h(a,"binary",function(c,k){c?d(-1):d(k.length)})}};b.send(null)};this.log=m;this.assert=function(a,d,b){if(!a)throw m("alert","ASSERTION FAILED:\n"+d),b&&b(),d;};this.setTimeout=function(a,d){return setTimeout(function(){a()},d)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){m("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function l(d,g,c){d=a.resolve(b,d);"binary"!==g?h.readFile(d,g,c):h.readFile(d,null,c)}var m=this,h=require("fs"),a=require("path"),b="",e,g;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var b=new Buffer(a.length),c,g=a.length;for(c=0;c<g;c+=1)b[c]=a[c];return b};this.concatByteArrays=function(a,b){var c=new Buffer(a.length+b.length);a.copy(c,0,0);b.copy(c,a.length,0);return c};this.byteArrayFromString=function(a,b){return new Buffer(a,
b)};this.byteArrayToString=function(a,b){return a.toString(b)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=l;this.loadXML=function(a,b){l(a,"utf-8",function(c,a){if(c)return b(c);b(null,m.parseXML(a))})};this.writeFile=function(d,g,c){d=a.resolve(b,d);h.writeFile(d,g,"binary",function(a){c(a||null)})};this.deleteFile=function(d,g){d=a.resolve(b,d);h.unlink(d,g)};this.read=function(d,g,c,e){d=a.resolve(b,d);h.open(d,"r+",666,function(a,
f){if(a)e(a);else{var b=new Buffer(c);h.read(f,b,0,c,g,function(c){h.close(f);e(c,b)})}})};this.readFileSync=function(a,b){return b?"binary"===b?h.readFileSync(a,null):h.readFileSync(a,b):""};this.isFile=function(g,e){g=a.resolve(b,g);h.stat(g,function(c,a){e(!c&&a.isFile())})};this.getFileSize=function(g,e){g=a.resolve(b,g);h.stat(g,function(c,a){c?e(-1):e(a.size)})};this.log=function(a,b){var c;void 0!==b?c=a:b=a;"alert"===c&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(b+
"\n");"alert"===c&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,b,c){a||(process.stderr.write("ASSERTION FAILED: "+b),c&&c())};this.setTimeout=function(a,b){return setTimeout(function(){a()},b)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){b=a};this.currentDirectory=function(){return b};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return g};this.parseXML=
function(a){return e.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};e=new (require("xmldom").DOMParser);g=m.parseXML("<a/>").implementation}
function RhinoRuntime(){function l(a,b){var e;void 0!==b?e=a:b=a;"alert"===e&&print("\n!!!!! ALERT !!!!!");print(b);"alert"===e&&print("!!!!! ALERT !!!!!")}var m=this,h=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),a,b,e="";h.setValidating(!1);h.setNamespaceAware(!0);h.setExpandEntityReferences(!1);h.setSchema(null);b=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,b){var e=new Packages.java.io.FileReader(b);return new Packages.org.xml.sax.InputSource(e)}});a=h.newDocumentBuilder();
a.setEntityResolver(b);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,b){var e=[],c,h=a.length;for(c=0;c<h;c+=1)e[c]=a.charCodeAt(c)&255;return e};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,b){return a.concat(b)};this.loadXML=function(b,d){var e=new Packages.java.io.File(b),c;try{c=a.parse(e)}catch(h){print(h);
d(h);return}d(null,c)};this.readFile=function(a,b,h){e&&(a=e+"/"+a);var c=new Packages.java.io.File(a),l="binary"===b?"latin1":b;c.isFile()?(a=readFile(a,l),"binary"===b&&(a=m.byteArrayFromString(a,"binary")),h(null,a)):h(a+" is not a file.")};this.writeFile=function(a,b,h){e&&(a=e+"/"+a);a=new Packages.java.io.FileOutputStream(a);var c,l=b.length;for(c=0;c<l;c+=1)a.write(b[c]);a.close();h(null)};this.deleteFile=function(a,b){e&&(a=e+"/"+a);(new Packages.java.io.File(a))["delete"]()?b(null):b("Could not delete "+
a)};this.read=function(a,b,h,c){e&&(a=e+"/"+a);var l;l=a;var k="binary";(new Packages.java.io.File(l)).isFile()?("binary"===k&&(k="latin1"),l=readFile(l,k)):l=null;l?c(null,this.byteArrayFromString(l.substring(b,b+h),"binary")):c("Cannot read "+a)};this.readFileSync=function(a,b){return b?readFile(a,b):""};this.isFile=function(a,b){e&&(a=e+"/"+a);var h=new Packages.java.io.File(a);b(h.isFile())};this.getFileSize=function(a,b){e&&(a=e+"/"+a);var h=new Packages.java.io.File(a);b(h.length())};this.log=
l;this.assert=function(a,b,e){a||(l("alert","ASSERTION FAILED: "+b),e&&e())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){e=a};this.currentDirectory=function(){return e};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return a.getDOMImplementation()};this.parseXML=function(b){return a.parse(b)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function l(a){var b=a[0],e;e=eval("if (typeof "+b+" === 'undefined') {eval('"+b+" = {};');}"+b);for(b=1;b<a.length-1;b+=1)e=e.hasOwnProperty(a[b])?e[a[b]]:e[a[b]]={};return e[a[a.length-1]]}var m={},h={};runtime.loadClass=function(a){function b(a){a=a.replace(/\./g,"/")+".js";var c=runtime.libraryPaths(),b,k,f;runtime.currentDirectory&&c.push(runtime.currentDirectory());for(b=0;b<c.length;b+=1){k=c[b];if(!h.hasOwnProperty(k))try{f=runtime.readFileSync(c[b]+"/manifest.js","utf8"),h[k]=
f&&f.length?eval(f):null}catch(n){h[k]=null,runtime.log("Cannot load manifest for "+k+".")}f=null;if((k=h[k])&&k.indexOf&&-1!==k.indexOf(a))return c[b]+"/"+a}return null}function e(a){var c,g;g=b(a);if(!g)throw a+" is not listed in any manifest.js.";try{c=runtime.readFileSync(g,"utf8")}catch(k){throw runtime.log("Error loading "+a+" "+k),k;}if(void 0===c)throw"Cannot load class "+a;c=c+("\n//# sourceURL="+g)+("\n//@ sourceURL="+g);try{c=eval(a+" = eval(code);")}catch(f){throw runtime.log("Error loading "+
a+" "+f),f;}return c}if(!IS_COMPILED_CODE&&!m.hasOwnProperty(a)){var g=a.split("."),d;d=l(g);if(!d&&(d=e(a),!d||Runtime.getFunctionName(d)!==g[g.length-1]))throw runtime.log("Loaded code is not for "+g[g.length-1]),"Loaded code is not for "+g[g.length-1];m[a]=!0}}})();
(function(l){function m(h){if(h.length){var a=h[0];runtime.readFile(a,"utf8",function(b,e){function g(){var a;(a=eval(l))&&runtime.exit(a)}var d="",l=e;-1!==a.indexOf("/")&&(d=a.substring(0,a.indexOf("/")));runtime.setCurrentDirectory(d);b||null===l?(runtime.log(b),runtime.exit(1)):g.apply(null,h)})}}l=l?Array.prototype.slice.call(l):[];"NodeJSRuntime"===runtime.type()?m(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?m(l):m(l.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function l(a){var c=[],b,f=a.length;for(b=0;b<f;b+=1)c[b]=a.charCodeAt(b)&255;return c}function m(a){var c,b="",f,k=a.length-2;for(f=0;f<k;f+=3)c=a[f]<<16|a[f+1]<<8|a[f+2],b+=u[c>>>18],b+=u[c>>>12&63],b+=u[c>>>6&63],b+=u[c&63];f===k+1?(c=a[f]<<4,b+=u[c>>>6],b+=u[c&63],b+="=="):f===k&&(c=a[f]<<10|a[f+1]<<2,b+=u[c>>>12],b+=u[c>>>6&63],b+=u[c&63],b+="=");return b}function h(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var c=[],b=a.length%4,f,k=a.length,n;for(f=0;f<k;f+=4)n=(s[a.charAt(f)]||
0)<<18|(s[a.charAt(f+1)]||0)<<12|(s[a.charAt(f+2)]||0)<<6|(s[a.charAt(f+3)]||0),c.push(n>>16,n>>8&255,n&255);c.length-=[0,0,2,1][b];return c}function a(a){var c=[],b,f=a.length,k;for(b=0;b<f;b+=1)k=a[b],128>k?c.push(k):2048>k?c.push(192|k>>>6,128|k&63):c.push(224|k>>>12&15,128|k>>>6&63,128|k&63);return c}function b(a){var c=[],b,f=a.length,k,n,g;for(b=0;b<f;b+=1)k=a[b],128>k?c.push(k):(b+=1,n=a[b],224>k?c.push((k&31)<<6|n&63):(b+=1,g=a[b],c.push((k&15)<<12|(n&63)<<6|g&63)));return c}function e(a){return m(l(a))}
function g(a){return String.fromCharCode.apply(String,h(a))}function d(a){return b(l(a))}function p(a){a=b(a);for(var c="",f=0;f<a.length;)c+=String.fromCharCode.apply(String,a.slice(f,f+45E3)),f+=45E3;return c}function c(a,c,b){var f="",k,n,g;for(g=c;g<b;g+=1)c=a.charCodeAt(g)&255,128>c?f+=String.fromCharCode(c):(g+=1,k=a.charCodeAt(g)&255,224>c?f+=String.fromCharCode((c&31)<<6|k&63):(g+=1,n=a.charCodeAt(g)&255,f+=String.fromCharCode((c&15)<<12|(k&63)<<6|n&63)));return f}function q(a,b){function f(){var d=
g+k;d>a.length&&(d=a.length);n+=c(a,g,d);g=d;d=g===a.length;b(n,d)&&!d&&runtime.setTimeout(f,0)}var k=1E5,n="",g=0;a.length<k?b(c(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),f())}function k(c){return a(l(c))}function f(c){return String.fromCharCode.apply(String,a(c))}function n(c){return String.fromCharCode.apply(String,a(l(c)))}var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=function(a){var c={},b,f;b=0;for(f=a.length;b<f;b+=1)c[a.charAt(b)]=b;return c}(u),x,
r,y=runtime.getWindow(),t,w;y&&y.btoa?(t=function(a){return y.btoa(a)},x=function(a){return t(n(a))}):(t=e,x=function(a){return m(k(a))});y&&y.atob?(w=function(a){return y.atob(a)},r=function(a){a=w(a);return c(a,0,a.length)}):(w=g,r=function(a){return p(h(a))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=m;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=h;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=a;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=b;this.convertUTF8StringToBase64=e;this.convertBase64ToUTF8String=g;this.convertUTF8StringToUTF16Array=d;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=p;this.convertUTF8StringToUTF16String=q;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=k;this.convertUTF16ArrayToUTF8String=f;this.convertUTF16StringToUTF8String=n;this.convertUTF16StringToBase64=x;this.convertBase64ToUTF16String=r;this.fromBase64=g;this.toBase64=e;this.atob=
w;this.btoa=t;this.utob=n;this.btou=q;this.encode=x;this.encodeURI=function(a){return x(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return r(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function l(){this.dl=this.fc=0}function m(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function h(a,c,b,f){this.good_length=a;this.max_lazy=c;this.nice_length=b;this.max_chain=f}function a(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=b;this.off=0}var b=8192,e,g,d,p,c=null,q,k,f,n,u,s,x,r,y,t,w,v,F,J,z,L,A,P,G,M,ea,na,N,oa,V,Z,O,S,B,H,E,T,X,R,Q,Y,$,U,ha,K,ga,ia,D,ja,ka,aa,C,ma,la,sa,ua,I=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],pa=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],qa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ra=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ta;ta=[new h(0,0,0,0),new h(4,4,8,4),new h(4,5,16,8),new h(4,6,32,32),new h(4,4,16,16),new h(8,16,32,32),new h(8,16,128,128),new h(8,32,128,256),new h(32,128,258,1024),new h(32,258,258,4096)];var W=function(f){c[k+q++]=f;if(k+q===b){var n;if(0!==q){null!==e?(f=e,e=e.next):f=new a;
f.next=null;f.len=f.off=0;null===g?g=d=f:d=d.next=f;f.len=q-k;for(n=0;n<f.len;n++)f.ptr[n]=c[k+n];q=k=0}}},fa=function(a){a&=65535;k+q<b-2?(c[k+q++]=a&255,c[k+q++]=a>>>8):(W(a&255),W(a>>>8))},ba=function(){w=(w<<5^n[A+3-1]&255)&8191;v=x[32768+w];x[A&32767]=v;x[32768+w]=A},ca=function(a,c){y>16-c?(r|=a<<y,fa(r),r=a>>16-y,y+=c-16):(r|=a<<y,y+=c)},da=function(a,c){ca(c[a].fc,c[a].dl)},Aa=function(a,c,b){return a[c].fc<a[b].fc||a[c].fc===a[b].fc&&$[c]<=$[b]},Ba=function(a,c,b){var f;for(f=0;f<b&&ua<sa.length;f++)a[c+
f]=sa.charCodeAt(ua++)&255;return f},xa=function(){var a,c,b=65536-M-A;if(-1===b)b--;else if(65274<=A){for(a=0;32768>a;a++)n[a]=n[a+32768];P-=32768;A-=32768;t-=32768;for(a=0;8192>a;a++)c=x[32768+a],x[32768+a]=32768<=c?c-32768:0;for(a=0;32768>a;a++)c=x[a],x[a]=32768<=c?c-32768:0;b+=32768}G||(a=Ba(n,A+M,b),0>=a?G=!0:M+=a)},Ca=function(a){var c=ea,b=A,f,k=L,g=32506<A?A-32506:0,d=A+258,e=n[b+k-1],v=n[b+k];L>=oa&&(c>>=2);do if(f=a,n[f+k]===v&&n[f+k-1]===e&&n[f]===n[b]&&n[++f]===n[b+1]){b+=2;f++;do++b;
while(n[b]===n[++f]&&n[++b]===n[++f]&&n[++b]===n[++f]&&n[++b]===n[++f]&&n[++b]===n[++f]&&n[++b]===n[++f]&&n[++b]===n[++f]&&n[++b]===n[++f]&&b<d);f=258-(d-b);b=d-258;if(f>k){P=a;k=f;if(258<=f)break;e=n[b+k-1];v=n[b+k]}a=x[a&32767]}while(a>g&&0!==--c);return k},va=function(a,b){s[D++]=b;0===a?V[b].fc++:(a--,V[U[b]+256+1].fc++,Z[(256>a?ha[a]:ha[256+(a>>7)])&255].fc++,u[ja++]=a,aa|=C);C<<=1;0===(D&7)&&(ia[ka++]=aa,aa=0,C=1);if(2<N&&0===(D&4095)){var c=8*D,f=A-t,k;for(k=0;30>k;k++)c+=Z[k].fc*(5+pa[k]);
c>>=3;if(ja<parseInt(D/2,10)&&c<parseInt(f/2,10))return!0}return 8191===D||8192===ja},ya=function(a,b){for(var c=R[b],f=b<<1;f<=Q;){f<Q&&Aa(a,R[f+1],R[f])&&f++;if(Aa(a,c,R[f]))break;R[b]=R[f];b=f;f<<=1}R[b]=c},Da=function(a,b){var c=0;do c|=a&1,a>>=1,c<<=1;while(0<--b);return c>>1},Ea=function(a,c){var b=[];b.length=16;var f=0,k;for(k=1;15>=k;k++)f=f+X[k-1]<<1,b[k]=f;for(f=0;f<=c;f++)k=a[f].dl,0!==k&&(a[f].fc=Da(b[k]++,k))},za=function(a){var b=a.dyn_tree,c=a.static_tree,f=a.elems,k,n=-1,g=f;Q=0;
Y=573;for(k=0;k<f;k++)0!==b[k].fc?(R[++Q]=n=k,$[k]=0):b[k].dl=0;for(;2>Q;)k=R[++Q]=2>n?++n:0,b[k].fc=1,$[k]=0,ma--,null!==c&&(la-=c[k].dl);a.max_code=n;for(k=Q>>1;1<=k;k--)ya(b,k);do k=R[1],R[1]=R[Q--],ya(b,1),c=R[1],R[--Y]=k,R[--Y]=c,b[g].fc=b[k].fc+b[c].fc,$[g]=$[k]>$[c]+1?$[k]:$[c]+1,b[k].dl=b[c].dl=g,R[1]=g++,ya(b,1);while(2<=Q);R[--Y]=R[1];g=a.dyn_tree;k=a.extra_bits;var f=a.extra_base,c=a.max_code,d=a.max_length,e=a.static_tree,v,h,s,l,m=0;for(h=0;15>=h;h++)X[h]=0;g[R[Y]].dl=0;for(a=Y+1;573>
a;a++)v=R[a],h=g[g[v].dl].dl+1,h>d&&(h=d,m++),g[v].dl=h,v>c||(X[h]++,s=0,v>=f&&(s=k[v-f]),l=g[v].fc,ma+=l*(h+s),null!==e&&(la+=l*(e[v].dl+s)));if(0!==m){do{for(h=d-1;0===X[h];)h--;X[h]--;X[h+1]+=2;X[d]--;m-=2}while(0<m);for(h=d;0!==h;h--)for(v=X[h];0!==v;)k=R[--a],k>c||(g[k].dl!==h&&(ma+=(h-g[k].dl)*g[k].fc,g[k].fc=h),v--)}Ea(b,n)},Fa=function(a,b){var c,f=-1,k,n=a[0].dl,g=0,d=7,e=4;0===n&&(d=138,e=3);a[b+1].dl=65535;for(c=0;c<=b;c++)k=n,n=a[c+1].dl,++g<d&&k===n||(g<e?B[k].fc+=g:0!==k?(k!==f&&B[k].fc++,
B[16].fc++):10>=g?B[17].fc++:B[18].fc++,g=0,f=k,0===n?(d=138,e=3):k===n?(d=6,e=3):(d=7,e=4))},Ga=function(){8<y?fa(r):0<y&&W(r);y=r=0},Ha=function(a,b){var c,f=0,k=0,n=0,g=0,d,e;if(0!==D){do 0===(f&7)&&(g=ia[n++]),c=s[f++]&255,0===(g&1)?da(c,a):(d=U[c],da(d+256+1,a),e=I[d],0!==e&&(c-=K[d],ca(c,e)),c=u[k++],d=(256>c?ha[c]:ha[256+(c>>7)])&255,da(d,b),e=pa[d],0!==e&&(c-=ga[d],ca(c,e))),g>>=1;while(f<D)}da(256,a)},Ia=function(a,c){var b,f=-1,k,n=a[0].dl,g=0,d=7,e=4;0===n&&(d=138,e=3);for(b=0;b<=c;b++)if(k=
n,n=a[b+1].dl,!(++g<d&&k===n)){if(g<e){do da(k,B);while(0!==--g)}else 0!==k?(k!==f&&(da(k,B),g--),da(16,B),ca(g-3,2)):10>=g?(da(17,B),ca(g-3,3)):(da(18,B),ca(g-11,7));g=0;f=k;0===n?(d=138,e=3):k===n?(d=6,e=3):(d=7,e=4)}},Ja=function(){var a;for(a=0;286>a;a++)V[a].fc=0;for(a=0;30>a;a++)Z[a].fc=0;for(a=0;19>a;a++)B[a].fc=0;V[256].fc=1;aa=D=ja=ka=ma=la=0;C=1},wa=function(a){var c,b,f,k;k=A-t;ia[ka]=aa;za(H);za(E);Fa(V,H.max_code);Fa(Z,E.max_code);za(T);for(f=18;3<=f&&0===B[ra[f]].dl;f--);ma+=3*(f+1)+
14;c=ma+3+7>>3;b=la+3+7>>3;b<=c&&(c=b);if(k+4<=c&&0<=t)for(ca(0+a,3),Ga(),fa(k),fa(~k),f=0;f<k;f++)W(n[t+f]);else if(b===c)ca(2+a,3),Ha(O,S);else{ca(4+a,3);k=H.max_code+1;c=E.max_code+1;f+=1;ca(k-257,5);ca(c-1,5);ca(f-4,4);for(b=0;b<f;b++)ca(B[ra[b]].dl,3);Ia(V,k-1);Ia(Z,c-1);Ha(V,Z)}Ja();0!==a&&Ga()},Ka=function(a,b,f){var n,d,v;for(n=0;null!==g&&n<f;){d=f-n;d>g.len&&(d=g.len);for(v=0;v<d;v++)a[b+n+v]=g.ptr[g.off+v];g.off+=d;g.len-=d;n+=d;0===g.len&&(d=g,g=g.next,d.next=e,e=d)}if(n===f)return n;
if(k<q){d=f-n;d>q-k&&(d=q-k);for(v=0;v<d;v++)a[b+n+v]=c[k+v];k+=d;n+=d;q===k&&(q=k=0)}return n},La=function(a,c,b){var d;if(!p){if(!G){y=r=0;var e,h;if(0===S[0].dl){H.dyn_tree=V;H.static_tree=O;H.extra_bits=I;H.extra_base=257;H.elems=286;H.max_length=15;H.max_code=0;E.dyn_tree=Z;E.static_tree=S;E.extra_bits=pa;E.extra_base=0;E.elems=30;E.max_length=15;E.max_code=0;T.dyn_tree=B;T.static_tree=null;T.extra_bits=qa;T.extra_base=0;T.elems=19;T.max_length=7;for(h=e=T.max_code=0;28>h;h++)for(K[h]=e,d=0;d<
1<<I[h];d++)U[e++]=h;U[e-1]=h;for(h=e=0;16>h;h++)for(ga[h]=e,d=0;d<1<<pa[h];d++)ha[e++]=h;for(e>>=7;30>h;h++)for(ga[h]=e<<7,d=0;d<1<<pa[h]-7;d++)ha[256+e++]=h;for(d=0;15>=d;d++)X[d]=0;for(d=0;143>=d;)O[d++].dl=8,X[8]++;for(;255>=d;)O[d++].dl=9,X[9]++;for(;279>=d;)O[d++].dl=7,X[7]++;for(;287>=d;)O[d++].dl=8,X[8]++;Ea(O,287);for(d=0;30>d;d++)S[d].dl=5,S[d].fc=Da(d,5);Ja()}for(d=0;8192>d;d++)x[32768+d]=0;na=ta[N].max_lazy;oa=ta[N].good_length;ea=ta[N].max_chain;t=A=0;M=Ba(n,0,65536);if(0>=M)G=!0,M=0;
else{for(G=!1;262>M&&!G;)xa();for(d=w=0;2>d;d++)w=(w<<5^n[d]&255)&8191}g=null;k=q=0;3>=N?(L=2,z=0):(z=2,J=0);f=!1}p=!0;if(0===M)return f=!0,0}d=Ka(a,c,b);if(d===b)return b;if(f)return d;if(3>=N)for(;0!==M&&null===g;){ba();0!==v&&32506>=A-v&&(z=Ca(v),z>M&&(z=M));if(3<=z)if(h=va(A-P,z-3),M-=z,z<=na){z--;do A++,ba();while(0!==--z);A++}else A+=z,z=0,w=n[A]&255,w=(w<<5^n[A+1]&255)&8191;else h=va(0,n[A]&255),M--,A++;h&&(wa(0),t=A);for(;262>M&&!G;)xa()}else for(;0!==M&&null===g;){ba();L=z;F=P;z=2;0!==v&&
(L<na&&32506>=A-v)&&(z=Ca(v),z>M&&(z=M),3===z&&4096<A-P&&z--);if(3<=L&&z<=L){h=va(A-1-F,L-3);M-=L-1;L-=2;do A++,ba();while(0!==--L);J=0;z=2;A++;h&&(wa(0),t=A)}else 0!==J?va(0,n[A-1]&255)&&(wa(0),t=A):J=1,A++,M--;for(;262>M&&!G;)xa()}0===M&&(0!==J&&va(0,n[A-1]&255),wa(1),f=!0);return d+Ka(a,d+c,b-d)};this.deflate=function(a,f){var k,v;sa=a;ua=0;"undefined"===String(typeof f)&&(f=6);(k=f)?1>k?k=1:9<k&&(k=9):k=6;N=k;G=p=!1;if(null===c){e=g=d=null;c=[];c.length=b;n=[];n.length=65536;u=[];u.length=8192;
s=[];s.length=32832;x=[];x.length=65536;V=[];V.length=573;for(k=0;573>k;k++)V[k]=new l;Z=[];Z.length=61;for(k=0;61>k;k++)Z[k]=new l;O=[];O.length=288;for(k=0;288>k;k++)O[k]=new l;S=[];S.length=30;for(k=0;30>k;k++)S[k]=new l;B=[];B.length=39;for(k=0;39>k;k++)B[k]=new l;H=new m;E=new m;T=new m;X=[];X.length=16;R=[];R.length=573;$=[];$.length=573;U=[];U.length=256;ha=[];ha.length=512;K=[];K.length=29;ga=[];ga.length=30;ia=[];ia.length=1024}var h=Array(1024),t=[],r=[];for(k=La(h,0,h.length);0<k;){r.length=
k;for(v=0;v<k;v++)r[v]=String.fromCharCode(h[v]);t[t.length]=r.join("");k=La(h,0,h.length)}sa=null;return t.join("")}};
// Input 4
core.ByteArray=function(l){this.pos=0;this.data=l;this.readUInt32LE=function(){this.pos+=4;var l=this.data,h=this.pos;return l[--h]<<24|l[--h]<<16|l[--h]<<8|l[--h]};this.readUInt16LE=function(){this.pos+=2;var l=this.data,h=this.pos;return l[--h]<<8|l[--h]}};
// Input 5
core.ByteArrayWriter=function(l){var m=this,h=new runtime.ByteArray(0);this.appendByteArrayWriter=function(a){h=runtime.concatByteArrays(h,a.getByteArray())};this.appendByteArray=function(a){h=runtime.concatByteArrays(h,a)};this.appendArray=function(a){h=runtime.concatByteArrays(h,runtime.byteArrayFromArray(a))};this.appendUInt16LE=function(a){m.appendArray([a&255,a>>8&255])};this.appendUInt32LE=function(a){m.appendArray([a&255,a>>8&255,a>>16&255,a>>24&255])};this.appendString=function(a){h=runtime.concatByteArrays(h,
runtime.byteArrayFromString(a,l))};this.getLength=function(){return h.length};this.getByteArray=function(){return h}};
// Input 6
core.RawInflate=function(){var l,m,h=null,a,b,e,g,d,p,c,q,k,f,n,u,s,x,r=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],y=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],t=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],w=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],v=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],F=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],J=function(){this.list=this.next=null},z=function(){this.n=this.b=this.e=0;this.t=null},L=function(a,c,b,f,k,d){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var n=Array(this.BMAX+1),g,e,v,h,s,l,m,t=Array(this.BMAX+1),x,p,u,r=new z,q=Array(this.BMAX);h=Array(this.N_MAX);var y,w=Array(this.BMAX+1),A,F,L;L=this.root=null;for(s=0;s<n.length;s++)n[s]=0;for(s=0;s<t.length;s++)t[s]=0;for(s=0;s<q.length;s++)q[s]=null;for(s=0;s<h.length;s++)h[s]=
0;for(s=0;s<w.length;s++)w[s]=0;g=256<c?a[256]:this.BMAX;x=a;p=0;s=c;do n[x[p]]++,p++;while(0<--s);if(n[0]==c)this.root=null,this.status=this.m=0;else{for(l=1;l<=this.BMAX&&0==n[l];l++);m=l;d<l&&(d=l);for(s=this.BMAX;0!=s&&0==n[s];s--);v=s;d>s&&(d=s);for(A=1<<l;l<s;l++,A<<=1)if(0>(A-=n[l])){this.status=2;this.m=d;return}if(0>(A-=n[s]))this.status=2,this.m=d;else{n[s]+=A;w[1]=l=0;x=n;p=1;for(u=2;0<--s;)w[u++]=l+=x[p++];x=a;s=p=0;do 0!=(l=x[p++])&&(h[w[l]++]=s);while(++s<c);c=w[v];w[0]=s=0;x=h;p=0;
h=-1;y=t[0]=0;u=null;for(F=0;m<=v;m++)for(a=n[m];0<a--;){for(;m>y+t[1+h];){y+=t[1+h];h++;F=(F=v-y)>d?d:F;if((e=1<<(l=m-y))>a+1)for(e-=a+1,u=m;++l<F&&!((e<<=1)<=n[++u]);)e-=n[u];y+l>g&&y<g&&(l=g-y);F=1<<l;t[1+h]=l;u=Array(F);for(e=0;e<F;e++)u[e]=new z;L=null==L?this.root=new J:L.next=new J;L.next=null;L.list=u;q[h]=u;0<h&&(w[h]=s,r.b=t[h],r.e=16+l,r.t=u,l=(s&(1<<y)-1)>>y-t[h],q[h-1][l].e=r.e,q[h-1][l].b=r.b,q[h-1][l].n=r.n,q[h-1][l].t=r.t)}r.b=m-y;p>=c?r.e=99:x[p]<b?(r.e=256>x[p]?16:15,r.n=x[p++]):
(r.e=k[x[p]-b],r.n=f[x[p++]-b]);e=1<<m-y;for(l=s>>y;l<F;l+=e)u[l].e=r.e,u[l].b=r.b,u[l].n=r.n,u[l].t=r.t;for(l=1<<m-1;0!=(s&l);l>>=1)s^=l;for(s^=l;(s&(1<<y)-1)!=w[h];)y-=t[h],h--}this.m=t[1];this.status=0!=A&&1!=v?1:0}}},A=function(a){for(;g<a;){var c=e,b;b=s.length==x?-1:s[x++];e=c|b<<g;g+=8}},P=function(a){return e&r[a]},G=function(a){e>>=a;g-=a},M=function(a,b,g){var e,v,h;if(0==g)return 0;for(h=0;;){A(n);v=k.list[P(n)];for(e=v.e;16<e;){if(99==e)return-1;G(v.b);e-=16;A(e);v=v.t[P(e)];e=v.e}G(v.b);
if(16==e)m&=32767,a[b+h++]=l[m++]=v.n;else{if(15==e)break;A(e);c=v.n+P(e);G(e);A(u);v=f.list[P(u)];for(e=v.e;16<e;){if(99==e)return-1;G(v.b);e-=16;A(e);v=v.t[P(e)];e=v.e}G(v.b);A(e);q=m-v.n-P(e);for(G(e);0<c&&h<g;)c--,q&=32767,m&=32767,a[b+h++]=l[m++]=l[q++]}if(h==g)return g}d=-1;return h},ea,na=function(a,c,b){var d,e,g,h,s,l,m,p=Array(316);for(d=0;d<p.length;d++)p[d]=0;A(5);l=257+P(5);G(5);A(5);m=1+P(5);G(5);A(4);d=4+P(4);G(4);if(286<l||30<m)return-1;for(e=0;e<d;e++)A(3),p[F[e]]=P(3),G(3);for(;19>
e;e++)p[F[e]]=0;n=7;e=new L(p,19,19,null,null,n);if(0!=e.status)return-1;k=e.root;n=e.m;h=l+m;for(d=g=0;d<h;)if(A(n),s=k.list[P(n)],e=s.b,G(e),e=s.n,16>e)p[d++]=g=e;else if(16==e){A(2);e=3+P(2);G(2);if(d+e>h)return-1;for(;0<e--;)p[d++]=g}else{17==e?(A(3),e=3+P(3),G(3)):(A(7),e=11+P(7),G(7));if(d+e>h)return-1;for(;0<e--;)p[d++]=0;g=0}n=9;e=new L(p,l,257,y,t,n);0==n&&(e.status=1);if(0!=e.status)return-1;k=e.root;n=e.m;for(d=0;d<m;d++)p[d]=p[d+l];u=6;e=new L(p,m,0,w,v,u);f=e.root;u=e.m;return 0==u&&
257<l||0!=e.status?-1:M(a,c,b)};this.inflate=function(r,F){null==l&&(l=Array(65536));g=e=m=0;d=-1;p=!1;c=q=0;k=null;s=r;x=0;var J=new runtime.ByteArray(F);a:{var z,O;for(z=0;z<F&&(!p||-1!=d);){if(0<c){if(0!=d)for(;0<c&&z<F;)c--,q&=32767,m&=32767,J[0+z++]=l[m++]=l[q++];else{for(;0<c&&z<F;)c--,m&=32767,A(8),J[0+z++]=l[m++]=P(8),G(8);0==c&&(d=-1)}if(z==F)break}if(-1==d){if(p)break;A(1);0!=P(1)&&(p=!0);G(1);A(2);d=P(2);G(2);k=null;c=0}switch(d){case 0:O=J;var S=0+z,B=F-z,H=void 0,H=g&7;G(H);A(16);H=P(16);
G(16);A(16);if(H!=(~e&65535))O=-1;else{G(16);c=H;for(H=0;0<c&&H<B;)c--,m&=32767,A(8),O[S+H++]=l[m++]=P(8),G(8);0==c&&(d=-1);O=H}break;case 1:if(null!=k)O=M(J,0+z,F-z);else b:{O=J;S=0+z;B=F-z;if(null==h){for(var E=void 0,H=Array(288),E=void 0,E=0;144>E;E++)H[E]=8;for(;256>E;E++)H[E]=9;for(;280>E;E++)H[E]=7;for(;288>E;E++)H[E]=8;b=7;E=new L(H,288,257,y,t,b);if(0!=E.status){alert("HufBuild error: "+E.status);O=-1;break b}h=E.root;b=E.m;for(E=0;30>E;E++)H[E]=5;ea=5;E=new L(H,30,0,w,v,ea);if(1<E.status){h=
null;alert("HufBuild error: "+E.status);O=-1;break b}a=E.root;ea=E.m}k=h;f=a;n=b;u=ea;O=M(O,S,B)}break;case 2:O=null!=k?M(J,0+z,F-z):na(J,0+z,F-z);break;default:O=-1}if(-1==O)break a;z+=O}}s=null;return J}};
// Input 7
/*

 Copyright (C) 2012 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
core.LoopWatchDog=function(l,m){var h=Date.now(),a=0;this.check=function(){var b;if(l&&(b=Date.now(),b-h>l))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<m&&(a+=1,a>m))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){function l(m,h){h&&Array.isArray(h)?m=(m||[]).concat(h.map(function(a){return l({},a)})):h&&"object"===typeof h?(m=m||{},Object.keys(h).forEach(function(a){m[a]=l(m[a],h[a])})):m=h;return m}this.hashString=function(l){var h=0,a,b;a=0;for(b=l.length;a<b;a+=1)h=(h<<5)-h+l.charCodeAt(a),h|=0;return h};this.mergeObjects=l};
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
 @source: http://gitorious.org/webodf/webodf/
*/
core.DomUtils=function(){function l(a,b){var e=null;a.nodeType===Node.TEXT_NODE&&(0===a.length?(a.parentNode.removeChild(a),b.nodeType===Node.TEXT_NODE&&(e=b)):(b.nodeType===Node.TEXT_NODE&&(a.appendData(b.data),b.parentNode.removeChild(b)),e=a));return e}function m(a,b){for(var e=0,g;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(g=b.firstChild;g!==a;)e+=1,g=g.nextSibling;return e}function h(a,b){return a===b||Boolean(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_CONTAINED_BY)}
this.splitBoundaries=function(a){var b=[],e;if(a.startContainer.nodeType===Node.TEXT_NODE||a.endContainer.nodeType===Node.TEXT_NODE){e=a.endContainer;var g=a.endOffset;if(g<e.childNodes.length)for(e=e.childNodes[g],g=0;e.firstChild;)e=e.firstChild;else for(;e.lastChild;)e=e.lastChild,g=e.nodeType===Node.TEXT_NODE?e.textContent.length:e.childNodes.length;a.setEnd(e,g);0!==a.endOffset&&(a.endContainer.nodeType===Node.TEXT_NODE&&a.endOffset!==a.endContainer.length)&&(b.push(a.endContainer.splitText(a.endOffset)),
b.push(a.endContainer));0!==a.startOffset&&(a.startContainer.nodeType===Node.TEXT_NODE&&a.startOffset!==a.startContainer.length)&&(e=a.startContainer.splitText(a.startOffset),b.push(a.startContainer),b.push(e),a.setStart(e,0))}return b};this.containsRange=function(a,b){return 0>=a.compareBoundaryPoints(a.START_TO_START,b)&&0<=a.compareBoundaryPoints(a.END_TO_END,b)};this.rangesIntersect=function(a,b){return 0>=a.compareBoundaryPoints(a.END_TO_START,b)&&0<=a.compareBoundaryPoints(a.START_TO_END,b)};
this.getNodesInRange=function(a,b){var e=[],g,d=a.startContainer.ownerDocument.createTreeWalker(a.commonAncestorContainer,NodeFilter.SHOW_ALL,b,!1);for(g=d.currentNode=a.startContainer;g;){if(b(g)===NodeFilter.FILTER_ACCEPT)e.push(g);else if(b(g)===NodeFilter.FILTER_REJECT)break;g=g.parentNode}e.reverse();for(g=d.nextNode();g;)e.push(g),g=d.nextNode();return e};this.normalizeTextNodes=function(a){a&&a.nextSibling&&(a=l(a,a.nextSibling));a&&a.previousSibling&&l(a.previousSibling,a)};this.rangeContainsNode=
function(a,b){var e=b.ownerDocument.createRange(),g=b.nodeType===Node.TEXT_NODE?b.length:b.childNodes.length;e.setStart(a.startContainer,a.startOffset);e.setEnd(a.endContainer,a.endOffset);g=0===e.comparePoint(b,0)&&0===e.comparePoint(b,g);e.detach();return g};this.mergeIntoParent=function(a){for(var b=a.parentNode;a.firstChild;)b.insertBefore(a.firstChild,a);b.removeChild(a);return b};this.getElementsByTagNameNS=function(a,b,e){return Array.prototype.slice.call(a.getElementsByTagNameNS(b,e))};this.rangeIntersectsNode=
function(a,b){var e=b.nodeType===Node.TEXT_NODE?b.length:b.childNodes.length;return 0>=a.comparePoint(b,0)&&0<=a.comparePoint(b,e)};this.containsNode=function(a,b){return a===b||a.contains(b)};this.comparePoints=function(a,b,e,g){if(a===e)return g-b;var d=a.compareDocumentPosition(e);2===d?d=-1:4===d?d=1:10===d?(b=m(a,e),d=b<g?1:-1):(g=m(e,a),d=g<b?-1:1);return d};(function(a){var b=runtime.getWindow();null!==b&&(b=b.navigator.appVersion.toLowerCase(),b=-1===b.indexOf("chrome")&&(-1!==b.indexOf("applewebkit")||
-1!==b.indexOf("safari")))&&(a.containsNode=h)})(this)};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(l,m){function h(a){a.parentNode&&(d.push(a.previousSibling),d.push(a.nextSibling),a.parentNode.removeChild(a))}function a(a,c,b){if(c.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(c),"putCursorIntoTextNode: invalid container");var e=c.parentNode;runtime.assert(Boolean(e),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=c.length,"putCursorIntoTextNode: offset is out of bounds");0===b?e.insertBefore(a,c):(b!==c.length&&c.splitText(b),e.insertBefore(a,
c.nextSibling))}else if(c.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(c),"putCursorIntoContainer: invalid container");for(e=c.firstChild;null!==e&&0<b;)e=e.nextSibling,b-=1;c.insertBefore(a,e)}d.push(a.previousSibling);d.push(a.nextSibling)}var b=l.createElementNS("urn:webodf:names:cursor","cursor"),e=l.createElementNS("urn:webodf:names:cursor","anchor"),g,d=[],p,c,q=new core.DomUtils;this.getNode=function(){return b};this.getAnchorNode=function(){return e.parentNode?e:b};this.getSelectedRange=
function(){c?(p.setStartBefore(b),p.collapse(!0)):(p.setStartAfter(g?e:b),p.setEndBefore(g?b:e));return p};this.setSelectedRange=function(k,f){p&&p!==k&&p.detach();p=k;g=!1!==f;(c=k.collapsed)?(h(e),h(b),a(b,k.startContainer,k.startOffset)):(h(e),h(b),a(g?b:e,k.endContainer,k.endOffset),a(g?e:b,k.startContainer,k.startOffset));d.forEach(q.normalizeTextNodes);d.length=0};this.remove=function(){h(b);d.forEach(q.normalizeTextNodes);d.length=0};b.setAttributeNS("urn:webodf:names:cursor","memberId",m);
e.setAttributeNS("urn:webodf:names:cursor","memberId",m)};
// Input 11
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
core.EventNotifier=function(l){var m={};this.emit=function(h,a){var b,e;runtime.assert(m.hasOwnProperty(h),'unknown event fired "'+h+'"');e=m[h];for(b=0;b<e.length;b+=1)e[b](a)};this.subscribe=function(h,a){runtime.assert(m.hasOwnProperty(h),'tried to subscribe to unknown event "'+h+'"');m[h].push(a);runtime.log('event "'+h+'" subscribed.')};this.unsubscribe=function(h,a){var b;runtime.assert(m.hasOwnProperty(h),'tried to unsubscribe from unknown event "'+h+'"');b=m[h].indexOf(a);runtime.assert(-1!==
b,'tried to unsubscribe unknown callback from event "'+h+'"');-1!==b&&m[h].splice(b,1);runtime.log('event "'+h+'" unsubscribed.')};(function(){var h;for(h=0;h<l.length;h+=1)m[l[h]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var l=runtime.getWindow().document,m=l.getElementById("testarea");runtime.assert(!m,'Unclean test environment, found a div with id "testarea".');m=l.createElement("div");m.setAttribute("id","testarea");l.body.appendChild(m);return m};
core.UnitTest.cleanupTestAreaDiv=function(){var l=runtime.getWindow().document,m=l.getElementById("testarea");runtime.assert(!!m&&m.parentNode===l.body,'Test environment broken, found no div with id "testarea" below body.');l.body.removeChild(m)};core.UnitTest.createOdtDocument=function(l,m){var h="<?xml version='1.0' encoding='UTF-8'?>",h=h+"<office:document";Object.keys(m).forEach(function(a){h+=" xmlns:"+a+'="'+m[a]+'"'});h+=">";h+=l;h+="</office:document>";return runtime.parseXML(h)};
core.UnitTestRunner=function(){function l(a){g+=1;runtime.log("fail",a)}function m(a,c){var b;try{if(a.length!==c.length)return l("array of length "+a.length+" should be "+c.length+" long"),!1;for(b=0;b<a.length;b+=1)if(a[b]!==c[b])return l(a[b]+" should be "+c[b]+" at array index "+b),!1}catch(k){return!1}return!0}function h(a,b,d){var k=a.attributes,f=k.length,e,g,s;for(e=0;e<f;e+=1)if(g=k.item(e),"xmlns"!==g.prefix){s=b.getAttributeNS(g.namespaceURI,g.localName);if(!b.hasAttributeNS(g.namespaceURI,
g.localName))return l("Attribute "+g.localName+" with value "+g.value+" was not present"),!1;if(s!==g.value)return l("Attribute "+g.localName+" was "+s+" should be "+g.value),!1}return d?!0:h(b,a,!0)}function a(b,c){if(b.nodeType!==c.nodeType)return l(b.nodeType+" should be "+c.nodeType),!1;if(b.nodeType===Node.TEXT_NODE)return b.data===c.data;runtime.assert(b.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(b.namespaceURI!==c.namespaceURI||b.localName!==c.localName)return l(b.namespaceURI+
" should be "+c.namespaceURI),!1;if(!h(b,c,!1))return!1;for(var d=b.firstChild,k=c.firstChild;d;){if(!k||!a(d,k))return!1;d=d.nextSibling;k=k.nextSibling}return k?!1:!0}function b(b,c){return 0===c?b===c&&1/b===1/c:b===c?!0:"number"===typeof c&&isNaN(c)?"number"===typeof b&&isNaN(b):Object.prototype.toString.call(c)===Object.prototype.toString.call([])?m(b,c):"object"===typeof c&&"object"===typeof b?c.constructor===Element||c.constructor===Node?a(c,b):d(c,b):!1}function e(a,c,d){"string"===typeof c&&
"string"===typeof d||runtime.log("WARN: shouldBe() expects string arguments");var k,f;try{f=eval(c)}catch(e){k=e}a=eval(d);k?l(c+" should be "+a+". Threw exception "+k):b(f,a)?runtime.log("pass",c+" is "+d):String(typeof f)===String(typeof a)?(d=0===f&&0>1/f?"-0":String(f),l(c+" should be "+a+". Was "+d+".")):l(c+" should be "+a+" (of type "+typeof a+"). Was "+f+" (of type "+typeof f+").")}var g=0,d;d=function(a,c){var d=Object.keys(a),k=Object.keys(c);d.sort();k.sort();return m(d,k)&&Object.keys(a).every(function(f){var k=
a[f],d=c[f];return b(k,d)?!0:(l(k+" should be "+d+" for key "+f),!1)})};this.areNodesEqual=a;this.shouldBeNull=function(a,b){e(a,b,"null")};this.shouldBeNonNull=function(a,b){var d,k;try{k=eval(b)}catch(f){d=f}d?l(b+" should be non-null. Threw exception "+d):null!==k?runtime.log("pass",b+" is non-null."):l(b+" should be non-null. Was "+k)};this.shouldBe=e;this.countFailedTests=function(){return g}};
core.UnitTester=function(){function l(a,b){return"<span style='color:blue;cursor:pointer' onclick='"+b+"'>"+a+"</span>"}var m=0,h={};this.runTests=function(a,b,e){function g(a){if(0===a.length)h[d]=q,m+=p.countFailedTests(),b();else{f=a[0];var k=Runtime.getFunctionName(f);runtime.log("Running "+k);u=p.countFailedTests();c.setUp();f(function(){c.tearDown();q[k]=u===p.countFailedTests();g(a.slice(1))})}}var d=Runtime.getFunctionName(a),p=new core.UnitTestRunner,c=new a(p),q={},k,f,n,u,s="BrowserRuntime"===
runtime.type();if(h.hasOwnProperty(d))runtime.log("Test "+d+" has already run.");else{s?runtime.log("<span>Running "+l(d,'runSuite("'+d+'");')+": "+c.description()+"</span>"):runtime.log("Running "+d+": "+c.description);n=c.tests();for(k=0;k<n.length;k+=1)f=n[k],a=Runtime.getFunctionName(f)||f.testName,e.length&&-1===e.indexOf(a)||(s?runtime.log("<span>Running "+l(a,'runTest("'+d+'","'+a+'")')+"</span>"):runtime.log("Running "+a),u=p.countFailedTests(),c.setUp(),f(),c.tearDown(),q[a]=u===p.countFailedTests());
g(c.asyncTests())}};this.countFailedTests=function(){return m};this.results=function(){return h}};
// Input 13
core.PositionIterator=function(l,m,h,a){function b(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function e(a){this.acceptNode=function(b){return b.nodeType===Node.TEXT_NODE&&0===b.length?NodeFilter.FILTER_REJECT:a.acceptNode(b)}}function g(){var a=p.currentNode.nodeType;c=a===Node.TEXT_NODE?p.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var d=this,p,c,q;this.nextPosition=function(){if(p.currentNode===l)return!1;
if(0===c&&p.currentNode.nodeType===Node.ELEMENT_NODE)null===p.firstChild()&&(c=1);else if(p.currentNode.nodeType===Node.TEXT_NODE&&c+1<p.currentNode.length)c+=1;else if(null!==p.nextSibling())c=0;else if(p.parentNode())c=1;else return!1;return!0};this.previousPosition=function(){var a=!0;if(0===c)if(null===p.previousSibling()){if(!p.parentNode()||p.currentNode===l)return p.firstChild(),!1;c=0}else g();else p.currentNode.nodeType===Node.TEXT_NODE?c-=1:null!==p.lastChild()?g():p.currentNode===l?a=!1:
c=0;return a};this.container=function(){var a=p.currentNode,b=a.nodeType;return 0===c&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=p.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&c===a.length)for(a=a.nextSibling;a&&1!==q(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===c&&(a=null);return a};this.leftNode=function(){var a=p.currentNode;if(0===c)for(a=a.previousSibling;a&&1!==q(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==q(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return p.currentNode};this.unfilteredDomOffset=function(){if(p.currentNode.nodeType===Node.TEXT_NODE)return c;for(var a=0,b=p.currentNode,b=1===c?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=function(){var a=p.currentNode,b=p.previousSibling();p.currentNode=a;return b};this.getNextSibling=function(){var a=p.currentNode,b=p.nextSibling();p.currentNode=a;return b};this.setUnfilteredPosition=function(a,
b){var e,g;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");p.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return c=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),b===a.length&&(c=void 0,p.nextSibling()?c=0:p.parentNode()&&(c=1),runtime.assert(void 0!==c,"Error in setPosition: position not valid.")),!0;e=q(a);for(g=a.parentNode;g&&g!==l&&e===NodeFilter.FILTER_ACCEPT;)e=
q(g),e!==NodeFilter.FILTER_ACCEPT&&(p.currentNode=g),g=g.parentNode;b<a.childNodes.length&&e!==NodeFilter.FILTER_REJECT?(p.currentNode=a.childNodes[b],e=q(p.currentNode),c=0):c=0===b?0:1;e===NodeFilter.FILTER_REJECT&&(c=1);if(e!==NodeFilter.FILTER_ACCEPT)return d.nextPosition();runtime.assert(q(p.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");return!0};this.moveToEnd=function(){p.currentNode=l;c=1};this.moveToEndOfNode=
function(a){a.nodeType===Node.TEXT_NODE?d.setUnfilteredPosition(a,a.length):(p.currentNode=a,c=1)};this.getNodeFilter=function(){return q};q=(h?new e(h):new b).acceptNode;q.acceptNode=q;p=l.ownerDocument.createTreeWalker(l,m||4294967295,q,a);c=0;null===p.firstChild()&&(c=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(l){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var l={},m=core.PositionFilter.FilterResult.FILTER_ACCEPT,h=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(a){for(var b in l)if(l.hasOwnProperty(b)&&l[b].acceptPosition(a)===h)return h;return m};this.addFilter=function(a,b){l[a]=b};this.removeFilter=function(a){delete l[a]}};
// Input 16
core.Async=function(){this.forEach=function(l,m,h){function a(a){g!==e&&(a?(g=e,h(a)):(g+=1,g===e&&h(null)))}var b,e=l.length,g=0;for(b=0;b<e;b+=1)m(l[b],a)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(l,m){function h(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],c,f,k=a.length,d=0,d=0;c=-1;for(f=0;f<k;f+=1)d=(c^a[f])&255,d=b[d],c=c>>>8^d;return c^-1}function a(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function b(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function e(b,c){var f,k,d,e,g,n,h,s=this;this.load=function(a){if(void 0!==s.data)a(null,s.data);else{var c=g+34+k+d+256;c+h>u&&(c=u-h);runtime.read(b,h,c,function(c,f){if(c||null===f)a(c,f);else a:{var k=f,d=new core.ByteArray(k),h=d.readUInt32LE(),v;if(67324752!==h)a("File entry signature is wrong."+h.toString()+" "+k.length.toString(),null);else{d.pos+=22;h=d.readUInt16LE();v=d.readUInt16LE();d.pos+=h+v;
if(e){k=k.slice(d.pos,d.pos+g);if(g!==k.length){a("The amount of compressed bytes read was "+k.length.toString()+" instead of "+g.toString()+" for "+s.filename+" in "+b+".",null);break a}k=x(k,n)}else k=k.slice(d.pos,d.pos+n);n!==k.length?a("The amount of bytes read was "+k.length.toString()+" instead of "+n.toString()+" for "+s.filename+" in "+b+".",null):(s.data=k,a(null,k))}}})}};this.set=function(a,b,c,f){s.filename=a;s.data=b;s.compressed=c;s.date=f};this.error=null;c&&(f=c.readUInt32LE(),33639248!==
f?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+b+'": '+c.data.length.toString():(c.pos+=6,e=c.readUInt16LE(),this.date=a(c.readUInt32LE()),c.readUInt32LE(),g=c.readUInt32LE(),n=c.readUInt32LE(),k=c.readUInt16LE(),d=c.readUInt16LE(),f=c.readUInt16LE(),c.pos+=8,h=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.slice(c.pos,c.pos+k),"utf8"),c.pos+=k+d+f))}function g(a,b){if(22!==a.length)b("Central directory length should be 22.",
r);else{var c=new core.ByteArray(a),f;f=c.readUInt32LE();101010256!==f?b("Central directory signature is wrong: "+f.toString(),r):(f=c.readUInt16LE(),0!==f?b("Zip files with non-zero disk numbers are not supported.",r):(f=c.readUInt16LE(),0!==f?b("Zip files with non-zero disk numbers are not supported.",r):(f=c.readUInt16LE(),s=c.readUInt16LE(),f!==s?b("Number of entries is inconsistent.",r):(f=c.readUInt32LE(),c=c.readUInt16LE(),c=u-22-f,runtime.read(l,c,u-c,function(a,c){if(a||null===c)b(a,r);else a:{var f=
new core.ByteArray(c),k,d;n=[];for(k=0;k<s;k+=1){d=new e(l,f);if(d.error){b(d.error,r);break a}n[n.length]=d}b(null,r)}})))))}}function d(a,b){var c=null,f,k;for(k=0;k<n.length;k+=1)if(f=n[k],f.filename===a){c=f;break}c?c.data?b(null,c.data):c.load(b):b(a+" not found.",null)}function p(a){var c=new core.ByteArrayWriter("utf8"),f=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(f=a.data.length);c.appendUInt32LE(b(a.date));c.appendUInt32LE(h(a.data));c.appendUInt32LE(f);c.appendUInt32LE(f);c.appendUInt16LE(a.filename.length);
c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function c(a,c){var f=new core.ByteArrayWriter("utf8"),k=0;f.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(k=a.data.length);f.appendUInt32LE(b(a.date));f.appendUInt32LE(h(a.data));f.appendUInt32LE(k);f.appendUInt32LE(k);f.appendUInt16LE(a.filename.length);f.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);f.appendUInt32LE(c);f.appendString(a.filename);return f}function q(a,b){if(a===n.length)b(null);else{var c=n[a];
void 0!==c.data?q(a+1,b):c.load(function(c){c?b(c):q(a+1,b)})}}function k(a,b){q(0,function(f){if(f)b(f);else{f=new core.ByteArrayWriter("utf8");var k,d,e,g=[0];for(k=0;k<n.length;k+=1)f.appendByteArrayWriter(p(n[k])),g.push(f.getLength());e=f.getLength();for(k=0;k<n.length;k+=1)d=n[k],f.appendByteArrayWriter(c(d,g[k]));k=f.getLength()-e;f.appendArray([80,75,5,6,0,0,0,0]);f.appendUInt16LE(n.length);f.appendUInt16LE(n.length);f.appendUInt32LE(k);f.appendUInt32LE(e);f.appendArray([0,0]);a(f.getByteArray())}})}
function f(a,b){k(function(c){runtime.writeFile(a,c,b)},b)}var n,u,s,x=(new core.RawInflate).inflate,r=this,y=new core.Base64;this.load=d;this.save=function(a,b,c,f){var k,d;for(k=0;k<n.length;k+=1)if(d=n[k],d.filename===a){d.set(a,b,c,f);return}d=new e(l);d.set(a,b,c,f);n.push(d)};this.write=function(a){f(l,a)};this.writeAs=f;this.createByteArray=k;this.loadContentXmlAsFragments=function(a,b){r.loadAsString(a,function(a,c){if(a)return b.rootElementReady(a);b.rootElementReady(null,c,!0)})};this.loadAsString=
function(a,b){d(a,function(a,c){if(a||null===c)return b(a,null);var f=runtime.byteArrayToString(c,"utf8");b(null,f)})};this.loadAsDOM=function(a,b){r.loadAsString(a,function(a,c){if(a||null===c)b(a,null);else{var f=(new DOMParser).parseFromString(c,"text/xml");b(null,f)}})};this.loadAsDataURL=function(a,b,c){d(a,function(a,f){if(a)return c(a,null);var k=0,d;b||(b=80===f[1]&&78===f[2]&&71===f[3]?"image/png":255===f[0]&&216===f[1]&&255===f[2]?"image/jpeg":71===f[0]&&73===f[1]&&70===f[2]?"image/gif":
"");for(d="data:"+b+";base64,";k<f.length;)d+=y.convertUTF8ArrayToBase64(f.slice(k,Math.min(k+45E3,f.length))),k+=45E3;c(null,d)})};this.getEntries=function(){return n.slice()};u=-1;null===m?n=[]:runtime.getFileSize(l,function(a){u=a;0>u?m("File '"+l+"' cannot be read.",r):runtime.read(l,u-22,22,function(a,b){a||null===m||null===b?m(a,r):g(b,m)})})};
// Input 18
core.CSSUnits=function(){var l={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(m,h,a){return m*l[a]/l[h]};this.convertMeasure=function(l,h){var a,b;l&&h?(a=parseFloat(l),b=l.replace(a.toString(),""),a=this.convert(a,b,h)):a="";return a.toString()};this.getUnits=function(l){return l.substr(l.length-2,l.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(l){var m=function(){};m.prototype=l;return new m});
xmldom.LSSerializer=function(){function l(a){var e=a||{},g=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[a[c]]=c);return b}(a),d=[e],h=[g],c=0;this.push=function(){c+=1;e=d[c]=Object.create(e);g=h[c]=Object.create(g)};this.pop=function(){d[c]=void 0;h[c]=void 0;c-=1;e=d[c];g=h[c]};this.getLocalNamespaceDefinitions=function(){return g};this.getQName=function(a){var b=a.namespaceURI,c=0,d;if(!b)return a.localName;if(d=g[b])return d+":"+a.localName;do{d||!a.prefix?(d="ns"+c,c+=1):d=a.prefix;
if(e[d]===b)break;if(!e[d]){e[d]=b;g[b]=d;break}d=null}while(null===d);return d+":"+a.localName}}function m(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function h(b,e){var g="",d=a.filter?a.filter.acceptNode(e):NodeFilter.FILTER_ACCEPT,l;if(d===NodeFilter.FILTER_ACCEPT&&e.nodeType===Node.ELEMENT_NODE){b.push();l=b.getQName(e);var c,q=e.attributes,k,f,n,u="",s;c="<"+l;k=q.length;for(f=0;f<k;f+=1)n=q.item(f),"http://www.w3.org/2000/xmlns/"!==
n.namespaceURI&&(s=a.filter?a.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,s===NodeFilter.FILTER_ACCEPT&&(s=b.getQName(n),n="string"===typeof n.value?m(n.value):n.value,u+=" "+(s+'="'+n+'"')));k=b.getLocalNamespaceDefinitions();for(f in k)k.hasOwnProperty(f)&&((q=k[f])?"xmlns"!==q&&(c+=" xmlns:"+k[f]+'="'+f+'"'):c+=' xmlns="'+f+'"');g+=c+(u+">")}if(d===NodeFilter.FILTER_ACCEPT||d===NodeFilter.FILTER_SKIP){for(d=e.firstChild;d;)g+=h(b,d),d=d.nextSibling;e.nodeValue&&(g+=m(e.nodeValue))}l&&(g+="</"+
l+">",b.pop());return g}var a=this;this.filter=null;this.writeToString=function(a,e){if(!a)return"";var g=new l(e);return h(g,a)}};
// Input 21
xmldom.RelaxNGParser=function(){function l(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function m(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return m({name:a.name,e:[b].concat(a.e.slice(2))})}function h(a){a=a.split(":",2);var b="",k;1===a.length?a=["",a[0]]:b=a[0];for(k in d)d[k]===b&&(a[0]=k);return a}function a(b,d){for(var k=0,f,e,g=b.name;b.e&&k<b.e.length;)if(f=
b.e[k],"ref"===f.name){e=d[f.a.name];if(!e)throw f.a.name+" was not defined.";f=b.e.slice(k+1);b.e=b.e.slice(0,k);b.e=b.e.concat(e.e);b.e=b.e.concat(f)}else k+=1,a(f,d);f=b.e;"choice"!==g||f&&f[1]&&"empty"!==f[1].name||(f&&f[0]&&"empty"!==f[0].name?(f[1]=f[0],f[0]={name:"empty"}):(delete b.e,b.name="empty"));if("group"===g||"interleave"===g)"empty"===f[0].name?"empty"===f[1].name?(delete b.e,b.name="empty"):(g=b.name=f[1].name,b.names=f[1].names,f=b.e=f[1].e):"empty"===f[1].name&&(g=b.name=f[0].name,
b.names=f[0].names,f=b.e=f[0].e);"oneOrMore"===g&&"empty"===f[0].name&&(delete b.e,b.name="empty");if("attribute"===g){e=b.names?b.names.length:0;for(var s,l=[],m=[],k=0;k<e;k+=1)s=h(b.names[k]),m[k]=s[0],l[k]=s[1];b.localnames=l;b.namespaces=m}"interleave"===g&&("interleave"===f[0].name?b.e="interleave"===f[1].name?f[0].e.concat(f[1].e):[f[1]].concat(f[0].e):"interleave"===f[1].name&&(b.e=[f[0]].concat(f[1].e)))}function b(a,d){for(var k=0,f;a.e&&k<a.e.length;)f=a.e[k],"elementref"===f.name?(f.id=
f.id||0,a.e[k]=d[f.id]):"element"!==f.name&&b(f,d),k+=1}var e=this,g,d={"http://www.w3.org/XML/1998/namespace":"xml"},p;p=function(a,b,k){var f=[],e,g,l=a.localName,x=[];e=a.attributes;var r=l,y=x,t={},w,v;for(w=0;w<e.length;w+=1)if(v=e.item(w),v.namespaceURI)"http://www.w3.org/2000/xmlns/"===v.namespaceURI&&(d[v.value]=v.localName);else{"name"!==v.localName||"element"!==r&&"attribute"!==r||y.push(v.value);if("name"===v.localName||"combine"===v.localName||"type"===v.localName){var F=v,J;J=v.value;
J=J.replace(/^\s\s*/,"");for(var z=/\s/,L=J.length-1;z.test(J.charAt(L));)L-=1;J=J.slice(0,L+1);F.value=J}t[v.localName]=v.value}e=t;e.combine=e.combine||void 0;a=a.firstChild;r=f;y=x;for(t="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(w=p(a,b,r))"name"===w.name?y.push(d[w.a.ns]+":"+w.text):"choice"===w.name&&(w.names&&w.names.length)&&(y=y.concat(w.names),delete w.names),r.push(w)}else a.nodeType===Node.TEXT_NODE&&(t+=a.nodeValue);a=a.nextSibling}a=
t;"value"!==l&&"param"!==l&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===l&&void 0===e.type&&(e.type="token",e.datatypeLibrary="");"attribute"!==l&&"element"!==l||void 0===e.name||(g=h(e.name),f=[{name:"name",text:g[1],a:{ns:g[0]}}].concat(f),delete e.name);"name"===l||"nsName"===l||"value"===l?void 0===e.ns&&(e.ns=""):delete e.ns;"name"===l&&(g=h(a),e.ns=g[0],a=g[1]);1<f.length&&("define"===l||"oneOrMore"===l||"zeroOrMore"===l||"optional"===l||"list"===l||"mixed"===l)&&(f=[{name:"group",e:m({name:"group",
e:f}).e}]);2<f.length&&"element"===l&&(f=[f[0]].concat({name:"group",e:m({name:"group",e:f.slice(1)}).e}));1===f.length&&"attribute"===l&&f.push({name:"text",text:a});1!==f.length||"choice"!==l&&"group"!==l&&"interleave"!==l?2<f.length&&("choice"===l||"group"===l||"interleave"===l)&&(f=m({name:l,e:f}).e):(l=f[0].name,x=f[0].names,e=f[0].a,a=f[0].text,f=f[0].e);"mixed"===l&&(l="interleave",f=[f[0],{name:"text"}]);"optional"===l&&(l="choice",f=[f[0],{name:"empty"}]);"zeroOrMore"===l&&(l="choice",f=
[{name:"oneOrMore",e:[f[0]]},{name:"empty"}]);if("define"===l&&e.combine){a:{r=e.combine;y=e.name;t=f;for(w=0;k&&w<k.length;w+=1)if(v=k[w],"define"===v.name&&v.a&&v.a.name===y){v.e=[{name:r,e:v.e.concat(t)}];k=v;break a}k=null}if(k)return}k={name:l};f&&0<f.length&&(k.e=f);for(g in e)if(e.hasOwnProperty(g)){k.a=e;break}void 0!==a&&(k.text=a);x&&0<x.length&&(k.names=x);"element"===l&&(k.id=b.length,b.push(k),k={name:"elementref",id:k.id});return k};this.parseRelaxNGDOM=function(c,h){var k=[],f=p(c&&
c.documentElement,k,void 0),n,m,s={};for(n=0;n<f.e.length;n+=1)m=f.e[n],"define"===m.name?s[m.a.name]=m:"start"===m.name&&(g=m);if(!g)return[new l("No Relax NG start element was found.")];a(g,s);for(n in s)s.hasOwnProperty(n)&&a(s[n],s);for(n=0;n<k.length;n+=1)a(k[n],s);h&&(e.rootPattern=h(g.e[0],k));b(g,k);for(n=0;n<k.length;n+=1)b(k[n],k);e.start=g;e.elements=k;e.nsmap=d;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function l(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function m(a,b){return function(){var c={},f=0;return function(d){var k=d.hash||d.toString(),e;e=c[k];if(void 0!==e)return e;c[k]=e=b(d);e.hash=a+f.toString();f+=1;return e}}()}function h(a){return function(){var b={};return function(c){var f,d;d=b[c.localName];if(void 0===d)b[c.localName]=d={};else if(f=d[c.namespaceURI],void 0!==f)return f;return d[c.namespaceURI]=f=a(c)}}()}function a(a,
b,c){return function(){var f={},d=0;return function(k,e){var g=b&&b(k,e),n,h;if(void 0!==g)return g;g=k.hash||k.toString();n=e.hash||e.toString();h=f[g];if(void 0===h)f[g]=h={};else if(g=h[n],void 0!==g)return g;h[n]=g=c(k,e);g.hash=a+d.toString();d+=1;return g}}()}function b(a,c){"choice"===c.p1.type?b(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?b(a,c.p2):a[c.p2.hash]=c.p2}function e(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return w},startTagOpenDeriv:function(c){return a.contains(c)?
n(b,v):w},attDeriv:function(){return w},startTagCloseDeriv:function(){return this}}}function g(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return v}}}function d(a,b,f,k){if(b===w)return w;if(k>=f.length)return b;0===k&&(k=0);for(var e=f.item(k);e.namespaceURI===c;){k+=1;if(k>=f.length)return b;e=f.item(k)}return e=d(a,b.attDeriv(a,f.item(k)),f,k+1)}function p(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):p(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
p(a,b,c.e[1])}var c="http://www.w3.org/2000/xmlns/",q,k,f,n,u,s,x,r,y,t,w={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return w},startTagOpenDeriv:function(){return w},attDeriv:function(){return w},startTagCloseDeriv:function(){return w},endTagDeriv:function(){return w}},v={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return w},startTagOpenDeriv:function(){return w},attDeriv:function(){return w},startTagCloseDeriv:function(){return v},endTagDeriv:function(){return w}},
F={type:"text",nullable:!0,hash:"text",textDeriv:function(){return F},startTagOpenDeriv:function(){return w},attDeriv:function(){return w},startTagCloseDeriv:function(){return F},endTagDeriv:function(){return w}},J,z,L;q=a("choice",function(a,b){if(a===w)return b;if(b===w||a===b)return a},function(a,c){var f={},k;b(f,{p1:a,p2:c});c=a=void 0;for(k in f)f.hasOwnProperty(k)&&(void 0===a?a=f[k]:c=void 0===c?f[k]:q(c,f[k]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,f){return q(a.textDeriv(c,f),b.textDeriv(c,f))},startTagOpenDeriv:h(function(c){return q(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,f){return q(a.attDeriv(c,f),b.attDeriv(c,f))},startTagCloseDeriv:l(function(){return q(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:l(function(){return q(a.endTagDeriv(),b.endTagDeriv())})}}(a,c)});k=function(a,b,c){return function(){var f={},k=0;return function(d,e){var g=b&&b(d,e),n,h;if(void 0!==g)return g;
g=d.hash||d.toString();n=e.hash||e.toString();g<n&&(h=g,g=n,n=h,h=d,d=e,e=h);h=f[g];if(void 0===h)f[g]=h={};else if(g=h[n],void 0!==g)return g;h[n]=g=c(d,e);g.hash=a+k.toString();k+=1;return g}}()}("interleave",function(a,b){if(a===w||b===w)return w;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,f){return q(k(a.textDeriv(c,f),b),k(a,b.textDeriv(c,f)))},startTagOpenDeriv:h(function(c){return q(J(function(a){return k(a,
b)},a.startTagOpenDeriv(c)),J(function(b){return k(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,f){return q(k(a.attDeriv(c,f),b),k(a,b.attDeriv(c,f)))},startTagCloseDeriv:l(function(){return k(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});f=a("group",function(a,b){if(a===w||b===w)return w;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,k){var d=f(a.textDeriv(c,k),b);return a.nullable?q(d,b.textDeriv(c,
k)):d},startTagOpenDeriv:function(c){var k=J(function(a){return f(a,b)},a.startTagOpenDeriv(c));return a.nullable?q(k,b.startTagOpenDeriv(c)):k},attDeriv:function(c,k){return q(f(a.attDeriv(c,k),b),f(a,b.attDeriv(c,k)))},startTagCloseDeriv:l(function(){return f(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});n=a("after",function(a,b){if(a===w||b===w)return w},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,f){return n(a.textDeriv(c,f),b)},startTagOpenDeriv:h(function(c){return J(function(a){return n(a,
b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,f){return n(a.attDeriv(c,f),b)},startTagCloseDeriv:l(function(){return n(a.startTagCloseDeriv(),b)}),endTagDeriv:l(function(){return a.nullable?b:w})}});u=m("oneormore",function(a){return a===w?w:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return f(a.textDeriv(b,c),q(this,v))},startTagOpenDeriv:function(b){var c=this;return J(function(a){return f(a,q(c,v))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return f(a.attDeriv(b,
c),q(this,v))},startTagCloseDeriv:l(function(){return u(a.startTagCloseDeriv())})}});x=a("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,f){return a.contains(f)&&(b.nullable&&/^\s+$/.test(f.nodeValue)||b.textDeriv(c,f.nodeValue).nullable)?v:w},startTagCloseDeriv:function(){return w}}});s=m("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?v:w},attDeriv:function(){return w},startTagCloseDeriv:function(){return this}}});
y=m("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return v},attDeriv:function(){return w},startTagCloseDeriv:function(){return this}}});J=function P(a,b){return"after"===b.type?n(b.p1,a(b.p2)):"choice"===b.type?q(P(a,b.p1),P(a,b.p2)):b};z=function(a,b,c){var f=c.currentNode;b=b.startTagOpenDeriv(f);b=d(a,b,f.attributes,0);var k=b=b.startTagCloseDeriv(),f=c.currentNode;b=c.firstChild();for(var e=[],g;b;)b.nodeType===Node.ELEMENT_NODE?e.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||e.push(b.nodeValue),b=c.nextSibling();0===e.length&&(e=[""]);g=k;for(k=0;g!==w&&k<e.length;k+=1)b=e[k],"string"===typeof b?g=/^\s*$/.test(b)?q(g,g.textDeriv(a,b)):g.textDeriv(a,b):(c.currentNode=b,g=z(a,g,c));c.currentNode=f;return b=g.endTagDeriv()};r=function(a){var b,c,f;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];p(b,c,a);a="";for(f=0;f<b.length;f+=
1)a+="{"+c[f]+"}"+b[f]+",";a={hash:a,contains:function(a){var f;for(f=0;f<b.length;f+=1)if(b[f]===a.localName&&c[f]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};t=function G(a,b){var c,d;if("elementref"===a.name){c=a.id||0;a=b[c];if(void 0!==a.name){var n=a;c=b[n.id]={hash:"element"+n.id.toString()};n=e(r(n.e[0]),t(n.e[1],b));for(d in n)n.hasOwnProperty(d)&&(c[d]=n[d]);return c}return a}switch(a.name){case "empty":return v;case "notAllowed":return w;
case "text":return F;case "choice":return q(G(a.e[0],b),G(a.e[1],b));case "interleave":c=G(a.e[0],b);for(d=1;d<a.e.length;d+=1)c=k(c,G(a.e[d],b));return c;case "group":return f(G(a.e[0],b),G(a.e[1],b));case "oneOrMore":return u(G(a.e[0],b));case "attribute":return x(r(a.e[0]),G(a.e[1],b));case "value":return s(a.text);case "data":return c=a.a&&a.a.type,void 0===c&&(c=""),y(c);case "list":return g()}throw"No support for "+a.name;};this.makePattern=function(a,b){var c={},f;for(f in b)b.hasOwnProperty(f)&&
(c[f]=b[f]);return f=t(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=z(null,L,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){L=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function l(a,b){this.message=function(){b&&(a+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function m(a,d,e,c){return"empty"===a.name?null:b(a,d,e,c)}function h(a,b){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var h=b.currentNode,c=h?h.nodeType:0,q=null;c>Node.ELEMENT_NODE;){if(c!==Node.COMMENT_NODE&&(c!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new l("Not allowed node of type "+
c+".")];c=(h=b.nextSibling())?h.nodeType:0}if(!h)return[new l("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(e[h.namespaceURI]+":"+h.localName))return[new l("Found "+h.nodeName+" instead of "+a.names+".",h)];if(b.firstChild()){for(q=m(a.e[1],b,h);b.nextSibling();)if(c=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||c===Node.COMMENT_NODE))return[new l("Spurious content.",b.currentNode)];if(b.parentNode()!==h)return[new l("Implementation error.")]}else q=
m(a.e[1],b,h);b.nextSibling();return q}var a,b,e;b=function(a,d,e,c){var q=a.name,k=null;if("text"===q)a:{for(var f=(a=d.currentNode)?a.nodeType:0;a!==e&&3!==f;){if(1===f){k=[new l("Element not allowed here.",a)];break a}f=(a=d.nextSibling())?a.nodeType:0}d.nextSibling();k=null}else if("data"===q)k=null;else if("value"===q)c!==a.text&&(k=[new l("Wrong value, should be '"+a.text+"', not '"+c+"'",e)]);else if("list"===q)k=null;else if("attribute"===q)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;q=a.localnames.length;for(k=0;k<q;k+=1){c=e.getAttributeNS(a.namespaces[k],a.localnames[k]);""!==c||e.hasAttributeNS(a.namespaces[k],a.localnames[k])||(c=void 0);if(void 0!==f&&void 0!==c){k=[new l("Attribute defined too often.",e)];break a}f=c}k=void 0===f?[new l("Attribute not found: "+a.names,e)]:m(a.e[1],d,e,f)}else if("element"===q)k=h(a,d);else if("oneOrMore"===q){c=0;do f=d.currentNode,q=b(a.e[0],d,e),c+=1;while(!q&&f!==d.currentNode);1<c?(d.currentNode=f,k=null):k=q}else if("choice"===
q){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;f=d.currentNode;if("empty"===a.e[0].name){if(q=b(a.e[1],d,e,c))d.currentNode=f;k=null}else{if(q=m(a.e[0],d,e,c))d.currentNode=f,q=b(a.e[1],d,e,c);k=q}}else if("group"===q){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;k=b(a.e[0],d,e)||b(a.e[1],d,e)}else if("interleave"===q)a:{f=a.e.length;c=[f];for(var n=f,u,s,x,r;0<n;){u=0;s=d.currentNode;for(k=0;k<f;k+=1)x=d.currentNode,!0!==c[k]&&c[k]!==x&&(r=a.e[k],(q=
b(r,d,e))?(d.currentNode=x,void 0===c[k]&&(c[k]=!1)):x===d.currentNode||"oneOrMore"===r.name||"choice"===r.name&&("oneOrMore"===r.e[0].name||"oneOrMore"===r.e[1].name)?(u+=1,c[k]=x):(u+=1,c[k]=!0));if(s===d.currentNode&&u===n){k=null;break a}if(0===u){for(k=0;k<f;k+=1)if(!1===c[k]){k=[new l("Interleave does not match.",e)];break a}k=null;break a}for(k=n=0;k<f;k+=1)!0!==c[k]&&(n+=1)}k=null}else throw q+" not allowed in nonEmptyPattern.";return k};this.validate=function(b,d){b.currentNode=b.root;var e=
m(a.e[0],b,b.root);d(e)};this.init=function(b,d){a=b;e=d}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function l(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function m(a){for(var b=[],c=0,e=a.length,d;c<e;){var g=a,h=e,m=b,t="",p=[],v=g.indexOf("[",c),F=g.indexOf("/",c),J=g.indexOf("=",c);l(F,v,J)?(t=g.substring(c,F),c=F+1):l(v,F,J)?(t=g.substring(c,v),c=q(g,v,p)):l(J,F,v)?(t=g.substring(c,J),c=J):(t=g.substring(c,h),c=h);m.push({location:t,predicates:p});if(c<e&&"="===a[c]){d=a.substring(c+1,e);if(2<d.length&&("'"===d[0]||'"'===d[0]))d=d.slice(1,d.length-1);else try{d=
parseInt(d,10)}catch(z){}c=e}}return{steps:b,value:d}}function h(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function a(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function b(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function e(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function g(a,b,c){b=b.split(":",2);var d=c(b[0]),g=b[1];return new e(a,function(a){return a.localName===g&&a.namespaceURI===d})}function d(a,b,d){var g=new h,l=c(g,b,d),m=b.value;return void 0===m?new e(a,function(a){g.setNode(a);
l.reset();return l.next()}):new e(a,function(a){g.setNode(a);l.reset();return(a=l.next())&&a.nodeValue===m})}function p(a,b,d){var e=a.ownerDocument,g=[],l=null;if(e&&e.evaluate)for(d=e.evaluate(b,a,d,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),l=d.iterateNext();null!==l;)l.nodeType===Node.ELEMENT_NODE&&g.push(l),l=d.iterateNext();else{g=new h;g.setNode(a);a=m(b);g=c(g,a,d);a=[];for(d=g.next();d;)a.push(d),d=g.next();g=a}return g}var c,q;q=function(a,b,c){for(var d=b,e=a.length,g=0;d<e;)"]"===
a[d]?(g-=1,0>=g&&c.push(m(a.substring(b,d)))):"["===a[d]&&(0>=g&&(b=d+1),g+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};c=function(c,f,e){var h,l,m,r;for(h=0;h<f.steps.length;h+=1)for(m=f.steps[h],l=m.location,""===l?c=new b(c,!1):"@"===l[0]?(r=l.slice(1).split(":",2),c=new a(c,e(r[0]),r[1])):"."!==l&&(c=new b(c,!1),-1!==l.indexOf(":")&&(c=g(c,l,e))),l=0;l<m.predicates.length;l+=1)r=m.predicates[l],c=d(c,r,e);return c};xmldom.XPath=
function(){this.getODFElementsWithXPath=p};return xmldom.XPath}();
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
 @source: http://gitorious.org/webodf/webodf/
*/
gui.AnnotationViewManager=function(l,m,h){function a(a){var b=a.node,d=a.end;a=p.createRange();d&&(a.setStart(b,b.childNodes.length),a.setEnd(d,0),d=c.getTextNodes(a,!1),d.forEach(function(a){var c=p.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function b(a){var b=l.getSizer();a?(h.style.display="inline-block",b.style.paddingRight=q.getComputedStyle(h).width):
(h.style.display="none",b.style.paddingRight=0);l.refreshSize()}function e(){d.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function g(){var a;for(a=0;a<d.length;a+=1){var b=d[a],c=b.node.parentNode,e=c.nextSibling,g=e.nextSibling,m=c.parentNode,r=0,y=d[d.indexOf(b)-1],t=void 0,b=b.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],r=void 0,r=l.getZoomLevel();c.style.left=(h.getBoundingClientRect().left-m.getBoundingClientRect().left)/
r+"px";c.style.width=h.getBoundingClientRect().width/r+"px";e.style.width=parseFloat(c.style.left)-30+"px";y&&(t=y.node.parentNode.getBoundingClientRect(),20>=(m.getBoundingClientRect().top-t.bottom)/r?c.style.top=Math.abs(m.getBoundingClientRect().top-t.bottom)/r+20+"px":c.style.top="0px");g.style.left=e.getBoundingClientRect().width/r+"px";var e=g.style,m=g.getBoundingClientRect().left/r,y=g.getBoundingClientRect().top/r,t=c.getBoundingClientRect().left/r,w=c.getBoundingClientRect().top/r,v=0,F=
0,v=t-m,v=v*v,F=w-y,F=F*F,m=Math.sqrt(v+F);e.width=m+"px";r=Math.asin((c.getBoundingClientRect().top-g.getBoundingClientRect().top)/(r*parseFloat(g.style.width)));g.style.transform="rotate("+r+"rad)";g.style.MozTransform="rotate("+r+"rad)";g.style.WebkitTransform="rotate("+r+"rad)";g.style.msTransform="rotate("+r+"rad)";b&&(r=q.getComputedStyle(b,":before").content)&&"none"!==r&&(r=r.substring(1,r.length-1),b.firstChild?b.firstChild.nodeValue=r:b.appendChild(p.createTextNode(r)))}}var d=[],p=m.ownerDocument,
c=new odf.OdfUtils,q=runtime.getWindow();runtime.assert(Boolean(q),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=g;this.addAnnotation=function(c){b(!0);d.push({node:c.node,end:c.end});e();var f=p.createElement("div"),h=p.createElement("div"),l=p.createElement("div"),m=p.createElement("div"),x=p.createElement("div"),r=c.node;f.className="annotationWrapper";r.parentNode.insertBefore(f,r);h.className="annotationNote";h.appendChild(r);x.className=
"annotationRemoveButton";h.appendChild(x);l.className="annotationConnector horizontal";m.className="annotationConnector angular";f.appendChild(h);f.appendChild(l);f.appendChild(m);c.end&&a(c);g()};this.forgetAnnotations=function(){for(;d.length;){var a=d[0],c=d.indexOf(a),e=a.node,g=e.parentNode.parentNode;"div"===g.localName&&(g.parentNode.insertBefore(e,g),g.parentNode.removeChild(g));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=p.querySelectorAll('span.annotationHighlight[annotation="'+
a+'"]');g=e=void 0;for(e=0;e<a.length;e+=1){for(g=a[e];g.firstChild;)g.parentNode.insertBefore(g.firstChild,g);g.parentNode.removeChild(g)}-1!==c&&d.splice(c,1);0===d.length&&b(!1)}}};
// Input 26
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
odf.OdfNodeFilter=function(){this.acceptNode=function(l){return"http://www.w3.org/1999/xhtml"===l.namespaceURI?NodeFilter.FILTER_SKIP:l.namespaceURI&&l.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
odf.Namespaces=function(){function l(a){return m[a]||null}var m={db:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",dc:"http://purl.org/dc/elements/1.1/",dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chart:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",form:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",webodf:"urn:webodf"},h;l.lookupNamespaceURI=l;h=function(){};h.forEachPrefix=
function(a){for(var b in m)m.hasOwnProperty(b)&&a(b,m[b])};h.resolvePrefix=l;h.namespaceMap=m;h.dbns="urn:oasis:names:tc:opendocument:xmlns:database:1.0";h.dcns="http://purl.org/dc/elements/1.1/";h.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";h.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";h.chartns="urn:oasis:names:tc:opendocument:xmlns:chart:1.0";h.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";h.formns="urn:oasis:names:tc:opendocument:xmlns:form:1.0";
h.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";h.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";h.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";h.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";h.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";h.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";h.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";h.xlinkns="http://www.w3.org/1999/xlink";h.xmlns="http://www.w3.org/XML/1998/namespace";
h.webodfns="urn:webodf";return h}();
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
odf.StyleInfo=function(){function l(a,b){for(var c=v[a.localName],d=c&&c[a.namespaceURI],f=d?d.length:0,e,c=0;c<f;c+=1)(e=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,w[d[c].ns]+d[c].localname,b+e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,l(d,b)),c=c.nextSibling}function m(a,b){for(var c=v[a.localName],d=c&&c[a.namespaceURI],f=d?d.length:0,e,c=0;c<f;c+=1)if(e=a.getAttributeNS(d[c].ns,d[c].localname))e=e.replace(b,""),a.setAttributeNS(d[c].ns,w[d[c].ns]+d[c].localname,
e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,m(d,b)),c=c.nextSibling}function h(a,b){var c=v[a.localName],d=(c=c&&c[a.namespaceURI])?c.length:0,f,e,k;for(k=0;k<d;k+=1)if(f=a.getAttributeNS(c[k].ns,c[k].localname))b=b||{},e=c[k].keyname,e=b[e]=b[e]||{},e[f]=1;return b}function a(b,c){var d,f;h(b,c);for(d=b.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(f=d,a(f,c)),d=d.nextSibling}function b(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function e(a,c,d){var f=a+'"'+
c,e=d[f];e||(e=d[f]=new b(f,a,c));return e}function g(a,b,c){var d=v[a.localName],f=(d=d&&d[a.namespaceURI])?d.length:0,k=a.getAttributeNS(r,"name"),h=a.getAttributeNS(r,"family"),l;k&&h&&(b=e(k,h,c));if(b)for(k=0;k<f;k+=1)if(h=a.getAttributeNS(d[k].ns,d[k].localname))l=d[k].keyname,h=e(h,l,c),b.requires[h.key]=h;for(k=a.firstChild;k;)k.nodeType===Node.ELEMENT_NODE&&(a=k,g(a,b,c)),k=k.nextSibling;return c}function d(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){d(a.requires[c],
b)})}function p(a,b){var c=g(a,null,{});Object.keys(c).forEach(function(a){a=c[a];var f=b[a.family];f&&f.hasOwnProperty(a.name)&&d(a,b)})}var c=odf.Namespaces.chartns,q=odf.Namespaces.dbns,k=odf.Namespaces.dr3dns,f=odf.Namespaces.drawns,n=odf.Namespaces.formns,u=odf.Namespaces.numberns,s=odf.Namespaces.officens,x=odf.Namespaces.presentationns,r=odf.Namespaces.stylens,y=odf.Namespaces.tablens,t=odf.Namespaces.textns,w={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},c={text:[{ens:r,en:"tab-stop",ans:r,a:"leader-text-style"},{ens:r,en:"drop-cap",ans:r,a:"style-name"},{ens:t,en:"notes-configuration",ans:t,a:"citation-body-style-name"},{ens:t,en:"notes-configuration",ans:t,a:"citation-style-name"},{ens:t,en:"a",ans:t,a:"style-name"},{ens:t,en:"alphabetical-index",ans:t,a:"style-name"},{ens:t,en:"linenumbering-configuration",
ans:t,a:"style-name"},{ens:t,en:"list-level-style-number",ans:t,a:"style-name"},{ens:t,en:"ruby-text",ans:t,a:"style-name"},{ens:t,en:"span",ans:t,a:"style-name"},{ens:t,en:"a",ans:t,a:"visited-style-name"},{ens:r,en:"text-properties",ans:r,a:"text-line-through-text-style"},{ens:t,en:"alphabetical-index-source",ans:t,a:"main-entry-style-name"},{ens:t,en:"index-entry-bibliography",ans:t,a:"style-name"},{ens:t,en:"index-entry-chapter",ans:t,a:"style-name"},{ens:t,en:"index-entry-link-end",ans:t,a:"style-name"},
{ens:t,en:"index-entry-link-start",ans:t,a:"style-name"},{ens:t,en:"index-entry-page-number",ans:t,a:"style-name"},{ens:t,en:"index-entry-span",ans:t,a:"style-name"},{ens:t,en:"index-entry-tab-stop",ans:t,a:"style-name"},{ens:t,en:"index-entry-text",ans:t,a:"style-name"},{ens:t,en:"index-title-template",ans:t,a:"style-name"},{ens:t,en:"list-level-style-bullet",ans:t,a:"style-name"},{ens:t,en:"outline-level-style",ans:t,a:"style-name"}],paragraph:[{ens:f,en:"caption",ans:f,a:"text-style-name"},{ens:f,
en:"circle",ans:f,a:"text-style-name"},{ens:f,en:"connector",ans:f,a:"text-style-name"},{ens:f,en:"control",ans:f,a:"text-style-name"},{ens:f,en:"custom-shape",ans:f,a:"text-style-name"},{ens:f,en:"ellipse",ans:f,a:"text-style-name"},{ens:f,en:"frame",ans:f,a:"text-style-name"},{ens:f,en:"line",ans:f,a:"text-style-name"},{ens:f,en:"measure",ans:f,a:"text-style-name"},{ens:f,en:"path",ans:f,a:"text-style-name"},{ens:f,en:"polygon",ans:f,a:"text-style-name"},{ens:f,en:"polyline",ans:f,a:"text-style-name"},
{ens:f,en:"rect",ans:f,a:"text-style-name"},{ens:f,en:"regular-polygon",ans:f,a:"text-style-name"},{ens:s,en:"annotation",ans:f,a:"text-style-name"},{ens:n,en:"column",ans:n,a:"text-style-name"},{ens:r,en:"style",ans:r,a:"next-style-name"},{ens:y,en:"body",ans:y,a:"paragraph-style-name"},{ens:y,en:"even-columns",ans:y,a:"paragraph-style-name"},{ens:y,en:"even-rows",ans:y,a:"paragraph-style-name"},{ens:y,en:"first-column",ans:y,a:"paragraph-style-name"},{ens:y,en:"first-row",ans:y,a:"paragraph-style-name"},
{ens:y,en:"last-column",ans:y,a:"paragraph-style-name"},{ens:y,en:"last-row",ans:y,a:"paragraph-style-name"},{ens:y,en:"odd-columns",ans:y,a:"paragraph-style-name"},{ens:y,en:"odd-rows",ans:y,a:"paragraph-style-name"},{ens:t,en:"notes-configuration",ans:t,a:"default-style-name"},{ens:t,en:"alphabetical-index-entry-template",ans:t,a:"style-name"},{ens:t,en:"bibliography-entry-template",ans:t,a:"style-name"},{ens:t,en:"h",ans:t,a:"style-name"},{ens:t,en:"illustration-index-entry-template",ans:t,a:"style-name"},
{ens:t,en:"index-source-style",ans:t,a:"style-name"},{ens:t,en:"object-index-entry-template",ans:t,a:"style-name"},{ens:t,en:"p",ans:t,a:"style-name"},{ens:t,en:"table-index-entry-template",ans:t,a:"style-name"},{ens:t,en:"table-of-content-entry-template",ans:t,a:"style-name"},{ens:t,en:"table-index-entry-template",ans:t,a:"style-name"},{ens:t,en:"user-index-entry-template",ans:t,a:"style-name"},{ens:r,en:"page-layout-properties",ans:r,a:"register-truth-ref-style-name"}],chart:[{ens:c,en:"axis",ans:c,
a:"style-name"},{ens:c,en:"chart",ans:c,a:"style-name"},{ens:c,en:"data-label",ans:c,a:"style-name"},{ens:c,en:"data-point",ans:c,a:"style-name"},{ens:c,en:"equation",ans:c,a:"style-name"},{ens:c,en:"error-indicator",ans:c,a:"style-name"},{ens:c,en:"floor",ans:c,a:"style-name"},{ens:c,en:"footer",ans:c,a:"style-name"},{ens:c,en:"grid",ans:c,a:"style-name"},{ens:c,en:"legend",ans:c,a:"style-name"},{ens:c,en:"mean-value",ans:c,a:"style-name"},{ens:c,en:"plot-area",ans:c,a:"style-name"},{ens:c,en:"regression-curve",
ans:c,a:"style-name"},{ens:c,en:"series",ans:c,a:"style-name"},{ens:c,en:"stock-gain-marker",ans:c,a:"style-name"},{ens:c,en:"stock-loss-marker",ans:c,a:"style-name"},{ens:c,en:"stock-range-line",ans:c,a:"style-name"},{ens:c,en:"subtitle",ans:c,a:"style-name"},{ens:c,en:"title",ans:c,a:"style-name"},{ens:c,en:"wall",ans:c,a:"style-name"}],section:[{ens:t,en:"alphabetical-index",ans:t,a:"style-name"},{ens:t,en:"bibliography",ans:t,a:"style-name"},{ens:t,en:"illustration-index",ans:t,a:"style-name"},
{ens:t,en:"index-title",ans:t,a:"style-name"},{ens:t,en:"object-index",ans:t,a:"style-name"},{ens:t,en:"section",ans:t,a:"style-name"},{ens:t,en:"table-of-content",ans:t,a:"style-name"},{ens:t,en:"table-index",ans:t,a:"style-name"},{ens:t,en:"user-index",ans:t,a:"style-name"}],ruby:[{ens:t,en:"ruby",ans:t,a:"style-name"}],table:[{ens:q,en:"query",ans:q,a:"style-name"},{ens:q,en:"table-representation",ans:q,a:"style-name"},{ens:y,en:"background",ans:y,a:"style-name"},{ens:y,en:"table",ans:y,a:"style-name"}],
"table-column":[{ens:q,en:"column",ans:q,a:"style-name"},{ens:y,en:"table-column",ans:y,a:"style-name"}],"table-row":[{ens:q,en:"query",ans:q,a:"default-row-style-name"},{ens:q,en:"table-representation",ans:q,a:"default-row-style-name"},{ens:y,en:"table-row",ans:y,a:"style-name"}],"table-cell":[{ens:q,en:"column",ans:q,a:"default-cell-style-name"},{ens:y,en:"table-column",ans:y,a:"default-cell-style-name"},{ens:y,en:"table-row",ans:y,a:"default-cell-style-name"},{ens:y,en:"body",ans:y,a:"style-name"},
{ens:y,en:"covered-table-cell",ans:y,a:"style-name"},{ens:y,en:"even-columns",ans:y,a:"style-name"},{ens:y,en:"covered-table-cell",ans:y,a:"style-name"},{ens:y,en:"even-columns",ans:y,a:"style-name"},{ens:y,en:"even-rows",ans:y,a:"style-name"},{ens:y,en:"first-column",ans:y,a:"style-name"},{ens:y,en:"first-row",ans:y,a:"style-name"},{ens:y,en:"last-column",ans:y,a:"style-name"},{ens:y,en:"last-row",ans:y,a:"style-name"},{ens:y,en:"odd-columns",ans:y,a:"style-name"},{ens:y,en:"odd-rows",ans:y,a:"style-name"},
{ens:y,en:"table-cell",ans:y,a:"style-name"}],graphic:[{ens:k,en:"cube",ans:f,a:"style-name"},{ens:k,en:"extrude",ans:f,a:"style-name"},{ens:k,en:"rotate",ans:f,a:"style-name"},{ens:k,en:"scene",ans:f,a:"style-name"},{ens:k,en:"sphere",ans:f,a:"style-name"},{ens:f,en:"caption",ans:f,a:"style-name"},{ens:f,en:"circle",ans:f,a:"style-name"},{ens:f,en:"connector",ans:f,a:"style-name"},{ens:f,en:"control",ans:f,a:"style-name"},{ens:f,en:"custom-shape",ans:f,a:"style-name"},{ens:f,en:"ellipse",ans:f,a:"style-name"},
{ens:f,en:"frame",ans:f,a:"style-name"},{ens:f,en:"g",ans:f,a:"style-name"},{ens:f,en:"line",ans:f,a:"style-name"},{ens:f,en:"measure",ans:f,a:"style-name"},{ens:f,en:"page-thumbnail",ans:f,a:"style-name"},{ens:f,en:"path",ans:f,a:"style-name"},{ens:f,en:"polygon",ans:f,a:"style-name"},{ens:f,en:"polyline",ans:f,a:"style-name"},{ens:f,en:"rect",ans:f,a:"style-name"},{ens:f,en:"regular-polygon",ans:f,a:"style-name"},{ens:s,en:"annotation",ans:f,a:"style-name"}],presentation:[{ens:k,en:"cube",ans:x,
a:"style-name"},{ens:k,en:"extrude",ans:x,a:"style-name"},{ens:k,en:"rotate",ans:x,a:"style-name"},{ens:k,en:"scene",ans:x,a:"style-name"},{ens:k,en:"sphere",ans:x,a:"style-name"},{ens:f,en:"caption",ans:x,a:"style-name"},{ens:f,en:"circle",ans:x,a:"style-name"},{ens:f,en:"connector",ans:x,a:"style-name"},{ens:f,en:"control",ans:x,a:"style-name"},{ens:f,en:"custom-shape",ans:x,a:"style-name"},{ens:f,en:"ellipse",ans:x,a:"style-name"},{ens:f,en:"frame",ans:x,a:"style-name"},{ens:f,en:"g",ans:x,a:"style-name"},
{ens:f,en:"line",ans:x,a:"style-name"},{ens:f,en:"measure",ans:x,a:"style-name"},{ens:f,en:"page-thumbnail",ans:x,a:"style-name"},{ens:f,en:"path",ans:x,a:"style-name"},{ens:f,en:"polygon",ans:x,a:"style-name"},{ens:f,en:"polyline",ans:x,a:"style-name"},{ens:f,en:"rect",ans:x,a:"style-name"},{ens:f,en:"regular-polygon",ans:x,a:"style-name"},{ens:s,en:"annotation",ans:x,a:"style-name"}],"drawing-page":[{ens:f,en:"page",ans:f,a:"style-name"},{ens:x,en:"notes",ans:f,a:"style-name"},{ens:r,en:"handout-master",
ans:f,a:"style-name"},{ens:r,en:"master-page",ans:f,a:"style-name"}],"list-style":[{ens:t,en:"list",ans:t,a:"style-name"},{ens:t,en:"numbered-paragraph",ans:t,a:"style-name"},{ens:t,en:"list-item",ans:t,a:"style-override"},{ens:r,en:"style",ans:r,a:"list-style-name"}],data:[{ens:r,en:"style",ans:r,a:"data-style-name"},{ens:r,en:"style",ans:r,a:"percentage-data-style-name"},{ens:x,en:"date-time-decl",ans:r,a:"data-style-name"},{ens:t,en:"creation-date",ans:r,a:"data-style-name"},{ens:t,en:"creation-time",
ans:r,a:"data-style-name"},{ens:t,en:"database-display",ans:r,a:"data-style-name"},{ens:t,en:"date",ans:r,a:"data-style-name"},{ens:t,en:"editing-duration",ans:r,a:"data-style-name"},{ens:t,en:"expression",ans:r,a:"data-style-name"},{ens:t,en:"meta-field",ans:r,a:"data-style-name"},{ens:t,en:"modification-date",ans:r,a:"data-style-name"},{ens:t,en:"modification-time",ans:r,a:"data-style-name"},{ens:t,en:"print-date",ans:r,a:"data-style-name"},{ens:t,en:"print-time",ans:r,a:"data-style-name"},{ens:t,
en:"table-formula",ans:r,a:"data-style-name"},{ens:t,en:"time",ans:r,a:"data-style-name"},{ens:t,en:"user-defined",ans:r,a:"data-style-name"},{ens:t,en:"user-field-get",ans:r,a:"data-style-name"},{ens:t,en:"user-field-input",ans:r,a:"data-style-name"},{ens:t,en:"variable-get",ans:r,a:"data-style-name"},{ens:t,en:"variable-input",ans:r,a:"data-style-name"},{ens:t,en:"variable-set",ans:r,a:"data-style-name"}],"page-layout":[{ens:x,en:"notes",ans:r,a:"page-layout-name"},{ens:r,en:"handout-master",ans:r,
a:"page-layout-name"},{ens:r,en:"master-page",ans:r,a:"page-layout-name"}]},v,F=new xmldom.XPath;this.UsedStyleList=function(b,c){var d={};this.uses=function(a){var b=a.localName,c=a.getAttributeNS(f,"name")||a.getAttributeNS(r,"name");a="style"===b?a.getAttributeNS(r,"family"):a.namespaceURI===u?"data":b;return(a=d[a])?0<a[c]:!1};a(b,d);c&&p(c,d)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),f=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,"family");return F.getODFElementsWithXPath(a,
"//style:*[@style:parent-style-name='"+f+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,c){var d;if(a){for(d=a.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d,k=b,g=e.getAttributeNS(f,"name"),h=void 0;g?h=f:(g=e.getAttributeNS(r,"name"))&&(h=r);h&&e.setAttributeNS(h,w[h]+"name",k+g)}d=d.nextSibling}l(a,b);c&&l(c,b)}};this.removePrefixFromStyleNames=function(a,b,c){var d=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var e=b,
k=d,g=e.getAttributeNS(f,"name"),h=void 0;g?h=f:(g=e.getAttributeNS(r,"name"))&&(h=r);h&&(g=g.replace(k,""),e.setAttributeNS(h,w[h]+"name",g))}b=b.nextSibling}m(a,d);c&&m(c,d)}};this.determineStylesForNode=h;v=function(a){var b,c,d,f,e,k={},g;for(b in a)if(a.hasOwnProperty(b))for(f=a[b],d=f.length,c=0;c<d;c+=1)e=f[c],g=k[e.en]=k[e.en]||{},g=g[e.ens]=g[e.ens]||[],g.push({ns:e.ans,localname:e.a,keyname:b});return k}(c)};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.Namespaces");
odf.OdfUtils=function(){function l(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===r}function m(a){for(;a&&!l(a);)a=a.parentNode;return a}function h(a){return/^[ \t\r\n]+$/.test(a)}function a(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===r||"span"===b&&"annotationHighlight"===a.className?!0:!1}function b(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===r?d="s"===b||"tab"===b||"line-break"===b:c===y&&(d="frame"===b&&"as-char"===a.getAttributeNS(r,
"anchor-type")));return d}function e(b){for(;null!==b.firstChild&&a(b);)b=b.firstChild;return b}function g(b){for(;null!==b.lastChild&&a(b);)b=b.lastChild;return b}function d(a){for(;!l(a)&&null===a.previousSibling;)a=a.parentNode;return l(a)?null:g(a.previousSibling)}function p(a){for(;!l(a)&&null===a.nextSibling;)a=a.parentNode;return l(a)?null:e(a.nextSibling)}function c(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=d(a);else return!h(a.data.substr(a.length-1,1));else b(a)?
(c=!0,a=null):a=d(a);return c}function q(a){var c=!1;for(a=a&&e(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!h(a.data)){c=!0;break}if(b(a)){c=!0;break}a=p(a)}return c}function k(a,b){return h(a.data.substr(b))?!q(p(a)):!1}function f(a,f){var e=a.data,g;if(!h(e[f])||b(a.parentNode))return!1;0<f?h(e[f-1])||(g=!0):c(d(a))&&(g=!0);return!0===g?k(a,f)?!1:!0:!1}function n(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function u(a){return(a=n(a))&&(0>a.value||"%"===a.unit)?null:a}function s(a){return(a=n(a))&&"%"!==a.unit?null:a}function x(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}
var r=odf.Namespaces.textns,y=odf.Namespaces.drawns,t=/^\s*$/,w=new core.DomUtils;this.isParagraph=l;this.getParagraphElement=m;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===r&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===r};this.isODFWhitespace=h;this.isGroupingElement=a;this.isCharacterElement=b;this.firstChild=e;this.lastChild=g;this.previousNode=d;this.nextNode=
p;this.scanLeftForNonWhitespace=c;this.lookLeftForCharacter=function(a){var f;f=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(f=a.data,f=h(f.substr(f.length-1,1))?1===f.length?c(d(a))?2:0:h(f.substr(f.length-2,1))?0:2:1):b(a)&&(f=1);return f};this.lookRightForCharacter=function(a){var c=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?c=!h(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(a){var c=!1;for(a=a&&g(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!h(a.data)){c=
!0;break}if(b(a)){c=!0;break}a=d(a)}return c};this.scanRightForAnyCharacter=q;this.isTrailingWhitespace=k;this.isSignificantWhitespace=f;this.isDowngradableSpaceElement=function(a){return a.namespaceURI===r&&"s"===a.localName?c(d(a))&&q(p(a)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&t.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=n;this.parseNonNegativeLength=u;this.parseFoFontSize=function(a){var b;b=(b=n(a))&&(0>=b.value||
"%"===b.unit)?null:b;return b||s(a)};this.parseFoLineHeight=function(a){return u(a)||s(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,c=[];for(b.nodeType===Node.ELEMENT_NODE&&(c=w.getElementsByTagNameNS(b,r,"p").concat(w.getElementsByTagNameNS(b,r,"h")));b&&!l(b);)b=b.parentNode;b&&c.push(b);return c.filter(function(b){return w.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),d;d=w.getNodesInRange(a,function(d){c.selectNodeContents(d);
if(d.nodeType===Node.TEXT_NODE){if(b&&w.rangesIntersect(a,c)||w.containsRange(a,c))return Boolean(m(d)&&(!h(d.textContent)||f(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(w.rangesIntersect(a,c)&&x(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return d};this.getTextElements=function(c,d){var e=c.startContainer.ownerDocument.createRange(),k;k=w.getNodesInRange(c,function(k){var g=k.nodeType;e.selectNodeContents(k);if(g===Node.TEXT_NODE){if(w.containsRange(c,
e)&&(d||Boolean(m(k)&&(!h(k.textContent)||f(k,0)))))return NodeFilter.FILTER_ACCEPT}else if(b(k)){if(w.containsRange(c,e))return NodeFilter.FILTER_ACCEPT}else if(x(k)||a(k))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});e.detach();return k};this.getParagraphElements=function(b){var c=b.startContainer.ownerDocument.createRange(),d;d=w.getNodesInRange(b,function(d){c.selectNodeContents(d);if(l(d)){if(w.rangesIntersect(b,c))return NodeFilter.FILTER_ACCEPT}else if(x(d)||a(d))return NodeFilter.FILTER_SKIP;
return NodeFilter.FILTER_REJECT});c.detach();return d}};
// Input 30
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("odf.OdfUtils");
odf.TextSerializer=function(){function l(a){var b="",e=m.filter?m.filter.acceptNode(a):NodeFilter.FILTER_ACCEPT,g=a.nodeType,d;if(e===NodeFilter.FILTER_ACCEPT||e===NodeFilter.FILTER_SKIP)for(d=a.firstChild;d;)b+=l(d),d=d.nextSibling;e===NodeFilter.FILTER_ACCEPT&&(g===Node.ELEMENT_NODE&&h.isParagraph(a)?b+="\n":g===Node.TEXT_NODE&&a.textContent&&(b+=a.textContent));return b}var m=this,h=new odf.OdfUtils;this.filter=null;this.writeToString=function(a){return a?l(a):""}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.Namespaces");
odf.TextStyleApplicator=function(l,m,h){function a(a){function b(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(d){return b(a[d],c[d])}):a===c}this.isStyleApplied=function(d){d=m.getAppliedStylesForElement(d);return b(a,d)}}function b(a){var b={};this.applyStyleToContainer=function(e){var f;f=e.getAttributeNS(d,"style-name");var g=e.ownerDocument;f=f||"";if(!b.hasOwnProperty(f)){var u=f,s;s=f?m.createDerivedStyleObject(f,"text",a):a;g=g.createElementNS(p,"style:style");
m.updateStyle(g,s);g.setAttributeNS(p,"style:name",l.generateName());g.setAttributeNS(p,"style:family","text");g.setAttributeNS("urn:webodf:names:scope","scope","document-content");h.appendChild(g);b[u]=g}f=b[f].getAttributeNS(p,"name");e.setAttributeNS(d,"text:style-name",f)}}function e(a,b){var e=a.ownerDocument,f=a.parentNode,h,l,m=new core.LoopWatchDog(1E3);l=[];"span"!==f.localName||f.namespaceURI!==d?(h=e.createElementNS(d,"text:span"),f.insertBefore(h,a),f=!1):(a.previousSibling&&!g.rangeContainsNode(b,
f.firstChild)?(h=f.cloneNode(!1),f.parentNode.insertBefore(h,f.nextSibling)):h=f,f=!0);l.push(a);for(e=a.nextSibling;e&&g.rangeContainsNode(b,e);)m.check(),l.push(e),e=e.nextSibling;l.forEach(function(a){a.parentNode!==h&&h.appendChild(a)});if(e&&f)for(l=h.cloneNode(!1),h.parentNode.insertBefore(l,h.nextSibling);e;)m.check(),f=e.nextSibling,l.appendChild(e),e=f;return h}var g=new core.DomUtils,d=odf.Namespaces.textns,p=odf.Namespaces.stylens;this.applyStyle=function(c,d,g){var f={},h,l,m,x;runtime.assert(g&&
g["style:text-properties"],"applyStyle without any text properties");f["style:text-properties"]=g["style:text-properties"];m=new b(f);x=new a(f);c.forEach(function(a){h=x.isStyleApplied(a);!1===h&&(l=e(a,d),m.applyStyleToContainer(l))})}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("xmldom.XPath");runtime.loadClass("core.CSSUnits");
odf.Style2CSS=function(){function l(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==u||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===r&&"list-style"===a.localName?"list":a.namespaceURI!==u||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(u,"family"))(c=a.getAttributeNS&&a.getAttributeNS(u,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function m(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=m(a[c].derivedStyles,b)))return d;return null}function h(a,b,c){var d=b[a],f,e;d&&(f=d.getAttributeNS(u,"parent-style-name"),e=null,f&&(e=m(c,f),!e&&b[f]&&(h(f,b,c),e=b[f],b[f]=null)),e?(e.derivedStyles||(e.derivedStyles={}),e.derivedStyles[a]=d):c[a]=d)}function a(a,b){for(var c in a)a.hasOwnProperty(c)&&(h(c,a,b),a[c]=null)}function b(a,b){var c=w[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"";"presentation"===c&&(c="draw",d=b?'[presentation|style-name="'+
b+'"]':"");return c+"|"+v[a].join(d+","+c+"|")+d}function e(a,c,d){var f=[],g,k;f.push(b(a,c));for(g in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(g))for(k in c=e(a,g,d.derivedStyles[g]),c)c.hasOwnProperty(k)&&f.push(c[k]);return f}function g(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function d(a,b){var c="",d,f;for(d in b)if(b.hasOwnProperty(d)&&(d=b[d],f=a.getAttributeNS(d[0],d[1]))){f=f.trim();if(N.hasOwnProperty(d[1])){var e=
f.indexOf(" "),g=void 0,k=void 0;-1!==e?(g=f.substring(0,e),k=f.substring(e)):(g=f,k="");(g=V.parseLength(g))&&("pt"===g.unit&&0.75>g.value)&&(f="0.75pt"+k)}d[2]&&(c+=d[2]+":"+f+";")}return c}function p(a){return(a=g(a,u,"text-properties"))?V.parseFoFontSize(a.getAttributeNS(n,"font-size")):null}function c(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],
16)}:null}function q(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var f=c.getAttributeNS(r,"level"),e;c=V.getFirstNonWhitespaceChild(c);c=V.getFirstNonWhitespaceChild(c);var g;c&&(e=c.attributes,g=e["fo:text-indent"]?e["fo:text-indent"].value:void 0,e=e["fo:margin-left"]?e["fo:margin-left"].value:void 0);g||(g="-0.6cm");c="-"===g.charAt(0)?g.substring(1):"-"+g;for(f=f&&parseInt(f,10);1<f;)b+=" > text|list-item > text|list",f-=1;f=b+" > text|list-item > *:not(text|list):first-child";void 0!==e&&
(e=f+"{margin-left:"+e+";}",a.insertRule(e,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+d+";";d+="counter-increment:list;";d+="margin-left:"+g+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(k){throw k;}}function k(a,b,h,l){if("list"===b)for(var m=l.firstChild,s,v;m;){if(m.namespaceURI===r)if(s=m,"list-level-style-number"===m.localName){var w=s;v=w.getAttributeNS(u,"num-format");var N=w.getAttributeNS(u,"num-suffix"),
K={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},w=w.getAttributeNS(u,"num-prefix")||"",w=K.hasOwnProperty(v)?w+(" counter(list, "+K[v]+")"):v?w+("'"+v+"';"):w+" ''";N&&(w+=" '"+N+"'");v="content: "+w+";";q(a,h,s,v)}else"list-level-style-image"===m.localName?(v="content: none;",q(a,h,s,v)):"list-level-style-bullet"===m.localName&&(v="content: '"+s.getAttributeNS(r,"bullet-char")+"';",q(a,h,s,v));m=m.nextSibling}else if("page"===b)if(N=s=h="",m=l.getElementsByTagNameNS(u,
"page-layout-properties")[0],s=m.parentNode.parentNode.parentNode.masterStyles,N="",h+=d(m,ea),v=m.getElementsByTagNameNS(u,"background-image"),0<v.length&&(N=v.item(0).getAttributeNS(y,"href"))&&(h+="background-image: url('odfkit:"+N+"');",v=v.item(0),h+=d(v,J)),"presentation"===Z){if(s)for(v=s.getElementsByTagNameNS(u,"master-page"),K=0;K<v.length;K+=1)if(v[K].getAttributeNS(u,"page-layout-name")===m.parentNode.getAttributeNS(u,"name")){N=v[K].getAttributeNS(u,"name");s="draw|page[draw|master-page-name="+
N+"] {"+h+"}";N="office|body, draw|page[draw|master-page-name="+N+"] {"+d(m,na)+" }";try{a.insertRule(s,a.cssRules.length),a.insertRule(N,a.cssRules.length)}catch(ga){throw ga;}}}else{if("text"===Z){s="office|text {"+h+"}";N="office|body {width: "+m.getAttributeNS(n,"page-width")+";}";try{a.insertRule(s,a.cssRules.length),a.insertRule(N,a.cssRules.length)}catch(ia){throw ia;}}}else{h=e(b,h,l).join(",");m="";if(s=g(l,u,"text-properties")){var K=s,D;v=D="";N=1;s=""+d(K,F);w=K.getAttributeNS(u,"text-underline-style");
"solid"===w&&(D+=" underline");w=K.getAttributeNS(u,"text-line-through-style");"solid"===w&&(D+=" line-through");D.length&&(s+="text-decoration:"+D+";");if(D=K.getAttributeNS(u,"font-name")||K.getAttributeNS(n,"font-family"))w=oa[D],s+="font-family: "+(w||D)+", sans-serif;";w=K.parentNode;if(K=p(w)){for(;w;){if(K=p(w)){if("%"!==K.unit){v="font-size: "+K.value*N+K.unit+";";break}N*=K.value/100}K=w;D=w="";w=null;"default-style"===K.localName?w=null:(w=K.getAttributeNS(u,"parent-style-name"),D=K.getAttributeNS(u,
"family"),w=B.getODFElementsWithXPath(O,w?"//style:*[@style:name='"+w+"'][@style:family='"+D+"']":"//style:default-style[@style:family='"+D+"']",odf.Namespaces.resolvePrefix)[0])}v||(v="font-size: "+parseFloat(S)*N+H.getUnits(S)+";");s+=v}m+=s}if(s=g(l,u,"paragraph-properties"))v=s,s=""+d(v,z),N=v.getElementsByTagNameNS(u,"background-image"),0<N.length&&(K=N.item(0).getAttributeNS(y,"href"))&&(s+="background-image: url('odfkit:"+K+"');",N=N.item(0),s+=d(N,J)),(v=v.getAttributeNS(n,"line-height"))&&
"normal"!==v&&(v=V.parseFoLineHeight(v),s="%"!==v.unit?s+("line-height: "+v.value+v.unit+";"):s+("line-height: "+v.value/100+";")),m+=s;if(s=g(l,u,"graphic-properties"))K=s,s=""+d(K,L),v=K.getAttributeNS(f,"opacity"),N=K.getAttributeNS(f,"fill"),K=K.getAttributeNS(f,"fill-color"),"solid"===N||"hatch"===N?K&&"none"!==K?(v=isNaN(parseFloat(v))?1:parseFloat(v)/100,(K=c(K))&&(s+="background-color: rgba("+K.r+","+K.g+","+K.b+","+v+");")):s+="background: none;":"none"===N&&(s+="background: none;"),m+=s;
if(s=g(l,u,"drawing-page-properties"))v=""+d(s,L),"true"===s.getAttributeNS(t,"background-visible")&&(v+="background: none;"),m+=v;if(s=g(l,u,"table-cell-properties"))s=""+d(s,A),m+=s;if(s=g(l,u,"table-row-properties"))s=""+d(s,G),m+=s;if(s=g(l,u,"table-column-properties"))s=""+d(s,P),m+=s;if(s=g(l,u,"table-properties"))v=s,s=""+d(v,M),v=v.getAttributeNS(x,"border-model"),"collapsing"===v?s+="border-collapse:collapse;":"separating"===v&&(s+="border-collapse:separate;"),m+=s;if(0!==m.length)try{a.insertRule(h+
"{"+m+"}",a.cssRules.length)}catch(ja){throw ja;}}for(var ka in l.derivedStyles)l.derivedStyles.hasOwnProperty(ka)&&k(a,b,ka,l.derivedStyles[ka])}var f=odf.Namespaces.drawns,n=odf.Namespaces.fons,u=odf.Namespaces.stylens,s=odf.Namespaces.svgns,x=odf.Namespaces.tablens,r=odf.Namespaces.textns,y=odf.Namespaces.xlinkns,t=odf.Namespaces.presentationns,w={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},v={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},F=[[n,"color","color"],[n,"background-color","background-color"],[n,"font-weight","font-weight"],[n,"font-style","font-style"]],J=[[u,"repeat",
"background-repeat"]],z=[[n,"background-color","background-color"],[n,"text-align","text-align"],[n,"text-indent","text-indent"],[n,"padding","padding"],[n,"padding-left","padding-left"],[n,"padding-right","padding-right"],[n,"padding-top","padding-top"],[n,"padding-bottom","padding-bottom"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"margin","margin"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],
[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"],[n,"border","border"]],L=[[n,"background-color","background-color"],[n,"min-height","min-height"],[f,"stroke","border"],[s,"stroke-color","border-color"],[s,"stroke-width","border-width"],[n,"border","border"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"]],A=[[n,"background-color","background-color"],[n,"border-left","border-left"],[n,"border-right",
"border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"border","border"]],P=[[u,"column-width","width"]],G=[[u,"row-height","height"],[n,"keep-together",null]],M=[[u,"width","width"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"]],ea=[[n,"background-color","background-color"],[n,"padding","padding"],[n,"padding-left","padding-left"],[n,"padding-right","padding-right"],[n,"padding-top",
"padding-top"],[n,"padding-bottom","padding-bottom"],[n,"border","border"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"margin","margin"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"]],na=[[n,"page-width","width"],[n,"page-height","height"]],N={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},oa={},V=new odf.OdfUtils,Z,O,S,B=new xmldom.XPath,H=new core.CSSUnits;this.style2css=function(b,c,d,f,e){for(var g,h,n,m;c.cssRules.length;)c.deleteRule(c.cssRules.length-1);g=null;f&&(g=f.ownerDocument,O=f.parentNode);e&&(g=e.ownerDocument,O=e.parentNode);if(g)for(m in odf.Namespaces.forEachPrefix(function(a,b){n="@namespace "+a+" url("+b+");";try{c.insertRule(n,c.cssRules.length)}catch(d){}}),oa=d,Z=b,S=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",b=l(f),f=l(e),e={},w)if(w.hasOwnProperty(m))for(h in d=e[m]={},a(b[m],d),a(f[m],d),d)d.hasOwnProperty(h)&&k(c,m,h,d[h])}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function l(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function m(a){var b,c=p.length;for(b=0;b<c;b+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&a.localName===p[b])return b;return-1}function h(a,b){var c=new d.UsedStyleList(a,b),e=new odf.OdfNodeFilter;this.acceptNode=function(a){var d=e.acceptNode(a);d===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&
(d=c.uses(a)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return d}}function a(a,b){var c=new h(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function b(a,b){if(b){var c=m(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=m(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}function e(a){this.OdfContainer=
a}function g(a,b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var d=new odf.StyleInfo,p="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),
c=(new Date).getTime()+"_webodf_",q=new core.Base64;e.prototype=new function(){};e.prototype.constructor=e;e.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";e.localName="document";g.prototype.load=function(){};g.prototype.getUrl=function(){return this.data?"data:;base64,"+q.toBase64(this.data):null};odf.OdfContainer=function f(n,m){function s(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?s(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),
b=c}function x(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS("urn:webodf:names:scope","scope",b),c=c.nextSibling}function r(a,b){var c=null,d,e,f;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(f=d.getAttributeNS("urn:webodf:names:scope","scope"))&&f!==b&&c.removeChild(d),d=e;return c}function y(a){var b=B.rootElement.ownerDocument,c;if(a){s(a.documentElement);try{c=b.importNode(a.documentElement,!0)}catch(d){}}return c}
function t(a){B.state=a;if(B.onchange)B.onchange(B);if(B.onstatereadychange)B.onstatereadychange(B)}function p(a){T=null;B.rootElement=a;a.fontFaceDecls=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");a.styles=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");a.automaticStyles=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");a.masterStyles=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");a.body=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"body");a.meta=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta")}function v(a){a=y(a);var e=B.rootElement;a&&"document-styles"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI?(e.fontFaceDecls=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),b(e,e.fontFaceDecls),e.styles=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),b(e,e.styles),e.automaticStyles=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),
x(e.automaticStyles,"document-styles"),b(e,e.automaticStyles),e.masterStyles=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),b(e,e.masterStyles),d.prefixStyleNames(e.automaticStyles,c,e.masterStyles)):t(f.INVALID)}function q(a){a=y(a);var c,d,e;if(a&&"document-content"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI){c=B.rootElement;d=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");if(c.fontFaceDecls&&d)for(e=d.firstChild;e;)c.fontFaceDecls.appendChild(e),
e=d.firstChild;else d&&(c.fontFaceDecls=d,b(c,d));d=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");x(d,"document-content");if(c.automaticStyles&&d)for(e=d.firstChild;e;)c.automaticStyles.appendChild(e),e=d.firstChild;else d&&(c.automaticStyles=d,b(c,d));c.body=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");b(c,c.body)}else t(f.INVALID)}function J(a){a=y(a);var c;a&&("document-meta"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI)&&
(c=B.rootElement,c.meta=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),b(c,c.meta))}function z(a){a=y(a);var c;a&&("document-settings"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI)&&(c=B.rootElement,c.settings=l(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),b(c,c.settings))}function L(a){a=y(a);var b;if(a&&"manifest"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI)for(b=B.rootElement,b.manifest=
a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI)&&(E[a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),a=a.nextSibling}function A(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],H.loadAsDOM(c,function(b,c){d(c);b||B.state===f.INVALID||A(a)})):t(f.DONE)}function P(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function G(){var a=new xmldom.LSSerializer,b=P("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(B.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function M(a,b){var c=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
"manifest:full-path",a);c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:media-type",b);return c}function ea(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"></manifest:manifest>'),b=l(a,"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest"),c=new xmldom.LSSerializer,d;for(d in E)E.hasOwnProperty(d)&&b.appendChild(M(d,E[d]));c.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+
c.writeToString(a,odf.Namespaces.namespaceMap)}function na(){var a=new xmldom.LSSerializer,b=P("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(B.rootElement.settings,odf.Namespaces.namespaceMap);return b+"</office:document-settings>"}function N(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,e=r(B.rootElement.automaticStyles,"document-styles"),f=B.rootElement.masterStyles&&B.rootElement.masterStyles.cloneNode(!0),g=P("document-styles");d.removePrefixFromStyleNames(e,
c,f);b.filter=new h(f,e);g+=b.writeToString(B.rootElement.fontFaceDecls,a);g+=b.writeToString(B.rootElement.styles,a);g+=b.writeToString(e,a);g+=b.writeToString(f,a);return g+"</office:document-styles>"}function oa(){var b=odf.Namespaces.namespaceMap,c=new xmldom.LSSerializer,d=r(B.rootElement.automaticStyles,"document-content"),e=P("document-content");c.filter=new a(B.rootElement.body,d);e+=c.writeToString(d,b);e+=c.writeToString(B.rootElement.body,b);return e+"</office:document-content>"}function V(a,
b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var d=y(c);d&&"document"===d.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===d.namespaceURI?(p(d),t(f.DONE)):t(f.INVALID)}})}function Z(){function a(b,c){var e;c||(c=b);e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",c);d[b]=e;d.appendChild(e)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),d=B.rootElement,e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");d.body.appendChild(e);t(f.DONE);return b}function O(){var a,b=new Date;a=runtime.byteArrayFromString(na(),"utf8");H.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(G(),"utf8");H.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(N(),"utf8");H.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(oa(),
"utf8");H.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(ea(),"utf8");H.save("META-INF/manifest.xml",a,!0,b)}function S(a,b){O();H.writeAs(a,function(a){b(a)})}var B=this,H,E={},T;this.onstatereadychange=m;this.rootElement=this.state=this.onchange=null;this.setRootElement=p;this.getContentElement=function(){var a;T||(a=B.rootElement.body,T=a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","text")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"presentation")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet")[0]);return T};this.getDocumentType=function(){var a=B.getContentElement();return a&&a.localName};this.getPart=function(a){return new g(a,E[a],B,H)};this.getPartData=function(a,b){H.load(a,b)};this.createByteArray=function(a,b){O();H.createByteArray(a,b)};this.saveAs=S;this.save=function(a){S(n,a)};this.getUrl=function(){return n};this.state=f.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,
a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(e);H=n?new core.Zip(n,function(a,b){H=b;a?V(n,function(b){a&&(H.error=a+"\n"+b,t(f.INVALID))}):A([["styles.xml",v],["content.xml",q],["meta.xml",J],["settings.xml",z],["META-INF/manifest.xml",L]])}):Z()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,
null)};return odf.OdfContainer}();
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.Base64");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.OdfContainer");
odf.FontLoader=function(){function l(a,b,e,g,d){var m,c=0,q;for(q in a)if(a.hasOwnProperty(q)){if(c===e){m=q;break}c+=1}m?b.getPartData(a[m].href,function(c,f){if(c)runtime.log(c);else{var n="@font-face { font-family: '"+(a[m].family||m)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+h.convertUTF8ArrayToBase64(f)+') format("truetype"); }';try{g.insertRule(n,g.cssRules.length)}catch(q){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(q)+"\nRule: "+n)}}l(a,b,e+1,g,d)}):
d&&d()}var m=new xmldom.XPath,h=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(a,b){for(var e=a.rootElement.fontFaceDecls;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);if(e){var g={},d,h,c,q;if(e)for(e=m.getODFElementsWithXPath(e,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),d=0;d<e.length;d+=1)h=e[d],c=h.getAttributeNS(odf.Namespaces.stylens,"name"),q=h.getAttributeNS(odf.Namespaces.svgns,"font-family"),h=m.getODFElementsWithXPath(h,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<h.length&&(h=h[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),g[c]={href:h,family:q});l(g,a,0,b)}}};return odf.FontLoader}();
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
 @source: http://gitorious.org/webodf/webodf/
*/
odf.StyleNameGenerator=function(l,m){var h={};this.generateName=function(){var a,b={},e=0;m.getAllStyleNames().forEach(function(a){b[a]=!0});do a=l+e,e+=1;while(h[a]||b[a]);h[a]=!0;return a}};
// Input 36
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.Utils");runtime.loadClass("odf.StyleNameGenerator");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.TextStyleApplicator");
odf.Formatting=function(){function l(){for(var a=c.rootElement.fontFaceDecls,b={},d,e,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(d=a.getAttributeNS(f,"name"))&&((e=a.getAttributeNS(k,"font-family"))||a.getElementsByTagNameNS(k,"font-face-uri")[0])&&(b[d]=e),a=a.nextSibling;return b}function m(a){for(var b=c.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===f&&"default-style"===b.localName&&b.getAttributeNS(f,"family")===a)return b;b=b.nextSibling}return null}
function h(a,b,d){var e,g;d=d||[c.rootElement.automaticStyles,c.rootElement.styles];for(e=d.shift();e;){for(e=e.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&(g=e.getAttributeNS(f,"name"),e.namespaceURI===f&&"style"===e.localName&&e.getAttributeNS(f,"family")===b&&g===a||"list-style"===b&&e.namespaceURI===n&&"list-style"===e.localName&&g===a||"data"===b&&e.namespaceURI===u&&g===a))return e;e=e.nextSibling}e=d.shift()}return null}function a(a){for(var b,c={},d=a.firstChild;d;){if(d.nodeType===
Node.ELEMENT_NODE&&d.namespaceURI===f)for(c[d.nodeName]={},b=0;b<d.attributes.length;b+=1)c[d.nodeName][d.attributes[b].name]=d.attributes[b].value;d=d.nextSibling}for(b=0;b<a.attributes.length;b+=1)c[a.attributes[b].name]=a.attributes[b].value;return c}function b(a,c){Object.keys(c).forEach(function(d){var e=d.split(":"),f=e[1],g=odf.Namespaces.resolvePrefix(e[0]),e=c[d];"object"===typeof e&&Object.keys(e).length?(d=a.getElementsByTagNameNS(g,f)[0]||a.ownerDocument.createElementNS(g,d),a.appendChild(d),
b(d,e)):g&&a.setAttributeNS(g,d,e)})}function e(b,d){for(var e=c.rootElement.styles,g,k={},l=b.getAttributeNS(f,"family"),n=b;n;)g=a(n),k=x.mergeObjects(g,k),n=(g=n.getAttributeNS(f,"parent-style-name"))?h(g,l,[e]):null;if(n=m(l))g=a(n),k=x.mergeObjects(g,k);d&&(g=(e=r[l])?x.mergeObjects({},e):null)&&(k=x.mergeObjects(g,k));return k}function g(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],f="",g=!1;c;)!g&&s.isGroupingElement(c)&&(g=!0),(d=q.determineStylesForNode(c))&&e.push(d),
c=c.parentNode;g&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){f+="|"+b+":"+a+"|"})})}),b&&(b[f]=e));return g?e:void 0}function d(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var d=Object.keys(a[c])[0],g,k;(g=h(d,c))?(k=e(g),b=x.mergeObjects(k,b),k=g.getAttributeNS(f,"display-name")):runtime.log("No style element found for '"+d+"' of family '"+c+"'");b.orderedStyles.push({name:d,family:c,displayName:k})})});
return b}var p=this,c,q=new odf.StyleInfo,k=odf.Namespaces.svgns,f=odf.Namespaces.stylens,n=odf.Namespaces.textns,u=odf.Namespaces.numberns,s=new odf.OdfUtils,x=new core.Utils,r={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.setOdfContainer=function(a){c=a};this.getFontMap=l;this.getAvailableParagraphStyles=function(){for(var a=c.rootElement.styles&&c.rootElement.styles.firstChild,b,d,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===f)&&(d=
a,b=d.getAttributeNS(f,"family"),"paragraph"===b&&(b=d.getAttributeNS(f,"name"),d=d.getAttributeNS(f,"display-name")||b,b&&d&&e.push({name:b,displayName:d}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var b;b=q.hasDerivedStyles(c.rootElement,odf.Namespaces.resolvePrefix,a);a=(new q.UsedStyleList(c.rootElement.styles)).uses(a)||(new q.UsedStyleList(c.rootElement.automaticStyles)).uses(a)||(new q.UsedStyleList(c.rootElement.body)).uses(a);return b||a};this.getDefaultStyleElement=m;this.getStyleElement=
h;this.getStyleAttributes=a;this.getInheritedStyleAttributes=e;this.getFirstCommonParentStyleNameOrSelf=function(a){var b=c.rootElement.automaticStyles,d=c.rootElement.styles,e;for(e=h(a,"paragraph",[b]);e;)a=e.getAttributeNS(f,"parent-style-name"),e=h(a,"paragraph",[b]);return(e=h(a,"paragraph",[d]))?a:null};this.hasParagraphStyle=function(a){return Boolean(h(a,"paragraph"))};this.getAppliedStyles=function(a){var b={},c=[];a.forEach(function(a){g(a,b)});Object.keys(b).forEach(function(a){c.push(d(b[a]))});
return c};this.getAppliedStylesForElement=function(a){return(a=g(a))?d(a):void 0};this.applyStyle=function(a,b,d,e){(new odf.TextStyleApplicator(new odf.StyleNameGenerator("auto"+x.hashString(a)+"_",p),p,c.rootElement.automaticStyles)).applyStyle(b,d,e)};this.getAllStyleNames=function(){var a,b=[];[c.rootElement.automaticStyles,c.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===f&&"style"===a.localName||a.namespaceURI===n&&"list-style"===
a.localName)&&b.push(a.getAttributeNS(f,"name")),a=a.nextSibling});return b};this.updateStyle=function(a,d){var e,g;b(a,d);(e=d["style:text-properties"]&&d["style:text-properties"]["style:font-name"])&&!l().hasOwnProperty(e)&&(g=a.ownerDocument.createElementNS(f,"style:font-face"),g.setAttributeNS(f,"style:name",e),g.setAttributeNS(k,"svg:font-family",e),c.rootElement.fontFaceDecls.appendChild(g))};this.createDerivedStyleObject=function(b,d,e){var f=h(b,d);runtime.assert(Boolean(f),"No style element found for '"+
b+"' of family '"+d+"'");b=f.parentNode===c.rootElement.automaticStyles?a(f):{"style:parent-style-name":b};b["style:family"]=d;x.mergeObjects(b,e);return b};this.getDefaultTabStopDistance=function(){var a=m("paragraph");(a=(a=a&&a.getAttributeNS(f,"paragraph-properties"))&&a.getAttributeNS(f,"tab-stop-distance"))||(a="1.25cm");return s.parseNonNegativeLength(a)}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.Formatting");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.FontLoader");runtime.loadClass("odf.Style2CSS");runtime.loadClass("odf.OdfUtils");runtime.loadClass("gui.AnnotationViewManager");
odf.OdfCanvas=function(){function l(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(e)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function m(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function h(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function a(a,b,c){var d=
"on"+b;a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent(d,c):a[d]===c&&(a[d]=null)}function b(b){function c(a,b){for(;b;){if(b===a)return!0;b=b.parentNode}return!1}function d(){var a=[],g=runtime.getWindow().getSelection(),k,h;for(k=0;k<g.rangeCount;k+=1)h=g.getRangeAt(k),null!==h&&(c(b,h.startContainer)&&c(b,h.endContainer))&&a.push(h);if(a.length===e.length){for(g=0;g<a.length&&(k=a[g],h=e[g],k=k===h?!1:null===k||null===h?!0:k.startContainer!==h.startContainer||k.startOffset!==
h.startOffset||k.endContainer!==h.endContainer||k.endOffset!==h.endOffset,!k);g+=1);if(g===a.length)return}e=a;var g=[a.length],l,n=b.ownerDocument;for(k=0;k<a.length;k+=1)h=a[k],l=n.createRange(),l.setStart(h.startContainer,h.startOffset),l.setEnd(h.endContainer,h.endOffset),g[k]=l;e=g;g=f.length;for(a=0;a<g;a+=1)f[a](b,e)}var e=[],f=[];this.addListener=function(a,b){var c,d=f.length;for(c=0;c<d;c+=1)if(f[c]===b)return;f.push(b)};this.destroy=function(c){a(b,"mouseup",d);a(b,"keyup",d);a(b,"keydown",
d);c()};h(b,"mouseup",d);h(b,"keyup",d);h(b,"keydown",d)}function e(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function g(a,b,c,d){c.setAttribute("styleid",b);var e,f=c.getAttributeNS(v,"anchor-type"),k=c.getAttributeNS(t,"x"),h=c.getAttributeNS(t,"y"),l=c.getAttributeNS(t,"width"),n=c.getAttributeNS(t,"height"),m=c.getAttributeNS(x,"min-height"),r=c.getAttributeNS(x,"min-width"),p=c.getAttributeNS(s,"master-page-name"),
q=null,u,w;u=0;var L,A=a.rootElement.ownerDocument;if(p){q=a.rootElement.masterStyles.getElementsByTagNameNS(y,"master-page");u=null;for(w=0;w<q.length;w+=1)if(q[w].getAttributeNS(y,"name")===p){u=q[w];break}q=u}else q=null;if(q){p=A.createElementNS(s,"draw:page");L=q.firstElementChild;for(u=0;L;)"true"!==L.getAttributeNS(z,"placeholder")&&(w=L.cloneNode(!0),p.appendChild(w),g(a,b+"_"+u,w,d)),L=L.nextElementSibling,u+=1;M.appendChild(p);u=M.getElementsByTagNameNS(s,"page").length;if(w=p.getElementsByTagNameNS(v,
"page-number")[0]){for(;w.firstChild;)w.removeChild(w.firstChild);w.appendChild(A.createTextNode(u))}g(a,b,p,d);p.setAttributeNS(s,"draw:master-page-name",q.getAttributeNS(y,"name"))}if("as-char"===f)e="display: inline-block;";else if(f||k||h)e="position: absolute;";else if(l||n||m||r)e="display: block;";k&&(e+="left: "+k+";");h&&(e+="top: "+h+";");l&&(e+="width: "+l+";");n&&(e+="height: "+n+";");m&&(e+="min-height: "+m+";");r&&(e+="min-width: "+r+";");e&&(e="draw|"+c.localName+'[styleid="'+b+'"] {'+
e+"}",d.insertRule(e,d.cssRules.length))}function d(a){for(a=a.firstChild;a;){if(a.namespaceURI===r&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function p(a,b,c,e){function f(b){b&&(b='draw|image[styleid="'+a+'"] {'+("background-image: url("+b+");")+"}",e.insertRule(b,e.cssRules.length))}c.setAttribute("styleid",a);var g=c.getAttributeNS(F,"href"),k;if(g)try{k=b.getPart(g),k.onchange=function(a){f(a.url)},k.load()}catch(h){runtime.log("slight problem: "+
h)}else g=d(c),f(g)}function c(a){function b(c){var d,e;c.hasAttributeNS(F,"href")&&(d=c.getAttributeNS(F,"href"),"#"===d[0]?(d=d.substring(1),e=function(){var b=A.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=A.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);return!1}):e=function(){L.open(d)},c.onclick=e)}var c,d,e;d=a.getElementsByTagNameNS(v,
"a");for(c=0;c<d.length;c+=1)e=d.item(c),b(e)}function q(a){var b=a.ownerDocument;G.getElementsByTagNameNS(a,v,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(v,"c"),10);if(1<d)for(a.removeAttributeNS(v,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function k(a){G.getElementsByTagNameNS(a,v,"tab").forEach(function(a){a.textContent="\t"})}function f(a,b){function c(a,d){var g=k.documentElement.namespaceURI;
"video/"===d.substr(0,6)?(e=k.createElementNS(g,"video"),e.setAttribute("controls","controls"),f=k.createElementNS(g,"source"),f.setAttribute("src",a),f.setAttribute("type",d),e.appendChild(f),b.parentNode.appendChild(e)):b.innerHtml="Unrecognised Plugin"}var e,f,g,k=b.ownerDocument,h;if(g=b.getAttributeNS(F,"href"))try{h=a.getPart(g),h.onchange=function(a){c(a.url,a.mimetype)},h.load()}catch(l){runtime.log("slight problem: "+l)}else runtime.log("using MP4 data fallback"),g=d(b),c(g,"video/mp4")}
function n(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function u(a){var b=
a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var s=odf.Namespaces.drawns,x=odf.Namespaces.fons,r=odf.Namespaces.officens,y=odf.Namespaces.stylens,t=odf.Namespaces.svgns,w=odf.Namespaces.tablens,v=odf.Namespaces.textns,F=odf.Namespaces.xlinkns,
J=odf.Namespaces.xmlns,z=odf.Namespaces.presentationns,L=runtime.getWindow(),A=new xmldom.XPath,P=new odf.OdfUtils,G=new core.DomUtils,M;odf.OdfCanvas=function(a){function d(a,b,c){function e(a,b,c,d){ka.addToQueue(function(){p(a,b,c,d)})}var f,g;f=b.getElementsByTagNameNS(s,"image");for(b=0;b<f.length;b+=1)g=f.item(b),e("image"+String(b),a,g,c)}function x(a,b){function c(a,b){ka.addToQueue(function(){f(a,b)})}var d,e,g;e=b.getElementsByTagNameNS(s,"plugin");for(d=0;d<e.length;d+=1)g=e.item(d),c(a,
g)}function t(){Q.firstChild&&(1<D?(Q.style.MozTransformOrigin="center top",Q.style.WebkitTransformOrigin="center top",Q.style.OTransformOrigin="center top",Q.style.msTransformOrigin="center top"):(Q.style.MozTransformOrigin="left top",Q.style.WebkitTransformOrigin="left top",Q.style.OTransformOrigin="left top",Q.style.msTransformOrigin="left top"),Q.style.WebkitTransform="scale("+D+")",Q.style.MozTransform="scale("+D+")",Q.style.OTransform="scale("+D+")",Q.style.msTransform="scale("+D+")",a.style.width=
Math.round(D*Q.offsetWidth)+"px",a.style.height=Math.round(D*Q.offsetHeight)+"px")}function z(a){function b(a){return d===a.getAttributeNS(r,"name")}var c=G.getElementsByTagNameNS(a,r,"annotation");a=G.getElementsByTagNameNS(a,r,"annotation-end");var d,e;for(e=0;e<c.length;e+=1)d=c[e].getAttributeNS(r,"name"),U.addAnnotation({node:c[e],end:a.filter(b)[0]||null});U.rerenderAnnotations()}function F(a){$?(Y.parentNode||(Q.appendChild(Y),t()),U&&U.forgetAnnotations(),U=new gui.AnnotationViewManager(B,
a.body,Y),z(a.body)):Y.parentNode&&(Q.removeChild(Y),U.forgetAnnotations(),t())}function O(b){function f(){for(var h=a;h.firstChild;)h.removeChild(h.firstChild);a.style.display="inline-block";h=E.rootElement;a.ownerDocument.importNode(h,!0);T.setOdfContainer(E);var l=E,n=K;(new odf.FontLoader).loadFonts(l,n.sheet);e(E,T,ga);for(var n=E,l=ia.sheet,m=a;m.firstChild;)m.removeChild(m.firstChild);Q=H.createElementNS(a.namespaceURI,"div");Q.style.display="inline-block";Q.style.background="white";Q.appendChild(h);
a.appendChild(Q);Y=H.createElementNS(a.namespaceURI,"div");Y.id="annotationsPane";M=H.createElementNS(a.namespaceURI,"div");M.id="shadowContent";M.style.position="absolute";M.style.top=0;M.style.left=0;n.getContentElement().appendChild(M);var m=h.body,r,p,u;p=[];for(r=m.firstChild;r&&r!==m;)if(r.namespaceURI===s&&(p[p.length]=r),r.firstChild)r=r.firstChild;else{for(;r&&r!==m&&!r.nextSibling;)r=r.parentNode;r&&r.nextSibling&&(r=r.nextSibling)}for(u=0;u<p.length;u+=1)r=p[u],g(n,"frame"+String(u),r,
l);p=A.getODFElementsWithXPath(m,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(r=0;r<p.length;r+=1)m=p[r],m.setAttributeNS&&m.setAttributeNS("urn:webodf","containsparagraphanchor",!0);r=h.body.getElementsByTagNameNS(w,"table-cell");for(m=0;m<r.length;m+=1)p=r.item(m),p.hasAttributeNS(w,"number-columns-spanned")&&p.setAttribute("colspan",p.getAttributeNS(w,"number-columns-spanned")),p.hasAttributeNS(w,"number-rows-spanned")&&p.setAttribute("rowspan",p.getAttributeNS(w,
"number-rows-spanned"));c(h.body);q(h.body);k(h.body);d(n,h.body,l);x(n,h.body);p=h.body;var z,G,C,B,m={};r={};var D;u=L.document.getElementsByTagNameNS(v,"list-style");for(n=0;n<u.length;n+=1)z=u.item(n),(C=z.getAttributeNS(y,"name"))&&(r[C]=z);p=p.getElementsByTagNameNS(v,"list");for(n=0;n<p.length;n+=1)if(z=p.item(n),u=z.getAttributeNS(J,"id")){G=z.getAttributeNS(v,"continue-list");z.setAttribute("id",u);B="text|list#"+u+" > text|list-item > *:first-child:before {";if(C=z.getAttributeNS(v,"style-name")){z=
r[C];D=P.getFirstNonWhitespaceChild(z);z=void 0;if(D)if("list-level-style-number"===D.localName){z=D.getAttributeNS(y,"num-format");C=D.getAttributeNS(y,"num-suffix");var ca="",ca={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},da=void 0,da=D.getAttributeNS(y,"num-prefix")||"",da=ca.hasOwnProperty(z)?da+(" counter(list, "+ca[z]+")"):z?da+("'"+z+"';"):da+" ''";C&&(da+=" '"+C+"'");z=ca="content: "+da+";"}else"list-level-style-image"===D.localName?z="content: none;":"list-level-style-bullet"===
D.localName&&(z="content: '"+D.getAttributeNS(v,"bullet-char")+"';");D=z}if(G){for(z=m[G];z;)G=z,z=m[G];B+="counter-increment:"+G+";";D?(D=D.replace("list",G),B+=D):B+="content:counter("+G+");"}else G="",D?(D=D.replace("list",u),B+=D):B+="content: counter("+u+");",B+="counter-increment:"+u+";",l.insertRule("text|list#"+u+" {counter-reset:"+u+"}",l.cssRules.length);B+="}";m[u]=G;B&&l.insertRule(B,l.cssRules.length)}Q.insertBefore(M,Q.firstChild);t();F(h);if(!b&&(h=[E],ja.hasOwnProperty("statereadychange")))for(l=
ja.statereadychange,D=0;D<l.length;D+=1)l[D].apply(null,h)}E.state===odf.OdfContainer.DONE?f():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function la(){E.state===odf.OdfContainer.DONE?f():(runtime.log("will be back later..."),runtime.setTimeout(la,500))},100))}function S(b){ka.clearQueue();a.innerHTML="loading "+b;a.removeAttribute("style");E=new odf.OdfContainer(b,function(a){E=a;O(!1)})}runtime.assert(null!==a&&void 0!==a,"odf.OdfCanvas constructor needs DOM element");
runtime.assert(null!==a.ownerDocument&&void 0!==a.ownerDocument,"odf.OdfCanvas constructor needs DOM");var B=this,H=a.ownerDocument,E,T=new odf.Formatting,X=new b(a),R,Q,Y,$=!1,U,ha,K,ga,ia,D=1,ja={},ka=new l;this.refreshCSS=function(){e(E,T,ga);t()};this.refreshSize=function(){t()};this.odfContainer=function(){return E};this.slidevisibilitycss=function(){return R.css};this.setOdfContainer=function(a,b){E=a;O(!0===b)};this.load=this.load=S;this.save=function(a){E.save(a)};this.addListener=function(b,
c){switch(b){case "selectionchange":X.addListener(b,c);break;case "click":h(a,b,c);break;default:var d=ja[b];void 0===d&&(d=ja[b]=[]);c&&-1===d.indexOf(c)&&d.push(c)}};this.getFormatting=function(){return T};this.getAnnotationManager=function(){return U};this.refreshAnnotations=function(){F(E.rootElement)};this.rerenderAnnotations=function(){U&&U.rerenderAnnotations()};this.getSizer=function(){return Q};this.enableAnnotations=function(a){a!==$&&($=a,E&&F(E.rootElement))};this.addAnnotation=function(a){U&&
U.addAnnotation(a)};this.forgetAnnotations=function(){U&&U.forgetAnnotations()};this.setZoomLevel=function(a){D=a;t()};this.getZoomLevel=function(){return D};this.fitToContainingElement=function(b,c){var d=a.offsetHeight/D;D=b/(a.offsetWidth/D);c/d<D&&(D=c/d);t()};this.fitToWidth=function(b){D=b/(a.offsetWidth/D);t()};this.fitSmart=function(b,c){var d,e;d=a.offsetWidth/D;e=a.offsetHeight/D;d=b/d;void 0!==c&&c/e<d&&(d=c/e);D=Math.min(1,d);t()};this.fitToHeight=function(b){D=b/(a.offsetHeight/D);t()};
this.showFirstPage=function(){R.showFirstPage()};this.showNextPage=function(){R.showNextPage()};this.showPreviousPage=function(){R.showPreviousPage()};this.showPage=function(a){R.showPage(a);t()};this.getElement=function(){return a};this.destroy=function(b){var c=H.getElementsByTagName("head")[0];Y&&Y.parentNode&&Y.parentNode.removeChild(Y);Q&&a.removeChild(Q);c.removeChild(ha);c.removeChild(K);c.removeChild(ga);c.removeChild(ia);X.destroy(function(a){a?b(a):R.destroy(b)})};ha=n(H);R=new m(u(H));
K=u(H);ga=u(H);ia=u(H)};return odf.OdfCanvas}();
// Input 38
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(l,m,h){return new odf.OdfContainer(l,function(a){if(a.state===odf.OdfContainer.INVALID)return h("Document "+l+" is invalid.");a.state===odf.OdfContainer.DONE?a.saveAs(m,function(a){h(a)}):h("Document was not completely loaded.")})};this.render=function(l,m,h){for(m=m.getElementsByTagName("body")[0];m.firstChild;)m.removeChild(m.firstChild);m=new odf.OdfCanvas(m);m.addListener("statereadychange",function(a){h(a)});m.load(l)}};
// Input 39
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.Server=function(){};ops.Server.prototype.connect=function(l,m){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(l,m,h,a){};ops.Server.prototype.joinSession=function(l,m,h,a){};ops.Server.prototype.leaveSession=function(l,m,h,a){};ops.Server.prototype.getGenesisUrl=function(l){};
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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.Operation=function(){};ops.Operation.prototype.init=function(l){};ops.Operation.prototype.transform=function(l,m){};ops.Operation.prototype.execute=function(l){};ops.Operation.prototype.spec=function(){};
// Input 41
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OpAddCursor=function(){var l=this,m,h;this.init=function(a){m=a.memberid;h=a.timestamp};this.transform=function(a,b){return[l]};this.execute=function(a){var b=a.getCursor(m);if(b)return!1;b=new ops.OdtCursor(m,a);a.addCursor(b);a.emit(ops.OdtDocument.signalCursorAdded,b);return!0};this.spec=function(){return{optype:"AddCursor",memberid:m,timestamp:h}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");
gui.StyleHelper=function(l){function m(a){var b;a.collapsed?(b=a.startContainer,b.hasChildNodes()&&a.startOffset<b.childNodes.length&&(b=b.childNodes[a.startOffset]),a=[b]):a=e.getTextNodes(a,!0);return l.getAppliedStyles(a)}function h(a,b,c){var e=!0,g;a=m(a);for(g=0;g<a.length&&!(e=a[g]["style:text-properties"],e=!e||e[b]!==c);g+=1);return!e}function a(a,b,c){a=e.getParagraphElements(a);for(var h={},k=!1,f,n;0<a.length;){(f=a[0].getAttributeNS(g,"style-name"))?h[f]||(n=l.getStyleElement(f,"paragraph"),
h[f]=!0):k?n=void 0:(k=!0,n=l.getDefaultStyleElement("paragraph"));if(n&&(f=l.getInheritedStyleAttributes(n,!0),(f=f["style:paragraph-properties"])&&-1===c.indexOf(f[b])))return!1;a.pop()}return!0}var b=new core.DomUtils,e=new odf.OdfUtils,g=odf.Namespaces.textns;this.getAppliedStyles=m;this.applyStyle=function(a,g,c){var h=b.splitBoundaries(g),k=e.getTextNodes(g,!1);l.applyStyle(a,k,{startContainer:g.startContainer,startOffset:g.startOffset,endContainer:g.endContainer,endOffset:g.endOffset},c);h.forEach(b.normalizeTextNodes)};
this.isBold=function(a){return h(a,"fo:font-weight","bold")};this.isItalic=function(a){return h(a,"fo:font-style","italic")};this.hasUnderline=function(a){return h(a,"style:text-underline-style","solid")};this.hasStrikeThrough=function(a){return h(a,"style:text-line-through-style","solid")};this.isAlignedLeft=function(b){return a(b,"fo:text-align",["left","start"])};this.isAlignedCenter=function(b){return a(b,"fo:text-align",["center"])};this.isAlignedRight=function(b){return a(b,"fo:text-align",
["right","end"])};this.isAlignedJustified=function(b){return a(b,"fo:text-align",["justify"])}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("gui.StyleHelper");runtime.loadClass("odf.OdfUtils");
ops.OpApplyDirectStyling=function(){function l(d){var e=0<=b?a+b:a,c=d.getIteratorAtPosition(0<=b?a:a+b),e=b?d.getIteratorAtPosition(e):c;d=d.getDOM().createRange();d.setStart(c.container(),c.unfilteredDomOffset());d.setEnd(e.container(),e.unfilteredDomOffset());return d}var m,h,a,b,e,g=new odf.OdfUtils;this.init=function(d){m=d.memberid;h=d.timestamp;a=parseInt(d.position,10);b=parseInt(d.length,10);e=d.setProperties};this.transform=function(a,b){return null};this.execute=function(a){var b=l(a),
c=g.getImpactedParagraphs(b);(new gui.StyleHelper(a.getFormatting())).applyStyle(m,b,e);b.detach();a.getOdfCanvas().refreshCSS();c.forEach(function(b){a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:b,memberId:m,timeStamp:h})});a.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:m,timestamp:h,position:a,length:b,setProperties:e}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OpRemoveCursor=function(){var l=this,m,h;this.init=function(a){m=a.memberid;h=a.timestamp};this.transform=function(a,b){var e=a.spec(),g=[l];"RemoveCursor"===e.optype&&e.memberid===m&&(g=[]);return g};this.execute=function(a){return a.removeCursor(m)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:m,timestamp:h}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OpMoveCursor=function(){var l=this,m,h,a,b;this.init=function(e){m=e.memberid;h=e.timestamp;a=parseInt(e.position,10);b=void 0!==e.length?parseInt(e.length,10):0};this.merge=function(e){return"MoveCursor"===e.optype&&e.memberid===m?(a=e.position,b=e.length,h=e.timestamp,!0):!1};this.transform=function(e,g){var d=e.spec(),h=a+b,c,q=[l];switch(d.optype){case "RemoveText":c=d.position+d.length;c<=a?a-=d.length:d.position<h&&(a<d.position?b=c<h?b-d.length:d.position-a:(a=d.position,b=c<h?h-c:0));
break;case "SplitParagraph":d.position<a?a+=1:d.position<=h&&(b+=1);break;case "AddAnnotation":d.position<a?a+=1:d.position<h&&(b+=1);break;case "InsertText":d.position<a?a+=d.text.length:d.position<=h&&(b+=d.text.length);break;case "RemoveCursor":d.memberid===m&&(q=[]);break;case "InsertTable":q=null}return q};this.execute=function(e){var g=e.getCursor(m),d=e.getCursorPosition(m),h=e.getPositionFilter(),c=a-d;if(!g)return!1;d=g.getStepCounter();c=0<c?d.countForwardSteps(c,h):0>c?-d.countBackwardSteps(-c,
h):0;g.move(c);b&&(h=0<b?d.countForwardSteps(b,h):0>b?-d.countBackwardSteps(-b,h):0,g.move(h,!0));e.emit(ops.OdtDocument.signalCursorMoved,g);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:m,timestamp:h,position:a,length:b}}};
// Input 46
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OpInsertTable=function(){function l(a,c){var d;if(1===q.length)d=q[0];else if(3===q.length)switch(a){case 0:d=q[0];break;case b-1:d=q[2];break;default:d=q[1]}else d=q[a];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case e-1:return d[2];default:return d[1]}return d[c]}var m=this,h,a,b,e,g,d,p,c,q;this.init=function(k){h=k.memberid;a=k.timestamp;g=parseInt(k.position,10);b=parseInt(k.initialRows,10);e=parseInt(k.initialColumns,10);d=k.tableName;p=k.tableStyleName;c=k.tableColumnStyleName;
q=k.tableCellStyleMatrix};this.transform=function(a,b){var c=a.spec(),d=[m];switch(c.optype){case "InsertTable":d=null;break;case "AddAnnotation":c.position<g&&(g+=1);break;case "SplitParagraph":c.position<g?g+=1:c.position!==g||b||(g+=1,d=null);break;case "InsertText":c.position<g?g+=c.text.length:c.position!==g||b||(g+=c.text.length,d=null);break;case "RemoveText":c.position+c.length<=g?g-=c.length:c.position<g&&(g=c.position)}return d};this.execute=function(k){var f=k.getPositionInTextNode(g),
m=k.getRootNode();if(f){var q=k.getDOM(),s=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),x=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),r,y,t,w;p&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",p);d&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",d);x.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",
e);c&&x.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",c);s.appendChild(x);for(t=0;t<b;t+=1){x=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(w=0;w<e;w+=1)r=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(y=l(t,w))&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",y),y=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),
r.appendChild(y),x.appendChild(r);s.appendChild(x)}f=k.getParagraphElement(f.textNode);m.insertBefore(s,f?f.nextSibling:void 0);k.getOdfCanvas().refreshSize();k.emit(ops.OdtDocument.signalTableAdded,{tableElement:s,memberId:h,timeStamp:a});k.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:h,timestamp:a,position:g,initialRows:b,initialColumns:e,tableName:d,tableStyleName:p,tableColumnStyleName:c,tableCellStyleMatrix:q}}};
// Input 47
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OpInsertText=function(){var l=this,m,h,a,b;this.init=function(e){m=e.memberid;h=e.timestamp;a=parseInt(e.position,10);b=e.text};this.merge=function(e){return"InsertText"===e.optype&&e.memberid===m&&e.position===a+b.length?(b+=e.text,h=e.timestamp,!0):!1};this.transform=function(b,g){var d=b.spec(),h=[l];switch(d.optype){case "InsertText":d.position<a?a+=d.text.length:d.position!==a||g||(a+=d.text.length,h=null);break;case "AddAnnotation":d.position<a&&(a+=1);break;case "SplitParagraph":d.position<
a?a+=1:d.position!==a||g||(a+=1,h=null);break;case "InsertTable":h=null;break;case "RemoveText":d.position+d.length<=a?a-=d.length:d.position<a&&(a=d.position)}return h};this.execute=function(e){var g,d,l,c,q=e.getDOM(),k,f=0,n,u;e.upgradeWhitespacesAtPosition(a);if(g=e.getPositionInTextNode(a,m)){d=g.textNode;c=d.nextSibling;l=d.parentNode;k=e.getParagraphElement(d);for(u=0;u<b.length;u+=1)if(" "===b[u]&&(0===u||" "===b[u-1])||"\t"===b[u])0===f?(g.offset!==d.length&&(c=d.splitText(g.offset)),0<u&&
d.appendData(b.substring(0,u))):f<u&&(f=b.substring(f,u),l.insertBefore(q.createTextNode(f),c)),f=u+1,n=" "===b[u]?"text:s":"text:tab",n=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",n),n.appendChild(q.createTextNode(b[u])),l.insertBefore(n,c);0===f?d.insertData(g.offset,b):f<b.length&&(g=b.substring(f),l.insertBefore(q.createTextNode(g),c));l=d.parentNode;c=d.nextSibling;l.removeChild(d);l.insertBefore(d,c);0===d.length&&d.parentNode.removeChild(d);0<a&&(e.downgradeWhitespacesAtPosition(a-
1),1<a&&e.downgradeWhitespacesAtPosition(a-2));e.downgradeWhitespacesAtPosition(a);e.downgradeWhitespacesAtPosition(a+b.length);e.getOdfCanvas().refreshSize();e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:m,timeStamp:h});e.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:m,timestamp:h,position:a,text:b}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("core.DomUtils");
ops.OpRemoveText=function(){function l(a){function b(a){if(d.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function e(f){f=p.mergeIntoParent(f);return!d.isParagraph(f)&&f!==a&&b(f)?e(f):f}this.isEmpty=b;this.mergeChildrenIntoParent=e}function m(a){var b=a.getPositionFilter(),d,f,h,l,m=g,x=a.getDOM().createRange();a=a.getIteratorAtPosition(e);d=a.container();for(f=a.unfilteredDomOffset();m&&
a.nextPosition();)h=a.container(),l=a.unfilteredDomOffset(),b.acceptPosition(a)===NodeFilter.FILTER_ACCEPT&&(m-=1);x.setStart(d,f);x.setEnd(h,l);p.splitBoundaries(x);return x}var h=this,a,b,e,g,d,p;this.init=function(c){runtime.assert(0<=c.length,"OpRemoveText only supports positive lengths");a=c.memberid;b=c.timestamp;e=parseInt(c.position,10);g=parseInt(c.length,10);d=new odf.OdfUtils;p=new core.DomUtils};this.transform=function(c,d){var k=c.spec(),f=e+g,l,m=[h];switch(k.optype){case "RemoveText":l=
k.position+k.length;l<=e?e-=k.length:k.position<f&&(e<k.position?g=l<f?g-k.length:k.position-e:l<f?(e=k.position,g=f-l):m=[]);break;case "InsertText":k.position<=e?e+=k.text.length:k.position<f&&(g=k.position-e,l=new ops.OpRemoveText,l.init({memberid:a,timestamp:b,position:k.position+k.text.length,length:f-k.position}),m=[l,h]);break;case "SplitParagraph":k.position<=e?e+=1:k.position<f&&(g=k.position-e,l=new ops.OpRemoveText,l.init({memberid:a,timestamp:b,position:k.position+1,length:f-k.position}),
m=[l,h]);break;case "InsertTable":m=null;break;case "AddAnnotation":case "RemoveAnnotation":m=null;break;case "ApplyDirectStyling":m=null}return m};this.execute=function(c){var d,h,f,n,p=new l(c.getRootNode());c.upgradeWhitespacesAtPosition(e);c.upgradeWhitespacesAtPosition(e+g);h=m(c);d=c.getParagraphElement(h.startContainer);f=c.getTextElements(h,!0);n=c.getParagraphElements(h);h.detach();f.forEach(function(a){p.mergeChildrenIntoParent(a)});h=n.reduce(function(a,b){var c,d,e=a,f=b,g,h;p.isEmpty(a)&&
(d=!0,b.parentNode!==a.parentNode&&(g=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),f=a,e=b,h=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;f.hasChildNodes();)c=d?f.lastChild:f.firstChild,f.removeChild(c),"editinfo"!==c.localName&&e.insertBefore(c,h);g&&p.isEmpty(g)&&p.mergeChildrenIntoParent(g);p.mergeChildrenIntoParent(f);return e});c.downgradeWhitespacesAtPosition(e);c.fixCursorPositions();c.getOdfCanvas().refreshSize();c.emit(ops.OdtDocument.signalParagraphChanged,
{paragraphElement:h||d,memberId:a,timeStamp:b});c.emit(ops.OdtDocument.signalCursorMoved,c.getCursor(a));c.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:a,timestamp:b,position:e,length:g}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OpSplitParagraph=function(){var l=this,m,h,a,b=new odf.OdfUtils;this.init=function(b){m=b.memberid;h=b.timestamp;a=parseInt(b.position,10)};this.transform=function(b,g){var d=b.spec(),h=[l];switch(d.optype){case "SplitParagraph":d.position<a?a+=1:d.position!==a||g||(a+=1,h=null);break;case "AddAnnotation":d.position<a&&(a+=1);break;case "InsertText":d.position<a?a+=d.text.length:d.position!==a||g||(a+=d.text.length,h=null);break;case "InsertTable":h=null;break;case "RemoveText":d.position+d.length<=
a?a-=d.length:d.position<a&&(a=d.position)}return h};this.execute=function(e){var g,d,l,c,q,k,f;e.upgradeWhitespacesAtPosition(a);g=e.getPositionInTextNode(a,m);if(!g)return!1;d=e.getParagraphElement(g.textNode);if(!d)return!1;l=b.isListItem(d.parentNode)?d.parentNode:d;0===g.offset?(f=g.textNode.previousSibling,k=null):(f=g.textNode,k=g.offset>=g.textNode.length?null:g.textNode.splitText(g.offset));for(c=g.textNode;c!==l;)if(c=c.parentNode,q=c.cloneNode(!1),f){for(k&&q.appendChild(k);f.nextSibling;)q.appendChild(f.nextSibling);
c.parentNode.insertBefore(q,c.nextSibling);f=c;k=q}else c.parentNode.insertBefore(q,c),f=q,k=c;b.isListItem(k)&&(k=k.childNodes[0]);0===g.textNode.length&&g.textNode.parentNode.removeChild(g.textNode);e.fixCursorPositions(m);e.getOdfCanvas().refreshSize();e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:d,memberId:m,timeStamp:h});e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:m,timeStamp:h});e.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",
memberid:m,timestamp:h,position:a}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OpSetParagraphStyle=function(){var l=this,m,h,a,b;this.init=function(e){m=e.memberid;h=e.timestamp;a=e.position;b=e.styleName};this.transform=function(a,g){var d=a.spec(),h=[l];switch(d.optype){case "RemoveStyle":d.styleName===b&&"paragraph"===d.styleFamily&&(b="")}return h};this.execute=function(e){var g;g=e.getIteratorAtPosition(a);return(g=e.getParagraphElement(g.container()))?(""!==b?g.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",b):g.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),e.getOdfCanvas().refreshSize(),e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:g,timeStamp:h,memberId:m}),e.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:m,timestamp:h,position:a,styleName:b}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("odf.Namespaces");
ops.OpUpdateParagraphStyle=function(){function l(a,b){var c,d,e=b?b.split(","):[];for(c=0;c<e.length;c+=1)d=e[c].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(d[0]),d[1])}function m(a,b,c,d){var e,f,g,h=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<h.length)&&Object.keys(a).forEach(function(b){e=a[b];(c&&void 0!==c[b]||h&&-1!==h.indexOf(b))&&"object"!==typeof e&&delete a[b]});if(b&&b.attributes&&(c||0<h.length)){g=b.attributes.split(",");for(d=0;d<g.length;d+=1)if(f=g[d],c&&void 0!==
c[f]||h&&-1!==h.indexOf(f))g.splice(d,1),d-=1;0<g.length?b.attributes=g.join(","):delete b.attributes}}function h(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function a(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function b(b,c){var d=q?q[c]:null,e=k?k[c]:null;m(d,e,b.setProperties?b.setProperties[c]:null,b.removedProperties?b.removedProperties[c]:null);d&&!h(d)&&delete q[c];e&&!a(e)&&delete k[c]}function e(a){q&&["style:parent-style-name",
"style:next-style-name"].forEach(function(b){q[b]===a&&delete q[b]})}var g=this,d,p,c,q,k,f=odf.Namespaces.stylens;this.init=function(a){d=a.memberid;p=a.timestamp;c=a.styleName;q=a.setProperties;k=a.removedProperties};this.transform=function(d,f){var l=d.spec(),x=[g];switch(l.optype){case "UpdateParagraphStyle":l.styleName!==c||f||(b(l,"style:paragraph-properties"),b(l,"style:text-properties"),m(q||null,k||null,l.setProperties||null,l.removedProperties||null),q&&h(q)||k&&a(k)||(x=[]));break;case "RemoveStyle":"paragraph"===
l.styleFamily&&(l.styleName===c?x=[]:e(l.styleName))}return x};this.execute=function(a){var b=a.getFormatting(),d,e,g;return(d=""!==c?a.getParagraphStyleElement(c):b.getDefaultStyleElement("paragraph"))?(e=d.getElementsByTagNameNS(f,"paragraph-properties")[0],g=d.getElementsByTagNameNS(f,"text-properties")[0],q&&b.updateStyle(d,q),k&&(k["style:paragraph-properties"]&&(l(e,k["style:paragraph-properties"].attributes),0===e.attributes.length&&d.removeChild(e)),k["style:text-properties"]&&(l(g,k["style:text-properties"].attributes),
0===g.attributes.length&&d.removeChild(g)),l(d,k.attributes)),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,c),a.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:d,timestamp:p,styleName:c,setProperties:q,removedProperties:k}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("odf.Namespaces");
ops.OpAddStyle=function(){function l(a){d&&["style:parent-style-name","style:next-style-name"].forEach(function(b){d[b]===a&&delete d[b]})}var m=this,h,a,b,e,g,d,p=odf.Namespaces.stylens;this.init=function(c){h=c.memberid;a=c.timestamp;b=c.styleName;e=c.styleFamily;g="true"===c.isAutomaticStyle||!0===c.isAutomaticStyle;d=c.setProperties};this.transform=function(a,b){var d=a.spec();"RemoveStyle"===d.optype&&d.styleFamily===e&&l(d.styleName);return[m]};this.execute=function(a){var h=a.getOdfCanvas().odfContainer(),
k=a.getFormatting(),f=a.getDOM().createElementNS(p,"style:style");if(!f)return!1;d&&k.updateStyle(f,d);f.setAttributeNS(p,"style:family",e);f.setAttributeNS(p,"style:name",b);g?h.rootElement.automaticStyles.appendChild(f):h.rootElement.styles.appendChild(f);a.getOdfCanvas().refreshCSS();g||a.emit(ops.OdtDocument.signalCommonStyleCreated,{name:b,family:e});return!0};this.spec=function(){return{optype:"AddStyle",memberid:h,timestamp:a,styleName:b,styleFamily:e,isAutomaticStyle:g,setProperties:d}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OpRemoveStyle=function(){function l(a){var d=[];a&&["style:parent-style-name","style:next-style-name"].forEach(function(e){a[e]===b&&d.push(e)});return d}var m=this,h,a,b,e;this.init=function(g){h=g.memberid;a=g.timestamp;b=g.styleName;e=g.styleFamily};this.transform=function(g,d){var p=g.spec(),c,q;c=[m];switch(p.optype){case "RemoveStyle":p.styleName===b&&p.styleFamily===e&&(c=[]);break;case "UpdateParagraphStyle":"paragraph"===e&&(q=l(p.setProperties),0<q.length&&(c=new ops.OpUpdateParagraphStyle,
c.init({memberid:h,timestamp:a,styleName:p.styleName,removedProperties:{attributes:q.join(",")}}),c=[c,m]));break;case "AddStyle":p.styleFamily===e&&(q=l(p.setProperties),0<q.length&&(c=new ops.OpUpdateParagraphStyle,c.init({memberid:h,timestamp:a,styleName:p.styleName,removedProperties:{attributes:q.join(",")}}),c=[c,m]));break;case "SetParagraphStyle":"paragraph"===e&&p.styleName===b&&(p.styleName="",c=new ops.OpSetParagraphStyle,c.init(p),c=[c,m])}return c};this.execute=function(a){var d=a.getStyleElement(b,
e);if(!d)return!1;d.parentNode.removeChild(d);a.getOdfCanvas().refreshCSS();a.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:b,family:e});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:h,timestamp:a,styleName:b,styleFamily:e}}};
// Input 54
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OpAddAnnotation=function(){function l(a,b,c){var e=a.getPositionInTextNode(c,h);e&&(a=e.textNode,c=a.parentNode,e.offset!==a.length&&a.splitText(e.offset),c.insertBefore(b,a.nextSibling),0===a.length&&c.removeChild(a))}var m=this,h,a,b,e,g;this.init=function(d){h=d.memberid;a=parseInt(d.timestamp,10);b=parseInt(d.position,10);e=parseInt(d.length,10)||0;g=d.name};this.transform=function(a,g){var c=a.spec(),h=b+e,k=[m];switch(c.optype){case "AddAnnotation":c.position<b?b+=1:c.position!==b||g||(b+=
1,k=null);break;case "InsertText":c.position<=b?b+=c.text.length:c.position<=h&&(e+=c.text.length);break;case "SplitParagraph":c.position<=b?b+=1:c.position<=h&&(e+=1);break;case "InsertTable":k=null;break;case "RemoveText":c.position+c.length<=b?b-=c.length:c.position<b&&(b=c.position)}return k};this.execute=function(d){var m={},c=d.getPositionFilter(),q=d.getCursor(h),k=d.getCursorPosition(h),k=b-k-1,f=new Date(a),n,u,s,x,r;r=d.getDOM();n=r.createElementNS(odf.Namespaces.officens,"office:annotation");
n.setAttributeNS(odf.Namespaces.officens,"office:name",g);u=r.createElementNS(odf.Namespaces.dcns,"dc:creator");u.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",h);s=r.createElementNS(odf.Namespaces.dcns,"dc:date");s.appendChild(r.createTextNode(f.toISOString()));f=r.createElementNS(odf.Namespaces.textns,"text:list");x=r.createElementNS(odf.Namespaces.textns,"text:list-item");r=r.createElementNS(odf.Namespaces.textns,"text:p");x.appendChild(r);f.appendChild(x);n.appendChild(u);
n.appendChild(s);n.appendChild(f);m.node=n;if(!m.node)return!1;if(e){n=d.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");n.setAttributeNS(odf.Namespaces.officens,"office:name",g);m.end=n;if(!m.end)return!1;l(d,m.end,b+e)}l(d,m.node,b);q&&(n=q.getStepCounter(),c=0<k?n.countForwardSteps(k,c):0>k?-n.countBackwardSteps(-k,c):0,q.move(c),d.emit(ops.OdtDocument.signalCursorMoved,q));d.getOdfCanvas().addAnnotation(m);return!0};this.spec=function(){return{optype:"AddAnnotation",
memberid:h,timestamp:a,position:b,length:e,name:g}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("odf.Namespaces");runtime.loadClass("core.DomUtils");
ops.OpRemoveAnnotation=function(){var l,m,h,a,b;this.init=function(e){l=e.memberid;m=e.timestamp;h=parseInt(e.position,10);a=parseInt(e.length,10);b=new core.DomUtils};this.transform=function(a,b){return null};this.execute=function(a){for(var g=a.getIteratorAtPosition(h).container(),d,l=null,c=null;g.namespaceURI!==odf.Namespaces.officens||"annotation"!==g.localName;)g=g.parentNode;if(null===g)return!1;l=g;(d=l.getAttributeNS(odf.Namespaces.officens,"name"))&&(c=b.getElementsByTagNameNS(a.getRootNode(),
odf.Namespaces.officens,"annotation-end").filter(function(a){return d===a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);a.getOdfCanvas().forgetAnnotations();for(g=b.getElementsByTagNameNS(l,odf.Namespaces.webodfns+":names:cursor","cursor");g.length;)l.parentNode.insertBefore(g.pop(),l);l.parentNode.removeChild(l);c&&c.parentNode.removeChild(c);a.fixCursorPositions();a.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:l,timestamp:m,
position:h,length:a}}};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpAddStyle");runtime.loadClass("ops.OpRemoveStyle");runtime.loadClass("ops.OpAddAnnotation");
runtime.loadClass("ops.OpRemoveAnnotation");
ops.OperationFactory=function(){function l(h){return function(){return new h}}var m;this.register=function(h,a){m[h]=a};this.create=function(h){var a=null,b=m[h.optype];b&&(a=b(h),a.init(h));return a};m={AddCursor:l(ops.OpAddCursor),ApplyDirectStyling:l(ops.OpApplyDirectStyling),InsertTable:l(ops.OpInsertTable),InsertText:l(ops.OpInsertText),RemoveText:l(ops.OpRemoveText),SplitParagraph:l(ops.OpSplitParagraph),SetParagraphStyle:l(ops.OpSetParagraphStyle),UpdateParagraphStyle:l(ops.OpUpdateParagraphStyle),
AddStyle:l(ops.OpAddStyle),RemoveStyle:l(ops.OpRemoveStyle),MoveCursor:l(ops.OpMoveCursor),RemoveCursor:l(ops.OpRemoveCursor),AddAnnotation:l(ops.OpAddAnnotation),RemoveAnnotation:l(ops.OpRemoveAnnotation)}};
// Input 57
runtime.loadClass("core.Cursor");runtime.loadClass("core.DomUtils");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(l,m){function h(){r.setUnfilteredPosition(l.getNode(),0);return r}function a(a,b){var c,d=null;a&&(c=b?a[a.length-1]:a[0]);c&&(d={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return d}function b(c,d,e,f){var g=c.nodeType;e.setStart(c,d);e.collapse(!f);f=a(e.getClientRects(),!0===f);!f&&0<d&&(e.setStart(c,d-1),e.setEnd(c,d),f=a(e.getClientRects(),!0));f||(g===Node.ELEMENT_NODE&&c.childNodes[d-1]?f=b(c,d-1,e,!0):c.nodeType===Node.TEXT_NODE&&0<d?f=b(c,d-1,e,!0):c.previousSibling?
f=b(c.previousSibling,c.previousSibling.nodeType===Node.TEXT_NODE?c.previousSibling.textContent.length:c.previousSibling.childNodes.length,e,!0):c.parentNode&&c.parentNode!==m?f=b(c.parentNode,0,e,!1):(e.selectNode(m),f=a(e.getClientRects(),!1)));runtime.assert(Boolean(f),"No visible rectangle found");return f}function e(a,c,d){var e=a,f=h(),g,k=m.ownerDocument.createRange(),n=l.getSelectedRange()?l.getSelectedRange().cloneRange():m.ownerDocument.createRange(),r,s=runtime.getWindow();for(g=b(f.container(),
f.unfilteredDomOffset(),k);0<e&&d();)e-=1;c?(c=f.container(),f=f.unfilteredDomOffset(),-1===n.comparePoint(c,f)?(n.setStart(c,f),r=!1):n.setEnd(c,f)):(n.setStart(f.container(),f.unfilteredDomOffset()),n.collapse(!0));l.setSelectedRange(n,r);f=h();n=b(f.container(),f.unfilteredDomOffset(),k);if(n.top===g.top||void 0===y)y=n.left;s.clearTimeout(t);t=s.setTimeout(function(){y=void 0},2E3);k.detach();return a-e}function g(a){var b=h();return a.acceptPosition(b)===w?!0:!1}function d(a,b){for(var c=h(),
d=new core.LoopWatchDog(1E3),e=0,f=0;0<a&&c.nextPosition();)e+=1,d.check(),b.acceptPosition(c)===w&&(f+=e,e=0,a-=1);return f}function p(a,b,c){for(var d=h(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&d.nextPosition();)e.check(),c.acceptPosition(d)===w&&(f+=1,b.acceptPosition(d)===w&&(g+=f,f=0,a-=1));return g}function c(a,b,c){for(var d=h(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&d.previousPosition();)e.check(),c.acceptPosition(d)===w&&(f+=1,b.acceptPosition(d)===w&&(g+=f,f=0,a-=1));return g}function q(a,
b){for(var c=h(),d=new core.LoopWatchDog(1E3),e=0,f=0;0<a&&c.previousPosition();)e+=1,d.check(),b.acceptPosition(c)===w&&(f+=e,e=0,a-=1);return f}function k(a){var b=h(),c=s.getParagraphElement(b.getCurrentNode()),e;e=-q(1,a);if(0===e||c&&c!==s.getParagraphElement(b.getCurrentNode()))e=d(1,a);return e}function f(a,c){var d=h(),e=0,f=0,g=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var k=c,l=g,n=d,r=n.container(),s=0,x=null,q=void 0,p=10,t=void 0,u=0,S=void 0,B=void 0,H=void 0,t=void 0,E=m.ownerDocument.createRange(),
T=new core.LoopWatchDog(1E3),t=b(r,n.unfilteredDomOffset(),E),S=t.top,B=void 0===y?t.left:y,H=S;!0===(0>l?n.previousPosition():n.nextPosition());)if(T.check(),k.acceptPosition(n)===w&&(s+=1,r=n.container(),t=b(r,n.unfilteredDomOffset(),E),t.top!==S)){if(t.top!==H&&H!==S)break;H=t.top;t=Math.abs(B-t.left);if(null===x||t<p)x=r,q=n.unfilteredDomOffset(),p=t,u=s}null!==x?(n.setUnfilteredPosition(x,q),s=u):s=0;E.detach();e+=s;if(0===e)break;f+=e;a-=1}return f*g}function n(a,c){var d,e,f,g,k=h(),l=s.getParagraphElement(k.getCurrentNode()),
n=0,r=m.ownerDocument.createRange();0>a?(d=k.previousPosition,e=-1):(d=k.nextPosition,e=1);for(f=b(k.container(),k.unfilteredDomOffset(),r);d.call(k);)if(c.acceptPosition(k)===w){if(s.getParagraphElement(k.getCurrentNode())!==l)break;g=b(k.container(),k.unfilteredDomOffset(),r);if(g.bottom!==f.bottom&&(f=g.top>=f.top&&g.bottom<f.bottom||g.top<=f.top&&g.bottom>f.bottom,!f))break;n+=e;f=g}r.detach();return n}function u(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");
var d=h(),e=d.container(),f=d.unfilteredDomOffset(),g=0,k=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(e,f);e=x.comparePoints(a,b,d.container(),d.unfilteredDomOffset());if(0>e)for(;d.nextPosition()&&(k.check(),c.acceptPosition(d)===w&&(g+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&
!(k.check(),c.acceptPosition(d)===w&&(g-=1,0>=x.comparePoints(a,b,d.container(),d.unfilteredDomOffset()))););return g}var s,x,r,y,t,w=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,b){return e(a,b,r.nextPosition)};this.movePointBackward=function(a,b){return e(a,b,r.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:d,countBackwardSteps:q,convertForwardStepsBetweenFilters:p,convertBackwardStepsBetweenFilters:c,countLinesSteps:f,countStepsToLineBoundary:n,
countStepsToPosition:u,isPositionWalkable:g,countStepsToValidPosition:k}};(function(){s=new odf.OdfUtils;x=new core.DomUtils;r=gui.SelectionMover.createPositionIterator(m);var a=m.ownerDocument.createRange();a.setStart(r.container(),r.unfilteredDomOffset());a.collapse(!0);l.setSelectedRange(a)})()};
gui.SelectionMover.createPositionIterator=function(l){var m=new function(){this.acceptNode=function(h){return"urn:webodf:names:cursor"===h.namespaceURI||"urn:webodf:names:editinfo"===h.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(l,5,m,!1)};(function(){return gui.SelectionMover})();
// Input 58
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpAddStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpRemoveStyle");
ops.OperationTransformer=function(){function l(h,a){for(var b,e,g,d=[],p=[];0<h.length&&a;){b=h.shift();e=a;var c=void 0;g=c=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b.spec()));runtime.log(runtime.toJson(e.spec()));c=m.create(e.spec());g=e.transform(b,!0);e=(c=b.transform(c,!1))&&g?{opsA:c,opsB:g}:null;if(!e)return null;d=d.concat(e.opsA);if(0===e.opsB.length){d=d.concat(h);a=null;break}if(1<e.opsB.length)for(b=0;b<e.opsB.length-1;b+=1){g=l(h,e.opsB[b]);if(!g)return null;
p=p.concat(g.opsB);h=g.opsA}a=e.opsB.pop()}a&&p.push(a);return{opsA:d,opsB:p}}var m;this.setOperationFactory=function(h){m=h};this.transform=function(h,a){var b,e=[],g,d=[];for(b=0;b<h.length;b+=1){g=m.create(h[b]);if(!g)return null;e.push(g)}for(b=0;b<a.length;b+=1){g=m.create(a[b]);g=l(e,g);if(!g)return null;e=g.opsA;d=d.concat(g.opsB)}return{opsA:e,opsB:d}}};
// Input 59
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(l,m){var h=this,a,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,g){var d=0;0<b?d=a.movePointForward(b,g):0>=b&&(d=-a.movePointBackward(-b,g));h.handleUpdate();return d};this.handleUpdate=function(){};this.getStepCounter=function(){return a.getStepCounter()};this.getMemberId=function(){return l};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.getOdtDocument=function(){return m};b=new core.Cursor(m.getDOM(),l);a=new gui.SelectionMover(b,m.getRootNode())};
// Input 60
/*

 Copyright (C) 2012 KO GmbH <aditya.bhatt@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.EditInfo=function(l,m){function h(){var a=[],g;for(g in b)b.hasOwnProperty(g)&&a.push({memberid:g,time:b[g].time});a.sort(function(a,b){return a.time-b.time});return a}var a,b={};this.getNode=function(){return a};this.getOdtDocument=function(){return m};this.getEdits=function(){return b};this.getSortedEdits=function(){return h()};this.addEdit=function(a,g){b[a]={time:g}};this.clearEdits=function(){b={}};this.destroy=function(b){l.removeChild(a);b()};a=m.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");l.insertBefore(a,l.firstChild)};
// Input 61
gui.Avatar=function(l,m){var h=this,a,b,e;this.setColor=function(a){b.style.borderColor=a};this.setImageUrl=function(a){h.isVisible()?b.src=a:e=a};this.isVisible=function(){return"block"===a.style.display};this.show=function(){e&&(b.src=e,e=void 0);a.style.display="block"};this.hide=function(){a.style.display="none"};this.markAsFocussed=function(b){a.className=b?"active":""};this.destroy=function(b){l.removeChild(a);b()};(function(){var e=l.ownerDocument,d=e.documentElement.namespaceURI;a=e.createElementNS(d,
"div");b=e.createElementNS(d,"img");b.width=64;b.height=64;a.appendChild(b);a.style.width="64px";a.style.height="70px";a.style.position="absolute";a.style.top="-80px";a.style.left="-34px";a.style.display=m?"block":"none";l.appendChild(a)})()};
// Input 62
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(l,m,h){function a(e){d&&g.parentNode&&(!p||e)&&(e&&void 0!==c&&runtime.clearTimeout(c),p=!0,b.style.opacity=e||"0"===b.style.opacity?"1":"0",c=runtime.setTimeout(function(){p=!1;a(!1)},500))}var b,e,g,d=!1,p=!1,c;this.refreshCursorBlinking=function(){h||l.getSelectedRange().collapsed?(d=!0,a(!0)):(d=!1,b.style.opacity="0")};this.setFocus=function(){d=!0;e.markAsFocussed(!0);a(!0)};this.removeFocus=function(){d=!1;e.markAsFocussed(!1);b.style.opacity="1"};this.show=function(){b.style.visibility=
"visible";e.markAsFocussed(!0)};this.hide=function(){b.style.visibility="hidden";e.markAsFocussed(!1)};this.setAvatarImageUrl=function(a){e.setImageUrl(a)};this.setColor=function(a){b.style.borderColor=a;e.setColor(a)};this.getCursor=function(){return l};this.getFocusElement=function(){return b};this.toggleHandleVisibility=function(){e.isVisible()?e.hide():e.show()};this.showHandle=function(){e.show()};this.hideHandle=function(){e.hide()};this.ensureVisible=function(){var a,c,d,e,g=l.getOdtDocument().getOdfCanvas().getElement().parentNode,
h;d=g.offsetWidth-g.clientWidth+5;e=g.offsetHeight-g.clientHeight+5;h=b.getBoundingClientRect();a=h.left-d;c=h.top-e;d=h.right+d;e=h.bottom+e;h=g.getBoundingClientRect();c<h.top?g.scrollTop-=h.top-c:e>h.bottom&&(g.scrollTop+=e-h.bottom);a<h.left?g.scrollLeft-=h.left-a:d>h.right&&(g.scrollLeft+=d-h.right)};this.destroy=function(a){e.destroy(function(c){c?a(c):(g.removeChild(b),a())})};(function(){var a=l.getOdtDocument().getDOM();b=a.createElementNS(a.documentElement.namespaceURI,"span");g=l.getNode();
g.appendChild(b);e=new gui.Avatar(g,m)})()};
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
 @source: http://gitorious.org/webodf/webodf/
*/
gui.KeyboardHandler=function(){function l(a,e){e||(e=m.None);return a+":"+e}var m=gui.KeyboardHandler.Modifier,h=null,a={};this.setDefault=function(a){h=a};this.bind=function(b,e,g){b=l(b,e);runtime.assert(!1===a.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);a[b]=g};this.unbind=function(b,e){var g=l(b,e);delete a[g]};this.reset=function(){h=null;a={}};this.handleEvent=function(b){var e=b.keyCode,g=m.None;b.metaKey&&(g|=m.Meta);b.ctrlKey&&(g|=m.Ctrl);b.altKey&&(g|=m.Alt);
b.shiftKey&&(g|=m.Shift);e=l(e,g);e=a[e];g=!1;e?g=e():null!==h&&(g=h(b));g&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
// Input 64
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("odf.Namespaces");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("odf.TextSerializer");
gui.Clipboard=function(){var l,m,h;this.setDataFromRange=function(a,b){var e=!0,g,d=a.clipboardData;g=runtime.getWindow();var h=b.startContainer.ownerDocument;!d&&g&&(d=g.clipboardData);d?(h=h.createElement("span"),h.appendChild(b.cloneContents()),g=d.setData("text/plain",m.writeToString(h)),e=e&&g,g=d.setData("text/html",l.writeToString(h,odf.Namespaces.namespaceMap)),e=e&&g,a.preventDefault()):e=!1;return e};l=new xmldom.LSSerializer;m=new odf.TextSerializer;h=new odf.OdfNodeFilter;l.filter=h;m.filter=
h};
// Input 65
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.EventNotifier");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("gui.StyleHelper");
gui.DirectTextStyler=function(l,m){function h(a,b){for(var c=0,d=b[c];d&&a;)a=a[d],c+=1,d=b[c];return b.length===c?a:void 0}function a(a,b){var c=h(a[0],b);return a.every(function(a){return c===h(a,b)})?c:void 0}function b(){function b(a,c,d){a!==c&&(void 0===e&&(e={}),e[d]=c);return c}var c=x.getCursor(m),d=c&&c.getSelectedRange(),c=d&&r.getAppliedStyles(d),e;t=b(t,d?r.isBold(d):!1,"isBold");w=b(w,d?r.isItalic(d):!1,"isItalic");v=b(v,d?r.hasUnderline(d):!1,"hasUnderline");F=b(F,d?r.hasStrikeThrough(d):
!1,"hasStrikeThrough");d=c&&a(c,["style:text-properties","fo:font-size"]);J=b(J,d&&parseFloat(d),"fontSize");z=b(z,c&&a(c,["style:text-properties","style:font-name"]),"fontName");e&&y.emit(gui.DirectTextStyler.textStylingChanged,e)}function e(a){a.getMemberId()===m&&b()}function g(a){a===m&&b()}function d(a){a.getMemberId()===m&&b()}function p(){b()}function c(a){var c=x.getCursor(m);c&&x.getParagraphElement(c.getNode())===a.paragraphElement&&b()}function q(a,b){var c=x.getCursor(m);if(!c)return!1;
b(!a(c.getSelectedRange()));return!0}function k(a,b){var c=x.getCursorSelection(m),d=new ops.OpApplyDirectStyling,e={};e[a]=b;d.init({memberid:m,position:c.position,length:c.length,setProperties:{"style:text-properties":e}});l.enqueue(d)}function f(a){k("fo:font-weight",a?"bold":"normal")}function n(a){k("fo:font-style",a?"italic":"normal")}function u(a){k("style:text-underline-style",a?"solid":"none")}function s(a){k("style:text-line-through-style",a?"solid":"none")}var x=l.getOdtDocument(),r=new gui.StyleHelper(x.getFormatting()),
y=new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]),t=!1,w=!1,v=!1,F=!1,J,z;this.setBold=f;this.setItalic=n;this.setHasUnderline=u;this.setHasStrikethrough=s;this.setFontSize=function(a){k("fo:font-size",a+"pt")};this.setFontName=function(a){k("style:font-name",a)};this.toggleBold=q.bind(this,r.isBold,f);this.toggleItalic=q.bind(this,r.isItalic,n);this.toggleUnderline=q.bind(this,r.hasUnderline,u);this.toggleStrikethrough=q.bind(this,r.hasStrikeThrough,s);this.isBold=function(){return t};
this.isItalic=function(){return w};this.hasUnderline=function(){return v};this.hasStrikeThrough=function(){return F};this.fontSize=function(){return J};this.fontName=function(){return z};this.subscribe=function(a,b){y.subscribe(a,b)};this.unsubscribe=function(a,b){y.unsubscribe(a,b)};this.destroy=function(a){x.unsubscribe(ops.OdtDocument.signalCursorAdded,e);x.unsubscribe(ops.OdtDocument.signalCursorRemoved,g);x.unsubscribe(ops.OdtDocument.signalCursorMoved,d);x.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,
p);x.unsubscribe(ops.OdtDocument.signalParagraphChanged,c);a()};x.subscribe(ops.OdtDocument.signalCursorAdded,e);x.subscribe(ops.OdtDocument.signalCursorRemoved,g);x.subscribe(ops.OdtDocument.signalCursorMoved,d);x.subscribe(ops.OdtDocument.signalParagraphStyleModified,p);x.subscribe(ops.OdtDocument.signalParagraphChanged,c);b()};gui.DirectTextStyler.textStylingChanged="textStyling/changed";(function(){return gui.DirectTextStyler})();
// Input 66
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.Utils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddStyle");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("gui.StyleHelper");
gui.DirectParagraphStyler=function(l,m,h){function a(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b=n.getCursor(m),b=b&&b.getSelectedRange(),c;y=a(y,b?x.isAlignedLeft(b):!1,"isAlignedLeft");t=a(t,b?x.isAlignedCenter(b):!1,"isAlignedCenter");w=a(w,b?x.isAlignedRight(b):!1,"isAlignedRight");v=a(v,b?x.isAlignedJustified(b):!1,"isAlignedJustified");c&&r.emit(gui.DirectParagraphStyler.paragraphStylingChanged,c)}function b(b){b.getMemberId()===m&&a()}function e(b){b===m&&a()}function g(b){b.getMemberId()===
m&&a()}function d(){a()}function p(b){var c=n.getCursor(m);c&&n.getParagraphElement(c.getNode())===b.paragraphElement&&a()}function c(a){var b=n.getCursor(m).getSelectedRange(),c=n.getCursorPosition(m),b=s.getParagraphElements(b),d=n.getFormatting();b.forEach(function(b){var e=c+n.getDistanceFromCursor(m,b,0),f=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=h.generateName();var g,e=e+1;f&&(g=d.createDerivedStyleObject(f,"paragraph",{}));g=a(g||{});f=new ops.OpAddStyle;f.init({memberid:m,styleName:b,
styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:g});g=new ops.OpSetParagraphStyle;g.init({memberid:m,styleName:b,position:e});l.enqueue(f);l.enqueue(g)})}function q(a){c(function(b){return u.mergeObjects(b,a)})}function k(a){q({"style:paragraph-properties":{"fo:text-align":a}})}function f(a,b){var c=n.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&s.parseLength(d);return u.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var n=l.getOdtDocument(),u=new core.Utils,s=new odf.OdfUtils,x=new gui.StyleHelper(n.getFormatting()),r=new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]),y,t,w,v;this.isAlignedLeft=function(){return y};this.isAlignedCenter=function(){return t};this.isAlignedRight=function(){return w};this.isAlignedJustified=function(){return v};this.alignParagraphLeft=function(){k("left");return!0};this.alignParagraphCenter=function(){k("center");
return!0};this.alignParagraphRight=function(){k("right");return!0};this.alignParagraphJustified=function(){k("justify");return!0};this.indent=function(){c(f.bind(null,1));return!0};this.outdent=function(){c(f.bind(null,-1));return!0};this.subscribe=function(a,b){r.subscribe(a,b)};this.unsubscribe=function(a,b){r.unsubscribe(a,b)};this.destroy=function(a){n.unsubscribe(ops.OdtDocument.signalCursorAdded,b);n.unsubscribe(ops.OdtDocument.signalCursorRemoved,e);n.unsubscribe(ops.OdtDocument.signalCursorMoved,
g);n.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,d);n.unsubscribe(ops.OdtDocument.signalParagraphChanged,p);a()};n.subscribe(ops.OdtDocument.signalCursorAdded,b);n.subscribe(ops.OdtDocument.signalCursorRemoved,e);n.subscribe(ops.OdtDocument.signalCursorMoved,g);n.subscribe(ops.OdtDocument.signalParagraphStyleModified,d);n.subscribe(ops.OdtDocument.signalParagraphChanged,p);a()};gui.DirectParagraphStyler.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectParagraphStyler})();
// Input 67
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Utils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.DirectTextStyler");
runtime.loadClass("gui.DirectParagraphStyler");
gui.SessionController=function(){var l=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(m,h,a){function b(a,b,c,d){var e="on"+b,f=!1;a.attachEvent&&(f=a.attachEvent(e,c));!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0);f&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function e(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function g(a){a.preventDefault?a.preventDefault():a.returnValue=!1}
function d(a,b){var c=new ops.OpMoveCursor;c.init({memberid:h,position:a,length:b||0});return c}function p(a,b){var c=gui.SelectionMover.createPositionIterator(C.getRootNode()),d=C.getOdfCanvas().getElement(),e;e=a;if(!e)return null;for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return null;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,
b);return C.getDistanceFromCursor(h,c.container(),c.unfilteredDomOffset())}function c(a){var b=C.getOdfCanvas().getElement(),c=C.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function q(a){runtime.setTimeout(function(){var b;a:{var e=C.getOdfCanvas().getElement();b=aa.getSelection();b={anchorNode:b.anchorNode,anchorOffset:b.anchorOffset,
focusNode:b.focusNode,focusOffset:b.focusOffset};var f=a.detail,g,k;if(null===b.anchorNode&&null===b.focusNode){k=a.clientX;g=a.clientY;var l=C.getDOM();l.caretRangeFromPoint?(k=l.caretRangeFromPoint(k,g),k={container:k.startContainer,offset:k.startOffset}):l.caretPositionFromPoint?(k=l.caretPositionFromPoint(k,g),k={container:k.offsetNode,offset:k.offset}):k=null;if(!k){b=null;break a}b.anchorNode=k.container;b.anchorOffset=k.offset;b.focusNode=b.anchorNode;b.focusOffset=b.anchorOffset}runtime.assert(null!==
b.anchorNode&&null!==b.focusNode,"anchorNode is null or focusNode is null");g=la.containsNode(e,b.anchorNode);k=la.containsNode(e,b.focusNode);if(g||k){g||(g=c(b.anchorNode),b.anchorNode=g.node,b.anchorOffset=g.offset);k||(g=c(b.focusNode),b.focusNode=g.node,b.focusOffset=g.offset);if(2===f){var n=/[A-Za-z0-9]/,r=gui.SelectionMover.createPositionIterator(C.getRootNode()),s=0<la.comparePoints(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset),x;s?(g=b.anchorNode,l=b.anchorOffset,f=b.focusNode,
k=b.focusOffset):(g=b.focusNode,l=b.focusOffset,f=b.anchorNode,k=b.anchorOffset);for(r.setUnfilteredPosition(g,l);r.previousPosition();){x=r.getCurrentNode();if(x.nodeType===Node.TEXT_NODE){if(x=x.data[r.unfilteredDomOffset()],!n.test(x))break}else if(x.namespaceURI!==odf.Namespaces.textns||"span"!==x.localName)break;g=r.container();l=r.unfilteredDomOffset()}r.setUnfilteredPosition(f,k);do if(x=r.getCurrentNode(),x.nodeType===Node.TEXT_NODE){if(x=x.data[r.unfilteredDomOffset()],!n.test(x))break}else if(x.namespaceURI!==
odf.Namespaces.textns||"span"!==x.localName)break;while(r.nextPosition());f=r.container();k=r.unfilteredDomOffset();s?(b.anchorNode=g,b.anchorOffset=l,b.focusNode=f,b.focusOffset=k):(b.focusNode=g,b.focusOffset=l,b.anchorNode=f,b.anchorOffset=k)}else 3===f&&(f=C.getParagraphElement(b.anchorNode),k=C.getParagraphElement(b.focusNode),f&&(b.anchorNode=f,b.anchorOffset=0),k&&(b.focusNode=k,b.focusOffset=k.childNodes.length));e.focus()}else b=null}null!==b&&(e=p(b.anchorNode,b.anchorOffset),f=b.focusNode===
b.anchorNode&&b.focusOffset===b.anchorOffset?e:p(b.focusNode,b.focusOffset),null!==f&&0!==f||null!==e&&0!==e)&&(b=C.getCursorPosition(h),e=d(b+e,f-e),m.enqueue(e))},0)}function k(a){q(a)}function f(a){var b=C.getCursorSelection(h),c=C.getCursor(h).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,qa,ra):-c.convertBackwardStepsBetweenFilters(-a,qa,ra),a=b.length+a,m.enqueue(d(b.position,a)))}function n(a){var b=C.getCursorPosition(h),c=C.getCursor(h).getStepCounter();0!==a&&(a=0<
a?c.convertForwardStepsBetweenFilters(a,qa,ra):-c.convertBackwardStepsBetweenFilters(-a,qa,ra),m.enqueue(d(b+a,0)))}function u(){n(-1);return!0}function s(){n(1);return!0}function x(){f(-1);return!0}function r(){f(1);return!0}function y(a,b){var c=C.getParagraphElement(C.getCursor(h).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=C.getCursor(h).getStepCounter().countLinesSteps(a,qa);b?f(c):n(c)}function t(){y(-1,!1);return!0}function w(){y(1,!1);return!0}function v(){y(-1,
!0);return!0}function F(){y(1,!0);return!0}function J(a,b){var c=C.getCursor(h).getStepCounter().countStepsToLineBoundary(a,qa);b?f(c):n(c)}function z(){J(-1,!1);return!0}function L(){J(1,!1);return!0}function A(){J(-1,!0);return!0}function P(){J(1,!0);return!0}function G(){var a=C.getParagraphElement(C.getCursor(h).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");c=C.getDistanceFromCursor(h,a,0);b=gui.SelectionMover.createPositionIterator(C.getRootNode());for(b.setUnfilteredPosition(a,
0);0===c&&b.previousPosition();)a=b.getCurrentNode(),sa.isParagraph(a)&&(c=C.getDistanceFromCursor(h,a,0));f(c);return!0}function M(){var a=C.getParagraphElement(C.getCursor(h).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(C.getRootNode());b.moveToEndOfNode(a);for(c=C.getDistanceFromCursor(h,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),sa.isParagraph(a)&&(b.moveToEndOfNode(a),
c=C.getDistanceFromCursor(h,b.container(),b.unfilteredDomOffset()));f(c);return!0}function ea(a,b){var c=gui.SelectionMover.createPositionIterator(C.getRootNode());0<a&&c.moveToEnd();c=C.getDistanceFromCursor(h,c.container(),c.unfilteredDomOffset());b?f(c):n(c)}function na(){ea(-1,!1);return!0}function N(){ea(1,!1);return!0}function oa(){ea(-1,!0);return!0}function V(){ea(1,!0);return!0}function Z(){var a=gui.SelectionMover.createPositionIterator(C.getRootNode()),b;b=-C.getDistanceFromCursor(h,a.container(),
a.unfilteredDomOffset());a.moveToEnd();b+=C.getDistanceFromCursor(h,a.container(),a.unfilteredDomOffset());m.enqueue(d(0,b));return!0}function O(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function S(a){var b=new ops.OpRemoveText;b.init({memberid:h,position:a.position,length:a.length});return b}function B(){var a=O(C.getCursorSelection(h)),b=null;0===a.length?0<a.position&&C.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:h,position:a.position-1,
length:1}),m.enqueue(b)):(b=S(a),m.enqueue(b));return!0}function H(){var a=O(C.getCursorSelection(h)),b=null;0===a.length?C.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:h,position:a.position,length:1}),m.enqueue(b)):(b=S(a),m.enqueue(b));return null!==b}function E(){var a=O(C.getCursorSelection(h));0!==a.length&&m.enqueue(S(a));return!0}function T(a){var b=O(C.getCursorSelection(h)),c=null;0<b.length&&(c=S(b),m.enqueue(c));c=new ops.OpInsertText;c.init({memberid:h,
position:b.position,text:a});m.enqueue(c)}function X(){var a=O(C.getCursorSelection(h)),b;0<a.length&&(b=S(a),m.enqueue(b));b=new ops.OpSplitParagraph;b.init({memberid:h,position:a.position});m.enqueue(b);return!0}function R(){var a=C.getCursor(h),b=aa.getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function Q(a){var b=C.getCursor(h);b.getSelectedRange().collapsed||(ua.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=O(m.getOdtDocument().getCursorSelection(h)),
b.init({memberid:h,position:a.position,length:a.length}),m.enqueue(b)):runtime.log("Cut operation failed"))}function Y(){return!1!==C.getCursor(h).getSelectedRange().collapsed}function $(a){var b=C.getCursor(h);b.getSelectedRange().collapsed||ua.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function U(a){var b;aa.clipboardData&&aa.clipboardData.getData?b=aa.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));
b&&(T(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function ha(){return!1}function K(a){if(W)W.onOperationExecuted(a)}function ga(a){C.emit(ops.OdtDocument.signalUndoStackChanged,a)}function ia(){return W?(W.moveBackward(1),R(),!0):!1}function D(){return W?(W.moveForward(1),R(),!0):!1}function ja(a){ta=a.target&&la.containsNode(C.getOdfCanvas().getElement(),a.target)}function ka(a){var b=a.target,c=null;if("annotationRemoveButton"===b.className){a=c=la.getElementsByTagNameNS(b.parentNode,
odf.Namespaces.officens,"annotation")[0];for(var b=0,c=gui.SelectionMover.createPositionIterator(C.getRootNode()),d=new core.LoopWatchDog(1E3),e=!1;c.nextPosition();)if(d.check(),e=Boolean(a.compareDocumentPosition(c.container())&Node.DOCUMENT_POSITION_CONTAINED_BY),ra.acceptPosition(c)===l){if(e)break;b+=1}c=0;d=gui.SelectionMover.createPositionIterator(C.getRootNode());e=!1;d.setUnfilteredPosition(a,0);do{e=Boolean(a.compareDocumentPosition(d.container())&Node.DOCUMENT_POSITION_CONTAINED_BY);if(!e&&
a!==d.container())break;ra.acceptPosition(d)===l&&(c+=1)}while(d.nextPosition());a=c;c=new ops.OpRemoveAnnotation;c.init({memberid:h,position:b,length:a});m.enqueue(c)}else ta&&q(a)}var aa=runtime.getWindow(),C=m.getOdtDocument(),ma=new core.Utils,la=new core.DomUtils,sa=new odf.OdfUtils,ua=new gui.Clipboard,I=new gui.KeyboardHandler,pa=new gui.KeyboardHandler,qa=new core.PositionFilterChain,ra=C.getPositionFilter(),ta=!1,ma=new odf.StyleNameGenerator("auto"+ma.hashString(h)+"_",C.getFormatting()),
W=null,fa=a&&a.directStylingEnabled?new gui.DirectTextStyler(m,h):null,ba=a&&a.directStylingEnabled?new gui.DirectParagraphStyler(m,h,ma):null;runtime.assert(null!==aa,"Expected to be run in an environment which has a global window, like a browser.");qa.addFilter("BaseFilter",ra);qa.addFilter("RootFilter",C.createRootFilter(h));this.startEditing=function(){var a;a=C.getOdfCanvas().getElement();b(a,"keydown",I.handleEvent);b(a,"keypress",pa.handleEvent);b(a,"keyup",g);b(a,"beforecut",Y,!0);b(a,"cut",
Q);b(a,"copy",$);b(a,"beforepaste",ha,!0);b(a,"paste",U);b(aa,"mousedown",ja);b(aa,"mouseup",ka);b(a,"contextmenu",k);C.subscribe(ops.OdtDocument.signalOperationExecuted,R);C.subscribe(ops.OdtDocument.signalOperationExecuted,K);a=new ops.OpAddCursor;a.init({memberid:h});m.enqueue(a);W&&W.saveInitialState()};this.endEditing=function(){var a;C.unsubscribe(ops.OdtDocument.signalOperationExecuted,K);C.unsubscribe(ops.OdtDocument.signalOperationExecuted,R);a=C.getOdfCanvas().getElement();e(a,"keydown",
I.handleEvent);e(a,"keypress",pa.handleEvent);e(a,"keyup",g);e(a,"cut",Q);e(a,"beforecut",Y);e(a,"copy",$);e(a,"paste",U);e(a,"beforepaste",ha);e(aa,"mousedown",ja);e(aa,"mouseup",ka);e(a,"contextmenu",k);a=new ops.OpRemoveCursor;a.init({memberid:h});m.enqueue(a);W&&W.resetInitialState()};this.getInputMemberId=function(){return h};this.getSession=function(){return m};this.setUndoManager=function(a){W&&W.unsubscribe(gui.UndoManager.signalUndoStackChanged,ga);if(W=a)W.setOdtDocument(C),W.setPlaybackFunction(function(a){a.execute(C)}),
W.subscribe(gui.UndoManager.signalUndoStackChanged,ga)};this.getUndoManager=function(){return W};this.getDirectTextStyler=function(){return fa};this.getDirectParagraphStyler=function(){return ba};this.destroy=function(a){var b=ba?ba.destroy:function(a){a()};(fa?fa.destroy:function(a){a()})(function(c){c?a(c):b(a)})};(function(){var a=-1!==aa.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;I.bind(c.Tab,b.None,function(){T("\t");return!0});
I.bind(c.Left,b.None,u);I.bind(c.Right,b.None,s);I.bind(c.Up,b.None,t);I.bind(c.Down,b.None,w);I.bind(c.Backspace,b.None,B);I.bind(c.Delete,b.None,H);I.bind(c.Left,b.Shift,x);I.bind(c.Right,b.Shift,r);I.bind(c.Up,b.Shift,v);I.bind(c.Down,b.Shift,F);I.bind(c.Home,b.None,z);I.bind(c.End,b.None,L);I.bind(c.Home,b.Ctrl,na);I.bind(c.End,b.Ctrl,N);I.bind(c.Home,b.Shift,A);I.bind(c.End,b.Shift,P);I.bind(c.Up,b.CtrlShift,G);I.bind(c.Down,b.CtrlShift,M);I.bind(c.Home,b.CtrlShift,oa);I.bind(c.End,b.CtrlShift,
V);a?(I.bind(c.Clear,b.None,E),I.bind(c.Left,b.Meta,z),I.bind(c.Right,b.Meta,L),I.bind(c.Home,b.Meta,na),I.bind(c.End,b.Meta,N),I.bind(c.Left,b.MetaShift,A),I.bind(c.Right,b.MetaShift,P),I.bind(c.Up,b.AltShift,G),I.bind(c.Down,b.AltShift,M),I.bind(c.Up,b.MetaShift,oa),I.bind(c.Down,b.MetaShift,V),I.bind(c.A,b.Meta,Z),fa&&(I.bind(c.B,b.Meta,fa.toggleBold),I.bind(c.I,b.Meta,fa.toggleItalic),I.bind(c.U,b.Meta,fa.toggleUnderline)),ba&&(I.bind(c.L,b.MetaShift,ba.alignParagraphLeft),I.bind(c.E,b.MetaShift,
ba.alignParagraphCenter),I.bind(c.R,b.MetaShift,ba.alignParagraphRight),I.bind(c.J,b.MetaShift,ba.alignParagraphJustified)),I.bind(c.Z,b.Meta,ia),I.bind(c.Z,b.MetaShift,D)):(I.bind(c.A,b.Ctrl,Z),fa&&(I.bind(c.B,b.Ctrl,fa.toggleBold),I.bind(c.I,b.Ctrl,fa.toggleItalic),I.bind(c.U,b.Ctrl,fa.toggleUnderline)),ba&&(I.bind(c.L,b.CtrlShift,ba.alignParagraphLeft),I.bind(c.E,b.CtrlShift,ba.alignParagraphCenter),I.bind(c.R,b.CtrlShift,ba.alignParagraphRight),I.bind(c.J,b.CtrlShift,ba.alignParagraphJustified)),
I.bind(c.Z,b.Ctrl,ia),I.bind(c.Z,b.CtrlShift,D));pa.setDefault(function(a){var b;b=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(T(b),!0)});pa.bind(c.Enter,b.None,X)})()};return gui.SessionController}();
// Input 68
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.MemberModel=function(){};ops.MemberModel.prototype.getMemberDetailsAndUpdates=function(l,m){};ops.MemberModel.prototype.unsubscribeMemberDetailsUpdates=function(l,m){};ops.MemberModel.prototype.close=function(l){};
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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.TrivialMemberModel=function(){this.getMemberDetailsAndUpdates=function(l,m){m(l,{memberid:l,fullname:"Unknown",color:"black",imageurl:"avatar-joe.png"})};this.unsubscribeMemberDetailsUpdates=function(l,m){};this.close=function(l){l()}};
// Input 70
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(l){};ops.OperationRouter.prototype.setPlaybackFunction=function(l){};ops.OperationRouter.prototype.push=function(l){};ops.OperationRouter.prototype.close=function(l){};ops.OperationRouter.prototype.getHasLocalUnsyncedOpsAndUpdates=function(l){};ops.OperationRouter.prototype.unsubscribeHasLocalUnsyncedOpsUpdates=function(l){};
// Input 71
/*

 Copyright (C) 2012 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
ops.TrivialOperationRouter=function(){var l,m;this.setOperationFactory=function(h){l=h};this.setPlaybackFunction=function(h){m=h};this.push=function(h){h=h.spec();h.timestamp=(new Date).getTime();h=l.create(h);m(h)};this.close=function(h){h()};this.getHasLocalUnsyncedOpsAndUpdates=function(h){h(!0)};this.unsubscribeHasLocalUnsyncedOpsUpdates=function(h){}};
// Input 72
gui.EditInfoHandle=function(l){var m=[],h,a=l.ownerDocument,b=a.documentElement.namespaceURI;this.setEdits=function(e){m=e;var g,d,l,c;h.innerHTML="";for(e=0;e<m.length;e+=1)g=a.createElementNS(b,"div"),g.className="editInfo",d=a.createElementNS(b,"span"),d.className="editInfoColor",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[e].memberid),l=a.createElementNS(b,"span"),l.className="editInfoAuthor",l.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[e].memberid),
c=a.createElementNS(b,"span"),c.className="editInfoTime",c.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[e].memberid),c.innerHTML=m[e].time,g.appendChild(d),g.appendChild(l),g.appendChild(c),h.appendChild(g)};this.show=function(){h.style.display="block"};this.hide=function(){h.style.display="none"};this.destroy=function(a){l.removeChild(h);a()};h=a.createElementNS(b,"div");h.setAttribute("class","editInfoHandle");h.style.display="none";l.appendChild(h)};
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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(l,m){function h(a,b){return runtime.getWindow().setTimeout(function(){g.style.opacity=a},b)}var a=this,b,e,g,d,p;this.addEdit=function(a,b){var k=Date.now()-b;l.addEdit(a,b);e.setEdits(l.getSortedEdits());g.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);if(d){var f=d;runtime.getWindow().clearTimeout(f)}p&&(f=p,runtime.getWindow().clearTimeout(f));1E4>k?(h(1,0),d=h(0.5,1E4-k),p=h(0.2,2E4-k)):1E4<=k&&2E4>k?(h(0.5,0),p=h(0.2,2E4-k)):h(0.2,0)};this.getEdits=
function(){return l.getEdits()};this.clearEdits=function(){l.clearEdits();e.setEdits([]);g.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&g.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return l};this.show=function(){g.style.display="block"};this.hide=function(){a.hideHandle();g.style.display="none"};this.showHandle=function(){e.show()};this.hideHandle=function(){e.hide()};this.destroy=function(a){b.removeChild(g);e.destroy(function(b){b?
a(b):l.destroy(a)})};(function(){var c=l.getOdtDocument().getDOM();g=c.createElementNS(c.documentElement.namespaceURI,"div");g.setAttribute("class","editInfoMarker");g.onmouseover=function(){a.showHandle()};g.onmouseout=function(){a.hideHandle()};b=l.getNode();b.appendChild(g);e=new gui.EditInfoHandle(b);m||a.hide()})()};
// Input 74
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("gui.Caret");runtime.loadClass("ops.TrivialMemberModel");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
gui.SessionView=function(){return function(l,m,h){function a(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid^="'+a+'"]'+e+c;a:{var f=q.firstChild;for(b=b+'[editinfo|memberid^="'+a+'"]'+e;f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:q.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","")}function b(a){var b,c;for(c in f)f.hasOwnProperty(c)&&(b=f[c],a?b.show():b.hide())}function e(a){h.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function g(b,c){var d=h.getCaret(b);c?(d&&(d.setAvatarImageUrl(c.imageurl),d.setColor(c.color)),a(b,c.fullname,c.color)):runtime.log('MemberModel sent undefined data for member "'+b+'".')}function d(a){var b=a.getMemberId(),
c=m.getMemberModel();h.registerCursor(a,u,s);g(b,null);c.getMemberDetailsAndUpdates(b,g);runtime.log("+++ View here +++ eagerly created an Caret for '"+b+"'! +++")}function p(a){var b=!1,c;for(c in f)if(f.hasOwnProperty(c)&&f[c].getEditInfo().getEdits().hasOwnProperty(a)){b=!0;break}b||m.getMemberModel().unsubscribeMemberDetailsUpdates(a,g)}function c(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",g=b.getElementsByTagNameNS(k,"editinfo")[0];g?(e=g.getAttributeNS(k,"id"),d=f[e]):
(e=Math.random().toString(),d=new ops.EditInfo(b,m.getOdtDocument()),d=new gui.EditInfoMarker(d,n),g=b.getElementsByTagNameNS(k,"editinfo")[0],g.setAttributeNS(k,"id",e),f[e]=d);d.addEdit(c,new Date(a))}var q,k="urn:webodf:names:editinfo",f={},n=void 0!==l.editInfoMarkersInitiallyVisible?Boolean(l.editInfoMarkersInitiallyVisible):!0,u=void 0!==l.caretAvatarsInitiallyVisible?Boolean(l.caretAvatarsInitiallyVisible):!0,s=void 0!==l.caretBlinksOnRangeSelect?Boolean(l.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=
function(){n||(n=!0,b(n))};this.hideEditInfoMarkers=function(){n&&(n=!1,b(n))};this.showCaretAvatars=function(){u||(u=!0,e(u))};this.hideCaretAvatars=function(){u&&(u=!1,e(u))};this.getSession=function(){return m};this.getCaret=function(a){return h.getCaret(a)};this.destroy=function(a){var b=m.getOdtDocument(),e=m.getMemberModel(),k=Object.keys(f).map(function(a){return f[a]});b.subscribe(ops.OdtDocument.signalCursorAdded,d);b.subscribe(ops.OdtDocument.signalCursorRemoved,p);b.subscribe(ops.OdtDocument.signalParagraphChanged,
c);h.getCarets().forEach(function(a){e.unsubscribeMemberDetailsUpdates(a.getCursor().getMemberId(),g)});q.parentNode.removeChild(q);(function v(b,c){c?a(c):b<k.length?k[b].destroy(function(a){v(b+1,a)}):a()})(0,void 0)};(function(){var a=m.getOdtDocument(),b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,d);a.subscribe(ops.OdtDocument.signalCursorRemoved,p);a.subscribe(ops.OdtDocument.signalParagraphChanged,c);q=document.createElementNS(b.namespaceURI,"style");
q.type="text/css";q.media="screen, print, handheld, projection";q.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));q.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(q)})()}}();
// Input 75
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("gui.Caret");
gui.CaretManager=function(l){function m(a){return k.hasOwnProperty(a)?k[a]:null}function h(){return Object.keys(k).map(function(a){return k[a]})}function a(){return l.getSession().getOdtDocument().getOdfCanvas().getElement()}function b(b){b===l.getInputMemberId()&&a().removeAttribute("tabindex");delete k[b]}function e(a){a=a.getMemberId();a===l.getInputMemberId()&&(a=m(a))&&a.refreshCursorBlinking()}function g(a){a.memberId===l.getInputMemberId()&&(a=m(a.memberId))&&a.ensureVisible()}function d(){var a=
m(l.getInputMemberId());a&&a.setFocus()}function p(){var a=m(l.getInputMemberId());a&&a.removeFocus()}function c(){var a=m(l.getInputMemberId());a&&a.show()}function q(){var a=m(l.getInputMemberId());a&&a.hide()}var k={},f=runtime.getWindow();this.registerCursor=function(b,c,d){var e=b.getMemberId(),f=a();c=new gui.Caret(b,c,d);k[e]=c;e===l.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+e),b.handleUpdate=c.ensureVisible,f.setAttribute("tabindex",0),f.focus());return c};
this.getCaret=m;this.getCarets=h;this.destroy=function(k){var m=l.getSession().getOdtDocument(),s=a(),x=h();m.unsubscribe(ops.OdtDocument.signalParagraphChanged,g);m.unsubscribe(ops.OdtDocument.signalCursorMoved,e);m.unsubscribe(ops.OdtDocument.signalCursorRemoved,b);s.removeEventListener("focus",d,!1);s.removeEventListener("blur",p,!1);f.removeEventListener("focus",c,!1);f.removeEventListener("blur",q,!1);(function y(a,b){b?k(b):a<x.length?x[a].destroy(function(b){y(a+1,b)}):k()})(0,void 0)};(function(){var h=
l.getSession().getOdtDocument(),k=a();h.subscribe(ops.OdtDocument.signalParagraphChanged,g);h.subscribe(ops.OdtDocument.signalCursorMoved,e);h.subscribe(ops.OdtDocument.signalCursorRemoved,b);k.addEventListener("focus",d,!1);k.addEventListener("blur",p,!1);f.addEventListener("focus",c,!1);f.addEventListener("blur",q,!1)})()};
// Input 76
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var l=new xmldom.XPath,m=runtime.getWindow();return function(h){var a=this;a.setInitialSlideMode=function(){a.startSlideMode("single")};a.keyDownHandler=function(b){if(!b.target.isContentEditable&&"input"!==b.target.nodeName)switch(b.keyCode){case 84:a.toggleToolbar();break;case 37:case 8:a.prevSlide();break;case 39:case 32:a.nextSlide();break;case 36:a.firstSlide();break;case 35:a.lastSlide()}};a.root=function(){return a.odf_canvas.odfContainer().rootElement};a.firstSlide=
function(){a.slideChange(function(a,e){return 0})};a.lastSlide=function(){a.slideChange(function(a,e){return e-1})};a.nextSlide=function(){a.slideChange(function(a,e){return a+1<e?a+1:-1})};a.prevSlide=function(){a.slideChange(function(a,e){return 1>a?-1:a-1})};a.slideChange=function(b){var e=a.getPages(a.odf_canvas.odfContainer().rootElement),g=-1,d=0;e.forEach(function(a){a=a[1];a.hasAttribute("slide_current")&&(g=d,a.removeAttribute("slide_current"));d+=1});b=b(g,e.length);-1===b&&(b=g);e[b][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=b;"cont"===a.slide_mode&&m.scrollBy(0,e[b][1].getBoundingClientRect().top-30)};a.selectSlide=function(b){a.slideChange(function(a,g){return b>=g||0>b?-1:b})};a.scrollIntoContView=function(b){var e=a.getPages(a.odf_canvas.odfContainer().rootElement);0!==e.length&&m.scrollBy(0,e[b][1].getBoundingClientRect().top-30)};a.getPages=function(a){a=a.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var e=[],g;for(g=0;g<a.length;g+=1)e.push([a[g].getAttribute("draw:name"),
a[g]]);return e};a.fillPageList=function(b,e){for(var g=a.getPages(b),d,h,c;e.firstChild;)e.removeChild(e.firstChild);for(d=0;d<g.length;d+=1)h=document.createElement("option"),c=l.getODFElementsWithXPath(g[d][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),c=0<c.length?c[0].textContent:g[d][0],h.textContent=d+1+": "+c,e.appendChild(h)};a.startSlideMode=function(b){var e=document.getElementById("pagelist"),g=a.odf_canvas.slidevisibilitycss().sheet;for(a.slide_mode=
b;0<g.cssRules.length;)g.deleteRule(0);a.selectSlide(0);"single"===a.slide_mode?(g.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),g.insertRule("draw|page[slide_current]  { z-index:2;}",1),g.insertRule("draw|page  { -webkit-transform: scale(1);}",2),a.fitToWindow(),m.addEventListener("resize",a.fitToWindow,!1)):"cont"===a.slide_mode&&m.removeEventListener("resize",a.fitToWindow,!1);a.fillPageList(a.odf_canvas.odfContainer().rootElement,e)};a.toggleToolbar=function(){var b,
e,g;b=a.odf_canvas.slidevisibilitycss().sheet;e=-1;for(g=0;g<b.cssRules.length;g+=1)if(".toolbar"===b.cssRules[g].cssText.substring(0,8)){e=g;break}-1<e?b.deleteRule(e):b.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};a.fitToWindow=function(){var b=a.getPages(a.root()),e=(m.innerHeight-40)/b[0][1].clientHeight,b=(m.innerWidth-10)/b[0][1].clientWidth,e=e<b?e:b,b=a.odf_canvas.slidevisibilitycss().sheet;b.deleteRule(2);b.insertRule("draw|page { \n-moz-transform: scale("+
e+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+e+"); -o-transform-origin: 0% 0%; -o-transform: scale("+e+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+e+"); }",2)};a.load=function(b){a.odf_canvas.load(b)};a.odf_element=h;a.odf_canvas=new odf.OdfCanvas(a.odf_element);a.odf_canvas.addListener("statereadychange",a.setInitialSlideMode);a.slide_mode="undefined";document.addEventListener("keydown",a.keyDownHandler,!1)}}();
// Input 77
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(l,m){function h(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function a(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(){var a=l.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!u)||(a=a.getRangeAt(0),u.setPoint(a.startContainer,a.startOffset))}function e(){var a=l.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();u&&u.node()&&(b=u.node(),c=b.ownerDocument.createRange(),
c.setStart(b,u.position()),c.collapse(!0),a.addRange(c))}function g(c){var d=c.charCode||c.keyCode;if(u=null,u&&37===d)b(),u.stepBackward(),e();else if(16<=d&&20>=d||33<=d&&40>=d)return;a(c)}function d(b){a(b)}function p(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&p(b),b=b.nextSibling||b.parentNode;var c,d,e,b=a.attributes;c="";for(e=b.length-1;0<=e;e-=1)d=b.item(e),c=c+" "+d.nodeName+'="'+d.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(d=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&d.test(c.nodeValue)&&c.parentNode.removeChild(c)}function c(a,b){for(var d=a.firstChild,e,f,g;d&&d!==a;){if(d.nodeType===Node.ELEMENT_NODE)for(c(d,b),e=d.attributes,g=e.length-1;0<=g;g-=1)f=e.item(g),"http://www.w3.org/2000/xmlns/"!==f.namespaceURI||b[f.nodeValue]||(b[f.nodeValue]=f.localName);d=d.nextSibling||d.parentNode}}function q(){var a=l.ownerDocument.createElement("style"),b;b={};c(l,b);
var d={},e,f,g=0;for(e in b)if(b.hasOwnProperty(e)&&e){f=b[e];if(!f||d.hasOwnProperty(f)||"xmlns"===f){do f="ns"+g,g+=1;while(d.hasOwnProperty(f));b[e]=f}d[f]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+k;a.appendChild(l.ownerDocument.createTextNode(b));m=m.parentNode.replaceChild(a,m)}var k,f,n,u=null;l.id||(l.id="xml"+String(Math.random()).substring(2));f="#"+l.id+" ";k=f+"*,"+f+":visited, "+f+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
f+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+f+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+f+"{overflow: auto;}\n";(function(b){h(b,"click",d);h(b,"keydown",g);h(b,"drop",a);h(b,"dragend",a);h(b,"beforepaste",a);h(b,"paste",a)})(l);this.updateCSS=q;this.setXML=function(a){a=a.documentElement||a;n=a=l.ownerDocument.importNode(a,!0);for(p(a);l.lastChild;)l.removeChild(l.lastChild);l.appendChild(a);q();u=new core.PositionIterator(a)};this.getXML=
function(){return n}};
// Input 78
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(l,m){};gui.UndoManager.prototype.unsubscribe=function(l,m){};gui.UndoManager.prototype.setOdtDocument=function(l){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(l){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(l){};gui.UndoManager.prototype.moveBackward=function(l){};gui.UndoManager.prototype.onOperationExecuted=function(l){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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
 @source: http://gitorious.org/webodf/webodf/
*/
gui.UndoStateRules=function(){function l(h){return h.spec().optype}function m(h){switch(l(h)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=l;this.isEditOperation=m;this.isPartOfOperationSet=function(h,a){if(m(h)){if(0===a.length)return!0;var b;if(b=m(a[a.length-1]))a:{b=a.filter(m);var e=l(h),g;b:switch(e){case "RemoveText":case "InsertText":g=!0;break b;default:g=!1}if(g&&e===l(b[0])){if(1===b.length){b=!0;break a}e=b[b.length-2].spec().position;
b=b[b.length-1].spec().position;g=h.spec().position;if(b===g-(b-e)){b=!0;break a}}b=!1}return b}return!0}};
// Input 80
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.UndoManager");runtime.loadClass("gui.UndoStateRules");
gui.TrivialUndoManager=function(l){function m(){s.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:g.hasUndoStates(),redoAvailable:g.hasRedoStates()})}function h(){f!==c&&f!==n[n.length-1]&&n.push(f)}function a(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);d.normalizeTextNodes(b)}function b(a){return Object.keys(a).map(function(b){return a[b]})}function e(a){function c(a){var b=a.spec();if(f[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete f[b.memberid],g-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},f={},g,h=a.pop();k.getCursors().forEach(function(a){f[a.getMemberId()]=!0});for(g=Object.keys(f).length;h&&0<g;)h.reverse(),h.forEach(c),h=a.pop();return b(d).concat(b(e))}var g=this,d=new core.DomUtils,p,c=[],q,k,f=[],n=[],u=[],s=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
x=l||new gui.UndoStateRules;this.subscribe=function(a,b){s.subscribe(a,b)};this.unsubscribe=function(a,b){s.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<n.length};this.hasRedoStates=function(){return 0<u.length};this.setOdtDocument=function(a){k=a};this.resetInitialState=function(){n.length=0;u.length=0;c.length=0;f.length=0;p=null;m()};this.saveInitialState=function(){var b=k.getOdfCanvas().odfContainer(),g=k.getOdfCanvas().getAnnotationManager();g&&g.forgetAnnotations();p=b.rootElement.cloneNode(!0);
k.getOdfCanvas().refreshAnnotations();b=p;d.getElementsByTagNameNS(b,"urn:webodf:names:cursor","cursor").forEach(a);d.getElementsByTagNameNS(b,"urn:webodf:names:cursor","anchor").forEach(a);h();n.unshift(c);f=c=e(n);n.length=0;u.length=0;m()};this.setPlaybackFunction=function(a){q=a};this.onOperationExecuted=function(a){u.length=0;x.isEditOperation(a)&&f===c||!x.isPartOfOperationSet(a,f)?(h(),f=[a],n.push(f),s.emit(gui.UndoManager.signalUndoStateCreated,{operations:f}),m()):(f.push(a),s.emit(gui.UndoManager.signalUndoStateModified,
{operations:f}))};this.moveForward=function(a){for(var b=0,c;a&&u.length;)c=u.pop(),n.push(c),c.forEach(q),a-=1,b+=1;b&&(f=n[n.length-1],m());return b};this.moveBackward=function(a){for(var b=k.getOdfCanvas(),d=b.odfContainer(),e=0;a&&n.length;)u.push(n.pop()),a-=1,e+=1;e&&(d.setRootElement(p.cloneNode(!0)),b.setOdfContainer(d,!0),s.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),k.getCursors().forEach(function(a){k.removeCursor(a.getMemberId())}),c.forEach(q),n.forEach(function(a){a.forEach(q)}),
b.refreshCSS(),f=n[n.length-1]||c,m());return e}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
// Input 81
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("gui.SelectionMover");runtime.loadClass("gui.StyleHelper");runtime.loadClass("core.PositionFilterChain");
ops.OdtDocument=function(l){function m(){var a=l.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function h(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var d=q[a].getNode();return b(c)===b(d)?f:n}}function a(a){var b=
gui.SelectionMover.createPositionIterator(m());for(a+=1;0<a&&b.nextPosition();)u.acceptPosition(b)===f&&(a-=1);return b}function b(a){return p.getParagraphElement(a)}function e(a,b){return l.getFormatting().getStyleElement(a,b)}function g(a){return e(a,"paragraph")}var d=this,p,c,q={},k=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonStyleCreated,
ops.OdtDocument.signalCommonStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),f=core.PositionFilter.FilterResult.FILTER_ACCEPT,n=core.PositionFilter.FilterResult.FILTER_REJECT,u;this.getIteratorAtPosition=a;this.getStyleElement=e;this.upgradeWhitespacesAtPosition=function(b){b=a(b);var c,d,e;b.previousPosition();b.previousPosition();for(e=-1;1>=e;e+=1){c=b.container();d=b.unfilteredDomOffset();if(c.nodeType===Node.TEXT_NODE&&
" "===c.data[d]&&p.isSignificantWhitespace(c,d)){runtime.assert(" "===c.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=c.ownerDocument.createElementNS(odf.Namespaces.textns,"text:s");f.appendChild(c.ownerDocument.createTextNode(" "));c.deleteData(d,1);0<d&&(c=c.splitText(d));c.parentNode.insertBefore(f,c);c=f;b.moveToEndOfNode(c)}b.nextPosition()}};this.downgradeWhitespacesAtPosition=function(b){var d=a(b),e;b=d.container();for(d=d.unfilteredDomOffset();!p.isCharacterElement(b)&&
b.childNodes[d];)b=b.childNodes[d],d=0;b.nodeType===Node.TEXT_NODE&&(b=b.parentNode);p.isDowngradableSpaceElement(b)&&(d=b.firstChild,e=b.lastChild,c.mergeIntoParent(b),e!==d&&c.normalizeTextNodes(e),c.normalizeTextNodes(d))};this.getParagraphStyleElement=g;this.getParagraphElement=b;this.getParagraphStyleAttributes=function(a){return(a=g(a))?l.getFormatting().getInheritedStyleAttributes(a):null};this.getPositionInTextNode=function(a,b){var c=gui.SelectionMover.createPositionIterator(m()),e=null,
g,h=0,k=null,k=a;runtime.assert(0<=a,"position must be >= 0");u.acceptPosition(c)===f?(g=c.container(),g.nodeType===Node.TEXT_NODE&&(e=g,h=0)):a+=1;for(;0<a||null===e;){if(!c.nextPosition())return null;if(u.acceptPosition(c)===f)if(a-=1,g=c.container(),g.nodeType===Node.TEXT_NODE)g!==e?(e=g,h=c.unfilteredDomOffset()):h+=1;else if(null!==e){if(0===a){h=e.length;break}e=null}else if(0===a){e=m().ownerDocument.createTextNode("");g.insertBefore(e,c.rightNode());h=0;break}}if(null===e)return null;if(b&&
q[b]&&d.getCursorPosition(b)===k){for(k=q[b].getNode();0===h&&k.nextSibling&&"cursor"===k.nextSibling.localName;)k.parentNode.insertBefore(k,k.nextSibling.nextSibling);0<e.length&&(e=m().ownerDocument.createTextNode(""),h=0,k.parentNode.insertBefore(e,k.nextSibling));for(;0===h&&(e.previousSibling&&"cursor"===e.previousSibling.localName)&&(g=e.previousSibling,0<e.length&&(e=m().ownerDocument.createTextNode("")),g.parentNode.insertBefore(e,g),k!==g););}for(;e.previousSibling&&e.previousSibling.nodeType===
Node.TEXT_NODE;)e.previousSibling.appendData(e.data),h=e.previousSibling.length,e=e.previousSibling,e.parentNode.removeChild(e.nextSibling);return{textNode:e,offset:h}};this.fixCursorPositions=function(a){var b,c,e,f=new core.PositionFilterChain;f.addFilter("BaseFilter",d.getPositionFilter());for(b in q)q.hasOwnProperty(b)&&(f.addFilter("RootFilter",d.createRootFilter(b)),c=q[b],e=c.getStepCounter(),e.isPositionWalkable(f)?0===d.getCursorSelection(b).length&&c.move(0):(e=e.countStepsToValidPosition(f),
c.move(e),b===a&&d.emit(ops.OdtDocument.signalCursorMoved,c)),f.removeFilter("RootFilter"))};this.getWalkableParagraphLength=function(c){var d=a(0),e=0;d.setUnfilteredPosition(c,0);do{if(b(d.container())!==c)break;u.acceptPosition(d)===f&&(e+=1)}while(d.nextPosition());return e};this.getDistanceFromCursor=function(a,b,c){a=q[a];var d=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,d=a(b,c,u));return d};this.getCursorPosition=
function(a){return-d.getDistanceFromCursor(a,m(),0)};this.getCursorSelection=function(a){var b;a=q[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(m(),0,u),b=b(a.getAnchorNode(),0,u));return{position:c+b,length:-b}};this.getPositionFilter=function(){return u};this.getOdfCanvas=function(){return l};this.getRootNode=m;this.getDOM=function(){return m().ownerDocument};this.getCursor=function(a){return q[a]};this.getCursors=function(){var a=[],b;for(b in q)q.hasOwnProperty(b)&&a.push(q[b]);
return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countForwardSteps(1,u),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!q[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);a.move(b);q[c]=a};this.removeCursor=function(a){var b=q[a];return b?(b.removeFromOdtDocument(),delete q[a],d.emit(ops.OdtDocument.signalCursorRemoved,a),!0):!1};
this.getMetaData=function(a){for(var b=l.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return l.getFormatting()};this.getTextElements=function(a,b){return p.getTextElements(a,b)};this.getParagraphElements=function(a){return p.getParagraphElements(a)};this.emit=function(a,b){k.emit(a,b)};
this.subscribe=function(a,b){k.subscribe(a,b)};this.unsubscribe=function(a,b){k.unsubscribe(a,b)};this.createRootFilter=function(a){return new h(a)};this.close=function(a){a()};this.destroy=function(a){a()};u=new function(){function a(b,c,d){var e,g;if(c&&(e=p.lookLeftForCharacter(c),1===e||2===e&&(p.scanRightForAnyCharacter(d)||p.scanRightForAnyCharacter(p.nextNode(b)))))return f;e=null===c&&p.isParagraph(b);g=p.lookRightForCharacter(d);if(e)return g?f:p.scanRightForAnyCharacter(d)?n:f;if(!g)return n;
c=c||p.previousNode(b);return p.scanLeftForAnyCharacter(c)?n:f}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,e,g,h;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return n;if(d===Node.TEXT_NODE){if(!p.isGroupingElement(c.parentNode)||p.isWithinTrackedChanges(c.parentNode,m()))return n;d=b.unfilteredDomOffset();e=c.data;runtime.assert(d!==e.length,"Unexpected offset.");if(0<d){b=e.substr(d-1,1);if(!p.isODFWhitespace(b))return f;if(1<d)if(b=e.substr(d-2,1),!p.isODFWhitespace(b))g=f;
else{if(!p.isODFWhitespace(e.substr(0,d)))return n}else h=p.previousNode(c),p.scanLeftForNonWhitespace(h)&&(g=f);if(g===f)return p.isTrailingWhitespace(c,d)?n:f;g=e.substr(d,1);return p.isODFWhitespace(g)?n:p.scanLeftForAnyCharacter(p.previousNode(c))?n:f}h=b.leftNode();g=c;c=c.parentNode;g=a(c,h,g)}else!p.isGroupingElement(c)||p.isWithinTrackedChanges(c,m())?g=n:(h=b.leftNode(),g=b.rightNode(),g=a(c,h,g));return g}};p=new odf.OdfUtils;c=new core.DomUtils};ops.OdtDocument.signalCursorAdded="cursor/added";
ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalCommonStyleCreated="style/created";ops.OdtDocument.signalCommonStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";
(function(){return ops.OdtDocument})();
// Input 82
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

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
 @source: http://gitorious.org/webodf/webodf/
*/
runtime.loadClass("ops.TrivialMemberModel");runtime.loadClass("ops.TrivialOperationRouter");runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OdtDocument");
ops.Session=function(l){var m=new ops.OperationFactory,h=new ops.OdtDocument(l),a=new ops.TrivialMemberModel,b=null;this.setMemberModel=function(b){a=b};this.setOperationFactory=function(a){m=a;b&&b.setOperationFactory(m)};this.setOperationRouter=function(a){b=a;a.setPlaybackFunction(function(a){a.execute(h);h.emit(ops.OdtDocument.signalOperationExecuted,a)});a.setOperationFactory(m)};this.getMemberModel=function(){return a};this.getOperationFactory=function(){return m};this.getOdtDocument=function(){return h};
this.enqueue=function(a){b.push(a)};this.close=function(e){b.close(function(b){b?e(b):a.close(function(a){a?e(a):h.close(e)})})};this.destroy=function(a){h.destroy(a)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 83
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\noffice|text * draw|text-box {\n    /** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
