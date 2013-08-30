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
function Runtime(){}Runtime.ByteArray=function(n){};Runtime.prototype.getVariable=function(n){};Runtime.prototype.toJson=function(n){};Runtime.prototype.fromJson=function(n){};Runtime.ByteArray.prototype.slice=function(n,m){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(n){};Runtime.prototype.byteArrayFromString=function(n,m){};Runtime.prototype.byteArrayToString=function(n,m){};Runtime.prototype.concatByteArrays=function(n,m){};
Runtime.prototype.read=function(n,m,l,d){};Runtime.prototype.readFile=function(n,m,l){};Runtime.prototype.readFileSync=function(n,m){};Runtime.prototype.loadXML=function(n,m){};Runtime.prototype.writeFile=function(n,m,l){};Runtime.prototype.isFile=function(n,m){};Runtime.prototype.getFileSize=function(n,m){};Runtime.prototype.deleteFile=function(n,m){};Runtime.prototype.log=function(n,m){};Runtime.prototype.setTimeout=function(n,m){};Runtime.prototype.clearTimeout=function(n){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(n){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(n,m,l){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(n,m){function l(b){var a="",h,f=b.length;for(h=0;h<f;h+=1)a+=String.fromCharCode(b[h]&255);return a}function d(b){var a="",h,f=b.length,c,d,k,q;for(h=0;h<f;h+=1)c=b[h],128>c?a+=String.fromCharCode(c):(h+=1,d=b[h],194<=c&&224>c?a+=String.fromCharCode((c&31)<<6|d&63):(h+=1,k=b[h],224<=c&&240>c?a+=String.fromCharCode((c&15)<<12|(d&63)<<6|k&63):(h+=1,q=b[h],240<=c&&245>c&&(c=(c&7)<<18|(d&63)<<12|(k&63)<<6|q&63,c-=65536,a+=String.fromCharCode((c>>10)+55296,(c&1023)+56320)))));
return a}var b;"utf8"===m?b=d(n):("binary"!==m&&this.log("Unsupported encoding: "+m),b=l(n));return b};Runtime.getVariable=function(n){try{return eval(n)}catch(m){}};Runtime.toJson=function(n){return JSON.stringify(n)};Runtime.fromJson=function(n){return JSON.parse(n)};Runtime.getFunctionName=function(n){return void 0===n.name?(n=/function\s+(\w+)/.exec(n))&&n[1]:n.name};
function BrowserRuntime(n){function m(a,h){var f,c,b;void 0!==h?b=a:h=a;n?(c=n.ownerDocument,b&&(f=c.createElement("span"),f.className=b,f.appendChild(c.createTextNode(b)),n.appendChild(f),n.appendChild(c.createTextNode(" "))),f=c.createElement("span"),0<h.length&&"<"===h[0]?f.innerHTML=h:f.appendChild(c.createTextNode(h)),n.appendChild(f),n.appendChild(c.createElement("br"))):console&&console.log(h);"alert"===b&&alert(h)}function l(a,h,f){function c(){var c;4===e.readyState&&(0!==e.status||e.responseText?
200===e.status||0===e.status?(c="binary"===h?null!==e.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(e.responseBody)).toArray():d.byteArrayFromString(e.responseText,"binary"):e.responseText,b[a]=c,f(null,c)):f(e.responseText||e.statusText):f("File "+a+" is empty."))}if(b.hasOwnProperty(a))f(null,b[a]);else{var e=new XMLHttpRequest;e.open("GET",a,!0);e.onreadystatechange=c;e.overrideMimeType&&("binary"!==h?e.overrideMimeType("text/plain; charset="+h):e.overrideMimeType("text/plain; charset=x-user-defined"));
try{e.send(null)}catch(k){f(k.message)}}}var d=this,b={},e=window.ArrayBuffer&&window.Uint8Array;e&&(Uint8Array.prototype.slice=function(a,h){void 0===h&&(void 0===a&&(a=0),h=this.length);var f=this.subarray(a,h),c,b;h-=a;c=new Uint8Array(new ArrayBuffer(h));for(b=0;b<h;b+=1)c[b]=f[b];return c});this.ByteArray=e?function(a){return new Uint8Array(new ArrayBuffer(a))}:function(a){var h=[];h.length=a;return h};this.concatByteArrays=e?function(a,h){var f,c=a.length,b=h.length,k=new this.ByteArray(c+b);
for(f=0;f<c;f+=1)k[f]=a[f];for(f=0;f<b;f+=1)k[f+c]=h[f];return k}:function(a,h){return a.concat(h)};this.byteArrayFromArray=function(a){return a.slice()};this.byteArrayFromString=function(a,h){var f;if("utf8"===h){f=a.length;var c,b,k,q=0;for(b=0;b<f;b+=1)k=a.charCodeAt(b),q+=1+(128<k)+(2048<k);c=new d.ByteArray(q);for(b=q=0;b<f;b+=1)k=a.charCodeAt(b),128>k?(c[q]=k,q+=1):2048>k?(c[q]=192|k>>>6,c[q+1]=128|k&63,q+=2):(c[q]=224|k>>>12&15,c[q+1]=128|k>>>6&63,c[q+2]=128|k&63,q+=3)}else for("binary"!==
h&&d.log("unknown encoding: "+h),f=a.length,c=new d.ByteArray(f),b=0;b<f;b+=1)c[b]=a.charCodeAt(b)&255;return f=c};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=l;this.read=function(a,h,f,c){function e(){var g;4===k.readyState&&(0!==k.status||k.responseText?200===k.status||0===k.status?(k.response?(g=k.response,g=new Uint8Array(g)):g=null!==k.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(k.responseBody)).toArray():d.byteArrayFromString(k.responseText,"binary"),b[a]=g,c(null,g.slice(h,h+f))):c(k.responseText||k.statusText):c("File "+a+" is empty."))}if(b.hasOwnProperty(a))c(null,b[a].slice(h,h+f));else{var k=new XMLHttpRequest;k.open("GET",a,!0);k.onreadystatechange=e;k.overrideMimeType&&k.overrideMimeType("text/plain; charset=x-user-defined");k.responseType="arraybuffer";try{k.send(null)}catch(q){c(q.message)}}};this.readFileSync=function(a,h){var f=new XMLHttpRequest,
c;f.open("GET",a,!1);f.overrideMimeType&&("binary"!==h?f.overrideMimeType("text/plain; charset="+h):f.overrideMimeType("text/plain; charset=x-user-defined"));try{if(f.send(null),200===f.status||0===f.status)c=f.responseText}catch(b){}return c};this.writeFile=function(a,h,f){b[a]=h;var c=new XMLHttpRequest;c.open("PUT",a,!0);c.onreadystatechange=function(){4===c.readyState&&(0!==c.status||c.responseText?200<=c.status&&300>c.status||0===c.status?f(null):f("Status "+String(c.status)+": "+c.responseText||
c.statusText):f("File "+a+" is empty."))};h=h.buffer&&!c.sendAsBinary?h.buffer:d.byteArrayToString(h,"binary");try{c.sendAsBinary?c.sendAsBinary(h):c.send(h)}catch(e){d.log("HUH? "+e+" "+h),f(e.message)}};this.deleteFile=function(a,h){delete b[a];var f=new XMLHttpRequest;f.open("DELETE",a,!0);f.onreadystatechange=function(){4===f.readyState&&(200>f.status&&300<=f.status?h(f.responseText):h(null))};f.send(null)};this.loadXML=function(a,h){var f=new XMLHttpRequest;f.open("GET",a,!0);f.overrideMimeType&&
f.overrideMimeType("text/xml");f.onreadystatechange=function(){4===f.readyState&&(0!==f.status||f.responseText?200===f.status||0===f.status?h(null,f.responseXML):h(f.responseText):h("File "+a+" is empty."))};try{f.send(null)}catch(c){h(c.message)}};this.isFile=function(a,h){d.getFileSize(a,function(a){h(-1!==a)})};this.getFileSize=function(a,h){var f=new XMLHttpRequest;f.open("HEAD",a,!0);f.onreadystatechange=function(){if(4===f.readyState){var c=f.getResponseHeader("Content-Length");c?h(parseInt(c,
10)):l(a,"binary",function(c,a){c?h(-1):h(a.length)})}};f.send(null)};this.log=m;this.assert=function(a,h,f){if(!a)throw m("alert","ASSERTION FAILED:\n"+h),f&&f(),h;};this.setTimeout=function(a,h){return setTimeout(function(){a()},h)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){m("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function n(a,f,c){a=d.resolve(b,a);"binary"!==f?l.readFile(a,f,c):l.readFile(a,null,c)}var m=this,l=require("fs"),d=require("path"),b="",e,a;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var f=new Buffer(a.length),c,b=a.length;for(c=0;c<b;c+=1)f[c]=a[c];return f};this.concatByteArrays=function(a,b){var c=new Buffer(a.length+b.length);a.copy(c,0,0);b.copy(c,a.length,0);return c};this.byteArrayFromString=function(a,b){return new Buffer(a,
b)};this.byteArrayToString=function(a,b){return a.toString(b)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=n;this.loadXML=function(a,b){n(a,"utf-8",function(c,a){if(c)return b(c);b(null,m.parseXML(a))})};this.writeFile=function(a,f,c){a=d.resolve(b,a);l.writeFile(a,f,"binary",function(a){c(a||null)})};this.deleteFile=function(a,f){a=d.resolve(b,a);l.unlink(a,f)};this.read=function(a,f,c,e){a=d.resolve(b,a);l.open(a,"r+",666,function(a,
b){if(a)e(a);else{var g=new Buffer(c);l.read(b,g,0,c,f,function(c){l.close(b);e(c,g)})}})};this.readFileSync=function(a,b){return b?"binary"===b?l.readFileSync(a,null):l.readFileSync(a,b):""};this.isFile=function(a,f){a=d.resolve(b,a);l.stat(a,function(c,a){f(!c&&a.isFile())})};this.getFileSize=function(a,f){a=d.resolve(b,a);l.stat(a,function(c,a){c?f(-1):f(a.size)})};this.log=function(a,b){var c;void 0!==b?c=a:b=a;"alert"===c&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(b+
"\n");"alert"===c&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,b,c){a||(process.stderr.write("ASSERTION FAILED: "+b),c&&c())};this.setTimeout=function(a,b){return setTimeout(function(){a()},b)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){b=a};this.currentDirectory=function(){return b};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=
function(a){return e.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};e=new (require("xmldom").DOMParser);a=m.parseXML("<a/>").implementation}
function RhinoRuntime(){function n(a,b){var f;void 0!==b?f=a:b=a;"alert"===f&&print("\n!!!!! ALERT !!!!!");print(b);"alert"===f&&print("!!!!! ALERT !!!!!")}var m=this,l=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),d,b,e="";l.setValidating(!1);l.setNamespaceAware(!0);l.setExpandEntityReferences(!1);l.setSchema(null);b=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,b){var f=new Packages.java.io.FileReader(b);return new Packages.org.xml.sax.InputSource(f)}});d=l.newDocumentBuilder();
d.setEntityResolver(b);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,b){var f=[],c,d=a.length;for(c=0;c<d;c+=1)f[c]=a.charCodeAt(c)&255;return f};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,b){return a.concat(b)};this.loadXML=function(a,b){var f=new Packages.java.io.File(a),c;try{c=d.parse(f)}catch(e){print(e);
b(e);return}b(null,c)};this.readFile=function(a,b,f){e&&(a=e+"/"+a);var c=new Packages.java.io.File(a),d="binary"===b?"latin1":b;c.isFile()?(a=readFile(a,d),"binary"===b&&(a=m.byteArrayFromString(a,"binary")),f(null,a)):f(a+" is not a file.")};this.writeFile=function(a,b,f){e&&(a=e+"/"+a);a=new Packages.java.io.FileOutputStream(a);var c,d=b.length;for(c=0;c<d;c+=1)a.write(b[c]);a.close();f(null)};this.deleteFile=function(a,b){e&&(a=e+"/"+a);(new Packages.java.io.File(a))["delete"]()?b(null):b("Could not delete "+
a)};this.read=function(a,b,f,c){e&&(a=e+"/"+a);var d;d=a;var k="binary";(new Packages.java.io.File(d)).isFile()?("binary"===k&&(k="latin1"),d=readFile(d,k)):d=null;d?c(null,this.byteArrayFromString(d.substring(b,b+f),"binary")):c("Cannot read "+a)};this.readFileSync=function(a,b){return b?readFile(a,b):""};this.isFile=function(a,b){e&&(a=e+"/"+a);var f=new Packages.java.io.File(a);b(f.isFile())};this.getFileSize=function(a,b){e&&(a=e+"/"+a);var f=new Packages.java.io.File(a);b(f.length())};this.log=
n;this.assert=function(a,b,f){a||(n("alert","ASSERTION FAILED: "+b),f&&f())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){e=a};this.currentDirectory=function(){return e};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return d.getDOMImplementation()};this.parseXML=function(a){return d.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function n(d){var b=d[0],e;e=eval("if (typeof "+b+" === 'undefined') {eval('"+b+" = {};');}"+b);for(b=1;b<d.length-1;b+=1)e=e.hasOwnProperty(d[b])?e[d[b]]:e[d[b]]={};return e[d[d.length-1]]}var m={},l={};runtime.loadClass=function(d){function b(a){a=a.replace(/\./g,"/")+".js";var c=runtime.libraryPaths(),b,k,q;runtime.currentDirectory&&c.push(runtime.currentDirectory());for(b=0;b<c.length;b+=1){k=c[b];if(!l.hasOwnProperty(k))try{q=runtime.readFileSync(c[b]+"/manifest.js","utf8"),l[k]=
q&&q.length?eval(q):null}catch(g){l[k]=null,runtime.log("Cannot load manifest for "+k+".")}q=null;if((k=l[k])&&k.indexOf&&-1!==k.indexOf(a))return c[b]+"/"+a}return null}function e(a){var c,d;d=b(a);if(!d)throw a+" is not listed in any manifest.js.";try{c=runtime.readFileSync(d,"utf8")}catch(k){throw runtime.log("Error loading "+a+" "+k),k;}if(void 0===c)throw"Cannot load class "+a;c=c+("\n//# sourceURL="+d)+("\n//@ sourceURL="+d);try{c=eval(a+" = eval(code);")}catch(q){throw runtime.log("Error loading "+
a+" "+q),q;}return c}if(!IS_COMPILED_CODE&&!m.hasOwnProperty(d)){var a=d.split("."),h;h=n(a);if(!h&&(h=e(d),!h||Runtime.getFunctionName(h)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];m[d]=!0}}})();
(function(n){function m(l){if(l.length){var d=l[0];runtime.readFile(d,"utf8",function(b,e){function a(){var c;(c=eval(f))&&runtime.exit(c)}var h="",f=e;-1!==d.indexOf("/")&&(h=d.substring(0,d.indexOf("/")));runtime.setCurrentDirectory(h);b||null===f?(runtime.log(b),runtime.exit(1)):a.apply(null,l)})}}n=n?Array.prototype.slice.call(n):[];"NodeJSRuntime"===runtime.type()?m(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?m(n):m(n.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function n(c){var a=[],b,g=c.length;for(b=0;b<g;b+=1)a[b]=c.charCodeAt(b)&255;return a}function m(c){var a,b="",g,k=c.length-2;for(g=0;g<k;g+=3)a=c[g]<<16|c[g+1]<<8|c[g+2],b+=p[a>>>18],b+=p[a>>>12&63],b+=p[a>>>6&63],b+=p[a&63];g===k+1?(a=c[g]<<4,b+=p[a>>>6],b+=p[a&63],b+="=="):g===k&&(a=c[g]<<10|c[g+1]<<2,b+=p[a>>>12],b+=p[a>>>6&63],b+=p[a&63],b+="=");return b}function l(c){c=c.replace(/[^A-Za-z0-9+\/]+/g,"");var a=[],b=c.length%4,g,k=c.length,f;for(g=0;g<k;g+=4)f=(r[c.charAt(g)]||
0)<<18|(r[c.charAt(g+1)]||0)<<12|(r[c.charAt(g+2)]||0)<<6|(r[c.charAt(g+3)]||0),a.push(f>>16,f>>8&255,f&255);a.length-=[0,0,2,1][b];return a}function d(c){var a=[],b,g=c.length,k;for(b=0;b<g;b+=1)k=c[b],128>k?a.push(k):2048>k?a.push(192|k>>>6,128|k&63):a.push(224|k>>>12&15,128|k>>>6&63,128|k&63);return a}function b(c){var a=[],b,g=c.length,k,f,p;for(b=0;b<g;b+=1)k=c[b],128>k?a.push(k):(b+=1,f=c[b],224>k?a.push((k&31)<<6|f&63):(b+=1,p=c[b],a.push((k&15)<<12|(f&63)<<6|p&63)));return a}function e(c){return m(n(c))}
function a(c){return String.fromCharCode.apply(String,l(c))}function h(c){return b(n(c))}function f(c){c=b(c);for(var a="",g=0;g<c.length;)a+=String.fromCharCode.apply(String,c.slice(g,g+45E3)),g+=45E3;return a}function c(c,a,b){var g="",k,f,p;for(p=a;p<b;p+=1)a=c.charCodeAt(p)&255,128>a?g+=String.fromCharCode(a):(p+=1,k=c.charCodeAt(p)&255,224>a?g+=String.fromCharCode((a&31)<<6|k&63):(p+=1,f=c.charCodeAt(p)&255,g+=String.fromCharCode((a&15)<<12|(k&63)<<6|f&63)));return g}function t(a,b){function g(){var d=
p+k;d>a.length&&(d=a.length);f+=c(a,p,d);p=d;d=p===a.length;b(f,d)&&!d&&runtime.setTimeout(g,0)}var k=1E5,f="",p=0;a.length<k?b(c(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),g())}function k(c){return d(n(c))}function q(c){return String.fromCharCode.apply(String,d(c))}function g(c){return String.fromCharCode.apply(String,d(n(c)))}var p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=function(c){var a={},b,g;b=0;for(g=c.length;b<g;b+=1)a[c.charAt(b)]=b;return a}(p),w,
u,A=runtime.getWindow(),y,s;A&&A.btoa?(y=function(c){return A.btoa(c)},w=function(c){return y(g(c))}):(y=e,w=function(c){return m(k(c))});A&&A.atob?(s=function(c){return A.atob(c)},u=function(a){a=s(a);return c(a,0,a.length)}):(s=a,u=function(c){return f(l(c))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=m;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=l;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=d;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=b;this.convertUTF8StringToBase64=e;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=h;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=f;this.convertUTF8StringToUTF16String=t;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=k;this.convertUTF16ArrayToUTF8String=q;this.convertUTF16StringToUTF8String=g;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=u;this.fromBase64=a;this.toBase64=e;this.atob=
s;this.btoa=y;this.utob=g;this.btou=t;this.encode=w;this.encodeURI=function(c){return w(c).replace(/[+\/]/g,function(c){return"+"===c?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(c){return u(c.replace(/[\-_]/g,function(c){return"-"===c?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function n(){this.dl=this.fc=0}function m(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function l(c,a,b,g){this.good_length=c;this.max_lazy=a;this.nice_length=b;this.max_chain=g}function d(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=b;this.off=0}var b=8192,e,a,h,f,c=null,t,k,q,g,p,r,w,u,A,y,s,v,x,F,E,O,z,P,C,K,M,ca,da,aa,ba,ea,Q,W,U,N,D,I,S,R,$,Y,fa,oa,L,G,ia,pa,V,T,ha,Z,ka,la,X,B,ma,wa=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],sa=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],ua=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],J=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ra;ra=[new l(0,0,0,0),new l(4,4,8,4),new l(4,5,16,8),new l(4,6,32,32),new l(4,4,16,16),new l(8,16,32,32),new l(8,16,128,128),new l(8,32,128,256),new l(32,128,258,1024),new l(32,258,258,4096)];var ta=function(g){c[k+t++]=g;if(k+t===b){var f;if(0!==t){null!==e?(g=e,e=e.next):g=new d;
g.next=null;g.len=g.off=0;null===a?a=h=g:h=h.next=g;g.len=t-k;for(f=0;f<g.len;f++)g.ptr[f]=c[k+f];t=k=0}}},ja=function(a){a&=65535;k+t<b-2?(c[k+t++]=a&255,c[k+t++]=a>>>8):(ta(a&255),ta(a>>>8))},na=function(){s=(s<<5^g[z+3-1]&255)&8191;v=w[32768+s];w[z&32767]=v;w[32768+s]=z},ga=function(c,a){A>16-a?(u|=c<<A,ja(u),u=c>>16-A,A+=a-16):(u|=c<<A,A+=a)},H=function(c,a){ga(a[c].fc,a[c].dl)},va=function(c,a,b){return c[a].fc<c[b].fc||c[a].fc===c[b].fc&&fa[a]<=fa[b]},qa=function(c,a,b){var g;for(g=0;g<b&&ma<
B.length;g++)c[a+g]=B.charCodeAt(ma++)&255;return g},za=function(){var c,a,b=65536-K-z;if(-1===b)b--;else if(65274<=z){for(c=0;32768>c;c++)g[c]=g[c+32768];P-=32768;z-=32768;y-=32768;for(c=0;8192>c;c++)a=w[32768+c],w[32768+c]=32768<=a?a-32768:0;for(c=0;32768>c;c++)a=w[c],w[c]=32768<=a?a-32768:0;b+=32768}C||(c=qa(g,z+K,b),0>=c?C=!0:K+=c)},Ca=function(c){var a=M,b=z,k,f=O,p=32506<z?z-32506:0,d=z+258,q=g[b+f-1],h=g[b+f];O>=aa&&(a>>=2);do if(k=c,g[k+f]===h&&g[k+f-1]===q&&g[k]===g[b]&&g[++k]===g[b+1]){b+=
2;k++;do++b;while(g[b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&g[++b]===g[++k]&&b<d);k=258-(d-b);b=d-258;if(k>f){P=c;f=k;if(258<=k)break;q=g[b+f-1];h=g[b+f]}c=w[c&32767]}while(c>p&&0!==--a);return f},xa=function(c,a){r[V++]=a;0===c?ba[a].fc++:(c--,ba[oa[a]+256+1].fc++,ea[(256>c?L[c]:L[256+(c>>7)])&255].fc++,p[T++]=c,Z|=ka);ka<<=1;0===(V&7)&&(pa[ha++]=Z,Z=0,ka=1);if(2<da&&0===(V&4095)){var b=8*V,g=z-y,k;for(k=0;30>k;k++)b+=ea[k].fc*
(5+sa[k]);b>>=3;if(T<parseInt(V/2,10)&&b<parseInt(g/2,10))return!0}return 8191===V||8192===T},Aa=function(c,a){for(var b=R[a],g=a<<1;g<=$;){g<$&&va(c,R[g+1],R[g])&&g++;if(va(c,b,R[g]))break;R[a]=R[g];a=g;g<<=1}R[a]=b},Da=function(c,a){var b=0;do b|=c&1,c>>=1,b<<=1;while(0<--a);return b>>1},Ea=function(c,a){var b=[];b.length=16;var g=0,k;for(k=1;15>=k;k++)g=g+S[k-1]<<1,b[k]=g;for(g=0;g<=a;g++)k=c[g].dl,0!==k&&(c[g].fc=Da(b[k]++,k))},Ba=function(c){var a=c.dyn_tree,b=c.static_tree,g=c.elems,k,f=-1,
p=g;$=0;Y=573;for(k=0;k<g;k++)0!==a[k].fc?(R[++$]=f=k,fa[k]=0):a[k].dl=0;for(;2>$;)k=R[++$]=2>f?++f:0,a[k].fc=1,fa[k]=0,la--,null!==b&&(X-=b[k].dl);c.max_code=f;for(k=$>>1;1<=k;k--)Aa(a,k);do k=R[1],R[1]=R[$--],Aa(a,1),b=R[1],R[--Y]=k,R[--Y]=b,a[p].fc=a[k].fc+a[b].fc,fa[p]=fa[k]>fa[b]+1?fa[k]:fa[b]+1,a[k].dl=a[b].dl=p,R[1]=p++,Aa(a,1);while(2<=$);R[--Y]=R[1];p=c.dyn_tree;k=c.extra_bits;var g=c.extra_base,b=c.max_code,d=c.max_length,q=c.static_tree,h,e,r,s,l=0;for(e=0;15>=e;e++)S[e]=0;p[R[Y]].dl=0;
for(c=Y+1;573>c;c++)h=R[c],e=p[p[h].dl].dl+1,e>d&&(e=d,l++),p[h].dl=e,h>b||(S[e]++,r=0,h>=g&&(r=k[h-g]),s=p[h].fc,la+=s*(e+r),null!==q&&(X+=s*(q[h].dl+r)));if(0!==l){do{for(e=d-1;0===S[e];)e--;S[e]--;S[e+1]+=2;S[d]--;l-=2}while(0<l);for(e=d;0!==e;e--)for(h=S[e];0!==h;)k=R[--c],k>b||(p[k].dl!==e&&(la+=(e-p[k].dl)*p[k].fc,p[k].fc=e),h--)}Ea(a,f)},Fa=function(c,a){var b,g=-1,k,f=c[0].dl,p=0,d=7,h=4;0===f&&(d=138,h=3);c[a+1].dl=65535;for(b=0;b<=a;b++)k=f,f=c[b+1].dl,++p<d&&k===f||(p<h?U[k].fc+=p:0!==
k?(k!==g&&U[k].fc++,U[16].fc++):10>=p?U[17].fc++:U[18].fc++,p=0,g=k,0===f?(d=138,h=3):k===f?(d=6,h=3):(d=7,h=4))},Ga=function(){8<A?ja(u):0<A&&ta(u);A=u=0},Ha=function(c,a){var b,k=0,g=0,f=0,d=0,h,e;if(0!==V){do 0===(k&7)&&(d=pa[f++]),b=r[k++]&255,0===(d&1)?H(b,c):(h=oa[b],H(h+256+1,c),e=wa[h],0!==e&&(b-=G[h],ga(b,e)),b=p[g++],h=(256>b?L[b]:L[256+(b>>7)])&255,H(h,a),e=sa[h],0!==e&&(b-=ia[h],ga(b,e))),d>>=1;while(k<V)}H(256,c)},Ia=function(c,a){var b,k=-1,g,f=c[0].dl,p=0,d=7,h=4;0===f&&(d=138,h=3);
for(b=0;b<=a;b++)if(g=f,f=c[b+1].dl,!(++p<d&&g===f)){if(p<h){do H(g,U);while(0!==--p)}else 0!==g?(g!==k&&(H(g,U),p--),H(16,U),ga(p-3,2)):10>=p?(H(17,U),ga(p-3,3)):(H(18,U),ga(p-11,7));p=0;k=g;0===f?(d=138,h=3):g===f?(d=6,h=3):(d=7,h=4)}},Ja=function(){var c;for(c=0;286>c;c++)ba[c].fc=0;for(c=0;30>c;c++)ea[c].fc=0;for(c=0;19>c;c++)U[c].fc=0;ba[256].fc=1;Z=V=T=ha=la=X=0;ka=1},ya=function(c){var a,b,k,f;f=z-y;pa[ha]=Z;Ba(N);Ba(D);Fa(ba,N.max_code);Fa(ea,D.max_code);Ba(I);for(k=18;3<=k&&0===U[J[k]].dl;k--);
la+=3*(k+1)+14;a=la+3+7>>3;b=X+3+7>>3;b<=a&&(a=b);if(f+4<=a&&0<=y)for(ga(0+c,3),Ga(),ja(f),ja(~f),k=0;k<f;k++)ta(g[y+k]);else if(b===a)ga(2+c,3),Ha(Q,W);else{ga(4+c,3);f=N.max_code+1;a=D.max_code+1;k+=1;ga(f-257,5);ga(a-1,5);ga(k-4,4);for(b=0;b<k;b++)ga(U[J[b]].dl,3);Ia(ba,f-1);Ia(ea,a-1);Ha(ba,ea)}Ja();0!==c&&Ga()},Ka=function(b,g,f){var p,d,h;for(p=0;null!==a&&p<f;){d=f-p;d>a.len&&(d=a.len);for(h=0;h<d;h++)b[g+p+h]=a.ptr[a.off+h];a.off+=d;a.len-=d;p+=d;0===a.len&&(d=a,a=a.next,d.next=e,e=d)}if(p===
f)return p;if(k<t){d=f-p;d>t-k&&(d=t-k);for(h=0;h<d;h++)b[g+p+h]=c[k+h];k+=d;p+=d;t===k&&(t=k=0)}return p},La=function(c,b,p){var d;if(!f){if(!C){A=u=0;var h,e;if(0===W[0].dl){N.dyn_tree=ba;N.static_tree=Q;N.extra_bits=wa;N.extra_base=257;N.elems=286;N.max_length=15;N.max_code=0;D.dyn_tree=ea;D.static_tree=W;D.extra_bits=sa;D.extra_base=0;D.elems=30;D.max_length=15;D.max_code=0;I.dyn_tree=U;I.static_tree=null;I.extra_bits=ua;I.extra_base=0;I.elems=19;I.max_length=7;for(e=h=I.max_code=0;28>e;e++)for(G[e]=
h,d=0;d<1<<wa[e];d++)oa[h++]=e;oa[h-1]=e;for(e=h=0;16>e;e++)for(ia[e]=h,d=0;d<1<<sa[e];d++)L[h++]=e;for(h>>=7;30>e;e++)for(ia[e]=h<<7,d=0;d<1<<sa[e]-7;d++)L[256+h++]=e;for(d=0;15>=d;d++)S[d]=0;for(d=0;143>=d;)Q[d++].dl=8,S[8]++;for(;255>=d;)Q[d++].dl=9,S[9]++;for(;279>=d;)Q[d++].dl=7,S[7]++;for(;287>=d;)Q[d++].dl=8,S[8]++;Ea(Q,287);for(d=0;30>d;d++)W[d].dl=5,W[d].fc=Da(d,5);Ja()}for(d=0;8192>d;d++)w[32768+d]=0;ca=ra[da].max_lazy;aa=ra[da].good_length;M=ra[da].max_chain;y=z=0;K=qa(g,0,65536);if(0>=
K)C=!0,K=0;else{for(C=!1;262>K&&!C;)za();for(d=s=0;2>d;d++)s=(s<<5^g[d]&255)&8191}a=null;k=t=0;3>=da?(O=2,E=0):(E=2,F=0);q=!1}f=!0;if(0===K)return q=!0,0}d=Ka(c,b,p);if(d===p)return p;if(q)return d;if(3>=da)for(;0!==K&&null===a;){na();0!==v&&32506>=z-v&&(E=Ca(v),E>K&&(E=K));if(3<=E)if(e=xa(z-P,E-3),K-=E,E<=ca){E--;do z++,na();while(0!==--E);z++}else z+=E,E=0,s=g[z]&255,s=(s<<5^g[z+1]&255)&8191;else e=xa(0,g[z]&255),K--,z++;e&&(ya(0),y=z);for(;262>K&&!C;)za()}else for(;0!==K&&null===a;){na();O=E;x=
P;E=2;0!==v&&(O<ca&&32506>=z-v)&&(E=Ca(v),E>K&&(E=K),3===E&&4096<z-P&&E--);if(3<=O&&E<=O){e=xa(z-1-x,O-3);K-=O-1;O-=2;do z++,na();while(0!==--O);F=0;E=2;z++;e&&(ya(0),y=z)}else 0!==F?xa(0,g[z-1]&255)&&(ya(0),y=z):F=1,z++,K--;for(;262>K&&!C;)za()}0===K&&(0!==F&&xa(0,g[z-1]&255),ya(1),q=!0);return d+Ka(c,d+b,p-d)};this.deflate=function(k,d){var q,s;B=k;ma=0;"undefined"===String(typeof d)&&(d=6);(q=d)?1>q?q=1:9<q&&(q=9):q=6;da=q;C=f=!1;if(null===c){e=a=h=null;c=[];c.length=b;g=[];g.length=65536;p=[];
p.length=8192;r=[];r.length=32832;w=[];w.length=65536;ba=[];ba.length=573;for(q=0;573>q;q++)ba[q]=new n;ea=[];ea.length=61;for(q=0;61>q;q++)ea[q]=new n;Q=[];Q.length=288;for(q=0;288>q;q++)Q[q]=new n;W=[];W.length=30;for(q=0;30>q;q++)W[q]=new n;U=[];U.length=39;for(q=0;39>q;q++)U[q]=new n;N=new m;D=new m;I=new m;S=[];S.length=16;R=[];R.length=573;fa=[];fa.length=573;oa=[];oa.length=256;L=[];L.length=512;G=[];G.length=29;ia=[];ia.length=30;pa=[];pa.length=1024}var l=Array(1024),u=[],v=[];for(q=La(l,
0,l.length);0<q;){v.length=q;for(s=0;s<q;s++)v[s]=String.fromCharCode(l[s]);u[u.length]=v.join("");q=La(l,0,l.length)}B=null;return u.join("")}};
// Input 4
core.ByteArray=function(n){this.pos=0;this.data=n;this.readUInt32LE=function(){this.pos+=4;var n=this.data,l=this.pos;return n[--l]<<24|n[--l]<<16|n[--l]<<8|n[--l]};this.readUInt16LE=function(){this.pos+=2;var n=this.data,l=this.pos;return n[--l]<<8|n[--l]}};
// Input 5
core.ByteArrayWriter=function(n){var m=this,l=new runtime.ByteArray(0);this.appendByteArrayWriter=function(d){l=runtime.concatByteArrays(l,d.getByteArray())};this.appendByteArray=function(d){l=runtime.concatByteArrays(l,d)};this.appendArray=function(d){l=runtime.concatByteArrays(l,runtime.byteArrayFromArray(d))};this.appendUInt16LE=function(d){m.appendArray([d&255,d>>8&255])};this.appendUInt32LE=function(d){m.appendArray([d&255,d>>8&255,d>>16&255,d>>24&255])};this.appendString=function(d){l=runtime.concatByteArrays(l,
runtime.byteArrayFromString(d,n))};this.getLength=function(){return l.length};this.getByteArray=function(){return l}};
// Input 6
core.RawInflate=function(){var n,m,l=null,d,b,e,a,h,f,c,t,k,q,g,p,r,w,u=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],A=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],s=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],v=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],F=function(){this.list=this.next=null},E=function(){this.n=this.b=this.e=0;this.t=null},O=function(c,a,b,k,g,f){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var d=Array(this.BMAX+1),p,h,q,e,r,s,l,u=Array(this.BMAX+1),n,m,v,w=new E,y=Array(this.BMAX);e=Array(this.N_MAX);var t,A=Array(this.BMAX+1),z,x,C;C=this.root=null;for(r=0;r<d.length;r++)d[r]=0;for(r=0;r<u.length;r++)u[r]=0;for(r=0;r<y.length;r++)y[r]=null;for(r=0;r<e.length;r++)e[r]=
0;for(r=0;r<A.length;r++)A[r]=0;p=256<a?c[256]:this.BMAX;n=c;m=0;r=a;do d[n[m]]++,m++;while(0<--r);if(d[0]==a)this.root=null,this.status=this.m=0;else{for(s=1;s<=this.BMAX&&0==d[s];s++);l=s;f<s&&(f=s);for(r=this.BMAX;0!=r&&0==d[r];r--);q=r;f>r&&(f=r);for(z=1<<s;s<r;s++,z<<=1)if(0>(z-=d[s])){this.status=2;this.m=f;return}if(0>(z-=d[r]))this.status=2,this.m=f;else{d[r]+=z;A[1]=s=0;n=d;m=1;for(v=2;0<--r;)A[v++]=s+=n[m++];n=c;r=m=0;do 0!=(s=n[m++])&&(e[A[s]++]=r);while(++r<a);a=A[q];A[0]=r=0;n=e;m=0;
e=-1;t=u[0]=0;v=null;for(x=0;l<=q;l++)for(c=d[l];0<c--;){for(;l>t+u[1+e];){t+=u[1+e];e++;x=(x=q-t)>f?f:x;if((h=1<<(s=l-t))>c+1)for(h-=c+1,v=l;++s<x&&!((h<<=1)<=d[++v]);)h-=d[v];t+s>p&&t<p&&(s=p-t);x=1<<s;u[1+e]=s;v=Array(x);for(h=0;h<x;h++)v[h]=new E;C=null==C?this.root=new F:C.next=new F;C.next=null;C.list=v;y[e]=v;0<e&&(A[e]=r,w.b=u[e],w.e=16+s,w.t=v,s=(r&(1<<t)-1)>>t-u[e],y[e-1][s].e=w.e,y[e-1][s].b=w.b,y[e-1][s].n=w.n,y[e-1][s].t=w.t)}w.b=l-t;m>=a?w.e=99:n[m]<b?(w.e=256>n[m]?16:15,w.n=n[m++]):
(w.e=g[n[m]-b],w.n=k[n[m++]-b]);h=1<<l-t;for(s=r>>t;s<x;s+=h)v[s].e=w.e,v[s].b=w.b,v[s].n=w.n,v[s].t=w.t;for(s=1<<l-1;0!=(r&s);s>>=1)r^=s;for(r^=s;(r&(1<<t)-1)!=A[e];)t-=u[e],e--}this.m=u[1];this.status=0!=z&&1!=q?1:0}}},z=function(c){for(;a<c;){var b=e,k;k=r.length==w?-1:r[w++];e=b|k<<a;a+=8}},P=function(c){return e&u[c]},C=function(c){e>>=c;a-=c},K=function(a,b,f){var d,e,r;if(0==f)return 0;for(r=0;;){z(g);e=k.list[P(g)];for(d=e.e;16<d;){if(99==d)return-1;C(e.b);d-=16;z(d);e=e.t[P(d)];d=e.e}C(e.b);
if(16==d)m&=32767,a[b+r++]=n[m++]=e.n;else{if(15==d)break;z(d);c=e.n+P(d);C(d);z(p);e=q.list[P(p)];for(d=e.e;16<d;){if(99==d)return-1;C(e.b);d-=16;z(d);e=e.t[P(d)];d=e.e}C(e.b);z(d);t=m-e.n-P(d);for(C(d);0<c&&r<f;)c--,t&=32767,m&=32767,a[b+r++]=n[m++]=n[t++]}if(r==f)return f}h=-1;return r},M,ca=function(c,a,b){var d,f,e,h,r,l,u,n=Array(316);for(d=0;d<n.length;d++)n[d]=0;z(5);l=257+P(5);C(5);z(5);u=1+P(5);C(5);z(4);d=4+P(4);C(4);if(286<l||30<u)return-1;for(f=0;f<d;f++)z(3),n[x[f]]=P(3),C(3);for(;19>
f;f++)n[x[f]]=0;g=7;f=new O(n,19,19,null,null,g);if(0!=f.status)return-1;k=f.root;g=f.m;h=l+u;for(d=e=0;d<h;)if(z(g),r=k.list[P(g)],f=r.b,C(f),f=r.n,16>f)n[d++]=e=f;else if(16==f){z(2);f=3+P(2);C(2);if(d+f>h)return-1;for(;0<f--;)n[d++]=e}else{17==f?(z(3),f=3+P(3),C(3)):(z(7),f=11+P(7),C(7));if(d+f>h)return-1;for(;0<f--;)n[d++]=0;e=0}g=9;f=new O(n,l,257,A,y,g);0==g&&(f.status=1);if(0!=f.status)return-1;k=f.root;g=f.m;for(d=0;d<u;d++)n[d]=n[d+l];p=6;f=new O(n,u,0,s,v,p);q=f.root;p=f.m;return 0==p&&
257<l||0!=f.status?-1:K(c,a,b)};this.inflate=function(u,x){null==n&&(n=Array(65536));a=e=m=0;h=-1;f=!1;c=t=0;k=null;r=u;w=0;var F=new runtime.ByteArray(x);a:{var E,Q;for(E=0;E<x&&(!f||-1!=h);){if(0<c){if(0!=h)for(;0<c&&E<x;)c--,t&=32767,m&=32767,F[0+E++]=n[m++]=n[t++];else{for(;0<c&&E<x;)c--,m&=32767,z(8),F[0+E++]=n[m++]=P(8),C(8);0==c&&(h=-1)}if(E==x)break}if(-1==h){if(f)break;z(1);0!=P(1)&&(f=!0);C(1);z(2);h=P(2);C(2);k=null;c=0}switch(h){case 0:Q=F;var W=0+E,U=x-E,N=void 0,N=a&7;C(N);z(16);N=P(16);
C(16);z(16);if(N!=(~e&65535))Q=-1;else{C(16);c=N;for(N=0;0<c&&N<U;)c--,m&=32767,z(8),Q[W+N++]=n[m++]=P(8),C(8);0==c&&(h=-1);Q=N}break;case 1:if(null!=k)Q=K(F,0+E,x-E);else b:{Q=F;W=0+E;U=x-E;if(null==l){for(var D=void 0,N=Array(288),D=void 0,D=0;144>D;D++)N[D]=8;for(;256>D;D++)N[D]=9;for(;280>D;D++)N[D]=7;for(;288>D;D++)N[D]=8;b=7;D=new O(N,288,257,A,y,b);if(0!=D.status){alert("HufBuild error: "+D.status);Q=-1;break b}l=D.root;b=D.m;for(D=0;30>D;D++)N[D]=5;M=5;D=new O(N,30,0,s,v,M);if(1<D.status){l=
null;alert("HufBuild error: "+D.status);Q=-1;break b}d=D.root;M=D.m}k=l;q=d;g=b;p=M;Q=K(Q,W,U)}break;case 2:Q=null!=k?K(F,0+E,x-E):ca(F,0+E,x-E);break;default:Q=-1}if(-1==Q)break a;E+=Q}}r=null;return F}};
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
core.LoopWatchDog=function(n,m){var l=Date.now(),d=0;this.check=function(){var b;if(n&&(b=Date.now(),b-l>n))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<m&&(d+=1,d>m))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){this.hashString=function(n){var m=0,l,d;l=0;for(d=n.length;l<d;l+=1)m=(m<<5)-m+n.charCodeAt(l),m|=0;return m}};
// Input 9
core.DomUtils=function(){function n(l,d){if(l.nodeType===Node.TEXT_NODE)if(0===l.length)l.parentNode.removeChild(l);else if(d.nodeType===Node.TEXT_NODE)return d.insertData(0,l.data),l.parentNode.removeChild(l),d;return l}function m(l,d){return l===d||Boolean(l.compareDocumentPosition(d)&Node.DOCUMENT_POSITION_CONTAINED_BY)}this.splitBoundaries=function(l){var d=[],b;if(l.startContainer.nodeType===Node.TEXT_NODE||l.endContainer.nodeType===Node.TEXT_NODE){b=l.endContainer;var e=l.endOffset;if(e<b.childNodes.length)for(b=
b.childNodes[e],e=0;b.firstChild;)b=b.firstChild;else for(;b.lastChild;)b=b.lastChild,e=b.nodeType===Node.TEXT_NODE?b.textContent.length:b.childNodes.length;l.setEnd(b,e);0!==l.endOffset&&(l.endContainer.nodeType===Node.TEXT_NODE&&l.endOffset!==l.endContainer.length)&&(d.push(l.endContainer.splitText(l.endOffset)),d.push(l.endContainer));0!==l.startOffset&&(l.startContainer.nodeType===Node.TEXT_NODE&&l.startOffset!==l.startContainer.length)&&(b=l.startContainer.splitText(l.startOffset),d.push(l.startContainer),
d.push(b),l.setStart(b,0))}return d};this.containsRange=function(l,d){return 0>=l.compareBoundaryPoints(l.START_TO_START,d)&&0<=l.compareBoundaryPoints(l.END_TO_END,d)};this.rangesIntersect=function(l,d){return 0>=l.compareBoundaryPoints(l.END_TO_START,d)&&0<=l.compareBoundaryPoints(l.START_TO_END,d)};this.getNodesInRange=function(l,d){var b=[],e,a=l.startContainer.ownerDocument.createTreeWalker(l.commonAncestorContainer,NodeFilter.SHOW_ALL,d,!1);for(e=a.currentNode=l.startContainer;e;){if(d(e)===
NodeFilter.FILTER_ACCEPT)b.push(e);else if(d(e)===NodeFilter.FILTER_REJECT)break;e=e.parentNode}b.reverse();for(e=a.nextNode();e;)b.push(e),e=a.nextNode();return b};this.normalizeTextNodes=function(l){l&&l.nextSibling&&(l=n(l,l.nextSibling));l&&l.previousSibling&&n(l.previousSibling,l)};this.rangeContainsNode=function(l,d){var b=d.ownerDocument.createRange(),e=d.nodeType===Node.TEXT_NODE?d.length:d.childNodes.length;b.setStart(l.startContainer,l.startOffset);b.setEnd(l.endContainer,l.endOffset);e=
0===b.comparePoint(d,0)&&0===b.comparePoint(d,e);b.detach();return e};this.mergeIntoParent=function(l){for(var d=l.parentNode;l.firstChild;)d.insertBefore(l.firstChild,l);d.removeChild(l);return d};this.getElementsByTagNameNS=function(l,d,b){return Array.prototype.slice.call(l.getElementsByTagNameNS(d,b))};this.rangeIntersectsNode=function(l,d){var b=d.nodeType===Node.TEXT_NODE?d.length:d.childNodes.length;return 0>=l.comparePoint(d,0)&&0<=l.comparePoint(d,b)};this.containsNode=function(l,d){return l===
d||l.contains(d)};(function(l){var d=runtime.getWindow();null!==d&&(d=d.navigator.appVersion.toLowerCase(),d=-1===d.indexOf("chrome")&&(-1!==d.indexOf("applewebkit")||-1!==d.indexOf("safari")))&&(l.containsNode=m)})(this)};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(n,m){function l(c){c.parentNode&&(h.push(c.previousSibling),h.push(c.nextSibling),c.parentNode.removeChild(c))}function d(c,a,b){if(a.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(a),"putCursorIntoTextNode: invalid container");var d=a.parentNode;runtime.assert(Boolean(d),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=a.length,"putCursorIntoTextNode: offset is out of bounds");0===b?d.insertBefore(c,a):(b!==a.length&&a.splitText(b),d.insertBefore(c,
a.nextSibling))}else if(a.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(a),"putCursorIntoContainer: invalid container");for(d=a.firstChild;null!==d&&0<b;)d=d.nextSibling,b-=1;a.insertBefore(c,d)}h.push(c.previousSibling);h.push(c.nextSibling)}var b=n.createElementNS("urn:webodf:names:cursor","cursor"),e=n.createElementNS("urn:webodf:names:cursor","anchor"),a,h=[],f,c,t=new core.DomUtils;this.getNode=function(){return b};this.getAnchorNode=function(){return e.parentNode?e:b};this.getSelectedRange=
function(){c?(f.setStartBefore(b),f.collapse(!0)):(f.setStartAfter(a?e:b),f.setEndBefore(a?b:e));return f};this.setSelectedRange=function(k,q){f&&f!==k&&f.detach();f=k;a=!1!==q;(c=k.collapsed)?(l(e),l(b),d(b,k.startContainer,k.startOffset)):(l(e),l(b),d(a?b:e,k.endContainer,k.endOffset),d(a?e:b,k.startContainer,k.startOffset));h.forEach(t.normalizeTextNodes);h.length=0};this.remove=function(){l(b);h.forEach(t.normalizeTextNodes);h.length=0};b.setAttributeNS("urn:webodf:names:cursor","memberId",m);
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
core.EventNotifier=function(n){var m={};this.emit=function(l,d){var b,e;runtime.assert(m.hasOwnProperty(l),'unknown event fired "'+l+'"');e=m[l];for(b=0;b<e.length;b+=1)e[b](d)};this.subscribe=function(l,d){runtime.assert(m.hasOwnProperty(l),'tried to subscribe to unknown event "'+l+'"');m[l].push(d);runtime.log('event "'+l+'" subscribed.')};this.unsubscribe=function(l,d){var b;runtime.assert(m.hasOwnProperty(l),'tried to unsubscribe from unknown event "'+l+'"');b=m[l].indexOf(d);runtime.assert(-1!==
b,'tried to unsubscribe unknown callback from event "'+l+'"');-1!==b&&m[l].splice(b,1);runtime.log('event "'+l+'" unsubscribed.')};(function(){var l;for(l=0;l<n.length;l+=1)m[n[l]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var n=runtime.getWindow().document,m=n.getElementById("testarea");runtime.assert(!m,'Unclean test environment, found a div with id "testarea".');m=n.createElement("div");m.setAttribute("id","testarea");n.body.appendChild(m);return m};
core.UnitTest.cleanupTestAreaDiv=function(){var n=runtime.getWindow().document,m=n.getElementById("testarea");runtime.assert(!!m&&m.parentNode===n.body,'Test environment broken, found no div with id "testarea" below body.');n.body.removeChild(m)};
core.UnitTestRunner=function(){function n(b){a+=1;runtime.log("fail",b)}function m(a,c){var b;try{if(a.length!==c.length)return n("array of length "+a.length+" should be "+c.length+" long"),!1;for(b=0;b<a.length;b+=1)if(a[b]!==c[b])return n(a[b]+" should be "+c[b]+" at array index "+b),!1}catch(k){return!1}return!0}function l(a,c,b){var k=a.attributes,d=k.length,g,p,e;for(g=0;g<d;g+=1)if(p=k.item(g),"xmlns"!==p.prefix){e=c.getAttributeNS(p.namespaceURI,p.localName);if(!c.hasAttributeNS(p.namespaceURI,
p.localName))return n("Attribute "+p.localName+" with value "+p.value+" was not present"),!1;if(e!==p.value)return n("Attribute "+p.localName+" was "+e+" should be "+p.value),!1}return b?!0:l(c,a,!0)}function d(a,c){if(a.nodeType!==c.nodeType)return n(a.nodeType+" should be "+c.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===c.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==c.namespaceURI||a.localName!==c.localName)return n(a.namespaceURI+
" should be "+c.namespaceURI),!1;if(!l(a,c,!1))return!1;for(var b=a.firstChild,k=c.firstChild;b;){if(!k||!d(b,k))return!1;b=b.nextSibling;k=k.nextSibling}return k?!1:!0}function b(a,c){return 0===c?a===c&&1/a===1/c:a===c?!0:"number"===typeof c&&isNaN(c)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(c)===Object.prototype.toString.call([])?m(a,c):"object"===typeof c&&"object"===typeof a?c.constructor===Element||c.constructor===Node?d(c,a):h(c,a):!1}function e(a,c,d){"string"===typeof c&&
"string"===typeof d||runtime.log("WARN: shouldBe() expects string arguments");var k,e;try{e=eval(c)}catch(g){k=g}a=eval(d);k?n(c+" should be "+a+". Threw exception "+k):b(e,a)?runtime.log("pass",c+" is "+d):String(typeof e)===String(typeof a)?(d=0===e&&0>1/e?"-0":String(e),n(c+" should be "+a+". Was "+d+".")):n(c+" should be "+a+" (of type "+typeof a+"). Was "+e+" (of type "+typeof e+").")}var a=0,h;h=function(a,c){var d=Object.keys(a),k=Object.keys(c);d.sort();k.sort();return m(d,k)&&Object.keys(a).every(function(k){var g=
a[k],d=c[k];return b(g,d)?!0:(n(g+" should be "+d+" for key "+k),!1)})};this.areNodesEqual=d;this.shouldBeNull=function(a,c){e(a,c,"null")};this.shouldBeNonNull=function(a,c){var b,k;try{k=eval(c)}catch(d){b=d}b?n(c+" should be non-null. Threw exception "+b):null!==k?runtime.log("pass",c+" is non-null."):n(c+" should be non-null. Was "+k)};this.shouldBe=e;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function n(d,b){return"<span style='color:blue;cursor:pointer' onclick='"+b+"'>"+d+"</span>"}var m=0,l={};this.runTests=function(d,b,e){function a(k){if(0===k.length)l[h]=t,m+=f.countFailedTests(),b();else{q=k[0];var d=Runtime.getFunctionName(q);runtime.log("Running "+d);p=f.countFailedTests();c.setUp();q(function(){c.tearDown();t[d]=p===f.countFailedTests();a(k.slice(1))})}}var h=Runtime.getFunctionName(d),f=new core.UnitTestRunner,c=new d(f),t={},k,q,g,p,r="BrowserRuntime"===
runtime.type();if(l.hasOwnProperty(h))runtime.log("Test "+h+" has already run.");else{r?runtime.log("<span>Running "+n(h,'runSuite("'+h+'");')+": "+c.description()+"</span>"):runtime.log("Running "+h+": "+c.description);g=c.tests();for(k=0;k<g.length;k+=1)q=g[k],d=Runtime.getFunctionName(q)||q.testName,e.length&&-1===e.indexOf(d)||(r?runtime.log("<span>Running "+n(d,'runTest("'+h+'","'+d+'")')+"</span>"):runtime.log("Running "+d),p=f.countFailedTests(),c.setUp(),q(),c.tearDown(),t[d]=p===f.countFailedTests());
a(c.asyncTests())}};this.countFailedTests=function(){return m};this.results=function(){return l}};
// Input 13
core.PositionIterator=function(n,m,l,d){function b(){this.acceptNode=function(c){return c.nodeType===Node.TEXT_NODE&&0===c.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function e(c){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:c.acceptNode(a)}}function a(){var a=f.currentNode.nodeType;c=a===Node.TEXT_NODE?f.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var h=this,f,c,t;this.nextPosition=function(){if(f.currentNode===n)return!1;
if(0===c&&f.currentNode.nodeType===Node.ELEMENT_NODE)null===f.firstChild()&&(c=1);else if(f.currentNode.nodeType===Node.TEXT_NODE&&c+1<f.currentNode.length)c+=1;else if(null!==f.nextSibling())c=0;else if(f.parentNode())c=1;else return!1;return!0};this.previousPosition=function(){var b=!0;if(0===c)if(null===f.previousSibling()){if(!f.parentNode()||f.currentNode===n)return f.firstChild(),!1;c=0}else a();else f.currentNode.nodeType===Node.TEXT_NODE?c-=1:null!==f.lastChild()?a():f.currentNode===n?b=!1:
c=0;return b};this.container=function(){var a=f.currentNode,b=a.nodeType;return 0===c&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=f.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&c===a.length)for(a=a.nextSibling;a&&1!==t(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===c&&(a=null);return a};this.leftNode=function(){var a=f.currentNode;if(0===c)for(a=a.previousSibling;a&&1!==t(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==t(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return f.currentNode};this.domOffset=function(){if(f.currentNode.nodeType===Node.TEXT_NODE)return c;var a=0,b=f.currentNode,d;for(d=1===c?f.lastChild():f.previousSibling();d;)a+=1,d=f.previousSibling();f.currentNode=b;return a};this.unfilteredDomOffset=function(){if(f.currentNode.nodeType===Node.TEXT_NODE)return c;for(var a=0,b=f.currentNode,b=1===c?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=
function(){var a=f.currentNode,c=f.previousSibling();f.currentNode=a;return c};this.getNextSibling=function(){var a=f.currentNode,c=f.nextSibling();f.currentNode=a;return c};this.setUnfilteredPosition=function(a,b){var d;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");f.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return c=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),
b===a.length&&(c=void 0,f.nextSibling()?c=0:f.parentNode()&&(c=1),runtime.assert(void 0!==c,"Error in setPosition: position not valid.")),!0;d=t(a);b<a.childNodes.length&&d!==NodeFilter.FILTER_REJECT?(f.currentNode=a.childNodes[b],d=t(f.currentNode),c=0):c=0===b?0:1;d===NodeFilter.FILTER_REJECT&&(c=1);if(d!==NodeFilter.FILTER_ACCEPT)return h.nextPosition();runtime.assert(t(f.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
return!0};this.moveToEnd=function(){f.currentNode=n;c=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?h.setUnfilteredPosition(a,a.length):(f.currentNode=a,c=1)};this.getNodeFilter=function(){return t};t=(l?new e(l):new b).acceptNode;t.acceptNode=t;f=n.ownerDocument.createTreeWalker(n,m||4294967295,t,d);c=0;null===f.firstChild()&&(c=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(n){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var n={},m=core.PositionFilter.FilterResult.FILTER_ACCEPT,l=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(d){for(var b in n)if(n.hasOwnProperty(b)&&n[b].acceptPosition(d)===l)return l;return m};this.addFilter=function(d,b){n[d]=b};this.removeFilter=function(d){delete n[d]}};
// Input 16
core.Async=function(){this.forEach=function(n,m,l){function d(b){a!==e&&(b?(a=e,l(b)):(a+=1,a===e&&l(null)))}var b,e=n.length,a=0;for(b=0;b<e;b+=1)m(n[b],d)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(n,m){function l(a){var c=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,d,g=a.length,k=0,k=0;b=-1;for(d=0;d<g;d+=1)k=(b^a[d])&255,k=c[k],b=b>>>8^k;return b^-1}function d(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function b(a){var c=a.getFullYear();return 1980>c?0:c-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function e(a,c){var b,g,k,f,e,h,r,q=this;this.load=function(c){if(void 0!==q.data)c(null,q.data);else{var b=e+34+g+k+256;b+r>p&&(b=p-r);runtime.read(a,r,b,function(b,d){if(b||null===d)c(b,d);else a:{var g=d,k=new core.ByteArray(g),p=k.readUInt32LE(),r;if(67324752!==p)c("File entry signature is wrong."+p.toString()+" "+g.length.toString(),null);else{k.pos+=22;p=k.readUInt16LE();r=k.readUInt16LE();k.pos+=p+r;
if(f){g=g.slice(k.pos,k.pos+e);if(e!==g.length){c("The amount of compressed bytes read was "+g.length.toString()+" instead of "+e.toString()+" for "+q.filename+" in "+a+".",null);break a}g=w(g,h)}else g=g.slice(k.pos,k.pos+h);h!==g.length?c("The amount of bytes read was "+g.length.toString()+" instead of "+h.toString()+" for "+q.filename+" in "+a+".",null):(q.data=g,c(null,g))}}})}};this.set=function(a,c,b,d){q.filename=a;q.data=c;q.compressed=b;q.date=d};this.error=null;c&&(b=c.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+a+'": '+c.data.length.toString():(c.pos+=6,f=c.readUInt16LE(),this.date=d(c.readUInt32LE()),c.readUInt32LE(),e=c.readUInt32LE(),h=c.readUInt32LE(),g=c.readUInt16LE(),k=c.readUInt16LE(),b=c.readUInt16LE(),c.pos+=8,r=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.slice(c.pos,c.pos+g),"utf8"),c.pos+=g+k+b))}function a(a,c){if(22!==a.length)c("Central directory length should be 22.",
u);else{var b=new core.ByteArray(a),d;d=b.readUInt32LE();101010256!==d?c("Central directory signature is wrong: "+d.toString(),u):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",u):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",u):(d=b.readUInt16LE(),r=b.readUInt16LE(),d!==r?c("Number of entries is inconsistent.",u):(d=b.readUInt32LE(),b=b.readUInt16LE(),b=p-22-d,runtime.read(n,b,p-b,function(a,b){if(a||null===b)c(a,u);else a:{var d=
new core.ByteArray(b),k,f;g=[];for(k=0;k<r;k+=1){f=new e(n,d);if(f.error){c(f.error,u);break a}g[g.length]=f}c(null,u)}})))))}}function h(a,c){var b=null,d,k;for(k=0;k<g.length;k+=1)if(d=g[k],d.filename===a){b=d;break}b?b.data?c(null,b.data):b.load(c):c(a+" not found.",null)}function f(a){var c=new core.ByteArrayWriter("utf8"),d=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(d=a.data.length);c.appendUInt32LE(b(a.date));c.appendUInt32LE(l(a.data));c.appendUInt32LE(d);c.appendUInt32LE(d);c.appendUInt16LE(a.filename.length);
c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function c(a,c){var d=new core.ByteArrayWriter("utf8"),g=0;d.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(g=a.data.length);d.appendUInt32LE(b(a.date));d.appendUInt32LE(l(a.data));d.appendUInt32LE(g);d.appendUInt32LE(g);d.appendUInt16LE(a.filename.length);d.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);d.appendUInt32LE(c);d.appendString(a.filename);return d}function t(a,c){if(a===g.length)c(null);else{var b=g[a];
void 0!==b.data?t(a+1,c):b.load(function(b){b?c(b):t(a+1,c)})}}function k(a,b){t(0,function(d){if(d)b(d);else{d=new core.ByteArrayWriter("utf8");var k,e,p,h=[0];for(k=0;k<g.length;k+=1)d.appendByteArrayWriter(f(g[k])),h.push(d.getLength());p=d.getLength();for(k=0;k<g.length;k+=1)e=g[k],d.appendByteArrayWriter(c(e,h[k]));k=d.getLength()-p;d.appendArray([80,75,5,6,0,0,0,0]);d.appendUInt16LE(g.length);d.appendUInt16LE(g.length);d.appendUInt32LE(k);d.appendUInt32LE(p);d.appendArray([0,0]);a(d.getByteArray())}})}
function q(a,c){k(function(b){runtime.writeFile(a,b,c)},c)}var g,p,r,w=(new core.RawInflate).inflate,u=this,A=new core.Base64;this.load=h;this.save=function(a,c,b,d){var k,f;for(k=0;k<g.length;k+=1)if(f=g[k],f.filename===a){f.set(a,c,b,d);return}f=new e(n);f.set(a,c,b,d);g.push(f)};this.write=function(a){q(n,a)};this.writeAs=q;this.createByteArray=k;this.loadContentXmlAsFragments=function(a,c){u.loadAsString(a,function(a,b){if(a)return c.rootElementReady(a);c.rootElementReady(null,b,!0)})};this.loadAsString=
function(a,c){h(a,function(a,b){if(a||null===b)return c(a,null);var d=runtime.byteArrayToString(b,"utf8");c(null,d)})};this.loadAsDOM=function(a,c){u.loadAsString(a,function(a,b){if(a||null===b)c(a,null);else{var d=(new DOMParser).parseFromString(b,"text/xml");c(null,d)}})};this.loadAsDataURL=function(a,c,b){h(a,function(a,d){if(a)return b(a,null);var g=0,k;c||(c=80===d[1]&&78===d[2]&&71===d[3]?"image/png":255===d[0]&&216===d[1]&&255===d[2]?"image/jpeg":71===d[0]&&73===d[1]&&70===d[2]?"image/gif":
"");for(k="data:"+c+";base64,";g<d.length;)k+=A.convertUTF8ArrayToBase64(d.slice(g,Math.min(g+45E3,d.length))),g+=45E3;b(null,k)})};this.getEntries=function(){return g.slice()};p=-1;null===m?g=[]:runtime.getFileSize(n,function(c){p=c;0>p?m("File '"+n+"' cannot be read.",u):runtime.read(n,p-22,22,function(c,b){c||null===m||null===b?m(c,u):a(b,m)})})};
// Input 18
core.CSSUnits=function(){var n={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(m,l,d){return m*n[d]/n[l]};this.convertMeasure=function(n,l){var d,b;n&&l?(d=parseFloat(n),b=n.replace(d.toString(),""),d=this.convert(d,b,l)):d="";return d.toString()};this.getUnits=function(n){return n.substr(n.length-2,n.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(n){var m=function(){};m.prototype=n;return new m});
xmldom.LSSerializer=function(){function n(b){var d=b||{},a=function(a){var c={},b;for(b in a)a.hasOwnProperty(b)&&(c[a[b]]=b);return c}(b),h=[d],f=[a],c=0;this.push=function(){c+=1;d=h[c]=Object.create(d);a=f[c]=Object.create(a)};this.pop=function(){h[c]=void 0;f[c]=void 0;c-=1;d=h[c];a=f[c]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(c){var b=c.namespaceURI,f=0,g;if(!b)return c.localName;if(g=a[b])return g+":"+c.localName;do{g||!c.prefix?(g="ns"+f,f+=1):g=c.prefix;
if(d[g]===b)break;if(!d[g]){d[g]=b;a[b]=g;break}g=null}while(null===g);return g+":"+c.localName}}function m(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function l(b,e){var a="",h=d.filter?d.filter.acceptNode(e):NodeFilter.FILTER_ACCEPT,f;if(h===NodeFilter.FILTER_ACCEPT&&e.nodeType===Node.ELEMENT_NODE){b.push();f=b.getQName(e);var c,n=e.attributes,k,q,g,p="",r;c="<"+f;k=n.length;for(q=0;q<k;q+=1)g=n.item(q),"http://www.w3.org/2000/xmlns/"!==
g.namespaceURI&&(r=d.filter?d.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,r===NodeFilter.FILTER_ACCEPT&&(r=b.getQName(g),g="string"===typeof g.value?m(g.value):g.value,p+=" "+(r+'="'+g+'"')));k=b.getLocalNamespaceDefinitions();for(q in k)k.hasOwnProperty(q)&&((n=k[q])?"xmlns"!==n&&(c+=" xmlns:"+k[q]+'="'+q+'"'):c+=' xmlns="'+q+'"');a+=c+(p+">")}if(h===NodeFilter.FILTER_ACCEPT||h===NodeFilter.FILTER_SKIP){for(h=e.firstChild;h;)a+=l(b,h),h=h.nextSibling;e.nodeValue&&(a+=m(e.nodeValue))}f&&(a+="</"+
f+">",b.pop());return a}var d=this;this.filter=null;this.writeToString=function(b,d){if(!b)return"";var a=new n(d);return l(a,b)}};
// Input 21
xmldom.RelaxNGParser=function(){function n(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function m(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return m({name:a.name,e:[b].concat(a.e.slice(2))})}function l(a){a=a.split(":",2);var b="",d;1===a.length?a=["",a[0]]:b=a[0];for(d in h)h[d]===b&&(a[0]=d);return a}function d(a,b){for(var k=0,f,g,e=a.name;a.e&&k<a.e.length;)if(f=
a.e[k],"ref"===f.name){g=b[f.a.name];if(!g)throw f.a.name+" was not defined.";f=a.e.slice(k+1);a.e=a.e.slice(0,k);a.e=a.e.concat(g.e);a.e=a.e.concat(f)}else k+=1,d(f,b);f=a.e;"choice"!==e||f&&f[1]&&"empty"!==f[1].name||(f&&f[0]&&"empty"!==f[0].name?(f[1]=f[0],f[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===e||"interleave"===e)"empty"===f[0].name?"empty"===f[1].name?(delete a.e,a.name="empty"):(e=a.name=f[1].name,a.names=f[1].names,f=a.e=f[1].e):"empty"===f[1].name&&(e=a.name=f[0].name,
a.names=f[0].names,f=a.e=f[0].e);"oneOrMore"===e&&"empty"===f[0].name&&(delete a.e,a.name="empty");if("attribute"===e){g=a.names?a.names.length:0;for(var h,n=[],u=[],k=0;k<g;k+=1)h=l(a.names[k]),u[k]=h[0],n[k]=h[1];a.localnames=n;a.namespaces=u}"interleave"===e&&("interleave"===f[0].name?a.e="interleave"===f[1].name?f[0].e.concat(f[1].e):[f[1]].concat(f[0].e):"interleave"===f[1].name&&(a.e=[f[0]].concat(f[1].e)))}function b(a,d){for(var k=0,f;a.e&&k<a.e.length;)f=a.e[k],"elementref"===f.name?(f.id=
f.id||0,a.e[k]=d[f.id]):"element"!==f.name&&b(f,d),k+=1}var e=this,a,h={"http://www.w3.org/XML/1998/namespace":"xml"},f;f=function(a,b,d){var e=[],g,p,r=a.localName,n=[];g=a.attributes;var u=r,A=n,y={},s,v;for(s=0;s<g.length;s+=1)if(v=g.item(s),v.namespaceURI)"http://www.w3.org/2000/xmlns/"===v.namespaceURI&&(h[v.value]=v.localName);else{"name"!==v.localName||"element"!==u&&"attribute"!==u||A.push(v.value);if("name"===v.localName||"combine"===v.localName||"type"===v.localName){var x=v,F;F=v.value;
F=F.replace(/^\s\s*/,"");for(var E=/\s/,O=F.length-1;E.test(F.charAt(O));)O-=1;F=F.slice(0,O+1);x.value=F}y[v.localName]=v.value}g=y;g.combine=g.combine||void 0;a=a.firstChild;u=e;A=n;for(y="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(s=f(a,b,u))"name"===s.name?A.push(h[s.a.ns]+":"+s.text):"choice"===s.name&&(s.names&&s.names.length)&&(A=A.concat(s.names),delete s.names),u.push(s)}else a.nodeType===Node.TEXT_NODE&&(y+=a.nodeValue);a=a.nextSibling}a=
y;"value"!==r&&"param"!==r&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===r&&void 0===g.type&&(g.type="token",g.datatypeLibrary="");"attribute"!==r&&"element"!==r||void 0===g.name||(p=l(g.name),e=[{name:"name",text:p[1],a:{ns:p[0]}}].concat(e),delete g.name);"name"===r||"nsName"===r||"value"===r?void 0===g.ns&&(g.ns=""):delete g.ns;"name"===r&&(p=l(a),g.ns=p[0],a=p[1]);1<e.length&&("define"===r||"oneOrMore"===r||"zeroOrMore"===r||"optional"===r||"list"===r||"mixed"===r)&&(e=[{name:"group",e:m({name:"group",
e:e}).e}]);2<e.length&&"element"===r&&(e=[e[0]].concat({name:"group",e:m({name:"group",e:e.slice(1)}).e}));1===e.length&&"attribute"===r&&e.push({name:"text",text:a});1!==e.length||"choice"!==r&&"group"!==r&&"interleave"!==r?2<e.length&&("choice"===r||"group"===r||"interleave"===r)&&(e=m({name:r,e:e}).e):(r=e[0].name,n=e[0].names,g=e[0].a,a=e[0].text,e=e[0].e);"mixed"===r&&(r="interleave",e=[e[0],{name:"text"}]);"optional"===r&&(r="choice",e=[e[0],{name:"empty"}]);"zeroOrMore"===r&&(r="choice",e=
[{name:"oneOrMore",e:[e[0]]},{name:"empty"}]);if("define"===r&&g.combine){a:{u=g.combine;A=g.name;y=e;for(s=0;d&&s<d.length;s+=1)if(v=d[s],"define"===v.name&&v.a&&v.a.name===A){v.e=[{name:u,e:v.e.concat(y)}];d=v;break a}d=null}if(d)return}d={name:r};e&&0<e.length&&(d.e=e);for(p in g)if(g.hasOwnProperty(p)){d.a=g;break}void 0!==a&&(d.text=a);n&&0<n.length&&(d.names=n);"element"===r&&(d.id=b.length,b.push(d),d={name:"elementref",id:d.id});return d};this.parseRelaxNGDOM=function(c,l){var k=[],q=f(c&&
c.documentElement,k,void 0),g,p,r={};for(g=0;g<q.e.length;g+=1)p=q.e[g],"define"===p.name?r[p.a.name]=p:"start"===p.name&&(a=p);if(!a)return[new n("No Relax NG start element was found.")];d(a,r);for(g in r)r.hasOwnProperty(g)&&d(r[g],r);for(g=0;g<k.length;g+=1)d(k[g],r);l&&(e.rootPattern=l(a.e[0],k));b(a,k);for(g=0;g<k.length;g+=1)b(k[g],k);e.start=a;e.elements=k;e.nsmap=h;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function n(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function m(a,b){return function(){var c={},d=0;return function(g){var f=g.hash||g.toString(),k;k=c[f];if(void 0!==k)return k;c[f]=k=b(g);k.hash=a+d.toString();d+=1;return k}}()}function l(a){return function(){var b={};return function(c){var d,g;g=b[c.localName];if(void 0===g)b[c.localName]=g={};else if(d=g[c.namespaceURI],void 0!==d)return d;return g[c.namespaceURI]=d=a(c)}}()}function d(a,
b,c){return function(){var d={},g=0;return function(f,k){var e=b&&b(f,k),h,p;if(void 0!==e)return e;e=f.hash||f.toString();h=k.hash||k.toString();p=d[e];if(void 0===p)d[e]=p={};else if(e=p[h],void 0!==e)return e;p[h]=e=c(f,k);e.hash=a+g.toString();g+=1;return e}}()}function b(a,c){"choice"===c.p1.type?b(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?b(a,c.p2):a[c.p2.hash]=c.p2}function e(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return s},startTagOpenDeriv:function(c){return a.contains(c)?
g(b,v):s},attDeriv:function(){return s},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return v}}}function h(a,b,d,g){if(b===s)return s;if(g>=d.length)return b;0===g&&(g=0);for(var f=d.item(g);f.namespaceURI===c;){g+=1;if(g>=d.length)return b;f=d.item(g)}return f=h(a,b.attDeriv(a,d.item(g)),d,g+1)}function f(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):f(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
f(a,b,c.e[1])}var c="http://www.w3.org/2000/xmlns/",t,k,q,g,p,r,w,u,A,y,s={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return s},startTagOpenDeriv:function(){return s},attDeriv:function(){return s},startTagCloseDeriv:function(){return s},endTagDeriv:function(){return s}},v={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return s},startTagOpenDeriv:function(){return s},attDeriv:function(){return s},startTagCloseDeriv:function(){return v},endTagDeriv:function(){return s}},
x={type:"text",nullable:!0,hash:"text",textDeriv:function(){return x},startTagOpenDeriv:function(){return s},attDeriv:function(){return s},startTagCloseDeriv:function(){return x},endTagDeriv:function(){return s}},F,E,O;t=d("choice",function(a,b){if(a===s)return b;if(b===s||a===b)return a},function(a,c){var d={},g;b(d,{p1:a,p2:c});c=a=void 0;for(g in d)d.hasOwnProperty(g)&&(void 0===a?a=d[g]:c=void 0===c?d[g]:t(c,d[g]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,d){return t(a.textDeriv(c,d),b.textDeriv(c,d))},startTagOpenDeriv:l(function(c){return t(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,d){return t(a.attDeriv(c,d),b.attDeriv(c,d))},startTagCloseDeriv:n(function(){return t(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:n(function(){return t(a.endTagDeriv(),b.endTagDeriv())})}}(a,c)});k=function(a,b,c){return function(){var d={},g=0;return function(f,k){var e=b&&b(f,k),h,p;if(void 0!==e)return e;
e=f.hash||f.toString();h=k.hash||k.toString();e<h&&(p=e,e=h,h=p,p=f,f=k,k=p);p=d[e];if(void 0===p)d[e]=p={};else if(e=p[h],void 0!==e)return e;p[h]=e=c(f,k);e.hash=a+g.toString();g+=1;return e}}()}("interleave",function(a,b){if(a===s||b===s)return s;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){return t(k(a.textDeriv(c,d),b),k(a,b.textDeriv(c,d)))},startTagOpenDeriv:l(function(c){return t(F(function(a){return k(a,
b)},a.startTagOpenDeriv(c)),F(function(b){return k(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,d){return t(k(a.attDeriv(c,d),b),k(a,b.attDeriv(c,d)))},startTagCloseDeriv:n(function(){return k(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});q=d("group",function(a,b){if(a===s||b===s)return s;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){var g=q(a.textDeriv(c,d),b);return a.nullable?t(g,b.textDeriv(c,
d)):g},startTagOpenDeriv:function(c){var d=F(function(a){return q(a,b)},a.startTagOpenDeriv(c));return a.nullable?t(d,b.startTagOpenDeriv(c)):d},attDeriv:function(c,d){return t(q(a.attDeriv(c,d),b),q(a,b.attDeriv(c,d)))},startTagCloseDeriv:n(function(){return q(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});g=d("after",function(a,b){if(a===s||b===s)return s},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,d){return g(a.textDeriv(c,d),b)},startTagOpenDeriv:l(function(c){return F(function(a){return g(a,
b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,d){return g(a.attDeriv(c,d),b)},startTagCloseDeriv:n(function(){return g(a.startTagCloseDeriv(),b)}),endTagDeriv:n(function(){return a.nullable?b:s})}});p=m("oneormore",function(a){return a===s?s:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return q(a.textDeriv(b,c),t(this,v))},startTagOpenDeriv:function(b){var c=this;return F(function(a){return q(a,t(c,v))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return q(a.attDeriv(b,
c),t(this,v))},startTagCloseDeriv:n(function(){return p(a.startTagCloseDeriv())})}});w=d("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,d){return a.contains(d)&&(b.nullable&&/^\s+$/.test(d.nodeValue)||b.textDeriv(c,d.nodeValue).nullable)?v:s},startTagCloseDeriv:function(){return s}}});r=m("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?v:s},attDeriv:function(){return s},startTagCloseDeriv:function(){return this}}});
A=m("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return v},attDeriv:function(){return s},startTagCloseDeriv:function(){return this}}});F=function P(a,b){return"after"===b.type?g(b.p1,a(b.p2)):"choice"===b.type?t(P(a,b.p1),P(a,b.p2)):b};E=function(a,b,c){var d=c.currentNode;b=b.startTagOpenDeriv(d);b=h(a,b,d.attributes,0);var g=b=b.startTagCloseDeriv(),d=c.currentNode;b=c.firstChild();for(var f=[],k;b;)b.nodeType===Node.ELEMENT_NODE?f.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||f.push(b.nodeValue),b=c.nextSibling();0===f.length&&(f=[""]);k=g;for(g=0;k!==s&&g<f.length;g+=1)b=f[g],"string"===typeof b?k=/^\s*$/.test(b)?t(k,k.textDeriv(a,b)):k.textDeriv(a,b):(c.currentNode=b,k=E(a,k,c));c.currentNode=d;return b=k.endTagDeriv()};u=function(a){var b,c,d;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];f(b,c,a);a="";for(d=0;d<b.length;d+=
1)a+="{"+c[d]+"}"+b[d]+",";a={hash:a,contains:function(a){var d;for(d=0;d<b.length;d+=1)if(b[d]===a.localName&&c[d]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};y=function C(b,c){var d,g;if("elementref"===b.name){d=b.id||0;b=c[d];if(void 0!==b.name){var f=b;d=c[f.id]={hash:"element"+f.id.toString()};f=e(u(f.e[0]),y(f.e[1],c));for(g in f)f.hasOwnProperty(g)&&(d[g]=f[g]);return d}return b}switch(b.name){case "empty":return v;case "notAllowed":return s;
case "text":return x;case "choice":return t(C(b.e[0],c),C(b.e[1],c));case "interleave":d=C(b.e[0],c);for(g=1;g<b.e.length;g+=1)d=k(d,C(b.e[g],c));return d;case "group":return q(C(b.e[0],c),C(b.e[1],c));case "oneOrMore":return p(C(b.e[0],c));case "attribute":return w(u(b.e[0]),C(b.e[1],c));case "value":return r(b.text);case "data":return d=b.a&&b.a.type,void 0===d&&(d=""),A(d);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var c={},d;for(d in b)b.hasOwnProperty(d)&&
(c[d]=b[d]);return d=y(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=E(null,O,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){O=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function n(a,b){this.message=function(){b&&(a+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function m(a,d,f,c){return"empty"===a.name?null:b(a,d,f,c)}function l(a,b){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var d=b.currentNode,c=d?d.nodeType:0,l=null;c>Node.ELEMENT_NODE;){if(c!==Node.COMMENT_NODE&&(c!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new n("Not allowed node of type "+
c+".")];c=(d=b.nextSibling())?d.nodeType:0}if(!d)return[new n("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(e[d.namespaceURI]+":"+d.localName))return[new n("Found "+d.nodeName+" instead of "+a.names+".",d)];if(b.firstChild()){for(l=m(a.e[1],b,d);b.nextSibling();)if(c=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||c===Node.COMMENT_NODE))return[new n("Spurious content.",b.currentNode)];if(b.parentNode()!==d)return[new n("Implementation error.")]}else l=
m(a.e[1],b,d);b.nextSibling();return l}var d,b,e;b=function(a,d,f,c){var e=a.name,k=null;if("text"===e)a:{for(var q=(a=d.currentNode)?a.nodeType:0;a!==f&&3!==q;){if(1===q){k=[new n("Element not allowed here.",a)];break a}q=(a=d.nextSibling())?a.nodeType:0}d.nextSibling();k=null}else if("data"===e)k=null;else if("value"===e)c!==a.text&&(k=[new n("Wrong value, should be '"+a.text+"', not '"+c+"'",f)]);else if("list"===e)k=null;else if("attribute"===e)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;e=a.localnames.length;for(k=0;k<e;k+=1){c=f.getAttributeNS(a.namespaces[k],a.localnames[k]);""!==c||f.hasAttributeNS(a.namespaces[k],a.localnames[k])||(c=void 0);if(void 0!==q&&void 0!==c){k=[new n("Attribute defined too often.",f)];break a}q=c}k=void 0===q?[new n("Attribute not found: "+a.names,f)]:m(a.e[1],d,f,q)}else if("element"===e)k=l(a,d);else if("oneOrMore"===e){c=0;do q=d.currentNode,e=b(a.e[0],d,f),c+=1;while(!e&&q!==d.currentNode);1<c?(d.currentNode=q,k=null):k=e}else if("choice"===
e){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;q=d.currentNode;if("empty"===a.e[0].name){if(e=b(a.e[1],d,f,c))d.currentNode=q;k=null}else{if(e=m(a.e[0],d,f,c))d.currentNode=q,e=b(a.e[1],d,f,c);k=e}}else if("group"===e){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;k=b(a.e[0],d,f)||b(a.e[1],d,f)}else if("interleave"===e)a:{q=a.e.length;c=[q];for(var g=q,p,r,w,u;0<g;){p=0;r=d.currentNode;for(k=0;k<q;k+=1)w=d.currentNode,!0!==c[k]&&c[k]!==w&&(u=a.e[k],(e=
b(u,d,f))?(d.currentNode=w,void 0===c[k]&&(c[k]=!1)):w===d.currentNode||"oneOrMore"===u.name||"choice"===u.name&&("oneOrMore"===u.e[0].name||"oneOrMore"===u.e[1].name)?(p+=1,c[k]=w):(p+=1,c[k]=!0));if(r===d.currentNode&&p===g){k=null;break a}if(0===p){for(k=0;k<q;k+=1)if(!1===c[k]){k=[new n("Interleave does not match.",f)];break a}k=null;break a}for(k=g=0;k<q;k+=1)!0!==c[k]&&(g+=1)}k=null}else throw e+" not allowed in nonEmptyPattern.";return k};this.validate=function(a,b){a.currentNode=a.root;var f=
m(d.e[0],a,a.root);b(f)};this.init=function(a,b){d=a;e=b}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function n(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function m(a){for(var b=[],c=0,d=a.length,f;c<d;){var e=a,h=d,l=b,m="",s=[],v=e.indexOf("[",c),x=e.indexOf("/",c),F=e.indexOf("=",c);n(x,v,F)?(m=e.substring(c,x),c=x+1):n(v,x,F)?(m=e.substring(c,v),c=t(e,v,s)):n(F,x,v)?(m=e.substring(c,F),c=F):(m=e.substring(c,h),c=h);l.push({location:m,predicates:s});if(c<d&&"="===a[c]){f=a.substring(c+1,d);if(2<f.length&&("'"===f[0]||'"'===f[0]))f=f.slice(1,f.length-1);else try{f=
parseInt(f,10)}catch(E){}c=d}}return{steps:b,value:f}}function l(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function d(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function b(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function e(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function a(a,b,c){b=b.split(":",2);var d=c(b[0]),f=b[1];return new e(a,function(a){return a.localName===f&&a.namespaceURI===d})}function h(a,b,d){var f=new l,h=c(f,b,d),n=b.value;return void 0===n?new e(a,function(a){f.setNode(a);
h.reset();return h.next()}):new e(a,function(a){f.setNode(a);h.reset();return(a=h.next())&&a.nodeValue===n})}function f(a,b,d){var f=a.ownerDocument,e=[],h=null;if(f&&f.evaluate)for(d=f.evaluate(b,a,d,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),h=d.iterateNext();null!==h;)h.nodeType===Node.ELEMENT_NODE&&e.push(h),h=d.iterateNext();else{e=new l;e.setNode(a);a=m(b);e=c(e,a,d);a=[];for(d=e.next();d;)a.push(d),d=e.next();e=a}return e}var c,t;t=function(a,b,c){for(var d=b,f=a.length,e=0;d<f;)"]"===
a[d]?(e-=1,0>=e&&c.push(m(a.substring(b,d)))):"["===a[d]&&(0>=e&&(b=d+1),e+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};c=function(c,f,e){var p,r,l,n;for(p=0;p<f.steps.length;p+=1)for(l=f.steps[p],r=l.location,""===r?c=new b(c,!1):"@"===r[0]?(n=r.slice(1).split(":",2),c=new d(c,e(n[0]),n[1])):"."!==r&&(c=new b(c,!1),-1!==r.indexOf(":")&&(c=a(c,r,e))),r=0;r<l.predicates.length;r+=1)n=l.predicates[r],c=h(c,n,e);return c};xmldom.XPath=
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
gui.AnnotationViewManager=function(n,m,l){function d(a){var b=a.node,d=a.end;a=f.createRange();d&&(a.setStart(b,b.childNodes.length),a.setEnd(d,0),d=c.getTextNodes(a,!1),d.forEach(function(a){var c=f.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function b(a){var b=n.getSizer();a?(l.style.display="inline-block",b.style.paddingRight=t.getComputedStyle(l).width):
(l.style.display="none",b.style.paddingRight=0);n.refreshSize()}function e(){h.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function a(){var a;for(a=0;a<h.length;a+=1){var b=h[a],c=b.node.parentNode,d=c.nextSibling,e=d.nextSibling,m=c.parentNode,u=0,A=h[h.indexOf(b)-1],y=void 0,b=b.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],u=void 0,u=n.getZoomLevel();c.style.left=(l.getBoundingClientRect().left-m.getBoundingClientRect().left)/
u+"px";c.style.width=l.getBoundingClientRect().width/u+"px";d.style.width=parseFloat(c.style.left)-30+"px";A&&(y=A.node.parentNode.getBoundingClientRect(),20>=(m.getBoundingClientRect().top-y.bottom)/u?c.style.top=Math.abs(m.getBoundingClientRect().top-y.bottom)/u+20+"px":c.style.top="0px");e.style.left=d.getBoundingClientRect().width/u+"px";var d=e.style,m=e.getBoundingClientRect().left/u,A=e.getBoundingClientRect().top/u,y=c.getBoundingClientRect().left/u,s=c.getBoundingClientRect().top/u,v=0,x=
0,v=y-m,v=v*v,x=s-A,x=x*x,m=Math.sqrt(v+x);d.width=m+"px";u=Math.asin((c.getBoundingClientRect().top-e.getBoundingClientRect().top)/(u*parseFloat(e.style.width)));e.style.transform="rotate("+u+"rad)";e.style.MozTransform="rotate("+u+"rad)";e.style.WebkitTransform="rotate("+u+"rad)";e.style.msTransform="rotate("+u+"rad)";b&&(u=t.getComputedStyle(b,":before").content)&&"none"!==u&&(u=u.substring(1,u.length-1),b.firstChild?b.firstChild.nodeValue=u:b.appendChild(f.createTextNode(u)))}}var h=[],f=m.ownerDocument,
c=new odf.OdfUtils,t=runtime.getWindow();runtime.assert(Boolean(t),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=a;this.addAnnotation=function(c){b(!0);h.push({node:c.node,end:c.end});e();var l=f.createElement("div"),g=f.createElement("div"),p=f.createElement("div"),r=f.createElement("div"),n=f.createElement("div"),u=c.node;l.className="annotationWrapper";u.parentNode.insertBefore(l,u);g.className="annotationNote";g.appendChild(u);n.className=
"annotationRemoveButton";g.appendChild(n);p.className="annotationConnector horizontal";r.className="annotationConnector angular";l.appendChild(g);l.appendChild(p);l.appendChild(r);c.end&&d(c);a()};this.forgetAnnotations=function(){for(;h.length;){var a=h[0],c=h.indexOf(a),d=a.node,e=d.parentNode.parentNode;"div"===e.localName&&(e.parentNode.insertBefore(d,e),e.parentNode.removeChild(e));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=f.querySelectorAll('span.annotationHighlight[annotation="'+
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
odf.OdfNodeFilter=function(){this.acceptNode=function(n){return"http://www.w3.org/1999/xhtml"===n.namespaceURI?NodeFilter.FILTER_SKIP:n.namespaceURI&&n.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
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
odf.Namespaces=function(){function n(d){return m[d]||null}var m={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",dc:"http://purl.org/dc/elements/1.1/",webodf:"urn:webodf"},l;n.lookupNamespaceURI=n;l=function(){};l.forEachPrefix=function(d){for(var b in m)m.hasOwnProperty(b)&&d(b,m[b])};l.resolvePrefix=n;l.namespaceMap=m;l.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";l.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
l.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";l.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";l.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";l.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";l.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";l.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";l.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";l.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
l.xlinkns="http://www.w3.org/1999/xlink";l.xmlns="http://www.w3.org/XML/1998/namespace";l.dcns="http://purl.org/dc/elements/1.1/";l.webodfns="urn:webodf";return l}();
// Input 28
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function n(a,b){for(var c=q[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,f,c=0;c<e;c+=1)(f=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,b+f);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,n(d,b)),c=c.nextSibling}function m(a,b){for(var c=q[a.localName],d=c&&c[a.namespaceURI],e=d?d.length:0,f,c=0;c<e;c+=1)if(f=a.getAttributeNS(d[c].ns,d[c].localname))f=f.replace(b,""),a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,
f);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,m(d,b)),c=c.nextSibling}function l(a,b){var c=q[a.localName],d=(c=c&&c[a.namespaceURI])?c.length:0,e,f,g;for(g=0;g<d;g+=1)if(e=a.getAttributeNS(c[g].ns,c[g].localname))b=b||{},f=c[g].keyname,f=b[f]=b[f]||{},f[e]=1;return b}function d(a,b){var c,e;l(a,b);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(e=c,d(e,b)),c=c.nextSibling}function b(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function e(a,c,d){var e=a+'"'+
c,f=d[e];f||(f=d[e]=new b(e,a,c));return f}function a(b,d,f){var g=q[b.localName],k=(g=g&&g[b.namespaceURI])?g.length:0,h=b.getAttributeNS(c,"name"),l=b.getAttributeNS(c,"family"),n;h&&l&&(d=e(h,l,f));if(d)for(h=0;h<k;h+=1)if(l=b.getAttributeNS(g[h].ns,g[h].localname))n=g[h].keyname,l=e(l,n,f),d.requires[l.key]=l;for(h=b.firstChild;h;)h.nodeType===Node.ELEMENT_NODE&&(b=h,a(b,d,f)),h=h.nextSibling;return f}function h(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){h(a.requires[c],
b)})}function f(b,c){var d=a(b,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&h(a,c)})}var c="urn:oasis:names:tc:opendocument:xmlns:style:1.0",t={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:","urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},k={text:[{ens:c,
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
a:"page-layout-name"}]},q,g=new xmldom.XPath;this.UsedStyleList=function(a,b){var e={};this.uses=function(a){var b=a.localName,d=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(c,"name");a="style"===b?a.getAttributeNS(c,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":b;return(a=e[a])?0<a[d]:!1};d(a,e);b&&f(b,e)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),e=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,
"family");return g.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,d){var e;if(a){for(e=a.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE){var f=e,g=b,k=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),h=void 0;k?h="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(k=f.getAttributeNS(c,"name"))&&(h=c);h&&f.setAttributeNS(h,t[h]+"name",g+k)}e=e.nextSibling}n(a,b);d&&n(d,
b)}};this.removePrefixFromStyleNames=function(a,b,d){var e=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var f=b,g=e,k=f.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),h=void 0;k?h="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(k=f.getAttributeNS(c,"name"))&&(h=c);h&&(k=k.replace(g,""),f.setAttributeNS(h,t[h]+"name",k))}b=b.nextSibling}m(a,e);d&&m(d,e)}};this.determineStylesForNode=l;q=function(a){var b,c,d,e,f,g={},k;for(b in a)if(a.hasOwnProperty(b))for(e=
a[b],d=e.length,c=0;c<d;c+=1)f=e[c],k=g[f.en]=g[f.en]||{},k=k[f.ens]=k[f.ens]||[],k.push({ns:f.ans,localname:f.a,keyname:b});return g}(k)};
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
odf.OdfUtils=function(){function n(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===w}function m(a){for(;a&&!n(a);)a=a.parentNode;return a}function l(a){return/^[ \t\r\n]+$/.test(a)}function d(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===w||"span"===b&&"annotationHighlight"===a.className?!0:!1}function b(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===w?d="s"===b||"tab"===b||"line-break"===b:c===u&&(d="frame"===b&&"as-char"===a.getAttributeNS(w,
"anchor-type")));return d}function e(a){for(;null!==a.firstChild&&d(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&d(a);)a=a.lastChild;return a}function h(b){for(;!n(b)&&null===b.previousSibling;)b=b.parentNode;return n(b)?null:a(b.previousSibling)}function f(a){for(;!n(a)&&null===a.nextSibling;)a=a.parentNode;return n(a)?null:e(a.nextSibling)}function c(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=h(a);else return!l(a.data.substr(a.length-1,1));else b(a)?
(c=!0,a=null):a=h(a);return c}function t(a){var c=!1;for(a=a&&e(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!l(a.data)){c=!0;break}if(b(a)){c=!0;break}a=f(a)}return c}function k(a,b){return l(a.data.substr(b))?!t(f(a)):!1}function q(a,d){var e=a.data,f;if(!l(e[d])||b(a.parentNode))return!1;0<d?l(e[d-1])||(f=!0):c(h(a))&&(f=!0);return!0===f?k(a,d)?!1:!0:!1}function g(a){return(a=/-?([0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function p(a){return(a=g(a))&&"%"!==a.unit?null:a}function r(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var w=
"urn:oasis:names:tc:opendocument:xmlns:text:1.0",u="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",A=/^\s*$/,y=new core.DomUtils;this.isParagraph=n;this.getParagraphElement=m;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===w&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===w};this.isODFWhitespace=l;this.isGroupingElement=d;this.isCharacterElement=b;this.firstChild=
e;this.lastChild=a;this.previousNode=h;this.nextNode=f;this.scanLeftForNonWhitespace=c;this.lookLeftForCharacter=function(a){var d;d=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(d=a.data,d=l(d.substr(d.length-1,1))?1===d.length?c(h(a))?2:0:l(d.substr(d.length-2,1))?0:2:1):b(a)&&(d=1);return d};this.lookRightForCharacter=function(a){var c=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?c=!l(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(c){var d=!1;for(c=c&&a(c);c;){if(c.nodeType===
Node.TEXT_NODE&&0<c.length&&!l(c.data)){d=!0;break}if(b(c)){d=!0;break}c=h(c)}return d};this.scanRightForAnyCharacter=t;this.isTrailingWhitespace=k;this.isSignificantWhitespace=q;this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&A.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=g;this.parseFoFontSize=function(a){var b;b=(b=g(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||p(a)};this.parseFoLineHeight=function(a){var b;b=(b=g(a))&&(0>b.value||
"%"===b.unit)?null:b;return b||p(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,c=[];for(b.nodeType===Node.ELEMENT_NODE&&(c=y.getElementsByTagNameNS(b,w,"p").concat(y.getElementsByTagNameNS(b,w,"h")));b&&!n(b);)b=b.parentNode;b&&c.push(b);return c.filter(function(b){return y.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),d;d=y.getNodesInRange(a,function(d){c.selectNodeContents(d);if(d.nodeType===Node.TEXT_NODE){if(b&&
y.rangesIntersect(a,c)||y.containsRange(a,c))return Boolean(m(d)&&(!l(d.textContent)||q(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(y.rangesIntersect(a,c)&&r(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return d};this.getTextElements=function(a,c){var e=a.startContainer.ownerDocument.createRange(),f;f=y.getNodesInRange(a,function(f){var g=f.nodeType;e.selectNodeContents(f);if(g===Node.TEXT_NODE){if(y.containsRange(a,e)&&(c||Boolean(m(f)&&(!l(f.textContent)||
q(f,0)))))return NodeFilter.FILTER_ACCEPT}else if(b(f)){if(y.containsRange(a,e))return NodeFilter.FILTER_ACCEPT}else if(r(f)||d(f))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});e.detach();return f};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),c;c=y.getNodesInRange(a,function(c){b.selectNodeContents(c);if(n(c)){if(y.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(r(c)||d(c))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});
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
odf.TextSerializer=function(){function n(d){var b="",e=m.filter?m.filter.acceptNode(d):NodeFilter.FILTER_ACCEPT,a=d.nodeType,h;if(e===NodeFilter.FILTER_ACCEPT||e===NodeFilter.FILTER_SKIP)for(h=d.firstChild;h;)b+=n(h),h=h.nextSibling;e===NodeFilter.FILTER_ACCEPT&&(a===Node.ELEMENT_NODE&&l.isParagraph(d)?b+="\n":a===Node.TEXT_NODE&&d.textContent&&(b+=d.textContent));return b}var m=this,l=new odf.OdfUtils;this.filter=null;this.writeToString=function(d){return d?n(d):""}};
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
odf.TextStyleApplicator=function(n,m,l){function d(a){function b(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(d){return b(a[d],c[d])}):a===c}this.isStyleApplied=function(d){d=m.getAppliedStylesForElement(d);return b(a,d)}}function b(b){var d={};this.applyStyleToContainer=function(e){var q;q=e.getAttributeNS(a,"style-name");var g=e.ownerDocument;q=q||"";if(!d.hasOwnProperty(q)){var p=q,r=q,w;r?(w=m.getStyleElement(r,"text"),w.parentNode===l?g=w.cloneNode(!0):(g=
g.createElementNS(h,"style:style"),g.setAttributeNS(h,"style:parent-style-name",r),g.setAttributeNS(h,"style:family","text"),g.setAttributeNS(f,"scope","document-content"))):(g=g.createElementNS(h,"style:style"),g.setAttributeNS(h,"style:family","text"),g.setAttributeNS(f,"scope","document-content"));m.updateStyle(g,b,n);l.appendChild(g);d[p]=g}q=d[q].getAttributeNS(h,"name");e.setAttributeNS(a,"text:style-name",q)}}var e=new core.DomUtils,a=odf.Namespaces.textns,h=odf.Namespaces.stylens,f="urn:webodf:names:scope";
this.applyStyle=function(c,f,k){var h={},g,l,n,m;runtime.assert(k&&k["style:text-properties"],"applyStyle without any text properties");h["style:text-properties"]=k["style:text-properties"];n=new b(h);m=new d(h);c.forEach(function(b){g=m.isStyleApplied(b);if(!1===g){var c=b.ownerDocument,d=b.parentNode,k,h=b,q=new core.LoopWatchDog(1E3);"span"===d.localName&&d.namespaceURI===a?(b.previousSibling&&!e.rangeContainsNode(f,b.previousSibling)?(c=d.cloneNode(!1),d.parentNode.insertBefore(c,d.nextSibling)):
c=d,k=!0):(c=c.createElementNS(a,"text:span"),d.insertBefore(c,b),k=!1);for(;h&&(h===b||e.rangeContainsNode(f,h));)q.check(),d=h.nextSibling,h.parentNode!==c&&c.appendChild(h),h=d;if(h&&k)for(b=c.cloneNode(!1),c.parentNode.insertBefore(b,c.nextSibling);h;)q.check(),d=h.nextSibling,b.appendChild(h),h=d;l=c;n.applyStyleToContainer(l)}})}};
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
odf.Style2CSS=function(){function n(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==p||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===u&&"list-style"===a.localName?"list":a.namespaceURI!==p||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(p,"family"))(c=a.getAttributeNS&&a.getAttributeNS(p,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function m(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=m(a[c].derivedStyles,b)))return d;return null}function l(a,b,c){var d=b[a],e,f;d&&(e=d.getAttributeNS(p,"parent-style-name"),f=null,e&&(f=m(c,e),!f&&b[e]&&(l(e,b,c),f=b[e],b[e]=null)),f?(f.derivedStyles||(f.derivedStyles={}),f.derivedStyles[a]=d):c[a]=d)}function d(a,b){for(var c in a)a.hasOwnProperty(c)&&(l(c,a,b),a[c]=null)}function b(a,b){var c=s[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+v[a].join(d+","+c+"|")+d}function e(a,c,d){var f=[],g,k;f.push(b(a,c));for(g in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(g))for(k in c=e(a,g,d.derivedStyles[g]),c)c.hasOwnProperty(k)&&f.push(c[k]);return f}function a(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function h(a,b){var c="",d,e;for(d in b)if(b.hasOwnProperty(d)&&
(d=b[d],e=a.getAttributeNS(d[0],d[1]))){e=e.trim();if(da.hasOwnProperty(d[1])){var f=e.indexOf(" "),g=void 0,k=void 0;-1!==f?(g=e.substring(0,f),k=e.substring(f)):(g=e,k="");(g=ba.parseLength(g))&&("pt"===g.unit&&0.75>g.value)&&(e="0.75pt"+k)}d[2]&&(c+=d[2]+":"+e+";")}return c}function f(b){return(b=a(b,p,"text-properties"))?ba.parseFoFontSize(b.getAttributeNS(g,"font-size")):null}function c(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?
{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function t(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var e=c.getAttributeNS(u,"level"),f;c=ba.getFirstNonWhitespaceChild(c);c=ba.getFirstNonWhitespaceChild(c);var g;c&&(f=c.attributes,g=f["fo:text-indent"]?f["fo:text-indent"].value:void 0,f=f["fo:margin-left"]?f["fo:margin-left"].value:void 0);g||(g="-0.6cm");c="-"===g.charAt(0)?g.substring(1):"-"+g;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";
void 0!==f&&(f=e+"{margin-left:"+f+";}",a.insertRule(f,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+d+";";d+="counter-increment:list;";d+="margin-left:"+g+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(k){throw k;}}function k(b,d,l,n){if("list"===d)for(var r=n.firstChild,m,s;r;){if(r.namespaceURI===u)if(m=r,"list-level-style-number"===r.localName){var v=m;s=v.getAttributeNS(p,"num-format");var L=v.getAttributeNS(p,
"num-suffix"),G={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},v=v.getAttributeNS(p,"num-prefix")||"",v=G.hasOwnProperty(s)?v+(" counter(list, "+G[s]+")"):s?v+("'"+s+"';"):v+" ''";L&&(v+=" '"+L+"'");s="content: "+v+";";t(b,l,m,s)}else"list-level-style-image"===r.localName?(s="content: none;",t(b,l,m,s)):"list-level-style-bullet"===r.localName&&(s="content: '"+m.getAttributeNS(u,"bullet-char")+"';",t(b,l,m,s));r=r.nextSibling}else if("page"===d)if(L=m=l="",r=n.getElementsByTagNameNS(p,
"page-layout-properties")[0],m=r.parentNode.parentNode.parentNode.masterStyles,L="",l+=h(r,M),s=r.getElementsByTagNameNS(p,"background-image"),0<s.length&&(L=s.item(0).getAttributeNS(A,"href"))&&(l+="background-image: url('odfkit:"+L+"');",s=s.item(0),l+=h(s,F)),"presentation"===ea){if(m)for(s=m.getElementsByTagNameNS(p,"master-page"),G=0;G<s.length;G+=1)if(s[G].getAttributeNS(p,"page-layout-name")===r.parentNode.getAttributeNS(p,"name")){L=s[G].getAttributeNS(p,"name");m="draw|page[draw|master-page-name="+
L+"] {"+l+"}";L="office|body, draw|page[draw|master-page-name="+L+"] {"+h(r,ca)+" }";try{b.insertRule(m,b.cssRules.length),b.insertRule(L,b.cssRules.length)}catch(ia){throw ia;}}}else{if("text"===ea){m="office|text {"+l+"}";L="office|body {width: "+r.getAttributeNS(g,"page-width")+";}";try{b.insertRule(m,b.cssRules.length),b.insertRule(L,b.cssRules.length)}catch(da){throw da;}}}else{l=e(d,l,n).join(",");r="";if(m=a(n,p,"text-properties")){var G=m,V;s=V="";L=1;m=""+h(G,x);v=G.getAttributeNS(p,"text-underline-style");
"solid"===v&&(V+=" underline");v=G.getAttributeNS(p,"text-line-through-style");"solid"===v&&(V+=" line-through");V.length&&(m+="text-decoration:"+V+";");if(V=G.getAttributeNS(p,"font-name")||G.getAttributeNS(g,"font-family"))v=aa[V],m+="font-family: "+(v||V)+", sans-serif;";v=G.parentNode;if(G=f(v)){for(;v;){if(G=f(v)){if("%"!==G.unit){s="font-size: "+G.value*L+G.unit+";";break}L*=G.value/100}G=v;V=v="";v=null;"default-style"===G.localName?v=null:(v=G.getAttributeNS(p,"parent-style-name"),V=G.getAttributeNS(p,
"family"),v=U.getODFElementsWithXPath(Q,v?"//style:*[@style:name='"+v+"'][@style:family='"+V+"']":"//style:default-style[@style:family='"+V+"']",odf.Namespaces.resolvePrefix)[0])}s||(s="font-size: "+parseFloat(W)*L+N.getUnits(W)+";");m+=s}r+=m}if(m=a(n,p,"paragraph-properties"))s=m,m=""+h(s,E),L=s.getElementsByTagNameNS(p,"background-image"),0<L.length&&(G=L.item(0).getAttributeNS(A,"href"))&&(m+="background-image: url('odfkit:"+G+"');",L=L.item(0),m+=h(L,F)),(s=s.getAttributeNS(g,"line-height"))&&
"normal"!==s&&(s=ba.parseFoLineHeight(s),m="%"!==s.unit?m+("line-height: "+s.value+s.unit+";"):m+("line-height: "+s.value/100+";")),r+=m;if(m=a(n,p,"graphic-properties"))G=m,m=""+h(G,O),s=G.getAttributeNS(q,"opacity"),L=G.getAttributeNS(q,"fill"),G=G.getAttributeNS(q,"fill-color"),"solid"===L||"hatch"===L?G&&"none"!==G?(s=isNaN(parseFloat(s))?1:parseFloat(s)/100,(G=c(G))&&(m+="background-color: rgba("+G.r+","+G.g+","+G.b+","+s+");")):m+="background: none;":"none"===L&&(m+="background: none;"),r+=
m;if(m=a(n,p,"drawing-page-properties"))s=""+h(m,O),"true"===m.getAttributeNS(y,"background-visible")&&(s+="background: none;"),r+=s;if(m=a(n,p,"table-cell-properties"))m=""+h(m,z),r+=m;if(m=a(n,p,"table-row-properties"))m=""+h(m,C),r+=m;if(m=a(n,p,"table-column-properties"))m=""+h(m,P),r+=m;if(m=a(n,p,"table-properties"))s=m,m=""+h(s,K),s=s.getAttributeNS(w,"border-model"),"collapsing"===s?m+="border-collapse:collapse;":"separating"===s&&(m+="border-collapse:separate;"),r+=m;if(0!==r.length)try{b.insertRule(l+
"{"+r+"}",b.cssRules.length)}catch(T){throw T;}}for(var ha in n.derivedStyles)n.derivedStyles.hasOwnProperty(ha)&&k(b,d,ha,n.derivedStyles[ha])}var q=odf.Namespaces.drawns,g=odf.Namespaces.fons,p=odf.Namespaces.stylens,r=odf.Namespaces.svgns,w=odf.Namespaces.tablens,u=odf.Namespaces.textns,A=odf.Namespaces.xlinkns,y=odf.Namespaces.presentationns,s={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},v={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},x=[[g,"color","color"],[g,"background-color","background-color"],[g,"font-weight","font-weight"],[g,"font-style","font-style"]],F=[[p,"repeat",
"background-repeat"]],E=[[g,"background-color","background-color"],[g,"text-align","text-align"],[g,"text-indent","text-indent"],[g,"padding","padding"],[g,"padding-left","padding-left"],[g,"padding-right","padding-right"],[g,"padding-top","padding-top"],[g,"padding-bottom","padding-bottom"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"margin","margin"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],
[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"],[g,"border","border"]],O=[[g,"background-color","background-color"],[g,"min-height","min-height"],[q,"stroke","border"],[r,"stroke-color","border-color"],[r,"stroke-width","border-width"],[g,"border","border"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"]],z=[[g,"background-color","background-color"],[g,"border-left","border-left"],[g,"border-right",
"border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"border","border"]],P=[[p,"column-width","width"]],C=[[p,"row-height","height"],[g,"keep-together",null]],K=[[p,"width","width"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"]],M=[[g,"background-color","background-color"],[g,"padding","padding"],[g,"padding-left","padding-left"],[g,"padding-right","padding-right"],[g,"padding-top",
"padding-top"],[g,"padding-bottom","padding-bottom"],[g,"border","border"],[g,"border-left","border-left"],[g,"border-right","border-right"],[g,"border-top","border-top"],[g,"border-bottom","border-bottom"],[g,"margin","margin"],[g,"margin-left","margin-left"],[g,"margin-right","margin-right"],[g,"margin-top","margin-top"],[g,"margin-bottom","margin-bottom"]],ca=[[g,"page-width","width"],[g,"page-height","height"]],da={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},aa={},ba=new odf.OdfUtils,ea,Q,W,U=new xmldom.XPath,N=new core.CSSUnits;this.style2css=function(a,b,c,e,f){for(var g,h,l,m;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);g=null;e&&(g=e.ownerDocument,Q=e.parentNode);f&&(g=f.ownerDocument,Q=f.parentNode);if(g)for(m in odf.Namespaces.forEachPrefix(function(a,c){l="@namespace "+a+" url("+c+");";try{b.insertRule(l,b.cssRules.length)}catch(d){}}),aa=c,ea=a,W=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",a=n(e),e=n(f),f={},s)if(s.hasOwnProperty(m))for(h in c=f[m]={},d(a[m],c),d(e[m],c),c)c.hasOwnProperty(h)&&k(b,m,h,c[h])}};
// Input 33
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function n(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function m(a){var b,c=k.length;for(b=0;b<c;b+=1)if(a.namespaceURI===f&&a.localName===k[b])return b;return-1}function l(a,b){var c=new h.UsedStyleList(a,b),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var e=d.acceptNode(a);e===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&(e=c.uses(a)?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT);return e}}function d(a,b){var c=new l(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function b(a,b){if(b){var c=m(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=m(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}function e(a){this.OdfContainer=a}function a(a,
b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var h=new odf.StyleInfo,f="urn:oasis:names:tc:opendocument:xmlns:office:1.0",c="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
t="urn:webodf:names:scope",k="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),q=(new Date).getTime()+"_webodf_",g=new core.Base64;e.prototype=new function(){};e.prototype.constructor=e;e.namespaceURI=f;e.localName="document";a.prototype.load=function(){};a.prototype.getUrl=function(){return this.data?"data:;base64,"+g.toBase64(this.data):null};odf.OdfContainer=function r(g,k){function m(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?
m(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function y(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS(t,"scope",b),c=c.nextSibling}function s(a,b){var c=null,d,e,f;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(f=d.getAttributeNS(t,"scope"))&&f!==b&&c.removeChild(d),d=e;return c}function v(a){var b=I.rootElement.ownerDocument,c;if(a){m(a.documentElement);try{c=b.importNode(a.documentElement,
!0)}catch(d){}}return c}function x(a){I.state=a;if(I.onchange)I.onchange(I);if(I.onstatereadychange)I.onstatereadychange(I)}function F(a){$=null;I.rootElement=a;a.fontFaceDecls=n(a,f,"font-face-decls");a.styles=n(a,f,"styles");a.automaticStyles=n(a,f,"automatic-styles");a.masterStyles=n(a,f,"master-styles");a.body=n(a,f,"body");a.meta=n(a,f,"meta")}function E(a){a=v(a);var c=I.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===f?(c.fontFaceDecls=n(a,f,"font-face-decls"),b(c,c.fontFaceDecls),
c.styles=n(a,f,"styles"),b(c,c.styles),c.automaticStyles=n(a,f,"automatic-styles"),y(c.automaticStyles,"document-styles"),b(c,c.automaticStyles),c.masterStyles=n(a,f,"master-styles"),b(c,c.masterStyles),h.prefixStyleNames(c.automaticStyles,q,c.masterStyles)):x(r.INVALID)}function O(a){a=v(a);var c,d,e;if(a&&"document-content"===a.localName&&a.namespaceURI===f){c=I.rootElement;d=n(a,f,"font-face-decls");if(c.fontFaceDecls&&d)for(e=d.firstChild;e;)c.fontFaceDecls.appendChild(e),e=d.firstChild;else d&&
(c.fontFaceDecls=d,b(c,d));d=n(a,f,"automatic-styles");y(d,"document-content");if(c.automaticStyles&&d)for(e=d.firstChild;e;)c.automaticStyles.appendChild(e),e=d.firstChild;else d&&(c.automaticStyles=d,b(c,d));c.body=n(a,f,"body");b(c,c.body)}else x(r.INVALID)}function z(a){a=v(a);var c;a&&("document-meta"===a.localName&&a.namespaceURI===f)&&(c=I.rootElement,c.meta=n(a,f,"meta"),b(c,c.meta))}function P(a){a=v(a);var c;a&&("document-settings"===a.localName&&a.namespaceURI===f)&&(c=I.rootElement,c.settings=
n(a,f,"settings"),b(c,c.settings))}function C(a){a=v(a);var b;if(a&&"manifest"===a.localName&&a.namespaceURI===c)for(b=I.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===c)&&(R[a.getAttributeNS(c,"full-path")]=a.getAttributeNS(c,"media-type")),a=a.nextSibling}function K(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],S.loadAsDOM(c,function(b,c){d(c);b||I.state===r.INVALID||K(a)})):x(r.DONE)}function M(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function ca(){var a=new xmldom.LSSerializer,b=M("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(I.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function da(a,b){var d=document.createElementNS(c,"manifest:file-entry");d.setAttributeNS(c,"manifest:full-path",a);d.setAttributeNS(c,"manifest:media-type",b);return d}function aa(){var a=
runtime.parseXML('<manifest:manifest xmlns:manifest="'+c+'"></manifest:manifest>'),b=n(a,c,"manifest"),d=new xmldom.LSSerializer,e;for(e in R)R.hasOwnProperty(e)&&b.appendChild(da(e,R[e]));d.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+d.writeToString(a,odf.Namespaces.namespaceMap)}function ba(){var a=new xmldom.LSSerializer,b=M("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(I.rootElement.settings,odf.Namespaces.namespaceMap);
return b+"</office:document-settings>"}function ea(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=s(I.rootElement.automaticStyles,"document-styles"),d=I.rootElement.masterStyles&&I.rootElement.masterStyles.cloneNode(!0),e=M("document-styles");h.removePrefixFromStyleNames(c,q,d);b.filter=new l(d,c);e+=b.writeToString(I.rootElement.fontFaceDecls,a);e+=b.writeToString(I.rootElement.styles,a);e+=b.writeToString(c,a);e+=b.writeToString(d,a);return e+"</office:document-styles>"}function Q(){var a=
odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=s(I.rootElement.automaticStyles,"document-content"),e=M("document-content");b.filter=new d(I.rootElement.body,c);e+=b.writeToString(c,a);e+=b.writeToString(I.rootElement.body,a);return e+"</office:document-content>"}function W(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var d=v(c);d&&"document"===d.localName&&d.namespaceURI===f?(F(d),x(r.DONE)):x(r.INVALID)}})}function U(){function a(b,c){var e;c||(c=b);e=document.createElementNS(f,c);
d[b]=e;d.appendChild(e)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),d=I.rootElement,e=document.createElementNS(f,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");d.body.appendChild(e);x(r.DONE);return b}function N(){var a,b=new Date;a=runtime.byteArrayFromString(ba(),"utf8");
S.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(ca(),"utf8");S.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(ea(),"utf8");S.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(Q(),"utf8");S.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(aa(),"utf8");S.save("META-INF/manifest.xml",a,!0,b)}function D(a,b){N();S.writeAs(a,function(a){b(a)})}var I=this,S,R={},$;this.onstatereadychange=k;this.rootElement=this.state=this.onchange=null;this.setRootElement=F;this.getContentElement=
function(){var a;$||(a=I.rootElement.body,$=a.getElementsByTagNameNS(f,"text")[0]||a.getElementsByTagNameNS(f,"presentation")[0]||a.getElementsByTagNameNS(f,"spreadsheet")[0]);return $};this.getDocumentType=function(){var a=I.getContentElement();return a&&a.localName};this.getPart=function(b){return new a(b,R[b],I,S)};this.getPartData=function(a,b){S.load(a,b)};this.createByteArray=function(a,b){N();S.createByteArray(a,b)};this.saveAs=D;this.save=function(a){D(g,a)};this.getUrl=function(){return g};
this.state=r.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(e);S=g?new core.Zip(g,function(a,b){S=b;a?W(g,function(b){a&&(S.error=a+"\n"+b,x(r.INVALID))}):K([["styles.xml",E],["content.xml",O],["meta.xml",z],["settings.xml",P],["META-INF/manifest.xml",C]])}):U()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=
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
odf.FontLoader=function(){function n(d,b,e,a,h){var f,c=0,m;for(m in d)if(d.hasOwnProperty(m)){if(c===e){f=m;break}c+=1}f?b.getPartData(d[f].href,function(c,m){if(c)runtime.log(c);else{var g="@font-face { font-family: '"+(d[f].family||f)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+l.convertUTF8ArrayToBase64(m)+') format("truetype"); }';try{a.insertRule(g,a.cssRules.length)}catch(p){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(p)+"\nRule: "+g)}}n(d,b,e+1,a,h)}):
h&&h()}var m=new xmldom.XPath,l=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(d,b){for(var e=d.rootElement.fontFaceDecls;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);if(e){var a={},h,f,c,l;if(e)for(e=m.getODFElementsWithXPath(e,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),h=0;h<e.length;h+=1)f=e[h],c=f.getAttributeNS(odf.Namespaces.stylens,"name"),l=f.getAttributeNS(odf.Namespaces.svgns,"font-family"),f=m.getODFElementsWithXPath(f,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<f.length&&(f=f[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),a[c]={href:f,family:l});n(a,d,0,b)}}};return odf.FontLoader}();
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
odf.Formatting=function(){function n(a,b){Object.keys(b).forEach(function(c){try{a[c]=b[c].constructor===Object?n(a[c],b[c]):b[c]}catch(d){a[c]=b[c]}});return a}function m(a,b,d){var e,f;d=d||[c.rootElement.automaticStyles,c.rootElement.styles];for(e=d.shift();e;){for(e=e.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&(f=e.getAttributeNS(q,"name"),e.namespaceURI===q&&"style"===e.localName&&e.getAttributeNS(q,"family")===b&&f===a||"list-style"===b&&e.namespaceURI===g&&"list-style"===e.localName&&
f===a||"data"===b&&e.namespaceURI===p&&f===a))return e;e=e.nextSibling}e=d.shift()}return null}function l(a){for(var b={},c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===q)for(b[c.nodeName]={},a=0;a<c.attributes.length;a+=1)b[c.nodeName][c.attributes[a].name]=c.attributes[a].value;c=c.nextSibling}return b}function d(a,b){Object.keys(b).forEach(function(c){var e=c.split(":"),f=e[1],g=odf.Namespaces.resolvePrefix(e[0]),e=b[c];"object"===typeof e&&Object.keys(e).length?(c=a.getElementsByTagNameNS(g,
f)[0]||a.ownerDocument.createElementNS(g,c),a.appendChild(c),d(c,e)):a.setAttributeNS(g,c,e)})}function b(a){var b=c.rootElement.styles,d;d={};for(var e={},f=a;f;)d=l(f),e=n(d,e),f=(d=f.getAttributeNS(q,"parent-style-name"))?m(d,a.getAttributeNS(q,"family"),[b]):null;a:{a=a.getAttributeNS(q,"family");for(b=c.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===q&&"default-style"===b.localName&&b.getAttributeNS(q,"family")===a){f=b;break a}b=b.nextSibling}f=null}f&&
(d=l(f),e=n(d,e));return e}function e(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],f="",g=!1;c;)!g&&r.isGroupingElement(c)&&(g=!0),(d=t.determineStylesForNode(c))&&e.push(d),c=c.parentNode;g&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){f+="|"+b+":"+a+"|"})})}),b&&(b[f]=e));return g?e:void 0}function a(a){var c={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(d){var e=Object.keys(a[d])[0],f,g;(f=m(e,d))?
(g=b(f),c=n(g,c),g=f.getAttributeNS(q,"display-name")):runtime.log("No style element found for '"+e+"' of family '"+d+"'");c.orderedStyles.push({name:e,family:d,displayName:g})})});return c}function h(){var a,b=[];[c.rootElement.automaticStyles,c.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===q&&"style"===a.localName||a.namespaceURI===g&&"list-style"===a.localName)&&b.push(a.getAttributeNS(q,"name")),a=a.nextSibling});return b}var f=
this,c,t=new odf.StyleInfo,k=odf.Namespaces.svgns,q=odf.Namespaces.stylens,g=odf.Namespaces.textns,p=odf.Namespaces.numberns,r=new odf.OdfUtils,w=new core.Utils;this.setOdfContainer=function(a){c=a};this.getFontMap=function(){for(var a=c.rootElement.fontFaceDecls,b={},d,e,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(d=a.getAttributeNS(q,"name"))&&((e=a.getAttributeNS(k,"font-family"))||a.getElementsByTagNameNS(k,"font-face-uri")[0])&&(b[d]=e),a=a.nextSibling;return b};this.getAvailableParagraphStyles=
function(){for(var a=c.rootElement.styles&&c.rootElement.styles.firstChild,b,d,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===q)&&(d=a,b=d.getAttributeNS(q,"family"),"paragraph"===b&&(b=d.getAttributeNS(q,"name"),d=d.getAttributeNS(q,"display-name")||b,b&&d&&e.push({name:b,displayName:d}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var b;b=t.hasDerivedStyles(c.rootElement,odf.Namespaces.resolvePrefix,a);a=(new t.UsedStyleList(c.rootElement.styles)).uses(a)||
(new t.UsedStyleList(c.rootElement.automaticStyles)).uses(a)||(new t.UsedStyleList(c.rootElement.body)).uses(a);return b||a};this.getStyleElement=m;this.getStyleAttributes=l;this.getInheritedStyleAttributes=b;this.getFirstNamedParentStyleNameOrSelf=function(a){var b=c.rootElement.automaticStyles,d=c.rootElement.styles,e;for(e=m(a,"paragraph",[b]);e;)a=e.getAttributeNS(q,"parent-style-name"),e=m(a,"paragraph",[b]);return(e=m(a,"paragraph",[d]))?a:null};this.hasParagraphStyle=function(a){return Boolean(m(a,
"paragraph"))};this.getAppliedStyles=function(b){var c={},d=[];b.forEach(function(a){e(a,c)});Object.keys(c).forEach(function(b){d.push(a(c[b]))});return d};this.getAppliedStylesForElement=function(b){return(b=e(b))?a(b):void 0};this.applyStyle=function(a,b,d,e){(new odf.TextStyleApplicator("auto"+w.hashString(a)+"_",f,c.rootElement.automaticStyles)).applyStyle(b,d,e)};this.updateStyle=function(a,b,c){var e,f;d(a,b);if(c){a.getAttributeNS(q,"name");e=h();f=0;do b=c+f,f+=1;while(-1!==e.indexOf(b));
a.setAttributeNS(q,"style:name",b)}}};
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
odf.OdfCanvas=function(){function n(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(e)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function m(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a}function l(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function d(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}
function c(){var f=[],g=runtime.getWindow().getSelection(),k,h;for(k=0;k<g.rangeCount;k+=1)h=g.getRangeAt(k),null!==h&&(b(a,h.startContainer)&&b(a,h.endContainer))&&f.push(h);if(f.length===d.length){for(g=0;g<f.length&&(k=f[g],h=d[g],k=k===h?!1:null===k||null===h?!0:k.startContainer!==h.startContainer||k.startOffset!==h.startOffset||k.endContainer!==h.endContainer||k.endOffset!==h.endOffset,!k);g+=1);if(g===f.length)return}d=f;var g=[f.length],l,m=a.ownerDocument;for(k=0;k<f.length;k+=1)h=f[k],l=
m.createRange(),l.setStart(h.startContainer,h.startOffset),l.setEnd(h.endContainer,h.endOffset),g[k]=l;d=g;g=e.length;for(f=0;f<g;f+=1)e[f](a,d)}var d=[],e=[];this.addListener=function(a,b){var c,d=e.length;for(c=0;c<d;c+=1)if(e[c]===b)return;e.push(b)};l(a,"mouseup",c);l(a,"keyup",c);l(a,"keydown",c)}function b(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function e(a,b,c,d){c.setAttribute("styleid",b);var f,g=
c.getAttributeNS(v,"anchor-type"),k=c.getAttributeNS(y,"x"),h=c.getAttributeNS(y,"y"),l=c.getAttributeNS(y,"width"),m=c.getAttributeNS(y,"height"),n=c.getAttributeNS(w,"min-height"),p=c.getAttributeNS(w,"min-width"),q=c.getAttributeNS(r,"master-page-name"),u=null,s,t;s=0;var x,z=a.rootElement.ownerDocument;if(q){u=a.rootElement.masterStyles.getElementsByTagNameNS(A,"master-page");s=null;for(t=0;t<u.length;t+=1)if(u[t].getAttributeNS(A,"name")===q){s=u[t];break}u=s}else u=null;if(u){q=z.createElementNS(r,
"draw:page");x=u.firstElementChild;for(s=0;x;)"true"!==x.getAttributeNS(E,"placeholder")&&(t=x.cloneNode(!0),q.appendChild(t),e(a,b+"_"+s,t,d)),x=x.nextElementSibling,s+=1;K.appendChild(q);s=K.getElementsByTagNameNS(r,"page").length;if(t=q.getElementsByTagNameNS(v,"page-number")[0]){for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(z.createTextNode(s))}e(a,b,q,d);q.setAttributeNS(r,"draw:master-page-name",u.getAttributeNS(A,"name"))}if("as-char"===g)f="display: inline-block;";else if(g||
k||h)f="position: absolute;";else if(l||m||n||p)f="display: block;";k&&(f+="left: "+k+";");h&&(f+="top: "+h+";");l&&(f+="width: "+l+";");m&&(f+="height: "+m+";");n&&(f+="min-height: "+n+";");p&&(f+="min-width: "+p+";");f&&(f="draw|"+c.localName+'[styleid="'+b+'"] {'+f+"}",d.insertRule(f,d.cssRules.length))}function a(a){for(a=a.firstChild;a;){if(a.namespaceURI===u&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function h(b,
c,d,e){function f(a){a&&(a='draw|image[styleid="'+b+'"] {'+("background-image: url("+a+");")+"}",e.insertRule(a,e.cssRules.length))}d.setAttribute("styleid",b);var g=d.getAttributeNS(x,"href"),k;if(g)try{k=c.getPart(g),k.onchange=function(a){f(a.url)},k.load()}catch(h){runtime.log("slight problem: "+h)}else g=a(d),f(g)}function f(a){function b(a){return d===a.getAttributeNS(u,"name")}var c=C.getElementsByTagNameNS(a,u,"annotation");a=C.getElementsByTagNameNS(a,u,"annotation-end");var d,e;for(e=0;e<
c.length;e+=1)d=c[e].getAttributeNS(u,"name"),aa.addAnnotation({node:c[e],end:a.filter(b)[0]||null});aa.rerenderAnnotations()}function c(a){function b(c){var d,e;c.hasAttributeNS(x,"href")&&(d=c.getAttributeNS(x,"href"),"#"===d[0]?(d=d.substring(1),e=function(){var b=z.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=z.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);
return!1}):e=function(){O.open(d)},c.onclick=e)}var c,d,e;d=a.getElementsByTagNameNS(v,"a");for(c=0;c<d.length;c+=1)e=d.item(c),b(e)}function t(a){var b=a.ownerDocument;C.getElementsByTagNameNS(a,v,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(v,"c"),10);if(1<d)for(a.removeAttributeNS(v,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function k(a){C.getElementsByTagNameNS(a,v,"tab").forEach(function(a){a.textContent=
"\t"})}function q(b,c){function d(a,b){var g=k.documentElement.namespaceURI;"video/"===b.substr(0,6)?(e=k.createElementNS(g,"video"),e.setAttribute("controls","controls"),f=k.createElementNS(g,"source"),f.setAttribute("src",a),f.setAttribute("type",b),e.appendChild(f),c.parentNode.appendChild(e)):c.innerHtml="Unrecognised Plugin"}var e,f,g,k=c.ownerDocument,h;if(g=c.getAttributeNS(x,"href"))try{h=b.getPart(g),h.onchange=function(a){d(a.url,a.mimetype)},h.load()}catch(l){runtime.log("slight problem: "+
l)}else runtime.log("using MP4 data fallback"),g=a(c),d(g,"video/mp4")}function g(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));
c.setAttribute("type","text/css");b.appendChild(c);return c}function p(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var r=odf.Namespaces.drawns,w=odf.Namespaces.fons,u=odf.Namespaces.officens,A=odf.Namespaces.stylens,
y=odf.Namespaces.svgns,s=odf.Namespaces.tablens,v=odf.Namespaces.textns,x=odf.Namespaces.xlinkns,F=odf.Namespaces.xmlns,E=odf.Namespaces.presentationns,O=runtime.getWindow(),z=new xmldom.XPath,P=new odf.OdfUtils,C=new core.DomUtils,K,M,ca,da=!1,aa;odf.OdfCanvas=function(a){function u(a,b,c){function d(a,b,c,e){ka.addToQueue(function(){h(a,b,c,e)})}var e,f;e=b.getElementsByTagNameNS(r,"image");for(b=0;b<e.length;b+=1)f=e.item(b),d("image"+String(b),a,f,c)}function w(a,b){function c(a,b){ka.addToQueue(function(){q(a,
b)})}var d,e,f;e=b.getElementsByTagNameNS(r,"plugin");for(d=0;d<e.length;d+=1)f=e.item(d),c(a,f)}function y(){M.firstChild&&(1<T?(M.style.MozTransformOrigin="center top",M.style.WebkitTransformOrigin="center top",M.style.OTransformOrigin="center top",M.style.msTransformOrigin="center top"):(M.style.MozTransformOrigin="left top",M.style.WebkitTransformOrigin="left top",M.style.OTransformOrigin="left top",M.style.msTransformOrigin="left top"),M.style.WebkitTransform="scale("+T+")",M.style.MozTransform=
"scale("+T+")",M.style.OTransform="scale("+T+")",M.style.msTransform="scale("+T+")",a.style.width=Math.round(T*M.offsetWidth)+"px",a.style.height=Math.round(T*M.offsetHeight)+"px")}function E(a){da?(ca.parentNode||(M.appendChild(ca),y()),aa&&aa.forgetAnnotations(),aa=new gui.AnnotationViewManager(R,a.body,ca),f(a.body)):ca.parentNode&&(M.removeChild(ca),aa.forgetAnnotations(),y())}function x(d){function f(){for(var g=a;g.firstChild;)g.removeChild(g.firstChild);a.style.display="inline-block";g=Y.rootElement;
a.ownerDocument.importNode(g,!0);fa.setOdfContainer(Y);var h=Y,l=G;(new odf.FontLoader).loadFonts(h,l.sheet);b(Y,fa,ia);for(var l=Y,h=pa.sheet,m=a;m.firstChild;)m.removeChild(m.firstChild);M=$.createElementNS(a.namespaceURI,"div");M.style.display="inline-block";M.style.background="white";M.appendChild(g);a.appendChild(M);ca=$.createElementNS(a.namespaceURI,"div");ca.id="annotationsPane";K=$.createElementNS(a.namespaceURI,"div");K.id="shadowContent";K.style.position="absolute";K.style.top=0;K.style.left=
0;l.getContentElement().appendChild(K);var m=g.body,n,p,q;p=[];for(n=m.firstChild;n&&n!==m;)if(n.namespaceURI===r&&(p[p.length]=n),n.firstChild)n=n.firstChild;else{for(;n&&n!==m&&!n.nextSibling;)n=n.parentNode;n&&n.nextSibling&&(n=n.nextSibling)}for(q=0;q<p.length;q+=1)n=p[q],e(l,"frame"+String(q),n,h);p=z.getODFElementsWithXPath(m,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(n=0;n<p.length;n+=1)m=p[n],m.setAttributeNS&&m.setAttributeNS("urn:webodf","containsparagraphanchor",
!0);n=g.body.getElementsByTagNameNS(s,"table-cell");for(m=0;m<n.length;m+=1)p=n.item(m),p.hasAttributeNS(s,"number-columns-spanned")&&p.setAttribute("colspan",p.getAttributeNS(s,"number-columns-spanned")),p.hasAttributeNS(s,"number-rows-spanned")&&p.setAttribute("rowspan",p.getAttributeNS(s,"number-rows-spanned"));c(g.body);t(g.body);k(g.body);u(l,g.body,h);w(l,g.body);p=g.body;var x,C,X,D,m={};n={};var H;q=O.document.getElementsByTagNameNS(v,"list-style");for(l=0;l<q.length;l+=1)x=q.item(l),(X=x.getAttributeNS(A,
"name"))&&(n[X]=x);p=p.getElementsByTagNameNS(v,"list");for(l=0;l<p.length;l+=1)if(x=p.item(l),q=x.getAttributeNS(F,"id")){C=x.getAttributeNS(v,"continue-list");x.setAttribute("id",q);D="text|list#"+q+" > text|list-item > *:first-child:before {";if(X=x.getAttributeNS(v,"style-name")){x=n[X];H=P.getFirstNonWhitespaceChild(x);x=void 0;if(H)if("list-level-style-number"===H.localName){x=H.getAttributeNS(A,"num-format");X=H.getAttributeNS(A,"num-suffix");var va="",va={1:"decimal",a:"lower-latin",A:"upper-latin",
i:"lower-roman",I:"upper-roman"},qa=void 0,qa=H.getAttributeNS(A,"num-prefix")||"",qa=va.hasOwnProperty(x)?qa+(" counter(list, "+va[x]+")"):x?qa+("'"+x+"';"):qa+" ''";X&&(qa+=" '"+X+"'");x=va="content: "+qa+";"}else"list-level-style-image"===H.localName?x="content: none;":"list-level-style-bullet"===H.localName&&(x="content: '"+H.getAttributeNS(v,"bullet-char")+"';");H=x}if(C){for(x=m[C];x;)C=x,x=m[C];D+="counter-increment:"+C+";";H?(H=H.replace("list",C),D+=H):D+="content:counter("+C+");"}else C=
"",H?(H=H.replace("list",q),D+=H):D+="content: counter("+q+");",D+="counter-increment:"+q+";",h.insertRule("text|list#"+q+" {counter-reset:"+q+"}",h.cssRules.length);D+="}";m[q]=C;D&&h.insertRule(D,h.cssRules.length)}M.insertBefore(K,M.firstChild);y();E(g);if(!d&&(g=[Y],ha.hasOwnProperty("statereadychange")))for(h=ha.statereadychange,H=0;H<h.length;H+=1)h[H].apply(null,g)}Y.state===odf.OdfContainer.DONE?f():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function ma(){Y.state===
odf.OdfContainer.DONE?f():(runtime.log("will be back later..."),runtime.setTimeout(ma,500))},100))}function C(b){ka.clearQueue();a.innerHTML="loading "+b;a.removeAttribute("style");Y=new odf.OdfContainer(b,function(a){Y=a;x(!1)})}function I(){if(Z){for(var a=Z.ownerDocument.createDocumentFragment();Z.firstChild;)a.insertBefore(Z.firstChild,null);Z.parentNode.replaceChild(a,Z)}}function S(a){a=a||O.event;for(var b=a.target,c=O.getSelection(),d=0<c.rangeCount?c.getRangeAt(0):null,e=d&&d.startContainer,
f=d&&d.startOffset,g=d&&d.endContainer,k=d&&d.endOffset,h,l;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==v);)b=b.parentNode;V&&(b&&b.parentNode!==Z)&&(h=b.ownerDocument,l=h.documentElement.namespaceURI,Z?Z.parentNode&&I():(Z=h.createElementNS(l,"p"),Z.style.margin="0px",Z.style.padding="0px",Z.style.border="0px",Z.setAttribute("contenteditable",!0)),b.parentNode.replaceChild(Z,b),Z.appendChild(b),Z.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),d.setStart(e,f),d.setEnd(g,
k),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==a&&void 0!==a,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==a.ownerDocument&&void 0!==a.ownerDocument,"odf.OdfCanvas constructor needs DOM");var R=this,$=a.ownerDocument,Y,fa=new odf.Formatting,oa=new d(a),L,G,ia,pa,V=!1,T=1,ha={},Z,ka=new n;g($);L=new m(p($));G=p($);ia=p($);pa=p($);this.refreshCSS=function(){b(Y,fa,ia);y()};this.refreshSize=
function(){y()};this.odfContainer=function(){return Y};this.slidevisibilitycss=function(){return L.css};this.setOdfContainer=function(a,b){Y=a;x(!0===b)};this.load=this.load=C;this.save=function(a){I();Y.save(a)};this.setEditable=function(b){l(a,"click",S);(V=b)||I()};this.addListener=function(b,c){switch(b){case "selectionchange":oa.addListener(b,c);break;case "click":l(a,b,c);break;default:var d=ha[b];void 0===d&&(d=ha[b]=[]);c&&-1===d.indexOf(c)&&d.push(c)}};this.getFormatting=function(){return fa};
this.getAnnotationManager=function(){return aa};this.refreshAnnotations=function(){E(Y.rootElement)};this.rerenderAnnotations=function(){aa&&aa.rerenderAnnotations()};this.getSizer=function(){return M};this.enableAnnotations=function(a){a!==da&&(da=a,Y&&E(Y.rootElement))};this.addAnnotation=function(a){aa&&aa.addAnnotation(a)};this.forgetAnnotations=function(){aa&&aa.forgetAnnotations()};this.setZoomLevel=function(a){T=a;y()};this.getZoomLevel=function(){return T};this.fitToContainingElement=function(b,
c){var d=a.offsetHeight/T;T=b/(a.offsetWidth/T);c/d<T&&(T=c/d);y()};this.fitToWidth=function(b){T=b/(a.offsetWidth/T);y()};this.fitSmart=function(b,c){var d,e;d=a.offsetWidth/T;e=a.offsetHeight/T;d=b/d;void 0!==c&&c/e<d&&(d=c/e);T=Math.min(1,d);y()};this.fitToHeight=function(b){T=b/(a.offsetHeight/T);y()};this.showFirstPage=function(){L.showFirstPage()};this.showNextPage=function(){L.showNextPage()};this.showPreviousPage=function(){L.showPreviousPage()};this.showPage=function(a){L.showPage(a);y()};
this.getElement=function(){return a}};return odf.OdfCanvas}();
// Input 37
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(n,m,l){return new odf.OdfContainer(n,function(d){if(d.state===odf.OdfContainer.INVALID)return l("Document "+n+" is invalid.");d.state===odf.OdfContainer.DONE?d.saveAs(m,function(b){l(b)}):l("Document was not completely loaded.")})};this.render=function(n,m,l){for(m=m.getElementsByTagName("body")[0];m.firstChild;)m.removeChild(m.firstChild);m=new odf.OdfCanvas(m);m.addListener("statereadychange",function(d){l(d)});m.load(n)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(n,m){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(n,m,l,d){};ops.Server.prototype.joinSession=function(n,m,l,d){};ops.Server.prototype.leaveSession=function(n,m,l,d){};ops.Server.prototype.getGenesisUrl=function(n){};
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
ops.Operation=function(){};ops.Operation.prototype.init=function(n){};ops.Operation.prototype.transform=function(n,m){};ops.Operation.prototype.execute=function(n){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var n=this,m,l;this.init=function(d){m=d.memberid;l=d.timestamp};this.transform=function(d,b){return[n]};this.execute=function(d){var b=d.getCursor(m);if(b)return!1;b=new ops.OdtCursor(m,d);d.addCursor(b);d.emit(ops.OdtDocument.signalCursorAdded,b);return!0};this.spec=function(){return{optype:"AddCursor",memberid:m,timestamp:l}}};
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
gui.StyleHelper=function(n){function m(b,e,a){var h=!0,f;b.collapsed?(f=b.startContainer,f.hasChildNodes()&&b.startOffset<f.childNodes.length&&(f=f.childNodes[b.startOffset]),b=[f]):b=d.getTextNodes(b,!0);b=n.getAppliedStyles(b);for(f=0;f<b.length&&!(h=b[f]["style:text-properties"],h=!h||h[e]!==a);f+=1);return!h}var l=new core.DomUtils,d=new odf.OdfUtils;this.getAppliedStyles=function(b){b=d.getTextNodes(b,!0);return n.getAppliedStyles(b)};this.applyStyle=function(b,e,a){var h=l.splitBoundaries(e),
f=d.getTextNodes(e,!1);n.applyStyle(b,f,{startContainer:e.startContainer,startOffset:e.startOffset,endContainer:e.endContainer,endOffset:e.endOffset},a);h.forEach(l.normalizeTextNodes)};this.isBold=function(b){return m(b,"fo:font-weight","bold")};this.isItalic=function(b){return m(b,"fo:font-style","italic")};this.hasUnderline=function(b){return m(b,"style:text-underline-style","solid")};this.hasStrikeThrough=function(b){return m(b,"style:text-line-through-style","solid")}};
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
ops.OpApplyDirectStyling=function(){function n(a){var e=0<=b?d+b:d,c=a.getIteratorAtPosition(0<=b?d:d+b),e=b?a.getIteratorAtPosition(e):c;a=a.getDOM().createRange();a.setStart(c.container(),c.unfilteredDomOffset());a.setEnd(e.container(),e.unfilteredDomOffset());return a}var m,l,d,b,e,a=new odf.OdfUtils;this.init=function(a){m=a.memberid;l=a.timestamp;d=parseInt(a.position,10);b=parseInt(a.length,10);e=a.setProperties};this.transform=function(a,b){return null};this.execute=function(b){var d=n(b),
c=a.getImpactedParagraphs(d);(new gui.StyleHelper(b.getFormatting())).applyStyle(m,d,e);d.detach();b.getOdfCanvas().refreshCSS();c.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,timeStamp:l})});b.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:m,timestamp:l,position:d,length:b,setProperties:e}}};
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
ops.OpRemoveCursor=function(){var n=this,m,l;this.init=function(d){m=d.memberid;l=d.timestamp};this.transform=function(d,b){var e=d.spec(),a=[n];"RemoveCursor"===e.optype&&e.memberid===m&&(a=[]);return a};this.execute=function(d){return d.removeCursor(m)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:m,timestamp:l}}};
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
ops.OpMoveCursor=function(){var n=this,m,l,d,b;this.init=function(e){m=e.memberid;l=e.timestamp;d=parseInt(e.position,10);b=void 0!==e.length?parseInt(e.length,10):0};this.merge=function(e){return"MoveCursor"===e.optype&&e.memberid===m?(d=e.position,b=e.length,l=e.timestamp,!0):!1};this.transform=function(e,a){var h=e.spec(),f=d+b,c,l=[n];switch(h.optype){case "RemoveText":c=h.position+h.length;c<=d?d-=h.length:h.position<f&&(d<h.position?b=c<f?b-h.length:h.position-d:(d=h.position,b=c<f?f-c:0));
break;case "SplitParagraph":h.position<d?d+=1:h.position<=f&&(b+=1);break;case "AddAnnotation":h.position<d?d+=1:h.position<f&&(b+=1);break;case "InsertText":h.position<d?d+=h.text.length:h.position<=f&&(b+=h.text.length);break;case "RemoveCursor":h.memberid===m&&(l=[]);break;case "InsertTable":l=null}return l};this.execute=function(e){var a=e.getCursor(m),h=e.getCursorPosition(m),f=e.getPositionFilter(),c=d-h;if(!a)return!1;h=a.getStepCounter();c=0<c?h.countForwardSteps(c,f):0>c?-h.countBackwardSteps(-c,
f):0;a.move(c);b&&(f=0<b?h.countForwardSteps(b,f):0>b?-h.countBackwardSteps(-b,f):0,a.move(f,!0));e.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:m,timestamp:l,position:d,length:b}}};
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
ops.OpInsertTable=function(){function n(a,c){var d;if(1===t.length)d=t[0];else if(3===t.length)switch(a){case 0:d=t[0];break;case b-1:d=t[2];break;default:d=t[1]}else d=t[a];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case e-1:return d[2];default:return d[1]}return d[c]}var m=this,l,d,b,e,a,h,f,c,t;this.init=function(k){l=k.memberid;d=k.timestamp;a=parseInt(k.position,10);b=parseInt(k.initialRows,10);e=parseInt(k.initialColumns,10);h=k.tableName;f=k.tableStyleName;c=k.tableColumnStyleName;
t=k.tableCellStyleMatrix};this.transform=function(b,c){var d=b.spec(),e=[m];switch(d.optype){case "InsertTable":e=null;break;case "AddAnnotation":d.position<a&&(a+=1);break;case "SplitParagraph":d.position<a?a+=1:d.position!==a||c||(a+=1,e=null);break;case "InsertText":d.position<a?a+=d.text.length:d.position!==a||c||(a+=d.text.length,e=null);break;case "RemoveText":d.position+d.length<=a?a-=d.length:d.position<a&&(a=d.position)}return e};this.execute=function(k){var m=k.getPositionInTextNode(a),
g=k.getRootNode();if(m){var p=k.getDOM(),r=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),u,A,y,s;f&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",f);h&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",h);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",
e);c&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",c);r.appendChild(t);for(y=0;y<b;y+=1){t=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(s=0;s<e;s+=1)u=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(A=n(y,s))&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",A),A=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),
u.appendChild(A),t.appendChild(u);r.appendChild(t)}m=k.getParagraphElement(m.textNode);g.insertBefore(r,m?m.nextSibling:void 0);k.getOdfCanvas().refreshSize();k.emit(ops.OdtDocument.signalTableAdded,{tableElement:r,memberId:l,timeStamp:d});k.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:l,timestamp:d,position:a,initialRows:b,initialColumns:e,tableName:h,tableStyleName:f,tableColumnStyleName:c,tableCellStyleMatrix:t}}};
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
ops.OpInsertText=function(){function n(a,b){var d=b.parentNode,c=b.nextSibling,e=[];a.getCursors().forEach(function(a){var c=a.getSelectedRange();!c||c.startContainer!==b&&c.endContainer!==b||e.push({cursor:a,startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset})});d.removeChild(b);d.insertBefore(b,c);e.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var m=
this,l,d,b,e;this.init=function(a){l=a.memberid;d=a.timestamp;b=parseInt(a.position,10);e=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===l&&a.position===b+e.length?(e+=a.text,d=a.timestamp,!0):!1};this.transform=function(a,d){var e=a.spec(),c=[m];switch(e.optype){case "InsertText":e.position<b?b+=e.text.length:e.position!==b||d||(b+=e.text.length,c=null);break;case "AddAnnotation":e.position<b&&(b+=1);break;case "SplitParagraph":e.position<b?b+=1:e.position!==b||d||(b+=
1,c=null);break;case "InsertTable":c=null;break;case "RemoveText":e.position+e.length<=b?b-=e.length:e.position<b&&(b=e.position)}return c};this.execute=function(a){var h,f,c,m,k=a.getDOM(),q,g=!0,p=0,r;if(h=a.getPositionInTextNode(b,l)){f=h.textNode;c=f.parentNode;m=f.nextSibling;q=a.getParagraphElement(f);h.offset!==f.length&&(m=f.splitText(h.offset));for(h=0;h<e.length;h+=1)if(" "===e[h]||"\t"===e[h])p<h&&(p=e.substring(p,h),g?f.appendData(p):c.insertBefore(k.createTextNode(p),m)),p=h+1,g=!1,r=
" "===e[h]?"text:s":"text:tab",r=k.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",r),r.appendChild(k.createTextNode(e[h])),c.insertBefore(r,m);p=e.substring(p);0<p.length&&(g?f.appendData(p):c.insertBefore(k.createTextNode(p),m));n(a,f);0===f.length&&f.parentNode.removeChild(f);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:q,memberId:l,timeStamp:d});a.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",
memberid:l,timestamp:d,position:b,text:e}}};
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
ops.OpRemoveText=function(){function n(a){function b(a){if(h.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function d(e){e=f.mergeIntoParent(e);return!h.isParagraph(e)&&e!==a&&b(e)?d(e):e}this.isEmpty=b;this.mergeChildrenIntoParent=d}function m(b){var d=b.getPositionFilter(),k,h,g,l,m=a,n=b.getDOM().createRange();b=b.getIteratorAtPosition(e);k=b.container();for(h=b.unfilteredDomOffset();m&&
b.nextPosition();)g=b.container(),l=b.unfilteredDomOffset(),d.acceptPosition(b)===NodeFilter.FILTER_ACCEPT&&(m-=1);n.setStart(k,h);n.setEnd(g,l);f.splitBoundaries(n);return n}var l=this,d,b,e,a,h,f;this.init=function(c){runtime.assert(0<=c.length,"OpRemoveText only supports positive lengths");d=c.memberid;b=c.timestamp;e=parseInt(c.position,10);a=parseInt(c.length,10);h=new odf.OdfUtils;f=new core.DomUtils};this.transform=function(c,f){var k=c.spec(),h=e+a,g,m=[l];switch(k.optype){case "RemoveText":g=
k.position+k.length;g<=e?e-=k.length:k.position<h&&(e<k.position?a=g<h?a-k.length:k.position-e:g<h?(e=k.position,a=h-g):m=[]);break;case "InsertText":k.position<=e?e+=k.text.length:k.position<h&&(a=k.position-e,g=new ops.OpRemoveText,g.init({memberid:d,timestamp:b,position:k.position+k.text.length,length:h-k.position}),m=[g,l]);break;case "SplitParagraph":k.position<=e?e+=1:k.position<h&&(a=k.position-e,g=new ops.OpRemoveText,g.init({memberid:d,timestamp:b,position:k.position+1,length:h-k.position}),
m=[g,l]);break;case "InsertTable":m=null;break;case "AddAnnotation":case "RemoveAnnotation":m=null;break;case "ApplyDirectStyling":m=null}return m};this.execute=function(c){var f,k,h,g,l=new n(c.getRootNode());c.upgradeWhitespacesAtPosition(e);c.upgradeWhitespacesAtPosition(e+a);k=m(c);f=c.getParagraphElement(k.startContainer);h=c.getTextElements(k,!0);g=c.getParagraphElements(k);k.detach();h.forEach(function(a){l.mergeChildrenIntoParent(a)});k=g.reduce(function(a,b){var c,d,e=a,f=b,g,h;l.isEmpty(a)&&
(d=!0,b.parentNode!==a.parentNode&&(g=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),f=a,e=b,h=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;f.hasChildNodes();)c=d?f.lastChild:f.firstChild,f.removeChild(c),"editinfo"!==c.localName&&e.insertBefore(c,h);g&&l.isEmpty(g)&&l.mergeChildrenIntoParent(g);l.mergeChildrenIntoParent(f);return e});c.fixCursorPositions();c.getOdfCanvas().refreshSize();c.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k||
f,memberId:d,timeStamp:b});c.emit(ops.OdtDocument.signalCursorMoved,c.getCursor(d));c.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:d,timestamp:b,position:e,length:a}}};
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
ops.OpSplitParagraph=function(){var n=this,m,l,d,b=new odf.OdfUtils;this.init=function(b){m=b.memberid;l=b.timestamp;d=parseInt(b.position,10)};this.transform=function(b,a){var h=b.spec(),f=[n];switch(h.optype){case "SplitParagraph":h.position<d?d+=1:h.position!==d||a||(d+=1,f=null);break;case "AddAnnotation":h.position<d&&(d+=1);break;case "InsertText":h.position<d?d+=h.text.length:h.position!==d||a||(d+=h.text.length,f=null);break;case "InsertTable":f=null;break;case "RemoveText":h.position+h.length<=
d?d-=h.length:h.position<d&&(d=h.position)}return f};this.execute=function(e){var a,h,f,c,n,k;e.upgradeWhitespacesAtPosition(d);a=e.getPositionInTextNode(d,m);if(!a)return!1;h=e.getParagraphElement(a.textNode);if(!h)return!1;f=b.isListItem(h.parentNode)?h.parentNode:h;0===a.offset?(k=a.textNode.previousSibling,n=null):(k=a.textNode,n=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==f;)if(a=a.parentNode,c=a.cloneNode(!1),k){for(n&&c.appendChild(n);k.nextSibling;)c.appendChild(k.nextSibling);
a.parentNode.insertBefore(c,a.nextSibling);k=a;n=c}else a.parentNode.insertBefore(c,a),k=c,n=a;b.isListItem(n)&&(n=n.childNodes[0]);e.fixCursorPositions(m);e.getOdfCanvas().refreshSize();e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:h,memberId:m,timeStamp:l});e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:n,memberId:m,timeStamp:l});e.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:m,timestamp:l,position:d}}};
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
ops.OpSetParagraphStyle=function(){var n=this,m,l,d,b;this.init=function(e){m=e.memberid;l=e.timestamp;d=e.position;b=e.styleName};this.transform=function(d,a){var h=d.spec(),f=[n];switch(h.optype){case "RemoveParagraphStyle":h.styleName===b&&(b="")}return f};this.execute=function(e){var a;if(a=e.getPositionInTextNode(d))if(a=e.getParagraphElement(a.textNode))return""!==b?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",b):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),e.getOdfCanvas().refreshSize(),e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:l,memberId:m}),e.getOdfCanvas().rerenderAnnotations(),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:m,timestamp:l,position:d,styleName:b}}};
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
ops.OpUpdateParagraphStyle=function(){function n(a,b){var c,d,e=b?b.split(","):[];for(c=0;c<e.length;c+=1)d=e[c].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(d[0]),d[1])}function m(a,b,c,d){var e,f,h,k=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<k.length)&&Object.keys(a).forEach(function(b){e=a[b];(c&&void 0!==c[b]||k&&-1!==k.indexOf(b))&&"object"!==typeof e&&delete a[b]});if(b&&b.attributes&&(c||0<k.length)){h=b.attributes.split(",");for(d=0;d<h.length;d+=1)if(f=h[d],c&&void 0!==
c[f]||k&&-1!==k.indexOf(f))h.splice(d,1),d-=1;0<h.length?b.attributes=h.join(","):delete b.attributes}}function l(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function d(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function b(a,b){var c=t?t[b]:null,e=k?k[b]:null;m(c,e,a.setProperties?a.setProperties[b]:null,a.removedProperties?a.removedProperties[b]:null);c&&!l(c)&&delete t[b];e&&!d(e)&&delete k[b]}function e(a){t&&["style:parent-style-name",
"style:next-style-name"].forEach(function(b){t[b]===a&&delete t[b]})}var a=this,h,f,c,t,k;this.init=function(a){h=a.memberid;f=a.timestamp;c=a.styleName;t=a.setProperties;k=a.removedProperties};this.transform=function(f,g){var h=f.spec(),n=[a];switch(h.optype){case "UpdateParagraphStyle":h.styleName!==c||g||(b(h,"style:paragraph-properties"),b(h,"style:text-properties"),m(t||null,k||null,h.setProperties||null,h.removedProperties||null),t&&l(t)||k&&d(k)||(n=[]));break;case "RemoveParagraphStyle":h.styleName===
c?n=[]:e(h.styleName)}return n};this.execute=function(a){var b=a.getFormatting(),d=a.getDOM(),e=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:style"),f,h,l,m,s;return(e=a.getParagraphStyleElement(c))?(f=e.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","paragraph-properties")[0],h=e.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties")[0],t&&Object.keys(t).forEach(function(c){switch(c){case "style:paragraph-properties":void 0===
f&&(f=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:paragraph-properties"),e.appendChild(f));b.updateStyle(f,t["style:paragraph-properties"]);break;case "style:text-properties":void 0===h&&(h=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:text-properties"),e.appendChild(h));(m=t["style:text-properties"]["style:font-name"])&&!b.getFontMap().hasOwnProperty(m)&&(l=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:font-face"),
l.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",m),l.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","svg:font-family",m),a.getOdfCanvas().odfContainer().rootElement.fontFaceDecls.appendChild(l));b.updateStyle(h,t["style:text-properties"]);break;default:"object"!==typeof t[c]&&(s=odf.Namespaces.resolvePrefix(c.substr(0,c.indexOf(":"))),e.setAttributeNS(s,c,t[c]))}}),k&&(k["style:paragraph-properties"]&&(n(f,k["style:paragraph-properties"].attributes),
0===f.attributes.length&&e.removeChild(f)),k["style:text-properties"]&&(n(h,k["style:text-properties"].attributes),0===h.attributes.length&&e.removeChild(h)),n(e,k.attributes)),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,c),a.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:h,timestamp:f,styleName:c,setProperties:t,removedProperties:k}}};
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
ops.OpAddParagraphStyle=function(){function n(a){e&&["style:parent-style-name","style:next-style-name"].forEach(function(b){e[b]===a&&delete e[b]})}var m=this,l,d,b,e,a=odf.Namespaces.svgns,h=odf.Namespaces.stylens;this.init=function(a){l=a.memberid;d=a.timestamp;b=a.styleName;e=a.setProperties};this.transform=function(a,b){var d=a.spec();"RemoveParagraphStyle"===d.optype&&n(d.styleName);return[m]};this.execute=function(d){var c=d.getOdfCanvas().odfContainer(),l=d.getFormatting(),k=d.getDOM(),m=k.createElementNS(h,
"style:style"),g,n,r,w,u;if(!m)return!1;m.setAttributeNS(h,"style:family","paragraph");m.setAttributeNS(h,"style:name",b);e&&Object.keys(e).forEach(function(b){switch(b){case "style:paragraph-properties":g=k.createElementNS(h,"style:paragraph-properties");m.appendChild(g);l.updateStyle(g,e["style:paragraph-properties"]);break;case "style:text-properties":n=k.createElementNS(h,"style:text-properties");m.appendChild(n);(w=e["style:text-properties"]["style:font-name"])&&!l.getFontMap().hasOwnProperty(w)&&
(r=k.createElementNS(h,"style:font-face"),r.setAttributeNS(h,"style:name",w),r.setAttributeNS(a,"svg:font-family",w),c.rootElement.fontFaceDecls.appendChild(r));l.updateStyle(n,e["style:text-properties"]);break;default:"object"!==typeof e[b]&&(u=odf.Namespaces.resolvePrefix(b.substr(0,b.indexOf(":"))),m.setAttributeNS(u,b,e[b]))}});c.rootElement.styles.appendChild(m);d.getOdfCanvas().refreshCSS();d.emit(ops.OdtDocument.signalStyleCreated,b);return!0};this.spec=function(){return{optype:"AddParagraphStyle",
memberid:l,timestamp:d,styleName:b,setProperties:e}}};
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
ops.OpRemoveParagraphStyle=function(){function n(d){var a=[];d&&["style:parent-style-name","style:next-style-name"].forEach(function(h){d[h]===b&&a.push(h)});return a}var m=this,l,d,b;this.init=function(e){l=e.memberid;d=e.timestamp;b=e.styleName};this.transform=function(d,a){var h=d.spec(),f,c;f=[m];switch(h.optype){case "RemoveParagraphStyle":h.styleName===b&&(f=[]);break;case "AddParagraphStyle":case "UpdateParagraphStyle":c=n(h.setProperties);0<c.length&&(f=new ops.OpUpdateParagraphStyle,f.init({styleName:h.styleName,
removedProperties:{attributes:c.join(",")}}),f=[f,m]);break;case "SetParagraphStyle":h.styleName===b&&(h.styleName="",f=new ops.OpSetParagraphStyle,f.init(h),f=[f,m])}return f};this.execute=function(d){var a=d.getParagraphStyleElement(b);if(!a)return!1;a.parentNode.removeChild(a);d.getOdfCanvas().refreshCSS();d.emit(ops.OdtDocument.signalStyleDeleted,b);return!0};this.spec=function(){return{optype:"RemoveParagraphStyle",memberid:l,timestamp:d,styleName:b}}};
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
ops.OpAddAnnotation=function(){function n(a,b,c){if(c=a.getPositionInTextNode(c,l))a=c.textNode,c.offset!==a.length&&a.splitText(c.offset),a.parentNode.insertBefore(b,a.nextSibling)}var m=this,l,d,b,e,a;this.init=function(h){l=h.memberid;d=parseInt(h.timestamp,10);b=parseInt(h.position,10);e=parseInt(h.length,10)||0;a=h.name};this.transform=function(a,d){var c=a.spec(),l=b+e,k=[m];switch(c.optype){case "AddAnnotation":c.position<b?b+=1:c.position!==b||d||(b+=1,k=null);break;case "InsertText":c.position<=
b?b+=c.text.length:c.position<=l&&(e+=c.text.length);break;case "SplitParagraph":c.position<=b?b+=1:c.position<=l&&(e+=1);break;case "InsertTable":k=null;break;case "RemoveText":c.position+c.length<=b?b-=c.length:c.position<b&&(b=c.position)}return k};this.execute=function(h){var f={},c=h.getPositionFilter(),m=h.getCursor(l),k=h.getCursorPosition(l),k=b-k-1,q=new Date(d),g,p,r,w,u;u=h.getDOM();g=u.createElementNS(odf.Namespaces.officens,"office:annotation");g.setAttributeNS(odf.Namespaces.officens,
"office:name",a);p=u.createElementNS(odf.Namespaces.dcns,"dc:creator");p.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",l);r=u.createElementNS(odf.Namespaces.dcns,"dc:date");r.appendChild(u.createTextNode(q.toISOString()));q=u.createElementNS(odf.Namespaces.textns,"text:list");w=u.createElementNS(odf.Namespaces.textns,"text:list-item");u=u.createElementNS(odf.Namespaces.textns,"text:p");w.appendChild(u);q.appendChild(w);g.appendChild(p);g.appendChild(r);g.appendChild(q);
f.node=g;if(!f.node)return!1;if(e){g=h.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");g.setAttributeNS(odf.Namespaces.officens,"office:name",a);f.end=g;if(!f.end)return!1;n(h,f.end,b+e)}n(h,f.node,b);m&&(g=m.getStepCounter(),c=0<k?g.countForwardSteps(k,c):0>k?-g.countBackwardSteps(-k,c):0,m.move(c),h.emit(ops.OdtDocument.signalCursorMoved,m));h.getOdfCanvas().addAnnotation(f);return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:l,timestamp:d,position:b,
length:e,name:a}}};
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
ops.OpRemoveAnnotation=function(){var n,m,l,d,b;this.init=function(e){n=e.memberid;m=e.timestamp;l=parseInt(e.position,10);d=parseInt(e.length,10);b=new core.DomUtils};this.transform=function(b,a){return null};this.execute=function(d){for(var a=d.getIteratorAtPosition(l).container(),h,f=null,c=null;a.namespaceURI!==odf.Namespaces.officens||"annotation"!==a.localName;)a=a.parentNode;if(null===a)return!1;f=a;(h=f.getAttributeNS(odf.Namespaces.officens,"name"))&&(c=b.getElementsByTagNameNS(d.getRootNode(),
odf.Namespaces.officens,"annotation-end").filter(function(a){return h===a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);d.getOdfCanvas().forgetAnnotations();for(a=b.getElementsByTagNameNS(f,odf.Namespaces.webodfns+":names:cursor","cursor");a.length;)f.parentNode.insertBefore(a.pop(),f);f.parentNode.removeChild(f);c&&c.parentNode.removeChild(c);d.fixCursorPositions();d.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:n,timestamp:m,
position:l,length:d}}};
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
ops.OperationFactory=function(){function n(l){return function(){return new l}}var m;this.register=function(l,d){m[l]=d};this.create=function(l){var d=null,b=m[l.optype];b&&(d=b(l),d.init(l));return d};m={AddCursor:n(ops.OpAddCursor),ApplyDirectStyling:n(ops.OpApplyDirectStyling),InsertTable:n(ops.OpInsertTable),InsertText:n(ops.OpInsertText),RemoveText:n(ops.OpRemoveText),SplitParagraph:n(ops.OpSplitParagraph),SetParagraphStyle:n(ops.OpSetParagraphStyle),UpdateParagraphStyle:n(ops.OpUpdateParagraphStyle),
AddParagraphStyle:n(ops.OpAddParagraphStyle),RemoveParagraphStyle:n(ops.OpRemoveParagraphStyle),MoveCursor:n(ops.OpMoveCursor),RemoveCursor:n(ops.OpRemoveCursor),AddAnnotation:n(ops.OpAddAnnotation),RemoveAnnotation:n(ops.OpRemoveAnnotation)}};
// Input 56
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(n,m){function l(){u.setUnfilteredPosition(n.getNode(),0);return u}function d(a,b){var c,d=null;a&&(c=b?a[a.length-1]:a[0]);c&&(d={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return d}function b(a,c,e,f){var g=a.nodeType;e.setStart(a,c);e.collapse(!f);f=d(e.getClientRects(),!0===f);!f&&0<c&&(e.setStart(a,c-1),e.setEnd(a,c),f=d(e.getClientRects(),!0));f||(g===Node.ELEMENT_NODE&&a.childNodes[c-1]?f=b(a,c-1,e,!0):a.nodeType===Node.TEXT_NODE&&0<c?f=b(a,c-1,e,!0):a.previousSibling?
f=b(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,e,!0):a.parentNode&&a.parentNode!==m?f=b(a.parentNode,0,e,!1):(e.selectNode(m),f=d(e.getClientRects(),!1)));runtime.assert(Boolean(f),"No visible rectangle found");return f}function e(a,c,d){var e=a,f=l(),g,h=m.ownerDocument.createRange(),k=n.getSelectedRange()?n.getSelectedRange().cloneRange():m.ownerDocument.createRange(),p,r=runtime.getWindow();for(g=b(f.container(),
f.unfilteredDomOffset(),h);0<e&&d();)e-=1;c?(c=f.container(),f=f.unfilteredDomOffset(),-1===k.comparePoint(c,f)?(k.setStart(c,f),p=!1):k.setEnd(c,f)):(k.setStart(f.container(),f.unfilteredDomOffset()),k.collapse(!0));n.setSelectedRange(k,p);f=l();k=b(f.container(),f.unfilteredDomOffset(),h);if(k.top===g.top||void 0===A)A=k.left;r.clearTimeout(y);y=r.setTimeout(function(){A=void 0},2E3);h.detach();return a-e}function a(a){var b=l();return a.acceptPosition(b)===s?!0:!1}function h(a,b){for(var c=l(),
d=new core.LoopWatchDog(1E3),e=0,f=0;0<a&&c.nextPosition();)e+=1,d.check(),b.acceptPosition(c)===s&&(f+=e,e=0,a-=1);return f}function f(a,b,c){for(var d=l(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&d.nextPosition();)e.check(),c.acceptPosition(d)===s&&(f+=1,b.acceptPosition(d)===s&&(g+=f,f=0,a-=1));return g}function c(a,b,c){for(var d=l(),e=new core.LoopWatchDog(1E3),f=0,g=0;0<a&&d.previousPosition();)e.check(),c.acceptPosition(d)===s&&(f+=1,b.acceptPosition(d)===s&&(g+=f,f=0,a-=1));return g}function t(a,
b){for(var c=l(),d=new core.LoopWatchDog(1E3),e=0,f=0;0<a&&c.previousPosition();)e+=1,d.check(),b.acceptPosition(c)===s&&(f+=e,e=0,a-=1);return f}function k(a){var b=l(),c=w.getParagraphElement(b.getCurrentNode()),d;d=-t(1,a);if(0===d||c&&c!==w.getParagraphElement(b.getCurrentNode()))d=h(1,a);return d}function q(a,c){var d=l(),e=0,f=0,g=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var h=c,k=g,n=d,p=n.container(),r=0,q=null,u=void 0,t=10,w=void 0,y=0,W=void 0,U=void 0,N=void 0,w=void 0,D=m.ownerDocument.createRange(),
I=new core.LoopWatchDog(1E3),w=b(p,n.unfilteredDomOffset(),D),W=w.top,U=void 0===A?w.left:A,N=W;!0===(0>k?n.previousPosition():n.nextPosition());)if(I.check(),h.acceptPosition(n)===s&&(r+=1,p=n.container(),w=b(p,n.unfilteredDomOffset(),D),w.top!==W)){if(w.top!==N&&N!==W)break;N=w.top;w=Math.abs(U-w.left);if(null===q||w<t)q=p,u=n.unfilteredDomOffset(),t=w,y=r}null!==q?(n.setUnfilteredPosition(q,u),r=y):r=0;D.detach();e+=r;if(0===e)break;f+=e;a-=1}return f*g}function g(a,c){var d,e,f,g,h=l(),k=w.getParagraphElement(h.getCurrentNode()),
n=0,p=m.ownerDocument.createRange();0>a?(d=h.previousPosition,e=-1):(d=h.nextPosition,e=1);for(f=b(h.container(),h.unfilteredDomOffset(),p);d.call(h);)if(c.acceptPosition(h)===s){if(w.getParagraphElement(h.getCurrentNode())!==k)break;g=b(h.container(),h.unfilteredDomOffset(),p);if(g.bottom!==f.bottom&&(f=g.top>=f.top&&g.bottom<f.bottom||g.top<=f.top&&g.bottom>f.bottom,!f))break;n+=e;f=g}p.detach();return n}function p(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),
a=a.parentNode;for(d=b.firstChild;d!==a;)c+=1,d=d.nextSibling;return c}function r(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=l(),e=d.container(),f=d.unfilteredDomOffset(),g=0,h=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(e,f);var e=a,f=b,k=d.container(),
m=d.unfilteredDomOffset();if(e===k)e=m-f;else{var n=e.compareDocumentPosition(k);2===n?n=-1:4===n?n=1:10===n?(f=p(e,k),n=f<m?1:-1):(m=p(k,e),n=m<f?-1:1);e=n}if(0>e)for(;d.nextPosition()&&(h.check(),c.acceptPosition(d)===s&&(g+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&(h.check(),c.acceptPosition(d)===s&&(g-=1),d.container()!==a||d.unfilteredDomOffset()!==b););return g}var w,u,A,y,s=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=
function(a,b){return e(a,b,u.nextPosition)};this.movePointBackward=function(a,b){return e(a,b,u.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:h,countBackwardSteps:t,convertForwardStepsBetweenFilters:f,convertBackwardStepsBetweenFilters:c,countLinesSteps:q,countStepsToLineBoundary:g,countStepsToPosition:r,isPositionWalkable:a,countStepsToValidPosition:k}};(function(){w=new odf.OdfUtils;u=gui.SelectionMover.createPositionIterator(m);var a=m.ownerDocument.createRange();a.setStart(u.container(),
u.unfilteredDomOffset());a.collapse(!0);n.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(n){var m=new function(){this.acceptNode=function(l){return"urn:webodf:names:cursor"===l.namespaceURI||"urn:webodf:names:editinfo"===l.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(n,5,m,!1)};(function(){return gui.SelectionMover})();
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
ops.OperationTransformer=function(){function n(l,d){for(var b,e,a,h=[],f=[];0<l.length&&d;){b=l.shift();e=d;var c=void 0;a=c=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b.spec()));runtime.log(runtime.toJson(e.spec()));c=m.create(e.spec());a=e.transform(b,!0);e=(c=b.transform(c,!1))&&a?{opsA:c,opsB:a}:null;if(!e)return null;h=h.concat(e.opsA);if(0===e.opsB.length){h=h.concat(l);d=null;break}if(1<e.opsB.length)for(b=0;b<e.opsB.length-1;b+=1){a=n(l,e.opsB[b]);if(!a)return null;
f=f.concat(a.opsB);l=a.opsA}d=e.opsB.pop()}d&&f.push(d);return{opsA:h,opsB:f}}var m;this.setOperationFactory=function(l){m=l};this.transform=function(l,d){var b,e=[],a,h=[];for(b=0;b<l.length;b+=1){a=m.create(l[b]);if(!a)return null;e.push(a)}for(b=0;b<d.length;b+=1){a=m.create(d[b]);a=n(e,a);if(!a)return null;e=a.opsA;h=h.concat(a.opsB)}return{opsA:e,opsB:h}}};
// Input 58
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(n,m){var l=this,d,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,a){var h=0;0<b?h=d.movePointForward(b,a):0>=b&&(h=-d.movePointBackward(-b,a));l.handleUpdate();return h};this.handleUpdate=function(){};this.getStepCounter=function(){return d.getStepCounter()};this.getMemberId=function(){return n};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.getOdtDocument=function(){return m};b=new core.Cursor(m.getDOM(),n);d=new gui.SelectionMover(b,m.getRootNode())};
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
ops.EditInfo=function(n,m){function l(){var d=[],a;for(a in b)b.hasOwnProperty(a)&&d.push({memberid:a,time:b[a].time});d.sort(function(a,b){return a.time-b.time});return d}var d,b={};this.getNode=function(){return d};this.getOdtDocument=function(){return m};this.getEdits=function(){return b};this.getSortedEdits=function(){return l()};this.addEdit=function(d,a){b[d]={time:a}};this.clearEdits=function(){b={}};d=m.getDOM().createElementNS("urn:webodf:names:editinfo","editinfo");n.insertBefore(d,n.firstChild)};
// Input 60
gui.Avatar=function(n,m){var l=this,d,b,e;this.setColor=function(a){b.style.borderColor=a};this.setImageUrl=function(a){l.isVisible()?b.src=a:e=a};this.isVisible=function(){return"block"===d.style.display};this.show=function(){e&&(b.src=e,e=void 0);d.style.display="block"};this.hide=function(){d.style.display="none"};this.markAsFocussed=function(a){d.className=a?"active":""};(function(){var a=n.ownerDocument,e=a.documentElement.namespaceURI;d=a.createElementNS(e,"div");b=a.createElementNS(e,"img");
b.width=64;b.height=64;d.appendChild(b);d.style.width="64px";d.style.height="70px";d.style.position="absolute";d.style.top="-80px";d.style.left="-34px";d.style.display=m?"block":"none";n.appendChild(d)})()};
// Input 61
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(n,m,l){function d(e){h&&a.parentNode&&(!f||e)&&(e&&void 0!==c&&runtime.clearTimeout(c),f=!0,b.style.opacity=e||"0"===b.style.opacity?"1":"0",c=runtime.setTimeout(function(){f=!1;d(!1)},500))}var b,e,a,h=!1,f=!1,c;this.refreshCursorBlinking=function(){l||n.getSelectedRange().collapsed?(h=!0,d(!0)):(h=!1,b.style.opacity="0")};this.setFocus=function(){h=!0;e.markAsFocussed(!0);d(!0)};this.removeFocus=function(){h=!1;e.markAsFocussed(!1);b.style.opacity="0"};this.setAvatarImageUrl=
function(a){e.setImageUrl(a)};this.setColor=function(a){b.style.borderColor=a;e.setColor(a)};this.getCursor=function(){return n};this.getFocusElement=function(){return b};this.toggleHandleVisibility=function(){e.isVisible()?e.hide():e.show()};this.showHandle=function(){e.show()};this.hideHandle=function(){e.hide()};this.ensureVisible=function(){var a,c,d,e,f=n.getOdtDocument().getOdfCanvas().getElement().parentNode,h;d=f.offsetWidth-f.clientWidth+5;e=f.offsetHeight-f.clientHeight+5;h=b.getBoundingClientRect();
a=h.left-d;c=h.top-e;d=h.right+d;e=h.bottom+e;h=f.getBoundingClientRect();c<h.top?f.scrollTop-=h.top-c:e>h.bottom&&(f.scrollTop+=e-h.bottom);a<h.left?f.scrollLeft-=h.left-a:d>h.right&&(f.scrollLeft+=d-h.right)};(function(){var c=n.getOdtDocument().getDOM();b=c.createElementNS(c.documentElement.namespaceURI,"span");a=n.getNode();a.appendChild(b);e=new gui.Avatar(a,m)})()};
// Input 62
runtime.loadClass("core.EventNotifier");
gui.ClickHandler=function(){function n(){l=0;d=null}var m,l=0,d=null,b=new core.EventNotifier([gui.ClickHandler.signalSingleClick,gui.ClickHandler.signalDoubleClick,gui.ClickHandler.signalTripleClick]);this.subscribe=function(d,a){b.subscribe(d,a)};this.handleMouseUp=function(e){var a=runtime.getWindow();d&&d.x===e.screenX&&d.y===e.screenY?(l+=1,1===l?b.emit(gui.ClickHandler.signalSingleClick,e):2===l?b.emit(gui.ClickHandler.signalDoubleClick,void 0):3===l&&(a.clearTimeout(m),b.emit(gui.ClickHandler.signalTripleClick,
void 0),n())):(b.emit(gui.ClickHandler.signalSingleClick,e),l=1,d={x:e.screenX,y:e.screenY},a.clearTimeout(m),m=a.setTimeout(n,400))}};gui.ClickHandler.signalSingleClick="click";gui.ClickHandler.signalDoubleClick="doubleClick";gui.ClickHandler.signalTripleClick="tripleClick";(function(){return gui.ClickHandler})();
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
gui.KeyboardHandler=function(){function n(b,d){d||(d=m.None);return b+":"+d}var m=gui.KeyboardHandler.Modifier,l=null,d={};this.setDefault=function(b){l=b};this.bind=function(b,e,a){b=n(b,e);runtime.assert(!1===d.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);d[b]=a};this.unbind=function(b,e){var a=n(b,e);delete d[a]};this.reset=function(){l=null;d={}};this.handleEvent=function(b){var e=b.keyCode,a=m.None;b.metaKey&&(a|=m.Meta);b.ctrlKey&&(a|=m.Ctrl);b.altKey&&(a|=m.Alt);
b.shiftKey&&(a|=m.Shift);e=n(e,a);e=d[e];a=!1;e?a=e():null!==l&&(a=l(b));a&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,I:73,U:85,Z:90};(function(){return gui.KeyboardHandler})();
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
gui.Clipboard=function(){var n,m,l;this.setDataFromRange=function(d,b){var e=!0,a,h=d.clipboardData;a=runtime.getWindow();var f=b.startContainer.ownerDocument;!h&&a&&(h=a.clipboardData);h?(f=f.createElement("span"),f.appendChild(b.cloneContents()),a=h.setData("text/plain",m.writeToString(f)),e=e&&a,a=h.setData("text/html",n.writeToString(f,odf.Namespaces.namespaceMap)),e=e&&a,d.preventDefault()):e=!1;return e};n=new xmldom.LSSerializer;m=new odf.TextSerializer;l=new odf.OdfNodeFilter;n.filter=l;m.filter=
l};
// Input 65
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.ClickHandler");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");
runtime.loadClass("gui.StyleHelper");
gui.SessionController=function(){gui.SessionController=function(n,m){function l(a,b,c,d){var e="on"+b,f=!1;a.attachEvent&&(f=a.attachEvent(e,c));!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0);f&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function d(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function b(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function e(a,b){var c=new ops.OpMoveCursor;c.init({memberid:m,
position:a,length:b||0});return c}function a(a,b){var c=gui.SelectionMover.createPositionIterator(B.getRootNode()),d=B.getOdfCanvas().getElement(),e;e=a;if(!e)return null;for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return null;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,b);return B.getDistanceFromCursor(m,c.container(),
c.unfilteredDomOffset())}function h(a){var b=B.getOdfCanvas().getElement(),c=B.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function f(b){ga&&runtime.setTimeout(function(){var c;a:{var d=B.getOdfCanvas().getElement(),f=X.getSelection(),g,k,l,p;if(null===f.anchorNode&&null===f.focusNode){c=b.clientX;g=b.clientY;k=B.getDOM();k.caretRangeFromPoint?
(c=k.caretRangeFromPoint(c,g),g={container:c.startContainer,offset:c.startOffset}):k.caretPositionFromPoint?(c=k.caretPositionFromPoint(c,g),g={container:c.offsetNode,offset:c.offset}):g=null;if(!g){c=null;break a}c=g.container;g=g.offset;k=c;f=g}else c=f.anchorNode,g=f.anchorOffset,k=f.focusNode,f=f.focusOffset;runtime.assert(null!==c&&null!==k,"anchorNode is null or focusNode is null");l=ma.containsNode(d,c);p=ma.containsNode(d,k);l||p?(l||(l=h(c),c=l.node,g=l.offset),p||(l=h(k),k=l.node,f=l.offset),
d.focus(),c={anchorNode:c,anchorOffset:g,focusNode:k,focusOffset:f}):c=null}null!==c&&(d=a(c.anchorNode,c.anchorOffset),g=c.focusNode===c.anchorNode&&c.focusOffset===c.anchorOffset?d:a(c.focusNode,c.focusOffset),null!==g&&0!==g||null!==d&&0!==d)&&(c=B.getCursorPosition(m),d=e(c+d,g-d),n.enqueue(d))},0)}function c(a){f(a)}function t(){var a=B.getOdfCanvas().getElement(),b=/[A-Za-z0-9]/,c=0,d=0,f,g;if(ma.containsNode(a,X.getSelection().focusNode)){a=gui.SelectionMover.createPositionIterator(B.getRootNode());
f=B.getCursor(m).getNode();for(a.setUnfilteredPosition(f,0);a.previousPosition();)if(g=a.getCurrentNode(),g.nodeType===Node.TEXT_NODE){g=g.data[a.unfilteredDomOffset()];if(!b.test(g))break;c-=1}else if(g.namespaceURI!==odf.Namespaces.textns||"span"!==g.localName)break;a.setUnfilteredPosition(f,0);do if(g=a.getCurrentNode(),g.nodeType===Node.TEXT_NODE){g=g.data[a.unfilteredDomOffset()];if(!b.test(g))break;d+=1}else if(g.namespaceURI!==odf.Namespaces.textns||"span"!==g.localName)break;while(a.nextPosition());
if(0!==c||0!==d)b=B.getCursorPosition(m),c=e(b+c,Math.abs(c)+Math.abs(d)),n.enqueue(c)}}function k(){var a=B.getOdfCanvas().getElement(),b,c;ma.containsNode(a,X.getSelection().focusNode)&&(c=B.getParagraphElement(B.getCursor(m).getNode()),a=B.getDistanceFromCursor(m,c,0),b=gui.SelectionMover.createPositionIterator(B.getRootNode()),b.moveToEndOfNode(c),c=B.getDistanceFromCursor(m,c,b.unfilteredDomOffset()),0!==a||0!==c)&&(b=B.getCursorPosition(m),a=e(b+a,Math.abs(a)+Math.abs(c)),n.enqueue(a))}function q(a){var b=
B.getCursorSelection(m),c=B.getCursor(m).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,ja,na):-c.convertBackwardStepsBetweenFilters(-a,ja,na),a=b.length+a,n.enqueue(e(b.position,a)))}function g(a){var b=B.getCursorPosition(m),c=B.getCursor(m).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,ja,na):-c.convertBackwardStepsBetweenFilters(-a,ja,na),n.enqueue(e(b+a,0)))}function p(){g(-1);return!0}function r(){g(1);return!0}function w(){q(-1);return!0}function u(){q(1);
return!0}function A(a,b){var c=B.getParagraphElement(B.getCursor(m).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=B.getCursor(m).getStepCounter().countLinesSteps(a,ja);b?q(c):g(c)}function y(){A(-1,!1);return!0}function s(){A(1,!1);return!0}function v(){A(-1,!0);return!0}function x(){A(1,!0);return!0}function F(a,b){var c=B.getCursor(m).getStepCounter().countStepsToLineBoundary(a,ja);b?q(c):g(c)}function E(){F(-1,!1);return!0}function O(){F(1,!1);return!0}function z(){F(-1,
!0);return!0}function P(){F(1,!0);return!0}function C(){var a=B.getParagraphElement(B.getCursor(m).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");c=B.getDistanceFromCursor(m,a,0);b=gui.SelectionMover.createPositionIterator(B.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),wa.isParagraph(a)&&(c=B.getDistanceFromCursor(m,a,0));q(c);return!0}function K(){var a=B.getParagraphElement(B.getCursor(m).getNode()),b,
c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(B.getRootNode());b.moveToEndOfNode(a);for(c=B.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),wa.isParagraph(a)&&(b.moveToEndOfNode(a),c=B.getDistanceFromCursor(m,b.container(),b.unfilteredDomOffset()));q(c);return!0}function M(a,b){var c=gui.SelectionMover.createPositionIterator(B.getRootNode());0<a&&c.moveToEnd();c=B.getDistanceFromCursor(m,
c.container(),c.unfilteredDomOffset());b?q(c):g(c)}function ca(){M(-1,!1);return!0}function da(){M(1,!1);return!0}function aa(){M(-1,!0);return!0}function ba(){M(1,!0);return!0}function ea(){var a=gui.SelectionMover.createPositionIterator(B.getRootNode()),b;b=-B.getDistanceFromCursor(m,a.container(),a.unfilteredDomOffset());a.moveToEnd();b+=B.getDistanceFromCursor(m,a.container(),a.unfilteredDomOffset());n.enqueue(e(0,b));return!0}function Q(a){0>a.length&&(a.position+=a.length,a.length=-a.length);
return a}function W(a){var b=new ops.OpRemoveText;b.init({memberid:m,position:a.position,length:a.length});return b}function U(){var a=Q(B.getCursorSelection(m)),b=null;0===a.length?0<a.position&&B.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:m,position:a.position-1,length:1}),n.enqueue(b)):(b=W(a),n.enqueue(b));return!0}function N(){var a=Q(B.getCursorSelection(m)),b=null;0===a.length?B.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:m,
position:a.position,length:1}),n.enqueue(b)):(b=W(a),n.enqueue(b));return null!==b}function D(){var a=Q(B.getCursorSelection(m));0!==a.length&&n.enqueue(W(a));return!0}function I(a){var b=Q(B.getCursorSelection(m)),c=null;0<b.length&&(c=W(b),n.enqueue(c));c=new ops.OpInsertText;c.init({memberid:m,position:b.position,text:a});n.enqueue(c)}function S(){var a=B.getCursorPosition(m),b;b=new ops.OpSplitParagraph;b.init({memberid:m,position:a});n.enqueue(b);return!0}function R(){var a=B.getCursor(m),b=
X.getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function $(a){var b=B.getCursor(m);b.getSelectedRange().collapsed||(sa.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=Q(n.getOdtDocument().getCursorSelection(m)),b.init({memberid:m,position:a.position,length:a.length}),n.enqueue(b)):runtime.log("Cut operation failed"))}function Y(){return!1!==B.getCursor(m).getSelectedRange().collapsed}function fa(a){var b=B.getCursor(m);b.getSelectedRange().collapsed||
sa.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function oa(a){var b;X.clipboardData&&X.clipboardData.getData?b=X.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(I(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function L(){return!1}function G(a){if(H)H.onOperationExecuted(a)}function ia(a){B.emit(ops.OdtDocument.signalUndoStackChanged,a)}function pa(){return H?(H.moveBackward(1),R(),!0):
!1}function V(){return H?(H.moveForward(1),R(),!0):!1}function T(a,b){var c=B.getCursorSelection(m),d=new ops.OpApplyDirectStyling,e={};e[a]=b;d.init({memberid:m,position:c.position,length:c.length,setProperties:{"style:text-properties":e}});n.enqueue(d)}function ha(){var a=B.getCursor(m).getSelectedRange(),a=ta.isBold(a)?"normal":"bold";T("fo:font-weight",a);return!0}function Z(){var a=B.getCursor(m).getSelectedRange(),a=ta.isItalic(a)?"normal":"italic";T("fo:font-style",a);return!0}function ka(){var a=
B.getCursor(m).getSelectedRange(),a=ta.hasUnderline(a)?"none":"solid";T("style:text-underline-style",a);return!0}function la(a){ga=a.target&&ma.containsNode(B.getOdfCanvas().getElement(),a.target)}var X=runtime.getWindow(),B=n.getOdtDocument(),ma=new core.DomUtils,wa=new odf.OdfUtils,sa=new gui.Clipboard,ua=new gui.ClickHandler,J=new gui.KeyboardHandler,ra=new gui.KeyboardHandler,ta=new gui.StyleHelper(B.getFormatting()),ja=new core.PositionFilterChain,na=B.getPositionFilter(),ga=!1,H=null;runtime.assert(null!==
X,"Expected to be run in an environment which has a global window, like a browser.");ja.addFilter("BaseFilter",na);ja.addFilter("RootFilter",B.createRootFilter(m));this.startEditing=function(){var a;a=B.getOdfCanvas().getElement();l(a,"keydown",J.handleEvent);l(a,"keypress",ra.handleEvent);l(a,"keyup",b);l(a,"beforecut",Y,!0);l(a,"cut",$);l(a,"copy",fa);l(a,"beforepaste",L,!0);l(a,"paste",oa);l(X,"mousedown",la);l(X,"mouseup",ua.handleMouseUp);l(a,"contextmenu",c);B.subscribe(ops.OdtDocument.signalOperationExecuted,
R);B.subscribe(ops.OdtDocument.signalOperationExecuted,G);a=new ops.OpAddCursor;a.init({memberid:m});n.enqueue(a);H&&H.saveInitialState()};this.endEditing=function(){var a;B.unsubscribe(ops.OdtDocument.signalOperationExecuted,G);B.unsubscribe(ops.OdtDocument.signalOperationExecuted,R);a=B.getOdfCanvas().getElement();d(a,"keydown",J.handleEvent);d(a,"keypress",ra.handleEvent);d(a,"keyup",b);d(a,"cut",$);d(a,"beforecut",Y);d(a,"copy",fa);d(a,"paste",oa);d(a,"beforepaste",L);d(X,"mousedown",la);d(X,
"mouseup",ua.handleMouseUp);d(a,"contextmenu",c);a=new ops.OpRemoveCursor;a.init({memberid:m});n.enqueue(a);H&&H.resetInitialState()};this.getInputMemberId=function(){return m};this.getSession=function(){return n};this.setUndoManager=function(a){H&&H.unsubscribe(gui.UndoManager.signalUndoStackChanged,ia);if(H=a)H.setOdtDocument(B),H.setPlaybackFunction(function(a){a.execute(B)}),H.subscribe(gui.UndoManager.signalUndoStackChanged,ia)};this.getUndoManager=function(){return H};this.close=function(a){a()};
(function(){var a=-1!==X.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;J.bind(c.Tab,b.None,function(){I("\t");return!0});J.bind(c.Left,b.None,p);J.bind(c.Right,b.None,r);J.bind(c.Up,b.None,y);J.bind(c.Down,b.None,s);J.bind(c.Backspace,b.None,U);J.bind(c.Delete,b.None,N);J.bind(c.Left,b.Shift,w);J.bind(c.Right,b.Shift,u);J.bind(c.Up,b.Shift,v);J.bind(c.Down,b.Shift,x);J.bind(c.Home,b.None,E);J.bind(c.End,b.None,O);J.bind(c.Home,b.Ctrl,
ca);J.bind(c.End,b.Ctrl,da);J.bind(c.Home,b.Shift,z);J.bind(c.End,b.Shift,P);J.bind(c.Up,b.CtrlShift,C);J.bind(c.Down,b.CtrlShift,K);J.bind(c.Home,b.CtrlShift,aa);J.bind(c.End,b.CtrlShift,ba);a?(J.bind(c.Clear,b.None,D),J.bind(c.Left,b.Meta,E),J.bind(c.Right,b.Meta,O),J.bind(c.Home,b.Meta,ca),J.bind(c.End,b.Meta,da),J.bind(c.Left,b.MetaShift,z),J.bind(c.Right,b.MetaShift,P),J.bind(c.Up,b.AltShift,C),J.bind(c.Down,b.AltShift,K),J.bind(c.Up,b.MetaShift,aa),J.bind(c.Down,b.MetaShift,ba),J.bind(c.A,b.Meta,
ea),J.bind(c.B,b.Meta,ha),J.bind(c.I,b.Meta,Z),J.bind(c.U,b.Meta,ka),J.bind(c.Z,b.Meta,pa),J.bind(c.Z,b.MetaShift,V)):(J.bind(c.A,b.Ctrl,ea),J.bind(c.B,b.Ctrl,ha),J.bind(c.I,b.Ctrl,Z),J.bind(c.U,b.Ctrl,ka),J.bind(c.Z,b.Ctrl,pa),J.bind(c.Z,b.CtrlShift,V));ra.setDefault(function(a){var b;b=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(I(b),!0)});ra.bind(c.Enter,b.None,S);ua.subscribe(gui.ClickHandler.signalSingleClick,
function(a){var b=a.target,c=null;if("annotationRemoveButton"===b.className){a=c=ma.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0];for(var b=0,c=gui.SelectionMover.createPositionIterator(B.getRootNode()),d=new core.LoopWatchDog(1E3),e=!1;c.nextPosition();)if(d.check(),e=Boolean(a.compareDocumentPosition(c.container())&Node.DOCUMENT_POSITION_CONTAINED_BY),1===na.acceptPosition(c)){if(e)break;b+=1}c=0;d=gui.SelectionMover.createPositionIterator(B.getRootNode());e=!1;d.setUnfilteredPosition(a,
0);do{e=Boolean(a.compareDocumentPosition(d.container())&Node.DOCUMENT_POSITION_CONTAINED_BY);if(!e&&a!==d.container())break;1===na.acceptPosition(d)&&(c+=1)}while(d.nextPosition());a=c;c=new ops.OpRemoveAnnotation;c.init({memberid:m,position:b,length:a});n.enqueue(c)}else f(a)});ua.subscribe(gui.ClickHandler.signalDoubleClick,t);ua.subscribe(gui.ClickHandler.signalTripleClick,k)})()};return gui.SessionController}();
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
ops.MemberModel=function(){};ops.MemberModel.prototype.getMemberDetailsAndUpdates=function(n,m){};ops.MemberModel.prototype.unsubscribeMemberDetailsUpdates=function(n,m){};ops.MemberModel.prototype.close=function(n){};
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
ops.TrivialMemberModel=function(){this.getMemberDetailsAndUpdates=function(n,m){m(n,null)};this.unsubscribeMemberDetailsUpdates=function(n,m){};this.close=function(n){n()}};
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(n){};ops.OperationRouter.prototype.setPlaybackFunction=function(n){};ops.OperationRouter.prototype.push=function(n){};ops.OperationRouter.prototype.close=function(n){};ops.OperationRouter.prototype.getHasLocalUnsyncedOpsAndUpdates=function(n){};ops.OperationRouter.prototype.unsubscribeHasLocalUnsyncedOpsUpdates=function(n){};
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
ops.TrivialOperationRouter=function(){var n,m;this.setOperationFactory=function(l){n=l};this.setPlaybackFunction=function(l){m=l};this.push=function(l){l=l.spec();l.timestamp=(new Date).getTime();l=n.create(l);m(l)};this.close=function(l){l()};this.getHasLocalUnsyncedOpsAndUpdates=function(l){l(!0)};this.unsubscribeHasLocalUnsyncedOpsUpdates=function(l){}};
// Input 70
gui.EditInfoHandle=function(n){var m=[],l,d=n.ownerDocument,b=d.documentElement.namespaceURI;this.setEdits=function(e){m=e;var a,h,f,c;l.innerHTML="";for(e=0;e<m.length;e+=1)a=d.createElementNS(b,"div"),a.className="editInfo",h=d.createElementNS(b,"span"),h.className="editInfoColor",h.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[e].memberid),f=d.createElementNS(b,"span"),f.className="editInfoAuthor",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[e].memberid),
c=d.createElementNS(b,"span"),c.className="editInfoTime",c.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[e].memberid),c.innerHTML=m[e].time,a.appendChild(h),a.appendChild(f),a.appendChild(c),l.appendChild(a)};this.show=function(){l.style.display="block"};this.hide=function(){l.style.display="none"};l=d.createElementNS(b,"div");l.setAttribute("class","editInfoHandle");l.style.display="none";n.appendChild(l)};
// Input 71
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(n,m){function l(b,d){return runtime.getWindow().setTimeout(function(){a.style.opacity=b},d)}var d=this,b,e,a,h,f;this.addEdit=function(b,d){var k=Date.now()-d;n.addEdit(b,d);e.setEdits(n.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);if(h){var m=h;runtime.getWindow().clearTimeout(m)}f&&(m=f,runtime.getWindow().clearTimeout(m));1E4>k?(l(1,0),h=l(0.5,1E4-k),f=l(0.2,2E4-k)):1E4<=k&&2E4>k?(l(0.5,0),f=l(0.2,2E4-k)):l(0.2,0)};this.getEdits=
function(){return n.getEdits()};this.clearEdits=function(){n.clearEdits();e.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return n};this.show=function(){a.style.display="block"};this.hide=function(){d.hideHandle();a.style.display="none"};this.showHandle=function(){e.show()};this.hideHandle=function(){e.hide()};(function(){var c=n.getOdtDocument().getDOM();a=c.createElementNS(c.documentElement.namespaceURI,
"div");a.setAttribute("class","editInfoMarker");a.onmouseover=function(){d.showHandle()};a.onmouseout=function(){d.hideHandle()};b=n.getNode();b.appendChild(a);e=new gui.EditInfoHandle(b);m||d.hide()})()};
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
gui.SessionView=function(){return function(n,m,l){function d(a,b,d){function e(b,d,f){d=b+'[editinfo|memberid^="'+a+'"]'+f+d;a:{var g=c.firstChild;for(b=b+'[editinfo|memberid^="'+a+'"]'+f;g;){if(g.nodeType===Node.TEXT_NODE&&0===g.data.indexOf(b)){b=g;break a}g=g.nextSibling}b=null}b?b.data=d:c.appendChild(document.createTextNode(d))}e("div.editInfoMarker","{ background-color: "+d+"; }","");e("span.editInfoColor","{ background-color: "+d+"; }","");e("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
e("dc|creator",'{ content: "'+b+'"; display: none;}',":before");e("dc|creator","{ background-color: "+d+"; }","")}function b(a){var b,c;for(c in t)t.hasOwnProperty(c)&&(b=t[c],a?b.show():b.hide())}function e(a){l.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function a(a,b){var c=l.getCaret(a);void 0===b?runtime.log('MemberModel sent undefined data for member "'+a+'".'):(null===b&&(b={memberid:a,fullname:"Unknown Identity",color:"black",imageurl:"avatar-joe.png"}),c&&(c.setAvatarImageUrl(b.imageurl),
c.setColor(b.color)),d(a,b.fullname,b.color))}function h(b){var c=b.getMemberId(),d=m.getMemberModel();l.registerCursor(b,q,g);a(c,null);d.getMemberDetailsAndUpdates(c,a);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function f(b){var c=!1,d;for(d in t)if(t.hasOwnProperty(d)&&t[d].getEditInfo().getEdits().hasOwnProperty(b)){c=!0;break}c||m.getMemberModel().unsubscribeMemberDetailsUpdates(b,a)}var c,t={},k=void 0!==n.editInfoMarkersInitiallyVisible?Boolean(n.editInfoMarkersInitiallyVisible):
!0,q=void 0!==n.caretAvatarsInitiallyVisible?Boolean(n.caretAvatarsInitiallyVisible):!0,g=void 0!==n.caretBlinksOnRangeSelect?Boolean(n.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=function(){k||(k=!0,b(k))};this.hideEditInfoMarkers=function(){k&&(k=!1,b(k))};this.showCaretAvatars=function(){q||(q=!0,e(q))};this.hideCaretAvatars=function(){q&&(q=!1,e(q))};this.getSession=function(){return m};this.getCaret=function(a){return l.getCaret(a)};this.close=function(a){a()};(function(){var a=m.getOdtDocument(),
b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,h);a.subscribe(ops.OdtDocument.signalCursorRemoved,f);a.subscribe(ops.OdtDocument.signalParagraphChanged,function(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",f=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0];f?(e=f.getAttributeNS("urn:webodf:names:editinfo","id"),d=t[e]):(e=Math.random().toString(),d=new ops.EditInfo(b,m.getOdtDocument()),d=new gui.EditInfoMarker(d,k),
f=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0],f.setAttributeNS("urn:webodf:names:editinfo","id",e),t[e]=d);d.addEdit(c,new Date(a))});c=document.createElementNS(b.namespaceURI,"style");c.type="text/css";c.media="screen, print, handheld, projection";c.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));c.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(c)})()}}();
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
gui.CaretManager=function(n){function m(a){return f.hasOwnProperty(a)?f[a]:null}function l(){return n.getSession().getOdtDocument().getOdfCanvas().getElement()}function d(a){a===n.getInputMemberId()&&l().removeAttribute("tabindex");delete f[a]}function b(a){a=a.getMemberId();a===n.getInputMemberId()&&(a=m(a))&&a.refreshCursorBlinking()}function e(a){a.memberId===n.getInputMemberId()&&(a=m(a.memberId))&&a.ensureVisible()}function a(){var a=m(n.getInputMemberId());a&&a.setFocus()}function h(){var a=
m(n.getInputMemberId());a&&a.removeFocus()}var f={};this.registerCursor=function(a,b,d){var e=a.getMemberId(),g=l();b=new gui.Caret(a,b,d);f[e]=b;e===n.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+e),a.handleUpdate=b.ensureVisible,g.setAttribute("tabindex",0),g.focus());return b};this.getCaret=m;this.getCarets=function(){return Object.keys(f).map(function(a){return f[a]})};(function(){var c=n.getSession().getOdtDocument(),f=l();c.subscribe(ops.OdtDocument.signalParagraphChanged,
e);c.subscribe(ops.OdtDocument.signalCursorMoved,b);c.subscribe(ops.OdtDocument.signalCursorRemoved,d);f.onfocus=a;f.onblur=h})()};
// Input 74
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var n=new xmldom.XPath,m=runtime.getWindow();return function(l){var d=this;d.setInitialSlideMode=function(){d.startSlideMode("single")};d.keyDownHandler=function(b){if(!b.target.isContentEditable&&"input"!==b.target.nodeName)switch(b.keyCode){case 84:d.toggleToolbar();break;case 37:case 8:d.prevSlide();break;case 39:case 32:d.nextSlide();break;case 36:d.firstSlide();break;case 35:d.lastSlide()}};d.root=function(){return d.odf_canvas.odfContainer().rootElement};d.firstSlide=
function(){d.slideChange(function(b,d){return 0})};d.lastSlide=function(){d.slideChange(function(b,d){return d-1})};d.nextSlide=function(){d.slideChange(function(b,d){return b+1<d?b+1:-1})};d.prevSlide=function(){d.slideChange(function(b,d){return 1>b?-1:b-1})};d.slideChange=function(b){var e=d.getPages(d.odf_canvas.odfContainer().rootElement),a=-1,h=0;e.forEach(function(b){b=b[1];b.hasAttribute("slide_current")&&(a=h,b.removeAttribute("slide_current"));h+=1});b=b(a,e.length);-1===b&&(b=a);e[b][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=b;"cont"===d.slide_mode&&m.scrollBy(0,e[b][1].getBoundingClientRect().top-30)};d.selectSlide=function(b){d.slideChange(function(d,a){return b>=a||0>b?-1:b})};d.scrollIntoContView=function(b){var e=d.getPages(d.odf_canvas.odfContainer().rootElement);0!==e.length&&m.scrollBy(0,e[b][1].getBoundingClientRect().top-30)};d.getPages=function(b){b=b.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var d=[],a;for(a=0;a<b.length;a+=1)d.push([b[a].getAttribute("draw:name"),
b[a]]);return d};d.fillPageList=function(b,e){for(var a=d.getPages(b),h,f,c;e.firstChild;)e.removeChild(e.firstChild);for(h=0;h<a.length;h+=1)f=document.createElement("option"),c=n.getODFElementsWithXPath(a[h][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),c=0<c.length?c[0].textContent:a[h][0],f.textContent=h+1+": "+c,e.appendChild(f)};d.startSlideMode=function(b){var e=document.getElementById("pagelist"),a=d.odf_canvas.slidevisibilitycss().sheet;for(d.slide_mode=
b;0<a.cssRules.length;)a.deleteRule(0);d.selectSlide(0);"single"===d.slide_mode?(a.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),a.insertRule("draw|page[slide_current]  { z-index:2;}",1),a.insertRule("draw|page  { -webkit-transform: scale(1);}",2),d.fitToWindow(),m.addEventListener("resize",d.fitToWindow,!1)):"cont"===d.slide_mode&&m.removeEventListener("resize",d.fitToWindow,!1);d.fillPageList(d.odf_canvas.odfContainer().rootElement,e)};d.toggleToolbar=function(){var b,
e,a;b=d.odf_canvas.slidevisibilitycss().sheet;e=-1;for(a=0;a<b.cssRules.length;a+=1)if(".toolbar"===b.cssRules[a].cssText.substring(0,8)){e=a;break}-1<e?b.deleteRule(e):b.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};d.fitToWindow=function(){var b=d.getPages(d.root()),e=(m.innerHeight-40)/b[0][1].clientHeight,b=(m.innerWidth-10)/b[0][1].clientWidth,e=e<b?e:b,b=d.odf_canvas.slidevisibilitycss().sheet;b.deleteRule(2);b.insertRule("draw|page { \n-moz-transform: scale("+
e+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+e+"); -o-transform-origin: 0% 0%; -o-transform: scale("+e+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+e+"); }",2)};d.load=function(b){d.odf_canvas.load(b)};d.odf_element=l;d.odf_canvas=new odf.OdfCanvas(d.odf_element);d.odf_canvas.addListener("statereadychange",d.setInitialSlideMode);d.slide_mode="undefined";document.addEventListener("keydown",d.keyDownHandler,!1)}}();
// Input 75
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(n,m){function l(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function d(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(){var a=n.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!p)||(a=a.getRangeAt(0),p.setPoint(a.startContainer,a.startOffset))}function e(){var a=n.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();p&&p.node()&&(b=p.node(),c=b.ownerDocument.createRange(),
c.setStart(b,p.position()),c.collapse(!0),a.addRange(c))}function a(a){var c=a.charCode||a.keyCode;if(p=null,p&&37===c)b(),p.stepBackward(),e();else if(16<=c&&20>=c||33<=c&&40>=c)return;d(a)}function h(a){d(a)}function f(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&f(b),b=b.nextSibling||b.parentNode;var c,d,e,b=a.attributes;c="";for(e=b.length-1;0<=e;e-=1)d=b.item(e),c=c+" "+d.nodeName+'="'+d.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(d=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&d.test(c.nodeValue)&&c.parentNode.removeChild(c)}function c(a,b){for(var d=a.firstChild,e,f,g;d&&d!==a;){if(d.nodeType===Node.ELEMENT_NODE)for(c(d,b),e=d.attributes,g=e.length-1;0<=g;g-=1)f=e.item(g),"http://www.w3.org/2000/xmlns/"!==f.namespaceURI||b[f.nodeValue]||(b[f.nodeValue]=f.localName);d=d.nextSibling||d.parentNode}}function t(){var a=n.ownerDocument.createElement("style"),b;b={};c(n,b);
var d={},e,f,g=0;for(e in b)if(b.hasOwnProperty(e)&&e){f=b[e];if(!f||d.hasOwnProperty(f)||"xmlns"===f){do f="ns"+g,g+=1;while(d.hasOwnProperty(f));b[e]=f}d[f]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+k;a.appendChild(n.ownerDocument.createTextNode(b));m=m.parentNode.replaceChild(a,m)}var k,q,g,p=null;n.id||(n.id="xml"+String(Math.random()).substring(2));q="#"+n.id+" ";k=q+"*,"+q+":visited, "+q+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
q+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+q+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+q+"{overflow: auto;}\n";(function(b){l(b,"click",h);l(b,"keydown",a);l(b,"drop",d);l(b,"dragend",d);l(b,"beforepaste",d);l(b,"paste",d)})(n);this.updateCSS=t;this.setXML=function(a){a=a.documentElement||a;g=a=n.ownerDocument.importNode(a,!0);for(f(a);n.lastChild;)n.removeChild(n.lastChild);n.appendChild(a);t();p=new core.PositionIterator(a)};this.getXML=
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(n,m){};gui.UndoManager.prototype.unsubscribe=function(n,m){};gui.UndoManager.prototype.setOdtDocument=function(n){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(n){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(n){};gui.UndoManager.prototype.moveBackward=function(n){};gui.UndoManager.prototype.onOperationExecuted=function(n){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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
gui.UndoStateRules=function(){function n(l){return l.spec().optype}function m(l){switch(n(l)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=n;this.isEditOperation=m;this.isPartOfOperationSet=function(l,d){if(m(l)){if(0===d.length)return!0;var b;if(b=m(d[d.length-1]))a:{b=d.filter(m);var e=n(l),a;b:switch(e){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&e===n(b[0])){if(1===b.length){b=!0;break a}e=b[b.length-2].spec().position;
b=b[b.length-1].spec().position;a=l.spec().position;if(b===a-(b-e)){b=!0;break a}}b=!1}return b}return!0}};
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
gui.TrivialUndoManager=function(n){function m(){r.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:a.hasUndoStates(),redoAvailable:a.hasRedoStates()})}function l(){q!==c&&q!==g[g.length-1]&&g.push(q)}function d(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);h.normalizeTextNodes(b)}function b(a){return Object.keys(a).map(function(b){return a[b]})}function e(a){function c(a){var b=a.spec();if(f[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete f[b.memberid],g-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},f={},g,h=a.pop();k.getCursors().forEach(function(a){f[a.getMemberId()]=!0});for(g=Object.keys(f).length;h&&0<g;)h.reverse(),h.forEach(c),h=a.pop();return b(d).concat(b(e))}var a=this,h=new core.DomUtils,f,c=[],t,k,q=[],g=[],p=[],r=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=n||new gui.UndoStateRules;this.subscribe=function(a,b){r.subscribe(a,b)};this.unsubscribe=function(a,b){r.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<g.length};this.hasRedoStates=function(){return 0<p.length};this.setOdtDocument=function(a){k=a};this.resetInitialState=function(){g.length=0;p.length=0;c.length=0;q.length=0;f=null;m()};this.saveInitialState=function(){var a=k.getOdfCanvas().odfContainer(),b=k.getOdfCanvas().getAnnotationManager();b&&b.forgetAnnotations();f=a.rootElement.cloneNode(!0);
k.getOdfCanvas().refreshAnnotations();a=f;h.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(d);h.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(d);l();g.unshift(c);q=c=e(g);g.length=0;p.length=0;m()};this.setPlaybackFunction=function(a){t=a};this.onOperationExecuted=function(a){p.length=0;w.isEditOperation(a)&&q===c||!w.isPartOfOperationSet(a,q)?(l(),q=[a],g.push(q),r.emit(gui.UndoManager.signalUndoStateCreated,{operations:q}),m()):(q.push(a),r.emit(gui.UndoManager.signalUndoStateModified,
{operations:q}))};this.moveForward=function(a){for(var b=0,c;a&&p.length;)c=p.pop(),g.push(c),c.forEach(t),a-=1,b+=1;b&&(q=g[g.length-1],m());return b};this.moveBackward=function(a){for(var b=k.getOdfCanvas(),d=b.odfContainer(),e=0;a&&g.length;)p.push(g.pop()),a-=1,e+=1;e&&(d.setRootElement(f.cloneNode(!0)),b.setOdfContainer(d,!0),r.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),k.getCursors().forEach(function(a){k.removeCursor(a.getMemberId())}),c.forEach(t),g.forEach(function(a){a.forEach(t)}),
b.refreshCSS(),q=g[g.length-1]||c,m());return e}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
ops.OdtDocument=function(n){function m(){var a=n.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function l(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var d=f[a].getNode();return b(c)===b(d)?t:k}}function d(a){var b=
gui.SelectionMover.createPositionIterator(m());for(a+=1;0<a&&b.nextPosition();)1===q.acceptPosition(b)&&(a-=1);return b}function b(a){return h.getParagraphElement(a)}function e(a){return n.getFormatting().getStyleElement(a,"paragraph")}var a=this,h,f={},c=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalStyleCreated,
ops.OdtDocument.signalStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),t=core.PositionFilter.FilterResult.FILTER_ACCEPT,k=core.PositionFilter.FilterResult.FILTER_REJECT,q;this.getIteratorAtPosition=d;this.upgradeWhitespacesAtPosition=function(a){a=d(a);var b,c,e;a.previousPosition();a.previousPosition();for(e=-1;1>=e;e+=1){b=a.container();c=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[c]&&h.isSignificantWhitespace(b,
c)){runtime.assert(" "===b.data[c],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=b.ownerDocument.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s");f.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(c,1);0<c&&(b=b.splitText(c));b.parentNode.insertBefore(f,b);b=f;a.moveToEndOfNode(b)}a.nextPosition()}};this.getParagraphStyleElement=e;this.getParagraphElement=b;this.getParagraphStyleAttributes=function(a){return(a=e(a))?n.getFormatting().getInheritedStyleAttributes(a):
null};this.getPositionInTextNode=function(b,c){var d=gui.SelectionMover.createPositionIterator(m()),e=null,h,k=0,l=null,n=b;runtime.assert(0<=b,"position must be >= 0");1===q.acceptPosition(d)?(h=d.container(),h.nodeType===Node.TEXT_NODE&&(e=h,k=0)):b+=1;for(;0<b||null===e;){if(!d.nextPosition())return null;if(1===q.acceptPosition(d))if(b-=1,h=d.container(),h.nodeType===Node.TEXT_NODE)h!==e?(e=h,k=d.domOffset()):k+=1;else if(null!==e){if(0===b){k=e.length;break}e=null}else if(0===b){e=m().ownerDocument.createTextNode("");
h.insertBefore(e,d.rightNode());k=0;break}}if(null===e)return null;if(c&&f[c]&&a.getCursorPosition(c)===n){for(l=f[c].getNode();0===k&&l.nextSibling&&"cursor"===l.nextSibling.localName;)l.parentNode.insertBefore(l,l.nextSibling.nextSibling);l&&0<e.length&&(e=m().ownerDocument.createTextNode(""),k=0,l.parentNode.insertBefore(e,l.nextSibling))}for(;0===k&&(e.previousSibling&&"cursor"===e.previousSibling.localName)&&(h=e.previousSibling,0<e.length&&(e=m().ownerDocument.createTextNode("")),h.parentNode.insertBefore(e,
h),l!==h););for(;e.previousSibling&&e.previousSibling.nodeType===Node.TEXT_NODE;)e.previousSibling.appendData(e.data),k=e.length+e.previousSibling.length,e=e.previousSibling,e.parentNode.removeChild(e.nextSibling);return{textNode:e,offset:k}};this.fixCursorPositions=function(b){var c,d,e,h=new core.PositionFilterChain;h.addFilter("BaseFilter",a.getPositionFilter());for(c in f)f.hasOwnProperty(c)&&(h.addFilter("RootFilter",a.createRootFilter(c)),d=f[c],e=d.getStepCounter(),e.isPositionWalkable(h)?
0===a.getCursorSelection(c).length&&d.move(0):(e=e.countStepsToValidPosition(h),d.move(e),c===b&&a.emit(ops.OdtDocument.signalCursorMoved,d)),h.removeFilter("RootFilter"))};this.getWalkableParagraphLength=function(a){var c=d(0),e=0;c.setUnfilteredPosition(a,0);do{if(b(c.container())!==a)break;1===q.acceptPosition(c)&&(e+=1)}while(c.nextPosition());return e};this.getDistanceFromCursor=function(a,b,c){a=f[a];var d=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");
a&&(a=a.getStepCounter().countStepsToPosition,d=a(b,c,q));return d};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,m(),0)};this.getCursorSelection=function(a){var b;a=f[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(m(),0,q),b=b(a.getAnchorNode(),0,q));return{position:c+b,length:-b}};this.getPositionFilter=function(){return q};this.getOdfCanvas=function(){return n};this.getRootNode=m;this.getDOM=function(){return m().ownerDocument};this.getCursor=function(a){return f[a]};
this.getCursors=function(){var a=[],b;for(b in f)f.hasOwnProperty(b)&&a.push(f[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countForwardSteps(1,q),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!f[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);a.move(b);f[c]=a};this.removeCursor=function(b){var c=f[b];return c?(c.removeFromOdtDocument(),
delete f[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=n.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return n.getFormatting()};this.getTextElements=function(a,b){return h.getTextElements(a,b)};this.getParagraphElements=function(a){return h.getParagraphElements(a)};
this.emit=function(a,b){c.emit(a,b)};this.subscribe=function(a,b){c.subscribe(a,b)};this.unsubscribe=function(a,b){c.unsubscribe(a,b)};this.createRootFilter=function(a){return new l(a)};this.close=function(a){a()};q=new function(){function a(b,c,d){var e,f;if(c&&(e=h.lookLeftForCharacter(c),1===e||2===e&&(h.scanRightForAnyCharacter(d)||h.scanRightForAnyCharacter(h.nextNode(b)))))return t;e=null===c&&h.isParagraph(b);f=h.lookRightForCharacter(d);if(e)return f?t:h.scanRightForAnyCharacter(d)?k:t;if(!f)return k;
c=c||h.previousNode(b);return h.scanLeftForAnyCharacter(c)?k:t}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,e,f,l;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return k;if(d===Node.TEXT_NODE){if(!h.isGroupingElement(c.parentNode)||h.isWithinTrackedChanges(c.parentNode,m()))return k;d=b.unfilteredDomOffset();e=c.data;runtime.assert(d!==e.length,"Unexpected offset.");if(0<d){b=e.substr(d-1,1);if(!h.isODFWhitespace(b))return t;if(1<d)if(b=e.substr(d-2,1),!h.isODFWhitespace(b))f=t;
else{if(!h.isODFWhitespace(e.substr(0,d)))return k}else l=h.previousNode(c),h.scanLeftForNonWhitespace(l)&&(f=t);if(f===t)return h.isTrailingWhitespace(c,d)?k:t;f=e.substr(d,1);return h.isODFWhitespace(f)?k:h.scanLeftForAnyCharacter(h.previousNode(c))?k:t}l=b.leftNode();f=c;c=c.parentNode;f=a(c,l,f)}else!h.isGroupingElement(c)||h.isWithinTrackedChanges(c,m())?f=k:(l=b.leftNode(),f=b.rightNode(),f=a(c,l,f));return f}};h=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";
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
ops.Session=function(n){var m=new ops.OperationFactory,l=new ops.OdtDocument(n),d=new ops.TrivialMemberModel,b=null;this.setMemberModel=function(b){d=b};this.setOperationFactory=function(d){m=d;b&&b.setOperationFactory(m)};this.setOperationRouter=function(d){b=d;d.setPlaybackFunction(function(a){a.execute(l);l.emit(ops.OdtDocument.signalOperationExecuted,a)});d.setOperationFactory(m)};this.getOperationRouter=function(){return b};this.getMemberModel=function(){return d};this.getOperationFactory=function(){return m};
this.getOdtDocument=function(){return l};this.enqueue=function(d){b.push(d)};this.close=function(b){l.close(function(a){a?b(a):b()})};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 81
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\noffice|text * draw|text-box {\n    /** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
