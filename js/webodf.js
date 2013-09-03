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
function Runtime(){}Runtime.ByteArray=function(m){};Runtime.prototype.getVariable=function(m){};Runtime.prototype.toJson=function(m){};Runtime.prototype.fromJson=function(m){};Runtime.ByteArray.prototype.slice=function(m,n){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(m){};Runtime.prototype.byteArrayFromString=function(m,n){};Runtime.prototype.byteArrayToString=function(m,n){};Runtime.prototype.concatByteArrays=function(m,n){};
Runtime.prototype.read=function(m,n,k,c){};Runtime.prototype.readFile=function(m,n,k){};Runtime.prototype.readFileSync=function(m,n){};Runtime.prototype.loadXML=function(m,n){};Runtime.prototype.writeFile=function(m,n,k){};Runtime.prototype.isFile=function(m,n){};Runtime.prototype.getFileSize=function(m,n){};Runtime.prototype.deleteFile=function(m,n){};Runtime.prototype.log=function(m,n){};Runtime.prototype.setTimeout=function(m,n){};Runtime.prototype.clearTimeout=function(m){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(m){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(m,n,k){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(m,n){function k(a){var b="",f,e=a.length;for(f=0;f<e;f+=1)b+=String.fromCharCode(a[f]&255);return b}function c(a){var b="",f,e=a.length,d,c,l,p;for(f=0;f<e;f+=1)d=a[f],128>d?b+=String.fromCharCode(d):(f+=1,c=a[f],194<=d&&224>d?b+=String.fromCharCode((d&31)<<6|c&63):(f+=1,l=a[f],224<=d&&240>d?b+=String.fromCharCode((d&15)<<12|(c&63)<<6|l&63):(f+=1,p=a[f],240<=d&&245>d&&(d=(d&7)<<18|(c&63)<<12|(l&63)<<6|p&63,d-=65536,b+=String.fromCharCode((d>>10)+55296,(d&1023)+56320)))));
return b}var a;"utf8"===n?a=c(m):("binary"!==n&&this.log("Unsupported encoding: "+n),a=k(m));return a};Runtime.getVariable=function(m){try{return eval(m)}catch(n){}};Runtime.toJson=function(m){return JSON.stringify(m)};Runtime.fromJson=function(m){return JSON.parse(m)};Runtime.getFunctionName=function(m){return void 0===m.name?(m=/function\s+(\w+)/.exec(m))&&m[1]:m.name};
function BrowserRuntime(m){function n(b,f){var e,d,a;void 0!==f?a=b:f=b;m?(d=m.ownerDocument,a&&(e=d.createElement("span"),e.className=a,e.appendChild(d.createTextNode(a)),m.appendChild(e),m.appendChild(d.createTextNode(" "))),e=d.createElement("span"),0<f.length&&"<"===f[0]?e.innerHTML=f:e.appendChild(d.createTextNode(f)),m.appendChild(e),m.appendChild(d.createElement("br"))):console&&console.log(f);"alert"===a&&alert(f)}function k(b,f,e){function d(){var d;4===h.readyState&&(0!==h.status||h.responseText?
200===h.status||0===h.status?(d="binary"===f?null!==h.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(h.responseBody)).toArray():c.byteArrayFromString(h.responseText,"binary"):h.responseText,a[b]=d,e(null,d)):e(h.responseText||h.statusText):e("File "+b+" is empty."))}if(a.hasOwnProperty(b))e(null,a[b]);else{var h=new XMLHttpRequest;h.open("GET",b,!0);h.onreadystatechange=d;h.overrideMimeType&&("binary"!==f?h.overrideMimeType("text/plain; charset="+f):h.overrideMimeType("text/plain; charset=x-user-defined"));
try{h.send(null)}catch(l){e(l.message)}}}var c=this,a={},h=window.ArrayBuffer&&window.Uint8Array;h&&(Uint8Array.prototype.slice=function(b,f){void 0===f&&(void 0===b&&(b=0),f=this.length);var e=this.subarray(b,f),d,a;f-=b;d=new Uint8Array(new ArrayBuffer(f));for(a=0;a<f;a+=1)d[a]=e[a];return d});this.ByteArray=h?function(b){return new Uint8Array(new ArrayBuffer(b))}:function(b){var f=[];f.length=b;return f};this.concatByteArrays=h?function(b,f){var e,d=b.length,a=f.length,l=new this.ByteArray(d+a);
for(e=0;e<d;e+=1)l[e]=b[e];for(e=0;e<a;e+=1)l[e+d]=f[e];return l}:function(b,f){return b.concat(f)};this.byteArrayFromArray=function(b){return b.slice()};this.byteArrayFromString=function(b,f){var e;if("utf8"===f){e=b.length;var d,a,l,p=0;for(a=0;a<e;a+=1)l=b.charCodeAt(a),p+=1+(128<l)+(2048<l);d=new c.ByteArray(p);for(a=p=0;a<e;a+=1)l=b.charCodeAt(a),128>l?(d[p]=l,p+=1):2048>l?(d[p]=192|l>>>6,d[p+1]=128|l&63,p+=2):(d[p]=224|l>>>12&15,d[p+1]=128|l>>>6&63,d[p+2]=128|l&63,p+=3)}else for("binary"!==
f&&c.log("unknown encoding: "+f),e=b.length,d=new c.ByteArray(e),a=0;a<e;a+=1)d[a]=b.charCodeAt(a)&255;return e=d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=k;this.read=function(b,f,e,d){function h(){var g;4===l.readyState&&(0!==l.status||l.responseText?200===l.status||0===l.status?(l.response?(g=l.response,g=new Uint8Array(g)):g=null!==l.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(l.responseBody)).toArray():c.byteArrayFromString(l.responseText,"binary"),a[b]=g,d(null,g.slice(f,f+e))):d(l.responseText||l.statusText):d("File "+b+" is empty."))}if(a.hasOwnProperty(b))d(null,a[b].slice(f,f+e));else{var l=new XMLHttpRequest;l.open("GET",b,!0);l.onreadystatechange=h;l.overrideMimeType&&l.overrideMimeType("text/plain; charset=x-user-defined");l.responseType="arraybuffer";try{l.send(null)}catch(p){d(p.message)}}};this.readFileSync=function(b,f){var a=new XMLHttpRequest,
d;a.open("GET",b,!1);a.overrideMimeType&&("binary"!==f?a.overrideMimeType("text/plain; charset="+f):a.overrideMimeType("text/plain; charset=x-user-defined"));try{if(a.send(null),200===a.status||0===a.status)d=a.responseText}catch(c){}return d};this.writeFile=function(b,f,e){a[b]=f;var d=new XMLHttpRequest;d.open("PUT",b,!0);d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200<=d.status&&300>d.status||0===d.status?e(null):e("Status "+String(d.status)+": "+d.responseText||
d.statusText):e("File "+b+" is empty."))};f=f.buffer&&!d.sendAsBinary?f.buffer:c.byteArrayToString(f,"binary");try{d.sendAsBinary?d.sendAsBinary(f):d.send(f)}catch(h){c.log("HUH? "+h+" "+f),e(h.message)}};this.deleteFile=function(b,f){delete a[b];var e=new XMLHttpRequest;e.open("DELETE",b,!0);e.onreadystatechange=function(){4===e.readyState&&(200>e.status&&300<=e.status?f(e.responseText):f(null))};e.send(null)};this.loadXML=function(b,f){var a=new XMLHttpRequest;a.open("GET",b,!0);a.overrideMimeType&&
a.overrideMimeType("text/xml");a.onreadystatechange=function(){4===a.readyState&&(0!==a.status||a.responseText?200===a.status||0===a.status?f(null,a.responseXML):f(a.responseText):f("File "+b+" is empty."))};try{a.send(null)}catch(d){f(d.message)}};this.isFile=function(b,a){c.getFileSize(b,function(b){a(-1!==b)})};this.getFileSize=function(b,a){var e=new XMLHttpRequest;e.open("HEAD",b,!0);e.onreadystatechange=function(){if(4===e.readyState){var d=e.getResponseHeader("Content-Length");d?a(parseInt(d,
10)):k(b,"binary",function(d,b){d?a(-1):a(b.length)})}};e.send(null)};this.log=n;this.assert=function(b,a,e){if(!b)throw n("alert","ASSERTION FAILED:\n"+a),e&&e(),a;};this.setTimeout=function(b,a){return setTimeout(function(){b()},a)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){n("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function m(b,e,d){b=c.resolve(a,b);"binary"!==e?k.readFile(b,e,d):k.readFile(b,null,d)}var n=this,k=require("fs"),c=require("path"),a="",h,b;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var b=new Buffer(a.length),d,c=a.length;for(d=0;d<c;d+=1)b[d]=a[d];return b};this.concatByteArrays=function(a,b){var d=new Buffer(a.length+b.length);a.copy(d,0,0);b.copy(d,a.length,0);return d};this.byteArrayFromString=function(a,b){return new Buffer(a,
b)};this.byteArrayToString=function(a,b){return a.toString(b)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=m;this.loadXML=function(a,b){m(a,"utf-8",function(d,a){if(d)return b(d);b(null,n.parseXML(a))})};this.writeFile=function(b,e,d){b=c.resolve(a,b);k.writeFile(b,e,"binary",function(a){d(a||null)})};this.deleteFile=function(b,e){b=c.resolve(a,b);k.unlink(b,e)};this.read=function(b,e,d,h){b=c.resolve(a,b);k.open(b,"r+",666,function(a,
b){if(a)h(a);else{var g=new Buffer(d);k.read(b,g,0,d,e,function(d){k.close(b);h(d,g)})}})};this.readFileSync=function(a,b){return b?"binary"===b?k.readFileSync(a,null):k.readFileSync(a,b):""};this.isFile=function(b,e){b=c.resolve(a,b);k.stat(b,function(d,b){e(!d&&b.isFile())})};this.getFileSize=function(b,e){b=c.resolve(a,b);k.stat(b,function(d,b){d?e(-1):e(b.size)})};this.log=function(b,a){var d;void 0!==a?d=b:a=b;"alert"===d&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(a+
"\n");"alert"===d&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(b,a,d){b||(process.stderr.write("ASSERTION FAILED: "+a),d&&d())};this.setTimeout=function(b,a){return setTimeout(function(){b()},a)};this.clearTimeout=function(b){clearTimeout(b)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(b){a=b};this.currentDirectory=function(){return a};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return b};this.parseXML=
function(b){return h.parseFromString(b,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};h=new (require("xmldom").DOMParser);b=n.parseXML("<a/>").implementation}
function RhinoRuntime(){function m(b,a){var e;void 0!==a?e=b:a=b;"alert"===e&&print("\n!!!!! ALERT !!!!!");print(a);"alert"===e&&print("!!!!! ALERT !!!!!")}var n=this,k=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),c,a,h="";k.setValidating(!1);k.setNamespaceAware(!0);k.setExpandEntityReferences(!1);k.setSchema(null);a=Packages.org.xml.sax.EntityResolver({resolveEntity:function(b,a){var e=new Packages.java.io.FileReader(a);return new Packages.org.xml.sax.InputSource(e)}});c=k.newDocumentBuilder();
c.setEntityResolver(a);this.ByteArray=function(b){return[b]};this.byteArrayFromArray=function(b){return b};this.byteArrayFromString=function(b,a){var e=[],d,c=b.length;for(d=0;d<c;d+=1)e[d]=b.charCodeAt(d)&255;return e};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(b,a){return b.concat(a)};this.loadXML=function(b,a){var e=new Packages.java.io.File(b),d;try{d=c.parse(e)}catch(h){print(h);
a(h);return}a(null,d)};this.readFile=function(b,a,e){h&&(b=h+"/"+b);var d=new Packages.java.io.File(b),c="binary"===a?"latin1":a;d.isFile()?(b=readFile(b,c),"binary"===a&&(b=n.byteArrayFromString(b,"binary")),e(null,b)):e(b+" is not a file.")};this.writeFile=function(a,f,e){h&&(a=h+"/"+a);a=new Packages.java.io.FileOutputStream(a);var d,c=f.length;for(d=0;d<c;d+=1)a.write(f[d]);a.close();e(null)};this.deleteFile=function(a,f){h&&(a=h+"/"+a);(new Packages.java.io.File(a))["delete"]()?f(null):f("Could not delete "+
a)};this.read=function(a,f,e,d){h&&(a=h+"/"+a);var c;c=a;var l="binary";(new Packages.java.io.File(c)).isFile()?("binary"===l&&(l="latin1"),c=readFile(c,l)):c=null;c?d(null,this.byteArrayFromString(c.substring(f,f+e),"binary")):d("Cannot read "+a)};this.readFileSync=function(a,c){return c?readFile(a,c):""};this.isFile=function(a,c){h&&(a=h+"/"+a);var e=new Packages.java.io.File(a);c(e.isFile())};this.getFileSize=function(a,c){h&&(a=h+"/"+a);var e=new Packages.java.io.File(a);c(e.length())};this.log=
m;this.assert=function(a,c,e){a||(m("alert","ASSERTION FAILED: "+c),e&&e())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){h=a};this.currentDirectory=function(){return h};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return c.getDOMImplementation()};this.parseXML=function(a){return c.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function m(c){var a=c[0],h;h=eval("if (typeof "+a+" === 'undefined') {eval('"+a+" = {};');}"+a);for(a=1;a<c.length-1;a+=1)h=h.hasOwnProperty(c[a])?h[c[a]]:h[c[a]]={};return h[c[c.length-1]]}var n={},k={};runtime.loadClass=function(c){function a(a){a=a.replace(/\./g,"/")+".js";var d=runtime.libraryPaths(),b,l,c;runtime.currentDirectory&&d.push(runtime.currentDirectory());for(b=0;b<d.length;b+=1){l=d[b];if(!k.hasOwnProperty(l))try{c=runtime.readFileSync(d[b]+"/manifest.js","utf8"),k[l]=
c&&c.length?eval(c):null}catch(g){k[l]=null,runtime.log("Cannot load manifest for "+l+".")}c=null;if((l=k[l])&&l.indexOf&&-1!==l.indexOf(a))return d[b]+"/"+a}return null}function h(b){var d,c;c=a(b);if(!c)throw b+" is not listed in any manifest.js.";try{d=runtime.readFileSync(c,"utf8")}catch(l){throw runtime.log("Error loading "+b+" "+l),l;}if(void 0===d)throw"Cannot load class "+b;d=d+("\n//# sourceURL="+c)+("\n//@ sourceURL="+c);try{d=eval(b+" = eval(code);")}catch(f){throw runtime.log("Error loading "+
b+" "+f),f;}return d}if(!IS_COMPILED_CODE&&!n.hasOwnProperty(c)){var b=c.split("."),f;f=m(b);if(!f&&(f=h(c),!f||Runtime.getFunctionName(f)!==b[b.length-1]))throw runtime.log("Loaded code is not for "+b[b.length-1]),"Loaded code is not for "+b[b.length-1];n[c]=!0}}})();
(function(m){function n(k){if(k.length){var c=k[0];runtime.readFile(c,"utf8",function(a,h){function b(){var a;(a=eval(e))&&runtime.exit(a)}var f="",e=h;-1!==c.indexOf("/")&&(f=c.substring(0,c.indexOf("/")));runtime.setCurrentDirectory(f);a||null===e?(runtime.log(a),runtime.exit(1)):b.apply(null,k)})}}m=m?Array.prototype.slice.call(m):[];"NodeJSRuntime"===runtime.type()?n(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?n(m):n(m.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function m(a){var d=[],b,g=a.length;for(b=0;b<g;b+=1)d[b]=a.charCodeAt(b)&255;return d}function n(a){var d,b="",g,l=a.length-2;for(g=0;g<l;g+=3)d=a[g]<<16|a[g+1]<<8|a[g+2],b+=q[d>>>18],b+=q[d>>>12&63],b+=q[d>>>6&63],b+=q[d&63];g===l+1?(d=a[g]<<4,b+=q[d>>>6],b+=q[d&63],b+="=="):g===l&&(d=a[g]<<10|a[g+1]<<2,b+=q[d>>>12],b+=q[d>>>6&63],b+=q[d&63],b+="=");return b}function k(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var d=[],b=a.length%4,g,l=a.length,c;for(g=0;g<l;g+=4)c=(s[a.charAt(g)]||
0)<<18|(s[a.charAt(g+1)]||0)<<12|(s[a.charAt(g+2)]||0)<<6|(s[a.charAt(g+3)]||0),d.push(c>>16,c>>8&255,c&255);d.length-=[0,0,2,1][b];return d}function c(a){var d=[],b,g=a.length,l;for(b=0;b<g;b+=1)l=a[b],128>l?d.push(l):2048>l?d.push(192|l>>>6,128|l&63):d.push(224|l>>>12&15,128|l>>>6&63,128|l&63);return d}function a(a){var d=[],b,g=a.length,l,c,e;for(b=0;b<g;b+=1)l=a[b],128>l?d.push(l):(b+=1,c=a[b],224>l?d.push((l&31)<<6|c&63):(b+=1,e=a[b],d.push((l&15)<<12|(c&63)<<6|e&63)));return d}function h(a){return n(m(a))}
function b(a){return String.fromCharCode.apply(String,k(a))}function f(d){return a(m(d))}function e(d){d=a(d);for(var b="",g=0;g<d.length;)b+=String.fromCharCode.apply(String,d.slice(g,g+45E3)),g+=45E3;return b}function d(a,d,b){var g="",l,c,e;for(e=d;e<b;e+=1)d=a.charCodeAt(e)&255,128>d?g+=String.fromCharCode(d):(e+=1,l=a.charCodeAt(e)&255,224>d?g+=String.fromCharCode((d&31)<<6|l&63):(e+=1,c=a.charCodeAt(e)&255,g+=String.fromCharCode((d&15)<<12|(l&63)<<6|c&63)));return g}function t(a,b){function g(){var f=
e+l;f>a.length&&(f=a.length);c+=d(a,e,f);e=f;f=e===a.length;b(c,f)&&!f&&runtime.setTimeout(g,0)}var l=1E5,c="",e=0;a.length<l?b(d(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),g())}function l(a){return c(m(a))}function p(a){return String.fromCharCode.apply(String,c(a))}function g(a){return String.fromCharCode.apply(String,c(m(a)))}var q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=function(a){var d={},b,g;b=0;for(g=a.length;b<g;b+=1)d[a.charAt(b)]=b;return d}(q),w,
u,A=runtime.getWindow(),x,r;A&&A.btoa?(x=function(a){return A.btoa(a)},w=function(a){return x(g(a))}):(x=h,w=function(a){return n(l(a))});A&&A.atob?(r=function(a){return A.atob(a)},u=function(a){a=r(a);return d(a,0,a.length)}):(r=b,u=function(a){return e(k(a))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=n;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=k;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=c;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=a;this.convertUTF8StringToBase64=h;this.convertBase64ToUTF8String=b;this.convertUTF8StringToUTF16Array=f;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=e;this.convertUTF8StringToUTF16String=t;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=l;this.convertUTF16ArrayToUTF8String=p;this.convertUTF16StringToUTF8String=g;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=u;this.fromBase64=b;this.toBase64=h;this.atob=
r;this.btoa=x;this.utob=g;this.btou=t;this.encode=w;this.encodeURI=function(a){return w(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return u(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function m(){this.dl=this.fc=0}function n(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function k(a,d,b,g){this.good_length=a;this.max_lazy=d;this.nice_length=b;this.max_chain=g}function c(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=a;this.off=0}var a=8192,h,b,f,e,d=null,t,l,p,g,q,s,w,u,A,x,r,v,D,G,y,P,z,R,E,K,X,oa,L,ra,aa,ea,O,V,S,M,H,F,I,Q,ba,fa,N,ca,ha,C,ka,ia,T,ja,la,U,ma,W,$,B,sa,ya=[0,
0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ta=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],xa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],J=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ua;ua=[new k(0,0,0,0),new k(4,4,8,4),new k(4,5,16,8),new k(4,6,32,32),new k(4,4,16,16),new k(8,16,32,32),new k(8,16,128,128),new k(8,32,128,256),new k(32,128,258,1024),new k(32,258,258,4096)];var va=function(g){d[l+t++]=g;if(l+t===a){var e;if(0!==t){null!==h?(g=h,h=h.next):g=new c;
g.next=null;g.len=g.off=0;null===b?b=f=g:f=f.next=g;g.len=t-l;for(e=0;e<g.len;e++)g.ptr[e]=d[l+e];t=l=0}}},na=function(b){b&=65535;l+t<a-2?(d[l+t++]=b&255,d[l+t++]=b>>>8):(va(b&255),va(b>>>8))},pa=function(){r=(r<<5^g[z+3-1]&255)&8191;v=w[32768+r];w[z&32767]=v;w[32768+r]=z},ga=function(a,b){A>16-b?(u|=a<<A,na(u),u=a>>16-A,A+=b-16):(u|=a<<A,A+=b)},Y=function(a,b){ga(b[a].fc,b[a].dl)},da=function(a,b,d){return a[b].fc<a[d].fc||a[b].fc===a[d].fc&&N[b]<=N[d]},Z=function(a,b,d){var g;for(g=0;g<d&&sa<B.length;g++)a[b+
g]=B.charCodeAt(sa++)&255;return g},wa=function(){var a,b,d=65536-K-z;if(-1===d)d--;else if(65274<=z){for(a=0;32768>a;a++)g[a]=g[a+32768];R-=32768;z-=32768;x-=32768;for(a=0;8192>a;a++)b=w[32768+a],w[32768+a]=32768<=b?b-32768:0;for(a=0;32768>a;a++)b=w[a],w[a]=32768<=b?b-32768:0;d+=32768}E||(a=Z(g,z+K,d),0>=a?E=!0:K+=a)},qa=function(a){var b=X,d=z,l,c=P,e=32506<z?z-32506:0,f=z+258,q=g[d+c-1],p=g[d+c];P>=ra&&(b>>=2);do if(l=a,g[l+c]===p&&g[l+c-1]===q&&g[l]===g[d]&&g[++l]===g[d+1]){d+=2;l++;do++d;while(g[d]===
g[++l]&&g[++d]===g[++l]&&g[++d]===g[++l]&&g[++d]===g[++l]&&g[++d]===g[++l]&&g[++d]===g[++l]&&g[++d]===g[++l]&&g[++d]===g[++l]&&d<f);l=258-(f-d);d=f-258;if(l>c){R=a;c=l;if(258<=l)break;q=g[d+c-1];p=g[d+c]}a=w[a&32767]}while(a>e&&0!==--b);return c},za=function(a,d){s[T++]=d;0===a?aa[d].fc++:(a--,aa[ca[d]+256+1].fc++,ea[(256>a?ha[a]:ha[256+(a>>7)])&255].fc++,q[ja++]=a,U|=ma);ma<<=1;0===(T&7)&&(ia[la++]=U,U=0,ma=1);if(2<L&&0===(T&4095)){var b=8*T,g=z-x,l;for(l=0;30>l;l++)b+=ea[l].fc*(5+ta[l]);b>>=3;if(ja<
parseInt(T/2,10)&&b<parseInt(g/2,10))return!0}return 8191===T||8192===ja},Ba=function(a,d){for(var b=Q[d],g=d<<1;g<=ba;){g<ba&&da(a,Q[g+1],Q[g])&&g++;if(da(a,b,Q[g]))break;Q[d]=Q[g];d=g;g<<=1}Q[d]=b},Da=function(a,d){var b=0;do b|=a&1,a>>=1,b<<=1;while(0<--d);return b>>1},Ea=function(a,d){var b=[];b.length=16;var g=0,l;for(l=1;15>=l;l++)g=g+I[l-1]<<1,b[l]=g;for(g=0;g<=d;g++)l=a[g].dl,0!==l&&(a[g].fc=Da(b[l]++,l))},Ca=function(a){var d=a.dyn_tree,b=a.static_tree,g=a.elems,l,c=-1,e=g;ba=0;fa=573;for(l=
0;l<g;l++)0!==d[l].fc?(Q[++ba]=c=l,N[l]=0):d[l].dl=0;for(;2>ba;)l=Q[++ba]=2>c?++c:0,d[l].fc=1,N[l]=0,W--,null!==b&&($-=b[l].dl);a.max_code=c;for(l=ba>>1;1<=l;l--)Ba(d,l);do l=Q[1],Q[1]=Q[ba--],Ba(d,1),b=Q[1],Q[--fa]=l,Q[--fa]=b,d[e].fc=d[l].fc+d[b].fc,N[e]=N[l]>N[b]+1?N[l]:N[b]+1,d[l].dl=d[b].dl=e,Q[1]=e++,Ba(d,1);while(2<=ba);Q[--fa]=Q[1];e=a.dyn_tree;l=a.extra_bits;var g=a.extra_base,b=a.max_code,f=a.max_length,q=a.static_tree,p,h,r,k,u=0;for(h=0;15>=h;h++)I[h]=0;e[Q[fa]].dl=0;for(a=fa+1;573>a;a++)p=
Q[a],h=e[e[p].dl].dl+1,h>f&&(h=f,u++),e[p].dl=h,p>b||(I[h]++,r=0,p>=g&&(r=l[p-g]),k=e[p].fc,W+=k*(h+r),null!==q&&($+=k*(q[p].dl+r)));if(0!==u){do{for(h=f-1;0===I[h];)h--;I[h]--;I[h+1]+=2;I[f]--;u-=2}while(0<u);for(h=f;0!==h;h--)for(p=I[h];0!==p;)l=Q[--a],l>b||(e[l].dl!==h&&(W+=(h-e[l].dl)*e[l].fc,e[l].fc=h),p--)}Ea(d,c)},Fa=function(a,d){var b,g=-1,l,c=a[0].dl,e=0,f=7,h=4;0===c&&(f=138,h=3);a[d+1].dl=65535;for(b=0;b<=d;b++)l=c,c=a[b+1].dl,++e<f&&l===c||(e<h?S[l].fc+=e:0!==l?(l!==g&&S[l].fc++,S[16].fc++):
10>=e?S[17].fc++:S[18].fc++,e=0,g=l,0===c?(f=138,h=3):l===c?(f=6,h=3):(f=7,h=4))},Ga=function(){8<A?na(u):0<A&&va(u);A=u=0},Ha=function(a,d){var b,g=0,l=0,c=0,e=0,f,h;if(0!==T){do 0===(g&7)&&(e=ia[c++]),b=s[g++]&255,0===(e&1)?Y(b,a):(f=ca[b],Y(f+256+1,a),h=ya[f],0!==h&&(b-=C[f],ga(b,h)),b=q[l++],f=(256>b?ha[b]:ha[256+(b>>7)])&255,Y(f,d),h=ta[f],0!==h&&(b-=ka[f],ga(b,h))),e>>=1;while(g<T)}Y(256,a)},Ia=function(a,b){var d,g=-1,l,c=a[0].dl,e=0,f=7,h=4;0===c&&(f=138,h=3);for(d=0;d<=b;d++)if(l=c,c=a[d+
1].dl,!(++e<f&&l===c)){if(e<h){do Y(l,S);while(0!==--e)}else 0!==l?(l!==g&&(Y(l,S),e--),Y(16,S),ga(e-3,2)):10>=e?(Y(17,S),ga(e-3,3)):(Y(18,S),ga(e-11,7));e=0;g=l;0===c?(f=138,h=3):l===c?(f=6,h=3):(f=7,h=4)}},Ja=function(){var a;for(a=0;286>a;a++)aa[a].fc=0;for(a=0;30>a;a++)ea[a].fc=0;for(a=0;19>a;a++)S[a].fc=0;aa[256].fc=1;U=T=ja=la=W=$=0;ma=1},Aa=function(a){var b,d,l,c;c=z-x;ia[la]=U;Ca(M);Ca(H);Fa(aa,M.max_code);Fa(ea,H.max_code);Ca(F);for(l=18;3<=l&&0===S[J[l]].dl;l--);W+=3*(l+1)+14;b=W+3+7>>
3;d=$+3+7>>3;d<=b&&(b=d);if(c+4<=b&&0<=x)for(ga(0+a,3),Ga(),na(c),na(~c),l=0;l<c;l++)va(g[x+l]);else if(d===b)ga(2+a,3),Ha(O,V);else{ga(4+a,3);c=M.max_code+1;b=H.max_code+1;l+=1;ga(c-257,5);ga(b-1,5);ga(l-4,4);for(d=0;d<l;d++)ga(S[J[d]].dl,3);Ia(aa,c-1);Ia(ea,b-1);Ha(aa,ea)}Ja();0!==a&&Ga()},Ka=function(a,g,c){var e,f,p;for(e=0;null!==b&&e<c;){f=c-e;f>b.len&&(f=b.len);for(p=0;p<f;p++)a[g+e+p]=b.ptr[b.off+p];b.off+=f;b.len-=f;e+=f;0===b.len&&(f=b,b=b.next,f.next=h,h=f)}if(e===c)return e;if(l<t){f=
c-e;f>t-l&&(f=t-l);for(p=0;p<f;p++)a[g+e+p]=d[l+p];l+=f;e+=f;t===l&&(t=l=0)}return e},La=function(a,d,c){var f;if(!e){if(!E){A=u=0;var h,q;if(0===V[0].dl){M.dyn_tree=aa;M.static_tree=O;M.extra_bits=ya;M.extra_base=257;M.elems=286;M.max_length=15;M.max_code=0;H.dyn_tree=ea;H.static_tree=V;H.extra_bits=ta;H.extra_base=0;H.elems=30;H.max_length=15;H.max_code=0;F.dyn_tree=S;F.static_tree=null;F.extra_bits=xa;F.extra_base=0;F.elems=19;F.max_length=7;for(q=h=F.max_code=0;28>q;q++)for(C[q]=h,f=0;f<1<<ya[q];f++)ca[h++]=
q;ca[h-1]=q;for(q=h=0;16>q;q++)for(ka[q]=h,f=0;f<1<<ta[q];f++)ha[h++]=q;for(h>>=7;30>q;q++)for(ka[q]=h<<7,f=0;f<1<<ta[q]-7;f++)ha[256+h++]=q;for(f=0;15>=f;f++)I[f]=0;for(f=0;143>=f;)O[f++].dl=8,I[8]++;for(;255>=f;)O[f++].dl=9,I[9]++;for(;279>=f;)O[f++].dl=7,I[7]++;for(;287>=f;)O[f++].dl=8,I[8]++;Ea(O,287);for(f=0;30>f;f++)V[f].dl=5,V[f].fc=Da(f,5);Ja()}for(f=0;8192>f;f++)w[32768+f]=0;oa=ua[L].max_lazy;ra=ua[L].good_length;X=ua[L].max_chain;x=z=0;K=Z(g,0,65536);if(0>=K)E=!0,K=0;else{for(E=!1;262>K&&
!E;)wa();for(f=r=0;2>f;f++)r=(r<<5^g[f]&255)&8191}b=null;l=t=0;3>=L?(P=2,y=0):(y=2,G=0);p=!1}e=!0;if(0===K)return p=!0,0}f=Ka(a,d,c);if(f===c)return c;if(p)return f;if(3>=L)for(;0!==K&&null===b;){pa();0!==v&&32506>=z-v&&(y=qa(v),y>K&&(y=K));if(3<=y)if(q=za(z-R,y-3),K-=y,y<=oa){y--;do z++,pa();while(0!==--y);z++}else z+=y,y=0,r=g[z]&255,r=(r<<5^g[z+1]&255)&8191;else q=za(0,g[z]&255),K--,z++;q&&(Aa(0),x=z);for(;262>K&&!E;)wa()}else for(;0!==K&&null===b;){pa();P=y;D=R;y=2;0!==v&&(P<oa&&32506>=z-v)&&
(y=qa(v),y>K&&(y=K),3===y&&4096<z-R&&y--);if(3<=P&&y<=P){q=za(z-1-D,P-3);K-=P-1;P-=2;do z++,pa();while(0!==--P);G=0;y=2;z++;q&&(Aa(0),x=z)}else 0!==G?za(0,g[z-1]&255)&&(Aa(0),x=z):G=1,z++,K--;for(;262>K&&!E;)wa()}0===K&&(0!==G&&za(0,g[z-1]&255),Aa(1),p=!0);return f+Ka(a,f+d,c-f)};this.deflate=function(l,c){var p,r;B=l;sa=0;"undefined"===String(typeof c)&&(c=6);(p=c)?1>p?p=1:9<p&&(p=9):p=6;L=p;E=e=!1;if(null===d){h=b=f=null;d=[];d.length=a;g=[];g.length=65536;q=[];q.length=8192;s=[];s.length=32832;
w=[];w.length=65536;aa=[];aa.length=573;for(p=0;573>p;p++)aa[p]=new m;ea=[];ea.length=61;for(p=0;61>p;p++)ea[p]=new m;O=[];O.length=288;for(p=0;288>p;p++)O[p]=new m;V=[];V.length=30;for(p=0;30>p;p++)V[p]=new m;S=[];S.length=39;for(p=0;39>p;p++)S[p]=new m;M=new n;H=new n;F=new n;I=[];I.length=16;Q=[];Q.length=573;N=[];N.length=573;ca=[];ca.length=256;ha=[];ha.length=512;C=[];C.length=29;ka=[];ka.length=30;ia=[];ia.length=1024}var k=Array(1024),u=[],v=[];for(p=La(k,0,k.length);0<p;){v.length=p;for(r=
0;r<p;r++)v[r]=String.fromCharCode(k[r]);u[u.length]=v.join("");p=La(k,0,k.length)}B=null;return u.join("")}};
// Input 4
core.ByteArray=function(m){this.pos=0;this.data=m;this.readUInt32LE=function(){this.pos+=4;var m=this.data,k=this.pos;return m[--k]<<24|m[--k]<<16|m[--k]<<8|m[--k]};this.readUInt16LE=function(){this.pos+=2;var m=this.data,k=this.pos;return m[--k]<<8|m[--k]}};
// Input 5
core.ByteArrayWriter=function(m){var n=this,k=new runtime.ByteArray(0);this.appendByteArrayWriter=function(c){k=runtime.concatByteArrays(k,c.getByteArray())};this.appendByteArray=function(c){k=runtime.concatByteArrays(k,c)};this.appendArray=function(c){k=runtime.concatByteArrays(k,runtime.byteArrayFromArray(c))};this.appendUInt16LE=function(c){n.appendArray([c&255,c>>8&255])};this.appendUInt32LE=function(c){n.appendArray([c&255,c>>8&255,c>>16&255,c>>24&255])};this.appendString=function(c){k=runtime.concatByteArrays(k,
runtime.byteArrayFromString(c,m))};this.getLength=function(){return k.length};this.getByteArray=function(){return k}};
// Input 6
core.RawInflate=function(){var m,n,k=null,c,a,h,b,f,e,d,t,l,p,g,q,s,w,u=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],A=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],r=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],v=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],G=function(){this.list=this.next=null},y=function(){this.n=this.b=this.e=0;this.t=null},P=function(a,b,d,l,g,f){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var c=Array(this.BMAX+1),e,p,h,q,r,k,u,s=Array(this.BMAX+1),m,n,v,w=new y,t=Array(this.BMAX);q=Array(this.N_MAX);var x,A=Array(this.BMAX+1),X,z,D;D=this.root=null;for(r=0;r<c.length;r++)c[r]=0;for(r=0;r<s.length;r++)s[r]=0;for(r=0;r<t.length;r++)t[r]=null;for(r=0;r<q.length;r++)q[r]=
0;for(r=0;r<A.length;r++)A[r]=0;e=256<b?a[256]:this.BMAX;m=a;n=0;r=b;do c[m[n]]++,n++;while(0<--r);if(c[0]==b)this.root=null,this.status=this.m=0;else{for(k=1;k<=this.BMAX&&0==c[k];k++);u=k;f<k&&(f=k);for(r=this.BMAX;0!=r&&0==c[r];r--);h=r;f>r&&(f=r);for(X=1<<k;k<r;k++,X<<=1)if(0>(X-=c[k])){this.status=2;this.m=f;return}if(0>(X-=c[r]))this.status=2,this.m=f;else{c[r]+=X;A[1]=k=0;m=c;n=1;for(v=2;0<--r;)A[v++]=k+=m[n++];m=a;r=n=0;do 0!=(k=m[n++])&&(q[A[k]++]=r);while(++r<b);b=A[h];A[0]=r=0;m=q;n=0;
q=-1;x=s[0]=0;v=null;for(z=0;u<=h;u++)for(a=c[u];0<a--;){for(;u>x+s[1+q];){x+=s[1+q];q++;z=(z=h-x)>f?f:z;if((p=1<<(k=u-x))>a+1)for(p-=a+1,v=u;++k<z&&!((p<<=1)<=c[++v]);)p-=c[v];x+k>e&&x<e&&(k=e-x);z=1<<k;s[1+q]=k;v=Array(z);for(p=0;p<z;p++)v[p]=new y;D=null==D?this.root=new G:D.next=new G;D.next=null;D.list=v;t[q]=v;0<q&&(A[q]=r,w.b=s[q],w.e=16+k,w.t=v,k=(r&(1<<x)-1)>>x-s[q],t[q-1][k].e=w.e,t[q-1][k].b=w.b,t[q-1][k].n=w.n,t[q-1][k].t=w.t)}w.b=u-x;n>=b?w.e=99:m[n]<d?(w.e=256>m[n]?16:15,w.n=m[n++]):
(w.e=g[m[n]-d],w.n=l[m[n++]-d]);p=1<<u-x;for(k=r>>x;k<z;k+=p)v[k].e=w.e,v[k].b=w.b,v[k].n=w.n,v[k].t=w.t;for(k=1<<u-1;0!=(r&k);k>>=1)r^=k;for(r^=k;(r&(1<<x)-1)!=A[q];)x-=s[q],q--}this.m=s[1];this.status=0!=X&&1!=h?1:0}}},z=function(a){for(;b<a;){var d=h,l;l=s.length==w?-1:s[w++];h=d|l<<b;b+=8}},R=function(a){return h&u[a]},E=function(a){h>>=a;b-=a},K=function(a,b,c){var e,h,r;if(0==c)return 0;for(r=0;;){z(g);h=l.list[R(g)];for(e=h.e;16<e;){if(99==e)return-1;E(h.b);e-=16;z(e);h=h.t[R(e)];e=h.e}E(h.b);
if(16==e)n&=32767,a[b+r++]=m[n++]=h.n;else{if(15==e)break;z(e);d=h.n+R(e);E(e);z(q);h=p.list[R(q)];for(e=h.e;16<e;){if(99==e)return-1;E(h.b);e-=16;z(e);h=h.t[R(e)];e=h.e}E(h.b);z(e);t=n-h.n-R(e);for(E(e);0<d&&r<c;)d--,t&=32767,n&=32767,a[b+r++]=m[n++]=m[t++]}if(r==c)return c}f=-1;return r},X,oa=function(a,b,d){var c,e,f,h,k,u,s,m=Array(316);for(c=0;c<m.length;c++)m[c]=0;z(5);u=257+R(5);E(5);z(5);s=1+R(5);E(5);z(4);c=4+R(4);E(4);if(286<u||30<s)return-1;for(e=0;e<c;e++)z(3),m[D[e]]=R(3),E(3);for(;19>
e;e++)m[D[e]]=0;g=7;e=new P(m,19,19,null,null,g);if(0!=e.status)return-1;l=e.root;g=e.m;h=u+s;for(c=f=0;c<h;)if(z(g),k=l.list[R(g)],e=k.b,E(e),e=k.n,16>e)m[c++]=f=e;else if(16==e){z(2);e=3+R(2);E(2);if(c+e>h)return-1;for(;0<e--;)m[c++]=f}else{17==e?(z(3),e=3+R(3),E(3)):(z(7),e=11+R(7),E(7));if(c+e>h)return-1;for(;0<e--;)m[c++]=0;f=0}g=9;e=new P(m,u,257,A,x,g);0==g&&(e.status=1);if(0!=e.status)return-1;l=e.root;g=e.m;for(c=0;c<s;c++)m[c]=m[c+u];q=6;e=new P(m,s,0,r,v,q);p=e.root;q=e.m;return 0==q&&
257<u||0!=e.status?-1:K(a,b,d)};this.inflate=function(u,D){null==m&&(m=Array(65536));b=h=n=0;f=-1;e=!1;d=t=0;l=null;s=u;w=0;var G=new runtime.ByteArray(D);a:{var y,O;for(y=0;y<D&&(!e||-1!=f);){if(0<d){if(0!=f)for(;0<d&&y<D;)d--,t&=32767,n&=32767,G[0+y++]=m[n++]=m[t++];else{for(;0<d&&y<D;)d--,n&=32767,z(8),G[0+y++]=m[n++]=R(8),E(8);0==d&&(f=-1)}if(y==D)break}if(-1==f){if(e)break;z(1);0!=R(1)&&(e=!0);E(1);z(2);f=R(2);E(2);l=null;d=0}switch(f){case 0:O=G;var V=0+y,S=D-y,M=void 0,M=b&7;E(M);z(16);M=R(16);
E(16);z(16);if(M!=(~h&65535))O=-1;else{E(16);d=M;for(M=0;0<d&&M<S;)d--,n&=32767,z(8),O[V+M++]=m[n++]=R(8),E(8);0==d&&(f=-1);O=M}break;case 1:if(null!=l)O=K(G,0+y,D-y);else b:{O=G;V=0+y;S=D-y;if(null==k){for(var H=void 0,M=Array(288),H=void 0,H=0;144>H;H++)M[H]=8;for(;256>H;H++)M[H]=9;for(;280>H;H++)M[H]=7;for(;288>H;H++)M[H]=8;a=7;H=new P(M,288,257,A,x,a);if(0!=H.status){alert("HufBuild error: "+H.status);O=-1;break b}k=H.root;a=H.m;for(H=0;30>H;H++)M[H]=5;X=5;H=new P(M,30,0,r,v,X);if(1<H.status){k=
null;alert("HufBuild error: "+H.status);O=-1;break b}c=H.root;X=H.m}l=k;p=c;g=a;q=X;O=K(O,V,S)}break;case 2:O=null!=l?K(G,0+y,D-y):oa(G,0+y,D-y);break;default:O=-1}if(-1==O)break a;y+=O}}s=null;return G}};
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
core.LoopWatchDog=function(m,n){var k=Date.now(),c=0;this.check=function(){var a;if(m&&(a=Date.now(),a-k>m))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<n&&(c+=1,c>n))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){this.hashString=function(m){var n=0,k,c;k=0;for(c=m.length;k<c;k+=1)n=(n<<5)-n+m.charCodeAt(k),n|=0;return n}};
// Input 9
core.DomUtils=function(){function m(k,c){if(k.nodeType===Node.TEXT_NODE)if(0===k.length)k.parentNode.removeChild(k);else if(c.nodeType===Node.TEXT_NODE)return c.insertData(0,k.data),k.parentNode.removeChild(k),c;return k}function n(k,c){return k===c||Boolean(k.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY)}this.splitBoundaries=function(k){var c=[],a;if(k.startContainer.nodeType===Node.TEXT_NODE||k.endContainer.nodeType===Node.TEXT_NODE){a=k.endContainer;var h=k.endOffset;if(h<a.childNodes.length)for(a=
a.childNodes[h],h=0;a.firstChild;)a=a.firstChild;else for(;a.lastChild;)a=a.lastChild,h=a.nodeType===Node.TEXT_NODE?a.textContent.length:a.childNodes.length;k.setEnd(a,h);0!==k.endOffset&&(k.endContainer.nodeType===Node.TEXT_NODE&&k.endOffset!==k.endContainer.length)&&(c.push(k.endContainer.splitText(k.endOffset)),c.push(k.endContainer));0!==k.startOffset&&(k.startContainer.nodeType===Node.TEXT_NODE&&k.startOffset!==k.startContainer.length)&&(a=k.startContainer.splitText(k.startOffset),c.push(k.startContainer),
c.push(a),k.setStart(a,0))}return c};this.containsRange=function(k,c){return 0>=k.compareBoundaryPoints(k.START_TO_START,c)&&0<=k.compareBoundaryPoints(k.END_TO_END,c)};this.rangesIntersect=function(k,c){return 0>=k.compareBoundaryPoints(k.END_TO_START,c)&&0<=k.compareBoundaryPoints(k.START_TO_END,c)};this.getNodesInRange=function(k,c){var a=[],h,b=k.startContainer.ownerDocument.createTreeWalker(k.commonAncestorContainer,NodeFilter.SHOW_ALL,c,!1);for(h=b.currentNode=k.startContainer;h;){if(c(h)===
NodeFilter.FILTER_ACCEPT)a.push(h);else if(c(h)===NodeFilter.FILTER_REJECT)break;h=h.parentNode}a.reverse();for(h=b.nextNode();h;)a.push(h),h=b.nextNode();return a};this.normalizeTextNodes=function(k){k&&k.nextSibling&&(k=m(k,k.nextSibling));k&&k.previousSibling&&m(k.previousSibling,k)};this.rangeContainsNode=function(k,c){var a=c.ownerDocument.createRange(),h=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;a.setStart(k.startContainer,k.startOffset);a.setEnd(k.endContainer,k.endOffset);h=
0===a.comparePoint(c,0)&&0===a.comparePoint(c,h);a.detach();return h};this.mergeIntoParent=function(k){for(var c=k.parentNode;k.firstChild;)c.insertBefore(k.firstChild,k);c.removeChild(k);return c};this.getElementsByTagNameNS=function(k,c,a){return Array.prototype.slice.call(k.getElementsByTagNameNS(c,a))};this.rangeIntersectsNode=function(k,c){var a=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;return 0>=k.comparePoint(c,0)&&0<=k.comparePoint(c,a)};this.containsNode=function(k,c){return k===
c||k.contains(c)};(function(k){var c=runtime.getWindow();null!==c&&(c=c.navigator.appVersion.toLowerCase(),c=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")))&&(k.containsNode=n)})(this)};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(m,n){function k(a){a.parentNode&&(f.push(a.previousSibling),f.push(a.nextSibling),a.parentNode.removeChild(a))}function c(a,b,d){if(b.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(b),"putCursorIntoTextNode: invalid container");var e=b.parentNode;runtime.assert(Boolean(e),"putCursorIntoTextNode: container without parent");runtime.assert(0<=d&&d<=b.length,"putCursorIntoTextNode: offset is out of bounds");0===d?e.insertBefore(a,b):(d!==b.length&&b.splitText(d),e.insertBefore(a,
b.nextSibling))}else if(b.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(b),"putCursorIntoContainer: invalid container");for(e=b.firstChild;null!==e&&0<d;)e=e.nextSibling,d-=1;b.insertBefore(a,e)}f.push(a.previousSibling);f.push(a.nextSibling)}var a=m.createElementNS("urn:webodf:names:cursor","cursor"),h=m.createElementNS("urn:webodf:names:cursor","anchor"),b,f=[],e,d,t=new core.DomUtils;this.getNode=function(){return a};this.getAnchorNode=function(){return h.parentNode?h:a};this.getSelectedRange=
function(){d?(e.setStartBefore(a),e.collapse(!0)):(e.setStartAfter(b?h:a),e.setEndBefore(b?a:h));return e};this.setSelectedRange=function(l,p){e&&e!==l&&e.detach();e=l;b=!1!==p;(d=l.collapsed)?(k(h),k(a),c(a,l.startContainer,l.startOffset)):(k(h),k(a),c(b?a:h,l.endContainer,l.endOffset),c(b?h:a,l.startContainer,l.startOffset));f.forEach(t.normalizeTextNodes);f.length=0};this.remove=function(){k(a);f.forEach(t.normalizeTextNodes);f.length=0};a.setAttributeNS("urn:webodf:names:cursor","memberId",n);
h.setAttributeNS("urn:webodf:names:cursor","memberId",n)};
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
core.EventNotifier=function(m){var n={};this.emit=function(k,c){var a,h;runtime.assert(n.hasOwnProperty(k),'unknown event fired "'+k+'"');h=n[k];for(a=0;a<h.length;a+=1)h[a](c)};this.subscribe=function(k,c){runtime.assert(n.hasOwnProperty(k),'tried to subscribe to unknown event "'+k+'"');n[k].push(c);runtime.log('event "'+k+'" subscribed.')};this.unsubscribe=function(k,c){var a;runtime.assert(n.hasOwnProperty(k),'tried to unsubscribe from unknown event "'+k+'"');a=n[k].indexOf(c);runtime.assert(-1!==
a,'tried to unsubscribe unknown callback from event "'+k+'"');-1!==a&&n[k].splice(a,1);runtime.log('event "'+k+'" unsubscribed.')};(function(){var k;for(k=0;k<m.length;k+=1)n[m[k]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var m=runtime.getWindow().document,n=m.getElementById("testarea");runtime.assert(!n,'Unclean test environment, found a div with id "testarea".');n=m.createElement("div");n.setAttribute("id","testarea");m.body.appendChild(n);return n};
core.UnitTest.cleanupTestAreaDiv=function(){var m=runtime.getWindow().document,n=m.getElementById("testarea");runtime.assert(!!n&&n.parentNode===m.body,'Test environment broken, found no div with id "testarea" below body.');m.body.removeChild(n)};
core.UnitTestRunner=function(){function m(a){b+=1;runtime.log("fail",a)}function n(a,b){var c;try{if(a.length!==b.length)return m("array of length "+a.length+" should be "+b.length+" long"),!1;for(c=0;c<a.length;c+=1)if(a[c]!==b[c])return m(a[c]+" should be "+b[c]+" at array index "+c),!1}catch(l){return!1}return!0}function k(a,b,c){var l=a.attributes,f=l.length,g,h,s;for(g=0;g<f;g+=1)if(h=l.item(g),"xmlns"!==h.prefix){s=b.getAttributeNS(h.namespaceURI,h.localName);if(!b.hasAttributeNS(h.namespaceURI,
h.localName))return m("Attribute "+h.localName+" with value "+h.value+" was not present"),!1;if(s!==h.value)return m("Attribute "+h.localName+" was "+s+" should be "+h.value),!1}return c?!0:k(b,a,!0)}function c(a,b){if(a.nodeType!==b.nodeType)return m(a.nodeType+" should be "+b.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===b.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==b.namespaceURI||a.localName!==b.localName)return m(a.namespaceURI+
" should be "+b.namespaceURI),!1;if(!k(a,b,!1))return!1;for(var f=a.firstChild,l=b.firstChild;f;){if(!l||!c(f,l))return!1;f=f.nextSibling;l=l.nextSibling}return l?!1:!0}function a(a,b){return 0===b?a===b&&1/a===1/b:a===b?!0:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?n(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?c(b,a):f(b,a):!1}function h(b,d,c){"string"===typeof d&&
"string"===typeof c||runtime.log("WARN: shouldBe() expects string arguments");var l,f;try{f=eval(d)}catch(g){l=g}b=eval(c);l?m(d+" should be "+b+". Threw exception "+l):a(f,b)?runtime.log("pass",d+" is "+c):String(typeof f)===String(typeof b)?(c=0===f&&0>1/f?"-0":String(f),m(d+" should be "+b+". Was "+c+".")):m(d+" should be "+b+" (of type "+typeof b+"). Was "+f+" (of type "+typeof f+").")}var b=0,f;f=function(b,d){var c=Object.keys(b),l=Object.keys(d);c.sort();l.sort();return n(c,l)&&Object.keys(b).every(function(l){var g=
b[l],c=d[l];return a(g,c)?!0:(m(g+" should be "+c+" for key "+l),!1)})};this.areNodesEqual=c;this.shouldBeNull=function(a,b){h(a,b,"null")};this.shouldBeNonNull=function(a,b){var c,l;try{l=eval(b)}catch(f){c=f}c?m(b+" should be non-null. Threw exception "+c):null!==l?runtime.log("pass",b+" is non-null."):m(b+" should be non-null. Was "+l)};this.shouldBe=h;this.countFailedTests=function(){return b}};
core.UnitTester=function(){function m(c,a){return"<span style='color:blue;cursor:pointer' onclick='"+a+"'>"+c+"</span>"}var n=0,k={};this.runTests=function(c,a,h){function b(l){if(0===l.length)k[f]=t,n+=e.countFailedTests(),a();else{p=l[0];var g=Runtime.getFunctionName(p);runtime.log("Running "+g);q=e.countFailedTests();d.setUp();p(function(){d.tearDown();t[g]=q===e.countFailedTests();b(l.slice(1))})}}var f=Runtime.getFunctionName(c),e=new core.UnitTestRunner,d=new c(e),t={},l,p,g,q,s="BrowserRuntime"===
runtime.type();if(k.hasOwnProperty(f))runtime.log("Test "+f+" has already run.");else{s?runtime.log("<span>Running "+m(f,'runSuite("'+f+'");')+": "+d.description()+"</span>"):runtime.log("Running "+f+": "+d.description);g=d.tests();for(l=0;l<g.length;l+=1)p=g[l],c=Runtime.getFunctionName(p)||p.testName,h.length&&-1===h.indexOf(c)||(s?runtime.log("<span>Running "+m(c,'runTest("'+f+'","'+c+'")')+"</span>"):runtime.log("Running "+c),q=e.countFailedTests(),d.setUp(),p(),d.tearDown(),t[c]=q===e.countFailedTests());
b(d.asyncTests())}};this.countFailedTests=function(){return n};this.results=function(){return k}};
// Input 13
core.PositionIterator=function(m,n,k,c){function a(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function h(a){this.acceptNode=function(b){return b.nodeType===Node.TEXT_NODE&&0===b.length?NodeFilter.FILTER_REJECT:a.acceptNode(b)}}function b(){var a=e.currentNode.nodeType;d=a===Node.TEXT_NODE?e.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var f=this,e,d,t;this.nextPosition=function(){if(e.currentNode===m)return!1;
if(0===d&&e.currentNode.nodeType===Node.ELEMENT_NODE)null===e.firstChild()&&(d=1);else if(e.currentNode.nodeType===Node.TEXT_NODE&&d+1<e.currentNode.length)d+=1;else if(null!==e.nextSibling())d=0;else if(e.parentNode())d=1;else return!1;return!0};this.previousPosition=function(){var a=!0;if(0===d)if(null===e.previousSibling()){if(!e.parentNode()||e.currentNode===m)return e.firstChild(),!1;d=0}else b();else e.currentNode.nodeType===Node.TEXT_NODE?d-=1:null!==e.lastChild()?b():e.currentNode===m?a=!1:
d=0;return a};this.container=function(){var a=e.currentNode,b=a.nodeType;return 0===d&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=e.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&d===a.length)for(a=a.nextSibling;a&&1!==t(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===d&&(a=null);return a};this.leftNode=function(){var a=e.currentNode;if(0===d)for(a=a.previousSibling;a&&1!==t(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==t(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return e.currentNode};this.domOffset=function(){if(e.currentNode.nodeType===Node.TEXT_NODE)return d;var a=0,b=e.currentNode,g;for(g=1===d?e.lastChild():e.previousSibling();g;)a+=1,g=e.previousSibling();e.currentNode=b;return a};this.unfilteredDomOffset=function(){if(e.currentNode.nodeType===Node.TEXT_NODE)return d;for(var a=0,b=e.currentNode,b=1===d?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=
function(){var a=e.currentNode,b=e.previousSibling();e.currentNode=a;return b};this.getNextSibling=function(){var a=e.currentNode,b=e.nextSibling();e.currentNode=a;return b};this.setUnfilteredPosition=function(a,b){var g;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");e.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return d=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),
b===a.length&&(d=void 0,e.nextSibling()?d=0:e.parentNode()&&(d=1),runtime.assert(void 0!==d,"Error in setPosition: position not valid.")),!0;g=t(a);b<a.childNodes.length&&g!==NodeFilter.FILTER_REJECT?(e.currentNode=a.childNodes[b],g=t(e.currentNode),d=0):d=0===b?0:1;g===NodeFilter.FILTER_REJECT&&(d=1);if(g!==NodeFilter.FILTER_ACCEPT)return f.nextPosition();runtime.assert(t(e.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
return!0};this.moveToEnd=function(){e.currentNode=m;d=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?f.setUnfilteredPosition(a,a.length):(e.currentNode=a,d=1)};this.getNodeFilter=function(){return t};t=(k?new h(k):new a).acceptNode;t.acceptNode=t;e=m.ownerDocument.createTreeWalker(m,n||4294967295,t,c);d=0;null===e.firstChild()&&(d=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(m){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var m={},n=core.PositionFilter.FilterResult.FILTER_ACCEPT,k=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(c){for(var a in m)if(m.hasOwnProperty(a)&&m[a].acceptPosition(c)===k)return k;return n};this.addFilter=function(c,a){m[c]=a};this.removeFilter=function(c){delete m[c]}};
// Input 16
core.Async=function(){this.forEach=function(m,n,k){function c(a){b!==h&&(a?(b=h,k(a)):(b+=1,b===h&&k(null)))}var a,h=m.length,b=0;for(a=0;a<h;a+=1)n(m[a],c)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(m,n){function k(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],d,g,c=a.length,l=0,l=0;d=-1;for(g=0;g<c;g+=1)l=(d^a[g])&255,l=b[l],d=d>>>8^l;return d^-1}function c(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function a(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function h(a,b){var d,g,l,f,e,h,k,p=this;this.load=function(b){if(void 0!==p.data)b(null,p.data);else{var d=e+34+g+l+256;d+k>q&&(d=q-k);runtime.read(a,k,d,function(d,g){if(d||null===g)b(d,g);else a:{var c=g,l=new core.ByteArray(c),q=l.readUInt32LE(),k;if(67324752!==q)b("File entry signature is wrong."+q.toString()+" "+c.length.toString(),null);else{l.pos+=22;q=l.readUInt16LE();k=l.readUInt16LE();l.pos+=q+k;
if(f){c=c.slice(l.pos,l.pos+e);if(e!==c.length){b("The amount of compressed bytes read was "+c.length.toString()+" instead of "+e.toString()+" for "+p.filename+" in "+a+".",null);break a}c=w(c,h)}else c=c.slice(l.pos,l.pos+h);h!==c.length?b("The amount of bytes read was "+c.length.toString()+" instead of "+h.toString()+" for "+p.filename+" in "+a+".",null):(p.data=c,b(null,c))}}})}};this.set=function(a,b,d,g){p.filename=a;p.data=b;p.compressed=d;p.date=g};this.error=null;b&&(d=b.readUInt32LE(),33639248!==
d?this.error="Central directory entry has wrong signature at position "+(b.pos-4).toString()+' for file "'+a+'": '+b.data.length.toString():(b.pos+=6,f=b.readUInt16LE(),this.date=c(b.readUInt32LE()),b.readUInt32LE(),e=b.readUInt32LE(),h=b.readUInt32LE(),g=b.readUInt16LE(),l=b.readUInt16LE(),d=b.readUInt16LE(),b.pos+=8,k=b.readUInt32LE(),this.filename=runtime.byteArrayToString(b.data.slice(b.pos,b.pos+g),"utf8"),b.pos+=g+l+d))}function b(a,b){if(22!==a.length)b("Central directory length should be 22.",
u);else{var d=new core.ByteArray(a),c;c=d.readUInt32LE();101010256!==c?b("Central directory signature is wrong: "+c.toString(),u):(c=d.readUInt16LE(),0!==c?b("Zip files with non-zero disk numbers are not supported.",u):(c=d.readUInt16LE(),0!==c?b("Zip files with non-zero disk numbers are not supported.",u):(c=d.readUInt16LE(),s=d.readUInt16LE(),c!==s?b("Number of entries is inconsistent.",u):(c=d.readUInt32LE(),d=d.readUInt16LE(),d=q-22-c,runtime.read(m,d,q-d,function(a,d){if(a||null===d)b(a,u);else a:{var c=
new core.ByteArray(d),l,f;g=[];for(l=0;l<s;l+=1){f=new h(m,c);if(f.error){b(f.error,u);break a}g[g.length]=f}b(null,u)}})))))}}function f(a,b){var d=null,c,l;for(l=0;l<g.length;l+=1)if(c=g[l],c.filename===a){d=c;break}d?d.data?b(null,d.data):d.load(b):b(a+" not found.",null)}function e(b){var d=new core.ByteArrayWriter("utf8"),g=0;d.appendArray([80,75,3,4,20,0,0,0,0,0]);b.data&&(g=b.data.length);d.appendUInt32LE(a(b.date));d.appendUInt32LE(k(b.data));d.appendUInt32LE(g);d.appendUInt32LE(g);d.appendUInt16LE(b.filename.length);
d.appendUInt16LE(0);d.appendString(b.filename);b.data&&d.appendByteArray(b.data);return d}function d(b,d){var g=new core.ByteArrayWriter("utf8"),c=0;g.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);b.data&&(c=b.data.length);g.appendUInt32LE(a(b.date));g.appendUInt32LE(k(b.data));g.appendUInt32LE(c);g.appendUInt32LE(c);g.appendUInt16LE(b.filename.length);g.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);g.appendUInt32LE(d);g.appendString(b.filename);return g}function t(a,b){if(a===g.length)b(null);else{var d=g[a];
void 0!==d.data?t(a+1,b):d.load(function(d){d?b(d):t(a+1,b)})}}function l(a,b){t(0,function(c){if(c)b(c);else{c=new core.ByteArrayWriter("utf8");var l,f,h,q=[0];for(l=0;l<g.length;l+=1)c.appendByteArrayWriter(e(g[l])),q.push(c.getLength());h=c.getLength();for(l=0;l<g.length;l+=1)f=g[l],c.appendByteArrayWriter(d(f,q[l]));l=c.getLength()-h;c.appendArray([80,75,5,6,0,0,0,0]);c.appendUInt16LE(g.length);c.appendUInt16LE(g.length);c.appendUInt32LE(l);c.appendUInt32LE(h);c.appendArray([0,0]);a(c.getByteArray())}})}
function p(a,b){l(function(d){runtime.writeFile(a,d,b)},b)}var g,q,s,w=(new core.RawInflate).inflate,u=this,A=new core.Base64;this.load=f;this.save=function(a,b,d,c){var l,f;for(l=0;l<g.length;l+=1)if(f=g[l],f.filename===a){f.set(a,b,d,c);return}f=new h(m);f.set(a,b,d,c);g.push(f)};this.write=function(a){p(m,a)};this.writeAs=p;this.createByteArray=l;this.loadContentXmlAsFragments=function(a,b){u.loadAsString(a,function(a,d){if(a)return b.rootElementReady(a);b.rootElementReady(null,d,!0)})};this.loadAsString=
function(a,b){f(a,function(a,d){if(a||null===d)return b(a,null);var g=runtime.byteArrayToString(d,"utf8");b(null,g)})};this.loadAsDOM=function(a,b){u.loadAsString(a,function(a,d){if(a||null===d)b(a,null);else{var g=(new DOMParser).parseFromString(d,"text/xml");b(null,g)}})};this.loadAsDataURL=function(a,b,d){f(a,function(a,g){if(a)return d(a,null);var c=0,l;b||(b=80===g[1]&&78===g[2]&&71===g[3]?"image/png":255===g[0]&&216===g[1]&&255===g[2]?"image/jpeg":71===g[0]&&73===g[1]&&70===g[2]?"image/gif":
"");for(l="data:"+b+";base64,";c<g.length;)l+=A.convertUTF8ArrayToBase64(g.slice(c,Math.min(c+45E3,g.length))),c+=45E3;d(null,l)})};this.getEntries=function(){return g.slice()};q=-1;null===n?g=[]:runtime.getFileSize(m,function(a){q=a;0>q?n("File '"+m+"' cannot be read.",u):runtime.read(m,q-22,22,function(a,d){a||null===n||null===d?n(a,u):b(d,n)})})};
// Input 18
core.CSSUnits=function(){var m={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(n,k,c){return n*m[c]/m[k]};this.convertMeasure=function(m,k){var c,a;m&&k?(c=parseFloat(m),a=m.replace(c.toString(),""),c=this.convert(c,a,k)):c="";return c.toString()};this.getUnits=function(m){return m.substr(m.length-2,m.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(m){var n=function(){};n.prototype=m;return new n});
xmldom.LSSerializer=function(){function m(a){var c=a||{},b=function(a){var b={},d;for(d in a)a.hasOwnProperty(d)&&(b[a[d]]=d);return b}(a),f=[c],e=[b],d=0;this.push=function(){d+=1;c=f[d]=Object.create(c);b=e[d]=Object.create(b)};this.pop=function(){f[d]=void 0;e[d]=void 0;d-=1;c=f[d];b=e[d]};this.getLocalNamespaceDefinitions=function(){return b};this.getQName=function(a){var d=a.namespaceURI,f=0,g;if(!d)return a.localName;if(g=b[d])return g+":"+a.localName;do{g||!a.prefix?(g="ns"+f,f+=1):g=a.prefix;
if(c[g]===d)break;if(!c[g]){c[g]=d;b[d]=g;break}g=null}while(null===g);return g+":"+a.localName}}function n(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function k(a,h){var b="",f=c.filter?c.filter.acceptNode(h):NodeFilter.FILTER_ACCEPT,e;if(f===NodeFilter.FILTER_ACCEPT&&h.nodeType===Node.ELEMENT_NODE){a.push();e=a.getQName(h);var d,m=h.attributes,l,p,g,q="",s;d="<"+e;l=m.length;for(p=0;p<l;p+=1)g=m.item(p),"http://www.w3.org/2000/xmlns/"!==
g.namespaceURI&&(s=c.filter?c.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,s===NodeFilter.FILTER_ACCEPT&&(s=a.getQName(g),g="string"===typeof g.value?n(g.value):g.value,q+=" "+(s+'="'+g+'"')));l=a.getLocalNamespaceDefinitions();for(p in l)l.hasOwnProperty(p)&&((m=l[p])?"xmlns"!==m&&(d+=" xmlns:"+l[p]+'="'+p+'"'):d+=' xmlns="'+p+'"');b+=d+(q+">")}if(f===NodeFilter.FILTER_ACCEPT||f===NodeFilter.FILTER_SKIP){for(f=h.firstChild;f;)b+=k(a,f),f=f.nextSibling;h.nodeValue&&(b+=n(h.nodeValue))}e&&(b+="</"+
e+">",a.pop());return b}var c=this;this.filter=null;this.writeToString=function(a,c){if(!a)return"";var b=new m(c);return k(b,a)}};
// Input 21
xmldom.RelaxNGParser=function(){function m(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function n(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return n({name:a.name,e:[b].concat(a.e.slice(2))})}function k(a){a=a.split(":",2);var b="",c;1===a.length?a=["",a[0]]:b=a[0];for(c in f)f[c]===b&&(a[0]=c);return a}function c(a,b){for(var l=0,f,g,e=a.name;a.e&&l<a.e.length;)if(f=
a.e[l],"ref"===f.name){g=b[f.a.name];if(!g)throw f.a.name+" was not defined.";f=a.e.slice(l+1);a.e=a.e.slice(0,l);a.e=a.e.concat(g.e);a.e=a.e.concat(f)}else l+=1,c(f,b);f=a.e;"choice"!==e||f&&f[1]&&"empty"!==f[1].name||(f&&f[0]&&"empty"!==f[0].name?(f[1]=f[0],f[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===e||"interleave"===e)"empty"===f[0].name?"empty"===f[1].name?(delete a.e,a.name="empty"):(e=a.name=f[1].name,a.names=f[1].names,f=a.e=f[1].e):"empty"===f[1].name&&(e=a.name=f[0].name,
a.names=f[0].names,f=a.e=f[0].e);"oneOrMore"===e&&"empty"===f[0].name&&(delete a.e,a.name="empty");if("attribute"===e){g=a.names?a.names.length:0;for(var h,m=[],u=[],l=0;l<g;l+=1)h=k(a.names[l]),u[l]=h[0],m[l]=h[1];a.localnames=m;a.namespaces=u}"interleave"===e&&("interleave"===f[0].name?a.e="interleave"===f[1].name?f[0].e.concat(f[1].e):[f[1]].concat(f[0].e):"interleave"===f[1].name&&(a.e=[f[0]].concat(f[1].e)))}function a(b,c){for(var l=0,f;b.e&&l<b.e.length;)f=b.e[l],"elementref"===f.name?(f.id=
f.id||0,b.e[l]=c[f.id]):"element"!==f.name&&a(f,c),l+=1}var h=this,b,f={"http://www.w3.org/XML/1998/namespace":"xml"},e;e=function(a,b,c){var h=[],g,q,m=a.localName,w=[];g=a.attributes;var u=m,A=w,x={},r,v;for(r=0;r<g.length;r+=1)if(v=g.item(r),v.namespaceURI)"http://www.w3.org/2000/xmlns/"===v.namespaceURI&&(f[v.value]=v.localName);else{"name"!==v.localName||"element"!==u&&"attribute"!==u||A.push(v.value);if("name"===v.localName||"combine"===v.localName||"type"===v.localName){var D=v,G;G=v.value;
G=G.replace(/^\s\s*/,"");for(var y=/\s/,P=G.length-1;y.test(G.charAt(P));)P-=1;G=G.slice(0,P+1);D.value=G}x[v.localName]=v.value}g=x;g.combine=g.combine||void 0;a=a.firstChild;u=h;A=w;for(x="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(r=e(a,b,u))"name"===r.name?A.push(f[r.a.ns]+":"+r.text):"choice"===r.name&&(r.names&&r.names.length)&&(A=A.concat(r.names),delete r.names),u.push(r)}else a.nodeType===Node.TEXT_NODE&&(x+=a.nodeValue);a=a.nextSibling}a=
x;"value"!==m&&"param"!==m&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===m&&void 0===g.type&&(g.type="token",g.datatypeLibrary="");"attribute"!==m&&"element"!==m||void 0===g.name||(q=k(g.name),h=[{name:"name",text:q[1],a:{ns:q[0]}}].concat(h),delete g.name);"name"===m||"nsName"===m||"value"===m?void 0===g.ns&&(g.ns=""):delete g.ns;"name"===m&&(q=k(a),g.ns=q[0],a=q[1]);1<h.length&&("define"===m||"oneOrMore"===m||"zeroOrMore"===m||"optional"===m||"list"===m||"mixed"===m)&&(h=[{name:"group",e:n({name:"group",
e:h}).e}]);2<h.length&&"element"===m&&(h=[h[0]].concat({name:"group",e:n({name:"group",e:h.slice(1)}).e}));1===h.length&&"attribute"===m&&h.push({name:"text",text:a});1!==h.length||"choice"!==m&&"group"!==m&&"interleave"!==m?2<h.length&&("choice"===m||"group"===m||"interleave"===m)&&(h=n({name:m,e:h}).e):(m=h[0].name,w=h[0].names,g=h[0].a,a=h[0].text,h=h[0].e);"mixed"===m&&(m="interleave",h=[h[0],{name:"text"}]);"optional"===m&&(m="choice",h=[h[0],{name:"empty"}]);"zeroOrMore"===m&&(m="choice",h=
[{name:"oneOrMore",e:[h[0]]},{name:"empty"}]);if("define"===m&&g.combine){a:{u=g.combine;A=g.name;x=h;for(r=0;c&&r<c.length;r+=1)if(v=c[r],"define"===v.name&&v.a&&v.a.name===A){v.e=[{name:u,e:v.e.concat(x)}];c=v;break a}c=null}if(c)return}c={name:m};h&&0<h.length&&(c.e=h);for(q in g)if(g.hasOwnProperty(q)){c.a=g;break}void 0!==a&&(c.text=a);w&&0<w.length&&(c.names=w);"element"===m&&(c.id=b.length,b.push(c),c={name:"elementref",id:c.id});return c};this.parseRelaxNGDOM=function(d,k){var l=[],p=e(d&&
d.documentElement,l,void 0),g,q,s={};for(g=0;g<p.e.length;g+=1)q=p.e[g],"define"===q.name?s[q.a.name]=q:"start"===q.name&&(b=q);if(!b)return[new m("No Relax NG start element was found.")];c(b,s);for(g in s)s.hasOwnProperty(g)&&c(s[g],s);for(g=0;g<l.length;g+=1)c(l[g],s);k&&(h.rootPattern=k(b.e[0],l));a(b,l);for(g=0;g<l.length;g+=1)a(l[g],l);h.start=b;h.elements=l;h.nsmap=f;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function m(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function n(a,b){return function(){var d={},c=0;return function(g){var f=g.hash||g.toString(),l;l=d[f];if(void 0!==l)return l;d[f]=l=b(g);l.hash=a+c.toString();c+=1;return l}}()}function k(a){return function(){var b={};return function(d){var c,g;g=b[d.localName];if(void 0===g)b[d.localName]=g={};else if(c=g[d.namespaceURI],void 0!==c)return c;return g[d.namespaceURI]=c=a(d)}}()}function c(a,
b,d){return function(){var c={},g=0;return function(f,l){var e=b&&b(f,l),h,q;if(void 0!==e)return e;e=f.hash||f.toString();h=l.hash||l.toString();q=c[e];if(void 0===q)c[e]=q={};else if(e=q[h],void 0!==e)return e;q[h]=e=d(f,l);e.hash=a+g.toString();g+=1;return e}}()}function a(b,d){"choice"===d.p1.type?a(b,d.p1):b[d.p1.hash]=d.p1;"choice"===d.p2.type?a(b,d.p2):b[d.p2.hash]=d.p2}function h(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return r},startTagOpenDeriv:function(d){return a.contains(d)?
g(b,v):r},attDeriv:function(){return r},startTagCloseDeriv:function(){return this}}}function b(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return v}}}function f(a,b,c,g){if(b===r)return r;if(g>=c.length)return b;0===g&&(g=0);for(var l=c.item(g);l.namespaceURI===d;){g+=1;if(g>=c.length)return b;l=c.item(g)}return l=f(a,b.attDeriv(a,c.item(g)),c,g+1)}function e(a,b,d){d.e[0].a?(a.push(d.e[0].text),b.push(d.e[0].a.ns)):e(a,b,d.e[0]);d.e[1].a?(a.push(d.e[1].text),b.push(d.e[1].a.ns)):
e(a,b,d.e[1])}var d="http://www.w3.org/2000/xmlns/",t,l,p,g,q,s,w,u,A,x,r={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return r},startTagOpenDeriv:function(){return r},attDeriv:function(){return r},startTagCloseDeriv:function(){return r},endTagDeriv:function(){return r}},v={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return r},startTagOpenDeriv:function(){return r},attDeriv:function(){return r},startTagCloseDeriv:function(){return v},endTagDeriv:function(){return r}},
D={type:"text",nullable:!0,hash:"text",textDeriv:function(){return D},startTagOpenDeriv:function(){return r},attDeriv:function(){return r},startTagCloseDeriv:function(){return D},endTagDeriv:function(){return r}},G,y,P;t=c("choice",function(a,b){if(a===r)return b;if(b===r||a===b)return a},function(b,d){var c={},g;a(c,{p1:b,p2:d});d=b=void 0;for(g in c)c.hasOwnProperty(g)&&(void 0===b?b=c[g]:d=void 0===d?c[g]:t(d,c[g]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(d,c){return t(a.textDeriv(d,c),b.textDeriv(d,c))},startTagOpenDeriv:k(function(d){return t(a.startTagOpenDeriv(d),b.startTagOpenDeriv(d))}),attDeriv:function(d,c){return t(a.attDeriv(d,c),b.attDeriv(d,c))},startTagCloseDeriv:m(function(){return t(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:m(function(){return t(a.endTagDeriv(),b.endTagDeriv())})}}(b,d)});l=function(a,b,d){return function(){var c={},g=0;return function(f,l){var e=b&&b(f,l),h,q;if(void 0!==e)return e;
e=f.hash||f.toString();h=l.hash||l.toString();e<h&&(q=e,e=h,h=q,q=f,f=l,l=q);q=c[e];if(void 0===q)c[e]=q={};else if(e=q[h],void 0!==e)return e;q[h]=e=d(f,l);e.hash=a+g.toString();g+=1;return e}}()}("interleave",function(a,b){if(a===r||b===r)return r;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(d,c){return t(l(a.textDeriv(d,c),b),l(a,b.textDeriv(d,c)))},startTagOpenDeriv:k(function(d){return t(G(function(a){return l(a,
b)},a.startTagOpenDeriv(d)),G(function(b){return l(a,b)},b.startTagOpenDeriv(d)))}),attDeriv:function(d,c){return t(l(a.attDeriv(d,c),b),l(a,b.attDeriv(d,c)))},startTagCloseDeriv:m(function(){return l(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});p=c("group",function(a,b){if(a===r||b===r)return r;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(d,c){var g=p(a.textDeriv(d,c),b);return a.nullable?t(g,b.textDeriv(d,
c)):g},startTagOpenDeriv:function(d){var c=G(function(a){return p(a,b)},a.startTagOpenDeriv(d));return a.nullable?t(c,b.startTagOpenDeriv(d)):c},attDeriv:function(d,c){return t(p(a.attDeriv(d,c),b),p(a,b.attDeriv(d,c)))},startTagCloseDeriv:m(function(){return p(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});g=c("after",function(a,b){if(a===r||b===r)return r},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(d,c){return g(a.textDeriv(d,c),b)},startTagOpenDeriv:k(function(d){return G(function(a){return g(a,
b)},a.startTagOpenDeriv(d))}),attDeriv:function(d,c){return g(a.attDeriv(d,c),b)},startTagCloseDeriv:m(function(){return g(a.startTagCloseDeriv(),b)}),endTagDeriv:m(function(){return a.nullable?b:r})}});q=n("oneormore",function(a){return a===r?r:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,d){return p(a.textDeriv(b,d),t(this,v))},startTagOpenDeriv:function(b){var d=this;return G(function(a){return p(a,t(d,v))},a.startTagOpenDeriv(b))},attDeriv:function(b,d){return p(a.attDeriv(b,
d),t(this,v))},startTagCloseDeriv:m(function(){return q(a.startTagCloseDeriv())})}});w=c("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(d,c){return a.contains(c)&&(b.nullable&&/^\s+$/.test(c.nodeValue)||b.textDeriv(d,c.nodeValue).nullable)?v:r},startTagCloseDeriv:function(){return r}}});s=n("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,d){return d===a?v:r},attDeriv:function(){return r},startTagCloseDeriv:function(){return this}}});
A=n("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return v},attDeriv:function(){return r},startTagCloseDeriv:function(){return this}}});G=function R(a,b){return"after"===b.type?g(b.p1,a(b.p2)):"choice"===b.type?t(R(a,b.p1),R(a,b.p2)):b};y=function(a,b,d){var c=d.currentNode;b=b.startTagOpenDeriv(c);b=f(a,b,c.attributes,0);var g=b=b.startTagCloseDeriv(),c=d.currentNode;b=d.firstChild();for(var l=[],e;b;)b.nodeType===Node.ELEMENT_NODE?l.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||l.push(b.nodeValue),b=d.nextSibling();0===l.length&&(l=[""]);e=g;for(g=0;e!==r&&g<l.length;g+=1)b=l[g],"string"===typeof b?e=/^\s*$/.test(b)?t(e,e.textDeriv(a,b)):e.textDeriv(a,b):(d.currentNode=b,e=y(a,e,d));d.currentNode=c;return b=e.endTagDeriv()};u=function(a){var b,d,c;if("name"===a.name)b=a.text,d=a.a.ns,a={name:b,ns:d,hash:"{"+d+"}"+b,contains:function(a){return a.namespaceURI===d&&a.localName===b}};else if("choice"===a.name){b=[];d=[];e(b,d,a);a="";for(c=0;c<b.length;c+=
1)a+="{"+d[c]+"}"+b[c]+",";a={hash:a,contains:function(a){var c;for(c=0;c<b.length;c+=1)if(b[c]===a.localName&&d[c]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};x=function E(a,d){var c,g;if("elementref"===a.name){c=a.id||0;a=d[c];if(void 0!==a.name){var f=a;c=d[f.id]={hash:"element"+f.id.toString()};f=h(u(f.e[0]),x(f.e[1],d));for(g in f)f.hasOwnProperty(g)&&(c[g]=f[g]);return c}return a}switch(a.name){case "empty":return v;case "notAllowed":return r;
case "text":return D;case "choice":return t(E(a.e[0],d),E(a.e[1],d));case "interleave":c=E(a.e[0],d);for(g=1;g<a.e.length;g+=1)c=l(c,E(a.e[g],d));return c;case "group":return p(E(a.e[0],d),E(a.e[1],d));case "oneOrMore":return q(E(a.e[0],d));case "attribute":return w(u(a.e[0]),E(a.e[1],d));case "value":return s(a.text);case "data":return c=a.a&&a.a.type,void 0===c&&(c=""),A(c);case "list":return b()}throw"No support for "+a.name;};this.makePattern=function(a,b){var d={},c;for(c in b)b.hasOwnProperty(c)&&
(d[c]=b[c]);return c=x(a,d)};this.validate=function(a,b){var d;a.currentNode=a.root;d=y(null,P,a);d.nullable?b(null):(runtime.log("Error in Relax NG validation: "+d),b(["Error in Relax NG validation: "+d]))};this.init=function(a){P=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function m(a,c){this.message=function(){c&&(a+=c.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=c.nodeName,c.nodeValue&&(a+=" with value '"+c.nodeValue+"'"),a+=".");return a}}function n(b,c,e,d){return"empty"===b.name?null:a(b,c,e,d)}function k(a,c){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var e=c.currentNode,d=e?e.nodeType:0,k=null;d>Node.ELEMENT_NODE;){if(d!==Node.COMMENT_NODE&&(d!==Node.TEXT_NODE||!/^\s+$/.test(c.currentNode.nodeValue)))return[new m("Not allowed node of type "+
d+".")];d=(e=c.nextSibling())?e.nodeType:0}if(!e)return[new m("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(h[e.namespaceURI]+":"+e.localName))return[new m("Found "+e.nodeName+" instead of "+a.names+".",e)];if(c.firstChild()){for(k=n(a.e[1],c,e);c.nextSibling();)if(d=c.currentNode.nodeType,!(c.currentNode&&c.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(c.currentNode.nodeValue)||d===Node.COMMENT_NODE))return[new m("Spurious content.",c.currentNode)];if(c.parentNode()!==e)return[new m("Implementation error.")]}else k=
n(a.e[1],c,e);c.nextSibling();return k}var c,a,h;a=function(b,c,e,d){var h=b.name,l=null;if("text"===h)a:{for(var p=(b=c.currentNode)?b.nodeType:0;b!==e&&3!==p;){if(1===p){l=[new m("Element not allowed here.",b)];break a}p=(b=c.nextSibling())?b.nodeType:0}c.nextSibling();l=null}else if("data"===h)l=null;else if("value"===h)d!==b.text&&(l=[new m("Wrong value, should be '"+b.text+"', not '"+d+"'",e)]);else if("list"===h)l=null;else if("attribute"===h)a:{if(2!==b.e.length)throw"Attribute with wrong # of elements: "+
b.e.length;h=b.localnames.length;for(l=0;l<h;l+=1){d=e.getAttributeNS(b.namespaces[l],b.localnames[l]);""!==d||e.hasAttributeNS(b.namespaces[l],b.localnames[l])||(d=void 0);if(void 0!==p&&void 0!==d){l=[new m("Attribute defined too often.",e)];break a}p=d}l=void 0===p?[new m("Attribute not found: "+b.names,e)]:n(b.e[1],c,e,p)}else if("element"===h)l=k(b,c);else if("oneOrMore"===h){d=0;do p=c.currentNode,h=a(b.e[0],c,e),d+=1;while(!h&&p!==c.currentNode);1<d?(c.currentNode=p,l=null):l=h}else if("choice"===
h){if(2!==b.e.length)throw"Choice with wrong # of options: "+b.e.length;p=c.currentNode;if("empty"===b.e[0].name){if(h=a(b.e[1],c,e,d))c.currentNode=p;l=null}else{if(h=n(b.e[0],c,e,d))c.currentNode=p,h=a(b.e[1],c,e,d);l=h}}else if("group"===h){if(2!==b.e.length)throw"Group with wrong # of members: "+b.e.length;l=a(b.e[0],c,e)||a(b.e[1],c,e)}else if("interleave"===h)a:{p=b.e.length;d=[p];for(var g=p,q,s,w,u;0<g;){q=0;s=c.currentNode;for(l=0;l<p;l+=1)w=c.currentNode,!0!==d[l]&&d[l]!==w&&(u=b.e[l],(h=
a(u,c,e))?(c.currentNode=w,void 0===d[l]&&(d[l]=!1)):w===c.currentNode||"oneOrMore"===u.name||"choice"===u.name&&("oneOrMore"===u.e[0].name||"oneOrMore"===u.e[1].name)?(q+=1,d[l]=w):(q+=1,d[l]=!0));if(s===c.currentNode&&q===g){l=null;break a}if(0===q){for(l=0;l<p;l+=1)if(!1===d[l]){l=[new m("Interleave does not match.",e)];break a}l=null;break a}for(l=g=0;l<p;l+=1)!0!==d[l]&&(g+=1)}l=null}else throw h+" not allowed in nonEmptyPattern.";return l};this.validate=function(a,f){a.currentNode=a.root;var e=
n(c.e[0],a,a.root);f(e)};this.init=function(a,f){c=a;h=f}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function m(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function n(a){for(var b=[],c=0,d=a.length,f;c<d;){var e=a,h=d,k=b,n="",r=[],v=e.indexOf("[",c),D=e.indexOf("/",c),G=e.indexOf("=",c);m(D,v,G)?(n=e.substring(c,D),c=D+1):m(v,D,G)?(n=e.substring(c,v),c=t(e,v,r)):m(G,D,v)?(n=e.substring(c,G),c=G):(n=e.substring(c,h),c=h);k.push({location:n,predicates:r});if(c<d&&"="===a[c]){f=a.substring(c+1,d);if(2<f.length&&("'"===f[0]||'"'===f[0]))f=f.slice(1,f.length-1);else try{f=
parseInt(f,10)}catch(y){}c=d}}return{steps:b,value:f}}function k(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function c(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function a(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function h(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function b(a,b,c){b=b.split(":",2);var d=c(b[0]),f=b[1];return new h(a,function(a){return a.localName===f&&a.namespaceURI===d})}function f(a,b,c){var f=new k,e=d(f,b,c),m=b.value;return void 0===m?new h(a,function(a){f.setNode(a);
e.reset();return e.next()}):new h(a,function(a){f.setNode(a);e.reset();return(a=e.next())&&a.nodeValue===m})}function e(a,b,c){var f=a.ownerDocument,e=[],h=null;if(f&&f.evaluate)for(c=f.evaluate(b,a,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),h=c.iterateNext();null!==h;)h.nodeType===Node.ELEMENT_NODE&&e.push(h),h=c.iterateNext();else{e=new k;e.setNode(a);a=n(b);e=d(e,a,c);a=[];for(c=e.next();c;)a.push(c),c=e.next();e=a}return e}var d,t;t=function(a,b,c){for(var d=b,f=a.length,e=0;d<f;)"]"===
a[d]?(e-=1,0>=e&&c.push(n(a.substring(b,d)))):"["===a[d]&&(0>=e&&(b=d+1),e+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};d=function(d,e,g){var h,k,m,u;for(h=0;h<e.steps.length;h+=1)for(m=e.steps[h],k=m.location,""===k?d=new a(d,!1):"@"===k[0]?(u=k.slice(1).split(":",2),d=new c(d,g(u[0]),u[1])):"."!==k&&(d=new a(d,!1),-1!==k.indexOf(":")&&(d=b(d,k,g))),k=0;k<m.predicates.length;k+=1)u=m.predicates[k],d=f(d,u,g);return d};xmldom.XPath=
function(){this.getODFElementsWithXPath=e};return xmldom.XPath}();
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
gui.AnnotationViewManager=function(m,n,k){function c(a){var b=a.node,c=a.end;a=e.createRange();c&&(a.setStart(b,b.childNodes.length),a.setEnd(c,0),c=d.getTextNodes(a,!1),c.forEach(function(a){var c=e.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function a(a){var b=m.getSizer();a?(k.style.display="inline-block",b.style.paddingRight=t.getComputedStyle(k).width):
(k.style.display="none",b.style.paddingRight=0);m.refreshSize()}function h(){f.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function b(){var a;for(a=0;a<f.length;a+=1){var b=f[a],c=b.node.parentNode,d=c.nextSibling,h=d.nextSibling,n=c.parentNode,u=0,A=f[f.indexOf(b)-1],x=void 0,b=b.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],u=void 0,u=m.getZoomLevel();c.style.left=(k.getBoundingClientRect().left-n.getBoundingClientRect().left)/
u+"px";c.style.width=k.getBoundingClientRect().width/u+"px";d.style.width=parseFloat(c.style.left)-30+"px";A&&(x=A.node.parentNode.getBoundingClientRect(),20>=(n.getBoundingClientRect().top-x.bottom)/u?c.style.top=Math.abs(n.getBoundingClientRect().top-x.bottom)/u+20+"px":c.style.top="0px");h.style.left=d.getBoundingClientRect().width/u+"px";var d=h.style,n=h.getBoundingClientRect().left/u,A=h.getBoundingClientRect().top/u,x=c.getBoundingClientRect().left/u,r=c.getBoundingClientRect().top/u,v=0,D=
0,v=x-n,v=v*v,D=r-A,D=D*D,n=Math.sqrt(v+D);d.width=n+"px";u=Math.asin((c.getBoundingClientRect().top-h.getBoundingClientRect().top)/(u*parseFloat(h.style.width)));h.style.transform="rotate("+u+"rad)";h.style.MozTransform="rotate("+u+"rad)";h.style.WebkitTransform="rotate("+u+"rad)";h.style.msTransform="rotate("+u+"rad)";b&&(u=t.getComputedStyle(b,":before").content)&&"none"!==u&&(u=u.substring(1,u.length-1),b.firstChild?b.firstChild.nodeValue=u:b.appendChild(e.createTextNode(u)))}}var f=[],e=n.ownerDocument,
d=new odf.OdfUtils,t=runtime.getWindow();runtime.assert(Boolean(t),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=b;this.addAnnotation=function(d){a(!0);f.push({node:d.node,end:d.end});h();var k=e.createElement("div"),g=e.createElement("div"),m=e.createElement("div"),n=e.createElement("div"),w=e.createElement("div"),u=d.node;k.className="annotationWrapper";u.parentNode.insertBefore(k,u);g.className="annotationNote";g.appendChild(u);w.className=
"annotationRemoveButton";g.appendChild(w);m.className="annotationConnector horizontal";n.className="annotationConnector angular";k.appendChild(g);k.appendChild(m);k.appendChild(n);d.end&&c(d);b()};this.forgetAnnotations=function(){for(;f.length;){var b=f[0],c=f.indexOf(b),d=b.node,h=d.parentNode.parentNode;"div"===h.localName&&(h.parentNode.insertBefore(d,h),h.parentNode.removeChild(h));b=b.node.getAttributeNS(odf.Namespaces.officens,"name");b=e.querySelectorAll('span.annotationHighlight[annotation="'+
b+'"]');h=d=void 0;for(d=0;d<b.length;d+=1){for(h=b[d];h.firstChild;)h.parentNode.insertBefore(h.firstChild,h);h.parentNode.removeChild(h)}-1!==c&&f.splice(c,1);0===f.length&&a(!1)}}};
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
odf.OdfNodeFilter=function(){this.acceptNode=function(m){return"http://www.w3.org/1999/xhtml"===m.namespaceURI?NodeFilter.FILTER_SKIP:m.namespaceURI&&m.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
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
odf.Namespaces=function(){function m(c){return n[c]||null}var n={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",dc:"http://purl.org/dc/elements/1.1/",webodf:"urn:webodf"},k;m.lookupNamespaceURI=m;k=function(){};k.forEachPrefix=function(c){for(var a in n)n.hasOwnProperty(a)&&c(a,n[a])};k.resolvePrefix=m;k.namespaceMap=n;k.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";k.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
k.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";k.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";k.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";k.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";k.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";k.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";k.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";k.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
k.xlinkns="http://www.w3.org/1999/xlink";k.xmlns="http://www.w3.org/XML/1998/namespace";k.dcns="http://purl.org/dc/elements/1.1/";k.webodfns="urn:webodf";return k}();
// Input 28
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function m(a,b){for(var c=p[a.localName],d=c&&c[a.namespaceURI],g=d?d.length:0,e,c=0;c<g;c+=1)(e=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,b+e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,m(d,b)),c=c.nextSibling}function n(a,b){for(var c=p[a.localName],d=c&&c[a.namespaceURI],g=d?d.length:0,e,c=0;c<g;c+=1)if(e=a.getAttributeNS(d[c].ns,d[c].localname))e=e.replace(b,""),a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,
e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,n(d,b)),c=c.nextSibling}function k(a,b){var c=p[a.localName],d=(c=c&&c[a.namespaceURI])?c.length:0,g,e,f;for(f=0;f<d;f+=1)if(g=a.getAttributeNS(c[f].ns,c[f].localname))b=b||{},e=c[f].keyname,e=b[e]=b[e]||{},e[g]=1;return b}function c(a,b){var d,g;k(a,b);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(g=d,c(g,b)),d=d.nextSibling}function a(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function h(b,c,d){var g=b+'"'+
c,e=d[g];e||(e=d[g]=new a(g,b,c));return e}function b(a,c,g){var e=p[a.localName],f=(e=e&&e[a.namespaceURI])?e.length:0,l=a.getAttributeNS(d,"name"),k=a.getAttributeNS(d,"family"),m;l&&k&&(c=h(l,k,g));if(c)for(l=0;l<f;l+=1)if(k=a.getAttributeNS(e[l].ns,e[l].localname))m=e[l].keyname,k=h(k,m,g),c.requires[k.key]=k;for(l=a.firstChild;l;)l.nodeType===Node.ELEMENT_NODE&&(a=l,b(a,c,g)),l=l.nextSibling;return g}function f(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){f(a.requires[c],
b)})}function e(a,c){var d=b(a,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&f(a,c)})}var d="urn:oasis:names:tc:opendocument:xmlns:style:1.0",t={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:","urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},l={text:[{ens:d,
en:"tab-stop",ans:d,a:"leader-text-style"},{ens:d,en:"drop-cap",ans:d,a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"notes-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"citation-body-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"notes-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"citation-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"a",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"alphabetical-index",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"linenumbering-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list-level-style-number",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"ruby-text",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"span",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"a",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"visited-style-name"},{ens:d,en:"text-properties",ans:d,a:"text-line-through-text-style"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"alphabetical-index-source",
ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"main-entry-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-bibliography",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-chapter",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-link-end",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-link-start",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-page-number",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-span",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"index-entry-tab-stop",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-text",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-title-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list-level-style-bullet",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"outline-level-style",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"}],paragraph:[{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"caption",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"circle",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
en:"connector",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"control",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"custom-shape",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"ellipse",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"frame",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"line",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"measure",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
en:"path",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polygon",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polyline",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"rect",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"regular-polygon",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",en:"annotation",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",en:"column",ans:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",a:"text-style-name"},{ens:d,en:"style",ans:d,a:"next-style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"body",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"even-columns",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"even-rows",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
en:"first-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"first-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"last-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"last-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"odd-columns",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"odd-rows",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"notes-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"default-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"alphabetical-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"bibliography-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"h",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"illustration-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-source-style",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"object-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"p",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"table-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-of-content-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-index-entry-template",
ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:d,en:"page-layout-properties",ans:d,a:"register-truth-ref-style-name"}],chart:[{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"axis",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"chart",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"data-label",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
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
en:"notes",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:d,en:"handout-master",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:d,en:"master-page",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"}],"list-style":[{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"numbered-paragraph",
ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list-item",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-override"},{ens:d,en:"style",ans:d,a:"list-style-name"}],data:[{ens:d,en:"style",ans:d,a:"data-style-name"},{ens:d,en:"style",ans:d,a:"percentage-data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",en:"date-time-decl",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"creation-date",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"creation-time",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"database-display",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"date",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"editing-duration",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"expression",
ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"meta-field",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"modification-date",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"modification-time",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"print-date",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"print-time",ans:d,
a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-formula",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"time",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-defined",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-field-get",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-field-input",ans:d,a:"data-style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-get",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-input",ans:d,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-set",ans:d,a:"data-style-name"}],"page-layout":[{ens:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",en:"notes",ans:d,a:"page-layout-name"},{ens:d,en:"handout-master",ans:d,a:"page-layout-name"},{ens:d,en:"master-page",ans:d,
a:"page-layout-name"}]},p,g=new xmldom.XPath;this.UsedStyleList=function(a,b){var g={};this.uses=function(a){var b=a.localName,c=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(d,"name");a="style"===b?a.getAttributeNS(d,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":b;return(a=g[a])?0<a[c]:!1};c(a,g);b&&e(b,g)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),e=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,
"family");return g.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,c){var g;if(a){for(g=a.firstChild;g;){if(g.nodeType===Node.ELEMENT_NODE){var e=g,f=b,h=e.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),l=void 0;h?l="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(h=e.getAttributeNS(d,"name"))&&(l=d);l&&e.setAttributeNS(l,t[l]+"name",f+h)}g=g.nextSibling}m(a,b);c&&m(c,
b)}};this.removePrefixFromStyleNames=function(a,b,c){var g=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var e=b,f=g,h=e.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),l=void 0;h?l="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(h=e.getAttributeNS(d,"name"))&&(l=d);l&&(h=h.replace(f,""),e.setAttributeNS(l,t[l]+"name",h))}b=b.nextSibling}n(a,g);c&&n(c,g)}};this.determineStylesForNode=k;p=function(a){var b,c,d,g,e,f={},h;for(b in a)if(a.hasOwnProperty(b))for(g=
a[b],d=g.length,c=0;c<d;c+=1)e=g[c],h=f[e.en]=f[e.en]||{},h=h[e.ens]=h[e.ens]||[],h.push({ns:e.ans,localname:e.a,keyname:b});return f}(l)};
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
odf.OdfUtils=function(){function m(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===w}function n(a){for(;a&&!m(a);)a=a.parentNode;return a}function k(a){return/^[ \t\r\n]+$/.test(a)}function c(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===w||"span"===b&&"annotationHighlight"===a.className?!0:!1}function a(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===w?d="s"===b||"tab"===b||"line-break"===b:c===u&&(d="frame"===b&&"as-char"===a.getAttributeNS(w,
"anchor-type")));return d}function h(a){for(;null!==a.firstChild&&c(a);)a=a.firstChild;return a}function b(a){for(;null!==a.lastChild&&c(a);)a=a.lastChild;return a}function f(a){for(;!m(a)&&null===a.previousSibling;)a=a.parentNode;return m(a)?null:b(a.previousSibling)}function e(a){for(;!m(a)&&null===a.nextSibling;)a=a.parentNode;return m(a)?null:h(a.nextSibling)}function d(b){for(var c=!1;b;)if(b.nodeType===Node.TEXT_NODE)if(0===b.length)b=f(b);else return!k(b.data.substr(b.length-1,1));else a(b)?
(c=!0,b=null):b=f(b);return c}function t(b){var c=!1;for(b=b&&h(b);b;){if(b.nodeType===Node.TEXT_NODE&&0<b.length&&!k(b.data)){c=!0;break}if(a(b)){c=!0;break}b=e(b)}return c}function l(a,b){return k(a.data.substr(b))?!t(e(a)):!1}function p(b,c){var g=b.data,e;if(!k(g[c])||a(b.parentNode))return!1;0<c?k(g[c-1])||(e=!0):d(f(b))&&(e=!0);return!0===e?l(b,c)?!1:!0:!1}function g(a){return(a=/-?([0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function q(a){return(a=g(a))&&"%"!==a.unit?null:a}function s(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var w=
"urn:oasis:names:tc:opendocument:xmlns:text:1.0",u="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",A=/^\s*$/,x=new core.DomUtils;this.isParagraph=m;this.getParagraphElement=n;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===w&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===w};this.isODFWhitespace=k;this.isGroupingElement=c;this.isCharacterElement=a;this.firstChild=
h;this.lastChild=b;this.previousNode=f;this.nextNode=e;this.scanLeftForNonWhitespace=d;this.lookLeftForCharacter=function(b){var c;c=0;b.nodeType===Node.TEXT_NODE&&0<b.length?(c=b.data,c=k(c.substr(c.length-1,1))?1===c.length?d(f(b))?2:0:k(c.substr(c.length-2,1))?0:2:1):a(b)&&(c=1);return c};this.lookRightForCharacter=function(b){var c=!1;b&&b.nodeType===Node.TEXT_NODE&&0<b.length?c=!k(b.data.substr(0,1)):a(b)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(c){var d=!1;for(c=c&&b(c);c;){if(c.nodeType===
Node.TEXT_NODE&&0<c.length&&!k(c.data)){d=!0;break}if(a(c)){d=!0;break}c=f(c)}return d};this.scanRightForAnyCharacter=t;this.isTrailingWhitespace=l;this.isSignificantWhitespace=p;this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&A.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=g;this.parseFoFontSize=function(a){var b;b=(b=g(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||q(a)};this.parseFoLineHeight=function(a){var b;b=(b=g(a))&&(0>b.value||
"%"===b.unit)?null:b;return b||q(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,c=[];for(b.nodeType===Node.ELEMENT_NODE&&(c=x.getElementsByTagNameNS(b,w,"p").concat(x.getElementsByTagNameNS(b,w,"h")));b&&!m(b);)b=b.parentNode;b&&c.push(b);return c.filter(function(b){return x.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),d;d=x.getNodesInRange(a,function(d){c.selectNodeContents(d);if(d.nodeType===Node.TEXT_NODE){if(b&&
x.rangesIntersect(a,c)||x.containsRange(a,c))return Boolean(n(d)&&(!k(d.textContent)||p(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(x.rangesIntersect(a,c)&&s(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return d};this.getTextElements=function(b,d){var g=b.startContainer.ownerDocument.createRange(),e;e=x.getNodesInRange(b,function(e){var f=e.nodeType;g.selectNodeContents(e);if(f===Node.TEXT_NODE){if(x.containsRange(b,g)&&(d||Boolean(n(e)&&(!k(e.textContent)||
p(e,0)))))return NodeFilter.FILTER_ACCEPT}else if(a(e)){if(x.containsRange(b,g))return NodeFilter.FILTER_ACCEPT}else if(s(e)||c(e))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});g.detach();return e};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),d;d=x.getNodesInRange(a,function(d){b.selectNodeContents(d);if(m(d)){if(x.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(s(d)||c(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});
b.detach();return d}};
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
odf.TextSerializer=function(){function m(c){var a="",h=n.filter?n.filter.acceptNode(c):NodeFilter.FILTER_ACCEPT,b=c.nodeType,f;if(h===NodeFilter.FILTER_ACCEPT||h===NodeFilter.FILTER_SKIP)for(f=c.firstChild;f;)a+=m(f),f=f.nextSibling;h===NodeFilter.FILTER_ACCEPT&&(b===Node.ELEMENT_NODE&&k.isParagraph(c)?a+="\n":b===Node.TEXT_NODE&&c.textContent&&(a+=c.textContent));return a}var n=this,k=new odf.OdfUtils;this.filter=null;this.writeToString=function(c){return c?m(c):""}};
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
odf.TextStyleApplicator=function(m,n,k){function c(a){function b(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(d){return b(a[d],c[d])}):a===c}this.isStyleApplied=function(c){c=n.getAppliedStylesForElement(c);return b(a,c)}}function a(a){var c={};this.applyStyleToContainer=function(h){var p;p=h.getAttributeNS(b,"style-name");var g=h.ownerDocument;p=p||"";if(!c.hasOwnProperty(p)){var q=p,s=p,w;s?(w=n.getStyleElement(s,"text"),w.parentNode===k?g=w.cloneNode(!0):(g=
g.createElementNS(f,"style:style"),g.setAttributeNS(f,"style:parent-style-name",s),g.setAttributeNS(f,"style:family","text"),g.setAttributeNS(e,"scope","document-content"))):(g=g.createElementNS(f,"style:style"),g.setAttributeNS(f,"style:family","text"),g.setAttributeNS(e,"scope","document-content"));n.updateStyle(g,a,m);k.appendChild(g);c[q]=g}p=c[p].getAttributeNS(f,"name");h.setAttributeNS(b,"text:style-name",p)}}var h=new core.DomUtils,b=odf.Namespaces.textns,f=odf.Namespaces.stylens,e="urn:webodf:names:scope";
this.applyStyle=function(d,e,f){var k={},g,m,n,w;runtime.assert(f&&f["style:text-properties"],"applyStyle without any text properties");k["style:text-properties"]=f["style:text-properties"];n=new a(k);w=new c(k);d.forEach(function(a){g=w.isStyleApplied(a);if(!1===g){var c=a.ownerDocument,d=a.parentNode,f,l=a,k=new core.LoopWatchDog(1E3);"span"===d.localName&&d.namespaceURI===b?(a.previousSibling&&!h.rangeContainsNode(e,a.previousSibling)?(c=d.cloneNode(!1),d.parentNode.insertBefore(c,d.nextSibling)):
c=d,f=!0):(c=c.createElementNS(b,"text:span"),d.insertBefore(c,a),f=!1);for(;l&&(l===a||h.rangeContainsNode(e,l));)k.check(),d=l.nextSibling,l.parentNode!==c&&c.appendChild(l),l=d;if(l&&f)for(a=c.cloneNode(!1),c.parentNode.insertBefore(a,c.nextSibling);l;)k.check(),d=l.nextSibling,a.appendChild(l),l=d;m=c;n.applyStyleToContainer(m)}})}};
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
odf.Style2CSS=function(){function m(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==q||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===u&&"list-style"===a.localName?"list":a.namespaceURI!==q||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(q,"family"))(c=a.getAttributeNS&&a.getAttributeNS(q,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function n(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=n(a[c].derivedStyles,b)))return d;return null}function k(a,b,c){var d=b[a],e,g;d&&(e=d.getAttributeNS(q,"parent-style-name"),g=null,e&&(g=n(c,e),!g&&b[e]&&(k(e,b,c),g=b[e],b[e]=null)),g?(g.derivedStyles||(g.derivedStyles={}),g.derivedStyles[a]=d):c[a]=d)}function c(a,b){for(var c in a)a.hasOwnProperty(c)&&(k(c,a,b),a[c]=null)}function a(a,b){var c=r[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+v[a].join(d+","+c+"|")+d}function h(b,c,d){var e=[],g,f;e.push(a(b,c));for(g in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(g))for(f in c=h(b,g,d.derivedStyles[g]),c)c.hasOwnProperty(f)&&e.push(c[f]);return e}function b(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function f(a,b){var c="",d,e;for(d in b)if(b.hasOwnProperty(d)&&
(d=b[d],e=a.getAttributeNS(d[0],d[1]))){e=e.trim();if(L.hasOwnProperty(d[1])){var g=e.indexOf(" "),f=void 0,h=void 0;-1!==g?(f=e.substring(0,g),h=e.substring(g)):(f=e,h="");(f=aa.parseLength(f))&&("pt"===f.unit&&0.75>f.value)&&(e="0.75pt"+h)}d[2]&&(c+=d[2]+":"+e+";")}return c}function e(a){return(a=b(a,q,"text-properties"))?aa.parseFoFontSize(a.getAttributeNS(g,"font-size")):null}function d(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?
{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function t(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var e=c.getAttributeNS(u,"level"),g;c=aa.getFirstNonWhitespaceChild(c);c=aa.getFirstNonWhitespaceChild(c);var f;c&&(g=c.attributes,f=g["fo:text-indent"]?g["fo:text-indent"].value:void 0,g=g["fo:margin-left"]?g["fo:margin-left"].value:void 0);f||(f="-0.6cm");c="-"===f.charAt(0)?f.substring(1):"-"+f;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";
void 0!==g&&(g=e+"{margin-left:"+g+";}",a.insertRule(g,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+d+";";d+="counter-increment:list;";d+="margin-left:"+f+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(h){throw h;}}function l(a,c,k,m){if("list"===c)for(var n=m.firstChild,s,r;n;){if(n.namespaceURI===u)if(s=n,"list-level-style-number"===n.localName){var v=s;r=v.getAttributeNS(q,"num-format");var L=v.getAttributeNS(q,
"num-suffix"),C={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},v=v.getAttributeNS(q,"num-prefix")||"",v=C.hasOwnProperty(r)?v+(" counter(list, "+C[r]+")"):r?v+("'"+r+"';"):v+" ''";L&&(v+=" '"+L+"'");r="content: "+v+";";t(a,k,s,r)}else"list-level-style-image"===n.localName?(r="content: none;",t(a,k,s,r)):"list-level-style-bullet"===n.localName&&(r="content: '"+s.getAttributeNS(u,"bullet-char")+"';",t(a,k,s,r));n=n.nextSibling}else if("page"===c)if(L=s=k="",n=m.getElementsByTagNameNS(q,
"page-layout-properties")[0],s=n.parentNode.parentNode.parentNode.masterStyles,L="",k+=f(n,X),r=n.getElementsByTagNameNS(q,"background-image"),0<r.length&&(L=r.item(0).getAttributeNS(A,"href"))&&(k+="background-image: url('odfkit:"+L+"');",r=r.item(0),k+=f(r,G)),"presentation"===ea){if(s)for(r=s.getElementsByTagNameNS(q,"master-page"),C=0;C<r.length;C+=1)if(r[C].getAttributeNS(q,"page-layout-name")===n.parentNode.getAttributeNS(q,"name")){L=r[C].getAttributeNS(q,"name");s="draw|page[draw|master-page-name="+
L+"] {"+k+"}";L="office|body, draw|page[draw|master-page-name="+L+"] {"+f(n,oa)+" }";try{a.insertRule(s,a.cssRules.length),a.insertRule(L,a.cssRules.length)}catch(ka){throw ka;}}}else{if("text"===ea){s="office|text {"+k+"}";L="office|body {width: "+n.getAttributeNS(g,"page-width")+";}";try{a.insertRule(s,a.cssRules.length),a.insertRule(L,a.cssRules.length)}catch(ia){throw ia;}}}else{k=h(c,k,m).join(",");n="";if(s=b(m,q,"text-properties")){var C=s,T;r=T="";L=1;s=""+f(C,D);v=C.getAttributeNS(q,"text-underline-style");
"solid"===v&&(T+=" underline");v=C.getAttributeNS(q,"text-line-through-style");"solid"===v&&(T+=" line-through");T.length&&(s+="text-decoration:"+T+";");if(T=C.getAttributeNS(q,"font-name")||C.getAttributeNS(g,"font-family"))v=ra[T],s+="font-family: "+(v||T)+", sans-serif;";v=C.parentNode;if(C=e(v)){for(;v;){if(C=e(v)){if("%"!==C.unit){r="font-size: "+C.value*L+C.unit+";";break}L*=C.value/100}C=v;T=v="";v=null;"default-style"===C.localName?v=null:(v=C.getAttributeNS(q,"parent-style-name"),T=C.getAttributeNS(q,
"family"),v=S.getODFElementsWithXPath(O,v?"//style:*[@style:name='"+v+"'][@style:family='"+T+"']":"//style:default-style[@style:family='"+T+"']",odf.Namespaces.resolvePrefix)[0])}r||(r="font-size: "+parseFloat(V)*L+M.getUnits(V)+";");s+=r}n+=s}if(s=b(m,q,"paragraph-properties"))r=s,s=""+f(r,y),L=r.getElementsByTagNameNS(q,"background-image"),0<L.length&&(C=L.item(0).getAttributeNS(A,"href"))&&(s+="background-image: url('odfkit:"+C+"');",L=L.item(0),s+=f(L,G)),(r=r.getAttributeNS(g,"line-height"))&&
"normal"!==r&&(r=aa.parseFoLineHeight(r),s="%"!==r.unit?s+("line-height: "+r.value+r.unit+";"):s+("line-height: "+r.value/100+";")),n+=s;if(s=b(m,q,"graphic-properties"))C=s,s=""+f(C,P),r=C.getAttributeNS(p,"opacity"),L=C.getAttributeNS(p,"fill"),C=C.getAttributeNS(p,"fill-color"),"solid"===L||"hatch"===L?C&&"none"!==C?(r=isNaN(parseFloat(r))?1:parseFloat(r)/100,(C=d(C))&&(s+="background-color: rgba("+C.r+","+C.g+","+C.b+","+r+");")):s+="background: none;":"none"===L&&(s+="background: none;"),n+=
s;if(s=b(m,q,"drawing-page-properties"))r=""+f(s,P),"true"===s.getAttributeNS(x,"background-visible")&&(r+="background: none;"),n+=r;if(s=b(m,q,"table-cell-properties"))s=""+f(s,z),n+=s;if(s=b(m,q,"table-row-properties"))s=""+f(s,E),n+=s;if(s=b(m,q,"table-column-properties"))s=""+f(s,R),n+=s;if(s=b(m,q,"table-properties"))r=s,s=""+f(r,K),r=r.getAttributeNS(w,"border-model"),"collapsing"===r?s+="border-collapse:collapse;":"separating"===r&&(s+="border-collapse:separate;"),n+=s;if(0!==n.length)try{a.insertRule(k+
"{"+n+"}",a.cssRules.length)}catch(ja){throw ja;}}for(var la in m.derivedStyles)m.derivedStyles.hasOwnProperty(la)&&l(a,c,la,m.derivedStyles[la])}var p=odf.Namespaces.drawns,g=odf.Namespaces.fons,q=odf.Namespaces.stylens,s=odf.Namespaces.svgns,w=odf.Namespaces.tablens,u=odf.Namespaces.textns,A=odf.Namespaces.xlinkns,x=odf.Namespaces.presentationns,r={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},v={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},D=[[g,"color","color"],[g,"background-color","background-color"],[g,"font-weight","font-weight"],[g,"font-style","font-style"]],G=[[q,"repeat",
"background-repeat"]],y=[[g,"background-color","background-color"],[g,"text-align","text-align"],[g,"text-indent","text-indent"],[g,"padding","padding"],[g,"padding-left","padding-left"],[g,"padding-right","padding-right"],[g,"padding-top","padding-top"],[g,"padding-bottom","padding-bottom"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"margin","margin"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],
[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"],[g,"border","border"]],P=[[g,"background-color","background-color"],[g,"min-height","min-height"],[p,"stroke","border"],[s,"stroke-color","border-color"],[s,"stroke-width","border-width"],[g,"border","border"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"]],z=[[g,"background-color","background-color"],[g,"border-left","border-left"],[g,"border-right",
"border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"border","border"]],R=[[q,"column-width","width"]],E=[[q,"row-height","height"],[g,"keep-together",null]],K=[[q,"width","width"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"]],X=[[g,"background-color","background-color"],[g,"padding","padding"],[g,"padding-left","padding-left"],[g,"padding-right","padding-right"],[g,"padding-top",
"padding-top"],[g,"padding-bottom","padding-bottom"],[g,"border","border"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"margin","margin"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"]],oa=[[g,"page-width","width"],[g,"page-height","height"]],L={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},ra={},aa=new odf.OdfUtils,ea,O,V,S=new xmldom.XPath,M=new core.CSSUnits;this.style2css=function(a,b,d,e,g){for(var f,h,k,n;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);f=null;e&&(f=e.ownerDocument,O=e.parentNode);g&&(f=g.ownerDocument,O=g.parentNode);if(f)for(n in odf.Namespaces.forEachPrefix(function(a,c){k="@namespace "+a+" url("+c+");";try{b.insertRule(k,b.cssRules.length)}catch(d){}}),ra=d,ea=a,V=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",a=m(e),e=m(g),g={},r)if(r.hasOwnProperty(n))for(h in d=g[n]={},c(a[n],d),c(e[n],d),d)d.hasOwnProperty(h)&&l(b,n,h,d[h])}};
// Input 33
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function m(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function n(a){var b,c=l.length;for(b=0;b<c;b+=1)if(a.namespaceURI===e&&a.localName===l[b])return b;return-1}function k(a,b){var c=new f.UsedStyleList(a,b),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var e=d.acceptNode(a);e===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&(e=c.uses(a)?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT);return e}}function c(a,b){var c=new k(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function a(a,b){if(b){var c=n(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=n(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}function h(a){this.OdfContainer=a}function b(a,
b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var f=new odf.StyleInfo,e="urn:oasis:names:tc:opendocument:xmlns:office:1.0",d="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
t="urn:webodf:names:scope",l="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),p=(new Date).getTime()+"_webodf_",g=new core.Base64;h.prototype=new function(){};h.prototype.constructor=h;h.namespaceURI=e;h.localName="document";b.prototype.load=function(){};b.prototype.getUrl=function(){return this.data?"data:;base64,"+g.toBase64(this.data):null};odf.OdfContainer=function s(g,l){function n(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?
n(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function x(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS(t,"scope",b),c=c.nextSibling}function r(a,b){var c=null,d,e,g;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(g=d.getAttributeNS(t,"scope"))&&g!==b&&c.removeChild(d),d=e;return c}function v(a){var b=F.rootElement.ownerDocument,c;if(a){n(a.documentElement);try{c=b.importNode(a.documentElement,
!0)}catch(d){}}return c}function D(a){F.state=a;if(F.onchange)F.onchange(F);if(F.onstatereadychange)F.onstatereadychange(F)}function G(a){ba=null;F.rootElement=a;a.fontFaceDecls=m(a,e,"font-face-decls");a.styles=m(a,e,"styles");a.automaticStyles=m(a,e,"automatic-styles");a.masterStyles=m(a,e,"master-styles");a.body=m(a,e,"body");a.meta=m(a,e,"meta")}function y(b){b=v(b);var c=F.rootElement;b&&"document-styles"===b.localName&&b.namespaceURI===e?(c.fontFaceDecls=m(b,e,"font-face-decls"),a(c,c.fontFaceDecls),
c.styles=m(b,e,"styles"),a(c,c.styles),c.automaticStyles=m(b,e,"automatic-styles"),x(c.automaticStyles,"document-styles"),a(c,c.automaticStyles),c.masterStyles=m(b,e,"master-styles"),a(c,c.masterStyles),f.prefixStyleNames(c.automaticStyles,p,c.masterStyles)):D(s.INVALID)}function P(b){b=v(b);var c,d,g;if(b&&"document-content"===b.localName&&b.namespaceURI===e){c=F.rootElement;d=m(b,e,"font-face-decls");if(c.fontFaceDecls&&d)for(g=d.firstChild;g;)c.fontFaceDecls.appendChild(g),g=d.firstChild;else d&&
(c.fontFaceDecls=d,a(c,d));d=m(b,e,"automatic-styles");x(d,"document-content");if(c.automaticStyles&&d)for(g=d.firstChild;g;)c.automaticStyles.appendChild(g),g=d.firstChild;else d&&(c.automaticStyles=d,a(c,d));c.body=m(b,e,"body");a(c,c.body)}else D(s.INVALID)}function z(b){b=v(b);var c;b&&("document-meta"===b.localName&&b.namespaceURI===e)&&(c=F.rootElement,c.meta=m(b,e,"meta"),a(c,c.meta))}function R(b){b=v(b);var c;b&&("document-settings"===b.localName&&b.namespaceURI===e)&&(c=F.rootElement,c.settings=
m(b,e,"settings"),a(c,c.settings))}function E(a){a=v(a);var b;if(a&&"manifest"===a.localName&&a.namespaceURI===d)for(b=F.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===d)&&(Q[a.getAttributeNS(d,"full-path")]=a.getAttributeNS(d,"media-type")),a=a.nextSibling}function K(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],I.loadAsDOM(c,function(b,c){d(c);b||F.state===s.INVALID||K(a)})):D(s.DONE)}function X(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function oa(){var a=new xmldom.LSSerializer,b=X("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(F.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function L(a,b){var c=document.createElementNS(d,"manifest:file-entry");c.setAttributeNS(d,"manifest:full-path",a);c.setAttributeNS(d,"manifest:media-type",b);return c}function ra(){var a=
runtime.parseXML('<manifest:manifest xmlns:manifest="'+d+'"></manifest:manifest>'),b=m(a,d,"manifest"),c=new xmldom.LSSerializer,e;for(e in Q)Q.hasOwnProperty(e)&&b.appendChild(L(e,Q[e]));c.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+c.writeToString(a,odf.Namespaces.namespaceMap)}function aa(){var a=new xmldom.LSSerializer,b=X("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(F.rootElement.settings,odf.Namespaces.namespaceMap);
return b+"</office:document-settings>"}function ea(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=r(F.rootElement.automaticStyles,"document-styles"),d=F.rootElement.masterStyles&&F.rootElement.masterStyles.cloneNode(!0),e=X("document-styles");f.removePrefixFromStyleNames(c,p,d);b.filter=new k(d,c);e+=b.writeToString(F.rootElement.fontFaceDecls,a);e+=b.writeToString(F.rootElement.styles,a);e+=b.writeToString(c,a);e+=b.writeToString(d,a);return e+"</office:document-styles>"}function O(){var a=
odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,d=r(F.rootElement.automaticStyles,"document-content"),e=X("document-content");b.filter=new c(F.rootElement.body,d);e+=b.writeToString(d,a);e+=b.writeToString(F.rootElement.body,a);return e+"</office:document-content>"}function V(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var d=v(c);d&&"document"===d.localName&&d.namespaceURI===e?(G(d),D(s.DONE)):D(s.INVALID)}})}function S(){function a(b,c){var g;c||(c=b);g=document.createElementNS(e,c);
d[b]=g;d.appendChild(g)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),d=F.rootElement,g=document.createElementNS(e,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");d.body.appendChild(g);D(s.DONE);return b}function M(){var a,b=new Date;a=runtime.byteArrayFromString(aa(),"utf8");
I.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(oa(),"utf8");I.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(ea(),"utf8");I.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(O(),"utf8");I.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(ra(),"utf8");I.save("META-INF/manifest.xml",a,!0,b)}function H(a,b){M();I.writeAs(a,function(a){b(a)})}var F=this,I,Q={},ba;this.onstatereadychange=l;this.rootElement=this.state=this.onchange=null;this.setRootElement=G;this.getContentElement=
function(){var a;ba||(a=F.rootElement.body,ba=a.getElementsByTagNameNS(e,"text")[0]||a.getElementsByTagNameNS(e,"presentation")[0]||a.getElementsByTagNameNS(e,"spreadsheet")[0]);return ba};this.getDocumentType=function(){var a=F.getContentElement();return a&&a.localName};this.getPart=function(a){return new b(a,Q[a],F,I)};this.getPartData=function(a,b){I.load(a,b)};this.createByteArray=function(a,b){M();I.createByteArray(a,b)};this.saveAs=H;this.save=function(a){H(g,a)};this.getUrl=function(){return g};
this.state=s.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(h);I=g?new core.Zip(g,function(a,b){I=b;a?V(g,function(b){a&&(I.error=a+"\n"+b,D(s.INVALID))}):K([["styles.xml",y],["content.xml",P],["meta.xml",z],["settings.xml",R],["META-INF/manifest.xml",E]])}):S()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=
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
odf.FontLoader=function(){function m(c,a,h,b,f){var e,d=0,n;for(n in c)if(c.hasOwnProperty(n)){if(d===h){e=n;break}d+=1}e?a.getPartData(c[e].href,function(d,n){if(d)runtime.log(d);else{var g="@font-face { font-family: '"+(c[e].family||e)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+k.convertUTF8ArrayToBase64(n)+') format("truetype"); }';try{b.insertRule(g,b.cssRules.length)}catch(q){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(q)+"\nRule: "+g)}}m(c,a,h+1,b,f)}):
f&&f()}var n=new xmldom.XPath,k=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(c,a){for(var h=c.rootElement.fontFaceDecls;a.cssRules.length;)a.deleteRule(a.cssRules.length-1);if(h){var b={},f,e,d,k;if(h)for(h=n.getODFElementsWithXPath(h,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),f=0;f<h.length;f+=1)e=h[f],d=e.getAttributeNS(odf.Namespaces.stylens,"name"),k=e.getAttributeNS(odf.Namespaces.svgns,"font-family"),e=n.getODFElementsWithXPath(e,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<e.length&&(e=e[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),b[d]={href:e,family:k});m(b,c,0,a)}}};return odf.FontLoader}();
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
odf.Formatting=function(){function m(a,b){Object.keys(b).forEach(function(c){try{a[c]=b[c].constructor===Object?m(a[c],b[c]):b[c]}catch(d){a[c]=b[c]}});return a}function n(a,b,c){var e,f;c=c||[d.rootElement.automaticStyles,d.rootElement.styles];for(e=c.shift();e;){for(e=e.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&(f=e.getAttributeNS(p,"name"),e.namespaceURI===p&&"style"===e.localName&&e.getAttributeNS(p,"family")===b&&f===a||"list-style"===b&&e.namespaceURI===g&&"list-style"===e.localName&&
f===a||"data"===b&&e.namespaceURI===q&&f===a))return e;e=e.nextSibling}e=c.shift()}return null}function k(a){for(var b={},c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===p)for(b[c.nodeName]={},a=0;a<c.attributes.length;a+=1)b[c.nodeName][c.attributes[a].name]=c.attributes[a].value;c=c.nextSibling}return b}function c(a,b){Object.keys(b).forEach(function(d){var e=d.split(":"),g=e[1],f=odf.Namespaces.resolvePrefix(e[0]),e=b[d];"object"===typeof e&&Object.keys(e).length?(d=a.getElementsByTagNameNS(f,
g)[0]||a.ownerDocument.createElementNS(f,d),a.appendChild(d),c(d,e)):a.setAttributeNS(f,d,e)})}function a(a){var b=d.rootElement.styles,c;c={};for(var e={},g=a;g;)c=k(g),e=m(c,e),g=(c=g.getAttributeNS(p,"parent-style-name"))?n(c,a.getAttributeNS(p,"family"),[b]):null;a:{a=a.getAttributeNS(p,"family");for(b=d.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===p&&"default-style"===b.localName&&b.getAttributeNS(p,"family")===a){g=b;break a}b=b.nextSibling}g=null}g&&
(c=k(g),e=m(c,e));return e}function h(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],g="",f=!1;c;)!f&&s.isGroupingElement(c)&&(f=!0),(d=t.determineStylesForNode(c))&&e.push(d),c=c.parentNode;f&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){g+="|"+b+":"+a+"|"})})}),b&&(b[g]=e));return f?e:void 0}function b(b){var c={orderedStyles:[]};b.forEach(function(b){Object.keys(b).forEach(function(d){var e=Object.keys(b[d])[0],g,f;(g=n(e,d))?
(f=a(g),c=m(f,c),f=g.getAttributeNS(p,"display-name")):runtime.log("No style element found for '"+e+"' of family '"+d+"'");c.orderedStyles.push({name:e,family:d,displayName:f})})});return c}function f(){var a,b=[];[d.rootElement.automaticStyles,d.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===p&&"style"===a.localName||a.namespaceURI===g&&"list-style"===a.localName)&&b.push(a.getAttributeNS(p,"name")),a=a.nextSibling});return b}var e=
this,d,t=new odf.StyleInfo,l=odf.Namespaces.svgns,p=odf.Namespaces.stylens,g=odf.Namespaces.textns,q=odf.Namespaces.numberns,s=new odf.OdfUtils,w=new core.Utils;this.setOdfContainer=function(a){d=a};this.getFontMap=function(){for(var a=d.rootElement.fontFaceDecls,b={},c,e,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(c=a.getAttributeNS(p,"name"))&&((e=a.getAttributeNS(l,"font-family"))||a.getElementsByTagNameNS(l,"font-face-uri")[0])&&(b[c]=e),a=a.nextSibling;return b};this.getAvailableParagraphStyles=
function(){for(var a=d.rootElement.styles&&d.rootElement.styles.firstChild,b,c,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===p)&&(c=a,b=c.getAttributeNS(p,"family"),"paragraph"===b&&(b=c.getAttributeNS(p,"name"),c=c.getAttributeNS(p,"display-name")||b,b&&c&&e.push({name:b,displayName:c}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var b;b=t.hasDerivedStyles(d.rootElement,odf.Namespaces.resolvePrefix,a);a=(new t.UsedStyleList(d.rootElement.styles)).uses(a)||
(new t.UsedStyleList(d.rootElement.automaticStyles)).uses(a)||(new t.UsedStyleList(d.rootElement.body)).uses(a);return b||a};this.getStyleElement=n;this.getStyleAttributes=k;this.getInheritedStyleAttributes=a;this.getFirstNamedParentStyleNameOrSelf=function(a){var b=d.rootElement.automaticStyles,c=d.rootElement.styles,e;for(e=n(a,"paragraph",[b]);e;)a=e.getAttributeNS(p,"parent-style-name"),e=n(a,"paragraph",[b]);return(e=n(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(n(a,
"paragraph"))};this.getAppliedStyles=function(a){var c={},d=[];a.forEach(function(a){h(a,c)});Object.keys(c).forEach(function(a){d.push(b(c[a]))});return d};this.getAppliedStylesForElement=function(a){return(a=h(a))?b(a):void 0};this.applyStyle=function(a,b,c,g){(new odf.TextStyleApplicator("auto"+w.hashString(a)+"_",e,d.rootElement.automaticStyles)).applyStyle(b,c,g)};this.updateStyle=function(a,b,d){var e,g;c(a,b);if(d){a.getAttributeNS(p,"name");e=f();g=0;do b=d+g,g+=1;while(-1!==e.indexOf(b));
a.setAttributeNS(p,"style:name",b)}}};
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
odf.OdfCanvas=function(){function m(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(e)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function n(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function k(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function c(a,b,c){var d=
"on"+b;a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent(d,c):a[d]===c&&(a[d]=null)}function a(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}function d(){var c=[],f=runtime.getWindow().getSelection(),h,l;for(h=0;h<f.rangeCount;h+=1)l=f.getRangeAt(h),null!==l&&(b(a,l.startContainer)&&b(a,l.endContainer))&&c.push(l);if(c.length===e.length){for(f=0;f<c.length&&(h=c[f],l=e[f],h=h===l?!1:null===h||null===l?!0:h.startContainer!==l.startContainer||h.startOffset!==
l.startOffset||h.endContainer!==l.endContainer||h.endOffset!==l.endOffset,!h);f+=1);if(f===c.length)return}e=c;var f=[c.length],k,m=a.ownerDocument;for(h=0;h<c.length;h+=1)l=c[h],k=m.createRange(),k.setStart(l.startContainer,l.startOffset),k.setEnd(l.endContainer,l.endOffset),f[h]=k;e=f;f=g.length;for(c=0;c<f;c+=1)g[c](a,e)}var e=[],g=[];this.addListener=function(a,b){var c,d=g.length;for(c=0;c<d;c+=1)if(g[c]===b)return;g.push(b)};this.destroy=function(b){c(a,"mouseup",d);c(a,"keyup",d);c(a,"keydown",
d);b()};k(a,"mouseup",d);k(a,"keyup",d);k(a,"keydown",d)}function h(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function b(a,c,d,e){d.setAttribute("styleid",c);var g,f=d.getAttributeNS(v,"anchor-type"),h=d.getAttributeNS(x,"x"),l=d.getAttributeNS(x,"y"),k=d.getAttributeNS(x,"width"),m=d.getAttributeNS(x,"height"),n=d.getAttributeNS(w,"min-height"),q=d.getAttributeNS(w,"min-width"),p=d.getAttributeNS(s,"master-page-name"),
u=null,r,t;r=0;var D,z=a.rootElement.ownerDocument;if(p){u=a.rootElement.masterStyles.getElementsByTagNameNS(A,"master-page");r=null;for(t=0;t<u.length;t+=1)if(u[t].getAttributeNS(A,"name")===p){r=u[t];break}u=r}else u=null;if(u){p=z.createElementNS(s,"draw:page");D=u.firstElementChild;for(r=0;D;)"true"!==D.getAttributeNS(y,"placeholder")&&(t=D.cloneNode(!0),p.appendChild(t),b(a,c+"_"+r,t,e)),D=D.nextElementSibling,r+=1;K.appendChild(p);r=K.getElementsByTagNameNS(s,"page").length;if(t=p.getElementsByTagNameNS(v,
"page-number")[0]){for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(z.createTextNode(r))}b(a,c,p,e);p.setAttributeNS(s,"draw:master-page-name",u.getAttributeNS(A,"name"))}if("as-char"===f)g="display: inline-block;";else if(f||h||l)g="position: absolute;";else if(k||m||n||q)g="display: block;";h&&(g+="left: "+h+";");l&&(g+="top: "+l+";");k&&(g+="width: "+k+";");m&&(g+="height: "+m+";");n&&(g+="min-height: "+n+";");q&&(g+="min-width: "+q+";");g&&(g="draw|"+d.localName+'[styleid="'+c+'"] {'+
g+"}",e.insertRule(g,e.cssRules.length))}function f(a){for(a=a.firstChild;a;){if(a.namespaceURI===u&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function e(a,b,c,d){function e(b){b&&(b='draw|image[styleid="'+a+'"] {'+("background-image: url("+b+");")+"}",d.insertRule(b,d.cssRules.length))}c.setAttribute("styleid",a);var g=c.getAttributeNS(D,"href"),h;if(g)try{h=b.getPart(g),h.onchange=function(a){e(a.url)},h.load()}catch(l){runtime.log("slight problem: "+
l)}else g=f(c),e(g)}function d(a){function b(c){var d,e;c.hasAttributeNS(D,"href")&&(d=c.getAttributeNS(D,"href"),"#"===d[0]?(d=d.substring(1),e=function(){var b=z.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=z.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);return!1}):e=function(){P.open(d)},c.onclick=e)}var c,d,e;d=a.getElementsByTagNameNS(v,
"a");for(c=0;c<d.length;c+=1)e=d.item(c),b(e)}function t(a){var b=a.ownerDocument;E.getElementsByTagNameNS(a,v,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(v,"c"),10);if(1<d)for(a.removeAttributeNS(v,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function l(a){E.getElementsByTagNameNS(a,v,"tab").forEach(function(a){a.textContent="\t"})}function p(a,b){function c(a,g){var f=h.documentElement.namespaceURI;
"video/"===g.substr(0,6)?(d=h.createElementNS(f,"video"),d.setAttribute("controls","controls"),e=h.createElementNS(f,"source"),e.setAttribute("src",a),e.setAttribute("type",g),d.appendChild(e),b.parentNode.appendChild(d)):b.innerHtml="Unrecognised Plugin"}var d,e,g,h=b.ownerDocument,l;if(g=b.getAttributeNS(D,"href"))try{l=a.getPart(g),l.onchange=function(a){c(a.url,a.mimetype)},l.load()}catch(k){runtime.log("slight problem: "+k)}else runtime.log("using MP4 data fallback"),g=f(b),c(g,"video/mp4")}
function g(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function q(a){var b=
a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var s=odf.Namespaces.drawns,w=odf.Namespaces.fons,u=odf.Namespaces.officens,A=odf.Namespaces.stylens,x=odf.Namespaces.svgns,r=odf.Namespaces.tablens,v=odf.Namespaces.textns,D=odf.Namespaces.xlinkns,
G=odf.Namespaces.xmlns,y=odf.Namespaces.presentationns,P=runtime.getWindow(),z=new xmldom.XPath,R=new odf.OdfUtils,E=new core.DomUtils,K;odf.OdfCanvas=function(c){function f(a,b,c){function d(a,b,c,g){$.addToQueue(function(){e(a,b,c,g)})}var g,h;g=b.getElementsByTagNameNS(s,"image");for(b=0;b<g.length;b+=1)h=g.item(b),d("image"+String(b),a,h,c)}function w(a,b){function c(a,b){$.addToQueue(function(){p(a,b)})}var d,e,g;e=b.getElementsByTagNameNS(s,"plugin");for(d=0;d<e.length;d+=1)g=e.item(d),c(a,
g)}function x(){N.firstChild&&(1<U?(N.style.MozTransformOrigin="center top",N.style.WebkitTransformOrigin="center top",N.style.OTransformOrigin="center top",N.style.msTransformOrigin="center top"):(N.style.MozTransformOrigin="left top",N.style.WebkitTransformOrigin="left top",N.style.OTransformOrigin="left top",N.style.msTransformOrigin="left top"),N.style.WebkitTransform="scale("+U+")",N.style.MozTransform="scale("+U+")",N.style.OTransform="scale("+U+")",N.style.msTransform="scale("+U+")",c.style.width=
Math.round(U*N.offsetWidth)+"px",c.style.height=Math.round(U*N.offsetHeight)+"px")}function y(a){function b(a){return d===a.getAttributeNS(u,"name")}var c=E.getElementsByTagNameNS(a,u,"annotation");a=E.getElementsByTagNameNS(a,u,"annotation-end");var d,e;for(e=0;e<c.length;e+=1)d=c[e].getAttributeNS(u,"name"),C.addAnnotation({node:c[e],end:a.filter(b)[0]||null});C.rerenderAnnotations()}function D(a){ha?(ca.parentNode||(N.appendChild(ca),x()),C&&C.forgetAnnotations(),C=new gui.AnnotationViewManager(H,
a.body,ca),y(a.body)):ca.parentNode&&(N.removeChild(ca),C.forgetAnnotations(),x())}function O(a){function e(){for(var g=c;g.firstChild;)g.removeChild(g.firstChild);c.style.display="inline-block";g=I.rootElement;c.ownerDocument.importNode(g,!0);Q.setOdfContainer(I);var k=I,m=ia;(new odf.FontLoader).loadFonts(k,m.sheet);h(I,Q,T);for(var m=I,k=ja.sheet,n=c;n.firstChild;)n.removeChild(n.firstChild);N=F.createElementNS(c.namespaceURI,"div");N.style.display="inline-block";N.style.background="white";N.appendChild(g);
c.appendChild(N);ca=F.createElementNS(c.namespaceURI,"div");ca.id="annotationsPane";K=F.createElementNS(c.namespaceURI,"div");K.id="shadowContent";K.style.position="absolute";K.style.top=0;K.style.left=0;m.getContentElement().appendChild(K);var n=g.body,q,p,u;p=[];for(q=n.firstChild;q&&q!==n;)if(q.namespaceURI===s&&(p[p.length]=q),q.firstChild)q=q.firstChild;else{for(;q&&q!==n&&!q.nextSibling;)q=q.parentNode;q&&q.nextSibling&&(q=q.nextSibling)}for(u=0;u<p.length;u+=1)q=p[u],b(m,"frame"+String(u),
q,k);p=z.getODFElementsWithXPath(n,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(q=0;q<p.length;q+=1)n=p[q],n.setAttributeNS&&n.setAttributeNS("urn:webodf","containsparagraphanchor",!0);q=g.body.getElementsByTagNameNS(r,"table-cell");for(n=0;n<q.length;n+=1)p=q.item(n),p.hasAttributeNS(r,"number-columns-spanned")&&p.setAttribute("colspan",p.getAttributeNS(r,"number-columns-spanned")),p.hasAttributeNS(r,"number-rows-spanned")&&p.setAttribute("rowspan",p.getAttributeNS(r,
"number-rows-spanned"));d(g.body);t(g.body);l(g.body);f(m,g.body,k);w(m,g.body);p=g.body;var y,E,C,da,n={};q={};var Z;u=P.document.getElementsByTagNameNS(v,"list-style");for(m=0;m<u.length;m+=1)y=u.item(m),(C=y.getAttributeNS(A,"name"))&&(q[C]=y);p=p.getElementsByTagNameNS(v,"list");for(m=0;m<p.length;m+=1)if(y=p.item(m),u=y.getAttributeNS(G,"id")){E=y.getAttributeNS(v,"continue-list");y.setAttribute("id",u);da="text|list#"+u+" > text|list-item > *:first-child:before {";if(C=y.getAttributeNS(v,"style-name")){y=
q[C];Z=R.getFirstNonWhitespaceChild(y);y=void 0;if(Z)if("list-level-style-number"===Z.localName){y=Z.getAttributeNS(A,"num-format");C=Z.getAttributeNS(A,"num-suffix");var wa="",wa={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},qa=void 0,qa=Z.getAttributeNS(A,"num-prefix")||"",qa=wa.hasOwnProperty(y)?qa+(" counter(list, "+wa[y]+")"):y?qa+("'"+y+"';"):qa+" ''";C&&(qa+=" '"+C+"'");y=wa="content: "+qa+";"}else"list-level-style-image"===Z.localName?y="content: none;":"list-level-style-bullet"===
Z.localName&&(y="content: '"+Z.getAttributeNS(v,"bullet-char")+"';");Z=y}if(E){for(y=n[E];y;)E=y,y=n[E];da+="counter-increment:"+E+";";Z?(Z=Z.replace("list",E),da+=Z):da+="content:counter("+E+");"}else E="",Z?(Z=Z.replace("list",u),da+=Z):da+="content: counter("+u+");",da+="counter-increment:"+u+";",k.insertRule("text|list#"+u+" {counter-reset:"+u+"}",k.cssRules.length);da+="}";n[u]=E;da&&k.insertRule(da,k.cssRules.length)}N.insertBefore(K,N.firstChild);x();D(g);if(!a&&(g=[I],ma.hasOwnProperty("statereadychange")))for(k=
ma.statereadychange,Z=0;Z<k.length;Z+=1)k[Z].apply(null,g)}I.state===odf.OdfContainer.DONE?e():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function ta(){I.state===odf.OdfContainer.DONE?e():(runtime.log("will be back later..."),runtime.setTimeout(ta,500))},100))}function V(a){$.clearQueue();c.innerHTML="loading "+a;c.removeAttribute("style");I=new odf.OdfContainer(a,function(a){I=a;O(!1)})}function S(){if(W){for(var a=W.ownerDocument.createDocumentFragment();W.firstChild;)a.insertBefore(W.firstChild,
null);W.parentNode.replaceChild(a,W)}}function M(a){a=a||P.event;for(var b=a.target,c=P.getSelection(),d=0<c.rangeCount?c.getRangeAt(0):null,e=d&&d.startContainer,g=d&&d.startOffset,f=d&&d.endContainer,h=d&&d.endOffset,l,k;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==v);)b=b.parentNode;la&&(b&&b.parentNode!==W)&&(l=b.ownerDocument,k=l.documentElement.namespaceURI,W?W.parentNode&&S():(W=l.createElementNS(k,"p"),W.style.margin="0px",W.style.padding="0px",W.style.border="0px",W.setAttribute("contenteditable",
!0)),b.parentNode.replaceChild(W,b),W.appendChild(b),W.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),d.setStart(e,g),d.setEnd(f,h),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==c&&void 0!==c,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==c.ownerDocument&&void 0!==c.ownerDocument,"odf.OdfCanvas constructor needs DOM");var H=this,F=c.ownerDocument,I,Q=new odf.Formatting,ba=
new a(c),fa,N,ca,ha=!1,C,ka,ia,T,ja,la=!1,U=1,ma={},W,$=new m;this.refreshCSS=function(){h(I,Q,T);x()};this.refreshSize=function(){x()};this.odfContainer=function(){return I};this.slidevisibilitycss=function(){return fa.css};this.setOdfContainer=function(a,b){I=a;O(!0===b)};this.load=this.load=V;this.save=function(a){S();I.save(a)};this.setEditable=function(a){k(c,"click",M);(la=a)||S()};this.addListener=function(a,b){switch(a){case "selectionchange":ba.addListener(a,b);break;case "click":k(c,a,b);
break;default:var d=ma[a];void 0===d&&(d=ma[a]=[]);b&&-1===d.indexOf(b)&&d.push(b)}};this.getFormatting=function(){return Q};this.getAnnotationManager=function(){return C};this.refreshAnnotations=function(){D(I.rootElement)};this.rerenderAnnotations=function(){C&&C.rerenderAnnotations()};this.getSizer=function(){return N};this.enableAnnotations=function(a){a!==ha&&(ha=a,I&&D(I.rootElement))};this.addAnnotation=function(a){C&&C.addAnnotation(a)};this.forgetAnnotations=function(){C&&C.forgetAnnotations()};
this.setZoomLevel=function(a){U=a;x()};this.getZoomLevel=function(){return U};this.fitToContainingElement=function(a,b){var d=c.offsetHeight/U;U=a/(c.offsetWidth/U);b/d<U&&(U=b/d);x()};this.fitToWidth=function(a){U=a/(c.offsetWidth/U);x()};this.fitSmart=function(a,b){var d,e;d=c.offsetWidth/U;e=c.offsetHeight/U;d=a/d;void 0!==b&&b/e<d&&(d=b/e);U=Math.min(1,d);x()};this.fitToHeight=function(a){U=a/(c.offsetHeight/U);x()};this.showFirstPage=function(){fa.showFirstPage()};this.showNextPage=function(){fa.showNextPage()};
this.showPreviousPage=function(){fa.showPreviousPage()};this.showPage=function(a){fa.showPage(a);x()};this.getElement=function(){return c};this.destroy=function(a){var b=F.getElementsByTagName("head")[0];ca.parentNode&&ca.parentNode.removeChild(ca);c.removeChild(N);b.removeChild(ka);b.removeChild(ia);b.removeChild(T);b.removeChild(ja);ba.destroy(function(b){b?a(b):fa.destroy(a)})};ka=g(F);fa=new n(q(F));ia=q(F);T=q(F);ja=q(F)};return odf.OdfCanvas}();
// Input 37
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(m,n,k){return new odf.OdfContainer(m,function(c){if(c.state===odf.OdfContainer.INVALID)return k("Document "+m+" is invalid.");c.state===odf.OdfContainer.DONE?c.saveAs(n,function(a){k(a)}):k("Document was not completely loaded.")})};this.render=function(m,n,k){for(n=n.getElementsByTagName("body")[0];n.firstChild;)n.removeChild(n.firstChild);n=new odf.OdfCanvas(n);n.addListener("statereadychange",function(c){k(c)});n.load(m)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(m,n){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(m,n,k,c){};ops.Server.prototype.joinSession=function(m,n,k,c){};ops.Server.prototype.leaveSession=function(m,n,k,c){};ops.Server.prototype.getGenesisUrl=function(m){};
// Input 39
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
ops.Operation=function(){};ops.Operation.prototype.init=function(m){};ops.Operation.prototype.transform=function(m,n){};ops.Operation.prototype.execute=function(m){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var m=this,n,k;this.init=function(c){n=c.memberid;k=c.timestamp};this.transform=function(c,a){return[m]};this.execute=function(c){var a=c.getCursor(n);if(a)return!1;a=new ops.OdtCursor(n,c);c.addCursor(a);c.emit(ops.OdtDocument.signalCursorAdded,a);return!0};this.spec=function(){return{optype:"AddCursor",memberid:n,timestamp:k}}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");
gui.StyleHelper=function(m){function n(a,h,b){var f=!0,e;a.collapsed?(e=a.startContainer,e.hasChildNodes()&&a.startOffset<e.childNodes.length&&(e=e.childNodes[a.startOffset]),a=[e]):a=c.getTextNodes(a,!0);a=m.getAppliedStyles(a);for(e=0;e<a.length&&!(f=a[e]["style:text-properties"],f=!f||f[h]!==b);e+=1);return!f}var k=new core.DomUtils,c=new odf.OdfUtils;this.getAppliedStyles=function(a){a=c.getTextNodes(a,!0);return m.getAppliedStyles(a)};this.applyStyle=function(a,h,b){var f=k.splitBoundaries(h),
e=c.getTextNodes(h,!1);m.applyStyle(a,e,{startContainer:h.startContainer,startOffset:h.startOffset,endContainer:h.endContainer,endOffset:h.endOffset},b);f.forEach(k.normalizeTextNodes)};this.isBold=function(a){return n(a,"fo:font-weight","bold")};this.isItalic=function(a){return n(a,"fo:font-style","italic")};this.hasUnderline=function(a){return n(a,"style:text-underline-style","solid")};this.hasStrikeThrough=function(a){return n(a,"style:text-line-through-style","solid")}};
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
runtime.loadClass("gui.StyleHelper");runtime.loadClass("odf.OdfUtils");
ops.OpApplyDirectStyling=function(){function m(b){var e=0<=a?c+a:c,d=b.getIteratorAtPosition(0<=a?c:c+a),e=a?b.getIteratorAtPosition(e):d;b=b.getDOM().createRange();b.setStart(d.container(),d.unfilteredDomOffset());b.setEnd(e.container(),e.unfilteredDomOffset());return b}var n,k,c,a,h,b=new odf.OdfUtils;this.init=function(b){n=b.memberid;k=b.timestamp;c=parseInt(b.position,10);a=parseInt(b.length,10);h=b.setProperties};this.transform=function(a,b){return null};this.execute=function(a){var c=m(a),
d=b.getImpactedParagraphs(c);(new gui.StyleHelper(a.getFormatting())).applyStyle(n,c,h);c.detach();a.getOdfCanvas().refreshCSS();d.forEach(function(b){a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:b,memberId:n,timeStamp:k})});a.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:n,timestamp:k,position:c,length:a,setProperties:h}}};
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
ops.OpRemoveCursor=function(){var m=this,n,k;this.init=function(c){n=c.memberid;k=c.timestamp};this.transform=function(c,a){var h=c.spec(),b=[m];"RemoveCursor"===h.optype&&h.memberid===n&&(b=[]);return b};this.execute=function(c){return c.removeCursor(n)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:n,timestamp:k}}};
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
ops.OpMoveCursor=function(){var m=this,n,k,c,a;this.init=function(h){n=h.memberid;k=h.timestamp;c=parseInt(h.position,10);a=void 0!==h.length?parseInt(h.length,10):0};this.merge=function(h){return"MoveCursor"===h.optype&&h.memberid===n?(c=h.position,a=h.length,k=h.timestamp,!0):!1};this.transform=function(h,b){var f=h.spec(),e=c+a,d,k=[m];switch(f.optype){case "RemoveText":d=f.position+f.length;d<=c?c-=f.length:f.position<e&&(c<f.position?a=d<e?a-f.length:f.position-c:(c=f.position,a=d<e?e-d:0));
break;case "SplitParagraph":f.position<c?c+=1:f.position<=e&&(a+=1);break;case "AddAnnotation":f.position<c?c+=1:f.position<e&&(a+=1);break;case "InsertText":f.position<c?c+=f.text.length:f.position<=e&&(a+=f.text.length);break;case "RemoveCursor":f.memberid===n&&(k=[]);break;case "InsertTable":k=null}return k};this.execute=function(h){var b=h.getCursor(n),f=h.getCursorPosition(n),e=h.getPositionFilter(),d=c-f;if(!b)return!1;f=b.getStepCounter();d=0<d?f.countForwardSteps(d,e):0>d?-f.countBackwardSteps(-d,
e):0;b.move(d);a&&(e=0<a?f.countForwardSteps(a,e):0>a?-f.countBackwardSteps(-a,e):0,b.move(e,!0));h.emit(ops.OdtDocument.signalCursorMoved,b);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:n,timestamp:k,position:c,length:a}}};
// Input 45
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
ops.OpInsertTable=function(){function m(b,c){var d;if(1===t.length)d=t[0];else if(3===t.length)switch(b){case 0:d=t[0];break;case a-1:d=t[2];break;default:d=t[1]}else d=t[b];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case h-1:return d[2];default:return d[1]}return d[c]}var n=this,k,c,a,h,b,f,e,d,t;this.init=function(l){k=l.memberid;c=l.timestamp;b=parseInt(l.position,10);a=parseInt(l.initialRows,10);h=parseInt(l.initialColumns,10);f=l.tableName;e=l.tableStyleName;d=l.tableColumnStyleName;
t=l.tableCellStyleMatrix};this.transform=function(a,c){var d=a.spec(),e=[n];switch(d.optype){case "InsertTable":e=null;break;case "AddAnnotation":d.position<b&&(b+=1);break;case "SplitParagraph":d.position<b?b+=1:d.position!==b||c||(b+=1,e=null);break;case "InsertText":d.position<b?b+=d.text.length:d.position!==b||c||(b+=d.text.length,e=null);break;case "RemoveText":d.position+d.length<=b?b-=d.length:d.position<b&&(b=d.position)}return e};this.execute=function(l){var n=l.getPositionInTextNode(b),
g=l.getRootNode();if(n){var q=l.getDOM(),s=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),u,A,x,r;e&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",e);f&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",f);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",
h);d&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);s.appendChild(t);for(x=0;x<a;x+=1){t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(r=0;r<h;r+=1)u=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(A=m(x,r))&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",A),A=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),
u.appendChild(A),t.appendChild(u);s.appendChild(t)}n=l.getParagraphElement(n.textNode);g.insertBefore(s,n?n.nextSibling:void 0);l.getOdfCanvas().refreshSize();l.emit(ops.OdtDocument.signalTableAdded,{tableElement:s,memberId:k,timeStamp:c});l.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:k,timestamp:c,position:b,initialRows:a,initialColumns:h,tableName:f,tableStyleName:e,tableColumnStyleName:d,tableCellStyleMatrix:t}}};
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
ops.OpInsertText=function(){function m(a,c){var e=c.parentNode,d=c.nextSibling,h=[];a.getCursors().forEach(function(a){var b=a.getSelectedRange();!b||b.startContainer!==c&&b.endContainer!==c||h.push({cursor:a,startContainer:b.startContainer,startOffset:b.startOffset,endContainer:b.endContainer,endOffset:b.endOffset})});e.removeChild(c);e.insertBefore(c,d);h.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var n=
this,k,c,a,h;this.init=function(b){k=b.memberid;c=b.timestamp;a=parseInt(b.position,10);h=b.text};this.merge=function(b){return"InsertText"===b.optype&&b.memberid===k&&b.position===a+h.length?(h+=b.text,c=b.timestamp,!0):!1};this.transform=function(b,c){var e=b.spec(),d=[n];switch(e.optype){case "InsertText":e.position<a?a+=e.text.length:e.position!==a||c||(a+=e.text.length,d=null);break;case "AddAnnotation":e.position<a&&(a+=1);break;case "SplitParagraph":e.position<a?a+=1:e.position!==a||c||(a+=
1,d=null);break;case "InsertTable":d=null;break;case "RemoveText":e.position+e.length<=a?a-=e.length:e.position<a&&(a=e.position)}return d};this.execute=function(b){var f,e,d,n,l=b.getDOM(),p,g=!0,q=0,s;if(f=b.getPositionInTextNode(a,k)){e=f.textNode;d=e.parentNode;n=e.nextSibling;p=b.getParagraphElement(e);f.offset!==e.length&&(n=e.splitText(f.offset));for(f=0;f<h.length;f+=1)if(" "===h[f]||"\t"===h[f])q<f&&(q=h.substring(q,f),g?e.appendData(q):d.insertBefore(l.createTextNode(q),n)),q=f+1,g=!1,s=
" "===h[f]?"text:s":"text:tab",s=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",s),s.appendChild(l.createTextNode(h[f])),d.insertBefore(s,n);q=h.substring(q);0<q.length&&(g?e.appendData(q):d.insertBefore(l.createTextNode(q),n));m(b,e);0===e.length&&e.parentNode.removeChild(e);b.getOdfCanvas().refreshSize();b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:p,memberId:k,timeStamp:c});b.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",
memberid:k,timestamp:c,position:a,text:h}}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("core.DomUtils");
ops.OpRemoveText=function(){function m(a){function b(a){if(f.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function c(h){h=e.mergeIntoParent(h);return!f.isParagraph(h)&&h!==a&&b(h)?c(h):h}this.isEmpty=b;this.mergeChildrenIntoParent=c}function n(a){var c=a.getPositionFilter(),f,k,g,m,n=b,w=a.getDOM().createRange();a=a.getIteratorAtPosition(h);f=a.container();for(k=a.unfilteredDomOffset();n&&
a.nextPosition();)g=a.container(),m=a.unfilteredDomOffset(),c.acceptPosition(a)===NodeFilter.FILTER_ACCEPT&&(n-=1);w.setStart(f,k);w.setEnd(g,m);e.splitBoundaries(w);return w}var k=this,c,a,h,b,f,e;this.init=function(d){runtime.assert(0<=d.length,"OpRemoveText only supports positive lengths");c=d.memberid;a=d.timestamp;h=parseInt(d.position,10);b=parseInt(d.length,10);f=new odf.OdfUtils;e=new core.DomUtils};this.transform=function(d,e){var f=d.spec(),m=h+b,g,n=[k];switch(f.optype){case "RemoveText":g=
f.position+f.length;g<=h?h-=f.length:f.position<m&&(h<f.position?b=g<m?b-f.length:f.position-h:g<m?(h=f.position,b=m-g):n=[]);break;case "InsertText":f.position<=h?h+=f.text.length:f.position<m&&(b=f.position-h,g=new ops.OpRemoveText,g.init({memberid:c,timestamp:a,position:f.position+f.text.length,length:m-f.position}),n=[g,k]);break;case "SplitParagraph":f.position<=h?h+=1:f.position<m&&(b=f.position-h,g=new ops.OpRemoveText,g.init({memberid:c,timestamp:a,position:f.position+1,length:m-f.position}),
n=[g,k]);break;case "InsertTable":n=null;break;case "AddAnnotation":case "RemoveAnnotation":n=null;break;case "ApplyDirectStyling":n=null}return n};this.execute=function(d){var e,f,k,g,q=new m(d.getRootNode());d.upgradeWhitespacesAtPosition(h);d.upgradeWhitespacesAtPosition(h+b);f=n(d);e=d.getParagraphElement(f.startContainer);k=d.getTextElements(f,!0);g=d.getParagraphElements(f);f.detach();k.forEach(function(a){q.mergeChildrenIntoParent(a)});f=g.reduce(function(a,b){var c,d,e=a,g=b,f,h;q.isEmpty(a)&&
(d=!0,b.parentNode!==a.parentNode&&(f=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),g=a,e=b,h=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;g.hasChildNodes();)c=d?g.lastChild:g.firstChild,g.removeChild(c),"editinfo"!==c.localName&&e.insertBefore(c,h);f&&q.isEmpty(f)&&q.mergeChildrenIntoParent(f);q.mergeChildrenIntoParent(g);return e});d.fixCursorPositions();d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f||
e,memberId:c,timeStamp:a});d.emit(ops.OdtDocument.signalCursorMoved,d.getCursor(c));d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:c,timestamp:a,position:h,length:b}}};
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
ops.OpSplitParagraph=function(){var m=this,n,k,c,a=new odf.OdfUtils;this.init=function(a){n=a.memberid;k=a.timestamp;c=parseInt(a.position,10)};this.transform=function(a,b){var f=a.spec(),e=[m];switch(f.optype){case "SplitParagraph":f.position<c?c+=1:f.position!==c||b||(c+=1,e=null);break;case "AddAnnotation":f.position<c&&(c+=1);break;case "InsertText":f.position<c?c+=f.text.length:f.position!==c||b||(c+=f.text.length,e=null);break;case "InsertTable":e=null;break;case "RemoveText":f.position+f.length<=
c?c-=f.length:f.position<c&&(c=f.position)}return e};this.execute=function(h){var b,f,e,d,m,l;h.upgradeWhitespacesAtPosition(c);b=h.getPositionInTextNode(c,n);if(!b)return!1;f=h.getParagraphElement(b.textNode);if(!f)return!1;e=a.isListItem(f.parentNode)?f.parentNode:f;0===b.offset?(l=b.textNode.previousSibling,m=null):(l=b.textNode,m=b.offset>=b.textNode.length?null:b.textNode.splitText(b.offset));for(b=b.textNode;b!==e;)if(b=b.parentNode,d=b.cloneNode(!1),l){for(m&&d.appendChild(m);l.nextSibling;)d.appendChild(l.nextSibling);
b.parentNode.insertBefore(d,b.nextSibling);l=b;m=d}else b.parentNode.insertBefore(d,b),l=d,m=b;a.isListItem(m)&&(m=m.childNodes[0]);h.fixCursorPositions(n);h.getOdfCanvas().refreshSize();h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f,memberId:n,timeStamp:k});h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:m,memberId:n,timeStamp:k});h.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:n,timestamp:k,position:c}}};
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
ops.OpSetParagraphStyle=function(){var m=this,n,k,c,a;this.init=function(h){n=h.memberid;k=h.timestamp;c=h.position;a=h.styleName};this.transform=function(c,b){var f=c.spec(),e=[m];switch(f.optype){case "RemoveParagraphStyle":f.styleName===a&&(a="")}return e};this.execute=function(h){var b;if(b=h.getPositionInTextNode(c))if(b=h.getParagraphElement(b.textNode))return""!==a?b.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",a):b.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),h.getOdfCanvas().refreshSize(),h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:b,timeStamp:k,memberId:n}),h.getOdfCanvas().rerenderAnnotations(),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:n,timestamp:k,position:c,styleName:a}}};
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
ops.OpUpdateParagraphStyle=function(){function m(a,b){var c,d,e=b?b.split(","):[];for(c=0;c<e.length;c+=1)d=e[c].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(d[0]),d[1])}function n(a,b,c,d){var e,f,h,l=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<l.length)&&Object.keys(a).forEach(function(b){e=a[b];(c&&void 0!==c[b]||l&&-1!==l.indexOf(b))&&"object"!==typeof e&&delete a[b]});if(b&&b.attributes&&(c||0<l.length)){h=b.attributes.split(",");for(d=0;d<h.length;d+=1)if(f=h[d],c&&void 0!==
c[f]||l&&-1!==l.indexOf(f))h.splice(d,1),d-=1;0<h.length?b.attributes=h.join(","):delete b.attributes}}function k(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function c(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function a(a,b){var d=t?t[b]:null,e=l?l[b]:null;n(d,e,a.setProperties?a.setProperties[b]:null,a.removedProperties?a.removedProperties[b]:null);d&&!k(d)&&delete t[b];e&&!c(e)&&delete l[b]}function h(a){t&&["style:parent-style-name",
"style:next-style-name"].forEach(function(b){t[b]===a&&delete t[b]})}var b=this,f,e,d,t,l;this.init=function(a){f=a.memberid;e=a.timestamp;d=a.styleName;t=a.setProperties;l=a.removedProperties};this.transform=function(e,g){var f=e.spec(),m=[b];switch(f.optype){case "UpdateParagraphStyle":f.styleName!==d||g||(a(f,"style:paragraph-properties"),a(f,"style:text-properties"),n(t||null,l||null,f.setProperties||null,f.removedProperties||null),t&&k(t)||l&&c(l)||(m=[]));break;case "RemoveParagraphStyle":f.styleName===
d?m=[]:h(f.styleName)}return m};this.execute=function(a){var b=a.getFormatting(),c=a.getDOM(),e=c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:style"),f,h,k,n,r;return(e=a.getParagraphStyleElement(d))?(f=e.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","paragraph-properties")[0],h=e.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties")[0],t&&Object.keys(t).forEach(function(d){switch(d){case "style:paragraph-properties":void 0===
f&&(f=c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:paragraph-properties"),e.appendChild(f));b.updateStyle(f,t["style:paragraph-properties"]);break;case "style:text-properties":void 0===h&&(h=c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:text-properties"),e.appendChild(h));(n=t["style:text-properties"]["style:font-name"])&&!b.getFontMap().hasOwnProperty(n)&&(k=c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:font-face"),
k.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",n),k.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","svg:font-family",n),a.getOdfCanvas().odfContainer().rootElement.fontFaceDecls.appendChild(k));b.updateStyle(h,t["style:text-properties"]);break;default:"object"!==typeof t[d]&&(r=odf.Namespaces.resolvePrefix(d.substr(0,d.indexOf(":"))),e.setAttributeNS(r,d,t[d]))}}),l&&(l["style:paragraph-properties"]&&(m(f,l["style:paragraph-properties"].attributes),
0===f.attributes.length&&e.removeChild(f)),l["style:text-properties"]&&(m(h,l["style:text-properties"].attributes),0===h.attributes.length&&e.removeChild(h)),m(e,l.attributes)),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,d),a.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:f,timestamp:e,styleName:d,setProperties:t,removedProperties:l}}};
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
ops.OpAddParagraphStyle=function(){function m(a){h&&["style:parent-style-name","style:next-style-name"].forEach(function(b){h[b]===a&&delete h[b]})}var n=this,k,c,a,h,b=odf.Namespaces.svgns,f=odf.Namespaces.stylens;this.init=function(b){k=b.memberid;c=b.timestamp;a=b.styleName;h=b.setProperties};this.transform=function(a,b){var c=a.spec();"RemoveParagraphStyle"===c.optype&&m(c.styleName);return[n]};this.execute=function(c){var d=c.getOdfCanvas().odfContainer(),k=c.getFormatting(),l=c.getDOM(),m=l.createElementNS(f,
"style:style"),g,n,s,w,u;if(!m)return!1;m.setAttributeNS(f,"style:family","paragraph");m.setAttributeNS(f,"style:name",a);h&&Object.keys(h).forEach(function(a){switch(a){case "style:paragraph-properties":g=l.createElementNS(f,"style:paragraph-properties");m.appendChild(g);k.updateStyle(g,h["style:paragraph-properties"]);break;case "style:text-properties":n=l.createElementNS(f,"style:text-properties");m.appendChild(n);(w=h["style:text-properties"]["style:font-name"])&&!k.getFontMap().hasOwnProperty(w)&&
(s=l.createElementNS(f,"style:font-face"),s.setAttributeNS(f,"style:name",w),s.setAttributeNS(b,"svg:font-family",w),d.rootElement.fontFaceDecls.appendChild(s));k.updateStyle(n,h["style:text-properties"]);break;default:"object"!==typeof h[a]&&(u=odf.Namespaces.resolvePrefix(a.substr(0,a.indexOf(":"))),m.setAttributeNS(u,a,h[a]))}});d.rootElement.styles.appendChild(m);c.getOdfCanvas().refreshCSS();c.emit(ops.OdtDocument.signalStyleCreated,a);return!0};this.spec=function(){return{optype:"AddParagraphStyle",
memberid:k,timestamp:c,styleName:a,setProperties:h}}};
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
ops.OpRemoveParagraphStyle=function(){function m(c){var b=[];c&&["style:parent-style-name","style:next-style-name"].forEach(function(f){c[f]===a&&b.push(f)});return b}var n=this,k,c,a;this.init=function(h){k=h.memberid;c=h.timestamp;a=h.styleName};this.transform=function(h,b){var f=h.spec(),e,d;e=[n];switch(f.optype){case "RemoveParagraphStyle":f.styleName===a&&(e=[]);break;case "AddParagraphStyle":case "UpdateParagraphStyle":d=m(f.setProperties);0<d.length&&(e=new ops.OpUpdateParagraphStyle,e.init({memberid:k,
timestamp:c,styleName:f.styleName,removedProperties:{attributes:d.join(",")}}),e=[e,n]);break;case "SetParagraphStyle":f.styleName===a&&(f.styleName="",e=new ops.OpSetParagraphStyle,e.init(f),e=[e,n])}return e};this.execute=function(c){var b=c.getParagraphStyleElement(a);if(!b)return!1;b.parentNode.removeChild(b);c.getOdfCanvas().refreshCSS();c.emit(ops.OdtDocument.signalStyleDeleted,a);return!0};this.spec=function(){return{optype:"RemoveParagraphStyle",memberid:k,timestamp:c,styleName:a}}};
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
ops.OpAddAnnotation=function(){function m(a,b,c){if(c=a.getPositionInTextNode(c,k))a=c.textNode,c.offset!==a.length&&a.splitText(c.offset),a.parentNode.insertBefore(b,a.nextSibling)}var n=this,k,c,a,h,b;this.init=function(f){k=f.memberid;c=parseInt(f.timestamp,10);a=parseInt(f.position,10);h=parseInt(f.length,10)||0;b=f.name};this.transform=function(b,c){var d=b.spec(),k=a+h,l=[n];switch(d.optype){case "AddAnnotation":d.position<a?a+=1:d.position!==a||c||(a+=1,l=null);break;case "InsertText":d.position<=
a?a+=d.text.length:d.position<=k&&(h+=d.text.length);break;case "SplitParagraph":d.position<=a?a+=1:d.position<=k&&(h+=1);break;case "InsertTable":l=null;break;case "RemoveText":d.position+d.length<=a?a-=d.length:d.position<a&&(a=d.position)}return l};this.execute=function(f){var e={},d=f.getPositionFilter(),n=f.getCursor(k),l=f.getCursorPosition(k),l=a-l-1,p=new Date(c),g,q,s,w,u;u=f.getDOM();g=u.createElementNS(odf.Namespaces.officens,"office:annotation");g.setAttributeNS(odf.Namespaces.officens,
"office:name",b);q=u.createElementNS(odf.Namespaces.dcns,"dc:creator");q.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",k);s=u.createElementNS(odf.Namespaces.dcns,"dc:date");s.appendChild(u.createTextNode(p.toISOString()));p=u.createElementNS(odf.Namespaces.textns,"text:list");w=u.createElementNS(odf.Namespaces.textns,"text:list-item");u=u.createElementNS(odf.Namespaces.textns,"text:p");w.appendChild(u);p.appendChild(w);g.appendChild(q);g.appendChild(s);g.appendChild(p);
e.node=g;if(!e.node)return!1;if(h){g=f.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");g.setAttributeNS(odf.Namespaces.officens,"office:name",b);e.end=g;if(!e.end)return!1;m(f,e.end,a+h)}m(f,e.node,a);n&&(g=n.getStepCounter(),d=0<l?g.countForwardSteps(l,d):0>l?-g.countBackwardSteps(-l,d):0,n.move(d),f.emit(ops.OdtDocument.signalCursorMoved,n));f.getOdfCanvas().addAnnotation(e);return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:k,timestamp:c,position:a,
length:h,name:b}}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("core.DomUtils");
ops.OpRemoveAnnotation=function(){var m,n,k,c,a;this.init=function(h){m=h.memberid;n=h.timestamp;k=parseInt(h.position,10);c=parseInt(h.length,10);a=new core.DomUtils};this.transform=function(a,b){return null};this.execute=function(c){for(var b=c.getIteratorAtPosition(k).container(),f,e=null,d=null;b.namespaceURI!==odf.Namespaces.officens||"annotation"!==b.localName;)b=b.parentNode;if(null===b)return!1;e=b;(f=e.getAttributeNS(odf.Namespaces.officens,"name"))&&(d=a.getElementsByTagNameNS(c.getRootNode(),
odf.Namespaces.officens,"annotation-end").filter(function(a){return f===a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);c.getOdfCanvas().forgetAnnotations();for(b=a.getElementsByTagNameNS(e,odf.Namespaces.webodfns+":names:cursor","cursor");b.length;)e.parentNode.insertBefore(b.pop(),e);e.parentNode.removeChild(e);d&&d.parentNode.removeChild(d);c.fixCursorPositions();c.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:m,timestamp:n,
position:k,length:c}}};
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
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpAddParagraphStyle");runtime.loadClass("ops.OpRemoveParagraphStyle");
runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");
ops.OperationFactory=function(){function m(k){return function(){return new k}}var n;this.register=function(k,c){n[k]=c};this.create=function(k){var c=null,a=n[k.optype];a&&(c=a(k),c.init(k));return c};n={AddCursor:m(ops.OpAddCursor),ApplyDirectStyling:m(ops.OpApplyDirectStyling),InsertTable:m(ops.OpInsertTable),InsertText:m(ops.OpInsertText),RemoveText:m(ops.OpRemoveText),SplitParagraph:m(ops.OpSplitParagraph),SetParagraphStyle:m(ops.OpSetParagraphStyle),UpdateParagraphStyle:m(ops.OpUpdateParagraphStyle),
AddParagraphStyle:m(ops.OpAddParagraphStyle),RemoveParagraphStyle:m(ops.OpRemoveParagraphStyle),MoveCursor:m(ops.OpMoveCursor),RemoveCursor:m(ops.OpRemoveCursor),AddAnnotation:m(ops.OpAddAnnotation),RemoveAnnotation:m(ops.OpRemoveAnnotation)}};
// Input 56
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(m,n){function k(){u.setUnfilteredPosition(m.getNode(),0);return u}function c(a,b){var c,d=null;a&&(c=b?a[a.length-1]:a[0]);c&&(d={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return d}function a(b,d,e,g){var f=b.nodeType;e.setStart(b,d);e.collapse(!g);g=c(e.getClientRects(),!0===g);!g&&0<d&&(e.setStart(b,d-1),e.setEnd(b,d),g=c(e.getClientRects(),!0));g||(f===Node.ELEMENT_NODE&&b.childNodes[d-1]?g=a(b,d-1,e,!0):b.nodeType===Node.TEXT_NODE&&0<d?g=a(b,d-1,e,!0):b.previousSibling?
g=a(b.previousSibling,b.previousSibling.nodeType===Node.TEXT_NODE?b.previousSibling.textContent.length:b.previousSibling.childNodes.length,e,!0):b.parentNode&&b.parentNode!==n?g=a(b.parentNode,0,e,!1):(e.selectNode(n),g=c(e.getClientRects(),!1)));runtime.assert(Boolean(g),"No visible rectangle found");return g}function h(b,c,d){var e=b,g=k(),f,h=n.ownerDocument.createRange(),l=m.getSelectedRange()?m.getSelectedRange().cloneRange():n.ownerDocument.createRange(),q,s=runtime.getWindow();for(f=a(g.container(),
g.unfilteredDomOffset(),h);0<e&&d();)e-=1;c?(c=g.container(),g=g.unfilteredDomOffset(),-1===l.comparePoint(c,g)?(l.setStart(c,g),q=!1):l.setEnd(c,g)):(l.setStart(g.container(),g.unfilteredDomOffset()),l.collapse(!0));m.setSelectedRange(l,q);g=k();l=a(g.container(),g.unfilteredDomOffset(),h);if(l.top===f.top||void 0===A)A=l.left;s.clearTimeout(x);x=s.setTimeout(function(){A=void 0},2E3);h.detach();return b-e}function b(a){var b=k();return a.acceptPosition(b)===r?!0:!1}function f(a,b){for(var c=k(),
d=new core.LoopWatchDog(1E3),e=0,g=0;0<a&&c.nextPosition();)e+=1,d.check(),b.acceptPosition(c)===r&&(g+=e,e=0,a-=1);return g}function e(a,b,c){for(var d=k(),e=new core.LoopWatchDog(1E3),g=0,f=0;0<a&&d.nextPosition();)e.check(),c.acceptPosition(d)===r&&(g+=1,b.acceptPosition(d)===r&&(f+=g,g=0,a-=1));return f}function d(a,b,c){for(var d=k(),e=new core.LoopWatchDog(1E3),g=0,f=0;0<a&&d.previousPosition();)e.check(),c.acceptPosition(d)===r&&(g+=1,b.acceptPosition(d)===r&&(f+=g,g=0,a-=1));return f}function t(a,
b){for(var c=k(),d=new core.LoopWatchDog(1E3),e=0,g=0;0<a&&c.previousPosition();)e+=1,d.check(),b.acceptPosition(c)===r&&(g+=e,e=0,a-=1);return g}function l(a){var b=k(),c=w.getParagraphElement(b.getCurrentNode()),d;d=-t(1,a);if(0===d||c&&c!==w.getParagraphElement(b.getCurrentNode()))d=f(1,a);return d}function p(b,c){var d=k(),e=0,g=0,f=0>b?-1:1;for(b=Math.abs(b);0<b;){for(var h=c,l=f,m=d,q=m.container(),s=0,p=null,u=void 0,t=10,w=void 0,x=0,V=void 0,S=void 0,M=void 0,w=void 0,H=n.ownerDocument.createRange(),
F=new core.LoopWatchDog(1E3),w=a(q,m.unfilteredDomOffset(),H),V=w.top,S=void 0===A?w.left:A,M=V;!0===(0>l?m.previousPosition():m.nextPosition());)if(F.check(),h.acceptPosition(m)===r&&(s+=1,q=m.container(),w=a(q,m.unfilteredDomOffset(),H),w.top!==V)){if(w.top!==M&&M!==V)break;M=w.top;w=Math.abs(S-w.left);if(null===p||w<t)p=q,u=m.unfilteredDomOffset(),t=w,x=s}null!==p?(m.setUnfilteredPosition(p,u),s=x):s=0;H.detach();e+=s;if(0===e)break;g+=e;b-=1}return g*f}function g(b,c){var d,e,g,f,h=k(),l=w.getParagraphElement(h.getCurrentNode()),
m=0,q=n.ownerDocument.createRange();0>b?(d=h.previousPosition,e=-1):(d=h.nextPosition,e=1);for(g=a(h.container(),h.unfilteredDomOffset(),q);d.call(h);)if(c.acceptPosition(h)===r){if(w.getParagraphElement(h.getCurrentNode())!==l)break;f=a(h.container(),h.unfilteredDomOffset(),q);if(f.bottom!==g.bottom&&(g=f.top>=g.top&&f.bottom<g.bottom||f.top<=g.top&&f.bottom>g.bottom,!g))break;m+=e;g=f}q.detach();return m}function q(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),
a=a.parentNode;for(d=b.firstChild;d!==a;)c+=1,d=d.nextSibling;return c}function s(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=k(),e=d.container(),g=d.unfilteredDomOffset(),f=0,h=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(e,g);var e=a,g=b,l=d.container(),
m=d.unfilteredDomOffset();if(e===l)e=m-g;else{var n=e.compareDocumentPosition(l);2===n?n=-1:4===n?n=1:10===n?(g=q(e,l),n=g<m?1:-1):(m=q(l,e),n=m<g?-1:1);e=n}if(0>e)for(;d.nextPosition()&&(h.check(),c.acceptPosition(d)===r&&(f+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&(h.check(),c.acceptPosition(d)===r&&(f-=1),d.container()!==a||d.unfilteredDomOffset()!==b););return f}var w,u,A,x,r=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=
function(a,b){return h(a,b,u.nextPosition)};this.movePointBackward=function(a,b){return h(a,b,u.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:f,countBackwardSteps:t,convertForwardStepsBetweenFilters:e,convertBackwardStepsBetweenFilters:d,countLinesSteps:p,countStepsToLineBoundary:g,countStepsToPosition:s,isPositionWalkable:b,countStepsToValidPosition:l}};(function(){w=new odf.OdfUtils;u=gui.SelectionMover.createPositionIterator(n);var a=n.ownerDocument.createRange();a.setStart(u.container(),
u.unfilteredDomOffset());a.collapse(!0);m.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(m){var n=new function(){this.acceptNode=function(k){return"urn:webodf:names:cursor"===k.namespaceURI||"urn:webodf:names:editinfo"===k.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(m,5,n,!1)};(function(){return gui.SelectionMover})();
// Input 57
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
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpAddParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpRemoveParagraphStyle");
ops.OperationTransformer=function(){function m(k,c){for(var a,h,b,f=[],e=[];0<k.length&&c;){a=k.shift();h=c;var d=void 0;b=d=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(a.spec()));runtime.log(runtime.toJson(h.spec()));d=n.create(h.spec());b=h.transform(a,!0);h=(d=a.transform(d,!1))&&b?{opsA:d,opsB:b}:null;if(!h)return null;f=f.concat(h.opsA);if(0===h.opsB.length){f=f.concat(k);c=null;break}if(1<h.opsB.length)for(a=0;a<h.opsB.length-1;a+=1){b=m(k,h.opsB[a]);if(!b)return null;
e=e.concat(b.opsB);k=b.opsA}c=h.opsB.pop()}c&&e.push(c);return{opsA:f,opsB:e}}var n;this.setOperationFactory=function(k){n=k};this.transform=function(k,c){var a,h=[],b,f=[];for(a=0;a<k.length;a+=1){b=n.create(k[a]);if(!b)return null;h.push(b)}for(a=0;a<c.length;a+=1){b=n.create(c[a]);b=m(h,b);if(!b)return null;h=b.opsA;f=f.concat(b.opsB)}return{opsA:h,opsB:f}}};
// Input 58
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(m,n){var k=this,c,a;this.removeFromOdtDocument=function(){a.remove()};this.move=function(a,b){var f=0;0<a?f=c.movePointForward(a,b):0>=a&&(f=-c.movePointBackward(-a,b));k.handleUpdate();return f};this.handleUpdate=function(){};this.getStepCounter=function(){return c.getStepCounter()};this.getMemberId=function(){return m};this.getNode=function(){return a.getNode()};this.getAnchorNode=function(){return a.getAnchorNode()};this.getSelectedRange=function(){return a.getSelectedRange()};
this.getOdtDocument=function(){return n};a=new core.Cursor(n.getDOM(),m);c=new gui.SelectionMover(a,n.getRootNode())};
// Input 59
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
ops.EditInfo=function(m,n){function k(){var c=[],b;for(b in a)a.hasOwnProperty(b)&&c.push({memberid:b,time:a[b].time});c.sort(function(a,b){return a.time-b.time});return c}var c,a={};this.getNode=function(){return c};this.getOdtDocument=function(){return n};this.getEdits=function(){return a};this.getSortedEdits=function(){return k()};this.addEdit=function(c,b){a[c]={time:b}};this.clearEdits=function(){a={}};this.destroy=function(a){m.removeChild(c);a()};c=n.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");m.insertBefore(c,m.firstChild)};
// Input 60
gui.Avatar=function(m,n){var k=this,c,a,h;this.setColor=function(b){a.style.borderColor=b};this.setImageUrl=function(b){k.isVisible()?a.src=b:h=b};this.isVisible=function(){return"block"===c.style.display};this.show=function(){h&&(a.src=h,h=void 0);c.style.display="block"};this.hide=function(){c.style.display="none"};this.markAsFocussed=function(a){c.className=a?"active":""};this.destroy=function(a){m.removeChild(c);a()};(function(){var b=m.ownerDocument,f=b.documentElement.namespaceURI;c=b.createElementNS(f,
"div");a=b.createElementNS(f,"img");a.width=64;a.height=64;c.appendChild(a);c.style.width="64px";c.style.height="70px";c.style.position="absolute";c.style.top="-80px";c.style.left="-34px";c.style.display=n?"block":"none";m.appendChild(c)})()};
// Input 61
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(m,n,k){function c(h){f&&b.parentNode&&(!e||h)&&(h&&void 0!==d&&runtime.clearTimeout(d),e=!0,a.style.opacity=h||"0"===a.style.opacity?"1":"0",d=runtime.setTimeout(function(){e=!1;c(!1)},500))}var a,h,b,f=!1,e=!1,d;this.refreshCursorBlinking=function(){k||m.getSelectedRange().collapsed?(f=!0,c(!0)):(f=!1,a.style.opacity="0")};this.setFocus=function(){f=!0;h.markAsFocussed(!0);c(!0)};this.removeFocus=function(){f=!1;h.markAsFocussed(!1);a.style.opacity="0"};this.setAvatarImageUrl=
function(a){h.setImageUrl(a)};this.setColor=function(b){a.style.borderColor=b;h.setColor(b)};this.getCursor=function(){return m};this.getFocusElement=function(){return a};this.toggleHandleVisibility=function(){h.isVisible()?h.hide():h.show()};this.showHandle=function(){h.show()};this.hideHandle=function(){h.hide()};this.ensureVisible=function(){var b,c,d,e,f=m.getOdtDocument().getOdfCanvas().getElement().parentNode,h;d=f.offsetWidth-f.clientWidth+5;e=f.offsetHeight-f.clientHeight+5;h=a.getBoundingClientRect();
b=h.left-d;c=h.top-e;d=h.right+d;e=h.bottom+e;h=f.getBoundingClientRect();c<h.top?f.scrollTop-=h.top-c:e>h.bottom&&(f.scrollTop+=e-h.bottom);b<h.left?f.scrollLeft-=h.left-b:d>h.right&&(f.scrollLeft+=d-h.right)};this.destroy=function(c){h.destroy(function(d){d?c(d):(b.removeChild(a),c())})};(function(){var c=m.getOdtDocument().getDOM();a=c.createElementNS(c.documentElement.namespaceURI,"span");b=m.getNode();b.appendChild(a);h=new gui.Avatar(b,n)})()};
// Input 62
runtime.loadClass("core.EventNotifier");
gui.ClickHandler=function(){function m(){k=0;c=null}var n,k=0,c=null,a=new core.EventNotifier([gui.ClickHandler.signalSingleClick,gui.ClickHandler.signalDoubleClick,gui.ClickHandler.signalTripleClick]);this.subscribe=function(c,b){a.subscribe(c,b)};this.handleMouseUp=function(h){var b=runtime.getWindow();c&&c.x===h.screenX&&c.y===h.screenY?(k+=1,1===k?a.emit(gui.ClickHandler.signalSingleClick,h):2===k?a.emit(gui.ClickHandler.signalDoubleClick,void 0):3===k&&(b.clearTimeout(n),a.emit(gui.ClickHandler.signalTripleClick,
void 0),m())):(a.emit(gui.ClickHandler.signalSingleClick,h),k=1,c={x:h.screenX,y:h.screenY},b.clearTimeout(n),n=b.setTimeout(m,400))}};gui.ClickHandler.signalSingleClick="click";gui.ClickHandler.signalDoubleClick="doubleClick";gui.ClickHandler.signalTripleClick="tripleClick";(function(){return gui.ClickHandler})();
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
gui.KeyboardHandler=function(){function m(a,c){c||(c=n.None);return a+":"+c}var n=gui.KeyboardHandler.Modifier,k=null,c={};this.setDefault=function(a){k=a};this.bind=function(a,h,b){a=m(a,h);runtime.assert(!1===c.hasOwnProperty(a),"tried to overwrite the callback handler of key combo: "+a);c[a]=b};this.unbind=function(a,h){var b=m(a,h);delete c[b]};this.reset=function(){k=null;c={}};this.handleEvent=function(a){var h=a.keyCode,b=n.None;a.metaKey&&(b|=n.Meta);a.ctrlKey&&(b|=n.Ctrl);a.altKey&&(b|=n.Alt);
a.shiftKey&&(b|=n.Shift);h=m(h,b);h=c[h];b=!1;h?b=h():null!==k&&(b=k(a));b&&(a.preventDefault?a.preventDefault():a.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,I:73,U:85,Z:90};(function(){return gui.KeyboardHandler})();
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
gui.Clipboard=function(){var m,n,k;this.setDataFromRange=function(c,a){var h=!0,b,f=c.clipboardData;b=runtime.getWindow();var e=a.startContainer.ownerDocument;!f&&b&&(f=b.clipboardData);f?(e=e.createElement("span"),e.appendChild(a.cloneContents()),b=f.setData("text/plain",n.writeToString(e)),h=h&&b,b=f.setData("text/html",m.writeToString(e,odf.Namespaces.namespaceMap)),h=h&&b,c.preventDefault()):h=!1;return h};m=new xmldom.LSSerializer;n=new odf.TextSerializer;k=new odf.OdfNodeFilter;m.filter=k;n.filter=
k};
// Input 65
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.ClickHandler");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");
runtime.loadClass("gui.StyleHelper");
gui.SessionController=function(){gui.SessionController=function(m,n){function k(a,b,c,d){var e="on"+b,g=!1;a.attachEvent&&(g=a.attachEvent(e,c));!g&&a.addEventListener&&(a.addEventListener(b,c,!1),g=!0);g&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function c(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function a(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function h(a,b){var c=new ops.OpMoveCursor;c.init({memberid:n,
position:a,length:b||0});return c}function b(a,b){var c=gui.SelectionMover.createPositionIterator(B.getRootNode()),d=B.getOdfCanvas().getElement(),e;e=a;if(!e)return null;for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return null;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,b);return B.getDistanceFromCursor(n,c.container(),
c.unfilteredDomOffset())}function f(a){var b=B.getOdfCanvas().getElement(),c=B.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function e(a){ga&&runtime.setTimeout(function(){var c;a:{var d=B.getOdfCanvas().getElement(),e=$.getSelection(),g,l,k,q;if(null===e.anchorNode&&null===e.focusNode){c=a.clientX;g=a.clientY;l=B.getDOM();l.caretRangeFromPoint?
(c=l.caretRangeFromPoint(c,g),g={container:c.startContainer,offset:c.startOffset}):l.caretPositionFromPoint?(c=l.caretPositionFromPoint(c,g),g={container:c.offsetNode,offset:c.offset}):g=null;if(!g){c=null;break a}c=g.container;g=g.offset;l=c;e=g}else c=e.anchorNode,g=e.anchorOffset,l=e.focusNode,e=e.focusOffset;runtime.assert(null!==c&&null!==l,"anchorNode is null or focusNode is null");k=sa.containsNode(d,c);q=sa.containsNode(d,l);k||q?(k||(k=f(c),c=k.node,g=k.offset),q||(k=f(l),l=k.node,e=k.offset),
d.focus(),c={anchorNode:c,anchorOffset:g,focusNode:l,focusOffset:e}):c=null}null!==c&&(d=b(c.anchorNode,c.anchorOffset),g=c.focusNode===c.anchorNode&&c.focusOffset===c.anchorOffset?d:b(c.focusNode,c.focusOffset),null!==g&&0!==g||null!==d&&0!==d)&&(c=B.getCursorPosition(n),d=h(c+d,g-d),m.enqueue(d))},0)}function d(a){e(a)}function t(){var a=B.getOdfCanvas().getElement(),b=/[A-Za-z0-9]/,c=0,d=0,e,g;if(sa.containsNode(a,$.getSelection().focusNode)){a=gui.SelectionMover.createPositionIterator(B.getRootNode());
e=B.getCursor(n).getNode();for(a.setUnfilteredPosition(e,0);a.previousPosition();)if(g=a.getCurrentNode(),g.nodeType===Node.TEXT_NODE){g=g.data[a.unfilteredDomOffset()];if(!b.test(g))break;c-=1}else if(g.namespaceURI!==odf.Namespaces.textns||"span"!==g.localName)break;a.setUnfilteredPosition(e,0);do if(g=a.getCurrentNode(),g.nodeType===Node.TEXT_NODE){g=g.data[a.unfilteredDomOffset()];if(!b.test(g))break;d+=1}else if(g.namespaceURI!==odf.Namespaces.textns||"span"!==g.localName)break;while(a.nextPosition());
if(0!==c||0!==d)b=B.getCursorPosition(n),c=h(b+c,Math.abs(c)+Math.abs(d)),m.enqueue(c)}}function l(){var a=B.getOdfCanvas().getElement(),b,c;sa.containsNode(a,$.getSelection().focusNode)&&(c=B.getParagraphElement(B.getCursor(n).getNode()),a=B.getDistanceFromCursor(n,c,0),b=gui.SelectionMover.createPositionIterator(B.getRootNode()),b.moveToEndOfNode(c),c=B.getDistanceFromCursor(n,c,b.unfilteredDomOffset()),0!==a||0!==c)&&(b=B.getCursorPosition(n),a=h(b+a,Math.abs(a)+Math.abs(c)),m.enqueue(a))}function p(a){var b=
B.getCursorSelection(n),c=B.getCursor(n).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,na,pa):-c.convertBackwardStepsBetweenFilters(-a,na,pa),a=b.length+a,m.enqueue(h(b.position,a)))}function g(a){var b=B.getCursorPosition(n),c=B.getCursor(n).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,na,pa):-c.convertBackwardStepsBetweenFilters(-a,na,pa),m.enqueue(h(b+a,0)))}function q(){g(-1);return!0}function s(){g(1);return!0}function w(){p(-1);return!0}function u(){p(1);
return!0}function A(a,b){var c=B.getParagraphElement(B.getCursor(n).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=B.getCursor(n).getStepCounter().countLinesSteps(a,na);b?p(c):g(c)}function x(){A(-1,!1);return!0}function r(){A(1,!1);return!0}function v(){A(-1,!0);return!0}function D(){A(1,!0);return!0}function G(a,b){var c=B.getCursor(n).getStepCounter().countStepsToLineBoundary(a,na);b?p(c):g(c)}function y(){G(-1,!1);return!0}function P(){G(1,!1);return!0}function z(){G(-1,
!0);return!0}function R(){G(1,!0);return!0}function E(){var a=B.getParagraphElement(B.getCursor(n).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");c=B.getDistanceFromCursor(n,a,0);b=gui.SelectionMover.createPositionIterator(B.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),ya.isParagraph(a)&&(c=B.getDistanceFromCursor(n,a,0));p(c);return!0}function K(){var a=B.getParagraphElement(B.getCursor(n).getNode()),b,
c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(B.getRootNode());b.moveToEndOfNode(a);for(c=B.getDistanceFromCursor(n,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),ya.isParagraph(a)&&(b.moveToEndOfNode(a),c=B.getDistanceFromCursor(n,b.container(),b.unfilteredDomOffset()));p(c);return!0}function X(a,b){var c=gui.SelectionMover.createPositionIterator(B.getRootNode());0<a&&c.moveToEnd();c=B.getDistanceFromCursor(n,
c.container(),c.unfilteredDomOffset());b?p(c):g(c)}function oa(){X(-1,!1);return!0}function L(){X(1,!1);return!0}function ra(){X(-1,!0);return!0}function aa(){X(1,!0);return!0}function ea(){var a=gui.SelectionMover.createPositionIterator(B.getRootNode()),b;b=-B.getDistanceFromCursor(n,a.container(),a.unfilteredDomOffset());a.moveToEnd();b+=B.getDistanceFromCursor(n,a.container(),a.unfilteredDomOffset());m.enqueue(h(0,b));return!0}function O(a){0>a.length&&(a.position+=a.length,a.length=-a.length);
return a}function V(a){var b=new ops.OpRemoveText;b.init({memberid:n,position:a.position,length:a.length});return b}function S(){var a=O(B.getCursorSelection(n)),b=null;0===a.length?0<a.position&&B.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:n,position:a.position-1,length:1}),m.enqueue(b)):(b=V(a),m.enqueue(b));return!0}function M(){var a=O(B.getCursorSelection(n)),b=null;0===a.length?B.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:n,
position:a.position,length:1}),m.enqueue(b)):(b=V(a),m.enqueue(b));return null!==b}function H(){var a=O(B.getCursorSelection(n));0!==a.length&&m.enqueue(V(a));return!0}function F(a){var b=O(B.getCursorSelection(n)),c=null;0<b.length&&(c=V(b),m.enqueue(c));c=new ops.OpInsertText;c.init({memberid:n,position:b.position,text:a});m.enqueue(c)}function I(){var a=B.getCursorPosition(n),b;b=new ops.OpSplitParagraph;b.init({memberid:n,position:a});m.enqueue(b);return!0}function Q(){var a=B.getCursor(n),b=
$.getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function ba(a){var b=B.getCursor(n);b.getSelectedRange().collapsed||(ta.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=O(m.getOdtDocument().getCursorSelection(n)),b.init({memberid:n,position:a.position,length:a.length}),m.enqueue(b)):runtime.log("Cut operation failed"))}function fa(){return!1!==B.getCursor(n).getSelectedRange().collapsed}function N(a){var b=B.getCursor(n);b.getSelectedRange().collapsed||
ta.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function ca(a){var b;$.clipboardData&&$.clipboardData.getData?b=$.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(F(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function ha(){return!1}function C(a){if(Y)Y.onOperationExecuted(a)}function ka(a){B.emit(ops.OdtDocument.signalUndoStackChanged,a)}function ia(){return Y?(Y.moveBackward(1),Q(),
!0):!1}function T(){return Y?(Y.moveForward(1),Q(),!0):!1}function ja(a,b){var c=B.getCursorSelection(n),d=new ops.OpApplyDirectStyling,e={};e[a]=b;d.init({memberid:n,position:c.position,length:c.length,setProperties:{"style:text-properties":e}});m.enqueue(d)}function la(){var a=B.getCursor(n).getSelectedRange(),a=va.isBold(a)?"normal":"bold";ja("fo:font-weight",a);return!0}function U(){var a=B.getCursor(n).getSelectedRange(),a=va.isItalic(a)?"normal":"italic";ja("fo:font-style",a);return!0}function ma(){var a=
B.getCursor(n).getSelectedRange(),a=va.hasUnderline(a)?"none":"solid";ja("style:text-underline-style",a);return!0}function W(a){ga=a.target&&sa.containsNode(B.getOdfCanvas().getElement(),a.target)}var $=runtime.getWindow(),B=m.getOdtDocument(),sa=new core.DomUtils,ya=new odf.OdfUtils,ta=new gui.Clipboard,xa=new gui.ClickHandler,J=new gui.KeyboardHandler,ua=new gui.KeyboardHandler,va=new gui.StyleHelper(B.getFormatting()),na=new core.PositionFilterChain,pa=B.getPositionFilter(),ga=!1,Y=null;runtime.assert(null!==
$,"Expected to be run in an environment which has a global window, like a browser.");na.addFilter("BaseFilter",pa);na.addFilter("RootFilter",B.createRootFilter(n));this.startEditing=function(){var b;b=B.getOdfCanvas().getElement();k(b,"keydown",J.handleEvent);k(b,"keypress",ua.handleEvent);k(b,"keyup",a);k(b,"beforecut",fa,!0);k(b,"cut",ba);k(b,"copy",N);k(b,"beforepaste",ha,!0);k(b,"paste",ca);k($,"mousedown",W);k($,"mouseup",xa.handleMouseUp);k(b,"contextmenu",d);B.subscribe(ops.OdtDocument.signalOperationExecuted,
Q);B.subscribe(ops.OdtDocument.signalOperationExecuted,C);b=new ops.OpAddCursor;b.init({memberid:n});m.enqueue(b);Y&&Y.saveInitialState()};this.endEditing=function(){var b;B.unsubscribe(ops.OdtDocument.signalOperationExecuted,C);B.unsubscribe(ops.OdtDocument.signalOperationExecuted,Q);b=B.getOdfCanvas().getElement();c(b,"keydown",J.handleEvent);c(b,"keypress",ua.handleEvent);c(b,"keyup",a);c(b,"cut",ba);c(b,"beforecut",fa);c(b,"copy",N);c(b,"paste",ca);c(b,"beforepaste",ha);c($,"mousedown",W);c($,
"mouseup",xa.handleMouseUp);c(b,"contextmenu",d);b=new ops.OpRemoveCursor;b.init({memberid:n});m.enqueue(b);Y&&Y.resetInitialState()};this.getInputMemberId=function(){return n};this.getSession=function(){return m};this.setUndoManager=function(a){Y&&Y.unsubscribe(gui.UndoManager.signalUndoStackChanged,ka);if(Y=a)Y.setOdtDocument(B),Y.setPlaybackFunction(function(a){a.execute(B)}),Y.subscribe(gui.UndoManager.signalUndoStackChanged,ka)};this.getUndoManager=function(){return Y};this.destroy=function(a){a()};
(function(){var a=-1!==$.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;J.bind(c.Tab,b.None,function(){F("\t");return!0});J.bind(c.Left,b.None,q);J.bind(c.Right,b.None,s);J.bind(c.Up,b.None,x);J.bind(c.Down,b.None,r);J.bind(c.Backspace,b.None,S);J.bind(c.Delete,b.None,M);J.bind(c.Left,b.Shift,w);J.bind(c.Right,b.Shift,u);J.bind(c.Up,b.Shift,v);J.bind(c.Down,b.Shift,D);J.bind(c.Home,b.None,y);J.bind(c.End,b.None,P);J.bind(c.Home,b.Ctrl,
oa);J.bind(c.End,b.Ctrl,L);J.bind(c.Home,b.Shift,z);J.bind(c.End,b.Shift,R);J.bind(c.Up,b.CtrlShift,E);J.bind(c.Down,b.CtrlShift,K);J.bind(c.Home,b.CtrlShift,ra);J.bind(c.End,b.CtrlShift,aa);a?(J.bind(c.Clear,b.None,H),J.bind(c.Left,b.Meta,y),J.bind(c.Right,b.Meta,P),J.bind(c.Home,b.Meta,oa),J.bind(c.End,b.Meta,L),J.bind(c.Left,b.MetaShift,z),J.bind(c.Right,b.MetaShift,R),J.bind(c.Up,b.AltShift,E),J.bind(c.Down,b.AltShift,K),J.bind(c.Up,b.MetaShift,ra),J.bind(c.Down,b.MetaShift,aa),J.bind(c.A,b.Meta,
ea),J.bind(c.B,b.Meta,la),J.bind(c.I,b.Meta,U),J.bind(c.U,b.Meta,ma),J.bind(c.Z,b.Meta,ia),J.bind(c.Z,b.MetaShift,T)):(J.bind(c.A,b.Ctrl,ea),J.bind(c.B,b.Ctrl,la),J.bind(c.I,b.Ctrl,U),J.bind(c.U,b.Ctrl,ma),J.bind(c.Z,b.Ctrl,ia),J.bind(c.Z,b.CtrlShift,T));ua.setDefault(function(a){var b;b=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(F(b),!0)});ua.bind(c.Enter,b.None,I);xa.subscribe(gui.ClickHandler.signalSingleClick,
function(a){var b=a.target,c=null;if("annotationRemoveButton"===b.className){a=c=sa.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0];for(var b=0,c=gui.SelectionMover.createPositionIterator(B.getRootNode()),d=new core.LoopWatchDog(1E3),g=!1;c.nextPosition();)if(d.check(),g=Boolean(a.compareDocumentPosition(c.container())&Node.DOCUMENT_POSITION_CONTAINED_BY),1===pa.acceptPosition(c)){if(g)break;b+=1}c=0;d=gui.SelectionMover.createPositionIterator(B.getRootNode());g=!1;d.setUnfilteredPosition(a,
0);do{g=Boolean(a.compareDocumentPosition(d.container())&Node.DOCUMENT_POSITION_CONTAINED_BY);if(!g&&a!==d.container())break;1===pa.acceptPosition(d)&&(c+=1)}while(d.nextPosition());a=c;c=new ops.OpRemoveAnnotation;c.init({memberid:n,position:b,length:a});m.enqueue(c)}else e(a)});xa.subscribe(gui.ClickHandler.signalDoubleClick,t);xa.subscribe(gui.ClickHandler.signalTripleClick,l)})()};return gui.SessionController}();
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
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
ops.MemberModel=function(){};ops.MemberModel.prototype.getMemberDetailsAndUpdates=function(m,n){};ops.MemberModel.prototype.unsubscribeMemberDetailsUpdates=function(m,n){};ops.MemberModel.prototype.close=function(m){};
// Input 67
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
ops.TrivialMemberModel=function(){this.getMemberDetailsAndUpdates=function(m,n){n(m,null)};this.unsubscribeMemberDetailsUpdates=function(m,n){};this.close=function(m){m()}};
// Input 68
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(m){};ops.OperationRouter.prototype.setPlaybackFunction=function(m){};ops.OperationRouter.prototype.push=function(m){};ops.OperationRouter.prototype.close=function(m){};ops.OperationRouter.prototype.getHasLocalUnsyncedOpsAndUpdates=function(m){};ops.OperationRouter.prototype.unsubscribeHasLocalUnsyncedOpsUpdates=function(m){};
// Input 69
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
ops.TrivialOperationRouter=function(){var m,n;this.setOperationFactory=function(k){m=k};this.setPlaybackFunction=function(k){n=k};this.push=function(k){k=k.spec();k.timestamp=(new Date).getTime();k=m.create(k);n(k)};this.close=function(k){k()};this.getHasLocalUnsyncedOpsAndUpdates=function(k){k(!0)};this.unsubscribeHasLocalUnsyncedOpsUpdates=function(k){}};
// Input 70
gui.EditInfoHandle=function(m){var n=[],k,c=m.ownerDocument,a=c.documentElement.namespaceURI;this.setEdits=function(h){n=h;var b,f,e,d;k.innerHTML="";for(h=0;h<n.length;h+=1)b=c.createElementNS(a,"div"),b.className="editInfo",f=c.createElementNS(a,"span"),f.className="editInfoColor",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",n[h].memberid),e=c.createElementNS(a,"span"),e.className="editInfoAuthor",e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",n[h].memberid),
d=c.createElementNS(a,"span"),d.className="editInfoTime",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",n[h].memberid),d.innerHTML=n[h].time,b.appendChild(f),b.appendChild(e),b.appendChild(d),k.appendChild(b)};this.show=function(){k.style.display="block"};this.hide=function(){k.style.display="none"};this.destroy=function(a){m.removeChild(k);a()};k=c.createElementNS(a,"div");k.setAttribute("class","editInfoHandle");k.style.display="none";m.appendChild(k)};
// Input 71
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
gui.EditInfoMarker=function(m,n){function k(a,c){return runtime.getWindow().setTimeout(function(){b.style.opacity=a},c)}var c=this,a,h,b,f,e;this.addEdit=function(a,c){var l=Date.now()-c;m.addEdit(a,c);h.setEdits(m.getSortedEdits());b.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);if(f){var n=f;runtime.getWindow().clearTimeout(n)}e&&(n=e,runtime.getWindow().clearTimeout(n));1E4>l?(k(1,0),f=k(0.5,1E4-l),e=k(0.2,2E4-l)):1E4<=l&&2E4>l?(k(0.5,0),e=k(0.2,2E4-l)):k(0.2,0)};this.getEdits=
function(){return m.getEdits()};this.clearEdits=function(){m.clearEdits();h.setEdits([]);b.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&b.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return m};this.show=function(){b.style.display="block"};this.hide=function(){c.hideHandle();b.style.display="none"};this.showHandle=function(){h.show()};this.hideHandle=function(){h.hide()};this.destroy=function(c){a.removeChild(b);h.destroy(function(a){a?
c(a):m.destroy(c)})};(function(){var d=m.getOdtDocument().getDOM();b=d.createElementNS(d.documentElement.namespaceURI,"div");b.setAttribute("class","editInfoMarker");b.onmouseover=function(){c.showHandle()};b.onmouseout=function(){c.hideHandle()};a=m.getNode();a.appendChild(b);h=new gui.EditInfoHandle(a);n||c.hide()})()};
// Input 72
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
gui.SessionView=function(){return function(m,n,k){function c(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid^="'+a+'"]'+e+c;a:{var g=t.firstChild;for(b=b+'[editinfo|memberid^="'+a+'"]'+e;g;){if(g.nodeType===Node.TEXT_NODE&&0===g.data.indexOf(b)){b=g;break a}g=g.nextSibling}b=null}b?b.data=c:t.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","")}function a(a){var b,c;for(c in p)p.hasOwnProperty(c)&&(b=p[c],a?b.show():b.hide())}function h(a){k.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function b(a,b){var d=k.getCaret(a);void 0===b?runtime.log('MemberModel sent undefined data for member "'+a+'".'):(null===b&&(b={memberid:a,fullname:"Unknown Identity",color:"black",imageurl:"avatar-joe.png"}),d&&(d.setAvatarImageUrl(b.imageurl),
d.setColor(b.color)),c(a,b.fullname,b.color))}function f(a){var c=a.getMemberId(),d=n.getMemberModel();k.registerCursor(a,q,s);b(c,null);d.getMemberDetailsAndUpdates(c,b);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function e(a){var c=!1,d;for(d in p)if(p.hasOwnProperty(d)&&p[d].getEditInfo().getEdits().hasOwnProperty(a)){c=!0;break}c||n.getMemberModel().unsubscribeMemberDetailsUpdates(a,b)}function d(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",
f=b.getElementsByTagNameNS(l,"editinfo")[0];f?(e=f.getAttributeNS(l,"id"),d=p[e]):(e=Math.random().toString(),d=new ops.EditInfo(b,n.getOdtDocument()),d=new gui.EditInfoMarker(d,g),f=b.getElementsByTagNameNS(l,"editinfo")[0],f.setAttributeNS(l,"id",e),p[e]=d);d.addEdit(c,new Date(a))}var t,l="urn:webodf:names:editinfo",p={},g=void 0!==m.editInfoMarkersInitiallyVisible?Boolean(m.editInfoMarkersInitiallyVisible):!0,q=void 0!==m.caretAvatarsInitiallyVisible?Boolean(m.caretAvatarsInitiallyVisible):!0,
s=void 0!==m.caretBlinksOnRangeSelect?Boolean(m.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=function(){g||(g=!0,a(g))};this.hideEditInfoMarkers=function(){g&&(g=!1,a(g))};this.showCaretAvatars=function(){q||(q=!0,h(q))};this.hideCaretAvatars=function(){q&&(q=!1,h(q))};this.getSession=function(){return n};this.getCaret=function(a){return k.getCaret(a)};this.destroy=function(a){var c=n.getOdtDocument(),g=n.getMemberModel(),h=Object.keys(p).map(function(a){return p[a]});c.subscribe(ops.OdtDocument.signalCursorAdded,
f);c.subscribe(ops.OdtDocument.signalCursorRemoved,e);c.subscribe(ops.OdtDocument.signalParagraphChanged,d);k.getCarets().forEach(function(a){g.unsubscribeMemberDetailsUpdates(a.getCursor().getMemberId(),b)});t.parentNode.removeChild(t);(function v(b,c){c?a(c):b<h.length?h[b].destroy(function(a){v(b+1,a)}):a()})(0,void 0)};(function(){var a=n.getOdtDocument(),b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,f);a.subscribe(ops.OdtDocument.signalCursorRemoved,
e);a.subscribe(ops.OdtDocument.signalParagraphChanged,d);t=document.createElementNS(b.namespaceURI,"style");t.type="text/css";t.media="screen, print, handheld, projection";t.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));t.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(t)})()}}();
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
runtime.loadClass("gui.Caret");
gui.CaretManager=function(m){function n(a){return d.hasOwnProperty(a)?d[a]:null}function k(){return Object.keys(d).map(function(a){return d[a]})}function c(){return m.getSession().getOdtDocument().getOdfCanvas().getElement()}function a(a){a===m.getInputMemberId()&&c().removeAttribute("tabindex");delete d[a]}function h(a){a=a.getMemberId();a===m.getInputMemberId()&&(a=n(a))&&a.refreshCursorBlinking()}function b(a){a.memberId===m.getInputMemberId()&&(a=n(a.memberId))&&a.ensureVisible()}function f(){var a=
n(m.getInputMemberId());a&&a.setFocus()}function e(){var a=n(m.getInputMemberId());a&&a.removeFocus()}var d={};this.registerCursor=function(a,b,e){var g=a.getMemberId(),f=c();b=new gui.Caret(a,b,e);d[g]=b;g===m.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+g),a.handleUpdate=b.ensureVisible,f.setAttribute("tabindex",0),f.focus());return b};this.getCaret=n;this.getCarets=k;this.destroy=function(d){var e=m.getSession().getOdtDocument(),f=c(),g=k();e.unsubscribe(ops.OdtDocument.signalParagraphChanged,
b);e.unsubscribe(ops.OdtDocument.signalCursorMoved,h);e.unsubscribe(ops.OdtDocument.signalCursorRemoved,a);f.onfocus=null;f.onblur=null;(function s(a,b){b?d(b):a<g.length?g[a].destroy(function(b){s(a+1,b)}):d()})(0,void 0)};(function(){var d=m.getSession().getOdtDocument(),l=c();d.subscribe(ops.OdtDocument.signalParagraphChanged,b);d.subscribe(ops.OdtDocument.signalCursorMoved,h);d.subscribe(ops.OdtDocument.signalCursorRemoved,a);l.onfocus=f;l.onblur=e})()};
// Input 74
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var m=new xmldom.XPath,n=runtime.getWindow();return function(k){var c=this;c.setInitialSlideMode=function(){c.startSlideMode("single")};c.keyDownHandler=function(a){if(!a.target.isContentEditable&&"input"!==a.target.nodeName)switch(a.keyCode){case 84:c.toggleToolbar();break;case 37:case 8:c.prevSlide();break;case 39:case 32:c.nextSlide();break;case 36:c.firstSlide();break;case 35:c.lastSlide()}};c.root=function(){return c.odf_canvas.odfContainer().rootElement};c.firstSlide=
function(){c.slideChange(function(a,c){return 0})};c.lastSlide=function(){c.slideChange(function(a,c){return c-1})};c.nextSlide=function(){c.slideChange(function(a,c){return a+1<c?a+1:-1})};c.prevSlide=function(){c.slideChange(function(a,c){return 1>a?-1:a-1})};c.slideChange=function(a){var h=c.getPages(c.odf_canvas.odfContainer().rootElement),b=-1,f=0;h.forEach(function(a){a=a[1];a.hasAttribute("slide_current")&&(b=f,a.removeAttribute("slide_current"));f+=1});a=a(b,h.length);-1===a&&(a=b);h[a][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=a;"cont"===c.slide_mode&&n.scrollBy(0,h[a][1].getBoundingClientRect().top-30)};c.selectSlide=function(a){c.slideChange(function(c,b){return a>=b||0>a?-1:a})};c.scrollIntoContView=function(a){var h=c.getPages(c.odf_canvas.odfContainer().rootElement);0!==h.length&&n.scrollBy(0,h[a][1].getBoundingClientRect().top-30)};c.getPages=function(a){a=a.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var c=[],b;for(b=0;b<a.length;b+=1)c.push([a[b].getAttribute("draw:name"),
a[b]]);return c};c.fillPageList=function(a,h){for(var b=c.getPages(a),f,e,d;h.firstChild;)h.removeChild(h.firstChild);for(f=0;f<b.length;f+=1)e=document.createElement("option"),d=m.getODFElementsWithXPath(b[f][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),d=0<d.length?d[0].textContent:b[f][0],e.textContent=f+1+": "+d,h.appendChild(e)};c.startSlideMode=function(a){var h=document.getElementById("pagelist"),b=c.odf_canvas.slidevisibilitycss().sheet;for(c.slide_mode=
a;0<b.cssRules.length;)b.deleteRule(0);c.selectSlide(0);"single"===c.slide_mode?(b.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),b.insertRule("draw|page[slide_current]  { z-index:2;}",1),b.insertRule("draw|page  { -webkit-transform: scale(1);}",2),c.fitToWindow(),n.addEventListener("resize",c.fitToWindow,!1)):"cont"===c.slide_mode&&n.removeEventListener("resize",c.fitToWindow,!1);c.fillPageList(c.odf_canvas.odfContainer().rootElement,h)};c.toggleToolbar=function(){var a,
h,b;a=c.odf_canvas.slidevisibilitycss().sheet;h=-1;for(b=0;b<a.cssRules.length;b+=1)if(".toolbar"===a.cssRules[b].cssText.substring(0,8)){h=b;break}-1<h?a.deleteRule(h):a.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};c.fitToWindow=function(){var a=c.getPages(c.root()),h=(n.innerHeight-40)/a[0][1].clientHeight,a=(n.innerWidth-10)/a[0][1].clientWidth,h=h<a?h:a,a=c.odf_canvas.slidevisibilitycss().sheet;a.deleteRule(2);a.insertRule("draw|page { \n-moz-transform: scale("+
h+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+h+"); -o-transform-origin: 0% 0%; -o-transform: scale("+h+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+h+"); }",2)};c.load=function(a){c.odf_canvas.load(a)};c.odf_element=k;c.odf_canvas=new odf.OdfCanvas(c.odf_element);c.odf_canvas.addListener("statereadychange",c.setInitialSlideMode);c.slide_mode="undefined";document.addEventListener("keydown",c.keyDownHandler,!1)}}();
// Input 75
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(m,n){function k(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function c(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function a(){var a=m.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!q)||(a=a.getRangeAt(0),q.setPoint(a.startContainer,a.startOffset))}function h(){var a=m.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();q&&q.node()&&(b=q.node(),c=b.ownerDocument.createRange(),
c.setStart(b,q.position()),c.collapse(!0),a.addRange(c))}function b(b){var d=b.charCode||b.keyCode;if(q=null,q&&37===d)a(),q.stepBackward(),h();else if(16<=d&&20>=d||33<=d&&40>=d)return;c(b)}function f(a){c(a)}function e(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&e(b),b=b.nextSibling||b.parentNode;var c,d,g,b=a.attributes;c="";for(g=b.length-1;0<=g;g-=1)d=b.item(g),c=c+" "+d.nodeName+'="'+d.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(d=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&d.test(c.nodeValue)&&c.parentNode.removeChild(c)}function d(a,b){for(var c=a.firstChild,e,g,f;c&&c!==a;){if(c.nodeType===Node.ELEMENT_NODE)for(d(c,b),e=c.attributes,f=e.length-1;0<=f;f-=1)g=e.item(f),"http://www.w3.org/2000/xmlns/"!==g.namespaceURI||b[g.nodeValue]||(b[g.nodeValue]=g.localName);c=c.nextSibling||c.parentNode}}function t(){var a=m.ownerDocument.createElement("style"),b;b={};d(m,b);
var c={},e,g,f=0;for(e in b)if(b.hasOwnProperty(e)&&e){g=b[e];if(!g||c.hasOwnProperty(g)||"xmlns"===g){do g="ns"+f,f+=1;while(c.hasOwnProperty(g));b[e]=g}c[g]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+l;a.appendChild(m.ownerDocument.createTextNode(b));n=n.parentNode.replaceChild(a,n)}var l,p,g,q=null;m.id||(m.id="xml"+String(Math.random()).substring(2));p="#"+m.id+" ";l=p+"*,"+p+":visited, "+p+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
p+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+p+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+p+"{overflow: auto;}\n";(function(a){k(a,"click",f);k(a,"keydown",b);k(a,"drop",c);k(a,"dragend",c);k(a,"beforepaste",c);k(a,"paste",c)})(m);this.updateCSS=t;this.setXML=function(a){a=a.documentElement||a;g=a=m.ownerDocument.importNode(a,!0);for(e(a);m.lastChild;)m.removeChild(m.lastChild);m.appendChild(a);t();q=new core.PositionIterator(a)};this.getXML=
function(){return g}};
// Input 76
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(m,n){};gui.UndoManager.prototype.unsubscribe=function(m,n){};gui.UndoManager.prototype.setOdtDocument=function(m){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(m){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(m){};gui.UndoManager.prototype.moveBackward=function(m){};gui.UndoManager.prototype.onOperationExecuted=function(m){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
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
gui.UndoStateRules=function(){function m(k){return k.spec().optype}function n(k){switch(m(k)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=m;this.isEditOperation=n;this.isPartOfOperationSet=function(k,c){if(n(k)){if(0===c.length)return!0;var a;if(a=n(c[c.length-1]))a:{a=c.filter(n);var h=m(k),b;b:switch(h){case "RemoveText":case "InsertText":b=!0;break b;default:b=!1}if(b&&h===m(a[0])){if(1===a.length){a=!0;break a}h=a[a.length-2].spec().position;
a=a[a.length-1].spec().position;b=k.spec().position;if(a===b-(a-h)){a=!0;break a}}a=!1}return a}return!0}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.UndoManager");runtime.loadClass("gui.UndoStateRules");
gui.TrivialUndoManager=function(m){function n(){s.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:b.hasUndoStates(),redoAvailable:b.hasRedoStates()})}function k(){p!==d&&p!==g[g.length-1]&&g.push(p)}function c(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);f.normalizeTextNodes(b)}function a(a){return Object.keys(a).map(function(b){return a[b]})}function h(b){function c(a){var b=a.spec();if(g[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete g[b.memberid],f-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},g={},f,h=b.pop();l.getCursors().forEach(function(a){g[a.getMemberId()]=!0});for(f=Object.keys(g).length;h&&0<f;)h.reverse(),h.forEach(c),h=b.pop();return a(d).concat(a(e))}var b=this,f=new core.DomUtils,e,d=[],t,l,p=[],g=[],q=[],s=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=m||new gui.UndoStateRules;this.subscribe=function(a,b){s.subscribe(a,b)};this.unsubscribe=function(a,b){s.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<g.length};this.hasRedoStates=function(){return 0<q.length};this.setOdtDocument=function(a){l=a};this.resetInitialState=function(){g.length=0;q.length=0;d.length=0;p.length=0;e=null;n()};this.saveInitialState=function(){var a=l.getOdfCanvas().odfContainer(),b=l.getOdfCanvas().getAnnotationManager();b&&b.forgetAnnotations();e=a.rootElement.cloneNode(!0);
l.getOdfCanvas().refreshAnnotations();a=e;f.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(c);f.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(c);k();g.unshift(d);p=d=h(g);g.length=0;q.length=0;n()};this.setPlaybackFunction=function(a){t=a};this.onOperationExecuted=function(a){q.length=0;w.isEditOperation(a)&&p===d||!w.isPartOfOperationSet(a,p)?(k(),p=[a],g.push(p),s.emit(gui.UndoManager.signalUndoStateCreated,{operations:p}),n()):(p.push(a),s.emit(gui.UndoManager.signalUndoStateModified,
{operations:p}))};this.moveForward=function(a){for(var b=0,c;a&&q.length;)c=q.pop(),g.push(c),c.forEach(t),a-=1,b+=1;b&&(p=g[g.length-1],n());return b};this.moveBackward=function(a){for(var b=l.getOdfCanvas(),c=b.odfContainer(),f=0;a&&g.length;)q.push(g.pop()),a-=1,f+=1;f&&(c.setRootElement(e.cloneNode(!0)),b.setOdfContainer(c,!0),s.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),l.getCursors().forEach(function(a){l.removeCursor(a.getMemberId())}),d.forEach(t),g.forEach(function(a){a.forEach(t)}),
b.refreshCSS(),p=g[g.length-1]||d,n());return f}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
// Input 79
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
ops.OdtDocument=function(m){function n(){var a=m.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function k(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var d=e[a].getNode();return b(c)===b(d)?t:l}}function c(a){var b=
gui.SelectionMover.createPositionIterator(n());for(a+=1;0<a&&b.nextPosition();)1===p.acceptPosition(b)&&(a-=1);return b}function a(a){return f.getParagraphElement(a)}function h(a){return m.getFormatting().getStyleElement(a,"paragraph")}var b=this,f,e={},d=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalStyleCreated,
ops.OdtDocument.signalStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),t=core.PositionFilter.FilterResult.FILTER_ACCEPT,l=core.PositionFilter.FilterResult.FILTER_REJECT,p;this.getIteratorAtPosition=c;this.upgradeWhitespacesAtPosition=function(a){a=c(a);var b,d,e;a.previousPosition();a.previousPosition();for(e=-1;1>=e;e+=1){b=a.container();d=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[d]&&f.isSignificantWhitespace(b,
d)){runtime.assert(" "===b.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var h=b.ownerDocument.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s");h.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(d,1);0<d&&(b=b.splitText(d));b.parentNode.insertBefore(h,b);b=h;a.moveToEndOfNode(b)}a.nextPosition()}};this.getParagraphStyleElement=h;this.getParagraphElement=a;this.getParagraphStyleAttributes=function(a){return(a=h(a))?m.getFormatting().getInheritedStyleAttributes(a):
null};this.getPositionInTextNode=function(a,c){var d=gui.SelectionMover.createPositionIterator(n()),f=null,h,l=0,k=null,m=a;runtime.assert(0<=a,"position must be >= 0");1===p.acceptPosition(d)?(h=d.container(),h.nodeType===Node.TEXT_NODE&&(f=h,l=0)):a+=1;for(;0<a||null===f;){if(!d.nextPosition())return null;if(1===p.acceptPosition(d))if(a-=1,h=d.container(),h.nodeType===Node.TEXT_NODE)h!==f?(f=h,l=d.domOffset()):l+=1;else if(null!==f){if(0===a){l=f.length;break}f=null}else if(0===a){f=n().ownerDocument.createTextNode("");
h.insertBefore(f,d.rightNode());l=0;break}}if(null===f)return null;if(c&&e[c]&&b.getCursorPosition(c)===m){for(k=e[c].getNode();0===l&&k.nextSibling&&"cursor"===k.nextSibling.localName;)k.parentNode.insertBefore(k,k.nextSibling.nextSibling);k&&0<f.length&&(f=n().ownerDocument.createTextNode(""),l=0,k.parentNode.insertBefore(f,k.nextSibling))}for(;0===l&&(f.previousSibling&&"cursor"===f.previousSibling.localName)&&(h=f.previousSibling,0<f.length&&(f=n().ownerDocument.createTextNode("")),h.parentNode.insertBefore(f,
h),k!==h););for(;f.previousSibling&&f.previousSibling.nodeType===Node.TEXT_NODE;)f.previousSibling.appendData(f.data),l=f.length+f.previousSibling.length,f=f.previousSibling,f.parentNode.removeChild(f.nextSibling);return{textNode:f,offset:l}};this.fixCursorPositions=function(a){var c,d,f,h=new core.PositionFilterChain;h.addFilter("BaseFilter",b.getPositionFilter());for(c in e)e.hasOwnProperty(c)&&(h.addFilter("RootFilter",b.createRootFilter(c)),d=e[c],f=d.getStepCounter(),f.isPositionWalkable(h)?
0===b.getCursorSelection(c).length&&d.move(0):(f=f.countStepsToValidPosition(h),d.move(f),c===a&&b.emit(ops.OdtDocument.signalCursorMoved,d)),h.removeFilter("RootFilter"))};this.getWalkableParagraphLength=function(b){var d=c(0),e=0;d.setUnfilteredPosition(b,0);do{if(a(d.container())!==b)break;1===p.acceptPosition(d)&&(e+=1)}while(d.nextPosition());return e};this.getDistanceFromCursor=function(a,b,c){a=e[a];var d=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");
a&&(a=a.getStepCounter().countStepsToPosition,d=a(b,c,p));return d};this.getCursorPosition=function(a){return-b.getDistanceFromCursor(a,n(),0)};this.getCursorSelection=function(a){var b;a=e[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(n(),0,p),b=b(a.getAnchorNode(),0,p));return{position:c+b,length:-b}};this.getPositionFilter=function(){return p};this.getOdfCanvas=function(){return m};this.getRootNode=n;this.getDOM=function(){return n().ownerDocument};this.getCursor=function(a){return e[a]};
this.getCursors=function(){var a=[],b;for(b in e)e.hasOwnProperty(b)&&a.push(e[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countForwardSteps(1,p),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!e[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);a.move(b);e[c]=a};this.removeCursor=function(a){var c=e[a];return c?(c.removeFromOdtDocument(),
delete e[a],b.emit(ops.OdtDocument.signalCursorRemoved,a),!0):!1};this.getMetaData=function(a){for(var b=m.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return m.getFormatting()};this.getTextElements=function(a,b){return f.getTextElements(a,b)};this.getParagraphElements=function(a){return f.getParagraphElements(a)};
this.emit=function(a,b){d.emit(a,b)};this.subscribe=function(a,b){d.subscribe(a,b)};this.unsubscribe=function(a,b){d.unsubscribe(a,b)};this.createRootFilter=function(a){return new k(a)};this.close=function(a){a()};this.destroy=function(a){a()};p=new function(){function a(b,c,d){var e,g;if(c&&(e=f.lookLeftForCharacter(c),1===e||2===e&&(f.scanRightForAnyCharacter(d)||f.scanRightForAnyCharacter(f.nextNode(b)))))return t;e=null===c&&f.isParagraph(b);g=f.lookRightForCharacter(d);if(e)return g?t:f.scanRightForAnyCharacter(d)?
l:t;if(!g)return l;c=c||f.previousNode(b);return f.scanLeftForAnyCharacter(c)?l:t}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,e,h,k;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return l;if(d===Node.TEXT_NODE){if(!f.isGroupingElement(c.parentNode)||f.isWithinTrackedChanges(c.parentNode,n()))return l;d=b.unfilteredDomOffset();e=c.data;runtime.assert(d!==e.length,"Unexpected offset.");if(0<d){b=e.substr(d-1,1);if(!f.isODFWhitespace(b))return t;if(1<d)if(b=e.substr(d-2,1),!f.isODFWhitespace(b))h=
t;else{if(!f.isODFWhitespace(e.substr(0,d)))return l}else k=f.previousNode(c),f.scanLeftForNonWhitespace(k)&&(h=t);if(h===t)return f.isTrailingWhitespace(c,d)?l:t;h=e.substr(d,1);return f.isODFWhitespace(h)?l:f.scanLeftForAnyCharacter(f.previousNode(c))?l:t}k=b.leftNode();h=c;c=c.parentNode;h=a(c,k,h)}else!f.isGroupingElement(c)||f.isWithinTrackedChanges(c,n())?h=l:(k=b.leftNode(),h=b.rightNode(),h=a(c,k,h));return h}};f=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";
ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalStyleCreated="style/created";ops.OdtDocument.signalStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";(function(){return ops.OdtDocument})();
// Input 80
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
ops.Session=function(m){var n=new ops.OperationFactory,k=new ops.OdtDocument(m),c=new ops.TrivialMemberModel,a=null;this.setMemberModel=function(a){c=a};this.setOperationFactory=function(c){n=c;a&&a.setOperationFactory(n)};this.setOperationRouter=function(c){a=c;c.setPlaybackFunction(function(a){a.execute(k);k.emit(ops.OdtDocument.signalOperationExecuted,a)});c.setOperationFactory(n)};this.getMemberModel=function(){return c};this.getOperationFactory=function(){return n};this.getOdtDocument=function(){return k};
this.enqueue=function(c){a.push(c)};this.close=function(h){a.close(function(a){a?h(a):c.close(function(a){a?h(a):k.close(h)})})};this.destroy=function(a){k.destroy(a)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 81
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\noffice|text * draw|text-box {\n    /** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
