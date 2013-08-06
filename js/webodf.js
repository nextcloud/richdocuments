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
function Runtime(){}Runtime.ByteArray=function(k){};Runtime.prototype.getVariable=function(k){};Runtime.prototype.toJson=function(k){};Runtime.prototype.fromJson=function(k){};Runtime.ByteArray.prototype.slice=function(k,g){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(k){};Runtime.prototype.byteArrayFromString=function(k,g){};Runtime.prototype.byteArrayToString=function(k,g){};Runtime.prototype.concatByteArrays=function(k,g){};
Runtime.prototype.read=function(k,g,l,h){};Runtime.prototype.readFile=function(k,g,l){};Runtime.prototype.readFileSync=function(k,g){};Runtime.prototype.loadXML=function(k,g){};Runtime.prototype.writeFile=function(k,g,l){};Runtime.prototype.isFile=function(k,g){};Runtime.prototype.getFileSize=function(k,g){};Runtime.prototype.deleteFile=function(k,g){};Runtime.prototype.log=function(k,g){};Runtime.prototype.setTimeout=function(k,g){};Runtime.prototype.clearTimeout=function(k){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(k){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(k,g,l){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(k,g){function l(b){var a="",f,d=b.length;for(f=0;f<d;f+=1)a+=String.fromCharCode(b[f]&255);return a}function h(b){var a="",f,d=b.length,c,h,e,r;for(f=0;f<d;f+=1)c=b[f],128>c?a+=String.fromCharCode(c):(f+=1,h=b[f],194<=c&&224>c?a+=String.fromCharCode((c&31)<<6|h&63):(f+=1,e=b[f],224<=c&&240>c?a+=String.fromCharCode((c&15)<<12|(h&63)<<6|e&63):(f+=1,r=b[f],240<=c&&245>c&&(c=(c&7)<<18|(h&63)<<12|(e&63)<<6|r&63,c-=65536,a+=String.fromCharCode((c>>10)+55296,(c&1023)+56320)))));
return a}var b;"utf8"===g?b=h(k):("binary"!==g&&this.log("Unsupported encoding: "+g),b=l(k));return b};Runtime.getVariable=function(k){try{return eval(k)}catch(g){}};Runtime.toJson=function(k){return JSON.stringify(k)};Runtime.fromJson=function(k){return JSON.parse(k)};Runtime.getFunctionName=function(k){return void 0===k.name?(k=/function\s+(\w+)/.exec(k))&&k[1]:k.name};
function BrowserRuntime(k){function g(a,f){var d,c,b;void 0!==f?b=a:f=a;k?(c=k.ownerDocument,b&&(d=c.createElement("span"),d.className=b,d.appendChild(c.createTextNode(b)),k.appendChild(d),k.appendChild(c.createTextNode(" "))),d=c.createElement("span"),0<f.length&&"<"===f[0]?d.innerHTML=f:d.appendChild(c.createTextNode(f)),k.appendChild(d),k.appendChild(c.createElement("br"))):console&&console.log(f);"alert"===b&&alert(f)}function l(a,f,d){function c(){var c;4===g.readyState&&(0!==g.status||g.responseText?
200===g.status||0===g.status?(c="binary"===f?null!==g.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(g.responseBody)).toArray():h.byteArrayFromString(g.responseText,"binary"):g.responseText,b[a]=c,d(null,c)):d(g.responseText||g.statusText):d("File "+a+" is empty."))}if(b.hasOwnProperty(a))d(null,b[a]);else{var g=new XMLHttpRequest;g.open("GET",a,!0);g.onreadystatechange=c;g.overrideMimeType&&("binary"!==f?g.overrideMimeType("text/plain; charset="+f):g.overrideMimeType("text/plain; charset=x-user-defined"));
try{g.send(null)}catch(e){d(e.message)}}}var h=this,b={},n=window.ArrayBuffer&&window.Uint8Array;n&&(Uint8Array.prototype.slice=function(a,f){void 0===f&&(void 0===a&&(a=0),f=this.length);var d=this.subarray(a,f),c,b;f-=a;c=new Uint8Array(new ArrayBuffer(f));for(b=0;b<f;b+=1)c[b]=d[b];return c});this.ByteArray=n?function(a){return new Uint8Array(new ArrayBuffer(a))}:function(a){var f=[];f.length=a;return f};this.concatByteArrays=n?function(a,f){var d,c=a.length,b=f.length,e=new this.ByteArray(c+b);
for(d=0;d<c;d+=1)e[d]=a[d];for(d=0;d<b;d+=1)e[d+c]=f[d];return e}:function(a,f){return a.concat(f)};this.byteArrayFromArray=function(a){return a.slice()};this.byteArrayFromString=function(a,f){var d;if("utf8"===f){d=a.length;var c,b,e,g=0;for(b=0;b<d;b+=1)e=a.charCodeAt(b),g+=1+(128<e)+(2048<e);c=new h.ByteArray(g);for(b=g=0;b<d;b+=1)e=a.charCodeAt(b),128>e?(c[g]=e,g+=1):2048>e?(c[g]=192|e>>>6,c[g+1]=128|e&63,g+=2):(c[g]=224|e>>>12&15,c[g+1]=128|e>>>6&63,c[g+2]=128|e&63,g+=3)}else for("binary"!==
f&&h.log("unknown encoding: "+f),d=a.length,c=new h.ByteArray(d),b=0;b<d;b+=1)c[b]=a.charCodeAt(b)&255;return d=c};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=l;this.read=function(a,f,d,c){function g(){var m;4===e.readyState&&(0!==e.status||e.responseText?200===e.status||0===e.status?(e.response?(m=e.response,m=new Uint8Array(m)):m=null!==e.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(e.responseBody)).toArray():h.byteArrayFromString(e.responseText,"binary"),b[a]=m,c(null,m.slice(f,f+d))):c(e.responseText||e.statusText):c("File "+a+" is empty."))}if(b.hasOwnProperty(a))c(null,b[a].slice(f,f+d));else{var e=new XMLHttpRequest;e.open("GET",a,!0);e.onreadystatechange=g;e.overrideMimeType&&e.overrideMimeType("text/plain; charset=x-user-defined");e.responseType="arraybuffer";try{e.send(null)}catch(r){c(r.message)}}};this.readFileSync=function(a,f){var d=new XMLHttpRequest,
c;d.open("GET",a,!1);d.overrideMimeType&&("binary"!==f?d.overrideMimeType("text/plain; charset="+f):d.overrideMimeType("text/plain; charset=x-user-defined"));try{if(d.send(null),200===d.status||0===d.status)c=d.responseText}catch(b){}return c};this.writeFile=function(a,f,d){b[a]=f;var c=new XMLHttpRequest;c.open("PUT",a,!0);c.onreadystatechange=function(){4===c.readyState&&(0!==c.status||c.responseText?200<=c.status&&300>c.status||0===c.status?d(null):d("Status "+String(c.status)+": "+c.responseText||
c.statusText):d("File "+a+" is empty."))};f=f.buffer&&!c.sendAsBinary?f.buffer:h.byteArrayToString(f,"binary");try{c.sendAsBinary?c.sendAsBinary(f):c.send(f)}catch(g){h.log("HUH? "+g+" "+f),d(g.message)}};this.deleteFile=function(a,f){delete b[a];var d=new XMLHttpRequest;d.open("DELETE",a,!0);d.onreadystatechange=function(){4===d.readyState&&(200>d.status&&300<=d.status?f(d.responseText):f(null))};d.send(null)};this.loadXML=function(a,f){var d=new XMLHttpRequest;d.open("GET",a,!0);d.overrideMimeType&&
d.overrideMimeType("text/xml");d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200===d.status||0===d.status?f(null,d.responseXML):f(d.responseText):f("File "+a+" is empty."))};try{d.send(null)}catch(c){f(c.message)}};this.isFile=function(a,f){h.getFileSize(a,function(a){f(-1!==a)})};this.getFileSize=function(a,f){var d=new XMLHttpRequest;d.open("HEAD",a,!0);d.onreadystatechange=function(){if(4===d.readyState){var c=d.getResponseHeader("Content-Length");c?f(parseInt(c,
10)):l(a,"binary",function(c,a){c?f(-1):f(a.length)})}};d.send(null)};this.log=g;this.assert=function(a,f,d){if(!a)throw g("alert","ASSERTION FAILED:\n"+f),d&&d(),f;};this.setTimeout=function(a,f){return setTimeout(function(){a()},f)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){g("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function k(a,d,c){a=h.resolve(b,a);"binary"!==d?l.readFile(a,d,c):l.readFile(a,null,c)}var g=this,l=require("fs"),h=require("path"),b="",n,a;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var d=new Buffer(a.length),c,b=a.length;for(c=0;c<b;c+=1)d[c]=a[c];return d};this.concatByteArrays=function(a,d){var c=new Buffer(a.length+d.length);a.copy(c,0,0);d.copy(c,a.length,0);return c};this.byteArrayFromString=function(a,d){return new Buffer(a,
d)};this.byteArrayToString=function(a,d){return a.toString(d)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=k;this.loadXML=function(a,d){k(a,"utf-8",function(c,a){if(c)return d(c);d(null,g.parseXML(a))})};this.writeFile=function(a,d,c){a=h.resolve(b,a);l.writeFile(a,d,"binary",function(a){c(a||null)})};this.deleteFile=function(a,d){a=h.resolve(b,a);l.unlink(a,d)};this.read=function(a,d,c,g){a=h.resolve(b,a);l.open(a,"r+",666,function(a,
f){if(a)g(a);else{var b=new Buffer(c);l.read(f,b,0,c,d,function(c){l.close(f);g(c,b)})}})};this.readFileSync=function(a,d){return d?"binary"===d?l.readFileSync(a,null):l.readFileSync(a,d):""};this.isFile=function(a,d){a=h.resolve(b,a);l.stat(a,function(c,a){d(!c&&a.isFile())})};this.getFileSize=function(a,d){a=h.resolve(b,a);l.stat(a,function(a,f){a?d(-1):d(f.size)})};this.log=function(a,d){var c;void 0!==d?c=a:d=a;"alert"===c&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(d+
"\n");"alert"===c&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,d,c){a||(process.stderr.write("ASSERTION FAILED: "+d),c&&c())};this.setTimeout=function(a,d){return setTimeout(function(){a()},d)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){b=a};this.currentDirectory=function(){return b};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=
function(a){return n.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};n=new (require("xmldom").DOMParser);a=g.parseXML("<a/>").implementation}
function RhinoRuntime(){function k(a,f){var d;void 0!==f?d=a:f=a;"alert"===d&&print("\n!!!!! ALERT !!!!!");print(f);"alert"===d&&print("!!!!! ALERT !!!!!")}var g=this,l=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),h,b,n="";l.setValidating(!1);l.setNamespaceAware(!0);l.setExpandEntityReferences(!1);l.setSchema(null);b=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,f){var d=new Packages.java.io.FileReader(f);return new Packages.org.xml.sax.InputSource(d)}});h=l.newDocumentBuilder();
h.setEntityResolver(b);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,f){var d=[],c,b=a.length;for(c=0;c<b;c+=1)d[c]=a.charCodeAt(c)&255;return d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,f){return a.concat(f)};this.loadXML=function(a,f){var d=new Packages.java.io.File(a),c;try{c=h.parse(d)}catch(b){print(b);
f(b);return}f(null,c)};this.readFile=function(a,f,d){n&&(a=n+"/"+a);var c=new Packages.java.io.File(a),b="binary"===f?"latin1":f;c.isFile()?(a=readFile(a,b),"binary"===f&&(a=g.byteArrayFromString(a,"binary")),d(null,a)):d(a+" is not a file.")};this.writeFile=function(a,f,d){n&&(a=n+"/"+a);a=new Packages.java.io.FileOutputStream(a);var c,b=f.length;for(c=0;c<b;c+=1)a.write(f[c]);a.close();d(null)};this.deleteFile=function(a,f){n&&(a=n+"/"+a);(new Packages.java.io.File(a))["delete"]()?f(null):f("Could not delete "+
a)};this.read=function(a,f,d,c){n&&(a=n+"/"+a);var b;b=a;var e="binary";(new Packages.java.io.File(b)).isFile()?("binary"===e&&(e="latin1"),b=readFile(b,e)):b=null;b?c(null,this.byteArrayFromString(b.substring(f,f+d),"binary")):c("Cannot read "+a)};this.readFileSync=function(a,b){return b?readFile(a,b):""};this.isFile=function(a,b){n&&(a=n+"/"+a);var d=new Packages.java.io.File(a);b(d.isFile())};this.getFileSize=function(a,b){n&&(a=n+"/"+a);var d=new Packages.java.io.File(a);b(d.length())};this.log=
k;this.assert=function(a,b,d){a||(k("alert","ASSERTION FAILED: "+b),d&&d())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){n=a};this.currentDirectory=function(){return n};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return h.getDOMImplementation()};this.parseXML=function(a){return h.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function k(g){var b=g[0],n;n=eval("if (typeof "+b+" === 'undefined') {eval('"+b+" = {};');}"+b);for(b=1;b<g.length-1;b+=1)n=n.hasOwnProperty(g[b])?n[g[b]]:n[g[b]]={};return n[g[g.length-1]]}var g={},l={};runtime.loadClass=function(h){function b(a){a=a.replace(/\./g,"/")+".js";var c=runtime.libraryPaths(),b,e,f;runtime.currentDirectory&&c.push(runtime.currentDirectory());for(b=0;b<c.length;b+=1){e=c[b];if(!l.hasOwnProperty(e))try{f=runtime.readFileSync(c[b]+"/manifest.js","utf8"),l[e]=
f&&f.length?eval(f):null}catch(m){l[e]=null,runtime.log("Cannot load manifest for "+e+".")}f=null;if((e=l[e])&&e.indexOf&&-1!==e.indexOf(a))return c[b]+"/"+a}return null}function n(a){var c,f;f=b(a);if(!f)throw a+" is not listed in any manifest.js.";try{c=runtime.readFileSync(f,"utf8")}catch(e){throw runtime.log("Error loading "+a+" "+e),e;}if(void 0===c)throw"Cannot load class "+a;c=c+("\n//# sourceURL="+f)+("\n//@ sourceURL="+f);try{c=eval(a+" = eval(code);")}catch(g){throw runtime.log("Error loading "+
a+" "+g),g;}return c}if(!IS_COMPILED_CODE&&!g.hasOwnProperty(h)){var a=h.split("."),f;f=k(a);if(!f&&(f=n(h),!f||Runtime.getFunctionName(f)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];g[h]=!0}}})();
(function(k){function g(g){if(g.length){var h=g[0];runtime.readFile(h,"utf8",function(b,n){function a(){var a;(a=eval(d))&&runtime.exit(a)}var f="",d=n;-1!==h.indexOf("/")&&(f=h.substring(0,h.indexOf("/")));runtime.setCurrentDirectory(f);b||null===d?(runtime.log(b),runtime.exit(1)):a.apply(null,g)})}}k=k?Array.prototype.slice.call(k):[];"NodeJSRuntime"===runtime.type()?g(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?g(k):g(k.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function k(a){var c=[],e,d=a.length;for(e=0;e<d;e+=1)c[e]=a.charCodeAt(e)&255;return c}function g(a){var c,e="",d,b=a.length-2;for(d=0;d<b;d+=3)c=a[d]<<16|a[d+1]<<8|a[d+2],e+=q[c>>>18],e+=q[c>>>12&63],e+=q[c>>>6&63],e+=q[c&63];d===b+1?(c=a[d]<<4,e+=q[c>>>6],e+=q[c&63],e+="=="):d===b&&(c=a[d]<<10|a[d+1]<<2,e+=q[c>>>12],e+=q[c>>>6&63],e+=q[c&63],e+="=");return e}function l(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var c=[],e=a.length%4,d,b=a.length,f;for(d=0;d<b;d+=4)f=(s[a.charAt(d)]||
0)<<18|(s[a.charAt(d+1)]||0)<<12|(s[a.charAt(d+2)]||0)<<6|(s[a.charAt(d+3)]||0),c.push(f>>16,f>>8&255,f&255);c.length-=[0,0,2,1][e];return c}function h(a){var c=[],e,d=a.length,b;for(e=0;e<d;e+=1)b=a[e],128>b?c.push(b):2048>b?c.push(192|b>>>6,128|b&63):c.push(224|b>>>12&15,128|b>>>6&63,128|b&63);return c}function b(a){var c=[],e,d=a.length,b,f,m;for(e=0;e<d;e+=1)b=a[e],128>b?c.push(b):(e+=1,f=a[e],224>b?c.push((b&31)<<6|f&63):(e+=1,m=a[e],c.push((b&15)<<12|(f&63)<<6|m&63)));return c}function n(a){return g(k(a))}
function a(a){return String.fromCharCode.apply(String,l(a))}function f(a){return b(k(a))}function d(a){a=b(a);for(var c="",e=0;e<a.length;)c+=String.fromCharCode.apply(String,a.slice(e,e+45E3)),e+=45E3;return c}function c(a,c,e){var d="",b,f,m;for(m=c;m<e;m+=1)c=a.charCodeAt(m)&255,128>c?d+=String.fromCharCode(c):(m+=1,b=a.charCodeAt(m)&255,224>c?d+=String.fromCharCode((c&31)<<6|b&63):(m+=1,f=a.charCodeAt(m)&255,d+=String.fromCharCode((c&15)<<12|(b&63)<<6|f&63)));return d}function t(a,e){function d(){var p=
m+b;p>a.length&&(p=a.length);f+=c(a,m,p);m=p;p=m===a.length;e(f,p)&&!p&&runtime.setTimeout(d,0)}var b=1E5,f="",m=0;a.length<b?e(c(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),d())}function e(a){return h(k(a))}function r(a){return String.fromCharCode.apply(String,h(a))}function m(a){return String.fromCharCode.apply(String,h(k(a)))}var q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=function(a){var c={},e,d;e=0;for(d=a.length;e<d;e+=1)c[a.charAt(e)]=e;return c}(q),w,
u,z=runtime.getWindow(),v,p;z&&z.btoa?(v=function(a){return z.btoa(a)},w=function(a){return v(m(a))}):(v=n,w=function(a){return g(e(a))});z&&z.atob?(p=function(a){return z.atob(a)},u=function(a){a=p(a);return c(a,0,a.length)}):(p=a,u=function(a){return d(l(a))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=g;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=l;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=h;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=b;this.convertUTF8StringToBase64=n;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=f;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=d;this.convertUTF8StringToUTF16String=t;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=e;this.convertUTF16ArrayToUTF8String=r;this.convertUTF16StringToUTF8String=m;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=u;this.fromBase64=a;this.toBase64=n;this.atob=
p;this.btoa=v;this.utob=m;this.btou=t;this.encode=w;this.encodeURI=function(a){return w(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return u(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function k(){this.dl=this.fc=0}function g(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function l(a,c,e,d){this.good_length=a;this.max_lazy=c;this.nice_length=e;this.max_chain=d}function h(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=b;this.off=0}var b=8192,n,a,f,d,c=null,t,e,r,m,q,s,w,u,z,v,p,y,D,H,A,N,C,P,B,J,U,da,T,ka,ca,W,O,ba,S,Q,F,M,L,K,Y,la,E,G,ea,ha,V,R,Z,X,na,qa,x,ia,ma,oa,I,ta=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ra=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],pa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ua=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],$;$=[new l(0,0,0,0),new l(4,4,8,4),new l(4,5,16,8),new l(4,6,32,32),new l(4,4,16,16),new l(8,16,32,32),new l(8,16,128,128),new l(8,32,128,256),new l(32,128,258,1024),new l(32,258,258,4096)];var fa=function(d){c[e+t++]=d;if(e+t===b){var m;if(0!==t){null!==n?(d=n,n=n.next):d=new h;
d.next=null;d.len=d.off=0;null===a?a=f=d:f=f.next=d;d.len=t-e;for(m=0;m<d.len;m++)d.ptr[m]=c[e+m];t=e=0}}},ja=function(a){a&=65535;e+t<b-2?(c[e+t++]=a&255,c[e+t++]=a>>>8):(fa(a&255),fa(a>>>8))},aa=function(){p=(p<<5^m[C+3-1]&255)&8191;y=w[32768+p];w[C&32767]=y;w[32768+p]=C},ga=function(a,c){z>16-c?(u|=a<<z,ja(u),u=a>>16-z,z+=c-16):(u|=a<<z,z+=c)},sa=function(a,c){ga(c[a].fc,c[a].dl)},Aa=function(a,c,e){return a[c].fc<a[e].fc||a[c].fc===a[e].fc&&E[c]<=E[e]},Ba=function(a,c,e){var d;for(d=0;d<e&&I<
oa.length;d++)a[c+d]=oa.charCodeAt(I++)&255;return d},xa=function(){var a,c,e=65536-J-C;if(-1===e)e--;else if(65274<=C){for(a=0;32768>a;a++)m[a]=m[a+32768];P-=32768;C-=32768;v-=32768;for(a=0;8192>a;a++)c=w[32768+a],w[32768+a]=32768<=c?c-32768:0;for(a=0;32768>a;a++)c=w[a],w[a]=32768<=c?c-32768:0;e+=32768}B||(a=Ba(m,C+J,e),0>=a?B=!0:J+=a)},Ca=function(a){var c=U,e=C,d,b=N,f=32506<C?C-32506:0,p=C+258,g=m[e+b-1],h=m[e+b];N>=ka&&(c>>=2);do if(d=a,m[d+b]===h&&m[d+b-1]===g&&m[d]===m[e]&&m[++d]===m[e+1]){e+=
2;d++;do++e;while(m[e]===m[++d]&&m[++e]===m[++d]&&m[++e]===m[++d]&&m[++e]===m[++d]&&m[++e]===m[++d]&&m[++e]===m[++d]&&m[++e]===m[++d]&&m[++e]===m[++d]&&e<p);d=258-(p-e);e=p-258;if(d>b){P=a;b=d;if(258<=d)break;g=m[e+b-1];h=m[e+b]}a=w[a&32767]}while(a>f&&0!==--c);return b},va=function(a,c){s[Z++]=c;0===a?ca[c].fc++:(a--,ca[G[c]+256+1].fc++,W[(256>a?ea[a]:ea[256+(a>>7)])&255].fc++,q[X++]=a,qa|=x);x<<=1;0===(Z&7)&&(R[na++]=qa,qa=0,x=1);if(2<T&&0===(Z&4095)){var e=8*Z,d=C-v,b;for(b=0;30>b;b++)e+=W[b].fc*
(5+ra[b]);e>>=3;if(X<parseInt(Z/2,10)&&e<parseInt(d/2,10))return!0}return 8191===Z||8192===X},ya=function(a,c){for(var e=K[c],d=c<<1;d<=Y;){d<Y&&Aa(a,K[d+1],K[d])&&d++;if(Aa(a,e,K[d]))break;K[c]=K[d];c=d;d<<=1}K[c]=e},Da=function(a,c){var e=0;do e|=a&1,a>>=1,e<<=1;while(0<--c);return e>>1},Ea=function(a,c){var e=[];e.length=16;var d=0,b;for(b=1;15>=b;b++)d=d+L[b-1]<<1,e[b]=d;for(d=0;d<=c;d++)b=a[d].dl,0!==b&&(a[d].fc=Da(e[b]++,b))},za=function(a){var c=a.dyn_tree,e=a.static_tree,d=a.elems,b,f=-1,
m=d;Y=0;la=573;for(b=0;b<d;b++)0!==c[b].fc?(K[++Y]=f=b,E[b]=0):c[b].dl=0;for(;2>Y;)b=K[++Y]=2>f?++f:0,c[b].fc=1,E[b]=0,ia--,null!==e&&(ma-=e[b].dl);a.max_code=f;for(b=Y>>1;1<=b;b--)ya(c,b);do b=K[1],K[1]=K[Y--],ya(c,1),e=K[1],K[--la]=b,K[--la]=e,c[m].fc=c[b].fc+c[e].fc,E[m]=E[b]>E[e]+1?E[b]:E[e]+1,c[b].dl=c[e].dl=m,K[1]=m++,ya(c,1);while(2<=Y);K[--la]=K[1];m=a.dyn_tree;b=a.extra_bits;var d=a.extra_base,e=a.max_code,p=a.max_length,g=a.static_tree,h,r,q,n,s=0;for(r=0;15>=r;r++)L[r]=0;m[K[la]].dl=0;
for(a=la+1;573>a;a++)h=K[a],r=m[m[h].dl].dl+1,r>p&&(r=p,s++),m[h].dl=r,h>e||(L[r]++,q=0,h>=d&&(q=b[h-d]),n=m[h].fc,ia+=n*(r+q),null!==g&&(ma+=n*(g[h].dl+q)));if(0!==s){do{for(r=p-1;0===L[r];)r--;L[r]--;L[r+1]+=2;L[p]--;s-=2}while(0<s);for(r=p;0!==r;r--)for(h=L[r];0!==h;)b=K[--a],b>e||(m[b].dl!==r&&(ia+=(r-m[b].dl)*m[b].fc,m[b].fc=r),h--)}Ea(c,f)},Fa=function(a,c){var e,d=-1,b,f=a[0].dl,m=0,p=7,g=4;0===f&&(p=138,g=3);a[c+1].dl=65535;for(e=0;e<=c;e++)b=f,f=a[e+1].dl,++m<p&&b===f||(m<g?S[b].fc+=m:0!==
b?(b!==d&&S[b].fc++,S[16].fc++):10>=m?S[17].fc++:S[18].fc++,m=0,d=b,0===f?(p=138,g=3):b===f?(p=6,g=3):(p=7,g=4))},Ga=function(){8<z?ja(u):0<z&&fa(u);z=u=0},Ha=function(a,c){var e,d=0,b=0,f=0,m=0,p,g;if(0!==Z){do 0===(d&7)&&(m=R[f++]),e=s[d++]&255,0===(m&1)?sa(e,a):(p=G[e],sa(p+256+1,a),g=ta[p],0!==g&&(e-=ha[p],ga(e,g)),e=q[b++],p=(256>e?ea[e]:ea[256+(e>>7)])&255,sa(p,c),g=ra[p],0!==g&&(e-=V[p],ga(e,g))),m>>=1;while(d<Z)}sa(256,a)},Ia=function(a,c){var e,d=-1,b,f=a[0].dl,m=0,p=7,g=4;0===f&&(p=138,
g=3);for(e=0;e<=c;e++)if(b=f,f=a[e+1].dl,!(++m<p&&b===f)){if(m<g){do sa(b,S);while(0!==--m)}else 0!==b?(b!==d&&(sa(b,S),m--),sa(16,S),ga(m-3,2)):10>=m?(sa(17,S),ga(m-3,3)):(sa(18,S),ga(m-11,7));m=0;d=b;0===f?(p=138,g=3):b===f?(p=6,g=3):(p=7,g=4)}},Ja=function(){var a;for(a=0;286>a;a++)ca[a].fc=0;for(a=0;30>a;a++)W[a].fc=0;for(a=0;19>a;a++)S[a].fc=0;ca[256].fc=1;qa=Z=X=na=ia=ma=0;x=1},wa=function(a){var c,e,d,b;b=C-v;R[na]=qa;za(Q);za(F);Fa(ca,Q.max_code);Fa(W,F.max_code);za(M);for(d=18;3<=d&&0===
S[ua[d]].dl;d--);ia+=3*(d+1)+14;c=ia+3+7>>3;e=ma+3+7>>3;e<=c&&(c=e);if(b+4<=c&&0<=v)for(ga(0+a,3),Ga(),ja(b),ja(~b),d=0;d<b;d++)fa(m[v+d]);else if(e===c)ga(2+a,3),Ha(O,ba);else{ga(4+a,3);b=Q.max_code+1;c=F.max_code+1;d+=1;ga(b-257,5);ga(c-1,5);ga(d-4,4);for(e=0;e<d;e++)ga(S[ua[e]].dl,3);Ia(ca,b-1);Ia(W,c-1);Ha(ca,W)}Ja();0!==a&&Ga()},Ka=function(d,b,f){var m,p,g;for(m=0;null!==a&&m<f;){p=f-m;p>a.len&&(p=a.len);for(g=0;g<p;g++)d[b+m+g]=a.ptr[a.off+g];a.off+=p;a.len-=p;m+=p;0===a.len&&(p=a,a=a.next,
p.next=n,n=p)}if(m===f)return m;if(e<t){p=f-m;p>t-e&&(p=t-e);for(g=0;g<p;g++)d[b+m+g]=c[e+g];e+=p;m+=p;t===e&&(t=e=0)}return m},La=function(c,b,f){var g;if(!d){if(!B){z=u=0;var h,q;if(0===ba[0].dl){Q.dyn_tree=ca;Q.static_tree=O;Q.extra_bits=ta;Q.extra_base=257;Q.elems=286;Q.max_length=15;Q.max_code=0;F.dyn_tree=W;F.static_tree=ba;F.extra_bits=ra;F.extra_base=0;F.elems=30;F.max_length=15;F.max_code=0;M.dyn_tree=S;M.static_tree=null;M.extra_bits=pa;M.extra_base=0;M.elems=19;M.max_length=7;for(q=h=M.max_code=
0;28>q;q++)for(ha[q]=h,g=0;g<1<<ta[q];g++)G[h++]=q;G[h-1]=q;for(q=h=0;16>q;q++)for(V[q]=h,g=0;g<1<<ra[q];g++)ea[h++]=q;for(h>>=7;30>q;q++)for(V[q]=h<<7,g=0;g<1<<ra[q]-7;g++)ea[256+h++]=q;for(g=0;15>=g;g++)L[g]=0;for(g=0;143>=g;)O[g++].dl=8,L[8]++;for(;255>=g;)O[g++].dl=9,L[9]++;for(;279>=g;)O[g++].dl=7,L[7]++;for(;287>=g;)O[g++].dl=8,L[8]++;Ea(O,287);for(g=0;30>g;g++)ba[g].dl=5,ba[g].fc=Da(g,5);Ja()}for(g=0;8192>g;g++)w[32768+g]=0;da=$[T].max_lazy;ka=$[T].good_length;U=$[T].max_chain;v=C=0;J=Ba(m,
0,65536);if(0>=J)B=!0,J=0;else{for(B=!1;262>J&&!B;)xa();for(g=p=0;2>g;g++)p=(p<<5^m[g]&255)&8191}a=null;e=t=0;3>=T?(N=2,A=0):(A=2,H=0);r=!1}d=!0;if(0===J)return r=!0,0}g=Ka(c,b,f);if(g===f)return f;if(r)return g;if(3>=T)for(;0!==J&&null===a;){aa();0!==y&&32506>=C-y&&(A=Ca(y),A>J&&(A=J));if(3<=A)if(q=va(C-P,A-3),J-=A,A<=da){A--;do C++,aa();while(0!==--A);C++}else C+=A,A=0,p=m[C]&255,p=(p<<5^m[C+1]&255)&8191;else q=va(0,m[C]&255),J--,C++;q&&(wa(0),v=C);for(;262>J&&!B;)xa()}else for(;0!==J&&null===a;){aa();
N=A;D=P;A=2;0!==y&&(N<da&&32506>=C-y)&&(A=Ca(y),A>J&&(A=J),3===A&&4096<C-P&&A--);if(3<=N&&A<=N){q=va(C-1-D,N-3);J-=N-1;N-=2;do C++,aa();while(0!==--N);H=0;A=2;C++;q&&(wa(0),v=C)}else 0!==H?va(0,m[C-1]&255)&&(wa(0),v=C):H=1,C++,J--;for(;262>J&&!B;)xa()}0===J&&(0!==H&&va(0,m[C-1]&255),wa(1),r=!0);return g+Ka(c,g+b,f-g)};this.deflate=function(e,p){var h,r;oa=e;I=0;"undefined"===String(typeof p)&&(p=6);(h=p)?1>h?h=1:9<h&&(h=9):h=6;T=h;B=d=!1;if(null===c){n=a=f=null;c=[];c.length=b;m=[];m.length=65536;
q=[];q.length=8192;s=[];s.length=32832;w=[];w.length=65536;ca=[];ca.length=573;for(h=0;573>h;h++)ca[h]=new k;W=[];W.length=61;for(h=0;61>h;h++)W[h]=new k;O=[];O.length=288;for(h=0;288>h;h++)O[h]=new k;ba=[];ba.length=30;for(h=0;30>h;h++)ba[h]=new k;S=[];S.length=39;for(h=0;39>h;h++)S[h]=new k;Q=new g;F=new g;M=new g;L=[];L.length=16;K=[];K.length=573;E=[];E.length=573;G=[];G.length=256;ea=[];ea.length=512;ha=[];ha.length=29;V=[];V.length=30;R=[];R.length=1024}var l=Array(1024),u=[],t=[];for(h=La(l,
0,l.length);0<h;){t.length=h;for(r=0;r<h;r++)t[r]=String.fromCharCode(l[r]);u[u.length]=t.join("");h=La(l,0,l.length)}oa=null;return u.join("")}};
// Input 4
core.ByteArray=function(k){this.pos=0;this.data=k;this.readUInt32LE=function(){this.pos+=4;var g=this.data,l=this.pos;return g[--l]<<24|g[--l]<<16|g[--l]<<8|g[--l]};this.readUInt16LE=function(){this.pos+=2;var g=this.data,l=this.pos;return g[--l]<<8|g[--l]}};
// Input 5
core.ByteArrayWriter=function(k){var g=this,l=new runtime.ByteArray(0);this.appendByteArrayWriter=function(g){l=runtime.concatByteArrays(l,g.getByteArray())};this.appendByteArray=function(g){l=runtime.concatByteArrays(l,g)};this.appendArray=function(g){l=runtime.concatByteArrays(l,runtime.byteArrayFromArray(g))};this.appendUInt16LE=function(h){g.appendArray([h&255,h>>8&255])};this.appendUInt32LE=function(h){g.appendArray([h&255,h>>8&255,h>>16&255,h>>24&255])};this.appendString=function(g){l=runtime.concatByteArrays(l,
runtime.byteArrayFromString(g,k))};this.getLength=function(){return l.length};this.getByteArray=function(){return l}};
// Input 6
core.RawInflate=function(){var k,g,l=null,h,b,n,a,f,d,c,t,e,r,m,q,s,w,u=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],z=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],v=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],p=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],y=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],H=function(){this.list=this.next=null},A=function(){this.n=this.b=this.e=0;this.t=null},N=function(a,c,e,d,b,f){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var m=Array(this.BMAX+1),g,p,h,r,q,n,s,l=Array(this.BMAX+1),u,k,w,t=new A,y=Array(this.BMAX);r=Array(this.N_MAX);var v,z=Array(this.BMAX+1),D,C,B;B=this.root=null;for(q=0;q<m.length;q++)m[q]=0;for(q=0;q<l.length;q++)l[q]=0;for(q=0;q<y.length;q++)y[q]=null;for(q=0;q<r.length;q++)r[q]=
0;for(q=0;q<z.length;q++)z[q]=0;g=256<c?a[256]:this.BMAX;u=a;k=0;q=c;do m[u[k]]++,k++;while(0<--q);if(m[0]==c)this.root=null,this.status=this.m=0;else{for(n=1;n<=this.BMAX&&0==m[n];n++);s=n;f<n&&(f=n);for(q=this.BMAX;0!=q&&0==m[q];q--);h=q;f>q&&(f=q);for(D=1<<n;n<q;n++,D<<=1)if(0>(D-=m[n])){this.status=2;this.m=f;return}if(0>(D-=m[q]))this.status=2,this.m=f;else{m[q]+=D;z[1]=n=0;u=m;k=1;for(w=2;0<--q;)z[w++]=n+=u[k++];u=a;q=k=0;do 0!=(n=u[k++])&&(r[z[n]++]=q);while(++q<c);c=z[h];z[0]=q=0;u=r;k=0;
r=-1;v=l[0]=0;w=null;for(C=0;s<=h;s++)for(a=m[s];0<a--;){for(;s>v+l[1+r];){v+=l[1+r];r++;C=(C=h-v)>f?f:C;if((p=1<<(n=s-v))>a+1)for(p-=a+1,w=s;++n<C&&!((p<<=1)<=m[++w]);)p-=m[w];v+n>g&&v<g&&(n=g-v);C=1<<n;l[1+r]=n;w=Array(C);for(p=0;p<C;p++)w[p]=new A;B=null==B?this.root=new H:B.next=new H;B.next=null;B.list=w;y[r]=w;0<r&&(z[r]=q,t.b=l[r],t.e=16+n,t.t=w,n=(q&(1<<v)-1)>>v-l[r],y[r-1][n].e=t.e,y[r-1][n].b=t.b,y[r-1][n].n=t.n,y[r-1][n].t=t.t)}t.b=s-v;k>=c?t.e=99:u[k]<e?(t.e=256>u[k]?16:15,t.n=u[k++]):
(t.e=b[u[k]-e],t.n=d[u[k++]-e]);p=1<<s-v;for(n=q>>v;n<C;n+=p)w[n].e=t.e,w[n].b=t.b,w[n].n=t.n,w[n].t=t.t;for(n=1<<s-1;0!=(q&n);n>>=1)q^=n;for(q^=n;(q&(1<<v)-1)!=z[r];)v-=l[r],r--}this.m=l[1];this.status=0!=D&&1!=h?1:0}}},C=function(c){for(;a<c;){var e=n,d;d=s.length==w?-1:s[w++];n=e|d<<a;a+=8}},P=function(a){return n&u[a]},B=function(c){n>>=c;a-=c},J=function(a,d,b){var p,h,n;if(0==b)return 0;for(n=0;;){C(m);h=e.list[P(m)];for(p=h.e;16<p;){if(99==p)return-1;B(h.b);p-=16;C(p);h=h.t[P(p)];p=h.e}B(h.b);
if(16==p)g&=32767,a[d+n++]=k[g++]=h.n;else{if(15==p)break;C(p);c=h.n+P(p);B(p);C(q);h=r.list[P(q)];for(p=h.e;16<p;){if(99==p)return-1;B(h.b);p-=16;C(p);h=h.t[P(p)];p=h.e}B(h.b);C(p);t=g-h.n-P(p);for(B(p);0<c&&n<b;)c--,t&=32767,g&=32767,a[d+n++]=k[g++]=k[t++]}if(n==b)return b}f=-1;return n},U,da=function(a,c,d){var b,f,g,h,n,s,l,u=Array(316);for(b=0;b<u.length;b++)u[b]=0;C(5);s=257+P(5);B(5);C(5);l=1+P(5);B(5);C(4);b=4+P(4);B(4);if(286<s||30<l)return-1;for(f=0;f<b;f++)C(3),u[D[f]]=P(3),B(3);for(;19>
f;f++)u[D[f]]=0;m=7;f=new N(u,19,19,null,null,m);if(0!=f.status)return-1;e=f.root;m=f.m;h=s+l;for(b=g=0;b<h;)if(C(m),n=e.list[P(m)],f=n.b,B(f),f=n.n,16>f)u[b++]=g=f;else if(16==f){C(2);f=3+P(2);B(2);if(b+f>h)return-1;for(;0<f--;)u[b++]=g}else{17==f?(C(3),f=3+P(3),B(3)):(C(7),f=11+P(7),B(7));if(b+f>h)return-1;for(;0<f--;)u[b++]=0;g=0}m=9;f=new N(u,s,257,z,v,m);0==m&&(f.status=1);if(0!=f.status)return-1;e=f.root;m=f.m;for(b=0;b<l;b++)u[b]=u[b+s];q=6;f=new N(u,l,0,p,y,q);r=f.root;q=f.m;return 0==q&&
257<s||0!=f.status?-1:J(a,c,d)};this.inflate=function(u,D){null==k&&(k=Array(65536));a=n=g=0;f=-1;d=!1;c=t=0;e=null;s=u;w=0;var H=new runtime.ByteArray(D);a:{var A,O;for(A=0;A<D&&(!d||-1!=f);){if(0<c){if(0!=f)for(;0<c&&A<D;)c--,t&=32767,g&=32767,H[0+A++]=k[g++]=k[t++];else{for(;0<c&&A<D;)c--,g&=32767,C(8),H[0+A++]=k[g++]=P(8),B(8);0==c&&(f=-1)}if(A==D)break}if(-1==f){if(d)break;C(1);0!=P(1)&&(d=!0);B(1);C(2);f=P(2);B(2);e=null;c=0}switch(f){case 0:O=H;var ba=0+A,S=D-A,Q=void 0,Q=a&7;B(Q);C(16);Q=
P(16);B(16);C(16);if(Q!=(~n&65535))O=-1;else{B(16);c=Q;for(Q=0;0<c&&Q<S;)c--,g&=32767,C(8),O[ba+Q++]=k[g++]=P(8),B(8);0==c&&(f=-1);O=Q}break;case 1:if(null!=e)O=J(H,0+A,D-A);else b:{O=H;ba=0+A;S=D-A;if(null==l){for(var F=void 0,Q=Array(288),F=void 0,F=0;144>F;F++)Q[F]=8;for(;256>F;F++)Q[F]=9;for(;280>F;F++)Q[F]=7;for(;288>F;F++)Q[F]=8;b=7;F=new N(Q,288,257,z,v,b);if(0!=F.status){alert("HufBuild error: "+F.status);O=-1;break b}l=F.root;b=F.m;for(F=0;30>F;F++)Q[F]=5;U=5;F=new N(Q,30,0,p,y,U);if(1<F.status){l=
null;alert("HufBuild error: "+F.status);O=-1;break b}h=F.root;U=F.m}e=l;r=h;m=b;q=U;O=J(O,ba,S)}break;case 2:O=null!=e?J(H,0+A,D-A):da(H,0+A,D-A);break;default:O=-1}if(-1==O)break a;A+=O}}s=null;return H}};
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
core.LoopWatchDog=function(k,g){var l=Date.now(),h=0;this.check=function(){var b;if(k&&(b=Date.now(),b-l>k))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<g&&(h+=1,h>g))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){this.hashString=function(k){var g=0,l,h;l=0;for(h=k.length;l<h;l+=1)g=(g<<5)-g+k.charCodeAt(l),g|=0;return g}};
// Input 9
core.DomUtils=function(){function k(g,l){if(g.nodeType===Node.TEXT_NODE)if(0===g.length)g.parentNode.removeChild(g);else if(l.nodeType===Node.TEXT_NODE)return l.insertData(0,g.data),g.parentNode.removeChild(g),l;return g}this.splitBoundaries=function(g){var l=[],h;if(g.startContainer.nodeType===Node.TEXT_NODE||g.endContainer.nodeType===Node.TEXT_NODE){h=g.endContainer;var b=g.endOffset;if(b<h.childNodes.length)for(h=h.childNodes[b],b=0;h.firstChild;)h=h.firstChild;else for(;h.lastChild;)h=h.lastChild,
b=h.nodeType===Node.TEXT_NODE?h.textContent.length:h.childNodes.length;g.setEnd(h,b);0!==g.endOffset&&(g.endContainer.nodeType===Node.TEXT_NODE&&g.endOffset!==g.endContainer.length)&&(l.push(g.endContainer.splitText(g.endOffset)),l.push(g.endContainer));0!==g.startOffset&&(g.startContainer.nodeType===Node.TEXT_NODE&&g.startOffset!==g.startContainer.length)&&(h=g.startContainer.splitText(g.startOffset),l.push(g.startContainer),l.push(h),g.setStart(h,0))}return l};this.containsRange=function(g,l){return 0>=
g.compareBoundaryPoints(g.START_TO_START,l)&&0<=g.compareBoundaryPoints(g.END_TO_END,l)};this.rangesIntersect=function(g,l){return 0>=g.compareBoundaryPoints(g.END_TO_START,l)&&0<=g.compareBoundaryPoints(g.START_TO_END,l)};this.getNodesInRange=function(g,l){var h=[],b,n=g.startContainer.ownerDocument.createTreeWalker(g.commonAncestorContainer,NodeFilter.SHOW_ALL,l,!1);for(b=n.currentNode=g.startContainer;b;){if(l(b)===NodeFilter.FILTER_ACCEPT)h.push(b);else if(l(b)===NodeFilter.FILTER_REJECT)break;
b=b.parentNode}h.reverse();for(b=n.nextNode();b;)h.push(b),b=n.nextNode();return h};this.normalizeTextNodes=function(g){g&&g.nextSibling&&(g=k(g,g.nextSibling));g&&g.previousSibling&&k(g.previousSibling,g)};this.rangeContainsNode=function(g,l){var h=l.ownerDocument.createRange(),b=l.nodeType===Node.TEXT_NODE?l.length:l.childNodes.length;h.setStart(g.startContainer,g.startOffset);h.setEnd(g.endContainer,g.endOffset);b=0===h.comparePoint(l,0)&&0===h.comparePoint(l,b);h.detach();return b};this.mergeIntoParent=
function(g){for(var l=g.parentNode;g.firstChild;)l.insertBefore(g.firstChild,g);l.removeChild(g);return l};this.getElementsByTagNameNS=function(g,l,h){return Array.prototype.slice.call(g.getElementsByTagNameNS(l,h))};this.rangeIntersectsNode=function(g,l){var h=l.nodeType===Node.TEXT_NODE?l.length:l.childNodes.length;return 0>=g.comparePoint(l,0)&&0<=g.comparePoint(l,h)}};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(k,g){function l(a){a.parentNode&&(f.push(a.previousSibling),f.push(a.nextSibling),a.parentNode.removeChild(a))}function h(a,c,d){if(c.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(c),"putCursorIntoTextNode: invalid container");var b=c.parentNode;runtime.assert(Boolean(b),"putCursorIntoTextNode: container without parent");runtime.assert(0<=d&&d<=c.length,"putCursorIntoTextNode: offset is out of bounds");0===d?b.insertBefore(a,c):(d!==c.length&&c.splitText(d),b.insertBefore(a,
c.nextSibling))}else if(c.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(c),"putCursorIntoContainer: invalid container");for(b=c.firstChild;null!==b&&0<d;)b=b.nextSibling,d-=1;c.insertBefore(a,b)}f.push(a.previousSibling);f.push(a.nextSibling)}var b=k.createElementNS("urn:webodf:names:cursor","cursor"),n=k.createElementNS("urn:webodf:names:cursor","anchor"),a,f=[],d,c,t=new core.DomUtils;this.getNode=function(){return b};this.getAnchorNode=function(){return n.parentNode?n:b};this.getSelectedRange=
function(){c?(d.setStartBefore(b),d.collapse(!0)):(d.setStartAfter(a?n:b),d.setEndBefore(a?b:n));return d};this.setSelectedRange=function(e,g){d&&d!==e&&d.detach();d=e;a=!1!==g;(c=e.collapsed)?(l(n),l(b),h(b,e.startContainer,e.startOffset)):(l(n),l(b),h(a?b:n,e.endContainer,e.endOffset),h(a?n:b,e.startContainer,e.startOffset));f.forEach(t.normalizeTextNodes);f.length=0};this.remove=function(){l(b);f.forEach(t.normalizeTextNodes);f.length=0};b.setAttributeNS("urn:webodf:names:cursor","memberId",g);
n.setAttributeNS("urn:webodf:names:cursor","memberId",g)};
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
core.EventNotifier=function(k){var g={};this.emit=function(l,h){var b,n;runtime.assert(g.hasOwnProperty(l),'unknown event fired "'+l+'"');n=g[l];for(b=0;b<n.length;b+=1)n[b](h)};this.subscribe=function(l,h){runtime.assert(g.hasOwnProperty(l),'tried to subscribe to unknown event "'+l+'"');g[l].push(h);runtime.log('event "'+l+'" subscribed.')};this.unsubscribe=function(l,h){var b;runtime.assert(g.hasOwnProperty(l),'tried to unsubscribe from unknown event "'+l+'"');b=g[l].indexOf(h);runtime.assert(-1!==
b,'tried to unsubscribe unknown callback from event "'+l+'"');-1!==b&&g[l].splice(b,1);runtime.log('event "'+l+'" unsubscribed.')};(function(){var l;for(l=0;l<k.length;l+=1)g[k[l]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var k=runtime.getWindow().document,g=k.getElementById("testarea");runtime.assert(!g,'Unclean test environment, found a div with id "testarea".');g=k.createElement("div");g.setAttribute("id","testarea");k.body.appendChild(g);return g};
core.UnitTest.cleanupTestAreaDiv=function(){var k=runtime.getWindow().document,g=k.getElementById("testarea");runtime.assert(!!g&&g.parentNode===k.body,'Test environment broken, found no div with id "testarea" below body.');k.body.removeChild(g)};
core.UnitTestRunner=function(){function k(d){a+=1;runtime.log("fail",d)}function g(a,c){var b;try{if(a.length!==c.length)return k("array of length "+a.length+" should be "+c.length+" long"),!1;for(b=0;b<a.length;b+=1)if(a[b]!==c[b])return k(a[b]+" should be "+c[b]+" at array index "+b),!1}catch(e){return!1}return!0}function l(a,c,b){var e=a.attributes,f=e.length,m,g,h;for(m=0;m<f;m+=1)if(g=e.item(m),"xmlns"!==g.prefix){h=c.getAttributeNS(g.namespaceURI,g.localName);if(!c.hasAttributeNS(g.namespaceURI,
g.localName))return k("Attribute "+g.localName+" with value "+g.value+" was not present"),!1;if(h!==g.value)return k("Attribute "+g.localName+" was "+h+" should be "+g.value),!1}return b?!0:l(c,a,!0)}function h(a,c){if(a.nodeType!==c.nodeType)return k(a.nodeType+" should be "+c.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===c.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==c.namespaceURI||a.localName!==c.localName)return k(a.namespaceURI+
" should be "+c.namespaceURI),!1;if(!l(a,c,!1))return!1;for(var b=a.firstChild,e=c.firstChild;b;){if(!e||!h(b,e))return!1;b=b.nextSibling;e=e.nextSibling}return e?!1:!0}function b(a,c){return 0===c?a===c&&1/a===1/c:a===c?!0:"number"===typeof c&&isNaN(c)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(c)===Object.prototype.toString.call([])?g(a,c):"object"===typeof c&&"object"===typeof a?c.constructor===Element||c.constructor===Node?h(c,a):f(c,a):!1}function n(a,c,f){"string"===typeof c&&
"string"===typeof f||runtime.log("WARN: shouldBe() expects string arguments");var e,g;try{g=eval(c)}catch(m){e=m}a=eval(f);e?k(c+" should be "+a+". Threw exception "+e):b(g,a)?runtime.log("pass",c+" is "+f):String(typeof g)===String(typeof a)?(f=0===g&&0>1/g?"-0":String(g),k(c+" should be "+a+". Was "+f+".")):k(c+" should be "+a+" (of type "+typeof a+"). Was "+g+" (of type "+typeof g+").")}var a=0,f;f=function(a,c){var f=Object.keys(a),e=Object.keys(c);f.sort();e.sort();return g(f,e)&&Object.keys(a).every(function(e){var f=
a[e],g=c[e];return b(f,g)?!0:(k(f+" should be "+g+" for key "+e),!1)})};this.areNodesEqual=h;this.shouldBeNull=function(a,c){n(a,c,"null")};this.shouldBeNonNull=function(a,c){var b,e;try{e=eval(c)}catch(f){b=f}b?k(c+" should be non-null. Threw exception "+b):null!==e?runtime.log("pass",c+" is non-null."):k(c+" should be non-null. Was "+e)};this.shouldBe=n;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function k(g,b){return"<span style='color:blue;cursor:pointer' onclick='"+b+"'>"+g+"</span>"}var g=0,l={};this.runTests=function(h,b,n){function a(e){if(0===e.length)l[f]=t,g+=d.countFailedTests(),b();else{r=e[0];var m=Runtime.getFunctionName(r);runtime.log("Running "+m);q=d.countFailedTests();c.setUp();r(function(){c.tearDown();t[m]=q===d.countFailedTests();a(e.slice(1))})}}var f=Runtime.getFunctionName(h),d=new core.UnitTestRunner,c=new h(d),t={},e,r,m,q,s="BrowserRuntime"===
runtime.type();if(l.hasOwnProperty(f))runtime.log("Test "+f+" has already run.");else{s?runtime.log("<span>Running "+k(f,'runSuite("'+f+'");')+": "+c.description()+"</span>"):runtime.log("Running "+f+": "+c.description);m=c.tests();for(e=0;e<m.length;e+=1)r=m[e],h=Runtime.getFunctionName(r)||r.testName,n.length&&-1===n.indexOf(h)||(s?runtime.log("<span>Running "+k(h,'runTest("'+f+'","'+h+'")')+"</span>"):runtime.log("Running "+h),q=d.countFailedTests(),c.setUp(),r(),c.tearDown(),t[h]=q===d.countFailedTests());
a(c.asyncTests())}};this.countFailedTests=function(){return g};this.results=function(){return l}};
// Input 13
core.PositionIterator=function(k,g,l,h){function b(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function n(a){this.acceptNode=function(c){return c.nodeType===Node.TEXT_NODE&&0===c.length?NodeFilter.FILTER_REJECT:a.acceptNode(c)}}function a(){var a=d.currentNode.nodeType;c=a===Node.TEXT_NODE?d.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var f=this,d,c,t;this.nextPosition=function(){if(d.currentNode===k)return!1;
if(0===c&&d.currentNode.nodeType===Node.ELEMENT_NODE)null===d.firstChild()&&(c=1);else if(d.currentNode.nodeType===Node.TEXT_NODE&&c+1<d.currentNode.length)c+=1;else if(null!==d.nextSibling())c=0;else if(d.parentNode())c=1;else return!1;return!0};this.previousPosition=function(){var e=!0;if(0===c)if(null===d.previousSibling()){if(!d.parentNode()||d.currentNode===k)return d.firstChild(),!1;c=0}else a();else d.currentNode.nodeType===Node.TEXT_NODE?c-=1:null!==d.lastChild()?a():d.currentNode===k?e=!1:
c=0;return e};this.container=function(){var a=d.currentNode,b=a.nodeType;return 0===c&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=d.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&c===a.length)for(a=a.nextSibling;a&&1!==t(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===c&&(a=null);return a};this.leftNode=function(){var a=d.currentNode;if(0===c)for(a=a.previousSibling;a&&1!==t(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==t(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return d.currentNode};this.domOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return c;var a=0,b=d.currentNode,f;for(f=1===c?d.lastChild():d.previousSibling();f;)a+=1,f=d.previousSibling();d.currentNode=b;return a};this.unfilteredDomOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return c;for(var a=0,b=d.currentNode,b=1===c?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=
function(){var a=d.currentNode,c=d.previousSibling();d.currentNode=a;return c};this.getNextSibling=function(){var a=d.currentNode,c=d.nextSibling();d.currentNode=a;return c};this.setUnfilteredPosition=function(a,b){var g;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");d.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return c=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),
b===a.length&&(c=void 0,d.nextSibling()?c=0:d.parentNode()&&(c=1),runtime.assert(void 0!==c,"Error in setPosition: position not valid.")),!0;g=t(a);b<a.childNodes.length&&g!==NodeFilter.FILTER_REJECT?(d.currentNode=a.childNodes[b],g=t(d.currentNode),c=0):c=0===b?0:1;g===NodeFilter.FILTER_REJECT&&(c=1);if(g!==NodeFilter.FILTER_ACCEPT)return f.nextPosition();runtime.assert(t(d.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
return!0};this.moveToEnd=function(){d.currentNode=k;c=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?f.setUnfilteredPosition(a,a.length):(d.currentNode=a,c=1)};this.getNodeFilter=function(){return t};t=(l?new n(l):new b).acceptNode;t.acceptNode=t;d=k.ownerDocument.createTreeWalker(k,g||4294967295,t,h);c=0;null===d.firstChild()&&(c=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(k){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var k={},g=core.PositionFilter.FilterResult.FILTER_ACCEPT,l=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(h){for(var b in k)if(k.hasOwnProperty(b)&&k[b].acceptPosition(h)===l)return l;return g};this.addFilter=function(g,b){k[g]=b};this.removeFilter=function(g){delete k[g]}};
// Input 16
core.Async=function(){this.forEach=function(k,g,l){function h(b){a!==n&&(b?(a=n,l(b)):(a+=1,a===n&&l(null)))}var b,n=k.length,a=0;for(b=0;b<n;b+=1)g(k[b],h)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(k,g){function l(a){var c=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,e,d=a.length,f=0,f=0;b=-1;for(e=0;e<d;e+=1)f=(b^a[e])&255,f=c[f],b=b>>>8^f;return b^-1}function h(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function b(a){var c=a.getFullYear();return 1980>c?0:c-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function n(a,c){var b,e,d,f,g,m,n,r=this;this.load=function(c){if(void 0!==r.data)c(null,r.data);else{var b=g+34+e+d+256;b+n>q&&(b=q-n);runtime.read(a,n,b,function(b,e){if(b||null===e)c(b,e);else a:{var d=e,p=new core.ByteArray(d),h=p.readUInt32LE(),n;if(67324752!==h)c("File entry signature is wrong."+h.toString()+" "+d.length.toString(),null);else{p.pos+=22;h=p.readUInt16LE();n=p.readUInt16LE();p.pos+=h+n;
if(f){d=d.slice(p.pos,p.pos+g);if(g!==d.length){c("The amount of compressed bytes read was "+d.length.toString()+" instead of "+g.toString()+" for "+r.filename+" in "+a+".",null);break a}d=w(d,m)}else d=d.slice(p.pos,p.pos+m);m!==d.length?c("The amount of bytes read was "+d.length.toString()+" instead of "+m.toString()+" for "+r.filename+" in "+a+".",null):(r.data=d,c(null,d))}}})}};this.set=function(a,c,b,e){r.filename=a;r.data=c;r.compressed=b;r.date=e};this.error=null;c&&(b=c.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+a+'": '+c.data.length.toString():(c.pos+=6,f=c.readUInt16LE(),this.date=h(c.readUInt32LE()),c.readUInt32LE(),g=c.readUInt32LE(),m=c.readUInt32LE(),e=c.readUInt16LE(),d=c.readUInt16LE(),b=c.readUInt16LE(),c.pos+=8,n=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.slice(c.pos,c.pos+e),"utf8"),c.pos+=e+d+b))}function a(a,c){if(22!==a.length)c("Central directory length should be 22.",
u);else{var b=new core.ByteArray(a),e;e=b.readUInt32LE();101010256!==e?c("Central directory signature is wrong: "+e.toString(),u):(e=b.readUInt16LE(),0!==e?c("Zip files with non-zero disk numbers are not supported.",u):(e=b.readUInt16LE(),0!==e?c("Zip files with non-zero disk numbers are not supported.",u):(e=b.readUInt16LE(),s=b.readUInt16LE(),e!==s?c("Number of entries is inconsistent.",u):(e=b.readUInt32LE(),b=b.readUInt16LE(),b=q-22-e,runtime.read(k,b,q-b,function(a,b){if(a||null===b)c(a,u);else a:{var e=
new core.ByteArray(b),d,f;m=[];for(d=0;d<s;d+=1){f=new n(k,e);if(f.error){c(f.error,u);break a}m[m.length]=f}c(null,u)}})))))}}function f(a,c){var b=null,e,d;for(d=0;d<m.length;d+=1)if(e=m[d],e.filename===a){b=e;break}b?b.data?c(null,b.data):b.load(c):c(a+" not found.",null)}function d(a){var c=new core.ByteArrayWriter("utf8"),e=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(e=a.data.length);c.appendUInt32LE(b(a.date));c.appendUInt32LE(l(a.data));c.appendUInt32LE(e);c.appendUInt32LE(e);c.appendUInt16LE(a.filename.length);
c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function c(a,c){var e=new core.ByteArrayWriter("utf8"),d=0;e.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(d=a.data.length);e.appendUInt32LE(b(a.date));e.appendUInt32LE(l(a.data));e.appendUInt32LE(d);e.appendUInt32LE(d);e.appendUInt16LE(a.filename.length);e.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);e.appendUInt32LE(c);e.appendString(a.filename);return e}function t(a,c){if(a===m.length)c(null);else{var b=m[a];
void 0!==b.data?t(a+1,c):b.load(function(b){b?c(b):t(a+1,c)})}}function e(a,b){t(0,function(e){if(e)b(e);else{e=new core.ByteArrayWriter("utf8");var f,g,h,n=[0];for(f=0;f<m.length;f+=1)e.appendByteArrayWriter(d(m[f])),n.push(e.getLength());h=e.getLength();for(f=0;f<m.length;f+=1)g=m[f],e.appendByteArrayWriter(c(g,n[f]));f=e.getLength()-h;e.appendArray([80,75,5,6,0,0,0,0]);e.appendUInt16LE(m.length);e.appendUInt16LE(m.length);e.appendUInt32LE(f);e.appendUInt32LE(h);e.appendArray([0,0]);a(e.getByteArray())}})}
function r(a,c){e(function(b){runtime.writeFile(a,b,c)},c)}var m,q,s,w=(new core.RawInflate).inflate,u=this,z=new core.Base64;this.load=f;this.save=function(a,c,b,e){var d,f;for(d=0;d<m.length;d+=1)if(f=m[d],f.filename===a){f.set(a,c,b,e);return}f=new n(k);f.set(a,c,b,e);m.push(f)};this.write=function(a){r(k,a)};this.writeAs=r;this.createByteArray=e;this.loadContentXmlAsFragments=function(a,c){u.loadAsString(a,function(a,b){if(a)return c.rootElementReady(a);c.rootElementReady(null,b,!0)})};this.loadAsString=
function(a,c){f(a,function(a,b){if(a||null===b)return c(a,null);var e=runtime.byteArrayToString(b,"utf8");c(null,e)})};this.loadAsDOM=function(a,c){u.loadAsString(a,function(a,b){if(a||null===b)c(a,null);else{var e=(new DOMParser).parseFromString(b,"text/xml");c(null,e)}})};this.loadAsDataURL=function(a,c,b){f(a,function(a,e){if(a)return b(a,null);var d=0,f;c||(c=80===e[1]&&78===e[2]&&71===e[3]?"image/png":255===e[0]&&216===e[1]&&255===e[2]?"image/jpeg":71===e[0]&&73===e[1]&&70===e[2]?"image/gif":
"");for(f="data:"+c+";base64,";d<e.length;)f+=z.convertUTF8ArrayToBase64(e.slice(d,Math.min(d+45E3,e.length))),d+=45E3;b(null,f)})};this.getEntries=function(){return m.slice()};q=-1;null===g?m=[]:runtime.getFileSize(k,function(c){q=c;0>q?g("File '"+k+"' cannot be read.",u):runtime.read(k,q-22,22,function(c,b){c||null===g||null===b?g(c,u):a(b,g)})})};
// Input 18
core.CSSUnits=function(){var k={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(g,l,h){return g*k[h]/k[l]};this.convertMeasure=function(g,l){var h,b;g&&l?(h=parseFloat(g),b=g.replace(h.toString(),""),h=this.convert(h,b,l)):h="";return h.toString()};this.getUnits=function(g){return g.substr(g.length-2,g.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(k){var g=function(){};g.prototype=k;return new g});
xmldom.LSSerializer=function(){function k(b){var g=b||{},a=function(a){var c={},b;for(b in a)a.hasOwnProperty(b)&&(c[a[b]]=b);return c}(b),f=[g],d=[a],c=0;this.push=function(){c+=1;g=f[c]=Object.create(g);a=d[c]=Object.create(a)};this.pop=function(){f[c]=void 0;d[c]=void 0;c-=1;g=f[c];a=d[c]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(c){var b=c.namespaceURI,d=0,f;if(!b)return c.localName;if(f=a[b])return f+":"+c.localName;do{f||!c.prefix?(f="ns"+d,d+=1):f=c.prefix;
if(g[f]===b)break;if(!g[f]){g[f]=b;a[b]=f;break}f=null}while(null===f);return f+":"+c.localName}}function g(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function l(b,n){var a="",f=h.filter?h.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,d;if(f===NodeFilter.FILTER_ACCEPT&&n.nodeType===Node.ELEMENT_NODE){b.push();d=b.getQName(n);var c,k=n.attributes,e,r,m,q="",s;c="<"+d;e=k.length;for(r=0;r<e;r+=1)m=k.item(r),"http://www.w3.org/2000/xmlns/"!==
m.namespaceURI&&(s=h.filter?h.filter.acceptNode(m):NodeFilter.FILTER_ACCEPT,s===NodeFilter.FILTER_ACCEPT&&(s=b.getQName(m),m="string"===typeof m.value?g(m.value):m.value,q+=" "+(s+'="'+m+'"')));e=b.getLocalNamespaceDefinitions();for(r in e)e.hasOwnProperty(r)&&((k=e[r])?"xmlns"!==k&&(c+=" xmlns:"+e[r]+'="'+r+'"'):c+=' xmlns="'+r+'"');a+=c+(q+">")}if(f===NodeFilter.FILTER_ACCEPT||f===NodeFilter.FILTER_SKIP){for(f=n.firstChild;f;)a+=l(b,f),f=f.nextSibling;n.nodeValue&&(a+=g(n.nodeValue))}d&&(a+="</"+
d+">",b.pop());return a}var h=this;this.filter=null;this.writeToString=function(b,g){if(!b)return"";var a=new k(g);return l(a,b)}};
// Input 21
xmldom.RelaxNGParser=function(){function k(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function g(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return g({name:a.name,e:[b].concat(a.e.slice(2))})}function l(a){a=a.split(":",2);var b="",e;1===a.length?a=["",a[0]]:b=a[0];for(e in f)f[e]===b&&(a[0]=e);return a}function h(a,b){for(var e=0,d,f,g=a.name;a.e&&e<a.e.length;)if(d=
a.e[e],"ref"===d.name){f=b[d.a.name];if(!f)throw d.a.name+" was not defined.";d=a.e.slice(e+1);a.e=a.e.slice(0,e);a.e=a.e.concat(f.e);a.e=a.e.concat(d)}else e+=1,h(d,b);d=a.e;"choice"!==g||d&&d[1]&&"empty"!==d[1].name||(d&&d[0]&&"empty"!==d[0].name?(d[1]=d[0],d[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===g||"interleave"===g)"empty"===d[0].name?"empty"===d[1].name?(delete a.e,a.name="empty"):(g=a.name=d[1].name,a.names=d[1].names,d=a.e=d[1].e):"empty"===d[1].name&&(g=a.name=d[0].name,
a.names=d[0].names,d=a.e=d[0].e);"oneOrMore"===g&&"empty"===d[0].name&&(delete a.e,a.name="empty");if("attribute"===g){f=a.names?a.names.length:0;for(var n,k=[],u=[],e=0;e<f;e+=1)n=l(a.names[e]),u[e]=n[0],k[e]=n[1];a.localnames=k;a.namespaces=u}"interleave"===g&&("interleave"===d[0].name?a.e="interleave"===d[1].name?d[0].e.concat(d[1].e):[d[1]].concat(d[0].e):"interleave"===d[1].name&&(a.e=[d[0]].concat(d[1].e)))}function b(a,d){for(var e=0,f;a.e&&e<a.e.length;)f=a.e[e],"elementref"===f.name?(f.id=
f.id||0,a.e[e]=d[f.id]):"element"!==f.name&&b(f,d),e+=1}var n=this,a,f={"http://www.w3.org/XML/1998/namespace":"xml"},d;d=function(a,b,e){var h=[],m,n,s=a.localName,k=[];m=a.attributes;var u=s,z=k,v={},p,y;for(p=0;p<m.length;p+=1)if(y=m.item(p),y.namespaceURI)"http://www.w3.org/2000/xmlns/"===y.namespaceURI&&(f[y.value]=y.localName);else{"name"!==y.localName||"element"!==u&&"attribute"!==u||z.push(y.value);if("name"===y.localName||"combine"===y.localName||"type"===y.localName){var D=y,H;H=y.value;
H=H.replace(/^\s\s*/,"");for(var A=/\s/,N=H.length-1;A.test(H.charAt(N));)N-=1;H=H.slice(0,N+1);D.value=H}v[y.localName]=y.value}m=v;m.combine=m.combine||void 0;a=a.firstChild;u=h;z=k;for(v="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(p=d(a,b,u))"name"===p.name?z.push(f[p.a.ns]+":"+p.text):"choice"===p.name&&(p.names&&p.names.length)&&(z=z.concat(p.names),delete p.names),u.push(p)}else a.nodeType===Node.TEXT_NODE&&(v+=a.nodeValue);a=a.nextSibling}a=
v;"value"!==s&&"param"!==s&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===s&&void 0===m.type&&(m.type="token",m.datatypeLibrary="");"attribute"!==s&&"element"!==s||void 0===m.name||(n=l(m.name),h=[{name:"name",text:n[1],a:{ns:n[0]}}].concat(h),delete m.name);"name"===s||"nsName"===s||"value"===s?void 0===m.ns&&(m.ns=""):delete m.ns;"name"===s&&(n=l(a),m.ns=n[0],a=n[1]);1<h.length&&("define"===s||"oneOrMore"===s||"zeroOrMore"===s||"optional"===s||"list"===s||"mixed"===s)&&(h=[{name:"group",e:g({name:"group",
e:h}).e}]);2<h.length&&"element"===s&&(h=[h[0]].concat({name:"group",e:g({name:"group",e:h.slice(1)}).e}));1===h.length&&"attribute"===s&&h.push({name:"text",text:a});1!==h.length||"choice"!==s&&"group"!==s&&"interleave"!==s?2<h.length&&("choice"===s||"group"===s||"interleave"===s)&&(h=g({name:s,e:h}).e):(s=h[0].name,k=h[0].names,m=h[0].a,a=h[0].text,h=h[0].e);"mixed"===s&&(s="interleave",h=[h[0],{name:"text"}]);"optional"===s&&(s="choice",h=[h[0],{name:"empty"}]);"zeroOrMore"===s&&(s="choice",h=
[{name:"oneOrMore",e:[h[0]]},{name:"empty"}]);if("define"===s&&m.combine){a:{u=m.combine;z=m.name;v=h;for(p=0;e&&p<e.length;p+=1)if(y=e[p],"define"===y.name&&y.a&&y.a.name===z){y.e=[{name:u,e:y.e.concat(v)}];e=y;break a}e=null}if(e)return}e={name:s};h&&0<h.length&&(e.e=h);for(n in m)if(m.hasOwnProperty(n)){e.a=m;break}void 0!==a&&(e.text=a);k&&0<k.length&&(e.names=k);"element"===s&&(e.id=b.length,b.push(e),e={name:"elementref",id:e.id});return e};this.parseRelaxNGDOM=function(c,g){var e=[],l=d(c&&
c.documentElement,e,void 0),m,q,s={};for(m=0;m<l.e.length;m+=1)q=l.e[m],"define"===q.name?s[q.a.name]=q:"start"===q.name&&(a=q);if(!a)return[new k("No Relax NG start element was found.")];h(a,s);for(m in s)s.hasOwnProperty(m)&&h(s[m],s);for(m=0;m<e.length;m+=1)h(e[m],s);g&&(n.rootPattern=g(a.e[0],e));b(a,e);for(m=0;m<e.length;m+=1)b(e[m],e);n.start=a;n.elements=e;n.nsmap=f;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function k(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function g(a,b){return function(){var c={},d=0;return function(e){var f=e.hash||e.toString(),g;g=c[f];if(void 0!==g)return g;c[f]=g=b(e);g.hash=a+d.toString();d+=1;return g}}()}function l(a){return function(){var b={};return function(c){var d,e;e=b[c.localName];if(void 0===e)b[c.localName]=e={};else if(d=e[c.namespaceURI],void 0!==d)return d;return e[c.namespaceURI]=d=a(c)}}()}function h(a,
b,c){return function(){var d={},e=0;return function(f,g){var m=b&&b(f,g),h,p;if(void 0!==m)return m;m=f.hash||f.toString();h=g.hash||g.toString();p=d[m];if(void 0===p)d[m]=p={};else if(m=p[h],void 0!==m)return m;p[h]=m=c(f,g);m.hash=a+e.toString();e+=1;return m}}()}function b(a,c){"choice"===c.p1.type?b(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?b(a,c.p2):a[c.p2.hash]=c.p2}function n(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return p},startTagOpenDeriv:function(c){return a.contains(c)?
m(b,y):p},attDeriv:function(){return p},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return y}}}function f(a,b,d,e){if(b===p)return p;if(e>=d.length)return b;0===e&&(e=0);for(var g=d.item(e);g.namespaceURI===c;){e+=1;if(e>=d.length)return b;g=d.item(e)}return g=f(a,b.attDeriv(a,d.item(e)),d,e+1)}function d(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):d(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
d(a,b,c.e[1])}var c="http://www.w3.org/2000/xmlns/",t,e,r,m,q,s,w,u,z,v,p={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return p},startTagOpenDeriv:function(){return p},attDeriv:function(){return p},startTagCloseDeriv:function(){return p},endTagDeriv:function(){return p}},y={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return p},startTagOpenDeriv:function(){return p},attDeriv:function(){return p},startTagCloseDeriv:function(){return y},endTagDeriv:function(){return p}},
D={type:"text",nullable:!0,hash:"text",textDeriv:function(){return D},startTagOpenDeriv:function(){return p},attDeriv:function(){return p},startTagCloseDeriv:function(){return D},endTagDeriv:function(){return p}},H,A,N;t=h("choice",function(a,b){if(a===p)return b;if(b===p||a===b)return a},function(a,c){var e={},d;b(e,{p1:a,p2:c});c=a=void 0;for(d in e)e.hasOwnProperty(d)&&(void 0===a?a=e[d]:c=void 0===c?e[d]:t(c,e[d]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,e){return t(a.textDeriv(c,e),b.textDeriv(c,e))},startTagOpenDeriv:l(function(c){return t(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,e){return t(a.attDeriv(c,e),b.attDeriv(c,e))},startTagCloseDeriv:k(function(){return t(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:k(function(){return t(a.endTagDeriv(),b.endTagDeriv())})}}(a,c)});e=function(a,b,c){return function(){var e={},d=0;return function(f,g){var m=b&&b(f,g),h,p;if(void 0!==m)return m;
m=f.hash||f.toString();h=g.hash||g.toString();m<h&&(p=m,m=h,h=p,p=f,f=g,g=p);p=e[m];if(void 0===p)e[m]=p={};else if(m=p[h],void 0!==m)return m;p[h]=m=c(f,g);m.hash=a+d.toString();d+=1;return m}}()}("interleave",function(a,b){if(a===p||b===p)return p;if(a===y)return b;if(b===y)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){return t(e(a.textDeriv(c,d),b),e(a,b.textDeriv(c,d)))},startTagOpenDeriv:l(function(c){return t(H(function(a){return e(a,
b)},a.startTagOpenDeriv(c)),H(function(b){return e(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,d){return t(e(a.attDeriv(c,d),b),e(a,b.attDeriv(c,d)))},startTagCloseDeriv:k(function(){return e(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});r=h("group",function(a,b){if(a===p||b===p)return p;if(a===y)return b;if(b===y)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,e){var d=r(a.textDeriv(c,e),b);return a.nullable?t(d,b.textDeriv(c,
e)):d},startTagOpenDeriv:function(c){var e=H(function(a){return r(a,b)},a.startTagOpenDeriv(c));return a.nullable?t(e,b.startTagOpenDeriv(c)):e},attDeriv:function(c,e){return t(r(a.attDeriv(c,e),b),r(a,b.attDeriv(c,e)))},startTagCloseDeriv:k(function(){return r(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});m=h("after",function(a,b){if(a===p||b===p)return p},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,e){return m(a.textDeriv(c,e),b)},startTagOpenDeriv:l(function(c){return H(function(a){return m(a,
b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,e){return m(a.attDeriv(c,e),b)},startTagCloseDeriv:k(function(){return m(a.startTagCloseDeriv(),b)}),endTagDeriv:k(function(){return a.nullable?b:p})}});q=g("oneormore",function(a){return a===p?p:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return r(a.textDeriv(b,c),t(this,y))},startTagOpenDeriv:function(b){var c=this;return H(function(a){return r(a,t(c,y))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return r(a.attDeriv(b,
c),t(this,y))},startTagCloseDeriv:k(function(){return q(a.startTagCloseDeriv())})}});w=h("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,e){return a.contains(e)&&(b.nullable&&/^\s+$/.test(e.nodeValue)||b.textDeriv(c,e.nodeValue).nullable)?y:p},startTagCloseDeriv:function(){return p}}});s=g("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?y:p},attDeriv:function(){return p},startTagCloseDeriv:function(){return this}}});
z=g("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return y},attDeriv:function(){return p},startTagCloseDeriv:function(){return this}}});H=function P(a,b){return"after"===b.type?m(b.p1,a(b.p2)):"choice"===b.type?t(P(a,b.p1),P(a,b.p2)):b};A=function(a,b,c){var e=c.currentNode;b=b.startTagOpenDeriv(e);b=f(a,b,e.attributes,0);var d=b=b.startTagCloseDeriv(),e=c.currentNode;b=c.firstChild();for(var g=[],m;b;)b.nodeType===Node.ELEMENT_NODE?g.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||g.push(b.nodeValue),b=c.nextSibling();0===g.length&&(g=[""]);m=d;for(d=0;m!==p&&d<g.length;d+=1)b=g[d],"string"===typeof b?m=/^\s*$/.test(b)?t(m,m.textDeriv(a,b)):m.textDeriv(a,b):(c.currentNode=b,m=A(a,m,c));c.currentNode=e;return b=m.endTagDeriv()};u=function(a){var b,c,e;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];d(b,c,a);a="";for(e=0;e<b.length;e+=
1)a+="{"+c[e]+"}"+b[e]+",";a={hash:a,contains:function(a){var e;for(e=0;e<b.length;e+=1)if(b[e]===a.localName&&c[e]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};v=function B(b,c){var d,f;if("elementref"===b.name){d=b.id||0;b=c[d];if(void 0!==b.name){var g=b;d=c[g.id]={hash:"element"+g.id.toString()};g=n(u(g.e[0]),v(g.e[1],c));for(f in g)g.hasOwnProperty(f)&&(d[f]=g[f]);return d}return b}switch(b.name){case "empty":return y;case "notAllowed":return p;
case "text":return D;case "choice":return t(B(b.e[0],c),B(b.e[1],c));case "interleave":d=B(b.e[0],c);for(f=1;f<b.e.length;f+=1)d=e(d,B(b.e[f],c));return d;case "group":return r(B(b.e[0],c),B(b.e[1],c));case "oneOrMore":return q(B(b.e[0],c));case "attribute":return w(u(b.e[0]),B(b.e[1],c));case "value":return s(b.text);case "data":return d=b.a&&b.a.type,void 0===d&&(d=""),z(d);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var c={},e;for(e in b)b.hasOwnProperty(e)&&
(c[e]=b[e]);return e=v(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=A(null,N,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){N=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function k(a,b){this.message=function(){b&&(a+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function g(a,f,d,c){return"empty"===a.name?null:b(a,f,d,c)}function l(a,b){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var d=b.currentNode,c=d?d.nodeType:0,h=null;c>Node.ELEMENT_NODE;){if(c!==Node.COMMENT_NODE&&(c!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new k("Not allowed node of type "+
c+".")];c=(d=b.nextSibling())?d.nodeType:0}if(!d)return[new k("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(n[d.namespaceURI]+":"+d.localName))return[new k("Found "+d.nodeName+" instead of "+a.names+".",d)];if(b.firstChild()){for(h=g(a.e[1],b,d);b.nextSibling();)if(c=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||c===Node.COMMENT_NODE))return[new k("Spurious content.",b.currentNode)];if(b.parentNode()!==d)return[new k("Implementation error.")]}else h=
g(a.e[1],b,d);b.nextSibling();return h}var h,b,n;b=function(a,f,d,c){var h=a.name,e=null;if("text"===h)a:{for(var n=(a=f.currentNode)?a.nodeType:0;a!==d&&3!==n;){if(1===n){e=[new k("Element not allowed here.",a)];break a}n=(a=f.nextSibling())?a.nodeType:0}f.nextSibling();e=null}else if("data"===h)e=null;else if("value"===h)c!==a.text&&(e=[new k("Wrong value, should be '"+a.text+"', not '"+c+"'",d)]);else if("list"===h)e=null;else if("attribute"===h)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;h=a.localnames.length;for(e=0;e<h;e+=1){c=d.getAttributeNS(a.namespaces[e],a.localnames[e]);""!==c||d.hasAttributeNS(a.namespaces[e],a.localnames[e])||(c=void 0);if(void 0!==n&&void 0!==c){e=[new k("Attribute defined too often.",d)];break a}n=c}e=void 0===n?[new k("Attribute not found: "+a.names,d)]:g(a.e[1],f,d,n)}else if("element"===h)e=l(a,f);else if("oneOrMore"===h){c=0;do n=f.currentNode,h=b(a.e[0],f,d),c+=1;while(!h&&n!==f.currentNode);1<c?(f.currentNode=n,e=null):e=h}else if("choice"===
h){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;n=f.currentNode;if("empty"===a.e[0].name){if(h=b(a.e[1],f,d,c))f.currentNode=n;e=null}else{if(h=g(a.e[0],f,d,c))f.currentNode=n,h=b(a.e[1],f,d,c);e=h}}else if("group"===h){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;e=b(a.e[0],f,d)||b(a.e[1],f,d)}else if("interleave"===h)a:{n=a.e.length;c=[n];for(var m=n,q,s,w,u;0<m;){q=0;s=f.currentNode;for(e=0;e<n;e+=1)w=f.currentNode,!0!==c[e]&&c[e]!==w&&(u=a.e[e],(h=
b(u,f,d))?(f.currentNode=w,void 0===c[e]&&(c[e]=!1)):w===f.currentNode||"oneOrMore"===u.name||"choice"===u.name&&("oneOrMore"===u.e[0].name||"oneOrMore"===u.e[1].name)?(q+=1,c[e]=w):(q+=1,c[e]=!0));if(s===f.currentNode&&q===m){e=null;break a}if(0===q){for(e=0;e<n;e+=1)if(!1===c[e]){e=[new k("Interleave does not match.",d)];break a}e=null;break a}for(e=m=0;e<n;e+=1)!0!==c[e]&&(m+=1)}e=null}else throw h+" not allowed in nonEmptyPattern.";return e};this.validate=function(a,b){a.currentNode=a.root;var d=
g(h.e[0],a,a.root);b(d)};this.init=function(a,b){h=a;n=b}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function k(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function g(a){for(var b=[],c=0,d=a.length,f;c<d;){var g=a,h=d,n=b,l="",p=[],y=g.indexOf("[",c),D=g.indexOf("/",c),H=g.indexOf("=",c);k(D,y,H)?(l=g.substring(c,D),c=D+1):k(y,D,H)?(l=g.substring(c,y),c=t(g,y,p)):k(H,D,y)?(l=g.substring(c,H),c=H):(l=g.substring(c,h),c=h);n.push({location:l,predicates:p});if(c<d&&"="===a[c]){f=a.substring(c+1,d);if(2<f.length&&("'"===f[0]||'"'===f[0]))f=f.slice(1,f.length-1);else try{f=
parseInt(f,10)}catch(A){}c=d}}return{steps:b,value:f}}function l(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function h(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function b(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function n(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function a(a,b,c){b=b.split(":",2);var d=c(b[0]),f=b[1];return new n(a,function(a){return a.localName===f&&a.namespaceURI===d})}function f(a,b,d){var f=new l,g=c(f,b,d),h=b.value;return void 0===h?new n(a,function(a){f.setNode(a);
g.reset();return g.next()}):new n(a,function(a){f.setNode(a);g.reset();return(a=g.next())&&a.nodeValue===h})}function d(a,b,d){var f=a.ownerDocument,h=[],n=null;if(f&&f.evaluate)for(d=f.evaluate(b,a,d,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),n=d.iterateNext();null!==n;)n.nodeType===Node.ELEMENT_NODE&&h.push(n),n=d.iterateNext();else{h=new l;h.setNode(a);a=g(b);h=c(h,a,d);a=[];for(d=h.next();d;)a.push(d),d=h.next();h=a}return h}var c,t;t=function(a,b,c){for(var d=b,f=a.length,h=0;d<f;)"]"===
a[d]?(h-=1,0>=h&&c.push(g(a.substring(b,d)))):"["===a[d]&&(0>=h&&(b=d+1),h+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};c=function(c,d,g){var n,l,k,u;for(n=0;n<d.steps.length;n+=1)for(k=d.steps[n],l=k.location,""===l?c=new b(c,!1):"@"===l[0]?(u=l.slice(1).split(":",2),c=new h(c,g(u[0]),u[1])):"."!==l&&(c=new b(c,!1),-1!==l.indexOf(":")&&(c=a(c,l,g))),l=0;l<k.predicates.length;l+=1)u=k.predicates[l],c=f(c,u,g);return c};xmldom.XPath=
function(){this.getODFElementsWithXPath=d};return xmldom.XPath}();
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
gui.AnnotationViewManager=function(k,g){function l(b){var d=b.node,e=b.end;b=a.createRange();e&&(b.setStart(d,d.childNodes.length),b.setEnd(e,0),e=f.getTextNodes(b,!1),e.forEach(function(b){var c=a.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",d.getAttributeNS(odf.Namespaces.officens,"name"));b.parentNode.insertBefore(c,b);c.appendChild(b)}));b.detach()}function h(){n.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?
-1:1})}function b(){var b;for(b=0;b<n.length;b+=1){var f=n[b],e=f.node.parentNode,h=e.nextSibling,m=h.nextSibling,l=e.parentNode,k=0,k=n[n.indexOf(f)-1],w=void 0,f=f.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],w=void 0;e.style.left=g.getBoundingClientRect().left-l.getBoundingClientRect().left+"px";e.style.width=g.getBoundingClientRect().width+"px";h.style.width=parseFloat(e.style.left)-30+"px";k&&(w=k.node.parentNode.getBoundingClientRect(),20>=l.getBoundingClientRect().top-w.bottom?
e.style.top=Math.abs(l.getBoundingClientRect().top-w.bottom)+20+"px":e.style.top="0px");m.style.left=h.getBoundingClientRect().width+"px";var h=m.style,l=m.getBoundingClientRect().left,k=m.getBoundingClientRect().top,w=e.getBoundingClientRect().left,u=e.getBoundingClientRect().top,z=0,v=0,z=w-l,z=z*z,v=u-k,v=v*v,l=Math.sqrt(z+v);h.width=l+"px";k=Math.asin((e.getBoundingClientRect().top-m.getBoundingClientRect().top)/parseFloat(m.style.width));m.style.transform="rotate("+k+"rad)";m.style.MozTransform=
"rotate("+k+"rad)";m.style.WebkitTransform="rotate("+k+"rad)";m.style.msTransform="rotate("+k+"rad)";f&&(w=d.getComputedStyle(f,":before").content)&&"none"!==w&&(w=w.substring(1,w.length-1),f.firstChild?f.firstChild.nodeValue=w:f.appendChild(a.createTextNode(w)))}}var n=[],a=k.ownerDocument,f=new odf.OdfUtils,d=runtime.getWindow();runtime.assert(Boolean(d),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=b;this.addAnnotation=function(c){n.push({node:c.node,
end:c.end});h();var d=a.createElement("div"),e=a.createElement("div"),f=a.createElement("div"),g=a.createElement("div"),k=c.node;d.className="annotationWrapper";k.parentNode.insertBefore(d,k);e.className="annotationNote";e.appendChild(k);f.className="annotationConnector horizontal";g.className="annotationConnector angular";d.appendChild(e);d.appendChild(f);d.appendChild(g);c.end&&l(c);b()};this.forgetAnnotations=function(){for(;n.length;){var b=n[0],d=b.node,e=d.parentNode.parentNode;"div"===e.localName&&
(e.parentNode.insertBefore(d,e),e.parentNode.removeChild(e));for(var d=b.node.getAttributeNS(odf.Namespaces.officens,"name"),d=a.querySelectorAll('span.annotationHighlight[annotation="'+d+'"]'),f=e=void 0,g=void 0,h=void 0,e=0;e<d.length;e+=1){g=d[e];h=g.childNodes;for(f=0;f<h.length;f+=1)g.parentNode.insertBefore(h[f],g);g.parentNode.removeChild(g)}n.splice(n.indexOf(b),1)}}};
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
odf.OdfNodeFilter=function(){this.acceptNode=function(k){return"http://www.w3.org/1999/xhtml"===k.namespaceURI?NodeFilter.FILTER_SKIP:k.namespaceURI&&k.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
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
odf.Namespaces=function(){function k(h){return g[h]||null}var g={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",dc:"http://purl.org/dc/elements/1.1/",webodf:"urn:webodf"},l;k.lookupNamespaceURI=k;l=function(){};l.forEachPrefix=function(h){for(var b in g)g.hasOwnProperty(b)&&h(b,g[b])};l.resolvePrefix=k;l.namespaceMap=g;l.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";l.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
l.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";l.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";l.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";l.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";l.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";l.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";l.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";l.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
l.xlinkns="http://www.w3.org/1999/xlink";l.xmlns="http://www.w3.org/XML/1998/namespace";l.dcns="http://purl.org/dc/elements/1.1/";l.webodfns="urn:webodf";return l}();
// Input 28
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function k(a,b){for(var c=r[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,f,c=0;c<e;c+=1)(f=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,b+f);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,k(d,b)),c=c.nextSibling}function g(a,b){for(var c=r[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,f,c=0;c<e;c+=1)if(f=a.getAttributeNS(d[c].ns,d[c].localname))f=f.replace(b,""),a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,
f);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,g(d,b)),c=c.nextSibling}function l(a,b){var c=r[a.localName],d=(c=c&&c[a.namespaceURI])?c.length:0,e,f,g;for(g=0;g<d;g+=1)if(e=a.getAttributeNS(c[g].ns,c[g].localname))b=b||{},f=c[g].keyname,f=b[f]=b[f]||{},f[e]=1;return b}function h(a,b){var c,d;l(a,b);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,h(d,b)),c=c.nextSibling}function b(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function n(a,c,d){var e=a+'"'+
c,f=d[e];f||(f=d[e]=new b(e,a,c));return f}function a(b,d,e){var f=r[b.localName],g=(f=f&&f[b.namespaceURI])?f.length:0,h=b.getAttributeNS(c,"name"),m=b.getAttributeNS(c,"family"),l;h&&m&&(d=n(h,m,e));if(d)for(h=0;h<g;h+=1)if(m=b.getAttributeNS(f[h].ns,f[h].localname))l=f[h].keyname,m=n(m,l,e),d.requires[m.key]=m;for(h=b.firstChild;h;)h.nodeType===Node.ELEMENT_NODE&&(b=h,a(b,d,e)),h=h.nextSibling;return e}function f(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){f(a.requires[c],
b)})}function d(b,c){var d=a(b,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&f(a,c)})}var c="urn:oasis:names:tc:opendocument:xmlns:style:1.0",t={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:","urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},e={text:[{ens:c,
en:"tab-stop",ans:c,a:"leader-text-style"},{ens:c,en:"drop-cap",ans:c,a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"notes-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"citation-body-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"notes-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"citation-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"a",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"alphabetical-index",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"linenumbering-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list-level-style-number",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"ruby-text",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"span",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"a",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"visited-style-name"},{ens:c,en:"text-properties",ans:c,a:"text-line-through-text-style"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"alphabetical-index-source",
ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"main-entry-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-bibliography",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-chapter",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-link-end",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-link-start",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-page-number",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-span",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"index-entry-tab-stop",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-text",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-title-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list-level-style-bullet",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"outline-level-style",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"}],paragraph:[{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"caption",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"circle",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
en:"connector",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"control",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"custom-shape",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"ellipse",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"frame",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"line",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"measure",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
en:"path",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polygon",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polyline",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"rect",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"regular-polygon",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",en:"annotation",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",en:"column",ans:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",a:"text-style-name"},{ens:c,en:"style",ans:c,a:"next-style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"body",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"even-columns",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"even-rows",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
en:"first-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"first-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"last-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"last-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"odd-columns",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"odd-rows",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"notes-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"default-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"alphabetical-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"bibliography-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"h",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"illustration-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-source-style",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"object-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"p",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"table-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-of-content-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-index-entry-template",
ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:c,en:"page-layout-properties",ans:c,a:"register-truth-ref-style-name"}],chart:[{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"axis",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"chart",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"data-label",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"data-point",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"equation",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"error-indicator",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"floor",
ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"footer",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"grid",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"legend",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
en:"mean-value",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"plot-area",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"regression-curve",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"series",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"stock-gain-marker",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"stock-loss-marker",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"stock-range-line",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"subtitle",
ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"title",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"wall",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"}],section:[{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"alphabetical-index",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"bibliography",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"illustration-index",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-title",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"object-index",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"section",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-of-content",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-index",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-index",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"}],ruby:[{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"ruby",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"}],table:[{ens:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",en:"query",ans:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",en:"table-representation",ans:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
en:"background",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"table",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"}],"table-column":[{ens:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",en:"column",ans:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"table-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
a:"style-name"}],"table-row":[{ens:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",en:"query",ans:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",a:"default-row-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",en:"table-representation",ans:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",a:"default-row-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"table-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"}],"table-cell":[{ens:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",
en:"column",ans:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",a:"default-cell-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"table-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"default-cell-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"table-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"default-cell-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"body",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"covered-table-cell",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"even-columns",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"covered-table-cell",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
en:"even-columns",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"even-rows",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"first-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"first-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"last-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"last-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"odd-columns",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"odd-rows",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"table-cell",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"style-name"}],graphic:[{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"cube",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"extrude",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"rotate",
ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"scene",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"sphere",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"caption",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
en:"circle",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"connector",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"control",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"custom-shape",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"ellipse",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"frame",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"g",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"line",
ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"measure",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"page-thumbnail",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"path",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polygon",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polyline",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"rect",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"regular-polygon",
ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",en:"annotation",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"}],presentation:[{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"cube",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"extrude",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"rotate",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"scene",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",en:"sphere",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"caption",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"circle",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"connector",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"control",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
en:"custom-shape",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"ellipse",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"frame",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"g",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"line",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"measure",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"page-thumbnail",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
en:"path",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polygon",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polyline",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"rect",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"regular-polygon",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",en:"annotation",ans:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",a:"style-name"}],"drawing-page":[{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"page",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
en:"notes",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:c,en:"handout-master",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:c,en:"master-page",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"}],"list-style":[{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"numbered-paragraph",
ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list-item",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-override"},{ens:c,en:"style",ans:c,a:"list-style-name"}],data:[{ens:c,en:"style",ans:c,a:"data-style-name"},{ens:c,en:"style",ans:c,a:"percentage-data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",en:"date-time-decl",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"creation-date",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"creation-time",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"database-display",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"date",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"editing-duration",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"expression",
ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"meta-field",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"modification-date",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"modification-time",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"print-date",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"print-time",ans:c,
a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-formula",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"time",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-defined",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-field-get",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-field-input",ans:c,a:"data-style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-get",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-input",ans:c,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-set",ans:c,a:"data-style-name"}],"page-layout":[{ens:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",en:"notes",ans:c,a:"page-layout-name"},{ens:c,en:"handout-master",ans:c,a:"page-layout-name"},{ens:c,en:"master-page",ans:c,
a:"page-layout-name"}]},r,m=new xmldom.XPath;this.UsedStyleList=function(a,b){var e={};this.uses=function(a){var b=a.localName,d=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(c,"name");a="style"===b?a.getAttributeNS(c,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":b;return(a=e[a])?0<a[d]:!1};h(a,e);b&&d(b,e)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),e=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,
"family");return m.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,d){var e;if(a){for(e=a.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE){var f=e,g=b,h=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),m=void 0;h?m="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(h=f.getAttributeNS(c,"name"))&&(m=c);m&&f.setAttributeNS(m,t[m]+"name",g+h)}e=e.nextSibling}k(a,b);d&&k(d,
b)}};this.removePrefixFromStyleNames=function(a,b,d){var e=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var f=b,h=e,m=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),n=void 0;m?n="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(m=f.getAttributeNS(c,"name"))&&(n=c);n&&(m=m.replace(h,""),f.setAttributeNS(n,t[n]+"name",m))}b=b.nextSibling}g(a,e);d&&g(d,e)}};this.determineStylesForNode=l;r=function(a){var b,c,d,e,f,g={},h;for(b in a)if(a.hasOwnProperty(b))for(e=
a[b],d=e.length,c=0;c<d;c+=1)f=e[c],h=g[f.en]=g[f.en]||{},h=h[f.ens]=h[f.ens]||[],h.push({ns:f.ans,localname:f.a,keyname:b});return g}(e)};
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
runtime.loadClass("core.DomUtils");
odf.OdfUtils=function(){function k(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===w}function g(a){for(;a&&!k(a);)a=a.parentNode;return a}function l(a){return/^[ \t\r\n]+$/.test(a)}function h(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===w||"span"===b&&"annotationHighlight"===a.className?!0:!1}function b(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===w?d="s"===b||"tab"===b||"line-break"===b:c===u&&(d="frame"===b&&"as-char"===a.getAttributeNS(w,
"anchor-type")));return d}function n(a){for(;null!==a.firstChild&&h(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&h(a);)a=a.lastChild;return a}function f(b){for(;!k(b)&&null===b.previousSibling;)b=b.parentNode;return k(b)?null:a(b.previousSibling)}function d(a){for(;!k(a)&&null===a.nextSibling;)a=a.parentNode;return k(a)?null:n(a.nextSibling)}function c(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=f(a);else return!l(a.data.substr(a.length-1,1));else b(a)?
(c=!0,a=null):a=f(a);return c}function t(a){var c=!1;for(a=a&&n(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!l(a.data)){c=!0;break}if(b(a)){c=!0;break}a=d(a)}return c}function e(a,b){return l(a.data.substr(b))?!t(d(a)):!1}function r(a,d){var g=a.data,h;if(!l(g[d])||b(a.parentNode))return!1;0<d?l(g[d-1])||(h=!0):c(f(a))&&(h=!0);return!0===h?e(a,d)?!1:!0:!1}function m(a){return(a=/-?([0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function q(a){return(a=m(a))&&"%"!==a.unit?null:a}function s(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var w=
"urn:oasis:names:tc:opendocument:xmlns:text:1.0",u="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",z=/^\s*$/,v=new core.DomUtils;this.isParagraph=k;this.getParagraphElement=g;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===w&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===w};this.isODFWhitespace=l;this.isGroupingElement=h;this.isCharacterElement=b;this.firstChild=
n;this.lastChild=a;this.previousNode=f;this.nextNode=d;this.scanLeftForNonWhitespace=c;this.lookLeftForCharacter=function(a){var d;d=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(d=a.data,d=l(d.substr(d.length-1,1))?1===d.length?c(f(a))?2:0:l(d.substr(d.length-2,1))?0:2:1):b(a)&&(d=1);return d};this.lookRightForCharacter=function(a){var c=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?c=!l(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(c){var d=!1;for(c=c&&a(c);c;){if(c.nodeType===
Node.TEXT_NODE&&0<c.length&&!l(c.data)){d=!0;break}if(b(c)){d=!0;break}c=f(c)}return d};this.scanRightForAnyCharacter=t;this.isTrailingWhitespace=e;this.isSignificantWhitespace=r;this.getFirstNonWhitespaceChild=function(a){for(a=a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&z.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=m;this.parseFoFontSize=function(a){var b;b=(b=m(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||q(a)};this.parseFoLineHeight=function(a){var b;b=(b=m(a))&&(0>b.value||
"%"===b.unit)?null:b;return b||q(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,c=[];for(b.nodeType===Node.ELEMENT_NODE&&(c=v.getElementsByTagNameNS(b,w,"p").concat(v.getElementsByTagNameNS(b,w,"h")));b&&!k(b);)b=b.parentNode;b&&c.push(b);return c.filter(function(b){return v.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),d;d=v.getNodesInRange(a,function(d){c.selectNodeContents(d);if(d.nodeType===Node.TEXT_NODE){if(b&&
v.rangesIntersect(a,c)||v.containsRange(a,c))return Boolean(g(d)&&(!l(d.textContent)||r(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(v.rangesIntersect(a,c)&&s(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return d};this.getTextElements=function(a,c){var d=a.startContainer.ownerDocument.createRange(),e;e=v.getNodesInRange(a,function(e){var f=e.nodeType;d.selectNodeContents(e);if(f===Node.TEXT_NODE){if(v.containsRange(a,d)&&(c||Boolean(g(e)&&(!l(e.textContent)||
r(e,0)))))return NodeFilter.FILTER_ACCEPT}else if(b(e)){if(v.containsRange(a,d))return NodeFilter.FILTER_ACCEPT}else if(s(e)||h(e))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});d.detach();return e};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),c;c=v.getNodesInRange(a,function(c){b.selectNodeContents(c);if(k(c)){if(v.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(s(c)||h(c))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});
b.detach();return c}};
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
odf.TextSerializer=function(){function k(h){var b="",n=g.filter?g.filter.acceptNode(h):NodeFilter.FILTER_ACCEPT,a=h.nodeType,f;if(n===NodeFilter.FILTER_ACCEPT||n===NodeFilter.FILTER_SKIP)for(f=h.firstChild;f;)b+=k(f),f=f.nextSibling;n===NodeFilter.FILTER_ACCEPT&&(a===Node.ELEMENT_NODE&&l.isParagraph(h)?b+="\n":a===Node.TEXT_NODE&&h.textContent&&(b+=h.textContent));return b}var g=this,l=new odf.OdfUtils;this.filter=null;this.writeToString=function(g){return g?k(g):""}};
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
odf.TextStyleApplicator=function(k,g,l){function h(a){function b(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(d){return b(a[d],c[d])}):a===c}this.isStyleApplied=function(d){d=g.getAppliedStylesForElement(d);return b(a,d)}}function b(b){var h={};this.applyStyleToContainer=function(e){var n;n=e.getAttributeNS(a,"style-name");var m=e.ownerDocument;n=n||"";if(!h.hasOwnProperty(n)){var q=n,s=n,w;s?(w=g.getStyleElement(s,"text"),w.parentNode===l?m=w.cloneNode(!0):(m=
m.createElementNS(f,"style:style"),m.setAttributeNS(f,"style:parent-style-name",s),m.setAttributeNS(f,"style:family","text"),m.setAttributeNS(d,"scope","document-content"))):(m=m.createElementNS(f,"style:style"),m.setAttributeNS(f,"style:family","text"),m.setAttributeNS(d,"scope","document-content"));g.updateStyle(m,b,k);l.appendChild(m);h[q]=m}n=h[n].getAttributeNS(f,"name");e.setAttributeNS(a,"text:style-name",n)}}var n=new core.DomUtils,a=odf.Namespaces.textns,f=odf.Namespaces.stylens,d="urn:webodf:names:scope";
this.applyStyle=function(c,d,e){var f={},g,l,k,w;runtime.assert(e&&e["style:text-properties"],"applyStyle without any text properties");f["style:text-properties"]=e["style:text-properties"];k=new b(f);w=new h(f);c.forEach(function(b){g=w.isStyleApplied(b);if(!1===g){var c=b.ownerDocument,e=b.parentNode,f,h=b,r=new core.LoopWatchDog(1E3);"span"===e.localName&&e.namespaceURI===a?(b.previousSibling&&!n.rangeContainsNode(d,b.previousSibling)?(c=e.cloneNode(!1),e.parentNode.insertBefore(c,e.nextSibling)):
c=e,f=!0):(c=c.createElementNS(a,"text:span"),e.insertBefore(c,b),f=!1);for(;h&&(h===b||n.rangeContainsNode(d,h));)r.check(),e=h.nextSibling,h.parentNode!==c&&c.appendChild(h),h=e;if(h&&f)for(b=c.cloneNode(!1),c.parentNode.insertBefore(b,c.nextSibling);h;)r.check(),e=h.nextSibling,b.appendChild(h),h=e;l=c;k.applyStyleToContainer(l)}})}};
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
odf.Style2CSS=function(){function k(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==q||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===w&&"list-style"===a.localName?"list":a.namespaceURI!==q||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(q,"family"))(c=a.getAttributeNS&&a.getAttributeNS(q,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function g(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=g(a[c].derivedStyles,b)))return d;return null}function l(a,b,c){var d=b[a],e,f;d&&(e=d.getAttributeNS(q,"parent-style-name"),f=null,e&&(f=g(c,e),!f&&b[e]&&(l(e,b,c),f=b[e],b[e]=null)),f?(f.derivedStyles||(f.derivedStyles={}),f.derivedStyles[a]=d):c[a]=d)}function h(a,b){for(var c in a)a.hasOwnProperty(c)&&(l(c,a,b),a[c]=null)}function b(a,b){var c=v[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+p[a].join(d+","+c+"|")+d}function n(a,c,d){var e=[],f,g;e.push(b(a,c));for(f in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(f))for(g in c=n(a,f,d.derivedStyles[f]),c)c.hasOwnProperty(g)&&e.push(c[g]);return e}function a(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function f(a,b){var c="",d,e;for(d in b)b.hasOwnProperty(d)&&
(d=b[d],e=a.getAttributeNS(d[0],d[1]),d[2]&&e&&(c+=d[2]+":"+e+";"));return c}function d(b){return(b=a(b,q,"text-properties"))?T.parseFoFontSize(b.getAttributeNS(m,"font-size")):null}function c(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function t(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var e=c.getAttributeNS(w,"level"),
f;c=T.getFirstNonWhitespaceChild(c);c=T.getFirstNonWhitespaceChild(c);var g;c&&(f=c.attributes,g=f["fo:text-indent"]?f["fo:text-indent"].value:void 0,f=f["fo:margin-left"]?f["fo:margin-left"].value:void 0);g||(g="-0.6cm");c="-"===g.charAt(0)?g.substring(1):"-"+g;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";void 0!==f&&(f=e+"{margin-left:"+f+";}",a.insertRule(f,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+
d+";";d+="counter-increment:list;";d+="margin-left:"+g+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(h){throw h;}}function e(b,g,h,l){if("list"===g)for(var k=l.firstChild,p,s;k;){if(k.namespaceURI===w)if(p=k,"list-level-style-number"===k.localName){var v=p;s=v.getAttributeNS(q,"num-format");var E=v.getAttributeNS(q,"num-suffix"),G={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},v=v.getAttributeNS(q,"num-prefix")||"",v=G.hasOwnProperty(s)?
v+(" counter(list, "+G[s]+")"):s?v+("'"+s+"';"):v+" ''";E&&(v+=" '"+E+"'");s="content: "+v+";";t(b,h,p,s)}else"list-level-style-image"===k.localName?(s="content: none;",t(b,h,p,s)):"list-level-style-bullet"===k.localName&&(s="content: '"+p.getAttributeNS(w,"bullet-char")+"';",t(b,h,p,s));k=k.nextSibling}else if("page"===g)if(E=p=h="",k=l.getElementsByTagNameNS(q,"page-layout-properties")[0],p=k.parentNode.parentNode.parentNode.masterStyles,E="",h+=f(k,J),s=k.getElementsByTagNameNS(q,"background-image"),
0<s.length&&(E=s.item(0).getAttributeNS(u,"href"))&&(h+="background-image: url('odfkit:"+E+"');",s=s.item(0),h+=f(s,D)),"presentation"===ka){if(p)for(s=p.getElementsByTagNameNS(q,"master-page"),G=0;G<s.length;G+=1)if(s[G].getAttributeNS(q,"page-layout-name")===k.parentNode.getAttributeNS(q,"name")){E=s[G].getAttributeNS(q,"name");p="draw|page[draw|master-page-name="+E+"] {"+h+"}";E="office|body, draw|page[draw|master-page-name="+E+"] {"+f(k,U)+" }";try{b.insertRule(p,b.cssRules.length),b.insertRule(E,
b.cssRules.length)}catch(ea){throw ea;}}}else{if("text"===ka){p="office|text {"+h+"}";E="office|body {width: "+k.getAttributeNS(m,"page-width")+";}";try{b.insertRule(p,b.cssRules.length),b.insertRule(E,b.cssRules.length)}catch(ha){throw ha;}}}else{h=n(g,h,l).join(",");k="";if(p=a(l,q,"text-properties")){var G=p,V;s=V="";E=1;p=""+f(G,y);v=G.getAttributeNS(q,"text-underline-style");"solid"===v&&(V+=" underline");v=G.getAttributeNS(q,"text-line-through-style");"solid"===v&&(V+=" line-through");V.length&&
(p+="text-decoration:"+V+";");if(V=G.getAttributeNS(q,"font-name")||G.getAttributeNS(m,"font-family"))v=da[V],p+="font-family: "+(v||V)+", sans-serif;";v=G.parentNode;if(G=d(v)){for(;v;){if(G=d(v)){if("%"!==G.unit){s="font-size: "+G.value*E+G.unit+";";break}E*=G.value/100}G=v;V=v="";v=null;"default-style"===G.localName?v=null:(v=G.getAttributeNS(q,"parent-style-name"),V=G.getAttributeNS(q,"family"),v=O.getODFElementsWithXPath(ca,v?"//style:*[@style:name='"+v+"'][@style:family='"+V+"']":"//style:default-style[@style:family='"+
V+"']",odf.Namespaces.resolvePrefix)[0])}s||(s="font-size: "+parseFloat(W)*E+ba.getUnits(W)+";");p+=s}k+=p}if(p=a(l,q,"paragraph-properties"))s=p,p=""+f(s,H),E=s.getElementsByTagNameNS(q,"background-image"),0<E.length&&(G=E.item(0).getAttributeNS(u,"href"))&&(p+="background-image: url('odfkit:"+G+"');",E=E.item(0),p+=f(E,D)),(s=s.getAttributeNS(m,"line-height"))&&"normal"!==s&&(s=T.parseFoLineHeight(s),p="%"!==s.unit?p+("line-height: "+s.value+s.unit+";"):p+("line-height: "+s.value/100+";")),k+=p;
if(p=a(l,q,"graphic-properties"))G=p,p=""+f(G,A),s=G.getAttributeNS(r,"opacity"),E=G.getAttributeNS(r,"fill"),G=G.getAttributeNS(r,"fill-color"),"solid"===E||"hatch"===E?G&&"none"!==G?(s=isNaN(parseFloat(s))?1:parseFloat(s)/100,(G=c(G))&&(p+="background-color: rgba("+G.r+","+G.g+","+G.b+","+s+");")):p+="background: none;":"none"===E&&(p+="background: none;"),k+=p;if(p=a(l,q,"drawing-page-properties"))s=""+f(p,A),"true"===p.getAttributeNS(z,"background-visible")&&(s+="background: none;"),k+=s;if(p=
a(l,q,"table-cell-properties"))p=""+f(p,N),k+=p;if(p=a(l,q,"table-row-properties"))p=""+f(p,P),k+=p;if(p=a(l,q,"table-column-properties"))p=""+f(p,C),k+=p;if(p=a(l,q,"table-properties"))p=""+f(p,B),k+=p;if(0!==k.length)try{b.insertRule(h+"{"+k+"}",b.cssRules.length)}catch(R){throw R;}}for(var Z in l.derivedStyles)l.derivedStyles.hasOwnProperty(Z)&&e(b,g,Z,l.derivedStyles[Z])}var r=odf.Namespaces.drawns,m=odf.Namespaces.fons,q=odf.Namespaces.stylens,s=odf.Namespaces.svgns,w=odf.Namespaces.textns,u=
odf.Namespaces.xlinkns,z=odf.Namespaces.presentationns,v={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},p={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),
presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background",
"table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},y=[[m,"color","color"],[m,"background-color","background-color"],[m,"font-weight","font-weight"],[m,"font-style","font-style"]],D=[[q,"repeat","background-repeat"]],H=[[m,"background-color","background-color"],[m,"text-align","text-align"],[m,"text-indent","text-indent"],[m,"padding","padding"],[m,"padding-left","padding-left"],[m,"padding-right","padding-right"],[m,"padding-top","padding-top"],[m,"padding-bottom","padding-bottom"],[m,"border-left","border-left"],[m,"border-right",
"border-right"],[m,"border-top","border-top"],[m,"border-bottom","border-bottom"],[m,"margin","margin"],[m,"margin-left","margin-left"],[m,"margin-right","margin-right"],[m,"margin-top","margin-top"],[m,"margin-bottom","margin-bottom"],[m,"border","border"]],A=[[m,"background-color","background-color"],[m,"min-height","min-height"],[r,"stroke","border"],[s,"stroke-color","border-color"],[s,"stroke-width","border-width"]],N=[[m,"background-color","background-color"],[m,"border-left","border-left"],
[m,"border-right","border-right"],[m,"border-top","border-top"],[m,"border-bottom","border-bottom"],[m,"border","border"]],C=[[q,"column-width","width"]],P=[[q,"row-height","height"],[m,"keep-together",null]],B=[[q,"width","width"],[m,"margin-left","margin-left"],[m,"margin-right","margin-right"],[m,"margin-top","margin-top"],[m,"margin-bottom","margin-bottom"]],J=[[m,"background-color","background-color"],[m,"padding","padding"],[m,"padding-left","padding-left"],[m,"padding-right","padding-right"],
[m,"padding-top","padding-top"],[m,"padding-bottom","padding-bottom"],[m,"border","border"],[m,"border-left","border-left"],[m,"border-right","border-right"],[m,"border-top","border-top"],[m,"border-bottom","border-bottom"],[m,"margin","margin"],[m,"margin-left","margin-left"],[m,"margin-right","margin-right"],[m,"margin-top","margin-top"],[m,"margin-bottom","margin-bottom"]],U=[[m,"page-width","width"],[m,"page-height","height"]],da={},T=new odf.OdfUtils,ka,ca,W,O=new xmldom.XPath,ba=new core.CSSUnits;
this.style2css=function(a,b,c,d,f){for(var g,m,n,l;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);g=null;d&&(g=d.ownerDocument,ca=d.parentNode);f&&(g=f.ownerDocument,ca=f.parentNode);if(g)for(l in odf.Namespaces.forEachPrefix(function(a,c){n="@namespace "+a+" url("+c+");";try{b.insertRule(n,b.cssRules.length)}catch(d){}}),da=c,ka=a,W=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=k(d),d=k(f),f={},v)if(v.hasOwnProperty(l))for(m in c=f[l]={},h(a[l],
c),h(d[l],c),c)c.hasOwnProperty(m)&&e(b,l,m,c[m])}};
// Input 33
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function k(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function g(a){var b,c=e.length;for(b=0;b<c;b+=1)if(a.namespaceURI===d&&a.localName===e[b])return b;return-1}function l(a,b){var c=new f.UsedStyleList(a,b),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var e=d.acceptNode(a);e===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&(e=c.uses(a)?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT);return e}}function h(a,b){var c=new l(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function b(a,b){if(b){var c=g(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=g(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}function n(a){this.OdfContainer=a}function a(a,
b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var f=new odf.StyleInfo,d="urn:oasis:names:tc:opendocument:xmlns:office:1.0",c="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
t="urn:webodf:names:scope",e="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),r=(new Date).getTime()+"_webodf_",m=new core.Base64;n.prototype=new function(){};n.prototype.constructor=n;n.namespaceURI=d;n.localName="document";a.prototype.load=function(){};a.prototype.getUrl=function(){return this.data?"data:;base64,"+m.toBase64(this.data):null};odf.OdfContainer=function s(e,g){function m(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?
m(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function v(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS(t,"scope",b),c=c.nextSibling}function p(a,b){var c=null,d,e,f;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(f=d.getAttributeNS(t,"scope"))&&f!==b&&c.removeChild(d),d=e;return c}function y(a){var b=M.rootElement.ownerDocument,c;if(a){m(a.documentElement);try{c=b.importNode(a.documentElement,
!0)}catch(d){}}return c}function D(a){M.state=a;if(M.onchange)M.onchange(M);if(M.onstatereadychange)M.onstatereadychange(M)}function H(a){Y=null;M.rootElement=a;a.fontFaceDecls=k(a,d,"font-face-decls");a.styles=k(a,d,"styles");a.automaticStyles=k(a,d,"automatic-styles");a.masterStyles=k(a,d,"master-styles");a.body=k(a,d,"body");a.meta=k(a,d,"meta")}function A(a){a=y(a);var c=M.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===d?(c.fontFaceDecls=k(a,d,"font-face-decls"),b(c,c.fontFaceDecls),
c.styles=k(a,d,"styles"),b(c,c.styles),c.automaticStyles=k(a,d,"automatic-styles"),v(c.automaticStyles,"document-styles"),b(c,c.automaticStyles),c.masterStyles=k(a,d,"master-styles"),b(c,c.masterStyles),f.prefixStyleNames(c.automaticStyles,r,c.masterStyles)):D(s.INVALID)}function N(a){a=y(a);var c,e,f;if(a&&"document-content"===a.localName&&a.namespaceURI===d){c=M.rootElement;e=k(a,d,"font-face-decls");if(c.fontFaceDecls&&e)for(f=e.firstChild;f;)c.fontFaceDecls.appendChild(f),f=e.firstChild;else e&&
(c.fontFaceDecls=e,b(c,e));e=k(a,d,"automatic-styles");v(e,"document-content");if(c.automaticStyles&&e)for(f=e.firstChild;f;)c.automaticStyles.appendChild(f),f=e.firstChild;else e&&(c.automaticStyles=e,b(c,e));c.body=k(a,d,"body");b(c,c.body)}else D(s.INVALID)}function C(a){a=y(a);var c;a&&("document-meta"===a.localName&&a.namespaceURI===d)&&(c=M.rootElement,c.meta=k(a,d,"meta"),b(c,c.meta))}function P(a){a=y(a);var c;a&&("document-settings"===a.localName&&a.namespaceURI===d)&&(c=M.rootElement,c.settings=
k(a,d,"settings"),b(c,c.settings))}function B(a){a=y(a);var b;if(a&&"manifest"===a.localName&&a.namespaceURI===c)for(b=M.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===c)&&(K[a.getAttributeNS(c,"full-path")]=a.getAttributeNS(c,"media-type")),a=a.nextSibling}function J(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],L.loadAsDOM(c,function(b,c){d(c);b||M.state===s.INVALID||J(a)})):D(s.DONE)}function U(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function da(){var a=new xmldom.LSSerializer,b=U("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(M.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function T(a,b){var d=document.createElementNS(c,"manifest:file-entry");d.setAttributeNS(c,"manifest:full-path",a);d.setAttributeNS(c,"manifest:media-type",b);return d}function ka(){var a=
runtime.parseXML('<manifest:manifest xmlns:manifest="'+c+'"></manifest:manifest>'),b=k(a,c,"manifest"),d=new xmldom.LSSerializer,e;for(e in K)K.hasOwnProperty(e)&&b.appendChild(T(e,K[e]));d.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+d.writeToString(a,odf.Namespaces.namespaceMap)}function ca(){var a=new xmldom.LSSerializer,b=U("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(M.rootElement.settings,odf.Namespaces.namespaceMap);
return b+"</office:document-settings>"}function W(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=p(M.rootElement.automaticStyles,"document-styles"),d=M.rootElement.masterStyles&&M.rootElement.masterStyles.cloneNode(!0),e=U("document-styles");f.removePrefixFromStyleNames(c,r,d);b.filter=new l(d,c);e+=b.writeToString(M.rootElement.fontFaceDecls,a);e+=b.writeToString(M.rootElement.styles,a);e+=b.writeToString(c,a);e+=b.writeToString(d,a);return e+"</office:document-styles>"}function O(){var a=
odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=p(M.rootElement.automaticStyles,"document-content"),d=U("document-content");b.filter=new h(M.rootElement.body,c);d+=b.writeToString(c,a);d+=b.writeToString(M.rootElement.body,a);return d+"</office:document-content>"}function ba(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var e=y(c);e&&"document"===e.localName&&e.namespaceURI===d?(H(e),D(s.DONE)):D(s.INVALID)}})}function S(){function a(b,c){var f;c||(c=b);f=document.createElementNS(d,
c);e[b]=f;e.appendChild(f)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),e=M.rootElement,f=document.createElementNS(d,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");e.body.appendChild(f);D(s.DONE);return b}function Q(){var a,b=new Date;a=runtime.byteArrayFromString(ca(),"utf8");
L.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(da(),"utf8");L.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(W(),"utf8");L.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(O(),"utf8");L.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(ka(),"utf8");L.save("META-INF/manifest.xml",a,!0,b)}function F(a,b){Q();L.writeAs(a,function(a){b(a)})}var M=this,L,K={},Y;this.onstatereadychange=g;this.rootElement=this.state=this.onchange=null;this.setRootElement=H;this.getContentElement=
function(){var a;Y||(a=M.rootElement.body,Y=a.getElementsByTagNameNS(d,"text")[0]||a.getElementsByTagNameNS(d,"presentation")[0]||a.getElementsByTagNameNS(d,"spreadsheet")[0]);return Y};this.getDocumentType=function(){var a=M.getContentElement();return a&&a.localName};this.getPart=function(b){return new a(b,K[b],M,L)};this.getPartData=function(a,b){L.load(a,b)};this.createByteArray=function(a,b){Q();L.createByteArray(a,b)};this.saveAs=F;this.save=function(a){F(e,a)};this.getUrl=function(){return e};
this.state=s.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(n);L=e?new core.Zip(e,function(a,b){L=b;a?ba(e,function(b){a&&(L.error=a+"\n"+b,D(s.INVALID))}):J([["styles.xml",A],["content.xml",N],["meta.xml",C],["settings.xml",P],["META-INF/manifest.xml",B]])}):S()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=
4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,null)};return odf.OdfContainer}();
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
odf.FontLoader=function(){function k(g,b,n,a,f){var d,c=0,t;for(t in g)if(g.hasOwnProperty(t)){if(c===n){d=t;break}c+=1}d?b.getPartData(g[d].href,function(c,r){if(c)runtime.log(c);else{var m="@font-face { font-family: '"+(g[d].family||d)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+l.convertUTF8ArrayToBase64(r)+') format("truetype"); }';try{a.insertRule(m,a.cssRules.length)}catch(q){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(q)+"\nRule: "+m)}}k(g,b,n+1,a,f)}):
f&&f()}var g=new xmldom.XPath,l=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(h,b){for(var n=h.rootElement.fontFaceDecls;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);if(n){var a={},f,d,c,l;if(n)for(n=g.getODFElementsWithXPath(n,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),f=0;f<n.length;f+=1)d=n[f],c=d.getAttributeNS(odf.Namespaces.stylens,"name"),l=d.getAttributeNS(odf.Namespaces.svgns,"font-family"),d=g.getODFElementsWithXPath(d,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<d.length&&(d=d[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),a[c]={href:d,family:l});k(a,h,0,b)}}};return odf.FontLoader}();
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
runtime.loadClass("core.Utils");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.TextStyleApplicator");
odf.Formatting=function(){function k(a,b){Object.keys(b).forEach(function(c){try{a[c]=b[c].constructor===Object?k(a[c],b[c]):b[c]}catch(d){a[c]=b[c]}});return a}function g(a,b,d){var e,f;d=d||[c.rootElement.automaticStyles,c.rootElement.styles];for(e=d.shift();e;){for(e=e.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&(f=e.getAttributeNS(r,"name"),e.namespaceURI===r&&"style"===e.localName&&e.getAttributeNS(r,"family")===b&&f===a||"list-style"===b&&e.namespaceURI===m&&"list-style"===e.localName&&
f===a||"data"===b&&e.namespaceURI===q&&f===a))return e;e=e.nextSibling}e=d.shift()}return null}function l(a){for(var b={},c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===r)for(b[c.nodeName]={},a=0;a<c.attributes.length;a+=1)b[c.nodeName][c.attributes[a].name]=c.attributes[a].value;c=c.nextSibling}return b}function h(a,b){Object.keys(b).forEach(function(c){var d=c.split(":"),e=d[1],f=odf.Namespaces.resolvePrefix(d[0]),d=b[c];"object"===typeof d&&Object.keys(d).length?(c=a.getElementsByTagNameNS(f,
e)[0]||a.ownerDocument.createElementNS(f,c),a.appendChild(c),h(c,d)):a.setAttributeNS(f,c,d)})}function b(a){var b=c.rootElement.styles,d;d={};for(var e={},f=a;f;)d=l(f),e=k(d,e),f=(d=f.getAttributeNS(r,"parent-style-name"))?g(d,a.getAttributeNS(r,"family"),[b]):null;a:{a=a.getAttributeNS(r,"family");for(b=c.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===r&&"default-style"===b.localName&&b.getAttributeNS(r,"family")===a){f=b;break a}b=b.nextSibling}f=null}f&&
(d=l(f),e=k(d,e));return e}function n(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],f="",g=!1;c;)!g&&s.isGroupingElement(c)&&(g=!0),(d=t.determineStylesForNode(c))&&e.push(d),c=c.parentNode;g&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){f+="|"+b+":"+a+"|"})})}),b&&(b[f]=e));return g?e:void 0}function a(a){var c={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(d){var e=Object.keys(a[d])[0],f,h;(f=g(e,d))?
(h=b(f),c=k(h,c),h=f.getAttributeNS(r,"display-name")):runtime.log("No style element found for '"+e+"' of family '"+d+"'");c.orderedStyles.push({name:e,family:d,displayName:h})})});return c}function f(){var a,b=[];[c.rootElement.automaticStyles,c.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===r&&"style"===a.localName||a.namespaceURI===m&&"list-style"===a.localName)&&b.push(a.getAttributeNS(r,"name")),a=a.nextSibling});return b}var d=
this,c,t=new odf.StyleInfo,e=odf.Namespaces.svgns,r=odf.Namespaces.stylens,m=odf.Namespaces.textns,q=odf.Namespaces.numberns,s=new odf.OdfUtils,w=new core.Utils;this.setOdfContainer=function(a){c=a};this.getFontMap=function(){for(var a=c.rootElement.fontFaceDecls,b={},d,f,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(d=a.getAttributeNS(r,"name"))&&((f=a.getAttributeNS(e,"font-family"))||a.getElementsByTagNameNS(e,"font-face-uri")[0])&&(b[d]=f),a=a.nextSibling;return b};this.getAvailableParagraphStyles=
function(){for(var a=c.rootElement.styles&&c.rootElement.styles.firstChild,b,d,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===r)&&(d=a,b=d.getAttributeNS(r,"family"),"paragraph"===b&&(b=d.getAttributeNS(r,"name"),d=d.getAttributeNS(r,"display-name")||b,b&&d&&e.push({name:b,displayName:d}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var b;b=t.hasDerivedStyles(c.rootElement,odf.Namespaces.resolvePrefix,a);a=(new t.UsedStyleList(c.rootElement.styles)).uses(a)||
(new t.UsedStyleList(c.rootElement.automaticStyles)).uses(a)||(new t.UsedStyleList(c.rootElement.body)).uses(a);return b||a};this.getStyleElement=g;this.getStyleAttributes=l;this.getInheritedStyleAttributes=b;this.getFirstNamedParentStyleNameOrSelf=function(a){var b=c.rootElement.automaticStyles,d=c.rootElement.styles,e;for(e=g(a,"paragraph",[b]);e;)a=e.getAttributeNS(r,"parent-style-name"),e=g(a,"paragraph",[b]);return(e=g(a,"paragraph",[d]))?a:null};this.hasParagraphStyle=function(a){return Boolean(g(a,
"paragraph"))};this.getAppliedStyles=function(b){var c={},d=[];b.forEach(function(a){n(a,c)});Object.keys(c).forEach(function(b){d.push(a(c[b]))});return d};this.getAppliedStylesForElement=function(b){return(b=n(b))?a(b):void 0};this.applyStyle=function(a,b,e,f){(new odf.TextStyleApplicator("auto"+w.hashString(a)+"_",d,c.rootElement.automaticStyles)).applyStyle(b,e,f)};this.updateStyle=function(a,b,c){var d,e;h(a,b);if(c){a.getAttributeNS(r,"name");d=f();e=0;do b=c+e,e+=1;while(-1!==d.indexOf(b));
a.setAttributeNS(r,"style:name",b)}}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.Formatting");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.FontLoader");runtime.loadClass("odf.Style2CSS");runtime.loadClass("odf.OdfUtils");runtime.loadClass("gui.AnnotationViewManager");
odf.OdfCanvas=function(){function k(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(e)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function g(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a}function l(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function h(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}
function c(){var f=[],g=runtime.getWindow().getSelection(),h,m;for(h=0;h<g.rangeCount;h+=1)m=g.getRangeAt(h),null!==m&&(b(a,m.startContainer)&&b(a,m.endContainer))&&f.push(m);if(f.length===d.length){for(g=0;g<f.length&&(h=f[g],m=d[g],h=h===m?!1:null===h||null===m?!0:h.startContainer!==m.startContainer||h.startOffset!==m.startOffset||h.endContainer!==m.endContainer||h.endOffset!==m.endOffset,!h);g+=1);if(g===f.length)return}d=f;var g=[f.length],n,l=a.ownerDocument;for(h=0;h<f.length;h+=1)m=f[h],n=
l.createRange(),n.setStart(m.startContainer,m.startOffset),n.setEnd(m.endContainer,m.endOffset),g[h]=n;d=g;g=e.length;for(f=0;f<g;f+=1)e[f](a,d)}var d=[],e=[];this.addListener=function(a,b){var c,d=e.length;for(c=0;c<d;c+=1)if(e[c]===b)return;e.push(b)};l(a,"mouseup",c);l(a,"keyup",c);l(a,"keydown",c)}function b(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function n(a,b,c,d){c.setAttribute("styleid",b);var e,f=
c.getAttributeNS(y,"anchor-type"),g=c.getAttributeNS(v,"x"),h=c.getAttributeNS(v,"y"),m=c.getAttributeNS(v,"width"),l=c.getAttributeNS(v,"height"),k=c.getAttributeNS(w,"min-height"),p=c.getAttributeNS(w,"min-width"),q=c.getAttributeNS(s,"master-page-name"),r=null,t,u;t=0;var D,H=a.rootElement.ownerDocument;if(q){r=a.rootElement.masterStyles.getElementsByTagNameNS(z,"master-page");t=null;for(u=0;u<r.length;u+=1)if(r[u].getAttributeNS(z,"name")===q){t=r[u];break}r=t}else r=null;if(r){q=H.createElementNS(s,
"draw:page");D=r.firstElementChild;for(t=0;D;)"true"!==D.getAttributeNS(A,"placeholder")&&(u=D.cloneNode(!0),q.appendChild(u),n(a,b+"_"+t,u,d)),D=D.nextElementSibling,t+=1;J.appendChild(q);t=J.getElementsByTagNameNS(s,"page").length;if(u=q.getElementsByTagNameNS(y,"page-number")[0]){for(;u.firstChild;)u.removeChild(u.firstChild);u.appendChild(H.createTextNode(t))}n(a,b,q,d);q.setAttributeNS(s,"draw:master-page-name",r.getAttributeNS(z,"name"))}if("as-char"===f)e="display: inline-block;";else if(f||
g||h)e="position: absolute;";else if(m||l||k||p)e="display: block;";g&&(e+="left: "+g+";");h&&(e+="top: "+h+";");m&&(e+="width: "+m+";");l&&(e+="height: "+l+";");k&&(e+="min-height: "+k+";");p&&(e+="min-width: "+p+";");e&&(e="draw|"+c.localName+'[styleid="'+b+'"] {'+e+"}",d.insertRule(e,d.cssRules.length))}function a(a){for(a=a.firstChild;a;){if(a.namespaceURI===u&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function f(b,
c,d,e){function f(a){a&&(a='draw|image[styleid="'+b+'"] {'+("background-image: url("+a+");")+"}",e.insertRule(a,e.cssRules.length))}d.setAttribute("styleid",b);var g=d.getAttributeNS(D,"href"),h;if(g)if(/^(?:http|https|ftp):\/\//.test(g))f(g);else try{h=c.getPart(g),h.onchange=function(a){f(a.url)},h.load()}catch(m){runtime.log("slight problem: "+m)}else g=a(d),f(g)}function d(a){function b(a){return d===a.getAttributeNS(u,"name")}var c=B.getElementsByTagNameNS(a,u,"annotation");a=B.getElementsByTagNameNS(a,
u,"annotation-end");var d,e;for(e=0;e<c.length;e+=1)d=c[e].getAttributeNS(u,"name"),T.addAnnotation({node:c[e],end:a.filter(b)[0]||null});T.rerenderAnnotations()}function c(a){function b(c){var d,e;c.hasAttributeNS(D,"href")&&(d=c.getAttributeNS(D,"href"),"#"===d[0]?(d=d.substring(1),e=function(){var b=C.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=C.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));
0<b.length&&b[0].scrollIntoView(!0);return!1}):e=function(){N.open(d)},c.onclick=e)}var c,d,e;d=a.getElementsByTagNameNS(y,"a");for(c=0;c<d.length;c+=1)e=d.item(c),b(e)}function t(a){var b=a.ownerDocument;B.getElementsByTagNameNS(a,y,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(y,"c"),10);if(1<d)for(a.removeAttributeNS(y,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function e(a){B.getElementsByTagNameNS(a,
y,"tab").forEach(function(a){a.textContent="\t"})}function r(b,c){function d(a,b){var g=h.documentElement.namespaceURI;"video/"===b.substr(0,6)?(e=h.createElementNS(g,"video"),e.setAttribute("controls","controls"),f=h.createElementNS(g,"source"),f.setAttribute("src",a),f.setAttribute("type",b),e.appendChild(f),c.parentNode.appendChild(e)):c.innerHtml="Unrecognised Plugin"}var e,f,g,h=c.ownerDocument,m;if(g=c.getAttributeNS(D,"href"))try{m=b.getPart(g),m.onchange=function(a){d(a.url,a.mimetype)},m.load()}catch(n){runtime.log("slight problem: "+
n)}else runtime.log("using MP4 data fallback"),g=a(c),d(g,"video/mp4")}function m(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));
c.setAttribute("type","text/css");b.appendChild(c);return c}function q(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var s=odf.Namespaces.drawns,w=odf.Namespaces.fons,u=odf.Namespaces.officens,z=odf.Namespaces.stylens,
v=odf.Namespaces.svgns,p=odf.Namespaces.tablens,y=odf.Namespaces.textns,D=odf.Namespaces.xlinkns,H=odf.Namespaces.xmlns,A=odf.Namespaces.presentationns,N=runtime.getWindow(),C=new xmldom.XPath,P=new odf.OdfUtils,B=new core.DomUtils,J,U,da=!1,T;odf.OdfCanvas=function(a){function u(a,b,c){function d(a,b,c,e){na.addToQueue(function(){f(a,b,c,e)})}var e,g;e=b.getElementsByTagNameNS(s,"image");for(b=0;b<e.length;b+=1)g=e.item(b),d("image"+String(b),a,g,c)}function w(a,b){function c(a,b){na.addToQueue(function(){r(a,
b)})}var d,e,f;e=b.getElementsByTagNameNS(s,"plugin");for(d=0;d<e.length;d+=1)f=e.item(d),c(a,f)}function v(){var b=a.firstChild;b.firstChild&&(1<R?(b.style.MozTransformOrigin="center top",b.style.WebkitTransformOrigin="center top",b.style.OTransformOrigin="center top",b.style.msTransformOrigin="center top"):(b.style.MozTransformOrigin="left top",b.style.WebkitTransformOrigin="left top",b.style.OTransformOrigin="left top",b.style.msTransformOrigin="left top"),b.style.WebkitTransform="scale("+R+")",
b.style.MozTransform="scale("+R+")",b.style.OTransform="scale("+R+")",b.style.msTransform="scale("+R+")",a.style.width=Math.round(R*b.offsetWidth)+"px",a.style.height=Math.round(R*b.offsetHeight)+"px")}function D(a){var b=L.getElementById("sizer");da?(U.parentNode||(b.appendChild(U),b.style.paddingRight=N.getComputedStyle(U).width,v()),T&&T.forgetAnnotations(),T=new gui.AnnotationViewManager(a.body,U),d(a.body)):U.parentNode&&(b.removeChild(U),b.style.paddingRight=0,T.forgetAnnotations(),v())}function A(d){function f(){for(var g=
a;g.firstChild;)g.removeChild(g.firstChild);a.style.display="inline-block";g=K.rootElement;a.ownerDocument.importNode(g,!0);Y.setOdfContainer(K);var h=K,m=G;(new odf.FontLoader).loadFonts(h,m.sheet);b(K,Y,ea);for(var l=K,h=ha.sheet,m=a;m.firstChild;)m.removeChild(m.firstChild);m=L.createElementNS(a.namespaceURI,"div");m.style.display="inline-block";m.style.background="white";m.id="sizer";m.appendChild(g);a.appendChild(m);U=L.createElementNS(a.namespaceURI,"div");U.id="annotationsPane";J=L.createElementNS(a.namespaceURI,
"div");J.id="shadowContent";J.style.position="absolute";J.style.top=0;J.style.left=0;l.getContentElement().appendChild(J);var k=g.body,q,r,A;r=[];for(q=k.firstChild;q&&q!==k;)if(q.namespaceURI===s&&(r[r.length]=q),q.firstChild)q=q.firstChild;else{for(;q&&q!==k&&!q.nextSibling;)q=q.parentNode;q&&q.nextSibling&&(q=q.nextSibling)}for(A=0;A<r.length;A+=1)q=r[A],n(l,"frame"+String(A),q,h);r=C.getODFElementsWithXPath(k,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(q=0;q<r.length;q+=
1)k=r[q],k.setAttributeNS&&k.setAttributeNS("urn:webodf","containsparagraphanchor",!0);q=g.body.getElementsByTagNameNS(p,"table-cell");for(k=0;k<q.length;k+=1)r=q.item(k),r.hasAttributeNS(p,"number-columns-spanned")&&r.setAttribute("colspan",r.getAttributeNS(p,"number-columns-spanned")),r.hasAttributeNS(p,"number-rows-spanned")&&r.setAttribute("rowspan",r.getAttributeNS(p,"number-rows-spanned"));c(g.body);t(g.body);e(g.body);u(l,g.body,h);w(l,g.body);r=g.body;var x,fa,ja,aa,k={};q={};var B;A=N.document.getElementsByTagNameNS(y,
"list-style");for(l=0;l<A.length;l+=1)x=A.item(l),(ja=x.getAttributeNS(z,"name"))&&(q[ja]=x);r=r.getElementsByTagNameNS(y,"list");for(l=0;l<r.length;l+=1)if(x=r.item(l),A=x.getAttributeNS(H,"id")){fa=x.getAttributeNS(y,"continue-list");x.setAttribute("id",A);aa="text|list#"+A+" > text|list-item > *:first-child:before {";if(ja=x.getAttributeNS(y,"style-name")){x=q[ja];B=P.getFirstNonWhitespaceChild(x);x=void 0;if("list-level-style-number"===B.localName){x=B.getAttributeNS(z,"num-format");ja=B.getAttributeNS(z,
"num-suffix");var F="",F={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},E=void 0,E=B.getAttributeNS(z,"num-prefix")||"",E=F.hasOwnProperty(x)?E+(" counter(list, "+F[x]+")"):x?E+("'"+x+"';"):E+" ''";ja&&(E+=" '"+ja+"'");x=F="content: "+E+";"}else"list-level-style-image"===B.localName?x="content: none;":"list-level-style-bullet"===B.localName&&(x="content: '"+B.getAttributeNS(y,"bullet-char")+"';");B=x}if(fa){for(x=k[fa];x;)fa=x,x=k[fa];aa+="counter-increment:"+fa+";";
B?(B=B.replace("list",fa),aa+=B):aa+="content:counter("+fa+");"}else fa="",B?(B=B.replace("list",A),aa+=B):aa+="content: counter("+A+");",aa+="counter-increment:"+A+";",h.insertRule("text|list#"+A+" {counter-reset:"+A+"}",h.cssRules.length);aa+="}";k[A]=fa;aa&&h.insertRule(aa,h.cssRules.length)}m.insertBefore(J,m.firstChild);v();D(g);if(!d&&(g=[K],Z.hasOwnProperty("statereadychange")))for(h=Z.statereadychange,m=0;m<h.length;m+=1)h[m].apply(null,g)}K.state===odf.OdfContainer.DONE?f():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),
runtime.setTimeout(function ma(){K.state===odf.OdfContainer.DONE?f():(runtime.log("will be back later..."),runtime.setTimeout(ma,500))},100))}function B(b){na.clearQueue();a.innerHTML="loading "+b;a.removeAttribute("style");K=new odf.OdfContainer(b,function(a){K=a;A(!1)})}function F(){if(X){for(var a=X.ownerDocument.createDocumentFragment();X.firstChild;)a.insertBefore(X.firstChild,null);X.parentNode.replaceChild(a,X)}}function M(a){a=a||N.event;for(var b=a.target,c=N.getSelection(),d=0<c.rangeCount?
c.getRangeAt(0):null,e=d&&d.startContainer,f=d&&d.startOffset,g=d&&d.endContainer,h=d&&d.endOffset,m,n;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==y);)b=b.parentNode;V&&(b&&b.parentNode!==X)&&(m=b.ownerDocument,n=m.documentElement.namespaceURI,X?X.parentNode&&F():(X=m.createElementNS(n,"p"),X.style.margin="0px",X.style.padding="0px",X.style.border="0px",X.setAttribute("contenteditable",!0)),b.parentNode.replaceChild(X,b),X.appendChild(b),X.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),
d.setStart(e,f),d.setEnd(g,h),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==a&&void 0!==a,"odf.OdfCanvas constructor needs DOM element");var L=a.ownerDocument,K,Y=new odf.Formatting,la=new h(a),E,G,ea,ha,V=!1,R=1,Z={},X,na=new k;m(L);E=new g(q(L));G=q(L);ea=q(L);ha=q(L);this.refreshCSS=function(){b(K,Y,ea);v()};this.refreshSize=function(){v()};this.odfContainer=function(){return K};this.slidevisibilitycss=function(){return E.css};
this.setOdfContainer=function(a,b){K=a;A(!0===b)};this.load=this.load=B;this.save=function(a){F();K.save(a)};this.setEditable=function(b){l(a,"click",M);(V=b)||F()};this.addListener=function(b,c){switch(b){case "selectionchange":la.addListener(b,c);break;case "click":l(a,b,c);break;default:var d=Z[b];void 0===d&&(d=Z[b]=[]);c&&-1===d.indexOf(c)&&d.push(c)}};this.getFormatting=function(){return Y};this.getAnnotationManager=function(){return T};this.refreshAnnotations=function(){D(K.rootElement)};this.rerenderAnnotations=
function(){T&&T.rerenderAnnotations()};this.enableAnnotations=function(a){a!==da&&(da=a,D(K.rootElement))};this.addAnnotation=function(a){T&&T.addAnnotation(a)};this.setZoomLevel=function(a){R=a;v()};this.getZoomLevel=function(){return R};this.fitToContainingElement=function(b,c){var d=a.offsetHeight/R;R=b/(a.offsetWidth/R);c/d<R&&(R=c/d);v()};this.fitToWidth=function(b){R=b/(a.offsetWidth/R);v()};this.fitSmart=function(b,c){var d,e;d=a.offsetWidth/R;e=a.offsetHeight/R;d=b/d;void 0!==c&&c/e<d&&(d=
c/e);R=Math.min(1,d);v()};this.fitToHeight=function(b){R=b/(a.offsetHeight/R);v()};this.showFirstPage=function(){E.showFirstPage()};this.showNextPage=function(){E.showNextPage()};this.showPreviousPage=function(){E.showPreviousPage()};this.showPage=function(a){E.showPage(a);v()};this.getElement=function(){return a}};return odf.OdfCanvas}();
// Input 37
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(k,g,l){return new odf.OdfContainer(k,function(h){if(h.state===odf.OdfContainer.INVALID)return l("Document "+k+" is invalid.");h.state===odf.OdfContainer.DONE?h.saveAs(g,function(b){l(b)}):l("Document was not completely loaded.")})};this.render=function(k,g,l){for(g=g.getElementsByTagName("body")[0];g.firstChild;)g.removeChild(g.firstChild);g=new odf.OdfCanvas(g);g.addListener("statereadychange",function(g){l(g)});g.load(k)}};
// Input 38
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
ops.Server=function(){};ops.Server.prototype.connect=function(k,g){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(k,g,l,h){};ops.Server.prototype.getGenesisUrl=function(k){};
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
ops.NowjsServer=function(){var k=this,g;this.getNowObject=function(){return g};this.getGenesisUrl=function(g){return"/session/"+g+"/genesis"};this.connect=function(l,h){function b(){"unavailable"===g.networkStatus?(runtime.log("connection to server unavailable."),h("unavailable")):"ready"!==g.networkStatus?n>l?(runtime.log("connection to server timed out."),h("timeout")):(n+=100,runtime.getWindow().setTimeout(b,100)):(runtime.log("connection to collaboration server established."),h("ready"))}var n=
0;g||(g=runtime.getVariable("now"),void 0===g&&(g={networkStatus:"unavailable"}),b())};this.networkStatus=function(){return g?g.networkStatus:"unavailable"};this.login=function(l,h,b,n){g?g.login(l,h,b,n):n("Not connected to server")};this.createOperationRouter=function(g,h){return new ops.NowjsOperationRouter(g,h,k)};this.createUserModel=function(){return new ops.NowjsUserModel(k)}};
// Input 40
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
runtime.loadClass("core.Base64");runtime.loadClass("core.ByteArrayWriter");
ops.PullBoxServer=function(k){function g(b,a){var f=new XMLHttpRequest,d=new core.ByteArrayWriter("utf8");"object"===typeof b&&(b=JSON.stringify(b));runtime.log("Sending message to server: "+b);d.appendString(b);d=d.getByteArray();f.open("POST",k.url,!0);f.onreadystatechange=function(){4===f.readyState&&((200>f.status||300<=f.status)&&0===f.status&&runtime.log("Status "+String(f.status)+": "+f.responseText||f.statusText),a(f.responseText))};d=d.buffer&&!f.sendAsBinary?d.buffer:runtime.byteArrayToString(d,
"binary");try{f.sendAsBinary?f.sendAsBinary(d):f.send(d)}catch(c){runtime.log("Problem with calling server: "+c+" "+d),a(c.message)}}var l=this,h,b=new core.Base64;k=k||{};k.url=k.url||"/WSER";this.getGenesisUrl=function(b){return"/session/"+b+"/genesis"};this.call=g;this.getBase64=function(){return b};this.getToken=function(){return h};this.setToken=function(b){h=b};this.connect=function(b,a){a("ready")};this.networkStatus=function(){return"ready"};this.login=function(n,a,f,d){g("login:"+b.toBase64(n)+
":"+b.toBase64(a),function(a){var b=runtime.fromJson(a);runtime.log("Login reply: "+a);b.hasOwnProperty("token")?(h=b.token,runtime.log("Caching token: "+l.getToken()),f(b)):d(a)})}};
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
ops.Operation=function(){};ops.Operation.prototype.init=function(k){};ops.Operation.prototype.transform=function(k,g){};ops.Operation.prototype.execute=function(k){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var k=this,g,l;this.init=function(h){g=h.memberid;l=h.timestamp};this.transform=function(g,b){return[k]};this.execute=function(h){var b=h.getCursor(g);if(b)return!1;b=new ops.OdtCursor(g,h);h.addCursor(b);h.emit(ops.OdtDocument.signalCursorAdded,b);return!0};this.spec=function(){return{optype:"AddCursor",memberid:g,timestamp:l}}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");
gui.StyleHelper=function(k){function g(b,g,a){var f=!0,d;b.collapsed?(d=b.startContainer,d.hasChildNodes()&&b.startOffset<d.childNodes.length&&(d=d.childNodes[b.startOffset]),b=[d]):b=h.getTextNodes(b,!0);b=k.getAppliedStyles(b);for(d=0;d<b.length&&!(f=b[d]["style:text-properties"],f=!f||f[g]!==a);d+=1);return!f}var l=new core.DomUtils,h=new odf.OdfUtils;this.getAppliedStyles=function(b){b=h.getTextNodes(b,!0);return k.getAppliedStyles(b)};this.applyStyle=function(b,g,a){var f=l.splitBoundaries(g),
d=h.getTextNodes(g,!1);k.applyStyle(b,d,{startContainer:g.startContainer,startOffset:g.startOffset,endContainer:g.endContainer,endOffset:g.endOffset},a);f.forEach(l.normalizeTextNodes)};this.isBold=function(b){return g(b,"fo:font-weight","bold")};this.isItalic=function(b){return g(b,"fo:font-style","italic")};this.hasUnderline=function(b){return g(b,"style:text-underline-style","solid")};this.hasStrikeThrough=function(b){return g(b,"style:text-line-through-style","solid")}};
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
runtime.loadClass("gui.StyleHelper");runtime.loadClass("odf.OdfUtils");
ops.OpApplyDirectStyling=function(){function k(a){var d=0<=b?h+b:h,c=a.getIteratorAtPosition(0<=b?h:h+b),d=b?a.getIteratorAtPosition(d):c;a=a.getDOM().createRange();a.setStart(c.container(),c.unfilteredDomOffset());a.setEnd(d.container(),d.unfilteredDomOffset());return a}var g,l,h,b,n,a=new odf.OdfUtils;this.init=function(a){g=a.memberid;l=a.timestamp;h=parseInt(a.position,10);b=parseInt(a.length,10);n=a.setProperties};this.transform=function(a,b){return null};this.execute=function(b){var d=k(b),
c=a.getImpactedParagraphs(d);(new gui.StyleHelper(b.getFormatting())).applyStyle(g,d,n);d.detach();b.getOdfCanvas().refreshCSS();c.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:g,timeStamp:l})});b.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:g,timestamp:l,position:h,length:b,setProperties:n}}};
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
ops.OpRemoveCursor=function(){var k=this,g,l;this.init=function(h){g=h.memberid;l=h.timestamp};this.transform=function(h,b){var n=h.spec();return"RemoveCursor"===n.optype&&n.memberid===g?[]:[k]};this.execute=function(h){return h.removeCursor(g)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:g,timestamp:l}}};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
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
ops.OpMoveCursor=function(){var k=this,g,l,h,b;this.init=function(n){g=n.memberid;l=n.timestamp;h=parseInt(n.position,10);b=void 0!==n.length?parseInt(n.length,10):0};this.merge=function(n){return"MoveCursor"===n.optype&&n.memberid===g?(h=n.position,b=n.length,l=n.timestamp,!0):!1};this.transform=function(n,a){var f=n.spec(),d=f.optype,c=h+b,l=[k];"RemoveText"===d?(d=f.position+f.length,d<=h?h-=f.length:f.position<c&&(h<f.position?b=d<c?b-f.length:f.position-h:(h=f.position,b=d<c?c-d:0))):"SplitParagraph"===
d?f.position<h?h+=1:f.position>h&&f.position<c&&(b+=1):"InsertText"===d?f.position<h?h+=f.text.length:f.position>h&&f.position<c&&(b+=f.text.length):"RemoveCursor"===d&&f.memberid===g?l=[]:"InsertTable"===d&&(l=null);return l};this.execute=function(n){var a=n.getCursor(g),f=n.getCursorPosition(g),d=n.getPositionFilter(),c=h-f;if(!a)return!1;f=a.getStepCounter();c=0<c?f.countForwardSteps(c,d):0>c?-f.countBackwardSteps(-c,d):0;a.move(c);b&&(d=0<b?f.countForwardSteps(b,d):0>b?-f.countBackwardSteps(-b,
d):0,a.move(d,!0));n.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:g,timestamp:l,position:h,length:b}}};
// Input 47
ops.OpInsertTable=function(){function k(a,c){var d;if(1===t.length)d=t[0];else if(3===t.length)switch(a){case 0:d=t[0];break;case b-1:d=t[2];break;default:d=t[1]}else d=t[a];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case n-1:return d[2];default:return d[1]}return d[c]}var g=this,l,h,b,n,a,f,d,c,t;this.init=function(e){l=e.memberid;h=e.timestamp;a=parseInt(e.position,10);b=parseInt(e.initialRows,10);n=parseInt(e.initialColumns,10);f=e.tableName;d=e.tableStyleName;c=e.tableColumnStyleName;
t=e.tableCellStyleMatrix};this.transform=function(b,c){var d=b.spec(),f=d.optype,h=[g];if("InsertTable"===f)h=null;else if("SplitParagraph"===f)if(d.position<a)a+=1;else{if(d.position===a&&!c)return a+=1,null}else if("InsertText"===f)if(d.position<a)a+=d.text.length;else{if(d.position===a&&!c)return a+=d.text.length,null}else"RemoveText"===f&&(d.position+d.length<=a?a-=d.length:d.position<a&&(a=d.position));return h};this.execute=function(e){var g=e.getPositionInTextNode(a),m=e.getRootNode();if(g){var q=
e.getDOM(),s=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),u,z,v,p;d&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);f&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",f);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",n);c&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:style-name",c);s.appendChild(t);for(v=0;v<b;v+=1){t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(p=0;p<n;p+=1)u=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(z=k(v,p))&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",z),z=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),u.appendChild(z),t.appendChild(u);s.appendChild(t)}g=e.getParagraphElement(g.textNode);
m.insertBefore(s,g?g.nextSibling:void 0);e.getOdfCanvas().refreshSize();e.emit(ops.OdtDocument.signalTableAdded,{tableElement:s,memberId:l,timeStamp:h});e.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:l,timestamp:h,position:a,initialRows:b,initialColumns:n,tableName:f,tableStyleName:d,tableColumnStyleName:c,tableCellStyleMatrix:t}}};
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
ops.OpInsertText=function(){function k(a,b){var d=b.parentNode,c=b.nextSibling,g=[];a.getCursors().forEach(function(a){var c=a.getSelectedRange();!c||c.startContainer!==b&&c.endContainer!==b||g.push({cursor:a,startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset})});d.removeChild(b);d.insertBefore(b,c);g.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var g=
this,l,h,b,n;this.init=function(a){l=a.memberid;h=a.timestamp;b=parseInt(a.position,10);n=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===l&&a.position===b+n.length?(n+=a.text,h=a.timestamp,!0):!1};this.transform=function(a,f){var d=a.spec(),c=d.optype,h=[g];if("InsertText"===c)if(d.position<b)b+=d.text.length;else{if(d.position===b&&!f)return b+=d.text.length,null}else if("SplitParagraph"===c)if(d.position<b)b+=1;else{if(d.position===b&&!f)return b+=1,null}else"InsertTable"===
c?h=null:"RemoveText"===c&&(d.position+d.length<=b?b-=d.length:d.position<b&&(b=d.position));return h};this.execute=function(a){var f,d,c,g,e=a.getRootNode().ownerDocument,r,m=!0,q=0,s;if(f=a.getPositionInTextNode(b,l)){d=f.textNode;c=d.parentNode;g=d.nextSibling;r=a.getParagraphElement(d);f.offset!==d.length&&(g=d.splitText(f.offset));for(f=0;f<n.length;f+=1)if(" "===n[f]||"\t"===n[f])q<f&&(q=n.substring(q,f),m?d.appendData(q):c.insertBefore(e.createTextNode(q),g)),q=f+1,m=!1,s=" "===n[f]?"text:s":
"text:tab",s=e.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",s),s.appendChild(e.createTextNode(n[f])),c.insertBefore(s,g);q=n.substring(q);0<q.length&&(m?d.appendData(q):c.insertBefore(e.createTextNode(q),g));k(a,d);0===d.length&&d.parentNode.removeChild(d);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:r,memberId:l,timeStamp:h});a.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",
memberid:l,timestamp:h,position:b,text:n}}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("core.DomUtils");
ops.OpRemoveText=function(){function k(a){function b(a){if(d.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function f(g){g=c.mergeIntoParent(g);return!d.isParagraph(g)&&g!==a&&b(g)?f(g):g}this.isEmpty=b;this.mergeChildrenIntoParent=f}function g(b){var d=b.getPositionFilter(),f,g,h,l,k=a,u=b.getDOM().createRange();b=b.getIteratorAtPosition(n);f=b.container();for(g=b.unfilteredDomOffset();k&&
b.nextPosition();)h=b.container(),l=b.unfilteredDomOffset(),d.acceptPosition(b)===NodeFilter.FILTER_ACCEPT&&(k-=1);u.setStart(f,g);u.setEnd(h,l);c.splitBoundaries(u);return u}var l=this,h,b,n,a,f,d,c;this.init=function(g){runtime.assert(0<=g.length,"OpRemoveText only supports positive lengths");h=g.memberid;b=g.timestamp;n=parseInt(g.position,10);a=parseInt(g.length,10);f=g.text;d=new odf.OdfUtils;c=new core.DomUtils};this.transform=function(b,c){var d=b.spec(),f=d.optype,g=n+a,h=[l];"RemoveText"===
f?(f=d.position+d.length,f<=n?n-=d.length:d.position<g&&(n<d.position?a=f<g?a-d.length:d.position-n:f<g?(n=d.position,a=g-f):h=[])):"InsertText"===f?d.position<=n&&(n+=d.text.length):"SplitParagraph"===f?d.position<=n&&(n+=1):"InsertTable"===f&&(h=null);return h};this.execute=function(c){var d,f,m,l,s=new k(c.getRootNode());c.upgradeWhitespacesAtPosition(n);c.upgradeWhitespacesAtPosition(n+a);f=g(c);d=c.getParagraphElement(f.startContainer);m=c.getTextElements(f,!0);l=c.getParagraphElements(f);f.detach();
m.forEach(function(a){s.mergeChildrenIntoParent(a)});f=l.reduce(function(a,b){var c,d,e=a,f=b,g,h;s.isEmpty(a)&&(d=!0,b.parentNode!==a.parentNode&&(g=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),f=a,e=b,h=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;f.hasChildNodes();)c=d?f.lastChild:f.firstChild,f.removeChild(c),"editinfo"!==c.localName&&e.insertBefore(c,h);g&&s.isEmpty(g)&&s.mergeChildrenIntoParent(g);s.mergeChildrenIntoParent(f);return e});
c.fixCursorPositions();c.getOdfCanvas().refreshSize();c.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f||d,memberId:h,timeStamp:b});c.emit(ops.OdtDocument.signalCursorMoved,c.getCursor(h));c.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:h,timestamp:b,position:n,length:a,text:f}}};
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
ops.OpSplitParagraph=function(){var k=this,g,l,h,b=new odf.OdfUtils;this.init=function(b){g=b.memberid;l=b.timestamp;h=parseInt(b.position,10)};this.transform=function(b,a){var f=b.spec(),d=f.optype,c=[k];if("SplitParagraph"===d)if(f.position<h)h+=1;else{if(f.position===h&&!a)return h+=1,null}else if("InsertText"===d)if(f.position<h)h+=f.text.length;else{if(f.position===h&&!a)return h+=f.text.length,null}else"InsertTable"===d?c=null:"RemoveText"===d&&(f.position+f.length<=h?h-=f.length:f.position<
h&&(h=f.position));return c};this.execute=function(n){var a,f,d,c,k,e;n.upgradeWhitespacesAtPosition(h);a=n.getPositionInTextNode(h,g);if(!a)return!1;f=n.getParagraphElement(a.textNode);if(!f)return!1;d=b.isListItem(f.parentNode)?f.parentNode:f;0===a.offset?(e=a.textNode.previousSibling,k=null):(e=a.textNode,k=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==d;)if(a=a.parentNode,c=a.cloneNode(!1),e){for(k&&c.appendChild(k);e.nextSibling;)c.appendChild(e.nextSibling);
a.parentNode.insertBefore(c,a.nextSibling);e=a;k=c}else a.parentNode.insertBefore(c,a),e=c,k=a;b.isListItem(k)&&(k=k.childNodes[0]);n.fixCursorPositions(g);n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f,memberId:g,timeStamp:l});n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:g,timeStamp:l});n.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:g,timestamp:l,position:h}}};
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
ops.OpSetParagraphStyle=function(){var k=this,g,l,h,b;this.init=function(n){g=n.memberid;l=n.timestamp;h=n.position;b=n.styleName};this.transform=function(g,a){var f=g.spec();"DeleteParagraphStyle"===f.optype&&f.styleName===b&&(b="");return[k]};this.execute=function(n){var a;if(a=n.getPositionInTextNode(h))if(a=n.getParagraphElement(a.textNode))return""!==b?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",b):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),n.getOdfCanvas().refreshSize(),n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:l,memberId:g}),n.getOdfCanvas().rerenderAnnotations(),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:g,timestamp:l,position:h,styleName:b}}};
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
ops.OpUpdateParagraphStyle=function(){function k(a,b){var d,f;for(d=0;d<b.length;d+=1)f=b[d].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(f[0]),f[1])}function g(a,b,d,f){var g,h,n;a&&(d||f)&&Object.keys(a).forEach(function(b){g=a[b];(d&&void 0!==d[b]||f&&-1!==f.indexOf(b))&&"object"!==typeof g&&delete a[b]});if(b&&(d||f))for(h=0;h<b.length;h+=1)if(n=b[h],d&&void 0!==d[n]||f&&-1!==f.indexOf(n))b.splice(h,1),h-=1}function l(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}var h=
this,b,n,a,f,d;this.init=function(c){b=c.memberid;n=c.timestamp;a=c.styleName;f=c.setProperties;d=c.removedProperties};this.transform=function(b,n){var e=b.spec(),k=e.optype;if("UpdateParagraphStyle"===k){if(!(e.styleName!==a||n||(g(f?f["style:paragraph-properties"]:null,d?d.paragraphPropertyNames:null,e.setProperties?e.setProperties["style:paragraph-properties"]:null,e.removedProperties?e.removedProperties.paragraphPropertyNames:null),g(f?f["style:text-properties"]:null,d?d.textPropertyNames:null,
e.setProperties?e.setProperties["style:text-properties"]:null,e.removedProperties?e.removedProperties.textPropertyNames:null),f&&(l(f["style:text-properties"])||l(f["style:paragraph-properties"]))||d&&(0<d.textPropertyNames.length||0<d.paragraphPropertyNames.length))))return[]}else if("DeleteParagraphStyle"===k&&e.styleName===a)return[];return[h]};this.execute=function(b){var g,e,h,m,n,l=b.getFormatting();return(g=b.getParagraphStyleElement(a))?(e=g.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0",
"paragraph-properties")[0],h=g.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties")[0],f&&(void 0===e&&f["style:paragraph-properties"]&&(e=b.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:paragraph-properties"),g.appendChild(e)),void 0===h&&f["style:text-properties"]&&(h=b.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:text-properties"),g.appendChild(h)),f["style:paragraph-properties"]&&l.updateStyle(e,
f["style:paragraph-properties"]),f["style:text-properties"]&&((n=f["style:text-properties"]["style:font-name"])&&!l.getFontMap().hasOwnProperty(n)&&(m=b.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:font-face"),m.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",n),m.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","svg:font-family",n),b.getOdfCanvas().odfContainer().rootElement.fontFaceDecls.appendChild(m)),
l.updateStyle(h,f["style:text-properties"]))),d&&(d.paragraphPropertyNames&&(k(e,d.paragraphPropertyNames),0===e.attributes.length&&g.removeChild(e)),d.textPropertyNames&&(k(h,d.textPropertyNames),0===h.attributes.length&&g.removeChild(h))),b.getOdfCanvas().refreshCSS(),b.emit(ops.OdtDocument.signalParagraphStyleModified,a),b.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:b,timestamp:n,styleName:a,setProperties:f,removedProperties:d}}};
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
runtime.loadClass("odf.Namespaces");
ops.OpAddParagraphStyle=function(){var k=this,g,l,h,b,n=odf.Namespaces.svgns,a=odf.Namespaces.stylens;this.init=function(a){g=a.memberid;l=a.timestamp;h=a.styleName;b=a.setProperties};this.transform=function(a,b){var c=a.spec();return"UpdateParagraphStyle"!==c.optype&&"DeleteParagraphStyle"!==c.optype||c.styleName!==h?[k]:null};this.execute=function(f){var d=f.getOdfCanvas().odfContainer(),c=f.getFormatting(),g=f.getDOM(),e=g.createElementNS(a,"style:style"),k,m,l,s,w;if(!e)return!1;e.setAttributeNS(a,
"style:family","paragraph");e.setAttributeNS(a,"style:name",h);b&&Object.keys(b).forEach(function(f){switch(f){case "style:paragraph-properties":k=g.createElementNS(a,"style:paragraph-properties");e.appendChild(k);c.updateStyle(k,b["style:paragraph-properties"]);break;case "style:text-properties":m=g.createElementNS(a,"style:text-properties");e.appendChild(m);(s=b["style:text-properties"]["style:font-name"])&&!c.getFontMap().hasOwnProperty(s)&&(l=g.createElementNS(a,"style:font-face"),l.setAttributeNS(a,
"style:name",s),l.setAttributeNS(n,"svg:font-family",s),d.rootElement.fontFaceDecls.appendChild(l));c.updateStyle(m,b["style:text-properties"]);break;default:"object"!==typeof b[f]&&(w=odf.Namespaces.resolvePrefix(f.substr(0,f.indexOf(":"))),e.setAttributeNS(w,f,b[f]))}});d.rootElement.styles.appendChild(e);f.getOdfCanvas().refreshCSS();f.emit(ops.OdtDocument.signalStyleCreated,h);return!0};this.spec=function(){return{optype:"AddParagraphStyle",memberid:g,timestamp:l,styleName:h,setProperties:b}}};
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
ops.OpDeleteParagraphStyle=function(){var k=this,g,l,h;this.init=function(b){g=b.memberid;l=b.timestamp;h=b.styleName};this.transform=function(b,g){var a=b.spec(),f=a.optype;if("DeleteParagraphStyle"===f){if(a.styleName===h)return[]}else if("SetParagraphStyle"===f&&a.styleName===h)return a.styleName="",f=new ops.OpSetParagraphStyle,f.init(a),[f,k];return[k]};this.execute=function(b){var g=b.getParagraphStyleElement(h);if(!g)return!1;g.parentNode.removeChild(g);b.getOdfCanvas().refreshCSS();b.emit(ops.OdtDocument.signalStyleDeleted,
h);return!0};this.spec=function(){return{optype:"DeleteParagraphStyle",memberid:g,timestamp:l,styleName:h}}};
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
ops.OpAddAnnotation=function(){function k(a,b,d){if(d=a.getPositionInTextNode(d))a=d.textNode,d.offset!==a.length&&a.splitText(d.offset),a.parentNode.insertBefore(b,a.nextSibling)}var g,l,h,b,n;this.init=function(a){g=a.memberid;l=parseInt(a.timestamp,10);h=parseInt(a.position,10);b=parseInt(a.length,10)||0;n=a.name};this.transform=function(a,b){return null};this.execute=function(a){var f={},d=new Date(l),c,t,e,r,m;m=a.getRootNode().ownerDocument;c=m.createElementNS(odf.Namespaces.officens,"office:annotation");
c.setAttributeNS(odf.Namespaces.officens,"office:name",n);t=m.createElementNS(odf.Namespaces.dcns,"dc:creator");t.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",g);e=m.createElementNS(odf.Namespaces.dcns,"dc:date");e.appendChild(m.createTextNode(d.toISOString()));d=m.createElementNS(odf.Namespaces.textns,"text:list");r=m.createElementNS(odf.Namespaces.textns,"text:list-item");m=m.createElementNS(odf.Namespaces.textns,"text:p");r.appendChild(m);d.appendChild(r);c.appendChild(t);
c.appendChild(e);c.appendChild(d);f.node=c;if(!f.node)return!1;if(b){c=a.getRootNode().ownerDocument.createElementNS(odf.Namespaces.officens,"office:annotation-end");c.setAttributeNS(odf.Namespaces.officens,"office:name",n);f.end=c;if(!f.end)return!1;k(a,f.end,h+b)}k(a,f.node,h);a.getOdfCanvas().addAnnotation(f);return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:g,timestamp:l,position:h,length:b,name:n}}};
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
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpAddParagraphStyle");runtime.loadClass("ops.OpDeleteParagraphStyle");
runtime.loadClass("ops.OpAddAnnotation");
ops.OperationFactory=function(){function k(g){return function(){return new g}}var g;this.register=function(k,h){g[k]=h};this.create=function(k){var h=null,b=g[k.optype];b&&(h=b(k),h.init(k));return h};g={AddCursor:k(ops.OpAddCursor),ApplyDirectStyling:k(ops.OpApplyDirectStyling),InsertTable:k(ops.OpInsertTable),InsertText:k(ops.OpInsertText),RemoveText:k(ops.OpRemoveText),SplitParagraph:k(ops.OpSplitParagraph),SetParagraphStyle:k(ops.OpSetParagraphStyle),UpdateParagraphStyle:k(ops.OpUpdateParagraphStyle),AddParagraphStyle:k(ops.OpAddParagraphStyle),
DeleteParagraphStyle:k(ops.OpDeleteParagraphStyle),MoveCursor:k(ops.OpMoveCursor),RemoveCursor:k(ops.OpRemoveCursor),AddAnnotation:k(ops.OpAddAnnotation)}};
// Input 57
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(k,g){function l(){w.setUnfilteredPosition(k.getNode(),0);return w}function h(a,b,c){var d;c.setStart(a,b);d=c.getClientRects()[0];if(!d)if(d={},a.childNodes[b-1]){c.setStart(a,b-1);c.setEnd(a,b);b=c.getClientRects()[0];if(!b){for(c=b=0;a&&a.nodeType===Node.ELEMENT_NODE;)b+=a.offsetLeft-a.scrollLeft,c+=a.offsetTop-a.scrollTop,a=a.parentNode;b={top:c,left:b}}runtime.assert(b,"getRect: invalid containerOffset");d.top=b.top;d.left=b.right;d.bottom=b.bottom}else a.nodeType===
Node.TEXT_NODE?(a.previousSibling&&(d=a.previousSibling.getClientRects()[0]),d||(c.setStart(a,0),c.setEnd(a,b),d=c.getClientRects()[0])):d=a.getClientRects()[0];runtime.assert(d,"getRect invalid rect");runtime.assert(void 0!==d.top,"getRect rect without top property");return{top:d.top,left:d.left,bottom:d.bottom}}function b(a,b,c){var d=a,e=l(),f,m=g.ownerDocument.createRange(),n=k.getSelectedRange()?k.getSelectedRange().cloneRange():g.ownerDocument.createRange(),s,q=runtime.getWindow();for(f=h(k.getNode(),
0,m);0<d&&c();)d-=1;b?(b=e.container(),e=e.unfilteredDomOffset(),-1===n.comparePoint(b,e)?(n.setStart(b,e),s=!1):n.setEnd(b,e)):(n.setStart(e.container(),e.unfilteredDomOffset()),n.collapse(!0));k.setSelectedRange(n,s);n=h(k.getNode(),0,m);if(n.top===f.top||void 0===u)u=n.left;q.clearTimeout(z);z=q.setTimeout(function(){u=void 0},2E3);m.detach();return a-d}function n(a){var b=l();return a.acceptPosition(b)===v?!0:!1}function a(a,b){for(var c=l(),d=new core.LoopWatchDog(1E3),e=0,f=0;0<a&&c.nextPosition();)e+=
1,d.check(),b.acceptPosition(c)===v&&(f+=e,e=0,a-=1);return f}function f(a,b,c){for(var d=l(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&d.nextPosition();)e.check(),c.acceptPosition(d)===v&&(f+=1,b.acceptPosition(d)===v&&(g+=f,f=0,a-=1));return g}function d(a,b,c){for(var d=l(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&d.previousPosition();)e.check(),c.acceptPosition(d)===v&&(f+=1,b.acceptPosition(d)===v&&(g+=f,f=0,a-=1));return g}function c(a,b){for(var c=l(),d=new core.LoopWatchDog(1E3),e=0,f=0;0<
a&&c.previousPosition();)e+=1,d.check(),b.acceptPosition(c)===v&&(f+=e,e=0,a-=1);return f}function t(b){var d=l(),e=s.getParagraphElement(d.getCurrentNode()),f;f=-c(1,b);if(0===f||e&&e!==s.getParagraphElement(d.getCurrentNode()))f=a(1,b);return f}function e(a,b){var c=l(),d=0,e=0,f=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var m=b,n=f,k=c,s=k.container(),q=0,r=null,w=void 0,t=10,z=void 0,W=0,O=void 0,ba=void 0,S=void 0,z=void 0,Q=g.ownerDocument.createRange(),F=new core.LoopWatchDog(1E3),z=h(s,k.unfilteredDomOffset(),
Q),O=z.top,ba=void 0===u?z.left:u,S=O;!0===(0>n?k.previousPosition():k.nextPosition());)if(F.check(),m.acceptPosition(k)===v&&(q+=1,s=k.container(),z=h(s,k.unfilteredDomOffset(),Q),z.top!==O)){if(z.top!==S&&S!==O)break;S=z.top;z=Math.abs(ba-z.left);if(null===r||z<t)r=s,w=k.unfilteredDomOffset(),t=z,W=q}null!==r?(k.setUnfilteredPosition(r,w),q=W):q=0;Q.detach();d+=q;if(0===d)break;e+=d;a-=1}return e*f}function r(a,b){var c,d,e,f,m=l(),n=s.getParagraphElement(m.getCurrentNode()),k=0,q=g.ownerDocument.createRange();
0>a?(c=m.previousPosition,d=-1):(c=m.nextPosition,d=1);for(e=h(m.container(),m.unfilteredDomOffset(),q);c.call(m);)if(b.acceptPosition(m)===v){if(s.getParagraphElement(m.getCurrentNode())!==n)break;f=h(m.container(),m.unfilteredDomOffset(),q);if(f.bottom!==e.bottom&&(e=f.top>=e.top&&f.bottom<e.bottom||f.top<=e.top&&f.bottom>e.bottom,!e))break;k+=d;e=f}q.detach();return k}function m(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(d=b.firstChild;d!==
a;)c+=1,d=d.nextSibling;return c}function q(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=l(),e=d.container(),f=d.unfilteredDomOffset(),g=0,h=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(e,f);var e=a,f=b,n=d.container(),k=d.unfilteredDomOffset();if(e===n)e=k-
f;else{var s=e.compareDocumentPosition(n);2===s?s=-1:4===s?s=1:10===s?(f=m(e,n),s=f<k?1:-1):(k=m(n,e),s=k<f?-1:1);e=s}if(0>e)for(;d.nextPosition()&&(h.check(),c.acceptPosition(d)===v&&(g+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&(h.check(),c.acceptPosition(d)===v&&(g-=1),d.container()!==a||d.unfilteredDomOffset()!==b););return g}var s,w,u,z,v=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,c){return b(a,c,w.nextPosition)};
this.movePointBackward=function(a,c){return b(a,c,w.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:a,countBackwardSteps:c,convertForwardStepsBetweenFilters:f,convertBackwardStepsBetweenFilters:d,countLinesSteps:e,countStepsToLineBoundary:r,countStepsToPosition:q,isPositionWalkable:n,countStepsToValidPosition:t}};(function(){s=new odf.OdfUtils;w=gui.SelectionMover.createPositionIterator(g);var a=g.ownerDocument.createRange();a.setStart(w.container(),w.unfilteredDomOffset());
a.collapse(!0);k.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(k){var g=new function(){this.acceptNode=function(g){return"urn:webodf:names:cursor"===g.namespaceURI||"urn:webodf:names:editinfo"===g.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(k,5,g,!1)};(function(){return gui.SelectionMover})();
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
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpAddParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpDeleteParagraphStyle");
ops.OperationTransformer=function(){function k(l,h){for(var b,n,a,f=[],d=[];0<l.length&&h;){b=l.shift();n=h;var c=void 0;a=c=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b.spec()));runtime.log(runtime.toJson(n.spec()));c=g.create(n.spec());a=n.transform(b,!0);n=(c=b.transform(c,!1))&&a?{opsA:c,opsB:a}:null;if(!n)return null;f=f.concat(n.opsA);if(0===n.opsB.length){f=f.concat(l);h=null;break}if(1<n.opsB.length)for(b=0;b<n.opsB.length-1;b+=1){a=k(l,n.opsB[b]);if(!a)return null;
d=d.concat(a.opsB);l=a.opsA}h=n.opsB.pop()}h&&d.push(h);return{opsA:f,opsB:d}}var g;this.setOperationFactory=function(k){g=k};this.transform=function(l,h){var b,n=[],a,f=[];for(b=0;b<l.length;b+=1){a=g.create(l[b]);if(!a)return null;n.push(a)}for(b=0;b<h.length;b+=1){a=g.create(h[b]);a=k(n,a);if(!a)return null;n=a.opsA;f=f.concat(a.opsB)}return{opsA:n,opsB:f}}};
// Input 59
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(k,g){var l=this,h,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,a){var f=0;0<b?f=h.movePointForward(b,a):0>=b&&(f=-h.movePointBackward(-b,a));l.handleUpdate();return f};this.handleUpdate=function(){};this.getStepCounter=function(){return h.getStepCounter()};this.getMemberId=function(){return k};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.getOdtDocument=function(){return g};b=new core.Cursor(g.getDOM(),k);h=new gui.SelectionMover(b,g.getRootNode())};
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
ops.EditInfo=function(k,g){function l(){var g=[],a;for(a in b)b.hasOwnProperty(a)&&g.push({memberid:a,time:b[a].time});g.sort(function(a,b){return a.time-b.time});return g}var h,b={};this.getNode=function(){return h};this.getOdtDocument=function(){return g};this.getEdits=function(){return b};this.getSortedEdits=function(){return l()};this.addEdit=function(g,a){var f,d=g.split("___")[0];if(!b[g])for(f in b)if(b.hasOwnProperty(f)&&f.split("___")[0]===d){delete b[f];break}b[g]={time:a}};this.clearEdits=
function(){b={}};h=g.getDOM().createElementNS("urn:webodf:names:editinfo","editinfo");k.insertBefore(h,k.firstChild)};
// Input 61
gui.Avatar=function(k,g){var l=this,h,b,n;this.setColor=function(a){b.style.borderColor=a};this.setImageUrl=function(a){l.isVisible()?b.src=a:n=a};this.isVisible=function(){return"block"===h.style.display};this.show=function(){n&&(b.src=n,n=void 0);h.style.display="block"};this.hide=function(){h.style.display="none"};this.markAsFocussed=function(a){h.className=a?"active":""};(function(){var a=k.ownerDocument,f=a.documentElement.namespaceURI;h=a.createElementNS(f,"div");b=a.createElementNS(f,"img");
b.width=64;b.height=64;h.appendChild(b);h.style.width="64px";h.style.height="70px";h.style.position="absolute";h.style.top="-80px";h.style.left="-34px";h.style.display=g?"block":"none";k.appendChild(h)})()};
// Input 62
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(k,g,l){function h(a){d&&f.parentNode&&(!c||a)&&(a&&void 0!==t&&runtime.clearTimeout(t),c=!0,n.style.opacity=a||"0"===n.style.opacity?"1":"0",t=runtime.setTimeout(function(){c=!1;h(!1)},500))}function b(a){var b;if("string"===typeof a){if(""===a)return 0;b=/^(\d+)(\.\d+)?px$/.exec(a);runtime.assert(null!==b,"size ["+a+"] does not have unit px.");return parseFloat(b[1])}return a}var n,a,f,d=!1,c=!1,t;this.refreshCursor=function(){l||k.getSelectedRange().collapsed?(d=!0,h(!0)):(d=
!1,n.style.opacity="0")};this.setFocus=function(){d=!0;a.markAsFocussed(!0);h(!0)};this.removeFocus=function(){d=!1;a.markAsFocussed(!1);n.style.opacity="0"};this.setAvatarImageUrl=function(b){a.setImageUrl(b)};this.setColor=function(b){n.style.borderColor=b;a.setColor(b)};this.getCursor=function(){return k};this.getFocusElement=function(){return n};this.toggleHandleVisibility=function(){a.isVisible()?a.hide():a.show()};this.showHandle=function(){a.show()};this.hideHandle=function(){a.hide()};this.ensureVisible=
function(){var a,c,d,f,g,h,l,t=k.getOdtDocument().getOdfCanvas().getElement().parentNode;g=l=n;d=runtime.getWindow();runtime.assert(null!==d,"Expected to be run in an environment which has a global window, like a browser.");do{g=g.parentElement;if(!g)break;h=d.getComputedStyle(g,null)}while("block"!==h.display);h=g;g=f=0;if(h&&t){c=!1;do{d=h.offsetParent;for(a=h.parentNode;a!==d;){if(a===t){a=h;var v=t,p=0;c=0;var y=void 0,D=runtime.getWindow();for(runtime.assert(null!==D,"Expected to be run in an environment which has a global window, like a browser.");a&&
a!==v;)y=D.getComputedStyle(a,null),p+=b(y.marginLeft)+b(y.borderLeftWidth)+b(y.paddingLeft),c+=b(y.marginTop)+b(y.borderTopWidth)+b(y.paddingTop),a=a.parentElement;a=p;f+=a;g+=c;c=!0;break}a=a.parentNode}if(c)break;f+=b(h.offsetLeft);g+=b(h.offsetTop);h=d}while(h&&h!==t);d=f;f=g}else f=d=0;d+=l.offsetLeft;f+=l.offsetTop;g=d-5;h=f-5;d=d+l.scrollWidth-1+5;l=f+l.scrollHeight-1+5;h<t.scrollTop?t.scrollTop=h:l>t.scrollTop+t.clientHeight-1&&(t.scrollTop=l-t.clientHeight+1);g<t.scrollLeft?t.scrollLeft=
g:d>t.scrollLeft+t.clientWidth-1&&(t.scrollLeft=d-t.clientWidth+1)};(function(){var b=k.getOdtDocument().getDOM();n=b.createElementNS(b.documentElement.namespaceURI,"span");f=k.getNode();f.appendChild(n);a=new gui.Avatar(f,g)})()};
// Input 63
runtime.loadClass("core.EventNotifier");
gui.ClickHandler=function(){function k(){l=0;h=null}var g,l=0,h=null,b=new core.EventNotifier([gui.ClickHandler.signalSingleClick,gui.ClickHandler.signalDoubleClick,gui.ClickHandler.signalTripleClick]);this.subscribe=function(g,a){b.subscribe(g,a)};this.handleMouseUp=function(n){var a=runtime.getWindow();h&&h.x===n.screenX&&h.y===n.screenY?(l+=1,1===l?b.emit(gui.ClickHandler.signalSingleClick,n):2===l?b.emit(gui.ClickHandler.signalDoubleClick,void 0):3===l&&(a.clearTimeout(g),b.emit(gui.ClickHandler.signalTripleClick,
void 0),k())):(b.emit(gui.ClickHandler.signalSingleClick,n),l=1,h={x:n.screenX,y:n.screenY},a.clearTimeout(g),g=a.setTimeout(k,400))}};gui.ClickHandler.signalSingleClick="click";gui.ClickHandler.signalDoubleClick="doubleClick";gui.ClickHandler.signalTripleClick="tripleClick";(function(){return gui.ClickHandler})();
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
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
gui.KeyboardHandler=function(){function k(b,h){h||(h=g.None);return b+":"+h}var g=gui.KeyboardHandler.Modifier,l=null,h={};this.setDefault=function(b){l=b};this.bind=function(b,g,a){b=k(b,g);runtime.assert(!1===h.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);h[b]=a};this.unbind=function(b,g){var a=k(b,g);delete h[a]};this.reset=function(){l=null;h={}};this.handleEvent=function(b){var n=b.keyCode,a=g.None;b.metaKey&&(a|=g.Meta);b.ctrlKey&&(a|=g.Ctrl);b.altKey&&(a|=g.Alt);
b.shiftKey&&(a|=g.Shift);n=k(n,a);n=h[n];a=!1;n?a=n():null!==l&&(a=l(b));a&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,I:73,U:85,Z:90};(function(){return gui.KeyboardHandler})();
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("odf.TextSerializer");
gui.Clipboard=function(){var k,g,l;this.setDataFromRange=function(h,b){var n=!0,a,f=h.clipboardData;a=runtime.getWindow();var d=b.startContainer.ownerDocument;!f&&a&&(f=a.clipboardData);f?(d=d.createElement("span"),d.appendChild(b.cloneContents()),a=f.setData("text/plain",g.writeToString(d)),n=n&&a,a=f.setData("text/html",k.writeToString(d,odf.Namespaces.namespaceMap)),n=n&&a,h.preventDefault()):n=!1;return n};k=new xmldom.LSSerializer;g=new odf.TextSerializer;l=new odf.OdfNodeFilter;k.filter=l;g.filter=
l};
// Input 66
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("gui.ClickHandler");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.StyleHelper");
gui.SessionController=function(){gui.SessionController=function(k,g){function l(a,b,c,d){var e="on"+b,f=!1;a.attachEvent&&(f=a.attachEvent(e,c));!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0);f&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function h(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function b(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function n(a,b){var c=new ops.OpMoveCursor;c.init({memberid:g,
position:a,length:b||0});return c}function a(a,b){var c=gui.SelectionMover.createPositionIterator(x.getRootNode()),d=x.getOdfCanvas().getElement(),e;e=a;if(!e)return null;for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return null;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,b);return x.getDistanceFromCursor(g,c.container(),
c.unfilteredDomOffset())}function f(b){runtime.setTimeout(function(){var c=runtime.getWindow().getSelection(),d=x.getCursorPosition(g),e,f;if(null===c.anchorNode&&null===c.focusNode){e=b.clientX;f=b.clientY;var h=x.getDOM();h.caretRangeFromPoint?(e=h.caretRangeFromPoint(e,f),f={container:e.startContainer,offset:e.startOffset}):h.caretPositionFromPoint?(e=h.caretPositionFromPoint(e,f),f={container:e.offsetNode,offset:e.offset}):f=null;f&&(e=x.getDOM().createRange(),e.setStart(f.container,f.offset),
e.collapse(!0),c.addRange(e))}e=a(c.anchorNode,c.anchorOffset);c=a(c.focusNode,c.focusOffset);if(null!==c&&0!==c||null!==e&&0!==e)d=n(d+e,c-e),k.enqueue(d)},0)}function d(a){f(a)}function c(){var a,b,c,d=gui.SelectionMover.createPositionIterator(x.getRootNode()),e=x.getCursor(g).getNode(),f=x.getCursorPosition(g),h=/[A-Za-z0-9]/,m=0,l=0;d.setUnfilteredPosition(e,0);if(d.previousPosition()&&(a=d.getCurrentNode(),a.nodeType===Node.TEXT_NODE))for(b=a.data.length-1;0<=b;b-=1)if(c=a.data[b],h.test(c))m-=
1;else break;d.setUnfilteredPosition(e,0);if(d.nextPosition()&&(a=d.getCurrentNode(),a.nodeType===Node.TEXT_NODE))for(b=0;b<a.data.length;b+=1)if(c=a.data[b],h.test(c))l+=1;else break;if(0!==m||0!==l)a=n(f+m,Math.abs(m)+Math.abs(l)),k.enqueue(a)}function t(){var a,b;b=gui.SelectionMover.createPositionIterator(x.getRootNode());var c=x.getParagraphElement(x.getCursor(g).getNode()),d=x.getCursorPosition(g);a=x.getDistanceFromCursor(g,c,0);b.moveToEndOfNode(c);b=x.getDistanceFromCursor(g,c,b.unfilteredDomOffset());
if(0!==a||0!==b)a=n(d+a,Math.abs(a)+Math.abs(b)),k.enqueue(a)}function e(a){var b=x.getCursorSelection(g),c=x.getCursor(g).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,pa,ua):-c.convertBackwardStepsBetweenFilters(-a,pa,ua),a=b.length+a,k.enqueue(n(b.position,a)))}function r(a){var b=x.getCursorPosition(g),c=x.getCursor(g).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,pa,ua):-c.convertBackwardStepsBetweenFilters(-a,pa,ua),k.enqueue(n(b+a,0)))}function m(){r(-1);
return!0}function q(){r(1);return!0}function s(){e(-1);return!0}function w(){e(1);return!0}function u(a,b){var c=x.getParagraphElement(x.getCursor(g).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=x.getCursor(g).getStepCounter().countLinesSteps(a,pa);b?e(c):r(c)}function z(){u(-1,!1);return!0}function v(){u(1,!1);return!0}function p(){u(-1,!0);return!0}function y(){u(1,!0);return!0}function D(a,b){var c=x.getCursor(g).getStepCounter().countStepsToLineBoundary(a,
pa);b?e(c):r(c)}function H(){D(-1,!1);return!0}function A(){D(1,!1);return!0}function N(){D(-1,!0);return!0}function C(){D(1,!0);return!0}function P(){var a=x.getParagraphElement(x.getCursor(g).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");c=x.getDistanceFromCursor(g,a,0);b=gui.SelectionMover.createPositionIterator(x.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),ia.isParagraph(a)&&(c=x.getDistanceFromCursor(g,
a,0));e(c);return!0}function B(){var a=x.getParagraphElement(x.getCursor(g).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(x.getRootNode());b.moveToEndOfNode(a);for(c=x.getDistanceFromCursor(g,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),ia.isParagraph(a)&&(b.moveToEndOfNode(a),c=x.getDistanceFromCursor(g,b.container(),b.unfilteredDomOffset()));e(c);return!0}function J(a,b){var c=
gui.SelectionMover.createPositionIterator(x.getRootNode());0<a&&c.moveToEnd();c=x.getDistanceFromCursor(g,c.container(),c.unfilteredDomOffset());b?e(c):r(c)}function U(){J(-1,!1);return!0}function da(){J(1,!1);return!0}function T(){J(-1,!0);return!0}function ka(){J(1,!0);return!0}function ca(){var a=gui.SelectionMover.createPositionIterator(x.getRootNode()),b;b=-x.getDistanceFromCursor(g,a.container(),a.unfilteredDomOffset());a.moveToEnd();b+=x.getDistanceFromCursor(g,a.container(),a.unfilteredDomOffset());
k.enqueue(n(0,b));return!0}function W(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function O(a){var b=new ops.OpRemoveText;b.init({memberid:g,position:a.position,length:a.length});return b}function ba(){var a=W(x.getCursorSelection(g)),b=null;0===a.length?0<a.position&&x.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:g,position:a.position-1,length:1}),k.enqueue(b)):(b=O(a),k.enqueue(b));return!0}function S(){var a=W(x.getCursorSelection(g)),b=null;
0===a.length?x.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:g,position:a.position,length:1}),k.enqueue(b)):(b=O(a),k.enqueue(b));return null!==b}function Q(){var a=W(x.getCursorSelection(g));0!==a.length&&k.enqueue(O(a));return!0}function F(a){var b=W(x.getCursorSelection(g)),c=null;0<b.length&&(c=O(b),k.enqueue(c));c=new ops.OpInsertText;c.init({memberid:g,position:b.position,text:a});k.enqueue(c)}function M(){var a=x.getCursorPosition(g),b;b=new ops.OpSplitParagraph;
b.init({memberid:g,position:a});k.enqueue(b);return!0}function L(){var a=x.getCursor(g),b=runtime.getWindow().getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function K(a){var b=x.getCursor(g);b.getSelectedRange().collapsed||(ma.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=W(k.getOdtDocument().getCursorSelection(g)),b.init({memberid:g,position:a.position,length:a.length}),k.enqueue(b)):runtime.log("Cut operation failed"))}function Y(){return!1!==
x.getCursor(g).getSelectedRange().collapsed}function la(a){var b=x.getCursor(g);b.getSelectedRange().collapsed||ma.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function E(a){var b,c=runtime.getWindow();c.clipboardData&&c.clipboardData.getData?b=c.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(F(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function G(){return!1}function ea(a){if($)$.onOperationExecuted(a)}
function ha(a){x.emit(ops.OdtDocument.signalUndoStackChanged,a)}function V(){return $?($.moveBackward(1),L(),!0):!1}function R(){return $?($.moveForward(1),L(),!0):!1}function Z(a,b){var c=x.getCursorSelection(g),d=new ops.OpApplyDirectStyling,e={};e[a]=b;d.init({memberid:g,position:c.position,length:c.length,setProperties:{"style:text-properties":e}});k.enqueue(d)}function X(){var a=x.getCursor(g).getSelectedRange(),a=ra.isBold(a)?"normal":"bold";Z("fo:font-weight",a);return!0}function na(){var a=
x.getCursor(g).getSelectedRange(),a=ra.isItalic(a)?"normal":"italic";Z("fo:font-style",a);return!0}function qa(){var a=x.getCursor(g).getSelectedRange(),a=ra.hasUnderline(a)?"none":"solid";Z("style:text-underline-style",a);return!0}var x=k.getOdtDocument(),ia=new odf.OdfUtils,ma=new gui.Clipboard,oa=new gui.ClickHandler,I=new gui.KeyboardHandler,ta=new gui.KeyboardHandler,ra=new gui.StyleHelper(x.getFormatting()),pa=new core.PositionFilterChain,ua=x.getPositionFilter(),$=null;pa.addFilter("BaseFilter",
ua);pa.addFilter("RootFilter",x.createRootFilter(g));this.startEditing=function(){var a;a=x.getOdfCanvas().getElement();l(a,"keydown",I.handleEvent);l(a,"keypress",ta.handleEvent);l(a,"keyup",b);l(a,"beforecut",Y,!0);l(a,"cut",K);l(a,"copy",la);l(a,"beforepaste",G,!0);l(a,"paste",E);l(a,"mouseup",oa.handleMouseUp);l(a,"contextmenu",d);x.subscribe(ops.OdtDocument.signalOperationExecuted,L);x.subscribe(ops.OdtDocument.signalOperationExecuted,ea);a=new ops.OpAddCursor;a.init({memberid:g});k.enqueue(a);
$&&$.saveInitialState()};this.endEditing=function(){var a;x.unsubscribe(ops.OdtDocument.signalOperationExecuted,ea);x.unsubscribe(ops.OdtDocument.signalOperationExecuted,L);a=x.getOdfCanvas().getElement();h(a,"keydown",I.handleEvent);h(a,"keypress",ta.handleEvent);h(a,"keyup",b);h(a,"cut",K);h(a,"beforecut",Y);h(a,"copy",la);h(a,"paste",E);h(a,"beforepaste",G);h(a,"mouseup",oa.handleMouseUp);h(a,"contextmenu",d);a=new ops.OpRemoveCursor;a.init({memberid:g});k.enqueue(a);$&&$.resetInitialState()};
this.getInputMemberId=function(){return g};this.getSession=function(){return k};this.setUndoManager=function(a){$&&$.unsubscribe(gui.UndoManager.signalUndoStackChanged,ha);if($=a)$.setOdtDocument(x),$.setPlaybackFunction(function(a){a.execute(x)}),$.subscribe(gui.UndoManager.signalUndoStackChanged,ha)};this.getUndoManager=function(){return $};(function(){var a=-1!==runtime.getWindow().navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,d=gui.KeyboardHandler.KeyCode;I.bind(d.Tab,
b.None,function(){F("\t");return!0});I.bind(d.Left,b.None,m);I.bind(d.Right,b.None,q);I.bind(d.Up,b.None,z);I.bind(d.Down,b.None,v);I.bind(d.Backspace,b.None,ba);I.bind(d.Delete,b.None,S);I.bind(d.Left,b.Shift,s);I.bind(d.Right,b.Shift,w);I.bind(d.Up,b.Shift,p);I.bind(d.Down,b.Shift,y);I.bind(d.Home,b.None,H);I.bind(d.End,b.None,A);I.bind(d.Home,b.Ctrl,U);I.bind(d.End,b.Ctrl,da);I.bind(d.Home,b.Shift,N);I.bind(d.End,b.Shift,C);I.bind(d.Up,b.CtrlShift,P);I.bind(d.Down,b.CtrlShift,B);I.bind(d.Home,
b.CtrlShift,T);I.bind(d.End,b.CtrlShift,ka);a?(I.bind(d.Clear,b.None,Q),I.bind(d.Left,b.Meta,H),I.bind(d.Right,b.Meta,A),I.bind(d.Home,b.Meta,U),I.bind(d.End,b.Meta,da),I.bind(d.Left,b.MetaShift,N),I.bind(d.Right,b.MetaShift,C),I.bind(d.Up,b.AltShift,P),I.bind(d.Down,b.AltShift,B),I.bind(d.Up,b.MetaShift,T),I.bind(d.Down,b.MetaShift,ka),I.bind(d.A,b.Meta,ca),I.bind(d.B,b.Meta,X),I.bind(d.I,b.Meta,na),I.bind(d.U,b.Meta,qa),I.bind(d.Z,b.Meta,V),I.bind(d.Z,b.MetaShift,R)):(I.bind(d.A,b.Ctrl,ca),I.bind(d.B,
b.Ctrl,X),I.bind(d.I,b.Ctrl,na),I.bind(d.U,b.Ctrl,qa),I.bind(d.Z,b.Ctrl,V),I.bind(d.Z,b.CtrlShift,R));ta.setDefault(function(a){var b;b=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(F(b),!0)});ta.bind(d.Enter,b.None,M);oa.subscribe(gui.ClickHandler.signalSingleClick,f);oa.subscribe(gui.ClickHandler.signalDoubleClick,c);oa.subscribe(gui.ClickHandler.signalTripleClick,t)})()};return gui.SessionController}();
// Input 67
ops.UserModel=function(){};ops.UserModel.prototype.getUserDetailsAndUpdates=function(k,g){};ops.UserModel.prototype.unsubscribeUserDetailsUpdates=function(k,g){};
// Input 68
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
ops.TrivialUserModel=function(){var k={bob:{memberid:"bob",fullname:"Bob Pigeon",color:"red",imageurl:"avatar-pigeon.png"},alice:{memberid:"alice",fullname:"Alice Bee",color:"green",imageurl:"avatar-flower.png"},you:{memberid:"you",fullname:"I, Robot",color:"blue",imageurl:"avatar-joe.png"}};this.getUserDetailsAndUpdates=function(g,l){var h=g.split("___")[0];l(g,k[h]||null)};this.unsubscribeUserDetailsUpdates=function(g,k){}};
// Input 69
ops.NowjsUserModel=function(k){var g={},l={},h=k.getNowObject();this.getUserDetailsAndUpdates=function(b,k){var a=b.split("___")[0],f=g[a],d=l[a]||[],c;l[a]=d;runtime.assert(void 0!==k,"missing callback");for(c=0;c<d.length&&(d[c].subscriber!==k||d[c].memberId!==b);c+=1);c<d.length?runtime.log("double subscription request for "+b+" in NowjsUserModel::getUserDetailsAndUpdates"):(d.push({memberId:b,subscriber:k}),1===d.length&&h.subscribeUserDetailsUpdates(a));f&&k(b,f)};this.unsubscribeUserDetailsUpdates=
function(b,k){var a,f=b.split("___")[0],d=l[f];runtime.assert(void 0!==k,"missing subscriber parameter or null");runtime.assert(d,"tried to unsubscribe when no one is subscribed ('"+b+"')");if(d){for(a=0;a<d.length&&(d[a].subscriber!==k||d[a].memberId!==b);a+=1);runtime.assert(a<d.length,"tried to unsubscribe when not subscribed for memberId '"+b+"'");d.splice(a,1);0===d.length&&(runtime.log("no more subscribers for: "+b),delete l[f],delete g[f],h.unsubscribeUserDetailsUpdates(f))}};h.updateUserDetails=
function(b,h){var a=h?{userid:h.uid,fullname:h.fullname,imageurl:"/user/"+h.avatarId+"/avatar.png",color:h.color}:null,f,d;if(f=l[b])for(g[b]=a,d=0;d<f.length;d+=1)f[d].subscriber(f[d].memberId,a)};runtime.assert("ready"===h.networkStatus,"network not ready")};
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
ops.PullBoxUserModel=function(k){function g(){var a=k.getBase64(),f,d=[];for(f in b)b.hasOwnProperty(f)&&d.push(f);runtime.log("user-list request for : "+d.join(","));k.call("user-list:"+a.toBase64(k.getToken())+":"+d.join(","),function(a){var d=runtime.fromJson(a),e;runtime.log("user-list reply: "+a);if(d.hasOwnProperty("userdata_list"))for(a=d.userdata_list,f=0;f<a.length;f+=1){if(d={userid:a[f].uid,fullname:a[f].fullname,imageurl:"/user/"+a[f].avatarId+"/avatar.png",color:a[f].color},e=h.hasOwnProperty(a[f].uid)?
h[a[f].uid]:null,!e||e.fullname!==d.fullname||e.imageurl!==d.imageurl||e.color!==d.color){var g=e=void 0;if(e=b[d.userid])for(h[d.userid]=d,g=0;g<e.length;g+=1)e[g].subscriber(e[g].memberId,d)}}else runtime.log("Meh, userlist data broken: "+a)})}function l(){n&&(g(),runtime.setTimeout(l,2E4))}var h={},b={},n=!1;this.getUserDetailsAndUpdates=function(a,f){var d=a.split("___")[0],c=h[d],k=b[d]||[];b[d]=k;runtime.assert(void 0!==f,"missing callback");for(d=0;d<k.length&&(k[d].subscriber!==f||k[d].memberId!==
a);d+=1);d<k.length?runtime.log("double subscription request for "+a+" in PullBoxUserModel::getUserDetailsAndUpdates"):(k.push({memberId:a,subscriber:f}),1===k.length&&g());c&&f(a,c);n||(n=!0,runtime.setTimeout(l,2E4))};this.unsubscribeUserDetailsUpdates=function(a,f){var d,c=a.split("___")[0],g=b[c];runtime.assert(void 0!==f,"missing subscriber parameter or null");runtime.assert(g,"tried to unsubscribe when no one is subscribed ('"+a+"')");if(g){for(d=0;d<g.length&&(g[d].subscriber!==f||g[d].memberId!==
a);d+=1);runtime.assert(d<g.length,"tried to unsubscribe when not subscribed for memberId '"+a+"'");g.splice(d,1);if(0===g.length){runtime.log("no more subscribers for: "+a);delete b[c];delete h[c];a:{var e;if(n){for(e in b)if(b.hasOwnProperty(e))break a;n=!1}}}}};runtime.assert("ready"===k.networkStatus(),"network not ready")};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(k){};ops.OperationRouter.prototype.setPlaybackFunction=function(k){};ops.OperationRouter.prototype.push=function(k){};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
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
ops.TrivialOperationRouter=function(){var k,g;this.setOperationFactory=function(g){k=g};this.setPlaybackFunction=function(k){g=k};this.push=function(l){l=l.spec();l.timestamp=(new Date).getTime();l=k.create(l);g(l)}};
// Input 73
ops.NowjsOperationRouter=function(k,g,l){function h(a){var g;g=b.create(a);runtime.log(" op in: "+runtime.toJson(a));if(null!==g)if(a=Number(a.server_seq),runtime.assert(!isNaN(a),"server seq is not a number"),a===f+1)for(n(g),f=a,c=0,g=f+1;d.hasOwnProperty(g);g+=1)n(d[g]),delete d[g],runtime.log("op with server seq "+a+" taken from hold (reordered)");else runtime.assert(a!==f+1,"received incorrect order from server"),runtime.assert(!d.hasOwnProperty(a),"reorder_queue has incoming op"),runtime.log("op with server seq "+
a+" put on hold"),d[a]=g;else runtime.log("ignoring invalid incoming opspec: "+a)}var b,n,a=l.getNowObject(),f=-1,d={},c=0,t=1E3;this.setOperationFactory=function(a){b=a};this.setPlaybackFunction=function(a){n=a};a.ping=function(a){null!==g&&a(g)};a.receiveOp=function(a,b){a===k&&h(b)};this.push=function(b){b=b.spec();runtime.assert(null!==g,"Router sequence N/A without memberid");t+=1;b.client_nonce="C:"+g+":"+t;b.parent_op=f+"+"+c;c+=1;runtime.log("op out: "+runtime.toJson(b));a.deliverOp(k,b)};
this.requestReplay=function(b){a.requestReplay(k,function(a){runtime.log("replaying: "+runtime.toJson(a));h(a)},function(a){runtime.log("replay done ("+a+" ops).");b&&b()})};(function(){a.memberid=g;a.joinSession(k,function(a){runtime.assert(a,"Trying to join a session which does not exists or where we are already in")})})()};
// Input 74
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
runtime.loadClass("ops.OperationTransformer");
ops.PullBoxOperationRouter=function(k,g,l){function h(a){var b,c,e,f=[];for(b=0;b<a.length;)if(e=d.create(a[b]),null!==e&&e.merge){for(c=b+1;c<a.length&&e.merge(a[c]);c+=1)runtime.log("Merged: "+a[b].optype+" with "+a[c].optype);f.push(e.spec());b=c}else f.push(a[b]),b+=1;runtime.log("Merged: from "+a.length+" to "+f.length+" specs");return f}function b(){function a(){var b,e,f;m=!1;for(f=(new Date).getTime();0<z.length&&!(500<(new Date).getTime()-f);)b=z.shift(),e=d.create(b),runtime.log(" op in: "+
runtime.toJson(b)),null!==e?t(e):runtime.log("ignoring invalid incoming opspec: "+b);0<z.length?(m=!0,runtime.getWindow().setTimeout(a,1)):c&&(c(),c=null)}m||a()}function n(a){var b;if(!a)return runtime.assert(!1,"no opspecs received!"),!1;b=v.transform(u,a);if(!b)return!1;for(a=0;a<b.opsB.length;a+=1)z.push(b.opsB[a].spec());u=[];for(a=0;a<b.opsA.length;a+=1)u.push(b.opsA[a].spec());return!0}function a(){function c(){var b={active:!0};e=b;runtime.getWindow().setTimeout(function(){runtime.log("Pulling activated:"+
b.active);e=null;b.active&&a()},8E3)}function d(){var a;q||s||(q=!0,a=u,u=[],l.call({command:"sync-ops",sec_token:l.getToken(),es_id:k,member_id:g,seq_head:String(w),client_ops:a},function(e){var f=!1,g;try{g=runtime.fromJson(e)}catch(m){runtime.assert(void 0!==g,"invalid sync-ops reply: ["+e+"]")}runtime.log("sync-ops reply: "+e);"newOps"===g.result?0<g.ops.length&&(0===u.length?(e=h(g.ops),z=z.concat(e)):(runtime.log("meh, have new ops locally meanwhile, have to do transformations."),s=!n(h(g.ops))),
w=g.headSeq):"added"===g.result?(runtime.log("All added to server"),w=g.headSeq):"conflict"===g.result?(u=a.concat(u),runtime.log("meh, server has new ops meanwhile, have to do transformations."),s=!n(h(g.ops)),w=g.headSeq,s||(f=!0)):runtime.assert(!1,"Unexpected result on sync-ops call: "+g.result);q=!1;s?runtime.assert(!1,"Sorry to tell:\nwe hit a pair of operations in a state which yet need to be supported for transformation against each other.\nClient disconnected from session, no further editing accepted.\n\nPlease reconnect manually for now."):
(f?d():(runtime.log("Preparing next: "+(0===u.length)),0===u.length&&c()),b())}))}d()}function f(){q||r||(r=!0,e&&(e.active=!1),runtime.getWindow().setTimeout(function(){runtime.log("Pushing activated");r=!1;a()},3E3))}var d,c,t,e=null,r=!1,m=!1,q=!1,s=!1,w="",u=[],z=[],v=new ops.OperationTransformer;this.requestReplay=function(b){c=b;a()};this.setOperationFactory=function(a){d=a;v.setOperationFactory(a)};this.setPlaybackFunction=function(a){t=a};this.push=function(a){var b=a.spec();s||0<z.length||
(b.timestamp=(new Date).getTime(),a=d.create(b),t(a),u.push(b),f())};(function(){var a=l.getBase64(),b=l.getToken();runtime.assert(b,"invalid token");l.call("join-session:"+a.toBase64(b)+":"+a.toBase64(k)+":"+a.toBase64(g),function(a){var b=Boolean(runtime.fromJson(a));runtime.log("join-session reply: "+a);runtime.assert(b,"Trying to join a session which does not exists or where we are already in")})})()};
// Input 75
gui.EditInfoHandle=function(k){var g=[],l,h=k.ownerDocument,b=h.documentElement.namespaceURI;this.setEdits=function(k){g=k;var a,f,d,c;l.innerHTML="";for(k=0;k<g.length;k+=1)a=h.createElementNS(b,"div"),a.className="editInfo",f=h.createElementNS(b,"span"),f.className="editInfoColor",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",g[k].memberid),d=h.createElementNS(b,"span"),d.className="editInfoAuthor",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",g[k].memberid),
c=h.createElementNS(b,"span"),c.className="editInfoTime",c.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",g[k].memberid),c.innerHTML=g[k].time,a.appendChild(f),a.appendChild(d),a.appendChild(c),l.appendChild(a)};this.show=function(){l.style.display="block"};this.hide=function(){l.style.display="none"};l=h.createElementNS(b,"div");l.setAttribute("class","editInfoHandle");l.style.display="none";k.appendChild(l)};
// Input 76
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(k,g){function l(b,d){return runtime.getWindow().setTimeout(function(){a.style.opacity=b},d)}var h=this,b,n,a,f,d;this.addEdit=function(b,g){var e=Date.now()-g;k.addEdit(b,g);n.setEdits(k.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);if(f){var h=f;runtime.getWindow().clearTimeout(h)}d&&(h=d,runtime.getWindow().clearTimeout(h));1E4>e?(l(1,0),f=l(0.5,1E4-e),d=l(0.2,2E4-e)):1E4<=e&&2E4>e?(l(0.5,0),d=l(0.2,2E4-e)):l(0.2,0)};this.getEdits=
function(){return k.getEdits()};this.clearEdits=function(){k.clearEdits();n.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return k};this.show=function(){a.style.display="block"};this.hide=function(){h.hideHandle();a.style.display="none"};this.showHandle=function(){n.show()};this.hideHandle=function(){n.hide()};(function(){var c=k.getOdtDocument().getDOM();a=c.createElementNS(c.documentElement.namespaceURI,
"div");a.setAttribute("class","editInfoMarker");a.onmouseover=function(){h.showHandle()};a.onmouseout=function(){h.hideHandle()};b=k.getNode();b.appendChild(a);n=new gui.EditInfoHandle(b);g||h.hide()})()};
// Input 77
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
runtime.loadClass("gui.Caret");runtime.loadClass("ops.TrivialUserModel");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
gui.SessionView=function(){return function(k,g,l){function h(a,b,c){b=b.split("___")[0];return a+'[editinfo|memberid^="'+b+'"]'+c}function b(a,b,c){function d(b,c,e){c=h(b,a,e)+c;a:{var f=t.firstChild;for(b=h(b,a,e);f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:t.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",
'{ content: "'+b+'"; }',":before");d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","")}function n(a){var b,c;for(c in e)e.hasOwnProperty(c)&&(b=e[c],a?b.show():b.hide())}function a(a){l.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function f(a,c){var d=l.getCaret(a);void 0===c?runtime.log('UserModel sent undefined data for member "'+a+'".'):(null===c&&(c={memberid:a,fullname:"Unknown Identity",color:"black",imageurl:"avatar-joe.png"}),
d&&(d.setAvatarImageUrl(c.imageurl),d.setColor(c.color)),b(a,c.fullname,c.color))}function d(a){var b=a.getMemberId(),c=g.getUserModel();l.registerCursor(a,m,q);f(b,null);c.getUserDetailsAndUpdates(b,f);runtime.log("+++ View here +++ eagerly created an Caret for '"+b+"'! +++")}function c(a){var b=!1,c;for(c in e)if(e.hasOwnProperty(c)&&e[c].getEditInfo().getEdits().hasOwnProperty(a)){b=!0;break}b||g.getUserModel().unsubscribeUserDetailsUpdates(a,f)}var t,e={},r=void 0!==k.editInfoMarkersInitiallyVisible?
k.editInfoMarkersInitiallyVisible:!0,m=void 0!==k.caretAvatarsInitiallyVisible?k.caretAvatarsInitiallyVisible:!0,q=void 0!==k.caretBlinksOnRangeSelect?k.caretBlinksOnRangeSelect:!0;this.showEditInfoMarkers=function(){r||(r=!0,n(r))};this.hideEditInfoMarkers=function(){r&&(r=!1,n(r))};this.showCaretAvatars=function(){m||(m=!0,a(m))};this.hideCaretAvatars=function(){m&&(m=!1,a(m))};this.getSession=function(){return g};this.getCaret=function(a){return l.getCaret(a)};(function(){var a=g.getOdtDocument(),
b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,d);a.subscribe(ops.OdtDocument.signalCursorRemoved,c);a.subscribe(ops.OdtDocument.signalParagraphChanged,function(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,f="",h=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0];h?(f=h.getAttributeNS("urn:webodf:names:editinfo","id"),d=e[f]):(f=Math.random().toString(),d=new ops.EditInfo(b,g.getOdtDocument()),d=new gui.EditInfoMarker(d,r),
h=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0],h.setAttributeNS("urn:webodf:names:editinfo","id",f),e[f]=d);d.addEdit(c,new Date(a))});t=document.createElementNS(b.namespaceURI,"style");t.type="text/css";t.media="screen, print, handheld, projection";t.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));t.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(t)})()}}();
// Input 78
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
runtime.loadClass("gui.Caret");
gui.CaretManager=function(k){function g(){return k.getSession().getOdtDocument().getOdfCanvas().getElement()}function l(a){a===k.getInputMemberId()&&g().removeAttribute("tabindex",0);delete f[a]}function h(a){(a=f[a.getMemberId()])&&a.refreshCursor()}function b(a){var b=f[a.memberId];a.memberId===k.getInputMemberId()&&b&&b.ensureVisible()}function n(){var a=f[k.getInputMemberId()];a&&a.setFocus()}function a(){var a=f[k.getInputMemberId()];a&&a.removeFocus()}var f={};this.registerCursor=function(a,
b,h){var e=a.getMemberId(),n=g();b=new gui.Caret(a,b,h);f[e]=b;e===k.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+e),a.handleUpdate=b.ensureVisible,n.setAttribute("tabindex",0),n.focus());return b};this.getCaret=function(a){return f[a]};this.getCarets=function(){return Object.keys(f).map(function(a){return f[a]})};(function(){var d=k.getSession().getOdtDocument(),c=g();d.subscribe(ops.OdtDocument.signalParagraphChanged,b);d.subscribe(ops.OdtDocument.signalCursorMoved,
h);d.subscribe(ops.OdtDocument.signalCursorRemoved,l);c.onfocus=n;c.onblur=a})()};
// Input 79
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var k=new xmldom.XPath,g=runtime.getWindow();return function(l){var h=this;h.setInitialSlideMode=function(){h.startSlideMode("single")};h.keyDownHandler=function(b){if(!b.target.isContentEditable&&"input"!==b.target.nodeName)switch(b.keyCode){case 84:h.toggleToolbar();break;case 37:case 8:h.prevSlide();break;case 39:case 32:h.nextSlide();break;case 36:h.firstSlide();break;case 35:h.lastSlide()}};h.root=function(){return h.odf_canvas.odfContainer().rootElement};h.firstSlide=
function(){h.slideChange(function(b,g){return 0})};h.lastSlide=function(){h.slideChange(function(b,g){return g-1})};h.nextSlide=function(){h.slideChange(function(b,g){return b+1<g?b+1:-1})};h.prevSlide=function(){h.slideChange(function(b,g){return 1>b?-1:b-1})};h.slideChange=function(b){var k=h.getPages(h.odf_canvas.odfContainer().rootElement),a=-1,f=0;k.forEach(function(b){b=b[1];b.hasAttribute("slide_current")&&(a=f,b.removeAttribute("slide_current"));f+=1});b=b(a,k.length);-1===b&&(b=a);k[b][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=b;"cont"===h.slide_mode&&g.scrollBy(0,k[b][1].getBoundingClientRect().top-30)};h.selectSlide=function(b){h.slideChange(function(g,a){return b>=a||0>b?-1:b})};h.scrollIntoContView=function(b){var k=h.getPages(h.odf_canvas.odfContainer().rootElement);0!==k.length&&g.scrollBy(0,k[b][1].getBoundingClientRect().top-30)};h.getPages=function(b){b=b.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var g=[],a;for(a=0;a<b.length;a+=1)g.push([b[a].getAttribute("draw:name"),
b[a]]);return g};h.fillPageList=function(b,g){for(var a=h.getPages(b),f,d,c;g.firstChild;)g.removeChild(g.firstChild);for(f=0;f<a.length;f+=1)d=document.createElement("option"),c=k.getODFElementsWithXPath(a[f][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),c=0<c.length?c[0].textContent:a[f][0],d.textContent=f+1+": "+c,g.appendChild(d)};h.startSlideMode=function(b){var k=document.getElementById("pagelist"),a=h.odf_canvas.slidevisibilitycss().sheet;for(h.slide_mode=
b;0<a.cssRules.length;)a.deleteRule(0);h.selectSlide(0);"single"===h.slide_mode?(a.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),a.insertRule("draw|page[slide_current]  { z-index:2;}",1),a.insertRule("draw|page  { -webkit-transform: scale(1);}",2),h.fitToWindow(),g.addEventListener("resize",h.fitToWindow,!1)):"cont"===h.slide_mode&&g.removeEventListener("resize",h.fitToWindow,!1);h.fillPageList(h.odf_canvas.odfContainer().rootElement,k)};h.toggleToolbar=function(){var b,
g,a;b=h.odf_canvas.slidevisibilitycss().sheet;g=-1;for(a=0;a<b.cssRules.length;a+=1)if(".toolbar"===b.cssRules[a].cssText.substring(0,8)){g=a;break}-1<g?b.deleteRule(g):b.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};h.fitToWindow=function(){var b=h.getPages(h.root()),k=(g.innerHeight-40)/b[0][1].clientHeight,b=(g.innerWidth-10)/b[0][1].clientWidth,k=k<b?k:b,b=h.odf_canvas.slidevisibilitycss().sheet;b.deleteRule(2);b.insertRule("draw|page { \n-moz-transform: scale("+
k+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+k+"); -o-transform-origin: 0% 0%; -o-transform: scale("+k+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+k+"); }",2)};h.load=function(b){h.odf_canvas.load(b)};h.odf_element=l;h.odf_canvas=new odf.OdfCanvas(h.odf_element);h.odf_canvas.addListener("statereadychange",h.setInitialSlideMode);h.slide_mode="undefined";document.addEventListener("keydown",h.keyDownHandler,!1)}}();
// Input 80
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(k,g){function l(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function h(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(){var a=k.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!q)||(a=a.getRangeAt(0),q.setPoint(a.startContainer,a.startOffset))}function n(){var a=k.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();q&&q.node()&&(b=q.node(),c=b.ownerDocument.createRange(),
c.setStart(b,q.position()),c.collapse(!0),a.addRange(c))}function a(a){var c=a.charCode||a.keyCode;if(q=null,q&&37===c)b(),q.stepBackward(),n();else if(16<=c&&20>=c||33<=c&&40>=c)return;h(a)}function f(a){h(a)}function d(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&d(b),b=b.nextSibling||b.parentNode;var c,e,f,b=a.attributes;c="";for(f=b.length-1;0<=f;f-=1)e=b.item(f),c=c+" "+e.nodeName+'="'+e.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(e=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&e.test(c.nodeValue)&&c.parentNode.removeChild(c)}function c(a,b){for(var d=a.firstChild,e,f,g;d&&d!==a;){if(d.nodeType===Node.ELEMENT_NODE)for(c(d,b),e=d.attributes,g=e.length-1;0<=g;g-=1)f=e.item(g),"http://www.w3.org/2000/xmlns/"!==f.namespaceURI||b[f.nodeValue]||(b[f.nodeValue]=f.localName);d=d.nextSibling||d.parentNode}}function t(){var a=k.ownerDocument.createElement("style"),b;b={};c(k,b);
var d={},f,h,m=0;for(f in b)if(b.hasOwnProperty(f)&&f){h=b[f];if(!h||d.hasOwnProperty(h)||"xmlns"===h){do h="ns"+m,m+=1;while(d.hasOwnProperty(h));b[f]=h}d[h]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+e;a.appendChild(k.ownerDocument.createTextNode(b));g=g.parentNode.replaceChild(a,g)}var e,r,m,q=null;k.id||(k.id="xml"+String(Math.random()).substring(2));r="#"+k.id+" ";e=r+"*,"+r+":visited, "+r+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
r+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+r+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+r+"{overflow: auto;}\n";(function(b){l(b,"click",f);l(b,"keydown",a);l(b,"drop",h);l(b,"dragend",h);l(b,"beforepaste",h);l(b,"paste",h)})(k);this.updateCSS=t;this.setXML=function(a){a=a.documentElement||a;m=a=k.ownerDocument.importNode(a,!0);for(d(a);k.lastChild;)k.removeChild(k.lastChild);k.appendChild(a);t();q=new core.PositionIterator(a)};this.getXML=
function(){return m}};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(k,g){};gui.UndoManager.prototype.unsubscribe=function(k,g){};gui.UndoManager.prototype.setOdtDocument=function(k){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(k){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(k){};gui.UndoManager.prototype.moveBackward=function(k){};gui.UndoManager.prototype.onOperationExecuted=function(k){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
// Input 82
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
gui.UndoStateRules=function(){function k(g){return g.spec().optype}function g(g){switch(k(g)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=k;this.isEditOperation=g;this.isPartOfOperationSet=function(l,h){if(g(l)){if(0===h.length)return!0;var b;if(b=g(h[h.length-1]))a:{b=h.filter(g);var n=k(l),a;b:switch(n){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&n===k(b[0])){if(1===b.length){b=!0;break a}n=b[b.length-2].spec().position;
b=b[b.length-1].spec().position;a=l.spec().position;if(b===a-(b-n)){b=!0;break a}}b=!1}return b}return!0}};
// Input 83
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
gui.TrivialUndoManager=function(k){function g(){s.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:a.hasUndoStates(),redoAvailable:a.hasRedoStates()})}function l(){r!==c&&r!==m[m.length-1]&&m.push(r)}function h(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);f.normalizeTextNodes(b)}function b(a){return Object.keys(a).map(function(b){return a[b]})}function n(a){function c(a){var b=a.spec();if(g[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete g[b.memberid],h-=1);break;case "MoveCursor":f[b.memberid]||(f[b.memberid]=a)}}var d={},f={},g={},h,m=a.pop();e.getCursors().forEach(function(a){g[a.getMemberId()]=!0});for(h=Object.keys(g).length;m&&0<h;)m.reverse(),m.forEach(c),m=a.pop();return b(d).concat(b(f))}var a=this,f=new core.DomUtils,d,c=[],t,e,r=[],m=[],q=[],s=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=k||new gui.UndoStateRules;this.subscribe=function(a,b){s.subscribe(a,b)};this.unsubscribe=function(a,b){s.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<m.length};this.hasRedoStates=function(){return 0<q.length};this.setOdtDocument=function(a){e=a};this.resetInitialState=function(){m.length=0;q.length=0;c.length=0;r.length=0;d=null;g()};this.saveInitialState=function(){var a=e.getOdfCanvas().odfContainer(),b=e.getOdfCanvas().getAnnotationManager();b&&b.forgetAnnotations();d=a.rootElement.cloneNode(!0);
e.getOdfCanvas().refreshAnnotations();a=d;f.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(h);f.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(h);l();m.unshift(c);r=c=n(m);m.length=0;q.length=0;g()};this.setPlaybackFunction=function(a){t=a};this.onOperationExecuted=function(a){q.length=0;w.isEditOperation(a)&&r===c||!w.isPartOfOperationSet(a,r)?(l(),r=[a],m.push(r),s.emit(gui.UndoManager.signalUndoStateCreated,{operations:r}),g()):(r.push(a),s.emit(gui.UndoManager.signalUndoStateModified,
{operations:r}))};this.moveForward=function(a){for(var b=0,c;a&&q.length;)c=q.pop(),m.push(c),c.forEach(t),a-=1,b+=1;b&&(r=m[m.length-1],g());return b};this.moveBackward=function(a){for(var b=e.getOdfCanvas(),f=b.odfContainer(),h=0;a&&m.length;)q.push(m.pop()),a-=1,h+=1;h&&(f.setRootElement(d.cloneNode(!0)),b.setOdfContainer(f,!0),s.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),e.getCursors().forEach(function(a){e.removeCursor(a.getMemberId())}),c.forEach(t),m.forEach(function(a){a.forEach(t)}),
b.refreshCSS(),r=m[m.length-1]||c,g());return h}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
// Input 84
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("odf.OdfUtils");runtime.loadClass("gui.SelectionMover");runtime.loadClass("gui.StyleHelper");runtime.loadClass("core.PositionFilterChain");
ops.OdtDocument=function(k){function g(){var a=k.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function l(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var f=d[a].getNode();return b(c)===b(f)?t:e}}function h(a){var b=
gui.SelectionMover.createPositionIterator(g());for(a+=1;0<a&&b.nextPosition();)1===r.acceptPosition(b)&&(a-=1);return b}function b(a){return f.getParagraphElement(a)}function n(a){return k.getFormatting().getStyleElement(a,"paragraph")}var a=this,f,d={},c=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalStyleCreated,
ops.OdtDocument.signalStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),t=core.PositionFilter.FilterResult.FILTER_ACCEPT,e=core.PositionFilter.FilterResult.FILTER_REJECT,r;this.getIteratorAtPosition=h;this.upgradeWhitespacesAtPosition=function(a){a=h(a);var b,c,d;a.previousPosition();a.previousPosition();for(d=-1;1>=d;d+=1){b=a.container();c=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[c]&&f.isSignificantWhitespace(b,
c)){runtime.assert(" "===b.data[c],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var e=b.ownerDocument.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s");e.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(c,1);0<c&&(b=b.splitText(c));b.parentNode.insertBefore(e,b);b=e;a.moveToEndOfNode(b)}a.nextPosition()}};this.getParagraphStyleElement=n;this.getParagraphElement=b;this.getParagraphStyleAttributes=function(a){return(a=n(a))?k.getFormatting().getInheritedStyleAttributes(a):
null};this.getPositionInTextNode=function(a,b){var c=gui.SelectionMover.createPositionIterator(g()),e=null,f,h=0,k=null;runtime.assert(0<=a,"position must be >= 0");1===r.acceptPosition(c)?(f=c.container(),f.nodeType===Node.TEXT_NODE&&(e=f,h=0)):a+=1;for(;0<a||null===e;){if(!c.nextPosition())return null;if(1===r.acceptPosition(c))if(a-=1,f=c.container(),f.nodeType===Node.TEXT_NODE)f!==e?(e=f,h=c.domOffset()):h+=1;else if(null!==e){if(0===a){h=e.length;break}e=null}else if(0===a){e=g().ownerDocument.createTextNode("");
f.insertBefore(e,c.rightNode());h=0;break}}if(null===e)return null;if(b&&d[b]){for(k=d[b].getNode();0===h&&k.nextSibling&&"cursor"===k.nextSibling.localName;)k.parentNode.insertBefore(k,k.nextSibling.nextSibling);k&&0<e.length&&(e=g().ownerDocument.createTextNode(""),h=0,k.parentNode.insertBefore(e,k.nextSibling))}for(;0===h&&(e.previousSibling&&"cursor"===e.previousSibling.localName)&&(f=e.previousSibling,0<e.length&&(e=g().ownerDocument.createTextNode("")),f.parentNode.insertBefore(e,f),k!==f););
for(;e.previousSibling&&e.previousSibling.nodeType===Node.TEXT_NODE;)e.previousSibling.appendData(e.data),h=e.length+e.previousSibling.length,e=e.previousSibling,e.parentNode.removeChild(e.nextSibling);return{textNode:e,offset:h}};this.fixCursorPositions=function(b){var c=a.getPositionFilter(),e,f,g;for(e in d)d.hasOwnProperty(e)&&(f=d[e],g=f.getStepCounter(),g.isPositionWalkable(c)?0===a.getCursorSelection(e).length&&f.move(0):(g=g.countStepsToValidPosition(c),f.move(g),e===b&&a.emit(ops.OdtDocument.signalCursorMoved,
f)))};this.getWalkableParagraphLength=function(a){var c=h(0),d=0;c.setUnfilteredPosition(a,0);do{if(b(c.container())!==a)break;1===r.acceptPosition(c)&&(d+=1)}while(c.nextPosition());return d};this.getDistanceFromCursor=function(a,b,c){a=d[a];var e=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,e=a(b,c,r));return e};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,g(),0)};this.getCursorSelection=
function(a){var b;a=d[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(g(),0,r),b=b(a.getAnchorNode(),0,r));return{position:c+b,length:-b}};this.getPositionFilter=function(){return r};this.getOdfCanvas=function(){return k};this.getRootNode=g;this.getDOM=function(){return g().ownerDocument};this.getCursor=function(a){return d[a]};this.getCursors=function(){var a=[],b;for(b in d)d.hasOwnProperty(b)&&a.push(d[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");
var b=a.getStepCounter().countForwardSteps(1,r),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!d[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);a.move(b);d[c]=a};this.removeCursor=function(b){var c=d[b];return c?(c.removeFromOdtDocument(),delete d[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=k.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=
b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return k.getFormatting()};this.getTextElements=function(a,b){return f.getTextElements(a,b)};this.getParagraphElements=function(a){return f.getParagraphElements(a)};this.emit=function(a,b){c.emit(a,b)};this.subscribe=function(a,b){c.subscribe(a,b)};this.unsubscribe=function(a,b){c.unsubscribe(a,b)};this.createRootFilter=
function(a){return new l(a)};r=new function(){function a(b,c,d){var g,h;if(c&&(g=f.lookLeftForCharacter(c),1===g||2===g&&(f.scanRightForAnyCharacter(d)||f.scanRightForAnyCharacter(f.nextNode(b)))))return t;g=null===c&&f.isParagraph(b);h=f.lookRightForCharacter(d);if(g)return h?t:f.scanRightForAnyCharacter(d)?e:t;if(!h)return e;c=c||f.previousNode(b);return f.scanLeftForAnyCharacter(c)?e:t}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,h,k,l;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return e;
if(d===Node.TEXT_NODE){if(!f.isGroupingElement(c.parentNode)||f.isWithinTrackedChanges(c.parentNode,g()))return e;d=b.unfilteredDomOffset();h=c.data;runtime.assert(d!==h.length,"Unexpected offset.");if(0<d){b=h.substr(d-1,1);if(!f.isODFWhitespace(b))return t;if(1<d)if(b=h.substr(d-2,1),!f.isODFWhitespace(b))k=t;else{if(!f.isODFWhitespace(h.substr(0,d)))return e}else l=f.previousNode(c),f.scanLeftForNonWhitespace(l)&&(k=t);if(k===t)return f.isTrailingWhitespace(c,d)?e:t;k=h.substr(d,1);return f.isODFWhitespace(k)?
e:f.scanLeftForAnyCharacter(f.previousNode(c))?e:t}l=b.leftNode();k=c;c=c.parentNode;k=a(c,l,k)}else!f.isGroupingElement(c)||f.isWithinTrackedChanges(c,g())?k=e:(l=b.leftNode(),k=b.rightNode(),k=a(c,l,k));return k}};f=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";
ops.OdtDocument.signalStyleCreated="style/created";ops.OdtDocument.signalStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";(function(){return ops.OdtDocument})();
// Input 85
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
runtime.loadClass("ops.TrivialUserModel");runtime.loadClass("ops.TrivialOperationRouter");runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OdtDocument");
ops.Session=function(k){var g=new ops.OperationFactory,l=new ops.OdtDocument(k),h=new ops.TrivialUserModel,b=null;this.setUserModel=function(b){h=b};this.setOperationFactory=function(h){g=h;b&&b.setOperationFactory(g)};this.setOperationRouter=function(h){b=h;h.setPlaybackFunction(function(a){a.execute(l);l.emit(ops.OdtDocument.signalOperationExecuted,a)});h.setOperationFactory(g)};this.getUserModel=function(){return h};this.getOperationFactory=function(){return g};this.getOdtDocument=function(){return l};
this.enqueue=function(g){b.push(g)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 86
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\n\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 10;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: inline-block;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
