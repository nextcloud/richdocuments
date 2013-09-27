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
function Runtime(){}Runtime.ByteArray=function(h){};Runtime.prototype.getVariable=function(h){};Runtime.prototype.toJson=function(h){};Runtime.prototype.fromJson=function(h){};Runtime.ByteArray.prototype.slice=function(h,m){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(h){};Runtime.prototype.byteArrayFromString=function(h,m){};Runtime.prototype.byteArrayToString=function(h,m){};Runtime.prototype.concatByteArrays=function(h,m){};
Runtime.prototype.read=function(h,m,f,a){};Runtime.prototype.readFile=function(h,m,f){};Runtime.prototype.readFileSync=function(h,m){};Runtime.prototype.loadXML=function(h,m){};Runtime.prototype.writeFile=function(h,m,f){};Runtime.prototype.isFile=function(h,m){};Runtime.prototype.getFileSize=function(h,m){};Runtime.prototype.deleteFile=function(h,m){};Runtime.prototype.log=function(h,m){};Runtime.prototype.setTimeout=function(h,m){};Runtime.prototype.clearTimeout=function(h){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(h){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(h,m,f){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(h,m){function f(a){var b="",k,c=a.length;for(k=0;k<c;k+=1)b+=String.fromCharCode(a[k]&255);return b}function a(a){var b="",k,c=a.length,e,s,n,g;for(k=0;k<c;k+=1)e=a[k],128>e?b+=String.fromCharCode(e):(k+=1,s=a[k],194<=e&&224>e?b+=String.fromCharCode((e&31)<<6|s&63):(k+=1,n=a[k],224<=e&&240>e?b+=String.fromCharCode((e&15)<<12|(s&63)<<6|n&63):(k+=1,g=a[k],240<=e&&245>e&&(e=(e&7)<<18|(s&63)<<12|(n&63)<<6|g&63,e-=65536,b+=String.fromCharCode((e>>10)+55296,(e&1023)+56320)))));
return b}var c;"utf8"===m?c=a(h):("binary"!==m&&this.log("Unsupported encoding: "+m),c=f(h));return c};Runtime.getVariable=function(h){try{return eval(h)}catch(m){}};Runtime.toJson=function(h){return JSON.stringify(h)};Runtime.fromJson=function(h){return JSON.parse(h)};Runtime.getFunctionName=function(h){return void 0===h.name?(h=/function\s+(\w+)/.exec(h))&&h[1]:h.name};
function BrowserRuntime(h){function m(b,k){var a,e,c;void 0!==k?c=b:k=b;h?(e=h.ownerDocument,c&&(a=e.createElement("span"),a.className=c,a.appendChild(e.createTextNode(c)),h.appendChild(a),h.appendChild(e.createTextNode(" "))),a=e.createElement("span"),0<k.length&&"<"===k[0]?a.innerHTML=k:a.appendChild(e.createTextNode(k)),h.appendChild(a),h.appendChild(e.createElement("br"))):console&&console.log(k);"alert"===c&&alert(k)}function f(b,k,p){function e(){var e;4===d.readyState&&(0!==d.status||d.responseText?
200===d.status||0===d.status?(e="binary"===k?null!==d.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(d.responseBody)).toArray():a.byteArrayFromString(d.responseText,"binary"):d.responseText,c[b]=e,p(null,e)):p(d.responseText||d.statusText):p("File "+b+" is empty."))}if(c.hasOwnProperty(b))p(null,c[b]);else{var d=new XMLHttpRequest;d.open("GET",b,!0);d.onreadystatechange=e;d.overrideMimeType&&("binary"!==k?d.overrideMimeType("text/plain; charset="+k):d.overrideMimeType("text/plain; charset=x-user-defined"));
try{d.send(null)}catch(n){p(n.message)}}}var a=this,c={},d=window.ArrayBuffer&&window.Uint8Array;d&&(Uint8Array.prototype.slice=function(b,k){void 0===k&&(void 0===b&&(b=0),k=this.length);var a=this.subarray(b,k),e,c;k-=b;e=new Uint8Array(new ArrayBuffer(k));for(c=0;c<k;c+=1)e[c]=a[c];return e});this.ByteArray=d?function(b){return new Uint8Array(new ArrayBuffer(b))}:function(b){var k=[];k.length=b;return k};this.concatByteArrays=d?function(b,k){var a,e=b.length,c=k.length,n=new this.ByteArray(e+c);
for(a=0;a<e;a+=1)n[a]=b[a];for(a=0;a<c;a+=1)n[a+e]=k[a];return n}:function(b,k){return b.concat(k)};this.byteArrayFromArray=function(b){return b.slice()};this.byteArrayFromString=function(b,k){var c;if("utf8"===k){c=b.length;var e,d,n,g=0;for(d=0;d<c;d+=1)n=b.charCodeAt(d),g+=1+(128<n)+(2048<n);e=new a.ByteArray(g);for(d=g=0;d<c;d+=1)n=b.charCodeAt(d),128>n?(e[g]=n,g+=1):2048>n?(e[g]=192|n>>>6,e[g+1]=128|n&63,g+=2):(e[g]=224|n>>>12&15,e[g+1]=128|n>>>6&63,e[g+2]=128|n&63,g+=3)}else for("binary"!==
k&&a.log("unknown encoding: "+k),c=b.length,e=new a.ByteArray(c),d=0;d<c;d+=1)e[d]=b.charCodeAt(d)&255;return c=e};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=f;this.read=function(b,k,d,e){function f(){var g;4===n.readyState&&(0!==n.status||n.responseText?200===n.status||0===n.status?(n.response?(g=n.response,g=new Uint8Array(g)):g=null!==n.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(n.responseBody)).toArray():a.byteArrayFromString(n.responseText,"binary"),c[b]=g,e(null,g.slice(k,k+d))):e(n.responseText||n.statusText):e("File "+b+" is empty."))}if(c.hasOwnProperty(b))e(null,c[b].slice(k,k+d));else{var n=new XMLHttpRequest;n.open("GET",b,!0);n.onreadystatechange=f;n.overrideMimeType&&n.overrideMimeType("text/plain; charset=x-user-defined");n.responseType="arraybuffer";try{n.send(null)}catch(g){e(g.message)}}};this.readFileSync=function(b,k){var a=new XMLHttpRequest,
e;a.open("GET",b,!1);a.overrideMimeType&&("binary"!==k?a.overrideMimeType("text/plain; charset="+k):a.overrideMimeType("text/plain; charset=x-user-defined"));try{if(a.send(null),200===a.status||0===a.status)e=a.responseText}catch(c){}return e};this.writeFile=function(b,k,d){c[b]=k;var e=new XMLHttpRequest;e.open("PUT",b,!0);e.onreadystatechange=function(){4===e.readyState&&(0!==e.status||e.responseText?200<=e.status&&300>e.status||0===e.status?d(null):d("Status "+String(e.status)+": "+e.responseText||
e.statusText):d("File "+b+" is empty."))};k=k.buffer&&!e.sendAsBinary?k.buffer:a.byteArrayToString(k,"binary");try{e.sendAsBinary?e.sendAsBinary(k):e.send(k)}catch(f){a.log("HUH? "+f+" "+k),d(f.message)}};this.deleteFile=function(b,k){delete c[b];var a=new XMLHttpRequest;a.open("DELETE",b,!0);a.onreadystatechange=function(){4===a.readyState&&(200>a.status&&300<=a.status?k(a.responseText):k(null))};a.send(null)};this.loadXML=function(b,k){var a=new XMLHttpRequest;a.open("GET",b,!0);a.overrideMimeType&&
a.overrideMimeType("text/xml");a.onreadystatechange=function(){4===a.readyState&&(0!==a.status||a.responseText?200===a.status||0===a.status?k(null,a.responseXML):k(a.responseText):k("File "+b+" is empty."))};try{a.send(null)}catch(e){k(e.message)}};this.isFile=function(b,k){a.getFileSize(b,function(b){k(-1!==b)})};this.getFileSize=function(b,a){var c=new XMLHttpRequest;c.open("HEAD",b,!0);c.onreadystatechange=function(){if(4===c.readyState){var e=c.getResponseHeader("Content-Length");e?a(parseInt(e,
10)):f(b,"binary",function(e,b){e?a(-1):a(b.length)})}};c.send(null)};this.log=m;this.assert=function(b,a,c){if(!b)throw m("alert","ASSERTION FAILED:\n"+a),c&&c(),a;};this.setTimeout=function(b,a){return setTimeout(function(){b()},a)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){m("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function h(b,d,e){b=a.resolve(c,b);"binary"!==d?f.readFile(b,d,e):f.readFile(b,null,e)}var m=this,f=require("fs"),a=require("path"),c="",d,b;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var b=new Buffer(a.length),e,c=a.length;for(e=0;e<c;e+=1)b[e]=a[e];return b};this.concatByteArrays=function(a,b){var e=new Buffer(a.length+b.length);a.copy(e,0,0);b.copy(e,a.length,0);return e};this.byteArrayFromString=function(a,b){return new Buffer(a,
b)};this.byteArrayToString=function(a,b){return a.toString(b)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=h;this.loadXML=function(a,b){h(a,"utf-8",function(e,a){if(e)return b(e);b(null,m.parseXML(a))})};this.writeFile=function(b,d,e){b=a.resolve(c,b);f.writeFile(b,d,"binary",function(a){e(a||null)})};this.deleteFile=function(b,d){b=a.resolve(c,b);f.unlink(b,d)};this.read=function(b,d,e,h){b=a.resolve(c,b);f.open(b,"r+",666,function(a,
b){if(a)h(a);else{var c=new Buffer(e);f.read(b,c,0,e,d,function(e){f.close(b);h(e,c)})}})};this.readFileSync=function(a,b){return b?"binary"===b?f.readFileSync(a,null):f.readFileSync(a,b):""};this.isFile=function(b,d){b=a.resolve(c,b);f.stat(b,function(e,b){d(!e&&b.isFile())})};this.getFileSize=function(b,d){b=a.resolve(c,b);f.stat(b,function(e,b){e?d(-1):d(b.size)})};this.log=function(b,a){var e;void 0!==a?e=b:a=b;"alert"===e&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(a+
"\n");"alert"===e&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(b,a,e){b||(process.stderr.write("ASSERTION FAILED: "+a),e&&e())};this.setTimeout=function(b,a){return setTimeout(function(){b()},a)};this.clearTimeout=function(b){clearTimeout(b)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(b){c=b};this.currentDirectory=function(){return c};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return b};this.parseXML=
function(b){return d.parseFromString(b,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};d=new (require("xmldom").DOMParser);b=m.parseXML("<a/>").implementation}
function RhinoRuntime(){function h(b,a){var c;void 0!==a?c=b:a=b;"alert"===c&&print("\n!!!!! ALERT !!!!!");print(a);"alert"===c&&print("!!!!! ALERT !!!!!")}var m=this,f=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),a,c,d="";f.setValidating(!1);f.setNamespaceAware(!0);f.setExpandEntityReferences(!1);f.setSchema(null);c=Packages.org.xml.sax.EntityResolver({resolveEntity:function(b,a){var c=new Packages.java.io.FileReader(a);return new Packages.org.xml.sax.InputSource(c)}});a=f.newDocumentBuilder();
a.setEntityResolver(c);this.ByteArray=function(b){return[b]};this.byteArrayFromArray=function(b){return b};this.byteArrayFromString=function(b,a){var c=[],e,d=b.length;for(e=0;e<d;e+=1)c[e]=b.charCodeAt(e)&255;return c};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(b,a){return b.concat(a)};this.loadXML=function(b,c){var d=new Packages.java.io.File(b),e;try{e=a.parse(d)}catch(f){print(f);
c(f);return}c(null,e)};this.readFile=function(b,a,c){d&&(b=d+"/"+b);var e=new Packages.java.io.File(b),f="binary"===a?"latin1":a;e.isFile()?(b=readFile(b,f),"binary"===a&&(b=m.byteArrayFromString(b,"binary")),c(null,b)):c(b+" is not a file.")};this.writeFile=function(b,a,c){d&&(b=d+"/"+b);b=new Packages.java.io.FileOutputStream(b);var e,f=a.length;for(e=0;e<f;e+=1)b.write(a[e]);b.close();c(null)};this.deleteFile=function(a,c){d&&(a=d+"/"+a);(new Packages.java.io.File(a))["delete"]()?c(null):c("Could not delete "+
a)};this.read=function(a,c,f,e){d&&(a=d+"/"+a);var h;h=a;var n="binary";(new Packages.java.io.File(h)).isFile()?("binary"===n&&(n="latin1"),h=readFile(h,n)):h=null;h?e(null,this.byteArrayFromString(h.substring(c,c+f),"binary")):e("Cannot read "+a)};this.readFileSync=function(a,c){return c?readFile(a,c):""};this.isFile=function(a,c){d&&(a=d+"/"+a);var f=new Packages.java.io.File(a);c(f.isFile())};this.getFileSize=function(a,c){d&&(a=d+"/"+a);var f=new Packages.java.io.File(a);c(f.length())};this.log=
h;this.assert=function(a,c,d){a||(h("alert","ASSERTION FAILED: "+c),d&&d())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){d=a};this.currentDirectory=function(){return d};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return a.getDOMImplementation()};this.parseXML=function(b){return a.parse(b)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function h(a){var c=a[0],d;d=eval("if (typeof "+c+" === 'undefined') {eval('"+c+" = {};');}"+c);for(c=1;c<a.length-1;c+=1)d=d.hasOwnProperty(a[c])?d[a[c]]:d[a[c]]={};return d[a[a.length-1]]}var m={},f={};runtime.loadClass=function(a){function c(a){a=a.replace(/\./g,"/")+".js";var e=runtime.libraryPaths(),b,c,g;runtime.currentDirectory&&e.push(runtime.currentDirectory());for(b=0;b<e.length;b+=1){c=e[b];if(!f.hasOwnProperty(c))try{g=runtime.readFileSync(e[b]+"/manifest.js","utf8"),f[c]=
g&&g.length?eval(g):null}catch(l){f[c]=null,runtime.log("Cannot load manifest for "+c+".")}g=null;if((c=f[c])&&c.indexOf&&-1!==c.indexOf(a))return e[b]+"/"+a}return null}function d(a){var e,b;b=c(a);if(!b)throw a+" is not listed in any manifest.js.";try{e=runtime.readFileSync(b,"utf8")}catch(n){throw runtime.log("Error loading "+a+" "+n),n;}if(void 0===e)throw"Cannot load class "+a;e=e+("\n//# sourceURL="+b)+("\n//@ sourceURL="+b);try{e=eval(a+" = eval(code);")}catch(g){throw runtime.log("Error loading "+
a+" "+g),g;}return e}if(!IS_COMPILED_CODE&&!m.hasOwnProperty(a)){var b=a.split("."),k;k=h(b);if(!k&&(k=d(a),!k||Runtime.getFunctionName(k)!==b[b.length-1]))throw runtime.log("Loaded code is not for "+b[b.length-1]),"Loaded code is not for "+b[b.length-1];m[a]=!0}}})();
(function(h){function m(f){if(f.length){var a=f[0];runtime.readFile(a,"utf8",function(c,d){function b(){var a;(a=eval(h))&&runtime.exit(a)}var k="",h=d;-1!==a.indexOf("/")&&(k=a.substring(0,a.indexOf("/")));runtime.setCurrentDirectory(k);c||null===h?(runtime.log(c),runtime.exit(1)):b.apply(null,f)})}}h=h?Array.prototype.slice.call(h):[];"NodeJSRuntime"===runtime.type()?m(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?m(h):m(h.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function h(a){var e=[],b,c=a.length;for(b=0;b<c;b+=1)e[b]=a.charCodeAt(b)&255;return e}function m(a){var e,b="",c,g=a.length-2;for(c=0;c<g;c+=3)e=a[c]<<16|a[c+1]<<8|a[c+2],b+=u[e>>>18],b+=u[e>>>12&63],b+=u[e>>>6&63],b+=u[e&63];c===g+1?(e=a[c]<<4,b+=u[e>>>6],b+=u[e&63],b+="=="):c===g&&(e=a[c]<<10|a[c+1]<<2,b+=u[e>>>12],b+=u[e>>>6&63],b+=u[e&63],b+="=");return b}function f(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var b=[],e=a.length%4,c,g=a.length,n;for(c=0;c<g;c+=4)n=(q[a.charAt(c)]||
0)<<18|(q[a.charAt(c+1)]||0)<<12|(q[a.charAt(c+2)]||0)<<6|(q[a.charAt(c+3)]||0),b.push(n>>16,n>>8&255,n&255);b.length-=[0,0,2,1][e];return b}function a(a){var b=[],e,c=a.length,g;for(e=0;e<c;e+=1)g=a[e],128>g?b.push(g):2048>g?b.push(192|g>>>6,128|g&63):b.push(224|g>>>12&15,128|g>>>6&63,128|g&63);return b}function c(a){var b=[],e,c=a.length,g,n,l;for(e=0;e<c;e+=1)g=a[e],128>g?b.push(g):(e+=1,n=a[e],224>g?b.push((g&31)<<6|n&63):(e+=1,l=a[e],b.push((g&15)<<12|(n&63)<<6|l&63)));return b}function d(a){return m(h(a))}
function b(a){return String.fromCharCode.apply(String,f(a))}function k(a){return c(h(a))}function p(a){a=c(a);for(var b="",e=0;e<a.length;)b+=String.fromCharCode.apply(String,a.slice(e,e+45E3)),e+=45E3;return b}function e(a,b,e){var c="",g,n,l;for(l=b;l<e;l+=1)b=a.charCodeAt(l)&255,128>b?c+=String.fromCharCode(b):(l+=1,g=a.charCodeAt(l)&255,224>b?c+=String.fromCharCode((b&31)<<6|g&63):(l+=1,n=a.charCodeAt(l)&255,c+=String.fromCharCode((b&15)<<12|(g&63)<<6|n&63)));return c}function s(a,b){function c(){var d=
l+g;d>a.length&&(d=a.length);n+=e(a,l,d);l=d;d=l===a.length;b(n,d)&&!d&&runtime.setTimeout(c,0)}var g=1E5,n="",l=0;a.length<g?b(e(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),c())}function n(b){return a(h(b))}function g(b){return String.fromCharCode.apply(String,a(b))}function l(b){return String.fromCharCode.apply(String,a(h(b)))}var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",q=function(a){var b={},e,c;e=0;for(c=a.length;e<c;e+=1)b[a.charAt(e)]=e;return b}(u),x,
r,y=runtime.getWindow(),t,w;y&&y.btoa?(t=function(a){return y.btoa(a)},x=function(a){return t(l(a))}):(t=d,x=function(a){return m(n(a))});y&&y.atob?(w=function(a){return y.atob(a)},r=function(a){a=w(a);return e(a,0,a.length)}):(w=b,r=function(a){return p(f(a))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=m;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=f;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=a;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=c;this.convertUTF8StringToBase64=d;this.convertBase64ToUTF8String=b;this.convertUTF8StringToUTF16Array=k;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=p;this.convertUTF8StringToUTF16String=s;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=n;this.convertUTF16ArrayToUTF8String=g;this.convertUTF16StringToUTF8String=l;this.convertUTF16StringToBase64=x;this.convertBase64ToUTF16String=r;this.fromBase64=b;this.toBase64=d;this.atob=
w;this.btoa=t;this.utob=l;this.btou=s;this.encode=x;this.encodeURI=function(a){return x(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return r(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function h(){this.dl=this.fc=0}function m(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function f(a,b,e,c){this.good_length=a;this.max_lazy=b;this.nice_length=e;this.max_chain=c}function a(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=c;this.off=0}var c=8192,d,b,k,p,e=null,s,n,g,l,u,q,x,r,y,t,w,v,C,J,E,K,B,N,H,L,fa,ma,M,pa,W,aa,O,R,F,G,D,T,X,Q,P,$,ca,U,V,z,ga,da,I,ia,A,na,ja,ea,oa,Y,ka,ha=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ba=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],La=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],sa;sa=[new f(0,0,0,0),new f(4,4,8,4),new f(4,5,16,8),new f(4,6,32,32),new f(4,4,16,16),new f(8,16,32,32),new f(8,16,128,128),new f(8,32,128,256),new f(32,128,258,1024),new f(32,258,258,4096)];var ta=function(g){e[n+s++]=g;if(n+s===c){var l;if(0!==s){null!==d?(g=d,d=d.next):g=new a;
g.next=null;g.len=g.off=0;null===b?b=k=g:k=k.next=g;g.len=s-n;for(l=0;l<g.len;l++)g.ptr[l]=e[n+l];s=n=0}}},Z=function(a){a&=65535;n+s<c-2?(e[n+s++]=a&255,e[n+s++]=a>>>8):(ta(a&255),ta(a>>>8))},ua=function(){w=(w<<5^l[B+3-1]&255)&8191;v=x[32768+w];x[B&32767]=v;x[32768+w]=B},la=function(a,b){y>16-b?(r|=a<<y,Z(r),r=a>>16-y,y+=b-16):(r|=a<<y,y+=b)},qa=function(a,b){la(b[a].fc,b[a].dl)},za=function(a,b,e){return a[b].fc<a[e].fc||a[b].fc===a[e].fc&&ca[b]<=ca[e]},Aa=function(a,b,e){var c;for(c=0;c<e&&ka<
Y.length;c++)a[b+c]=Y.charCodeAt(ka++)&255;return c},wa=function(){var a,b,e=65536-L-B;if(-1===e)e--;else if(65274<=B){for(a=0;32768>a;a++)l[a]=l[a+32768];N-=32768;B-=32768;t-=32768;for(a=0;8192>a;a++)b=x[32768+a],x[32768+a]=32768<=b?b-32768:0;for(a=0;32768>a;a++)b=x[a],x[a]=32768<=b?b-32768:0;e+=32768}H||(a=Aa(l,B+L,e),0>=a?H=!0:L+=a)},Ba=function(a){var b=fa,e=B,c,g=K,n=32506<B?B-32506:0,d=B+258,k=l[e+g-1],v=l[e+g];K>=pa&&(b>>=2);do if(c=a,l[c+g]===v&&l[c+g-1]===k&&l[c]===l[e]&&l[++c]===l[e+1]){e+=
2;c++;do++e;while(l[e]===l[++c]&&l[++e]===l[++c]&&l[++e]===l[++c]&&l[++e]===l[++c]&&l[++e]===l[++c]&&l[++e]===l[++c]&&l[++e]===l[++c]&&l[++e]===l[++c]&&e<d);c=258-(d-e);e=d-258;if(c>g){N=a;g=c;if(258<=c)break;k=l[e+g-1];v=l[e+g]}a=x[a&32767]}while(a>n&&0!==--b);return g},ra=function(a,b){q[I++]=b;0===a?W[b].fc++:(a--,W[U[b]+256+1].fc++,aa[(256>a?V[a]:V[256+(a>>7)])&255].fc++,u[ia++]=a,na|=ja);ja<<=1;0===(I&7)&&(da[A++]=na,na=0,ja=1);if(2<M&&0===(I&4095)){var e=8*I,c=B-t,g;for(g=0;30>g;g++)e+=aa[g].fc*
(5+ba[g]);e>>=3;if(ia<parseInt(I/2,10)&&e<parseInt(c/2,10))return!0}return 8191===I||8192===ia},xa=function(a,b){for(var e=Q[b],c=b<<1;c<=P;){c<P&&za(a,Q[c+1],Q[c])&&c++;if(za(a,e,Q[c]))break;Q[b]=Q[c];b=c;c<<=1}Q[b]=e},Ca=function(a,b){var e=0;do e|=a&1,a>>=1,e<<=1;while(0<--b);return e>>1},Da=function(a,b){var e=[];e.length=16;var c=0,g;for(g=1;15>=g;g++)c=c+X[g-1]<<1,e[g]=c;for(c=0;c<=b;c++)g=a[c].dl,0!==g&&(a[c].fc=Ca(e[g]++,g))},ya=function(a){var b=a.dyn_tree,e=a.static_tree,c=a.elems,g,n=-1,
l=c;P=0;$=573;for(g=0;g<c;g++)0!==b[g].fc?(Q[++P]=n=g,ca[g]=0):b[g].dl=0;for(;2>P;)g=Q[++P]=2>n?++n:0,b[g].fc=1,ca[g]=0,ea--,null!==e&&(oa-=e[g].dl);a.max_code=n;for(g=P>>1;1<=g;g--)xa(b,g);do g=Q[1],Q[1]=Q[P--],xa(b,1),e=Q[1],Q[--$]=g,Q[--$]=e,b[l].fc=b[g].fc+b[e].fc,ca[l]=ca[g]>ca[e]+1?ca[g]:ca[e]+1,b[g].dl=b[e].dl=l,Q[1]=l++,xa(b,1);while(2<=P);Q[--$]=Q[1];l=a.dyn_tree;g=a.extra_bits;var c=a.extra_base,e=a.max_code,d=a.max_length,k=a.static_tree,v,f,q,h,m=0;for(f=0;15>=f;f++)X[f]=0;l[Q[$]].dl=
0;for(a=$+1;573>a;a++)v=Q[a],f=l[l[v].dl].dl+1,f>d&&(f=d,m++),l[v].dl=f,v>e||(X[f]++,q=0,v>=c&&(q=g[v-c]),h=l[v].fc,ea+=h*(f+q),null!==k&&(oa+=h*(k[v].dl+q)));if(0!==m){do{for(f=d-1;0===X[f];)f--;X[f]--;X[f+1]+=2;X[d]--;m-=2}while(0<m);for(f=d;0!==f;f--)for(v=X[f];0!==v;)g=Q[--a],g>e||(l[g].dl!==f&&(ea+=(f-l[g].dl)*l[g].fc,l[g].fc=f),v--)}Da(b,n)},Ea=function(a,b){var e,c=-1,g,n=a[0].dl,l=0,d=7,k=4;0===n&&(d=138,k=3);a[b+1].dl=65535;for(e=0;e<=b;e++)g=n,n=a[e+1].dl,++l<d&&g===n||(l<k?F[g].fc+=l:0!==
g?(g!==c&&F[g].fc++,F[16].fc++):10>=l?F[17].fc++:F[18].fc++,l=0,c=g,0===n?(d=138,k=3):g===n?(d=6,k=3):(d=7,k=4))},Fa=function(){8<y?Z(r):0<y&&ta(r);y=r=0},Ga=function(a,e){var b,c=0,g=0,n=0,l=0,d,k;if(0!==I){do 0===(c&7)&&(l=da[n++]),b=q[c++]&255,0===(l&1)?qa(b,a):(d=U[b],qa(d+256+1,a),k=ha[d],0!==k&&(b-=z[d],la(b,k)),b=u[g++],d=(256>b?V[b]:V[256+(b>>7)])&255,qa(d,e),k=ba[d],0!==k&&(b-=ga[d],la(b,k))),l>>=1;while(c<I)}qa(256,a)},Ha=function(a,b){var e,c=-1,g,n=a[0].dl,l=0,d=7,k=4;0===n&&(d=138,k=
3);for(e=0;e<=b;e++)if(g=n,n=a[e+1].dl,!(++l<d&&g===n)){if(l<k){do qa(g,F);while(0!==--l)}else 0!==g?(g!==c&&(qa(g,F),l--),qa(16,F),la(l-3,2)):10>=l?(qa(17,F),la(l-3,3)):(qa(18,F),la(l-11,7));l=0;c=g;0===n?(d=138,k=3):g===n?(d=6,k=3):(d=7,k=4)}},Ia=function(){var a;for(a=0;286>a;a++)W[a].fc=0;for(a=0;30>a;a++)aa[a].fc=0;for(a=0;19>a;a++)F[a].fc=0;W[256].fc=1;na=I=ia=A=ea=oa=0;ja=1},va=function(a){var b,e,c,g;g=B-t;da[A]=na;ya(G);ya(D);Ea(W,G.max_code);Ea(aa,D.max_code);ya(T);for(c=18;3<=c&&0===F[S[c]].dl;c--);
ea+=3*(c+1)+14;b=ea+3+7>>3;e=oa+3+7>>3;e<=b&&(b=e);if(g+4<=b&&0<=t)for(la(0+a,3),Fa(),Z(g),Z(~g),c=0;c<g;c++)ta(l[t+c]);else if(e===b)la(2+a,3),Ga(O,R);else{la(4+a,3);g=G.max_code+1;b=D.max_code+1;c+=1;la(g-257,5);la(b-1,5);la(c-4,4);for(e=0;e<c;e++)la(F[S[e]].dl,3);Ha(W,g-1);Ha(aa,b-1);Ga(W,aa)}Ia();0!==a&&Fa()},Ja=function(a,c,g){var l,k,v;for(l=0;null!==b&&l<g;){k=g-l;k>b.len&&(k=b.len);for(v=0;v<k;v++)a[c+l+v]=b.ptr[b.off+v];b.off+=k;b.len-=k;l+=k;0===b.len&&(k=b,b=b.next,k.next=d,d=k)}if(l===
g)return l;if(n<s){k=g-l;k>s-n&&(k=s-n);for(v=0;v<k;v++)a[c+l+v]=e[n+v];n+=k;l+=k;s===n&&(s=n=0)}return l},Ka=function(a,e,c){var d;if(!p){if(!H){y=r=0;var k,f;if(0===R[0].dl){G.dyn_tree=W;G.static_tree=O;G.extra_bits=ha;G.extra_base=257;G.elems=286;G.max_length=15;G.max_code=0;D.dyn_tree=aa;D.static_tree=R;D.extra_bits=ba;D.extra_base=0;D.elems=30;D.max_length=15;D.max_code=0;T.dyn_tree=F;T.static_tree=null;T.extra_bits=La;T.extra_base=0;T.elems=19;T.max_length=7;for(f=k=T.max_code=0;28>f;f++)for(z[f]=
k,d=0;d<1<<ha[f];d++)U[k++]=f;U[k-1]=f;for(f=k=0;16>f;f++)for(ga[f]=k,d=0;d<1<<ba[f];d++)V[k++]=f;for(k>>=7;30>f;f++)for(ga[f]=k<<7,d=0;d<1<<ba[f]-7;d++)V[256+k++]=f;for(d=0;15>=d;d++)X[d]=0;for(d=0;143>=d;)O[d++].dl=8,X[8]++;for(;255>=d;)O[d++].dl=9,X[9]++;for(;279>=d;)O[d++].dl=7,X[7]++;for(;287>=d;)O[d++].dl=8,X[8]++;Da(O,287);for(d=0;30>d;d++)R[d].dl=5,R[d].fc=Ca(d,5);Ia()}for(d=0;8192>d;d++)x[32768+d]=0;ma=sa[M].max_lazy;pa=sa[M].good_length;fa=sa[M].max_chain;t=B=0;L=Aa(l,0,65536);if(0>=L)H=
!0,L=0;else{for(H=!1;262>L&&!H;)wa();for(d=w=0;2>d;d++)w=(w<<5^l[d]&255)&8191}b=null;n=s=0;3>=M?(K=2,E=0):(E=2,J=0);g=!1}p=!0;if(0===L)return g=!0,0}d=Ja(a,e,c);if(d===c)return c;if(g)return d;if(3>=M)for(;0!==L&&null===b;){ua();0!==v&&32506>=B-v&&(E=Ba(v),E>L&&(E=L));if(3<=E)if(f=ra(B-N,E-3),L-=E,E<=ma){E--;do B++,ua();while(0!==--E);B++}else B+=E,E=0,w=l[B]&255,w=(w<<5^l[B+1]&255)&8191;else f=ra(0,l[B]&255),L--,B++;f&&(va(0),t=B);for(;262>L&&!H;)wa()}else for(;0!==L&&null===b;){ua();K=E;C=N;E=2;
0!==v&&(K<ma&&32506>=B-v)&&(E=Ba(v),E>L&&(E=L),3===E&&4096<B-N&&E--);if(3<=K&&E<=K){f=ra(B-1-C,K-3);L-=K-1;K-=2;do B++,ua();while(0!==--K);J=0;E=2;B++;f&&(va(0),t=B)}else 0!==J?ra(0,l[B-1]&255)&&(va(0),t=B):J=1,B++,L--;for(;262>L&&!H;)wa()}0===L&&(0!==J&&ra(0,l[B-1]&255),va(1),g=!0);return d+Ja(a,d+e,c-d)};this.deflate=function(a,g){var n,v;Y=a;ka=0;"undefined"===String(typeof g)&&(g=6);(n=g)?1>n?n=1:9<n&&(n=9):n=6;M=n;H=p=!1;if(null===e){d=b=k=null;e=[];e.length=c;l=[];l.length=65536;u=[];u.length=
8192;q=[];q.length=32832;x=[];x.length=65536;W=[];W.length=573;for(n=0;573>n;n++)W[n]=new h;aa=[];aa.length=61;for(n=0;61>n;n++)aa[n]=new h;O=[];O.length=288;for(n=0;288>n;n++)O[n]=new h;R=[];R.length=30;for(n=0;30>n;n++)R[n]=new h;F=[];F.length=39;for(n=0;39>n;n++)F[n]=new h;G=new m;D=new m;T=new m;X=[];X.length=16;Q=[];Q.length=573;ca=[];ca.length=573;U=[];U.length=256;V=[];V.length=512;z=[];z.length=29;ga=[];ga.length=30;da=[];da.length=1024}var f=Array(1024),t=[],r=[];for(n=Ka(f,0,f.length);0<
n;){r.length=n;for(v=0;v<n;v++)r[v]=String.fromCharCode(f[v]);t[t.length]=r.join("");n=Ka(f,0,f.length)}Y=null;return t.join("")}};
// Input 4
core.ByteArray=function(h){this.pos=0;this.data=h;this.readUInt32LE=function(){this.pos+=4;var h=this.data,f=this.pos;return h[--f]<<24|h[--f]<<16|h[--f]<<8|h[--f]};this.readUInt16LE=function(){this.pos+=2;var h=this.data,f=this.pos;return h[--f]<<8|h[--f]}};
// Input 5
core.ByteArrayWriter=function(h){var m=this,f=new runtime.ByteArray(0);this.appendByteArrayWriter=function(a){f=runtime.concatByteArrays(f,a.getByteArray())};this.appendByteArray=function(a){f=runtime.concatByteArrays(f,a)};this.appendArray=function(a){f=runtime.concatByteArrays(f,runtime.byteArrayFromArray(a))};this.appendUInt16LE=function(a){m.appendArray([a&255,a>>8&255])};this.appendUInt32LE=function(a){m.appendArray([a&255,a>>8&255,a>>16&255,a>>24&255])};this.appendString=function(a){f=runtime.concatByteArrays(f,
runtime.byteArrayFromString(a,h))};this.getLength=function(){return f.length};this.getByteArray=function(){return f}};
// Input 6
core.RawInflate=function(){var h,m,f=null,a,c,d,b,k,p,e,s,n,g,l,u,q,x,r=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],y=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],t=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],w=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],v=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],C=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],J=function(){this.list=this.next=null},E=function(){this.n=this.b=this.e=0;this.t=null},K=function(a,b,e,c,g,n){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var d=Array(this.BMAX+1),l,k,v,f,h,q,m,t=Array(this.BMAX+1),x,p,u,r=new E,s=Array(this.BMAX);f=Array(this.N_MAX);var y,w=Array(this.BMAX+1),B,C,K;K=this.root=null;for(h=0;h<d.length;h++)d[h]=0;for(h=0;h<t.length;h++)t[h]=0;for(h=0;h<s.length;h++)s[h]=null;for(h=0;h<f.length;h++)f[h]=
0;for(h=0;h<w.length;h++)w[h]=0;l=256<b?a[256]:this.BMAX;x=a;p=0;h=b;do d[x[p]]++,p++;while(0<--h);if(d[0]==b)this.root=null,this.status=this.m=0;else{for(q=1;q<=this.BMAX&&0==d[q];q++);m=q;n<q&&(n=q);for(h=this.BMAX;0!=h&&0==d[h];h--);v=h;n>h&&(n=h);for(B=1<<q;q<h;q++,B<<=1)if(0>(B-=d[q])){this.status=2;this.m=n;return}if(0>(B-=d[h]))this.status=2,this.m=n;else{d[h]+=B;w[1]=q=0;x=d;p=1;for(u=2;0<--h;)w[u++]=q+=x[p++];x=a;h=p=0;do 0!=(q=x[p++])&&(f[w[q]++]=h);while(++h<b);b=w[v];w[0]=h=0;x=f;p=0;
f=-1;y=t[0]=0;u=null;for(C=0;m<=v;m++)for(a=d[m];0<a--;){for(;m>y+t[1+f];){y+=t[1+f];f++;C=(C=v-y)>n?n:C;if((k=1<<(q=m-y))>a+1)for(k-=a+1,u=m;++q<C&&!((k<<=1)<=d[++u]);)k-=d[u];y+q>l&&y<l&&(q=l-y);C=1<<q;t[1+f]=q;u=Array(C);for(k=0;k<C;k++)u[k]=new E;K=null==K?this.root=new J:K.next=new J;K.next=null;K.list=u;s[f]=u;0<f&&(w[f]=h,r.b=t[f],r.e=16+q,r.t=u,q=(h&(1<<y)-1)>>y-t[f],s[f-1][q].e=r.e,s[f-1][q].b=r.b,s[f-1][q].n=r.n,s[f-1][q].t=r.t)}r.b=m-y;p>=b?r.e=99:x[p]<e?(r.e=256>x[p]?16:15,r.n=x[p++]):
(r.e=g[x[p]-e],r.n=c[x[p++]-e]);k=1<<m-y;for(q=h>>y;q<C;q+=k)u[q].e=r.e,u[q].b=r.b,u[q].n=r.n,u[q].t=r.t;for(q=1<<m-1;0!=(h&q);q>>=1)h^=q;for(h^=q;(h&(1<<y)-1)!=w[f];)y-=t[f],f--}this.m=t[1];this.status=0!=B&&1!=v?1:0}}},B=function(a){for(;b<a;){var e=d,c;c=q.length==x?-1:q[x++];d=e|c<<b;b+=8}},N=function(a){return d&r[a]},H=function(a){d>>=a;b-=a},L=function(a,b,c){var d,v,f;if(0==c)return 0;for(f=0;;){B(l);v=n.list[N(l)];for(d=v.e;16<d;){if(99==d)return-1;H(v.b);d-=16;B(d);v=v.t[N(d)];d=v.e}H(v.b);
if(16==d)m&=32767,a[b+f++]=h[m++]=v.n;else{if(15==d)break;B(d);e=v.n+N(d);H(d);B(u);v=g.list[N(u)];for(d=v.e;16<d;){if(99==d)return-1;H(v.b);d-=16;B(d);v=v.t[N(d)];d=v.e}H(v.b);B(d);s=m-v.n-N(d);for(H(d);0<e&&f<c;)e--,s&=32767,m&=32767,a[b+f++]=h[m++]=h[s++]}if(f==c)return c}k=-1;return f},fa,ma=function(a,b,e){var c,d,k,f,h,q,m,p=Array(316);for(c=0;c<p.length;c++)p[c]=0;B(5);q=257+N(5);H(5);B(5);m=1+N(5);H(5);B(4);c=4+N(4);H(4);if(286<q||30<m)return-1;for(d=0;d<c;d++)B(3),p[C[d]]=N(3),H(3);for(;19>
d;d++)p[C[d]]=0;l=7;d=new K(p,19,19,null,null,l);if(0!=d.status)return-1;n=d.root;l=d.m;f=q+m;for(c=k=0;c<f;)if(B(l),h=n.list[N(l)],d=h.b,H(d),d=h.n,16>d)p[c++]=k=d;else if(16==d){B(2);d=3+N(2);H(2);if(c+d>f)return-1;for(;0<d--;)p[c++]=k}else{17==d?(B(3),d=3+N(3),H(3)):(B(7),d=11+N(7),H(7));if(c+d>f)return-1;for(;0<d--;)p[c++]=0;k=0}l=9;d=new K(p,q,257,y,t,l);0==l&&(d.status=1);if(0!=d.status)return-1;n=d.root;l=d.m;for(c=0;c<m;c++)p[c]=p[c+q];u=6;d=new K(p,m,0,w,v,u);g=d.root;u=d.m;return 0==u&&
257<q||0!=d.status?-1:L(a,b,e)};this.inflate=function(r,C){null==h&&(h=Array(65536));b=d=m=0;k=-1;p=!1;e=s=0;n=null;q=r;x=0;var J=new runtime.ByteArray(C);a:{var E,O;for(E=0;E<C&&(!p||-1!=k);){if(0<e){if(0!=k)for(;0<e&&E<C;)e--,s&=32767,m&=32767,J[0+E++]=h[m++]=h[s++];else{for(;0<e&&E<C;)e--,m&=32767,B(8),J[0+E++]=h[m++]=N(8),H(8);0==e&&(k=-1)}if(E==C)break}if(-1==k){if(p)break;B(1);0!=N(1)&&(p=!0);H(1);B(2);k=N(2);H(2);n=null;e=0}switch(k){case 0:O=J;var R=0+E,F=C-E,G=void 0,G=b&7;H(G);B(16);G=N(16);
H(16);B(16);if(G!=(~d&65535))O=-1;else{H(16);e=G;for(G=0;0<e&&G<F;)e--,m&=32767,B(8),O[R+G++]=h[m++]=N(8),H(8);0==e&&(k=-1);O=G}break;case 1:if(null!=n)O=L(J,0+E,C-E);else b:{O=J;R=0+E;F=C-E;if(null==f){for(var D=void 0,G=Array(288),D=void 0,D=0;144>D;D++)G[D]=8;for(;256>D;D++)G[D]=9;for(;280>D;D++)G[D]=7;for(;288>D;D++)G[D]=8;c=7;D=new K(G,288,257,y,t,c);if(0!=D.status){alert("HufBuild error: "+D.status);O=-1;break b}f=D.root;c=D.m;for(D=0;30>D;D++)G[D]=5;fa=5;D=new K(G,30,0,w,v,fa);if(1<D.status){f=
null;alert("HufBuild error: "+D.status);O=-1;break b}a=D.root;fa=D.m}n=f;g=a;l=c;u=fa;O=L(O,R,F)}break;case 2:O=null!=n?L(J,0+E,C-E):ma(J,0+E,C-E);break;default:O=-1}if(-1==O)break a;E+=O}}q=null;return J}};
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
core.LoopWatchDog=function(h,m){var f=Date.now(),a=0;this.check=function(){var c;if(h&&(c=Date.now(),c-f>h))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<m&&(a+=1,a>m))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){function h(m,f){f&&Array.isArray(f)?m=(m||[]).concat(f.map(function(a){return h({},a)})):f&&"object"===typeof f?(m=m||{},Object.keys(f).forEach(function(a){m[a]=h(m[a],f[a])})):m=f;return m}this.hashString=function(h){var f=0,a,c;a=0;for(c=h.length;a<c;a+=1)f=(f<<5)-f+h.charCodeAt(a),f|=0;return f};this.mergeObjects=h};
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
core.DomUtils=function(){function h(a,c){var d=null;a.nodeType===Node.TEXT_NODE&&(0===a.length?(a.parentNode.removeChild(a),c.nodeType===Node.TEXT_NODE&&(d=c)):(c.nodeType===Node.TEXT_NODE&&(a.appendData(c.data),c.parentNode.removeChild(c)),d=a));return d}function m(a,c){for(var d=0,b;a.parentNode!==c;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(b=c.firstChild;b!==a;)d+=1,b=b.nextSibling;return d}function f(a,c){return a===c||Boolean(a.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY)}
this.splitBoundaries=function(a){var c=[],d;if(a.startContainer.nodeType===Node.TEXT_NODE||a.endContainer.nodeType===Node.TEXT_NODE){d=a.endContainer;var b=a.endOffset;if(b<d.childNodes.length)for(d=d.childNodes[b],b=0;d.firstChild;)d=d.firstChild;else for(;d.lastChild;)d=d.lastChild,b=d.nodeType===Node.TEXT_NODE?d.textContent.length:d.childNodes.length;a.setEnd(d,b);0!==a.endOffset&&(a.endContainer.nodeType===Node.TEXT_NODE&&a.endOffset!==a.endContainer.length)&&(c.push(a.endContainer.splitText(a.endOffset)),
c.push(a.endContainer));0!==a.startOffset&&(a.startContainer.nodeType===Node.TEXT_NODE&&a.startOffset!==a.startContainer.length)&&(d=a.startContainer.splitText(a.startOffset),c.push(a.startContainer),c.push(d),a.setStart(d,0))}return c};this.containsRange=function(a,c){return 0>=a.compareBoundaryPoints(a.START_TO_START,c)&&0<=a.compareBoundaryPoints(a.END_TO_END,c)};this.rangesIntersect=function(a,c){return 0>=a.compareBoundaryPoints(a.END_TO_START,c)&&0<=a.compareBoundaryPoints(a.START_TO_END,c)};
this.getNodesInRange=function(a,c){var d=[],b,k=a.startContainer.ownerDocument.createTreeWalker(a.commonAncestorContainer,NodeFilter.SHOW_ALL,c,!1);for(b=k.currentNode=a.startContainer;b;){if(c(b)===NodeFilter.FILTER_ACCEPT)d.push(b);else if(c(b)===NodeFilter.FILTER_REJECT)break;b=b.parentNode}d.reverse();for(b=k.nextNode();b;)d.push(b),b=k.nextNode();return d};this.normalizeTextNodes=function(a){a&&a.nextSibling&&(a=h(a,a.nextSibling));a&&a.previousSibling&&h(a.previousSibling,a)};this.rangeContainsNode=
function(a,c){var d=c.ownerDocument.createRange(),b=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;d.setStart(a.startContainer,a.startOffset);d.setEnd(a.endContainer,a.endOffset);b=0===d.comparePoint(c,0)&&0===d.comparePoint(c,b);d.detach();return b};this.mergeIntoParent=function(a){for(var c=a.parentNode;a.firstChild;)c.insertBefore(a.firstChild,a);c.removeChild(a);return c};this.getElementsByTagNameNS=function(a,c,d){return Array.prototype.slice.call(a.getElementsByTagNameNS(c,d))};this.rangeIntersectsNode=
function(a,c){var d=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;return 0>=a.comparePoint(c,0)&&0<=a.comparePoint(c,d)};this.containsNode=function(a,c){return a===c||a.contains(c)};this.comparePoints=function(a,c,d,b){if(a===d)return b-c;var k=a.compareDocumentPosition(d);2===k?k=-1:4===k?k=1:10===k?(c=m(a,d),k=c<b?1:-1):(b=m(d,a),k=b<c?-1:1);return k};(function(a){var c=runtime.getWindow();null!==c&&(c=c.navigator.appVersion.toLowerCase(),c=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||
-1!==c.indexOf("safari")))&&(a.containsNode=f)})(this)};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(h,m){function f(a){a.parentNode&&(k.push(a.previousSibling),k.push(a.nextSibling),a.parentNode.removeChild(a))}function a(a,b,e){if(b.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(b),"putCursorIntoTextNode: invalid container");var c=b.parentNode;runtime.assert(Boolean(c),"putCursorIntoTextNode: container without parent");runtime.assert(0<=e&&e<=b.length,"putCursorIntoTextNode: offset is out of bounds");0===e?c.insertBefore(a,b):(e!==b.length&&b.splitText(e),c.insertBefore(a,
b.nextSibling))}else if(b.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(b),"putCursorIntoContainer: invalid container");for(c=b.firstChild;null!==c&&0<e;)c=c.nextSibling,e-=1;b.insertBefore(a,c)}k.push(a.previousSibling);k.push(a.nextSibling)}var c=h.createElementNS("urn:webodf:names:cursor","cursor"),d=h.createElementNS("urn:webodf:names:cursor","anchor"),b,k=[],p,e,s=new core.DomUtils;this.getNode=function(){return c};this.getAnchorNode=function(){return d.parentNode?d:c};this.getSelectedRange=
function(){e?(p.setStartBefore(c),p.collapse(!0)):(p.setStartAfter(b?d:c),p.setEndBefore(b?c:d));return p};this.setSelectedRange=function(n,g){p&&p!==n&&p.detach();p=n;b=!1!==g;(e=n.collapsed)?(f(d),f(c),a(c,n.startContainer,n.startOffset)):(f(d),f(c),a(b?c:d,n.endContainer,n.endOffset),a(b?d:c,n.startContainer,n.startOffset));k.forEach(s.normalizeTextNodes);k.length=0};this.remove=function(){f(c);k.forEach(s.normalizeTextNodes);k.length=0};c.setAttributeNS("urn:webodf:names:cursor","memberId",m);
d.setAttributeNS("urn:webodf:names:cursor","memberId",m)};
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
core.EventNotifier=function(h){var m={};this.emit=function(f,a){var c,d;runtime.assert(m.hasOwnProperty(f),'unknown event fired "'+f+'"');d=m[f];for(c=0;c<d.length;c+=1)d[c](a)};this.subscribe=function(f,a){runtime.assert(m.hasOwnProperty(f),'tried to subscribe to unknown event "'+f+'"');m[f].push(a);runtime.log('event "'+f+'" subscribed.')};this.unsubscribe=function(f,a){var c;runtime.assert(m.hasOwnProperty(f),'tried to unsubscribe from unknown event "'+f+'"');c=m[f].indexOf(a);runtime.assert(-1!==
c,'tried to unsubscribe unknown callback from event "'+f+'"');-1!==c&&m[f].splice(c,1);runtime.log('event "'+f+'" unsubscribed.')};(function(){var f;for(f=0;f<h.length;f+=1)m[h[f]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var h=runtime.getWindow().document,m=h.getElementById("testarea");runtime.assert(!m,'Unclean test environment, found a div with id "testarea".');m=h.createElement("div");m.setAttribute("id","testarea");h.body.appendChild(m);return m};
core.UnitTest.cleanupTestAreaDiv=function(){var h=runtime.getWindow().document,m=h.getElementById("testarea");runtime.assert(!!m&&m.parentNode===h.body,'Test environment broken, found no div with id "testarea" below body.');h.body.removeChild(m)};core.UnitTest.createOdtDocument=function(h,m){var f="<?xml version='1.0' encoding='UTF-8'?>",f=f+"<office:document";Object.keys(m).forEach(function(a){f+=" xmlns:"+a+'="'+m[a]+'"'});f+=">";f+=h;f+="</office:document>";return runtime.parseXML(f)};
core.UnitTestRunner=function(){function h(a){b+=1;runtime.log("fail",a)}function m(a,b){var c;try{if(a.length!==b.length)return h("array of length "+a.length+" should be "+b.length+" long"),!1;for(c=0;c<a.length;c+=1)if(a[c]!==b[c])return h(a[c]+" should be "+b[c]+" at array index "+c),!1}catch(d){return!1}return!0}function f(a,b,c){var d=a.attributes,g=d.length,l,k,q;for(l=0;l<g;l+=1)if(k=d.item(l),"xmlns"!==k.prefix){q=b.getAttributeNS(k.namespaceURI,k.localName);if(!b.hasAttributeNS(k.namespaceURI,
k.localName))return h("Attribute "+k.localName+" with value "+k.value+" was not present"),!1;if(q!==k.value)return h("Attribute "+k.localName+" was "+q+" should be "+k.value),!1}return c?!0:f(b,a,!0)}function a(b,e){if(b.nodeType!==e.nodeType)return h(b.nodeType+" should be "+e.nodeType),!1;if(b.nodeType===Node.TEXT_NODE)return b.data===e.data;runtime.assert(b.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(b.namespaceURI!==e.namespaceURI||b.localName!==e.localName)return h(b.namespaceURI+
" should be "+e.namespaceURI),!1;if(!f(b,e,!1))return!1;for(var c=b.firstChild,d=e.firstChild;c;){if(!d||!a(c,d))return!1;c=c.nextSibling;d=d.nextSibling}return d?!1:!0}function c(b,e){return 0===e?b===e&&1/b===1/e:b===e?!0:"number"===typeof e&&isNaN(e)?"number"===typeof b&&isNaN(b):Object.prototype.toString.call(e)===Object.prototype.toString.call([])?m(b,e):"object"===typeof e&&"object"===typeof b?e.constructor===Element||e.constructor===Node?a(e,b):k(e,b):!1}function d(a,b,d){"string"===typeof b&&
"string"===typeof d||runtime.log("WARN: shouldBe() expects string arguments");var n,g;try{g=eval(b)}catch(l){n=l}a=eval(d);n?h(b+" should be "+a+". Threw exception "+n):c(g,a)?runtime.log("pass",b+" is "+d):String(typeof g)===String(typeof a)?(d=0===g&&0>1/g?"-0":String(g),h(b+" should be "+a+". Was "+d+".")):h(b+" should be "+a+" (of type "+typeof a+"). Was "+g+" (of type "+typeof g+").")}var b=0,k;k=function(a,b){var d=Object.keys(a),n=Object.keys(b);d.sort();n.sort();return m(d,n)&&Object.keys(a).every(function(d){var n=
a[d],k=b[d];return c(n,k)?!0:(h(n+" should be "+k+" for key "+d),!1)})};this.areNodesEqual=a;this.shouldBeNull=function(a,b){d(a,b,"null")};this.shouldBeNonNull=function(a,b){var c,d;try{d=eval(b)}catch(g){c=g}c?h(b+" should be non-null. Threw exception "+c):null!==d?runtime.log("pass",b+" is non-null."):h(b+" should be non-null. Was "+d)};this.shouldBe=d;this.countFailedTests=function(){return b}};
core.UnitTester=function(){function h(a,c){return"<span style='color:blue;cursor:pointer' onclick='"+c+"'>"+a+"</span>"}var m=0,f={};this.runTests=function(a,c,d){function b(a){if(0===a.length)f[k]=s,m+=p.countFailedTests(),c();else{g=a[0];var d=Runtime.getFunctionName(g);runtime.log("Running "+d);u=p.countFailedTests();e.setUp();g(function(){e.tearDown();s[d]=u===p.countFailedTests();b(a.slice(1))})}}var k=Runtime.getFunctionName(a),p=new core.UnitTestRunner,e=new a(p),s={},n,g,l,u,q="BrowserRuntime"===
runtime.type();if(f.hasOwnProperty(k))runtime.log("Test "+k+" has already run.");else{q?runtime.log("<span>Running "+h(k,'runSuite("'+k+'");')+": "+e.description()+"</span>"):runtime.log("Running "+k+": "+e.description);l=e.tests();for(n=0;n<l.length;n+=1)g=l[n],a=Runtime.getFunctionName(g)||g.testName,d.length&&-1===d.indexOf(a)||(q?runtime.log("<span>Running "+h(a,'runTest("'+k+'","'+a+'")')+"</span>"):runtime.log("Running "+a),u=p.countFailedTests(),e.setUp(),g(),e.tearDown(),s[a]=u===p.countFailedTests());
b(e.asyncTests())}};this.countFailedTests=function(){return m};this.results=function(){return f}};
// Input 13
core.PositionIterator=function(h,m,f,a){function c(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function d(a){this.acceptNode=function(b){return b.nodeType===Node.TEXT_NODE&&0===b.length?NodeFilter.FILTER_REJECT:a.acceptNode(b)}}function b(){var a=p.currentNode.nodeType;e=a===Node.TEXT_NODE?p.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var k=this,p,e,s;this.nextPosition=function(){if(p.currentNode===h)return!1;
if(0===e&&p.currentNode.nodeType===Node.ELEMENT_NODE)null===p.firstChild()&&(e=1);else if(p.currentNode.nodeType===Node.TEXT_NODE&&e+1<p.currentNode.length)e+=1;else if(null!==p.nextSibling())e=0;else if(p.parentNode())e=1;else return!1;return!0};this.previousPosition=function(){var a=!0;if(0===e)if(null===p.previousSibling()){if(!p.parentNode()||p.currentNode===h)return p.firstChild(),!1;e=0}else b();else p.currentNode.nodeType===Node.TEXT_NODE?e-=1:null!==p.lastChild()?b():p.currentNode===h?a=!1:
e=0;return a};this.container=function(){var a=p.currentNode,b=a.nodeType;return 0===e&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=p.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&e===a.length)for(a=a.nextSibling;a&&1!==s(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===e&&(a=null);return a};this.leftNode=function(){var a=p.currentNode;if(0===e)for(a=a.previousSibling;a&&1!==s(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==s(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return p.currentNode};this.unfilteredDomOffset=function(){if(p.currentNode.nodeType===Node.TEXT_NODE)return e;for(var a=0,b=p.currentNode,b=1===e?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=function(){var a=p.currentNode,b=p.previousSibling();p.currentNode=a;return b};this.getNextSibling=function(){var a=p.currentNode,b=p.nextSibling();p.currentNode=a;return b};this.setUnfilteredPosition=function(a,
b){var c,d;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");p.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return e=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),b===a.length&&(e=void 0,p.nextSibling()?e=0:p.parentNode()&&(e=1),runtime.assert(void 0!==e,"Error in setPosition: position not valid.")),!0;c=s(a);for(d=a.parentNode;d&&d!==h&&c===NodeFilter.FILTER_ACCEPT;)c=
s(d),c!==NodeFilter.FILTER_ACCEPT&&(p.currentNode=d),d=d.parentNode;b<a.childNodes.length&&c!==NodeFilter.FILTER_REJECT?(p.currentNode=a.childNodes[b],c=s(p.currentNode),e=0):e=0===b?0:1;c===NodeFilter.FILTER_REJECT&&(e=1);if(c!==NodeFilter.FILTER_ACCEPT)return k.nextPosition();runtime.assert(s(p.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");return!0};this.moveToEnd=function(){p.currentNode=h;e=1};this.moveToEndOfNode=
function(a){a.nodeType===Node.TEXT_NODE?k.setUnfilteredPosition(a,a.length):(p.currentNode=a,e=1)};this.getNodeFilter=function(){return s};s=(f?new d(f):new c).acceptNode;s.acceptNode=s;p=h.ownerDocument.createTreeWalker(h,m||4294967295,s,a);e=0;null===p.firstChild()&&(e=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(h){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var h={},m=core.PositionFilter.FilterResult.FILTER_ACCEPT,f=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(a){for(var c in h)if(h.hasOwnProperty(c)&&h[c].acceptPosition(a)===f)return f;return m};this.addFilter=function(a,c){h[a]=c};this.removeFilter=function(a){delete h[a]}};
// Input 16
core.Async=function(){this.forEach=function(h,m,f){function a(a){b!==d&&(a?(b=d,f(a)):(b+=1,b===d&&f(null)))}var c,d=h.length,b=0;for(c=0;c<d;c+=1)m(h[c],a)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(h,m){function f(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],c,e,d=a.length,g=0,g=0;c=-1;for(e=0;e<d;e+=1)g=(c^a[e])&255,g=b[g],c=c>>>8^g;return c^-1}function a(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function c(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function d(b,c){var e,d,g,l,k,n,f,h=this;this.load=function(a){if(void 0!==h.data)a(null,h.data);else{var c=k+34+d+g+256;c+f>u&&(c=u-f);runtime.read(b,f,c,function(c,e){if(c||null===e)a(c,e);else a:{var d=e,g=new core.ByteArray(d),v=g.readUInt32LE(),f;if(67324752!==v)a("File entry signature is wrong."+v.toString()+" "+d.length.toString(),null);else{g.pos+=22;v=g.readUInt16LE();f=g.readUInt16LE();g.pos+=v+f;
if(l){d=d.slice(g.pos,g.pos+k);if(k!==d.length){a("The amount of compressed bytes read was "+d.length.toString()+" instead of "+k.toString()+" for "+h.filename+" in "+b+".",null);break a}d=x(d,n)}else d=d.slice(g.pos,g.pos+n);n!==d.length?a("The amount of bytes read was "+d.length.toString()+" instead of "+n.toString()+" for "+h.filename+" in "+b+".",null):(h.data=d,a(null,d))}}})}};this.set=function(a,b,c,e){h.filename=a;h.data=b;h.compressed=c;h.date=e};this.error=null;c&&(e=c.readUInt32LE(),33639248!==
e?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+b+'": '+c.data.length.toString():(c.pos+=6,l=c.readUInt16LE(),this.date=a(c.readUInt32LE()),c.readUInt32LE(),k=c.readUInt32LE(),n=c.readUInt32LE(),d=c.readUInt16LE(),g=c.readUInt16LE(),e=c.readUInt16LE(),c.pos+=8,f=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.slice(c.pos,c.pos+d),"utf8"),c.pos+=d+g+e))}function b(a,b){if(22!==a.length)b("Central directory length should be 22.",
r);else{var c=new core.ByteArray(a),e;e=c.readUInt32LE();101010256!==e?b("Central directory signature is wrong: "+e.toString(),r):(e=c.readUInt16LE(),0!==e?b("Zip files with non-zero disk numbers are not supported.",r):(e=c.readUInt16LE(),0!==e?b("Zip files with non-zero disk numbers are not supported.",r):(e=c.readUInt16LE(),q=c.readUInt16LE(),e!==q?b("Number of entries is inconsistent.",r):(e=c.readUInt32LE(),c=c.readUInt16LE(),c=u-22-e,runtime.read(h,c,u-c,function(a,c){if(a||null===c)b(a,r);else a:{var e=
new core.ByteArray(c),g,k;l=[];for(g=0;g<q;g+=1){k=new d(h,e);if(k.error){b(k.error,r);break a}l[l.length]=k}b(null,r)}})))))}}function k(a,b){var c=null,e,d;for(d=0;d<l.length;d+=1)if(e=l[d],e.filename===a){c=e;break}c?c.data?b(null,c.data):c.load(b):b(a+" not found.",null)}function p(a){var b=new core.ByteArrayWriter("utf8"),e=0;b.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(e=a.data.length);b.appendUInt32LE(c(a.date));b.appendUInt32LE(f(a.data));b.appendUInt32LE(e);b.appendUInt32LE(e);b.appendUInt16LE(a.filename.length);
b.appendUInt16LE(0);b.appendString(a.filename);a.data&&b.appendByteArray(a.data);return b}function e(a,b){var e=new core.ByteArrayWriter("utf8"),d=0;e.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(d=a.data.length);e.appendUInt32LE(c(a.date));e.appendUInt32LE(f(a.data));e.appendUInt32LE(d);e.appendUInt32LE(d);e.appendUInt16LE(a.filename.length);e.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);e.appendUInt32LE(b);e.appendString(a.filename);return e}function s(a,b){if(a===l.length)b(null);else{var c=l[a];
void 0!==c.data?s(a+1,b):c.load(function(c){c?b(c):s(a+1,b)})}}function n(a,b){s(0,function(c){if(c)b(c);else{c=new core.ByteArrayWriter("utf8");var d,g,k,n=[0];for(d=0;d<l.length;d+=1)c.appendByteArrayWriter(p(l[d])),n.push(c.getLength());k=c.getLength();for(d=0;d<l.length;d+=1)g=l[d],c.appendByteArrayWriter(e(g,n[d]));d=c.getLength()-k;c.appendArray([80,75,5,6,0,0,0,0]);c.appendUInt16LE(l.length);c.appendUInt16LE(l.length);c.appendUInt32LE(d);c.appendUInt32LE(k);c.appendArray([0,0]);a(c.getByteArray())}})}
function g(a,b){n(function(c){runtime.writeFile(a,c,b)},b)}var l,u,q,x=(new core.RawInflate).inflate,r=this,y=new core.Base64;this.load=k;this.save=function(a,b,c,e){var g,k;for(g=0;g<l.length;g+=1)if(k=l[g],k.filename===a){k.set(a,b,c,e);return}k=new d(h);k.set(a,b,c,e);l.push(k)};this.write=function(a){g(h,a)};this.writeAs=g;this.createByteArray=n;this.loadContentXmlAsFragments=function(a,b){r.loadAsString(a,function(a,c){if(a)return b.rootElementReady(a);b.rootElementReady(null,c,!0)})};this.loadAsString=
function(a,b){k(a,function(a,c){if(a||null===c)return b(a,null);var e=runtime.byteArrayToString(c,"utf8");b(null,e)})};this.loadAsDOM=function(a,b){r.loadAsString(a,function(a,c){if(a||null===c)b(a,null);else{var e=(new DOMParser).parseFromString(c,"text/xml");b(null,e)}})};this.loadAsDataURL=function(a,b,c){k(a,function(a,e){if(a)return c(a,null);var d=0,g;b||(b=80===e[1]&&78===e[2]&&71===e[3]?"image/png":255===e[0]&&216===e[1]&&255===e[2]?"image/jpeg":71===e[0]&&73===e[1]&&70===e[2]?"image/gif":
"");for(g="data:"+b+";base64,";d<e.length;)g+=y.convertUTF8ArrayToBase64(e.slice(d,Math.min(d+45E3,e.length))),d+=45E3;c(null,g)})};this.getEntries=function(){return l.slice()};u=-1;null===m?l=[]:runtime.getFileSize(h,function(a){u=a;0>u?m("File '"+h+"' cannot be read.",r):runtime.read(h,u-22,22,function(a,c){a||null===m||null===c?m(a,r):b(c,m)})})};
// Input 18
core.CSSUnits=function(){var h={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(m,f,a){return m*h[a]/h[f]};this.convertMeasure=function(h,f){var a,c;h&&f?(a=parseFloat(h),c=h.replace(a.toString(),""),a=this.convert(a,c,f)):a="";return a.toString()};this.getUnits=function(h){return h.substr(h.length-2,h.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(h){var m=function(){};m.prototype=h;return new m});
xmldom.LSSerializer=function(){function h(a){var d=a||{},b=function(a){var b={},c;for(c in a)a.hasOwnProperty(c)&&(b[a[c]]=c);return b}(a),k=[d],f=[b],e=0;this.push=function(){e+=1;d=k[e]=Object.create(d);b=f[e]=Object.create(b)};this.pop=function(){k[e]=void 0;f[e]=void 0;e-=1;d=k[e];b=f[e]};this.getLocalNamespaceDefinitions=function(){return b};this.getQName=function(a){var c=a.namespaceURI,e=0,l;if(!c)return a.localName;if(l=b[c])return l+":"+a.localName;do{l||!a.prefix?(l="ns"+e,e+=1):l=a.prefix;
if(d[l]===c)break;if(!d[l]){d[l]=c;b[c]=l;break}l=null}while(null===l);return l+":"+a.localName}}function m(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function f(c,d){var b="",k=a.filter?a.filter.acceptNode(d):NodeFilter.FILTER_ACCEPT,h;if(k===NodeFilter.FILTER_ACCEPT&&d.nodeType===Node.ELEMENT_NODE){c.push();h=c.getQName(d);var e,s=d.attributes,n,g,l,u="",q;e="<"+h;n=s.length;for(g=0;g<n;g+=1)l=s.item(g),"http://www.w3.org/2000/xmlns/"!==
l.namespaceURI&&(q=a.filter?a.filter.acceptNode(l):NodeFilter.FILTER_ACCEPT,q===NodeFilter.FILTER_ACCEPT&&(q=c.getQName(l),l="string"===typeof l.value?m(l.value):l.value,u+=" "+(q+'="'+l+'"')));n=c.getLocalNamespaceDefinitions();for(g in n)n.hasOwnProperty(g)&&((s=n[g])?"xmlns"!==s&&(e+=" xmlns:"+n[g]+'="'+g+'"'):e+=' xmlns="'+g+'"');b+=e+(u+">")}if(k===NodeFilter.FILTER_ACCEPT||k===NodeFilter.FILTER_SKIP){for(k=d.firstChild;k;)b+=f(c,k),k=k.nextSibling;d.nodeValue&&(b+=m(d.nodeValue))}h&&(b+="</"+
h+">",c.pop());return b}var a=this;this.filter=null;this.writeToString=function(a,d){if(!a)return"";var b=new h(d);return f(b,a)}};
// Input 21
xmldom.RelaxNGParser=function(){function h(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function m(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return m({name:a.name,e:[b].concat(a.e.slice(2))})}function f(a){a=a.split(":",2);var b="",c;1===a.length?a=["",a[0]]:b=a[0];for(c in k)k[c]===b&&(a[0]=c);return a}function a(b,c){for(var d=0,g,l,k=b.name;b.e&&d<b.e.length;)if(g=
b.e[d],"ref"===g.name){l=c[g.a.name];if(!l)throw g.a.name+" was not defined.";g=b.e.slice(d+1);b.e=b.e.slice(0,d);b.e=b.e.concat(l.e);b.e=b.e.concat(g)}else d+=1,a(g,c);g=b.e;"choice"!==k||g&&g[1]&&"empty"!==g[1].name||(g&&g[0]&&"empty"!==g[0].name?(g[1]=g[0],g[0]={name:"empty"}):(delete b.e,b.name="empty"));if("group"===k||"interleave"===k)"empty"===g[0].name?"empty"===g[1].name?(delete b.e,b.name="empty"):(k=b.name=g[1].name,b.names=g[1].names,g=b.e=g[1].e):"empty"===g[1].name&&(k=b.name=g[0].name,
b.names=g[0].names,g=b.e=g[0].e);"oneOrMore"===k&&"empty"===g[0].name&&(delete b.e,b.name="empty");if("attribute"===k){l=b.names?b.names.length:0;for(var h,m=[],r=[],d=0;d<l;d+=1)h=f(b.names[d]),r[d]=h[0],m[d]=h[1];b.localnames=m;b.namespaces=r}"interleave"===k&&("interleave"===g[0].name?b.e="interleave"===g[1].name?g[0].e.concat(g[1].e):[g[1]].concat(g[0].e):"interleave"===g[1].name&&(b.e=[g[0]].concat(g[1].e)))}function c(a,b){for(var d=0,g;a.e&&d<a.e.length;)g=a.e[d],"elementref"===g.name?(g.id=
g.id||0,a.e[d]=b[g.id]):"element"!==g.name&&c(g,b),d+=1}var d=this,b,k={"http://www.w3.org/XML/1998/namespace":"xml"},p;p=function(a,b,c){var d=[],l,h,q=a.localName,x=[];l=a.attributes;var r=q,y=x,t={},w,v;for(w=0;w<l.length;w+=1)if(v=l.item(w),v.namespaceURI)"http://www.w3.org/2000/xmlns/"===v.namespaceURI&&(k[v.value]=v.localName);else{"name"!==v.localName||"element"!==r&&"attribute"!==r||y.push(v.value);if("name"===v.localName||"combine"===v.localName||"type"===v.localName){var C=v,J;J=v.value;
J=J.replace(/^\s\s*/,"");for(var E=/\s/,K=J.length-1;E.test(J.charAt(K));)K-=1;J=J.slice(0,K+1);C.value=J}t[v.localName]=v.value}l=t;l.combine=l.combine||void 0;a=a.firstChild;r=d;y=x;for(t="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(w=p(a,b,r))"name"===w.name?y.push(k[w.a.ns]+":"+w.text):"choice"===w.name&&(w.names&&w.names.length)&&(y=y.concat(w.names),delete w.names),r.push(w)}else a.nodeType===Node.TEXT_NODE&&(t+=a.nodeValue);a=a.nextSibling}a=
t;"value"!==q&&"param"!==q&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===q&&void 0===l.type&&(l.type="token",l.datatypeLibrary="");"attribute"!==q&&"element"!==q||void 0===l.name||(h=f(l.name),d=[{name:"name",text:h[1],a:{ns:h[0]}}].concat(d),delete l.name);"name"===q||"nsName"===q||"value"===q?void 0===l.ns&&(l.ns=""):delete l.ns;"name"===q&&(h=f(a),l.ns=h[0],a=h[1]);1<d.length&&("define"===q||"oneOrMore"===q||"zeroOrMore"===q||"optional"===q||"list"===q||"mixed"===q)&&(d=[{name:"group",e:m({name:"group",
e:d}).e}]);2<d.length&&"element"===q&&(d=[d[0]].concat({name:"group",e:m({name:"group",e:d.slice(1)}).e}));1===d.length&&"attribute"===q&&d.push({name:"text",text:a});1!==d.length||"choice"!==q&&"group"!==q&&"interleave"!==q?2<d.length&&("choice"===q||"group"===q||"interleave"===q)&&(d=m({name:q,e:d}).e):(q=d[0].name,x=d[0].names,l=d[0].a,a=d[0].text,d=d[0].e);"mixed"===q&&(q="interleave",d=[d[0],{name:"text"}]);"optional"===q&&(q="choice",d=[d[0],{name:"empty"}]);"zeroOrMore"===q&&(q="choice",d=
[{name:"oneOrMore",e:[d[0]]},{name:"empty"}]);if("define"===q&&l.combine){a:{r=l.combine;y=l.name;t=d;for(w=0;c&&w<c.length;w+=1)if(v=c[w],"define"===v.name&&v.a&&v.a.name===y){v.e=[{name:r,e:v.e.concat(t)}];c=v;break a}c=null}if(c)return}c={name:q};d&&0<d.length&&(c.e=d);for(h in l)if(l.hasOwnProperty(h)){c.a=l;break}void 0!==a&&(c.text=a);x&&0<x.length&&(c.names=x);"element"===q&&(c.id=b.length,b.push(c),c={name:"elementref",id:c.id});return c};this.parseRelaxNGDOM=function(e,f){var n=[],g=p(e&&
e.documentElement,n,void 0),l,m,q={};for(l=0;l<g.e.length;l+=1)m=g.e[l],"define"===m.name?q[m.a.name]=m:"start"===m.name&&(b=m);if(!b)return[new h("No Relax NG start element was found.")];a(b,q);for(l in q)q.hasOwnProperty(l)&&a(q[l],q);for(l=0;l<n.length;l+=1)a(n[l],q);f&&(d.rootPattern=f(b.e[0],n));c(b,n);for(l=0;l<n.length;l+=1)c(n[l],n);d.start=b;d.elements=n;d.nsmap=k;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function h(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function m(a,b){return function(){var c={},d=0;return function(e){var g=e.hash||e.toString(),l;l=c[g];if(void 0!==l)return l;c[g]=l=b(e);l.hash=a+d.toString();d+=1;return l}}()}function f(a){return function(){var b={};return function(c){var d,e;e=b[c.localName];if(void 0===e)b[c.localName]=e={};else if(d=e[c.namespaceURI],void 0!==d)return d;return e[c.namespaceURI]=d=a(c)}}()}function a(a,
b,c){return function(){var d={},e=0;return function(g,l){var k=b&&b(g,l),n,f;if(void 0!==k)return k;k=g.hash||g.toString();n=l.hash||l.toString();f=d[k];if(void 0===f)d[k]=f={};else if(k=f[n],void 0!==k)return k;f[n]=k=c(g,l);k.hash=a+e.toString();e+=1;return k}}()}function c(a,b){"choice"===b.p1.type?c(a,b.p1):a[b.p1.hash]=b.p1;"choice"===b.p2.type?c(a,b.p2):a[b.p2.hash]=b.p2}function d(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return w},startTagOpenDeriv:function(c){return a.contains(c)?
l(b,v):w},attDeriv:function(){return w},startTagCloseDeriv:function(){return this}}}function b(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return v}}}function k(a,b,c,d){if(b===w)return w;if(d>=c.length)return b;0===d&&(d=0);for(var g=c.item(d);g.namespaceURI===e;){d+=1;if(d>=c.length)return b;g=c.item(d)}return g=k(a,b.attDeriv(a,c.item(d)),c,d+1)}function p(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):p(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
p(a,b,c.e[1])}var e="http://www.w3.org/2000/xmlns/",s,n,g,l,u,q,x,r,y,t,w={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return w},startTagOpenDeriv:function(){return w},attDeriv:function(){return w},startTagCloseDeriv:function(){return w},endTagDeriv:function(){return w}},v={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return w},startTagOpenDeriv:function(){return w},attDeriv:function(){return w},startTagCloseDeriv:function(){return v},endTagDeriv:function(){return w}},
C={type:"text",nullable:!0,hash:"text",textDeriv:function(){return C},startTagOpenDeriv:function(){return w},attDeriv:function(){return w},startTagCloseDeriv:function(){return C},endTagDeriv:function(){return w}},J,E,K;s=a("choice",function(a,b){if(a===w)return b;if(b===w||a===b)return a},function(a,b){var d={},e;c(d,{p1:a,p2:b});b=a=void 0;for(e in d)d.hasOwnProperty(e)&&(void 0===a?a=d[e]:b=void 0===b?d[e]:s(b,d[e]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,d){return s(a.textDeriv(c,d),b.textDeriv(c,d))},startTagOpenDeriv:f(function(c){return s(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,d){return s(a.attDeriv(c,d),b.attDeriv(c,d))},startTagCloseDeriv:h(function(){return s(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:h(function(){return s(a.endTagDeriv(),b.endTagDeriv())})}}(a,b)});n=function(a,b,c){return function(){var d={},e=0;return function(g,l){var k=b&&b(g,l),n,f;if(void 0!==k)return k;
k=g.hash||g.toString();n=l.hash||l.toString();k<n&&(f=k,k=n,n=f,f=g,g=l,l=f);f=d[k];if(void 0===f)d[k]=f={};else if(k=f[n],void 0!==k)return k;f[n]=k=c(g,l);k.hash=a+e.toString();e+=1;return k}}()}("interleave",function(a,b){if(a===w||b===w)return w;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){return s(n(a.textDeriv(c,d),b),n(a,b.textDeriv(c,d)))},startTagOpenDeriv:f(function(c){return s(J(function(a){return n(a,
b)},a.startTagOpenDeriv(c)),J(function(b){return n(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,d){return s(n(a.attDeriv(c,d),b),n(a,b.attDeriv(c,d)))},startTagCloseDeriv:h(function(){return n(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});g=a("group",function(a,b){if(a===w||b===w)return w;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){var e=g(a.textDeriv(c,d),b);return a.nullable?s(e,b.textDeriv(c,
d)):e},startTagOpenDeriv:function(c){var d=J(function(a){return g(a,b)},a.startTagOpenDeriv(c));return a.nullable?s(d,b.startTagOpenDeriv(c)):d},attDeriv:function(c,d){return s(g(a.attDeriv(c,d),b),g(a,b.attDeriv(c,d)))},startTagCloseDeriv:h(function(){return g(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});l=a("after",function(a,b){if(a===w||b===w)return w},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,d){return l(a.textDeriv(c,d),b)},startTagOpenDeriv:f(function(c){return J(function(a){return l(a,
b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,d){return l(a.attDeriv(c,d),b)},startTagCloseDeriv:h(function(){return l(a.startTagCloseDeriv(),b)}),endTagDeriv:h(function(){return a.nullable?b:w})}});u=m("oneormore",function(a){return a===w?w:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return g(a.textDeriv(b,c),s(this,v))},startTagOpenDeriv:function(b){var c=this;return J(function(a){return g(a,s(c,v))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return g(a.attDeriv(b,
c),s(this,v))},startTagCloseDeriv:h(function(){return u(a.startTagCloseDeriv())})}});x=a("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,d){return a.contains(d)&&(b.nullable&&/^\s+$/.test(d.nodeValue)||b.textDeriv(c,d.nodeValue).nullable)?v:w},startTagCloseDeriv:function(){return w}}});q=m("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?v:w},attDeriv:function(){return w},startTagCloseDeriv:function(){return this}}});
y=m("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return v},attDeriv:function(){return w},startTagCloseDeriv:function(){return this}}});J=function N(a,b){return"after"===b.type?l(b.p1,a(b.p2)):"choice"===b.type?s(N(a,b.p1),N(a,b.p2)):b};E=function(a,b,c){var d=c.currentNode;b=b.startTagOpenDeriv(d);b=k(a,b,d.attributes,0);var e=b=b.startTagCloseDeriv(),d=c.currentNode;b=c.firstChild();for(var g=[],l;b;)b.nodeType===Node.ELEMENT_NODE?g.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||g.push(b.nodeValue),b=c.nextSibling();0===g.length&&(g=[""]);l=e;for(e=0;l!==w&&e<g.length;e+=1)b=g[e],"string"===typeof b?l=/^\s*$/.test(b)?s(l,l.textDeriv(a,b)):l.textDeriv(a,b):(c.currentNode=b,l=E(a,l,c));c.currentNode=d;return b=l.endTagDeriv()};r=function(a){var b,c,d;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];p(b,c,a);a="";for(d=0;d<b.length;d+=
1)a+="{"+c[d]+"}"+b[d]+",";a={hash:a,contains:function(a){var d;for(d=0;d<b.length;d+=1)if(b[d]===a.localName&&c[d]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};t=function H(a,c){var e,l;if("elementref"===a.name){e=a.id||0;a=c[e];if(void 0!==a.name){var k=a;e=c[k.id]={hash:"element"+k.id.toString()};k=d(r(k.e[0]),t(k.e[1],c));for(l in k)k.hasOwnProperty(l)&&(e[l]=k[l]);return e}return a}switch(a.name){case "empty":return v;case "notAllowed":return w;
case "text":return C;case "choice":return s(H(a.e[0],c),H(a.e[1],c));case "interleave":e=H(a.e[0],c);for(l=1;l<a.e.length;l+=1)e=n(e,H(a.e[l],c));return e;case "group":return g(H(a.e[0],c),H(a.e[1],c));case "oneOrMore":return u(H(a.e[0],c));case "attribute":return x(r(a.e[0]),H(a.e[1],c));case "value":return q(a.text);case "data":return e=a.a&&a.a.type,void 0===e&&(e=""),y(e);case "list":return b()}throw"No support for "+a.name;};this.makePattern=function(a,b){var c={},d;for(d in b)b.hasOwnProperty(d)&&
(c[d]=b[d]);return d=t(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=E(null,K,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){K=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function h(a,c){this.message=function(){c&&(a+=c.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=c.nodeName,c.nodeValue&&(a+=" with value '"+c.nodeValue+"'"),a+=".");return a}}function m(a,d,f,e){return"empty"===a.name?null:c(a,d,f,e)}function f(a,c){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var f=c.currentNode,e=f?f.nodeType:0,s=null;e>Node.ELEMENT_NODE;){if(e!==Node.COMMENT_NODE&&(e!==Node.TEXT_NODE||!/^\s+$/.test(c.currentNode.nodeValue)))return[new h("Not allowed node of type "+
e+".")];e=(f=c.nextSibling())?f.nodeType:0}if(!f)return[new h("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(d[f.namespaceURI]+":"+f.localName))return[new h("Found "+f.nodeName+" instead of "+a.names+".",f)];if(c.firstChild()){for(s=m(a.e[1],c,f);c.nextSibling();)if(e=c.currentNode.nodeType,!(c.currentNode&&c.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(c.currentNode.nodeValue)||e===Node.COMMENT_NODE))return[new h("Spurious content.",c.currentNode)];if(c.parentNode()!==f)return[new h("Implementation error.")]}else s=
m(a.e[1],c,f);c.nextSibling();return s}var a,c,d;c=function(a,d,p,e){var s=a.name,n=null;if("text"===s)a:{for(var g=(a=d.currentNode)?a.nodeType:0;a!==p&&3!==g;){if(1===g){n=[new h("Element not allowed here.",a)];break a}g=(a=d.nextSibling())?a.nodeType:0}d.nextSibling();n=null}else if("data"===s)n=null;else if("value"===s)e!==a.text&&(n=[new h("Wrong value, should be '"+a.text+"', not '"+e+"'",p)]);else if("list"===s)n=null;else if("attribute"===s)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;s=a.localnames.length;for(n=0;n<s;n+=1){e=p.getAttributeNS(a.namespaces[n],a.localnames[n]);""!==e||p.hasAttributeNS(a.namespaces[n],a.localnames[n])||(e=void 0);if(void 0!==g&&void 0!==e){n=[new h("Attribute defined too often.",p)];break a}g=e}n=void 0===g?[new h("Attribute not found: "+a.names,p)]:m(a.e[1],d,p,g)}else if("element"===s)n=f(a,d);else if("oneOrMore"===s){e=0;do g=d.currentNode,s=c(a.e[0],d,p),e+=1;while(!s&&g!==d.currentNode);1<e?(d.currentNode=g,n=null):n=s}else if("choice"===
s){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;g=d.currentNode;if("empty"===a.e[0].name){if(s=c(a.e[1],d,p,e))d.currentNode=g;n=null}else{if(s=m(a.e[0],d,p,e))d.currentNode=g,s=c(a.e[1],d,p,e);n=s}}else if("group"===s){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;n=c(a.e[0],d,p)||c(a.e[1],d,p)}else if("interleave"===s)a:{g=a.e.length;e=[g];for(var l=g,u,q,x,r;0<l;){u=0;q=d.currentNode;for(n=0;n<g;n+=1)x=d.currentNode,!0!==e[n]&&e[n]!==x&&(r=a.e[n],(s=
c(r,d,p))?(d.currentNode=x,void 0===e[n]&&(e[n]=!1)):x===d.currentNode||"oneOrMore"===r.name||"choice"===r.name&&("oneOrMore"===r.e[0].name||"oneOrMore"===r.e[1].name)?(u+=1,e[n]=x):(u+=1,e[n]=!0));if(q===d.currentNode&&u===l){n=null;break a}if(0===u){for(n=0;n<g;n+=1)if(!1===e[n]){n=[new h("Interleave does not match.",p)];break a}n=null;break a}for(n=l=0;n<g;n+=1)!0!==e[n]&&(l+=1)}n=null}else throw s+" not allowed in nonEmptyPattern.";return n};this.validate=function(b,c){b.currentNode=b.root;var d=
m(a.e[0],b,b.root);c(d)};this.init=function(b,c){a=b;d=c}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function h(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function m(a){for(var b=[],c=0,d=a.length,e;c<d;){var k=a,f=d,m=b,p="",w=[],v=k.indexOf("[",c),C=k.indexOf("/",c),J=k.indexOf("=",c);h(C,v,J)?(p=k.substring(c,C),c=C+1):h(v,C,J)?(p=k.substring(c,v),c=s(k,v,w)):h(J,C,v)?(p=k.substring(c,J),c=J):(p=k.substring(c,f),c=f);m.push({location:p,predicates:w});if(c<d&&"="===a[c]){e=a.substring(c+1,d);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);else try{e=
parseInt(e,10)}catch(E){}c=d}}return{steps:b,value:e}}function f(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function a(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function c(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function d(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function b(a,b,c){b=b.split(":",2);var e=c(b[0]),k=b[1];return new d(a,function(a){return a.localName===k&&a.namespaceURI===e})}function k(a,b,c){var k=new f,h=e(k,b,c),m=b.value;return void 0===m?new d(a,function(a){k.setNode(a);
h.reset();return h.next()}):new d(a,function(a){k.setNode(a);h.reset();return(a=h.next())&&a.nodeValue===m})}function p(a,b,c){var d=a.ownerDocument,k=[],h=null;if(d&&d.evaluate)for(c=d.evaluate(b,a,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),h=c.iterateNext();null!==h;)h.nodeType===Node.ELEMENT_NODE&&k.push(h),h=c.iterateNext();else{k=new f;k.setNode(a);a=m(b);k=e(k,a,c);a=[];for(c=k.next();c;)a.push(c),c=k.next();k=a}return k}var e,s;s=function(a,b,c){for(var d=b,e=a.length,k=0;d<e;)"]"===
a[d]?(k-=1,0>=k&&c.push(m(a.substring(b,d)))):"["===a[d]&&(0>=k&&(b=d+1),k+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};e=function(d,e,l){var f,h,m,r;for(f=0;f<e.steps.length;f+=1)for(m=e.steps[f],h=m.location,""===h?d=new c(d,!1):"@"===h[0]?(r=h.slice(1).split(":",2),d=new a(d,l(r[0]),r[1])):"."!==h&&(d=new c(d,!1),-1!==h.indexOf(":")&&(d=b(d,h,l))),h=0;h<m.predicates.length;h+=1)r=m.predicates[h],d=k(d,r,l);return d};xmldom.XPath=
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
gui.AnnotationViewManager=function(h,m,f){function a(a){var b=a.node,c=a.end;a=p.createRange();c&&(a.setStart(b,b.childNodes.length),a.setEnd(c,0),c=e.getTextNodes(a,!1),c.forEach(function(a){var c=p.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function c(a){var b=h.getSizer();a?(f.style.display="inline-block",b.style.paddingRight=s.getComputedStyle(f).width):
(f.style.display="none",b.style.paddingRight=0);h.refreshSize()}function d(){k.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function b(){var a;for(a=0;a<k.length;a+=1){var b=k[a],c=b.node.parentNode,d=c.nextSibling,e=d.nextSibling,m=c.parentNode,r=0,y=k[k.indexOf(b)-1],t=void 0,b=b.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],r=void 0,r=h.getZoomLevel();c.style.left=(f.getBoundingClientRect().left-m.getBoundingClientRect().left)/
r+"px";c.style.width=f.getBoundingClientRect().width/r+"px";d.style.width=parseFloat(c.style.left)-30+"px";y&&(t=y.node.parentNode.getBoundingClientRect(),20>=(m.getBoundingClientRect().top-t.bottom)/r?c.style.top=Math.abs(m.getBoundingClientRect().top-t.bottom)/r+20+"px":c.style.top="0px");e.style.left=d.getBoundingClientRect().width/r+"px";var d=e.style,m=e.getBoundingClientRect().left/r,y=e.getBoundingClientRect().top/r,t=c.getBoundingClientRect().left/r,w=c.getBoundingClientRect().top/r,v=0,C=
0,v=t-m,v=v*v,C=w-y,C=C*C,m=Math.sqrt(v+C);d.width=m+"px";r=Math.asin((c.getBoundingClientRect().top-e.getBoundingClientRect().top)/(r*parseFloat(e.style.width)));e.style.transform="rotate("+r+"rad)";e.style.MozTransform="rotate("+r+"rad)";e.style.WebkitTransform="rotate("+r+"rad)";e.style.msTransform="rotate("+r+"rad)";b&&(r=s.getComputedStyle(b,":before").content)&&"none"!==r&&(r=r.substring(1,r.length-1),b.firstChild?b.firstChild.nodeValue=r:b.appendChild(p.createTextNode(r)))}}var k=[],p=m.ownerDocument,
e=new odf.OdfUtils,s=runtime.getWindow();runtime.assert(Boolean(s),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=b;this.addAnnotation=function(e){c(!0);k.push({node:e.node,end:e.end});d();var g=p.createElement("div"),l=p.createElement("div"),f=p.createElement("div"),h=p.createElement("div"),m=p.createElement("div"),r=e.node;g.className="annotationWrapper";r.parentNode.insertBefore(g,r);l.className="annotationNote";l.appendChild(r);m.className=
"annotationRemoveButton";l.appendChild(m);f.className="annotationConnector horizontal";h.className="annotationConnector angular";g.appendChild(l);g.appendChild(f);g.appendChild(h);e.end&&a(e);b()};this.forgetAnnotations=function(){for(;k.length;){var a=k[0],b=k.indexOf(a),d=a.node,e=d.parentNode.parentNode;"div"===e.localName&&(e.parentNode.insertBefore(d,e),e.parentNode.removeChild(e));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=p.querySelectorAll('span.annotationHighlight[annotation="'+
a+'"]');e=d=void 0;for(d=0;d<a.length;d+=1){for(e=a[d];e.firstChild;)e.parentNode.insertBefore(e.firstChild,e);e.parentNode.removeChild(e)}-1!==b&&k.splice(b,1);0===k.length&&c(!1)}}};
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
odf.OdfNodeFilter=function(){this.acceptNode=function(h){return"http://www.w3.org/1999/xhtml"===h.namespaceURI?NodeFilter.FILTER_SKIP:h.namespaceURI&&h.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
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
odf.Namespaces=function(){function h(a){return m[a]||null}var m={db:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",dc:"http://purl.org/dc/elements/1.1/",dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chart:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",form:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",webodf:"urn:webodf"},f;h.lookupNamespaceURI=h;f=function(){};f.forEachPrefix=
function(a){for(var c in m)m.hasOwnProperty(c)&&a(c,m[c])};f.resolvePrefix=h;f.namespaceMap=m;f.dbns="urn:oasis:names:tc:opendocument:xmlns:database:1.0";f.dcns="http://purl.org/dc/elements/1.1/";f.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";f.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";f.chartns="urn:oasis:names:tc:opendocument:xmlns:chart:1.0";f.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";f.formns="urn:oasis:names:tc:opendocument:xmlns:form:1.0";
f.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";f.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";f.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";f.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";f.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";f.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";f.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";f.xlinkns="http://www.w3.org/1999/xlink";f.xmlns="http://www.w3.org/XML/1998/namespace";
f.webodfns="urn:webodf";return f}();
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
odf.StyleInfo=function(){function h(a,b){for(var c=v[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,g,c=0;c<e;c+=1)(g=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,w[d[c].ns]+d[c].localname,b+g);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,h(d,b)),c=c.nextSibling}function m(a,b){for(var c=v[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,g,c=0;c<e;c+=1)if(g=a.getAttributeNS(d[c].ns,d[c].localname))g=g.replace(b,""),a.setAttributeNS(d[c].ns,w[d[c].ns]+d[c].localname,
g);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,m(d,b)),c=c.nextSibling}function f(a,c){var b=v[a.localName],d=(b=b&&b[a.namespaceURI])?b.length:0,e,g,k;for(k=0;k<d;k+=1)if(e=a.getAttributeNS(b[k].ns,b[k].localname))c=c||{},g=b[k].keyname,g=c[g]=c[g]||{},g[e]=1;return c}function a(b,c){var d,e;f(b,c);for(d=b.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(e=d,a(e,c)),d=d.nextSibling}function c(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function d(a,b,d){var e=a+'"'+
b,g=d[e];g||(g=d[e]=new c(e,a,b));return g}function b(a,c,e){var g=v[a.localName],k=(g=g&&g[a.namespaceURI])?g.length:0,l=a.getAttributeNS(r,"name"),f=a.getAttributeNS(r,"family"),h;l&&f&&(c=d(l,f,e));if(c)for(l=0;l<k;l+=1)if(f=a.getAttributeNS(g[l].ns,g[l].localname))h=g[l].keyname,f=d(f,h,e),c.requires[f.key]=f;for(l=a.firstChild;l;)l.nodeType===Node.ELEMENT_NODE&&(a=l,b(a,c,e)),l=l.nextSibling;return e}function k(a,c){var b=c[a.family];b||(b=c[a.family]={});b[a.name]=1;Object.keys(a.requires).forEach(function(b){k(a.requires[b],
c)})}function p(a,c){var d=b(a,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&k(a,c)})}var e=odf.Namespaces.chartns,s=odf.Namespaces.dbns,n=odf.Namespaces.dr3dns,g=odf.Namespaces.drawns,l=odf.Namespaces.formns,u=odf.Namespaces.numberns,q=odf.Namespaces.officens,x=odf.Namespaces.presentationns,r=odf.Namespaces.stylens,y=odf.Namespaces.tablens,t=odf.Namespaces.textns,w={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},e={text:[{ens:r,en:"tab-stop",ans:r,a:"leader-text-style"},{ens:r,en:"drop-cap",ans:r,a:"style-name"},{ens:t,en:"notes-configuration",ans:t,a:"citation-body-style-name"},{ens:t,en:"notes-configuration",ans:t,a:"citation-style-name"},{ens:t,en:"a",ans:t,a:"style-name"},{ens:t,en:"alphabetical-index",ans:t,a:"style-name"},{ens:t,en:"linenumbering-configuration",
ans:t,a:"style-name"},{ens:t,en:"list-level-style-number",ans:t,a:"style-name"},{ens:t,en:"ruby-text",ans:t,a:"style-name"},{ens:t,en:"span",ans:t,a:"style-name"},{ens:t,en:"a",ans:t,a:"visited-style-name"},{ens:r,en:"text-properties",ans:r,a:"text-line-through-text-style"},{ens:t,en:"alphabetical-index-source",ans:t,a:"main-entry-style-name"},{ens:t,en:"index-entry-bibliography",ans:t,a:"style-name"},{ens:t,en:"index-entry-chapter",ans:t,a:"style-name"},{ens:t,en:"index-entry-link-end",ans:t,a:"style-name"},
{ens:t,en:"index-entry-link-start",ans:t,a:"style-name"},{ens:t,en:"index-entry-page-number",ans:t,a:"style-name"},{ens:t,en:"index-entry-span",ans:t,a:"style-name"},{ens:t,en:"index-entry-tab-stop",ans:t,a:"style-name"},{ens:t,en:"index-entry-text",ans:t,a:"style-name"},{ens:t,en:"index-title-template",ans:t,a:"style-name"},{ens:t,en:"list-level-style-bullet",ans:t,a:"style-name"},{ens:t,en:"outline-level-style",ans:t,a:"style-name"}],paragraph:[{ens:g,en:"caption",ans:g,a:"text-style-name"},{ens:g,
en:"circle",ans:g,a:"text-style-name"},{ens:g,en:"connector",ans:g,a:"text-style-name"},{ens:g,en:"control",ans:g,a:"text-style-name"},{ens:g,en:"custom-shape",ans:g,a:"text-style-name"},{ens:g,en:"ellipse",ans:g,a:"text-style-name"},{ens:g,en:"frame",ans:g,a:"text-style-name"},{ens:g,en:"line",ans:g,a:"text-style-name"},{ens:g,en:"measure",ans:g,a:"text-style-name"},{ens:g,en:"path",ans:g,a:"text-style-name"},{ens:g,en:"polygon",ans:g,a:"text-style-name"},{ens:g,en:"polyline",ans:g,a:"text-style-name"},
{ens:g,en:"rect",ans:g,a:"text-style-name"},{ens:g,en:"regular-polygon",ans:g,a:"text-style-name"},{ens:q,en:"annotation",ans:g,a:"text-style-name"},{ens:l,en:"column",ans:l,a:"text-style-name"},{ens:r,en:"style",ans:r,a:"next-style-name"},{ens:y,en:"body",ans:y,a:"paragraph-style-name"},{ens:y,en:"even-columns",ans:y,a:"paragraph-style-name"},{ens:y,en:"even-rows",ans:y,a:"paragraph-style-name"},{ens:y,en:"first-column",ans:y,a:"paragraph-style-name"},{ens:y,en:"first-row",ans:y,a:"paragraph-style-name"},
{ens:y,en:"last-column",ans:y,a:"paragraph-style-name"},{ens:y,en:"last-row",ans:y,a:"paragraph-style-name"},{ens:y,en:"odd-columns",ans:y,a:"paragraph-style-name"},{ens:y,en:"odd-rows",ans:y,a:"paragraph-style-name"},{ens:t,en:"notes-configuration",ans:t,a:"default-style-name"},{ens:t,en:"alphabetical-index-entry-template",ans:t,a:"style-name"},{ens:t,en:"bibliography-entry-template",ans:t,a:"style-name"},{ens:t,en:"h",ans:t,a:"style-name"},{ens:t,en:"illustration-index-entry-template",ans:t,a:"style-name"},
{ens:t,en:"index-source-style",ans:t,a:"style-name"},{ens:t,en:"object-index-entry-template",ans:t,a:"style-name"},{ens:t,en:"p",ans:t,a:"style-name"},{ens:t,en:"table-index-entry-template",ans:t,a:"style-name"},{ens:t,en:"table-of-content-entry-template",ans:t,a:"style-name"},{ens:t,en:"table-index-entry-template",ans:t,a:"style-name"},{ens:t,en:"user-index-entry-template",ans:t,a:"style-name"},{ens:r,en:"page-layout-properties",ans:r,a:"register-truth-ref-style-name"}],chart:[{ens:e,en:"axis",ans:e,
a:"style-name"},{ens:e,en:"chart",ans:e,a:"style-name"},{ens:e,en:"data-label",ans:e,a:"style-name"},{ens:e,en:"data-point",ans:e,a:"style-name"},{ens:e,en:"equation",ans:e,a:"style-name"},{ens:e,en:"error-indicator",ans:e,a:"style-name"},{ens:e,en:"floor",ans:e,a:"style-name"},{ens:e,en:"footer",ans:e,a:"style-name"},{ens:e,en:"grid",ans:e,a:"style-name"},{ens:e,en:"legend",ans:e,a:"style-name"},{ens:e,en:"mean-value",ans:e,a:"style-name"},{ens:e,en:"plot-area",ans:e,a:"style-name"},{ens:e,en:"regression-curve",
ans:e,a:"style-name"},{ens:e,en:"series",ans:e,a:"style-name"},{ens:e,en:"stock-gain-marker",ans:e,a:"style-name"},{ens:e,en:"stock-loss-marker",ans:e,a:"style-name"},{ens:e,en:"stock-range-line",ans:e,a:"style-name"},{ens:e,en:"subtitle",ans:e,a:"style-name"},{ens:e,en:"title",ans:e,a:"style-name"},{ens:e,en:"wall",ans:e,a:"style-name"}],section:[{ens:t,en:"alphabetical-index",ans:t,a:"style-name"},{ens:t,en:"bibliography",ans:t,a:"style-name"},{ens:t,en:"illustration-index",ans:t,a:"style-name"},
{ens:t,en:"index-title",ans:t,a:"style-name"},{ens:t,en:"object-index",ans:t,a:"style-name"},{ens:t,en:"section",ans:t,a:"style-name"},{ens:t,en:"table-of-content",ans:t,a:"style-name"},{ens:t,en:"table-index",ans:t,a:"style-name"},{ens:t,en:"user-index",ans:t,a:"style-name"}],ruby:[{ens:t,en:"ruby",ans:t,a:"style-name"}],table:[{ens:s,en:"query",ans:s,a:"style-name"},{ens:s,en:"table-representation",ans:s,a:"style-name"},{ens:y,en:"background",ans:y,a:"style-name"},{ens:y,en:"table",ans:y,a:"style-name"}],
"table-column":[{ens:s,en:"column",ans:s,a:"style-name"},{ens:y,en:"table-column",ans:y,a:"style-name"}],"table-row":[{ens:s,en:"query",ans:s,a:"default-row-style-name"},{ens:s,en:"table-representation",ans:s,a:"default-row-style-name"},{ens:y,en:"table-row",ans:y,a:"style-name"}],"table-cell":[{ens:s,en:"column",ans:s,a:"default-cell-style-name"},{ens:y,en:"table-column",ans:y,a:"default-cell-style-name"},{ens:y,en:"table-row",ans:y,a:"default-cell-style-name"},{ens:y,en:"body",ans:y,a:"style-name"},
{ens:y,en:"covered-table-cell",ans:y,a:"style-name"},{ens:y,en:"even-columns",ans:y,a:"style-name"},{ens:y,en:"covered-table-cell",ans:y,a:"style-name"},{ens:y,en:"even-columns",ans:y,a:"style-name"},{ens:y,en:"even-rows",ans:y,a:"style-name"},{ens:y,en:"first-column",ans:y,a:"style-name"},{ens:y,en:"first-row",ans:y,a:"style-name"},{ens:y,en:"last-column",ans:y,a:"style-name"},{ens:y,en:"last-row",ans:y,a:"style-name"},{ens:y,en:"odd-columns",ans:y,a:"style-name"},{ens:y,en:"odd-rows",ans:y,a:"style-name"},
{ens:y,en:"table-cell",ans:y,a:"style-name"}],graphic:[{ens:n,en:"cube",ans:g,a:"style-name"},{ens:n,en:"extrude",ans:g,a:"style-name"},{ens:n,en:"rotate",ans:g,a:"style-name"},{ens:n,en:"scene",ans:g,a:"style-name"},{ens:n,en:"sphere",ans:g,a:"style-name"},{ens:g,en:"caption",ans:g,a:"style-name"},{ens:g,en:"circle",ans:g,a:"style-name"},{ens:g,en:"connector",ans:g,a:"style-name"},{ens:g,en:"control",ans:g,a:"style-name"},{ens:g,en:"custom-shape",ans:g,a:"style-name"},{ens:g,en:"ellipse",ans:g,a:"style-name"},
{ens:g,en:"frame",ans:g,a:"style-name"},{ens:g,en:"g",ans:g,a:"style-name"},{ens:g,en:"line",ans:g,a:"style-name"},{ens:g,en:"measure",ans:g,a:"style-name"},{ens:g,en:"page-thumbnail",ans:g,a:"style-name"},{ens:g,en:"path",ans:g,a:"style-name"},{ens:g,en:"polygon",ans:g,a:"style-name"},{ens:g,en:"polyline",ans:g,a:"style-name"},{ens:g,en:"rect",ans:g,a:"style-name"},{ens:g,en:"regular-polygon",ans:g,a:"style-name"},{ens:q,en:"annotation",ans:g,a:"style-name"}],presentation:[{ens:n,en:"cube",ans:x,
a:"style-name"},{ens:n,en:"extrude",ans:x,a:"style-name"},{ens:n,en:"rotate",ans:x,a:"style-name"},{ens:n,en:"scene",ans:x,a:"style-name"},{ens:n,en:"sphere",ans:x,a:"style-name"},{ens:g,en:"caption",ans:x,a:"style-name"},{ens:g,en:"circle",ans:x,a:"style-name"},{ens:g,en:"connector",ans:x,a:"style-name"},{ens:g,en:"control",ans:x,a:"style-name"},{ens:g,en:"custom-shape",ans:x,a:"style-name"},{ens:g,en:"ellipse",ans:x,a:"style-name"},{ens:g,en:"frame",ans:x,a:"style-name"},{ens:g,en:"g",ans:x,a:"style-name"},
{ens:g,en:"line",ans:x,a:"style-name"},{ens:g,en:"measure",ans:x,a:"style-name"},{ens:g,en:"page-thumbnail",ans:x,a:"style-name"},{ens:g,en:"path",ans:x,a:"style-name"},{ens:g,en:"polygon",ans:x,a:"style-name"},{ens:g,en:"polyline",ans:x,a:"style-name"},{ens:g,en:"rect",ans:x,a:"style-name"},{ens:g,en:"regular-polygon",ans:x,a:"style-name"},{ens:q,en:"annotation",ans:x,a:"style-name"}],"drawing-page":[{ens:g,en:"page",ans:g,a:"style-name"},{ens:x,en:"notes",ans:g,a:"style-name"},{ens:r,en:"handout-master",
ans:g,a:"style-name"},{ens:r,en:"master-page",ans:g,a:"style-name"}],"list-style":[{ens:t,en:"list",ans:t,a:"style-name"},{ens:t,en:"numbered-paragraph",ans:t,a:"style-name"},{ens:t,en:"list-item",ans:t,a:"style-override"},{ens:r,en:"style",ans:r,a:"list-style-name"}],data:[{ens:r,en:"style",ans:r,a:"data-style-name"},{ens:r,en:"style",ans:r,a:"percentage-data-style-name"},{ens:x,en:"date-time-decl",ans:r,a:"data-style-name"},{ens:t,en:"creation-date",ans:r,a:"data-style-name"},{ens:t,en:"creation-time",
ans:r,a:"data-style-name"},{ens:t,en:"database-display",ans:r,a:"data-style-name"},{ens:t,en:"date",ans:r,a:"data-style-name"},{ens:t,en:"editing-duration",ans:r,a:"data-style-name"},{ens:t,en:"expression",ans:r,a:"data-style-name"},{ens:t,en:"meta-field",ans:r,a:"data-style-name"},{ens:t,en:"modification-date",ans:r,a:"data-style-name"},{ens:t,en:"modification-time",ans:r,a:"data-style-name"},{ens:t,en:"print-date",ans:r,a:"data-style-name"},{ens:t,en:"print-time",ans:r,a:"data-style-name"},{ens:t,
en:"table-formula",ans:r,a:"data-style-name"},{ens:t,en:"time",ans:r,a:"data-style-name"},{ens:t,en:"user-defined",ans:r,a:"data-style-name"},{ens:t,en:"user-field-get",ans:r,a:"data-style-name"},{ens:t,en:"user-field-input",ans:r,a:"data-style-name"},{ens:t,en:"variable-get",ans:r,a:"data-style-name"},{ens:t,en:"variable-input",ans:r,a:"data-style-name"},{ens:t,en:"variable-set",ans:r,a:"data-style-name"}],"page-layout":[{ens:x,en:"notes",ans:r,a:"page-layout-name"},{ens:r,en:"handout-master",ans:r,
a:"page-layout-name"},{ens:r,en:"master-page",ans:r,a:"page-layout-name"}]},v,C=new xmldom.XPath;this.UsedStyleList=function(b,c){var d={};this.uses=function(a){var b=a.localName,c=a.getAttributeNS(g,"name")||a.getAttributeNS(r,"name");a="style"===b?a.getAttributeNS(r,"family"):a.namespaceURI===u?"data":b;return(a=d[a])?0<a[c]:!1};a(b,d);c&&p(c,d)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),e=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,"family");return C.getODFElementsWithXPath(a,
"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,c,b){var d;if(a){for(d=a.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d,k=c,l=e.getAttributeNS(g,"name"),f=void 0;l?f=g:(l=e.getAttributeNS(r,"name"))&&(f=r);f&&e.setAttributeNS(f,w[f]+"name",k+l)}d=d.nextSibling}h(a,c);b&&h(b,c)}};this.removePrefixFromStyleNames=function(a,c,b){var d=RegExp("^"+c);if(a){for(c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE){var e=c,
k=d,l=e.getAttributeNS(g,"name"),f=void 0;l?f=g:(l=e.getAttributeNS(r,"name"))&&(f=r);f&&(l=l.replace(k,""),e.setAttributeNS(f,w[f]+"name",l))}c=c.nextSibling}m(a,d);b&&m(b,d)}};this.determineStylesForNode=f;v=function(a){var c,b,d,e,g,k={},l;for(c in a)if(a.hasOwnProperty(c))for(e=a[c],d=e.length,b=0;b<d;b+=1)g=e[b],l=k[g.en]=k[g.en]||{},l=l[g.ens]=l[g.ens]||[],l.push({ns:g.ans,localname:g.a,keyname:c});return k}(e)};
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
odf.OdfUtils=function(){function h(a){var c=a&&a.localName;return("p"===c||"h"===c)&&a.namespaceURI===r}function m(a){for(;a&&!h(a);)a=a.parentNode;return a}function f(a){return/^[ \t\r\n]+$/.test(a)}function a(a){var c=a&&a.localName;return/^(span|p|h|a|meta)$/.test(c)&&a.namespaceURI===r||"span"===c&&"annotationHighlight"===a.className?!0:!1}function c(a){var c=a&&a.localName,b,d=!1;c&&(b=a.namespaceURI,b===r?d="s"===c||"tab"===c||"line-break"===c:b===y&&(d="frame"===c&&"as-char"===a.getAttributeNS(r,
"anchor-type")));return d}function d(c){for(;null!==c.firstChild&&a(c);)c=c.firstChild;return c}function b(c){for(;null!==c.lastChild&&a(c);)c=c.lastChild;return c}function k(a){for(;!h(a)&&null===a.previousSibling;)a=a.parentNode;return h(a)?null:b(a.previousSibling)}function p(a){for(;!h(a)&&null===a.nextSibling;)a=a.parentNode;return h(a)?null:d(a.nextSibling)}function e(a){for(var b=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=k(a);else return!f(a.data.substr(a.length-1,1));else c(a)?
(b=!0,a=null):a=k(a);return b}function s(a){var b=!1;for(a=a&&d(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!f(a.data)){b=!0;break}if(c(a)){b=!0;break}a=p(a)}return b}function n(a,c){return f(a.data.substr(c))?!s(p(a)):!1}function g(a,b){var d=a.data,g;if(!f(d[b])||c(a.parentNode))return!1;0<b?f(d[b-1])||(g=!0):e(k(a))&&(g=!0);return!0===g?n(a,b)?!1:!0:!1}function l(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function u(a){return(a=l(a))&&(0>a.value||"%"===a.unit)?null:a}function q(a){return(a=l(a))&&"%"!==a.unit?null:a}function x(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}
var r=odf.Namespaces.textns,y=odf.Namespaces.drawns,t=/^\s*$/,w=new core.DomUtils;this.isParagraph=h;this.getParagraphElement=m;this.isWithinTrackedChanges=function(a,c){for(;a&&a!==c;){if(a.namespaceURI===r&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===r};this.isODFWhitespace=f;this.isGroupingElement=a;this.isCharacterElement=c;this.firstChild=d;this.lastChild=b;this.previousNode=k;this.nextNode=
p;this.scanLeftForNonWhitespace=e;this.lookLeftForCharacter=function(a){var b;b=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(b=a.data,b=f(b.substr(b.length-1,1))?1===b.length?e(k(a))?2:0:f(b.substr(b.length-2,1))?0:2:1):c(a)&&(b=1);return b};this.lookRightForCharacter=function(a){var b=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?b=!f(a.data.substr(0,1)):c(a)&&(b=!0);return b};this.scanLeftForAnyCharacter=function(a){var d=!1;for(a=a&&b(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!f(a.data)){d=
!0;break}if(c(a)){d=!0;break}a=k(a)}return d};this.scanRightForAnyCharacter=s;this.isTrailingWhitespace=n;this.isSignificantWhitespace=g;this.isDowngradableSpaceElement=function(a){return a.namespaceURI===r&&"s"===a.localName?e(k(a))&&s(p(a)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&t.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=l;this.parseNonNegativeLength=u;this.parseFoFontSize=function(a){var c;c=(c=l(a))&&(0>=c.value||
"%"===c.unit)?null:c;return c||q(a)};this.parseFoLineHeight=function(a){return u(a)||q(a)};this.getImpactedParagraphs=function(a){var c=a.commonAncestorContainer,b=[];for(c.nodeType===Node.ELEMENT_NODE&&(b=w.getElementsByTagNameNS(c,r,"p").concat(w.getElementsByTagNameNS(c,r,"h")));c&&!h(c);)c=c.parentNode;c&&b.push(c);return b.filter(function(c){return w.rangeIntersectsNode(a,c)})};this.getTextNodes=function(a,c){var b=a.startContainer.ownerDocument.createRange(),d;d=w.getNodesInRange(a,function(d){b.selectNodeContents(d);
if(d.nodeType===Node.TEXT_NODE){if(c&&w.rangesIntersect(a,b)||w.containsRange(a,b))return Boolean(m(d)&&(!f(d.textContent)||g(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(w.rangesIntersect(a,b)&&x(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});b.detach();return d};this.getTextElements=function(b,d){var e=b.startContainer.ownerDocument.createRange(),k;k=w.getNodesInRange(b,function(k){var l=k.nodeType;e.selectNodeContents(k);if(l===Node.TEXT_NODE){if(w.containsRange(b,
e)&&(d||Boolean(m(k)&&(!f(k.textContent)||g(k,0)))))return NodeFilter.FILTER_ACCEPT}else if(c(k)){if(w.containsRange(b,e))return NodeFilter.FILTER_ACCEPT}else if(x(k)||a(k))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});e.detach();return k};this.getParagraphElements=function(c){var b=c.startContainer.ownerDocument.createRange(),d;d=w.getNodesInRange(c,function(d){b.selectNodeContents(d);if(h(d)){if(w.rangesIntersect(c,b))return NodeFilter.FILTER_ACCEPT}else if(x(d)||a(d))return NodeFilter.FILTER_SKIP;
return NodeFilter.FILTER_REJECT});b.detach();return d}};
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
odf.TextSerializer=function(){function h(a){var c="",d=m.filter?m.filter.acceptNode(a):NodeFilter.FILTER_ACCEPT,b=a.nodeType,k;if(d===NodeFilter.FILTER_ACCEPT||d===NodeFilter.FILTER_SKIP)for(k=a.firstChild;k;)c+=h(k),k=k.nextSibling;d===NodeFilter.FILTER_ACCEPT&&(b===Node.ELEMENT_NODE&&f.isParagraph(a)?c+="\n":b===Node.TEXT_NODE&&a.textContent&&(c+=a.textContent));return c}var m=this,f=new odf.OdfUtils;this.filter=null;this.writeToString=function(a){return a?h(a):""}};
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
odf.TextStyleApplicator=function(h,m,f){function a(a){function c(a,b){return"object"===typeof a&&"object"===typeof b?Object.keys(a).every(function(d){return c(a[d],b[d])}):a===b}this.isStyleApplied=function(b){b=m.getAppliedStylesForElement(b);return c(a,b)}}function c(a){var c={};this.applyStyleToContainer=function(b){var d;d=b.getAttributeNS(k,"style-name");var l=b.ownerDocument;d=d||"";if(!c.hasOwnProperty(d)){var u=d,q;q=d?m.createDerivedStyleObject(d,"text",a):a;l=l.createElementNS(p,"style:style");
m.updateStyle(l,q);l.setAttributeNS(p,"style:name",h.generateName());l.setAttributeNS(p,"style:family","text");l.setAttributeNS("urn:webodf:names:scope","scope","document-content");f.appendChild(l);c[u]=l}d=c[d].getAttributeNS(p,"name");b.setAttributeNS(k,"text:style-name",d)}}function d(a,c){var d=a.ownerDocument,g=a.parentNode,l,f,h=new core.LoopWatchDog(1E3);f=[];"span"!==g.localName||g.namespaceURI!==k?(l=d.createElementNS(k,"text:span"),g.insertBefore(l,a),g=!1):(a.previousSibling&&!b.rangeContainsNode(c,
g.firstChild)?(l=g.cloneNode(!1),g.parentNode.insertBefore(l,g.nextSibling)):l=g,g=!0);f.push(a);for(d=a.nextSibling;d&&b.rangeContainsNode(c,d);)h.check(),f.push(d),d=d.nextSibling;f.forEach(function(a){a.parentNode!==l&&l.appendChild(a)});if(d&&g)for(f=l.cloneNode(!1),l.parentNode.insertBefore(f,l.nextSibling);d;)h.check(),g=d.nextSibling,f.appendChild(d),d=g;return l}var b=new core.DomUtils,k=odf.Namespaces.textns,p=odf.Namespaces.stylens;this.applyStyle=function(b,k,f){var g={},l,h,m,p;runtime.assert(f&&
f["style:text-properties"],"applyStyle without any text properties");g["style:text-properties"]=f["style:text-properties"];m=new c(g);p=new a(g);b.forEach(function(a){l=p.isStyleApplied(a);!1===l&&(h=d(a,k),m.applyStyleToContainer(h))})}};
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
odf.Style2CSS=function(){function h(a){var c={},b,d;if(!a)return c;for(a=a.firstChild;a;){if(d=a.namespaceURI!==u||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===r&&"list-style"===a.localName?"list":a.namespaceURI!==u||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(u,"family"))(b=a.getAttributeNS&&a.getAttributeNS(u,"name"))||(b=""),d=c[d]=c[d]||{},d[b]=a;a=a.nextSibling}return c}function m(a,c){if(!c||!a)return null;if(a[c])return a[c];
var b,d;for(b in a)if(a.hasOwnProperty(b)&&(d=m(a[b].derivedStyles,c)))return d;return null}function f(a,c,b){var d=c[a],e,g;d&&(e=d.getAttributeNS(u,"parent-style-name"),g=null,e&&(g=m(b,e),!g&&c[e]&&(f(e,c,b),g=c[e],c[e]=null)),g?(g.derivedStyles||(g.derivedStyles={}),g.derivedStyles[a]=d):b[a]=d)}function a(a,c){for(var b in a)a.hasOwnProperty(b)&&(f(b,a,c),a[b]=null)}function c(a,c){var b=w[a],d;if(null===b)return null;d=c?"["+b+'|style-name="'+c+'"]':"";"presentation"===b&&(b="draw",d=c?'[presentation|style-name="'+
c+'"]':"");return b+"|"+v[a].join(d+","+b+"|")+d}function d(a,b,e){var g=[],k,l;g.push(c(a,b));for(k in e.derivedStyles)if(e.derivedStyles.hasOwnProperty(k))for(l in b=d(a,k,e.derivedStyles[k]),b)b.hasOwnProperty(l)&&g.push(b[l]);return g}function b(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function k(a,b){var c="",d,e;for(d in b)if(b.hasOwnProperty(d)&&(d=b[d],e=a.getAttributeNS(d[0],d[1]))){e=e.trim();if(M.hasOwnProperty(d[1])){var g=
e.indexOf(" "),k=void 0,l=void 0;-1!==g?(k=e.substring(0,g),l=e.substring(g)):(k=e,l="");(k=W.parseLength(k))&&("pt"===k.unit&&0.75>k.value)&&(e="0.75pt"+l)}d[2]&&(c+=d[2]+":"+e+";")}return c}function p(a){return(a=b(a,u,"text-properties"))?W.parseFoFontSize(a.getAttributeNS(l,"font-size")):null}function e(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],
16)}:null}function s(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var e=c.getAttributeNS(r,"level"),g;c=W.getFirstNonWhitespaceChild(c);c=W.getFirstNonWhitespaceChild(c);var k;c&&(g=c.attributes,k=g["fo:text-indent"]?g["fo:text-indent"].value:void 0,g=g["fo:margin-left"]?g["fo:margin-left"].value:void 0);k||(k="-0.6cm");c="-"===k.charAt(0)?k.substring(1):"-"+k;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";void 0!==g&&
(g=e+"{margin-left:"+g+";}",a.insertRule(g,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+d+";";d+="counter-increment:list;";d+="margin-left:"+k+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(l){throw l;}}function n(a,c,f,h){if("list"===c)for(var m=h.firstChild,q,v;m;){if(m.namespaceURI===r)if(q=m,"list-level-style-number"===m.localName){var w=q;v=w.getAttributeNS(u,"num-format");var M=w.getAttributeNS(u,"num-suffix"),
z={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},w=w.getAttributeNS(u,"num-prefix")||"",w=z.hasOwnProperty(v)?w+(" counter(list, "+z[v]+")"):v?w+("'"+v+"';"):w+" ''";M&&(w+=" '"+M+"'");v="content: "+w+";";s(a,f,q,v)}else"list-level-style-image"===m.localName?(v="content: none;",s(a,f,q,v)):"list-level-style-bullet"===m.localName&&(v="content: '"+q.getAttributeNS(r,"bullet-char")+"';",s(a,f,q,v));m=m.nextSibling}else if("page"===c)if(M=q=f="",m=h.getElementsByTagNameNS(u,
"page-layout-properties")[0],q=m.parentNode.parentNode.parentNode.masterStyles,M="",f+=k(m,fa),v=m.getElementsByTagNameNS(u,"background-image"),0<v.length&&(M=v.item(0).getAttributeNS(y,"href"))&&(f+="background-image: url('odfkit:"+M+"');",v=v.item(0),f+=k(v,J)),"presentation"===aa){if(q)for(v=q.getElementsByTagNameNS(u,"master-page"),z=0;z<v.length;z+=1)if(v[z].getAttributeNS(u,"page-layout-name")===m.parentNode.getAttributeNS(u,"name")){M=v[z].getAttributeNS(u,"name");q="draw|page[draw|master-page-name="+
M+"] {"+f+"}";M="office|body, draw|page[draw|master-page-name="+M+"] {"+k(m,ma)+" }";try{a.insertRule(q,a.cssRules.length),a.insertRule(M,a.cssRules.length)}catch(ga){throw ga;}}}else{if("text"===aa){q="office|text {"+f+"}";M="office|body {width: "+m.getAttributeNS(l,"page-width")+";}";try{a.insertRule(q,a.cssRules.length),a.insertRule(M,a.cssRules.length)}catch(da){throw da;}}}else{f=d(c,f,h).join(",");m="";if(q=b(h,u,"text-properties")){var z=q,I;v=I="";M=1;q=""+k(z,C);w=z.getAttributeNS(u,"text-underline-style");
"solid"===w&&(I+=" underline");w=z.getAttributeNS(u,"text-line-through-style");"solid"===w&&(I+=" line-through");I.length&&(q+="text-decoration:"+I+";");if(I=z.getAttributeNS(u,"font-name")||z.getAttributeNS(l,"font-family"))w=pa[I],q+="font-family: "+(w||I)+";";w=z.parentNode;if(z=p(w)){for(;w;){if(z=p(w)){if("%"!==z.unit){v="font-size: "+z.value*M+z.unit+";";break}M*=z.value/100}z=w;I=w="";w=null;"default-style"===z.localName?w=null:(w=z.getAttributeNS(u,"parent-style-name"),I=z.getAttributeNS(u,
"family"),w=F.getODFElementsWithXPath(O,w?"//style:*[@style:name='"+w+"'][@style:family='"+I+"']":"//style:default-style[@style:family='"+I+"']",odf.Namespaces.resolvePrefix)[0])}v||(v="font-size: "+parseFloat(R)*M+G.getUnits(R)+";");q+=v}m+=q}if(q=b(h,u,"paragraph-properties"))v=q,q=""+k(v,E),M=v.getElementsByTagNameNS(u,"background-image"),0<M.length&&(z=M.item(0).getAttributeNS(y,"href"))&&(q+="background-image: url('odfkit:"+z+"');",M=M.item(0),q+=k(M,J)),(v=v.getAttributeNS(l,"line-height"))&&
"normal"!==v&&(v=W.parseFoLineHeight(v),q="%"!==v.unit?q+("line-height: "+v.value+v.unit+";"):q+("line-height: "+v.value/100+";")),m+=q;if(q=b(h,u,"graphic-properties"))z=q,q=""+k(z,K),v=z.getAttributeNS(g,"opacity"),M=z.getAttributeNS(g,"fill"),z=z.getAttributeNS(g,"fill-color"),"solid"===M||"hatch"===M?z&&"none"!==z?(v=isNaN(parseFloat(v))?1:parseFloat(v)/100,(z=e(z))&&(q+="background-color: rgba("+z.r+","+z.g+","+z.b+","+v+");")):q+="background: none;":"none"===M&&(q+="background: none;"),m+=q;
if(q=b(h,u,"drawing-page-properties"))v=""+k(q,K),"true"===q.getAttributeNS(t,"background-visible")&&(v+="background: none;"),m+=v;if(q=b(h,u,"table-cell-properties"))q=""+k(q,B),m+=q;if(q=b(h,u,"table-row-properties"))q=""+k(q,H),m+=q;if(q=b(h,u,"table-column-properties"))q=""+k(q,N),m+=q;if(q=b(h,u,"table-properties"))v=q,q=""+k(v,L),v=v.getAttributeNS(x,"border-model"),"collapsing"===v?q+="border-collapse:collapse;":"separating"===v&&(q+="border-collapse:separate;"),m+=q;if(0!==m.length)try{a.insertRule(f+
"{"+m+"}",a.cssRules.length)}catch(ia){throw ia;}}for(var A in h.derivedStyles)h.derivedStyles.hasOwnProperty(A)&&n(a,c,A,h.derivedStyles[A])}var g=odf.Namespaces.drawns,l=odf.Namespaces.fons,u=odf.Namespaces.stylens,q=odf.Namespaces.svgns,x=odf.Namespaces.tablens,r=odf.Namespaces.textns,y=odf.Namespaces.xlinkns,t=odf.Namespaces.presentationns,w={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},v={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},C=[[l,"color","color"],[l,"background-color","background-color"],[l,"font-weight","font-weight"],[l,"font-style","font-style"]],J=[[u,"repeat",
"background-repeat"]],E=[[l,"background-color","background-color"],[l,"text-align","text-align"],[l,"text-indent","text-indent"],[l,"padding","padding"],[l,"padding-left","padding-left"],[l,"padding-right","padding-right"],[l,"padding-top","padding-top"],[l,"padding-bottom","padding-bottom"],[l,"border-left","border-left"],[l,"border-right","border-right"],[l,"border-top","border-top"],[l,"border-bottom","border-bottom"],[l,"margin","margin"],[l,"margin-left","margin-left"],[l,"margin-right","margin-right"],
[l,"margin-top","margin-top"],[l,"margin-bottom","margin-bottom"],[l,"border","border"]],K=[[l,"background-color","background-color"],[l,"min-height","min-height"],[g,"stroke","border"],[q,"stroke-color","border-color"],[q,"stroke-width","border-width"],[l,"border","border"],[l,"border-left","border-left"],[l,"border-right","border-right"],[l,"border-top","border-top"],[l,"border-bottom","border-bottom"]],B=[[l,"background-color","background-color"],[l,"border-left","border-left"],[l,"border-right",
"border-right"],[l,"border-top","border-top"],[l,"border-bottom","border-bottom"],[l,"border","border"]],N=[[u,"column-width","width"]],H=[[u,"row-height","height"],[l,"keep-together",null]],L=[[u,"width","width"],[l,"margin-left","margin-left"],[l,"margin-right","margin-right"],[l,"margin-top","margin-top"],[l,"margin-bottom","margin-bottom"]],fa=[[l,"background-color","background-color"],[l,"padding","padding"],[l,"padding-left","padding-left"],[l,"padding-right","padding-right"],[l,"padding-top",
"padding-top"],[l,"padding-bottom","padding-bottom"],[l,"border","border"],[l,"border-left","border-left"],[l,"border-right","border-right"],[l,"border-top","border-top"],[l,"border-bottom","border-bottom"],[l,"margin","margin"],[l,"margin-left","margin-left"],[l,"margin-right","margin-right"],[l,"margin-top","margin-top"],[l,"margin-bottom","margin-bottom"]],ma=[[l,"page-width","width"],[l,"page-height","height"]],M={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},pa={},W=new odf.OdfUtils,aa,O,R,F=new xmldom.XPath,G=new core.CSSUnits;this.style2css=function(c,b,d,e,g){for(var k,l,f,q;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);k=null;e&&(k=e.ownerDocument,O=e.parentNode);g&&(k=g.ownerDocument,O=g.parentNode);if(k)for(q in odf.Namespaces.forEachPrefix(function(a,c){f="@namespace "+a+" url("+c+");";try{b.insertRule(f,b.cssRules.length)}catch(d){}}),pa=d,aa=c,R=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",c=h(e),e=h(g),g={},w)if(w.hasOwnProperty(q))for(l in d=g[q]={},a(c[q],d),a(e[q],d),d)d.hasOwnProperty(l)&&n(b,q,l,d[l])}};
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
odf.OdfContainer=function(){function h(a,c,b){for(a=a?a.firstChild:null;a;){if(a.localName===b&&a.namespaceURI===c)return a;a=a.nextSibling}return null}function m(a){var c,b=p.length;for(c=0;c<b;c+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&a.localName===p[c])return c;return-1}function f(a,c){var b=new k.UsedStyleList(a,c),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var e=d.acceptNode(a);e===NodeFilter.FILTER_ACCEPT&&(a.parentNode===c&&a.nodeType===Node.ELEMENT_NODE)&&
(e=b.uses(a)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return e}}function a(a,c){var b=new f(a,c);this.acceptNode=function(a){var c=b.acceptNode(a);c!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(c=NodeFilter.FILTER_REJECT);return c}}function c(a,c){if(c){var b=m(c),d,e=a.firstChild;if(-1!==b){for(;e;){d=m(e);if(-1!==d&&d>b)break;e=e.nextSibling}a.insertBefore(c,e)}}}function d(a){this.OdfContainer=
a}function b(a,c,b,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=b;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=c,d.loadAsDataURL(a,c,function(a,c){a&&runtime.log(a);e.url=c;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var k=new odf.StyleInfo,p="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),
e=(new Date).getTime()+"_webodf_",s=new core.Base64;d.prototype=new function(){};d.prototype.constructor=d;d.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";d.localName="document";b.prototype.load=function(){};b.prototype.getUrl=function(){return this.data?"data:;base64,"+s.toBase64(this.data):null};odf.OdfContainer=function g(l,m){function q(a){for(var c=a.firstChild,b;c;)b=c.nextSibling,c.nodeType===Node.ELEMENT_NODE?q(c):c.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(c),
c=b}function p(a,c){for(var b=a&&a.firstChild;b;)b.nodeType===Node.ELEMENT_NODE&&b.setAttributeNS("urn:webodf:names:scope","scope",c),b=b.nextSibling}function r(a,c){var b=null,d,e,g;if(a)for(b=a.cloneNode(!0),d=b.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(g=d.getAttributeNS("urn:webodf:names:scope","scope"))&&g!==c&&b.removeChild(d),d=e;return b}function y(a){var c=F.rootElement.ownerDocument,b;if(a){q(a.documentElement);try{b=c.importNode(a.documentElement,!0)}catch(d){}}return b}
function t(a){F.state=a;if(F.onchange)F.onchange(F);if(F.onstatereadychange)F.onstatereadychange(F)}function s(a){T=null;F.rootElement=a;a.fontFaceDecls=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");a.styles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");a.automaticStyles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");a.masterStyles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");a.body=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"body");a.meta=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta")}function v(a){a=y(a);var b=F.rootElement;a&&"document-styles"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI?(b.fontFaceDecls=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),c(b,b.fontFaceDecls),b.styles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),c(b,b.styles),b.automaticStyles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),
p(b.automaticStyles,"document-styles"),c(b,b.automaticStyles),b.masterStyles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),c(b,b.masterStyles),k.prefixStyleNames(b.automaticStyles,e,b.masterStyles)):t(g.INVALID)}function C(a){a=y(a);var b,d,e;if(a&&"document-content"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI){b=F.rootElement;d=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");if(b.fontFaceDecls&&d)for(e=d.firstChild;e;)b.fontFaceDecls.appendChild(e),
e=d.firstChild;else d&&(b.fontFaceDecls=d,c(b,d));d=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");p(d,"document-content");if(b.automaticStyles&&d)for(e=d.firstChild;e;)b.automaticStyles.appendChild(e),e=d.firstChild;else d&&(b.automaticStyles=d,c(b,d));b.body=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");c(b,b.body)}else t(g.INVALID)}function J(a){a=y(a);var b;a&&("document-meta"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI)&&
(b=F.rootElement,b.meta=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),c(b,b.meta))}function E(a){a=y(a);var b;a&&("document-settings"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI)&&(b=F.rootElement,b.settings=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),c(b,b.settings))}function K(a){a=y(a);var b;if(a&&"manifest"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI)for(b=F.rootElement,b.manifest=
a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI)&&(D[a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),a=a.nextSibling}function B(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],G.loadAsDOM(c,function(b,c){d(c);b||F.state===g.INVALID||B(a)})):t(g.DONE)}function N(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function H(){var a=new xmldom.LSSerializer,b=N("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(F.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function L(a,b){var c=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
"manifest:full-path",a);c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:media-type",b);return c}function fa(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"></manifest:manifest>'),b=h(a,"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest"),c=new xmldom.LSSerializer,d;for(d in D)D.hasOwnProperty(d)&&b.appendChild(L(d,D[d]));c.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+
c.writeToString(a,odf.Namespaces.namespaceMap)}function ma(){var a=new xmldom.LSSerializer,b=N("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(F.rootElement.settings,odf.Namespaces.namespaceMap);return b+"</office:document-settings>"}function M(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=r(F.rootElement.automaticStyles,"document-styles"),d=F.rootElement.masterStyles&&F.rootElement.masterStyles.cloneNode(!0),g=N("document-styles");k.removePrefixFromStyleNames(c,
e,d);b.filter=new f(d,c);g+=b.writeToString(F.rootElement.fontFaceDecls,a);g+=b.writeToString(F.rootElement.styles,a);g+=b.writeToString(c,a);g+=b.writeToString(d,a);return g+"</office:document-styles>"}function pa(){var b=odf.Namespaces.namespaceMap,c=new xmldom.LSSerializer,d=r(F.rootElement.automaticStyles,"document-content"),e=N("document-content");c.filter=new a(F.rootElement.body,d);e+=c.writeToString(d,b);e+=c.writeToString(F.rootElement.body,b);return e+"</office:document-content>"}function W(a,
b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var d=y(c);d&&"document"===d.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===d.namespaceURI?(s(d),t(g.DONE)):t(g.INVALID)}})}function aa(){function a(b,c){var e;c||(c=b);e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",c);d[b]=e;d.appendChild(e)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),d=F.rootElement,e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");d.body.appendChild(e);t(g.DONE);return b}function O(){var a,b=new Date;a=runtime.byteArrayFromString(ma(),"utf8");G.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(H(),"utf8");G.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(M(),"utf8");G.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(pa(),
"utf8");G.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(fa(),"utf8");G.save("META-INF/manifest.xml",a,!0,b)}function R(a,b){O();G.writeAs(a,function(a){b(a)})}var F=this,G,D={},T;this.onstatereadychange=m;this.rootElement=this.state=this.onchange=null;this.setRootElement=s;this.getContentElement=function(){var a;T||(a=F.rootElement.body,T=a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","text")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"presentation")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet")[0]);return T};this.getDocumentType=function(){var a=F.getContentElement();return a&&a.localName};this.getPart=function(a){return new b(a,D[a],F,G)};this.getPartData=function(a,b){G.load(a,b)};this.createByteArray=function(a,b){O();G.createByteArray(a,b)};this.saveAs=R;this.save=function(a){R(l,a)};this.getUrl=function(){return l};this.state=g.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,
a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(d);G=l?new core.Zip(l,function(a,b){G=b;a?W(l,function(b){a&&(G.error=a+"\n"+b,t(g.INVALID))}):B([["styles.xml",v],["content.xml",C],["meta.xml",J],["settings.xml",E],["META-INF/manifest.xml",K]])}):aa()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,
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
odf.FontLoader=function(){function h(a,c,d,b,k){var m,e=0,s;for(s in a)if(a.hasOwnProperty(s)){if(e===d){m=s;break}e+=1}m?c.getPartData(a[m].href,function(e,g){if(e)runtime.log(e);else{var l="@font-face { font-family: '"+(a[m].family||m)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+f.convertUTF8ArrayToBase64(g)+') format("truetype"); }';try{b.insertRule(l,b.cssRules.length)}catch(s){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(s)+"\nRule: "+l)}}h(a,c,d+1,b,k)}):
k&&k()}var m=new xmldom.XPath,f=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(a,c){for(var d=a.rootElement.fontFaceDecls;c.cssRules.length;)c.deleteRule(c.cssRules.length-1);if(d){var b={},k,f,e,s;if(d)for(d=m.getODFElementsWithXPath(d,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),k=0;k<d.length;k+=1)f=d[k],e=f.getAttributeNS(odf.Namespaces.stylens,"name"),s=f.getAttributeNS(odf.Namespaces.svgns,"font-family"),f=m.getODFElementsWithXPath(f,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<f.length&&(f=f[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),b[e]={href:f,family:s});h(b,a,0,c)}}};return odf.FontLoader}();
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
odf.StyleNameGenerator=function(h,m){var f={};this.generateName=function(){var a,c={},d=0;m.getAllStyleNames().forEach(function(a){c[a]=!0});do a=h+d,d+=1;while(f[a]||c[a]);f[a]=!0;return a}};
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
odf.Formatting=function(){function h(){for(var a=e.rootElement.fontFaceDecls,b={},c,d,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(c=a.getAttributeNS(g,"name"))&&((d=a.getAttributeNS(n,"font-family"))||a.getElementsByTagNameNS(n,"font-face-uri")[0])&&(b[c]=d),a=a.nextSibling;return b}function m(a){for(var b=e.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===g&&"default-style"===b.localName&&b.getAttributeNS(g,"family")===a)return b;b=b.nextSibling}return null}
function f(a,b,c){var d,k;c=c||[e.rootElement.automaticStyles,e.rootElement.styles];for(d=c.shift();d;){for(d=d.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE&&(k=d.getAttributeNS(g,"name"),d.namespaceURI===g&&"style"===d.localName&&d.getAttributeNS(g,"family")===b&&k===a||"list-style"===b&&d.namespaceURI===l&&"list-style"===d.localName&&k===a||"data"===b&&d.namespaceURI===u&&k===a))return d;d=d.nextSibling}d=c.shift()}return null}function a(a){for(var b,c={},d=a.firstChild;d;){if(d.nodeType===
Node.ELEMENT_NODE&&d.namespaceURI===g)for(c[d.nodeName]={},b=0;b<d.attributes.length;b+=1)c[d.nodeName][d.attributes[b].name]=d.attributes[b].value;d=d.nextSibling}for(b=0;b<a.attributes.length;b+=1)c[a.attributes[b].name]=a.attributes[b].value;return c}function c(a,b){Object.keys(b).forEach(function(d){var e=d.split(":"),g=e[1],k=odf.Namespaces.resolvePrefix(e[0]),e=b[d];"object"===typeof e&&Object.keys(e).length?(d=a.getElementsByTagNameNS(k,g)[0]||a.ownerDocument.createElementNS(k,d),a.appendChild(d),
c(d,e)):k&&a.setAttributeNS(k,d,e)})}function d(b,c){for(var d=e.rootElement.styles,k,l={},h=b.getAttributeNS(g,"family"),q=b;q;)k=a(q),l=x.mergeObjects(k,l),q=(k=q.getAttributeNS(g,"parent-style-name"))?f(k,h,[d]):null;if(q=m(h))k=a(q),l=x.mergeObjects(k,l);c&&(k=(d=r[h])?x.mergeObjects({},d):null)&&(l=x.mergeObjects(k,l));return l}function b(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],k="",g=!1;c;)!g&&q.isGroupingElement(c)&&(g=!0),(d=s.determineStylesForNode(c))&&e.push(d),
c=c.parentNode;g&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){k+="|"+b+":"+a+"|"})})}),b&&(b[k]=e));return g?e:void 0}function k(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var e=Object.keys(a[c])[0],k,l;(k=f(e,c))?(l=d(k),b=x.mergeObjects(l,b),l=k.getAttributeNS(g,"display-name")):runtime.log("No style element found for '"+e+"' of family '"+c+"'");b.orderedStyles.push({name:e,family:c,displayName:l})})});
return b}var p=this,e,s=new odf.StyleInfo,n=odf.Namespaces.svgns,g=odf.Namespaces.stylens,l=odf.Namespaces.textns,u=odf.Namespaces.numberns,q=new odf.OdfUtils,x=new core.Utils,r={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.setOdfContainer=function(a){e=a};this.getFontMap=h;this.getAvailableParagraphStyles=function(){for(var a=e.rootElement.styles&&e.rootElement.styles.firstChild,b,c,d=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===g)&&(c=
a,b=c.getAttributeNS(g,"family"),"paragraph"===b&&(b=c.getAttributeNS(g,"name"),c=c.getAttributeNS(g,"display-name")||b,b&&c&&d.push({name:b,displayName:c}))),a=a.nextSibling;return d};this.isStyleUsed=function(a){var b;b=s.hasDerivedStyles(e.rootElement,odf.Namespaces.resolvePrefix,a);a=(new s.UsedStyleList(e.rootElement.styles)).uses(a)||(new s.UsedStyleList(e.rootElement.automaticStyles)).uses(a)||(new s.UsedStyleList(e.rootElement.body)).uses(a);return b||a};this.getDefaultStyleElement=m;this.getStyleElement=
f;this.getStyleAttributes=a;this.getInheritedStyleAttributes=d;this.getFirstCommonParentStyleNameOrSelf=function(a){var b=e.rootElement.automaticStyles,c=e.rootElement.styles,d;for(d=f(a,"paragraph",[b]);d;)a=d.getAttributeNS(g,"parent-style-name"),d=f(a,"paragraph",[b]);return(d=f(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(f(a,"paragraph"))};this.getAppliedStyles=function(a){var c={},d=[];a.forEach(function(a){b(a,c)});Object.keys(c).forEach(function(a){d.push(k(c[a]))});
return d};this.getAppliedStylesForElement=function(a){return(a=b(a))?k(a):void 0};this.applyStyle=function(a,b,c,d){(new odf.TextStyleApplicator(new odf.StyleNameGenerator("auto"+x.hashString(a)+"_",p),p,e.rootElement.automaticStyles)).applyStyle(b,c,d)};this.getAllStyleNames=function(){var a,b=[];[e.rootElement.automaticStyles,e.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===g&&"style"===a.localName||a.namespaceURI===l&&"list-style"===
a.localName)&&b.push(a.getAttributeNS(g,"name")),a=a.nextSibling});return b};this.updateStyle=function(a,b){var d,k;c(a,b);(d=b["style:text-properties"]&&b["style:text-properties"]["style:font-name"])&&!h().hasOwnProperty(d)&&(k=a.ownerDocument.createElementNS(g,"style:font-face"),k.setAttributeNS(g,"style:name",d),k.setAttributeNS(n,"svg:font-family",d),e.rootElement.fontFaceDecls.appendChild(k))};this.createDerivedStyleObject=function(b,c,d){var k=f(b,c);runtime.assert(Boolean(k),"No style element found for '"+
b+"' of family '"+c+"'");b=k.parentNode===e.rootElement.automaticStyles?a(k):{"style:parent-style-name":b};b["style:family"]=c;x.mergeObjects(b,d);return b};this.getDefaultTabStopDistance=function(){var a=m("paragraph");(a=(a=a&&a.getAttributeNS(g,"paragraph-properties"))&&a.getAttributeNS(g,"tab-stop-distance"))||(a="1.25cm");return q.parseNonNegativeLength(a)}};
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
odf.OdfCanvas=function(){function h(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(e)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function m(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function f(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function a(a,b,c){var d=
"on"+b;a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent(d,c):a[d]===c&&(a[d]=null)}function c(b){function c(a,b){for(;b;){if(b===a)return!0;b=b.parentNode}return!1}function d(){var a=[],g=runtime.getWindow().getSelection(),f,l;for(f=0;f<g.rangeCount;f+=1)l=g.getRangeAt(f),null!==l&&(c(b,l.startContainer)&&c(b,l.endContainer))&&a.push(l);if(a.length===e.length){for(g=0;g<a.length&&(f=a[g],l=e[g],f=f===l?!1:null===f||null===l?!0:f.startContainer!==l.startContainer||f.startOffset!==
l.startOffset||f.endContainer!==l.endContainer||f.endOffset!==l.endOffset,!f);g+=1);if(g===a.length)return}e=a;var g=[a.length],h,m=b.ownerDocument;for(f=0;f<a.length;f+=1)l=a[f],h=m.createRange(),h.setStart(l.startContainer,l.startOffset),h.setEnd(l.endContainer,l.endOffset),g[f]=h;e=g;g=k.length;for(a=0;a<g;a+=1)k[a](b,e)}var e=[],k=[];this.addListener=function(a,b){var c,d=k.length;for(c=0;c<d;c+=1)if(k[c]===b)return;k.push(b)};this.destroy=function(c){a(b,"mouseup",d);a(b,"keyup",d);a(b,"keydown",
d);c()};f(b,"mouseup",d);f(b,"keyup",d);f(b,"keydown",d)}function d(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function b(a,c,d,e){d.setAttribute("styleid",c);var k,g=d.getAttributeNS(v,"anchor-type"),f=d.getAttributeNS(t,"x"),l=d.getAttributeNS(t,"y"),h=d.getAttributeNS(t,"width"),m=d.getAttributeNS(t,"height"),n=d.getAttributeNS(x,"min-height"),r=d.getAttributeNS(x,"min-width"),p=d.getAttributeNS(q,"master-page-name"),
s=null,u,w;u=0;var K,C=a.rootElement.ownerDocument;if(p){s=a.rootElement.masterStyles.getElementsByTagNameNS(y,"master-page");u=null;for(w=0;w<s.length;w+=1)if(s[w].getAttributeNS(y,"name")===p){u=s[w];break}s=u}else s=null;if(s){p=C.createElementNS(q,"draw:page");K=s.firstElementChild;for(u=0;K;)"true"!==K.getAttributeNS(E,"placeholder")&&(w=K.cloneNode(!0),p.appendChild(w),b(a,c+"_"+u,w,e)),K=K.nextElementSibling,u+=1;L.appendChild(p);u=L.getElementsByTagNameNS(q,"page").length;if(w=p.getElementsByTagNameNS(v,
"page-number")[0]){for(;w.firstChild;)w.removeChild(w.firstChild);w.appendChild(C.createTextNode(u))}b(a,c,p,e);p.setAttributeNS(q,"draw:master-page-name",s.getAttributeNS(y,"name"))}if("as-char"===g)k="display: inline-block;";else if(g||f||l)k="position: absolute;";else if(h||m||n||r)k="display: block;";f&&(k+="left: "+f+";");l&&(k+="top: "+l+";");h&&(k+="width: "+h+";");m&&(k+="height: "+m+";");n&&(k+="min-height: "+n+";");r&&(k+="min-width: "+r+";");k&&(k="draw|"+d.localName+'[styleid="'+c+'"] {'+
k+"}",e.insertRule(k,e.cssRules.length))}function k(a){for(a=a.firstChild;a;){if(a.namespaceURI===r&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function p(a,b,c,d){function e(b){b&&(b='draw|image[styleid="'+a+'"] {'+("background-image: url("+b+");")+"}",d.insertRule(b,d.cssRules.length))}c.setAttribute("styleid",a);var g=c.getAttributeNS(C,"href"),f;if(g)try{f=b.getPart(g),f.onchange=function(a){e(a.url)},f.load()}catch(l){runtime.log("slight problem: "+
l)}else g=k(c),e(g)}function e(a){function b(c){var d,e;c.hasAttributeNS(C,"href")&&(d=c.getAttributeNS(C,"href"),"#"===d[0]?(d=d.substring(1),e=function(){var b=B.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=B.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);return!1}):e=function(){K.open(d)},c.onclick=e)}var c,d,e;d=a.getElementsByTagNameNS(v,
"a");for(c=0;c<d.length;c+=1)e=d.item(c),b(e)}function s(a){var b=a.ownerDocument;H.getElementsByTagNameNS(a,v,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(v,"c"),10);if(1<d)for(a.removeAttributeNS(v,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function n(a){H.getElementsByTagNameNS(a,v,"tab").forEach(function(a){a.textContent="\t"})}function g(a,b){function c(a,k){var g=f.documentElement.namespaceURI;
"video/"===k.substr(0,6)?(d=f.createElementNS(g,"video"),d.setAttribute("controls","controls"),e=f.createElementNS(g,"source"),e.setAttribute("src",a),e.setAttribute("type",k),d.appendChild(e),b.parentNode.appendChild(d)):b.innerHtml="Unrecognised Plugin"}var d,e,g,f=b.ownerDocument,l;if(g=b.getAttributeNS(C,"href"))try{l=a.getPart(g),l.onchange=function(a){c(a.url,a.mimetype)},l.load()}catch(h){runtime.log("slight problem: "+h)}else runtime.log("using MP4 data fallback"),g=k(b),c(g,"video/mp4")}
function l(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function u(a){var b=
a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var q=odf.Namespaces.drawns,x=odf.Namespaces.fons,r=odf.Namespaces.officens,y=odf.Namespaces.stylens,t=odf.Namespaces.svgns,w=odf.Namespaces.tablens,v=odf.Namespaces.textns,C=odf.Namespaces.xlinkns,
J=odf.Namespaces.xmlns,E=odf.Namespaces.presentationns,K=runtime.getWindow(),B=new xmldom.XPath,N=new odf.OdfUtils,H=new core.DomUtils,L;odf.OdfCanvas=function(a){function k(a,b,c){function d(a,b,c,e){A.addToQueue(function(){p(a,b,c,e)})}var e,g;e=b.getElementsByTagNameNS(q,"image");for(b=0;b<e.length;b+=1)g=e.item(b),d("image"+String(b),a,g,c)}function x(a,b){function c(a,b){A.addToQueue(function(){g(a,b)})}var d,e,k;e=b.getElementsByTagNameNS(q,"plugin");for(d=0;d<e.length;d+=1)k=e.item(d),c(a,
k)}function t(){P.firstChild&&(1<I?(P.style.MozTransformOrigin="center top",P.style.WebkitTransformOrigin="center top",P.style.OTransformOrigin="center top",P.style.msTransformOrigin="center top"):(P.style.MozTransformOrigin="left top",P.style.WebkitTransformOrigin="left top",P.style.OTransformOrigin="left top",P.style.msTransformOrigin="left top"),P.style.WebkitTransform="scale("+I+")",P.style.MozTransform="scale("+I+")",P.style.OTransform="scale("+I+")",P.style.msTransform="scale("+I+")",a.style.width=
Math.round(I*P.offsetWidth)+"px",a.style.height=Math.round(I*P.offsetHeight)+"px")}function C(a){function b(a){return d===a.getAttributeNS(r,"name")}var c=H.getElementsByTagNameNS(a,r,"annotation");a=H.getElementsByTagNameNS(a,r,"annotation-end");var d,e;for(e=0;e<c.length;e+=1)d=c[e].getAttributeNS(r,"name"),U.addAnnotation({node:c[e],end:a.filter(b)[0]||null});U.rerenderAnnotations()}function E(a){ca?($.parentNode||(P.appendChild($),t()),U&&U.forgetAnnotations(),U=new gui.AnnotationViewManager(F,
a.body,$),C(a.body)):$.parentNode&&(P.removeChild($),U.forgetAnnotations(),t())}function O(c){function g(){for(var f=a;f.firstChild;)f.removeChild(f.firstChild);a.style.display="inline-block";f=D.rootElement;a.ownerDocument.importNode(f,!0);T.setOdfContainer(D);var l=D,h=z;(new odf.FontLoader).loadFonts(l,h.sheet);d(D,T,ga);for(var h=D,l=da.sheet,m=a;m.firstChild;)m.removeChild(m.firstChild);P=G.createElementNS(a.namespaceURI,"div");P.style.display="inline-block";P.style.background="white";P.appendChild(f);
a.appendChild(P);$=G.createElementNS(a.namespaceURI,"div");$.id="annotationsPane";L=G.createElementNS(a.namespaceURI,"div");L.id="shadowContent";L.style.position="absolute";L.style.top=0;L.style.left=0;h.getContentElement().appendChild(L);var m=f.body,r,p,u;p=[];for(r=m.firstChild;r&&r!==m;)if(r.namespaceURI===q&&(p[p.length]=r),r.firstChild)r=r.firstChild;else{for(;r&&r!==m&&!r.nextSibling;)r=r.parentNode;r&&r.nextSibling&&(r=r.nextSibling)}for(u=0;u<p.length;u+=1)r=p[u],b(h,"frame"+String(u),r,
l);p=B.getODFElementsWithXPath(m,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(r=0;r<p.length;r+=1)m=p[r],m.setAttributeNS&&m.setAttributeNS("urn:webodf","containsparagraphanchor",!0);r=f.body.getElementsByTagNameNS(w,"table-cell");for(m=0;m<r.length;m+=1)p=r.item(m),p.hasAttributeNS(w,"number-columns-spanned")&&p.setAttribute("colspan",p.getAttributeNS(w,"number-columns-spanned")),p.hasAttributeNS(w,"number-rows-spanned")&&p.setAttribute("rowspan",p.getAttributeNS(w,
"number-rows-spanned"));e(f.body);s(f.body);n(f.body);k(h,f.body,l);x(h,f.body);p=f.body;var S,C,H,Z,m={};r={};var A;u=K.document.getElementsByTagNameNS(v,"list-style");for(h=0;h<u.length;h+=1)S=u.item(h),(H=S.getAttributeNS(y,"name"))&&(r[H]=S);p=p.getElementsByTagNameNS(v,"list");for(h=0;h<p.length;h+=1)if(S=p.item(h),u=S.getAttributeNS(J,"id")){C=S.getAttributeNS(v,"continue-list");S.setAttribute("id",u);Z="text|list#"+u+" > text|list-item > *:first-child:before {";if(H=S.getAttributeNS(v,"style-name")){S=
r[H];A=N.getFirstNonWhitespaceChild(S);S=void 0;if(A)if("list-level-style-number"===A.localName){S=A.getAttributeNS(y,"num-format");H=A.getAttributeNS(y,"num-suffix");var F="",F={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},I=void 0,I=A.getAttributeNS(y,"num-prefix")||"",I=F.hasOwnProperty(S)?I+(" counter(list, "+F[S]+")"):S?I+("'"+S+"';"):I+" ''";H&&(I+=" '"+H+"'");S=F="content: "+I+";"}else"list-level-style-image"===A.localName?S="content: none;":"list-level-style-bullet"===
A.localName&&(S="content: '"+A.getAttributeNS(v,"bullet-char")+"';");A=S}if(C){for(S=m[C];S;)C=S,S=m[C];Z+="counter-increment:"+C+";";A?(A=A.replace("list",C),Z+=A):Z+="content:counter("+C+");"}else C="",A?(A=A.replace("list",u),Z+=A):Z+="content: counter("+u+");",Z+="counter-increment:"+u+";",l.insertRule("text|list#"+u+" {counter-reset:"+u+"}",l.cssRules.length);Z+="}";m[u]=C;Z&&l.insertRule(Z,l.cssRules.length)}P.insertBefore(L,P.firstChild);t();E(f);if(!c&&(f=[D],ia.hasOwnProperty("statereadychange")))for(l=
ia.statereadychange,A=0;A<l.length;A+=1)l[A].apply(null,f)}D.state===odf.OdfContainer.DONE?g():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function oa(){D.state===odf.OdfContainer.DONE?g():(runtime.log("will be back later..."),runtime.setTimeout(oa,500))},100))}function R(b){A.clearQueue();a.innerHTML="loading "+b;a.removeAttribute("style");D=new odf.OdfContainer(b,function(a){D=a;O(!1)})}runtime.assert(null!==a&&void 0!==a,"odf.OdfCanvas constructor needs DOM element");
runtime.assert(null!==a.ownerDocument&&void 0!==a.ownerDocument,"odf.OdfCanvas constructor needs DOM");var F=this,G=a.ownerDocument,D,T=new odf.Formatting,X=new c(a),Q,P,$,ca=!1,U,V,z,ga,da,I=1,ia={},A=new h;this.refreshCSS=function(){d(D,T,ga);t()};this.refreshSize=function(){t()};this.odfContainer=function(){return D};this.slidevisibilitycss=function(){return Q.css};this.setOdfContainer=function(a,b){D=a;O(!0===b)};this.load=this.load=R;this.save=function(a){D.save(a)};this.addListener=function(b,
c){switch(b){case "selectionchange":X.addListener(b,c);break;case "click":f(a,b,c);break;default:var d=ia[b];void 0===d&&(d=ia[b]=[]);c&&-1===d.indexOf(c)&&d.push(c)}};this.getFormatting=function(){return T};this.getAnnotationManager=function(){return U};this.refreshAnnotations=function(){E(D.rootElement)};this.rerenderAnnotations=function(){U&&U.rerenderAnnotations()};this.getSizer=function(){return P};this.enableAnnotations=function(a){a!==ca&&(ca=a,D&&E(D.rootElement))};this.addAnnotation=function(a){U&&
U.addAnnotation(a)};this.forgetAnnotations=function(){U&&U.forgetAnnotations()};this.setZoomLevel=function(a){I=a;t()};this.getZoomLevel=function(){return I};this.fitToContainingElement=function(b,c){var d=a.offsetHeight/I;I=b/(a.offsetWidth/I);c/d<I&&(I=c/d);t()};this.fitToWidth=function(b){I=b/(a.offsetWidth/I);t()};this.fitSmart=function(b,c){var d,e;d=a.offsetWidth/I;e=a.offsetHeight/I;d=b/d;void 0!==c&&c/e<d&&(d=c/e);I=Math.min(1,d);t()};this.fitToHeight=function(b){I=b/(a.offsetHeight/I);t()};
this.showFirstPage=function(){Q.showFirstPage()};this.showNextPage=function(){Q.showNextPage()};this.showPreviousPage=function(){Q.showPreviousPage()};this.showPage=function(a){Q.showPage(a);t()};this.getElement=function(){return a};this.destroy=function(b){var c=G.getElementsByTagName("head")[0];$&&$.parentNode&&$.parentNode.removeChild($);P&&a.removeChild(P);c.removeChild(V);c.removeChild(z);c.removeChild(ga);c.removeChild(da);X.destroy(function(a){a?b(a):Q.destroy(b)})};V=l(G);Q=new m(u(G));z=
u(G);ga=u(G);da=u(G)};return odf.OdfCanvas}();
// Input 38
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(h,m,f){return new odf.OdfContainer(h,function(a){if(a.state===odf.OdfContainer.INVALID)return f("Document "+h+" is invalid.");a.state===odf.OdfContainer.DONE?a.saveAs(m,function(a){f(a)}):f("Document was not completely loaded.")})};this.render=function(h,m,f){for(m=m.getElementsByTagName("body")[0];m.firstChild;)m.removeChild(m.firstChild);m=new odf.OdfCanvas(m);m.addListener("statereadychange",function(a){f(a)});m.load(h)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(h,m){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(h,m,f,a){};ops.Server.prototype.joinSession=function(h,m,f,a){};ops.Server.prototype.leaveSession=function(h,m,f,a){};ops.Server.prototype.getGenesisUrl=function(h){};
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
ops.Operation=function(){};ops.Operation.prototype.init=function(h){};ops.Operation.prototype.transform=function(h,m){};ops.Operation.prototype.execute=function(h){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var h=this,m,f;this.init=function(a){m=a.memberid;f=a.timestamp};this.transform=function(a,c){return[h]};this.execute=function(a){var c=a.getCursor(m);if(c)return!1;c=new ops.OdtCursor(m,a);a.addCursor(c);a.emit(ops.OdtDocument.signalCursorAdded,c);return!0};this.spec=function(){return{optype:"AddCursor",memberid:m,timestamp:f}}};
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
gui.StyleHelper=function(h){function m(a){var b;a.collapsed?(b=a.startContainer,b.hasChildNodes()&&a.startOffset<b.childNodes.length&&(b=b.childNodes[a.startOffset]),a=[b]):a=d.getTextNodes(a,!0);return h.getAppliedStyles(a)}function f(a,b,c){var d=!0,f;a=m(a);for(f=0;f<a.length&&!(d=a[f]["style:text-properties"],d=!d||d[b]!==c);f+=1);return!d}function a(a,c,e){a=d.getParagraphElements(a);for(var f={},m=!1,g,l;0<a.length;){(g=a[0].getAttributeNS(b,"style-name"))?f[g]||(l=h.getStyleElement(g,"paragraph"),
f[g]=!0):m?l=void 0:(m=!0,l=h.getDefaultStyleElement("paragraph"));if(l&&(g=h.getInheritedStyleAttributes(l,!0),(g=g["style:paragraph-properties"])&&-1===e.indexOf(g[c])))return!1;a.pop()}return!0}var c=new core.DomUtils,d=new odf.OdfUtils,b=odf.Namespaces.textns;this.getAppliedStyles=m;this.applyStyle=function(a,b,e){var f=c.splitBoundaries(b),m=d.getTextNodes(b,!1);h.applyStyle(a,m,{startContainer:b.startContainer,startOffset:b.startOffset,endContainer:b.endContainer,endOffset:b.endOffset},e);f.forEach(c.normalizeTextNodes)};
this.isBold=function(a){return f(a,"fo:font-weight","bold")};this.isItalic=function(a){return f(a,"fo:font-style","italic")};this.hasUnderline=function(a){return f(a,"style:text-underline-style","solid")};this.hasStrikeThrough=function(a){return f(a,"style:text-line-through-style","solid")};this.isAlignedLeft=function(b){return a(b,"fo:text-align",["left","start"])};this.isAlignedCenter=function(b){return a(b,"fo:text-align",["center"])};this.isAlignedRight=function(b){return a(b,"fo:text-align",
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
ops.OpApplyDirectStyling=function(){function h(b){var d=0<=c?a+c:a,e=b.getIteratorAtPosition(0<=c?a:a+c),d=c?b.getIteratorAtPosition(d):e;b=b.getDOM().createRange();b.setStart(e.container(),e.unfilteredDomOffset());b.setEnd(d.container(),d.unfilteredDomOffset());return b}var m,f,a,c,d,b=new odf.OdfUtils;this.init=function(b){m=b.memberid;f=b.timestamp;a=parseInt(b.position,10);c=parseInt(b.length,10);d=b.setProperties};this.transform=function(a,b){return null};this.execute=function(a){var c=h(a),
e=b.getImpactedParagraphs(c);(new gui.StyleHelper(a.getFormatting())).applyStyle(m,c,d);c.detach();a.getOdfCanvas().refreshCSS();e.forEach(function(b){a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:b,memberId:m,timeStamp:f})});a.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:m,timestamp:f,position:a,length:c,setProperties:d}}};
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
ops.OpRemoveCursor=function(){var h=this,m,f;this.init=function(a){m=a.memberid;f=a.timestamp};this.transform=function(a,c){var d=a.spec(),b=[h];"RemoveCursor"===d.optype&&d.memberid===m&&(b=[]);return b};this.execute=function(a){return a.removeCursor(m)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:m,timestamp:f}}};
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
ops.OpMoveCursor=function(){var h=this,m,f,a,c;this.init=function(d){m=d.memberid;f=d.timestamp;a=parseInt(d.position,10);c=void 0!==d.length?parseInt(d.length,10):0};this.merge=function(d){return"MoveCursor"===d.optype&&d.memberid===m?(a=d.position,c=d.length,f=d.timestamp,!0):!1};this.transform=function(d,b){var k=d.spec(),f=a+c,e,s=[h];switch(k.optype){case "RemoveText":e=k.position+k.length;e<=a?a-=k.length:k.position<f&&(a<k.position?c=e<f?c-k.length:k.position-a:(a=k.position,c=e<f?f-e:0));
break;case "SplitParagraph":k.position<a?a+=1:k.position<=f&&(c+=1);break;case "AddAnnotation":k.position<a?a+=1:k.position<f&&(c+=1);break;case "InsertText":k.position<a?a+=k.text.length:k.position<=f&&(c+=k.text.length);break;case "RemoveCursor":k.memberid===m&&(s=[]);break;case "InsertTable":s=null}return s};this.execute=function(d){var b=d.getCursor(m),k=d.getCursorPosition(m),f=d.getPositionFilter(),e=a-k;if(!b)return!1;k=b.getStepCounter();e=0<e?k.countForwardSteps(e,f):0>e?-k.countBackwardSteps(-e,
f):0;b.move(e);c&&(f=0<c?k.countForwardSteps(c,f):0>c?-k.countBackwardSteps(-c,f):0,b.move(f,!0));d.emit(ops.OdtDocument.signalCursorMoved,b);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:m,timestamp:f,position:a,length:c}}};
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
ops.OpInsertTable=function(){function h(a,b){var e;if(1===s.length)e=s[0];else if(3===s.length)switch(a){case 0:e=s[0];break;case c-1:e=s[2];break;default:e=s[1]}else e=s[a];if(1===e.length)return e[0];if(3===e.length)switch(b){case 0:return e[0];case d-1:return e[2];default:return e[1]}return e[b]}var m=this,f,a,c,d,b,k,p,e,s;this.init=function(h){f=h.memberid;a=h.timestamp;b=parseInt(h.position,10);c=parseInt(h.initialRows,10);d=parseInt(h.initialColumns,10);k=h.tableName;p=h.tableStyleName;e=h.tableColumnStyleName;
s=h.tableCellStyleMatrix};this.transform=function(a,c){var d=a.spec(),e=[m];switch(d.optype){case "InsertTable":e=null;break;case "AddAnnotation":d.position<b&&(b+=1);break;case "SplitParagraph":d.position<b?b+=1:d.position!==b||c||(b+=1,e=null);break;case "InsertText":d.position<b?b+=d.text.length:d.position!==b||c||(b+=d.text.length,e=null);break;case "RemoveText":d.position+d.length<=b?b-=d.length:d.position<b&&(b=d.position)}return e};this.execute=function(m){var g=m.getPositionInTextNode(b),
l=m.getRootNode();if(g){var s=m.getDOM(),q=s.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),x=s.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),r,y,t,w;p&&q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",p);k&&q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",k);x.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",
d);e&&x.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",e);q.appendChild(x);for(t=0;t<c;t+=1){x=s.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(w=0;w<d;w+=1)r=s.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(y=h(t,w))&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",y),y=s.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),
r.appendChild(y),x.appendChild(r);q.appendChild(x)}g=m.getParagraphElement(g.textNode);l.insertBefore(q,g?g.nextSibling:void 0);m.getOdfCanvas().refreshSize();m.emit(ops.OdtDocument.signalTableAdded,{tableElement:q,memberId:f,timeStamp:a});m.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:f,timestamp:a,position:b,initialRows:c,initialColumns:d,tableName:k,tableStyleName:p,tableColumnStyleName:e,tableCellStyleMatrix:s}}};
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
ops.OpInsertText=function(){var h=this,m,f,a,c;this.init=function(d){m=d.memberid;f=d.timestamp;a=parseInt(d.position,10);c=d.text};this.merge=function(d){return"InsertText"===d.optype&&d.memberid===m&&d.position===a+c.length?(c+=d.text,f=d.timestamp,!0):!1};this.transform=function(c,b){var f=c.spec(),m=[h];switch(f.optype){case "InsertText":f.position<a?a+=f.text.length:f.position!==a||b||(a+=f.text.length,m=null);break;case "AddAnnotation":f.position<a&&(a+=1);break;case "SplitParagraph":f.position<
a?a+=1:f.position!==a||b||(a+=1,m=null);break;case "InsertTable":m=null;break;case "RemoveText":f.position+f.length<=a?a-=f.length:f.position<a&&(a=f.position)}return m};this.execute=function(d){var b,k,h,e,s=d.getDOM(),n,g=0,l,u;d.upgradeWhitespacesAtPosition(a);if(b=d.getPositionInTextNode(a,m)){k=b.textNode;e=k.nextSibling;h=k.parentNode;n=d.getParagraphElement(k);for(u=0;u<c.length;u+=1)if(" "===c[u]&&(0===u||" "===c[u-1])||"\t"===c[u])0===g?(b.offset!==k.length&&(e=k.splitText(b.offset)),0<u&&
k.appendData(c.substring(0,u))):g<u&&(g=c.substring(g,u),h.insertBefore(s.createTextNode(g),e)),g=u+1,l=" "===c[u]?"text:s":"text:tab",l=s.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",l),l.appendChild(s.createTextNode(c[u])),h.insertBefore(l,e);0===g?k.insertData(b.offset,c):g<c.length&&(b=c.substring(g),h.insertBefore(s.createTextNode(b),e));h=k.parentNode;e=k.nextSibling;h.removeChild(k);h.insertBefore(k,e);0===k.length&&k.parentNode.removeChild(k);0<a&&(d.downgradeWhitespacesAtPosition(a-
1),1<a&&d.downgradeWhitespacesAtPosition(a-2));d.downgradeWhitespacesAtPosition(a);d.downgradeWhitespacesAtPosition(a+c.length);d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:n,memberId:m,timeStamp:f});d.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:m,timestamp:f,position:a,text:c}}};
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
ops.OpRemoveText=function(){function h(a){function b(a){if(k.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function c(d){d=p.mergeIntoParent(d);return!k.isParagraph(d)&&d!==a&&b(d)?c(d):d}this.isEmpty=b;this.mergeChildrenIntoParent=c}function m(a){var c=a.getPositionFilter(),f,g,k,h,m=b,x=a.getDOM().createRange();a=a.getIteratorAtPosition(d);f=a.container();for(g=a.unfilteredDomOffset();m&&
a.nextPosition();)k=a.container(),h=a.unfilteredDomOffset(),c.acceptPosition(a)===NodeFilter.FILTER_ACCEPT&&(m-=1);x.setStart(f,g);x.setEnd(k,h);p.splitBoundaries(x);return x}var f=this,a,c,d,b,k,p;this.init=function(e){runtime.assert(0<=e.length,"OpRemoveText only supports positive lengths");a=e.memberid;c=e.timestamp;d=parseInt(e.position,10);b=parseInt(e.length,10);k=new odf.OdfUtils;p=new core.DomUtils};this.transform=function(e,k){var h=e.spec(),g=d+b,l,m=[f];switch(h.optype){case "RemoveText":l=
h.position+h.length;l<=d?d-=h.length:h.position<g&&(d<h.position?b=l<g?b-h.length:h.position-d:l<g?(d=h.position,b=g-l):m=[]);break;case "InsertText":h.position<=d?d+=h.text.length:h.position<g&&(b=h.position-d,l=new ops.OpRemoveText,l.init({memberid:a,timestamp:c,position:h.position+h.text.length,length:g-h.position}),m=[l,f]);break;case "SplitParagraph":h.position<=d?d+=1:h.position<g&&(b=h.position-d,l=new ops.OpRemoveText,l.init({memberid:a,timestamp:c,position:h.position+1,length:g-h.position}),
m=[l,f]);break;case "InsertTable":m=null;break;case "AddAnnotation":case "RemoveAnnotation":m=null;break;case "ApplyDirectStyling":m=null}return m};this.execute=function(e){var f,k,g,l,p=new h(e.getRootNode());e.upgradeWhitespacesAtPosition(d);e.upgradeWhitespacesAtPosition(d+b);k=m(e);f=e.getParagraphElement(k.startContainer);g=e.getTextElements(k,!0);l=e.getParagraphElements(k);k.detach();g.forEach(function(a){p.mergeChildrenIntoParent(a)});k=l.reduce(function(a,b){var c,d,e=a,g=b,f,k;p.isEmpty(a)&&
(d=!0,b.parentNode!==a.parentNode&&(f=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),g=a,e=b,k=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;g.hasChildNodes();)c=d?g.lastChild:g.firstChild,g.removeChild(c),"editinfo"!==c.localName&&e.insertBefore(c,k);f&&p.isEmpty(f)&&p.mergeChildrenIntoParent(f);p.mergeChildrenIntoParent(g);return e});e.downgradeWhitespacesAtPosition(d);e.fixCursorPositions();e.getOdfCanvas().refreshSize();e.emit(ops.OdtDocument.signalParagraphChanged,
{paragraphElement:k||f,memberId:a,timeStamp:c});e.emit(ops.OdtDocument.signalCursorMoved,e.getCursor(a));e.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:a,timestamp:c,position:d,length:b}}};
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
ops.OpSplitParagraph=function(){var h=this,m,f,a,c=new odf.OdfUtils;this.init=function(c){m=c.memberid;f=c.timestamp;a=parseInt(c.position,10)};this.transform=function(c,b){var f=c.spec(),m=[h];switch(f.optype){case "SplitParagraph":f.position<a?a+=1:f.position!==a||b||(a+=1,m=null);break;case "AddAnnotation":f.position<a&&(a+=1);break;case "InsertText":f.position<a?a+=f.text.length:f.position!==a||b||(a+=f.text.length,m=null);break;case "InsertTable":m=null;break;case "RemoveText":f.position+f.length<=
a?a-=f.length:f.position<a&&(a=f.position)}return m};this.execute=function(d){var b,k,h,e,s,n,g;d.upgradeWhitespacesAtPosition(a);b=d.getPositionInTextNode(a,m);if(!b)return!1;k=d.getParagraphElement(b.textNode);if(!k)return!1;h=c.isListItem(k.parentNode)?k.parentNode:k;0===b.offset?(g=b.textNode.previousSibling,n=null):(g=b.textNode,n=b.offset>=b.textNode.length?null:b.textNode.splitText(b.offset));for(e=b.textNode;e!==h;)if(e=e.parentNode,s=e.cloneNode(!1),g){for(n&&s.appendChild(n);g.nextSibling;)s.appendChild(g.nextSibling);
e.parentNode.insertBefore(s,e.nextSibling);g=e;n=s}else e.parentNode.insertBefore(s,e),g=s,n=e;c.isListItem(n)&&(n=n.childNodes[0]);0===b.textNode.length&&b.textNode.parentNode.removeChild(b.textNode);d.fixCursorPositions(m);d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:m,timeStamp:f});d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:n,memberId:m,timeStamp:f});d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",
memberid:m,timestamp:f,position:a}}};
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
ops.OpSetParagraphStyle=function(){var h=this,m,f,a,c;this.init=function(d){m=d.memberid;f=d.timestamp;a=d.position;c=d.styleName};this.transform=function(a,b){var f=a.spec(),m=[h];switch(f.optype){case "RemoveStyle":f.styleName===c&&"paragraph"===f.styleFamily&&(c="")}return m};this.execute=function(d){var b;b=d.getIteratorAtPosition(a);return(b=d.getParagraphElement(b.container()))?(""!==c?b.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",c):b.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),d.getOdfCanvas().refreshSize(),d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:b,timeStamp:f,memberId:m}),d.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:m,timestamp:f,position:a,styleName:c}}};
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
ops.OpUpdateParagraphStyle=function(){function h(a,b){var c,d,e=b?b.split(","):[];for(c=0;c<e.length;c+=1)d=e[c].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(d[0]),d[1])}function m(a,b,c,d){var e,f,g,k=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<k.length)&&Object.keys(a).forEach(function(b){e=a[b];(c&&void 0!==c[b]||k&&-1!==k.indexOf(b))&&"object"!==typeof e&&delete a[b]});if(b&&b.attributes&&(c||0<k.length)){g=b.attributes.split(",");for(d=0;d<g.length;d+=1)if(f=g[d],c&&void 0!==
c[f]||k&&-1!==k.indexOf(f))g.splice(d,1),d-=1;0<g.length?b.attributes=g.join(","):delete b.attributes}}function f(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function a(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function c(b,c){var d=s?s[c]:null,e=n?n[c]:null;m(d,e,b.setProperties?b.setProperties[c]:null,b.removedProperties?b.removedProperties[c]:null);d&&!f(d)&&delete s[c];e&&!a(e)&&delete n[c]}function d(a){s&&["style:parent-style-name",
"style:next-style-name"].forEach(function(b){s[b]===a&&delete s[b]})}var b=this,k,p,e,s,n,g=odf.Namespaces.stylens;this.init=function(a){k=a.memberid;p=a.timestamp;e=a.styleName;s=a.setProperties;n=a.removedProperties};this.transform=function(g,k){var h=g.spec(),x=[b];switch(h.optype){case "UpdateParagraphStyle":h.styleName!==e||k||(c(h,"style:paragraph-properties"),c(h,"style:text-properties"),m(s||null,n||null,h.setProperties||null,h.removedProperties||null),s&&f(s)||n&&a(n)||(x=[]));break;case "RemoveStyle":"paragraph"===
h.styleFamily&&(h.styleName===e?x=[]:d(h.styleName))}return x};this.execute=function(a){var b=a.getFormatting(),c,d,f;return(c=""!==e?a.getParagraphStyleElement(e):b.getDefaultStyleElement("paragraph"))?(d=c.getElementsByTagNameNS(g,"paragraph-properties")[0],f=c.getElementsByTagNameNS(g,"text-properties")[0],s&&b.updateStyle(c,s),n&&(n["style:paragraph-properties"]&&(h(d,n["style:paragraph-properties"].attributes),0===d.attributes.length&&c.removeChild(d)),n["style:text-properties"]&&(h(f,n["style:text-properties"].attributes),
0===f.attributes.length&&c.removeChild(f)),h(c,n.attributes)),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,e),a.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:k,timestamp:p,styleName:e,setProperties:s,removedProperties:n}}};
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
ops.OpAddStyle=function(){function h(a){k&&["style:parent-style-name","style:next-style-name"].forEach(function(b){k[b]===a&&delete k[b]})}var m=this,f,a,c,d,b,k,p=odf.Namespaces.stylens;this.init=function(e){f=e.memberid;a=e.timestamp;c=e.styleName;d=e.styleFamily;b="true"===e.isAutomaticStyle||!0===e.isAutomaticStyle;k=e.setProperties};this.transform=function(a,b){var c=a.spec();"RemoveStyle"===c.optype&&c.styleFamily===d&&h(c.styleName);return[m]};this.execute=function(a){var f=a.getOdfCanvas().odfContainer(),
h=a.getFormatting(),g=a.getDOM().createElementNS(p,"style:style");if(!g)return!1;k&&h.updateStyle(g,k);g.setAttributeNS(p,"style:family",d);g.setAttributeNS(p,"style:name",c);b?f.rootElement.automaticStyles.appendChild(g):f.rootElement.styles.appendChild(g);a.getOdfCanvas().refreshCSS();b||a.emit(ops.OdtDocument.signalCommonStyleCreated,{name:c,family:d});return!0};this.spec=function(){return{optype:"AddStyle",memberid:f,timestamp:a,styleName:c,styleFamily:d,isAutomaticStyle:b,setProperties:k}}};
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
ops.OpRemoveStyle=function(){function h(a){var d=[];a&&["style:parent-style-name","style:next-style-name"].forEach(function(f){a[f]===c&&d.push(f)});return d}var m=this,f,a,c,d;this.init=function(b){f=b.memberid;a=b.timestamp;c=b.styleName;d=b.styleFamily};this.transform=function(b,k){var p=b.spec(),e,s;e=[m];switch(p.optype){case "RemoveStyle":p.styleName===c&&p.styleFamily===d&&(e=[]);break;case "UpdateParagraphStyle":"paragraph"===d&&(s=h(p.setProperties),0<s.length&&(e=new ops.OpUpdateParagraphStyle,
e.init({memberid:f,timestamp:a,styleName:p.styleName,removedProperties:{attributes:s.join(",")}}),e=[e,m]));break;case "AddStyle":p.styleFamily===d&&(s=h(p.setProperties),0<s.length&&(e=new ops.OpUpdateParagraphStyle,e.init({memberid:f,timestamp:a,styleName:p.styleName,removedProperties:{attributes:s.join(",")}}),e=[e,m]));break;case "SetParagraphStyle":"paragraph"===d&&p.styleName===c&&(p.styleName="",e=new ops.OpSetParagraphStyle,e.init(p),e=[e,m])}return e};this.execute=function(a){var f=a.getStyleElement(c,
d);if(!f)return!1;f.parentNode.removeChild(f);a.getOdfCanvas().refreshCSS();a.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:c,family:d});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:f,timestamp:a,styleName:c,styleFamily:d}}};
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
ops.OpAddAnnotation=function(){function h(a,b,c){var d=a.getPositionInTextNode(c,f);d&&(a=d.textNode,c=a.parentNode,d.offset!==a.length&&a.splitText(d.offset),c.insertBefore(b,a.nextSibling),0===a.length&&c.removeChild(a))}var m=this,f,a,c,d,b;this.init=function(k){f=k.memberid;a=parseInt(k.timestamp,10);c=parseInt(k.position,10);d=parseInt(k.length,10)||0;b=k.name};this.transform=function(a,b){var e=a.spec(),f=c+d,h=[m];switch(e.optype){case "AddAnnotation":e.position<c?c+=1:e.position!==c||b||(c+=
1,h=null);break;case "InsertText":e.position<=c?c+=e.text.length:e.position<=f&&(d+=e.text.length);break;case "SplitParagraph":e.position<=c?c+=1:e.position<=f&&(d+=1);break;case "InsertTable":h=null;break;case "RemoveText":e.position+e.length<=c?c-=e.length:e.position<c&&(c=e.position)}return h};this.execute=function(k){var m={},e=k.getPositionFilter(),s=k.getCursor(f),n=k.getCursorPosition(f),n=c-n-1,g=new Date(a),l,u,q,x,r;r=k.getDOM();l=r.createElementNS(odf.Namespaces.officens,"office:annotation");
l.setAttributeNS(odf.Namespaces.officens,"office:name",b);u=r.createElementNS(odf.Namespaces.dcns,"dc:creator");u.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",f);q=r.createElementNS(odf.Namespaces.dcns,"dc:date");q.appendChild(r.createTextNode(g.toISOString()));g=r.createElementNS(odf.Namespaces.textns,"text:list");x=r.createElementNS(odf.Namespaces.textns,"text:list-item");r=r.createElementNS(odf.Namespaces.textns,"text:p");x.appendChild(r);g.appendChild(x);l.appendChild(u);
l.appendChild(q);l.appendChild(g);m.node=l;if(!m.node)return!1;if(d){l=k.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");l.setAttributeNS(odf.Namespaces.officens,"office:name",b);m.end=l;if(!m.end)return!1;h(k,m.end,c+d)}h(k,m.node,c);s&&(l=s.getStepCounter(),e=0<n?l.countForwardSteps(n,e):0>n?-l.countBackwardSteps(-n,e):0,s.move(e),k.emit(ops.OdtDocument.signalCursorMoved,s));k.getOdfCanvas().addAnnotation(m);return!0};this.spec=function(){return{optype:"AddAnnotation",
memberid:f,timestamp:a,position:c,length:d,name:b}}};
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
ops.OpRemoveAnnotation=function(){var h,m,f,a,c;this.init=function(d){h=d.memberid;m=d.timestamp;f=parseInt(d.position,10);a=parseInt(d.length,10);c=new core.DomUtils};this.transform=function(a,b){return null};this.execute=function(a){for(var b=a.getIteratorAtPosition(f).container(),k,h=null,e=null;b.namespaceURI!==odf.Namespaces.officens||"annotation"!==b.localName;)b=b.parentNode;if(null===b)return!1;h=b;(k=h.getAttributeNS(odf.Namespaces.officens,"name"))&&(e=c.getElementsByTagNameNS(a.getRootNode(),
odf.Namespaces.officens,"annotation-end").filter(function(a){return k===a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);a.getOdfCanvas().forgetAnnotations();for(b=c.getElementsByTagNameNS(h,odf.Namespaces.webodfns+":names:cursor","cursor");b.length;)h.parentNode.insertBefore(b.pop(),h);h.parentNode.removeChild(h);e&&e.parentNode.removeChild(e);a.fixCursorPositions();a.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:h,timestamp:m,
position:f,length:a}}};
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
ops.OperationFactory=function(){function h(f){return function(){return new f}}var m;this.register=function(f,a){m[f]=a};this.create=function(f){var a=null,c=m[f.optype];c&&(a=c(f),a.init(f));return a};m={AddCursor:h(ops.OpAddCursor),ApplyDirectStyling:h(ops.OpApplyDirectStyling),InsertTable:h(ops.OpInsertTable),InsertText:h(ops.OpInsertText),RemoveText:h(ops.OpRemoveText),SplitParagraph:h(ops.OpSplitParagraph),SetParagraphStyle:h(ops.OpSetParagraphStyle),UpdateParagraphStyle:h(ops.OpUpdateParagraphStyle),
AddStyle:h(ops.OpAddStyle),RemoveStyle:h(ops.OpRemoveStyle),MoveCursor:h(ops.OpMoveCursor),RemoveCursor:h(ops.OpRemoveCursor),AddAnnotation:h(ops.OpAddAnnotation),RemoveAnnotation:h(ops.OpRemoveAnnotation)}};
// Input 57
runtime.loadClass("core.Cursor");runtime.loadClass("core.DomUtils");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(h,m){function f(){r.setUnfilteredPosition(h.getNode(),0);return r}function a(a,b){var c,d=null;a&&(c=b?a[a.length-1]:a[0]);c&&(d={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return d}function c(b,d,e,f){var g=b.nodeType;e.setStart(b,d);e.collapse(!f);f=a(e.getClientRects(),!0===f);!f&&0<d&&(e.setStart(b,d-1),e.setEnd(b,d),f=a(e.getClientRects(),!0));f||(g===Node.ELEMENT_NODE&&b.childNodes[d-1]?f=c(b,d-1,e,!0):b.nodeType===Node.TEXT_NODE&&0<d?f=c(b,d-1,e,!0):b.previousSibling?
f=c(b.previousSibling,b.previousSibling.nodeType===Node.TEXT_NODE?b.previousSibling.textContent.length:b.previousSibling.childNodes.length,e,!0):b.parentNode&&b.parentNode!==m?f=c(b.parentNode,0,e,!1):(e.selectNode(m),f=a(e.getClientRects(),!1)));runtime.assert(Boolean(f),"No visible rectangle found");return f}function d(a,b,d){var e=a,g=f(),k,l=m.ownerDocument.createRange(),q=h.getSelectedRange()?h.getSelectedRange().cloneRange():m.ownerDocument.createRange(),r,n=runtime.getWindow();for(k=c(g.container(),
g.unfilteredDomOffset(),l);0<e&&d();)e-=1;b?(b=g.container(),g=g.unfilteredDomOffset(),-1===q.comparePoint(b,g)?(q.setStart(b,g),r=!1):q.setEnd(b,g)):(q.setStart(g.container(),g.unfilteredDomOffset()),q.collapse(!0));h.setSelectedRange(q,r);g=f();q=c(g.container(),g.unfilteredDomOffset(),l);if(q.top===k.top||void 0===y)y=q.left;n.clearTimeout(t);t=n.setTimeout(function(){y=void 0},2E3);l.detach();return a-e}function b(a){var b=f();return a.acceptPosition(b)===w?!0:!1}function k(a,b){for(var c=f(),
d=new core.LoopWatchDog(1E3),e=0,g=0;0<a&&c.nextPosition();)e+=1,d.check(),b.acceptPosition(c)===w&&(g+=e,e=0,a-=1);return g}function p(a,b,c){for(var d=f(),e=new core.LoopWatchDog(1E3),g=0,k=0;0<a&&d.nextPosition();)e.check(),c.acceptPosition(d)===w&&(g+=1,b.acceptPosition(d)===w&&(k+=g,g=0,a-=1));return k}function e(a,b,c){for(var d=f(),e=new core.LoopWatchDog(1E3),g=0,k=0;0<a&&d.previousPosition();)e.check(),c.acceptPosition(d)===w&&(g+=1,b.acceptPosition(d)===w&&(k+=g,g=0,a-=1));return k}function s(a,
b){for(var c=f(),d=new core.LoopWatchDog(1E3),e=0,g=0;0<a&&c.previousPosition();)e+=1,d.check(),b.acceptPosition(c)===w&&(g+=e,e=0,a-=1);return g}function n(a){var b=f(),c=q.getParagraphElement(b.getCurrentNode()),d;d=-s(1,a);if(0===d||c&&c!==q.getParagraphElement(b.getCurrentNode()))d=k(1,a);return d}function g(a,b){var d=f(),e=0,g=0,k=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var h=b,l=k,q=d,r=q.container(),n=0,x=null,p=void 0,s=10,t=void 0,u=0,R=void 0,F=void 0,G=void 0,t=void 0,D=m.ownerDocument.createRange(),
T=new core.LoopWatchDog(1E3),t=c(r,q.unfilteredDomOffset(),D),R=t.top,F=void 0===y?t.left:y,G=R;!0===(0>l?q.previousPosition():q.nextPosition());)if(T.check(),h.acceptPosition(q)===w&&(n+=1,r=q.container(),t=c(r,q.unfilteredDomOffset(),D),t.top!==R)){if(t.top!==G&&G!==R)break;G=t.top;t=Math.abs(F-t.left);if(null===x||t<s)x=r,p=q.unfilteredDomOffset(),s=t,u=n}null!==x?(q.setUnfilteredPosition(x,p),n=u):n=0;D.detach();e+=n;if(0===e)break;g+=e;a-=1}return g*k}function l(a,b){var d,e,g,k,h=f(),l=q.getParagraphElement(h.getCurrentNode()),
r=0,n=m.ownerDocument.createRange();0>a?(d=h.previousPosition,e=-1):(d=h.nextPosition,e=1);for(g=c(h.container(),h.unfilteredDomOffset(),n);d.call(h);)if(b.acceptPosition(h)===w){if(q.getParagraphElement(h.getCurrentNode())!==l)break;k=c(h.container(),h.unfilteredDomOffset(),n);if(k.bottom!==g.bottom&&(g=k.top>=g.top&&k.bottom<g.bottom||k.top<=g.top&&k.bottom>g.bottom,!g))break;r+=e;g=k}n.detach();return r}function u(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");
var d=f(),e=d.container(),g=d.unfilteredDomOffset(),k=0,h=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(e,g);e=x.comparePoints(a,b,d.container(),d.unfilteredDomOffset());if(0>e)for(;d.nextPosition()&&(h.check(),c.acceptPosition(d)===w&&(k+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&
!(h.check(),c.acceptPosition(d)===w&&(k-=1,0>=x.comparePoints(a,b,d.container(),d.unfilteredDomOffset()))););return k}var q,x,r,y,t,w=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,b){return d(a,b,r.nextPosition)};this.movePointBackward=function(a,b){return d(a,b,r.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:k,countBackwardSteps:s,convertForwardStepsBetweenFilters:p,convertBackwardStepsBetweenFilters:e,countLinesSteps:g,countStepsToLineBoundary:l,
countStepsToPosition:u,isPositionWalkable:b,countStepsToValidPosition:n}};(function(){q=new odf.OdfUtils;x=new core.DomUtils;r=gui.SelectionMover.createPositionIterator(m);var a=m.ownerDocument.createRange();a.setStart(r.container(),r.unfilteredDomOffset());a.collapse(!0);h.setSelectedRange(a)})()};
gui.SelectionMover.createPositionIterator=function(h){var m=new function(){this.acceptNode=function(f){return"urn:webodf:names:cursor"===f.namespaceURI||"urn:webodf:names:editinfo"===f.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(h,5,m,!1)};(function(){return gui.SelectionMover})();
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
ops.OperationTransformer=function(){function h(f,a){for(var c,d,b,k=[],p=[];0<f.length&&a;){c=f.shift();d=a;var e=void 0;b=e=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(c.spec()));runtime.log(runtime.toJson(d.spec()));e=m.create(d.spec());b=d.transform(c,!0);d=(e=c.transform(e,!1))&&b?{opsA:e,opsB:b}:null;if(!d)return null;k=k.concat(d.opsA);if(0===d.opsB.length){k=k.concat(f);a=null;break}if(1<d.opsB.length)for(c=0;c<d.opsB.length-1;c+=1){b=h(f,d.opsB[c]);if(!b)return null;
p=p.concat(b.opsB);f=b.opsA}a=d.opsB.pop()}a&&p.push(a);return{opsA:k,opsB:p}}var m;this.setOperationFactory=function(f){m=f};this.transform=function(f,a){var c,d=[],b,k=[];for(c=0;c<f.length;c+=1){b=m.create(f[c]);if(!b)return null;d.push(b)}for(c=0;c<a.length;c+=1){b=m.create(a[c]);b=h(d,b);if(!b)return null;d=b.opsA;k=k.concat(b.opsB)}return{opsA:d,opsB:k}}};
// Input 59
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(h,m){var f=this,a,c;this.removeFromOdtDocument=function(){c.remove()};this.move=function(c,b){var k=0;0<c?k=a.movePointForward(c,b):0>=c&&(k=-a.movePointBackward(-c,b));f.handleUpdate();return k};this.handleUpdate=function(){};this.getStepCounter=function(){return a.getStepCounter()};this.getMemberId=function(){return h};this.getNode=function(){return c.getNode()};this.getAnchorNode=function(){return c.getAnchorNode()};this.getSelectedRange=function(){return c.getSelectedRange()};
this.getOdtDocument=function(){return m};c=new core.Cursor(m.getDOM(),h);a=new gui.SelectionMover(c,m.getRootNode())};
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
ops.EditInfo=function(h,m){function f(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&a.push({memberid:b,time:c[b].time});a.sort(function(a,b){return a.time-b.time});return a}var a,c={};this.getNode=function(){return a};this.getOdtDocument=function(){return m};this.getEdits=function(){return c};this.getSortedEdits=function(){return f()};this.addEdit=function(a,b){c[a]={time:b}};this.clearEdits=function(){c={}};this.destroy=function(c){h.parentNode&&h.removeChild(a);c()};a=m.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");h.insertBefore(a,h.firstChild)};
// Input 61
gui.Avatar=function(h,m){var f=this,a,c,d;this.setColor=function(a){c.style.borderColor=a};this.setImageUrl=function(a){f.isVisible()?c.src=a:d=a};this.isVisible=function(){return"block"===a.style.display};this.show=function(){d&&(c.src=d,d=void 0);a.style.display="block"};this.hide=function(){a.style.display="none"};this.markAsFocussed=function(b){a.className=b?"active":""};this.destroy=function(b){h.removeChild(a);b()};(function(){var b=h.ownerDocument,d=b.documentElement.namespaceURI;a=b.createElementNS(d,
"div");c=b.createElementNS(d,"img");c.width=64;c.height=64;a.appendChild(c);a.style.width="64px";a.style.height="70px";a.style.position="absolute";a.style.top="-80px";a.style.left="-34px";a.style.display=m?"block":"none";h.appendChild(a)})()};
// Input 62
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(h,m,f){function a(d){k&&b.parentNode&&(!p||d)&&(d&&void 0!==e&&runtime.clearTimeout(e),p=!0,c.style.opacity=d||"0"===c.style.opacity?"1":"0",e=runtime.setTimeout(function(){p=!1;a(!1)},500))}var c,d,b,k=!1,p=!1,e;this.refreshCursorBlinking=function(){f||h.getSelectedRange().collapsed?(k=!0,a(!0)):(k=!1,c.style.opacity="0")};this.setFocus=function(){k=!0;d.markAsFocussed(!0);a(!0)};this.removeFocus=function(){k=!1;d.markAsFocussed(!1);c.style.opacity="1"};this.show=function(){c.style.visibility=
"visible";d.markAsFocussed(!0)};this.hide=function(){c.style.visibility="hidden";d.markAsFocussed(!1)};this.setAvatarImageUrl=function(a){d.setImageUrl(a)};this.setColor=function(a){c.style.borderColor=a;d.setColor(a)};this.getCursor=function(){return h};this.getFocusElement=function(){return c};this.toggleHandleVisibility=function(){d.isVisible()?d.hide():d.show()};this.showHandle=function(){d.show()};this.hideHandle=function(){d.hide()};this.ensureVisible=function(){var a,b,d,e,f=h.getOdtDocument().getOdfCanvas().getElement().parentNode,
k;d=f.offsetWidth-f.clientWidth+5;e=f.offsetHeight-f.clientHeight+5;k=c.getBoundingClientRect();a=k.left-d;b=k.top-e;d=k.right+d;e=k.bottom+e;k=f.getBoundingClientRect();b<k.top?f.scrollTop-=k.top-b:e>k.bottom&&(f.scrollTop+=e-k.bottom);a<k.left?f.scrollLeft-=k.left-a:d>k.right&&(f.scrollLeft+=d-k.right)};this.destroy=function(a){d.destroy(function(d){d?a(d):(b.removeChild(c),a())})};(function(){var a=h.getOdtDocument().getDOM();c=a.createElementNS(a.documentElement.namespaceURI,"span");b=h.getNode();
b.appendChild(c);d=new gui.Avatar(b,m)})()};
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
gui.KeyboardHandler=function(){function h(a,d){d||(d=m.None);return a+":"+d}var m=gui.KeyboardHandler.Modifier,f=null,a={};this.setDefault=function(a){f=a};this.bind=function(c,d,b){c=h(c,d);runtime.assert(!1===a.hasOwnProperty(c),"tried to overwrite the callback handler of key combo: "+c);a[c]=b};this.unbind=function(c,d){var b=h(c,d);delete a[b]};this.reset=function(){f=null;a={}};this.handleEvent=function(c){var d=c.keyCode,b=m.None;c.metaKey&&(b|=m.Meta);c.ctrlKey&&(b|=m.Ctrl);c.altKey&&(b|=m.Alt);
c.shiftKey&&(b|=m.Shift);d=h(d,b);d=a[d];b=!1;d?b=d():null!==f&&(b=f(c));b&&(c.preventDefault?c.preventDefault():c.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
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
gui.Clipboard=function(){var h,m,f;this.setDataFromRange=function(a,c){var d=!0,b,f=a.clipboardData;b=runtime.getWindow();var p=c.startContainer.ownerDocument;!f&&b&&(f=b.clipboardData);f?(p=p.createElement("span"),p.appendChild(c.cloneContents()),b=f.setData("text/plain",m.writeToString(p)),d=d&&b,b=f.setData("text/html",h.writeToString(p,odf.Namespaces.namespaceMap)),d=d&&b,a.preventDefault()):d=!1;return d};h=new xmldom.LSSerializer;m=new odf.TextSerializer;f=new odf.OdfNodeFilter;h.filter=f;m.filter=
f};
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
gui.DirectTextStyler=function(h,m){function f(a,b){for(var c=0,d=b[c];d&&a;)a=a[d],c+=1,d=b[c];return b.length===c?a:void 0}function a(a,b){var c=f(a[0],b);return a.every(function(a){return c===f(a,b)})?c:void 0}function c(){function b(a,c,d){a!==c&&(void 0===e&&(e={}),e[d]=c);return c}var c=x.getCursor(m),d=c&&c.getSelectedRange(),c=d&&r.getAppliedStyles(d),e;t=b(t,d?r.isBold(d):!1,"isBold");w=b(w,d?r.isItalic(d):!1,"isItalic");v=b(v,d?r.hasUnderline(d):!1,"hasUnderline");C=b(C,d?r.hasStrikeThrough(d):
!1,"hasStrikeThrough");d=c&&a(c,["style:text-properties","fo:font-size"]);J=b(J,d&&parseFloat(d),"fontSize");E=b(E,c&&a(c,["style:text-properties","style:font-name"]),"fontName");e&&y.emit(gui.DirectTextStyler.textStylingChanged,e)}function d(a){a.getMemberId()===m&&c()}function b(a){a===m&&c()}function k(a){a.getMemberId()===m&&c()}function p(){c()}function e(a){var b=x.getCursor(m);b&&x.getParagraphElement(b.getNode())===a.paragraphElement&&c()}function s(a,b){var c=x.getCursor(m);if(!c)return!1;
b(!a(c.getSelectedRange()));return!0}function n(a,b){var c=x.getCursorSelection(m),d=new ops.OpApplyDirectStyling,e={};e[a]=b;d.init({memberid:m,position:c.position,length:c.length,setProperties:{"style:text-properties":e}});h.enqueue(d)}function g(a){n("fo:font-weight",a?"bold":"normal")}function l(a){n("fo:font-style",a?"italic":"normal")}function u(a){n("style:text-underline-style",a?"solid":"none")}function q(a){n("style:text-line-through-style",a?"solid":"none")}var x=h.getOdtDocument(),r=new gui.StyleHelper(x.getFormatting()),
y=new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]),t=!1,w=!1,v=!1,C=!1,J,E;this.setBold=g;this.setItalic=l;this.setHasUnderline=u;this.setHasStrikethrough=q;this.setFontSize=function(a){n("fo:font-size",a+"pt")};this.setFontName=function(a){n("style:font-name",a)};this.toggleBold=s.bind(this,r.isBold,g);this.toggleItalic=s.bind(this,r.isItalic,l);this.toggleUnderline=s.bind(this,r.hasUnderline,u);this.toggleStrikethrough=s.bind(this,r.hasStrikeThrough,q);this.isBold=function(){return t};
this.isItalic=function(){return w};this.hasUnderline=function(){return v};this.hasStrikeThrough=function(){return C};this.fontSize=function(){return J};this.fontName=function(){return E};this.subscribe=function(a,b){y.subscribe(a,b)};this.unsubscribe=function(a,b){y.unsubscribe(a,b)};this.destroy=function(a){x.unsubscribe(ops.OdtDocument.signalCursorAdded,d);x.unsubscribe(ops.OdtDocument.signalCursorRemoved,b);x.unsubscribe(ops.OdtDocument.signalCursorMoved,k);x.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,
p);x.unsubscribe(ops.OdtDocument.signalParagraphChanged,e);a()};x.subscribe(ops.OdtDocument.signalCursorAdded,d);x.subscribe(ops.OdtDocument.signalCursorRemoved,b);x.subscribe(ops.OdtDocument.signalCursorMoved,k);x.subscribe(ops.OdtDocument.signalParagraphStyleModified,p);x.subscribe(ops.OdtDocument.signalParagraphChanged,e);c()};gui.DirectTextStyler.textStylingChanged="textStyling/changed";(function(){return gui.DirectTextStyler})();
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
gui.DirectParagraphStyler=function(h,m,f){function a(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b=l.getCursor(m),b=b&&b.getSelectedRange(),c;y=a(y,b?x.isAlignedLeft(b):!1,"isAlignedLeft");t=a(t,b?x.isAlignedCenter(b):!1,"isAlignedCenter");w=a(w,b?x.isAlignedRight(b):!1,"isAlignedRight");v=a(v,b?x.isAlignedJustified(b):!1,"isAlignedJustified");c&&r.emit(gui.DirectParagraphStyler.paragraphStylingChanged,c)}function c(b){b.getMemberId()===m&&a()}function d(b){b===m&&a()}function b(b){b.getMemberId()===
m&&a()}function k(){a()}function p(b){var c=l.getCursor(m);c&&l.getParagraphElement(c.getNode())===b.paragraphElement&&a()}function e(a){var b=l.getCursor(m).getSelectedRange(),c=l.getCursorPosition(m),b=q.getParagraphElements(b),d=l.getFormatting();b.forEach(function(b){var e=c+l.getDistanceFromCursor(m,b,0),g=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=f.generateName();var k,e=e+1;g&&(k=d.createDerivedStyleObject(g,"paragraph",{}));k=a(k||{});g=new ops.OpAddStyle;g.init({memberid:m,styleName:b,
styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:k});k=new ops.OpSetParagraphStyle;k.init({memberid:m,styleName:b,position:e});h.enqueue(g);h.enqueue(k)})}function s(a){e(function(b){return u.mergeObjects(b,a)})}function n(a){s({"style:paragraph-properties":{"fo:text-align":a}})}function g(a,b){var c=l.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&q.parseLength(d);return u.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var l=h.getOdtDocument(),u=new core.Utils,q=new odf.OdfUtils,x=new gui.StyleHelper(l.getFormatting()),r=new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]),y,t,w,v;this.isAlignedLeft=function(){return y};this.isAlignedCenter=function(){return t};this.isAlignedRight=function(){return w};this.isAlignedJustified=function(){return v};this.alignParagraphLeft=function(){n("left");return!0};this.alignParagraphCenter=function(){n("center");
return!0};this.alignParagraphRight=function(){n("right");return!0};this.alignParagraphJustified=function(){n("justify");return!0};this.indent=function(){e(g.bind(null,1));return!0};this.outdent=function(){e(g.bind(null,-1));return!0};this.subscribe=function(a,b){r.subscribe(a,b)};this.unsubscribe=function(a,b){r.unsubscribe(a,b)};this.destroy=function(a){l.unsubscribe(ops.OdtDocument.signalCursorAdded,c);l.unsubscribe(ops.OdtDocument.signalCursorRemoved,d);l.unsubscribe(ops.OdtDocument.signalCursorMoved,
b);l.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,k);l.unsubscribe(ops.OdtDocument.signalParagraphChanged,p);a()};l.subscribe(ops.OdtDocument.signalCursorAdded,c);l.subscribe(ops.OdtDocument.signalCursorRemoved,d);l.subscribe(ops.OdtDocument.signalCursorMoved,b);l.subscribe(ops.OdtDocument.signalParagraphStyleModified,k);l.subscribe(ops.OdtDocument.signalParagraphChanged,p);a()};gui.DirectParagraphStyler.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectParagraphStyler})();
// Input 67
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
gui.TextManipulator=function(h,m){function f(a){var b=new ops.OpRemoveText;b.init({memberid:m,position:a.position,length:a.length});return b}function a(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}var c=h.getOdtDocument();this.enqueueParagraphSplittingOps=function(){var d=a(c.getCursorSelection(m)),b;0<d.length&&(b=f(d),h.enqueue(b));b=new ops.OpSplitParagraph;b.init({memberid:m,position:d.position});h.enqueue(b);return!0};this.removeTextByBackspaceKey=function(){var d=a(c.getCursorSelection(m)),
b=null;0===d.length?0<d.position&&c.getPositionInTextNode(d.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:m,position:d.position-1,length:1}),h.enqueue(b)):(b=f(d),h.enqueue(b));return null!==b};this.removeTextByDeleteKey=function(){var d=a(c.getCursorSelection(m)),b=null;0===d.length?c.getPositionInTextNode(d.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:m,position:d.position,length:1}),h.enqueue(b)):(b=f(d),h.enqueue(b));return null!==b};this.removeCurrentSelection=function(){var d=
a(c.getCursorSelection(m));0!==d.length&&(d=f(d),h.enqueue(d));return!0};this.insertText=function(d){var b=a(c.getCursorSelection(m)),k=null;0<b.length&&(k=f(b),h.enqueue(k));k=new ops.OpInsertText;k.init({memberid:m,position:b.position,text:d});h.enqueue(k)}};(function(){return gui.TextManipulator})();
// Input 68
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Utils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.DirectTextStyler");
runtime.loadClass("gui.DirectParagraphStyler");runtime.loadClass("gui.TextManipulator");
gui.SessionController=function(){var h=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(m,f,a){function c(a,b,c,d){var e="on"+b,f=!1;a.attachEvent&&(f=a.attachEvent(e,c));!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0);f&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function d(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function b(a){a.preventDefault?a.preventDefault():a.returnValue=!1}
function k(a,b){var c=new ops.OpMoveCursor;c.init({memberid:f,position:a,length:b||0});return c}function p(a,b){var c=gui.SelectionMover.createPositionIterator(z.getRootNode()),d=z.getOdfCanvas().getElement(),e;e=a;if(!e)return null;for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return null;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,
b);return z.getDistanceFromCursor(f,c.container(),c.unfilteredDomOffset())}function e(a){var b=z.getOdfCanvas().getElement(),c=z.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function s(a){runtime.setTimeout(function(){var b;a:{var c=z.getOdfCanvas().getElement();b=V.getSelection();b={anchorNode:b.anchorNode,anchorOffset:b.anchorOffset,
focusNode:b.focusNode,focusOffset:b.focusOffset};var d=a.detail,g,h;if(null===b.anchorNode&&null===b.focusNode){h=a.clientX;g=a.clientY;var l=z.getDOM();l.caretRangeFromPoint?(h=l.caretRangeFromPoint(h,g),h={container:h.startContainer,offset:h.startOffset}):l.caretPositionFromPoint?(h=l.caretPositionFromPoint(h,g),h={container:h.offsetNode,offset:h.offset}):h=null;if(!h){b=null;break a}b.anchorNode=h.container;b.anchorOffset=h.offset;b.focusNode=b.anchorNode;b.focusOffset=b.anchorOffset}runtime.assert(null!==
b.anchorNode&&null!==b.focusNode,"anchorNode is null or focusNode is null");g=da.containsNode(c,b.anchorNode);h=da.containsNode(c,b.focusNode);if(g||h){g||(g=e(b.anchorNode),b.anchorNode=g.node,b.anchorOffset=g.offset);h||(g=e(b.focusNode),b.focusNode=g.node,b.focusOffset=g.offset);if(2===d){var q=/[A-Za-z0-9]/,r=gui.SelectionMover.createPositionIterator(z.getRootNode()),n=0<da.comparePoints(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset),x;n?(g=b.anchorNode,l=b.anchorOffset,d=b.focusNode,
h=b.focusOffset):(g=b.focusNode,l=b.focusOffset,d=b.anchorNode,h=b.anchorOffset);for(r.setUnfilteredPosition(g,l);r.previousPosition();){x=r.getCurrentNode();if(x.nodeType===Node.TEXT_NODE){if(x=x.data[r.unfilteredDomOffset()],!q.test(x))break}else if(x.namespaceURI!==odf.Namespaces.textns||"span"!==x.localName)break;g=r.container();l=r.unfilteredDomOffset()}r.setUnfilteredPosition(d,h);do if(x=r.getCurrentNode(),x.nodeType===Node.TEXT_NODE){if(x=x.data[r.unfilteredDomOffset()],!q.test(x))break}else if(x.namespaceURI!==
odf.Namespaces.textns||"span"!==x.localName)break;while(r.nextPosition());d=r.container();h=r.unfilteredDomOffset();n?(b.anchorNode=g,b.anchorOffset=l,b.focusNode=d,b.focusOffset=h):(b.focusNode=g,b.focusOffset=l,b.anchorNode=d,b.anchorOffset=h)}else 3===d&&(d=z.getParagraphElement(b.anchorNode),h=z.getParagraphElement(b.focusNode),d&&(b.anchorNode=d,b.anchorOffset=0),h&&(b.focusNode=h,b.focusOffset=h.childNodes.length));c.focus()}else b=null}null!==b&&(c=p(b.anchorNode,b.anchorOffset),d=b.focusNode===
b.anchorNode&&b.focusOffset===b.anchorOffset?c:p(b.focusNode,b.focusOffset),null!==d&&0!==d||null!==c&&0!==c)&&(b=z.getCursorPosition(f),c=k(b+c,d-c),m.enqueue(c))},0)}function n(a){s(a)}function g(a){var b=z.getCursorSelection(f),c=z.getCursor(f).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,ja,ea):-c.convertBackwardStepsBetweenFilters(-a,ja,ea),a=b.length+a,m.enqueue(k(b.position,a)))}function l(a){var b=z.getCursorPosition(f),c=z.getCursor(f).getStepCounter();0!==a&&(a=0<
a?c.convertForwardStepsBetweenFilters(a,ja,ea):-c.convertBackwardStepsBetweenFilters(-a,ja,ea),m.enqueue(k(b+a,0)))}function u(){l(-1);return!0}function q(){l(1);return!0}function x(){g(-1);return!0}function r(){g(1);return!0}function y(a,b){var c=z.getParagraphElement(z.getCursor(f).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=z.getCursor(f).getStepCounter().countLinesSteps(a,ja);b?g(c):l(c)}function t(){y(-1,!1);return!0}function w(){y(1,!1);return!0}function v(){y(-1,
!0);return!0}function C(){y(1,!0);return!0}function J(a,b){var c=z.getCursor(f).getStepCounter().countStepsToLineBoundary(a,ja);b?g(c):l(c)}function E(){J(-1,!1);return!0}function K(){J(1,!1);return!0}function B(){J(-1,!0);return!0}function N(){J(1,!0);return!0}function H(){var a=z.getParagraphElement(z.getCursor(f).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");c=z.getDistanceFromCursor(f,a,0);b=gui.SelectionMover.createPositionIterator(z.getRootNode());for(b.setUnfilteredPosition(a,
0);0===c&&b.previousPosition();)a=b.getCurrentNode(),I.isParagraph(a)&&(c=z.getDistanceFromCursor(f,a,0));g(c);return!0}function L(){var a=z.getParagraphElement(z.getCursor(f).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(z.getRootNode());b.moveToEndOfNode(a);for(c=z.getDistanceFromCursor(f,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),I.isParagraph(a)&&(b.moveToEndOfNode(a),
c=z.getDistanceFromCursor(f,b.container(),b.unfilteredDomOffset()));g(c);return!0}function fa(a,b){var c=gui.SelectionMover.createPositionIterator(z.getRootNode());0<a&&c.moveToEnd();c=z.getDistanceFromCursor(f,c.container(),c.unfilteredDomOffset());b?g(c):l(c)}function ma(){fa(-1,!1);return!0}function M(){fa(1,!1);return!0}function pa(){fa(-1,!0);return!0}function W(){fa(1,!0);return!0}function aa(){var a=gui.SelectionMover.createPositionIterator(z.getRootNode()),b;b=-z.getDistanceFromCursor(f,a.container(),
a.unfilteredDomOffset());a.moveToEnd();b+=z.getDistanceFromCursor(f,a.container(),a.unfilteredDomOffset());m.enqueue(k(0,b));return!0}function O(){var a=z.getCursor(f),b=V.getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function R(a){var b=z.getCursor(f);b.getSelectedRange().collapsed||(ia.setDataFromRange(a,b.getSelectedRange())?ka.removeCurrentSelection():runtime.log("Cut operation failed"))}function F(){return!1!==z.getCursor(f).getSelectedRange().collapsed}
function G(a){var b=z.getCursor(f);b.getSelectedRange().collapsed||ia.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function D(a){var b;V.clipboardData&&V.clipboardData.getData?b=V.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(ka.insertText(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function T(){return!1}function X(a){if(Y)Y.onOperationExecuted(a)}function Q(a){z.emit(ops.OdtDocument.signalUndoStackChanged,
a)}function P(){return Y?(Y.moveBackward(1),O(),!0):!1}function $(){return Y?(Y.moveForward(1),O(),!0):!1}function ca(a){oa=a.target&&da.containsNode(z.getOdfCanvas().getElement(),a.target)}function U(a){var b=a.target,c=null;if("annotationRemoveButton"===b.className){a=c=da.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0];for(var b=0,c=gui.SelectionMover.createPositionIterator(z.getRootNode()),d=new core.LoopWatchDog(1E3),e=!1;c.nextPosition();)if(d.check(),e=Boolean(a.compareDocumentPosition(c.container())&
Node.DOCUMENT_POSITION_CONTAINED_BY),ea.acceptPosition(c)===h){if(e)break;b+=1}c=0;d=gui.SelectionMover.createPositionIterator(z.getRootNode());e=!1;d.setUnfilteredPosition(a,0);do{e=Boolean(a.compareDocumentPosition(d.container())&Node.DOCUMENT_POSITION_CONTAINED_BY);if(!e&&a!==d.container())break;ea.acceptPosition(d)===h&&(c+=1)}while(d.nextPosition());a=c;c=new ops.OpRemoveAnnotation;c.init({memberid:f,position:b,length:a});m.enqueue(c)}else oa&&s(a)}var V=runtime.getWindow(),z=m.getOdtDocument(),
ga=new core.Utils,da=new core.DomUtils,I=new odf.OdfUtils,ia=new gui.Clipboard,A=new gui.KeyboardHandler,na=new gui.KeyboardHandler,ja=new core.PositionFilterChain,ea=z.getPositionFilter(),oa=!1,ga=new odf.StyleNameGenerator("auto"+ga.hashString(f)+"_",z.getFormatting()),Y=null,ka=new gui.TextManipulator(m,f),ha=a&&a.directStylingEnabled?new gui.DirectTextStyler(m,f):null,ba=a&&a.directStylingEnabled?new gui.DirectParagraphStyler(m,f,ga):null;runtime.assert(null!==V,"Expected to be run in an environment which has a global window, like a browser.");
ja.addFilter("BaseFilter",ea);ja.addFilter("RootFilter",z.createRootFilter(f));this.startEditing=function(){var a;a=z.getOdfCanvas().getElement();c(a,"keydown",A.handleEvent);c(a,"keypress",na.handleEvent);c(a,"keyup",b);c(a,"beforecut",F,!0);c(a,"cut",R);c(a,"copy",G);c(a,"beforepaste",T,!0);c(a,"paste",D);c(V,"mousedown",ca);c(V,"mouseup",U);c(a,"contextmenu",n);z.subscribe(ops.OdtDocument.signalOperationExecuted,O);z.subscribe(ops.OdtDocument.signalOperationExecuted,X);a=new ops.OpAddCursor;a.init({memberid:f});
m.enqueue(a);Y&&Y.saveInitialState()};this.endEditing=function(){var a;z.unsubscribe(ops.OdtDocument.signalOperationExecuted,X);z.unsubscribe(ops.OdtDocument.signalOperationExecuted,O);a=z.getOdfCanvas().getElement();d(a,"keydown",A.handleEvent);d(a,"keypress",na.handleEvent);d(a,"keyup",b);d(a,"cut",R);d(a,"beforecut",F);d(a,"copy",G);d(a,"paste",D);d(a,"beforepaste",T);d(V,"mousedown",ca);d(V,"mouseup",U);d(a,"contextmenu",n);a=new ops.OpRemoveCursor;a.init({memberid:f});m.enqueue(a);Y&&Y.resetInitialState()};
this.getInputMemberId=function(){return f};this.getSession=function(){return m};this.setUndoManager=function(a){Y&&Y.unsubscribe(gui.UndoManager.signalUndoStackChanged,Q);if(Y=a)Y.setOdtDocument(z),Y.setPlaybackFunction(function(a){a.execute(z)}),Y.subscribe(gui.UndoManager.signalUndoStackChanged,Q)};this.getUndoManager=function(){return Y};this.getDirectTextStyler=function(){return ha};this.getDirectParagraphStyler=function(){return ba};this.getTextManipulator=function(){return ka};this.destroy=
function(a){var b=ba?ba.destroy:function(a){a()};(ha?ha.destroy:function(a){a()})(function(c){c?a(c):b(a)})};(function(){var a=-1!==V.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;A.bind(c.Tab,b.None,function(){ka.insertText("\t");return!0});A.bind(c.Left,b.None,u);A.bind(c.Right,b.None,q);A.bind(c.Up,b.None,t);A.bind(c.Down,b.None,w);A.bind(c.Backspace,b.None,ka.removeTextByBackspaceKey);A.bind(c.Delete,b.None,ka.removeTextByDeleteKey);
A.bind(c.Left,b.Shift,x);A.bind(c.Right,b.Shift,r);A.bind(c.Up,b.Shift,v);A.bind(c.Down,b.Shift,C);A.bind(c.Home,b.None,E);A.bind(c.End,b.None,K);A.bind(c.Home,b.Ctrl,ma);A.bind(c.End,b.Ctrl,M);A.bind(c.Home,b.Shift,B);A.bind(c.End,b.Shift,N);A.bind(c.Up,b.CtrlShift,H);A.bind(c.Down,b.CtrlShift,L);A.bind(c.Home,b.CtrlShift,pa);A.bind(c.End,b.CtrlShift,W);a?(A.bind(c.Clear,b.None,ka.removeCurrentSelection),A.bind(c.Left,b.Meta,E),A.bind(c.Right,b.Meta,K),A.bind(c.Home,b.Meta,ma),A.bind(c.End,b.Meta,
M),A.bind(c.Left,b.MetaShift,B),A.bind(c.Right,b.MetaShift,N),A.bind(c.Up,b.AltShift,H),A.bind(c.Down,b.AltShift,L),A.bind(c.Up,b.MetaShift,pa),A.bind(c.Down,b.MetaShift,W),A.bind(c.A,b.Meta,aa),ha&&(A.bind(c.B,b.Meta,ha.toggleBold),A.bind(c.I,b.Meta,ha.toggleItalic),A.bind(c.U,b.Meta,ha.toggleUnderline)),ba&&(A.bind(c.L,b.MetaShift,ba.alignParagraphLeft),A.bind(c.E,b.MetaShift,ba.alignParagraphCenter),A.bind(c.R,b.MetaShift,ba.alignParagraphRight),A.bind(c.J,b.MetaShift,ba.alignParagraphJustified)),
A.bind(c.Z,b.Meta,P),A.bind(c.Z,b.MetaShift,$)):(A.bind(c.A,b.Ctrl,aa),ha&&(A.bind(c.B,b.Ctrl,ha.toggleBold),A.bind(c.I,b.Ctrl,ha.toggleItalic),A.bind(c.U,b.Ctrl,ha.toggleUnderline)),ba&&(A.bind(c.L,b.CtrlShift,ba.alignParagraphLeft),A.bind(c.E,b.CtrlShift,ba.alignParagraphCenter),A.bind(c.R,b.CtrlShift,ba.alignParagraphRight),A.bind(c.J,b.CtrlShift,ba.alignParagraphJustified)),A.bind(c.Z,b.Ctrl,P),A.bind(c.Z,b.CtrlShift,$));na.setDefault(function(a){var b;b=null===a.which?String.fromCharCode(a.keyCode):
0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(ka.insertText(b),!0)});na.bind(c.Enter,b.None,ka.enqueueParagraphSplittingOps)})()};return gui.SessionController}();
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
ops.MemberModel=function(){};ops.MemberModel.prototype.getMemberDetailsAndUpdates=function(h,m){};ops.MemberModel.prototype.unsubscribeMemberDetailsUpdates=function(h,m){};ops.MemberModel.prototype.close=function(h){};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
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
ops.TrivialMemberModel=function(){this.getMemberDetailsAndUpdates=function(h,m){m(h,{memberid:h,fullname:"Unknown",color:"black",imageurl:"avatar-joe.png"})};this.unsubscribeMemberDetailsUpdates=function(h,m){};this.close=function(h){h()}};
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(h){};ops.OperationRouter.prototype.setPlaybackFunction=function(h){};ops.OperationRouter.prototype.push=function(h){};ops.OperationRouter.prototype.close=function(h){};ops.OperationRouter.prototype.getHasLocalUnsyncedOpsAndUpdates=function(h){};ops.OperationRouter.prototype.unsubscribeHasLocalUnsyncedOpsUpdates=function(h){};
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
ops.TrivialOperationRouter=function(){var h,m;this.setOperationFactory=function(f){h=f};this.setPlaybackFunction=function(f){m=f};this.push=function(f){f=f.spec();f.timestamp=(new Date).getTime();f=h.create(f);m(f)};this.close=function(f){f()};this.getHasLocalUnsyncedOpsAndUpdates=function(f){f(!0)};this.unsubscribeHasLocalUnsyncedOpsUpdates=function(f){}};
// Input 73
gui.EditInfoHandle=function(h){var m=[],f,a=h.ownerDocument,c=a.documentElement.namespaceURI;this.setEdits=function(d){m=d;var b,k,h,e;f.innerHTML="";for(d=0;d<m.length;d+=1)b=a.createElementNS(c,"div"),b.className="editInfo",k=a.createElementNS(c,"span"),k.className="editInfoColor",k.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[d].memberid),h=a.createElementNS(c,"span"),h.className="editInfoAuthor",h.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[d].memberid),
e=a.createElementNS(c,"span"),e.className="editInfoTime",e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[d].memberid),e.innerHTML=m[d].time,b.appendChild(k),b.appendChild(h),b.appendChild(e),f.appendChild(b)};this.show=function(){f.style.display="block"};this.hide=function(){f.style.display="none"};this.destroy=function(a){h.removeChild(f);a()};f=a.createElementNS(c,"div");f.setAttribute("class","editInfoHandle");f.style.display="none";h.appendChild(f)};
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
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(h,m){function f(a,c){return runtime.getWindow().setTimeout(function(){b.style.opacity=a},c)}var a=this,c,d,b,k,p;this.addEdit=function(a,c){var m=Date.now()-c;h.addEdit(a,c);d.setEdits(h.getSortedEdits());b.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);if(k){var g=k;runtime.getWindow().clearTimeout(g)}p&&(g=p,runtime.getWindow().clearTimeout(g));1E4>m?(f(1,0),k=f(0.5,1E4-m),p=f(0.2,2E4-m)):1E4<=m&&2E4>m?(f(0.5,0),p=f(0.2,2E4-m)):f(0.2,0)};this.getEdits=
function(){return h.getEdits()};this.clearEdits=function(){h.clearEdits();d.setEdits([]);b.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&b.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return h};this.show=function(){b.style.display="block"};this.hide=function(){a.hideHandle();b.style.display="none"};this.showHandle=function(){d.show()};this.hideHandle=function(){d.hide()};this.destroy=function(a){c.removeChild(b);d.destroy(function(b){b?
a(b):h.destroy(a)})};(function(){var e=h.getOdtDocument().getDOM();b=e.createElementNS(e.documentElement.namespaceURI,"div");b.setAttribute("class","editInfoMarker");b.onmouseover=function(){a.showHandle()};b.onmouseout=function(){a.hideHandle()};c=h.getNode();c.appendChild(b);d=new gui.EditInfoHandle(c);m||a.hide()})()};
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
runtime.loadClass("gui.Caret");runtime.loadClass("ops.TrivialMemberModel");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
gui.SessionView=function(){return function(h,m,f){function a(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid^="'+a+'"]'+e+c;a:{var g=s.firstChild;for(b=b+'[editinfo|memberid^="'+a+'"]'+e;g;){if(g.nodeType===Node.TEXT_NODE&&0===g.data.indexOf(b)){b=g;break a}g=g.nextSibling}b=null}b?b.data=c:s.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","")}function c(a){var b,c;for(c in g)g.hasOwnProperty(c)&&(b=g[c],a?b.show():b.hide())}function d(a){f.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function b(b,c){var d=f.getCaret(b);c?(d&&(d.setAvatarImageUrl(c.imageurl),d.setColor(c.color)),a(b,c.fullname,c.color)):runtime.log('MemberModel sent undefined data for member "'+b+'".')}function k(a){var c=a.getMemberId(),
d=m.getMemberModel();f.registerCursor(a,u,q);b(c,null);d.getMemberDetailsAndUpdates(c,b);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function p(a){var c=!1,d;for(d in g)if(g.hasOwnProperty(d)&&g[d].getEditInfo().getEdits().hasOwnProperty(a)){c=!0;break}c||m.getMemberModel().unsubscribeMemberDetailsUpdates(a,b)}function e(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",f=b.getElementsByTagNameNS(n,"editinfo")[0];f?(e=f.getAttributeNS(n,"id"),d=g[e]):
(e=Math.random().toString(),d=new ops.EditInfo(b,m.getOdtDocument()),d=new gui.EditInfoMarker(d,l),f=b.getElementsByTagNameNS(n,"editinfo")[0],f.setAttributeNS(n,"id",e),g[e]=d);d.addEdit(c,new Date(a))}var s,n="urn:webodf:names:editinfo",g={},l=void 0!==h.editInfoMarkersInitiallyVisible?Boolean(h.editInfoMarkersInitiallyVisible):!0,u=void 0!==h.caretAvatarsInitiallyVisible?Boolean(h.caretAvatarsInitiallyVisible):!0,q=void 0!==h.caretBlinksOnRangeSelect?Boolean(h.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=
function(){l||(l=!0,c(l))};this.hideEditInfoMarkers=function(){l&&(l=!1,c(l))};this.showCaretAvatars=function(){u||(u=!0,d(u))};this.hideCaretAvatars=function(){u&&(u=!1,d(u))};this.getSession=function(){return m};this.getCaret=function(a){return f.getCaret(a)};this.destroy=function(a){var c=m.getOdtDocument(),d=m.getMemberModel(),h=Object.keys(g).map(function(a){return g[a]});c.unsubscribe(ops.OdtDocument.signalCursorAdded,k);c.unsubscribe(ops.OdtDocument.signalCursorRemoved,p);c.unsubscribe(ops.OdtDocument.signalParagraphChanged,
e);f.getCarets().forEach(function(a){d.unsubscribeMemberDetailsUpdates(a.getCursor().getMemberId(),b)});s.parentNode.removeChild(s);(function v(b,c){c?a(c):b<h.length?h[b].destroy(function(a){v(b+1,a)}):a()})(0,void 0)};(function(){var a=m.getOdtDocument(),b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,k);a.subscribe(ops.OdtDocument.signalCursorRemoved,p);a.subscribe(ops.OdtDocument.signalParagraphChanged,e);s=document.createElementNS(b.namespaceURI,"style");
s.type="text/css";s.media="screen, print, handheld, projection";s.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));s.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(s)})()}}();
// Input 76
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
gui.CaretManager=function(h){function m(a){return n.hasOwnProperty(a)?n[a]:null}function f(){return Object.keys(n).map(function(a){return n[a]})}function a(){return h.getSession().getOdtDocument().getOdfCanvas().getElement()}function c(b){b===h.getInputMemberId()&&a().removeAttribute("tabindex");delete n[b]}function d(a){a=a.getMemberId();a===h.getInputMemberId()&&(a=m(a))&&a.refreshCursorBlinking()}function b(a){a.memberId===h.getInputMemberId()&&(a=m(a.memberId))&&a.ensureVisible()}function k(){var a=
m(h.getInputMemberId());a&&a.setFocus()}function p(){var a=m(h.getInputMemberId());a&&a.removeFocus()}function e(){var a=m(h.getInputMemberId());a&&a.show()}function s(){var a=m(h.getInputMemberId());a&&a.hide()}var n={},g=runtime.getWindow();this.registerCursor=function(b,c,d){var e=b.getMemberId(),g=a();c=new gui.Caret(b,c,d);n[e]=c;e===h.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+e),b.handleUpdate=c.ensureVisible,g.setAttribute("tabindex",0),g.focus());return c};
this.getCaret=m;this.getCarets=f;this.destroy=function(l){var m=h.getSession().getOdtDocument(),q=a(),n=f();m.unsubscribe(ops.OdtDocument.signalParagraphChanged,b);m.unsubscribe(ops.OdtDocument.signalCursorMoved,d);m.unsubscribe(ops.OdtDocument.signalCursorRemoved,c);q.removeEventListener("focus",k,!1);q.removeEventListener("blur",p,!1);g.removeEventListener("focus",e,!1);g.removeEventListener("blur",s,!1);(function y(a,b){b?l(b):a<n.length?n[a].destroy(function(b){y(a+1,b)}):l()})(0,void 0)};(function(){var f=
h.getSession().getOdtDocument(),m=a();f.subscribe(ops.OdtDocument.signalParagraphChanged,b);f.subscribe(ops.OdtDocument.signalCursorMoved,d);f.subscribe(ops.OdtDocument.signalCursorRemoved,c);m.addEventListener("focus",k,!1);m.addEventListener("blur",p,!1);g.addEventListener("focus",e,!1);g.addEventListener("blur",s,!1)})()};
// Input 77
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var h=new xmldom.XPath,m=runtime.getWindow();return function(f){var a=this;a.setInitialSlideMode=function(){a.startSlideMode("single")};a.keyDownHandler=function(c){if(!c.target.isContentEditable&&"input"!==c.target.nodeName)switch(c.keyCode){case 84:a.toggleToolbar();break;case 37:case 8:a.prevSlide();break;case 39:case 32:a.nextSlide();break;case 36:a.firstSlide();break;case 35:a.lastSlide()}};a.root=function(){return a.odf_canvas.odfContainer().rootElement};a.firstSlide=
function(){a.slideChange(function(a,d){return 0})};a.lastSlide=function(){a.slideChange(function(a,d){return d-1})};a.nextSlide=function(){a.slideChange(function(a,d){return a+1<d?a+1:-1})};a.prevSlide=function(){a.slideChange(function(a,d){return 1>a?-1:a-1})};a.slideChange=function(c){var d=a.getPages(a.odf_canvas.odfContainer().rootElement),b=-1,f=0;d.forEach(function(a){a=a[1];a.hasAttribute("slide_current")&&(b=f,a.removeAttribute("slide_current"));f+=1});c=c(b,d.length);-1===c&&(c=b);d[c][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=c;"cont"===a.slide_mode&&m.scrollBy(0,d[c][1].getBoundingClientRect().top-30)};a.selectSlide=function(c){a.slideChange(function(a,b){return c>=b||0>c?-1:c})};a.scrollIntoContView=function(c){var d=a.getPages(a.odf_canvas.odfContainer().rootElement);0!==d.length&&m.scrollBy(0,d[c][1].getBoundingClientRect().top-30)};a.getPages=function(a){a=a.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var d=[],b;for(b=0;b<a.length;b+=1)d.push([a[b].getAttribute("draw:name"),
a[b]]);return d};a.fillPageList=function(c,d){for(var b=a.getPages(c),f,m,e;d.firstChild;)d.removeChild(d.firstChild);for(f=0;f<b.length;f+=1)m=document.createElement("option"),e=h.getODFElementsWithXPath(b[f][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),e=0<e.length?e[0].textContent:b[f][0],m.textContent=f+1+": "+e,d.appendChild(m)};a.startSlideMode=function(c){var d=document.getElementById("pagelist"),b=a.odf_canvas.slidevisibilitycss().sheet;for(a.slide_mode=
c;0<b.cssRules.length;)b.deleteRule(0);a.selectSlide(0);"single"===a.slide_mode?(b.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),b.insertRule("draw|page[slide_current]  { z-index:2;}",1),b.insertRule("draw|page  { -webkit-transform: scale(1);}",2),a.fitToWindow(),m.addEventListener("resize",a.fitToWindow,!1)):"cont"===a.slide_mode&&m.removeEventListener("resize",a.fitToWindow,!1);a.fillPageList(a.odf_canvas.odfContainer().rootElement,d)};a.toggleToolbar=function(){var c,
d,b;c=a.odf_canvas.slidevisibilitycss().sheet;d=-1;for(b=0;b<c.cssRules.length;b+=1)if(".toolbar"===c.cssRules[b].cssText.substring(0,8)){d=b;break}-1<d?c.deleteRule(d):c.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};a.fitToWindow=function(){var c=a.getPages(a.root()),d=(m.innerHeight-40)/c[0][1].clientHeight,c=(m.innerWidth-10)/c[0][1].clientWidth,d=d<c?d:c,c=a.odf_canvas.slidevisibilitycss().sheet;c.deleteRule(2);c.insertRule("draw|page { \n-moz-transform: scale("+
d+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+d+"); -o-transform-origin: 0% 0%; -o-transform: scale("+d+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+d+"); }",2)};a.load=function(c){a.odf_canvas.load(c)};a.odf_element=f;a.odf_canvas=new odf.OdfCanvas(a.odf_element);a.odf_canvas.addListener("statereadychange",a.setInitialSlideMode);a.slide_mode="undefined";document.addEventListener("keydown",a.keyDownHandler,!1)}}();
// Input 78
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(h,m){function f(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function a(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function c(){var a=h.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!u)||(a=a.getRangeAt(0),u.setPoint(a.startContainer,a.startOffset))}function d(){var a=h.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();u&&u.node()&&(b=u.node(),c=b.ownerDocument.createRange(),
c.setStart(b,u.position()),c.collapse(!0),a.addRange(c))}function b(b){var e=b.charCode||b.keyCode;if(u=null,u&&37===e)c(),u.stepBackward(),d();else if(16<=e&&20>=e||33<=e&&40>=e)return;a(b)}function k(b){a(b)}function p(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&p(b),b=b.nextSibling||b.parentNode;var c,d,e,b=a.attributes;c="";for(e=b.length-1;0<=e;e-=1)d=b.item(e),c=c+" "+d.nodeName+'="'+d.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(d=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&d.test(c.nodeValue)&&c.parentNode.removeChild(c)}function e(a,b){for(var c=a.firstChild,d,f,g;c&&c!==a;){if(c.nodeType===Node.ELEMENT_NODE)for(e(c,b),d=c.attributes,g=d.length-1;0<=g;g-=1)f=d.item(g),"http://www.w3.org/2000/xmlns/"!==f.namespaceURI||b[f.nodeValue]||(b[f.nodeValue]=f.localName);c=c.nextSibling||c.parentNode}}function s(){var a=h.ownerDocument.createElement("style"),b;b={};e(h,b);
var c={},d,f,g=0;for(d in b)if(b.hasOwnProperty(d)&&d){f=b[d];if(!f||c.hasOwnProperty(f)||"xmlns"===f){do f="ns"+g,g+=1;while(c.hasOwnProperty(f));b[d]=f}c[f]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+n;a.appendChild(h.ownerDocument.createTextNode(b));m=m.parentNode.replaceChild(a,m)}var n,g,l,u=null;h.id||(h.id="xml"+String(Math.random()).substring(2));g="#"+h.id+" ";n=g+"*,"+g+":visited, "+g+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
g+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+g+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+g+"{overflow: auto;}\n";(function(c){f(c,"click",k);f(c,"keydown",b);f(c,"drop",a);f(c,"dragend",a);f(c,"beforepaste",a);f(c,"paste",a)})(h);this.updateCSS=s;this.setXML=function(a){a=a.documentElement||a;l=a=h.ownerDocument.importNode(a,!0);for(p(a);h.lastChild;)h.removeChild(h.lastChild);h.appendChild(a);s();u=new core.PositionIterator(a)};this.getXML=
function(){return l}};
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(h,m){};gui.UndoManager.prototype.unsubscribe=function(h,m){};gui.UndoManager.prototype.setOdtDocument=function(h){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(h){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(h){};gui.UndoManager.prototype.moveBackward=function(h){};gui.UndoManager.prototype.onOperationExecuted=function(h){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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
gui.UndoStateRules=function(){function h(f){return f.spec().optype}function m(f){switch(h(f)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=h;this.isEditOperation=m;this.isPartOfOperationSet=function(f,a){if(m(f)){if(0===a.length)return!0;var c;if(c=m(a[a.length-1]))a:{c=a.filter(m);var d=h(f),b;b:switch(d){case "RemoveText":case "InsertText":b=!0;break b;default:b=!1}if(b&&d===h(c[0])){if(1===c.length){c=!0;break a}d=c[c.length-2].spec().position;
c=c[c.length-1].spec().position;b=f.spec().position;if(c===b-(c-d)){c=!0;break a}}c=!1}return c}return!0}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.UndoManager");runtime.loadClass("gui.UndoStateRules");
gui.TrivialUndoManager=function(h){function m(){q.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:b.hasUndoStates(),redoAvailable:b.hasRedoStates()})}function f(){g!==e&&g!==l[l.length-1]&&l.push(g)}function a(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);k.normalizeTextNodes(b)}function c(a){return Object.keys(a).map(function(b){return a[b]})}function d(a){function b(a){var c=a.spec();if(f[c.memberid])switch(c.optype){case "AddCursor":d[c.memberid]||(d[c.memberid]=
a,delete f[c.memberid],g-=1);break;case "MoveCursor":e[c.memberid]||(e[c.memberid]=a)}}var d={},e={},f={},g,k=a.pop();n.getCursors().forEach(function(a){f[a.getMemberId()]=!0});for(g=Object.keys(f).length;k&&0<g;)k.reverse(),k.forEach(b),k=a.pop();return c(d).concat(c(e))}var b=this,k=new core.DomUtils,p,e=[],s,n,g=[],l=[],u=[],q=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
x=h||new gui.UndoStateRules;this.subscribe=function(a,b){q.subscribe(a,b)};this.unsubscribe=function(a,b){q.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<l.length};this.hasRedoStates=function(){return 0<u.length};this.setOdtDocument=function(a){n=a};this.resetInitialState=function(){l.length=0;u.length=0;e.length=0;g.length=0;p=null;m()};this.saveInitialState=function(){var b=n.getOdfCanvas().odfContainer(),c=n.getOdfCanvas().getAnnotationManager();c&&c.forgetAnnotations();p=b.rootElement.cloneNode(!0);
n.getOdfCanvas().refreshAnnotations();b=p;k.getElementsByTagNameNS(b,"urn:webodf:names:cursor","cursor").forEach(a);k.getElementsByTagNameNS(b,"urn:webodf:names:cursor","anchor").forEach(a);f();l.unshift(e);g=e=d(l);l.length=0;u.length=0;m()};this.setPlaybackFunction=function(a){s=a};this.onOperationExecuted=function(a){u.length=0;x.isEditOperation(a)&&g===e||!x.isPartOfOperationSet(a,g)?(f(),g=[a],l.push(g),q.emit(gui.UndoManager.signalUndoStateCreated,{operations:g}),m()):(g.push(a),q.emit(gui.UndoManager.signalUndoStateModified,
{operations:g}))};this.moveForward=function(a){for(var b=0,c;a&&u.length;)c=u.pop(),l.push(c),c.forEach(s),a-=1,b+=1;b&&(g=l[l.length-1],m());return b};this.moveBackward=function(a){for(var b=n.getOdfCanvas(),c=b.odfContainer(),d=0;a&&l.length;)u.push(l.pop()),a-=1,d+=1;d&&(c.setRootElement(p.cloneNode(!0)),b.setOdfContainer(c,!0),q.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),n.getCursors().forEach(function(a){n.removeCursor(a.getMemberId())}),e.forEach(s),l.forEach(function(a){a.forEach(s)}),
b.refreshCSS(),g=l[l.length-1]||e,m());return d}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("gui.SelectionMover");runtime.loadClass("gui.StyleHelper");runtime.loadClass("core.PositionFilterChain");
ops.OdtDocument=function(h){function m(){var a=h.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function f(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var d=s[a].getNode();return b(c)===b(d)?g:l}}function a(a){var b=
gui.SelectionMover.createPositionIterator(m());for(a+=1;0<a&&b.nextPosition();)u.acceptPosition(b)===g&&(a-=1);return b}function c(a){return p.getParagraphElement(a)}function d(a,b){return h.getFormatting().getStyleElement(a,b)}function b(a){return d(a,"paragraph")}var k=this,p,e,s={},n=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonStyleCreated,
ops.OdtDocument.signalCommonStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),g=core.PositionFilter.FilterResult.FILTER_ACCEPT,l=core.PositionFilter.FilterResult.FILTER_REJECT,u;this.getIteratorAtPosition=a;this.getStyleElement=d;this.upgradeWhitespacesAtPosition=function(b){b=a(b);var c,d,e;b.previousPosition();b.previousPosition();for(e=-1;1>=e;e+=1){c=b.container();d=b.unfilteredDomOffset();if(c.nodeType===Node.TEXT_NODE&&
" "===c.data[d]&&p.isSignificantWhitespace(c,d)){runtime.assert(" "===c.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=c.ownerDocument.createElementNS(odf.Namespaces.textns,"text:s");f.appendChild(c.ownerDocument.createTextNode(" "));c.deleteData(d,1);0<d&&(c=c.splitText(d));c.parentNode.insertBefore(f,c);c=f;b.moveToEndOfNode(c)}b.nextPosition()}};this.downgradeWhitespacesAtPosition=function(b){var c=a(b),d;b=c.container();for(c=c.unfilteredDomOffset();!p.isCharacterElement(b)&&
b.childNodes[c];)b=b.childNodes[c],c=0;b.nodeType===Node.TEXT_NODE&&(b=b.parentNode);p.isDowngradableSpaceElement(b)&&(c=b.firstChild,d=b.lastChild,e.mergeIntoParent(b),d!==c&&e.normalizeTextNodes(d),e.normalizeTextNodes(c))};this.getParagraphStyleElement=b;this.getParagraphElement=c;this.getParagraphStyleAttributes=function(a){return(a=b(a))?h.getFormatting().getInheritedStyleAttributes(a):null};this.getPositionInTextNode=function(a,b){var c=gui.SelectionMover.createPositionIterator(m()),d=null,
e,f=0,h=null,h=a;runtime.assert(0<=a,"position must be >= 0");u.acceptPosition(c)===g?(e=c.container(),e.nodeType===Node.TEXT_NODE&&(d=e,f=0)):a+=1;for(;0<a||null===d;){if(!c.nextPosition())return null;if(u.acceptPosition(c)===g)if(a-=1,e=c.container(),e.nodeType===Node.TEXT_NODE)e!==d?(d=e,f=c.unfilteredDomOffset()):f+=1;else if(null!==d){if(0===a){f=d.length;break}d=null}else if(0===a){d=m().ownerDocument.createTextNode("");e.insertBefore(d,c.rightNode());f=0;break}}if(null===d)return null;if(b&&
s[b]&&k.getCursorPosition(b)===h){for(h=s[b].getNode();0===f&&h.nextSibling&&"cursor"===h.nextSibling.localName;)h.parentNode.insertBefore(h,h.nextSibling.nextSibling);0<d.length&&(d=m().ownerDocument.createTextNode(""),f=0,h.parentNode.insertBefore(d,h.nextSibling));for(;0===f&&(d.previousSibling&&"cursor"===d.previousSibling.localName)&&(e=d.previousSibling,0<d.length&&(d=m().ownerDocument.createTextNode("")),e.parentNode.insertBefore(d,e),h!==e););}for(;d.previousSibling&&d.previousSibling.nodeType===
Node.TEXT_NODE;)d.previousSibling.appendData(d.data),f=d.previousSibling.length,d=d.previousSibling,d.parentNode.removeChild(d.nextSibling);return{textNode:d,offset:f}};this.fixCursorPositions=function(a){var b,c,d,e=new core.PositionFilterChain;e.addFilter("BaseFilter",k.getPositionFilter());for(b in s)s.hasOwnProperty(b)&&(e.addFilter("RootFilter",k.createRootFilter(b)),c=s[b],d=c.getStepCounter(),d.isPositionWalkable(e)?0===k.getCursorSelection(b).length&&c.move(0):(d=d.countStepsToValidPosition(e),
c.move(d),b===a&&k.emit(ops.OdtDocument.signalCursorMoved,c)),e.removeFilter("RootFilter"))};this.getWalkableParagraphLength=function(b){var d=a(0),e=0;d.setUnfilteredPosition(b,0);do{if(c(d.container())!==b)break;u.acceptPosition(d)===g&&(e+=1)}while(d.nextPosition());return e};this.getDistanceFromCursor=function(a,b,c){a=s[a];var d=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,d=a(b,c,u));return d};this.getCursorPosition=
function(a){return-k.getDistanceFromCursor(a,m(),0)};this.getCursorSelection=function(a){var b;a=s[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(m(),0,u),b=b(a.getAnchorNode(),0,u));return{position:c+b,length:-b}};this.getPositionFilter=function(){return u};this.getOdfCanvas=function(){return h};this.getRootNode=m;this.getDOM=function(){return m().ownerDocument};this.getCursor=function(a){return s[a]};this.getCursors=function(){var a=[],b;for(b in s)s.hasOwnProperty(b)&&a.push(s[b]);
return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countForwardSteps(1,u),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!s[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);a.move(b);s[c]=a};this.removeCursor=function(a){var b=s[a];return b?(b.removeFromOdtDocument(),delete s[a],k.emit(ops.OdtDocument.signalCursorRemoved,a),!0):!1};
this.getMetaData=function(a){for(var b=h.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return h.getFormatting()};this.getTextElements=function(a,b){return p.getTextElements(a,b)};this.getParagraphElements=function(a){return p.getParagraphElements(a)};this.emit=function(a,b){n.emit(a,b)};
this.subscribe=function(a,b){n.subscribe(a,b)};this.unsubscribe=function(a,b){n.unsubscribe(a,b)};this.createRootFilter=function(a){return new f(a)};this.close=function(a){a()};this.destroy=function(a){a()};u=new function(){function a(b,c,d){var e,f;if(c&&(e=p.lookLeftForCharacter(c),1===e||2===e&&(p.scanRightForAnyCharacter(d)||p.scanRightForAnyCharacter(p.nextNode(b)))))return g;e=null===c&&p.isParagraph(b);f=p.lookRightForCharacter(d);if(e)return f?g:p.scanRightForAnyCharacter(d)?l:g;if(!f)return l;
c=c||p.previousNode(b);return p.scanLeftForAnyCharacter(c)?l:g}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,e,f,h;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return l;if(d===Node.TEXT_NODE){if(!p.isGroupingElement(c.parentNode)||p.isWithinTrackedChanges(c.parentNode,m()))return l;d=b.unfilteredDomOffset();e=c.data;runtime.assert(d!==e.length,"Unexpected offset.");if(0<d){b=e.substr(d-1,1);if(!p.isODFWhitespace(b))return g;if(1<d)if(b=e.substr(d-2,1),!p.isODFWhitespace(b))f=g;
else{if(!p.isODFWhitespace(e.substr(0,d)))return l}else h=p.previousNode(c),p.scanLeftForNonWhitespace(h)&&(f=g);if(f===g)return p.isTrailingWhitespace(c,d)?l:g;f=e.substr(d,1);return p.isODFWhitespace(f)?l:p.scanLeftForAnyCharacter(p.previousNode(c))?l:g}h=b.leftNode();f=c;c=c.parentNode;f=a(c,h,f)}else!p.isGroupingElement(c)||p.isWithinTrackedChanges(c,m())?f=l:(h=b.leftNode(),f=b.rightNode(),f=a(c,h,f));return f}};p=new odf.OdfUtils;e=new core.DomUtils};ops.OdtDocument.signalCursorAdded="cursor/added";
ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalCommonStyleCreated="style/created";ops.OdtDocument.signalCommonStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";
(function(){return ops.OdtDocument})();
// Input 83
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
ops.Session=function(h){var m=new ops.OperationFactory,f=new ops.OdtDocument(h),a=new ops.TrivialMemberModel,c=null;this.setMemberModel=function(c){a=c};this.setOperationFactory=function(a){m=a;c&&c.setOperationFactory(m)};this.setOperationRouter=function(a){c=a;a.setPlaybackFunction(function(a){a.execute(f);f.emit(ops.OdtDocument.signalOperationExecuted,a)});a.setOperationFactory(m)};this.getMemberModel=function(){return a};this.getOperationFactory=function(){return m};this.getOdtDocument=function(){return f};
this.enqueue=function(a){c.push(a)};this.close=function(d){c.close(function(b){b?d(b):a.close(function(a){a?d(a):f.close(d)})})};this.destroy=function(a){f.destroy(a)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 84
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\noffice|text * draw|text-box {\n    /** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
