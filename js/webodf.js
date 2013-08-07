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
function Runtime(){}Runtime.ByteArray=function(l){};Runtime.prototype.getVariable=function(l){};Runtime.prototype.toJson=function(l){};Runtime.prototype.fromJson=function(l){};Runtime.ByteArray.prototype.slice=function(l,f){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(l){};Runtime.prototype.byteArrayFromString=function(l,f){};Runtime.prototype.byteArrayToString=function(l,f){};Runtime.prototype.concatByteArrays=function(l,f){};
Runtime.prototype.read=function(l,f,m,g){};Runtime.prototype.readFile=function(l,f,m){};Runtime.prototype.readFileSync=function(l,f){};Runtime.prototype.loadXML=function(l,f){};Runtime.prototype.writeFile=function(l,f,m){};Runtime.prototype.isFile=function(l,f){};Runtime.prototype.getFileSize=function(l,f){};Runtime.prototype.deleteFile=function(l,f){};Runtime.prototype.log=function(l,f){};Runtime.prototype.setTimeout=function(l,f){};Runtime.prototype.clearTimeout=function(l){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(l){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(l,f,m){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(l,f){function m(b){var a="",e,d=b.length;for(e=0;e<d;e+=1)a+=String.fromCharCode(b[e]&255);return a}function g(b){var a="",e,d=b.length,c,g,h,s;for(e=0;e<d;e+=1)c=b[e],128>c?a+=String.fromCharCode(c):(e+=1,g=b[e],194<=c&&224>c?a+=String.fromCharCode((c&31)<<6|g&63):(e+=1,h=b[e],224<=c&&240>c?a+=String.fromCharCode((c&15)<<12|(g&63)<<6|h&63):(e+=1,s=b[e],240<=c&&245>c&&(c=(c&7)<<18|(g&63)<<12|(h&63)<<6|s&63,c-=65536,a+=String.fromCharCode((c>>10)+55296,(c&1023)+56320)))));
return a}var b;"utf8"===f?b=g(l):("binary"!==f&&this.log("Unsupported encoding: "+f),b=m(l));return b};Runtime.getVariable=function(l){try{return eval(l)}catch(f){}};Runtime.toJson=function(l){return JSON.stringify(l)};Runtime.fromJson=function(l){return JSON.parse(l)};Runtime.getFunctionName=function(l){return void 0===l.name?(l=/function\s+(\w+)/.exec(l))&&l[1]:l.name};
function BrowserRuntime(l){function f(a,e){var d,c,b;void 0!==e?b=a:e=a;l?(c=l.ownerDocument,b&&(d=c.createElement("span"),d.className=b,d.appendChild(c.createTextNode(b)),l.appendChild(d),l.appendChild(c.createTextNode(" "))),d=c.createElement("span"),0<e.length&&"<"===e[0]?d.innerHTML=e:d.appendChild(c.createTextNode(e)),l.appendChild(d),l.appendChild(c.createElement("br"))):console&&console.log(e);"alert"===b&&alert(e)}function m(a,e,d){function c(){var c;4===f.readyState&&(0!==f.status||f.responseText?
200===f.status||0===f.status?(c="binary"===e?null!==f.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(f.responseBody)).toArray():g.byteArrayFromString(f.responseText,"binary"):f.responseText,b[a]=c,d(null,c)):d(f.responseText||f.statusText):d("File "+a+" is empty."))}if(b.hasOwnProperty(a))d(null,b[a]);else{var f=new XMLHttpRequest;f.open("GET",a,!0);f.onreadystatechange=c;f.overrideMimeType&&("binary"!==e?f.overrideMimeType("text/plain; charset="+e):f.overrideMimeType("text/plain; charset=x-user-defined"));
try{f.send(null)}catch(h){d(h.message)}}}var g=this,b={},k=window.ArrayBuffer&&window.Uint8Array;k&&(Uint8Array.prototype.slice=function(a,e){void 0===e&&(void 0===a&&(a=0),e=this.length);var d=this.subarray(a,e),c,b;e-=a;c=new Uint8Array(new ArrayBuffer(e));for(b=0;b<e;b+=1)c[b]=d[b];return c});this.ByteArray=k?function(a){return new Uint8Array(new ArrayBuffer(a))}:function(a){var e=[];e.length=a;return e};this.concatByteArrays=k?function(a,e){var d,c=a.length,b=e.length,h=new this.ByteArray(c+b);
for(d=0;d<c;d+=1)h[d]=a[d];for(d=0;d<b;d+=1)h[d+c]=e[d];return h}:function(a,e){return a.concat(e)};this.byteArrayFromArray=function(a){return a.slice()};this.byteArrayFromString=function(a,e){var d;if("utf8"===e){d=a.length;var c,b,h,f=0;for(b=0;b<d;b+=1)h=a.charCodeAt(b),f+=1+(128<h)+(2048<h);c=new g.ByteArray(f);for(b=f=0;b<d;b+=1)h=a.charCodeAt(b),128>h?(c[f]=h,f+=1):2048>h?(c[f]=192|h>>>6,c[f+1]=128|h&63,f+=2):(c[f]=224|h>>>12&15,c[f+1]=128|h>>>6&63,c[f+2]=128|h&63,f+=3)}else for("binary"!==
e&&g.log("unknown encoding: "+e),d=a.length,c=new g.ByteArray(d),b=0;b<d;b+=1)c[b]=a.charCodeAt(b)&255;return d=c};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=m;this.read=function(a,e,d,c){function f(){var n;4===h.readyState&&(0!==h.status||h.responseText?200===h.status||0===h.status?(h.response?(n=h.response,n=new Uint8Array(n)):n=null!==h.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(h.responseBody)).toArray():g.byteArrayFromString(h.responseText,"binary"),b[a]=n,c(null,n.slice(e,e+d))):c(h.responseText||h.statusText):c("File "+a+" is empty."))}if(b.hasOwnProperty(a))c(null,b[a].slice(e,e+d));else{var h=new XMLHttpRequest;h.open("GET",a,!0);h.onreadystatechange=f;h.overrideMimeType&&h.overrideMimeType("text/plain; charset=x-user-defined");h.responseType="arraybuffer";try{h.send(null)}catch(s){c(s.message)}}};this.readFileSync=function(a,e){var d=new XMLHttpRequest,
c;d.open("GET",a,!1);d.overrideMimeType&&("binary"!==e?d.overrideMimeType("text/plain; charset="+e):d.overrideMimeType("text/plain; charset=x-user-defined"));try{if(d.send(null),200===d.status||0===d.status)c=d.responseText}catch(b){}return c};this.writeFile=function(a,e,d){b[a]=e;var c=new XMLHttpRequest;c.open("PUT",a,!0);c.onreadystatechange=function(){4===c.readyState&&(0!==c.status||c.responseText?200<=c.status&&300>c.status||0===c.status?d(null):d("Status "+String(c.status)+": "+c.responseText||
c.statusText):d("File "+a+" is empty."))};e=e.buffer&&!c.sendAsBinary?e.buffer:g.byteArrayToString(e,"binary");try{c.sendAsBinary?c.sendAsBinary(e):c.send(e)}catch(f){g.log("HUH? "+f+" "+e),d(f.message)}};this.deleteFile=function(a,e){delete b[a];var d=new XMLHttpRequest;d.open("DELETE",a,!0);d.onreadystatechange=function(){4===d.readyState&&(200>d.status&&300<=d.status?e(d.responseText):e(null))};d.send(null)};this.loadXML=function(a,e){var d=new XMLHttpRequest;d.open("GET",a,!0);d.overrideMimeType&&
d.overrideMimeType("text/xml");d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200===d.status||0===d.status?e(null,d.responseXML):e(d.responseText):e("File "+a+" is empty."))};try{d.send(null)}catch(c){e(c.message)}};this.isFile=function(a,e){g.getFileSize(a,function(a){e(-1!==a)})};this.getFileSize=function(a,e){var d=new XMLHttpRequest;d.open("HEAD",a,!0);d.onreadystatechange=function(){if(4===d.readyState){var c=d.getResponseHeader("Content-Length");c?e(parseInt(c,
10)):m(a,"binary",function(c,a){c?e(-1):e(a.length)})}};d.send(null)};this.log=f;this.assert=function(a,e,d){if(!a)throw f("alert","ASSERTION FAILED:\n"+e),d&&d(),e;};this.setTimeout=function(a,e){return setTimeout(function(){a()},e)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){f("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function l(a,d,c){a=g.resolve(b,a);"binary"!==d?m.readFile(a,d,c):m.readFile(a,null,c)}var f=this,m=require("fs"),g=require("path"),b="",k,a;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var d=new Buffer(a.length),c,b=a.length;for(c=0;c<b;c+=1)d[c]=a[c];return d};this.concatByteArrays=function(a,d){var c=new Buffer(a.length+d.length);a.copy(c,0,0);d.copy(c,a.length,0);return c};this.byteArrayFromString=function(a,d){return new Buffer(a,
d)};this.byteArrayToString=function(a,d){return a.toString(d)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=l;this.loadXML=function(a,d){l(a,"utf-8",function(c,a){if(c)return d(c);d(null,f.parseXML(a))})};this.writeFile=function(a,d,c){a=g.resolve(b,a);m.writeFile(a,d,"binary",function(a){c(a||null)})};this.deleteFile=function(a,d){a=g.resolve(b,a);m.unlink(a,d)};this.read=function(a,d,c,f){a=g.resolve(b,a);m.open(a,"r+",666,function(a,
e){if(a)f(a);else{var b=new Buffer(c);m.read(e,b,0,c,d,function(a){m.close(e);f(a,b)})}})};this.readFileSync=function(a,d){return d?"binary"===d?m.readFileSync(a,null):m.readFileSync(a,d):""};this.isFile=function(a,d){a=g.resolve(b,a);m.stat(a,function(a,e){d(!a&&e.isFile())})};this.getFileSize=function(a,d){a=g.resolve(b,a);m.stat(a,function(a,e){a?d(-1):d(e.size)})};this.log=function(a,d){var c;void 0!==d?c=a:d=a;"alert"===c&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(d+
"\n");"alert"===c&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,d,c){a||(process.stderr.write("ASSERTION FAILED: "+d),c&&c())};this.setTimeout=function(a,d){return setTimeout(function(){a()},d)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){b=a};this.currentDirectory=function(){return b};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=
function(a){return k.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};k=new (require("xmldom").DOMParser);a=f.parseXML("<a/>").implementation}
function RhinoRuntime(){function l(a,e){var d;void 0!==e?d=a:e=a;"alert"===d&&print("\n!!!!! ALERT !!!!!");print(e);"alert"===d&&print("!!!!! ALERT !!!!!")}var f=this,m=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),g,b,k="";m.setValidating(!1);m.setNamespaceAware(!0);m.setExpandEntityReferences(!1);m.setSchema(null);b=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,e){var d=new Packages.java.io.FileReader(e);return new Packages.org.xml.sax.InputSource(d)}});g=m.newDocumentBuilder();
g.setEntityResolver(b);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,e){var d=[],c,b=a.length;for(c=0;c<b;c+=1)d[c]=a.charCodeAt(c)&255;return d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,e){return a.concat(e)};this.loadXML=function(a,e){var d=new Packages.java.io.File(a),c;try{c=g.parse(d)}catch(b){print(b);
e(b);return}e(null,c)};this.readFile=function(a,e,d){k&&(a=k+"/"+a);var c=new Packages.java.io.File(a),b="binary"===e?"latin1":e;c.isFile()?(a=readFile(a,b),"binary"===e&&(a=f.byteArrayFromString(a,"binary")),d(null,a)):d(a+" is not a file.")};this.writeFile=function(a,e,d){k&&(a=k+"/"+a);a=new Packages.java.io.FileOutputStream(a);var c,b=e.length;for(c=0;c<b;c+=1)a.write(e[c]);a.close();d(null)};this.deleteFile=function(a,e){k&&(a=k+"/"+a);(new Packages.java.io.File(a))["delete"]()?e(null):e("Could not delete "+
a)};this.read=function(a,e,d,c){k&&(a=k+"/"+a);var b;b=a;var h="binary";(new Packages.java.io.File(b)).isFile()?("binary"===h&&(h="latin1"),b=readFile(b,h)):b=null;b?c(null,this.byteArrayFromString(b.substring(e,e+d),"binary")):c("Cannot read "+a)};this.readFileSync=function(a,b){return b?readFile(a,b):""};this.isFile=function(a,b){k&&(a=k+"/"+a);var d=new Packages.java.io.File(a);b(d.isFile())};this.getFileSize=function(a,b){k&&(a=k+"/"+a);var d=new Packages.java.io.File(a);b(d.length())};this.log=
l;this.assert=function(a,b,d){a||(l("alert","ASSERTION FAILED: "+b),d&&d())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){k=a};this.currentDirectory=function(){return k};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return g.getDOMImplementation()};this.parseXML=function(a){return g.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function l(f){var b=f[0],k;k=eval("if (typeof "+b+" === 'undefined') {eval('"+b+" = {};');}"+b);for(b=1;b<f.length-1;b+=1)k=k.hasOwnProperty(f[b])?k[f[b]]:k[f[b]]={};return k[f[f.length-1]]}var f={},m={};runtime.loadClass=function(g){function b(a){a=a.replace(/\./g,"/")+".js";var c=runtime.libraryPaths(),b,h,e;runtime.currentDirectory&&c.push(runtime.currentDirectory());for(b=0;b<c.length;b+=1){h=c[b];if(!m.hasOwnProperty(h))try{e=runtime.readFileSync(c[b]+"/manifest.js","utf8"),m[h]=
e&&e.length?eval(e):null}catch(n){m[h]=null,runtime.log("Cannot load manifest for "+h+".")}e=null;if((h=m[h])&&h.indexOf&&-1!==h.indexOf(a))return c[b]+"/"+a}return null}function k(a){var c,e;e=b(a);if(!e)throw a+" is not listed in any manifest.js.";try{c=runtime.readFileSync(e,"utf8")}catch(h){throw runtime.log("Error loading "+a+" "+h),h;}if(void 0===c)throw"Cannot load class "+a;c=c+("\n//# sourceURL="+e)+("\n//@ sourceURL="+e);try{c=eval(a+" = eval(code);")}catch(f){throw runtime.log("Error loading "+
a+" "+f),f;}return c}if(!IS_COMPILED_CODE&&!f.hasOwnProperty(g)){var a=g.split("."),e;e=l(a);if(!e&&(e=k(g),!e||Runtime.getFunctionName(e)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];f[g]=!0}}})();
(function(l){function f(f){if(f.length){var g=f[0];runtime.readFile(g,"utf8",function(b,k){function a(){var a;(a=eval(d))&&runtime.exit(a)}var e="",d=k;-1!==g.indexOf("/")&&(e=g.substring(0,g.indexOf("/")));runtime.setCurrentDirectory(e);b||null===d?(runtime.log(b),runtime.exit(1)):a.apply(null,f)})}}l=l?Array.prototype.slice.call(l):[];"NodeJSRuntime"===runtime.type()?f(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?f(l):f(l.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function l(a){var c=[],h,d=a.length;for(h=0;h<d;h+=1)c[h]=a.charCodeAt(h)&255;return c}function f(a){var c,h="",d,b=a.length-2;for(d=0;d<b;d+=3)c=a[d]<<16|a[d+1]<<8|a[d+2],h+=q[c>>>18],h+=q[c>>>12&63],h+=q[c>>>6&63],h+=q[c&63];d===b+1?(c=a[d]<<4,h+=q[c>>>6],h+=q[c&63],h+="=="):d===b&&(c=a[d]<<10|a[d+1]<<2,h+=q[c>>>12],h+=q[c>>>6&63],h+=q[c&63],h+="=");return h}function m(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var c=[],h=a.length%4,d,b=a.length,e;for(d=0;d<b;d+=4)e=(r[a.charAt(d)]||
0)<<18|(r[a.charAt(d+1)]||0)<<12|(r[a.charAt(d+2)]||0)<<6|(r[a.charAt(d+3)]||0),c.push(e>>16,e>>8&255,e&255);c.length-=[0,0,2,1][h];return c}function g(a){var c=[],h,d=a.length,b;for(h=0;h<d;h+=1)b=a[h],128>b?c.push(b):2048>b?c.push(192|b>>>6,128|b&63):c.push(224|b>>>12&15,128|b>>>6&63,128|b&63);return c}function b(a){var c=[],h,d=a.length,b,e,n;for(h=0;h<d;h+=1)b=a[h],128>b?c.push(b):(h+=1,e=a[h],224>b?c.push((b&31)<<6|e&63):(h+=1,n=a[h],c.push((b&15)<<12|(e&63)<<6|n&63)));return c}function k(a){return f(l(a))}
function a(a){return String.fromCharCode.apply(String,m(a))}function e(a){return b(l(a))}function d(a){a=b(a);for(var c="",h=0;h<a.length;)c+=String.fromCharCode.apply(String,a.slice(h,h+45E3)),h+=45E3;return c}function c(a,c,h){var d="",b,e,n;for(n=c;n<h;n+=1)c=a.charCodeAt(n)&255,128>c?d+=String.fromCharCode(c):(n+=1,b=a.charCodeAt(n)&255,224>c?d+=String.fromCharCode((c&31)<<6|b&63):(n+=1,e=a.charCodeAt(n)&255,d+=String.fromCharCode((c&15)<<12|(b&63)<<6|e&63)));return d}function t(a,h){function d(){var p=
n+b;p>a.length&&(p=a.length);e+=c(a,n,p);n=p;p=n===a.length;h(e,p)&&!p&&runtime.setTimeout(d,0)}var b=1E5,e="",n=0;a.length<b?h(c(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),d())}function h(a){return g(l(a))}function s(a){return String.fromCharCode.apply(String,g(a))}function n(a){return String.fromCharCode.apply(String,g(l(a)))}var q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=function(a){var c={},h,d;h=0;for(d=a.length;h<d;h+=1)c[a.charAt(h)]=h;return c}(q),w,
v,z=runtime.getWindow(),u,p;z&&z.btoa?(u=function(a){return z.btoa(a)},w=function(a){return u(n(a))}):(u=k,w=function(a){return f(h(a))});z&&z.atob?(p=function(a){return z.atob(a)},v=function(a){a=p(a);return c(a,0,a.length)}):(p=a,v=function(a){return d(m(a))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=f;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=m;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=g;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=b;this.convertUTF8StringToBase64=k;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=e;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=d;this.convertUTF8StringToUTF16String=t;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=h;this.convertUTF16ArrayToUTF8String=s;this.convertUTF16StringToUTF8String=n;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=v;this.fromBase64=a;this.toBase64=k;this.atob=
p;this.btoa=u;this.utob=n;this.btou=t;this.encode=w;this.encodeURI=function(a){return w(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return v(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function l(){this.dl=this.fc=0}function f(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function m(a,c,h,d){this.good_length=a;this.max_lazy=c;this.nice_length=h;this.max_chain=d}function g(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=b;this.off=0}var b=8192,k,a,e,d,c=null,t,h,s,n,q,r,w,v,z,u,p,y,D,H,A,N,C,P,B,J,U,da,T,ka,ca,W,O,ba,S,Q,F,M,L,K,Y,la,E,G,ea,ha,V,R,Z,X,na,qa,x,ia,ma,oa,I,ta=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ra=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],pa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ua=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],$;$=[new m(0,0,0,0),new m(4,4,8,4),new m(4,5,16,8),new m(4,6,32,32),new m(4,4,16,16),new m(8,16,32,32),new m(8,16,128,128),new m(8,32,128,256),new m(32,128,258,1024),new m(32,258,258,4096)];var fa=function(d){c[h+t++]=d;if(h+t===b){var n;if(0!==t){null!==k?(d=k,k=k.next):d=new g;
d.next=null;d.len=d.off=0;null===a?a=e=d:e=e.next=d;d.len=t-h;for(n=0;n<d.len;n++)d.ptr[n]=c[h+n];t=h=0}}},ja=function(a){a&=65535;h+t<b-2?(c[h+t++]=a&255,c[h+t++]=a>>>8):(fa(a&255),fa(a>>>8))},aa=function(){p=(p<<5^n[C+3-1]&255)&8191;y=w[32768+p];w[C&32767]=y;w[32768+p]=C},ga=function(a,c){z>16-c?(v|=a<<z,ja(v),v=a>>16-z,z+=c-16):(v|=a<<z,z+=c)},sa=function(a,c){ga(c[a].fc,c[a].dl)},Aa=function(a,c,h){return a[c].fc<a[h].fc||a[c].fc===a[h].fc&&E[c]<=E[h]},Ba=function(a,c,h){var d;for(d=0;d<h&&I<
oa.length;d++)a[c+d]=oa.charCodeAt(I++)&255;return d},xa=function(){var a,c,h=65536-J-C;if(-1===h)h--;else if(65274<=C){for(a=0;32768>a;a++)n[a]=n[a+32768];P-=32768;C-=32768;u-=32768;for(a=0;8192>a;a++)c=w[32768+a],w[32768+a]=32768<=c?c-32768:0;for(a=0;32768>a;a++)c=w[a],w[a]=32768<=c?c-32768:0;h+=32768}B||(a=Ba(n,C+J,h),0>=a?B=!0:J+=a)},Ca=function(a){var c=U,h=C,d,b=N,e=32506<C?C-32506:0,p=C+258,f=n[h+b-1],g=n[h+b];N>=ka&&(c>>=2);do if(d=a,n[d+b]===g&&n[d+b-1]===f&&n[d]===n[h]&&n[++d]===n[h+1]){h+=
2;d++;do++h;while(n[h]===n[++d]&&n[++h]===n[++d]&&n[++h]===n[++d]&&n[++h]===n[++d]&&n[++h]===n[++d]&&n[++h]===n[++d]&&n[++h]===n[++d]&&n[++h]===n[++d]&&h<p);d=258-(p-h);h=p-258;if(d>b){P=a;b=d;if(258<=d)break;f=n[h+b-1];g=n[h+b]}a=w[a&32767]}while(a>e&&0!==--c);return b},va=function(a,c){r[Z++]=c;0===a?ca[c].fc++:(a--,ca[G[c]+256+1].fc++,W[(256>a?ea[a]:ea[256+(a>>7)])&255].fc++,q[X++]=a,qa|=x);x<<=1;0===(Z&7)&&(R[na++]=qa,qa=0,x=1);if(2<T&&0===(Z&4095)){var h=8*Z,d=C-u,b;for(b=0;30>b;b++)h+=W[b].fc*
(5+ra[b]);h>>=3;if(X<parseInt(Z/2,10)&&h<parseInt(d/2,10))return!0}return 8191===Z||8192===X},ya=function(a,c){for(var h=K[c],d=c<<1;d<=Y;){d<Y&&Aa(a,K[d+1],K[d])&&d++;if(Aa(a,h,K[d]))break;K[c]=K[d];c=d;d<<=1}K[c]=h},Da=function(a,c){var h=0;do h|=a&1,a>>=1,h<<=1;while(0<--c);return h>>1},Ea=function(a,c){var h=[];h.length=16;var d=0,b;for(b=1;15>=b;b++)d=d+L[b-1]<<1,h[b]=d;for(d=0;d<=c;d++)b=a[d].dl,0!==b&&(a[d].fc=Da(h[b]++,b))},za=function(a){var c=a.dyn_tree,h=a.static_tree,d=a.elems,b,e=-1,
n=d;Y=0;la=573;for(b=0;b<d;b++)0!==c[b].fc?(K[++Y]=e=b,E[b]=0):c[b].dl=0;for(;2>Y;)b=K[++Y]=2>e?++e:0,c[b].fc=1,E[b]=0,ia--,null!==h&&(ma-=h[b].dl);a.max_code=e;for(b=Y>>1;1<=b;b--)ya(c,b);do b=K[1],K[1]=K[Y--],ya(c,1),h=K[1],K[--la]=b,K[--la]=h,c[n].fc=c[b].fc+c[h].fc,E[n]=E[b]>E[h]+1?E[b]:E[h]+1,c[b].dl=c[h].dl=n,K[1]=n++,ya(c,1);while(2<=Y);K[--la]=K[1];n=a.dyn_tree;b=a.extra_bits;var d=a.extra_base,h=a.max_code,p=a.max_length,f=a.static_tree,g,s,q,k,r=0;for(s=0;15>=s;s++)L[s]=0;n[K[la]].dl=0;
for(a=la+1;573>a;a++)g=K[a],s=n[n[g].dl].dl+1,s>p&&(s=p,r++),n[g].dl=s,g>h||(L[s]++,q=0,g>=d&&(q=b[g-d]),k=n[g].fc,ia+=k*(s+q),null!==f&&(ma+=k*(f[g].dl+q)));if(0!==r){do{for(s=p-1;0===L[s];)s--;L[s]--;L[s+1]+=2;L[p]--;r-=2}while(0<r);for(s=p;0!==s;s--)for(g=L[s];0!==g;)b=K[--a],b>h||(n[b].dl!==s&&(ia+=(s-n[b].dl)*n[b].fc,n[b].fc=s),g--)}Ea(c,e)},Fa=function(a,c){var h,d=-1,b,e=a[0].dl,n=0,p=7,f=4;0===e&&(p=138,f=3);a[c+1].dl=65535;for(h=0;h<=c;h++)b=e,e=a[h+1].dl,++n<p&&b===e||(n<f?S[b].fc+=n:0!==
b?(b!==d&&S[b].fc++,S[16].fc++):10>=n?S[17].fc++:S[18].fc++,n=0,d=b,0===e?(p=138,f=3):b===e?(p=6,f=3):(p=7,f=4))},Ga=function(){8<z?ja(v):0<z&&fa(v);z=v=0},Ha=function(a,c){var h,d=0,b=0,e=0,n=0,p,f;if(0!==Z){do 0===(d&7)&&(n=R[e++]),h=r[d++]&255,0===(n&1)?sa(h,a):(p=G[h],sa(p+256+1,a),f=ta[p],0!==f&&(h-=ha[p],ga(h,f)),h=q[b++],p=(256>h?ea[h]:ea[256+(h>>7)])&255,sa(p,c),f=ra[p],0!==f&&(h-=V[p],ga(h,f))),n>>=1;while(d<Z)}sa(256,a)},Ia=function(a,c){var h,d=-1,b,e=a[0].dl,n=0,p=7,f=4;0===e&&(p=138,
f=3);for(h=0;h<=c;h++)if(b=e,e=a[h+1].dl,!(++n<p&&b===e)){if(n<f){do sa(b,S);while(0!==--n)}else 0!==b?(b!==d&&(sa(b,S),n--),sa(16,S),ga(n-3,2)):10>=n?(sa(17,S),ga(n-3,3)):(sa(18,S),ga(n-11,7));n=0;d=b;0===e?(p=138,f=3):b===e?(p=6,f=3):(p=7,f=4)}},Ja=function(){var a;for(a=0;286>a;a++)ca[a].fc=0;for(a=0;30>a;a++)W[a].fc=0;for(a=0;19>a;a++)S[a].fc=0;ca[256].fc=1;qa=Z=X=na=ia=ma=0;x=1},wa=function(a){var h,c,d,b;b=C-u;R[na]=qa;za(Q);za(F);Fa(ca,Q.max_code);Fa(W,F.max_code);za(M);for(d=18;3<=d&&0===
S[ua[d]].dl;d--);ia+=3*(d+1)+14;h=ia+3+7>>3;c=ma+3+7>>3;c<=h&&(h=c);if(b+4<=h&&0<=u)for(ga(0+a,3),Ga(),ja(b),ja(~b),d=0;d<b;d++)fa(n[u+d]);else if(c===h)ga(2+a,3),Ha(O,ba);else{ga(4+a,3);b=Q.max_code+1;h=F.max_code+1;d+=1;ga(b-257,5);ga(h-1,5);ga(d-4,4);for(c=0;c<d;c++)ga(S[ua[c]].dl,3);Ia(ca,b-1);Ia(W,h-1);Ha(ca,W)}Ja();0!==a&&Ga()},Ka=function(d,b,n){var e,p,f;for(e=0;null!==a&&e<n;){p=n-e;p>a.len&&(p=a.len);for(f=0;f<p;f++)d[b+e+f]=a.ptr[a.off+f];a.off+=p;a.len-=p;e+=p;0===a.len&&(p=a,a=a.next,
p.next=k,k=p)}if(e===n)return e;if(h<t){p=n-e;p>t-h&&(p=t-h);for(f=0;f<p;f++)d[b+e+f]=c[h+f];h+=p;e+=p;t===h&&(t=h=0)}return e},La=function(c,b,e){var f;if(!d){if(!B){z=v=0;var g,q;if(0===ba[0].dl){Q.dyn_tree=ca;Q.static_tree=O;Q.extra_bits=ta;Q.extra_base=257;Q.elems=286;Q.max_length=15;Q.max_code=0;F.dyn_tree=W;F.static_tree=ba;F.extra_bits=ra;F.extra_base=0;F.elems=30;F.max_length=15;F.max_code=0;M.dyn_tree=S;M.static_tree=null;M.extra_bits=pa;M.extra_base=0;M.elems=19;M.max_length=7;for(q=g=M.max_code=
0;28>q;q++)for(ha[q]=g,f=0;f<1<<ta[q];f++)G[g++]=q;G[g-1]=q;for(q=g=0;16>q;q++)for(V[q]=g,f=0;f<1<<ra[q];f++)ea[g++]=q;for(g>>=7;30>q;q++)for(V[q]=g<<7,f=0;f<1<<ra[q]-7;f++)ea[256+g++]=q;for(f=0;15>=f;f++)L[f]=0;for(f=0;143>=f;)O[f++].dl=8,L[8]++;for(;255>=f;)O[f++].dl=9,L[9]++;for(;279>=f;)O[f++].dl=7,L[7]++;for(;287>=f;)O[f++].dl=8,L[8]++;Ea(O,287);for(f=0;30>f;f++)ba[f].dl=5,ba[f].fc=Da(f,5);Ja()}for(f=0;8192>f;f++)w[32768+f]=0;da=$[T].max_lazy;ka=$[T].good_length;U=$[T].max_chain;u=C=0;J=Ba(n,
0,65536);if(0>=J)B=!0,J=0;else{for(B=!1;262>J&&!B;)xa();for(f=p=0;2>f;f++)p=(p<<5^n[f]&255)&8191}a=null;h=t=0;3>=T?(N=2,A=0):(A=2,H=0);s=!1}d=!0;if(0===J)return s=!0,0}f=Ka(c,b,e);if(f===e)return e;if(s)return f;if(3>=T)for(;0!==J&&null===a;){aa();0!==y&&32506>=C-y&&(A=Ca(y),A>J&&(A=J));if(3<=A)if(q=va(C-P,A-3),J-=A,A<=da){A--;do C++,aa();while(0!==--A);C++}else C+=A,A=0,p=n[C]&255,p=(p<<5^n[C+1]&255)&8191;else q=va(0,n[C]&255),J--,C++;q&&(wa(0),u=C);for(;262>J&&!B;)xa()}else for(;0!==J&&null===a;){aa();
N=A;D=P;A=2;0!==y&&(N<da&&32506>=C-y)&&(A=Ca(y),A>J&&(A=J),3===A&&4096<C-P&&A--);if(3<=N&&A<=N){q=va(C-1-D,N-3);J-=N-1;N-=2;do C++,aa();while(0!==--N);H=0;A=2;C++;q&&(wa(0),u=C)}else 0!==H?va(0,n[C-1]&255)&&(wa(0),u=C):H=1,C++,J--;for(;262>J&&!B;)xa()}0===J&&(0!==H&&va(0,n[C-1]&255),wa(1),s=!0);return f+Ka(c,f+b,e-f)};this.deflate=function(h,p){var g,s;oa=h;I=0;"undefined"===String(typeof p)&&(p=6);(g=p)?1>g?g=1:9<g&&(g=9):g=6;T=g;B=d=!1;if(null===c){k=a=e=null;c=[];c.length=b;n=[];n.length=65536;
q=[];q.length=8192;r=[];r.length=32832;w=[];w.length=65536;ca=[];ca.length=573;for(g=0;573>g;g++)ca[g]=new l;W=[];W.length=61;for(g=0;61>g;g++)W[g]=new l;O=[];O.length=288;for(g=0;288>g;g++)O[g]=new l;ba=[];ba.length=30;for(g=0;30>g;g++)ba[g]=new l;S=[];S.length=39;for(g=0;39>g;g++)S[g]=new l;Q=new f;F=new f;M=new f;L=[];L.length=16;K=[];K.length=573;E=[];E.length=573;G=[];G.length=256;ea=[];ea.length=512;ha=[];ha.length=29;V=[];V.length=30;R=[];R.length=1024}var v=Array(1024),m=[],t=[];for(g=La(v,
0,v.length);0<g;){t.length=g;for(s=0;s<g;s++)t[s]=String.fromCharCode(v[s]);m[m.length]=t.join("");g=La(v,0,v.length)}oa=null;return m.join("")}};
// Input 4
core.ByteArray=function(l){this.pos=0;this.data=l;this.readUInt32LE=function(){this.pos+=4;var f=this.data,m=this.pos;return f[--m]<<24|f[--m]<<16|f[--m]<<8|f[--m]};this.readUInt16LE=function(){this.pos+=2;var f=this.data,m=this.pos;return f[--m]<<8|f[--m]}};
// Input 5
core.ByteArrayWriter=function(l){var f=this,m=new runtime.ByteArray(0);this.appendByteArrayWriter=function(f){m=runtime.concatByteArrays(m,f.getByteArray())};this.appendByteArray=function(f){m=runtime.concatByteArrays(m,f)};this.appendArray=function(f){m=runtime.concatByteArrays(m,runtime.byteArrayFromArray(f))};this.appendUInt16LE=function(g){f.appendArray([g&255,g>>8&255])};this.appendUInt32LE=function(g){f.appendArray([g&255,g>>8&255,g>>16&255,g>>24&255])};this.appendString=function(f){m=runtime.concatByteArrays(m,
runtime.byteArrayFromString(f,l))};this.getLength=function(){return m.length};this.getByteArray=function(){return m}};
// Input 6
core.RawInflate=function(){var l,f,m=null,g,b,k,a,e,d,c,t,h,s,n,q,r,w,v=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],z=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],u=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],p=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],y=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],H=function(){this.list=this.next=null},A=function(){this.n=this.b=this.e=0;this.t=null},N=function(a,c,h,d,b,e){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var n=Array(this.BMAX+1),f,p,g,s,q,k,r,v=Array(this.BMAX+1),m,l,t,w=new A,y=Array(this.BMAX);s=Array(this.N_MAX);var u,z=Array(this.BMAX+1),D,C,B;B=this.root=null;for(q=0;q<n.length;q++)n[q]=0;for(q=0;q<v.length;q++)v[q]=0;for(q=0;q<y.length;q++)y[q]=null;for(q=0;q<s.length;q++)s[q]=
0;for(q=0;q<z.length;q++)z[q]=0;f=256<c?a[256]:this.BMAX;m=a;l=0;q=c;do n[m[l]]++,l++;while(0<--q);if(n[0]==c)this.root=null,this.status=this.m=0;else{for(k=1;k<=this.BMAX&&0==n[k];k++);r=k;e<k&&(e=k);for(q=this.BMAX;0!=q&&0==n[q];q--);g=q;e>q&&(e=q);for(D=1<<k;k<q;k++,D<<=1)if(0>(D-=n[k])){this.status=2;this.m=e;return}if(0>(D-=n[q]))this.status=2,this.m=e;else{n[q]+=D;z[1]=k=0;m=n;l=1;for(t=2;0<--q;)z[t++]=k+=m[l++];m=a;q=l=0;do 0!=(k=m[l++])&&(s[z[k]++]=q);while(++q<c);c=z[g];z[0]=q=0;m=s;l=0;
s=-1;u=v[0]=0;t=null;for(C=0;r<=g;r++)for(a=n[r];0<a--;){for(;r>u+v[1+s];){u+=v[1+s];s++;C=(C=g-u)>e?e:C;if((p=1<<(k=r-u))>a+1)for(p-=a+1,t=r;++k<C&&!((p<<=1)<=n[++t]);)p-=n[t];u+k>f&&u<f&&(k=f-u);C=1<<k;v[1+s]=k;t=Array(C);for(p=0;p<C;p++)t[p]=new A;B=null==B?this.root=new H:B.next=new H;B.next=null;B.list=t;y[s]=t;0<s&&(z[s]=q,w.b=v[s],w.e=16+k,w.t=t,k=(q&(1<<u)-1)>>u-v[s],y[s-1][k].e=w.e,y[s-1][k].b=w.b,y[s-1][k].n=w.n,y[s-1][k].t=w.t)}w.b=r-u;l>=c?w.e=99:m[l]<h?(w.e=256>m[l]?16:15,w.n=m[l++]):
(w.e=b[m[l]-h],w.n=d[m[l++]-h]);p=1<<r-u;for(k=q>>u;k<C;k+=p)t[k].e=w.e,t[k].b=w.b,t[k].n=w.n,t[k].t=w.t;for(k=1<<r-1;0!=(q&k);k>>=1)q^=k;for(q^=k;(q&(1<<u)-1)!=z[s];)u-=v[s],s--}this.m=v[1];this.status=0!=D&&1!=g?1:0}}},C=function(c){for(;a<c;){var h=k,d;d=r.length==w?-1:r[w++];k=h|d<<a;a+=8}},P=function(a){return k&v[a]},B=function(c){k>>=c;a-=c},J=function(a,d,b){var p,g,k;if(0==b)return 0;for(k=0;;){C(n);g=h.list[P(n)];for(p=g.e;16<p;){if(99==p)return-1;B(g.b);p-=16;C(p);g=g.t[P(p)];p=g.e}B(g.b);
if(16==p)f&=32767,a[d+k++]=l[f++]=g.n;else{if(15==p)break;C(p);c=g.n+P(p);B(p);C(q);g=s.list[P(q)];for(p=g.e;16<p;){if(99==p)return-1;B(g.b);p-=16;C(p);g=g.t[P(p)];p=g.e}B(g.b);C(p);t=f-g.n-P(p);for(B(p);0<c&&k<b;)c--,t&=32767,f&=32767,a[d+k++]=l[f++]=l[t++]}if(k==b)return b}e=-1;return k},U,da=function(a,c,d){var b,e,f,g,k,r,v,m=Array(316);for(b=0;b<m.length;b++)m[b]=0;C(5);r=257+P(5);B(5);C(5);v=1+P(5);B(5);C(4);b=4+P(4);B(4);if(286<r||30<v)return-1;for(e=0;e<b;e++)C(3),m[D[e]]=P(3),B(3);for(;19>
e;e++)m[D[e]]=0;n=7;e=new N(m,19,19,null,null,n);if(0!=e.status)return-1;h=e.root;n=e.m;g=r+v;for(b=f=0;b<g;)if(C(n),k=h.list[P(n)],e=k.b,B(e),e=k.n,16>e)m[b++]=f=e;else if(16==e){C(2);e=3+P(2);B(2);if(b+e>g)return-1;for(;0<e--;)m[b++]=f}else{17==e?(C(3),e=3+P(3),B(3)):(C(7),e=11+P(7),B(7));if(b+e>g)return-1;for(;0<e--;)m[b++]=0;f=0}n=9;e=new N(m,r,257,z,u,n);0==n&&(e.status=1);if(0!=e.status)return-1;h=e.root;n=e.m;for(b=0;b<v;b++)m[b]=m[b+r];q=6;e=new N(m,v,0,p,y,q);s=e.root;q=e.m;return 0==q&&
257<r||0!=e.status?-1:J(a,c,d)};this.inflate=function(v,D){null==l&&(l=Array(65536));a=k=f=0;e=-1;d=!1;c=t=0;h=null;r=v;w=0;var H=new runtime.ByteArray(D);a:{var A,O;for(A=0;A<D&&(!d||-1!=e);){if(0<c){if(0!=e)for(;0<c&&A<D;)c--,t&=32767,f&=32767,H[0+A++]=l[f++]=l[t++];else{for(;0<c&&A<D;)c--,f&=32767,C(8),H[0+A++]=l[f++]=P(8),B(8);0==c&&(e=-1)}if(A==D)break}if(-1==e){if(d)break;C(1);0!=P(1)&&(d=!0);B(1);C(2);e=P(2);B(2);h=null;c=0}switch(e){case 0:O=H;var ba=0+A,S=D-A,Q=void 0,Q=a&7;B(Q);C(16);Q=
P(16);B(16);C(16);if(Q!=(~k&65535))O=-1;else{B(16);c=Q;for(Q=0;0<c&&Q<S;)c--,f&=32767,C(8),O[ba+Q++]=l[f++]=P(8),B(8);0==c&&(e=-1);O=Q}break;case 1:if(null!=h)O=J(H,0+A,D-A);else b:{O=H;ba=0+A;S=D-A;if(null==m){for(var F=void 0,Q=Array(288),F=void 0,F=0;144>F;F++)Q[F]=8;for(;256>F;F++)Q[F]=9;for(;280>F;F++)Q[F]=7;for(;288>F;F++)Q[F]=8;b=7;F=new N(Q,288,257,z,u,b);if(0!=F.status){alert("HufBuild error: "+F.status);O=-1;break b}m=F.root;b=F.m;for(F=0;30>F;F++)Q[F]=5;U=5;F=new N(Q,30,0,p,y,U);if(1<F.status){m=
null;alert("HufBuild error: "+F.status);O=-1;break b}g=F.root;U=F.m}h=m;s=g;n=b;q=U;O=J(O,ba,S)}break;case 2:O=null!=h?J(H,0+A,D-A):da(H,0+A,D-A);break;default:O=-1}if(-1==O)break a;A+=O}}r=null;return H}};
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
core.LoopWatchDog=function(l,f){var m=Date.now(),g=0;this.check=function(){var b;if(l&&(b=Date.now(),b-m>l))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<f&&(g+=1,g>f))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){this.hashString=function(l){var f=0,m,g;m=0;for(g=l.length;m<g;m+=1)f=(f<<5)-f+l.charCodeAt(m),f|=0;return f}};
// Input 9
core.DomUtils=function(){function l(f,m){if(f.nodeType===Node.TEXT_NODE)if(0===f.length)f.parentNode.removeChild(f);else if(m.nodeType===Node.TEXT_NODE)return m.insertData(0,f.data),f.parentNode.removeChild(f),m;return f}this.splitBoundaries=function(f){var m=[],g;if(f.startContainer.nodeType===Node.TEXT_NODE||f.endContainer.nodeType===Node.TEXT_NODE){g=f.endContainer;var b=f.endOffset;if(b<g.childNodes.length)for(g=g.childNodes[b],b=0;g.firstChild;)g=g.firstChild;else for(;g.lastChild;)g=g.lastChild,
b=g.nodeType===Node.TEXT_NODE?g.textContent.length:g.childNodes.length;f.setEnd(g,b);0!==f.endOffset&&(f.endContainer.nodeType===Node.TEXT_NODE&&f.endOffset!==f.endContainer.length)&&(m.push(f.endContainer.splitText(f.endOffset)),m.push(f.endContainer));0!==f.startOffset&&(f.startContainer.nodeType===Node.TEXT_NODE&&f.startOffset!==f.startContainer.length)&&(g=f.startContainer.splitText(f.startOffset),m.push(f.startContainer),m.push(g),f.setStart(g,0))}return m};this.containsRange=function(f,m){return 0>=
f.compareBoundaryPoints(f.START_TO_START,m)&&0<=f.compareBoundaryPoints(f.END_TO_END,m)};this.rangesIntersect=function(f,m){return 0>=f.compareBoundaryPoints(f.END_TO_START,m)&&0<=f.compareBoundaryPoints(f.START_TO_END,m)};this.getNodesInRange=function(f,m){var g=[],b,k=f.startContainer.ownerDocument.createTreeWalker(f.commonAncestorContainer,NodeFilter.SHOW_ALL,m,!1);for(b=k.currentNode=f.startContainer;b;){if(m(b)===NodeFilter.FILTER_ACCEPT)g.push(b);else if(m(b)===NodeFilter.FILTER_REJECT)break;
b=b.parentNode}g.reverse();for(b=k.nextNode();b;)g.push(b),b=k.nextNode();return g};this.normalizeTextNodes=function(f){f&&f.nextSibling&&(f=l(f,f.nextSibling));f&&f.previousSibling&&l(f.previousSibling,f)};this.rangeContainsNode=function(f,m){var g=m.ownerDocument.createRange(),b=m.nodeType===Node.TEXT_NODE?m.length:m.childNodes.length;g.setStart(f.startContainer,f.startOffset);g.setEnd(f.endContainer,f.endOffset);b=0===g.comparePoint(m,0)&&0===g.comparePoint(m,b);g.detach();return b};this.mergeIntoParent=
function(f){for(var m=f.parentNode;f.firstChild;)m.insertBefore(f.firstChild,f);m.removeChild(f);return m};this.getElementsByTagNameNS=function(f,m,g){return Array.prototype.slice.call(f.getElementsByTagNameNS(m,g))};this.rangeIntersectsNode=function(f,m){var g=m.nodeType===Node.TEXT_NODE?m.length:m.childNodes.length;return 0>=f.comparePoint(m,0)&&0<=f.comparePoint(m,g)}};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(l,f){function m(a){a.parentNode&&(e.push(a.previousSibling),e.push(a.nextSibling),a.parentNode.removeChild(a))}function g(a,c,d){if(c.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(c),"putCursorIntoTextNode: invalid container");var b=c.parentNode;runtime.assert(Boolean(b),"putCursorIntoTextNode: container without parent");runtime.assert(0<=d&&d<=c.length,"putCursorIntoTextNode: offset is out of bounds");0===d?b.insertBefore(a,c):(d!==c.length&&c.splitText(d),b.insertBefore(a,
c.nextSibling))}else if(c.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(c),"putCursorIntoContainer: invalid container");for(b=c.firstChild;null!==b&&0<d;)b=b.nextSibling,d-=1;c.insertBefore(a,b)}e.push(a.previousSibling);e.push(a.nextSibling)}var b=l.createElementNS("urn:webodf:names:cursor","cursor"),k=l.createElementNS("urn:webodf:names:cursor","anchor"),a,e=[],d,c,t=new core.DomUtils;this.getNode=function(){return b};this.getAnchorNode=function(){return k.parentNode?k:b};this.getSelectedRange=
function(){c?(d.setStartBefore(b),d.collapse(!0)):(d.setStartAfter(a?k:b),d.setEndBefore(a?b:k));return d};this.setSelectedRange=function(h,f){d&&d!==h&&d.detach();d=h;a=!1!==f;(c=h.collapsed)?(m(k),m(b),g(b,h.startContainer,h.startOffset)):(m(k),m(b),g(a?b:k,h.endContainer,h.endOffset),g(a?k:b,h.startContainer,h.startOffset));e.forEach(t.normalizeTextNodes);e.length=0};this.remove=function(){m(b);e.forEach(t.normalizeTextNodes);e.length=0};b.setAttributeNS("urn:webodf:names:cursor","memberId",f);
k.setAttributeNS("urn:webodf:names:cursor","memberId",f)};
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
core.EventNotifier=function(l){var f={};this.emit=function(m,g){var b,k;runtime.assert(f.hasOwnProperty(m),'unknown event fired "'+m+'"');k=f[m];for(b=0;b<k.length;b+=1)k[b](g)};this.subscribe=function(m,g){runtime.assert(f.hasOwnProperty(m),'tried to subscribe to unknown event "'+m+'"');f[m].push(g);runtime.log('event "'+m+'" subscribed.')};this.unsubscribe=function(m,g){var b;runtime.assert(f.hasOwnProperty(m),'tried to unsubscribe from unknown event "'+m+'"');b=f[m].indexOf(g);runtime.assert(-1!==
b,'tried to unsubscribe unknown callback from event "'+m+'"');-1!==b&&f[m].splice(b,1);runtime.log('event "'+m+'" unsubscribed.')};(function(){var m;for(m=0;m<l.length;m+=1)f[l[m]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var l=runtime.getWindow().document,f=l.getElementById("testarea");runtime.assert(!f,'Unclean test environment, found a div with id "testarea".');f=l.createElement("div");f.setAttribute("id","testarea");l.body.appendChild(f);return f};
core.UnitTest.cleanupTestAreaDiv=function(){var l=runtime.getWindow().document,f=l.getElementById("testarea");runtime.assert(!!f&&f.parentNode===l.body,'Test environment broken, found no div with id "testarea" below body.');l.body.removeChild(f)};
core.UnitTestRunner=function(){function l(d){a+=1;runtime.log("fail",d)}function f(a,c){var b;try{if(a.length!==c.length)return l("array of length "+a.length+" should be "+c.length+" long"),!1;for(b=0;b<a.length;b+=1)if(a[b]!==c[b])return l(a[b]+" should be "+c[b]+" at array index "+b),!1}catch(h){return!1}return!0}function m(a,c,b){var h=a.attributes,e=h.length,f,g,k;for(f=0;f<e;f+=1)if(g=h.item(f),"xmlns"!==g.prefix){k=c.getAttributeNS(g.namespaceURI,g.localName);if(!c.hasAttributeNS(g.namespaceURI,
g.localName))return l("Attribute "+g.localName+" with value "+g.value+" was not present"),!1;if(k!==g.value)return l("Attribute "+g.localName+" was "+k+" should be "+g.value),!1}return b?!0:m(c,a,!0)}function g(a,c){if(a.nodeType!==c.nodeType)return l(a.nodeType+" should be "+c.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===c.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==c.namespaceURI||a.localName!==c.localName)return l(a.namespaceURI+
" should be "+c.namespaceURI),!1;if(!m(a,c,!1))return!1;for(var b=a.firstChild,h=c.firstChild;b;){if(!h||!g(b,h))return!1;b=b.nextSibling;h=h.nextSibling}return h?!1:!0}function b(a,c){return 0===c?a===c&&1/a===1/c:a===c?!0:"number"===typeof c&&isNaN(c)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(c)===Object.prototype.toString.call([])?f(a,c):"object"===typeof c&&"object"===typeof a?c.constructor===Element||c.constructor===Node?g(c,a):e(c,a):!1}function k(a,c,e){"string"===typeof c&&
"string"===typeof e||runtime.log("WARN: shouldBe() expects string arguments");var h,f;try{f=eval(c)}catch(n){h=n}a=eval(e);h?l(c+" should be "+a+". Threw exception "+h):b(f,a)?runtime.log("pass",c+" is "+e):String(typeof f)===String(typeof a)?(e=0===f&&0>1/f?"-0":String(f),l(c+" should be "+a+". Was "+e+".")):l(c+" should be "+a+" (of type "+typeof a+"). Was "+f+" (of type "+typeof f+").")}var a=0,e;e=function(a,c){var e=Object.keys(a),h=Object.keys(c);e.sort();h.sort();return f(e,h)&&Object.keys(a).every(function(h){var e=
a[h],f=c[h];return b(e,f)?!0:(l(e+" should be "+f+" for key "+h),!1)})};this.areNodesEqual=g;this.shouldBeNull=function(a,c){k(a,c,"null")};this.shouldBeNonNull=function(a,c){var b,h;try{h=eval(c)}catch(e){b=e}b?l(c+" should be non-null. Threw exception "+b):null!==h?runtime.log("pass",c+" is non-null."):l(c+" should be non-null. Was "+h)};this.shouldBe=k;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function l(f,b){return"<span style='color:blue;cursor:pointer' onclick='"+b+"'>"+f+"</span>"}var f=0,m={};this.runTests=function(g,b,k){function a(h){if(0===h.length)m[e]=t,f+=d.countFailedTests(),b();else{s=h[0];var n=Runtime.getFunctionName(s);runtime.log("Running "+n);q=d.countFailedTests();c.setUp();s(function(){c.tearDown();t[n]=q===d.countFailedTests();a(h.slice(1))})}}var e=Runtime.getFunctionName(g),d=new core.UnitTestRunner,c=new g(d),t={},h,s,n,q,r="BrowserRuntime"===
runtime.type();if(m.hasOwnProperty(e))runtime.log("Test "+e+" has already run.");else{r?runtime.log("<span>Running "+l(e,'runSuite("'+e+'");')+": "+c.description()+"</span>"):runtime.log("Running "+e+": "+c.description);n=c.tests();for(h=0;h<n.length;h+=1)s=n[h],g=Runtime.getFunctionName(s)||s.testName,k.length&&-1===k.indexOf(g)||(r?runtime.log("<span>Running "+l(g,'runTest("'+e+'","'+g+'")')+"</span>"):runtime.log("Running "+g),q=d.countFailedTests(),c.setUp(),s(),c.tearDown(),t[g]=q===d.countFailedTests());
a(c.asyncTests())}};this.countFailedTests=function(){return f};this.results=function(){return m}};
// Input 13
core.PositionIterator=function(l,f,m,g){function b(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function k(a){this.acceptNode=function(c){return c.nodeType===Node.TEXT_NODE&&0===c.length?NodeFilter.FILTER_REJECT:a.acceptNode(c)}}function a(){var a=d.currentNode.nodeType;c=a===Node.TEXT_NODE?d.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var e=this,d,c,t;this.nextPosition=function(){if(d.currentNode===l)return!1;
if(0===c&&d.currentNode.nodeType===Node.ELEMENT_NODE)null===d.firstChild()&&(c=1);else if(d.currentNode.nodeType===Node.TEXT_NODE&&c+1<d.currentNode.length)c+=1;else if(null!==d.nextSibling())c=0;else if(d.parentNode())c=1;else return!1;return!0};this.previousPosition=function(){var h=!0;if(0===c)if(null===d.previousSibling()){if(!d.parentNode()||d.currentNode===l)return d.firstChild(),!1;c=0}else a();else d.currentNode.nodeType===Node.TEXT_NODE?c-=1:null!==d.lastChild()?a():d.currentNode===l?h=!1:
c=0;return h};this.container=function(){var a=d.currentNode,b=a.nodeType;return 0===c&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=d.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&c===a.length)for(a=a.nextSibling;a&&1!==t(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===c&&(a=null);return a};this.leftNode=function(){var a=d.currentNode;if(0===c)for(a=a.previousSibling;a&&1!==t(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==t(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return d.currentNode};this.domOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return c;var a=0,b=d.currentNode,e;for(e=1===c?d.lastChild():d.previousSibling();e;)a+=1,e=d.previousSibling();d.currentNode=b;return a};this.unfilteredDomOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return c;for(var a=0,b=d.currentNode,b=1===c?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=
function(){var a=d.currentNode,c=d.previousSibling();d.currentNode=a;return c};this.getNextSibling=function(){var a=d.currentNode,c=d.nextSibling();d.currentNode=a;return c};this.setUnfilteredPosition=function(a,b){var f;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");d.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return c=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),
b===a.length&&(c=void 0,d.nextSibling()?c=0:d.parentNode()&&(c=1),runtime.assert(void 0!==c,"Error in setPosition: position not valid.")),!0;f=t(a);b<a.childNodes.length&&f!==NodeFilter.FILTER_REJECT?(d.currentNode=a.childNodes[b],f=t(d.currentNode),c=0):c=0===b?0:1;f===NodeFilter.FILTER_REJECT&&(c=1);if(f!==NodeFilter.FILTER_ACCEPT)return e.nextPosition();runtime.assert(t(d.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
return!0};this.moveToEnd=function(){d.currentNode=l;c=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?e.setUnfilteredPosition(a,a.length):(d.currentNode=a,c=1)};this.getNodeFilter=function(){return t};t=(m?new k(m):new b).acceptNode;t.acceptNode=t;d=l.ownerDocument.createTreeWalker(l,f||4294967295,t,g);c=0;null===d.firstChild()&&(c=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(l){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var l={},f=core.PositionFilter.FilterResult.FILTER_ACCEPT,m=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(g){for(var b in l)if(l.hasOwnProperty(b)&&l[b].acceptPosition(g)===m)return m;return f};this.addFilter=function(f,b){l[f]=b};this.removeFilter=function(f){delete l[f]}};
// Input 16
core.Async=function(){this.forEach=function(l,f,m){function g(b){a!==k&&(b?(a=k,m(b)):(a+=1,a===k&&m(null)))}var b,k=l.length,a=0;for(b=0;b<k;b+=1)f(l[b],g)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(l,f){function m(a){var c=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,h,d=a.length,e=0,e=0;b=-1;for(h=0;h<d;h+=1)e=(b^a[h])&255,e=c[e],b=b>>>8^e;return b^-1}function g(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function b(a){var c=a.getFullYear();return 1980>c?0:c-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function k(a,c){var b,h,d,e,f,n,k,r=this;this.load=function(c){if(void 0!==r.data)c(null,r.data);else{var b=f+34+h+d+256;b+k>q&&(b=q-k);runtime.read(a,k,b,function(b,h){if(b||null===h)c(b,h);else a:{var d=h,p=new core.ByteArray(d),g=p.readUInt32LE(),k;if(67324752!==g)c("File entry signature is wrong."+g.toString()+" "+d.length.toString(),null);else{p.pos+=22;g=p.readUInt16LE();k=p.readUInt16LE();p.pos+=g+k;
if(e){d=d.slice(p.pos,p.pos+f);if(f!==d.length){c("The amount of compressed bytes read was "+d.length.toString()+" instead of "+f.toString()+" for "+r.filename+" in "+a+".",null);break a}d=w(d,n)}else d=d.slice(p.pos,p.pos+n);n!==d.length?c("The amount of bytes read was "+d.length.toString()+" instead of "+n.toString()+" for "+r.filename+" in "+a+".",null):(r.data=d,c(null,d))}}})}};this.set=function(a,c,b,d){r.filename=a;r.data=c;r.compressed=b;r.date=d};this.error=null;c&&(b=c.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+a+'": '+c.data.length.toString():(c.pos+=6,e=c.readUInt16LE(),this.date=g(c.readUInt32LE()),c.readUInt32LE(),f=c.readUInt32LE(),n=c.readUInt32LE(),h=c.readUInt16LE(),d=c.readUInt16LE(),b=c.readUInt16LE(),c.pos+=8,k=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.slice(c.pos,c.pos+h),"utf8"),c.pos+=h+d+b))}function a(a,c){if(22!==a.length)c("Central directory length should be 22.",
v);else{var b=new core.ByteArray(a),d;d=b.readUInt32LE();101010256!==d?c("Central directory signature is wrong: "+d.toString(),v):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",v):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",v):(d=b.readUInt16LE(),r=b.readUInt16LE(),d!==r?c("Number of entries is inconsistent.",v):(d=b.readUInt32LE(),b=b.readUInt16LE(),b=q-22-d,runtime.read(l,b,q-b,function(a,b){if(a||null===b)c(a,v);else a:{var d=
new core.ByteArray(b),h,e;n=[];for(h=0;h<r;h+=1){e=new k(l,d);if(e.error){c(e.error,v);break a}n[n.length]=e}c(null,v)}})))))}}function e(a,c){var b=null,d,h;for(h=0;h<n.length;h+=1)if(d=n[h],d.filename===a){b=d;break}b?b.data?c(null,b.data):b.load(c):c(a+" not found.",null)}function d(a){var c=new core.ByteArrayWriter("utf8"),d=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(d=a.data.length);c.appendUInt32LE(b(a.date));c.appendUInt32LE(m(a.data));c.appendUInt32LE(d);c.appendUInt32LE(d);c.appendUInt16LE(a.filename.length);
c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function c(a,c){var d=new core.ByteArrayWriter("utf8"),h=0;d.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(h=a.data.length);d.appendUInt32LE(b(a.date));d.appendUInt32LE(m(a.data));d.appendUInt32LE(h);d.appendUInt32LE(h);d.appendUInt16LE(a.filename.length);d.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);d.appendUInt32LE(c);d.appendString(a.filename);return d}function t(a,c){if(a===n.length)c(null);else{var b=n[a];
void 0!==b.data?t(a+1,c):b.load(function(b){b?c(b):t(a+1,c)})}}function h(a,b){t(0,function(h){if(h)b(h);else{h=new core.ByteArrayWriter("utf8");var e,f,g,k=[0];for(e=0;e<n.length;e+=1)h.appendByteArrayWriter(d(n[e])),k.push(h.getLength());g=h.getLength();for(e=0;e<n.length;e+=1)f=n[e],h.appendByteArrayWriter(c(f,k[e]));e=h.getLength()-g;h.appendArray([80,75,5,6,0,0,0,0]);h.appendUInt16LE(n.length);h.appendUInt16LE(n.length);h.appendUInt32LE(e);h.appendUInt32LE(g);h.appendArray([0,0]);a(h.getByteArray())}})}
function s(a,c){h(function(b){runtime.writeFile(a,b,c)},c)}var n,q,r,w=(new core.RawInflate).inflate,v=this,z=new core.Base64;this.load=e;this.save=function(a,c,b,d){var h,e;for(h=0;h<n.length;h+=1)if(e=n[h],e.filename===a){e.set(a,c,b,d);return}e=new k(l);e.set(a,c,b,d);n.push(e)};this.write=function(a){s(l,a)};this.writeAs=s;this.createByteArray=h;this.loadContentXmlAsFragments=function(a,c){v.loadAsString(a,function(a,b){if(a)return c.rootElementReady(a);c.rootElementReady(null,b,!0)})};this.loadAsString=
function(a,c){e(a,function(a,b){if(a||null===b)return c(a,null);var d=runtime.byteArrayToString(b,"utf8");c(null,d)})};this.loadAsDOM=function(a,c){v.loadAsString(a,function(a,b){if(a||null===b)c(a,null);else{var d=(new DOMParser).parseFromString(b,"text/xml");c(null,d)}})};this.loadAsDataURL=function(a,c,b){e(a,function(a,d){if(a)return b(a,null);var h=0,e;c||(c=80===d[1]&&78===d[2]&&71===d[3]?"image/png":255===d[0]&&216===d[1]&&255===d[2]?"image/jpeg":71===d[0]&&73===d[1]&&70===d[2]?"image/gif":
"");for(e="data:"+c+";base64,";h<d.length;)e+=z.convertUTF8ArrayToBase64(d.slice(h,Math.min(h+45E3,d.length))),h+=45E3;b(null,e)})};this.getEntries=function(){return n.slice()};q=-1;null===f?n=[]:runtime.getFileSize(l,function(c){q=c;0>q?f("File '"+l+"' cannot be read.",v):runtime.read(l,q-22,22,function(c,b){c||null===f||null===b?f(c,v):a(b,f)})})};
// Input 18
core.CSSUnits=function(){var l={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(f,m,g){return f*l[g]/l[m]};this.convertMeasure=function(f,m){var g,b;f&&m?(g=parseFloat(f),b=f.replace(g.toString(),""),g=this.convert(g,b,m)):g="";return g.toString()};this.getUnits=function(f){return f.substr(f.length-2,f.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(l){var f=function(){};f.prototype=l;return new f});
xmldom.LSSerializer=function(){function l(b){var f=b||{},a=function(a){var c={},b;for(b in a)a.hasOwnProperty(b)&&(c[a[b]]=b);return c}(b),e=[f],d=[a],c=0;this.push=function(){c+=1;f=e[c]=Object.create(f);a=d[c]=Object.create(a)};this.pop=function(){e[c]=void 0;d[c]=void 0;c-=1;f=e[c];a=d[c]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(c){var b=c.namespaceURI,d=0,e;if(!b)return c.localName;if(e=a[b])return e+":"+c.localName;do{e||!c.prefix?(e="ns"+d,d+=1):e=c.prefix;
if(f[e]===b)break;if(!f[e]){f[e]=b;a[b]=e;break}e=null}while(null===e);return e+":"+c.localName}}function f(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function m(b,k){var a="",e=g.filter?g.filter.acceptNode(k):NodeFilter.FILTER_ACCEPT,d;if(e===NodeFilter.FILTER_ACCEPT&&k.nodeType===Node.ELEMENT_NODE){b.push();d=b.getQName(k);var c,l=k.attributes,h,s,n,q="",r;c="<"+d;h=l.length;for(s=0;s<h;s+=1)n=l.item(s),"http://www.w3.org/2000/xmlns/"!==
n.namespaceURI&&(r=g.filter?g.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,r===NodeFilter.FILTER_ACCEPT&&(r=b.getQName(n),n="string"===typeof n.value?f(n.value):n.value,q+=" "+(r+'="'+n+'"')));h=b.getLocalNamespaceDefinitions();for(s in h)h.hasOwnProperty(s)&&((l=h[s])?"xmlns"!==l&&(c+=" xmlns:"+h[s]+'="'+s+'"'):c+=' xmlns="'+s+'"');a+=c+(q+">")}if(e===NodeFilter.FILTER_ACCEPT||e===NodeFilter.FILTER_SKIP){for(e=k.firstChild;e;)a+=m(b,e),e=e.nextSibling;k.nodeValue&&(a+=f(k.nodeValue))}d&&(a+="</"+
d+">",b.pop());return a}var g=this;this.filter=null;this.writeToString=function(b,f){if(!b)return"";var a=new l(f);return m(a,b)}};
// Input 21
xmldom.RelaxNGParser=function(){function l(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function f(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return f({name:a.name,e:[b].concat(a.e.slice(2))})}function m(a){a=a.split(":",2);var b="",d;1===a.length?a=["",a[0]]:b=a[0];for(d in e)e[d]===b&&(a[0]=d);return a}function g(a,b){for(var d=0,e,f,k=a.name;a.e&&d<a.e.length;)if(e=
a.e[d],"ref"===e.name){f=b[e.a.name];if(!f)throw e.a.name+" was not defined.";e=a.e.slice(d+1);a.e=a.e.slice(0,d);a.e=a.e.concat(f.e);a.e=a.e.concat(e)}else d+=1,g(e,b);e=a.e;"choice"!==k||e&&e[1]&&"empty"!==e[1].name||(e&&e[0]&&"empty"!==e[0].name?(e[1]=e[0],e[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===k||"interleave"===k)"empty"===e[0].name?"empty"===e[1].name?(delete a.e,a.name="empty"):(k=a.name=e[1].name,a.names=e[1].names,e=a.e=e[1].e):"empty"===e[1].name&&(k=a.name=e[0].name,
a.names=e[0].names,e=a.e=e[0].e);"oneOrMore"===k&&"empty"===e[0].name&&(delete a.e,a.name="empty");if("attribute"===k){f=a.names?a.names.length:0;for(var r,l=[],v=[],d=0;d<f;d+=1)r=m(a.names[d]),v[d]=r[0],l[d]=r[1];a.localnames=l;a.namespaces=v}"interleave"===k&&("interleave"===e[0].name?a.e="interleave"===e[1].name?e[0].e.concat(e[1].e):[e[1]].concat(e[0].e):"interleave"===e[1].name&&(a.e=[e[0]].concat(e[1].e)))}function b(a,d){for(var e=0,f;a.e&&e<a.e.length;)f=a.e[e],"elementref"===f.name?(f.id=
f.id||0,a.e[e]=d[f.id]):"element"!==f.name&&b(f,d),e+=1}var k=this,a,e={"http://www.w3.org/XML/1998/namespace":"xml"},d;d=function(a,b,h){var g=[],n,k,r=a.localName,l=[];n=a.attributes;var v=r,z=l,u={},p,y;for(p=0;p<n.length;p+=1)if(y=n.item(p),y.namespaceURI)"http://www.w3.org/2000/xmlns/"===y.namespaceURI&&(e[y.value]=y.localName);else{"name"!==y.localName||"element"!==v&&"attribute"!==v||z.push(y.value);if("name"===y.localName||"combine"===y.localName||"type"===y.localName){var D=y,H;H=y.value;
H=H.replace(/^\s\s*/,"");for(var A=/\s/,N=H.length-1;A.test(H.charAt(N));)N-=1;H=H.slice(0,N+1);D.value=H}u[y.localName]=y.value}n=u;n.combine=n.combine||void 0;a=a.firstChild;v=g;z=l;for(u="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(p=d(a,b,v))"name"===p.name?z.push(e[p.a.ns]+":"+p.text):"choice"===p.name&&(p.names&&p.names.length)&&(z=z.concat(p.names),delete p.names),v.push(p)}else a.nodeType===Node.TEXT_NODE&&(u+=a.nodeValue);a=a.nextSibling}a=
u;"value"!==r&&"param"!==r&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===r&&void 0===n.type&&(n.type="token",n.datatypeLibrary="");"attribute"!==r&&"element"!==r||void 0===n.name||(k=m(n.name),g=[{name:"name",text:k[1],a:{ns:k[0]}}].concat(g),delete n.name);"name"===r||"nsName"===r||"value"===r?void 0===n.ns&&(n.ns=""):delete n.ns;"name"===r&&(k=m(a),n.ns=k[0],a=k[1]);1<g.length&&("define"===r||"oneOrMore"===r||"zeroOrMore"===r||"optional"===r||"list"===r||"mixed"===r)&&(g=[{name:"group",e:f({name:"group",
e:g}).e}]);2<g.length&&"element"===r&&(g=[g[0]].concat({name:"group",e:f({name:"group",e:g.slice(1)}).e}));1===g.length&&"attribute"===r&&g.push({name:"text",text:a});1!==g.length||"choice"!==r&&"group"!==r&&"interleave"!==r?2<g.length&&("choice"===r||"group"===r||"interleave"===r)&&(g=f({name:r,e:g}).e):(r=g[0].name,l=g[0].names,n=g[0].a,a=g[0].text,g=g[0].e);"mixed"===r&&(r="interleave",g=[g[0],{name:"text"}]);"optional"===r&&(r="choice",g=[g[0],{name:"empty"}]);"zeroOrMore"===r&&(r="choice",g=
[{name:"oneOrMore",e:[g[0]]},{name:"empty"}]);if("define"===r&&n.combine){a:{v=n.combine;z=n.name;u=g;for(p=0;h&&p<h.length;p+=1)if(y=h[p],"define"===y.name&&y.a&&y.a.name===z){y.e=[{name:v,e:y.e.concat(u)}];h=y;break a}h=null}if(h)return}h={name:r};g&&0<g.length&&(h.e=g);for(k in n)if(n.hasOwnProperty(k)){h.a=n;break}void 0!==a&&(h.text=a);l&&0<l.length&&(h.names=l);"element"===r&&(h.id=b.length,b.push(h),h={name:"elementref",id:h.id});return h};this.parseRelaxNGDOM=function(c,f){var h=[],m=d(c&&
c.documentElement,h,void 0),n,q,r={};for(n=0;n<m.e.length;n+=1)q=m.e[n],"define"===q.name?r[q.a.name]=q:"start"===q.name&&(a=q);if(!a)return[new l("No Relax NG start element was found.")];g(a,r);for(n in r)r.hasOwnProperty(n)&&g(r[n],r);for(n=0;n<h.length;n+=1)g(h[n],r);f&&(k.rootPattern=f(a.e[0],h));b(a,h);for(n=0;n<h.length;n+=1)b(h[n],h);k.start=a;k.elements=h;k.nsmap=e;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function l(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function f(a,b){return function(){var c={},d=0;return function(e){var h=e.hash||e.toString(),f;f=c[h];if(void 0!==f)return f;c[h]=f=b(e);f.hash=a+d.toString();d+=1;return f}}()}function m(a){return function(){var b={};return function(c){var d,e;e=b[c.localName];if(void 0===e)b[c.localName]=e={};else if(d=e[c.namespaceURI],void 0!==d)return d;return e[c.namespaceURI]=d=a(c)}}()}function g(a,
b,c){return function(){var d={},e=0;return function(h,f){var g=b&&b(h,f),n,p;if(void 0!==g)return g;g=h.hash||h.toString();n=f.hash||f.toString();p=d[g];if(void 0===p)d[g]=p={};else if(g=p[n],void 0!==g)return g;p[n]=g=c(h,f);g.hash=a+e.toString();e+=1;return g}}()}function b(a,c){"choice"===c.p1.type?b(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?b(a,c.p2):a[c.p2.hash]=c.p2}function k(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return p},startTagOpenDeriv:function(c){return a.contains(c)?
n(b,y):p},attDeriv:function(){return p},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return y}}}function e(a,b,d,h){if(b===p)return p;if(h>=d.length)return b;0===h&&(h=0);for(var f=d.item(h);f.namespaceURI===c;){h+=1;if(h>=d.length)return b;f=d.item(h)}return f=e(a,b.attDeriv(a,d.item(h)),d,h+1)}function d(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):d(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
d(a,b,c.e[1])}var c="http://www.w3.org/2000/xmlns/",t,h,s,n,q,r,w,v,z,u,p={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return p},startTagOpenDeriv:function(){return p},attDeriv:function(){return p},startTagCloseDeriv:function(){return p},endTagDeriv:function(){return p}},y={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return p},startTagOpenDeriv:function(){return p},attDeriv:function(){return p},startTagCloseDeriv:function(){return y},endTagDeriv:function(){return p}},
D={type:"text",nullable:!0,hash:"text",textDeriv:function(){return D},startTagOpenDeriv:function(){return p},attDeriv:function(){return p},startTagCloseDeriv:function(){return D},endTagDeriv:function(){return p}},H,A,N;t=g("choice",function(a,b){if(a===p)return b;if(b===p||a===b)return a},function(a,c){var d={},e;b(d,{p1:a,p2:c});c=a=void 0;for(e in d)d.hasOwnProperty(e)&&(void 0===a?a=d[e]:c=void 0===c?d[e]:t(c,d[e]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,d){return t(a.textDeriv(c,d),b.textDeriv(c,d))},startTagOpenDeriv:m(function(c){return t(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,d){return t(a.attDeriv(c,d),b.attDeriv(c,d))},startTagCloseDeriv:l(function(){return t(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:l(function(){return t(a.endTagDeriv(),b.endTagDeriv())})}}(a,c)});h=function(a,b,c){return function(){var d={},e=0;return function(h,f){var g=b&&b(h,f),n,p;if(void 0!==g)return g;
g=h.hash||h.toString();n=f.hash||f.toString();g<n&&(p=g,g=n,n=p,p=h,h=f,f=p);p=d[g];if(void 0===p)d[g]=p={};else if(g=p[n],void 0!==g)return g;p[n]=g=c(h,f);g.hash=a+e.toString();e+=1;return g}}()}("interleave",function(a,b){if(a===p||b===p)return p;if(a===y)return b;if(b===y)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){return t(h(a.textDeriv(c,d),b),h(a,b.textDeriv(c,d)))},startTagOpenDeriv:m(function(c){return t(H(function(a){return h(a,
b)},a.startTagOpenDeriv(c)),H(function(b){return h(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,d){return t(h(a.attDeriv(c,d),b),h(a,b.attDeriv(c,d)))},startTagCloseDeriv:l(function(){return h(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});s=g("group",function(a,b){if(a===p||b===p)return p;if(a===y)return b;if(b===y)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){var e=s(a.textDeriv(c,d),b);return a.nullable?t(e,b.textDeriv(c,
d)):e},startTagOpenDeriv:function(c){var d=H(function(a){return s(a,b)},a.startTagOpenDeriv(c));return a.nullable?t(d,b.startTagOpenDeriv(c)):d},attDeriv:function(c,d){return t(s(a.attDeriv(c,d),b),s(a,b.attDeriv(c,d)))},startTagCloseDeriv:l(function(){return s(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});n=g("after",function(a,b){if(a===p||b===p)return p},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,d){return n(a.textDeriv(c,d),b)},startTagOpenDeriv:m(function(c){return H(function(a){return n(a,
b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,d){return n(a.attDeriv(c,d),b)},startTagCloseDeriv:l(function(){return n(a.startTagCloseDeriv(),b)}),endTagDeriv:l(function(){return a.nullable?b:p})}});q=f("oneormore",function(a){return a===p?p:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return s(a.textDeriv(b,c),t(this,y))},startTagOpenDeriv:function(b){var c=this;return H(function(a){return s(a,t(c,y))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return s(a.attDeriv(b,
c),t(this,y))},startTagCloseDeriv:l(function(){return q(a.startTagCloseDeriv())})}});w=g("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,d){return a.contains(d)&&(b.nullable&&/^\s+$/.test(d.nodeValue)||b.textDeriv(c,d.nodeValue).nullable)?y:p},startTagCloseDeriv:function(){return p}}});r=f("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?y:p},attDeriv:function(){return p},startTagCloseDeriv:function(){return this}}});
z=f("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return y},attDeriv:function(){return p},startTagCloseDeriv:function(){return this}}});H=function P(a,b){return"after"===b.type?n(b.p1,a(b.p2)):"choice"===b.type?t(P(a,b.p1),P(a,b.p2)):b};A=function(a,b,c){var d=c.currentNode;b=b.startTagOpenDeriv(d);b=e(a,b,d.attributes,0);var h=b=b.startTagCloseDeriv(),d=c.currentNode;b=c.firstChild();for(var f=[],g;b;)b.nodeType===Node.ELEMENT_NODE?f.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||f.push(b.nodeValue),b=c.nextSibling();0===f.length&&(f=[""]);g=h;for(h=0;g!==p&&h<f.length;h+=1)b=f[h],"string"===typeof b?g=/^\s*$/.test(b)?t(g,g.textDeriv(a,b)):g.textDeriv(a,b):(c.currentNode=b,g=A(a,g,c));c.currentNode=d;return b=g.endTagDeriv()};v=function(a){var b,c,e;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];d(b,c,a);a="";for(e=0;e<b.length;e+=
1)a+="{"+c[e]+"}"+b[e]+",";a={hash:a,contains:function(a){var d;for(d=0;d<b.length;d+=1)if(b[d]===a.localName&&c[d]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};u=function B(b,c){var d,e;if("elementref"===b.name){d=b.id||0;b=c[d];if(void 0!==b.name){var f=b;d=c[f.id]={hash:"element"+f.id.toString()};f=k(v(f.e[0]),u(f.e[1],c));for(e in f)f.hasOwnProperty(e)&&(d[e]=f[e]);return d}return b}switch(b.name){case "empty":return y;case "notAllowed":return p;
case "text":return D;case "choice":return t(B(b.e[0],c),B(b.e[1],c));case "interleave":d=B(b.e[0],c);for(e=1;e<b.e.length;e+=1)d=h(d,B(b.e[e],c));return d;case "group":return s(B(b.e[0],c),B(b.e[1],c));case "oneOrMore":return q(B(b.e[0],c));case "attribute":return w(v(b.e[0]),B(b.e[1],c));case "value":return r(b.text);case "data":return d=b.a&&b.a.type,void 0===d&&(d=""),z(d);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var c={},d;for(d in b)b.hasOwnProperty(d)&&
(c[d]=b[d]);return d=u(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=A(null,N,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){N=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function l(a,b){this.message=function(){b&&(a+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function f(a,e,d,c){return"empty"===a.name?null:b(a,e,d,c)}function m(a,b){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var d=b.currentNode,c=d?d.nodeType:0,g=null;c>Node.ELEMENT_NODE;){if(c!==Node.COMMENT_NODE&&(c!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new l("Not allowed node of type "+
c+".")];c=(d=b.nextSibling())?d.nodeType:0}if(!d)return[new l("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(k[d.namespaceURI]+":"+d.localName))return[new l("Found "+d.nodeName+" instead of "+a.names+".",d)];if(b.firstChild()){for(g=f(a.e[1],b,d);b.nextSibling();)if(c=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||c===Node.COMMENT_NODE))return[new l("Spurious content.",b.currentNode)];if(b.parentNode()!==d)return[new l("Implementation error.")]}else g=
f(a.e[1],b,d);b.nextSibling();return g}var g,b,k;b=function(a,e,d,c){var g=a.name,h=null;if("text"===g)a:{for(var k=(a=e.currentNode)?a.nodeType:0;a!==d&&3!==k;){if(1===k){h=[new l("Element not allowed here.",a)];break a}k=(a=e.nextSibling())?a.nodeType:0}e.nextSibling();h=null}else if("data"===g)h=null;else if("value"===g)c!==a.text&&(h=[new l("Wrong value, should be '"+a.text+"', not '"+c+"'",d)]);else if("list"===g)h=null;else if("attribute"===g)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;g=a.localnames.length;for(h=0;h<g;h+=1){c=d.getAttributeNS(a.namespaces[h],a.localnames[h]);""!==c||d.hasAttributeNS(a.namespaces[h],a.localnames[h])||(c=void 0);if(void 0!==k&&void 0!==c){h=[new l("Attribute defined too often.",d)];break a}k=c}h=void 0===k?[new l("Attribute not found: "+a.names,d)]:f(a.e[1],e,d,k)}else if("element"===g)h=m(a,e);else if("oneOrMore"===g){c=0;do k=e.currentNode,g=b(a.e[0],e,d),c+=1;while(!g&&k!==e.currentNode);1<c?(e.currentNode=k,h=null):h=g}else if("choice"===
g){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;k=e.currentNode;if("empty"===a.e[0].name){if(g=b(a.e[1],e,d,c))e.currentNode=k;h=null}else{if(g=f(a.e[0],e,d,c))e.currentNode=k,g=b(a.e[1],e,d,c);h=g}}else if("group"===g){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;h=b(a.e[0],e,d)||b(a.e[1],e,d)}else if("interleave"===g)a:{k=a.e.length;c=[k];for(var n=k,q,r,w,v;0<n;){q=0;r=e.currentNode;for(h=0;h<k;h+=1)w=e.currentNode,!0!==c[h]&&c[h]!==w&&(v=a.e[h],(g=
b(v,e,d))?(e.currentNode=w,void 0===c[h]&&(c[h]=!1)):w===e.currentNode||"oneOrMore"===v.name||"choice"===v.name&&("oneOrMore"===v.e[0].name||"oneOrMore"===v.e[1].name)?(q+=1,c[h]=w):(q+=1,c[h]=!0));if(r===e.currentNode&&q===n){h=null;break a}if(0===q){for(h=0;h<k;h+=1)if(!1===c[h]){h=[new l("Interleave does not match.",d)];break a}h=null;break a}for(h=n=0;h<k;h+=1)!0!==c[h]&&(n+=1)}h=null}else throw g+" not allowed in nonEmptyPattern.";return h};this.validate=function(a,b){a.currentNode=a.root;var d=
f(g.e[0],a,a.root);b(d)};this.init=function(a,b){g=a;k=b}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function l(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function f(a){for(var b=[],c=0,d=a.length,e;c<d;){var f=a,g=d,k=b,m="",p=[],y=f.indexOf("[",c),D=f.indexOf("/",c),H=f.indexOf("=",c);l(D,y,H)?(m=f.substring(c,D),c=D+1):l(y,D,H)?(m=f.substring(c,y),c=t(f,y,p)):l(H,D,y)?(m=f.substring(c,H),c=H):(m=f.substring(c,g),c=g);k.push({location:m,predicates:p});if(c<d&&"="===a[c]){e=a.substring(c+1,d);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);else try{e=
parseInt(e,10)}catch(A){}c=d}}return{steps:b,value:e}}function m(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function g(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function b(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function k(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function a(a,b,c){b=b.split(":",2);var d=c(b[0]),e=b[1];return new k(a,function(a){return a.localName===e&&a.namespaceURI===d})}function e(a,b,d){var e=new m,f=c(e,b,d),g=b.value;return void 0===g?new k(a,function(a){e.setNode(a);
f.reset();return f.next()}):new k(a,function(a){e.setNode(a);f.reset();return(a=f.next())&&a.nodeValue===g})}function d(a,b,d){var e=a.ownerDocument,g=[],k=null;if(e&&e.evaluate)for(d=e.evaluate(b,a,d,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),k=d.iterateNext();null!==k;)k.nodeType===Node.ELEMENT_NODE&&g.push(k),k=d.iterateNext();else{g=new m;g.setNode(a);a=f(b);g=c(g,a,d);a=[];for(d=g.next();d;)a.push(d),d=g.next();g=a}return g}var c,t;t=function(a,b,c){for(var d=b,e=a.length,g=0;d<e;)"]"===
a[d]?(g-=1,0>=g&&c.push(f(a.substring(b,d)))):"["===a[d]&&(0>=g&&(b=d+1),g+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};c=function(c,d,f){var k,m,l,v;for(k=0;k<d.steps.length;k+=1)for(l=d.steps[k],m=l.location,""===m?c=new b(c,!1):"@"===m[0]?(v=m.slice(1).split(":",2),c=new g(c,f(v[0]),v[1])):"."!==m&&(c=new b(c,!1),-1!==m.indexOf(":")&&(c=a(c,m,f))),m=0;m<l.predicates.length;m+=1)v=l.predicates[m],c=e(c,v,f);return c};xmldom.XPath=
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
gui.AnnotationViewManager=function(l,f){function m(b){var d=b.node,f=b.end;b=a.createRange();f&&(b.setStart(d,d.childNodes.length),b.setEnd(f,0),f=e.getTextNodes(b,!1),f.forEach(function(b){var c=a.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",d.getAttributeNS(odf.Namespaces.officens,"name"));b.parentNode.insertBefore(c,b);c.appendChild(b)}));b.detach()}function g(){k.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?
-1:1})}function b(){var b;for(b=0;b<k.length;b+=1){var e=k[b],h=e.node.parentNode,g=h.nextSibling,n=g.nextSibling,m=h.parentNode,l=0,l=k[k.indexOf(e)-1],w=void 0,e=e.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],w=void 0;h.style.left=f.getBoundingClientRect().left-m.getBoundingClientRect().left+"px";h.style.width=f.getBoundingClientRect().width+"px";g.style.width=parseFloat(h.style.left)-30+"px";l&&(w=l.node.parentNode.getBoundingClientRect(),20>=m.getBoundingClientRect().top-w.bottom?
h.style.top=Math.abs(m.getBoundingClientRect().top-w.bottom)+20+"px":h.style.top="0px");n.style.left=g.getBoundingClientRect().width+"px";var g=n.style,m=n.getBoundingClientRect().left,l=n.getBoundingClientRect().top,w=h.getBoundingClientRect().left,v=h.getBoundingClientRect().top,z=0,u=0,z=w-m,z=z*z,u=v-l,u=u*u,m=Math.sqrt(z+u);g.width=m+"px";l=Math.asin((h.getBoundingClientRect().top-n.getBoundingClientRect().top)/parseFloat(n.style.width));n.style.transform="rotate("+l+"rad)";n.style.MozTransform=
"rotate("+l+"rad)";n.style.WebkitTransform="rotate("+l+"rad)";n.style.msTransform="rotate("+l+"rad)";e&&(w=d.getComputedStyle(e,":before").content)&&"none"!==w&&(w=w.substring(1,w.length-1),e.firstChild?e.firstChild.nodeValue=w:e.appendChild(a.createTextNode(w)))}}var k=[],a=l.ownerDocument,e=new odf.OdfUtils,d=runtime.getWindow();runtime.assert(Boolean(d),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=b;this.addAnnotation=function(c){k.push({node:c.node,
end:c.end});g();var d=a.createElement("div"),e=a.createElement("div"),f=a.createElement("div"),n=a.createElement("div"),l=c.node;d.className="annotationWrapper";l.parentNode.insertBefore(d,l);e.className="annotationNote";e.appendChild(l);f.className="annotationConnector horizontal";n.className="annotationConnector angular";d.appendChild(e);d.appendChild(f);d.appendChild(n);c.end&&m(c);b()};this.forgetAnnotations=function(){for(;k.length;){var b=k[0],d=b.node,e=d.parentNode.parentNode;"div"===e.localName&&
(e.parentNode.insertBefore(d,e),e.parentNode.removeChild(e));for(var d=b.node.getAttributeNS(odf.Namespaces.officens,"name"),d=a.querySelectorAll('span.annotationHighlight[annotation="'+d+'"]'),f=e=void 0,g=void 0,m=void 0,e=0;e<d.length;e+=1){g=d[e];m=g.childNodes;for(f=0;f<m.length;f+=1)g.parentNode.insertBefore(m[f],g);g.parentNode.removeChild(g)}k.splice(k.indexOf(b),1)}}};
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
odf.Namespaces=function(){function l(g){return f[g]||null}var f={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",dc:"http://purl.org/dc/elements/1.1/",webodf:"urn:webodf"},m;l.lookupNamespaceURI=l;m=function(){};m.forEachPrefix=function(g){for(var b in f)f.hasOwnProperty(b)&&g(b,f[b])};m.resolvePrefix=l;m.namespaceMap=f;m.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";m.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
m.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";m.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";m.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";m.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";m.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";m.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";m.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";m.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
m.xlinkns="http://www.w3.org/1999/xlink";m.xmlns="http://www.w3.org/XML/1998/namespace";m.dcns="http://purl.org/dc/elements/1.1/";m.webodfns="urn:webodf";return m}();
// Input 28
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function l(a,b){for(var c=s[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,f,c=0;c<e;c+=1)(f=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,b+f);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,l(d,b)),c=c.nextSibling}function f(a,b){for(var c=s[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,h,c=0;c<e;c+=1)if(h=a.getAttributeNS(d[c].ns,d[c].localname))h=h.replace(b,""),a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,
h);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,f(d,b)),c=c.nextSibling}function m(a,b){var c=s[a.localName],d=(c=c&&c[a.namespaceURI])?c.length:0,e,f,h;for(h=0;h<d;h+=1)if(e=a.getAttributeNS(c[h].ns,c[h].localname))b=b||{},f=c[h].keyname,f=b[f]=b[f]||{},f[e]=1;return b}function g(a,b){var c,d;m(a,b);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,g(d,b)),c=c.nextSibling}function b(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function k(a,c,d){var e=a+'"'+
c,f=d[e];f||(f=d[e]=new b(e,a,c));return f}function a(b,d,e){var f=s[b.localName],h=(f=f&&f[b.namespaceURI])?f.length:0,g=b.getAttributeNS(c,"name"),p=b.getAttributeNS(c,"family"),n;g&&p&&(d=k(g,p,e));if(d)for(g=0;g<h;g+=1)if(p=b.getAttributeNS(f[g].ns,f[g].localname))n=f[g].keyname,p=k(p,n,e),d.requires[p.key]=p;for(g=b.firstChild;g;)g.nodeType===Node.ELEMENT_NODE&&(b=g,a(b,d,e)),g=g.nextSibling;return e}function e(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){e(a.requires[c],
b)})}function d(b,c){var d=a(b,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&e(a,c)})}var c="urn:oasis:names:tc:opendocument:xmlns:style:1.0",t={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:","urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},h={text:[{ens:c,
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
a:"page-layout-name"}]},s,n=new xmldom.XPath;this.UsedStyleList=function(a,b){var e={};this.uses=function(a){var b=a.localName,d=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(c,"name");a="style"===b?a.getAttributeNS(c,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":b;return(a=e[a])?0<a[d]:!1};g(a,e);b&&d(b,e)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),e=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,
"family");return n.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,d){var e;if(a){for(e=a.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE){var f=e,h=b,g=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),k=void 0;g?k="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(g=f.getAttributeNS(c,"name"))&&(k=c);k&&f.setAttributeNS(k,t[k]+"name",h+g)}e=e.nextSibling}l(a,b);d&&l(d,
b)}};this.removePrefixFromStyleNames=function(a,b,d){var e=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var h=b,g=e,p=h.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),k=void 0;p?k="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(p=h.getAttributeNS(c,"name"))&&(k=c);k&&(p=p.replace(g,""),h.setAttributeNS(k,t[k]+"name",p))}b=b.nextSibling}f(a,e);d&&f(d,e)}};this.determineStylesForNode=m;s=function(a){var b,c,d,e,f,h={},g;for(b in a)if(a.hasOwnProperty(b))for(e=
a[b],d=e.length,c=0;c<d;c+=1)f=e[c],g=h[f.en]=h[f.en]||{},g=g[f.ens]=g[f.ens]||[],g.push({ns:f.ans,localname:f.a,keyname:b});return h}(h)};
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
odf.OdfUtils=function(){function l(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===w}function f(a){for(;a&&!l(a);)a=a.parentNode;return a}function m(a){return/^[ \t\r\n]+$/.test(a)}function g(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===w||"span"===b&&"annotationHighlight"===a.className?!0:!1}function b(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===w?d="s"===b||"tab"===b||"line-break"===b:c===v&&(d="frame"===b&&"as-char"===a.getAttributeNS(w,
"anchor-type")));return d}function k(a){for(;null!==a.firstChild&&g(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&g(a);)a=a.lastChild;return a}function e(b){for(;!l(b)&&null===b.previousSibling;)b=b.parentNode;return l(b)?null:a(b.previousSibling)}function d(a){for(;!l(a)&&null===a.nextSibling;)a=a.parentNode;return l(a)?null:k(a.nextSibling)}function c(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=e(a);else return!m(a.data.substr(a.length-1,1));else b(a)?
(c=!0,a=null):a=e(a);return c}function t(a){var c=!1;for(a=a&&k(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!m(a.data)){c=!0;break}if(b(a)){c=!0;break}a=d(a)}return c}function h(a,b){return m(a.data.substr(b))?!t(d(a)):!1}function s(a,d){var f=a.data,g;if(!m(f[d])||b(a.parentNode))return!1;0<d?m(f[d-1])||(g=!0):c(e(a))&&(g=!0);return!0===g?h(a,d)?!1:!0:!1}function n(a){return(a=/-?([0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function q(a){return(a=n(a))&&"%"!==a.unit?null:a}function r(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var w=
"urn:oasis:names:tc:opendocument:xmlns:text:1.0",v="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",z=/^\s*$/,u=new core.DomUtils;this.isParagraph=l;this.getParagraphElement=f;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===w&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===w};this.isODFWhitespace=m;this.isGroupingElement=g;this.isCharacterElement=b;this.firstChild=
k;this.lastChild=a;this.previousNode=e;this.nextNode=d;this.scanLeftForNonWhitespace=c;this.lookLeftForCharacter=function(a){var d;d=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(d=a.data,d=m(d.substr(d.length-1,1))?1===d.length?c(e(a))?2:0:m(d.substr(d.length-2,1))?0:2:1):b(a)&&(d=1);return d};this.lookRightForCharacter=function(a){var c=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?c=!m(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(c){var d=!1;for(c=c&&a(c);c;){if(c.nodeType===
Node.TEXT_NODE&&0<c.length&&!m(c.data)){d=!0;break}if(b(c)){d=!0;break}c=e(c)}return d};this.scanRightForAnyCharacter=t;this.isTrailingWhitespace=h;this.isSignificantWhitespace=s;this.getFirstNonWhitespaceChild=function(a){for(a=a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&z.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=n;this.parseFoFontSize=function(a){var b;b=(b=n(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||q(a)};this.parseFoLineHeight=function(a){var b;b=(b=n(a))&&(0>b.value||
"%"===b.unit)?null:b;return b||q(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,c=[];for(b.nodeType===Node.ELEMENT_NODE&&(c=u.getElementsByTagNameNS(b,w,"p").concat(u.getElementsByTagNameNS(b,w,"h")));b&&!l(b);)b=b.parentNode;b&&c.push(b);return c.filter(function(b){return u.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),d;d=u.getNodesInRange(a,function(d){c.selectNodeContents(d);if(d.nodeType===Node.TEXT_NODE){if(b&&
u.rangesIntersect(a,c)||u.containsRange(a,c))return Boolean(f(d)&&(!m(d.textContent)||s(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(u.rangesIntersect(a,c)&&r(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return d};this.getTextElements=function(a,c){var d=a.startContainer.ownerDocument.createRange(),e;e=u.getNodesInRange(a,function(e){var h=e.nodeType;d.selectNodeContents(e);if(h===Node.TEXT_NODE){if(u.containsRange(a,d)&&(c||Boolean(f(e)&&(!m(e.textContent)||
s(e,0)))))return NodeFilter.FILTER_ACCEPT}else if(b(e)){if(u.containsRange(a,d))return NodeFilter.FILTER_ACCEPT}else if(r(e)||g(e))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});d.detach();return e};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),c;c=u.getNodesInRange(a,function(c){b.selectNodeContents(c);if(l(c)){if(u.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(r(c)||g(c))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});
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
odf.TextSerializer=function(){function l(g){var b="",k=f.filter?f.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,a=g.nodeType,e;if(k===NodeFilter.FILTER_ACCEPT||k===NodeFilter.FILTER_SKIP)for(e=g.firstChild;e;)b+=l(e),e=e.nextSibling;k===NodeFilter.FILTER_ACCEPT&&(a===Node.ELEMENT_NODE&&m.isParagraph(g)?b+="\n":a===Node.TEXT_NODE&&g.textContent&&(b+=g.textContent));return b}var f=this,m=new odf.OdfUtils;this.filter=null;this.writeToString=function(f){return f?l(f):""}};
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
odf.TextStyleApplicator=function(l,f,m){function g(a){function b(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(d){return b(a[d],c[d])}):a===c}this.isStyleApplied=function(d){d=f.getAppliedStylesForElement(d);return b(a,d)}}function b(b){var g={};this.applyStyleToContainer=function(h){var k;k=h.getAttributeNS(a,"style-name");var n=h.ownerDocument;k=k||"";if(!g.hasOwnProperty(k)){var q=k,r=k,w;r?(w=f.getStyleElement(r,"text"),w.parentNode===m?n=w.cloneNode(!0):(n=
n.createElementNS(e,"style:style"),n.setAttributeNS(e,"style:parent-style-name",r),n.setAttributeNS(e,"style:family","text"),n.setAttributeNS(d,"scope","document-content"))):(n=n.createElementNS(e,"style:style"),n.setAttributeNS(e,"style:family","text"),n.setAttributeNS(d,"scope","document-content"));f.updateStyle(n,b,l);m.appendChild(n);g[q]=n}k=g[k].getAttributeNS(e,"name");h.setAttributeNS(a,"text:style-name",k)}}var k=new core.DomUtils,a=odf.Namespaces.textns,e=odf.Namespaces.stylens,d="urn:webodf:names:scope";
this.applyStyle=function(c,d,e){var f={},n,m,l,w;runtime.assert(e&&e["style:text-properties"],"applyStyle without any text properties");f["style:text-properties"]=e["style:text-properties"];l=new b(f);w=new g(f);c.forEach(function(b){n=w.isStyleApplied(b);if(!1===n){var c=b.ownerDocument,e=b.parentNode,f,h=b,g=new core.LoopWatchDog(1E3);"span"===e.localName&&e.namespaceURI===a?(b.previousSibling&&!k.rangeContainsNode(d,b.previousSibling)?(c=e.cloneNode(!1),e.parentNode.insertBefore(c,e.nextSibling)):
c=e,f=!0):(c=c.createElementNS(a,"text:span"),e.insertBefore(c,b),f=!1);for(;h&&(h===b||k.rangeContainsNode(d,h));)g.check(),e=h.nextSibling,h.parentNode!==c&&c.appendChild(h),h=e;if(h&&f)for(b=c.cloneNode(!1),c.parentNode.insertBefore(b,c.nextSibling);h;)g.check(),e=h.nextSibling,b.appendChild(h),h=e;m=c;l.applyStyleToContainer(m)}})}};
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
odf.Style2CSS=function(){function l(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==q||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===w&&"list-style"===a.localName?"list":a.namespaceURI!==q||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(q,"family"))(c=a.getAttributeNS&&a.getAttributeNS(q,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function f(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=f(a[c].derivedStyles,b)))return d;return null}function m(a,b,c){var d=b[a],e,h;d&&(e=d.getAttributeNS(q,"parent-style-name"),h=null,e&&(h=f(c,e),!h&&b[e]&&(m(e,b,c),h=b[e],b[e]=null)),h?(h.derivedStyles||(h.derivedStyles={}),h.derivedStyles[a]=d):c[a]=d)}function g(a,b){for(var c in a)a.hasOwnProperty(c)&&(m(c,a,b),a[c]=null)}function b(a,b){var c=u[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+p[a].join(d+","+c+"|")+d}function k(a,c,d){var e=[],f,h;e.push(b(a,c));for(f in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(f))for(h in c=k(a,f,d.derivedStyles[f]),c)c.hasOwnProperty(h)&&e.push(c[h]);return e}function a(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function e(a,b){var c="",d,e;for(d in b)b.hasOwnProperty(d)&&
(d=b[d],e=a.getAttributeNS(d[0],d[1]),d[2]&&e&&(c+=d[2]+":"+e+";"));return c}function d(b){return(b=a(b,q,"text-properties"))?T.parseFoFontSize(b.getAttributeNS(n,"font-size")):null}function c(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function t(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var e=c.getAttributeNS(w,"level"),
f;c=T.getFirstNonWhitespaceChild(c);c=T.getFirstNonWhitespaceChild(c);var h;c&&(f=c.attributes,h=f["fo:text-indent"]?f["fo:text-indent"].value:void 0,f=f["fo:margin-left"]?f["fo:margin-left"].value:void 0);h||(h="-0.6cm");c="-"===h.charAt(0)?h.substring(1):"-"+h;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";void 0!==f&&(f=e+"{margin-left:"+f+";}",a.insertRule(f,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+
d+";";d+="counter-increment:list;";d+="margin-left:"+h+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(g){throw g;}}function h(b,f,g,m){if("list"===f)for(var l=m.firstChild,p,r;l;){if(l.namespaceURI===w)if(p=l,"list-level-style-number"===l.localName){var u=p;r=u.getAttributeNS(q,"num-format");var E=u.getAttributeNS(q,"num-suffix"),G={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},u=u.getAttributeNS(q,"num-prefix")||"",u=G.hasOwnProperty(r)?
u+(" counter(list, "+G[r]+")"):r?u+("'"+r+"';"):u+" ''";E&&(u+=" '"+E+"'");r="content: "+u+";";t(b,g,p,r)}else"list-level-style-image"===l.localName?(r="content: none;",t(b,g,p,r)):"list-level-style-bullet"===l.localName&&(r="content: '"+p.getAttributeNS(w,"bullet-char")+"';",t(b,g,p,r));l=l.nextSibling}else if("page"===f)if(E=p=g="",l=m.getElementsByTagNameNS(q,"page-layout-properties")[0],p=l.parentNode.parentNode.parentNode.masterStyles,E="",g+=e(l,J),r=l.getElementsByTagNameNS(q,"background-image"),
0<r.length&&(E=r.item(0).getAttributeNS(v,"href"))&&(g+="background-image: url('odfkit:"+E+"');",r=r.item(0),g+=e(r,D)),"presentation"===ka){if(p)for(r=p.getElementsByTagNameNS(q,"master-page"),G=0;G<r.length;G+=1)if(r[G].getAttributeNS(q,"page-layout-name")===l.parentNode.getAttributeNS(q,"name")){E=r[G].getAttributeNS(q,"name");p="draw|page[draw|master-page-name="+E+"] {"+g+"}";E="office|body, draw|page[draw|master-page-name="+E+"] {"+e(l,U)+" }";try{b.insertRule(p,b.cssRules.length),b.insertRule(E,
b.cssRules.length)}catch(ea){throw ea;}}}else{if("text"===ka){p="office|text {"+g+"}";E="office|body {width: "+l.getAttributeNS(n,"page-width")+";}";try{b.insertRule(p,b.cssRules.length),b.insertRule(E,b.cssRules.length)}catch(ha){throw ha;}}}else{g=k(f,g,m).join(",");l="";if(p=a(m,q,"text-properties")){var G=p,V;r=V="";E=1;p=""+e(G,y);u=G.getAttributeNS(q,"text-underline-style");"solid"===u&&(V+=" underline");u=G.getAttributeNS(q,"text-line-through-style");"solid"===u&&(V+=" line-through");V.length&&
(p+="text-decoration:"+V+";");if(V=G.getAttributeNS(q,"font-name")||G.getAttributeNS(n,"font-family"))u=da[V],p+="font-family: "+(u||V)+", sans-serif;";u=G.parentNode;if(G=d(u)){for(;u;){if(G=d(u)){if("%"!==G.unit){r="font-size: "+G.value*E+G.unit+";";break}E*=G.value/100}G=u;V=u="";u=null;"default-style"===G.localName?u=null:(u=G.getAttributeNS(q,"parent-style-name"),V=G.getAttributeNS(q,"family"),u=O.getODFElementsWithXPath(ca,u?"//style:*[@style:name='"+u+"'][@style:family='"+V+"']":"//style:default-style[@style:family='"+
V+"']",odf.Namespaces.resolvePrefix)[0])}r||(r="font-size: "+parseFloat(W)*E+ba.getUnits(W)+";");p+=r}l+=p}if(p=a(m,q,"paragraph-properties"))r=p,p=""+e(r,H),E=r.getElementsByTagNameNS(q,"background-image"),0<E.length&&(G=E.item(0).getAttributeNS(v,"href"))&&(p+="background-image: url('odfkit:"+G+"');",E=E.item(0),p+=e(E,D)),(r=r.getAttributeNS(n,"line-height"))&&"normal"!==r&&(r=T.parseFoLineHeight(r),p="%"!==r.unit?p+("line-height: "+r.value+r.unit+";"):p+("line-height: "+r.value/100+";")),l+=p;
if(p=a(m,q,"graphic-properties"))G=p,p=""+e(G,A),r=G.getAttributeNS(s,"opacity"),E=G.getAttributeNS(s,"fill"),G=G.getAttributeNS(s,"fill-color"),"solid"===E||"hatch"===E?G&&"none"!==G?(r=isNaN(parseFloat(r))?1:parseFloat(r)/100,(G=c(G))&&(p+="background-color: rgba("+G.r+","+G.g+","+G.b+","+r+");")):p+="background: none;":"none"===E&&(p+="background: none;"),l+=p;if(p=a(m,q,"drawing-page-properties"))r=""+e(p,A),"true"===p.getAttributeNS(z,"background-visible")&&(r+="background: none;"),l+=r;if(p=
a(m,q,"table-cell-properties"))p=""+e(p,N),l+=p;if(p=a(m,q,"table-row-properties"))p=""+e(p,P),l+=p;if(p=a(m,q,"table-column-properties"))p=""+e(p,C),l+=p;if(p=a(m,q,"table-properties"))p=""+e(p,B),l+=p;if(0!==l.length)try{b.insertRule(g+"{"+l+"}",b.cssRules.length)}catch(R){throw R;}}for(var Z in m.derivedStyles)m.derivedStyles.hasOwnProperty(Z)&&h(b,f,Z,m.derivedStyles[Z])}var s=odf.Namespaces.drawns,n=odf.Namespaces.fons,q=odf.Namespaces.stylens,r=odf.Namespaces.svgns,w=odf.Namespaces.textns,v=
odf.Namespaces.xlinkns,z=odf.Namespaces.presentationns,u={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},p={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),
presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background",
"table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},y=[[n,"color","color"],[n,"background-color","background-color"],[n,"font-weight","font-weight"],[n,"font-style","font-style"]],D=[[q,"repeat","background-repeat"]],H=[[n,"background-color","background-color"],[n,"text-align","text-align"],[n,"text-indent","text-indent"],[n,"padding","padding"],[n,"padding-left","padding-left"],[n,"padding-right","padding-right"],[n,"padding-top","padding-top"],[n,"padding-bottom","padding-bottom"],[n,"border-left","border-left"],[n,"border-right",
"border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"margin","margin"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"],[n,"border","border"]],A=[[n,"background-color","background-color"],[n,"min-height","min-height"],[s,"stroke","border"],[r,"stroke-color","border-color"],[r,"stroke-width","border-width"]],N=[[n,"background-color","background-color"],[n,"border-left","border-left"],
[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"border","border"]],C=[[q,"column-width","width"]],P=[[q,"row-height","height"],[n,"keep-together",null]],B=[[q,"width","width"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"]],J=[[n,"background-color","background-color"],[n,"padding","padding"],[n,"padding-left","padding-left"],[n,"padding-right","padding-right"],
[n,"padding-top","padding-top"],[n,"padding-bottom","padding-bottom"],[n,"border","border"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"margin","margin"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"]],U=[[n,"page-width","width"],[n,"page-height","height"]],da={},T=new odf.OdfUtils,ka,ca,W,O=new xmldom.XPath,ba=new core.CSSUnits;
this.style2css=function(a,b,c,d,e){for(var f,k,n,m;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);f=null;d&&(f=d.ownerDocument,ca=d.parentNode);e&&(f=e.ownerDocument,ca=e.parentNode);if(f)for(m in odf.Namespaces.forEachPrefix(function(a,c){n="@namespace "+a+" url("+c+");";try{b.insertRule(n,b.cssRules.length)}catch(d){}}),da=c,ka=a,W=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=l(d),d=l(e),e={},u)if(u.hasOwnProperty(m))for(k in c=e[m]={},g(a[m],
c),g(d[m],c),c)c.hasOwnProperty(k)&&h(b,m,k,c[k])}};
// Input 33
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function l(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function f(a){var b,c=h.length;for(b=0;b<c;b+=1)if(a.namespaceURI===d&&a.localName===h[b])return b;return-1}function m(a,b){var c=new e.UsedStyleList(a,b),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var e=d.acceptNode(a);e===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&(e=c.uses(a)?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT);return e}}function g(a,b){var c=new m(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function b(a,b){if(b){var c=f(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=f(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}function k(a){this.OdfContainer=a}function a(a,
b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var e=new odf.StyleInfo,d="urn:oasis:names:tc:opendocument:xmlns:office:1.0",c="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
t="urn:webodf:names:scope",h="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),s=(new Date).getTime()+"_webodf_",n=new core.Base64;k.prototype=new function(){};k.prototype.constructor=k;k.namespaceURI=d;k.localName="document";a.prototype.load=function(){};a.prototype.getUrl=function(){return this.data?"data:;base64,"+n.toBase64(this.data):null};odf.OdfContainer=function r(f,h){function n(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?
n(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function u(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS(t,"scope",b),c=c.nextSibling}function p(a,b){var c=null,d,e,f;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(f=d.getAttributeNS(t,"scope"))&&f!==b&&c.removeChild(d),d=e;return c}function y(a){var b=M.rootElement.ownerDocument,c;if(a){n(a.documentElement);try{c=b.importNode(a.documentElement,
!0)}catch(d){}}return c}function D(a){M.state=a;if(M.onchange)M.onchange(M);if(M.onstatereadychange)M.onstatereadychange(M)}function H(a){Y=null;M.rootElement=a;a.fontFaceDecls=l(a,d,"font-face-decls");a.styles=l(a,d,"styles");a.automaticStyles=l(a,d,"automatic-styles");a.masterStyles=l(a,d,"master-styles");a.body=l(a,d,"body");a.meta=l(a,d,"meta")}function A(a){a=y(a);var c=M.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===d?(c.fontFaceDecls=l(a,d,"font-face-decls"),b(c,c.fontFaceDecls),
c.styles=l(a,d,"styles"),b(c,c.styles),c.automaticStyles=l(a,d,"automatic-styles"),u(c.automaticStyles,"document-styles"),b(c,c.automaticStyles),c.masterStyles=l(a,d,"master-styles"),b(c,c.masterStyles),e.prefixStyleNames(c.automaticStyles,s,c.masterStyles)):D(r.INVALID)}function N(a){a=y(a);var c,e,f;if(a&&"document-content"===a.localName&&a.namespaceURI===d){c=M.rootElement;e=l(a,d,"font-face-decls");if(c.fontFaceDecls&&e)for(f=e.firstChild;f;)c.fontFaceDecls.appendChild(f),f=e.firstChild;else e&&
(c.fontFaceDecls=e,b(c,e));e=l(a,d,"automatic-styles");u(e,"document-content");if(c.automaticStyles&&e)for(f=e.firstChild;f;)c.automaticStyles.appendChild(f),f=e.firstChild;else e&&(c.automaticStyles=e,b(c,e));c.body=l(a,d,"body");b(c,c.body)}else D(r.INVALID)}function C(a){a=y(a);var c;a&&("document-meta"===a.localName&&a.namespaceURI===d)&&(c=M.rootElement,c.meta=l(a,d,"meta"),b(c,c.meta))}function P(a){a=y(a);var c;a&&("document-settings"===a.localName&&a.namespaceURI===d)&&(c=M.rootElement,c.settings=
l(a,d,"settings"),b(c,c.settings))}function B(a){a=y(a);var b;if(a&&"manifest"===a.localName&&a.namespaceURI===c)for(b=M.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===c)&&(K[a.getAttributeNS(c,"full-path")]=a.getAttributeNS(c,"media-type")),a=a.nextSibling}function J(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],L.loadAsDOM(c,function(b,c){d(c);b||M.state===r.INVALID||J(a)})):D(r.DONE)}function U(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function da(){var a=new xmldom.LSSerializer,b=U("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(M.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function T(a,b){var d=document.createElementNS(c,"manifest:file-entry");d.setAttributeNS(c,"manifest:full-path",a);d.setAttributeNS(c,"manifest:media-type",b);return d}function ka(){var a=
runtime.parseXML('<manifest:manifest xmlns:manifest="'+c+'"></manifest:manifest>'),b=l(a,c,"manifest"),d=new xmldom.LSSerializer,e;for(e in K)K.hasOwnProperty(e)&&b.appendChild(T(e,K[e]));d.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+d.writeToString(a,odf.Namespaces.namespaceMap)}function ca(){var a=new xmldom.LSSerializer,b=U("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(M.rootElement.settings,odf.Namespaces.namespaceMap);
return b+"</office:document-settings>"}function W(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=p(M.rootElement.automaticStyles,"document-styles"),d=M.rootElement.masterStyles&&M.rootElement.masterStyles.cloneNode(!0),f=U("document-styles");e.removePrefixFromStyleNames(c,s,d);b.filter=new m(d,c);f+=b.writeToString(M.rootElement.fontFaceDecls,a);f+=b.writeToString(M.rootElement.styles,a);f+=b.writeToString(c,a);f+=b.writeToString(d,a);return f+"</office:document-styles>"}function O(){var a=
odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=p(M.rootElement.automaticStyles,"document-content"),d=U("document-content");b.filter=new g(M.rootElement.body,c);d+=b.writeToString(c,a);d+=b.writeToString(M.rootElement.body,a);return d+"</office:document-content>"}function ba(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var e=y(c);e&&"document"===e.localName&&e.namespaceURI===d?(H(e),D(r.DONE)):D(r.INVALID)}})}function S(){function a(b,c){var f;c||(c=b);f=document.createElementNS(d,
c);e[b]=f;e.appendChild(f)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),e=M.rootElement,f=document.createElementNS(d,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");e.body.appendChild(f);D(r.DONE);return b}function Q(){var a,b=new Date;a=runtime.byteArrayFromString(ca(),"utf8");
L.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(da(),"utf8");L.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(W(),"utf8");L.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(O(),"utf8");L.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(ka(),"utf8");L.save("META-INF/manifest.xml",a,!0,b)}function F(a,b){Q();L.writeAs(a,function(a){b(a)})}var M=this,L,K={},Y;this.onstatereadychange=h;this.rootElement=this.state=this.onchange=null;this.setRootElement=H;this.getContentElement=
function(){var a;Y||(a=M.rootElement.body,Y=a.getElementsByTagNameNS(d,"text")[0]||a.getElementsByTagNameNS(d,"presentation")[0]||a.getElementsByTagNameNS(d,"spreadsheet")[0]);return Y};this.getDocumentType=function(){var a=M.getContentElement();return a&&a.localName};this.getPart=function(b){return new a(b,K[b],M,L)};this.getPartData=function(a,b){L.load(a,b)};this.createByteArray=function(a,b){Q();L.createByteArray(a,b)};this.saveAs=F;this.save=function(a){F(f,a)};this.getUrl=function(){return f};
this.state=r.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(k);L=f?new core.Zip(f,function(a,b){L=b;a?ba(f,function(b){a&&(L.error=a+"\n"+b,D(r.INVALID))}):J([["styles.xml",A],["content.xml",N],["meta.xml",C],["settings.xml",P],["META-INF/manifest.xml",B]])}):S()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=
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
odf.FontLoader=function(){function l(f,b,k,a,e){var d,c=0,t;for(t in f)if(f.hasOwnProperty(t)){if(c===k){d=t;break}c+=1}d?b.getPartData(f[d].href,function(c,s){if(c)runtime.log(c);else{var n="@font-face { font-family: '"+(f[d].family||d)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+m.convertUTF8ArrayToBase64(s)+') format("truetype"); }';try{a.insertRule(n,a.cssRules.length)}catch(q){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(q)+"\nRule: "+n)}}l(f,b,k+1,a,e)}):
e&&e()}var f=new xmldom.XPath,m=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(g,b){for(var k=g.rootElement.fontFaceDecls;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);if(k){var a={},e,d,c,m;if(k)for(k=f.getODFElementsWithXPath(k,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),e=0;e<k.length;e+=1)d=k[e],c=d.getAttributeNS(odf.Namespaces.stylens,"name"),m=d.getAttributeNS(odf.Namespaces.svgns,"font-family"),d=f.getODFElementsWithXPath(d,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<d.length&&(d=d[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),a[c]={href:d,family:m});l(a,g,0,b)}}};return odf.FontLoader}();
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
odf.Formatting=function(){function l(a,b){Object.keys(b).forEach(function(c){try{a[c]=b[c].constructor===Object?l(a[c],b[c]):b[c]}catch(d){a[c]=b[c]}});return a}function f(a,b,d){var e,f;d=d||[c.rootElement.automaticStyles,c.rootElement.styles];for(e=d.shift();e;){for(e=e.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&(f=e.getAttributeNS(s,"name"),e.namespaceURI===s&&"style"===e.localName&&e.getAttributeNS(s,"family")===b&&f===a||"list-style"===b&&e.namespaceURI===n&&"list-style"===e.localName&&
f===a||"data"===b&&e.namespaceURI===q&&f===a))return e;e=e.nextSibling}e=d.shift()}return null}function m(a){for(var b={},c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===s)for(b[c.nodeName]={},a=0;a<c.attributes.length;a+=1)b[c.nodeName][c.attributes[a].name]=c.attributes[a].value;c=c.nextSibling}return b}function g(a,b){Object.keys(b).forEach(function(c){var d=c.split(":"),e=d[1],f=odf.Namespaces.resolvePrefix(d[0]),d=b[c];"object"===typeof d&&Object.keys(d).length?(c=a.getElementsByTagNameNS(f,
e)[0]||a.ownerDocument.createElementNS(f,c),a.appendChild(c),g(c,d)):a.setAttributeNS(f,c,d)})}function b(a){var b=c.rootElement.styles,d;d={};for(var e={},h=a;h;)d=m(h),e=l(d,e),h=(d=h.getAttributeNS(s,"parent-style-name"))?f(d,a.getAttributeNS(s,"family"),[b]):null;a:{a=a.getAttributeNS(s,"family");for(b=c.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===s&&"default-style"===b.localName&&b.getAttributeNS(s,"family")===a){h=b;break a}b=b.nextSibling}h=null}h&&
(d=m(h),e=l(d,e));return e}function k(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],f="",h=!1;c;)!h&&r.isGroupingElement(c)&&(h=!0),(d=t.determineStylesForNode(c))&&e.push(d),c=c.parentNode;h&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){f+="|"+b+":"+a+"|"})})}),b&&(b[f]=e));return h?e:void 0}function a(a){var c={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(d){var e=Object.keys(a[d])[0],h,g;(h=f(e,d))?
(g=b(h),c=l(g,c),g=h.getAttributeNS(s,"display-name")):runtime.log("No style element found for '"+e+"' of family '"+d+"'");c.orderedStyles.push({name:e,family:d,displayName:g})})});return c}function e(){var a,b=[];[c.rootElement.automaticStyles,c.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===s&&"style"===a.localName||a.namespaceURI===n&&"list-style"===a.localName)&&b.push(a.getAttributeNS(s,"name")),a=a.nextSibling});return b}var d=
this,c,t=new odf.StyleInfo,h=odf.Namespaces.svgns,s=odf.Namespaces.stylens,n=odf.Namespaces.textns,q=odf.Namespaces.numberns,r=new odf.OdfUtils,w=new core.Utils;this.setOdfContainer=function(a){c=a};this.getFontMap=function(){for(var a=c.rootElement.fontFaceDecls,b={},d,e,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(d=a.getAttributeNS(s,"name"))&&((e=a.getAttributeNS(h,"font-family"))||a.getElementsByTagNameNS(h,"font-face-uri")[0])&&(b[d]=e),a=a.nextSibling;return b};this.getAvailableParagraphStyles=
function(){for(var a=c.rootElement.styles&&c.rootElement.styles.firstChild,b,d,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===s)&&(d=a,b=d.getAttributeNS(s,"family"),"paragraph"===b&&(b=d.getAttributeNS(s,"name"),d=d.getAttributeNS(s,"display-name")||b,b&&d&&e.push({name:b,displayName:d}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var b;b=t.hasDerivedStyles(c.rootElement,odf.Namespaces.resolvePrefix,a);a=(new t.UsedStyleList(c.rootElement.styles)).uses(a)||
(new t.UsedStyleList(c.rootElement.automaticStyles)).uses(a)||(new t.UsedStyleList(c.rootElement.body)).uses(a);return b||a};this.getStyleElement=f;this.getStyleAttributes=m;this.getInheritedStyleAttributes=b;this.getFirstNamedParentStyleNameOrSelf=function(a){var b=c.rootElement.automaticStyles,d=c.rootElement.styles,e;for(e=f(a,"paragraph",[b]);e;)a=e.getAttributeNS(s,"parent-style-name"),e=f(a,"paragraph",[b]);return(e=f(a,"paragraph",[d]))?a:null};this.hasParagraphStyle=function(a){return Boolean(f(a,
"paragraph"))};this.getAppliedStyles=function(b){var c={},d=[];b.forEach(function(a){k(a,c)});Object.keys(c).forEach(function(b){d.push(a(c[b]))});return d};this.getAppliedStylesForElement=function(b){return(b=k(b))?a(b):void 0};this.applyStyle=function(a,b,e,f){(new odf.TextStyleApplicator("auto"+w.hashString(a)+"_",d,c.rootElement.automaticStyles)).applyStyle(b,e,f)};this.updateStyle=function(a,b,c){var d,f;g(a,b);if(c){a.getAttributeNS(s,"name");d=e();f=0;do b=c+f,f+=1;while(-1!==d.indexOf(b));
a.setAttributeNS(s,"style:name",b)}}};
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
odf.OdfCanvas=function(){function l(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(e)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function f(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a}function m(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function g(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}
function c(){var f=[],h=runtime.getWindow().getSelection(),g,k;for(g=0;g<h.rangeCount;g+=1)k=h.getRangeAt(g),null!==k&&(b(a,k.startContainer)&&b(a,k.endContainer))&&f.push(k);if(f.length===d.length){for(h=0;h<f.length&&(g=f[h],k=d[h],g=g===k?!1:null===g||null===k?!0:g.startContainer!==k.startContainer||g.startOffset!==k.startOffset||g.endContainer!==k.endContainer||g.endOffset!==k.endOffset,!g);h+=1);if(h===f.length)return}d=f;var h=[f.length],n,m=a.ownerDocument;for(g=0;g<f.length;g+=1)k=f[g],n=
m.createRange(),n.setStart(k.startContainer,k.startOffset),n.setEnd(k.endContainer,k.endOffset),h[g]=n;d=h;h=e.length;for(f=0;f<h;f+=1)e[f](a,d)}var d=[],e=[];this.addListener=function(a,b){var c,d=e.length;for(c=0;c<d;c+=1)if(e[c]===b)return;e.push(b)};m(a,"mouseup",c);m(a,"keyup",c);m(a,"keydown",c)}function b(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function k(a,b,c,d){c.setAttribute("styleid",b);var e,f=
c.getAttributeNS(y,"anchor-type"),h=c.getAttributeNS(u,"x"),g=c.getAttributeNS(u,"y"),n=c.getAttributeNS(u,"width"),m=c.getAttributeNS(u,"height"),l=c.getAttributeNS(w,"min-height"),p=c.getAttributeNS(w,"min-width"),q=c.getAttributeNS(r,"master-page-name"),s=null,t,v;t=0;var D,H=a.rootElement.ownerDocument;if(q){s=a.rootElement.masterStyles.getElementsByTagNameNS(z,"master-page");t=null;for(v=0;v<s.length;v+=1)if(s[v].getAttributeNS(z,"name")===q){t=s[v];break}s=t}else s=null;if(s){q=H.createElementNS(r,
"draw:page");D=s.firstElementChild;for(t=0;D;)"true"!==D.getAttributeNS(A,"placeholder")&&(v=D.cloneNode(!0),q.appendChild(v),k(a,b+"_"+t,v,d)),D=D.nextElementSibling,t+=1;J.appendChild(q);t=J.getElementsByTagNameNS(r,"page").length;if(v=q.getElementsByTagNameNS(y,"page-number")[0]){for(;v.firstChild;)v.removeChild(v.firstChild);v.appendChild(H.createTextNode(t))}k(a,b,q,d);q.setAttributeNS(r,"draw:master-page-name",s.getAttributeNS(z,"name"))}if("as-char"===f)e="display: inline-block;";else if(f||
h||g)e="position: absolute;";else if(n||m||l||p)e="display: block;";h&&(e+="left: "+h+";");g&&(e+="top: "+g+";");n&&(e+="width: "+n+";");m&&(e+="height: "+m+";");l&&(e+="min-height: "+l+";");p&&(e+="min-width: "+p+";");e&&(e="draw|"+c.localName+'[styleid="'+b+'"] {'+e+"}",d.insertRule(e,d.cssRules.length))}function a(a){for(a=a.firstChild;a;){if(a.namespaceURI===v&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function e(b,
c,d,e){function f(a){a&&(a='draw|image[styleid="'+b+'"] {'+("background-image: url("+a+");")+"}",e.insertRule(a,e.cssRules.length))}d.setAttribute("styleid",b);var h=d.getAttributeNS(D,"href"),g;if(h)if(/^(?:http|https|ftp):\/\//.test(h))f(h);else try{g=c.getPart(h),g.onchange=function(a){f(a.url)},g.load()}catch(k){runtime.log("slight problem: "+k)}else h=a(d),f(h)}function d(a){function b(a){return d===a.getAttributeNS(v,"name")}var c=B.getElementsByTagNameNS(a,v,"annotation");a=B.getElementsByTagNameNS(a,
v,"annotation-end");var d,e;for(e=0;e<c.length;e+=1)d=c[e].getAttributeNS(v,"name"),T.addAnnotation({node:c[e],end:a.filter(b)[0]||null});T.rerenderAnnotations()}function c(a){function b(c){var d,e;c.hasAttributeNS(D,"href")&&(d=c.getAttributeNS(D,"href"),"#"===d[0]?(d=d.substring(1),e=function(){var b=C.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=C.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));
0<b.length&&b[0].scrollIntoView(!0);return!1}):e=function(){N.open(d)},c.onclick=e)}var c,d,e;d=a.getElementsByTagNameNS(y,"a");for(c=0;c<d.length;c+=1)e=d.item(c),b(e)}function t(a){var b=a.ownerDocument;B.getElementsByTagNameNS(a,y,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(y,"c"),10);if(1<d)for(a.removeAttributeNS(y,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function h(a){B.getElementsByTagNameNS(a,
y,"tab").forEach(function(a){a.textContent="\t"})}function s(b,c){function d(a,b){var h=g.documentElement.namespaceURI;"video/"===b.substr(0,6)?(e=g.createElementNS(h,"video"),e.setAttribute("controls","controls"),f=g.createElementNS(h,"source"),f.setAttribute("src",a),f.setAttribute("type",b),e.appendChild(f),c.parentNode.appendChild(e)):c.innerHtml="Unrecognised Plugin"}var e,f,h,g=c.ownerDocument,k;if(h=c.getAttributeNS(D,"href"))try{k=b.getPart(h),k.onchange=function(a){d(a.url,a.mimetype)},k.load()}catch(n){runtime.log("slight problem: "+
n)}else runtime.log("using MP4 data fallback"),h=a(c),d(h,"video/mp4")}function n(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));
c.setAttribute("type","text/css");b.appendChild(c);return c}function q(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var r=odf.Namespaces.drawns,w=odf.Namespaces.fons,v=odf.Namespaces.officens,z=odf.Namespaces.stylens,
u=odf.Namespaces.svgns,p=odf.Namespaces.tablens,y=odf.Namespaces.textns,D=odf.Namespaces.xlinkns,H=odf.Namespaces.xmlns,A=odf.Namespaces.presentationns,N=runtime.getWindow(),C=new xmldom.XPath,P=new odf.OdfUtils,B=new core.DomUtils,J,U,da=!1,T;odf.OdfCanvas=function(a){function v(a,b,c){function d(a,b,c,f){na.addToQueue(function(){e(a,b,c,f)})}var f,h;f=b.getElementsByTagNameNS(r,"image");for(b=0;b<f.length;b+=1)h=f.item(b),d("image"+String(b),a,h,c)}function w(a,b){function c(a,b){na.addToQueue(function(){s(a,
b)})}var d,e,f;e=b.getElementsByTagNameNS(r,"plugin");for(d=0;d<e.length;d+=1)f=e.item(d),c(a,f)}function u(){var b=a.firstChild;b.firstChild&&(1<R?(b.style.MozTransformOrigin="center top",b.style.WebkitTransformOrigin="center top",b.style.OTransformOrigin="center top",b.style.msTransformOrigin="center top"):(b.style.MozTransformOrigin="left top",b.style.WebkitTransformOrigin="left top",b.style.OTransformOrigin="left top",b.style.msTransformOrigin="left top"),b.style.WebkitTransform="scale("+R+")",
b.style.MozTransform="scale("+R+")",b.style.OTransform="scale("+R+")",b.style.msTransform="scale("+R+")",a.style.width=Math.round(R*b.offsetWidth)+"px",a.style.height=Math.round(R*b.offsetHeight)+"px")}function D(a){var b=L.getElementById("sizer");da?(U.parentNode||(b.appendChild(U),b.style.paddingRight=N.getComputedStyle(U).width,u()),T&&T.forgetAnnotations(),T=new gui.AnnotationViewManager(a.body,U),d(a.body)):U.parentNode&&(b.removeChild(U),b.style.paddingRight=0,T.forgetAnnotations(),u())}function A(d){function e(){for(var f=
a;f.firstChild;)f.removeChild(f.firstChild);a.style.display="inline-block";f=K.rootElement;a.ownerDocument.importNode(f,!0);Y.setOdfContainer(K);var g=K,n=G;(new odf.FontLoader).loadFonts(g,n.sheet);b(K,Y,ea);for(var m=K,g=ha.sheet,n=a;n.firstChild;)n.removeChild(n.firstChild);n=L.createElementNS(a.namespaceURI,"div");n.style.display="inline-block";n.style.background="white";n.id="sizer";n.appendChild(f);a.appendChild(n);U=L.createElementNS(a.namespaceURI,"div");U.id="annotationsPane";J=L.createElementNS(a.namespaceURI,
"div");J.id="shadowContent";J.style.position="absolute";J.style.top=0;J.style.left=0;m.getContentElement().appendChild(J);var l=f.body,q,s,A;s=[];for(q=l.firstChild;q&&q!==l;)if(q.namespaceURI===r&&(s[s.length]=q),q.firstChild)q=q.firstChild;else{for(;q&&q!==l&&!q.nextSibling;)q=q.parentNode;q&&q.nextSibling&&(q=q.nextSibling)}for(A=0;A<s.length;A+=1)q=s[A],k(m,"frame"+String(A),q,g);s=C.getODFElementsWithXPath(l,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(q=0;q<s.length;q+=
1)l=s[q],l.setAttributeNS&&l.setAttributeNS("urn:webodf","containsparagraphanchor",!0);q=f.body.getElementsByTagNameNS(p,"table-cell");for(l=0;l<q.length;l+=1)s=q.item(l),s.hasAttributeNS(p,"number-columns-spanned")&&s.setAttribute("colspan",s.getAttributeNS(p,"number-columns-spanned")),s.hasAttributeNS(p,"number-rows-spanned")&&s.setAttribute("rowspan",s.getAttributeNS(p,"number-rows-spanned"));c(f.body);t(f.body);h(f.body);v(m,f.body,g);w(m,f.body);s=f.body;var x,fa,ja,aa,l={};q={};var B;A=N.document.getElementsByTagNameNS(y,
"list-style");for(m=0;m<A.length;m+=1)x=A.item(m),(ja=x.getAttributeNS(z,"name"))&&(q[ja]=x);s=s.getElementsByTagNameNS(y,"list");for(m=0;m<s.length;m+=1)if(x=s.item(m),A=x.getAttributeNS(H,"id")){fa=x.getAttributeNS(y,"continue-list");x.setAttribute("id",A);aa="text|list#"+A+" > text|list-item > *:first-child:before {";if(ja=x.getAttributeNS(y,"style-name")){x=q[ja];B=P.getFirstNonWhitespaceChild(x);x=void 0;if("list-level-style-number"===B.localName){x=B.getAttributeNS(z,"num-format");ja=B.getAttributeNS(z,
"num-suffix");var F="",F={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},E=void 0,E=B.getAttributeNS(z,"num-prefix")||"",E=F.hasOwnProperty(x)?E+(" counter(list, "+F[x]+")"):x?E+("'"+x+"';"):E+" ''";ja&&(E+=" '"+ja+"'");x=F="content: "+E+";"}else"list-level-style-image"===B.localName?x="content: none;":"list-level-style-bullet"===B.localName&&(x="content: '"+B.getAttributeNS(y,"bullet-char")+"';");B=x}if(fa){for(x=l[fa];x;)fa=x,x=l[fa];aa+="counter-increment:"+fa+";";
B?(B=B.replace("list",fa),aa+=B):aa+="content:counter("+fa+");"}else fa="",B?(B=B.replace("list",A),aa+=B):aa+="content: counter("+A+");",aa+="counter-increment:"+A+";",g.insertRule("text|list#"+A+" {counter-reset:"+A+"}",g.cssRules.length);aa+="}";l[A]=fa;aa&&g.insertRule(aa,g.cssRules.length)}n.insertBefore(J,n.firstChild);u();D(f);if(!d&&(f=[K],Z.hasOwnProperty("statereadychange")))for(g=Z.statereadychange,n=0;n<g.length;n+=1)g[n].apply(null,f)}K.state===odf.OdfContainer.DONE?e():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),
runtime.setTimeout(function ma(){K.state===odf.OdfContainer.DONE?e():(runtime.log("will be back later..."),runtime.setTimeout(ma,500))},100))}function B(b){na.clearQueue();a.innerHTML="loading "+b;a.removeAttribute("style");K=new odf.OdfContainer(b,function(a){K=a;A(!1)})}function F(){if(X){for(var a=X.ownerDocument.createDocumentFragment();X.firstChild;)a.insertBefore(X.firstChild,null);X.parentNode.replaceChild(a,X)}}function M(a){a=a||N.event;for(var b=a.target,c=N.getSelection(),d=0<c.rangeCount?
c.getRangeAt(0):null,e=d&&d.startContainer,f=d&&d.startOffset,h=d&&d.endContainer,g=d&&d.endOffset,k,n;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==y);)b=b.parentNode;V&&(b&&b.parentNode!==X)&&(k=b.ownerDocument,n=k.documentElement.namespaceURI,X?X.parentNode&&F():(X=k.createElementNS(n,"p"),X.style.margin="0px",X.style.padding="0px",X.style.border="0px",X.setAttribute("contenteditable",!0)),b.parentNode.replaceChild(X,b),X.appendChild(b),X.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),
d.setStart(e,f),d.setEnd(h,g),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==a&&void 0!==a,"odf.OdfCanvas constructor needs DOM element");var L=a.ownerDocument,K,Y=new odf.Formatting,la=new g(a),E,G,ea,ha,V=!1,R=1,Z={},X,na=new l;n(L);E=new f(q(L));G=q(L);ea=q(L);ha=q(L);this.refreshCSS=function(){b(K,Y,ea);u()};this.refreshSize=function(){u()};this.odfContainer=function(){return K};this.slidevisibilitycss=function(){return E.css};
this.setOdfContainer=function(a,b){K=a;A(!0===b)};this.load=this.load=B;this.save=function(a){F();K.save(a)};this.setEditable=function(b){m(a,"click",M);(V=b)||F()};this.addListener=function(b,c){switch(b){case "selectionchange":la.addListener(b,c);break;case "click":m(a,b,c);break;default:var d=Z[b];void 0===d&&(d=Z[b]=[]);c&&-1===d.indexOf(c)&&d.push(c)}};this.getFormatting=function(){return Y};this.getAnnotationManager=function(){return T};this.refreshAnnotations=function(){D(K.rootElement)};this.rerenderAnnotations=
function(){T&&T.rerenderAnnotations()};this.enableAnnotations=function(a){a!==da&&(da=a,D(K.rootElement))};this.addAnnotation=function(a){T&&T.addAnnotation(a)};this.setZoomLevel=function(a){R=a;u()};this.getZoomLevel=function(){return R};this.fitToContainingElement=function(b,c){var d=a.offsetHeight/R;R=b/(a.offsetWidth/R);c/d<R&&(R=c/d);u()};this.fitToWidth=function(b){R=b/(a.offsetWidth/R);u()};this.fitSmart=function(b,c){var d,e;d=a.offsetWidth/R;e=a.offsetHeight/R;d=b/d;void 0!==c&&c/e<d&&(d=
c/e);R=Math.min(1,d);u()};this.fitToHeight=function(b){R=b/(a.offsetHeight/R);u()};this.showFirstPage=function(){E.showFirstPage()};this.showNextPage=function(){E.showNextPage()};this.showPreviousPage=function(){E.showPreviousPage()};this.showPage=function(a){E.showPage(a);u()};this.getElement=function(){return a}};return odf.OdfCanvas}();
// Input 37
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(l,f,m){return new odf.OdfContainer(l,function(g){if(g.state===odf.OdfContainer.INVALID)return m("Document "+l+" is invalid.");g.state===odf.OdfContainer.DONE?g.saveAs(f,function(b){m(b)}):m("Document was not completely loaded.")})};this.render=function(l,f,m){for(f=f.getElementsByTagName("body")[0];f.firstChild;)f.removeChild(f.firstChild);f=new odf.OdfCanvas(f);f.addListener("statereadychange",function(f){m(f)});f.load(l)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(l,f){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(l,f,m,g){};ops.Server.prototype.getGenesisUrl=function(l){};
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
ops.NowjsServer=function(){var l=this,f;this.getNowObject=function(){return f};this.getGenesisUrl=function(f){return"/session/"+f+"/genesis"};this.connect=function(m,g){function b(){"unavailable"===f.networkStatus?(runtime.log("connection to server unavailable."),g("unavailable")):"ready"!==f.networkStatus?k>m?(runtime.log("connection to server timed out."),g("timeout")):(k+=100,runtime.getWindow().setTimeout(b,100)):(runtime.log("connection to collaboration server established."),g("ready"))}var k=
0;f||(f=runtime.getVariable("now"),void 0===f&&(f={networkStatus:"unavailable"}),b())};this.networkStatus=function(){return f?f.networkStatus:"unavailable"};this.login=function(m,g,b,k){f?f.login(m,g,b,k):k("Not connected to server")};this.createOperationRouter=function(f,g){return new ops.NowjsOperationRouter(f,g,l)};this.createUserModel=function(){return new ops.NowjsUserModel(l)}};
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
ops.PullBoxServer=function(l){function f(b,a){var e=new XMLHttpRequest,d=new core.ByteArrayWriter("utf8"),c=JSON.stringify(b);runtime.log("Sending message to server: "+c);d.appendString(c);d=d.getByteArray();e.open("POST",l.url,!0);e.onreadystatechange=function(){4===e.readyState&&((200>e.status||300<=e.status)&&0===e.status&&runtime.log("Status "+String(e.status)+": "+e.responseText||e.statusText),a(e.responseText))};d=d.buffer&&!e.sendAsBinary?d.buffer:runtime.byteArrayToString(d,"binary");try{e.sendAsBinary?
e.sendAsBinary(d):e.send(d)}catch(f){runtime.log("Problem with calling server: "+f+" "+d),a(f.message)}}var m=this,g,b=new core.Base64;l=l||{};l.url=l.url||"/WSER";this.getGenesisUrl=function(b){return"/session/"+b+"/genesis"};this.call=f;this.getToken=function(){return g};this.setToken=function(b){g=b};this.connect=function(b,a){a("ready")};this.networkStatus=function(){return"ready"};this.login=function(k,a,e,d){f({command:"login",args:{login:b.toBase64(k),password:b.toBase64(a)}},function(a){var b=
runtime.fromJson(a);runtime.log("Login reply: "+a);b.hasOwnProperty("token")?(g=b.token,runtime.log("Caching token: "+m.getToken()),e(b)):d(a)})}};
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
ops.Operation=function(){};ops.Operation.prototype.init=function(l){};ops.Operation.prototype.transform=function(l,f){};ops.Operation.prototype.execute=function(l){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var l=this,f,m;this.init=function(g){f=g.memberid;m=g.timestamp};this.transform=function(f,b){return[l]};this.execute=function(g){var b=g.getCursor(f);if(b)return!1;b=new ops.OdtCursor(f,g);g.addCursor(b);g.emit(ops.OdtDocument.signalCursorAdded,b);return!0};this.spec=function(){return{optype:"AddCursor",memberid:f,timestamp:m}}};
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
gui.StyleHelper=function(l){function f(b,f,a){var e=!0,d;b.collapsed?(d=b.startContainer,d.hasChildNodes()&&b.startOffset<d.childNodes.length&&(d=d.childNodes[b.startOffset]),b=[d]):b=g.getTextNodes(b,!0);b=l.getAppliedStyles(b);for(d=0;d<b.length&&!(e=b[d]["style:text-properties"],e=!e||e[f]!==a);d+=1);return!e}var m=new core.DomUtils,g=new odf.OdfUtils;this.getAppliedStyles=function(b){b=g.getTextNodes(b,!0);return l.getAppliedStyles(b)};this.applyStyle=function(b,f,a){var e=m.splitBoundaries(f),
d=g.getTextNodes(f,!1);l.applyStyle(b,d,{startContainer:f.startContainer,startOffset:f.startOffset,endContainer:f.endContainer,endOffset:f.endOffset},a);e.forEach(m.normalizeTextNodes)};this.isBold=function(b){return f(b,"fo:font-weight","bold")};this.isItalic=function(b){return f(b,"fo:font-style","italic")};this.hasUnderline=function(b){return f(b,"style:text-underline-style","solid")};this.hasStrikeThrough=function(b){return f(b,"style:text-line-through-style","solid")}};
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
ops.OpApplyDirectStyling=function(){function l(a){var d=0<=b?g+b:g,c=a.getIteratorAtPosition(0<=b?g:g+b),d=b?a.getIteratorAtPosition(d):c;a=a.getDOM().createRange();a.setStart(c.container(),c.unfilteredDomOffset());a.setEnd(d.container(),d.unfilteredDomOffset());return a}var f,m,g,b,k,a=new odf.OdfUtils;this.init=function(a){f=a.memberid;m=a.timestamp;g=parseInt(a.position,10);b=parseInt(a.length,10);k=a.setProperties};this.transform=function(a,b){return null};this.execute=function(b){var d=l(b),
c=a.getImpactedParagraphs(d);(new gui.StyleHelper(b.getFormatting())).applyStyle(f,d,k);d.detach();b.getOdfCanvas().refreshCSS();c.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:f,timeStamp:m})});b.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:f,timestamp:m,position:g,length:b,setProperties:k}}};
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
ops.OpRemoveCursor=function(){var l=this,f,m;this.init=function(g){f=g.memberid;m=g.timestamp};this.transform=function(g,b){var k=g.spec();return"RemoveCursor"===k.optype&&k.memberid===f?[]:[l]};this.execute=function(g){return g.removeCursor(f)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:f,timestamp:m}}};
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
ops.OpMoveCursor=function(){var l=this,f,m,g,b;this.init=function(k){f=k.memberid;m=k.timestamp;g=parseInt(k.position,10);b=void 0!==k.length?parseInt(k.length,10):0};this.merge=function(k){return"MoveCursor"===k.optype&&k.memberid===f?(g=k.position,b=k.length,m=k.timestamp,!0):!1};this.transform=function(k,a){var e=k.spec(),d=e.optype,c=g+b,m=[l];"RemoveText"===d?(d=e.position+e.length,d<=g?g-=e.length:e.position<c&&(g<e.position?b=d<c?b-e.length:e.position-g:(g=e.position,b=d<c?c-d:0))):"SplitParagraph"===
d?e.position<g?g+=1:e.position>g&&e.position<c&&(b+=1):"InsertText"===d?e.position<g?g+=e.text.length:e.position>g&&e.position<c&&(b+=e.text.length):"RemoveCursor"===d&&e.memberid===f?m=[]:"InsertTable"===d&&(m=null);return m};this.execute=function(k){var a=k.getCursor(f),e=k.getCursorPosition(f),d=k.getPositionFilter(),c=g-e;if(!a)return!1;e=a.getStepCounter();c=0<c?e.countForwardSteps(c,d):0>c?-e.countBackwardSteps(-c,d):0;a.move(c);b&&(d=0<b?e.countForwardSteps(b,d):0>b?-e.countBackwardSteps(-b,
d):0,a.move(d,!0));k.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:f,timestamp:m,position:g,length:b}}};
// Input 47
ops.OpInsertTable=function(){function l(a,c){var d;if(1===t.length)d=t[0];else if(3===t.length)switch(a){case 0:d=t[0];break;case b-1:d=t[2];break;default:d=t[1]}else d=t[a];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case k-1:return d[2];default:return d[1]}return d[c]}var f=this,m,g,b,k,a,e,d,c,t;this.init=function(f){m=f.memberid;g=f.timestamp;a=parseInt(f.position,10);b=parseInt(f.initialRows,10);k=parseInt(f.initialColumns,10);e=f.tableName;d=f.tableStyleName;c=f.tableColumnStyleName;
t=f.tableCellStyleMatrix};this.transform=function(b,c){var d=b.spec(),e=d.optype,g=[f];if("InsertTable"===e)g=null;else if("SplitParagraph"===e)if(d.position<a)a+=1;else{if(d.position===a&&!c)return a+=1,null}else if("InsertText"===e)if(d.position<a)a+=d.text.length;else{if(d.position===a&&!c)return a+=d.text.length,null}else"RemoveText"===e&&(d.position+d.length<=a?a-=d.length:d.position<a&&(a=d.position));return g};this.execute=function(f){var s=f.getPositionInTextNode(a),n=f.getRootNode();if(s){var q=
f.getDOM(),r=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),v,z,u,p;d&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);e&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",e);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",k);c&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:style-name",c);r.appendChild(t);for(u=0;u<b;u+=1){t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(p=0;p<k;p+=1)v=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(z=l(u,p))&&v.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",z),z=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),v.appendChild(z),t.appendChild(v);r.appendChild(t)}s=f.getParagraphElement(s.textNode);
n.insertBefore(r,s?s.nextSibling:void 0);f.getOdfCanvas().refreshSize();f.emit(ops.OdtDocument.signalTableAdded,{tableElement:r,memberId:m,timeStamp:g});f.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:m,timestamp:g,position:a,initialRows:b,initialColumns:k,tableName:e,tableStyleName:d,tableColumnStyleName:c,tableCellStyleMatrix:t}}};
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
ops.OpInsertText=function(){function l(a,b){var d=b.parentNode,c=b.nextSibling,f=[];a.getCursors().forEach(function(a){var c=a.getSelectedRange();!c||c.startContainer!==b&&c.endContainer!==b||f.push({cursor:a,startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset})});d.removeChild(b);d.insertBefore(b,c);f.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var f=
this,m,g,b,k;this.init=function(a){m=a.memberid;g=a.timestamp;b=parseInt(a.position,10);k=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===m&&a.position===b+k.length?(k+=a.text,g=a.timestamp,!0):!1};this.transform=function(a,e){var d=a.spec(),c=d.optype,g=[f];if("InsertText"===c)if(d.position<b)b+=d.text.length;else{if(d.position===b&&!e)return b+=d.text.length,null}else if("SplitParagraph"===c)if(d.position<b)b+=1;else{if(d.position===b&&!e)return b+=1,null}else"InsertTable"===
c?g=null:"RemoveText"===c&&(d.position+d.length<=b?b-=d.length:d.position<b&&(b=d.position));return g};this.execute=function(a){var e,d,c,f,h=a.getRootNode().ownerDocument,s,n=!0,q=0,r;if(e=a.getPositionInTextNode(b,m)){d=e.textNode;c=d.parentNode;f=d.nextSibling;s=a.getParagraphElement(d);e.offset!==d.length&&(f=d.splitText(e.offset));for(e=0;e<k.length;e+=1)if(" "===k[e]||"\t"===k[e])q<e&&(q=k.substring(q,e),n?d.appendData(q):c.insertBefore(h.createTextNode(q),f)),q=e+1,n=!1,r=" "===k[e]?"text:s":
"text:tab",r=h.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",r),r.appendChild(h.createTextNode(k[e])),c.insertBefore(r,f);q=k.substring(q);0<q.length&&(n?d.appendData(q):c.insertBefore(h.createTextNode(q),f));l(a,d);0===d.length&&d.parentNode.removeChild(d);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:s,memberId:m,timeStamp:g});a.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",
memberid:m,timestamp:g,position:b,text:k}}};
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
ops.OpRemoveText=function(){function l(a){function b(a){if(d.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function e(f){f=c.mergeIntoParent(f);return!d.isParagraph(f)&&f!==a&&b(f)?e(f):f}this.isEmpty=b;this.mergeChildrenIntoParent=e}function f(b){var d=b.getPositionFilter(),e,f,g,m,l=a,v=b.getDOM().createRange();b=b.getIteratorAtPosition(k);e=b.container();for(f=b.unfilteredDomOffset();l&&
b.nextPosition();)g=b.container(),m=b.unfilteredDomOffset(),d.acceptPosition(b)===NodeFilter.FILTER_ACCEPT&&(l-=1);v.setStart(e,f);v.setEnd(g,m);c.splitBoundaries(v);return v}var m=this,g,b,k,a,e,d,c;this.init=function(f){runtime.assert(0<=f.length,"OpRemoveText only supports positive lengths");g=f.memberid;b=f.timestamp;k=parseInt(f.position,10);a=parseInt(f.length,10);e=f.text;d=new odf.OdfUtils;c=new core.DomUtils};this.transform=function(b,c){var d=b.spec(),e=d.optype,f=k+a,g=[m];"RemoveText"===
e?(e=d.position+d.length,e<=k?k-=d.length:d.position<f&&(k<d.position?a=e<f?a-d.length:d.position-k:e<f?(k=d.position,a=f-e):g=[])):"InsertText"===e?d.position<=k&&(k+=d.text.length):"SplitParagraph"===e?d.position<=k&&(k+=1):"InsertTable"===e&&(g=null);return g};this.execute=function(c){var d,e,n,m,r=new l(c.getRootNode());c.upgradeWhitespacesAtPosition(k);c.upgradeWhitespacesAtPosition(k+a);e=f(c);d=c.getParagraphElement(e.startContainer);n=c.getTextElements(e,!0);m=c.getParagraphElements(e);e.detach();
n.forEach(function(a){r.mergeChildrenIntoParent(a)});e=m.reduce(function(a,b){var c,d,e=a,f=b,g,h;r.isEmpty(a)&&(d=!0,b.parentNode!==a.parentNode&&(g=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),f=a,e=b,h=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;f.hasChildNodes();)c=d?f.lastChild:f.firstChild,f.removeChild(c),"editinfo"!==c.localName&&e.insertBefore(c,h);g&&r.isEmpty(g)&&r.mergeChildrenIntoParent(g);r.mergeChildrenIntoParent(f);return e});
c.fixCursorPositions();c.getOdfCanvas().refreshSize();c.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:e||d,memberId:g,timeStamp:b});c.emit(ops.OdtDocument.signalCursorMoved,c.getCursor(g));c.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:g,timestamp:b,position:k,length:a,text:e}}};
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
ops.OpSplitParagraph=function(){var l=this,f,m,g,b=new odf.OdfUtils;this.init=function(b){f=b.memberid;m=b.timestamp;g=parseInt(b.position,10)};this.transform=function(b,a){var e=b.spec(),d=e.optype,c=[l];if("SplitParagraph"===d)if(e.position<g)g+=1;else{if(e.position===g&&!a)return g+=1,null}else if("InsertText"===d)if(e.position<g)g+=e.text.length;else{if(e.position===g&&!a)return g+=e.text.length,null}else"InsertTable"===d?c=null:"RemoveText"===d&&(e.position+e.length<=g?g-=e.length:e.position<
g&&(g=e.position));return c};this.execute=function(k){var a,e,d,c,l,h;k.upgradeWhitespacesAtPosition(g);a=k.getPositionInTextNode(g,f);if(!a)return!1;e=k.getParagraphElement(a.textNode);if(!e)return!1;d=b.isListItem(e.parentNode)?e.parentNode:e;0===a.offset?(h=a.textNode.previousSibling,l=null):(h=a.textNode,l=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==d;)if(a=a.parentNode,c=a.cloneNode(!1),h){for(l&&c.appendChild(l);h.nextSibling;)c.appendChild(h.nextSibling);
a.parentNode.insertBefore(c,a.nextSibling);h=a;l=c}else a.parentNode.insertBefore(c,a),h=c,l=a;b.isListItem(l)&&(l=l.childNodes[0]);k.fixCursorPositions(f);k.getOdfCanvas().refreshSize();k.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:e,memberId:f,timeStamp:m});k.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:l,memberId:f,timeStamp:m});k.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:f,timestamp:m,position:g}}};
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
ops.OpSetParagraphStyle=function(){var l=this,f,m,g,b;this.init=function(k){f=k.memberid;m=k.timestamp;g=k.position;b=k.styleName};this.transform=function(f,a){var e=f.spec();"DeleteParagraphStyle"===e.optype&&e.styleName===b&&(b="");return[l]};this.execute=function(k){var a;if(a=k.getPositionInTextNode(g))if(a=k.getParagraphElement(a.textNode))return""!==b?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",b):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),k.getOdfCanvas().refreshSize(),k.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:m,memberId:f}),k.getOdfCanvas().rerenderAnnotations(),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:f,timestamp:m,position:g,styleName:b}}};
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
ops.OpUpdateParagraphStyle=function(){function l(a,b){var d,e;for(d=0;d<b.length;d+=1)e=b[d].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(e[0]),e[1])}function f(a,b,d,e){var f,g,k;a&&(d||e)&&Object.keys(a).forEach(function(b){f=a[b];(d&&void 0!==d[b]||e&&-1!==e.indexOf(b))&&"object"!==typeof f&&delete a[b]});if(b&&(d||e))for(g=0;g<b.length;g+=1)if(k=b[g],d&&void 0!==d[k]||e&&-1!==e.indexOf(k))b.splice(g,1),g-=1}function m(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}var g=
this,b,k,a,e,d;this.init=function(c){b=c.memberid;k=c.timestamp;a=c.styleName;e=c.setProperties;d=c.removedProperties};this.transform=function(b,k){var h=b.spec(),l=h.optype;if("UpdateParagraphStyle"===l){if(!(h.styleName!==a||k||(f(e?e["style:paragraph-properties"]:null,d?d.paragraphPropertyNames:null,h.setProperties?h.setProperties["style:paragraph-properties"]:null,h.removedProperties?h.removedProperties.paragraphPropertyNames:null),f(e?e["style:text-properties"]:null,d?d.textPropertyNames:null,
h.setProperties?h.setProperties["style:text-properties"]:null,h.removedProperties?h.removedProperties.textPropertyNames:null),e&&(m(e["style:text-properties"])||m(e["style:paragraph-properties"]))||d&&(0<d.textPropertyNames.length||0<d.paragraphPropertyNames.length))))return[]}else if("DeleteParagraphStyle"===l&&h.styleName===a)return[];return[g]};this.execute=function(b){var f,g,k,n,m,r=b.getFormatting();return(f=b.getParagraphStyleElement(a))?(g=f.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0",
"paragraph-properties")[0],k=f.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties")[0],e&&(void 0===g&&e["style:paragraph-properties"]&&(g=b.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:paragraph-properties"),f.appendChild(g)),void 0===k&&e["style:text-properties"]&&(k=b.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:text-properties"),f.appendChild(k)),e["style:paragraph-properties"]&&r.updateStyle(g,
e["style:paragraph-properties"]),e["style:text-properties"]&&((m=e["style:text-properties"]["style:font-name"])&&!r.getFontMap().hasOwnProperty(m)&&(n=b.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:font-face"),n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",m),n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","svg:font-family",m),b.getOdfCanvas().odfContainer().rootElement.fontFaceDecls.appendChild(n)),
r.updateStyle(k,e["style:text-properties"]))),d&&(d.paragraphPropertyNames&&(l(g,d.paragraphPropertyNames),0===g.attributes.length&&f.removeChild(g)),d.textPropertyNames&&(l(k,d.textPropertyNames),0===k.attributes.length&&f.removeChild(k))),b.getOdfCanvas().refreshCSS(),b.emit(ops.OdtDocument.signalParagraphStyleModified,a),b.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:b,timestamp:k,styleName:a,setProperties:e,removedProperties:d}}};
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
ops.OpAddParagraphStyle=function(){var l=this,f,m,g,b,k=odf.Namespaces.svgns,a=odf.Namespaces.stylens;this.init=function(a){f=a.memberid;m=a.timestamp;g=a.styleName;b=a.setProperties};this.transform=function(a,b){var c=a.spec();return"UpdateParagraphStyle"!==c.optype&&"DeleteParagraphStyle"!==c.optype||c.styleName!==g?[l]:null};this.execute=function(e){var d=e.getOdfCanvas().odfContainer(),c=e.getFormatting(),f=e.getDOM(),h=f.createElementNS(a,"style:style"),m,l,q,r,w;if(!h)return!1;h.setAttributeNS(a,
"style:family","paragraph");h.setAttributeNS(a,"style:name",g);b&&Object.keys(b).forEach(function(e){switch(e){case "style:paragraph-properties":m=f.createElementNS(a,"style:paragraph-properties");h.appendChild(m);c.updateStyle(m,b["style:paragraph-properties"]);break;case "style:text-properties":l=f.createElementNS(a,"style:text-properties");h.appendChild(l);(r=b["style:text-properties"]["style:font-name"])&&!c.getFontMap().hasOwnProperty(r)&&(q=f.createElementNS(a,"style:font-face"),q.setAttributeNS(a,
"style:name",r),q.setAttributeNS(k,"svg:font-family",r),d.rootElement.fontFaceDecls.appendChild(q));c.updateStyle(l,b["style:text-properties"]);break;default:"object"!==typeof b[e]&&(w=odf.Namespaces.resolvePrefix(e.substr(0,e.indexOf(":"))),h.setAttributeNS(w,e,b[e]))}});d.rootElement.styles.appendChild(h);e.getOdfCanvas().refreshCSS();e.emit(ops.OdtDocument.signalStyleCreated,g);return!0};this.spec=function(){return{optype:"AddParagraphStyle",memberid:f,timestamp:m,styleName:g,setProperties:b}}};
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
ops.OpDeleteParagraphStyle=function(){var l=this,f,m,g;this.init=function(b){f=b.memberid;m=b.timestamp;g=b.styleName};this.transform=function(b,f){var a=b.spec(),e=a.optype;if("DeleteParagraphStyle"===e){if(a.styleName===g)return[]}else if("SetParagraphStyle"===e&&a.styleName===g)return a.styleName="",e=new ops.OpSetParagraphStyle,e.init(a),[e,l];return[l]};this.execute=function(b){var f=b.getParagraphStyleElement(g);if(!f)return!1;f.parentNode.removeChild(f);b.getOdfCanvas().refreshCSS();b.emit(ops.OdtDocument.signalStyleDeleted,
g);return!0};this.spec=function(){return{optype:"DeleteParagraphStyle",memberid:f,timestamp:m,styleName:g}}};
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
ops.OpAddAnnotation=function(){function l(a,b,d){if(d=a.getPositionInTextNode(d))a=d.textNode,d.offset!==a.length&&a.splitText(d.offset),a.parentNode.insertBefore(b,a.nextSibling)}var f,m,g,b,k;this.init=function(a){f=a.memberid;m=parseInt(a.timestamp,10);g=parseInt(a.position,10);b=parseInt(a.length,10)||0;k=a.name};this.transform=function(a,b){return null};this.execute=function(a){var e={},d=new Date(m),c,t,h,s,n;n=a.getRootNode().ownerDocument;c=n.createElementNS(odf.Namespaces.officens,"office:annotation");
c.setAttributeNS(odf.Namespaces.officens,"office:name",k);t=n.createElementNS(odf.Namespaces.dcns,"dc:creator");t.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",f);h=n.createElementNS(odf.Namespaces.dcns,"dc:date");h.appendChild(n.createTextNode(d.toISOString()));d=n.createElementNS(odf.Namespaces.textns,"text:list");s=n.createElementNS(odf.Namespaces.textns,"text:list-item");n=n.createElementNS(odf.Namespaces.textns,"text:p");s.appendChild(n);d.appendChild(s);c.appendChild(t);
c.appendChild(h);c.appendChild(d);e.node=c;if(!e.node)return!1;if(b){c=a.getRootNode().ownerDocument.createElementNS(odf.Namespaces.officens,"office:annotation-end");c.setAttributeNS(odf.Namespaces.officens,"office:name",k);e.end=c;if(!e.end)return!1;l(a,e.end,g+b)}l(a,e.node,g);a.getOdfCanvas().addAnnotation(e);return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:f,timestamp:m,position:g,length:b,name:k}}};
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
ops.OperationFactory=function(){function l(f){return function(){return new f}}var f;this.register=function(m,g){f[m]=g};this.create=function(m){var g=null,b=f[m.optype];b&&(g=b(m),g.init(m));return g};f={AddCursor:l(ops.OpAddCursor),ApplyDirectStyling:l(ops.OpApplyDirectStyling),InsertTable:l(ops.OpInsertTable),InsertText:l(ops.OpInsertText),RemoveText:l(ops.OpRemoveText),SplitParagraph:l(ops.OpSplitParagraph),SetParagraphStyle:l(ops.OpSetParagraphStyle),UpdateParagraphStyle:l(ops.OpUpdateParagraphStyle),AddParagraphStyle:l(ops.OpAddParagraphStyle),
DeleteParagraphStyle:l(ops.OpDeleteParagraphStyle),MoveCursor:l(ops.OpMoveCursor),RemoveCursor:l(ops.OpRemoveCursor),AddAnnotation:l(ops.OpAddAnnotation)}};
// Input 57
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(l,f){function m(){w.setUnfilteredPosition(l.getNode(),0);return w}function g(a,b,c){var d;c.setStart(a,b);d=c.getClientRects()[0];if(!d)if(d={},a.childNodes[b-1]){c.setStart(a,b-1);c.setEnd(a,b);b=c.getClientRects()[0];if(!b){for(c=b=0;a&&a.nodeType===Node.ELEMENT_NODE;)b+=a.offsetLeft-a.scrollLeft,c+=a.offsetTop-a.scrollTop,a=a.parentNode;b={top:c,left:b}}runtime.assert(b,"getRect: invalid containerOffset");d.top=b.top;d.left=b.right;d.bottom=b.bottom}else a.nodeType===
Node.TEXT_NODE?(a.previousSibling&&(d=a.previousSibling.getClientRects()[0]),d||(c.setStart(a,0),c.setEnd(a,b),d=c.getClientRects()[0])):d=a.getClientRects()[0];runtime.assert(d,"getRect invalid rect");runtime.assert(void 0!==d.top,"getRect rect without top property");return{top:d.top,left:d.left,bottom:d.bottom}}function b(a,b,c){var d=a,e=m(),h,k=f.ownerDocument.createRange(),n=l.getSelectedRange()?l.getSelectedRange().cloneRange():f.ownerDocument.createRange(),r,q=runtime.getWindow();for(h=g(l.getNode(),
0,k);0<d&&c();)d-=1;b?(b=e.container(),e=e.unfilteredDomOffset(),-1===n.comparePoint(b,e)?(n.setStart(b,e),r=!1):n.setEnd(b,e)):(n.setStart(e.container(),e.unfilteredDomOffset()),n.collapse(!0));l.setSelectedRange(n,r);n=g(l.getNode(),0,k);if(n.top===h.top||void 0===v)v=n.left;q.clearTimeout(z);z=q.setTimeout(function(){v=void 0},2E3);k.detach();return a-d}function k(a){var b=m();return a.acceptPosition(b)===u?!0:!1}function a(a,b){for(var c=m(),d=new core.LoopWatchDog(1E3),e=0,f=0;0<a&&c.nextPosition();)e+=
1,d.check(),b.acceptPosition(c)===u&&(f+=e,e=0,a-=1);return f}function e(a,b,c){for(var d=m(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&d.nextPosition();)e.check(),c.acceptPosition(d)===u&&(f+=1,b.acceptPosition(d)===u&&(g+=f,f=0,a-=1));return g}function d(a,b,c){for(var d=m(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&d.previousPosition();)e.check(),c.acceptPosition(d)===u&&(f+=1,b.acceptPosition(d)===u&&(g+=f,f=0,a-=1));return g}function c(a,b){for(var c=m(),d=new core.LoopWatchDog(1E3),e=0,f=0;0<
a&&c.previousPosition();)e+=1,d.check(),b.acceptPosition(c)===u&&(f+=e,e=0,a-=1);return f}function t(b){var d=m(),e=r.getParagraphElement(d.getCurrentNode()),f;f=-c(1,b);if(0===f||e&&e!==r.getParagraphElement(d.getCurrentNode()))f=a(1,b);return f}function h(a,b){var c=m(),d=0,e=0,h=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var k=b,n=h,l=c,r=l.container(),q=0,s=null,w=void 0,t=10,z=void 0,W=0,O=void 0,ba=void 0,S=void 0,z=void 0,Q=f.ownerDocument.createRange(),F=new core.LoopWatchDog(1E3),z=g(r,l.unfilteredDomOffset(),
Q),O=z.top,ba=void 0===v?z.left:v,S=O;!0===(0>n?l.previousPosition():l.nextPosition());)if(F.check(),k.acceptPosition(l)===u&&(q+=1,r=l.container(),z=g(r,l.unfilteredDomOffset(),Q),z.top!==O)){if(z.top!==S&&S!==O)break;S=z.top;z=Math.abs(ba-z.left);if(null===s||z<t)s=r,w=l.unfilteredDomOffset(),t=z,W=q}null!==s?(l.setUnfilteredPosition(s,w),q=W):q=0;Q.detach();d+=q;if(0===d)break;e+=d;a-=1}return e*h}function s(a,b){var c,d,e,h,k=m(),l=r.getParagraphElement(k.getCurrentNode()),n=0,q=f.ownerDocument.createRange();
0>a?(c=k.previousPosition,d=-1):(c=k.nextPosition,d=1);for(e=g(k.container(),k.unfilteredDomOffset(),q);c.call(k);)if(b.acceptPosition(k)===u){if(r.getParagraphElement(k.getCurrentNode())!==l)break;h=g(k.container(),k.unfilteredDomOffset(),q);if(h.bottom!==e.bottom&&(e=h.top>=e.top&&h.bottom<e.bottom||h.top<=e.top&&h.bottom>e.bottom,!e))break;n+=d;e=h}q.detach();return n}function n(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(d=b.firstChild;d!==
a;)c+=1,d=d.nextSibling;return c}function q(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=m(),e=d.container(),f=d.unfilteredDomOffset(),g=0,h=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(e,f);var e=a,f=b,k=d.container(),l=d.unfilteredDomOffset();if(e===k)e=l-
f;else{var r=e.compareDocumentPosition(k);2===r?r=-1:4===r?r=1:10===r?(f=n(e,k),r=f<l?1:-1):(l=n(k,e),r=l<f?-1:1);e=r}if(0>e)for(;d.nextPosition()&&(h.check(),c.acceptPosition(d)===u&&(g+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&(h.check(),c.acceptPosition(d)===u&&(g-=1),d.container()!==a||d.unfilteredDomOffset()!==b););return g}var r,w,v,z,u=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,c){return b(a,c,w.nextPosition)};
this.movePointBackward=function(a,c){return b(a,c,w.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:a,countBackwardSteps:c,convertForwardStepsBetweenFilters:e,convertBackwardStepsBetweenFilters:d,countLinesSteps:h,countStepsToLineBoundary:s,countStepsToPosition:q,isPositionWalkable:k,countStepsToValidPosition:t}};(function(){r=new odf.OdfUtils;w=gui.SelectionMover.createPositionIterator(f);var a=f.ownerDocument.createRange();a.setStart(w.container(),w.unfilteredDomOffset());
a.collapse(!0);l.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(l){var f=new function(){this.acceptNode=function(f){return"urn:webodf:names:cursor"===f.namespaceURI||"urn:webodf:names:editinfo"===f.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(l,5,f,!1)};(function(){return gui.SelectionMover})();
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
ops.OperationTransformer=function(){function l(m,g){for(var b,k,a,e=[],d=[];0<m.length&&g;){b=m.shift();k=g;var c=void 0;a=c=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b.spec()));runtime.log(runtime.toJson(k.spec()));c=f.create(k.spec());a=k.transform(b,!0);k=(c=b.transform(c,!1))&&a?{opsA:c,opsB:a}:null;if(!k)return null;e=e.concat(k.opsA);if(0===k.opsB.length){e=e.concat(m);g=null;break}if(1<k.opsB.length)for(b=0;b<k.opsB.length-1;b+=1){a=l(m,k.opsB[b]);if(!a)return null;
d=d.concat(a.opsB);m=a.opsA}g=k.opsB.pop()}g&&d.push(g);return{opsA:e,opsB:d}}var f;this.setOperationFactory=function(l){f=l};this.transform=function(m,g){var b,k=[],a,e=[];for(b=0;b<m.length;b+=1){a=f.create(m[b]);if(!a)return null;k.push(a)}for(b=0;b<g.length;b+=1){a=f.create(g[b]);a=l(k,a);if(!a)return null;k=a.opsA;e=e.concat(a.opsB)}return{opsA:k,opsB:e}}};
// Input 59
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(l,f){var m=this,g,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,a){var e=0;0<b?e=g.movePointForward(b,a):0>=b&&(e=-g.movePointBackward(-b,a));m.handleUpdate();return e};this.handleUpdate=function(){};this.getStepCounter=function(){return g.getStepCounter()};this.getMemberId=function(){return l};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.getOdtDocument=function(){return f};b=new core.Cursor(f.getDOM(),l);g=new gui.SelectionMover(b,f.getRootNode())};
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
ops.EditInfo=function(l,f){function m(){var f=[],a;for(a in b)b.hasOwnProperty(a)&&f.push({memberid:a,time:b[a].time});f.sort(function(a,b){return a.time-b.time});return f}var g,b={};this.getNode=function(){return g};this.getOdtDocument=function(){return f};this.getEdits=function(){return b};this.getSortedEdits=function(){return m()};this.addEdit=function(f,a){var e,d=f.split("___")[0];if(!b[f])for(e in b)if(b.hasOwnProperty(e)&&e.split("___")[0]===d){delete b[e];break}b[f]={time:a}};this.clearEdits=
function(){b={}};g=f.getDOM().createElementNS("urn:webodf:names:editinfo","editinfo");l.insertBefore(g,l.firstChild)};
// Input 61
gui.Avatar=function(l,f){var m=this,g,b,k;this.setColor=function(a){b.style.borderColor=a};this.setImageUrl=function(a){m.isVisible()?b.src=a:k=a};this.isVisible=function(){return"block"===g.style.display};this.show=function(){k&&(b.src=k,k=void 0);g.style.display="block"};this.hide=function(){g.style.display="none"};this.markAsFocussed=function(a){g.className=a?"active":""};(function(){var a=l.ownerDocument,e=a.documentElement.namespaceURI;g=a.createElementNS(e,"div");b=a.createElementNS(e,"img");
b.width=64;b.height=64;g.appendChild(b);g.style.width="64px";g.style.height="70px";g.style.position="absolute";g.style.top="-80px";g.style.left="-34px";g.style.display=f?"block":"none";l.appendChild(g)})()};
// Input 62
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(l,f,m){function g(a){d&&e.parentNode&&(!c||a)&&(a&&void 0!==t&&runtime.clearTimeout(t),c=!0,k.style.opacity=a||"0"===k.style.opacity?"1":"0",t=runtime.setTimeout(function(){c=!1;g(!1)},500))}function b(a){var b;if("string"===typeof a){if(""===a)return 0;b=/^(\d+)(\.\d+)?px$/.exec(a);runtime.assert(null!==b,"size ["+a+"] does not have unit px.");return parseFloat(b[1])}return a}var k,a,e,d=!1,c=!1,t;this.refreshCursor=function(){m||l.getSelectedRange().collapsed?(d=!0,g(!0)):(d=
!1,k.style.opacity="0")};this.setFocus=function(){d=!0;a.markAsFocussed(!0);g(!0)};this.removeFocus=function(){d=!1;a.markAsFocussed(!1);k.style.opacity="0"};this.setAvatarImageUrl=function(b){a.setImageUrl(b)};this.setColor=function(b){k.style.borderColor=b;a.setColor(b)};this.getCursor=function(){return l};this.getFocusElement=function(){return k};this.toggleHandleVisibility=function(){a.isVisible()?a.hide():a.show()};this.showHandle=function(){a.show()};this.hideHandle=function(){a.hide()};this.ensureVisible=
function(){var a,c,d,e,f,g,m,t=l.getOdtDocument().getOdfCanvas().getElement().parentNode;f=m=k;d=runtime.getWindow();runtime.assert(null!==d,"Expected to be run in an environment which has a global window, like a browser.");do{f=f.parentElement;if(!f)break;g=d.getComputedStyle(f,null)}while("block"!==g.display);g=f;f=e=0;if(g&&t){c=!1;do{d=g.offsetParent;for(a=g.parentNode;a!==d;){if(a===t){a=g;var u=t,p=0;c=0;var y=void 0,D=runtime.getWindow();for(runtime.assert(null!==D,"Expected to be run in an environment which has a global window, like a browser.");a&&
a!==u;)y=D.getComputedStyle(a,null),p+=b(y.marginLeft)+b(y.borderLeftWidth)+b(y.paddingLeft),c+=b(y.marginTop)+b(y.borderTopWidth)+b(y.paddingTop),a=a.parentElement;a=p;e+=a;f+=c;c=!0;break}a=a.parentNode}if(c)break;e+=b(g.offsetLeft);f+=b(g.offsetTop);g=d}while(g&&g!==t);d=e;e=f}else e=d=0;d+=m.offsetLeft;e+=m.offsetTop;f=d-5;g=e-5;d=d+m.scrollWidth-1+5;m=e+m.scrollHeight-1+5;g<t.scrollTop?t.scrollTop=g:m>t.scrollTop+t.clientHeight-1&&(t.scrollTop=m-t.clientHeight+1);f<t.scrollLeft?t.scrollLeft=
f:d>t.scrollLeft+t.clientWidth-1&&(t.scrollLeft=d-t.clientWidth+1)};(function(){var b=l.getOdtDocument().getDOM();k=b.createElementNS(b.documentElement.namespaceURI,"span");e=l.getNode();e.appendChild(k);a=new gui.Avatar(e,f)})()};
// Input 63
runtime.loadClass("core.EventNotifier");
gui.ClickHandler=function(){function l(){m=0;g=null}var f,m=0,g=null,b=new core.EventNotifier([gui.ClickHandler.signalSingleClick,gui.ClickHandler.signalDoubleClick,gui.ClickHandler.signalTripleClick]);this.subscribe=function(f,a){b.subscribe(f,a)};this.handleMouseUp=function(k){var a=runtime.getWindow();g&&g.x===k.screenX&&g.y===k.screenY?(m+=1,1===m?b.emit(gui.ClickHandler.signalSingleClick,k):2===m?b.emit(gui.ClickHandler.signalDoubleClick,void 0):3===m&&(a.clearTimeout(f),b.emit(gui.ClickHandler.signalTripleClick,
void 0),l())):(b.emit(gui.ClickHandler.signalSingleClick,k),m=1,g={x:k.screenX,y:k.screenY},a.clearTimeout(f),f=a.setTimeout(l,400))}};gui.ClickHandler.signalSingleClick="click";gui.ClickHandler.signalDoubleClick="doubleClick";gui.ClickHandler.signalTripleClick="tripleClick";(function(){return gui.ClickHandler})();
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
gui.KeyboardHandler=function(){function l(b,g){g||(g=f.None);return b+":"+g}var f=gui.KeyboardHandler.Modifier,m=null,g={};this.setDefault=function(b){m=b};this.bind=function(b,f,a){b=l(b,f);runtime.assert(!1===g.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);g[b]=a};this.unbind=function(b,f){var a=l(b,f);delete g[a]};this.reset=function(){m=null;g={}};this.handleEvent=function(b){var k=b.keyCode,a=f.None;b.metaKey&&(a|=f.Meta);b.ctrlKey&&(a|=f.Ctrl);b.altKey&&(a|=f.Alt);
b.shiftKey&&(a|=f.Shift);k=l(k,a);k=g[k];a=!1;k?a=k():null!==m&&(a=m(b));a&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,I:73,U:85,Z:90};(function(){return gui.KeyboardHandler})();
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
gui.Clipboard=function(){var l,f,m;this.setDataFromRange=function(g,b){var k=!0,a,e=g.clipboardData;a=runtime.getWindow();var d=b.startContainer.ownerDocument;!e&&a&&(e=a.clipboardData);e?(d=d.createElement("span"),d.appendChild(b.cloneContents()),a=e.setData("text/plain",f.writeToString(d)),k=k&&a,a=e.setData("text/html",l.writeToString(d,odf.Namespaces.namespaceMap)),k=k&&a,g.preventDefault()):k=!1;return k};l=new xmldom.LSSerializer;f=new odf.TextSerializer;m=new odf.OdfNodeFilter;l.filter=m;f.filter=
m};
// Input 66
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("gui.ClickHandler");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.StyleHelper");
gui.SessionController=function(){gui.SessionController=function(l,f){function m(a,b,c,d){var e="on"+b,f=!1;a.attachEvent&&(f=a.attachEvent(e,c));!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0);f&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function g(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function b(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function k(a,b){var c=new ops.OpMoveCursor;c.init({memberid:f,
position:a,length:b||0});return c}function a(a,b){var c=gui.SelectionMover.createPositionIterator(x.getRootNode()),d=x.getOdfCanvas().getElement(),e;e=a;if(!e)return null;for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return null;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,b);return x.getDistanceFromCursor(f,c.container(),
c.unfilteredDomOffset())}function e(b){runtime.setTimeout(function(){var c=runtime.getWindow().getSelection(),d=x.getCursorPosition(f),e,g;if(null===c.anchorNode&&null===c.focusNode){e=b.clientX;g=b.clientY;var h=x.getDOM();h.caretRangeFromPoint?(e=h.caretRangeFromPoint(e,g),g={container:e.startContainer,offset:e.startOffset}):h.caretPositionFromPoint?(e=h.caretPositionFromPoint(e,g),g={container:e.offsetNode,offset:e.offset}):g=null;g&&(e=x.getDOM().createRange(),e.setStart(g.container,g.offset),
e.collapse(!0),c.addRange(e))}e=a(c.anchorNode,c.anchorOffset);c=a(c.focusNode,c.focusOffset);if(null!==c&&0!==c||null!==e&&0!==e)d=k(d+e,c-e),l.enqueue(d)},0)}function d(a){e(a)}function c(){var a,b,c,d=gui.SelectionMover.createPositionIterator(x.getRootNode()),e=x.getCursor(f).getNode(),g=x.getCursorPosition(f),h=/[A-Za-z0-9]/,m=0,n=0;d.setUnfilteredPosition(e,0);if(d.previousPosition()&&(a=d.getCurrentNode(),a.nodeType===Node.TEXT_NODE))for(b=a.data.length-1;0<=b;b-=1)if(c=a.data[b],h.test(c))m-=
1;else break;d.setUnfilteredPosition(e,0);if(d.nextPosition()&&(a=d.getCurrentNode(),a.nodeType===Node.TEXT_NODE))for(b=0;b<a.data.length;b+=1)if(c=a.data[b],h.test(c))n+=1;else break;if(0!==m||0!==n)a=k(g+m,Math.abs(m)+Math.abs(n)),l.enqueue(a)}function t(){var a,b;b=gui.SelectionMover.createPositionIterator(x.getRootNode());var c=x.getParagraphElement(x.getCursor(f).getNode()),d=x.getCursorPosition(f);a=x.getDistanceFromCursor(f,c,0);b.moveToEndOfNode(c);b=x.getDistanceFromCursor(f,c,b.unfilteredDomOffset());
if(0!==a||0!==b)a=k(d+a,Math.abs(a)+Math.abs(b)),l.enqueue(a)}function h(a){var b=x.getCursorSelection(f),c=x.getCursor(f).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,pa,ua):-c.convertBackwardStepsBetweenFilters(-a,pa,ua),a=b.length+a,l.enqueue(k(b.position,a)))}function s(a){var b=x.getCursorPosition(f),c=x.getCursor(f).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,pa,ua):-c.convertBackwardStepsBetweenFilters(-a,pa,ua),l.enqueue(k(b+a,0)))}function n(){s(-1);
return!0}function q(){s(1);return!0}function r(){h(-1);return!0}function w(){h(1);return!0}function v(a,b){var c=x.getParagraphElement(x.getCursor(f).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=x.getCursor(f).getStepCounter().countLinesSteps(a,pa);b?h(c):s(c)}function z(){v(-1,!1);return!0}function u(){v(1,!1);return!0}function p(){v(-1,!0);return!0}function y(){v(1,!0);return!0}function D(a,b){var c=x.getCursor(f).getStepCounter().countStepsToLineBoundary(a,
pa);b?h(c):s(c)}function H(){D(-1,!1);return!0}function A(){D(1,!1);return!0}function N(){D(-1,!0);return!0}function C(){D(1,!0);return!0}function P(){var a=x.getParagraphElement(x.getCursor(f).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");c=x.getDistanceFromCursor(f,a,0);b=gui.SelectionMover.createPositionIterator(x.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),ia.isParagraph(a)&&(c=x.getDistanceFromCursor(f,
a,0));h(c);return!0}function B(){var a=x.getParagraphElement(x.getCursor(f).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(x.getRootNode());b.moveToEndOfNode(a);for(c=x.getDistanceFromCursor(f,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),ia.isParagraph(a)&&(b.moveToEndOfNode(a),c=x.getDistanceFromCursor(f,b.container(),b.unfilteredDomOffset()));h(c);return!0}function J(a,b){var c=
gui.SelectionMover.createPositionIterator(x.getRootNode());0<a&&c.moveToEnd();c=x.getDistanceFromCursor(f,c.container(),c.unfilteredDomOffset());b?h(c):s(c)}function U(){J(-1,!1);return!0}function da(){J(1,!1);return!0}function T(){J(-1,!0);return!0}function ka(){J(1,!0);return!0}function ca(){var a=gui.SelectionMover.createPositionIterator(x.getRootNode()),b;b=-x.getDistanceFromCursor(f,a.container(),a.unfilteredDomOffset());a.moveToEnd();b+=x.getDistanceFromCursor(f,a.container(),a.unfilteredDomOffset());
l.enqueue(k(0,b));return!0}function W(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function O(a){var b=new ops.OpRemoveText;b.init({memberid:f,position:a.position,length:a.length});return b}function ba(){var a=W(x.getCursorSelection(f)),b=null;0===a.length?0<a.position&&x.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:f,position:a.position-1,length:1}),l.enqueue(b)):(b=O(a),l.enqueue(b));return!0}function S(){var a=W(x.getCursorSelection(f)),b=null;
0===a.length?x.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:f,position:a.position,length:1}),l.enqueue(b)):(b=O(a),l.enqueue(b));return null!==b}function Q(){var a=W(x.getCursorSelection(f));0!==a.length&&l.enqueue(O(a));return!0}function F(a){var b=W(x.getCursorSelection(f)),c=null;0<b.length&&(c=O(b),l.enqueue(c));c=new ops.OpInsertText;c.init({memberid:f,position:b.position,text:a});l.enqueue(c)}function M(){var a=x.getCursorPosition(f),b;b=new ops.OpSplitParagraph;
b.init({memberid:f,position:a});l.enqueue(b);return!0}function L(){var a=x.getCursor(f),b=runtime.getWindow().getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function K(a){var b=x.getCursor(f);b.getSelectedRange().collapsed||(ma.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=W(l.getOdtDocument().getCursorSelection(f)),b.init({memberid:f,position:a.position,length:a.length}),l.enqueue(b)):runtime.log("Cut operation failed"))}function Y(){return!1!==
x.getCursor(f).getSelectedRange().collapsed}function la(a){var b=x.getCursor(f);b.getSelectedRange().collapsed||ma.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function E(a){var b,c=runtime.getWindow();c.clipboardData&&c.clipboardData.getData?b=c.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(F(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function G(){return!1}function ea(a){if($)$.onOperationExecuted(a)}
function ha(a){x.emit(ops.OdtDocument.signalUndoStackChanged,a)}function V(){return $?($.moveBackward(1),L(),!0):!1}function R(){return $?($.moveForward(1),L(),!0):!1}function Z(a,b){var c=x.getCursorSelection(f),d=new ops.OpApplyDirectStyling,e={};e[a]=b;d.init({memberid:f,position:c.position,length:c.length,setProperties:{"style:text-properties":e}});l.enqueue(d)}function X(){var a=x.getCursor(f).getSelectedRange(),a=ra.isBold(a)?"normal":"bold";Z("fo:font-weight",a);return!0}function na(){var a=
x.getCursor(f).getSelectedRange(),a=ra.isItalic(a)?"normal":"italic";Z("fo:font-style",a);return!0}function qa(){var a=x.getCursor(f).getSelectedRange(),a=ra.hasUnderline(a)?"none":"solid";Z("style:text-underline-style",a);return!0}var x=l.getOdtDocument(),ia=new odf.OdfUtils,ma=new gui.Clipboard,oa=new gui.ClickHandler,I=new gui.KeyboardHandler,ta=new gui.KeyboardHandler,ra=new gui.StyleHelper(x.getFormatting()),pa=new core.PositionFilterChain,ua=x.getPositionFilter(),$=null;pa.addFilter("BaseFilter",
ua);pa.addFilter("RootFilter",x.createRootFilter(f));this.startEditing=function(){var a;a=x.getOdfCanvas().getElement();m(a,"keydown",I.handleEvent);m(a,"keypress",ta.handleEvent);m(a,"keyup",b);m(a,"beforecut",Y,!0);m(a,"cut",K);m(a,"copy",la);m(a,"beforepaste",G,!0);m(a,"paste",E);m(a,"mouseup",oa.handleMouseUp);m(a,"contextmenu",d);x.subscribe(ops.OdtDocument.signalOperationExecuted,L);x.subscribe(ops.OdtDocument.signalOperationExecuted,ea);a=new ops.OpAddCursor;a.init({memberid:f});l.enqueue(a);
$&&$.saveInitialState()};this.endEditing=function(){var a;x.unsubscribe(ops.OdtDocument.signalOperationExecuted,ea);x.unsubscribe(ops.OdtDocument.signalOperationExecuted,L);a=x.getOdfCanvas().getElement();g(a,"keydown",I.handleEvent);g(a,"keypress",ta.handleEvent);g(a,"keyup",b);g(a,"cut",K);g(a,"beforecut",Y);g(a,"copy",la);g(a,"paste",E);g(a,"beforepaste",G);g(a,"mouseup",oa.handleMouseUp);g(a,"contextmenu",d);a=new ops.OpRemoveCursor;a.init({memberid:f});l.enqueue(a);$&&$.resetInitialState()};
this.getInputMemberId=function(){return f};this.getSession=function(){return l};this.setUndoManager=function(a){$&&$.unsubscribe(gui.UndoManager.signalUndoStackChanged,ha);if($=a)$.setOdtDocument(x),$.setPlaybackFunction(function(a){a.execute(x)}),$.subscribe(gui.UndoManager.signalUndoStackChanged,ha)};this.getUndoManager=function(){return $};(function(){var a=-1!==runtime.getWindow().navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,d=gui.KeyboardHandler.KeyCode;I.bind(d.Tab,
b.None,function(){F("\t");return!0});I.bind(d.Left,b.None,n);I.bind(d.Right,b.None,q);I.bind(d.Up,b.None,z);I.bind(d.Down,b.None,u);I.bind(d.Backspace,b.None,ba);I.bind(d.Delete,b.None,S);I.bind(d.Left,b.Shift,r);I.bind(d.Right,b.Shift,w);I.bind(d.Up,b.Shift,p);I.bind(d.Down,b.Shift,y);I.bind(d.Home,b.None,H);I.bind(d.End,b.None,A);I.bind(d.Home,b.Ctrl,U);I.bind(d.End,b.Ctrl,da);I.bind(d.Home,b.Shift,N);I.bind(d.End,b.Shift,C);I.bind(d.Up,b.CtrlShift,P);I.bind(d.Down,b.CtrlShift,B);I.bind(d.Home,
b.CtrlShift,T);I.bind(d.End,b.CtrlShift,ka);a?(I.bind(d.Clear,b.None,Q),I.bind(d.Left,b.Meta,H),I.bind(d.Right,b.Meta,A),I.bind(d.Home,b.Meta,U),I.bind(d.End,b.Meta,da),I.bind(d.Left,b.MetaShift,N),I.bind(d.Right,b.MetaShift,C),I.bind(d.Up,b.AltShift,P),I.bind(d.Down,b.AltShift,B),I.bind(d.Up,b.MetaShift,T),I.bind(d.Down,b.MetaShift,ka),I.bind(d.A,b.Meta,ca),I.bind(d.B,b.Meta,X),I.bind(d.I,b.Meta,na),I.bind(d.U,b.Meta,qa),I.bind(d.Z,b.Meta,V),I.bind(d.Z,b.MetaShift,R)):(I.bind(d.A,b.Ctrl,ca),I.bind(d.B,
b.Ctrl,X),I.bind(d.I,b.Ctrl,na),I.bind(d.U,b.Ctrl,qa),I.bind(d.Z,b.Ctrl,V),I.bind(d.Z,b.CtrlShift,R));ta.setDefault(function(a){var b;b=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(F(b),!0)});ta.bind(d.Enter,b.None,M);oa.subscribe(gui.ClickHandler.signalSingleClick,e);oa.subscribe(gui.ClickHandler.signalDoubleClick,c);oa.subscribe(gui.ClickHandler.signalTripleClick,t)})()};return gui.SessionController}();
// Input 67
ops.UserModel=function(){};ops.UserModel.prototype.getUserDetailsAndUpdates=function(l,f){};ops.UserModel.prototype.unsubscribeUserDetailsUpdates=function(l,f){};
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
ops.TrivialUserModel=function(){var l={bob:{memberid:"bob",fullname:"Bob Pigeon",color:"red",imageurl:"avatar-pigeon.png"},alice:{memberid:"alice",fullname:"Alice Bee",color:"green",imageurl:"avatar-flower.png"},you:{memberid:"you",fullname:"I, Robot",color:"blue",imageurl:"avatar-joe.png"}};this.getUserDetailsAndUpdates=function(f,m){var g=f.split("___")[0];m(f,l[g]||null)};this.unsubscribeUserDetailsUpdates=function(f,l){}};
// Input 69
ops.NowjsUserModel=function(l){var f={},m={},g=l.getNowObject();this.getUserDetailsAndUpdates=function(b,k){var a=b.split("___")[0],e=f[a],d=m[a]||[],c;m[a]=d;runtime.assert(void 0!==k,"missing callback");for(c=0;c<d.length&&(d[c].subscriber!==k||d[c].memberId!==b);c+=1);c<d.length?runtime.log("double subscription request for "+b+" in NowjsUserModel::getUserDetailsAndUpdates"):(d.push({memberId:b,subscriber:k}),1===d.length&&g.subscribeUserDetailsUpdates(a));e&&k(b,e)};this.unsubscribeUserDetailsUpdates=
function(b,k){var a,e=b.split("___")[0],d=m[e];runtime.assert(void 0!==k,"missing subscriber parameter or null");runtime.assert(d,"tried to unsubscribe when no one is subscribed ('"+b+"')");if(d){for(a=0;a<d.length&&(d[a].subscriber!==k||d[a].memberId!==b);a+=1);runtime.assert(a<d.length,"tried to unsubscribe when not subscribed for memberId '"+b+"'");d.splice(a,1);0===d.length&&(runtime.log("no more subscribers for: "+b),delete m[e],delete f[e],g.unsubscribeUserDetailsUpdates(e))}};g.updateUserDetails=
function(b,g){var a=g?{userid:g.uid,fullname:g.fullname,imageurl:"/user/"+g.avatarId+"/avatar.png",color:g.color}:null,e,d;if(e=m[b])for(f[b]=a,d=0;d<e.length;d+=1)e[d].subscriber(e[d].memberId,a)};runtime.assert("ready"===g.networkStatus,"network not ready")};
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
ops.PullBoxUserModel=function(l){function f(){var a,e=[];for(a in b)b.hasOwnProperty(a)&&e.push(a);runtime.log("user-list request for : "+e.join(","));l.call({command:"user-list",args:{user_ids:e}},function(d){var c=runtime.fromJson(d),e;runtime.log("user-list reply: "+d);if(c.hasOwnProperty("userdata_list"))for(d=c.userdata_list,a=0;a<d.length;a+=1){if(c={userid:d[a].uid,fullname:d[a].fullname,imageurl:"/user/"+d[a].avatarId+"/avatar.png",color:d[a].color},e=g.hasOwnProperty(d[a].uid)?g[d[a].uid]:
null,!e||e.fullname!==c.fullname||e.imageurl!==c.imageurl||e.color!==c.color){var f=e=void 0;if(e=b[c.userid])for(g[c.userid]=c,f=0;f<e.length;f+=1)e[f].subscriber(e[f].memberId,c)}}else runtime.log("Meh, userlist data broken: "+d)})}function m(){k&&(f(),runtime.setTimeout(m,2E4))}var g={},b={},k=!1;this.getUserDetailsAndUpdates=function(a,e){var d=a.split("___")[0],c=g[d],l=b[d]||[];b[d]=l;runtime.assert(void 0!==e,"missing callback");for(d=0;d<l.length&&(l[d].subscriber!==e||l[d].memberId!==a);d+=
1);d<l.length?runtime.log("double subscription request for "+a+" in PullBoxUserModel::getUserDetailsAndUpdates"):(l.push({memberId:a,subscriber:e}),1===l.length&&f());c&&e(a,c);k||(k=!0,runtime.setTimeout(m,2E4))};this.unsubscribeUserDetailsUpdates=function(a,e){var d,c=a.split("___")[0],f=b[c];runtime.assert(void 0!==e,"missing subscriber parameter or null");runtime.assert(f,"tried to unsubscribe when no one is subscribed ('"+a+"')");if(f){for(d=0;d<f.length&&(f[d].subscriber!==e||f[d].memberId!==
a);d+=1);runtime.assert(d<f.length,"tried to unsubscribe when not subscribed for memberId '"+a+"'");f.splice(d,1);if(0===f.length){runtime.log("no more subscribers for: "+a);delete b[c];delete g[c];a:{var h;if(k){for(h in b)if(b.hasOwnProperty(h))break a;k=!1}}}}};runtime.assert("ready"===l.networkStatus(),"network not ready")};
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(l){};ops.OperationRouter.prototype.setPlaybackFunction=function(l){};ops.OperationRouter.prototype.push=function(l){};
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
ops.TrivialOperationRouter=function(){var l,f;this.setOperationFactory=function(f){l=f};this.setPlaybackFunction=function(l){f=l};this.push=function(m){m=m.spec();m.timestamp=(new Date).getTime();m=l.create(m);f(m)}};
// Input 73
ops.NowjsOperationRouter=function(l,f,m){function g(a){var f;f=b.create(a);runtime.log(" op in: "+runtime.toJson(a));if(null!==f)if(a=Number(a.server_seq),runtime.assert(!isNaN(a),"server seq is not a number"),a===e+1)for(k(f),e=a,c=0,f=e+1;d.hasOwnProperty(f);f+=1)k(d[f]),delete d[f],runtime.log("op with server seq "+a+" taken from hold (reordered)");else runtime.assert(a!==e+1,"received incorrect order from server"),runtime.assert(!d.hasOwnProperty(a),"reorder_queue has incoming op"),runtime.log("op with server seq "+
a+" put on hold"),d[a]=f;else runtime.log("ignoring invalid incoming opspec: "+a)}var b,k,a=m.getNowObject(),e=-1,d={},c=0,t=1E3;this.setOperationFactory=function(a){b=a};this.setPlaybackFunction=function(a){k=a};a.ping=function(a){null!==f&&a(f)};a.receiveOp=function(a,b){a===l&&g(b)};this.push=function(b){b=b.spec();runtime.assert(null!==f,"Router sequence N/A without memberid");t+=1;b.client_nonce="C:"+f+":"+t;b.parent_op=e+"+"+c;c+=1;runtime.log("op out: "+runtime.toJson(b));a.deliverOp(l,b)};
this.requestReplay=function(b){a.requestReplay(l,function(a){runtime.log("replaying: "+runtime.toJson(a));g(a)},function(a){runtime.log("replay done ("+a+" ops).");b&&b()})};(function(){a.memberid=f;a.joinSession(l,function(a){runtime.assert(a,"Trying to join a session which does not exists or where we are already in")})})()};
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
ops.PullBoxOperationRouter=function(l,f,m){function g(a){var b,c,e,f=[];for(b=0;b<a.length;)if(e=d.create(a[b]),null!==e&&e.merge){for(c=b+1;c<a.length&&e.merge(a[c]);c+=1)runtime.log("Merged: "+a[b].optype+" with "+a[c].optype);f.push(e.spec());b=c}else f.push(a[b]),b+=1;runtime.log("Merged: from "+a.length+" to "+f.length+" specs");return f}function b(){function a(){var b,e,f;n=!1;for(f=(new Date).getTime();0<z.length&&!(500<(new Date).getTime()-f);)b=z.shift(),e=d.create(b),runtime.log(" op in: "+
runtime.toJson(b)),null!==e?t(e):runtime.log("ignoring invalid incoming opspec: "+b);0<z.length?(n=!0,runtime.getWindow().setTimeout(a,1)):c&&(c(),c=null)}n||a()}function k(a){var b;if(!a)return runtime.assert(!1,"no opspecs received!"),!1;b=u.transform(v,a);if(!b)return!1;for(a=0;a<b.opsB.length;a+=1)z.push(b.opsB[a].spec());v=[];for(a=0;a<b.opsA.length;a+=1)v.push(b.opsA[a].spec());return!0}function a(){function c(){var b={active:!0};h=b;runtime.getWindow().setTimeout(function(){runtime.log("Pulling activated:"+
b.active);h=null;b.active&&a()},8E3)}function d(){var a;q||r||(q=!0,a=v,v=[],m.call({command:"sync-ops",args:{es_id:l,member_id:f,seq_head:String(w),client_ops:a}},function(e){var f=!1,h=runtime.fromJson(e);runtime.log("sync-ops reply: "+e);"newOps"===h.result?0<h.ops.length&&(0===v.length?(e=g(h.ops),z=z.concat(e)):(runtime.log("meh, have new ops locally meanwhile, have to do transformations."),r=!k(g(h.ops))),w=h.headSeq):"added"===h.result?(runtime.log("All added to server"),w=h.headSeq):"conflict"===
h.result?(v=a.concat(v),runtime.log("meh, server has new ops meanwhile, have to do transformations."),r=!k(g(h.ops)),w=h.headSeq,r||(f=!0)):runtime.assert(!1,"Unexpected result on sync-ops call: "+h.result);q=!1;r?runtime.assert(!1,"Sorry to tell:\nwe hit a pair of operations in a state which yet need to be supported for transformation against each other.\nClient disconnected from session, no further editing accepted.\n\nPlease reconnect manually for now."):(f?d():(runtime.log("Preparing next: "+
(0===v.length)),0===v.length&&c()),b())}))}d()}function e(){q||s||(s=!0,h&&(h.active=!1),runtime.getWindow().setTimeout(function(){runtime.log("Pushing activated");s=!1;a()},3E3))}var d,c,t,h=null,s=!1,n=!1,q=!1,r=!1,w="",v=[],z=[],u=new ops.OperationTransformer;this.requestReplay=function(b){c=b;a()};this.setOperationFactory=function(a){d=a;u.setOperationFactory(a)};this.setPlaybackFunction=function(a){t=a};this.push=function(a){var b=a.spec();r||0<z.length||(b.timestamp=(new Date).getTime(),a=d.create(b),
t(a),v.push(b),e())};(function(){m.call({command:"join-session",args:{session_id:l,member_id:f}},function(a){var b=Boolean(runtime.fromJson(a));runtime.log("join-session reply: "+a);runtime.assert(b,"Trying to join a session which does not exists or where we are already in")})})()};
// Input 75
gui.EditInfoHandle=function(l){var f=[],m,g=l.ownerDocument,b=g.documentElement.namespaceURI;this.setEdits=function(k){f=k;var a,e,d,c;m.innerHTML="";for(k=0;k<f.length;k+=1)a=g.createElementNS(b,"div"),a.className="editInfo",e=g.createElementNS(b,"span"),e.className="editInfoColor",e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",f[k].memberid),d=g.createElementNS(b,"span"),d.className="editInfoAuthor",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",f[k].memberid),
c=g.createElementNS(b,"span"),c.className="editInfoTime",c.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",f[k].memberid),c.innerHTML=f[k].time,a.appendChild(e),a.appendChild(d),a.appendChild(c),m.appendChild(a)};this.show=function(){m.style.display="block"};this.hide=function(){m.style.display="none"};m=g.createElementNS(b,"div");m.setAttribute("class","editInfoHandle");m.style.display="none";l.appendChild(m)};
// Input 76
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(l,f){function m(b,d){return runtime.getWindow().setTimeout(function(){a.style.opacity=b},d)}var g=this,b,k,a,e,d;this.addEdit=function(b,f){var g=Date.now()-f;l.addEdit(b,f);k.setEdits(l.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);if(e){var s=e;runtime.getWindow().clearTimeout(s)}d&&(s=d,runtime.getWindow().clearTimeout(s));1E4>g?(m(1,0),e=m(0.5,1E4-g),d=m(0.2,2E4-g)):1E4<=g&&2E4>g?(m(0.5,0),d=m(0.2,2E4-g)):m(0.2,0)};this.getEdits=
function(){return l.getEdits()};this.clearEdits=function(){l.clearEdits();k.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return l};this.show=function(){a.style.display="block"};this.hide=function(){g.hideHandle();a.style.display="none"};this.showHandle=function(){k.show()};this.hideHandle=function(){k.hide()};(function(){var c=l.getOdtDocument().getDOM();a=c.createElementNS(c.documentElement.namespaceURI,
"div");a.setAttribute("class","editInfoMarker");a.onmouseover=function(){g.showHandle()};a.onmouseout=function(){g.hideHandle()};b=l.getNode();b.appendChild(a);k=new gui.EditInfoHandle(b);f||g.hide()})()};
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
gui.SessionView=function(){return function(l,f,m){function g(a,b,c){b=b.split("___")[0];return a+'[editinfo|memberid^="'+b+'"]'+c}function b(a,b,c){function d(b,c,e){c=g(b,a,e)+c;a:{var f=t.firstChild;for(b=g(b,a,e);f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:t.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",
'{ content: "'+b+'"; }',":before");d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","")}function k(a){var b,c;for(c in h)h.hasOwnProperty(c)&&(b=h[c],a?b.show():b.hide())}function a(a){m.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function e(a,c){var d=m.getCaret(a);void 0===c?runtime.log('UserModel sent undefined data for member "'+a+'".'):(null===c&&(c={memberid:a,fullname:"Unknown Identity",color:"black",imageurl:"avatar-joe.png"}),
d&&(d.setAvatarImageUrl(c.imageurl),d.setColor(c.color)),b(a,c.fullname,c.color))}function d(a){var b=a.getMemberId(),c=f.getUserModel();m.registerCursor(a,n,q);e(b,null);c.getUserDetailsAndUpdates(b,e);runtime.log("+++ View here +++ eagerly created an Caret for '"+b+"'! +++")}function c(a){var b=!1,c;for(c in h)if(h.hasOwnProperty(c)&&h[c].getEditInfo().getEdits().hasOwnProperty(a)){b=!0;break}b||f.getUserModel().unsubscribeUserDetailsUpdates(a,e)}var t,h={},s=void 0!==l.editInfoMarkersInitiallyVisible?
l.editInfoMarkersInitiallyVisible:!0,n=void 0!==l.caretAvatarsInitiallyVisible?l.caretAvatarsInitiallyVisible:!0,q=void 0!==l.caretBlinksOnRangeSelect?l.caretBlinksOnRangeSelect:!0;this.showEditInfoMarkers=function(){s||(s=!0,k(s))};this.hideEditInfoMarkers=function(){s&&(s=!1,k(s))};this.showCaretAvatars=function(){n||(n=!0,a(n))};this.hideCaretAvatars=function(){n&&(n=!1,a(n))};this.getSession=function(){return f};this.getCaret=function(a){return m.getCaret(a)};(function(){var a=f.getOdtDocument(),
b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,d);a.subscribe(ops.OdtDocument.signalCursorRemoved,c);a.subscribe(ops.OdtDocument.signalParagraphChanged,function(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",g=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0];g?(e=g.getAttributeNS("urn:webodf:names:editinfo","id"),d=h[e]):(e=Math.random().toString(),d=new ops.EditInfo(b,f.getOdtDocument()),d=new gui.EditInfoMarker(d,s),
g=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0],g.setAttributeNS("urn:webodf:names:editinfo","id",e),h[e]=d);d.addEdit(c,new Date(a))});t=document.createElementNS(b.namespaceURI,"style");t.type="text/css";t.media="screen, print, handheld, projection";t.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));t.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(t)})()}}();
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
gui.CaretManager=function(l){function f(){return l.getSession().getOdtDocument().getOdfCanvas().getElement()}function m(a){a===l.getInputMemberId()&&f().removeAttribute("tabindex",0);delete e[a]}function g(a){(a=e[a.getMemberId()])&&a.refreshCursor()}function b(a){var b=e[a.memberId];a.memberId===l.getInputMemberId()&&b&&b.ensureVisible()}function k(){var a=e[l.getInputMemberId()];a&&a.setFocus()}function a(){var a=e[l.getInputMemberId()];a&&a.removeFocus()}var e={};this.registerCursor=function(a,
b,g){var h=a.getMemberId(),k=f();b=new gui.Caret(a,b,g);e[h]=b;h===l.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+h),a.handleUpdate=b.ensureVisible,k.setAttribute("tabindex",0),k.focus());return b};this.getCaret=function(a){return e[a]};this.getCarets=function(){return Object.keys(e).map(function(a){return e[a]})};(function(){var d=l.getSession().getOdtDocument(),c=f();d.subscribe(ops.OdtDocument.signalParagraphChanged,b);d.subscribe(ops.OdtDocument.signalCursorMoved,
g);d.subscribe(ops.OdtDocument.signalCursorRemoved,m);c.onfocus=k;c.onblur=a})()};
// Input 79
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var l=new xmldom.XPath,f=runtime.getWindow();return function(m){var g=this;g.setInitialSlideMode=function(){g.startSlideMode("single")};g.keyDownHandler=function(b){if(!b.target.isContentEditable&&"input"!==b.target.nodeName)switch(b.keyCode){case 84:g.toggleToolbar();break;case 37:case 8:g.prevSlide();break;case 39:case 32:g.nextSlide();break;case 36:g.firstSlide();break;case 35:g.lastSlide()}};g.root=function(){return g.odf_canvas.odfContainer().rootElement};g.firstSlide=
function(){g.slideChange(function(b,f){return 0})};g.lastSlide=function(){g.slideChange(function(b,f){return f-1})};g.nextSlide=function(){g.slideChange(function(b,f){return b+1<f?b+1:-1})};g.prevSlide=function(){g.slideChange(function(b,f){return 1>b?-1:b-1})};g.slideChange=function(b){var k=g.getPages(g.odf_canvas.odfContainer().rootElement),a=-1,e=0;k.forEach(function(b){b=b[1];b.hasAttribute("slide_current")&&(a=e,b.removeAttribute("slide_current"));e+=1});b=b(a,k.length);-1===b&&(b=a);k[b][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=b;"cont"===g.slide_mode&&f.scrollBy(0,k[b][1].getBoundingClientRect().top-30)};g.selectSlide=function(b){g.slideChange(function(f,a){return b>=a||0>b?-1:b})};g.scrollIntoContView=function(b){var k=g.getPages(g.odf_canvas.odfContainer().rootElement);0!==k.length&&f.scrollBy(0,k[b][1].getBoundingClientRect().top-30)};g.getPages=function(b){b=b.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var f=[],a;for(a=0;a<b.length;a+=1)f.push([b[a].getAttribute("draw:name"),
b[a]]);return f};g.fillPageList=function(b,f){for(var a=g.getPages(b),e,d,c;f.firstChild;)f.removeChild(f.firstChild);for(e=0;e<a.length;e+=1)d=document.createElement("option"),c=l.getODFElementsWithXPath(a[e][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),c=0<c.length?c[0].textContent:a[e][0],d.textContent=e+1+": "+c,f.appendChild(d)};g.startSlideMode=function(b){var k=document.getElementById("pagelist"),a=g.odf_canvas.slidevisibilitycss().sheet;for(g.slide_mode=
b;0<a.cssRules.length;)a.deleteRule(0);g.selectSlide(0);"single"===g.slide_mode?(a.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),a.insertRule("draw|page[slide_current]  { z-index:2;}",1),a.insertRule("draw|page  { -webkit-transform: scale(1);}",2),g.fitToWindow(),f.addEventListener("resize",g.fitToWindow,!1)):"cont"===g.slide_mode&&f.removeEventListener("resize",g.fitToWindow,!1);g.fillPageList(g.odf_canvas.odfContainer().rootElement,k)};g.toggleToolbar=function(){var b,
f,a;b=g.odf_canvas.slidevisibilitycss().sheet;f=-1;for(a=0;a<b.cssRules.length;a+=1)if(".toolbar"===b.cssRules[a].cssText.substring(0,8)){f=a;break}-1<f?b.deleteRule(f):b.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};g.fitToWindow=function(){var b=g.getPages(g.root()),k=(f.innerHeight-40)/b[0][1].clientHeight,b=(f.innerWidth-10)/b[0][1].clientWidth,k=k<b?k:b,b=g.odf_canvas.slidevisibilitycss().sheet;b.deleteRule(2);b.insertRule("draw|page { \n-moz-transform: scale("+
k+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+k+"); -o-transform-origin: 0% 0%; -o-transform: scale("+k+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+k+"); }",2)};g.load=function(b){g.odf_canvas.load(b)};g.odf_element=m;g.odf_canvas=new odf.OdfCanvas(g.odf_element);g.odf_canvas.addListener("statereadychange",g.setInitialSlideMode);g.slide_mode="undefined";document.addEventListener("keydown",g.keyDownHandler,!1)}}();
// Input 80
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(l,f){function m(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function g(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(){var a=l.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!q)||(a=a.getRangeAt(0),q.setPoint(a.startContainer,a.startOffset))}function k(){var a=l.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();q&&q.node()&&(b=q.node(),c=b.ownerDocument.createRange(),
c.setStart(b,q.position()),c.collapse(!0),a.addRange(c))}function a(a){var c=a.charCode||a.keyCode;if(q=null,q&&37===c)b(),q.stepBackward(),k();else if(16<=c&&20>=c||33<=c&&40>=c)return;g(a)}function e(a){g(a)}function d(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&d(b),b=b.nextSibling||b.parentNode;var c,e,f,b=a.attributes;c="";for(f=b.length-1;0<=f;f-=1)e=b.item(f),c=c+" "+e.nodeName+'="'+e.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(e=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&e.test(c.nodeValue)&&c.parentNode.removeChild(c)}function c(a,b){for(var d=a.firstChild,e,f,g;d&&d!==a;){if(d.nodeType===Node.ELEMENT_NODE)for(c(d,b),e=d.attributes,g=e.length-1;0<=g;g-=1)f=e.item(g),"http://www.w3.org/2000/xmlns/"!==f.namespaceURI||b[f.nodeValue]||(b[f.nodeValue]=f.localName);d=d.nextSibling||d.parentNode}}function t(){var a=l.ownerDocument.createElement("style"),b;b={};c(l,b);
var d={},e,g,k=0;for(e in b)if(b.hasOwnProperty(e)&&e){g=b[e];if(!g||d.hasOwnProperty(g)||"xmlns"===g){do g="ns"+k,k+=1;while(d.hasOwnProperty(g));b[e]=g}d[g]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+h;a.appendChild(l.ownerDocument.createTextNode(b));f=f.parentNode.replaceChild(a,f)}var h,s,n,q=null;l.id||(l.id="xml"+String(Math.random()).substring(2));s="#"+l.id+" ";h=s+"*,"+s+":visited, "+s+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
s+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+s+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+s+"{overflow: auto;}\n";(function(b){m(b,"click",e);m(b,"keydown",a);m(b,"drop",g);m(b,"dragend",g);m(b,"beforepaste",g);m(b,"paste",g)})(l);this.updateCSS=t;this.setXML=function(a){a=a.documentElement||a;n=a=l.ownerDocument.importNode(a,!0);for(d(a);l.lastChild;)l.removeChild(l.lastChild);l.appendChild(a);t();q=new core.PositionIterator(a)};this.getXML=
function(){return n}};
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(l,f){};gui.UndoManager.prototype.unsubscribe=function(l,f){};gui.UndoManager.prototype.setOdtDocument=function(l){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(l){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(l){};gui.UndoManager.prototype.moveBackward=function(l){};gui.UndoManager.prototype.onOperationExecuted=function(l){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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
gui.UndoStateRules=function(){function l(f){return f.spec().optype}function f(f){switch(l(f)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=l;this.isEditOperation=f;this.isPartOfOperationSet=function(m,g){if(f(m)){if(0===g.length)return!0;var b;if(b=f(g[g.length-1]))a:{b=g.filter(f);var k=l(m),a;b:switch(k){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&k===l(b[0])){if(1===b.length){b=!0;break a}k=b[b.length-2].spec().position;
b=b[b.length-1].spec().position;a=m.spec().position;if(b===a-(b-k)){b=!0;break a}}b=!1}return b}return!0}};
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
gui.TrivialUndoManager=function(l){function f(){r.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:a.hasUndoStates(),redoAvailable:a.hasRedoStates()})}function m(){s!==c&&s!==n[n.length-1]&&n.push(s)}function g(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);e.normalizeTextNodes(b)}function b(a){return Object.keys(a).map(function(b){return a[b]})}function k(a){function c(a){var b=a.spec();if(f[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete f[b.memberid],g-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},f={},g,k=a.pop();h.getCursors().forEach(function(a){f[a.getMemberId()]=!0});for(g=Object.keys(f).length;k&&0<g;)k.reverse(),k.forEach(c),k=a.pop();return b(d).concat(b(e))}var a=this,e=new core.DomUtils,d,c=[],t,h,s=[],n=[],q=[],r=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=l||new gui.UndoStateRules;this.subscribe=function(a,b){r.subscribe(a,b)};this.unsubscribe=function(a,b){r.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<n.length};this.hasRedoStates=function(){return 0<q.length};this.setOdtDocument=function(a){h=a};this.resetInitialState=function(){n.length=0;q.length=0;c.length=0;s.length=0;d=null;f()};this.saveInitialState=function(){var a=h.getOdfCanvas().odfContainer(),b=h.getOdfCanvas().getAnnotationManager();b&&b.forgetAnnotations();d=a.rootElement.cloneNode(!0);
h.getOdfCanvas().refreshAnnotations();a=d;e.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(g);e.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(g);m();n.unshift(c);s=c=k(n);n.length=0;q.length=0;f()};this.setPlaybackFunction=function(a){t=a};this.onOperationExecuted=function(a){q.length=0;w.isEditOperation(a)&&s===c||!w.isPartOfOperationSet(a,s)?(m(),s=[a],n.push(s),r.emit(gui.UndoManager.signalUndoStateCreated,{operations:s}),f()):(s.push(a),r.emit(gui.UndoManager.signalUndoStateModified,
{operations:s}))};this.moveForward=function(a){for(var b=0,c;a&&q.length;)c=q.pop(),n.push(c),c.forEach(t),a-=1,b+=1;b&&(s=n[n.length-1],f());return b};this.moveBackward=function(a){for(var b=h.getOdfCanvas(),e=b.odfContainer(),g=0;a&&n.length;)q.push(n.pop()),a-=1,g+=1;g&&(e.setRootElement(d.cloneNode(!0)),b.setOdfContainer(e,!0),r.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),h.getCursors().forEach(function(a){h.removeCursor(a.getMemberId())}),c.forEach(t),n.forEach(function(a){a.forEach(t)}),
b.refreshCSS(),s=n[n.length-1]||c,f());return g}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
ops.OdtDocument=function(l){function f(){var a=l.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function m(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var e=d[a].getNode();return b(c)===b(e)?t:h}}function g(a){var b=
gui.SelectionMover.createPositionIterator(f());for(a+=1;0<a&&b.nextPosition();)1===s.acceptPosition(b)&&(a-=1);return b}function b(a){return e.getParagraphElement(a)}function k(a){return l.getFormatting().getStyleElement(a,"paragraph")}var a=this,e,d={},c=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalStyleCreated,
ops.OdtDocument.signalStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),t=core.PositionFilter.FilterResult.FILTER_ACCEPT,h=core.PositionFilter.FilterResult.FILTER_REJECT,s;this.getIteratorAtPosition=g;this.upgradeWhitespacesAtPosition=function(a){a=g(a);var b,c,d;a.previousPosition();a.previousPosition();for(d=-1;1>=d;d+=1){b=a.container();c=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[c]&&e.isSignificantWhitespace(b,
c)){runtime.assert(" "===b.data[c],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=b.ownerDocument.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s");f.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(c,1);0<c&&(b=b.splitText(c));b.parentNode.insertBefore(f,b);b=f;a.moveToEndOfNode(b)}a.nextPosition()}};this.getParagraphStyleElement=k;this.getParagraphElement=b;this.getParagraphStyleAttributes=function(a){return(a=k(a))?l.getFormatting().getInheritedStyleAttributes(a):
null};this.getPositionInTextNode=function(a,b){var c=gui.SelectionMover.createPositionIterator(f()),e=null,g,h=0,k=null;runtime.assert(0<=a,"position must be >= 0");1===s.acceptPosition(c)?(g=c.container(),g.nodeType===Node.TEXT_NODE&&(e=g,h=0)):a+=1;for(;0<a||null===e;){if(!c.nextPosition())return null;if(1===s.acceptPosition(c))if(a-=1,g=c.container(),g.nodeType===Node.TEXT_NODE)g!==e?(e=g,h=c.domOffset()):h+=1;else if(null!==e){if(0===a){h=e.length;break}e=null}else if(0===a){e=f().ownerDocument.createTextNode("");
g.insertBefore(e,c.rightNode());h=0;break}}if(null===e)return null;if(b&&d[b]){for(k=d[b].getNode();0===h&&k.nextSibling&&"cursor"===k.nextSibling.localName;)k.parentNode.insertBefore(k,k.nextSibling.nextSibling);k&&0<e.length&&(e=f().ownerDocument.createTextNode(""),h=0,k.parentNode.insertBefore(e,k.nextSibling))}for(;0===h&&(e.previousSibling&&"cursor"===e.previousSibling.localName)&&(g=e.previousSibling,0<e.length&&(e=f().ownerDocument.createTextNode("")),g.parentNode.insertBefore(e,g),k!==g););
for(;e.previousSibling&&e.previousSibling.nodeType===Node.TEXT_NODE;)e.previousSibling.appendData(e.data),h=e.length+e.previousSibling.length,e=e.previousSibling,e.parentNode.removeChild(e.nextSibling);return{textNode:e,offset:h}};this.fixCursorPositions=function(b){var c=a.getPositionFilter(),e,f,g;for(e in d)d.hasOwnProperty(e)&&(f=d[e],g=f.getStepCounter(),g.isPositionWalkable(c)?0===a.getCursorSelection(e).length&&f.move(0):(g=g.countStepsToValidPosition(c),f.move(g),e===b&&a.emit(ops.OdtDocument.signalCursorMoved,
f)))};this.getWalkableParagraphLength=function(a){var c=g(0),d=0;c.setUnfilteredPosition(a,0);do{if(b(c.container())!==a)break;1===s.acceptPosition(c)&&(d+=1)}while(c.nextPosition());return d};this.getDistanceFromCursor=function(a,b,c){a=d[a];var e=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,e=a(b,c,s));return e};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,f(),0)};this.getCursorSelection=
function(a){var b;a=d[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(f(),0,s),b=b(a.getAnchorNode(),0,s));return{position:c+b,length:-b}};this.getPositionFilter=function(){return s};this.getOdfCanvas=function(){return l};this.getRootNode=f;this.getDOM=function(){return f().ownerDocument};this.getCursor=function(a){return d[a]};this.getCursors=function(){var a=[],b;for(b in d)d.hasOwnProperty(b)&&a.push(d[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");
var b=a.getStepCounter().countForwardSteps(1,s),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!d[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);a.move(b);d[c]=a};this.removeCursor=function(b){var c=d[b];return c?(c.removeFromOdtDocument(),delete d[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=l.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=
b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return l.getFormatting()};this.getTextElements=function(a,b){return e.getTextElements(a,b)};this.getParagraphElements=function(a){return e.getParagraphElements(a)};this.emit=function(a,b){c.emit(a,b)};this.subscribe=function(a,b){c.subscribe(a,b)};this.unsubscribe=function(a,b){c.unsubscribe(a,b)};this.createRootFilter=
function(a){return new m(a)};s=new function(){function a(b,c,d){var f,g;if(c&&(f=e.lookLeftForCharacter(c),1===f||2===f&&(e.scanRightForAnyCharacter(d)||e.scanRightForAnyCharacter(e.nextNode(b)))))return t;f=null===c&&e.isParagraph(b);g=e.lookRightForCharacter(d);if(f)return g?t:e.scanRightForAnyCharacter(d)?h:t;if(!g)return h;c=c||e.previousNode(b);return e.scanLeftForAnyCharacter(c)?h:t}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,g,k,l;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return h;
if(d===Node.TEXT_NODE){if(!e.isGroupingElement(c.parentNode)||e.isWithinTrackedChanges(c.parentNode,f()))return h;d=b.unfilteredDomOffset();g=c.data;runtime.assert(d!==g.length,"Unexpected offset.");if(0<d){b=g.substr(d-1,1);if(!e.isODFWhitespace(b))return t;if(1<d)if(b=g.substr(d-2,1),!e.isODFWhitespace(b))k=t;else{if(!e.isODFWhitespace(g.substr(0,d)))return h}else l=e.previousNode(c),e.scanLeftForNonWhitespace(l)&&(k=t);if(k===t)return e.isTrailingWhitespace(c,d)?h:t;k=g.substr(d,1);return e.isODFWhitespace(k)?
h:e.scanLeftForAnyCharacter(e.previousNode(c))?h:t}l=b.leftNode();k=c;c=c.parentNode;k=a(c,l,k)}else!e.isGroupingElement(c)||e.isWithinTrackedChanges(c,f())?k=h:(l=b.leftNode(),k=b.rightNode(),k=a(c,l,k));return k}};e=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";
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
ops.Session=function(l){var f=new ops.OperationFactory,m=new ops.OdtDocument(l),g=new ops.TrivialUserModel,b=null;this.setUserModel=function(b){g=b};this.setOperationFactory=function(g){f=g;b&&b.setOperationFactory(f)};this.setOperationRouter=function(g){b=g;g.setPlaybackFunction(function(a){a.execute(m);m.emit(ops.OdtDocument.signalOperationExecuted,a)});g.setOperationFactory(f)};this.getUserModel=function(){return g};this.getOperationFactory=function(){return f};this.getOdtDocument=function(){return m};
this.enqueue=function(f){b.push(f)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 86
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\n\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 10;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: inline-block;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
