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
function Runtime(){}Runtime.ByteArray=function(h){};Runtime.prototype.getVariable=function(h){};Runtime.prototype.toJson=function(h){};Runtime.prototype.fromJson=function(h){};Runtime.ByteArray.prototype.slice=function(h,l){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(h){};Runtime.prototype.byteArrayFromString=function(h,l){};Runtime.prototype.byteArrayToString=function(h,l){};Runtime.prototype.concatByteArrays=function(h,l){};
Runtime.prototype.read=function(h,l,f,q){};Runtime.prototype.readFile=function(h,l,f){};Runtime.prototype.readFileSync=function(h,l){};Runtime.prototype.loadXML=function(h,l){};Runtime.prototype.writeFile=function(h,l,f){};Runtime.prototype.isFile=function(h,l){};Runtime.prototype.getFileSize=function(h,l){};Runtime.prototype.deleteFile=function(h,l){};Runtime.prototype.log=function(h,l){};Runtime.prototype.setTimeout=function(h,l){};Runtime.prototype.libraryPaths=function(){};
Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(h){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(h,l,f){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(h,l){function f(g){var a="",e,d=g.length;for(e=0;e<d;e+=1)a+=String.fromCharCode(g[e]&255);return a}function q(g){var a="",e,d=g.length,b,s,m,k;for(e=0;e<d;e+=1)b=g[e],128>b?a+=String.fromCharCode(b):(e+=1,s=g[e],194<=b&&224>b?a+=String.fromCharCode((b&31)<<6|s&63):(e+=1,m=g[e],224<=b&&240>b?a+=String.fromCharCode((b&15)<<12|(s&63)<<6|m&63):(e+=1,k=g[e],240<=b&&245>b&&(b=(b&7)<<18|(s&63)<<12|(m&63)<<6|k&63,b-=65536,a+=String.fromCharCode((b>>10)+55296,(b&1023)+56320)))));
return a}var p;"utf8"===l?p=q(h):("binary"!==l&&this.log("Unsupported encoding: "+l),p=f(h));return p};Runtime.getVariable=function(h){try{return eval(h)}catch(l){}};Runtime.toJson=function(h){return JSON.stringify(h)};Runtime.fromJson=function(h){return JSON.parse(h)};Runtime.getFunctionName=function(h){return void 0===h.name?(h=/function\s+(\w+)/.exec(h))&&h[1]:h.name};
function BrowserRuntime(h){function l(g,a){var e,d,b;void 0!==a?b=g:a=g;h?(d=h.ownerDocument,b&&(e=d.createElement("span"),e.className=b,e.appendChild(d.createTextNode(b)),h.appendChild(e),h.appendChild(d.createTextNode(" "))),e=d.createElement("span"),0<a.length&&"<"===a[0]?e.innerHTML=a:e.appendChild(d.createTextNode(a)),h.appendChild(e),h.appendChild(d.createElement("br"))):console&&console.log(a);"alert"===b&&alert(a)}var f=this,q={},p=window.ArrayBuffer&&window.Uint8Array;p&&(Uint8Array.prototype.slice=
function(g,a){void 0===a&&(void 0===g&&(g=0),a=this.length);var e=this.subarray(g,a),d,b;a-=g;d=new Uint8Array(new ArrayBuffer(a));for(b=0;b<a;b+=1)d[b]=e[b];return d});this.ByteArray=p?function(g){return new Uint8Array(new ArrayBuffer(g))}:function(g){var a=[];a.length=g;return a};this.concatByteArrays=p?function(g,a){var e,d=g.length,b=a.length,s=new this.ByteArray(d+b);for(e=0;e<d;e+=1)s[e]=g[e];for(e=0;e<b;e+=1)s[e+d]=a[e];return s}:function(g,a){return g.concat(a)};this.byteArrayFromArray=function(g){return g.slice()};
this.byteArrayFromString=function(g,a){var e;if("utf8"===a){e=g.length;var d,b,s,m=0;for(b=0;b<e;b+=1)s=g.charCodeAt(b),m+=1+(128<s)+(2048<s);d=new f.ByteArray(m);for(b=m=0;b<e;b+=1)s=g.charCodeAt(b),128>s?(d[m]=s,m+=1):2048>s?(d[m]=192|s>>>6,d[m+1]=128|s&63,m+=2):(d[m]=224|s>>>12&15,d[m+1]=128|s>>>6&63,d[m+2]=128|s&63,m+=3)}else for("binary"!==a&&f.log("unknown encoding: "+a),e=g.length,d=new f.ByteArray(e),b=0;b<e;b+=1)d[b]=g.charCodeAt(b)&255;return e=d};this.byteArrayToString=Runtime.byteArrayToString;
this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=function(g,a,e){function d(){var m;4===b.readyState&&(0!==b.status||b.responseText?200===b.status||0===b.status?(m="binary"===a?null!==b.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(b.responseBody)).toArray():f.byteArrayFromString(b.responseText,"binary"):b.responseText,q[g]=m,e(null,m)):e(b.responseText||b.statusText):e("File "+g+" is empty."))}if(q.hasOwnProperty(g))e(null,
q[g]);else{var b=new XMLHttpRequest;b.open("GET",g,!0);b.onreadystatechange=d;b.overrideMimeType&&("binary"!==a?b.overrideMimeType("text/plain; charset="+a):b.overrideMimeType("text/plain; charset=x-user-defined"));try{b.send(null)}catch(s){e(s.message)}}};this.read=function(g,a,e,d){function b(){var b;4===s.readyState&&(0!==s.status||s.responseText?200===s.status||0===s.status?(s.response?(b=s.response,b=new Uint8Array(b)):b=null!==s.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(s.responseBody)).toArray():
f.byteArrayFromString(s.responseText,"binary"),q[g]=b,d(null,b.slice(a,a+e))):d(s.responseText||s.statusText):d("File "+g+" is empty."))}if(q.hasOwnProperty(g))d(null,q[g].slice(a,a+e));else{var s=new XMLHttpRequest;s.open("GET",g,!0);s.onreadystatechange=b;s.overrideMimeType&&s.overrideMimeType("text/plain; charset=x-user-defined");s.responseType="arraybuffer";try{s.send(null)}catch(m){d(m.message)}}};this.readFileSync=function(g,a){var e=new XMLHttpRequest,d;e.open("GET",g,!1);e.overrideMimeType&&
("binary"!==a?e.overrideMimeType("text/plain; charset="+a):e.overrideMimeType("text/plain; charset=x-user-defined"));try{if(e.send(null),200===e.status||0===e.status)d=e.responseText}catch(b){}return d};this.writeFile=function(g,a,e){q[g]=a;var d=new XMLHttpRequest;d.open("PUT",g,!0);d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200<=d.status&&300>d.status||0===d.status?e(null):e("Status "+String(d.status)+": "+d.responseText||d.statusText):e("File "+g+" is empty."))};
a=a.buffer&&!d.sendAsBinary?a.buffer:f.byteArrayToString(a,"binary");try{d.sendAsBinary?d.sendAsBinary(a):d.send(a)}catch(b){f.log("HUH? "+b+" "+a),e(b.message)}};this.deleteFile=function(g,a){delete q[g];var e=new XMLHttpRequest;e.open("DELETE",g,!0);e.onreadystatechange=function(){4===e.readyState&&(200>e.status&&300<=e.status?a(e.responseText):a(null))};e.send(null)};this.loadXML=function(g,a){var e=new XMLHttpRequest;e.open("GET",g,!0);e.overrideMimeType&&e.overrideMimeType("text/xml");e.onreadystatechange=
function(){4===e.readyState&&(0!==e.status||e.responseText?200===e.status||0===e.status?a(null,e.responseXML):a(e.responseText):a("File "+g+" is empty."))};try{e.send(null)}catch(d){a(d.message)}};this.isFile=function(g,a){f.getFileSize(g,function(e){a(-1!==e)})};this.getFileSize=function(g,a){var e=new XMLHttpRequest;e.open("HEAD",g,!0);e.onreadystatechange=function(){if(4===e.readyState){var d=e.getResponseHeader("Content-Length");d?a(parseInt(d,10)):a(-1)}};e.send(null)};this.log=l;this.assert=
function(g,a,e){if(!g)throw l("alert","ASSERTION FAILED:\n"+a),e&&e(),a;};this.setTimeout=function(g,a){setTimeout(function(){g()},a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(g){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(g){return(new DOMParser).parseFromString(g,"text/xml")};this.exit=function(g){l("Calling exit with code "+String(g)+", but exit() is not implemented.")};
this.getWindow=function(){return window}}
function NodeJSRuntime(){function h(a,d,b){a=q.resolve(p,a);"binary"!==d?f.readFile(a,d,b):f.readFile(a,null,b)}var l=this,f=require("fs"),q=require("path"),p="",g,a;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var d=new Buffer(a.length),b,s=a.length;for(b=0;b<s;b+=1)d[b]=a[b];return d};this.concatByteArrays=function(a,d){var b=new Buffer(a.length+d.length);a.copy(b,0,0);d.copy(b,a.length,0);return b};this.byteArrayFromString=function(a,d){return new Buffer(a,
d)};this.byteArrayToString=function(a,d){return a.toString(d)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=h;this.loadXML=function(a,d){h(a,"utf-8",function(b,a){if(b)return d(b);d(null,l.parseXML(a))})};this.writeFile=function(a,d,b){a=q.resolve(p,a);f.writeFile(a,d,"binary",function(a){b(a||null)})};this.deleteFile=function(a,d){a=q.resolve(p,a);f.unlink(a,d)};this.read=function(a,d,b,s){a=q.resolve(p,a);f.open(a,"r+",666,function(a,
k){if(a)s(a);else{var c=new Buffer(b);f.read(k,c,0,b,d,function(b,a){f.close(k);s(b,c)})}})};this.readFileSync=function(a,d){return d?"binary"===d?f.readFileSync(a,null):f.readFileSync(a,d):""};this.isFile=function(a,d){a=q.resolve(p,a);f.stat(a,function(b,a){d(!b&&a.isFile())})};this.getFileSize=function(a,d){a=q.resolve(p,a);f.stat(a,function(b,a){b?d(-1):d(a.size)})};this.log=function(a,d){var b;void 0!==d?b=a:d=a;"alert"===b&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(d+
"\n");"alert"===b&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,d,b){a||(process.stderr.write("ASSERTION FAILED: "+d),b&&b())};this.setTimeout=function(a,d){setTimeout(function(){a()},d)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){p=a};this.currentDirectory=function(){return p};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=function(a){return g.parseFromString(a,"text/xml")};
this.exit=process.exit;this.getWindow=function(){return null};g=new (require("xmldom").DOMParser);a=l.parseXML("<a/>").implementation}
function RhinoRuntime(){function h(a,e){var d;void 0!==e?d=a:e=a;"alert"===d&&print("\n!!!!! ALERT !!!!!");print(e);"alert"===d&&print("!!!!! ALERT !!!!!")}var l=this,f=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),q,p,g="";f.setValidating(!1);f.setNamespaceAware(!0);f.setExpandEntityReferences(!1);f.setSchema(null);p=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,e){var d=new Packages.java.io.FileReader(e);return new Packages.org.xml.sax.InputSource(d)}});q=f.newDocumentBuilder();
q.setEntityResolver(p);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,e){var d=[],b,s=a.length;for(b=0;b<s;b+=1)d[b]=a.charCodeAt(b)&255;return d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,e){return a.concat(e)};this.loadXML=function(a,e){var d=new Packages.java.io.File(a),b;try{b=q.parse(d)}catch(s){print(s);
e(s);return}e(null,b)};this.readFile=function(a,e,d){g&&(a=g+"/"+a);var b=new Packages.java.io.File(a),s="binary"===e?"latin1":e;b.isFile()?(a=readFile(a,s),"binary"===e&&(a=l.byteArrayFromString(a,"binary")),d(null,a)):d(a+" is not a file.")};this.writeFile=function(a,e,d){g&&(a=g+"/"+a);a=new Packages.java.io.FileOutputStream(a);var b,s=e.length;for(b=0;b<s;b+=1)a.write(e[b]);a.close();d(null)};this.deleteFile=function(a,e){g&&(a=g+"/"+a);(new Packages.java.io.File(a))["delete"]()?e(null):e("Could not delete "+
a)};this.read=function(a,e,d,b){g&&(a=g+"/"+a);var s;s=a;var m="binary";(new Packages.java.io.File(s)).isFile()?("binary"===m&&(m="latin1"),s=readFile(s,m)):s=null;s?b(null,this.byteArrayFromString(s.substring(e,e+d),"binary")):b("Cannot read "+a)};this.readFileSync=function(a,e){return e?readFile(a,e):""};this.isFile=function(a,e){g&&(a=g+"/"+a);var d=new Packages.java.io.File(a);e(d.isFile())};this.getFileSize=function(a,e){g&&(a=g+"/"+a);var d=new Packages.java.io.File(a);e(d.length())};this.log=
h;this.assert=function(a,e,d){a||(h("alert","ASSERTION FAILED: "+e),d&&d())};this.setTimeout=function(a,e){a()};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){g=a};this.currentDirectory=function(){return g};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return q.getDOMImplementation()};this.parseXML=function(a){return q.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function h(f){var p=f[0],g;g=eval("if (typeof "+p+" === 'undefined') {eval('"+p+" = {};');}"+p);for(p=1;p<f.length-1;p+=1)g=g.hasOwnProperty(f[p])?g[f[p]]:g[f[p]]={};return g[f[f.length-1]]}var l={},f={};runtime.loadClass=function(q){function p(a){a=a.replace(/\./g,"/")+".js";var b=runtime.libraryPaths(),e,m,k;runtime.currentDirectory&&b.push(runtime.currentDirectory());for(e=0;e<b.length;e+=1){m=b[e];if(!f.hasOwnProperty(m))try{k=runtime.readFileSync(b[e]+"/manifest.js","utf8"),f[m]=
k&&k.length?eval(k):null}catch(c){f[m]=null,runtime.log("Cannot load manifest for "+m+".")}k=null;if((m=f[m])&&m.indexOf&&-1!==m.indexOf(a))return b[e]+"/"+a}return null}function g(a){var b,e;e=p(a);if(!e)throw a+" is not listed in any manifest.js.";try{b=runtime.readFileSync(e,"utf8")}catch(m){throw runtime.log("Error loading "+a+" "+m),m;}if(void 0===b)throw"Cannot load class "+a;b=b+("\n//# sourceURL="+e)+("\n//@ sourceURL="+e);try{b=eval(a+" = eval(code);")}catch(k){throw runtime.log("Error loading "+
a+" "+k),k;}return b}if(!IS_COMPILED_CODE&&!l.hasOwnProperty(q)){var a=q.split("."),e;e=h(a);if(!e&&(e=g(q),!e||Runtime.getFunctionName(e)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];l[q]=!0}}})();
(function(h){function l(f){if(f.length){var q=f[0];runtime.readFile(q,"utf8",function(p,g){function a(){var b;(b=eval(d))&&runtime.exit(b)}var e="";runtime.libraryPaths();var d=g;-1!==q.indexOf("/")&&(e=q.substring(0,q.indexOf("/")));runtime.setCurrentDirectory(e);p||null===d?(runtime.log(p),runtime.exit(1)):a.apply(null,f)})}}h=h?Array.prototype.slice.call(h):[];"NodeJSRuntime"===runtime.type()?l(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?l(h):l(h.slice(1))})("undefined"!==String(typeof arguments)&&
arguments);
// Input 2
core.Base64=function(){function h(b){var a=[],c,m=b.length;for(c=0;c<m;c+=1)a[c]=b.charCodeAt(c)&255;return a}function l(b){var a,c="",m,n=b.length-2;for(m=0;m<n;m+=3)a=b[m]<<16|b[m+1]<<8|b[m+2],c+=t[a>>>18],c+=t[a>>>12&63],c+=t[a>>>6&63],c+=t[a&63];m===n+1?(a=b[m]<<4,c+=t[a>>>6],c+=t[a&63],c+="=="):m===n&&(a=b[m]<<10|b[m+1]<<2,c+=t[a>>>12],c+=t[a>>>6&63],c+=t[a&63],c+="=");return c}function f(b){b=b.replace(/[^A-Za-z0-9+\/]+/g,"");var a=[],c=b.length%4,m,n=b.length,d;for(m=0;m<n;m+=4)d=(r[b.charAt(m)]||
0)<<18|(r[b.charAt(m+1)]||0)<<12|(r[b.charAt(m+2)]||0)<<6|(r[b.charAt(m+3)]||0),a.push(d>>16,d>>8&255,d&255);a.length-=[0,0,2,1][c];return a}function q(b){var a=[],c,m=b.length,n;for(c=0;c<m;c+=1)n=b[c],128>n?a.push(n):2048>n?a.push(192|n>>>6,128|n&63):a.push(224|n>>>12&15,128|n>>>6&63,128|n&63);return a}function p(b){var a=[],c,m=b.length,n,d,k;for(c=0;c<m;c+=1)n=b[c],128>n?a.push(n):(c+=1,d=b[c],224>n?a.push((n&31)<<6|d&63):(c+=1,k=b[c],a.push((n&15)<<12|(d&63)<<6|k&63)));return a}function g(b){return l(h(b))}
function a(b){return String.fromCharCode.apply(String,f(b))}function e(b){return p(h(b))}function d(b){b=p(b);for(var a="",c=0;c<b.length;)a+=String.fromCharCode.apply(String,b.slice(c,c+45E3)),c+=45E3;return a}function b(b,a,c){var m="",n,d,k;for(k=a;k<c;k+=1)a=b.charCodeAt(k)&255,128>a?m+=String.fromCharCode(a):(k+=1,n=b.charCodeAt(k)&255,224>a?m+=String.fromCharCode((a&31)<<6|n&63):(k+=1,d=b.charCodeAt(k)&255,m+=String.fromCharCode((a&15)<<12|(n&63)<<6|d&63)));return m}function s(a,c){function m(){var e=
k+n;e>a.length&&(e=a.length);d+=b(a,k,e);k=e;e=k===a.length;c(d,e)&&!e&&runtime.setTimeout(m,0)}var n=1E5,d="",k=0;a.length<n?c(b(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),m())}function m(b){return q(h(b))}function k(b){return String.fromCharCode.apply(String,q(b))}function c(b){return String.fromCharCode.apply(String,q(h(b)))}var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";(function(){var b=[],a;for(a=0;26>a;a+=1)b.push(65+a);for(a=0;26>a;a+=1)b.push(97+a);for(a=
0;10>a;a+=1)b.push(48+a);b.push(43);b.push(47);return b})();var r=function(b){var a={},c,m;c=0;for(m=b.length;c<m;c+=1)a[b.charAt(c)]=c;return a}(t),x,n,C=runtime.getWindow(),y,u;C&&C.btoa?(y=function(b){return C.btoa(b)},x=function(b){return y(c(b))}):(y=g,x=function(b){return l(m(b))});C&&C.atob?(u=function(b){return C.atob(b)},n=function(a){a=u(a);return b(a,0,a.length)}):(u=a,n=function(b){return d(f(b))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=l;this.convertBase64ToByteArray=
this.convertBase64ToUTF8Array=f;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=q;this.convertByteArrayToUTF16Array=this.convertUTF8ArrayToUTF16Array=p;this.convertUTF8StringToBase64=g;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=e;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=d;this.convertUTF8StringToUTF16String=s;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=m;this.convertUTF16ArrayToUTF8String=k;this.convertUTF16StringToUTF8String=
c;this.convertUTF16StringToBase64=x;this.convertBase64ToUTF16String=n;this.fromBase64=a;this.toBase64=g;this.atob=u;this.btoa=y;this.utob=c;this.btou=s;this.encode=x;this.encodeURI=function(b){return x(b).replace(/[+\/]/g,function(b){return"+"===b?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(b){return n(b.replace(/[\-_]/g,function(b){return"-"===b?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function h(){this.dl=this.fc=0}function l(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function f(b,a,c,m){this.good_length=b;this.max_lazy=a;this.nice_length=c;this.max_chain=m}function q(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=p;this.off=0}var p=8192,g,a,e,d,b=null,s,m,k,c,t,r,x,n,C,y,u,w,K,A,F,O,z,H,D,G,T,ba,V,ca,U,W,N,S,R,I,B,J,P,Q,Y,E,$,v,aa,ga,L,M,Z,X,sa,ha,ja,ea,ia,ma,ta,ua=[0,0,0,
0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ka=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],Ka=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ya=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],na;na=[new f(0,0,0,0),new f(4,4,8,4),new f(4,5,16,8),new f(4,6,32,32),new f(4,4,16,16),new f(8,16,32,32),new f(8,16,128,128),new f(8,32,128,256),new f(32,128,258,1024),new f(32,258,258,4096)];var oa=function(c){b[m+s++]=c;if(m+s===p){var n;if(0!==s){null!==g?(c=g,g=g.next):c=new q;
c.next=null;c.len=c.off=0;null===a?a=e=c:e=e.next=c;c.len=s-m;for(n=0;n<c.len;n++)c.ptr[n]=b[m+n];s=m=0}}},pa=function(a){a&=65535;m+s<p-2?(b[m+s++]=a&255,b[m+s++]=a>>>8):(oa(a&255),oa(a>>>8))},qa=function(){u=(u<<5^c[z+3-1]&255)&8191;w=x[32768+u];x[z&32767]=w;x[32768+u]=z},da=function(b,a){C>16-a?(n|=b<<C,pa(n),n=b>>16-C,C+=a-16):(n|=b<<C,C+=a)},fa=function(b,a){da(a[b].fc,a[b].dl)},za=function(b,a,c){return b[a].fc<b[c].fc||b[a].fc===b[c].fc&&$[a]<=$[c]},Aa=function(b,a,c){var m;for(m=0;m<c&&ta<
ma.length;m++)b[a+m]=ma.charCodeAt(ta++)&255;return m},va=function(){var b,a,m=65536-G-z;if(-1===m)m--;else if(65274<=z){for(b=0;32768>b;b++)c[b]=c[b+32768];H-=32768;z-=32768;y-=32768;for(b=0;8192>b;b++)a=x[32768+b],x[32768+b]=32768<=a?a-32768:0;for(b=0;32768>b;b++)a=x[b],x[b]=32768<=a?a-32768:0;m+=32768}D||(b=Aa(c,z+G,m),0>=b?D=!0:G+=b)},Ba=function(b){var a=T,m=z,n,d=O,k=32506<z?z-32506:0,e=z+258,r=c[m+d-1],g=c[m+d];O>=ca&&(a>>=2);do if(n=b,c[n+d]===g&&c[n+d-1]===r&&c[n]===c[m]&&c[++n]===c[m+1]){m+=
2;n++;do++m;while(c[m]===c[++n]&&c[++m]===c[++n]&&c[++m]===c[++n]&&c[++m]===c[++n]&&c[++m]===c[++n]&&c[++m]===c[++n]&&c[++m]===c[++n]&&c[++m]===c[++n]&&m<e);n=258-(e-m);m=e-258;if(n>d){H=b;d=n;if(258<=n)break;r=c[m+d-1];g=c[m+d]}}while((b=x[b&32767])>k&&0!==--a);return d},la=function(b,a){r[Z++]=a;0===b?U[a].fc++:(b--,U[v[a]+256+1].fc++,W[(256>b?aa[b]:aa[256+(b>>7)])&255].fc++,t[X++]=b,ha|=ja);ja<<=1;0===(Z&7)&&(M[sa++]=ha,ha=0,ja=1);if(2<V&&0===(Z&4095)){var c=8*Z,m=z-y,n;for(n=0;30>n;n++)c+=W[n].fc*
(5+ka[n]);c>>=3;if(X<parseInt(Z/2,10)&&c<parseInt(m/2,10))return!0}return 8191===Z||8192===X},wa=function(b,a){for(var c=Q[a],m=a<<1;m<=Y;){m<Y&&za(b,Q[m+1],Q[m])&&m++;if(za(b,c,Q[m]))break;Q[a]=Q[m];a=m;m<<=1}Q[a]=c},Ca=function(b,a){var c=0;do c|=b&1,b>>=1,c<<=1;while(0<--a);return c>>1},Da=function(b,a){var c=[];c.length=16;var m=0,n;for(n=1;15>=n;n++)m=m+P[n-1]<<1,c[n]=m;for(m=0;m<=a;m++)n=b[m].dl,0!==n&&(b[m].fc=Ca(c[n]++,n))},xa=function(b){var a=b.dyn_tree,c=b.static_tree,m=b.elems,n,d=-1,
k=m;Y=0;E=573;for(n=0;n<m;n++)0!==a[n].fc?(Q[++Y]=d=n,$[n]=0):a[n].dl=0;for(;2>Y;)n=Q[++Y]=2>d?++d:0,a[n].fc=1,$[n]=0,ea--,null!==c&&(ia-=c[n].dl);b.max_code=d;for(n=Y>>1;1<=n;n--)wa(a,n);do n=Q[1],Q[1]=Q[Y--],wa(a,1),c=Q[1],Q[--E]=n,Q[--E]=c,a[k].fc=a[n].fc+a[c].fc,$[k]=$[n]>$[c]+1?$[n]:$[c]+1,a[n].dl=a[c].dl=k,Q[1]=k++,wa(a,1);while(2<=Y);Q[--E]=Q[1];k=b.dyn_tree;n=b.extra_bits;var m=b.extra_base,c=b.max_code,e=b.max_length,r=b.static_tree,x,g,s,f,t=0;for(g=0;15>=g;g++)P[g]=0;k[Q[E]].dl=0;for(b=
E+1;573>b;b++)x=Q[b],g=k[k[x].dl].dl+1,g>e&&(g=e,t++),k[x].dl=g,x>c||(P[g]++,s=0,x>=m&&(s=n[x-m]),f=k[x].fc,ea+=f*(g+s),null!==r&&(ia+=f*(r[x].dl+s)));if(0!==t){do{for(g=e-1;0===P[g];)g--;P[g]--;P[g+1]+=2;P[e]--;t-=2}while(0<t);for(g=e;0!==g;g--)for(x=P[g];0!==x;)n=Q[--b],n>c||(k[n].dl!==g&&(ea+=(g-k[n].dl)*k[n].fc,k[n].fc=g),x--)}Da(a,d)},Ea=function(b,a){var c,m=-1,n,k=b[0].dl,d=0,e=7,g=4;0===k&&(e=138,g=3);b[a+1].dl=65535;for(c=0;c<=a;c++)n=k,k=b[c+1].dl,++d<e&&n===k||(d<g?R[n].fc+=d:0!==n?(n!==
m&&R[n].fc++,R[16].fc++):10>=d?R[17].fc++:R[18].fc++,d=0,m=n,0===k?(e=138,g=3):n===k?(e=6,g=3):(e=7,g=4))},Fa=function(){8<C?pa(n):0<C&&oa(n);C=n=0},Ga=function(b,a){var c,m=0,n=0,k=0,d=0,e,g;if(0!==Z){do 0===(m&7)&&(d=M[k++]),c=r[m++]&255,0===(d&1)?fa(c,b):(e=v[c],fa(e+256+1,b),g=ua[e],0!==g&&(c-=ga[e],da(c,g)),c=t[n++],e=(256>c?aa[c]:aa[256+(c>>7)])&255,fa(e,a),g=ka[e],0!==g&&(c-=L[e],da(c,g))),d>>=1;while(m<Z)}fa(256,b)},Ha=function(b,a){var c,m=-1,n,d=b[0].dl,k=0,e=7,g=4;0===d&&(e=138,g=3);for(c=
0;c<=a;c++)if(n=d,d=b[c+1].dl,!(++k<e&&n===d)){if(k<g){do fa(n,R);while(0!==--k)}else 0!==n?(n!==m&&(fa(n,R),k--),fa(16,R),da(k-3,2)):10>=k?(fa(17,R),da(k-3,3)):(fa(18,R),da(k-11,7));k=0;m=n;0===d?(e=138,g=3):n===d?(e=6,g=3):(e=7,g=4)}},Ia=function(){var b;for(b=0;286>b;b++)U[b].fc=0;for(b=0;30>b;b++)W[b].fc=0;for(b=0;19>b;b++)R[b].fc=0;U[256].fc=1;ha=Z=X=sa=ea=ia=0;ja=1},ra=function(b){var a,n,m,k;k=z-y;M[sa]=ha;xa(I);xa(B);Ea(U,I.max_code);Ea(W,B.max_code);xa(J);for(m=18;3<=m&&0===R[ya[m]].dl;m--);
ea+=3*(m+1)+14;a=ea+3+7>>3;n=ia+3+7>>3;n<=a&&(a=n);if(k+4<=a&&0<=y)for(da(0+b,3),Fa(),pa(k),pa(~k),m=0;m<k;m++)oa(c[y+m]);else if(n===a)da(2+b,3),Ga(N,S);else{da(4+b,3);k=I.max_code+1;a=B.max_code+1;m+=1;da(k-257,5);da(a-1,5);da(m-4,4);for(n=0;n<m;n++)da(R[ya[n]].dl,3);Ha(U,k-1);Ha(W,a-1);Ga(U,W)}Ia();0!==b&&Fa()},Ja=function(c,n,k){var d,e,r;for(d=0;null!==a&&d<k;){e=k-d;e>a.len&&(e=a.len);for(r=0;r<e;r++)c[n+d+r]=a.ptr[a.off+r];a.off+=e;a.len-=e;d+=e;0===a.len&&(e=a,a=a.next,e.next=g,g=e)}if(d===
k)return d;if(m<s){e=k-d;e>s-m&&(e=s-m);for(r=0;r<e;r++)c[n+d+r]=b[m+r];m+=e;d+=e;s===m&&(s=m=0)}return d},La=function(b,e,g){var r;if(!d){if(!D){C=n=0;var f,t;if(0===S[0].dl){I.dyn_tree=U;I.static_tree=N;I.extra_bits=ua;I.extra_base=257;I.elems=286;I.max_length=15;I.max_code=0;B.dyn_tree=W;B.static_tree=S;B.extra_bits=ka;B.extra_base=0;B.elems=30;B.max_length=15;B.max_code=0;J.dyn_tree=R;J.static_tree=null;J.extra_bits=Ka;J.extra_base=0;J.elems=19;J.max_length=7;for(t=f=J.max_code=0;28>t;t++)for(ga[t]=
f,r=0;r<1<<ua[t];r++)v[f++]=t;v[f-1]=t;for(t=f=0;16>t;t++)for(L[t]=f,r=0;r<1<<ka[t];r++)aa[f++]=t;for(f>>=7;30>t;t++)for(L[t]=f<<7,r=0;r<1<<ka[t]-7;r++)aa[256+f++]=t;for(r=0;15>=r;r++)P[r]=0;for(r=0;143>=r;)N[r++].dl=8,P[8]++;for(;255>=r;)N[r++].dl=9,P[9]++;for(;279>=r;)N[r++].dl=7,P[7]++;for(;287>=r;)N[r++].dl=8,P[8]++;Da(N,287);for(r=0;30>r;r++)S[r].dl=5,S[r].fc=Ca(r,5);Ia()}for(r=0;8192>r;r++)x[32768+r]=0;ba=na[V].max_lazy;ca=na[V].good_length;T=na[V].max_chain;y=z=0;G=Aa(c,0,65536);if(0>=G)D=
!0,G=0;else{for(D=!1;262>G&&!D;)va();for(r=u=0;2>r;r++)u=(u<<5^c[r]&255)&8191}a=null;m=s=0;3>=V?(O=2,F=0):(F=2,A=0);k=!1}d=!0;if(0===G)return k=!0,0}if((r=Ja(b,e,g))===g)return g;if(k)return r;if(3>=V)for(;0!==G&&null===a;){qa();0!==w&&32506>=z-w&&(F=Ba(w),F>G&&(F=G));if(3<=F)if(t=la(z-H,F-3),G-=F,F<=ba){F--;do z++,qa();while(0!==--F);z++}else z+=F,F=0,u=c[z]&255,u=(u<<5^c[z+1]&255)&8191;else t=la(0,c[z]&255),G--,z++;t&&(ra(0),y=z);for(;262>G&&!D;)va()}else for(;0!==G&&null===a;){qa();O=F;K=H;F=2;
0!==w&&(O<ba&&32506>=z-w)&&(F=Ba(w),F>G&&(F=G),3===F&&4096<z-H&&F--);if(3<=O&&F<=O){t=la(z-1-K,O-3);G-=O-1;O-=2;do z++,qa();while(0!==--O);A=0;F=2;z++;t&&(ra(0),y=z)}else 0!==A?la(0,c[z-1]&255)&&(ra(0),y=z):A=1,z++,G--;for(;262>G&&!D;)va()}0===G&&(0!==A&&la(0,c[z-1]&255),ra(1),k=!0);return r+Ja(b,r+e,g-r)};this.deflate=function(m,n){var k,f;ma=m;ta=0;"undefined"===String(typeof n)&&(n=6);(k=n)?1>k?k=1:9<k&&(k=9):k=6;V=k;D=d=!1;if(null===b){g=a=e=null;b=[];b.length=p;c=[];c.length=65536;t=[];t.length=
8192;r=[];r.length=32832;x=[];x.length=65536;U=[];U.length=573;for(k=0;573>k;k++)U[k]=new h;W=[];W.length=61;for(k=0;61>k;k++)W[k]=new h;N=[];N.length=288;for(k=0;288>k;k++)N[k]=new h;S=[];S.length=30;for(k=0;30>k;k++)S[k]=new h;R=[];R.length=39;for(k=0;39>k;k++)R[k]=new h;I=new l;B=new l;J=new l;P=[];P.length=16;Q=[];Q.length=573;$=[];$.length=573;v=[];v.length=256;aa=[];aa.length=512;ga=[];ga.length=29;L=[];L.length=30;M=[];M.length=1024}for(var s=Array(1024),q=[];0<(k=La(s,0,s.length));){var u=
[];u.length=k;for(f=0;f<k;f++)u[f]=String.fromCharCode(s[f]);q[q.length]=u.join("")}ma=null;return q.join("")}};
// Input 4
core.ByteArray=function(h){this.pos=0;this.data=h;this.readUInt32LE=function(){var l=this.data,f=this.pos+=4;return l[--f]<<24|l[--f]<<16|l[--f]<<8|l[--f]};this.readUInt16LE=function(){var l=this.data,f=this.pos+=2;return l[--f]<<8|l[--f]}};
// Input 5
core.ByteArrayWriter=function(h){var l=this,f=new runtime.ByteArray(0);this.appendByteArrayWriter=function(q){f=runtime.concatByteArrays(f,q.getByteArray())};this.appendByteArray=function(q){f=runtime.concatByteArrays(f,q)};this.appendArray=function(q){f=runtime.concatByteArrays(f,runtime.byteArrayFromArray(q))};this.appendUInt16LE=function(f){l.appendArray([f&255,f>>8&255])};this.appendUInt32LE=function(f){l.appendArray([f&255,f>>8&255,f>>16&255,f>>24&255])};this.appendString=function(q){f=runtime.concatByteArrays(f,
runtime.byteArrayFromString(q,h))};this.getLength=function(){return f.length};this.getByteArray=function(){return f}};
// Input 6
core.RawInflate=function(){var h,l,f=null,q,p,g,a,e,d,b,s,m,k,c,t,r,x,n=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],C=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],y=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],w=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],K=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],A=function(){this.list=this.next=null},F=function(){this.n=this.b=this.e=0;this.t=null},O=function(b,a,c,n,m,k){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var d=Array(this.BMAX+1),e,r,g,x,f,t,s,p=Array(this.BMAX+1),q,l,h,u=new F,C=Array(this.BMAX);x=Array(this.N_MAX);var y,w=Array(this.BMAX+1),G,z,D;D=this.root=null;for(f=0;f<d.length;f++)d[f]=0;for(f=0;f<p.length;f++)p[f]=0;for(f=0;f<C.length;f++)C[f]=null;for(f=0;f<x.length;f++)x[f]=
0;for(f=0;f<w.length;f++)w[f]=0;e=256<a?b[256]:this.BMAX;q=b;l=0;f=a;do d[q[l]]++,l++;while(0<--f);if(d[0]==a)this.root=null,this.status=this.m=0;else{for(t=1;t<=this.BMAX&&0==d[t];t++);s=t;k<t&&(k=t);for(f=this.BMAX;0!=f&&0==d[f];f--);g=f;k>f&&(k=f);for(G=1<<t;t<f;t++,G<<=1)if(0>(G-=d[t])){this.status=2;this.m=k;return}if(0>(G-=d[f]))this.status=2,this.m=k;else{d[f]+=G;w[1]=t=0;q=d;l=1;for(h=2;0<--f;)w[h++]=t+=q[l++];q=b;f=l=0;do 0!=(t=q[l++])&&(x[w[t]++]=f);while(++f<a);a=w[g];w[0]=f=0;q=x;l=0;
x=-1;y=p[0]=0;h=null;for(z=0;s<=g;s++)for(b=d[s];0<b--;){for(;s>y+p[1+x];){y+=p[1+x];x++;z=(z=g-y)>k?k:z;if((r=1<<(t=s-y))>b+1)for(r-=b+1,h=s;++t<z&&!((r<<=1)<=d[++h]);)r-=d[h];y+t>e&&y<e&&(t=e-y);z=1<<t;p[1+x]=t;h=Array(z);for(r=0;r<z;r++)h[r]=new F;D=null==D?this.root=new A:D.next=new A;D.next=null;D.list=h;C[x]=h;0<x&&(w[x]=f,u.b=p[x],u.e=16+t,u.t=h,t=(f&(1<<y)-1)>>y-p[x],C[x-1][t].e=u.e,C[x-1][t].b=u.b,C[x-1][t].n=u.n,C[x-1][t].t=u.t)}u.b=s-y;l>=a?u.e=99:q[l]<c?(u.e=256>q[l]?16:15,u.n=q[l++]):
(u.e=m[q[l]-c],u.n=n[q[l++]-c]);r=1<<s-y;for(t=f>>y;t<z;t+=r)h[t].e=u.e,h[t].b=u.b,h[t].n=u.n,h[t].t=u.t;for(t=1<<s-1;0!=(f&t);t>>=1)f^=t;for(f^=t;(f&(1<<y)-1)!=w[x];)y-=p[x],x--}this.m=p[1];this.status=0!=G&&1!=g?1:0}}},z=function(b){for(;a<b;){var c=g,n;n=r.length==x?-1:r[x++];g=c|n<<a;a+=8}},H=function(b){return g&n[b]},D=function(b){g>>=b;a-=b},G=function(a,n,d){var r,f,g;if(0==d)return 0;for(g=0;;){z(c);f=m.list[H(c)];for(r=f.e;16<r;){if(99==r)return-1;D(f.b);r-=16;z(r);f=f.t[H(r)];r=f.e}D(f.b);
if(16==r)l&=32767,a[n+g++]=h[l++]=f.n;else{if(15==r)break;z(r);b=f.n+H(r);D(r);z(t);f=k.list[H(t)];for(r=f.e;16<r;){if(99==r)return-1;D(f.b);r-=16;z(r);f=f.t[H(r)];r=f.e}D(f.b);z(r);s=l-f.n-H(r);for(D(r);0<b&&g<d;)b--,s&=32767,l&=32767,a[n+g++]=h[l++]=h[s++]}if(g==d)return d}e=-1;return g},T,ba=function(b,a,n){var d,r,e,f,g,x,s,p=Array(316);for(d=0;d<p.length;d++)p[d]=0;z(5);x=257+H(5);D(5);z(5);s=1+H(5);D(5);z(4);d=4+H(4);D(4);if(286<x||30<s)return-1;for(r=0;r<d;r++)z(3),p[K[r]]=H(3),D(3);for(;19>
r;r++)p[K[r]]=0;c=7;r=new O(p,19,19,null,null,c);if(0!=r.status)return-1;m=r.root;c=r.m;f=x+s;for(d=e=0;d<f;)if(z(c),g=m.list[H(c)],r=g.b,D(r),r=g.n,16>r)p[d++]=e=r;else if(16==r){z(2);r=3+H(2);D(2);if(d+r>f)return-1;for(;0<r--;)p[d++]=e}else{17==r?(z(3),r=3+H(3),D(3)):(z(7),r=11+H(7),D(7));if(d+r>f)return-1;for(;0<r--;)p[d++]=0;e=0}c=9;r=new O(p,x,257,C,y,c);0==c&&(r.status=1);if(0!=r.status)return-1;m=r.root;c=r.m;for(d=0;d<s;d++)p[d]=p[d+x];t=6;r=new O(p,s,0,u,w,t);k=r.root;t=r.m;return 0==t&&
257<x||0!=r.status?-1:G(b,a,n)};this.inflate=function(n,K){null==h&&(h=Array(65536));a=g=l=0;e=-1;d=!1;b=s=0;m=null;r=n;x=0;var A=new runtime.ByteArray(K);a:{var F,N;for(F=0;F<K&&(!d||-1!=e);){if(0<b){if(0!=e)for(;0<b&&F<K;)b--,s&=32767,l&=32767,A[0+F++]=h[l++]=h[s++];else{for(;0<b&&F<K;)b--,l&=32767,z(8),A[0+F++]=h[l++]=H(8),D(8);0==b&&(e=-1)}if(F==K)break}if(-1==e){if(d)break;z(1);0!=H(1)&&(d=!0);D(1);z(2);e=H(2);D(2);m=null;b=0}switch(e){case 0:N=A;var S=0+F,R=K-F,I=void 0,I=a&7;D(I);z(16);I=H(16);
D(16);z(16);if(I!=(~g&65535))N=-1;else{D(16);b=I;for(I=0;0<b&&I<R;)b--,l&=32767,z(8),N[S+I++]=h[l++]=H(8),D(8);0==b&&(e=-1);N=I}break;case 1:if(null!=m)N=G(A,0+F,K-F);else b:{N=A;S=0+F;R=K-F;if(null==f){for(var B=void 0,I=Array(288),B=void 0,B=0;144>B;B++)I[B]=8;for(;256>B;B++)I[B]=9;for(;280>B;B++)I[B]=7;for(;288>B;B++)I[B]=8;p=7;B=new O(I,288,257,C,y,p);if(0!=B.status){alert("HufBuild error: "+B.status);N=-1;break b}f=B.root;p=B.m;for(B=0;30>B;B++)I[B]=5;T=5;B=new O(I,30,0,u,w,T);if(1<B.status){f=
null;alert("HufBuild error: "+B.status);N=-1;break b}q=B.root;T=B.m}m=f;k=q;c=p;t=T;N=G(N,S,R)}break;case 2:N=null!=m?G(A,0+F,K-F):ba(A,0+F,K-F);break;default:N=-1}if(-1==N)break a;F+=N}}r=null;return A}};
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
core.LoopWatchDog=function(h,l){var f=Date.now(),q=0;this.check=function(){var p;if(h&&(p=Date.now(),p-f>h))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<l&&(q+=1,q>l))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.DomUtils=function(){function h(l,f){if(l.nodeType===Node.TEXT_NODE)if(0===l.length)l.parentNode.removeChild(l);else if(f.nodeType===Node.TEXT_NODE)return f.insertData(0,l.data),l.parentNode.removeChild(l),f;return l}this.splitBoundaries=function(l){var f=[],q;0!==l.endOffset&&(l.endContainer.nodeType===Node.TEXT_NODE&&l.endOffset!==l.endContainer.length)&&(f.push(l.endContainer.splitText(l.endOffset)),f.push(l.endContainer));0!==l.startOffset&&(l.startContainer.nodeType===Node.TEXT_NODE&&l.startOffset!==
l.startContainer.length)&&(q=l.startContainer.splitText(l.startOffset),f.push(l.startContainer),f.push(q),l.setStart(q,0));return f};this.normalizeTextNodes=function(l){l&&l.nextSibling&&(l=h(l,l.nextSibling));l&&l.previousSibling&&h(l.previousSibling,l)};this.rangeContainsNode=function(l,f){var q=f.ownerDocument.createRange(),p=f.nodeType===Node.TEXT_NODE?f.length:f.childNodes.length;q.setStart(l.startContainer,l.startOffset);q.setEnd(l.endContainer,l.endOffset);p=0===q.comparePoint(f,0)&&0===q.comparePoint(f,
p);q.detach();return p};this.mergeIntoParent=function(l){for(var f=l.parentNode;l.firstChild;)f.insertBefore(l.firstChild,l);f.removeChild(l);return f};this.getElementsByTagNameNS=function(l,f,q){return Array.prototype.slice.call(l.getElementsByTagNameNS(f,q))}};
// Input 9
runtime.loadClass("core.DomUtils");
core.Cursor=function(h,l){function f(b){b.parentNode&&(e.push(b.previousSibling),e.push(b.nextSibling),b.parentNode.removeChild(b))}function q(b,a,c){if(a.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(a),"putCursorIntoTextNode: invalid container");var d=a.parentNode;runtime.assert(Boolean(d),"putCursorIntoTextNode: container without parent");runtime.assert(0<=c&&c<=a.length,"putCursorIntoTextNode: offset is out of bounds");0===c?d.insertBefore(b,a):(c!==a.length&&a.splitText(c),d.insertBefore(b,
a.nextSibling))}else if(a.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(a),"putCursorIntoContainer: invalid container");for(d=a.firstChild;null!==d&&0<c;)d=d.nextSibling,c-=1;a.insertBefore(b,d)}e.push(b.previousSibling);e.push(b.nextSibling)}var p=h.createElementNS("urn:webodf:names:cursor","cursor"),g=h.createElementNS("urn:webodf:names:cursor","anchor"),a,e=[],d,b,s=new core.DomUtils;this.getNode=function(){return p};this.getAnchorNode=function(){return g.parentNode?g:p};this.getSelectedRange=
function(){b?(d.setStartBefore(p),d.collapse(!0)):(d.setStartAfter(a?g:p),d.setEndBefore(a?p:g));return d};this.setSelectedRange=function(m,k){d&&d!==m&&d.detach();d=m;a=!1!==k;(b=m.collapsed)?(f(g),f(p),q(p,m.startContainer,m.startOffset)):(f(g),f(p),q(a?p:g,m.endContainer,m.endOffset),q(a?g:p,m.startContainer,m.startOffset));e.forEach(s.normalizeTextNodes);e.length=0};this.remove=function(){f(p);e.forEach(s.normalizeTextNodes);e.length=0};p.setAttributeNS("urn:webodf:names:cursor","memberId",l);
g.setAttributeNS("urn:webodf:names:cursor","memberId",l)};
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
core.EventNotifier=function(h){var l={};this.emit=function(f,q){var p,g;runtime.assert(l.hasOwnProperty(f),'unknown event fired "'+f+'"');g=l[f];for(p=0;p<g.length;p+=1)g[p](q)};this.subscribe=function(f,q){runtime.assert(l.hasOwnProperty(f),'tried to subscribe to unknown event "'+f+'"');l[f].push(q);runtime.log('event "'+f+'" subscribed.')};this.unsubscribe=function(f,q){var p;runtime.assert(l.hasOwnProperty(f),'tried to unsubscribe from unknown event "'+f+'"');p=l[f].indexOf(q);runtime.assert(-1!==
p,'tried to unsubscribe unknown callback from event "'+f+'"');-1!==p&&l[f].splice(p,1);runtime.log('event "'+f+'" unsubscribed.')};(function(){var f;for(f=0;f<h.length;f+=1)l[h[f]]=[]})()};
// Input 11
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var h=runtime.getWindow().document,l=h.getElementById("testarea");runtime.assert(!l,'Unclean test environment, found a div with id "testarea".');l=h.createElement("div");l.setAttribute("id","testarea");h.body.appendChild(l);return l};
core.UnitTest.cleanupTestAreaDiv=function(){var h=runtime.getWindow().document,l=h.getElementById("testarea");runtime.assert(!!l&&l.parentNode===h.body,'Test environment broken, found no div with id "testarea" below body.');h.body.removeChild(l)};
core.UnitTestRunner=function(){function h(d){a+=1;runtime.log("fail",d)}function l(a,b){var e;try{if(a.length!==b.length)return h("array of length "+a.length+" should be "+b.length+" long"),!1;for(e=0;e<a.length;e+=1)if(a[e]!==b[e])return h(a[e]+" should be "+b[e]+" at array index "+e),!1}catch(m){return!1}return!0}function f(a,b,e){var m=a.attributes,k=m.length,c,g,r;for(c=0;c<k;c+=1)if(g=m.item(c),"xmlns"!==g.prefix){r=b.getAttributeNS(g.namespaceURI,g.localName);if(!b.hasAttributeNS(g.namespaceURI,
g.localName))return h("Attribute "+g.localName+" with value "+g.value+" was not present"),!1;if(r!==g.value)return h("Attribute "+g.localName+" was "+r+" should be "+g.value),!1}return e?!0:f(b,a,!0)}function q(a,b){if(a.nodeType!==b.nodeType)return h(a.nodeType+" should be "+b.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===b.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==b.namespaceURI||a.localName!==b.localName)return h(a.namespaceURI+
" should be "+b.namespaceURI),!1;if(!f(a,b,!1))return!1;for(var e=a.firstChild,m=b.firstChild;e;){if(!m||!q(e,m))return!1;e=e.nextSibling;m=m.nextSibling}return m?!1:!0}function p(a,b){return 0===b?a===b&&1/a===1/b:a===b?!0:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?l(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?q(b,a):e(b,a):!1}function g(a,b,e){"string"===typeof b&&
"string"===typeof e||runtime.log("WARN: shouldBe() expects string arguments");var m,k;try{k=eval(b)}catch(c){m=c}a=eval(e);m?h(b+" should be "+a+". Threw exception "+m):p(k,a)?runtime.log("pass",b+" is "+e):String(typeof k)===String(typeof a)?(e=0===k&&0>1/k?"-0":String(k),h(b+" should be "+a+". Was "+e+".")):h(b+" should be "+a+" (of type "+typeof a+"). Was "+k+" (of type "+typeof k+").")}var a=0,e;e=function(a,b){var e=Object.keys(a),m=Object.keys(b);e.sort();m.sort();return l(e,m)&&Object.keys(a).every(function(m){var c=
a[m],e=b[m];return p(c,e)?!0:(h(c+" should be "+e+" for key "+m),!1)})};this.areNodesEqual=q;this.shouldBeNull=function(a,b){g(a,b,"null")};this.shouldBeNonNull=function(a,b){var e,m;try{m=eval(b)}catch(k){e=k}e?h(b+" should be non-null. Threw exception "+e):null!==m?runtime.log("pass",b+" is non-null."):h(b+" should be non-null. Was "+m)};this.shouldBe=g;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function h(f,p){return"<span style='color:blue;cursor:pointer' onclick='"+p+"'>"+f+"</span>"}var l=0,f={};this.runTests=function(q,p,g){function a(c){if(0===c.length)f[e]=s,l+=d.countFailedTests(),p();else{k=c[0];var n=Runtime.getFunctionName(k);runtime.log("Running "+n);t=d.countFailedTests();b.setUp();k(function(){b.tearDown();s[n]=t===d.countFailedTests();a(c.slice(1))})}}var e=Runtime.getFunctionName(q),d=new core.UnitTestRunner,b=new q(d),s={},m,k,c,t,r="BrowserRuntime"===
runtime.type();if(f.hasOwnProperty(e))runtime.log("Test "+e+" has already run.");else{r?runtime.log("<span>Running "+h(e,'runSuite("'+e+'");')+": "+b.description()+"</span>"):runtime.log("Running "+e+": "+b.description);c=b.tests();for(m=0;m<c.length;m+=1)k=c[m],q=Runtime.getFunctionName(k)||k.testName,g.length&&-1===g.indexOf(q)||(r?runtime.log("<span>Running "+h(q,'runTest("'+e+'","'+q+'")')+"</span>"):runtime.log("Running "+q),t=d.countFailedTests(),b.setUp(),k(),b.tearDown(),s[q]=t===d.countFailedTests());
a(b.asyncTests())}};this.countFailedTests=function(){return l};this.results=function(){return f}};
// Input 12
core.PositionIterator=function(h,l,f,q){function p(){this.acceptNode=function(b){return b.nodeType===Node.TEXT_NODE&&0===b.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function g(b){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:b.acceptNode(a)}}function a(){var a=d.currentNode.nodeType;b=a===Node.TEXT_NODE?d.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var e=this,d,b,s;this.nextPosition=function(){if(d.currentNode===h)return!1;
if(0===b&&d.currentNode.nodeType===Node.ELEMENT_NODE)null===d.firstChild()&&(b=1);else if(d.currentNode.nodeType===Node.TEXT_NODE&&b+1<d.currentNode.length)b+=1;else if(null!==d.nextSibling())b=0;else if(d.parentNode())b=1;else return!1;return!0};this.previousPosition=function(){var m=!0;if(0===b)if(null===d.previousSibling()){if(!d.parentNode()||d.currentNode===h)return d.firstChild(),!1;b=0}else a();else d.currentNode.nodeType===Node.TEXT_NODE?b-=1:null!==d.lastChild()?a():d.currentNode===h?m=!1:
b=0;return m};this.container=function(){var a=d.currentNode,k=a.nodeType;return 0===b&&k!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=d.currentNode,k=a.nodeType;if(k===Node.TEXT_NODE&&b===a.length)for(a=a.nextSibling;a&&1!==s(a);)a=a.nextSibling;else k===Node.ELEMENT_NODE&&1===b&&(a=null);return a};this.leftNode=function(){var a=d.currentNode;if(0===b)for(a=a.previousSibling;a&&1!==s(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==s(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return d.currentNode};this.domOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return b;var a=0,k=d.currentNode,c;for(c=1===b?d.lastChild():d.previousSibling();c;)a+=1,c=d.previousSibling();d.currentNode=k;return a};this.unfilteredDomOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return b;for(var a=0,k=d.currentNode,k=1===b?k.lastChild:k.previousSibling;k;)a+=1,k=k.previousSibling;return a};this.textOffset=function(){if(d.currentNode.nodeType!==
Node.TEXT_NODE)return 0;for(var a=b,k=d.currentNode;d.previousSibling()&&d.currentNode.nodeType===Node.TEXT_NODE;)a+=d.currentNode.length;d.currentNode=k;return a};this.getPreviousSibling=function(){var a=d.currentNode,b=d.previousSibling();d.currentNode=a;return b};this.getNextSibling=function(){var a=d.currentNode,b=d.nextSibling();d.currentNode=a;return b};this.text=function(){var a,b="",c=e.textNeighborhood();for(a=0;a<c.length;a+=1)b+=c[a].data;return b};this.textNeighborhood=function(){var a=
d.currentNode,b=[];if(a.nodeType!==Node.TEXT_NODE)return b;for(;d.previousSibling();)if(d.currentNode.nodeType!==Node.TEXT_NODE){d.nextSibling();break}do b.push(d.currentNode);while(d.nextSibling()&&d.currentNode.nodeType===Node.TEXT_NODE);d.currentNode=a;return b};this.substr=function(a,b){return e.text().substr(a,b)};this.setUnfilteredPosition=function(a,k){var c;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");d.currentNode=a;if(a.nodeType===
Node.TEXT_NODE)return b=k,runtime.assert(k<=a.length,"Error in setPosition: "+k+" > "+a.length),runtime.assert(0<=k,"Error in setPosition: "+k+" < 0"),k===a.length&&(b=void 0,d.nextSibling()?b=0:d.parentNode()&&(b=1),runtime.assert(void 0!==b,"Error in setPosition: position not valid.")),!0;c=s(a);k<a.childNodes.length&&c!==NodeFilter.FILTER_REJECT?(d.currentNode=a.childNodes[k],c=s(d.currentNode),b=0):b=0===k?0:1;c===NodeFilter.FILTER_REJECT&&(b=1);if(c!==NodeFilter.FILTER_ACCEPT)return e.nextPosition();
runtime.assert(s(d.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");return!0};this.moveToEnd=function(){d.currentNode=h;b=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?e.setUnfilteredPosition(a,a.length):(d.currentNode=a,b=1)};this.getNodeFilter=function(){return s};s=(f?new g(f):new p).acceptNode;s.acceptNode=s;d=h.ownerDocument.createTreeWalker(h,l||4294967295,s,q);b=0;null===d.firstChild()&&(b=1)};
// Input 13
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(h){};(function(){return core.PositionFilter})();
// Input 14
core.Async=function(){this.forEach=function(h,l,f){function q(e){a!==g&&(e?(a=g,f(e)):(a+=1,a===g&&f(null)))}var p,g=h.length,a=0;for(p=0;p<g;p+=1)l(h[p],q)}};
// Input 15
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(h,l){function f(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],c,n,r=a.length,k=0,k=0;c=-1;for(n=0;n<r;n+=1)k=(c^a[n])&255,k=b[k],c=c>>>8^k;return c^-1}function q(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function p(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function g(a,b){var c,n,k,r,d,m,e,f=this;this.load=function(b){if(void 0!==f.data)b(null,f.data);else{var c=d+34+n+k+256;c+e>t&&(c=t-e);runtime.read(a,e,c,function(c,n){if(c||null===n)b(c,n);else a:{var k=n,e=new core.ByteArray(k),g=e.readUInt32LE(),t;if(67324752!==g)b("File entry signature is wrong."+g.toString()+" "+k.length.toString(),null);else{e.pos+=22;g=e.readUInt16LE();t=e.readUInt16LE();e.pos+=g+t;
if(r){k=k.slice(e.pos,e.pos+d);if(d!==k.length){b("The amount of compressed bytes read was "+k.length.toString()+" instead of "+d.toString()+" for "+f.filename+" in "+a+".",null);break a}k=x(k,m)}else k=k.slice(e.pos,e.pos+m);m!==k.length?b("The amount of bytes read was "+k.length.toString()+" instead of "+m.toString()+" for "+f.filename+" in "+a+".",null):(f.data=k,b(null,k))}}})}};this.set=function(a,b,c,n){f.filename=a;f.data=b;f.compressed=c;f.date=n};this.error=null;b&&(c=b.readUInt32LE(),33639248!==
c?this.error="Central directory entry has wrong signature at position "+(b.pos-4).toString()+' for file "'+a+'": '+b.data.length.toString():(b.pos+=6,r=b.readUInt16LE(),this.date=q(b.readUInt32LE()),b.readUInt32LE(),d=b.readUInt32LE(),m=b.readUInt32LE(),n=b.readUInt16LE(),k=b.readUInt16LE(),c=b.readUInt16LE(),b.pos+=8,e=b.readUInt32LE(),this.filename=runtime.byteArrayToString(b.data.slice(b.pos,b.pos+n),"utf8"),b.pos+=n+k+c))}function a(a,b){if(22!==a.length)b("Central directory length should be 22.",
n);else{var k=new core.ByteArray(a),d;d=k.readUInt32LE();101010256!==d?b("Central directory signature is wrong: "+d.toString(),n):(d=k.readUInt16LE(),0!==d?b("Zip files with non-zero disk numbers are not supported.",n):(d=k.readUInt16LE(),0!==d?b("Zip files with non-zero disk numbers are not supported.",n):(d=k.readUInt16LE(),r=k.readUInt16LE(),d!==r?b("Number of entries is inconsistent.",n):(d=k.readUInt32LE(),k=k.readUInt16LE(),k=t-22-d,runtime.read(h,k,t-k,function(a,k){if(a||null===k)b(a,n);else a:{var d=
new core.ByteArray(k),m,e;c=[];for(m=0;m<r;m+=1){e=new g(h,d);if(e.error){b(e.error,n);break a}c[c.length]=e}b(null,n)}})))))}}function e(a,b){var n=null,k,d;for(d=0;d<c.length;d+=1)if(k=c[d],k.filename===a){n=k;break}n?n.data?b(null,n.data):n.load(b):b(a+" not found.",null)}function d(a){var b=new core.ByteArrayWriter("utf8"),c=0;b.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(c=a.data.length);b.appendUInt32LE(p(a.date));b.appendUInt32LE(f(a.data));b.appendUInt32LE(c);b.appendUInt32LE(c);b.appendUInt16LE(a.filename.length);
b.appendUInt16LE(0);b.appendString(a.filename);a.data&&b.appendByteArray(a.data);return b}function b(a,b){var c=new core.ByteArrayWriter("utf8"),n=0;c.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(n=a.data.length);c.appendUInt32LE(p(a.date));c.appendUInt32LE(f(a.data));c.appendUInt32LE(n);c.appendUInt32LE(n);c.appendUInt16LE(a.filename.length);c.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);c.appendUInt32LE(b);c.appendString(a.filename);return c}function s(a,b){if(a===c.length)b(null);else{var n=c[a];
void 0!==n.data?s(a+1,b):n.load(function(c){c?b(c):s(a+1,b)})}}function m(a,n){s(0,function(k){if(k)n(k);else{k=new core.ByteArrayWriter("utf8");var r,m,e,f=[0];for(r=0;r<c.length;r+=1)k.appendByteArrayWriter(d(c[r])),f.push(k.getLength());e=k.getLength();for(r=0;r<c.length;r+=1)m=c[r],k.appendByteArrayWriter(b(m,f[r]));r=k.getLength()-e;k.appendArray([80,75,5,6,0,0,0,0]);k.appendUInt16LE(c.length);k.appendUInt16LE(c.length);k.appendUInt32LE(r);k.appendUInt32LE(e);k.appendArray([0,0]);a(k.getByteArray())}})}
function k(a,b){m(function(c){runtime.writeFile(a,c,b)},b)}var c,t,r,x=(new core.RawInflate).inflate,n=this,C=new core.Base64;this.load=e;this.save=function(a,b,n,k){var d,r;for(d=0;d<c.length;d+=1)if(r=c[d],r.filename===a){r.set(a,b,n,k);return}r=new g(h);r.set(a,b,n,k);c.push(r)};this.write=function(a){k(h,a)};this.writeAs=k;this.createByteArray=m;this.loadContentXmlAsFragments=function(a,b){n.loadAsString(a,function(a,c){if(a)return b.rootElementReady(a);b.rootElementReady(null,c,!0)})};this.loadAsString=
function(a,b){e(a,function(a,c){if(a||null===c)return b(a,null);var n=runtime.byteArrayToString(c,"utf8");b(null,n)})};this.loadAsDOM=function(a,b){n.loadAsString(a,function(a,c){if(a||null===c)b(a,null);else{var n=(new DOMParser).parseFromString(c,"text/xml");b(null,n)}})};this.loadAsDataURL=function(a,b,c){e(a,function(a,n){if(a)return c(a,null);var k=0,d;b||(b=80===n[1]&&78===n[2]&&71===n[3]?"image/png":255===n[0]&&216===n[1]&&255===n[2]?"image/jpeg":71===n[0]&&73===n[1]&&70===n[2]?"image/gif":
"");for(d="data:"+b+";base64,";k<n.length;)d+=C.convertUTF8ArrayToBase64(n.slice(k,Math.min(k+45E3,n.length))),k+=45E3;c(null,d)})};this.getEntries=function(){return c.slice()};t=-1;null===l?c=[]:runtime.getFileSize(h,function(b){t=b;0>t?l("File '"+h+"' cannot be read.",n):runtime.read(h,t-22,22,function(b,c){b||null===l||null===c?l(b,n):a(c,l)})})};
// Input 16
core.CSSUnits=function(){var h={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(l,f,q){return l*h[q]/h[f]};this.convertMeasure=function(l,f){var q,p;l&&f?(q=parseFloat(l),p=l.replace(q.toString(),""),q=this.convert(q,p,f)):q="";return q.toString()};this.getUnits=function(l){return l.substr(l.length-2,l.length)}};
// Input 17
xmldom.LSSerializerFilter=function(){};
// Input 18
"function"!==typeof Object.create&&(Object.create=function(h){var l=function(){};l.prototype=h;return new l});
xmldom.LSSerializer=function(){function h(f){var g=f||{},a=function(a){var b={},k;for(k in a)a.hasOwnProperty(k)&&(b[a[k]]=k);return b}(f),e=[g],d=[a],b=0;this.push=function(){b+=1;g=e[b]=Object.create(g);a=d[b]=Object.create(a)};this.pop=function(){e[b]=void 0;d[b]=void 0;b-=1;g=e[b];a=d[b]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(b){var d=b.namespaceURI,k=0,c;if(!d)return b.localName;if(c=a[d])return c+":"+b.localName;do{c||!b.prefix?(c="ns"+k,k+=1):c=b.prefix;
if(g[c]===d)break;if(!g[c]){g[c]=d;a[d]=c;break}c=null}while(null===c);return c+":"+b.localName}}function l(f){return f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function f(p,g){var a="",e=q.filter?q.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,d;if(e===NodeFilter.FILTER_ACCEPT&&g.nodeType===Node.ELEMENT_NODE){p.push();d=p.getQName(g);var b,s=g.attributes,m,k,c,t="",r;b="<"+d;m=s.length;for(k=0;k<m;k+=1)c=s.item(k),"http://www.w3.org/2000/xmlns/"!==
c.namespaceURI&&(r=q.filter?q.filter.acceptNode(c):NodeFilter.FILTER_ACCEPT,r===NodeFilter.FILTER_ACCEPT&&(r=p.getQName(c),c="string"===typeof c.value?l(c.value):c.value,t+=" "+(r+'="'+c+'"')));m=p.getLocalNamespaceDefinitions();for(k in m)m.hasOwnProperty(k)&&((s=m[k])?"xmlns"!==s&&(b+=" xmlns:"+m[k]+'="'+k+'"'):b+=' xmlns="'+k+'"');a+=b+(t+">")}if(e===NodeFilter.FILTER_ACCEPT||e===NodeFilter.FILTER_SKIP){for(e=g.firstChild;e;)a+=f(p,e),e=e.nextSibling;g.nodeValue&&(a+=l(g.nodeValue))}d&&(a+="</"+
d+">",p.pop());return a}var q=this;this.filter=null;this.writeToString=function(p,g){if(!p)return"";var a=new h(g);return f(a,p)}};
// Input 19
xmldom.RelaxNGParser=function(){function h(a,d){this.message=function(){d&&(a+=1===d.nodeType?" Element ":" Node ",a+=d.nodeName,d.nodeValue&&(a+=" with value '"+d.nodeValue+"'"),a+=".");return a}}function l(a){if(2>=a.e.length)return a;var d={name:a.name,e:a.e.slice(0,2)};return l({name:a.name,e:[d].concat(a.e.slice(2))})}function f(a){a=a.split(":",2);var d="",m;1===a.length?a=["",a[0]]:d=a[0];for(m in e)e[m]===d&&(a[0]=m);return a}function q(a,d){for(var e=0,k,c,g=a.name;a.e&&e<a.e.length;)if(k=
a.e[e],"ref"===k.name){c=d[k.a.name];if(!c)throw k.a.name+" was not defined.";k=a.e.slice(e+1);a.e=a.e.slice(0,e);a.e=a.e.concat(c.e);a.e=a.e.concat(k)}else e+=1,q(k,d);k=a.e;"choice"!==g||k&&k[1]&&"empty"!==k[1].name||(k&&k[0]&&"empty"!==k[0].name?(k[1]=k[0],k[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===g||"interleave"===g)"empty"===k[0].name?"empty"===k[1].name?(delete a.e,a.name="empty"):(g=a.name=k[1].name,a.names=k[1].names,k=a.e=k[1].e):"empty"===k[1].name&&(g=a.name=k[0].name,
a.names=k[0].names,k=a.e=k[0].e);"oneOrMore"===g&&"empty"===k[0].name&&(delete a.e,a.name="empty");if("attribute"===g){c=a.names?a.names.length:0;for(var r,x=a.localnames=[c],n=a.namespaces=[c],e=0;e<c;e+=1)r=f(a.names[e]),n[e]=r[0],x[e]=r[1]}"interleave"===g&&("interleave"===k[0].name?a.e="interleave"===k[1].name?k[0].e.concat(k[1].e):[k[1]].concat(k[0].e):"interleave"===k[1].name&&(a.e=[k[0]].concat(k[1].e)))}function p(a,d){for(var e=0,k;a.e&&e<a.e.length;)k=a.e[e],"elementref"===k.name?(k.id=
k.id||0,a.e[e]=d[k.id]):"element"!==k.name&&p(k,d),e+=1}var g=this,a,e={"http://www.w3.org/XML/1998/namespace":"xml"},d;d=function(a,g,m){var k=[],c,t,r=a.localName,x=[];c=a.attributes;var n=r,p=x,q={},h,w;for(h=0;h<c.length;h+=1)if(w=c.item(h),w.namespaceURI)"http://www.w3.org/2000/xmlns/"===w.namespaceURI&&(e[w.value]=w.localName);else{"name"!==w.localName||"element"!==n&&"attribute"!==n||p.push(w.value);if("name"===w.localName||"combine"===w.localName||"type"===w.localName){var K=w,A;A=w.value;
A=A.replace(/^\s\s*/,"");for(var F=/\s/,O=A.length-1;F.test(A.charAt(O));)O-=1;A=A.slice(0,O+1);K.value=A}q[w.localName]=w.value}c=q;c.combine=c.combine||void 0;a=a.firstChild;n=k;p=x;for(q="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(h=d(a,g,n))"name"===h.name?p.push(e[h.a.ns]+":"+h.text):"choice"===h.name&&(h.names&&h.names.length)&&(p=p.concat(h.names),delete h.names),n.push(h)}else a.nodeType===Node.TEXT_NODE&&(q+=a.nodeValue);a=a.nextSibling}a=
q;"value"!==r&&"param"!==r&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===r&&void 0===c.type&&(c.type="token",c.datatypeLibrary="");"attribute"!==r&&"element"!==r||void 0===c.name||(t=f(c.name),k=[{name:"name",text:t[1],a:{ns:t[0]}}].concat(k),delete c.name);"name"===r||"nsName"===r||"value"===r?void 0===c.ns&&(c.ns=""):delete c.ns;"name"===r&&(t=f(a),c.ns=t[0],a=t[1]);1<k.length&&("define"===r||"oneOrMore"===r||"zeroOrMore"===r||"optional"===r||"list"===r||"mixed"===r)&&(k=[{name:"group",e:l({name:"group",
e:k}).e}]);2<k.length&&"element"===r&&(k=[k[0]].concat({name:"group",e:l({name:"group",e:k.slice(1)}).e}));1===k.length&&"attribute"===r&&k.push({name:"text",text:a});1!==k.length||"choice"!==r&&"group"!==r&&"interleave"!==r?2<k.length&&("choice"===r||"group"===r||"interleave"===r)&&(k=l({name:r,e:k}).e):(r=k[0].name,x=k[0].names,c=k[0].a,a=k[0].text,k=k[0].e);"mixed"===r&&(r="interleave",k=[k[0],{name:"text"}]);"optional"===r&&(r="choice",k=[k[0],{name:"empty"}]);"zeroOrMore"===r&&(r="choice",k=
[{name:"oneOrMore",e:[k[0]]},{name:"empty"}]);if("define"===r&&c.combine){a:{n=c.combine;p=c.name;q=k;for(h=0;m&&h<m.length;h+=1)if(w=m[h],"define"===w.name&&w.a&&w.a.name===p){w.e=[{name:n,e:w.e.concat(q)}];m=w;break a}m=null}if(m)return}m={name:r};k&&0<k.length&&(m.e=k);for(t in c)if(c.hasOwnProperty(t)){m.a=c;break}void 0!==a&&(m.text=a);x&&0<x.length&&(m.names=x);"element"===r&&(m.id=g.length,g.push(m),m={name:"elementref",id:m.id});return m};this.parseRelaxNGDOM=function(b,f){var m=[],k=d(b&&
b.documentElement,m,void 0),c,t,r={};for(c=0;c<k.e.length;c+=1)t=k.e[c],"define"===t.name?r[t.a.name]=t:"start"===t.name&&(a=t);if(!a)return[new h("No Relax NG start element was found.")];q(a,r);for(c in r)r.hasOwnProperty(c)&&q(r[c],r);for(c=0;c<m.length;c+=1)q(m[c],r);f&&(g.rootPattern=f(a.e[0],m));p(a,m);for(c=0;c<m.length;c+=1)p(m[c],m);g.start=a;g.elements=m;g.nsmap=e;return null}};
// Input 20
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function h(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function l(a,b){return function(){var c={},n=0;return function(k){var d=k.hash||k.toString(),r;r=c[d];if(void 0!==r)return r;c[d]=r=b(k);r.hash=a+n.toString();n+=1;return r}}()}function f(a){return function(){var b={};return function(c){var n,k;k=b[c.localName];if(void 0===k)b[c.localName]=k={};else if(n=k[c.namespaceURI],void 0!==n)return n;return k[c.namespaceURI]=n=a(c)}}()}function q(a,
b,c){return function(){var n={},k=0;return function(d,r){var e=b&&b(d,r),m,f;if(void 0!==e)return e;e=d.hash||d.toString();m=r.hash||r.toString();f=n[e];if(void 0===f)n[e]=f={};else if(e=f[m],void 0!==e)return e;f[m]=e=c(d,r);e.hash=a+k.toString();k+=1;return e}}()}function p(a,b){"choice"===b.p1.type?p(a,b.p1):a[b.p1.hash]=b.p1;"choice"===b.p2.type?p(a,b.p2):a[b.p2.hash]=b.p2}function g(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return u},startTagOpenDeriv:function(n){return a.contains(n)?
c(b,w):u},attDeriv:function(a,b){return u},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(a,b){return w}}}function e(a,c,n,k){if(c===u)return u;if(k>=n.length)return c;0===k&&(k=0);for(var d=n.item(k);d.namespaceURI===b;){k+=1;if(k>=n.length)return c;d=n.item(k)}return d=e(a,c.attDeriv(a,n.item(k)),n,k+1)}function d(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):d(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
d(a,b,c.e[1])}var b="http://www.w3.org/2000/xmlns/",s,m,k,c,t,r,x,n,C,y,u={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return u},startTagOpenDeriv:function(){return u},attDeriv:function(){return u},startTagCloseDeriv:function(){return u},endTagDeriv:function(){return u}},w={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return u},startTagOpenDeriv:function(){return u},attDeriv:function(a,b){return u},startTagCloseDeriv:function(){return w},endTagDeriv:function(){return u}},
K={type:"text",nullable:!0,hash:"text",textDeriv:function(){return K},startTagOpenDeriv:function(){return u},attDeriv:function(){return u},startTagCloseDeriv:function(){return K},endTagDeriv:function(){return u}},A,F,O;s=q("choice",function(a,b){if(a===u)return b;if(b===u||a===b)return a},function(a,b){var c={},n;p(c,{p1:a,p2:b});b=a=void 0;for(n in c)c.hasOwnProperty(n)&&(void 0===a?a=c[n]:b=void 0===b?c[n]:s(b,c[n]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,n){return s(a.textDeriv(c,n),b.textDeriv(c,n))},startTagOpenDeriv:f(function(c){return s(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,n){return s(a.attDeriv(c,n),b.attDeriv(c,n))},startTagCloseDeriv:h(function(){return s(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:h(function(){return s(a.endTagDeriv(),b.endTagDeriv())})}}(a,b)});m=function(a,b,c){return function(){var n={},k=0;return function(d,r){var e=b&&b(d,r),m,f;if(void 0!==e)return e;
e=d.hash||d.toString();m=r.hash||r.toString();e<m&&(f=e,e=m,m=f,f=d,d=r,r=f);f=n[e];if(void 0===f)n[e]=f={};else if(e=f[m],void 0!==e)return e;f[m]=e=c(d,r);e.hash=a+k.toString();k+=1;return e}}()}("interleave",function(a,b){if(a===u||b===u)return u;if(a===w)return b;if(b===w)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,n){return s(m(a.textDeriv(c,n),b),m(a,b.textDeriv(c,n)))},startTagOpenDeriv:f(function(c){return s(A(function(a){return m(a,
b)},a.startTagOpenDeriv(c)),A(function(b){return m(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,n){return s(m(a.attDeriv(c,n),b),m(a,b.attDeriv(c,n)))},startTagCloseDeriv:h(function(){return m(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});k=q("group",function(a,b){if(a===u||b===u)return u;if(a===w)return b;if(b===w)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,n){var d=k(a.textDeriv(c,n),b);return a.nullable?s(d,b.textDeriv(c,
n)):d},startTagOpenDeriv:function(c){var n=A(function(a){return k(a,b)},a.startTagOpenDeriv(c));return a.nullable?s(n,b.startTagOpenDeriv(c)):n},attDeriv:function(c,n){return s(k(a.attDeriv(c,n),b),k(a,b.attDeriv(c,n)))},startTagCloseDeriv:h(function(){return k(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});c=q("after",function(a,b){if(a===u||b===u)return u},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(n,k){return c(a.textDeriv(n,k),b)},startTagOpenDeriv:f(function(n){return A(function(a){return c(a,
b)},a.startTagOpenDeriv(n))}),attDeriv:function(n,k){return c(a.attDeriv(n,k),b)},startTagCloseDeriv:h(function(){return c(a.startTagCloseDeriv(),b)}),endTagDeriv:h(function(){return a.nullable?b:u})}});t=l("oneormore",function(a){return a===u?u:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return k(a.textDeriv(b,c),s(this,w))},startTagOpenDeriv:function(b){var c=this;return A(function(a){return k(a,s(c,w))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return k(a.attDeriv(b,
c),s(this,w))},startTagCloseDeriv:h(function(){return t(a.startTagCloseDeriv())})}});x=q("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,n){return a.contains(n)&&(b.nullable&&/^\s+$/.test(n.nodeValue)||b.textDeriv(c,n.nodeValue).nullable)?w:u},startTagCloseDeriv:function(){return u}}});r=l("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?w:u},attDeriv:function(){return u},startTagCloseDeriv:function(){return this}}});
C=l("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return w},attDeriv:function(){return u},startTagCloseDeriv:function(){return this}}});A=function H(a,b){return"after"===b.type?c(b.p1,a(b.p2)):"choice"===b.type?s(H(a,b.p1),H(a,b.p2)):b};F=function(a,b,c){var n=c.currentNode;b=b.startTagOpenDeriv(n);b=e(a,b,n.attributes,0);var k=b=b.startTagCloseDeriv(),n=c.currentNode;b=c.firstChild();for(var d=[],r;b;)b.nodeType===Node.ELEMENT_NODE?d.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||d.push(b.nodeValue),b=c.nextSibling();0===d.length&&(d=[""]);r=k;for(k=0;r!==u&&k<d.length;k+=1)b=d[k],"string"===typeof b?r=/^\s*$/.test(b)?s(r,r.textDeriv(a,b)):r.textDeriv(a,b):(c.currentNode=b,r=F(a,r,c));c.currentNode=n;return b=r.endTagDeriv()};n=function(a){var b,c,n;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];d(b,c,a);a="";for(n=0;n<b.length;n+=
1)a+="{"+c[n]+"}"+b[n]+",";a={hash:a,contains:function(a){var n;for(n=0;n<b.length;n+=1)if(b[n]===a.localName&&c[n]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};y=function D(b,c){var d,e;if("elementref"===b.name){d=b.id||0;b=c[d];if(void 0!==b.name){var f=b;d=c[f.id]={hash:"element"+f.id.toString()};f=g(n(f.e[0]),y(f.e[1],c));for(e in f)f.hasOwnProperty(e)&&(d[e]=f[e]);return d}return b}switch(b.name){case "empty":return w;case "notAllowed":return u;
case "text":return K;case "choice":return s(D(b.e[0],c),D(b.e[1],c));case "interleave":d=D(b.e[0],c);for(e=1;e<b.e.length;e+=1)d=m(d,D(b.e[e],c));return d;case "group":return k(D(b.e[0],c),D(b.e[1],c));case "oneOrMore":return t(D(b.e[0],c));case "attribute":return x(n(b.e[0]),D(b.e[1],c));case "value":return r(b.text);case "data":return d=b.a&&b.a.type,void 0===d&&(d=""),C(d);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var c={},n;for(n in b)b.hasOwnProperty(n)&&
(c[n]=b[n]);return n=y(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=F(null,O,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){O=a}};
// Input 21
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function h(a,e){this.message=function(){e&&(a+=e.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=e.nodeName,e.nodeValue&&(a+=" with value '"+e.nodeValue+"'"),a+=".");return a}}function l(a,e,d,b){return"empty"===a.name?null:p(a,e,d,b)}function f(a,e,d){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var b=(d=e.currentNode)?d.nodeType:0,f=null;b>Node.ELEMENT_NODE;){if(b!==Node.COMMENT_NODE&&(b!==Node.TEXT_NODE||!/^\s+$/.test(e.currentNode.nodeValue)))return[new h("Not allowed node of type "+
b+".")];b=(d=e.nextSibling())?d.nodeType:0}if(!d)return[new h("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(g[d.namespaceURI]+":"+d.localName))return[new h("Found "+d.nodeName+" instead of "+a.names+".",d)];if(e.firstChild()){for(f=l(a.e[1],e,d);e.nextSibling();)if(b=e.currentNode.nodeType,!(e.currentNode&&e.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(e.currentNode.nodeValue)||b===Node.COMMENT_NODE))return[new h("Spurious content.",e.currentNode)];if(e.parentNode()!==d)return[new h("Implementation error.")]}else f=
l(a.e[1],e,d);e.nextSibling();return f}var q,p,g;p=function(a,e,d,b){var g=a.name,m=null;if("text"===g)a:{for(var k=(a=e.currentNode)?a.nodeType:0;a!==d&&3!==k;){if(1===k){m=[new h("Element not allowed here.",a)];break a}k=(a=e.nextSibling())?a.nodeType:0}e.nextSibling();m=null}else if("data"===g)m=null;else if("value"===g)b!==a.text&&(m=[new h("Wrong value, should be '"+a.text+"', not '"+b+"'",d)]);else if("list"===g)m=null;else if("attribute"===g)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;g=a.localnames.length;for(m=0;m<g;m+=1){b=d.getAttributeNS(a.namespaces[m],a.localnames[m]);""!==b||d.hasAttributeNS(a.namespaces[m],a.localnames[m])||(b=void 0);if(void 0!==k&&void 0!==b){m=[new h("Attribute defined too often.",d)];break a}k=b}m=void 0===k?[new h("Attribute not found: "+a.names,d)]:l(a.e[1],e,d,k)}else if("element"===g)m=f(a,e,d);else if("oneOrMore"===g){b=0;do k=e.currentNode,g=p(a.e[0],e,d),b+=1;while(!g&&k!==e.currentNode);1<b?(e.currentNode=k,m=null):m=g}else if("choice"===
g){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;k=e.currentNode;if("empty"===a.e[0].name){if(g=p(a.e[1],e,d,b))e.currentNode=k;m=null}else{if(g=l(a.e[0],e,d,b))e.currentNode=k,g=p(a.e[1],e,d,b);m=g}}else if("group"===g){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;m=p(a.e[0],e,d)||p(a.e[1],e,d)}else if("interleave"===g)a:{k=a.e.length;b=[k];for(var c=k,t,r,x,n;0<c;){t=0;r=e.currentNode;for(m=0;m<k;m+=1)x=e.currentNode,!0!==b[m]&&b[m]!==x&&(n=a.e[m],(g=
p(n,e,d))?(e.currentNode=x,void 0===b[m]&&(b[m]=!1)):x===e.currentNode||"oneOrMore"===n.name||"choice"===n.name&&("oneOrMore"===n.e[0].name||"oneOrMore"===n.e[1].name)?(t+=1,b[m]=x):(t+=1,b[m]=!0));if(r===e.currentNode&&t===c){m=null;break a}if(0===t){for(m=0;m<k;m+=1)if(!1===b[m]){m=[new h("Interleave does not match.",d)];break a}m=null;break a}for(m=c=0;m<k;m+=1)!0!==b[m]&&(c+=1)}m=null}else throw g+" not allowed in nonEmptyPattern.";return m};this.validate=function(a,e){a.currentNode=a.root;var d=
l(q.e[0],a,a.root);e(d)};this.init=function(a,e){q=a;g=e}};
// Input 22
xmldom.OperationalTransformInterface=function(){};xmldom.OperationalTransformInterface.prototype.retain=function(h){};xmldom.OperationalTransformInterface.prototype.insertCharacters=function(h){};xmldom.OperationalTransformInterface.prototype.insertElementStart=function(h,l){};xmldom.OperationalTransformInterface.prototype.insertElementEnd=function(){};xmldom.OperationalTransformInterface.prototype.deleteCharacters=function(h){};xmldom.OperationalTransformInterface.prototype.deleteElementStart=function(){};
xmldom.OperationalTransformInterface.prototype.deleteElementEnd=function(){};xmldom.OperationalTransformInterface.prototype.replaceAttributes=function(h){};xmldom.OperationalTransformInterface.prototype.updateAttributes=function(h){};
// Input 23
xmldom.OperationalTransformDOM=function(h,l){this.retain=function(f){};this.insertCharacters=function(f){};this.insertElementStart=function(f,q){};this.insertElementEnd=function(){};this.deleteCharacters=function(f){};this.deleteElementStart=function(){};this.deleteElementEnd=function(){};this.replaceAttributes=function(f){};this.updateAttributes=function(f){};this.atEnd=function(){return!0}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function h(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function l(a){for(var b=[],c=0,d=a.length,e;c<d;){var f=a,n=d,g=b,p="",q=[],l=f.indexOf("[",c),K=f.indexOf("/",c),A=f.indexOf("=",c);h(K,l,A)?(p=f.substring(c,K),c=K+1):h(l,K,A)?(p=f.substring(c,l),c=s(f,l,q)):h(A,K,l)?(p=f.substring(c,A),c=A):(p=f.substring(c,n),c=n);g.push({location:p,predicates:q});if(c<d&&"="===a[c]){e=a.substring(c+1,d);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);else try{e=
parseInt(e,10)}catch(F){}c=d}}return{steps:b,value:e}}function f(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function q(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function p(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function g(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function a(a,b,c){b=b.split(":",2);var d=c(b[0]),e=b[1];return new g(a,function(a){return a.localName===e&&a.namespaceURI===d})}function e(a,d,c){var e=new f,r=b(e,d,c),x=d.value;return void 0===x?new g(a,function(a){e.setNode(a);
r.reset();return r.next()}):new g(a,function(a){e.setNode(a);r.reset();return(a=r.next())&&a.nodeValue===x})}function d(a,d,c){var e=a.ownerDocument,r=[],g=null;if(e&&e.evaluate)for(c=e.evaluate(d,a,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),g=c.iterateNext();null!==g;)g.nodeType===Node.ELEMENT_NODE&&r.push(g),g=c.iterateNext();else{r=new f;r.setNode(a);a=l(d);r=b(r,a,c);a=[];for(c=r.next();c;)a.push(c),c=r.next();r=a}return r}var b,s;s=function(a,b,c){for(var d=b,e=a.length,f=0;d<e;)"]"===
a[d]?(f-=1,0>=f&&c.push(l(a.substring(b,d)))):"["===a[d]&&(0>=f&&(b=d+1),f+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};b=function(b,d,c){var f,r,g,n;for(f=0;f<d.steps.length;f+=1)for(g=d.steps[f],r=g.location,""===r?b=new p(b,!1):"@"===r[0]?(n=r.slice(1).split(":",2),b=new q(b,c(n[0]),n[1])):"."!==r&&(b=new p(b,!1),-1!==r.indexOf(":")&&(b=a(b,r,c))),r=0;r<g.predicates.length;r+=1)n=g.predicates[r],b=e(b,n,c);return b};xmldom.XPath=
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
odf.Namespaces=function(){function h(f){return l[f]||null}var l={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},f;h.lookupNamespaceURI=h;f=function(){};f.forEachPrefix=function(f){for(var p in l)l.hasOwnProperty(p)&&f(p,l[p])};f.resolvePrefix=h;f.namespaceMap=l;f.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";f.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";f.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";f.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";f.stylens=
"urn:oasis:names:tc:opendocument:xmlns:style:1.0";f.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";f.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";f.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";f.xlinkns="http://www.w3.org/1999/xlink";f.xmlns="http://www.w3.org/XML/1998/namespace";return f}();
// Input 26
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function h(a,b){for(var c=k[a.localName],n=c&&c[a.namespaceURI],d=n?n.length:0,e,c=0;c<d;c+=1)(e=a.getAttributeNS(n[c].ns,n[c].localname))&&a.setAttributeNS(n[c].ns,s[n[c].ns]+n[c].localname,b+e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(n=c,h(n,b)),c=c.nextSibling}function l(a,b){for(var c=k[a.localName],n=c&&c[a.namespaceURI],d=n?n.length:0,e,c=0;c<d;c+=1)if(e=a.getAttributeNS(n[c].ns,n[c].localname))e=e.replace(b,""),a.setAttributeNS(n[c].ns,s[n[c].ns]+n[c].localname,
e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(n=c,l(n,b)),c=c.nextSibling}function f(a,b){var c=k[a.localName],n=(c=c&&c[a.namespaceURI])?c.length:0,d,e,f;for(f=0;f<n;f+=1)if(d=a.getAttributeNS(c[f].ns,c[f].localname))b=b||{},e=c[f].keyname,e=b[e]=b[e]||{},e[d]=1;return b}function q(a,b){var c,n;f(a,b);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(n=c,q(n,b)),c=c.nextSibling}function p(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function g(a,b,c){var n=a+'"'+
b,d=c[n];d||(d=c[n]=new p(n,a,b));return d}function a(c,d,e){var n=k[c.localName],f=(n=n&&n[c.namespaceURI])?n.length:0,m=c.getAttributeNS(b,"name"),p=c.getAttributeNS(b,"family"),l;m&&p&&(d=g(m,p,e));if(d)for(m=0;m<f;m+=1)if(p=c.getAttributeNS(n[m].ns,n[m].localname))l=n[m].keyname,p=g(p,l,e),d.requires[p.key]=p;for(m=c.firstChild;m;)m.nodeType===Node.ELEMENT_NODE&&(c=m,a(c,d,e)),m=m.nextSibling;return e}function e(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){e(a.requires[c],
b)})}function d(b,c){var d=a(b,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&e(a,c)})}var b="urn:oasis:names:tc:opendocument:xmlns:style:1.0",s={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:","urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},m={text:[{ens:b,
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
a:"page-layout-name"}]},k,c=new xmldom.XPath;this.UsedStyleList=function(a,c){var e={};this.uses=function(a){var c=a.localName,d=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(b,"name");a="style"===c?a.getAttributeNS(b,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":c;return(a=e[a])?0<a[d]:!1};q(a,e);c&&d(c,e)};this.canElementHaveStyle=function(a,b){var c=k[b.localName],c=c&&c[b.namespaceURI];return 0<(c?c.length:
0)};this.hasDerivedStyles=function(a,b,d){var n=b("style"),e=d.getAttributeNS(n,"name");d=d.getAttributeNS(n,"family");return c.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+d+"']",b).length?!0:!1};this.prefixStyleNames=function(a,c,d){var n;if(a){for(n=a.firstChild;n;){if(n.nodeType===Node.ELEMENT_NODE){var e=n,k=c,f=e.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),g=void 0;f?g="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":
(f=e.getAttributeNS(b,"name"))&&(g=b);g&&e.setAttributeNS(g,s[g]+"name",k+f)}n=n.nextSibling}h(a,c);d&&h(d,c)}};this.removePrefixFromStyleNames=function(a,c,d){var n=RegExp("^"+c);if(a){for(c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE){var e=c,k=n,f=e.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),g=void 0;f?g="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(f=e.getAttributeNS(b,"name"))&&(g=b);g&&(f=f.replace(k,""),e.setAttributeNS(g,s[g]+"name",f))}c=c.nextSibling}l(a,
n);d&&l(d,n)}};this.determineStylesForNode=f;k=function(a){var b,c,n,d,e,k={},f;for(b in a)if(a.hasOwnProperty(b))for(d=a[b],n=d.length,c=0;c<n;c+=1)e=d[c],f=k[e.en]=k[e.en]||{},f=f[e.ens]=f[e.ens]||[],f.push({ns:e.ans,localname:e.a,keyname:b});return k}(m)};
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
odf.OdfUtils=function(){function h(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===t}function l(a){return/^[ \t\r\n]+$/.test(a)}function f(a){var b=a&&a.localName;return("span"===b||"p"===b||"h"===b)&&a.namespaceURI===t}function q(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===t?d="s"===b||"tab"===b||"line-break"===b:c===r&&(d="frame"===b&&"as-char"===a.getAttributeNS(t,"anchor-type")));return d}function p(a){for(;null!==a.firstChild&&f(a);)a=a.firstChild;return a}function g(a){for(;null!==
a.lastChild&&f(a);)a=a.lastChild;return a}function a(a){for(;!h(a)&&null===a.previousSibling;)a=a.parentNode;return h(a)?null:g(a.previousSibling)}function e(a){for(;!h(a)&&null===a.nextSibling;)a=a.parentNode;return h(a)?null:p(a.nextSibling)}function d(b){for(var c=!1;b;)if(b.nodeType===Node.TEXT_NODE)if(0===b.length)b=a(b);else return!l(b.data.substr(b.length-1,1));else if(q(b)){c=!0;break}else b=a(b);return c}function b(b){var c=!1;for(b=b&&g(b);b;){if(b.nodeType===Node.TEXT_NODE&&0<b.length&&
!l(b.data)){c=!0;break}else if(q(b)){c=!0;break}b=a(b)}return c}function s(a){var b=!1;for(a=a&&p(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!l(a.data)){b=!0;break}else if(q(a)){b=!0;break}a=e(a)}return b}function m(a,b){return l(a.data.substr(b))?!s(e(a)):!1}function k(a){return(a=/-?([0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?{value:parseFloat(a[1]),unit:a[3]}:null}function c(a){return(a=k(a))&&"%"!==a.unit?null:a}
var t="urn:oasis:names:tc:opendocument:xmlns:text:1.0",r="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",x=/^\s*$/;this.isParagraph=h;this.getParagraphElement=function(a){for(;a&&!h(a);)a=a.parentNode;return a};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===t};this.isODFWhitespace=l;this.isGroupingElement=f;this.isCharacterElement=q;this.firstChild=p;this.lastChild=g;this.previousNode=a;this.nextNode=e;this.scanLeftForNonWhitespace=d;this.lookLeftForCharacter=
function(b){var c;c=0;b.nodeType===Node.TEXT_NODE&&0<b.length?(c=b.data,c=l(c.substr(c.length-1,1))?1===c.length?d(a(b))?2:0:l(c.substr(c.length-2,1))?0:2:1):q(b)&&(c=1);return c};this.lookRightForCharacter=function(a){var b=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?b=!l(a.data.substr(0,1)):q(a)&&(b=!0);return b};this.scanLeftForAnyCharacter=b;this.scanRightForAnyCharacter=s;this.isTrailingWhitespace=m;this.isSignificantWhitespace=function(c,e){var k=c.data,f;if(!l(k[e]))return!1;if(0<e){if(!l(k[e-
1]))return!0;if(1<e)if(!l(k[e-2]))f=!0;else{if(!l(k.substr(0,e)))return!1}else d(a(c))&&(f=!0);if(!0===f)return m(c,e)?!1:!0;k=k[e+1];return l(k)?!1:b(a(c))?!1:!0}return!1};this.getFirstNonWhitespaceChild=function(a){for(a=a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&x.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=k;this.parseFoFontSize=function(a){var b;b=(b=k(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||c(a)};this.parseFoLineHeight=function(a){var b;b=(b=k(a))&&(0>b.value||"%"===
b.unit)?null:b;return b||c(a)};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument,d=c.createRange(),e=[],k;k=c.createTreeWalker(a.commonAncestorContainer.nodeType===Node.TEXT_NODE?a.commonAncestorContainer.parentNode:a.commonAncestorContainer,NodeFilter.SHOW_ALL,function(c){d.selectNodeContents(c);if(!1===b&&c.nodeType===Node.TEXT_NODE){if(0>=a.compareBoundaryPoints(a.START_TO_START,d)&&0<=a.compareBoundaryPoints(a.END_TO_END,d))return NodeFilter.FILTER_ACCEPT}else if(-1===a.compareBoundaryPoints(a.END_TO_START,
d)&&1===a.compareBoundaryPoints(a.START_TO_END,d))return c.nodeType===Node.TEXT_NODE?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT},!1);k.currentNode=a.startContainer.previousSibling||a.startContainer.parentNode;for(c=k.nextNode();c;)e.push(c),c=k.nextNode();d.detach();return e}};
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
odf.TextStyleApplicator=function(h,l,f){function q(a){function b(a,d){return"object"===typeof a&&"object"===typeof d?Object.keys(a).every(function(e){return b(a[e],d[e])}):a===d}this.isStyleApplied=function(c){c=l.getAppliedStylesForElement(c);return b(a,c)}}function p(a){var e={};this.applyStyleToContainer=function(c){var g;g=c.getAttributeNS(d,"style-name");var r=c.ownerDocument;g=g||"";if(!e.hasOwnProperty(g)){var p=g,n=g,q;n?(q=l.getStyleElement(n,"text"),q.parentNode===f?r=q.cloneNode(!0):(r=
r.createElementNS(b,"style:style"),r.setAttributeNS(b,"style:parent-style-name",n),r.setAttributeNS(b,"style:family","text"),r.setAttributeNS(s,"scope","document-content"))):(r=r.createElementNS(b,"style:style"),r.setAttributeNS(b,"style:family","text"),r.setAttributeNS(s,"scope","document-content"));l.updateStyle(r,a,h);f.appendChild(r);e[p]=r}g=e[g].getAttributeNS(b,"name");c.setAttributeNS(d,"text:style-name",g)}}var g,a=new odf.OdfUtils,e=new core.DomUtils,d=odf.Namespaces.textns,b=odf.Namespaces.stylens,
s="urn:webodf:names:scope";this.applyStyle=function(b,k){var c,f,r,l,n;c={};var h;runtime.assert(k&&k["style:text-properties"],"applyStyle without any text properties");c["style:text-properties"]=k["style:text-properties"];l=new p(c);n=new q(c);g=e.splitBoundaries(b);c=a.getTextNodes(b,!1);h={startContainer:b.startContainer,startOffset:b.startOffset,endContainer:b.endContainer,endOffset:b.endOffset};c.forEach(function(b){f=n.isStyleApplied(b);if(!1===f){var c=b.ownerDocument,k=b.parentNode,g,m=b,
p=new core.LoopWatchDog(1E3);a.isParagraph(k)?(c=c.createElementNS(d,"text:span"),k.insertBefore(c,b),g=!1):(b.previousSibling&&!e.rangeContainsNode(h,b.previousSibling)?(c=k.cloneNode(!1),k.parentNode.insertBefore(c,k.nextSibling)):c=k,g=!0);for(;m&&(m===b||e.rangeContainsNode(h,m));)p.check(),k=m.nextSibling,m.parentNode!==c&&c.appendChild(m),m=k;if(m&&g)for(b=c.cloneNode(!1),c.parentNode.insertBefore(b,c.nextSibling);m;)p.check(),k=m.nextSibling,b.appendChild(m),m=k;r=c;l.applyStyleToContainer(r)}});
g.forEach(e.normalizeTextNodes);g=null}};
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
odf.Style2CSS=function(){function h(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==t||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===x&&"list-style"===a.localName?"list":a.namespaceURI!==t||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(t,"family"))(c=a.getAttributeNS&&a.getAttributeNS(t,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function l(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=l(a[c].derivedStyles,b)))return d;return null}function f(a,b,c){var d=b[a],e,k;d&&(e=d.getAttributeNS(t,"parent-style-name"),k=null,e&&(k=l(c,e),!k&&b[e]&&(f(e,b,c),k=b[e],b[e]=null)),k?(k.derivedStyles||(k.derivedStyles={}),k.derivedStyles[a]=d):c[a]=d)}function q(a,b){for(var c in a)a.hasOwnProperty(c)&&(f(c,a,b),a[c]=null)}function p(a,b){var c=y[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+u[a].join(d+","+c+"|")+d}function g(a,b,c){var d=[],e,k;d.push(p(a,b));for(e in c.derivedStyles)if(c.derivedStyles.hasOwnProperty(e))for(k in b=g(a,e,c.derivedStyles[e]),b)b.hasOwnProperty(k)&&d.push(b[k]);return d}function a(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function e(a,b){var c="",d,e;for(d in b)b.hasOwnProperty(d)&&
(d=b[d],e=a.getAttributeNS(d[0],d[1]),d[2]&&e&&(c+=d[2]+":"+e+";"));return c}function d(b){return(b=a(b,t,"text-properties"))?V.parseFoFontSize(b.getAttributeNS(c,"font-size")):null}function b(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function s(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var e=c.getAttributeNS(x,"level"),
k;c=V.getFirstNonWhitespaceChild(c);c=V.getFirstNonWhitespaceChild(c);var n;c&&(k=c.attributes,n=k["fo:text-indent"]?k["fo:text-indent"].value:void 0,k=k["fo:margin-left"]?k["fo:margin-left"].value:void 0);n||(n="-0.6cm");c="-"===n.charAt(0)?n.substring(1):"-"+n;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";void 0!==k&&(k=e+"{margin-left:"+k+";}",a.insertRule(k,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+
d+";";d+="counter-increment:list;";d+="margin-left:"+n+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(f){throw f;}}function m(f,r,p,l){if("list"===r)for(var q=l.firstChild,h,u;q;){if(q.namespaceURI===x)if(h=q,"list-level-style-number"===q.localName){var E=h;u=E.getAttributeNS(t,"num-format");var y=E.getAttributeNS(t,"num-suffix"),v={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},E=E.getAttributeNS(t,"num-prefix")||"",E=v.hasOwnProperty(u)?
E+(" counter(list, "+v[u]+")"):u?E+("'"+u+"';"):E+" ''";y&&(E+=" '"+y+"'");u="content: "+E+";";s(f,p,h,u)}else"list-level-style-image"===q.localName?(u="content: none;",s(f,p,h,u)):"list-level-style-bullet"===q.localName&&(u="content: '"+h.getAttributeNS(x,"bullet-char")+"';",s(f,p,h,u));q=q.nextSibling}else if("page"===r)if(y=h=p="",q=l.getElementsByTagNameNS(t,"page-layout-properties")[0],h=q.parentNode.parentNode.parentNode.masterStyles,y="",p+=e(q,G),u=q.getElementsByTagNameNS(t,"background-image"),
0<u.length&&(y=u.item(0).getAttributeNS(n,"href"))&&(p+="background-image: url('odfkit:"+y+"');",u=u.item(0),p+=e(u,K)),"presentation"===ca){if(h)for(u=h.getElementsByTagNameNS(t,"master-page"),v=0;v<u.length;v+=1)if(u[v].getAttributeNS(t,"page-layout-name")===q.parentNode.getAttributeNS(t,"name")){y=u[v].getAttributeNS(t,"name");h="draw|page[draw|master-page-name="+y+"] {"+p+"}";y="office|body, draw|page[draw|master-page-name="+y+"] {"+e(q,T)+" }";try{f.insertRule(h,f.cssRules.length),f.insertRule(y,
f.cssRules.length)}catch(aa){throw aa;}}}else{if("text"===ca){h="office|text {"+p+"}";y="office|body {width: "+q.getAttributeNS(c,"page-width")+";}";try{f.insertRule(h,f.cssRules.length),f.insertRule(y,f.cssRules.length)}catch(ga){throw ga;}}}else{p=g(r,p,l).join(",");q="";if(h=a(l,t,"text-properties")){var v=h,L;u=L="";y=1;h=""+e(v,w);E=v.getAttributeNS(t,"text-underline-style");"solid"===E&&(L+=" underline");E=v.getAttributeNS(t,"text-line-through-style");"solid"===E&&(L+=" line-through");L.length&&
(h+="text-decoration:"+L+";");if(L=v.getAttributeNS(t,"font-name")||v.getAttributeNS(c,"font-family"))E=ba[L],h+="font-family: "+(E||L)+", sans-serif;";E=v.parentNode;if(v=d(E)){for(;E;){if(v=d(E))if("%"!==v.unit){u="font-size: "+v.value*y+v.unit+";";break}else y*=v.value/100;v=E;L=E="";E=null;"default-style"===v.localName?E=null:(E=v.getAttributeNS(t,"parent-style-name"),L=v.getAttributeNS(t,"family"),E=N.getODFElementsWithXPath(U,E?"//style:*[@style:name='"+E+"'][@style:family='"+L+"']":"//style:default-style[@style:family='"+
L+"']",odf.Namespaces.resolvePrefix)[0])}u||(u="font-size: "+parseFloat(W)*y+S.getUnits(W)+";");h+=u}q+=h}if(h=a(l,t,"paragraph-properties"))u=h,h=""+e(u,A),y=u.getElementsByTagNameNS(t,"background-image"),0<y.length&&(v=y.item(0).getAttributeNS(n,"href"))&&(h+="background-image: url('odfkit:"+v+"');",y=y.item(0),h+=e(y,K)),(u=u.getAttributeNS(c,"line-height"))&&"normal"!==u&&(u=V.parseFoLineHeight(u),h="%"!==u.unit?h+("line-height: "+u.value+";"):h+("line-height: "+u.value/100+";")),q+=h;if(h=a(l,
t,"graphic-properties"))v=h,h=""+e(v,F),u=v.getAttributeNS(k,"opacity"),y=v.getAttributeNS(k,"fill"),v=v.getAttributeNS(k,"fill-color"),"solid"===y||"hatch"===y?v&&"none"!==v?(u=isNaN(parseFloat(u))?1:parseFloat(u)/100,(v=b(v))&&(h+="background-color: rgba("+v.r+","+v.g+","+v.b+","+u+");")):h+="background: none;":"none"===y&&(h+="background: none;"),q+=h;if(h=a(l,t,"drawing-page-properties"))u=""+e(h,F),"true"===h.getAttributeNS(C,"background-visible")&&(u+="background: none;"),q+=u;if(h=a(l,t,"table-cell-properties"))h=
""+e(h,O),q+=h;if(h=a(l,t,"table-row-properties"))h=""+e(h,H),q+=h;if(h=a(l,t,"table-column-properties"))h=""+e(h,z),q+=h;if(h=a(l,t,"table-properties"))h=""+e(h,D),q+=h;if(0!==q.length)try{f.insertRule(p+"{"+q+"}",f.cssRules.length)}catch(M){throw M;}}for(var Z in l.derivedStyles)l.derivedStyles.hasOwnProperty(Z)&&m(f,r,Z,l.derivedStyles[Z])}var k=odf.Namespaces.drawns,c=odf.Namespaces.fons,t=odf.Namespaces.stylens,r=odf.Namespaces.svgns,x=odf.Namespaces.textns,n=odf.Namespaces.xlinkns,C=odf.Namespaces.presentationns,
y={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},u={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),
presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background",
"table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},w=[[c,"color","color"],[c,"background-color","background-color"],[c,"font-weight","font-weight"],[c,"font-style","font-style"]],K=[[t,"repeat","background-repeat"]],A=[[c,"background-color","background-color"],[c,"text-align","text-align"],[c,"text-indent","text-indent"],[c,"padding","padding"],[c,"padding-left","padding-left"],[c,"padding-right","padding-right"],[c,"padding-top","padding-top"],[c,"padding-bottom","padding-bottom"],[c,"border-left","border-left"],[c,"border-right",
"border-right"],[c,"border-top","border-top"],[c,"border-bottom","border-bottom"],[c,"margin","margin"],[c,"margin-left","margin-left"],[c,"margin-right","margin-right"],[c,"margin-top","margin-top"],[c,"margin-bottom","margin-bottom"],[c,"border","border"]],F=[[c,"background-color","background-color"],[c,"min-height","min-height"],[k,"stroke","border"],[r,"stroke-color","border-color"],[r,"stroke-width","border-width"]],O=[[c,"background-color","background-color"],[c,"border-left","border-left"],
[c,"border-right","border-right"],[c,"border-top","border-top"],[c,"border-bottom","border-bottom"],[c,"border","border"]],z=[[t,"column-width","width"]],H=[[t,"row-height","height"],[c,"keep-together",null]],D=[[t,"width","width"],[c,"margin-left","margin-left"],[c,"margin-right","margin-right"],[c,"margin-top","margin-top"],[c,"margin-bottom","margin-bottom"]],G=[[c,"background-color","background-color"],[c,"padding","padding"],[c,"padding-left","padding-left"],[c,"padding-right","padding-right"],
[c,"padding-top","padding-top"],[c,"padding-bottom","padding-bottom"],[c,"border","border"],[c,"border-left","border-left"],[c,"border-right","border-right"],[c,"border-top","border-top"],[c,"border-bottom","border-bottom"],[c,"margin","margin"],[c,"margin-left","margin-left"],[c,"margin-right","margin-right"],[c,"margin-top","margin-top"],[c,"margin-bottom","margin-bottom"]],T=[[c,"page-width","width"],[c,"page-height","height"]],ba={},V=new odf.OdfUtils,ca,U,W,N=new xmldom.XPath,S=new core.CSSUnits;
this.style2css=function(a,b,c,d,e){for(var k,n,f,g;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);k=null;d&&(k=d.ownerDocument,U=d.parentNode);e&&(k=e.ownerDocument,U=e.parentNode);if(k)for(g in odf.Namespaces.forEachPrefix(function(a,c){f="@namespace "+a+" url("+c+");";try{b.insertRule(f,b.cssRules.length)}catch(d){}}),ba=c,ca=a,W=window.getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=h(d),d=h(e),e={},y)if(y.hasOwnProperty(g))for(n in c=e[g]={},q(a[g],c),q(d[g],
c),c)c.hasOwnProperty(n)&&m(b,g,n,c[n])}};
// Input 30
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");
odf.OdfContainer=function(){function h(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function l(a){var b,c=m.length;for(b=0;b<c;b+=1)if(a.namespaceURI===d&&a.localName===m[b])return b;return-1}function f(a,b){var c;a&&(c=new e.UsedStyleList(a,b));this.acceptNode=function(a){return"http://www.w3.org/1999/xhtml"===a.namespaceURI?3:a.namespaceURI&&a.namespaceURI.match(/^urn:webodf:/)?2:c&&a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE?
c.uses(a)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function q(a,b){if(b){var c=l(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=l(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}function p(a){this.OdfContainer=a}function g(a,b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==
d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))};this.abort=function(){}}function a(a){this.length=0;this.item=function(a){}}var e=new odf.StyleInfo,d="urn:oasis:names:tc:opendocument:xmlns:office:1.0",b="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",s="urn:webodf:names:scope",m="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),k=(new Date).getTime()+
"_webodf_",c=new core.Base64;p.prototype=new function(){};p.prototype.constructor=p;p.namespaceURI=d;p.localName="document";g.prototype.load=function(){};g.prototype.getUrl=function(){return this.data?"data:;base64,"+c.toBase64(this.data):null};odf.OdfContainer=function r(c,n){function m(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?m(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function l(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&
c.setAttributeNS(s,"scope",b),c=c.nextSibling}function u(a,b){var c=null,d,e,k;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)e=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(k=d.getAttributeNS(s,"scope"))&&k!==b&&c.removeChild(d),d=e;return c}function w(a){var b=J.rootElement.ownerDocument,c;if(a){m(a.documentElement);try{c=b.importNode(a.documentElement,!0)}catch(d){}}return c}function K(a){J.state=a;if(J.onchange)J.onchange(J);if(J.onstatereadychange)J.onstatereadychange(J)}function A(a){Y=null;
J.rootElement=a;a.fontFaceDecls=h(a,d,"font-face-decls");a.styles=h(a,d,"styles");a.automaticStyles=h(a,d,"automatic-styles");a.masterStyles=h(a,d,"master-styles");a.body=h(a,d,"body");a.meta=h(a,d,"meta")}function F(a){a=w(a);var b=J.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===d?(b.fontFaceDecls=h(a,d,"font-face-decls"),q(b,b.fontFaceDecls),b.styles=h(a,d,"styles"),q(b,b.styles),b.automaticStyles=h(a,d,"automatic-styles"),l(b.automaticStyles,"document-styles"),q(b,b.automaticStyles),
b.masterStyles=h(a,d,"master-styles"),q(b,b.masterStyles),e.prefixStyleNames(b.automaticStyles,k,b.masterStyles)):K(r.INVALID)}function O(a){a=w(a);var b,c,e;if(a&&"document-content"===a.localName&&a.namespaceURI===d){b=J.rootElement;c=h(a,d,"font-face-decls");if(b.fontFaceDecls&&c)for(e=c.firstChild;e;)b.fontFaceDecls.appendChild(e),e=c.firstChild;else c&&(b.fontFaceDecls=c,q(b,c));c=h(a,d,"automatic-styles");l(c,"document-content");if(b.automaticStyles&&c)for(e=c.firstChild;e;)b.automaticStyles.appendChild(e),
e=c.firstChild;else c&&(b.automaticStyles=c,q(b,c));b.body=h(a,d,"body");q(b,b.body)}else K(r.INVALID)}function z(a){a=w(a);var b;a&&("document-meta"===a.localName&&a.namespaceURI===d)&&(b=J.rootElement,b.meta=h(a,d,"meta"),q(b,b.meta))}function H(a){a=w(a);var b;a&&("document-settings"===a.localName&&a.namespaceURI===d)&&(b=J.rootElement,b.settings=h(a,d,"settings"),q(b,b.settings))}function D(a){a=w(a);var c;if(a&&"manifest"===a.localName&&a.namespaceURI===b)for(c=J.rootElement,c.manifest=a,a=c.manifest.firstChild;a;)a.nodeType===
Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===b)&&(Q[a.getAttributeNS(b,"full-path")]=a.getAttributeNS(b,"media-type")),a=a.nextSibling}function G(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],P.loadAsDOM(c,function(b,c){d(c);J.state!==r.INVALID&&G(a)})):K(r.DONE)}function T(a){var b="";odf.Namespaces.forEachPrefix(function(a,c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function ba(){var a=new xmldom.LSSerializer,
b=T("document-meta");a.filter=new f;b+=a.writeToString(J.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function V(a,c){var d=document.createElementNS(b,"manifest:file-entry");d.setAttributeNS(b,"manifest:full-path",a);d.setAttributeNS(b,"manifest:media-type",c);return d}function ca(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="'+b+'"></manifest:manifest>'),c=h(a,b,"manifest"),d=new xmldom.LSSerializer,e;for(e in Q)Q.hasOwnProperty(e)&&c.appendChild(V(e,
Q[e]));d.filter=new f;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+d.writeToString(a,odf.Namespaces.namespaceMap)}function U(){var a=new xmldom.LSSerializer,b=T("document-settings");a.filter=new f;b+=a.writeToString(J.rootElement.settings,odf.Namespaces.namespaceMap);return b+"</office:document-settings>"}function W(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=u(J.rootElement.automaticStyles,"document-styles"),d=J.rootElement.masterStyles&&J.rootElement.masterStyles.cloneNode(!0),
n=T("document-styles");e.removePrefixFromStyleNames(c,k,d);b.filter=new f(d,c);n+=b.writeToString(J.rootElement.fontFaceDecls,a);n+=b.writeToString(J.rootElement.styles,a);n+=b.writeToString(c,a);n+=b.writeToString(d,a);return n+"</office:document-styles>"}function N(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=u(J.rootElement.automaticStyles,"document-content"),d=T("document-content");b.filter=new f(J.rootElement.body,c);d+=b.writeToString(c,a);d+=b.writeToString(J.rootElement.body,
a);return d+"</office:document-content>"}function S(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var e=w(c);e&&"document"===e.localName&&e.namespaceURI===d?(A(e),K(r.DONE)):K(r.INVALID)}})}function R(){function a(b,c){var k;c||(c=b);k=document.createElementNS(d,c);e[b]=k;e.appendChild(k)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),e=J.rootElement,k=document.createElementNS(d,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");
a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");e.body.appendChild(k);K(r.DONE);return b}function I(){var a,b=new Date;a=runtime.byteArrayFromString(U(),"utf8");P.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(ba(),"utf8");P.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(W(),"utf8");P.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(N(),"utf8");P.save("content.xml",a,!0,b);a=
runtime.byteArrayFromString(ca(),"utf8");P.save("META-INF/manifest.xml",a,!0,b)}function B(a,b){I();P.writeAs(a,function(a){b(a)})}var J=this,P,Q={},Y;this.onstatereadychange=n;this.parts=this.rootElement=this.state=this.onchange=null;this.setRootElement=A;this.getContentElement=function(){var a;Y||(a=J.rootElement.body,Y=a.getElementsByTagNameNS(d,"text")[0]||a.getElementsByTagNameNS(d,"presentation")[0]||a.getElementsByTagNameNS(d,"spreadsheet")[0]);return Y};this.getDocumentType=function(){var a=
J.getContentElement();return a&&a.localName};this.getPart=function(a){return new g(a,Q[a],J,P)};this.getPartData=function(a,b){P.load(a,b)};this.createByteArray=function(a,b){I();P.createByteArray(a,b)};this.saveAs=B;this.save=function(a){B(c,a)};this.getUrl=function(){return c};this.state=r.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(p);this.parts=new a(this);P=c?new core.Zip(c,function(a,
b){P=b;a?S(c,function(b){a&&(P.error=a+"\n"+b,K(r.INVALID))}):G([["styles.xml",F],["content.xml",O],["meta.xml",z],["settings.xml",H],["META-INF/manifest.xml",D]])}):R()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,null)};return odf.OdfContainer}();
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
odf.FontLoader=function(){function h(f,g,a,e,d){var b,l=0,m;for(m in f)if(f.hasOwnProperty(m)){if(l===a){b=m;break}l+=1}if(!b)return d();g.getPartData(f[b].href,function(k,c){if(k)runtime.log(k);else{var m="@font-face { font-family: '"+(f[b].family||b)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+q.convertUTF8ArrayToBase64(c)+') format("truetype"); }';try{e.insertRule(m,e.cssRules.length)}catch(r){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(r)+"\nRule: "+m)}}h(f,
g,a+1,e,d)})}function l(f,g,a){h(f,g,0,a,function(){})}var f=new xmldom.XPath,q=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(p,g){for(var a=p.rootElement.fontFaceDecls;g.cssRules.length;)g.deleteRule(g.cssRules.length-1);if(a){var e={},d,b,h,m;if(a)for(a=f.getODFElementsWithXPath(a,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),d=0;d<a.length;d+=1)b=a[d],h=b.getAttributeNS(odf.Namespaces.stylens,"name"),m=b.getAttributeNS(odf.Namespaces.svgns,"font-family"),
b=f.getODFElementsWithXPath(b,"svg:font-face-src/svg:font-face-uri",odf.Namespaces.resolvePrefix),0<b.length&&(b=b[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),e[h]={href:b,family:m});l(e,p,g)}}};return odf.FontLoader}();
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
odf.Formatting=function(){function h(a,b){Object.keys(b).forEach(function(c){try{a[c]=b[c].constructor===Object?h(a[c],b[c]):b[c]}catch(d){a[c]=b[c]}});return a}function l(a,d,e){var f;e=e||[b.rootElement.automaticStyles,b.rootElement.styles];for(f=e.shift();f;){for(f=f.firstChild;f;){if(f.nodeType===Node.ELEMENT_NODE&&(f.namespaceURI===k&&"style"===f.localName&&f.getAttributeNS(k,"family")===d&&f.getAttributeNS(k,"name")===a||"list-style"===d&&f.namespaceURI===c&&"list-style"===f.localName&&f.getAttributeNS(k,
"name")===a))return f;f=f.nextSibling}f=e.shift()}return null}function f(a){for(var b={},c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===k)for(b[c.nodeName]={},a=0;a<c.attributes.length;a+=1)b[c.nodeName][c.attributes[a].name]=c.attributes[a].value;c=c.nextSibling}return b}function q(a,b){Object.keys(b).forEach(function(c){var d=c.split(":"),e=d[1],k=odf.Namespaces.resolvePrefix(d[0]),d=b[c];"object"===typeof d&&Object.keys(d).length?(c=a.getElementsByTagNameNS(k,e)[0]||a.ownerDocument.createElementNS(k,
c),a.appendChild(c),q(c,d)):a.setAttributeNS(k,c,d)})}function p(a){var c=b.rootElement.styles,d;d={};for(var e={},g=a;g;)d=f(g),e=h(d,e),g=(d=g.getAttributeNS(k,"parent-style-name"))?l(d,a.getAttributeNS(k,"family"),[c]):null;a:{a=a.getAttributeNS(k,"family");for(c=b.rootElement.styles.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===k&&"default-style"===c.localName&&c.getAttributeNS(k,"family")===a){g=c;break a}c=c.nextSibling}g=null}g&&(d=f(g),e=h(d,e));return e}function g(a,
b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,e=[],k="",f=!1;c;)!f&&t.isGroupingElement(c)&&(f=!0),(d=s.determineStylesForNode(c))&&e.push(d),c=c.parentNode;f&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){k+="|"+b+":"+a+"|"})})}),b&&(b[k]=e));return f?e:void 0}function a(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var d=Object.keys(a[c])[0],e,f;e=l(d,c);f=p(e);b=h(f,b);b.orderedStyles.push({name:d,
family:c,displayName:e.getAttributeNS(k,"display-name")})})});return b}function e(){var a,d=[];[b.rootElement.automaticStyles,b.rootElement.styles].forEach(function(b){for(a=b.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===k&&"style"===a.localName||a.namespaceURI===c&&"list-style"===a.localName)&&d.push(a.getAttributeNS(k,"name")),a=a.nextSibling});return d}var d=this,b,s=new odf.StyleInfo,m=odf.Namespaces.svgns,k=odf.Namespaces.stylens,c=odf.Namespaces.textns,t=new odf.OdfUtils;
this.setOdfContainer=function(a){b=a};this.getFontMap=function(){for(var a=b.rootElement.fontFaceDecls,c={},d,e,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(d=a.getAttributeNS(k,"name"))&&((e=a.getAttributeNS(m,"font-family"))||a.getElementsByTagNameNS(m,"font-face-uri")[0])&&(c[d]=e),a=a.nextSibling;return c};this.getAvailableParagraphStyles=function(){for(var a=b.rootElement.styles&&b.rootElement.styles.firstChild,c,d,e=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===
k)&&(d=a,c=d.getAttributeNS(k,"family"),"paragraph"===c&&(c=d.getAttributeNS(k,"name"),d=d.getAttributeNS(k,"display-name")||c,c&&d&&e.push({name:c,displayName:d}))),a=a.nextSibling;return e};this.isStyleUsed=function(a){var c;c=s.hasDerivedStyles(b.rootElement,odf.Namespaces.resolvePrefix,a);a=(new s.UsedStyleList(b.rootElement.styles)).uses(a)||(new s.UsedStyleList(b.rootElement.automaticStyles)).uses(a)||(new s.UsedStyleList(b.rootElement.body)).uses(a);return c||a};this.getStyleElement=l;this.getStyleAttributes=
f;this.getInheritedStyleAttributes=p;this.getFirstNamedParentStyleNameOrSelf=function(a){for(var c=b.rootElement.automaticStyles,d=b.rootElement.styles,e;null!==(e=l(a,"paragraph",[c]));)a=e.getAttributeNS(k,"parent-style-name");return(e=l(a,"paragraph",[d]))?a:null};this.hasParagraphStyle=function(a){return Boolean(l(a,"paragraph"))};this.getAppliedStyles=function(b){var c={},d=[];t.getTextNodes(b).forEach(function(a){g(a,c)});Object.keys(c).forEach(function(b){d.push(a(c[b]))});return d};this.getAppliedStylesForElement=
function(b){return(b=g(b))?a(b):void 0};this.applyStyle=function(a,c,e){var k=odf.TextStyleApplicator,f=0,g,m;g=0;for(m=a.length;g<m;g+=1)f=(f<<5)-f+a.charCodeAt(g),f|=0;(new k("auto"+f+"_",d,b.rootElement.automaticStyles)).applyStyle(c,e)};this.updateStyle=function(a,b,c){var d,f;q(a,b);a.getAttributeNS(k,"name");if(c){d=e();f=0;do b=c+f,f+=1;while(-1!==d.indexOf(b));a.setAttributeNS(k,"style:name",b)}}};
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
odf.OdfCanvas=function(){function h(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(e)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function l(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a}function f(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function q(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}
function c(){var k=[],f=runtime.getWindow().getSelection(),g,n;for(g=0;g<f.rangeCount;g+=1)n=f.getRangeAt(g),null!==n&&(b(a,n.startContainer)&&b(a,n.endContainer))&&k.push(n);if(k.length===d.length){for(f=0;f<k.length&&(g=k[f],n=d[f],g=g===n?!1:null===g||null===n?!0:g.startContainer!==n.startContainer||g.startOffset!==n.startOffset||g.endContainer!==n.endContainer||g.endOffset!==n.endOffset,!g);f+=1);if(f===k.length)return}d=k;var f=[k.length],m,r=a.ownerDocument;for(g=0;g<k.length;g+=1)n=k[g],m=
r.createRange(),m.setStart(n.startContainer,n.startOffset),m.setEnd(n.endContainer,n.endOffset),f[g]=m;d=f;f=e.length;for(k=0;k<f;k+=1)e[k](a,d)}var d=[],e=[];this.addListener=function(a,b){var c,d=e.length;for(c=0;c<d;c+=1)if(e[c]===b)return;e.push(b)};f(a,"mouseup",c);f(a,"keyup",c);f(a,"keydown",c)}function p(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function g(a,b,c,d){c.setAttribute("styleid",b);var e,k=
c.getAttributeNS(u,"anchor-type"),f=c.getAttributeNS(C,"x"),m=c.getAttributeNS(C,"y"),p=c.getAttributeNS(C,"width"),h=c.getAttributeNS(C,"height"),q=c.getAttributeNS(r,"min-height"),l=c.getAttributeNS(r,"min-width"),s=c.getAttributeNS(t,"master-page-name"),x=null,y,w;y=0;var z,F=a.rootElement.ownerDocument;if(s){x=a.rootElement.masterStyles.getElementsByTagNameNS(n,"master-page");y=null;for(w=0;w<x.length;w+=1)if(x[w].getAttributeNS(n,"name")===s){y=x[w];break}x=y}else x=null;if(x){s=F.createElementNS(t,
"draw:page");z=x.firstElementChild;for(y=0;z;)"true"!==z.getAttributeNS(A,"placeholder")&&(w=z.cloneNode(!0),s.appendChild(w),g(a,b+"_"+y,w,d)),z=z.nextElementSibling,y+=1;D.appendChild(s);y=D.getElementsByTagNameNS(t,"page").length;if(w=s.getElementsByTagNameNS(u,"page-number")[0]){for(;w.firstChild;)w.removeChild(w.firstChild);w.appendChild(F.createTextNode(y))}g(a,b,s,d);s.setAttributeNS(t,"draw:master-page-name",x.getAttributeNS(n,"name"))}if("as-char"===k)e="display: inline-block;";else if(k||
f||m)e="position: absolute;";else if(p||h||q||l)e="display: block;";f&&(e+="left: "+f+";");m&&(e+="top: "+m+";");p&&(e+="width: "+p+";");h&&(e+="height: "+h+";");q&&(e+="min-height: "+q+";");l&&(e+="min-width: "+l+";");e&&(e="draw|"+c.localName+'[styleid="'+b+'"] {'+e+"}",d.insertRule(e,d.cssRules.length))}function a(a){for(a=a.firstChild;a;){if(a.namespaceURI===x&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function e(b,
c,d,e){function k(a){a&&(a='draw|image[styleid="'+b+'"] {'+("background-image: url("+a+");")+"}",e.insertRule(a,e.cssRules.length))}d.setAttribute("styleid",b);var f=d.getAttributeNS(w,"href"),g;if(f)try{g=c.getPart(f),g.onchange=function(a){k(a.url)},g.load()}catch(n){runtime.log("slight problem: "+n)}else f=a(d),k(f)}function d(a,b,c){function d(a,c,e){var k;c.hasAttributeNS(w,"href")&&(k=c.getAttributeNS(w,"href"),"#"===k[0]?(k=k.substring(1),a=function(){var a=O.getODFElementsWithXPath(b,"//text:bookmark-start[@text:name='"+
k+"']",odf.Namespaces.resolvePrefix);0===a.length&&(a=O.getODFElementsWithXPath(b,"//text:bookmark[@text:name='"+k+"']",odf.Namespaces.resolvePrefix));0<a.length&&a[0].scrollIntoView(!0);return!1}):a=function(){F.open(k)},c.onclick=a)}var e,k,f;k=b.getElementsByTagNameNS(u,"a");for(e=0;e<k.length;e+=1)f=k.item(e),d(a,f,c)}function b(a){var b=a.ownerDocument;H.getElementsByTagNameNS(a,u,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));
d=parseInt(a.getAttributeNS(u,"c"),10);if(1<d)for(a.removeAttributeNS(u,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function s(a){H.getElementsByTagNameNS(a,u,"tab").forEach(function(a){a.textContent="\t"})}function m(b,c,d,e){function k(a,b){var c=n.documentElement.namespaceURI;"video/"===b.substr(0,6)?(f=n.createElementNS(c,"video"),f.setAttribute("controls","controls"),g=n.createElementNS(c,"source"),g.setAttribute("src",a),g.setAttribute("type",b),f.appendChild(g),d.parentNode.appendChild(f)):
d.innerHtml="Unrecognised Plugin"}var f,g,n=d.ownerDocument,m;if(b=d.getAttributeNS(w,"href"))try{m=c.getPart(b),m.onchange=function(a){k(a.url,a.mimetype)},m.load()}catch(r){runtime.log("slight problem: "+r)}else runtime.log("using MP4 data fallback"),b=a(d),k(b,"video/mp4")}function k(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):
(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function c(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+
a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var t=odf.Namespaces.drawns,r=odf.Namespaces.fons,x=odf.Namespaces.officens,n=odf.Namespaces.stylens,C=odf.Namespaces.svgns,y=odf.Namespaces.tablens,u=odf.Namespaces.textns,w=odf.Namespaces.xlinkns,K=odf.Namespaces.xmlns,A=odf.Namespaces.presentationns,F=runtime.getWindow(),O=new xmldom.XPath,z=new odf.OdfUtils,H=new core.DomUtils,D;odf.OdfCanvas=function(a){function r(a,b,c){function d(a,b,c,k){aa.addToQueue(function(){e(a,
b,c,k)})}var k,f;k=b.getElementsByTagNameNS(t,"image");for(b=0;b<k.length;b+=1)f=k.item(b),d("image"+String(b),a,f,c)}function x(a,b,c){function d(a,b,c,e){aa.addToQueue(function(){m(a,b,c,e)})}var e,k;e=b.getElementsByTagNameNS(t,"plugin");for(b=0;b<e.length;b+=1)k=e.item(b),d("video"+String(b),a,k,c)}function C(){var b=a.firstChild;b.firstChild&&(1<E?(b.style.MozTransformOrigin="center top",b.style.WebkitTransformOrigin="center top",b.style.OTransformOrigin="center top",b.style.msTransformOrigin=
"center top"):(b.style.MozTransformOrigin="left top",b.style.WebkitTransformOrigin="left top",b.style.OTransformOrigin="left top",b.style.msTransformOrigin="left top"),b.style.WebkitTransform="scale("+E+")",b.style.MozTransform="scale("+E+")",b.style.OTransform="scale("+E+")",b.style.msTransform="scale("+E+")",a.style.width=Math.round(E*b.offsetWidth)+"px",a.style.height=Math.round(E*b.offsetHeight)+"px")}function w(c){function e(){for(var k=a;k.firstChild;)k.removeChild(k.firstChild);a.style.display=
"inline-block";var f=S.rootElement;a.ownerDocument.importNode(f,!0);R.setOdfContainer(S);var k=S,m=J;(new odf.FontLoader).loadFonts(k,m.sheet);p(S,R,P);for(var h=S,k=Q.sheet,m=a;m.firstChild;)m.removeChild(m.firstChild);m=N.createElementNS(a.namespaceURI,"div");m.style.display="inline-block";m.style.background="white";m.appendChild(f);a.appendChild(m);D=N.createElementNS(a.namespaceURI,"div");D.id="shadowContent";D.style.position="absolute";D.style.top=0;D.style.left=0;h.getContentElement().appendChild(D);
var q=f.body,l,w,v;w=[];for(l=q.firstChild;l&&l!==q;)if(l.namespaceURI===t&&(w[w.length]=l),l.firstChild)l=l.firstChild;else{for(;l&&l!==q&&!l.nextSibling;)l=l.parentNode;l&&l.nextSibling&&(l=l.nextSibling)}for(v=0;v<w.length;v+=1)l=w[v],g(h,"frame"+String(v),l,k);w=O.getODFElementsWithXPath(q,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(l=0;l<w.length;l+=1)q=w[l],q.setAttributeNS&&q.setAttributeNS("urn:webodf","containsparagraphanchor",!0);l=f.body.getElementsByTagNameNS(y,
"table-cell");for(q=0;q<l.length;q+=1)w=l.item(q),w.hasAttributeNS(y,"number-columns-spanned")&&w.setAttribute("colspan",w.getAttributeNS(y,"number-columns-spanned")),w.hasAttributeNS(y,"number-rows-spanned")&&w.setAttribute("rowspan",w.getAttributeNS(y,"number-rows-spanned"));d(h,f.body,k);b(f.body);s(f.body);r(h,f.body,k);x(h,f.body,k);l=f.body;var A,E,L,h={},q={},B;w=F.document.getElementsByTagNameNS(u,"list-style");for(f=0;f<w.length;f+=1)A=w.item(f),(E=A.getAttributeNS(n,"name"))&&(q[E]=A);l=
l.getElementsByTagNameNS(u,"list");for(f=0;f<l.length;f+=1)if(A=l.item(f),w=A.getAttributeNS(K,"id")){v=A.getAttributeNS(u,"continue-list");A.setAttribute("id",w);L="text|list#"+w+" > text|list-item > *:first-child:before {";if(E=A.getAttributeNS(u,"style-name")){A=q[E];B=z.getFirstNonWhitespaceChild(A);A=void 0;if("list-level-style-number"===B.localName){A=B.getAttributeNS(n,"num-format");E=B.getAttributeNS(n,"num-suffix");var H="",H={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},
I=void 0,I=B.getAttributeNS(n,"num-prefix")||"",I=H.hasOwnProperty(A)?I+(" counter(list, "+H[A]+")"):A?I+("'"+A+"';"):I+" ''";E&&(I+=" '"+E+"'");A=H="content: "+I+";"}else"list-level-style-image"===B.localName?A="content: none;":"list-level-style-bullet"===B.localName&&(A="content: '"+B.getAttributeNS(u,"bullet-char")+"';");B=A}if(v){for(A=h[v];A;)v=A,A=h[v];L+="counter-increment:"+v+";";B?(B=B.replace("list",v),L+=B):L+="content:counter("+v+");"}else v="",B?(B=B.replace("list",w),L+=B):L+="content: counter("+
w+");",L+="counter-increment:"+w+";",k.insertRule("text|list#"+w+" {counter-reset:"+w+"}",k.cssRules.length);L+="}";h[w]=v;L&&k.insertRule(L,k.cssRules.length)}m.insertBefore(D,m.firstChild);C();if(!c&&(k=[S],$.hasOwnProperty("statereadychange")))for(m=$.statereadychange,B=0;B<m.length;B+=1)m[B].apply(null,k)}S.state===odf.OdfContainer.DONE?e():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function Z(){S.state===odf.OdfContainer.DONE?e():(runtime.log("will be back later..."),
runtime.setTimeout(Z,500))},100))}function A(){if(v){for(var a=v.ownerDocument.createDocumentFragment();v.firstChild;)a.insertBefore(v.firstChild,null);v.parentNode.replaceChild(a,v)}}function H(a){a=a||F.event;for(var b=a.target,c=F.getSelection(),d=0<c.rangeCount?c.getRangeAt(0):null,e=d&&d.startContainer,k=d&&d.startOffset,f=d&&d.endContainer,g=d&&d.endOffset,n,m;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==u);)b=b.parentNode;Y&&(b&&b.parentNode!==v)&&(n=b.ownerDocument,m=n.documentElement.namespaceURI,
v?v.parentNode&&A():(v=n.createElementNS(m,"p"),v.style.margin="0px",v.style.padding="0px",v.style.border="0px",v.setAttribute("contenteditable",!0)),b.parentNode.replaceChild(v,b),v.appendChild(b),v.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),d.setStart(e,k),d.setEnd(f,g),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==a&&void 0!==a,"odf.OdfCanvas constructor needs DOM element");var N=a.ownerDocument,
S,R=new odf.Formatting,I=new q(a),B,J,P,Q,Y=!1,E=1,$={},v,aa=new h;k(N);B=new l(c(N));J=c(N);P=c(N);Q=c(N);this.refreshCSS=function(){p(S,R,P);C()};this.refreshSize=function(){C()};this.odfContainer=function(){return S};this.slidevisibilitycss=function(){return B.css};this.setOdfContainer=function(a,b){S=a;w(!0===b)};this.load=this.load=function(b){aa.clearQueue();a.innerHTML="loading "+b;a.removeAttribute("style");S=new odf.OdfContainer(b,function(a){S=a;w(!1)})};this.save=function(a){A();S.save(a)};
this.setEditable=function(b){f(a,"click",H);(Y=b)||A()};this.addListener=function(b,c){switch(b){case "selectionchange":I.addListener(b,c);break;case "click":f(a,b,c);break;default:var d=$[b];void 0===d&&(d=$[b]=[]);c&&-1===d.indexOf(c)&&d.push(c)}};this.getFormatting=function(){return R};this.setZoomLevel=function(a){E=a;C()};this.getZoomLevel=function(){return E};this.fitToContainingElement=function(b,c){var d=a.offsetHeight/E;E=b/(a.offsetWidth/E);c/d<E&&(E=c/d);C()};this.fitToWidth=function(b){E=
b/(a.offsetWidth/E);C()};this.fitSmart=function(b,c){var d,e;d=a.offsetWidth/E;e=a.offsetHeight/E;d=b/d;void 0!==c&&c/e<d&&(d=c/e);E=Math.min(1,d);C()};this.fitToHeight=function(b){E=b/(a.offsetHeight/E);C()};this.showFirstPage=function(){B.showFirstPage()};this.showNextPage=function(){B.showNextPage()};this.showPreviousPage=function(){B.showPreviousPage()};this.showPage=function(a){B.showPage(a);C()};this.showAllPages=function(){};this.getElement=function(){return a}};return odf.OdfCanvas}();
// Input 34
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(h,l,f){new odf.OdfContainer(h,function(q){if(q.state===odf.OdfContainer.INVALID)return f("Document "+h+" is invalid.");q.state===odf.OdfContainer.DONE?q.saveAs(l,function(l){f(l)}):f("Document was not completely loaded.")})};this.render=function(h,l,f){for(l=l.getElementsByTagName("body")[0];l.firstChild;)l.removeChild(l.firstChild);l=new odf.OdfCanvas(l);l.addListener("statereadychange",function(l){f(l)});l.load(h)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(h,l){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(h,l,f,q){};
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
ops.NowjsServer=function(){var h;this.getNowObject=function(){return h};this.connect=function(l,f){function q(){"unavailable"===h.networkStatus?(runtime.log("connection to server unavailable."),f("unavailable")):"ready"!==h.networkStatus?p>l?(runtime.log("connection to server timed out."),f("timeout")):(p+=100,runtime.getWindow().setTimeout(q,100)):(runtime.log("connection to collaboration server established."),f("ready"))}var p=0;h||(h=runtime.getVariable("now"),void 0===h&&(h={networkStatus:"unavailable"}),
q())};this.networkStatus=function(){return h?h.networkStatus:"unavailable"};this.login=function(l,f,q,p){h?h.login(l,f,q,p):p("Not connected to server")}};
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
ops.PullBoxServer=function(h){function l(f,a){var e=new XMLHttpRequest,d=new core.ByteArrayWriter("utf8");runtime.log("Sending message to server: "+f);d.appendString(f);d=d.getByteArray();e.open("POST",h.url,!0);e.onreadystatechange=function(){4===e.readyState&&((200>e.status||300<=e.status)&&0===e.status&&runtime.log("Status "+String(e.status)+": "+e.responseText||e.statusText),a(e.responseText))};d=d.buffer&&!e.sendAsBinary?d.buffer:runtime.byteArrayToString(d,"binary");try{e.sendAsBinary?e.sendAsBinary(d):
e.send(d)}catch(b){runtime.log("Problem with calling server: "+b+" "+d),a(b.message)}}var f=this,q,p=new core.Base64;h=h||{};h.url=h.url||"/WSER";this.call=l;this.getBase64=function(){return p};this.getToken=function(){return q};this.connect=function(f,a){a("ready")};this.networkStatus=function(){return"ready"};this.login=function(g,a,e,d){l("login:"+p.toBase64(g)+":"+p.toBase64(a),function(a){var g=runtime.fromJson(a);runtime.log("Login reply: "+a);g.hasOwnProperty("token")?(q=g.token,runtime.log("Caching token: "+
f.getToken()),e(g)):d(a)})}};
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
ops.Operation=function(){};ops.Operation.prototype.init=function(h){};ops.Operation.prototype.transform=function(h,l){};ops.Operation.prototype.execute=function(h){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var h=this,l,f;this.init=function(h){l=h.memberid;f=h.timestamp};this.transform=function(f,l){return[h]};this.execute=function(f){var h=f.getCursor(l);if(h)return!1;h=new ops.OdtCursor(l,f);f.addCursor(h);f.emit(ops.OdtDocument.signalCursorAdded,h);return!0};this.spec=function(){return{optype:"AddCursor",memberid:l,timestamp:f}}};
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
ops.OpApplyStyle=function(){function h(a){var d=0<=g?p+g:p,e=a.getIteratorAtPosition(0<=g?p:p+g),d=g?a.getIteratorAtPosition(d):e;a=a.getDOM().createRange();a.setStart(e.container(),e.unfilteredDomOffset());a.setEnd(d.container(),d.unfilteredDomOffset());return a}function l(a){var f=a.commonAncestorContainer,g=[];for(f.nodeType===Node.ELEMENT_NODE&&(g=d.getElementsByTagNameNS(f,"urn:oasis:names:tc:opendocument:xmlns:text:1.0","p").concat(d.getElementsByTagNameNS(f,"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"h")));f&&!e.isParagraph(f);)f=f.parentNode;f&&g.push(f);return g.filter(function(d){var c=d.nodeType===Node.TEXT_NODE?d.length:d.childNodes.length;return 0>=a.comparePoint(d,0)&&0<=a.comparePoint(d,c)})}var f,q,p,g,a,e=new odf.OdfUtils,d=new core.DomUtils;this.init=function(b){f=b.memberid;q=b.timestamp;p=parseInt(b.position,10);g=parseInt(b.length,10);a=b.info};this.transform=function(a,d){return null};this.execute=function(b){var d=h(b),e=l(d);b.getFormatting().applyStyle(f,d,a);d.detach();b.getOdfCanvas().refreshCSS();
e.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:f,timeStamp:q})});return!0};this.spec=function(){return{optype:"ApplyStyle",memberid:f,timestamp:q,position:p,length:g,info:a}}};
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
ops.OpRemoveCursor=function(){var h=this,l,f;this.init=function(h){l=h.memberid;f=h.timestamp};this.transform=function(f,p){var g=f.spec();return"RemoveCursor"===g.optype&&g.memberid===l?[]:[h]};this.execute=function(f){return f.removeCursor(l)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:l,timestamp:f}}};
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
ops.OpMoveCursor=function(){var h=this,l,f,q,p;this.init=function(g){l=g.memberid;f=g.timestamp;q=parseInt(g.position,10);p=void 0!==g.length?parseInt(g.length,10):0};this.merge=function(g){return"MoveCursor"===g.optype&&g.memberid===l?(q=g.position,p=g.length,f=g.timestamp,!0):!1};this.transform=function(f,a){var e=f.spec(),d=e.optype,b=[h];"RemoveText"===d?e.position+e.length<=q?q-=e.length:e.position<q&&(q=e.position):"SplitParagraph"===d?e.position<q&&(q+=1):"InsertText"===d?e.position<q&&(q+=
e.text.length):"RemoveCursor"===d&&e.memberid===l?b=[]:"InsertTable"===d&&(b=null);return b};this.execute=function(f){var a=f.getCursor(l),e=f.getCursorPosition(l),d=f.getPositionFilter(),b=q-e;if(!a)return!1;e=a.getStepCounter();b=0<b?e.countForwardSteps(b,d):0>b?-e.countBackwardSteps(-b,d):0;a.move(b);p&&(d=0<p?e.countForwardSteps(p,d):0>p?-e.countBackwardSteps(-p,d):0,a.move(d,!0));f.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:l,
timestamp:f,position:q,length:p}}};
// Input 43
ops.OpInsertTable=function(){function h(a,b){var c;if(1===s.length)c=s[0];else if(3===s.length)switch(a){case 0:c=s[0];break;case p-1:c=s[2];break;default:c=s[1]}else c=s[a];if(1===c.length)return c[0];if(3===c.length)switch(b){case 0:return c[0];case g-1:return c[2];default:return c[1]}return c[b]}var l=this,f,q,p,g,a,e,d,b,s;this.init=function(m){f=m.memberid;q=m.timestamp;a=parseInt(m.position,10);p=parseInt(m.initialRows,10);g=parseInt(m.initialColumns,10);e=m.tableName;d=m.tableStyleName;b=m.tableColumnStyleName;
s=m.tableCellStyleMatrix};this.transform=function(b,d){var c=b.spec(),e=c.optype,f=[l];if("InsertTable"===e)f=null;else if("SplitParagraph"===e)if(c.position<a)a+=1;else{if(c.position===a&&!d)return a+=1,null}else if("InsertText"===e)if(c.position<a)a+=c.text.length;else{if(c.position===a&&!d)return a+=c.text.length,null}else"RemoveText"===e&&(c.position+c.length<=a?a-=c.length:c.position<a&&(a=c.position));return f};this.execute=function(m){var k=m.getPositionInTextNode(a),c=m.getRootNode();if(k){var l=
m.getDOM(),r=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),s=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),n,C,y,u;d&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);e&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",e);s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",g);b&&s.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:style-name",b);r.appendChild(s);for(y=0;y<p;y+=1){s=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(u=0;u<g;u+=1)n=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(C=h(y,u))&&n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",C),C=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),n.appendChild(C),s.appendChild(n);r.appendChild(s)}k=m.getParagraphElement(k.textNode);
c.insertBefore(r,k?k.nextSibling:void 0);m.getOdfCanvas().refreshSize();m.emit(ops.OdtDocument.signalTableAdded,{tableElement:r,memberId:f,timeStamp:q});return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:f,timestamp:q,position:a,initialRows:p,initialColumns:g,tableName:e,tableStyleName:d,tableColumnStyleName:b,tableCellStyleMatrix:s}}};
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
ops.OpInsertText=function(){function h(a,e){var d=e.parentNode,b=e.nextSibling,f=[];a.getCursors().forEach(function(a){var b=a.getSelectedRange();!b||b.startContainer!==e&&b.endContainer!==e||f.push({cursor:a,startContainer:b.startContainer,startOffset:b.startOffset,endContainer:b.endContainer,endOffset:b.endOffset})});d.removeChild(e);d.insertBefore(e,b);f.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var l=
this,f,q,p,g;this.init=function(a){f=a.memberid;q=a.timestamp;p=parseInt(a.position,10);g=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===f&&a.position===p+g.length?(g+=a.text,q=a.timestamp,!0):!1};this.transform=function(a,e){var d=a.spec(),b=d.optype,f=[l];if("InsertText"===b)if(d.position<p)p+=d.text.length;else{if(d.position===p&&!e)return p+=d.text.length,null}else if("SplitParagraph"===b)if(d.position<p)p+=1;else{if(d.position===p&&!e)return p+=1,null}else"InsertTable"===
b?f=null:"RemoveText"===b&&(d.position+d.length<=p?p-=d.length:d.position<p&&(p=d.position));return f};this.execute=function(a){var e,d=g.split(" "),b,l,m,k,c=a.getRootNode().ownerDocument,t;if(e=a.getPositionInTextNode(p,f)){l=e.textNode;m=l.parentNode;k=l.nextSibling;b=e.offset;e=a.getParagraphElement(l);b!==l.length&&(k=l.splitText(b));0<d[0].length&&l.appendData(d[0]);for(t=1;t<d.length;t+=1)b=c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s"),b.appendChild(c.createTextNode(" ")),
m.insertBefore(b,k),0<d[t].length&&m.insertBefore(c.createTextNode(d[t]),k);h(a,l);0===l.length&&l.parentNode.removeChild(l);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:e,memberId:f,timeStamp:q});return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:f,timestamp:q,position:p,text:g}}};
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
ops.OpRemoveText=function(){function h(a){if(!d.isParagraph(a)&&(d.isGroupingElement(a)||d.isCharacterElement(a))&&0===a.textContent.length){for(a=a.firstChild;a;){if(d.isCharacterElement(a))return!1;a=a.nextSibling}return!0}return!1}function l(a,b,e){var c,f;c=e?b.lastChild:b.firstChild;for(e&&(f=a.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||a.firstChild);c;){b.removeChild(c);if("editinfo"!==c.localName)if(h(c))for(;c.firstChild;)a.insertBefore(c.firstChild,f);else a.insertBefore(c,
f);c=e?b.lastChild:b.firstChild}a=b.parentNode;a.removeChild(b);d.isListItem(a)&&0===a.childNodes.length&&a.parentNode.removeChild(a)}var f=this,q,p,g,a,e,d=new odf.OdfUtils,b;this.init=function(f){runtime.assert(0<=f.length,"OpRemoveText only supports positive lengths");q=f.memberid;p=f.timestamp;g=parseInt(f.position,10);a=parseInt(f.length,10);e=f.text;d=new odf.OdfUtils;b=new core.DomUtils};this.transform=function(b,d){var e=b.spec(),c=e.optype,l=g+a,h=[f];"RemoveText"===c?(c=e.position+e.length,
c<=g?g-=e.length:e.position<l&&(g<e.position?a=c<l?a-e.length:e.position-g:c<l?(g=e.position,a=l-c):h=[])):"InsertText"===c?e.position<=g&&(g+=e.text.length):"SplitParagraph"===c?e.position<=g&&(g+=1):"InsertTable"===c&&(h=null);return h};this.execute=function(d){var e=[],f,c,t,r=null,x=null,n;c=g;var C=a;d.upgradeWhitespacesAtPosition(c);f=d.getPositionInTextNode(c);var e=f.textNode,y=f.offset,u=e.parentNode;f=d.getParagraphElement(u);t=C;""===e.data?(u.removeChild(e),c=d.getTextNeighborhood(c,C)):
0!==y?(u=t<e.length-y?t:e.length-y,e.deleteData(y,u),d.upgradeWhitespacesAtPosition(c),c=d.getTextNeighborhood(c,C+u),t-=u,u&&c[0]===e&&c.splice(0,1)):c=d.getTextNeighborhood(c,C);for(e=c;t;)if(e[0]&&(r=e[0],x=r.parentNode,n=r.length),c=d.getParagraphElement(r),f!==c){if(c=d.getNeighboringParagraph(f,1))1<d.getWalkableParagraphLength(f)?l(f,c,!1):(l(c,f,!0),f=c);t-=1}else if(n<=t){x.removeChild(r);for(d.fixCursorPositions(q);h(x);)x=b.mergeIntoParent(x);t-=n;e.splice(0,1)}else r.deleteData(0,t),d.upgradeWhitespacesAtPosition(g),
t=0;d.fixCursorPositions(q);d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f,memberId:q,timeStamp:p});d.emit(ops.OdtDocument.signalCursorMoved,d.getCursor(q));return!0};this.spec=function(){return{optype:"RemoveText",memberid:q,timestamp:p,position:g,length:a,text:e}}};
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
ops.OpSplitParagraph=function(){var h=this,l,f,q,p=new odf.OdfUtils;this.init=function(g){l=g.memberid;f=g.timestamp;q=parseInt(g.position,10)};this.transform=function(f,a){var e=f.spec(),d=e.optype,b=[h];if("SplitParagraph"===d)if(e.position<q)q+=1;else{if(e.position===q&&!a)return q+=1,null}else if("InsertText"===d)if(e.position<q)q+=e.text.length;else{if(e.position===q&&!a)return q+=e.text.length,null}else"InsertTable"===d?b=null:"RemoveText"===d&&(e.position+e.length<=q?q-=e.length:e.position<
q&&(q=e.position));return b};this.execute=function(g){var a,e,d,b,h,m;a=g.getPositionInTextNode(q,l);if(!a)return!1;e=g.getParagraphElement(a.textNode);if(!e)return!1;d=p.isListItem(e.parentNode)?e.parentNode:e;0===a.offset?(m=a.textNode.previousSibling,h=null):(m=a.textNode,h=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==d;)if(a=a.parentNode,b=a.cloneNode(!1),m){for(h&&b.appendChild(h);m.nextSibling;)b.appendChild(m.nextSibling);a.parentNode.insertBefore(b,
a.nextSibling);m=a;h=b}else a.parentNode.insertBefore(b,a),m=b,h=a;p.isListItem(h)&&(h=h.childNodes[0]);g.fixCursorPositions(l);g.getOdfCanvas().refreshSize();g.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:e,memberId:l,timeStamp:f});g.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:h,memberId:l,timeStamp:f});return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:l,timestamp:f,position:q}}};
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
ops.OpSetParagraphStyle=function(){var h=this,l,f,q,p;this.init=function(g){l=g.memberid;f=g.timestamp;q=g.position;p=g.styleName};this.transform=function(f,a){var e=f.spec();"DeleteParagraphStyle"===e.optype&&e.styleName===p&&(p="");return[h]};this.execute=function(g){var a;if(a=g.getPositionInTextNode(q))if(a=g.getParagraphElement(a.textNode))return""!==p?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",p):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),g.getOdfCanvas().refreshSize(),g.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:f,memberId:l}),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:l,timestamp:f,position:q,styleName:p}}};
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
ops.OpUpdateParagraphStyle=function(){function h(a,b,d){var e,f,g;for(e=0;e<d.length;e+=1)f=d[e],g=b[f.propertyName],void 0!==g&&a.setAttributeNS(f.attrNs,f.attrPrefix+":"+f.attrLocaName,void 0!==f.unit?g+f.unit:g)}function l(a,b,d){var e,f;for(e=0;e<d.length;e+=1)f=d[e],-1!==b.indexOf(f.propertyName)&&a.removeAttributeNS(f.attrNs,f.attrLocaName)}function f(a,b,d,e,f){var g,m;if((a||b)&&(d||e))for(g=0;g<f.length;g+=1)if(m=f[g].propertyName,d&&void 0!==d[m]||e&&-1!==e.indexOf(m))a&&delete a[m],b&&
(m=b.indexOf(m),-1!==m&&b.splice(m,1))}function q(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}var p=this,g,a,e,d,b,s=[{propertyName:"fontSize",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"font-size",unit:"pt"},{propertyName:"fontName",attrNs:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",attrPrefix:"style",attrLocaName:"font-name"},{propertyName:"color",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",
attrLocaName:"color"},{propertyName:"backgroundColor",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"background-color"},{propertyName:"fontWeight",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"font-weight"},{propertyName:"fontStyle",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"font-style"},{propertyName:"underline",attrNs:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",
attrPrefix:"style",attrLocaName:"text-underline-style"},{propertyName:"strikethrough",attrNs:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",attrPrefix:"style",attrLocaName:"text-line-through-style"}],m=[{propertyName:"topMargin",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"margin-top",unit:"mm"},{propertyName:"bottomMargin",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"margin-bottom",unit:"mm"},
{propertyName:"leftMargin",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"margin-left",unit:"mm"},{propertyName:"rightMargin",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"margin-right",unit:"mm"},{propertyName:"textAlign",attrNs:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",attrPrefix:"fo",attrLocaName:"text-align"}];this.init=function(f){g=f.memberid;a=f.timestamp;e=f.styleName;
d=f.setProperties;b=f.removedProperties};this.transform=function(a,c){var g=a.spec(),l=g.optype;if("UpdateParagraphStyle"===l){if(!(g.styleName!==e||c||(f(d?d.paragraphProperties:null,b?b.paragraphPropertyNames:null,g.setProperties?g.setProperties.paragraphProperties:null,g.removedProperties?g.removedProperties.paragraphPropertyNames:null,m),f(d?d.textProperties:null,b?b.textPropertyNames:null,g.setProperties?g.setProperties.textProperties:null,g.removedProperties?g.removedProperties.textPropertyNames:
null,s),d&&(q(d.textProperties)||q(d.paragraphProperties))||b&&(0<b.textPropertyNames.length||0<b.paragraphPropertyNames.length))))return[]}else if("DeleteParagraphStyle"===l&&g.styleName===e)return[];return[p]};this.execute=function(a){var c,f,g,q;return(c=a.getParagraphStyleElement(e))?(f=c.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","paragraph-properties")[0],g=c.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties")[0],d&&(void 0===
f&&d.paragraphProperties&&(f=a.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:paragraph-properties"),c.appendChild(f)),void 0===g&&d.textProperties&&(g=a.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:text-properties"),c.appendChild(g)),d.paragraphProperties&&h(f,d.paragraphProperties,m),d.textProperties&&(d.textProperties.fontName&&!a.getOdfCanvas().getFormatting().getFontMap().hasOwnProperty(d.textProperties.fontName)&&(q=a.getDOM().createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0",
"style:font-face"),q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",d.textProperties.fontName),q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","svg:font-family",d.textProperties.fontName),a.getOdfCanvas().odfContainer().rootElement.fontFaceDecls.appendChild(q)),h(g,d.textProperties,s))),b&&(b.paragraphPropertyNames&&(l(f,b.paragraphPropertyNames,m),0===f.attributes.length&&c.removeChild(f)),b.textPropertyNames&&(l(g,b.textPropertyNames,s),
0===g.attributes.length&&c.removeChild(g))),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,e),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:g,timestamp:a,styleName:e,setProperties:d,removedProperties:b}}};
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
ops.OpCloneParagraphStyle=function(){var h=this,l,f,q,p,g;this.init=function(a){l=a.memberid;f=a.timestamp;q=a.styleName;p=a.newStyleName;g=a.newStyleDisplayName};this.transform=function(a,e){var d=a.spec();return"UpdateParagraphStyle"!==d.optype&&"DeleteParagraphStyle"!==d.optype||d.styleName!==q?[h]:null};this.execute=function(a){var e=a.getParagraphStyleElement(q),d;if(!e)return!1;d=e.cloneNode(!0);d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",p);g?d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0",
"style:display-name",g):d.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","display-name");e.parentNode.appendChild(d);a.getOdfCanvas().refreshCSS();a.emit(ops.OdtDocument.signalStyleCreated,p);return!0};this.spec=function(){return{optype:"CloneParagraphStyle",memberid:l,timestamp:f,styleName:q,newStyleName:p,newStyleDisplayName:g}}};
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
ops.OpDeleteParagraphStyle=function(){var h=this,l,f,q;this.init=function(h){l=h.memberid;f=h.timestamp;q=h.styleName};this.transform=function(f,g){var a=f.spec(),e=a.optype;if("DeleteParagraphStyle"===e){if(a.styleName===q)return[]}else if("SetParagraphStyle"===e&&a.styleName===q)return a.styleName="",e=new ops.OpSetParagraphStyle,e.init(a),[e,h];return[h]};this.execute=function(f){var g=f.getParagraphStyleElement(q);if(!g)return!1;g.parentNode.removeChild(g);f.getOdfCanvas().refreshCSS();f.emit(ops.OdtDocument.signalStyleDeleted,
q);return!0};this.spec=function(){return{optype:"DeleteParagraphStyle",memberid:l,timestamp:f,styleName:q}}};
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
ops.OperationFactory=function(){function h(f){return function(){return new f}}var l;this.register=function(f,h){l[f]=h};this.create=function(f){var h=null,p=l[f.optype];p&&(h=p(f),h.init(f));return h};l={AddCursor:h(ops.OpAddCursor),ApplyStyle:h(ops.OpApplyStyle),InsertTable:h(ops.OpInsertTable),InsertText:h(ops.OpInsertText),RemoveText:h(ops.OpRemoveText),SplitParagraph:h(ops.OpSplitParagraph),SetParagraphStyle:h(ops.OpSetParagraphStyle),UpdateParagraphStyle:h(ops.OpUpdateParagraphStyle),CloneParagraphStyle:h(ops.OpCloneParagraphStyle),
DeleteParagraphStyle:h(ops.OpDeleteParagraphStyle),MoveCursor:h(ops.OpMoveCursor),RemoveCursor:h(ops.OpRemoveCursor)}};
// Input 52
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(h,l){function f(){c.setUnfilteredPosition(h.getNode(),0);return c}function q(a,b,c){var d;c.setStart(a,b);d=c.getClientRects()[0];if(!d)if(d={},a.childNodes[b-1]){c.setStart(a,b-1);c.setEnd(a,b);b=c.getClientRects()[0];if(!b){for(c=b=0;a&&a.nodeType===Node.ELEMENT_NODE;)b+=a.offsetLeft-a.scrollLeft,c+=a.offsetTop-a.scrollTop,a=a.parentNode;b={top:c,left:b}}d.top=b.top;d.left=b.right;d.bottom=b.bottom}else a.nodeType===Node.TEXT_NODE?(a.previousSibling&&(d=a.previousSibling.getClientRects()[0]),
d||(c.setStart(a,0),c.setEnd(a,b),d=c.getClientRects()[0])):d=a.getClientRects()[0];return{top:d.top,left:d.left,bottom:d.bottom}}function p(a,b,c){var d=a,e=f(),k,g=l.ownerDocument.createRange(),m=h.getSelectedRange()?h.getSelectedRange().cloneRange():l.ownerDocument.createRange(),p;for(k=q(h.getNode(),0,g);0<d&&c();)d-=1;b?(b=e.container(),e=e.unfilteredDomOffset(),-1===m.comparePoint(b,e)?(m.setStart(b,e),p=!1):m.setEnd(b,e)):(m.setStart(e.container(),e.unfilteredDomOffset()),m.collapse(!0));h.setSelectedRange(m,
p);m=q(h.getNode(),0,g);if(m.top===k.top||void 0===t)t=m.left;window.clearTimeout(r);r=window.setTimeout(function(){t=void 0},2E3);g.detach();return a-d}function g(a){var b=f();return 1===a.acceptPosition(b)?!0:!1}function a(a,b){for(var c=f(),d=new core.LoopWatchDog(1E3),e=0,k=0;0<a&&c.nextPosition();)e+=1,d.check(),1===b.acceptPosition(c)&&(k+=e,e=0,a-=1);return k}function e(a,b){for(var c=f(),d=new core.LoopWatchDog(1E3),e=0,k=0;0<a&&c.previousPosition();)e+=1,d.check(),1===b.acceptPosition(c)&&
(k+=e,e=0,a-=1);return k}function d(a,b){var c=f(),d=0,e=0,k=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var g=b,m=k,h=c,p=h.container(),r=0,s=null,D=void 0,G=10,T=void 0,ba=0,V=void 0,ca=void 0,U=void 0,T=void 0,W=l.ownerDocument.createRange(),N=new core.LoopWatchDog(1E3),T=q(p,h.unfilteredDomOffset(),W),V=T.top,ca=void 0===t?T.left:t,U=V;!0===(0>m?h.previousPosition():h.nextPosition());)if(N.check(),1===g.acceptPosition(h)&&(r+=1,p=h.container(),T=q(p,h.unfilteredDomOffset(),W),T.top!==V)){if(T.top!==
U&&U!==V)break;U=T.top;T=Math.abs(ca-T.left);if(null===s||T<G)s=p,D=h.unfilteredDomOffset(),G=T,ba=r}null!==s?(h.setUnfilteredPosition(s,D),r=ba):r=0;W.detach();d+=r;if(0===d)break;e+=d;a-=1}return e*k}function b(a,b){var c=f(),d=k.getParagraphElement(c.getCurrentNode()),e=0,g,m,h,p,r=l.ownerDocument.createRange();0>a?(g=c.previousPosition,m=-1):(g=c.nextPosition,m=1);for(h=q(c.container(),c.unfilteredDomOffset(),r);g.call(c);)if(b.acceptPosition(c)===NodeFilter.FILTER_ACCEPT){if(k.getParagraphElement(c.getCurrentNode())!==
d)break;p=q(c.container(),c.unfilteredDomOffset(),r);if(p.bottom!==h.bottom&&(h=p.top>=h.top&&p.bottom<h.bottom||p.top<=h.top&&p.bottom>h.bottom,!h))break;e+=m;h=p}r.detach();return e}function s(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(d=b.firstChild;d!==a;)c+=1,d=d.nextSibling;return c}function m(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=f(),e=d.container(),k=d.unfilteredDomOffset(),
g=0,m=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(e,k);var e=a,k=b,h=d.container(),l=d.unfilteredDomOffset();if(e===h)e=l-k;else{var p=e.compareDocumentPosition(h);2===p?p=-1:4===p?p=1:10===p?(k=s(e,h),p=k<l?1:-1):(l=s(h,e),p=l<k?-1:1);e=p}if(0>e)for(;d.nextPosition()&&(m.check(),1===c.acceptPosition(d)&&(g+=1),d.container()!==
a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&(m.check(),1===c.acceptPosition(d)&&(g-=1),d.container()!==a||d.unfilteredDomOffset()!==b););return g}var k,c,t,r;this.movePointForward=function(a,b){return p(a,b,c.nextPosition)};this.movePointBackward=function(a,b){return p(a,b,c.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:a,countBackwardSteps:e,countLinesSteps:d,countStepsToLineBoundary:b,countStepsToPosition:m,isPositionWalkable:g}};(function(){k=
new odf.OdfUtils;c=gui.SelectionMover.createPositionIterator(l);var a=l.ownerDocument.createRange();a.setStart(c.container(),c.unfilteredDomOffset());a.collapse(!0);h.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(h){var l=new function(){this.acceptNode=function(f){return"urn:webodf:names:cursor"===f.namespaceURI||"urn:webodf:names:editinfo"===f.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(h,5,l,!1)};(function(){return gui.SelectionMover})();
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
ops.OperationTransformer=function(){function h(f,q){for(var p,g,a,e=[],d=[];0<f.length&&q;){p=f.shift();g=q;var b=void 0;a=b=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(p.spec()));runtime.log(runtime.toJson(g.spec()));b=l.create(g.spec());a=g.transform(p,!0);g=(b=p.transform(b,!1))&&a?{opsA:b,opsB:a}:null;if(!g)return null;e=e.concat(g.opsA);if(0===g.opsB.length){e=e.concat(f);q=null;break}if(1<g.opsB.length)for(p=0;p<g.opsB.length-1;p+=1){a=h(f,g.opsB[p]);if(!a)return null;
d=d.concat(a.opsB);f=a.opsA}q=g.opsB.pop()}q&&d.push(q);return{opsA:e,opsB:d}}var l;this.setOperationFactory=function(f){l=f};this.transform=function(f,q){var p,g=[],a,e=[];for(p=0;p<f.length;p+=1){a=l.create(f[p]);if(!a)return null;g.push(a)}for(p=0;p<q.length;p+=1){a=l.create(q[p]);a=h(g,a);if(!a)return null;g=a.opsA;e=e.concat(a.opsB)}return{opsA:g,opsB:e}}};
// Input 54
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(h,l){var f=this,q,p;this.removeFromOdtDocument=function(){p.remove()};this.move=function(g,a){var e=0;0<g?e=q.movePointForward(g,a):0>=g&&(e=-q.movePointBackward(-g,a));f.handleUpdate();return e};this.handleUpdate=function(){};this.getStepCounter=function(){return q.getStepCounter()};this.getMemberId=function(){return h};this.getNode=function(){return p.getNode()};this.getAnchorNode=function(){return p.getAnchorNode()};this.getSelectedRange=function(){return p.getSelectedRange()};
this.getOdtDocument=function(){return l};p=new core.Cursor(l.getDOM(),h);q=new gui.SelectionMover(p,l.getRootNode())};
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
ops.EditInfo=function(h,l){function f(){var f=[],a;for(a in p)p.hasOwnProperty(a)&&f.push({memberid:a,time:p[a].time});f.sort(function(a,d){return a.time-d.time});return f}var q,p={};this.getNode=function(){return q};this.getOdtDocument=function(){return l};this.getEdits=function(){return p};this.getSortedEdits=function(){return f()};this.addEdit=function(f,a){var e,d=f.split("___")[0];if(!p[f])for(e in p)if(p.hasOwnProperty(e)&&e.split("___")[0]===d){delete p[e];break}p[f]={time:a}};this.clearEdits=
function(){p={}};q=l.getDOM().createElementNS("urn:webodf:names:editinfo","editinfo");h.insertBefore(q,h.firstChild)};
// Input 56
gui.Avatar=function(h,l){var f=this,q,p,g;this.setColor=function(a){p.style.borderColor=a};this.setImageUrl=function(a){f.isVisible()?p.src=a:g=a};this.isVisible=function(){return"block"===q.style.display};this.show=function(){g&&(p.src=g,g=void 0);q.style.display="block"};this.hide=function(){q.style.display="none"};this.markAsFocussed=function(a){q.className=a?"active":""};(function(){var a=h.ownerDocument,e=a.documentElement.namespaceURI;q=a.createElementNS(e,"div");p=a.createElementNS(e,"img");
p.width=64;p.height=64;q.appendChild(p);q.style.width="64px";q.style.height="70px";q.style.position="absolute";q.style.top="-80px";q.style.left="-34px";q.style.display=l?"block":"none";h.appendChild(q)})()};
// Input 57
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(h,l){function f(){e&&a.parentNode&&!d&&(d=!0,p.style.borderColor="transparent"===p.style.borderColor?b:"transparent",runtime.setTimeout(function(){d=!1;f()},500))}function q(a){var b;if("string"===typeof a){if(""===a)return 0;b=/^(\d+)(\.\d+)?px$/.exec(a);runtime.assert(null!==b,"size ["+a+"] does not have unit px.");return parseFloat(b[1])}return a}var p,g,a,e=!1,d=!1,b="";this.setFocus=function(){e=!0;g.markAsFocussed(!0);f()};this.removeFocus=function(){e=!1;g.markAsFocussed(!1);
p.style.borderColor=b};this.setAvatarImageUrl=function(a){g.setImageUrl(a)};this.setColor=function(a){b!==a&&(b=a,"transparent"!==p.style.borderColor&&(p.style.borderColor=b),g.setColor(b))};this.getCursor=function(){return h};this.getFocusElement=function(){return p};this.toggleHandleVisibility=function(){g.isVisible()?g.hide():g.show()};this.showHandle=function(){g.show()};this.hideHandle=function(){g.hide()};this.ensureVisible=function(){var a,b,d,c,e,f,g,n=h.getOdtDocument().getOdfCanvas().getElement().parentNode;
e=g=p;d=runtime.getWindow();runtime.assert(null!==d,"Expected to be run in an environment which has a global window, like a browser.");do{e=e.parentElement;if(!e)break;f=d.getComputedStyle(e,null)}while("block"!==f.display);f=e;e=c=0;if(f&&n){b=!1;do{d=f.offsetParent;for(a=f.parentNode;a!==d;){if(a===n){a=f;var l=n,y=0;b=0;var u=void 0,w=runtime.getWindow();for(runtime.assert(null!==w,"Expected to be run in an environment which has a global window, like a browser.");a&&a!==l;)u=w.getComputedStyle(a,
null),y+=q(u.marginLeft)+q(u.borderLeftWidth)+q(u.paddingLeft),b+=q(u.marginTop)+q(u.borderTopWidth)+q(u.paddingTop),a=a.parentElement;a=y;c+=a;e+=b;b=!0;break}a=a.parentNode}if(b)break;c+=q(f.offsetLeft);e+=q(f.offsetTop);f=d}while(f&&f!==n);d=c;c=e}else c=d=0;d+=g.offsetLeft;c+=g.offsetTop;e=d-5;f=c-5;d=d+g.scrollWidth-1+5;g=c+g.scrollHeight-1+5;f<n.scrollTop?n.scrollTop=f:g>n.scrollTop+n.clientHeight-1&&(n.scrollTop=g-n.clientHeight+1);e<n.scrollLeft?n.scrollLeft=e:d>n.scrollLeft+n.clientWidth-
1&&(n.scrollLeft=d-n.clientWidth+1)};(function(){var b=h.getOdtDocument().getDOM();p=b.createElementNS(b.documentElement.namespaceURI,"span");a=h.getNode();a.appendChild(p);g=new gui.Avatar(a,l)})()};
// Input 58
runtime.loadClass("core.EventNotifier");
gui.ClickHandler=function(){function h(){f=0;q=null}var l,f=0,q=null,p=new core.EventNotifier([gui.ClickHandler.signalSingleClick,gui.ClickHandler.signalDoubleClick,gui.ClickHandler.signalTripleClick]);this.subscribe=function(f,a){p.subscribe(f,a)};this.handleMouseUp=function(g){var a=runtime.getWindow();q&&q.x===g.screenX&&q.y===g.screenY?(f+=1,1===f?p.emit(gui.ClickHandler.signalSingleClick,void 0):2===f?p.emit(gui.ClickHandler.signalDoubleClick,void 0):3===f&&(a.clearTimeout(l),p.emit(gui.ClickHandler.signalTripleClick,
void 0),h())):(p.emit(gui.ClickHandler.signalSingleClick,void 0),f=1,q={x:g.screenX,y:g.screenY},a.clearTimeout(l),l=a.setTimeout(h,400))}};gui.ClickHandler.signalSingleClick="click";gui.ClickHandler.signalDoubleClick="doubleClick";gui.ClickHandler.signalTripleClick="tripleClick";(function(){return gui.ClickHandler})();
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
gui.KeyboardHandler=function(){function h(f,g){g||(g=g.None);return f+":"+g}var l=gui.KeyboardHandler.Modifier,f=null,q={};this.setDefault=function(h){f=h};this.bind=function(f,g,a){f=h(f,g);runtime.assert(!1===q.hasOwnProperty(f),"tried to overwrite the callback handler of key combo: "+f);q[f]=a};this.unbind=function(f,g){var a=h(f,g);delete q[a]};this.reset=function(){f=null;q={}};this.handleEvent=function(p){var g=p.keyCode,a=l.None;p.metaKey&&(a|=l.Meta);p.ctrlKey&&(a|=l.Ctrl);p.altKey&&(a|=l.Alt);
p.shiftKey&&(a|=l.Shift);g=h(g,a);g=q[g];a=!1;g?a=g():null!==f&&(a=f(p));a&&(p.preventDefault?p.preventDefault():p.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,Z:90};(function(){return gui.KeyboardHandler})();
// Input 60
gui.Clipboard=function(){this.setDataFromRange=function(h,l){var f=!0,q,p=h.clipboardData,g=runtime.getWindow(),a,e;!p&&g&&(p=g.clipboardData);p?(g=new XMLSerializer,a=runtime.getDOMImplementation().createDocument("","",null),q=a.importNode(l.cloneContents(),!0),e=a.createElement("span"),e.appendChild(q),a.appendChild(e),q=p.setData("text/plain",l.toString()),f=f&&q,q=p.setData("text/html",g.serializeToString(a)),f=f&&q,h.preventDefault()):f=!1;return f}};(function(){return gui.Clipboard})();
// Input 61
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("gui.ClickHandler");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.Clipboard");
gui.SessionController=function(){gui.SessionController=function(h,l){function f(a,b,c,d){var e="on"+b,f=!1;a.attachEvent&&(f=a.attachEvent(e,c));!f&&a.addEventListener&&(a.addEventListener(b,c,!1),f=!0);f&&!d||!a.hasOwnProperty(e)||(a[e]=c)}function q(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function p(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function g(a,b){var c=new ops.OpMoveCursor;c.init({memberid:l,
position:a,length:b||0});return c}function a(a,b){var c=gui.SelectionMover.createPositionIterator(v.getRootNode()),d=v.getOdfCanvas().getElement(),e;if(e=a){for(;e!==d&&!("urn:webodf:names:cursor"===e.namespaceURI&&"cursor"===e.localName||"urn:webodf:names:editinfo"===e.namespaceURI&&"editinfo"===e.localName);)if(e=e.parentNode,!e)return;e!==d&&a!==e&&(a=e.parentNode,b=Array.prototype.indexOf.call(a.childNodes,e));c.setUnfilteredPosition(a,b);return v.getDistanceFromCursor(l,c.container(),c.unfilteredDomOffset())}}
function e(){var b=runtime.getWindow().getSelection(),c=v.getCursorPosition(l),d;d=a(b.anchorNode,b.anchorOffset);b=a(b.focusNode,b.focusOffset);if(0!==b||0!==d)c=g(c+d,b-d),h.enqueue(c)}function d(){var a=gui.SelectionMover.createPositionIterator(v.getRootNode()),b=v.getCursor(l).getNode(),c=v.getCursorPosition(l),d=/[A-Za-z0-9]/,e=0,f=0,k,n,m;a.setUnfilteredPosition(b,0);if(a.previousPosition()&&(k=a.getCurrentNode(),k.nodeType===Node.TEXT_NODE))for(n=k.data.length-1;0<=n;n-=1)if(m=k.data[n],d.test(m))e-=
1;else break;a.setUnfilteredPosition(b,0);if(a.nextPosition()&&(k=a.getCurrentNode(),k.nodeType===Node.TEXT_NODE))for(n=0;n<k.data.length;n+=1)if(m=k.data[n],d.test(m))f+=1;else break;if(0!==e||0!==f)a=g(c+e,Math.abs(e)+Math.abs(f)),h.enqueue(a)}function b(){var a=gui.SelectionMover.createPositionIterator(v.getRootNode()),b=v.getParagraphElement(v.getCursor(l).getNode()),c=v.getCursorPosition(l),d;d=v.getDistanceFromCursor(l,b,0);a.moveToEndOfNode(b);a=v.getDistanceFromCursor(l,b,a.unfilteredDomOffset());
if(0!==d||0!==a)c=g(c+d,Math.abs(d)+Math.abs(a)),h.enqueue(c)}function s(a){a&&h.enqueue(a)}function m(a,b){var c=v.getCursorSelection(l);return 0===a&&0===b?null:g(c.position+a,0!==b?c.length+b:0)}function k(){s(m(-1,0));return!0}function c(){s(m(1,0));return!0}function t(){s(m(0,-1));return!0}function r(){s(m(0,1));return!0}function x(a,b){var c=v.getParagraphElement(v.getCursor(l).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=v.getCursor(l).getStepCounter().countLinesSteps(a,
v.getPositionFilter());return b?m(0,c):m(c,0)}function n(){s(x(-1,!1));return!0}function C(){s(x(1,!1));return!0}function y(){s(x(-1,!0));return!0}function u(){s(x(1,!0));return!0}function w(a,b){var c=v.getCursor(l).getStepCounter().countStepsToLineBoundary(a,v.getPositionFilter());return b?m(0,c):m(c,0)}function K(){s(w(-1,!1));return!0}function A(){s(w(1,!1));return!0}function F(){s(w(-1,!0));return!0}function O(){s(w(1,!0));return!0}function z(){var a=v.getParagraphElement(v.getCursor(l).getNode()),
b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");c=v.getDistanceFromCursor(l,a,0);b=gui.SelectionMover.createPositionIterator(v.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),aa.isParagraph(a)&&(c=v.getDistanceFromCursor(l,a,0));s(m(0,c));return!0}function H(){var a=v.getParagraphElement(v.getCursor(l).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(v.getRootNode());
b.moveToEndOfNode(a);for(c=v.getDistanceFromCursor(l,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),aa.isParagraph(a)&&(b.moveToEndOfNode(a),c=v.getDistanceFromCursor(l,b.container(),b.unfilteredDomOffset()));s(m(0,c));return!0}function D(a,b){var c=gui.SelectionMover.createPositionIterator(v.getRootNode());0<a&&c.moveToEnd();c=v.getDistanceFromCursor(l,c.container(),c.unfilteredDomOffset());return b?m(0,c):m(c,0)}function G(){s(D(-1,!1));return!0}function T(){s(D(1,
!1));return!0}function ba(){s(D(-1,!0));return!0}function V(){s(D(1,!0));return!0}function ca(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function U(a){var b=new ops.OpRemoveText;b.init({memberid:l,position:a.position,length:a.length});return b}function W(){var a=ca(v.getCursorSelection(l)),b=null;0===a.length?0<a.position&&v.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:l,position:a.position-1,length:1})):b=U(a);s(b);return!0}function N(){var a=
ca(v.getCursorSelection(l)),b=null;0===a.length?v.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:l,position:a.position,length:1})):b=U(a);s(b);return null!==b}function S(){var a=v.getCursorPosition(l),b;b=new ops.OpSplitParagraph;b.init({memberid:l,position:a});h.enqueue(b);return!0}function R(){var a=v.getCursor(l),b=runtime.getWindow().getSelection();b.removeAllRanges();b.addRange(a.getSelectedRange().cloneRange())}function I(a){var b=v.getCursor(l);b.getSelectedRange().collapsed||
(ga.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=ca(h.getOdtDocument().getCursorSelection(l)),b.init({memberid:l,position:a.position,length:a.length}),h.enqueue(b)):runtime.log("Cut operation failed"))}function B(){return!1!==v.getCursor(l).getSelectedRange().collapsed}function J(a){var b,c;window.clipboardData&&window.clipboardData.getData?b=window.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(c=new ops.OpInsertText,
c.init({memberid:l,position:v.getCursorPosition(l),text:b}),h.enqueue(c),a.preventDefault?a.preventDefault():a.returnValue=!1)}function P(){return!1}function Q(a){if(X)X.onOperationExecuted(a)}function Y(a){v.emit(ops.OdtDocument.signalUndoStackChanged,a)}function E(){return X?(X.moveBackward(1),R(),!0):!1}function $(){return X?(X.moveForward(1),R(),!0):!1}var v=h.getOdtDocument(),aa=new odf.OdfUtils,ga=new gui.Clipboard,L=new gui.ClickHandler,M=new gui.KeyboardHandler,Z=new gui.KeyboardHandler,X;
this.startEditing=function(){var a;a=v.getOdfCanvas().getElement();f(a,"keydown",M.handleEvent);f(a,"keypress",Z.handleEvent);f(a,"keyup",p);f(a,"beforecut",B,!0);f(a,"mouseup",L.handleMouseUp);f(a,"cut",I);f(a,"beforepaste",P,!0);f(a,"paste",J);v.subscribe(ops.OdtDocument.signalOperationExecuted,R);v.subscribe(ops.OdtDocument.signalOperationExecuted,Q);a=new ops.OpAddCursor;a.init({memberid:l});h.enqueue(a);X&&X.saveInitialState()};this.endEditing=function(){var a;v.unsubscribe(ops.OdtDocument.signalOperationExecuted,
Q);v.unsubscribe(ops.OdtDocument.signalOperationExecuted,R);a=v.getOdfCanvas().getElement();q(a,"keydown",M.handleEvent);q(a,"keypress",Z.handleEvent);q(a,"keyup",p);q(a,"cut",I);q(a,"beforecut",B);q(a,"paste",J);q(a,"mouseup",L.handleMouseUp);q(a,"beforepaste",P);a=new ops.OpRemoveCursor;a.init({memberid:l});h.enqueue(a);X&&X.resetInitialState()};this.getInputMemberId=function(){return l};this.getSession=function(){return h};this.setUndoManager=function(a){X&&X.unsubscribe(gui.UndoManager.signalUndoStackChanged,
Y);if(X=a)X.setOdtDocument(v),X.setPlaybackFunction(function(a){a.execute(v)}),X.subscribe(gui.UndoManager.signalUndoStackChanged,Y)};this.getUndoManager=function(){return X};(function(){var a=-1!==runtime.getWindow().navigator.appVersion.toLowerCase().indexOf("mac"),f=gui.KeyboardHandler.Modifier,g=gui.KeyboardHandler.KeyCode;M.bind(g.Left,f.None,k);M.bind(g.Right,f.None,c);M.bind(g.Up,f.None,n);M.bind(g.Down,f.None,C);M.bind(g.Backspace,f.None,W);M.bind(g.Delete,f.None,N);M.bind(g.Left,f.Shift,
t);M.bind(g.Right,f.Shift,r);M.bind(g.Up,f.Shift,y);M.bind(g.Down,f.Shift,u);M.bind(g.Home,f.None,K);M.bind(g.End,f.None,A);M.bind(g.Home,f.Ctrl,G);M.bind(g.End,f.Ctrl,T);M.bind(g.Home,f.Shift,F);M.bind(g.End,f.Shift,O);M.bind(g.Up,f.CtrlShift,z);M.bind(g.Down,f.CtrlShift,H);M.bind(g.Home,f.CtrlShift,ba);M.bind(g.End,f.CtrlShift,V);a?(M.bind(g.Left,f.Meta,K),M.bind(g.Right,f.Meta,A),M.bind(g.Home,f.Meta,G),M.bind(g.End,f.Meta,T),M.bind(g.Left,f.MetaShift,F),M.bind(g.Right,f.MetaShift,O),M.bind(g.Up,
f.AltShift,z),M.bind(g.Down,f.AltShift,H),M.bind(g.Up,f.MetaShift,ba),M.bind(g.Down,f.MetaShift,V),M.bind(g.Z,f.Meta,E),M.bind(g.Z,f.MetaShift,$)):(M.bind(g.Z,f.Ctrl,E),M.bind(g.Z,f.CtrlShift,$));Z.setDefault(function(a){a=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;var b=new ops.OpInsertText;b.init({memberid:l,position:v.getCursorPosition(l),text:a});h.enqueue(b);return!0});Z.bind(g.Enter,f.None,S);L.subscribe(gui.ClickHandler.signalSingleClick,
e);L.subscribe(gui.ClickHandler.signalDoubleClick,d);L.subscribe(gui.ClickHandler.signalTripleClick,b)})()};return gui.SessionController}();
// Input 62
ops.UserModel=function(){};ops.UserModel.prototype.getUserDetailsAndUpdates=function(h,l){};ops.UserModel.prototype.unsubscribeUserDetailsUpdates=function(h,l){};
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
ops.TrivialUserModel=function(){var h={bob:{memberid:"bob",fullname:"Bob Pigeon",color:"red",imageurl:"avatar-pigeon.png"},alice:{memberid:"alice",fullname:"Alice Bee",color:"green",imageurl:"avatar-flower.png"},you:{memberid:"you",fullname:"I, Robot",color:"blue",imageurl:"avatar-joe.png"}};this.getUserDetailsAndUpdates=function(l,f){var q=l.split("___")[0];f(l,h[q]||null)};this.unsubscribeUserDetailsUpdates=function(h,f){}};
// Input 64
ops.NowjsUserModel=function(h){var l={},f={},q=h.getNowObject();this.getUserDetailsAndUpdates=function(h,g){var a=h.split("___")[0],e=l[a],d=f[a]=f[a]||[],b;runtime.assert(void 0!==g,"missing callback");for(b=0;b<d.length&&(d[b].subscriber!==g||d[b].memberId!==h);b+=1);b<d.length?runtime.log("double subscription request for "+h+" in NowjsUserModel::getUserDetailsAndUpdates"):(d.push({memberId:h,subscriber:g}),1===d.length&&q.subscribeUserDetailsUpdates(a));e&&g(h,e)};this.unsubscribeUserDetailsUpdates=
function(h,g){var a,e=h.split("___")[0],d=f[e];runtime.assert(void 0!==g,"missing subscriber parameter or null");runtime.assert(d,"tried to unsubscribe when no one is subscribed ('"+h+"')");if(d){for(a=0;a<d.length&&(d[a].subscriber!==g||d[a].memberId!==h);a+=1);runtime.assert(a<d.length,"tried to unsubscribe when not subscribed for memberId '"+h+"'");d.splice(a,1);0===d.length&&(runtime.log("no more subscribers for: "+h),delete f[e],delete l[e],q.unsubscribeUserDetailsUpdates(e))}};q.updateUserDetails=
function(h,g){var a=g?{userid:g.uid,fullname:g.fullname,imageurl:"/user/"+g.avatarId+"/avatar.png",color:g.color}:null,e,d;if(e=f[h])for(l[h]=a,d=0;d<e.length;d+=1)e[d].subscriber(e[d].memberId,a)};runtime.assert("ready"===q.networkStatus,"network not ready")};
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
ops.PullBoxUserModel=function(h){function l(){var a=h.getBase64(),e,d=[];for(e in p)p.hasOwnProperty(e)&&d.push(e);runtime.log("user-list request for : "+d.join(","));h.call("user-list:"+a.toBase64(h.getToken())+":"+d.join(","),function(a){var d=runtime.fromJson(a),f;runtime.log("user-list reply: "+a);if(d.hasOwnProperty("userdata_list"))for(a=d.userdata_list,e=0;e<a.length;e+=1){if(d={userid:a[e].uid,fullname:a[e].fullname,imageurl:"/user/"+a[e].avatarId+"/avatar.png",color:a[e].color},f=q.hasOwnProperty(a[e].uid)?
q[a[e].uid]:null,!f||f.fullname!==d.fullname||f.imageurl!==d.imageurl||f.color!==d.color){var k=f=void 0;if(f=p[d.userid])for(q[d.userid]=d,k=0;k<f.length;k+=1)f[k].subscriber(f[k].memberId,d)}}else runtime.log("Meh, userlist data broken: "+a)})}function f(){g&&(l(),runtime.setTimeout(f,2E4))}var q={},p={},g=!1;this.getUserDetailsAndUpdates=function(a,e){var d=a.split("___")[0],b=q[d],d=p[d]=p[d]||[],h;runtime.assert(void 0!==e,"missing callback");for(h=0;h<d.length&&(d[h].subscriber!==e||d[h].memberId!==
a);h+=1);h<d.length?runtime.log("double subscription request for "+a+" in PullBoxUserModel::getUserDetailsAndUpdates"):(d.push({memberId:a,subscriber:e}),1===d.length&&l());b&&e(a,b);g||(g=!0,runtime.setTimeout(f,2E4))};this.unsubscribeUserDetailsUpdates=function(a,e){var d,b=a.split("___")[0],f=p[b];runtime.assert(void 0!==e,"missing subscriber parameter or null");runtime.assert(f,"tried to unsubscribe when no one is subscribed ('"+a+"')");if(f){for(d=0;d<f.length&&(f[d].subscriber!==e||f[d].memberId!==
a);d+=1);runtime.assert(d<f.length,"tried to unsubscribe when not subscribed for memberId '"+a+"'");f.splice(d,1);if(0===f.length){runtime.log("no more subscribers for: "+a);delete p[b];delete q[b];a:{var h;if(g){for(h in p)if(p.hasOwnProperty(h))break a;g=!1}}}}};runtime.assert("ready"===h.networkStatus(),"network not ready")};
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
ops.TrivialOperationRouter=function(){var h,l;this.setOperationFactory=function(f){h=f};this.setPlaybackFunction=function(f){l=f};this.push=function(f){f=f.spec();f.timestamp=(new Date).getTime();f=h.create(f);l(f)}};
// Input 68
ops.NowjsOperationRouter=function(h,l,f){function q(a){var f;f=p.create(a);runtime.log(" op in: "+runtime.toJson(a));if(null!==f)if(a=Number(a.server_seq),runtime.assert(!isNaN(a),"server seq is not a number"),a===e+1)for(g(f),e=a,b=0,f=e+1;d.hasOwnProperty(f);f+=1)g(d[f]),delete d[f],runtime.log("op with server seq "+a+" taken from hold (reordered)");else runtime.assert(a!==e+1,"received incorrect order from server"),runtime.assert(!d.hasOwnProperty(a),"reorder_queue has incoming op"),runtime.log("op with server seq "+
a+" put on hold"),d[a]=f;else runtime.log("ignoring invalid incoming opspec: "+a)}var p,g,a=f.getNowObject(),e=-1,d={},b=0,s=1E3;this.setOperationFactory=function(a){p=a};this.setPlaybackFunction=function(a){g=a};a.ping=function(a){null!==l&&a(l)};a.receiveOp=function(a,b){a===h&&q(b)};this.push=function(d){d=d.spec();runtime.assert(null!==l,"Router sequence N/A without memberid");s+=1;d.client_nonce="C:"+l+":"+s;d.parent_op=e+"+"+b;b+=1;runtime.log("op out: "+runtime.toJson(d));a.deliverOp(h,d)};
this.requestReplay=function(b){a.requestReplay(h,function(a){runtime.log("replaying: "+runtime.toJson(a));q(a)},function(a){runtime.log("replay done ("+a+" ops).");b&&b()})};(function(){a.memberid=l;a.joinSession(h,function(a){runtime.assert(a,"Trying to join a session which does not exists or where we are already in")})})()};
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
ops.PullBoxOperationRouter=function(h,l,f){function q(a){var b,c,e,f=[];for(b=0;b<a.length;)if(e=d.create(a[b]),null!==e&&e.merge){for(c=b+1;c<a.length&&e.merge(a[c]);c+=1)runtime.log("Merged: "+a[b].optype+" with "+a[c].optype);f.push(e.spec());b=c}else f.push(a[b]),b+=1;runtime.log("Merged: from "+a.length+" to "+f.length+" specs");return f}function p(){function a(){var e,f,g;c=!1;for(g=(new Date).getTime();0<C.length&&!(500<(new Date).getTime()-g);)e=C.shift(),f=d.create(e),runtime.log(" op in: "+
runtime.toJson(e)),null!==f?s(f):runtime.log("ignoring invalid incoming opspec: "+e);0<C.length?(c=!0,runtime.getWindow().setTimeout(a,1)):b&&(b(),b=null)}c||a()}function g(a){var b;if(!a)return runtime.assert(!1,"no opspecs received!"),!1;b=y.transform(n,a);if(!b)return!1;for(a=0;a<b.opsB.length;a+=1)C.push(b.opsB[a].spec());n=[];for(a=0;a<b.opsA.length;a+=1)n.push(b.opsA[a].spec());return!0}function a(){function b(){var c={active:!0};m=c;runtime.getWindow().setTimeout(function(){runtime.log("Pulling activated:"+
c.active);m=null;c.active&&a()},8E3)}function c(){var a=f.getBase64(),d;t||r||(t=!0,d=n,n=[],f.call("sync-ops:"+a.toBase64(f.getToken())+":"+a.toBase64(h)+":"+a.toBase64(l)+":"+a.toBase64(String(x))+":"+runtime.toJson(d),function(a){var e=!1,f=runtime.fromJson(a);runtime.log("sync-ops reply: "+a);"newOps"===f.result?0<f.ops.length&&(0===n.length?(a=q(f.ops),C=C.concat(a)):(runtime.log("meh, have new ops locally meanwhile, have to do transformations."),r=!g(q(f.ops))),x=f.headSeq):"added"===f.result?
(runtime.log("All added to server"),x=f.headSeq):"conflict"===f.result?(n=d.concat(n),runtime.log("meh, server has new ops meanwhile, have to do transformations."),r=!g(q(f.ops)),x=f.headSeq,r||(e=!0)):runtime.assert(!1,"Unexpected result on sync-ops call: "+f.result);t=!1;r?runtime.assert(!1,"Sorry to tell:\nwe hit a pair of operations in a state which yet need to be supported for transformation against each other.\nClient disconnected from session, no further editing accepted.\n\nPlease reconnect manually for now."):
(e?c():(runtime.log("Preparing next: "+(0===n.length)),0===n.length&&b()),p())}))}c()}function e(){t||k||(k=!0,m&&(m.active=!1),runtime.getWindow().setTimeout(function(){runtime.log("Pushing activated");k=!1;a()},3E3))}var d,b,s,m=null,k=!1,c=!1,t=!1,r=!1,x="",n=[],C=[],y=new ops.OperationTransformer;this.requestReplay=function(c){b=c;a()};this.setOperationFactory=function(a){d=a;y.setOperationFactory(a)};this.setPlaybackFunction=function(a){s=a};this.push=function(a){var b=a.spec();r||0<C.length||
(b.timestamp=(new Date).getTime(),a=d.create(b),s(a),n.push(b),e())};(function(){var a=f.getBase64();f.call("join-session:"+a.toBase64(f.getToken())+":"+a.toBase64(h)+":"+a.toBase64(l),function(a){var b=Boolean(runtime.fromJson(a));runtime.log("join-session reply: "+a);runtime.assert(b,"Trying to join a session which does not exists or where we are already in")})})()};
// Input 70
gui.EditInfoHandle=function(h){var l=[],f,q=h.ownerDocument,p=q.documentElement.namespaceURI;this.setEdits=function(g){l=g;var a,e,d,b;f.innerHTML="";for(g=0;g<l.length;g+=1)a=q.createElementNS(p,"div"),a.className="editInfo",e=q.createElementNS(p,"span"),e.className="editInfoColor",e.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),d=q.createElementNS(p,"span"),d.className="editInfoAuthor",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),
b=q.createElementNS(p,"span"),b.className="editInfoTime",b.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),b.innerHTML=l[g].time,a.appendChild(e),a.appendChild(d),a.appendChild(b),f.appendChild(a)};this.show=function(){f.style.display="block"};this.hide=function(){f.style.display="none"};f=q.createElementNS(p,"div");f.setAttribute("class","editInfoHandle");f.style.display="none";h.appendChild(f)};
// Input 71
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(h,l){function f(b,d){return window.setTimeout(function(){a.style.opacity=b},d)}var q=this,p,g,a,e,d;this.addEdit=function(b,l){var m=Date.now()-l;h.addEdit(b,l);g.setEdits(h.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);e&&window.clearTimeout(e);d&&window.clearTimeout(d);1E4>m?(f(1,0),e=f(0.5,1E4-m),d=f(0.2,2E4-m)):1E4<=m&&2E4>m?(f(0.5,0),d=f(0.2,2E4-m)):f(0.2,0)};this.getEdits=function(){return h.getEdits()};this.clearEdits=function(){h.clearEdits();
g.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return h};this.show=function(){a.style.display="block"};this.hide=function(){q.hideHandle();a.style.display="none"};this.showHandle=function(){g.show()};this.hideHandle=function(){g.hide()};(function(){var b=h.getOdtDocument().getDOM();a=b.createElementNS(b.documentElement.namespaceURI,"div");a.setAttribute("class","editInfoMarker");
a.onmouseover=function(){q.showHandle()};a.onmouseout=function(){q.hideHandle()};p=h.getNode();p.appendChild(a);g=new gui.EditInfoHandle(p);l||q.hide()})()};
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
gui.SessionView=function(){return function(h,l,f){function q(a,b,c){c=c.split("___")[0];return a+"."+b+'[editinfo|memberid^="'+c+'"]'}function p(a,b,c){function d(b,c,e){e=q(b,c,a)+e;a:{var f=m.firstChild;for(b=q(b,c,a);f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=e:m.appendChild(document.createTextNode(e))}d("div","editInfoMarker","{ background-color: "+c+"; }");d("span","editInfoColor","{ background-color: "+c+"; }");d("span","editInfoAuthor",
':before { content: "'+b+'"; }')}function g(a){var b,c;for(c in k)k.hasOwnProperty(c)&&(b=k[c],a?b.show():b.hide())}function a(a){var b,c;for(c in s)s.hasOwnProperty(c)&&(b=s[c],a?b.showHandle():b.hideHandle())}function e(a,b){var c=s[a];void 0===b?runtime.log('UserModel sent undefined data for member "'+a+'".'):(null===b&&(b={memberid:a,fullname:"Unknown Identity",color:"black",imageurl:"avatar-joe.png"}),c&&(c.setAvatarImageUrl(b.imageurl),c.setColor(b.color)),p(a,b.fullname,b.color))}function d(a){var b=
f.createCaret(a,t);a=a.getMemberId();var c=l.getUserModel();s[a]=b;e(a,null);c.getUserDetailsAndUpdates(a,e);runtime.log("+++ View here +++ eagerly created an Caret for '"+a+"'! +++")}function b(a){var b=!1,c;delete s[a];for(c in k)if(k.hasOwnProperty(c)&&k[c].getEditInfo().getEdits().hasOwnProperty(a)){b=!0;break}b||l.getUserModel().unsubscribeUserDetailsUpdates(a,e)}var s={},m,k={},c=void 0!==h.editInfoMarkersInitiallyVisible?h.editInfoMarkersInitiallyVisible:!0,t=void 0!==h.caretAvatarsInitiallyVisible?
h.caretAvatarsInitiallyVisible:!0;this.showEditInfoMarkers=function(){c||(c=!0,g(c))};this.hideEditInfoMarkers=function(){c&&(c=!1,g(c))};this.showCaretAvatars=function(){t||(t=!0,a(t))};this.hideCaretAvatars=function(){t&&(t=!1,a(t))};this.getSession=function(){return l};this.getCaret=function(a){return s[a]};(function(){var a=l.getOdtDocument(),e=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,d);a.subscribe(ops.OdtDocument.signalCursorRemoved,b);a.subscribe(ops.OdtDocument.signalParagraphChanged,
function(a){var b=a.paragraphElement,d=a.memberId;a=a.timeStamp;var e,f="",g=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0];g?(f=g.getAttributeNS("urn:webodf:names:editinfo","id"),e=k[f]):(f=Math.random().toString(),e=new ops.EditInfo(b,l.getOdtDocument()),e=new gui.EditInfoMarker(e,c),g=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0],g.setAttributeNS("urn:webodf:names:editinfo","id",f),k[f]=e);e.addEdit(d,new Date(a))});m=document.createElementNS(e.namespaceURI,
"style");m.type="text/css";m.media="screen, print, handheld, projection";m.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));e.appendChild(m)})()}}();
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
runtime.loadClass("gui.Caret");gui.CaretFactory=function(h){this.createCaret=function(l,f){var q=l.getMemberId(),p=h.getSession().getOdtDocument(),g=p.getOdfCanvas().getElement(),a=new gui.Caret(l,f);q===h.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+q),p.subscribe(ops.OdtDocument.signalParagraphChanged,function(e){e.memberId===q&&a.ensureVisible()}),l.handleUpdate=a.ensureVisible,g.setAttribute("tabindex",0),g.onfocus=a.setFocus,g.onblur=a.removeFocus,g.focus());return a}};
// Input 74
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var h=new xmldom.XPath;return function(l){var f=this;f.setInitialSlideMode=function(){f.startSlideMode("single")};f.keyDownHandler=function(h){if(!h.target.isContentEditable&&"input"!==h.target.nodeName)switch(h.keyCode){case 84:f.toggleToolbar();break;case 37:case 8:f.prevSlide();break;case 39:case 32:f.nextSlide();break;case 36:f.firstSlide();break;case 35:f.lastSlide()}};f.root=function(){return f.odf_canvas.odfContainer().rootElement};f.firstSlide=function(){f.slideChange(function(f,
h){return 0})};f.lastSlide=function(){f.slideChange(function(f,h){return h-1})};f.nextSlide=function(){f.slideChange(function(f,h){return f+1<h?f+1:-1})};f.prevSlide=function(){f.slideChange(function(f,h){return 1>f?-1:f-1})};f.slideChange=function(h){var l=f.getPages(f.odf_canvas.odfContainer().rootElement),g=-1,a=0;l.forEach(function(e){e=e[1];e.hasAttribute("slide_current")&&(g=a,e.removeAttribute("slide_current"));a+=1});h=h(g,l.length);-1===h&&(h=g);l[h][1].setAttribute("slide_current","1");
document.getElementById("pagelist").selectedIndex=h;"cont"===f.slide_mode&&window.scrollBy(0,l[h][1].getBoundingClientRect().top-30)};f.selectSlide=function(h){f.slideChange(function(f,g){return h>=g||0>h?-1:h})};f.scrollIntoContView=function(h){var l=f.getPages(f.odf_canvas.odfContainer().rootElement);0!==l.length&&window.scrollBy(0,l[h][1].getBoundingClientRect().top-30)};f.getPages=function(f){f=f.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var h=[],g;for(g=0;g<f.length;g+=1)h.push([f[g].getAttribute("draw:name"),
f[g]]);return h};f.fillPageList=function(l,p){for(var g=f.getPages(l),a,e,d;p.firstChild;)p.removeChild(p.firstChild);for(a=0;a<g.length;a+=1)e=document.createElement("option"),d=h.getODFElementsWithXPath(g[a][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),d=0<d.length?d[0].textContent:g[a][0],e.textContent=a+1+": "+d,p.appendChild(e)};f.startSlideMode=function(h){var l=document.getElementById("pagelist"),g=f.odf_canvas.slidevisibilitycss().sheet;for(f.slide_mode=
h;0<g.cssRules.length;)g.deleteRule(0);f.selectSlide(0);"single"===f.slide_mode?(g.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),g.insertRule("draw|page[slide_current]  { z-index:2;}",1),g.insertRule("draw|page  { -webkit-transform: scale(1);}",2),f.fitToWindow(),window.addEventListener("resize",f.fitToWindow,!1)):"cont"===f.slide_mode&&window.removeEventListener("resize",f.fitToWindow,!1);f.fillPageList(f.odf_canvas.odfContainer().rootElement,l)};f.toggleToolbar=function(){var h,
l,g;h=f.odf_canvas.slidevisibilitycss().sheet;l=-1;for(g=0;g<h.cssRules.length;g+=1)if(".toolbar"===h.cssRules[g].cssText.substring(0,8)){l=g;break}-1<l?h.deleteRule(l):h.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};f.fitToWindow=function(){var h=f.getPages(f.root()),l=(window.innerHeight-40)/h[0][1].clientHeight,h=(window.innerWidth-10)/h[0][1].clientWidth,l=l<h?l:h,h=f.odf_canvas.slidevisibilitycss().sheet;h.deleteRule(2);h.insertRule("draw|page { \n-moz-transform: scale("+
l+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+l+"); -o-transform-origin: 0% 0%; -o-transform: scale("+l+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+l+"); }",2)};f.load=function(h){f.odf_canvas.load(h)};f.odf_element=l;f.odf_canvas=new odf.OdfCanvas(f.odf_element);f.odf_canvas.addListener("statereadychange",f.setInitialSlideMode);f.slide_mode="undefined";document.addEventListener("keydown",f.keyDownHandler,!1)}}();
// Input 75
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(h,l){function f(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function q(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function p(){var a=h.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!r)||(a=a.getRangeAt(0),r.setPoint(a.startContainer,a.startOffset))}function g(){var a=h.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();r&&r.node()&&(b=r.node(),c=b.ownerDocument.createRange(),
c.setStart(b,r.position()),c.collapse(!0),a.addRange(c))}function a(a){var b=a.charCode||a.keyCode;if(r=null,r&&37===b)p(),r.stepBackward(),g();else if(16<=b&&20>=b||33<=b&&40>=b)return;q(a)}function e(a){}function d(a){h.ownerDocument.defaultView.getSelection().getRangeAt(0);q(a)}function b(a){for(var c=a.firstChild;c&&c!==a;)c.nodeType===Node.ELEMENT_NODE&&b(c),c=c.nextSibling||c.parentNode;var d,e,f,c=a.attributes;d="";for(f=c.length-1;0<=f;f-=1)e=c.item(f),d=d+" "+e.nodeName+'="'+e.nodeValue+
'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",d);c=a.firstChild;for(e=/^\s*$/;c&&c!==a;)d=c,c=c.nextSibling||c.parentNode,d.nodeType===Node.TEXT_NODE&&e.test(d.nodeValue)&&d.parentNode.removeChild(d)}function s(a,b){for(var c=a.firstChild,d,e,f;c&&c!==a;){if(c.nodeType===Node.ELEMENT_NODE)for(s(c,b),d=c.attributes,f=d.length-1;0<=f;f-=1)e=d.item(f),"http://www.w3.org/2000/xmlns/"!==e.namespaceURI||b[e.nodeValue]||(b[e.nodeValue]=e.localName);c=c.nextSibling||c.parentNode}}
function m(){var a=h.ownerDocument.createElement("style"),b;b={};s(h,b);var c={},d,e,f=0;for(d in b)if(b.hasOwnProperty(d)&&d){e=b[d];if(!e||c.hasOwnProperty(e)||"xmlns"===e){do e="ns"+f,f+=1;while(c.hasOwnProperty(e));b[d]=e}c[e]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+k;a.appendChild(h.ownerDocument.createTextNode(b));l=l.parentNode.replaceChild(a,l)}var k,c,t,r=null;h.id||(h.id="xml"+String(Math.random()).substring(2));c="#"+h.id+" ";k=c+"*,"+c+":visited, "+c+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
c+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+c+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+c+"{overflow: auto;}\n";(function(b){f(b,"click",d);f(b,"keydown",a);f(b,"keypress",e);f(b,"drop",q);f(b,"dragend",q);f(b,"beforepaste",q);f(b,"paste",q)})(h);this.updateCSS=m;this.setXML=function(a){a=a.documentElement||a;t=a=h.ownerDocument.importNode(a,!0);for(b(a);h.lastChild;)h.removeChild(h.lastChild);h.appendChild(a);m();r=new core.PositionIterator(a)};
this.getXML=function(){return t}};
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(h,l){};gui.UndoManager.prototype.unsubscribe=function(h,l){};gui.UndoManager.prototype.setOdtDocument=function(h){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(h){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
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
gui.UndoStateRules=function(){function h(f){return f.spec().optype}function l(f){switch(h(f)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=h;this.isEditOperation=l;this.isPartOfOperationSet=function(f,q){if(l(f)){if(0===q.length)return!0;var p;if(p=l(q[q.length-1]))a:{p=q.filter(l);var g=h(f),a;b:switch(g){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&g===h(p[0])){if(1===p.length){p=!0;break a}g=p[p.length-2].spec().position;
p=p[p.length-1].spec().position;a=f.spec().position;if(p===a-(p-g)){p=!0;break a}}p=!1}return p}return!0}};
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
gui.TrivialUndoManager=function(h){function l(){m.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:q.hasUndoStates(),redoAvailable:q.hasRedoStates()})}function f(){d!==g&&d!==b[b.length-1]&&b.push(d)}var q=this,p,g,a,e,d=[],b=[],s=[],m=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),k=h||new gui.UndoStateRules;this.subscribe=function(a,b){m.subscribe(a,
b)};this.unsubscribe=function(a,b){m.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<b.length};this.hasRedoStates=function(){return 0<s.length};this.setOdtDocument=function(a){e=a};this.resetInitialState=function(){b.length=0;s.length=0;g.length=0;d.length=0;p=null;l()};this.saveInitialState=function(){p=e.getOdfCanvas().odfContainer().rootElement.cloneNode(!0);g=[];f();b.forEach(function(a){g=g.concat(a)});d=g;b.length=0;s.length=0;l()};this.setPlaybackFunction=function(b){a=b};this.onOperationExecuted=
function(a){s.length=0;k.isEditOperation(a)&&d===g||!k.isPartOfOperationSet(a,d)?(f(),d=[a],b.push(d),m.emit(gui.UndoManager.signalUndoStateCreated,{operations:d}),l()):(d.push(a),m.emit(gui.UndoManager.signalUndoStateModified,{operations:d}))};this.moveForward=function(c){for(var e=0,f;c&&s.length;)f=s.pop(),b.push(f),f.forEach(a),c-=1,e+=1;e&&(d=b[b.length-1],l());return e};this.moveBackward=function(c){for(var f=e.getOdfCanvas(),k=f.odfContainer(),h=0;c&&b.length;)s.push(b.pop()),c-=1,h+=1;h&&
(k.setRootElement(p.cloneNode(!0)),f.setOdfContainer(k,!0),m.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),e.getCursors().forEach(function(a){e.removeCursor(a.getMemberId())}),g.forEach(a),b.forEach(function(b){b.forEach(a)}),f.refreshCSS(),d=b[b.length-1]||g,l());return h}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
ops.OdtDocument=function(h){function l(){var a=h.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function f(a){var b=gui.SelectionMover.createPositionIterator(l());for(a+=1;0<a&&b.nextPosition();)1===d.acceptPosition(b)&&(a-=1);return b}function q(a){return b.getParagraphElement(a)}function p(a){return h.getFormatting().getStyleElement(a,"paragraph")}function g(a,b){runtime.assert(" "===a.data[b],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");
var d=a.ownerDocument.createElementNS(e,"text:s");d.appendChild(a.ownerDocument.createTextNode(" "));a.deleteData(b,1);a.splitText(b);a.parentNode.insertBefore(d,a.nextSibling)}var a=this,e="urn:oasis:names:tc:opendocument:xmlns:text:1.0",d,b,s={},m=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalStyleCreated,ops.OdtDocument.signalStyleDeleted,
ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]);this.getIteratorAtPosition=f;this.getTextNeighborhood=function(a,b){var d=f(a),e=[],g=[],h,l=0,m=!1;h=!0;var p=0,q;runtime.assert(0<=b,"OdtDocument.getTextNeighborhood only supports positive lengths");do{g=d.textNeighborhood();m=!1;for(q=0;q<e.length;q+=1)if(e[q]===g[0]){m=!0;break}if(!m){m=0;if(h){h=d.container();for(m=0;m<g.length;m+=1)if(g[m]===h){p=m;break}m=p;h=!1}for(g.length&&(e=
e.concat(g));m<g.length;m+=1)l+=g[m].data.length}}while(!0===d.nextPosition()&&l<b);return e.slice(p)};this.upgradeWhitespaceToElement=g;this.upgradeWhitespacesAtPosition=function(a){a=f(a);var c=null,d,e=0;a.previousPosition();a.previousPosition();for(e=-2;2>=e;e+=1)c=a.container(),d=a.unfilteredDomOffset(),c.nodeType===Node.TEXT_NODE&&(" "===c.data[d]&&b.isSignificantWhitespace(c,d))&&g(c,d),a.nextPosition()};this.getParagraphStyleElement=p;this.getParagraphElement=q;this.getParagraphStyleAttributes=
function(a){return(a=p(a))?h.getFormatting().getInheritedStyleAttributes(a):null};this.getPositionInTextNode=function(a,b){var e=gui.SelectionMover.createPositionIterator(l()),f=null,g,h=0,m=null;runtime.assert(0<=a,"position must be >= 0");1===d.acceptPosition(e)?(g=e.container(),g.nodeType===Node.TEXT_NODE&&(f=g,h=0)):a+=1;for(;0<a||null===f;){if(!e.nextPosition())return null;if(1===d.acceptPosition(e))if(a-=1,g=e.container(),g.nodeType===Node.TEXT_NODE)g!==f?(f=g,h=e.domOffset()):h+=1;else if(null!==
f){if(0===a){h=f.length;break}f=null}else if(0===a){f=l().ownerDocument.createTextNode("");g.insertBefore(f,e.rightNode());h=0;break}}if(null===f)return null;if(b&&s[b]){for(m=s[b].getNode();0===h&&m.nextSibling&&"cursor"===m.nextSibling.localName;)m.parentNode.insertBefore(m,m.nextSibling.nextSibling);m&&0<f.length&&(f=l().ownerDocument.createTextNode(""),h=0,m.parentNode.insertBefore(f,m.nextSibling))}for(;0===h&&(f.previousSibling&&"cursor"===f.previousSibling.localName)&&(g=f.previousSibling,
0<f.length&&(f=l().ownerDocument.createTextNode("")),g.parentNode.insertBefore(f,g),m!==g););for(;f.previousSibling&&f.previousSibling.nodeType===Node.TEXT_NODE;)f.previousSibling.appendData(f.data),h=f.length+f.previousSibling.length,f=f.previousSibling,f.parentNode.removeChild(f.nextSibling);return{textNode:f,offset:h}};this.getNeighboringParagraph=function(a,b){var e=f(0),g=null;e.setUnfilteredPosition(a,0);do if(1===d.acceptPosition(e)&&(g=q(e.container()),g!==a))return g;while(!0===(0<b?e.nextPosition():
e.previousPosition()));if(g===a)return null};this.fixCursorPositions=function(b){var c,d,e,f,g;c=a.getCursors();f=a.getPositionFilter();for(g in c)c.hasOwnProperty(g)&&(d=c[g].getStepCounter(),d.isPositionWalkable(f)||(e=-d.countBackwardSteps(1,f),0===e&&(e=d.countForwardSteps(1,f)),c[g].move(e),g===b&&a.emit(ops.OdtDocument.signalCursorMoved,c[g])))};this.getWalkableParagraphLength=function(a){var b=f(0),e=0;b.setUnfilteredPosition(a,0);do{if(q(b.container())!==a)break;1===d.acceptPosition(b)&&(e+=
1)}while(b.nextPosition());return e};this.getDistanceFromCursor=function(a,b,e){a=s[a];var f=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,f=a(b,e,d));return f};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,l(),0)};this.getCursorSelection=function(a){var b;a=s[a];var e=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,e=-b(l(),0,d),b=b(a.getAnchorNode(),0,d));return{position:e+b,
length:-b}};this.getPositionFilter=function(){return d};this.getOdfCanvas=function(){return h};this.getRootNode=l;this.getDOM=function(){return l().ownerDocument};this.getCursor=function(a){return s[a]};this.getCursors=function(){var a=[],b;for(b in s)s.hasOwnProperty(b)&&a.push(s[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countForwardSteps(1,d),e=a.getMemberId();runtime.assert(Boolean(e),"OdtDocument::addCursor has cursor without memberid");
a.move(b);s[e]=a};this.removeCursor=function(b){var c=s[b];return c?(c.removeFromOdtDocument(),delete s[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=h.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return h.getFormatting()};this.emit=function(a,
b){m.emit(a,b)};this.subscribe=function(a,b){m.subscribe(a,b)};this.unsubscribe=function(a,b){m.unsubscribe(a,b)};d=new function(){function a(e,f,g){var h,k;if(f&&(h=b.lookLeftForCharacter(f),1===h||2===h&&(b.scanRightForAnyCharacter(g)||b.scanRightForAnyCharacter(b.nextNode(e)))))return c;h=null===f&&b.isParagraph(e);k=b.lookRightForCharacter(g);if(h)return k?c:b.scanRightForAnyCharacter(g)?d:c;if(!k)return d;f=f||b.previousNode(e);return b.scanLeftForAnyCharacter(f)?d:c}var c=core.PositionFilter.FilterResult.FILTER_ACCEPT,
d=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(e){var f=e.container(),g=f.nodeType,h,l,m;if(g!==Node.ELEMENT_NODE&&g!==Node.TEXT_NODE)return d;if(g===Node.TEXT_NODE){if(!b.isGroupingElement(f.parentNode))return d;g=e.unfilteredDomOffset();h=f.data;runtime.assert(g!==h.length,"Unexpected offset.");if(0<g){e=h.substr(g-1,1);if(!b.isODFWhitespace(e))return c;if(1<g)if(e=h.substr(g-2,1),!b.isODFWhitespace(e))l=c;else{if(!b.isODFWhitespace(h.substr(0,g)))return d}else m=
b.previousNode(f),b.scanLeftForNonWhitespace(m)&&(l=c);if(l===c)return b.isTrailingWhitespace(f,g)?d:c;l=h.substr(g,1);return b.isODFWhitespace(l)?d:b.scanLeftForAnyCharacter(b.previousNode(f))?d:c}m=e.leftNode();l=f;f=f.parentNode;l=a(f,m,l)}else b.isGroupingElement(f)?(m=e.leftNode(),l=e.rightNode(),l=a(f,m,l)):l=d;return l}};b=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";
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
ops.Session=function(h){var l=new ops.OperationFactory,f=new ops.OdtDocument(h),q=new ops.TrivialUserModel,p=null;this.setUserModel=function(f){q=f};this.setOperationFactory=function(f){l=f;p&&p.setOperationFactory(l)};this.setOperationRouter=function(g){p=g;g.setPlaybackFunction(function(a){a.execute(f);f.emit(ops.OdtDocument.signalOperationExecuted,a)});g.setOperationFactory(l)};this.getUserModel=function(){return q};this.getOperationFactory=function(){return l};this.getOdtDocument=function(){return f};
this.enqueue=function(f){p.push(f)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 81
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\n\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n";
