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
Runtime.prototype.read=function(l,m,e,c){};Runtime.prototype.readFile=function(l,m,e){};Runtime.prototype.readFileSync=function(l,m){};Runtime.prototype.loadXML=function(l,m){};Runtime.prototype.writeFile=function(l,m,e){};Runtime.prototype.isFile=function(l,m){};Runtime.prototype.getFileSize=function(l,m){};Runtime.prototype.deleteFile=function(l,m){};Runtime.prototype.log=function(l,m){};Runtime.prototype.setTimeout=function(l,m){};Runtime.prototype.clearTimeout=function(l){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(l){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(l,m,e){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(l,m){function e(b){var a="",h,f=b.length;for(h=0;h<f;h+=1)a+=String.fromCharCode(b[h]&255);return a}function c(b){var a="",h,f=b.length,d,c,k,q;for(h=0;h<f;h+=1)d=b[h],128>d?a+=String.fromCharCode(d):(h+=1,c=b[h],194<=d&&224>d?a+=String.fromCharCode((d&31)<<6|c&63):(h+=1,k=b[h],224<=d&&240>d?a+=String.fromCharCode((d&15)<<12|(c&63)<<6|k&63):(h+=1,q=b[h],240<=d&&245>d&&(d=(d&7)<<18|(c&63)<<12|(k&63)<<6|q&63,d-=65536,a+=String.fromCharCode((d>>10)+55296,(d&1023)+56320)))));
return a}var b;"utf8"===m?b=c(l):("binary"!==m&&this.log("Unsupported encoding: "+m),b=e(l));return b};Runtime.getVariable=function(l){try{return eval(l)}catch(m){}};Runtime.toJson=function(l){return JSON.stringify(l)};Runtime.fromJson=function(l){return JSON.parse(l)};Runtime.getFunctionName=function(l){return void 0===l.name?(l=/function\s+(\w+)/.exec(l))&&l[1]:l.name};
function BrowserRuntime(l){function m(a,h){var f,d,b;void 0!==h?b=a:h=a;l?(d=l.ownerDocument,b&&(f=d.createElement("span"),f.className=b,f.appendChild(d.createTextNode(b)),l.appendChild(f),l.appendChild(d.createTextNode(" "))),f=d.createElement("span"),0<h.length&&"<"===h[0]?f.innerHTML=h:f.appendChild(d.createTextNode(h)),l.appendChild(f),l.appendChild(d.createElement("br"))):console&&console.log(h);"alert"===b&&alert(h)}function e(a,h,f){function d(){var d;4===e.readyState&&(0!==e.status||e.responseText?
200===e.status||0===e.status?(d="binary"===h?null!==e.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(e.responseBody)).toArray():c.byteArrayFromString(e.responseText,"binary"):e.responseText,b[a]=d,f(null,d)):f(e.responseText||e.statusText):f("File "+a+" is empty."))}if(b.hasOwnProperty(a))f(null,b[a]);else{var e=new XMLHttpRequest;e.open("GET",a,!0);e.onreadystatechange=d;e.overrideMimeType&&("binary"!==h?e.overrideMimeType("text/plain; charset="+h):e.overrideMimeType("text/plain; charset=x-user-defined"));
try{e.send(null)}catch(k){f(k.message)}}}var c=this,b={},n=window.ArrayBuffer&&window.Uint8Array;n&&(Uint8Array.prototype.slice=function(a,h){void 0===h&&(void 0===a&&(a=0),h=this.length);var f=this.subarray(a,h),d,b;h-=a;d=new Uint8Array(new ArrayBuffer(h));for(b=0;b<h;b+=1)d[b]=f[b];return d});this.ByteArray=n?function(a){return new Uint8Array(new ArrayBuffer(a))}:function(a){var h=[];h.length=a;return h};this.concatByteArrays=n?function(a,h){var f,d=a.length,b=h.length,k=new this.ByteArray(d+b);
for(f=0;f<d;f+=1)k[f]=a[f];for(f=0;f<b;f+=1)k[f+d]=h[f];return k}:function(a,h){return a.concat(h)};this.byteArrayFromArray=function(a){return a.slice()};this.byteArrayFromString=function(a,h){var f;if("utf8"===h){f=a.length;var d,b,k,e=0;for(b=0;b<f;b+=1)k=a.charCodeAt(b),e+=1+(128<k)+(2048<k);d=new c.ByteArray(e);for(b=e=0;b<f;b+=1)k=a.charCodeAt(b),128>k?(d[e]=k,e+=1):2048>k?(d[e]=192|k>>>6,d[e+1]=128|k&63,e+=2):(d[e]=224|k>>>12&15,d[e+1]=128|k>>>6&63,d[e+2]=128|k&63,e+=3)}else for("binary"!==
h&&c.log("unknown encoding: "+h),f=a.length,d=new c.ByteArray(f),b=0;b<f;b+=1)d[b]=a.charCodeAt(b)&255;return f=d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=e;this.read=function(a,h,f,d){function e(){var g;4===k.readyState&&(0!==k.status||k.responseText?200===k.status||0===k.status?(k.response?(g=k.response,g=new Uint8Array(g)):g=null!==k.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(k.responseBody)).toArray():c.byteArrayFromString(k.responseText,"binary"),b[a]=g,d(null,g.slice(h,h+f))):d(k.responseText||k.statusText):d("File "+a+" is empty."))}if(b.hasOwnProperty(a))d(null,b[a].slice(h,h+f));else{var k=new XMLHttpRequest;k.open("GET",a,!0);k.onreadystatechange=e;k.overrideMimeType&&k.overrideMimeType("text/plain; charset=x-user-defined");k.responseType="arraybuffer";try{k.send(null)}catch(q){d(q.message)}}};this.readFileSync=function(a,h){var f=new XMLHttpRequest,
d;f.open("GET",a,!1);f.overrideMimeType&&("binary"!==h?f.overrideMimeType("text/plain; charset="+h):f.overrideMimeType("text/plain; charset=x-user-defined"));try{if(f.send(null),200===f.status||0===f.status)d=f.responseText}catch(b){}return d};this.writeFile=function(a,h,f){b[a]=h;var d=new XMLHttpRequest;d.open("PUT",a,!0);d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200<=d.status&&300>d.status||0===d.status?f(null):f("Status "+String(d.status)+": "+d.responseText||
d.statusText):f("File "+a+" is empty."))};h=h.buffer&&!d.sendAsBinary?h.buffer:c.byteArrayToString(h,"binary");try{d.sendAsBinary?d.sendAsBinary(h):d.send(h)}catch(e){c.log("HUH? "+e+" "+h),f(e.message)}};this.deleteFile=function(a,h){delete b[a];var f=new XMLHttpRequest;f.open("DELETE",a,!0);f.onreadystatechange=function(){4===f.readyState&&(200>f.status&&300<=f.status?h(f.responseText):h(null))};f.send(null)};this.loadXML=function(a,h){var f=new XMLHttpRequest;f.open("GET",a,!0);f.overrideMimeType&&
f.overrideMimeType("text/xml");f.onreadystatechange=function(){4===f.readyState&&(0!==f.status||f.responseText?200===f.status||0===f.status?h(null,f.responseXML):h(f.responseText):h("File "+a+" is empty."))};try{f.send(null)}catch(d){h(d.message)}};this.isFile=function(a,h){c.getFileSize(a,function(a){h(-1!==a)})};this.getFileSize=function(a,h){var f=new XMLHttpRequest;f.open("HEAD",a,!0);f.onreadystatechange=function(){if(4===f.readyState){var d=f.getResponseHeader("Content-Length");d?h(parseInt(d,
10)):e(a,"binary",function(d,k){d?h(-1):h(k.length)})}};f.send(null)};this.log=m;this.assert=function(a,h,f){if(!a)throw m("alert","ASSERTION FAILED:\n"+h),f&&f(),h;};this.setTimeout=function(a,h){return setTimeout(function(){a()},h)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){m("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function l(h,a,d){h=c.resolve(b,h);"binary"!==a?e.readFile(h,a,d):e.readFile(h,null,d)}var m=this,e=require("fs"),c=require("path"),b="",n,a;this.ByteArray=function(h){return new Buffer(h)};this.byteArrayFromArray=function(h){var a=new Buffer(h.length),d,b=h.length;for(d=0;d<b;d+=1)a[d]=h[d];return a};this.concatByteArrays=function(h,a){var d=new Buffer(h.length+a.length);h.copy(d,0,0);a.copy(d,h.length,0);return d};this.byteArrayFromString=function(a,b){return new Buffer(a,
b)};this.byteArrayToString=function(a,b){return a.toString(b)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=l;this.loadXML=function(a,b){l(a,"utf-8",function(d,a){if(d)return b(d);b(null,m.parseXML(a))})};this.writeFile=function(a,f,d){a=c.resolve(b,a);e.writeFile(a,f,"binary",function(a){d(a||null)})};this.deleteFile=function(a,f){a=c.resolve(b,a);e.unlink(a,f)};this.read=function(a,f,d,n){a=c.resolve(b,a);e.open(a,"r+",666,function(a,
h){if(a)n(a);else{var g=new Buffer(d);e.read(h,g,0,d,f,function(d){e.close(h);n(d,g)})}})};this.readFileSync=function(a,b){return b?"binary"===b?e.readFileSync(a,null):e.readFileSync(a,b):""};this.isFile=function(a,f){a=c.resolve(b,a);e.stat(a,function(d,a){f(!d&&a.isFile())})};this.getFileSize=function(a,f){a=c.resolve(b,a);e.stat(a,function(d,a){d?f(-1):f(a.size)})};this.log=function(a,b){var d;void 0!==b?d=a:b=a;"alert"===d&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(b+
"\n");"alert"===d&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,b,d){a||(process.stderr.write("ASSERTION FAILED: "+b),d&&d())};this.setTimeout=function(a,b){return setTimeout(function(){a()},b)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){b=a};this.currentDirectory=function(){return b};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=
function(a){return n.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};n=new (require("xmldom").DOMParser);a=m.parseXML("<a/>").implementation}
function RhinoRuntime(){function l(a,b){var f;void 0!==b?f=a:b=a;"alert"===f&&print("\n!!!!! ALERT !!!!!");print(b);"alert"===f&&print("!!!!! ALERT !!!!!")}var m=this,e=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),c,b,n="";e.setValidating(!1);e.setNamespaceAware(!0);e.setExpandEntityReferences(!1);e.setSchema(null);b=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,b){var f=new Packages.java.io.FileReader(b);return new Packages.org.xml.sax.InputSource(f)}});c=e.newDocumentBuilder();
c.setEntityResolver(b);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,b){var f=[],d,c=a.length;for(d=0;d<c;d+=1)f[d]=a.charCodeAt(d)&255;return f};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,b){return a.concat(b)};this.loadXML=function(a,b){var f=new Packages.java.io.File(a),d;try{d=c.parse(f)}catch(e){print(e);
b(e);return}b(null,d)};this.readFile=function(a,b,f){n&&(a=n+"/"+a);var d=new Packages.java.io.File(a),c="binary"===b?"latin1":b;d.isFile()?(a=readFile(a,c),"binary"===b&&(a=m.byteArrayFromString(a,"binary")),f(null,a)):f(a+" is not a file.")};this.writeFile=function(a,b,f){n&&(a=n+"/"+a);a=new Packages.java.io.FileOutputStream(a);var d,c=b.length;for(d=0;d<c;d+=1)a.write(b[d]);a.close();f(null)};this.deleteFile=function(a,b){n&&(a=n+"/"+a);(new Packages.java.io.File(a))["delete"]()?b(null):b("Could not delete "+
a)};this.read=function(a,b,f,d){n&&(a=n+"/"+a);var c;c=a;var k="binary";(new Packages.java.io.File(c)).isFile()?("binary"===k&&(k="latin1"),c=readFile(c,k)):c=null;c?d(null,this.byteArrayFromString(c.substring(b,b+f),"binary")):d("Cannot read "+a)};this.readFileSync=function(a,b){return b?readFile(a,b):""};this.isFile=function(a,b){n&&(a=n+"/"+a);var f=new Packages.java.io.File(a);b(f.isFile())};this.getFileSize=function(a,b){n&&(a=n+"/"+a);var f=new Packages.java.io.File(a);b(f.length())};this.log=
l;this.assert=function(a,b,f){a||(l("alert","ASSERTION FAILED: "+b),f&&f())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){n=a};this.currentDirectory=function(){return n};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return c.getDOMImplementation()};this.parseXML=function(a){return c.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function l(c){var b=c[0],e;e=eval("if (typeof "+b+" === 'undefined') {eval('"+b+" = {};');}"+b);for(b=1;b<c.length-1;b+=1)e=e.hasOwnProperty(c[b])?e[c[b]]:e[c[b]]={};return e[c[c.length-1]]}var m={},e={};runtime.loadClass=function(c){function b(a){a=a.replace(/\./g,"/")+".js";var d=runtime.libraryPaths(),b,k,h;runtime.currentDirectory&&d.push(runtime.currentDirectory());for(b=0;b<d.length;b+=1){k=d[b];if(!e.hasOwnProperty(k))try{h=runtime.readFileSync(d[b]+"/manifest.js","utf8"),e[k]=
h&&h.length?eval(h):null}catch(g){e[k]=null,runtime.log("Cannot load manifest for "+k+".")}h=null;if((k=e[k])&&k.indexOf&&-1!==k.indexOf(a))return d[b]+"/"+a}return null}function n(a){var d,h;h=b(a);if(!h)throw a+" is not listed in any manifest.js.";try{d=runtime.readFileSync(h,"utf8")}catch(k){throw runtime.log("Error loading "+a+" "+k),k;}if(void 0===d)throw"Cannot load class "+a;d=d+("\n//# sourceURL="+h)+("\n//@ sourceURL="+h);try{d=eval(a+" = eval(code);")}catch(c){throw runtime.log("Error loading "+
a+" "+c),c;}return d}if(!IS_COMPILED_CODE&&!m.hasOwnProperty(c)){var a=c.split("."),h;h=l(a);if(!h&&(h=n(c),!h||Runtime.getFunctionName(h)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];m[c]=!0}}})();
(function(l){function m(e){if(e.length){var c=e[0];runtime.readFile(c,"utf8",function(b,n){function a(){var a;(a=eval(f))&&runtime.exit(a)}var h="",f=n;-1!==c.indexOf("/")&&(h=c.substring(0,c.indexOf("/")));runtime.setCurrentDirectory(h);b||null===f?(runtime.log(b),runtime.exit(1)):a.apply(null,e)})}}l=l?Array.prototype.slice.call(l):[];"NodeJSRuntime"===runtime.type()?m(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?m(l):m(l.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function l(a){var d=[],b,k=a.length;for(b=0;b<k;b+=1)d[b]=a.charCodeAt(b)&255;return d}function m(a){var d,b="",k,g=a.length-2;for(k=0;k<g;k+=3)d=a[k]<<16|a[k+1]<<8|a[k+2],b+=p[d>>>18],b+=p[d>>>12&63],b+=p[d>>>6&63],b+=p[d&63];k===g+1?(d=a[k]<<4,b+=p[d>>>6],b+=p[d&63],b+="=="):k===g&&(d=a[k]<<10|a[k+1]<<2,b+=p[d>>>12],b+=p[d>>>6&63],b+=p[d&63],b+="=");return b}function e(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var d=[],b=a.length%4,k,g=a.length,h;for(k=0;k<g;k+=4)h=(r[a.charAt(k)]||
0)<<18|(r[a.charAt(k+1)]||0)<<12|(r[a.charAt(k+2)]||0)<<6|(r[a.charAt(k+3)]||0),d.push(h>>16,h>>8&255,h&255);d.length-=[0,0,2,1][b];return d}function c(a){var d=[],b,k=a.length,g;for(b=0;b<k;b+=1)g=a[b],128>g?d.push(g):2048>g?d.push(192|g>>>6,128|g&63):d.push(224|g>>>12&15,128|g>>>6&63,128|g&63);return d}function b(a){var d=[],b,k=a.length,g,h,f;for(b=0;b<k;b+=1)g=a[b],128>g?d.push(g):(b+=1,h=a[b],224>g?d.push((g&31)<<6|h&63):(b+=1,f=a[b],d.push((g&15)<<12|(h&63)<<6|f&63)));return d}function n(a){return m(l(a))}
function a(a){return String.fromCharCode.apply(String,e(a))}function h(a){return b(l(a))}function f(a){a=b(a);for(var d="",k=0;k<a.length;)d+=String.fromCharCode.apply(String,a.slice(k,k+45E3)),k+=45E3;return d}function d(a,d,b){var k="",g,h,f;for(f=d;f<b;f+=1)d=a.charCodeAt(f)&255,128>d?k+=String.fromCharCode(d):(f+=1,g=a.charCodeAt(f)&255,224>d?k+=String.fromCharCode((d&31)<<6|g&63):(f+=1,h=a.charCodeAt(f)&255,k+=String.fromCharCode((d&15)<<12|(g&63)<<6|h&63)));return k}function t(a,b){function k(){var c=
f+g;c>a.length&&(c=a.length);h+=d(a,f,c);f=c;c=f===a.length;b(h,c)&&!c&&runtime.setTimeout(k,0)}var g=1E5,h="",f=0;a.length<g?b(d(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),k())}function k(a){return c(l(a))}function q(a){return String.fromCharCode.apply(String,c(a))}function g(a){return String.fromCharCode.apply(String,c(l(a)))}var p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=function(a){var d={},b,k;b=0;for(k=a.length;b<k;b+=1)d[a.charAt(b)]=b;return d}(p),w,
u,z=runtime.getWindow(),y,v;z&&z.btoa?(y=function(a){return z.btoa(a)},w=function(a){return y(g(a))}):(y=n,w=function(a){return m(k(a))});z&&z.atob?(v=function(a){return z.atob(a)},u=function(a){a=v(a);return d(a,0,a.length)}):(v=a,u=function(a){return f(e(a))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=m;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=e;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=c;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=b;this.convertUTF8StringToBase64=n;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=h;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=f;this.convertUTF8StringToUTF16String=t;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=k;this.convertUTF16ArrayToUTF8String=q;this.convertUTF16StringToUTF8String=g;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=u;this.fromBase64=a;this.toBase64=n;this.atob=
v;this.btoa=y;this.utob=g;this.btou=t;this.encode=w;this.encodeURI=function(a){return w(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return u(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function l(){this.dl=this.fc=0}function m(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function e(a,d,b,k){this.good_length=a;this.max_lazy=d;this.nice_length=b;this.max_chain=k}function c(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=b;this.off=0}var b=8192,n,a,h,f,d=null,t,k,q,g,p,r,w,u,z,y,v,s,A,I,D,N,B,L,C,K,ea,pa,M,qa,Y,Z,Q,$,T,P,J,G,H,R,ca,fa,O,ba,ja,F,ma,ka,U,na,W,x,la,S,oa,ta,E,sa=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ha=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],ra=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ua=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],aa;aa=[new e(0,0,0,0),new e(4,4,8,4),new e(4,5,16,8),new e(4,6,32,32),new e(4,4,16,16),new e(8,16,32,32),new e(8,16,128,128),new e(8,32,128,256),new e(32,128,258,1024),new e(32,258,258,4096)];var ia=function(g){d[k+t++]=g;if(k+t===b){var f;if(0!==t){null!==n?(g=n,n=n.next):g=new c;
g.next=null;g.len=g.off=0;null===a?a=h=g:h=h.next=g;g.len=t-k;for(f=0;f<g.len;f++)g.ptr[f]=d[k+f];t=k=0}}},da=function(a){a&=65535;k+t<b-2?(d[k+t++]=a&255,d[k+t++]=a>>>8):(ia(a&255),ia(a>>>8))},V=function(){v=(v<<5^g[B+3-1]&255)&8191;s=w[32768+v];w[B&32767]=s;w[32768+v]=B},X=function(a,d){z>16-d?(u|=a<<z,da(u),u=a>>16-z,z+=d-16):(u|=a<<z,z+=d)},ga=function(a,d){X(d[a].fc,d[a].dl)},Aa=function(a,d,b){return a[d].fc<a[b].fc||a[d].fc===a[b].fc&&O[d]<=O[b]},Ba=function(a,d,b){var k;for(k=0;k<b&&E<ta.length;k++)a[d+
k]=ta.charCodeAt(E++)&255;return k},xa=function(){var a,d,b=65536-K-B;if(-1===b)b--;else if(65274<=B){for(a=0;32768>a;a++)g[a]=g[a+32768];L-=32768;B-=32768;y-=32768;for(a=0;8192>a;a++)d=w[32768+a],w[32768+a]=32768<=d?d-32768:0;for(a=0;32768>a;a++)d=w[a],w[a]=32768<=d?d-32768:0;b+=32768}C||(a=Ba(g,B+K,b),0>=a?C=!0:K+=a)},Ca=function(a){var d=ea,b=B,k,h=N,f=32506<B?B-32506:0,c=B+258,e=g[b+h-1],p=g[b+h];N>=qa&&(d>>=2);do if(k=a,g[k+h]===p&&g[k+h-1]===e&&g[k]===g[b]&&g[++k]===g[b+1]){b+=2;k++;do++b;while(g[b]===
g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&b<c);k=258-(c-b);b=c-258;if(k>h){L=a;h=k;if(258<=k)break;e=g[b+h-1];p=g[b+h]}a=w[a&32767]}while(a>f&&0!==--d);return h},va=function(a,d){r[U++]=d;0===a?Y[d].fc++:(a--,Y[ba[d]+256+1].fc++,Z[(256>a?ja[a]:ja[256+(a>>7)])&255].fc++,p[na++]=a,x|=la);la<<=1;0===(U&7)&&(ka[W++]=x,x=0,la=1);if(2<M&&0===(U&4095)){var b=8*U,k=B-y,g;for(g=0;30>g;g++)b+=Z[g].fc*(5+ha[g]);b>>=3;if(na<
parseInt(U/2,10)&&b<parseInt(k/2,10))return!0}return 8191===U||8192===na},ya=function(a,d){for(var b=R[d],k=d<<1;k<=ca;){k<ca&&Aa(a,R[k+1],R[k])&&k++;if(Aa(a,b,R[k]))break;R[d]=R[k];d=k;k<<=1}R[d]=b},Da=function(a,d){var b=0;do b|=a&1,a>>=1,b<<=1;while(0<--d);return b>>1},Ea=function(a,d){var b=[];b.length=16;var k=0,g;for(g=1;15>=g;g++)k=k+H[g-1]<<1,b[g]=k;for(k=0;k<=d;k++)g=a[k].dl,0!==g&&(a[k].fc=Da(b[g]++,g))},za=function(a){var d=a.dyn_tree,b=a.static_tree,k=a.elems,g,h=-1,f=k;ca=0;fa=573;for(g=
0;g<k;g++)0!==d[g].fc?(R[++ca]=h=g,O[g]=0):d[g].dl=0;for(;2>ca;)g=R[++ca]=2>h?++h:0,d[g].fc=1,O[g]=0,S--,null!==b&&(oa-=b[g].dl);a.max_code=h;for(g=ca>>1;1<=g;g--)ya(d,g);do g=R[1],R[1]=R[ca--],ya(d,1),b=R[1],R[--fa]=g,R[--fa]=b,d[f].fc=d[g].fc+d[b].fc,O[f]=O[g]>O[b]+1?O[g]:O[b]+1,d[g].dl=d[b].dl=f,R[1]=f++,ya(d,1);while(2<=ca);R[--fa]=R[1];f=a.dyn_tree;g=a.extra_bits;var k=a.extra_base,b=a.max_code,c=a.max_length,e=a.static_tree,p,s,q,n,r=0;for(s=0;15>=s;s++)H[s]=0;f[R[fa]].dl=0;for(a=fa+1;573>a;a++)p=
R[a],s=f[f[p].dl].dl+1,s>c&&(s=c,r++),f[p].dl=s,p>b||(H[s]++,q=0,p>=k&&(q=g[p-k]),n=f[p].fc,S+=n*(s+q),null!==e&&(oa+=n*(e[p].dl+q)));if(0!==r){do{for(s=c-1;0===H[s];)s--;H[s]--;H[s+1]+=2;H[c]--;r-=2}while(0<r);for(s=c;0!==s;s--)for(p=H[s];0!==p;)g=R[--a],g>b||(f[g].dl!==s&&(S+=(s-f[g].dl)*f[g].fc,f[g].fc=s),p--)}Ea(d,h)},Fa=function(a,d){var b,k=-1,g,h=a[0].dl,f=0,c=7,e=4;0===h&&(c=138,e=3);a[d+1].dl=65535;for(b=0;b<=d;b++)g=h,h=a[b+1].dl,++f<c&&g===h||(f<e?T[g].fc+=f:0!==g?(g!==k&&T[g].fc++,T[16].fc++):
10>=f?T[17].fc++:T[18].fc++,f=0,k=g,0===h?(c=138,e=3):g===h?(c=6,e=3):(c=7,e=4))},Ga=function(){8<z?da(u):0<z&&ia(u);z=u=0},Ha=function(a,d){var b,k=0,g=0,h=0,f=0,c,e;if(0!==U){do 0===(k&7)&&(f=ka[h++]),b=r[k++]&255,0===(f&1)?ga(b,a):(c=ba[b],ga(c+256+1,a),e=sa[c],0!==e&&(b-=F[c],X(b,e)),b=p[g++],c=(256>b?ja[b]:ja[256+(b>>7)])&255,ga(c,d),e=ha[c],0!==e&&(b-=ma[c],X(b,e))),f>>=1;while(k<U)}ga(256,a)},Ia=function(a,d){var b,k=-1,g,h=a[0].dl,f=0,c=7,e=4;0===h&&(c=138,e=3);for(b=0;b<=d;b++)if(g=h,h=a[b+
1].dl,!(++f<c&&g===h)){if(f<e){do ga(g,T);while(0!==--f)}else 0!==g?(g!==k&&(ga(g,T),f--),ga(16,T),X(f-3,2)):10>=f?(ga(17,T),X(f-3,3)):(ga(18,T),X(f-11,7));f=0;k=g;0===h?(c=138,e=3):g===h?(c=6,e=3):(c=7,e=4)}},Ja=function(){var a;for(a=0;286>a;a++)Y[a].fc=0;for(a=0;30>a;a++)Z[a].fc=0;for(a=0;19>a;a++)T[a].fc=0;Y[256].fc=1;x=U=na=W=S=oa=0;la=1},wa=function(a){var d,b,k,h;h=B-y;ka[W]=x;za(P);za(J);Fa(Y,P.max_code);Fa(Z,J.max_code);za(G);for(k=18;3<=k&&0===T[ua[k]].dl;k--);S+=3*(k+1)+14;d=S+3+7>>3;b=
oa+3+7>>3;b<=d&&(d=b);if(h+4<=d&&0<=y)for(X(0+a,3),Ga(),da(h),da(~h),k=0;k<h;k++)ia(g[y+k]);else if(b===d)X(2+a,3),Ha(Q,$);else{X(4+a,3);h=P.max_code+1;d=J.max_code+1;k+=1;X(h-257,5);X(d-1,5);X(k-4,4);for(b=0;b<k;b++)X(T[ua[b]].dl,3);Ia(Y,h-1);Ia(Z,d-1);Ha(Y,Z)}Ja();0!==a&&Ga()},Ka=function(b,g,h){var f,c,e;for(f=0;null!==a&&f<h;){c=h-f;c>a.len&&(c=a.len);for(e=0;e<c;e++)b[g+f+e]=a.ptr[a.off+e];a.off+=c;a.len-=c;f+=c;0===a.len&&(c=a,a=a.next,c.next=n,n=c)}if(f===h)return f;if(k<t){c=h-f;c>t-k&&(c=
t-k);for(e=0;e<c;e++)b[g+f+e]=d[k+e];k+=c;f+=c;t===k&&(t=k=0)}return f},La=function(b,d,h){var c;if(!f){if(!C){z=u=0;var e,p;if(0===$[0].dl){P.dyn_tree=Y;P.static_tree=Q;P.extra_bits=sa;P.extra_base=257;P.elems=286;P.max_length=15;P.max_code=0;J.dyn_tree=Z;J.static_tree=$;J.extra_bits=ha;J.extra_base=0;J.elems=30;J.max_length=15;J.max_code=0;G.dyn_tree=T;G.static_tree=null;G.extra_bits=ra;G.extra_base=0;G.elems=19;G.max_length=7;for(p=e=G.max_code=0;28>p;p++)for(F[p]=e,c=0;c<1<<sa[p];c++)ba[e++]=
p;ba[e-1]=p;for(p=e=0;16>p;p++)for(ma[p]=e,c=0;c<1<<ha[p];c++)ja[e++]=p;for(e>>=7;30>p;p++)for(ma[p]=e<<7,c=0;c<1<<ha[p]-7;c++)ja[256+e++]=p;for(c=0;15>=c;c++)H[c]=0;for(c=0;143>=c;)Q[c++].dl=8,H[8]++;for(;255>=c;)Q[c++].dl=9,H[9]++;for(;279>=c;)Q[c++].dl=7,H[7]++;for(;287>=c;)Q[c++].dl=8,H[8]++;Ea(Q,287);for(c=0;30>c;c++)$[c].dl=5,$[c].fc=Da(c,5);Ja()}for(c=0;8192>c;c++)w[32768+c]=0;pa=aa[M].max_lazy;qa=aa[M].good_length;ea=aa[M].max_chain;y=B=0;K=Ba(g,0,65536);if(0>=K)C=!0,K=0;else{for(C=!1;262>
K&&!C;)xa();for(c=v=0;2>c;c++)v=(v<<5^g[c]&255)&8191}a=null;k=t=0;3>=M?(N=2,D=0):(D=2,I=0);q=!1}f=!0;if(0===K)return q=!0,0}c=Ka(b,d,h);if(c===h)return h;if(q)return c;if(3>=M)for(;0!==K&&null===a;){V();0!==s&&32506>=B-s&&(D=Ca(s),D>K&&(D=K));if(3<=D)if(p=va(B-L,D-3),K-=D,D<=pa){D--;do B++,V();while(0!==--D);B++}else B+=D,D=0,v=g[B]&255,v=(v<<5^g[B+1]&255)&8191;else p=va(0,g[B]&255),K--,B++;p&&(wa(0),y=B);for(;262>K&&!C;)xa()}else for(;0!==K&&null===a;){V();N=D;A=L;D=2;0!==s&&(N<pa&&32506>=B-s)&&
(D=Ca(s),D>K&&(D=K),3===D&&4096<B-L&&D--);if(3<=N&&D<=N){p=va(B-1-A,N-3);K-=N-1;N-=2;do B++,V();while(0!==--N);I=0;D=2;B++;p&&(wa(0),y=B)}else 0!==I?va(0,g[B-1]&255)&&(wa(0),y=B):I=1,B++,K--;for(;262>K&&!C;)xa()}0===K&&(0!==I&&va(0,g[B-1]&255),wa(1),q=!0);return c+Ka(b,c+d,h-c)};this.deflate=function(k,c){var e,s;ta=k;E=0;"undefined"===String(typeof c)&&(c=6);(e=c)?1>e?e=1:9<e&&(e=9):e=6;M=e;C=f=!1;if(null===d){n=a=h=null;d=[];d.length=b;g=[];g.length=65536;p=[];p.length=8192;r=[];r.length=32832;
w=[];w.length=65536;Y=[];Y.length=573;for(e=0;573>e;e++)Y[e]=new l;Z=[];Z.length=61;for(e=0;61>e;e++)Z[e]=new l;Q=[];Q.length=288;for(e=0;288>e;e++)Q[e]=new l;$=[];$.length=30;for(e=0;30>e;e++)$[e]=new l;T=[];T.length=39;for(e=0;39>e;e++)T[e]=new l;P=new m;J=new m;G=new m;H=[];H.length=16;R=[];R.length=573;O=[];O.length=573;ba=[];ba.length=256;ja=[];ja.length=512;F=[];F.length=29;ma=[];ma.length=30;ka=[];ka.length=1024}var q=Array(1024),u=[],t=[];for(e=La(q,0,q.length);0<e;){t.length=e;for(s=0;s<
e;s++)t[s]=String.fromCharCode(q[s]);u[u.length]=t.join("");e=La(q,0,q.length)}ta=null;return u.join("")}};
// Input 4
core.ByteArray=function(l){this.pos=0;this.data=l;this.readUInt32LE=function(){this.pos+=4;var m=this.data,e=this.pos;return m[--e]<<24|m[--e]<<16|m[--e]<<8|m[--e]};this.readUInt16LE=function(){this.pos+=2;var m=this.data,e=this.pos;return m[--e]<<8|m[--e]}};
// Input 5
core.ByteArrayWriter=function(l){var m=this,e=new runtime.ByteArray(0);this.appendByteArrayWriter=function(c){e=runtime.concatByteArrays(e,c.getByteArray())};this.appendByteArray=function(c){e=runtime.concatByteArrays(e,c)};this.appendArray=function(c){e=runtime.concatByteArrays(e,runtime.byteArrayFromArray(c))};this.appendUInt16LE=function(c){m.appendArray([c&255,c>>8&255])};this.appendUInt32LE=function(c){m.appendArray([c&255,c>>8&255,c>>16&255,c>>24&255])};this.appendString=function(c){e=runtime.concatByteArrays(e,
runtime.byteArrayFromString(c,l))};this.getLength=function(){return e.length};this.getByteArray=function(){return e}};
// Input 6
core.RawInflate=function(){var l,m,e=null,c,b,n,a,h,f,d,t,k,q,g,p,r,w,u=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],z=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],v=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],s=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],A=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],I=function(){this.list=this.next=null},D=function(){this.n=this.b=this.e=0;this.t=null},N=function(a,b,d,k,g,c){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var h=Array(this.BMAX+1),f,e,p,s,q,n,r,m=Array(this.BMAX+1),l,w,u,t=new D,y=Array(this.BMAX);s=Array(this.N_MAX);var v,z=Array(this.BMAX+1),A,B,L;L=this.root=null;for(q=0;q<h.length;q++)h[q]=0;for(q=0;q<m.length;q++)m[q]=0;for(q=0;q<y.length;q++)y[q]=null;for(q=0;q<s.length;q++)s[q]=
0;for(q=0;q<z.length;q++)z[q]=0;f=256<b?a[256]:this.BMAX;l=a;w=0;q=b;do h[l[w]]++,w++;while(0<--q);if(h[0]==b)this.root=null,this.status=this.m=0;else{for(n=1;n<=this.BMAX&&0==h[n];n++);r=n;c<n&&(c=n);for(q=this.BMAX;0!=q&&0==h[q];q--);p=q;c>q&&(c=q);for(A=1<<n;n<q;n++,A<<=1)if(0>(A-=h[n])){this.status=2;this.m=c;return}if(0>(A-=h[q]))this.status=2,this.m=c;else{h[q]+=A;z[1]=n=0;l=h;w=1;for(u=2;0<--q;)z[u++]=n+=l[w++];l=a;q=w=0;do 0!=(n=l[w++])&&(s[z[n]++]=q);while(++q<b);b=z[p];z[0]=q=0;l=s;w=0;
s=-1;v=m[0]=0;u=null;for(B=0;r<=p;r++)for(a=h[r];0<a--;){for(;r>v+m[1+s];){v+=m[1+s];s++;B=(B=p-v)>c?c:B;if((e=1<<(n=r-v))>a+1)for(e-=a+1,u=r;++n<B&&!((e<<=1)<=h[++u]);)e-=h[u];v+n>f&&v<f&&(n=f-v);B=1<<n;m[1+s]=n;u=Array(B);for(e=0;e<B;e++)u[e]=new D;L=null==L?this.root=new I:L.next=new I;L.next=null;L.list=u;y[s]=u;0<s&&(z[s]=q,t.b=m[s],t.e=16+n,t.t=u,n=(q&(1<<v)-1)>>v-m[s],y[s-1][n].e=t.e,y[s-1][n].b=t.b,y[s-1][n].n=t.n,y[s-1][n].t=t.t)}t.b=r-v;w>=b?t.e=99:l[w]<d?(t.e=256>l[w]?16:15,t.n=l[w++]):
(t.e=g[l[w]-d],t.n=k[l[w++]-d]);e=1<<r-v;for(n=q>>v;n<B;n+=e)u[n].e=t.e,u[n].b=t.b,u[n].n=t.n,u[n].t=t.t;for(n=1<<r-1;0!=(q&n);n>>=1)q^=n;for(q^=n;(q&(1<<v)-1)!=z[s];)v-=m[s],s--}this.m=m[1];this.status=0!=A&&1!=p?1:0}}},B=function(b){for(;a<b;){var d=n,k;k=r.length==w?-1:r[w++];n=d|k<<a;a+=8}},L=function(a){return n&u[a]},C=function(b){n>>=b;a-=b},K=function(a,b,c){var f,e,s;if(0==c)return 0;for(s=0;;){B(g);e=k.list[L(g)];for(f=e.e;16<f;){if(99==f)return-1;C(e.b);f-=16;B(f);e=e.t[L(f)];f=e.e}C(e.b);
if(16==f)m&=32767,a[b+s++]=l[m++]=e.n;else{if(15==f)break;B(f);d=e.n+L(f);C(f);B(p);e=q.list[L(p)];for(f=e.e;16<f;){if(99==f)return-1;C(e.b);f-=16;B(f);e=e.t[L(f)];f=e.e}C(e.b);B(f);t=m-e.n-L(f);for(C(f);0<d&&s<c;)d--,t&=32767,m&=32767,a[b+s++]=l[m++]=l[t++]}if(s==c)return c}h=-1;return s},ea,pa=function(a,b,d){var c,f,h,e,n,r,l,m=Array(316);for(c=0;c<m.length;c++)m[c]=0;B(5);r=257+L(5);C(5);B(5);l=1+L(5);C(5);B(4);c=4+L(4);C(4);if(286<r||30<l)return-1;for(f=0;f<c;f++)B(3),m[A[f]]=L(3),C(3);for(;19>
f;f++)m[A[f]]=0;g=7;f=new N(m,19,19,null,null,g);if(0!=f.status)return-1;k=f.root;g=f.m;e=r+l;for(c=h=0;c<e;)if(B(g),n=k.list[L(g)],f=n.b,C(f),f=n.n,16>f)m[c++]=h=f;else if(16==f){B(2);f=3+L(2);C(2);if(c+f>e)return-1;for(;0<f--;)m[c++]=h}else{17==f?(B(3),f=3+L(3),C(3)):(B(7),f=11+L(7),C(7));if(c+f>e)return-1;for(;0<f--;)m[c++]=0;h=0}g=9;f=new N(m,r,257,z,y,g);0==g&&(f.status=1);if(0!=f.status)return-1;k=f.root;g=f.m;for(c=0;c<l;c++)m[c]=m[c+r];p=6;f=new N(m,l,0,v,s,p);q=f.root;p=f.m;return 0==p&&
257<r||0!=f.status?-1:K(a,b,d)};this.inflate=function(u,A){null==l&&(l=Array(65536));a=n=m=0;h=-1;f=!1;d=t=0;k=null;r=u;w=0;var I=new runtime.ByteArray(A);a:{var D,Q;for(D=0;D<A&&(!f||-1!=h);){if(0<d){if(0!=h)for(;0<d&&D<A;)d--,t&=32767,m&=32767,I[0+D++]=l[m++]=l[t++];else{for(;0<d&&D<A;)d--,m&=32767,B(8),I[0+D++]=l[m++]=L(8),C(8);0==d&&(h=-1)}if(D==A)break}if(-1==h){if(f)break;B(1);0!=L(1)&&(f=!0);C(1);B(2);h=L(2);C(2);k=null;d=0}switch(h){case 0:Q=I;var $=0+D,T=A-D,P=void 0,P=a&7;C(P);B(16);P=L(16);
C(16);B(16);if(P!=(~n&65535))Q=-1;else{C(16);d=P;for(P=0;0<d&&P<T;)d--,m&=32767,B(8),Q[$+P++]=l[m++]=L(8),C(8);0==d&&(h=-1);Q=P}break;case 1:if(null!=k)Q=K(I,0+D,A-D);else b:{Q=I;$=0+D;T=A-D;if(null==e){for(var J=void 0,P=Array(288),J=void 0,J=0;144>J;J++)P[J]=8;for(;256>J;J++)P[J]=9;for(;280>J;J++)P[J]=7;for(;288>J;J++)P[J]=8;b=7;J=new N(P,288,257,z,y,b);if(0!=J.status){alert("HufBuild error: "+J.status);Q=-1;break b}e=J.root;b=J.m;for(J=0;30>J;J++)P[J]=5;ea=5;J=new N(P,30,0,v,s,ea);if(1<J.status){e=
null;alert("HufBuild error: "+J.status);Q=-1;break b}c=J.root;ea=J.m}k=e;q=c;g=b;p=ea;Q=K(Q,$,T)}break;case 2:Q=null!=k?K(I,0+D,A-D):pa(I,0+D,A-D);break;default:Q=-1}if(-1==Q)break a;D+=Q}}r=null;return I}};
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
core.LoopWatchDog=function(l,m){var e=Date.now(),c=0;this.check=function(){var b;if(l&&(b=Date.now(),b-e>l))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<m&&(c+=1,c>m))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){function l(m,e){e&&Array.isArray(e)?m=(m||[]).concat(e.map(function(c){return l({},c)})):e&&"object"===typeof e?(m=m||{},Object.keys(e).forEach(function(c){m[c]=l(m[c],e[c])})):m=e;return m}this.hashString=function(m){var e=0,c,b;c=0;for(b=m.length;c<b;c+=1)e=(e<<5)-e+m.charCodeAt(c),e|=0;return e};this.mergeObjects=l};
// Input 9
core.DomUtils=function(){function l(e,c){e.nodeType===Node.TEXT_NODE&&(0===e.length?e.parentNode.removeChild(e):c.nodeType===Node.TEXT_NODE&&(e.appendData(c.data),c.parentNode.removeChild(c)));return e}function m(e,c){return e===c||Boolean(e.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY)}this.splitBoundaries=function(e){var c=[],b;if(e.startContainer.nodeType===Node.TEXT_NODE||e.endContainer.nodeType===Node.TEXT_NODE){b=e.endContainer;var n=e.endOffset;if(n<b.childNodes.length)for(b=
b.childNodes[n],n=0;b.firstChild;)b=b.firstChild;else for(;b.lastChild;)b=b.lastChild,n=b.nodeType===Node.TEXT_NODE?b.textContent.length:b.childNodes.length;e.setEnd(b,n);0!==e.endOffset&&(e.endContainer.nodeType===Node.TEXT_NODE&&e.endOffset!==e.endContainer.length)&&(c.push(e.endContainer.splitText(e.endOffset)),c.push(e.endContainer));0!==e.startOffset&&(e.startContainer.nodeType===Node.TEXT_NODE&&e.startOffset!==e.startContainer.length)&&(b=e.startContainer.splitText(e.startOffset),c.push(e.startContainer),
c.push(b),e.setStart(b,0))}return c};this.containsRange=function(e,c){return 0>=e.compareBoundaryPoints(e.START_TO_START,c)&&0<=e.compareBoundaryPoints(e.END_TO_END,c)};this.rangesIntersect=function(e,c){return 0>=e.compareBoundaryPoints(e.END_TO_START,c)&&0<=e.compareBoundaryPoints(e.START_TO_END,c)};this.getNodesInRange=function(e,c){var b=[],n,a=e.startContainer.ownerDocument.createTreeWalker(e.commonAncestorContainer,NodeFilter.SHOW_ALL,c,!1);for(n=a.currentNode=e.startContainer;n;){if(c(n)===
NodeFilter.FILTER_ACCEPT)b.push(n);else if(c(n)===NodeFilter.FILTER_REJECT)break;n=n.parentNode}b.reverse();for(n=a.nextNode();n;)b.push(n),n=a.nextNode();return b};this.normalizeTextNodes=function(e){e&&e.nextSibling&&(e=l(e,e.nextSibling));e&&e.previousSibling&&l(e.previousSibling,e)};this.rangeContainsNode=function(e,c){var b=c.ownerDocument.createRange(),n=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;b.setStart(e.startContainer,e.startOffset);b.setEnd(e.endContainer,e.endOffset);n=
0===b.comparePoint(c,0)&&0===b.comparePoint(c,n);b.detach();return n};this.mergeIntoParent=function(e){for(var c=e.parentNode;e.firstChild;)c.insertBefore(e.firstChild,e);c.removeChild(e);return c};this.getElementsByTagNameNS=function(e,c,b){return Array.prototype.slice.call(e.getElementsByTagNameNS(c,b))};this.rangeIntersectsNode=function(e,c){var b=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;return 0>=e.comparePoint(c,0)&&0<=e.comparePoint(c,b)};this.containsNode=function(e,c){return e===
c||e.contains(c)};(function(e){var c=runtime.getWindow();null!==c&&(c=c.navigator.appVersion.toLowerCase(),c=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")))&&(e.containsNode=m)})(this)};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(l,m){function e(a){a.parentNode&&(h.push(a.previousSibling),h.push(a.nextSibling),a.parentNode.removeChild(a))}function c(a,b,d){if(b.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(b),"putCursorIntoTextNode: invalid container");var f=b.parentNode;runtime.assert(Boolean(f),"putCursorIntoTextNode: container without parent");runtime.assert(0<=d&&d<=b.length,"putCursorIntoTextNode: offset is out of bounds");0===d?f.insertBefore(a,b):(d!==b.length&&b.splitText(d),f.insertBefore(a,
b.nextSibling))}else if(b.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(b),"putCursorIntoContainer: invalid container");for(f=b.firstChild;null!==f&&0<d;)f=f.nextSibling,d-=1;b.insertBefore(a,f)}h.push(a.previousSibling);h.push(a.nextSibling)}var b=l.createElementNS("urn:webodf:names:cursor","cursor"),n=l.createElementNS("urn:webodf:names:cursor","anchor"),a,h=[],f,d,t=new core.DomUtils;this.getNode=function(){return b};this.getAnchorNode=function(){return n.parentNode?n:b};this.getSelectedRange=
function(){d?(f.setStartBefore(b),f.collapse(!0)):(f.setStartAfter(a?n:b),f.setEndBefore(a?b:n));return f};this.setSelectedRange=function(k,q){f&&f!==k&&f.detach();f=k;a=!1!==q;(d=k.collapsed)?(e(n),e(b),c(b,k.startContainer,k.startOffset)):(e(n),e(b),c(a?b:n,k.endContainer,k.endOffset),c(a?n:b,k.startContainer,k.startOffset));h.forEach(t.normalizeTextNodes);h.length=0};this.remove=function(){e(b);h.forEach(t.normalizeTextNodes);h.length=0};b.setAttributeNS("urn:webodf:names:cursor","memberId",m);
n.setAttributeNS("urn:webodf:names:cursor","memberId",m)};
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
core.EventNotifier=function(l){var m={};this.emit=function(e,c){var b,n;runtime.assert(m.hasOwnProperty(e),'unknown event fired "'+e+'"');n=m[e];for(b=0;b<n.length;b+=1)n[b](c)};this.subscribe=function(e,c){runtime.assert(m.hasOwnProperty(e),'tried to subscribe to unknown event "'+e+'"');m[e].push(c);runtime.log('event "'+e+'" subscribed.')};this.unsubscribe=function(e,c){var b;runtime.assert(m.hasOwnProperty(e),'tried to unsubscribe from unknown event "'+e+'"');b=m[e].indexOf(c);runtime.assert(-1!==
b,'tried to unsubscribe unknown callback from event "'+e+'"');-1!==b&&m[e].splice(b,1);runtime.log('event "'+e+'" unsubscribed.')};(function(){var e;for(e=0;e<l.length;e+=1)m[l[e]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var l=runtime.getWindow().document,m=l.getElementById("testarea");runtime.assert(!m,'Unclean test environment, found a div with id "testarea".');m=l.createElement("div");m.setAttribute("id","testarea");l.body.appendChild(m);return m};
core.UnitTest.cleanupTestAreaDiv=function(){var l=runtime.getWindow().document,m=l.getElementById("testarea");runtime.assert(!!m&&m.parentNode===l.body,'Test environment broken, found no div with id "testarea" below body.');l.body.removeChild(m)};core.UnitTest.createOdtDocument=function(l,m){var e="<?xml version='1.0' encoding='UTF-8'?>",e=e+"<office:document";Object.keys(m).forEach(function(c){e+=" xmlns:"+c+'="'+m[c]+'"'});e+=">";e+=l;e+="</office:document>";return runtime.parseXML(e)};
core.UnitTestRunner=function(){function l(b){a+=1;runtime.log("fail",b)}function m(a,b){var c;try{if(a.length!==b.length)return l("array of length "+a.length+" should be "+b.length+" long"),!1;for(c=0;c<a.length;c+=1)if(a[c]!==b[c])return l(a[c]+" should be "+b[c]+" at array index "+c),!1}catch(k){return!1}return!0}function e(a,b,c){var k=a.attributes,h=k.length,g,p,n;for(g=0;g<h;g+=1)if(p=k.item(g),"xmlns"!==p.prefix){n=b.getAttributeNS(p.namespaceURI,p.localName);if(!b.hasAttributeNS(p.namespaceURI,
p.localName))return l("Attribute "+p.localName+" with value "+p.value+" was not present"),!1;if(n!==p.value)return l("Attribute "+p.localName+" was "+n+" should be "+p.value),!1}return c?!0:e(b,a,!0)}function c(a,b){if(a.nodeType!==b.nodeType)return l(a.nodeType+" should be "+b.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===b.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==b.namespaceURI||a.localName!==b.localName)return l(a.namespaceURI+
" should be "+b.namespaceURI),!1;if(!e(a,b,!1))return!1;for(var h=a.firstChild,k=b.firstChild;h;){if(!k||!c(h,k))return!1;h=h.nextSibling;k=k.nextSibling}return k?!1:!0}function b(a,b){return 0===b?a===b&&1/a===1/b:a===b?!0:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?m(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?c(b,a):h(b,a):!1}function n(a,d,c){"string"===typeof d&&
"string"===typeof c||runtime.log("WARN: shouldBe() expects string arguments");var k,h;try{h=eval(d)}catch(g){k=g}a=eval(c);k?l(d+" should be "+a+". Threw exception "+k):b(h,a)?runtime.log("pass",d+" is "+c):String(typeof h)===String(typeof a)?(c=0===h&&0>1/h?"-0":String(h),l(d+" should be "+a+". Was "+c+".")):l(d+" should be "+a+" (of type "+typeof a+"). Was "+h+" (of type "+typeof h+").")}var a=0,h;h=function(a,d){var c=Object.keys(a),k=Object.keys(d);c.sort();k.sort();return m(c,k)&&Object.keys(a).every(function(k){var g=
a[k],c=d[k];return b(g,c)?!0:(l(g+" should be "+c+" for key "+k),!1)})};this.areNodesEqual=c;this.shouldBeNull=function(a,b){n(a,b,"null")};this.shouldBeNonNull=function(a,b){var c,k;try{k=eval(b)}catch(h){c=h}c?l(b+" should be non-null. Threw exception "+c):null!==k?runtime.log("pass",b+" is non-null."):l(b+" should be non-null. Was "+k)};this.shouldBe=n;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function l(c,b){return"<span style='color:blue;cursor:pointer' onclick='"+b+"'>"+c+"</span>"}var m=0,e={};this.runTests=function(c,b,n){function a(k){if(0===k.length)e[h]=t,m+=f.countFailedTests(),b();else{q=k[0];var g=Runtime.getFunctionName(q);runtime.log("Running "+g);p=f.countFailedTests();d.setUp();q(function(){d.tearDown();t[g]=p===f.countFailedTests();a(k.slice(1))})}}var h=Runtime.getFunctionName(c),f=new core.UnitTestRunner,d=new c(f),t={},k,q,g,p,r="BrowserRuntime"===
runtime.type();if(e.hasOwnProperty(h))runtime.log("Test "+h+" has already run.");else{r?runtime.log("<span>Running "+l(h,'runSuite("'+h+'");')+": "+d.description()+"</span>"):runtime.log("Running "+h+": "+d.description);g=d.tests();for(k=0;k<g.length;k+=1)q=g[k],c=Runtime.getFunctionName(q)||q.testName,n.length&&-1===n.indexOf(c)||(r?runtime.log("<span>Running "+l(c,'runTest("'+h+'","'+c+'")')+"</span>"):runtime.log("Running "+c),p=f.countFailedTests(),d.setUp(),q(),d.tearDown(),t[c]=p===f.countFailedTests());
a(d.asyncTests())}};this.countFailedTests=function(){return m};this.results=function(){return e}};
// Input 13
core.PositionIterator=function(l,m,e,c){function b(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function n(a){this.acceptNode=function(b){return b.nodeType===Node.TEXT_NODE&&0===b.length?NodeFilter.FILTER_REJECT:a.acceptNode(b)}}function a(){var a=f.currentNode.nodeType;d=a===Node.TEXT_NODE?f.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var h=this,f,d,t;this.nextPosition=function(){if(f.currentNode===l)return!1;
if(0===d&&f.currentNode.nodeType===Node.ELEMENT_NODE)null===f.firstChild()&&(d=1);else if(f.currentNode.nodeType===Node.TEXT_NODE&&d+1<f.currentNode.length)d+=1;else if(null!==f.nextSibling())d=0;else if(f.parentNode())d=1;else return!1;return!0};this.previousPosition=function(){var b=!0;if(0===d)if(null===f.previousSibling()){if(!f.parentNode()||f.currentNode===l)return f.firstChild(),!1;d=0}else a();else f.currentNode.nodeType===Node.TEXT_NODE?d-=1:null!==f.lastChild()?a():f.currentNode===l?b=!1:
d=0;return b};this.container=function(){var a=f.currentNode,b=a.nodeType;return 0===d&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=f.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&d===a.length)for(a=a.nextSibling;a&&1!==t(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===d&&(a=null);return a};this.leftNode=function(){var a=f.currentNode;if(0===d)for(a=a.previousSibling;a&&1!==t(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==t(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return f.currentNode};this.domOffset=function(){if(f.currentNode.nodeType===Node.TEXT_NODE)return d;var a=0,b=f.currentNode,g;for(g=1===d?f.lastChild():f.previousSibling();g;)a+=1,g=f.previousSibling();f.currentNode=b;return a};this.unfilteredDomOffset=function(){if(f.currentNode.nodeType===Node.TEXT_NODE)return d;for(var a=0,b=f.currentNode,b=1===d?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=
function(){var a=f.currentNode,b=f.previousSibling();f.currentNode=a;return b};this.getNextSibling=function(){var a=f.currentNode,b=f.nextSibling();f.currentNode=a;return b};this.setUnfilteredPosition=function(a,b){var g;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");f.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return d=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),
b===a.length&&(d=void 0,f.nextSibling()?d=0:f.parentNode()&&(d=1),runtime.assert(void 0!==d,"Error in setPosition: position not valid.")),!0;g=t(a);b<a.childNodes.length&&g!==NodeFilter.FILTER_REJECT?(f.currentNode=a.childNodes[b],g=t(f.currentNode),d=0):d=0===b?0:1;g===NodeFilter.FILTER_REJECT&&(d=1);if(g!==NodeFilter.FILTER_ACCEPT)return h.nextPosition();runtime.assert(t(f.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
return!0};this.moveToEnd=function(){f.currentNode=l;d=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?h.setUnfilteredPosition(a,a.length):(f.currentNode=a,d=1)};this.getNodeFilter=function(){return t};t=(e?new n(e):new b).acceptNode;t.acceptNode=t;f=l.ownerDocument.createTreeWalker(l,m||4294967295,t,c);d=0;null===f.firstChild()&&(d=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(l){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var l={},m=core.PositionFilter.FilterResult.FILTER_ACCEPT,e=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(c){for(var b in l)if(l.hasOwnProperty(b)&&l[b].acceptPosition(c)===e)return e;return m};this.addFilter=function(c,b){l[c]=b};this.removeFilter=function(c){delete l[c]}};
// Input 16
core.Async=function(){this.forEach=function(l,m,e){function c(b){a!==n&&(b?(a=n,e(b)):(a+=1,a===n&&e(null)))}var b,n=l.length,a=0;for(b=0;b<n;b+=1)m(l[b],c)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(l,m){function e(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],d,g,c=a.length,k=0,k=0;d=-1;for(g=0;g<c;g+=1)k=(d^a[g])&255,k=b[k],d=d>>>8^k;return d^-1}function c(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function b(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function n(a,b){var d,g,k,h,f,e,n,r=this;this.load=function(b){if(void 0!==r.data)b(null,r.data);else{var d=f+34+g+k+256;d+n>p&&(d=p-n);runtime.read(a,n,d,function(d,g){if(d||null===g)b(d,g);else a:{var c=g,k=new core.ByteArray(c),p=k.readUInt32LE(),n;if(67324752!==p)b("File entry signature is wrong."+p.toString()+" "+c.length.toString(),null);else{k.pos+=22;p=k.readUInt16LE();n=k.readUInt16LE();k.pos+=p+n;
if(h){c=c.slice(k.pos,k.pos+f);if(f!==c.length){b("The amount of compressed bytes read was "+c.length.toString()+" instead of "+f.toString()+" for "+r.filename+" in "+a+".",null);break a}c=w(c,e)}else c=c.slice(k.pos,k.pos+e);e!==c.length?b("The amount of bytes read was "+c.length.toString()+" instead of "+e.toString()+" for "+r.filename+" in "+a+".",null):(r.data=c,b(null,c))}}})}};this.set=function(a,b,d,g){r.filename=a;r.data=b;r.compressed=d;r.date=g};this.error=null;b&&(d=b.readUInt32LE(),33639248!==
d?this.error="Central directory entry has wrong signature at position "+(b.pos-4).toString()+' for file "'+a+'": '+b.data.length.toString():(b.pos+=6,h=b.readUInt16LE(),this.date=c(b.readUInt32LE()),b.readUInt32LE(),f=b.readUInt32LE(),e=b.readUInt32LE(),g=b.readUInt16LE(),k=b.readUInt16LE(),d=b.readUInt16LE(),b.pos+=8,n=b.readUInt32LE(),this.filename=runtime.byteArrayToString(b.data.slice(b.pos,b.pos+g),"utf8"),b.pos+=g+k+d))}function a(a,b){if(22!==a.length)b("Central directory length should be 22.",
u);else{var d=new core.ByteArray(a),c;c=d.readUInt32LE();101010256!==c?b("Central directory signature is wrong: "+c.toString(),u):(c=d.readUInt16LE(),0!==c?b("Zip files with non-zero disk numbers are not supported.",u):(c=d.readUInt16LE(),0!==c?b("Zip files with non-zero disk numbers are not supported.",u):(c=d.readUInt16LE(),r=d.readUInt16LE(),c!==r?b("Number of entries is inconsistent.",u):(c=d.readUInt32LE(),d=d.readUInt16LE(),d=p-22-c,runtime.read(l,d,p-d,function(a,d){if(a||null===d)b(a,u);else a:{var c=
new core.ByteArray(d),k,h;g=[];for(k=0;k<r;k+=1){h=new n(l,c);if(h.error){b(h.error,u);break a}g[g.length]=h}b(null,u)}})))))}}function h(a,b){var d=null,c,k;for(k=0;k<g.length;k+=1)if(c=g[k],c.filename===a){d=c;break}d?d.data?b(null,d.data):d.load(b):b(a+" not found.",null)}function f(a){var d=new core.ByteArrayWriter("utf8"),g=0;d.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(g=a.data.length);d.appendUInt32LE(b(a.date));d.appendUInt32LE(e(a.data));d.appendUInt32LE(g);d.appendUInt32LE(g);d.appendUInt16LE(a.filename.length);
d.appendUInt16LE(0);d.appendString(a.filename);a.data&&d.appendByteArray(a.data);return d}function d(a,d){var g=new core.ByteArrayWriter("utf8"),c=0;g.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(c=a.data.length);g.appendUInt32LE(b(a.date));g.appendUInt32LE(e(a.data));g.appendUInt32LE(c);g.appendUInt32LE(c);g.appendUInt16LE(a.filename.length);g.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);g.appendUInt32LE(d);g.appendString(a.filename);return g}function t(a,b){if(a===g.length)b(null);else{var d=g[a];
void 0!==d.data?t(a+1,b):d.load(function(d){d?b(d):t(a+1,b)})}}function k(a,b){t(0,function(c){if(c)b(c);else{c=new core.ByteArrayWriter("utf8");var k,h,e,p=[0];for(k=0;k<g.length;k+=1)c.appendByteArrayWriter(f(g[k])),p.push(c.getLength());e=c.getLength();for(k=0;k<g.length;k+=1)h=g[k],c.appendByteArrayWriter(d(h,p[k]));k=c.getLength()-e;c.appendArray([80,75,5,6,0,0,0,0]);c.appendUInt16LE(g.length);c.appendUInt16LE(g.length);c.appendUInt32LE(k);c.appendUInt32LE(e);c.appendArray([0,0]);a(c.getByteArray())}})}
function q(a,b){k(function(d){runtime.writeFile(a,d,b)},b)}var g,p,r,w=(new core.RawInflate).inflate,u=this,z=new core.Base64;this.load=h;this.save=function(a,b,d,c){var k,h;for(k=0;k<g.length;k+=1)if(h=g[k],h.filename===a){h.set(a,b,d,c);return}h=new n(l);h.set(a,b,d,c);g.push(h)};this.write=function(a){q(l,a)};this.writeAs=q;this.createByteArray=k;this.loadContentXmlAsFragments=function(a,b){u.loadAsString(a,function(a,d){if(a)return b.rootElementReady(a);b.rootElementReady(null,d,!0)})};this.loadAsString=
function(a,b){h(a,function(a,d){if(a||null===d)return b(a,null);var c=runtime.byteArrayToString(d,"utf8");b(null,c)})};this.loadAsDOM=function(a,b){u.loadAsString(a,function(a,d){if(a||null===d)b(a,null);else{var c=(new DOMParser).parseFromString(d,"text/xml");b(null,c)}})};this.loadAsDataURL=function(a,b,d){h(a,function(a,c){if(a)return d(a,null);var g=0,k;b||(b=80===c[1]&&78===c[2]&&71===c[3]?"image/png":255===c[0]&&216===c[1]&&255===c[2]?"image/jpeg":71===c[0]&&73===c[1]&&70===c[2]?"image/gif":
"");for(k="data:"+b+";base64,";g<c.length;)k+=z.convertUTF8ArrayToBase64(c.slice(g,Math.min(g+45E3,c.length))),g+=45E3;d(null,k)})};this.getEntries=function(){return g.slice()};p=-1;null===m?g=[]:runtime.getFileSize(l,function(b){p=b;0>p?m("File '"+l+"' cannot be read.",u):runtime.read(l,p-22,22,function(b,d){b||null===m||null===d?m(b,u):a(d,m)})})};
// Input 18
core.CSSUnits=function(){var l={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(m,e,c){return m*l[c]/l[e]};this.convertMeasure=function(m,e){var c,b;m&&e?(c=parseFloat(m),b=m.replace(c.toString(),""),c=this.convert(c,b,e)):c="";return c.toString()};this.getUnits=function(m){return m.substr(m.length-2,m.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(l){var m=function(){};m.prototype=l;return new m});
xmldom.LSSerializer=function(){function l(b){var c=b||{},a=function(a){var b={},d;for(d in a)a.hasOwnProperty(d)&&(b[a[d]]=d);return b}(b),h=[c],f=[a],d=0;this.push=function(){d+=1;c=h[d]=Object.create(c);a=f[d]=Object.create(a)};this.pop=function(){h[d]=void 0;f[d]=void 0;d-=1;c=h[d];a=f[d]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(b){var d=b.namespaceURI,h=0,g;if(!d)return b.localName;if(g=a[d])return g+":"+b.localName;do{g||!b.prefix?(g="ns"+h,h+=1):g=b.prefix;
if(c[g]===d)break;if(!c[g]){c[g]=d;a[d]=g;break}g=null}while(null===g);return g+":"+b.localName}}function m(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function e(b,n){var a="",h=c.filter?c.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,f;if(h===NodeFilter.FILTER_ACCEPT&&n.nodeType===Node.ELEMENT_NODE){b.push();f=b.getQName(n);var d,l=n.attributes,k,q,g,p="",r;d="<"+f;k=l.length;for(q=0;q<k;q+=1)g=l.item(q),"http://www.w3.org/2000/xmlns/"!==
g.namespaceURI&&(r=c.filter?c.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,r===NodeFilter.FILTER_ACCEPT&&(r=b.getQName(g),g="string"===typeof g.value?m(g.value):g.value,p+=" "+(r+'="'+g+'"')));k=b.getLocalNamespaceDefinitions();for(q in k)k.hasOwnProperty(q)&&((l=k[q])?"xmlns"!==l&&(d+=" xmlns:"+k[q]+'="'+q+'"'):d+=' xmlns="'+q+'"');a+=d+(p+">")}if(h===NodeFilter.FILTER_ACCEPT||h===NodeFilter.FILTER_SKIP){for(h=n.firstChild;h;)a+=e(b,h),h=h.nextSibling;n.nodeValue&&(a+=m(n.nodeValue))}f&&(a+="</"+
f+">",b.pop());return a}var c=this;this.filter=null;this.writeToString=function(b,c){if(!b)return"";var a=new l(c);return e(a,b)}};
// Input 21
xmldom.RelaxNGParser=function(){function l(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function m(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return m({name:a.name,e:[b].concat(a.e.slice(2))})}function e(a){a=a.split(":",2);var b="",c;1===a.length?a=["",a[0]]:b=a[0];for(c in h)h[c]===b&&(a[0]=c);return a}function c(a,b){for(var k=0,h,g,f=a.name;a.e&&k<a.e.length;)if(h=
a.e[k],"ref"===h.name){g=b[h.a.name];if(!g)throw h.a.name+" was not defined.";h=a.e.slice(k+1);a.e=a.e.slice(0,k);a.e=a.e.concat(g.e);a.e=a.e.concat(h)}else k+=1,c(h,b);h=a.e;"choice"!==f||h&&h[1]&&"empty"!==h[1].name||(h&&h[0]&&"empty"!==h[0].name?(h[1]=h[0],h[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===f||"interleave"===f)"empty"===h[0].name?"empty"===h[1].name?(delete a.e,a.name="empty"):(f=a.name=h[1].name,a.names=h[1].names,h=a.e=h[1].e):"empty"===h[1].name&&(f=a.name=h[0].name,
a.names=h[0].names,h=a.e=h[0].e);"oneOrMore"===f&&"empty"===h[0].name&&(delete a.e,a.name="empty");if("attribute"===f){g=a.names?a.names.length:0;for(var n,m=[],l=[],k=0;k<g;k+=1)n=e(a.names[k]),l[k]=n[0],m[k]=n[1];a.localnames=m;a.namespaces=l}"interleave"===f&&("interleave"===h[0].name?a.e="interleave"===h[1].name?h[0].e.concat(h[1].e):[h[1]].concat(h[0].e):"interleave"===h[1].name&&(a.e=[h[0]].concat(h[1].e)))}function b(a,c){for(var h=0,f;a.e&&h<a.e.length;)f=a.e[h],"elementref"===f.name?(f.id=
f.id||0,a.e[h]=c[f.id]):"element"!==f.name&&b(f,c),h+=1}var n=this,a,h={"http://www.w3.org/XML/1998/namespace":"xml"},f;f=function(a,b,c){var n=[],g,p,r=a.localName,l=[];g=a.attributes;var u=r,z=l,y={},v,s;for(v=0;v<g.length;v+=1)if(s=g.item(v),s.namespaceURI)"http://www.w3.org/2000/xmlns/"===s.namespaceURI&&(h[s.value]=s.localName);else{"name"!==s.localName||"element"!==u&&"attribute"!==u||z.push(s.value);if("name"===s.localName||"combine"===s.localName||"type"===s.localName){var A=s,I;I=s.value;
I=I.replace(/^\s\s*/,"");for(var D=/\s/,N=I.length-1;D.test(I.charAt(N));)N-=1;I=I.slice(0,N+1);A.value=I}y[s.localName]=s.value}g=y;g.combine=g.combine||void 0;a=a.firstChild;u=n;z=l;for(y="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(v=f(a,b,u))"name"===v.name?z.push(h[v.a.ns]+":"+v.text):"choice"===v.name&&(v.names&&v.names.length)&&(z=z.concat(v.names),delete v.names),u.push(v)}else a.nodeType===Node.TEXT_NODE&&(y+=a.nodeValue);a=a.nextSibling}a=
y;"value"!==r&&"param"!==r&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===r&&void 0===g.type&&(g.type="token",g.datatypeLibrary="");"attribute"!==r&&"element"!==r||void 0===g.name||(p=e(g.name),n=[{name:"name",text:p[1],a:{ns:p[0]}}].concat(n),delete g.name);"name"===r||"nsName"===r||"value"===r?void 0===g.ns&&(g.ns=""):delete g.ns;"name"===r&&(p=e(a),g.ns=p[0],a=p[1]);1<n.length&&("define"===r||"oneOrMore"===r||"zeroOrMore"===r||"optional"===r||"list"===r||"mixed"===r)&&(n=[{name:"group",e:m({name:"group",
e:n}).e}]);2<n.length&&"element"===r&&(n=[n[0]].concat({name:"group",e:m({name:"group",e:n.slice(1)}).e}));1===n.length&&"attribute"===r&&n.push({name:"text",text:a});1!==n.length||"choice"!==r&&"group"!==r&&"interleave"!==r?2<n.length&&("choice"===r||"group"===r||"interleave"===r)&&(n=m({name:r,e:n}).e):(r=n[0].name,l=n[0].names,g=n[0].a,a=n[0].text,n=n[0].e);"mixed"===r&&(r="interleave",n=[n[0],{name:"text"}]);"optional"===r&&(r="choice",n=[n[0],{name:"empty"}]);"zeroOrMore"===r&&(r="choice",n=
[{name:"oneOrMore",e:[n[0]]},{name:"empty"}]);if("define"===r&&g.combine){a:{u=g.combine;z=g.name;y=n;for(v=0;c&&v<c.length;v+=1)if(s=c[v],"define"===s.name&&s.a&&s.a.name===z){s.e=[{name:u,e:s.e.concat(y)}];c=s;break a}c=null}if(c)return}c={name:r};n&&0<n.length&&(c.e=n);for(p in g)if(g.hasOwnProperty(p)){c.a=g;break}void 0!==a&&(c.text=a);l&&0<l.length&&(c.names=l);"element"===r&&(c.id=b.length,b.push(c),c={name:"elementref",id:c.id});return c};this.parseRelaxNGDOM=function(d,e){var k=[],m=f(d&&
d.documentElement,k,void 0),g,p,r={};for(g=0;g<m.e.length;g+=1)p=m.e[g],"define"===p.name?r[p.a.name]=p:"start"===p.name&&(a=p);if(!a)return[new l("No Relax NG start element was found.")];c(a,r);for(g in r)r.hasOwnProperty(g)&&c(r[g],r);for(g=0;g<k.length;g+=1)c(k[g],r);e&&(n.rootPattern=e(a.e[0],k));b(a,k);for(g=0;g<k.length;g+=1)b(k[g],k);n.start=a;n.elements=k;n.nsmap=h;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function l(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function m(a,b){return function(){var c={},d=0;return function(g){var h=g.hash||g.toString(),k;k=c[h];if(void 0!==k)return k;c[h]=k=b(g);k.hash=a+d.toString();d+=1;return k}}()}function e(a){return function(){var b={};return function(c){var d,g;g=b[c.localName];if(void 0===g)b[c.localName]=g={};else if(d=g[c.namespaceURI],void 0!==d)return d;return g[c.namespaceURI]=d=a(c)}}()}function c(a,
b,c){return function(){var d={},g=0;return function(h,k){var f=b&&b(h,k),e,p;if(void 0!==f)return f;f=h.hash||h.toString();e=k.hash||k.toString();p=d[f];if(void 0===p)d[f]=p={};else if(f=p[e],void 0!==f)return f;p[e]=f=c(h,k);f.hash=a+g.toString();g+=1;return f}}()}function b(a,c){"choice"===c.p1.type?b(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?b(a,c.p2):a[c.p2.hash]=c.p2}function n(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return v},startTagOpenDeriv:function(c){return a.contains(c)?
g(b,s):v},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return s}}}function h(a,b,c,g){if(b===v)return v;if(g>=c.length)return b;0===g&&(g=0);for(var k=c.item(g);k.namespaceURI===d;){g+=1;if(g>=c.length)return b;k=c.item(g)}return k=h(a,b.attDeriv(a,c.item(g)),c,g+1)}function f(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):f(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
f(a,b,c.e[1])}var d="http://www.w3.org/2000/xmlns/",t,k,q,g,p,r,w,u,z,y,v={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return v},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return v},endTagDeriv:function(){return v}},s={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return v},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return s},endTagDeriv:function(){return v}},
A={type:"text",nullable:!0,hash:"text",textDeriv:function(){return A},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return A},endTagDeriv:function(){return v}},I,D,N;t=c("choice",function(a,b){if(a===v)return b;if(b===v||a===b)return a},function(a,c){var d={},g;b(d,{p1:a,p2:c});c=a=void 0;for(g in d)d.hasOwnProperty(g)&&(void 0===a?a=d[g]:c=void 0===c?d[g]:t(c,d[g]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,d){return t(a.textDeriv(c,d),b.textDeriv(c,d))},startTagOpenDeriv:e(function(c){return t(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,d){return t(a.attDeriv(c,d),b.attDeriv(c,d))},startTagCloseDeriv:l(function(){return t(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:l(function(){return t(a.endTagDeriv(),b.endTagDeriv())})}}(a,c)});k=function(a,b,c){return function(){var d={},g=0;return function(h,k){var f=b&&b(h,k),e,p;if(void 0!==f)return f;
f=h.hash||h.toString();e=k.hash||k.toString();f<e&&(p=f,f=e,e=p,p=h,h=k,k=p);p=d[f];if(void 0===p)d[f]=p={};else if(f=p[e],void 0!==f)return f;p[e]=f=c(h,k);f.hash=a+g.toString();g+=1;return f}}()}("interleave",function(a,b){if(a===v||b===v)return v;if(a===s)return b;if(b===s)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){return t(k(a.textDeriv(c,d),b),k(a,b.textDeriv(c,d)))},startTagOpenDeriv:e(function(c){return t(I(function(a){return k(a,
b)},a.startTagOpenDeriv(c)),I(function(b){return k(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,d){return t(k(a.attDeriv(c,d),b),k(a,b.attDeriv(c,d)))},startTagCloseDeriv:l(function(){return k(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});q=c("group",function(a,b){if(a===v||b===v)return v;if(a===s)return b;if(b===s)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){var g=q(a.textDeriv(c,d),b);return a.nullable?t(g,b.textDeriv(c,
d)):g},startTagOpenDeriv:function(c){var d=I(function(a){return q(a,b)},a.startTagOpenDeriv(c));return a.nullable?t(d,b.startTagOpenDeriv(c)):d},attDeriv:function(c,d){return t(q(a.attDeriv(c,d),b),q(a,b.attDeriv(c,d)))},startTagCloseDeriv:l(function(){return q(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});g=c("after",function(a,b){if(a===v||b===v)return v},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,d){return g(a.textDeriv(c,d),b)},startTagOpenDeriv:e(function(c){return I(function(a){return g(a,
b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,d){return g(a.attDeriv(c,d),b)},startTagCloseDeriv:l(function(){return g(a.startTagCloseDeriv(),b)}),endTagDeriv:l(function(){return a.nullable?b:v})}});p=m("oneormore",function(a){return a===v?v:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return q(a.textDeriv(b,c),t(this,s))},startTagOpenDeriv:function(b){var c=this;return I(function(a){return q(a,t(c,s))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return q(a.attDeriv(b,
c),t(this,s))},startTagCloseDeriv:l(function(){return p(a.startTagCloseDeriv())})}});w=c("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,d){return a.contains(d)&&(b.nullable&&/^\s+$/.test(d.nodeValue)||b.textDeriv(c,d.nodeValue).nullable)?s:v},startTagCloseDeriv:function(){return v}}});r=m("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?s:v},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}});
z=m("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return s},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}});I=function L(a,b){return"after"===b.type?g(b.p1,a(b.p2)):"choice"===b.type?t(L(a,b.p1),L(a,b.p2)):b};D=function(a,b,c){var d=c.currentNode;b=b.startTagOpenDeriv(d);b=h(a,b,d.attributes,0);var g=b=b.startTagCloseDeriv(),d=c.currentNode;b=c.firstChild();for(var k=[],f;b;)b.nodeType===Node.ELEMENT_NODE?k.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||k.push(b.nodeValue),b=c.nextSibling();0===k.length&&(k=[""]);f=g;for(g=0;f!==v&&g<k.length;g+=1)b=k[g],"string"===typeof b?f=/^\s*$/.test(b)?t(f,f.textDeriv(a,b)):f.textDeriv(a,b):(c.currentNode=b,f=D(a,f,c));c.currentNode=d;return b=f.endTagDeriv()};u=function(a){var b,c,d;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];f(b,c,a);a="";for(d=0;d<b.length;d+=
1)a+="{"+c[d]+"}"+b[d]+",";a={hash:a,contains:function(a){var d;for(d=0;d<b.length;d+=1)if(b[d]===a.localName&&c[d]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};y=function C(b,c){var d,g;if("elementref"===b.name){d=b.id||0;b=c[d];if(void 0!==b.name){var h=b;d=c[h.id]={hash:"element"+h.id.toString()};h=n(u(h.e[0]),y(h.e[1],c));for(g in h)h.hasOwnProperty(g)&&(d[g]=h[g]);return d}return b}switch(b.name){case "empty":return s;case "notAllowed":return v;
case "text":return A;case "choice":return t(C(b.e[0],c),C(b.e[1],c));case "interleave":d=C(b.e[0],c);for(g=1;g<b.e.length;g+=1)d=k(d,C(b.e[g],c));return d;case "group":return q(C(b.e[0],c),C(b.e[1],c));case "oneOrMore":return p(C(b.e[0],c));case "attribute":return w(u(b.e[0]),C(b.e[1],c));case "value":return r(b.text);case "data":return d=b.a&&b.a.type,void 0===d&&(d=""),z(d);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var c={},d;for(d in b)b.hasOwnProperty(d)&&
(c[d]=b[d]);return d=y(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=D(null,N,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){N=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function l(a,b){this.message=function(){b&&(a+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function m(a,c,f,d){return"empty"===a.name?null:b(a,c,f,d)}function e(a,b){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var c=b.currentNode,d=c?c.nodeType:0,e=null;d>Node.ELEMENT_NODE;){if(d!==Node.COMMENT_NODE&&(d!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new l("Not allowed node of type "+
d+".")];d=(c=b.nextSibling())?c.nodeType:0}if(!c)return[new l("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(n[c.namespaceURI]+":"+c.localName))return[new l("Found "+c.nodeName+" instead of "+a.names+".",c)];if(b.firstChild()){for(e=m(a.e[1],b,c);b.nextSibling();)if(d=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||d===Node.COMMENT_NODE))return[new l("Spurious content.",b.currentNode)];if(b.parentNode()!==c)return[new l("Implementation error.")]}else e=
m(a.e[1],b,c);b.nextSibling();return e}var c,b,n;b=function(a,c,f,d){var n=a.name,k=null;if("text"===n)a:{for(var q=(a=c.currentNode)?a.nodeType:0;a!==f&&3!==q;){if(1===q){k=[new l("Element not allowed here.",a)];break a}q=(a=c.nextSibling())?a.nodeType:0}c.nextSibling();k=null}else if("data"===n)k=null;else if("value"===n)d!==a.text&&(k=[new l("Wrong value, should be '"+a.text+"', not '"+d+"'",f)]);else if("list"===n)k=null;else if("attribute"===n)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;n=a.localnames.length;for(k=0;k<n;k+=1){d=f.getAttributeNS(a.namespaces[k],a.localnames[k]);""!==d||f.hasAttributeNS(a.namespaces[k],a.localnames[k])||(d=void 0);if(void 0!==q&&void 0!==d){k=[new l("Attribute defined too often.",f)];break a}q=d}k=void 0===q?[new l("Attribute not found: "+a.names,f)]:m(a.e[1],c,f,q)}else if("element"===n)k=e(a,c);else if("oneOrMore"===n){d=0;do q=c.currentNode,n=b(a.e[0],c,f),d+=1;while(!n&&q!==c.currentNode);1<d?(c.currentNode=q,k=null):k=n}else if("choice"===
n){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;q=c.currentNode;if("empty"===a.e[0].name){if(n=b(a.e[1],c,f,d))c.currentNode=q;k=null}else{if(n=m(a.e[0],c,f,d))c.currentNode=q,n=b(a.e[1],c,f,d);k=n}}else if("group"===n){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;k=b(a.e[0],c,f)||b(a.e[1],c,f)}else if("interleave"===n)a:{q=a.e.length;d=[q];for(var g=q,p,r,w,u;0<g;){p=0;r=c.currentNode;for(k=0;k<q;k+=1)w=c.currentNode,!0!==d[k]&&d[k]!==w&&(u=a.e[k],(n=
b(u,c,f))?(c.currentNode=w,void 0===d[k]&&(d[k]=!1)):w===c.currentNode||"oneOrMore"===u.name||"choice"===u.name&&("oneOrMore"===u.e[0].name||"oneOrMore"===u.e[1].name)?(p+=1,d[k]=w):(p+=1,d[k]=!0));if(r===c.currentNode&&p===g){k=null;break a}if(0===p){for(k=0;k<q;k+=1)if(!1===d[k]){k=[new l("Interleave does not match.",f)];break a}k=null;break a}for(k=g=0;k<q;k+=1)!0!==d[k]&&(g+=1)}k=null}else throw n+" not allowed in nonEmptyPattern.";return k};this.validate=function(a,b){a.currentNode=a.root;var f=
m(c.e[0],a,a.root);b(f)};this.init=function(a,b){c=a;n=b}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function l(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function m(a){for(var b=[],c=0,d=a.length,h;c<d;){var f=a,e=d,n=b,m="",v=[],s=f.indexOf("[",c),A=f.indexOf("/",c),I=f.indexOf("=",c);l(A,s,I)?(m=f.substring(c,A),c=A+1):l(s,A,I)?(m=f.substring(c,s),c=t(f,s,v)):l(I,A,s)?(m=f.substring(c,I),c=I):(m=f.substring(c,e),c=e);n.push({location:m,predicates:v});if(c<d&&"="===a[c]){h=a.substring(c+1,d);if(2<h.length&&("'"===h[0]||'"'===h[0]))h=h.slice(1,h.length-1);else try{h=
parseInt(h,10)}catch(D){}c=d}}return{steps:b,value:h}}function e(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function c(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function b(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function n(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function a(a,b,c){b=b.split(":",2);var d=c(b[0]),h=b[1];return new n(a,function(a){return a.localName===h&&a.namespaceURI===d})}function h(a,b,c){var h=new e,f=d(h,b,c),m=b.value;return void 0===m?new n(a,function(a){h.setNode(a);
f.reset();return f.next()}):new n(a,function(a){h.setNode(a);f.reset();return(a=f.next())&&a.nodeValue===m})}function f(a,b,c){var h=a.ownerDocument,f=[],n=null;if(h&&h.evaluate)for(c=h.evaluate(b,a,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),n=c.iterateNext();null!==n;)n.nodeType===Node.ELEMENT_NODE&&f.push(n),n=c.iterateNext();else{f=new e;f.setNode(a);a=m(b);f=d(f,a,c);a=[];for(c=f.next();c;)a.push(c),c=f.next();f=a}return f}var d,t;t=function(a,b,c){for(var d=b,h=a.length,f=0;d<h;)"]"===
a[d]?(f-=1,0>=f&&c.push(m(a.substring(b,d)))):"["===a[d]&&(0>=f&&(b=d+1),f+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};d=function(d,f,g){var e,n,m,l;for(e=0;e<f.steps.length;e+=1)for(m=f.steps[e],n=m.location,""===n?d=new b(d,!1):"@"===n[0]?(l=n.slice(1).split(":",2),d=new c(d,g(l[0]),l[1])):"."!==n&&(d=new b(d,!1),-1!==n.indexOf(":")&&(d=a(d,n,g))),n=0;n<m.predicates.length;n+=1)l=m.predicates[n],d=h(d,l,g);return d};xmldom.XPath=
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
gui.AnnotationViewManager=function(l,m,e){function c(a){var b=a.node,c=a.end;a=f.createRange();c&&(a.setStart(b,b.childNodes.length),a.setEnd(c,0),c=d.getTextNodes(a,!1),c.forEach(function(a){var c=f.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function b(a){var b=l.getSizer();a?(e.style.display="inline-block",b.style.paddingRight=t.getComputedStyle(e).width):
(e.style.display="none",b.style.paddingRight=0);l.refreshSize()}function n(){h.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function a(){var a;for(a=0;a<h.length;a+=1){var b=h[a],c=b.node.parentNode,d=c.nextSibling,n=d.nextSibling,m=c.parentNode,u=0,z=h[h.indexOf(b)-1],y=void 0,b=b.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],u=void 0,u=l.getZoomLevel();c.style.left=(e.getBoundingClientRect().left-m.getBoundingClientRect().left)/
u+"px";c.style.width=e.getBoundingClientRect().width/u+"px";d.style.width=parseFloat(c.style.left)-30+"px";z&&(y=z.node.parentNode.getBoundingClientRect(),20>=(m.getBoundingClientRect().top-y.bottom)/u?c.style.top=Math.abs(m.getBoundingClientRect().top-y.bottom)/u+20+"px":c.style.top="0px");n.style.left=d.getBoundingClientRect().width/u+"px";var d=n.style,m=n.getBoundingClientRect().left/u,z=n.getBoundingClientRect().top/u,y=c.getBoundingClientRect().left/u,v=c.getBoundingClientRect().top/u,s=0,A=
0,s=y-m,s=s*s,A=v-z,A=A*A,m=Math.sqrt(s+A);d.width=m+"px";u=Math.asin((c.getBoundingClientRect().top-n.getBoundingClientRect().top)/(u*parseFloat(n.style.width)));n.style.transform="rotate("+u+"rad)";n.style.MozTransform="rotate("+u+"rad)";n.style.WebkitTransform="rotate("+u+"rad)";n.style.msTransform="rotate("+u+"rad)";b&&(u=t.getComputedStyle(b,":before").content)&&"none"!==u&&(u=u.substring(1,u.length-1),b.firstChild?b.firstChild.nodeValue=u:b.appendChild(f.createTextNode(u)))}}var h=[],f=m.ownerDocument,
d=new odf.OdfUtils,t=runtime.getWindow();runtime.assert(Boolean(t),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=a;this.addAnnotation=function(d){b(!0);h.push({node:d.node,end:d.end});n();var e=f.createElement("div"),g=f.createElement("div"),p=f.createElement("div"),m=f.createElement("div"),l=f.createElement("div"),u=d.node;e.className="annotationWrapper";u.parentNode.insertBefore(e,u);g.className="annotationNote";g.appendChild(u);l.className=
"annotationRemoveButton";g.appendChild(l);p.className="annotationConnector horizontal";m.className="annotationConnector angular";e.appendChild(g);e.appendChild(p);e.appendChild(m);d.end&&c(d);a()};this.forgetAnnotations=function(){for(;h.length;){var a=h[0],c=h.indexOf(a),d=a.node,e=d.parentNode.parentNode;"div"===e.localName&&(e.parentNode.insertBefore(d,e),e.parentNode.removeChild(e));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=f.querySelectorAll('span.annotationHighlight[annotation="'+
a+'"]');e=d=void 0;for(d=0;d<a.length;d+=1){for(e=a[d];e.firstChild;)e.parentNode.insertBefore(e.firstChild,e);e.parentNode.removeChild(e)}-1!==c&&h.splice(c,1);0===h.length&&b(!1)}}};
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
odf.Namespaces=function(){function l(c){return m[c]||null}var m={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",dc:"http://purl.org/dc/elements/1.1/",webodf:"urn:webodf"},e;l.lookupNamespaceURI=l;e=function(){};e.forEachPrefix=function(c){for(var b in m)m.hasOwnProperty(b)&&c(b,m[b])};e.resolvePrefix=l;e.namespaceMap=m;e.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";e.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
e.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";e.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";e.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";e.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";e.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";e.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";e.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";e.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
e.xlinkns="http://www.w3.org/1999/xlink";e.xmlns="http://www.w3.org/XML/1998/namespace";e.dcns="http://purl.org/dc/elements/1.1/";e.webodfns="urn:webodf";return e}();
// Input 28
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function l(a,b){for(var c=q[a.localName],d=c&&c[a.namespaceURI],g=d?d.length:0,f,c=0;c<g;c+=1)(f=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,b+f);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,l(d,b)),c=c.nextSibling}function m(a,b){for(var c=q[a.localName],d=c&&c[a.namespaceURI],g=d?d.length:0,f,c=0;c<g;c+=1)if(f=a.getAttributeNS(d[c].ns,d[c].localname))f=f.replace(b,""),a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,
f);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,m(d,b)),c=c.nextSibling}function e(a,b){var c=q[a.localName],d=(c=c&&c[a.namespaceURI])?c.length:0,f,g,h;for(h=0;h<d;h+=1)if(f=a.getAttributeNS(c[h].ns,c[h].localname))b=b||{},g=c[h].keyname,g=b[g]=b[g]||{},g[f]=1;return b}function c(a,b){var d,g;e(a,b);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(g=d,c(g,b)),d=d.nextSibling}function b(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function n(a,c,d){var g=a+'"'+
c,f=d[g];f||(f=d[g]=new b(g,a,c));return f}function a(b,c,g){var f=q[b.localName],h=(f=f&&f[b.namespaceURI])?f.length:0,e=b.getAttributeNS(d,"name"),k=b.getAttributeNS(d,"family"),m;e&&k&&(c=n(e,k,g));if(c)for(e=0;e<h;e+=1)if(k=b.getAttributeNS(f[e].ns,f[e].localname))m=f[e].keyname,k=n(k,m,g),c.requires[k.key]=k;for(e=b.firstChild;e;)e.nodeType===Node.ELEMENT_NODE&&(b=e,a(b,c,g)),e=e.nextSibling;return g}function h(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){h(a.requires[c],
b)})}function f(b,c){var d=a(b,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&h(a,c)})}var d="urn:oasis:names:tc:opendocument:xmlns:style:1.0",t={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
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
a:"page-layout-name"}]},q,g=new xmldom.XPath;this.UsedStyleList=function(a,b){var g={};this.uses=function(a){var b=a.localName,c=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(d,"name");a="style"===b?a.getAttributeNS(d,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":b;return(a=g[a])?0<a[c]:!1};c(a,g);b&&f(b,g)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),f=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,
"family");return g.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+f+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,c){var g;if(a){for(g=a.firstChild;g;){if(g.nodeType===Node.ELEMENT_NODE){var f=g,h=b,e=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),k=void 0;e?k="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(e=f.getAttributeNS(d,"name"))&&(k=d);k&&f.setAttributeNS(k,t[k]+"name",h+e)}g=g.nextSibling}l(a,b);c&&l(c,
b)}};this.removePrefixFromStyleNames=function(a,b,c){var g=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var f=b,h=g,e=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),k=void 0;e?k="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(e=f.getAttributeNS(d,"name"))&&(k=d);k&&(e=e.replace(h,""),f.setAttributeNS(k,t[k]+"name",e))}b=b.nextSibling}m(a,g);c&&m(c,g)}};this.determineStylesForNode=e;q=function(a){var b,c,d,g,f,h={},e;for(b in a)if(a.hasOwnProperty(b))for(g=
a[b],d=g.length,c=0;c<d;c+=1)f=g[c],e=h[f.en]=h[f.en]||{},e=e[f.ens]=e[f.ens]||[],e.push({ns:f.ans,localname:f.a,keyname:b});return h}(k)};
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
odf.OdfUtils=function(){function l(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===u}function m(a){for(;a&&!l(a);)a=a.parentNode;return a}function e(a){return/^[ \t\r\n]+$/.test(a)}function c(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===u||"span"===b&&"annotationHighlight"===a.className?!0:!1}function b(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===u?d="s"===b||"tab"===b||"line-break"===b:c===z&&(d="frame"===b&&"as-char"===a.getAttributeNS(u,
"anchor-type")));return d}function n(a){for(;null!==a.firstChild&&c(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&c(a);)a=a.lastChild;return a}function h(b){for(;!l(b)&&null===b.previousSibling;)b=b.parentNode;return l(b)?null:a(b.previousSibling)}function f(a){for(;!l(a)&&null===a.nextSibling;)a=a.parentNode;return l(a)?null:n(a.nextSibling)}function d(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=h(a);else return!e(a.data.substr(a.length-1,1));else b(a)?
(c=!0,a=null):a=h(a);return c}function t(a){var c=!1;for(a=a&&n(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!e(a.data)){c=!0;break}if(b(a)){c=!0;break}a=f(a)}return c}function k(a,b){return e(a.data.substr(b))?!t(f(a)):!1}function q(a,c){var g=a.data,f;if(!e(g[c])||b(a.parentNode))return!1;0<c?e(g[c-1])||(f=!0):d(h(a))&&(f=!0);return!0===f?k(a,c)?!1:!0:!1}function g(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function p(a){return(a=g(a))&&(0>a.value||"%"===a.unit)?null:a}function r(a){return(a=g(a))&&"%"!==a.unit?null:a}function w(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}
var u="urn:oasis:names:tc:opendocument:xmlns:text:1.0",z="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",y=/^\s*$/,v=new core.DomUtils;this.isParagraph=l;this.getParagraphElement=m;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===u&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===u};this.isODFWhitespace=e;this.isGroupingElement=c;this.isCharacterElement=b;this.firstChild=
n;this.lastChild=a;this.previousNode=h;this.nextNode=f;this.scanLeftForNonWhitespace=d;this.lookLeftForCharacter=function(a){var c;c=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(c=a.data,c=e(c.substr(c.length-1,1))?1===c.length?d(h(a))?2:0:e(c.substr(c.length-2,1))?0:2:1):b(a)&&(c=1);return c};this.lookRightForCharacter=function(a){var c=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?c=!e(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(c){var d=!1;for(c=c&&a(c);c;){if(c.nodeType===
Node.TEXT_NODE&&0<c.length&&!e(c.data)){d=!0;break}if(b(c)){d=!0;break}c=h(c)}return d};this.scanRightForAnyCharacter=t;this.isTrailingWhitespace=k;this.isSignificantWhitespace=q;this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&y.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=g;this.parseNonNegativeLength=p;this.parseFoFontSize=function(a){var b;b=(b=g(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||r(a)};this.parseFoLineHeight=function(a){return p(a)||
r(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,c=[];for(b.nodeType===Node.ELEMENT_NODE&&(c=v.getElementsByTagNameNS(b,u,"p").concat(v.getElementsByTagNameNS(b,u,"h")));b&&!l(b);)b=b.parentNode;b&&c.push(b);return c.filter(function(b){return v.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),d;d=v.getNodesInRange(a,function(d){c.selectNodeContents(d);if(d.nodeType===Node.TEXT_NODE){if(b&&v.rangesIntersect(a,
c)||v.containsRange(a,c))return Boolean(m(d)&&(!e(d.textContent)||q(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(v.rangesIntersect(a,c)&&w(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return d};this.getTextElements=function(a,d){var g=a.startContainer.ownerDocument.createRange(),f;f=v.getNodesInRange(a,function(f){var h=f.nodeType;g.selectNodeContents(f);if(h===Node.TEXT_NODE){if(v.containsRange(a,g)&&(d||Boolean(m(f)&&(!e(f.textContent)||q(f,0)))))return NodeFilter.FILTER_ACCEPT}else if(b(f)){if(v.containsRange(a,
g))return NodeFilter.FILTER_ACCEPT}else if(w(f)||c(f))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});g.detach();return f};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),d;d=v.getNodesInRange(a,function(d){b.selectNodeContents(d);if(l(d)){if(v.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(w(d)||c(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});b.detach();return d}};
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
odf.TextSerializer=function(){function l(c){var b="",n=m.filter?m.filter.acceptNode(c):NodeFilter.FILTER_ACCEPT,a=c.nodeType,h;if(n===NodeFilter.FILTER_ACCEPT||n===NodeFilter.FILTER_SKIP)for(h=c.firstChild;h;)b+=l(h),h=h.nextSibling;n===NodeFilter.FILTER_ACCEPT&&(a===Node.ELEMENT_NODE&&e.isParagraph(c)?b+="\n":a===Node.TEXT_NODE&&c.textContent&&(b+=c.textContent));return b}var m=this,e=new odf.OdfUtils;this.filter=null;this.writeToString=function(c){return c?l(c):""}};
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
odf.TextStyleApplicator=function(l,m,e){function c(a){function b(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(d){return b(a[d],c[d])}):a===c}this.isStyleApplied=function(c){c=m.getAppliedStylesForElement(c);return b(a,c)}}function b(b){var c={};this.applyStyleToContainer=function(k){var n;n=k.getAttributeNS(a,"style-name");var g=k.ownerDocument;n=n||"";if(!c.hasOwnProperty(n)){var p=n,r;r=n?m.createDerivedStyleObject(n,"text",b):b;g=g.createElementNS(h,"style:style");
m.updateStyle(g,r);g.setAttributeNS(h,"style:name",l.generateName());g.setAttributeNS(h,"style:family","text");g.setAttributeNS(f,"scope","document-content");e.appendChild(g);c[p]=g}n=c[n].getAttributeNS(h,"name");k.setAttributeNS(a,"text:style-name",n)}}var n=new core.DomUtils,a=odf.Namespaces.textns,h=odf.Namespaces.stylens,f="urn:webodf:names:scope";this.applyStyle=function(d,f,h){var e={},g,m,l,w;runtime.assert(h&&h["style:text-properties"],"applyStyle without any text properties");e["style:text-properties"]=
h["style:text-properties"];l=new b(e);w=new c(e);d.forEach(function(b){g=w.isStyleApplied(b);if(!1===g){var c=b.ownerDocument,d=b.parentNode,h,e=b,k=new core.LoopWatchDog(1E3);"span"===d.localName&&d.namespaceURI===a?(b.previousSibling&&!n.rangeContainsNode(f,b.previousSibling)?(c=d.cloneNode(!1),d.parentNode.insertBefore(c,d.nextSibling)):c=d,h=!0):(c=c.createElementNS(a,"text:span"),d.insertBefore(c,b),h=!1);for(;e&&(e===b||n.rangeContainsNode(f,e));)k.check(),d=e.nextSibling,e.parentNode!==c&&
c.appendChild(e),e=d;if(e&&h)for(b=c.cloneNode(!1),c.parentNode.insertBefore(b,c.nextSibling);e;)k.check(),d=e.nextSibling,b.appendChild(e),e=d;m=c;l.applyStyleToContainer(m)}})}};
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
odf.Style2CSS=function(){function l(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==p||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===u&&"list-style"===a.localName?"list":a.namespaceURI!==p||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(p,"family"))(c=a.getAttributeNS&&a.getAttributeNS(p,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function m(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=m(a[c].derivedStyles,b)))return d;return null}function e(a,b,c){var d=b[a],f,g;d&&(f=d.getAttributeNS(p,"parent-style-name"),g=null,f&&(g=m(c,f),!g&&b[f]&&(e(f,b,c),g=b[f],b[f]=null)),g?(g.derivedStyles||(g.derivedStyles={}),g.derivedStyles[a]=d):c[a]=d)}function c(a,b){for(var c in a)a.hasOwnProperty(c)&&(e(c,a,b),a[c]=null)}function b(a,b){var c=v[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+s[a].join(d+","+c+"|")+d}function n(a,c,d){var f=[],g,h;f.push(b(a,c));for(g in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(g))for(h in c=n(a,g,d.derivedStyles[g]),c)c.hasOwnProperty(h)&&f.push(c[h]);return f}function a(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function h(a,b){var c="",d,f;for(d in b)if(b.hasOwnProperty(d)&&
(d=b[d],f=a.getAttributeNS(d[0],d[1]))){f=f.trim();if(M.hasOwnProperty(d[1])){var g=f.indexOf(" "),h=void 0,e=void 0;-1!==g?(h=f.substring(0,g),e=f.substring(g)):(h=f,e="");(h=Y.parseLength(h))&&("pt"===h.unit&&0.75>h.value)&&(f="0.75pt"+e)}d[2]&&(c+=d[2]+":"+f+";")}return c}function f(b){return(b=a(b,p,"text-properties"))?Y.parseFoFontSize(b.getAttributeNS(g,"font-size")):null}function d(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?
{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function t(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var f=c.getAttributeNS(u,"level"),g;c=Y.getFirstNonWhitespaceChild(c);c=Y.getFirstNonWhitespaceChild(c);var h;c&&(g=c.attributes,h=g["fo:text-indent"]?g["fo:text-indent"].value:void 0,g=g["fo:margin-left"]?g["fo:margin-left"].value:void 0);h||(h="-0.6cm");c="-"===h.charAt(0)?h.substring(1):"-"+h;for(f=f&&parseInt(f,10);1<f;)b+=" > text|list-item > text|list",f-=1;f=b+" > text|list-item > *:not(text|list):first-child";
void 0!==g&&(g=f+"{margin-left:"+g+";}",a.insertRule(g,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+d+";";d+="counter-increment:list;";d+="margin-left:"+h+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(e){throw e;}}function k(b,c,e,m){if("list"===c)for(var l=m.firstChild,r,s;l;){if(l.namespaceURI===u)if(r=l,"list-level-style-number"===l.localName){var v=r;s=v.getAttributeNS(p,"num-format");var M=v.getAttributeNS(p,
"num-suffix"),F={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},v=v.getAttributeNS(p,"num-prefix")||"",v=F.hasOwnProperty(s)?v+(" counter(list, "+F[s]+")"):s?v+("'"+s+"';"):v+" ''";M&&(v+=" '"+M+"'");s="content: "+v+";";t(b,e,r,s)}else"list-level-style-image"===l.localName?(s="content: none;",t(b,e,r,s)):"list-level-style-bullet"===l.localName&&(s="content: '"+r.getAttributeNS(u,"bullet-char")+"';",t(b,e,r,s));l=l.nextSibling}else if("page"===c)if(M=r=e="",l=m.getElementsByTagNameNS(p,
"page-layout-properties")[0],r=l.parentNode.parentNode.parentNode.masterStyles,M="",e+=h(l,ea),s=l.getElementsByTagNameNS(p,"background-image"),0<s.length&&(M=s.item(0).getAttributeNS(z,"href"))&&(e+="background-image: url('odfkit:"+M+"');",s=s.item(0),e+=h(s,I)),"presentation"===Z){if(r)for(s=r.getElementsByTagNameNS(p,"master-page"),F=0;F<s.length;F+=1)if(s[F].getAttributeNS(p,"page-layout-name")===l.parentNode.getAttributeNS(p,"name")){M=s[F].getAttributeNS(p,"name");r="draw|page[draw|master-page-name="+
M+"] {"+e+"}";M="office|body, draw|page[draw|master-page-name="+M+"] {"+h(l,pa)+" }";try{b.insertRule(r,b.cssRules.length),b.insertRule(M,b.cssRules.length)}catch(ma){throw ma;}}}else{if("text"===Z){r="office|text {"+e+"}";M="office|body {width: "+l.getAttributeNS(g,"page-width")+";}";try{b.insertRule(r,b.cssRules.length),b.insertRule(M,b.cssRules.length)}catch(ka){throw ka;}}}else{e=n(c,e,m).join(",");l="";if(r=a(m,p,"text-properties")){var F=r,U;s=U="";M=1;r=""+h(F,A);v=F.getAttributeNS(p,"text-underline-style");
"solid"===v&&(U+=" underline");v=F.getAttributeNS(p,"text-line-through-style");"solid"===v&&(U+=" line-through");U.length&&(r+="text-decoration:"+U+";");if(U=F.getAttributeNS(p,"font-name")||F.getAttributeNS(g,"font-family"))v=qa[U],r+="font-family: "+(v||U)+", sans-serif;";v=F.parentNode;if(F=f(v)){for(;v;){if(F=f(v)){if("%"!==F.unit){s="font-size: "+F.value*M+F.unit+";";break}M*=F.value/100}F=v;U=v="";v=null;"default-style"===F.localName?v=null:(v=F.getAttributeNS(p,"parent-style-name"),U=F.getAttributeNS(p,
"family"),v=T.getODFElementsWithXPath(Q,v?"//style:*[@style:name='"+v+"'][@style:family='"+U+"']":"//style:default-style[@style:family='"+U+"']",odf.Namespaces.resolvePrefix)[0])}s||(s="font-size: "+parseFloat($)*M+P.getUnits($)+";");r+=s}l+=r}if(r=a(m,p,"paragraph-properties"))s=r,r=""+h(s,D),M=s.getElementsByTagNameNS(p,"background-image"),0<M.length&&(F=M.item(0).getAttributeNS(z,"href"))&&(r+="background-image: url('odfkit:"+F+"');",M=M.item(0),r+=h(M,I)),(s=s.getAttributeNS(g,"line-height"))&&
"normal"!==s&&(s=Y.parseFoLineHeight(s),r="%"!==s.unit?r+("line-height: "+s.value+s.unit+";"):r+("line-height: "+s.value/100+";")),l+=r;if(r=a(m,p,"graphic-properties"))F=r,r=""+h(F,N),s=F.getAttributeNS(q,"opacity"),M=F.getAttributeNS(q,"fill"),F=F.getAttributeNS(q,"fill-color"),"solid"===M||"hatch"===M?F&&"none"!==F?(s=isNaN(parseFloat(s))?1:parseFloat(s)/100,(F=d(F))&&(r+="background-color: rgba("+F.r+","+F.g+","+F.b+","+s+");")):r+="background: none;":"none"===M&&(r+="background: none;"),l+=r;
if(r=a(m,p,"drawing-page-properties"))s=""+h(r,N),"true"===r.getAttributeNS(y,"background-visible")&&(s+="background: none;"),l+=s;if(r=a(m,p,"table-cell-properties"))r=""+h(r,B),l+=r;if(r=a(m,p,"table-row-properties"))r=""+h(r,C),l+=r;if(r=a(m,p,"table-column-properties"))r=""+h(r,L),l+=r;if(r=a(m,p,"table-properties"))s=r,r=""+h(s,K),s=s.getAttributeNS(w,"border-model"),"collapsing"===s?r+="border-collapse:collapse;":"separating"===s&&(r+="border-collapse:separate;"),l+=r;if(0!==l.length)try{b.insertRule(e+
"{"+l+"}",b.cssRules.length)}catch(na){throw na;}}for(var W in m.derivedStyles)m.derivedStyles.hasOwnProperty(W)&&k(b,c,W,m.derivedStyles[W])}var q=odf.Namespaces.drawns,g=odf.Namespaces.fons,p=odf.Namespaces.stylens,r=odf.Namespaces.svgns,w=odf.Namespaces.tablens,u=odf.Namespaces.textns,z=odf.Namespaces.xlinkns,y=odf.Namespaces.presentationns,v={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},A=[[g,"color","color"],[g,"background-color","background-color"],[g,"font-weight","font-weight"],[g,"font-style","font-style"]],I=[[p,"repeat",
"background-repeat"]],D=[[g,"background-color","background-color"],[g,"text-align","text-align"],[g,"text-indent","text-indent"],[g,"padding","padding"],[g,"padding-left","padding-left"],[g,"padding-right","padding-right"],[g,"padding-top","padding-top"],[g,"padding-bottom","padding-bottom"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"margin","margin"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],
[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"],[g,"border","border"]],N=[[g,"background-color","background-color"],[g,"min-height","min-height"],[q,"stroke","border"],[r,"stroke-color","border-color"],[r,"stroke-width","border-width"],[g,"border","border"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"]],B=[[g,"background-color","background-color"],[g,"border-left","border-left"],[g,"border-right",
"border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"border","border"]],L=[[p,"column-width","width"]],C=[[p,"row-height","height"],[g,"keep-together",null]],K=[[p,"width","width"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"]],ea=[[g,"background-color","background-color"],[g,"padding","padding"],[g,"padding-left","padding-left"],[g,"padding-right","padding-right"],[g,"padding-top",
"padding-top"],[g,"padding-bottom","padding-bottom"],[g,"border","border"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"margin","margin"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"]],pa=[[g,"page-width","width"],[g,"page-height","height"]],M={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},qa={},Y=new odf.OdfUtils,Z,Q,$,T=new xmldom.XPath,P=new core.CSSUnits;this.style2css=function(a,b,d,f,g){for(var h,e,n,m;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);h=null;f&&(h=f.ownerDocument,Q=f.parentNode);g&&(h=g.ownerDocument,Q=g.parentNode);if(h)for(m in odf.Namespaces.forEachPrefix(function(a,c){n="@namespace "+a+" url("+c+");";try{b.insertRule(n,b.cssRules.length)}catch(d){}}),qa=d,Z=a,$=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",a=l(f),f=l(g),g={},v)if(v.hasOwnProperty(m))for(e in d=g[m]={},c(a[m],d),c(f[m],d),d)d.hasOwnProperty(e)&&k(b,m,e,d[e])}};
// Input 33
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function l(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function m(a){var b,c=k.length;for(b=0;b<c;b+=1)if(a.namespaceURI===f&&a.localName===k[b])return b;return-1}function e(a,b){var c=new h.UsedStyleList(a,b),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var f=d.acceptNode(a);f===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&(f=c.uses(a)?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT);return f}}function c(a,b){var c=new e(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function b(a,b){if(b){var c=m(b),d,f=a.firstChild;if(-1!==c){for(;f;){d=m(f);if(-1!==d&&d>c)break;f=f.nextSibling}a.insertBefore(b,f)}}}function n(a){this.OdfContainer=a}function a(a,
b,c,d){var f=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);f.url=b;if(f.onchange)f.onchange(f);if(f.onstatereadychange)f.onstatereadychange(f)}))}}var h=new odf.StyleInfo,f="urn:oasis:names:tc:opendocument:xmlns:office:1.0",d="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
t="urn:webodf:names:scope",k="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),q=(new Date).getTime()+"_webodf_",g=new core.Base64;n.prototype=new function(){};n.prototype.constructor=n;n.namespaceURI=f;n.localName="document";a.prototype.load=function(){};a.prototype.getUrl=function(){return this.data?"data:;base64,"+g.toBase64(this.data):null};odf.OdfContainer=function r(g,k){function m(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?
m(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function y(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS(t,"scope",b),c=c.nextSibling}function v(a,b){var c=null,d,f,g;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)f=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(g=d.getAttributeNS(t,"scope"))&&g!==b&&c.removeChild(d),d=f;return c}function s(a){var b=G.rootElement.ownerDocument,c;if(a){m(a.documentElement);try{c=b.importNode(a.documentElement,
!0)}catch(d){}}return c}function A(a){G.state=a;if(G.onchange)G.onchange(G);if(G.onstatereadychange)G.onstatereadychange(G)}function I(a){ca=null;G.rootElement=a;a.fontFaceDecls=l(a,f,"font-face-decls");a.styles=l(a,f,"styles");a.automaticStyles=l(a,f,"automatic-styles");a.masterStyles=l(a,f,"master-styles");a.body=l(a,f,"body");a.meta=l(a,f,"meta")}function D(a){a=s(a);var c=G.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===f?(c.fontFaceDecls=l(a,f,"font-face-decls"),b(c,c.fontFaceDecls),
c.styles=l(a,f,"styles"),b(c,c.styles),c.automaticStyles=l(a,f,"automatic-styles"),y(c.automaticStyles,"document-styles"),b(c,c.automaticStyles),c.masterStyles=l(a,f,"master-styles"),b(c,c.masterStyles),h.prefixStyleNames(c.automaticStyles,q,c.masterStyles)):A(r.INVALID)}function N(a){a=s(a);var c,d,g;if(a&&"document-content"===a.localName&&a.namespaceURI===f){c=G.rootElement;d=l(a,f,"font-face-decls");if(c.fontFaceDecls&&d)for(g=d.firstChild;g;)c.fontFaceDecls.appendChild(g),g=d.firstChild;else d&&
(c.fontFaceDecls=d,b(c,d));d=l(a,f,"automatic-styles");y(d,"document-content");if(c.automaticStyles&&d)for(g=d.firstChild;g;)c.automaticStyles.appendChild(g),g=d.firstChild;else d&&(c.automaticStyles=d,b(c,d));c.body=l(a,f,"body");b(c,c.body)}else A(r.INVALID)}function B(a){a=s(a);var c;a&&("document-meta"===a.localName&&a.namespaceURI===f)&&(c=G.rootElement,c.meta=l(a,f,"meta"),b(c,c.meta))}function L(a){a=s(a);var c;a&&("document-settings"===a.localName&&a.namespaceURI===f)&&(c=G.rootElement,c.settings=
l(a,f,"settings"),b(c,c.settings))}function C(a){a=s(a);var b;if(a&&"manifest"===a.localName&&a.namespaceURI===d)for(b=G.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===d)&&(R[a.getAttributeNS(d,"full-path")]=a.getAttributeNS(d,"media-type")),a=a.nextSibling}function K(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],H.loadAsDOM(c,function(b,c){d(c);b||G.state===r.INVALID||K(a)})):A(r.DONE)}function ea(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function pa(){var a=new xmldom.LSSerializer,b=ea("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(G.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function M(a,b){var c=document.createElementNS(d,"manifest:file-entry");c.setAttributeNS(d,"manifest:full-path",a);c.setAttributeNS(d,"manifest:media-type",b);return c}function qa(){var a=
runtime.parseXML('<manifest:manifest xmlns:manifest="'+d+'"></manifest:manifest>'),b=l(a,d,"manifest"),c=new xmldom.LSSerializer,f;for(f in R)R.hasOwnProperty(f)&&b.appendChild(M(f,R[f]));c.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+c.writeToString(a,odf.Namespaces.namespaceMap)}function Y(){var a=new xmldom.LSSerializer,b=ea("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(G.rootElement.settings,odf.Namespaces.namespaceMap);
return b+"</office:document-settings>"}function Z(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=v(G.rootElement.automaticStyles,"document-styles"),d=G.rootElement.masterStyles&&G.rootElement.masterStyles.cloneNode(!0),f=ea("document-styles");h.removePrefixFromStyleNames(c,q,d);b.filter=new e(d,c);f+=b.writeToString(G.rootElement.fontFaceDecls,a);f+=b.writeToString(G.rootElement.styles,a);f+=b.writeToString(c,a);f+=b.writeToString(d,a);return f+"</office:document-styles>"}function Q(){var a=
odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,d=v(G.rootElement.automaticStyles,"document-content"),f=ea("document-content");b.filter=new c(G.rootElement.body,d);f+=b.writeToString(d,a);f+=b.writeToString(G.rootElement.body,a);return f+"</office:document-content>"}function $(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var d=s(c);d&&"document"===d.localName&&d.namespaceURI===f?(I(d),A(r.DONE)):A(r.INVALID)}})}function T(){function a(b,c){var g;c||(c=b);g=document.createElementNS(f,
c);d[b]=g;d.appendChild(g)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),d=G.rootElement,g=document.createElementNS(f,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");d.body.appendChild(g);A(r.DONE);return b}function P(){var a,b=new Date;a=runtime.byteArrayFromString(Y(),"utf8");
H.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(pa(),"utf8");H.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(Z(),"utf8");H.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(Q(),"utf8");H.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(qa(),"utf8");H.save("META-INF/manifest.xml",a,!0,b)}function J(a,b){P();H.writeAs(a,function(a){b(a)})}var G=this,H,R={},ca;this.onstatereadychange=k;this.rootElement=this.state=this.onchange=null;this.setRootElement=I;this.getContentElement=
function(){var a;ca||(a=G.rootElement.body,ca=a.getElementsByTagNameNS(f,"text")[0]||a.getElementsByTagNameNS(f,"presentation")[0]||a.getElementsByTagNameNS(f,"spreadsheet")[0]);return ca};this.getDocumentType=function(){var a=G.getContentElement();return a&&a.localName};this.getPart=function(b){return new a(b,R[b],G,H)};this.getPartData=function(a,b){H.load(a,b)};this.createByteArray=function(a,b){P();H.createByteArray(a,b)};this.saveAs=J;this.save=function(a){J(g,a)};this.getUrl=function(){return g};
this.state=r.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(n);H=g?new core.Zip(g,function(a,b){H=b;a?$(g,function(b){a&&(H.error=a+"\n"+b,A(r.INVALID))}):K([["styles.xml",D],["content.xml",N],["meta.xml",B],["settings.xml",L],["META-INF/manifest.xml",C]])}):T()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=
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
odf.FontLoader=function(){function l(c,b,n,a,h){var f,d=0,m;for(m in c)if(c.hasOwnProperty(m)){if(d===n){f=m;break}d+=1}f?b.getPartData(c[f].href,function(d,m){if(d)runtime.log(d);else{var g="@font-face { font-family: '"+(c[f].family||f)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+e.convertUTF8ArrayToBase64(m)+') format("truetype"); }';try{a.insertRule(g,a.cssRules.length)}catch(p){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(p)+"\nRule: "+g)}}l(c,b,n+1,a,h)}):
h&&h()}var m=new xmldom.XPath,e=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(c,b){for(var e=c.rootElement.fontFaceDecls;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);if(e){var a={},h,f,d,t;if(e)for(e=m.getODFElementsWithXPath(e,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),h=0;h<e.length;h+=1)f=e[h],d=f.getAttributeNS(odf.Namespaces.stylens,"name"),t=f.getAttributeNS(odf.Namespaces.svgns,"font-family"),f=m.getODFElementsWithXPath(f,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<f.length&&(f=f[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),a[d]={href:f,family:t});l(a,c,0,b)}}};return odf.FontLoader}();
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
odf.StyleNameGenerator=function(l,m){var e={};this.generateName=function(){var c,b={},n=0;m.getAllStyleNames().forEach(function(a){b[a]=!0});do c=l+n,n+=1;while(e[c]||b[c]);e[c]=!0;return c}};
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
odf.Formatting=function(){function l(){for(var a=d.rootElement.fontFaceDecls,b={},c,f,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(c=a.getAttributeNS(q,"name"))&&((f=a.getAttributeNS(k,"font-family"))||a.getElementsByTagNameNS(k,"font-face-uri")[0])&&(b[c]=f),a=a.nextSibling;return b}function m(a){for(var b=d.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===q&&"default-style"===b.localName&&b.getAttributeNS(q,"family")===a)return b;b=b.nextSibling}return null}
function e(a,b,c){var f,e;c=c||[d.rootElement.automaticStyles,d.rootElement.styles];for(f=c.shift();f;){for(f=f.firstChild;f;){if(f.nodeType===Node.ELEMENT_NODE&&(e=f.getAttributeNS(q,"name"),f.namespaceURI===q&&"style"===f.localName&&f.getAttributeNS(q,"family")===b&&e===a||"list-style"===b&&f.namespaceURI===g&&"list-style"===f.localName&&e===a||"data"===b&&f.namespaceURI===p&&e===a))return f;f=f.nextSibling}f=c.shift()}return null}function c(a){for(var b,c={},d=a.firstChild;d;){if(d.nodeType===
Node.ELEMENT_NODE&&d.namespaceURI===q)for(c[d.nodeName]={},b=0;b<d.attributes.length;b+=1)c[d.nodeName][d.attributes[b].name]=d.attributes[b].value;d=d.nextSibling}for(b=0;b<a.attributes.length;b+=1)c[a.attributes[b].name]=a.attributes[b].value;return c}function b(a,c){Object.keys(c).forEach(function(d){var f=d.split(":"),g=f[1],e=odf.Namespaces.resolvePrefix(f[0]),f=c[d];"object"===typeof f&&Object.keys(f).length?(d=a.getElementsByTagNameNS(e,g)[0]||a.ownerDocument.createElementNS(e,d),a.appendChild(d),
b(d,f)):e&&a.setAttributeNS(e,d,f)})}function n(a,b){for(var f=d.rootElement.styles,g,h={},k=a.getAttributeNS(q,"family"),n=a;n;)g=c(n),h=w.mergeObjects(g,h),n=(g=n.getAttributeNS(q,"parent-style-name"))?e(g,k,[f]):null;if(n=m(k))g=c(n),h=w.mergeObjects(g,h);b&&(g=(f=u[k])?w.mergeObjects({},f):null)&&(h=w.mergeObjects(g,h));return h}function a(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,f=[],g="",e=!1;c;)!e&&r.isGroupingElement(c)&&(e=!0),(d=t.determineStylesForNode(c))&&f.push(d),
c=c.parentNode;e&&(f.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){g+="|"+b+":"+a+"|"})})}),b&&(b[g]=f));return e?f:void 0}function h(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var d=Object.keys(a[c])[0],f,g;(f=e(d,c))?(g=n(f),b=w.mergeObjects(g,b),g=f.getAttributeNS(q,"display-name")):runtime.log("No style element found for '"+d+"' of family '"+c+"'");b.orderedStyles.push({name:d,family:c,displayName:g})})});
return b}var f=this,d,t=new odf.StyleInfo,k=odf.Namespaces.svgns,q=odf.Namespaces.stylens,g=odf.Namespaces.textns,p=odf.Namespaces.numberns,r=new odf.OdfUtils,w=new core.Utils,u={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.setOdfContainer=function(a){d=a};this.getFontMap=l;this.getAvailableParagraphStyles=function(){for(var a=d.rootElement.styles&&d.rootElement.styles.firstChild,b,c,f=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===q)&&(c=
a,b=c.getAttributeNS(q,"family"),"paragraph"===b&&(b=c.getAttributeNS(q,"name"),c=c.getAttributeNS(q,"display-name")||b,b&&c&&f.push({name:b,displayName:c}))),a=a.nextSibling;return f};this.isStyleUsed=function(a){var b;b=t.hasDerivedStyles(d.rootElement,odf.Namespaces.resolvePrefix,a);a=(new t.UsedStyleList(d.rootElement.styles)).uses(a)||(new t.UsedStyleList(d.rootElement.automaticStyles)).uses(a)||(new t.UsedStyleList(d.rootElement.body)).uses(a);return b||a};this.getDefaultStyleElement=m;this.getStyleElement=
e;this.getStyleAttributes=c;this.getInheritedStyleAttributes=n;this.getFirstNamedParentStyleNameOrSelf=function(a){var b=d.rootElement.automaticStyles,c=d.rootElement.styles,f;for(f=e(a,"paragraph",[b]);f;)a=f.getAttributeNS(q,"parent-style-name"),f=e(a,"paragraph",[b]);return(f=e(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(e(a,"paragraph"))};this.getAppliedStyles=function(b){var c={},d=[];b.forEach(function(b){a(b,c)});Object.keys(c).forEach(function(a){d.push(h(c[a]))});
return d};this.getAppliedStylesForElement=function(b){return(b=a(b))?h(b):void 0};this.applyStyle=function(a,b,c,g){(new odf.TextStyleApplicator(new odf.StyleNameGenerator("auto"+w.hashString(a)+"_",f),f,d.rootElement.automaticStyles)).applyStyle(b,c,g)};this.getAllStyleNames=function(){var a,b=[];[d.rootElement.automaticStyles,d.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===q&&"style"===a.localName||a.namespaceURI===g&&"list-style"===
a.localName)&&b.push(a.getAttributeNS(q,"name")),a=a.nextSibling});return b};this.updateStyle=function(a,c){var f,g;b(a,c);(f=c["style:text-properties"]&&c["style:text-properties"]["style:font-name"])&&!l().hasOwnProperty(f)&&(g=a.ownerDocument.createElementNS(q,"style:font-face"),g.setAttributeNS(q,"style:name",f),g.setAttributeNS(k,"svg:font-family",f),d.rootElement.fontFaceDecls.appendChild(g))};this.createDerivedStyleObject=function(a,b,f){var g=e(a,b);runtime.assert(Boolean(g),"No style element found for '"+
a+"' of family '"+b+"'");a=g.parentNode===d.rootElement.automaticStyles?c(g):{"style:parent-style-name":a};a["style:family"]=b;w.mergeObjects(a,f);return a};this.getDefaultTabStopDistance=function(){var a=m("paragraph");(a=(a=a&&a.getAttributeNS(q,"paragraph-properties"))&&a.getAttributeNS(q,"tab-stop-distance"))||(a="1.25cm");return r.parseNonNegativeLength(a)}};
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
odf.OdfCanvas=function(){function l(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(f){runtime.log(f)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function m(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function e(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function c(a,b,c){var d=
"on"+b;a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent(d,c):a[d]===c&&(a[d]=null)}function b(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}function d(){var c=[],e=runtime.getWindow().getSelection(),h,k;for(h=0;h<e.rangeCount;h+=1)k=e.getRangeAt(h),null!==k&&(b(a,k.startContainer)&&b(a,k.endContainer))&&c.push(k);if(c.length===f.length){for(e=0;e<c.length&&(h=c[e],k=f[e],h=h===k?!1:null===h||null===k?!0:h.startContainer!==k.startContainer||h.startOffset!==
k.startOffset||h.endContainer!==k.endContainer||h.endOffset!==k.endOffset,!h);e+=1);if(e===c.length)return}f=c;var e=[c.length],n,m=a.ownerDocument;for(h=0;h<c.length;h+=1)k=c[h],n=m.createRange(),n.setStart(k.startContainer,k.startOffset),n.setEnd(k.endContainer,k.endOffset),e[h]=n;f=e;e=g.length;for(c=0;c<e;c+=1)g[c](a,f)}var f=[],g=[];this.addListener=function(a,b){var c,d=g.length;for(c=0;c<d;c+=1)if(g[c]===b)return;g.push(b)};this.destroy=function(b){c(a,"mouseup",d);c(a,"keyup",d);c(a,"keydown",
d);b()};e(a,"mouseup",d);e(a,"keyup",d);e(a,"keydown",d)}function n(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function a(b,c,d,f){d.setAttribute("styleid",c);var g,e=d.getAttributeNS(s,"anchor-type"),h=d.getAttributeNS(y,"x"),k=d.getAttributeNS(y,"y"),n=d.getAttributeNS(y,"width"),m=d.getAttributeNS(y,"height"),l=d.getAttributeNS(w,"min-height"),p=d.getAttributeNS(w,"min-width"),q=d.getAttributeNS(r,"master-page-name"),
u=null,t,v;t=0;var A,N=b.rootElement.ownerDocument;if(q){u=b.rootElement.masterStyles.getElementsByTagNameNS(z,"master-page");t=null;for(v=0;v<u.length;v+=1)if(u[v].getAttributeNS(z,"name")===q){t=u[v];break}u=t}else u=null;if(u){q=N.createElementNS(r,"draw:page");A=u.firstElementChild;for(t=0;A;)"true"!==A.getAttributeNS(D,"placeholder")&&(v=A.cloneNode(!0),q.appendChild(v),a(b,c+"_"+t,v,f)),A=A.nextElementSibling,t+=1;K.appendChild(q);t=K.getElementsByTagNameNS(r,"page").length;if(v=q.getElementsByTagNameNS(s,
"page-number")[0]){for(;v.firstChild;)v.removeChild(v.firstChild);v.appendChild(N.createTextNode(t))}a(b,c,q,f);q.setAttributeNS(r,"draw:master-page-name",u.getAttributeNS(z,"name"))}if("as-char"===e)g="display: inline-block;";else if(e||h||k)g="position: absolute;";else if(n||m||l||p)g="display: block;";h&&(g+="left: "+h+";");k&&(g+="top: "+k+";");n&&(g+="width: "+n+";");m&&(g+="height: "+m+";");l&&(g+="min-height: "+l+";");p&&(g+="min-width: "+p+";");g&&(g="draw|"+d.localName+'[styleid="'+c+'"] {'+
g+"}",f.insertRule(g,f.cssRules.length))}function h(a){for(a=a.firstChild;a;){if(a.namespaceURI===u&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function f(a,b,c,d){function f(b){b&&(b='draw|image[styleid="'+a+'"] {'+("background-image: url("+b+");")+"}",d.insertRule(b,d.cssRules.length))}c.setAttribute("styleid",a);var g=c.getAttributeNS(A,"href"),e;if(g)try{e=b.getPart(g),e.onchange=function(a){f(a.url)},e.load()}catch(k){runtime.log("slight problem: "+
k)}else g=h(c),f(g)}function d(a){function b(c){var d,f;c.hasAttributeNS(A,"href")&&(d=c.getAttributeNS(A,"href"),"#"===d[0]?(d=d.substring(1),f=function(){var b=B.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=B.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);return!1}):f=function(){N.open(d)},c.onclick=f)}var c,d,f;d=a.getElementsByTagNameNS(s,
"a");for(c=0;c<d.length;c+=1)f=d.item(c),b(f)}function t(a){var b=a.ownerDocument;C.getElementsByTagNameNS(a,s,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(s,"c"),10);if(1<d)for(a.removeAttributeNS(s,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function k(a){C.getElementsByTagNameNS(a,s,"tab").forEach(function(a){a.textContent="\t"})}function q(a,b){function c(a,g){var h=e.documentElement.namespaceURI;
"video/"===g.substr(0,6)?(d=e.createElementNS(h,"video"),d.setAttribute("controls","controls"),f=e.createElementNS(h,"source"),f.setAttribute("src",a),f.setAttribute("type",g),d.appendChild(f),b.parentNode.appendChild(d)):b.innerHtml="Unrecognised Plugin"}var d,f,g,e=b.ownerDocument,k;if(g=b.getAttributeNS(A,"href"))try{k=a.getPart(g),k.onchange=function(a){c(a.url,a.mimetype)},k.load()}catch(n){runtime.log("slight problem: "+n)}else runtime.log("using MP4 data fallback"),g=h(b),c(g,"video/mp4")}
function g(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function p(a){var b=
a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var r=odf.Namespaces.drawns,w=odf.Namespaces.fons,u=odf.Namespaces.officens,z=odf.Namespaces.stylens,y=odf.Namespaces.svgns,v=odf.Namespaces.tablens,s=odf.Namespaces.textns,A=odf.Namespaces.xlinkns,
I=odf.Namespaces.xmlns,D=odf.Namespaces.presentationns,N=runtime.getWindow(),B=new xmldom.XPath,L=new odf.OdfUtils,C=new core.DomUtils,K;odf.OdfCanvas=function(c){function h(a,b,c){function d(a,b,c,g){oa.addToQueue(function(){f(a,b,c,g)})}var g,e;g=b.getElementsByTagNameNS(r,"image");for(b=0;b<g.length;b+=1)e=g.item(b),d("image"+String(b),a,e,c)}function w(a,b){function c(a,b){oa.addToQueue(function(){q(a,b)})}var d,f,g;f=b.getElementsByTagNameNS(r,"plugin");for(d=0;d<f.length;d+=1)g=f.item(d),c(a,
g)}function A(){O.firstChild&&(1<x?(O.style.MozTransformOrigin="center top",O.style.WebkitTransformOrigin="center top",O.style.OTransformOrigin="center top",O.style.msTransformOrigin="center top"):(O.style.MozTransformOrigin="left top",O.style.WebkitTransformOrigin="left top",O.style.OTransformOrigin="left top",O.style.msTransformOrigin="left top"),O.style.WebkitTransform="scale("+x+")",O.style.MozTransform="scale("+x+")",O.style.OTransform="scale("+x+")",O.style.msTransform="scale("+x+")",c.style.width=
Math.round(x*O.offsetWidth)+"px",c.style.height=Math.round(x*O.offsetHeight)+"px")}function y(a){function b(a){return d===a.getAttributeNS(u,"name")}var c=C.getElementsByTagNameNS(a,u,"annotation");a=C.getElementsByTagNameNS(a,u,"annotation-end");var d,f;for(f=0;f<c.length;f+=1)d=c[f].getAttributeNS(u,"name"),F.addAnnotation({node:c[f],end:a.filter(b)[0]||null});F.rerenderAnnotations()}function D(a){ja?(ba.parentNode||(O.appendChild(ba),A()),F&&F.forgetAnnotations(),F=new gui.AnnotationViewManager(J,
a.body,ba),y(a.body)):ba.parentNode&&(O.removeChild(ba),F.forgetAnnotations(),A())}function Q(b){function f(){for(var g=c;g.firstChild;)g.removeChild(g.firstChild);c.style.display="inline-block";g=H.rootElement;c.ownerDocument.importNode(g,!0);R.setOdfContainer(H);var e=H,m=ka;(new odf.FontLoader).loadFonts(e,m.sheet);n(H,R,U);for(var m=H,e=na.sheet,l=c;l.firstChild;)l.removeChild(l.firstChild);O=G.createElementNS(c.namespaceURI,"div");O.style.display="inline-block";O.style.background="white";O.appendChild(g);
c.appendChild(O);ba=G.createElementNS(c.namespaceURI,"div");ba.id="annotationsPane";K=G.createElementNS(c.namespaceURI,"div");K.id="shadowContent";K.style.position="absolute";K.style.top=0;K.style.left=0;m.getContentElement().appendChild(K);var l=g.body,p,q,u;q=[];for(p=l.firstChild;p&&p!==l;)if(p.namespaceURI===r&&(q[q.length]=p),p.firstChild)p=p.firstChild;else{for(;p&&p!==l&&!p.nextSibling;)p=p.parentNode;p&&p.nextSibling&&(p=p.nextSibling)}for(u=0;u<q.length;u+=1)p=q[u],a(m,"frame"+String(u),
p,e);q=B.getODFElementsWithXPath(l,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(p=0;p<q.length;p+=1)l=q[p],l.setAttributeNS&&l.setAttributeNS("urn:webodf","containsparagraphanchor",!0);p=g.body.getElementsByTagNameNS(v,"table-cell");for(l=0;l<p.length;l+=1)q=p.item(l),q.hasAttributeNS(v,"number-columns-spanned")&&q.setAttribute("colspan",q.getAttributeNS(v,"number-columns-spanned")),q.hasAttributeNS(v,"number-rows-spanned")&&q.setAttribute("rowspan",q.getAttributeNS(v,
"number-rows-spanned"));d(g.body);t(g.body);k(g.body);h(m,g.body,e);w(m,g.body);q=g.body;var V,X,ga,y,l={};p={};var C;u=N.document.getElementsByTagNameNS(s,"list-style");for(m=0;m<u.length;m+=1)V=u.item(m),(ga=V.getAttributeNS(z,"name"))&&(p[ga]=V);q=q.getElementsByTagNameNS(s,"list");for(m=0;m<q.length;m+=1)if(V=q.item(m),u=V.getAttributeNS(I,"id")){X=V.getAttributeNS(s,"continue-list");V.setAttribute("id",u);y="text|list#"+u+" > text|list-item > *:first-child:before {";if(ga=V.getAttributeNS(s,
"style-name")){V=p[ga];C=L.getFirstNonWhitespaceChild(V);V=void 0;if(C)if("list-level-style-number"===C.localName){V=C.getAttributeNS(z,"num-format");ga=C.getAttributeNS(z,"num-suffix");var x="",x={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},E=void 0,E=C.getAttributeNS(z,"num-prefix")||"",E=x.hasOwnProperty(V)?E+(" counter(list, "+x[V]+")"):V?E+("'"+V+"';"):E+" ''";ga&&(E+=" '"+ga+"'");V=x="content: "+E+";"}else"list-level-style-image"===C.localName?V="content: none;":
"list-level-style-bullet"===C.localName&&(V="content: '"+C.getAttributeNS(s,"bullet-char")+"';");C=V}if(X){for(V=l[X];V;)X=V,V=l[X];y+="counter-increment:"+X+";";C?(C=C.replace("list",X),y+=C):y+="content:counter("+X+");"}else X="",C?(C=C.replace("list",u),y+=C):y+="content: counter("+u+");",y+="counter-increment:"+u+";",e.insertRule("text|list#"+u+" {counter-reset:"+u+"}",e.cssRules.length);y+="}";l[u]=X;y&&e.insertRule(y,e.cssRules.length)}O.insertBefore(K,O.firstChild);A();D(g);if(!b&&(g=[H],la.hasOwnProperty("statereadychange")))for(e=
la.statereadychange,C=0;C<e.length;C+=1)e[C].apply(null,g)}H.state===odf.OdfContainer.DONE?f():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function ha(){H.state===odf.OdfContainer.DONE?f():(runtime.log("will be back later..."),runtime.setTimeout(ha,500))},100))}function $(a){oa.clearQueue();c.innerHTML="loading "+a;c.removeAttribute("style");H=new odf.OdfContainer(a,function(a){H=a;Q(!1)})}function T(){if(S){for(var a=S.ownerDocument.createDocumentFragment();S.firstChild;)a.insertBefore(S.firstChild,
null);S.parentNode.replaceChild(a,S)}}function P(a){a=a||N.event;for(var b=a.target,c=N.getSelection(),d=0<c.rangeCount?c.getRangeAt(0):null,f=d&&d.startContainer,g=d&&d.startOffset,e=d&&d.endContainer,h=d&&d.endOffset,k,n;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==s);)b=b.parentNode;W&&(b&&b.parentNode!==S)&&(k=b.ownerDocument,n=k.documentElement.namespaceURI,S?S.parentNode&&T():(S=k.createElementNS(n,"p"),S.style.margin="0px",S.style.padding="0px",S.style.border="0px",S.setAttribute("contenteditable",
!0)),b.parentNode.replaceChild(S,b),S.appendChild(b),S.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),d.setStart(f,g),d.setEnd(e,h),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==c&&void 0!==c,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==c.ownerDocument&&void 0!==c.ownerDocument,"odf.OdfCanvas constructor needs DOM");var J=this,G=c.ownerDocument,H,R=new odf.Formatting,ca=
new b(c),fa,O,ba,ja=!1,F,ma,ka,U,na,W=!1,x=1,la={},S,oa=new l;this.refreshCSS=function(){n(H,R,U);A()};this.refreshSize=function(){A()};this.odfContainer=function(){return H};this.slidevisibilitycss=function(){return fa.css};this.setOdfContainer=function(a,b){H=a;Q(!0===b)};this.load=this.load=$;this.save=function(a){T();H.save(a)};this.setEditable=function(a){e(c,"click",P);(W=a)||T()};this.addListener=function(a,b){switch(a){case "selectionchange":ca.addListener(a,b);break;case "click":e(c,a,b);
break;default:var d=la[a];void 0===d&&(d=la[a]=[]);b&&-1===d.indexOf(b)&&d.push(b)}};this.getFormatting=function(){return R};this.getAnnotationManager=function(){return F};this.refreshAnnotations=function(){D(H.rootElement)};this.rerenderAnnotations=function(){F&&F.rerenderAnnotations()};this.getSizer=function(){return O};this.enableAnnotations=function(a){a!==ja&&(ja=a,H&&D(H.rootElement))};this.addAnnotation=function(a){F&&F.addAnnotation(a)};this.forgetAnnotations=function(){F&&F.forgetAnnotations()};
this.setZoomLevel=function(a){x=a;A()};this.getZoomLevel=function(){return x};this.fitToContainingElement=function(a,b){var d=c.offsetHeight/x;x=a/(c.offsetWidth/x);b/d<x&&(x=b/d);A()};this.fitToWidth=function(a){x=a/(c.offsetWidth/x);A()};this.fitSmart=function(a,b){var d,f;d=c.offsetWidth/x;f=c.offsetHeight/x;d=a/d;void 0!==b&&b/f<d&&(d=b/f);x=Math.min(1,d);A()};this.fitToHeight=function(a){x=a/(c.offsetHeight/x);A()};this.showFirstPage=function(){fa.showFirstPage()};this.showNextPage=function(){fa.showNextPage()};
this.showPreviousPage=function(){fa.showPreviousPage()};this.showPage=function(a){fa.showPage(a);A()};this.getElement=function(){return c};this.destroy=function(a){var b=G.getElementsByTagName("head")[0];ba&&ba.parentNode&&ba.parentNode.removeChild(ba);O&&c.removeChild(O);b.removeChild(ma);b.removeChild(ka);b.removeChild(U);b.removeChild(na);ca.destroy(function(b){b?a(b):fa.destroy(a)})};ma=g(G);fa=new m(p(G));ka=p(G);U=p(G);na=p(G)};return odf.OdfCanvas}();
// Input 38
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(l,m,e){return new odf.OdfContainer(l,function(c){if(c.state===odf.OdfContainer.INVALID)return e("Document "+l+" is invalid.");c.state===odf.OdfContainer.DONE?c.saveAs(m,function(b){e(b)}):e("Document was not completely loaded.")})};this.render=function(l,m,e){for(m=m.getElementsByTagName("body")[0];m.firstChild;)m.removeChild(m.firstChild);m=new odf.OdfCanvas(m);m.addListener("statereadychange",function(c){e(c)});m.load(l)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(l,m){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(l,m,e,c){};ops.Server.prototype.joinSession=function(l,m,e,c){};ops.Server.prototype.leaveSession=function(l,m,e,c){};ops.Server.prototype.getGenesisUrl=function(l){};
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
ops.OpAddCursor=function(){var l=this,m,e;this.init=function(c){m=c.memberid;e=c.timestamp};this.transform=function(c,b){return[l]};this.execute=function(c){var b=c.getCursor(m);if(b)return!1;b=new ops.OdtCursor(m,c);c.addCursor(b);c.emit(ops.OdtDocument.signalCursorAdded,b);return!0};this.spec=function(){return{optype:"AddCursor",memberid:m,timestamp:e}}};
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
gui.StyleHelper=function(l){function m(a){var b;a.collapsed?(b=a.startContainer,b.hasChildNodes()&&a.startOffset<b.childNodes.length&&(b=b.childNodes[a.startOffset]),a=[b]):a=n.getTextNodes(a,!0);return l.getAppliedStyles(a)}function e(a,b,c){var e=!0,k;a=m(a);for(k=0;k<a.length&&!(e=a[k]["style:text-properties"],e=!e||e[b]!==c);k+=1);return!e}function c(b,c,d){b=n.getParagraphElements(b);for(var e={},k=!1,m,g;0<b.length;){(m=b[0].getAttributeNS(a,"style-name"))?e[m]||(g=l.getStyleElement(m,"paragraph"),
e[m]=!0):k?g=void 0:(k=!0,g=l.getDefaultStyleElement("paragraph"));if(g&&(m=l.getInheritedStyleAttributes(g,!0),(m=m["style:paragraph-properties"])&&-1===d.indexOf(m[c])))return!1;b.pop()}return!0}var b=new core.DomUtils,n=new odf.OdfUtils,a=odf.Namespaces.textns;this.getAppliedStyles=m;this.applyStyle=function(a,c,d){var e=b.splitBoundaries(c),k=n.getTextNodes(c,!1);l.applyStyle(a,k,{startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset},d);e.forEach(b.normalizeTextNodes)};
this.isBold=function(a){return e(a,"fo:font-weight","bold")};this.isItalic=function(a){return e(a,"fo:font-style","italic")};this.hasUnderline=function(a){return e(a,"style:text-underline-style","solid")};this.hasStrikeThrough=function(a){return e(a,"style:text-line-through-style","solid")};this.isAlignedLeft=function(a){return c(a,"fo:text-align",["left","start"])};this.isAlignedCenter=function(a){return c(a,"fo:text-align",["center"])};this.isAlignedRight=function(a){return c(a,"fo:text-align",
["right","end"])};this.isAlignedJustified=function(a){return c(a,"fo:text-align",["justify"])}};
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
ops.OpApplyDirectStyling=function(){function l(a){var f=0<=b?c+b:c,d=a.getIteratorAtPosition(0<=b?c:c+b),f=b?a.getIteratorAtPosition(f):d;a=a.getDOM().createRange();a.setStart(d.container(),d.unfilteredDomOffset());a.setEnd(f.container(),f.unfilteredDomOffset());return a}var m,e,c,b,n,a=new odf.OdfUtils;this.init=function(a){m=a.memberid;e=a.timestamp;c=parseInt(a.position,10);b=parseInt(a.length,10);n=a.setProperties};this.transform=function(a,b){return null};this.execute=function(b){var c=l(b),
d=a.getImpactedParagraphs(c);(new gui.StyleHelper(b.getFormatting())).applyStyle(m,c,n);c.detach();b.getOdfCanvas().refreshCSS();d.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,timeStamp:e})});b.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:m,timestamp:e,position:c,length:b,setProperties:n}}};
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
ops.OpRemoveCursor=function(){var l=this,m,e;this.init=function(c){m=c.memberid;e=c.timestamp};this.transform=function(c,b){var e=c.spec(),a=[l];"RemoveCursor"===e.optype&&e.memberid===m&&(a=[]);return a};this.execute=function(c){return c.removeCursor(m)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:m,timestamp:e}}};
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
ops.OpMoveCursor=function(){var l=this,m,e,c,b;this.init=function(n){m=n.memberid;e=n.timestamp;c=parseInt(n.position,10);b=void 0!==n.length?parseInt(n.length,10):0};this.merge=function(n){return"MoveCursor"===n.optype&&n.memberid===m?(c=n.position,b=n.length,e=n.timestamp,!0):!1};this.transform=function(e,a){var h=e.spec(),f=c+b,d,t=[l];switch(h.optype){case "RemoveText":d=h.position+h.length;d<=c?c-=h.length:h.position<f&&(c<h.position?b=d<f?b-h.length:h.position-c:(c=h.position,b=d<f?f-d:0));
break;case "SplitParagraph":h.position<c?c+=1:h.position<=f&&(b+=1);break;case "AddAnnotation":h.position<c?c+=1:h.position<f&&(b+=1);break;case "InsertText":h.position<c?c+=h.text.length:h.position<=f&&(b+=h.text.length);break;case "RemoveCursor":h.memberid===m&&(t=[]);break;case "InsertTable":t=null}return t};this.execute=function(e){var a=e.getCursor(m),h=e.getCursorPosition(m),f=e.getPositionFilter(),d=c-h;if(!a)return!1;h=a.getStepCounter();d=0<d?h.countForwardSteps(d,f):0>d?-h.countBackwardSteps(-d,
f):0;a.move(d);b&&(f=0<b?h.countForwardSteps(b,f):0>b?-h.countBackwardSteps(-b,f):0,a.move(f,!0));e.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:m,timestamp:e,position:c,length:b}}};
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
ops.OpInsertTable=function(){function l(a,c){var d;if(1===t.length)d=t[0];else if(3===t.length)switch(a){case 0:d=t[0];break;case b-1:d=t[2];break;default:d=t[1]}else d=t[a];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case n-1:return d[2];default:return d[1]}return d[c]}var m=this,e,c,b,n,a,h,f,d,t;this.init=function(k){e=k.memberid;c=k.timestamp;a=parseInt(k.position,10);b=parseInt(k.initialRows,10);n=parseInt(k.initialColumns,10);h=k.tableName;f=k.tableStyleName;d=k.tableColumnStyleName;
t=k.tableCellStyleMatrix};this.transform=function(b,c){var d=b.spec(),f=[m];switch(d.optype){case "InsertTable":f=null;break;case "AddAnnotation":d.position<a&&(a+=1);break;case "SplitParagraph":d.position<a?a+=1:d.position!==a||c||(a+=1,f=null);break;case "InsertText":d.position<a?a+=d.text.length:d.position!==a||c||(a+=d.text.length,f=null);break;case "RemoveText":d.position+d.length<=a?a-=d.length:d.position<a&&(a=d.position)}return f};this.execute=function(k){var m=k.getPositionInTextNode(a),
g=k.getRootNode();if(m){var p=k.getDOM(),r=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),u,z,y,v;f&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",f);h&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",h);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",
n);d&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);r.appendChild(t);for(y=0;y<b;y+=1){t=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(v=0;v<n;v+=1)u=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(z=l(y,v))&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",z),z=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),
u.appendChild(z),t.appendChild(u);r.appendChild(t)}m=k.getParagraphElement(m.textNode);g.insertBefore(r,m?m.nextSibling:void 0);k.getOdfCanvas().refreshSize();k.emit(ops.OdtDocument.signalTableAdded,{tableElement:r,memberId:e,timeStamp:c});k.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:e,timestamp:c,position:a,initialRows:b,initialColumns:n,tableName:h,tableStyleName:f,tableColumnStyleName:d,tableCellStyleMatrix:t}}};
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
ops.OpInsertText=function(){function l(a,b){var c=b.parentNode,d=b.nextSibling,e=[];a.getCursors().forEach(function(a){var c=a.getSelectedRange();!c||c.startContainer!==b&&c.endContainer!==b||e.push({cursor:a,startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset})});c.removeChild(b);c.insertBefore(b,d);e.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var m=
this,e,c,b,n;this.init=function(a){e=a.memberid;c=a.timestamp;b=parseInt(a.position,10);n=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===e&&a.position===b+n.length?(n+=a.text,c=a.timestamp,!0):!1};this.transform=function(a,c){var f=a.spec(),d=[m];switch(f.optype){case "InsertText":f.position<b?b+=f.text.length:f.position!==b||c||(b+=f.text.length,d=null);break;case "AddAnnotation":f.position<b&&(b+=1);break;case "SplitParagraph":f.position<b?b+=1:f.position!==b||c||(b+=
1,d=null);break;case "InsertTable":d=null;break;case "RemoveText":f.position+f.length<=b?b-=f.length:f.position<b&&(b=f.position)}return d};this.execute=function(a){var h,f,d,m,k=a.getDOM(),q,g=!0,p=0,r;if(h=a.getPositionInTextNode(b,e)){f=h.textNode;d=f.parentNode;m=f.nextSibling;q=a.getParagraphElement(f);h.offset!==f.length&&(m=f.splitText(h.offset));for(h=0;h<n.length;h+=1)if(" "===n[h]||"\t"===n[h])p<h&&(p=n.substring(p,h),g?f.appendData(p):d.insertBefore(k.createTextNode(p),m)),p=h+1,g=!1,r=
" "===n[h]?"text:s":"text:tab",r=k.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",r),r.appendChild(k.createTextNode(n[h])),d.insertBefore(r,m);p=n.substring(p);0<p.length&&(g?f.appendData(p):d.insertBefore(k.createTextNode(p),m));l(a,f);0===f.length&&f.parentNode.removeChild(f);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:q,memberId:e,timeStamp:c});a.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",
memberid:e,timestamp:c,position:b,text:n}}};
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
ops.OpRemoveText=function(){function l(a){function b(a){if(h.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function c(e){e=f.mergeIntoParent(e);return!h.isParagraph(e)&&e!==a&&b(e)?c(e):e}this.isEmpty=b;this.mergeChildrenIntoParent=c}function m(b){var c=b.getPositionFilter(),e,h,g,m,l=a,w=b.getDOM().createRange();b=b.getIteratorAtPosition(n);e=b.container();for(h=b.unfilteredDomOffset();l&&
b.nextPosition();)g=b.container(),m=b.unfilteredDomOffset(),c.acceptPosition(b)===NodeFilter.FILTER_ACCEPT&&(l-=1);w.setStart(e,h);w.setEnd(g,m);f.splitBoundaries(w);return w}var e=this,c,b,n,a,h,f;this.init=function(d){runtime.assert(0<=d.length,"OpRemoveText only supports positive lengths");c=d.memberid;b=d.timestamp;n=parseInt(d.position,10);a=parseInt(d.length,10);h=new odf.OdfUtils;f=new core.DomUtils};this.transform=function(d,f){var h=d.spec(),m=n+a,g,l=[e];switch(h.optype){case "RemoveText":g=
h.position+h.length;g<=n?n-=h.length:h.position<m&&(n<h.position?a=g<m?a-h.length:h.position-n:g<m?(n=h.position,a=m-g):l=[]);break;case "InsertText":h.position<=n?n+=h.text.length:h.position<m&&(a=h.position-n,g=new ops.OpRemoveText,g.init({memberid:c,timestamp:b,position:h.position+h.text.length,length:m-h.position}),l=[g,e]);break;case "SplitParagraph":h.position<=n?n+=1:h.position<m&&(a=h.position-n,g=new ops.OpRemoveText,g.init({memberid:c,timestamp:b,position:h.position+1,length:m-h.position}),
l=[g,e]);break;case "InsertTable":l=null;break;case "AddAnnotation":case "RemoveAnnotation":l=null;break;case "ApplyDirectStyling":l=null}return l};this.execute=function(d){var f,e,h,g,p=new l(d.getRootNode());d.upgradeWhitespacesAtPosition(n);d.upgradeWhitespacesAtPosition(n+a);e=m(d);f=d.getParagraphElement(e.startContainer);h=d.getTextElements(e,!0);g=d.getParagraphElements(e);e.detach();h.forEach(function(a){p.mergeChildrenIntoParent(a)});e=g.reduce(function(a,b){var c,d,f=a,g=b,e,h;p.isEmpty(a)&&
(d=!0,b.parentNode!==a.parentNode&&(e=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),g=a,f=b,h=f.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||f.firstChild);for(;g.hasChildNodes();)c=d?g.lastChild:g.firstChild,g.removeChild(c),"editinfo"!==c.localName&&f.insertBefore(c,h);e&&p.isEmpty(e)&&p.mergeChildrenIntoParent(e);p.mergeChildrenIntoParent(g);return f});d.fixCursorPositions();d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:e||
f,memberId:c,timeStamp:b});d.emit(ops.OdtDocument.signalCursorMoved,d.getCursor(c));d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:c,timestamp:b,position:n,length:a}}};
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
ops.OpSplitParagraph=function(){var l=this,m,e,c,b=new odf.OdfUtils;this.init=function(b){m=b.memberid;e=b.timestamp;c=parseInt(b.position,10)};this.transform=function(b,a){var e=b.spec(),f=[l];switch(e.optype){case "SplitParagraph":e.position<c?c+=1:e.position!==c||a||(c+=1,f=null);break;case "AddAnnotation":e.position<c&&(c+=1);break;case "InsertText":e.position<c?c+=e.text.length:e.position!==c||a||(c+=e.text.length,f=null);break;case "InsertTable":f=null;break;case "RemoveText":e.position+e.length<=
c?c-=e.length:e.position<c&&(c=e.position)}return f};this.execute=function(n){var a,h,f,d,l,k;n.upgradeWhitespacesAtPosition(c);a=n.getPositionInTextNode(c,m);if(!a)return!1;h=n.getParagraphElement(a.textNode);if(!h)return!1;f=b.isListItem(h.parentNode)?h.parentNode:h;0===a.offset?(k=a.textNode.previousSibling,l=null):(k=a.textNode,l=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==f;)if(a=a.parentNode,d=a.cloneNode(!1),k){for(l&&d.appendChild(l);k.nextSibling;)d.appendChild(k.nextSibling);
a.parentNode.insertBefore(d,a.nextSibling);k=a;l=d}else a.parentNode.insertBefore(d,a),k=d,l=a;b.isListItem(l)&&(l=l.childNodes[0]);n.fixCursorPositions(m);n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:h,memberId:m,timeStamp:e});n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:l,memberId:m,timeStamp:e});n.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:m,timestamp:e,position:c}}};
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
ops.OpSetParagraphStyle=function(){var l=this,m,e,c,b;this.init=function(n){m=n.memberid;e=n.timestamp;c=n.position;b=n.styleName};this.transform=function(c,a){var e=c.spec(),f=[l];switch(e.optype){case "RemoveParagraphStyle":e.styleName===b&&(b="")}return f};this.execute=function(n){var a;if(a=n.getPositionInTextNode(c))if(a=n.getParagraphElement(a.textNode))return""!==b?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",b):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),n.getOdfCanvas().refreshSize(),n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:e,memberId:m}),n.getOdfCanvas().rerenderAnnotations(),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:m,timestamp:e,position:c,styleName:b}}};
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
ops.OpUpdateParagraphStyle=function(){function l(a,b){var c,d,f=b?b.split(","):[];for(c=0;c<f.length;c+=1)d=f[c].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(d[0]),d[1])}function m(a,b,c,d){var f,e,h,k=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<k.length)&&Object.keys(a).forEach(function(b){f=a[b];(c&&void 0!==c[b]||k&&-1!==k.indexOf(b))&&"object"!==typeof f&&delete a[b]});if(b&&b.attributes&&(c||0<k.length)){h=b.attributes.split(",");for(d=0;d<h.length;d+=1)if(e=h[d],c&&void 0!==
c[e]||k&&-1!==k.indexOf(e))h.splice(d,1),d-=1;0<h.length?b.attributes=h.join(","):delete b.attributes}}function e(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function c(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function b(a,b){var d=t?t[b]:null,f=k?k[b]:null;m(d,f,a.setProperties?a.setProperties[b]:null,a.removedProperties?a.removedProperties[b]:null);d&&!e(d)&&delete t[b];f&&!c(f)&&delete k[b]}function n(a){t&&["style:parent-style-name",
"style:next-style-name"].forEach(function(b){t[b]===a&&delete t[b]})}var a=this,h,f,d,t,k,q=odf.Namespaces.stylens;this.init=function(a){h=a.memberid;f=a.timestamp;d=a.styleName;t=a.setProperties;k=a.removedProperties};this.transform=function(f,h){var l=f.spec(),q=[a];switch(l.optype){case "UpdateParagraphStyle":l.styleName!==d||h||(b(l,"style:paragraph-properties"),b(l,"style:text-properties"),m(t||null,k||null,l.setProperties||null,l.removedProperties||null),t&&e(t)||k&&c(k)||(q=[]));break;case "RemoveParagraphStyle":l.styleName===
d?q=[]:n(l.styleName)}return q};this.execute=function(a){var b=a.getFormatting(),c,f,e;return(c=a.getParagraphStyleElement(d))?(f=c.getElementsByTagNameNS(q,"paragraph-properties")[0],e=c.getElementsByTagNameNS(q,"text-properties")[0],t&&b.updateStyle(c,t),k&&(k["style:paragraph-properties"]&&(l(f,k["style:paragraph-properties"].attributes),0===f.attributes.length&&c.removeChild(f)),k["style:text-properties"]&&(l(e,k["style:text-properties"].attributes),0===e.attributes.length&&c.removeChild(e)),
l(c,k.attributes)),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,d),a.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:h,timestamp:f,styleName:d,setProperties:t,removedProperties:k}}};
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
ops.OpAddParagraphStyle=function(){function l(b){a&&["style:parent-style-name","style:next-style-name"].forEach(function(c){a[c]===b&&delete a[c]})}var m=this,e,c,b,n,a,h=odf.Namespaces.stylens;this.init=function(f){e=f.memberid;c=f.timestamp;b=f.styleName;n="true"===f.isAutomaticStyle||!0===f.isAutomaticStyle;a=f.setProperties};this.transform=function(a,b){var c=a.spec();"RemoveParagraphStyle"===c.optype&&l(c.styleName);return[m]};this.execute=function(c){var d=c.getOdfCanvas().odfContainer(),e=
c.getFormatting(),k=c.getDOM().createElementNS(h,"style:style");if(!k)return!1;a&&e.updateStyle(k,a);k.setAttributeNS(h,"style:family","paragraph");k.setAttributeNS(h,"style:name",b);n?d.rootElement.automaticStyles.appendChild(k):d.rootElement.styles.appendChild(k);c.getOdfCanvas().refreshCSS();n||c.emit(ops.OdtDocument.signalCommonParagraphStyleCreated,b);return!0};this.spec=function(){return{optype:"AddParagraphStyle",memberid:e,timestamp:c,styleName:b,isAutomaticStyle:n,setProperties:a}}};
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
ops.OpRemoveParagraphStyle=function(){function l(c){var a=[];c&&["style:parent-style-name","style:next-style-name"].forEach(function(e){c[e]===b&&a.push(e)});return a}var m=this,e,c,b;this.init=function(n){e=n.memberid;c=n.timestamp;b=n.styleName};this.transform=function(n,a){var h=n.spec(),f,d;f=[m];switch(h.optype){case "RemoveParagraphStyle":h.styleName===b&&(f=[]);break;case "AddParagraphStyle":case "UpdateParagraphStyle":d=l(h.setProperties);0<d.length&&(f=new ops.OpUpdateParagraphStyle,f.init({memberid:e,
timestamp:c,styleName:h.styleName,removedProperties:{attributes:d.join(",")}}),f=[f,m]);break;case "SetParagraphStyle":h.styleName===b&&(h.styleName="",f=new ops.OpSetParagraphStyle,f.init(h),f=[f,m])}return f};this.execute=function(c){var a=c.getParagraphStyleElement(b);if(!a)return!1;a.parentNode.removeChild(a);c.getOdfCanvas().refreshCSS();c.emit(ops.OdtDocument.signalCommonParagraphStyleDeleted,b);return!0};this.spec=function(){return{optype:"RemoveParagraphStyle",memberid:e,timestamp:c,styleName:b}}};
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
ops.OpAddAnnotation=function(){function l(a,b,c){if(c=a.getPositionInTextNode(c,e))a=c.textNode,c.offset!==a.length&&a.splitText(c.offset),a.parentNode.insertBefore(b,a.nextSibling)}var m=this,e,c,b,n,a;this.init=function(h){e=h.memberid;c=parseInt(h.timestamp,10);b=parseInt(h.position,10);n=parseInt(h.length,10)||0;a=h.name};this.transform=function(a,c){var d=a.spec(),e=b+n,k=[m];switch(d.optype){case "AddAnnotation":d.position<b?b+=1:d.position!==b||c||(b+=1,k=null);break;case "InsertText":d.position<=
b?b+=d.text.length:d.position<=e&&(n+=d.text.length);break;case "SplitParagraph":d.position<=b?b+=1:d.position<=e&&(n+=1);break;case "InsertTable":k=null;break;case "RemoveText":d.position+d.length<=b?b-=d.length:d.position<b&&(b=d.position)}return k};this.execute=function(h){var f={},d=h.getPositionFilter(),m=h.getCursor(e),k=h.getCursorPosition(e),k=b-k-1,q=new Date(c),g,p,r,w,u;u=h.getDOM();g=u.createElementNS(odf.Namespaces.officens,"office:annotation");g.setAttributeNS(odf.Namespaces.officens,
"office:name",a);p=u.createElementNS(odf.Namespaces.dcns,"dc:creator");p.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",e);r=u.createElementNS(odf.Namespaces.dcns,"dc:date");r.appendChild(u.createTextNode(q.toISOString()));q=u.createElementNS(odf.Namespaces.textns,"text:list");w=u.createElementNS(odf.Namespaces.textns,"text:list-item");u=u.createElementNS(odf.Namespaces.textns,"text:p");w.appendChild(u);q.appendChild(w);g.appendChild(p);g.appendChild(r);g.appendChild(q);
f.node=g;if(!f.node)return!1;if(n){g=h.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");g.setAttributeNS(odf.Namespaces.officens,"office:name",a);f.end=g;if(!f.end)return!1;l(h,f.end,b+n)}l(h,f.node,b);m&&(g=m.getStepCounter(),d=0<k?g.countForwardSteps(k,d):0>k?-g.countBackwardSteps(-k,d):0,m.move(d),h.emit(ops.OdtDocument.signalCursorMoved,m));h.getOdfCanvas().addAnnotation(f);return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:e,timestamp:c,position:b,
length:n,name:a}}};
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
ops.OpRemoveAnnotation=function(){var l,m,e,c,b;this.init=function(n){l=n.memberid;m=n.timestamp;e=parseInt(n.position,10);c=parseInt(n.length,10);b=new core.DomUtils};this.transform=function(b,a){return null};this.execute=function(c){for(var a=c.getIteratorAtPosition(e).container(),h,f=null,d=null;a.namespaceURI!==odf.Namespaces.officens||"annotation"!==a.localName;)a=a.parentNode;if(null===a)return!1;f=a;(h=f.getAttributeNS(odf.Namespaces.officens,"name"))&&(d=b.getElementsByTagNameNS(c.getRootNode(),
odf.Namespaces.officens,"annotation-end").filter(function(a){return h===a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);c.getOdfCanvas().forgetAnnotations();for(a=b.getElementsByTagNameNS(f,odf.Namespaces.webodfns+":names:cursor","cursor");a.length;)f.parentNode.insertBefore(a.pop(),f);f.parentNode.removeChild(f);d&&d.parentNode.removeChild(d);c.fixCursorPositions();c.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:l,timestamp:m,
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
ops.OperationFactory=function(){function l(e){return function(){return new e}}var m;this.register=function(e,c){m[e]=c};this.create=function(e){var c=null,b=m[e.optype];b&&(c=b(e),c.init(e));return c};m={AddCursor:l(ops.OpAddCursor),ApplyDirectStyling:l(ops.OpApplyDirectStyling),InsertTable:l(ops.OpInsertTable),InsertText:l(ops.OpInsertText),RemoveText:l(ops.OpRemoveText),SplitParagraph:l(ops.OpSplitParagraph),SetParagraphStyle:l(ops.OpSetParagraphStyle),UpdateParagraphStyle:l(ops.OpUpdateParagraphStyle),
AddParagraphStyle:l(ops.OpAddParagraphStyle),RemoveParagraphStyle:l(ops.OpRemoveParagraphStyle),MoveCursor:l(ops.OpMoveCursor),RemoveCursor:l(ops.OpRemoveCursor),AddAnnotation:l(ops.OpAddAnnotation),RemoveAnnotation:l(ops.OpRemoveAnnotation)}};
// Input 57
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(l,m){function e(){z.setUnfilteredPosition(l.getNode(),0);return z}function c(a,b){var c,d=null;a&&(c=b?a[a.length-1]:a[0]);c&&(d={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return d}function b(a,d,f,e){var g=a.nodeType;f.setStart(a,d);f.collapse(!e);e=c(f.getClientRects(),!0===e);!e&&0<d&&(f.setStart(a,d-1),f.setEnd(a,d),e=c(f.getClientRects(),!0));e||(g===Node.ELEMENT_NODE&&a.childNodes[d-1]?e=b(a,d-1,f,!0):a.nodeType===Node.TEXT_NODE&&0<d?e=b(a,d-1,f,!0):a.previousSibling?
e=b(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,f,!0):a.parentNode&&a.parentNode!==m?e=b(a.parentNode,0,f,!1):(f.selectNode(m),e=c(f.getClientRects(),!1)));runtime.assert(Boolean(e),"No visible rectangle found");return e}function n(a,c,d){var f=a,g=e(),h,k=m.ownerDocument.createRange(),n=l.getSelectedRange()?l.getSelectedRange().cloneRange():m.ownerDocument.createRange(),p,r=runtime.getWindow();for(h=b(g.container(),
g.unfilteredDomOffset(),k);0<f&&d();)f-=1;c?(c=g.container(),g=g.unfilteredDomOffset(),-1===n.comparePoint(c,g)?(n.setStart(c,g),p=!1):n.setEnd(c,g)):(n.setStart(g.container(),g.unfilteredDomOffset()),n.collapse(!0));l.setSelectedRange(n,p);g=e();n=b(g.container(),g.unfilteredDomOffset(),k);if(n.top===h.top||void 0===y)y=n.left;r.clearTimeout(v);v=r.setTimeout(function(){y=void 0},2E3);k.detach();return a-f}function a(a){var b=e();return a.acceptPosition(b)===s?!0:!1}function h(a,b){for(var c=e(),
d=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&c.nextPosition();)f+=1,d.check(),b.acceptPosition(c)===s&&(g+=f,f=0,a-=1);return g}function f(a,b,c){for(var d=e(),f=new core.LoopWatchDog(1E3),g=0,h=0;0<a&&d.nextPosition();)f.check(),c.acceptPosition(d)===s&&(g+=1,b.acceptPosition(d)===s&&(h+=g,g=0,a-=1));return h}function d(a,b,c){for(var d=e(),f=new core.LoopWatchDog(1E3),g=0,h=0;0<a&&d.previousPosition();)f.check(),c.acceptPosition(d)===s&&(g+=1,b.acceptPosition(d)===s&&(h+=g,g=0,a-=1));return h}function t(a,
b){for(var c=e(),d=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&c.previousPosition();)f+=1,d.check(),b.acceptPosition(c)===s&&(g+=f,f=0,a-=1);return g}function k(a){var b=e(),c=u.getParagraphElement(b.getCurrentNode()),d;d=-t(1,a);if(0===d||c&&c!==u.getParagraphElement(b.getCurrentNode()))d=h(1,a);return d}function q(a,c){var d=e(),f=0,g=0,h=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var k=c,n=h,l=d,p=l.container(),r=0,u=null,q=void 0,t=10,w=void 0,v=0,z=void 0,P=void 0,J=void 0,w=void 0,G=m.ownerDocument.createRange(),
H=new core.LoopWatchDog(1E3),w=b(p,l.unfilteredDomOffset(),G),z=w.top,P=void 0===y?w.left:y,J=z;!0===(0>n?l.previousPosition():l.nextPosition());)if(H.check(),k.acceptPosition(l)===s&&(r+=1,p=l.container(),w=b(p,l.unfilteredDomOffset(),G),w.top!==z)){if(w.top!==J&&J!==z)break;J=w.top;w=Math.abs(P-w.left);if(null===u||w<t)u=p,q=l.unfilteredDomOffset(),t=w,v=r}null!==u?(l.setUnfilteredPosition(u,q),r=v):r=0;G.detach();f+=r;if(0===f)break;g+=f;a-=1}return g*h}function g(a,c){var d,f,g,h,k=e(),n=u.getParagraphElement(k.getCurrentNode()),
l=0,p=m.ownerDocument.createRange();0>a?(d=k.previousPosition,f=-1):(d=k.nextPosition,f=1);for(g=b(k.container(),k.unfilteredDomOffset(),p);d.call(k);)if(c.acceptPosition(k)===s){if(u.getParagraphElement(k.getCurrentNode())!==n)break;h=b(k.container(),k.unfilteredDomOffset(),p);if(h.bottom!==g.bottom&&(g=h.top>=g.top&&h.bottom<g.bottom||h.top<=g.top&&h.bottom>g.bottom,!g))break;l+=f;g=h}p.detach();return l}function p(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),
a=a.parentNode;for(d=b.firstChild;d!==a;)c+=1,d=d.nextSibling;return c}function r(a,b,c,d){if(a===c)return d-b;var f=a.compareDocumentPosition(c);2===f?f=-1:4===f?f=1:10===f?(b=p(a,c),f=b<d?1:-1):(d=p(c,a),f=d<b?-1:1);return f}function w(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=e(),f=d.container(),g=d.unfilteredDomOffset(),h=0,k=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");
b=d.unfilteredDomOffset();d.setUnfilteredPosition(f,g);f=r(a,b,d.container(),d.unfilteredDomOffset());if(0>f)for(;d.nextPosition()&&(k.check(),c.acceptPosition(d)===s&&(h+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<f)for(;d.previousPosition()&&!(k.check(),c.acceptPosition(d)===s&&(h-=1,0>=r(a,b,d.container(),d.unfilteredDomOffset()))););return h}var u,z,y,v,s=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,b){return n(a,b,z.nextPosition)};this.movePointBackward=
function(a,b){return n(a,b,z.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:h,countBackwardSteps:t,convertForwardStepsBetweenFilters:f,convertBackwardStepsBetweenFilters:d,countLinesSteps:q,countStepsToLineBoundary:g,countStepsToPosition:w,isPositionWalkable:a,countStepsToValidPosition:k}};(function(){u=new odf.OdfUtils;z=gui.SelectionMover.createPositionIterator(m);var a=m.ownerDocument.createRange();a.setStart(z.container(),z.unfilteredDomOffset());a.collapse(!0);l.setSelectedRange(a)})()};
gui.SelectionMover.createPositionIterator=function(l){var m=new function(){this.acceptNode=function(e){return"urn:webodf:names:cursor"===e.namespaceURI||"urn:webodf:names:editinfo"===e.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(l,5,m,!1)};(function(){return gui.SelectionMover})();
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
ops.OperationTransformer=function(){function l(e,c){for(var b,n,a,h=[],f=[];0<e.length&&c;){b=e.shift();n=c;var d=void 0;a=d=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b.spec()));runtime.log(runtime.toJson(n.spec()));d=m.create(n.spec());a=n.transform(b,!0);n=(d=b.transform(d,!1))&&a?{opsA:d,opsB:a}:null;if(!n)return null;h=h.concat(n.opsA);if(0===n.opsB.length){h=h.concat(e);c=null;break}if(1<n.opsB.length)for(b=0;b<n.opsB.length-1;b+=1){a=l(e,n.opsB[b]);if(!a)return null;
f=f.concat(a.opsB);e=a.opsA}c=n.opsB.pop()}c&&f.push(c);return{opsA:h,opsB:f}}var m;this.setOperationFactory=function(e){m=e};this.transform=function(e,c){var b,n=[],a,h=[];for(b=0;b<e.length;b+=1){a=m.create(e[b]);if(!a)return null;n.push(a)}for(b=0;b<c.length;b+=1){a=m.create(c[b]);a=l(n,a);if(!a)return null;n=a.opsA;h=h.concat(a.opsB)}return{opsA:n,opsB:h}}};
// Input 59
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(l,m){var e=this,c,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,a){var h=0;0<b?h=c.movePointForward(b,a):0>=b&&(h=-c.movePointBackward(-b,a));e.handleUpdate();return h};this.handleUpdate=function(){};this.getStepCounter=function(){return c.getStepCounter()};this.getMemberId=function(){return l};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.getOdtDocument=function(){return m};b=new core.Cursor(m.getDOM(),l);c=new gui.SelectionMover(b,m.getRootNode())};
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
ops.EditInfo=function(l,m){function e(){var c=[],a;for(a in b)b.hasOwnProperty(a)&&c.push({memberid:a,time:b[a].time});c.sort(function(a,b){return a.time-b.time});return c}var c,b={};this.getNode=function(){return c};this.getOdtDocument=function(){return m};this.getEdits=function(){return b};this.getSortedEdits=function(){return e()};this.addEdit=function(c,a){b[c]={time:a}};this.clearEdits=function(){b={}};this.destroy=function(b){l.removeChild(c);b()};c=m.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");l.insertBefore(c,l.firstChild)};
// Input 61
gui.Avatar=function(l,m){var e=this,c,b,n;this.setColor=function(a){b.style.borderColor=a};this.setImageUrl=function(a){e.isVisible()?b.src=a:n=a};this.isVisible=function(){return"block"===c.style.display};this.show=function(){n&&(b.src=n,n=void 0);c.style.display="block"};this.hide=function(){c.style.display="none"};this.markAsFocussed=function(a){c.className=a?"active":""};this.destroy=function(a){l.removeChild(c);a()};(function(){var a=l.ownerDocument,e=a.documentElement.namespaceURI;c=a.createElementNS(e,
"div");b=a.createElementNS(e,"img");b.width=64;b.height=64;c.appendChild(b);c.style.width="64px";c.style.height="70px";c.style.position="absolute";c.style.top="-80px";c.style.left="-34px";c.style.display=m?"block":"none";l.appendChild(c)})()};
// Input 62
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(l,m,e){function c(e){h&&a.parentNode&&(!f||e)&&(e&&void 0!==d&&runtime.clearTimeout(d),f=!0,b.style.opacity=e||"0"===b.style.opacity?"1":"0",d=runtime.setTimeout(function(){f=!1;c(!1)},500))}var b,n,a,h=!1,f=!1,d;this.refreshCursorBlinking=function(){e||l.getSelectedRange().collapsed?(h=!0,c(!0)):(h=!1,b.style.opacity="0")};this.setFocus=function(){h=!0;n.markAsFocussed(!0);c(!0)};this.removeFocus=function(){h=!1;n.markAsFocussed(!1);b.style.opacity="0"};this.setAvatarImageUrl=
function(a){n.setImageUrl(a)};this.setColor=function(a){b.style.borderColor=a;n.setColor(a)};this.getCursor=function(){return l};this.getFocusElement=function(){return b};this.toggleHandleVisibility=function(){n.isVisible()?n.hide():n.show()};this.showHandle=function(){n.show()};this.hideHandle=function(){n.hide()};this.ensureVisible=function(){var a,c,d,f,e=l.getOdtDocument().getOdfCanvas().getElement().parentNode,h;d=e.offsetWidth-e.clientWidth+5;f=e.offsetHeight-e.clientHeight+5;h=b.getBoundingClientRect();
a=h.left-d;c=h.top-f;d=h.right+d;f=h.bottom+f;h=e.getBoundingClientRect();c<h.top?e.scrollTop-=h.top-c:f>h.bottom&&(e.scrollTop+=f-h.bottom);a<h.left?e.scrollLeft-=h.left-a:d>h.right&&(e.scrollLeft+=d-h.right)};this.destroy=function(c){n.destroy(function(d){d?c(d):(a.removeChild(b),c())})};(function(){var c=l.getOdtDocument().getDOM();b=c.createElementNS(c.documentElement.namespaceURI,"span");a=l.getNode();a.appendChild(b);n=new gui.Avatar(a,m)})()};
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
gui.KeyboardHandler=function(){function l(b,c){c||(c=m.None);return b+":"+c}var m=gui.KeyboardHandler.Modifier,e=null,c={};this.setDefault=function(b){e=b};this.bind=function(b,e,a){b=l(b,e);runtime.assert(!1===c.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);c[b]=a};this.unbind=function(b,e){var a=l(b,e);delete c[a]};this.reset=function(){e=null;c={}};this.handleEvent=function(b){var n=b.keyCode,a=m.None;b.metaKey&&(a|=m.Meta);b.ctrlKey&&(a|=m.Ctrl);b.altKey&&(a|=m.Alt);
b.shiftKey&&(a|=m.Shift);n=l(n,a);n=c[n];a=!1;n?a=n():null!==e&&(a=e(b));a&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
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
gui.Clipboard=function(){var l,m,e;this.setDataFromRange=function(c,b){var e=!0,a,h=c.clipboardData;a=runtime.getWindow();var f=b.startContainer.ownerDocument;!h&&a&&(h=a.clipboardData);h?(f=f.createElement("span"),f.appendChild(b.cloneContents()),a=h.setData("text/plain",m.writeToString(f)),e=e&&a,a=h.setData("text/html",l.writeToString(f,odf.Namespaces.namespaceMap)),e=e&&a,c.preventDefault()):e=!1;return e};l=new xmldom.LSSerializer;m=new odf.TextSerializer;e=new odf.OdfNodeFilter;l.filter=e;m.filter=
e};
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
gui.DirectTextStyler=function(l,m){function e(a,b){for(var c=0,d=b[c];d&&a;)a=a[d],c+=1,d=b[c];return b.length===c?a:void 0}function c(a,b){var c=e(a[0],b);return a.every(function(a){return c===e(a,b)})?c:void 0}function b(){function a(b,c,d){b!==c&&(void 0===f&&(f={}),f[d]=c);return c}var b=w.getCursor(m),d=b&&b.getSelectedRange(),b=d&&u.getAppliedStyles(d),f;y=a(y,d?u.isBold(d):!1,"isBold");v=a(v,d?u.isItalic(d):!1,"isItalic");s=a(s,d?u.hasUnderline(d):!1,"hasUnderline");A=a(A,d?u.hasStrikeThrough(d):
!1,"hasStrikeThrough");d=b&&c(b,["style:text-properties","fo:font-size"]);I=a(I,d&&parseFloat(d),"fontSize");D=a(D,b&&c(b,["style:text-properties","style:font-name"]),"fontName");f&&z.emit(gui.DirectTextStyler.textStylingChanged,f)}function n(a){a.getMemberId()===m&&b()}function a(a){a===m&&b()}function h(a){a.getMemberId()===m&&b()}function f(){b()}function d(a){var c=w.getCursor(m);c&&w.getParagraphElement(c.getNode())===a.paragraphElement&&b()}function t(a,b){var c=w.getCursor(m);if(!c)return!1;
b(!a(c.getSelectedRange()));return!0}function k(a,b){var c=w.getCursorSelection(m),d=new ops.OpApplyDirectStyling,f={};f[a]=b;d.init({memberid:m,position:c.position,length:c.length,setProperties:{"style:text-properties":f}});l.enqueue(d)}function q(a){k("fo:font-weight",a?"bold":"normal")}function g(a){k("fo:font-style",a?"italic":"normal")}function p(a){k("style:text-underline-style",a?"solid":"none")}function r(a){k("style:text-line-through-style",a?"solid":"none")}var w=l.getOdtDocument(),u=new gui.StyleHelper(w.getFormatting()),
z=new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]),y=!1,v=!1,s=!1,A=!1,I,D;this.setBold=q;this.setItalic=g;this.setHasUnderline=p;this.setHasStrikethrough=r;this.setFontSize=function(a){k("fo:font-size",a+"pt")};this.setFontName=function(a){k("style:font-name",a)};this.toggleBold=t.bind(this,u.isBold,q);this.toggleItalic=t.bind(this,u.isItalic,g);this.toggleUnderline=t.bind(this,u.hasUnderline,p);this.toggleStrikethrough=t.bind(this,u.hasStrikeThrough,r);this.isBold=function(){return y};
this.isItalic=function(){return v};this.hasUnderline=function(){return s};this.hasStrikeThrough=function(){return A};this.fontSize=function(){return I};this.fontName=function(){return D};this.subscribe=function(a,b){z.subscribe(a,b)};this.unsubscribe=function(a,b){z.unsubscribe(a,b)};this.destroy=function(b){w.unsubscribe(ops.OdtDocument.signalCursorAdded,n);w.unsubscribe(ops.OdtDocument.signalCursorRemoved,a);w.unsubscribe(ops.OdtDocument.signalCursorMoved,h);w.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,
f);w.unsubscribe(ops.OdtDocument.signalParagraphChanged,d);b()};w.subscribe(ops.OdtDocument.signalCursorAdded,n);w.subscribe(ops.OdtDocument.signalCursorRemoved,a);w.subscribe(ops.OdtDocument.signalCursorMoved,h);w.subscribe(ops.OdtDocument.signalParagraphStyleModified,f);w.subscribe(ops.OdtDocument.signalParagraphChanged,d);b()};gui.DirectTextStyler.textStylingChanged="textStyling/changed";(function(){return gui.DirectTextStyler})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.Utils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddParagraphStyle");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("gui.StyleHelper");
gui.DirectParagraphStyler=function(l,m,e){function c(){function a(b,d,f){b!==d&&(void 0===c&&(c={}),c[f]=d);return d}var b=g.getCursor(m),b=b&&b.getSelectedRange(),c;z=a(z,b?w.isAlignedLeft(b):!1,"isAlignedLeft");y=a(y,b?w.isAlignedCenter(b):!1,"isAlignedCenter");v=a(v,b?w.isAlignedRight(b):!1,"isAlignedRight");s=a(s,b?w.isAlignedJustified(b):!1,"isAlignedJustified");c&&u.emit(gui.DirectParagraphStyler.paragraphStylingChanged,c)}function b(a){a.getMemberId()===m&&c()}function n(a){a===m&&c()}function a(a){a.getMemberId()===
m&&c()}function h(){c()}function f(a){var b=g.getCursor(m);b&&g.getParagraphElement(b.getNode())===a.paragraphElement&&c()}function d(a){var b=g.getCursor(m).getSelectedRange(),c=g.getCursorPosition(m),b=r.getParagraphElements(b),d=g.getFormatting();b.forEach(function(b){var f=c+g.getDistanceFromCursor(m,b,0),h=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=e.generateName();var k,f=f+1;h&&(k=d.createDerivedStyleObject(h,"paragraph",{}));k=a(k||{});h=new ops.OpAddParagraphStyle;h.init({memberid:m,
styleName:b,isAutomaticStyle:!0,setProperties:k});k=new ops.OpSetParagraphStyle;k.init({memberid:m,styleName:b,position:f});l.enqueue(h);l.enqueue(k)})}function t(a){d(function(b){return p.mergeObjects(b,a)})}function k(a){t({"style:paragraph-properties":{"fo:text-align":a}})}function q(a,b){var c=g.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&r.parseLength(d);return p.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var g=l.getOdtDocument(),p=new core.Utils,r=new odf.OdfUtils,w=new gui.StyleHelper(g.getFormatting()),u=new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]),z,y,v,s;this.isAlignedLeft=function(){return z};this.isAlignedCenter=function(){return y};this.isAlignedRight=function(){return v};this.isAlignedJustified=function(){return s};this.alignParagraphLeft=function(){k("left");return!0};this.alignParagraphCenter=function(){k("center");
return!0};this.alignParagraphRight=function(){k("right");return!0};this.alignParagraphJustified=function(){k("justify");return!0};this.indent=function(){d(q.bind(null,1));return!0};this.outdent=function(){d(q.bind(null,-1));return!0};this.subscribe=function(a,b){u.subscribe(a,b)};this.unsubscribe=function(a,b){u.unsubscribe(a,b)};this.destroy=function(c){g.unsubscribe(ops.OdtDocument.signalCursorAdded,b);g.unsubscribe(ops.OdtDocument.signalCursorRemoved,n);g.unsubscribe(ops.OdtDocument.signalCursorMoved,
a);g.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,h);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,f);c()};g.subscribe(ops.OdtDocument.signalCursorAdded,b);g.subscribe(ops.OdtDocument.signalCursorRemoved,n);g.subscribe(ops.OdtDocument.signalCursorMoved,a);g.subscribe(ops.OdtDocument.signalParagraphStyleModified,h);g.subscribe(ops.OdtDocument.signalParagraphChanged,f);c()};gui.DirectParagraphStyler.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectParagraphStyler})();
// Input 67
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Utils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.DirectTextStyler");
runtime.loadClass("gui.DirectParagraphStyler");
gui.SessionController=function(){gui.SessionController=function(l,m,e){function c(a,b,c,d){var f="on"+b,e=!1;a.attachEvent&&(e=a.attachEvent(f,c));!e&&a.addEventListener&&(a.addEventListener(b,c,!1),e=!0);e&&!d||!a.hasOwnProperty(f)||(a[f]=c)}function b(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function n(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function a(a,b){var c=new ops.OpMoveCursor;c.init({memberid:m,
position:a,length:b||0});return c}function h(a,b){var c=gui.SelectionMover.createPositionIterator(x.getRootNode()),d=x.getOdfCanvas().getElement(),f;f=a;if(!f)return null;for(;f!==d&&!("urn:webodf:names:cursor"===f.namespaceURI&&"cursor"===f.localName||"urn:webodf:names:editinfo"===f.namespaceURI&&"editinfo"===f.localName);)if(f=f.parentNode,!f)return null;f!==d&&a!==f&&(a=f.parentNode,b=Array.prototype.indexOf.call(a.childNodes,f));c.setUnfilteredPosition(a,b);return x.getDistanceFromCursor(m,c.container(),
c.unfilteredDomOffset())}function f(a){var b=x.getOdfCanvas().getElement(),c=x.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function d(b){runtime.setTimeout(function(){var c;a:{var d=x.getOdfCanvas().getElement(),e=W.getSelection(),g,k,n,p;if(null===e.anchorNode&&null===e.focusNode){c=b.clientX;g=b.clientY;k=x.getDOM();k.caretRangeFromPoint?
(c=k.caretRangeFromPoint(c,g),g={container:c.startContainer,offset:c.startOffset}):k.caretPositionFromPoint?(c=k.caretPositionFromPoint(c,g),g={container:c.offsetNode,offset:c.offset}):g=null;if(!g){c=null;break a}c=g.container;g=g.offset;k=c;e=g}else c=e.anchorNode,g=e.anchorOffset,k=e.focusNode,e=e.focusOffset;runtime.assert(null!==c&&null!==k,"anchorNode is null or focusNode is null");n=S.containsNode(d,c);p=S.containsNode(d,k);n||p?(n||(n=f(c),c=n.node,g=n.offset),p||(n=f(k),k=n.node,e=n.offset),
d.focus(),c={anchorNode:c,anchorOffset:g,focusNode:k,focusOffset:e}):c=null}null!==c&&(d=h(c.anchorNode,c.anchorOffset),g=c.focusNode===c.anchorNode&&c.focusOffset===c.anchorOffset?d:h(c.focusNode,c.focusOffset),null!==g&&0!==g||null!==d&&0!==d)&&(c=x.getCursorPosition(m),d=a(c+d,g-d),l.enqueue(d))},0)}function t(a){d(a)}function k(b){var c=x.getCursorSelection(m),d=x.getCursor(m).getStepCounter();0!==b&&(b=0<b?d.convertForwardStepsBetweenFilters(b,ha,ra):-d.convertBackwardStepsBetweenFilters(-b,
ha,ra),b=c.length+b,l.enqueue(a(c.position,b)))}function q(b){var c=x.getCursorPosition(m),d=x.getCursor(m).getStepCounter();0!==b&&(b=0<b?d.convertForwardStepsBetweenFilters(b,ha,ra):-d.convertBackwardStepsBetweenFilters(-b,ha,ra),l.enqueue(a(c+b,0)))}function g(){q(-1);return!0}function p(){q(1);return!0}function r(){k(-1);return!0}function w(){k(1);return!0}function u(a,b){var c=x.getParagraphElement(x.getCursor(m).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");
c=x.getCursor(m).getStepCounter().countLinesSteps(a,ha);b?k(c):q(c)}function z(){u(-1,!1);return!0}function y(){u(1,!1);return!0}function v(){u(-1,!0);return!0}function s(){u(1,!0);return!0}function A(a,b){var c=x.getCursor(m).getStepCounter().countStepsToLineBoundary(a,ha);b?k(c):q(c)}function I(){A(-1,!1);return!0}function D(){A(1,!1);return!0}function N(){A(-1,!0);return!0}function B(){A(1,!0);return!0}function L(){var a=x.getParagraphElement(x.getCursor(m).getNode()),b,c;runtime.assert(Boolean(a),
"SessionController: Cursor outside paragraph");c=x.getDistanceFromCursor(m,a,0);b=gui.SelectionMover.createPositionIterator(x.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),oa.isParagraph(a)&&(c=x.getDistanceFromCursor(m,a,0));k(c);return!0}function C(){var a=x.getParagraphElement(x.getCursor(m).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(x.getRootNode());b.moveToEndOfNode(a);
for(c=x.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),oa.isParagraph(a)&&(b.moveToEndOfNode(a),c=x.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset()));k(c);return!0}function K(a,b){var c=gui.SelectionMover.createPositionIterator(x.getRootNode());0<a&&c.moveToEnd();c=x.getDistanceFromCursor(m,c.container(),c.unfilteredDomOffset());b?k(c):q(c)}function ea(){K(-1,!1);return!0}function pa(){K(1,!1);return!0}function M(){K(-1,!0);
return!0}function qa(){K(1,!0);return!0}function Y(){var b=gui.SelectionMover.createPositionIterator(x.getRootNode()),c;c=-x.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset());b.moveToEnd();c+=x.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset());l.enqueue(a(0,c));return!0}function Z(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function Q(a){var b=new ops.OpRemoveText;b.init({memberid:m,position:a.position,length:a.length});return b}function $(){var a=Z(x.getCursorSelection(m)),
b=null;0===a.length?0<a.position&&x.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:m,position:a.position-1,length:1}),l.enqueue(b)):(b=Q(a),l.enqueue(b));return!0}function T(){var a=Z(x.getCursorSelection(m)),b=null;0===a.length?x.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:m,position:a.position,length:1}),l.enqueue(b)):(b=Q(a),l.enqueue(b));return null!==b}function P(){var a=Z(x.getCursorSelection(m));0!==a.length&&l.enqueue(Q(a));
return!0}function J(a){var b=Z(x.getCursorSelection(m)),c=null;0<b.length&&(c=Q(b),l.enqueue(c));c=new ops.OpInsertText;c.init({memberid:m,position:b.position,text:a});l.enqueue(c)}function G(){var a=x.getCursorPosition(m),b;b=new ops.OpSplitParagraph;b.init({memberid:m,position:a});l.enqueue(b);return!0}function H(){var a=x.getCursor(m),b=W.getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function R(a){var b=x.getCursor(m);b.getSelectedRange().collapsed||(ta.setDataFromRange(a,
b.getSelectedRange())?(b=new ops.OpRemoveText,a=Z(l.getOdtDocument().getCursorSelection(m)),b.init({memberid:m,position:a.position,length:a.length}),l.enqueue(b)):runtime.log("Cut operation failed"))}function ca(){return!1!==x.getCursor(m).getSelectedRange().collapsed}function fa(a){var b=x.getCursor(m);b.getSelectedRange().collapsed||ta.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function O(a){var b;W.clipboardData&&W.clipboardData.getData?b=W.clipboardData.getData("Text"):
a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(J(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function ba(){return!1}function ja(a){if(aa)aa.onOperationExecuted(a)}function F(a){x.emit(ops.OdtDocument.signalUndoStackChanged,a)}function ma(){return aa?(aa.moveBackward(1),H(),!0):!1}function ka(){return aa?(aa.moveForward(1),H(),!0):!1}function U(a){ua=a.target&&S.containsNode(x.getOdfCanvas().getElement(),a.target)}function na(b){var c=b.target,
f=b.detail,e=null;if("annotationRemoveButton"===c.className){b=e=S.getElementsByTagNameNS(c.parentNode,odf.Namespaces.officens,"annotation")[0];for(var c=0,f=gui.SelectionMover.createPositionIterator(x.getRootNode()),e=new core.LoopWatchDog(1E3),g=!1;f.nextPosition();)if(e.check(),g=Boolean(b.compareDocumentPosition(f.container())&Node.DOCUMENT_POSITION_CONTAINED_BY),1===ra.acceptPosition(f)){if(g)break;c+=1}f=0;e=gui.SelectionMover.createPositionIterator(x.getRootNode());g=!1;e.setUnfilteredPosition(b,
0);do{g=Boolean(b.compareDocumentPosition(e.container())&Node.DOCUMENT_POSITION_CONTAINED_BY);if(!g&&b!==e.container())break;1===ra.acceptPosition(e)&&(f+=1)}while(e.nextPosition());b=f;f=new ops.OpRemoveAnnotation;f.init({memberid:m,position:c,length:b});l.enqueue(f)}else if(ua)if(1===f)d(b);else if(2===f){var e=x.getOdfCanvas().getElement(),f=/[A-Za-z0-9]/,c=b=0,h;if(S.containsNode(e,W.getSelection().focusNode)){e=gui.SelectionMover.createPositionIterator(x.getRootNode());g=x.getCursor(m).getNode();
for(e.setUnfilteredPosition(g,0);e.previousPosition();)if(h=e.getCurrentNode(),h.nodeType===Node.TEXT_NODE){h=h.data[e.unfilteredDomOffset()];if(!f.test(h))break;b-=1}else if(h.namespaceURI!==odf.Namespaces.textns||"span"!==h.localName)break;e.setUnfilteredPosition(g,0);do if(h=e.getCurrentNode(),h.nodeType===Node.TEXT_NODE){h=h.data[e.unfilteredDomOffset()];if(!f.test(h))break;c+=1}else if(h.namespaceURI!==odf.Namespaces.textns||"span"!==h.localName)break;while(e.nextPosition());if(0!==b||0!==c)f=
x.getCursorPosition(m),b=a(f+b,Math.abs(b)+Math.abs(c)),l.enqueue(b)}}else 3===f&&(b=x.getOdfCanvas().getElement(),S.containsNode(b,W.getSelection().focusNode)&&(f=x.getParagraphElement(x.getCursor(m).getNode()),b=x.getDistanceFromCursor(m,f,0),c=gui.SelectionMover.createPositionIterator(x.getRootNode()),c.moveToEndOfNode(f),f=x.getDistanceFromCursor(m,f,c.unfilteredDomOffset()),0!==b||0!==f))&&(c=x.getCursorPosition(m),b=a(c+b,Math.abs(b)+Math.abs(f)),l.enqueue(b))}var W=runtime.getWindow(),x=l.getOdtDocument(),
la=new core.Utils,S=new core.DomUtils,oa=new odf.OdfUtils,ta=new gui.Clipboard,E=new gui.KeyboardHandler,sa=new gui.KeyboardHandler,ha=new core.PositionFilterChain,ra=x.getPositionFilter(),ua=!1,la=new odf.StyleNameGenerator("auto"+la.hashString(m)+"_",x.getFormatting()),aa=null,ia=e&&e.directStylingEnabled?new gui.DirectTextStyler(l,m):null,da=e&&e.directStylingEnabled?new gui.DirectParagraphStyler(l,m,la):null;runtime.assert(null!==W,"Expected to be run in an environment which has a global window, like a browser.");
ha.addFilter("BaseFilter",ra);ha.addFilter("RootFilter",x.createRootFilter(m));this.startEditing=function(){var a;a=x.getOdfCanvas().getElement();c(a,"keydown",E.handleEvent);c(a,"keypress",sa.handleEvent);c(a,"keyup",n);c(a,"beforecut",ca,!0);c(a,"cut",R);c(a,"copy",fa);c(a,"beforepaste",ba,!0);c(a,"paste",O);c(W,"mousedown",U);c(W,"mouseup",na);c(a,"contextmenu",t);x.subscribe(ops.OdtDocument.signalOperationExecuted,H);x.subscribe(ops.OdtDocument.signalOperationExecuted,ja);a=new ops.OpAddCursor;
a.init({memberid:m});l.enqueue(a);aa&&aa.saveInitialState()};this.endEditing=function(){var a;x.unsubscribe(ops.OdtDocument.signalOperationExecuted,ja);x.unsubscribe(ops.OdtDocument.signalOperationExecuted,H);a=x.getOdfCanvas().getElement();b(a,"keydown",E.handleEvent);b(a,"keypress",sa.handleEvent);b(a,"keyup",n);b(a,"cut",R);b(a,"beforecut",ca);b(a,"copy",fa);b(a,"paste",O);b(a,"beforepaste",ba);b(W,"mousedown",U);b(W,"mouseup",na);b(a,"contextmenu",t);a=new ops.OpRemoveCursor;a.init({memberid:m});
l.enqueue(a);aa&&aa.resetInitialState()};this.getInputMemberId=function(){return m};this.getSession=function(){return l};this.setUndoManager=function(a){aa&&aa.unsubscribe(gui.UndoManager.signalUndoStackChanged,F);if(aa=a)aa.setOdtDocument(x),aa.setPlaybackFunction(function(a){a.execute(x)}),aa.subscribe(gui.UndoManager.signalUndoStackChanged,F)};this.getUndoManager=function(){return aa};this.getDirectTextStyler=function(){return ia};this.getDirectParagraphStyler=function(){return da};this.destroy=
function(a){var b=da?da.destroy:function(a){a()};(ia?ia.destroy:function(a){a()})(function(c){c?a(c):b(a)})};(function(){var a=-1!==W.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;E.bind(c.Tab,b.None,function(){J("\t");return!0});E.bind(c.Left,b.None,g);E.bind(c.Right,b.None,p);E.bind(c.Up,b.None,z);E.bind(c.Down,b.None,y);E.bind(c.Backspace,b.None,$);E.bind(c.Delete,b.None,T);E.bind(c.Left,b.Shift,r);E.bind(c.Right,b.Shift,w);E.bind(c.Up,
b.Shift,v);E.bind(c.Down,b.Shift,s);E.bind(c.Home,b.None,I);E.bind(c.End,b.None,D);E.bind(c.Home,b.Ctrl,ea);E.bind(c.End,b.Ctrl,pa);E.bind(c.Home,b.Shift,N);E.bind(c.End,b.Shift,B);E.bind(c.Up,b.CtrlShift,L);E.bind(c.Down,b.CtrlShift,C);E.bind(c.Home,b.CtrlShift,M);E.bind(c.End,b.CtrlShift,qa);a?(E.bind(c.Clear,b.None,P),E.bind(c.Left,b.Meta,I),E.bind(c.Right,b.Meta,D),E.bind(c.Home,b.Meta,ea),E.bind(c.End,b.Meta,pa),E.bind(c.Left,b.MetaShift,N),E.bind(c.Right,b.MetaShift,B),E.bind(c.Up,b.AltShift,
L),E.bind(c.Down,b.AltShift,C),E.bind(c.Up,b.MetaShift,M),E.bind(c.Down,b.MetaShift,qa),E.bind(c.A,b.Meta,Y),ia&&(E.bind(c.B,b.Meta,ia.toggleBold),E.bind(c.I,b.Meta,ia.toggleItalic),E.bind(c.U,b.Meta,ia.toggleUnderline)),da&&(E.bind(c.L,b.MetaShift,da.alignParagraphLeft),E.bind(c.E,b.MetaShift,da.alignParagraphCenter),E.bind(c.R,b.MetaShift,da.alignParagraphRight),E.bind(c.J,b.MetaShift,da.alignParagraphJustified)),E.bind(c.Z,b.Meta,ma),E.bind(c.Z,b.MetaShift,ka)):(E.bind(c.A,b.Ctrl,Y),ia&&(E.bind(c.B,
b.Ctrl,ia.toggleBold),E.bind(c.I,b.Ctrl,ia.toggleItalic),E.bind(c.U,b.Ctrl,ia.toggleUnderline)),da&&(E.bind(c.L,b.CtrlShift,da.alignParagraphLeft),E.bind(c.E,b.CtrlShift,da.alignParagraphCenter),E.bind(c.R,b.CtrlShift,da.alignParagraphRight),E.bind(c.J,b.CtrlShift,da.alignParagraphJustified)),E.bind(c.Z,b.Ctrl,ma),E.bind(c.Z,b.CtrlShift,ka));sa.setDefault(function(a){var b;b=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||
a.ctrlKey||a.metaKey?!1:(J(b),!0)});sa.bind(c.Enter,b.None,G)})()};return gui.SessionController}();
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
ops.TrivialOperationRouter=function(){var l,m;this.setOperationFactory=function(e){l=e};this.setPlaybackFunction=function(e){m=e};this.push=function(e){e=e.spec();e.timestamp=(new Date).getTime();e=l.create(e);m(e)};this.close=function(e){e()};this.getHasLocalUnsyncedOpsAndUpdates=function(e){e(!0)};this.unsubscribeHasLocalUnsyncedOpsUpdates=function(e){}};
// Input 72
gui.EditInfoHandle=function(l){var m=[],e,c=l.ownerDocument,b=c.documentElement.namespaceURI;this.setEdits=function(n){m=n;var a,h,f,d;e.innerHTML="";for(n=0;n<m.length;n+=1)a=c.createElementNS(b,"div"),a.className="editInfo",h=c.createElementNS(b,"span"),h.className="editInfoColor",h.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[n].memberid),f=c.createElementNS(b,"span"),f.className="editInfoAuthor",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[n].memberid),
d=c.createElementNS(b,"span"),d.className="editInfoTime",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[n].memberid),d.innerHTML=m[n].time,a.appendChild(h),a.appendChild(f),a.appendChild(d),e.appendChild(a)};this.show=function(){e.style.display="block"};this.hide=function(){e.style.display="none"};this.destroy=function(b){l.removeChild(e);b()};e=c.createElementNS(b,"div");e.setAttribute("class","editInfoHandle");e.style.display="none";l.appendChild(e)};
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
gui.EditInfoMarker=function(l,m){function e(b,c){return runtime.getWindow().setTimeout(function(){a.style.opacity=b},c)}var c=this,b,n,a,h,f;this.addEdit=function(b,c){var k=Date.now()-c;l.addEdit(b,c);n.setEdits(l.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);if(h){var m=h;runtime.getWindow().clearTimeout(m)}f&&(m=f,runtime.getWindow().clearTimeout(m));1E4>k?(e(1,0),h=e(0.5,1E4-k),f=e(0.2,2E4-k)):1E4<=k&&2E4>k?(e(0.5,0),f=e(0.2,2E4-k)):e(0.2,0)};this.getEdits=
function(){return l.getEdits()};this.clearEdits=function(){l.clearEdits();n.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return l};this.show=function(){a.style.display="block"};this.hide=function(){c.hideHandle();a.style.display="none"};this.showHandle=function(){n.show()};this.hideHandle=function(){n.hide()};this.destroy=function(c){b.removeChild(a);n.destroy(function(a){a?
c(a):l.destroy(c)})};(function(){var d=l.getOdtDocument().getDOM();a=d.createElementNS(d.documentElement.namespaceURI,"div");a.setAttribute("class","editInfoMarker");a.onmouseover=function(){c.showHandle()};a.onmouseout=function(){c.hideHandle()};b=l.getNode();b.appendChild(a);n=new gui.EditInfoHandle(b);m||c.hide()})()};
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
gui.SessionView=function(){return function(l,m,e){function c(a,b,c){function d(b,c,f){c=b+'[editinfo|memberid^="'+a+'"]'+f+c;a:{var e=t.firstChild;for(b=b+'[editinfo|memberid^="'+a+'"]'+f;e;){if(e.nodeType===Node.TEXT_NODE&&0===e.data.indexOf(b)){b=e;break a}e=e.nextSibling}b=null}b?b.data=c:t.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","")}function b(a){var b,c;for(c in q)q.hasOwnProperty(c)&&(b=q[c],a?b.show():b.hide())}function n(a){e.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function a(a,b){var d=e.getCaret(a);b?(d&&(d.setAvatarImageUrl(b.imageurl),d.setColor(b.color)),c(a,b.fullname,b.color)):runtime.log('MemberModel sent undefined data for member "'+a+'".')}function h(b){var c=b.getMemberId(),
d=m.getMemberModel();e.registerCursor(b,p,r);a(c,null);d.getMemberDetailsAndUpdates(c,a);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function f(b){var c=!1,d;for(d in q)if(q.hasOwnProperty(d)&&q[d].getEditInfo().getEdits().hasOwnProperty(b)){c=!0;break}c||m.getMemberModel().unsubscribeMemberDetailsUpdates(b,a)}function d(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,f="",e=b.getElementsByTagNameNS(k,"editinfo")[0];e?(f=e.getAttributeNS(k,"id"),d=q[f]):
(f=Math.random().toString(),d=new ops.EditInfo(b,m.getOdtDocument()),d=new gui.EditInfoMarker(d,g),e=b.getElementsByTagNameNS(k,"editinfo")[0],e.setAttributeNS(k,"id",f),q[f]=d);d.addEdit(c,new Date(a))}var t,k="urn:webodf:names:editinfo",q={},g=void 0!==l.editInfoMarkersInitiallyVisible?Boolean(l.editInfoMarkersInitiallyVisible):!0,p=void 0!==l.caretAvatarsInitiallyVisible?Boolean(l.caretAvatarsInitiallyVisible):!0,r=void 0!==l.caretBlinksOnRangeSelect?Boolean(l.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=
function(){g||(g=!0,b(g))};this.hideEditInfoMarkers=function(){g&&(g=!1,b(g))};this.showCaretAvatars=function(){p||(p=!0,n(p))};this.hideCaretAvatars=function(){p&&(p=!1,n(p))};this.getSession=function(){return m};this.getCaret=function(a){return e.getCaret(a)};this.destroy=function(b){var c=m.getOdtDocument(),g=m.getMemberModel(),k=Object.keys(q).map(function(a){return q[a]});c.subscribe(ops.OdtDocument.signalCursorAdded,h);c.subscribe(ops.OdtDocument.signalCursorRemoved,f);c.subscribe(ops.OdtDocument.signalParagraphChanged,
d);e.getCarets().forEach(function(b){g.unsubscribeMemberDetailsUpdates(b.getCursor().getMemberId(),a)});t.parentNode.removeChild(t);(function s(a,c){c?b(c):a<k.length?k[a].destroy(function(b){s(a+1,b)}):b()})(0,void 0)};(function(){var a=m.getOdtDocument(),b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,h);a.subscribe(ops.OdtDocument.signalCursorRemoved,f);a.subscribe(ops.OdtDocument.signalParagraphChanged,d);t=document.createElementNS(b.namespaceURI,"style");
t.type="text/css";t.media="screen, print, handheld, projection";t.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));t.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(t)})()}}();
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
gui.CaretManager=function(l){function m(a){return d.hasOwnProperty(a)?d[a]:null}function e(){return Object.keys(d).map(function(a){return d[a]})}function c(){return l.getSession().getOdtDocument().getOdfCanvas().getElement()}function b(a){a===l.getInputMemberId()&&c().removeAttribute("tabindex");delete d[a]}function n(a){a=a.getMemberId();a===l.getInputMemberId()&&(a=m(a))&&a.refreshCursorBlinking()}function a(a){a.memberId===l.getInputMemberId()&&(a=m(a.memberId))&&a.ensureVisible()}function h(){var a=
m(l.getInputMemberId());a&&a.setFocus()}function f(){var a=m(l.getInputMemberId());a&&a.removeFocus()}var d={};this.registerCursor=function(a,b,f){var e=a.getMemberId(),h=c();b=new gui.Caret(a,b,f);d[e]=b;e===l.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+e),a.handleUpdate=b.ensureVisible,h.setAttribute("tabindex",0),h.focus());return b};this.getCaret=m;this.getCarets=e;this.destroy=function(d){var f=l.getSession().getOdtDocument(),h=c(),g=e();f.unsubscribe(ops.OdtDocument.signalParagraphChanged,
a);f.unsubscribe(ops.OdtDocument.signalCursorMoved,n);f.unsubscribe(ops.OdtDocument.signalCursorRemoved,b);h.onfocus=null;h.onblur=null;(function r(a,b){b?d(b):a<g.length?g[a].destroy(function(b){r(a+1,b)}):d()})(0,void 0)};(function(){var d=l.getSession().getOdtDocument(),e=c();d.subscribe(ops.OdtDocument.signalParagraphChanged,a);d.subscribe(ops.OdtDocument.signalCursorMoved,n);d.subscribe(ops.OdtDocument.signalCursorRemoved,b);e.onfocus=h;e.onblur=f})()};
// Input 76
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var l=new xmldom.XPath,m=runtime.getWindow();return function(e){var c=this;c.setInitialSlideMode=function(){c.startSlideMode("single")};c.keyDownHandler=function(b){if(!b.target.isContentEditable&&"input"!==b.target.nodeName)switch(b.keyCode){case 84:c.toggleToolbar();break;case 37:case 8:c.prevSlide();break;case 39:case 32:c.nextSlide();break;case 36:c.firstSlide();break;case 35:c.lastSlide()}};c.root=function(){return c.odf_canvas.odfContainer().rootElement};c.firstSlide=
function(){c.slideChange(function(b,c){return 0})};c.lastSlide=function(){c.slideChange(function(b,c){return c-1})};c.nextSlide=function(){c.slideChange(function(b,c){return b+1<c?b+1:-1})};c.prevSlide=function(){c.slideChange(function(b,c){return 1>b?-1:b-1})};c.slideChange=function(b){var e=c.getPages(c.odf_canvas.odfContainer().rootElement),a=-1,h=0;e.forEach(function(b){b=b[1];b.hasAttribute("slide_current")&&(a=h,b.removeAttribute("slide_current"));h+=1});b=b(a,e.length);-1===b&&(b=a);e[b][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=b;"cont"===c.slide_mode&&m.scrollBy(0,e[b][1].getBoundingClientRect().top-30)};c.selectSlide=function(b){c.slideChange(function(c,a){return b>=a||0>b?-1:b})};c.scrollIntoContView=function(b){var e=c.getPages(c.odf_canvas.odfContainer().rootElement);0!==e.length&&m.scrollBy(0,e[b][1].getBoundingClientRect().top-30)};c.getPages=function(b){b=b.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var c=[],a;for(a=0;a<b.length;a+=1)c.push([b[a].getAttribute("draw:name"),
b[a]]);return c};c.fillPageList=function(b,e){for(var a=c.getPages(b),h,f,d;e.firstChild;)e.removeChild(e.firstChild);for(h=0;h<a.length;h+=1)f=document.createElement("option"),d=l.getODFElementsWithXPath(a[h][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),d=0<d.length?d[0].textContent:a[h][0],f.textContent=h+1+": "+d,e.appendChild(f)};c.startSlideMode=function(b){var e=document.getElementById("pagelist"),a=c.odf_canvas.slidevisibilitycss().sheet;for(c.slide_mode=
b;0<a.cssRules.length;)a.deleteRule(0);c.selectSlide(0);"single"===c.slide_mode?(a.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),a.insertRule("draw|page[slide_current]  { z-index:2;}",1),a.insertRule("draw|page  { -webkit-transform: scale(1);}",2),c.fitToWindow(),m.addEventListener("resize",c.fitToWindow,!1)):"cont"===c.slide_mode&&m.removeEventListener("resize",c.fitToWindow,!1);c.fillPageList(c.odf_canvas.odfContainer().rootElement,e)};c.toggleToolbar=function(){var b,
e,a;b=c.odf_canvas.slidevisibilitycss().sheet;e=-1;for(a=0;a<b.cssRules.length;a+=1)if(".toolbar"===b.cssRules[a].cssText.substring(0,8)){e=a;break}-1<e?b.deleteRule(e):b.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};c.fitToWindow=function(){var b=c.getPages(c.root()),e=(m.innerHeight-40)/b[0][1].clientHeight,b=(m.innerWidth-10)/b[0][1].clientWidth,e=e<b?e:b,b=c.odf_canvas.slidevisibilitycss().sheet;b.deleteRule(2);b.insertRule("draw|page { \n-moz-transform: scale("+
e+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+e+"); -o-transform-origin: 0% 0%; -o-transform: scale("+e+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+e+"); }",2)};c.load=function(b){c.odf_canvas.load(b)};c.odf_element=e;c.odf_canvas=new odf.OdfCanvas(c.odf_element);c.odf_canvas.addListener("statereadychange",c.setInitialSlideMode);c.slide_mode="undefined";document.addEventListener("keydown",c.keyDownHandler,!1)}}();
// Input 77
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(l,m){function e(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function c(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(){var a=l.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!p)||(a=a.getRangeAt(0),p.setPoint(a.startContainer,a.startOffset))}function n(){var a=l.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();p&&p.node()&&(b=p.node(),c=b.ownerDocument.createRange(),
c.setStart(b,p.position()),c.collapse(!0),a.addRange(c))}function a(a){var d=a.charCode||a.keyCode;if(p=null,p&&37===d)b(),p.stepBackward(),n();else if(16<=d&&20>=d||33<=d&&40>=d)return;c(a)}function h(a){c(a)}function f(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&f(b),b=b.nextSibling||b.parentNode;var c,d,e,b=a.attributes;c="";for(e=b.length-1;0<=e;e-=1)d=b.item(e),c=c+" "+d.nodeName+'="'+d.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(d=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&d.test(c.nodeValue)&&c.parentNode.removeChild(c)}function d(a,b){for(var c=a.firstChild,f,e,g;c&&c!==a;){if(c.nodeType===Node.ELEMENT_NODE)for(d(c,b),f=c.attributes,g=f.length-1;0<=g;g-=1)e=f.item(g),"http://www.w3.org/2000/xmlns/"!==e.namespaceURI||b[e.nodeValue]||(b[e.nodeValue]=e.localName);c=c.nextSibling||c.parentNode}}function t(){var a=l.ownerDocument.createElement("style"),b;b={};d(l,b);
var c={},f,e,g=0;for(f in b)if(b.hasOwnProperty(f)&&f){e=b[f];if(!e||c.hasOwnProperty(e)||"xmlns"===e){do e="ns"+g,g+=1;while(c.hasOwnProperty(e));b[f]=e}c[e]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+k;a.appendChild(l.ownerDocument.createTextNode(b));m=m.parentNode.replaceChild(a,m)}var k,q,g,p=null;l.id||(l.id="xml"+String(Math.random()).substring(2));q="#"+l.id+" ";k=q+"*,"+q+":visited, "+q+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
q+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+q+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+q+"{overflow: auto;}\n";(function(b){e(b,"click",h);e(b,"keydown",a);e(b,"drop",c);e(b,"dragend",c);e(b,"beforepaste",c);e(b,"paste",c)})(l);this.updateCSS=t;this.setXML=function(a){a=a.documentElement||a;g=a=l.ownerDocument.importNode(a,!0);for(f(a);l.lastChild;)l.removeChild(l.lastChild);l.appendChild(a);t();p=new core.PositionIterator(a)};this.getXML=
function(){return g}};
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
gui.UndoStateRules=function(){function l(e){return e.spec().optype}function m(e){switch(l(e)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=l;this.isEditOperation=m;this.isPartOfOperationSet=function(e,c){if(m(e)){if(0===c.length)return!0;var b;if(b=m(c[c.length-1]))a:{b=c.filter(m);var n=l(e),a;b:switch(n){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&n===l(b[0])){if(1===b.length){b=!0;break a}n=b[b.length-2].spec().position;
b=b[b.length-1].spec().position;a=e.spec().position;if(b===a-(b-n)){b=!0;break a}}b=!1}return b}return!0}};
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
gui.TrivialUndoManager=function(l){function m(){r.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:a.hasUndoStates(),redoAvailable:a.hasRedoStates()})}function e(){q!==d&&q!==g[g.length-1]&&g.push(q)}function c(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);h.normalizeTextNodes(b)}function b(a){return Object.keys(a).map(function(b){return a[b]})}function n(a){function c(a){var b=a.spec();if(e[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete e[b.memberid],g-=1);break;case "MoveCursor":f[b.memberid]||(f[b.memberid]=a)}}var d={},f={},e={},g,h=a.pop();k.getCursors().forEach(function(a){e[a.getMemberId()]=!0});for(g=Object.keys(e).length;h&&0<g;)h.reverse(),h.forEach(c),h=a.pop();return b(d).concat(b(f))}var a=this,h=new core.DomUtils,f,d=[],t,k,q=[],g=[],p=[],r=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=l||new gui.UndoStateRules;this.subscribe=function(a,b){r.subscribe(a,b)};this.unsubscribe=function(a,b){r.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<g.length};this.hasRedoStates=function(){return 0<p.length};this.setOdtDocument=function(a){k=a};this.resetInitialState=function(){g.length=0;p.length=0;d.length=0;q.length=0;f=null;m()};this.saveInitialState=function(){var a=k.getOdfCanvas().odfContainer(),b=k.getOdfCanvas().getAnnotationManager();b&&b.forgetAnnotations();f=a.rootElement.cloneNode(!0);
k.getOdfCanvas().refreshAnnotations();a=f;h.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(c);h.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(c);e();g.unshift(d);q=d=n(g);g.length=0;p.length=0;m()};this.setPlaybackFunction=function(a){t=a};this.onOperationExecuted=function(a){p.length=0;w.isEditOperation(a)&&q===d||!w.isPartOfOperationSet(a,q)?(e(),q=[a],g.push(q),r.emit(gui.UndoManager.signalUndoStateCreated,{operations:q}),m()):(q.push(a),r.emit(gui.UndoManager.signalUndoStateModified,
{operations:q}))};this.moveForward=function(a){for(var b=0,c;a&&p.length;)c=p.pop(),g.push(c),c.forEach(t),a-=1,b+=1;b&&(q=g[g.length-1],m());return b};this.moveBackward=function(a){for(var b=k.getOdfCanvas(),c=b.odfContainer(),e=0;a&&g.length;)p.push(g.pop()),a-=1,e+=1;e&&(c.setRootElement(f.cloneNode(!0)),b.setOdfContainer(c,!0),r.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),k.getCursors().forEach(function(a){k.removeCursor(a.getMemberId())}),d.forEach(t),g.forEach(function(a){a.forEach(t)}),
b.refreshCSS(),q=g[g.length-1]||d,m());return e}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("odf.OdfUtils");runtime.loadClass("gui.SelectionMover");runtime.loadClass("gui.StyleHelper");runtime.loadClass("core.PositionFilterChain");
ops.OdtDocument=function(l){function m(){var a=l.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function e(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var d=f[a].getNode();return b(c)===b(d)?t:k}}function c(a){var b=
gui.SelectionMover.createPositionIterator(m());for(a+=1;0<a&&b.nextPosition();)1===q.acceptPosition(b)&&(a-=1);return b}function b(a){return h.getParagraphElement(a)}function n(a){return l.getFormatting().getStyleElement(a,"paragraph")}var a=this,h,f={},d=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonParagraphStyleCreated,
ops.OdtDocument.signalCommonParagraphStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),t=core.PositionFilter.FilterResult.FILTER_ACCEPT,k=core.PositionFilter.FilterResult.FILTER_REJECT,q;this.getIteratorAtPosition=c;this.upgradeWhitespacesAtPosition=function(a){a=c(a);var b,d,f;a.previousPosition();a.previousPosition();for(f=-1;1>=f;f+=1){b=a.container();d=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[d]&&
h.isSignificantWhitespace(b,d)){runtime.assert(" "===b.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var e=b.ownerDocument.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s");e.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(d,1);0<d&&(b=b.splitText(d));b.parentNode.insertBefore(e,b);b=e;a.moveToEndOfNode(b)}a.nextPosition()}};this.getParagraphStyleElement=n;this.getParagraphElement=b;this.getParagraphStyleAttributes=function(a){return(a=
n(a))?l.getFormatting().getInheritedStyleAttributes(a):null};this.getPositionInTextNode=function(b,c){var d=gui.SelectionMover.createPositionIterator(m()),e=null,h,k=0,l=null,n=b;runtime.assert(0<=b,"position must be >= 0");1===q.acceptPosition(d)?(h=d.container(),h.nodeType===Node.TEXT_NODE&&(e=h,k=0)):b+=1;for(;0<b||null===e;){if(!d.nextPosition())return null;if(1===q.acceptPosition(d))if(b-=1,h=d.container(),h.nodeType===Node.TEXT_NODE)h!==e?(e=h,k=d.domOffset()):k+=1;else if(null!==e){if(0===
b){k=e.length;break}e=null}else if(0===b){e=m().ownerDocument.createTextNode("");h.insertBefore(e,d.rightNode());k=0;break}}if(null===e)return null;if(c&&f[c]&&a.getCursorPosition(c)===n){for(l=f[c].getNode();0===k&&l.nextSibling&&"cursor"===l.nextSibling.localName;)l.parentNode.insertBefore(l,l.nextSibling.nextSibling);l&&0<e.length&&(e=m().ownerDocument.createTextNode(""),k=0,l.parentNode.insertBefore(e,l.nextSibling))}for(;0===k&&(e.previousSibling&&"cursor"===e.previousSibling.localName)&&(h=
e.previousSibling,0<e.length&&(e=m().ownerDocument.createTextNode("")),h.parentNode.insertBefore(e,h),l!==h););for(;e.previousSibling&&e.previousSibling.nodeType===Node.TEXT_NODE;)e.previousSibling.appendData(e.data),k=e.length+e.previousSibling.length,e=e.previousSibling,e.parentNode.removeChild(e.nextSibling);return{textNode:e,offset:k}};this.fixCursorPositions=function(b){var c,d,e,h=new core.PositionFilterChain;h.addFilter("BaseFilter",a.getPositionFilter());for(c in f)f.hasOwnProperty(c)&&(h.addFilter("RootFilter",
a.createRootFilter(c)),d=f[c],e=d.getStepCounter(),e.isPositionWalkable(h)?0===a.getCursorSelection(c).length&&d.move(0):(e=e.countStepsToValidPosition(h),d.move(e),c===b&&a.emit(ops.OdtDocument.signalCursorMoved,d)),h.removeFilter("RootFilter"))};this.getWalkableParagraphLength=function(a){var d=c(0),e=0;d.setUnfilteredPosition(a,0);do{if(b(d.container())!==a)break;1===q.acceptPosition(d)&&(e+=1)}while(d.nextPosition());return e};this.getDistanceFromCursor=function(a,b,c){a=f[a];var d=0;runtime.assert(null!==
b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,d=a(b,c,q));return d};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,m(),0)};this.getCursorSelection=function(a){var b;a=f[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(m(),0,q),b=b(a.getAnchorNode(),0,q));return{position:c+b,length:-b}};this.getPositionFilter=function(){return q};this.getOdfCanvas=function(){return l};this.getRootNode=m;this.getDOM=
function(){return m().ownerDocument};this.getCursor=function(a){return f[a]};this.getCursors=function(){var a=[],b;for(b in f)f.hasOwnProperty(b)&&a.push(f[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countForwardSteps(1,q),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!f[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);
a.move(b);f[c]=a};this.removeCursor=function(b){var c=f[b];return c?(c.removeFromOdtDocument(),delete f[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=l.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return l.getFormatting()};this.getTextElements=
function(a,b){return h.getTextElements(a,b)};this.getParagraphElements=function(a){return h.getParagraphElements(a)};this.emit=function(a,b){d.emit(a,b)};this.subscribe=function(a,b){d.subscribe(a,b)};this.unsubscribe=function(a,b){d.unsubscribe(a,b)};this.createRootFilter=function(a){return new e(a)};this.close=function(a){a()};this.destroy=function(a){a()};q=new function(){function a(b,c,d){var e,f;if(c&&(e=h.lookLeftForCharacter(c),1===e||2===e&&(h.scanRightForAnyCharacter(d)||h.scanRightForAnyCharacter(h.nextNode(b)))))return t;
e=null===c&&h.isParagraph(b);f=h.lookRightForCharacter(d);if(e)return f?t:h.scanRightForAnyCharacter(d)?k:t;if(!f)return k;c=c||h.previousNode(b);return h.scanLeftForAnyCharacter(c)?k:t}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,e,f,l;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return k;if(d===Node.TEXT_NODE){if(!h.isGroupingElement(c.parentNode)||h.isWithinTrackedChanges(c.parentNode,m()))return k;d=b.unfilteredDomOffset();e=c.data;runtime.assert(d!==e.length,"Unexpected offset.");
if(0<d){b=e.substr(d-1,1);if(!h.isODFWhitespace(b))return t;if(1<d)if(b=e.substr(d-2,1),!h.isODFWhitespace(b))f=t;else{if(!h.isODFWhitespace(e.substr(0,d)))return k}else l=h.previousNode(c),h.scanLeftForNonWhitespace(l)&&(f=t);if(f===t)return h.isTrailingWhitespace(c,d)?k:t;f=e.substr(d,1);return h.isODFWhitespace(f)?k:h.scanLeftForAnyCharacter(h.previousNode(c))?k:t}l=b.leftNode();f=c;c=c.parentNode;f=a(c,l,f)}else!h.isGroupingElement(c)||h.isWithinTrackedChanges(c,m())?f=k:(l=b.leftNode(),f=b.rightNode(),
f=a(c,l,f));return f}};h=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalCommonParagraphStyleCreated="style/created";ops.OdtDocument.signalCommonParagraphStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";
ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";(function(){return ops.OdtDocument})();
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
ops.Session=function(l){var m=new ops.OperationFactory,e=new ops.OdtDocument(l),c=new ops.TrivialMemberModel,b=null;this.setMemberModel=function(b){c=b};this.setOperationFactory=function(c){m=c;b&&b.setOperationFactory(m)};this.setOperationRouter=function(c){b=c;c.setPlaybackFunction(function(a){a.execute(e);e.emit(ops.OdtDocument.signalOperationExecuted,a)});c.setOperationFactory(m)};this.getMemberModel=function(){return c};this.getOperationFactory=function(){return m};this.getOdtDocument=function(){return e};
this.enqueue=function(c){b.push(c)};this.close=function(l){b.close(function(a){a?l(a):c.close(function(a){a?l(a):e.close(l)})})};this.destroy=function(b){e.destroy(b)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 83
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\noffice|text * draw|text-box {\n    /** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
