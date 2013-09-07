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
function Runtime(){}Runtime.ByteArray=function(m){};Runtime.prototype.getVariable=function(m){};Runtime.prototype.toJson=function(m){};Runtime.prototype.fromJson=function(m){};Runtime.ByteArray.prototype.slice=function(m,l){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(m){};Runtime.prototype.byteArrayFromString=function(m,l){};Runtime.prototype.byteArrayToString=function(m,l){};Runtime.prototype.concatByteArrays=function(m,l){};
Runtime.prototype.read=function(m,l,e,c){};Runtime.prototype.readFile=function(m,l,e){};Runtime.prototype.readFileSync=function(m,l){};Runtime.prototype.loadXML=function(m,l){};Runtime.prototype.writeFile=function(m,l,e){};Runtime.prototype.isFile=function(m,l){};Runtime.prototype.getFileSize=function(m,l){};Runtime.prototype.deleteFile=function(m,l){};Runtime.prototype.log=function(m,l){};Runtime.prototype.setTimeout=function(m,l){};Runtime.prototype.clearTimeout=function(m){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(m){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(m,l,e){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(m,l){function e(b){var a="",n,f=b.length;for(n=0;n<f;n+=1)a+=String.fromCharCode(b[n]&255);return a}function c(b){var a="",n,f=b.length,d,c,k,q;for(n=0;n<f;n+=1)d=b[n],128>d?a+=String.fromCharCode(d):(n+=1,c=b[n],194<=d&&224>d?a+=String.fromCharCode((d&31)<<6|c&63):(n+=1,k=b[n],224<=d&&240>d?a+=String.fromCharCode((d&15)<<12|(c&63)<<6|k&63):(n+=1,q=b[n],240<=d&&245>d&&(d=(d&7)<<18|(c&63)<<12|(k&63)<<6|q&63,d-=65536,a+=String.fromCharCode((d>>10)+55296,(d&1023)+56320)))));
return a}var b;"utf8"===l?b=c(m):("binary"!==l&&this.log("Unsupported encoding: "+l),b=e(m));return b};Runtime.getVariable=function(m){try{return eval(m)}catch(l){}};Runtime.toJson=function(m){return JSON.stringify(m)};Runtime.fromJson=function(m){return JSON.parse(m)};Runtime.getFunctionName=function(m){return void 0===m.name?(m=/function\s+(\w+)/.exec(m))&&m[1]:m.name};
function BrowserRuntime(m){function l(a,n){var f,d,b;void 0!==n?b=a:n=a;m?(d=m.ownerDocument,b&&(f=d.createElement("span"),f.className=b,f.appendChild(d.createTextNode(b)),m.appendChild(f),m.appendChild(d.createTextNode(" "))),f=d.createElement("span"),0<n.length&&"<"===n[0]?f.innerHTML=n:f.appendChild(d.createTextNode(n)),m.appendChild(f),m.appendChild(d.createElement("br"))):console&&console.log(n);"alert"===b&&alert(n)}function e(a,n,f){function d(){var d;4===e.readyState&&(0!==e.status||e.responseText?
200===e.status||0===e.status?(d="binary"===n?null!==e.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(e.responseBody)).toArray():c.byteArrayFromString(e.responseText,"binary"):e.responseText,b[a]=d,f(null,d)):f(e.responseText||e.statusText):f("File "+a+" is empty."))}if(b.hasOwnProperty(a))f(null,b[a]);else{var e=new XMLHttpRequest;e.open("GET",a,!0);e.onreadystatechange=d;e.overrideMimeType&&("binary"!==n?e.overrideMimeType("text/plain; charset="+n):e.overrideMimeType("text/plain; charset=x-user-defined"));
try{e.send(null)}catch(k){f(k.message)}}}var c=this,b={},h=window.ArrayBuffer&&window.Uint8Array;h&&(Uint8Array.prototype.slice=function(a,n){void 0===n&&(void 0===a&&(a=0),n=this.length);var f=this.subarray(a,n),d,b;n-=a;d=new Uint8Array(new ArrayBuffer(n));for(b=0;b<n;b+=1)d[b]=f[b];return d});this.ByteArray=h?function(a){return new Uint8Array(new ArrayBuffer(a))}:function(a){var n=[];n.length=a;return n};this.concatByteArrays=h?function(a,n){var f,d=a.length,b=n.length,k=new this.ByteArray(d+b);
for(f=0;f<d;f+=1)k[f]=a[f];for(f=0;f<b;f+=1)k[f+d]=n[f];return k}:function(a,n){return a.concat(n)};this.byteArrayFromArray=function(a){return a.slice()};this.byteArrayFromString=function(a,n){var f;if("utf8"===n){f=a.length;var d,b,k,e=0;for(b=0;b<f;b+=1)k=a.charCodeAt(b),e+=1+(128<k)+(2048<k);d=new c.ByteArray(e);for(b=e=0;b<f;b+=1)k=a.charCodeAt(b),128>k?(d[e]=k,e+=1):2048>k?(d[e]=192|k>>>6,d[e+1]=128|k&63,e+=2):(d[e]=224|k>>>12&15,d[e+1]=128|k>>>6&63,d[e+2]=128|k&63,e+=3)}else for("binary"!==
n&&c.log("unknown encoding: "+n),f=a.length,d=new c.ByteArray(f),b=0;b<f;b+=1)d[b]=a.charCodeAt(b)&255;return f=d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=e;this.read=function(a,n,f,d){function e(){var g;4===k.readyState&&(0!==k.status||k.responseText?200===k.status||0===k.status?(k.response?(g=k.response,g=new Uint8Array(g)):g=null!==k.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(k.responseBody)).toArray():c.byteArrayFromString(k.responseText,"binary"),b[a]=g,d(null,g.slice(n,n+f))):d(k.responseText||k.statusText):d("File "+a+" is empty."))}if(b.hasOwnProperty(a))d(null,b[a].slice(n,n+f));else{var k=new XMLHttpRequest;k.open("GET",a,!0);k.onreadystatechange=e;k.overrideMimeType&&k.overrideMimeType("text/plain; charset=x-user-defined");k.responseType="arraybuffer";try{k.send(null)}catch(q){d(q.message)}}};this.readFileSync=function(a,n){var f=new XMLHttpRequest,
d;f.open("GET",a,!1);f.overrideMimeType&&("binary"!==n?f.overrideMimeType("text/plain; charset="+n):f.overrideMimeType("text/plain; charset=x-user-defined"));try{if(f.send(null),200===f.status||0===f.status)d=f.responseText}catch(b){}return d};this.writeFile=function(a,n,f){b[a]=n;var d=new XMLHttpRequest;d.open("PUT",a,!0);d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200<=d.status&&300>d.status||0===d.status?f(null):f("Status "+String(d.status)+": "+d.responseText||
d.statusText):f("File "+a+" is empty."))};n=n.buffer&&!d.sendAsBinary?n.buffer:c.byteArrayToString(n,"binary");try{d.sendAsBinary?d.sendAsBinary(n):d.send(n)}catch(e){c.log("HUH? "+e+" "+n),f(e.message)}};this.deleteFile=function(a,n){delete b[a];var f=new XMLHttpRequest;f.open("DELETE",a,!0);f.onreadystatechange=function(){4===f.readyState&&(200>f.status&&300<=f.status?n(f.responseText):n(null))};f.send(null)};this.loadXML=function(a,n){var f=new XMLHttpRequest;f.open("GET",a,!0);f.overrideMimeType&&
f.overrideMimeType("text/xml");f.onreadystatechange=function(){4===f.readyState&&(0!==f.status||f.responseText?200===f.status||0===f.status?n(null,f.responseXML):n(f.responseText):n("File "+a+" is empty."))};try{f.send(null)}catch(d){n(d.message)}};this.isFile=function(a,n){c.getFileSize(a,function(a){n(-1!==a)})};this.getFileSize=function(a,n){var f=new XMLHttpRequest;f.open("HEAD",a,!0);f.onreadystatechange=function(){if(4===f.readyState){var d=f.getResponseHeader("Content-Length");d?n(parseInt(d,
10)):e(a,"binary",function(d,a){d?n(-1):n(a.length)})}};f.send(null)};this.log=l;this.assert=function(a,n,f){if(!a)throw l("alert","ASSERTION FAILED:\n"+n),f&&f(),n;};this.setTimeout=function(a,n){return setTimeout(function(){a()},n)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){l("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function m(a,f,d){a=c.resolve(b,a);"binary"!==f?e.readFile(a,f,d):e.readFile(a,null,d)}var l=this,e=require("fs"),c=require("path"),b="",h,a;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var f=new Buffer(a.length),d,b=a.length;for(d=0;d<b;d+=1)f[d]=a[d];return f};this.concatByteArrays=function(a,f){var d=new Buffer(a.length+f.length);a.copy(d,0,0);f.copy(d,a.length,0);return d};this.byteArrayFromString=function(a,f){return new Buffer(a,
f)};this.byteArrayToString=function(a,f){return a.toString(f)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=m;this.loadXML=function(a,f){m(a,"utf-8",function(d,a){if(d)return f(d);f(null,l.parseXML(a))})};this.writeFile=function(a,f,d){a=c.resolve(b,a);e.writeFile(a,f,"binary",function(a){d(a||null)})};this.deleteFile=function(a,f){a=c.resolve(b,a);e.unlink(a,f)};this.read=function(a,f,d,h){a=c.resolve(b,a);e.open(a,"r+",666,function(a,
b){if(a)h(a);else{var g=new Buffer(d);e.read(b,g,0,d,f,function(a){e.close(b);h(a,g)})}})};this.readFileSync=function(a,b){return b?"binary"===b?e.readFileSync(a,null):e.readFileSync(a,b):""};this.isFile=function(a,f){a=c.resolve(b,a);e.stat(a,function(a,b){f(!a&&b.isFile())})};this.getFileSize=function(a,f){a=c.resolve(b,a);e.stat(a,function(a,b){a?f(-1):f(b.size)})};this.log=function(a,b){var d;void 0!==b?d=a:b=a;"alert"===d&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(b+
"\n");"alert"===d&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,b,d){a||(process.stderr.write("ASSERTION FAILED: "+b),d&&d())};this.setTimeout=function(a,b){return setTimeout(function(){a()},b)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){b=a};this.currentDirectory=function(){return b};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=
function(a){return h.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};h=new (require("xmldom").DOMParser);a=l.parseXML("<a/>").implementation}
function RhinoRuntime(){function m(a,b){var f;void 0!==b?f=a:b=a;"alert"===f&&print("\n!!!!! ALERT !!!!!");print(b);"alert"===f&&print("!!!!! ALERT !!!!!")}var l=this,e=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),c,b,h="";e.setValidating(!1);e.setNamespaceAware(!0);e.setExpandEntityReferences(!1);e.setSchema(null);b=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,b){var f=new Packages.java.io.FileReader(b);return new Packages.org.xml.sax.InputSource(f)}});c=e.newDocumentBuilder();
c.setEntityResolver(b);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,b){var f=[],d,e=a.length;for(d=0;d<e;d+=1)f[d]=a.charCodeAt(d)&255;return f};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,b){return a.concat(b)};this.loadXML=function(a,b){var f=new Packages.java.io.File(a),d;try{d=c.parse(f)}catch(e){print(e);
b(e);return}b(null,d)};this.readFile=function(a,b,f){h&&(a=h+"/"+a);var d=new Packages.java.io.File(a),e="binary"===b?"latin1":b;d.isFile()?(a=readFile(a,e),"binary"===b&&(a=l.byteArrayFromString(a,"binary")),f(null,a)):f(a+" is not a file.")};this.writeFile=function(a,b,f){h&&(a=h+"/"+a);a=new Packages.java.io.FileOutputStream(a);var d,e=b.length;for(d=0;d<e;d+=1)a.write(b[d]);a.close();f(null)};this.deleteFile=function(a,b){h&&(a=h+"/"+a);(new Packages.java.io.File(a))["delete"]()?b(null):b("Could not delete "+
a)};this.read=function(a,b,f,d){h&&(a=h+"/"+a);var e;e=a;var k="binary";(new Packages.java.io.File(e)).isFile()?("binary"===k&&(k="latin1"),e=readFile(e,k)):e=null;e?d(null,this.byteArrayFromString(e.substring(b,b+f),"binary")):d("Cannot read "+a)};this.readFileSync=function(a,b){return b?readFile(a,b):""};this.isFile=function(a,b){h&&(a=h+"/"+a);var f=new Packages.java.io.File(a);b(f.isFile())};this.getFileSize=function(a,b){h&&(a=h+"/"+a);var f=new Packages.java.io.File(a);b(f.length())};this.log=
m;this.assert=function(a,b,f){a||(m("alert","ASSERTION FAILED: "+b),f&&f())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){h=a};this.currentDirectory=function(){return h};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return c.getDOMImplementation()};this.parseXML=function(a){return c.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function m(e){var b=e[0],h;h=eval("if (typeof "+b+" === 'undefined') {eval('"+b+" = {};');}"+b);for(b=1;b<e.length-1;b+=1)h=h.hasOwnProperty(e[b])?h[e[b]]:h[e[b]]={};return h[e[e.length-1]]}var l={},e={};runtime.loadClass=function(c){function b(a){a=a.replace(/\./g,"/")+".js";var d=runtime.libraryPaths(),b,k,c;runtime.currentDirectory&&d.push(runtime.currentDirectory());for(b=0;b<d.length;b+=1){k=d[b];if(!e.hasOwnProperty(k))try{c=runtime.readFileSync(d[b]+"/manifest.js","utf8"),e[k]=
c&&c.length?eval(c):null}catch(g){e[k]=null,runtime.log("Cannot load manifest for "+k+".")}c=null;if((k=e[k])&&k.indexOf&&-1!==k.indexOf(a))return d[b]+"/"+a}return null}function h(a){var d,e;e=b(a);if(!e)throw a+" is not listed in any manifest.js.";try{d=runtime.readFileSync(e,"utf8")}catch(k){throw runtime.log("Error loading "+a+" "+k),k;}if(void 0===d)throw"Cannot load class "+a;d=d+("\n//# sourceURL="+e)+("\n//@ sourceURL="+e);try{d=eval(a+" = eval(code);")}catch(c){throw runtime.log("Error loading "+
a+" "+c),c;}return d}if(!IS_COMPILED_CODE&&!l.hasOwnProperty(c)){var a=c.split("."),n;n=m(a);if(!n&&(n=h(c),!n||Runtime.getFunctionName(n)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];l[c]=!0}}})();
(function(m){function l(e){if(e.length){var c=e[0];runtime.readFile(c,"utf8",function(b,h){function a(){var a;(a=eval(f))&&runtime.exit(a)}var n="",f=h;-1!==c.indexOf("/")&&(n=c.substring(0,c.indexOf("/")));runtime.setCurrentDirectory(n);b||null===f?(runtime.log(b),runtime.exit(1)):a.apply(null,e)})}}m=m?Array.prototype.slice.call(m):[];"NodeJSRuntime"===runtime.type()?l(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?l(m):l(m.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function m(a){var d=[],b,k=a.length;for(b=0;b<k;b+=1)d[b]=a.charCodeAt(b)&255;return d}function l(a){var d,b="",k,g=a.length-2;for(k=0;k<g;k+=3)d=a[k]<<16|a[k+1]<<8|a[k+2],b+=p[d>>>18],b+=p[d>>>12&63],b+=p[d>>>6&63],b+=p[d&63];k===g+1?(d=a[k]<<4,b+=p[d>>>6],b+=p[d&63],b+="=="):k===g&&(d=a[k]<<10|a[k+1]<<2,b+=p[d>>>12],b+=p[d>>>6&63],b+=p[d&63],b+="=");return b}function e(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var d=[],b=a.length%4,k,g=a.length,e;for(k=0;k<g;k+=4)e=(r[a.charAt(k)]||
0)<<18|(r[a.charAt(k+1)]||0)<<12|(r[a.charAt(k+2)]||0)<<6|(r[a.charAt(k+3)]||0),d.push(e>>16,e>>8&255,e&255);d.length-=[0,0,2,1][b];return d}function c(a){var d=[],b,k=a.length,g;for(b=0;b<k;b+=1)g=a[b],128>g?d.push(g):2048>g?d.push(192|g>>>6,128|g&63):d.push(224|g>>>12&15,128|g>>>6&63,128|g&63);return d}function b(a){var d=[],b,k=a.length,g,e,f;for(b=0;b<k;b+=1)g=a[b],128>g?d.push(g):(b+=1,e=a[b],224>g?d.push((g&31)<<6|e&63):(b+=1,f=a[b],d.push((g&15)<<12|(e&63)<<6|f&63)));return d}function h(a){return l(m(a))}
function a(a){return String.fromCharCode.apply(String,e(a))}function n(a){return b(m(a))}function f(a){a=b(a);for(var d="",k=0;k<a.length;)d+=String.fromCharCode.apply(String,a.slice(k,k+45E3)),k+=45E3;return d}function d(a,d,b){var k="",g,e,f;for(f=d;f<b;f+=1)d=a.charCodeAt(f)&255,128>d?k+=String.fromCharCode(d):(f+=1,g=a.charCodeAt(f)&255,224>d?k+=String.fromCharCode((d&31)<<6|g&63):(f+=1,e=a.charCodeAt(f)&255,k+=String.fromCharCode((d&15)<<12|(g&63)<<6|e&63)));return k}function s(a,b){function k(){var c=
e+g;c>a.length&&(c=a.length);f+=d(a,e,c);e=c;c=e===a.length;b(f,c)&&!c&&runtime.setTimeout(k,0)}var g=1E5,f="",e=0;a.length<g?b(d(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),k())}function k(a){return c(m(a))}function q(a){return String.fromCharCode.apply(String,c(a))}function g(a){return String.fromCharCode.apply(String,c(m(a)))}var p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=function(a){var d={},b,k;b=0;for(k=a.length;b<k;b+=1)d[a.charAt(b)]=b;return d}(p),w,
u,A=runtime.getWindow(),x,v;A&&A.btoa?(x=function(a){return A.btoa(a)},w=function(a){return x(g(a))}):(x=h,w=function(a){return l(k(a))});A&&A.atob?(v=function(a){return A.atob(a)},u=function(a){a=v(a);return d(a,0,a.length)}):(v=a,u=function(a){return f(e(a))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=l;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=e;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=c;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=b;this.convertUTF8StringToBase64=h;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=n;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=f;this.convertUTF8StringToUTF16String=s;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=k;this.convertUTF16ArrayToUTF8String=q;this.convertUTF16StringToUTF8String=g;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=u;this.fromBase64=a;this.toBase64=h;this.atob=
v;this.btoa=x;this.utob=g;this.btou=s;this.encode=w;this.encodeURI=function(a){return w(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return u(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function m(){this.dl=this.fc=0}function l(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function e(a,d,b,k){this.good_length=a;this.max_lazy=d;this.nice_length=b;this.max_chain=k}function c(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=b;this.off=0}var b=8192,h,a,n,f,d=null,s,k,q,g,p,r,w,u,A,x,v,t,E,H,y,P,B,R,G,L,X,oa,N,sa,Y,ba,M,V,S,J,C,I,K,Q,Z,da,O,$,fa,F,ka,ha,T,ia,la,U,ma,W,ja,ta,va,wa=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],pa=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],Ba=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],Ca=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ca;ca=[new e(0,0,0,0),new e(4,4,8,4),new e(4,5,16,8),new e(4,6,32,32),new e(4,4,16,16),new e(8,16,32,32),new e(8,16,128,128),new e(8,32,128,256),new e(32,128,258,1024),new e(32,258,258,4096)];var z=function(g){d[k+s++]=g;if(k+s===b){var f;if(0!==s){null!==h?(g=h,h=h.next):g=new c;
g.next=null;g.len=g.off=0;null===a?a=n=g:n=n.next=g;g.len=s-k;for(f=0;f<g.len;f++)g.ptr[f]=d[k+f];s=k=0}}},qa=function(a){a&=65535;k+s<b-2?(d[k+s++]=a&255,d[k+s++]=a>>>8):(z(a&255),z(a>>>8))},ua=function(){v=(v<<5^g[B+3-1]&255)&8191;t=w[32768+v];w[B&32767]=t;w[32768+v]=B},ea=function(a,d){A>16-d?(u|=a<<A,qa(u),u=a>>16-A,A+=d-16):(u|=a<<A,A+=d)},ga=function(a,d){ea(d[a].fc,d[a].dl)},D=function(a,d,b){return a[d].fc<a[b].fc||a[d].fc===a[b].fc&&O[d]<=O[b]},xa=function(a,d,b){var k;for(k=0;k<b&&va<ta.length;k++)a[d+
k]=ta.charCodeAt(va++)&255;return k},ya=function(){var a,d,b=65536-L-B;if(-1===b)b--;else if(65274<=B){for(a=0;32768>a;a++)g[a]=g[a+32768];R-=32768;B-=32768;x-=32768;for(a=0;8192>a;a++)d=w[32768+a],w[32768+a]=32768<=d?d-32768:0;for(a=0;32768>a;a++)d=w[a],w[a]=32768<=d?d-32768:0;b+=32768}G||(a=xa(g,B+L,b),0>=a?G=!0:L+=a)},ra=function(a){var d=X,b=B,k,f=P,e=32506<B?B-32506:0,c=B+258,t=g[b+f-1],n=g[b+f];P>=sa&&(d>>=2);do if(k=a,g[k+f]===n&&g[k+f-1]===t&&g[k]===g[b]&&g[++k]===g[b+1]){b+=2;k++;do++b;while(g[b]===
g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&b<c);k=258-(c-b);b=c-258;if(k>f){R=a;f=k;if(258<=k)break;t=g[b+f-1];n=g[b+f]}a=w[a&32767]}while(a>e&&0!==--d);return f},na=function(a,d){r[T++]=d;0===a?Y[d].fc++:(a--,Y[$[d]+256+1].fc++,ba[(256>a?fa[a]:fa[256+(a>>7)])&255].fc++,p[ia++]=a,U|=ma);ma<<=1;0===(T&7)&&(ha[la++]=U,U=0,ma=1);if(2<N&&0===(T&4095)){var b=8*T,k=B-x,g;for(g=0;30>g;g++)b+=ba[g].fc*(5+pa[g]);b>>=3;if(ia<
parseInt(T/2,10)&&b<parseInt(k/2,10))return!0}return 8191===T||8192===ia},za=function(a,d){for(var b=Q[d],k=d<<1;k<=Z;){k<Z&&D(a,Q[k+1],Q[k])&&k++;if(D(a,b,Q[k]))break;Q[d]=Q[k];d=k;k<<=1}Q[d]=b},aa=function(a,d){var b=0;do b|=a&1,a>>=1,b<<=1;while(0<--d);return b>>1},Aa=function(a,d){var b=[];b.length=16;var k=0,g;for(g=1;15>=g;g++)k=k+K[g-1]<<1,b[g]=k;for(k=0;k<=d;k++)g=a[k].dl,0!==g&&(a[k].fc=aa(b[g]++,g))},Da=function(a){var d=a.dyn_tree,b=a.static_tree,k=a.elems,g,f=-1,e=k;Z=0;da=573;for(g=0;g<
k;g++)0!==d[g].fc?(Q[++Z]=f=g,O[g]=0):d[g].dl=0;for(;2>Z;)g=Q[++Z]=2>f?++f:0,d[g].fc=1,O[g]=0,W--,null!==b&&(ja-=b[g].dl);a.max_code=f;for(g=Z>>1;1<=g;g--)za(d,g);do g=Q[1],Q[1]=Q[Z--],za(d,1),b=Q[1],Q[--da]=g,Q[--da]=b,d[e].fc=d[g].fc+d[b].fc,O[e]=O[g]>O[b]+1?O[g]:O[b]+1,d[g].dl=d[b].dl=e,Q[1]=e++,za(d,1);while(2<=Z);Q[--da]=Q[1];e=a.dyn_tree;g=a.extra_bits;var k=a.extra_base,b=a.max_code,c=a.max_length,t=a.static_tree,n,p,h,q,r=0;for(p=0;15>=p;p++)K[p]=0;e[Q[da]].dl=0;for(a=da+1;573>a;a++)n=Q[a],
p=e[e[n].dl].dl+1,p>c&&(p=c,r++),e[n].dl=p,n>b||(K[p]++,h=0,n>=k&&(h=g[n-k]),q=e[n].fc,W+=q*(p+h),null!==t&&(ja+=q*(t[n].dl+h)));if(0!==r){do{for(p=c-1;0===K[p];)p--;K[p]--;K[p+1]+=2;K[c]--;r-=2}while(0<r);for(p=c;0!==p;p--)for(n=K[p];0!==n;)g=Q[--a],g>b||(e[g].dl!==p&&(W+=(p-e[g].dl)*e[g].fc,e[g].fc=p),n--)}Aa(d,f)},Fa=function(a,d){var b,k=-1,g,f=a[0].dl,e=0,c=7,p=4;0===f&&(c=138,p=3);a[d+1].dl=65535;for(b=0;b<=d;b++)g=f,f=a[b+1].dl,++e<c&&g===f||(e<p?S[g].fc+=e:0!==g?(g!==k&&S[g].fc++,S[16].fc++):
10>=e?S[17].fc++:S[18].fc++,e=0,k=g,0===f?(c=138,p=3):g===f?(c=6,p=3):(c=7,p=4))},Ga=function(){8<A?qa(u):0<A&&z(u);A=u=0},Ha=function(a,d){var b,k=0,g=0,f=0,e=0,c,t;if(0!==T){do 0===(k&7)&&(e=ha[f++]),b=r[k++]&255,0===(e&1)?ga(b,a):(c=$[b],ga(c+256+1,a),t=wa[c],0!==t&&(b-=F[c],ea(b,t)),b=p[g++],c=(256>b?fa[b]:fa[256+(b>>7)])&255,ga(c,d),t=pa[c],0!==t&&(b-=ka[c],ea(b,t))),e>>=1;while(k<T)}ga(256,a)},Ia=function(a,d){var b,k=-1,g,f=a[0].dl,e=0,c=7,p=4;0===f&&(c=138,p=3);for(b=0;b<=d;b++)if(g=f,f=a[b+
1].dl,!(++e<c&&g===f)){if(e<p){do ga(g,S);while(0!==--e)}else 0!==g?(g!==k&&(ga(g,S),e--),ga(16,S),ea(e-3,2)):10>=e?(ga(17,S),ea(e-3,3)):(ga(18,S),ea(e-11,7));e=0;k=g;0===f?(c=138,p=3):g===f?(c=6,p=3):(c=7,p=4)}},Ja=function(){var a;for(a=0;286>a;a++)Y[a].fc=0;for(a=0;30>a;a++)ba[a].fc=0;for(a=0;19>a;a++)S[a].fc=0;Y[256].fc=1;U=T=ia=la=W=ja=0;ma=1},Ea=function(a){var d,b,k,f;f=B-x;ha[la]=U;Da(J);Da(C);Fa(Y,J.max_code);Fa(ba,C.max_code);Da(I);for(k=18;3<=k&&0===S[Ca[k]].dl;k--);W+=3*(k+1)+14;d=W+3+
7>>3;b=ja+3+7>>3;b<=d&&(d=b);if(f+4<=d&&0<=x)for(ea(0+a,3),Ga(),qa(f),qa(~f),k=0;k<f;k++)z(g[x+k]);else if(b===d)ea(2+a,3),Ha(M,V);else{ea(4+a,3);f=J.max_code+1;d=C.max_code+1;k+=1;ea(f-257,5);ea(d-1,5);ea(k-4,4);for(b=0;b<k;b++)ea(S[Ca[b]].dl,3);Ia(Y,f-1);Ia(ba,d-1);Ha(Y,ba)}Ja();0!==a&&Ga()},Ka=function(b,g,f){var e,c,p;for(e=0;null!==a&&e<f;){c=f-e;c>a.len&&(c=a.len);for(p=0;p<c;p++)b[g+e+p]=a.ptr[a.off+p];a.off+=c;a.len-=c;e+=c;0===a.len&&(c=a,a=a.next,c.next=h,h=c)}if(e===f)return e;if(k<s){c=
f-e;c>s-k&&(c=s-k);for(p=0;p<c;p++)b[g+e+p]=d[k+p];k+=c;e+=c;s===k&&(s=k=0)}return e},La=function(d,b,e){var c;if(!f){if(!G){A=u=0;var p,n;if(0===V[0].dl){J.dyn_tree=Y;J.static_tree=M;J.extra_bits=wa;J.extra_base=257;J.elems=286;J.max_length=15;J.max_code=0;C.dyn_tree=ba;C.static_tree=V;C.extra_bits=pa;C.extra_base=0;C.elems=30;C.max_length=15;C.max_code=0;I.dyn_tree=S;I.static_tree=null;I.extra_bits=Ba;I.extra_base=0;I.elems=19;I.max_length=7;for(n=p=I.max_code=0;28>n;n++)for(F[n]=p,c=0;c<1<<wa[n];c++)$[p++]=
n;$[p-1]=n;for(n=p=0;16>n;n++)for(ka[n]=p,c=0;c<1<<pa[n];c++)fa[p++]=n;for(p>>=7;30>n;n++)for(ka[n]=p<<7,c=0;c<1<<pa[n]-7;c++)fa[256+p++]=n;for(c=0;15>=c;c++)K[c]=0;for(c=0;143>=c;)M[c++].dl=8,K[8]++;for(;255>=c;)M[c++].dl=9,K[9]++;for(;279>=c;)M[c++].dl=7,K[7]++;for(;287>=c;)M[c++].dl=8,K[8]++;Aa(M,287);for(c=0;30>c;c++)V[c].dl=5,V[c].fc=aa(c,5);Ja()}for(c=0;8192>c;c++)w[32768+c]=0;oa=ca[N].max_lazy;sa=ca[N].good_length;X=ca[N].max_chain;x=B=0;L=xa(g,0,65536);if(0>=L)G=!0,L=0;else{for(G=!1;262>L&&
!G;)ya();for(c=v=0;2>c;c++)v=(v<<5^g[c]&255)&8191}a=null;k=s=0;3>=N?(P=2,y=0):(y=2,H=0);q=!1}f=!0;if(0===L)return q=!0,0}c=Ka(d,b,e);if(c===e)return e;if(q)return c;if(3>=N)for(;0!==L&&null===a;){ua();0!==t&&32506>=B-t&&(y=ra(t),y>L&&(y=L));if(3<=y)if(n=na(B-R,y-3),L-=y,y<=oa){y--;do B++,ua();while(0!==--y);B++}else B+=y,y=0,v=g[B]&255,v=(v<<5^g[B+1]&255)&8191;else n=na(0,g[B]&255),L--,B++;n&&(Ea(0),x=B);for(;262>L&&!G;)ya()}else for(;0!==L&&null===a;){ua();P=y;E=R;y=2;0!==t&&(P<oa&&32506>=B-t)&&
(y=ra(t),y>L&&(y=L),3===y&&4096<B-R&&y--);if(3<=P&&y<=P){n=na(B-1-E,P-3);L-=P-1;P-=2;do B++,ua();while(0!==--P);H=0;y=2;B++;n&&(Ea(0),x=B)}else 0!==H?na(0,g[B-1]&255)&&(Ea(0),x=B):H=1,B++,L--;for(;262>L&&!G;)ya()}0===L&&(0!==H&&na(0,g[B-1]&255),Ea(1),q=!0);return c+Ka(d,c+b,e-c)};this.deflate=function(k,e){var c,t;ta=k;va=0;"undefined"===String(typeof e)&&(e=6);(c=e)?1>c?c=1:9<c&&(c=9):c=6;N=c;G=f=!1;if(null===d){h=a=n=null;d=[];d.length=b;g=[];g.length=65536;p=[];p.length=8192;r=[];r.length=32832;
w=[];w.length=65536;Y=[];Y.length=573;for(c=0;573>c;c++)Y[c]=new m;ba=[];ba.length=61;for(c=0;61>c;c++)ba[c]=new m;M=[];M.length=288;for(c=0;288>c;c++)M[c]=new m;V=[];V.length=30;for(c=0;30>c;c++)V[c]=new m;S=[];S.length=39;for(c=0;39>c;c++)S[c]=new m;J=new l;C=new l;I=new l;K=[];K.length=16;Q=[];Q.length=573;O=[];O.length=573;$=[];$.length=256;fa=[];fa.length=512;F=[];F.length=29;ka=[];ka.length=30;ha=[];ha.length=1024}var q=Array(1024),u=[],s=[];for(c=La(q,0,q.length);0<c;){s.length=c;for(t=0;t<
c;t++)s[t]=String.fromCharCode(q[t]);u[u.length]=s.join("");c=La(q,0,q.length)}ta=null;return u.join("")}};
// Input 4
core.ByteArray=function(m){this.pos=0;this.data=m;this.readUInt32LE=function(){this.pos+=4;var m=this.data,e=this.pos;return m[--e]<<24|m[--e]<<16|m[--e]<<8|m[--e]};this.readUInt16LE=function(){this.pos+=2;var m=this.data,e=this.pos;return m[--e]<<8|m[--e]}};
// Input 5
core.ByteArrayWriter=function(m){var l=this,e=new runtime.ByteArray(0);this.appendByteArrayWriter=function(c){e=runtime.concatByteArrays(e,c.getByteArray())};this.appendByteArray=function(c){e=runtime.concatByteArrays(e,c)};this.appendArray=function(c){e=runtime.concatByteArrays(e,runtime.byteArrayFromArray(c))};this.appendUInt16LE=function(c){l.appendArray([c&255,c>>8&255])};this.appendUInt32LE=function(c){l.appendArray([c&255,c>>8&255,c>>16&255,c>>24&255])};this.appendString=function(c){e=runtime.concatByteArrays(e,
runtime.byteArrayFromString(c,m))};this.getLength=function(){return e.length};this.getByteArray=function(){return e}};
// Input 6
core.RawInflate=function(){var m,l,e=null,c,b,h,a,n,f,d,s,k,q,g,p,r,w,u=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],A=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],v=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],t=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],E=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],H=function(){this.list=this.next=null},y=function(){this.n=this.b=this.e=0;this.t=null},P=function(a,d,b,k,g,c){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var e=Array(this.BMAX+1),f,p,n,t,h,q,r,m=Array(this.BMAX+1),l,w,u,s=new y,v=Array(this.BMAX);t=Array(this.N_MAX);var x,A=Array(this.BMAX+1),E,X,B;B=this.root=null;for(h=0;h<e.length;h++)e[h]=0;for(h=0;h<m.length;h++)m[h]=0;for(h=0;h<v.length;h++)v[h]=null;for(h=0;h<t.length;h++)t[h]=
0;for(h=0;h<A.length;h++)A[h]=0;f=256<d?a[256]:this.BMAX;l=a;w=0;h=d;do e[l[w]]++,w++;while(0<--h);if(e[0]==d)this.root=null,this.status=this.m=0;else{for(q=1;q<=this.BMAX&&0==e[q];q++);r=q;c<q&&(c=q);for(h=this.BMAX;0!=h&&0==e[h];h--);n=h;c>h&&(c=h);for(E=1<<q;q<h;q++,E<<=1)if(0>(E-=e[q])){this.status=2;this.m=c;return}if(0>(E-=e[h]))this.status=2,this.m=c;else{e[h]+=E;A[1]=q=0;l=e;w=1;for(u=2;0<--h;)A[u++]=q+=l[w++];l=a;h=w=0;do 0!=(q=l[w++])&&(t[A[q]++]=h);while(++h<d);d=A[n];A[0]=h=0;l=t;w=0;
t=-1;x=m[0]=0;u=null;for(X=0;r<=n;r++)for(a=e[r];0<a--;){for(;r>x+m[1+t];){x+=m[1+t];t++;X=(X=n-x)>c?c:X;if((p=1<<(q=r-x))>a+1)for(p-=a+1,u=r;++q<X&&!((p<<=1)<=e[++u]);)p-=e[u];x+q>f&&x<f&&(q=f-x);X=1<<q;m[1+t]=q;u=Array(X);for(p=0;p<X;p++)u[p]=new y;B=null==B?this.root=new H:B.next=new H;B.next=null;B.list=u;v[t]=u;0<t&&(A[t]=h,s.b=m[t],s.e=16+q,s.t=u,q=(h&(1<<x)-1)>>x-m[t],v[t-1][q].e=s.e,v[t-1][q].b=s.b,v[t-1][q].n=s.n,v[t-1][q].t=s.t)}s.b=r-x;w>=d?s.e=99:l[w]<b?(s.e=256>l[w]?16:15,s.n=l[w++]):
(s.e=g[l[w]-b],s.n=k[l[w++]-b]);p=1<<r-x;for(q=h>>x;q<X;q+=p)u[q].e=s.e,u[q].b=s.b,u[q].n=s.n,u[q].t=s.t;for(q=1<<r-1;0!=(h&q);q>>=1)h^=q;for(h^=q;(h&(1<<x)-1)!=A[t];)x-=m[t],t--}this.m=m[1];this.status=0!=E&&1!=n?1:0}}},B=function(d){for(;a<d;){var b=h,k;k=r.length==w?-1:r[w++];h=b|k<<a;a+=8}},R=function(a){return h&u[a]},G=function(d){h>>=d;a-=d},L=function(a,b,c){var e,f,t;if(0==c)return 0;for(t=0;;){B(g);f=k.list[R(g)];for(e=f.e;16<e;){if(99==e)return-1;G(f.b);e-=16;B(e);f=f.t[R(e)];e=f.e}G(f.b);
if(16==e)l&=32767,a[b+t++]=m[l++]=f.n;else{if(15==e)break;B(e);d=f.n+R(e);G(e);B(p);f=q.list[R(p)];for(e=f.e;16<e;){if(99==e)return-1;G(f.b);e-=16;B(e);f=f.t[R(e)];e=f.e}G(f.b);B(e);s=l-f.n-R(e);for(G(e);0<d&&t<c;)d--,s&=32767,l&=32767,a[b+t++]=m[l++]=m[s++]}if(t==c)return c}n=-1;return t},X,oa=function(a,d,b){var e,c,f,n,h,r,m,l=Array(316);for(e=0;e<l.length;e++)l[e]=0;B(5);r=257+R(5);G(5);B(5);m=1+R(5);G(5);B(4);e=4+R(4);G(4);if(286<r||30<m)return-1;for(c=0;c<e;c++)B(3),l[E[c]]=R(3),G(3);for(;19>
c;c++)l[E[c]]=0;g=7;c=new P(l,19,19,null,null,g);if(0!=c.status)return-1;k=c.root;g=c.m;n=r+m;for(e=f=0;e<n;)if(B(g),h=k.list[R(g)],c=h.b,G(c),c=h.n,16>c)l[e++]=f=c;else if(16==c){B(2);c=3+R(2);G(2);if(e+c>n)return-1;for(;0<c--;)l[e++]=f}else{17==c?(B(3),c=3+R(3),G(3)):(B(7),c=11+R(7),G(7));if(e+c>n)return-1;for(;0<c--;)l[e++]=0;f=0}g=9;c=new P(l,r,257,A,x,g);0==g&&(c.status=1);if(0!=c.status)return-1;k=c.root;g=c.m;for(e=0;e<m;e++)l[e]=l[e+r];p=6;c=new P(l,m,0,v,t,p);q=c.root;p=c.m;return 0==p&&
257<r||0!=c.status?-1:L(a,d,b)};this.inflate=function(u,E){null==m&&(m=Array(65536));a=h=l=0;n=-1;f=!1;d=s=0;k=null;r=u;w=0;var H=new runtime.ByteArray(E);a:{var y,M;for(y=0;y<E&&(!f||-1!=n);){if(0<d){if(0!=n)for(;0<d&&y<E;)d--,s&=32767,l&=32767,H[0+y++]=m[l++]=m[s++];else{for(;0<d&&y<E;)d--,l&=32767,B(8),H[0+y++]=m[l++]=R(8),G(8);0==d&&(n=-1)}if(y==E)break}if(-1==n){if(f)break;B(1);0!=R(1)&&(f=!0);G(1);B(2);n=R(2);G(2);k=null;d=0}switch(n){case 0:M=H;var V=0+y,S=E-y,J=void 0,J=a&7;G(J);B(16);J=R(16);
G(16);B(16);if(J!=(~h&65535))M=-1;else{G(16);d=J;for(J=0;0<d&&J<S;)d--,l&=32767,B(8),M[V+J++]=m[l++]=R(8),G(8);0==d&&(n=-1);M=J}break;case 1:if(null!=k)M=L(H,0+y,E-y);else b:{M=H;V=0+y;S=E-y;if(null==e){for(var C=void 0,J=Array(288),C=void 0,C=0;144>C;C++)J[C]=8;for(;256>C;C++)J[C]=9;for(;280>C;C++)J[C]=7;for(;288>C;C++)J[C]=8;b=7;C=new P(J,288,257,A,x,b);if(0!=C.status){alert("HufBuild error: "+C.status);M=-1;break b}e=C.root;b=C.m;for(C=0;30>C;C++)J[C]=5;X=5;C=new P(J,30,0,v,t,X);if(1<C.status){e=
null;alert("HufBuild error: "+C.status);M=-1;break b}c=C.root;X=C.m}k=e;q=c;g=b;p=X;M=L(M,V,S)}break;case 2:M=null!=k?L(H,0+y,E-y):oa(H,0+y,E-y);break;default:M=-1}if(-1==M)break a;y+=M}}r=null;return H}};
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
core.LoopWatchDog=function(m,l){var e=Date.now(),c=0;this.check=function(){var b;if(m&&(b=Date.now(),b-e>m))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<l&&(c+=1,c>l))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){function m(l,e){Array.isArray(e)?l=(l||[]).concat(e.map(function(c){return m({},c)})):"object"===typeof e?(l=l||{},Object.keys(e).forEach(function(c){l[c]=m(l[c],e[c])})):l=e;return l}this.hashString=function(m){var e=0,c,b;c=0;for(b=m.length;c<b;c+=1)e=(e<<5)-e+m.charCodeAt(c),e|=0;return e};this.mergeObjects=m};
// Input 9
core.DomUtils=function(){function m(e,c){if(e.nodeType===Node.TEXT_NODE)if(0===e.length)e.parentNode.removeChild(e);else if(c.nodeType===Node.TEXT_NODE)return c.insertData(0,e.data),e.parentNode.removeChild(e),c;return e}function l(e,c){return e===c||Boolean(e.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY)}this.splitBoundaries=function(e){var c=[],b;if(e.startContainer.nodeType===Node.TEXT_NODE||e.endContainer.nodeType===Node.TEXT_NODE){b=e.endContainer;var h=e.endOffset;if(h<b.childNodes.length)for(b=
b.childNodes[h],h=0;b.firstChild;)b=b.firstChild;else for(;b.lastChild;)b=b.lastChild,h=b.nodeType===Node.TEXT_NODE?b.textContent.length:b.childNodes.length;e.setEnd(b,h);0!==e.endOffset&&(e.endContainer.nodeType===Node.TEXT_NODE&&e.endOffset!==e.endContainer.length)&&(c.push(e.endContainer.splitText(e.endOffset)),c.push(e.endContainer));0!==e.startOffset&&(e.startContainer.nodeType===Node.TEXT_NODE&&e.startOffset!==e.startContainer.length)&&(b=e.startContainer.splitText(e.startOffset),c.push(e.startContainer),
c.push(b),e.setStart(b,0))}return c};this.containsRange=function(e,c){return 0>=e.compareBoundaryPoints(e.START_TO_START,c)&&0<=e.compareBoundaryPoints(e.END_TO_END,c)};this.rangesIntersect=function(e,c){return 0>=e.compareBoundaryPoints(e.END_TO_START,c)&&0<=e.compareBoundaryPoints(e.START_TO_END,c)};this.getNodesInRange=function(e,c){var b=[],h,a=e.startContainer.ownerDocument.createTreeWalker(e.commonAncestorContainer,NodeFilter.SHOW_ALL,c,!1);for(h=a.currentNode=e.startContainer;h;){if(c(h)===
NodeFilter.FILTER_ACCEPT)b.push(h);else if(c(h)===NodeFilter.FILTER_REJECT)break;h=h.parentNode}b.reverse();for(h=a.nextNode();h;)b.push(h),h=a.nextNode();return b};this.normalizeTextNodes=function(e){e&&e.nextSibling&&(e=m(e,e.nextSibling));e&&e.previousSibling&&m(e.previousSibling,e)};this.rangeContainsNode=function(e,c){var b=c.ownerDocument.createRange(),h=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;b.setStart(e.startContainer,e.startOffset);b.setEnd(e.endContainer,e.endOffset);h=
0===b.comparePoint(c,0)&&0===b.comparePoint(c,h);b.detach();return h};this.mergeIntoParent=function(e){for(var c=e.parentNode;e.firstChild;)c.insertBefore(e.firstChild,e);c.removeChild(e);return c};this.getElementsByTagNameNS=function(e,c,b){return Array.prototype.slice.call(e.getElementsByTagNameNS(c,b))};this.rangeIntersectsNode=function(e,c){var b=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;return 0>=e.comparePoint(c,0)&&0<=e.comparePoint(c,b)};this.containsNode=function(e,c){return e===
c||e.contains(c)};(function(e){var c=runtime.getWindow();null!==c&&(c=c.navigator.appVersion.toLowerCase(),c=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")))&&(e.containsNode=l)})(this)};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(m,l){function e(a){a.parentNode&&(n.push(a.previousSibling),n.push(a.nextSibling),a.parentNode.removeChild(a))}function c(a,d,b){if(d.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(d),"putCursorIntoTextNode: invalid container");var c=d.parentNode;runtime.assert(Boolean(c),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=d.length,"putCursorIntoTextNode: offset is out of bounds");0===b?c.insertBefore(a,d):(b!==d.length&&d.splitText(b),c.insertBefore(a,
d.nextSibling))}else if(d.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(d),"putCursorIntoContainer: invalid container");for(c=d.firstChild;null!==c&&0<b;)c=c.nextSibling,b-=1;d.insertBefore(a,c)}n.push(a.previousSibling);n.push(a.nextSibling)}var b=m.createElementNS("urn:webodf:names:cursor","cursor"),h=m.createElementNS("urn:webodf:names:cursor","anchor"),a,n=[],f,d,s=new core.DomUtils;this.getNode=function(){return b};this.getAnchorNode=function(){return h.parentNode?h:b};this.getSelectedRange=
function(){d?(f.setStartBefore(b),f.collapse(!0)):(f.setStartAfter(a?h:b),f.setEndBefore(a?b:h));return f};this.setSelectedRange=function(k,q){f&&f!==k&&f.detach();f=k;a=!1!==q;(d=k.collapsed)?(e(h),e(b),c(b,k.startContainer,k.startOffset)):(e(h),e(b),c(a?b:h,k.endContainer,k.endOffset),c(a?h:b,k.startContainer,k.startOffset));n.forEach(s.normalizeTextNodes);n.length=0};this.remove=function(){e(b);n.forEach(s.normalizeTextNodes);n.length=0};b.setAttributeNS("urn:webodf:names:cursor","memberId",l);
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
core.EventNotifier=function(m){var l={};this.emit=function(e,c){var b,h;runtime.assert(l.hasOwnProperty(e),'unknown event fired "'+e+'"');h=l[e];for(b=0;b<h.length;b+=1)h[b](c)};this.subscribe=function(e,c){runtime.assert(l.hasOwnProperty(e),'tried to subscribe to unknown event "'+e+'"');l[e].push(c);runtime.log('event "'+e+'" subscribed.')};this.unsubscribe=function(e,c){var b;runtime.assert(l.hasOwnProperty(e),'tried to unsubscribe from unknown event "'+e+'"');b=l[e].indexOf(c);runtime.assert(-1!==
b,'tried to unsubscribe unknown callback from event "'+e+'"');-1!==b&&l[e].splice(b,1);runtime.log('event "'+e+'" unsubscribed.')};(function(){var e;for(e=0;e<m.length;e+=1)l[m[e]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var m=runtime.getWindow().document,l=m.getElementById("testarea");runtime.assert(!l,'Unclean test environment, found a div with id "testarea".');l=m.createElement("div");l.setAttribute("id","testarea");m.body.appendChild(l);return l};
core.UnitTest.cleanupTestAreaDiv=function(){var m=runtime.getWindow().document,l=m.getElementById("testarea");runtime.assert(!!l&&l.parentNode===m.body,'Test environment broken, found no div with id "testarea" below body.');m.body.removeChild(l)};
core.UnitTestRunner=function(){function m(b){a+=1;runtime.log("fail",b)}function l(a,d){var b;try{if(a.length!==d.length)return m("array of length "+a.length+" should be "+d.length+" long"),!1;for(b=0;b<a.length;b+=1)if(a[b]!==d[b])return m(a[b]+" should be "+d[b]+" at array index "+b),!1}catch(k){return!1}return!0}function e(a,b,c){var k=a.attributes,n=k.length,g,p,h;for(g=0;g<n;g+=1)if(p=k.item(g),"xmlns"!==p.prefix){h=b.getAttributeNS(p.namespaceURI,p.localName);if(!b.hasAttributeNS(p.namespaceURI,
p.localName))return m("Attribute "+p.localName+" with value "+p.value+" was not present"),!1;if(h!==p.value)return m("Attribute "+p.localName+" was "+h+" should be "+p.value),!1}return c?!0:e(b,a,!0)}function c(a,b){if(a.nodeType!==b.nodeType)return m(a.nodeType+" should be "+b.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===b.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==b.namespaceURI||a.localName!==b.localName)return m(a.namespaceURI+
" should be "+b.namespaceURI),!1;if(!e(a,b,!1))return!1;for(var n=a.firstChild,k=b.firstChild;n;){if(!k||!c(n,k))return!1;n=n.nextSibling;k=k.nextSibling}return k?!1:!0}function b(a,b){return 0===b?a===b&&1/a===1/b:a===b?!0:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?l(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?c(b,a):n(b,a):!1}function h(a,d,c){"string"===typeof d&&
"string"===typeof c||runtime.log("WARN: shouldBe() expects string arguments");var k,e;try{e=eval(d)}catch(g){k=g}a=eval(c);k?m(d+" should be "+a+". Threw exception "+k):b(e,a)?runtime.log("pass",d+" is "+c):String(typeof e)===String(typeof a)?(c=0===e&&0>1/e?"-0":String(e),m(d+" should be "+a+". Was "+c+".")):m(d+" should be "+a+" (of type "+typeof a+"). Was "+e+" (of type "+typeof e+").")}var a=0,n;n=function(a,d){var c=Object.keys(a),k=Object.keys(d);c.sort();k.sort();return l(c,k)&&Object.keys(a).every(function(k){var c=
a[k],e=d[k];return b(c,e)?!0:(m(c+" should be "+e+" for key "+k),!1)})};this.areNodesEqual=c;this.shouldBeNull=function(a,b){h(a,b,"null")};this.shouldBeNonNull=function(a,b){var c,k;try{k=eval(b)}catch(e){c=e}c?m(b+" should be non-null. Threw exception "+c):null!==k?runtime.log("pass",b+" is non-null."):m(b+" should be non-null. Was "+k)};this.shouldBe=h;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function m(c,b){return"<span style='color:blue;cursor:pointer' onclick='"+b+"'>"+c+"</span>"}var l=0,e={};this.runTests=function(c,b,h){function a(k){if(0===k.length)e[n]=s,l+=f.countFailedTests(),b();else{q=k[0];var c=Runtime.getFunctionName(q);runtime.log("Running "+c);p=f.countFailedTests();d.setUp();q(function(){d.tearDown();s[c]=p===f.countFailedTests();a(k.slice(1))})}}var n=Runtime.getFunctionName(c),f=new core.UnitTestRunner,d=new c(f),s={},k,q,g,p,r="BrowserRuntime"===
runtime.type();if(e.hasOwnProperty(n))runtime.log("Test "+n+" has already run.");else{r?runtime.log("<span>Running "+m(n,'runSuite("'+n+'");')+": "+d.description()+"</span>"):runtime.log("Running "+n+": "+d.description);g=d.tests();for(k=0;k<g.length;k+=1)q=g[k],c=Runtime.getFunctionName(q)||q.testName,h.length&&-1===h.indexOf(c)||(r?runtime.log("<span>Running "+m(c,'runTest("'+n+'","'+c+'")')+"</span>"):runtime.log("Running "+c),p=f.countFailedTests(),d.setUp(),q(),d.tearDown(),s[c]=p===f.countFailedTests());
a(d.asyncTests())}};this.countFailedTests=function(){return l};this.results=function(){return e}};
// Input 13
core.PositionIterator=function(m,l,e,c){function b(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function h(a){this.acceptNode=function(b){return b.nodeType===Node.TEXT_NODE&&0===b.length?NodeFilter.FILTER_REJECT:a.acceptNode(b)}}function a(){var a=f.currentNode.nodeType;d=a===Node.TEXT_NODE?f.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var n=this,f,d,s;this.nextPosition=function(){if(f.currentNode===m)return!1;
if(0===d&&f.currentNode.nodeType===Node.ELEMENT_NODE)null===f.firstChild()&&(d=1);else if(f.currentNode.nodeType===Node.TEXT_NODE&&d+1<f.currentNode.length)d+=1;else if(null!==f.nextSibling())d=0;else if(f.parentNode())d=1;else return!1;return!0};this.previousPosition=function(){var b=!0;if(0===d)if(null===f.previousSibling()){if(!f.parentNode()||f.currentNode===m)return f.firstChild(),!1;d=0}else a();else f.currentNode.nodeType===Node.TEXT_NODE?d-=1:null!==f.lastChild()?a():f.currentNode===m?b=!1:
d=0;return b};this.container=function(){var a=f.currentNode,b=a.nodeType;return 0===d&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=f.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&d===a.length)for(a=a.nextSibling;a&&1!==s(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===d&&(a=null);return a};this.leftNode=function(){var a=f.currentNode;if(0===d)for(a=a.previousSibling;a&&1!==s(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==s(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return f.currentNode};this.domOffset=function(){if(f.currentNode.nodeType===Node.TEXT_NODE)return d;var a=0,b=f.currentNode,c;for(c=1===d?f.lastChild():f.previousSibling();c;)a+=1,c=f.previousSibling();f.currentNode=b;return a};this.unfilteredDomOffset=function(){if(f.currentNode.nodeType===Node.TEXT_NODE)return d;for(var a=0,b=f.currentNode,b=1===d?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=
function(){var a=f.currentNode,b=f.previousSibling();f.currentNode=a;return b};this.getNextSibling=function(){var a=f.currentNode,b=f.nextSibling();f.currentNode=a;return b};this.setUnfilteredPosition=function(a,b){var c;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");f.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return d=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),
b===a.length&&(d=void 0,f.nextSibling()?d=0:f.parentNode()&&(d=1),runtime.assert(void 0!==d,"Error in setPosition: position not valid.")),!0;c=s(a);b<a.childNodes.length&&c!==NodeFilter.FILTER_REJECT?(f.currentNode=a.childNodes[b],c=s(f.currentNode),d=0):d=0===b?0:1;c===NodeFilter.FILTER_REJECT&&(d=1);if(c!==NodeFilter.FILTER_ACCEPT)return n.nextPosition();runtime.assert(s(f.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
return!0};this.moveToEnd=function(){f.currentNode=m;d=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?n.setUnfilteredPosition(a,a.length):(f.currentNode=a,d=1)};this.getNodeFilter=function(){return s};s=(e?new h(e):new b).acceptNode;s.acceptNode=s;f=m.ownerDocument.createTreeWalker(m,l||4294967295,s,c);d=0;null===f.firstChild()&&(d=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(m){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var m={},l=core.PositionFilter.FilterResult.FILTER_ACCEPT,e=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(c){for(var b in m)if(m.hasOwnProperty(b)&&m[b].acceptPosition(c)===e)return e;return l};this.addFilter=function(c,b){m[c]=b};this.removeFilter=function(c){delete m[c]}};
// Input 16
core.Async=function(){this.forEach=function(m,l,e){function c(b){a!==h&&(b?(a=h,e(b)):(a+=1,a===h&&e(null)))}var b,h=m.length,a=0;for(b=0;b<h;b+=1)l(m[b],c)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(m,l){function e(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],d,c,e=a.length,g=0,g=0;d=-1;for(c=0;c<e;c+=1)g=(d^a[c])&255,g=b[g],d=d>>>8^g;return d^-1}function c(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function b(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function h(a,b){var d,e,g,k,f,n,h,r=this;this.load=function(b){if(void 0!==r.data)b(null,r.data);else{var d=f+34+e+g+256;d+h>p&&(d=p-h);runtime.read(a,h,d,function(d,c){if(d||null===c)b(d,c);else a:{var e=c,g=new core.ByteArray(e),p=g.readUInt32LE(),t;if(67324752!==p)b("File entry signature is wrong."+p.toString()+" "+e.length.toString(),null);else{g.pos+=22;p=g.readUInt16LE();t=g.readUInt16LE();g.pos+=p+t;
if(k){e=e.slice(g.pos,g.pos+f);if(f!==e.length){b("The amount of compressed bytes read was "+e.length.toString()+" instead of "+f.toString()+" for "+r.filename+" in "+a+".",null);break a}e=w(e,n)}else e=e.slice(g.pos,g.pos+n);n!==e.length?b("The amount of bytes read was "+e.length.toString()+" instead of "+n.toString()+" for "+r.filename+" in "+a+".",null):(r.data=e,b(null,e))}}})}};this.set=function(a,b,d,c){r.filename=a;r.data=b;r.compressed=d;r.date=c};this.error=null;b&&(d=b.readUInt32LE(),33639248!==
d?this.error="Central directory entry has wrong signature at position "+(b.pos-4).toString()+' for file "'+a+'": '+b.data.length.toString():(b.pos+=6,k=b.readUInt16LE(),this.date=c(b.readUInt32LE()),b.readUInt32LE(),f=b.readUInt32LE(),n=b.readUInt32LE(),e=b.readUInt16LE(),g=b.readUInt16LE(),d=b.readUInt16LE(),b.pos+=8,h=b.readUInt32LE(),this.filename=runtime.byteArrayToString(b.data.slice(b.pos,b.pos+e),"utf8"),b.pos+=e+g+d))}function a(a,b){if(22!==a.length)b("Central directory length should be 22.",
u);else{var d=new core.ByteArray(a),c;c=d.readUInt32LE();101010256!==c?b("Central directory signature is wrong: "+c.toString(),u):(c=d.readUInt16LE(),0!==c?b("Zip files with non-zero disk numbers are not supported.",u):(c=d.readUInt16LE(),0!==c?b("Zip files with non-zero disk numbers are not supported.",u):(c=d.readUInt16LE(),r=d.readUInt16LE(),c!==r?b("Number of entries is inconsistent.",u):(c=d.readUInt32LE(),d=d.readUInt16LE(),d=p-22-c,runtime.read(m,d,p-d,function(a,d){if(a||null===d)b(a,u);else a:{var c=
new core.ByteArray(d),e,k;g=[];for(e=0;e<r;e+=1){k=new h(m,c);if(k.error){b(k.error,u);break a}g[g.length]=k}b(null,u)}})))))}}function n(a,b){var d=null,c,e;for(e=0;e<g.length;e+=1)if(c=g[e],c.filename===a){d=c;break}d?d.data?b(null,d.data):d.load(b):b(a+" not found.",null)}function f(a){var d=new core.ByteArrayWriter("utf8"),c=0;d.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(c=a.data.length);d.appendUInt32LE(b(a.date));d.appendUInt32LE(e(a.data));d.appendUInt32LE(c);d.appendUInt32LE(c);d.appendUInt16LE(a.filename.length);
d.appendUInt16LE(0);d.appendString(a.filename);a.data&&d.appendByteArray(a.data);return d}function d(a,d){var c=new core.ByteArrayWriter("utf8"),g=0;c.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(g=a.data.length);c.appendUInt32LE(b(a.date));c.appendUInt32LE(e(a.data));c.appendUInt32LE(g);c.appendUInt32LE(g);c.appendUInt16LE(a.filename.length);c.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);c.appendUInt32LE(d);c.appendString(a.filename);return c}function s(a,b){if(a===g.length)b(null);else{var d=g[a];
void 0!==d.data?s(a+1,b):d.load(function(d){d?b(d):s(a+1,b)})}}function k(a,b){s(0,function(c){if(c)b(c);else{c=new core.ByteArrayWriter("utf8");var e,k,p,n=[0];for(e=0;e<g.length;e+=1)c.appendByteArrayWriter(f(g[e])),n.push(c.getLength());p=c.getLength();for(e=0;e<g.length;e+=1)k=g[e],c.appendByteArrayWriter(d(k,n[e]));e=c.getLength()-p;c.appendArray([80,75,5,6,0,0,0,0]);c.appendUInt16LE(g.length);c.appendUInt16LE(g.length);c.appendUInt32LE(e);c.appendUInt32LE(p);c.appendArray([0,0]);a(c.getByteArray())}})}
function q(a,b){k(function(d){runtime.writeFile(a,d,b)},b)}var g,p,r,w=(new core.RawInflate).inflate,u=this,A=new core.Base64;this.load=n;this.save=function(a,b,d,c){var e,k;for(e=0;e<g.length;e+=1)if(k=g[e],k.filename===a){k.set(a,b,d,c);return}k=new h(m);k.set(a,b,d,c);g.push(k)};this.write=function(a){q(m,a)};this.writeAs=q;this.createByteArray=k;this.loadContentXmlAsFragments=function(a,b){u.loadAsString(a,function(a,d){if(a)return b.rootElementReady(a);b.rootElementReady(null,d,!0)})};this.loadAsString=
function(a,b){n(a,function(a,d){if(a||null===d)return b(a,null);var c=runtime.byteArrayToString(d,"utf8");b(null,c)})};this.loadAsDOM=function(a,b){u.loadAsString(a,function(a,d){if(a||null===d)b(a,null);else{var c=(new DOMParser).parseFromString(d,"text/xml");b(null,c)}})};this.loadAsDataURL=function(a,b,d){n(a,function(a,c){if(a)return d(a,null);var e=0,g;b||(b=80===c[1]&&78===c[2]&&71===c[3]?"image/png":255===c[0]&&216===c[1]&&255===c[2]?"image/jpeg":71===c[0]&&73===c[1]&&70===c[2]?"image/gif":
"");for(g="data:"+b+";base64,";e<c.length;)g+=A.convertUTF8ArrayToBase64(c.slice(e,Math.min(e+45E3,c.length))),e+=45E3;d(null,g)})};this.getEntries=function(){return g.slice()};p=-1;null===l?g=[]:runtime.getFileSize(m,function(b){p=b;0>p?l("File '"+m+"' cannot be read.",u):runtime.read(m,p-22,22,function(b,d){b||null===l||null===d?l(b,u):a(d,l)})})};
// Input 18
core.CSSUnits=function(){var m={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(l,e,c){return l*m[c]/m[e]};this.convertMeasure=function(m,e){var c,b;m&&e?(c=parseFloat(m),b=m.replace(c.toString(),""),c=this.convert(c,b,e)):c="";return c.toString()};this.getUnits=function(m){return m.substr(m.length-2,m.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(m){var l=function(){};l.prototype=m;return new l});
xmldom.LSSerializer=function(){function m(b){var c=b||{},a=function(a){var b={},d;for(d in a)a.hasOwnProperty(d)&&(b[a[d]]=d);return b}(b),e=[c],f=[a],d=0;this.push=function(){d+=1;c=e[d]=Object.create(c);a=f[d]=Object.create(a)};this.pop=function(){e[d]=void 0;f[d]=void 0;d-=1;c=e[d];a=f[d]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(b){var d=b.namespaceURI,e=0,g;if(!d)return b.localName;if(g=a[d])return g+":"+b.localName;do{g||!b.prefix?(g="ns"+e,e+=1):g=b.prefix;
if(c[g]===d)break;if(!c[g]){c[g]=d;a[d]=g;break}g=null}while(null===g);return g+":"+b.localName}}function l(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function e(b,h){var a="",n=c.filter?c.filter.acceptNode(h):NodeFilter.FILTER_ACCEPT,f;if(n===NodeFilter.FILTER_ACCEPT&&h.nodeType===Node.ELEMENT_NODE){b.push();f=b.getQName(h);var d,m=h.attributes,k,q,g,p="",r;d="<"+f;k=m.length;for(q=0;q<k;q+=1)g=m.item(q),"http://www.w3.org/2000/xmlns/"!==
g.namespaceURI&&(r=c.filter?c.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,r===NodeFilter.FILTER_ACCEPT&&(r=b.getQName(g),g="string"===typeof g.value?l(g.value):g.value,p+=" "+(r+'="'+g+'"')));k=b.getLocalNamespaceDefinitions();for(q in k)k.hasOwnProperty(q)&&((m=k[q])?"xmlns"!==m&&(d+=" xmlns:"+k[q]+'="'+q+'"'):d+=' xmlns="'+q+'"');a+=d+(p+">")}if(n===NodeFilter.FILTER_ACCEPT||n===NodeFilter.FILTER_SKIP){for(n=h.firstChild;n;)a+=e(b,n),n=n.nextSibling;h.nodeValue&&(a+=l(h.nodeValue))}f&&(a+="</"+
f+">",b.pop());return a}var c=this;this.filter=null;this.writeToString=function(b,c){if(!b)return"";var a=new m(c);return e(a,b)}};
// Input 21
xmldom.RelaxNGParser=function(){function m(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function l(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return l({name:a.name,e:[b].concat(a.e.slice(2))})}function e(a){a=a.split(":",2);var b="",c;1===a.length?a=["",a[0]]:b=a[0];for(c in n)n[c]===b&&(a[0]=c);return a}function c(a,b){for(var k=0,f,g,p=a.name;a.e&&k<a.e.length;)if(f=
a.e[k],"ref"===f.name){g=b[f.a.name];if(!g)throw f.a.name+" was not defined.";f=a.e.slice(k+1);a.e=a.e.slice(0,k);a.e=a.e.concat(g.e);a.e=a.e.concat(f)}else k+=1,c(f,b);f=a.e;"choice"!==p||f&&f[1]&&"empty"!==f[1].name||(f&&f[0]&&"empty"!==f[0].name?(f[1]=f[0],f[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===p||"interleave"===p)"empty"===f[0].name?"empty"===f[1].name?(delete a.e,a.name="empty"):(p=a.name=f[1].name,a.names=f[1].names,f=a.e=f[1].e):"empty"===f[1].name&&(p=a.name=f[0].name,
a.names=f[0].names,f=a.e=f[0].e);"oneOrMore"===p&&"empty"===f[0].name&&(delete a.e,a.name="empty");if("attribute"===p){g=a.names?a.names.length:0;for(var n,h=[],m=[],k=0;k<g;k+=1)n=e(a.names[k]),m[k]=n[0],h[k]=n[1];a.localnames=h;a.namespaces=m}"interleave"===p&&("interleave"===f[0].name?a.e="interleave"===f[1].name?f[0].e.concat(f[1].e):[f[1]].concat(f[0].e):"interleave"===f[1].name&&(a.e=[f[0]].concat(f[1].e)))}function b(a,c){for(var e=0,f;a.e&&e<a.e.length;)f=a.e[e],"elementref"===f.name?(f.id=
f.id||0,a.e[e]=c[f.id]):"element"!==f.name&&b(f,c),e+=1}var h=this,a,n={"http://www.w3.org/XML/1998/namespace":"xml"},f;f=function(a,b,c){var h=[],g,p,r=a.localName,m=[];g=a.attributes;var u=r,A=m,x={},v,t;for(v=0;v<g.length;v+=1)if(t=g.item(v),t.namespaceURI)"http://www.w3.org/2000/xmlns/"===t.namespaceURI&&(n[t.value]=t.localName);else{"name"!==t.localName||"element"!==u&&"attribute"!==u||A.push(t.value);if("name"===t.localName||"combine"===t.localName||"type"===t.localName){var E=t,H;H=t.value;
H=H.replace(/^\s\s*/,"");for(var y=/\s/,P=H.length-1;y.test(H.charAt(P));)P-=1;H=H.slice(0,P+1);E.value=H}x[t.localName]=t.value}g=x;g.combine=g.combine||void 0;a=a.firstChild;u=h;A=m;for(x="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(v=f(a,b,u))"name"===v.name?A.push(n[v.a.ns]+":"+v.text):"choice"===v.name&&(v.names&&v.names.length)&&(A=A.concat(v.names),delete v.names),u.push(v)}else a.nodeType===Node.TEXT_NODE&&(x+=a.nodeValue);a=a.nextSibling}a=
x;"value"!==r&&"param"!==r&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===r&&void 0===g.type&&(g.type="token",g.datatypeLibrary="");"attribute"!==r&&"element"!==r||void 0===g.name||(p=e(g.name),h=[{name:"name",text:p[1],a:{ns:p[0]}}].concat(h),delete g.name);"name"===r||"nsName"===r||"value"===r?void 0===g.ns&&(g.ns=""):delete g.ns;"name"===r&&(p=e(a),g.ns=p[0],a=p[1]);1<h.length&&("define"===r||"oneOrMore"===r||"zeroOrMore"===r||"optional"===r||"list"===r||"mixed"===r)&&(h=[{name:"group",e:l({name:"group",
e:h}).e}]);2<h.length&&"element"===r&&(h=[h[0]].concat({name:"group",e:l({name:"group",e:h.slice(1)}).e}));1===h.length&&"attribute"===r&&h.push({name:"text",text:a});1!==h.length||"choice"!==r&&"group"!==r&&"interleave"!==r?2<h.length&&("choice"===r||"group"===r||"interleave"===r)&&(h=l({name:r,e:h}).e):(r=h[0].name,m=h[0].names,g=h[0].a,a=h[0].text,h=h[0].e);"mixed"===r&&(r="interleave",h=[h[0],{name:"text"}]);"optional"===r&&(r="choice",h=[h[0],{name:"empty"}]);"zeroOrMore"===r&&(r="choice",h=
[{name:"oneOrMore",e:[h[0]]},{name:"empty"}]);if("define"===r&&g.combine){a:{u=g.combine;A=g.name;x=h;for(v=0;c&&v<c.length;v+=1)if(t=c[v],"define"===t.name&&t.a&&t.a.name===A){t.e=[{name:u,e:t.e.concat(x)}];c=t;break a}c=null}if(c)return}c={name:r};h&&0<h.length&&(c.e=h);for(p in g)if(g.hasOwnProperty(p)){c.a=g;break}void 0!==a&&(c.text=a);m&&0<m.length&&(c.names=m);"element"===r&&(c.id=b.length,b.push(c),c={name:"elementref",id:c.id});return c};this.parseRelaxNGDOM=function(d,e){var k=[],l=f(d&&
d.documentElement,k,void 0),g,p,r={};for(g=0;g<l.e.length;g+=1)p=l.e[g],"define"===p.name?r[p.a.name]=p:"start"===p.name&&(a=p);if(!a)return[new m("No Relax NG start element was found.")];c(a,r);for(g in r)r.hasOwnProperty(g)&&c(r[g],r);for(g=0;g<k.length;g+=1)c(k[g],r);e&&(h.rootPattern=e(a.e[0],k));b(a,k);for(g=0;g<k.length;g+=1)b(k[g],k);h.start=a;h.elements=k;h.nsmap=n;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function m(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function l(a,b){return function(){var c={},d=0;return function(e){var g=e.hash||e.toString(),f;f=c[g];if(void 0!==f)return f;c[g]=f=b(e);f.hash=a+d.toString();d+=1;return f}}()}function e(a){return function(){var b={};return function(c){var d,e;e=b[c.localName];if(void 0===e)b[c.localName]=e={};else if(d=e[c.namespaceURI],void 0!==d)return d;return e[c.namespaceURI]=d=a(c)}}()}function c(a,
b,c){return function(){var d={},e=0;return function(g,f){var k=b&&b(g,f),p,n;if(void 0!==k)return k;k=g.hash||g.toString();p=f.hash||f.toString();n=d[k];if(void 0===n)d[k]=n={};else if(k=n[p],void 0!==k)return k;n[p]=k=c(g,f);k.hash=a+e.toString();e+=1;return k}}()}function b(a,c){"choice"===c.p1.type?b(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?b(a,c.p2):a[c.p2.hash]=c.p2}function h(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return v},startTagOpenDeriv:function(c){return a.contains(c)?
g(b,t):v},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return t}}}function n(a,b,c,e){if(b===v)return v;if(e>=c.length)return b;0===e&&(e=0);for(var g=c.item(e);g.namespaceURI===d;){e+=1;if(e>=c.length)return b;g=c.item(e)}return g=n(a,b.attDeriv(a,c.item(e)),c,e+1)}function f(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):f(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
f(a,b,c.e[1])}var d="http://www.w3.org/2000/xmlns/",s,k,q,g,p,r,w,u,A,x,v={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return v},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return v},endTagDeriv:function(){return v}},t={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return v},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return t},endTagDeriv:function(){return v}},
E={type:"text",nullable:!0,hash:"text",textDeriv:function(){return E},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return E},endTagDeriv:function(){return v}},H,y,P;s=c("choice",function(a,b){if(a===v)return b;if(b===v||a===b)return a},function(a,c){var d={},g;b(d,{p1:a,p2:c});c=a=void 0;for(g in d)d.hasOwnProperty(g)&&(void 0===a?a=d[g]:c=void 0===c?d[g]:s(c,d[g]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,d){return s(a.textDeriv(c,d),b.textDeriv(c,d))},startTagOpenDeriv:e(function(c){return s(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,d){return s(a.attDeriv(c,d),b.attDeriv(c,d))},startTagCloseDeriv:m(function(){return s(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:m(function(){return s(a.endTagDeriv(),b.endTagDeriv())})}}(a,c)});k=function(a,b,c){return function(){var d={},e=0;return function(g,f){var k=b&&b(g,f),p,n;if(void 0!==k)return k;
k=g.hash||g.toString();p=f.hash||f.toString();k<p&&(n=k,k=p,p=n,n=g,g=f,f=n);n=d[k];if(void 0===n)d[k]=n={};else if(k=n[p],void 0!==k)return k;n[p]=k=c(g,f);k.hash=a+e.toString();e+=1;return k}}()}("interleave",function(a,b){if(a===v||b===v)return v;if(a===t)return b;if(b===t)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){return s(k(a.textDeriv(c,d),b),k(a,b.textDeriv(c,d)))},startTagOpenDeriv:e(function(c){return s(H(function(a){return k(a,
b)},a.startTagOpenDeriv(c)),H(function(b){return k(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,d){return s(k(a.attDeriv(c,d),b),k(a,b.attDeriv(c,d)))},startTagCloseDeriv:m(function(){return k(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});q=c("group",function(a,b){if(a===v||b===v)return v;if(a===t)return b;if(b===t)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){var e=q(a.textDeriv(c,d),b);return a.nullable?s(e,b.textDeriv(c,
d)):e},startTagOpenDeriv:function(c){var d=H(function(a){return q(a,b)},a.startTagOpenDeriv(c));return a.nullable?s(d,b.startTagOpenDeriv(c)):d},attDeriv:function(c,d){return s(q(a.attDeriv(c,d),b),q(a,b.attDeriv(c,d)))},startTagCloseDeriv:m(function(){return q(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});g=c("after",function(a,b){if(a===v||b===v)return v},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,d){return g(a.textDeriv(c,d),b)},startTagOpenDeriv:e(function(c){return H(function(a){return g(a,
b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,d){return g(a.attDeriv(c,d),b)},startTagCloseDeriv:m(function(){return g(a.startTagCloseDeriv(),b)}),endTagDeriv:m(function(){return a.nullable?b:v})}});p=l("oneormore",function(a){return a===v?v:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return q(a.textDeriv(b,c),s(this,t))},startTagOpenDeriv:function(b){var c=this;return H(function(a){return q(a,s(c,t))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return q(a.attDeriv(b,
c),s(this,t))},startTagCloseDeriv:m(function(){return p(a.startTagCloseDeriv())})}});w=c("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,d){return a.contains(d)&&(b.nullable&&/^\s+$/.test(d.nodeValue)||b.textDeriv(c,d.nodeValue).nullable)?t:v},startTagCloseDeriv:function(){return v}}});r=l("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?t:v},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}});
A=l("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return t},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}});H=function R(a,b){return"after"===b.type?g(b.p1,a(b.p2)):"choice"===b.type?s(R(a,b.p1),R(a,b.p2)):b};y=function(a,b,c){var d=c.currentNode;b=b.startTagOpenDeriv(d);b=n(a,b,d.attributes,0);var e=b=b.startTagCloseDeriv(),d=c.currentNode;b=c.firstChild();for(var g=[],k;b;)b.nodeType===Node.ELEMENT_NODE?g.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||g.push(b.nodeValue),b=c.nextSibling();0===g.length&&(g=[""]);k=e;for(e=0;k!==v&&e<g.length;e+=1)b=g[e],"string"===typeof b?k=/^\s*$/.test(b)?s(k,k.textDeriv(a,b)):k.textDeriv(a,b):(c.currentNode=b,k=y(a,k,c));c.currentNode=d;return b=k.endTagDeriv()};u=function(a){var b,c,d;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];f(b,c,a);a="";for(d=0;d<b.length;d+=
1)a+="{"+c[d]+"}"+b[d]+",";a={hash:a,contains:function(a){var d;for(d=0;d<b.length;d+=1)if(b[d]===a.localName&&c[d]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};x=function G(b,c){var d,e;if("elementref"===b.name){d=b.id||0;b=c[d];if(void 0!==b.name){var g=b;d=c[g.id]={hash:"element"+g.id.toString()};g=h(u(g.e[0]),x(g.e[1],c));for(e in g)g.hasOwnProperty(e)&&(d[e]=g[e]);return d}return b}switch(b.name){case "empty":return t;case "notAllowed":return v;
case "text":return E;case "choice":return s(G(b.e[0],c),G(b.e[1],c));case "interleave":d=G(b.e[0],c);for(e=1;e<b.e.length;e+=1)d=k(d,G(b.e[e],c));return d;case "group":return q(G(b.e[0],c),G(b.e[1],c));case "oneOrMore":return p(G(b.e[0],c));case "attribute":return w(u(b.e[0]),G(b.e[1],c));case "value":return r(b.text);case "data":return d=b.a&&b.a.type,void 0===d&&(d=""),A(d);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var c={},d;for(d in b)b.hasOwnProperty(d)&&
(c[d]=b[d]);return d=x(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=y(null,P,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){P=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function m(a,b){this.message=function(){b&&(a+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function l(a,c,e,d){return"empty"===a.name?null:b(a,c,e,d)}function e(a,b){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var c=b.currentNode,d=c?c.nodeType:0,e=null;d>Node.ELEMENT_NODE;){if(d!==Node.COMMENT_NODE&&(d!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new m("Not allowed node of type "+
d+".")];d=(c=b.nextSibling())?c.nodeType:0}if(!c)return[new m("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(h[c.namespaceURI]+":"+c.localName))return[new m("Found "+c.nodeName+" instead of "+a.names+".",c)];if(b.firstChild()){for(e=l(a.e[1],b,c);b.nextSibling();)if(d=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||d===Node.COMMENT_NODE))return[new m("Spurious content.",b.currentNode)];if(b.parentNode()!==c)return[new m("Implementation error.")]}else e=
l(a.e[1],b,c);b.nextSibling();return e}var c,b,h;b=function(a,c,f,d){var h=a.name,k=null;if("text"===h)a:{for(var q=(a=c.currentNode)?a.nodeType:0;a!==f&&3!==q;){if(1===q){k=[new m("Element not allowed here.",a)];break a}q=(a=c.nextSibling())?a.nodeType:0}c.nextSibling();k=null}else if("data"===h)k=null;else if("value"===h)d!==a.text&&(k=[new m("Wrong value, should be '"+a.text+"', not '"+d+"'",f)]);else if("list"===h)k=null;else if("attribute"===h)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;h=a.localnames.length;for(k=0;k<h;k+=1){d=f.getAttributeNS(a.namespaces[k],a.localnames[k]);""!==d||f.hasAttributeNS(a.namespaces[k],a.localnames[k])||(d=void 0);if(void 0!==q&&void 0!==d){k=[new m("Attribute defined too often.",f)];break a}q=d}k=void 0===q?[new m("Attribute not found: "+a.names,f)]:l(a.e[1],c,f,q)}else if("element"===h)k=e(a,c);else if("oneOrMore"===h){d=0;do q=c.currentNode,h=b(a.e[0],c,f),d+=1;while(!h&&q!==c.currentNode);1<d?(c.currentNode=q,k=null):k=h}else if("choice"===
h){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;q=c.currentNode;if("empty"===a.e[0].name){if(h=b(a.e[1],c,f,d))c.currentNode=q;k=null}else{if(h=l(a.e[0],c,f,d))c.currentNode=q,h=b(a.e[1],c,f,d);k=h}}else if("group"===h){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;k=b(a.e[0],c,f)||b(a.e[1],c,f)}else if("interleave"===h)a:{q=a.e.length;d=[q];for(var g=q,p,r,w,u;0<g;){p=0;r=c.currentNode;for(k=0;k<q;k+=1)w=c.currentNode,!0!==d[k]&&d[k]!==w&&(u=a.e[k],(h=
b(u,c,f))?(c.currentNode=w,void 0===d[k]&&(d[k]=!1)):w===c.currentNode||"oneOrMore"===u.name||"choice"===u.name&&("oneOrMore"===u.e[0].name||"oneOrMore"===u.e[1].name)?(p+=1,d[k]=w):(p+=1,d[k]=!0));if(r===c.currentNode&&p===g){k=null;break a}if(0===p){for(k=0;k<q;k+=1)if(!1===d[k]){k=[new m("Interleave does not match.",f)];break a}k=null;break a}for(k=g=0;k<q;k+=1)!0!==d[k]&&(g+=1)}k=null}else throw h+" not allowed in nonEmptyPattern.";return k};this.validate=function(a,b){a.currentNode=a.root;var e=
l(c.e[0],a,a.root);b(e)};this.init=function(a,b){c=a;h=b}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function m(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function l(a){for(var b=[],c=0,d=a.length,e;c<d;){var f=a,h=d,n=b,l="",v=[],t=f.indexOf("[",c),E=f.indexOf("/",c),H=f.indexOf("=",c);m(E,t,H)?(l=f.substring(c,E),c=E+1):m(t,E,H)?(l=f.substring(c,t),c=s(f,t,v)):m(H,E,t)?(l=f.substring(c,H),c=H):(l=f.substring(c,h),c=h);n.push({location:l,predicates:v});if(c<d&&"="===a[c]){e=a.substring(c+1,d);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);else try{e=
parseInt(e,10)}catch(y){}c=d}}return{steps:b,value:e}}function e(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function c(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function b(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function h(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function a(a,b,c){b=b.split(":",2);var d=c(b[0]),e=b[1];return new h(a,function(a){return a.localName===e&&a.namespaceURI===d})}function n(a,b,c){var f=new e,n=d(f,b,c),m=b.value;return void 0===m?new h(a,function(a){f.setNode(a);
n.reset();return n.next()}):new h(a,function(a){f.setNode(a);n.reset();return(a=n.next())&&a.nodeValue===m})}function f(a,b,c){var f=a.ownerDocument,h=[],n=null;if(f&&f.evaluate)for(c=f.evaluate(b,a,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),n=c.iterateNext();null!==n;)n.nodeType===Node.ELEMENT_NODE&&h.push(n),n=c.iterateNext();else{h=new e;h.setNode(a);a=l(b);h=d(h,a,c);a=[];for(c=h.next();c;)a.push(c),c=h.next();h=a}return h}var d,s;s=function(a,b,c){for(var d=b,e=a.length,f=0;d<e;)"]"===
a[d]?(f-=1,0>=f&&c.push(l(a.substring(b,d)))):"["===a[d]&&(0>=f&&(b=d+1),f+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};d=function(d,e,g){var f,h,m,l;for(f=0;f<e.steps.length;f+=1)for(m=e.steps[f],h=m.location,""===h?d=new b(d,!1):"@"===h[0]?(l=h.slice(1).split(":",2),d=new c(d,g(l[0]),l[1])):"."!==h&&(d=new b(d,!1),-1!==h.indexOf(":")&&(d=a(d,h,g))),h=0;h<m.predicates.length;h+=1)l=m.predicates[h],d=n(d,l,g);return d};xmldom.XPath=
function(){this.getODFElementsWithXPath=f};return xmldom.XPath}();
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
gui.AnnotationViewManager=function(m,l,e){function c(a){var b=a.node,c=a.end;a=f.createRange();c&&(a.setStart(b,b.childNodes.length),a.setEnd(c,0),c=d.getTextNodes(a,!1),c.forEach(function(a){var c=f.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function b(a){var b=m.getSizer();a?(e.style.display="inline-block",b.style.paddingRight=s.getComputedStyle(e).width):
(e.style.display="none",b.style.paddingRight=0);m.refreshSize()}function h(){n.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function a(){var a;for(a=0;a<n.length;a+=1){var b=n[a],c=b.node.parentNode,d=c.nextSibling,h=d.nextSibling,l=c.parentNode,u=0,A=n[n.indexOf(b)-1],x=void 0,b=b.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],u=void 0,u=m.getZoomLevel();c.style.left=(e.getBoundingClientRect().left-l.getBoundingClientRect().left)/
u+"px";c.style.width=e.getBoundingClientRect().width/u+"px";d.style.width=parseFloat(c.style.left)-30+"px";A&&(x=A.node.parentNode.getBoundingClientRect(),20>=(l.getBoundingClientRect().top-x.bottom)/u?c.style.top=Math.abs(l.getBoundingClientRect().top-x.bottom)/u+20+"px":c.style.top="0px");h.style.left=d.getBoundingClientRect().width/u+"px";var d=h.style,l=h.getBoundingClientRect().left/u,A=h.getBoundingClientRect().top/u,x=c.getBoundingClientRect().left/u,v=c.getBoundingClientRect().top/u,t=0,E=
0,t=x-l,t=t*t,E=v-A,E=E*E,l=Math.sqrt(t+E);d.width=l+"px";u=Math.asin((c.getBoundingClientRect().top-h.getBoundingClientRect().top)/(u*parseFloat(h.style.width)));h.style.transform="rotate("+u+"rad)";h.style.MozTransform="rotate("+u+"rad)";h.style.WebkitTransform="rotate("+u+"rad)";h.style.msTransform="rotate("+u+"rad)";b&&(u=s.getComputedStyle(b,":before").content)&&"none"!==u&&(u=u.substring(1,u.length-1),b.firstChild?b.firstChild.nodeValue=u:b.appendChild(f.createTextNode(u)))}}var n=[],f=l.ownerDocument,
d=new odf.OdfUtils,s=runtime.getWindow();runtime.assert(Boolean(s),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=a;this.addAnnotation=function(d){b(!0);n.push({node:d.node,end:d.end});h();var e=f.createElement("div"),g=f.createElement("div"),p=f.createElement("div"),m=f.createElement("div"),l=f.createElement("div"),u=d.node;e.className="annotationWrapper";u.parentNode.insertBefore(e,u);g.className="annotationNote";g.appendChild(u);l.className=
"annotationRemoveButton";g.appendChild(l);p.className="annotationConnector horizontal";m.className="annotationConnector angular";e.appendChild(g);e.appendChild(p);e.appendChild(m);d.end&&c(d);a()};this.forgetAnnotations=function(){for(;n.length;){var a=n[0],c=n.indexOf(a),d=a.node,e=d.parentNode.parentNode;"div"===e.localName&&(e.parentNode.insertBefore(d,e),e.parentNode.removeChild(e));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=f.querySelectorAll('span.annotationHighlight[annotation="'+
a+'"]');e=d=void 0;for(d=0;d<a.length;d+=1){for(e=a[d];e.firstChild;)e.parentNode.insertBefore(e.firstChild,e);e.parentNode.removeChild(e)}-1!==c&&n.splice(c,1);0===n.length&&b(!1)}}};
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
odf.Namespaces=function(){function m(c){return l[c]||null}var l={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",dc:"http://purl.org/dc/elements/1.1/",webodf:"urn:webodf"},e;m.lookupNamespaceURI=m;e=function(){};e.forEachPrefix=function(c){for(var b in l)l.hasOwnProperty(b)&&c(b,l[b])};e.resolvePrefix=m;e.namespaceMap=l;e.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";e.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
e.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";e.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";e.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";e.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";e.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";e.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";e.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";e.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
e.xlinkns="http://www.w3.org/1999/xlink";e.xmlns="http://www.w3.org/XML/1998/namespace";e.dcns="http://purl.org/dc/elements/1.1/";e.webodfns="urn:webodf";return e}();
// Input 28
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function m(a,b){for(var c=q[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,f,c=0;c<e;c+=1)(f=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,s[d[c].ns]+d[c].localname,b+f);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,m(d,b)),c=c.nextSibling}function l(a,b){for(var c=q[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,f,c=0;c<e;c+=1)if(f=a.getAttributeNS(d[c].ns,d[c].localname))f=f.replace(b,""),a.setAttributeNS(d[c].ns,s[d[c].ns]+d[c].localname,
f);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,l(d,b)),c=c.nextSibling}function e(a,b){var c=q[a.localName],d=(c=c&&c[a.namespaceURI])?c.length:0,e,f,g;for(g=0;g<d;g+=1)if(e=a.getAttributeNS(c[g].ns,c[g].localname))b=b||{},f=c[g].keyname,f=b[f]=b[f]||{},f[e]=1;return b}function c(a,b){var d,f;e(a,b);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(f=d,c(f,b)),d=d.nextSibling}function b(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function h(a,c,d){var e=a+'"'+
c,f=d[e];f||(f=d[e]=new b(e,a,c));return f}function a(b,c,e){var f=q[b.localName],g=(f=f&&f[b.namespaceURI])?f.length:0,k=b.getAttributeNS(d,"name"),n=b.getAttributeNS(d,"family"),t;k&&n&&(c=h(k,n,e));if(c)for(k=0;k<g;k+=1)if(n=b.getAttributeNS(f[k].ns,f[k].localname))t=f[k].keyname,n=h(n,t,e),c.requires[n.key]=n;for(k=b.firstChild;k;)k.nodeType===Node.ELEMENT_NODE&&(b=k,a(b,c,e)),k=k.nextSibling;return e}function n(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){n(a.requires[c],
b)})}function f(b,c){var d=a(b,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&n(a,c)})}var d="urn:oasis:names:tc:opendocument:xmlns:style:1.0",s={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:","urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},k={text:[{ens:d,
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
a:"page-layout-name"}]},q,g=new xmldom.XPath;this.UsedStyleList=function(a,b){var e={};this.uses=function(a){var b=a.localName,c=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(d,"name");a="style"===b?a.getAttributeNS(d,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":b;return(a=e[a])?0<a[c]:!1};c(a,e);b&&f(b,e)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),e=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,
"family");return g.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,c){var e;if(a){for(e=a.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE){var f=e,g=b,h=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),k=void 0;h?k="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(h=f.getAttributeNS(d,"name"))&&(k=d);k&&f.setAttributeNS(k,s[k]+"name",g+h)}e=e.nextSibling}m(a,b);c&&m(c,
b)}};this.removePrefixFromStyleNames=function(a,b,c){var e=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var f=b,g=e,h=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),k=void 0;h?k="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(h=f.getAttributeNS(d,"name"))&&(k=d);k&&(h=h.replace(g,""),f.setAttributeNS(k,s[k]+"name",h))}b=b.nextSibling}l(a,e);c&&l(c,e)}};this.determineStylesForNode=e;q=function(a){var b,c,d,e,f,g={},h;for(b in a)if(a.hasOwnProperty(b))for(e=
a[b],d=e.length,c=0;c<d;c+=1)f=e[c],h=g[f.en]=g[f.en]||{},h=h[f.ens]=h[f.ens]||[],h.push({ns:f.ans,localname:f.a,keyname:b});return g}(k)};
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
odf.OdfUtils=function(){function m(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===u}function l(a){for(;a&&!m(a);)a=a.parentNode;return a}function e(a){return/^[ \t\r\n]+$/.test(a)}function c(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===u||"span"===b&&"annotationHighlight"===a.className?!0:!1}function b(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===u?d="s"===b||"tab"===b||"line-break"===b:c===A&&(d="frame"===b&&"as-char"===a.getAttributeNS(u,
"anchor-type")));return d}function h(a){for(;null!==a.firstChild&&c(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&c(a);)a=a.lastChild;return a}function n(b){for(;!m(b)&&null===b.previousSibling;)b=b.parentNode;return m(b)?null:a(b.previousSibling)}function f(a){for(;!m(a)&&null===a.nextSibling;)a=a.parentNode;return m(a)?null:h(a.nextSibling)}function d(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=n(a);else return!e(a.data.substr(a.length-1,1));else b(a)?
(c=!0,a=null):a=n(a);return c}function s(a){var c=!1;for(a=a&&h(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!e(a.data)){c=!0;break}if(b(a)){c=!0;break}a=f(a)}return c}function k(a,b){return e(a.data.substr(b))?!s(f(a)):!1}function q(a,c){var f=a.data,g;if(!e(f[c])||b(a.parentNode))return!1;0<c?e(f[c-1])||(g=!0):d(n(a))&&(g=!0);return!0===g?k(a,c)?!1:!0:!1}function g(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function p(a){return(a=g(a))&&(0>a.value||"%"===a.unit)?null:a}function r(a){return(a=g(a))&&"%"!==a.unit?null:a}function w(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}
var u="urn:oasis:names:tc:opendocument:xmlns:text:1.0",A="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",x=/^\s*$/,v=new core.DomUtils;this.isParagraph=m;this.getParagraphElement=l;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===u&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===u};this.isODFWhitespace=e;this.isGroupingElement=c;this.isCharacterElement=b;this.firstChild=
h;this.lastChild=a;this.previousNode=n;this.nextNode=f;this.scanLeftForNonWhitespace=d;this.lookLeftForCharacter=function(a){var c;c=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(c=a.data,c=e(c.substr(c.length-1,1))?1===c.length?d(n(a))?2:0:e(c.substr(c.length-2,1))?0:2:1):b(a)&&(c=1);return c};this.lookRightForCharacter=function(a){var c=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?c=!e(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(c){var d=!1;for(c=c&&a(c);c;){if(c.nodeType===
Node.TEXT_NODE&&0<c.length&&!e(c.data)){d=!0;break}if(b(c)){d=!0;break}c=n(c)}return d};this.scanRightForAnyCharacter=s;this.isTrailingWhitespace=k;this.isSignificantWhitespace=q;this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&x.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=g;this.parseNonNegativeLength=p;this.parseFoFontSize=function(a){var b;b=(b=g(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||r(a)};this.parseFoLineHeight=function(a){return p(a)||
r(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,c=[];for(b.nodeType===Node.ELEMENT_NODE&&(c=v.getElementsByTagNameNS(b,u,"p").concat(v.getElementsByTagNameNS(b,u,"h")));b&&!m(b);)b=b.parentNode;b&&c.push(b);return c.filter(function(b){return v.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),d;d=v.getNodesInRange(a,function(d){c.selectNodeContents(d);if(d.nodeType===Node.TEXT_NODE){if(b&&v.rangesIntersect(a,
c)||v.containsRange(a,c))return Boolean(l(d)&&(!e(d.textContent)||q(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(v.rangesIntersect(a,c)&&w(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return d};this.getTextElements=function(a,d){var f=a.startContainer.ownerDocument.createRange(),g;g=v.getNodesInRange(a,function(g){var h=g.nodeType;f.selectNodeContents(g);if(h===Node.TEXT_NODE){if(v.containsRange(a,f)&&(d||Boolean(l(g)&&(!e(g.textContent)||q(g,0)))))return NodeFilter.FILTER_ACCEPT}else if(b(g)){if(v.containsRange(a,
f))return NodeFilter.FILTER_ACCEPT}else if(w(g)||c(g))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});f.detach();return g};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),d;d=v.getNodesInRange(a,function(d){b.selectNodeContents(d);if(m(d)){if(v.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(w(d)||c(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});b.detach();return d}};
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
odf.TextSerializer=function(){function m(c){var b="",h=l.filter?l.filter.acceptNode(c):NodeFilter.FILTER_ACCEPT,a=c.nodeType,n;if(h===NodeFilter.FILTER_ACCEPT||h===NodeFilter.FILTER_SKIP)for(n=c.firstChild;n;)b+=m(n),n=n.nextSibling;h===NodeFilter.FILTER_ACCEPT&&(a===Node.ELEMENT_NODE&&e.isParagraph(c)?b+="\n":a===Node.TEXT_NODE&&c.textContent&&(b+=c.textContent));return b}var l=this,e=new odf.OdfUtils;this.filter=null;this.writeToString=function(c){return c?m(c):""}};
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
odf.TextStyleApplicator=function(m,l,e){function c(a){function b(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(d){return b(a[d],c[d])}):a===c}this.isStyleApplied=function(c){c=l.getAppliedStylesForElement(c);return b(a,c)}}function b(b){var c={};this.applyStyleToContainer=function(h){var q;q=h.getAttributeNS(a,"style-name");var g=h.ownerDocument;q=q||"";if(!c.hasOwnProperty(q)){var p=q,r;r=q?l.createDerivedStyleObject(q,"text",b):b;g=g.createElementNS(n,"style:style");
l.updateStyle(g,r);g.setAttributeNS(n,"style:name",m.generateName());g.setAttributeNS(n,"style:family","text");g.setAttributeNS(f,"scope","document-content");e.appendChild(g);c[p]=g}q=c[q].getAttributeNS(n,"name");h.setAttributeNS(a,"text:style-name",q)}}var h=new core.DomUtils,a=odf.Namespaces.textns,n=odf.Namespaces.stylens,f="urn:webodf:names:scope";this.applyStyle=function(d,e,f){var n={},g,m,l,w;runtime.assert(f&&f["style:text-properties"],"applyStyle without any text properties");n["style:text-properties"]=
f["style:text-properties"];l=new b(n);w=new c(n);d.forEach(function(b){g=w.isStyleApplied(b);if(!1===g){var c=b.ownerDocument,d=b.parentNode,f,k=b,n=new core.LoopWatchDog(1E3);"span"===d.localName&&d.namespaceURI===a?(b.previousSibling&&!h.rangeContainsNode(e,b.previousSibling)?(c=d.cloneNode(!1),d.parentNode.insertBefore(c,d.nextSibling)):c=d,f=!0):(c=c.createElementNS(a,"text:span"),d.insertBefore(c,b),f=!1);for(;k&&(k===b||h.rangeContainsNode(e,k));)n.check(),d=k.nextSibling,k.parentNode!==c&&
c.appendChild(k),k=d;if(k&&f)for(b=c.cloneNode(!1),c.parentNode.insertBefore(b,c.nextSibling);k;)n.check(),d=k.nextSibling,b.appendChild(k),k=d;m=c;l.applyStyleToContainer(m)}})}};
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
odf.Style2CSS=function(){function m(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==p||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===u&&"list-style"===a.localName?"list":a.namespaceURI!==p||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(p,"family"))(c=a.getAttributeNS&&a.getAttributeNS(p,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function l(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=l(a[c].derivedStyles,b)))return d;return null}function e(a,b,c){var d=b[a],f,g;d&&(f=d.getAttributeNS(p,"parent-style-name"),g=null,f&&(g=l(c,f),!g&&b[f]&&(e(f,b,c),g=b[f],b[f]=null)),g?(g.derivedStyles||(g.derivedStyles={}),g.derivedStyles[a]=d):c[a]=d)}function c(a,b){for(var c in a)a.hasOwnProperty(c)&&(e(c,a,b),a[c]=null)}function b(a,b){var c=v[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+t[a].join(d+","+c+"|")+d}function h(a,c,d){var e=[],f,g;e.push(b(a,c));for(f in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(f))for(g in c=h(a,f,d.derivedStyles[f]),c)c.hasOwnProperty(g)&&e.push(c[g]);return e}function a(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function n(a,b){var c="",d,e;for(d in b)if(b.hasOwnProperty(d)&&
(d=b[d],e=a.getAttributeNS(d[0],d[1]))){e=e.trim();if(N.hasOwnProperty(d[1])){var f=e.indexOf(" "),g=void 0,h=void 0;-1!==f?(g=e.substring(0,f),h=e.substring(f)):(g=e,h="");(g=Y.parseLength(g))&&("pt"===g.unit&&0.75>g.value)&&(e="0.75pt"+h)}d[2]&&(c+=d[2]+":"+e+";")}return c}function f(b){return(b=a(b,p,"text-properties"))?Y.parseFoFontSize(b.getAttributeNS(g,"font-size")):null}function d(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?
{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function s(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var e=c.getAttributeNS(u,"level"),f;c=Y.getFirstNonWhitespaceChild(c);c=Y.getFirstNonWhitespaceChild(c);var g;c&&(f=c.attributes,g=f["fo:text-indent"]?f["fo:text-indent"].value:void 0,f=f["fo:margin-left"]?f["fo:margin-left"].value:void 0);g||(g="-0.6cm");c="-"===g.charAt(0)?g.substring(1):"-"+g;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";
void 0!==f&&(f=e+"{margin-left:"+f+";}",a.insertRule(f,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+d+";";d+="counter-increment:list;";d+="margin-left:"+g+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(h){throw h;}}function k(b,c,e,m){if("list"===c)for(var l=m.firstChild,r,t;l;){if(l.namespaceURI===u)if(r=l,"list-level-style-number"===l.localName){var v=r;t=v.getAttributeNS(p,"num-format");var N=v.getAttributeNS(p,
"num-suffix"),F={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},v=v.getAttributeNS(p,"num-prefix")||"",v=F.hasOwnProperty(t)?v+(" counter(list, "+F[t]+")"):t?v+("'"+t+"';"):v+" ''";N&&(v+=" '"+N+"'");t="content: "+v+";";s(b,e,r,t)}else"list-level-style-image"===l.localName?(t="content: none;",s(b,e,r,t)):"list-level-style-bullet"===l.localName&&(t="content: '"+r.getAttributeNS(u,"bullet-char")+"';",s(b,e,r,t));l=l.nextSibling}else if("page"===c)if(N=r=e="",l=m.getElementsByTagNameNS(p,
"page-layout-properties")[0],r=l.parentNode.parentNode.parentNode.masterStyles,N="",e+=n(l,X),t=l.getElementsByTagNameNS(p,"background-image"),0<t.length&&(N=t.item(0).getAttributeNS(A,"href"))&&(e+="background-image: url('odfkit:"+N+"');",t=t.item(0),e+=n(t,H)),"presentation"===ba){if(r)for(t=r.getElementsByTagNameNS(p,"master-page"),F=0;F<t.length;F+=1)if(t[F].getAttributeNS(p,"page-layout-name")===l.parentNode.getAttributeNS(p,"name")){N=t[F].getAttributeNS(p,"name");r="draw|page[draw|master-page-name="+
N+"] {"+e+"}";N="office|body, draw|page[draw|master-page-name="+N+"] {"+n(l,oa)+" }";try{b.insertRule(r,b.cssRules.length),b.insertRule(N,b.cssRules.length)}catch(ka){throw ka;}}}else{if("text"===ba){r="office|text {"+e+"}";N="office|body {width: "+l.getAttributeNS(g,"page-width")+";}";try{b.insertRule(r,b.cssRules.length),b.insertRule(N,b.cssRules.length)}catch(ha){throw ha;}}}else{e=h(c,e,m).join(",");l="";if(r=a(m,p,"text-properties")){var F=r,T;t=T="";N=1;r=""+n(F,E);v=F.getAttributeNS(p,"text-underline-style");
"solid"===v&&(T+=" underline");v=F.getAttributeNS(p,"text-line-through-style");"solid"===v&&(T+=" line-through");T.length&&(r+="text-decoration:"+T+";");if(T=F.getAttributeNS(p,"font-name")||F.getAttributeNS(g,"font-family"))v=sa[T],r+="font-family: "+(v||T)+", sans-serif;";v=F.parentNode;if(F=f(v)){for(;v;){if(F=f(v)){if("%"!==F.unit){t="font-size: "+F.value*N+F.unit+";";break}N*=F.value/100}F=v;T=v="";v=null;"default-style"===F.localName?v=null:(v=F.getAttributeNS(p,"parent-style-name"),T=F.getAttributeNS(p,
"family"),v=S.getODFElementsWithXPath(M,v?"//style:*[@style:name='"+v+"'][@style:family='"+T+"']":"//style:default-style[@style:family='"+T+"']",odf.Namespaces.resolvePrefix)[0])}t||(t="font-size: "+parseFloat(V)*N+J.getUnits(V)+";");r+=t}l+=r}if(r=a(m,p,"paragraph-properties"))t=r,r=""+n(t,y),N=t.getElementsByTagNameNS(p,"background-image"),0<N.length&&(F=N.item(0).getAttributeNS(A,"href"))&&(r+="background-image: url('odfkit:"+F+"');",N=N.item(0),r+=n(N,H)),(t=t.getAttributeNS(g,"line-height"))&&
"normal"!==t&&(t=Y.parseFoLineHeight(t),r="%"!==t.unit?r+("line-height: "+t.value+t.unit+";"):r+("line-height: "+t.value/100+";")),l+=r;if(r=a(m,p,"graphic-properties"))F=r,r=""+n(F,P),t=F.getAttributeNS(q,"opacity"),N=F.getAttributeNS(q,"fill"),F=F.getAttributeNS(q,"fill-color"),"solid"===N||"hatch"===N?F&&"none"!==F?(t=isNaN(parseFloat(t))?1:parseFloat(t)/100,(F=d(F))&&(r+="background-color: rgba("+F.r+","+F.g+","+F.b+","+t+");")):r+="background: none;":"none"===N&&(r+="background: none;"),l+=r;
if(r=a(m,p,"drawing-page-properties"))t=""+n(r,P),"true"===r.getAttributeNS(x,"background-visible")&&(t+="background: none;"),l+=t;if(r=a(m,p,"table-cell-properties"))r=""+n(r,B),l+=r;if(r=a(m,p,"table-row-properties"))r=""+n(r,G),l+=r;if(r=a(m,p,"table-column-properties"))r=""+n(r,R),l+=r;if(r=a(m,p,"table-properties"))t=r,r=""+n(t,L),t=t.getAttributeNS(w,"border-model"),"collapsing"===t?r+="border-collapse:collapse;":"separating"===t&&(r+="border-collapse:separate;"),l+=r;if(0!==l.length)try{b.insertRule(e+
"{"+l+"}",b.cssRules.length)}catch(ia){throw ia;}}for(var la in m.derivedStyles)m.derivedStyles.hasOwnProperty(la)&&k(b,c,la,m.derivedStyles[la])}var q=odf.Namespaces.drawns,g=odf.Namespaces.fons,p=odf.Namespaces.stylens,r=odf.Namespaces.svgns,w=odf.Namespaces.tablens,u=odf.Namespaces.textns,A=odf.Namespaces.xlinkns,x=odf.Namespaces.presentationns,v={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},t={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},E=[[g,"color","color"],[g,"background-color","background-color"],[g,"font-weight","font-weight"],[g,"font-style","font-style"]],H=[[p,"repeat",
"background-repeat"]],y=[[g,"background-color","background-color"],[g,"text-align","text-align"],[g,"text-indent","text-indent"],[g,"padding","padding"],[g,"padding-left","padding-left"],[g,"padding-right","padding-right"],[g,"padding-top","padding-top"],[g,"padding-bottom","padding-bottom"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"margin","margin"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],
[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"],[g,"border","border"]],P=[[g,"background-color","background-color"],[g,"min-height","min-height"],[q,"stroke","border"],[r,"stroke-color","border-color"],[r,"stroke-width","border-width"],[g,"border","border"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"]],B=[[g,"background-color","background-color"],[g,"border-left","border-left"],[g,"border-right",
"border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"border","border"]],R=[[p,"column-width","width"]],G=[[p,"row-height","height"],[g,"keep-together",null]],L=[[p,"width","width"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"]],X=[[g,"background-color","background-color"],[g,"padding","padding"],[g,"padding-left","padding-left"],[g,"padding-right","padding-right"],[g,"padding-top",
"padding-top"],[g,"padding-bottom","padding-bottom"],[g,"border","border"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"margin","margin"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"]],oa=[[g,"page-width","width"],[g,"page-height","height"]],N={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},sa={},Y=new odf.OdfUtils,ba,M,V,S=new xmldom.XPath,J=new core.CSSUnits;this.style2css=function(a,b,d,e,f){for(var g,h,n,l;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);g=null;e&&(g=e.ownerDocument,M=e.parentNode);f&&(g=f.ownerDocument,M=f.parentNode);if(g)for(l in odf.Namespaces.forEachPrefix(function(a,c){n="@namespace "+a+" url("+c+");";try{b.insertRule(n,b.cssRules.length)}catch(d){}}),sa=d,ba=a,V=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",a=m(e),e=m(f),f={},v)if(v.hasOwnProperty(l))for(h in d=f[l]={},c(a[l],d),c(e[l],d),d)d.hasOwnProperty(h)&&k(b,l,h,d[h])}};
// Input 33
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function m(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function l(a){var b,c=k.length;for(b=0;b<c;b+=1)if(a.namespaceURI===f&&a.localName===k[b])return b;return-1}function e(a,b){var c=new n.UsedStyleList(a,b),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var e=d.acceptNode(a);e===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&(e=c.uses(a)?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT);return e}}function c(a,b){var c=new e(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function b(a,b){if(b){var c=l(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=l(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}function h(a){this.OdfContainer=a}function a(a,
b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var n=new odf.StyleInfo,f="urn:oasis:names:tc:opendocument:xmlns:office:1.0",d="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
s="urn:webodf:names:scope",k="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),q=(new Date).getTime()+"_webodf_",g=new core.Base64;h.prototype=new function(){};h.prototype.constructor=h;h.namespaceURI=f;h.localName="document";a.prototype.load=function(){};a.prototype.getUrl=function(){return this.data?"data:;base64,"+g.toBase64(this.data):null};odf.OdfContainer=function r(g,k){function l(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?
l(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function x(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS(s,"scope",b),c=c.nextSibling}function v(a,b){var c=null,d,e,f;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(f=d.getAttributeNS(s,"scope"))&&f!==b&&c.removeChild(d),d=e;return c}function t(a){var b=I.rootElement.ownerDocument,c;if(a){l(a.documentElement);try{c=b.importNode(a.documentElement,
!0)}catch(d){}}return c}function E(a){I.state=a;if(I.onchange)I.onchange(I);if(I.onstatereadychange)I.onstatereadychange(I)}function H(a){Z=null;I.rootElement=a;a.fontFaceDecls=m(a,f,"font-face-decls");a.styles=m(a,f,"styles");a.automaticStyles=m(a,f,"automatic-styles");a.masterStyles=m(a,f,"master-styles");a.body=m(a,f,"body");a.meta=m(a,f,"meta")}function y(a){a=t(a);var c=I.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===f?(c.fontFaceDecls=m(a,f,"font-face-decls"),b(c,c.fontFaceDecls),
c.styles=m(a,f,"styles"),b(c,c.styles),c.automaticStyles=m(a,f,"automatic-styles"),x(c.automaticStyles,"document-styles"),b(c,c.automaticStyles),c.masterStyles=m(a,f,"master-styles"),b(c,c.masterStyles),n.prefixStyleNames(c.automaticStyles,q,c.masterStyles)):E(r.INVALID)}function P(a){a=t(a);var c,d,e;if(a&&"document-content"===a.localName&&a.namespaceURI===f){c=I.rootElement;d=m(a,f,"font-face-decls");if(c.fontFaceDecls&&d)for(e=d.firstChild;e;)c.fontFaceDecls.appendChild(e),e=d.firstChild;else d&&
(c.fontFaceDecls=d,b(c,d));d=m(a,f,"automatic-styles");x(d,"document-content");if(c.automaticStyles&&d)for(e=d.firstChild;e;)c.automaticStyles.appendChild(e),e=d.firstChild;else d&&(c.automaticStyles=d,b(c,d));c.body=m(a,f,"body");b(c,c.body)}else E(r.INVALID)}function B(a){a=t(a);var c;a&&("document-meta"===a.localName&&a.namespaceURI===f)&&(c=I.rootElement,c.meta=m(a,f,"meta"),b(c,c.meta))}function R(a){a=t(a);var c;a&&("document-settings"===a.localName&&a.namespaceURI===f)&&(c=I.rootElement,c.settings=
m(a,f,"settings"),b(c,c.settings))}function G(a){a=t(a);var b;if(a&&"manifest"===a.localName&&a.namespaceURI===d)for(b=I.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===d)&&(Q[a.getAttributeNS(d,"full-path")]=a.getAttributeNS(d,"media-type")),a=a.nextSibling}function L(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],K.loadAsDOM(c,function(b,c){d(c);b||I.state===r.INVALID||L(a)})):E(r.DONE)}function X(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function oa(){var a=new xmldom.LSSerializer,b=X("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(I.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function N(a,b){var c=document.createElementNS(d,"manifest:file-entry");c.setAttributeNS(d,"manifest:full-path",a);c.setAttributeNS(d,"manifest:media-type",b);return c}function sa(){var a=
runtime.parseXML('<manifest:manifest xmlns:manifest="'+d+'"></manifest:manifest>'),b=m(a,d,"manifest"),c=new xmldom.LSSerializer,e;for(e in Q)Q.hasOwnProperty(e)&&b.appendChild(N(e,Q[e]));c.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+c.writeToString(a,odf.Namespaces.namespaceMap)}function Y(){var a=new xmldom.LSSerializer,b=X("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(I.rootElement.settings,odf.Namespaces.namespaceMap);
return b+"</office:document-settings>"}function ba(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=v(I.rootElement.automaticStyles,"document-styles"),d=I.rootElement.masterStyles&&I.rootElement.masterStyles.cloneNode(!0),f=X("document-styles");n.removePrefixFromStyleNames(c,q,d);b.filter=new e(d,c);f+=b.writeToString(I.rootElement.fontFaceDecls,a);f+=b.writeToString(I.rootElement.styles,a);f+=b.writeToString(c,a);f+=b.writeToString(d,a);return f+"</office:document-styles>"}function M(){var a=
odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,d=v(I.rootElement.automaticStyles,"document-content"),e=X("document-content");b.filter=new c(I.rootElement.body,d);e+=b.writeToString(d,a);e+=b.writeToString(I.rootElement.body,a);return e+"</office:document-content>"}function V(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var d=t(c);d&&"document"===d.localName&&d.namespaceURI===f?(H(d),E(r.DONE)):E(r.INVALID)}})}function S(){function a(b,c){var e;c||(c=b);e=document.createElementNS(f,c);
d[b]=e;d.appendChild(e)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),d=I.rootElement,e=document.createElementNS(f,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");d.body.appendChild(e);E(r.DONE);return b}function J(){var a,b=new Date;a=runtime.byteArrayFromString(Y(),"utf8");
K.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(oa(),"utf8");K.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(ba(),"utf8");K.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(M(),"utf8");K.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(sa(),"utf8");K.save("META-INF/manifest.xml",a,!0,b)}function C(a,b){J();K.writeAs(a,function(a){b(a)})}var I=this,K,Q={},Z;this.onstatereadychange=k;this.rootElement=this.state=this.onchange=null;this.setRootElement=H;this.getContentElement=
function(){var a;Z||(a=I.rootElement.body,Z=a.getElementsByTagNameNS(f,"text")[0]||a.getElementsByTagNameNS(f,"presentation")[0]||a.getElementsByTagNameNS(f,"spreadsheet")[0]);return Z};this.getDocumentType=function(){var a=I.getContentElement();return a&&a.localName};this.getPart=function(b){return new a(b,Q[b],I,K)};this.getPartData=function(a,b){K.load(a,b)};this.createByteArray=function(a,b){J();K.createByteArray(a,b)};this.saveAs=C;this.save=function(a){C(g,a)};this.getUrl=function(){return g};
this.state=r.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(h);K=g?new core.Zip(g,function(a,b){K=b;a?V(g,function(b){a&&(K.error=a+"\n"+b,E(r.INVALID))}):L([["styles.xml",y],["content.xml",P],["meta.xml",B],["settings.xml",R],["META-INF/manifest.xml",G]])}):S()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=
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
odf.FontLoader=function(){function m(c,b,h,a,n){var f,d=0,l;for(l in c)if(c.hasOwnProperty(l)){if(d===h){f=l;break}d+=1}f?b.getPartData(c[f].href,function(d,l){if(d)runtime.log(d);else{var g="@font-face { font-family: '"+(c[f].family||f)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+e.convertUTF8ArrayToBase64(l)+') format("truetype"); }';try{a.insertRule(g,a.cssRules.length)}catch(p){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(p)+"\nRule: "+g)}}m(c,b,h+1,a,n)}):
n&&n()}var l=new xmldom.XPath,e=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(c,b){for(var e=c.rootElement.fontFaceDecls;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);if(e){var a={},n,f,d,s;if(e)for(e=l.getODFElementsWithXPath(e,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),n=0;n<e.length;n+=1)f=e[n],d=f.getAttributeNS(odf.Namespaces.stylens,"name"),s=f.getAttributeNS(odf.Namespaces.svgns,"font-family"),f=l.getODFElementsWithXPath(f,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<f.length&&(f=f[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),a[d]={href:f,family:s});m(a,c,0,b)}}};return odf.FontLoader}();
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
odf.StyleNameGenerator=function(m,l){var e={};this.generateName=function(){var c,b={},h=0;l.getAllStyleNames().forEach(function(a){b[a]=!0});do c=m+h,h+=1;while(e[c]||b[c]);e[c]=!0;return c}};
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
odf.Formatting=function(){function m(){for(var a=d.rootElement.fontFaceDecls,b={},c,e,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(c=a.getAttributeNS(q,"name"))&&((e=a.getAttributeNS(k,"font-family"))||a.getElementsByTagNameNS(k,"font-face-uri")[0])&&(b[c]=e),a=a.nextSibling;return b}function l(a){for(var b=d.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===q&&"default-style"===b.localName&&b.getAttributeNS(q,"family")===a)return b;b=b.nextSibling}return null}
function e(a,b,c){var e,f;c=c||[d.rootElement.automaticStyles,d.rootElement.styles];for(e=c.shift();e;){for(e=e.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&(f=e.getAttributeNS(q,"name"),e.namespaceURI===q&&"style"===e.localName&&e.getAttributeNS(q,"family")===b&&f===a||"list-style"===b&&e.namespaceURI===g&&"list-style"===e.localName&&f===a||"data"===b&&e.namespaceURI===p&&f===a))return e;e=e.nextSibling}e=c.shift()}return null}function c(a){for(var b,c={},d=a.firstChild;d;){if(d.nodeType===
Node.ELEMENT_NODE&&d.namespaceURI===q)for(c[d.nodeName]={},b=0;b<d.attributes.length;b+=1)c[d.nodeName][d.attributes[b].name]=d.attributes[b].value;d=d.nextSibling}for(b=0;b<a.attributes.length;b+=1)c[a.attributes[b].name]=a.attributes[b].value;return c}function b(a,c){Object.keys(c).forEach(function(d){var e=d.split(":"),f=e[1],g=odf.Namespaces.resolvePrefix(e[0]),e=c[d];"object"===typeof e&&Object.keys(e).length?(d=a.getElementsByTagNameNS(g,f)[0]||a.ownerDocument.createElementNS(g,d),a.appendChild(d),
b(d,e)):a.setAttributeNS(g,d,e)})}function h(a,b){for(var f=d.rootElement.styles,g,h={},k=a.getAttributeNS(q,"family"),n=a;n;)g=c(n),h=w.mergeObjects(g,h),n=(g=n.getAttributeNS(q,"parent-style-name"))?e(g,k,[f]):null;if(n=l(k))g=c(n),h=w.mergeObjects(g,h);b&&(g=(f=u[k])?w.mergeObjects({},f):null)&&(h=w.mergeObjects(g,h));return h}function a(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],f="",g=!1;c;)!g&&r.isGroupingElement(c)&&(g=!0),(d=s.determineStylesForNode(c))&&e.push(d),c=
c.parentNode;g&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){f+="|"+b+":"+a+"|"})})}),b&&(b[f]=e));return g?e:void 0}function n(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var d=Object.keys(a[c])[0],f,g;(f=e(d,c))?(g=h(f),b=w.mergeObjects(g,b),g=f.getAttributeNS(q,"display-name")):runtime.log("No style element found for '"+d+"' of family '"+c+"'");b.orderedStyles.push({name:d,family:c,displayName:g})})});return b}
var f=this,d,s=new odf.StyleInfo,k=odf.Namespaces.svgns,q=odf.Namespaces.stylens,g=odf.Namespaces.textns,p=odf.Namespaces.numberns,r=new odf.OdfUtils,w=new core.Utils,u={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.setOdfContainer=function(a){d=a};this.getFontMap=m;this.getAvailableParagraphStyles=function(){for(var a=d.rootElement.styles&&d.rootElement.styles.firstChild,b,c,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===q)&&(c=a,b=c.getAttributeNS(q,
"family"),"paragraph"===b&&(b=c.getAttributeNS(q,"name"),c=c.getAttributeNS(q,"display-name")||b,b&&c&&e.push({name:b,displayName:c}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var b;b=s.hasDerivedStyles(d.rootElement,odf.Namespaces.resolvePrefix,a);a=(new s.UsedStyleList(d.rootElement.styles)).uses(a)||(new s.UsedStyleList(d.rootElement.automaticStyles)).uses(a)||(new s.UsedStyleList(d.rootElement.body)).uses(a);return b||a};this.getDefaultStyleElement=l;this.getStyleElement=e;this.getStyleAttributes=
c;this.getInheritedStyleAttributes=h;this.getFirstNamedParentStyleNameOrSelf=function(a){var b=d.rootElement.automaticStyles,c=d.rootElement.styles,f;for(f=e(a,"paragraph",[b]);f;)a=f.getAttributeNS(q,"parent-style-name"),f=e(a,"paragraph",[b]);return(f=e(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(e(a,"paragraph"))};this.getAppliedStyles=function(b){var c={},d=[];b.forEach(function(b){a(b,c)});Object.keys(c).forEach(function(a){d.push(n(c[a]))});return d};this.getAppliedStylesForElement=
function(b){return(b=a(b))?n(b):void 0};this.applyStyle=function(a,b,c,e){(new odf.TextStyleApplicator(new odf.StyleNameGenerator("auto"+w.hashString(a)+"_",f),f,d.rootElement.automaticStyles)).applyStyle(b,c,e)};this.getAllStyleNames=function(){var a,b=[];[d.rootElement.automaticStyles,d.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===q&&"style"===a.localName||a.namespaceURI===g&&"list-style"===a.localName)&&b.push(a.getAttributeNS(q,
"name")),a=a.nextSibling});return b};this.updateStyle=function(a,c){var e,f;b(a,c);(e=c["style:text-properties"]&&c["style:text-properties"]["style:font-name"])&&!m().hasOwnProperty(e)&&(f=a.ownerDocument.createElementNS(q,"style:font-face"),f.setAttributeNS(q,"style:name",e),f.setAttributeNS(k,"svg:font-family",e),d.rootElement.fontFaceDecls.appendChild(f))};this.createDerivedStyleObject=function(a,b,f){var g=e(a,b);runtime.assert(Boolean(g),"No style element found for '"+a+"' of family '"+b+"'");
a=g.parentNode===d.rootElement.automaticStyles?c(g):{"style:parent-style-name":a};a["style:family"]=b;w.mergeObjects(a,f);return a};this.getDefaultTabStopDistance=function(){var a=l("paragraph");(a=(a=a&&a.getAttributeNS(q,"paragraph-properties"))&&a.getAttributeNS(q,"tab-stop-distance"))||(a="1.25cm");return r.parseNonNegativeLength(a)}};
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
odf.OdfCanvas=function(){function m(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(e)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function l(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function e(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function c(a,b,c){var d=
"on"+b;a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent(d,c):a[d]===c&&(a[d]=null)}function b(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}function d(){var c=[],e=runtime.getWindow().getSelection(),h,k;for(h=0;h<e.rangeCount;h+=1)k=e.getRangeAt(h),null!==k&&(b(a,k.startContainer)&&b(a,k.endContainer))&&c.push(k);if(c.length===f.length){for(e=0;e<c.length&&(h=c[e],k=f[e],h=h===k?!1:null===h||null===k?!0:h.startContainer!==k.startContainer||h.startOffset!==
k.startOffset||h.endContainer!==k.endContainer||h.endOffset!==k.endOffset,!h);e+=1);if(e===c.length)return}f=c;var e=[c.length],n,l=a.ownerDocument;for(h=0;h<c.length;h+=1)k=c[h],n=l.createRange(),n.setStart(k.startContainer,k.startOffset),n.setEnd(k.endContainer,k.endOffset),e[h]=n;f=e;e=g.length;for(c=0;c<e;c+=1)g[c](a,f)}var f=[],g=[];this.addListener=function(a,b){var c,d=g.length;for(c=0;c<d;c+=1)if(g[c]===b)return;g.push(b)};this.destroy=function(b){c(a,"mouseup",d);c(a,"keyup",d);c(a,"keydown",
d);b()};e(a,"mouseup",d);e(a,"keyup",d);e(a,"keydown",d)}function h(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function a(b,c,d,e){d.setAttribute("styleid",c);var f,g=d.getAttributeNS(t,"anchor-type"),h=d.getAttributeNS(x,"x"),k=d.getAttributeNS(x,"y"),n=d.getAttributeNS(x,"width"),l=d.getAttributeNS(x,"height"),m=d.getAttributeNS(w,"min-height"),p=d.getAttributeNS(w,"min-width"),q=d.getAttributeNS(r,"master-page-name"),
s=null,u,v;u=0;var E,H=b.rootElement.ownerDocument;if(q){s=b.rootElement.masterStyles.getElementsByTagNameNS(A,"master-page");u=null;for(v=0;v<s.length;v+=1)if(s[v].getAttributeNS(A,"name")===q){u=s[v];break}s=u}else s=null;if(s){q=H.createElementNS(r,"draw:page");E=s.firstElementChild;for(u=0;E;)"true"!==E.getAttributeNS(y,"placeholder")&&(v=E.cloneNode(!0),q.appendChild(v),a(b,c+"_"+u,v,e)),E=E.nextElementSibling,u+=1;L.appendChild(q);u=L.getElementsByTagNameNS(r,"page").length;if(v=q.getElementsByTagNameNS(t,
"page-number")[0]){for(;v.firstChild;)v.removeChild(v.firstChild);v.appendChild(H.createTextNode(u))}a(b,c,q,e);q.setAttributeNS(r,"draw:master-page-name",s.getAttributeNS(A,"name"))}if("as-char"===g)f="display: inline-block;";else if(g||h||k)f="position: absolute;";else if(n||l||m||p)f="display: block;";h&&(f+="left: "+h+";");k&&(f+="top: "+k+";");n&&(f+="width: "+n+";");l&&(f+="height: "+l+";");m&&(f+="min-height: "+m+";");p&&(f+="min-width: "+p+";");f&&(f="draw|"+d.localName+'[styleid="'+c+'"] {'+
f+"}",e.insertRule(f,e.cssRules.length))}function n(a){for(a=a.firstChild;a;){if(a.namespaceURI===u&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function f(a,b,c,d){function e(b){b&&(b='draw|image[styleid="'+a+'"] {'+("background-image: url("+b+");")+"}",d.insertRule(b,d.cssRules.length))}c.setAttribute("styleid",a);var f=c.getAttributeNS(E,"href"),g;if(f)try{g=b.getPart(f),g.onchange=function(a){e(a.url)},g.load()}catch(h){runtime.log("slight problem: "+
h)}else f=n(c),e(f)}function d(a){function b(c){var d,e;c.hasAttributeNS(E,"href")&&(d=c.getAttributeNS(E,"href"),"#"===d[0]?(d=d.substring(1),e=function(){var b=B.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=B.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);return!1}):e=function(){P.open(d)},c.onclick=e)}var c,d,e;d=a.getElementsByTagNameNS(t,
"a");for(c=0;c<d.length;c+=1)e=d.item(c),b(e)}function s(a){var b=a.ownerDocument;G.getElementsByTagNameNS(a,t,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(t,"c"),10);if(1<d)for(a.removeAttributeNS(t,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function k(a){G.getElementsByTagNameNS(a,t,"tab").forEach(function(a){a.textContent="\t"})}function q(a,b){function c(a,f){var h=g.documentElement.namespaceURI;
"video/"===f.substr(0,6)?(d=g.createElementNS(h,"video"),d.setAttribute("controls","controls"),e=g.createElementNS(h,"source"),e.setAttribute("src",a),e.setAttribute("type",f),d.appendChild(e),b.parentNode.appendChild(d)):b.innerHtml="Unrecognised Plugin"}var d,e,f,g=b.ownerDocument,h;if(f=b.getAttributeNS(E,"href"))try{h=a.getPart(f),h.onchange=function(a){c(a.url,a.mimetype)},h.load()}catch(k){runtime.log("slight problem: "+k)}else runtime.log("using MP4 data fallback"),f=n(b),c(f,"video/mp4")}
function g(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function p(a){var b=
a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var r=odf.Namespaces.drawns,w=odf.Namespaces.fons,u=odf.Namespaces.officens,A=odf.Namespaces.stylens,x=odf.Namespaces.svgns,v=odf.Namespaces.tablens,t=odf.Namespaces.textns,E=odf.Namespaces.xlinkns,
H=odf.Namespaces.xmlns,y=odf.Namespaces.presentationns,P=runtime.getWindow(),B=new xmldom.XPath,R=new odf.OdfUtils,G=new core.DomUtils,L;odf.OdfCanvas=function(c){function n(a,b,c){function d(a,b,c,e){ja.addToQueue(function(){f(a,b,c,e)})}var e,g;e=b.getElementsByTagNameNS(r,"image");for(b=0;b<e.length;b+=1)g=e.item(b),d("image"+String(b),a,g,c)}function w(a,b){function c(a,b){ja.addToQueue(function(){q(a,b)})}var d,e,f;e=b.getElementsByTagNameNS(r,"plugin");for(d=0;d<e.length;d+=1)f=e.item(d),c(a,
f)}function x(){O.firstChild&&(1<U?(O.style.MozTransformOrigin="center top",O.style.WebkitTransformOrigin="center top",O.style.OTransformOrigin="center top",O.style.msTransformOrigin="center top"):(O.style.MozTransformOrigin="left top",O.style.WebkitTransformOrigin="left top",O.style.OTransformOrigin="left top",O.style.msTransformOrigin="left top"),O.style.WebkitTransform="scale("+U+")",O.style.MozTransform="scale("+U+")",O.style.OTransform="scale("+U+")",O.style.msTransform="scale("+U+")",c.style.width=
Math.round(U*O.offsetWidth)+"px",c.style.height=Math.round(U*O.offsetHeight)+"px")}function y(a){function b(a){return d===a.getAttributeNS(u,"name")}var c=G.getElementsByTagNameNS(a,u,"annotation");a=G.getElementsByTagNameNS(a,u,"annotation-end");var d,e;for(e=0;e<c.length;e+=1)d=c[e].getAttributeNS(u,"name"),F.addAnnotation({node:c[e],end:a.filter(b)[0]||null});F.rerenderAnnotations()}function E(a){fa?($.parentNode||(O.appendChild($),x()),F&&F.forgetAnnotations(),F=new gui.AnnotationViewManager(C,
a.body,$),y(a.body)):$.parentNode&&(O.removeChild($),F.forgetAnnotations(),x())}function M(b){function e(){for(var f=c;f.firstChild;)f.removeChild(f.firstChild);c.style.display="inline-block";f=K.rootElement;c.ownerDocument.importNode(f,!0);Q.setOdfContainer(K);var g=K,l=ha;(new odf.FontLoader).loadFonts(g,l.sheet);h(K,Q,T);for(var l=K,g=ia.sheet,m=c;m.firstChild;)m.removeChild(m.firstChild);O=I.createElementNS(c.namespaceURI,"div");O.style.display="inline-block";O.style.background="white";O.appendChild(f);
c.appendChild(O);$=I.createElementNS(c.namespaceURI,"div");$.id="annotationsPane";L=I.createElementNS(c.namespaceURI,"div");L.id="shadowContent";L.style.position="absolute";L.style.top=0;L.style.left=0;l.getContentElement().appendChild(L);var m=f.body,p,q,u;q=[];for(p=m.firstChild;p&&p!==m;)if(p.namespaceURI===r&&(q[q.length]=p),p.firstChild)p=p.firstChild;else{for(;p&&p!==m&&!p.nextSibling;)p=p.parentNode;p&&p.nextSibling&&(p=p.nextSibling)}for(u=0;u<q.length;u+=1)p=q[u],a(l,"frame"+String(u),p,
g);q=B.getODFElementsWithXPath(m,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(p=0;p<q.length;p+=1)m=q[p],m.setAttributeNS&&m.setAttributeNS("urn:webodf","containsparagraphanchor",!0);p=f.body.getElementsByTagNameNS(v,"table-cell");for(m=0;m<p.length;m+=1)q=p.item(m),q.hasAttributeNS(v,"number-columns-spanned")&&q.setAttribute("colspan",q.getAttributeNS(v,"number-columns-spanned")),q.hasAttributeNS(v,"number-rows-spanned")&&q.setAttribute("rowspan",q.getAttributeNS(v,
"number-rows-spanned"));d(f.body);s(f.body);k(f.body);n(l,f.body,g);w(l,f.body);q=f.body;var y,G,F,D,m={};p={};var C;u=P.document.getElementsByTagNameNS(t,"list-style");for(l=0;l<u.length;l+=1)y=u.item(l),(F=y.getAttributeNS(A,"name"))&&(p[F]=y);q=q.getElementsByTagNameNS(t,"list");for(l=0;l<q.length;l+=1)if(y=q.item(l),u=y.getAttributeNS(H,"id")){G=y.getAttributeNS(t,"continue-list");y.setAttribute("id",u);D="text|list#"+u+" > text|list-item > *:first-child:before {";if(F=y.getAttributeNS(t,"style-name")){y=
p[F];C=R.getFirstNonWhitespaceChild(y);y=void 0;if(C)if("list-level-style-number"===C.localName){y=C.getAttributeNS(A,"num-format");F=C.getAttributeNS(A,"num-suffix");var M="",M={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},J=void 0,J=C.getAttributeNS(A,"num-prefix")||"",J=M.hasOwnProperty(y)?J+(" counter(list, "+M[y]+")"):y?J+("'"+y+"';"):J+" ''";F&&(J+=" '"+F+"'");y=M="content: "+J+";"}else"list-level-style-image"===C.localName?y="content: none;":"list-level-style-bullet"===
C.localName&&(y="content: '"+C.getAttributeNS(t,"bullet-char")+"';");C=y}if(G){for(y=m[G];y;)G=y,y=m[G];D+="counter-increment:"+G+";";C?(C=C.replace("list",G),D+=C):D+="content:counter("+G+");"}else G="",C?(C=C.replace("list",u),D+=C):D+="content: counter("+u+");",D+="counter-increment:"+u+";",g.insertRule("text|list#"+u+" {counter-reset:"+u+"}",g.cssRules.length);D+="}";m[u]=G;D&&g.insertRule(D,g.cssRules.length)}O.insertBefore(L,O.firstChild);x();E(f);if(!b&&(f=[K],ma.hasOwnProperty("statereadychange")))for(g=
ma.statereadychange,C=0;C<g.length;C+=1)g[C].apply(null,f)}K.state===odf.OdfContainer.DONE?e():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function pa(){K.state===odf.OdfContainer.DONE?e():(runtime.log("will be back later..."),runtime.setTimeout(pa,500))},100))}function V(a){ja.clearQueue();c.innerHTML="loading "+a;c.removeAttribute("style");K=new odf.OdfContainer(a,function(a){K=a;M(!1)})}function S(){if(W){for(var a=W.ownerDocument.createDocumentFragment();W.firstChild;)a.insertBefore(W.firstChild,
null);W.parentNode.replaceChild(a,W)}}function J(a){a=a||P.event;for(var b=a.target,c=P.getSelection(),d=0<c.rangeCount?c.getRangeAt(0):null,e=d&&d.startContainer,f=d&&d.startOffset,g=d&&d.endContainer,h=d&&d.endOffset,k,n;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==t);)b=b.parentNode;la&&(b&&b.parentNode!==W)&&(k=b.ownerDocument,n=k.documentElement.namespaceURI,W?W.parentNode&&S():(W=k.createElementNS(n,"p"),W.style.margin="0px",W.style.padding="0px",W.style.border="0px",W.setAttribute("contenteditable",
!0)),b.parentNode.replaceChild(W,b),W.appendChild(b),W.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),d.setStart(e,f),d.setEnd(g,h),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==c&&void 0!==c,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==c.ownerDocument&&void 0!==c.ownerDocument,"odf.OdfCanvas constructor needs DOM");var C=this,I=c.ownerDocument,K,Q=new odf.Formatting,Z=new b(c),
da,O,$,fa=!1,F,ka,ha,T,ia,la=!1,U=1,ma={},W,ja=new m;this.refreshCSS=function(){h(K,Q,T);x()};this.refreshSize=function(){x()};this.odfContainer=function(){return K};this.slidevisibilitycss=function(){return da.css};this.setOdfContainer=function(a,b){K=a;M(!0===b)};this.load=this.load=V;this.save=function(a){S();K.save(a)};this.setEditable=function(a){e(c,"click",J);(la=a)||S()};this.addListener=function(a,b){switch(a){case "selectionchange":Z.addListener(a,b);break;case "click":e(c,a,b);break;default:var d=
ma[a];void 0===d&&(d=ma[a]=[]);b&&-1===d.indexOf(b)&&d.push(b)}};this.getFormatting=function(){return Q};this.getAnnotationManager=function(){return F};this.refreshAnnotations=function(){E(K.rootElement)};this.rerenderAnnotations=function(){F&&F.rerenderAnnotations()};this.getSizer=function(){return O};this.enableAnnotations=function(a){a!==fa&&(fa=a,K&&E(K.rootElement))};this.addAnnotation=function(a){F&&F.addAnnotation(a)};this.forgetAnnotations=function(){F&&F.forgetAnnotations()};this.setZoomLevel=
function(a){U=a;x()};this.getZoomLevel=function(){return U};this.fitToContainingElement=function(a,b){var d=c.offsetHeight/U;U=a/(c.offsetWidth/U);b/d<U&&(U=b/d);x()};this.fitToWidth=function(a){U=a/(c.offsetWidth/U);x()};this.fitSmart=function(a,b){var d,e;d=c.offsetWidth/U;e=c.offsetHeight/U;d=a/d;void 0!==b&&b/e<d&&(d=b/e);U=Math.min(1,d);x()};this.fitToHeight=function(a){U=a/(c.offsetHeight/U);x()};this.showFirstPage=function(){da.showFirstPage()};this.showNextPage=function(){da.showNextPage()};
this.showPreviousPage=function(){da.showPreviousPage()};this.showPage=function(a){da.showPage(a);x()};this.getElement=function(){return c};this.destroy=function(a){var b=I.getElementsByTagName("head")[0];$.parentNode&&$.parentNode.removeChild($);c.removeChild(O);b.removeChild(ka);b.removeChild(ha);b.removeChild(T);b.removeChild(ia);Z.destroy(function(b){b?a(b):da.destroy(a)})};ka=g(I);da=new l(p(I));ha=p(I);T=p(I);ia=p(I)};return odf.OdfCanvas}();
// Input 38
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(m,l,e){return new odf.OdfContainer(m,function(c){if(c.state===odf.OdfContainer.INVALID)return e("Document "+m+" is invalid.");c.state===odf.OdfContainer.DONE?c.saveAs(l,function(b){e(b)}):e("Document was not completely loaded.")})};this.render=function(m,l,e){for(l=l.getElementsByTagName("body")[0];l.firstChild;)l.removeChild(l.firstChild);l=new odf.OdfCanvas(l);l.addListener("statereadychange",function(c){e(c)});l.load(m)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(m,l){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(m,l,e,c){};ops.Server.prototype.joinSession=function(m,l,e,c){};ops.Server.prototype.leaveSession=function(m,l,e,c){};ops.Server.prototype.getGenesisUrl=function(m){};
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
ops.Operation=function(){};ops.Operation.prototype.init=function(m){};ops.Operation.prototype.transform=function(m,l){};ops.Operation.prototype.execute=function(m){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var m=this,l,e;this.init=function(c){l=c.memberid;e=c.timestamp};this.transform=function(c,b){return[m]};this.execute=function(c){var b=c.getCursor(l);if(b)return!1;b=new ops.OdtCursor(l,c);c.addCursor(b);c.emit(ops.OdtDocument.signalCursorAdded,b);return!0};this.spec=function(){return{optype:"AddCursor",memberid:l,timestamp:e}}};
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
gui.StyleHelper=function(m){function l(a,c,e){var d=!0,h;a.collapsed?(h=a.startContainer,h.hasChildNodes()&&a.startOffset<h.childNodes.length&&(h=h.childNodes[a.startOffset]),a=[h]):a=b.getTextNodes(a,!0);a=m.getAppliedStyles(a);for(h=0;h<a.length&&!(d=a[h]["style:text-properties"],d=!d||d[c]!==e);h+=1);return!d}function e(a,c,e){a=b.getParagraphElements(a);for(var d={},l=!1,k,q;0<a.length;){(k=a[0].getAttributeNS(h,"style-name"))?d[k]||(q=m.getStyleElement(k,"paragraph"),d[k]=!0):l?q=void 0:(l=!0,
q=m.getDefaultStyleElement("paragraph"));if(q&&(k=m.getInheritedStyleAttributes(q,!0),(k=k["style:paragraph-properties"])&&-1===e.indexOf(k[c])))return!1;a.pop()}return!0}var c=new core.DomUtils,b=new odf.OdfUtils,h=odf.Namespaces.textns;this.getAppliedStyles=function(a){a=b.getTextNodes(a,!0);return m.getAppliedStyles(a)};this.applyStyle=function(a,e,f){var d=c.splitBoundaries(e),h=b.getTextNodes(e,!1);m.applyStyle(a,h,{startContainer:e.startContainer,startOffset:e.startOffset,endContainer:e.endContainer,
endOffset:e.endOffset},f);d.forEach(c.normalizeTextNodes)};this.isBold=function(a){return l(a,"fo:font-weight","bold")};this.isItalic=function(a){return l(a,"fo:font-style","italic")};this.hasUnderline=function(a){return l(a,"style:text-underline-style","solid")};this.hasStrikeThrough=function(a){return l(a,"style:text-line-through-style","solid")};this.isAlignedLeft=function(a){return e(a,"fo:text-align",["left","start"])};this.isAlignedCenter=function(a){return e(a,"fo:text-align",["center"])};
this.isAlignedRight=function(a){return e(a,"fo:text-align",["right","end"])};this.isAlignedJustified=function(a){return e(a,"fo:text-align",["justify"])}};
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
ops.OpApplyDirectStyling=function(){function m(a){var e=0<=b?c+b:c,d=a.getIteratorAtPosition(0<=b?c:c+b),e=b?a.getIteratorAtPosition(e):d;a=a.getDOM().createRange();a.setStart(d.container(),d.unfilteredDomOffset());a.setEnd(e.container(),e.unfilteredDomOffset());return a}var l,e,c,b,h,a=new odf.OdfUtils;this.init=function(a){l=a.memberid;e=a.timestamp;c=parseInt(a.position,10);b=parseInt(a.length,10);h=a.setProperties};this.transform=function(a,b){return null};this.execute=function(b){var c=m(b),
d=a.getImpactedParagraphs(c);(new gui.StyleHelper(b.getFormatting())).applyStyle(l,c,h);c.detach();b.getOdfCanvas().refreshCSS();d.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:l,timeStamp:e})});b.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:l,timestamp:e,position:c,length:b,setProperties:h}}};
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
ops.OpRemoveCursor=function(){var m=this,l,e;this.init=function(c){l=c.memberid;e=c.timestamp};this.transform=function(c,b){var e=c.spec(),a=[m];"RemoveCursor"===e.optype&&e.memberid===l&&(a=[]);return a};this.execute=function(c){return c.removeCursor(l)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:l,timestamp:e}}};
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
ops.OpMoveCursor=function(){var m=this,l,e,c,b;this.init=function(h){l=h.memberid;e=h.timestamp;c=parseInt(h.position,10);b=void 0!==h.length?parseInt(h.length,10):0};this.merge=function(h){return"MoveCursor"===h.optype&&h.memberid===l?(c=h.position,b=h.length,e=h.timestamp,!0):!1};this.transform=function(e,a){var n=e.spec(),f=c+b,d,s=[m];switch(n.optype){case "RemoveText":d=n.position+n.length;d<=c?c-=n.length:n.position<f&&(c<n.position?b=d<f?b-n.length:n.position-c:(c=n.position,b=d<f?f-d:0));
break;case "SplitParagraph":n.position<c?c+=1:n.position<=f&&(b+=1);break;case "AddAnnotation":n.position<c?c+=1:n.position<f&&(b+=1);break;case "InsertText":n.position<c?c+=n.text.length:n.position<=f&&(b+=n.text.length);break;case "RemoveCursor":n.memberid===l&&(s=[]);break;case "InsertTable":s=null}return s};this.execute=function(e){var a=e.getCursor(l),n=e.getCursorPosition(l),f=e.getPositionFilter(),d=c-n;if(!a)return!1;n=a.getStepCounter();d=0<d?n.countForwardSteps(d,f):0>d?-n.countBackwardSteps(-d,
f):0;a.move(d);b&&(f=0<b?n.countForwardSteps(b,f):0>b?-n.countBackwardSteps(-b,f):0,a.move(f,!0));e.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:l,timestamp:e,position:c,length:b}}};
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
ops.OpInsertTable=function(){function m(a,c){var d;if(1===s.length)d=s[0];else if(3===s.length)switch(a){case 0:d=s[0];break;case b-1:d=s[2];break;default:d=s[1]}else d=s[a];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case h-1:return d[2];default:return d[1]}return d[c]}var l=this,e,c,b,h,a,n,f,d,s;this.init=function(k){e=k.memberid;c=k.timestamp;a=parseInt(k.position,10);b=parseInt(k.initialRows,10);h=parseInt(k.initialColumns,10);n=k.tableName;f=k.tableStyleName;d=k.tableColumnStyleName;
s=k.tableCellStyleMatrix};this.transform=function(b,c){var d=b.spec(),e=[l];switch(d.optype){case "InsertTable":e=null;break;case "AddAnnotation":d.position<a&&(a+=1);break;case "SplitParagraph":d.position<a?a+=1:d.position!==a||c||(a+=1,e=null);break;case "InsertText":d.position<a?a+=d.text.length:d.position!==a||c||(a+=d.text.length,e=null);break;case "RemoveText":d.position+d.length<=a?a-=d.length:d.position<a&&(a=d.position)}return e};this.execute=function(k){var l=k.getPositionInTextNode(a),
g=k.getRootNode();if(l){var p=k.getDOM(),r=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),s=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),u,A,x,v;f&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",f);n&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",n);s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",
h);d&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);r.appendChild(s);for(x=0;x<b;x+=1){s=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(v=0;v<h;v+=1)u=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(A=m(x,v))&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",A),A=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),
u.appendChild(A),s.appendChild(u);r.appendChild(s)}l=k.getParagraphElement(l.textNode);g.insertBefore(r,l?l.nextSibling:void 0);k.getOdfCanvas().refreshSize();k.emit(ops.OdtDocument.signalTableAdded,{tableElement:r,memberId:e,timeStamp:c});k.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:e,timestamp:c,position:a,initialRows:b,initialColumns:h,tableName:n,tableStyleName:f,tableColumnStyleName:d,tableCellStyleMatrix:s}}};
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
ops.OpInsertText=function(){function m(a,b){var c=b.parentNode,d=b.nextSibling,e=[];a.getCursors().forEach(function(a){var c=a.getSelectedRange();!c||c.startContainer!==b&&c.endContainer!==b||e.push({cursor:a,startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset})});c.removeChild(b);c.insertBefore(b,d);e.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var l=
this,e,c,b,h;this.init=function(a){e=a.memberid;c=a.timestamp;b=parseInt(a.position,10);h=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===e&&a.position===b+h.length?(h+=a.text,c=a.timestamp,!0):!1};this.transform=function(a,c){var e=a.spec(),d=[l];switch(e.optype){case "InsertText":e.position<b?b+=e.text.length:e.position!==b||c||(b+=e.text.length,d=null);break;case "AddAnnotation":e.position<b&&(b+=1);break;case "SplitParagraph":e.position<b?b+=1:e.position!==b||c||(b+=
1,d=null);break;case "InsertTable":d=null;break;case "RemoveText":e.position+e.length<=b?b-=e.length:e.position<b&&(b=e.position)}return d};this.execute=function(a){var n,f,d,l,k=a.getDOM(),q,g=!0,p=0,r;if(n=a.getPositionInTextNode(b,e)){f=n.textNode;d=f.parentNode;l=f.nextSibling;q=a.getParagraphElement(f);n.offset!==f.length&&(l=f.splitText(n.offset));for(n=0;n<h.length;n+=1)if(" "===h[n]||"\t"===h[n])p<n&&(p=h.substring(p,n),g?f.appendData(p):d.insertBefore(k.createTextNode(p),l)),p=n+1,g=!1,r=
" "===h[n]?"text:s":"text:tab",r=k.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",r),r.appendChild(k.createTextNode(h[n])),d.insertBefore(r,l);p=h.substring(p);0<p.length&&(g?f.appendData(p):d.insertBefore(k.createTextNode(p),l));m(a,f);0===f.length&&f.parentNode.removeChild(f);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:q,memberId:e,timeStamp:c});a.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",
memberid:e,timestamp:c,position:b,text:h}}};
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
ops.OpRemoveText=function(){function m(a){function b(a){if(n.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function c(e){e=f.mergeIntoParent(e);return!n.isParagraph(e)&&e!==a&&b(e)?c(e):e}this.isEmpty=b;this.mergeChildrenIntoParent=c}function l(b){var c=b.getPositionFilter(),e,n,g,l,m=a,w=b.getDOM().createRange();b=b.getIteratorAtPosition(h);e=b.container();for(n=b.unfilteredDomOffset();m&&
b.nextPosition();)g=b.container(),l=b.unfilteredDomOffset(),c.acceptPosition(b)===NodeFilter.FILTER_ACCEPT&&(m-=1);w.setStart(e,n);w.setEnd(g,l);f.splitBoundaries(w);return w}var e=this,c,b,h,a,n,f;this.init=function(d){runtime.assert(0<=d.length,"OpRemoveText only supports positive lengths");c=d.memberid;b=d.timestamp;h=parseInt(d.position,10);a=parseInt(d.length,10);n=new odf.OdfUtils;f=new core.DomUtils};this.transform=function(d,f){var k=d.spec(),n=h+a,g,l=[e];switch(k.optype){case "RemoveText":g=
k.position+k.length;g<=h?h-=k.length:k.position<n&&(h<k.position?a=g<n?a-k.length:k.position-h:g<n?(h=k.position,a=n-g):l=[]);break;case "InsertText":k.position<=h?h+=k.text.length:k.position<n&&(a=k.position-h,g=new ops.OpRemoveText,g.init({memberid:c,timestamp:b,position:k.position+k.text.length,length:n-k.position}),l=[g,e]);break;case "SplitParagraph":k.position<=h?h+=1:k.position<n&&(a=k.position-h,g=new ops.OpRemoveText,g.init({memberid:c,timestamp:b,position:k.position+1,length:n-k.position}),
l=[g,e]);break;case "InsertTable":l=null;break;case "AddAnnotation":case "RemoveAnnotation":l=null;break;case "ApplyDirectStyling":l=null}return l};this.execute=function(d){var e,f,n,g,p=new m(d.getRootNode());d.upgradeWhitespacesAtPosition(h);d.upgradeWhitespacesAtPosition(h+a);f=l(d);e=d.getParagraphElement(f.startContainer);n=d.getTextElements(f,!0);g=d.getParagraphElements(f);f.detach();n.forEach(function(a){p.mergeChildrenIntoParent(a)});f=g.reduce(function(a,b){var c,d,e=a,f=b,g,h;p.isEmpty(a)&&
(d=!0,b.parentNode!==a.parentNode&&(g=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),f=a,e=b,h=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;f.hasChildNodes();)c=d?f.lastChild:f.firstChild,f.removeChild(c),"editinfo"!==c.localName&&e.insertBefore(c,h);g&&p.isEmpty(g)&&p.mergeChildrenIntoParent(g);p.mergeChildrenIntoParent(f);return e});d.fixCursorPositions();d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f||
e,memberId:c,timeStamp:b});d.emit(ops.OdtDocument.signalCursorMoved,d.getCursor(c));d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:c,timestamp:b,position:h,length:a}}};
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
ops.OpSplitParagraph=function(){var m=this,l,e,c,b=new odf.OdfUtils;this.init=function(b){l=b.memberid;e=b.timestamp;c=parseInt(b.position,10)};this.transform=function(b,a){var e=b.spec(),f=[m];switch(e.optype){case "SplitParagraph":e.position<c?c+=1:e.position!==c||a||(c+=1,f=null);break;case "AddAnnotation":e.position<c&&(c+=1);break;case "InsertText":e.position<c?c+=e.text.length:e.position!==c||a||(c+=e.text.length,f=null);break;case "InsertTable":f=null;break;case "RemoveText":e.position+e.length<=
c?c-=e.length:e.position<c&&(c=e.position)}return f};this.execute=function(h){var a,n,f,d,m,k;h.upgradeWhitespacesAtPosition(c);a=h.getPositionInTextNode(c,l);if(!a)return!1;n=h.getParagraphElement(a.textNode);if(!n)return!1;f=b.isListItem(n.parentNode)?n.parentNode:n;0===a.offset?(k=a.textNode.previousSibling,m=null):(k=a.textNode,m=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==f;)if(a=a.parentNode,d=a.cloneNode(!1),k){for(m&&d.appendChild(m);k.nextSibling;)d.appendChild(k.nextSibling);
a.parentNode.insertBefore(d,a.nextSibling);k=a;m=d}else a.parentNode.insertBefore(d,a),k=d,m=a;b.isListItem(m)&&(m=m.childNodes[0]);h.fixCursorPositions(l);h.getOdfCanvas().refreshSize();h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:n,memberId:l,timeStamp:e});h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:m,memberId:l,timeStamp:e});h.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:l,timestamp:e,position:c}}};
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
ops.OpSetParagraphStyle=function(){var m=this,l,e,c,b;this.init=function(h){l=h.memberid;e=h.timestamp;c=h.position;b=h.styleName};this.transform=function(c,a){var e=c.spec(),f=[m];switch(e.optype){case "RemoveParagraphStyle":e.styleName===b&&(b="")}return f};this.execute=function(h){var a;if(a=h.getPositionInTextNode(c))if(a=h.getParagraphElement(a.textNode))return""!==b?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",b):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),h.getOdfCanvas().refreshSize(),h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:e,memberId:l}),h.getOdfCanvas().rerenderAnnotations(),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:l,timestamp:e,position:c,styleName:b}}};
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
ops.OpUpdateParagraphStyle=function(){function m(a,b){var c,d,e=b?b.split(","):[];for(c=0;c<e.length;c+=1)d=e[c].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(d[0]),d[1])}function l(a,b,c,d){var e,f,h,k=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<k.length)&&Object.keys(a).forEach(function(b){e=a[b];(c&&void 0!==c[b]||k&&-1!==k.indexOf(b))&&"object"!==typeof e&&delete a[b]});if(b&&b.attributes&&(c||0<k.length)){h=b.attributes.split(",");for(d=0;d<h.length;d+=1)if(f=h[d],c&&void 0!==
c[f]||k&&-1!==k.indexOf(f))h.splice(d,1),d-=1;0<h.length?b.attributes=h.join(","):delete b.attributes}}function e(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function c(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function b(a,b){var d=s?s[b]:null,f=k?k[b]:null;l(d,f,a.setProperties?a.setProperties[b]:null,a.removedProperties?a.removedProperties[b]:null);d&&!e(d)&&delete s[b];f&&!c(f)&&delete k[b]}function h(a){s&&["style:parent-style-name",
"style:next-style-name"].forEach(function(b){s[b]===a&&delete s[b]})}var a=this,n,f,d,s,k,q=odf.Namespaces.stylens;this.init=function(a){n=a.memberid;f=a.timestamp;d=a.styleName;s=a.setProperties;k=a.removedProperties};this.transform=function(f,n){var m=f.spec(),q=[a];switch(m.optype){case "UpdateParagraphStyle":m.styleName!==d||n||(b(m,"style:paragraph-properties"),b(m,"style:text-properties"),l(s||null,k||null,m.setProperties||null,m.removedProperties||null),s&&e(s)||k&&c(k)||(q=[]));break;case "RemoveParagraphStyle":m.styleName===
d?q=[]:h(m.styleName)}return q};this.execute=function(a){var b=a.getFormatting(),c,e,f;return(c=a.getParagraphStyleElement(d))?(e=c.getElementsByTagNameNS(q,"paragraph-properties")[0],f=c.getElementsByTagNameNS(q,"text-properties")[0],s&&b.updateStyle(c,s),k&&(k["style:paragraph-properties"]&&(m(e,k["style:paragraph-properties"].attributes),0===e.attributes.length&&c.removeChild(e)),k["style:text-properties"]&&(m(f,k["style:text-properties"].attributes),0===f.attributes.length&&c.removeChild(f)),
m(c,k.attributes)),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,d),a.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:n,timestamp:f,styleName:d,setProperties:s,removedProperties:k}}};
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
ops.OpAddParagraphStyle=function(){function m(b){a&&["style:parent-style-name","style:next-style-name"].forEach(function(c){a[c]===b&&delete a[c]})}var l=this,e,c,b,h,a,n=odf.Namespaces.stylens;this.init=function(f){e=f.memberid;c=f.timestamp;b=f.styleName;h="true"===f.isAutomaticStyle||!0===f.isAutomaticStyle;a=f.setProperties};this.transform=function(a,b){var c=a.spec();"RemoveParagraphStyle"===c.optype&&m(c.styleName);return[l]};this.execute=function(c){var d=c.getOdfCanvas().odfContainer(),e=
c.getFormatting(),k=c.getDOM().createElementNS(n,"style:style");if(!k)return!1;a&&e.updateStyle(k,a);k.setAttributeNS(n,"style:family","paragraph");k.setAttributeNS(n,"style:name",b);h?d.rootElement.automaticStyles.appendChild(k):d.rootElement.styles.appendChild(k);c.getOdfCanvas().refreshCSS();c.emit(ops.OdtDocument.signalStyleCreated,b);return!0};this.spec=function(){return{optype:"AddParagraphStyle",memberid:e,timestamp:c,styleName:b,isAutomaticStyle:h,setProperties:a}}};
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
ops.OpRemoveParagraphStyle=function(){function m(c){var a=[];c&&["style:parent-style-name","style:next-style-name"].forEach(function(e){c[e]===b&&a.push(e)});return a}var l=this,e,c,b;this.init=function(h){e=h.memberid;c=h.timestamp;b=h.styleName};this.transform=function(h,a){var n=h.spec(),f,d;f=[l];switch(n.optype){case "RemoveParagraphStyle":n.styleName===b&&(f=[]);break;case "AddParagraphStyle":case "UpdateParagraphStyle":d=m(n.setProperties);0<d.length&&(f=new ops.OpUpdateParagraphStyle,f.init({memberid:e,
timestamp:c,styleName:n.styleName,removedProperties:{attributes:d.join(",")}}),f=[f,l]);break;case "SetParagraphStyle":n.styleName===b&&(n.styleName="",f=new ops.OpSetParagraphStyle,f.init(n),f=[f,l])}return f};this.execute=function(c){var a=c.getParagraphStyleElement(b);if(!a)return!1;a.parentNode.removeChild(a);c.getOdfCanvas().refreshCSS();c.emit(ops.OdtDocument.signalStyleDeleted,b);return!0};this.spec=function(){return{optype:"RemoveParagraphStyle",memberid:e,timestamp:c,styleName:b}}};
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
ops.OpAddAnnotation=function(){function m(a,b,c){if(c=a.getPositionInTextNode(c,e))a=c.textNode,c.offset!==a.length&&a.splitText(c.offset),a.parentNode.insertBefore(b,a.nextSibling)}var l=this,e,c,b,h,a;this.init=function(l){e=l.memberid;c=parseInt(l.timestamp,10);b=parseInt(l.position,10);h=parseInt(l.length,10)||0;a=l.name};this.transform=function(a,c){var d=a.spec(),e=b+h,k=[l];switch(d.optype){case "AddAnnotation":d.position<b?b+=1:d.position!==b||c||(b+=1,k=null);break;case "InsertText":d.position<=
b?b+=d.text.length:d.position<=e&&(h+=d.text.length);break;case "SplitParagraph":d.position<=b?b+=1:d.position<=e&&(h+=1);break;case "InsertTable":k=null;break;case "RemoveText":d.position+d.length<=b?b-=d.length:d.position<b&&(b=d.position)}return k};this.execute=function(l){var f={},d=l.getPositionFilter(),s=l.getCursor(e),k=l.getCursorPosition(e),k=b-k-1,q=new Date(c),g,p,r,w,u;u=l.getDOM();g=u.createElementNS(odf.Namespaces.officens,"office:annotation");g.setAttributeNS(odf.Namespaces.officens,
"office:name",a);p=u.createElementNS(odf.Namespaces.dcns,"dc:creator");p.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",e);r=u.createElementNS(odf.Namespaces.dcns,"dc:date");r.appendChild(u.createTextNode(q.toISOString()));q=u.createElementNS(odf.Namespaces.textns,"text:list");w=u.createElementNS(odf.Namespaces.textns,"text:list-item");u=u.createElementNS(odf.Namespaces.textns,"text:p");w.appendChild(u);q.appendChild(w);g.appendChild(p);g.appendChild(r);g.appendChild(q);
f.node=g;if(!f.node)return!1;if(h){g=l.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");g.setAttributeNS(odf.Namespaces.officens,"office:name",a);f.end=g;if(!f.end)return!1;m(l,f.end,b+h)}m(l,f.node,b);s&&(g=s.getStepCounter(),d=0<k?g.countForwardSteps(k,d):0>k?-g.countBackwardSteps(-k,d):0,s.move(d),l.emit(ops.OdtDocument.signalCursorMoved,s));l.getOdfCanvas().addAnnotation(f);return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:e,timestamp:c,position:b,
length:h,name:a}}};
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
ops.OpRemoveAnnotation=function(){var m,l,e,c,b;this.init=function(h){m=h.memberid;l=h.timestamp;e=parseInt(h.position,10);c=parseInt(h.length,10);b=new core.DomUtils};this.transform=function(b,a){return null};this.execute=function(c){for(var a=c.getIteratorAtPosition(e).container(),l,f=null,d=null;a.namespaceURI!==odf.Namespaces.officens||"annotation"!==a.localName;)a=a.parentNode;if(null===a)return!1;f=a;(l=f.getAttributeNS(odf.Namespaces.officens,"name"))&&(d=b.getElementsByTagNameNS(c.getRootNode(),
odf.Namespaces.officens,"annotation-end").filter(function(a){return l===a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);c.getOdfCanvas().forgetAnnotations();for(a=b.getElementsByTagNameNS(f,odf.Namespaces.webodfns+":names:cursor","cursor");a.length;)f.parentNode.insertBefore(a.pop(),f);f.parentNode.removeChild(f);d&&d.parentNode.removeChild(d);c.fixCursorPositions();c.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:m,timestamp:l,
position:e,length:c}}};
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
runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");
ops.OperationFactory=function(){function m(e){return function(){return new e}}var l;this.register=function(e,c){l[e]=c};this.create=function(e){var c=null,b=l[e.optype];b&&(c=b(e),c.init(e));return c};l={AddCursor:m(ops.OpAddCursor),ApplyDirectStyling:m(ops.OpApplyDirectStyling),InsertTable:m(ops.OpInsertTable),InsertText:m(ops.OpInsertText),RemoveText:m(ops.OpRemoveText),SplitParagraph:m(ops.OpSplitParagraph),SetParagraphStyle:m(ops.OpSetParagraphStyle),UpdateParagraphStyle:m(ops.OpUpdateParagraphStyle),
AddParagraphStyle:m(ops.OpAddParagraphStyle),RemoveParagraphStyle:m(ops.OpRemoveParagraphStyle),MoveCursor:m(ops.OpMoveCursor),RemoveCursor:m(ops.OpRemoveCursor),AddAnnotation:m(ops.OpAddAnnotation),RemoveAnnotation:m(ops.OpRemoveAnnotation)}};
// Input 57
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(m,l){function e(){u.setUnfilteredPosition(m.getNode(),0);return u}function c(a,b){var c,d=null;a&&(c=b?a[a.length-1]:a[0]);c&&(d={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return d}function b(a,d,e,f){var g=a.nodeType;e.setStart(a,d);e.collapse(!f);f=c(e.getClientRects(),!0===f);!f&&0<d&&(e.setStart(a,d-1),e.setEnd(a,d),f=c(e.getClientRects(),!0));f||(g===Node.ELEMENT_NODE&&a.childNodes[d-1]?f=b(a,d-1,e,!0):a.nodeType===Node.TEXT_NODE&&0<d?f=b(a,d-1,e,!0):a.previousSibling?
f=b(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,e,!0):a.parentNode&&a.parentNode!==l?f=b(a.parentNode,0,e,!1):(e.selectNode(l),f=c(e.getClientRects(),!1)));runtime.assert(Boolean(f),"No visible rectangle found");return f}function h(a,c,d){var f=a,g=e(),h,k=l.ownerDocument.createRange(),n=m.getSelectedRange()?m.getSelectedRange().cloneRange():l.ownerDocument.createRange(),p,r=runtime.getWindow();for(h=b(g.container(),
g.unfilteredDomOffset(),k);0<f&&d();)f-=1;c?(c=g.container(),g=g.unfilteredDomOffset(),-1===n.comparePoint(c,g)?(n.setStart(c,g),p=!1):n.setEnd(c,g)):(n.setStart(g.container(),g.unfilteredDomOffset()),n.collapse(!0));m.setSelectedRange(n,p);g=e();n=b(g.container(),g.unfilteredDomOffset(),k);if(n.top===h.top||void 0===A)A=n.left;r.clearTimeout(x);x=r.setTimeout(function(){A=void 0},2E3);k.detach();return a-f}function a(a){var b=e();return a.acceptPosition(b)===v?!0:!1}function n(a,b){for(var c=e(),
d=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&c.nextPosition();)f+=1,d.check(),b.acceptPosition(c)===v&&(g+=f,f=0,a-=1);return g}function f(a,b,c){for(var d=e(),f=new core.LoopWatchDog(1E3),g=0,h=0;0<a&&d.nextPosition();)f.check(),c.acceptPosition(d)===v&&(g+=1,b.acceptPosition(d)===v&&(h+=g,g=0,a-=1));return h}function d(a,b,c){for(var d=e(),f=new core.LoopWatchDog(1E3),g=0,h=0;0<a&&d.previousPosition();)f.check(),c.acceptPosition(d)===v&&(g+=1,b.acceptPosition(d)===v&&(h+=g,g=0,a-=1));return h}function s(a,
b){for(var c=e(),d=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&c.previousPosition();)f+=1,d.check(),b.acceptPosition(c)===v&&(g+=f,f=0,a-=1);return g}function k(a){var b=e(),c=w.getParagraphElement(b.getCurrentNode()),d;d=-s(1,a);if(0===d||c&&c!==w.getParagraphElement(b.getCurrentNode()))d=n(1,a);return d}function q(a,c){var d=e(),f=0,g=0,h=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var k=c,m=h,n=d,p=n.container(),r=0,u=null,q=void 0,s=10,w=void 0,x=0,V=void 0,S=void 0,J=void 0,w=void 0,C=l.ownerDocument.createRange(),
I=new core.LoopWatchDog(1E3),w=b(p,n.unfilteredDomOffset(),C),V=w.top,S=void 0===A?w.left:A,J=V;!0===(0>m?n.previousPosition():n.nextPosition());)if(I.check(),k.acceptPosition(n)===v&&(r+=1,p=n.container(),w=b(p,n.unfilteredDomOffset(),C),w.top!==V)){if(w.top!==J&&J!==V)break;J=w.top;w=Math.abs(S-w.left);if(null===u||w<s)u=p,q=n.unfilteredDomOffset(),s=w,x=r}null!==u?(n.setUnfilteredPosition(u,q),r=x):r=0;C.detach();f+=r;if(0===f)break;g+=f;a-=1}return g*h}function g(a,c){var d,f,g,h,k=e(),m=w.getParagraphElement(k.getCurrentNode()),
n=0,p=l.ownerDocument.createRange();0>a?(d=k.previousPosition,f=-1):(d=k.nextPosition,f=1);for(g=b(k.container(),k.unfilteredDomOffset(),p);d.call(k);)if(c.acceptPosition(k)===v){if(w.getParagraphElement(k.getCurrentNode())!==m)break;h=b(k.container(),k.unfilteredDomOffset(),p);if(h.bottom!==g.bottom&&(g=h.top>=g.top&&h.bottom<g.bottom||h.top<=g.top&&h.bottom>g.bottom,!g))break;n+=f;g=h}p.detach();return n}function p(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),
a=a.parentNode;for(d=b.firstChild;d!==a;)c+=1,d=d.nextSibling;return c}function r(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=e(),f=d.container(),g=d.unfilteredDomOffset(),h=0,k=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(f,g);var f=a,g=b,l=d.container(),
m=d.unfilteredDomOffset();if(f===l)f=m-g;else{var n=f.compareDocumentPosition(l);2===n?n=-1:4===n?n=1:10===n?(g=p(f,l),n=g<m?1:-1):(m=p(l,f),n=m<g?-1:1);f=n}if(0>f)for(;d.nextPosition()&&(k.check(),c.acceptPosition(d)===v&&(h+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<f)for(;d.previousPosition()&&(k.check(),c.acceptPosition(d)===v&&(h-=1),d.container()!==a||d.unfilteredDomOffset()!==b););return h}var w,u,A,x,v=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=
function(a,b){return h(a,b,u.nextPosition)};this.movePointBackward=function(a,b){return h(a,b,u.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:n,countBackwardSteps:s,convertForwardStepsBetweenFilters:f,convertBackwardStepsBetweenFilters:d,countLinesSteps:q,countStepsToLineBoundary:g,countStepsToPosition:r,isPositionWalkable:a,countStepsToValidPosition:k}};(function(){w=new odf.OdfUtils;u=gui.SelectionMover.createPositionIterator(l);var a=l.ownerDocument.createRange();a.setStart(u.container(),
u.unfilteredDomOffset());a.collapse(!0);m.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(m){var l=new function(){this.acceptNode=function(e){return"urn:webodf:names:cursor"===e.namespaceURI||"urn:webodf:names:editinfo"===e.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(m,5,l,!1)};(function(){return gui.SelectionMover})();
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
ops.OperationTransformer=function(){function m(e,c){for(var b,h,a,n=[],f=[];0<e.length&&c;){b=e.shift();h=c;var d=void 0;a=d=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b.spec()));runtime.log(runtime.toJson(h.spec()));d=l.create(h.spec());a=h.transform(b,!0);h=(d=b.transform(d,!1))&&a?{opsA:d,opsB:a}:null;if(!h)return null;n=n.concat(h.opsA);if(0===h.opsB.length){n=n.concat(e);c=null;break}if(1<h.opsB.length)for(b=0;b<h.opsB.length-1;b+=1){a=m(e,h.opsB[b]);if(!a)return null;
f=f.concat(a.opsB);e=a.opsA}c=h.opsB.pop()}c&&f.push(c);return{opsA:n,opsB:f}}var l;this.setOperationFactory=function(e){l=e};this.transform=function(e,c){var b,h=[],a,n=[];for(b=0;b<e.length;b+=1){a=l.create(e[b]);if(!a)return null;h.push(a)}for(b=0;b<c.length;b+=1){a=l.create(c[b]);a=m(h,a);if(!a)return null;h=a.opsA;n=n.concat(a.opsB)}return{opsA:h,opsB:n}}};
// Input 59
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(m,l){var e=this,c,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,a){var l=0;0<b?l=c.movePointForward(b,a):0>=b&&(l=-c.movePointBackward(-b,a));e.handleUpdate();return l};this.handleUpdate=function(){};this.getStepCounter=function(){return c.getStepCounter()};this.getMemberId=function(){return m};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.getOdtDocument=function(){return l};b=new core.Cursor(l.getDOM(),m);c=new gui.SelectionMover(b,l.getRootNode())};
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
ops.EditInfo=function(m,l){function e(){var c=[],a;for(a in b)b.hasOwnProperty(a)&&c.push({memberid:a,time:b[a].time});c.sort(function(a,b){return a.time-b.time});return c}var c,b={};this.getNode=function(){return c};this.getOdtDocument=function(){return l};this.getEdits=function(){return b};this.getSortedEdits=function(){return e()};this.addEdit=function(c,a){b[c]={time:a}};this.clearEdits=function(){b={}};this.destroy=function(b){m.removeChild(c);b()};c=l.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");m.insertBefore(c,m.firstChild)};
// Input 61
gui.Avatar=function(m,l){var e=this,c,b,h;this.setColor=function(a){b.style.borderColor=a};this.setImageUrl=function(a){e.isVisible()?b.src=a:h=a};this.isVisible=function(){return"block"===c.style.display};this.show=function(){h&&(b.src=h,h=void 0);c.style.display="block"};this.hide=function(){c.style.display="none"};this.markAsFocussed=function(a){c.className=a?"active":""};this.destroy=function(a){m.removeChild(c);a()};(function(){var a=m.ownerDocument,e=a.documentElement.namespaceURI;c=a.createElementNS(e,
"div");b=a.createElementNS(e,"img");b.width=64;b.height=64;c.appendChild(b);c.style.width="64px";c.style.height="70px";c.style.position="absolute";c.style.top="-80px";c.style.left="-34px";c.style.display=l?"block":"none";m.appendChild(c)})()};
// Input 62
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(m,l,e){function c(e){n&&a.parentNode&&(!f||e)&&(e&&void 0!==d&&runtime.clearTimeout(d),f=!0,b.style.opacity=e||"0"===b.style.opacity?"1":"0",d=runtime.setTimeout(function(){f=!1;c(!1)},500))}var b,h,a,n=!1,f=!1,d;this.refreshCursorBlinking=function(){e||m.getSelectedRange().collapsed?(n=!0,c(!0)):(n=!1,b.style.opacity="0")};this.setFocus=function(){n=!0;h.markAsFocussed(!0);c(!0)};this.removeFocus=function(){n=!1;h.markAsFocussed(!1);b.style.opacity="0"};this.setAvatarImageUrl=
function(a){h.setImageUrl(a)};this.setColor=function(a){b.style.borderColor=a;h.setColor(a)};this.getCursor=function(){return m};this.getFocusElement=function(){return b};this.toggleHandleVisibility=function(){h.isVisible()?h.hide():h.show()};this.showHandle=function(){h.show()};this.hideHandle=function(){h.hide()};this.ensureVisible=function(){var a,c,d,e,f=m.getOdtDocument().getOdfCanvas().getElement().parentNode,h;d=f.offsetWidth-f.clientWidth+5;e=f.offsetHeight-f.clientHeight+5;h=b.getBoundingClientRect();
a=h.left-d;c=h.top-e;d=h.right+d;e=h.bottom+e;h=f.getBoundingClientRect();c<h.top?f.scrollTop-=h.top-c:e>h.bottom&&(f.scrollTop+=e-h.bottom);a<h.left?f.scrollLeft-=h.left-a:d>h.right&&(f.scrollLeft+=d-h.right)};this.destroy=function(c){h.destroy(function(d){d?c(d):(a.removeChild(b),c())})};(function(){var c=m.getOdtDocument().getDOM();b=c.createElementNS(c.documentElement.namespaceURI,"span");a=m.getNode();a.appendChild(b);h=new gui.Avatar(a,l)})()};
// Input 63
runtime.loadClass("core.EventNotifier");
gui.ClickHandler=function(){function m(){e=0;c=null}var l,e=0,c=null,b=new core.EventNotifier([gui.ClickHandler.signalSingleClick,gui.ClickHandler.signalDoubleClick,gui.ClickHandler.signalTripleClick]);this.subscribe=function(c,a){b.subscribe(c,a)};this.handleMouseUp=function(h){var a=runtime.getWindow();c&&c.x===h.screenX&&c.y===h.screenY?(e+=1,1===e?b.emit(gui.ClickHandler.signalSingleClick,h):2===e?b.emit(gui.ClickHandler.signalDoubleClick,void 0):3===e&&(a.clearTimeout(l),b.emit(gui.ClickHandler.signalTripleClick,
void 0),m())):(b.emit(gui.ClickHandler.signalSingleClick,h),e=1,c={x:h.screenX,y:h.screenY},a.clearTimeout(l),l=a.setTimeout(m,400))}};gui.ClickHandler.signalSingleClick="click";gui.ClickHandler.signalDoubleClick="doubleClick";gui.ClickHandler.signalTripleClick="tripleClick";(function(){return gui.ClickHandler})();
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
gui.KeyboardHandler=function(){function m(b,c){c||(c=l.None);return b+":"+c}var l=gui.KeyboardHandler.Modifier,e=null,c={};this.setDefault=function(b){e=b};this.bind=function(b,e,a){b=m(b,e);runtime.assert(!1===c.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);c[b]=a};this.unbind=function(b,e){var a=m(b,e);delete c[a]};this.reset=function(){e=null;c={}};this.handleEvent=function(b){var h=b.keyCode,a=l.None;b.metaKey&&(a|=l.Meta);b.ctrlKey&&(a|=l.Ctrl);b.altKey&&(a|=l.Alt);
b.shiftKey&&(a|=l.Shift);h=m(h,a);h=c[h];a=!1;h?a=h():null!==e&&(a=e(b));a&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
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
gui.Clipboard=function(){var m,l,e;this.setDataFromRange=function(c,b){var e=!0,a,n=c.clipboardData;a=runtime.getWindow();var f=b.startContainer.ownerDocument;!n&&a&&(n=a.clipboardData);n?(f=f.createElement("span"),f.appendChild(b.cloneContents()),a=n.setData("text/plain",l.writeToString(f)),e=e&&a,a=n.setData("text/html",m.writeToString(f,odf.Namespaces.namespaceMap)),e=e&&a,c.preventDefault()):e=!1;return e};m=new xmldom.LSSerializer;l=new odf.TextSerializer;e=new odf.OdfNodeFilter;m.filter=e;l.filter=
e};
// Input 66
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Utils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.ClickHandler");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");
runtime.loadClass("gui.StyleHelper");
gui.SessionController=function(){gui.SessionController=function(m,l){function e(a,b,c,d){var e="on"+b,f=!1;a.attachEvent&&(f=a.attachEvent(e,c));!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0);f&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function c(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function b(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function h(a,b){var c=new ops.OpMoveCursor;c.init({memberid:l,
position:a,length:b||0});return c}function a(a,b){var c=gui.SelectionMover.createPositionIterator(z.getRootNode()),d=z.getOdfCanvas().getElement(),e;e=a;if(!e)return null;for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return null;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,b);return z.getDistanceFromCursor(l,c.container(),
c.unfilteredDomOffset())}function n(a){var b=z.getOdfCanvas().getElement(),c=z.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function f(b){za&&runtime.setTimeout(function(){var c;a:{var d=z.getOdfCanvas().getElement(),e=ca.getSelection(),f,g,k,p;if(null===e.anchorNode&&null===e.focusNode){c=b.clientX;f=b.clientY;g=z.getDOM();g.caretRangeFromPoint?
(c=g.caretRangeFromPoint(c,f),f={container:c.startContainer,offset:c.startOffset}):g.caretPositionFromPoint?(c=g.caretPositionFromPoint(c,f),f={container:c.offsetNode,offset:c.offset}):f=null;if(!f){c=null;break a}c=f.container;f=f.offset;g=c;e=f}else c=e.anchorNode,f=e.anchorOffset,g=e.focusNode,e=e.focusOffset;runtime.assert(null!==c&&null!==g,"anchorNode is null or focusNode is null");k=qa.containsNode(d,c);p=qa.containsNode(d,g);k||p?(k||(k=n(c),c=k.node,f=k.offset),p||(k=n(g),g=k.node,e=k.offset),
d.focus(),c={anchorNode:c,anchorOffset:f,focusNode:g,focusOffset:e}):c=null}null!==c&&(d=a(c.anchorNode,c.anchorOffset),f=c.focusNode===c.anchorNode&&c.focusOffset===c.anchorOffset?d:a(c.focusNode,c.focusOffset),null!==f&&0!==f||null!==d&&0!==d)&&(c=z.getCursorPosition(l),d=h(c+d,f-d),m.enqueue(d))},0)}function d(a){f(a)}function s(){var a=z.getOdfCanvas().getElement(),b=/[A-Za-z0-9]/,c=0,d=0,e,f;if(qa.containsNode(a,ca.getSelection().focusNode)){a=gui.SelectionMover.createPositionIterator(z.getRootNode());
e=z.getCursor(l).getNode();for(a.setUnfilteredPosition(e,0);a.previousPosition();)if(f=a.getCurrentNode(),f.nodeType===Node.TEXT_NODE){f=f.data[a.unfilteredDomOffset()];if(!b.test(f))break;c-=1}else if(f.namespaceURI!==odf.Namespaces.textns||"span"!==f.localName)break;a.setUnfilteredPosition(e,0);do if(f=a.getCurrentNode(),f.nodeType===Node.TEXT_NODE){f=f.data[a.unfilteredDomOffset()];if(!b.test(f))break;d+=1}else if(f.namespaceURI!==odf.Namespaces.textns||"span"!==f.localName)break;while(a.nextPosition());
if(0!==c||0!==d)b=z.getCursorPosition(l),c=h(b+c,Math.abs(c)+Math.abs(d)),m.enqueue(c)}}function k(){var a=z.getOdfCanvas().getElement(),b,c;qa.containsNode(a,ca.getSelection().focusNode)&&(c=z.getParagraphElement(z.getCursor(l).getNode()),a=z.getDistanceFromCursor(l,c,0),b=gui.SelectionMover.createPositionIterator(z.getRootNode()),b.moveToEndOfNode(c),c=z.getDistanceFromCursor(l,c,b.unfilteredDomOffset()),0!==a||0!==c)&&(b=z.getCursorPosition(l),a=h(b+a,Math.abs(a)+Math.abs(c)),m.enqueue(a))}function q(a){var b=
z.getCursorSelection(l),c=z.getCursor(l).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,ra,na):-c.convertBackwardStepsBetweenFilters(-a,ra,na),a=b.length+a,m.enqueue(h(b.position,a)))}function g(a){var b=z.getCursorPosition(l),c=z.getCursor(l).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,ra,na):-c.convertBackwardStepsBetweenFilters(-a,ra,na),m.enqueue(h(b+a,0)))}function p(){g(-1);return!0}function r(){g(1);return!0}function w(){q(-1);return!0}function u(){q(1);
return!0}function A(a,b){var c=z.getParagraphElement(z.getCursor(l).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=z.getCursor(l).getStepCounter().countLinesSteps(a,ra);b?q(c):g(c)}function x(){A(-1,!1);return!0}function v(){A(1,!1);return!0}function t(){A(-1,!0);return!0}function E(){A(1,!0);return!0}function H(a,b){var c=z.getCursor(l).getStepCounter().countStepsToLineBoundary(a,ra);b?q(c):g(c)}function y(){H(-1,!1);return!0}function P(){H(1,!1);return!0}function B(){H(-1,
!0);return!0}function R(){H(1,!0);return!0}function G(){var a=z.getParagraphElement(z.getCursor(l).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");c=z.getDistanceFromCursor(l,a,0);b=gui.SelectionMover.createPositionIterator(z.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),ua.isParagraph(a)&&(c=z.getDistanceFromCursor(l,a,0));q(c);return!0}function L(){var a=z.getParagraphElement(z.getCursor(l).getNode()),b,
c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(z.getRootNode());b.moveToEndOfNode(a);for(c=z.getDistanceFromCursor(l,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),ua.isParagraph(a)&&(b.moveToEndOfNode(a),c=z.getDistanceFromCursor(l,b.container(),b.unfilteredDomOffset()));q(c);return!0}function X(a,b){var c=gui.SelectionMover.createPositionIterator(z.getRootNode());0<a&&c.moveToEnd();c=z.getDistanceFromCursor(l,
c.container(),c.unfilteredDomOffset());b?q(c):g(c)}function oa(){X(-1,!1);return!0}function N(){X(1,!1);return!0}function sa(){X(-1,!0);return!0}function Y(){X(1,!0);return!0}function ba(){var a=gui.SelectionMover.createPositionIterator(z.getRootNode()),b;b=-z.getDistanceFromCursor(l,a.container(),a.unfilteredDomOffset());a.moveToEnd();b+=z.getDistanceFromCursor(l,a.container(),a.unfilteredDomOffset());m.enqueue(h(0,b));return!0}function M(a){0>a.length&&(a.position+=a.length,a.length=-a.length);
return a}function V(a){var b=new ops.OpRemoveText;b.init({memberid:l,position:a.position,length:a.length});return b}function S(){var a=M(z.getCursorSelection(l)),b=null;0===a.length?0<a.position&&z.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:l,position:a.position-1,length:1}),m.enqueue(b)):(b=V(a),m.enqueue(b));return!0}function J(){var a=M(z.getCursorSelection(l)),b=null;0===a.length?z.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:l,
position:a.position,length:1}),m.enqueue(b)):(b=V(a),m.enqueue(b));return null!==b}function C(){var a=M(z.getCursorSelection(l));0!==a.length&&m.enqueue(V(a));return!0}function I(a){var b=M(z.getCursorSelection(l)),c=null;0<b.length&&(c=V(b),m.enqueue(c));c=new ops.OpInsertText;c.init({memberid:l,position:b.position,text:a});m.enqueue(c)}function K(){var a=z.getCursorPosition(l),b;b=new ops.OpSplitParagraph;b.init({memberid:l,position:a});m.enqueue(b);return!0}function Q(){var a=z.getCursor(l),b=
ca.getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function Z(a){var b=z.getCursor(l);b.getSelectedRange().collapsed||(ea.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=M(m.getOdtDocument().getCursorSelection(l)),b.init({memberid:l,position:a.position,length:a.length}),m.enqueue(b)):runtime.log("Cut operation failed"))}function da(){return!1!==z.getCursor(l).getSelectedRange().collapsed}function O(a){var b=z.getCursor(l);b.getSelectedRange().collapsed||
ea.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function $(a){var b;ca.clipboardData&&ca.clipboardData.getData?b=ca.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(I(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function fa(){return!1}function F(a){if(aa)aa.onOperationExecuted(a)}function ka(a){z.emit(ops.OdtDocument.signalUndoStackChanged,a)}function ha(){return aa?(aa.moveBackward(1),
Q(),!0):!1}function T(){return aa?(aa.moveForward(1),Q(),!0):!1}function ia(a,b){var c=z.getCursorSelection(l),d=new ops.OpApplyDirectStyling,e={};e[a]=b;d.init({memberid:l,position:c.position,length:c.length,setProperties:{"style:text-properties":e}});m.enqueue(d)}function la(){var a=z.getCursor(l).getSelectedRange(),a=ya.isBold(a)?"normal":"bold";ia("fo:font-weight",a);return!0}function U(){var a=z.getCursor(l).getSelectedRange(),a=ya.isItalic(a)?"normal":"italic";ia("fo:font-style",a);return!0}
function ma(){var a=z.getCursor(l).getSelectedRange(),a=ya.hasUnderline(a)?"none":"solid";ia("style:text-underline-style",a);return!0}function W(a){za=a.target&&qa.containsNode(z.getOdfCanvas().getElement(),a.target)}function ja(a){var b=z.getCursor(l).getSelectedRange(),c=z.getCursorPosition(l),b=ua.getParagraphElements(b),d=z.getFormatting();b.forEach(function(b){var e=c+z.getDistanceFromCursor(l,b,0),f=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=Da.generateName();var g,e=e+1;f&&(g=d.createDerivedStyleObject(f,
"paragraph",{}));g=a(g||{});f=new ops.OpAddParagraphStyle;f.init({memberid:l,styleName:b,isAutomaticStyle:!0,setProperties:g});m.enqueue(f);g=new ops.OpSetParagraphStyle;g.init({memberid:l,styleName:b,position:e});m.enqueue(g)})}function ta(a){ja(function(b){return Aa.mergeObjects(b,a)})}function va(){ta({"style:paragraph-properties":{"fo:text-align":"left"}});return!0}function wa(){ta({"style:paragraph-properties":{"fo:text-align":"center"}});return!0}function pa(){ta({"style:paragraph-properties":{"fo:text-align":"right"}});
return!0}function Ba(){ta({"style:paragraph-properties":{"fo:text-align":"justify"}});return!0}function Ca(a,b){var c=z.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&ua.parseLength(d);return Aa.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var ca=runtime.getWindow(),z=m.getOdtDocument(),qa=new core.DomUtils,ua=new odf.OdfUtils,ea=new gui.Clipboard,ga=new gui.ClickHandler,
D=new gui.KeyboardHandler,xa=new gui.KeyboardHandler,ya=new gui.StyleHelper(z.getFormatting()),ra=new core.PositionFilterChain,na=z.getPositionFilter(),za=!1,aa=null,Aa=new core.Utils,Da=new odf.StyleNameGenerator("auto"+Aa.hashString(l)+"_",z.getFormatting());runtime.assert(null!==ca,"Expected to be run in an environment which has a global window, like a browser.");ra.addFilter("BaseFilter",na);ra.addFilter("RootFilter",z.createRootFilter(l));this.startEditing=function(){var a;a=z.getOdfCanvas().getElement();
e(a,"keydown",D.handleEvent);e(a,"keypress",xa.handleEvent);e(a,"keyup",b);e(a,"beforecut",da,!0);e(a,"cut",Z);e(a,"copy",O);e(a,"beforepaste",fa,!0);e(a,"paste",$);e(ca,"mousedown",W);e(ca,"mouseup",ga.handleMouseUp);e(a,"contextmenu",d);z.subscribe(ops.OdtDocument.signalOperationExecuted,Q);z.subscribe(ops.OdtDocument.signalOperationExecuted,F);a=new ops.OpAddCursor;a.init({memberid:l});m.enqueue(a);aa&&aa.saveInitialState()};this.endEditing=function(){var a;z.unsubscribe(ops.OdtDocument.signalOperationExecuted,
F);z.unsubscribe(ops.OdtDocument.signalOperationExecuted,Q);a=z.getOdfCanvas().getElement();c(a,"keydown",D.handleEvent);c(a,"keypress",xa.handleEvent);c(a,"keyup",b);c(a,"cut",Z);c(a,"beforecut",da);c(a,"copy",O);c(a,"paste",$);c(a,"beforepaste",fa);c(ca,"mousedown",W);c(ca,"mouseup",ga.handleMouseUp);c(a,"contextmenu",d);a=new ops.OpRemoveCursor;a.init({memberid:l});m.enqueue(a);aa&&aa.resetInitialState()};this.alignParagraphLeft=va;this.alignParagraphCenter=wa;this.alignParagraphRight=pa;this.alignParagraphJustified=
Ba;this.indent=function(){ja(Ca.bind(null,1));return!0};this.outdent=function(){ja(Ca.bind(null,-1));return!0};this.getInputMemberId=function(){return l};this.getSession=function(){return m};this.setUndoManager=function(a){aa&&aa.unsubscribe(gui.UndoManager.signalUndoStackChanged,ka);if(aa=a)aa.setOdtDocument(z),aa.setPlaybackFunction(function(a){a.execute(z)}),aa.subscribe(gui.UndoManager.signalUndoStackChanged,ka)};this.getUndoManager=function(){return aa};this.destroy=function(a){a()};(function(){var a=
-1!==ca.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;D.bind(c.Tab,b.None,function(){I("\t");return!0});D.bind(c.Left,b.None,p);D.bind(c.Right,b.None,r);D.bind(c.Up,b.None,x);D.bind(c.Down,b.None,v);D.bind(c.Backspace,b.None,S);D.bind(c.Delete,b.None,J);D.bind(c.Left,b.Shift,w);D.bind(c.Right,b.Shift,u);D.bind(c.Up,b.Shift,t);D.bind(c.Down,b.Shift,E);D.bind(c.Home,b.None,y);D.bind(c.End,b.None,P);D.bind(c.Home,b.Ctrl,oa);D.bind(c.End,
b.Ctrl,N);D.bind(c.Home,b.Shift,B);D.bind(c.End,b.Shift,R);D.bind(c.Up,b.CtrlShift,G);D.bind(c.Down,b.CtrlShift,L);D.bind(c.Home,b.CtrlShift,sa);D.bind(c.End,b.CtrlShift,Y);a?(D.bind(c.Clear,b.None,C),D.bind(c.Left,b.Meta,y),D.bind(c.Right,b.Meta,P),D.bind(c.Home,b.Meta,oa),D.bind(c.End,b.Meta,N),D.bind(c.Left,b.MetaShift,B),D.bind(c.Right,b.MetaShift,R),D.bind(c.Up,b.AltShift,G),D.bind(c.Down,b.AltShift,L),D.bind(c.Up,b.MetaShift,sa),D.bind(c.Down,b.MetaShift,Y),D.bind(c.A,b.Meta,ba),D.bind(c.B,
b.Meta,la),D.bind(c.I,b.Meta,U),D.bind(c.U,b.Meta,ma),D.bind(c.L,b.MetaShift,va),D.bind(c.E,b.MetaShift,wa),D.bind(c.R,b.MetaShift,pa),D.bind(c.J,b.MetaShift,Ba),D.bind(c.Z,b.Meta,ha),D.bind(c.Z,b.MetaShift,T)):(D.bind(c.A,b.Ctrl,ba),D.bind(c.B,b.Ctrl,la),D.bind(c.I,b.Ctrl,U),D.bind(c.U,b.Ctrl,ma),D.bind(c.L,b.CtrlShift,va),D.bind(c.E,b.CtrlShift,wa),D.bind(c.R,b.CtrlShift,pa),D.bind(c.J,b.CtrlShift,Ba),D.bind(c.Z,b.Ctrl,ha),D.bind(c.Z,b.CtrlShift,T));xa.setDefault(function(a){var b;b=null===a.which?
String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(I(b),!0)});xa.bind(c.Enter,b.None,K);ga.subscribe(gui.ClickHandler.signalSingleClick,function(a){var b=a.target,c=null;if("annotationRemoveButton"===b.className){a=c=qa.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0];for(var b=0,c=gui.SelectionMover.createPositionIterator(z.getRootNode()),d=new core.LoopWatchDog(1E3),e=!1;c.nextPosition();)if(d.check(),
e=Boolean(a.compareDocumentPosition(c.container())&Node.DOCUMENT_POSITION_CONTAINED_BY),1===na.acceptPosition(c)){if(e)break;b+=1}c=0;d=gui.SelectionMover.createPositionIterator(z.getRootNode());e=!1;d.setUnfilteredPosition(a,0);do{e=Boolean(a.compareDocumentPosition(d.container())&Node.DOCUMENT_POSITION_CONTAINED_BY);if(!e&&a!==d.container())break;1===na.acceptPosition(d)&&(c+=1)}while(d.nextPosition());a=c;c=new ops.OpRemoveAnnotation;c.init({memberid:l,position:b,length:a});m.enqueue(c)}else f(a)});
ga.subscribe(gui.ClickHandler.signalDoubleClick,s);ga.subscribe(gui.ClickHandler.signalTripleClick,k)})()};return gui.SessionController}();
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
ops.MemberModel=function(){};ops.MemberModel.prototype.getMemberDetailsAndUpdates=function(m,l){};ops.MemberModel.prototype.unsubscribeMemberDetailsUpdates=function(m,l){};ops.MemberModel.prototype.close=function(m){};
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
ops.TrivialMemberModel=function(){this.getMemberDetailsAndUpdates=function(m,l){l(m,{memberid:m,fullname:"Unknown",color:"black",imageurl:"avatar-joe.png"})};this.unsubscribeMemberDetailsUpdates=function(m,l){};this.close=function(m){m()}};
// Input 69
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
// Input 70
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
ops.TrivialOperationRouter=function(){var m,l;this.setOperationFactory=function(e){m=e};this.setPlaybackFunction=function(e){l=e};this.push=function(e){e=e.spec();e.timestamp=(new Date).getTime();e=m.create(e);l(e)};this.close=function(e){e()};this.getHasLocalUnsyncedOpsAndUpdates=function(e){e(!0)};this.unsubscribeHasLocalUnsyncedOpsUpdates=function(e){}};
// Input 71
gui.EditInfoHandle=function(m){var l=[],e,c=m.ownerDocument,b=c.documentElement.namespaceURI;this.setEdits=function(h){l=h;var a,m,f,d;e.innerHTML="";for(h=0;h<l.length;h+=1)a=c.createElementNS(b,"div"),a.className="editInfo",m=c.createElementNS(b,"span"),m.className="editInfoColor",m.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[h].memberid),f=c.createElementNS(b,"span"),f.className="editInfoAuthor",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[h].memberid),
d=c.createElementNS(b,"span"),d.className="editInfoTime",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[h].memberid),d.innerHTML=l[h].time,a.appendChild(m),a.appendChild(f),a.appendChild(d),e.appendChild(a)};this.show=function(){e.style.display="block"};this.hide=function(){e.style.display="none"};this.destroy=function(b){m.removeChild(e);b()};e=c.createElementNS(b,"div");e.setAttribute("class","editInfoHandle");e.style.display="none";m.appendChild(e)};
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
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(m,l){function e(b,c){return runtime.getWindow().setTimeout(function(){a.style.opacity=b},c)}var c=this,b,h,a,n,f;this.addEdit=function(b,c){var k=Date.now()-c;m.addEdit(b,c);h.setEdits(m.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);if(n){var l=n;runtime.getWindow().clearTimeout(l)}f&&(l=f,runtime.getWindow().clearTimeout(l));1E4>k?(e(1,0),n=e(0.5,1E4-k),f=e(0.2,2E4-k)):1E4<=k&&2E4>k?(e(0.5,0),f=e(0.2,2E4-k)):e(0.2,0)};this.getEdits=
function(){return m.getEdits()};this.clearEdits=function(){m.clearEdits();h.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return m};this.show=function(){a.style.display="block"};this.hide=function(){c.hideHandle();a.style.display="none"};this.showHandle=function(){h.show()};this.hideHandle=function(){h.hide()};this.destroy=function(c){b.removeChild(a);h.destroy(function(a){a?
c(a):m.destroy(c)})};(function(){var d=m.getOdtDocument().getDOM();a=d.createElementNS(d.documentElement.namespaceURI,"div");a.setAttribute("class","editInfoMarker");a.onmouseover=function(){c.showHandle()};a.onmouseout=function(){c.hideHandle()};b=m.getNode();b.appendChild(a);h=new gui.EditInfoHandle(b);l||c.hide()})()};
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
runtime.loadClass("gui.Caret");runtime.loadClass("ops.TrivialMemberModel");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
gui.SessionView=function(){return function(m,l,e){function c(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid^="'+a+'"]'+e+c;a:{var f=s.firstChild;for(b=b+'[editinfo|memberid^="'+a+'"]'+e;f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:s.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","")}function b(a){var b,c;for(c in q)q.hasOwnProperty(c)&&(b=q[c],a?b.show():b.hide())}function h(a){e.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function a(a,b){var d=e.getCaret(a);b?(d&&(d.setAvatarImageUrl(b.imageurl),d.setColor(b.color)),c(a,b.fullname,b.color)):runtime.log('MemberModel sent undefined data for member "'+a+'".')}function n(b){var c=b.getMemberId(),
d=l.getMemberModel();e.registerCursor(b,p,r);a(c,null);d.getMemberDetailsAndUpdates(c,a);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function f(b){var c=!1,d;for(d in q)if(q.hasOwnProperty(d)&&q[d].getEditInfo().getEdits().hasOwnProperty(b)){c=!0;break}c||l.getMemberModel().unsubscribeMemberDetailsUpdates(b,a)}function d(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",f=b.getElementsByTagNameNS(k,"editinfo")[0];f?(e=f.getAttributeNS(k,"id"),d=q[e]):
(e=Math.random().toString(),d=new ops.EditInfo(b,l.getOdtDocument()),d=new gui.EditInfoMarker(d,g),f=b.getElementsByTagNameNS(k,"editinfo")[0],f.setAttributeNS(k,"id",e),q[e]=d);d.addEdit(c,new Date(a))}var s,k="urn:webodf:names:editinfo",q={},g=void 0!==m.editInfoMarkersInitiallyVisible?Boolean(m.editInfoMarkersInitiallyVisible):!0,p=void 0!==m.caretAvatarsInitiallyVisible?Boolean(m.caretAvatarsInitiallyVisible):!0,r=void 0!==m.caretBlinksOnRangeSelect?Boolean(m.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=
function(){g||(g=!0,b(g))};this.hideEditInfoMarkers=function(){g&&(g=!1,b(g))};this.showCaretAvatars=function(){p||(p=!0,h(p))};this.hideCaretAvatars=function(){p&&(p=!1,h(p))};this.getSession=function(){return l};this.getCaret=function(a){return e.getCaret(a)};this.destroy=function(b){var c=l.getOdtDocument(),g=l.getMemberModel(),h=Object.keys(q).map(function(a){return q[a]});c.subscribe(ops.OdtDocument.signalCursorAdded,n);c.subscribe(ops.OdtDocument.signalCursorRemoved,f);c.subscribe(ops.OdtDocument.signalParagraphChanged,
d);e.getCarets().forEach(function(b){g.unsubscribeMemberDetailsUpdates(b.getCursor().getMemberId(),a)});s.parentNode.removeChild(s);(function t(a,c){c?b(c):a<h.length?h[a].destroy(function(b){t(a+1,b)}):b()})(0,void 0)};(function(){var a=l.getOdtDocument(),b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,n);a.subscribe(ops.OdtDocument.signalCursorRemoved,f);a.subscribe(ops.OdtDocument.signalParagraphChanged,d);s=document.createElementNS(b.namespaceURI,"style");
s.type="text/css";s.media="screen, print, handheld, projection";s.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));s.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(s)})()}}();
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
runtime.loadClass("gui.Caret");
gui.CaretManager=function(m){function l(a){return d.hasOwnProperty(a)?d[a]:null}function e(){return Object.keys(d).map(function(a){return d[a]})}function c(){return m.getSession().getOdtDocument().getOdfCanvas().getElement()}function b(a){a===m.getInputMemberId()&&c().removeAttribute("tabindex");delete d[a]}function h(a){a=a.getMemberId();a===m.getInputMemberId()&&(a=l(a))&&a.refreshCursorBlinking()}function a(a){a.memberId===m.getInputMemberId()&&(a=l(a.memberId))&&a.ensureVisible()}function n(){var a=
l(m.getInputMemberId());a&&a.setFocus()}function f(){var a=l(m.getInputMemberId());a&&a.removeFocus()}var d={};this.registerCursor=function(a,b,e){var f=a.getMemberId(),h=c();b=new gui.Caret(a,b,e);d[f]=b;f===m.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+f),a.handleUpdate=b.ensureVisible,h.setAttribute("tabindex",0),h.focus());return b};this.getCaret=l;this.getCarets=e;this.destroy=function(d){var f=m.getSession().getOdtDocument(),l=c(),g=e();f.unsubscribe(ops.OdtDocument.signalParagraphChanged,
a);f.unsubscribe(ops.OdtDocument.signalCursorMoved,h);f.unsubscribe(ops.OdtDocument.signalCursorRemoved,b);l.onfocus=null;l.onblur=null;(function r(a,b){b?d(b):a<g.length?g[a].destroy(function(b){r(a+1,b)}):d()})(0,void 0)};(function(){var d=m.getSession().getOdtDocument(),e=c();d.subscribe(ops.OdtDocument.signalParagraphChanged,a);d.subscribe(ops.OdtDocument.signalCursorMoved,h);d.subscribe(ops.OdtDocument.signalCursorRemoved,b);e.onfocus=n;e.onblur=f})()};
// Input 75
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var m=new xmldom.XPath,l=runtime.getWindow();return function(e){var c=this;c.setInitialSlideMode=function(){c.startSlideMode("single")};c.keyDownHandler=function(b){if(!b.target.isContentEditable&&"input"!==b.target.nodeName)switch(b.keyCode){case 84:c.toggleToolbar();break;case 37:case 8:c.prevSlide();break;case 39:case 32:c.nextSlide();break;case 36:c.firstSlide();break;case 35:c.lastSlide()}};c.root=function(){return c.odf_canvas.odfContainer().rootElement};c.firstSlide=
function(){c.slideChange(function(b,c){return 0})};c.lastSlide=function(){c.slideChange(function(b,c){return c-1})};c.nextSlide=function(){c.slideChange(function(b,c){return b+1<c?b+1:-1})};c.prevSlide=function(){c.slideChange(function(b,c){return 1>b?-1:b-1})};c.slideChange=function(b){var e=c.getPages(c.odf_canvas.odfContainer().rootElement),a=-1,m=0;e.forEach(function(b){b=b[1];b.hasAttribute("slide_current")&&(a=m,b.removeAttribute("slide_current"));m+=1});b=b(a,e.length);-1===b&&(b=a);e[b][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=b;"cont"===c.slide_mode&&l.scrollBy(0,e[b][1].getBoundingClientRect().top-30)};c.selectSlide=function(b){c.slideChange(function(c,a){return b>=a||0>b?-1:b})};c.scrollIntoContView=function(b){var e=c.getPages(c.odf_canvas.odfContainer().rootElement);0!==e.length&&l.scrollBy(0,e[b][1].getBoundingClientRect().top-30)};c.getPages=function(b){b=b.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var c=[],a;for(a=0;a<b.length;a+=1)c.push([b[a].getAttribute("draw:name"),
b[a]]);return c};c.fillPageList=function(b,e){for(var a=c.getPages(b),l,f,d;e.firstChild;)e.removeChild(e.firstChild);for(l=0;l<a.length;l+=1)f=document.createElement("option"),d=m.getODFElementsWithXPath(a[l][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),d=0<d.length?d[0].textContent:a[l][0],f.textContent=l+1+": "+d,e.appendChild(f)};c.startSlideMode=function(b){var e=document.getElementById("pagelist"),a=c.odf_canvas.slidevisibilitycss().sheet;for(c.slide_mode=
b;0<a.cssRules.length;)a.deleteRule(0);c.selectSlide(0);"single"===c.slide_mode?(a.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),a.insertRule("draw|page[slide_current]  { z-index:2;}",1),a.insertRule("draw|page  { -webkit-transform: scale(1);}",2),c.fitToWindow(),l.addEventListener("resize",c.fitToWindow,!1)):"cont"===c.slide_mode&&l.removeEventListener("resize",c.fitToWindow,!1);c.fillPageList(c.odf_canvas.odfContainer().rootElement,e)};c.toggleToolbar=function(){var b,
e,a;b=c.odf_canvas.slidevisibilitycss().sheet;e=-1;for(a=0;a<b.cssRules.length;a+=1)if(".toolbar"===b.cssRules[a].cssText.substring(0,8)){e=a;break}-1<e?b.deleteRule(e):b.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};c.fitToWindow=function(){var b=c.getPages(c.root()),e=(l.innerHeight-40)/b[0][1].clientHeight,b=(l.innerWidth-10)/b[0][1].clientWidth,e=e<b?e:b,b=c.odf_canvas.slidevisibilitycss().sheet;b.deleteRule(2);b.insertRule("draw|page { \n-moz-transform: scale("+
e+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+e+"); -o-transform-origin: 0% 0%; -o-transform: scale("+e+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+e+"); }",2)};c.load=function(b){c.odf_canvas.load(b)};c.odf_element=e;c.odf_canvas=new odf.OdfCanvas(c.odf_element);c.odf_canvas.addListener("statereadychange",c.setInitialSlideMode);c.slide_mode="undefined";document.addEventListener("keydown",c.keyDownHandler,!1)}}();
// Input 76
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(m,l){function e(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function c(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(){var a=m.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!p)||(a=a.getRangeAt(0),p.setPoint(a.startContainer,a.startOffset))}function h(){var a=m.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();p&&p.node()&&(b=p.node(),c=b.ownerDocument.createRange(),
c.setStart(b,p.position()),c.collapse(!0),a.addRange(c))}function a(a){var d=a.charCode||a.keyCode;if(p=null,p&&37===d)b(),p.stepBackward(),h();else if(16<=d&&20>=d||33<=d&&40>=d)return;c(a)}function n(a){c(a)}function f(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&f(b),b=b.nextSibling||b.parentNode;var c,d,e,b=a.attributes;c="";for(e=b.length-1;0<=e;e-=1)d=b.item(e),c=c+" "+d.nodeName+'="'+d.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(d=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&d.test(c.nodeValue)&&c.parentNode.removeChild(c)}function d(a,b){for(var c=a.firstChild,e,f,g;c&&c!==a;){if(c.nodeType===Node.ELEMENT_NODE)for(d(c,b),e=c.attributes,g=e.length-1;0<=g;g-=1)f=e.item(g),"http://www.w3.org/2000/xmlns/"!==f.namespaceURI||b[f.nodeValue]||(b[f.nodeValue]=f.localName);c=c.nextSibling||c.parentNode}}function s(){var a=m.ownerDocument.createElement("style"),b;b={};d(m,b);
var c={},e,f,g=0;for(e in b)if(b.hasOwnProperty(e)&&e){f=b[e];if(!f||c.hasOwnProperty(f)||"xmlns"===f){do f="ns"+g,g+=1;while(c.hasOwnProperty(f));b[e]=f}c[f]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+k;a.appendChild(m.ownerDocument.createTextNode(b));l=l.parentNode.replaceChild(a,l)}var k,q,g,p=null;m.id||(m.id="xml"+String(Math.random()).substring(2));q="#"+m.id+" ";k=q+"*,"+q+":visited, "+q+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
q+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+q+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+q+"{overflow: auto;}\n";(function(b){e(b,"click",n);e(b,"keydown",a);e(b,"drop",c);e(b,"dragend",c);e(b,"beforepaste",c);e(b,"paste",c)})(m);this.updateCSS=s;this.setXML=function(a){a=a.documentElement||a;g=a=m.ownerDocument.importNode(a,!0);for(f(a);m.lastChild;)m.removeChild(m.lastChild);m.appendChild(a);s();p=new core.PositionIterator(a)};this.getXML=
function(){return g}};
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(m,l){};gui.UndoManager.prototype.unsubscribe=function(m,l){};gui.UndoManager.prototype.setOdtDocument=function(m){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(m){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(m){};gui.UndoManager.prototype.moveBackward=function(m){};gui.UndoManager.prototype.onOperationExecuted=function(m){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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
gui.UndoStateRules=function(){function m(e){return e.spec().optype}function l(e){switch(m(e)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=m;this.isEditOperation=l;this.isPartOfOperationSet=function(e,c){if(l(e)){if(0===c.length)return!0;var b;if(b=l(c[c.length-1]))a:{b=c.filter(l);var h=m(e),a;b:switch(h){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&h===m(b[0])){if(1===b.length){b=!0;break a}h=b[b.length-2].spec().position;
b=b[b.length-1].spec().position;a=e.spec().position;if(b===a-(b-h)){b=!0;break a}}b=!1}return b}return!0}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.UndoManager");runtime.loadClass("gui.UndoStateRules");
gui.TrivialUndoManager=function(m){function l(){r.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:a.hasUndoStates(),redoAvailable:a.hasRedoStates()})}function e(){q!==d&&q!==g[g.length-1]&&g.push(q)}function c(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);n.normalizeTextNodes(b)}function b(a){return Object.keys(a).map(function(b){return a[b]})}function h(a){function c(a){var b=a.spec();if(f[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete f[b.memberid],g-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},f={},g,h=a.pop();k.getCursors().forEach(function(a){f[a.getMemberId()]=!0});for(g=Object.keys(f).length;h&&0<g;)h.reverse(),h.forEach(c),h=a.pop();return b(d).concat(b(e))}var a=this,n=new core.DomUtils,f,d=[],s,k,q=[],g=[],p=[],r=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=m||new gui.UndoStateRules;this.subscribe=function(a,b){r.subscribe(a,b)};this.unsubscribe=function(a,b){r.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<g.length};this.hasRedoStates=function(){return 0<p.length};this.setOdtDocument=function(a){k=a};this.resetInitialState=function(){g.length=0;p.length=0;d.length=0;q.length=0;f=null;l()};this.saveInitialState=function(){var a=k.getOdfCanvas().odfContainer(),b=k.getOdfCanvas().getAnnotationManager();b&&b.forgetAnnotations();f=a.rootElement.cloneNode(!0);
k.getOdfCanvas().refreshAnnotations();a=f;n.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(c);n.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(c);e();g.unshift(d);q=d=h(g);g.length=0;p.length=0;l()};this.setPlaybackFunction=function(a){s=a};this.onOperationExecuted=function(a){p.length=0;w.isEditOperation(a)&&q===d||!w.isPartOfOperationSet(a,q)?(e(),q=[a],g.push(q),r.emit(gui.UndoManager.signalUndoStateCreated,{operations:q}),l()):(q.push(a),r.emit(gui.UndoManager.signalUndoStateModified,
{operations:q}))};this.moveForward=function(a){for(var b=0,c;a&&p.length;)c=p.pop(),g.push(c),c.forEach(s),a-=1,b+=1;b&&(q=g[g.length-1],l());return b};this.moveBackward=function(a){for(var b=k.getOdfCanvas(),c=b.odfContainer(),e=0;a&&g.length;)p.push(g.pop()),a-=1,e+=1;e&&(c.setRootElement(f.cloneNode(!0)),b.setOdfContainer(c,!0),r.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),k.getCursors().forEach(function(a){k.removeCursor(a.getMemberId())}),d.forEach(s),g.forEach(function(a){a.forEach(s)}),
b.refreshCSS(),q=g[g.length-1]||d,l());return e}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("odf.OdfUtils");runtime.loadClass("gui.SelectionMover");runtime.loadClass("gui.StyleHelper");runtime.loadClass("core.PositionFilterChain");
ops.OdtDocument=function(m){function l(){var a=m.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function e(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var d=f[a].getNode();return b(c)===b(d)?s:k}}function c(a){var b=
gui.SelectionMover.createPositionIterator(l());for(a+=1;0<a&&b.nextPosition();)1===q.acceptPosition(b)&&(a-=1);return b}function b(a){return n.getParagraphElement(a)}function h(a){return m.getFormatting().getStyleElement(a,"paragraph")}var a=this,n,f={},d=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalStyleCreated,
ops.OdtDocument.signalStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),s=core.PositionFilter.FilterResult.FILTER_ACCEPT,k=core.PositionFilter.FilterResult.FILTER_REJECT,q;this.getIteratorAtPosition=c;this.upgradeWhitespacesAtPosition=function(a){a=c(a);var b,d,e;a.previousPosition();a.previousPosition();for(e=-1;1>=e;e+=1){b=a.container();d=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[d]&&n.isSignificantWhitespace(b,
d)){runtime.assert(" "===b.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=b.ownerDocument.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s");f.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(d,1);0<d&&(b=b.splitText(d));b.parentNode.insertBefore(f,b);b=f;a.moveToEndOfNode(b)}a.nextPosition()}};this.getParagraphStyleElement=h;this.getParagraphElement=b;this.getParagraphStyleAttributes=function(a){return(a=h(a))?m.getFormatting().getInheritedStyleAttributes(a):
null};this.getPositionInTextNode=function(b,c){var d=gui.SelectionMover.createPositionIterator(l()),e=null,h,k=0,m=null,n=b;runtime.assert(0<=b,"position must be >= 0");1===q.acceptPosition(d)?(h=d.container(),h.nodeType===Node.TEXT_NODE&&(e=h,k=0)):b+=1;for(;0<b||null===e;){if(!d.nextPosition())return null;if(1===q.acceptPosition(d))if(b-=1,h=d.container(),h.nodeType===Node.TEXT_NODE)h!==e?(e=h,k=d.domOffset()):k+=1;else if(null!==e){if(0===b){k=e.length;break}e=null}else if(0===b){e=l().ownerDocument.createTextNode("");
h.insertBefore(e,d.rightNode());k=0;break}}if(null===e)return null;if(c&&f[c]&&a.getCursorPosition(c)===n){for(m=f[c].getNode();0===k&&m.nextSibling&&"cursor"===m.nextSibling.localName;)m.parentNode.insertBefore(m,m.nextSibling.nextSibling);m&&0<e.length&&(e=l().ownerDocument.createTextNode(""),k=0,m.parentNode.insertBefore(e,m.nextSibling))}for(;0===k&&(e.previousSibling&&"cursor"===e.previousSibling.localName)&&(h=e.previousSibling,0<e.length&&(e=l().ownerDocument.createTextNode("")),h.parentNode.insertBefore(e,
h),m!==h););for(;e.previousSibling&&e.previousSibling.nodeType===Node.TEXT_NODE;)e.previousSibling.appendData(e.data),k=e.length+e.previousSibling.length,e=e.previousSibling,e.parentNode.removeChild(e.nextSibling);return{textNode:e,offset:k}};this.fixCursorPositions=function(b){var c,d,e,h=new core.PositionFilterChain;h.addFilter("BaseFilter",a.getPositionFilter());for(c in f)f.hasOwnProperty(c)&&(h.addFilter("RootFilter",a.createRootFilter(c)),d=f[c],e=d.getStepCounter(),e.isPositionWalkable(h)?
0===a.getCursorSelection(c).length&&d.move(0):(e=e.countStepsToValidPosition(h),d.move(e),c===b&&a.emit(ops.OdtDocument.signalCursorMoved,d)),h.removeFilter("RootFilter"))};this.getWalkableParagraphLength=function(a){var d=c(0),e=0;d.setUnfilteredPosition(a,0);do{if(b(d.container())!==a)break;1===q.acceptPosition(d)&&(e+=1)}while(d.nextPosition());return e};this.getDistanceFromCursor=function(a,b,c){a=f[a];var d=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");
a&&(a=a.getStepCounter().countStepsToPosition,d=a(b,c,q));return d};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,l(),0)};this.getCursorSelection=function(a){var b;a=f[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(l(),0,q),b=b(a.getAnchorNode(),0,q));return{position:c+b,length:-b}};this.getPositionFilter=function(){return q};this.getOdfCanvas=function(){return m};this.getRootNode=l;this.getDOM=function(){return l().ownerDocument};this.getCursor=function(a){return f[a]};
this.getCursors=function(){var a=[],b;for(b in f)f.hasOwnProperty(b)&&a.push(f[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countForwardSteps(1,q),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!f[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);a.move(b);f[c]=a};this.removeCursor=function(b){var c=f[b];return c?(c.removeFromOdtDocument(),
delete f[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=m.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return m.getFormatting()};this.getTextElements=function(a,b){return n.getTextElements(a,b)};this.getParagraphElements=function(a){return n.getParagraphElements(a)};
this.emit=function(a,b){d.emit(a,b)};this.subscribe=function(a,b){d.subscribe(a,b)};this.unsubscribe=function(a,b){d.unsubscribe(a,b)};this.createRootFilter=function(a){return new e(a)};this.close=function(a){a()};this.destroy=function(a){a()};q=new function(){function a(b,c,d){var e,f;if(c&&(e=n.lookLeftForCharacter(c),1===e||2===e&&(n.scanRightForAnyCharacter(d)||n.scanRightForAnyCharacter(n.nextNode(b)))))return s;e=null===c&&n.isParagraph(b);f=n.lookRightForCharacter(d);if(e)return f?s:n.scanRightForAnyCharacter(d)?
k:s;if(!f)return k;c=c||n.previousNode(b);return n.scanLeftForAnyCharacter(c)?k:s}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,e,f,h;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return k;if(d===Node.TEXT_NODE){if(!n.isGroupingElement(c.parentNode)||n.isWithinTrackedChanges(c.parentNode,l()))return k;d=b.unfilteredDomOffset();e=c.data;runtime.assert(d!==e.length,"Unexpected offset.");if(0<d){b=e.substr(d-1,1);if(!n.isODFWhitespace(b))return s;if(1<d)if(b=e.substr(d-2,1),!n.isODFWhitespace(b))f=
s;else{if(!n.isODFWhitespace(e.substr(0,d)))return k}else h=n.previousNode(c),n.scanLeftForNonWhitespace(h)&&(f=s);if(f===s)return n.isTrailingWhitespace(c,d)?k:s;f=e.substr(d,1);return n.isODFWhitespace(f)?k:n.scanLeftForAnyCharacter(n.previousNode(c))?k:s}h=b.leftNode();f=c;c=c.parentNode;f=a(c,h,f)}else!n.isGroupingElement(c)||n.isWithinTrackedChanges(c,l())?f=k:(h=b.leftNode(),f=b.rightNode(),f=a(c,h,f));return f}};n=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";
ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalStyleCreated="style/created";ops.OdtDocument.signalStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";(function(){return ops.OdtDocument})();
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
runtime.loadClass("ops.TrivialMemberModel");runtime.loadClass("ops.TrivialOperationRouter");runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OdtDocument");
ops.Session=function(m){var l=new ops.OperationFactory,e=new ops.OdtDocument(m),c=new ops.TrivialMemberModel,b=null;this.setMemberModel=function(b){c=b};this.setOperationFactory=function(c){l=c;b&&b.setOperationFactory(l)};this.setOperationRouter=function(c){b=c;c.setPlaybackFunction(function(a){a.execute(e);e.emit(ops.OdtDocument.signalOperationExecuted,a)});c.setOperationFactory(l)};this.getMemberModel=function(){return c};this.getOperationFactory=function(){return l};this.getOdtDocument=function(){return e};
this.enqueue=function(c){b.push(c)};this.close=function(h){b.close(function(a){a?h(a):c.close(function(a){a?h(a):e.close(h)})})};this.destroy=function(b){e.destroy(b)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 82
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\noffice|text * draw|text-box {\n    /** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
