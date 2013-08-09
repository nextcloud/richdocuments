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
function Runtime(){}Runtime.ByteArray=function(k){};Runtime.prototype.getVariable=function(k){};Runtime.prototype.toJson=function(k){};Runtime.prototype.fromJson=function(k){};Runtime.ByteArray.prototype.slice=function(k,l){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(k){};Runtime.prototype.byteArrayFromString=function(k,l){};Runtime.prototype.byteArrayToString=function(k,l){};Runtime.prototype.concatByteArrays=function(k,l){};
Runtime.prototype.read=function(k,l,n,c){};Runtime.prototype.readFile=function(k,l,n){};Runtime.prototype.readFileSync=function(k,l){};Runtime.prototype.loadXML=function(k,l){};Runtime.prototype.writeFile=function(k,l,n){};Runtime.prototype.isFile=function(k,l){};Runtime.prototype.getFileSize=function(k,l){};Runtime.prototype.deleteFile=function(k,l){};Runtime.prototype.log=function(k,l){};Runtime.prototype.setTimeout=function(k,l){};Runtime.prototype.clearTimeout=function(k){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(k){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(k,l,n){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(k,l){function n(b){var a="",g,e=b.length;for(g=0;g<e;g+=1)a+=String.fromCharCode(b[g]&255);return a}function c(b){var a="",g,e=b.length,d,c,f,s;for(g=0;g<e;g+=1)d=b[g],128>d?a+=String.fromCharCode(d):(g+=1,c=b[g],194<=d&&224>d?a+=String.fromCharCode((d&31)<<6|c&63):(g+=1,f=b[g],224<=d&&240>d?a+=String.fromCharCode((d&15)<<12|(c&63)<<6|f&63):(g+=1,s=b[g],240<=d&&245>d&&(d=(d&7)<<18|(c&63)<<12|(f&63)<<6|s&63,d-=65536,a+=String.fromCharCode((d>>10)+55296,(d&1023)+56320)))));
return a}var b;"utf8"===l?b=c(k):("binary"!==l&&this.log("Unsupported encoding: "+l),b=n(k));return b};Runtime.getVariable=function(k){try{return eval(k)}catch(l){}};Runtime.toJson=function(k){return JSON.stringify(k)};Runtime.fromJson=function(k){return JSON.parse(k)};Runtime.getFunctionName=function(k){return void 0===k.name?(k=/function\s+(\w+)/.exec(k))&&k[1]:k.name};
function BrowserRuntime(k){function l(a,g){var e,d,b;void 0!==g?b=a:g=a;k?(d=k.ownerDocument,b&&(e=d.createElement("span"),e.className=b,e.appendChild(d.createTextNode(b)),k.appendChild(e),k.appendChild(d.createTextNode(" "))),e=d.createElement("span"),0<g.length&&"<"===g[0]?e.innerHTML=g:e.appendChild(d.createTextNode(g)),k.appendChild(e),k.appendChild(d.createElement("br"))):console&&console.log(g);"alert"===b&&alert(g)}function n(a,g,e){function d(){var d;4===t.readyState&&(0!==t.status||t.responseText?
200===t.status||0===t.status?(d="binary"===g?null!==t.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(t.responseBody)).toArray():c.byteArrayFromString(t.responseText,"binary"):t.responseText,b[a]=d,e(null,d)):e(t.responseText||t.statusText):e("File "+a+" is empty."))}if(b.hasOwnProperty(a))e(null,b[a]);else{var t=new XMLHttpRequest;t.open("GET",a,!0);t.onreadystatechange=d;t.overrideMimeType&&("binary"!==g?t.overrideMimeType("text/plain; charset="+g):t.overrideMimeType("text/plain; charset=x-user-defined"));
try{t.send(null)}catch(f){e(f.message)}}}var c=this,b={},h=window.ArrayBuffer&&window.Uint8Array;h&&(Uint8Array.prototype.slice=function(a,g){void 0===g&&(void 0===a&&(a=0),g=this.length);var e=this.subarray(a,g),d,b;g-=a;d=new Uint8Array(new ArrayBuffer(g));for(b=0;b<g;b+=1)d[b]=e[b];return d});this.ByteArray=h?function(a){return new Uint8Array(new ArrayBuffer(a))}:function(a){var g=[];g.length=a;return g};this.concatByteArrays=h?function(a,g){var e,d=a.length,b=g.length,f=new this.ByteArray(d+b);
for(e=0;e<d;e+=1)f[e]=a[e];for(e=0;e<b;e+=1)f[e+d]=g[e];return f}:function(a,g){return a.concat(g)};this.byteArrayFromArray=function(a){return a.slice()};this.byteArrayFromString=function(a,g){var e;if("utf8"===g){e=a.length;var d,b,f,s=0;for(b=0;b<e;b+=1)f=a.charCodeAt(b),s+=1+(128<f)+(2048<f);d=new c.ByteArray(s);for(b=s=0;b<e;b+=1)f=a.charCodeAt(b),128>f?(d[s]=f,s+=1):2048>f?(d[s]=192|f>>>6,d[s+1]=128|f&63,s+=2):(d[s]=224|f>>>12&15,d[s+1]=128|f>>>6&63,d[s+2]=128|f&63,s+=3)}else for("binary"!==
g&&c.log("unknown encoding: "+g),e=a.length,d=new c.ByteArray(e),b=0;b<e;b+=1)d[b]=a.charCodeAt(b)&255;return e=d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=n;this.read=function(a,g,e,d){function h(){var m;4===f.readyState&&(0!==f.status||f.responseText?200===f.status||0===f.status?(f.response?(m=f.response,m=new Uint8Array(m)):m=null!==f.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(f.responseBody)).toArray():c.byteArrayFromString(f.responseText,"binary"),b[a]=m,d(null,m.slice(g,g+e))):d(f.responseText||f.statusText):d("File "+a+" is empty."))}if(b.hasOwnProperty(a))d(null,b[a].slice(g,g+e));else{var f=new XMLHttpRequest;f.open("GET",a,!0);f.onreadystatechange=h;f.overrideMimeType&&f.overrideMimeType("text/plain; charset=x-user-defined");f.responseType="arraybuffer";try{f.send(null)}catch(s){d(s.message)}}};this.readFileSync=function(a,g){var e=new XMLHttpRequest,
d;e.open("GET",a,!1);e.overrideMimeType&&("binary"!==g?e.overrideMimeType("text/plain; charset="+g):e.overrideMimeType("text/plain; charset=x-user-defined"));try{if(e.send(null),200===e.status||0===e.status)d=e.responseText}catch(b){}return d};this.writeFile=function(a,g,e){b[a]=g;var d=new XMLHttpRequest;d.open("PUT",a,!0);d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200<=d.status&&300>d.status||0===d.status?e(null):e("Status "+String(d.status)+": "+d.responseText||
d.statusText):e("File "+a+" is empty."))};g=g.buffer&&!d.sendAsBinary?g.buffer:c.byteArrayToString(g,"binary");try{d.sendAsBinary?d.sendAsBinary(g):d.send(g)}catch(h){c.log("HUH? "+h+" "+g),e(h.message)}};this.deleteFile=function(a,g){delete b[a];var e=new XMLHttpRequest;e.open("DELETE",a,!0);e.onreadystatechange=function(){4===e.readyState&&(200>e.status&&300<=e.status?g(e.responseText):g(null))};e.send(null)};this.loadXML=function(a,g){var e=new XMLHttpRequest;e.open("GET",a,!0);e.overrideMimeType&&
e.overrideMimeType("text/xml");e.onreadystatechange=function(){4===e.readyState&&(0!==e.status||e.responseText?200===e.status||0===e.status?g(null,e.responseXML):g(e.responseText):g("File "+a+" is empty."))};try{e.send(null)}catch(d){g(d.message)}};this.isFile=function(a,g){c.getFileSize(a,function(a){g(-1!==a)})};this.getFileSize=function(a,g){var e=new XMLHttpRequest;e.open("HEAD",a,!0);e.onreadystatechange=function(){if(4===e.readyState){var d=e.getResponseHeader("Content-Length");d?g(parseInt(d,
10)):n(a,"binary",function(d,a){d?g(-1):g(a.length)})}};e.send(null)};this.log=l;this.assert=function(a,g,e){if(!a)throw l("alert","ASSERTION FAILED:\n"+g),e&&e(),g;};this.setTimeout=function(a,g){return setTimeout(function(){a()},g)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){l("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function k(a,e,d){a=c.resolve(b,a);"binary"!==e?n.readFile(a,e,d):n.readFile(a,null,d)}var l=this,n=require("fs"),c=require("path"),b="",h,a;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var e=new Buffer(a.length),d,b=a.length;for(d=0;d<b;d+=1)e[d]=a[d];return e};this.concatByteArrays=function(a,e){var d=new Buffer(a.length+e.length);a.copy(d,0,0);e.copy(d,a.length,0);return d};this.byteArrayFromString=function(a,e){return new Buffer(a,
e)};this.byteArrayToString=function(a,e){return a.toString(e)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=k;this.loadXML=function(a,e){k(a,"utf-8",function(d,a){if(d)return e(d);e(null,l.parseXML(a))})};this.writeFile=function(a,e,d){a=c.resolve(b,a);n.writeFile(a,e,"binary",function(a){d(a||null)})};this.deleteFile=function(a,e){a=c.resolve(b,a);n.unlink(a,e)};this.read=function(a,e,d,h){a=c.resolve(b,a);n.open(a,"r+",666,function(a,
g){if(a)h(a);else{var b=new Buffer(d);n.read(g,b,0,d,e,function(a){n.close(g);h(a,b)})}})};this.readFileSync=function(a,e){return e?"binary"===e?n.readFileSync(a,null):n.readFileSync(a,e):""};this.isFile=function(a,e){a=c.resolve(b,a);n.stat(a,function(a,g){e(!a&&g.isFile())})};this.getFileSize=function(a,e){a=c.resolve(b,a);n.stat(a,function(a,g){a?e(-1):e(g.size)})};this.log=function(a,e){var d;void 0!==e?d=a:e=a;"alert"===d&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(e+
"\n");"alert"===d&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,e,d){a||(process.stderr.write("ASSERTION FAILED: "+e),d&&d())};this.setTimeout=function(a,e){return setTimeout(function(){a()},e)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){b=a};this.currentDirectory=function(){return b};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=
function(a){return h.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};h=new (require("xmldom").DOMParser);a=l.parseXML("<a/>").implementation}
function RhinoRuntime(){function k(a,g){var e;void 0!==g?e=a:g=a;"alert"===e&&print("\n!!!!! ALERT !!!!!");print(g);"alert"===e&&print("!!!!! ALERT !!!!!")}var l=this,n=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),c,b,h="";n.setValidating(!1);n.setNamespaceAware(!0);n.setExpandEntityReferences(!1);n.setSchema(null);b=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,g){var e=new Packages.java.io.FileReader(g);return new Packages.org.xml.sax.InputSource(e)}});c=n.newDocumentBuilder();
c.setEntityResolver(b);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,g){var e=[],d,b=a.length;for(d=0;d<b;d+=1)e[d]=a.charCodeAt(d)&255;return e};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,b){return a.concat(b)};this.loadXML=function(a,b){var e=new Packages.java.io.File(a),d;try{d=c.parse(e)}catch(h){print(h);
b(h);return}b(null,d)};this.readFile=function(a,b,e){h&&(a=h+"/"+a);var d=new Packages.java.io.File(a),c="binary"===b?"latin1":b;d.isFile()?(a=readFile(a,c),"binary"===b&&(a=l.byteArrayFromString(a,"binary")),e(null,a)):e(a+" is not a file.")};this.writeFile=function(a,b,e){h&&(a=h+"/"+a);a=new Packages.java.io.FileOutputStream(a);var d,c=b.length;for(d=0;d<c;d+=1)a.write(b[d]);a.close();e(null)};this.deleteFile=function(a,b){h&&(a=h+"/"+a);(new Packages.java.io.File(a))["delete"]()?b(null):b("Could not delete "+
a)};this.read=function(a,b,e,d){h&&(a=h+"/"+a);var c;c=a;var f="binary";(new Packages.java.io.File(c)).isFile()?("binary"===f&&(f="latin1"),c=readFile(c,f)):c=null;c?d(null,this.byteArrayFromString(c.substring(b,b+e),"binary")):d("Cannot read "+a)};this.readFileSync=function(a,b){return b?readFile(a,b):""};this.isFile=function(a,b){h&&(a=h+"/"+a);var e=new Packages.java.io.File(a);b(e.isFile())};this.getFileSize=function(a,b){h&&(a=h+"/"+a);var e=new Packages.java.io.File(a);b(e.length())};this.log=
k;this.assert=function(a,b,e){a||(k("alert","ASSERTION FAILED: "+b),e&&e())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){h=a};this.currentDirectory=function(){return h};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return c.getDOMImplementation()};this.parseXML=function(a){return c.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function k(c){var b=c[0],h;h=eval("if (typeof "+b+" === 'undefined') {eval('"+b+" = {};');}"+b);for(b=1;b<c.length-1;b+=1)h=h.hasOwnProperty(c[b])?h[c[b]]:h[c[b]]={};return h[c[c.length-1]]}var l={},n={};runtime.loadClass=function(c){function b(a){a=a.replace(/\./g,"/")+".js";var d=runtime.libraryPaths(),b,f,g;runtime.currentDirectory&&d.push(runtime.currentDirectory());for(b=0;b<d.length;b+=1){f=d[b];if(!n.hasOwnProperty(f))try{g=runtime.readFileSync(d[b]+"/manifest.js","utf8"),n[f]=
g&&g.length?eval(g):null}catch(m){n[f]=null,runtime.log("Cannot load manifest for "+f+".")}g=null;if((f=n[f])&&f.indexOf&&-1!==f.indexOf(a))return d[b]+"/"+a}return null}function h(a){var d,g;g=b(a);if(!g)throw a+" is not listed in any manifest.js.";try{d=runtime.readFileSync(g,"utf8")}catch(f){throw runtime.log("Error loading "+a+" "+f),f;}if(void 0===d)throw"Cannot load class "+a;d=d+("\n//# sourceURL="+g)+("\n//@ sourceURL="+g);try{d=eval(a+" = eval(code);")}catch(c){throw runtime.log("Error loading "+
a+" "+c),c;}return d}if(!IS_COMPILED_CODE&&!l.hasOwnProperty(c)){var a=c.split("."),g;g=k(a);if(!g&&(g=h(c),!g||Runtime.getFunctionName(g)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];l[c]=!0}}})();
(function(k){function l(l){if(l.length){var c=l[0];runtime.readFile(c,"utf8",function(b,h){function a(){var a;(a=eval(e))&&runtime.exit(a)}var g="",e=h;-1!==c.indexOf("/")&&(g=c.substring(0,c.indexOf("/")));runtime.setCurrentDirectory(g);b||null===e?(runtime.log(b),runtime.exit(1)):a.apply(null,l)})}}k=k?Array.prototype.slice.call(k):[];"NodeJSRuntime"===runtime.type()?l(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?l(k):l(k.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function k(a){var d=[],f,b=a.length;for(f=0;f<b;f+=1)d[f]=a.charCodeAt(f)&255;return d}function l(a){var d,f="",b,e=a.length-2;for(b=0;b<e;b+=3)d=a[b]<<16|a[b+1]<<8|a[b+2],f+=r[d>>>18],f+=r[d>>>12&63],f+=r[d>>>6&63],f+=r[d&63];b===e+1?(d=a[b]<<4,f+=r[d>>>6],f+=r[d&63],f+="=="):b===e&&(d=a[b]<<10|a[b+1]<<2,f+=r[d>>>12],f+=r[d>>>6&63],f+=r[d&63],f+="=");return f}function n(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var d=[],f=a.length%4,b,e=a.length,g;for(b=0;b<e;b+=4)g=(q[a.charAt(b)]||
0)<<18|(q[a.charAt(b+1)]||0)<<12|(q[a.charAt(b+2)]||0)<<6|(q[a.charAt(b+3)]||0),d.push(g>>16,g>>8&255,g&255);d.length-=[0,0,2,1][f];return d}function c(a){var d=[],f,b=a.length,e;for(f=0;f<b;f+=1)e=a[f],128>e?d.push(e):2048>e?d.push(192|e>>>6,128|e&63):d.push(224|e>>>12&15,128|e>>>6&63,128|e&63);return d}function b(a){var d=[],f,b=a.length,e,g,m;for(f=0;f<b;f+=1)e=a[f],128>e?d.push(e):(f+=1,g=a[f],224>e?d.push((e&31)<<6|g&63):(f+=1,m=a[f],d.push((e&15)<<12|(g&63)<<6|m&63)));return d}function h(a){return l(k(a))}
function a(a){return String.fromCharCode.apply(String,n(a))}function g(a){return b(k(a))}function e(a){a=b(a);for(var d="",f=0;f<a.length;)d+=String.fromCharCode.apply(String,a.slice(f,f+45E3)),f+=45E3;return d}function d(a,d,f){var b="",e,g,m;for(m=d;m<f;m+=1)d=a.charCodeAt(m)&255,128>d?b+=String.fromCharCode(d):(m+=1,e=a.charCodeAt(m)&255,224>d?b+=String.fromCharCode((d&31)<<6|e&63):(m+=1,g=a.charCodeAt(m)&255,b+=String.fromCharCode((d&15)<<12|(e&63)<<6|g&63)));return b}function t(a,f){function b(){var c=
m+e;c>a.length&&(c=a.length);g+=d(a,m,c);m=c;c=m===a.length;f(g,c)&&!c&&runtime.setTimeout(b,0)}var e=1E5,g="",m=0;a.length<e?f(d(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),b())}function f(a){return c(k(a))}function s(a){return String.fromCharCode.apply(String,c(a))}function m(a){return String.fromCharCode.apply(String,c(k(a)))}var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",q=function(a){var d={},f,b;f=0;for(b=a.length;f<b;f+=1)d[a.charAt(f)]=f;return d}(r),w,
u,y=runtime.getWindow(),v,p;y&&y.btoa?(v=function(a){return y.btoa(a)},w=function(a){return v(m(a))}):(v=h,w=function(a){return l(f(a))});y&&y.atob?(p=function(a){return y.atob(a)},u=function(a){a=p(a);return d(a,0,a.length)}):(p=a,u=function(a){return e(n(a))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=l;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=n;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=c;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=b;this.convertUTF8StringToBase64=h;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=g;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=e;this.convertUTF8StringToUTF16String=t;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=f;this.convertUTF16ArrayToUTF8String=s;this.convertUTF16StringToUTF8String=m;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=u;this.fromBase64=a;this.toBase64=h;this.atob=
p;this.btoa=v;this.utob=m;this.btou=t;this.encode=w;this.encodeURI=function(a){return w(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return u(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function k(){this.dl=this.fc=0}function l(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function n(a,d,f,b){this.good_length=a;this.max_lazy=d;this.nice_length=f;this.max_chain=b}function c(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=b;this.off=0}var b=8192,h,a,g,e,d=null,t,f,s,m,r,q,w,u,y,v,p,x,D,G,A,N,B,O,z,I,X,ea,V,ma,da,ba,M,$,T,P,F,J,R,L,S,ga,K,E,fa,ha,Z,ia,Q,ja,aa,ka,qa,W,C,na,ua,va=[0,
0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],oa=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],H=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],sa=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ra;ra=[new n(0,0,0,0),new n(4,4,8,4),new n(4,5,16,8),new n(4,6,32,32),new n(4,4,16,16),new n(8,16,32,32),new n(8,16,128,128),new n(8,32,128,256),new n(32,128,258,1024),new n(32,258,258,4096)];var la=function(e){d[f+t++]=e;if(f+t===b){var m;if(0!==t){null!==h?(e=h,h=h.next):e=new c;
e.next=null;e.len=e.off=0;null===a?a=g=e:g=g.next=e;e.len=t-f;for(m=0;m<e.len;m++)e.ptr[m]=d[f+m];t=f=0}}},pa=function(a){a&=65535;f+t<b-2?(d[f+t++]=a&255,d[f+t++]=a>>>8):(la(a&255),la(a>>>8))},ca=function(){p=(p<<5^m[B+3-1]&255)&8191;x=w[32768+p];w[B&32767]=x;w[32768+p]=B},U=function(a,d){y>16-d?(u|=a<<y,pa(u),u=a>>16-y,y+=d-16):(u|=a<<y,y+=d)},Y=function(a,d){U(d[a].fc,d[a].dl)},ta=function(a,d,f){return a[d].fc<a[f].fc||a[d].fc===a[f].fc&&K[d]<=K[f]},Ba=function(a,d,f){var b;for(b=0;b<f&&ua<na.length;b++)a[d+
b]=na.charCodeAt(ua++)&255;return b},ya=function(){var a,d,f=65536-I-B;if(-1===f)f--;else if(65274<=B){for(a=0;32768>a;a++)m[a]=m[a+32768];O-=32768;B-=32768;v-=32768;for(a=0;8192>a;a++)d=w[32768+a],w[32768+a]=32768<=d?d-32768:0;for(a=0;32768>a;a++)d=w[a],w[a]=32768<=d?d-32768:0;f+=32768}z||(a=Ba(m,B+I,f),0>=a?z=!0:I+=a)},Ca=function(a){var d=X,f=B,b,e=N,g=32506<B?B-32506:0,c=B+258,p=m[f+e-1],s=m[f+e];N>=ma&&(d>>=2);do if(b=a,m[b+e]===s&&m[b+e-1]===p&&m[b]===m[f]&&m[++b]===m[f+1]){f+=2;b++;do++f;while(m[f]===
m[++b]&&m[++f]===m[++b]&&m[++f]===m[++b]&&m[++f]===m[++b]&&m[++f]===m[++b]&&m[++f]===m[++b]&&m[++f]===m[++b]&&m[++f]===m[++b]&&f<c);b=258-(c-f);f=c-258;if(b>e){O=a;e=b;if(258<=b)break;p=m[f+e-1];s=m[f+e]}a=w[a&32767]}while(a>g&&0!==--d);return e},wa=function(a,d){q[Q++]=d;0===a?da[d].fc++:(a--,da[E[d]+256+1].fc++,ba[(256>a?fa[a]:fa[256+(a>>7)])&255].fc++,r[ja++]=a,ka|=qa);qa<<=1;0===(Q&7)&&(ia[aa++]=ka,ka=0,qa=1);if(2<V&&0===(Q&4095)){var f=8*Q,b=B-v,e;for(e=0;30>e;e++)f+=ba[e].fc*(5+oa[e]);f>>=3;
if(ja<parseInt(Q/2,10)&&f<parseInt(b/2,10))return!0}return 8191===Q||8192===ja},za=function(a,d){for(var f=L[d],b=d<<1;b<=S;){b<S&&ta(a,L[b+1],L[b])&&b++;if(ta(a,f,L[b]))break;L[d]=L[b];d=b;b<<=1}L[d]=f},Da=function(a,d){var f=0;do f|=a&1,a>>=1,f<<=1;while(0<--d);return f>>1},Ea=function(a,d){var f=[];f.length=16;var b=0,e;for(e=1;15>=e;e++)b=b+R[e-1]<<1,f[e]=b;for(b=0;b<=d;b++)e=a[b].dl,0!==e&&(a[b].fc=Da(f[e]++,e))},Aa=function(a){var d=a.dyn_tree,f=a.static_tree,b=a.elems,e,g=-1,m=b;S=0;ga=573;
for(e=0;e<b;e++)0!==d[e].fc?(L[++S]=g=e,K[e]=0):d[e].dl=0;for(;2>S;)e=L[++S]=2>g?++g:0,d[e].fc=1,K[e]=0,W--,null!==f&&(C-=f[e].dl);a.max_code=g;for(e=S>>1;1<=e;e--)za(d,e);do e=L[1],L[1]=L[S--],za(d,1),f=L[1],L[--ga]=e,L[--ga]=f,d[m].fc=d[e].fc+d[f].fc,K[m]=K[e]>K[f]+1?K[e]:K[f]+1,d[e].dl=d[f].dl=m,L[1]=m++,za(d,1);while(2<=S);L[--ga]=L[1];m=a.dyn_tree;e=a.extra_bits;var b=a.extra_base,f=a.max_code,c=a.max_length,p=a.static_tree,s,h,r,q,l=0;for(h=0;15>=h;h++)R[h]=0;m[L[ga]].dl=0;for(a=ga+1;573>a;a++)s=
L[a],h=m[m[s].dl].dl+1,h>c&&(h=c,l++),m[s].dl=h,s>f||(R[h]++,r=0,s>=b&&(r=e[s-b]),q=m[s].fc,W+=q*(h+r),null!==p&&(C+=q*(p[s].dl+r)));if(0!==l){do{for(h=c-1;0===R[h];)h--;R[h]--;R[h+1]+=2;R[c]--;l-=2}while(0<l);for(h=c;0!==h;h--)for(s=R[h];0!==s;)e=L[--a],e>f||(m[e].dl!==h&&(W+=(h-m[e].dl)*m[e].fc,m[e].fc=h),s--)}Ea(d,g)},Fa=function(a,d){var f,b=-1,e,m=a[0].dl,g=0,c=7,p=4;0===m&&(c=138,p=3);a[d+1].dl=65535;for(f=0;f<=d;f++)e=m,m=a[f+1].dl,++g<c&&e===m||(g<p?T[e].fc+=g:0!==e?(e!==b&&T[e].fc++,T[16].fc++):
10>=g?T[17].fc++:T[18].fc++,g=0,b=e,0===m?(c=138,p=3):e===m?(c=6,p=3):(c=7,p=4))},Ga=function(){8<y?pa(u):0<y&&la(u);y=u=0},Ha=function(a,d){var f,b=0,e=0,m=0,g=0,c,p;if(0!==Q){do 0===(b&7)&&(g=ia[m++]),f=q[b++]&255,0===(g&1)?Y(f,a):(c=E[f],Y(c+256+1,a),p=va[c],0!==p&&(f-=ha[c],U(f,p)),f=r[e++],c=(256>f?fa[f]:fa[256+(f>>7)])&255,Y(c,d),p=oa[c],0!==p&&(f-=Z[c],U(f,p))),g>>=1;while(b<Q)}Y(256,a)},Ia=function(a,d){var f,b=-1,e,m=a[0].dl,g=0,c=7,p=4;0===m&&(c=138,p=3);for(f=0;f<=d;f++)if(e=m,m=a[f+1].dl,
!(++g<c&&e===m)){if(g<p){do Y(e,T);while(0!==--g)}else 0!==e?(e!==b&&(Y(e,T),g--),Y(16,T),U(g-3,2)):10>=g?(Y(17,T),U(g-3,3)):(Y(18,T),U(g-11,7));g=0;b=e;0===m?(c=138,p=3):e===m?(c=6,p=3):(c=7,p=4)}},Ja=function(){var a;for(a=0;286>a;a++)da[a].fc=0;for(a=0;30>a;a++)ba[a].fc=0;for(a=0;19>a;a++)T[a].fc=0;da[256].fc=1;ka=Q=ja=aa=W=C=0;qa=1},xa=function(a){var d,f,b,e;e=B-v;ia[aa]=ka;Aa(P);Aa(F);Fa(da,P.max_code);Fa(ba,F.max_code);Aa(J);for(b=18;3<=b&&0===T[sa[b]].dl;b--);W+=3*(b+1)+14;d=W+3+7>>3;f=C+
3+7>>3;f<=d&&(d=f);if(e+4<=d&&0<=v)for(U(0+a,3),Ga(),pa(e),pa(~e),b=0;b<e;b++)la(m[v+b]);else if(f===d)U(2+a,3),Ha(M,$);else{U(4+a,3);e=P.max_code+1;d=F.max_code+1;b+=1;U(e-257,5);U(d-1,5);U(b-4,4);for(f=0;f<b;f++)U(T[sa[f]].dl,3);Ia(da,e-1);Ia(ba,d-1);Ha(da,ba)}Ja();0!==a&&Ga()},Ka=function(b,e,g){var m,c,p;for(m=0;null!==a&&m<g;){c=g-m;c>a.len&&(c=a.len);for(p=0;p<c;p++)b[e+m+p]=a.ptr[a.off+p];a.off+=c;a.len-=c;m+=c;0===a.len&&(c=a,a=a.next,c.next=h,h=c)}if(m===g)return m;if(f<t){c=g-m;c>t-f&&(c=
t-f);for(p=0;p<c;p++)b[e+m+p]=d[f+p];f+=c;m+=c;t===f&&(t=f=0)}return m},La=function(d,b,g){var c;if(!e){if(!z){y=u=0;var h,r;if(0===$[0].dl){P.dyn_tree=da;P.static_tree=M;P.extra_bits=va;P.extra_base=257;P.elems=286;P.max_length=15;P.max_code=0;F.dyn_tree=ba;F.static_tree=$;F.extra_bits=oa;F.extra_base=0;F.elems=30;F.max_length=15;F.max_code=0;J.dyn_tree=T;J.static_tree=null;J.extra_bits=H;J.extra_base=0;J.elems=19;J.max_length=7;for(r=h=J.max_code=0;28>r;r++)for(ha[r]=h,c=0;c<1<<va[r];c++)E[h++]=
r;E[h-1]=r;for(r=h=0;16>r;r++)for(Z[r]=h,c=0;c<1<<oa[r];c++)fa[h++]=r;for(h>>=7;30>r;r++)for(Z[r]=h<<7,c=0;c<1<<oa[r]-7;c++)fa[256+h++]=r;for(c=0;15>=c;c++)R[c]=0;for(c=0;143>=c;)M[c++].dl=8,R[8]++;for(;255>=c;)M[c++].dl=9,R[9]++;for(;279>=c;)M[c++].dl=7,R[7]++;for(;287>=c;)M[c++].dl=8,R[8]++;Ea(M,287);for(c=0;30>c;c++)$[c].dl=5,$[c].fc=Da(c,5);Ja()}for(c=0;8192>c;c++)w[32768+c]=0;ea=ra[V].max_lazy;ma=ra[V].good_length;X=ra[V].max_chain;v=B=0;I=Ba(m,0,65536);if(0>=I)z=!0,I=0;else{for(z=!1;262>I&&
!z;)ya();for(c=p=0;2>c;c++)p=(p<<5^m[c]&255)&8191}a=null;f=t=0;3>=V?(N=2,A=0):(A=2,G=0);s=!1}e=!0;if(0===I)return s=!0,0}c=Ka(d,b,g);if(c===g)return g;if(s)return c;if(3>=V)for(;0!==I&&null===a;){ca();0!==x&&32506>=B-x&&(A=Ca(x),A>I&&(A=I));if(3<=A)if(r=wa(B-O,A-3),I-=A,A<=ea){A--;do B++,ca();while(0!==--A);B++}else B+=A,A=0,p=m[B]&255,p=(p<<5^m[B+1]&255)&8191;else r=wa(0,m[B]&255),I--,B++;r&&(xa(0),v=B);for(;262>I&&!z;)ya()}else for(;0!==I&&null===a;){ca();N=A;D=O;A=2;0!==x&&(N<ea&&32506>=B-x)&&
(A=Ca(x),A>I&&(A=I),3===A&&4096<B-O&&A--);if(3<=N&&A<=N){r=wa(B-1-D,N-3);I-=N-1;N-=2;do B++,ca();while(0!==--N);G=0;A=2;B++;r&&(xa(0),v=B)}else 0!==G?wa(0,m[B-1]&255)&&(xa(0),v=B):G=1,B++,I--;for(;262>I&&!z;)ya()}0===I&&(0!==G&&wa(0,m[B-1]&255),xa(1),s=!0);return c+Ka(d,c+b,g-c)};this.deflate=function(f,c){var p,s;na=f;ua=0;"undefined"===String(typeof c)&&(c=6);(p=c)?1>p?p=1:9<p&&(p=9):p=6;V=p;z=e=!1;if(null===d){h=a=g=null;d=[];d.length=b;m=[];m.length=65536;r=[];r.length=8192;q=[];q.length=32832;
w=[];w.length=65536;da=[];da.length=573;for(p=0;573>p;p++)da[p]=new k;ba=[];ba.length=61;for(p=0;61>p;p++)ba[p]=new k;M=[];M.length=288;for(p=0;288>p;p++)M[p]=new k;$=[];$.length=30;for(p=0;30>p;p++)$[p]=new k;T=[];T.length=39;for(p=0;39>p;p++)T[p]=new k;P=new l;F=new l;J=new l;R=[];R.length=16;L=[];L.length=573;K=[];K.length=573;E=[];E.length=256;fa=[];fa.length=512;ha=[];ha.length=29;Z=[];Z.length=30;ia=[];ia.length=1024}var u=Array(1024),t=[],x=[];for(p=La(u,0,u.length);0<p;){x.length=p;for(s=
0;s<p;s++)x[s]=String.fromCharCode(u[s]);t[t.length]=x.join("");p=La(u,0,u.length)}na=null;return t.join("")}};
// Input 4
core.ByteArray=function(k){this.pos=0;this.data=k;this.readUInt32LE=function(){this.pos+=4;var l=this.data,k=this.pos;return l[--k]<<24|l[--k]<<16|l[--k]<<8|l[--k]};this.readUInt16LE=function(){this.pos+=2;var l=this.data,k=this.pos;return l[--k]<<8|l[--k]}};
// Input 5
core.ByteArrayWriter=function(k){var l=this,n=new runtime.ByteArray(0);this.appendByteArrayWriter=function(c){n=runtime.concatByteArrays(n,c.getByteArray())};this.appendByteArray=function(c){n=runtime.concatByteArrays(n,c)};this.appendArray=function(c){n=runtime.concatByteArrays(n,runtime.byteArrayFromArray(c))};this.appendUInt16LE=function(c){l.appendArray([c&255,c>>8&255])};this.appendUInt32LE=function(c){l.appendArray([c&255,c>>8&255,c>>16&255,c>>24&255])};this.appendString=function(c){n=runtime.concatByteArrays(n,
runtime.byteArrayFromString(c,k))};this.getLength=function(){return n.length};this.getByteArray=function(){return n}};
// Input 6
core.RawInflate=function(){var k,l,n=null,c,b,h,a,g,e,d,t,f,s,m,r,q,w,u=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],y=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],v=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],p=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],x=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],G=function(){this.list=this.next=null},A=function(){this.n=this.b=this.e=0;this.t=null},N=function(a,d,f,b,e,c){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var m=Array(this.BMAX+1),g,p,s,h,r,q,l,k=Array(this.BMAX+1),u,t,w,x=new A,n=Array(this.BMAX);h=Array(this.N_MAX);var v,y=Array(this.BMAX+1),D,B,z;z=this.root=null;for(r=0;r<m.length;r++)m[r]=0;for(r=0;r<k.length;r++)k[r]=0;for(r=0;r<n.length;r++)n[r]=null;for(r=0;r<h.length;r++)h[r]=
0;for(r=0;r<y.length;r++)y[r]=0;g=256<d?a[256]:this.BMAX;u=a;t=0;r=d;do m[u[t]]++,t++;while(0<--r);if(m[0]==d)this.root=null,this.status=this.m=0;else{for(q=1;q<=this.BMAX&&0==m[q];q++);l=q;c<q&&(c=q);for(r=this.BMAX;0!=r&&0==m[r];r--);s=r;c>r&&(c=r);for(D=1<<q;q<r;q++,D<<=1)if(0>(D-=m[q])){this.status=2;this.m=c;return}if(0>(D-=m[r]))this.status=2,this.m=c;else{m[r]+=D;y[1]=q=0;u=m;t=1;for(w=2;0<--r;)y[w++]=q+=u[t++];u=a;r=t=0;do 0!=(q=u[t++])&&(h[y[q]++]=r);while(++r<d);d=y[s];y[0]=r=0;u=h;t=0;
h=-1;v=k[0]=0;w=null;for(B=0;l<=s;l++)for(a=m[l];0<a--;){for(;l>v+k[1+h];){v+=k[1+h];h++;B=(B=s-v)>c?c:B;if((p=1<<(q=l-v))>a+1)for(p-=a+1,w=l;++q<B&&!((p<<=1)<=m[++w]);)p-=m[w];v+q>g&&v<g&&(q=g-v);B=1<<q;k[1+h]=q;w=Array(B);for(p=0;p<B;p++)w[p]=new A;z=null==z?this.root=new G:z.next=new G;z.next=null;z.list=w;n[h]=w;0<h&&(y[h]=r,x.b=k[h],x.e=16+q,x.t=w,q=(r&(1<<v)-1)>>v-k[h],n[h-1][q].e=x.e,n[h-1][q].b=x.b,n[h-1][q].n=x.n,n[h-1][q].t=x.t)}x.b=l-v;t>=d?x.e=99:u[t]<f?(x.e=256>u[t]?16:15,x.n=u[t++]):
(x.e=e[u[t]-f],x.n=b[u[t++]-f]);p=1<<l-v;for(q=r>>v;q<B;q+=p)w[q].e=x.e,w[q].b=x.b,w[q].n=x.n,w[q].t=x.t;for(q=1<<l-1;0!=(r&q);q>>=1)r^=q;for(r^=q;(r&(1<<v)-1)!=y[h];)v-=k[h],h--}this.m=k[1];this.status=0!=D&&1!=s?1:0}}},B=function(d){for(;a<d;){var f=h,b;b=q.length==w?-1:q[w++];h=f|b<<a;a+=8}},O=function(a){return h&u[a]},z=function(d){h>>=d;a-=d},I=function(a,b,e){var c,p,h;if(0==e)return 0;for(h=0;;){B(m);p=f.list[O(m)];for(c=p.e;16<c;){if(99==c)return-1;z(p.b);c-=16;B(c);p=p.t[O(c)];c=p.e}z(p.b);
if(16==c)l&=32767,a[b+h++]=k[l++]=p.n;else{if(15==c)break;B(c);d=p.n+O(c);z(c);B(r);p=s.list[O(r)];for(c=p.e;16<c;){if(99==c)return-1;z(p.b);c-=16;B(c);p=p.t[O(c)];c=p.e}z(p.b);B(c);t=l-p.n-O(c);for(z(c);0<d&&h<e;)d--,t&=32767,l&=32767,a[b+h++]=k[l++]=k[t++]}if(h==e)return e}g=-1;return h},X,ea=function(a,d,b){var e,c,g,h,q,l,k,u=Array(316);for(e=0;e<u.length;e++)u[e]=0;B(5);l=257+O(5);z(5);B(5);k=1+O(5);z(5);B(4);e=4+O(4);z(4);if(286<l||30<k)return-1;for(c=0;c<e;c++)B(3),u[D[c]]=O(3),z(3);for(;19>
c;c++)u[D[c]]=0;m=7;c=new N(u,19,19,null,null,m);if(0!=c.status)return-1;f=c.root;m=c.m;h=l+k;for(e=g=0;e<h;)if(B(m),q=f.list[O(m)],c=q.b,z(c),c=q.n,16>c)u[e++]=g=c;else if(16==c){B(2);c=3+O(2);z(2);if(e+c>h)return-1;for(;0<c--;)u[e++]=g}else{17==c?(B(3),c=3+O(3),z(3)):(B(7),c=11+O(7),z(7));if(e+c>h)return-1;for(;0<c--;)u[e++]=0;g=0}m=9;c=new N(u,l,257,y,v,m);0==m&&(c.status=1);if(0!=c.status)return-1;f=c.root;m=c.m;for(e=0;e<k;e++)u[e]=u[e+l];r=6;c=new N(u,k,0,p,x,r);s=c.root;r=c.m;return 0==r&&
257<l||0!=c.status?-1:I(a,d,b)};this.inflate=function(u,D){null==k&&(k=Array(65536));a=h=l=0;g=-1;e=!1;d=t=0;f=null;q=u;w=0;var G=new runtime.ByteArray(D);a:{var A,M;for(A=0;A<D&&(!e||-1!=g);){if(0<d){if(0!=g)for(;0<d&&A<D;)d--,t&=32767,l&=32767,G[0+A++]=k[l++]=k[t++];else{for(;0<d&&A<D;)d--,l&=32767,B(8),G[0+A++]=k[l++]=O(8),z(8);0==d&&(g=-1)}if(A==D)break}if(-1==g){if(e)break;B(1);0!=O(1)&&(e=!0);z(1);B(2);g=O(2);z(2);f=null;d=0}switch(g){case 0:M=G;var $=0+A,T=D-A,P=void 0,P=a&7;z(P);B(16);P=O(16);
z(16);B(16);if(P!=(~h&65535))M=-1;else{z(16);d=P;for(P=0;0<d&&P<T;)d--,l&=32767,B(8),M[$+P++]=k[l++]=O(8),z(8);0==d&&(g=-1);M=P}break;case 1:if(null!=f)M=I(G,0+A,D-A);else b:{M=G;$=0+A;T=D-A;if(null==n){for(var F=void 0,P=Array(288),F=void 0,F=0;144>F;F++)P[F]=8;for(;256>F;F++)P[F]=9;for(;280>F;F++)P[F]=7;for(;288>F;F++)P[F]=8;b=7;F=new N(P,288,257,y,v,b);if(0!=F.status){alert("HufBuild error: "+F.status);M=-1;break b}n=F.root;b=F.m;for(F=0;30>F;F++)P[F]=5;X=5;F=new N(P,30,0,p,x,X);if(1<F.status){n=
null;alert("HufBuild error: "+F.status);M=-1;break b}c=F.root;X=F.m}f=n;s=c;m=b;r=X;M=I(M,$,T)}break;case 2:M=null!=f?I(G,0+A,D-A):ea(G,0+A,D-A);break;default:M=-1}if(-1==M)break a;A+=M}}q=null;return G}};
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
core.LoopWatchDog=function(k,l){var n=Date.now(),c=0;this.check=function(){var b;if(k&&(b=Date.now(),b-n>k))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<l&&(c+=1,c>l))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){this.hashString=function(k){var l=0,n,c;n=0;for(c=k.length;n<c;n+=1)l=(l<<5)-l+k.charCodeAt(n),l|=0;return l}};
// Input 9
core.DomUtils=function(){function k(c,b){if(c.nodeType===Node.TEXT_NODE)if(0===c.length)c.parentNode.removeChild(c);else if(b.nodeType===Node.TEXT_NODE)return b.insertData(0,c.data),c.parentNode.removeChild(c),b;return c}function l(c,b){return c===b||Boolean(c.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_CONTAINED_BY)}var n=this;this.splitBoundaries=function(c){var b=[],h;if(c.startContainer.nodeType===Node.TEXT_NODE||c.endContainer.nodeType===Node.TEXT_NODE){h=c.endContainer;var a=c.endOffset;
if(a<h.childNodes.length)for(h=h.childNodes[a],a=0;h.firstChild;)h=h.firstChild;else for(;h.lastChild;)h=h.lastChild,a=h.nodeType===Node.TEXT_NODE?h.textContent.length:h.childNodes.length;c.setEnd(h,a);0!==c.endOffset&&(c.endContainer.nodeType===Node.TEXT_NODE&&c.endOffset!==c.endContainer.length)&&(b.push(c.endContainer.splitText(c.endOffset)),b.push(c.endContainer));0!==c.startOffset&&(c.startContainer.nodeType===Node.TEXT_NODE&&c.startOffset!==c.startContainer.length)&&(h=c.startContainer.splitText(c.startOffset),
b.push(c.startContainer),b.push(h),c.setStart(h,0))}return b};this.containsRange=function(c,b){return 0>=c.compareBoundaryPoints(c.START_TO_START,b)&&0<=c.compareBoundaryPoints(c.END_TO_END,b)};this.rangesIntersect=function(c,b){return 0>=c.compareBoundaryPoints(c.END_TO_START,b)&&0<=c.compareBoundaryPoints(c.START_TO_END,b)};this.getNodesInRange=function(c,b){var h=[],a,g=c.startContainer.ownerDocument.createTreeWalker(c.commonAncestorContainer,NodeFilter.SHOW_ALL,b,!1);for(a=g.currentNode=c.startContainer;a;){if(b(a)===
NodeFilter.FILTER_ACCEPT)h.push(a);else if(b(a)===NodeFilter.FILTER_REJECT)break;a=a.parentNode}h.reverse();for(a=g.nextNode();a;)h.push(a),a=g.nextNode();return h};this.normalizeTextNodes=function(c){c&&c.nextSibling&&(c=k(c,c.nextSibling));c&&c.previousSibling&&k(c.previousSibling,c)};this.rangeContainsNode=function(c,b){var h=b.ownerDocument.createRange(),a=b.nodeType===Node.TEXT_NODE?b.length:b.childNodes.length;h.setStart(c.startContainer,c.startOffset);h.setEnd(c.endContainer,c.endOffset);a=
0===h.comparePoint(b,0)&&0===h.comparePoint(b,a);h.detach();return a};this.mergeIntoParent=function(c){for(var b=c.parentNode;c.firstChild;)b.insertBefore(c.firstChild,c);b.removeChild(c);return b};this.getElementsByTagNameNS=function(c,b,h){return Array.prototype.slice.call(c.getElementsByTagNameNS(b,h))};this.rangeIntersectsNode=function(c,b){var h=b.nodeType===Node.TEXT_NODE?b.length:b.childNodes.length;return 0>=c.comparePoint(b,0)&&0<=c.comparePoint(b,h)};this.containsNode=function(c,b){return c===
b||c.contains(b)};(function(){var c=runtime.getWindow();null!==c&&(c=c.navigator.appVersion.toLowerCase(),c=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")))&&(n.containsNode=l)})()};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(k,l){function n(a){a.parentNode&&(g.push(a.previousSibling),g.push(a.nextSibling),a.parentNode.removeChild(a))}function c(a,d,b){if(d.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(d),"putCursorIntoTextNode: invalid container");var e=d.parentNode;runtime.assert(Boolean(e),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=d.length,"putCursorIntoTextNode: offset is out of bounds");0===b?e.insertBefore(a,d):(b!==d.length&&d.splitText(b),e.insertBefore(a,
d.nextSibling))}else if(d.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(d),"putCursorIntoContainer: invalid container");for(e=d.firstChild;null!==e&&0<b;)e=e.nextSibling,b-=1;d.insertBefore(a,e)}g.push(a.previousSibling);g.push(a.nextSibling)}var b=k.createElementNS("urn:webodf:names:cursor","cursor"),h=k.createElementNS("urn:webodf:names:cursor","anchor"),a,g=[],e,d,t=new core.DomUtils;this.getNode=function(){return b};this.getAnchorNode=function(){return h.parentNode?h:b};this.getSelectedRange=
function(){d?(e.setStartBefore(b),e.collapse(!0)):(e.setStartAfter(a?h:b),e.setEndBefore(a?b:h));return e};this.setSelectedRange=function(f,s){e&&e!==f&&e.detach();e=f;a=!1!==s;(d=f.collapsed)?(n(h),n(b),c(b,f.startContainer,f.startOffset)):(n(h),n(b),c(a?b:h,f.endContainer,f.endOffset),c(a?h:b,f.startContainer,f.startOffset));g.forEach(t.normalizeTextNodes);g.length=0};this.remove=function(){n(b);g.forEach(t.normalizeTextNodes);g.length=0};b.setAttributeNS("urn:webodf:names:cursor","memberId",l);
h.setAttributeNS("urn:webodf:names:cursor","memberId",l)};
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
core.EventNotifier=function(k){var l={};this.emit=function(k,c){var b,h;runtime.assert(l.hasOwnProperty(k),'unknown event fired "'+k+'"');h=l[k];for(b=0;b<h.length;b+=1)h[b](c)};this.subscribe=function(k,c){runtime.assert(l.hasOwnProperty(k),'tried to subscribe to unknown event "'+k+'"');l[k].push(c);runtime.log('event "'+k+'" subscribed.')};this.unsubscribe=function(k,c){var b;runtime.assert(l.hasOwnProperty(k),'tried to unsubscribe from unknown event "'+k+'"');b=l[k].indexOf(c);runtime.assert(-1!==
b,'tried to unsubscribe unknown callback from event "'+k+'"');-1!==b&&l[k].splice(b,1);runtime.log('event "'+k+'" unsubscribed.')};(function(){var n;for(n=0;n<k.length;n+=1)l[k[n]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var k=runtime.getWindow().document,l=k.getElementById("testarea");runtime.assert(!l,'Unclean test environment, found a div with id "testarea".');l=k.createElement("div");l.setAttribute("id","testarea");k.body.appendChild(l);return l};
core.UnitTest.cleanupTestAreaDiv=function(){var k=runtime.getWindow().document,l=k.getElementById("testarea");runtime.assert(!!l&&l.parentNode===k.body,'Test environment broken, found no div with id "testarea" below body.');k.body.removeChild(l)};
core.UnitTestRunner=function(){function k(b){a+=1;runtime.log("fail",b)}function l(a,d){var b;try{if(a.length!==d.length)return k("array of length "+a.length+" should be "+d.length+" long"),!1;for(b=0;b<a.length;b+=1)if(a[b]!==d[b])return k(a[b]+" should be "+d[b]+" at array index "+b),!1}catch(f){return!1}return!0}function n(a,d,b){var f=a.attributes,c=f.length,g,h,q;for(g=0;g<c;g+=1)if(h=f.item(g),"xmlns"!==h.prefix){q=d.getAttributeNS(h.namespaceURI,h.localName);if(!d.hasAttributeNS(h.namespaceURI,
h.localName))return k("Attribute "+h.localName+" with value "+h.value+" was not present"),!1;if(q!==h.value)return k("Attribute "+h.localName+" was "+q+" should be "+h.value),!1}return b?!0:n(d,a,!0)}function c(a,d){if(a.nodeType!==d.nodeType)return k(a.nodeType+" should be "+d.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===d.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==d.namespaceURI||a.localName!==d.localName)return k(a.namespaceURI+
" should be "+d.namespaceURI),!1;if(!n(a,d,!1))return!1;for(var b=a.firstChild,f=d.firstChild;b;){if(!f||!c(b,f))return!1;b=b.nextSibling;f=f.nextSibling}return f?!1:!0}function b(a,d){return 0===d?a===d&&1/a===1/d:a===d?!0:"number"===typeof d&&isNaN(d)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(d)===Object.prototype.toString.call([])?l(a,d):"object"===typeof d&&"object"===typeof a?d.constructor===Element||d.constructor===Node?c(d,a):g(d,a):!1}function h(a,d,c){"string"===typeof d&&
"string"===typeof c||runtime.log("WARN: shouldBe() expects string arguments");var f,g;try{g=eval(d)}catch(m){f=m}a=eval(c);f?k(d+" should be "+a+". Threw exception "+f):b(g,a)?runtime.log("pass",d+" is "+c):String(typeof g)===String(typeof a)?(c=0===g&&0>1/g?"-0":String(g),k(d+" should be "+a+". Was "+c+".")):k(d+" should be "+a+" (of type "+typeof a+"). Was "+g+" (of type "+typeof g+").")}var a=0,g;g=function(a,d){var c=Object.keys(a),f=Object.keys(d);c.sort();f.sort();return l(c,f)&&Object.keys(a).every(function(f){var c=
a[f],g=d[f];return b(c,g)?!0:(k(c+" should be "+g+" for key "+f),!1)})};this.areNodesEqual=c;this.shouldBeNull=function(a,d){h(a,d,"null")};this.shouldBeNonNull=function(a,d){var b,f;try{f=eval(d)}catch(c){b=c}b?k(d+" should be non-null. Threw exception "+b):null!==f?runtime.log("pass",d+" is non-null."):k(d+" should be non-null. Was "+f)};this.shouldBe=h;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function k(c,b){return"<span style='color:blue;cursor:pointer' onclick='"+b+"'>"+c+"</span>"}var l=0,n={};this.runTests=function(c,b,h){function a(f){if(0===f.length)n[g]=t,l+=e.countFailedTests(),b();else{s=f[0];var c=Runtime.getFunctionName(s);runtime.log("Running "+c);r=e.countFailedTests();d.setUp();s(function(){d.tearDown();t[c]=r===e.countFailedTests();a(f.slice(1))})}}var g=Runtime.getFunctionName(c),e=new core.UnitTestRunner,d=new c(e),t={},f,s,m,r,q="BrowserRuntime"===
runtime.type();if(n.hasOwnProperty(g))runtime.log("Test "+g+" has already run.");else{q?runtime.log("<span>Running "+k(g,'runSuite("'+g+'");')+": "+d.description()+"</span>"):runtime.log("Running "+g+": "+d.description);m=d.tests();for(f=0;f<m.length;f+=1)s=m[f],c=Runtime.getFunctionName(s)||s.testName,h.length&&-1===h.indexOf(c)||(q?runtime.log("<span>Running "+k(c,'runTest("'+g+'","'+c+'")')+"</span>"):runtime.log("Running "+c),r=e.countFailedTests(),d.setUp(),s(),d.tearDown(),t[c]=r===e.countFailedTests());
a(d.asyncTests())}};this.countFailedTests=function(){return l};this.results=function(){return n}};
// Input 13
core.PositionIterator=function(k,l,n,c){function b(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function h(a){this.acceptNode=function(d){return d.nodeType===Node.TEXT_NODE&&0===d.length?NodeFilter.FILTER_REJECT:a.acceptNode(d)}}function a(){var a=e.currentNode.nodeType;d=a===Node.TEXT_NODE?e.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var g=this,e,d,t;this.nextPosition=function(){if(e.currentNode===k)return!1;
if(0===d&&e.currentNode.nodeType===Node.ELEMENT_NODE)null===e.firstChild()&&(d=1);else if(e.currentNode.nodeType===Node.TEXT_NODE&&d+1<e.currentNode.length)d+=1;else if(null!==e.nextSibling())d=0;else if(e.parentNode())d=1;else return!1;return!0};this.previousPosition=function(){var f=!0;if(0===d)if(null===e.previousSibling()){if(!e.parentNode()||e.currentNode===k)return e.firstChild(),!1;d=0}else a();else e.currentNode.nodeType===Node.TEXT_NODE?d-=1:null!==e.lastChild()?a():e.currentNode===k?f=!1:
d=0;return f};this.container=function(){var a=e.currentNode,b=a.nodeType;return 0===d&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=e.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&d===a.length)for(a=a.nextSibling;a&&1!==t(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===d&&(a=null);return a};this.leftNode=function(){var a=e.currentNode;if(0===d)for(a=a.previousSibling;a&&1!==t(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==t(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return e.currentNode};this.domOffset=function(){if(e.currentNode.nodeType===Node.TEXT_NODE)return d;var a=0,b=e.currentNode,c;for(c=1===d?e.lastChild():e.previousSibling();c;)a+=1,c=e.previousSibling();e.currentNode=b;return a};this.unfilteredDomOffset=function(){if(e.currentNode.nodeType===Node.TEXT_NODE)return d;for(var a=0,b=e.currentNode,b=1===d?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=
function(){var a=e.currentNode,d=e.previousSibling();e.currentNode=a;return d};this.getNextSibling=function(){var a=e.currentNode,d=e.nextSibling();e.currentNode=a;return d};this.setUnfilteredPosition=function(a,b){var c;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");e.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return d=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),
b===a.length&&(d=void 0,e.nextSibling()?d=0:e.parentNode()&&(d=1),runtime.assert(void 0!==d,"Error in setPosition: position not valid.")),!0;c=t(a);b<a.childNodes.length&&c!==NodeFilter.FILTER_REJECT?(e.currentNode=a.childNodes[b],c=t(e.currentNode),d=0):d=0===b?0:1;c===NodeFilter.FILTER_REJECT&&(d=1);if(c!==NodeFilter.FILTER_ACCEPT)return g.nextPosition();runtime.assert(t(e.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
return!0};this.moveToEnd=function(){e.currentNode=k;d=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?g.setUnfilteredPosition(a,a.length):(e.currentNode=a,d=1)};this.getNodeFilter=function(){return t};t=(n?new h(n):new b).acceptNode;t.acceptNode=t;e=k.ownerDocument.createTreeWalker(k,l||4294967295,t,c);d=0;null===e.firstChild()&&(d=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(k){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var k={},l=core.PositionFilter.FilterResult.FILTER_ACCEPT,n=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(c){for(var b in k)if(k.hasOwnProperty(b)&&k[b].acceptPosition(c)===n)return n;return l};this.addFilter=function(c,b){k[c]=b};this.removeFilter=function(c){delete k[c]}};
// Input 16
core.Async=function(){this.forEach=function(k,l,n){function c(b){a!==h&&(b?(a=h,n(b)):(a+=1,a===h&&n(null)))}var b,h=k.length,a=0;for(b=0;b<h;b+=1)l(k[b],c)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(k,l){function n(a){var d=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,c,f=a.length,e=0,e=0;b=-1;for(c=0;c<f;c+=1)e=(b^a[c])&255,e=d[e],b=b>>>8^e;return b^-1}function c(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function b(a){var d=a.getFullYear();return 1980>d?0:d-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function h(a,d){var b,f,e,g,m,h,q,s=this;this.load=function(d){if(void 0!==s.data)d(null,s.data);else{var b=m+34+f+e+256;b+q>r&&(b=r-q);runtime.read(a,q,b,function(b,c){if(b||null===c)d(b,c);else a:{var f=c,e=new core.ByteArray(f),p=e.readUInt32LE(),r;if(67324752!==p)d("File entry signature is wrong."+p.toString()+" "+f.length.toString(),null);else{e.pos+=22;p=e.readUInt16LE();r=e.readUInt16LE();e.pos+=p+r;
if(g){f=f.slice(e.pos,e.pos+m);if(m!==f.length){d("The amount of compressed bytes read was "+f.length.toString()+" instead of "+m.toString()+" for "+s.filename+" in "+a+".",null);break a}f=w(f,h)}else f=f.slice(e.pos,e.pos+h);h!==f.length?d("The amount of bytes read was "+f.length.toString()+" instead of "+h.toString()+" for "+s.filename+" in "+a+".",null):(s.data=f,d(null,f))}}})}};this.set=function(a,d,b,f){s.filename=a;s.data=d;s.compressed=b;s.date=f};this.error=null;d&&(b=d.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(d.pos-4).toString()+' for file "'+a+'": '+d.data.length.toString():(d.pos+=6,g=d.readUInt16LE(),this.date=c(d.readUInt32LE()),d.readUInt32LE(),m=d.readUInt32LE(),h=d.readUInt32LE(),f=d.readUInt16LE(),e=d.readUInt16LE(),b=d.readUInt16LE(),d.pos+=8,q=d.readUInt32LE(),this.filename=runtime.byteArrayToString(d.data.slice(d.pos,d.pos+f),"utf8"),d.pos+=f+e+b))}function a(a,d){if(22!==a.length)d("Central directory length should be 22.",
u);else{var b=new core.ByteArray(a),f;f=b.readUInt32LE();101010256!==f?d("Central directory signature is wrong: "+f.toString(),u):(f=b.readUInt16LE(),0!==f?d("Zip files with non-zero disk numbers are not supported.",u):(f=b.readUInt16LE(),0!==f?d("Zip files with non-zero disk numbers are not supported.",u):(f=b.readUInt16LE(),q=b.readUInt16LE(),f!==q?d("Number of entries is inconsistent.",u):(f=b.readUInt32LE(),b=b.readUInt16LE(),b=r-22-f,runtime.read(k,b,r-b,function(a,b){if(a||null===b)d(a,u);else a:{var f=
new core.ByteArray(b),c,e;m=[];for(c=0;c<q;c+=1){e=new h(k,f);if(e.error){d(e.error,u);break a}m[m.length]=e}d(null,u)}})))))}}function g(a,d){var b=null,f,c;for(c=0;c<m.length;c+=1)if(f=m[c],f.filename===a){b=f;break}b?b.data?d(null,b.data):b.load(d):d(a+" not found.",null)}function e(a){var d=new core.ByteArrayWriter("utf8"),f=0;d.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(f=a.data.length);d.appendUInt32LE(b(a.date));d.appendUInt32LE(n(a.data));d.appendUInt32LE(f);d.appendUInt32LE(f);d.appendUInt16LE(a.filename.length);
d.appendUInt16LE(0);d.appendString(a.filename);a.data&&d.appendByteArray(a.data);return d}function d(a,d){var f=new core.ByteArrayWriter("utf8"),c=0;f.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(c=a.data.length);f.appendUInt32LE(b(a.date));f.appendUInt32LE(n(a.data));f.appendUInt32LE(c);f.appendUInt32LE(c);f.appendUInt16LE(a.filename.length);f.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);f.appendUInt32LE(d);f.appendString(a.filename);return f}function t(a,d){if(a===m.length)d(null);else{var b=m[a];
void 0!==b.data?t(a+1,d):b.load(function(b){b?d(b):t(a+1,d)})}}function f(a,b){t(0,function(f){if(f)b(f);else{f=new core.ByteArrayWriter("utf8");var c,g,h,r=[0];for(c=0;c<m.length;c+=1)f.appendByteArrayWriter(e(m[c])),r.push(f.getLength());h=f.getLength();for(c=0;c<m.length;c+=1)g=m[c],f.appendByteArrayWriter(d(g,r[c]));c=f.getLength()-h;f.appendArray([80,75,5,6,0,0,0,0]);f.appendUInt16LE(m.length);f.appendUInt16LE(m.length);f.appendUInt32LE(c);f.appendUInt32LE(h);f.appendArray([0,0]);a(f.getByteArray())}})}
function s(a,d){f(function(b){runtime.writeFile(a,b,d)},d)}var m,r,q,w=(new core.RawInflate).inflate,u=this,y=new core.Base64;this.load=g;this.save=function(a,d,b,f){var c,e;for(c=0;c<m.length;c+=1)if(e=m[c],e.filename===a){e.set(a,d,b,f);return}e=new h(k);e.set(a,d,b,f);m.push(e)};this.write=function(a){s(k,a)};this.writeAs=s;this.createByteArray=f;this.loadContentXmlAsFragments=function(a,d){u.loadAsString(a,function(a,b){if(a)return d.rootElementReady(a);d.rootElementReady(null,b,!0)})};this.loadAsString=
function(a,d){g(a,function(a,b){if(a||null===b)return d(a,null);var f=runtime.byteArrayToString(b,"utf8");d(null,f)})};this.loadAsDOM=function(a,d){u.loadAsString(a,function(a,b){if(a||null===b)d(a,null);else{var f=(new DOMParser).parseFromString(b,"text/xml");d(null,f)}})};this.loadAsDataURL=function(a,d,b){g(a,function(a,f){if(a)return b(a,null);var c=0,e;d||(d=80===f[1]&&78===f[2]&&71===f[3]?"image/png":255===f[0]&&216===f[1]&&255===f[2]?"image/jpeg":71===f[0]&&73===f[1]&&70===f[2]?"image/gif":
"");for(e="data:"+d+";base64,";c<f.length;)e+=y.convertUTF8ArrayToBase64(f.slice(c,Math.min(c+45E3,f.length))),c+=45E3;b(null,e)})};this.getEntries=function(){return m.slice()};r=-1;null===l?m=[]:runtime.getFileSize(k,function(d){r=d;0>r?l("File '"+k+"' cannot be read.",u):runtime.read(k,r-22,22,function(d,b){d||null===l||null===b?l(d,u):a(b,l)})})};
// Input 18
core.CSSUnits=function(){var k={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(l,n,c){return l*k[c]/k[n]};this.convertMeasure=function(k,n){var c,b;k&&n?(c=parseFloat(k),b=k.replace(c.toString(),""),c=this.convert(c,b,n)):c="";return c.toString()};this.getUnits=function(k){return k.substr(k.length-2,k.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(k){var l=function(){};l.prototype=k;return new l});
xmldom.LSSerializer=function(){function k(b){var c=b||{},a=function(a){var d={},b;for(b in a)a.hasOwnProperty(b)&&(d[a[b]]=b);return d}(b),g=[c],e=[a],d=0;this.push=function(){d+=1;c=g[d]=Object.create(c);a=e[d]=Object.create(a)};this.pop=function(){g[d]=void 0;e[d]=void 0;d-=1;c=g[d];a=e[d]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(d){var b=d.namespaceURI,e=0,g;if(!b)return d.localName;if(g=a[b])return g+":"+d.localName;do{g||!d.prefix?(g="ns"+e,e+=1):g=d.prefix;
if(c[g]===b)break;if(!c[g]){c[g]=b;a[b]=g;break}g=null}while(null===g);return g+":"+d.localName}}function l(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function n(b,h){var a="",g=c.filter?c.filter.acceptNode(h):NodeFilter.FILTER_ACCEPT,e;if(g===NodeFilter.FILTER_ACCEPT&&h.nodeType===Node.ELEMENT_NODE){b.push();e=b.getQName(h);var d,k=h.attributes,f,s,m,r="",q;d="<"+e;f=k.length;for(s=0;s<f;s+=1)m=k.item(s),"http://www.w3.org/2000/xmlns/"!==
m.namespaceURI&&(q=c.filter?c.filter.acceptNode(m):NodeFilter.FILTER_ACCEPT,q===NodeFilter.FILTER_ACCEPT&&(q=b.getQName(m),m="string"===typeof m.value?l(m.value):m.value,r+=" "+(q+'="'+m+'"')));f=b.getLocalNamespaceDefinitions();for(s in f)f.hasOwnProperty(s)&&((k=f[s])?"xmlns"!==k&&(d+=" xmlns:"+f[s]+'="'+s+'"'):d+=' xmlns="'+s+'"');a+=d+(r+">")}if(g===NodeFilter.FILTER_ACCEPT||g===NodeFilter.FILTER_SKIP){for(g=h.firstChild;g;)a+=n(b,g),g=g.nextSibling;h.nodeValue&&(a+=l(h.nodeValue))}e&&(a+="</"+
e+">",b.pop());return a}var c=this;this.filter=null;this.writeToString=function(b,c){if(!b)return"";var a=new k(c);return n(a,b)}};
// Input 21
xmldom.RelaxNGParser=function(){function k(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function l(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return l({name:a.name,e:[b].concat(a.e.slice(2))})}function n(a){a=a.split(":",2);var b="",f;1===a.length?a=["",a[0]]:b=a[0];for(f in g)g[f]===b&&(a[0]=f);return a}function c(a,b){for(var f=0,e,g,h=a.name;a.e&&f<a.e.length;)if(e=
a.e[f],"ref"===e.name){g=b[e.a.name];if(!g)throw e.a.name+" was not defined.";e=a.e.slice(f+1);a.e=a.e.slice(0,f);a.e=a.e.concat(g.e);a.e=a.e.concat(e)}else f+=1,c(e,b);e=a.e;"choice"!==h||e&&e[1]&&"empty"!==e[1].name||(e&&e[0]&&"empty"!==e[0].name?(e[1]=e[0],e[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===h||"interleave"===h)"empty"===e[0].name?"empty"===e[1].name?(delete a.e,a.name="empty"):(h=a.name=e[1].name,a.names=e[1].names,e=a.e=e[1].e):"empty"===e[1].name&&(h=a.name=e[0].name,
a.names=e[0].names,e=a.e=e[0].e);"oneOrMore"===h&&"empty"===e[0].name&&(delete a.e,a.name="empty");if("attribute"===h){g=a.names?a.names.length:0;for(var q,k=[],u=[],f=0;f<g;f+=1)q=n(a.names[f]),u[f]=q[0],k[f]=q[1];a.localnames=k;a.namespaces=u}"interleave"===h&&("interleave"===e[0].name?a.e="interleave"===e[1].name?e[0].e.concat(e[1].e):[e[1]].concat(e[0].e):"interleave"===e[1].name&&(a.e=[e[0]].concat(e[1].e)))}function b(a,c){for(var f=0,e;a.e&&f<a.e.length;)e=a.e[f],"elementref"===e.name?(e.id=
e.id||0,a.e[f]=c[e.id]):"element"!==e.name&&b(e,c),f+=1}var h=this,a,g={"http://www.w3.org/XML/1998/namespace":"xml"},e;e=function(a,b,f){var c=[],m,h,q=a.localName,k=[];m=a.attributes;var u=q,y=k,v={},p,x;for(p=0;p<m.length;p+=1)if(x=m.item(p),x.namespaceURI)"http://www.w3.org/2000/xmlns/"===x.namespaceURI&&(g[x.value]=x.localName);else{"name"!==x.localName||"element"!==u&&"attribute"!==u||y.push(x.value);if("name"===x.localName||"combine"===x.localName||"type"===x.localName){var D=x,G;G=x.value;
G=G.replace(/^\s\s*/,"");for(var A=/\s/,N=G.length-1;A.test(G.charAt(N));)N-=1;G=G.slice(0,N+1);D.value=G}v[x.localName]=x.value}m=v;m.combine=m.combine||void 0;a=a.firstChild;u=c;y=k;for(v="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(p=e(a,b,u))"name"===p.name?y.push(g[p.a.ns]+":"+p.text):"choice"===p.name&&(p.names&&p.names.length)&&(y=y.concat(p.names),delete p.names),u.push(p)}else a.nodeType===Node.TEXT_NODE&&(v+=a.nodeValue);a=a.nextSibling}a=
v;"value"!==q&&"param"!==q&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===q&&void 0===m.type&&(m.type="token",m.datatypeLibrary="");"attribute"!==q&&"element"!==q||void 0===m.name||(h=n(m.name),c=[{name:"name",text:h[1],a:{ns:h[0]}}].concat(c),delete m.name);"name"===q||"nsName"===q||"value"===q?void 0===m.ns&&(m.ns=""):delete m.ns;"name"===q&&(h=n(a),m.ns=h[0],a=h[1]);1<c.length&&("define"===q||"oneOrMore"===q||"zeroOrMore"===q||"optional"===q||"list"===q||"mixed"===q)&&(c=[{name:"group",e:l({name:"group",
e:c}).e}]);2<c.length&&"element"===q&&(c=[c[0]].concat({name:"group",e:l({name:"group",e:c.slice(1)}).e}));1===c.length&&"attribute"===q&&c.push({name:"text",text:a});1!==c.length||"choice"!==q&&"group"!==q&&"interleave"!==q?2<c.length&&("choice"===q||"group"===q||"interleave"===q)&&(c=l({name:q,e:c}).e):(q=c[0].name,k=c[0].names,m=c[0].a,a=c[0].text,c=c[0].e);"mixed"===q&&(q="interleave",c=[c[0],{name:"text"}]);"optional"===q&&(q="choice",c=[c[0],{name:"empty"}]);"zeroOrMore"===q&&(q="choice",c=
[{name:"oneOrMore",e:[c[0]]},{name:"empty"}]);if("define"===q&&m.combine){a:{u=m.combine;y=m.name;v=c;for(p=0;f&&p<f.length;p+=1)if(x=f[p],"define"===x.name&&x.a&&x.a.name===y){x.e=[{name:u,e:x.e.concat(v)}];f=x;break a}f=null}if(f)return}f={name:q};c&&0<c.length&&(f.e=c);for(h in m)if(m.hasOwnProperty(h)){f.a=m;break}void 0!==a&&(f.text=a);k&&0<k.length&&(f.names=k);"element"===q&&(f.id=b.length,b.push(f),f={name:"elementref",id:f.id});return f};this.parseRelaxNGDOM=function(d,l){var f=[],s=e(d&&
d.documentElement,f,void 0),m,r,q={};for(m=0;m<s.e.length;m+=1)r=s.e[m],"define"===r.name?q[r.a.name]=r:"start"===r.name&&(a=r);if(!a)return[new k("No Relax NG start element was found.")];c(a,q);for(m in q)q.hasOwnProperty(m)&&c(q[m],q);for(m=0;m<f.length;m+=1)c(f[m],q);l&&(h.rootPattern=l(a.e[0],f));b(a,f);for(m=0;m<f.length;m+=1)b(f[m],f);h.start=a;h.elements=f;h.nsmap=g;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function k(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function l(a,b){return function(){var d={},c=0;return function(f){var e=f.hash||f.toString(),g;g=d[e];if(void 0!==g)return g;d[e]=g=b(f);g.hash=a+c.toString();c+=1;return g}}()}function n(a){return function(){var b={};return function(d){var c,f;f=b[d.localName];if(void 0===f)b[d.localName]=f={};else if(c=f[d.namespaceURI],void 0!==c)return c;return f[d.namespaceURI]=c=a(d)}}()}function c(a,
b,d){return function(){var c={},f=0;return function(e,g){var m=b&&b(e,g),h,p;if(void 0!==m)return m;m=e.hash||e.toString();h=g.hash||g.toString();p=c[m];if(void 0===p)c[m]=p={};else if(m=p[h],void 0!==m)return m;p[h]=m=d(e,g);m.hash=a+f.toString();f+=1;return m}}()}function b(a,d){"choice"===d.p1.type?b(a,d.p1):a[d.p1.hash]=d.p1;"choice"===d.p2.type?b(a,d.p2):a[d.p2.hash]=d.p2}function h(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return p},startTagOpenDeriv:function(d){return a.contains(d)?
m(b,x):p},attDeriv:function(){return p},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return x}}}function g(a,b,c,f){if(b===p)return p;if(f>=c.length)return b;0===f&&(f=0);for(var e=c.item(f);e.namespaceURI===d;){f+=1;if(f>=c.length)return b;e=c.item(f)}return e=g(a,b.attDeriv(a,c.item(f)),c,f+1)}function e(a,b,d){d.e[0].a?(a.push(d.e[0].text),b.push(d.e[0].a.ns)):e(a,b,d.e[0]);d.e[1].a?(a.push(d.e[1].text),b.push(d.e[1].a.ns)):
e(a,b,d.e[1])}var d="http://www.w3.org/2000/xmlns/",t,f,s,m,r,q,w,u,y,v,p={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return p},startTagOpenDeriv:function(){return p},attDeriv:function(){return p},startTagCloseDeriv:function(){return p},endTagDeriv:function(){return p}},x={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return p},startTagOpenDeriv:function(){return p},attDeriv:function(){return p},startTagCloseDeriv:function(){return x},endTagDeriv:function(){return p}},
D={type:"text",nullable:!0,hash:"text",textDeriv:function(){return D},startTagOpenDeriv:function(){return p},attDeriv:function(){return p},startTagCloseDeriv:function(){return D},endTagDeriv:function(){return p}},G,A,N;t=c("choice",function(a,b){if(a===p)return b;if(b===p||a===b)return a},function(a,d){var c={},f;b(c,{p1:a,p2:d});d=a=void 0;for(f in c)c.hasOwnProperty(f)&&(void 0===a?a=c[f]:d=void 0===d?c[f]:t(d,c[f]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(d,c){return t(a.textDeriv(d,c),b.textDeriv(d,c))},startTagOpenDeriv:n(function(d){return t(a.startTagOpenDeriv(d),b.startTagOpenDeriv(d))}),attDeriv:function(d,c){return t(a.attDeriv(d,c),b.attDeriv(d,c))},startTagCloseDeriv:k(function(){return t(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:k(function(){return t(a.endTagDeriv(),b.endTagDeriv())})}}(a,d)});f=function(a,b,d){return function(){var c={},f=0;return function(e,g){var m=b&&b(e,g),h,p;if(void 0!==m)return m;
m=e.hash||e.toString();h=g.hash||g.toString();m<h&&(p=m,m=h,h=p,p=e,e=g,g=p);p=c[m];if(void 0===p)c[m]=p={};else if(m=p[h],void 0!==m)return m;p[h]=m=d(e,g);m.hash=a+f.toString();f+=1;return m}}()}("interleave",function(a,b){if(a===p||b===p)return p;if(a===x)return b;if(b===x)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(d,c){return t(f(a.textDeriv(d,c),b),f(a,b.textDeriv(d,c)))},startTagOpenDeriv:n(function(d){return t(G(function(a){return f(a,
b)},a.startTagOpenDeriv(d)),G(function(b){return f(a,b)},b.startTagOpenDeriv(d)))}),attDeriv:function(d,c){return t(f(a.attDeriv(d,c),b),f(a,b.attDeriv(d,c)))},startTagCloseDeriv:k(function(){return f(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});s=c("group",function(a,b){if(a===p||b===p)return p;if(a===x)return b;if(b===x)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(d,c){var f=s(a.textDeriv(d,c),b);return a.nullable?t(f,b.textDeriv(d,
c)):f},startTagOpenDeriv:function(d){var c=G(function(a){return s(a,b)},a.startTagOpenDeriv(d));return a.nullable?t(c,b.startTagOpenDeriv(d)):c},attDeriv:function(d,c){return t(s(a.attDeriv(d,c),b),s(a,b.attDeriv(d,c)))},startTagCloseDeriv:k(function(){return s(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});m=c("after",function(a,b){if(a===p||b===p)return p},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(d,c){return m(a.textDeriv(d,c),b)},startTagOpenDeriv:n(function(d){return G(function(a){return m(a,
b)},a.startTagOpenDeriv(d))}),attDeriv:function(d,c){return m(a.attDeriv(d,c),b)},startTagCloseDeriv:k(function(){return m(a.startTagCloseDeriv(),b)}),endTagDeriv:k(function(){return a.nullable?b:p})}});r=l("oneormore",function(a){return a===p?p:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,d){return s(a.textDeriv(b,d),t(this,x))},startTagOpenDeriv:function(b){var d=this;return G(function(a){return s(a,t(d,x))},a.startTagOpenDeriv(b))},attDeriv:function(b,d){return s(a.attDeriv(b,
d),t(this,x))},startTagCloseDeriv:k(function(){return r(a.startTagCloseDeriv())})}});w=c("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(d,c){return a.contains(c)&&(b.nullable&&/^\s+$/.test(c.nodeValue)||b.textDeriv(d,c.nodeValue).nullable)?x:p},startTagCloseDeriv:function(){return p}}});q=l("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,d){return d===a?x:p},attDeriv:function(){return p},startTagCloseDeriv:function(){return this}}});
y=l("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return x},attDeriv:function(){return p},startTagCloseDeriv:function(){return this}}});G=function O(a,b){return"after"===b.type?m(b.p1,a(b.p2)):"choice"===b.type?t(O(a,b.p1),O(a,b.p2)):b};A=function(a,b,d){var c=d.currentNode;b=b.startTagOpenDeriv(c);b=g(a,b,c.attributes,0);var f=b=b.startTagCloseDeriv(),c=d.currentNode;b=d.firstChild();for(var e=[],m;b;)b.nodeType===Node.ELEMENT_NODE?e.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||e.push(b.nodeValue),b=d.nextSibling();0===e.length&&(e=[""]);m=f;for(f=0;m!==p&&f<e.length;f+=1)b=e[f],"string"===typeof b?m=/^\s*$/.test(b)?t(m,m.textDeriv(a,b)):m.textDeriv(a,b):(d.currentNode=b,m=A(a,m,d));d.currentNode=c;return b=m.endTagDeriv()};u=function(a){var b,d,c;if("name"===a.name)b=a.text,d=a.a.ns,a={name:b,ns:d,hash:"{"+d+"}"+b,contains:function(a){return a.namespaceURI===d&&a.localName===b}};else if("choice"===a.name){b=[];d=[];e(b,d,a);a="";for(c=0;c<b.length;c+=
1)a+="{"+d[c]+"}"+b[c]+",";a={hash:a,contains:function(a){var c;for(c=0;c<b.length;c+=1)if(b[c]===a.localName&&d[c]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};v=function z(b,d){var c,e;if("elementref"===b.name){c=b.id||0;b=d[c];if(void 0!==b.name){var g=b;c=d[g.id]={hash:"element"+g.id.toString()};g=h(u(g.e[0]),v(g.e[1],d));for(e in g)g.hasOwnProperty(e)&&(c[e]=g[e]);return c}return b}switch(b.name){case "empty":return x;case "notAllowed":return p;
case "text":return D;case "choice":return t(z(b.e[0],d),z(b.e[1],d));case "interleave":c=z(b.e[0],d);for(e=1;e<b.e.length;e+=1)c=f(c,z(b.e[e],d));return c;case "group":return s(z(b.e[0],d),z(b.e[1],d));case "oneOrMore":return r(z(b.e[0],d));case "attribute":return w(u(b.e[0]),z(b.e[1],d));case "value":return q(b.text);case "data":return c=b.a&&b.a.type,void 0===c&&(c=""),y(c);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var d={},c;for(c in b)b.hasOwnProperty(c)&&
(d[c]=b[c]);return c=v(a,d)};this.validate=function(a,b){var d;a.currentNode=a.root;d=A(null,N,a);d.nullable?b(null):(runtime.log("Error in Relax NG validation: "+d),b(["Error in Relax NG validation: "+d]))};this.init=function(a){N=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function k(a,b){this.message=function(){b&&(a+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function l(a,c,e,d){return"empty"===a.name?null:b(a,c,e,d)}function n(a,b){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var c=b.currentNode,d=c?c.nodeType:0,n=null;d>Node.ELEMENT_NODE;){if(d!==Node.COMMENT_NODE&&(d!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new k("Not allowed node of type "+
d+".")];d=(c=b.nextSibling())?c.nodeType:0}if(!c)return[new k("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(h[c.namespaceURI]+":"+c.localName))return[new k("Found "+c.nodeName+" instead of "+a.names+".",c)];if(b.firstChild()){for(n=l(a.e[1],b,c);b.nextSibling();)if(d=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||d===Node.COMMENT_NODE))return[new k("Spurious content.",b.currentNode)];if(b.parentNode()!==c)return[new k("Implementation error.")]}else n=
l(a.e[1],b,c);b.nextSibling();return n}var c,b,h;b=function(a,c,e,d){var h=a.name,f=null;if("text"===h)a:{for(var s=(a=c.currentNode)?a.nodeType:0;a!==e&&3!==s;){if(1===s){f=[new k("Element not allowed here.",a)];break a}s=(a=c.nextSibling())?a.nodeType:0}c.nextSibling();f=null}else if("data"===h)f=null;else if("value"===h)d!==a.text&&(f=[new k("Wrong value, should be '"+a.text+"', not '"+d+"'",e)]);else if("list"===h)f=null;else if("attribute"===h)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;h=a.localnames.length;for(f=0;f<h;f+=1){d=e.getAttributeNS(a.namespaces[f],a.localnames[f]);""!==d||e.hasAttributeNS(a.namespaces[f],a.localnames[f])||(d=void 0);if(void 0!==s&&void 0!==d){f=[new k("Attribute defined too often.",e)];break a}s=d}f=void 0===s?[new k("Attribute not found: "+a.names,e)]:l(a.e[1],c,e,s)}else if("element"===h)f=n(a,c);else if("oneOrMore"===h){d=0;do s=c.currentNode,h=b(a.e[0],c,e),d+=1;while(!h&&s!==c.currentNode);1<d?(c.currentNode=s,f=null):f=h}else if("choice"===
h){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;s=c.currentNode;if("empty"===a.e[0].name){if(h=b(a.e[1],c,e,d))c.currentNode=s;f=null}else{if(h=l(a.e[0],c,e,d))c.currentNode=s,h=b(a.e[1],c,e,d);f=h}}else if("group"===h){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;f=b(a.e[0],c,e)||b(a.e[1],c,e)}else if("interleave"===h)a:{s=a.e.length;d=[s];for(var m=s,r,q,w,u;0<m;){r=0;q=c.currentNode;for(f=0;f<s;f+=1)w=c.currentNode,!0!==d[f]&&d[f]!==w&&(u=a.e[f],(h=
b(u,c,e))?(c.currentNode=w,void 0===d[f]&&(d[f]=!1)):w===c.currentNode||"oneOrMore"===u.name||"choice"===u.name&&("oneOrMore"===u.e[0].name||"oneOrMore"===u.e[1].name)?(r+=1,d[f]=w):(r+=1,d[f]=!0));if(q===c.currentNode&&r===m){f=null;break a}if(0===r){for(f=0;f<s;f+=1)if(!1===d[f]){f=[new k("Interleave does not match.",e)];break a}f=null;break a}for(f=m=0;f<s;f+=1)!0!==d[f]&&(m+=1)}f=null}else throw h+" not allowed in nonEmptyPattern.";return f};this.validate=function(a,b){a.currentNode=a.root;var e=
l(c.e[0],a,a.root);b(e)};this.init=function(a,b){c=a;h=b}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function k(a,b,d){return-1!==a&&(a<b||-1===b)&&(a<d||-1===d)}function l(a){for(var b=[],d=0,c=a.length,e;d<c;){var g=a,h=c,l=b,n="",p=[],x=g.indexOf("[",d),D=g.indexOf("/",d),G=g.indexOf("=",d);k(D,x,G)?(n=g.substring(d,D),d=D+1):k(x,D,G)?(n=g.substring(d,x),d=t(g,x,p)):k(G,D,x)?(n=g.substring(d,G),d=G):(n=g.substring(d,h),d=h);l.push({location:n,predicates:p});if(d<c&&"="===a[d]){e=a.substring(d+1,c);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);else try{e=
parseInt(e,10)}catch(A){}d=c}}return{steps:b,value:e}}function n(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var d=b?null:a;b=!0;return d}}function c(a,b,d){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!(c=c.getAttributeNodeNS(b,d));)c=a.next();return c}}function b(a,b){var d=a.next(),c=null;this.reset=function(){a.reset();d=a.next();c=null};this.next=function(){for(;d;){if(c)if(b&&c.firstChild)c=c.firstChild;else{for(;!c.nextSibling&&
c!==d;)c=c.parentNode;c===d?d=a.next():c=c.nextSibling}else{do(c=d.firstChild)||(d=a.next());while(d&&!c)}if(c&&c.nodeType===Node.ELEMENT_NODE)return c}return null}}function h(a,b){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!b(d);)d=a.next();return d}}function a(a,b,d){b=b.split(":",2);var c=d(b[0]),e=b[1];return new h(a,function(a){return a.localName===e&&a.namespaceURI===c})}function g(a,b,c){var e=new n,g=d(e,b,c),k=b.value;return void 0===k?new h(a,function(a){e.setNode(a);
g.reset();return g.next()}):new h(a,function(a){e.setNode(a);g.reset();return(a=g.next())&&a.nodeValue===k})}function e(a,b,c){var e=a.ownerDocument,g=[],h=null;if(e&&e.evaluate)for(c=e.evaluate(b,a,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),h=c.iterateNext();null!==h;)h.nodeType===Node.ELEMENT_NODE&&g.push(h),h=c.iterateNext();else{g=new n;g.setNode(a);a=l(b);g=d(g,a,c);a=[];for(c=g.next();c;)a.push(c),c=g.next();g=a}return g}var d,t;t=function(a,b,d){for(var c=b,e=a.length,g=0;c<e;)"]"===
a[c]?(g-=1,0>=g&&d.push(l(a.substring(b,c)))):"["===a[c]&&(0>=g&&(b=c+1),g+=1),c+=1;return c};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};d=function(d,e,h){var k,q,l,u;for(k=0;k<e.steps.length;k+=1)for(l=e.steps[k],q=l.location,""===q?d=new b(d,!1):"@"===q[0]?(u=q.slice(1).split(":",2),d=new c(d,h(u[0]),u[1])):"."!==q&&(d=new b(d,!1),-1!==q.indexOf(":")&&(d=a(d,q,h))),q=0;q<l.predicates.length;q+=1)u=l.predicates[q],d=g(d,u,h);return d};xmldom.XPath=
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
gui.AnnotationViewManager=function(k,l,n){function c(a){var b=a.node,d=a.end;a=g.createRange();d&&(a.setStart(b,b.childNodes.length),a.setEnd(d,0),d=e.getTextNodes(a,!1),d.forEach(function(a){var d=g.createElement("span");d.className="annotationHighlight";d.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(d,a);d.appendChild(a)}));a.detach()}function b(){a.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?
-1:1})}function h(){var b;for(b=0;b<a.length;b+=1){var c=a[b],e=c.node.parentNode,h=e.nextSibling,l=h.nextSibling,q=e.parentNode,w=0,u=a[a.indexOf(c)-1],y=void 0,c=c.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],w=void 0,w=k.getZoomLevel();e.style.left=(n.getBoundingClientRect().left-q.getBoundingClientRect().left)/w+"px";e.style.width=n.getBoundingClientRect().width/w+"px";h.style.width=parseFloat(e.style.left)-30+"px";u&&(y=u.node.parentNode.getBoundingClientRect(),20>=(q.getBoundingClientRect().top-
y.bottom)/w?e.style.top=Math.abs(q.getBoundingClientRect().top-y.bottom)/w+20+"px":e.style.top="0px");l.style.left=h.getBoundingClientRect().width/w+"px";var h=l.style,q=l.getBoundingClientRect().left/w,u=l.getBoundingClientRect().top/w,y=e.getBoundingClientRect().left/w,v=e.getBoundingClientRect().top/w,p=0,x=0,p=y-q,p=p*p,x=v-u,x=x*x,q=Math.sqrt(p+x);h.width=q+"px";w=Math.asin((e.getBoundingClientRect().top-l.getBoundingClientRect().top)/(w*parseFloat(l.style.width)));l.style.transform="rotate("+
w+"rad)";l.style.MozTransform="rotate("+w+"rad)";l.style.WebkitTransform="rotate("+w+"rad)";l.style.msTransform="rotate("+w+"rad)";c&&(w=d.getComputedStyle(c,":before").content)&&"none"!==w&&(w=w.substring(1,w.length-1),c.firstChild?c.firstChild.nodeValue=w:c.appendChild(g.createTextNode(w)))}}var a=[],g=l.ownerDocument,e=new odf.OdfUtils,d=runtime.getWindow();runtime.assert(Boolean(d),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=h;this.addAnnotation=
function(d){a.push({node:d.node,end:d.end});b();var e=g.createElement("div"),k=g.createElement("div"),m=g.createElement("div"),l=g.createElement("div"),q=d.node;e.className="annotationWrapper";q.parentNode.insertBefore(e,q);k.className="annotationNote";k.appendChild(q);m.className="annotationConnector horizontal";l.className="annotationConnector angular";e.appendChild(k);e.appendChild(m);e.appendChild(l);d.end&&c(d);h()};this.forgetAnnotations=function(){for(;a.length;){var b=a[0],d=b.node,c=d.parentNode.parentNode;
"div"===c.localName&&(c.parentNode.insertBefore(d,c),c.parentNode.removeChild(c));for(var d=b.node.getAttributeNS(odf.Namespaces.officens,"name"),d=g.querySelectorAll('span.annotationHighlight[annotation="'+d+'"]'),e=c=void 0,h=void 0,k=void 0,c=0;c<d.length;c+=1){h=d[c];k=h.childNodes;for(e=0;e<k.length;e+=1)h.parentNode.insertBefore(k[e],h);h.parentNode.removeChild(h)}a.splice(a.indexOf(b),1)}}};
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
odf.Namespaces=function(){function k(c){return l[c]||null}var l={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",dc:"http://purl.org/dc/elements/1.1/",webodf:"urn:webodf"},n;k.lookupNamespaceURI=k;n=function(){};n.forEachPrefix=function(c){for(var b in l)l.hasOwnProperty(b)&&c(b,l[b])};n.resolvePrefix=k;n.namespaceMap=l;n.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";n.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
n.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";n.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";n.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";n.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";n.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";n.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";n.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";n.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
n.xlinkns="http://www.w3.org/1999/xlink";n.xmlns="http://www.w3.org/XML/1998/namespace";n.dcns="http://purl.org/dc/elements/1.1/";n.webodfns="urn:webodf";return n}();
// Input 28
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function k(a,b){for(var d=s[a.localName],c=d&&d[a.namespaceURI],e=c?c.length:0,f,d=0;d<e;d+=1)(f=a.getAttributeNS(c[d].ns,c[d].localname))&&a.setAttributeNS(c[d].ns,t[c[d].ns]+c[d].localname,b+f);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(c=d,k(c,b)),d=d.nextSibling}function l(a,b){for(var d=s[a.localName],c=d&&d[a.namespaceURI],e=c?c.length:0,f,d=0;d<e;d+=1)if(f=a.getAttributeNS(c[d].ns,c[d].localname))f=f.replace(b,""),a.setAttributeNS(c[d].ns,t[c[d].ns]+c[d].localname,
f);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(c=d,l(c,b)),d=d.nextSibling}function n(a,b){var d=s[a.localName],c=(d=d&&d[a.namespaceURI])?d.length:0,e,f,g;for(g=0;g<c;g+=1)if(e=a.getAttributeNS(d[g].ns,d[g].localname))b=b||{},f=d[g].keyname,f=b[f]=b[f]||{},f[e]=1;return b}function c(a,b){var d,e;n(a,b);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(e=d,c(e,b)),d=d.nextSibling}function b(a,b,d){this.key=a;this.name=b;this.family=d;this.requires={}}function h(a,d,c){var e=a+'"'+
d,f=c[e];f||(f=c[e]=new b(e,a,d));return f}function a(b,c,e){var f=s[b.localName],g=(f=f&&f[b.namespaceURI])?f.length:0,m=b.getAttributeNS(d,"name"),p=b.getAttributeNS(d,"family"),k;m&&p&&(c=h(m,p,e));if(c)for(m=0;m<g;m+=1)if(p=b.getAttributeNS(f[m].ns,f[m].localname))k=f[m].keyname,p=h(p,k,e),c.requires[p.key]=p;for(m=b.firstChild;m;)m.nodeType===Node.ELEMENT_NODE&&(b=m,a(b,c,e)),m=m.nextSibling;return e}function g(a,b){var d=b[a.family];d||(d=b[a.family]={});d[a.name]=1;Object.keys(a.requires).forEach(function(d){g(a.requires[d],
b)})}function e(b,d){var c=a(b,null,{});Object.keys(c).forEach(function(a){a=c[a];var b=d[a.family];b&&b.hasOwnProperty(a.name)&&g(a,d)})}var d="urn:oasis:names:tc:opendocument:xmlns:style:1.0",t={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:","urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},f={text:[{ens:d,
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
a:"page-layout-name"}]},s,m=new xmldom.XPath;this.UsedStyleList=function(a,b){var f={};this.uses=function(a){var b=a.localName,c=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(d,"name");a="style"===b?a.getAttributeNS(d,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":b;return(a=f[a])?0<a[c]:!1};c(a,f);b&&e(b,f)};this.hasDerivedStyles=function(a,b,d){var c=b("style"),e=d.getAttributeNS(c,"name");d=d.getAttributeNS(c,
"family");return m.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+d+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,c){var e;if(a){for(e=a.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE){var f=e,g=b,h=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),m=void 0;h?m="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(h=f.getAttributeNS(d,"name"))&&(m=d);m&&f.setAttributeNS(m,t[m]+"name",g+h)}e=e.nextSibling}k(a,b);c&&k(c,
b)}};this.removePrefixFromStyleNames=function(a,b,c){var e=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var f=b,g=e,h=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),m=void 0;h?m="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(h=f.getAttributeNS(d,"name"))&&(m=d);m&&(h=h.replace(g,""),f.setAttributeNS(m,t[m]+"name",h))}b=b.nextSibling}l(a,e);c&&l(c,e)}};this.determineStylesForNode=n;s=function(a){var b,d,c,e,f,g={},h;for(b in a)if(a.hasOwnProperty(b))for(e=
a[b],c=e.length,d=0;d<c;d+=1)f=e[d],h=g[f.en]=g[f.en]||{},h=h[f.ens]=h[f.ens]||[],h.push({ns:f.ans,localname:f.a,keyname:b});return g}(f)};
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
odf.OdfUtils=function(){function k(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===w}function l(a){for(;a&&!k(a);)a=a.parentNode;return a}function n(a){return/^[ \t\r\n]+$/.test(a)}function c(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===w||"span"===b&&"annotationHighlight"===a.className?!0:!1}function b(a){var b=a&&a.localName,d,c=!1;b&&(d=a.namespaceURI,d===w?c="s"===b||"tab"===b||"line-break"===b:d===u&&(c="frame"===b&&"as-char"===a.getAttributeNS(w,
"anchor-type")));return c}function h(a){for(;null!==a.firstChild&&c(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&c(a);)a=a.lastChild;return a}function g(b){for(;!k(b)&&null===b.previousSibling;)b=b.parentNode;return k(b)?null:a(b.previousSibling)}function e(a){for(;!k(a)&&null===a.nextSibling;)a=a.parentNode;return k(a)?null:h(a.nextSibling)}function d(a){for(var d=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=g(a);else return!n(a.data.substr(a.length-1,1));else b(a)?
(d=!0,a=null):a=g(a);return d}function t(a){var d=!1;for(a=a&&h(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!n(a.data)){d=!0;break}if(b(a)){d=!0;break}a=e(a)}return d}function f(a,b){return n(a.data.substr(b))?!t(e(a)):!1}function s(a,c){var e=a.data,h;if(!n(e[c])||b(a.parentNode))return!1;0<c?n(e[c-1])||(h=!0):d(g(a))&&(h=!0);return!0===h?f(a,c)?!1:!0:!1}function m(a){return(a=/-?([0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function r(a){return(a=m(a))&&"%"!==a.unit?null:a}function q(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var w=
"urn:oasis:names:tc:opendocument:xmlns:text:1.0",u="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",y=/^\s*$/,v=new core.DomUtils;this.isParagraph=k;this.getParagraphElement=l;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===w&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===w};this.isODFWhitespace=n;this.isGroupingElement=c;this.isCharacterElement=b;this.firstChild=
h;this.lastChild=a;this.previousNode=g;this.nextNode=e;this.scanLeftForNonWhitespace=d;this.lookLeftForCharacter=function(a){var c;c=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(c=a.data,c=n(c.substr(c.length-1,1))?1===c.length?d(g(a))?2:0:n(c.substr(c.length-2,1))?0:2:1):b(a)&&(c=1);return c};this.lookRightForCharacter=function(a){var d=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?d=!n(a.data.substr(0,1)):b(a)&&(d=!0);return d};this.scanLeftForAnyCharacter=function(d){var c=!1;for(d=d&&a(d);d;){if(d.nodeType===
Node.TEXT_NODE&&0<d.length&&!n(d.data)){c=!0;break}if(b(d)){c=!0;break}d=g(d)}return c};this.scanRightForAnyCharacter=t;this.isTrailingWhitespace=f;this.isSignificantWhitespace=s;this.getFirstNonWhitespaceChild=function(a){for(a=a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&y.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=m;this.parseFoFontSize=function(a){var b;b=(b=m(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||r(a)};this.parseFoLineHeight=function(a){var b;b=(b=m(a))&&(0>b.value||
"%"===b.unit)?null:b;return b||r(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,d=[];for(b.nodeType===Node.ELEMENT_NODE&&(d=v.getElementsByTagNameNS(b,w,"p").concat(v.getElementsByTagNameNS(b,w,"h")));b&&!k(b);)b=b.parentNode;b&&d.push(b);return d.filter(function(b){return v.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var d=a.startContainer.ownerDocument.createRange(),c;c=v.getNodesInRange(a,function(c){d.selectNodeContents(c);if(c.nodeType===Node.TEXT_NODE){if(b&&
v.rangesIntersect(a,d)||v.containsRange(a,d))return Boolean(l(c)&&(!n(c.textContent)||s(c,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(v.rangesIntersect(a,d)&&q(c))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});d.detach();return c};this.getTextElements=function(a,d){var e=a.startContainer.ownerDocument.createRange(),f;f=v.getNodesInRange(a,function(f){var g=f.nodeType;e.selectNodeContents(f);if(g===Node.TEXT_NODE){if(v.containsRange(a,e)&&(d||Boolean(l(f)&&(!n(f.textContent)||
s(f,0)))))return NodeFilter.FILTER_ACCEPT}else if(b(f)){if(v.containsRange(a,e))return NodeFilter.FILTER_ACCEPT}else if(q(f)||c(f))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});e.detach();return f};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),d;d=v.getNodesInRange(a,function(d){b.selectNodeContents(d);if(k(d)){if(v.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(q(d)||c(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});
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
odf.TextSerializer=function(){function k(c){var b="",h=l.filter?l.filter.acceptNode(c):NodeFilter.FILTER_ACCEPT,a=c.nodeType,g;if(h===NodeFilter.FILTER_ACCEPT||h===NodeFilter.FILTER_SKIP)for(g=c.firstChild;g;)b+=k(g),g=g.nextSibling;h===NodeFilter.FILTER_ACCEPT&&(a===Node.ELEMENT_NODE&&n.isParagraph(c)?b+="\n":a===Node.TEXT_NODE&&c.textContent&&(b+=c.textContent));return b}var l=this,n=new odf.OdfUtils;this.filter=null;this.writeToString=function(c){return c?k(c):""}};
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
odf.TextStyleApplicator=function(k,l,n){function c(a){function b(a,d){return"object"===typeof a&&"object"===typeof d?Object.keys(a).every(function(c){return b(a[c],d[c])}):a===d}this.isStyleApplied=function(c){c=l.getAppliedStylesForElement(c);return b(a,c)}}function b(b){var c={};this.applyStyleToContainer=function(f){var h;h=f.getAttributeNS(a,"style-name");var m=f.ownerDocument;h=h||"";if(!c.hasOwnProperty(h)){var r=h,q=h,w;q?(w=l.getStyleElement(q,"text"),w.parentNode===n?m=w.cloneNode(!0):(m=
m.createElementNS(g,"style:style"),m.setAttributeNS(g,"style:parent-style-name",q),m.setAttributeNS(g,"style:family","text"),m.setAttributeNS(e,"scope","document-content"))):(m=m.createElementNS(g,"style:style"),m.setAttributeNS(g,"style:family","text"),m.setAttributeNS(e,"scope","document-content"));l.updateStyle(m,b,k);n.appendChild(m);c[r]=m}h=c[h].getAttributeNS(g,"name");f.setAttributeNS(a,"text:style-name",h)}}var h=new core.DomUtils,a=odf.Namespaces.textns,g=odf.Namespaces.stylens,e="urn:webodf:names:scope";
this.applyStyle=function(d,e,f){var g={},m,k,l,n;runtime.assert(f&&f["style:text-properties"],"applyStyle without any text properties");g["style:text-properties"]=f["style:text-properties"];l=new b(g);n=new c(g);d.forEach(function(b){m=n.isStyleApplied(b);if(!1===m){var d=b.ownerDocument,c=b.parentNode,f,g=b,s=new core.LoopWatchDog(1E3);"span"===c.localName&&c.namespaceURI===a?(b.previousSibling&&!h.rangeContainsNode(e,b.previousSibling)?(d=c.cloneNode(!1),c.parentNode.insertBefore(d,c.nextSibling)):
d=c,f=!0):(d=d.createElementNS(a,"text:span"),c.insertBefore(d,b),f=!1);for(;g&&(g===b||h.rangeContainsNode(e,g));)s.check(),c=g.nextSibling,g.parentNode!==d&&d.appendChild(g),g=c;if(g&&f)for(b=d.cloneNode(!1),d.parentNode.insertBefore(b,d.nextSibling);g;)s.check(),c=g.nextSibling,b.appendChild(g),g=c;k=d;l.applyStyleToContainer(k)}})}};
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
odf.Style2CSS=function(){function k(a){var b={},d,c;if(!a)return b;for(a=a.firstChild;a;){if(c=a.namespaceURI!==r||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===w&&"list-style"===a.localName?"list":a.namespaceURI!==r||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(r,"family"))(d=a.getAttributeNS&&a.getAttributeNS(r,"name"))||(d=""),c=b[c]=b[c]||{},c[d]=a;a=a.nextSibling}return b}function l(a,b){if(!b||!a)return null;if(a[b])return a[b];
var d,c;for(d in a)if(a.hasOwnProperty(d)&&(c=l(a[d].derivedStyles,b)))return c;return null}function n(a,b,d){var c=b[a],e,f;c&&(e=c.getAttributeNS(r,"parent-style-name"),f=null,e&&(f=l(d,e),!f&&b[e]&&(n(e,b,d),f=b[e],b[e]=null)),f?(f.derivedStyles||(f.derivedStyles={}),f.derivedStyles[a]=c):d[a]=c)}function c(a,b){for(var d in a)a.hasOwnProperty(d)&&(n(d,a,b),a[d]=null)}function b(a,b){var d=v[a],c;if(null===d)return null;c=b?"["+d+'|style-name="'+b+'"]':"["+d+"|style-name]";"presentation"===d&&
(d="draw",c=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return d+"|"+p[a].join(c+","+d+"|")+c}function h(a,d,c){var e=[],f,g;e.push(b(a,d));for(f in c.derivedStyles)if(c.derivedStyles.hasOwnProperty(f))for(g in d=h(a,f,c.derivedStyles[f]),d)d.hasOwnProperty(g)&&e.push(d[g]);return e}function a(a,b,d){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===d)return b=a;a=a.nextSibling}return null}function g(a,b){var d="",c,e;for(c in b)b.hasOwnProperty(c)&&
(c=b[c],e=a.getAttributeNS(c[0],c[1]),c[2]&&e&&(d+=c[2]+":"+e+";"));return d}function e(b){return(b=a(b,r,"text-properties"))?V.parseFoFontSize(b.getAttributeNS(m,"font-size")):null}function d(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,d,c){return b+b+d+d+c+c});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function t(a,b,d,c){b='text|list[text|style-name="'+b+'"]';var e=d.getAttributeNS(w,"level"),
f;d=V.getFirstNonWhitespaceChild(d);d=V.getFirstNonWhitespaceChild(d);var g;d&&(f=d.attributes,g=f["fo:text-indent"]?f["fo:text-indent"].value:void 0,f=f["fo:margin-left"]?f["fo:margin-left"].value:void 0);g||(g="-0.6cm");d="-"===g.charAt(0)?g.substring(1):"-"+g;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";void 0!==f&&(f=e+"{margin-left:"+f+";}",a.insertRule(f,a.cssRules.length));c=b+" > text|list-item > *:not(text|list):first-child:before{"+
c+";";c+="counter-increment:list;";c+="margin-left:"+g+";";c+="width:"+d+";";c+="display:inline-block}";try{a.insertRule(c,a.cssRules.length)}catch(h){throw h;}}function f(b,c,k,l){if("list"===c)for(var q=l.firstChild,p,n;q;){if(q.namespaceURI===w)if(p=q,"list-level-style-number"===q.localName){var v=p;n=v.getAttributeNS(r,"num-format");var K=v.getAttributeNS(r,"num-suffix"),E={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},v=v.getAttributeNS(r,"num-prefix")||"",v=E.hasOwnProperty(n)?
v+(" counter(list, "+E[n]+")"):n?v+("'"+n+"';"):v+" ''";K&&(v+=" '"+K+"'");n="content: "+v+";";t(b,k,p,n)}else"list-level-style-image"===q.localName?(n="content: none;",t(b,k,p,n)):"list-level-style-bullet"===q.localName&&(n="content: '"+p.getAttributeNS(w,"bullet-char")+"';",t(b,k,p,n));q=q.nextSibling}else if("page"===c)if(K=p=k="",q=l.getElementsByTagNameNS(r,"page-layout-properties")[0],p=q.parentNode.parentNode.parentNode.masterStyles,K="",k+=g(q,I),n=q.getElementsByTagNameNS(r,"background-image"),
0<n.length&&(K=n.item(0).getAttributeNS(u,"href"))&&(k+="background-image: url('odfkit:"+K+"');",n=n.item(0),k+=g(n,D)),"presentation"===ma){if(p)for(n=p.getElementsByTagNameNS(r,"master-page"),E=0;E<n.length;E+=1)if(n[E].getAttributeNS(r,"page-layout-name")===q.parentNode.getAttributeNS(r,"name")){K=n[E].getAttributeNS(r,"name");p="draw|page[draw|master-page-name="+K+"] {"+k+"}";K="office|body, draw|page[draw|master-page-name="+K+"] {"+g(q,X)+" }";try{b.insertRule(p,b.cssRules.length),b.insertRule(K,
b.cssRules.length)}catch(fa){throw fa;}}}else{if("text"===ma){p="office|text {"+k+"}";K="office|body {width: "+q.getAttributeNS(m,"page-width")+";}";try{b.insertRule(p,b.cssRules.length),b.insertRule(K,b.cssRules.length)}catch(ha){throw ha;}}}else{k=h(c,k,l).join(",");q="";if(p=a(l,r,"text-properties")){var E=p,Z;n=Z="";K=1;p=""+g(E,x);v=E.getAttributeNS(r,"text-underline-style");"solid"===v&&(Z+=" underline");v=E.getAttributeNS(r,"text-line-through-style");"solid"===v&&(Z+=" line-through");Z.length&&
(p+="text-decoration:"+Z+";");if(Z=E.getAttributeNS(r,"font-name")||E.getAttributeNS(m,"font-family"))v=ea[Z],p+="font-family: "+(v||Z)+", sans-serif;";v=E.parentNode;if(E=e(v)){for(;v;){if(E=e(v)){if("%"!==E.unit){n="font-size: "+E.value*K+E.unit+";";break}K*=E.value/100}E=v;Z=v="";v=null;"default-style"===E.localName?v=null:(v=E.getAttributeNS(r,"parent-style-name"),Z=E.getAttributeNS(r,"family"),v=M.getODFElementsWithXPath(da,v?"//style:*[@style:name='"+v+"'][@style:family='"+Z+"']":"//style:default-style[@style:family='"+
Z+"']",odf.Namespaces.resolvePrefix)[0])}n||(n="font-size: "+parseFloat(ba)*K+$.getUnits(ba)+";");p+=n}q+=p}if(p=a(l,r,"paragraph-properties"))n=p,p=""+g(n,G),K=n.getElementsByTagNameNS(r,"background-image"),0<K.length&&(E=K.item(0).getAttributeNS(u,"href"))&&(p+="background-image: url('odfkit:"+E+"');",K=K.item(0),p+=g(K,D)),(n=n.getAttributeNS(m,"line-height"))&&"normal"!==n&&(n=V.parseFoLineHeight(n),p="%"!==n.unit?p+("line-height: "+n.value+n.unit+";"):p+("line-height: "+n.value/100+";")),q+=
p;if(p=a(l,r,"graphic-properties"))E=p,p=""+g(E,A),n=E.getAttributeNS(s,"opacity"),K=E.getAttributeNS(s,"fill"),E=E.getAttributeNS(s,"fill-color"),"solid"===K||"hatch"===K?E&&"none"!==E?(n=isNaN(parseFloat(n))?1:parseFloat(n)/100,(E=d(E))&&(p+="background-color: rgba("+E.r+","+E.g+","+E.b+","+n+");")):p+="background: none;":"none"===K&&(p+="background: none;"),q+=p;if(p=a(l,r,"drawing-page-properties"))n=""+g(p,A),"true"===p.getAttributeNS(y,"background-visible")&&(n+="background: none;"),q+=n;if(p=
a(l,r,"table-cell-properties"))p=""+g(p,N),q+=p;if(p=a(l,r,"table-row-properties"))p=""+g(p,O),q+=p;if(p=a(l,r,"table-column-properties"))p=""+g(p,B),q+=p;if(p=a(l,r,"table-properties"))p=""+g(p,z),q+=p;if(0!==q.length)try{b.insertRule(k+"{"+q+"}",b.cssRules.length)}catch(ia){throw ia;}}for(var Q in l.derivedStyles)l.derivedStyles.hasOwnProperty(Q)&&f(b,c,Q,l.derivedStyles[Q])}var s=odf.Namespaces.drawns,m=odf.Namespaces.fons,r=odf.Namespaces.stylens,q=odf.Namespaces.svgns,w=odf.Namespaces.textns,
u=odf.Namespaces.xlinkns,y=odf.Namespaces.presentationns,v={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},p={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),
presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background",
"table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},x=[[m,"color","color"],[m,"background-color","background-color"],[m,"font-weight","font-weight"],[m,"font-style","font-style"]],D=[[r,"repeat","background-repeat"]],G=[[m,"background-color","background-color"],[m,"text-align","text-align"],[m,"text-indent","text-indent"],[m,"padding","padding"],[m,"padding-left","padding-left"],[m,"padding-right","padding-right"],[m,"padding-top","padding-top"],[m,"padding-bottom","padding-bottom"],[m,"border-left","border-left"],[m,"border-right",
"border-right"],[m,"border-top","border-top"],[m,"border-bottom","border-bottom"],[m,"margin","margin"],[m,"margin-left","margin-left"],[m,"margin-right","margin-right"],[m,"margin-top","margin-top"],[m,"margin-bottom","margin-bottom"],[m,"border","border"]],A=[[m,"background-color","background-color"],[m,"min-height","min-height"],[s,"stroke","border"],[q,"stroke-color","border-color"],[q,"stroke-width","border-width"]],N=[[m,"background-color","background-color"],[m,"border-left","border-left"],
[m,"border-right","border-right"],[m,"border-top","border-top"],[m,"border-bottom","border-bottom"],[m,"border","border"]],B=[[r,"column-width","width"]],O=[[r,"row-height","height"],[m,"keep-together",null]],z=[[r,"width","width"],[m,"margin-left","margin-left"],[m,"margin-right","margin-right"],[m,"margin-top","margin-top"],[m,"margin-bottom","margin-bottom"]],I=[[m,"background-color","background-color"],[m,"padding","padding"],[m,"padding-left","padding-left"],[m,"padding-right","padding-right"],
[m,"padding-top","padding-top"],[m,"padding-bottom","padding-bottom"],[m,"border","border"],[m,"border-left","border-left"],[m,"border-right","border-right"],[m,"border-top","border-top"],[m,"border-bottom","border-bottom"],[m,"margin","margin"],[m,"margin-left","margin-left"],[m,"margin-right","margin-right"],[m,"margin-top","margin-top"],[m,"margin-bottom","margin-bottom"]],X=[[m,"page-width","width"],[m,"page-height","height"]],ea={},V=new odf.OdfUtils,ma,da,ba,M=new xmldom.XPath,$=new core.CSSUnits;
this.style2css=function(a,b,d,e,g){for(var h,m,l,p;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);h=null;e&&(h=e.ownerDocument,da=e.parentNode);g&&(h=g.ownerDocument,da=g.parentNode);if(h)for(p in odf.Namespaces.forEachPrefix(function(a,d){l="@namespace "+a+" url("+d+");";try{b.insertRule(l,b.cssRules.length)}catch(c){}}),ea=d,ma=a,ba=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=k(e),e=k(g),g={},v)if(v.hasOwnProperty(p))for(m in d=g[p]={},
c(a[p],d),c(e[p],d),d)d.hasOwnProperty(m)&&f(b,p,m,d[m])}};
// Input 33
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function k(a,b,d){for(a=a?a.firstChild:null;a;){if(a.localName===d&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function l(a){var b,d=f.length;for(b=0;b<d;b+=1)if(a.namespaceURI===e&&a.localName===f[b])return b;return-1}function n(a,b){var d=new g.UsedStyleList(a,b),c=new odf.OdfNodeFilter;this.acceptNode=function(a){var e=c.acceptNode(a);e===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&(e=d.uses(a)?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT);return e}}function c(a,b){var d=new n(a,b);this.acceptNode=function(a){var b=d.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function b(a,b){if(b){var d=l(b),c,e=a.firstChild;if(-1!==d){for(;e;){c=l(e);if(-1!==c&&c>d)break;e=e.nextSibling}a.insertBefore(b,e)}}}function h(a){this.OdfContainer=a}function a(a,
b,d,c){var e=this;this.size=0;this.type=null;this.name=a;this.container=d;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==c&&(this.mimetype=b,c.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var g=new odf.StyleInfo,e="urn:oasis:names:tc:opendocument:xmlns:office:1.0",d="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
t="urn:webodf:names:scope",f="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),s=(new Date).getTime()+"_webodf_",m=new core.Base64;h.prototype=new function(){};h.prototype.constructor=h;h.namespaceURI=e;h.localName="document";a.prototype.load=function(){};a.prototype.getUrl=function(){return this.data?"data:;base64,"+m.toBase64(this.data):null};odf.OdfContainer=function q(f,m){function l(a){for(var b=a.firstChild,d;b;)d=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?
l(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=d}function v(a,b){for(var d=a&&a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&d.setAttributeNS(t,"scope",b),d=d.nextSibling}function p(a,b){var d=null,c,e,f;if(a)for(d=a.cloneNode(!0),c=d.firstChild;c;)e=c.nextSibling,c.nodeType===Node.ELEMENT_NODE&&(f=c.getAttributeNS(t,"scope"))&&f!==b&&d.removeChild(c),c=e;return d}function x(a){var b=J.rootElement.ownerDocument,d;if(a){l(a.documentElement);try{d=b.importNode(a.documentElement,
!0)}catch(c){}}return d}function D(a){J.state=a;if(J.onchange)J.onchange(J);if(J.onstatereadychange)J.onstatereadychange(J)}function G(a){S=null;J.rootElement=a;a.fontFaceDecls=k(a,e,"font-face-decls");a.styles=k(a,e,"styles");a.automaticStyles=k(a,e,"automatic-styles");a.masterStyles=k(a,e,"master-styles");a.body=k(a,e,"body");a.meta=k(a,e,"meta")}function A(a){a=x(a);var d=J.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===e?(d.fontFaceDecls=k(a,e,"font-face-decls"),b(d,d.fontFaceDecls),
d.styles=k(a,e,"styles"),b(d,d.styles),d.automaticStyles=k(a,e,"automatic-styles"),v(d.automaticStyles,"document-styles"),b(d,d.automaticStyles),d.masterStyles=k(a,e,"master-styles"),b(d,d.masterStyles),g.prefixStyleNames(d.automaticStyles,s,d.masterStyles)):D(q.INVALID)}function N(a){a=x(a);var d,c,f;if(a&&"document-content"===a.localName&&a.namespaceURI===e){d=J.rootElement;c=k(a,e,"font-face-decls");if(d.fontFaceDecls&&c)for(f=c.firstChild;f;)d.fontFaceDecls.appendChild(f),f=c.firstChild;else c&&
(d.fontFaceDecls=c,b(d,c));c=k(a,e,"automatic-styles");v(c,"document-content");if(d.automaticStyles&&c)for(f=c.firstChild;f;)d.automaticStyles.appendChild(f),f=c.firstChild;else c&&(d.automaticStyles=c,b(d,c));d.body=k(a,e,"body");b(d,d.body)}else D(q.INVALID)}function B(a){a=x(a);var d;a&&("document-meta"===a.localName&&a.namespaceURI===e)&&(d=J.rootElement,d.meta=k(a,e,"meta"),b(d,d.meta))}function O(a){a=x(a);var d;a&&("document-settings"===a.localName&&a.namespaceURI===e)&&(d=J.rootElement,d.settings=
k(a,e,"settings"),b(d,d.settings))}function z(a){a=x(a);var b;if(a&&"manifest"===a.localName&&a.namespaceURI===d)for(b=J.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===d)&&(L[a.getAttributeNS(d,"full-path")]=a.getAttributeNS(d,"media-type")),a=a.nextSibling}function I(a){var b=a.shift(),d,c;b?(d=b[0],c=b[1],R.loadAsDOM(d,function(b,d){c(d);b||J.state===q.INVALID||I(a)})):D(q.DONE)}function X(a){var b="";odf.Namespaces.forEachPrefix(function(a,
d){b+=" xmlns:"+a+'="'+d+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function ea(){var a=new xmldom.LSSerializer,b=X("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(J.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function V(a,b){var c=document.createElementNS(d,"manifest:file-entry");c.setAttributeNS(d,"manifest:full-path",a);c.setAttributeNS(d,"manifest:media-type",b);return c}function ma(){var a=
runtime.parseXML('<manifest:manifest xmlns:manifest="'+d+'"></manifest:manifest>'),b=k(a,d,"manifest"),c=new xmldom.LSSerializer,e;for(e in L)L.hasOwnProperty(e)&&b.appendChild(V(e,L[e]));c.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+c.writeToString(a,odf.Namespaces.namespaceMap)}function da(){var a=new xmldom.LSSerializer,b=X("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(J.rootElement.settings,odf.Namespaces.namespaceMap);
return b+"</office:document-settings>"}function ba(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,d=p(J.rootElement.automaticStyles,"document-styles"),c=J.rootElement.masterStyles&&J.rootElement.masterStyles.cloneNode(!0),e=X("document-styles");g.removePrefixFromStyleNames(d,s,c);b.filter=new n(c,d);e+=b.writeToString(J.rootElement.fontFaceDecls,a);e+=b.writeToString(J.rootElement.styles,a);e+=b.writeToString(d,a);e+=b.writeToString(c,a);return e+"</office:document-styles>"}function M(){var a=
odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,d=p(J.rootElement.automaticStyles,"document-content"),e=X("document-content");b.filter=new c(J.rootElement.body,d);e+=b.writeToString(d,a);e+=b.writeToString(J.rootElement.body,a);return e+"</office:document-content>"}function $(a,b){runtime.loadXML(a,function(a,d){if(a)b(a);else{var c=x(d);c&&"document"===c.localName&&c.namespaceURI===e?(G(c),D(q.DONE)):D(q.INVALID)}})}function T(){function a(b,d){var f;d||(d=b);f=document.createElementNS(e,d);
c[b]=f;c.appendChild(f)}var b=new core.Zip("",null),d=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),c=J.rootElement,f=document.createElementNS(e,"text");b.save("mimetype",d,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");c.body.appendChild(f);D(q.DONE);return b}function P(){var a,b=new Date;a=runtime.byteArrayFromString(da(),"utf8");
R.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(ea(),"utf8");R.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(ba(),"utf8");R.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(M(),"utf8");R.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(ma(),"utf8");R.save("META-INF/manifest.xml",a,!0,b)}function F(a,b){P();R.writeAs(a,function(a){b(a)})}var J=this,R,L={},S;this.onstatereadychange=m;this.rootElement=this.state=this.onchange=null;this.setRootElement=G;this.getContentElement=
function(){var a;S||(a=J.rootElement.body,S=a.getElementsByTagNameNS(e,"text")[0]||a.getElementsByTagNameNS(e,"presentation")[0]||a.getElementsByTagNameNS(e,"spreadsheet")[0]);return S};this.getDocumentType=function(){var a=J.getContentElement();return a&&a.localName};this.getPart=function(b){return new a(b,L[b],J,R)};this.getPartData=function(a,b){R.load(a,b)};this.createByteArray=function(a,b){P();R.createByteArray(a,b)};this.saveAs=F;this.save=function(a){F(f,a)};this.getUrl=function(){return f};
this.state=q.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),d;a=new a;for(d in a)a.hasOwnProperty(d)&&(b[d]=a[d]);return b}(h);R=f?new core.Zip(f,function(a,b){R=b;a?$(f,function(b){a&&(R.error=a+"\n"+b,D(q.INVALID))}):I([["styles.xml",A],["content.xml",N],["meta.xml",B],["settings.xml",O],["META-INF/manifest.xml",z]])}):T()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=
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
odf.FontLoader=function(){function k(c,b,h,a,g){var e,d=0,l;for(l in c)if(c.hasOwnProperty(l)){if(d===h){e=l;break}d+=1}e?b.getPartData(c[e].href,function(d,l){if(d)runtime.log(d);else{var m="@font-face { font-family: '"+(c[e].family||e)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+n.convertUTF8ArrayToBase64(l)+') format("truetype"); }';try{a.insertRule(m,a.cssRules.length)}catch(r){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(r)+"\nRule: "+m)}}k(c,b,h+1,a,g)}):
g&&g()}var l=new xmldom.XPath,n=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(c,b){for(var h=c.rootElement.fontFaceDecls;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);if(h){var a={},g,e,d,n;if(h)for(h=l.getODFElementsWithXPath(h,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),g=0;g<h.length;g+=1)e=h[g],d=e.getAttributeNS(odf.Namespaces.stylens,"name"),n=e.getAttributeNS(odf.Namespaces.svgns,"font-family"),e=l.getODFElementsWithXPath(e,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<e.length&&(e=e[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),a[d]={href:e,family:n});k(a,c,0,b)}}};return odf.FontLoader}();
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
odf.Formatting=function(){function k(a,b){Object.keys(b).forEach(function(d){try{a[d]=b[d].constructor===Object?k(a[d],b[d]):b[d]}catch(c){a[d]=b[d]}});return a}function l(a,b,c){var e,f;c=c||[d.rootElement.automaticStyles,d.rootElement.styles];for(e=c.shift();e;){for(e=e.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&(f=e.getAttributeNS(s,"name"),e.namespaceURI===s&&"style"===e.localName&&e.getAttributeNS(s,"family")===b&&f===a||"list-style"===b&&e.namespaceURI===m&&"list-style"===e.localName&&
f===a||"data"===b&&e.namespaceURI===r&&f===a))return e;e=e.nextSibling}e=c.shift()}return null}function n(a){for(var b={},d=a.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE&&d.namespaceURI===s)for(b[d.nodeName]={},a=0;a<d.attributes.length;a+=1)b[d.nodeName][d.attributes[a].name]=d.attributes[a].value;d=d.nextSibling}return b}function c(a,b){Object.keys(b).forEach(function(d){var e=d.split(":"),f=e[1],g=odf.Namespaces.resolvePrefix(e[0]),e=b[d];"object"===typeof e&&Object.keys(e).length?(d=a.getElementsByTagNameNS(g,
f)[0]||a.ownerDocument.createElementNS(g,d),a.appendChild(d),c(d,e)):a.setAttributeNS(g,d,e)})}function b(a){var b=d.rootElement.styles,c;c={};for(var e={},f=a;f;)c=n(f),e=k(c,e),f=(c=f.getAttributeNS(s,"parent-style-name"))?l(c,a.getAttributeNS(s,"family"),[b]):null;a:{a=a.getAttributeNS(s,"family");for(b=d.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===s&&"default-style"===b.localName&&b.getAttributeNS(s,"family")===a){f=b;break a}b=b.nextSibling}f=null}f&&
(c=n(f),e=k(c,e));return e}function h(a,b){for(var d=a.nodeType===Node.TEXT_NODE?a.parentNode:a,c,e=[],f="",g=!1;d;)!g&&q.isGroupingElement(d)&&(g=!0),(c=t.determineStylesForNode(d))&&e.push(c),d=d.parentNode;g&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){f+="|"+b+":"+a+"|"})})}),b&&(b[f]=e));return g?e:void 0}function a(a){var d={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var e=Object.keys(a[c])[0],f,g;(f=l(e,c))?
(g=b(f),d=k(g,d),g=f.getAttributeNS(s,"display-name")):runtime.log("No style element found for '"+e+"' of family '"+c+"'");d.orderedStyles.push({name:e,family:c,displayName:g})})});return d}function g(){var a,b=[];[d.rootElement.automaticStyles,d.rootElement.styles].forEach(function(d){for(a=d.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===s&&"style"===a.localName||a.namespaceURI===m&&"list-style"===a.localName)&&b.push(a.getAttributeNS(s,"name")),a=a.nextSibling});return b}var e=
this,d,t=new odf.StyleInfo,f=odf.Namespaces.svgns,s=odf.Namespaces.stylens,m=odf.Namespaces.textns,r=odf.Namespaces.numberns,q=new odf.OdfUtils,w=new core.Utils;this.setOdfContainer=function(a){d=a};this.getFontMap=function(){for(var a=d.rootElement.fontFaceDecls,b={},c,e,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(c=a.getAttributeNS(s,"name"))&&((e=a.getAttributeNS(f,"font-family"))||a.getElementsByTagNameNS(f,"font-face-uri")[0])&&(b[c]=e),a=a.nextSibling;return b};this.getAvailableParagraphStyles=
function(){for(var a=d.rootElement.styles&&d.rootElement.styles.firstChild,b,c,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===s)&&(c=a,b=c.getAttributeNS(s,"family"),"paragraph"===b&&(b=c.getAttributeNS(s,"name"),c=c.getAttributeNS(s,"display-name")||b,b&&c&&e.push({name:b,displayName:c}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var b;b=t.hasDerivedStyles(d.rootElement,odf.Namespaces.resolvePrefix,a);a=(new t.UsedStyleList(d.rootElement.styles)).uses(a)||
(new t.UsedStyleList(d.rootElement.automaticStyles)).uses(a)||(new t.UsedStyleList(d.rootElement.body)).uses(a);return b||a};this.getStyleElement=l;this.getStyleAttributes=n;this.getInheritedStyleAttributes=b;this.getFirstNamedParentStyleNameOrSelf=function(a){var b=d.rootElement.automaticStyles,c=d.rootElement.styles,e;for(e=l(a,"paragraph",[b]);e;)a=e.getAttributeNS(s,"parent-style-name"),e=l(a,"paragraph",[b]);return(e=l(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(l(a,
"paragraph"))};this.getAppliedStyles=function(b){var d={},c=[];b.forEach(function(a){h(a,d)});Object.keys(d).forEach(function(b){c.push(a(d[b]))});return c};this.getAppliedStylesForElement=function(b){return(b=h(b))?a(b):void 0};this.applyStyle=function(a,b,c,f){(new odf.TextStyleApplicator("auto"+w.hashString(a)+"_",e,d.rootElement.automaticStyles)).applyStyle(b,c,f)};this.updateStyle=function(a,b,d){var e,f;c(a,b);if(d){a.getAttributeNS(s,"name");e=g();f=0;do b=d+f,f+=1;while(-1!==e.indexOf(b));
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
odf.OdfCanvas=function(){function k(){function a(c){d=!0;runtime.setTimeout(function(){try{c()}catch(e){runtime.log(e)}d=!1;0<b.length&&a(b.pop())},10)}var b=[],d=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(c){if(0===b.length&&!d)return a(c);b.push(c)}}function l(a){function b(){for(;0<d.cssRules.length;)d.deleteRule(0);d.insertRule("#shadowContent draw|page {display:none;}",0);d.insertRule("office|presentation draw|page {display:none;}",1);d.insertRule("#shadowContent draw|page:nth-of-type("+
c+") {display:block;}",2);d.insertRule("office|presentation draw|page:nth-of-type("+c+") {display:block;}",3)}var d=a.sheet,c=1;this.showFirstPage=function(){c=1;b()};this.showNextPage=function(){c+=1;b()};this.showPreviousPage=function(){1<c&&(c-=1,b())};this.showPage=function(a){0<a&&(c=a,b())};this.css=a}function n(a,b,d){a.addEventListener?a.addEventListener(b,d,!1):a.attachEvent?a.attachEvent("on"+b,d):a["on"+b]=d}function c(a){function b(a,d){for(;d;){if(d===a)return!0;d=d.parentNode}return!1}
function d(){var f=[],g=runtime.getWindow().getSelection(),h,m;for(h=0;h<g.rangeCount;h+=1)m=g.getRangeAt(h),null!==m&&(b(a,m.startContainer)&&b(a,m.endContainer))&&f.push(m);if(f.length===c.length){for(g=0;g<f.length&&(h=f[g],m=c[g],h=h===m?!1:null===h||null===m?!0:h.startContainer!==m.startContainer||h.startOffset!==m.startOffset||h.endContainer!==m.endContainer||h.endOffset!==m.endOffset,!h);g+=1);if(g===f.length)return}c=f;var g=[f.length],k,l=a.ownerDocument;for(h=0;h<f.length;h+=1)m=f[h],k=
l.createRange(),k.setStart(m.startContainer,m.startOffset),k.setEnd(m.endContainer,m.endOffset),g[h]=k;c=g;g=e.length;for(f=0;f<g;f+=1)e[f](a,c)}var c=[],e=[];this.addListener=function(a,b){var d,c=e.length;for(d=0;d<c;d+=1)if(e[d]===b)return;e.push(b)};n(a,"mouseup",d);n(a,"keyup",d);n(a,"keydown",d)}function b(a,b,d){(new odf.Style2CSS).style2css(a.getDocumentType(),d.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function h(a,b,d,c){d.setAttribute("styleid",b);var e,f=
d.getAttributeNS(x,"anchor-type"),g=d.getAttributeNS(v,"x"),m=d.getAttributeNS(v,"y"),k=d.getAttributeNS(v,"width"),l=d.getAttributeNS(v,"height"),n=d.getAttributeNS(w,"min-height"),p=d.getAttributeNS(w,"min-width"),r=d.getAttributeNS(q,"master-page-name"),s=null,t,u;t=0;var D,G=a.rootElement.ownerDocument;if(r){s=a.rootElement.masterStyles.getElementsByTagNameNS(y,"master-page");t=null;for(u=0;u<s.length;u+=1)if(s[u].getAttributeNS(y,"name")===r){t=s[u];break}s=t}else s=null;if(s){r=G.createElementNS(q,
"draw:page");D=s.firstElementChild;for(t=0;D;)"true"!==D.getAttributeNS(A,"placeholder")&&(u=D.cloneNode(!0),r.appendChild(u),h(a,b+"_"+t,u,c)),D=D.nextElementSibling,t+=1;I.appendChild(r);t=I.getElementsByTagNameNS(q,"page").length;if(u=r.getElementsByTagNameNS(x,"page-number")[0]){for(;u.firstChild;)u.removeChild(u.firstChild);u.appendChild(G.createTextNode(t))}h(a,b,r,c);r.setAttributeNS(q,"draw:master-page-name",s.getAttributeNS(y,"name"))}if("as-char"===f)e="display: inline-block;";else if(f||
g||m)e="position: absolute;";else if(k||l||n||p)e="display: block;";g&&(e+="left: "+g+";");m&&(e+="top: "+m+";");k&&(e+="width: "+k+";");l&&(e+="height: "+l+";");n&&(e+="min-height: "+n+";");p&&(e+="min-width: "+p+";");e&&(e="draw|"+d.localName+'[styleid="'+b+'"] {'+e+"}",c.insertRule(e,c.cssRules.length))}function a(a){for(a=a.firstChild;a;){if(a.namespaceURI===u&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function g(b,
d,c,e){function f(a){a&&(a='draw|image[styleid="'+b+'"] {'+("background-image: url("+a+");")+"}",e.insertRule(a,e.cssRules.length))}c.setAttribute("styleid",b);var g=c.getAttributeNS(D,"href"),h;if(g)try{h=d.getPart(g),h.onchange=function(a){f(a.url)},h.load()}catch(m){runtime.log("slight problem: "+m)}else g=a(c),f(g)}function e(a){function b(a){return c===a.getAttributeNS(u,"name")}var d=z.getElementsByTagNameNS(a,u,"annotation");a=z.getElementsByTagNameNS(a,u,"annotation-end");var c,e;for(e=0;e<
d.length;e+=1)c=d[e].getAttributeNS(u,"name"),V.addAnnotation({node:d[e],end:a.filter(b)[0]||null});V.rerenderAnnotations()}function d(a){function b(d){var c,e;d.hasAttributeNS(D,"href")&&(c=d.getAttributeNS(D,"href"),"#"===c[0]?(c=c.substring(1),e=function(){var b=B.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+c+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=B.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+c+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);
return!1}):e=function(){N.open(c)},d.onclick=e)}var d,c,e;c=a.getElementsByTagNameNS(x,"a");for(d=0;d<c.length;d+=1)e=c.item(d),b(e)}function t(a){var b=a.ownerDocument;z.getElementsByTagNameNS(a,x,"s").forEach(function(a){for(var d,c;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));c=parseInt(a.getAttributeNS(x,"c"),10);if(1<c)for(a.removeAttributeNS(x,"c"),d=1;d<c;d+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function f(a){z.getElementsByTagNameNS(a,x,"tab").forEach(function(a){a.textContent=
"\t"})}function s(b,d){function c(a,b){var g=h.documentElement.namespaceURI;"video/"===b.substr(0,6)?(e=h.createElementNS(g,"video"),e.setAttribute("controls","controls"),f=h.createElementNS(g,"source"),f.setAttribute("src",a),f.setAttribute("type",b),e.appendChild(f),d.parentNode.appendChild(e)):d.innerHtml="Unrecognised Plugin"}var e,f,g,h=d.ownerDocument,m;if(g=d.getAttributeNS(D,"href"))try{m=b.getPart(g),m.onchange=function(a){c(a.url,a.mimetype)},m.load()}catch(k){runtime.log("slight problem: "+
k)}else runtime.log("using MP4 data fallback"),g=a(d),c(g,"video/mp4")}function m(a){var b=a.getElementsByTagName("head")[0],d;"undefined"!==String(typeof webodf_css)?(d=a.createElementNS(b.namespaceURI,"style"),d.setAttribute("media","screen, print, handheld, projection"),d.appendChild(a.createTextNode(webodf_css))):(d=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),d.setAttribute("href",a),d.setAttribute("rel","stylesheet"));
d.setAttribute("type","text/css");b.appendChild(d);return d}function r(a){var b=a.getElementsByTagName("head")[0],d=a.createElementNS(b.namespaceURI,"style"),c="";d.setAttribute("type","text/css");d.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){c+="@namespace "+a+" url("+b+");\n"});d.appendChild(a.createTextNode(c));b.appendChild(d);return d}var q=odf.Namespaces.drawns,w=odf.Namespaces.fons,u=odf.Namespaces.officens,y=odf.Namespaces.stylens,
v=odf.Namespaces.svgns,p=odf.Namespaces.tablens,x=odf.Namespaces.textns,D=odf.Namespaces.xlinkns,G=odf.Namespaces.xmlns,A=odf.Namespaces.presentationns,N=runtime.getWindow(),B=new xmldom.XPath,O=new odf.OdfUtils,z=new core.DomUtils,I,X,ea=!1,V;odf.OdfCanvas=function(a){function u(a,b,d){function c(a,b,d,e){ka.addToQueue(function(){g(a,b,d,e)})}var e,f;e=b.getElementsByTagNameNS(q,"image");for(b=0;b<e.length;b+=1)f=e.item(b),c("image"+String(b),a,f,d)}function w(a,b){function d(a,b){ka.addToQueue(function(){s(a,
b)})}var c,e,f;e=b.getElementsByTagNameNS(q,"plugin");for(c=0;c<e.length;c+=1)f=e.item(c),d(a,f)}function v(){var b=a.firstChild;b.firstChild&&(1<Q?(b.style.MozTransformOrigin="center top",b.style.WebkitTransformOrigin="center top",b.style.OTransformOrigin="center top",b.style.msTransformOrigin="center top"):(b.style.MozTransformOrigin="left top",b.style.WebkitTransformOrigin="left top",b.style.OTransformOrigin="left top",b.style.msTransformOrigin="left top"),b.style.WebkitTransform="scale("+Q+")",
b.style.MozTransform="scale("+Q+")",b.style.OTransform="scale("+Q+")",b.style.msTransform="scale("+Q+")",a.style.width=Math.round(Q*b.offsetWidth)+"px",a.style.height=Math.round(Q*b.offsetHeight)+"px")}function D(a){var b=L.getElementById("sizer");ea?(X.parentNode||(b.appendChild(X),b.style.paddingRight=N.getComputedStyle(X).width,v()),V&&V.forgetAnnotations(),V=new gui.AnnotationViewManager(R,a.body,X),e(a.body)):X.parentNode&&(b.removeChild(X),b.style.paddingRight=0,V.forgetAnnotations(),v())}function A(c){function e(){for(var g=
a;g.firstChild;)g.removeChild(g.firstChild);a.style.display="inline-block";g=S.rootElement;a.ownerDocument.importNode(g,!0);ga.setOdfContainer(S);var m=S,k=fa;(new odf.FontLoader).loadFonts(m,k.sheet);b(S,ga,ha);for(var l=S,m=Z.sheet,k=a;k.firstChild;)k.removeChild(k.firstChild);k=L.createElementNS(a.namespaceURI,"div");k.style.display="inline-block";k.style.background="white";k.id="sizer";k.appendChild(g);a.appendChild(k);X=L.createElementNS(a.namespaceURI,"div");X.id="annotationsPane";I=L.createElementNS(a.namespaceURI,
"div");I.id="shadowContent";I.style.position="absolute";I.style.top=0;I.style.left=0;l.getContentElement().appendChild(I);var n=g.body,r,s,A;s=[];for(r=n.firstChild;r&&r!==n;)if(r.namespaceURI===q&&(s[s.length]=r),r.firstChild)r=r.firstChild;else{for(;r&&r!==n&&!r.nextSibling;)r=r.parentNode;r&&r.nextSibling&&(r=r.nextSibling)}for(A=0;A<s.length;A+=1)r=s[A],h(l,"frame"+String(A),r,m);s=B.getODFElementsWithXPath(n,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(r=0;r<s.length;r+=
1)n=s[r],n.setAttributeNS&&n.setAttributeNS("urn:webodf","containsparagraphanchor",!0);r=g.body.getElementsByTagNameNS(p,"table-cell");for(n=0;n<r.length;n+=1)s=r.item(n),s.hasAttributeNS(p,"number-columns-spanned")&&s.setAttribute("colspan",s.getAttributeNS(p,"number-columns-spanned")),s.hasAttributeNS(p,"number-rows-spanned")&&s.setAttribute("rowspan",s.getAttributeNS(p,"number-rows-spanned"));d(g.body);t(g.body);f(g.body);u(l,g.body,m);w(l,g.body);s=g.body;var z,E,W,U,n={};r={};var Y;A=N.document.getElementsByTagNameNS(x,
"list-style");for(l=0;l<A.length;l+=1)z=A.item(l),(W=z.getAttributeNS(y,"name"))&&(r[W]=z);s=s.getElementsByTagNameNS(x,"list");for(l=0;l<s.length;l+=1)if(z=s.item(l),A=z.getAttributeNS(G,"id")){E=z.getAttributeNS(x,"continue-list");z.setAttribute("id",A);U="text|list#"+A+" > text|list-item > *:first-child:before {";if(W=z.getAttributeNS(x,"style-name")){z=r[W];Y=O.getFirstNonWhitespaceChild(z);z=void 0;if("list-level-style-number"===Y.localName){z=Y.getAttributeNS(y,"num-format");W=Y.getAttributeNS(y,
"num-suffix");var ta="",ta={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},F=void 0,F=Y.getAttributeNS(y,"num-prefix")||"",F=ta.hasOwnProperty(z)?F+(" counter(list, "+ta[z]+")"):z?F+("'"+z+"';"):F+" ''";W&&(F+=" '"+W+"'");z=ta="content: "+F+";"}else"list-level-style-image"===Y.localName?z="content: none;":"list-level-style-bullet"===Y.localName&&(z="content: '"+Y.getAttributeNS(x,"bullet-char")+"';");Y=z}if(E){for(z=n[E];z;)E=z,z=n[E];U+="counter-increment:"+E+";";Y?
(Y=Y.replace("list",E),U+=Y):U+="content:counter("+E+");"}else E="",Y?(Y=Y.replace("list",A),U+=Y):U+="content: counter("+A+");",U+="counter-increment:"+A+";",m.insertRule("text|list#"+A+" {counter-reset:"+A+"}",m.cssRules.length);U+="}";n[A]=E;U&&m.insertRule(U,m.cssRules.length)}k.insertBefore(I,k.firstChild);v();D(g);if(!c&&(g=[S],ja.hasOwnProperty("statereadychange")))for(m=ja.statereadychange,k=0;k<m.length;k+=1)m[k].apply(null,g)}S.state===odf.OdfContainer.DONE?e():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),
runtime.setTimeout(function na(){S.state===odf.OdfContainer.DONE?e():(runtime.log("will be back later..."),runtime.setTimeout(na,500))},100))}function z(b){ka.clearQueue();a.innerHTML="loading "+b;a.removeAttribute("style");S=new odf.OdfContainer(b,function(a){S=a;A(!1)})}function F(){if(aa){for(var a=aa.ownerDocument.createDocumentFragment();aa.firstChild;)a.insertBefore(aa.firstChild,null);aa.parentNode.replaceChild(a,aa)}}function J(a){a=a||N.event;for(var b=a.target,d=N.getSelection(),c=0<d.rangeCount?
d.getRangeAt(0):null,e=c&&c.startContainer,f=c&&c.startOffset,g=c&&c.endContainer,h=c&&c.endOffset,m,k;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==x);)b=b.parentNode;ia&&(b&&b.parentNode!==aa)&&(m=b.ownerDocument,k=m.documentElement.namespaceURI,aa?aa.parentNode&&F():(aa=m.createElementNS(k,"p"),aa.style.margin="0px",aa.style.padding="0px",aa.style.border="0px",aa.setAttribute("contenteditable",!0)),b.parentNode.replaceChild(aa,b),aa.appendChild(b),aa.focus(),c&&(d.removeAllRanges(),
c=b.ownerDocument.createRange(),c.setStart(e,f),c.setEnd(g,h),d.addRange(c)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==a&&void 0!==a,"odf.OdfCanvas constructor needs DOM element");var R=this,L=a.ownerDocument,S,ga=new odf.Formatting,K=new c(a),E,fa,ha,Z,ia=!1,Q=1,ja={},aa,ka=new k;m(L);E=new l(r(L));fa=r(L);ha=r(L);Z=r(L);this.refreshCSS=function(){b(S,ga,ha);v()};this.refreshSize=function(){v()};this.odfContainer=function(){return S};
this.slidevisibilitycss=function(){return E.css};this.setOdfContainer=function(a,b){S=a;A(!0===b)};this.load=this.load=z;this.save=function(a){F();S.save(a)};this.setEditable=function(b){n(a,"click",J);(ia=b)||F()};this.addListener=function(b,d){switch(b){case "selectionchange":K.addListener(b,d);break;case "click":n(a,b,d);break;default:var c=ja[b];void 0===c&&(c=ja[b]=[]);d&&-1===c.indexOf(d)&&c.push(d)}};this.getFormatting=function(){return ga};this.getAnnotationManager=function(){return V};this.refreshAnnotations=
function(){D(S.rootElement)};this.rerenderAnnotations=function(){V&&V.rerenderAnnotations()};this.enableAnnotations=function(a){a!==ea&&(ea=a,D(S.rootElement))};this.addAnnotation=function(a){V&&V.addAnnotation(a)};this.setZoomLevel=function(a){Q=a;v()};this.getZoomLevel=function(){return Q};this.fitToContainingElement=function(b,d){var c=a.offsetHeight/Q;Q=b/(a.offsetWidth/Q);d/c<Q&&(Q=d/c);v()};this.fitToWidth=function(b){Q=b/(a.offsetWidth/Q);v()};this.fitSmart=function(b,d){var c,e;c=a.offsetWidth/
Q;e=a.offsetHeight/Q;c=b/c;void 0!==d&&d/e<c&&(c=d/e);Q=Math.min(1,c);v()};this.fitToHeight=function(b){Q=b/(a.offsetHeight/Q);v()};this.showFirstPage=function(){E.showFirstPage()};this.showNextPage=function(){E.showNextPage()};this.showPreviousPage=function(){E.showPreviousPage()};this.showPage=function(a){E.showPage(a);v()};this.getElement=function(){return a}};return odf.OdfCanvas}();
// Input 37
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(k,l,n){return new odf.OdfContainer(k,function(c){if(c.state===odf.OdfContainer.INVALID)return n("Document "+k+" is invalid.");c.state===odf.OdfContainer.DONE?c.saveAs(l,function(b){n(b)}):n("Document was not completely loaded.")})};this.render=function(k,l,n){for(l=l.getElementsByTagName("body")[0];l.firstChild;)l.removeChild(l.firstChild);l=new odf.OdfCanvas(l);l.addListener("statereadychange",function(c){n(c)});l.load(k)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(k,l){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(k,l,n,c){};ops.Server.prototype.joinSession=function(k,l,n,c){};ops.Server.prototype.getGenesisUrl=function(k){};
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
ops.NowjsServer=function(){var k;this.getNowObject=function(){return k};this.getGenesisUrl=function(k){return"/session/"+k+"/genesis"};this.connect=function(l,n){function c(){"unavailable"===k.networkStatus?(runtime.log("connection to server unavailable."),n("unavailable")):"ready"!==k.networkStatus?b>l?(runtime.log("connection to server timed out."),n("timeout")):(b+=100,runtime.getWindow().setTimeout(c,100)):(runtime.log("connection to collaboration server established."),n("ready"))}var b=0;k||
(k=runtime.getVariable("now"),void 0===k&&(k={networkStatus:"unavailable"}),c())};this.networkStatus=function(){return k?k.networkStatus:"unavailable"};this.login=function(l,n,c,b){k?k.login(l,n,c,b):b("Not connected to server")};this.joinSession=function(l,n,c,b){k.joinSession(l,n,function(b){k.memberid=b;c(b)},b)}};
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
ops.PullBoxServer=function(k){function l(b,a){var c=new XMLHttpRequest,e=new core.ByteArrayWriter("utf8"),d=JSON.stringify(b);runtime.log("Sending message to server: "+d);e.appendString(d);e=e.getByteArray();c.open("POST",k.url,!0);c.onreadystatechange=function(){4===c.readyState&&((200>c.status||300<=c.status)&&0===c.status&&runtime.log("Status "+String(c.status)+": "+c.responseText||c.statusText),a(c.responseText))};e=e.buffer&&!c.sendAsBinary?e.buffer:runtime.byteArrayToString(e,"binary");try{c.sendAsBinary?
c.sendAsBinary(e):c.send(e)}catch(l){runtime.log("Problem with calling server: "+l+" "+e),a(l.message)}}var n=this,c,b=new core.Base64;k=k||{};k.url=k.url||"/WSER";this.getGenesisUrl=function(b){return"/session/"+b+"/genesis"};this.call=l;this.getToken=function(){return c};this.setToken=function(b){c=b};this.connect=function(b,a){a("ready")};this.networkStatus=function(){return"ready"};this.login=function(h,a,g,e){l({command:"login",args:{login:b.toBase64(h),password:b.toBase64(a)}},function(a){var b=
runtime.fromJson(a);runtime.log("Login reply: "+a);b.hasOwnProperty("token")?(c=b.token,runtime.log("Caching token: "+n.getToken()),g(b)):e(a)})};this.joinSession=function(b,a,c,e){l({command:"join_session",args:{user_id:b,es_id:a}},function(a){var b=runtime.fromJson(a);runtime.log("join_session reply: "+a);b.hasOwnProperty("success")&&b.success?c(b.member_id):e&&e()})}};
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
ops.Operation=function(){};ops.Operation.prototype.init=function(k){};ops.Operation.prototype.transform=function(k,l){};ops.Operation.prototype.execute=function(k){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var k=this,l,n;this.init=function(c){l=c.memberid;n=c.timestamp};this.transform=function(c,b){return[k]};this.execute=function(c){var b=c.getCursor(l);if(b)return!1;b=new ops.OdtCursor(l,c);c.addCursor(b);c.emit(ops.OdtDocument.signalCursorAdded,b);return!0};this.spec=function(){return{optype:"AddCursor",memberid:l,timestamp:n}}};
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
gui.StyleHelper=function(k){function l(b,h,a){var g=!0,e;b.collapsed?(e=b.startContainer,e.hasChildNodes()&&b.startOffset<e.childNodes.length&&(e=e.childNodes[b.startOffset]),b=[e]):b=c.getTextNodes(b,!0);b=k.getAppliedStyles(b);for(e=0;e<b.length&&!(g=b[e]["style:text-properties"],g=!g||g[h]!==a);e+=1);return!g}var n=new core.DomUtils,c=new odf.OdfUtils;this.getAppliedStyles=function(b){b=c.getTextNodes(b,!0);return k.getAppliedStyles(b)};this.applyStyle=function(b,h,a){var g=n.splitBoundaries(h),
e=c.getTextNodes(h,!1);k.applyStyle(b,e,{startContainer:h.startContainer,startOffset:h.startOffset,endContainer:h.endContainer,endOffset:h.endOffset},a);g.forEach(n.normalizeTextNodes)};this.isBold=function(b){return l(b,"fo:font-weight","bold")};this.isItalic=function(b){return l(b,"fo:font-style","italic")};this.hasUnderline=function(b){return l(b,"style:text-underline-style","solid")};this.hasStrikeThrough=function(b){return l(b,"style:text-line-through-style","solid")}};
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
ops.OpApplyDirectStyling=function(){function k(a){var e=0<=b?c+b:c,d=a.getIteratorAtPosition(0<=b?c:c+b),e=b?a.getIteratorAtPosition(e):d;a=a.getDOM().createRange();a.setStart(d.container(),d.unfilteredDomOffset());a.setEnd(e.container(),e.unfilteredDomOffset());return a}var l,n,c,b,h,a=new odf.OdfUtils;this.init=function(a){l=a.memberid;n=a.timestamp;c=parseInt(a.position,10);b=parseInt(a.length,10);h=a.setProperties};this.transform=function(a,b){return null};this.execute=function(b){var c=k(b),
d=a.getImpactedParagraphs(c);(new gui.StyleHelper(b.getFormatting())).applyStyle(l,c,h);c.detach();b.getOdfCanvas().refreshCSS();d.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:l,timeStamp:n})});b.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:l,timestamp:n,position:c,length:b,setProperties:h}}};
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
ops.OpRemoveCursor=function(){var k=this,l,n;this.init=function(c){l=c.memberid;n=c.timestamp};this.transform=function(c,b){var h=c.spec();return"RemoveCursor"===h.optype&&h.memberid===l?[]:[k]};this.execute=function(c){return c.removeCursor(l)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:l,timestamp:n}}};
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
ops.OpMoveCursor=function(){var k=this,l,n,c,b;this.init=function(h){l=h.memberid;n=h.timestamp;c=parseInt(h.position,10);b=void 0!==h.length?parseInt(h.length,10):0};this.merge=function(h){return"MoveCursor"===h.optype&&h.memberid===l?(c=h.position,b=h.length,n=h.timestamp,!0):!1};this.transform=function(h,a){var g=h.spec(),e=g.optype,d=c+b,n=[k];"RemoveText"===e?(e=g.position+g.length,e<=c?c-=g.length:g.position<d&&(c<g.position?b=e<d?b-g.length:g.position-c:(c=g.position,b=e<d?d-e:0))):"SplitParagraph"===
e?g.position<c?c+=1:g.position>c&&g.position<d&&(b+=1):"InsertText"===e?g.position<c?c+=g.text.length:g.position>c&&g.position<d&&(b+=g.text.length):"RemoveCursor"===e&&g.memberid===l?n=[]:"InsertTable"===e&&(n=null);return n};this.execute=function(h){var a=h.getCursor(l),g=h.getCursorPosition(l),e=h.getPositionFilter(),d=c-g;if(!a)return!1;g=a.getStepCounter();d=0<d?g.countForwardSteps(d,e):0>d?-g.countBackwardSteps(-d,e):0;a.move(d);b&&(e=0<b?g.countForwardSteps(b,e):0>b?-g.countBackwardSteps(-b,
e):0,a.move(e,!0));h.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:l,timestamp:n,position:c,length:b}}};
// Input 47
ops.OpInsertTable=function(){function k(a,d){var c;if(1===t.length)c=t[0];else if(3===t.length)switch(a){case 0:c=t[0];break;case b-1:c=t[2];break;default:c=t[1]}else c=t[a];if(1===c.length)return c[0];if(3===c.length)switch(d){case 0:return c[0];case h-1:return c[2];default:return c[1]}return c[d]}var l=this,n,c,b,h,a,g,e,d,t;this.init=function(f){n=f.memberid;c=f.timestamp;a=parseInt(f.position,10);b=parseInt(f.initialRows,10);h=parseInt(f.initialColumns,10);g=f.tableName;e=f.tableStyleName;d=f.tableColumnStyleName;
t=f.tableCellStyleMatrix};this.transform=function(b,d){var c=b.spec(),e=c.optype,g=[l];if("InsertTable"===e)g=null;else if("SplitParagraph"===e)if(c.position<a)a+=1;else{if(c.position===a&&!d)return a+=1,null}else if("InsertText"===e)if(c.position<a)a+=c.text.length;else{if(c.position===a&&!d)return a+=c.text.length,null}else"RemoveText"===e&&(c.position+c.length<=a?a-=c.length:c.position<a&&(a=c.position));return g};this.execute=function(f){var l=f.getPositionInTextNode(a),m=f.getRootNode();if(l){var r=
f.getDOM(),q=r.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=r.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),u,y,v,p;e&&q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",e);g&&q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",g);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",h);d&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:style-name",d);q.appendChild(t);for(v=0;v<b;v+=1){t=r.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(p=0;p<h;p+=1)u=r.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(y=k(v,p))&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",y),y=r.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),u.appendChild(y),t.appendChild(u);q.appendChild(t)}l=f.getParagraphElement(l.textNode);
m.insertBefore(q,l?l.nextSibling:void 0);f.getOdfCanvas().refreshSize();f.emit(ops.OdtDocument.signalTableAdded,{tableElement:q,memberId:n,timeStamp:c});f.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:n,timestamp:c,position:a,initialRows:b,initialColumns:h,tableName:g,tableStyleName:e,tableColumnStyleName:d,tableCellStyleMatrix:t}}};
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
ops.OpInsertText=function(){function k(a,b){var c=b.parentNode,d=b.nextSibling,h=[];a.getCursors().forEach(function(a){var d=a.getSelectedRange();!d||d.startContainer!==b&&d.endContainer!==b||h.push({cursor:a,startContainer:d.startContainer,startOffset:d.startOffset,endContainer:d.endContainer,endOffset:d.endOffset})});c.removeChild(b);c.insertBefore(b,d);h.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var l=
this,n,c,b,h;this.init=function(a){n=a.memberid;c=a.timestamp;b=parseInt(a.position,10);h=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===n&&a.position===b+h.length?(h+=a.text,c=a.timestamp,!0):!1};this.transform=function(a,c){var e=a.spec(),d=e.optype,h=[l];if("InsertText"===d)if(e.position<b)b+=e.text.length;else{if(e.position===b&&!c)return b+=e.text.length,null}else if("SplitParagraph"===d)if(e.position<b)b+=1;else{if(e.position===b&&!c)return b+=1,null}else"InsertTable"===
d?h=null:"RemoveText"===d&&(e.position+e.length<=b?b-=e.length:e.position<b&&(b=e.position));return h};this.execute=function(a){var g,e,d,l,f=a.getRootNode().ownerDocument,s,m=!0,r=0,q;if(g=a.getPositionInTextNode(b,n)){e=g.textNode;d=e.parentNode;l=e.nextSibling;s=a.getParagraphElement(e);g.offset!==e.length&&(l=e.splitText(g.offset));for(g=0;g<h.length;g+=1)if(" "===h[g]||"\t"===h[g])r<g&&(r=h.substring(r,g),m?e.appendData(r):d.insertBefore(f.createTextNode(r),l)),r=g+1,m=!1,q=" "===h[g]?"text:s":
"text:tab",q=f.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",q),q.appendChild(f.createTextNode(h[g])),d.insertBefore(q,l);r=h.substring(r);0<r.length&&(m?e.appendData(r):d.insertBefore(f.createTextNode(r),l));k(a,e);0===e.length&&e.parentNode.removeChild(e);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:s,memberId:n,timeStamp:c});a.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",
memberid:n,timestamp:c,position:b,text:h}}};
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
ops.OpRemoveText=function(){function k(a){function b(a){if(e.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function c(g){g=d.mergeIntoParent(g);return!e.isParagraph(g)&&g!==a&&b(g)?c(g):g}this.isEmpty=b;this.mergeChildrenIntoParent=c}function l(b){var c=b.getPositionFilter(),e,g,k,l,n=a,u=b.getDOM().createRange();b=b.getIteratorAtPosition(h);e=b.container();for(g=b.unfilteredDomOffset();n&&
b.nextPosition();)k=b.container(),l=b.unfilteredDomOffset(),c.acceptPosition(b)===NodeFilter.FILTER_ACCEPT&&(n-=1);u.setStart(e,g);u.setEnd(k,l);d.splitBoundaries(u);return u}var n=this,c,b,h,a,g,e,d;this.init=function(k){runtime.assert(0<=k.length,"OpRemoveText only supports positive lengths");c=k.memberid;b=k.timestamp;h=parseInt(k.position,10);a=parseInt(k.length,10);g=k.text;e=new odf.OdfUtils;d=new core.DomUtils};this.transform=function(b,d){var c=b.spec(),e=c.optype,g=h+a,k=[n];"RemoveText"===
e?(e=c.position+c.length,e<=h?h-=c.length:c.position<g&&(h<c.position?a=e<g?a-c.length:c.position-h:e<g?(h=c.position,a=g-e):k=[])):"InsertText"===e?c.position<=h&&(h+=c.text.length):"SplitParagraph"===e?c.position<=h&&(h+=1):"InsertTable"===e&&(k=null);return k};this.execute=function(d){var e,g,m,n,q=new k(d.getRootNode());d.upgradeWhitespacesAtPosition(h);d.upgradeWhitespacesAtPosition(h+a);g=l(d);e=d.getParagraphElement(g.startContainer);m=d.getTextElements(g,!0);n=d.getParagraphElements(g);g.detach();
m.forEach(function(a){q.mergeChildrenIntoParent(a)});g=n.reduce(function(a,b){var d,c,e=a,f=b,g,h;q.isEmpty(a)&&(c=!0,b.parentNode!==a.parentNode&&(g=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),f=a,e=b,h=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;f.hasChildNodes();)d=c?f.lastChild:f.firstChild,f.removeChild(d),"editinfo"!==d.localName&&e.insertBefore(d,h);g&&q.isEmpty(g)&&q.mergeChildrenIntoParent(g);q.mergeChildrenIntoParent(f);return e});
d.fixCursorPositions();d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:g||e,memberId:c,timeStamp:b});d.emit(ops.OdtDocument.signalCursorMoved,d.getCursor(c));d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:c,timestamp:b,position:h,length:a,text:g}}};
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
ops.OpSplitParagraph=function(){var k=this,l,n,c,b=new odf.OdfUtils;this.init=function(b){l=b.memberid;n=b.timestamp;c=parseInt(b.position,10)};this.transform=function(b,a){var g=b.spec(),e=g.optype,d=[k];if("SplitParagraph"===e)if(g.position<c)c+=1;else{if(g.position===c&&!a)return c+=1,null}else if("InsertText"===e)if(g.position<c)c+=g.text.length;else{if(g.position===c&&!a)return c+=g.text.length,null}else"InsertTable"===e?d=null:"RemoveText"===e&&(g.position+g.length<=c?c-=g.length:g.position<
c&&(c=g.position));return d};this.execute=function(h){var a,g,e,d,k,f;h.upgradeWhitespacesAtPosition(c);a=h.getPositionInTextNode(c,l);if(!a)return!1;g=h.getParagraphElement(a.textNode);if(!g)return!1;e=b.isListItem(g.parentNode)?g.parentNode:g;0===a.offset?(f=a.textNode.previousSibling,k=null):(f=a.textNode,k=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==e;)if(a=a.parentNode,d=a.cloneNode(!1),f){for(k&&d.appendChild(k);f.nextSibling;)d.appendChild(f.nextSibling);
a.parentNode.insertBefore(d,a.nextSibling);f=a;k=d}else a.parentNode.insertBefore(d,a),f=d,k=a;b.isListItem(k)&&(k=k.childNodes[0]);h.fixCursorPositions(l);h.getOdfCanvas().refreshSize();h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:g,memberId:l,timeStamp:n});h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:l,timeStamp:n});h.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:l,timestamp:n,position:c}}};
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
ops.OpSetParagraphStyle=function(){var k=this,l,n,c,b;this.init=function(h){l=h.memberid;n=h.timestamp;c=h.position;b=h.styleName};this.transform=function(c,a){var g=c.spec();"RemoveParagraphStyle"===g.optype&&g.styleName===b&&(b="");return[k]};this.execute=function(h){var a;if(a=h.getPositionInTextNode(c))if(a=h.getParagraphElement(a.textNode))return""!==b?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",b):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),h.getOdfCanvas().refreshSize(),h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:n,memberId:l}),h.getOdfCanvas().rerenderAnnotations(),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:l,timestamp:n,position:c,styleName:b}}};
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
ops.OpUpdateParagraphStyle=function(){function k(a,b){var c,e;for(c=0;c<b.length;c+=1)e=b[c].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(e[0]),e[1])}function l(a,b,c,e){var g,h,k;a&&(c||e)&&Object.keys(a).forEach(function(b){g=a[b];(c&&void 0!==c[b]||e&&-1!==e.indexOf(b))&&"object"!==typeof g&&delete a[b]});if(b&&(c||e))for(h=0;h<b.length;h+=1)if(k=b[h],c&&void 0!==c[k]||e&&-1!==e.indexOf(k))b.splice(h,1),h-=1}function n(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}var c=
this,b,h,a,g,e;this.init=function(d){b=d.memberid;h=d.timestamp;a=d.styleName;g=d.setProperties;e=d.removedProperties};this.transform=function(b,h){var f=b.spec(),k=f.optype;if("UpdateParagraphStyle"===k){if(!(f.styleName!==a||h||(l(g?g["style:paragraph-properties"]:null,e?e.paragraphPropertyNames:null,f.setProperties?f.setProperties["style:paragraph-properties"]:null,f.removedProperties?f.removedProperties.paragraphPropertyNames:null),l(g?g["style:text-properties"]:null,e?e.textPropertyNames:null,
f.setProperties?f.setProperties["style:text-properties"]:null,f.removedProperties?f.removedProperties.textPropertyNames:null),g&&(n(g["style:text-properties"])||n(g["style:paragraph-properties"]))||e&&(0<e.textPropertyNames.length||0<e.paragraphPropertyNames.length))))return[]}else if("RemoveParagraphStyle"===k&&f.styleName===a)return[];return[c]};this.execute=function(b){var c,f,h,m,l,n=b.getFormatting();return(c=b.getParagraphStyleElement(a))?(f=c.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0",
"paragraph-properties")[0],h=c.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties")[0],g&&(void 0===f&&g["style:paragraph-properties"]&&(f=b.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:paragraph-properties"),c.appendChild(f)),void 0===h&&g["style:text-properties"]&&(h=b.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:text-properties"),c.appendChild(h)),g["style:paragraph-properties"]&&n.updateStyle(f,
g["style:paragraph-properties"]),g["style:text-properties"]&&((l=g["style:text-properties"]["style:font-name"])&&!n.getFontMap().hasOwnProperty(l)&&(m=b.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:font-face"),m.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",l),m.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","svg:font-family",l),b.getOdfCanvas().odfContainer().rootElement.fontFaceDecls.appendChild(m)),
n.updateStyle(h,g["style:text-properties"]))),e&&(e.paragraphPropertyNames&&(k(f,e.paragraphPropertyNames),0===f.attributes.length&&c.removeChild(f)),e.textPropertyNames&&(k(h,e.textPropertyNames),0===h.attributes.length&&c.removeChild(h))),b.getOdfCanvas().refreshCSS(),b.emit(ops.OdtDocument.signalParagraphStyleModified,a),b.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:b,timestamp:h,styleName:a,setProperties:g,removedProperties:e}}};
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
ops.OpAddParagraphStyle=function(){var k=this,l,n,c,b,h=odf.Namespaces.svgns,a=odf.Namespaces.stylens;this.init=function(a){l=a.memberid;n=a.timestamp;c=a.styleName;b=a.setProperties};this.transform=function(a,b){var d=a.spec();return"UpdateParagraphStyle"!==d.optype&&"RemoveParagraphStyle"!==d.optype||d.styleName!==c?[k]:null};this.execute=function(g){var e=g.getOdfCanvas().odfContainer(),d=g.getFormatting(),k=g.getDOM(),f=k.createElementNS(a,"style:style"),l,m,n,q,w;if(!f)return!1;f.setAttributeNS(a,
"style:family","paragraph");f.setAttributeNS(a,"style:name",c);b&&Object.keys(b).forEach(function(c){switch(c){case "style:paragraph-properties":l=k.createElementNS(a,"style:paragraph-properties");f.appendChild(l);d.updateStyle(l,b["style:paragraph-properties"]);break;case "style:text-properties":m=k.createElementNS(a,"style:text-properties");f.appendChild(m);(q=b["style:text-properties"]["style:font-name"])&&!d.getFontMap().hasOwnProperty(q)&&(n=k.createElementNS(a,"style:font-face"),n.setAttributeNS(a,
"style:name",q),n.setAttributeNS(h,"svg:font-family",q),e.rootElement.fontFaceDecls.appendChild(n));d.updateStyle(m,b["style:text-properties"]);break;default:"object"!==typeof b[c]&&(w=odf.Namespaces.resolvePrefix(c.substr(0,c.indexOf(":"))),f.setAttributeNS(w,c,b[c]))}});e.rootElement.styles.appendChild(f);g.getOdfCanvas().refreshCSS();g.emit(ops.OdtDocument.signalStyleCreated,c);return!0};this.spec=function(){return{optype:"AddParagraphStyle",memberid:l,timestamp:n,styleName:c,setProperties:b}}};
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
ops.OpRemoveParagraphStyle=function(){var k=this,l,n,c;this.init=function(b){l=b.memberid;n=b.timestamp;c=b.styleName};this.transform=function(b,h){var a=b.spec(),g=a.optype;if("RemoveParagraphStyle"===g){if(a.styleName===c)return[]}else if("SetParagraphStyle"===g&&a.styleName===c)return a.styleName="",g=new ops.OpSetParagraphStyle,g.init(a),[g,k];return[k]};this.execute=function(b){var h=b.getParagraphStyleElement(c);if(!h)return!1;h.parentNode.removeChild(h);b.getOdfCanvas().refreshCSS();b.emit(ops.OdtDocument.signalStyleDeleted,
c);return!0};this.spec=function(){return{optype:"RemoveParagraphStyle",memberid:l,timestamp:n,styleName:c}}};
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
ops.OpAddAnnotation=function(){function k(a,b,c){if(c=a.getPositionInTextNode(c))a=c.textNode,c.offset!==a.length&&a.splitText(c.offset),a.parentNode.insertBefore(b,a.nextSibling)}var l,n,c,b,h;this.init=function(a){l=a.memberid;n=parseInt(a.timestamp,10);c=parseInt(a.position,10);b=parseInt(a.length,10)||0;h=a.name};this.transform=function(a,b){return null};this.execute=function(a){var g={},e=new Date(n),d,t,f,s,m;m=a.getRootNode().ownerDocument;d=m.createElementNS(odf.Namespaces.officens,"office:annotation");
d.setAttributeNS(odf.Namespaces.officens,"office:name",h);t=m.createElementNS(odf.Namespaces.dcns,"dc:creator");t.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",l);f=m.createElementNS(odf.Namespaces.dcns,"dc:date");f.appendChild(m.createTextNode(e.toISOString()));e=m.createElementNS(odf.Namespaces.textns,"text:list");s=m.createElementNS(odf.Namespaces.textns,"text:list-item");m=m.createElementNS(odf.Namespaces.textns,"text:p");s.appendChild(m);e.appendChild(s);d.appendChild(t);
d.appendChild(f);d.appendChild(e);g.node=d;if(!g.node)return!1;if(b){d=a.getRootNode().ownerDocument.createElementNS(odf.Namespaces.officens,"office:annotation-end");d.setAttributeNS(odf.Namespaces.officens,"office:name",h);g.end=d;if(!g.end)return!1;k(a,g.end,c+b)}k(a,g.node,c);a.getOdfCanvas().addAnnotation(g);return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:l,timestamp:n,position:c,length:b,name:h}}};
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
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpAddParagraphStyle");runtime.loadClass("ops.OpRemoveParagraphStyle");
runtime.loadClass("ops.OpAddAnnotation");
ops.OperationFactory=function(){function k(k){return function(){return new k}}var l;this.register=function(k,c){l[k]=c};this.create=function(k){var c=null,b=l[k.optype];b&&(c=b(k),c.init(k));return c};l={AddCursor:k(ops.OpAddCursor),ApplyDirectStyling:k(ops.OpApplyDirectStyling),InsertTable:k(ops.OpInsertTable),InsertText:k(ops.OpInsertText),RemoveText:k(ops.OpRemoveText),SplitParagraph:k(ops.OpSplitParagraph),SetParagraphStyle:k(ops.OpSetParagraphStyle),UpdateParagraphStyle:k(ops.OpUpdateParagraphStyle),AddParagraphStyle:k(ops.OpAddParagraphStyle),
RemoveParagraphStyle:k(ops.OpRemoveParagraphStyle),MoveCursor:k(ops.OpMoveCursor),RemoveCursor:k(ops.OpRemoveCursor),AddAnnotation:k(ops.OpAddAnnotation)}};
// Input 57
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(k,l){function n(){w.setUnfilteredPosition(k.getNode(),0);return w}function c(a,b,d){var c;d.setStart(a,b);c=d.getClientRects()[0];if(!c)if(c={},a.childNodes[b-1]){d.setStart(a,b-1);d.setEnd(a,b);b=d.getClientRects()[0];if(!b){for(d=b=0;a&&a.nodeType===Node.ELEMENT_NODE;)b+=a.offsetLeft-a.scrollLeft,d+=a.offsetTop-a.scrollTop,a=a.parentNode;b={top:d,left:b}}runtime.assert(b,"getRect: invalid containerOffset");c.top=b.top;c.left=b.right;c.bottom=b.bottom}else a.nodeType===
Node.TEXT_NODE?(a.previousSibling&&(c=a.previousSibling.getClientRects()[0]),c||(d.setStart(a,0),d.setEnd(a,b),c=d.getClientRects()[0])):c=a.getClientRects()[0];runtime.assert(c,"getRect invalid rect");runtime.assert(void 0!==c.top,"getRect rect without top property");return{top:c.top,left:c.left,bottom:c.bottom}}function b(a,b,d){var e=a,f=n(),g,h=l.ownerDocument.createRange(),m=k.getSelectedRange()?k.getSelectedRange().cloneRange():l.ownerDocument.createRange(),q,r=runtime.getWindow();for(g=c(k.getNode(),
0,h);0<e&&d();)e-=1;b?(b=f.container(),f=f.unfilteredDomOffset(),-1===m.comparePoint(b,f)?(m.setStart(b,f),q=!1):m.setEnd(b,f)):(m.setStart(f.container(),f.unfilteredDomOffset()),m.collapse(!0));k.setSelectedRange(m,q);m=c(k.getNode(),0,h);if(m.top===g.top||void 0===u)u=m.left;r.clearTimeout(y);y=r.setTimeout(function(){u=void 0},2E3);h.detach();return a-e}function h(a){var b=n();return a.acceptPosition(b)===v?!0:!1}function a(a,b){for(var d=n(),c=new core.LoopWatchDog(1E3),e=0,f=0;0<a&&d.nextPosition();)e+=
1,c.check(),b.acceptPosition(d)===v&&(f+=e,e=0,a-=1);return f}function g(a,b,d){for(var c=n(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&c.nextPosition();)e.check(),d.acceptPosition(c)===v&&(f+=1,b.acceptPosition(c)===v&&(g+=f,f=0,a-=1));return g}function e(a,b,d){for(var c=n(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&c.previousPosition();)e.check(),d.acceptPosition(c)===v&&(f+=1,b.acceptPosition(c)===v&&(g+=f,f=0,a-=1));return g}function d(a,b){for(var c=n(),d=new core.LoopWatchDog(1E3),e=0,f=0;0<
a&&c.previousPosition();)e+=1,d.check(),b.acceptPosition(c)===v&&(f+=e,e=0,a-=1);return f}function t(b){var c=n(),e=q.getParagraphElement(c.getCurrentNode()),f;f=-d(1,b);if(0===f||e&&e!==q.getParagraphElement(c.getCurrentNode()))f=a(1,b);return f}function f(a,b){var d=n(),e=0,f=0,g=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var h=b,m=g,k=d,q=k.container(),r=0,s=null,w=void 0,t=10,y=void 0,ba=0,M=void 0,$=void 0,T=void 0,y=void 0,P=l.ownerDocument.createRange(),F=new core.LoopWatchDog(1E3),y=c(q,k.unfilteredDomOffset(),
P),M=y.top,$=void 0===u?y.left:u,T=M;!0===(0>m?k.previousPosition():k.nextPosition());)if(F.check(),h.acceptPosition(k)===v&&(r+=1,q=k.container(),y=c(q,k.unfilteredDomOffset(),P),y.top!==M)){if(y.top!==T&&T!==M)break;T=y.top;y=Math.abs($-y.left);if(null===s||y<t)s=q,w=k.unfilteredDomOffset(),t=y,ba=r}null!==s?(k.setUnfilteredPosition(s,w),r=ba):r=0;P.detach();e+=r;if(0===e)break;f+=e;a-=1}return f*g}function s(a,b){var d,e,f,g,h=n(),k=q.getParagraphElement(h.getCurrentNode()),m=0,r=l.ownerDocument.createRange();
0>a?(d=h.previousPosition,e=-1):(d=h.nextPosition,e=1);for(f=c(h.container(),h.unfilteredDomOffset(),r);d.call(h);)if(b.acceptPosition(h)===v){if(q.getParagraphElement(h.getCurrentNode())!==k)break;g=c(h.container(),h.unfilteredDomOffset(),r);if(g.bottom!==f.bottom&&(f=g.top>=f.top&&g.bottom<f.bottom||g.top<=f.top&&g.bottom>f.bottom,!f))break;m+=e;f=g}r.detach();return m}function m(a,b){for(var d=0,c;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(c=b.firstChild;c!==
a;)d+=1,c=c.nextSibling;return d}function r(a,b,d){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var c=n(),e=c.container(),f=c.unfilteredDomOffset(),g=0,h=new core.LoopWatchDog(1E3);c.setUnfilteredPosition(a,b);a=c.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=c.unfilteredDomOffset();c.setUnfilteredPosition(e,f);var e=a,f=b,k=c.container(),l=c.unfilteredDomOffset();if(e===k)e=l-
f;else{var q=e.compareDocumentPosition(k);2===q?q=-1:4===q?q=1:10===q?(f=m(e,k),q=f<l?1:-1):(l=m(k,e),q=l<f?-1:1);e=q}if(0>e)for(;c.nextPosition()&&(h.check(),d.acceptPosition(c)===v&&(g+=1),c.container()!==a||c.unfilteredDomOffset()!==b););else if(0<e)for(;c.previousPosition()&&(h.check(),d.acceptPosition(c)===v&&(g-=1),c.container()!==a||c.unfilteredDomOffset()!==b););return g}var q,w,u,y,v=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,c){return b(a,c,w.nextPosition)};
this.movePointBackward=function(a,c){return b(a,c,w.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:a,countBackwardSteps:d,convertForwardStepsBetweenFilters:g,convertBackwardStepsBetweenFilters:e,countLinesSteps:f,countStepsToLineBoundary:s,countStepsToPosition:r,isPositionWalkable:h,countStepsToValidPosition:t}};(function(){q=new odf.OdfUtils;w=gui.SelectionMover.createPositionIterator(l);var a=l.ownerDocument.createRange();a.setStart(w.container(),w.unfilteredDomOffset());
a.collapse(!0);k.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(k){var l=new function(){this.acceptNode=function(k){return"urn:webodf:names:cursor"===k.namespaceURI||"urn:webodf:names:editinfo"===k.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(k,5,l,!1)};(function(){return gui.SelectionMover})();
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
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpAddParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpRemoveParagraphStyle");
ops.OperationTransformer=function(){function k(n,c){for(var b,h,a,g=[],e=[];0<n.length&&c;){b=n.shift();h=c;var d=void 0;a=d=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b.spec()));runtime.log(runtime.toJson(h.spec()));d=l.create(h.spec());a=h.transform(b,!0);h=(d=b.transform(d,!1))&&a?{opsA:d,opsB:a}:null;if(!h)return null;g=g.concat(h.opsA);if(0===h.opsB.length){g=g.concat(n);c=null;break}if(1<h.opsB.length)for(b=0;b<h.opsB.length-1;b+=1){a=k(n,h.opsB[b]);if(!a)return null;
e=e.concat(a.opsB);n=a.opsA}c=h.opsB.pop()}c&&e.push(c);return{opsA:g,opsB:e}}var l;this.setOperationFactory=function(k){l=k};this.transform=function(n,c){var b,h=[],a,g=[];for(b=0;b<n.length;b+=1){a=l.create(n[b]);if(!a)return null;h.push(a)}for(b=0;b<c.length;b+=1){a=l.create(c[b]);a=k(h,a);if(!a)return null;h=a.opsA;g=g.concat(a.opsB)}return{opsA:h,opsB:g}}};
// Input 59
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(k,l){var n=this,c,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,a){var g=0;0<b?g=c.movePointForward(b,a):0>=b&&(g=-c.movePointBackward(-b,a));n.handleUpdate();return g};this.handleUpdate=function(){};this.getStepCounter=function(){return c.getStepCounter()};this.getMemberId=function(){return k};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.getOdtDocument=function(){return l};b=new core.Cursor(l.getDOM(),k);c=new gui.SelectionMover(b,l.getRootNode())};
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
ops.EditInfo=function(k,l){function n(){var c=[],a;for(a in b)b.hasOwnProperty(a)&&c.push({memberid:a,time:b[a].time});c.sort(function(a,b){return a.time-b.time});return c}var c,b={};this.getNode=function(){return c};this.getOdtDocument=function(){return l};this.getEdits=function(){return b};this.getSortedEdits=function(){return n()};this.addEdit=function(c,a){b[c]={time:a}};this.clearEdits=function(){b={}};c=l.getDOM().createElementNS("urn:webodf:names:editinfo","editinfo");k.insertBefore(c,k.firstChild)};
// Input 61
gui.Avatar=function(k,l){var n=this,c,b,h;this.setColor=function(a){b.style.borderColor=a};this.setImageUrl=function(a){n.isVisible()?b.src=a:h=a};this.isVisible=function(){return"block"===c.style.display};this.show=function(){h&&(b.src=h,h=void 0);c.style.display="block"};this.hide=function(){c.style.display="none"};this.markAsFocussed=function(a){c.className=a?"active":""};(function(){var a=k.ownerDocument,g=a.documentElement.namespaceURI;c=a.createElementNS(g,"div");b=a.createElementNS(g,"img");
b.width=64;b.height=64;c.appendChild(b);c.style.width="64px";c.style.height="70px";c.style.position="absolute";c.style.top="-80px";c.style.left="-34px";c.style.display=l?"block":"none";k.appendChild(c)})()};
// Input 62
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(k,l,n){function c(a){e&&g.parentNode&&(!d||a)&&(a&&void 0!==t&&runtime.clearTimeout(t),d=!0,h.style.opacity=a||"0"===h.style.opacity?"1":"0",t=runtime.setTimeout(function(){d=!1;c(!1)},500))}function b(a){var b;if("string"===typeof a){if(""===a)return 0;b=/^(\d+)(\.\d+)?px$/.exec(a);runtime.assert(null!==b,"size ["+a+"] does not have unit px.");return parseFloat(b[1])}return a}var h,a,g,e=!1,d=!1,t;this.refreshCursorBlinking=function(){n||k.getSelectedRange().collapsed?(e=!0,c(!0)):
(e=!1,h.style.opacity="0")};this.setFocus=function(){e=!0;a.markAsFocussed(!0);c(!0)};this.removeFocus=function(){e=!1;a.markAsFocussed(!1);h.style.opacity="0"};this.setAvatarImageUrl=function(b){a.setImageUrl(b)};this.setColor=function(b){h.style.borderColor=b;a.setColor(b)};this.getCursor=function(){return k};this.getFocusElement=function(){return h};this.toggleHandleVisibility=function(){a.isVisible()?a.hide():a.show()};this.showHandle=function(){a.show()};this.hideHandle=function(){a.hide()};
this.ensureVisible=function(){var a,c,d,e,g,l,n,t=k.getOdtDocument().getOdfCanvas().getElement().parentNode;g=n=h;d=runtime.getWindow();runtime.assert(null!==d,"Expected to be run in an environment which has a global window, like a browser.");do{g=g.parentElement;if(!g)break;l=d.getComputedStyle(g,null)}while("block"!==l.display);l=g;g=e=0;if(l&&t){c=!1;do{d=l.offsetParent;for(a=l.parentNode;a!==d;){if(a===t){a=l;var v=t,p=0;c=0;var x=void 0,D=runtime.getWindow();for(runtime.assert(null!==D,"Expected to be run in an environment which has a global window, like a browser.");a&&
a!==v;)x=D.getComputedStyle(a,null),p+=b(x.marginLeft)+b(x.borderLeftWidth)+b(x.paddingLeft),c+=b(x.marginTop)+b(x.borderTopWidth)+b(x.paddingTop),a=a.parentElement;a=p;e+=a;g+=c;c=!0;break}a=a.parentNode}if(c)break;e+=b(l.offsetLeft);g+=b(l.offsetTop);l=d}while(l&&l!==t);d=e;e=g}else e=d=0;d+=n.offsetLeft;e+=n.offsetTop;g=d-5;l=e-5;d=d+n.scrollWidth-1+5;n=e+n.scrollHeight-1+5;l<t.scrollTop?t.scrollTop=l:n>t.scrollTop+t.clientHeight-1&&(t.scrollTop=n-t.clientHeight+1);g<t.scrollLeft?t.scrollLeft=
g:d>t.scrollLeft+t.clientWidth-1&&(t.scrollLeft=d-t.clientWidth+1)};(function(){var b=k.getOdtDocument().getDOM();h=b.createElementNS(b.documentElement.namespaceURI,"span");g=k.getNode();g.appendChild(h);a=new gui.Avatar(g,l)})()};
// Input 63
runtime.loadClass("core.EventNotifier");
gui.ClickHandler=function(){function k(){n=0;c=null}var l,n=0,c=null,b=new core.EventNotifier([gui.ClickHandler.signalSingleClick,gui.ClickHandler.signalDoubleClick,gui.ClickHandler.signalTripleClick]);this.subscribe=function(c,a){b.subscribe(c,a)};this.handleMouseUp=function(h){var a=runtime.getWindow();c&&c.x===h.screenX&&c.y===h.screenY?(n+=1,1===n?b.emit(gui.ClickHandler.signalSingleClick,h):2===n?b.emit(gui.ClickHandler.signalDoubleClick,void 0):3===n&&(a.clearTimeout(l),b.emit(gui.ClickHandler.signalTripleClick,
void 0),k())):(b.emit(gui.ClickHandler.signalSingleClick,h),n=1,c={x:h.screenX,y:h.screenY},a.clearTimeout(l),l=a.setTimeout(k,400))}};gui.ClickHandler.signalSingleClick="click";gui.ClickHandler.signalDoubleClick="doubleClick";gui.ClickHandler.signalTripleClick="tripleClick";(function(){return gui.ClickHandler})();
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
gui.KeyboardHandler=function(){function k(b,c){c||(c=l.None);return b+":"+c}var l=gui.KeyboardHandler.Modifier,n=null,c={};this.setDefault=function(b){n=b};this.bind=function(b,h,a){b=k(b,h);runtime.assert(!1===c.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);c[b]=a};this.unbind=function(b,h){var a=k(b,h);delete c[a]};this.reset=function(){n=null;c={}};this.handleEvent=function(b){var h=b.keyCode,a=l.None;b.metaKey&&(a|=l.Meta);b.ctrlKey&&(a|=l.Ctrl);b.altKey&&(a|=l.Alt);
b.shiftKey&&(a|=l.Shift);h=k(h,a);h=c[h];a=!1;h?a=h():null!==n&&(a=n(b));a&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,I:73,U:85,Z:90};(function(){return gui.KeyboardHandler})();
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
gui.Clipboard=function(){var k,l,n;this.setDataFromRange=function(c,b){var h=!0,a,g=c.clipboardData;a=runtime.getWindow();var e=b.startContainer.ownerDocument;!g&&a&&(g=a.clipboardData);g?(e=e.createElement("span"),e.appendChild(b.cloneContents()),a=g.setData("text/plain",l.writeToString(e)),h=h&&a,a=g.setData("text/html",k.writeToString(e,odf.Namespaces.namespaceMap)),h=h&&a,c.preventDefault()):h=!1;return h};k=new xmldom.LSSerializer;l=new odf.TextSerializer;n=new odf.OdfNodeFilter;k.filter=n;l.filter=
n};
// Input 66
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("gui.ClickHandler");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.StyleHelper");
gui.SessionController=function(){gui.SessionController=function(k,l){function n(a,b,c,d){var e="on"+b,f=!1;a.attachEvent&&(f=a.attachEvent(e,c));!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0);f&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function c(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function b(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function h(a,b){var c=new ops.OpMoveCursor;c.init({memberid:l,
position:a,length:b||0});return c}function a(a,b){var c=gui.SelectionMover.createPositionIterator(C.getRootNode()),d=C.getOdfCanvas().getElement(),e;e=a;if(!e)return null;for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return null;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,b);return C.getDistanceFromCursor(l,c.container(),
c.unfilteredDomOffset())}function g(a){var b=C.getOdfCanvas().getElement(),c=C.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function e(b){runtime.setTimeout(function(){var c;a:{var d=C.getOdfCanvas().getElement(),e=W.getSelection(),f,m,n,q;if(null===e.anchorNode&&null===e.focusNode){c=b.clientX;f=b.clientY;m=C.getDOM();m.caretRangeFromPoint?
(c=m.caretRangeFromPoint(c,f),f={container:c.startContainer,offset:c.startOffset}):m.caretPositionFromPoint?(c=m.caretPositionFromPoint(c,f),f={container:c.offsetNode,offset:c.offset}):f=null;if(!f){c=null;break a}c=f.container;f=f.offset;m=c;e=f}else c=e.anchorNode,f=e.anchorOffset,m=e.focusNode,e=e.focusOffset;runtime.assert(null!==c&&null!==m,"anchorNode is null or focusNode is null");n=na.containsNode(d,c);q=na.containsNode(d,m);n||q?(n||(n=g(c),c=n.node,f=n.offset),q||(n=g(m),m=n.node,e=n.offset),
d.focus(),c={anchorNode:c,anchorOffset:f,focusNode:m,focusOffset:e}):c=null}null!==c&&(d=a(c.anchorNode,c.anchorOffset),f=c.focusNode===c.anchorNode&&c.focusOffset===c.anchorOffset?d:a(c.focusNode,c.focusOffset),null!==f&&0!==f||null!==d&&0!==d)&&(c=C.getCursorPosition(l),d=h(c+d,f-d),k.enqueue(d))},0)}function d(a){e(a)}function t(){var a=C.getOdfCanvas().getElement(),b=/[A-Za-z0-9]/,c=0,d=0,e,f,g,m;if(na.containsNode(a,W.getSelection().focusNode)){a=gui.SelectionMover.createPositionIterator(C.getRootNode());
e=C.getCursor(l).getNode();a.setUnfilteredPosition(e,0);if(a.previousPosition()&&(f=a.getCurrentNode(),f.nodeType===Node.TEXT_NODE))for(g=f.data.length-1;0<=g;g-=1){m=f.data[g];if(!b.test(m))break;c-=1}a.setUnfilteredPosition(e,0);if(a.nextPosition()&&(f=a.getCurrentNode(),f.nodeType===Node.TEXT_NODE))for(g=0;g<f.data.length;g+=1){m=f.data[g];if(!b.test(m))break;d+=1}if(0!==c||0!==d)b=C.getCursorPosition(l),c=h(b+c,Math.abs(c)+Math.abs(d)),k.enqueue(c)}}function f(){var a=C.getOdfCanvas().getElement(),
b,c;na.containsNode(a,W.getSelection().focusNode)&&(c=C.getParagraphElement(C.getCursor(l).getNode()),a=C.getDistanceFromCursor(l,c,0),b=gui.SelectionMover.createPositionIterator(C.getRootNode()),b.moveToEndOfNode(c),c=C.getDistanceFromCursor(l,c,b.unfilteredDomOffset()),0!==a||0!==c)&&(b=C.getCursorPosition(l),a=h(b+a,Math.abs(a)+Math.abs(c)),k.enqueue(a))}function s(a){var b=C.getCursorSelection(l),c=C.getCursor(l).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,la,pa):-c.convertBackwardStepsBetweenFilters(-a,
la,pa),a=b.length+a,k.enqueue(h(b.position,a)))}function m(a){var b=C.getCursorPosition(l),c=C.getCursor(l).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,la,pa):-c.convertBackwardStepsBetweenFilters(-a,la,pa),k.enqueue(h(b+a,0)))}function r(){m(-1);return!0}function q(){m(1);return!0}function w(){s(-1);return!0}function u(){s(1);return!0}function y(a,b){var c=C.getParagraphElement(C.getCursor(l).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");
c=C.getCursor(l).getStepCounter().countLinesSteps(a,la);b?s(c):m(c)}function v(){y(-1,!1);return!0}function p(){y(1,!1);return!0}function x(){y(-1,!0);return!0}function D(){y(1,!0);return!0}function G(a,b){var c=C.getCursor(l).getStepCounter().countStepsToLineBoundary(a,la);b?s(c):m(c)}function A(){G(-1,!1);return!0}function N(){G(1,!1);return!0}function B(){G(-1,!0);return!0}function O(){G(1,!0);return!0}function z(){var a=C.getParagraphElement(C.getCursor(l).getNode()),b,c;runtime.assert(Boolean(a),
"SessionController: Cursor outside paragraph");c=C.getDistanceFromCursor(l,a,0);b=gui.SelectionMover.createPositionIterator(C.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),ua.isParagraph(a)&&(c=C.getDistanceFromCursor(l,a,0));s(c);return!0}function I(){var a=C.getParagraphElement(C.getCursor(l).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(C.getRootNode());b.moveToEndOfNode(a);
for(c=C.getDistanceFromCursor(l,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),ua.isParagraph(a)&&(b.moveToEndOfNode(a),c=C.getDistanceFromCursor(l,b.container(),b.unfilteredDomOffset()));s(c);return!0}function X(a,b){var c=gui.SelectionMover.createPositionIterator(C.getRootNode());0<a&&c.moveToEnd();c=C.getDistanceFromCursor(l,c.container(),c.unfilteredDomOffset());b?s(c):m(c)}function ea(){X(-1,!1);return!0}function V(){X(1,!1);return!0}function ma(){X(-1,!0);
return!0}function da(){X(1,!0);return!0}function ba(){var a=gui.SelectionMover.createPositionIterator(C.getRootNode()),b;b=-C.getDistanceFromCursor(l,a.container(),a.unfilteredDomOffset());a.moveToEnd();b+=C.getDistanceFromCursor(l,a.container(),a.unfilteredDomOffset());k.enqueue(h(0,b));return!0}function M(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function $(a){var b=new ops.OpRemoveText;b.init({memberid:l,position:a.position,length:a.length});return b}function T(){var a=
M(C.getCursorSelection(l)),b=null;0===a.length?0<a.position&&C.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:l,position:a.position-1,length:1}),k.enqueue(b)):(b=$(a),k.enqueue(b));return!0}function P(){var a=M(C.getCursorSelection(l)),b=null;0===a.length?C.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:l,position:a.position,length:1}),k.enqueue(b)):(b=$(a),k.enqueue(b));return null!==b}function F(){var a=M(C.getCursorSelection(l));0!==
a.length&&k.enqueue($(a));return!0}function J(a){var b=M(C.getCursorSelection(l)),c=null;0<b.length&&(c=$(b),k.enqueue(c));c=new ops.OpInsertText;c.init({memberid:l,position:b.position,text:a});k.enqueue(c)}function R(){var a=C.getCursorPosition(l),b;b=new ops.OpSplitParagraph;b.init({memberid:l,position:a});k.enqueue(b);return!0}function L(){var a=C.getCursor(l),b=W.getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function S(a){var b=C.getCursor(l);b.getSelectedRange().collapsed||
(va.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=M(k.getOdtDocument().getCursorSelection(l)),b.init({memberid:l,position:a.position,length:a.length}),k.enqueue(b)):runtime.log("Cut operation failed"))}function ga(){return!1!==C.getCursor(l).getSelectedRange().collapsed}function K(a){var b=C.getCursor(l);b.getSelectedRange().collapsed||va.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function E(a){var b;W.clipboardData&&W.clipboardData.getData?
b=W.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(J(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function fa(){return!1}function ha(a){if(ca)ca.onOperationExecuted(a)}function Z(a){C.emit(ops.OdtDocument.signalUndoStackChanged,a)}function ia(){return ca?(ca.moveBackward(1),L(),!0):!1}function Q(){return ca?(ca.moveForward(1),L(),!0):!1}function ja(a,b){var c=C.getCursorSelection(l),d=new ops.OpApplyDirectStyling,e=
{};e[a]=b;d.init({memberid:l,position:c.position,length:c.length,setProperties:{"style:text-properties":e}});k.enqueue(d)}function aa(){var a=C.getCursor(l).getSelectedRange(),a=ra.isBold(a)?"normal":"bold";ja("fo:font-weight",a);return!0}function ka(){var a=C.getCursor(l).getSelectedRange(),a=ra.isItalic(a)?"normal":"italic";ja("fo:font-style",a);return!0}function qa(){var a=C.getCursor(l).getSelectedRange(),a=ra.hasUnderline(a)?"none":"solid";ja("style:text-underline-style",a);return!0}var W=runtime.getWindow(),
C=k.getOdtDocument(),na=new core.DomUtils,ua=new odf.OdfUtils,va=new gui.Clipboard,oa=new gui.ClickHandler,H=new gui.KeyboardHandler,sa=new gui.KeyboardHandler,ra=new gui.StyleHelper(C.getFormatting()),la=new core.PositionFilterChain,pa=C.getPositionFilter(),ca=null;runtime.assert(null!==W,"Expected to be run in an environment which has a global window, like a browser.");la.addFilter("BaseFilter",pa);la.addFilter("RootFilter",C.createRootFilter(l));this.startEditing=function(){var a;a=C.getOdfCanvas().getElement();
n(a,"keydown",H.handleEvent);n(a,"keypress",sa.handleEvent);n(a,"keyup",b);n(a,"beforecut",ga,!0);n(a,"cut",S);n(a,"copy",K);n(a,"beforepaste",fa,!0);n(a,"paste",E);n(W,"mouseup",oa.handleMouseUp);n(a,"contextmenu",d);C.subscribe(ops.OdtDocument.signalOperationExecuted,L);C.subscribe(ops.OdtDocument.signalOperationExecuted,ha);a=new ops.OpAddCursor;a.init({memberid:l});k.enqueue(a);ca&&ca.saveInitialState()};this.endEditing=function(){var a;C.unsubscribe(ops.OdtDocument.signalOperationExecuted,ha);
C.unsubscribe(ops.OdtDocument.signalOperationExecuted,L);a=C.getOdfCanvas().getElement();c(a,"keydown",H.handleEvent);c(a,"keypress",sa.handleEvent);c(a,"keyup",b);c(a,"cut",S);c(a,"beforecut",ga);c(a,"copy",K);c(a,"paste",E);c(a,"beforepaste",fa);c(W,"mouseup",oa.handleMouseUp);c(a,"contextmenu",d);a=new ops.OpRemoveCursor;a.init({memberid:l});k.enqueue(a);ca&&ca.resetInitialState()};this.getInputMemberId=function(){return l};this.getSession=function(){return k};this.setUndoManager=function(a){ca&&
ca.unsubscribe(gui.UndoManager.signalUndoStackChanged,Z);if(ca=a)ca.setOdtDocument(C),ca.setPlaybackFunction(function(a){a.execute(C)}),ca.subscribe(gui.UndoManager.signalUndoStackChanged,Z)};this.getUndoManager=function(){return ca};(function(){var a=-1!==W.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;H.bind(c.Tab,b.None,function(){J("\t");return!0});H.bind(c.Left,b.None,r);H.bind(c.Right,b.None,q);H.bind(c.Up,b.None,v);H.bind(c.Down,
b.None,p);H.bind(c.Backspace,b.None,T);H.bind(c.Delete,b.None,P);H.bind(c.Left,b.Shift,w);H.bind(c.Right,b.Shift,u);H.bind(c.Up,b.Shift,x);H.bind(c.Down,b.Shift,D);H.bind(c.Home,b.None,A);H.bind(c.End,b.None,N);H.bind(c.Home,b.Ctrl,ea);H.bind(c.End,b.Ctrl,V);H.bind(c.Home,b.Shift,B);H.bind(c.End,b.Shift,O);H.bind(c.Up,b.CtrlShift,z);H.bind(c.Down,b.CtrlShift,I);H.bind(c.Home,b.CtrlShift,ma);H.bind(c.End,b.CtrlShift,da);a?(H.bind(c.Clear,b.None,F),H.bind(c.Left,b.Meta,A),H.bind(c.Right,b.Meta,N),H.bind(c.Home,
b.Meta,ea),H.bind(c.End,b.Meta,V),H.bind(c.Left,b.MetaShift,B),H.bind(c.Right,b.MetaShift,O),H.bind(c.Up,b.AltShift,z),H.bind(c.Down,b.AltShift,I),H.bind(c.Up,b.MetaShift,ma),H.bind(c.Down,b.MetaShift,da),H.bind(c.A,b.Meta,ba),H.bind(c.B,b.Meta,aa),H.bind(c.I,b.Meta,ka),H.bind(c.U,b.Meta,qa),H.bind(c.Z,b.Meta,ia),H.bind(c.Z,b.MetaShift,Q)):(H.bind(c.A,b.Ctrl,ba),H.bind(c.B,b.Ctrl,aa),H.bind(c.I,b.Ctrl,ka),H.bind(c.U,b.Ctrl,qa),H.bind(c.Z,b.Ctrl,ia),H.bind(c.Z,b.CtrlShift,Q));sa.setDefault(function(a){var b;
b=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(J(b),!0)});sa.bind(c.Enter,b.None,R);oa.subscribe(gui.ClickHandler.signalSingleClick,e);oa.subscribe(gui.ClickHandler.signalDoubleClick,t);oa.subscribe(gui.ClickHandler.signalTripleClick,f)})()};return gui.SessionController}();
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
ops.MemberModel=function(){};ops.MemberModel.prototype.getMemberDetailsAndUpdates=function(k,l){};ops.MemberModel.prototype.unsubscribeMemberDetailsUpdates=function(k,l){};
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
ops.TrivialMemberModel=function(){this.getMemberDetailsAndUpdates=function(k,l){l(k,null)};this.unsubscribeMemberDetailsUpdates=function(k,l){}};
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
ops.NowjsMemberModel=function(k){var l={},n={},c=k.getNowObject();this.getMemberDetailsAndUpdates=function(b,h){var a=b.split("___")[0],g=l[a],e=n[a]||[],d;n[a]=e;runtime.assert(void 0!==h,"missing callback");for(d=0;d<e.length&&(e[d].subscriber!==h||e[d].memberId!==b);d+=1);d<e.length?runtime.log("double subscription request for "+b+" in NowjsMemberModel::getMemberDetailsAndUpdates"):(e.push({memberId:b,subscriber:h}),1===e.length&&c.subscribeUserDetailsUpdates(a));g&&h(b,g)};this.unsubscribeMemberDetailsUpdates=
function(b,h){var a,g=b.split("___")[0],e=n[g];runtime.assert(void 0!==h,"missing subscriber parameter or null");runtime.assert(e,"tried to unsubscribe when no one is subscribed ('"+b+"')");if(e){for(a=0;a<e.length&&(e[a].subscriber!==h||e[a].memberId!==b);a+=1);runtime.assert(a<e.length,"tried to unsubscribe when not subscribed for memberId '"+b+"'");e.splice(a,1);0===e.length&&(runtime.log("no more subscribers for: "+b),delete n[g],delete l[g],c.unsubscribeUserDetailsUpdates(g))}};c.updateUserDetails=
function(b,c){var a=c?{userid:c.uid,fullname:c.fullname,imageurl:"/user/"+c.avatarId+"/avatar.png",color:c.color}:null,g,e;if(g=n[b])for(l[b]=a,e=0;e<g.length;e+=1)g[e].subscriber(g[e].memberId,a)};runtime.assert("ready"===c.networkStatus,"network not ready")};
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
ops.PullBoxMemberModel=function(k,l){function n(){var a,c=Object.keys(h);runtime.log("member-list request for : "+c.join(","));l.call({command:"query_memberdata_list",args:{es_id:k,member_ids:c}},function(c){var e=runtime.fromJson(c),f;runtime.log("member-list reply: "+c);if(e.hasOwnProperty("memberdata_list"))for(c=e.memberdata_list,a=0;a<c.length;a+=1){if(e={memberid:c[a].member_id,fullname:c[a].display_name,imageurl:c[a].avatar_url,color:c[a].color},f=b.hasOwnProperty(e.memberid)?b[e.memberid]:
null,!f||f.fullname!==e.fullname||f.imageurl!==e.imageurl||f.color!==e.color){var k=f=void 0;if(f=h[e.memberid])for(b[e.memberid]=e,k=0;k<f.length;k+=1)f[k](e.memberid,e)}}else runtime.log("Meh, memberdata list broken: "+c)})}function c(){a&&(n(),runtime.setTimeout(c,2E4))}var b={},h={},a=!1;this.getMemberDetailsAndUpdates=function(g,e){var d=b[g],k=h[g]||[],f;h[g]=k;runtime.assert(void 0!==e,"missing callback");for(f=0;f<k.length&&k[f]!==e;f+=1);f<k.length?runtime.log("double subscription request for "+
g+" in PullBoxMemberModel::getMemberDetailsAndUpdates"):(k.push(e),1===k.length&&n());d&&e(g,d);a||(a=!0,runtime.setTimeout(c,2E4))};this.unsubscribeMemberDetailsUpdates=function(c,e){var d,k=h[c];runtime.assert(void 0!==e,"missing subscriber parameter or null");runtime.assert(k,"tried to unsubscribe when no one is subscribed ('"+c+"')");if(k){for(d=0;d<k.length&&k[d]!==e;d+=1);runtime.assert(d<k.length,"tried to unsubscribe when not subscribed for memberId '"+c+"'");k.splice(d,1);if(0===k.length){runtime.log("no more subscribers for: "+
c);delete h[c];delete b[c];a:{var f;if(a){for(f in h)if(h.hasOwnProperty(f))break a;a=!1}}}}};runtime.assert("ready"===l.networkStatus(),"network not ready")};
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
ops.TrivialOperationRouter=function(){var k,l;this.setOperationFactory=function(l){k=l};this.setPlaybackFunction=function(k){l=k};this.push=function(n){n=n.spec();n.timestamp=(new Date).getTime();n=k.create(n);l(n)}};
// Input 73
ops.NowjsOperationRouter=function(k,l,n){function c(a){var c;c=b.create(a);runtime.log(" op in: "+runtime.toJson(a));if(null!==c)if(a=Number(a.server_seq),runtime.assert(!isNaN(a),"server seq is not a number"),a===g+1)for(h(c),g=a,d=0,c=g+1;e.hasOwnProperty(c);c+=1)h(e[c]),delete e[c],runtime.log("op with server seq "+a+" taken from hold (reordered)");else runtime.assert(a!==g+1,"received incorrect order from server"),runtime.assert(!e.hasOwnProperty(a),"reorder_queue has incoming op"),runtime.log("op with server seq "+
a+" put on hold"),e[a]=c;else runtime.log("ignoring invalid incoming opspec: "+a)}var b,h,a=n.getNowObject(),g=-1,e={},d=0,t=1E3;this.setOperationFactory=function(a){b=a};this.setPlaybackFunction=function(a){h=a};a.ping=function(a){null!==l&&a(l)};a.receiveOp=function(a,b){a===k&&c(b)};this.push=function(b){b=b.spec();runtime.assert(null!==l,"Router sequence N/A without memberid");t+=1;b.client_nonce="C:"+l+":"+t;b.parent_op=g+"+"+d;d+=1;runtime.log("op out: "+runtime.toJson(b));a.deliverOp(k,b)};
this.requestReplay=function(b){a.requestReplay(k,function(a){runtime.log("replaying: "+runtime.toJson(a));c(a)},function(a){runtime.log("replay done ("+a+" ops).");b&&b()})}};
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
ops.PullBoxOperationRouter=function(k,l,n){function c(a){var b,c,d,f=[];for(b=0;b<a.length;)if(d=e.create(a[b]),null!==d&&d.merge){for(c=b+1;c<a.length&&d.merge(a[c]);c+=1)runtime.log("Merged: "+a[b].optype+" with "+a[c].optype);f.push(d.spec());b=c}else f.push(a[b]),b+=1;runtime.log("Merged: from "+a.length+" to "+f.length+" specs");return f}function b(){function a(){var b,c,f;m=!1;for(f=(new Date).getTime();0<y.length&&!(500<(new Date).getTime()-f);)b=y.shift(),c=e.create(b),runtime.log(" op in: "+
runtime.toJson(b)),null!==c?t(c):runtime.log("ignoring invalid incoming opspec: "+b);0<y.length?(m=!0,runtime.getWindow().setTimeout(a,1)):d&&(d(),d=null)}m||a()}function h(a){var b;if(!a)return runtime.assert(!1,"no opspecs received!"),!1;b=v.transform(u,a);if(!b)return!1;for(a=0;a<b.opsB.length;a+=1)y.push(b.opsB[a].spec());u=[];for(a=0;a<b.opsA.length;a+=1)u.push(b.opsA[a].spec());return!0}function a(){function d(){var b={active:!0};f=b;runtime.getWindow().setTimeout(function(){runtime.log("Pulling activated:"+
b.active);f=null;b.active&&a()},8E3)}function e(){var a;r||q||(r=!0,a=u,u=[],n.call({command:"sync_ops",args:{es_id:k,member_id:l,seq_head:String(w),client_ops:a}},function(f){var g=!1,k=runtime.fromJson(f);runtime.log("sync-ops reply: "+f);"new_ops"===k.result?0<k.ops.length&&(0===u.length?(f=c(k.ops),y=y.concat(f)):(runtime.log("meh, have new ops locally meanwhile, have to do transformations."),q=!h(c(k.ops))),w=k.head_seq):"added"===k.result?(runtime.log("All added to server"),w=k.head_seq):"conflict"===
k.result?(u=a.concat(u),runtime.log("meh, server has new ops meanwhile, have to do transformations."),q=!h(c(k.ops)),w=k.head_seq,q||(g=!0)):runtime.assert(!1,"Unexpected result on sync-ops call: "+k.result);r=!1;q?runtime.assert(!1,"Sorry to tell:\nwe hit a pair of operations in a state which yet need to be supported for transformation against each other.\nClient disconnected from session, no further editing accepted.\n\nPlease reconnect manually for now."):(g?e():(runtime.log("Preparing next: "+
(0===u.length)),0===u.length&&d()),b())}))}e()}function g(){r||s||(s=!0,f&&(f.active=!1),runtime.getWindow().setTimeout(function(){runtime.log("Pushing activated");s=!1;a()},3E3))}var e,d,t,f=null,s=!1,m=!1,r=!1,q=!1,w="",u=[],y=[],v=new ops.OperationTransformer;this.requestReplay=function(b){d=b;a()};this.setOperationFactory=function(a){e=a;v.setOperationFactory(a)};this.setPlaybackFunction=function(a){t=a};this.push=function(a){var b=a.spec();q||0<y.length||(b.timestamp=(new Date).getTime(),a=e.create(b),
t(a),u.push(b),g())}};
// Input 75
gui.EditInfoHandle=function(k){var l=[],n,c=k.ownerDocument,b=c.documentElement.namespaceURI;this.setEdits=function(h){l=h;var a,g,e,d;n.innerHTML="";for(h=0;h<l.length;h+=1)a=c.createElementNS(b,"div"),a.className="editInfo",g=c.createElementNS(b,"span"),g.className="editInfoColor",g.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[h].memberid),e=c.createElementNS(b,"span"),e.className="editInfoAuthor",e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[h].memberid),
d=c.createElementNS(b,"span"),d.className="editInfoTime",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[h].memberid),d.innerHTML=l[h].time,a.appendChild(g),a.appendChild(e),a.appendChild(d),n.appendChild(a)};this.show=function(){n.style.display="block"};this.hide=function(){n.style.display="none"};n=c.createElementNS(b,"div");n.setAttribute("class","editInfoHandle");n.style.display="none";k.appendChild(n)};
// Input 76
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(k,l){function n(b,c){return runtime.getWindow().setTimeout(function(){a.style.opacity=b},c)}var c=this,b,h,a,g,e;this.addEdit=function(b,c){var f=Date.now()-c;k.addEdit(b,c);h.setEdits(k.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);if(g){var l=g;runtime.getWindow().clearTimeout(l)}e&&(l=e,runtime.getWindow().clearTimeout(l));1E4>f?(n(1,0),g=n(0.5,1E4-f),e=n(0.2,2E4-f)):1E4<=f&&2E4>f?(n(0.5,0),e=n(0.2,2E4-f)):n(0.2,0)};this.getEdits=
function(){return k.getEdits()};this.clearEdits=function(){k.clearEdits();h.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return k};this.show=function(){a.style.display="block"};this.hide=function(){c.hideHandle();a.style.display="none"};this.showHandle=function(){h.show()};this.hideHandle=function(){h.hide()};(function(){var d=k.getOdtDocument().getDOM();a=d.createElementNS(d.documentElement.namespaceURI,
"div");a.setAttribute("class","editInfoMarker");a.onmouseover=function(){c.showHandle()};a.onmouseout=function(){c.hideHandle()};b=k.getNode();b.appendChild(a);h=new gui.EditInfoHandle(b);l||c.hide()})()};
// Input 77
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
gui.SessionView=function(){return function(k,l,n){function c(a,b,c){b=b.split("___")[0];return a+'[editinfo|memberid^="'+b+'"]'+c}function b(a,b,d){function e(b,d,f){d=c(b,a,f)+d;a:{var g=t.firstChild;for(b=c(b,a,f);g;){if(g.nodeType===Node.TEXT_NODE&&0===g.data.indexOf(b)){b=g;break a}g=g.nextSibling}b=null}b?b.data=d:t.appendChild(document.createTextNode(d))}e("div.editInfoMarker","{ background-color: "+d+"; }","");e("span.editInfoColor","{ background-color: "+d+"; }","");e("span.editInfoAuthor",
'{ content: "'+b+'"; }',":before");e("dc|creator",'{ content: "'+b+'"; display: none;}',":before");e("dc|creator","{ background-color: "+d+"; }","")}function h(a){var b,c;for(c in f)f.hasOwnProperty(c)&&(b=f[c],a?b.show():b.hide())}function a(a){n.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function g(a,c){var d=n.getCaret(a);void 0===c?runtime.log('MemberModel sent undefined data for member "'+a+'".'):(null===c&&(c={memberid:a,fullname:"Unknown Identity",color:"black",imageurl:"avatar-joe.png"}),
d&&(d.setAvatarImageUrl(c.imageurl),d.setColor(c.color)),b(a,c.fullname,c.color))}function e(a){var b=a.getMemberId(),c=l.getMemberModel();n.registerCursor(a,m,r);g(b,null);c.getMemberDetailsAndUpdates(b,g);runtime.log("+++ View here +++ eagerly created an Caret for '"+b+"'! +++")}function d(a){var b=!1,c;for(c in f)if(f.hasOwnProperty(c)&&f[c].getEditInfo().getEdits().hasOwnProperty(a)){b=!0;break}b||l.getMemberModel().unsubscribeMemberDetailsUpdates(a,g)}var t,f={},s=void 0!==k.editInfoMarkersInitiallyVisible?
Boolean(k.editInfoMarkersInitiallyVisible):!0,m=void 0!==k.caretAvatarsInitiallyVisible?Boolean(k.caretAvatarsInitiallyVisible):!0,r=void 0!==k.caretBlinksOnRangeSelect?Boolean(k.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=function(){s||(s=!0,h(s))};this.hideEditInfoMarkers=function(){s&&(s=!1,h(s))};this.showCaretAvatars=function(){m||(m=!0,a(m))};this.hideCaretAvatars=function(){m&&(m=!1,a(m))};this.getSession=function(){return l};this.getCaret=function(a){return n.getCaret(a)};(function(){var a=
l.getOdtDocument(),b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,e);a.subscribe(ops.OdtDocument.signalCursorRemoved,d);a.subscribe(ops.OdtDocument.signalParagraphChanged,function(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",g=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0];g?(e=g.getAttributeNS("urn:webodf:names:editinfo","id"),d=f[e]):(e=Math.random().toString(),d=new ops.EditInfo(b,l.getOdtDocument()),d=new gui.EditInfoMarker(d,
s),g=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0],g.setAttributeNS("urn:webodf:names:editinfo","id",e),f[e]=d);d.addEdit(c,new Date(a))});t=document.createElementNS(b.namespaceURI,"style");t.type="text/css";t.media="screen, print, handheld, projection";t.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));t.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(t)})()}}();
// Input 78
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
gui.CaretManager=function(k){function l(a){return e.hasOwnProperty(a)?e[a]:null}function n(){return k.getSession().getOdtDocument().getOdfCanvas().getElement()}function c(a){a===k.getInputMemberId()&&n().removeAttribute("tabindex");delete e[a]}function b(a){a=a.getMemberId();a===k.getInputMemberId()&&(a=l(a))&&a.refreshCursorBlinking()}function h(a){a.memberId===k.getInputMemberId()&&(a=l(a.memberId))&&a.ensureVisible()}function a(){var a=l(k.getInputMemberId());a&&a.setFocus()}function g(){var a=
l(k.getInputMemberId());a&&a.removeFocus()}var e={};this.registerCursor=function(a,b,c){var g=a.getMemberId(),h=n();b=new gui.Caret(a,b,c);e[g]=b;g===k.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+g),a.handleUpdate=b.ensureVisible,h.setAttribute("tabindex",0),h.focus());return b};this.getCaret=l;this.getCarets=function(){return Object.keys(e).map(function(a){return e[a]})};(function(){var d=k.getSession().getOdtDocument(),e=n();d.subscribe(ops.OdtDocument.signalParagraphChanged,
h);d.subscribe(ops.OdtDocument.signalCursorMoved,b);d.subscribe(ops.OdtDocument.signalCursorRemoved,c);e.onfocus=a;e.onblur=g})()};
// Input 79
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var k=new xmldom.XPath,l=runtime.getWindow();return function(n){var c=this;c.setInitialSlideMode=function(){c.startSlideMode("single")};c.keyDownHandler=function(b){if(!b.target.isContentEditable&&"input"!==b.target.nodeName)switch(b.keyCode){case 84:c.toggleToolbar();break;case 37:case 8:c.prevSlide();break;case 39:case 32:c.nextSlide();break;case 36:c.firstSlide();break;case 35:c.lastSlide()}};c.root=function(){return c.odf_canvas.odfContainer().rootElement};c.firstSlide=
function(){c.slideChange(function(b,c){return 0})};c.lastSlide=function(){c.slideChange(function(b,c){return c-1})};c.nextSlide=function(){c.slideChange(function(b,c){return b+1<c?b+1:-1})};c.prevSlide=function(){c.slideChange(function(b,c){return 1>b?-1:b-1})};c.slideChange=function(b){var h=c.getPages(c.odf_canvas.odfContainer().rootElement),a=-1,g=0;h.forEach(function(b){b=b[1];b.hasAttribute("slide_current")&&(a=g,b.removeAttribute("slide_current"));g+=1});b=b(a,h.length);-1===b&&(b=a);h[b][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=b;"cont"===c.slide_mode&&l.scrollBy(0,h[b][1].getBoundingClientRect().top-30)};c.selectSlide=function(b){c.slideChange(function(c,a){return b>=a||0>b?-1:b})};c.scrollIntoContView=function(b){var h=c.getPages(c.odf_canvas.odfContainer().rootElement);0!==h.length&&l.scrollBy(0,h[b][1].getBoundingClientRect().top-30)};c.getPages=function(b){b=b.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var c=[],a;for(a=0;a<b.length;a+=1)c.push([b[a].getAttribute("draw:name"),
b[a]]);return c};c.fillPageList=function(b,h){for(var a=c.getPages(b),g,e,d;h.firstChild;)h.removeChild(h.firstChild);for(g=0;g<a.length;g+=1)e=document.createElement("option"),d=k.getODFElementsWithXPath(a[g][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),d=0<d.length?d[0].textContent:a[g][0],e.textContent=g+1+": "+d,h.appendChild(e)};c.startSlideMode=function(b){var h=document.getElementById("pagelist"),a=c.odf_canvas.slidevisibilitycss().sheet;for(c.slide_mode=
b;0<a.cssRules.length;)a.deleteRule(0);c.selectSlide(0);"single"===c.slide_mode?(a.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),a.insertRule("draw|page[slide_current]  { z-index:2;}",1),a.insertRule("draw|page  { -webkit-transform: scale(1);}",2),c.fitToWindow(),l.addEventListener("resize",c.fitToWindow,!1)):"cont"===c.slide_mode&&l.removeEventListener("resize",c.fitToWindow,!1);c.fillPageList(c.odf_canvas.odfContainer().rootElement,h)};c.toggleToolbar=function(){var b,
h,a;b=c.odf_canvas.slidevisibilitycss().sheet;h=-1;for(a=0;a<b.cssRules.length;a+=1)if(".toolbar"===b.cssRules[a].cssText.substring(0,8)){h=a;break}-1<h?b.deleteRule(h):b.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};c.fitToWindow=function(){var b=c.getPages(c.root()),h=(l.innerHeight-40)/b[0][1].clientHeight,b=(l.innerWidth-10)/b[0][1].clientWidth,h=h<b?h:b,b=c.odf_canvas.slidevisibilitycss().sheet;b.deleteRule(2);b.insertRule("draw|page { \n-moz-transform: scale("+
h+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+h+"); -o-transform-origin: 0% 0%; -o-transform: scale("+h+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+h+"); }",2)};c.load=function(b){c.odf_canvas.load(b)};c.odf_element=n;c.odf_canvas=new odf.OdfCanvas(c.odf_element);c.odf_canvas.addListener("statereadychange",c.setInitialSlideMode);c.slide_mode="undefined";document.addEventListener("keydown",c.keyDownHandler,!1)}}();
// Input 80
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(k,l){function n(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function c(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(){var a=k.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!r)||(a=a.getRangeAt(0),r.setPoint(a.startContainer,a.startOffset))}function h(){var a=k.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();r&&r.node()&&(b=r.node(),c=b.ownerDocument.createRange(),
c.setStart(b,r.position()),c.collapse(!0),a.addRange(c))}function a(a){var d=a.charCode||a.keyCode;if(r=null,r&&37===d)b(),r.stepBackward(),h();else if(16<=d&&20>=d||33<=d&&40>=d)return;c(a)}function g(a){c(a)}function e(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&e(b),b=b.nextSibling||b.parentNode;var c,d,f,b=a.attributes;c="";for(f=b.length-1;0<=f;f-=1)d=b.item(f),c=c+" "+d.nodeName+'="'+d.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(d=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&d.test(c.nodeValue)&&c.parentNode.removeChild(c)}function d(a,b){for(var c=a.firstChild,e,f,g;c&&c!==a;){if(c.nodeType===Node.ELEMENT_NODE)for(d(c,b),e=c.attributes,g=e.length-1;0<=g;g-=1)f=e.item(g),"http://www.w3.org/2000/xmlns/"!==f.namespaceURI||b[f.nodeValue]||(b[f.nodeValue]=f.localName);c=c.nextSibling||c.parentNode}}function t(){var a=k.ownerDocument.createElement("style"),b;b={};d(k,b);
var c={},e,g,h=0;for(e in b)if(b.hasOwnProperty(e)&&e){g=b[e];if(!g||c.hasOwnProperty(g)||"xmlns"===g){do g="ns"+h,h+=1;while(c.hasOwnProperty(g));b[e]=g}c[g]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+f;a.appendChild(k.ownerDocument.createTextNode(b));l=l.parentNode.replaceChild(a,l)}var f,s,m,r=null;k.id||(k.id="xml"+String(Math.random()).substring(2));s="#"+k.id+" ";f=s+"*,"+s+":visited, "+s+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
s+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+s+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+s+"{overflow: auto;}\n";(function(b){n(b,"click",g);n(b,"keydown",a);n(b,"drop",c);n(b,"dragend",c);n(b,"beforepaste",c);n(b,"paste",c)})(k);this.updateCSS=t;this.setXML=function(a){a=a.documentElement||a;m=a=k.ownerDocument.importNode(a,!0);for(e(a);k.lastChild;)k.removeChild(k.lastChild);k.appendChild(a);t();r=new core.PositionIterator(a)};this.getXML=
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(k,l){};gui.UndoManager.prototype.unsubscribe=function(k,l){};gui.UndoManager.prototype.setOdtDocument=function(k){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(k){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
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
gui.UndoStateRules=function(){function k(k){return k.spec().optype}function l(l){switch(k(l)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=k;this.isEditOperation=l;this.isPartOfOperationSet=function(n,c){if(l(n)){if(0===c.length)return!0;var b;if(b=l(c[c.length-1]))a:{b=c.filter(l);var h=k(n),a;b:switch(h){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&h===k(b[0])){if(1===b.length){b=!0;break a}h=b[b.length-2].spec().position;
b=b[b.length-1].spec().position;a=n.spec().position;if(b===a-(b-h)){b=!0;break a}}b=!1}return b}return!0}};
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
gui.TrivialUndoManager=function(k){function l(){q.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:a.hasUndoStates(),redoAvailable:a.hasRedoStates()})}function n(){s!==d&&s!==m[m.length-1]&&m.push(s)}function c(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);g.normalizeTextNodes(b)}function b(a){return Object.keys(a).map(function(b){return a[b]})}function h(a){function c(a){var b=a.spec();if(g[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete g[b.memberid],h-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},g={},h,k=a.pop();f.getCursors().forEach(function(a){g[a.getMemberId()]=!0});for(h=Object.keys(g).length;k&&0<h;)k.reverse(),k.forEach(c),k=a.pop();return b(d).concat(b(e))}var a=this,g=new core.DomUtils,e,d=[],t,f,s=[],m=[],r=[],q=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=k||new gui.UndoStateRules;this.subscribe=function(a,b){q.subscribe(a,b)};this.unsubscribe=function(a,b){q.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<m.length};this.hasRedoStates=function(){return 0<r.length};this.setOdtDocument=function(a){f=a};this.resetInitialState=function(){m.length=0;r.length=0;d.length=0;s.length=0;e=null;l()};this.saveInitialState=function(){var a=f.getOdfCanvas().odfContainer(),b=f.getOdfCanvas().getAnnotationManager();b&&b.forgetAnnotations();e=a.rootElement.cloneNode(!0);
f.getOdfCanvas().refreshAnnotations();a=e;g.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(c);g.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(c);n();m.unshift(d);s=d=h(m);m.length=0;r.length=0;l()};this.setPlaybackFunction=function(a){t=a};this.onOperationExecuted=function(a){r.length=0;w.isEditOperation(a)&&s===d||!w.isPartOfOperationSet(a,s)?(n(),s=[a],m.push(s),q.emit(gui.UndoManager.signalUndoStateCreated,{operations:s}),l()):(s.push(a),q.emit(gui.UndoManager.signalUndoStateModified,
{operations:s}))};this.moveForward=function(a){for(var b=0,c;a&&r.length;)c=r.pop(),m.push(c),c.forEach(t),a-=1,b+=1;b&&(s=m[m.length-1],l());return b};this.moveBackward=function(a){for(var b=f.getOdfCanvas(),c=b.odfContainer(),g=0;a&&m.length;)r.push(m.pop()),a-=1,g+=1;g&&(c.setRootElement(e.cloneNode(!0)),b.setOdfContainer(c,!0),q.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),f.getCursors().forEach(function(a){f.removeCursor(a.getMemberId())}),d.forEach(t),m.forEach(function(a){a.forEach(t)}),
b.refreshCSS(),s=m[m.length-1]||d,l());return g}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
ops.OdtDocument=function(k){function l(){var a=k.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function n(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var d=e[a].getNode();return b(c)===b(d)?t:f}}function c(a){var b=
gui.SelectionMover.createPositionIterator(l());for(a+=1;0<a&&b.nextPosition();)1===s.acceptPosition(b)&&(a-=1);return b}function b(a){return g.getParagraphElement(a)}function h(a){return k.getFormatting().getStyleElement(a,"paragraph")}var a=this,g,e={},d=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalStyleCreated,
ops.OdtDocument.signalStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),t=core.PositionFilter.FilterResult.FILTER_ACCEPT,f=core.PositionFilter.FilterResult.FILTER_REJECT,s;this.getIteratorAtPosition=c;this.upgradeWhitespacesAtPosition=function(a){a=c(a);var b,d,e;a.previousPosition();a.previousPosition();for(e=-1;1>=e;e+=1){b=a.container();d=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[d]&&g.isSignificantWhitespace(b,
d)){runtime.assert(" "===b.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=b.ownerDocument.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s");f.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(d,1);0<d&&(b=b.splitText(d));b.parentNode.insertBefore(f,b);b=f;a.moveToEndOfNode(b)}a.nextPosition()}};this.getParagraphStyleElement=h;this.getParagraphElement=b;this.getParagraphStyleAttributes=function(a){return(a=h(a))?k.getFormatting().getInheritedStyleAttributes(a):
null};this.getPositionInTextNode=function(a,b){var c=gui.SelectionMover.createPositionIterator(l()),d=null,f,g=0,h=null;runtime.assert(0<=a,"position must be >= 0");1===s.acceptPosition(c)?(f=c.container(),f.nodeType===Node.TEXT_NODE&&(d=f,g=0)):a+=1;for(;0<a||null===d;){if(!c.nextPosition())return null;if(1===s.acceptPosition(c))if(a-=1,f=c.container(),f.nodeType===Node.TEXT_NODE)f!==d?(d=f,g=c.domOffset()):g+=1;else if(null!==d){if(0===a){g=d.length;break}d=null}else if(0===a){d=l().ownerDocument.createTextNode("");
f.insertBefore(d,c.rightNode());g=0;break}}if(null===d)return null;if(b&&e[b]){for(h=e[b].getNode();0===g&&h.nextSibling&&"cursor"===h.nextSibling.localName;)h.parentNode.insertBefore(h,h.nextSibling.nextSibling);h&&0<d.length&&(d=l().ownerDocument.createTextNode(""),g=0,h.parentNode.insertBefore(d,h.nextSibling))}for(;0===g&&(d.previousSibling&&"cursor"===d.previousSibling.localName)&&(f=d.previousSibling,0<d.length&&(d=l().ownerDocument.createTextNode("")),f.parentNode.insertBefore(d,f),h!==f););
for(;d.previousSibling&&d.previousSibling.nodeType===Node.TEXT_NODE;)d.previousSibling.appendData(d.data),g=d.length+d.previousSibling.length,d=d.previousSibling,d.parentNode.removeChild(d.nextSibling);return{textNode:d,offset:g}};this.fixCursorPositions=function(b){var c=a.getPositionFilter(),d,f,g;for(d in e)e.hasOwnProperty(d)&&(f=e[d],g=f.getStepCounter(),g.isPositionWalkable(c)?0===a.getCursorSelection(d).length&&f.move(0):(g=g.countStepsToValidPosition(c),f.move(g),d===b&&a.emit(ops.OdtDocument.signalCursorMoved,
f)))};this.getWalkableParagraphLength=function(a){var d=c(0),e=0;d.setUnfilteredPosition(a,0);do{if(b(d.container())!==a)break;1===s.acceptPosition(d)&&(e+=1)}while(d.nextPosition());return e};this.getDistanceFromCursor=function(a,b,c){a=e[a];var d=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,d=a(b,c,s));return d};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,l(),0)};this.getCursorSelection=
function(a){var b;a=e[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(l(),0,s),b=b(a.getAnchorNode(),0,s));return{position:c+b,length:-b}};this.getPositionFilter=function(){return s};this.getOdfCanvas=function(){return k};this.getRootNode=l;this.getDOM=function(){return l().ownerDocument};this.getCursor=function(a){return e[a]};this.getCursors=function(){var a=[],b;for(b in e)e.hasOwnProperty(b)&&a.push(e[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");
var b=a.getStepCounter().countForwardSteps(1,s),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!e[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);a.move(b);e[c]=a};this.removeCursor=function(b){var c=e[b];return c?(c.removeFromOdtDocument(),delete e[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=k.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=
b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return k.getFormatting()};this.getTextElements=function(a,b){return g.getTextElements(a,b)};this.getParagraphElements=function(a){return g.getParagraphElements(a)};this.emit=function(a,b){d.emit(a,b)};this.subscribe=function(a,b){d.subscribe(a,b)};this.unsubscribe=function(a,b){d.unsubscribe(a,b)};this.createRootFilter=
function(a){return new n(a)};s=new function(){function a(b,c,d){var e,h;if(c&&(e=g.lookLeftForCharacter(c),1===e||2===e&&(g.scanRightForAnyCharacter(d)||g.scanRightForAnyCharacter(g.nextNode(b)))))return t;e=null===c&&g.isParagraph(b);h=g.lookRightForCharacter(d);if(e)return h?t:g.scanRightForAnyCharacter(d)?f:t;if(!h)return f;c=c||g.previousNode(b);return g.scanLeftForAnyCharacter(c)?f:t}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,e,h,k;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return f;
if(d===Node.TEXT_NODE){if(!g.isGroupingElement(c.parentNode)||g.isWithinTrackedChanges(c.parentNode,l()))return f;d=b.unfilteredDomOffset();e=c.data;runtime.assert(d!==e.length,"Unexpected offset.");if(0<d){b=e.substr(d-1,1);if(!g.isODFWhitespace(b))return t;if(1<d)if(b=e.substr(d-2,1),!g.isODFWhitespace(b))h=t;else{if(!g.isODFWhitespace(e.substr(0,d)))return f}else k=g.previousNode(c),g.scanLeftForNonWhitespace(k)&&(h=t);if(h===t)return g.isTrailingWhitespace(c,d)?f:t;h=e.substr(d,1);return g.isODFWhitespace(h)?
f:g.scanLeftForAnyCharacter(g.previousNode(c))?f:t}k=b.leftNode();h=c;c=c.parentNode;h=a(c,k,h)}else!g.isGroupingElement(c)||g.isWithinTrackedChanges(c,l())?h=f:(k=b.leftNode(),h=b.rightNode(),h=a(c,k,h));return h}};g=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";
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
runtime.loadClass("ops.TrivialMemberModel");runtime.loadClass("ops.TrivialOperationRouter");runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OdtDocument");
ops.Session=function(k){var l=new ops.OperationFactory,n=new ops.OdtDocument(k),c=new ops.TrivialMemberModel,b=null;this.setMemberModel=function(b){c=b};this.setOperationFactory=function(c){l=c;b&&b.setOperationFactory(l)};this.setOperationRouter=function(c){b=c;c.setPlaybackFunction(function(a){a.execute(n);n.emit(ops.OdtDocument.signalOperationExecuted,a)});c.setOperationFactory(l)};this.getMemberModel=function(){return c};this.getOperationFactory=function(){return l};this.getOdtDocument=function(){return n};
this.enqueue=function(c){b.push(c)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 86
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\n\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 10;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: inline-block;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
