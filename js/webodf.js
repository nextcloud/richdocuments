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
Runtime.prototype.read=function(l,m,g,c){};Runtime.prototype.readFile=function(l,m,g){};Runtime.prototype.readFileSync=function(l,m){};Runtime.prototype.loadXML=function(l,m){};Runtime.prototype.writeFile=function(l,m,g){};Runtime.prototype.isFile=function(l,m){};Runtime.prototype.getFileSize=function(l,m){};Runtime.prototype.deleteFile=function(l,m){};Runtime.prototype.log=function(l,m){};Runtime.prototype.setTimeout=function(l,m){};Runtime.prototype.clearTimeout=function(l){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(l){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(l,m,g){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(l,m){function g(b){var a="",e,f=b.length;for(e=0;e<f;e+=1)a+=String.fromCharCode(b[e]&255);return a}function c(b){var a="",e,f=b.length,d,c,k,p;for(e=0;e<f;e+=1)d=b[e],128>d?a+=String.fromCharCode(d):(e+=1,c=b[e],194<=d&&224>d?a+=String.fromCharCode((d&31)<<6|c&63):(e+=1,k=b[e],224<=d&&240>d?a+=String.fromCharCode((d&15)<<12|(c&63)<<6|k&63):(e+=1,p=b[e],240<=d&&245>d&&(d=(d&7)<<18|(c&63)<<12|(k&63)<<6|p&63,d-=65536,a+=String.fromCharCode((d>>10)+55296,(d&1023)+56320)))));
return a}var b;"utf8"===m?b=c(l):("binary"!==m&&this.log("Unsupported encoding: "+m),b=g(l));return b};Runtime.getVariable=function(l){try{return eval(l)}catch(m){}};Runtime.toJson=function(l){return JSON.stringify(l)};Runtime.fromJson=function(l){return JSON.parse(l)};Runtime.getFunctionName=function(l){return void 0===l.name?(l=/function\s+(\w+)/.exec(l))&&l[1]:l.name};
function BrowserRuntime(l){function m(a,e){var f,d,b;void 0!==e?b=a:e=a;l?(d=l.ownerDocument,b&&(f=d.createElement("span"),f.className=b,f.appendChild(d.createTextNode(b)),l.appendChild(f),l.appendChild(d.createTextNode(" "))),f=d.createElement("span"),0<e.length&&"<"===e[0]?f.innerHTML=e:f.appendChild(d.createTextNode(e)),l.appendChild(f),l.appendChild(d.createElement("br"))):console&&console.log(e);"alert"===b&&alert(e)}function g(a,e,f){function d(){var d;4===g.readyState&&(0!==g.status||g.responseText?
200===g.status||0===g.status?(d="binary"===e?null!==g.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(g.responseBody)).toArray():c.byteArrayFromString(g.responseText,"binary"):g.responseText,b[a]=d,f(null,d)):f(g.responseText||g.statusText):f("File "+a+" is empty."))}if(b.hasOwnProperty(a))f(null,b[a]);else{var g=new XMLHttpRequest;g.open("GET",a,!0);g.onreadystatechange=d;g.overrideMimeType&&("binary"!==e?g.overrideMimeType("text/plain; charset="+e):g.overrideMimeType("text/plain; charset=x-user-defined"));
try{g.send(null)}catch(k){f(k.message)}}}var c=this,b={},n=window.ArrayBuffer&&window.Uint8Array;n&&(Uint8Array.prototype.slice=function(a,e){void 0===e&&(void 0===a&&(a=0),e=this.length);var f=this.subarray(a,e),d,b;e-=a;d=new Uint8Array(new ArrayBuffer(e));for(b=0;b<e;b+=1)d[b]=f[b];return d});this.ByteArray=n?function(a){return new Uint8Array(new ArrayBuffer(a))}:function(a){var e=[];e.length=a;return e};this.concatByteArrays=n?function(a,e){var f,d=a.length,b=e.length,k=new this.ByteArray(d+b);
for(f=0;f<d;f+=1)k[f]=a[f];for(f=0;f<b;f+=1)k[f+d]=e[f];return k}:function(a,e){return a.concat(e)};this.byteArrayFromArray=function(a){return a.slice()};this.byteArrayFromString=function(a,e){var f;if("utf8"===e){f=a.length;var d,b,k,p=0;for(b=0;b<f;b+=1)k=a.charCodeAt(b),p+=1+(128<k)+(2048<k);d=new c.ByteArray(p);for(b=p=0;b<f;b+=1)k=a.charCodeAt(b),128>k?(d[p]=k,p+=1):2048>k?(d[p]=192|k>>>6,d[p+1]=128|k&63,p+=2):(d[p]=224|k>>>12&15,d[p+1]=128|k>>>6&63,d[p+2]=128|k&63,p+=3)}else for("binary"!==
e&&c.log("unknown encoding: "+e),f=a.length,d=new c.ByteArray(f),b=0;b<f;b+=1)d[b]=a.charCodeAt(b)&255;return f=d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=g;this.read=function(a,e,f,d){function g(){var h;4===k.readyState&&(0!==k.status||k.responseText?200===k.status||0===k.status?(k.response?(h=k.response,h=new Uint8Array(h)):h=null!==k.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(k.responseBody)).toArray():c.byteArrayFromString(k.responseText,"binary"),b[a]=h,d(null,h.slice(e,e+f))):d(k.responseText||k.statusText):d("File "+a+" is empty."))}if(b.hasOwnProperty(a))d(null,b[a].slice(e,e+f));else{var k=new XMLHttpRequest;k.open("GET",a,!0);k.onreadystatechange=g;k.overrideMimeType&&k.overrideMimeType("text/plain; charset=x-user-defined");k.responseType="arraybuffer";try{k.send(null)}catch(p){d(p.message)}}};this.readFileSync=function(a,e){var f=new XMLHttpRequest,
d;f.open("GET",a,!1);f.overrideMimeType&&("binary"!==e?f.overrideMimeType("text/plain; charset="+e):f.overrideMimeType("text/plain; charset=x-user-defined"));try{if(f.send(null),200===f.status||0===f.status)d=f.responseText}catch(b){}return d};this.writeFile=function(a,e,f){b[a]=e;var d=new XMLHttpRequest;d.open("PUT",a,!0);d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200<=d.status&&300>d.status||0===d.status?f(null):f("Status "+String(d.status)+": "+d.responseText||
d.statusText):f("File "+a+" is empty."))};e=e.buffer&&!d.sendAsBinary?e.buffer:c.byteArrayToString(e,"binary");try{d.sendAsBinary?d.sendAsBinary(e):d.send(e)}catch(g){c.log("HUH? "+g+" "+e),f(g.message)}};this.deleteFile=function(a,e){delete b[a];var f=new XMLHttpRequest;f.open("DELETE",a,!0);f.onreadystatechange=function(){4===f.readyState&&(200>f.status&&300<=f.status?e(f.responseText):e(null))};f.send(null)};this.loadXML=function(a,e){var f=new XMLHttpRequest;f.open("GET",a,!0);f.overrideMimeType&&
f.overrideMimeType("text/xml");f.onreadystatechange=function(){4===f.readyState&&(0!==f.status||f.responseText?200===f.status||0===f.status?e(null,f.responseXML):e(f.responseText):e("File "+a+" is empty."))};try{f.send(null)}catch(d){e(d.message)}};this.isFile=function(a,e){c.getFileSize(a,function(a){e(-1!==a)})};this.getFileSize=function(a,e){var f=new XMLHttpRequest;f.open("HEAD",a,!0);f.onreadystatechange=function(){if(4===f.readyState){var d=f.getResponseHeader("Content-Length");d?e(parseInt(d,
10)):g(a,"binary",function(d,k){d?e(-1):e(k.length)})}};f.send(null)};this.log=m;this.assert=function(a,e,f){if(!a)throw m("alert","ASSERTION FAILED:\n"+e),f&&f(),e;};this.setTimeout=function(a,e){return setTimeout(function(){a()},e)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){m("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function l(e,a,d){e=c.resolve(b,e);"binary"!==a?g.readFile(e,a,d):g.readFile(e,null,d)}var m=this,g=require("fs"),c=require("path"),b="",n,a;this.ByteArray=function(e){return new Buffer(e)};this.byteArrayFromArray=function(e){var a=new Buffer(e.length),d,b=e.length;for(d=0;d<b;d+=1)a[d]=e[d];return a};this.concatByteArrays=function(e,a){var d=new Buffer(e.length+a.length);e.copy(d,0,0);a.copy(d,e.length,0);return d};this.byteArrayFromString=function(a,b){return new Buffer(a,
b)};this.byteArrayToString=function(a,b){return a.toString(b)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=l;this.loadXML=function(a,b){l(a,"utf-8",function(d,a){if(d)return b(d);b(null,m.parseXML(a))})};this.writeFile=function(a,f,d){a=c.resolve(b,a);g.writeFile(a,f,"binary",function(a){d(a||null)})};this.deleteFile=function(a,f){a=c.resolve(b,a);g.unlink(a,f)};this.read=function(a,f,d,n){a=c.resolve(b,a);g.open(a,"r+",666,function(a,
e){if(a)n(a);else{var h=new Buffer(d);g.read(e,h,0,d,f,function(d){g.close(e);n(d,h)})}})};this.readFileSync=function(a,b){return b?"binary"===b?g.readFileSync(a,null):g.readFileSync(a,b):""};this.isFile=function(a,f){a=c.resolve(b,a);g.stat(a,function(d,a){f(!d&&a.isFile())})};this.getFileSize=function(a,f){a=c.resolve(b,a);g.stat(a,function(d,a){d?f(-1):f(a.size)})};this.log=function(a,b){var d;void 0!==b?d=a:b=a;"alert"===d&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(b+
"\n");"alert"===d&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,b,d){a||(process.stderr.write("ASSERTION FAILED: "+b),d&&d())};this.setTimeout=function(a,b){return setTimeout(function(){a()},b)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){b=a};this.currentDirectory=function(){return b};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=
function(a){return n.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};n=new (require("xmldom").DOMParser);a=m.parseXML("<a/>").implementation}
function RhinoRuntime(){function l(a,b){var f;void 0!==b?f=a:b=a;"alert"===f&&print("\n!!!!! ALERT !!!!!");print(b);"alert"===f&&print("!!!!! ALERT !!!!!")}var m=this,g=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),c,b,n="";g.setValidating(!1);g.setNamespaceAware(!0);g.setExpandEntityReferences(!1);g.setSchema(null);b=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,b){var f=new Packages.java.io.FileReader(b);return new Packages.org.xml.sax.InputSource(f)}});c=g.newDocumentBuilder();
c.setEntityResolver(b);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,b){var f=[],d,c=a.length;for(d=0;d<c;d+=1)f[d]=a.charCodeAt(d)&255;return f};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,b){return a.concat(b)};this.loadXML=function(a,b){var f=new Packages.java.io.File(a),d;try{d=c.parse(f)}catch(g){print(g);
b(g);return}b(null,d)};this.readFile=function(a,b,f){n&&(a=n+"/"+a);var d=new Packages.java.io.File(a),c="binary"===b?"latin1":b;d.isFile()?(a=readFile(a,c),"binary"===b&&(a=m.byteArrayFromString(a,"binary")),f(null,a)):f(a+" is not a file.")};this.writeFile=function(a,b,f){n&&(a=n+"/"+a);a=new Packages.java.io.FileOutputStream(a);var d,c=b.length;for(d=0;d<c;d+=1)a.write(b[d]);a.close();f(null)};this.deleteFile=function(a,b){n&&(a=n+"/"+a);(new Packages.java.io.File(a))["delete"]()?b(null):b("Could not delete "+
a)};this.read=function(a,b,f,d){n&&(a=n+"/"+a);var c;c=a;var k="binary";(new Packages.java.io.File(c)).isFile()?("binary"===k&&(k="latin1"),c=readFile(c,k)):c=null;c?d(null,this.byteArrayFromString(c.substring(b,b+f),"binary")):d("Cannot read "+a)};this.readFileSync=function(a,b){return b?readFile(a,b):""};this.isFile=function(a,b){n&&(a=n+"/"+a);var f=new Packages.java.io.File(a);b(f.isFile())};this.getFileSize=function(a,b){n&&(a=n+"/"+a);var f=new Packages.java.io.File(a);b(f.length())};this.log=
l;this.assert=function(a,b,f){a||(l("alert","ASSERTION FAILED: "+b),f&&f())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){n=a};this.currentDirectory=function(){return n};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return c.getDOMImplementation()};this.parseXML=function(a){return c.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function l(c){var b=c[0],g;g=eval("if (typeof "+b+" === 'undefined') {eval('"+b+" = {};');}"+b);for(b=1;b<c.length-1;b+=1)g=g.hasOwnProperty(c[b])?g[c[b]]:g[c[b]]={};return g[c[c.length-1]]}var m={},g={};runtime.loadClass=function(c){function b(a){a=a.replace(/\./g,"/")+".js";var d=runtime.libraryPaths(),b,k,e;runtime.currentDirectory&&d.push(runtime.currentDirectory());for(b=0;b<d.length;b+=1){k=d[b];if(!g.hasOwnProperty(k))try{e=runtime.readFileSync(d[b]+"/manifest.js","utf8"),g[k]=
e&&e.length?eval(e):null}catch(h){g[k]=null,runtime.log("Cannot load manifest for "+k+".")}e=null;if((k=g[k])&&k.indexOf&&-1!==k.indexOf(a))return d[b]+"/"+a}return null}function n(a){var d,e;e=b(a);if(!e)throw a+" is not listed in any manifest.js.";try{d=runtime.readFileSync(e,"utf8")}catch(k){throw runtime.log("Error loading "+a+" "+k),k;}if(void 0===d)throw"Cannot load class "+a;d=d+("\n//# sourceURL="+e)+("\n//@ sourceURL="+e);try{d=eval(a+" = eval(code);")}catch(c){throw runtime.log("Error loading "+
a+" "+c),c;}return d}if(!IS_COMPILED_CODE&&!m.hasOwnProperty(c)){var a=c.split("."),e;e=l(a);if(!e&&(e=n(c),!e||Runtime.getFunctionName(e)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];m[c]=!0}}})();
(function(l){function m(g){if(g.length){var c=g[0];runtime.readFile(c,"utf8",function(b,n){function a(){var a;(a=eval(f))&&runtime.exit(a)}var e="",f=n;-1!==c.indexOf("/")&&(e=c.substring(0,c.indexOf("/")));runtime.setCurrentDirectory(e);b||null===f?(runtime.log(b),runtime.exit(1)):a.apply(null,g)})}}l=l?Array.prototype.slice.call(l):[];"NodeJSRuntime"===runtime.type()?m(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?m(l):m(l.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function l(a){var d=[],b,k=a.length;for(b=0;b<k;b+=1)d[b]=a.charCodeAt(b)&255;return d}function m(a){var d,b="",k,h=a.length-2;for(k=0;k<h;k+=3)d=a[k]<<16|a[k+1]<<8|a[k+2],b+=q[d>>>18],b+=q[d>>>12&63],b+=q[d>>>6&63],b+=q[d&63];k===h+1?(d=a[k]<<4,b+=q[d>>>6],b+=q[d&63],b+="=="):k===h&&(d=a[k]<<10|a[k+1]<<2,b+=q[d>>>12],b+=q[d>>>6&63],b+=q[d&63],b+="=");return b}function g(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var d=[],b=a.length%4,k,h=a.length,e;for(k=0;k<h;k+=4)e=(s[a.charAt(k)]||
0)<<18|(s[a.charAt(k+1)]||0)<<12|(s[a.charAt(k+2)]||0)<<6|(s[a.charAt(k+3)]||0),d.push(e>>16,e>>8&255,e&255);d.length-=[0,0,2,1][b];return d}function c(a){var d=[],b,k=a.length,h;for(b=0;b<k;b+=1)h=a[b],128>h?d.push(h):2048>h?d.push(192|h>>>6,128|h&63):d.push(224|h>>>12&15,128|h>>>6&63,128|h&63);return d}function b(a){var d=[],b,k=a.length,h,e,f;for(b=0;b<k;b+=1)h=a[b],128>h?d.push(h):(b+=1,e=a[b],224>h?d.push((h&31)<<6|e&63):(b+=1,f=a[b],d.push((h&15)<<12|(e&63)<<6|f&63)));return d}function n(a){return m(l(a))}
function a(a){return String.fromCharCode.apply(String,g(a))}function e(a){return b(l(a))}function f(a){a=b(a);for(var d="",k=0;k<a.length;)d+=String.fromCharCode.apply(String,a.slice(k,k+45E3)),k+=45E3;return d}function d(a,d,b){var k="",h,e,f;for(f=d;f<b;f+=1)d=a.charCodeAt(f)&255,128>d?k+=String.fromCharCode(d):(f+=1,h=a.charCodeAt(f)&255,224>d?k+=String.fromCharCode((d&31)<<6|h&63):(f+=1,e=a.charCodeAt(f)&255,k+=String.fromCharCode((d&15)<<12|(h&63)<<6|e&63)));return k}function t(a,b){function k(){var c=
f+h;c>a.length&&(c=a.length);e+=d(a,f,c);f=c;c=f===a.length;b(e,c)&&!c&&runtime.setTimeout(k,0)}var h=1E5,e="",f=0;a.length<h?b(d(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),k())}function k(a){return c(l(a))}function p(a){return String.fromCharCode.apply(String,c(a))}function h(a){return String.fromCharCode.apply(String,c(l(a)))}var q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",s=function(a){var d={},b,k;b=0;for(k=a.length;b<k;b+=1)d[a.charAt(b)]=b;return d}(q),w,
u,A=runtime.getWindow(),y,v;A&&A.btoa?(y=function(a){return A.btoa(a)},w=function(a){return y(h(a))}):(y=n,w=function(a){return m(k(a))});A&&A.atob?(v=function(a){return A.atob(a)},u=function(a){a=v(a);return d(a,0,a.length)}):(v=a,u=function(a){return f(g(a))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=m;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=g;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=c;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=b;this.convertUTF8StringToBase64=n;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=e;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=f;this.convertUTF8StringToUTF16String=t;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=k;this.convertUTF16ArrayToUTF8String=p;this.convertUTF16StringToUTF8String=h;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=u;this.fromBase64=a;this.toBase64=n;this.atob=
v;this.btoa=y;this.utob=h;this.btou=t;this.encode=w;this.encodeURI=function(a){return w(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return u(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function l(){this.dl=this.fc=0}function m(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function g(a,d,b,k){this.good_length=a;this.max_lazy=d;this.nice_length=b;this.max_chain=k}function c(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=b;this.off=0}var b=8192,n,a,e,f,d=null,t,k,p,h,q,s,w,u,A,y,v,r,z,G,C,L,B,M,F,K,ea,pa,N,qa,Z,$,Q,W,S,O,H,I,J,R,ba,fa,P,ca,ja,E,ma,ka,U,na,X,x,la,T,oa,ta,D,sa=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ha=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],ra=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ua=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],aa;aa=[new g(0,0,0,0),new g(4,4,8,4),new g(4,5,16,8),new g(4,6,32,32),new g(4,4,16,16),new g(8,16,32,32),new g(8,16,128,128),new g(8,32,128,256),new g(32,128,258,1024),new g(32,258,258,4096)];var ia=function(h){d[k+t++]=h;if(k+t===b){var f;if(0!==t){null!==n?(h=n,n=n.next):h=new c;
h.next=null;h.len=h.off=0;null===a?a=e=h:e=e.next=h;h.len=t-k;for(f=0;f<h.len;f++)h.ptr[f]=d[k+f];t=k=0}}},da=function(a){a&=65535;k+t<b-2?(d[k+t++]=a&255,d[k+t++]=a>>>8):(ia(a&255),ia(a>>>8))},V=function(){v=(v<<5^h[B+3-1]&255)&8191;r=w[32768+v];w[B&32767]=r;w[32768+v]=B},Y=function(a,d){A>16-d?(u|=a<<A,da(u),u=a>>16-A,A+=d-16):(u|=a<<A,A+=d)},ga=function(a,d){Y(d[a].fc,d[a].dl)},Aa=function(a,d,b){return a[d].fc<a[b].fc||a[d].fc===a[b].fc&&P[d]<=P[b]},Ba=function(a,d,b){var k;for(k=0;k<b&&D<ta.length;k++)a[d+
k]=ta.charCodeAt(D++)&255;return k},xa=function(){var a,d,b=65536-K-B;if(-1===b)b--;else if(65274<=B){for(a=0;32768>a;a++)h[a]=h[a+32768];M-=32768;B-=32768;y-=32768;for(a=0;8192>a;a++)d=w[32768+a],w[32768+a]=32768<=d?d-32768:0;for(a=0;32768>a;a++)d=w[a],w[a]=32768<=d?d-32768:0;b+=32768}F||(a=Ba(h,B+K,b),0>=a?F=!0:K+=a)},Ca=function(a){var d=ea,b=B,k,e=L,f=32506<B?B-32506:0,c=B+258,r=h[b+e-1],q=h[b+e];L>=qa&&(d>>=2);do if(k=a,h[k+e]===q&&h[k+e-1]===r&&h[k]===h[b]&&h[++k]===h[b+1]){b+=2;k++;do++b;while(h[b]===
h[++k]&&h[++b]===h[++k]&&h[++b]===h[++k]&&h[++b]===h[++k]&&h[++b]===h[++k]&&h[++b]===h[++k]&&h[++b]===h[++k]&&h[++b]===h[++k]&&b<c);k=258-(c-b);b=c-258;if(k>e){M=a;e=k;if(258<=k)break;r=h[b+e-1];q=h[b+e]}a=w[a&32767]}while(a>f&&0!==--d);return e},va=function(a,d){s[U++]=d;0===a?Z[d].fc++:(a--,Z[ca[d]+256+1].fc++,$[(256>a?ja[a]:ja[256+(a>>7)])&255].fc++,q[na++]=a,x|=la);la<<=1;0===(U&7)&&(ka[X++]=x,x=0,la=1);if(2<N&&0===(U&4095)){var b=8*U,k=B-y,h;for(h=0;30>h;h++)b+=$[h].fc*(5+ha[h]);b>>=3;if(na<
parseInt(U/2,10)&&b<parseInt(k/2,10))return!0}return 8191===U||8192===na},ya=function(a,d){for(var b=R[d],k=d<<1;k<=ba;){k<ba&&Aa(a,R[k+1],R[k])&&k++;if(Aa(a,b,R[k]))break;R[d]=R[k];d=k;k<<=1}R[d]=b},Da=function(a,d){var b=0;do b|=a&1,a>>=1,b<<=1;while(0<--d);return b>>1},Ea=function(a,d){var b=[];b.length=16;var k=0,h;for(h=1;15>=h;h++)k=k+J[h-1]<<1,b[h]=k;for(k=0;k<=d;k++)h=a[k].dl,0!==h&&(a[k].fc=Da(b[h]++,h))},za=function(a){var d=a.dyn_tree,b=a.static_tree,k=a.elems,h,e=-1,f=k;ba=0;fa=573;for(h=
0;h<k;h++)0!==d[h].fc?(R[++ba]=e=h,P[h]=0):d[h].dl=0;for(;2>ba;)h=R[++ba]=2>e?++e:0,d[h].fc=1,P[h]=0,T--,null!==b&&(oa-=b[h].dl);a.max_code=e;for(h=ba>>1;1<=h;h--)ya(d,h);do h=R[1],R[1]=R[ba--],ya(d,1),b=R[1],R[--fa]=h,R[--fa]=b,d[f].fc=d[h].fc+d[b].fc,P[f]=P[h]>P[b]+1?P[h]:P[b]+1,d[h].dl=d[b].dl=f,R[1]=f++,ya(d,1);while(2<=ba);R[--fa]=R[1];f=a.dyn_tree;h=a.extra_bits;var k=a.extra_base,b=a.max_code,c=a.max_length,r=a.static_tree,q,g,p,n,s=0;for(g=0;15>=g;g++)J[g]=0;f[R[fa]].dl=0;for(a=fa+1;573>a;a++)q=
R[a],g=f[f[q].dl].dl+1,g>c&&(g=c,s++),f[q].dl=g,q>b||(J[g]++,p=0,q>=k&&(p=h[q-k]),n=f[q].fc,T+=n*(g+p),null!==r&&(oa+=n*(r[q].dl+p)));if(0!==s){do{for(g=c-1;0===J[g];)g--;J[g]--;J[g+1]+=2;J[c]--;s-=2}while(0<s);for(g=c;0!==g;g--)for(q=J[g];0!==q;)h=R[--a],h>b||(f[h].dl!==g&&(T+=(g-f[h].dl)*f[h].fc,f[h].fc=g),q--)}Ea(d,e)},Fa=function(a,d){var b,k=-1,h,e=a[0].dl,f=0,c=7,r=4;0===e&&(c=138,r=3);a[d+1].dl=65535;for(b=0;b<=d;b++)h=e,e=a[b+1].dl,++f<c&&h===e||(f<r?S[h].fc+=f:0!==h?(h!==k&&S[h].fc++,S[16].fc++):
10>=f?S[17].fc++:S[18].fc++,f=0,k=h,0===e?(c=138,r=3):h===e?(c=6,r=3):(c=7,r=4))},Ga=function(){8<A?da(u):0<A&&ia(u);A=u=0},Ha=function(a,d){var b,k=0,h=0,e=0,f=0,c,r;if(0!==U){do 0===(k&7)&&(f=ka[e++]),b=s[k++]&255,0===(f&1)?ga(b,a):(c=ca[b],ga(c+256+1,a),r=sa[c],0!==r&&(b-=E[c],Y(b,r)),b=q[h++],c=(256>b?ja[b]:ja[256+(b>>7)])&255,ga(c,d),r=ha[c],0!==r&&(b-=ma[c],Y(b,r))),f>>=1;while(k<U)}ga(256,a)},Ia=function(a,d){var b,k=-1,h,e=a[0].dl,f=0,c=7,r=4;0===e&&(c=138,r=3);for(b=0;b<=d;b++)if(h=e,e=a[b+
1].dl,!(++f<c&&h===e)){if(f<r){do ga(h,S);while(0!==--f)}else 0!==h?(h!==k&&(ga(h,S),f--),ga(16,S),Y(f-3,2)):10>=f?(ga(17,S),Y(f-3,3)):(ga(18,S),Y(f-11,7));f=0;k=h;0===e?(c=138,r=3):h===e?(c=6,r=3):(c=7,r=4)}},Ja=function(){var a;for(a=0;286>a;a++)Z[a].fc=0;for(a=0;30>a;a++)$[a].fc=0;for(a=0;19>a;a++)S[a].fc=0;Z[256].fc=1;x=U=na=X=T=oa=0;la=1},wa=function(a){var d,b,k,e;e=B-y;ka[X]=x;za(O);za(H);Fa(Z,O.max_code);Fa($,H.max_code);za(I);for(k=18;3<=k&&0===S[ua[k]].dl;k--);T+=3*(k+1)+14;d=T+3+7>>3;b=
oa+3+7>>3;b<=d&&(d=b);if(e+4<=d&&0<=y)for(Y(0+a,3),Ga(),da(e),da(~e),k=0;k<e;k++)ia(h[y+k]);else if(b===d)Y(2+a,3),Ha(Q,W);else{Y(4+a,3);e=O.max_code+1;d=H.max_code+1;k+=1;Y(e-257,5);Y(d-1,5);Y(k-4,4);for(b=0;b<k;b++)Y(S[ua[b]].dl,3);Ia(Z,e-1);Ia($,d-1);Ha(Z,$)}Ja();0!==a&&Ga()},Ka=function(b,h,e){var f,c,r;for(f=0;null!==a&&f<e;){c=e-f;c>a.len&&(c=a.len);for(r=0;r<c;r++)b[h+f+r]=a.ptr[a.off+r];a.off+=c;a.len-=c;f+=c;0===a.len&&(c=a,a=a.next,c.next=n,n=c)}if(f===e)return f;if(k<t){c=e-f;c>t-k&&(c=
t-k);for(r=0;r<c;r++)b[h+f+r]=d[k+r];k+=c;f+=c;t===k&&(t=k=0)}return f},La=function(b,d,e){var c;if(!f){if(!F){A=u=0;var g,q;if(0===W[0].dl){O.dyn_tree=Z;O.static_tree=Q;O.extra_bits=sa;O.extra_base=257;O.elems=286;O.max_length=15;O.max_code=0;H.dyn_tree=$;H.static_tree=W;H.extra_bits=ha;H.extra_base=0;H.elems=30;H.max_length=15;H.max_code=0;I.dyn_tree=S;I.static_tree=null;I.extra_bits=ra;I.extra_base=0;I.elems=19;I.max_length=7;for(q=g=I.max_code=0;28>q;q++)for(E[q]=g,c=0;c<1<<sa[q];c++)ca[g++]=
q;ca[g-1]=q;for(q=g=0;16>q;q++)for(ma[q]=g,c=0;c<1<<ha[q];c++)ja[g++]=q;for(g>>=7;30>q;q++)for(ma[q]=g<<7,c=0;c<1<<ha[q]-7;c++)ja[256+g++]=q;for(c=0;15>=c;c++)J[c]=0;for(c=0;143>=c;)Q[c++].dl=8,J[8]++;for(;255>=c;)Q[c++].dl=9,J[9]++;for(;279>=c;)Q[c++].dl=7,J[7]++;for(;287>=c;)Q[c++].dl=8,J[8]++;Ea(Q,287);for(c=0;30>c;c++)W[c].dl=5,W[c].fc=Da(c,5);Ja()}for(c=0;8192>c;c++)w[32768+c]=0;pa=aa[N].max_lazy;qa=aa[N].good_length;ea=aa[N].max_chain;y=B=0;K=Ba(h,0,65536);if(0>=K)F=!0,K=0;else{for(F=!1;262>
K&&!F;)xa();for(c=v=0;2>c;c++)v=(v<<5^h[c]&255)&8191}a=null;k=t=0;3>=N?(L=2,C=0):(C=2,G=0);p=!1}f=!0;if(0===K)return p=!0,0}c=Ka(b,d,e);if(c===e)return e;if(p)return c;if(3>=N)for(;0!==K&&null===a;){V();0!==r&&32506>=B-r&&(C=Ca(r),C>K&&(C=K));if(3<=C)if(q=va(B-M,C-3),K-=C,C<=pa){C--;do B++,V();while(0!==--C);B++}else B+=C,C=0,v=h[B]&255,v=(v<<5^h[B+1]&255)&8191;else q=va(0,h[B]&255),K--,B++;q&&(wa(0),y=B);for(;262>K&&!F;)xa()}else for(;0!==K&&null===a;){V();L=C;z=M;C=2;0!==r&&(L<pa&&32506>=B-r)&&
(C=Ca(r),C>K&&(C=K),3===C&&4096<B-M&&C--);if(3<=L&&C<=L){q=va(B-1-z,L-3);K-=L-1;L-=2;do B++,V();while(0!==--L);G=0;C=2;B++;q&&(wa(0),y=B)}else 0!==G?va(0,h[B-1]&255)&&(wa(0),y=B):G=1,B++,K--;for(;262>K&&!F;)xa()}0===K&&(0!==G&&va(0,h[B-1]&255),wa(1),p=!0);return c+Ka(b,c+d,e-c)};this.deflate=function(k,c){var r,g;ta=k;D=0;"undefined"===String(typeof c)&&(c=6);(r=c)?1>r?r=1:9<r&&(r=9):r=6;N=r;F=f=!1;if(null===d){n=a=e=null;d=[];d.length=b;h=[];h.length=65536;q=[];q.length=8192;s=[];s.length=32832;
w=[];w.length=65536;Z=[];Z.length=573;for(r=0;573>r;r++)Z[r]=new l;$=[];$.length=61;for(r=0;61>r;r++)$[r]=new l;Q=[];Q.length=288;for(r=0;288>r;r++)Q[r]=new l;W=[];W.length=30;for(r=0;30>r;r++)W[r]=new l;S=[];S.length=39;for(r=0;39>r;r++)S[r]=new l;O=new m;H=new m;I=new m;J=[];J.length=16;R=[];R.length=573;P=[];P.length=573;ca=[];ca.length=256;ja=[];ja.length=512;E=[];E.length=29;ma=[];ma.length=30;ka=[];ka.length=1024}var p=Array(1024),u=[],t=[];for(r=La(p,0,p.length);0<r;){t.length=r;for(g=0;g<
r;g++)t[g]=String.fromCharCode(p[g]);u[u.length]=t.join("");r=La(p,0,p.length)}ta=null;return u.join("")}};
// Input 4
core.ByteArray=function(l){this.pos=0;this.data=l;this.readUInt32LE=function(){this.pos+=4;var m=this.data,g=this.pos;return m[--g]<<24|m[--g]<<16|m[--g]<<8|m[--g]};this.readUInt16LE=function(){this.pos+=2;var m=this.data,g=this.pos;return m[--g]<<8|m[--g]}};
// Input 5
core.ByteArrayWriter=function(l){var m=this,g=new runtime.ByteArray(0);this.appendByteArrayWriter=function(c){g=runtime.concatByteArrays(g,c.getByteArray())};this.appendByteArray=function(c){g=runtime.concatByteArrays(g,c)};this.appendArray=function(c){g=runtime.concatByteArrays(g,runtime.byteArrayFromArray(c))};this.appendUInt16LE=function(c){m.appendArray([c&255,c>>8&255])};this.appendUInt32LE=function(c){m.appendArray([c&255,c>>8&255,c>>16&255,c>>24&255])};this.appendString=function(c){g=runtime.concatByteArrays(g,
runtime.byteArrayFromString(c,l))};this.getLength=function(){return g.length};this.getByteArray=function(){return g}};
// Input 6
core.RawInflate=function(){var l,m,g=null,c,b,n,a,e,f,d,t,k,p,h,q,s,w,u=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],A=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],v=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],r=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],z=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],G=function(){this.list=this.next=null},C=function(){this.n=this.b=this.e=0;this.t=null},L=function(a,b,d,k,h,c){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var e=Array(this.BMAX+1),f,r,q,g,p,n,s,m=Array(this.BMAX+1),l,w,u,t=new C,v=Array(this.BMAX);g=Array(this.N_MAX);var y,A=Array(this.BMAX+1),z,B,M;M=this.root=null;for(p=0;p<e.length;p++)e[p]=0;for(p=0;p<m.length;p++)m[p]=0;for(p=0;p<v.length;p++)v[p]=null;for(p=0;p<g.length;p++)g[p]=
0;for(p=0;p<A.length;p++)A[p]=0;f=256<b?a[256]:this.BMAX;l=a;w=0;p=b;do e[l[w]]++,w++;while(0<--p);if(e[0]==b)this.root=null,this.status=this.m=0;else{for(n=1;n<=this.BMAX&&0==e[n];n++);s=n;c<n&&(c=n);for(p=this.BMAX;0!=p&&0==e[p];p--);q=p;c>p&&(c=p);for(z=1<<n;n<p;n++,z<<=1)if(0>(z-=e[n])){this.status=2;this.m=c;return}if(0>(z-=e[p]))this.status=2,this.m=c;else{e[p]+=z;A[1]=n=0;l=e;w=1;for(u=2;0<--p;)A[u++]=n+=l[w++];l=a;p=w=0;do 0!=(n=l[w++])&&(g[A[n]++]=p);while(++p<b);b=A[q];A[0]=p=0;l=g;w=0;
g=-1;y=m[0]=0;u=null;for(B=0;s<=q;s++)for(a=e[s];0<a--;){for(;s>y+m[1+g];){y+=m[1+g];g++;B=(B=q-y)>c?c:B;if((r=1<<(n=s-y))>a+1)for(r-=a+1,u=s;++n<B&&!((r<<=1)<=e[++u]);)r-=e[u];y+n>f&&y<f&&(n=f-y);B=1<<n;m[1+g]=n;u=Array(B);for(r=0;r<B;r++)u[r]=new C;M=null==M?this.root=new G:M.next=new G;M.next=null;M.list=u;v[g]=u;0<g&&(A[g]=p,t.b=m[g],t.e=16+n,t.t=u,n=(p&(1<<y)-1)>>y-m[g],v[g-1][n].e=t.e,v[g-1][n].b=t.b,v[g-1][n].n=t.n,v[g-1][n].t=t.t)}t.b=s-y;w>=b?t.e=99:l[w]<d?(t.e=256>l[w]?16:15,t.n=l[w++]):
(t.e=h[l[w]-d],t.n=k[l[w++]-d]);r=1<<s-y;for(n=p>>y;n<B;n+=r)u[n].e=t.e,u[n].b=t.b,u[n].n=t.n,u[n].t=t.t;for(n=1<<s-1;0!=(p&n);n>>=1)p^=n;for(p^=n;(p&(1<<y)-1)!=A[g];)y-=m[g],g--}this.m=m[1];this.status=0!=z&&1!=q?1:0}}},B=function(b){for(;a<b;){var d=n,k;k=s.length==w?-1:s[w++];n=d|k<<a;a+=8}},M=function(a){return n&u[a]},F=function(b){n>>=b;a-=b},K=function(a,b,c){var f,r,g;if(0==c)return 0;for(g=0;;){B(h);r=k.list[M(h)];for(f=r.e;16<f;){if(99==f)return-1;F(r.b);f-=16;B(f);r=r.t[M(f)];f=r.e}F(r.b);
if(16==f)m&=32767,a[b+g++]=l[m++]=r.n;else{if(15==f)break;B(f);d=r.n+M(f);F(f);B(q);r=p.list[M(q)];for(f=r.e;16<f;){if(99==f)return-1;F(r.b);f-=16;B(f);r=r.t[M(f)];f=r.e}F(r.b);B(f);t=m-r.n-M(f);for(F(f);0<d&&g<c;)d--,t&=32767,m&=32767,a[b+g++]=l[m++]=l[t++]}if(g==c)return c}e=-1;return g},ea,pa=function(a,b,d){var f,c,e,g,n,s,l,m=Array(316);for(f=0;f<m.length;f++)m[f]=0;B(5);s=257+M(5);F(5);B(5);l=1+M(5);F(5);B(4);f=4+M(4);F(4);if(286<s||30<l)return-1;for(c=0;c<f;c++)B(3),m[z[c]]=M(3),F(3);for(;19>
c;c++)m[z[c]]=0;h=7;c=new L(m,19,19,null,null,h);if(0!=c.status)return-1;k=c.root;h=c.m;g=s+l;for(f=e=0;f<g;)if(B(h),n=k.list[M(h)],c=n.b,F(c),c=n.n,16>c)m[f++]=e=c;else if(16==c){B(2);c=3+M(2);F(2);if(f+c>g)return-1;for(;0<c--;)m[f++]=e}else{17==c?(B(3),c=3+M(3),F(3)):(B(7),c=11+M(7),F(7));if(f+c>g)return-1;for(;0<c--;)m[f++]=0;e=0}h=9;c=new L(m,s,257,A,y,h);0==h&&(c.status=1);if(0!=c.status)return-1;k=c.root;h=c.m;for(f=0;f<l;f++)m[f]=m[f+s];q=6;c=new L(m,l,0,v,r,q);p=c.root;q=c.m;return 0==q&&
257<s||0!=c.status?-1:K(a,b,d)};this.inflate=function(u,z){null==l&&(l=Array(65536));a=n=m=0;e=-1;f=!1;d=t=0;k=null;s=u;w=0;var G=new runtime.ByteArray(z);a:{var C,Q;for(C=0;C<z&&(!f||-1!=e);){if(0<d){if(0!=e)for(;0<d&&C<z;)d--,t&=32767,m&=32767,G[0+C++]=l[m++]=l[t++];else{for(;0<d&&C<z;)d--,m&=32767,B(8),G[0+C++]=l[m++]=M(8),F(8);0==d&&(e=-1)}if(C==z)break}if(-1==e){if(f)break;B(1);0!=M(1)&&(f=!0);F(1);B(2);e=M(2);F(2);k=null;d=0}switch(e){case 0:Q=G;var W=0+C,S=z-C,O=void 0,O=a&7;F(O);B(16);O=M(16);
F(16);B(16);if(O!=(~n&65535))Q=-1;else{F(16);d=O;for(O=0;0<d&&O<S;)d--,m&=32767,B(8),Q[W+O++]=l[m++]=M(8),F(8);0==d&&(e=-1);Q=O}break;case 1:if(null!=k)Q=K(G,0+C,z-C);else b:{Q=G;W=0+C;S=z-C;if(null==g){for(var H=void 0,O=Array(288),H=void 0,H=0;144>H;H++)O[H]=8;for(;256>H;H++)O[H]=9;for(;280>H;H++)O[H]=7;for(;288>H;H++)O[H]=8;b=7;H=new L(O,288,257,A,y,b);if(0!=H.status){alert("HufBuild error: "+H.status);Q=-1;break b}g=H.root;b=H.m;for(H=0;30>H;H++)O[H]=5;ea=5;H=new L(O,30,0,v,r,ea);if(1<H.status){g=
null;alert("HufBuild error: "+H.status);Q=-1;break b}c=H.root;ea=H.m}k=g;p=c;h=b;q=ea;Q=K(Q,W,S)}break;case 2:Q=null!=k?K(G,0+C,z-C):pa(G,0+C,z-C);break;default:Q=-1}if(-1==Q)break a;C+=Q}}s=null;return G}};
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
core.LoopWatchDog=function(l,m){var g=Date.now(),c=0;this.check=function(){var b;if(l&&(b=Date.now(),b-g>l))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<m&&(c+=1,c>m))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){function l(m,g){Array.isArray(g)?m=(m||[]).concat(g.map(function(c){return l({},c)})):"object"===typeof g?(m=m||{},Object.keys(g).forEach(function(c){m[c]=l(m[c],g[c])})):m=g;return m}this.hashString=function(m){var g=0,c,b;c=0;for(b=m.length;c<b;c+=1)g=(g<<5)-g+m.charCodeAt(c),g|=0;return g};this.mergeObjects=l};
// Input 9
core.DomUtils=function(){function l(g,c){g.nodeType===Node.TEXT_NODE&&(0===g.length?g.parentNode.removeChild(g):c.nodeType===Node.TEXT_NODE&&(g.appendData(c.data),c.parentNode.removeChild(c)));return g}function m(g,c){return g===c||Boolean(g.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY)}this.splitBoundaries=function(g){var c=[],b;if(g.startContainer.nodeType===Node.TEXT_NODE||g.endContainer.nodeType===Node.TEXT_NODE){b=g.endContainer;var n=g.endOffset;if(n<b.childNodes.length)for(b=
b.childNodes[n],n=0;b.firstChild;)b=b.firstChild;else for(;b.lastChild;)b=b.lastChild,n=b.nodeType===Node.TEXT_NODE?b.textContent.length:b.childNodes.length;g.setEnd(b,n);0!==g.endOffset&&(g.endContainer.nodeType===Node.TEXT_NODE&&g.endOffset!==g.endContainer.length)&&(c.push(g.endContainer.splitText(g.endOffset)),c.push(g.endContainer));0!==g.startOffset&&(g.startContainer.nodeType===Node.TEXT_NODE&&g.startOffset!==g.startContainer.length)&&(b=g.startContainer.splitText(g.startOffset),c.push(g.startContainer),
c.push(b),g.setStart(b,0))}return c};this.containsRange=function(g,c){return 0>=g.compareBoundaryPoints(g.START_TO_START,c)&&0<=g.compareBoundaryPoints(g.END_TO_END,c)};this.rangesIntersect=function(g,c){return 0>=g.compareBoundaryPoints(g.END_TO_START,c)&&0<=g.compareBoundaryPoints(g.START_TO_END,c)};this.getNodesInRange=function(g,c){var b=[],n,a=g.startContainer.ownerDocument.createTreeWalker(g.commonAncestorContainer,NodeFilter.SHOW_ALL,c,!1);for(n=a.currentNode=g.startContainer;n;){if(c(n)===
NodeFilter.FILTER_ACCEPT)b.push(n);else if(c(n)===NodeFilter.FILTER_REJECT)break;n=n.parentNode}b.reverse();for(n=a.nextNode();n;)b.push(n),n=a.nextNode();return b};this.normalizeTextNodes=function(g){g&&g.nextSibling&&(g=l(g,g.nextSibling));g&&g.previousSibling&&l(g.previousSibling,g)};this.rangeContainsNode=function(g,c){var b=c.ownerDocument.createRange(),n=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;b.setStart(g.startContainer,g.startOffset);b.setEnd(g.endContainer,g.endOffset);n=
0===b.comparePoint(c,0)&&0===b.comparePoint(c,n);b.detach();return n};this.mergeIntoParent=function(g){for(var c=g.parentNode;g.firstChild;)c.insertBefore(g.firstChild,g);c.removeChild(g);return c};this.getElementsByTagNameNS=function(g,c,b){return Array.prototype.slice.call(g.getElementsByTagNameNS(c,b))};this.rangeIntersectsNode=function(g,c){var b=c.nodeType===Node.TEXT_NODE?c.length:c.childNodes.length;return 0>=g.comparePoint(c,0)&&0<=g.comparePoint(c,b)};this.containsNode=function(g,c){return g===
c||g.contains(c)};(function(g){var c=runtime.getWindow();null!==c&&(c=c.navigator.appVersion.toLowerCase(),c=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")))&&(g.containsNode=m)})(this)};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(l,m){function g(a){a.parentNode&&(e.push(a.previousSibling),e.push(a.nextSibling),a.parentNode.removeChild(a))}function c(a,b,d){if(b.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(b),"putCursorIntoTextNode: invalid container");var c=b.parentNode;runtime.assert(Boolean(c),"putCursorIntoTextNode: container without parent");runtime.assert(0<=d&&d<=b.length,"putCursorIntoTextNode: offset is out of bounds");0===d?c.insertBefore(a,b):(d!==b.length&&b.splitText(d),c.insertBefore(a,
b.nextSibling))}else if(b.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(b),"putCursorIntoContainer: invalid container");for(c=b.firstChild;null!==c&&0<d;)c=c.nextSibling,d-=1;b.insertBefore(a,c)}e.push(a.previousSibling);e.push(a.nextSibling)}var b=l.createElementNS("urn:webodf:names:cursor","cursor"),n=l.createElementNS("urn:webodf:names:cursor","anchor"),a,e=[],f,d,t=new core.DomUtils;this.getNode=function(){return b};this.getAnchorNode=function(){return n.parentNode?n:b};this.getSelectedRange=
function(){d?(f.setStartBefore(b),f.collapse(!0)):(f.setStartAfter(a?n:b),f.setEndBefore(a?b:n));return f};this.setSelectedRange=function(k,p){f&&f!==k&&f.detach();f=k;a=!1!==p;(d=k.collapsed)?(g(n),g(b),c(b,k.startContainer,k.startOffset)):(g(n),g(b),c(a?b:n,k.endContainer,k.endOffset),c(a?n:b,k.startContainer,k.startOffset));e.forEach(t.normalizeTextNodes);e.length=0};this.remove=function(){g(b);e.forEach(t.normalizeTextNodes);e.length=0};b.setAttributeNS("urn:webodf:names:cursor","memberId",m);
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
core.EventNotifier=function(l){var m={};this.emit=function(g,c){var b,n;runtime.assert(m.hasOwnProperty(g),'unknown event fired "'+g+'"');n=m[g];for(b=0;b<n.length;b+=1)n[b](c)};this.subscribe=function(g,c){runtime.assert(m.hasOwnProperty(g),'tried to subscribe to unknown event "'+g+'"');m[g].push(c);runtime.log('event "'+g+'" subscribed.')};this.unsubscribe=function(g,c){var b;runtime.assert(m.hasOwnProperty(g),'tried to unsubscribe from unknown event "'+g+'"');b=m[g].indexOf(c);runtime.assert(-1!==
b,'tried to unsubscribe unknown callback from event "'+g+'"');-1!==b&&m[g].splice(b,1);runtime.log('event "'+g+'" unsubscribed.')};(function(){var g;for(g=0;g<l.length;g+=1)m[l[g]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var l=runtime.getWindow().document,m=l.getElementById("testarea");runtime.assert(!m,'Unclean test environment, found a div with id "testarea".');m=l.createElement("div");m.setAttribute("id","testarea");l.body.appendChild(m);return m};
core.UnitTest.cleanupTestAreaDiv=function(){var l=runtime.getWindow().document,m=l.getElementById("testarea");runtime.assert(!!m&&m.parentNode===l.body,'Test environment broken, found no div with id "testarea" below body.');l.body.removeChild(m)};
core.UnitTestRunner=function(){function l(b){a+=1;runtime.log("fail",b)}function m(a,b){var c;try{if(a.length!==b.length)return l("array of length "+a.length+" should be "+b.length+" long"),!1;for(c=0;c<a.length;c+=1)if(a[c]!==b[c])return l(a[c]+" should be "+b[c]+" at array index "+c),!1}catch(k){return!1}return!0}function g(a,b,c){var k=a.attributes,e=k.length,h,q,n;for(h=0;h<e;h+=1)if(q=k.item(h),"xmlns"!==q.prefix){n=b.getAttributeNS(q.namespaceURI,q.localName);if(!b.hasAttributeNS(q.namespaceURI,
q.localName))return l("Attribute "+q.localName+" with value "+q.value+" was not present"),!1;if(n!==q.value)return l("Attribute "+q.localName+" was "+n+" should be "+q.value),!1}return c?!0:g(b,a,!0)}function c(a,b){if(a.nodeType!==b.nodeType)return l(a.nodeType+" should be "+b.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===b.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==b.namespaceURI||a.localName!==b.localName)return l(a.namespaceURI+
" should be "+b.namespaceURI),!1;if(!g(a,b,!1))return!1;for(var e=a.firstChild,k=b.firstChild;e;){if(!k||!c(e,k))return!1;e=e.nextSibling;k=k.nextSibling}return k?!1:!0}function b(a,b){return 0===b?a===b&&1/a===1/b:a===b?!0:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?m(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?c(b,a):e(b,a):!1}function n(a,d,c){"string"===typeof d&&
"string"===typeof c||runtime.log("WARN: shouldBe() expects string arguments");var k,e;try{e=eval(d)}catch(h){k=h}a=eval(c);k?l(d+" should be "+a+". Threw exception "+k):b(e,a)?runtime.log("pass",d+" is "+c):String(typeof e)===String(typeof a)?(c=0===e&&0>1/e?"-0":String(e),l(d+" should be "+a+". Was "+c+".")):l(d+" should be "+a+" (of type "+typeof a+"). Was "+e+" (of type "+typeof e+").")}var a=0,e;e=function(a,d){var c=Object.keys(a),k=Object.keys(d);c.sort();k.sort();return m(c,k)&&Object.keys(a).every(function(k){var h=
a[k],c=d[k];return b(h,c)?!0:(l(h+" should be "+c+" for key "+k),!1)})};this.areNodesEqual=c;this.shouldBeNull=function(a,b){n(a,b,"null")};this.shouldBeNonNull=function(a,b){var c,k;try{k=eval(b)}catch(e){c=e}c?l(b+" should be non-null. Threw exception "+c):null!==k?runtime.log("pass",b+" is non-null."):l(b+" should be non-null. Was "+k)};this.shouldBe=n;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function l(c,b){return"<span style='color:blue;cursor:pointer' onclick='"+b+"'>"+c+"</span>"}var m=0,g={};this.runTests=function(c,b,n){function a(k){if(0===k.length)g[e]=t,m+=f.countFailedTests(),b();else{p=k[0];var c=Runtime.getFunctionName(p);runtime.log("Running "+c);q=f.countFailedTests();d.setUp();p(function(){d.tearDown();t[c]=q===f.countFailedTests();a(k.slice(1))})}}var e=Runtime.getFunctionName(c),f=new core.UnitTestRunner,d=new c(f),t={},k,p,h,q,s="BrowserRuntime"===
runtime.type();if(g.hasOwnProperty(e))runtime.log("Test "+e+" has already run.");else{s?runtime.log("<span>Running "+l(e,'runSuite("'+e+'");')+": "+d.description()+"</span>"):runtime.log("Running "+e+": "+d.description);h=d.tests();for(k=0;k<h.length;k+=1)p=h[k],c=Runtime.getFunctionName(p)||p.testName,n.length&&-1===n.indexOf(c)||(s?runtime.log("<span>Running "+l(c,'runTest("'+e+'","'+c+'")')+"</span>"):runtime.log("Running "+c),q=f.countFailedTests(),d.setUp(),p(),d.tearDown(),t[c]=q===f.countFailedTests());
a(d.asyncTests())}};this.countFailedTests=function(){return m};this.results=function(){return g}};
// Input 13
core.PositionIterator=function(l,m,g,c){function b(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function n(a){this.acceptNode=function(b){return b.nodeType===Node.TEXT_NODE&&0===b.length?NodeFilter.FILTER_REJECT:a.acceptNode(b)}}function a(){var a=f.currentNode.nodeType;d=a===Node.TEXT_NODE?f.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var e=this,f,d,t;this.nextPosition=function(){if(f.currentNode===l)return!1;
if(0===d&&f.currentNode.nodeType===Node.ELEMENT_NODE)null===f.firstChild()&&(d=1);else if(f.currentNode.nodeType===Node.TEXT_NODE&&d+1<f.currentNode.length)d+=1;else if(null!==f.nextSibling())d=0;else if(f.parentNode())d=1;else return!1;return!0};this.previousPosition=function(){var b=!0;if(0===d)if(null===f.previousSibling()){if(!f.parentNode()||f.currentNode===l)return f.firstChild(),!1;d=0}else a();else f.currentNode.nodeType===Node.TEXT_NODE?d-=1:null!==f.lastChild()?a():f.currentNode===l?b=!1:
d=0;return b};this.container=function(){var a=f.currentNode,b=a.nodeType;return 0===d&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=f.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&d===a.length)for(a=a.nextSibling;a&&1!==t(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===d&&(a=null);return a};this.leftNode=function(){var a=f.currentNode;if(0===d)for(a=a.previousSibling;a&&1!==t(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==t(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return f.currentNode};this.domOffset=function(){if(f.currentNode.nodeType===Node.TEXT_NODE)return d;var a=0,b=f.currentNode,c;for(c=1===d?f.lastChild():f.previousSibling();c;)a+=1,c=f.previousSibling();f.currentNode=b;return a};this.unfilteredDomOffset=function(){if(f.currentNode.nodeType===Node.TEXT_NODE)return d;for(var a=0,b=f.currentNode,b=1===d?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=
function(){var a=f.currentNode,b=f.previousSibling();f.currentNode=a;return b};this.getNextSibling=function(){var a=f.currentNode,b=f.nextSibling();f.currentNode=a;return b};this.setUnfilteredPosition=function(a,b){var c;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");f.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return d=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),
b===a.length&&(d=void 0,f.nextSibling()?d=0:f.parentNode()&&(d=1),runtime.assert(void 0!==d,"Error in setPosition: position not valid.")),!0;c=t(a);b<a.childNodes.length&&c!==NodeFilter.FILTER_REJECT?(f.currentNode=a.childNodes[b],c=t(f.currentNode),d=0):d=0===b?0:1;c===NodeFilter.FILTER_REJECT&&(d=1);if(c!==NodeFilter.FILTER_ACCEPT)return e.nextPosition();runtime.assert(t(f.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
return!0};this.moveToEnd=function(){f.currentNode=l;d=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?e.setUnfilteredPosition(a,a.length):(f.currentNode=a,d=1)};this.getNodeFilter=function(){return t};t=(g?new n(g):new b).acceptNode;t.acceptNode=t;f=l.ownerDocument.createTreeWalker(l,m||4294967295,t,c);d=0;null===f.firstChild()&&(d=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(l){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var l={},m=core.PositionFilter.FilterResult.FILTER_ACCEPT,g=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(c){for(var b in l)if(l.hasOwnProperty(b)&&l[b].acceptPosition(c)===g)return g;return m};this.addFilter=function(c,b){l[c]=b};this.removeFilter=function(c){delete l[c]}};
// Input 16
core.Async=function(){this.forEach=function(l,m,g){function c(b){a!==n&&(b?(a=n,g(b)):(a+=1,a===n&&g(null)))}var b,n=l.length,a=0;for(b=0;b<n;b+=1)m(l[b],c)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(l,m){function g(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],d,c,h=a.length,k=0,k=0;d=-1;for(c=0;c<h;c+=1)k=(d^a[c])&255,k=b[k],d=d>>>8^k;return d^-1}function c(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function b(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function n(a,b){var d,h,k,e,f,g,n,p=this;this.load=function(b){if(void 0!==p.data)b(null,p.data);else{var d=f+34+h+k+256;d+n>q&&(d=q-n);runtime.read(a,n,d,function(d,c){if(d||null===c)b(d,c);else a:{var h=c,k=new core.ByteArray(h),r=k.readUInt32LE(),q;if(67324752!==r)b("File entry signature is wrong."+r.toString()+" "+h.length.toString(),null);else{k.pos+=22;r=k.readUInt16LE();q=k.readUInt16LE();k.pos+=r+q;
if(e){h=h.slice(k.pos,k.pos+f);if(f!==h.length){b("The amount of compressed bytes read was "+h.length.toString()+" instead of "+f.toString()+" for "+p.filename+" in "+a+".",null);break a}h=w(h,g)}else h=h.slice(k.pos,k.pos+g);g!==h.length?b("The amount of bytes read was "+h.length.toString()+" instead of "+g.toString()+" for "+p.filename+" in "+a+".",null):(p.data=h,b(null,h))}}})}};this.set=function(a,b,d,c){p.filename=a;p.data=b;p.compressed=d;p.date=c};this.error=null;b&&(d=b.readUInt32LE(),33639248!==
d?this.error="Central directory entry has wrong signature at position "+(b.pos-4).toString()+' for file "'+a+'": '+b.data.length.toString():(b.pos+=6,e=b.readUInt16LE(),this.date=c(b.readUInt32LE()),b.readUInt32LE(),f=b.readUInt32LE(),g=b.readUInt32LE(),h=b.readUInt16LE(),k=b.readUInt16LE(),d=b.readUInt16LE(),b.pos+=8,n=b.readUInt32LE(),this.filename=runtime.byteArrayToString(b.data.slice(b.pos,b.pos+h),"utf8"),b.pos+=h+k+d))}function a(a,b){if(22!==a.length)b("Central directory length should be 22.",
u);else{var d=new core.ByteArray(a),c;c=d.readUInt32LE();101010256!==c?b("Central directory signature is wrong: "+c.toString(),u):(c=d.readUInt16LE(),0!==c?b("Zip files with non-zero disk numbers are not supported.",u):(c=d.readUInt16LE(),0!==c?b("Zip files with non-zero disk numbers are not supported.",u):(c=d.readUInt16LE(),s=d.readUInt16LE(),c!==s?b("Number of entries is inconsistent.",u):(c=d.readUInt32LE(),d=d.readUInt16LE(),d=q-22-c,runtime.read(l,d,q-d,function(a,d){if(a||null===d)b(a,u);else a:{var c=
new core.ByteArray(d),k,e;h=[];for(k=0;k<s;k+=1){e=new n(l,c);if(e.error){b(e.error,u);break a}h[h.length]=e}b(null,u)}})))))}}function e(a,b){var d=null,c,k;for(k=0;k<h.length;k+=1)if(c=h[k],c.filename===a){d=c;break}d?d.data?b(null,d.data):d.load(b):b(a+" not found.",null)}function f(a){var d=new core.ByteArrayWriter("utf8"),c=0;d.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(c=a.data.length);d.appendUInt32LE(b(a.date));d.appendUInt32LE(g(a.data));d.appendUInt32LE(c);d.appendUInt32LE(c);d.appendUInt16LE(a.filename.length);
d.appendUInt16LE(0);d.appendString(a.filename);a.data&&d.appendByteArray(a.data);return d}function d(a,d){var c=new core.ByteArrayWriter("utf8"),h=0;c.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(h=a.data.length);c.appendUInt32LE(b(a.date));c.appendUInt32LE(g(a.data));c.appendUInt32LE(h);c.appendUInt32LE(h);c.appendUInt16LE(a.filename.length);c.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);c.appendUInt32LE(d);c.appendString(a.filename);return c}function t(a,b){if(a===h.length)b(null);else{var d=h[a];
void 0!==d.data?t(a+1,b):d.load(function(d){d?b(d):t(a+1,b)})}}function k(a,b){t(0,function(c){if(c)b(c);else{c=new core.ByteArrayWriter("utf8");var k,e,g,q=[0];for(k=0;k<h.length;k+=1)c.appendByteArrayWriter(f(h[k])),q.push(c.getLength());g=c.getLength();for(k=0;k<h.length;k+=1)e=h[k],c.appendByteArrayWriter(d(e,q[k]));k=c.getLength()-g;c.appendArray([80,75,5,6,0,0,0,0]);c.appendUInt16LE(h.length);c.appendUInt16LE(h.length);c.appendUInt32LE(k);c.appendUInt32LE(g);c.appendArray([0,0]);a(c.getByteArray())}})}
function p(a,b){k(function(d){runtime.writeFile(a,d,b)},b)}var h,q,s,w=(new core.RawInflate).inflate,u=this,A=new core.Base64;this.load=e;this.save=function(a,b,d,c){var k,e;for(k=0;k<h.length;k+=1)if(e=h[k],e.filename===a){e.set(a,b,d,c);return}e=new n(l);e.set(a,b,d,c);h.push(e)};this.write=function(a){p(l,a)};this.writeAs=p;this.createByteArray=k;this.loadContentXmlAsFragments=function(a,b){u.loadAsString(a,function(a,d){if(a)return b.rootElementReady(a);b.rootElementReady(null,d,!0)})};this.loadAsString=
function(a,b){e(a,function(a,d){if(a||null===d)return b(a,null);var c=runtime.byteArrayToString(d,"utf8");b(null,c)})};this.loadAsDOM=function(a,b){u.loadAsString(a,function(a,d){if(a||null===d)b(a,null);else{var c=(new DOMParser).parseFromString(d,"text/xml");b(null,c)}})};this.loadAsDataURL=function(a,b,d){e(a,function(a,c){if(a)return d(a,null);var h=0,k;b||(b=80===c[1]&&78===c[2]&&71===c[3]?"image/png":255===c[0]&&216===c[1]&&255===c[2]?"image/jpeg":71===c[0]&&73===c[1]&&70===c[2]?"image/gif":
"");for(k="data:"+b+";base64,";h<c.length;)k+=A.convertUTF8ArrayToBase64(c.slice(h,Math.min(h+45E3,c.length))),h+=45E3;d(null,k)})};this.getEntries=function(){return h.slice()};q=-1;null===m?h=[]:runtime.getFileSize(l,function(b){q=b;0>q?m("File '"+l+"' cannot be read.",u):runtime.read(l,q-22,22,function(b,d){b||null===m||null===d?m(b,u):a(d,m)})})};
// Input 18
core.CSSUnits=function(){var l={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(m,g,c){return m*l[c]/l[g]};this.convertMeasure=function(m,g){var c,b;m&&g?(c=parseFloat(m),b=m.replace(c.toString(),""),c=this.convert(c,b,g)):c="";return c.toString()};this.getUnits=function(m){return m.substr(m.length-2,m.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(l){var m=function(){};m.prototype=l;return new m});
xmldom.LSSerializer=function(){function l(b){var c=b||{},a=function(a){var b={},d;for(d in a)a.hasOwnProperty(d)&&(b[a[d]]=d);return b}(b),e=[c],f=[a],d=0;this.push=function(){d+=1;c=e[d]=Object.create(c);a=f[d]=Object.create(a)};this.pop=function(){e[d]=void 0;f[d]=void 0;d-=1;c=e[d];a=f[d]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(b){var d=b.namespaceURI,e=0,h;if(!d)return b.localName;if(h=a[d])return h+":"+b.localName;do{h||!b.prefix?(h="ns"+e,e+=1):h=b.prefix;
if(c[h]===d)break;if(!c[h]){c[h]=d;a[d]=h;break}h=null}while(null===h);return h+":"+b.localName}}function m(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function g(b,n){var a="",e=c.filter?c.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,f;if(e===NodeFilter.FILTER_ACCEPT&&n.nodeType===Node.ELEMENT_NODE){b.push();f=b.getQName(n);var d,l=n.attributes,k,p,h,q="",s;d="<"+f;k=l.length;for(p=0;p<k;p+=1)h=l.item(p),"http://www.w3.org/2000/xmlns/"!==
h.namespaceURI&&(s=c.filter?c.filter.acceptNode(h):NodeFilter.FILTER_ACCEPT,s===NodeFilter.FILTER_ACCEPT&&(s=b.getQName(h),h="string"===typeof h.value?m(h.value):h.value,q+=" "+(s+'="'+h+'"')));k=b.getLocalNamespaceDefinitions();for(p in k)k.hasOwnProperty(p)&&((l=k[p])?"xmlns"!==l&&(d+=" xmlns:"+k[p]+'="'+p+'"'):d+=' xmlns="'+p+'"');a+=d+(q+">")}if(e===NodeFilter.FILTER_ACCEPT||e===NodeFilter.FILTER_SKIP){for(e=n.firstChild;e;)a+=g(b,e),e=e.nextSibling;n.nodeValue&&(a+=m(n.nodeValue))}f&&(a+="</"+
f+">",b.pop());return a}var c=this;this.filter=null;this.writeToString=function(b,c){if(!b)return"";var a=new l(c);return g(a,b)}};
// Input 21
xmldom.RelaxNGParser=function(){function l(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function m(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return m({name:a.name,e:[b].concat(a.e.slice(2))})}function g(a){a=a.split(":",2);var b="",c;1===a.length?a=["",a[0]]:b=a[0];for(c in e)e[c]===b&&(a[0]=c);return a}function c(a,b){for(var k=0,e,h,f=a.name;a.e&&k<a.e.length;)if(e=
a.e[k],"ref"===e.name){h=b[e.a.name];if(!h)throw e.a.name+" was not defined.";e=a.e.slice(k+1);a.e=a.e.slice(0,k);a.e=a.e.concat(h.e);a.e=a.e.concat(e)}else k+=1,c(e,b);e=a.e;"choice"!==f||e&&e[1]&&"empty"!==e[1].name||(e&&e[0]&&"empty"!==e[0].name?(e[1]=e[0],e[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===f||"interleave"===f)"empty"===e[0].name?"empty"===e[1].name?(delete a.e,a.name="empty"):(f=a.name=e[1].name,a.names=e[1].names,e=a.e=e[1].e):"empty"===e[1].name&&(f=a.name=e[0].name,
a.names=e[0].names,e=a.e=e[0].e);"oneOrMore"===f&&"empty"===e[0].name&&(delete a.e,a.name="empty");if("attribute"===f){h=a.names?a.names.length:0;for(var n,m=[],l=[],k=0;k<h;k+=1)n=g(a.names[k]),l[k]=n[0],m[k]=n[1];a.localnames=m;a.namespaces=l}"interleave"===f&&("interleave"===e[0].name?a.e="interleave"===e[1].name?e[0].e.concat(e[1].e):[e[1]].concat(e[0].e):"interleave"===e[1].name&&(a.e=[e[0]].concat(e[1].e)))}function b(a,c){for(var e=0,f;a.e&&e<a.e.length;)f=a.e[e],"elementref"===f.name?(f.id=
f.id||0,a.e[e]=c[f.id]):"element"!==f.name&&b(f,c),e+=1}var n=this,a,e={"http://www.w3.org/XML/1998/namespace":"xml"},f;f=function(a,b,c){var n=[],h,q,s=a.localName,l=[];h=a.attributes;var u=s,A=l,y={},v,r;for(v=0;v<h.length;v+=1)if(r=h.item(v),r.namespaceURI)"http://www.w3.org/2000/xmlns/"===r.namespaceURI&&(e[r.value]=r.localName);else{"name"!==r.localName||"element"!==u&&"attribute"!==u||A.push(r.value);if("name"===r.localName||"combine"===r.localName||"type"===r.localName){var z=r,G;G=r.value;
G=G.replace(/^\s\s*/,"");for(var C=/\s/,L=G.length-1;C.test(G.charAt(L));)L-=1;G=G.slice(0,L+1);z.value=G}y[r.localName]=r.value}h=y;h.combine=h.combine||void 0;a=a.firstChild;u=n;A=l;for(y="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(v=f(a,b,u))"name"===v.name?A.push(e[v.a.ns]+":"+v.text):"choice"===v.name&&(v.names&&v.names.length)&&(A=A.concat(v.names),delete v.names),u.push(v)}else a.nodeType===Node.TEXT_NODE&&(y+=a.nodeValue);a=a.nextSibling}a=
y;"value"!==s&&"param"!==s&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===s&&void 0===h.type&&(h.type="token",h.datatypeLibrary="");"attribute"!==s&&"element"!==s||void 0===h.name||(q=g(h.name),n=[{name:"name",text:q[1],a:{ns:q[0]}}].concat(n),delete h.name);"name"===s||"nsName"===s||"value"===s?void 0===h.ns&&(h.ns=""):delete h.ns;"name"===s&&(q=g(a),h.ns=q[0],a=q[1]);1<n.length&&("define"===s||"oneOrMore"===s||"zeroOrMore"===s||"optional"===s||"list"===s||"mixed"===s)&&(n=[{name:"group",e:m({name:"group",
e:n}).e}]);2<n.length&&"element"===s&&(n=[n[0]].concat({name:"group",e:m({name:"group",e:n.slice(1)}).e}));1===n.length&&"attribute"===s&&n.push({name:"text",text:a});1!==n.length||"choice"!==s&&"group"!==s&&"interleave"!==s?2<n.length&&("choice"===s||"group"===s||"interleave"===s)&&(n=m({name:s,e:n}).e):(s=n[0].name,l=n[0].names,h=n[0].a,a=n[0].text,n=n[0].e);"mixed"===s&&(s="interleave",n=[n[0],{name:"text"}]);"optional"===s&&(s="choice",n=[n[0],{name:"empty"}]);"zeroOrMore"===s&&(s="choice",n=
[{name:"oneOrMore",e:[n[0]]},{name:"empty"}]);if("define"===s&&h.combine){a:{u=h.combine;A=h.name;y=n;for(v=0;c&&v<c.length;v+=1)if(r=c[v],"define"===r.name&&r.a&&r.a.name===A){r.e=[{name:u,e:r.e.concat(y)}];c=r;break a}c=null}if(c)return}c={name:s};n&&0<n.length&&(c.e=n);for(q in h)if(h.hasOwnProperty(q)){c.a=h;break}void 0!==a&&(c.text=a);l&&0<l.length&&(c.names=l);"element"===s&&(c.id=b.length,b.push(c),c={name:"elementref",id:c.id});return c};this.parseRelaxNGDOM=function(d,g){var k=[],m=f(d&&
d.documentElement,k,void 0),h,q,s={};for(h=0;h<m.e.length;h+=1)q=m.e[h],"define"===q.name?s[q.a.name]=q:"start"===q.name&&(a=q);if(!a)return[new l("No Relax NG start element was found.")];c(a,s);for(h in s)s.hasOwnProperty(h)&&c(s[h],s);for(h=0;h<k.length;h+=1)c(k[h],s);g&&(n.rootPattern=g(a.e[0],k));b(a,k);for(h=0;h<k.length;h+=1)b(k[h],k);n.start=a;n.elements=k;n.nsmap=e;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function l(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function m(a,b){return function(){var c={},d=0;return function(h){var e=h.hash||h.toString(),k;k=c[e];if(void 0!==k)return k;c[e]=k=b(h);k.hash=a+d.toString();d+=1;return k}}()}function g(a){return function(){var b={};return function(c){var d,h;h=b[c.localName];if(void 0===h)b[c.localName]=h={};else if(d=h[c.namespaceURI],void 0!==d)return d;return h[c.namespaceURI]=d=a(c)}}()}function c(a,
b,c){return function(){var d={},h=0;return function(e,k){var f=b&&b(e,k),g,r;if(void 0!==f)return f;f=e.hash||e.toString();g=k.hash||k.toString();r=d[f];if(void 0===r)d[f]=r={};else if(f=r[g],void 0!==f)return f;r[g]=f=c(e,k);f.hash=a+h.toString();h+=1;return f}}()}function b(a,c){"choice"===c.p1.type?b(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?b(a,c.p2):a[c.p2.hash]=c.p2}function n(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return v},startTagOpenDeriv:function(c){return a.contains(c)?
h(b,r):v},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return r}}}function e(a,b,c,h){if(b===v)return v;if(h>=c.length)return b;0===h&&(h=0);for(var k=c.item(h);k.namespaceURI===d;){h+=1;if(h>=c.length)return b;k=c.item(h)}return k=e(a,b.attDeriv(a,c.item(h)),c,h+1)}function f(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):f(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
f(a,b,c.e[1])}var d="http://www.w3.org/2000/xmlns/",t,k,p,h,q,s,w,u,A,y,v={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return v},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return v},endTagDeriv:function(){return v}},r={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return v},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return r},endTagDeriv:function(){return v}},
z={type:"text",nullable:!0,hash:"text",textDeriv:function(){return z},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return z},endTagDeriv:function(){return v}},G,C,L;t=c("choice",function(a,b){if(a===v)return b;if(b===v||a===b)return a},function(a,c){var d={},h;b(d,{p1:a,p2:c});c=a=void 0;for(h in d)d.hasOwnProperty(h)&&(void 0===a?a=d[h]:c=void 0===c?d[h]:t(c,d[h]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,d){return t(a.textDeriv(c,d),b.textDeriv(c,d))},startTagOpenDeriv:g(function(c){return t(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,d){return t(a.attDeriv(c,d),b.attDeriv(c,d))},startTagCloseDeriv:l(function(){return t(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:l(function(){return t(a.endTagDeriv(),b.endTagDeriv())})}}(a,c)});k=function(a,b,c){return function(){var d={},h=0;return function(e,k){var f=b&&b(e,k),g,r;if(void 0!==f)return f;
f=e.hash||e.toString();g=k.hash||k.toString();f<g&&(r=f,f=g,g=r,r=e,e=k,k=r);r=d[f];if(void 0===r)d[f]=r={};else if(f=r[g],void 0!==f)return f;r[g]=f=c(e,k);f.hash=a+h.toString();h+=1;return f}}()}("interleave",function(a,b){if(a===v||b===v)return v;if(a===r)return b;if(b===r)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){return t(k(a.textDeriv(c,d),b),k(a,b.textDeriv(c,d)))},startTagOpenDeriv:g(function(c){return t(G(function(a){return k(a,
b)},a.startTagOpenDeriv(c)),G(function(b){return k(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,d){return t(k(a.attDeriv(c,d),b),k(a,b.attDeriv(c,d)))},startTagCloseDeriv:l(function(){return k(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});p=c("group",function(a,b){if(a===v||b===v)return v;if(a===r)return b;if(b===r)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){var h=p(a.textDeriv(c,d),b);return a.nullable?t(h,b.textDeriv(c,
d)):h},startTagOpenDeriv:function(c){var d=G(function(a){return p(a,b)},a.startTagOpenDeriv(c));return a.nullable?t(d,b.startTagOpenDeriv(c)):d},attDeriv:function(c,d){return t(p(a.attDeriv(c,d),b),p(a,b.attDeriv(c,d)))},startTagCloseDeriv:l(function(){return p(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});h=c("after",function(a,b){if(a===v||b===v)return v},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,d){return h(a.textDeriv(c,d),b)},startTagOpenDeriv:g(function(c){return G(function(a){return h(a,
b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,d){return h(a.attDeriv(c,d),b)},startTagCloseDeriv:l(function(){return h(a.startTagCloseDeriv(),b)}),endTagDeriv:l(function(){return a.nullable?b:v})}});q=m("oneormore",function(a){return a===v?v:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return p(a.textDeriv(b,c),t(this,r))},startTagOpenDeriv:function(b){var c=this;return G(function(a){return p(a,t(c,r))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return p(a.attDeriv(b,
c),t(this,r))},startTagCloseDeriv:l(function(){return q(a.startTagCloseDeriv())})}});w=c("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,d){return a.contains(d)&&(b.nullable&&/^\s+$/.test(d.nodeValue)||b.textDeriv(c,d.nodeValue).nullable)?r:v},startTagCloseDeriv:function(){return v}}});s=m("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?r:v},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}});
A=m("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return r},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}});G=function M(a,b){return"after"===b.type?h(b.p1,a(b.p2)):"choice"===b.type?t(M(a,b.p1),M(a,b.p2)):b};C=function(a,b,c){var d=c.currentNode;b=b.startTagOpenDeriv(d);b=e(a,b,d.attributes,0);var h=b=b.startTagCloseDeriv(),d=c.currentNode;b=c.firstChild();for(var k=[],f;b;)b.nodeType===Node.ELEMENT_NODE?k.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||k.push(b.nodeValue),b=c.nextSibling();0===k.length&&(k=[""]);f=h;for(h=0;f!==v&&h<k.length;h+=1)b=k[h],"string"===typeof b?f=/^\s*$/.test(b)?t(f,f.textDeriv(a,b)):f.textDeriv(a,b):(c.currentNode=b,f=C(a,f,c));c.currentNode=d;return b=f.endTagDeriv()};u=function(a){var b,c,d;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];f(b,c,a);a="";for(d=0;d<b.length;d+=
1)a+="{"+c[d]+"}"+b[d]+",";a={hash:a,contains:function(a){var d;for(d=0;d<b.length;d+=1)if(b[d]===a.localName&&c[d]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};y=function F(b,c){var d,h;if("elementref"===b.name){d=b.id||0;b=c[d];if(void 0!==b.name){var e=b;d=c[e.id]={hash:"element"+e.id.toString()};e=n(u(e.e[0]),y(e.e[1],c));for(h in e)e.hasOwnProperty(h)&&(d[h]=e[h]);return d}return b}switch(b.name){case "empty":return r;case "notAllowed":return v;
case "text":return z;case "choice":return t(F(b.e[0],c),F(b.e[1],c));case "interleave":d=F(b.e[0],c);for(h=1;h<b.e.length;h+=1)d=k(d,F(b.e[h],c));return d;case "group":return p(F(b.e[0],c),F(b.e[1],c));case "oneOrMore":return q(F(b.e[0],c));case "attribute":return w(u(b.e[0]),F(b.e[1],c));case "value":return s(b.text);case "data":return d=b.a&&b.a.type,void 0===d&&(d=""),A(d);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var c={},d;for(d in b)b.hasOwnProperty(d)&&
(c[d]=b[d]);return d=y(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=C(null,L,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){L=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function l(a,b){this.message=function(){b&&(a+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function m(a,c,f,d){return"empty"===a.name?null:b(a,c,f,d)}function g(a,b){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var c=b.currentNode,d=c?c.nodeType:0,g=null;d>Node.ELEMENT_NODE;){if(d!==Node.COMMENT_NODE&&(d!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new l("Not allowed node of type "+
d+".")];d=(c=b.nextSibling())?c.nodeType:0}if(!c)return[new l("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(n[c.namespaceURI]+":"+c.localName))return[new l("Found "+c.nodeName+" instead of "+a.names+".",c)];if(b.firstChild()){for(g=m(a.e[1],b,c);b.nextSibling();)if(d=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||d===Node.COMMENT_NODE))return[new l("Spurious content.",b.currentNode)];if(b.parentNode()!==c)return[new l("Implementation error.")]}else g=
m(a.e[1],b,c);b.nextSibling();return g}var c,b,n;b=function(a,c,f,d){var n=a.name,k=null;if("text"===n)a:{for(var p=(a=c.currentNode)?a.nodeType:0;a!==f&&3!==p;){if(1===p){k=[new l("Element not allowed here.",a)];break a}p=(a=c.nextSibling())?a.nodeType:0}c.nextSibling();k=null}else if("data"===n)k=null;else if("value"===n)d!==a.text&&(k=[new l("Wrong value, should be '"+a.text+"', not '"+d+"'",f)]);else if("list"===n)k=null;else if("attribute"===n)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;n=a.localnames.length;for(k=0;k<n;k+=1){d=f.getAttributeNS(a.namespaces[k],a.localnames[k]);""!==d||f.hasAttributeNS(a.namespaces[k],a.localnames[k])||(d=void 0);if(void 0!==p&&void 0!==d){k=[new l("Attribute defined too often.",f)];break a}p=d}k=void 0===p?[new l("Attribute not found: "+a.names,f)]:m(a.e[1],c,f,p)}else if("element"===n)k=g(a,c);else if("oneOrMore"===n){d=0;do p=c.currentNode,n=b(a.e[0],c,f),d+=1;while(!n&&p!==c.currentNode);1<d?(c.currentNode=p,k=null):k=n}else if("choice"===
n){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;p=c.currentNode;if("empty"===a.e[0].name){if(n=b(a.e[1],c,f,d))c.currentNode=p;k=null}else{if(n=m(a.e[0],c,f,d))c.currentNode=p,n=b(a.e[1],c,f,d);k=n}}else if("group"===n){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;k=b(a.e[0],c,f)||b(a.e[1],c,f)}else if("interleave"===n)a:{p=a.e.length;d=[p];for(var h=p,q,s,w,u;0<h;){q=0;s=c.currentNode;for(k=0;k<p;k+=1)w=c.currentNode,!0!==d[k]&&d[k]!==w&&(u=a.e[k],(n=
b(u,c,f))?(c.currentNode=w,void 0===d[k]&&(d[k]=!1)):w===c.currentNode||"oneOrMore"===u.name||"choice"===u.name&&("oneOrMore"===u.e[0].name||"oneOrMore"===u.e[1].name)?(q+=1,d[k]=w):(q+=1,d[k]=!0));if(s===c.currentNode&&q===h){k=null;break a}if(0===q){for(k=0;k<p;k+=1)if(!1===d[k]){k=[new l("Interleave does not match.",f)];break a}k=null;break a}for(k=h=0;k<p;k+=1)!0!==d[k]&&(h+=1)}k=null}else throw n+" not allowed in nonEmptyPattern.";return k};this.validate=function(a,b){a.currentNode=a.root;var f=
m(c.e[0],a,a.root);b(f)};this.init=function(a,b){c=a;n=b}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function l(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function m(a){for(var b=[],c=0,d=a.length,e;c<d;){var f=a,g=d,n=b,m="",v=[],r=f.indexOf("[",c),z=f.indexOf("/",c),G=f.indexOf("=",c);l(z,r,G)?(m=f.substring(c,z),c=z+1):l(r,z,G)?(m=f.substring(c,r),c=t(f,r,v)):l(G,z,r)?(m=f.substring(c,G),c=G):(m=f.substring(c,g),c=g);n.push({location:m,predicates:v});if(c<d&&"="===a[c]){e=a.substring(c+1,d);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);else try{e=
parseInt(e,10)}catch(C){}c=d}}return{steps:b,value:e}}function g(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function c(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function b(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function n(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function a(a,b,c){b=b.split(":",2);var d=c(b[0]),e=b[1];return new n(a,function(a){return a.localName===e&&a.namespaceURI===d})}function e(a,b,c){var e=new g,f=d(e,b,c),m=b.value;return void 0===m?new n(a,function(a){e.setNode(a);
f.reset();return f.next()}):new n(a,function(a){e.setNode(a);f.reset();return(a=f.next())&&a.nodeValue===m})}function f(a,b,c){var e=a.ownerDocument,f=[],n=null;if(e&&e.evaluate)for(c=e.evaluate(b,a,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),n=c.iterateNext();null!==n;)n.nodeType===Node.ELEMENT_NODE&&f.push(n),n=c.iterateNext();else{f=new g;f.setNode(a);a=m(b);f=d(f,a,c);a=[];for(c=f.next();c;)a.push(c),c=f.next();f=a}return f}var d,t;t=function(a,b,c){for(var d=b,e=a.length,f=0;d<e;)"]"===
a[d]?(f-=1,0>=f&&c.push(m(a.substring(b,d)))):"["===a[d]&&(0>=f&&(b=d+1),f+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};d=function(d,f,h){var g,n,m,l;for(g=0;g<f.steps.length;g+=1)for(m=f.steps[g],n=m.location,""===n?d=new b(d,!1):"@"===n[0]?(l=n.slice(1).split(":",2),d=new c(d,h(l[0]),l[1])):"."!==n&&(d=new b(d,!1),-1!==n.indexOf(":")&&(d=a(d,n,h))),n=0;n<m.predicates.length;n+=1)l=m.predicates[n],d=e(d,l,h);return d};xmldom.XPath=
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
gui.AnnotationViewManager=function(l,m,g){function c(a){var b=a.node,c=a.end;a=f.createRange();c&&(a.setStart(b,b.childNodes.length),a.setEnd(c,0),c=d.getTextNodes(a,!1),c.forEach(function(a){var c=f.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function b(a){var b=l.getSizer();a?(g.style.display="inline-block",b.style.paddingRight=t.getComputedStyle(g).width):
(g.style.display="none",b.style.paddingRight=0);l.refreshSize()}function n(){e.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function a(){var a;for(a=0;a<e.length;a+=1){var b=e[a],c=b.node.parentNode,d=c.nextSibling,n=d.nextSibling,m=c.parentNode,u=0,A=e[e.indexOf(b)-1],y=void 0,b=b.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],u=void 0,u=l.getZoomLevel();c.style.left=(g.getBoundingClientRect().left-m.getBoundingClientRect().left)/
u+"px";c.style.width=g.getBoundingClientRect().width/u+"px";d.style.width=parseFloat(c.style.left)-30+"px";A&&(y=A.node.parentNode.getBoundingClientRect(),20>=(m.getBoundingClientRect().top-y.bottom)/u?c.style.top=Math.abs(m.getBoundingClientRect().top-y.bottom)/u+20+"px":c.style.top="0px");n.style.left=d.getBoundingClientRect().width/u+"px";var d=n.style,m=n.getBoundingClientRect().left/u,A=n.getBoundingClientRect().top/u,y=c.getBoundingClientRect().left/u,v=c.getBoundingClientRect().top/u,r=0,z=
0,r=y-m,r=r*r,z=v-A,z=z*z,m=Math.sqrt(r+z);d.width=m+"px";u=Math.asin((c.getBoundingClientRect().top-n.getBoundingClientRect().top)/(u*parseFloat(n.style.width)));n.style.transform="rotate("+u+"rad)";n.style.MozTransform="rotate("+u+"rad)";n.style.WebkitTransform="rotate("+u+"rad)";n.style.msTransform="rotate("+u+"rad)";b&&(u=t.getComputedStyle(b,":before").content)&&"none"!==u&&(u=u.substring(1,u.length-1),b.firstChild?b.firstChild.nodeValue=u:b.appendChild(f.createTextNode(u)))}}var e=[],f=m.ownerDocument,
d=new odf.OdfUtils,t=runtime.getWindow();runtime.assert(Boolean(t),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=a;this.addAnnotation=function(d){b(!0);e.push({node:d.node,end:d.end});n();var g=f.createElement("div"),h=f.createElement("div"),q=f.createElement("div"),m=f.createElement("div"),l=f.createElement("div"),u=d.node;g.className="annotationWrapper";u.parentNode.insertBefore(g,u);h.className="annotationNote";h.appendChild(u);l.className=
"annotationRemoveButton";h.appendChild(l);q.className="annotationConnector horizontal";m.className="annotationConnector angular";g.appendChild(h);g.appendChild(q);g.appendChild(m);d.end&&c(d);a()};this.forgetAnnotations=function(){for(;e.length;){var a=e[0],c=e.indexOf(a),d=a.node,g=d.parentNode.parentNode;"div"===g.localName&&(g.parentNode.insertBefore(d,g),g.parentNode.removeChild(g));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=f.querySelectorAll('span.annotationHighlight[annotation="'+
a+'"]');g=d=void 0;for(d=0;d<a.length;d+=1){for(g=a[d];g.firstChild;)g.parentNode.insertBefore(g.firstChild,g);g.parentNode.removeChild(g)}-1!==c&&e.splice(c,1);0===e.length&&b(!1)}}};
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
dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",dc:"http://purl.org/dc/elements/1.1/",webodf:"urn:webodf"},g;l.lookupNamespaceURI=l;g=function(){};g.forEachPrefix=function(c){for(var b in m)m.hasOwnProperty(b)&&c(b,m[b])};g.resolvePrefix=l;g.namespaceMap=m;g.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";g.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
g.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";g.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";g.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";g.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";g.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";g.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";g.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";g.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
g.xlinkns="http://www.w3.org/1999/xlink";g.xmlns="http://www.w3.org/XML/1998/namespace";g.dcns="http://purl.org/dc/elements/1.1/";g.webodfns="urn:webodf";return g}();
// Input 28
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function l(a,b){for(var c=p[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,h,c=0;c<e;c+=1)(h=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,b+h);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,l(d,b)),c=c.nextSibling}function m(a,b){for(var c=p[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,h,c=0;c<e;c+=1)if(h=a.getAttributeNS(d[c].ns,d[c].localname))h=h.replace(b,""),a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,
h);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,m(d,b)),c=c.nextSibling}function g(a,b){var c=p[a.localName],d=(c=c&&c[a.namespaceURI])?c.length:0,e,h,f;for(f=0;f<d;f+=1)if(e=a.getAttributeNS(c[f].ns,c[f].localname))b=b||{},h=c[f].keyname,h=b[h]=b[h]||{},h[e]=1;return b}function c(a,b){var d,e;g(a,b);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(e=d,c(e,b)),d=d.nextSibling}function b(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function n(a,c,d){var e=a+'"'+
c,h=d[e];h||(h=d[e]=new b(e,a,c));return h}function a(b,c,e){var h=p[b.localName],f=(h=h&&h[b.namespaceURI])?h.length:0,k=b.getAttributeNS(d,"name"),g=b.getAttributeNS(d,"family"),r;k&&g&&(c=n(k,g,e));if(c)for(k=0;k<f;k+=1)if(g=b.getAttributeNS(h[k].ns,h[k].localname))r=h[k].keyname,g=n(g,r,e),c.requires[g.key]=g;for(k=b.firstChild;k;)k.nodeType===Node.ELEMENT_NODE&&(b=k,a(b,c,e)),k=k.nextSibling;return e}function e(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){e(a.requires[c],
b)})}function f(b,c){var d=a(b,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&e(a,c)})}var d="urn:oasis:names:tc:opendocument:xmlns:style:1.0",t={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
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
a:"page-layout-name"}]},p,h=new xmldom.XPath;this.UsedStyleList=function(a,b){var e={};this.uses=function(a){var b=a.localName,c=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(d,"name");a="style"===b?a.getAttributeNS(d,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":b;return(a=e[a])?0<a[c]:!1};c(a,e);b&&f(b,e)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),e=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,
"family");return h.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,c){var e;if(a){for(e=a.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE){var h=e,f=b,k=h.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),g=void 0;k?g="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(k=h.getAttributeNS(d,"name"))&&(g=d);g&&h.setAttributeNS(g,t[g]+"name",f+k)}e=e.nextSibling}l(a,b);c&&l(c,
b)}};this.removePrefixFromStyleNames=function(a,b,c){var e=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var h=b,f=e,k=h.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),g=void 0;k?g="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(k=h.getAttributeNS(d,"name"))&&(g=d);g&&(k=k.replace(f,""),h.setAttributeNS(g,t[g]+"name",k))}b=b.nextSibling}m(a,e);c&&m(c,e)}};this.determineStylesForNode=g;p=function(a){var b,c,d,e,h,f={},k;for(b in a)if(a.hasOwnProperty(b))for(e=
a[b],d=e.length,c=0;c<d;c+=1)h=e[c],k=f[h.en]=f[h.en]||{},k=k[h.ens]=k[h.ens]||[],k.push({ns:h.ans,localname:h.a,keyname:b});return f}(k)};
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
odf.OdfUtils=function(){function l(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===u}function m(a){for(;a&&!l(a);)a=a.parentNode;return a}function g(a){return/^[ \t\r\n]+$/.test(a)}function c(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===u||"span"===b&&"annotationHighlight"===a.className?!0:!1}function b(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===u?d="s"===b||"tab"===b||"line-break"===b:c===A&&(d="frame"===b&&"as-char"===a.getAttributeNS(u,
"anchor-type")));return d}function n(a){for(;null!==a.firstChild&&c(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&c(a);)a=a.lastChild;return a}function e(b){for(;!l(b)&&null===b.previousSibling;)b=b.parentNode;return l(b)?null:a(b.previousSibling)}function f(a){for(;!l(a)&&null===a.nextSibling;)a=a.parentNode;return l(a)?null:n(a.nextSibling)}function d(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=e(a);else return!g(a.data.substr(a.length-1,1));else b(a)?
(c=!0,a=null):a=e(a);return c}function t(a){var c=!1;for(a=a&&n(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!g(a.data)){c=!0;break}if(b(a)){c=!0;break}a=f(a)}return c}function k(a,b){return g(a.data.substr(b))?!t(f(a)):!1}function p(a,c){var h=a.data,f;if(!g(h[c])||b(a.parentNode))return!1;0<c?g(h[c-1])||(f=!0):d(e(a))&&(f=!0);return!0===f?k(a,c)?!1:!0:!1}function h(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function q(a){return(a=h(a))&&(0>a.value||"%"===a.unit)?null:a}function s(a){return(a=h(a))&&"%"!==a.unit?null:a}function w(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}
var u="urn:oasis:names:tc:opendocument:xmlns:text:1.0",A="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",y=/^\s*$/,v=new core.DomUtils;this.isParagraph=l;this.getParagraphElement=m;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===u&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===u};this.isODFWhitespace=g;this.isGroupingElement=c;this.isCharacterElement=b;this.firstChild=
n;this.lastChild=a;this.previousNode=e;this.nextNode=f;this.scanLeftForNonWhitespace=d;this.lookLeftForCharacter=function(a){var c;c=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(c=a.data,c=g(c.substr(c.length-1,1))?1===c.length?d(e(a))?2:0:g(c.substr(c.length-2,1))?0:2:1):b(a)&&(c=1);return c};this.lookRightForCharacter=function(a){var c=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?c=!g(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(c){var d=!1;for(c=c&&a(c);c;){if(c.nodeType===
Node.TEXT_NODE&&0<c.length&&!g(c.data)){d=!0;break}if(b(c)){d=!0;break}c=e(c)}return d};this.scanRightForAnyCharacter=t;this.isTrailingWhitespace=k;this.isSignificantWhitespace=p;this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&y.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=h;this.parseNonNegativeLength=q;this.parseFoFontSize=function(a){var b;b=(b=h(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||s(a)};this.parseFoLineHeight=function(a){return q(a)||
s(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,c=[];for(b.nodeType===Node.ELEMENT_NODE&&(c=v.getElementsByTagNameNS(b,u,"p").concat(v.getElementsByTagNameNS(b,u,"h")));b&&!l(b);)b=b.parentNode;b&&c.push(b);return c.filter(function(b){return v.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),d;d=v.getNodesInRange(a,function(d){c.selectNodeContents(d);if(d.nodeType===Node.TEXT_NODE){if(b&&v.rangesIntersect(a,
c)||v.containsRange(a,c))return Boolean(m(d)&&(!g(d.textContent)||p(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(v.rangesIntersect(a,c)&&w(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return d};this.getTextElements=function(a,d){var e=a.startContainer.ownerDocument.createRange(),h;h=v.getNodesInRange(a,function(h){var f=h.nodeType;e.selectNodeContents(h);if(f===Node.TEXT_NODE){if(v.containsRange(a,e)&&(d||Boolean(m(h)&&(!g(h.textContent)||p(h,0)))))return NodeFilter.FILTER_ACCEPT}else if(b(h)){if(v.containsRange(a,
e))return NodeFilter.FILTER_ACCEPT}else if(w(h)||c(h))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});e.detach();return h};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),d;d=v.getNodesInRange(a,function(d){b.selectNodeContents(d);if(l(d)){if(v.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(w(d)||c(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});b.detach();return d}};
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
odf.TextSerializer=function(){function l(c){var b="",n=m.filter?m.filter.acceptNode(c):NodeFilter.FILTER_ACCEPT,a=c.nodeType,e;if(n===NodeFilter.FILTER_ACCEPT||n===NodeFilter.FILTER_SKIP)for(e=c.firstChild;e;)b+=l(e),e=e.nextSibling;n===NodeFilter.FILTER_ACCEPT&&(a===Node.ELEMENT_NODE&&g.isParagraph(c)?b+="\n":a===Node.TEXT_NODE&&c.textContent&&(b+=c.textContent));return b}var m=this,g=new odf.OdfUtils;this.filter=null;this.writeToString=function(c){return c?l(c):""}};
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
odf.TextStyleApplicator=function(l,m,g){function c(a){function b(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(d){return b(a[d],c[d])}):a===c}this.isStyleApplied=function(c){c=m.getAppliedStylesForElement(c);return b(a,c)}}function b(b){var c={};this.applyStyleToContainer=function(k){var n;n=k.getAttributeNS(a,"style-name");var h=k.ownerDocument;n=n||"";if(!c.hasOwnProperty(n)){var q=n,s;s=n?m.createDerivedStyleObject(n,"text",b):b;h=h.createElementNS(e,"style:style");
m.updateStyle(h,s);h.setAttributeNS(e,"style:name",l.generateName());h.setAttributeNS(e,"style:family","text");h.setAttributeNS(f,"scope","document-content");g.appendChild(h);c[q]=h}n=c[n].getAttributeNS(e,"name");k.setAttributeNS(a,"text:style-name",n)}}var n=new core.DomUtils,a=odf.Namespaces.textns,e=odf.Namespaces.stylens,f="urn:webodf:names:scope";this.applyStyle=function(d,e,f){var g={},h,m,l,w;runtime.assert(f&&f["style:text-properties"],"applyStyle without any text properties");g["style:text-properties"]=
f["style:text-properties"];l=new b(g);w=new c(g);d.forEach(function(b){h=w.isStyleApplied(b);if(!1===h){var c=b.ownerDocument,d=b.parentNode,f,k=b,g=new core.LoopWatchDog(1E3);"span"===d.localName&&d.namespaceURI===a?(b.previousSibling&&!n.rangeContainsNode(e,b.previousSibling)?(c=d.cloneNode(!1),d.parentNode.insertBefore(c,d.nextSibling)):c=d,f=!0):(c=c.createElementNS(a,"text:span"),d.insertBefore(c,b),f=!1);for(;k&&(k===b||n.rangeContainsNode(e,k));)g.check(),d=k.nextSibling,k.parentNode!==c&&
c.appendChild(k),k=d;if(k&&f)for(b=c.cloneNode(!1),c.parentNode.insertBefore(b,c.nextSibling);k;)g.check(),d=k.nextSibling,b.appendChild(k),k=d;m=c;l.applyStyleToContainer(m)}})}};
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
odf.Style2CSS=function(){function l(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==q||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===u&&"list-style"===a.localName?"list":a.namespaceURI!==q||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(q,"family"))(c=a.getAttributeNS&&a.getAttributeNS(q,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function m(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=m(a[c].derivedStyles,b)))return d;return null}function g(a,b,c){var d=b[a],e,h;d&&(e=d.getAttributeNS(q,"parent-style-name"),h=null,e&&(h=m(c,e),!h&&b[e]&&(g(e,b,c),h=b[e],b[e]=null)),h?(h.derivedStyles||(h.derivedStyles={}),h.derivedStyles[a]=d):c[a]=d)}function c(a,b){for(var c in a)a.hasOwnProperty(c)&&(g(c,a,b),a[c]=null)}function b(a,b){var c=v[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+r[a].join(d+","+c+"|")+d}function n(a,c,d){var e=[],h,f;e.push(b(a,c));for(h in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(h))for(f in c=n(a,h,d.derivedStyles[h]),c)c.hasOwnProperty(f)&&e.push(c[f]);return e}function a(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function e(a,b){var c="",d,e;for(d in b)if(b.hasOwnProperty(d)&&
(d=b[d],e=a.getAttributeNS(d[0],d[1]))){e=e.trim();if(N.hasOwnProperty(d[1])){var h=e.indexOf(" "),f=void 0,k=void 0;-1!==h?(f=e.substring(0,h),k=e.substring(h)):(f=e,k="");(f=Z.parseLength(f))&&("pt"===f.unit&&0.75>f.value)&&(e="0.75pt"+k)}d[2]&&(c+=d[2]+":"+e+";")}return c}function f(b){return(b=a(b,q,"text-properties"))?Z.parseFoFontSize(b.getAttributeNS(h,"font-size")):null}function d(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?
{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function t(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var e=c.getAttributeNS(u,"level"),h;c=Z.getFirstNonWhitespaceChild(c);c=Z.getFirstNonWhitespaceChild(c);var f;c&&(h=c.attributes,f=h["fo:text-indent"]?h["fo:text-indent"].value:void 0,h=h["fo:margin-left"]?h["fo:margin-left"].value:void 0);f||(f="-0.6cm");c="-"===f.charAt(0)?f.substring(1):"-"+f;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";
void 0!==h&&(h=e+"{margin-left:"+h+";}",a.insertRule(h,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+d+";";d+="counter-increment:list;";d+="margin-left:"+f+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(k){throw k;}}function k(b,c,g,m){if("list"===c)for(var l=m.firstChild,r,s;l;){if(l.namespaceURI===u)if(r=l,"list-level-style-number"===l.localName){var v=r;s=v.getAttributeNS(q,"num-format");var N=v.getAttributeNS(q,
"num-suffix"),E={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},v=v.getAttributeNS(q,"num-prefix")||"",v=E.hasOwnProperty(s)?v+(" counter(list, "+E[s]+")"):s?v+("'"+s+"';"):v+" ''";N&&(v+=" '"+N+"'");s="content: "+v+";";t(b,g,r,s)}else"list-level-style-image"===l.localName?(s="content: none;",t(b,g,r,s)):"list-level-style-bullet"===l.localName&&(s="content: '"+r.getAttributeNS(u,"bullet-char")+"';",t(b,g,r,s));l=l.nextSibling}else if("page"===c)if(N=r=g="",l=m.getElementsByTagNameNS(q,
"page-layout-properties")[0],r=l.parentNode.parentNode.parentNode.masterStyles,N="",g+=e(l,ea),s=l.getElementsByTagNameNS(q,"background-image"),0<s.length&&(N=s.item(0).getAttributeNS(A,"href"))&&(g+="background-image: url('odfkit:"+N+"');",s=s.item(0),g+=e(s,G)),"presentation"===$){if(r)for(s=r.getElementsByTagNameNS(q,"master-page"),E=0;E<s.length;E+=1)if(s[E].getAttributeNS(q,"page-layout-name")===l.parentNode.getAttributeNS(q,"name")){N=s[E].getAttributeNS(q,"name");r="draw|page[draw|master-page-name="+
N+"] {"+g+"}";N="office|body, draw|page[draw|master-page-name="+N+"] {"+e(l,pa)+" }";try{b.insertRule(r,b.cssRules.length),b.insertRule(N,b.cssRules.length)}catch(ma){throw ma;}}}else{if("text"===$){r="office|text {"+g+"}";N="office|body {width: "+l.getAttributeNS(h,"page-width")+";}";try{b.insertRule(r,b.cssRules.length),b.insertRule(N,b.cssRules.length)}catch(ka){throw ka;}}}else{g=n(c,g,m).join(",");l="";if(r=a(m,q,"text-properties")){var E=r,U;s=U="";N=1;r=""+e(E,z);v=E.getAttributeNS(q,"text-underline-style");
"solid"===v&&(U+=" underline");v=E.getAttributeNS(q,"text-line-through-style");"solid"===v&&(U+=" line-through");U.length&&(r+="text-decoration:"+U+";");if(U=E.getAttributeNS(q,"font-name")||E.getAttributeNS(h,"font-family"))v=qa[U],r+="font-family: "+(v||U)+", sans-serif;";v=E.parentNode;if(E=f(v)){for(;v;){if(E=f(v)){if("%"!==E.unit){s="font-size: "+E.value*N+E.unit+";";break}N*=E.value/100}E=v;U=v="";v=null;"default-style"===E.localName?v=null:(v=E.getAttributeNS(q,"parent-style-name"),U=E.getAttributeNS(q,
"family"),v=S.getODFElementsWithXPath(Q,v?"//style:*[@style:name='"+v+"'][@style:family='"+U+"']":"//style:default-style[@style:family='"+U+"']",odf.Namespaces.resolvePrefix)[0])}s||(s="font-size: "+parseFloat(W)*N+O.getUnits(W)+";");r+=s}l+=r}if(r=a(m,q,"paragraph-properties"))s=r,r=""+e(s,C),N=s.getElementsByTagNameNS(q,"background-image"),0<N.length&&(E=N.item(0).getAttributeNS(A,"href"))&&(r+="background-image: url('odfkit:"+E+"');",N=N.item(0),r+=e(N,G)),(s=s.getAttributeNS(h,"line-height"))&&
"normal"!==s&&(s=Z.parseFoLineHeight(s),r="%"!==s.unit?r+("line-height: "+s.value+s.unit+";"):r+("line-height: "+s.value/100+";")),l+=r;if(r=a(m,q,"graphic-properties"))E=r,r=""+e(E,L),s=E.getAttributeNS(p,"opacity"),N=E.getAttributeNS(p,"fill"),E=E.getAttributeNS(p,"fill-color"),"solid"===N||"hatch"===N?E&&"none"!==E?(s=isNaN(parseFloat(s))?1:parseFloat(s)/100,(E=d(E))&&(r+="background-color: rgba("+E.r+","+E.g+","+E.b+","+s+");")):r+="background: none;":"none"===N&&(r+="background: none;"),l+=r;
if(r=a(m,q,"drawing-page-properties"))s=""+e(r,L),"true"===r.getAttributeNS(y,"background-visible")&&(s+="background: none;"),l+=s;if(r=a(m,q,"table-cell-properties"))r=""+e(r,B),l+=r;if(r=a(m,q,"table-row-properties"))r=""+e(r,F),l+=r;if(r=a(m,q,"table-column-properties"))r=""+e(r,M),l+=r;if(r=a(m,q,"table-properties"))s=r,r=""+e(s,K),s=s.getAttributeNS(w,"border-model"),"collapsing"===s?r+="border-collapse:collapse;":"separating"===s&&(r+="border-collapse:separate;"),l+=r;if(0!==l.length)try{b.insertRule(g+
"{"+l+"}",b.cssRules.length)}catch(na){throw na;}}for(var X in m.derivedStyles)m.derivedStyles.hasOwnProperty(X)&&k(b,c,X,m.derivedStyles[X])}var p=odf.Namespaces.drawns,h=odf.Namespaces.fons,q=odf.Namespaces.stylens,s=odf.Namespaces.svgns,w=odf.Namespaces.tablens,u=odf.Namespaces.textns,A=odf.Namespaces.xlinkns,y=odf.Namespaces.presentationns,v={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},r={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},z=[[h,"color","color"],[h,"background-color","background-color"],[h,"font-weight","font-weight"],[h,"font-style","font-style"]],G=[[q,"repeat",
"background-repeat"]],C=[[h,"background-color","background-color"],[h,"text-align","text-align"],[h,"text-indent","text-indent"],[h,"padding","padding"],[h,"padding-left","padding-left"],[h,"padding-right","padding-right"],[h,"padding-top","padding-top"],[h,"padding-bottom","padding-bottom"],[h,"border-left","border-left"],[h,"border-right","border-right"],[h,"border-top","border-top"],[h,"border-bottom","border-bottom"],[h,"margin","margin"],[h,"margin-left","margin-left"],[h,"margin-right","margin-right"],
[h,"margin-top","margin-top"],[h,"margin-bottom","margin-bottom"],[h,"border","border"]],L=[[h,"background-color","background-color"],[h,"min-height","min-height"],[p,"stroke","border"],[s,"stroke-color","border-color"],[s,"stroke-width","border-width"],[h,"border","border"],[h,"border-left","border-left"],[h,"border-right","border-right"],[h,"border-top","border-top"],[h,"border-bottom","border-bottom"]],B=[[h,"background-color","background-color"],[h,"border-left","border-left"],[h,"border-right",
"border-right"],[h,"border-top","border-top"],[h,"border-bottom","border-bottom"],[h,"border","border"]],M=[[q,"column-width","width"]],F=[[q,"row-height","height"],[h,"keep-together",null]],K=[[q,"width","width"],[h,"margin-left","margin-left"],[h,"margin-right","margin-right"],[h,"margin-top","margin-top"],[h,"margin-bottom","margin-bottom"]],ea=[[h,"background-color","background-color"],[h,"padding","padding"],[h,"padding-left","padding-left"],[h,"padding-right","padding-right"],[h,"padding-top",
"padding-top"],[h,"padding-bottom","padding-bottom"],[h,"border","border"],[h,"border-left","border-left"],[h,"border-right","border-right"],[h,"border-top","border-top"],[h,"border-bottom","border-bottom"],[h,"margin","margin"],[h,"margin-left","margin-left"],[h,"margin-right","margin-right"],[h,"margin-top","margin-top"],[h,"margin-bottom","margin-bottom"]],pa=[[h,"page-width","width"],[h,"page-height","height"]],N={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},qa={},Z=new odf.OdfUtils,$,Q,W,S=new xmldom.XPath,O=new core.CSSUnits;this.style2css=function(a,b,d,e,h){for(var f,g,n,m;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);f=null;e&&(f=e.ownerDocument,Q=e.parentNode);h&&(f=h.ownerDocument,Q=h.parentNode);if(f)for(m in odf.Namespaces.forEachPrefix(function(a,c){n="@namespace "+a+" url("+c+");";try{b.insertRule(n,b.cssRules.length)}catch(d){}}),qa=d,$=a,W=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",a=l(e),e=l(h),h={},v)if(v.hasOwnProperty(m))for(g in d=h[m]={},c(a[m],d),c(e[m],d),d)d.hasOwnProperty(g)&&k(b,m,g,d[g])}};
// Input 33
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function l(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function m(a){var b,c=k.length;for(b=0;b<c;b+=1)if(a.namespaceURI===f&&a.localName===k[b])return b;return-1}function g(a,b){var c=new e.UsedStyleList(a,b),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var e=d.acceptNode(a);e===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&(e=c.uses(a)?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT);return e}}function c(a,b){var c=new g(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function b(a,b){if(b){var c=m(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=m(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}function n(a){this.OdfContainer=a}function a(a,
b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var e=new odf.StyleInfo,f="urn:oasis:names:tc:opendocument:xmlns:office:1.0",d="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
t="urn:webodf:names:scope",k="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),p=(new Date).getTime()+"_webodf_",h=new core.Base64;n.prototype=new function(){};n.prototype.constructor=n;n.namespaceURI=f;n.localName="document";a.prototype.load=function(){};a.prototype.getUrl=function(){return this.data?"data:;base64,"+h.toBase64(this.data):null};odf.OdfContainer=function s(h,k){function m(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?
m(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function y(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS(t,"scope",b),c=c.nextSibling}function v(a,b){var c=null,d,e,h;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(h=d.getAttributeNS(t,"scope"))&&h!==b&&c.removeChild(d),d=e;return c}function r(a){var b=I.rootElement.ownerDocument,c;if(a){m(a.documentElement);try{c=b.importNode(a.documentElement,
!0)}catch(d){}}return c}function z(a){I.state=a;if(I.onchange)I.onchange(I);if(I.onstatereadychange)I.onstatereadychange(I)}function G(a){ba=null;I.rootElement=a;a.fontFaceDecls=l(a,f,"font-face-decls");a.styles=l(a,f,"styles");a.automaticStyles=l(a,f,"automatic-styles");a.masterStyles=l(a,f,"master-styles");a.body=l(a,f,"body");a.meta=l(a,f,"meta")}function C(a){a=r(a);var c=I.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===f?(c.fontFaceDecls=l(a,f,"font-face-decls"),b(c,c.fontFaceDecls),
c.styles=l(a,f,"styles"),b(c,c.styles),c.automaticStyles=l(a,f,"automatic-styles"),y(c.automaticStyles,"document-styles"),b(c,c.automaticStyles),c.masterStyles=l(a,f,"master-styles"),b(c,c.masterStyles),e.prefixStyleNames(c.automaticStyles,p,c.masterStyles)):z(s.INVALID)}function L(a){a=r(a);var c,d,e;if(a&&"document-content"===a.localName&&a.namespaceURI===f){c=I.rootElement;d=l(a,f,"font-face-decls");if(c.fontFaceDecls&&d)for(e=d.firstChild;e;)c.fontFaceDecls.appendChild(e),e=d.firstChild;else d&&
(c.fontFaceDecls=d,b(c,d));d=l(a,f,"automatic-styles");y(d,"document-content");if(c.automaticStyles&&d)for(e=d.firstChild;e;)c.automaticStyles.appendChild(e),e=d.firstChild;else d&&(c.automaticStyles=d,b(c,d));c.body=l(a,f,"body");b(c,c.body)}else z(s.INVALID)}function B(a){a=r(a);var c;a&&("document-meta"===a.localName&&a.namespaceURI===f)&&(c=I.rootElement,c.meta=l(a,f,"meta"),b(c,c.meta))}function M(a){a=r(a);var c;a&&("document-settings"===a.localName&&a.namespaceURI===f)&&(c=I.rootElement,c.settings=
l(a,f,"settings"),b(c,c.settings))}function F(a){a=r(a);var b;if(a&&"manifest"===a.localName&&a.namespaceURI===d)for(b=I.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===d)&&(R[a.getAttributeNS(d,"full-path")]=a.getAttributeNS(d,"media-type")),a=a.nextSibling}function K(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],J.loadAsDOM(c,function(b,c){d(c);b||I.state===s.INVALID||K(a)})):z(s.DONE)}function ea(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function pa(){var a=new xmldom.LSSerializer,b=ea("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(I.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function N(a,b){var c=document.createElementNS(d,"manifest:file-entry");c.setAttributeNS(d,"manifest:full-path",a);c.setAttributeNS(d,"manifest:media-type",b);return c}function qa(){var a=
runtime.parseXML('<manifest:manifest xmlns:manifest="'+d+'"></manifest:manifest>'),b=l(a,d,"manifest"),c=new xmldom.LSSerializer,e;for(e in R)R.hasOwnProperty(e)&&b.appendChild(N(e,R[e]));c.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+c.writeToString(a,odf.Namespaces.namespaceMap)}function Z(){var a=new xmldom.LSSerializer,b=ea("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(I.rootElement.settings,odf.Namespaces.namespaceMap);
return b+"</office:document-settings>"}function $(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=v(I.rootElement.automaticStyles,"document-styles"),d=I.rootElement.masterStyles&&I.rootElement.masterStyles.cloneNode(!0),h=ea("document-styles");e.removePrefixFromStyleNames(c,p,d);b.filter=new g(d,c);h+=b.writeToString(I.rootElement.fontFaceDecls,a);h+=b.writeToString(I.rootElement.styles,a);h+=b.writeToString(c,a);h+=b.writeToString(d,a);return h+"</office:document-styles>"}function Q(){var a=
odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,d=v(I.rootElement.automaticStyles,"document-content"),e=ea("document-content");b.filter=new c(I.rootElement.body,d);e+=b.writeToString(d,a);e+=b.writeToString(I.rootElement.body,a);return e+"</office:document-content>"}function W(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var d=r(c);d&&"document"===d.localName&&d.namespaceURI===f?(G(d),z(s.DONE)):z(s.INVALID)}})}function S(){function a(b,c){var e;c||(c=b);e=document.createElementNS(f,
c);d[b]=e;d.appendChild(e)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),d=I.rootElement,e=document.createElementNS(f,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");d.body.appendChild(e);z(s.DONE);return b}function O(){var a,b=new Date;a=runtime.byteArrayFromString(Z(),"utf8");
J.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(pa(),"utf8");J.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString($(),"utf8");J.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(Q(),"utf8");J.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(qa(),"utf8");J.save("META-INF/manifest.xml",a,!0,b)}function H(a,b){O();J.writeAs(a,function(a){b(a)})}var I=this,J,R={},ba;this.onstatereadychange=k;this.rootElement=this.state=this.onchange=null;this.setRootElement=G;this.getContentElement=
function(){var a;ba||(a=I.rootElement.body,ba=a.getElementsByTagNameNS(f,"text")[0]||a.getElementsByTagNameNS(f,"presentation")[0]||a.getElementsByTagNameNS(f,"spreadsheet")[0]);return ba};this.getDocumentType=function(){var a=I.getContentElement();return a&&a.localName};this.getPart=function(b){return new a(b,R[b],I,J)};this.getPartData=function(a,b){J.load(a,b)};this.createByteArray=function(a,b){O();J.createByteArray(a,b)};this.saveAs=H;this.save=function(a){H(h,a)};this.getUrl=function(){return h};
this.state=s.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(n);J=h?new core.Zip(h,function(a,b){J=b;a?W(h,function(b){a&&(J.error=a+"\n"+b,z(s.INVALID))}):K([["styles.xml",C],["content.xml",L],["meta.xml",B],["settings.xml",M],["META-INF/manifest.xml",F]])}):S()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=
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
odf.FontLoader=function(){function l(c,b,n,a,e){var f,d=0,m;for(m in c)if(c.hasOwnProperty(m)){if(d===n){f=m;break}d+=1}f?b.getPartData(c[f].href,function(d,m){if(d)runtime.log(d);else{var h="@font-face { font-family: '"+(c[f].family||f)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+g.convertUTF8ArrayToBase64(m)+') format("truetype"); }';try{a.insertRule(h,a.cssRules.length)}catch(q){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(q)+"\nRule: "+h)}}l(c,b,n+1,a,e)}):
e&&e()}var m=new xmldom.XPath,g=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(c,b){for(var g=c.rootElement.fontFaceDecls;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);if(g){var a={},e,f,d,t;if(g)for(g=m.getODFElementsWithXPath(g,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),e=0;e<g.length;e+=1)f=g[e],d=f.getAttributeNS(odf.Namespaces.stylens,"name"),t=f.getAttributeNS(odf.Namespaces.svgns,"font-family"),f=m.getODFElementsWithXPath(f,"svg:font-face-src/svg:font-face-uri",
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
odf.StyleNameGenerator=function(l,m){var g={};this.generateName=function(){var c,b={},n=0;m.getAllStyleNames().forEach(function(a){b[a]=!0});do c=l+n,n+=1;while(g[c]||b[c]);g[c]=!0;return c}};
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
odf.Formatting=function(){function l(){for(var a=d.rootElement.fontFaceDecls,b={},c,e,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(c=a.getAttributeNS(p,"name"))&&((e=a.getAttributeNS(k,"font-family"))||a.getElementsByTagNameNS(k,"font-face-uri")[0])&&(b[c]=e),a=a.nextSibling;return b}function m(a){for(var b=d.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===p&&"default-style"===b.localName&&b.getAttributeNS(p,"family")===a)return b;b=b.nextSibling}return null}
function g(a,b,c){var e,f;c=c||[d.rootElement.automaticStyles,d.rootElement.styles];for(e=c.shift();e;){for(e=e.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&(f=e.getAttributeNS(p,"name"),e.namespaceURI===p&&"style"===e.localName&&e.getAttributeNS(p,"family")===b&&f===a||"list-style"===b&&e.namespaceURI===h&&"list-style"===e.localName&&f===a||"data"===b&&e.namespaceURI===q&&f===a))return e;e=e.nextSibling}e=c.shift()}return null}function c(a){for(var b,c={},d=a.firstChild;d;){if(d.nodeType===
Node.ELEMENT_NODE&&d.namespaceURI===p)for(c[d.nodeName]={},b=0;b<d.attributes.length;b+=1)c[d.nodeName][d.attributes[b].name]=d.attributes[b].value;d=d.nextSibling}for(b=0;b<a.attributes.length;b+=1)c[a.attributes[b].name]=a.attributes[b].value;return c}function b(a,c){Object.keys(c).forEach(function(d){var e=d.split(":"),h=e[1],f=odf.Namespaces.resolvePrefix(e[0]),e=c[d];"object"===typeof e&&Object.keys(e).length?(d=a.getElementsByTagNameNS(f,h)[0]||a.ownerDocument.createElementNS(f,d),a.appendChild(d),
b(d,e)):f&&a.setAttributeNS(f,d,e)})}function n(a,b){for(var e=d.rootElement.styles,h,f={},k=a.getAttributeNS(p,"family"),n=a;n;)h=c(n),f=w.mergeObjects(h,f),n=(h=n.getAttributeNS(p,"parent-style-name"))?g(h,k,[e]):null;if(n=m(k))h=c(n),f=w.mergeObjects(h,f);b&&(h=(e=u[k])?w.mergeObjects({},e):null)&&(f=w.mergeObjects(h,f));return f}function a(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],h="",f=!1;c;)!f&&s.isGroupingElement(c)&&(f=!0),(d=t.determineStylesForNode(c))&&e.push(d),
c=c.parentNode;f&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){h+="|"+b+":"+a+"|"})})}),b&&(b[h]=e));return f?e:void 0}function e(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var d=Object.keys(a[c])[0],e,h;(e=g(d,c))?(h=n(e),b=w.mergeObjects(h,b),h=e.getAttributeNS(p,"display-name")):runtime.log("No style element found for '"+d+"' of family '"+c+"'");b.orderedStyles.push({name:d,family:c,displayName:h})})});
return b}var f=this,d,t=new odf.StyleInfo,k=odf.Namespaces.svgns,p=odf.Namespaces.stylens,h=odf.Namespaces.textns,q=odf.Namespaces.numberns,s=new odf.OdfUtils,w=new core.Utils,u={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.setOdfContainer=function(a){d=a};this.getFontMap=l;this.getAvailableParagraphStyles=function(){for(var a=d.rootElement.styles&&d.rootElement.styles.firstChild,b,c,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===p)&&(c=
a,b=c.getAttributeNS(p,"family"),"paragraph"===b&&(b=c.getAttributeNS(p,"name"),c=c.getAttributeNS(p,"display-name")||b,b&&c&&e.push({name:b,displayName:c}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var b;b=t.hasDerivedStyles(d.rootElement,odf.Namespaces.resolvePrefix,a);a=(new t.UsedStyleList(d.rootElement.styles)).uses(a)||(new t.UsedStyleList(d.rootElement.automaticStyles)).uses(a)||(new t.UsedStyleList(d.rootElement.body)).uses(a);return b||a};this.getDefaultStyleElement=m;this.getStyleElement=
g;this.getStyleAttributes=c;this.getInheritedStyleAttributes=n;this.getFirstNamedParentStyleNameOrSelf=function(a){var b=d.rootElement.automaticStyles,c=d.rootElement.styles,e;for(e=g(a,"paragraph",[b]);e;)a=e.getAttributeNS(p,"parent-style-name"),e=g(a,"paragraph",[b]);return(e=g(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(g(a,"paragraph"))};this.getAppliedStyles=function(b){var c={},d=[];b.forEach(function(b){a(b,c)});Object.keys(c).forEach(function(a){d.push(e(c[a]))});
return d};this.getAppliedStylesForElement=function(b){return(b=a(b))?e(b):void 0};this.applyStyle=function(a,b,c,e){(new odf.TextStyleApplicator(new odf.StyleNameGenerator("auto"+w.hashString(a)+"_",f),f,d.rootElement.automaticStyles)).applyStyle(b,c,e)};this.getAllStyleNames=function(){var a,b=[];[d.rootElement.automaticStyles,d.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===p&&"style"===a.localName||a.namespaceURI===h&&"list-style"===
a.localName)&&b.push(a.getAttributeNS(p,"name")),a=a.nextSibling});return b};this.updateStyle=function(a,c){var e,h;b(a,c);(e=c["style:text-properties"]&&c["style:text-properties"]["style:font-name"])&&!l().hasOwnProperty(e)&&(h=a.ownerDocument.createElementNS(p,"style:font-face"),h.setAttributeNS(p,"style:name",e),h.setAttributeNS(k,"svg:font-family",e),d.rootElement.fontFaceDecls.appendChild(h))};this.createDerivedStyleObject=function(a,b,e){var h=g(a,b);runtime.assert(Boolean(h),"No style element found for '"+
a+"' of family '"+b+"'");a=h.parentNode===d.rootElement.automaticStyles?c(h):{"style:parent-style-name":a};a["style:family"]=b;w.mergeObjects(a,e);return a};this.getDefaultTabStopDistance=function(){var a=m("paragraph");(a=(a=a&&a.getAttributeNS(p,"paragraph-properties"))&&a.getAttributeNS(p,"tab-stop-distance"))||(a="1.25cm");return s.parseNonNegativeLength(a)}};
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
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function g(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function c(a,b,c){var d=
"on"+b;a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent(d,c):a[d]===c&&(a[d]=null)}function b(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}function d(){var c=[],f=runtime.getWindow().getSelection(),k,g;for(k=0;k<f.rangeCount;k+=1)g=f.getRangeAt(k),null!==g&&(b(a,g.startContainer)&&b(a,g.endContainer))&&c.push(g);if(c.length===e.length){for(f=0;f<c.length&&(k=c[f],g=e[f],k=k===g?!1:null===k||null===g?!0:k.startContainer!==g.startContainer||k.startOffset!==
g.startOffset||k.endContainer!==g.endContainer||k.endOffset!==g.endOffset,!k);f+=1);if(f===c.length)return}e=c;var f=[c.length],n,m=a.ownerDocument;for(k=0;k<c.length;k+=1)g=c[k],n=m.createRange(),n.setStart(g.startContainer,g.startOffset),n.setEnd(g.endContainer,g.endOffset),f[k]=n;e=f;f=h.length;for(c=0;c<f;c+=1)h[c](a,e)}var e=[],h=[];this.addListener=function(a,b){var c,d=h.length;for(c=0;c<d;c+=1)if(h[c]===b)return;h.push(b)};this.destroy=function(b){c(a,"mouseup",d);c(a,"keyup",d);c(a,"keydown",
d);b()};g(a,"mouseup",d);g(a,"keyup",d);g(a,"keydown",d)}function n(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function a(b,c,d,e){d.setAttribute("styleid",c);var h,f=d.getAttributeNS(r,"anchor-type"),k=d.getAttributeNS(y,"x"),g=d.getAttributeNS(y,"y"),n=d.getAttributeNS(y,"width"),m=d.getAttributeNS(y,"height"),l=d.getAttributeNS(w,"min-height"),q=d.getAttributeNS(w,"min-width"),p=d.getAttributeNS(s,"master-page-name"),
u=null,t,v;t=0;var L,z=b.rootElement.ownerDocument;if(p){u=b.rootElement.masterStyles.getElementsByTagNameNS(A,"master-page");t=null;for(v=0;v<u.length;v+=1)if(u[v].getAttributeNS(A,"name")===p){t=u[v];break}u=t}else u=null;if(u){p=z.createElementNS(s,"draw:page");L=u.firstElementChild;for(t=0;L;)"true"!==L.getAttributeNS(C,"placeholder")&&(v=L.cloneNode(!0),p.appendChild(v),a(b,c+"_"+t,v,e)),L=L.nextElementSibling,t+=1;K.appendChild(p);t=K.getElementsByTagNameNS(s,"page").length;if(v=p.getElementsByTagNameNS(r,
"page-number")[0]){for(;v.firstChild;)v.removeChild(v.firstChild);v.appendChild(z.createTextNode(t))}a(b,c,p,e);p.setAttributeNS(s,"draw:master-page-name",u.getAttributeNS(A,"name"))}if("as-char"===f)h="display: inline-block;";else if(f||k||g)h="position: absolute;";else if(n||m||l||q)h="display: block;";k&&(h+="left: "+k+";");g&&(h+="top: "+g+";");n&&(h+="width: "+n+";");m&&(h+="height: "+m+";");l&&(h+="min-height: "+l+";");q&&(h+="min-width: "+q+";");h&&(h="draw|"+d.localName+'[styleid="'+c+'"] {'+
h+"}",e.insertRule(h,e.cssRules.length))}function e(a){for(a=a.firstChild;a;){if(a.namespaceURI===u&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function f(a,b,c,d){function h(b){b&&(b='draw|image[styleid="'+a+'"] {'+("background-image: url("+b+");")+"}",d.insertRule(b,d.cssRules.length))}c.setAttribute("styleid",a);var f=c.getAttributeNS(z,"href"),k;if(f)try{k=b.getPart(f),k.onchange=function(a){h(a.url)},k.load()}catch(g){runtime.log("slight problem: "+
g)}else f=e(c),h(f)}function d(a){function b(c){var d,e;c.hasAttributeNS(z,"href")&&(d=c.getAttributeNS(z,"href"),"#"===d[0]?(d=d.substring(1),e=function(){var b=B.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=B.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);return!1}):e=function(){L.open(d)},c.onclick=e)}var c,d,e;d=a.getElementsByTagNameNS(r,
"a");for(c=0;c<d.length;c+=1)e=d.item(c),b(e)}function t(a){var b=a.ownerDocument;F.getElementsByTagNameNS(a,r,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(r,"c"),10);if(1<d)for(a.removeAttributeNS(r,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function k(a){F.getElementsByTagNameNS(a,r,"tab").forEach(function(a){a.textContent="\t"})}function p(a,b){function c(a,e){var f=k.documentElement.namespaceURI;
"video/"===e.substr(0,6)?(d=k.createElementNS(f,"video"),d.setAttribute("controls","controls"),h=k.createElementNS(f,"source"),h.setAttribute("src",a),h.setAttribute("type",e),d.appendChild(h),b.parentNode.appendChild(d)):b.innerHtml="Unrecognised Plugin"}var d,h,f,k=b.ownerDocument,g;if(f=b.getAttributeNS(z,"href"))try{g=a.getPart(f),g.onchange=function(a){c(a.url,a.mimetype)},g.load()}catch(n){runtime.log("slight problem: "+n)}else runtime.log("using MP4 data fallback"),f=e(b),c(f,"video/mp4")}
function h(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function q(a){var b=
a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var s=odf.Namespaces.drawns,w=odf.Namespaces.fons,u=odf.Namespaces.officens,A=odf.Namespaces.stylens,y=odf.Namespaces.svgns,v=odf.Namespaces.tablens,r=odf.Namespaces.textns,z=odf.Namespaces.xlinkns,
G=odf.Namespaces.xmlns,C=odf.Namespaces.presentationns,L=runtime.getWindow(),B=new xmldom.XPath,M=new odf.OdfUtils,F=new core.DomUtils,K;odf.OdfCanvas=function(c){function e(a,b,c){function d(a,b,c,e){oa.addToQueue(function(){f(a,b,c,e)})}var h,k;h=b.getElementsByTagNameNS(s,"image");for(b=0;b<h.length;b+=1)k=h.item(b),d("image"+String(b),a,k,c)}function w(a,b){function c(a,b){oa.addToQueue(function(){p(a,b)})}var d,e,h;e=b.getElementsByTagNameNS(s,"plugin");for(d=0;d<e.length;d+=1)h=e.item(d),c(a,
h)}function y(){P.firstChild&&(1<x?(P.style.MozTransformOrigin="center top",P.style.WebkitTransformOrigin="center top",P.style.OTransformOrigin="center top",P.style.msTransformOrigin="center top"):(P.style.MozTransformOrigin="left top",P.style.WebkitTransformOrigin="left top",P.style.OTransformOrigin="left top",P.style.msTransformOrigin="left top"),P.style.WebkitTransform="scale("+x+")",P.style.MozTransform="scale("+x+")",P.style.OTransform="scale("+x+")",P.style.msTransform="scale("+x+")",c.style.width=
Math.round(x*P.offsetWidth)+"px",c.style.height=Math.round(x*P.offsetHeight)+"px")}function z(a){function b(a){return d===a.getAttributeNS(u,"name")}var c=F.getElementsByTagNameNS(a,u,"annotation");a=F.getElementsByTagNameNS(a,u,"annotation-end");var d,e;for(e=0;e<c.length;e+=1)d=c[e].getAttributeNS(u,"name"),E.addAnnotation({node:c[e],end:a.filter(b)[0]||null});E.rerenderAnnotations()}function C(a){ja?(ca.parentNode||(P.appendChild(ca),y()),E&&E.forgetAnnotations(),E=new gui.AnnotationViewManager(H,
a.body,ca),z(a.body)):ca.parentNode&&(P.removeChild(ca),E.forgetAnnotations(),y())}function Q(b){function h(){for(var f=c;f.firstChild;)f.removeChild(f.firstChild);c.style.display="inline-block";f=J.rootElement;c.ownerDocument.importNode(f,!0);R.setOdfContainer(J);var g=J,m=ka;(new odf.FontLoader).loadFonts(g,m.sheet);n(J,R,U);for(var m=J,g=na.sheet,l=c;l.firstChild;)l.removeChild(l.firstChild);P=I.createElementNS(c.namespaceURI,"div");P.style.display="inline-block";P.style.background="white";P.appendChild(f);
c.appendChild(P);ca=I.createElementNS(c.namespaceURI,"div");ca.id="annotationsPane";K=I.createElementNS(c.namespaceURI,"div");K.id="shadowContent";K.style.position="absolute";K.style.top=0;K.style.left=0;m.getContentElement().appendChild(K);var l=f.body,q,p,u;p=[];for(q=l.firstChild;q&&q!==l;)if(q.namespaceURI===s&&(p[p.length]=q),q.firstChild)q=q.firstChild;else{for(;q&&q!==l&&!q.nextSibling;)q=q.parentNode;q&&q.nextSibling&&(q=q.nextSibling)}for(u=0;u<p.length;u+=1)q=p[u],a(m,"frame"+String(u),
q,g);p=B.getODFElementsWithXPath(l,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(q=0;q<p.length;q+=1)l=p[q],l.setAttributeNS&&l.setAttributeNS("urn:webodf","containsparagraphanchor",!0);q=f.body.getElementsByTagNameNS(v,"table-cell");for(l=0;l<q.length;l+=1)p=q.item(l),p.hasAttributeNS(v,"number-columns-spanned")&&p.setAttribute("colspan",p.getAttributeNS(v,"number-columns-spanned")),p.hasAttributeNS(v,"number-rows-spanned")&&p.setAttribute("rowspan",p.getAttributeNS(v,
"number-rows-spanned"));d(f.body);t(f.body);k(f.body);e(m,f.body,g);w(m,f.body);p=f.body;var V,Y,ga,z,l={};q={};var x;u=L.document.getElementsByTagNameNS(r,"list-style");for(m=0;m<u.length;m+=1)V=u.item(m),(ga=V.getAttributeNS(A,"name"))&&(q[ga]=V);p=p.getElementsByTagNameNS(r,"list");for(m=0;m<p.length;m+=1)if(V=p.item(m),u=V.getAttributeNS(G,"id")){Y=V.getAttributeNS(r,"continue-list");V.setAttribute("id",u);z="text|list#"+u+" > text|list-item > *:first-child:before {";if(ga=V.getAttributeNS(r,
"style-name")){V=q[ga];x=M.getFirstNonWhitespaceChild(V);V=void 0;if(x)if("list-level-style-number"===x.localName){V=x.getAttributeNS(A,"num-format");ga=x.getAttributeNS(A,"num-suffix");var D="",D={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},F=void 0,F=x.getAttributeNS(A,"num-prefix")||"",F=D.hasOwnProperty(V)?F+(" counter(list, "+D[V]+")"):V?F+("'"+V+"';"):F+" ''";ga&&(F+=" '"+ga+"'");V=D="content: "+F+";"}else"list-level-style-image"===x.localName?V="content: none;":
"list-level-style-bullet"===x.localName&&(V="content: '"+x.getAttributeNS(r,"bullet-char")+"';");x=V}if(Y){for(V=l[Y];V;)Y=V,V=l[Y];z+="counter-increment:"+Y+";";x?(x=x.replace("list",Y),z+=x):z+="content:counter("+Y+");"}else Y="",x?(x=x.replace("list",u),z+=x):z+="content: counter("+u+");",z+="counter-increment:"+u+";",g.insertRule("text|list#"+u+" {counter-reset:"+u+"}",g.cssRules.length);z+="}";l[u]=Y;z&&g.insertRule(z,g.cssRules.length)}P.insertBefore(K,P.firstChild);y();C(f);if(!b&&(f=[J],la.hasOwnProperty("statereadychange")))for(g=
la.statereadychange,x=0;x<g.length;x+=1)g[x].apply(null,f)}J.state===odf.OdfContainer.DONE?h():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function ha(){J.state===odf.OdfContainer.DONE?h():(runtime.log("will be back later..."),runtime.setTimeout(ha,500))},100))}function W(a){oa.clearQueue();c.innerHTML="loading "+a;c.removeAttribute("style");J=new odf.OdfContainer(a,function(a){J=a;Q(!1)})}function S(){if(T){for(var a=T.ownerDocument.createDocumentFragment();T.firstChild;)a.insertBefore(T.firstChild,
null);T.parentNode.replaceChild(a,T)}}function O(a){a=a||L.event;for(var b=a.target,c=L.getSelection(),d=0<c.rangeCount?c.getRangeAt(0):null,e=d&&d.startContainer,h=d&&d.startOffset,f=d&&d.endContainer,g=d&&d.endOffset,k,n;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==r);)b=b.parentNode;X&&(b&&b.parentNode!==T)&&(k=b.ownerDocument,n=k.documentElement.namespaceURI,T?T.parentNode&&S():(T=k.createElementNS(n,"p"),T.style.margin="0px",T.style.padding="0px",T.style.border="0px",T.setAttribute("contenteditable",
!0)),b.parentNode.replaceChild(T,b),T.appendChild(b),T.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),d.setStart(e,h),d.setEnd(f,g),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==c&&void 0!==c,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==c.ownerDocument&&void 0!==c.ownerDocument,"odf.OdfCanvas constructor needs DOM");var H=this,I=c.ownerDocument,J,R=new odf.Formatting,ba=
new b(c),fa,P,ca,ja=!1,E,ma,ka,U,na,X=!1,x=1,la={},T,oa=new l;this.refreshCSS=function(){n(J,R,U);y()};this.refreshSize=function(){y()};this.odfContainer=function(){return J};this.slidevisibilitycss=function(){return fa.css};this.setOdfContainer=function(a,b){J=a;Q(!0===b)};this.load=this.load=W;this.save=function(a){S();J.save(a)};this.setEditable=function(a){g(c,"click",O);(X=a)||S()};this.addListener=function(a,b){switch(a){case "selectionchange":ba.addListener(a,b);break;case "click":g(c,a,b);
break;default:var d=la[a];void 0===d&&(d=la[a]=[]);b&&-1===d.indexOf(b)&&d.push(b)}};this.getFormatting=function(){return R};this.getAnnotationManager=function(){return E};this.refreshAnnotations=function(){C(J.rootElement)};this.rerenderAnnotations=function(){E&&E.rerenderAnnotations()};this.getSizer=function(){return P};this.enableAnnotations=function(a){a!==ja&&(ja=a,J&&C(J.rootElement))};this.addAnnotation=function(a){E&&E.addAnnotation(a)};this.forgetAnnotations=function(){E&&E.forgetAnnotations()};
this.setZoomLevel=function(a){x=a;y()};this.getZoomLevel=function(){return x};this.fitToContainingElement=function(a,b){var d=c.offsetHeight/x;x=a/(c.offsetWidth/x);b/d<x&&(x=b/d);y()};this.fitToWidth=function(a){x=a/(c.offsetWidth/x);y()};this.fitSmart=function(a,b){var d,e;d=c.offsetWidth/x;e=c.offsetHeight/x;d=a/d;void 0!==b&&b/e<d&&(d=b/e);x=Math.min(1,d);y()};this.fitToHeight=function(a){x=a/(c.offsetHeight/x);y()};this.showFirstPage=function(){fa.showFirstPage()};this.showNextPage=function(){fa.showNextPage()};
this.showPreviousPage=function(){fa.showPreviousPage()};this.showPage=function(a){fa.showPage(a);y()};this.getElement=function(){return c};this.destroy=function(a){var b=I.getElementsByTagName("head")[0];ca.parentNode&&ca.parentNode.removeChild(ca);c.removeChild(P);b.removeChild(ma);b.removeChild(ka);b.removeChild(U);b.removeChild(na);ba.destroy(function(b){b?a(b):fa.destroy(a)})};ma=h(I);fa=new m(q(I));ka=q(I);U=q(I);na=q(I)};return odf.OdfCanvas}();
// Input 38
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(l,m,g){return new odf.OdfContainer(l,function(c){if(c.state===odf.OdfContainer.INVALID)return g("Document "+l+" is invalid.");c.state===odf.OdfContainer.DONE?c.saveAs(m,function(b){g(b)}):g("Document was not completely loaded.")})};this.render=function(l,m,g){for(m=m.getElementsByTagName("body")[0];m.firstChild;)m.removeChild(m.firstChild);m=new odf.OdfCanvas(m);m.addListener("statereadychange",function(c){g(c)});m.load(l)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(l,m){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(l,m,g,c){};ops.Server.prototype.joinSession=function(l,m,g,c){};ops.Server.prototype.leaveSession=function(l,m,g,c){};ops.Server.prototype.getGenesisUrl=function(l){};
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
ops.OpAddCursor=function(){var l=this,m,g;this.init=function(c){m=c.memberid;g=c.timestamp};this.transform=function(c,b){return[l]};this.execute=function(c){var b=c.getCursor(m);if(b)return!1;b=new ops.OdtCursor(m,c);c.addCursor(b);c.emit(ops.OdtDocument.signalCursorAdded,b);return!0};this.spec=function(){return{optype:"AddCursor",memberid:m,timestamp:g}}};
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
gui.StyleHelper=function(l){function m(a){var b;a.collapsed?(b=a.startContainer,b.hasChildNodes()&&a.startOffset<b.childNodes.length&&(b=b.childNodes[a.startOffset]),a=[b]):a=n.getTextNodes(a,!0);return l.getAppliedStyles(a)}function g(a,b,c){var g=!0,k;a=m(a);for(k=0;k<a.length&&!(g=a[k]["style:text-properties"],g=!g||g[b]!==c);k+=1);return!g}function c(b,c,d){b=n.getParagraphElements(b);for(var g={},k=!1,m,h;0<b.length;){(m=b[0].getAttributeNS(a,"style-name"))?g[m]||(h=l.getStyleElement(m,"paragraph"),
g[m]=!0):k?h=void 0:(k=!0,h=l.getDefaultStyleElement("paragraph"));if(h&&(m=l.getInheritedStyleAttributes(h,!0),(m=m["style:paragraph-properties"])&&-1===d.indexOf(m[c])))return!1;b.pop()}return!0}var b=new core.DomUtils,n=new odf.OdfUtils,a=odf.Namespaces.textns;this.getAppliedStyles=m;this.applyStyle=function(a,c,d){var g=b.splitBoundaries(c),k=n.getTextNodes(c,!1);l.applyStyle(a,k,{startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset},d);g.forEach(b.normalizeTextNodes)};
this.isBold=function(a){return g(a,"fo:font-weight","bold")};this.isItalic=function(a){return g(a,"fo:font-style","italic")};this.hasUnderline=function(a){return g(a,"style:text-underline-style","solid")};this.hasStrikeThrough=function(a){return g(a,"style:text-line-through-style","solid")};this.isAlignedLeft=function(a){return c(a,"fo:text-align",["left","start"])};this.isAlignedCenter=function(a){return c(a,"fo:text-align",["center"])};this.isAlignedRight=function(a){return c(a,"fo:text-align",
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
ops.OpApplyDirectStyling=function(){function l(a){var f=0<=b?c+b:c,d=a.getIteratorAtPosition(0<=b?c:c+b),f=b?a.getIteratorAtPosition(f):d;a=a.getDOM().createRange();a.setStart(d.container(),d.unfilteredDomOffset());a.setEnd(f.container(),f.unfilteredDomOffset());return a}var m,g,c,b,n,a=new odf.OdfUtils;this.init=function(a){m=a.memberid;g=a.timestamp;c=parseInt(a.position,10);b=parseInt(a.length,10);n=a.setProperties};this.transform=function(a,b){return null};this.execute=function(b){var c=l(b),
d=a.getImpactedParagraphs(c);(new gui.StyleHelper(b.getFormatting())).applyStyle(m,c,n);c.detach();b.getOdfCanvas().refreshCSS();d.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,timeStamp:g})});b.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:m,timestamp:g,position:c,length:b,setProperties:n}}};
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
ops.OpRemoveCursor=function(){var l=this,m,g;this.init=function(c){m=c.memberid;g=c.timestamp};this.transform=function(c,b){var g=c.spec(),a=[l];"RemoveCursor"===g.optype&&g.memberid===m&&(a=[]);return a};this.execute=function(c){return c.removeCursor(m)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:m,timestamp:g}}};
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
ops.OpMoveCursor=function(){var l=this,m,g,c,b;this.init=function(n){m=n.memberid;g=n.timestamp;c=parseInt(n.position,10);b=void 0!==n.length?parseInt(n.length,10):0};this.merge=function(n){return"MoveCursor"===n.optype&&n.memberid===m?(c=n.position,b=n.length,g=n.timestamp,!0):!1};this.transform=function(g,a){var e=g.spec(),f=c+b,d,t=[l];switch(e.optype){case "RemoveText":d=e.position+e.length;d<=c?c-=e.length:e.position<f&&(c<e.position?b=d<f?b-e.length:e.position-c:(c=e.position,b=d<f?f-d:0));
break;case "SplitParagraph":e.position<c?c+=1:e.position<=f&&(b+=1);break;case "AddAnnotation":e.position<c?c+=1:e.position<f&&(b+=1);break;case "InsertText":e.position<c?c+=e.text.length:e.position<=f&&(b+=e.text.length);break;case "RemoveCursor":e.memberid===m&&(t=[]);break;case "InsertTable":t=null}return t};this.execute=function(g){var a=g.getCursor(m),e=g.getCursorPosition(m),f=g.getPositionFilter(),d=c-e;if(!a)return!1;e=a.getStepCounter();d=0<d?e.countForwardSteps(d,f):0>d?-e.countBackwardSteps(-d,
f):0;a.move(d);b&&(f=0<b?e.countForwardSteps(b,f):0>b?-e.countBackwardSteps(-b,f):0,a.move(f,!0));g.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:m,timestamp:g,position:c,length:b}}};
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
ops.OpInsertTable=function(){function l(a,c){var d;if(1===t.length)d=t[0];else if(3===t.length)switch(a){case 0:d=t[0];break;case b-1:d=t[2];break;default:d=t[1]}else d=t[a];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case n-1:return d[2];default:return d[1]}return d[c]}var m=this,g,c,b,n,a,e,f,d,t;this.init=function(k){g=k.memberid;c=k.timestamp;a=parseInt(k.position,10);b=parseInt(k.initialRows,10);n=parseInt(k.initialColumns,10);e=k.tableName;f=k.tableStyleName;d=k.tableColumnStyleName;
t=k.tableCellStyleMatrix};this.transform=function(b,c){var d=b.spec(),e=[m];switch(d.optype){case "InsertTable":e=null;break;case "AddAnnotation":d.position<a&&(a+=1);break;case "SplitParagraph":d.position<a?a+=1:d.position!==a||c||(a+=1,e=null);break;case "InsertText":d.position<a?a+=d.text.length:d.position!==a||c||(a+=d.text.length,e=null);break;case "RemoveText":d.position+d.length<=a?a-=d.length:d.position<a&&(a=d.position)}return e};this.execute=function(k){var m=k.getPositionInTextNode(a),
h=k.getRootNode();if(m){var q=k.getDOM(),s=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),u,A,y,v;f&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",f);e&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",e);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",
n);d&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);s.appendChild(t);for(y=0;y<b;y+=1){t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(v=0;v<n;v+=1)u=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(A=l(y,v))&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",A),A=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),
u.appendChild(A),t.appendChild(u);s.appendChild(t)}m=k.getParagraphElement(m.textNode);h.insertBefore(s,m?m.nextSibling:void 0);k.getOdfCanvas().refreshSize();k.emit(ops.OdtDocument.signalTableAdded,{tableElement:s,memberId:g,timeStamp:c});k.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:g,timestamp:c,position:a,initialRows:b,initialColumns:n,tableName:e,tableStyleName:f,tableColumnStyleName:d,tableCellStyleMatrix:t}}};
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
ops.OpInsertText=function(){function l(a,b){var c=b.parentNode,d=b.nextSibling,g=[];a.getCursors().forEach(function(a){var c=a.getSelectedRange();!c||c.startContainer!==b&&c.endContainer!==b||g.push({cursor:a,startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset})});c.removeChild(b);c.insertBefore(b,d);g.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var m=
this,g,c,b,n;this.init=function(a){g=a.memberid;c=a.timestamp;b=parseInt(a.position,10);n=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===g&&a.position===b+n.length?(n+=a.text,c=a.timestamp,!0):!1};this.transform=function(a,c){var f=a.spec(),d=[m];switch(f.optype){case "InsertText":f.position<b?b+=f.text.length:f.position!==b||c||(b+=f.text.length,d=null);break;case "AddAnnotation":f.position<b&&(b+=1);break;case "SplitParagraph":f.position<b?b+=1:f.position!==b||c||(b+=
1,d=null);break;case "InsertTable":d=null;break;case "RemoveText":f.position+f.length<=b?b-=f.length:f.position<b&&(b=f.position)}return d};this.execute=function(a){var e,f,d,m,k=a.getDOM(),p,h=!0,q=0,s;if(e=a.getPositionInTextNode(b,g)){f=e.textNode;d=f.parentNode;m=f.nextSibling;p=a.getParagraphElement(f);e.offset!==f.length&&(m=f.splitText(e.offset));for(e=0;e<n.length;e+=1)if(" "===n[e]||"\t"===n[e])q<e&&(q=n.substring(q,e),h?f.appendData(q):d.insertBefore(k.createTextNode(q),m)),q=e+1,h=!1,s=
" "===n[e]?"text:s":"text:tab",s=k.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",s),s.appendChild(k.createTextNode(n[e])),d.insertBefore(s,m);q=n.substring(q);0<q.length&&(h?f.appendData(q):d.insertBefore(k.createTextNode(q),m));l(a,f);0===f.length&&f.parentNode.removeChild(f);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:p,memberId:g,timeStamp:c});a.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",
memberid:g,timestamp:c,position:b,text:n}}};
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
ops.OpRemoveText=function(){function l(a){function b(a){if(e.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function c(g){g=f.mergeIntoParent(g);return!e.isParagraph(g)&&g!==a&&b(g)?c(g):g}this.isEmpty=b;this.mergeChildrenIntoParent=c}function m(b){var c=b.getPositionFilter(),e,g,h,m,l=a,w=b.getDOM().createRange();b=b.getIteratorAtPosition(n);e=b.container();for(g=b.unfilteredDomOffset();l&&
b.nextPosition();)h=b.container(),m=b.unfilteredDomOffset(),c.acceptPosition(b)===NodeFilter.FILTER_ACCEPT&&(l-=1);w.setStart(e,g);w.setEnd(h,m);f.splitBoundaries(w);return w}var g=this,c,b,n,a,e,f;this.init=function(d){runtime.assert(0<=d.length,"OpRemoveText only supports positive lengths");c=d.memberid;b=d.timestamp;n=parseInt(d.position,10);a=parseInt(d.length,10);e=new odf.OdfUtils;f=new core.DomUtils};this.transform=function(d,e){var f=d.spec(),m=n+a,h,l=[g];switch(f.optype){case "RemoveText":h=
f.position+f.length;h<=n?n-=f.length:f.position<m&&(n<f.position?a=h<m?a-f.length:f.position-n:h<m?(n=f.position,a=m-h):l=[]);break;case "InsertText":f.position<=n?n+=f.text.length:f.position<m&&(a=f.position-n,h=new ops.OpRemoveText,h.init({memberid:c,timestamp:b,position:f.position+f.text.length,length:m-f.position}),l=[h,g]);break;case "SplitParagraph":f.position<=n?n+=1:f.position<m&&(a=f.position-n,h=new ops.OpRemoveText,h.init({memberid:c,timestamp:b,position:f.position+1,length:m-f.position}),
l=[h,g]);break;case "InsertTable":l=null;break;case "AddAnnotation":case "RemoveAnnotation":l=null;break;case "ApplyDirectStyling":l=null}return l};this.execute=function(d){var e,f,g,h,q=new l(d.getRootNode());d.upgradeWhitespacesAtPosition(n);d.upgradeWhitespacesAtPosition(n+a);f=m(d);e=d.getParagraphElement(f.startContainer);g=d.getTextElements(f,!0);h=d.getParagraphElements(f);f.detach();g.forEach(function(a){q.mergeChildrenIntoParent(a)});f=h.reduce(function(a,b){var c,d,e=a,h=b,f,g;q.isEmpty(a)&&
(d=!0,b.parentNode!==a.parentNode&&(f=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),h=a,e=b,g=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;h.hasChildNodes();)c=d?h.lastChild:h.firstChild,h.removeChild(c),"editinfo"!==c.localName&&e.insertBefore(c,g);f&&q.isEmpty(f)&&q.mergeChildrenIntoParent(f);q.mergeChildrenIntoParent(h);return e});d.fixCursorPositions();d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f||
e,memberId:c,timeStamp:b});d.emit(ops.OdtDocument.signalCursorMoved,d.getCursor(c));d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:c,timestamp:b,position:n,length:a}}};
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
ops.OpSplitParagraph=function(){var l=this,m,g,c,b=new odf.OdfUtils;this.init=function(b){m=b.memberid;g=b.timestamp;c=parseInt(b.position,10)};this.transform=function(b,a){var e=b.spec(),f=[l];switch(e.optype){case "SplitParagraph":e.position<c?c+=1:e.position!==c||a||(c+=1,f=null);break;case "AddAnnotation":e.position<c&&(c+=1);break;case "InsertText":e.position<c?c+=e.text.length:e.position!==c||a||(c+=e.text.length,f=null);break;case "InsertTable":f=null;break;case "RemoveText":e.position+e.length<=
c?c-=e.length:e.position<c&&(c=e.position)}return f};this.execute=function(n){var a,e,f,d,l,k;n.upgradeWhitespacesAtPosition(c);a=n.getPositionInTextNode(c,m);if(!a)return!1;e=n.getParagraphElement(a.textNode);if(!e)return!1;f=b.isListItem(e.parentNode)?e.parentNode:e;0===a.offset?(k=a.textNode.previousSibling,l=null):(k=a.textNode,l=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==f;)if(a=a.parentNode,d=a.cloneNode(!1),k){for(l&&d.appendChild(l);k.nextSibling;)d.appendChild(k.nextSibling);
a.parentNode.insertBefore(d,a.nextSibling);k=a;l=d}else a.parentNode.insertBefore(d,a),k=d,l=a;b.isListItem(l)&&(l=l.childNodes[0]);n.fixCursorPositions(m);n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:e,memberId:m,timeStamp:g});n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:l,memberId:m,timeStamp:g});n.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:m,timestamp:g,position:c}}};
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
ops.OpSetParagraphStyle=function(){var l=this,m,g,c,b;this.init=function(n){m=n.memberid;g=n.timestamp;c=n.position;b=n.styleName};this.transform=function(c,a){var e=c.spec(),f=[l];switch(e.optype){case "RemoveParagraphStyle":e.styleName===b&&(b="")}return f};this.execute=function(n){var a;if(a=n.getPositionInTextNode(c))if(a=n.getParagraphElement(a.textNode))return""!==b?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",b):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),n.getOdfCanvas().refreshSize(),n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:g,memberId:m}),n.getOdfCanvas().rerenderAnnotations(),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:m,timestamp:g,position:c,styleName:b}}};
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
ops.OpUpdateParagraphStyle=function(){function l(a,b){var c,d,e=b?b.split(","):[];for(c=0;c<e.length;c+=1)d=e[c].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(d[0]),d[1])}function m(a,b,c,d){var e,f,g,k=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<k.length)&&Object.keys(a).forEach(function(b){e=a[b];(c&&void 0!==c[b]||k&&-1!==k.indexOf(b))&&"object"!==typeof e&&delete a[b]});if(b&&b.attributes&&(c||0<k.length)){g=b.attributes.split(",");for(d=0;d<g.length;d+=1)if(f=g[d],c&&void 0!==
c[f]||k&&-1!==k.indexOf(f))g.splice(d,1),d-=1;0<g.length?b.attributes=g.join(","):delete b.attributes}}function g(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function c(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function b(a,b){var d=t?t[b]:null,e=k?k[b]:null;m(d,e,a.setProperties?a.setProperties[b]:null,a.removedProperties?a.removedProperties[b]:null);d&&!g(d)&&delete t[b];e&&!c(e)&&delete k[b]}function n(a){t&&["style:parent-style-name",
"style:next-style-name"].forEach(function(b){t[b]===a&&delete t[b]})}var a=this,e,f,d,t,k,p=odf.Namespaces.stylens;this.init=function(a){e=a.memberid;f=a.timestamp;d=a.styleName;t=a.setProperties;k=a.removedProperties};this.transform=function(e,f){var l=e.spec(),p=[a];switch(l.optype){case "UpdateParagraphStyle":l.styleName!==d||f||(b(l,"style:paragraph-properties"),b(l,"style:text-properties"),m(t||null,k||null,l.setProperties||null,l.removedProperties||null),t&&g(t)||k&&c(k)||(p=[]));break;case "RemoveParagraphStyle":l.styleName===
d?p=[]:n(l.styleName)}return p};this.execute=function(a){var b=a.getFormatting(),c,e,f;return(c=a.getParagraphStyleElement(d))?(e=c.getElementsByTagNameNS(p,"paragraph-properties")[0],f=c.getElementsByTagNameNS(p,"text-properties")[0],t&&b.updateStyle(c,t),k&&(k["style:paragraph-properties"]&&(l(e,k["style:paragraph-properties"].attributes),0===e.attributes.length&&c.removeChild(e)),k["style:text-properties"]&&(l(f,k["style:text-properties"].attributes),0===f.attributes.length&&c.removeChild(f)),
l(c,k.attributes)),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,d),a.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:e,timestamp:f,styleName:d,setProperties:t,removedProperties:k}}};
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
ops.OpAddParagraphStyle=function(){function l(b){a&&["style:parent-style-name","style:next-style-name"].forEach(function(c){a[c]===b&&delete a[c]})}var m=this,g,c,b,n,a,e=odf.Namespaces.stylens;this.init=function(e){g=e.memberid;c=e.timestamp;b=e.styleName;n="true"===e.isAutomaticStyle||!0===e.isAutomaticStyle;a=e.setProperties};this.transform=function(a,b){var c=a.spec();"RemoveParagraphStyle"===c.optype&&l(c.styleName);return[m]};this.execute=function(c){var d=c.getOdfCanvas().odfContainer(),g=
c.getFormatting(),k=c.getDOM().createElementNS(e,"style:style");if(!k)return!1;a&&g.updateStyle(k,a);k.setAttributeNS(e,"style:family","paragraph");k.setAttributeNS(e,"style:name",b);n?d.rootElement.automaticStyles.appendChild(k):d.rootElement.styles.appendChild(k);c.getOdfCanvas().refreshCSS();n||c.emit(ops.OdtDocument.signalCommonParagraphStyleCreated,b);return!0};this.spec=function(){return{optype:"AddParagraphStyle",memberid:g,timestamp:c,styleName:b,isAutomaticStyle:n,setProperties:a}}};
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
ops.OpRemoveParagraphStyle=function(){function l(c){var a=[];c&&["style:parent-style-name","style:next-style-name"].forEach(function(e){c[e]===b&&a.push(e)});return a}var m=this,g,c,b;this.init=function(n){g=n.memberid;c=n.timestamp;b=n.styleName};this.transform=function(n,a){var e=n.spec(),f,d;f=[m];switch(e.optype){case "RemoveParagraphStyle":e.styleName===b&&(f=[]);break;case "AddParagraphStyle":case "UpdateParagraphStyle":d=l(e.setProperties);0<d.length&&(f=new ops.OpUpdateParagraphStyle,f.init({memberid:g,
timestamp:c,styleName:e.styleName,removedProperties:{attributes:d.join(",")}}),f=[f,m]);break;case "SetParagraphStyle":e.styleName===b&&(e.styleName="",f=new ops.OpSetParagraphStyle,f.init(e),f=[f,m])}return f};this.execute=function(c){var a=c.getParagraphStyleElement(b);if(!a)return!1;a.parentNode.removeChild(a);c.getOdfCanvas().refreshCSS();c.emit(ops.OdtDocument.signalCommonParagraphStyleDeleted,b);return!0};this.spec=function(){return{optype:"RemoveParagraphStyle",memberid:g,timestamp:c,styleName:b}}};
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
ops.OpAddAnnotation=function(){function l(a,b,c){if(c=a.getPositionInTextNode(c,g))a=c.textNode,c.offset!==a.length&&a.splitText(c.offset),a.parentNode.insertBefore(b,a.nextSibling)}var m=this,g,c,b,n,a;this.init=function(e){g=e.memberid;c=parseInt(e.timestamp,10);b=parseInt(e.position,10);n=parseInt(e.length,10)||0;a=e.name};this.transform=function(a,c){var d=a.spec(),g=b+n,k=[m];switch(d.optype){case "AddAnnotation":d.position<b?b+=1:d.position!==b||c||(b+=1,k=null);break;case "InsertText":d.position<=
b?b+=d.text.length:d.position<=g&&(n+=d.text.length);break;case "SplitParagraph":d.position<=b?b+=1:d.position<=g&&(n+=1);break;case "InsertTable":k=null;break;case "RemoveText":d.position+d.length<=b?b-=d.length:d.position<b&&(b=d.position)}return k};this.execute=function(e){var f={},d=e.getPositionFilter(),m=e.getCursor(g),k=e.getCursorPosition(g),k=b-k-1,p=new Date(c),h,q,s,w,u;u=e.getDOM();h=u.createElementNS(odf.Namespaces.officens,"office:annotation");h.setAttributeNS(odf.Namespaces.officens,
"office:name",a);q=u.createElementNS(odf.Namespaces.dcns,"dc:creator");q.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",g);s=u.createElementNS(odf.Namespaces.dcns,"dc:date");s.appendChild(u.createTextNode(p.toISOString()));p=u.createElementNS(odf.Namespaces.textns,"text:list");w=u.createElementNS(odf.Namespaces.textns,"text:list-item");u=u.createElementNS(odf.Namespaces.textns,"text:p");w.appendChild(u);p.appendChild(w);h.appendChild(q);h.appendChild(s);h.appendChild(p);
f.node=h;if(!f.node)return!1;if(n){h=e.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");h.setAttributeNS(odf.Namespaces.officens,"office:name",a);f.end=h;if(!f.end)return!1;l(e,f.end,b+n)}l(e,f.node,b);m&&(h=m.getStepCounter(),d=0<k?h.countForwardSteps(k,d):0>k?-h.countBackwardSteps(-k,d):0,m.move(d),e.emit(ops.OdtDocument.signalCursorMoved,m));e.getOdfCanvas().addAnnotation(f);return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:g,timestamp:c,position:b,
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
ops.OpRemoveAnnotation=function(){var l,m,g,c,b;this.init=function(n){l=n.memberid;m=n.timestamp;g=parseInt(n.position,10);c=parseInt(n.length,10);b=new core.DomUtils};this.transform=function(b,a){return null};this.execute=function(c){for(var a=c.getIteratorAtPosition(g).container(),e,f=null,d=null;a.namespaceURI!==odf.Namespaces.officens||"annotation"!==a.localName;)a=a.parentNode;if(null===a)return!1;f=a;(e=f.getAttributeNS(odf.Namespaces.officens,"name"))&&(d=b.getElementsByTagNameNS(c.getRootNode(),
odf.Namespaces.officens,"annotation-end").filter(function(a){return e===a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);c.getOdfCanvas().forgetAnnotations();for(a=b.getElementsByTagNameNS(f,odf.Namespaces.webodfns+":names:cursor","cursor");a.length;)f.parentNode.insertBefore(a.pop(),f);f.parentNode.removeChild(f);d&&d.parentNode.removeChild(d);c.fixCursorPositions();c.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:l,timestamp:m,
position:g,length:c}}};
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
ops.OperationFactory=function(){function l(g){return function(){return new g}}var m;this.register=function(g,c){m[g]=c};this.create=function(g){var c=null,b=m[g.optype];b&&(c=b(g),c.init(g));return c};m={AddCursor:l(ops.OpAddCursor),ApplyDirectStyling:l(ops.OpApplyDirectStyling),InsertTable:l(ops.OpInsertTable),InsertText:l(ops.OpInsertText),RemoveText:l(ops.OpRemoveText),SplitParagraph:l(ops.OpSplitParagraph),SetParagraphStyle:l(ops.OpSetParagraphStyle),UpdateParagraphStyle:l(ops.OpUpdateParagraphStyle),
AddParagraphStyle:l(ops.OpAddParagraphStyle),RemoveParagraphStyle:l(ops.OpRemoveParagraphStyle),MoveCursor:l(ops.OpMoveCursor),RemoveCursor:l(ops.OpRemoveCursor),AddAnnotation:l(ops.OpAddAnnotation),RemoveAnnotation:l(ops.OpRemoveAnnotation)}};
// Input 57
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(l,m){function g(){u.setUnfilteredPosition(l.getNode(),0);return u}function c(a,b){var c,d=null;a&&(c=b?a[a.length-1]:a[0]);c&&(d={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return d}function b(a,d,e,h){var f=a.nodeType;e.setStart(a,d);e.collapse(!h);h=c(e.getClientRects(),!0===h);!h&&0<d&&(e.setStart(a,d-1),e.setEnd(a,d),h=c(e.getClientRects(),!0));h||(f===Node.ELEMENT_NODE&&a.childNodes[d-1]?h=b(a,d-1,e,!0):a.nodeType===Node.TEXT_NODE&&0<d?h=b(a,d-1,e,!0):a.previousSibling?
h=b(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,e,!0):a.parentNode&&a.parentNode!==m?h=b(a.parentNode,0,e,!1):(e.selectNode(m),h=c(e.getClientRects(),!1)));runtime.assert(Boolean(h),"No visible rectangle found");return h}function n(a,c,d){var e=a,h=g(),f,k=m.ownerDocument.createRange(),n=l.getSelectedRange()?l.getSelectedRange().cloneRange():m.ownerDocument.createRange(),q,s=runtime.getWindow();for(f=b(h.container(),
h.unfilteredDomOffset(),k);0<e&&d();)e-=1;c?(c=h.container(),h=h.unfilteredDomOffset(),-1===n.comparePoint(c,h)?(n.setStart(c,h),q=!1):n.setEnd(c,h)):(n.setStart(h.container(),h.unfilteredDomOffset()),n.collapse(!0));l.setSelectedRange(n,q);h=g();n=b(h.container(),h.unfilteredDomOffset(),k);if(n.top===f.top||void 0===A)A=n.left;s.clearTimeout(y);y=s.setTimeout(function(){A=void 0},2E3);k.detach();return a-e}function a(a){var b=g();return a.acceptPosition(b)===v?!0:!1}function e(a,b){for(var c=g(),
d=new core.LoopWatchDog(1E3),e=0,h=0;0<a&&c.nextPosition();)e+=1,d.check(),b.acceptPosition(c)===v&&(h+=e,e=0,a-=1);return h}function f(a,b,c){for(var d=g(),e=new core.LoopWatchDog(1E3),h=0,f=0;0<a&&d.nextPosition();)e.check(),c.acceptPosition(d)===v&&(h+=1,b.acceptPosition(d)===v&&(f+=h,h=0,a-=1));return f}function d(a,b,c){for(var d=g(),e=new core.LoopWatchDog(1E3),h=0,f=0;0<a&&d.previousPosition();)e.check(),c.acceptPosition(d)===v&&(h+=1,b.acceptPosition(d)===v&&(f+=h,h=0,a-=1));return f}function t(a,
b){for(var c=g(),d=new core.LoopWatchDog(1E3),e=0,h=0;0<a&&c.previousPosition();)e+=1,d.check(),b.acceptPosition(c)===v&&(h+=e,e=0,a-=1);return h}function k(a){var b=g(),c=w.getParagraphElement(b.getCurrentNode()),d;d=-t(1,a);if(0===d||c&&c!==w.getParagraphElement(b.getCurrentNode()))d=e(1,a);return d}function p(a,c){var d=g(),e=0,h=0,f=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var k=c,n=f,l=d,q=l.container(),s=0,u=null,p=void 0,t=10,w=void 0,y=0,W=void 0,S=void 0,O=void 0,w=void 0,H=m.ownerDocument.createRange(),
I=new core.LoopWatchDog(1E3),w=b(q,l.unfilteredDomOffset(),H),W=w.top,S=void 0===A?w.left:A,O=W;!0===(0>n?l.previousPosition():l.nextPosition());)if(I.check(),k.acceptPosition(l)===v&&(s+=1,q=l.container(),w=b(q,l.unfilteredDomOffset(),H),w.top!==W)){if(w.top!==O&&O!==W)break;O=w.top;w=Math.abs(S-w.left);if(null===u||w<t)u=q,p=l.unfilteredDomOffset(),t=w,y=s}null!==u?(l.setUnfilteredPosition(u,p),s=y):s=0;H.detach();e+=s;if(0===e)break;h+=e;a-=1}return h*f}function h(a,c){var d,e,h,f,k=g(),n=w.getParagraphElement(k.getCurrentNode()),
l=0,q=m.ownerDocument.createRange();0>a?(d=k.previousPosition,e=-1):(d=k.nextPosition,e=1);for(h=b(k.container(),k.unfilteredDomOffset(),q);d.call(k);)if(c.acceptPosition(k)===v){if(w.getParagraphElement(k.getCurrentNode())!==n)break;f=b(k.container(),k.unfilteredDomOffset(),q);if(f.bottom!==h.bottom&&(h=f.top>=h.top&&f.bottom<h.bottom||f.top<=h.top&&f.bottom>h.bottom,!h))break;l+=e;h=f}q.detach();return l}function q(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),
a=a.parentNode;for(d=b.firstChild;d!==a;)c+=1,d=d.nextSibling;return c}function s(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=g(),e=d.container(),h=d.unfilteredDomOffset(),f=0,k=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(e,h);var e=a,h=b,n=d.container(),
l=d.unfilteredDomOffset();if(e===n)e=l-h;else{var m=e.compareDocumentPosition(n);2===m?m=-1:4===m?m=1:10===m?(h=q(e,n),m=h<l?1:-1):(l=q(n,e),m=l<h?-1:1);e=m}if(0>e)for(;d.nextPosition()&&(k.check(),c.acceptPosition(d)===v&&(f+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&(k.check(),c.acceptPosition(d)===v&&(f-=1),d.container()!==a||d.unfilteredDomOffset()!==b););return f}var w,u,A,y,v=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=
function(a,b){return n(a,b,u.nextPosition)};this.movePointBackward=function(a,b){return n(a,b,u.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:e,countBackwardSteps:t,convertForwardStepsBetweenFilters:f,convertBackwardStepsBetweenFilters:d,countLinesSteps:p,countStepsToLineBoundary:h,countStepsToPosition:s,isPositionWalkable:a,countStepsToValidPosition:k}};(function(){w=new odf.OdfUtils;u=gui.SelectionMover.createPositionIterator(m);var a=m.ownerDocument.createRange();a.setStart(u.container(),
u.unfilteredDomOffset());a.collapse(!0);l.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(l){var m=new function(){this.acceptNode=function(g){return"urn:webodf:names:cursor"===g.namespaceURI||"urn:webodf:names:editinfo"===g.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(l,5,m,!1)};(function(){return gui.SelectionMover})();
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
ops.OperationTransformer=function(){function l(g,c){for(var b,n,a,e=[],f=[];0<g.length&&c;){b=g.shift();n=c;var d=void 0;a=d=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b.spec()));runtime.log(runtime.toJson(n.spec()));d=m.create(n.spec());a=n.transform(b,!0);n=(d=b.transform(d,!1))&&a?{opsA:d,opsB:a}:null;if(!n)return null;e=e.concat(n.opsA);if(0===n.opsB.length){e=e.concat(g);c=null;break}if(1<n.opsB.length)for(b=0;b<n.opsB.length-1;b+=1){a=l(g,n.opsB[b]);if(!a)return null;
f=f.concat(a.opsB);g=a.opsA}c=n.opsB.pop()}c&&f.push(c);return{opsA:e,opsB:f}}var m;this.setOperationFactory=function(g){m=g};this.transform=function(g,c){var b,n=[],a,e=[];for(b=0;b<g.length;b+=1){a=m.create(g[b]);if(!a)return null;n.push(a)}for(b=0;b<c.length;b+=1){a=m.create(c[b]);a=l(n,a);if(!a)return null;n=a.opsA;e=e.concat(a.opsB)}return{opsA:n,opsB:e}}};
// Input 59
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(l,m){var g=this,c,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,a){var e=0;0<b?e=c.movePointForward(b,a):0>=b&&(e=-c.movePointBackward(-b,a));g.handleUpdate();return e};this.handleUpdate=function(){};this.getStepCounter=function(){return c.getStepCounter()};this.getMemberId=function(){return l};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
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
ops.EditInfo=function(l,m){function g(){var c=[],a;for(a in b)b.hasOwnProperty(a)&&c.push({memberid:a,time:b[a].time});c.sort(function(a,b){return a.time-b.time});return c}var c,b={};this.getNode=function(){return c};this.getOdtDocument=function(){return m};this.getEdits=function(){return b};this.getSortedEdits=function(){return g()};this.addEdit=function(c,a){b[c]={time:a}};this.clearEdits=function(){b={}};this.destroy=function(b){l.removeChild(c);b()};c=m.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");l.insertBefore(c,l.firstChild)};
// Input 61
gui.Avatar=function(l,m){var g=this,c,b,n;this.setColor=function(a){b.style.borderColor=a};this.setImageUrl=function(a){g.isVisible()?b.src=a:n=a};this.isVisible=function(){return"block"===c.style.display};this.show=function(){n&&(b.src=n,n=void 0);c.style.display="block"};this.hide=function(){c.style.display="none"};this.markAsFocussed=function(a){c.className=a?"active":""};this.destroy=function(a){l.removeChild(c);a()};(function(){var a=l.ownerDocument,e=a.documentElement.namespaceURI;c=a.createElementNS(e,
"div");b=a.createElementNS(e,"img");b.width=64;b.height=64;c.appendChild(b);c.style.width="64px";c.style.height="70px";c.style.position="absolute";c.style.top="-80px";c.style.left="-34px";c.style.display=m?"block":"none";l.appendChild(c)})()};
// Input 62
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(l,m,g){function c(g){e&&a.parentNode&&(!f||g)&&(g&&void 0!==d&&runtime.clearTimeout(d),f=!0,b.style.opacity=g||"0"===b.style.opacity?"1":"0",d=runtime.setTimeout(function(){f=!1;c(!1)},500))}var b,n,a,e=!1,f=!1,d;this.refreshCursorBlinking=function(){g||l.getSelectedRange().collapsed?(e=!0,c(!0)):(e=!1,b.style.opacity="0")};this.setFocus=function(){e=!0;n.markAsFocussed(!0);c(!0)};this.removeFocus=function(){e=!1;n.markAsFocussed(!1);b.style.opacity="0"};this.setAvatarImageUrl=
function(a){n.setImageUrl(a)};this.setColor=function(a){b.style.borderColor=a;n.setColor(a)};this.getCursor=function(){return l};this.getFocusElement=function(){return b};this.toggleHandleVisibility=function(){n.isVisible()?n.hide():n.show()};this.showHandle=function(){n.show()};this.hideHandle=function(){n.hide()};this.ensureVisible=function(){var a,c,d,e,f=l.getOdtDocument().getOdfCanvas().getElement().parentNode,g;d=f.offsetWidth-f.clientWidth+5;e=f.offsetHeight-f.clientHeight+5;g=b.getBoundingClientRect();
a=g.left-d;c=g.top-e;d=g.right+d;e=g.bottom+e;g=f.getBoundingClientRect();c<g.top?f.scrollTop-=g.top-c:e>g.bottom&&(f.scrollTop+=e-g.bottom);a<g.left?f.scrollLeft-=g.left-a:d>g.right&&(f.scrollLeft+=d-g.right)};this.destroy=function(c){n.destroy(function(d){d?c(d):(a.removeChild(b),c())})};(function(){var c=l.getOdtDocument().getDOM();b=c.createElementNS(c.documentElement.namespaceURI,"span");a=l.getNode();a.appendChild(b);n=new gui.Avatar(a,m)})()};
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
gui.KeyboardHandler=function(){function l(b,c){c||(c=m.None);return b+":"+c}var m=gui.KeyboardHandler.Modifier,g=null,c={};this.setDefault=function(b){g=b};this.bind=function(b,g,a){b=l(b,g);runtime.assert(!1===c.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);c[b]=a};this.unbind=function(b,g){var a=l(b,g);delete c[a]};this.reset=function(){g=null;c={}};this.handleEvent=function(b){var n=b.keyCode,a=m.None;b.metaKey&&(a|=m.Meta);b.ctrlKey&&(a|=m.Ctrl);b.altKey&&(a|=m.Alt);
b.shiftKey&&(a|=m.Shift);n=l(n,a);n=c[n];a=!1;n?a=n():null!==g&&(a=g(b));a&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
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
gui.Clipboard=function(){var l,m,g;this.setDataFromRange=function(c,b){var g=!0,a,e=c.clipboardData;a=runtime.getWindow();var f=b.startContainer.ownerDocument;!e&&a&&(e=a.clipboardData);e?(f=f.createElement("span"),f.appendChild(b.cloneContents()),a=e.setData("text/plain",m.writeToString(f)),g=g&&a,a=e.setData("text/html",l.writeToString(f,odf.Namespaces.namespaceMap)),g=g&&a,c.preventDefault()):g=!1;return g};l=new xmldom.LSSerializer;m=new odf.TextSerializer;g=new odf.OdfNodeFilter;l.filter=g;m.filter=
g};
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
gui.DirectTextStyler=function(l,m){function g(a,b){for(var c=0,d=b[c];d&&a;)a=a[d],c+=1,d=b[c];return b.length===c?a:void 0}function c(a,b){var c=g(a[0],b);return a.every(function(a){return c===g(a,b)})?c:void 0}function b(){function a(b,c,d){b!==c&&(void 0===e&&(e={}),e[d]=c);return c}var b=w.getCursor(m),d=b&&b.getSelectedRange(),b=d&&u.getAppliedStyles(d),e;y=a(y,d?u.isBold(d):!1,"isBold");v=a(v,d?u.isItalic(d):!1,"isItalic");r=a(r,d?u.hasUnderline(d):!1,"hasUnderline");z=a(z,d?u.hasStrikeThrough(d):
!1,"hasStrikeThrough");d=b&&c(b,["style:text-properties","fo:font-size"]);G=a(G,d&&parseFloat(d),"fontSize");C=a(C,b&&c(b,["style:text-properties","style:font-name"]),"fontName");e&&A.emit(gui.DirectTextStyler.textStylingChanged,e)}function n(a){a.getMemberId()===m&&b()}function a(a){a===m&&b()}function e(a){a.getMemberId()===m&&b()}function f(){b()}function d(a){var c=w.getCursor(m);c&&w.getParagraphElement(c.getNode())===a.paragraphElement&&b()}function t(a,b){var c=w.getCursor(m);if(!c)return!1;
b(!a(c.getSelectedRange()));return!0}function k(a,b){var c=w.getCursorSelection(m),d=new ops.OpApplyDirectStyling,e={};e[a]=b;d.init({memberid:m,position:c.position,length:c.length,setProperties:{"style:text-properties":e}});l.enqueue(d)}function p(a){k("fo:font-weight",a?"bold":"normal")}function h(a){k("fo:font-style",a?"italic":"normal")}function q(a){k("style:text-underline-style",a?"solid":"none")}function s(a){k("style:text-line-through-style",a?"solid":"none")}var w=l.getOdtDocument(),u=new gui.StyleHelper(w.getFormatting()),
A=new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]),y=!1,v=!1,r=!1,z=!1,G,C;this.setBold=p;this.setItalic=h;this.setHasUnderline=q;this.setHasStrikethrough=s;this.setFontSize=function(a){k("fo:font-size",a+"pt")};this.setFontName=function(a){k("style:font-name",a)};this.toggleBold=t.bind(this,u.isBold,p);this.toggleItalic=t.bind(this,u.isItalic,h);this.toggleUnderline=t.bind(this,u.hasUnderline,q);this.toggleStrikethrough=t.bind(this,u.hasStrikeThrough,s);this.isBold=function(){return y};
this.isItalic=function(){return v};this.hasUnderline=function(){return r};this.hasStrikeThrough=function(){return z};this.fontSize=function(){return G};this.fontName=function(){return C};this.subscribe=function(a,b){A.subscribe(a,b)};this.unsubscribe=function(a,b){A.unsubscribe(a,b)};this.destroy=function(b){w.unsubscribe(ops.OdtDocument.signalCursorAdded,n);w.unsubscribe(ops.OdtDocument.signalCursorRemoved,a);w.unsubscribe(ops.OdtDocument.signalCursorMoved,e);w.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,
f);w.unsubscribe(ops.OdtDocument.signalParagraphChanged,d);b()};w.subscribe(ops.OdtDocument.signalCursorAdded,n);w.subscribe(ops.OdtDocument.signalCursorRemoved,a);w.subscribe(ops.OdtDocument.signalCursorMoved,e);w.subscribe(ops.OdtDocument.signalParagraphStyleModified,f);w.subscribe(ops.OdtDocument.signalParagraphChanged,d);b()};gui.DirectTextStyler.textStylingChanged="textStyling/changed";(function(){return gui.DirectTextStyler})();
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
gui.DirectParagraphStyler=function(l,m,g){function c(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b=h.getCursor(m),b=b&&b.getSelectedRange(),c;A=a(A,b?w.isAlignedLeft(b):!1,"isAlignedLeft");y=a(y,b?w.isAlignedCenter(b):!1,"isAlignedCenter");v=a(v,b?w.isAlignedRight(b):!1,"isAlignedRight");r=a(r,b?w.isAlignedJustified(b):!1,"isAlignedJustified");c&&u.emit(gui.DirectParagraphStyler.paragraphStylingChanged,c)}function b(a){a.getMemberId()===m&&c()}function n(a){a===m&&c()}function a(a){a.getMemberId()===
m&&c()}function e(){c()}function f(a){var b=h.getCursor(m);b&&h.getParagraphElement(b.getNode())===a.paragraphElement&&c()}function d(a){var b=h.getCursor(m).getSelectedRange(),c=h.getCursorPosition(m),b=s.getParagraphElements(b),d=h.getFormatting();b.forEach(function(b){var e=c+h.getDistanceFromCursor(m,b,0),f=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=g.generateName();var k,e=e+1;f&&(k=d.createDerivedStyleObject(f,"paragraph",{}));k=a(k||{});f=new ops.OpAddParagraphStyle;f.init({memberid:m,
styleName:b,isAutomaticStyle:!0,setProperties:k});k=new ops.OpSetParagraphStyle;k.init({memberid:m,styleName:b,position:e});l.enqueue(f);l.enqueue(k)})}function t(a){d(function(b){return q.mergeObjects(b,a)})}function k(a){t({"style:paragraph-properties":{"fo:text-align":a}})}function p(a,b){var c=h.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&s.parseLength(d);return q.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var h=l.getOdtDocument(),q=new core.Utils,s=new odf.OdfUtils,w=new gui.StyleHelper(h.getFormatting()),u=new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]),A,y,v,r;this.isAlignedLeft=function(){return A};this.isAlignedCenter=function(){return y};this.isAlignedRight=function(){return v};this.isAlignedJustified=function(){return r};this.alignParagraphLeft=function(){k("left");return!0};this.alignParagraphCenter=function(){k("center");
return!0};this.alignParagraphRight=function(){k("right");return!0};this.alignParagraphJustified=function(){k("justify");return!0};this.indent=function(){d(p.bind(null,1));return!0};this.outdent=function(){d(p.bind(null,-1));return!0};this.subscribe=function(a,b){u.subscribe(a,b)};this.unsubscribe=function(a,b){u.unsubscribe(a,b)};this.destroy=function(c){h.unsubscribe(ops.OdtDocument.signalCursorAdded,b);h.unsubscribe(ops.OdtDocument.signalCursorRemoved,n);h.unsubscribe(ops.OdtDocument.signalCursorMoved,
a);h.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,e);h.unsubscribe(ops.OdtDocument.signalParagraphChanged,f);c()};h.subscribe(ops.OdtDocument.signalCursorAdded,b);h.subscribe(ops.OdtDocument.signalCursorRemoved,n);h.subscribe(ops.OdtDocument.signalCursorMoved,a);h.subscribe(ops.OdtDocument.signalParagraphStyleModified,e);h.subscribe(ops.OdtDocument.signalParagraphChanged,f);c()};gui.DirectParagraphStyler.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectParagraphStyler})();
// Input 67
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Utils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.DirectTextStyler");
runtime.loadClass("gui.DirectParagraphStyler");
gui.SessionController=function(){gui.SessionController=function(l,m,g){function c(a,b,c,d){var e="on"+b,h=!1;a.attachEvent&&(h=a.attachEvent(e,c));!h&&a.addEventListener&&(a.addEventListener(b,c,!1),h=!0);h&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function b(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function n(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function a(a,b){var c=new ops.OpMoveCursor;c.init({memberid:m,
position:a,length:b||0});return c}function e(a,b){var c=gui.SelectionMover.createPositionIterator(x.getRootNode()),d=x.getOdfCanvas().getElement(),e;e=a;if(!e)return null;for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return null;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,b);return x.getDistanceFromCursor(m,c.container(),
c.unfilteredDomOffset())}function f(a){var b=x.getOdfCanvas().getElement(),c=x.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function d(b){runtime.setTimeout(function(){var c;a:{var d=x.getOdfCanvas().getElement(),h=X.getSelection(),g,k,n,q;if(null===h.anchorNode&&null===h.focusNode){c=b.clientX;g=b.clientY;k=x.getDOM();k.caretRangeFromPoint?
(c=k.caretRangeFromPoint(c,g),g={container:c.startContainer,offset:c.startOffset}):k.caretPositionFromPoint?(c=k.caretPositionFromPoint(c,g),g={container:c.offsetNode,offset:c.offset}):g=null;if(!g){c=null;break a}c=g.container;g=g.offset;k=c;h=g}else c=h.anchorNode,g=h.anchorOffset,k=h.focusNode,h=h.focusOffset;runtime.assert(null!==c&&null!==k,"anchorNode is null or focusNode is null");n=T.containsNode(d,c);q=T.containsNode(d,k);n||q?(n||(n=f(c),c=n.node,g=n.offset),q||(n=f(k),k=n.node,h=n.offset),
d.focus(),c={anchorNode:c,anchorOffset:g,focusNode:k,focusOffset:h}):c=null}null!==c&&(d=e(c.anchorNode,c.anchorOffset),g=c.focusNode===c.anchorNode&&c.focusOffset===c.anchorOffset?d:e(c.focusNode,c.focusOffset),null!==g&&0!==g||null!==d&&0!==d)&&(c=x.getCursorPosition(m),d=a(c+d,g-d),l.enqueue(d))},0)}function t(a){d(a)}function k(b){var c=x.getCursorSelection(m),d=x.getCursor(m).getStepCounter();0!==b&&(b=0<b?d.convertForwardStepsBetweenFilters(b,ha,ra):-d.convertBackwardStepsBetweenFilters(-b,
ha,ra),b=c.length+b,l.enqueue(a(c.position,b)))}function p(b){var c=x.getCursorPosition(m),d=x.getCursor(m).getStepCounter();0!==b&&(b=0<b?d.convertForwardStepsBetweenFilters(b,ha,ra):-d.convertBackwardStepsBetweenFilters(-b,ha,ra),l.enqueue(a(c+b,0)))}function h(){p(-1);return!0}function q(){p(1);return!0}function s(){k(-1);return!0}function w(){k(1);return!0}function u(a,b){var c=x.getParagraphElement(x.getCursor(m).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");
c=x.getCursor(m).getStepCounter().countLinesSteps(a,ha);b?k(c):p(c)}function A(){u(-1,!1);return!0}function y(){u(1,!1);return!0}function v(){u(-1,!0);return!0}function r(){u(1,!0);return!0}function z(a,b){var c=x.getCursor(m).getStepCounter().countStepsToLineBoundary(a,ha);b?k(c):p(c)}function G(){z(-1,!1);return!0}function C(){z(1,!1);return!0}function L(){z(-1,!0);return!0}function B(){z(1,!0);return!0}function M(){var a=x.getParagraphElement(x.getCursor(m).getNode()),b,c;runtime.assert(Boolean(a),
"SessionController: Cursor outside paragraph");c=x.getDistanceFromCursor(m,a,0);b=gui.SelectionMover.createPositionIterator(x.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),oa.isParagraph(a)&&(c=x.getDistanceFromCursor(m,a,0));k(c);return!0}function F(){var a=x.getParagraphElement(x.getCursor(m).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(x.getRootNode());b.moveToEndOfNode(a);
for(c=x.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),oa.isParagraph(a)&&(b.moveToEndOfNode(a),c=x.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset()));k(c);return!0}function K(a,b){var c=gui.SelectionMover.createPositionIterator(x.getRootNode());0<a&&c.moveToEnd();c=x.getDistanceFromCursor(m,c.container(),c.unfilteredDomOffset());b?k(c):p(c)}function ea(){K(-1,!1);return!0}function pa(){K(1,!1);return!0}function N(){K(-1,!0);
return!0}function qa(){K(1,!0);return!0}function Z(){var b=gui.SelectionMover.createPositionIterator(x.getRootNode()),c;c=-x.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset());b.moveToEnd();c+=x.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset());l.enqueue(a(0,c));return!0}function $(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function Q(a){var b=new ops.OpRemoveText;b.init({memberid:m,position:a.position,length:a.length});return b}function W(){var a=$(x.getCursorSelection(m)),
b=null;0===a.length?0<a.position&&x.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:m,position:a.position-1,length:1}),l.enqueue(b)):(b=Q(a),l.enqueue(b));return!0}function S(){var a=$(x.getCursorSelection(m)),b=null;0===a.length?x.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:m,position:a.position,length:1}),l.enqueue(b)):(b=Q(a),l.enqueue(b));return null!==b}function O(){var a=$(x.getCursorSelection(m));0!==a.length&&l.enqueue(Q(a));
return!0}function H(a){var b=$(x.getCursorSelection(m)),c=null;0<b.length&&(c=Q(b),l.enqueue(c));c=new ops.OpInsertText;c.init({memberid:m,position:b.position,text:a});l.enqueue(c)}function I(){var a=x.getCursorPosition(m),b;b=new ops.OpSplitParagraph;b.init({memberid:m,position:a});l.enqueue(b);return!0}function J(){var a=x.getCursor(m),b=X.getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function R(a){var b=x.getCursor(m);b.getSelectedRange().collapsed||(ta.setDataFromRange(a,
b.getSelectedRange())?(b=new ops.OpRemoveText,a=$(l.getOdtDocument().getCursorSelection(m)),b.init({memberid:m,position:a.position,length:a.length}),l.enqueue(b)):runtime.log("Cut operation failed"))}function ba(){return!1!==x.getCursor(m).getSelectedRange().collapsed}function fa(a){var b=x.getCursor(m);b.getSelectedRange().collapsed||ta.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function P(a){var b;X.clipboardData&&X.clipboardData.getData?b=X.clipboardData.getData("Text"):
a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(H(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function ca(){return!1}function ja(a){if(aa)aa.onOperationExecuted(a)}function E(a){x.emit(ops.OdtDocument.signalUndoStackChanged,a)}function ma(){return aa?(aa.moveBackward(1),J(),!0):!1}function ka(){return aa?(aa.moveForward(1),J(),!0):!1}function U(a){ua=a.target&&T.containsNode(x.getOdfCanvas().getElement(),a.target)}function na(b){var c=b.target,
e=b.detail,h=null;if("annotationRemoveButton"===c.className){b=h=T.getElementsByTagNameNS(c.parentNode,odf.Namespaces.officens,"annotation")[0];for(var c=0,e=gui.SelectionMover.createPositionIterator(x.getRootNode()),h=new core.LoopWatchDog(1E3),f=!1;e.nextPosition();)if(h.check(),f=Boolean(b.compareDocumentPosition(e.container())&Node.DOCUMENT_POSITION_CONTAINED_BY),1===ra.acceptPosition(e)){if(f)break;c+=1}e=0;h=gui.SelectionMover.createPositionIterator(x.getRootNode());f=!1;h.setUnfilteredPosition(b,
0);do{f=Boolean(b.compareDocumentPosition(h.container())&Node.DOCUMENT_POSITION_CONTAINED_BY);if(!f&&b!==h.container())break;1===ra.acceptPosition(h)&&(e+=1)}while(h.nextPosition());b=e;e=new ops.OpRemoveAnnotation;e.init({memberid:m,position:c,length:b});l.enqueue(e)}else if(ua)if(1===e)d(b);else if(2===e){var h=x.getOdfCanvas().getElement(),e=/[A-Za-z0-9]/,c=b=0,g;if(T.containsNode(h,X.getSelection().focusNode)){h=gui.SelectionMover.createPositionIterator(x.getRootNode());f=x.getCursor(m).getNode();
for(h.setUnfilteredPosition(f,0);h.previousPosition();)if(g=h.getCurrentNode(),g.nodeType===Node.TEXT_NODE){g=g.data[h.unfilteredDomOffset()];if(!e.test(g))break;b-=1}else if(g.namespaceURI!==odf.Namespaces.textns||"span"!==g.localName)break;h.setUnfilteredPosition(f,0);do if(g=h.getCurrentNode(),g.nodeType===Node.TEXT_NODE){g=g.data[h.unfilteredDomOffset()];if(!e.test(g))break;c+=1}else if(g.namespaceURI!==odf.Namespaces.textns||"span"!==g.localName)break;while(h.nextPosition());if(0!==b||0!==c)e=
x.getCursorPosition(m),b=a(e+b,Math.abs(b)+Math.abs(c)),l.enqueue(b)}}else 3===e&&(b=x.getOdfCanvas().getElement(),T.containsNode(b,X.getSelection().focusNode)&&(e=x.getParagraphElement(x.getCursor(m).getNode()),b=x.getDistanceFromCursor(m,e,0),c=gui.SelectionMover.createPositionIterator(x.getRootNode()),c.moveToEndOfNode(e),e=x.getDistanceFromCursor(m,e,c.unfilteredDomOffset()),0!==b||0!==e))&&(c=x.getCursorPosition(m),b=a(c+b,Math.abs(b)+Math.abs(e)),l.enqueue(b))}var X=runtime.getWindow(),x=l.getOdtDocument(),
la=new core.Utils,T=new core.DomUtils,oa=new odf.OdfUtils,ta=new gui.Clipboard,D=new gui.KeyboardHandler,sa=new gui.KeyboardHandler,ha=new core.PositionFilterChain,ra=x.getPositionFilter(),ua=!1,la=new odf.StyleNameGenerator("auto"+la.hashString(m)+"_",x.getFormatting()),aa=null,ia=g&&g.directStylingEnabled?new gui.DirectTextStyler(l,m):null,da=g&&g.directStylingEnabled?new gui.DirectParagraphStyler(l,m,la):null;runtime.assert(null!==X,"Expected to be run in an environment which has a global window, like a browser.");
ha.addFilter("BaseFilter",ra);ha.addFilter("RootFilter",x.createRootFilter(m));this.startEditing=function(){var a;a=x.getOdfCanvas().getElement();c(a,"keydown",D.handleEvent);c(a,"keypress",sa.handleEvent);c(a,"keyup",n);c(a,"beforecut",ba,!0);c(a,"cut",R);c(a,"copy",fa);c(a,"beforepaste",ca,!0);c(a,"paste",P);c(X,"mousedown",U);c(X,"mouseup",na);c(a,"contextmenu",t);x.subscribe(ops.OdtDocument.signalOperationExecuted,J);x.subscribe(ops.OdtDocument.signalOperationExecuted,ja);a=new ops.OpAddCursor;
a.init({memberid:m});l.enqueue(a);aa&&aa.saveInitialState()};this.endEditing=function(){var a;x.unsubscribe(ops.OdtDocument.signalOperationExecuted,ja);x.unsubscribe(ops.OdtDocument.signalOperationExecuted,J);a=x.getOdfCanvas().getElement();b(a,"keydown",D.handleEvent);b(a,"keypress",sa.handleEvent);b(a,"keyup",n);b(a,"cut",R);b(a,"beforecut",ba);b(a,"copy",fa);b(a,"paste",P);b(a,"beforepaste",ca);b(X,"mousedown",U);b(X,"mouseup",na);b(a,"contextmenu",t);a=new ops.OpRemoveCursor;a.init({memberid:m});
l.enqueue(a);aa&&aa.resetInitialState()};this.getInputMemberId=function(){return m};this.getSession=function(){return l};this.setUndoManager=function(a){aa&&aa.unsubscribe(gui.UndoManager.signalUndoStackChanged,E);if(aa=a)aa.setOdtDocument(x),aa.setPlaybackFunction(function(a){a.execute(x)}),aa.subscribe(gui.UndoManager.signalUndoStackChanged,E)};this.getUndoManager=function(){return aa};this.getDirectTextStyler=function(){return ia};this.getDirectParagraphStyler=function(){return da};this.destroy=
function(a){var b=da?da.destroy:function(a){a()};(ia?ia.destroy:function(a){a()})(function(c){c?a(c):b(a)})};(function(){var a=-1!==X.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;D.bind(c.Tab,b.None,function(){H("\t");return!0});D.bind(c.Left,b.None,h);D.bind(c.Right,b.None,q);D.bind(c.Up,b.None,A);D.bind(c.Down,b.None,y);D.bind(c.Backspace,b.None,W);D.bind(c.Delete,b.None,S);D.bind(c.Left,b.Shift,s);D.bind(c.Right,b.Shift,w);D.bind(c.Up,
b.Shift,v);D.bind(c.Down,b.Shift,r);D.bind(c.Home,b.None,G);D.bind(c.End,b.None,C);D.bind(c.Home,b.Ctrl,ea);D.bind(c.End,b.Ctrl,pa);D.bind(c.Home,b.Shift,L);D.bind(c.End,b.Shift,B);D.bind(c.Up,b.CtrlShift,M);D.bind(c.Down,b.CtrlShift,F);D.bind(c.Home,b.CtrlShift,N);D.bind(c.End,b.CtrlShift,qa);a?(D.bind(c.Clear,b.None,O),D.bind(c.Left,b.Meta,G),D.bind(c.Right,b.Meta,C),D.bind(c.Home,b.Meta,ea),D.bind(c.End,b.Meta,pa),D.bind(c.Left,b.MetaShift,L),D.bind(c.Right,b.MetaShift,B),D.bind(c.Up,b.AltShift,
M),D.bind(c.Down,b.AltShift,F),D.bind(c.Up,b.MetaShift,N),D.bind(c.Down,b.MetaShift,qa),D.bind(c.A,b.Meta,Z),ia&&(D.bind(c.B,b.Meta,ia.toggleBold),D.bind(c.I,b.Meta,ia.toggleItalic),D.bind(c.U,b.Meta,ia.toggleUnderline)),da&&(D.bind(c.L,b.MetaShift,da.alignParagraphLeft),D.bind(c.E,b.MetaShift,da.alignParagraphCenter),D.bind(c.R,b.MetaShift,da.alignParagraphRight),D.bind(c.J,b.MetaShift,da.alignParagraphJustified)),D.bind(c.Z,b.Meta,ma),D.bind(c.Z,b.MetaShift,ka)):(D.bind(c.A,b.Ctrl,Z),ia&&(D.bind(c.B,
b.Ctrl,ia.toggleBold),D.bind(c.I,b.Ctrl,ia.toggleItalic),D.bind(c.U,b.Ctrl,ia.toggleUnderline)),da&&(D.bind(c.L,b.CtrlShift,da.alignParagraphLeft),D.bind(c.E,b.CtrlShift,da.alignParagraphCenter),D.bind(c.R,b.CtrlShift,da.alignParagraphRight),D.bind(c.J,b.CtrlShift,da.alignParagraphJustified)),D.bind(c.Z,b.Ctrl,ma),D.bind(c.Z,b.CtrlShift,ka));sa.setDefault(function(a){var b;b=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||
a.ctrlKey||a.metaKey?!1:(H(b),!0)});sa.bind(c.Enter,b.None,I)})()};return gui.SessionController}();
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
ops.TrivialOperationRouter=function(){var l,m;this.setOperationFactory=function(g){l=g};this.setPlaybackFunction=function(g){m=g};this.push=function(g){g=g.spec();g.timestamp=(new Date).getTime();g=l.create(g);m(g)};this.close=function(g){g()};this.getHasLocalUnsyncedOpsAndUpdates=function(g){g(!0)};this.unsubscribeHasLocalUnsyncedOpsUpdates=function(g){}};
// Input 72
gui.EditInfoHandle=function(l){var m=[],g,c=l.ownerDocument,b=c.documentElement.namespaceURI;this.setEdits=function(n){m=n;var a,e,f,d;g.innerHTML="";for(n=0;n<m.length;n+=1)a=c.createElementNS(b,"div"),a.className="editInfo",e=c.createElementNS(b,"span"),e.className="editInfoColor",e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[n].memberid),f=c.createElementNS(b,"span"),f.className="editInfoAuthor",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[n].memberid),
d=c.createElementNS(b,"span"),d.className="editInfoTime",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[n].memberid),d.innerHTML=m[n].time,a.appendChild(e),a.appendChild(f),a.appendChild(d),g.appendChild(a)};this.show=function(){g.style.display="block"};this.hide=function(){g.style.display="none"};this.destroy=function(b){l.removeChild(g);b()};g=c.createElementNS(b,"div");g.setAttribute("class","editInfoHandle");g.style.display="none";l.appendChild(g)};
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
gui.EditInfoMarker=function(l,m){function g(b,c){return runtime.getWindow().setTimeout(function(){a.style.opacity=b},c)}var c=this,b,n,a,e,f;this.addEdit=function(b,c){var k=Date.now()-c;l.addEdit(b,c);n.setEdits(l.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);if(e){var m=e;runtime.getWindow().clearTimeout(m)}f&&(m=f,runtime.getWindow().clearTimeout(m));1E4>k?(g(1,0),e=g(0.5,1E4-k),f=g(0.2,2E4-k)):1E4<=k&&2E4>k?(g(0.5,0),f=g(0.2,2E4-k)):g(0.2,0)};this.getEdits=
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
gui.SessionView=function(){return function(l,m,g){function c(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid^="'+a+'"]'+e+c;a:{var h=t.firstChild;for(b=b+'[editinfo|memberid^="'+a+'"]'+e;h;){if(h.nodeType===Node.TEXT_NODE&&0===h.data.indexOf(b)){b=h;break a}h=h.nextSibling}b=null}b?b.data=c:t.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","")}function b(a){var b,c;for(c in p)p.hasOwnProperty(c)&&(b=p[c],a?b.show():b.hide())}function n(a){g.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function a(a,b){var d=g.getCaret(a);b?(d&&(d.setAvatarImageUrl(b.imageurl),d.setColor(b.color)),c(a,b.fullname,b.color)):runtime.log('MemberModel sent undefined data for member "'+a+'".')}function e(b){var c=b.getMemberId(),
d=m.getMemberModel();g.registerCursor(b,q,s);a(c,null);d.getMemberDetailsAndUpdates(c,a);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function f(b){var c=!1,d;for(d in p)if(p.hasOwnProperty(d)&&p[d].getEditInfo().getEdits().hasOwnProperty(b)){c=!0;break}c||m.getMemberModel().unsubscribeMemberDetailsUpdates(b,a)}function d(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",f=b.getElementsByTagNameNS(k,"editinfo")[0];f?(e=f.getAttributeNS(k,"id"),d=p[e]):
(e=Math.random().toString(),d=new ops.EditInfo(b,m.getOdtDocument()),d=new gui.EditInfoMarker(d,h),f=b.getElementsByTagNameNS(k,"editinfo")[0],f.setAttributeNS(k,"id",e),p[e]=d);d.addEdit(c,new Date(a))}var t,k="urn:webodf:names:editinfo",p={},h=void 0!==l.editInfoMarkersInitiallyVisible?Boolean(l.editInfoMarkersInitiallyVisible):!0,q=void 0!==l.caretAvatarsInitiallyVisible?Boolean(l.caretAvatarsInitiallyVisible):!0,s=void 0!==l.caretBlinksOnRangeSelect?Boolean(l.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=
function(){h||(h=!0,b(h))};this.hideEditInfoMarkers=function(){h&&(h=!1,b(h))};this.showCaretAvatars=function(){q||(q=!0,n(q))};this.hideCaretAvatars=function(){q&&(q=!1,n(q))};this.getSession=function(){return m};this.getCaret=function(a){return g.getCaret(a)};this.destroy=function(b){var c=m.getOdtDocument(),h=m.getMemberModel(),k=Object.keys(p).map(function(a){return p[a]});c.subscribe(ops.OdtDocument.signalCursorAdded,e);c.subscribe(ops.OdtDocument.signalCursorRemoved,f);c.subscribe(ops.OdtDocument.signalParagraphChanged,
d);g.getCarets().forEach(function(b){h.unsubscribeMemberDetailsUpdates(b.getCursor().getMemberId(),a)});t.parentNode.removeChild(t);(function r(a,c){c?b(c):a<k.length?k[a].destroy(function(b){r(a+1,b)}):b()})(0,void 0)};(function(){var a=m.getOdtDocument(),b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,e);a.subscribe(ops.OdtDocument.signalCursorRemoved,f);a.subscribe(ops.OdtDocument.signalParagraphChanged,d);t=document.createElementNS(b.namespaceURI,"style");
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
gui.CaretManager=function(l){function m(a){return d.hasOwnProperty(a)?d[a]:null}function g(){return Object.keys(d).map(function(a){return d[a]})}function c(){return l.getSession().getOdtDocument().getOdfCanvas().getElement()}function b(a){a===l.getInputMemberId()&&c().removeAttribute("tabindex");delete d[a]}function n(a){a=a.getMemberId();a===l.getInputMemberId()&&(a=m(a))&&a.refreshCursorBlinking()}function a(a){a.memberId===l.getInputMemberId()&&(a=m(a.memberId))&&a.ensureVisible()}function e(){var a=
m(l.getInputMemberId());a&&a.setFocus()}function f(){var a=m(l.getInputMemberId());a&&a.removeFocus()}var d={};this.registerCursor=function(a,b,e){var h=a.getMemberId(),f=c();b=new gui.Caret(a,b,e);d[h]=b;h===l.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+h),a.handleUpdate=b.ensureVisible,f.setAttribute("tabindex",0),f.focus());return b};this.getCaret=m;this.getCarets=g;this.destroy=function(d){var e=l.getSession().getOdtDocument(),f=c(),h=g();e.unsubscribe(ops.OdtDocument.signalParagraphChanged,
a);e.unsubscribe(ops.OdtDocument.signalCursorMoved,n);e.unsubscribe(ops.OdtDocument.signalCursorRemoved,b);f.onfocus=null;f.onblur=null;(function s(a,b){b?d(b):a<h.length?h[a].destroy(function(b){s(a+1,b)}):d()})(0,void 0)};(function(){var d=l.getSession().getOdtDocument(),g=c();d.subscribe(ops.OdtDocument.signalParagraphChanged,a);d.subscribe(ops.OdtDocument.signalCursorMoved,n);d.subscribe(ops.OdtDocument.signalCursorRemoved,b);g.onfocus=e;g.onblur=f})()};
// Input 76
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var l=new xmldom.XPath,m=runtime.getWindow();return function(g){var c=this;c.setInitialSlideMode=function(){c.startSlideMode("single")};c.keyDownHandler=function(b){if(!b.target.isContentEditable&&"input"!==b.target.nodeName)switch(b.keyCode){case 84:c.toggleToolbar();break;case 37:case 8:c.prevSlide();break;case 39:case 32:c.nextSlide();break;case 36:c.firstSlide();break;case 35:c.lastSlide()}};c.root=function(){return c.odf_canvas.odfContainer().rootElement};c.firstSlide=
function(){c.slideChange(function(b,c){return 0})};c.lastSlide=function(){c.slideChange(function(b,c){return c-1})};c.nextSlide=function(){c.slideChange(function(b,c){return b+1<c?b+1:-1})};c.prevSlide=function(){c.slideChange(function(b,c){return 1>b?-1:b-1})};c.slideChange=function(b){var g=c.getPages(c.odf_canvas.odfContainer().rootElement),a=-1,e=0;g.forEach(function(b){b=b[1];b.hasAttribute("slide_current")&&(a=e,b.removeAttribute("slide_current"));e+=1});b=b(a,g.length);-1===b&&(b=a);g[b][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=b;"cont"===c.slide_mode&&m.scrollBy(0,g[b][1].getBoundingClientRect().top-30)};c.selectSlide=function(b){c.slideChange(function(c,a){return b>=a||0>b?-1:b})};c.scrollIntoContView=function(b){var g=c.getPages(c.odf_canvas.odfContainer().rootElement);0!==g.length&&m.scrollBy(0,g[b][1].getBoundingClientRect().top-30)};c.getPages=function(b){b=b.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var c=[],a;for(a=0;a<b.length;a+=1)c.push([b[a].getAttribute("draw:name"),
b[a]]);return c};c.fillPageList=function(b,g){for(var a=c.getPages(b),e,f,d;g.firstChild;)g.removeChild(g.firstChild);for(e=0;e<a.length;e+=1)f=document.createElement("option"),d=l.getODFElementsWithXPath(a[e][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),d=0<d.length?d[0].textContent:a[e][0],f.textContent=e+1+": "+d,g.appendChild(f)};c.startSlideMode=function(b){var g=document.getElementById("pagelist"),a=c.odf_canvas.slidevisibilitycss().sheet;for(c.slide_mode=
b;0<a.cssRules.length;)a.deleteRule(0);c.selectSlide(0);"single"===c.slide_mode?(a.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),a.insertRule("draw|page[slide_current]  { z-index:2;}",1),a.insertRule("draw|page  { -webkit-transform: scale(1);}",2),c.fitToWindow(),m.addEventListener("resize",c.fitToWindow,!1)):"cont"===c.slide_mode&&m.removeEventListener("resize",c.fitToWindow,!1);c.fillPageList(c.odf_canvas.odfContainer().rootElement,g)};c.toggleToolbar=function(){var b,
g,a;b=c.odf_canvas.slidevisibilitycss().sheet;g=-1;for(a=0;a<b.cssRules.length;a+=1)if(".toolbar"===b.cssRules[a].cssText.substring(0,8)){g=a;break}-1<g?b.deleteRule(g):b.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};c.fitToWindow=function(){var b=c.getPages(c.root()),g=(m.innerHeight-40)/b[0][1].clientHeight,b=(m.innerWidth-10)/b[0][1].clientWidth,g=g<b?g:b,b=c.odf_canvas.slidevisibilitycss().sheet;b.deleteRule(2);b.insertRule("draw|page { \n-moz-transform: scale("+
g+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+g+"); -o-transform-origin: 0% 0%; -o-transform: scale("+g+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+g+"); }",2)};c.load=function(b){c.odf_canvas.load(b)};c.odf_element=g;c.odf_canvas=new odf.OdfCanvas(c.odf_element);c.odf_canvas.addListener("statereadychange",c.setInitialSlideMode);c.slide_mode="undefined";document.addEventListener("keydown",c.keyDownHandler,!1)}}();
// Input 77
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(l,m){function g(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function c(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(){var a=l.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!q)||(a=a.getRangeAt(0),q.setPoint(a.startContainer,a.startOffset))}function n(){var a=l.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();q&&q.node()&&(b=q.node(),c=b.ownerDocument.createRange(),
c.setStart(b,q.position()),c.collapse(!0),a.addRange(c))}function a(a){var d=a.charCode||a.keyCode;if(q=null,q&&37===d)b(),q.stepBackward(),n();else if(16<=d&&20>=d||33<=d&&40>=d)return;c(a)}function e(a){c(a)}function f(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&f(b),b=b.nextSibling||b.parentNode;var c,d,e,b=a.attributes;c="";for(e=b.length-1;0<=e;e-=1)d=b.item(e),c=c+" "+d.nodeName+'="'+d.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(d=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&d.test(c.nodeValue)&&c.parentNode.removeChild(c)}function d(a,b){for(var c=a.firstChild,e,h,f;c&&c!==a;){if(c.nodeType===Node.ELEMENT_NODE)for(d(c,b),e=c.attributes,f=e.length-1;0<=f;f-=1)h=e.item(f),"http://www.w3.org/2000/xmlns/"!==h.namespaceURI||b[h.nodeValue]||(b[h.nodeValue]=h.localName);c=c.nextSibling||c.parentNode}}function t(){var a=l.ownerDocument.createElement("style"),b;b={};d(l,b);
var c={},e,h,f=0;for(e in b)if(b.hasOwnProperty(e)&&e){h=b[e];if(!h||c.hasOwnProperty(h)||"xmlns"===h){do h="ns"+f,f+=1;while(c.hasOwnProperty(h));b[e]=h}c[h]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+k;a.appendChild(l.ownerDocument.createTextNode(b));m=m.parentNode.replaceChild(a,m)}var k,p,h,q=null;l.id||(l.id="xml"+String(Math.random()).substring(2));p="#"+l.id+" ";k=p+"*,"+p+":visited, "+p+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
p+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+p+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+p+"{overflow: auto;}\n";(function(b){g(b,"click",e);g(b,"keydown",a);g(b,"drop",c);g(b,"dragend",c);g(b,"beforepaste",c);g(b,"paste",c)})(l);this.updateCSS=t;this.setXML=function(a){a=a.documentElement||a;h=a=l.ownerDocument.importNode(a,!0);for(f(a);l.lastChild;)l.removeChild(l.lastChild);l.appendChild(a);t();q=new core.PositionIterator(a)};this.getXML=
function(){return h}};
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
gui.UndoStateRules=function(){function l(g){return g.spec().optype}function m(g){switch(l(g)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=l;this.isEditOperation=m;this.isPartOfOperationSet=function(g,c){if(m(g)){if(0===c.length)return!0;var b;if(b=m(c[c.length-1]))a:{b=c.filter(m);var n=l(g),a;b:switch(n){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&n===l(b[0])){if(1===b.length){b=!0;break a}n=b[b.length-2].spec().position;
b=b[b.length-1].spec().position;a=g.spec().position;if(b===a-(b-n)){b=!0;break a}}b=!1}return b}return!0}};
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
gui.TrivialUndoManager=function(l){function m(){s.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:a.hasUndoStates(),redoAvailable:a.hasRedoStates()})}function g(){p!==d&&p!==h[h.length-1]&&h.push(p)}function c(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);e.normalizeTextNodes(b)}function b(a){return Object.keys(a).map(function(b){return a[b]})}function n(a){function c(a){var b=a.spec();if(h[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete h[b.memberid],f-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},h={},f,g=a.pop();k.getCursors().forEach(function(a){h[a.getMemberId()]=!0});for(f=Object.keys(h).length;g&&0<f;)g.reverse(),g.forEach(c),g=a.pop();return b(d).concat(b(e))}var a=this,e=new core.DomUtils,f,d=[],t,k,p=[],h=[],q=[],s=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=l||new gui.UndoStateRules;this.subscribe=function(a,b){s.subscribe(a,b)};this.unsubscribe=function(a,b){s.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<h.length};this.hasRedoStates=function(){return 0<q.length};this.setOdtDocument=function(a){k=a};this.resetInitialState=function(){h.length=0;q.length=0;d.length=0;p.length=0;f=null;m()};this.saveInitialState=function(){var a=k.getOdfCanvas().odfContainer(),b=k.getOdfCanvas().getAnnotationManager();b&&b.forgetAnnotations();f=a.rootElement.cloneNode(!0);
k.getOdfCanvas().refreshAnnotations();a=f;e.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(c);e.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(c);g();h.unshift(d);p=d=n(h);h.length=0;q.length=0;m()};this.setPlaybackFunction=function(a){t=a};this.onOperationExecuted=function(a){q.length=0;w.isEditOperation(a)&&p===d||!w.isPartOfOperationSet(a,p)?(g(),p=[a],h.push(p),s.emit(gui.UndoManager.signalUndoStateCreated,{operations:p}),m()):(p.push(a),s.emit(gui.UndoManager.signalUndoStateModified,
{operations:p}))};this.moveForward=function(a){for(var b=0,c;a&&q.length;)c=q.pop(),h.push(c),c.forEach(t),a-=1,b+=1;b&&(p=h[h.length-1],m());return b};this.moveBackward=function(a){for(var b=k.getOdfCanvas(),c=b.odfContainer(),e=0;a&&h.length;)q.push(h.pop()),a-=1,e+=1;e&&(c.setRootElement(f.cloneNode(!0)),b.setOdfContainer(c,!0),s.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),k.getCursors().forEach(function(a){k.removeCursor(a.getMemberId())}),d.forEach(t),h.forEach(function(a){a.forEach(t)}),
b.refreshCSS(),p=h[h.length-1]||d,m());return e}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
ops.OdtDocument=function(l){function m(){var a=l.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function g(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var d=f[a].getNode();return b(c)===b(d)?t:k}}function c(a){var b=
gui.SelectionMover.createPositionIterator(m());for(a+=1;0<a&&b.nextPosition();)1===p.acceptPosition(b)&&(a-=1);return b}function b(a){return e.getParagraphElement(a)}function n(a){return l.getFormatting().getStyleElement(a,"paragraph")}var a=this,e,f={},d=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonParagraphStyleCreated,
ops.OdtDocument.signalCommonParagraphStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),t=core.PositionFilter.FilterResult.FILTER_ACCEPT,k=core.PositionFilter.FilterResult.FILTER_REJECT,p;this.getIteratorAtPosition=c;this.upgradeWhitespacesAtPosition=function(a){a=c(a);var b,d,f;a.previousPosition();a.previousPosition();for(f=-1;1>=f;f+=1){b=a.container();d=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[d]&&
e.isSignificantWhitespace(b,d)){runtime.assert(" "===b.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var g=b.ownerDocument.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s");g.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(d,1);0<d&&(b=b.splitText(d));b.parentNode.insertBefore(g,b);b=g;a.moveToEndOfNode(b)}a.nextPosition()}};this.getParagraphStyleElement=n;this.getParagraphElement=b;this.getParagraphStyleAttributes=function(a){return(a=
n(a))?l.getFormatting().getInheritedStyleAttributes(a):null};this.getPositionInTextNode=function(b,c){var d=gui.SelectionMover.createPositionIterator(m()),e=null,g,k=0,l=null,n=b;runtime.assert(0<=b,"position must be >= 0");1===p.acceptPosition(d)?(g=d.container(),g.nodeType===Node.TEXT_NODE&&(e=g,k=0)):b+=1;for(;0<b||null===e;){if(!d.nextPosition())return null;if(1===p.acceptPosition(d))if(b-=1,g=d.container(),g.nodeType===Node.TEXT_NODE)g!==e?(e=g,k=d.domOffset()):k+=1;else if(null!==e){if(0===
b){k=e.length;break}e=null}else if(0===b){e=m().ownerDocument.createTextNode("");g.insertBefore(e,d.rightNode());k=0;break}}if(null===e)return null;if(c&&f[c]&&a.getCursorPosition(c)===n){for(l=f[c].getNode();0===k&&l.nextSibling&&"cursor"===l.nextSibling.localName;)l.parentNode.insertBefore(l,l.nextSibling.nextSibling);l&&0<e.length&&(e=m().ownerDocument.createTextNode(""),k=0,l.parentNode.insertBefore(e,l.nextSibling))}for(;0===k&&(e.previousSibling&&"cursor"===e.previousSibling.localName)&&(g=
e.previousSibling,0<e.length&&(e=m().ownerDocument.createTextNode("")),g.parentNode.insertBefore(e,g),l!==g););for(;e.previousSibling&&e.previousSibling.nodeType===Node.TEXT_NODE;)e.previousSibling.appendData(e.data),k=e.length+e.previousSibling.length,e=e.previousSibling,e.parentNode.removeChild(e.nextSibling);return{textNode:e,offset:k}};this.fixCursorPositions=function(b){var c,d,e,g=new core.PositionFilterChain;g.addFilter("BaseFilter",a.getPositionFilter());for(c in f)f.hasOwnProperty(c)&&(g.addFilter("RootFilter",
a.createRootFilter(c)),d=f[c],e=d.getStepCounter(),e.isPositionWalkable(g)?0===a.getCursorSelection(c).length&&d.move(0):(e=e.countStepsToValidPosition(g),d.move(e),c===b&&a.emit(ops.OdtDocument.signalCursorMoved,d)),g.removeFilter("RootFilter"))};this.getWalkableParagraphLength=function(a){var d=c(0),e=0;d.setUnfilteredPosition(a,0);do{if(b(d.container())!==a)break;1===p.acceptPosition(d)&&(e+=1)}while(d.nextPosition());return e};this.getDistanceFromCursor=function(a,b,c){a=f[a];var d=0;runtime.assert(null!==
b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,d=a(b,c,p));return d};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,m(),0)};this.getCursorSelection=function(a){var b;a=f[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(m(),0,p),b=b(a.getAnchorNode(),0,p));return{position:c+b,length:-b}};this.getPositionFilter=function(){return p};this.getOdfCanvas=function(){return l};this.getRootNode=m;this.getDOM=
function(){return m().ownerDocument};this.getCursor=function(a){return f[a]};this.getCursors=function(){var a=[],b;for(b in f)f.hasOwnProperty(b)&&a.push(f[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countForwardSteps(1,p),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!f[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);
a.move(b);f[c]=a};this.removeCursor=function(b){var c=f[b];return c?(c.removeFromOdtDocument(),delete f[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=l.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return l.getFormatting()};this.getTextElements=
function(a,b){return e.getTextElements(a,b)};this.getParagraphElements=function(a){return e.getParagraphElements(a)};this.emit=function(a,b){d.emit(a,b)};this.subscribe=function(a,b){d.subscribe(a,b)};this.unsubscribe=function(a,b){d.unsubscribe(a,b)};this.createRootFilter=function(a){return new g(a)};this.close=function(a){a()};this.destroy=function(a){a()};p=new function(){function a(b,c,d){var f,g;if(c&&(f=e.lookLeftForCharacter(c),1===f||2===f&&(e.scanRightForAnyCharacter(d)||e.scanRightForAnyCharacter(e.nextNode(b)))))return t;
f=null===c&&e.isParagraph(b);g=e.lookRightForCharacter(d);if(f)return g?t:e.scanRightForAnyCharacter(d)?k:t;if(!g)return k;c=c||e.previousNode(b);return e.scanLeftForAnyCharacter(c)?k:t}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,f,g,l;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return k;if(d===Node.TEXT_NODE){if(!e.isGroupingElement(c.parentNode)||e.isWithinTrackedChanges(c.parentNode,m()))return k;d=b.unfilteredDomOffset();f=c.data;runtime.assert(d!==f.length,"Unexpected offset.");
if(0<d){b=f.substr(d-1,1);if(!e.isODFWhitespace(b))return t;if(1<d)if(b=f.substr(d-2,1),!e.isODFWhitespace(b))g=t;else{if(!e.isODFWhitespace(f.substr(0,d)))return k}else l=e.previousNode(c),e.scanLeftForNonWhitespace(l)&&(g=t);if(g===t)return e.isTrailingWhitespace(c,d)?k:t;g=f.substr(d,1);return e.isODFWhitespace(g)?k:e.scanLeftForAnyCharacter(e.previousNode(c))?k:t}l=b.leftNode();g=c;c=c.parentNode;g=a(c,l,g)}else!e.isGroupingElement(c)||e.isWithinTrackedChanges(c,m())?g=k:(l=b.leftNode(),g=b.rightNode(),
g=a(c,l,g));return g}};e=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalCommonParagraphStyleCreated="style/created";ops.OdtDocument.signalCommonParagraphStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";
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
ops.Session=function(l){var m=new ops.OperationFactory,g=new ops.OdtDocument(l),c=new ops.TrivialMemberModel,b=null;this.setMemberModel=function(b){c=b};this.setOperationFactory=function(c){m=c;b&&b.setOperationFactory(m)};this.setOperationRouter=function(c){b=c;c.setPlaybackFunction(function(a){a.execute(g);g.emit(ops.OdtDocument.signalOperationExecuted,a)});c.setOperationFactory(m)};this.getMemberModel=function(){return c};this.getOperationFactory=function(){return m};this.getOdtDocument=function(){return g};
this.enqueue=function(c){b.push(c)};this.close=function(l){b.close(function(a){a?l(a):c.close(function(a){a?l(a):g.close(l)})})};this.destroy=function(b){g.destroy(b)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 83
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\noffice|text * draw|text-box {\n    /** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
