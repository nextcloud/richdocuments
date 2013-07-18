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
Runtime.prototype.read=function(h,m,f,n){};Runtime.prototype.readFile=function(h,m,f){};Runtime.prototype.readFileSync=function(h,m){};Runtime.prototype.loadXML=function(h,m){};Runtime.prototype.writeFile=function(h,m,f){};Runtime.prototype.isFile=function(h,m){};Runtime.prototype.getFileSize=function(h,m){};Runtime.prototype.deleteFile=function(h,m){};Runtime.prototype.log=function(h,m){};Runtime.prototype.setTimeout=function(h,m){};Runtime.prototype.libraryPaths=function(){};
Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(h){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(h,m,f){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(h,m){function f(e){var a="",g,d=e.length;for(g=0;g<d;g+=1)a+=String.fromCharCode(e[g]&255);return a}function n(e){var a="",g,d=e.length,b,r,k,l;for(g=0;g<d;g+=1)b=e[g],128>b?a+=String.fromCharCode(b):(g+=1,r=e[g],194<=b&&224>b?a+=String.fromCharCode((b&31)<<6|r&63):(g+=1,k=e[g],224<=b&&240>b?a+=String.fromCharCode((b&15)<<12|(r&63)<<6|k&63):(g+=1,l=e[g],240<=b&&245>b&&(b=(b&7)<<18|(r&63)<<12|(k&63)<<6|l&63,b-=65536,a+=String.fromCharCode((b>>10)+55296,(b&1023)+56320)))));
return a}var q;"utf8"===m?q=n(h):("binary"!==m&&this.log("Unsupported encoding: "+m),q=f(h));return q};Runtime.getVariable=function(h){try{return eval(h)}catch(m){}};Runtime.toJson=function(h){return JSON.stringify(h)};Runtime.fromJson=function(h){return JSON.parse(h)};Runtime.getFunctionName=function(h){return void 0===h.name?(h=/function\s+(\w+)/.exec(h))&&h[1]:h.name};
function BrowserRuntime(h){function m(e,a){var g,d,b;void 0!==a?b=e:a=e;h?(d=h.ownerDocument,b&&(g=d.createElement("span"),g.className=b,g.appendChild(d.createTextNode(b)),h.appendChild(g),h.appendChild(d.createTextNode(" "))),g=d.createElement("span"),0<a.length&&"<"===a[0]?g.innerHTML=a:g.appendChild(d.createTextNode(a)),h.appendChild(g),h.appendChild(d.createElement("br"))):console&&console.log(a);"alert"===b&&alert(a)}var f=this,n={},q=window.ArrayBuffer&&window.Uint8Array;q&&(Uint8Array.prototype.slice=
function(e,a){void 0===a&&(void 0===e&&(e=0),a=this.length);var g=this.subarray(e,a),d,b;a-=e;d=new Uint8Array(new ArrayBuffer(a));for(b=0;b<a;b+=1)d[b]=g[b];return d});this.ByteArray=q?function(e){return new Uint8Array(new ArrayBuffer(e))}:function(e){var a=[];a.length=e;return a};this.concatByteArrays=q?function(e,a){var g,d=e.length,b=a.length,r=new this.ByteArray(d+b);for(g=0;g<d;g+=1)r[g]=e[g];for(g=0;g<b;g+=1)r[g+d]=a[g];return r}:function(e,a){return e.concat(a)};this.byteArrayFromArray=function(e){return e.slice()};
this.byteArrayFromString=function(e,a){var g;if("utf8"===a){g=e.length;var d,b,r,k=0;for(b=0;b<g;b+=1)r=e.charCodeAt(b),k+=1+(128<r)+(2048<r);d=new f.ByteArray(k);for(b=k=0;b<g;b+=1)r=e.charCodeAt(b),128>r?(d[k]=r,k+=1):2048>r?(d[k]=192|r>>>6,d[k+1]=128|r&63,k+=2):(d[k]=224|r>>>12&15,d[k+1]=128|r>>>6&63,d[k+2]=128|r&63,k+=3)}else for("binary"!==a&&f.log("unknown encoding: "+a),g=e.length,d=new f.ByteArray(g),b=0;b<g;b+=1)d[b]=e.charCodeAt(b)&255;return g=d};this.byteArrayToString=Runtime.byteArrayToString;
this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=function(e,a,g){function d(){var k;4===b.readyState&&(0!==b.status||b.responseText?200===b.status||0===b.status?(k="binary"===a?null!==b.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(b.responseBody)).toArray():f.byteArrayFromString(b.responseText,"binary"):b.responseText,n[e]=k,g(null,k)):g(b.responseText||b.statusText):g("File "+e+" is empty."))}if(n.hasOwnProperty(e))g(null,
n[e]);else{var b=new XMLHttpRequest;b.open("GET",e,!0);b.onreadystatechange=d;b.overrideMimeType&&("binary"!==a?b.overrideMimeType("text/plain; charset="+a):b.overrideMimeType("text/plain; charset=x-user-defined"));try{b.send(null)}catch(r){g(r.message)}}};this.read=function(e,a,g,d){function b(){var b;4===r.readyState&&(0!==r.status||r.responseText?200===r.status||0===r.status?(r.response?(b=r.response,b=new Uint8Array(b)):b=null!==r.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(r.responseBody)).toArray():
f.byteArrayFromString(r.responseText,"binary"),n[e]=b,d(null,b.slice(a,a+g))):d(r.responseText||r.statusText):d("File "+e+" is empty."))}if(n.hasOwnProperty(e))d(null,n[e].slice(a,a+g));else{var r=new XMLHttpRequest;r.open("GET",e,!0);r.onreadystatechange=b;r.overrideMimeType&&r.overrideMimeType("text/plain; charset=x-user-defined");r.responseType="arraybuffer";try{r.send(null)}catch(k){d(k.message)}}};this.readFileSync=function(e,a){var g=new XMLHttpRequest,d;g.open("GET",e,!1);g.overrideMimeType&&
("binary"!==a?g.overrideMimeType("text/plain; charset="+a):g.overrideMimeType("text/plain; charset=x-user-defined"));try{if(g.send(null),200===g.status||0===g.status)d=g.responseText}catch(b){}return d};this.writeFile=function(e,a,g){n[e]=a;var d=new XMLHttpRequest;d.open("PUT",e,!0);d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200<=d.status&&300>d.status||0===d.status?g(null):g("Status "+String(d.status)+": "+d.responseText||d.statusText):g("File "+e+" is empty."))};
a=a.buffer&&!d.sendAsBinary?a.buffer:f.byteArrayToString(a,"binary");try{d.sendAsBinary?d.sendAsBinary(a):d.send(a)}catch(b){f.log("HUH? "+b+" "+a),g(b.message)}};this.deleteFile=function(e,a){delete n[e];var g=new XMLHttpRequest;g.open("DELETE",e,!0);g.onreadystatechange=function(){4===g.readyState&&(200>g.status&&300<=g.status?a(g.responseText):a(null))};g.send(null)};this.loadXML=function(e,a){var g=new XMLHttpRequest;g.open("GET",e,!0);g.overrideMimeType&&g.overrideMimeType("text/xml");g.onreadystatechange=
function(){4===g.readyState&&(0!==g.status||g.responseText?200===g.status||0===g.status?a(null,g.responseXML):a(g.responseText):a("File "+e+" is empty."))};try{g.send(null)}catch(d){a(d.message)}};this.isFile=function(e,a){f.getFileSize(e,function(g){a(-1!==g)})};this.getFileSize=function(e,a){var g=new XMLHttpRequest;g.open("HEAD",e,!0);g.onreadystatechange=function(){if(4===g.readyState){var d=g.getResponseHeader("Content-Length");d?a(parseInt(d,10)):a(-1)}};g.send(null)};this.log=m;this.assert=
function(e,a,g){if(!e)throw m("alert","ASSERTION FAILED:\n"+a),g&&g(),a;};this.setTimeout=function(e,a){setTimeout(function(){e()},a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(e){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(e){return(new DOMParser).parseFromString(e,"text/xml")};this.exit=function(e){m("Calling exit with code "+String(e)+", but exit() is not implemented.")};
this.getWindow=function(){return window}}
function NodeJSRuntime(){function h(a,d,b){a=n.resolve(q,a);"binary"!==d?f.readFile(a,d,b):f.readFile(a,null,b)}var m=this,f=require("fs"),n=require("path"),q="",e,a;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var d=new Buffer(a.length),b,r=a.length;for(b=0;b<r;b+=1)d[b]=a[b];return d};this.concatByteArrays=function(a,d){var b=new Buffer(a.length+d.length);a.copy(b,0,0);d.copy(b,a.length,0);return b};this.byteArrayFromString=function(a,d){return new Buffer(a,
d)};this.byteArrayToString=function(a,d){return a.toString(d)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=h;this.loadXML=function(a,d){h(a,"utf-8",function(b,a){if(b)return d(b);d(null,m.parseXML(a))})};this.writeFile=function(a,d,b){a=n.resolve(q,a);f.writeFile(a,d,"binary",function(a){b(a||null)})};this.deleteFile=function(a,d){a=n.resolve(q,a);f.unlink(a,d)};this.read=function(a,d,b,e){a=n.resolve(q,a);f.open(a,"r+",666,function(a,
l){if(a)e(a);else{var c=new Buffer(b);f.read(l,c,0,b,d,function(b,a){f.close(l);e(b,c)})}})};this.readFileSync=function(a,d){return d?"binary"===d?f.readFileSync(a,null):f.readFileSync(a,d):""};this.isFile=function(a,d){a=n.resolve(q,a);f.stat(a,function(b,a){d(!b&&a.isFile())})};this.getFileSize=function(a,d){a=n.resolve(q,a);f.stat(a,function(b,a){b?d(-1):d(a.size)})};this.log=function(a,d){var b;void 0!==d?b=a:d=a;"alert"===b&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(d+
"\n");"alert"===b&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,d,b){a||(process.stderr.write("ASSERTION FAILED: "+d),b&&b())};this.setTimeout=function(a,d){setTimeout(function(){a()},d)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){q=a};this.currentDirectory=function(){return q};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=function(a){return e.parseFromString(a,"text/xml")};
this.exit=process.exit;this.getWindow=function(){return null};e=new (require("xmldom").DOMParser);a=m.parseXML("<a/>").implementation}
function RhinoRuntime(){function h(a,g){var d;void 0!==g?d=a:g=a;"alert"===d&&print("\n!!!!! ALERT !!!!!");print(g);"alert"===d&&print("!!!!! ALERT !!!!!")}var m=this,f=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),n,q,e="";f.setValidating(!1);f.setNamespaceAware(!0);f.setExpandEntityReferences(!1);f.setSchema(null);q=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,g){var d=new Packages.java.io.FileReader(g);return new Packages.org.xml.sax.InputSource(d)}});n=f.newDocumentBuilder();
n.setEntityResolver(q);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,g){var d=[],b,e=a.length;for(b=0;b<e;b+=1)d[b]=a.charCodeAt(b)&255;return d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,g){return a.concat(g)};this.loadXML=function(a,g){var d=new Packages.java.io.File(a),b;try{b=n.parse(d)}catch(e){print(e);
g(e);return}g(null,b)};this.readFile=function(a,g,d){e&&(a=e+"/"+a);var b=new Packages.java.io.File(a),r="binary"===g?"latin1":g;b.isFile()?(a=readFile(a,r),"binary"===g&&(a=m.byteArrayFromString(a,"binary")),d(null,a)):d(a+" is not a file.")};this.writeFile=function(a,g,d){e&&(a=e+"/"+a);a=new Packages.java.io.FileOutputStream(a);var b,r=g.length;for(b=0;b<r;b+=1)a.write(g[b]);a.close();d(null)};this.deleteFile=function(a,g){e&&(a=e+"/"+a);(new Packages.java.io.File(a))["delete"]()?g(null):g("Could not delete "+
a)};this.read=function(a,g,d,b){e&&(a=e+"/"+a);var r;r=a;var k="binary";(new Packages.java.io.File(r)).isFile()?("binary"===k&&(k="latin1"),r=readFile(r,k)):r=null;r?b(null,this.byteArrayFromString(r.substring(g,g+d),"binary")):b("Cannot read "+a)};this.readFileSync=function(a,e){return e?readFile(a,e):""};this.isFile=function(a,g){e&&(a=e+"/"+a);var d=new Packages.java.io.File(a);g(d.isFile())};this.getFileSize=function(a,g){e&&(a=e+"/"+a);var d=new Packages.java.io.File(a);g(d.length())};this.log=
h;this.assert=function(a,e,d){a||(h("alert","ASSERTION FAILED: "+e),d&&d())};this.setTimeout=function(a,e){a()};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){e=a};this.currentDirectory=function(){return e};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return n.getDOMImplementation()};this.parseXML=function(a){return n.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function h(f){var q=f[0],e;e=eval("if (typeof "+q+" === 'undefined') {eval('"+q+" = {};');}"+q);for(q=1;q<f.length-1;q+=1)e=e.hasOwnProperty(f[q])?e[f[q]]:e[f[q]]={};return e[f[f.length-1]]}var m={},f={};runtime.loadClass=function(n){function q(a){a=a.replace(/\./g,"/")+".js";var b=runtime.libraryPaths(),e,k,l;runtime.currentDirectory&&b.push(runtime.currentDirectory());for(e=0;e<b.length;e+=1){k=b[e];if(!f.hasOwnProperty(k))try{l=runtime.readFileSync(b[e]+"/manifest.js","utf8"),f[k]=
l&&l.length?eval(l):null}catch(c){f[k]=null,runtime.log("Cannot load manifest for "+k+".")}l=null;if((k=f[k])&&k.indexOf&&-1!==k.indexOf(a))return b[e]+"/"+a}return null}function e(a){var b,e;e=q(a);if(!e)throw a+" is not listed in any manifest.js.";try{b=runtime.readFileSync(e,"utf8")}catch(k){throw runtime.log("Error loading "+a+" "+k),k;}if(void 0===b)throw"Cannot load class "+a;b=b+("\n//# sourceURL="+e)+("\n//@ sourceURL="+e);try{b=eval(a+" = eval(code);")}catch(l){throw runtime.log("Error loading "+
a+" "+l),l;}return b}if(!IS_COMPILED_CODE&&!m.hasOwnProperty(n)){var a=n.split("."),g;g=h(a);if(!g&&(g=e(n),!g||Runtime.getFunctionName(g)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];m[n]=!0}}})();
(function(h){function m(f){if(f.length){var n=f[0];runtime.readFile(n,"utf8",function(q,e){function a(){var b;(b=eval(d))&&runtime.exit(b)}var g="";runtime.libraryPaths();var d=e;-1!==n.indexOf("/")&&(g=n.substring(0,n.indexOf("/")));runtime.setCurrentDirectory(g);q||null===d?(runtime.log(q),runtime.exit(1)):a.apply(null,f)})}}h=h?Array.prototype.slice.call(h):[];"NodeJSRuntime"===runtime.type()?m(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?m(h):m(h.slice(1))})("undefined"!==String(typeof arguments)&&
arguments);
// Input 2
core.Base64=function(){function h(b){var a=[],c,k=b.length;for(c=0;c<k;c+=1)a[c]=b.charCodeAt(c)&255;return a}function m(b){var a,c="",k,p=b.length-2;for(k=0;k<p;k+=3)a=b[k]<<16|b[k+1]<<8|b[k+2],c+=u[a>>>18],c+=u[a>>>12&63],c+=u[a>>>6&63],c+=u[a&63];k===p+1?(a=b[k]<<4,c+=u[a>>>6],c+=u[a&63],c+="=="):k===p&&(a=b[k]<<10|b[k+1]<<2,c+=u[a>>>12],c+=u[a>>>6&63],c+=u[a&63],c+="=");return c}function f(b){b=b.replace(/[^A-Za-z0-9+\/]+/g,"");var a=[],c=b.length%4,k,p=b.length,d;for(k=0;k<p;k+=4)d=(t[b.charAt(k)]||
0)<<18|(t[b.charAt(k+1)]||0)<<12|(t[b.charAt(k+2)]||0)<<6|(t[b.charAt(k+3)]||0),a.push(d>>16,d>>8&255,d&255);a.length-=[0,0,2,1][c];return a}function n(b){var a=[],c,k=b.length,p;for(c=0;c<k;c+=1)p=b[c],128>p?a.push(p):2048>p?a.push(192|p>>>6,128|p&63):a.push(224|p>>>12&15,128|p>>>6&63,128|p&63);return a}function q(b){var a=[],c,k=b.length,p,d,l;for(c=0;c<k;c+=1)p=b[c],128>p?a.push(p):(c+=1,d=b[c],224>p?a.push((p&31)<<6|d&63):(c+=1,l=b[c],a.push((p&15)<<12|(d&63)<<6|l&63)));return a}function e(b){return m(h(b))}
function a(b){return String.fromCharCode.apply(String,f(b))}function g(b){return q(h(b))}function d(b){b=q(b);for(var a="",c=0;c<b.length;)a+=String.fromCharCode.apply(String,b.slice(c,c+45E3)),c+=45E3;return a}function b(b,a,c){var k="",p,d,l;for(l=a;l<c;l+=1)a=b.charCodeAt(l)&255,128>a?k+=String.fromCharCode(a):(l+=1,p=b.charCodeAt(l)&255,224>a?k+=String.fromCharCode((a&31)<<6|p&63):(l+=1,d=b.charCodeAt(l)&255,k+=String.fromCharCode((a&15)<<12|(p&63)<<6|d&63)));return k}function r(a,c){function k(){var e=
l+p;e>a.length&&(e=a.length);d+=b(a,l,e);l=e;e=l===a.length;c(d,e)&&!e&&runtime.setTimeout(k,0)}var p=1E5,d="",l=0;a.length<p?c(b(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),k())}function k(b){return n(h(b))}function l(b){return String.fromCharCode.apply(String,n(b))}function c(b){return String.fromCharCode.apply(String,n(h(b)))}var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";(function(){var b=[],a;for(a=0;26>a;a+=1)b.push(65+a);for(a=0;26>a;a+=1)b.push(97+a);for(a=
0;10>a;a+=1)b.push(48+a);b.push(43);b.push(47);return b})();var t=function(b){var a={},c,k;c=0;for(k=b.length;c<k;c+=1)a[b.charAt(c)]=c;return a}(u),s,p,C=runtime.getWindow(),y,v;C&&C.btoa?(y=function(b){return C.btoa(b)},s=function(b){return y(c(b))}):(y=e,s=function(b){return m(k(b))});C&&C.atob?(v=function(b){return C.atob(b)},p=function(a){a=v(a);return b(a,0,a.length)}):(v=a,p=function(b){return d(f(b))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=m;this.convertBase64ToByteArray=
this.convertBase64ToUTF8Array=f;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=n;this.convertByteArrayToUTF16Array=this.convertUTF8ArrayToUTF16Array=q;this.convertUTF8StringToBase64=e;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=g;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=d;this.convertUTF8StringToUTF16String=r;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=k;this.convertUTF16ArrayToUTF8String=l;this.convertUTF16StringToUTF8String=
c;this.convertUTF16StringToBase64=s;this.convertBase64ToUTF16String=p;this.fromBase64=a;this.toBase64=e;this.atob=v;this.btoa=y;this.utob=c;this.btou=r;this.encode=s;this.encodeURI=function(b){return s(b).replace(/[+\/]/g,function(b){return"+"===b?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(b){return p(b.replace(/[\-_]/g,function(b){return"-"===b?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function h(){this.dl=this.fc=0}function m(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function f(b,a,c,k){this.good_length=b;this.max_lazy=a;this.nice_length=c;this.max_chain=k}function n(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=q;this.off=0}var q=8192,e,a,g,d,b=null,r,k,l,c,u,t,s,p,C,y,v,x,N,A,F,O,z,H,D,G,T,ba,V,ca,U,W,M,S,R,I,B,J,P,Q,Y,E,$,w,aa,ga,K,L,Z,X,sa,ha,ja,ea,ia,ma,ta,ua=[0,0,0,
0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ka=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],Ka=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ya=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],na;na=[new f(0,0,0,0),new f(4,4,8,4),new f(4,5,16,8),new f(4,6,32,32),new f(4,4,16,16),new f(8,16,32,32),new f(8,16,128,128),new f(8,32,128,256),new f(32,128,258,1024),new f(32,258,258,4096)];var oa=function(c){b[k+r++]=c;if(k+r===q){var p;if(0!==r){null!==e?(c=e,e=e.next):c=new n;
c.next=null;c.len=c.off=0;null===a?a=g=c:g=g.next=c;c.len=r-k;for(p=0;p<c.len;p++)c.ptr[p]=b[k+p];r=k=0}}},pa=function(a){a&=65535;k+r<q-2?(b[k+r++]=a&255,b[k+r++]=a>>>8):(oa(a&255),oa(a>>>8))},qa=function(){v=(v<<5^c[z+3-1]&255)&8191;x=s[32768+v];s[z&32767]=x;s[32768+v]=z},da=function(b,a){C>16-a?(p|=b<<C,pa(p),p=b>>16-C,C+=a-16):(p|=b<<C,C+=a)},fa=function(b,a){da(a[b].fc,a[b].dl)},za=function(b,a,c){return b[a].fc<b[c].fc||b[a].fc===b[c].fc&&$[a]<=$[c]},Aa=function(b,a,c){var k;for(k=0;k<c&&ta<
ma.length;k++)b[a+k]=ma.charCodeAt(ta++)&255;return k},va=function(){var b,a,k=65536-G-z;if(-1===k)k--;else if(65274<=z){for(b=0;32768>b;b++)c[b]=c[b+32768];H-=32768;z-=32768;y-=32768;for(b=0;8192>b;b++)a=s[32768+b],s[32768+b]=32768<=a?a-32768:0;for(b=0;32768>b;b++)a=s[b],s[b]=32768<=a?a-32768:0;k+=32768}D||(b=Aa(c,z+G,k),0>=b?D=!0:G+=b)},Ba=function(b){var a=T,k=z,p,d=O,l=32506<z?z-32506:0,e=z+258,t=c[k+d-1],g=c[k+d];O>=ca&&(a>>=2);do if(p=b,c[p+d]===g&&c[p+d-1]===t&&c[p]===c[k]&&c[++p]===c[k+1]){k+=
2;p++;do++k;while(c[k]===c[++p]&&c[++k]===c[++p]&&c[++k]===c[++p]&&c[++k]===c[++p]&&c[++k]===c[++p]&&c[++k]===c[++p]&&c[++k]===c[++p]&&c[++k]===c[++p]&&k<e);p=258-(e-k);k=e-258;if(p>d){H=b;d=p;if(258<=p)break;t=c[k+d-1];g=c[k+d]}}while((b=s[b&32767])>l&&0!==--a);return d},la=function(b,a){t[Z++]=a;0===b?U[a].fc++:(b--,U[w[a]+256+1].fc++,W[(256>b?aa[b]:aa[256+(b>>7)])&255].fc++,u[X++]=b,ha|=ja);ja<<=1;0===(Z&7)&&(L[sa++]=ha,ha=0,ja=1);if(2<V&&0===(Z&4095)){var c=8*Z,k=z-y,p;for(p=0;30>p;p++)c+=W[p].fc*
(5+ka[p]);c>>=3;if(X<parseInt(Z/2,10)&&c<parseInt(k/2,10))return!0}return 8191===Z||8192===X},wa=function(b,a){for(var c=Q[a],k=a<<1;k<=Y;){k<Y&&za(b,Q[k+1],Q[k])&&k++;if(za(b,c,Q[k]))break;Q[a]=Q[k];a=k;k<<=1}Q[a]=c},Ca=function(b,a){var c=0;do c|=b&1,b>>=1,c<<=1;while(0<--a);return c>>1},Da=function(b,a){var c=[];c.length=16;var k=0,p;for(p=1;15>=p;p++)k=k+P[p-1]<<1,c[p]=k;for(k=0;k<=a;k++)p=b[k].dl,0!==p&&(b[k].fc=Ca(c[p]++,p))},xa=function(b){var a=b.dyn_tree,c=b.static_tree,k=b.elems,p,d=-1,
l=k;Y=0;E=573;for(p=0;p<k;p++)0!==a[p].fc?(Q[++Y]=d=p,$[p]=0):a[p].dl=0;for(;2>Y;)p=Q[++Y]=2>d?++d:0,a[p].fc=1,$[p]=0,ea--,null!==c&&(ia-=c[p].dl);b.max_code=d;for(p=Y>>1;1<=p;p--)wa(a,p);do p=Q[1],Q[1]=Q[Y--],wa(a,1),c=Q[1],Q[--E]=p,Q[--E]=c,a[l].fc=a[p].fc+a[c].fc,$[l]=$[p]>$[c]+1?$[p]:$[c]+1,a[p].dl=a[c].dl=l,Q[1]=l++,wa(a,1);while(2<=Y);Q[--E]=Q[1];l=b.dyn_tree;p=b.extra_bits;var k=b.extra_base,c=b.max_code,e=b.max_length,t=b.static_tree,g,s,f,r,u=0;for(s=0;15>=s;s++)P[s]=0;l[Q[E]].dl=0;for(b=
E+1;573>b;b++)g=Q[b],s=l[l[g].dl].dl+1,s>e&&(s=e,u++),l[g].dl=s,g>c||(P[s]++,f=0,g>=k&&(f=p[g-k]),r=l[g].fc,ea+=r*(s+f),null!==t&&(ia+=r*(t[g].dl+f)));if(0!==u){do{for(s=e-1;0===P[s];)s--;P[s]--;P[s+1]+=2;P[e]--;u-=2}while(0<u);for(s=e;0!==s;s--)for(g=P[s];0!==g;)p=Q[--b],p>c||(l[p].dl!==s&&(ea+=(s-l[p].dl)*l[p].fc,l[p].fc=s),g--)}Da(a,d)},Ea=function(b,a){var c,k=-1,p,l=b[0].dl,d=0,e=7,s=4;0===l&&(e=138,s=3);b[a+1].dl=65535;for(c=0;c<=a;c++)p=l,l=b[c+1].dl,++d<e&&p===l||(d<s?R[p].fc+=d:0!==p?(p!==
k&&R[p].fc++,R[16].fc++):10>=d?R[17].fc++:R[18].fc++,d=0,k=p,0===l?(e=138,s=3):p===l?(e=6,s=3):(e=7,s=4))},Fa=function(){8<C?pa(p):0<C&&oa(p);C=p=0},Ga=function(b,a){var c,k=0,p=0,l=0,d=0,e,s;if(0!==Z){do 0===(k&7)&&(d=L[l++]),c=t[k++]&255,0===(d&1)?fa(c,b):(e=w[c],fa(e+256+1,b),s=ua[e],0!==s&&(c-=ga[e],da(c,s)),c=u[p++],e=(256>c?aa[c]:aa[256+(c>>7)])&255,fa(e,a),s=ka[e],0!==s&&(c-=K[e],da(c,s))),d>>=1;while(k<Z)}fa(256,b)},Ha=function(b,a){var c,k=-1,p,d=b[0].dl,l=0,e=7,s=4;0===d&&(e=138,s=3);for(c=
0;c<=a;c++)if(p=d,d=b[c+1].dl,!(++l<e&&p===d)){if(l<s){do fa(p,R);while(0!==--l)}else 0!==p?(p!==k&&(fa(p,R),l--),fa(16,R),da(l-3,2)):10>=l?(fa(17,R),da(l-3,3)):(fa(18,R),da(l-11,7));l=0;k=p;0===d?(e=138,s=3):p===d?(e=6,s=3):(e=7,s=4)}},Ia=function(){var b;for(b=0;286>b;b++)U[b].fc=0;for(b=0;30>b;b++)W[b].fc=0;for(b=0;19>b;b++)R[b].fc=0;U[256].fc=1;ha=Z=X=sa=ea=ia=0;ja=1},ra=function(b){var a,p,k,l;l=z-y;L[sa]=ha;xa(I);xa(B);Ea(U,I.max_code);Ea(W,B.max_code);xa(J);for(k=18;3<=k&&0===R[ya[k]].dl;k--);
ea+=3*(k+1)+14;a=ea+3+7>>3;p=ia+3+7>>3;p<=a&&(a=p);if(l+4<=a&&0<=y)for(da(0+b,3),Fa(),pa(l),pa(~l),k=0;k<l;k++)oa(c[y+k]);else if(p===a)da(2+b,3),Ga(M,S);else{da(4+b,3);l=I.max_code+1;a=B.max_code+1;k+=1;da(l-257,5);da(a-1,5);da(k-4,4);for(p=0;p<k;p++)da(R[ya[p]].dl,3);Ha(U,l-1);Ha(W,a-1);Ga(U,W)}Ia();0!==b&&Fa()},Ja=function(c,p,l){var d,s,t;for(d=0;null!==a&&d<l;){s=l-d;s>a.len&&(s=a.len);for(t=0;t<s;t++)c[p+d+t]=a.ptr[a.off+t];a.off+=s;a.len-=s;d+=s;0===a.len&&(s=a,a=a.next,s.next=e,e=s)}if(d===
l)return d;if(k<r){s=l-d;s>r-k&&(s=r-k);for(t=0;t<s;t++)c[p+d+t]=b[k+t];k+=s;d+=s;r===k&&(r=k=0)}return d},La=function(b,e,t){var g;if(!d){if(!D){C=p=0;var f,u;if(0===S[0].dl){I.dyn_tree=U;I.static_tree=M;I.extra_bits=ua;I.extra_base=257;I.elems=286;I.max_length=15;I.max_code=0;B.dyn_tree=W;B.static_tree=S;B.extra_bits=ka;B.extra_base=0;B.elems=30;B.max_length=15;B.max_code=0;J.dyn_tree=R;J.static_tree=null;J.extra_bits=Ka;J.extra_base=0;J.elems=19;J.max_length=7;for(u=f=J.max_code=0;28>u;u++)for(ga[u]=
f,g=0;g<1<<ua[u];g++)w[f++]=u;w[f-1]=u;for(u=f=0;16>u;u++)for(K[u]=f,g=0;g<1<<ka[u];g++)aa[f++]=u;for(f>>=7;30>u;u++)for(K[u]=f<<7,g=0;g<1<<ka[u]-7;g++)aa[256+f++]=u;for(g=0;15>=g;g++)P[g]=0;for(g=0;143>=g;)M[g++].dl=8,P[8]++;for(;255>=g;)M[g++].dl=9,P[9]++;for(;279>=g;)M[g++].dl=7,P[7]++;for(;287>=g;)M[g++].dl=8,P[8]++;Da(M,287);for(g=0;30>g;g++)S[g].dl=5,S[g].fc=Ca(g,5);Ia()}for(g=0;8192>g;g++)s[32768+g]=0;ba=na[V].max_lazy;ca=na[V].good_length;T=na[V].max_chain;y=z=0;G=Aa(c,0,65536);if(0>=G)D=
!0,G=0;else{for(D=!1;262>G&&!D;)va();for(g=v=0;2>g;g++)v=(v<<5^c[g]&255)&8191}a=null;k=r=0;3>=V?(O=2,F=0):(F=2,A=0);l=!1}d=!0;if(0===G)return l=!0,0}if((g=Ja(b,e,t))===t)return t;if(l)return g;if(3>=V)for(;0!==G&&null===a;){qa();0!==x&&32506>=z-x&&(F=Ba(x),F>G&&(F=G));if(3<=F)if(u=la(z-H,F-3),G-=F,F<=ba){F--;do z++,qa();while(0!==--F);z++}else z+=F,F=0,v=c[z]&255,v=(v<<5^c[z+1]&255)&8191;else u=la(0,c[z]&255),G--,z++;u&&(ra(0),y=z);for(;262>G&&!D;)va()}else for(;0!==G&&null===a;){qa();O=F;N=H;F=2;
0!==x&&(O<ba&&32506>=z-x)&&(F=Ba(x),F>G&&(F=G),3===F&&4096<z-H&&F--);if(3<=O&&F<=O){u=la(z-1-N,O-3);G-=O-1;O-=2;do z++,qa();while(0!==--O);A=0;F=2;z++;u&&(ra(0),y=z)}else 0!==A?la(0,c[z-1]&255)&&(ra(0),y=z):A=1,z++,G--;for(;262>G&&!D;)va()}0===G&&(0!==A&&la(0,c[z-1]&255),ra(1),l=!0);return g+Ja(b,g+e,t-g)};this.deflate=function(k,p){var l,f;ma=k;ta=0;"undefined"===String(typeof p)&&(p=6);(l=p)?1>l?l=1:9<l&&(l=9):l=6;V=l;D=d=!1;if(null===b){e=a=g=null;b=[];b.length=q;c=[];c.length=65536;u=[];u.length=
8192;t=[];t.length=32832;s=[];s.length=65536;U=[];U.length=573;for(l=0;573>l;l++)U[l]=new h;W=[];W.length=61;for(l=0;61>l;l++)W[l]=new h;M=[];M.length=288;for(l=0;288>l;l++)M[l]=new h;S=[];S.length=30;for(l=0;30>l;l++)S[l]=new h;R=[];R.length=39;for(l=0;39>l;l++)R[l]=new h;I=new m;B=new m;J=new m;P=[];P.length=16;Q=[];Q.length=573;$=[];$.length=573;w=[];w.length=256;aa=[];aa.length=512;ga=[];ga.length=29;K=[];K.length=30;L=[];L.length=1024}for(var r=Array(1024),n=[];0<(l=La(r,0,r.length));){var v=
[];v.length=l;for(f=0;f<l;f++)v[f]=String.fromCharCode(r[f]);n[n.length]=v.join("")}ma=null;return n.join("")}};
// Input 4
core.ByteArray=function(h){this.pos=0;this.data=h;this.readUInt32LE=function(){var m=this.data,f=this.pos+=4;return m[--f]<<24|m[--f]<<16|m[--f]<<8|m[--f]};this.readUInt16LE=function(){var m=this.data,f=this.pos+=2;return m[--f]<<8|m[--f]}};
// Input 5
core.ByteArrayWriter=function(h){var m=this,f=new runtime.ByteArray(0);this.appendByteArrayWriter=function(n){f=runtime.concatByteArrays(f,n.getByteArray())};this.appendByteArray=function(n){f=runtime.concatByteArrays(f,n)};this.appendArray=function(n){f=runtime.concatByteArrays(f,runtime.byteArrayFromArray(n))};this.appendUInt16LE=function(f){m.appendArray([f&255,f>>8&255])};this.appendUInt32LE=function(f){m.appendArray([f&255,f>>8&255,f>>16&255,f>>24&255])};this.appendString=function(m){f=runtime.concatByteArrays(f,
runtime.byteArrayFromString(m,h))};this.getLength=function(){return f.length};this.getByteArray=function(){return f}};
// Input 6
core.RawInflate=function(){var h,m,f=null,n,q,e,a,g,d,b,r,k,l,c,u,t,s,p=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],C=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],v=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],x=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],N=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],A=function(){this.list=this.next=null},F=function(){this.n=this.b=this.e=0;this.t=null},O=function(b,a,c,p,k,l){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var d=Array(this.BMAX+1),e,s,g,t,f,u,r,m=Array(this.BMAX+1),q,n,h,v=new F,C=Array(this.BMAX);t=Array(this.N_MAX);var y,x=Array(this.BMAX+1),G,z,D;D=this.root=null;for(f=0;f<d.length;f++)d[f]=0;for(f=0;f<m.length;f++)m[f]=0;for(f=0;f<C.length;f++)C[f]=null;for(f=0;f<t.length;f++)t[f]=
0;for(f=0;f<x.length;f++)x[f]=0;e=256<a?b[256]:this.BMAX;q=b;n=0;f=a;do d[q[n]]++,n++;while(0<--f);if(d[0]==a)this.root=null,this.status=this.m=0;else{for(u=1;u<=this.BMAX&&0==d[u];u++);r=u;l<u&&(l=u);for(f=this.BMAX;0!=f&&0==d[f];f--);g=f;l>f&&(l=f);for(G=1<<u;u<f;u++,G<<=1)if(0>(G-=d[u])){this.status=2;this.m=l;return}if(0>(G-=d[f]))this.status=2,this.m=l;else{d[f]+=G;x[1]=u=0;q=d;n=1;for(h=2;0<--f;)x[h++]=u+=q[n++];q=b;f=n=0;do 0!=(u=q[n++])&&(t[x[u]++]=f);while(++f<a);a=x[g];x[0]=f=0;q=t;n=0;
t=-1;y=m[0]=0;h=null;for(z=0;r<=g;r++)for(b=d[r];0<b--;){for(;r>y+m[1+t];){y+=m[1+t];t++;z=(z=g-y)>l?l:z;if((s=1<<(u=r-y))>b+1)for(s-=b+1,h=r;++u<z&&!((s<<=1)<=d[++h]);)s-=d[h];y+u>e&&y<e&&(u=e-y);z=1<<u;m[1+t]=u;h=Array(z);for(s=0;s<z;s++)h[s]=new F;D=null==D?this.root=new A:D.next=new A;D.next=null;D.list=h;C[t]=h;0<t&&(x[t]=f,v.b=m[t],v.e=16+u,v.t=h,u=(f&(1<<y)-1)>>y-m[t],C[t-1][u].e=v.e,C[t-1][u].b=v.b,C[t-1][u].n=v.n,C[t-1][u].t=v.t)}v.b=r-y;n>=a?v.e=99:q[n]<c?(v.e=256>q[n]?16:15,v.n=q[n++]):
(v.e=k[q[n]-c],v.n=p[q[n++]-c]);s=1<<r-y;for(u=f>>y;u<z;u+=s)h[u].e=v.e,h[u].b=v.b,h[u].n=v.n,h[u].t=v.t;for(u=1<<r-1;0!=(f&u);u>>=1)f^=u;for(f^=u;(f&(1<<y)-1)!=x[t];)y-=m[t],t--}this.m=m[1];this.status=0!=G&&1!=g?1:0}}},z=function(b){for(;a<b;){var c=e,p;p=t.length==s?-1:t[s++];e=c|p<<a;a+=8}},H=function(b){return e&p[b]},D=function(b){e>>=b;a-=b},G=function(a,p,d){var s,e,t;if(0==d)return 0;for(t=0;;){z(c);e=k.list[H(c)];for(s=e.e;16<s;){if(99==s)return-1;D(e.b);s-=16;z(s);e=e.t[H(s)];s=e.e}D(e.b);
if(16==s)m&=32767,a[p+t++]=h[m++]=e.n;else{if(15==s)break;z(s);b=e.n+H(s);D(s);z(u);e=l.list[H(u)];for(s=e.e;16<s;){if(99==s)return-1;D(e.b);s-=16;z(s);e=e.t[H(s)];s=e.e}D(e.b);z(s);r=m-e.n-H(s);for(D(s);0<b&&t<d;)b--,r&=32767,m&=32767,a[p+t++]=h[m++]=h[r++]}if(t==d)return d}g=-1;return t},T,ba=function(b,a,p){var d,s,e,t,g,f,r,q=Array(316);for(d=0;d<q.length;d++)q[d]=0;z(5);f=257+H(5);D(5);z(5);r=1+H(5);D(5);z(4);d=4+H(4);D(4);if(286<f||30<r)return-1;for(s=0;s<d;s++)z(3),q[N[s]]=H(3),D(3);for(;19>
s;s++)q[N[s]]=0;c=7;s=new O(q,19,19,null,null,c);if(0!=s.status)return-1;k=s.root;c=s.m;t=f+r;for(d=e=0;d<t;)if(z(c),g=k.list[H(c)],s=g.b,D(s),s=g.n,16>s)q[d++]=e=s;else if(16==s){z(2);s=3+H(2);D(2);if(d+s>t)return-1;for(;0<s--;)q[d++]=e}else{17==s?(z(3),s=3+H(3),D(3)):(z(7),s=11+H(7),D(7));if(d+s>t)return-1;for(;0<s--;)q[d++]=0;e=0}c=9;s=new O(q,f,257,C,y,c);0==c&&(s.status=1);if(0!=s.status)return-1;k=s.root;c=s.m;for(d=0;d<r;d++)q[d]=q[d+f];u=6;s=new O(q,r,0,v,x,u);l=s.root;u=s.m;return 0==u&&
257<f||0!=s.status?-1:G(b,a,p)};this.inflate=function(p,N){null==h&&(h=Array(65536));a=e=m=0;g=-1;d=!1;b=r=0;k=null;t=p;s=0;var A=new runtime.ByteArray(N);a:{var F,M;for(F=0;F<N&&(!d||-1!=g);){if(0<b){if(0!=g)for(;0<b&&F<N;)b--,r&=32767,m&=32767,A[0+F++]=h[m++]=h[r++];else{for(;0<b&&F<N;)b--,m&=32767,z(8),A[0+F++]=h[m++]=H(8),D(8);0==b&&(g=-1)}if(F==N)break}if(-1==g){if(d)break;z(1);0!=H(1)&&(d=!0);D(1);z(2);g=H(2);D(2);k=null;b=0}switch(g){case 0:M=A;var S=0+F,R=N-F,I=void 0,I=a&7;D(I);z(16);I=H(16);
D(16);z(16);if(I!=(~e&65535))M=-1;else{D(16);b=I;for(I=0;0<b&&I<R;)b--,m&=32767,z(8),M[S+I++]=h[m++]=H(8),D(8);0==b&&(g=-1);M=I}break;case 1:if(null!=k)M=G(A,0+F,N-F);else b:{M=A;S=0+F;R=N-F;if(null==f){for(var B=void 0,I=Array(288),B=void 0,B=0;144>B;B++)I[B]=8;for(;256>B;B++)I[B]=9;for(;280>B;B++)I[B]=7;for(;288>B;B++)I[B]=8;q=7;B=new O(I,288,257,C,y,q);if(0!=B.status){alert("HufBuild error: "+B.status);M=-1;break b}f=B.root;q=B.m;for(B=0;30>B;B++)I[B]=5;T=5;B=new O(I,30,0,v,x,T);if(1<B.status){f=
null;alert("HufBuild error: "+B.status);M=-1;break b}n=B.root;T=B.m}k=f;l=n;c=q;u=T;M=G(M,S,R)}break;case 2:M=null!=k?G(A,0+F,N-F):ba(A,0+F,N-F);break;default:M=-1}if(-1==M)break a;F+=M}}t=null;return A}};
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
core.LoopWatchDog=function(h,m){var f=Date.now(),n=0;this.check=function(){var q;if(h&&(q=Date.now(),q-f>h))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<m&&(n+=1,n>m))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.DomUtils=function(){function h(m,f){if(m.nodeType===Node.TEXT_NODE)if(0===m.length)m.parentNode.removeChild(m);else if(f.nodeType===Node.TEXT_NODE)return f.insertData(0,m.data),m.parentNode.removeChild(m),f;return m}this.splitBoundaries=function(m){var f=[],n;0!==m.endOffset&&(m.endContainer.nodeType===Node.TEXT_NODE&&m.endOffset!==m.endContainer.length)&&(f.push(m.endContainer.splitText(m.endOffset)),f.push(m.endContainer));0!==m.startOffset&&(m.startContainer.nodeType===Node.TEXT_NODE&&m.startOffset!==
m.startContainer.length)&&(n=m.startContainer.splitText(m.startOffset),f.push(m.startContainer),f.push(n),m.setStart(n,0));return f};this.normalizeTextNodes=function(m){m&&m.nextSibling&&(m=h(m,m.nextSibling));m&&m.previousSibling&&h(m.previousSibling,m)};this.rangeContainsNode=function(m,f){var n=f.ownerDocument.createRange(),q=f.nodeType===Node.TEXT_NODE?f.length:f.childNodes.length;n.setStart(m.startContainer,m.startOffset);n.setEnd(m.endContainer,m.endOffset);q=0===n.comparePoint(f,0)&&0===n.comparePoint(f,
q);n.detach();return q};this.mergeIntoParent=function(m){for(var f=m.parentNode;m.firstChild;)f.insertBefore(m.firstChild,m);f.removeChild(m);return f};this.getElementsByTagNameNS=function(m,f,n){return Array.prototype.slice.call(m.getElementsByTagNameNS(f,n))}};
// Input 9
runtime.loadClass("core.DomUtils");
core.Cursor=function(h,m){function f(b){b.parentNode&&(g.push(b.previousSibling),g.push(b.nextSibling),b.parentNode.removeChild(b))}function n(b,a,c){if(a.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(a),"putCursorIntoTextNode: invalid container");var d=a.parentNode;runtime.assert(Boolean(d),"putCursorIntoTextNode: container without parent");runtime.assert(0<=c&&c<=a.length,"putCursorIntoTextNode: offset is out of bounds");0===c?d.insertBefore(b,a):(c!==a.length&&a.splitText(c),d.insertBefore(b,
a.nextSibling))}else if(a.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(a),"putCursorIntoContainer: invalid container");for(d=a.firstChild;null!==d&&0<c;)d=d.nextSibling,c-=1;a.insertBefore(b,d)}g.push(b.previousSibling);g.push(b.nextSibling)}var q=h.createElementNS("urn:webodf:names:cursor","cursor"),e=h.createElementNS("urn:webodf:names:cursor","anchor"),a,g=[],d,b,r=new core.DomUtils;this.getNode=function(){return q};this.getAnchorNode=function(){return e.parentNode?e:q};this.getSelectedRange=
function(){b?(d.setStartBefore(q),d.collapse(!0)):(d.setStartAfter(a?e:q),d.setEndBefore(a?q:e));return d};this.setSelectedRange=function(k,l){d&&d!==k&&d.detach();d=k;a=!1!==l;(b=k.collapsed)?(f(e),f(q),n(q,k.startContainer,k.startOffset)):(f(e),f(q),n(a?q:e,k.endContainer,k.endOffset),n(a?e:q,k.startContainer,k.startOffset));g.forEach(r.normalizeTextNodes);g.length=0};this.remove=function(){f(q);g.forEach(r.normalizeTextNodes);g.length=0};q.setAttributeNS("urn:webodf:names:cursor","memberId",m);
e.setAttributeNS("urn:webodf:names:cursor","memberId",m)};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: http://gitorious.org/webodf/webodf/
*/
core.EventNotifier=function(h){var m={};this.emit=function(f,n){var q,e;runtime.assert(m.hasOwnProperty(f),'unknown event fired "'+f+'"');e=m[f];for(q=0;q<e.length;q+=1)e[q](n)};this.subscribe=function(f,n){runtime.assert(m.hasOwnProperty(f),'tried to subscribe to unknown event "'+f+'"');m[f].push(n);runtime.log('event "'+f+'" subscribed.')};this.unsubscribe=function(f,n){var q;runtime.assert(m.hasOwnProperty(f),'tried to unsubscribe from unknown event "'+f+'"');q=m[f].indexOf(n);runtime.assert(-1!==
q,'tried to unsubscribe unknown callback from event "'+f+'"');-1!==q&&m[f].splice(q,1);runtime.log('event "'+f+'" unsubscribed.')};(function(){var f;for(f=0;f<h.length;f+=1)m[h[f]]=[]})()};
// Input 11
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var h=runtime.getWindow().document,m=h.getElementById("testarea");runtime.assert(!m,'Unclean test environment, found a div with id "testarea".');m=h.createElement("div");m.setAttribute("id","testarea");h.body.appendChild(m);return m};
core.UnitTest.cleanupTestAreaDiv=function(){var h=runtime.getWindow().document,m=h.getElementById("testarea");runtime.assert(!!m&&m.parentNode===h.body,'Test environment broken, found no div with id "testarea" below body.');h.body.removeChild(m)};
core.UnitTestRunner=function(){function h(d){a+=1;runtime.log("fail",d)}function m(a,b){var e;try{if(a.length!==b.length)return h("array of length "+a.length+" should be "+b.length+" long"),!1;for(e=0;e<a.length;e+=1)if(a[e]!==b[e])return h(a[e]+" should be "+b[e]+" at array index "+e),!1}catch(k){return!1}return!0}function f(a,b,e){var k=a.attributes,l=k.length,c,g,t;for(c=0;c<l;c+=1)if(g=k.item(c),"xmlns"!==g.prefix){t=b.getAttributeNS(g.namespaceURI,g.localName);if(!b.hasAttributeNS(g.namespaceURI,
g.localName))return h("Attribute "+g.localName+" with value "+g.value+" was not present"),!1;if(t!==g.value)return h("Attribute "+g.localName+" was "+t+" should be "+g.value),!1}return e?!0:f(b,a,!0)}function n(a,b){if(a.nodeType!==b.nodeType)return h(a.nodeType+" should be "+b.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===b.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==b.namespaceURI||a.localName!==b.localName)return h(a.namespaceURI+
" should be "+b.namespaceURI),!1;if(!f(a,b,!1))return!1;for(var e=a.firstChild,k=b.firstChild;e;){if(!k||!n(e,k))return!1;e=e.nextSibling;k=k.nextSibling}return k?!1:!0}function q(a,b){return 0===b?a===b&&1/a===1/b:a===b?!0:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?m(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?n(b,a):g(b,a):!1}function e(a,b,e){"string"===typeof b&&
"string"===typeof e||runtime.log("WARN: shouldBe() expects string arguments");var k,l;try{l=eval(b)}catch(c){k=c}a=eval(e);k?h(b+" should be "+a+". Threw exception "+k):q(l,a)?runtime.log("pass",b+" is "+e):String(typeof l)===String(typeof a)?(e=0===l&&0>1/l?"-0":String(l),h(b+" should be "+a+". Was "+e+".")):h(b+" should be "+a+" (of type "+typeof a+"). Was "+l+" (of type "+typeof l+").")}var a=0,g;g=function(a,b){var e=Object.keys(a),k=Object.keys(b);e.sort();k.sort();return m(e,k)&&Object.keys(a).every(function(k){var c=
a[k],e=b[k];return q(c,e)?!0:(h(c+" should be "+e+" for key "+k),!1)})};this.areNodesEqual=n;this.shouldBeNull=function(a,b){e(a,b,"null")};this.shouldBeNonNull=function(a,b){var e,k;try{k=eval(b)}catch(l){e=l}e?h(b+" should be non-null. Threw exception "+e):null!==k?runtime.log("pass",b+" is non-null."):h(b+" should be non-null. Was "+k)};this.shouldBe=e;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function h(f,q){return"<span style='color:blue;cursor:pointer' onclick='"+q+"'>"+f+"</span>"}var m=0,f={};this.runTests=function(n,q,e){function a(c){if(0===c.length)f[g]=r,m+=d.countFailedTests(),q();else{l=c[0];var p=Runtime.getFunctionName(l);runtime.log("Running "+p);u=d.countFailedTests();b.setUp();l(function(){b.tearDown();r[p]=u===d.countFailedTests();a(c.slice(1))})}}var g=Runtime.getFunctionName(n),d=new core.UnitTestRunner,b=new n(d),r={},k,l,c,u,t="BrowserRuntime"===
runtime.type();if(f.hasOwnProperty(g))runtime.log("Test "+g+" has already run.");else{t?runtime.log("<span>Running "+h(g,'runSuite("'+g+'");')+": "+b.description()+"</span>"):runtime.log("Running "+g+": "+b.description);c=b.tests();for(k=0;k<c.length;k+=1)l=c[k],n=Runtime.getFunctionName(l)||l.testName,e.length&&-1===e.indexOf(n)||(t?runtime.log("<span>Running "+h(n,'runTest("'+g+'","'+n+'")')+"</span>"):runtime.log("Running "+n),u=d.countFailedTests(),b.setUp(),l(),b.tearDown(),r[n]=u===d.countFailedTests());
a(b.asyncTests())}};this.countFailedTests=function(){return m};this.results=function(){return f}};
// Input 12
core.PositionIterator=function(h,m,f,n){function q(){this.acceptNode=function(b){return b.nodeType===Node.TEXT_NODE&&0===b.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function e(b){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:b.acceptNode(a)}}function a(){var a=d.currentNode.nodeType;b=a===Node.TEXT_NODE?d.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var g=this,d,b,r;this.nextPosition=function(){if(d.currentNode===h)return!1;
if(0===b&&d.currentNode.nodeType===Node.ELEMENT_NODE)null===d.firstChild()&&(b=1);else if(d.currentNode.nodeType===Node.TEXT_NODE&&b+1<d.currentNode.length)b+=1;else if(null!==d.nextSibling())b=0;else if(d.parentNode())b=1;else return!1;return!0};this.previousPosition=function(){var k=!0;if(0===b)if(null===d.previousSibling()){if(!d.parentNode()||d.currentNode===h)return d.firstChild(),!1;b=0}else a();else d.currentNode.nodeType===Node.TEXT_NODE?b-=1:null!==d.lastChild()?a():d.currentNode===h?k=!1:
b=0;return k};this.container=function(){var a=d.currentNode,l=a.nodeType;return 0===b&&l!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=d.currentNode,l=a.nodeType;if(l===Node.TEXT_NODE&&b===a.length)for(a=a.nextSibling;a&&1!==r(a);)a=a.nextSibling;else l===Node.ELEMENT_NODE&&1===b&&(a=null);return a};this.leftNode=function(){var a=d.currentNode;if(0===b)for(a=a.previousSibling;a&&1!==r(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==r(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return d.currentNode};this.domOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return b;var a=0,l=d.currentNode,c;for(c=1===b?d.lastChild():d.previousSibling();c;)a+=1,c=d.previousSibling();d.currentNode=l;return a};this.unfilteredDomOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return b;for(var a=0,l=d.currentNode,l=1===b?l.lastChild:l.previousSibling;l;)a+=1,l=l.previousSibling;return a};this.textOffset=function(){if(d.currentNode.nodeType!==
Node.TEXT_NODE)return 0;for(var a=b,l=d.currentNode;d.previousSibling()&&d.currentNode.nodeType===Node.TEXT_NODE;)a+=d.currentNode.length;d.currentNode=l;return a};this.getPreviousSibling=function(){var a=d.currentNode,b=d.previousSibling();d.currentNode=a;return b};this.getNextSibling=function(){var a=d.currentNode,b=d.nextSibling();d.currentNode=a;return b};this.text=function(){var a,b="",c=g.textNeighborhood();for(a=0;a<c.length;a+=1)b+=c[a].data;return b};this.textNeighborhood=function(){var a=
d.currentNode,b=[];if(a.nodeType!==Node.TEXT_NODE)return b;for(;d.previousSibling();)if(d.currentNode.nodeType!==Node.TEXT_NODE){d.nextSibling();break}do b.push(d.currentNode);while(d.nextSibling()&&d.currentNode.nodeType===Node.TEXT_NODE);d.currentNode=a;return b};this.substr=function(a,b){return g.text().substr(a,b)};this.setUnfilteredPosition=function(a,l){var c;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");d.currentNode=a;if(a.nodeType===
Node.TEXT_NODE)return b=l,runtime.assert(l<=a.length,"Error in setPosition: "+l+" > "+a.length),runtime.assert(0<=l,"Error in setPosition: "+l+" < 0"),l===a.length&&(b=void 0,d.nextSibling()?b=0:d.parentNode()&&(b=1),runtime.assert(void 0!==b,"Error in setPosition: position not valid.")),!0;c=r(a);l<a.childNodes.length&&c!==NodeFilter.FILTER_REJECT?(d.currentNode=a.childNodes[l],c=r(d.currentNode),b=0):b=0===l?0:1;c===NodeFilter.FILTER_REJECT&&(b=1);if(c!==NodeFilter.FILTER_ACCEPT)return g.nextPosition();
runtime.assert(r(d.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");return!0};this.moveToEnd=function(){d.currentNode=h;b=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?g.setUnfilteredPosition(a,a.length):(d.currentNode=a,b=1)};this.getNodeFilter=function(){return r};r=(f?new e(f):new q).acceptNode;r.acceptNode=r;d=h.ownerDocument.createTreeWalker(h,m||4294967295,r,n);b=0;null===d.firstChild()&&(b=1)};
// Input 13
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(h){};(function(){return core.PositionFilter})();
// Input 14
core.Async=function(){this.forEach=function(h,m,f){function n(g){a!==e&&(g?(a=e,f(g)):(a+=1,a===e&&f(null)))}var q,e=h.length,a=0;for(q=0;q<e;q+=1)m(h[q],n)}};
// Input 15
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(h,m){function f(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],c,p,l=a.length,d=0,d=0;c=-1;for(p=0;p<l;p+=1)d=(c^a[p])&255,d=b[d],c=c>>>8^d;return c^-1}function n(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function q(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function e(a,b){var c,p,d,l,k,e,g,t=this;this.load=function(b){if(void 0!==t.data)b(null,t.data);else{var c=k+34+p+d+256;c+g>u&&(c=u-g);runtime.read(a,g,c,function(c,p){if(c||null===p)b(c,p);else a:{var d=p,g=new core.ByteArray(d),f=g.readUInt32LE(),u;if(67324752!==f)b("File entry signature is wrong."+f.toString()+" "+d.length.toString(),null);else{g.pos+=22;f=g.readUInt16LE();u=g.readUInt16LE();g.pos+=f+u;
if(l){d=d.slice(g.pos,g.pos+k);if(k!==d.length){b("The amount of compressed bytes read was "+d.length.toString()+" instead of "+k.toString()+" for "+t.filename+" in "+a+".",null);break a}d=s(d,e)}else d=d.slice(g.pos,g.pos+e);e!==d.length?b("The amount of bytes read was "+d.length.toString()+" instead of "+e.toString()+" for "+t.filename+" in "+a+".",null):(t.data=d,b(null,d))}}})}};this.set=function(a,b,c,p){t.filename=a;t.data=b;t.compressed=c;t.date=p};this.error=null;b&&(c=b.readUInt32LE(),33639248!==
c?this.error="Central directory entry has wrong signature at position "+(b.pos-4).toString()+' for file "'+a+'": '+b.data.length.toString():(b.pos+=6,l=b.readUInt16LE(),this.date=n(b.readUInt32LE()),b.readUInt32LE(),k=b.readUInt32LE(),e=b.readUInt32LE(),p=b.readUInt16LE(),d=b.readUInt16LE(),c=b.readUInt16LE(),b.pos+=8,g=b.readUInt32LE(),this.filename=runtime.byteArrayToString(b.data.slice(b.pos,b.pos+p),"utf8"),b.pos+=p+d+c))}function a(a,b){if(22!==a.length)b("Central directory length should be 22.",
p);else{var d=new core.ByteArray(a),l;l=d.readUInt32LE();101010256!==l?b("Central directory signature is wrong: "+l.toString(),p):(l=d.readUInt16LE(),0!==l?b("Zip files with non-zero disk numbers are not supported.",p):(l=d.readUInt16LE(),0!==l?b("Zip files with non-zero disk numbers are not supported.",p):(l=d.readUInt16LE(),t=d.readUInt16LE(),l!==t?b("Number of entries is inconsistent.",p):(l=d.readUInt32LE(),d=d.readUInt16LE(),d=u-22-l,runtime.read(h,d,u-d,function(a,d){if(a||null===d)b(a,p);else a:{var l=
new core.ByteArray(d),k,s;c=[];for(k=0;k<t;k+=1){s=new e(h,l);if(s.error){b(s.error,p);break a}c[c.length]=s}b(null,p)}})))))}}function g(a,b){var p=null,d,l;for(l=0;l<c.length;l+=1)if(d=c[l],d.filename===a){p=d;break}p?p.data?b(null,p.data):p.load(b):b(a+" not found.",null)}function d(a){var b=new core.ByteArrayWriter("utf8"),c=0;b.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(c=a.data.length);b.appendUInt32LE(q(a.date));b.appendUInt32LE(f(a.data));b.appendUInt32LE(c);b.appendUInt32LE(c);b.appendUInt16LE(a.filename.length);
b.appendUInt16LE(0);b.appendString(a.filename);a.data&&b.appendByteArray(a.data);return b}function b(a,b){var c=new core.ByteArrayWriter("utf8"),p=0;c.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(p=a.data.length);c.appendUInt32LE(q(a.date));c.appendUInt32LE(f(a.data));c.appendUInt32LE(p);c.appendUInt32LE(p);c.appendUInt16LE(a.filename.length);c.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);c.appendUInt32LE(b);c.appendString(a.filename);return c}function r(a,b){if(a===c.length)b(null);else{var p=c[a];
void 0!==p.data?r(a+1,b):p.load(function(c){c?b(c):r(a+1,b)})}}function k(a,p){r(0,function(l){if(l)p(l);else{l=new core.ByteArrayWriter("utf8");var k,e,s,g=[0];for(k=0;k<c.length;k+=1)l.appendByteArrayWriter(d(c[k])),g.push(l.getLength());s=l.getLength();for(k=0;k<c.length;k+=1)e=c[k],l.appendByteArrayWriter(b(e,g[k]));k=l.getLength()-s;l.appendArray([80,75,5,6,0,0,0,0]);l.appendUInt16LE(c.length);l.appendUInt16LE(c.length);l.appendUInt32LE(k);l.appendUInt32LE(s);l.appendArray([0,0]);a(l.getByteArray())}})}
function l(a,b){k(function(c){runtime.writeFile(a,c,b)},b)}var c,u,t,s=(new core.RawInflate).inflate,p=this,C=new core.Base64;this.load=g;this.save=function(a,b,p,l){var d,k;for(d=0;d<c.length;d+=1)if(k=c[d],k.filename===a){k.set(a,b,p,l);return}k=new e(h);k.set(a,b,p,l);c.push(k)};this.write=function(a){l(h,a)};this.writeAs=l;this.createByteArray=k;this.loadContentXmlAsFragments=function(a,b){p.loadAsString(a,function(a,c){if(a)return b.rootElementReady(a);b.rootElementReady(null,c,!0)})};this.loadAsString=
function(a,b){g(a,function(a,c){if(a||null===c)return b(a,null);var p=runtime.byteArrayToString(c,"utf8");b(null,p)})};this.loadAsDOM=function(a,b){p.loadAsString(a,function(a,c){if(a||null===c)b(a,null);else{var p=(new DOMParser).parseFromString(c,"text/xml");b(null,p)}})};this.loadAsDataURL=function(a,b,c){g(a,function(a,p){if(a)return c(a,null);var d=0,l;b||(b=80===p[1]&&78===p[2]&&71===p[3]?"image/png":255===p[0]&&216===p[1]&&255===p[2]?"image/jpeg":71===p[0]&&73===p[1]&&70===p[2]?"image/gif":
"");for(l="data:"+b+";base64,";d<p.length;)l+=C.convertUTF8ArrayToBase64(p.slice(d,Math.min(d+45E3,p.length))),d+=45E3;c(null,l)})};this.getEntries=function(){return c.slice()};u=-1;null===m?c=[]:runtime.getFileSize(h,function(b){u=b;0>u?m("File '"+h+"' cannot be read.",p):runtime.read(h,u-22,22,function(b,c){b||null===m||null===c?m(b,p):a(c,m)})})};
// Input 16
core.CSSUnits=function(){var h={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(m,f,n){return m*h[n]/h[f]};this.convertMeasure=function(m,f){var n,q;m&&f?(n=parseFloat(m),q=m.replace(n.toString(),""),n=this.convert(n,q,f)):n="";return n.toString()};this.getUnits=function(m){return m.substr(m.length-2,m.length)}};
// Input 17
xmldom.LSSerializerFilter=function(){};
// Input 18
"function"!==typeof Object.create&&(Object.create=function(h){var m=function(){};m.prototype=h;return new m});
xmldom.LSSerializer=function(){function h(f){var e=f||{},a=function(a){var b={},d;for(d in a)a.hasOwnProperty(d)&&(b[a[d]]=d);return b}(f),g=[e],d=[a],b=0;this.push=function(){b+=1;e=g[b]=Object.create(e);a=d[b]=Object.create(a)};this.pop=function(){g[b]=void 0;d[b]=void 0;b-=1;e=g[b];a=d[b]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(b){var d=b.namespaceURI,l=0,c;if(!d)return b.localName;if(c=a[d])return c+":"+b.localName;do{c||!b.prefix?(c="ns"+l,l+=1):c=b.prefix;
if(e[c]===d)break;if(!e[c]){e[c]=d;a[d]=c;break}c=null}while(null===c);return c+":"+b.localName}}function m(f){return f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function f(q,e){var a="",g=n.filter?n.filter.acceptNode(e):NodeFilter.FILTER_ACCEPT,d;if(g===NodeFilter.FILTER_ACCEPT&&e.nodeType===Node.ELEMENT_NODE){q.push();d=q.getQName(e);var b,r=e.attributes,k,l,c,u="",t;b="<"+d;k=r.length;for(l=0;l<k;l+=1)c=r.item(l),"http://www.w3.org/2000/xmlns/"!==
c.namespaceURI&&(t=n.filter?n.filter.acceptNode(c):NodeFilter.FILTER_ACCEPT,t===NodeFilter.FILTER_ACCEPT&&(t=q.getQName(c),c="string"===typeof c.value?m(c.value):c.value,u+=" "+(t+'="'+c+'"')));k=q.getLocalNamespaceDefinitions();for(l in k)k.hasOwnProperty(l)&&((r=k[l])?"xmlns"!==r&&(b+=" xmlns:"+k[l]+'="'+l+'"'):b+=' xmlns="'+l+'"');a+=b+(u+">")}if(g===NodeFilter.FILTER_ACCEPT||g===NodeFilter.FILTER_SKIP){for(g=e.firstChild;g;)a+=f(q,g),g=g.nextSibling;e.nodeValue&&(a+=m(e.nodeValue))}d&&(a+="</"+
d+">",q.pop());return a}var n=this;this.filter=null;this.writeToString=function(q,e){if(!q)return"";var a=new h(e);return f(a,q)}};
// Input 19
xmldom.RelaxNGParser=function(){function h(a,d){this.message=function(){d&&(a+=1===d.nodeType?" Element ":" Node ",a+=d.nodeName,d.nodeValue&&(a+=" with value '"+d.nodeValue+"'"),a+=".");return a}}function m(a){if(2>=a.e.length)return a;var d={name:a.name,e:a.e.slice(0,2)};return m({name:a.name,e:[d].concat(a.e.slice(2))})}function f(a){a=a.split(":",2);var d="",k;1===a.length?a=["",a[0]]:d=a[0];for(k in g)g[k]===d&&(a[0]=k);return a}function n(a,d){for(var k=0,l,c,e=a.name;a.e&&k<a.e.length;)if(l=
a.e[k],"ref"===l.name){c=d[l.a.name];if(!c)throw l.a.name+" was not defined.";l=a.e.slice(k+1);a.e=a.e.slice(0,k);a.e=a.e.concat(c.e);a.e=a.e.concat(l)}else k+=1,n(l,d);l=a.e;"choice"!==e||l&&l[1]&&"empty"!==l[1].name||(l&&l[0]&&"empty"!==l[0].name?(l[1]=l[0],l[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===e||"interleave"===e)"empty"===l[0].name?"empty"===l[1].name?(delete a.e,a.name="empty"):(e=a.name=l[1].name,a.names=l[1].names,l=a.e=l[1].e):"empty"===l[1].name&&(e=a.name=l[0].name,
a.names=l[0].names,l=a.e=l[0].e);"oneOrMore"===e&&"empty"===l[0].name&&(delete a.e,a.name="empty");if("attribute"===e){c=a.names?a.names.length:0;for(var g,s=a.localnames=[c],p=a.namespaces=[c],k=0;k<c;k+=1)g=f(a.names[k]),p[k]=g[0],s[k]=g[1]}"interleave"===e&&("interleave"===l[0].name?a.e="interleave"===l[1].name?l[0].e.concat(l[1].e):[l[1]].concat(l[0].e):"interleave"===l[1].name&&(a.e=[l[0]].concat(l[1].e)))}function q(a,d){for(var k=0,l;a.e&&k<a.e.length;)l=a.e[k],"elementref"===l.name?(l.id=
l.id||0,a.e[k]=d[l.id]):"element"!==l.name&&q(l,d),k+=1}var e=this,a,g={"http://www.w3.org/XML/1998/namespace":"xml"},d;d=function(a,e,k){var l=[],c,u,t=a.localName,s=[];c=a.attributes;var p=t,q=s,n={},h,x;for(h=0;h<c.length;h+=1)if(x=c.item(h),x.namespaceURI)"http://www.w3.org/2000/xmlns/"===x.namespaceURI&&(g[x.value]=x.localName);else{"name"!==x.localName||"element"!==p&&"attribute"!==p||q.push(x.value);if("name"===x.localName||"combine"===x.localName||"type"===x.localName){var N=x,A;A=x.value;
A=A.replace(/^\s\s*/,"");for(var F=/\s/,O=A.length-1;F.test(A.charAt(O));)O-=1;A=A.slice(0,O+1);N.value=A}n[x.localName]=x.value}c=n;c.combine=c.combine||void 0;a=a.firstChild;p=l;q=s;for(n="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(h=d(a,e,p))"name"===h.name?q.push(g[h.a.ns]+":"+h.text):"choice"===h.name&&(h.names&&h.names.length)&&(q=q.concat(h.names),delete h.names),p.push(h)}else a.nodeType===Node.TEXT_NODE&&(n+=a.nodeValue);a=a.nextSibling}a=
n;"value"!==t&&"param"!==t&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===t&&void 0===c.type&&(c.type="token",c.datatypeLibrary="");"attribute"!==t&&"element"!==t||void 0===c.name||(u=f(c.name),l=[{name:"name",text:u[1],a:{ns:u[0]}}].concat(l),delete c.name);"name"===t||"nsName"===t||"value"===t?void 0===c.ns&&(c.ns=""):delete c.ns;"name"===t&&(u=f(a),c.ns=u[0],a=u[1]);1<l.length&&("define"===t||"oneOrMore"===t||"zeroOrMore"===t||"optional"===t||"list"===t||"mixed"===t)&&(l=[{name:"group",e:m({name:"group",
e:l}).e}]);2<l.length&&"element"===t&&(l=[l[0]].concat({name:"group",e:m({name:"group",e:l.slice(1)}).e}));1===l.length&&"attribute"===t&&l.push({name:"text",text:a});1!==l.length||"choice"!==t&&"group"!==t&&"interleave"!==t?2<l.length&&("choice"===t||"group"===t||"interleave"===t)&&(l=m({name:t,e:l}).e):(t=l[0].name,s=l[0].names,c=l[0].a,a=l[0].text,l=l[0].e);"mixed"===t&&(t="interleave",l=[l[0],{name:"text"}]);"optional"===t&&(t="choice",l=[l[0],{name:"empty"}]);"zeroOrMore"===t&&(t="choice",l=
[{name:"oneOrMore",e:[l[0]]},{name:"empty"}]);if("define"===t&&c.combine){a:{p=c.combine;q=c.name;n=l;for(h=0;k&&h<k.length;h+=1)if(x=k[h],"define"===x.name&&x.a&&x.a.name===q){x.e=[{name:p,e:x.e.concat(n)}];k=x;break a}k=null}if(k)return}k={name:t};l&&0<l.length&&(k.e=l);for(u in c)if(c.hasOwnProperty(u)){k.a=c;break}void 0!==a&&(k.text=a);s&&0<s.length&&(k.names=s);"element"===t&&(k.id=e.length,e.push(k),k={name:"elementref",id:k.id});return k};this.parseRelaxNGDOM=function(b,f){var k=[],l=d(b&&
b.documentElement,k,void 0),c,u,t={};for(c=0;c<l.e.length;c+=1)u=l.e[c],"define"===u.name?t[u.a.name]=u:"start"===u.name&&(a=u);if(!a)return[new h("No Relax NG start element was found.")];n(a,t);for(c in t)t.hasOwnProperty(c)&&n(t[c],t);for(c=0;c<k.length;c+=1)n(k[c],t);f&&(e.rootPattern=f(a.e[0],k));q(a,k);for(c=0;c<k.length;c+=1)q(k[c],k);e.start=a;e.elements=k;e.nsmap=g;return null}};
// Input 20
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function h(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function m(a,b){return function(){var c={},p=0;return function(d){var l=d.hash||d.toString(),k;k=c[l];if(void 0!==k)return k;c[l]=k=b(d);k.hash=a+p.toString();p+=1;return k}}()}function f(a){return function(){var b={};return function(c){var p,d;d=b[c.localName];if(void 0===d)b[c.localName]=d={};else if(p=d[c.namespaceURI],void 0!==p)return p;return d[c.namespaceURI]=p=a(c)}}()}function n(a,
b,c){return function(){var p={},d=0;return function(l,k){var e=b&&b(l,k),s,g;if(void 0!==e)return e;e=l.hash||l.toString();s=k.hash||k.toString();g=p[e];if(void 0===g)p[e]=g={};else if(e=g[s],void 0!==e)return e;g[s]=e=c(l,k);e.hash=a+d.toString();d+=1;return e}}()}function q(a,b){"choice"===b.p1.type?q(a,b.p1):a[b.p1.hash]=b.p1;"choice"===b.p2.type?q(a,b.p2):a[b.p2.hash]=b.p2}function e(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return v},startTagOpenDeriv:function(p){return a.contains(p)?
c(b,x):v},attDeriv:function(a,b){return v},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(a,b){return x}}}function g(a,c,p,d){if(c===v)return v;if(d>=p.length)return c;0===d&&(d=0);for(var l=p.item(d);l.namespaceURI===b;){d+=1;if(d>=p.length)return c;l=p.item(d)}return l=g(a,c.attDeriv(a,p.item(d)),p,d+1)}function d(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):d(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
d(a,b,c.e[1])}var b="http://www.w3.org/2000/xmlns/",r,k,l,c,u,t,s,p,C,y,v={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return v},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return v},endTagDeriv:function(){return v}},x={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return v},startTagOpenDeriv:function(){return v},attDeriv:function(a,b){return v},startTagCloseDeriv:function(){return x},endTagDeriv:function(){return v}},
N={type:"text",nullable:!0,hash:"text",textDeriv:function(){return N},startTagOpenDeriv:function(){return v},attDeriv:function(){return v},startTagCloseDeriv:function(){return N},endTagDeriv:function(){return v}},A,F,O;r=n("choice",function(a,b){if(a===v)return b;if(b===v||a===b)return a},function(a,b){var c={},p;q(c,{p1:a,p2:b});b=a=void 0;for(p in c)c.hasOwnProperty(p)&&(void 0===a?a=c[p]:b=void 0===b?c[p]:r(b,c[p]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,p){return r(a.textDeriv(c,p),b.textDeriv(c,p))},startTagOpenDeriv:f(function(c){return r(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,p){return r(a.attDeriv(c,p),b.attDeriv(c,p))},startTagCloseDeriv:h(function(){return r(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:h(function(){return r(a.endTagDeriv(),b.endTagDeriv())})}}(a,b)});k=function(a,b,c){return function(){var p={},d=0;return function(l,k){var e=b&&b(l,k),s,g;if(void 0!==e)return e;
e=l.hash||l.toString();s=k.hash||k.toString();e<s&&(g=e,e=s,s=g,g=l,l=k,k=g);g=p[e];if(void 0===g)p[e]=g={};else if(e=g[s],void 0!==e)return e;g[s]=e=c(l,k);e.hash=a+d.toString();d+=1;return e}}()}("interleave",function(a,b){if(a===v||b===v)return v;if(a===x)return b;if(b===x)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,p){return r(k(a.textDeriv(c,p),b),k(a,b.textDeriv(c,p)))},startTagOpenDeriv:f(function(c){return r(A(function(a){return k(a,
b)},a.startTagOpenDeriv(c)),A(function(b){return k(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,p){return r(k(a.attDeriv(c,p),b),k(a,b.attDeriv(c,p)))},startTagCloseDeriv:h(function(){return k(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});l=n("group",function(a,b){if(a===v||b===v)return v;if(a===x)return b;if(b===x)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,p){var d=l(a.textDeriv(c,p),b);return a.nullable?r(d,b.textDeriv(c,
p)):d},startTagOpenDeriv:function(c){var p=A(function(a){return l(a,b)},a.startTagOpenDeriv(c));return a.nullable?r(p,b.startTagOpenDeriv(c)):p},attDeriv:function(c,p){return r(l(a.attDeriv(c,p),b),l(a,b.attDeriv(c,p)))},startTagCloseDeriv:h(function(){return l(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});c=n("after",function(a,b){if(a===v||b===v)return v},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(p,d){return c(a.textDeriv(p,d),b)},startTagOpenDeriv:f(function(p){return A(function(a){return c(a,
b)},a.startTagOpenDeriv(p))}),attDeriv:function(p,d){return c(a.attDeriv(p,d),b)},startTagCloseDeriv:h(function(){return c(a.startTagCloseDeriv(),b)}),endTagDeriv:h(function(){return a.nullable?b:v})}});u=m("oneormore",function(a){return a===v?v:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return l(a.textDeriv(b,c),r(this,x))},startTagOpenDeriv:function(b){var c=this;return A(function(a){return l(a,r(c,x))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return l(a.attDeriv(b,
c),r(this,x))},startTagCloseDeriv:h(function(){return u(a.startTagCloseDeriv())})}});s=n("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,p){return a.contains(p)&&(b.nullable&&/^\s+$/.test(p.nodeValue)||b.textDeriv(c,p.nodeValue).nullable)?x:v},startTagCloseDeriv:function(){return v}}});t=m("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?x:v},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}});
C=m("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return x},attDeriv:function(){return v},startTagCloseDeriv:function(){return this}}});A=function H(a,b){return"after"===b.type?c(b.p1,a(b.p2)):"choice"===b.type?r(H(a,b.p1),H(a,b.p2)):b};F=function(a,b,c){var p=c.currentNode;b=b.startTagOpenDeriv(p);b=g(a,b,p.attributes,0);var d=b=b.startTagCloseDeriv(),p=c.currentNode;b=c.firstChild();for(var l=[],e;b;)b.nodeType===Node.ELEMENT_NODE?l.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||l.push(b.nodeValue),b=c.nextSibling();0===l.length&&(l=[""]);e=d;for(d=0;e!==v&&d<l.length;d+=1)b=l[d],"string"===typeof b?e=/^\s*$/.test(b)?r(e,e.textDeriv(a,b)):e.textDeriv(a,b):(c.currentNode=b,e=F(a,e,c));c.currentNode=p;return b=e.endTagDeriv()};p=function(a){var b,c,p;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];d(b,c,a);a="";for(p=0;p<b.length;p+=
1)a+="{"+c[p]+"}"+b[p]+",";a={hash:a,contains:function(a){var p;for(p=0;p<b.length;p+=1)if(b[p]===a.localName&&c[p]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};y=function D(b,c){var d,g;if("elementref"===b.name){d=b.id||0;b=c[d];if(void 0!==b.name){var f=b;d=c[f.id]={hash:"element"+f.id.toString()};f=e(p(f.e[0]),y(f.e[1],c));for(g in f)f.hasOwnProperty(g)&&(d[g]=f[g]);return d}return b}switch(b.name){case "empty":return x;case "notAllowed":return v;
case "text":return N;case "choice":return r(D(b.e[0],c),D(b.e[1],c));case "interleave":d=D(b.e[0],c);for(g=1;g<b.e.length;g+=1)d=k(d,D(b.e[g],c));return d;case "group":return l(D(b.e[0],c),D(b.e[1],c));case "oneOrMore":return u(D(b.e[0],c));case "attribute":return s(p(b.e[0]),D(b.e[1],c));case "value":return t(b.text);case "data":return d=b.a&&b.a.type,void 0===d&&(d=""),C(d);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var c={},p;for(p in b)b.hasOwnProperty(p)&&
(c[p]=b[p]);return p=y(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=F(null,O,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){O=a}};
// Input 21
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function h(a,e){this.message=function(){e&&(a+=e.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=e.nodeName,e.nodeValue&&(a+=" with value '"+e.nodeValue+"'"),a+=".");return a}}function m(a,e,d,b){return"empty"===a.name?null:q(a,e,d,b)}function f(a,g,d){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var b=(d=g.currentNode)?d.nodeType:0,f=null;b>Node.ELEMENT_NODE;){if(b!==Node.COMMENT_NODE&&(b!==Node.TEXT_NODE||!/^\s+$/.test(g.currentNode.nodeValue)))return[new h("Not allowed node of type "+
b+".")];b=(d=g.nextSibling())?d.nodeType:0}if(!d)return[new h("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(e[d.namespaceURI]+":"+d.localName))return[new h("Found "+d.nodeName+" instead of "+a.names+".",d)];if(g.firstChild()){for(f=m(a.e[1],g,d);g.nextSibling();)if(b=g.currentNode.nodeType,!(g.currentNode&&g.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(g.currentNode.nodeValue)||b===Node.COMMENT_NODE))return[new h("Spurious content.",g.currentNode)];if(g.parentNode()!==d)return[new h("Implementation error.")]}else f=
m(a.e[1],g,d);g.nextSibling();return f}var n,q,e;q=function(a,e,d,b){var n=a.name,k=null;if("text"===n)a:{for(var l=(a=e.currentNode)?a.nodeType:0;a!==d&&3!==l;){if(1===l){k=[new h("Element not allowed here.",a)];break a}l=(a=e.nextSibling())?a.nodeType:0}e.nextSibling();k=null}else if("data"===n)k=null;else if("value"===n)b!==a.text&&(k=[new h("Wrong value, should be '"+a.text+"', not '"+b+"'",d)]);else if("list"===n)k=null;else if("attribute"===n)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;n=a.localnames.length;for(k=0;k<n;k+=1){b=d.getAttributeNS(a.namespaces[k],a.localnames[k]);""!==b||d.hasAttributeNS(a.namespaces[k],a.localnames[k])||(b=void 0);if(void 0!==l&&void 0!==b){k=[new h("Attribute defined too often.",d)];break a}l=b}k=void 0===l?[new h("Attribute not found: "+a.names,d)]:m(a.e[1],e,d,l)}else if("element"===n)k=f(a,e,d);else if("oneOrMore"===n){b=0;do l=e.currentNode,n=q(a.e[0],e,d),b+=1;while(!n&&l!==e.currentNode);1<b?(e.currentNode=l,k=null):k=n}else if("choice"===
n){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;l=e.currentNode;if("empty"===a.e[0].name){if(n=q(a.e[1],e,d,b))e.currentNode=l;k=null}else{if(n=m(a.e[0],e,d,b))e.currentNode=l,n=q(a.e[1],e,d,b);k=n}}else if("group"===n){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;k=q(a.e[0],e,d)||q(a.e[1],e,d)}else if("interleave"===n)a:{l=a.e.length;b=[l];for(var c=l,u,t,s,p;0<c;){u=0;t=e.currentNode;for(k=0;k<l;k+=1)s=e.currentNode,!0!==b[k]&&b[k]!==s&&(p=a.e[k],(n=
q(p,e,d))?(e.currentNode=s,void 0===b[k]&&(b[k]=!1)):s===e.currentNode||"oneOrMore"===p.name||"choice"===p.name&&("oneOrMore"===p.e[0].name||"oneOrMore"===p.e[1].name)?(u+=1,b[k]=s):(u+=1,b[k]=!0));if(t===e.currentNode&&u===c){k=null;break a}if(0===u){for(k=0;k<l;k+=1)if(!1===b[k]){k=[new h("Interleave does not match.",d)];break a}k=null;break a}for(k=c=0;k<l;k+=1)!0!==b[k]&&(c+=1)}k=null}else throw n+" not allowed in nonEmptyPattern.";return k};this.validate=function(a,e){a.currentNode=a.root;var d=
m(n.e[0],a,a.root);e(d)};this.init=function(a,g){n=a;e=g}};
// Input 22
xmldom.OperationalTransformInterface=function(){};xmldom.OperationalTransformInterface.prototype.retain=function(h){};xmldom.OperationalTransformInterface.prototype.insertCharacters=function(h){};xmldom.OperationalTransformInterface.prototype.insertElementStart=function(h,m){};xmldom.OperationalTransformInterface.prototype.insertElementEnd=function(){};xmldom.OperationalTransformInterface.prototype.deleteCharacters=function(h){};xmldom.OperationalTransformInterface.prototype.deleteElementStart=function(){};
xmldom.OperationalTransformInterface.prototype.deleteElementEnd=function(){};xmldom.OperationalTransformInterface.prototype.replaceAttributes=function(h){};xmldom.OperationalTransformInterface.prototype.updateAttributes=function(h){};
// Input 23
xmldom.OperationalTransformDOM=function(h,m){this.retain=function(f){};this.insertCharacters=function(f){};this.insertElementStart=function(f,n){};this.insertElementEnd=function(){};this.deleteCharacters=function(f){};this.deleteElementStart=function(){};this.deleteElementEnd=function(){};this.replaceAttributes=function(f){};this.updateAttributes=function(f){};this.atEnd=function(){return!0}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function h(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function m(a){for(var b=[],c=0,d=a.length,e;c<d;){var s=a,p=d,g=b,f="",n=[],q=s.indexOf("[",c),m=s.indexOf("/",c),A=s.indexOf("=",c);h(m,q,A)?(f=s.substring(c,m),c=m+1):h(q,m,A)?(f=s.substring(c,q),c=r(s,q,n)):h(A,m,q)?(f=s.substring(c,A),c=A):(f=s.substring(c,p),c=p);g.push({location:f,predicates:n});if(c<d&&"="===a[c]){e=a.substring(c+1,d);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);else try{e=
parseInt(e,10)}catch(F){}c=d}}return{steps:b,value:e}}function f(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function n(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function q(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function e(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function a(a,b,c){b=b.split(":",2);var d=c(b[0]),g=b[1];return new e(a,function(a){return a.localName===g&&a.namespaceURI===d})}function g(a,d,c){var g=new f,t=b(g,d,c),s=d.value;return void 0===s?new e(a,function(a){g.setNode(a);
t.reset();return t.next()}):new e(a,function(a){g.setNode(a);t.reset();return(a=t.next())&&a.nodeValue===s})}function d(a,d,c){var e=a.ownerDocument,g=[],s=null;if(e&&e.evaluate)for(c=e.evaluate(d,a,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),s=c.iterateNext();null!==s;)s.nodeType===Node.ELEMENT_NODE&&g.push(s),s=c.iterateNext();else{g=new f;g.setNode(a);a=m(d);g=b(g,a,c);a=[];for(c=g.next();c;)a.push(c),c=g.next();g=a}return g}var b,r;r=function(a,b,c){for(var d=b,e=a.length,s=0;d<e;)"]"===
a[d]?(s-=1,0>=s&&c.push(m(a.substring(b,d)))):"["===a[d]&&(0>=s&&(b=d+1),s+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};b=function(b,d,c){var e,f,s,p;for(e=0;e<d.steps.length;e+=1)for(s=d.steps[e],f=s.location,""===f?b=new q(b,!1):"@"===f[0]?(p=f.slice(1).split(":",2),b=new n(b,c(p[0]),p[1])):"."!==f&&(b=new q(b,!1),-1!==f.indexOf(":")&&(b=a(b,f,c))),f=0;f<s.predicates.length;f+=1)p=s.predicates[f],b=g(b,p,c);return b};xmldom.XPath=
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
odf.Namespaces=function(){function h(f){return m[f]||null}var m={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},f;h.lookupNamespaceURI=h;f=function(){};f.forEachPrefix=function(f){for(var q in m)m.hasOwnProperty(q)&&f(q,m[q])};f.resolvePrefix=h;f.namespaceMap=m;f.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";f.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";f.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";f.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";f.stylens=
"urn:oasis:names:tc:opendocument:xmlns:style:1.0";f.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";f.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";f.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";f.xlinkns="http://www.w3.org/1999/xlink";f.xmlns="http://www.w3.org/XML/1998/namespace";return f}();
// Input 26
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function h(a,b){for(var c=l[a.localName],p=c&&c[a.namespaceURI],d=p?p.length:0,e,c=0;c<d;c+=1)(e=a.getAttributeNS(p[c].ns,p[c].localname))&&a.setAttributeNS(p[c].ns,r[p[c].ns]+p[c].localname,b+e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(p=c,h(p,b)),c=c.nextSibling}function m(a,b){for(var c=l[a.localName],p=c&&c[a.namespaceURI],d=p?p.length:0,e,c=0;c<d;c+=1)if(e=a.getAttributeNS(p[c].ns,p[c].localname))e=e.replace(b,""),a.setAttributeNS(p[c].ns,r[p[c].ns]+p[c].localname,
e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(p=c,m(p,b)),c=c.nextSibling}function f(a,b){var c=l[a.localName],p=(c=c&&c[a.namespaceURI])?c.length:0,d,e,k;for(k=0;k<p;k+=1)if(d=a.getAttributeNS(c[k].ns,c[k].localname))b=b||{},e=c[k].keyname,e=b[e]=b[e]||{},e[d]=1;return b}function n(a,b){var c,p;f(a,b);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(p=c,n(p,b)),c=c.nextSibling}function q(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function e(a,b,c){var p=a+'"'+
b,d=c[p];d||(d=c[p]=new q(p,a,b));return d}function a(c,d,k){var p=l[c.localName],f=(p=p&&p[c.namespaceURI])?p.length:0,g=c.getAttributeNS(b,"name"),n=c.getAttributeNS(b,"family"),q;g&&n&&(d=e(g,n,k));if(d)for(g=0;g<f;g+=1)if(n=c.getAttributeNS(p[g].ns,p[g].localname))q=p[g].keyname,n=e(n,q,k),d.requires[n.key]=n;for(g=c.firstChild;g;)g.nodeType===Node.ELEMENT_NODE&&(c=g,a(c,d,k)),g=g.nextSibling;return k}function g(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){g(a.requires[c],
b)})}function d(b,c){var d=a(b,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&g(a,c)})}var b="urn:oasis:names:tc:opendocument:xmlns:style:1.0",r={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:","urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},k={text:[{ens:b,
en:"tab-stop",ans:b,a:"leader-text-style"},{ens:b,en:"drop-cap",ans:b,a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"notes-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"citation-body-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"notes-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"citation-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"a",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"alphabetical-index",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"linenumbering-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list-level-style-number",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"ruby-text",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"span",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"a",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"visited-style-name"},{ens:b,en:"text-properties",ans:b,a:"text-line-through-text-style"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"alphabetical-index-source",
ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"main-entry-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-bibliography",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-chapter",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-link-end",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-link-start",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-page-number",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-span",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"index-entry-tab-stop",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-entry-text",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-title-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list-level-style-bullet",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"outline-level-style",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"}],paragraph:[{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"caption",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"circle",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
en:"connector",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"control",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"custom-shape",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"ellipse",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"frame",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"line",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"measure",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
en:"path",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polygon",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"polyline",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"rect",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",
a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",en:"regular-polygon",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",en:"annotation",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"text-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",en:"column",ans:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",a:"text-style-name"},{ens:b,en:"style",ans:b,a:"next-style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"body",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"even-columns",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"even-rows",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
en:"first-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"first-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"last-column",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"last-row",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",
a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"odd-columns",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",en:"odd-rows",ans:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",a:"paragraph-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"notes-configuration",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"default-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"alphabetical-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"bibliography-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"h",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"illustration-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"index-source-style",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"object-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"p",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"table-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-of-content-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-index-entry-template",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-index-entry-template",
ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:b,en:"page-layout-properties",ans:b,a:"register-truth-ref-style-name"}],chart:[{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"axis",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"chart",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",en:"data-label",ans:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",
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
en:"notes",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:b,en:"handout-master",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"},{ens:b,en:"master-page",ans:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",a:"style-name"}],"list-style":[{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"numbered-paragraph",
ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"list-item",ans:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",a:"style-override"},{ens:b,en:"style",ans:b,a:"list-style-name"},{ens:b,en:"style",ans:b,a:"data-style-name"},{ens:b,en:"style",ans:b,a:"percentage-data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",en:"date-time-decl",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"creation-date",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"creation-time",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"database-display",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"date",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"editing-duration",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"expression",
ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"meta-field",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"modification-date",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"modification-time",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"print-date",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"print-time",ans:b,
a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-formula",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"time",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-defined",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-field-get",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-field-input",ans:b,a:"data-style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-get",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-input",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-set",ans:b,a:"data-style-name"}],data:[{ens:b,en:"style",ans:b,a:"data-style-name"},{ens:b,en:"style",ans:b,a:"percentage-data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",en:"date-time-decl",ans:b,a:"data-style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"creation-date",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"creation-time",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"database-display",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"date",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"editing-duration",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
en:"expression",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"meta-field",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"modification-date",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"modification-time",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"print-date",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"print-time",
ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"table-formula",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"time",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-defined",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-field-get",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"user-field-input",ans:b,a:"data-style-name"},
{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-get",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-input",ans:b,a:"data-style-name"},{ens:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",en:"variable-set",ans:b,a:"data-style-name"}],"page-layout":[{ens:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",en:"notes",ans:b,a:"page-layout-name"},{ens:b,en:"handout-master",ans:b,a:"page-layout-name"},{ens:b,en:"master-page",ans:b,
a:"page-layout-name"}]},l,c=new xmldom.XPath;this.UsedStyleList=function(a,c){var e={};this.uses=function(a){var c=a.localName,d=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(b,"name");a="style"===c?a.getAttributeNS(b,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":c;return(a=e[a])?0<a[d]:!1};n(a,e);c&&d(c,e)};this.canElementHaveStyle=function(a,b){var c=l[b.localName],c=c&&c[b.namespaceURI];return 0<(c?c.length:
0)};this.hasDerivedStyles=function(a,b,d){var p=b("style"),e=d.getAttributeNS(p,"name");d=d.getAttributeNS(p,"family");return c.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+d+"']",b).length?!0:!1};this.prefixStyleNames=function(a,c,d){var p;if(a){for(p=a.firstChild;p;){if(p.nodeType===Node.ELEMENT_NODE){var e=p,l=c,k=e.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),g=void 0;k?g="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":
(k=e.getAttributeNS(b,"name"))&&(g=b);g&&e.setAttributeNS(g,r[g]+"name",l+k)}p=p.nextSibling}h(a,c);d&&h(d,c)}};this.removePrefixFromStyleNames=function(a,c,d){var p=RegExp("^"+c);if(a){for(c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE){var e=c,l=p,k=e.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),g=void 0;k?g="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(k=e.getAttributeNS(b,"name"))&&(g=b);g&&(k=k.replace(l,""),e.setAttributeNS(g,r[g]+"name",k))}c=c.nextSibling}m(a,
p);d&&m(d,p)}};this.determineStylesForNode=f;l=function(a){var b,c,d,e,l,k={},g;for(b in a)if(a.hasOwnProperty(b))for(e=a[b],d=e.length,c=0;c<d;c+=1)l=e[c],g=k[l.en]=k[l.en]||{},g=g[l.ens]=g[l.ens]||[],g.push({ns:l.ans,localname:l.a,keyname:b});return k}(k)};
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
odf.OdfUtils=function(){function h(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===u}function m(a){return/^[ \t\r\n]+$/.test(a)}function f(a){var b=a&&a.localName;return("span"===b||"p"===b||"h"===b)&&a.namespaceURI===u}function n(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===u?d="s"===b||"tab"===b||"line-break"===b:c===t&&(d="frame"===b&&"as-char"===a.getAttributeNS(u,"anchor-type")));return d}function q(a){for(;null!==a.firstChild&&f(a);)a=a.firstChild;return a}function e(a){for(;null!==
a.lastChild&&f(a);)a=a.lastChild;return a}function a(a){for(;!h(a)&&null===a.previousSibling;)a=a.parentNode;return h(a)?null:e(a.previousSibling)}function g(a){for(;!h(a)&&null===a.nextSibling;)a=a.parentNode;return h(a)?null:q(a.nextSibling)}function d(b){for(var c=!1;b;)if(b.nodeType===Node.TEXT_NODE)if(0===b.length)b=a(b);else return!m(b.data.substr(b.length-1,1));else if(n(b)){c=!0;break}else b=a(b);return c}function b(b){var c=!1;for(b=b&&e(b);b;){if(b.nodeType===Node.TEXT_NODE&&0<b.length&&
!m(b.data)){c=!0;break}else if(n(b)){c=!0;break}b=a(b)}return c}function r(a){var b=!1;for(a=a&&q(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!m(a.data)){b=!0;break}else if(n(a)){b=!0;break}a=g(a)}return b}function k(a,b){return m(a.data.substr(b))?!r(g(a)):!1}function l(a){return(a=/-?([0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?{value:parseFloat(a[1]),unit:a[3]}:null}function c(a){return(a=l(a))&&"%"!==a.unit?null:a}
var u="urn:oasis:names:tc:opendocument:xmlns:text:1.0",t="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",s=/^\s*$/;this.isParagraph=h;this.getParagraphElement=function(a){for(;a&&!h(a);)a=a.parentNode;return a};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===u};this.isODFWhitespace=m;this.isGroupingElement=f;this.isCharacterElement=n;this.firstChild=q;this.lastChild=e;this.previousNode=a;this.nextNode=g;this.scanLeftForNonWhitespace=d;this.lookLeftForCharacter=
function(b){var c;c=0;b.nodeType===Node.TEXT_NODE&&0<b.length?(c=b.data,c=m(c.substr(c.length-1,1))?1===c.length?d(a(b))?2:0:m(c.substr(c.length-2,1))?0:2:1):n(b)&&(c=1);return c};this.lookRightForCharacter=function(a){var b=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?b=!m(a.data.substr(0,1)):n(a)&&(b=!0);return b};this.scanLeftForAnyCharacter=b;this.scanRightForAnyCharacter=r;this.isTrailingWhitespace=k;this.isSignificantWhitespace=function(c,e){var l=c.data,g;if(!m(l[e]))return!1;if(0<e){if(!m(l[e-
1]))return!0;if(1<e)if(!m(l[e-2]))g=!0;else{if(!m(l.substr(0,e)))return!1}else d(a(c))&&(g=!0);if(!0===g)return k(c,e)?!1:!0;l=l[e+1];return m(l)?!1:b(a(c))?!1:!0}return!1};this.getFirstNonWhitespaceChild=function(a){for(a=a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&s.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=l;this.parseFoFontSize=function(a){var b;b=(b=l(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||c(a)};this.parseFoLineHeight=function(a){var b;b=(b=l(a))&&(0>b.value||"%"===
b.unit)?null:b;return b||c(a)};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument,d=c.createRange(),e=[],l;l=c.createTreeWalker(a.commonAncestorContainer.nodeType===Node.TEXT_NODE?a.commonAncestorContainer.parentNode:a.commonAncestorContainer,NodeFilter.SHOW_ALL,function(c){d.selectNodeContents(c);if(!1===b&&c.nodeType===Node.TEXT_NODE){if(0>=a.compareBoundaryPoints(a.START_TO_START,d)&&0<=a.compareBoundaryPoints(a.END_TO_END,d))return NodeFilter.FILTER_ACCEPT}else if(-1===a.compareBoundaryPoints(a.END_TO_START,
d)&&1===a.compareBoundaryPoints(a.START_TO_END,d))return c.nodeType===Node.TEXT_NODE?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT},!1);l.currentNode=a.startContainer.previousSibling||a.startContainer.parentNode;for(c=l.nextNode();c;)e.push(c),c=l.nextNode();d.detach();return e}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");
odf.TextStyleApplicator=function(h,m,f){function n(a){function b(a,d){return"object"===typeof a&&"object"===typeof d?Object.keys(a).every(function(e){return b(a[e],d[e])}):a===d}this.isStyleApplied=function(c){c=m.getAppliedStylesForElement(c);return b(a,c)}}function q(a){var e={};this.applyStyleToContainer=function(c){var g;g=c.getAttributeNS(d,"style-name");var n=c.ownerDocument;g=g||"";if(!e.hasOwnProperty(g)){var s=g,p=g,q;p?(q=m.getStyleElement(p,"text"),q.parentNode===f?n=q.cloneNode(!0):(n=
n.createElementNS(b,"style:style"),n.setAttributeNS(b,"style:parent-style-name",p),n.setAttributeNS(b,"style:family","text"),n.setAttributeNS(r,"scope","document-content"))):(n=n.createElementNS(b,"style:style"),n.setAttributeNS(b,"style:family","text"),n.setAttributeNS(r,"scope","document-content"));m.updateStyle(n,a,h);f.appendChild(n);e[s]=n}g=e[g].getAttributeNS(b,"name");c.setAttributeNS(d,"text:style-name",g)}}var e,a=new odf.OdfUtils,g=new core.DomUtils,d=odf.Namespaces.textns,b=odf.Namespaces.stylens,
r="urn:webodf:names:scope";this.applyStyle=function(b,l){var c,f,m,s,p;c={};var h;runtime.assert(l&&l["style:text-properties"],"applyStyle without any text properties");c["style:text-properties"]=l["style:text-properties"];s=new q(c);p=new n(c);e=g.splitBoundaries(b);c=a.getTextNodes(b,!1);h={startContainer:b.startContainer,startOffset:b.startOffset,endContainer:b.endContainer,endOffset:b.endOffset};c.forEach(function(b){f=p.isStyleApplied(b);if(!1===f){var c=b.ownerDocument,e=b.parentNode,l,k=b,
n=new core.LoopWatchDog(1E3);a.isParagraph(e)?(c=c.createElementNS(d,"text:span"),e.insertBefore(c,b),l=!1):(b.previousSibling&&!g.rangeContainsNode(h,b.previousSibling)?(c=e.cloneNode(!1),e.parentNode.insertBefore(c,e.nextSibling)):c=e,l=!0);for(;k&&(k===b||g.rangeContainsNode(h,k));)n.check(),e=k.nextSibling,k.parentNode!==c&&c.appendChild(k),k=e;if(k&&l)for(b=c.cloneNode(!1),c.parentNode.insertBefore(b,c.nextSibling);k;)n.check(),e=k.nextSibling,b.appendChild(k),k=e;m=c;s.applyStyleToContainer(m)}});
e.forEach(g.normalizeTextNodes);e=null}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("xmldom.XPath");runtime.loadClass("core.CSSUnits");
odf.Style2CSS=function(){function h(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==u||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===s&&"list-style"===a.localName?"list":a.namespaceURI!==u||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(u,"family"))(c=a.getAttributeNS&&a.getAttributeNS(u,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function m(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=m(a[c].derivedStyles,b)))return d;return null}function f(a,b,c){var d=b[a],e,p;d&&(e=d.getAttributeNS(u,"parent-style-name"),p=null,e&&(p=m(c,e),!p&&b[e]&&(f(e,b,c),p=b[e],b[e]=null)),p?(p.derivedStyles||(p.derivedStyles={}),p.derivedStyles[a]=d):c[a]=d)}function n(a,b){for(var c in a)a.hasOwnProperty(c)&&(f(c,a,b),a[c]=null)}function q(a,b){var c=y[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+v[a].join(d+","+c+"|")+d}function e(a,b,c){var d=[],p,l;d.push(q(a,b));for(p in c.derivedStyles)if(c.derivedStyles.hasOwnProperty(p))for(l in b=e(a,p,c.derivedStyles[p]),b)b.hasOwnProperty(l)&&d.push(b[l]);return d}function a(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function g(a,b){var c="",d,e;for(d in b)b.hasOwnProperty(d)&&
(d=b[d],e=a.getAttributeNS(d[0],d[1]),d[2]&&e&&(c+=d[2]+":"+e+";"));return c}function d(b){return(b=a(b,u,"text-properties"))?V.parseFoFontSize(b.getAttributeNS(c,"font-size")):null}function b(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function r(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var e=c.getAttributeNS(s,"level"),
p;c=V.getFirstNonWhitespaceChild(c);c=V.getFirstNonWhitespaceChild(c);var l;c&&(p=c.attributes,l=p["fo:text-indent"]?p["fo:text-indent"].value:void 0,p=p["fo:margin-left"]?p["fo:margin-left"].value:void 0);l||(l="-0.6cm");c="-"===l.charAt(0)?l.substring(1):"-"+l;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";void 0!==p&&(p=e+"{margin-left:"+p+";}",a.insertRule(p,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+
d+";";d+="counter-increment:list;";d+="margin-left:"+l+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(g){throw g;}}function k(f,n,q,m){if("list"===n)for(var t=m.firstChild,h,v;t;){if(t.namespaceURI===s)if(h=t,"list-level-style-number"===t.localName){var E=h;v=E.getAttributeNS(u,"num-format");var y=E.getAttributeNS(u,"num-suffix"),w={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},E=E.getAttributeNS(u,"num-prefix")||"",E=w.hasOwnProperty(v)?
E+(" counter(list, "+w[v]+")"):v?E+("'"+v+"';"):E+" ''";y&&(E+=" '"+y+"'");v="content: "+E+";";r(f,q,h,v)}else"list-level-style-image"===t.localName?(v="content: none;",r(f,q,h,v)):"list-level-style-bullet"===t.localName&&(v="content: '"+h.getAttributeNS(s,"bullet-char")+"';",r(f,q,h,v));t=t.nextSibling}else if("page"===n)if(y=h=q="",t=m.getElementsByTagNameNS(u,"page-layout-properties")[0],h=t.parentNode.parentNode.parentNode.masterStyles,y="",q+=g(t,G),v=t.getElementsByTagNameNS(u,"background-image"),
0<v.length&&(y=v.item(0).getAttributeNS(p,"href"))&&(q+="background-image: url('odfkit:"+y+"');",v=v.item(0),q+=g(v,N)),"presentation"===ca){if(h)for(v=h.getElementsByTagNameNS(u,"master-page"),w=0;w<v.length;w+=1)if(v[w].getAttributeNS(u,"page-layout-name")===t.parentNode.getAttributeNS(u,"name")){y=v[w].getAttributeNS(u,"name");h="draw|page[draw|master-page-name="+y+"] {"+q+"}";y="office|body, draw|page[draw|master-page-name="+y+"] {"+g(t,T)+" }";try{f.insertRule(h,f.cssRules.length),f.insertRule(y,
f.cssRules.length)}catch(aa){throw aa;}}}else{if("text"===ca){h="office|text {"+q+"}";y="office|body {width: "+t.getAttributeNS(c,"page-width")+";}";try{f.insertRule(h,f.cssRules.length),f.insertRule(y,f.cssRules.length)}catch(ga){throw ga;}}}else{q=e(n,q,m).join(",");t="";if(h=a(m,u,"text-properties")){var w=h,K;v=K="";y=1;h=""+g(w,x);E=w.getAttributeNS(u,"text-underline-style");"solid"===E&&(K+=" underline");E=w.getAttributeNS(u,"text-line-through-style");"solid"===E&&(K+=" line-through");K.length&&
(h+="text-decoration:"+K+";");if(K=w.getAttributeNS(u,"font-name")||w.getAttributeNS(c,"font-family"))E=ba[K],h+="font-family: "+(E||K)+", sans-serif;";E=w.parentNode;if(w=d(E)){for(;E;){if(w=d(E))if("%"!==w.unit){v="font-size: "+w.value*y+w.unit+";";break}else y*=w.value/100;w=E;K=E="";E=null;"default-style"===w.localName?E=null:(E=w.getAttributeNS(u,"parent-style-name"),K=w.getAttributeNS(u,"family"),E=M.getODFElementsWithXPath(U,E?"//style:*[@style:name='"+E+"'][@style:family='"+K+"']":"//style:default-style[@style:family='"+
K+"']",odf.Namespaces.resolvePrefix)[0])}v||(v="font-size: "+parseFloat(W)*y+S.getUnits(W)+";");h+=v}t+=h}if(h=a(m,u,"paragraph-properties"))v=h,h=""+g(v,A),y=v.getElementsByTagNameNS(u,"background-image"),0<y.length&&(w=y.item(0).getAttributeNS(p,"href"))&&(h+="background-image: url('odfkit:"+w+"');",y=y.item(0),h+=g(y,N)),(v=v.getAttributeNS(c,"line-height"))&&"normal"!==v&&(v=V.parseFoLineHeight(v),h="%"!==v.unit?h+("line-height: "+v.value+";"):h+("line-height: "+v.value/100+";")),t+=h;if(h=a(m,
u,"graphic-properties"))w=h,h=""+g(w,F),v=w.getAttributeNS(l,"opacity"),y=w.getAttributeNS(l,"fill"),w=w.getAttributeNS(l,"fill-color"),"solid"===y||"hatch"===y?w&&"none"!==w?(v=isNaN(parseFloat(v))?1:parseFloat(v)/100,(w=b(w))&&(h+="background-color: rgba("+w.r+","+w.g+","+w.b+","+v+");")):h+="background: none;":"none"===y&&(h+="background: none;"),t+=h;if(h=a(m,u,"drawing-page-properties"))v=""+g(h,F),"true"===h.getAttributeNS(C,"background-visible")&&(v+="background: none;"),t+=v;if(h=a(m,u,"table-cell-properties"))h=
""+g(h,O),t+=h;if(h=a(m,u,"table-row-properties"))h=""+g(h,H),t+=h;if(h=a(m,u,"table-column-properties"))h=""+g(h,z),t+=h;if(h=a(m,u,"table-properties"))h=""+g(h,D),t+=h;if(0!==t.length)try{f.insertRule(q+"{"+t+"}",f.cssRules.length)}catch(L){throw L;}}for(var Z in m.derivedStyles)m.derivedStyles.hasOwnProperty(Z)&&k(f,n,Z,m.derivedStyles[Z])}var l=odf.Namespaces.drawns,c=odf.Namespaces.fons,u=odf.Namespaces.stylens,t=odf.Namespaces.svgns,s=odf.Namespaces.textns,p=odf.Namespaces.xlinkns,C=odf.Namespaces.presentationns,
y={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},v={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),
presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background",
"table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},x=[[c,"color","color"],[c,"background-color","background-color"],[c,"font-weight","font-weight"],[c,"font-style","font-style"]],N=[[u,"repeat","background-repeat"]],A=[[c,"background-color","background-color"],[c,"text-align","text-align"],[c,"text-indent","text-indent"],[c,"padding","padding"],[c,"padding-left","padding-left"],[c,"padding-right","padding-right"],[c,"padding-top","padding-top"],[c,"padding-bottom","padding-bottom"],[c,"border-left","border-left"],[c,"border-right",
"border-right"],[c,"border-top","border-top"],[c,"border-bottom","border-bottom"],[c,"margin","margin"],[c,"margin-left","margin-left"],[c,"margin-right","margin-right"],[c,"margin-top","margin-top"],[c,"margin-bottom","margin-bottom"],[c,"border","border"]],F=[[c,"background-color","background-color"],[c,"min-height","min-height"],[l,"stroke","border"],[t,"stroke-color","border-color"],[t,"stroke-width","border-width"]],O=[[c,"background-color","background-color"],[c,"border-left","border-left"],
[c,"border-right","border-right"],[c,"border-top","border-top"],[c,"border-bottom","border-bottom"],[c,"border","border"]],z=[[u,"column-width","width"]],H=[[u,"row-height","height"],[c,"keep-together",null]],D=[[u,"width","width"],[c,"margin-left","margin-left"],[c,"margin-right","margin-right"],[c,"margin-top","margin-top"],[c,"margin-bottom","margin-bottom"]],G=[[c,"background-color","background-color"],[c,"padding","padding"],[c,"padding-left","padding-left"],[c,"padding-right","padding-right"],
[c,"padding-top","padding-top"],[c,"padding-bottom","padding-bottom"],[c,"border","border"],[c,"border-left","border-left"],[c,"border-right","border-right"],[c,"border-top","border-top"],[c,"border-bottom","border-bottom"],[c,"margin","margin"],[c,"margin-left","margin-left"],[c,"margin-right","margin-right"],[c,"margin-top","margin-top"],[c,"margin-bottom","margin-bottom"]],T=[[c,"page-width","width"],[c,"page-height","height"]],ba={},V=new odf.OdfUtils,ca,U,W,M=new xmldom.XPath,S=new core.CSSUnits;
this.style2css=function(a,b,c,d,e){for(var p,l,g,f;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);p=null;d&&(p=d.ownerDocument,U=d.parentNode);e&&(p=e.ownerDocument,U=e.parentNode);if(p)for(f in odf.Namespaces.forEachPrefix(function(a,c){g="@namespace "+a+" url("+c+");";try{b.insertRule(g,b.cssRules.length)}catch(d){}}),ba=c,ca=a,W=window.getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=h(d),d=h(e),e={},y)if(y.hasOwnProperty(f))for(l in c=e[f]={},n(a[f],c),n(d[f],
c),c)c.hasOwnProperty(l)&&k(b,f,l,c[l])}};
// Input 30
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");
odf.OdfContainer=function(){function h(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function m(a){var b,c=k.length;for(b=0;b<c;b+=1)if(a.namespaceURI===d&&a.localName===k[b])return b;return-1}function f(a,b){var c;a&&(c=new g.UsedStyleList(a,b));this.acceptNode=function(a){return"http://www.w3.org/1999/xhtml"===a.namespaceURI?3:a.namespaceURI&&a.namespaceURI.match(/^urn:webodf:/)?2:c&&a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE?
c.uses(a)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function n(a,b){if(b){var c=m(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=m(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}function q(a){this.OdfContainer=a}function e(a,b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==
d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))};this.abort=function(){}}function a(a){this.length=0;this.item=function(a){}}var g=new odf.StyleInfo,d="urn:oasis:names:tc:opendocument:xmlns:office:1.0",b="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",r="urn:webodf:names:scope",k="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),l=(new Date).getTime()+
"_webodf_",c=new core.Base64;q.prototype=new function(){};q.prototype.constructor=q;q.namespaceURI=d;q.localName="document";e.prototype.load=function(){};e.prototype.getUrl=function(){return this.data?"data:;base64,"+c.toBase64(this.data):null};odf.OdfContainer=function t(c,p){function k(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?k(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function m(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&
c.setAttributeNS(r,"scope",b),c=c.nextSibling}function v(a,b){var c=null,d,e,l;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(l=d.getAttributeNS(r,"scope"))&&l!==b&&c.removeChild(d),d=e;return c}function x(a){var b=J.rootElement.ownerDocument,c;if(a){k(a.documentElement);try{c=b.importNode(a.documentElement,!0)}catch(d){}}return c}function N(a){J.state=a;if(J.onchange)J.onchange(J);if(J.onstatereadychange)J.onstatereadychange(J)}function A(a){Y=null;
J.rootElement=a;a.fontFaceDecls=h(a,d,"font-face-decls");a.styles=h(a,d,"styles");a.automaticStyles=h(a,d,"automatic-styles");a.masterStyles=h(a,d,"master-styles");a.body=h(a,d,"body");a.meta=h(a,d,"meta")}function F(a){a=x(a);var b=J.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===d?(b.fontFaceDecls=h(a,d,"font-face-decls"),n(b,b.fontFaceDecls),b.styles=h(a,d,"styles"),n(b,b.styles),b.automaticStyles=h(a,d,"automatic-styles"),m(b.automaticStyles,"document-styles"),n(b,b.automaticStyles),
b.masterStyles=h(a,d,"master-styles"),n(b,b.masterStyles),g.prefixStyleNames(b.automaticStyles,l,b.masterStyles)):N(t.INVALID)}function O(a){a=x(a);var b,c,e;if(a&&"document-content"===a.localName&&a.namespaceURI===d){b=J.rootElement;c=h(a,d,"font-face-decls");if(b.fontFaceDecls&&c)for(e=c.firstChild;e;)b.fontFaceDecls.appendChild(e),e=c.firstChild;else c&&(b.fontFaceDecls=c,n(b,c));c=h(a,d,"automatic-styles");m(c,"document-content");if(b.automaticStyles&&c)for(e=c.firstChild;e;)b.automaticStyles.appendChild(e),
e=c.firstChild;else c&&(b.automaticStyles=c,n(b,c));b.body=h(a,d,"body");n(b,b.body)}else N(t.INVALID)}function z(a){a=x(a);var b;a&&("document-meta"===a.localName&&a.namespaceURI===d)&&(b=J.rootElement,b.meta=h(a,d,"meta"),n(b,b.meta))}function H(a){a=x(a);var b;a&&("document-settings"===a.localName&&a.namespaceURI===d)&&(b=J.rootElement,b.settings=h(a,d,"settings"),n(b,b.settings))}function D(a){a=x(a);var c;if(a&&"manifest"===a.localName&&a.namespaceURI===b)for(c=J.rootElement,c.manifest=a,a=c.manifest.firstChild;a;)a.nodeType===
Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===b)&&(Q[a.getAttributeNS(b,"full-path")]=a.getAttributeNS(b,"media-type")),a=a.nextSibling}function G(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],P.loadAsDOM(c,function(b,c){d(c);J.state!==t.INVALID&&G(a)})):N(t.DONE)}function T(a){var b="";odf.Namespaces.forEachPrefix(function(a,c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function ba(){var a=new xmldom.LSSerializer,
b=T("document-meta");a.filter=new f;b+=a.writeToString(J.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function V(a,c){var d=document.createElementNS(b,"manifest:file-entry");d.setAttributeNS(b,"manifest:full-path",a);d.setAttributeNS(b,"manifest:media-type",c);return d}function ca(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="'+b+'"></manifest:manifest>'),c=h(a,b,"manifest"),d=new xmldom.LSSerializer,e;for(e in Q)Q.hasOwnProperty(e)&&c.appendChild(V(e,
Q[e]));d.filter=new f;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+d.writeToString(a,odf.Namespaces.namespaceMap)}function U(){var a=new xmldom.LSSerializer,b=T("document-settings");a.filter=new f;b+=a.writeToString(J.rootElement.settings,odf.Namespaces.namespaceMap);return b+"</office:document-settings>"}function W(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=v(J.rootElement.automaticStyles,"document-styles"),d=J.rootElement.masterStyles&&J.rootElement.masterStyles.cloneNode(!0),
e=T("document-styles");g.removePrefixFromStyleNames(c,l,d);b.filter=new f(d,c);e+=b.writeToString(J.rootElement.fontFaceDecls,a);e+=b.writeToString(J.rootElement.styles,a);e+=b.writeToString(c,a);e+=b.writeToString(d,a);return e+"</office:document-styles>"}function M(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=v(J.rootElement.automaticStyles,"document-content"),d=T("document-content");b.filter=new f(J.rootElement.body,c);d+=b.writeToString(c,a);d+=b.writeToString(J.rootElement.body,
a);return d+"</office:document-content>"}function S(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var e=x(c);e&&"document"===e.localName&&e.namespaceURI===d?(A(e),N(t.DONE)):N(t.INVALID)}})}function R(){function a(b,c){var l;c||(c=b);l=document.createElementNS(d,c);e[b]=l;e.appendChild(l)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),e=J.rootElement,l=document.createElementNS(d,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");
a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");e.body.appendChild(l);N(t.DONE);return b}function I(){var a,b=new Date;a=runtime.byteArrayFromString(U(),"utf8");P.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(ba(),"utf8");P.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(W(),"utf8");P.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(M(),"utf8");P.save("content.xml",a,!0,b);a=
runtime.byteArrayFromString(ca(),"utf8");P.save("META-INF/manifest.xml",a,!0,b)}function B(a,b){I();P.writeAs(a,function(a){b(a)})}var J=this,P,Q={},Y;this.onstatereadychange=p;this.parts=this.rootElement=this.state=this.onchange=null;this.setRootElement=A;this.getContentElement=function(){var a;Y||(a=J.rootElement.body,Y=a.getElementsByTagNameNS(d,"text")[0]||a.getElementsByTagNameNS(d,"presentation")[0]||a.getElementsByTagNameNS(d,"spreadsheet")[0]);return Y};this.getDocumentType=function(){var a=
J.getContentElement();return a&&a.localName};this.getPart=function(a){return new e(a,Q[a],J,P)};this.getPartData=function(a,b){P.load(a,b)};this.createByteArray=function(a,b){I();P.createByteArray(a,b)};this.saveAs=B;this.save=function(a){B(c,a)};this.getUrl=function(){return c};this.state=t.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(q);this.parts=new a(this);P=c?new core.Zip(c,function(a,
b){P=b;a?S(c,function(b){a&&(P.error=a+"\n"+b,N(t.INVALID))}):G([["styles.xml",F],["content.xml",O],["meta.xml",z],["settings.xml",H],["META-INF/manifest.xml",D]])}):R()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,null)};return odf.OdfContainer}();
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
runtime.loadClass("core.Base64");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.OdfContainer");
odf.FontLoader=function(){function h(f,e,a,g,d){var b,m=0,k;for(k in f)if(f.hasOwnProperty(k)){if(m===a){b=k;break}m+=1}if(!b)return d();e.getPartData(f[b].href,function(l,c){if(l)runtime.log(l);else{var k="@font-face { font-family: '"+(f[b].family||b)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+n.convertUTF8ArrayToBase64(c)+') format("truetype"); }';try{g.insertRule(k,g.cssRules.length)}catch(m){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(m)+"\nRule: "+k)}}h(f,
e,a+1,g,d)})}function m(f,e,a){h(f,e,0,a,function(){})}var f=new xmldom.XPath,n=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(n,e){for(var a=n.rootElement.fontFaceDecls;e.cssRules.length;)e.deleteRule(e.cssRules.length-1);if(a){var g={},d,b,h,k;if(a)for(a=f.getODFElementsWithXPath(a,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),d=0;d<a.length;d+=1)b=a[d],h=b.getAttributeNS(odf.Namespaces.stylens,"name"),k=b.getAttributeNS(odf.Namespaces.svgns,"font-family"),
b=f.getODFElementsWithXPath(b,"svg:font-face-src/svg:font-face-uri",odf.Namespaces.resolvePrefix),0<b.length&&(b=b[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),g[h]={href:b,family:k});m(g,n,e)}}};return odf.FontLoader}();
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.TextStyleApplicator");
odf.Formatting=function(){function h(a,b){Object.keys(b).forEach(function(c){try{a[c]=b[c].constructor===Object?h(a[c],b[c]):b[c]}catch(d){a[c]=b[c]}});return a}function m(a,d,e){var g;e=e||[b.rootElement.automaticStyles,b.rootElement.styles];for(g=e.shift();g;){for(g=g.firstChild;g;){if(g.nodeType===Node.ELEMENT_NODE&&(g.namespaceURI===l&&"style"===g.localName&&g.getAttributeNS(l,"family")===d&&g.getAttributeNS(l,"name")===a||"list-style"===d&&g.namespaceURI===c&&"list-style"===g.localName&&g.getAttributeNS(l,
"name")===a))return g;g=g.nextSibling}g=e.shift()}return null}function f(a){for(var b={},c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===l)for(b[c.nodeName]={},a=0;a<c.attributes.length;a+=1)b[c.nodeName][c.attributes[a].name]=c.attributes[a].value;c=c.nextSibling}return b}function n(a,b){Object.keys(b).forEach(function(c){var d=c.split(":"),e=d[1],l=odf.Namespaces.resolvePrefix(d[0]),d=b[c];"object"===typeof d&&Object.keys(d).length?(c=a.getElementsByTagNameNS(l,e)[0]||a.ownerDocument.createElementNS(l,
c),a.appendChild(c),n(c,d)):a.setAttributeNS(l,c,d)})}function q(a){var c=b.rootElement.styles,d;d={};for(var e={},g=a;g;)d=f(g),e=h(d,e),g=(d=g.getAttributeNS(l,"parent-style-name"))?m(d,a.getAttributeNS(l,"family"),[c]):null;a:{a=a.getAttributeNS(l,"family");for(c=b.rootElement.styles.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===l&&"default-style"===c.localName&&c.getAttributeNS(l,"family")===a){g=c;break a}c=c.nextSibling}g=null}g&&(d=f(g),e=h(d,e));return e}function e(a,
b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],l="",g=!1;c;)!g&&u.isGroupingElement(c)&&(g=!0),(d=r.determineStylesForNode(c))&&e.push(d),c=c.parentNode;g&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){l+="|"+b+":"+a+"|"})})}),b&&(b[l]=e));return g?e:void 0}function a(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var d=Object.keys(a[c])[0],e,g;e=m(d,c);g=q(e);b=h(g,b);b.orderedStyles.push({name:d,
family:c,displayName:e.getAttributeNS(l,"display-name")})})});return b}function g(){var a,d=[];[b.rootElement.automaticStyles,b.rootElement.styles].forEach(function(b){for(a=b.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===l&&"style"===a.localName||a.namespaceURI===c&&"list-style"===a.localName)&&d.push(a.getAttributeNS(l,"name")),a=a.nextSibling});return d}var d=this,b,r=new odf.StyleInfo,k=odf.Namespaces.svgns,l=odf.Namespaces.stylens,c=odf.Namespaces.textns,u=new odf.OdfUtils;
this.setOdfContainer=function(a){b=a};this.getFontMap=function(){for(var a=b.rootElement.fontFaceDecls,c={},d,e,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(d=a.getAttributeNS(l,"name"))&&((e=a.getAttributeNS(k,"font-family"))||a.getElementsByTagNameNS(k,"font-face-uri")[0])&&(c[d]=e),a=a.nextSibling;return c};this.getAvailableParagraphStyles=function(){for(var a=b.rootElement.styles&&b.rootElement.styles.firstChild,c,d,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===
l)&&(d=a,c=d.getAttributeNS(l,"family"),"paragraph"===c&&(c=d.getAttributeNS(l,"name"),d=d.getAttributeNS(l,"display-name")||c,c&&d&&e.push({name:c,displayName:d}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var c;c=r.hasDerivedStyles(b.rootElement,odf.Namespaces.resolvePrefix,a);a=(new r.UsedStyleList(b.rootElement.styles)).uses(a)||(new r.UsedStyleList(b.rootElement.automaticStyles)).uses(a)||(new r.UsedStyleList(b.rootElement.body)).uses(a);return c||a};this.getStyleElement=m;this.getStyleAttributes=
f;this.getInheritedStyleAttributes=q;this.getFirstNamedParentStyleNameOrSelf=function(a){for(var c=b.rootElement.automaticStyles,d=b.rootElement.styles,e;null!==(e=m(a,"paragraph",[c]));)a=e.getAttributeNS(l,"parent-style-name");return(e=m(a,"paragraph",[d]))?a:null};this.hasParagraphStyle=function(a){return Boolean(m(a,"paragraph"))};this.getAppliedStyles=function(b){var c={},d=[];u.getTextNodes(b).forEach(function(a){e(a,c)});Object.keys(c).forEach(function(b){d.push(a(c[b]))});return d};this.getAppliedStylesForElement=
function(b){return(b=e(b))?a(b):void 0};this.applyStyle=function(a,c,e){var l=odf.TextStyleApplicator,g=0,k,f;k=0;for(f=a.length;k<f;k+=1)g=(g<<5)-g+a.charCodeAt(k),g|=0;(new l("auto"+g+"_",d,b.rootElement.automaticStyles)).applyStyle(c,e)};this.updateStyle=function(a,b,c){var d,e;n(a,b);a.getAttributeNS(l,"name");if(c){d=g();e=0;do b=c+e,e+=1;while(-1!==d.indexOf(b));a.setAttributeNS(l,"style:name",b)}}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.Formatting");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.FontLoader");runtime.loadClass("odf.Style2CSS");runtime.loadClass("odf.OdfUtils");
odf.OdfCanvas=function(){function h(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(e)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function m(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a}function f(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function n(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}
function c(){var l=[],g=runtime.getWindow().getSelection(),k,f;for(k=0;k<g.rangeCount;k+=1)f=g.getRangeAt(k),null!==f&&(b(a,f.startContainer)&&b(a,f.endContainer))&&l.push(f);if(l.length===d.length){for(g=0;g<l.length&&(k=l[g],f=d[g],k=k===f?!1:null===k||null===f?!0:k.startContainer!==f.startContainer||k.startOffset!==f.startOffset||k.endContainer!==f.endContainer||k.endOffset!==f.endOffset,!k);g+=1);if(g===l.length)return}d=l;var g=[l.length],p,n=a.ownerDocument;for(k=0;k<l.length;k+=1)f=l[k],p=
n.createRange(),p.setStart(f.startContainer,f.startOffset),p.setEnd(f.endContainer,f.endOffset),g[k]=p;d=g;g=e.length;for(l=0;l<g;l+=1)e[l](a,d)}var d=[],e=[];this.addListener=function(a,b){var c,d=e.length;for(c=0;c<d;c+=1)if(e[c]===b)return;e.push(b)};f(a,"mouseup",c);f(a,"keyup",c);f(a,"keydown",c)}function q(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function e(a,b,c,d){c.setAttribute("styleid",b);var l,g=
c.getAttributeNS(v,"anchor-type"),k=c.getAttributeNS(C,"x"),f=c.getAttributeNS(C,"y"),n=c.getAttributeNS(C,"width"),q=c.getAttributeNS(C,"height"),h=c.getAttributeNS(t,"min-height"),m=c.getAttributeNS(t,"min-width"),s=c.getAttributeNS(u,"master-page-name"),r=null,y,x;y=0;var z,F=a.rootElement.ownerDocument;if(s){r=a.rootElement.masterStyles.getElementsByTagNameNS(p,"master-page");y=null;for(x=0;x<r.length;x+=1)if(r[x].getAttributeNS(p,"name")===s){y=r[x];break}r=y}else r=null;if(r){s=F.createElementNS(u,
"draw:page");z=r.firstElementChild;for(y=0;z;)"true"!==z.getAttributeNS(A,"placeholder")&&(x=z.cloneNode(!0),s.appendChild(x),e(a,b+"_"+y,x,d)),z=z.nextElementSibling,y+=1;D.appendChild(s);y=D.getElementsByTagNameNS(u,"page").length;if(x=s.getElementsByTagNameNS(v,"page-number")[0]){for(;x.firstChild;)x.removeChild(x.firstChild);x.appendChild(F.createTextNode(y))}e(a,b,s,d);s.setAttributeNS(u,"draw:master-page-name",r.getAttributeNS(p,"name"))}if("as-char"===g)l="display: inline-block;";else if(g||
k||f)l="position: absolute;";else if(n||q||h||m)l="display: block;";k&&(l+="left: "+k+";");f&&(l+="top: "+f+";");n&&(l+="width: "+n+";");q&&(l+="height: "+q+";");h&&(l+="min-height: "+h+";");m&&(l+="min-width: "+m+";");l&&(l="draw|"+c.localName+'[styleid="'+b+'"] {'+l+"}",d.insertRule(l,d.cssRules.length))}function a(a){for(a=a.firstChild;a;){if(a.namespaceURI===s&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function g(b,
c,d,e){function l(a){a&&(a='draw|image[styleid="'+b+'"] {'+("background-image: url("+a+");")+"}",e.insertRule(a,e.cssRules.length))}d.setAttribute("styleid",b);var g=d.getAttributeNS(x,"href"),k;if(g)try{k=c.getPart(g),k.onchange=function(a){l(a.url)},k.load()}catch(f){runtime.log("slight problem: "+f)}else g=a(d),l(g)}function d(a,b,c){function d(a,c,e){var l;c.hasAttributeNS(x,"href")&&(l=c.getAttributeNS(x,"href"),"#"===l[0]?(l=l.substring(1),a=function(){var a=O.getODFElementsWithXPath(b,"//text:bookmark-start[@text:name='"+
l+"']",odf.Namespaces.resolvePrefix);0===a.length&&(a=O.getODFElementsWithXPath(b,"//text:bookmark[@text:name='"+l+"']",odf.Namespaces.resolvePrefix));0<a.length&&a[0].scrollIntoView(!0);return!1}):a=function(){F.open(l)},c.onclick=a)}var e,l,g;l=b.getElementsByTagNameNS(v,"a");for(e=0;e<l.length;e+=1)g=l.item(e),d(a,g,c)}function b(a){var b=a.ownerDocument;H.getElementsByTagNameNS(a,v,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));
d=parseInt(a.getAttributeNS(v,"c"),10);if(1<d)for(a.removeAttributeNS(v,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function r(a){H.getElementsByTagNameNS(a,v,"tab").forEach(function(a){a.textContent="\t"})}function k(b,c,d,e){function l(a,b){var c=f.documentElement.namespaceURI;"video/"===b.substr(0,6)?(g=f.createElementNS(c,"video"),g.setAttribute("controls","controls"),k=f.createElementNS(c,"source"),k.setAttribute("src",a),k.setAttribute("type",b),g.appendChild(k),d.parentNode.appendChild(g)):
d.innerHtml="Unrecognised Plugin"}var g,k,f=d.ownerDocument,p;if(b=d.getAttributeNS(x,"href"))try{p=c.getPart(b),p.onchange=function(a){l(a.url,a.mimetype)},p.load()}catch(n){runtime.log("slight problem: "+n)}else runtime.log("using MP4 data fallback"),b=a(d),l(b,"video/mp4")}function l(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):
(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function c(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+
a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var u=odf.Namespaces.drawns,t=odf.Namespaces.fons,s=odf.Namespaces.officens,p=odf.Namespaces.stylens,C=odf.Namespaces.svgns,y=odf.Namespaces.tablens,v=odf.Namespaces.textns,x=odf.Namespaces.xlinkns,N=odf.Namespaces.xmlns,A=odf.Namespaces.presentationns,F=runtime.getWindow(),O=new xmldom.XPath,z=new odf.OdfUtils,H=new core.DomUtils,D;odf.OdfCanvas=function(a){function s(a,b,c){function d(a,b,c,e){aa.addToQueue(function(){g(a,
b,c,e)})}var e,l;e=b.getElementsByTagNameNS(u,"image");for(b=0;b<e.length;b+=1)l=e.item(b),d("image"+String(b),a,l,c)}function t(a,b,c){function d(a,b,c,e){aa.addToQueue(function(){k(a,b,c,e)})}var e,l;e=b.getElementsByTagNameNS(u,"plugin");for(b=0;b<e.length;b+=1)l=e.item(b),d("video"+String(b),a,l,c)}function C(){var b=a.firstChild;b.firstChild&&(1<E?(b.style.MozTransformOrigin="center top",b.style.WebkitTransformOrigin="center top",b.style.OTransformOrigin="center top",b.style.msTransformOrigin=
"center top"):(b.style.MozTransformOrigin="left top",b.style.WebkitTransformOrigin="left top",b.style.OTransformOrigin="left top",b.style.msTransformOrigin="left top"),b.style.WebkitTransform="scale("+E+")",b.style.MozTransform="scale("+E+")",b.style.OTransform="scale("+E+")",b.style.msTransform="scale("+E+")",a.style.width=Math.round(E*b.offsetWidth)+"px",a.style.height=Math.round(E*b.offsetHeight)+"px")}function x(c){function l(){for(var g=a;g.firstChild;)g.removeChild(g.firstChild);a.style.display=
"inline-block";var k=S.rootElement;a.ownerDocument.importNode(k,!0);R.setOdfContainer(S);var g=S,f=J;(new odf.FontLoader).loadFonts(g,f.sheet);q(S,R,P);for(var n=S,g=Q.sheet,f=a;f.firstChild;)f.removeChild(f.firstChild);f=M.createElementNS(a.namespaceURI,"div");f.style.display="inline-block";f.style.background="white";f.appendChild(k);a.appendChild(f);D=M.createElementNS(a.namespaceURI,"div");D.id="shadowContent";D.style.position="absolute";D.style.top=0;D.style.left=0;n.getContentElement().appendChild(D);
var h=k.body,m,x,w;x=[];for(m=h.firstChild;m&&m!==h;)if(m.namespaceURI===u&&(x[x.length]=m),m.firstChild)m=m.firstChild;else{for(;m&&m!==h&&!m.nextSibling;)m=m.parentNode;m&&m.nextSibling&&(m=m.nextSibling)}for(w=0;w<x.length;w+=1)m=x[w],e(n,"frame"+String(w),m,g);x=O.getODFElementsWithXPath(h,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(m=0;m<x.length;m+=1)h=x[m],h.setAttributeNS&&h.setAttributeNS("urn:webodf","containsparagraphanchor",!0);m=k.body.getElementsByTagNameNS(y,
"table-cell");for(h=0;h<m.length;h+=1)x=m.item(h),x.hasAttributeNS(y,"number-columns-spanned")&&x.setAttribute("colspan",x.getAttributeNS(y,"number-columns-spanned")),x.hasAttributeNS(y,"number-rows-spanned")&&x.setAttribute("rowspan",x.getAttributeNS(y,"number-rows-spanned"));d(n,k.body,g);b(k.body);r(k.body);s(n,k.body,g);t(n,k.body,g);m=k.body;var A,E,K,n={},h={},B;x=F.document.getElementsByTagNameNS(v,"list-style");for(k=0;k<x.length;k+=1)A=x.item(k),(E=A.getAttributeNS(p,"name"))&&(h[E]=A);m=
m.getElementsByTagNameNS(v,"list");for(k=0;k<m.length;k+=1)if(A=m.item(k),x=A.getAttributeNS(N,"id")){w=A.getAttributeNS(v,"continue-list");A.setAttribute("id",x);K="text|list#"+x+" > text|list-item > *:first-child:before {";if(E=A.getAttributeNS(v,"style-name")){A=h[E];B=z.getFirstNonWhitespaceChild(A);A=void 0;if("list-level-style-number"===B.localName){A=B.getAttributeNS(p,"num-format");E=B.getAttributeNS(p,"num-suffix");var H="",H={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},
I=void 0,I=B.getAttributeNS(p,"num-prefix")||"",I=H.hasOwnProperty(A)?I+(" counter(list, "+H[A]+")"):A?I+("'"+A+"';"):I+" ''";E&&(I+=" '"+E+"'");A=H="content: "+I+";"}else"list-level-style-image"===B.localName?A="content: none;":"list-level-style-bullet"===B.localName&&(A="content: '"+B.getAttributeNS(v,"bullet-char")+"';");B=A}if(w){for(A=n[w];A;)w=A,A=n[w];K+="counter-increment:"+w+";";B?(B=B.replace("list",w),K+=B):K+="content:counter("+w+");"}else w="",B?(B=B.replace("list",x),K+=B):K+="content: counter("+
x+");",K+="counter-increment:"+x+";",g.insertRule("text|list#"+x+" {counter-reset:"+x+"}",g.cssRules.length);K+="}";n[x]=w;K&&g.insertRule(K,g.cssRules.length)}f.insertBefore(D,f.firstChild);C();if(!c&&(g=[S],$.hasOwnProperty("statereadychange")))for(f=$.statereadychange,B=0;B<f.length;B+=1)f[B].apply(null,g)}S.state===odf.OdfContainer.DONE?l():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function Z(){S.state===odf.OdfContainer.DONE?l():(runtime.log("will be back later..."),
runtime.setTimeout(Z,500))},100))}function A(){if(w){for(var a=w.ownerDocument.createDocumentFragment();w.firstChild;)a.insertBefore(w.firstChild,null);w.parentNode.replaceChild(a,w)}}function H(a){a=a||F.event;for(var b=a.target,c=F.getSelection(),d=0<c.rangeCount?c.getRangeAt(0):null,e=d&&d.startContainer,l=d&&d.startOffset,g=d&&d.endContainer,k=d&&d.endOffset,f,p;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==v);)b=b.parentNode;Y&&(b&&b.parentNode!==w)&&(f=b.ownerDocument,p=f.documentElement.namespaceURI,
w?w.parentNode&&A():(w=f.createElementNS(p,"p"),w.style.margin="0px",w.style.padding="0px",w.style.border="0px",w.setAttribute("contenteditable",!0)),b.parentNode.replaceChild(w,b),w.appendChild(b),w.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),d.setStart(e,l),d.setEnd(g,k),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==a&&void 0!==a,"odf.OdfCanvas constructor needs DOM element");var M=a.ownerDocument,
S,R=new odf.Formatting,I=new n(a),B,J,P,Q,Y=!1,E=1,$={},w,aa=new h;l(M);B=new m(c(M));J=c(M);P=c(M);Q=c(M);this.refreshCSS=function(){q(S,R,P);C()};this.refreshSize=function(){C()};this.odfContainer=function(){return S};this.slidevisibilitycss=function(){return B.css};this.setOdfContainer=function(a,b){S=a;x(!0===b)};this.load=this.load=function(b){aa.clearQueue();a.innerHTML="loading "+b;a.removeAttribute("style");S=new odf.OdfContainer(b,function(a){S=a;x(!1)})};this.save=function(a){A();S.save(a)};
this.setEditable=function(b){f(a,"click",H);(Y=b)||A()};this.addListener=function(b,c){switch(b){case "selectionchange":I.addListener(b,c);break;case "click":f(a,b,c);break;default:var d=$[b];void 0===d&&(d=$[b]=[]);c&&-1===d.indexOf(c)&&d.push(c)}};this.getFormatting=function(){return R};this.setZoomLevel=function(a){E=a;C()};this.getZoomLevel=function(){return E};this.fitToContainingElement=function(b,c){var d=a.offsetHeight/E;E=b/(a.offsetWidth/E);c/d<E&&(E=c/d);C()};this.fitToWidth=function(b){E=
b/(a.offsetWidth/E);C()};this.fitSmart=function(b,c){var d,e;d=a.offsetWidth/E;e=a.offsetHeight/E;d=b/d;void 0!==c&&c/e<d&&(d=c/e);E=Math.min(1,d);C()};this.fitToHeight=function(b){E=b/(a.offsetHeight/E);C()};this.showFirstPage=function(){B.showFirstPage()};this.showNextPage=function(){B.showNextPage()};this.showPreviousPage=function(){B.showPreviousPage()};this.showPage=function(a){B.showPage(a);C()};this.showAllPages=function(){};this.getElement=function(){return a}};return odf.OdfCanvas}();
// Input 34
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(h,m,f){new odf.OdfContainer(h,function(n){if(n.state===odf.OdfContainer.INVALID)return f("Document "+h+" is invalid.");n.state===odf.OdfContainer.DONE?n.saveAs(m,function(n){f(n)}):f("Document was not completely loaded.")})};this.render=function(h,m,f){for(m=m.getElementsByTagName("body")[0];m.firstChild;)m.removeChild(m.firstChild);m=new odf.OdfCanvas(m);m.addListener("statereadychange",function(n){f(n)});m.load(h)}};
// Input 35
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
ops.Server=function(){};ops.Server.prototype.connect=function(h,m){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(h,m,f,n){};
// Input 36
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
ops.NowjsServer=function(){var h=this,m;this.getNowObject=function(){return m};this.connect=function(f,n){function h(){"unavailable"===m.networkStatus?(runtime.log("connection to server unavailable."),n("unavailable")):"ready"!==m.networkStatus?e>f?(runtime.log("connection to server timed out."),n("timeout")):(e+=100,runtime.getWindow().setTimeout(h,100)):(runtime.log("connection to collaboration server established."),n("ready"))}var e=0;m||(m=runtime.getVariable("now"),void 0===m&&(m={networkStatus:"unavailable"}),
h())};this.networkStatus=function(){return m?m.networkStatus:"unavailable"};this.login=function(f,n,h,e){m?m.login(f,n,h,e):e("Not connected to server")};this.createOperationRouter=function(f,n){return new ops.NowjsOperationRouter(f,n,h)};this.createUserModel=function(){return new ops.NowjsUserModel(h)}};
// Input 37
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
ops.PullBoxServer=function(h){function m(e,a){var g=new XMLHttpRequest,d=new core.ByteArrayWriter("utf8");runtime.log("Sending message to server: "+e);d.appendString(e);d=d.getByteArray();g.open("POST",h.url,!0);g.onreadystatechange=function(){4===g.readyState&&((200>g.status||300<=g.status)&&0===g.status&&runtime.log("Status "+String(g.status)+": "+g.responseText||g.statusText),a(g.responseText))};d=d.buffer&&!g.sendAsBinary?d.buffer:runtime.byteArrayToString(d,"binary");try{g.sendAsBinary?g.sendAsBinary(d):
g.send(d)}catch(b){runtime.log("Problem with calling server: "+b+" "+d),a(b.message)}}var f=this,n,q=new core.Base64;h=h||{};h.url=h.url||"/WSER";this.call=m;this.getBase64=function(){return q};this.getToken=function(){return n};this.connect=function(e,a){a("ready")};this.networkStatus=function(){return"ready"};this.login=function(e,a,g,d){m("login:"+q.toBase64(e)+":"+q.toBase64(a),function(a){var e=runtime.fromJson(a);runtime.log("Login reply: "+a);e.hasOwnProperty("token")?(n=e.token,runtime.log("Caching token: "+
f.getToken()),g(e)):d(a)})};this.createOperationRouter=function(e,a){return new ops.PullBoxOperationRouter(e,a,f)};this.createUserModel=function(){return new ops.PullBoxUserModel(f)}};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
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
ops.OpAddCursor=function(){var h=this,m,f;this.init=function(n){m=n.memberid;f=n.timestamp};this.transform=function(f,m){return[h]};this.execute=function(f){var h=f.getCursor(m);if(h)return!1;h=new ops.OdtCursor(m,f);f.addCursor(h);f.emit(ops.OdtDocument.signalCursorAdded,h);return!0};this.spec=function(){return{optype:"AddCursor",memberid:m,timestamp:f}}};
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
runtime.loadClass("odf.OdfUtils");
ops.OpApplyStyle=function(){function h(a){var d=0<=e?q+e:q,g=a.getIteratorAtPosition(0<=e?q:q+e),d=e?a.getIteratorAtPosition(d):g;a=a.getDOM().createRange();a.setStart(g.container(),g.unfilteredDomOffset());a.setEnd(d.container(),d.unfilteredDomOffset());return a}function m(a){var e=a.commonAncestorContainer,k=[];for(e.nodeType===Node.ELEMENT_NODE&&(k=d.getElementsByTagNameNS(e,"urn:oasis:names:tc:opendocument:xmlns:text:1.0","p").concat(d.getElementsByTagNameNS(e,"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"h")));e&&!g.isParagraph(e);)e=e.parentNode;e&&k.push(e);return k.filter(function(d){var c=d.nodeType===Node.TEXT_NODE?d.length:d.childNodes.length;return 0>=a.comparePoint(d,0)&&0<=a.comparePoint(d,c)})}var f,n,q,e,a,g=new odf.OdfUtils,d=new core.DomUtils;this.init=function(b){f=b.memberid;n=b.timestamp;q=parseInt(b.position,10);e=parseInt(b.length,10);a=b.info};this.transform=function(a,d){return null};this.execute=function(b){var d=h(b),e=m(d);b.getFormatting().applyStyle(f,d,a);d.detach();b.getOdfCanvas().refreshCSS();
e.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:f,timeStamp:n})});return!0};this.spec=function(){return{optype:"ApplyStyle",memberid:f,timestamp:n,position:q,length:e,info:a}}};
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
ops.OpRemoveCursor=function(){var h=this,m,f;this.init=function(n){m=n.memberid;f=n.timestamp};this.transform=function(f,q){var e=f.spec();return"RemoveCursor"===e.optype&&e.memberid===m?[]:[h]};this.execute=function(f){return f.removeCursor(m)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:m,timestamp:f}}};
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
ops.OpMoveCursor=function(){var h=this,m,f,n,q;this.init=function(e){m=e.memberid;f=e.timestamp;n=parseInt(e.position,10);q=void 0!==e.length?parseInt(e.length,10):0};this.merge=function(e){return"MoveCursor"===e.optype&&e.memberid===m?(n=e.position,q=e.length,f=e.timestamp,!0):!1};this.transform=function(e,a){var g=e.spec(),d=g.optype,b=[h];"RemoveText"===d?g.position+g.length<=n?n-=g.length:g.position<n&&(n=g.position):"SplitParagraph"===d?g.position<n&&(n+=1):"InsertText"===d?g.position<n&&(n+=
g.text.length):"RemoveCursor"===d&&g.memberid===m?b=[]:"InsertTable"===d&&(b=null);return b};this.execute=function(e){var a=e.getCursor(m),g=e.getCursorPosition(m),d=e.getPositionFilter(),b=n-g;if(!a)return!1;g=a.getStepCounter();b=0<b?g.countForwardSteps(b,d):0>b?-g.countBackwardSteps(-b,d):0;a.move(b);q&&(d=0<q?g.countForwardSteps(q,d):0>q?-g.countBackwardSteps(-q,d):0,a.move(d,!0));e.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:m,
timestamp:f,position:n,length:q}}};
// Input 43
ops.OpInsertTable=function(){function h(a,b){var c;if(1===r.length)c=r[0];else if(3===r.length)switch(a){case 0:c=r[0];break;case q-1:c=r[2];break;default:c=r[1]}else c=r[a];if(1===c.length)return c[0];if(3===c.length)switch(b){case 0:return c[0];case e-1:return c[2];default:return c[1]}return c[b]}var m=this,f,n,q,e,a,g,d,b,r;this.init=function(k){f=k.memberid;n=k.timestamp;a=parseInt(k.position,10);q=parseInt(k.initialRows,10);e=parseInt(k.initialColumns,10);g=k.tableName;d=k.tableStyleName;b=k.tableColumnStyleName;
r=k.tableCellStyleMatrix};this.transform=function(b,d){var c=b.spec(),e=c.optype,g=[m];if("InsertTable"===e)g=null;else if("SplitParagraph"===e)if(c.position<a)a+=1;else{if(c.position===a&&!d)return a+=1,null}else if("InsertText"===e)if(c.position<a)a+=c.text.length;else{if(c.position===a&&!d)return a+=c.text.length,null}else"RemoveText"===e&&(c.position+c.length<=a?a-=c.length:c.position<a&&(a=c.position));return g};this.execute=function(k){var l=k.getPositionInTextNode(a),c=k.getRootNode();if(l){var m=
k.getDOM(),r=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),s=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),p,C,y,v;d&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);g&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",g);s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",e);b&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:style-name",b);r.appendChild(s);for(y=0;y<q;y+=1){s=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(v=0;v<e;v+=1)p=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(C=h(y,v))&&p.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",C),C=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),p.appendChild(C),s.appendChild(p);r.appendChild(s)}l=k.getParagraphElement(l.textNode);
c.insertBefore(r,l?l.nextSibling:void 0);k.getOdfCanvas().refreshSize();k.emit(ops.OdtDocument.signalTableAdded,{tableElement:r,memberId:f,timeStamp:n});return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:f,timestamp:n,position:a,initialRows:q,initialColumns:e,tableName:g,tableStyleName:d,tableColumnStyleName:b,tableCellStyleMatrix:r}}};
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
ops.OpInsertText=function(){function h(a,e){var d=e.parentNode,b=e.nextSibling,f=[];a.getCursors().forEach(function(a){var b=a.getSelectedRange();!b||b.startContainer!==e&&b.endContainer!==e||f.push({cursor:a,startContainer:b.startContainer,startOffset:b.startOffset,endContainer:b.endContainer,endOffset:b.endOffset})});d.removeChild(e);d.insertBefore(e,b);f.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var m=
this,f,n,q,e;this.init=function(a){f=a.memberid;n=a.timestamp;q=parseInt(a.position,10);e=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===f&&a.position===q+e.length?(e+=a.text,n=a.timestamp,!0):!1};this.transform=function(a,e){var d=a.spec(),b=d.optype,f=[m];if("InsertText"===b)if(d.position<q)q+=d.text.length;else{if(d.position===q&&!e)return q+=d.text.length,null}else if("SplitParagraph"===b)if(d.position<q)q+=1;else{if(d.position===q&&!e)return q+=1,null}else"InsertTable"===
b?f=null:"RemoveText"===b&&(d.position+d.length<=q?q-=d.length:d.position<q&&(q=d.position));return f};this.execute=function(a){var g,d=e.split(" "),b,m,k,l,c=a.getRootNode().ownerDocument,u;if(g=a.getPositionInTextNode(q,f)){m=g.textNode;k=m.parentNode;l=m.nextSibling;b=g.offset;g=a.getParagraphElement(m);b!==m.length&&(l=m.splitText(b));0<d[0].length&&m.appendData(d[0]);for(u=1;u<d.length;u+=1)b=c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s"),b.appendChild(c.createTextNode(" ")),
k.insertBefore(b,l),0<d[u].length&&k.insertBefore(c.createTextNode(d[u]),l);h(a,m);0===m.length&&m.parentNode.removeChild(m);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:g,memberId:f,timeStamp:n});return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:f,timestamp:n,position:q,text:e}}};
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
runtime.loadClass("odf.OdfUtils");runtime.loadClass("core.DomUtils");
ops.OpRemoveText=function(){function h(a){if(!d.isParagraph(a)&&(d.isGroupingElement(a)||d.isCharacterElement(a))&&0===a.textContent.length){for(a=a.firstChild;a;){if(d.isCharacterElement(a))return!1;a=a.nextSibling}return!0}return!1}function m(a,b,e){var c,g;c=e?b.lastChild:b.firstChild;for(e&&(g=a.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||a.firstChild);c;){b.removeChild(c);if("editinfo"!==c.localName)if(h(c))for(;c.firstChild;)a.insertBefore(c.firstChild,g);else a.insertBefore(c,
g);c=e?b.lastChild:b.firstChild}a=b.parentNode;a.removeChild(b);d.isListItem(a)&&0===a.childNodes.length&&a.parentNode.removeChild(a)}var f=this,n,q,e,a,g,d=new odf.OdfUtils,b;this.init=function(f){runtime.assert(0<=f.length,"OpRemoveText only supports positive lengths");n=f.memberid;q=f.timestamp;e=parseInt(f.position,10);a=parseInt(f.length,10);g=f.text;d=new odf.OdfUtils;b=new core.DomUtils};this.transform=function(b,d){var l=b.spec(),c=l.optype,g=e+a,m=[f];"RemoveText"===c?(c=l.position+l.length,
c<=e?e-=l.length:l.position<g&&(e<l.position?a=c<g?a-l.length:l.position-e:c<g?(e=l.position,a=g-c):m=[])):"InsertText"===c?l.position<=e&&(e+=l.text.length):"SplitParagraph"===c?l.position<=e&&(e+=1):"InsertTable"===c&&(m=null);return m};this.execute=function(d){var g=[],l,c,f,t=null,s=null,p;c=e;var C=a;d.upgradeWhitespacesAtPosition(c);l=d.getPositionInTextNode(c);var g=l.textNode,y=l.offset,v=g.parentNode;l=d.getParagraphElement(v);f=C;""===g.data?(v.removeChild(g),c=d.getTextNeighborhood(c,C)):
0!==y?(v=f<g.length-y?f:g.length-y,g.deleteData(y,v),d.upgradeWhitespacesAtPosition(c),c=d.getTextNeighborhood(c,C+v),f-=v,v&&c[0]===g&&c.splice(0,1)):c=d.getTextNeighborhood(c,C);for(g=c;f;)if(g[0]&&(t=g[0],s=t.parentNode,p=t.length),c=d.getParagraphElement(t),l!==c){if(c=d.getNeighboringParagraph(l,1))1<d.getWalkableParagraphLength(l)?m(l,c,!1):(m(c,l,!0),l=c);f-=1}else if(p<=f){s.removeChild(t);for(d.fixCursorPositions(n);h(s);)s=b.mergeIntoParent(s);f-=p;g.splice(0,1)}else t.deleteData(0,f),d.upgradeWhitespacesAtPosition(e),
f=0;d.fixCursorPositions(n);d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:l,memberId:n,timeStamp:q});d.emit(ops.OdtDocument.signalCursorMoved,d.getCursor(n));return!0};this.spec=function(){return{optype:"RemoveText",memberid:n,timestamp:q,position:e,length:a,text:g}}};
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
ops.OpSplitParagraph=function(){var h=this,m,f,n,q=new odf.OdfUtils;this.init=function(e){m=e.memberid;f=e.timestamp;n=parseInt(e.position,10)};this.transform=function(e,a){var g=e.spec(),d=g.optype,b=[h];if("SplitParagraph"===d)if(g.position<n)n+=1;else{if(g.position===n&&!a)return n+=1,null}else if("InsertText"===d)if(g.position<n)n+=g.text.length;else{if(g.position===n&&!a)return n+=g.text.length,null}else"InsertTable"===d?b=null:"RemoveText"===d&&(g.position+g.length<=n?n-=g.length:g.position<
n&&(n=g.position));return b};this.execute=function(e){var a,g,d,b,h,k;a=e.getPositionInTextNode(n,m);if(!a)return!1;g=e.getParagraphElement(a.textNode);if(!g)return!1;d=q.isListItem(g.parentNode)?g.parentNode:g;0===a.offset?(k=a.textNode.previousSibling,h=null):(k=a.textNode,h=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==d;)if(a=a.parentNode,b=a.cloneNode(!1),k){for(h&&b.appendChild(h);k.nextSibling;)b.appendChild(k.nextSibling);a.parentNode.insertBefore(b,
a.nextSibling);k=a;h=b}else a.parentNode.insertBefore(b,a),k=b,h=a;q.isListItem(h)&&(h=h.childNodes[0]);e.fixCursorPositions(m);e.getOdfCanvas().refreshSize();e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:g,memberId:m,timeStamp:f});e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:h,memberId:m,timeStamp:f});return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:m,timestamp:f,position:n}}};
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
ops.OpSetParagraphStyle=function(){var h=this,m,f,n,q;this.init=function(e){m=e.memberid;f=e.timestamp;n=e.position;q=e.styleName};this.transform=function(e,a){var g=e.spec();"DeleteParagraphStyle"===g.optype&&g.styleName===q&&(q="");return[h]};this.execute=function(e){var a;if(a=e.getPositionInTextNode(n))if(a=e.getParagraphElement(a.textNode))return""!==q?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",q):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),e.getOdfCanvas().refreshSize(),e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:f,memberId:m}),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:m,timestamp:f,position:n,styleName:q}}};
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
ops.OpUpdateParagraphStyle=function(){function h(a,b,d){var e,g,f;for(e=0;e<d.length;e+=1)g=d[e],f=b[g.propertyName],void 0!==f&&a.setAttributeNS(g.attrNs,g.attrPrefix+":"+g.attrLocaName,void 0!==g.unit?f+g.unit:f)}function m(a,b,d){var e,g;for(e=0;e<d.length;e+=1)g=d[e],-1!==b.indexOf(g.propertyName)&&a.removeAttributeNS(g.attrNs,g.attrLocaName)}function f(a,b,d,e,g){var f,k;if((a||b)&&(d||e))for(f=0;f<g.length;f+=1)if(k=g[f].propertyName,d&&void 0!==d[k]||e&&-1!==e.indexOf(k))a&&delete a[k],b&&
(k=b.indexOf(k),-1!==k&&b.splice(k,1))}function n(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}var q=this,e,a,g,d,b,r=[{propertyName:"fontSize",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"font-size",unit:"pt"},{propertyName:"fontName",attrNs:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",attrPrefix:"style",attrLocaName:"font-name"},{propertyName:"color",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",
attrLocaName:"color"},{propertyName:"backgroundColor",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"background-color"},{propertyName:"fontWeight",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"font-weight"},{propertyName:"fontStyle",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"font-style"},{propertyName:"underline",attrNs:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",
attrPrefix:"style",attrLocaName:"text-underline-style"},{propertyName:"strikethrough",attrNs:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",attrPrefix:"style",attrLocaName:"text-line-through-style"}],k=[{propertyName:"topMargin",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"margin-top",unit:"mm"},{propertyName:"bottomMargin",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"margin-bottom",unit:"mm"},
{propertyName:"leftMargin",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"margin-left",unit:"mm"},{propertyName:"rightMargin",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"margin-right",unit:"mm"},{propertyName:"textAlign",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"text-align"}];this.init=function(l){e=l.memberid;a=l.timestamp;g=l.styleName;
d=l.setProperties;b=l.removedProperties};this.transform=function(a,c){var e=a.spec(),m=e.optype;if("UpdateParagraphStyle"===m){if(!(e.styleName!==g||c||(f(d?d.paragraphProperties:null,b?b.paragraphPropertyNames:null,e.setProperties?e.setProperties.paragraphProperties:null,e.removedProperties?e.removedProperties.paragraphPropertyNames:null,k),f(d?d.textProperties:null,b?b.textPropertyNames:null,e.setProperties?e.setProperties.textProperties:null,e.removedProperties?e.removedProperties.textPropertyNames:
null,r),d&&(n(d.textProperties)||n(d.paragraphProperties))||b&&(0<b.textPropertyNames.length||0<b.paragraphPropertyNames.length))))return[]}else if("DeleteParagraphStyle"===m&&e.styleName===g)return[];return[q]};this.execute=function(a){var c,e,f,n;return(c=a.getParagraphStyleElement(g))?(e=c.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","paragraph-properties")[0],f=c.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties")[0],d&&(void 0===
e&&d.paragraphProperties&&(e=a.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:paragraph-properties"),c.appendChild(e)),void 0===f&&d.textProperties&&(f=a.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:text-properties"),c.appendChild(f)),d.paragraphProperties&&h(e,d.paragraphProperties,k),d.textProperties&&(d.textProperties.fontName&&!a.getOdfCanvas().getFormatting().getFontMap().hasOwnProperty(d.textProperties.fontName)&&(n=a.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0",
"style:font-face"),n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",d.textProperties.fontName),n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","svg:font-family",d.textProperties.fontName),a.getOdfCanvas().odfContainer().rootElement.fontFaceDecls.appendChild(n)),h(f,d.textProperties,r))),b&&(b.paragraphPropertyNames&&(m(e,b.paragraphPropertyNames,k),0===e.attributes.length&&c.removeChild(e)),b.textPropertyNames&&(m(f,b.textPropertyNames,r),
0===f.attributes.length&&c.removeChild(f))),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,g),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:e,timestamp:a,styleName:g,setProperties:d,removedProperties:b}}};
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
ops.OpCloneParagraphStyle=function(){var h=this,m,f,n,q,e;this.init=function(a){m=a.memberid;f=a.timestamp;n=a.styleName;q=a.newStyleName;e=a.newStyleDisplayName};this.transform=function(a,e){var d=a.spec();return"UpdateParagraphStyle"!==d.optype&&"DeleteParagraphStyle"!==d.optype||d.styleName!==n?[h]:null};this.execute=function(a){var g=a.getParagraphStyleElement(n),d;if(!g)return!1;d=g.cloneNode(!0);d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",q);e?d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0",
"style:display-name",e):d.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","display-name");g.parentNode.appendChild(d);a.getOdfCanvas().refreshCSS();a.emit(ops.OdtDocument.signalStyleCreated,q);return!0};this.spec=function(){return{optype:"CloneParagraphStyle",memberid:m,timestamp:f,styleName:n,newStyleName:q,newStyleDisplayName:e}}};
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
ops.OpDeleteParagraphStyle=function(){var h=this,m,f,n;this.init=function(h){m=h.memberid;f=h.timestamp;n=h.styleName};this.transform=function(f,e){var a=f.spec(),g=a.optype;if("DeleteParagraphStyle"===g){if(a.styleName===n)return[]}else if("SetParagraphStyle"===g&&a.styleName===n)return a.styleName="",g=new ops.OpSetParagraphStyle,g.init(a),[g,h];return[h]};this.execute=function(f){var e=f.getParagraphStyleElement(n);if(!e)return!1;e.parentNode.removeChild(e);f.getOdfCanvas().refreshCSS();f.emit(ops.OdtDocument.signalStyleDeleted,
n);return!0};this.spec=function(){return{optype:"DeleteParagraphStyle",memberid:m,timestamp:f,styleName:n}}};
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
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpApplyStyle");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpCloneParagraphStyle");runtime.loadClass("ops.OpDeleteParagraphStyle");
ops.OperationFactory=function(){function h(f){return function(){return new f}}var m;this.register=function(f,h){m[f]=h};this.create=function(f){var h=null,q=m[f.optype];q&&(h=q(f),h.init(f));return h};m={AddCursor:h(ops.OpAddCursor),ApplyStyle:h(ops.OpApplyStyle),InsertTable:h(ops.OpInsertTable),InsertText:h(ops.OpInsertText),RemoveText:h(ops.OpRemoveText),SplitParagraph:h(ops.OpSplitParagraph),SetParagraphStyle:h(ops.OpSetParagraphStyle),UpdateParagraphStyle:h(ops.OpUpdateParagraphStyle),CloneParagraphStyle:h(ops.OpCloneParagraphStyle),
DeleteParagraphStyle:h(ops.OpDeleteParagraphStyle),MoveCursor:h(ops.OpMoveCursor),RemoveCursor:h(ops.OpRemoveCursor)}};
// Input 52
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(h,m){function f(){c.setUnfilteredPosition(h.getNode(),0);return c}function n(a,b,c){var d;c.setStart(a,b);d=c.getClientRects()[0];if(!d)if(d={},a.childNodes[b-1]){c.setStart(a,b-1);c.setEnd(a,b);b=c.getClientRects()[0];if(!b){for(c=b=0;a&&a.nodeType===Node.ELEMENT_NODE;)b+=a.offsetLeft-a.scrollLeft,c+=a.offsetTop-a.scrollTop,a=a.parentNode;b={top:c,left:b}}d.top=b.top;d.left=b.right;d.bottom=b.bottom}else a.nodeType===Node.TEXT_NODE?(a.previousSibling&&(d=a.previousSibling.getClientRects()[0]),
d||(c.setStart(a,0),c.setEnd(a,b),d=c.getClientRects()[0])):d=a.getClientRects()[0];return{top:d.top,left:d.left,bottom:d.bottom}}function q(a,b,c){var d=a,e=f(),g,l=m.ownerDocument.createRange(),k=h.getSelectedRange()?h.getSelectedRange().cloneRange():m.ownerDocument.createRange(),q;for(g=n(h.getNode(),0,l);0<d&&c();)d-=1;b?(b=e.container(),e=e.unfilteredDomOffset(),-1===k.comparePoint(b,e)?(k.setStart(b,e),q=!1):k.setEnd(b,e)):(k.setStart(e.container(),e.unfilteredDomOffset()),k.collapse(!0));h.setSelectedRange(k,
q);k=n(h.getNode(),0,l);if(k.top===g.top||void 0===u)u=k.left;window.clearTimeout(t);t=window.setTimeout(function(){u=void 0},2E3);l.detach();return a-d}function e(a){var b=f();return 1===a.acceptPosition(b)?!0:!1}function a(a,b){for(var c=f(),d=new core.LoopWatchDog(1E3),e=0,g=0;0<a&&c.nextPosition();)e+=1,d.check(),1===b.acceptPosition(c)&&(g+=e,e=0,a-=1);return g}function g(a,b){for(var c=f(),d=new core.LoopWatchDog(1E3),e=0,g=0;0<a&&c.previousPosition();)e+=1,d.check(),1===b.acceptPosition(c)&&
(g+=e,e=0,a-=1);return g}function d(a,b){var c=f(),d=0,e=0,g=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var l=b,k=g,h=c,q=h.container(),t=0,r=null,D=void 0,G=10,T=void 0,ba=0,V=void 0,ca=void 0,U=void 0,T=void 0,W=m.ownerDocument.createRange(),M=new core.LoopWatchDog(1E3),T=n(q,h.unfilteredDomOffset(),W),V=T.top,ca=void 0===u?T.left:u,U=V;!0===(0>k?h.previousPosition():h.nextPosition());)if(M.check(),1===l.acceptPosition(h)&&(t+=1,q=h.container(),T=n(q,h.unfilteredDomOffset(),W),T.top!==V)){if(T.top!==
U&&U!==V)break;U=T.top;T=Math.abs(ca-T.left);if(null===r||T<G)r=q,D=h.unfilteredDomOffset(),G=T,ba=t}null!==r?(h.setUnfilteredPosition(r,D),t=ba):t=0;W.detach();d+=t;if(0===d)break;e+=d;a-=1}return e*g}function b(a,b){var c=f(),d=l.getParagraphElement(c.getCurrentNode()),e=0,g,k,h,q,t=m.ownerDocument.createRange();0>a?(g=c.previousPosition,k=-1):(g=c.nextPosition,k=1);for(h=n(c.container(),c.unfilteredDomOffset(),t);g.call(c);)if(b.acceptPosition(c)===NodeFilter.FILTER_ACCEPT){if(l.getParagraphElement(c.getCurrentNode())!==
d)break;q=n(c.container(),c.unfilteredDomOffset(),t);if(q.bottom!==h.bottom&&(h=q.top>=h.top&&q.bottom<h.bottom||q.top<=h.top&&q.bottom>h.bottom,!h))break;e+=k;h=q}t.detach();return e}function r(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(d=b.firstChild;d!==a;)c+=1,d=d.nextSibling;return c}function k(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=f(),e=d.container(),g=d.unfilteredDomOffset(),
l=0,k=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(e,g);var e=a,g=b,h=d.container(),m=d.unfilteredDomOffset();if(e===h)e=m-g;else{var n=e.compareDocumentPosition(h);2===n?n=-1:4===n?n=1:10===n?(g=r(e,h),n=g<m?1:-1):(m=r(h,e),n=m<g?-1:1);e=n}if(0>e)for(;d.nextPosition()&&(k.check(),1===c.acceptPosition(d)&&(l+=1),d.container()!==
a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&(k.check(),1===c.acceptPosition(d)&&(l-=1),d.container()!==a||d.unfilteredDomOffset()!==b););return l}var l,c,u,t;this.movePointForward=function(a,b){return q(a,b,c.nextPosition)};this.movePointBackward=function(a,b){return q(a,b,c.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:a,countBackwardSteps:g,countLinesSteps:d,countStepsToLineBoundary:b,countStepsToPosition:k,isPositionWalkable:e}};(function(){l=
new odf.OdfUtils;c=gui.SelectionMover.createPositionIterator(m);var a=m.ownerDocument.createRange();a.setStart(c.container(),c.unfilteredDomOffset());a.collapse(!0);h.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(h){var m=new function(){this.acceptNode=function(f){return"urn:webodf:names:cursor"===f.namespaceURI||"urn:webodf:names:editinfo"===f.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(h,5,m,!1)};(function(){return gui.SelectionMover})();
// Input 53
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
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpCloneParagraphStyle");runtime.loadClass("ops.OpDeleteParagraphStyle");
ops.OperationTransformer=function(){function h(f,n){for(var q,e,a,g=[],d=[];0<f.length&&n;){q=f.shift();e=n;var b=void 0;a=b=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(q.spec()));runtime.log(runtime.toJson(e.spec()));b=m.create(e.spec());a=e.transform(q,!0);e=(b=q.transform(b,!1))&&a?{opsA:b,opsB:a}:null;if(!e)return null;g=g.concat(e.opsA);if(0===e.opsB.length){g=g.concat(f);n=null;break}if(1<e.opsB.length)for(q=0;q<e.opsB.length-1;q+=1){a=h(f,e.opsB[q]);if(!a)return null;
d=d.concat(a.opsB);f=a.opsA}n=e.opsB.pop()}n&&d.push(n);return{opsA:g,opsB:d}}var m;this.setOperationFactory=function(f){m=f};this.transform=function(f,n){var q,e=[],a,g=[];for(q=0;q<f.length;q+=1){a=m.create(f[q]);if(!a)return null;e.push(a)}for(q=0;q<n.length;q+=1){a=m.create(n[q]);a=h(e,a);if(!a)return null;e=a.opsA;g=g.concat(a.opsB)}return{opsA:e,opsB:g}}};
// Input 54
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(h,m){var f=this,n,q;this.removeFromOdtDocument=function(){q.remove()};this.move=function(e,a){var g=0;0<e?g=n.movePointForward(e,a):0>=e&&(g=-n.movePointBackward(-e,a));f.handleUpdate();return g};this.handleUpdate=function(){};this.getStepCounter=function(){return n.getStepCounter()};this.getMemberId=function(){return h};this.getNode=function(){return q.getNode()};this.getAnchorNode=function(){return q.getAnchorNode()};this.getSelectedRange=function(){return q.getSelectedRange()};
this.getOdtDocument=function(){return m};q=new core.Cursor(m.getDOM(),h);n=new gui.SelectionMover(q,m.getRootNode())};
// Input 55
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
ops.EditInfo=function(h,m){function f(){var e=[],a;for(a in q)q.hasOwnProperty(a)&&e.push({memberid:a,time:q[a].time});e.sort(function(a,d){return a.time-d.time});return e}var n,q={};this.getNode=function(){return n};this.getOdtDocument=function(){return m};this.getEdits=function(){return q};this.getSortedEdits=function(){return f()};this.addEdit=function(e,a){var g,d=e.split("___")[0];if(!q[e])for(g in q)if(q.hasOwnProperty(g)&&g.split("___")[0]===d){delete q[g];break}q[e]={time:a}};this.clearEdits=
function(){q={}};n=m.getDOM().createElementNS("urn:webodf:names:editinfo","editinfo");h.insertBefore(n,h.firstChild)};
// Input 56
gui.Avatar=function(h,m){var f=this,n,q,e;this.setColor=function(a){q.style.borderColor=a};this.setImageUrl=function(a){f.isVisible()?q.src=a:e=a};this.isVisible=function(){return"block"===n.style.display};this.show=function(){e&&(q.src=e,e=void 0);n.style.display="block"};this.hide=function(){n.style.display="none"};this.markAsFocussed=function(a){n.className=a?"active":""};(function(){var a=h.ownerDocument,e=a.documentElement.namespaceURI;n=a.createElementNS(e,"div");q=a.createElementNS(e,"img");
q.width=64;q.height=64;n.appendChild(q);n.style.width="64px";n.style.height="70px";n.style.position="absolute";n.style.top="-80px";n.style.left="-34px";n.style.display=m?"block":"none";h.appendChild(n)})()};
// Input 57
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(h,m){function f(){g&&a.parentNode&&!d&&(d=!0,q.style.borderColor="transparent"===q.style.borderColor?b:"transparent",runtime.setTimeout(function(){d=!1;f()},500))}function n(a){var b;if("string"===typeof a){if(""===a)return 0;b=/^(\d+)(\.\d+)?px$/.exec(a);runtime.assert(null!==b,"size ["+a+"] does not have unit px.");return parseFloat(b[1])}return a}var q,e,a,g=!1,d=!1,b="";this.setFocus=function(){g=!0;e.markAsFocussed(!0);f()};this.removeFocus=function(){g=!1;e.markAsFocussed(!1);
q.style.borderColor=b};this.setAvatarImageUrl=function(a){e.setImageUrl(a)};this.setColor=function(a){b!==a&&(b=a,"transparent"!==q.style.borderColor&&(q.style.borderColor=b),e.setColor(b))};this.getCursor=function(){return h};this.getFocusElement=function(){return q};this.toggleHandleVisibility=function(){e.isVisible()?e.hide():e.show()};this.showHandle=function(){e.show()};this.hideHandle=function(){e.hide()};this.ensureVisible=function(){var a,b,d,c,e,g,f,p=h.getOdtDocument().getOdfCanvas().getElement().parentNode;
e=f=q;d=runtime.getWindow();runtime.assert(null!==d,"Expected to be run in an environment which has a global window, like a browser.");do{e=e.parentElement;if(!e)break;g=d.getComputedStyle(e,null)}while("block"!==g.display);g=e;e=c=0;if(g&&p){b=!1;do{d=g.offsetParent;for(a=g.parentNode;a!==d;){if(a===p){a=g;var m=p,y=0;b=0;var v=void 0,x=runtime.getWindow();for(runtime.assert(null!==x,"Expected to be run in an environment which has a global window, like a browser.");a&&a!==m;)v=x.getComputedStyle(a,
null),y+=n(v.marginLeft)+n(v.borderLeftWidth)+n(v.paddingLeft),b+=n(v.marginTop)+n(v.borderTopWidth)+n(v.paddingTop),a=a.parentElement;a=y;c+=a;e+=b;b=!0;break}a=a.parentNode}if(b)break;c+=n(g.offsetLeft);e+=n(g.offsetTop);g=d}while(g&&g!==p);d=c;c=e}else c=d=0;d+=f.offsetLeft;c+=f.offsetTop;e=d-5;g=c-5;d=d+f.scrollWidth-1+5;f=c+f.scrollHeight-1+5;g<p.scrollTop?p.scrollTop=g:f>p.scrollTop+p.clientHeight-1&&(p.scrollTop=f-p.clientHeight+1);e<p.scrollLeft?p.scrollLeft=e:d>p.scrollLeft+p.clientWidth-
1&&(p.scrollLeft=d-p.clientWidth+1)};(function(){var b=h.getOdtDocument().getDOM();q=b.createElementNS(b.documentElement.namespaceURI,"span");a=h.getNode();a.appendChild(q);e=new gui.Avatar(a,m)})()};
// Input 58
runtime.loadClass("core.EventNotifier");
gui.ClickHandler=function(){function h(){f=0;n=null}var m,f=0,n=null,q=new core.EventNotifier([gui.ClickHandler.signalSingleClick,gui.ClickHandler.signalDoubleClick,gui.ClickHandler.signalTripleClick]);this.subscribe=function(e,a){q.subscribe(e,a)};this.handleMouseUp=function(e){var a=runtime.getWindow();n&&n.x===e.screenX&&n.y===e.screenY?(f+=1,1===f?q.emit(gui.ClickHandler.signalSingleClick,void 0):2===f?q.emit(gui.ClickHandler.signalDoubleClick,void 0):3===f&&(a.clearTimeout(m),q.emit(gui.ClickHandler.signalTripleClick,
void 0),h())):(q.emit(gui.ClickHandler.signalSingleClick,void 0),f=1,n={x:e.screenX,y:e.screenY},a.clearTimeout(m),m=a.setTimeout(h,400))}};gui.ClickHandler.signalSingleClick="click";gui.ClickHandler.signalDoubleClick="doubleClick";gui.ClickHandler.signalTripleClick="tripleClick";(function(){return gui.ClickHandler})();
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: http://gitorious.org/webodf/webodf/
*/
gui.KeyboardHandler=function(){function h(f,e){e||(e=e.None);return f+":"+e}var m=gui.KeyboardHandler.Modifier,f=null,n={};this.setDefault=function(h){f=h};this.bind=function(f,e,a){f=h(f,e);runtime.assert(!1===n.hasOwnProperty(f),"tried to overwrite the callback handler of key combo: "+f);n[f]=a};this.unbind=function(f,e){var a=h(f,e);delete n[a]};this.reset=function(){f=null;n={}};this.handleEvent=function(q){var e=q.keyCode,a=m.None;q.metaKey&&(a|=m.Meta);q.ctrlKey&&(a|=m.Ctrl);q.altKey&&(a|=m.Alt);
q.shiftKey&&(a|=m.Shift);e=h(e,a);e=n[e];a=!1;e?a=e():null!==f&&(a=f(q));a&&(q.preventDefault?q.preventDefault():q.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,Z:90};(function(){return gui.KeyboardHandler})();
// Input 60
gui.Clipboard=function(){this.setDataFromRange=function(h,m){var f=!0,n,q=h.clipboardData,e=runtime.getWindow(),a,g;!q&&e&&(q=e.clipboardData);q?(e=new XMLSerializer,a=runtime.getDOMImplementation().createDocument("","",null),n=a.importNode(m.cloneContents(),!0),g=a.createElement("span"),g.appendChild(n),a.appendChild(g),n=q.setData("text/plain",m.toString()),f=f&&n,n=q.setData("text/html",e.serializeToString(a)),f=f&&n,h.preventDefault()):f=!1;return f}};(function(){return gui.Clipboard})();
// Input 61
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("gui.ClickHandler");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.Clipboard");
gui.SessionController=function(){gui.SessionController=function(h,m){function f(a,b,c,d){var e="on"+b,g=!1;a.attachEvent&&(g=a.attachEvent(e,c));!g&&a.addEventListener&&(a.addEventListener(b,c,!1),g=!0);g&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function n(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function q(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function e(a,b){var c=new ops.OpMoveCursor;c.init({memberid:m,
position:a,length:b||0});return c}function a(a,b){var c=gui.SelectionMover.createPositionIterator(w.getRootNode()),d=w.getOdfCanvas().getElement(),e;if(e=a){for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,b);return w.getDistanceFromCursor(m,c.container(),c.unfilteredDomOffset())}}
function g(){var b=runtime.getWindow().getSelection(),c=w.getCursorPosition(m),d;d=a(b.anchorNode,b.anchorOffset);b=a(b.focusNode,b.focusOffset);if(0!==b||0!==d)c=e(c+d,b-d),h.enqueue(c)}function d(){var a=gui.SelectionMover.createPositionIterator(w.getRootNode()),b=w.getCursor(m).getNode(),c=w.getCursorPosition(m),d=/[A-Za-z0-9]/,g=0,f=0,l,k,p;a.setUnfilteredPosition(b,0);if(a.previousPosition()&&(l=a.getCurrentNode(),l.nodeType===Node.TEXT_NODE))for(k=l.data.length-1;0<=k;k-=1)if(p=l.data[k],d.test(p))g-=
1;else break;a.setUnfilteredPosition(b,0);if(a.nextPosition()&&(l=a.getCurrentNode(),l.nodeType===Node.TEXT_NODE))for(k=0;k<l.data.length;k+=1)if(p=l.data[k],d.test(p))f+=1;else break;if(0!==g||0!==f)a=e(c+g,Math.abs(g)+Math.abs(f)),h.enqueue(a)}function b(){var a=gui.SelectionMover.createPositionIterator(w.getRootNode()),b=w.getParagraphElement(w.getCursor(m).getNode()),c=w.getCursorPosition(m),d;d=w.getDistanceFromCursor(m,b,0);a.moveToEndOfNode(b);a=w.getDistanceFromCursor(m,b,a.unfilteredDomOffset());
if(0!==d||0!==a)c=e(c+d,Math.abs(d)+Math.abs(a)),h.enqueue(c)}function r(a){a&&h.enqueue(a)}function k(a,b){var c=w.getCursorSelection(m);return 0===a&&0===b?null:e(c.position+a,0!==b?c.length+b:0)}function l(){r(k(-1,0));return!0}function c(){r(k(1,0));return!0}function u(){r(k(0,-1));return!0}function t(){r(k(0,1));return!0}function s(a,b){var c=w.getParagraphElement(w.getCursor(m).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=w.getCursor(m).getStepCounter().countLinesSteps(a,
w.getPositionFilter());return b?k(0,c):k(c,0)}function p(){r(s(-1,!1));return!0}function C(){r(s(1,!1));return!0}function y(){r(s(-1,!0));return!0}function v(){r(s(1,!0));return!0}function x(a,b){var c=w.getCursor(m).getStepCounter().countStepsToLineBoundary(a,w.getPositionFilter());return b?k(0,c):k(c,0)}function N(){r(x(-1,!1));return!0}function A(){r(x(1,!1));return!0}function F(){r(x(-1,!0));return!0}function O(){r(x(1,!0));return!0}function z(){var a=w.getParagraphElement(w.getCursor(m).getNode()),
b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");c=w.getDistanceFromCursor(m,a,0);b=gui.SelectionMover.createPositionIterator(w.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),aa.isParagraph(a)&&(c=w.getDistanceFromCursor(m,a,0));r(k(0,c));return!0}function H(){var a=w.getParagraphElement(w.getCursor(m).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(w.getRootNode());
b.moveToEndOfNode(a);for(c=w.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),aa.isParagraph(a)&&(b.moveToEndOfNode(a),c=w.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset()));r(k(0,c));return!0}function D(a,b){var c=gui.SelectionMover.createPositionIterator(w.getRootNode());0<a&&c.moveToEnd();c=w.getDistanceFromCursor(m,c.container(),c.unfilteredDomOffset());return b?k(0,c):k(c,0)}function G(){r(D(-1,!1));return!0}function T(){r(D(1,
!1));return!0}function ba(){r(D(-1,!0));return!0}function V(){r(D(1,!0));return!0}function ca(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function U(a){var b=new ops.OpRemoveText;b.init({memberid:m,position:a.position,length:a.length});return b}function W(){var a=ca(w.getCursorSelection(m)),b=null;0===a.length?0<a.position&&w.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:m,position:a.position-1,length:1})):b=U(a);r(b);return!0}function M(){var a=
ca(w.getCursorSelection(m)),b=null;0===a.length?w.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:m,position:a.position,length:1})):b=U(a);r(b);return null!==b}function S(){var a=w.getCursorPosition(m),b;b=new ops.OpSplitParagraph;b.init({memberid:m,position:a});h.enqueue(b);return!0}function R(){var a=w.getCursor(m),b=runtime.getWindow().getSelection();b.removeAllRanges();b.addRange(a.getSelectedRange().cloneRange())}function I(a){var b=w.getCursor(m);b.getSelectedRange().collapsed||
(ga.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=ca(h.getOdtDocument().getCursorSelection(m)),b.init({memberid:m,position:a.position,length:a.length}),h.enqueue(b)):runtime.log("Cut operation failed"))}function B(){return!1!==w.getCursor(m).getSelectedRange().collapsed}function J(a){var b,c;window.clipboardData&&window.clipboardData.getData?b=window.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(c=new ops.OpInsertText,
c.init({memberid:m,position:w.getCursorPosition(m),text:b}),h.enqueue(c),a.preventDefault?a.preventDefault():a.returnValue=!1)}function P(){return!1}function Q(a){if(X)X.onOperationExecuted(a)}function Y(a){w.emit(ops.OdtDocument.signalUndoStackChanged,a)}function E(){return X?(X.moveBackward(1),R(),!0):!1}function $(){return X?(X.moveForward(1),R(),!0):!1}var w=h.getOdtDocument(),aa=new odf.OdfUtils,ga=new gui.Clipboard,K=new gui.ClickHandler,L=new gui.KeyboardHandler,Z=new gui.KeyboardHandler,X;
this.startEditing=function(){var a;a=w.getOdfCanvas().getElement();f(a,"keydown",L.handleEvent);f(a,"keypress",Z.handleEvent);f(a,"keyup",q);f(a,"beforecut",B,!0);f(a,"mouseup",K.handleMouseUp);f(a,"cut",I);f(a,"beforepaste",P,!0);f(a,"paste",J);w.subscribe(ops.OdtDocument.signalOperationExecuted,R);w.subscribe(ops.OdtDocument.signalOperationExecuted,Q);a=new ops.OpAddCursor;a.init({memberid:m});h.enqueue(a);X&&X.saveInitialState()};this.endEditing=function(){var a;w.unsubscribe(ops.OdtDocument.signalOperationExecuted,
Q);w.unsubscribe(ops.OdtDocument.signalOperationExecuted,R);a=w.getOdfCanvas().getElement();n(a,"keydown",L.handleEvent);n(a,"keypress",Z.handleEvent);n(a,"keyup",q);n(a,"cut",I);n(a,"beforecut",B);n(a,"paste",J);n(a,"mouseup",K.handleMouseUp);n(a,"beforepaste",P);a=new ops.OpRemoveCursor;a.init({memberid:m});h.enqueue(a);X&&X.resetInitialState()};this.getInputMemberId=function(){return m};this.getSession=function(){return h};this.setUndoManager=function(a){X&&X.unsubscribe(gui.UndoManager.signalUndoStackChanged,
Y);if(X=a)X.setOdtDocument(w),X.setPlaybackFunction(function(a){a.execute(w)}),X.subscribe(gui.UndoManager.signalUndoStackChanged,Y)};this.getUndoManager=function(){return X};(function(){var a=-1!==runtime.getWindow().navigator.appVersion.toLowerCase().indexOf("mac"),e=gui.KeyboardHandler.Modifier,f=gui.KeyboardHandler.KeyCode;L.bind(f.Left,e.None,l);L.bind(f.Right,e.None,c);L.bind(f.Up,e.None,p);L.bind(f.Down,e.None,C);L.bind(f.Backspace,e.None,W);L.bind(f.Delete,e.None,M);L.bind(f.Left,e.Shift,
u);L.bind(f.Right,e.Shift,t);L.bind(f.Up,e.Shift,y);L.bind(f.Down,e.Shift,v);L.bind(f.Home,e.None,N);L.bind(f.End,e.None,A);L.bind(f.Home,e.Ctrl,G);L.bind(f.End,e.Ctrl,T);L.bind(f.Home,e.Shift,F);L.bind(f.End,e.Shift,O);L.bind(f.Up,e.CtrlShift,z);L.bind(f.Down,e.CtrlShift,H);L.bind(f.Home,e.CtrlShift,ba);L.bind(f.End,e.CtrlShift,V);a?(L.bind(f.Left,e.Meta,N),L.bind(f.Right,e.Meta,A),L.bind(f.Home,e.Meta,G),L.bind(f.End,e.Meta,T),L.bind(f.Left,e.MetaShift,F),L.bind(f.Right,e.MetaShift,O),L.bind(f.Up,
e.AltShift,z),L.bind(f.Down,e.AltShift,H),L.bind(f.Up,e.MetaShift,ba),L.bind(f.Down,e.MetaShift,V),L.bind(f.Z,e.Meta,E),L.bind(f.Z,e.MetaShift,$)):(L.bind(f.Z,e.Ctrl,E),L.bind(f.Z,e.CtrlShift,$));Z.setDefault(function(a){a=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;var b=new ops.OpInsertText;b.init({memberid:m,position:w.getCursorPosition(m),text:a});h.enqueue(b);return!0});Z.bind(f.Enter,e.None,S);K.subscribe(gui.ClickHandler.signalSingleClick,
g);K.subscribe(gui.ClickHandler.signalDoubleClick,d);K.subscribe(gui.ClickHandler.signalTripleClick,b)})()};return gui.SessionController}();
// Input 62
ops.UserModel=function(){};ops.UserModel.prototype.getUserDetailsAndUpdates=function(h,m){};ops.UserModel.prototype.unsubscribeUserDetailsUpdates=function(h,m){};
// Input 63
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
ops.TrivialUserModel=function(){var h={bob:{memberid:"bob",fullname:"Bob Pigeon",color:"red",imageurl:"avatar-pigeon.png"},alice:{memberid:"alice",fullname:"Alice Bee",color:"green",imageurl:"avatar-flower.png"},you:{memberid:"you",fullname:"I, Robot",color:"blue",imageurl:"avatar-joe.png"}};this.getUserDetailsAndUpdates=function(m,f){var n=m.split("___")[0];f(m,h[n]||null)};this.unsubscribeUserDetailsUpdates=function(h,f){}};
// Input 64
ops.NowjsUserModel=function(h){var m={},f={},n=h.getNowObject();this.getUserDetailsAndUpdates=function(h,e){var a=h.split("___")[0],g=m[a],d=f[a]=f[a]||[],b;runtime.assert(void 0!==e,"missing callback");for(b=0;b<d.length&&(d[b].subscriber!==e||d[b].memberId!==h);b+=1);b<d.length?runtime.log("double subscription request for "+h+" in NowjsUserModel::getUserDetailsAndUpdates"):(d.push({memberId:h,subscriber:e}),1===d.length&&n.subscribeUserDetailsUpdates(a));g&&e(h,g)};this.unsubscribeUserDetailsUpdates=
function(h,e){var a,g=h.split("___")[0],d=f[g];runtime.assert(void 0!==e,"missing subscriber parameter or null");runtime.assert(d,"tried to unsubscribe when no one is subscribed ('"+h+"')");if(d){for(a=0;a<d.length&&(d[a].subscriber!==e||d[a].memberId!==h);a+=1);runtime.assert(a<d.length,"tried to unsubscribe when not subscribed for memberId '"+h+"'");d.splice(a,1);0===d.length&&(runtime.log("no more subscribers for: "+h),delete f[g],delete m[g],n.unsubscribeUserDetailsUpdates(g))}};n.updateUserDetails=
function(h,e){var a=e?{userid:e.uid,fullname:e.fullname,imageurl:"/user/"+e.avatarId+"/avatar.png",color:e.color}:null,g,d;if(g=f[h])for(m[h]=a,d=0;d<g.length;d+=1)g[d].subscriber(g[d].memberId,a)};runtime.assert("ready"===n.networkStatus,"network not ready")};
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
ops.PullBoxUserModel=function(h){function m(){var a=h.getBase64(),e,d=[];for(e in q)q.hasOwnProperty(e)&&d.push(e);runtime.log("user-list request for : "+d.join(","));h.call("user-list:"+a.toBase64(h.getToken())+":"+d.join(","),function(a){var d=runtime.fromJson(a),f;runtime.log("user-list reply: "+a);if(d.hasOwnProperty("userdata_list"))for(a=d.userdata_list,e=0;e<a.length;e+=1){if(d={userid:a[e].uid,fullname:a[e].fullname,imageurl:"/user/"+a[e].avatarId+"/avatar.png",color:a[e].color},f=n.hasOwnProperty(a[e].uid)?
n[a[e].uid]:null,!f||f.fullname!==d.fullname||f.imageurl!==d.imageurl||f.color!==d.color){var l=f=void 0;if(f=q[d.userid])for(n[d.userid]=d,l=0;l<f.length;l+=1)f[l].subscriber(f[l].memberId,d)}}else runtime.log("Meh, userlist data broken: "+a)})}function f(){e&&(m(),runtime.setTimeout(f,2E4))}var n={},q={},e=!1;this.getUserDetailsAndUpdates=function(a,g){var d=a.split("___")[0],b=n[d],d=q[d]=q[d]||[],h;runtime.assert(void 0!==g,"missing callback");for(h=0;h<d.length&&(d[h].subscriber!==g||d[h].memberId!==
a);h+=1);h<d.length?runtime.log("double subscription request for "+a+" in PullBoxUserModel::getUserDetailsAndUpdates"):(d.push({memberId:a,subscriber:g}),1===d.length&&m());b&&g(a,b);e||(e=!0,runtime.setTimeout(f,2E4))};this.unsubscribeUserDetailsUpdates=function(a,f){var d,b=a.split("___")[0],h=q[b];runtime.assert(void 0!==f,"missing subscriber parameter or null");runtime.assert(h,"tried to unsubscribe when no one is subscribed ('"+a+"')");if(h){for(d=0;d<h.length&&(h[d].subscriber!==f||h[d].memberId!==
a);d+=1);runtime.assert(d<h.length,"tried to unsubscribe when not subscribed for memberId '"+a+"'");h.splice(d,1);if(0===h.length){runtime.log("no more subscribers for: "+a);delete q[b];delete n[b];a:{var k;if(e){for(k in q)if(q.hasOwnProperty(k))break a;e=!1}}}}};runtime.assert("ready"===h.networkStatus(),"network not ready")};
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(h){};ops.OperationRouter.prototype.setPlaybackFunction=function(h){};ops.OperationRouter.prototype.push=function(h){};
// Input 67
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
ops.TrivialOperationRouter=function(){var h,m;this.setOperationFactory=function(f){h=f};this.setPlaybackFunction=function(f){m=f};this.push=function(f){f=f.spec();f.timestamp=(new Date).getTime();f=h.create(f);m(f)}};
// Input 68
ops.NowjsOperationRouter=function(h,m,f){function n(a){var f;f=q.create(a);runtime.log(" op in: "+runtime.toJson(a));if(null!==f)if(a=Number(a.server_seq),runtime.assert(!isNaN(a),"server seq is not a number"),a===g+1)for(e(f),g=a,b=0,f=g+1;d.hasOwnProperty(f);f+=1)e(d[f]),delete d[f],runtime.log("op with server seq "+a+" taken from hold (reordered)");else runtime.assert(a!==g+1,"received incorrect order from server"),runtime.assert(!d.hasOwnProperty(a),"reorder_queue has incoming op"),runtime.log("op with server seq "+
a+" put on hold"),d[a]=f;else runtime.log("ignoring invalid incoming opspec: "+a)}var q,e,a=f.getNowObject(),g=-1,d={},b=0,r=1E3;this.setOperationFactory=function(a){q=a};this.setPlaybackFunction=function(a){e=a};a.ping=function(a){null!==m&&a(m)};a.receiveOp=function(a,b){a===h&&n(b)};this.push=function(d){d=d.spec();runtime.assert(null!==m,"Router sequence N/A without memberid");r+=1;d.client_nonce="C:"+m+":"+r;d.parent_op=g+"+"+b;b+=1;runtime.log("op out: "+runtime.toJson(d));a.deliverOp(h,d)};
this.requestReplay=function(b){a.requestReplay(h,function(a){runtime.log("replaying: "+runtime.toJson(a));n(a)},function(a){runtime.log("replay done ("+a+" ops).");b&&b()})};(function(){a.memberid=m;a.joinSession(h,function(a){runtime.assert(a,"Trying to join a session which does not exists or where we are already in")})})()};
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
runtime.loadClass("ops.OperationTransformer");
ops.PullBoxOperationRouter=function(h,m,f){function n(a){var b,c,e,f=[];for(b=0;b<a.length;)if(e=d.create(a[b]),null!==e&&e.merge){for(c=b+1;c<a.length&&e.merge(a[c]);c+=1)runtime.log("Merged: "+a[b].optype+" with "+a[c].optype);f.push(e.spec());b=c}else f.push(a[b]),b+=1;runtime.log("Merged: from "+a.length+" to "+f.length+" specs");return f}function q(){function a(){var e,f,g;c=!1;for(g=(new Date).getTime();0<C.length&&!(500<(new Date).getTime()-g);)e=C.shift(),f=d.create(e),runtime.log(" op in: "+
runtime.toJson(e)),null!==f?r(f):runtime.log("ignoring invalid incoming opspec: "+e);0<C.length?(c=!0,runtime.getWindow().setTimeout(a,1)):b&&(b(),b=null)}c||a()}function e(a){var b;if(!a)return runtime.assert(!1,"no opspecs received!"),!1;b=y.transform(p,a);if(!b)return!1;for(a=0;a<b.opsB.length;a+=1)C.push(b.opsB[a].spec());p=[];for(a=0;a<b.opsA.length;a+=1)p.push(b.opsA[a].spec());return!0}function a(){function b(){var c={active:!0};k=c;runtime.getWindow().setTimeout(function(){runtime.log("Pulling activated:"+
c.active);k=null;c.active&&a()},8E3)}function c(){var a=f.getBase64(),d;u||t||(u=!0,d=p,p=[],f.call("sync-ops:"+a.toBase64(f.getToken())+":"+a.toBase64(h)+":"+a.toBase64(m)+":"+a.toBase64(String(s))+":"+runtime.toJson(d),function(a){var f=!1,g=runtime.fromJson(a);runtime.log("sync-ops reply: "+a);"newOps"===g.result?0<g.ops.length&&(0===p.length?(a=n(g.ops),C=C.concat(a)):(runtime.log("meh, have new ops locally meanwhile, have to do transformations."),t=!e(n(g.ops))),s=g.headSeq):"added"===g.result?
(runtime.log("All added to server"),s=g.headSeq):"conflict"===g.result?(p=d.concat(p),runtime.log("meh, server has new ops meanwhile, have to do transformations."),t=!e(n(g.ops)),s=g.headSeq,t||(f=!0)):runtime.assert(!1,"Unexpected result on sync-ops call: "+g.result);u=!1;t?runtime.assert(!1,"Sorry to tell:\nwe hit a pair of operations in a state which yet need to be supported for transformation against each other.\nClient disconnected from session, no further editing accepted.\n\nPlease reconnect manually for now."):
(f?c():(runtime.log("Preparing next: "+(0===p.length)),0===p.length&&b()),q())}))}c()}function g(){u||l||(l=!0,k&&(k.active=!1),runtime.getWindow().setTimeout(function(){runtime.log("Pushing activated");l=!1;a()},3E3))}var d,b,r,k=null,l=!1,c=!1,u=!1,t=!1,s="",p=[],C=[],y=new ops.OperationTransformer;this.requestReplay=function(c){b=c;a()};this.setOperationFactory=function(a){d=a;y.setOperationFactory(a)};this.setPlaybackFunction=function(a){r=a};this.push=function(a){var b=a.spec();t||0<C.length||
(b.timestamp=(new Date).getTime(),a=d.create(b),r(a),p.push(b),g())};(function(){var a=f.getBase64();f.call("join-session:"+a.toBase64(f.getToken())+":"+a.toBase64(h)+":"+a.toBase64(m),function(a){var b=Boolean(runtime.fromJson(a));runtime.log("join-session reply: "+a);runtime.assert(b,"Trying to join a session which does not exists or where we are already in")})})()};
// Input 70
gui.EditInfoHandle=function(h){var m=[],f,n=h.ownerDocument,q=n.documentElement.namespaceURI;this.setEdits=function(e){m=e;var a,g,d,b;f.innerHTML="";for(e=0;e<m.length;e+=1)a=n.createElementNS(q,"div"),a.className="editInfo",g=n.createElementNS(q,"span"),g.className="editInfoColor",g.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[e].memberid),d=n.createElementNS(q,"span"),d.className="editInfoAuthor",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[e].memberid),
b=n.createElementNS(q,"span"),b.className="editInfoTime",b.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[e].memberid),b.innerHTML=m[e].time,a.appendChild(g),a.appendChild(d),a.appendChild(b),f.appendChild(a)};this.show=function(){f.style.display="block"};this.hide=function(){f.style.display="none"};f=n.createElementNS(q,"div");f.setAttribute("class","editInfoHandle");f.style.display="none";h.appendChild(f)};
// Input 71
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(h,m){function f(b,d){return window.setTimeout(function(){a.style.opacity=b},d)}var n=this,q,e,a,g,d;this.addEdit=function(b,m){var k=Date.now()-m;h.addEdit(b,m);e.setEdits(h.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);g&&window.clearTimeout(g);d&&window.clearTimeout(d);1E4>k?(f(1,0),g=f(0.5,1E4-k),d=f(0.2,2E4-k)):1E4<=k&&2E4>k?(f(0.5,0),d=f(0.2,2E4-k)):f(0.2,0)};this.getEdits=function(){return h.getEdits()};this.clearEdits=function(){h.clearEdits();
e.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return h};this.show=function(){a.style.display="block"};this.hide=function(){n.hideHandle();a.style.display="none"};this.showHandle=function(){e.show()};this.hideHandle=function(){e.hide()};(function(){var b=h.getOdtDocument().getDOM();a=b.createElementNS(b.documentElement.namespaceURI,"div");a.setAttribute("class","editInfoMarker");
a.onmouseover=function(){n.showHandle()};a.onmouseout=function(){n.hideHandle()};q=h.getNode();q.appendChild(a);e=new gui.EditInfoHandle(q);m||n.hide()})()};
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
runtime.loadClass("gui.Caret");runtime.loadClass("ops.TrivialUserModel");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");
gui.SessionView=function(){return function(h,m,f){function n(a,b,c){c=c.split("___")[0];return a+"."+b+'[editinfo|memberid^="'+c+'"]'}function q(a,b,c){function d(b,c,e){e=n(b,c,a)+e;a:{var f=k.firstChild;for(b=n(b,c,a);f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=e:k.appendChild(document.createTextNode(e))}d("div","editInfoMarker","{ background-color: "+c+"; }");d("span","editInfoColor","{ background-color: "+c+"; }");d("span","editInfoAuthor",
':before { content: "'+b+'"; }')}function e(a){var b,c;for(c in l)l.hasOwnProperty(c)&&(b=l[c],a?b.show():b.hide())}function a(a){var b,c;for(c in r)r.hasOwnProperty(c)&&(b=r[c],a?b.showHandle():b.hideHandle())}function g(a,b){var c=r[a];void 0===b?runtime.log('UserModel sent undefined data for member "'+a+'".'):(null===b&&(b={memberid:a,fullname:"Unknown Identity",color:"black",imageurl:"avatar-joe.png"}),c&&(c.setAvatarImageUrl(b.imageurl),c.setColor(b.color)),q(a,b.fullname,b.color))}function d(a){var b=
f.createCaret(a,u);a=a.getMemberId();var c=m.getUserModel();r[a]=b;g(a,null);c.getUserDetailsAndUpdates(a,g);runtime.log("+++ View here +++ eagerly created an Caret for '"+a+"'! +++")}function b(a){var b=!1,c;delete r[a];for(c in l)if(l.hasOwnProperty(c)&&l[c].getEditInfo().getEdits().hasOwnProperty(a)){b=!0;break}b||m.getUserModel().unsubscribeUserDetailsUpdates(a,g)}var r={},k,l={},c=void 0!==h.editInfoMarkersInitiallyVisible?h.editInfoMarkersInitiallyVisible:!0,u=void 0!==h.caretAvatarsInitiallyVisible?
h.caretAvatarsInitiallyVisible:!0;this.showEditInfoMarkers=function(){c||(c=!0,e(c))};this.hideEditInfoMarkers=function(){c&&(c=!1,e(c))};this.showCaretAvatars=function(){u||(u=!0,a(u))};this.hideCaretAvatars=function(){u&&(u=!1,a(u))};this.getSession=function(){return m};this.getCaret=function(a){return r[a]};(function(){var a=m.getOdtDocument(),e=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,d);a.subscribe(ops.OdtDocument.signalCursorRemoved,b);a.subscribe(ops.OdtDocument.signalParagraphChanged,
function(a){var b=a.paragraphElement,d=a.memberId;a=a.timeStamp;var e,f="",g=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0];g?(f=g.getAttributeNS("urn:webodf:names:editinfo","id"),e=l[f]):(f=Math.random().toString(),e=new ops.EditInfo(b,m.getOdtDocument()),e=new gui.EditInfoMarker(e,c),g=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0],g.setAttributeNS("urn:webodf:names:editinfo","id",f),l[f]=e);e.addEdit(d,new Date(a))});k=document.createElementNS(e.namespaceURI,
"style");k.type="text/css";k.media="screen, print, handheld, projection";k.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));e.appendChild(k)})()}}();
// Input 73
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
runtime.loadClass("gui.Caret");gui.CaretFactory=function(h){this.createCaret=function(m,f){var n=m.getMemberId(),q=h.getSession().getOdtDocument(),e=q.getOdfCanvas().getElement(),a=new gui.Caret(m,f);n===h.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+n),q.subscribe(ops.OdtDocument.signalParagraphChanged,function(e){e.memberId===n&&a.ensureVisible()}),m.handleUpdate=a.ensureVisible,e.setAttribute("tabindex",0),e.onfocus=a.setFocus,e.onblur=a.removeFocus,e.focus());return a}};
// Input 74
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var h=new xmldom.XPath;return function(m){var f=this;f.setInitialSlideMode=function(){f.startSlideMode("single")};f.keyDownHandler=function(h){if(!h.target.isContentEditable&&"input"!==h.target.nodeName)switch(h.keyCode){case 84:f.toggleToolbar();break;case 37:case 8:f.prevSlide();break;case 39:case 32:f.nextSlide();break;case 36:f.firstSlide();break;case 35:f.lastSlide()}};f.root=function(){return f.odf_canvas.odfContainer().rootElement};f.firstSlide=function(){f.slideChange(function(f,
h){return 0})};f.lastSlide=function(){f.slideChange(function(f,h){return h-1})};f.nextSlide=function(){f.slideChange(function(f,h){return f+1<h?f+1:-1})};f.prevSlide=function(){f.slideChange(function(f,h){return 1>f?-1:f-1})};f.slideChange=function(h){var m=f.getPages(f.odf_canvas.odfContainer().rootElement),e=-1,a=0;m.forEach(function(f){f=f[1];f.hasAttribute("slide_current")&&(e=a,f.removeAttribute("slide_current"));a+=1});h=h(e,m.length);-1===h&&(h=e);m[h][1].setAttribute("slide_current","1");
document.getElementById("pagelist").selectedIndex=h;"cont"===f.slide_mode&&window.scrollBy(0,m[h][1].getBoundingClientRect().top-30)};f.selectSlide=function(h){f.slideChange(function(f,e){return h>=e||0>h?-1:h})};f.scrollIntoContView=function(h){var m=f.getPages(f.odf_canvas.odfContainer().rootElement);0!==m.length&&window.scrollBy(0,m[h][1].getBoundingClientRect().top-30)};f.getPages=function(f){f=f.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var h=[],e;for(e=0;e<f.length;e+=1)h.push([f[e].getAttribute("draw:name"),
f[e]]);return h};f.fillPageList=function(m,q){for(var e=f.getPages(m),a,g,d;q.firstChild;)q.removeChild(q.firstChild);for(a=0;a<e.length;a+=1)g=document.createElement("option"),d=h.getODFElementsWithXPath(e[a][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),d=0<d.length?d[0].textContent:e[a][0],g.textContent=a+1+": "+d,q.appendChild(g)};f.startSlideMode=function(h){var m=document.getElementById("pagelist"),e=f.odf_canvas.slidevisibilitycss().sheet;for(f.slide_mode=
h;0<e.cssRules.length;)e.deleteRule(0);f.selectSlide(0);"single"===f.slide_mode?(e.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),e.insertRule("draw|page[slide_current]  { z-index:2;}",1),e.insertRule("draw|page  { -webkit-transform: scale(1);}",2),f.fitToWindow(),window.addEventListener("resize",f.fitToWindow,!1)):"cont"===f.slide_mode&&window.removeEventListener("resize",f.fitToWindow,!1);f.fillPageList(f.odf_canvas.odfContainer().rootElement,m)};f.toggleToolbar=function(){var h,
m,e;h=f.odf_canvas.slidevisibilitycss().sheet;m=-1;for(e=0;e<h.cssRules.length;e+=1)if(".toolbar"===h.cssRules[e].cssText.substring(0,8)){m=e;break}-1<m?h.deleteRule(m):h.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};f.fitToWindow=function(){var h=f.getPages(f.root()),m=(window.innerHeight-40)/h[0][1].clientHeight,h=(window.innerWidth-10)/h[0][1].clientWidth,m=m<h?m:h,h=f.odf_canvas.slidevisibilitycss().sheet;h.deleteRule(2);h.insertRule("draw|page { \n-moz-transform: scale("+
m+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+m+"); -o-transform-origin: 0% 0%; -o-transform: scale("+m+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+m+"); }",2)};f.load=function(h){f.odf_canvas.load(h)};f.odf_element=m;f.odf_canvas=new odf.OdfCanvas(f.odf_element);f.odf_canvas.addListener("statereadychange",f.setInitialSlideMode);f.slide_mode="undefined";document.addEventListener("keydown",f.keyDownHandler,!1)}}();
// Input 75
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(h,m){function f(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function n(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function q(){var a=h.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!t)||(a=a.getRangeAt(0),t.setPoint(a.startContainer,a.startOffset))}function e(){var a=h.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();t&&t.node()&&(b=t.node(),c=b.ownerDocument.createRange(),
c.setStart(b,t.position()),c.collapse(!0),a.addRange(c))}function a(a){var b=a.charCode||a.keyCode;if(t=null,t&&37===b)q(),t.stepBackward(),e();else if(16<=b&&20>=b||33<=b&&40>=b)return;n(a)}function g(a){}function d(a){h.ownerDocument.defaultView.getSelection().getRangeAt(0);n(a)}function b(a){for(var c=a.firstChild;c&&c!==a;)c.nodeType===Node.ELEMENT_NODE&&b(c),c=c.nextSibling||c.parentNode;var d,e,f,c=a.attributes;d="";for(f=c.length-1;0<=f;f-=1)e=c.item(f),d=d+" "+e.nodeName+'="'+e.nodeValue+
'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",d);c=a.firstChild;for(e=/^\s*$/;c&&c!==a;)d=c,c=c.nextSibling||c.parentNode,d.nodeType===Node.TEXT_NODE&&e.test(d.nodeValue)&&d.parentNode.removeChild(d)}function r(a,b){for(var c=a.firstChild,d,e,f;c&&c!==a;){if(c.nodeType===Node.ELEMENT_NODE)for(r(c,b),d=c.attributes,f=d.length-1;0<=f;f-=1)e=d.item(f),"http://www.w3.org/2000/xmlns/"!==e.namespaceURI||b[e.nodeValue]||(b[e.nodeValue]=e.localName);c=c.nextSibling||c.parentNode}}
function k(){var a=h.ownerDocument.createElement("style"),b;b={};r(h,b);var c={},d,e,f=0;for(d in b)if(b.hasOwnProperty(d)&&d){e=b[d];if(!e||c.hasOwnProperty(e)||"xmlns"===e){do e="ns"+f,f+=1;while(c.hasOwnProperty(e));b[d]=e}c[e]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+l;a.appendChild(h.ownerDocument.createTextNode(b));m=m.parentNode.replaceChild(a,m)}var l,c,u,t=null;h.id||(h.id="xml"+String(Math.random()).substring(2));c="#"+h.id+" ";l=c+"*,"+c+":visited, "+c+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
c+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+c+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+c+"{overflow: auto;}\n";(function(b){f(b,"click",d);f(b,"keydown",a);f(b,"keypress",g);f(b,"drop",n);f(b,"dragend",n);f(b,"beforepaste",n);f(b,"paste",n)})(h);this.updateCSS=k;this.setXML=function(a){a=a.documentElement||a;u=a=h.ownerDocument.importNode(a,!0);for(b(a);h.lastChild;)h.removeChild(h.lastChild);h.appendChild(a);k();t=new core.PositionIterator(a)};
this.getXML=function(){return u}};
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(h,m){};gui.UndoManager.prototype.unsubscribe=function(h,m){};gui.UndoManager.prototype.setOdtDocument=function(h){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(h){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(h){};gui.UndoManager.prototype.moveBackward=function(h){};gui.UndoManager.prototype.onOperationExecuted=function(h){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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
gui.UndoStateRules=function(){function h(f){return f.spec().optype}function m(f){switch(h(f)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=h;this.isEditOperation=m;this.isPartOfOperationSet=function(f,n){if(m(f)){if(0===n.length)return!0;var q;if(q=m(n[n.length-1]))a:{q=n.filter(m);var e=h(f),a;b:switch(e){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&e===h(q[0])){if(1===q.length){q=!0;break a}e=q[q.length-2].spec().position;
q=q[q.length-1].spec().position;a=f.spec().position;if(q===a-(q-e)){q=!0;break a}}q=!1}return q}return!0}};
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
runtime.loadClass("gui.UndoManager");runtime.loadClass("gui.UndoStateRules");
gui.TrivialUndoManager=function(h){function m(){k.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:n.hasUndoStates(),redoAvailable:n.hasRedoStates()})}function f(){d!==e&&d!==b[b.length-1]&&b.push(d)}var n=this,q,e,a,g,d=[],b=[],r=[],k=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),l=h||new gui.UndoStateRules;this.subscribe=function(a,b){k.subscribe(a,
b)};this.unsubscribe=function(a,b){k.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<b.length};this.hasRedoStates=function(){return 0<r.length};this.setOdtDocument=function(a){g=a};this.resetInitialState=function(){b.length=0;r.length=0;e.length=0;d.length=0;q=null;m()};this.saveInitialState=function(){q=g.getOdfCanvas().odfContainer().rootElement.cloneNode(!0);e=[];f();b.forEach(function(a){e=e.concat(a)});d=e;b.length=0;r.length=0;m()};this.setPlaybackFunction=function(b){a=b};this.onOperationExecuted=
function(a){r.length=0;l.isEditOperation(a)&&d===e||!l.isPartOfOperationSet(a,d)?(f(),d=[a],b.push(d),k.emit(gui.UndoManager.signalUndoStateCreated,{operations:d}),m()):(d.push(a),k.emit(gui.UndoManager.signalUndoStateModified,{operations:d}))};this.moveForward=function(c){for(var e=0,f;c&&r.length;)f=r.pop(),b.push(f),f.forEach(a),c-=1,e+=1;e&&(d=b[b.length-1],m());return e};this.moveBackward=function(c){for(var f=g.getOdfCanvas(),l=f.odfContainer(),h=0;c&&b.length;)r.push(b.pop()),c-=1,h+=1;h&&
(l.setRootElement(q.cloneNode(!0)),f.setOdfContainer(l,!0),k.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),g.getCursors().forEach(function(a){g.removeCursor(a.getMemberId())}),e.forEach(a),b.forEach(function(b){b.forEach(a)}),f.refreshCSS(),d=b[b.length-1]||e,m());return h}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("odf.OdfUtils");
ops.OdtDocument=function(h){function m(){var a=h.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function f(a){var b=gui.SelectionMover.createPositionIterator(m());for(a+=1;0<a&&b.nextPosition();)1===d.acceptPosition(b)&&(a-=1);return b}function n(a){return b.getParagraphElement(a)}function q(a){return h.getFormatting().getStyleElement(a,"paragraph")}function e(a,b){runtime.assert(" "===a.data[b],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");
var d=a.ownerDocument.createElementNS(g,"text:s");d.appendChild(a.ownerDocument.createTextNode(" "));a.deleteData(b,1);a.splitText(b);a.parentNode.insertBefore(d,a.nextSibling)}var a=this,g="urn:oasis:names:tc:opendocument:xmlns:text:1.0",d,b,r={},k=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalStyleCreated,ops.OdtDocument.signalStyleDeleted,
ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]);this.getIteratorAtPosition=f;this.getTextNeighborhood=function(a,b){var d=f(a),e=[],g=[],h,k=0,m=!1;h=!0;var n=0,q;runtime.assert(0<=b,"OdtDocument.getTextNeighborhood only supports positive lengths");do{g=d.textNeighborhood();m=!1;for(q=0;q<e.length;q+=1)if(e[q]===g[0]){m=!0;break}if(!m){m=0;if(h){h=d.container();for(m=0;m<g.length;m+=1)if(g[m]===h){n=m;break}m=n;h=!1}for(g.length&&(e=
e.concat(g));m<g.length;m+=1)k+=g[m].data.length}}while(!0===d.nextPosition()&&k<b);return e.slice(n)};this.upgradeWhitespaceToElement=e;this.upgradeWhitespacesAtPosition=function(a){a=f(a);var c=null,d,g=0;a.previousPosition();a.previousPosition();for(g=-2;2>=g;g+=1)c=a.container(),d=a.unfilteredDomOffset(),c.nodeType===Node.TEXT_NODE&&(" "===c.data[d]&&b.isSignificantWhitespace(c,d))&&e(c,d),a.nextPosition()};this.getParagraphStyleElement=q;this.getParagraphElement=n;this.getParagraphStyleAttributes=
function(a){return(a=q(a))?h.getFormatting().getInheritedStyleAttributes(a):null};this.getPositionInTextNode=function(a,b){var e=gui.SelectionMover.createPositionIterator(m()),f=null,g,h=0,k=null;runtime.assert(0<=a,"position must be >= 0");1===d.acceptPosition(e)?(g=e.container(),g.nodeType===Node.TEXT_NODE&&(f=g,h=0)):a+=1;for(;0<a||null===f;){if(!e.nextPosition())return null;if(1===d.acceptPosition(e))if(a-=1,g=e.container(),g.nodeType===Node.TEXT_NODE)g!==f?(f=g,h=e.domOffset()):h+=1;else if(null!==
f){if(0===a){h=f.length;break}f=null}else if(0===a){f=m().ownerDocument.createTextNode("");g.insertBefore(f,e.rightNode());h=0;break}}if(null===f)return null;if(b&&r[b]){for(k=r[b].getNode();0===h&&k.nextSibling&&"cursor"===k.nextSibling.localName;)k.parentNode.insertBefore(k,k.nextSibling.nextSibling);k&&0<f.length&&(f=m().ownerDocument.createTextNode(""),h=0,k.parentNode.insertBefore(f,k.nextSibling))}for(;0===h&&(f.previousSibling&&"cursor"===f.previousSibling.localName)&&(g=f.previousSibling,
0<f.length&&(f=m().ownerDocument.createTextNode("")),g.parentNode.insertBefore(f,g),k!==g););for(;f.previousSibling&&f.previousSibling.nodeType===Node.TEXT_NODE;)f.previousSibling.appendData(f.data),h=f.length+f.previousSibling.length,f=f.previousSibling,f.parentNode.removeChild(f.nextSibling);return{textNode:f,offset:h}};this.getNeighboringParagraph=function(a,b){var e=f(0),g=null;e.setUnfilteredPosition(a,0);do if(1===d.acceptPosition(e)&&(g=n(e.container()),g!==a))return g;while(!0===(0<b?e.nextPosition():
e.previousPosition()));if(g===a)return null};this.fixCursorPositions=function(b){var c,d,e,f,g;c=a.getCursors();f=a.getPositionFilter();for(g in c)c.hasOwnProperty(g)&&(d=c[g].getStepCounter(),d.isPositionWalkable(f)||(e=-d.countBackwardSteps(1,f),0===e&&(e=d.countForwardSteps(1,f)),c[g].move(e),g===b&&a.emit(ops.OdtDocument.signalCursorMoved,c[g])))};this.getWalkableParagraphLength=function(a){var b=f(0),e=0;b.setUnfilteredPosition(a,0);do{if(n(b.container())!==a)break;1===d.acceptPosition(b)&&(e+=
1)}while(b.nextPosition());return e};this.getDistanceFromCursor=function(a,b,e){a=r[a];var f=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,f=a(b,e,d));return f};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,m(),0)};this.getCursorSelection=function(a){var b;a=r[a];var e=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,e=-b(m(),0,d),b=b(a.getAnchorNode(),0,d));return{position:e+b,
length:-b}};this.getPositionFilter=function(){return d};this.getOdfCanvas=function(){return h};this.getRootNode=m;this.getDOM=function(){return m().ownerDocument};this.getCursor=function(a){return r[a]};this.getCursors=function(){var a=[],b;for(b in r)r.hasOwnProperty(b)&&a.push(r[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countForwardSteps(1,d),e=a.getMemberId();runtime.assert(Boolean(e),"OdtDocument::addCursor has cursor without memberid");
a.move(b);r[e]=a};this.removeCursor=function(b){var c=r[b];return c?(c.removeFromOdtDocument(),delete r[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=h.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return h.getFormatting()};this.emit=function(a,
b){k.emit(a,b)};this.subscribe=function(a,b){k.subscribe(a,b)};this.unsubscribe=function(a,b){k.unsubscribe(a,b)};d=new function(){function a(e,f,g){var h,k;if(f&&(h=b.lookLeftForCharacter(f),1===h||2===h&&(b.scanRightForAnyCharacter(g)||b.scanRightForAnyCharacter(b.nextNode(e)))))return c;h=null===f&&b.isParagraph(e);k=b.lookRightForCharacter(g);if(h)return k?c:b.scanRightForAnyCharacter(g)?d:c;if(!k)return d;f=f||b.previousNode(e);return b.scanLeftForAnyCharacter(f)?d:c}var c=core.PositionFilter.FilterResult.FILTER_ACCEPT,
d=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(e){var f=e.container(),g=f.nodeType,h,k,m;if(g!==Node.ELEMENT_NODE&&g!==Node.TEXT_NODE)return d;if(g===Node.TEXT_NODE){if(!b.isGroupingElement(f.parentNode))return d;g=e.unfilteredDomOffset();h=f.data;runtime.assert(g!==h.length,"Unexpected offset.");if(0<g){e=h.substr(g-1,1);if(!b.isODFWhitespace(e))return c;if(1<g)if(e=h.substr(g-2,1),!b.isODFWhitespace(e))k=c;else{if(!b.isODFWhitespace(h.substr(0,g)))return d}else m=
b.previousNode(f),b.scanLeftForNonWhitespace(m)&&(k=c);if(k===c)return b.isTrailingWhitespace(f,g)?d:c;k=h.substr(g,1);return b.isODFWhitespace(k)?d:b.scanLeftForAnyCharacter(b.previousNode(f))?d:c}m=e.leftNode();k=f;f=f.parentNode;k=a(f,m,k)}else b.isGroupingElement(f)?(m=e.leftNode(),k=e.rightNode(),k=a(f,m,k)):k=d;return k}};b=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";
ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalStyleCreated="style/created";ops.OdtDocument.signalStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";(function(){return ops.OdtDocument})();
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
runtime.loadClass("ops.TrivialUserModel");runtime.loadClass("ops.TrivialOperationRouter");runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OdtDocument");
ops.Session=function(h){var m=new ops.OperationFactory,f=new ops.OdtDocument(h),n=new ops.TrivialUserModel,q=null;this.setUserModel=function(e){n=e};this.setOperationFactory=function(e){m=e;q&&q.setOperationFactory(m)};this.setOperationRouter=function(e){q=e;e.setPlaybackFunction(function(a){a.execute(f);f.emit(ops.OdtDocument.signalOperationExecuted,a)});e.setOperationFactory(m)};this.getUserModel=function(){return n};this.getOperationFactory=function(){return m};this.getOdtDocument=function(){return f};
this.enqueue=function(e){q.push(e)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 81
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\n\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n";
