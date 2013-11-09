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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
var core={},gui={},xmldom={},odf={},ops={};
// Input 1
function Runtime(){}Runtime.ByteArray=function(e){};Runtime.prototype.getVariable=function(e){};Runtime.prototype.toJson=function(e){};Runtime.prototype.fromJson=function(e){};Runtime.ByteArray.prototype.slice=function(e,h){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(e){};Runtime.prototype.byteArrayFromString=function(e,h){};Runtime.prototype.byteArrayToString=function(e,h){};Runtime.prototype.concatByteArrays=function(e,h){};
Runtime.prototype.read=function(e,h,f,n){};Runtime.prototype.readFile=function(e,h,f){};Runtime.prototype.readFileSync=function(e,h){};Runtime.prototype.loadXML=function(e,h){};Runtime.prototype.writeFile=function(e,h,f){};Runtime.prototype.isFile=function(e,h){};Runtime.prototype.getFileSize=function(e,h){};Runtime.prototype.deleteFile=function(e,h){};Runtime.prototype.log=function(e,h){};Runtime.prototype.setTimeout=function(e,h){};Runtime.prototype.clearTimeout=function(e){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(e){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(e,h,f){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(e,h){function f(f){var c="",b,a=f.length;for(b=0;b<a;b+=1)c+=String.fromCharCode(f[b]&255);return c}function n(f){var c="",b,a=f.length,d,k,g,q;for(b=0;b<a;b+=1)d=f[b],128>d?c+=String.fromCharCode(d):(b+=1,k=f[b],194<=d&&224>d?c+=String.fromCharCode((d&31)<<6|k&63):(b+=1,g=f[b],224<=d&&240>d?c+=String.fromCharCode((d&15)<<12|(k&63)<<6|g&63):(b+=1,q=f[b],240<=d&&245>d&&(d=(d&7)<<18|(k&63)<<12|(g&63)<<6|q&63,d-=65536,c+=String.fromCharCode((d>>10)+55296,(d&1023)+56320)))));
return c}var m;"utf8"===h?m=n(e):("binary"!==h&&this.log("Unsupported encoding: "+h),m=f(e));return m};Runtime.getVariable=function(e){try{return eval(e)}catch(h){}};Runtime.toJson=function(e){return JSON.stringify(e)};Runtime.fromJson=function(e){return JSON.parse(e)};Runtime.getFunctionName=function(e){return void 0===e.name?(e=/function\s+(\w+)/.exec(e))&&e[1]:e.name};
function BrowserRuntime(e){function h(c,b){var a,d,k;void 0!==b?k=c:b=c;e?(d=e.ownerDocument,k&&(a=d.createElement("span"),a.className=k,a.appendChild(d.createTextNode(k)),e.appendChild(a),e.appendChild(d.createTextNode(" "))),a=d.createElement("span"),0<b.length&&"<"===b[0]?a.innerHTML=b:a.appendChild(d.createTextNode(b)),e.appendChild(a),e.appendChild(d.createElement("br"))):console&&console.log(b);"alert"===k&&alert(b)}function f(c,b,a){function d(){var d;4===k.readyState&&(0!==k.status||k.responseText?
200===k.status||0===k.status?(d="binary"===b?null!==k.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(k.responseBody)).toArray():n.byteArrayFromString(k.responseText,"binary"):k.responseText,m[c]=d,a(null,d)):a(k.responseText||k.statusText):a("File "+c+" is empty."))}if(m.hasOwnProperty(c))a(null,m[c]);else{var k=new XMLHttpRequest;k.open("GET",c,!0);k.onreadystatechange=d;k.overrideMimeType&&("binary"!==b?k.overrideMimeType("text/plain; charset="+b):k.overrideMimeType("text/plain; charset=x-user-defined"));
try{k.send(null)}catch(g){a(g.message)}}}var n=this,m={},p=window.ArrayBuffer&&window.Uint8Array;p&&(Uint8Array.prototype.slice=function(c,b){void 0===b&&(void 0===c&&(c=0),b=this.length);var a=this.subarray(c,b),d,k;b-=c;d=new Uint8Array(new ArrayBuffer(b));for(k=0;k<b;k+=1)d[k]=a[k];return d});this.ByteArray=p?function(c){return new Uint8Array(new ArrayBuffer(c))}:function(c){var b=[];b.length=c;return b};this.concatByteArrays=p?function(c,b){var a,d=c.length,k=b.length,g=new this.ByteArray(d+k);
for(a=0;a<d;a+=1)g[a]=c[a];for(a=0;a<k;a+=1)g[a+d]=b[a];return g}:function(c,b){return c.concat(b)};this.byteArrayFromArray=function(c){return c.slice()};this.byteArrayFromString=function(c,b){var a;if("utf8"===b){a=c.length;var d,k,g,q=0;for(k=0;k<a;k+=1)g=c.charCodeAt(k),q+=1+(128<g)+(2048<g);d=new n.ByteArray(q);for(k=q=0;k<a;k+=1)g=c.charCodeAt(k),128>g?(d[q]=g,q+=1):2048>g?(d[q]=192|g>>>6,d[q+1]=128|g&63,q+=2):(d[q]=224|g>>>12&15,d[q+1]=128|g>>>6&63,d[q+2]=128|g&63,q+=3)}else for("binary"!==
b&&n.log("unknown encoding: "+b),a=c.length,d=new n.ByteArray(a),k=0;k<a;k+=1)d[k]=c.charCodeAt(k)&255;return a=d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=f;this.read=function(c,b,a,d){function k(){var k;4===g.readyState&&(0!==g.status||g.responseText?200===g.status||0===g.status?(g.response?(k=g.response,k=new Uint8Array(k)):k=null!==g.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(g.responseBody)).toArray():n.byteArrayFromString(g.responseText,"binary"),m[c]=k,d(null,k.slice(b,b+a))):d(g.responseText||g.statusText):d("File "+c+" is empty."))}if(m.hasOwnProperty(c))d(null,m[c].slice(b,b+a));else{var g=new XMLHttpRequest;g.open("GET",c,!0);g.onreadystatechange=k;g.overrideMimeType&&g.overrideMimeType("text/plain; charset=x-user-defined");g.responseType="arraybuffer";try{g.send(null)}catch(q){d(q.message)}}};this.readFileSync=function(c,b){var a=new XMLHttpRequest,
d;a.open("GET",c,!1);a.overrideMimeType&&("binary"!==b?a.overrideMimeType("text/plain; charset="+b):a.overrideMimeType("text/plain; charset=x-user-defined"));try{if(a.send(null),200===a.status||0===a.status)d=a.responseText}catch(k){}return d};this.writeFile=function(c,b,a){m[c]=b;var d=new XMLHttpRequest;d.open("PUT",c,!0);d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200<=d.status&&300>d.status||0===d.status?a(null):a("Status "+String(d.status)+": "+d.responseText||
d.statusText):a("File "+c+" is empty."))};b=b.buffer&&!d.sendAsBinary?b.buffer:n.byteArrayToString(b,"binary");try{d.sendAsBinary?d.sendAsBinary(b):d.send(b)}catch(k){n.log("HUH? "+k+" "+b),a(k.message)}};this.deleteFile=function(c,b){delete m[c];var a=new XMLHttpRequest;a.open("DELETE",c,!0);a.onreadystatechange=function(){4===a.readyState&&(200>a.status&&300<=a.status?b(a.responseText):b(null))};a.send(null)};this.loadXML=function(c,b){var a=new XMLHttpRequest;a.open("GET",c,!0);a.overrideMimeType&&
a.overrideMimeType("text/xml");a.onreadystatechange=function(){4===a.readyState&&(0!==a.status||a.responseText?200===a.status||0===a.status?b(null,a.responseXML):b(a.responseText):b("File "+c+" is empty."))};try{a.send(null)}catch(d){b(d.message)}};this.isFile=function(c,b){n.getFileSize(c,function(a){b(-1!==a)})};this.getFileSize=function(c,b){var a=new XMLHttpRequest;a.open("HEAD",c,!0);a.onreadystatechange=function(){if(4===a.readyState){var d=a.getResponseHeader("Content-Length");d?b(parseInt(d,
10)):f(c,"binary",function(a,d){a?b(-1):b(d.length)})}};a.send(null)};this.log=h;this.assert=function(c,b,a){if(!c)throw h("alert","ASSERTION FAILED:\n"+b),a&&a(),b;};this.setTimeout=function(c,b){return setTimeout(function(){c()},b)};this.clearTimeout=function(c){clearTimeout(c)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(c){return(new DOMParser).parseFromString(c,
"text/xml")};this.exit=function(c){h("Calling exit with code "+String(c)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function e(b,a,d){b=n.resolve(m,b);"binary"!==a?f.readFile(b,a,d):f.readFile(b,null,d)}var h=this,f=require("fs"),n=require("path"),m="",p,c;this.ByteArray=function(b){return new Buffer(b)};this.byteArrayFromArray=function(b){var a=new Buffer(b.length),d,c=b.length;for(d=0;d<c;d+=1)a[d]=b[d];return a};this.concatByteArrays=function(b,a){var d=new Buffer(b.length+a.length);b.copy(d,0,0);a.copy(d,b.length,0);return d};this.byteArrayFromString=function(b,a){return new Buffer(b,
a)};this.byteArrayToString=function(b,a){return b.toString(a)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=e;this.loadXML=function(b,a){e(b,"utf-8",function(d,b){if(d)return a(d);a(null,h.parseXML(b))})};this.writeFile=function(b,a,d){b=n.resolve(m,b);f.writeFile(b,a,"binary",function(a){d(a||null)})};this.deleteFile=function(b,a){b=n.resolve(m,b);f.unlink(b,a)};this.read=function(b,a,d,c){b=n.resolve(m,b);f.open(b,"r+",666,function(g,
b){if(g)c(g);else{var l=new Buffer(d);f.read(b,l,0,d,a,function(a){f.close(b);c(a,l)})}})};this.readFileSync=function(b,a){return a?"binary"===a?f.readFileSync(b,null):f.readFileSync(b,a):""};this.isFile=function(b,a){b=n.resolve(m,b);f.stat(b,function(d,b){a(!d&&b.isFile())})};this.getFileSize=function(b,a){b=n.resolve(m,b);f.stat(b,function(d,b){d?a(-1):a(b.size)})};this.log=function(b,a){var d;void 0!==a?d=b:a=b;"alert"===d&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(a+
"\n");"alert"===d&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(b,a,d){b||(process.stderr.write("ASSERTION FAILED: "+a),d&&d())};this.setTimeout=function(b,a){return setTimeout(function(){b()},a)};this.clearTimeout=function(b){clearTimeout(b)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(b){m=b};this.currentDirectory=function(){return m};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return c};this.parseXML=
function(b){return p.parseFromString(b,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};p=new (require("xmldom").DOMParser);c=h.parseXML("<a/>").implementation}
function RhinoRuntime(){function e(c,b){var a;void 0!==b?a=c:b=c;"alert"===a&&print("\n!!!!! ALERT !!!!!");print(b);"alert"===a&&print("!!!!! ALERT !!!!!")}var h=this,f=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),n,m,p="";f.setValidating(!1);f.setNamespaceAware(!0);f.setExpandEntityReferences(!1);f.setSchema(null);m=Packages.org.xml.sax.EntityResolver({resolveEntity:function(c,b){var a=new Packages.java.io.FileReader(b);return new Packages.org.xml.sax.InputSource(a)}});n=f.newDocumentBuilder();
n.setEntityResolver(m);this.ByteArray=function(c){return[c]};this.byteArrayFromArray=function(c){return c};this.byteArrayFromString=function(c,b){var a=[],d,k=c.length;for(d=0;d<k;d+=1)a[d]=c.charCodeAt(d)&255;return a};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(c,b){return c.concat(b)};this.loadXML=function(c,b){var a=new Packages.java.io.File(c),d;try{d=n.parse(a)}catch(k){print(k);
b(k);return}b(null,d)};this.readFile=function(c,b,a){p&&(c=p+"/"+c);var d=new Packages.java.io.File(c),k="binary"===b?"latin1":b;d.isFile()?(c=readFile(c,k),"binary"===b&&(c=h.byteArrayFromString(c,"binary")),a(null,c)):a(c+" is not a file.")};this.writeFile=function(c,b,a){p&&(c=p+"/"+c);c=new Packages.java.io.FileOutputStream(c);var d,k=b.length;for(d=0;d<k;d+=1)c.write(b[d]);c.close();a(null)};this.deleteFile=function(c,b){p&&(c=p+"/"+c);(new Packages.java.io.File(c))["delete"]()?b(null):b("Could not delete "+
c)};this.read=function(c,b,a,d){p&&(c=p+"/"+c);var k;k=c;var g="binary";(new Packages.java.io.File(k)).isFile()?("binary"===g&&(g="latin1"),k=readFile(k,g)):k=null;k?d(null,this.byteArrayFromString(k.substring(b,b+a),"binary")):d("Cannot read "+c)};this.readFileSync=function(c,b){return b?readFile(c,b):""};this.isFile=function(c,b){p&&(c=p+"/"+c);var a=new Packages.java.io.File(c);b(a.isFile())};this.getFileSize=function(c,b){p&&(c=p+"/"+c);var a=new Packages.java.io.File(c);b(a.length())};this.log=
e;this.assert=function(c,b,a){c||(e("alert","ASSERTION FAILED: "+b),a&&a())};this.setTimeout=function(c){c();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(c){p=c};this.currentDirectory=function(){return p};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return n.getDOMImplementation()};this.parseXML=function(c){return n.parse(c)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function e(f){var e=f[0],h;h=eval("if (typeof "+e+" === 'undefined') {eval('"+e+" = {};');}"+e);for(e=1;e<f.length-1;e+=1)h=h.hasOwnProperty(f[e])?h[f[e]]:h[f[e]]={};return h[f[f.length-1]]}var h={},f={};runtime.loadClass=function(n){function m(a){a=a.replace(/\./g,"/")+".js";var d=runtime.libraryPaths(),b,g,c;runtime.currentDirectory&&d.push(runtime.currentDirectory());for(b=0;b<d.length;b+=1){g=d[b];if(!f.hasOwnProperty(g))try{c=runtime.readFileSync(d[b]+"/manifest.js","utf8"),f[g]=
c&&c.length?eval(c):null}catch(l){f[g]=null,runtime.log("Cannot load manifest for "+g+".")}c=null;if((g=f[g])&&g.indexOf&&-1!==g.indexOf(a))return d[b]+"/"+a}return null}function p(a){var d,b;b=m(a);if(!b)throw a+" is not listed in any manifest.js.";try{d=runtime.readFileSync(b,"utf8")}catch(g){throw runtime.log("Error loading "+a+" "+g),g;}if(void 0===d)throw"Cannot load class "+a;d=d+("\n//# sourceURL="+b)+("\n//@ sourceURL="+b);try{d=eval(a+" = eval(code);")}catch(c){throw runtime.log("Error loading "+
a+" "+c),c;}return d}if(!IS_COMPILED_CODE&&!h.hasOwnProperty(n)){var c=n.split("."),b;b=e(c);if(!b&&(b=p(n),!b||Runtime.getFunctionName(b)!==c[c.length-1]))throw runtime.log("Loaded code is not for "+c[c.length-1]),"Loaded code is not for "+c[c.length-1];h[n]=!0}}})();(function(){var e=function(){};runtime.getTranslator=function(){return e};runtime.setTranslator=function(h){e=h};runtime.tr=function(h){var f=e(h);return f&&"string"===String(typeof f)?f:h}})();
(function(e){function h(f){if(f.length){var e=f[0];runtime.readFile(e,"utf8",function(h,p){function c(){var d;(d=eval(a))&&runtime.exit(d)}var b="",a=p;-1!==e.indexOf("/")&&(b=e.substring(0,e.indexOf("/")));runtime.setCurrentDirectory(b);h||null===a?(runtime.log(h),runtime.exit(1)):c.apply(null,f)})}}e=e?Array.prototype.slice.call(e):[];"NodeJSRuntime"===runtime.type()?h(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?h(e):h(e.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function e(a){var d=[],b,g=a.length;for(b=0;b<g;b+=1)d[b]=a.charCodeAt(b)&255;return d}function h(a){var d,b="",g,c=a.length-2;for(g=0;g<c;g+=3)d=a[g]<<16|a[g+1]<<8|a[g+2],b+=r[d>>>18],b+=r[d>>>12&63],b+=r[d>>>6&63],b+=r[d&63];g===c+1?(d=a[g]<<4,b+=r[d>>>6],b+=r[d&63],b+="=="):g===c&&(d=a[g]<<10|a[g+1]<<2,b+=r[d>>>12],b+=r[d>>>6&63],b+=r[d&63],b+="=");return b}function f(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,"");var d=[],b=a.length%4,g,c=a.length,k;for(g=0;g<c;g+=4)k=(t[a.charAt(g)]||
0)<<18|(t[a.charAt(g+1)]||0)<<12|(t[a.charAt(g+2)]||0)<<6|(t[a.charAt(g+3)]||0),d.push(k>>16,k>>8&255,k&255);d.length-=[0,0,2,1][b];return d}function n(a){var d=[],b,g=a.length,c;for(b=0;b<g;b+=1)c=a[b],128>c?d.push(c):2048>c?d.push(192|c>>>6,128|c&63):d.push(224|c>>>12&15,128|c>>>6&63,128|c&63);return d}function m(a){var d=[],b,g=a.length,c,k,l;for(b=0;b<g;b+=1)c=a[b],128>c?d.push(c):(b+=1,k=a[b],224>c?d.push((c&31)<<6|k&63):(b+=1,l=a[b],d.push((c&15)<<12|(k&63)<<6|l&63)));return d}function p(a){return h(e(a))}
function c(a){return String.fromCharCode.apply(String,f(a))}function b(a){return m(e(a))}function a(a){a=m(a);for(var d="",b=0;b<a.length;)d+=String.fromCharCode.apply(String,a.slice(b,b+45E3)),b+=45E3;return d}function d(a,d,b){var g="",c,k,l;for(l=d;l<b;l+=1)d=a.charCodeAt(l)&255,128>d?g+=String.fromCharCode(d):(l+=1,c=a.charCodeAt(l)&255,224>d?g+=String.fromCharCode((d&31)<<6|c&63):(l+=1,k=a.charCodeAt(l)&255,g+=String.fromCharCode((d&15)<<12|(c&63)<<6|k&63)));return g}function k(a,b){function g(){var q=
k+c;q>a.length&&(q=a.length);l+=d(a,k,q);k=q;q=k===a.length;b(l,q)&&!q&&runtime.setTimeout(g,0)}var c=1E5,l="",k=0;a.length<c?b(d(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),g())}function g(a){return n(e(a))}function q(a){return String.fromCharCode.apply(String,n(a))}function l(a){return String.fromCharCode.apply(String,n(e(a)))}var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",t=function(a){var d={},b,g;b=0;for(g=a.length;b<g;b+=1)d[a.charAt(b)]=b;return d}(r),w,
v,y=runtime.getWindow(),x,u;y&&y.btoa?(x=function(a){return y.btoa(a)},w=function(a){return x(l(a))}):(x=p,w=function(a){return h(g(a))});y&&y.atob?(u=function(a){return y.atob(a)},v=function(a){a=u(a);return d(a,0,a.length)}):(u=c,v=function(d){return a(f(d))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=h;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=f;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=n;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=m;this.convertUTF8StringToBase64=p;this.convertBase64ToUTF8String=c;this.convertUTF8StringToUTF16Array=b;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=a;this.convertUTF8StringToUTF16String=k;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=g;this.convertUTF16ArrayToUTF8String=q;this.convertUTF16StringToUTF8String=l;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=v;this.fromBase64=c;this.toBase64=p;this.atob=
u;this.btoa=x;this.utob=l;this.btou=k;this.encode=w;this.encodeURI=function(a){return w(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return v(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function e(){this.dl=this.fc=0}function h(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function f(a,d,b,g){this.good_length=a;this.max_lazy=d;this.nice_length=b;this.max_chain=g}function n(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=m;this.off=0}var m=8192,p,c,b,a,d=null,k,g,q,l,r,t,w,v,y,x,u,s,C,B,A,I,z,N,G,R,Z,ka,T,ra,$,ha,U,O,W,E,H,M,S,P,aa,na,da,V,Q,J,ea,oa,D,fa,F,ia,Y,ba,la,L,sa,pa=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ma=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],ya=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],za=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ta;ta=[new f(0,0,0,0),new f(4,4,8,4),new f(4,5,16,8),new f(4,6,32,32),new f(4,4,16,16),new f(8,16,32,32),new f(8,16,128,128),new f(8,32,128,256),new f(32,128,258,1024),new f(32,258,258,4096)];var xa=function(a){d[g+k++]=a;if(g+k===m){var l;if(0!==k){null!==p?(a=p,p=p.next):a=new n;
a.next=null;a.len=a.off=0;null===c?c=b=a:b=b.next=a;a.len=k-g;for(l=0;l<a.len;l++)a.ptr[l]=d[g+l];k=g=0}}},ca=function(a){a&=65535;g+k<m-2?(d[g+k++]=a&255,d[g+k++]=a>>>8):(xa(a&255),xa(a>>>8))},X=function(){u=(u<<5^l[z+3-1]&255)&8191;s=w[32768+u];w[z&32767]=s;w[32768+u]=z},ga=function(a,d){y>16-d?(v|=a<<y,ca(v),v=a>>16-y,y+=d-16):(v|=a<<y,y+=d)},K=function(a,d){ga(d[a].fc,d[a].dl)},ja=function(a,d,b){return a[d].fc<a[b].fc||a[d].fc===a[b].fc&&da[d]<=da[b]},qa=function(a,d,b){var g;for(g=0;g<b&&sa<
L.length;g++)a[d+g]=L.charCodeAt(sa++)&255;return g},Aa=function(){var a,d,b=65536-R-z;if(-1===b)b--;else if(65274<=z){for(a=0;32768>a;a++)l[a]=l[a+32768];N-=32768;z-=32768;x-=32768;for(a=0;8192>a;a++)d=w[32768+a],w[32768+a]=32768<=d?d-32768:0;for(a=0;32768>a;a++)d=w[a],w[a]=32768<=d?d-32768:0;b+=32768}G||(a=qa(l,z+R,b),0>=a?G=!0:R+=a)},va=function(a){var d=Z,b=z,g,c=I,k=32506<z?z-32506:0,q=z+258,f=l[b+c-1],e=l[b+c];I>=ra&&(d>>=2);do if(g=a,l[g+c]===e&&l[g+c-1]===f&&l[g]===l[b]&&l[++g]===l[b+1]){b+=
2;g++;do++b;while(l[b]===l[++g]&&l[++b]===l[++g]&&l[++b]===l[++g]&&l[++b]===l[++g]&&l[++b]===l[++g]&&l[++b]===l[++g]&&l[++b]===l[++g]&&l[++b]===l[++g]&&b<q);g=258-(q-b);b=q-258;if(g>c){N=a;c=g;if(258<=g)break;f=l[b+c-1];e=l[b+c]}a=w[a&32767]}while(a>k&&0!==--d);return c},wa=function(a,d){t[D++]=d;0===a?$[d].fc++:(a--,$[V[d]+256+1].fc++,ha[(256>a?Q[a]:Q[256+(a>>7)])&255].fc++,r[fa++]=a,ia|=Y);Y<<=1;0===(D&7)&&(oa[F++]=ia,ia=0,Y=1);if(2<T&&0===(D&4095)){var b=8*D,g=z-x,c;for(c=0;30>c;c++)b+=ha[c].fc*
(5+ma[c]);b>>=3;if(fa<parseInt(D/2,10)&&b<parseInt(g/2,10))return!0}return 8191===D||8192===fa},ua=function(a,d){for(var b=P[d],g=d<<1;g<=aa;){g<aa&&ja(a,P[g+1],P[g])&&g++;if(ja(a,b,P[g]))break;P[d]=P[g];d=g;g<<=1}P[d]=b},Da=function(a,d){var b=0;do b|=a&1,a>>=1,b<<=1;while(0<--d);return b>>1},Ea=function(a,d){var b=[];b.length=16;var g=0,c;for(c=1;15>=c;c++)g=g+S[c-1]<<1,b[c]=g;for(g=0;g<=d;g++)c=a[g].dl,0!==c&&(a[g].fc=Da(b[c]++,c))},Ca=function(a){var d=a.dyn_tree,b=a.static_tree,g=a.elems,c,l=
-1,k=g;aa=0;na=573;for(c=0;c<g;c++)0!==d[c].fc?(P[++aa]=l=c,da[c]=0):d[c].dl=0;for(;2>aa;)c=P[++aa]=2>l?++l:0,d[c].fc=1,da[c]=0,ba--,null!==b&&(la-=b[c].dl);a.max_code=l;for(c=aa>>1;1<=c;c--)ua(d,c);do c=P[1],P[1]=P[aa--],ua(d,1),b=P[1],P[--na]=c,P[--na]=b,d[k].fc=d[c].fc+d[b].fc,da[k]=da[c]>da[b]+1?da[c]:da[b]+1,d[c].dl=d[b].dl=k,P[1]=k++,ua(d,1);while(2<=aa);P[--na]=P[1];k=a.dyn_tree;c=a.extra_bits;var g=a.extra_base,b=a.max_code,q=a.max_length,f=a.static_tree,e,r,A,h,s=0;for(r=0;15>=r;r++)S[r]=
0;k[P[na]].dl=0;for(a=na+1;573>a;a++)e=P[a],r=k[k[e].dl].dl+1,r>q&&(r=q,s++),k[e].dl=r,e>b||(S[r]++,A=0,e>=g&&(A=c[e-g]),h=k[e].fc,ba+=h*(r+A),null!==f&&(la+=h*(f[e].dl+A)));if(0!==s){do{for(r=q-1;0===S[r];)r--;S[r]--;S[r+1]+=2;S[q]--;s-=2}while(0<s);for(r=q;0!==r;r--)for(e=S[r];0!==e;)c=P[--a],c>b||(k[c].dl!==r&&(ba+=(r-k[c].dl)*k[c].fc,k[c].fc=r),e--)}Ea(d,l)},Fa=function(a,d){var b,g=-1,c,k=a[0].dl,l=0,q=7,e=4;0===k&&(q=138,e=3);a[d+1].dl=65535;for(b=0;b<=d;b++)c=k,k=a[b+1].dl,++l<q&&c===k||(l<
e?W[c].fc+=l:0!==c?(c!==g&&W[c].fc++,W[16].fc++):10>=l?W[17].fc++:W[18].fc++,l=0,g=c,0===k?(q=138,e=3):c===k?(q=6,e=3):(q=7,e=4))},Ga=function(){8<y?ca(v):0<y&&xa(v);y=v=0},Ha=function(a,d){var b,g=0,c=0,k=0,l=0,q,e;if(0!==D){do 0===(g&7)&&(l=oa[k++]),b=t[g++]&255,0===(l&1)?K(b,a):(q=V[b],K(q+256+1,a),e=pa[q],0!==e&&(b-=J[q],ga(b,e)),b=r[c++],q=(256>b?Q[b]:Q[256+(b>>7)])&255,K(q,d),e=ma[q],0!==e&&(b-=ea[q],ga(b,e))),l>>=1;while(g<D)}K(256,a)},Ia=function(a,d){var b,g=-1,c,k=a[0].dl,l=0,q=7,e=4;0===
k&&(q=138,e=3);for(b=0;b<=d;b++)if(c=k,k=a[b+1].dl,!(++l<q&&c===k)){if(l<e){do K(c,W);while(0!==--l)}else 0!==c?(c!==g&&(K(c,W),l--),K(16,W),ga(l-3,2)):10>=l?(K(17,W),ga(l-3,3)):(K(18,W),ga(l-11,7));l=0;g=c;0===k?(q=138,e=3):c===k?(q=6,e=3):(q=7,e=4)}},Ja=function(){var a;for(a=0;286>a;a++)$[a].fc=0;for(a=0;30>a;a++)ha[a].fc=0;for(a=0;19>a;a++)W[a].fc=0;$[256].fc=1;ia=D=fa=F=ba=la=0;Y=1},Ba=function(a){var d,b,g,c;c=z-x;oa[F]=ia;Ca(E);Ca(H);Fa($,E.max_code);Fa(ha,H.max_code);Ca(M);for(g=18;3<=g&&
0===W[za[g]].dl;g--);ba+=3*(g+1)+14;d=ba+3+7>>3;b=la+3+7>>3;b<=d&&(d=b);if(c+4<=d&&0<=x)for(ga(0+a,3),Ga(),ca(c),ca(~c),g=0;g<c;g++)xa(l[x+g]);else if(b===d)ga(2+a,3),Ha(U,O);else{ga(4+a,3);c=E.max_code+1;d=H.max_code+1;g+=1;ga(c-257,5);ga(d-1,5);ga(g-4,4);for(b=0;b<g;b++)ga(W[za[b]].dl,3);Ia($,c-1);Ia(ha,d-1);Ha($,ha)}Ja();0!==a&&Ga()},Ka=function(a,b,l){var q,e,f;for(q=0;null!==c&&q<l;){e=l-q;e>c.len&&(e=c.len);for(f=0;f<e;f++)a[b+q+f]=c.ptr[c.off+f];c.off+=e;c.len-=e;q+=e;0===c.len&&(e=c,c=c.next,
e.next=p,p=e)}if(q===l)return q;if(g<k){e=l-q;e>k-g&&(e=k-g);for(f=0;f<e;f++)a[b+q+f]=d[g+f];g+=e;q+=e;k===g&&(k=g=0)}return q},La=function(d,b,e){var f;if(!a){if(!G){y=v=0;var r,h;if(0===O[0].dl){E.dyn_tree=$;E.static_tree=U;E.extra_bits=pa;E.extra_base=257;E.elems=286;E.max_length=15;E.max_code=0;H.dyn_tree=ha;H.static_tree=O;H.extra_bits=ma;H.extra_base=0;H.elems=30;H.max_length=15;H.max_code=0;M.dyn_tree=W;M.static_tree=null;M.extra_bits=ya;M.extra_base=0;M.elems=19;M.max_length=7;for(h=r=M.max_code=
0;28>h;h++)for(J[h]=r,f=0;f<1<<pa[h];f++)V[r++]=h;V[r-1]=h;for(h=r=0;16>h;h++)for(ea[h]=r,f=0;f<1<<ma[h];f++)Q[r++]=h;for(r>>=7;30>h;h++)for(ea[h]=r<<7,f=0;f<1<<ma[h]-7;f++)Q[256+r++]=h;for(f=0;15>=f;f++)S[f]=0;for(f=0;143>=f;)U[f++].dl=8,S[8]++;for(;255>=f;)U[f++].dl=9,S[9]++;for(;279>=f;)U[f++].dl=7,S[7]++;for(;287>=f;)U[f++].dl=8,S[8]++;Ea(U,287);for(f=0;30>f;f++)O[f].dl=5,O[f].fc=Da(f,5);Ja()}for(f=0;8192>f;f++)w[32768+f]=0;ka=ta[T].max_lazy;ra=ta[T].good_length;Z=ta[T].max_chain;x=z=0;R=qa(l,
0,65536);if(0>=R)G=!0,R=0;else{for(G=!1;262>R&&!G;)Aa();for(f=u=0;2>f;f++)u=(u<<5^l[f]&255)&8191}c=null;g=k=0;3>=T?(I=2,A=0):(A=2,B=0);q=!1}a=!0;if(0===R)return q=!0,0}f=Ka(d,b,e);if(f===e)return e;if(q)return f;if(3>=T)for(;0!==R&&null===c;){X();0!==s&&32506>=z-s&&(A=va(s),A>R&&(A=R));if(3<=A)if(h=wa(z-N,A-3),R-=A,A<=ka){A--;do z++,X();while(0!==--A);z++}else z+=A,A=0,u=l[z]&255,u=(u<<5^l[z+1]&255)&8191;else h=wa(0,l[z]&255),R--,z++;h&&(Ba(0),x=z);for(;262>R&&!G;)Aa()}else for(;0!==R&&null===c;){X();
I=A;C=N;A=2;0!==s&&I<ka&&32506>=z-s&&(A=va(s),A>R&&(A=R),3===A&&4096<z-N&&A--);if(3<=I&&A<=I){h=wa(z-1-C,I-3);R-=I-1;I-=2;do z++,X();while(0!==--I);B=0;A=2;z++;h&&(Ba(0),x=z)}else 0!==B?wa(0,l[z-1]&255)&&(Ba(0),x=z):B=1,z++,R--;for(;262>R&&!G;)Aa()}0===R&&(0!==B&&wa(0,l[z-1]&255),Ba(1),q=!0);return f+Ka(d,f+b,e-f)};this.deflate=function(g,k){var q,f;L=g;sa=0;"undefined"===String(typeof k)&&(k=6);(q=k)?1>q?q=1:9<q&&(q=9):q=6;T=q;G=a=!1;if(null===d){p=c=b=null;d=[];d.length=m;l=[];l.length=65536;r=
[];r.length=8192;t=[];t.length=32832;w=[];w.length=65536;$=[];$.length=573;for(q=0;573>q;q++)$[q]=new e;ha=[];ha.length=61;for(q=0;61>q;q++)ha[q]=new e;U=[];U.length=288;for(q=0;288>q;q++)U[q]=new e;O=[];O.length=30;for(q=0;30>q;q++)O[q]=new e;W=[];W.length=39;for(q=0;39>q;q++)W[q]=new e;E=new h;H=new h;M=new h;S=[];S.length=16;P=[];P.length=573;da=[];da.length=573;V=[];V.length=256;Q=[];Q.length=512;J=[];J.length=29;ea=[];ea.length=30;oa=[];oa.length=1024}var A=Array(1024),s=[],n=[];for(q=La(A,0,
A.length);0<q;){n.length=q;for(f=0;f<q;f++)n[f]=String.fromCharCode(A[f]);s[s.length]=n.join("");q=La(A,0,A.length)}L=null;return s.join("")}};
// Input 4
core.ByteArray=function(e){this.pos=0;this.data=e;this.readUInt32LE=function(){this.pos+=4;var e=this.data,f=this.pos;return e[--f]<<24|e[--f]<<16|e[--f]<<8|e[--f]};this.readUInt16LE=function(){this.pos+=2;var e=this.data,f=this.pos;return e[--f]<<8|e[--f]}};
// Input 5
core.ByteArrayWriter=function(e){var h=this,f=new runtime.ByteArray(0);this.appendByteArrayWriter=function(e){f=runtime.concatByteArrays(f,e.getByteArray())};this.appendByteArray=function(e){f=runtime.concatByteArrays(f,e)};this.appendArray=function(e){f=runtime.concatByteArrays(f,runtime.byteArrayFromArray(e))};this.appendUInt16LE=function(f){h.appendArray([f&255,f>>8&255])};this.appendUInt32LE=function(f){h.appendArray([f&255,f>>8&255,f>>16&255,f>>24&255])};this.appendString=function(h){f=runtime.concatByteArrays(f,
runtime.byteArrayFromString(h,e))};this.getLength=function(){return f.length};this.getByteArray=function(){return f}};
// Input 6
core.RawInflate=function(){var e,h,f=null,n,m,p,c,b,a,d,k,g,q,l,r,t,w,v=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],y=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],u=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],s=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],C=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],B=function(){this.list=this.next=null},A=function(){this.n=this.b=this.e=0;this.t=null},I=function(a,d,b,g,c,l){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var k=Array(this.BMAX+1),q,f,e,r,h,s,t,m=Array(this.BMAX+1),p,n,N,w=new A,G=Array(this.BMAX);r=Array(this.N_MAX);var z,u=Array(this.BMAX+1),I,v,R;R=this.root=null;for(h=0;h<k.length;h++)k[h]=0;for(h=0;h<m.length;h++)m[h]=0;for(h=0;h<G.length;h++)G[h]=null;for(h=0;h<r.length;h++)r[h]=
0;for(h=0;h<u.length;h++)u[h]=0;q=256<d?a[256]:this.BMAX;p=a;n=0;h=d;do k[p[n]]++,n++;while(0<--h);if(k[0]==d)this.root=null,this.status=this.m=0;else{for(s=1;s<=this.BMAX&&0==k[s];s++);t=s;l<s&&(l=s);for(h=this.BMAX;0!=h&&0==k[h];h--);e=h;l>h&&(l=h);for(I=1<<s;s<h;s++,I<<=1)if(0>(I-=k[s])){this.status=2;this.m=l;return}if(0>(I-=k[h]))this.status=2,this.m=l;else{k[h]+=I;u[1]=s=0;p=k;n=1;for(N=2;0<--h;)u[N++]=s+=p[n++];p=a;h=n=0;do 0!=(s=p[n++])&&(r[u[s]++]=h);while(++h<d);d=u[e];u[0]=h=0;p=r;n=0;
r=-1;z=m[0]=0;N=null;for(v=0;t<=e;t++)for(a=k[t];0<a--;){for(;t>z+m[1+r];){z+=m[1+r];r++;v=(v=e-z)>l?l:v;if((f=1<<(s=t-z))>a+1)for(f-=a+1,N=t;++s<v&&!((f<<=1)<=k[++N]);)f-=k[N];z+s>q&&z<q&&(s=q-z);v=1<<s;m[1+r]=s;N=Array(v);for(f=0;f<v;f++)N[f]=new A;R=null==R?this.root=new B:R.next=new B;R.next=null;R.list=N;G[r]=N;0<r&&(u[r]=h,w.b=m[r],w.e=16+s,w.t=N,s=(h&(1<<z)-1)>>z-m[r],G[r-1][s].e=w.e,G[r-1][s].b=w.b,G[r-1][s].n=w.n,G[r-1][s].t=w.t)}w.b=t-z;n>=d?w.e=99:p[n]<b?(w.e=256>p[n]?16:15,w.n=p[n++]):
(w.e=c[p[n]-b],w.n=g[p[n++]-b]);f=1<<t-z;for(s=h>>z;s<v;s+=f)N[s].e=w.e,N[s].b=w.b,N[s].n=w.n,N[s].t=w.t;for(s=1<<t-1;0!=(h&s);s>>=1)h^=s;for(h^=s;(h&(1<<z)-1)!=u[r];)z-=m[r],r--}this.m=m[1];this.status=0!=I&&1!=e?1:0}}},z=function(a){for(;c<a;){var d=p,b;b=t.length==w?-1:t[w++];p=d|b<<c;c+=8}},N=function(a){return p&v[a]},G=function(a){p>>=a;c-=a},R=function(a,c,f){var s,A,t;if(0==f)return 0;for(t=0;;){z(l);A=g.list[N(l)];for(s=A.e;16<s;){if(99==s)return-1;G(A.b);s-=16;z(s);A=A.t[N(s)];s=A.e}G(A.b);
if(16==s)h&=32767,a[c+t++]=e[h++]=A.n;else{if(15==s)break;z(s);d=A.n+N(s);G(s);z(r);A=q.list[N(r)];for(s=A.e;16<s;){if(99==s)return-1;G(A.b);s-=16;z(s);A=A.t[N(s)];s=A.e}G(A.b);z(s);k=h-A.n-N(s);for(G(s);0<d&&t<f;)d--,k&=32767,h&=32767,a[c+t++]=e[h++]=e[k++]}if(t==f)return f}b=-1;return t},Z,ka=function(a,d,b){var c,k,f,e,h,A,t,m=Array(316);for(c=0;c<m.length;c++)m[c]=0;z(5);A=257+N(5);G(5);z(5);t=1+N(5);G(5);z(4);c=4+N(4);G(4);if(286<A||30<t)return-1;for(k=0;k<c;k++)z(3),m[C[k]]=N(3),G(3);for(;19>
k;k++)m[C[k]]=0;l=7;k=new I(m,19,19,null,null,l);if(0!=k.status)return-1;g=k.root;l=k.m;e=A+t;for(c=f=0;c<e;)if(z(l),h=g.list[N(l)],k=h.b,G(k),k=h.n,16>k)m[c++]=f=k;else if(16==k){z(2);k=3+N(2);G(2);if(c+k>e)return-1;for(;0<k--;)m[c++]=f}else{17==k?(z(3),k=3+N(3),G(3)):(z(7),k=11+N(7),G(7));if(c+k>e)return-1;for(;0<k--;)m[c++]=0;f=0}l=9;k=new I(m,A,257,y,x,l);0==l&&(k.status=1);if(0!=k.status)return-1;g=k.root;l=k.m;for(c=0;c<t;c++)m[c]=m[c+A];r=6;k=new I(m,t,0,u,s,r);q=k.root;r=k.m;return 0==r&&
257<A||0!=k.status?-1:R(a,d,b)};this.inflate=function(A,v){null==e&&(e=Array(65536));c=p=h=0;b=-1;a=!1;d=k=0;g=null;t=A;w=0;var B=new runtime.ByteArray(v);a:{var C,U;for(C=0;C<v&&(!a||-1!=b);){if(0<d){if(0!=b)for(;0<d&&C<v;)d--,k&=32767,h&=32767,B[0+C++]=e[h++]=e[k++];else{for(;0<d&&C<v;)d--,h&=32767,z(8),B[0+C++]=e[h++]=N(8),G(8);0==d&&(b=-1)}if(C==v)break}if(-1==b){if(a)break;z(1);0!=N(1)&&(a=!0);G(1);z(2);b=N(2);G(2);g=null;d=0}switch(b){case 0:U=B;var O=0+C,W=v-C,E=void 0,E=c&7;G(E);z(16);E=N(16);
G(16);z(16);if(E!=(~p&65535))U=-1;else{G(16);d=E;for(E=0;0<d&&E<W;)d--,h&=32767,z(8),U[O+E++]=e[h++]=N(8),G(8);0==d&&(b=-1);U=E}break;case 1:if(null!=g)U=R(B,0+C,v-C);else b:{U=B;O=0+C;W=v-C;if(null==f){for(var H=void 0,E=Array(288),H=void 0,H=0;144>H;H++)E[H]=8;for(;256>H;H++)E[H]=9;for(;280>H;H++)E[H]=7;for(;288>H;H++)E[H]=8;m=7;H=new I(E,288,257,y,x,m);if(0!=H.status){alert("HufBuild error: "+H.status);U=-1;break b}f=H.root;m=H.m;for(H=0;30>H;H++)E[H]=5;Z=5;H=new I(E,30,0,u,s,Z);if(1<H.status){f=
null;alert("HufBuild error: "+H.status);U=-1;break b}n=H.root;Z=H.m}g=f;q=n;l=m;r=Z;U=R(U,O,W)}break;case 2:U=null!=g?R(B,0+C,v-C):ka(B,0+C,v-C);break;default:U=-1}if(-1==U)break a;C+=U}}t=null;return B}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
core.LoopWatchDog=function(e,h){var f=Date.now(),n=0;this.check=function(){var m;if(e&&(m=Date.now(),m-f>e))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<h&&(n+=1,n>h))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){function e(h,f){f&&Array.isArray(f)?h=(h||[]).concat(f.map(function(f){return e({},f)})):f&&"object"===typeof f?(h=h||{},Object.keys(f).forEach(function(n){h[n]=e(h[n],f[n])})):h=f;return h}this.hashString=function(e){var f=0,n,m;n=0;for(m=e.length;n<m;n+=1)f=(f<<5)-f+e.charCodeAt(n),f|=0;return f};this.mergeObjects=e};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
(function(){function e(f){var e,m,p,c;void 0===h&&(c=f.createElement("div"),c.style.position="absolute",c.style.left="-99999px",c.style.transform="scale(2)",c.style["-webkit-transform"]="scale(2)",p=f.createElement("div"),p.style.width="10px",p.style.height="10px",c.appendChild(p),f.body.appendChild(c),e=p.ownerDocument.createRange(),m=p.getBoundingClientRect(),e.selectNode(p),p=e.getBoundingClientRect(),h=m.height!==p.height,e.detach(),f.body.removeChild(c));return h}var h;core.DomUtils=function(){function f(b,
a){var d=null;b.nodeType===Node.TEXT_NODE&&(0===b.length?(b.parentNode.removeChild(b),a.nodeType===Node.TEXT_NODE&&(d=a)):(a.nodeType===Node.TEXT_NODE&&(b.appendData(a.data),a.parentNode.removeChild(a)),d=b));return d}function h(b){for(var a=b.parentNode;b.firstChild;)a.insertBefore(b.firstChild,b);a.removeChild(b);return a}function m(b,a){for(var d=b.parentNode,c=b.firstChild,g;c;)g=c.nextSibling,m(c,a),c=g;a(b)&&(d=h(b));return d}function p(b,a){for(var d=0,c;b.parentNode!==a;)runtime.assert(null!==
b.parentNode,"parent is null"),b=b.parentNode;for(c=a.firstChild;c!==b;)d+=1,c=c.nextSibling;return d}function c(b,a){return b===a||Boolean(b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_CONTAINED_BY)}this.splitBoundaries=function(b){var a=[],d;if(b.startContainer.nodeType===Node.TEXT_NODE||b.endContainer.nodeType===Node.TEXT_NODE){d=b.endContainer;var c=b.endOffset;if(c<d.childNodes.length)for(d=d.childNodes[c],c=0;d.firstChild;)d=d.firstChild;else for(;d.lastChild;)d=d.lastChild,c=d.nodeType===
Node.TEXT_NODE?d.textContent.length:d.childNodes.length;b.setEnd(d,c);0!==b.endOffset&&b.endContainer.nodeType===Node.TEXT_NODE&&b.endOffset!==b.endContainer.length&&(a.push(b.endContainer.splitText(b.endOffset)),a.push(b.endContainer));0!==b.startOffset&&b.startContainer.nodeType===Node.TEXT_NODE&&b.startOffset!==b.startContainer.length&&(d=b.startContainer.splitText(b.startOffset),a.push(b.startContainer),a.push(d),b.setStart(d,0))}return a};this.containsRange=function(b,a){return 0>=b.compareBoundaryPoints(b.START_TO_START,
a)&&0<=b.compareBoundaryPoints(b.END_TO_END,a)};this.rangesIntersect=function(b,a){return 0>=b.compareBoundaryPoints(b.END_TO_START,a)&&0<=b.compareBoundaryPoints(b.START_TO_END,a)};this.getNodesInRange=function(b,a){var d=[],c,g,q=b.startContainer.ownerDocument.createTreeWalker(b.commonAncestorContainer,NodeFilter.SHOW_ALL,a,!1);for(c=q.currentNode=b.startContainer;c;){g=a(c);if(g===NodeFilter.FILTER_ACCEPT)d.push(c);else if(g===NodeFilter.FILTER_REJECT)break;c=c.parentNode}d.reverse();for(c=q.nextNode();c;)d.push(c),
c=q.nextNode();return d};this.normalizeTextNodes=function(b){b&&b.nextSibling&&(b=f(b,b.nextSibling));b&&b.previousSibling&&f(b.previousSibling,b)};this.rangeContainsNode=function(b,a){var d=a.ownerDocument.createRange(),c=a.nodeType===Node.TEXT_NODE?a.length:a.childNodes.length;d.setStart(b.startContainer,b.startOffset);d.setEnd(b.endContainer,b.endOffset);c=0===d.comparePoint(a,0)&&0===d.comparePoint(a,c);d.detach();return c};this.mergeIntoParent=h;this.removeUnwantedNodes=m;this.getElementsByTagNameNS=
function(b,a,d){return Array.prototype.slice.call(b.getElementsByTagNameNS(a,d))};this.rangeIntersectsNode=function(b,a){var d=a.nodeType===Node.TEXT_NODE?a.length:a.childNodes.length;return 0>=b.comparePoint(a,0)&&0<=b.comparePoint(a,d)};this.containsNode=function(b,a){return b===a||b.contains(a)};this.comparePoints=function(b,a,d,c){if(b===d)return c-a;var g=b.compareDocumentPosition(d);2===g?g=-1:4===g?g=1:10===g?(a=p(b,d),g=a<c?1:-1):(c=p(d,b),g=c<a?-1:1);return g};this.areRangeRectanglesTransformed=
function(b){return!e(b)};this.adaptRangeDifferenceToZoomLevel=function(b,a){var d=runtime.getWindow();return(d=d&&d.document)&&e(d)?b:b/a};(function(b){var a=runtime.getWindow(),d;null!==a&&(d=a.navigator.appVersion.toLowerCase(),a=-1===d.indexOf("chrome")&&(-1!==d.indexOf("applewebkit")||-1!==d.indexOf("safari")),d=d.indexOf("msie"),a||d)&&(b.containsNode=c)})(this)};return core.DomUtils})();
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(e,h){function f(a){a.parentNode&&(b.push(a.previousSibling),b.push(a.nextSibling),a.parentNode.removeChild(a))}function n(a,d,c){if(d.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(d),"putCursorIntoTextNode: invalid container");var k=d.parentNode;runtime.assert(Boolean(k),"putCursorIntoTextNode: container without parent");runtime.assert(0<=c&&c<=d.length,"putCursorIntoTextNode: offset is out of bounds");0===c?k.insertBefore(a,d):(c!==d.length&&d.splitText(c),k.insertBefore(a,
d.nextSibling))}else if(d.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(d),"putCursorIntoContainer: invalid container");for(k=d.firstChild;null!==k&&0<c;)k=k.nextSibling,c-=1;d.insertBefore(a,k)}b.push(a.previousSibling);b.push(a.nextSibling)}var m=e.createElementNS("urn:webodf:names:cursor","cursor"),p=e.createElementNS("urn:webodf:names:cursor","anchor"),c,b=[],a,d,k=new core.DomUtils;this.getNode=function(){return m};this.getAnchorNode=function(){return p.parentNode?p:m};this.getSelectedRange=
function(){d?(a.setStartBefore(m),a.collapse(!0)):(a.setStartAfter(c?p:m),a.setEndBefore(c?m:p));return a};this.setSelectedRange=function(g,q){a&&a!==g&&a.detach();a=g;c=!1!==q;(d=g.collapsed)?(f(p),f(m),n(m,g.startContainer,g.startOffset)):(f(p),f(m),n(c?m:p,g.endContainer,g.endOffset),n(c?p:m,g.startContainer,g.startOffset));b.forEach(k.normalizeTextNodes);b.length=0};this.hasForwardSelection=function(){return c};this.remove=function(){f(m);b.forEach(k.normalizeTextNodes);b.length=0};m.setAttributeNS("urn:webodf:names:cursor",
"memberId",h);p.setAttributeNS("urn:webodf:names:cursor","memberId",h)};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
core.EventNotifier=function(e){var h={};this.emit=function(f,e){var m,p;runtime.assert(h.hasOwnProperty(f),'unknown event fired "'+f+'"');p=h[f];for(m=0;m<p.length;m+=1)p[m](e)};this.subscribe=function(f,e){runtime.assert(h.hasOwnProperty(f),'tried to subscribe to unknown event "'+f+'"');h[f].push(e);runtime.log('event "'+f+'" subscribed.')};this.unsubscribe=function(f,e){var m;runtime.assert(h.hasOwnProperty(f),'tried to unsubscribe from unknown event "'+f+'"');m=h[f].indexOf(e);runtime.assert(-1!==
m,'tried to unsubscribe unknown callback from event "'+f+'"');-1!==m&&h[f].splice(m,1);runtime.log('event "'+f+'" unsubscribed.')};(function(){var f;for(f=0;f<e.length;f+=1)h[e[f]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var e=runtime.getWindow().document,h=e.getElementById("testarea");runtime.assert(!h,'Unclean test environment, found a div with id "testarea".');h=e.createElement("div");h.setAttribute("id","testarea");e.body.appendChild(h);return h};
core.UnitTest.cleanupTestAreaDiv=function(){var e=runtime.getWindow().document,h=e.getElementById("testarea");runtime.assert(!!h&&h.parentNode===e.body,'Test environment broken, found no div with id "testarea" below body.');e.body.removeChild(h)};core.UnitTest.createOdtDocument=function(e,h){var f="<?xml version='1.0' encoding='UTF-8'?>",f=f+"<office:document";Object.keys(h).forEach(function(e){f+=" xmlns:"+e+'="'+h[e]+'"'});f+=">";f+=e;f+="</office:document>";return runtime.parseXML(f)};
core.UnitTestRunner=function(){function e(a){c+=1;runtime.log("fail",a)}function h(a,d){var b;try{if(a.length!==d.length)return e("array of length "+a.length+" should be "+d.length+" long"),!1;for(b=0;b<a.length;b+=1)if(a[b]!==d[b])return e(a[b]+" should be "+d[b]+" at array index "+b),!1}catch(c){return!1}return!0}function f(a,d,b){var c=a.attributes,q=c.length,l,r,h;for(l=0;l<q;l+=1)if(r=c.item(l),"xmlns"!==r.prefix){h=d.getAttributeNS(r.namespaceURI,r.localName);if(!d.hasAttributeNS(r.namespaceURI,
r.localName))return e("Attribute "+r.localName+" with value "+r.value+" was not present"),!1;if(h!==r.value)return e("Attribute "+r.localName+" was "+h+" should be "+r.value),!1}return b?!0:f(d,a,!0)}function n(a,d){if(a.nodeType!==d.nodeType)return e(a.nodeType+" should be "+d.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===d.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==d.namespaceURI||a.localName!==d.localName)return e(a.namespaceURI+
" should be "+d.namespaceURI),!1;if(!f(a,d,!1))return!1;for(var b=a.firstChild,c=d.firstChild;b;){if(!c||!n(b,c))return!1;b=b.nextSibling;c=c.nextSibling}return c?!1:!0}function m(a,d){return 0===d?a===d&&1/a===1/d:a===d?!0:"number"===typeof d&&isNaN(d)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(d)===Object.prototype.toString.call([])?h(a,d):"object"===typeof d&&"object"===typeof a?d.constructor===Element||d.constructor===Node?n(d,a):b(d,a):!1}function p(a,d,b){"string"===typeof d&&
"string"===typeof b||runtime.log("WARN: shouldBe() expects string arguments");var c,q;try{q=eval(d)}catch(l){c=l}a=eval(b);c?e(d+" should be "+a+". Threw exception "+c):m(q,a)?runtime.log("pass",d+" is "+b):String(typeof q)===String(typeof a)?(b=0===q&&0>1/q?"-0":String(q),e(d+" should be "+a+". Was "+b+".")):e(d+" should be "+a+" (of type "+typeof a+"). Was "+q+" (of type "+typeof q+").")}var c=0,b;b=function(a,d){var b=Object.keys(a),c=Object.keys(d);b.sort();c.sort();return h(b,c)&&Object.keys(a).every(function(b){var c=
a[b],g=d[b];return m(c,g)?!0:(e(c+" should be "+g+" for key "+b),!1)})};this.areNodesEqual=n;this.shouldBeNull=function(a,d){p(a,d,"null")};this.shouldBeNonNull=function(a,d){var b,c;try{c=eval(d)}catch(q){b=q}b?e(d+" should be non-null. Threw exception "+b):null!==c?runtime.log("pass",d+" is non-null."):e(d+" should be non-null. Was "+c)};this.shouldBe=p;this.countFailedTests=function(){return c}};
core.UnitTester=function(){function e(f,e){return"<span style='color:blue;cursor:pointer' onclick='"+e+"'>"+f+"</span>"}var h=0,f={};this.runTests=function(n,m,p){function c(g){if(0===g.length)f[b]=k,h+=a.countFailedTests(),m();else{q=g[0];var l=Runtime.getFunctionName(q);runtime.log("Running "+l);r=a.countFailedTests();d.setUp();q(function(){d.tearDown();k[l]=r===a.countFailedTests();c(g.slice(1))})}}var b=Runtime.getFunctionName(n),a=new core.UnitTestRunner,d=new n(a),k={},g,q,l,r,t="BrowserRuntime"===
runtime.type();if(f.hasOwnProperty(b))runtime.log("Test "+b+" has already run.");else{t?runtime.log("<span>Running "+e(b,'runSuite("'+b+'");')+": "+d.description()+"</span>"):runtime.log("Running "+b+": "+d.description);l=d.tests();for(g=0;g<l.length;g+=1)q=l[g],n=Runtime.getFunctionName(q)||q.testName,p.length&&-1===p.indexOf(n)||(t?runtime.log("<span>Running "+e(n,'runTest("'+b+'","'+n+'")')+"</span>"):runtime.log("Running "+n),r=a.countFailedTests(),d.setUp(),q(),d.tearDown(),k[n]=r===a.countFailedTests());
c(d.asyncTests())}};this.countFailedTests=function(){return h};this.results=function(){return f}};
// Input 13
core.PositionIterator=function(e,h,f,n){function m(){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function p(a){this.acceptNode=function(d){return d.nodeType===Node.TEXT_NODE&&0===d.length?NodeFilter.FILTER_REJECT:a.acceptNode(d)}}function c(){var b=a.currentNode.nodeType;d=b===Node.TEXT_NODE?a.currentNode.length-1:b===Node.ELEMENT_NODE?1:0}var b=this,a,d,k;this.nextPosition=function(){if(a.currentNode===e)return!1;
if(0===d&&a.currentNode.nodeType===Node.ELEMENT_NODE)null===a.firstChild()&&(d=1);else if(a.currentNode.nodeType===Node.TEXT_NODE&&d+1<a.currentNode.length)d+=1;else if(null!==a.nextSibling())d=0;else if(a.parentNode())d=1;else return!1;return!0};this.previousPosition=function(){var b=!0;if(0===d)if(null===a.previousSibling()){if(!a.parentNode()||a.currentNode===e)return a.firstChild(),!1;d=0}else c();else a.currentNode.nodeType===Node.TEXT_NODE?d-=1:null!==a.lastChild()?c():a.currentNode===e?b=!1:
d=0;return b};this.container=function(){var b=a.currentNode,c=b.nodeType;return 0===d&&c!==Node.TEXT_NODE?b.parentNode:b};this.rightNode=function(){var b=a.currentNode,c=b.nodeType;if(c===Node.TEXT_NODE&&d===b.length)for(b=b.nextSibling;b&&1!==k(b);)b=b.nextSibling;else c===Node.ELEMENT_NODE&&1===d&&(b=null);return b};this.leftNode=function(){var b=a.currentNode;if(0===d)for(b=b.previousSibling;b&&1!==k(b);)b=b.previousSibling;else if(b.nodeType===Node.ELEMENT_NODE)for(b=b.lastChild;b&&1!==k(b);)b=
b.previousSibling;return b};this.getCurrentNode=function(){return a.currentNode};this.unfilteredDomOffset=function(){if(a.currentNode.nodeType===Node.TEXT_NODE)return d;for(var b=0,c=a.currentNode,c=1===d?c.lastChild:c.previousSibling;c;)b+=1,c=c.previousSibling;return b};this.getPreviousSibling=function(){var d=a.currentNode,b=a.previousSibling();a.currentNode=d;return b};this.getNextSibling=function(){var d=a.currentNode,b=a.nextSibling();a.currentNode=d;return b};this.setUnfilteredPosition=function(c,
f){var l,h;runtime.assert(null!==c&&void 0!==c,"PositionIterator.setUnfilteredPosition called without container");a.currentNode=c;if(c.nodeType===Node.TEXT_NODE)return d=f,runtime.assert(f<=c.length,"Error in setPosition: "+f+" > "+c.length),runtime.assert(0<=f,"Error in setPosition: "+f+" < 0"),f===c.length&&(d=void 0,a.nextSibling()?d=0:a.parentNode()&&(d=1),runtime.assert(void 0!==d,"Error in setPosition: position not valid.")),!0;l=k(c);for(h=c.parentNode;h&&h!==e&&l===NodeFilter.FILTER_ACCEPT;)l=
k(h),l!==NodeFilter.FILTER_ACCEPT&&(a.currentNode=h),h=h.parentNode;f<c.childNodes.length&&l!==NodeFilter.FILTER_REJECT?(a.currentNode=c.childNodes[f],l=k(a.currentNode),d=0):d=1;l===NodeFilter.FILTER_REJECT&&(d=1);if(l!==NodeFilter.FILTER_ACCEPT)return b.nextPosition();runtime.assert(k(a.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");return!0};this.moveToEnd=function(){a.currentNode=e;d=1};this.moveToEndOfNode=function(c){c.nodeType===
Node.TEXT_NODE?b.setUnfilteredPosition(c,c.length):(a.currentNode=c,d=1)};this.getNodeFilter=function(){return k};k=(f?new p(f):new m).acceptNode;k.acceptNode=k;a=e.ownerDocument.createTreeWalker(e,h||4294967295,k,n);d=0;null===a.firstChild()&&(d=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(e){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var e={},h=core.PositionFilter.FilterResult.FILTER_ACCEPT,f=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(n){for(var m in e)if(e.hasOwnProperty(m)&&e[m].acceptPosition(n)===f)return f;return h};this.addFilter=function(f,h){e[f]=h};this.removeFilter=function(f){delete e[f]}};
// Input 16
core.ScheduledTask=function(e,h){function f(){e();p=!1}function n(){p&&(runtime.clearTimeout(m),p=!1)}var m,p=!1;this.trigger=function(){p||(m=runtime.setTimeout(f,h))};this.triggerImmediate=function(){n();f()};this.processRequests=function(){p&&(n(),f())};this.cancel=n;this.destroy=function(c){n();c()}};
// Input 17
core.Async=function(){this.forEach=function(e,h,f){function n(b){c!==p&&(b?(c=p,f(b)):(c+=1,c===p&&f(null)))}var m,p=e.length,c=0;for(m=0;m<p;m+=1)h(e[m],n)};this.destroyAll=function(e,h){function f(n,m){if(m)h(m);else if(n<e.length)e[n](function(e){f(n+1,e)});else h()}f(0,void 0)}};
// Input 18
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(e,h){function f(a){var d=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,c,g=a.length,l=0,l=0;b=-1;for(c=0;c<g;c+=1)l=(b^a[c])&255,l=d[l],b=b>>>8^l;return b^-1}function n(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function m(a){var d=a.getFullYear();return 1980>d?0:d-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function p(a,d){var b,c,g,l,k,f,e,q=this;this.load=function(d){if(void 0!==q.data)d(null,q.data);else{var b=k+34+c+g+256;b+e>r&&(b=r-e);runtime.read(a,e,b,function(b,c){if(b||null===c)d(b,c);else a:{var g=c,e=new core.ByteArray(g),h=e.readUInt32LE(),r;if(67324752!==h)d("File entry signature is wrong."+h.toString()+" "+g.length.toString(),null);else{e.pos+=22;h=e.readUInt16LE();r=e.readUInt16LE();e.pos+=h+r;
if(l){g=g.slice(e.pos,e.pos+k);if(k!==g.length){d("The amount of compressed bytes read was "+g.length.toString()+" instead of "+k.toString()+" for "+q.filename+" in "+a+".",null);break a}g=w(g,f)}else g=g.slice(e.pos,e.pos+f);f!==g.length?d("The amount of bytes read was "+g.length.toString()+" instead of "+f.toString()+" for "+q.filename+" in "+a+".",null):(q.data=g,d(null,g))}}})}};this.set=function(a,d,b,c){q.filename=a;q.data=d;q.compressed=b;q.date=c};this.error=null;d&&(b=d.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(d.pos-4).toString()+' for file "'+a+'": '+d.data.length.toString():(d.pos+=6,l=d.readUInt16LE(),this.date=n(d.readUInt32LE()),d.readUInt32LE(),k=d.readUInt32LE(),f=d.readUInt32LE(),c=d.readUInt16LE(),g=d.readUInt16LE(),b=d.readUInt16LE(),d.pos+=8,e=d.readUInt32LE(),this.filename=runtime.byteArrayToString(d.data.slice(d.pos,d.pos+c),"utf8"),d.pos+=c+g+b))}function c(a,d){if(22!==a.length)d("Central directory length should be 22.",
v);else{var b=new core.ByteArray(a),c;c=b.readUInt32LE();101010256!==c?d("Central directory signature is wrong: "+c.toString(),v):(c=b.readUInt16LE(),0!==c?d("Zip files with non-zero disk numbers are not supported.",v):(c=b.readUInt16LE(),0!==c?d("Zip files with non-zero disk numbers are not supported.",v):(c=b.readUInt16LE(),t=b.readUInt16LE(),c!==t?d("Number of entries is inconsistent.",v):(c=b.readUInt32LE(),b=b.readUInt16LE(),b=r-22-c,runtime.read(e,b,r-b,function(a,b){if(a||null===b)d(a,v);else a:{var c=
new core.ByteArray(b),g,k;l=[];for(g=0;g<t;g+=1){k=new p(e,c);if(k.error){d(k.error,v);break a}l[l.length]=k}d(null,v)}})))))}}function b(a,d){var b=null,c,g;for(g=0;g<l.length;g+=1)if(c=l[g],c.filename===a){b=c;break}b?b.data?d(null,b.data):b.load(d):d(a+" not found.",null)}function a(a){var d=new core.ByteArrayWriter("utf8"),b=0;d.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(b=a.data.length);d.appendUInt32LE(m(a.date));d.appendUInt32LE(f(a.data));d.appendUInt32LE(b);d.appendUInt32LE(b);d.appendUInt16LE(a.filename.length);
d.appendUInt16LE(0);d.appendString(a.filename);a.data&&d.appendByteArray(a.data);return d}function d(a,d){var b=new core.ByteArrayWriter("utf8"),c=0;b.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(c=a.data.length);b.appendUInt32LE(m(a.date));b.appendUInt32LE(f(a.data));b.appendUInt32LE(c);b.appendUInt32LE(c);b.appendUInt16LE(a.filename.length);b.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);b.appendUInt32LE(d);b.appendString(a.filename);return b}function k(a,d){if(a===l.length)d(null);else{var b=l[a];
void 0!==b.data?k(a+1,d):b.load(function(b){b?d(b):k(a+1,d)})}}function g(b,c){k(0,function(g){if(g)c(g);else{g=new core.ByteArrayWriter("utf8");var k,f,e,q=[0];for(k=0;k<l.length;k+=1)g.appendByteArrayWriter(a(l[k])),q.push(g.getLength());e=g.getLength();for(k=0;k<l.length;k+=1)f=l[k],g.appendByteArrayWriter(d(f,q[k]));k=g.getLength()-e;g.appendArray([80,75,5,6,0,0,0,0]);g.appendUInt16LE(l.length);g.appendUInt16LE(l.length);g.appendUInt32LE(k);g.appendUInt32LE(e);g.appendArray([0,0]);b(g.getByteArray())}})}
function q(a,d){g(function(b){runtime.writeFile(a,b,d)},d)}var l,r,t,w=(new core.RawInflate).inflate,v=this,y=new core.Base64;this.load=b;this.save=function(a,d,b,c){var g,k;for(g=0;g<l.length;g+=1)if(k=l[g],k.filename===a){k.set(a,d,b,c);return}k=new p(e);k.set(a,d,b,c);l.push(k)};this.remove=function(a){var d,b;for(d=0;d<l.length;d+=1)if(b=l[d],b.filename===a)return l.splice(d,1),!0;return!1};this.write=function(a){q(e,a)};this.writeAs=q;this.createByteArray=g;this.loadContentXmlAsFragments=function(a,
d){v.loadAsString(a,function(a,b){if(a)return d.rootElementReady(a);d.rootElementReady(null,b,!0)})};this.loadAsString=function(a,d){b(a,function(a,b){if(a||null===b)return d(a,null);var c=runtime.byteArrayToString(b,"utf8");d(null,c)})};this.loadAsDOM=function(a,d){v.loadAsString(a,function(a,b){if(a||null===b)d(a,null);else{var c=(new DOMParser).parseFromString(b,"text/xml");d(null,c)}})};this.loadAsDataURL=function(a,d,c){b(a,function(a,b){if(a)return c(a,null);var g=0,k;d||(d=80===b[1]&&78===
b[2]&&71===b[3]?"image/png":255===b[0]&&216===b[1]&&255===b[2]?"image/jpeg":71===b[0]&&73===b[1]&&70===b[2]?"image/gif":"");for(k="data:"+d+";base64,";g<b.length;)k+=y.convertUTF8ArrayToBase64(b.slice(g,Math.min(g+45E3,b.length))),g+=45E3;c(null,k)})};this.getEntries=function(){return l.slice()};r=-1;null===h?l=[]:runtime.getFileSize(e,function(a){r=a;0>r?h("File '"+e+"' cannot be read.",v):runtime.read(e,r-22,22,function(a,d){a||null===h||null===d?h(a,v):c(d,h)})})};
// Input 19
core.CSSUnits=function(){var e={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(h,f,n){return h*e[n]/e[f]};this.convertMeasure=function(e,f){var n,m;e&&f?(n=parseFloat(e),m=e.replace(n.toString(),""),n=this.convert(n,m,f)):n="";return n.toString()};this.getUnits=function(e){return e.substr(e.length-2,e.length)}};
// Input 20
xmldom.LSSerializerFilter=function(){};
// Input 21
"function"!==typeof Object.create&&(Object.create=function(e){var h=function(){};h.prototype=e;return new h});
xmldom.LSSerializer=function(){function e(e){var f=e||{},c=function(a){var d={},b;for(b in a)a.hasOwnProperty(b)&&(d[a[b]]=b);return d}(e),b=[f],a=[c],d=0;this.push=function(){d+=1;f=b[d]=Object.create(f);c=a[d]=Object.create(c)};this.pop=function(){b[d]=void 0;a[d]=void 0;d-=1;f=b[d];c=a[d]};this.getLocalNamespaceDefinitions=function(){return c};this.getQName=function(a){var d=a.namespaceURI,b=0,l;if(!d)return a.localName;if(l=c[d])return l+":"+a.localName;do{l||!a.prefix?(l="ns"+b,b+=1):l=a.prefix;
if(f[l]===d)break;if(!f[l]){f[l]=d;c[d]=l;break}l=null}while(null===l);return l+":"+a.localName}}function h(f){return f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function f(e,p){var c="",b=n.filter?n.filter.acceptNode(p):NodeFilter.FILTER_ACCEPT,a;if(b===NodeFilter.FILTER_ACCEPT&&p.nodeType===Node.ELEMENT_NODE){e.push();a=e.getQName(p);var d,k=p.attributes,g,q,l,r="",t;d="<"+a;g=k.length;for(q=0;q<g;q+=1)l=k.item(q),"http://www.w3.org/2000/xmlns/"!==
l.namespaceURI&&(t=n.filter?n.filter.acceptNode(l):NodeFilter.FILTER_ACCEPT,t===NodeFilter.FILTER_ACCEPT&&(t=e.getQName(l),l="string"===typeof l.value?h(l.value):l.value,r+=" "+(t+'="'+l+'"')));g=e.getLocalNamespaceDefinitions();for(q in g)g.hasOwnProperty(q)&&((k=g[q])?"xmlns"!==k&&(d+=" xmlns:"+g[q]+'="'+q+'"'):d+=' xmlns="'+q+'"');c+=d+(r+">")}if(b===NodeFilter.FILTER_ACCEPT||b===NodeFilter.FILTER_SKIP){for(b=p.firstChild;b;)c+=f(e,b),b=b.nextSibling;p.nodeValue&&(c+=h(p.nodeValue))}a&&(c+="</"+
a+">",e.pop());return c}var n=this;this.filter=null;this.writeToString=function(h,p){if(!h)return"";var c=new e(p);return f(c,h)}};
// Input 22
xmldom.RelaxNGParser=function(){function e(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function h(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return h({name:a.name,e:[b].concat(a.e.slice(2))})}function f(a){a=a.split(":",2);var c="",g;1===a.length?a=["",a[0]]:c=a[0];for(g in b)b[g]===c&&(a[0]=g);return a}function n(a,b){for(var c=0,e,l,h=a.name;a.e&&c<a.e.length;)if(e=
a.e[c],"ref"===e.name){l=b[e.a.name];if(!l)throw e.a.name+" was not defined.";e=a.e.slice(c+1);a.e=a.e.slice(0,c);a.e=a.e.concat(l.e);a.e=a.e.concat(e)}else c+=1,n(e,b);e=a.e;"choice"!==h||e&&e[1]&&"empty"!==e[1].name||(e&&e[0]&&"empty"!==e[0].name?(e[1]=e[0],e[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===h||"interleave"===h)"empty"===e[0].name?"empty"===e[1].name?(delete a.e,a.name="empty"):(h=a.name=e[1].name,a.names=e[1].names,e=a.e=e[1].e):"empty"===e[1].name&&(h=a.name=e[0].name,
a.names=e[0].names,e=a.e=e[0].e);"oneOrMore"===h&&"empty"===e[0].name&&(delete a.e,a.name="empty");if("attribute"===h){l=a.names?a.names.length:0;for(var t,m=[],p=[],c=0;c<l;c+=1)t=f(a.names[c]),p[c]=t[0],m[c]=t[1];a.localnames=m;a.namespaces=p}"interleave"===h&&("interleave"===e[0].name?a.e="interleave"===e[1].name?e[0].e.concat(e[1].e):[e[1]].concat(e[0].e):"interleave"===e[1].name&&(a.e=[e[0]].concat(e[1].e)))}function m(a,b){for(var c=0,e;a.e&&c<a.e.length;)e=a.e[c],"elementref"===e.name?(e.id=
e.id||0,a.e[c]=b[e.id]):"element"!==e.name&&m(e,b),c+=1}var p=this,c,b={"http://www.w3.org/XML/1998/namespace":"xml"},a;a=function(d,c,g){var e=[],l,r,t=d.localName,m=[];l=d.attributes;var p=t,n=m,x={},u,s;for(u=0;u<l.length;u+=1)if(s=l.item(u),s.namespaceURI)"http://www.w3.org/2000/xmlns/"===s.namespaceURI&&(b[s.value]=s.localName);else{"name"!==s.localName||"element"!==p&&"attribute"!==p||n.push(s.value);if("name"===s.localName||"combine"===s.localName||"type"===s.localName){var C=s,B;B=s.value;
B=B.replace(/^\s\s*/,"");for(var A=/\s/,I=B.length-1;A.test(B.charAt(I));)I-=1;B=B.slice(0,I+1);C.value=B}x[s.localName]=s.value}l=x;l.combine=l.combine||void 0;d=d.firstChild;p=e;n=m;for(x="";d;){if(d.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===d.namespaceURI){if(u=a(d,c,p))"name"===u.name?n.push(b[u.a.ns]+":"+u.text):"choice"===u.name&&u.names&&u.names.length&&(n=n.concat(u.names),delete u.names),p.push(u)}else d.nodeType===Node.TEXT_NODE&&(x+=d.nodeValue);d=d.nextSibling}d=
x;"value"!==t&&"param"!==t&&(d=/^\s*([\s\S]*\S)?\s*$/.exec(d)[1]);"value"===t&&void 0===l.type&&(l.type="token",l.datatypeLibrary="");"attribute"!==t&&"element"!==t||void 0===l.name||(r=f(l.name),e=[{name:"name",text:r[1],a:{ns:r[0]}}].concat(e),delete l.name);"name"===t||"nsName"===t||"value"===t?void 0===l.ns&&(l.ns=""):delete l.ns;"name"===t&&(r=f(d),l.ns=r[0],d=r[1]);1<e.length&&("define"===t||"oneOrMore"===t||"zeroOrMore"===t||"optional"===t||"list"===t||"mixed"===t)&&(e=[{name:"group",e:h({name:"group",
e:e}).e}]);2<e.length&&"element"===t&&(e=[e[0]].concat({name:"group",e:h({name:"group",e:e.slice(1)}).e}));1===e.length&&"attribute"===t&&e.push({name:"text",text:d});1!==e.length||"choice"!==t&&"group"!==t&&"interleave"!==t?2<e.length&&("choice"===t||"group"===t||"interleave"===t)&&(e=h({name:t,e:e}).e):(t=e[0].name,m=e[0].names,l=e[0].a,d=e[0].text,e=e[0].e);"mixed"===t&&(t="interleave",e=[e[0],{name:"text"}]);"optional"===t&&(t="choice",e=[e[0],{name:"empty"}]);"zeroOrMore"===t&&(t="choice",e=
[{name:"oneOrMore",e:[e[0]]},{name:"empty"}]);if("define"===t&&l.combine){a:{p=l.combine;n=l.name;x=e;for(u=0;g&&u<g.length;u+=1)if(s=g[u],"define"===s.name&&s.a&&s.a.name===n){s.e=[{name:p,e:s.e.concat(x)}];g=s;break a}g=null}if(g)return}g={name:t};e&&0<e.length&&(g.e=e);for(r in l)if(l.hasOwnProperty(r)){g.a=l;break}void 0!==d&&(g.text=d);m&&0<m.length&&(g.names=m);"element"===t&&(g.id=c.length,c.push(g),g={name:"elementref",id:g.id});return g};this.parseRelaxNGDOM=function(d,f){var g=[],h=a(d&&
d.documentElement,g,void 0),l,r,t={};for(l=0;l<h.e.length;l+=1)r=h.e[l],"define"===r.name?t[r.a.name]=r:"start"===r.name&&(c=r);if(!c)return[new e("No Relax NG start element was found.")];n(c,t);for(l in t)t.hasOwnProperty(l)&&n(t[l],t);for(l=0;l<g.length;l+=1)n(g[l],t);f&&(p.rootPattern=f(c.e[0],g));m(c,g);for(l=0;l<g.length;l+=1)m(g[l],g);p.start=c;p.elements=g;p.nsmap=b;return null}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function e(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function h(a,b){return function(){var d={},c=0;return function(g){var e=g.hash||g.toString(),l;l=d[e];if(void 0!==l)return l;d[e]=l=b(g);l.hash=a+c.toString();c+=1;return l}}()}function f(a){return function(){var b={};return function(d){var c,g;g=b[d.localName];if(void 0===g)b[d.localName]=g={};else if(c=g[d.namespaceURI],void 0!==c)return c;return g[d.namespaceURI]=c=a(d)}}()}function n(a,
b,d){return function(){var c={},g=0;return function(e,l){var f=b&&b(e,l),k,h;if(void 0!==f)return f;f=e.hash||e.toString();k=l.hash||l.toString();h=c[f];if(void 0===h)c[f]=h={};else if(f=h[k],void 0!==f)return f;h[k]=f=d(e,l);f.hash=a+g.toString();g+=1;return f}}()}function m(a,b){"choice"===b.p1.type?m(a,b.p1):a[b.p1.hash]=b.p1;"choice"===b.p2.type?m(a,b.p2):a[b.p2.hash]=b.p2}function p(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return u},startTagOpenDeriv:function(d){return a.contains(d)?
l(b,s):u},attDeriv:function(){return u},startTagCloseDeriv:function(){return this}}}function c(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return s}}}function b(a,c,g,e){if(c===u)return u;if(e>=g.length)return c;0===e&&(e=0);for(var l=g.item(e);l.namespaceURI===d;){e+=1;if(e>=g.length)return c;l=g.item(e)}return l=b(a,c.attDeriv(a,g.item(e)),g,e+1)}function a(b,d,c){c.e[0].a?(b.push(c.e[0].text),d.push(c.e[0].a.ns)):a(b,d,c.e[0]);c.e[1].a?(b.push(c.e[1].text),d.push(c.e[1].a.ns)):
a(b,d,c.e[1])}var d="http://www.w3.org/2000/xmlns/",k,g,q,l,r,t,w,v,y,x,u={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return u},startTagOpenDeriv:function(){return u},attDeriv:function(){return u},startTagCloseDeriv:function(){return u},endTagDeriv:function(){return u}},s={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return u},startTagOpenDeriv:function(){return u},attDeriv:function(){return u},startTagCloseDeriv:function(){return s},endTagDeriv:function(){return u}},
C={type:"text",nullable:!0,hash:"text",textDeriv:function(){return C},startTagOpenDeriv:function(){return u},attDeriv:function(){return u},startTagCloseDeriv:function(){return C},endTagDeriv:function(){return u}},B,A,I;k=n("choice",function(a,b){if(a===u)return b;if(b===u||a===b)return a},function(a,b){var d={},c;m(d,{p1:a,p2:b});b=a=void 0;for(c in d)d.hasOwnProperty(c)&&(void 0===a?a=d[c]:b=void 0===b?d[c]:k(b,d[c]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(d,c){return k(a.textDeriv(d,c),b.textDeriv(d,c))},startTagOpenDeriv:f(function(d){return k(a.startTagOpenDeriv(d),b.startTagOpenDeriv(d))}),attDeriv:function(d,c){return k(a.attDeriv(d,c),b.attDeriv(d,c))},startTagCloseDeriv:e(function(){return k(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:e(function(){return k(a.endTagDeriv(),b.endTagDeriv())})}}(a,b)});g=function(a,b,d){return function(){var c={},g=0;return function(e,l){var f=b&&b(e,l),k,h;if(void 0!==f)return f;
f=e.hash||e.toString();k=l.hash||l.toString();f<k&&(h=f,f=k,k=h,h=e,e=l,l=h);h=c[f];if(void 0===h)c[f]=h={};else if(f=h[k],void 0!==f)return f;h[k]=f=d(e,l);f.hash=a+g.toString();g+=1;return f}}()}("interleave",function(a,b){if(a===u||b===u)return u;if(a===s)return b;if(b===s)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(d,c){return k(g(a.textDeriv(d,c),b),g(a,b.textDeriv(d,c)))},startTagOpenDeriv:f(function(d){return k(B(function(a){return g(a,
b)},a.startTagOpenDeriv(d)),B(function(b){return g(a,b)},b.startTagOpenDeriv(d)))}),attDeriv:function(d,c){return k(g(a.attDeriv(d,c),b),g(a,b.attDeriv(d,c)))},startTagCloseDeriv:e(function(){return g(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});q=n("group",function(a,b){if(a===u||b===u)return u;if(a===s)return b;if(b===s)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(d,c){var g=q(a.textDeriv(d,c),b);return a.nullable?k(g,b.textDeriv(d,
c)):g},startTagOpenDeriv:function(d){var c=B(function(a){return q(a,b)},a.startTagOpenDeriv(d));return a.nullable?k(c,b.startTagOpenDeriv(d)):c},attDeriv:function(d,c){return k(q(a.attDeriv(d,c),b),q(a,b.attDeriv(d,c)))},startTagCloseDeriv:e(function(){return q(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});l=n("after",function(a,b){if(a===u||b===u)return u},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(d,c){return l(a.textDeriv(d,c),b)},startTagOpenDeriv:f(function(d){return B(function(a){return l(a,
b)},a.startTagOpenDeriv(d))}),attDeriv:function(d,c){return l(a.attDeriv(d,c),b)},startTagCloseDeriv:e(function(){return l(a.startTagCloseDeriv(),b)}),endTagDeriv:e(function(){return a.nullable?b:u})}});r=h("oneormore",function(a){return a===u?u:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,d){return q(a.textDeriv(b,d),k(this,s))},startTagOpenDeriv:function(b){var d=this;return B(function(a){return q(a,k(d,s))},a.startTagOpenDeriv(b))},attDeriv:function(b,d){return q(a.attDeriv(b,
d),k(this,s))},startTagCloseDeriv:e(function(){return r(a.startTagCloseDeriv())})}});w=n("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(d,c){return a.contains(c)&&(b.nullable&&/^\s+$/.test(c.nodeValue)||b.textDeriv(d,c.nodeValue).nullable)?s:u},startTagCloseDeriv:function(){return u}}});t=h("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,d){return d===a?s:u},attDeriv:function(){return u},startTagCloseDeriv:function(){return this}}});
y=h("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return s},attDeriv:function(){return u},startTagCloseDeriv:function(){return this}}});B=function N(a,b){return"after"===b.type?l(b.p1,a(b.p2)):"choice"===b.type?k(N(a,b.p1),N(a,b.p2)):b};A=function(a,d,c){var g=c.currentNode;d=d.startTagOpenDeriv(g);d=b(a,d,g.attributes,0);var e=d=d.startTagCloseDeriv(),g=c.currentNode;d=c.firstChild();for(var f=[],l;d;)d.nodeType===Node.ELEMENT_NODE?f.push(d):d.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(d.nodeValue)||f.push(d.nodeValue),d=c.nextSibling();0===f.length&&(f=[""]);l=e;for(e=0;l!==u&&e<f.length;e+=1)d=f[e],"string"===typeof d?l=/^\s*$/.test(d)?k(l,l.textDeriv(a,d)):l.textDeriv(a,d):(c.currentNode=d,l=A(a,l,c));c.currentNode=g;return d=l.endTagDeriv()};v=function(b){var d,c,g;if("name"===b.name)d=b.text,c=b.a.ns,b={name:d,ns:c,hash:"{"+c+"}"+d,contains:function(a){return a.namespaceURI===c&&a.localName===d}};else if("choice"===b.name){d=[];c=[];a(d,c,b);b="";for(g=0;g<d.length;g+=
1)b+="{"+c[g]+"}"+d[g]+",";b={hash:b,contains:function(a){var b;for(b=0;b<d.length;b+=1)if(d[b]===a.localName&&c[b]===a.namespaceURI)return!0;return!1}}}else b={hash:"anyName",contains:function(){return!0}};return b};x=function G(a,b){var d,e;if("elementref"===a.name){d=a.id||0;a=b[d];if(void 0!==a.name){var f=a;d=b[f.id]={hash:"element"+f.id.toString()};f=p(v(f.e[0]),x(f.e[1],b));for(e in f)f.hasOwnProperty(e)&&(d[e]=f[e]);return d}return a}switch(a.name){case "empty":return s;case "notAllowed":return u;
case "text":return C;case "choice":return k(G(a.e[0],b),G(a.e[1],b));case "interleave":d=G(a.e[0],b);for(e=1;e<a.e.length;e+=1)d=g(d,G(a.e[e],b));return d;case "group":return q(G(a.e[0],b),G(a.e[1],b));case "oneOrMore":return r(G(a.e[0],b));case "attribute":return w(v(a.e[0]),G(a.e[1],b));case "value":return t(a.text);case "data":return d=a.a&&a.a.type,void 0===d&&(d=""),y(d);case "list":return c()}throw"No support for "+a.name;};this.makePattern=function(a,b){var d={},c;for(c in b)b.hasOwnProperty(c)&&
(d[c]=b[c]);return c=x(a,d)};this.validate=function(a,b){var d;a.currentNode=a.root;d=A(null,I,a);d.nullable?b(null):(runtime.log("Error in Relax NG validation: "+d),b(["Error in Relax NG validation: "+d]))};this.init=function(a){I=a}};
// Input 24
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function e(c,b){this.message=function(){b&&(c+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",c+=b.nodeName,b.nodeValue&&(c+=" with value '"+b.nodeValue+"'"),c+=".");return c}}function h(c,b,a,d){return"empty"===c.name?null:m(c,b,a,d)}function f(c,b){if(2!==c.e.length)throw"Element with wrong # of elements: "+c.e.length;for(var a=b.currentNode,d=a?a.nodeType:0,f=null;d>Node.ELEMENT_NODE;){if(d!==Node.COMMENT_NODE&&(d!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new e("Not allowed node of type "+
d+".")];d=(a=b.nextSibling())?a.nodeType:0}if(!a)return[new e("Missing element "+c.names)];if(c.names&&-1===c.names.indexOf(p[a.namespaceURI]+":"+a.localName))return[new e("Found "+a.nodeName+" instead of "+c.names+".",a)];if(b.firstChild()){for(f=h(c.e[1],b,a);b.nextSibling();)if(d=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||d===Node.COMMENT_NODE))return[new e("Spurious content.",b.currentNode)];if(b.parentNode()!==a)return[new e("Implementation error.")]}else f=
h(c.e[1],b,a);b.nextSibling();return f}var n,m,p;m=function(c,b,a,d){var k=c.name,g=null;if("text"===k)a:{for(var q=(c=b.currentNode)?c.nodeType:0;c!==a&&3!==q;){if(1===q){g=[new e("Element not allowed here.",c)];break a}q=(c=b.nextSibling())?c.nodeType:0}b.nextSibling();g=null}else if("data"===k)g=null;else if("value"===k)d!==c.text&&(g=[new e("Wrong value, should be '"+c.text+"', not '"+d+"'",a)]);else if("list"===k)g=null;else if("attribute"===k)a:{if(2!==c.e.length)throw"Attribute with wrong # of elements: "+
c.e.length;k=c.localnames.length;for(g=0;g<k;g+=1){d=a.getAttributeNS(c.namespaces[g],c.localnames[g]);""!==d||a.hasAttributeNS(c.namespaces[g],c.localnames[g])||(d=void 0);if(void 0!==q&&void 0!==d){g=[new e("Attribute defined too often.",a)];break a}q=d}g=void 0===q?[new e("Attribute not found: "+c.names,a)]:h(c.e[1],b,a,q)}else if("element"===k)g=f(c,b);else if("oneOrMore"===k){d=0;do q=b.currentNode,k=m(c.e[0],b,a),d+=1;while(!k&&q!==b.currentNode);1<d?(b.currentNode=q,g=null):g=k}else if("choice"===
k){if(2!==c.e.length)throw"Choice with wrong # of options: "+c.e.length;q=b.currentNode;if("empty"===c.e[0].name){if(k=m(c.e[1],b,a,d))b.currentNode=q;g=null}else{if(k=h(c.e[0],b,a,d))b.currentNode=q,k=m(c.e[1],b,a,d);g=k}}else if("group"===k){if(2!==c.e.length)throw"Group with wrong # of members: "+c.e.length;g=m(c.e[0],b,a)||m(c.e[1],b,a)}else if("interleave"===k)a:{q=c.e.length;d=[q];for(var l=q,r,t,p,n;0<l;){r=0;t=b.currentNode;for(g=0;g<q;g+=1)p=b.currentNode,!0!==d[g]&&d[g]!==p&&(n=c.e[g],(k=
m(n,b,a))?(b.currentNode=p,void 0===d[g]&&(d[g]=!1)):p===b.currentNode||"oneOrMore"===n.name||"choice"===n.name&&("oneOrMore"===n.e[0].name||"oneOrMore"===n.e[1].name)?(r+=1,d[g]=p):(r+=1,d[g]=!0));if(t===b.currentNode&&r===l){g=null;break a}if(0===r){for(g=0;g<q;g+=1)if(!1===d[g]){g=[new e("Interleave does not match.",a)];break a}g=null;break a}for(g=l=0;g<q;g+=1)!0!==d[g]&&(l+=1)}g=null}else throw k+" not allowed in nonEmptyPattern.";return g};this.validate=function(c,b){c.currentNode=c.root;var a=
h(n.e[0],c,c.root);b(a)};this.init=function(c,b){n=c;p=b}};
// Input 25
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function e(a,b,d){return-1!==a&&(a<b||-1===b)&&(a<d||-1===d)}function h(a){for(var b=[],d=0,c=a.length,f;d<c;){var h=a,m=c,p=b,n="",u=[],s=h.indexOf("[",d),C=h.indexOf("/",d),B=h.indexOf("=",d);e(C,s,B)?(n=h.substring(d,C),d=C+1):e(s,C,B)?(n=h.substring(d,s),d=k(h,s,u)):e(B,C,s)?(n=h.substring(d,B),d=B):(n=h.substring(d,m),d=m);p.push({location:n,predicates:u});if(d<c&&"="===a[d]){f=a.substring(d+1,c);if(2<f.length&&("'"===f[0]||'"'===f[0]))f=f.slice(1,f.length-1);else try{f=
parseInt(f,10)}catch(A){}d=c}}return{steps:b,value:f}}function f(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var d=b?null:a;b=!0;return d}}function n(a,b,d){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!(c=c.getAttributeNodeNS(b,d));)c=a.next();return c}}function m(a,b){var d=a.next(),c=null;this.reset=function(){a.reset();d=a.next();c=null};this.next=function(){for(;d;){if(c)if(b&&c.firstChild)c=c.firstChild;else{for(;!c.nextSibling&&
c!==d;)c=c.parentNode;c===d?d=a.next():c=c.nextSibling}else{do(c=d.firstChild)||(d=a.next());while(d&&!c)}if(c&&c.nodeType===Node.ELEMENT_NODE)return c}return null}}function p(a,b){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!b(d);)d=a.next();return d}}function c(a,b,d){b=b.split(":",2);var c=d(b[0]),e=b[1];return new p(a,function(a){return a.localName===e&&a.namespaceURI===c})}function b(a,b,c){var e=new f,k=d(e,b,c),h=b.value;return void 0===h?new p(a,function(a){e.setNode(a);
k.reset();return k.next()}):new p(a,function(a){e.setNode(a);k.reset();return(a=k.next())&&a.nodeValue===h})}function a(a,b,c){var e=a.ownerDocument,k=[],m=null;if(e&&e.evaluate)for(c=e.evaluate(b,a,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),m=c.iterateNext();null!==m;)m.nodeType===Node.ELEMENT_NODE&&k.push(m),m=c.iterateNext();else{k=new f;k.setNode(a);a=h(b);k=d(k,a,c);a=[];for(c=k.next();c;)a.push(c),c=k.next();k=a}return k}var d,k;k=function(a,b,d){for(var c=b,e=a.length,f=0;c<e;)"]"===
a[c]?(f-=1,0>=f&&d.push(h(a.substring(b,c)))):"["===a[c]&&(0>=f&&(b=c+1),f+=1),c+=1;return c};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};d=function(a,d,e){var f,k,h,p;for(f=0;f<d.steps.length;f+=1)for(h=d.steps[f],k=h.location,""===k?a=new m(a,!1):"@"===k[0]?(p=k.slice(1).split(":",2),a=new n(a,e(p[0]),p[1])):"."!==k&&(a=new m(a,!1),-1!==k.indexOf(":")&&(a=c(a,k,e))),k=0;k<h.predicates.length;k+=1)p=h.predicates[k],a=b(a,p,e);return a};xmldom.XPath=
function(){this.getODFElementsWithXPath=a};return xmldom.XPath}();
// Input 26
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.AnnotationViewManager=function(e,h,f){function n(b){var c=b.node,e=b.end;b=a.createRange();e&&(b.setStart(c,c.childNodes.length),b.setEnd(e,0),e=d.getTextNodes(b,!1),e.forEach(function(b){var d=a.createElement("span");d.className="annotationHighlight";d.setAttribute("annotation",c.getAttributeNS(odf.Namespaces.officens,"name"));b.parentNode.insertBefore(d,b);d.appendChild(b)}));b.detach()}function m(a){var b=e.getSizer();a?(f.style.display="inline-block",b.style.paddingRight=k.getComputedStyle(f).width):
(f.style.display="none",b.style.paddingRight=0);e.refreshSize()}function p(){b.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function c(){var d;for(d=0;d<b.length;d+=1){var c=b[d],l=c.node.parentNode,h=l.nextSibling,m=h.nextSibling,p=l.parentNode,n=0,y=b[b.indexOf(c)-1],x=void 0,c=c.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],n=void 0,n=e.getZoomLevel();l.style.left=(f.getBoundingClientRect().left-p.getBoundingClientRect().left)/
n+"px";l.style.width=f.getBoundingClientRect().width/n+"px";h.style.width=parseFloat(l.style.left)-30+"px";y&&(x=y.node.parentNode.getBoundingClientRect(),20>=(p.getBoundingClientRect().top-x.bottom)/n?l.style.top=Math.abs(p.getBoundingClientRect().top-x.bottom)/n+20+"px":l.style.top="0px");m.style.left=h.getBoundingClientRect().width/n+"px";var h=m.style,p=m.getBoundingClientRect().left/n,y=m.getBoundingClientRect().top/n,x=l.getBoundingClientRect().left/n,u=l.getBoundingClientRect().top/n,s=0,C=
0,s=x-p,s=s*s,C=u-y,C=C*C,p=Math.sqrt(s+C);h.width=p+"px";n=Math.asin((l.getBoundingClientRect().top-m.getBoundingClientRect().top)/(n*parseFloat(m.style.width)));m.style.transform="rotate("+n+"rad)";m.style.MozTransform="rotate("+n+"rad)";m.style.WebkitTransform="rotate("+n+"rad)";m.style.msTransform="rotate("+n+"rad)";c&&(n=k.getComputedStyle(c,":before").content)&&"none"!==n&&(/^["'].*["']$/.test(n)&&(n=n.substring(1,n.length-1)),c.firstChild?c.firstChild.nodeValue=n:c.appendChild(a.createTextNode(n)))}}
var b=[],a=h.ownerDocument,d=new odf.OdfUtils,k=runtime.getWindow();runtime.assert(Boolean(k),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=c;this.addAnnotation=function(d){m(!0);b.push({node:d.node,end:d.end});p();var e=a.createElement("div"),f=a.createElement("div"),k=a.createElement("div"),h=a.createElement("div"),w=a.createElement("div"),v=d.node;e.className="annotationWrapper";v.parentNode.insertBefore(e,v);f.className="annotationNote";
f.appendChild(v);w.className="annotationRemoveButton";f.appendChild(w);k.className="annotationConnector horizontal";h.className="annotationConnector angular";e.appendChild(f);e.appendChild(k);e.appendChild(h);d.end&&n(d);c()};this.forgetAnnotations=function(){for(;b.length;){var d=b[0],c=b.indexOf(d),e=d.node,f=e.parentNode.parentNode;"div"===f.localName&&(f.parentNode.insertBefore(e,f),f.parentNode.removeChild(f));d=d.node.getAttributeNS(odf.Namespaces.officens,"name");d=a.querySelectorAll('span.annotationHighlight[annotation="'+
d+'"]');f=e=void 0;for(e=0;e<d.length;e+=1){for(f=d[e];f.firstChild;)f.parentNode.insertBefore(f.firstChild,f);f.parentNode.removeChild(f)}-1!==c&&b.splice(c,1);0===b.length&&m(!1)}}};
// Input 27
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.OdfNodeFilter=function(){this.acceptNode=function(e){return"http://www.w3.org/1999/xhtml"===e.namespaceURI?NodeFilter.FILTER_SKIP:e.namespaceURI&&e.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
odf.Namespaces=function(){function e(e){return h[e]||null}var h={db:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",dc:"http://purl.org/dc/elements/1.1/",dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chart:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",form:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},f;e.lookupNamespaceURI=e;f=function(){};f.forEachPrefix=function(e){for(var f in h)h.hasOwnProperty(f)&&
e(f,h[f])};f.resolvePrefix=e;f.namespaceMap=h;f.dbns="urn:oasis:names:tc:opendocument:xmlns:database:1.0";f.dcns="http://purl.org/dc/elements/1.1/";f.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";f.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";f.chartns="urn:oasis:names:tc:opendocument:xmlns:chart:1.0";f.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";f.formns="urn:oasis:names:tc:opendocument:xmlns:form:1.0";f.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
f.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";f.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";f.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";f.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";f.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";f.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";f.xlinkns="http://www.w3.org/1999/xlink";f.xmlns="http://www.w3.org/XML/1998/namespace";return f}();
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
odf.StyleInfo=function(){function e(a,b){for(var d=B[a.localName],c=d&&d[a.namespaceURI],f=c?c.length:0,g,d=0;d<f;d+=1)(g=a.getAttributeNS(c[d].ns,c[d].localname))&&a.setAttributeNS(c[d].ns,C[c[d].ns]+c[d].localname,b+g);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(c=d,e(c,b)),d=d.nextSibling}function h(a,b){for(var d=B[a.localName],c=d&&d[a.namespaceURI],e=c?c.length:0,f,d=0;d<e;d+=1)if(f=a.getAttributeNS(c[d].ns,c[d].localname))f=f.replace(b,""),a.setAttributeNS(c[d].ns,C[c[d].ns]+c[d].localname,
f);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(c=d,h(c,b)),d=d.nextSibling}function f(a,b){var d=B[a.localName],c=(d=d&&d[a.namespaceURI])?d.length:0,e,f,g;for(g=0;g<c;g+=1)if(e=a.getAttributeNS(d[g].ns,d[g].localname))b=b||{},f=d[g].keyname,f=b[f]=b[f]||{},f[e]=1;return b}function n(a,b){var d,c;f(a,b);for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(c=d,n(c,b)),d=d.nextSibling}function m(a,b,d){this.key=a;this.name=b;this.family=d;this.requires={}}function p(a,b,d){var c=a+'"'+
b,e=d[c];e||(e=d[c]=new m(c,a,b));return e}function c(a,b,d){var e=B[a.localName],f=(e=e&&e[a.namespaceURI])?e.length:0,g=a.getAttributeNS(x,"name"),k=a.getAttributeNS(x,"family"),l;g&&k&&(b=p(g,k,d));if(b)for(g=0;g<f;g+=1)if(k=a.getAttributeNS(e[g].ns,e[g].localname))l=e[g].keyname,k=p(k,l,d),b.requires[k.key]=k;for(g=a.firstChild;g;)g.nodeType===Node.ELEMENT_NODE&&(a=g,c(a,b,d)),g=g.nextSibling;return d}function b(a,d){var c=d[a.family];c||(c=d[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){b(a.requires[c],
d)})}function a(a,d){var e=c(a,null,{});Object.keys(e).forEach(function(a){a=e[a];var c=d[a.family];c&&c.hasOwnProperty(a.name)&&b(a,d)})}function d(a,b){function c(b){(b=f.getAttributeNS(x,b))&&(a[b]=!0)}var e=["font-name","font-name-asian","font-name-complex"],f;if(b)for(f=b.firstChild;f;)f.nodeType===Node.ELEMENT_NODE&&(e.forEach(c),d(a,f)),f=f.nextSibling}function k(a,b){function d(a){var c=e.getAttributeNS(x,a);c&&b.hasOwnProperty(c)&&e.setAttributeNS(x,"style:"+a,b[c])}var c=["font-name","font-name-asian",
"font-name-complex"],e;if(a)for(e=a.firstChild;e;)e.nodeType===Node.ELEMENT_NODE&&(c.forEach(d),k(e,b)),e=e.nextSibling}var g=odf.Namespaces.chartns,q=odf.Namespaces.dbns,l=odf.Namespaces.dr3dns,r=odf.Namespaces.drawns,t=odf.Namespaces.formns,w=odf.Namespaces.numberns,v=odf.Namespaces.officens,y=odf.Namespaces.presentationns,x=odf.Namespaces.stylens,u=odf.Namespaces.tablens,s=odf.Namespaces.textns,C={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},g={text:[{ens:x,en:"tab-stop",ans:x,a:"leader-text-style"},{ens:x,en:"drop-cap",ans:x,a:"style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-body-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-style-name"},{ens:s,en:"a",ans:s,a:"style-name"},{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"linenumbering-configuration",
ans:s,a:"style-name"},{ens:s,en:"list-level-style-number",ans:s,a:"style-name"},{ens:s,en:"ruby-text",ans:s,a:"style-name"},{ens:s,en:"span",ans:s,a:"style-name"},{ens:s,en:"a",ans:s,a:"visited-style-name"},{ens:x,en:"text-properties",ans:x,a:"text-line-through-text-style"},{ens:s,en:"alphabetical-index-source",ans:s,a:"main-entry-style-name"},{ens:s,en:"index-entry-bibliography",ans:s,a:"style-name"},{ens:s,en:"index-entry-chapter",ans:s,a:"style-name"},{ens:s,en:"index-entry-link-end",ans:s,a:"style-name"},
{ens:s,en:"index-entry-link-start",ans:s,a:"style-name"},{ens:s,en:"index-entry-page-number",ans:s,a:"style-name"},{ens:s,en:"index-entry-span",ans:s,a:"style-name"},{ens:s,en:"index-entry-tab-stop",ans:s,a:"style-name"},{ens:s,en:"index-entry-text",ans:s,a:"style-name"},{ens:s,en:"index-title-template",ans:s,a:"style-name"},{ens:s,en:"list-level-style-bullet",ans:s,a:"style-name"},{ens:s,en:"outline-level-style",ans:s,a:"style-name"}],paragraph:[{ens:r,en:"caption",ans:r,a:"text-style-name"},{ens:r,
en:"circle",ans:r,a:"text-style-name"},{ens:r,en:"connector",ans:r,a:"text-style-name"},{ens:r,en:"control",ans:r,a:"text-style-name"},{ens:r,en:"custom-shape",ans:r,a:"text-style-name"},{ens:r,en:"ellipse",ans:r,a:"text-style-name"},{ens:r,en:"frame",ans:r,a:"text-style-name"},{ens:r,en:"line",ans:r,a:"text-style-name"},{ens:r,en:"measure",ans:r,a:"text-style-name"},{ens:r,en:"path",ans:r,a:"text-style-name"},{ens:r,en:"polygon",ans:r,a:"text-style-name"},{ens:r,en:"polyline",ans:r,a:"text-style-name"},
{ens:r,en:"rect",ans:r,a:"text-style-name"},{ens:r,en:"regular-polygon",ans:r,a:"text-style-name"},{ens:v,en:"annotation",ans:r,a:"text-style-name"},{ens:t,en:"column",ans:t,a:"text-style-name"},{ens:x,en:"style",ans:x,a:"next-style-name"},{ens:u,en:"body",ans:u,a:"paragraph-style-name"},{ens:u,en:"even-columns",ans:u,a:"paragraph-style-name"},{ens:u,en:"even-rows",ans:u,a:"paragraph-style-name"},{ens:u,en:"first-column",ans:u,a:"paragraph-style-name"},{ens:u,en:"first-row",ans:u,a:"paragraph-style-name"},
{ens:u,en:"last-column",ans:u,a:"paragraph-style-name"},{ens:u,en:"last-row",ans:u,a:"paragraph-style-name"},{ens:u,en:"odd-columns",ans:u,a:"paragraph-style-name"},{ens:u,en:"odd-rows",ans:u,a:"paragraph-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"default-style-name"},{ens:s,en:"alphabetical-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"bibliography-entry-template",ans:s,a:"style-name"},{ens:s,en:"h",ans:s,a:"style-name"},{ens:s,en:"illustration-index-entry-template",ans:s,a:"style-name"},
{ens:s,en:"index-source-style",ans:s,a:"style-name"},{ens:s,en:"object-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"p",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-of-content-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"user-index-entry-template",ans:s,a:"style-name"},{ens:x,en:"page-layout-properties",ans:x,a:"register-truth-ref-style-name"}],chart:[{ens:g,en:"axis",ans:g,
a:"style-name"},{ens:g,en:"chart",ans:g,a:"style-name"},{ens:g,en:"data-label",ans:g,a:"style-name"},{ens:g,en:"data-point",ans:g,a:"style-name"},{ens:g,en:"equation",ans:g,a:"style-name"},{ens:g,en:"error-indicator",ans:g,a:"style-name"},{ens:g,en:"floor",ans:g,a:"style-name"},{ens:g,en:"footer",ans:g,a:"style-name"},{ens:g,en:"grid",ans:g,a:"style-name"},{ens:g,en:"legend",ans:g,a:"style-name"},{ens:g,en:"mean-value",ans:g,a:"style-name"},{ens:g,en:"plot-area",ans:g,a:"style-name"},{ens:g,en:"regression-curve",
ans:g,a:"style-name"},{ens:g,en:"series",ans:g,a:"style-name"},{ens:g,en:"stock-gain-marker",ans:g,a:"style-name"},{ens:g,en:"stock-loss-marker",ans:g,a:"style-name"},{ens:g,en:"stock-range-line",ans:g,a:"style-name"},{ens:g,en:"subtitle",ans:g,a:"style-name"},{ens:g,en:"title",ans:g,a:"style-name"},{ens:g,en:"wall",ans:g,a:"style-name"}],section:[{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"bibliography",ans:s,a:"style-name"},{ens:s,en:"illustration-index",ans:s,a:"style-name"},
{ens:s,en:"index-title",ans:s,a:"style-name"},{ens:s,en:"object-index",ans:s,a:"style-name"},{ens:s,en:"section",ans:s,a:"style-name"},{ens:s,en:"table-of-content",ans:s,a:"style-name"},{ens:s,en:"table-index",ans:s,a:"style-name"},{ens:s,en:"user-index",ans:s,a:"style-name"}],ruby:[{ens:s,en:"ruby",ans:s,a:"style-name"}],table:[{ens:q,en:"query",ans:q,a:"style-name"},{ens:q,en:"table-representation",ans:q,a:"style-name"},{ens:u,en:"background",ans:u,a:"style-name"},{ens:u,en:"table",ans:u,a:"style-name"}],
"table-column":[{ens:q,en:"column",ans:q,a:"style-name"},{ens:u,en:"table-column",ans:u,a:"style-name"}],"table-row":[{ens:q,en:"query",ans:q,a:"default-row-style-name"},{ens:q,en:"table-representation",ans:q,a:"default-row-style-name"},{ens:u,en:"table-row",ans:u,a:"style-name"}],"table-cell":[{ens:q,en:"column",ans:q,a:"default-cell-style-name"},{ens:u,en:"table-column",ans:u,a:"default-cell-style-name"},{ens:u,en:"table-row",ans:u,a:"default-cell-style-name"},{ens:u,en:"body",ans:u,a:"style-name"},
{ens:u,en:"covered-table-cell",ans:u,a:"style-name"},{ens:u,en:"even-columns",ans:u,a:"style-name"},{ens:u,en:"covered-table-cell",ans:u,a:"style-name"},{ens:u,en:"even-columns",ans:u,a:"style-name"},{ens:u,en:"even-rows",ans:u,a:"style-name"},{ens:u,en:"first-column",ans:u,a:"style-name"},{ens:u,en:"first-row",ans:u,a:"style-name"},{ens:u,en:"last-column",ans:u,a:"style-name"},{ens:u,en:"last-row",ans:u,a:"style-name"},{ens:u,en:"odd-columns",ans:u,a:"style-name"},{ens:u,en:"odd-rows",ans:u,a:"style-name"},
{ens:u,en:"table-cell",ans:u,a:"style-name"}],graphic:[{ens:l,en:"cube",ans:r,a:"style-name"},{ens:l,en:"extrude",ans:r,a:"style-name"},{ens:l,en:"rotate",ans:r,a:"style-name"},{ens:l,en:"scene",ans:r,a:"style-name"},{ens:l,en:"sphere",ans:r,a:"style-name"},{ens:r,en:"caption",ans:r,a:"style-name"},{ens:r,en:"circle",ans:r,a:"style-name"},{ens:r,en:"connector",ans:r,a:"style-name"},{ens:r,en:"control",ans:r,a:"style-name"},{ens:r,en:"custom-shape",ans:r,a:"style-name"},{ens:r,en:"ellipse",ans:r,a:"style-name"},
{ens:r,en:"frame",ans:r,a:"style-name"},{ens:r,en:"g",ans:r,a:"style-name"},{ens:r,en:"line",ans:r,a:"style-name"},{ens:r,en:"measure",ans:r,a:"style-name"},{ens:r,en:"page-thumbnail",ans:r,a:"style-name"},{ens:r,en:"path",ans:r,a:"style-name"},{ens:r,en:"polygon",ans:r,a:"style-name"},{ens:r,en:"polyline",ans:r,a:"style-name"},{ens:r,en:"rect",ans:r,a:"style-name"},{ens:r,en:"regular-polygon",ans:r,a:"style-name"},{ens:v,en:"annotation",ans:r,a:"style-name"}],presentation:[{ens:l,en:"cube",ans:y,
a:"style-name"},{ens:l,en:"extrude",ans:y,a:"style-name"},{ens:l,en:"rotate",ans:y,a:"style-name"},{ens:l,en:"scene",ans:y,a:"style-name"},{ens:l,en:"sphere",ans:y,a:"style-name"},{ens:r,en:"caption",ans:y,a:"style-name"},{ens:r,en:"circle",ans:y,a:"style-name"},{ens:r,en:"connector",ans:y,a:"style-name"},{ens:r,en:"control",ans:y,a:"style-name"},{ens:r,en:"custom-shape",ans:y,a:"style-name"},{ens:r,en:"ellipse",ans:y,a:"style-name"},{ens:r,en:"frame",ans:y,a:"style-name"},{ens:r,en:"g",ans:y,a:"style-name"},
{ens:r,en:"line",ans:y,a:"style-name"},{ens:r,en:"measure",ans:y,a:"style-name"},{ens:r,en:"page-thumbnail",ans:y,a:"style-name"},{ens:r,en:"path",ans:y,a:"style-name"},{ens:r,en:"polygon",ans:y,a:"style-name"},{ens:r,en:"polyline",ans:y,a:"style-name"},{ens:r,en:"rect",ans:y,a:"style-name"},{ens:r,en:"regular-polygon",ans:y,a:"style-name"},{ens:v,en:"annotation",ans:y,a:"style-name"}],"drawing-page":[{ens:r,en:"page",ans:r,a:"style-name"},{ens:y,en:"notes",ans:r,a:"style-name"},{ens:x,en:"handout-master",
ans:r,a:"style-name"},{ens:x,en:"master-page",ans:r,a:"style-name"}],"list-style":[{ens:s,en:"list",ans:s,a:"style-name"},{ens:s,en:"numbered-paragraph",ans:s,a:"style-name"},{ens:s,en:"list-item",ans:s,a:"style-override"},{ens:x,en:"style",ans:x,a:"list-style-name"}],data:[{ens:x,en:"style",ans:x,a:"data-style-name"},{ens:x,en:"style",ans:x,a:"percentage-data-style-name"},{ens:y,en:"date-time-decl",ans:x,a:"data-style-name"},{ens:s,en:"creation-date",ans:x,a:"data-style-name"},{ens:s,en:"creation-time",
ans:x,a:"data-style-name"},{ens:s,en:"database-display",ans:x,a:"data-style-name"},{ens:s,en:"date",ans:x,a:"data-style-name"},{ens:s,en:"editing-duration",ans:x,a:"data-style-name"},{ens:s,en:"expression",ans:x,a:"data-style-name"},{ens:s,en:"meta-field",ans:x,a:"data-style-name"},{ens:s,en:"modification-date",ans:x,a:"data-style-name"},{ens:s,en:"modification-time",ans:x,a:"data-style-name"},{ens:s,en:"print-date",ans:x,a:"data-style-name"},{ens:s,en:"print-time",ans:x,a:"data-style-name"},{ens:s,
en:"table-formula",ans:x,a:"data-style-name"},{ens:s,en:"time",ans:x,a:"data-style-name"},{ens:s,en:"user-defined",ans:x,a:"data-style-name"},{ens:s,en:"user-field-get",ans:x,a:"data-style-name"},{ens:s,en:"user-field-input",ans:x,a:"data-style-name"},{ens:s,en:"variable-get",ans:x,a:"data-style-name"},{ens:s,en:"variable-input",ans:x,a:"data-style-name"},{ens:s,en:"variable-set",ans:x,a:"data-style-name"}],"page-layout":[{ens:y,en:"notes",ans:x,a:"page-layout-name"},{ens:x,en:"handout-master",ans:x,
a:"page-layout-name"},{ens:x,en:"master-page",ans:x,a:"page-layout-name"}]},B,A=new xmldom.XPath;this.collectUsedFontFaces=d;this.changeFontFaceNames=k;this.UsedStyleList=function(b,d){var c={};this.uses=function(a){var b=a.localName,d=a.getAttributeNS(r,"name")||a.getAttributeNS(x,"name");a="style"===b?a.getAttributeNS(x,"family"):a.namespaceURI===w?"data":b;return(a=c[a])?0<a[d]:!1};n(b,c);d&&a(d,c)};this.hasDerivedStyles=function(a,b,d){var c=b("style"),e=d.getAttributeNS(c,"name");d=d.getAttributeNS(c,
"family");return A.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+e+"'][@style:family='"+d+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,d){var c;if(a){for(c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE){var f=c,g=b,k=f.getAttributeNS(r,"name"),l=void 0;k?l=r:(k=f.getAttributeNS(x,"name"))&&(l=x);l&&f.setAttributeNS(l,C[l]+"name",g+k)}c=c.nextSibling}e(a,b);d&&e(d,b)}};this.removePrefixFromStyleNames=function(a,b,d){var c=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===
Node.ELEMENT_NODE){var e=b,f=c,g=e.getAttributeNS(r,"name"),k=void 0;g?k=r:(g=e.getAttributeNS(x,"name"))&&(k=x);k&&(g=g.replace(f,""),e.setAttributeNS(k,C[k]+"name",g))}b=b.nextSibling}h(a,c);d&&h(d,c)}};this.determineStylesForNode=f;B=function(a){var b,d,c,e,f,g={},k;for(b in a)if(a.hasOwnProperty(b))for(e=a[b],c=e.length,d=0;d<c;d+=1)f=e[d],k=g[f.en]=g[f.en]||{},k=k[f.ens]=k[f.ens]||[],k.push({ns:f.ans,localname:f.a,keyname:b});return g}(g)};
// Input 30
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.Namespaces");
odf.OdfUtils=function(){function e(a){return"image"===(a&&a.localName)&&a.namespaceURI===s}function h(a){return"frame"===(a&&a.localName)&&a.namespaceURI===s&&"as-char"===a.getAttributeNS(u,"anchor-type")}function f(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===u}function n(a){for(;a&&!f(a);)a=a.parentNode;return a}function m(a){return/^[ \t\r\n]+$/.test(a)}function p(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===u||"span"===b&&"annotationHighlight"===
a.className?!0:!1}function c(a){var b=a&&a.localName,d;d=!1;b&&(d=a.namespaceURI,d=d===u?"s"===b||"tab"===b||"line-break"===b:h(a));return d}function b(a){var b=a&&a.localName,d=!1;b&&(a=a.namespaceURI,a===u&&(d="s"===b||"tab"===b));return d}function a(a){for(;null!==a.firstChild&&p(a);)a=a.firstChild;return a}function d(a){for(;null!==a.lastChild&&p(a);)a=a.lastChild;return a}function k(a){for(;!f(a)&&null===a.previousSibling;)a=a.parentNode;return f(a)?null:d(a.previousSibling)}function g(b){for(;!f(b)&&
null===b.nextSibling;)b=b.parentNode;return f(b)?null:a(b.nextSibling)}function q(a){for(var d=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=k(a);else return!m(a.data.substr(a.length-1,1));else c(a)?(d=!1===b(a),a=null):a=k(a);return d}function l(b){var d=!1;for(b=b&&a(b);b;){if(b.nodeType===Node.TEXT_NODE&&0<b.length&&!m(b.data)){d=!0;break}if(c(b)){d=!0;break}b=g(b)}return d}function r(a,b){return m(a.data.substr(b))?!l(g(a)):!1}function t(a,b){var d=a.data,e;if(!m(d[b])||c(a.parentNode))return!1;
0<b?m(d[b-1])||(e=!0):q(k(a))&&(e=!0);return!0===e?r(a,b)?!1:!0:!1}function w(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?{value:parseFloat(a[1]),unit:a[3]}:null}function v(a){return(a=w(a))&&(0>a.value||"%"===a.unit)?null:a}function y(a){return(a=w(a))&&"%"!==a.unit?null:a}function x(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;
case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var u=odf.Namespaces.textns,s=odf.Namespaces.drawns,C=/^\s*$/,B=new core.DomUtils;this.isImage=e;this.isCharacterFrame=h;this.isTextSpan=function(a){return"span"===(a&&a.localName)&&a.namespaceURI===u};this.isParagraph=f;this.getParagraphElement=n;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===
u&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===u};this.isLineBreak=function(a){return"line-break"===(a&&a.localName)&&a.namespaceURI===u};this.isODFWhitespace=m;this.isGroupingElement=p;this.isCharacterElement=c;this.isWhitespaceElement=b;this.firstChild=a;this.lastChild=d;this.previousNode=k;this.nextNode=g;this.scanLeftForNonWhitespace=q;this.lookLeftForCharacter=function(a){var b;b=0;a.nodeType===
Node.TEXT_NODE&&0<a.length?(b=a.data,b=m(b.substr(b.length-1,1))?1===b.length?q(k(a))?2:0:m(b.substr(b.length-2,1))?0:2:1):c(a)&&(b=1);return b};this.lookRightForCharacter=function(a){var b=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?b=!m(a.data.substr(0,1)):c(a)&&(b=!0);return b};this.scanLeftForAnyCharacter=function(a){var b=!1;for(a=a&&d(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!m(a.data)){b=!0;break}if(c(a)){b=!0;break}a=k(a)}return b};this.scanRightForAnyCharacter=l;this.isTrailingWhitespace=
r;this.isSignificantWhitespace=t;this.isDowngradableSpaceElement=function(a){return a.namespaceURI===u&&"s"===a.localName?q(k(a))&&l(g(a)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&C.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=w;this.parseNonNegativeLength=v;this.parseFoFontSize=function(a){var b;b=(b=w(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||y(a)};this.parseFoLineHeight=function(a){return v(a)||y(a)};this.getImpactedParagraphs=
function(a){var b=a.commonAncestorContainer,d=[];for(b.nodeType===Node.ELEMENT_NODE&&(d=B.getElementsByTagNameNS(b,u,"p").concat(B.getElementsByTagNameNS(b,u,"h")));b&&!f(b);)b=b.parentNode;b&&d.push(b);return d.filter(function(b){return B.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var d=a.startContainer.ownerDocument.createRange(),c;c=B.getNodesInRange(a,function(c){d.selectNodeContents(c);if(c.nodeType===Node.TEXT_NODE){if(b&&B.rangesIntersect(a,d)||B.containsRange(a,d))return Boolean(n(c)&&
(!m(c.textContent)||t(c,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(B.rangesIntersect(a,d)&&x(c))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});d.detach();return c};this.getTextElements=function(a,b,d){var e=a.startContainer.ownerDocument.createRange(),f;f=B.getNodesInRange(a,function(f){e.selectNodeContents(f);if(c(f.parentNode))return NodeFilter.FILTER_REJECT;if(f.nodeType===Node.TEXT_NODE){if(b&&B.rangesIntersect(a,e)||B.containsRange(a,e))if(d||Boolean(n(f)&&
(!m(f.textContent)||t(f,0))))return NodeFilter.FILTER_ACCEPT}else if(c(f)){if(b&&B.rangesIntersect(a,e)||B.containsRange(a,e))return NodeFilter.FILTER_ACCEPT}else if(x(f)||p(f))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});e.detach();return f};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),d;d=B.getNodesInRange(a,function(d){b.selectNodeContents(d);if(f(d)){if(B.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(x(d)||p(d))return NodeFilter.FILTER_SKIP;
return NodeFilter.FILTER_REJECT});b.detach();return d};this.getImageElements=function(a){var b=a.startContainer.ownerDocument.createRange(),d;d=B.getNodesInRange(a,function(d){b.selectNodeContents(d);return e(d)&&B.containsRange(a,b)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});b.detach();return d}};
// Input 31
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("odf.OdfUtils");
odf.TextSerializer=function(){function e(n){var m="",p=h.filter?h.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,c=n.nodeType,b;if(p===NodeFilter.FILTER_ACCEPT||p===NodeFilter.FILTER_SKIP)for(b=n.firstChild;b;)m+=e(b),b=b.nextSibling;p===NodeFilter.FILTER_ACCEPT&&(c===Node.ELEMENT_NODE&&f.isParagraph(n)?m+="\n":c===Node.TEXT_NODE&&n.textContent&&(m+=n.textContent));return m}var h=this,f=new odf.OdfUtils;this.filter=null;this.writeToString=function(f){return f?e(f):""}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.Namespaces");
odf.TextStyleApplicator=function(e,h,f){function n(a){function b(a,d){return"object"===typeof a&&"object"===typeof d?Object.keys(a).every(function(c){return b(a[c],d[c])}):a===d}this.isStyleApplied=function(c){c=h.getAppliedStylesForElement(c);return b(a,c)}}function m(d){var c={};this.applyStyleToContainer=function(g){var q;q=g.getAttributeNS(b,"style-name");var l=g.ownerDocument;q=q||"";if(!c.hasOwnProperty(q)){var m=q,p;p=q?h.createDerivedStyleObject(q,"text",d):d;l=l.createElementNS(a,"style:style");
h.updateStyle(l,p);l.setAttributeNS(a,"style:name",e.generateStyleName());l.setAttributeNS(a,"style:family","text");l.setAttributeNS("urn:webodf:names:scope","scope","document-content");f.appendChild(l);c[m]=l}q=c[q].getAttributeNS(a,"name");g.setAttributeNS(b,"text:style-name",q)}}function p(a,e){var f=a.ownerDocument,h=a.parentNode,l,m,p=new core.LoopWatchDog(1E3);m=[];"span"!==h.localName||h.namespaceURI!==b?(l=f.createElementNS(b,"text:span"),h.insertBefore(l,a),h=!1):(a.previousSibling&&!c.rangeContainsNode(e,
h.firstChild)?(l=h.cloneNode(!1),h.parentNode.insertBefore(l,h.nextSibling)):l=h,h=!0);m.push(a);for(f=a.nextSibling;f&&c.rangeContainsNode(e,f);)p.check(),m.push(f),f=f.nextSibling;m.forEach(function(a){a.parentNode!==l&&l.appendChild(a)});if(f&&h)for(m=l.cloneNode(!1),l.parentNode.insertBefore(m,l.nextSibling);f;)p.check(),h=f.nextSibling,m.appendChild(f),f=h;return l}var c=new core.DomUtils,b=odf.Namespaces.textns,a=odf.Namespaces.stylens;this.applyStyle=function(a,b,c){var e={},f,h,t,w;runtime.assert(c&&
c["style:text-properties"],"applyStyle without any text properties");e["style:text-properties"]=c["style:text-properties"];t=new m(e);w=new n(e);a.forEach(function(a){f=w.isStyleApplied(a);!1===f&&(h=p(a,b),t.applyStyleToContainer(h))})}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("xmldom.XPath");runtime.loadClass("core.CSSUnits");
odf.Style2CSS=function(){function e(a){var b={},d,c;if(!a)return b;for(a=a.firstChild;a;){if(c=a.namespaceURI!==r||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===v&&"list-style"===a.localName?"list":a.namespaceURI!==r||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(r,"family"))(d=a.getAttributeNS&&a.getAttributeNS(r,"name"))||(d=""),c=b[c]=b[c]||{},c[d]=a;a=a.nextSibling}return b}function h(a,b){if(!b||!a)return null;if(a[b])return a[b];
var d,c;for(d in a)if(a.hasOwnProperty(d)&&(c=h(a[d].derivedStyles,b)))return c;return null}function f(a,b,d){var c=b[a],e,g;c&&(e=c.getAttributeNS(r,"parent-style-name"),g=null,e&&(g=h(d,e),!g&&b[e]&&(f(e,b,d),g=b[e],b[e]=null)),g?(g.derivedStyles||(g.derivedStyles={}),g.derivedStyles[a]=c):d[a]=c)}function n(a,b){for(var d in a)a.hasOwnProperty(d)&&(f(d,a,b),a[d]=null)}function m(a,b){var d=u[a],c;if(null===d)return null;c=b?"["+d+'|style-name="'+b+'"]':"";"presentation"===d&&(d="draw",c=b?'[presentation|style-name="'+
b+'"]':"");return d+"|"+s[a].join(c+","+d+"|")+c}function p(a,b,d){var c=[],e,f;c.push(m(a,b));for(e in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(e))for(f in b=p(a,e,d.derivedStyles[e]),b)b.hasOwnProperty(f)&&c.push(b[f]);return c}function c(a,b,d){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===d)return b=a;a=a.nextSibling}return null}function b(a,b){var d="",c,e;for(c in b)if(b.hasOwnProperty(c)&&(c=b[c],e=a.getAttributeNS(c[0],c[1]))){e=e.trim();if(T.hasOwnProperty(c[1])){var f=
e.indexOf(" "),g=void 0,k=void 0;-1!==f?(g=e.substring(0,f),k=e.substring(f)):(g=e,k="");(g=$.parseLength(g))&&"pt"===g.unit&&0.75>g.value&&(e="0.75pt"+k)}c[2]&&(d+=c[2]+":"+e+";")}return d}function a(a){return(a=c(a,r,"text-properties"))?$.parseFoFontSize(a.getAttributeNS(l,"font-size")):null}function d(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,d,c){return b+b+d+d+c+c});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],
16)}:null}function k(a,b,d,c){b='text|list[text|style-name="'+b+'"]';var e=d.getAttributeNS(v,"level"),f;d=$.getFirstNonWhitespaceChild(d);d=$.getFirstNonWhitespaceChild(d);var g;d&&(f=d.attributes,g=f["fo:text-indent"]?f["fo:text-indent"].value:void 0,f=f["fo:margin-left"]?f["fo:margin-left"].value:void 0);g||(g="-0.6cm");d="-"===g.charAt(0)?g.substring(1):"-"+g;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;e=b+" > text|list-item > *:not(text|list):first-child";void 0!==f&&
(f=e+"{margin-left:"+f+";}",a.insertRule(f,a.cssRules.length));c=b+" > text|list-item > *:not(text|list):first-child:before{"+c+";";c+="counter-increment:list;";c+="margin-left:"+g+";";c+="width:"+d+";";c+="display:inline-block}";try{a.insertRule(c,a.cssRules.length)}catch(k){throw k;}}function g(e,f,h,m){if("list"===f)for(var s=m.firstChild,n,t;s;){if(s.namespaceURI===v)if(n=s,"list-level-style-number"===s.localName){var u=n;t=u.getAttributeNS(r,"num-format");var Q=u.getAttributeNS(r,"num-suffix"),
J={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},u=u.getAttributeNS(r,"num-prefix")||"",u=J.hasOwnProperty(t)?u+(" counter(list, "+J[t]+")"):t?u+("'"+t+"';"):u+" ''";Q&&(u+=" '"+Q+"'");t="content: "+u+";";k(e,h,n,t)}else"list-level-style-image"===s.localName?(t="content: none;",k(e,h,n,t)):"list-level-style-bullet"===s.localName&&(t="content: '"+n.getAttributeNS(v,"bullet-char")+"';",k(e,h,n,t));s=s.nextSibling}else if("page"===f)if(Q=n=h="",s=m.getElementsByTagNameNS(r,
"page-layout-properties")[0],n=s.parentNode.parentNode.parentNode.masterStyles,Q="",h+=b(s,Z),t=s.getElementsByTagNameNS(r,"background-image"),0<t.length&&(Q=t.item(0).getAttributeNS(y,"href"))&&(h+="background-image: url('odfkit:"+Q+"');",t=t.item(0),h+=b(t,B)),"presentation"===ha){if(n)for(t=n.getElementsByTagNameNS(r,"master-page"),J=0;J<t.length;J+=1)if(t[J].getAttributeNS(r,"page-layout-name")===s.parentNode.getAttributeNS(r,"name")){Q=t[J].getAttributeNS(r,"name");n="draw|page[draw|master-page-name="+
Q+"] {"+h+"}";Q="office|body, draw|page[draw|master-page-name="+Q+"] {"+b(s,ka)+" }";try{e.insertRule(n,e.cssRules.length),e.insertRule(Q,e.cssRules.length)}catch(T){throw T;}}}else{if("text"===ha){n="office|text {"+h+"}";Q="office|body {width: "+s.getAttributeNS(l,"page-width")+";}";try{e.insertRule(n,e.cssRules.length),e.insertRule(Q,e.cssRules.length)}catch(oa){throw oa;}}}else{h=p(f,h,m).join(",");s="";if(n=c(m,r,"text-properties")){var J=n,D;t=D="";Q=1;n=""+b(J,C);u=J.getAttributeNS(r,"text-underline-style");
"solid"===u&&(D+=" underline");u=J.getAttributeNS(r,"text-line-through-style");"solid"===u&&(D+=" line-through");D.length&&(n+="text-decoration:"+D+";");if(D=J.getAttributeNS(r,"font-name")||J.getAttributeNS(l,"font-family"))u=ra[D],n+="font-family: "+(u||D)+";";u=J.parentNode;if(J=a(u)){for(;u;){if(J=a(u)){if("%"!==J.unit){t="font-size: "+J.value*Q+J.unit+";";break}Q*=J.value/100}J=u;D=u="";u=null;"default-style"===J.localName?u=null:(u=J.getAttributeNS(r,"parent-style-name"),D=J.getAttributeNS(r,
"family"),u=W.getODFElementsWithXPath(U,u?"//style:*[@style:name='"+u+"'][@style:family='"+D+"']":"//style:default-style[@style:family='"+D+"']",odf.Namespaces.resolvePrefix)[0])}t||(t="font-size: "+parseFloat(O)*Q+E.getUnits(O)+";");n+=t}s+=n}if(n=c(m,r,"paragraph-properties"))t=n,n=""+b(t,A),Q=t.getElementsByTagNameNS(r,"background-image"),0<Q.length&&(J=Q.item(0).getAttributeNS(y,"href"))&&(n+="background-image: url('odfkit:"+J+"');",Q=Q.item(0),n+=b(Q,B)),(t=t.getAttributeNS(l,"line-height"))&&
"normal"!==t&&(t=$.parseFoLineHeight(t),n="%"!==t.unit?n+("line-height: "+t.value+t.unit+";"):n+("line-height: "+t.value/100+";")),s+=n;if(n=c(m,r,"graphic-properties"))J=n,n=""+b(J,I),t=J.getAttributeNS(q,"opacity"),Q=J.getAttributeNS(q,"fill"),J=J.getAttributeNS(q,"fill-color"),"solid"===Q||"hatch"===Q?J&&"none"!==J?(t=isNaN(parseFloat(t))?1:parseFloat(t)/100,(J=d(J))&&(n+="background-color: rgba("+J.r+","+J.g+","+J.b+","+t+");")):n+="background: none;":"none"===Q&&(n+="background: none;"),s+=n;
if(n=c(m,r,"drawing-page-properties"))t=""+b(n,I),"true"===n.getAttributeNS(x,"background-visible")&&(t+="background: none;"),s+=t;if(n=c(m,r,"table-cell-properties"))n=""+b(n,z),s+=n;if(n=c(m,r,"table-row-properties"))n=""+b(n,G),s+=n;if(n=c(m,r,"table-column-properties"))n=""+b(n,N),s+=n;if(n=c(m,r,"table-properties"))t=n,n=""+b(t,R),t=t.getAttributeNS(w,"border-model"),"collapsing"===t?n+="border-collapse:collapse;":"separating"===t&&(n+="border-collapse:separate;"),s+=n;if(0!==s.length)try{e.insertRule(h+
"{"+s+"}",e.cssRules.length)}catch(fa){throw fa;}}for(var F in m.derivedStyles)m.derivedStyles.hasOwnProperty(F)&&g(e,f,F,m.derivedStyles[F])}var q=odf.Namespaces.drawns,l=odf.Namespaces.fons,r=odf.Namespaces.stylens,t=odf.Namespaces.svgns,w=odf.Namespaces.tablens,v=odf.Namespaces.textns,y=odf.Namespaces.xlinkns,x=odf.Namespaces.presentationns,u={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},C=[[l,"color","color"],[l,"background-color","background-color"],[l,"font-weight","font-weight"],[l,"font-style","font-style"]],B=[[r,"repeat",
"background-repeat"]],A=[[l,"background-color","background-color"],[l,"text-align","text-align"],[l,"text-indent","text-indent"],[l,"padding","padding"],[l,"padding-left","padding-left"],[l,"padding-right","padding-right"],[l,"padding-top","padding-top"],[l,"padding-bottom","padding-bottom"],[l,"border-left","border-left"],[l,"border-right","border-right"],[l,"border-top","border-top"],[l,"border-bottom","border-bottom"],[l,"margin","margin"],[l,"margin-left","margin-left"],[l,"margin-right","margin-right"],
[l,"margin-top","margin-top"],[l,"margin-bottom","margin-bottom"],[l,"border","border"]],I=[[l,"background-color","background-color"],[l,"min-height","min-height"],[q,"stroke","border"],[t,"stroke-color","border-color"],[t,"stroke-width","border-width"],[l,"border","border"],[l,"border-left","border-left"],[l,"border-right","border-right"],[l,"border-top","border-top"],[l,"border-bottom","border-bottom"]],z=[[l,"background-color","background-color"],[l,"border-left","border-left"],[l,"border-right",
"border-right"],[l,"border-top","border-top"],[l,"border-bottom","border-bottom"],[l,"border","border"]],N=[[r,"column-width","width"]],G=[[r,"row-height","height"],[l,"keep-together",null]],R=[[r,"width","width"],[l,"margin-left","margin-left"],[l,"margin-right","margin-right"],[l,"margin-top","margin-top"],[l,"margin-bottom","margin-bottom"]],Z=[[l,"background-color","background-color"],[l,"padding","padding"],[l,"padding-left","padding-left"],[l,"padding-right","padding-right"],[l,"padding-top",
"padding-top"],[l,"padding-bottom","padding-bottom"],[l,"border","border"],[l,"border-left","border-left"],[l,"border-right","border-right"],[l,"border-top","border-top"],[l,"border-bottom","border-bottom"],[l,"margin","margin"],[l,"margin-left","margin-left"],[l,"margin-right","margin-right"],[l,"margin-top","margin-top"],[l,"margin-bottom","margin-bottom"]],ka=[[l,"page-width","width"],[l,"page-height","height"]],T={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},ra={},$=new odf.OdfUtils,ha,U,O,W=new xmldom.XPath,E=new core.CSSUnits;this.style2css=function(a,b,d,c,f){for(var k,h,l,m;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);k=null;c&&(k=c.ownerDocument,U=c.parentNode);f&&(k=f.ownerDocument,U=f.parentNode);if(k)for(m in odf.Namespaces.forEachPrefix(function(a,d){l="@namespace "+a+" url("+d+");";try{b.insertRule(l,b.cssRules.length)}catch(c){}}),ra=d,ha=a,O=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",a=e(c),c=e(f),f={},u)if(u.hasOwnProperty(m))for(h in d=f[m]={},n(a[m],d),n(c[m],d),d)d.hasOwnProperty(h)&&g(b,m,h,d[h])}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function e(a,b,d){for(a=a?a.firstChild:null;a;){if(a.localName===d&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function h(a){var b,c=d.length;for(b=0;b<c;b+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&a.localName===d[b])return b;return-1}function f(a,d){var c=new b.UsedStyleList(a,d),e=new odf.OdfNodeFilter;this.acceptNode=function(a){var b=e.acceptNode(a);b===NodeFilter.FILTER_ACCEPT&&a.parentNode===d&&a.nodeType===Node.ELEMENT_NODE&&
(b=c.uses(a)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return b}}function n(a,b){var d=new f(a,b);this.acceptNode=function(a){var b=d.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName||(b=NodeFilter.FILTER_REJECT);return b}}function m(a,b){if(b){var d=h(b),c,e=a.firstChild;if(-1!==d){for(;e;){c=h(e);if(-1!==c&&c>d)break;e=e.nextSibling}a.insertBefore(b,e)}}}function p(a){this.OdfContainer=
a}function c(a,b,d,c){var e=this;this.size=0;this.type=null;this.name=a;this.container=d;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==c&&(this.mimetype=b,c.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);if(e.onstatereadychange)e.onstatereadychange(e)}))}}var b=new odf.StyleInfo,a=odf.Namespaces.stylens,d="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),
k=(new Date).getTime()+"_webodf_",g=new core.Base64;p.prototype=new function(){};p.prototype.constructor=p;p.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";p.localName="document";c.prototype.load=function(){};c.prototype.getUrl=function(){return this.data?"data:;base64,"+g.toBase64(this.data):null};odf.OdfContainer=function l(d,h){function w(a){for(var b=a.firstChild,d;b;)d=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?w(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),
b=d}function v(a,b){for(var d=a&&a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&d.setAttributeNS("urn:webodf:names:scope","scope",b),d=d.nextSibling}function y(b,d){function c(a,b,d){var e=0,f;for(f=a=a.replace(/\d+$/,"");b.hasOwnProperty(f)||d.hasOwnProperty(f);)e+=1,f=a+e;return f}function e(b){var d={};for(b=b.firstChild;b;)b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===a&&"font-face"===b.localName&&(k=b.getAttributeNS(a,"name"),d[k]=b),b=b.nextSibling;return d}var f,g,k,h,l,m,n={};l=e(b);m=
e(d);for(f=d.firstChild;f;)g=f.nextSibling,f.nodeType===Node.ELEMENT_NODE&&f.namespaceURI===a&&"font-face"===f.localName&&(k=f.getAttributeNS(a,"name"),l.hasOwnProperty(k)?f.isEqualNode(l[k])||(h=c(k,l,m),f.setAttributeNS(a,"style:name",h),b.appendChild(f),l[h]=f,delete m[k],n[k]=h):(b.appendChild(f),l[k]=f,delete m[k])),f=g;return n}function x(a,b){var d=null,c,e,f;if(a)for(d=a.cloneNode(!0),c=d.firstChild;c;)e=c.nextSibling,c.nodeType===Node.ELEMENT_NODE&&(f=c.getAttributeNS("urn:webodf:names:scope",
"scope"))&&f!==b&&d.removeChild(c),c=e;return d}function u(d,c){var e=null,f,g,k,h={};if(d)for(c.forEach(function(a){b.collectUsedFontFaces(h,a)}),e=d.cloneNode(!0),f=e.firstChild;f;)g=f.nextSibling,f.nodeType===Node.ELEMENT_NODE&&(k=f.getAttributeNS(a,"name"),h[k]||e.removeChild(f)),f=g;return e}function s(a){var b=M.rootElement.ownerDocument,d;if(a){w(a.documentElement);try{d=b.importNode(a.documentElement,!0)}catch(c){}}return d}function C(a){M.state=a;if(M.onchange)M.onchange(M);if(M.onstatereadychange)M.onstatereadychange(M)}
function B(a){aa=null;M.rootElement=a;a.fontFaceDecls=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");a.styles=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");a.automaticStyles=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");a.masterStyles=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");a.body=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");a.meta=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta")}function A(a){a=s(a);var d=M.rootElement;a&&"document-styles"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI?(d.fontFaceDecls=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),m(d,d.fontFaceDecls),d.styles=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),m(d,d.styles),d.automaticStyles=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),v(d.automaticStyles,"document-styles"),m(d,d.automaticStyles),
d.masterStyles=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),m(d,d.masterStyles),b.prefixStyleNames(d.automaticStyles,k,d.masterStyles)):C(l.INVALID)}function I(a){a=s(a);var d,c,f;if(a&&"document-content"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI){d=M.rootElement;c=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");d.fontFaceDecls&&c?f=y(d.fontFaceDecls,c):c&&(d.fontFaceDecls=c,m(d,c));c=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"automatic-styles");v(c,"document-content");f&&b.changeFontFaceNames(c,f);if(d.automaticStyles&&c)for(f=c.firstChild;f;)d.automaticStyles.appendChild(f),f=c.firstChild;else c&&(d.automaticStyles=c,m(d,c));d.body=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");m(d,d.body)}else C(l.INVALID)}function z(a){a=s(a);var b;a&&"document-meta"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(b=M.rootElement,b.meta=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta"),m(b,b.meta))}function N(a){a=s(a);var b;a&&"document-settings"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(b=M.rootElement,b.settings=e(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),m(b,b.settings))}function G(a){a=s(a);var b;if(a&&"manifest"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI)for(b=M.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&"file-entry"===
a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI&&(P[a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),a=a.nextSibling}function R(a){var b=a.shift(),d,c;b?(d=b[0],c=b[1],S.loadAsDOM(d,function(b,d){c(d);b||M.state===l.INVALID||R(a)})):C(l.DONE)}function Z(a){var b="";odf.Namespaces.forEachPrefix(function(a,d){b+=" xmlns:"+a+'="'+d+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+
a+" "+b+' office:version="1.2">'}function ka(){var a=new xmldom.LSSerializer,b=Z("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(M.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function T(a,b){var d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:full-path",a);d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
"manifest:media-type",b);return d}function ra(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'),b=e(a,"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest"),d=new xmldom.LSSerializer,c;for(c in P)P.hasOwnProperty(c)&&b.appendChild(T(c,P[c]));d.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+d.writeToString(a,odf.Namespaces.namespaceMap)}
function $(){var a=new xmldom.LSSerializer,b=Z("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(M.rootElement.settings,odf.Namespaces.namespaceMap);return b+"</office:document-settings>"}function ha(){var a=odf.Namespaces.namespaceMap,d=new xmldom.LSSerializer,c,e,g,h=Z("document-styles");e=x(M.rootElement.automaticStyles,"document-styles");g=M.rootElement.masterStyles&&M.rootElement.masterStyles.cloneNode(!0);c=u(M.rootElement.fontFaceDecls,[g,M.rootElement.styles,e]);b.removePrefixFromStyleNames(e,
k,g);d.filter=new f(g,e);h+=d.writeToString(c,a);h+=d.writeToString(M.rootElement.styles,a);h+=d.writeToString(e,a);h+=d.writeToString(g,a);return h+"</office:document-styles>"}function U(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,d,c,e=Z("document-content");c=x(M.rootElement.automaticStyles,"document-content");d=u(M.rootElement.fontFaceDecls,[c]);b.filter=new n(M.rootElement.body,c);e+=b.writeToString(d,a);e+=b.writeToString(c,a);e+=b.writeToString(M.rootElement.body,a);return e+
"</office:document-content>"}function O(a,b){runtime.loadXML(a,function(a,d){if(a)b(a);else{var c=s(d);c&&"document"===c.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===c.namespaceURI?(B(c),C(l.DONE)):C(l.INVALID)}})}function W(){function a(b,d){var e;d||(d=b);e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",d);c[b]=e;c.appendChild(e)}var b=new core.Zip("",null),d=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),c=M.rootElement,
e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","text");b.save("mimetype",d,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");c.body.appendChild(e);C(l.DONE);return b}function E(){var a,b=new Date;a=runtime.byteArrayFromString($(),"utf8");S.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(ka(),"utf8");S.save("meta.xml",a,!0,b);
a=runtime.byteArrayFromString(ha(),"utf8");S.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(U(),"utf8");S.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(ra(),"utf8");S.save("META-INF/manifest.xml",a,!0,b)}function H(a,b){E();S.writeAs(a,function(a){b(a)})}var M=this,S,P={},aa;this.onstatereadychange=h;this.rootElement=this.state=this.onchange=null;this.setRootElement=B;this.getContentElement=function(){var a;aa||(a=M.rootElement.body,aa=a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"text")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","presentation")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet")[0]);return aa};this.getDocumentType=function(){var a=M.getContentElement();return a&&a.localName};this.getPart=function(a){return new c(a,P[a],M,S)};this.getPartData=function(a,b){S.load(a,b)};this.createByteArray=function(a,b){E();S.createByteArray(a,b)};this.saveAs=H;this.save=function(a){H(d,a)};this.getUrl=
function(){return d};this.setBlob=function(a,b,d){d=g.convertBase64ToByteArray(d);S.save(a,d,!1,new Date);P.hasOwnProperty(a)&&runtime.log(a+" has been overwritten.");P[a]=b};this.removeBlob=function(a){var b=S.remove(a);runtime.assert(b,"file is not found: "+a);delete P[a]};this.state=l.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),d;a=new a;for(d in a)a.hasOwnProperty(d)&&(b[d]=a[d]);return b}(p);S=d?new core.Zip(d,function(a,b){S=b;a?O(d,function(b){a&&
(S.error=a+"\n"+b,C(l.INVALID))}):R([["styles.xml",A],["content.xml",I],["meta.xml",z],["settings.xml",N],["META-INF/manifest.xml",G]])}):W()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,null)};return odf.OdfContainer}();
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.Base64");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.OdfContainer");
odf.FontLoader=function(){function e(h,m,p,c,b){var a,d=0,k;for(k in h)if(h.hasOwnProperty(k)){if(d===p){a=k;break}d+=1}a?m.getPartData(h[a].href,function(d,k){if(d)runtime.log(d);else{var l="@font-face { font-family: '"+(h[a].family||a)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+f.convertUTF8ArrayToBase64(k)+') format("truetype"); }';try{c.insertRule(l,c.cssRules.length)}catch(r){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(r)+"\nRule: "+l)}}e(h,m,p+1,c,b)}):
b&&b()}var h=new xmldom.XPath,f=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(f,m){for(var p=f.rootElement.fontFaceDecls;m.cssRules.length;)m.deleteRule(m.cssRules.length-1);if(p){var c={},b,a,d,k;if(p)for(p=h.getODFElementsWithXPath(p,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),b=0;b<p.length;b+=1)a=p[b],d=a.getAttributeNS(odf.Namespaces.stylens,"name"),k=a.getAttributeNS(odf.Namespaces.svgns,"font-family"),a=h.getODFElementsWithXPath(a,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<a.length&&(a=a[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),c[d]={href:a,family:k});e(c,f,0,m)}}};return odf.FontLoader}();
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Utils");
odf.ObjectNameGenerator=function(e,h){function f(a,b){var d={};this.generateName=function(){var c=b(),e=0,f;do f=a+e,e+=1;while(d[f]||c[f]);d[f]=!0;return f}}function n(){var a,b={};[e.rootElement.automaticStyles,e.rootElement.styles].forEach(function(d){for(a=d.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&a.namespaceURI===m&&"style"===a.localName&&(b[a.getAttributeNS(m,"name")]=!0),a=a.nextSibling});return b}var m=odf.Namespaces.stylens,p=odf.Namespaces.drawns,c=odf.Namespaces.xlinkns,b=new core.DomUtils,
a=(new core.Utils).hashString(h),d=null,k=null,g=null,q={},l={};this.generateStyleName=function(){null===d&&(d=new f("auto"+a+"_",function(){return n()}));return d.generateName()};this.generateFrameName=function(){null===k&&(b.getElementsByTagNameNS(e.rootElement.body,p,"frame").forEach(function(a){q[a.getAttributeNS(p,"name")]=!0}),k=new f("fr"+a+"_",function(){return q}));return k.generateName()};this.generateImageName=function(){null===g&&(b.getElementsByTagNameNS(e.rootElement.body,p,"image").forEach(function(a){a=
a.getAttributeNS(c,"href");a=a.substring(9,a.lastIndexOf("."));l[a]=!0}),g=new f("img"+a+"_",function(){return l}));return g.generateName()}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.Utils");runtime.loadClass("odf.ObjectNameGenerator");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.TextStyleApplicator");
odf.Formatting=function(){function e(){for(var a=k.rootElement.fontFaceDecls,b={},d,c,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(d=a.getAttributeNS(l,"name"))&&((c=a.getAttributeNS(q,"font-family"))||a.getElementsByTagNameNS(q,"font-face-uri")[0])&&(b[d]=c),a=a.nextSibling;return b}function h(a){for(var b=k.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===l&&"default-style"===b.localName&&b.getAttributeNS(l,"family")===a)return b;b=b.nextSibling}return null}
function f(a,b,d){var c,e;d=d||[k.rootElement.automaticStyles,k.rootElement.styles];for(c=d.shift();c;){for(c=c.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&(e=c.getAttributeNS(l,"name"),c.namespaceURI===l&&"style"===c.localName&&c.getAttributeNS(l,"family")===b&&e===a||"list-style"===b&&c.namespaceURI===r&&"list-style"===c.localName&&e===a||"data"===b&&c.namespaceURI===t&&e===a))return c;c=c.nextSibling}c=d.shift()}return null}function n(a){for(var b,d={},c=a.firstChild;c;){if(c.nodeType===
Node.ELEMENT_NODE&&c.namespaceURI===l)for(d[c.nodeName]={},b=0;b<c.attributes.length;b+=1)d[c.nodeName][c.attributes[b].name]=c.attributes[b].value;c=c.nextSibling}for(b=0;b<a.attributes.length;b+=1)d[a.attributes[b].name]=a.attributes[b].value;return d}function m(a,b){Object.keys(b).forEach(function(d){var c=d.split(":"),e=c[1],f=odf.Namespaces.resolvePrefix(c[0]),c=b[d];"object"===typeof c&&Object.keys(c).length?(d=a.getElementsByTagNameNS(f,e)[0]||a.ownerDocument.createElementNS(f,d),a.appendChild(d),
m(d,c)):f&&a.setAttributeNS(f,d,c)})}function p(a,b){for(var d=k.rootElement.styles,c,e={},g=a.getAttributeNS(l,"family"),m=a;m;)c=n(m),e=x.mergeObjects(c,e),m=(c=m.getAttributeNS(l,"parent-style-name"))?f(c,g,[d]):null;if(m=h(g))c=n(m),e=x.mergeObjects(c,e);b&&(c=(d=u[g])?x.mergeObjects({},d):null)&&(e=x.mergeObjects(c,e));return e}function c(a,b){for(var d=a.nodeType===Node.TEXT_NODE?a.parentNode:a,c,e=[],f="",k=!1;d;)!k&&v.isGroupingElement(d)&&(k=!0),(c=g.determineStylesForNode(d))&&e.push(c),
d=d.parentNode;k&&(e.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){f+="|"+b+":"+a+"|"})})}),b&&(b[f]=e));return k?e:void 0}function b(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(d){var c=Object.keys(a[d])[0],e,g;(e=f(c,d))?(g=p(e),b=x.mergeObjects(g,b),g=e.getAttributeNS(l,"display-name")):runtime.log("No style element found for '"+c+"' of family '"+d+"'");b.orderedStyles.push({name:c,family:d,displayName:g})})});
return b}function a(a,b){var d=v.parseLength(a),c=b;if(d)switch(d.unit){case "cm":c=d.value;break;case "mm":c=0.1*d.value;break;case "in":c=2.54*d.value;break;case "pt":c=0.035277778*d.value;break;case "pc":case "px":case "em":break;default:runtime.log("Unit identifier: "+d.unit+" is not supported.")}return c}var d=this,k,g=new odf.StyleInfo,q=odf.Namespaces.svgns,l=odf.Namespaces.stylens,r=odf.Namespaces.textns,t=odf.Namespaces.numberns,w=odf.Namespaces.fons,v=new odf.OdfUtils,y=new core.DomUtils,
x=new core.Utils,u={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.setOdfContainer=function(a){k=a};this.getFontMap=e;this.getAvailableParagraphStyles=function(){for(var a=k.rootElement.styles&&k.rootElement.styles.firstChild,b,d,c=[];a;)a.nodeType===Node.ELEMENT_NODE&&"style"===a.localName&&a.namespaceURI===l&&(d=a,b=d.getAttributeNS(l,"family"),"paragraph"===b&&(b=d.getAttributeNS(l,"name"),d=d.getAttributeNS(l,"display-name")||b,b&&d&&c.push({name:b,displayName:d}))),a=
a.nextSibling;return c};this.isStyleUsed=function(a){var b;b=g.hasDerivedStyles(k.rootElement,odf.Namespaces.resolvePrefix,a);a=(new g.UsedStyleList(k.rootElement.styles)).uses(a)||(new g.UsedStyleList(k.rootElement.automaticStyles)).uses(a)||(new g.UsedStyleList(k.rootElement.body)).uses(a);return b||a};this.getDefaultStyleElement=h;this.getStyleElement=f;this.getStyleAttributes=n;this.getInheritedStyleAttributes=p;this.getFirstCommonParentStyleNameOrSelf=function(a){var b=k.rootElement.automaticStyles,
d=k.rootElement.styles,c;for(c=f(a,"paragraph",[b]);c;)a=c.getAttributeNS(l,"parent-style-name"),c=f(a,"paragraph",[b]);return(c=f(a,"paragraph",[d]))?a:null};this.hasParagraphStyle=function(a){return Boolean(f(a,"paragraph"))};this.getAppliedStyles=function(a){var d={},e=[];a.forEach(function(a){c(a,d)});Object.keys(d).forEach(function(a){e.push(b(d[a]))});return e};this.getAppliedStylesForElement=function(a){return(a=c(a))?b(a):void 0};this.applyStyle=function(a,b,c,e){(new odf.TextStyleApplicator(new odf.ObjectNameGenerator(k,
a),d,k.rootElement.automaticStyles)).applyStyle(b,c,e)};this.updateStyle=function(a,b){var d,c;m(a,b);(d=b["style:text-properties"]&&b["style:text-properties"]["style:font-name"])&&!e().hasOwnProperty(d)&&(c=a.ownerDocument.createElementNS(l,"style:font-face"),c.setAttributeNS(l,"style:name",d),c.setAttributeNS(q,"svg:font-family",d),k.rootElement.fontFaceDecls.appendChild(c))};this.createDerivedStyleObject=function(a,b,d){var c=f(a,b);runtime.assert(Boolean(c),"No style element found for '"+a+"' of family '"+
b+"'");a=c.parentNode===k.rootElement.automaticStyles?n(c):{"style:parent-style-name":a};a["style:family"]=b;x.mergeObjects(a,d);return a};this.getDefaultTabStopDistance=function(){var a=h("paragraph");(a=(a=a&&a.getAttributeNS(l,"paragraph-properties"))&&a.getAttributeNS(l,"tab-stop-distance"))||(a="1.25cm");return v.parseNonNegativeLength(a)};this.getContentSize=function(b,d){var c,e,g,h,m,n,p,t,q,r,u,v;a:{c=f(b,d);var x,U,O;runtime.assert("paragraph"===d||"table"===d,"styleFamily has to be either paragraph or table");
if(c){x=c.getAttributeNS(l,"master-page-name")||"Standard";for(c=k.rootElement.masterStyles.lastChild;c&&c.previousSibling&&c.getAttributeNS(l,"name")!==x;)c=c.previousSibling;x=c.getAttributeNS(l,"page-layout-name");U=y.getElementsByTagNameNS(k.rootElement.automaticStyles,l,"page-layout");for(O=0;O<U.length;O+=1)if(c=U[O],c.getAttributeNS(l,"name")===x)break a}c=null}c||(c=k.rootElement.styles.getElementsByTagNameNS(l,"default-page-layout")[0]);c&&(e=c.getElementsByTagNameNS(l,"page-layout-properties")[0]);
e&&(g=e.getAttributeNS(l,"print-orientation")||"portrait","portrait"===g?(g=21.001,h=29.7):(g=29.7,h=21.001),g=a(e.getAttributeNS(w,"page-width"),g),h=a(e.getAttributeNS(w,"page-height"),h),m=a(e.getAttributeNS(w,"margin"),null),null===m?(m=a(e.getAttributeNS(w,"margin-left"),2),n=a(e.getAttributeNS(w,"margin-right"),2),p=a(e.getAttributeNS(w,"margin-top"),2),t=a(e.getAttributeNS(w,"margin-bottom"),2)):m=n=p=t=m,q=a(e.getAttributeNS(w,"padding"),null),null===q?(q=a(e.getAttributeNS(w,"padding-left"),
0),r=a(e.getAttributeNS(w,"padding-right"),0),u=a(e.getAttributeNS(w,"padding-top"),0),v=a(e.getAttributeNS(w,"padding-bottom"),0)):q=r=u=v=q);return{width:g-m-n-q-r,height:h-p-t-u-v}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.Formatting");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.FontLoader");runtime.loadClass("odf.Style2CSS");runtime.loadClass("odf.OdfUtils");runtime.loadClass("gui.AnnotationViewManager");
odf.OdfCanvas=function(){function e(){function a(c){d=!0;runtime.setTimeout(function(){try{c()}catch(e){runtime.log(e)}d=!1;0<b.length&&a(b.pop())},10)}var b=[],d=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(c){if(0===b.length&&!d)return a(c);b.push(c)}}function h(a){function b(){for(;0<d.cssRules.length;)d.deleteRule(0);d.insertRule("#shadowContent draw|page {display:none;}",0);d.insertRule("office|presentation draw|page {display:none;}",1);d.insertRule("#shadowContent draw|page:nth-of-type("+
c+") {display:block;}",2);d.insertRule("office|presentation draw|page:nth-of-type("+c+") {display:block;}",3)}var d=a.sheet,c=1;this.showFirstPage=function(){c=1;b()};this.showNextPage=function(){c+=1;b()};this.showPreviousPage=function(){1<c&&(c-=1,b())};this.showPage=function(a){0<a&&(c=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function f(a,b,d){a.addEventListener?a.addEventListener(b,d,!1):a.attachEvent?a.attachEvent("on"+b,d):a["on"+b]=d}function n(a,b,d){var c=
"on"+b;a.removeEventListener?a.removeEventListener(b,d,!1):a.detachEvent?a.detachEvent(c,d):a[c]===d&&(a[c]=null)}function m(a){function b(a,d){for(;d;){if(d===a)return!0;d=d.parentNode}return!1}function d(){var f=[],g=runtime.getWindow().getSelection(),k,h;for(k=0;k<g.rangeCount;k+=1)h=g.getRangeAt(k),null!==h&&b(a,h.startContainer)&&b(a,h.endContainer)&&f.push(h);if(f.length===c.length){for(g=0;g<f.length&&(k=f[g],h=c[g],k=k===h?!1:null===k||null===h?!0:k.startContainer!==h.startContainer||k.startOffset!==
h.startOffset||k.endContainer!==h.endContainer||k.endOffset!==h.endOffset,!k);g+=1);if(g===f.length)return}c=f;var g=[f.length],l,m=a.ownerDocument;for(k=0;k<f.length;k+=1)h=f[k],l=m.createRange(),l.setStart(h.startContainer,h.startOffset),l.setEnd(h.endContainer,h.endOffset),g[k]=l;c=g;g=e.length;for(f=0;f<g;f+=1)e[f](a,c)}var c=[],e=[];this.addListener=function(a,b){var d,c=e.length;for(d=0;d<c;d+=1)if(e[d]===b)return;e.push(b)};this.destroy=function(b){n(a,"mouseup",d);n(a,"keyup",d);n(a,"keydown",
d);b()};f(a,"mouseup",d);f(a,"keyup",d);f(a,"keydown",d)}function p(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function c(a,b,d){(new odf.Style2CSS).style2css(a.getDocumentType(),d.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function b(a,b,d){var c=null;a=a.rootElement.body.getElementsByTagNameNS(G,d+"-decl");if((d=b.getAttributeNS(G,"use-"+d+"-name"))&&0<a.length)for(b=0;b<a.length;b+=1)if(a[b].getAttributeNS(G,"name")===d){c=a[b].textContent;break}return c}function a(a,
b,d,c){var e=a.ownerDocument;b=a.getElementsByTagNameNS(b,d);for(a=0;a<b.length;a+=1)p(b[a]),c&&b[a].appendChild(e.createTextNode(c))}function d(a,b,d){b.setAttributeNS("urn:webodf:names:helper","styleid",a);var c,e=b.getAttributeNS(I,"anchor-type"),f=b.getAttributeNS(B,"x"),g=b.getAttributeNS(B,"y"),k=b.getAttributeNS(B,"width"),h=b.getAttributeNS(B,"height"),l=b.getAttributeNS(u,"min-height"),m=b.getAttributeNS(u,"min-width");if("as-char"===e)c="display: inline-block;";else if(e||f||g)c="position: absolute;";
else if(k||h||l||m)c="display: block;";f&&(c+="left: "+f+";");g&&(c+="top: "+g+";");k&&(c+="width: "+k+";");h&&(c+="height: "+h+";");l&&(c+="min-height: "+l+";");m&&(c+="min-width: "+m+";");c&&(c="draw|"+b.localName+'[webodfhelper|styleid="'+a+'"] {'+c+"}",d.insertRule(c,d.cssRules.length))}function k(a){for(a=a.firstChild;a;){if(a.namespaceURI===s&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function g(a,b,d,c){function e(b){b&&
(b='draw|image[webodfhelper|styleid="'+a+'"] {'+("background-image: url("+b+");")+"}",c.insertRule(b,c.cssRules.length))}d.setAttributeNS("urn:webodf:names:helper","styleid",a);var f=d.getAttributeNS(z,"href"),g;if(f)try{g=b.getPart(f),g.onchange=function(a){e(a.url)},g.load()}catch(h){runtime.log("slight problem: "+h)}else f=k(d),e(f)}function q(a){function b(d){var c,e;d.hasAttributeNS(z,"href")&&(c=d.getAttributeNS(z,"href"),"#"===c[0]?(c=c.substring(1),e=function(){var b=Z.getODFElementsWithXPath(a,
"//text:bookmark-start[@text:name='"+c+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=Z.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+c+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);return!1}):e=function(){R.open(c)},d.onclick=e)}var d,c,e;c=a.getElementsByTagNameNS(I,"a");for(d=0;d<c.length;d+=1)e=c.item(d),b(e)}function l(a){var b=a.ownerDocument;T.getElementsByTagNameNS(a,I,"line-break").forEach(function(a){a.hasChildNodes()||a.appendChild(b.createElement("br"))})}
function r(a){var b=a.ownerDocument;T.getElementsByTagNameNS(a,I,"s").forEach(function(a){for(var d,c;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));c=parseInt(a.getAttributeNS(I,"c"),10);if(1<c)for(a.removeAttributeNS(I,"c"),d=1;d<c;d+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function t(a){T.getElementsByTagNameNS(a,I,"tab").forEach(function(a){a.textContent="\t"})}function w(a,b){function d(a,f){var k=g.documentElement.namespaceURI;"video/"===f.substr(0,6)?
(c=g.createElementNS(k,"video"),c.setAttribute("controls","controls"),e=g.createElementNS(k,"source"),e.setAttribute("src",a),e.setAttribute("type",f),c.appendChild(e),b.parentNode.appendChild(c)):b.innerHtml="Unrecognised Plugin"}var c,e,f,g=b.ownerDocument,h;if(f=b.getAttributeNS(z,"href"))try{h=a.getPart(f),h.onchange=function(a){d(a.url,a.mimetype)},h.load()}catch(l){runtime.log("slight problem: "+l)}else runtime.log("using MP4 data fallback"),f=k(b),d(f,"video/mp4")}function v(a){var b=a.getElementsByTagName("head")[0],
d;"undefined"!==String(typeof webodf_css)?(d=a.createElementNS(b.namespaceURI,"style"),d.setAttribute("media","screen, print, handheld, projection"),d.appendChild(a.createTextNode(webodf_css))):(d=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),d.setAttribute("href",a),d.setAttribute("rel","stylesheet"));d.setAttribute("type","text/css");b.appendChild(d);return d}function y(a){var b=a.getElementsByTagName("head")[0],d=a.createElementNS(b.namespaceURI,
"style"),c="";d.setAttribute("type","text/css");d.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){c+="@namespace "+a+" url("+b+");\n"});c+="@namespace webodfhelper url(urn:webodf:names:helper);\n";d.appendChild(a.createTextNode(c));b.appendChild(d);return d}var x=odf.Namespaces.drawns,u=odf.Namespaces.fons,s=odf.Namespaces.officens,C=odf.Namespaces.stylens,B=odf.Namespaces.svgns,A=odf.Namespaces.tablens,I=odf.Namespaces.textns,z=odf.Namespaces.xlinkns,
N=odf.Namespaces.xmlns,G=odf.Namespaces.presentationns,R=runtime.getWindow(),Z=new xmldom.XPath,ka=new odf.OdfUtils,T=new core.DomUtils;odf.OdfCanvas=function(k){function n(a,b,d){function c(a,b,d,e){la.addToQueue(function(){g(a,b,d,e)})}var e,f;e=b.getElementsByTagNameNS(x,"image");for(b=0;b<e.length;b+=1)f=e.item(b),c("image"+String(b),a,f,d)}function u(a,b){function d(a,b){la.addToQueue(function(){w(a,b)})}var c,e,f;e=b.getElementsByTagNameNS(x,"plugin");for(c=0;c<e.length;c+=1)f=e.item(c),d(a,
f)}function B(){V.firstChild&&(1<Y?(V.style.MozTransformOrigin="center top",V.style.WebkitTransformOrigin="center top",V.style.OTransformOrigin="center top",V.style.msTransformOrigin="center top"):(V.style.MozTransformOrigin="left top",V.style.WebkitTransformOrigin="left top",V.style.OTransformOrigin="left top",V.style.msTransformOrigin="left top"),V.style.WebkitTransform="scale("+Y+")",V.style.MozTransform="scale("+Y+")",V.style.OTransform="scale("+Y+")",V.style.msTransform="scale("+Y+")",k.style.width=
Math.round(Y*V.offsetWidth)+"px",k.style.height=Math.round(Y*V.offsetHeight)+"px")}function z(a){function b(a){return c===a.getAttributeNS(s,"name")}var d=T.getElementsByTagNameNS(a,s,"annotation");a=T.getElementsByTagNameNS(a,s,"annotation-end");var c,e;for(e=0;e<d.length;e+=1)c=d[e].getAttributeNS(s,"name"),ea.addAnnotation({node:d[e],end:a.filter(b)[0]||null});ea.rerenderAnnotations()}function W(a){J?(Q.parentNode||(V.appendChild(Q),B()),ea&&ea.forgetAnnotations(),ea=new gui.AnnotationViewManager(M,
a.body,Q),z(a.body)):Q.parentNode&&(V.removeChild(Q),ea.forgetAnnotations(),B())}function E(e){function f(){p(k);k.style.display="inline-block";var g=P.rootElement;k.ownerDocument.importNode(g,!0);aa.setOdfContainer(P);var h=P,m=D;(new odf.FontLoader).loadFonts(h,m.sheet);c(P,aa,fa);m=P;h=F.sheet;p(k);V=S.createElementNS(k.namespaceURI,"div");V.style.display="inline-block";V.style.background="white";V.appendChild(g);k.appendChild(V);Q=S.createElementNS(k.namespaceURI,"div");Q.id="annotationsPane";
ia=S.createElementNS(k.namespaceURI,"div");ia.id="shadowContent";ia.style.position="absolute";ia.style.top=0;ia.style.left=0;m.getContentElement().appendChild(ia);var w=g.body,v,y,z;y=[];for(v=w.firstChild;v&&v!==w;)if(v.namespaceURI===x&&(y[y.length]=v),v.firstChild)v=v.firstChild;else{for(;v&&v!==w&&!v.nextSibling;)v=v.parentNode;v&&v.nextSibling&&(v=v.nextSibling)}for(z=0;z<y.length;z+=1)v=y[z],d("frame"+String(z),v,h);y=Z.getODFElementsWithXPath(w,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);
for(v=0;v<y.length;v+=1)w=y[v],w.setAttributeNS&&w.setAttributeNS("urn:webodf:names:helper","containsparagraphanchor",!0);var w=ia,T,E,K;K=0;var H,J;y=m.rootElement.ownerDocument;if((v=g.body.firstElementChild)&&v.namespaceURI===s&&("presentation"===v.localName||"drawing"===v.localName))for(v=v.firstElementChild;v;){z=v.getAttributeNS(x,"master-page-name");if(z){T=m.rootElement.masterStyles.getElementsByTagNameNS(C,"master-page");E=null;K=void 0;for(K=0;K<T.length;K+=1)if(T[K].getAttributeNS(C,"name")===
z){E=T[K];break}z=E}else z=null;if(z){T=v.getAttributeNS("urn:webodf:names:helper","styleid");E=y.createElementNS(x,"draw:page");J=z.firstElementChild;for(H=0;J;)"true"!==J.getAttributeNS(G,"placeholder")&&(K=J.cloneNode(!0),E.appendChild(K),d(T+"_"+H,K,h)),J=J.nextElementSibling,H+=1;J=H=K=void 0;var M=E.getElementsByTagNameNS(x,"frame");for(K=0;K<M.length;K+=1)H=M[K],(J=H.getAttributeNS(G,"class"))&&!/^(date-time|footer|header|page-number')$/.test(J)&&H.parentNode.removeChild(H);w.appendChild(E);
K=String(w.getElementsByTagNameNS(x,"page").length);a(E,I,"page-number",K);a(E,G,"header",b(m,v,"header"));a(E,G,"footer",b(m,v,"footer"));d(T,E,h);E.setAttributeNS(x,"draw:master-page-name",z.getAttributeNS(C,"name"))}v=v.nextElementSibling}v=g.body.getElementsByTagNameNS(A,"table-cell");for(w=0;w<v.length;w+=1)y=v.item(w),y.hasAttributeNS(A,"number-columns-spanned")&&y.setAttribute("colspan",y.getAttributeNS(A,"number-columns-spanned")),y.hasAttributeNS(A,"number-rows-spanned")&&y.setAttribute("rowspan",
y.getAttributeNS(A,"number-rows-spanned"));q(g.body);l(g.body);r(g.body);t(g.body);n(m,g.body,h);u(m,g.body);y=g.body;w={};v={};var O;z=R.document.getElementsByTagNameNS(I,"list-style");for(m=0;m<z.length;m+=1)K=z.item(m),(H=K.getAttributeNS(C,"name"))&&(v[H]=K);y=y.getElementsByTagNameNS(I,"list");for(m=0;m<y.length;m+=1)if(K=y.item(m),z=K.getAttributeNS(N,"id")){T=K.getAttributeNS(I,"continue-list");K.setAttribute("id",z);E="text|list#"+z+" > text|list-item > *:first-child:before {";if(H=K.getAttributeNS(I,
"style-name"))K=v[H],O=ka.getFirstNonWhitespaceChild(K),K=void 0,O&&("list-level-style-number"===O.localName?(K=O.getAttributeNS(C,"num-format"),H=O.getAttributeNS(C,"num-suffix"),J="",J={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},M=void 0,M=O.getAttributeNS(C,"num-prefix")||"",M=J.hasOwnProperty(K)?M+(" counter(list, "+J[K]+")"):K?M+("'"+K+"';"):M+" ''",H&&(M+=" '"+H+"'"),K=J="content: "+M+";"):"list-level-style-image"===O.localName?K="content: none;":"list-level-style-bullet"===
O.localName&&(K="content: '"+O.getAttributeNS(I,"bullet-char")+"';")),O=K;if(T){for(K=w[T];K;)T=K,K=w[T];E+="counter-increment:"+T+";";O?(O=O.replace("list",T),E+=O):E+="content:counter("+T+");"}else T="",O?(O=O.replace("list",z),E+=O):E+="content: counter("+z+");",E+="counter-increment:"+z+";",h.insertRule("text|list#"+z+" {counter-reset:"+z+"}",h.cssRules.length);E+="}";w[z]=T;E&&h.insertRule(E,h.cssRules.length)}V.insertBefore(ia,V.firstChild);B();W(g);if(!e&&(g=[P],ba.hasOwnProperty("statereadychange")))for(h=
ba.statereadychange,O=0;O<h.length;O+=1)h[O].apply(null,g)}P.state===odf.OdfContainer.DONE?f():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function ma(){P.state===odf.OdfContainer.DONE?f():(runtime.log("will be back later..."),runtime.setTimeout(ma,500))},100))}function H(a){la.clearQueue();k.innerHTML=runtime.tr("Loading")+" "+a+"...";k.removeAttribute("style");P=new odf.OdfContainer(a,function(a){P=a;E(!1)})}runtime.assert(null!==k&&void 0!==k,"odf.OdfCanvas constructor needs DOM element");
runtime.assert(null!==k.ownerDocument&&void 0!==k.ownerDocument,"odf.OdfCanvas constructor needs DOM");var M=this,S=k.ownerDocument,P,aa=new odf.Formatting,na=new m(k),da,V,Q,J=!1,ea,oa,D,fa,F,ia,Y=1,ba={},la=new e;this.refreshCSS=function(){c(P,aa,fa);B()};this.refreshSize=function(){B()};this.odfContainer=function(){return P};this.slidevisibilitycss=function(){return da.css};this.setOdfContainer=function(a,b){P=a;E(!0===b)};this.load=this.load=H;this.save=function(a){P.save(a)};this.addListener=
function(a,b){switch(a){case "selectionchange":na.addListener(a,b);break;case "click":f(k,a,b);break;default:var d=ba[a];void 0===d&&(d=ba[a]=[]);b&&-1===d.indexOf(b)&&d.push(b)}};this.getFormatting=function(){return aa};this.getAnnotationManager=function(){return ea};this.refreshAnnotations=function(){W(P.rootElement)};this.rerenderAnnotations=function(){ea&&ea.rerenderAnnotations()};this.getSizer=function(){return V};this.enableAnnotations=function(a){a!==J&&(J=a,P&&W(P.rootElement))};this.addAnnotation=
function(a){ea&&ea.addAnnotation(a)};this.forgetAnnotations=function(){ea&&ea.forgetAnnotations()};this.setZoomLevel=function(a){Y=a;B()};this.getZoomLevel=function(){return Y};this.fitToContainingElement=function(a,b){var d=k.offsetHeight/Y;Y=a/(k.offsetWidth/Y);b/d<Y&&(Y=b/d);B()};this.fitToWidth=function(a){Y=a/(k.offsetWidth/Y);B()};this.fitSmart=function(a,b){var d,c;d=k.offsetWidth/Y;c=k.offsetHeight/Y;d=a/d;void 0!==b&&b/c<d&&(d=b/c);Y=Math.min(1,d);B()};this.fitToHeight=function(a){Y=a/(k.offsetHeight/
Y);B()};this.showFirstPage=function(){da.showFirstPage()};this.showNextPage=function(){da.showNextPage()};this.showPreviousPage=function(){da.showPreviousPage()};this.showPage=function(a){da.showPage(a);B()};this.getElement=function(){return k};this.addCssForFrameWithImage=function(a){var b=a.getAttributeNS(x,"name");d(b,a,F.sheet);g(b+"img",P,a.firstChild,F.sheet)};this.destroy=function(a){var b=S.getElementsByTagName("head")[0];Q&&Q.parentNode&&Q.parentNode.removeChild(Q);V&&k.removeChild(V);b.removeChild(oa);
b.removeChild(D);b.removeChild(fa);b.removeChild(F);na.destroy(function(b){b?a(b):da.destroy(a)})};oa=v(S);da=new h(y(S));D=y(S);fa=y(S);F=y(S)};return odf.OdfCanvas}();
// Input 39
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(e,h,f){return new odf.OdfContainer(e,function(n){if(n.state===odf.OdfContainer.INVALID)return f("Document "+e+" is invalid.");n.state===odf.OdfContainer.DONE?n.saveAs(h,function(e){f(e)}):f("Document was not completely loaded.")})};this.render=function(e,h,f){for(h=h.getElementsByTagName("body")[0];h.firstChild;)h.removeChild(h.firstChild);h=new odf.OdfCanvas(h);h.addListener("statereadychange",function(e){f(e)});h.load(e)}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.Server=function(){};ops.Server.prototype.connect=function(e,h){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(e,h,f,n){};ops.Server.prototype.joinSession=function(e,h,f,n){};ops.Server.prototype.leaveSession=function(e,h,f,n){};ops.Server.prototype.getGenesisUrl=function(e){};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.Operation=function(){};ops.Operation.prototype.init=function(e){};ops.Operation.prototype.execute=function(e){};ops.Operation.prototype.spec=function(){};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpAddCursor=function(){var e,h;this.init=function(f){e=f.memberid;h=f.timestamp};this.execute=function(f){var h=f.getCursor(e);if(h)return!1;h=new ops.OdtCursor(e,f);f.addCursor(h);f.emit(ops.OdtDocument.signalCursorAdded,h);return!0};this.spec=function(){return{optype:"AddCursor",memberid:e,timestamp:h}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");
gui.StyleHelper=function(e){function h(c,b,a){var d=!0,e;for(e=0;e<c.length&&!(d=c[e]["style:text-properties"],d=!d||d[b]!==a);e+=1);return!d}function f(c,b,a){c=m.getParagraphElements(c);for(var d={},f=!1,g,h;0<c.length;){(g=c[0].getAttributeNS(p,"style-name"))?d[g]||(h=e.getStyleElement(g,"paragraph"),d[g]=!0):f?h=void 0:(f=!0,h=e.getDefaultStyleElement("paragraph"));if(h&&(g=e.getInheritedStyleAttributes(h,!0),(g=g["style:paragraph-properties"])&&-1===a.indexOf(g[b])))return!1;c.pop()}return!0}
var n=new core.DomUtils,m=new odf.OdfUtils,p=odf.Namespaces.textns;this.getAppliedStyles=function(c){var b;c.collapsed?(b=c.startContainer,b.hasChildNodes()&&c.startOffset<b.childNodes.length&&(b=b.childNodes[c.startOffset]),c=[b]):c=m.getTextNodes(c,!0);return e.getAppliedStyles(c)};this.applyStyle=function(c,b,a){var d=n.splitBoundaries(b),f=m.getTextNodes(b,!1);e.applyStyle(c,f,{startContainer:b.startContainer,startOffset:b.startOffset,endContainer:b.endContainer,endOffset:b.endOffset},a);d.forEach(n.normalizeTextNodes)};
this.isBold=function(c){return h(c,"fo:font-weight","bold")};this.isItalic=function(c){return h(c,"fo:font-style","italic")};this.hasUnderline=function(c){return h(c,"style:text-underline-style","solid")};this.hasStrikeThrough=function(c){return h(c,"style:text-line-through-style","solid")};this.isAlignedLeft=function(c){return f(c,"fo:text-align",["left","start"])};this.isAlignedCenter=function(c){return f(c,"fo:text-align",["center"])};this.isAlignedRight=function(c){return f(c,"fo:text-align",
["right","end"])};this.isAlignedJustified=function(c){return f(c,"fo:text-align",["justify"])}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("gui.StyleHelper");runtime.loadClass("odf.OdfUtils");
ops.OpApplyDirectStyling=function(){function e(b){var a=0<=m?n+m:n,d=b.getIteratorAtPosition(0<=m?n:n+m),a=m?b.getIteratorAtPosition(a):d;b=b.getDOM().createRange();b.setStart(d.container(),d.unfilteredDomOffset());b.setEnd(a.container(),a.unfilteredDomOffset());return b}var h,f,n,m,p,c=new odf.OdfUtils;this.init=function(b){h=b.memberid;f=b.timestamp;n=parseInt(b.position,10);m=parseInt(b.length,10);p=b.setProperties};this.execute=function(b){var a=e(b),d=c.getImpactedParagraphs(a);(new gui.StyleHelper(b.getFormatting())).applyStyle(h,
a,p);a.detach();b.getOdfCanvas().refreshCSS();b.fixCursorPositions();d.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:h,timeStamp:f})});b.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:h,timestamp:f,position:n,length:m,setProperties:p}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveCursor=function(){var e,h;this.init=function(f){e=f.memberid;h=f.timestamp};this.execute=function(f){return f.removeCursor(e)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:e,timestamp:h}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpMoveCursor=function(){var e,h,f,n,m;this.init=function(p){e=p.memberid;h=p.timestamp;f=p.position;n=p.length||0;m=p.selectionType||ops.OdtCursor.RangeSelection};this.execute=function(h){var c=h.getCursor(e),b=h.getCursorPosition(e),a=h.getPositionFilter(),d=f-b;if(!c)return!1;b=c.getStepCounter();d=b.countSteps(d,a);c.move(d);n&&(a=b.countSteps(n,a),c.move(a,!0));c.setSelectionType(m);h.emit(ops.OdtDocument.signalCursorMoved,c);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:e,
timestamp:h,position:f,length:n,selectionType:m}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpSetBlob=function(){var e,h,f,n,m;this.init=function(p){e=p.memberid;h=p.timestamp;f=p.filename;n=p.mimetype;m=p.content};this.execute=function(e){e.getOdfCanvas().odfContainer().setBlob(f,n,m);return!0};this.spec=function(){return{optype:"SetBlob",memberid:e,timestamp:h,filename:f,mimetype:n,content:m}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveBlob=function(){var e,h,f;this.init=function(n){e=n.memberid;h=n.timestamp;f=n.filename};this.execute=function(e){e.getOdfCanvas().odfContainer().removeBlob(f);return!0};this.spec=function(){return{optype:"RemoveBlob",memberid:e,timestamp:h,filename:f}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpInsertImage=function(){var e,h,f,n,m,p,c,b,a=odf.Namespaces.drawns,d=odf.Namespaces.svgns,k=odf.Namespaces.textns,g=odf.Namespaces.xlinkns;this.init=function(a){e=a.memberid;h=a.timestamp;f=a.position;n=a.filename;m=a.frameWidth;p=a.frameHeight;c=a.frameStyleName;b=a.frameName};this.execute=function(q){var l=q.getOdfCanvas(),r=q.getPositionInTextNode(f,e),t,w;if(!r)return!1;t=r.textNode;w=q.getParagraphElement(t);var r=r.offset!==t.length?t.splitText(r.offset):t.nextSibling,v=q.getDOM(),y=v.createElementNS(a,
"draw:image"),v=v.createElementNS(a,"draw:frame");y.setAttributeNS(g,"xlink:href",n);y.setAttributeNS(g,"xlink:type","simple");y.setAttributeNS(g,"xlink:show","embed");y.setAttributeNS(g,"xlink:actuate","onLoad");v.setAttributeNS(a,"draw:style-name",c);v.setAttributeNS(a,"draw:name",b);v.setAttributeNS(k,"text:anchor-type","as-char");v.setAttributeNS(d,"svg:width",m);v.setAttributeNS(d,"svg:height",p);v.appendChild(y);t.parentNode.insertBefore(v,r);0===t.length&&t.parentNode.removeChild(t);l.addCssForFrameWithImage(v);
l.refreshCSS();q.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:w,memberId:e,timeStamp:h});l.rerenderAnnotations();return!0};this.spec=function(){return{optype:"InsertImage",memberid:e,timestamp:h,filename:n,position:f,frameWidth:m,frameHeight:p,frameStyleName:c,frameName:b}}};
// Input 50
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpInsertTable=function(){function e(a,b){var c;if(1===d.length)c=d[0];else if(3===d.length)switch(a){case 0:c=d[0];break;case n-1:c=d[2];break;default:c=d[1]}else c=d[a];if(1===c.length)return c[0];if(3===c.length)switch(b){case 0:return c[0];case m-1:return c[2];default:return c[1]}return c[b]}var h,f,n,m,p,c,b,a,d;this.init=function(e){h=e.memberid;f=e.timestamp;p=e.position;n=e.initialRows;m=e.initialColumns;c=e.tableName;b=e.tableStyleName;a=e.tableColumnStyleName;d=e.tableCellStyleMatrix};
this.execute=function(d){var g=d.getPositionInTextNode(p),q=d.getRootNode();if(g){var l=d.getDOM(),r=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),w,v,y,x;b&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",b);c&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",c);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:number-columns-repeated",m);a&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",a);r.appendChild(t);for(y=0;y<n;y+=1){t=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(x=0;x<m;x+=1)w=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(v=e(y,x))&&w.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",v),v=l.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"text:p"),w.appendChild(v),t.appendChild(w);r.appendChild(t)}g=d.getParagraphElement(g.textNode);q.insertBefore(r,g.nextSibling);d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalTableAdded,{tableElement:r,memberId:h,timeStamp:f});d.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:h,timestamp:f,position:p,initialRows:n,initialColumns:m,tableName:c,tableStyleName:b,tableColumnStyleName:a,tableCellStyleMatrix:d}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpInsertText=function(){var e,h,f,n;this.init=function(m){e=m.memberid;h=m.timestamp;f=m.position;n=m.text};this.execute=function(m){var p,c,b,a=null,d=m.getDOM(),k,g=0,q,l;m.upgradeWhitespacesAtPosition(f);if(p=m.getPositionInTextNode(f,e)){c=p.textNode;a=c.nextSibling;b=c.parentNode;k=m.getParagraphElement(c);for(l=0;l<n.length;l+=1)if(" "===n[l]&&(0===l||l===n.length-1||" "===n[l-1])||"\t"===n[l])0===g?(p.offset!==c.length&&(a=c.splitText(p.offset)),0<l&&c.appendData(n.substring(0,l))):g<l&&
(g=n.substring(g,l),b.insertBefore(d.createTextNode(g),a)),g=l+1,q=" "===n[l]?"text:s":"text:tab",q=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",q),q.appendChild(d.createTextNode(n[l])),b.insertBefore(q,a);0===g?c.insertData(p.offset,n):g<n.length&&(p=n.substring(g),b.insertBefore(d.createTextNode(p),a));b=c.parentNode;a=c.nextSibling;b.removeChild(c);b.insertBefore(c,a);0===c.length&&c.parentNode.removeChild(c);0<f&&(1<f&&m.downgradeWhitespacesAtPosition(f-2),m.downgradeWhitespacesAtPosition(f-
1));m.downgradeWhitespacesAtPosition(f);m.downgradeWhitespacesAtPosition(f+n.length-1);m.downgradeWhitespacesAtPosition(f+n.length);m.getOdfCanvas().refreshSize();m.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:e,timeStamp:h});m.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:e,timestamp:h,position:f,text:n}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("core.DomUtils");
ops.OpRemoveText=function(){function e(a){function e(a){return d.hasOwnProperty(a.namespaceURI)||"br"===a.localName&&c.isLineBreak(a.parentNode)||a.nodeType===Node.TEXT_NODE&&d.hasOwnProperty(a.parentNode.namespaceURI)}function f(a){if(c.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(d.hasOwnProperty(a.namespaceURI)||!f(a))return!1;a=a.nextSibling}return!0}function h(d){var m;d.nodeType===Node.TEXT_NODE?(m=d.parentNode,m.removeChild(d)):
m=b.removeUnwantedNodes(d,e);return!c.isParagraph(m)&&m!==a&&f(m)?h(m):m}this.isEmpty=f;this.mergeChildrenIntoParent=h}function h(d){var c=d.getPositionFilter(),e,f,h,n,w=p,v=d.getDOM().createRange();d=d.getIteratorAtPosition(m);e=d.container();for(f=d.unfilteredDomOffset();w&&d.nextPosition();)h=d.container(),n=d.unfilteredDomOffset(),c.acceptPosition(d)===a&&(w-=1);v.setStart(e,f);v.setEnd(h,n);b.splitBoundaries(v);return v}var f,n,m,p,c,b,a=core.PositionFilter.FilterResult.FILTER_ACCEPT,d={};this.init=
function(a){runtime.assert(0<=a.length,"OpRemoveText only supports positive lengths");f=a.memberid;n=a.timestamp;m=parseInt(a.position,10);p=parseInt(a.length,10);c=new odf.OdfUtils;b=new core.DomUtils;d[odf.Namespaces.dbns]=!0;d[odf.Namespaces.dcns]=!0;d[odf.Namespaces.dr3dns]=!0;d[odf.Namespaces.drawns]=!0;d[odf.Namespaces.chartns]=!0;d[odf.Namespaces.formns]=!0;d[odf.Namespaces.numberns]=!0;d[odf.Namespaces.officens]=!0;d[odf.Namespaces.presentationns]=!0;d[odf.Namespaces.stylens]=!0;d[odf.Namespaces.svgns]=
!0;d[odf.Namespaces.tablens]=!0;d[odf.Namespaces.textns]=!0};this.execute=function(a){var b,d,l,r,t=a.getCursor(f),w=new e(a.getRootNode());a.upgradeWhitespacesAtPosition(m);a.upgradeWhitespacesAtPosition(m+p);d=h(a);b=a.getParagraphElement(d.startContainer);l=c.getTextElements(d,!1,!0);r=c.getParagraphElements(d);d.detach();l.forEach(function(a){w.mergeChildrenIntoParent(a)});d=r.reduce(function(a,b){var d,c=!1,e=a,f=b,g,h=null;w.isEmpty(a)&&(c=!0,b.parentNode!==a.parentNode&&(g=b.parentNode,a.parentNode.insertBefore(b,
a.nextSibling)),f=a,e=b,h=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;f.hasChildNodes();)d=c?f.lastChild:f.firstChild,f.removeChild(d),"editinfo"!==d.localName&&e.insertBefore(d,h);g&&w.isEmpty(g)&&w.mergeChildrenIntoParent(g);w.mergeChildrenIntoParent(f);return e});a.downgradeWhitespacesAtPosition(m);a.fixCursorPositions();a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:d||b,memberId:f,timeStamp:n});t&&(t.resetSelectionType(),
a.emit(ops.OdtDocument.signalCursorMoved,t));a.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:f,timestamp:n,position:m,length:p}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpSplitParagraph=function(){var e,h,f,n;this.init=function(m){e=m.memberid;h=m.timestamp;f=m.position;n=new odf.OdfUtils};this.execute=function(m){var p,c,b,a,d,k,g;m.upgradeWhitespacesAtPosition(f);p=m.getPositionInTextNode(f,e);if(!p)return!1;c=m.getParagraphElement(p.textNode);if(!c)return!1;b=n.isListItem(c.parentNode)?c.parentNode:c;0===p.offset?(g=p.textNode.previousSibling,k=null):(g=p.textNode,k=p.offset>=p.textNode.length?null:p.textNode.splitText(p.offset));for(a=p.textNode;a!==b;)if(a=
a.parentNode,d=a.cloneNode(!1),g){for(k&&d.appendChild(k);g.nextSibling;)d.appendChild(g.nextSibling);a.parentNode.insertBefore(d,a.nextSibling);g=a;k=d}else a.parentNode.insertBefore(d,a),g=d,k=a;n.isListItem(k)&&(k=k.childNodes[0]);0===p.textNode.length&&p.textNode.parentNode.removeChild(p.textNode);m.fixCursorPositions();m.getOdfCanvas().refreshSize();m.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:c,memberId:e,timeStamp:h});m.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,
memberId:e,timeStamp:h});m.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:e,timestamp:h,position:f}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpSetParagraphStyle=function(){var e,h,f,n;this.init=function(m){e=m.memberid;h=m.timestamp;f=m.position;n=m.styleName};this.execute=function(m){var p;p=m.getIteratorAtPosition(f);return(p=m.getParagraphElement(p.container()))?(""!==n?p.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",n):p.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","style-name"),m.getOdfCanvas().refreshSize(),m.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:p,
timeStamp:h,memberId:e}),m.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:e,timestamp:h,position:f,styleName:n}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("odf.Namespaces");
ops.OpUpdateParagraphStyle=function(){function e(b,a){var d,c,e=a?a.split(","):[];for(d=0;d<e.length;d+=1)c=e[d].split(":"),b.removeAttributeNS(odf.Namespaces.resolvePrefix(c[0]),c[1])}var h,f,n,m,p,c=odf.Namespaces.stylens;this.init=function(b){h=b.memberid;f=b.timestamp;n=b.styleName;m=b.setProperties;p=b.removedProperties};this.execute=function(b){var a=b.getFormatting(),d,f,g;return(d=""!==n?b.getParagraphStyleElement(n):a.getDefaultStyleElement("paragraph"))?(f=d.getElementsByTagNameNS(c,"paragraph-properties")[0],
g=d.getElementsByTagNameNS(c,"text-properties")[0],m&&a.updateStyle(d,m),p&&(p["style:paragraph-properties"]&&(e(f,p["style:paragraph-properties"].attributes),0===f.attributes.length&&d.removeChild(f)),p["style:text-properties"]&&(e(g,p["style:text-properties"].attributes),0===g.attributes.length&&d.removeChild(g)),e(d,p.attributes)),b.getOdfCanvas().refreshCSS(),b.emit(ops.OdtDocument.signalParagraphStyleModified,n),b.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",
memberid:h,timestamp:f,styleName:n,setProperties:m,removedProperties:p}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("odf.Namespaces");
ops.OpAddStyle=function(){var e,h,f,n,m,p,c=odf.Namespaces.stylens;this.init=function(b){e=b.memberid;h=b.timestamp;f=b.styleName;n=b.styleFamily;m="true"===b.isAutomaticStyle||!0===b.isAutomaticStyle;p=b.setProperties};this.execute=function(b){var a=b.getOdfCanvas().odfContainer(),d=b.getFormatting(),e=b.getDOM().createElementNS(c,"style:style");if(!e)return!1;p&&d.updateStyle(e,p);e.setAttributeNS(c,"style:family",n);e.setAttributeNS(c,"style:name",f);m?a.rootElement.automaticStyles.appendChild(e):a.rootElement.styles.appendChild(e);
b.getOdfCanvas().refreshCSS();m||b.emit(ops.OdtDocument.signalCommonStyleCreated,{name:f,family:n});return!0};this.spec=function(){return{optype:"AddStyle",memberid:e,timestamp:h,styleName:f,styleFamily:n,isAutomaticStyle:m,setProperties:p}}};
// Input 57
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpRemoveStyle=function(){var e,h,f,n;this.init=function(m){e=m.memberid;h=m.timestamp;f=m.styleName;n=m.styleFamily};this.execute=function(e){var h=e.getStyleElement(f,n);if(!h)return!1;h.parentNode.removeChild(h);e.getOdfCanvas().refreshCSS();e.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:f,family:n});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:e,timestamp:h,styleName:f,styleFamily:n}}};
// Input 58
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OpAddAnnotation=function(){function e(c,b,a){var d=c.getPositionInTextNode(a,h);d&&(c=d.textNode,a=c.parentNode,d.offset!==c.length&&c.splitText(d.offset),a.insertBefore(b,c.nextSibling),0===c.length&&a.removeChild(c))}var h,f,n,m,p;this.init=function(c){h=c.memberid;f=parseInt(c.timestamp,10);n=parseInt(c.position,10);m=parseInt(c.length,10)||0;p=c.name};this.execute=function(c){var b={},a=c.getPositionFilter(),d=c.getCursor(h),k=c.getCursorPosition(h),k=n-k-1,g=new Date(f),q,l,r,t,w;w=c.getDOM();
q=w.createElementNS(odf.Namespaces.officens,"office:annotation");q.setAttributeNS(odf.Namespaces.officens,"office:name",p);l=w.createElementNS(odf.Namespaces.dcns,"dc:creator");l.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h);r=w.createElementNS(odf.Namespaces.dcns,"dc:date");r.appendChild(w.createTextNode(g.toISOString()));g=w.createElementNS(odf.Namespaces.textns,"text:list");t=w.createElementNS(odf.Namespaces.textns,"text:list-item");w=w.createElementNS(odf.Namespaces.textns,
"text:p");t.appendChild(w);g.appendChild(t);q.appendChild(l);q.appendChild(r);q.appendChild(g);b.node=q;if(!b.node)return!1;if(m){q=c.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");q.setAttributeNS(odf.Namespaces.officens,"office:name",p);b.end=q;if(!b.end)return!1;e(c,b.end,n+m)}e(c,b.node,n);d&&(a=d.getStepCounter().countSteps(k,a),d.move(a),d.resetSelectionType(),c.emit(ops.OdtDocument.signalCursorMoved,d));c.getOdfCanvas().addAnnotation(b);c.fixCursorPositions();return!0};
this.spec=function(){return{optype:"AddAnnotation",memberid:h,timestamp:f,position:n,length:m,name:p}}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("odf.Namespaces");runtime.loadClass("core.DomUtils");
ops.OpRemoveAnnotation=function(){var e,h,f,n,m;this.init=function(p){e=p.memberid;h=p.timestamp;f=parseInt(p.position,10);n=parseInt(p.length,10);m=new core.DomUtils};this.execute=function(e){for(var c=e.getIteratorAtPosition(f).container(),b,a=null,d=null;c.namespaceURI!==odf.Namespaces.officens||"annotation"!==c.localName;)c=c.parentNode;if(null===c)return!1;a=c;(b=a.getAttributeNS(odf.Namespaces.officens,"name"))&&(d=m.getElementsByTagNameNS(e.getRootNode(),odf.Namespaces.officens,"annotation-end").filter(function(a){return b===
a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);e.getOdfCanvas().forgetAnnotations();for(c=m.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor");c.length;)a.parentNode.insertBefore(c.pop(),a);a.parentNode.removeChild(a);d&&d.parentNode.removeChild(d);e.fixCursorPositions();e.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:e,timestamp:h,position:f,length:n}}};
// Input 60
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpSetBlob");runtime.loadClass("ops.OpRemoveBlob");runtime.loadClass("ops.OpInsertImage");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");
runtime.loadClass("ops.OpAddStyle");runtime.loadClass("ops.OpRemoveStyle");runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");
ops.OperationFactory=function(){function e(e){return function(){return new e}}var h;this.register=function(e,n){h[e]=n};this.create=function(e){var n=null,m=h[e.optype];m&&(n=m(e),n.init(e));return n};h={AddCursor:e(ops.OpAddCursor),ApplyDirectStyling:e(ops.OpApplyDirectStyling),SetBlob:e(ops.OpSetBlob),RemoveBlob:e(ops.OpRemoveBlob),InsertImage:e(ops.OpInsertImage),InsertTable:e(ops.OpInsertTable),InsertText:e(ops.OpInsertText),RemoveText:e(ops.OpRemoveText),SplitParagraph:e(ops.OpSplitParagraph),
SetParagraphStyle:e(ops.OpSetParagraphStyle),UpdateParagraphStyle:e(ops.OpUpdateParagraphStyle),AddStyle:e(ops.OpAddStyle),RemoveStyle:e(ops.OpRemoveStyle),MoveCursor:e(ops.OpMoveCursor),RemoveCursor:e(ops.OpRemoveCursor),AddAnnotation:e(ops.OpAddAnnotation),RemoveAnnotation:e(ops.OpRemoveAnnotation)}};
// Input 61
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.Cursor");runtime.loadClass("core.DomUtils");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(e,h){function f(){v.setUnfilteredPosition(e.getNode(),0);return v}function n(a,b){var d,c=null;a&&(d=b?a[a.length-1]:a[0]);d&&(c={top:d.top,left:b?d.right:d.left,bottom:d.bottom});return c}function m(a,b,d,c){var e=a.nodeType;d.setStart(a,b);d.collapse(!c);c=n(d.getClientRects(),!0===c);!c&&0<b&&(d.setStart(a,b-1),d.setEnd(a,b),c=n(d.getClientRects(),!0));c||(e===Node.ELEMENT_NODE&&a.childNodes[b-1]?c=m(a,b-1,d,!0):a.nodeType===Node.TEXT_NODE&&0<b?c=m(a,b-1,d,!0):a.previousSibling?
c=m(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,d,!0):a.parentNode&&a.parentNode!==h?c=m(a.parentNode,0,d,!1):(d.selectNode(h),c=n(d.getClientRects(),!1)));runtime.assert(Boolean(c),"No visible rectangle found");return c}function p(a,b,d){var c=a,g=f(),k,l=h.ownerDocument.createRange(),n=e.getSelectedRange()?e.getSelectedRange().cloneRange():h.ownerDocument.createRange(),p;for(k=m(g.container(),g.unfilteredDomOffset(),
l);0<c&&d();)c-=1;b?(b=g.container(),g=g.unfilteredDomOffset(),-1===n.comparePoint(b,g)?(n.setStart(b,g),p=!1):n.setEnd(b,g)):(n.setStart(g.container(),g.unfilteredDomOffset()),n.collapse(!0));e.setSelectedRange(n,p);g=f();n=m(g.container(),g.unfilteredDomOffset(),l);if(n.top===k.top||void 0===y)y=n.left;runtime.clearTimeout(x);x=runtime.setTimeout(function(){y=void 0},2E3);l.detach();return a-c}function c(a){var b=f();return a.acceptPosition(b)===u&&(b.setUnfilteredPosition(e.getAnchorNode(),0),
a.acceptPosition(b)===u)?!0:!1}function b(a,b,d){for(var c=new core.LoopWatchDog(1E3),e=0,f=0,g=0<=b?1:-1,h=0<=b?a.nextPosition:a.previousPosition;0!==b&&h();)c.check(),f+=g,d.acceptPosition(a)===u&&(b-=g,e+=f,f=0);return e}function a(a,b,d){for(var c=f(),e=new core.LoopWatchDog(1E3),g=0,h=0;0<a&&c.nextPosition();)e.check(),d.acceptPosition(c)===u&&(g+=1,b.acceptPosition(c)===u&&(h+=g,g=0,a-=1));return h}function d(a,b,d){for(var c=f(),e=new core.LoopWatchDog(1E3),g=0,h=0;0<a&&c.previousPosition();)e.check(),
d.acceptPosition(c)===u&&(g+=1,b.acceptPosition(c)===u&&(h+=g,g=0,a-=1));return h}function k(a,d){var c=f();return b(c,a,d)}function g(a,d,c){var e=f(),g=t.getParagraphElement(e.getCurrentNode()),h=0;e.setUnfilteredPosition(a,d);c.acceptPosition(e)!==u&&(h=b(e,-1,c),0===h||g&&g!==t.getParagraphElement(e.getCurrentNode()))&&(e.setUnfilteredPosition(a,d),h=b(e,1,c));return h}function q(a,b){var d=f(),c=0,e=0,g=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var k=b,l=g,n=d,p=n.container(),t=0,q=null,r=void 0,
w=10,v=void 0,x=0,O=void 0,W=void 0,E=void 0,v=void 0,H=h.ownerDocument.createRange(),M=new core.LoopWatchDog(1E3),v=m(p,n.unfilteredDomOffset(),H),O=v.top,W=void 0===y?v.left:y,E=O;!0===(0>l?n.previousPosition():n.nextPosition());)if(M.check(),k.acceptPosition(n)===u&&(t+=1,p=n.container(),v=m(p,n.unfilteredDomOffset(),H),v.top!==O)){if(v.top!==E&&E!==O)break;E=v.top;v=Math.abs(W-v.left);if(null===q||v<w)q=p,r=n.unfilteredDomOffset(),w=v,x=t}null!==q?(n.setUnfilteredPosition(q,r),t=x):t=0;H.detach();
c+=t;if(0===c)break;e+=c;a-=1}return e*g}function l(a,b){var d,c,e,g,k=f(),l=t.getParagraphElement(k.getCurrentNode()),n=0,p=h.ownerDocument.createRange();0>a?(d=k.previousPosition,c=-1):(d=k.nextPosition,c=1);for(e=m(k.container(),k.unfilteredDomOffset(),p);d.call(k);)if(b.acceptPosition(k)===u){if(t.getParagraphElement(k.getCurrentNode())!==l)break;g=m(k.container(),k.unfilteredDomOffset(),p);if(g.bottom!==e.bottom&&(e=g.top>=e.top&&g.bottom<e.bottom||g.top<=e.top&&g.bottom>e.bottom,!e))break;n+=
c;e=g}p.detach();return n}function r(a,b,d){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var c=f(),e=c.container(),g=c.unfilteredDomOffset(),h=0,k=new core.LoopWatchDog(1E3);for(c.setUnfilteredPosition(a,b);d.acceptPosition(c)!==u&&c.previousPosition();)k.check();a=c.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=c.unfilteredDomOffset();for(c.setUnfilteredPosition(e,g);d.acceptPosition(c)!==
u&&c.previousPosition();)k.check();e=w.comparePoints(a,b,c.container(),c.unfilteredDomOffset());if(0>e)for(;c.nextPosition()&&(k.check(),d.acceptPosition(c)===u&&(h+=1),c.container()!==a||c.unfilteredDomOffset()!==b););else if(0<e)for(;c.previousPosition()&&(k.check(),d.acceptPosition(c)!==u||(h-=1,c.container()!==a||c.unfilteredDomOffset()!==b)););return h}var t,w,v,y,x,u=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,b){return p(a,b||!1,v.nextPosition)};this.movePointBackward=
function(a,b){return p(a,b||!1,v.previousPosition)};this.getStepCounter=function(){return{countSteps:k,convertForwardStepsBetweenFilters:a,convertBackwardStepsBetweenFilters:d,countLinesSteps:q,countStepsToLineBoundary:l,countStepsToPosition:r,isPositionWalkable:c,countPositionsToNearestStep:g}};(function(){t=new odf.OdfUtils;w=new core.DomUtils;v=gui.SelectionMover.createPositionIterator(h);var a=h.ownerDocument.createRange();a.setStart(v.container(),v.unfilteredDomOffset());a.collapse(!0);e.setSelectedRange(a)})()};
gui.SelectionMover.createPositionIterator=function(e){var h=new function(){this.acceptNode=function(e){return"urn:webodf:names:cursor"===e.namespaceURI||"urn:webodf:names:editinfo"===e.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(e,5,h,!1)};(function(){return gui.SelectionMover})();
// Input 62
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OperationTransformMatrix=function(){function e(a,b){return{opSpecsA:[a],opSpecsB:[b]}}function h(a,b){var c=[];a&&["style:parent-style-name","style:next-style-name"].forEach(function(e){a[e]===b&&c.push(e)});return c}function f(a,b){a&&["style:parent-style-name","style:next-style-name"].forEach(function(c){a[c]===b&&delete a[c]})}function n(a,b,c,e){var f,h,m,n=e&&e.attributes?e.attributes.split(","):[];a&&(c||0<n.length)&&Object.keys(a).forEach(function(b){f=a[b];(c&&void 0!==c[b]||n&&-1!==n.indexOf(b))&&
"object"!==typeof f&&delete a[b]});if(b&&b.attributes&&(c||0<n.length)){m=b.attributes.split(",");for(e=0;e<m.length;e+=1)if(h=m[e],c&&void 0!==c[h]||n&&-1!==n.indexOf(h))m.splice(e,1),e-=1;0<m.length?b.attributes=m.join(","):delete b.attributes}}function m(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function p(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function c(a,b,c){var e=a.setProperties?a.setProperties[c]:null,f=a.removedProperties?
a.removedProperties[c]:null;n(e,f,b.setProperties?b.setProperties[c]:null,b.removedProperties?b.removedProperties[c]:null);e&&!m(e)&&delete a.setProperties[c];f&&!p(f)&&delete a.removedProperties[c]}var b={AddCursor:{AddCursor:e,AddStyle:e,InsertText:e,MoveCursor:e,RemoveCursor:e,RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateParagraphStyle:e},AddStyle:{AddStyle:e,InsertText:e,MoveCursor:e,RemoveCursor:e,RemoveStyle:function(a,b){var c,e=[a],m=[b];a.styleFamily===b.styleFamily&&
(c=h(a.setProperties,b.styleName),0<c.length&&(c={optype:"UpdateParagraphStyle",memberid:b.memberid,timestamp:b.timestamp,styleName:a.styleName,removedProperties:{attributes:c.join(",")}},m.unshift(c)),f(a.setProperties,b.styleName));return{opSpecsA:e,opSpecsB:m}},RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateParagraphStyle:e},InsertText:{InsertText:function(a,b,c){if(a.position<b.position)b.position+=a.text.length;else if(a.position>b.position)a.position+=b.text.length;else return c?b.position+=
a.text.length:a.position+=b.text.length,null;return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:function(a,b){a.position<b.position?b.position+=a.text.length:a.position<=b.position+b.length&&(b.length+=a.text.length);return{opSpecsA:[a],opSpecsB:[b]}},RemoveCursor:e,RemoveStyle:e,RemoveText:function(a,b){var c;c=b.position+b.length;var e=[a],f=[b];c<=a.position?a.position-=b.length:a.position<=b.position?b.position+=a.text.length:(b.length=a.position-b.position,c={optype:"RemoveText",memberid:b.memberid,
timestamp:b.timestamp,position:a.position+a.text.length,length:c-a.position},f.unshift(c),a.position=b.position);return{opSpecsA:e,opSpecsB:f}},SplitParagraph:function(a,b,c){if(a.position<b.position)b.position+=a.text.length;else if(a.position>b.position)a.position+=1;else return c?b.position+=a.text.length:a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateParagraphStyle:e},MoveCursor:{MoveCursor:e,RemoveCursor:function(a,b){return{opSpecsA:a.memberid===b.memberid?[]:[a],opSpecsB:[b]}},
RemoveStyle:e,RemoveText:function(a,b){var c=a.position+a.length,e=b.position+b.length;e<=a.position?a.position-=b.length:b.position<c&&(a.position<b.position?a.length=e<c?a.length-b.length:b.position-a.position:(a.position=b.position,a.length=e<c?c-e:0));return{opSpecsA:[a],opSpecsB:[b]}},SetParagraphStyle:e,SplitParagraph:function(a,b){b.position<a.position?a.position+=1:b.position<=a.position+a.length&&(a.length+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateParagraphStyle:e},RemoveCursor:{RemoveCursor:function(a,
b){var c=a.memberid===b.memberid;return{opSpecsA:c?[]:[a],opSpecsB:c?[]:[b]}},RemoveStyle:e,RemoveText:e,SetParagraphStyle:e,SplitParagraph:e,UpdateParagraphStyle:e},RemoveStyle:{RemoveStyle:function(a,b){var c=a.styleName===b.styleName&&a.styleFamily===b.styleFamily;return{opSpecsA:c?[]:[a],opSpecsB:c?[]:[b]}},RemoveText:e,SetParagraphStyle:function(a,b){var c,e=[a],f=[b];"paragraph"===a.styleFamily&&a.styleName===b.styleName&&(c={optype:"SetParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,
position:b.position,styleName:""},e.unshift(c),b.styleName="");return{opSpecsA:e,opSpecsB:f}},SplitParagraph:e,UpdateParagraphStyle:function(a,b){var c,e=[a],m=[b];"paragraph"===a.styleFamily&&(c=h(b.setProperties,a.styleName),0<c.length&&(c={optype:"UpdateParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,styleName:b.styleName,removedProperties:{attributes:c.join(",")}},e.unshift(c)),a.styleName===b.styleName?m=[]:f(b.setProperties,a.styleName));return{opSpecsA:e,opSpecsB:m}}},RemoveText:{RemoveText:function(a,
b){var c=a.position+a.length,e=b.position+b.length,f=[a],h=[b];e<=a.position?a.position-=b.length:c<=b.position?b.position-=a.length:b.position<c&&(a.position<b.position?(a.length=e<c?a.length-b.length:b.position-a.position,c<e?(b.position=a.position,b.length=e-c):h=[]):(c<e?b.length-=a.length:b.position<a.position?b.length=a.position-b.position:h=[],e<c?(a.position=b.position,a.length=c-e):f=[]));return{opSpecsA:f,opSpecsB:h}},SplitParagraph:function(a,b){var c=a.position+a.length,e=[a],f=[b];b.position<=
a.position?a.position+=1:b.position<c&&(a.length=b.position-a.position,c={optype:"RemoveText",memberid:a.memberid,timestamp:a.timestamp,position:b.position+1,length:c-b.position},e.unshift(c));a.position+a.length<=b.position?b.position-=a.length:a.position<b.position&&(b.position=a.position);return{opSpecsA:e,opSpecsB:f}},UpdateParagraphStyle:e},SetParagraphStyle:{UpdateParagraphStyle:e},SplitParagraph:{SplitParagraph:function(a,b,c){if(a.position<b.position)b.position+=1;else if(a.position>b.position)a.position+=
1;else if(a.position===b.position)return c?b.position+=1:a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateParagraphStyle:e},UpdateParagraphStyle:{UpdateParagraphStyle:function(a,b,e){var f,h=[a],l=[b];a.styleName===b.styleName&&(f=e?a:b,a=e?b:a,c(a,f,"style:paragraph-properties"),c(a,f,"style:text-properties"),n(a.setProperties||null,a.removedProperties||null,f.setProperties||null,f.removedProperties||null),a.setProperties&&m(a.setProperties)||a.removedProperties&&p(a.removedProperties)||
(e?l=[]:h=[]));return{opSpecsA:h,opSpecsB:l}}}};this.passUnchanged=e;this.extendTransformations=function(a){Object.keys(a).forEach(function(c){var e=a[c],f,h=b.hasOwnProperty(c);runtime.log((h?"Extending":"Adding")+" map for optypeA: "+c);h||(b[c]={});f=b[c];Object.keys(e).forEach(function(a){var b=f.hasOwnProperty(a);runtime.assert(c<=a,"Wrong order:"+c+", "+a);runtime.log("  "+(b?"Overwriting":"Adding")+" entry for optypeB: "+a);f[a]=e[a]})})};this.transformOpspecVsOpspec=function(a,c){var e=a.optype<=
c.optype,f;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(a));runtime.log(runtime.toJson(c));e||(f=a,a=c,c=f);(f=(f=b[a.optype])&&f[c.optype])?(f=f(a,c,!e),e||null===f||(f={opSpecsA:f.opSpecsB,opSpecsB:f.opSpecsA})):f=null;runtime.log("result:");f?(runtime.log(runtime.toJson(f.opSpecsA)),runtime.log(runtime.toJson(f.opSpecsB))):runtime.log("null");return f}};
// Input 63
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 This file is part of WebODF.

 WebODF is free software: you can redistribute it and/or modify it
 under the terms of the GNU Affero General Public License (GNU AGPL)
 as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.

 WebODF is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with WebODF.  If not, see <http://www.gnu.org/licenses/>.
 @licend

 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OperationTransformMatrix");
ops.OperationTransformer=function(){function e(e){var h=[];e.forEach(function(c){h.push(f.create(c))});return h}function h(e,f){for(var c,b,a=[],d=[];0<e.length&&f;){c=e.shift();c=n.transformOpspecVsOpspec(c,f);if(!c)return null;a=a.concat(c.opSpecsA);if(0===c.opSpecsB.length){a=a.concat(e);f=null;break}for(;1<c.opSpecsB.length;){b=h(e,c.opSpecsB.shift());if(!b)return null;d=d.concat(b.opSpecsB);e=b.opSpecsA}f=c.opSpecsB.pop()}f&&d.push(f);return{opSpecsA:a,opSpecsB:d}}var f,n=new ops.OperationTransformMatrix;
this.setOperationFactory=function(e){f=e};this.getOperationTransformMatrix=function(){return n};this.transform=function(f,n){for(var c,b=[];0<n.length;){c=h(f,n.shift());if(!c)return null;f=c.opSpecsA;b=b.concat(c.opSpecsB)}return{opsA:e(f),opsB:e(b)}}};
// Input 64
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(e,h){var f=this,n={},m,p,c;this.removeFromOdtDocument=function(){c.remove()};this.move=function(b,a){var c=0;0<b?c=p.movePointForward(b,a):0>=b&&(c=-p.movePointBackward(-b,a));f.handleUpdate();return c};this.handleUpdate=function(){};this.getStepCounter=function(){return p.getStepCounter()};this.getMemberId=function(){return e};this.getNode=function(){return c.getNode()};this.getAnchorNode=function(){return c.getAnchorNode()};this.getSelectedRange=function(){return c.getSelectedRange()};
this.setSelectedRange=function(b,a){c.setSelectedRange(b,a)};this.hasForwardSelection=function(){return c.hasForwardSelection()};this.getOdtDocument=function(){return h};this.getSelectionType=function(){return m};this.setSelectionType=function(b){n.hasOwnProperty(b)?m=b:runtime.log("Invalid selection type: "+b)};this.resetSelectionType=function(){f.setSelectionType(ops.OdtCursor.RangeSelection)};c=new core.Cursor(h.getDOM(),e);p=new gui.SelectionMover(c,h.getRootNode());n[ops.OdtCursor.RangeSelection]=
!0;n[ops.OdtCursor.RegionSelection]=!0;f.resetSelectionType()};ops.OdtCursor.RangeSelection="Range";ops.OdtCursor.RegionSelection="Region";(function(){return ops.OdtCursor})();
// Input 65
/*

 Copyright (C) 2012 KO GmbH <aditya.bhatt@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.EditInfo=function(e,h){function f(){var e=[],c;for(c in m)m.hasOwnProperty(c)&&e.push({memberid:c,time:m[c].time});e.sort(function(b,a){return b.time-a.time});return e}var n,m={};this.getNode=function(){return n};this.getOdtDocument=function(){return h};this.getEdits=function(){return m};this.getSortedEdits=function(){return f()};this.addEdit=function(e,c){m[e]={time:c}};this.clearEdits=function(){m={}};this.destroy=function(f){e.parentNode&&e.removeChild(n);f()};n=h.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");e.insertBefore(n,e.firstChild)};
// Input 66
runtime.loadClass("gui.SelectionMover");gui.ShadowCursor=function(e){var h=e.getDOM().createRange(),f=!0;this.removeFromOdtDocument=function(){};this.getMemberId=function(){return gui.ShadowCursor.ShadowCursorMemberId};this.getSelectedRange=function(){return h};this.setSelectedRange=function(e,m){h=e;f=!1!==m};this.hasForwardSelection=function(){return f};this.getOdtDocument=function(){return e};this.getSelectionType=function(){return ops.OdtCursor.RangeSelection};h.setStart(e.getRootNode(),0)};
gui.ShadowCursor.ShadowCursorMemberId="";(function(){return gui.ShadowCursor})();
// Input 67
gui.Avatar=function(e,h){var f=this,n,m,p;this.setColor=function(c){m.style.borderColor=c};this.setImageUrl=function(c){f.isVisible()?m.src=c:p=c};this.isVisible=function(){return"block"===n.style.display};this.show=function(){p&&(m.src=p,p=void 0);n.style.display="block"};this.hide=function(){n.style.display="none"};this.markAsFocussed=function(c){n.className=c?"active":""};this.destroy=function(c){e.removeChild(n);c()};(function(){var c=e.ownerDocument,b=c.documentElement.namespaceURI;n=c.createElementNS(b,
"div");m=c.createElementNS(b,"img");m.width=64;m.height=64;n.appendChild(m);n.style.width="64px";n.style.height="70px";n.style.position="absolute";n.style.top="-80px";n.style.left="-34px";n.style.display=h?"block":"none";e.appendChild(n)})()};
// Input 68
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(e,h,f){function n(b){k&&a.parentNode&&(!g||b)&&(b&&void 0!==q&&runtime.clearTimeout(q),g=!0,c.style.opacity=b||"0"===c.style.opacity?"1":"0",q=runtime.setTimeout(function(){g=!1;n(!1)},500))}function m(a,b){var c=a.getBoundingClientRect(),d=0,e=0;c&&b&&(d=Math.max(c.top,b.top),e=Math.min(c.bottom,b.bottom));return e-d}function p(){var a;a=e.getSelectedRange().cloneRange();var b=e.getNode(),f,g=null;b.previousSibling&&(f=b.previousSibling.nodeType===Node.TEXT_NODE?b.previousSibling.textContent.length:
b.previousSibling.childNodes.length,a.setStart(b.previousSibling,0<f?f-1:0),a.setEnd(b.previousSibling,f),(f=a.getBoundingClientRect())&&f.height&&(g=f));b.nextSibling&&(a.setStart(b.nextSibling,0),a.setEnd(b.nextSibling,0<(b.nextSibling.nodeType===Node.TEXT_NODE?b.nextSibling.textContent.length:b.nextSibling.childNodes.length)?1:0),(f=a.getBoundingClientRect())&&f.height&&(!g||m(b,f)>m(b,g))&&(g=f));a=g;b=e.getOdtDocument().getOdfCanvas().getZoomLevel();d&&e.getSelectionType()===ops.OdtCursor.RangeSelection?
c.style.visibility="visible":c.style.visibility="hidden";a?(c.style.top="0",g=c.ownerDocument.createRange(),g.selectNode(c),f=g.getBoundingClientRect(),g.detach(),8>a.height&&(a={top:a.top-(8-a.height)/2,height:8}),c.style.height=l.adaptRangeDifferenceToZoomLevel(a.height,b)+"px",c.style.top=l.adaptRangeDifferenceToZoomLevel(a.top-f.top,b)+"px"):(c.style.height="1em",c.style.top="5%")}var c,b,a,d=!0,k=!1,g=!1,q,l=new core.DomUtils;this.handleUpdate=p;this.refreshCursorBlinking=function(){f||e.getSelectedRange().collapsed?
(k=!0,n(!0)):(k=!1,c.style.opacity="0")};this.setFocus=function(){k=!0;b.markAsFocussed(!0);n(!0)};this.removeFocus=function(){k=!1;b.markAsFocussed(!1);c.style.opacity="1"};this.show=function(){d=!0;p();b.markAsFocussed(!0)};this.hide=function(){d=!1;p();b.markAsFocussed(!1)};this.setAvatarImageUrl=function(a){b.setImageUrl(a)};this.setColor=function(a){c.style.borderColor=a;b.setColor(a)};this.getCursor=function(){return e};this.getFocusElement=function(){return c};this.toggleHandleVisibility=function(){b.isVisible()?
b.hide():b.show()};this.showHandle=function(){b.show()};this.hideHandle=function(){b.hide()};this.ensureVisible=function(){var a,b,d,f,g=e.getOdtDocument().getOdfCanvas().getElement().parentNode,h;d=g.offsetWidth-g.clientWidth+5;f=g.offsetHeight-g.clientHeight+5;h=c.getBoundingClientRect();a=h.left-d;b=h.top-f;d=h.right+d;f=h.bottom+f;h=g.getBoundingClientRect();b<h.top?g.scrollTop-=h.top-b:f>h.bottom&&(g.scrollTop+=f-h.bottom);a<h.left?g.scrollLeft-=h.left-a:d>h.right&&(g.scrollLeft+=d-h.right);
p()};this.destroy=function(d){b.destroy(function(b){b?d(b):(a.removeChild(c),d())})};(function(){var d=e.getOdtDocument().getDOM();c=d.createElementNS(d.documentElement.namespaceURI,"span");c.style.top="5%";a=e.getNode();a.appendChild(c);b=new gui.Avatar(a,h);p()})()};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("odf.Namespaces");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("odf.TextSerializer");
gui.Clipboard=function(){var e,h,f;this.setDataFromRange=function(f,m){var p=!0,c,b=f.clipboardData;c=runtime.getWindow();var a=m.startContainer.ownerDocument;!b&&c&&(b=c.clipboardData);b?(a=a.createElement("span"),a.appendChild(m.cloneContents()),c=b.setData("text/plain",h.writeToString(a)),p=p&&c,c=b.setData("text/html",e.writeToString(a,odf.Namespaces.namespaceMap)),p=p&&c,f.preventDefault()):p=!1;return p};e=new xmldom.LSSerializer;h=new odf.TextSerializer;f=new odf.OdfNodeFilter;e.filter=f;h.filter=
f};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.Utils");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("gui.StyleHelper");
gui.DirectTextStyler=function(e,h){function f(a,b){for(var c=0,d=b[c];d&&a;)a=a[d],c+=1,d=b[c];return b.length===c?a:void 0}function n(a,b){var c=f(a[0],b);return a.every(function(a){return c===f(a,b)})?c:void 0}function m(){var a=u.getCursor(h),a=(a=a&&a.getSelectedRange())&&s.getAppliedStyles(a)||[];a[0]&&B&&(a[0]=x.mergeObjects(a[0],B));return a}function p(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b,c;A=m();I=a(I,A?s.isBold(A):!1,"isBold");z=a(z,A?s.isItalic(A):!1,"isItalic");
N=a(N,A?s.hasUnderline(A):!1,"hasUnderline");G=a(G,A?s.hasStrikeThrough(A):!1,"hasStrikeThrough");b=A&&n(A,["style:text-properties","fo:font-size"]);R=a(R,b&&parseFloat(b),"fontSize");Z=a(Z,A&&n(A,["style:text-properties","style:font-name"]),"fontName");c&&C.emit(gui.DirectTextStyler.textStylingChanged,c)}function c(a){a.getMemberId()===h&&p()}function b(a){a===h&&p()}function a(a){a.getMemberId()===h&&p()}function d(){p()}function k(a){var b=u.getCursor(h);b&&u.getParagraphElement(b.getNode())===
a.paragraphElement&&p()}function g(a,b){var c=u.getCursor(h);if(!c)return!1;c=s.getAppliedStyles(c.getSelectedRange());b(!a(c));return!0}function q(a){var b=u.getCursorSelection(h),c={"style:text-properties":a};0!==b.length?(a=new ops.OpApplyDirectStyling,a.init({memberid:h,position:b.position,length:b.length,setProperties:c}),e.enqueue([a])):(B=x.mergeObjects(B||{},c),p())}function l(a,b){var c={};c[a]=b;q(c)}function r(a){a=a.spec();B&&a.memberid===h&&"SplitParagraph"!==a.optype&&(B=null,p())}function t(a){l("fo:font-weight",
a?"bold":"normal")}function w(a){l("fo:font-style",a?"italic":"normal")}function v(a){l("style:text-underline-style",a?"solid":"none")}function y(a){l("style:text-line-through-style",a?"solid":"none")}var x=new core.Utils,u=e.getOdtDocument(),s=new gui.StyleHelper(u.getFormatting()),C=new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]),B,A=[],I=!1,z=!1,N=!1,G=!1,R,Z;this.formatTextSelection=q;this.createCursorStyleOp=function(a,b){var c=null;B&&(c=new ops.OpApplyDirectStyling,c.init({memberid:h,
position:a,length:b,setProperties:B}),B=null,p());return c};this.setBold=t;this.setItalic=w;this.setHasUnderline=v;this.setHasStrikethrough=y;this.setFontSize=function(a){l("fo:font-size",a+"pt")};this.setFontName=function(a){l("style:font-name",a)};this.getAppliedStyles=function(){return A};this.toggleBold=g.bind(this,s.isBold,t);this.toggleItalic=g.bind(this,s.isItalic,w);this.toggleUnderline=g.bind(this,s.hasUnderline,v);this.toggleStrikethrough=g.bind(this,s.hasStrikeThrough,y);this.isBold=function(){return I};
this.isItalic=function(){return z};this.hasUnderline=function(){return N};this.hasStrikeThrough=function(){return G};this.fontSize=function(){return R};this.fontName=function(){return Z};this.subscribe=function(a,b){C.subscribe(a,b)};this.unsubscribe=function(a,b){C.unsubscribe(a,b)};this.destroy=function(e){u.unsubscribe(ops.OdtDocument.signalCursorAdded,c);u.unsubscribe(ops.OdtDocument.signalCursorRemoved,b);u.unsubscribe(ops.OdtDocument.signalCursorMoved,a);u.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,
d);u.unsubscribe(ops.OdtDocument.signalParagraphChanged,k);u.unsubscribe(ops.OdtDocument.signalOperationExecuted,r);e()};u.subscribe(ops.OdtDocument.signalCursorAdded,c);u.subscribe(ops.OdtDocument.signalCursorRemoved,b);u.subscribe(ops.OdtDocument.signalCursorMoved,a);u.subscribe(ops.OdtDocument.signalParagraphStyleModified,d);u.subscribe(ops.OdtDocument.signalParagraphChanged,k);u.subscribe(ops.OdtDocument.signalOperationExecuted,r);p()};gui.DirectTextStyler.textStylingChanged="textStyling/changed";
(function(){return gui.DirectTextStyler})();
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.Utils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddStyle");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("gui.StyleHelper");
gui.DirectParagraphStyler=function(e,h,f){function n(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b=l.getCursor(h),b=b&&b.getSelectedRange(),c;y=a(y,b?w.isAlignedLeft(b):!1,"isAlignedLeft");x=a(x,b?w.isAlignedCenter(b):!1,"isAlignedCenter");u=a(u,b?w.isAlignedRight(b):!1,"isAlignedRight");s=a(s,b?w.isAlignedJustified(b):!1,"isAlignedJustified");c&&v.emit(gui.DirectParagraphStyler.paragraphStylingChanged,c)}function m(a){a.getMemberId()===h&&n()}function p(a){a===h&&n()}function c(a){a.getMemberId()===
h&&n()}function b(){n()}function a(a){var b=l.getCursor(h);b&&l.getParagraphElement(b.getNode())===a.paragraphElement&&n()}function d(a){var b=l.getCursor(h).getSelectedRange(),c=l.getCursorPosition(h),b=t.getParagraphElements(b),d=l.getFormatting();b.forEach(function(b){var g=c+l.getDistanceFromCursor(h,b,0),k=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=f.generateStyleName();var m,g=g+1;k&&(m=d.createDerivedStyleObject(k,"paragraph",{}));m=a(m||{});k=new ops.OpAddStyle;k.init({memberid:h,
styleName:b,styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:m});m=new ops.OpSetParagraphStyle;m.init({memberid:h,styleName:b,position:g});e.enqueue([k,m])})}function k(a){d(function(b){return r.mergeObjects(b,a)})}function g(a){k({"style:paragraph-properties":{"fo:text-align":a}})}function q(a,b){var c=l.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&t.parseLength(d);return r.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var l=e.getOdtDocument(),r=new core.Utils,t=new odf.OdfUtils,w=new gui.StyleHelper(l.getFormatting()),v=new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]),y,x,u,s;this.isAlignedLeft=function(){return y};this.isAlignedCenter=function(){return x};this.isAlignedRight=function(){return u};this.isAlignedJustified=function(){return s};this.alignParagraphLeft=function(){g("left");return!0};this.alignParagraphCenter=function(){g("center");
return!0};this.alignParagraphRight=function(){g("right");return!0};this.alignParagraphJustified=function(){g("justify");return!0};this.indent=function(){d(q.bind(null,1));return!0};this.outdent=function(){d(q.bind(null,-1));return!0};this.subscribe=function(a,b){v.subscribe(a,b)};this.unsubscribe=function(a,b){v.unsubscribe(a,b)};this.destroy=function(d){l.unsubscribe(ops.OdtDocument.signalCursorAdded,m);l.unsubscribe(ops.OdtDocument.signalCursorRemoved,p);l.unsubscribe(ops.OdtDocument.signalCursorMoved,
c);l.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,b);l.unsubscribe(ops.OdtDocument.signalParagraphChanged,a);d()};l.subscribe(ops.OdtDocument.signalCursorAdded,m);l.subscribe(ops.OdtDocument.signalCursorRemoved,p);l.subscribe(ops.OdtDocument.signalCursorMoved,c);l.subscribe(ops.OdtDocument.signalParagraphStyleModified,b);l.subscribe(ops.OdtDocument.signalParagraphChanged,a);n()};gui.DirectParagraphStyler.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectParagraphStyler})();
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.KeyboardHandler=function(){function e(e,f){f||(f=h.None);return e+":"+f}var h=gui.KeyboardHandler.Modifier,f=null,n={};this.setDefault=function(e){f=e};this.bind=function(f,h,c){f=e(f,h);runtime.assert(!1===n.hasOwnProperty(f),"tried to overwrite the callback handler of key combo: "+f);n[f]=c};this.unbind=function(f,h){var c=e(f,h);delete n[c]};this.reset=function(){f=null;n={}};this.handleEvent=function(m){var p=m.keyCode,c=h.None;m.metaKey&&(c|=h.Meta);m.ctrlKey&&(c|=h.Ctrl);m.altKey&&(c|=h.Alt);
m.shiftKey&&(c|=h.Shift);p=e(p,c);p=n[p];c=!1;p?c=p():null!==f&&(c=f(m));c&&(m.preventDefault?m.preventDefault():m.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,CtrlAlt:6,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
// Input 73
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.ObjectNameGenerator");
gui.ImageManager=function(e,h,f){var n={"image/gif":".gif","image/jpeg":".jpg","image/png":".png"},m=odf.Namespaces.textns,p=e.getOdtDocument(),c=p.getFormatting(),b={};this.insertImage=function(a,d,k,g){var q;runtime.assert(0<k&&0<g,"Both width and height of the image should be greater than 0px.");q=p.getParagraphElement(p.getCursor(h).getNode()).getAttributeNS(m,"style-name");b.hasOwnProperty(q)||(b[q]=c.getContentSize(q,"paragraph"));q=b[q];k*=0.0264583333333334;g*=0.0264583333333334;var l=1,r=
1;k>q.width&&(l=q.width/k);g>q.height&&(r=q.height/g);l=Math.min(l,r);q=k*l;k=g*l;r=p.getOdfCanvas().odfContainer().rootElement.styles;g=a.toLowerCase();var l=n.hasOwnProperty(g)?n[g]:null,t;g=[];runtime.assert(null!==l,"Image type is not supported: "+a);l="Pictures/"+f.generateImageName()+l;t=new ops.OpSetBlob;t.init({memberid:h,filename:l,mimetype:a,content:d});g.push(t);c.getStyleElement("Graphics","graphic",[r])||(a=new ops.OpAddStyle,a.init({memberid:h,styleName:"Graphics",styleFamily:"graphic",
isAutomaticStyle:!1,setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph","svg:x":"0cm","svg:y":"0cm","style:wrap":"dynamic","style:number-wrapped-paragraphs":"no-limit","style:wrap-contour":"false","style:vertical-pos":"top","style:vertical-rel":"paragraph","style:horizontal-pos":"center","style:horizontal-rel":"paragraph"}}}),g.push(a));a=f.generateStyleName();d=new ops.OpAddStyle;d.init({memberid:h,styleName:a,styleFamily:"graphic",isAutomaticStyle:!0,setProperties:{"style:parent-style-name":"Graphics",
"style:graphic-properties":{"style:vertical-pos":"top","style:vertical-rel":"baseline","style:horizontal-pos":"center","style:horizontal-rel":"paragraph","fo:background-color":"transparent","style:background-transparency":"100%","style:shadow":"none","style:mirror":"none","fo:clip":"rect(0cm, 0cm, 0cm, 0cm)","draw:luminance":"0%","draw:contrast":"0%","draw:red":"0%","draw:green":"0%","draw:blue":"0%","draw:gamma":"100%","draw:color-inversion":"false","draw:image-opacity":"100%","draw:color-mode":"standard"}}});
g.push(d);t=new ops.OpInsertImage;t.init({memberid:h,position:p.getCursorPosition(h),filename:l,frameWidth:q+"cm",frameHeight:k+"cm",frameStyleName:a,frameName:f.generateFrameName()});g.push(t);e.enqueue(g)}};
// Input 74
runtime.loadClass("odf.Namespaces");
gui.ImageSelector=function(e){function h(){var c=e.getSizer(),b,a;b=m.createElement("div");b.id="imageSelector";b.style.borderWidth="1px";c.appendChild(b);n.forEach(function(c){a=m.createElement("div");a.className=c;b.appendChild(a)});return b}var f=odf.Namespaces.svgns,n="topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(" "),m=e.getElement().ownerDocument,p=!1;this.select=function(c){var b,a,d=m.getElementById("imageSelector");d||(d=h());p=!0;b=d.parentNode;
a=c.getBoundingClientRect();var k=b.getBoundingClientRect(),g=e.getZoomLevel();b=(a.left-k.left)/g-1;a=(a.top-k.top)/g-1;d.style.display="block";d.style.left=b+"px";d.style.top=a+"px";d.style.width=c.getAttributeNS(f,"width");d.style.height=c.getAttributeNS(f,"height")};this.clearSelection=function(){var c;p&&(c=m.getElementById("imageSelector"))&&(c.style.display="none");p=!1};this.isSelectorElement=function(c){var b=m.getElementById("imageSelector");return b?c===b||c.parentNode===b:!1}};
// Input 75
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.TextManipulator=function(e,h,f){function n(c){var b=new ops.OpRemoveText;b.init({memberid:h,position:c.position,length:c.length});return b}function m(c){0>c.length&&(c.position+=c.length,c.length=-c.length);return c}var p=e.getOdtDocument();this.enqueueParagraphSplittingOps=function(){var c=m(p.getCursorSelection(h)),b,a=[];0<c.length&&(b=n(c),a.push(b));b=new ops.OpSplitParagraph;b.init({memberid:h,position:c.position});a.push(b);e.enqueue(a);return!0};this.removeTextByBackspaceKey=function(){var c=
m(p.getCursorSelection(h)),b=null;0===c.length?0<c.position&&p.getPositionInTextNode(c.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:h,position:c.position-1,length:1}),e.enqueue([b])):(b=n(c),e.enqueue([b]));return null!==b};this.removeTextByDeleteKey=function(){var c=m(p.getCursorSelection(h)),b=null;0===c.length?p.getPositionInTextNode(c.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:h,position:c.position,length:1}),e.enqueue([b])):(b=n(c),e.enqueue([b]));return null!==b};this.removeCurrentSelection=
function(){var c=m(p.getCursorSelection(h));0!==c.length&&(c=n(c),e.enqueue([c]));return!0};this.insertText=function(c){var b=m(p.getCursorSelection(h)),a,d=[];0<b.length&&(a=n(b),d.push(a));a=new ops.OpInsertText;a.init({memberid:h,position:b.position,text:c});d.push(a);f&&(c=f(b.position,c.length))&&d.push(c);e.enqueue(d)}};(function(){return gui.TextManipulator})();
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.PositionFilter");runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.SelectionMover");
gui.AnnotationManager=function(e,h){function f(){var b=c.getCursor(h),b=b&&b.getNode(),e;if(e=b){a:{for(e=c.getRootNode();b&&b!==e;){if(b.namespaceURI===k&&"annotation"===b.localName){b=!0;break a}b=b.parentNode}b=!1}e=!b}b=e;b!==a&&(a=b,d.emit(gui.AnnotationManager.annotatableChanged,a))}function n(a){a.getMemberId()===h&&f()}function m(a){a===h&&f()}function p(a){a.getMemberId()===h&&f()}var c=e.getOdtDocument(),b=c.getPositionFilter(),a=!1,d=new core.EventNotifier([gui.AnnotationManager.annotatableChanged]),
k=odf.Namespaces.officens,g=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.isAnnotatable=function(){return a};this.addAnnotation=function(){var b=new ops.OpAddAnnotation,d=c.getCursorSelection(h),f=d.length,d=d.position;a&&(d=0<=f?d:d+f,f=Math.abs(f),b.init({memberid:h,position:d,length:f,name:h+Date.now()}),e.enqueue([b]))};this.removeAnnotation=function(a){var d,f;d=0;f=gui.SelectionMover.createPositionIterator(c.getRootNode());for(var k=new core.LoopWatchDog(1E3),m=!1;f.nextPosition();)if(k.check(),
m=Boolean(a.compareDocumentPosition(f.container())&Node.DOCUMENT_POSITION_CONTAINED_BY),b.acceptPosition(f)===g){if(m)break;d+=1}f=0;k=gui.SelectionMover.createPositionIterator(c.getRootNode());m=!1;k.setUnfilteredPosition(a,0);do{m=Boolean(a.compareDocumentPosition(k.container())&Node.DOCUMENT_POSITION_CONTAINED_BY);if(!m&&a!==k.container())break;b.acceptPosition(k)===g&&(f+=1)}while(k.nextPosition());a=new ops.OpRemoveAnnotation;a.init({memberid:h,position:d,length:f});f=new ops.OpMoveCursor;f.init({memberid:h,
position:d-1,length:0});e.enqueue([a,f])};this.subscribe=function(a,b){d.subscribe(a,b)};this.unsubscribe=function(a,b){d.unsubscribe(a,b)};this.destroy=function(a){c.unsubscribe(ops.OdtDocument.signalCursorAdded,n);c.unsubscribe(ops.OdtDocument.signalCursorRemoved,m);c.unsubscribe(ops.OdtDocument.signalCursorMoved,p);a()};c.subscribe(ops.OdtDocument.signalCursorAdded,n);c.subscribe(ops.OdtDocument.signalCursorRemoved,m);c.subscribe(ops.OdtDocument.signalCursorMoved,p);f()};
gui.AnnotationManager.annotatableChanged="annotatable/changed";(function(){return gui.AnnotationManager})();
// Input 77
gui.EventManager=function(e){function h(a){var b=a.scrollX,c=a.scrollY;this.restore=function(){a.scrollX===b&&a.scrollY===c||a.scrollTo(b,c)}}function f(a){var b=a.scrollTop,c=a.scrollLeft;this.restore=function(){if(a.scrollTop!==b||a.scrollLeft!==c)a.scrollTop=b,a.scrollLeft=c}}function n(){return e.getDOM().activeElement===m}var m=e.getOdfCanvas().getElement(),p=runtime.getWindow(),c={beforecut:!0,beforepaste:!0},b={mousedown:!0,mouseup:!0};this.subscribe=function(a,d){var e=m;b[a]&&p&&(e=p);var f=
"on"+a,h=!1;e.attachEvent&&(h=e.attachEvent(f,d));!h&&e.addEventListener&&(e.addEventListener(a,d,!1),h=!0);h&&!c[a]||!e.hasOwnProperty(f)||(e[f]=d)};this.unsubscribe=function(a,c){var e=m;b[a]&&p&&(e=p);var f="on"+a;e.detachEvent&&e.detachEvent(f,c);e.removeEventListener&&e.removeEventListener(a,c,!1);e[f]===c&&(e[f]=null)};this.hasFocus=n;this.focus=function(){var a;if(!n()){for(a=m;a&&!a.scrollTop&&!a.scrollLeft;)a=a.parentNode;a=a?new f(a):p?new h(p):null;m.focus();a&&a.restore()}}};
// Input 78
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Async");runtime.loadClass("core.ScheduledTask");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.ObjectNameGenerator");runtime.loadClass("ops.OdtCursor");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.DirectTextStyler");runtime.loadClass("gui.DirectParagraphStyler");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.ImageManager");
runtime.loadClass("gui.ImageSelector");runtime.loadClass("gui.TextManipulator");runtime.loadClass("gui.AnnotationManager");runtime.loadClass("gui.EventManager");
gui.SessionController=function(){var e=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(h,f,n,m){function p(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function c(a,b,c){var d=new ops.OpMoveCursor;d.init({memberid:f,position:a,length:b||0,selectionType:c});return d}function b(a){var b=F.getOdfCanvas().getElement(),c=F.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),
c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function a(a){a=F.getDistanceFromCursor(f,a,0);var b=null!==a?a+1:null,d;if(b||a)d=F.getCursorPosition(f),a=c(d+a,b-a,ops.OdtCursor.RegionSelection),h.enqueue([a]);X.focus()}function d(a,d){var e,g,k,l;g=F.getOdfCanvas().getElement();e=d.detail;if(a){if(!a.anchorNode&&!a.focusNode){k=d.clientX;l=d.clientY;var m=F.getDOM();m.caretRangeFromPoint?(k=m.caretRangeFromPoint(k,l),k={container:k.startContainer,offset:k.startOffset}):m.caretPositionFromPoint?
(k=m.caretPositionFromPoint(k,l),k={container:k.offsetNode,offset:k.offset}):k=null;if(!k)return;a.anchorNode=k.container;a.anchorOffset=k.offset;a.focusNode=a.anchorNode;a.focusOffset=a.anchorOffset}runtime.assert(null!==a.anchorNode&&null!==a.focusNode,"anchorNode or focusNode is null");k=Y.containsNode(g,a.anchorNode);g=Y.containsNode(g,a.focusNode);if(k||g){k||(k=b(a.anchorNode),a.anchorNode=k.node,a.anchorOffset=k.offset);g||(k=b(a.focusNode),a.focusNode=k.node,a.focusOffset=k.offset);if(2===
e){var m=/[A-Za-z0-9]/,n=gui.SelectionMover.createPositionIterator(F.getRootNode()),p=0<Y.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset),t;p?(k=a.anchorNode,l=a.anchorOffset,e=a.focusNode,g=a.focusOffset):(k=a.focusNode,l=a.focusOffset,e=a.anchorNode,g=a.anchorOffset);for(n.setUnfilteredPosition(k,l);n.previousPosition();){t=n.getCurrentNode();if(t.nodeType===Node.TEXT_NODE){if(t=t.data[n.unfilteredDomOffset()],!m.test(t))break}else if(!ba.isTextSpan(t))break;k=n.container();
l=n.unfilteredDomOffset()}n.setUnfilteredPosition(e,g);do if(t=n.getCurrentNode(),t.nodeType===Node.TEXT_NODE){if(t=t.data[n.unfilteredDomOffset()],!m.test(t))break}else if(!ba.isTextSpan(t))break;while(n.nextPosition());e=n.container();g=n.unfilteredDomOffset();p?(a.anchorNode=k,a.anchorOffset=l,a.focusNode=e,a.focusOffset=g):(a.focusNode=k,a.focusOffset=l,a.anchorNode=e,a.anchorOffset=g)}else 3===e&&(e=F.getParagraphElement(a.anchorNode),g=F.getParagraphElement(a.focusNode),e&&(a.anchorNode=e,a.anchorOffset=
0),g&&(a.focusNode=g,a.focusOffset=g.childNodes.length));e=F.getDistanceFromCursor(f,a.anchorNode,a.anchorOffset);if((g=a.focusNode===a.anchorNode&&a.focusOffset===a.anchorOffset?e:F.getDistanceFromCursor(f,a.focusNode,a.focusOffset))||e)k=F.getCursorPosition(f),e=c(k+e,g-e,ops.OdtCursor.RangeSelection),h.enqueue([e]);X.focus()}}}function k(a){var b=F.getCursorSelection(f),d=F.getCursor(f).getStepCounter();0!==a&&(a=0<a?d.convertForwardStepsBetweenFilters(a,pa,ma):-d.convertBackwardStepsBetweenFilters(-a,
pa,ma),a=b.length+a,h.enqueue([c(b.position,a)]))}function g(a){var b=F.getCursorPosition(f),d=F.getCursor(f).getStepCounter();0!==a&&(a=0<a?d.convertForwardStepsBetweenFilters(a,pa,ma):-d.convertBackwardStepsBetweenFilters(-a,pa,ma),h.enqueue([c(b+a,0)]))}function q(){g(-1);return!0}function l(){g(1);return!0}function r(){k(-1);return!0}function t(){k(1);return!0}function w(a,b){var c=F.getParagraphElement(F.getCursor(f).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");
c=F.getCursor(f).getStepCounter().countLinesSteps(a,pa);b?k(c):g(c)}function v(){w(-1,!1);return!0}function y(){w(1,!1);return!0}function x(){w(-1,!0);return!0}function u(){w(1,!0);return!0}function s(a,b){var c=F.getCursor(f).getStepCounter().countStepsToLineBoundary(a,pa);b?k(c):g(c)}function C(){s(-1,!1);return!0}function B(){s(1,!1);return!0}function A(){s(-1,!0);return!0}function I(){s(1,!0);return!0}function z(){var a=F.getParagraphElement(F.getCursor(f).getNode()),b,c;runtime.assert(Boolean(a),
"SessionController: Cursor outside paragraph");c=F.getDistanceFromCursor(f,a,0);b=gui.SelectionMover.createPositionIterator(F.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),ba.isParagraph(a)&&(c=F.getDistanceFromCursor(f,a,0));k(c);return!0}function N(){var a=F.getParagraphElement(F.getCursor(f).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(F.getRootNode());b.moveToEndOfNode(a);
for(c=F.getDistanceFromCursor(f,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),ba.isParagraph(a)&&(b.moveToEndOfNode(a),c=F.getDistanceFromCursor(f,b.container(),b.unfilteredDomOffset()));k(c);return!0}function G(a,b){var c=gui.SelectionMover.createPositionIterator(F.getRootNode());0<a&&c.moveToEnd();c=F.getDistanceFromCursor(f,c.container(),c.unfilteredDomOffset());b?k(c):g(c)}function R(){G(-1,!1);return!0}function Z(){G(1,!1);return!0}function ka(){G(-1,!0);
return!0}function T(){G(1,!0);return!0}function ra(){var a=gui.SelectionMover.createPositionIterator(F.getRootNode()),b;b=-F.getDistanceFromCursor(f,a.container(),a.unfilteredDomOffset());a.moveToEnd();b+=F.getDistanceFromCursor(f,a.container(),a.unfilteredDomOffset());h.enqueue([c(0,b)]);return!0}function $(){var a=F.getCursor(f),b=fa.getSelection(),c;a?(va.clearSelection(),a.getSelectionType()===ops.OdtCursor.RegionSelection&&(c=ba.getImageElements(a.getSelectedRange())[0])&&va.select(c.parentNode),
X.hasFocus()&&(c=a.getSelectedRange(),b.extend?a.hasForwardSelection()?(b.collapse(c.startContainer,c.startOffset),b.extend(c.endContainer,c.endOffset)):(b.collapse(c.endContainer,c.endOffset),b.extend(c.startContainer,c.startOffset)):(b.removeAllRanges(),b.addRange(c.cloneRange())))):va.clearSelection()}function ha(){runtime.setTimeout($,0)}function U(a){var b=F.getCursor(f);b.getSelectedRange().collapsed||(la.setDataFromRange(a,b.getSelectedRange())?qa.removeCurrentSelection():runtime.log("Cut operation failed"))}
function O(){return!1!==F.getCursor(f).getSelectedRange().collapsed}function W(a){var b=F.getCursor(f);b.getSelectedRange().collapsed||la.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function E(a){var b;fa.clipboardData&&fa.clipboardData.getData?b=fa.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(qa.insertText(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function H(){return!1}function M(a){if(ca)ca.onOperationExecuted(a)}
function S(a){F.emit(ops.OdtDocument.signalUndoStackChanged,a)}function P(){return ca?(ca.moveBackward(1),$(),!0):!1}function aa(){return ca?(ca.moveForward(1),$(),!0):!1}function na(a){if(ya=(a=a.target||a.srcElement)&&Y.containsNode(F.getOdfCanvas().getElement(),a))ta=!1,xa=F.createRootFilter(a)}function da(a){var b=a.getSelectedRange();return a.hasForwardSelection()?{anchorNode:b.startContainer,anchorOffset:b.startOffset,focusNode:b.endContainer,focusOffset:b.endOffset}:{anchorNode:b.endContainer,
anchorOffset:b.endOffset,focusNode:b.startContainer,focusOffset:b.startOffset}}function V(b){var c=b.target||b.srcElement,e={detail:b.detail,clientX:b.clientX,clientY:b.clientY,target:c};ua.processRequests();ba.isImage(c)&&ba.isCharacterFrame(c.parentNode)?a(c.parentNode):ya&&!va.isSelectorElement(c)&&(ta?d(da(n),b):runtime.setTimeout(function(){var a;a=(a=fa.getSelection())?{anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}:null;d(a,e)},0));ta=ya=
!1}function Q(a){V(a)}function J(a){var b=a.target||a.srcElement,c=null;"annotationRemoveButton"===b.className?(c=Y.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0],ga.removeAnnotation(c)):V(a)}function ea(){var a=fa.getSelection(),b;ya&&0<a.rangeCount&&(ta=!0,va.clearSelection(),wa.setUnfilteredPosition(a.focusNode,a.focusOffset),xa.acceptPosition(wa)===e&&(b=a.getRangeAt(0).cloneRange(),a=a.anchorNode===b.startContainer&&a.anchorOffset===b.startOffset,n.setSelectedRange(b,
a),F.emit(ops.OdtDocument.signalCursorMoved,n)))}function oa(a){return function(){a();return!0}}function D(a){return function(b){return F.getCursor(f).getSelectionType()===ops.OdtCursor.RangeSelection?a(b):!0}}var fa=runtime.getWindow(),F=h.getOdtDocument(),ia=new core.Async,Y=new core.DomUtils,ba=new odf.OdfUtils,la=new gui.Clipboard,L=new gui.KeyboardHandler,sa=new gui.KeyboardHandler,pa=new core.PositionFilterChain,ma=F.getPositionFilter(),ya=!1,za=new odf.ObjectNameGenerator(F.getOdfCanvas().odfContainer(),
f),ta=!1,xa=null,ca=null,X=new gui.EventManager(F),ga=new gui.AnnotationManager(h,f),K=m&&m.directStylingEnabled?new gui.DirectTextStyler(h,f):null,ja=m&&m.directStylingEnabled?new gui.DirectParagraphStyler(h,f,za):null,qa=new gui.TextManipulator(h,f,K&&K.createCursorStyleOp),Aa=new gui.ImageManager(h,f,za),va=new gui.ImageSelector(F.getOdfCanvas()),wa=gui.SelectionMover.createPositionIterator(F.getRootNode()),ua;runtime.assert(null!==fa,"Expected to be run in an environment which has a global window, like a browser.");
pa.addFilter("BaseFilter",ma);pa.addFilter("RootFilter",F.createRootFilter(f));this.startEditing=function(){var a;F.getOdfCanvas().getElement().classList.add("virtualSelections");X.subscribe("keydown",L.handleEvent);X.subscribe("keypress",sa.handleEvent);X.subscribe("keyup",p);X.subscribe("beforecut",O);X.subscribe("cut",U);X.subscribe("copy",W);X.subscribe("beforepaste",H);X.subscribe("paste",E);X.subscribe("mousedown",na);X.subscribe("mousemove",ua.trigger);X.subscribe("mouseup",J);X.subscribe("contextmenu",
Q);X.subscribe("focus",ha);F.subscribe(ops.OdtDocument.signalOperationExecuted,$);F.subscribe(ops.OdtDocument.signalOperationExecuted,M);a=new ops.OpAddCursor;a.init({memberid:f});h.enqueue([a]);ca&&ca.saveInitialState()};this.endEditing=function(){var a;a=new ops.OpRemoveCursor;a.init({memberid:f});h.enqueue([a]);ca&&ca.resetInitialState();F.unsubscribe(ops.OdtDocument.signalOperationExecuted,M);F.unsubscribe(ops.OdtDocument.signalOperationExecuted,$);X.unsubscribe("keydown",L.handleEvent);X.unsubscribe("keypress",
sa.handleEvent);X.unsubscribe("keyup",p);X.unsubscribe("cut",U);X.unsubscribe("beforecut",O);X.unsubscribe("copy",W);X.unsubscribe("paste",E);X.unsubscribe("beforepaste",H);X.unsubscribe("mousemove",ua.trigger);X.unsubscribe("mousedown",na);X.unsubscribe("mouseup",J);X.unsubscribe("contextmenu",Q);X.unsubscribe("focus",ha);F.getOdfCanvas().getElement().classList.remove("virtualSelections")};this.getInputMemberId=function(){return f};this.getSession=function(){return h};this.setUndoManager=function(a){ca&&
ca.unsubscribe(gui.UndoManager.signalUndoStackChanged,S);if(ca=a)ca.setOdtDocument(F),ca.setPlaybackFunction(function(a){a.execute(F)}),ca.subscribe(gui.UndoManager.signalUndoStackChanged,S)};this.getUndoManager=function(){return ca};this.getAnnotationManager=function(){return ga};this.getDirectTextStyler=function(){return K};this.getDirectParagraphStyler=function(){return ja};this.getImageManager=function(){return Aa};this.getTextManipulator=function(){return qa};this.getEventManager=function(){return X};
this.getKeyboardHandlers=function(){return{keydown:L,keypress:sa}};this.destroy=function(a){var b=[ua.destroy];K&&b.push(K.destroy);ja&&b.push(ja.destroy);ia.destroyAll(b,a)};(function(){var a=-1!==fa.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;ua=new core.ScheduledTask(ea,0);L.bind(c.Tab,b.None,D(function(){qa.insertText("\t");return!0}));L.bind(c.Left,b.None,D(q));L.bind(c.Right,b.None,D(l));L.bind(c.Up,b.None,D(v));L.bind(c.Down,
b.None,D(y));L.bind(c.Backspace,b.None,oa(qa.removeTextByBackspaceKey));L.bind(c.Delete,b.None,qa.removeTextByDeleteKey);L.bind(c.Left,b.Shift,D(r));L.bind(c.Right,b.Shift,D(t));L.bind(c.Up,b.Shift,D(x));L.bind(c.Down,b.Shift,D(u));L.bind(c.Home,b.None,D(C));L.bind(c.End,b.None,D(B));L.bind(c.Home,b.Ctrl,D(R));L.bind(c.End,b.Ctrl,D(Z));L.bind(c.Home,b.Shift,D(A));L.bind(c.End,b.Shift,D(I));L.bind(c.Up,b.CtrlShift,D(z));L.bind(c.Down,b.CtrlShift,D(N));L.bind(c.Home,b.CtrlShift,D(ka));L.bind(c.End,
b.CtrlShift,D(T));a?(L.bind(c.Clear,b.None,qa.removeCurrentSelection),L.bind(c.Left,b.Meta,D(C)),L.bind(c.Right,b.Meta,D(B)),L.bind(c.Home,b.Meta,D(R)),L.bind(c.End,b.Meta,D(Z)),L.bind(c.Left,b.MetaShift,D(A)),L.bind(c.Right,b.MetaShift,D(I)),L.bind(c.Up,b.AltShift,D(z)),L.bind(c.Down,b.AltShift,D(N)),L.bind(c.Up,b.MetaShift,D(ka)),L.bind(c.Down,b.MetaShift,D(T)),L.bind(c.A,b.Meta,D(ra)),K&&(L.bind(c.B,b.Meta,D(K.toggleBold)),L.bind(c.I,b.Meta,D(K.toggleItalic)),L.bind(c.U,b.Meta,D(K.toggleUnderline))),
ja&&(L.bind(c.L,b.MetaShift,D(ja.alignParagraphLeft)),L.bind(c.E,b.MetaShift,D(ja.alignParagraphCenter)),L.bind(c.R,b.MetaShift,D(ja.alignParagraphRight)),L.bind(c.J,b.MetaShift,D(ja.alignParagraphJustified))),ga&&L.bind(c.C,b.MetaShift,ga.addAnnotation),L.bind(c.Z,b.Meta,P),L.bind(c.Z,b.MetaShift,aa)):(L.bind(c.A,b.Ctrl,D(ra)),K&&(L.bind(c.B,b.Ctrl,D(K.toggleBold)),L.bind(c.I,b.Ctrl,D(K.toggleItalic)),L.bind(c.U,b.Ctrl,D(K.toggleUnderline))),ja&&(L.bind(c.L,b.CtrlShift,D(ja.alignParagraphLeft)),
L.bind(c.E,b.CtrlShift,D(ja.alignParagraphCenter)),L.bind(c.R,b.CtrlShift,D(ja.alignParagraphRight)),L.bind(c.J,b.CtrlShift,D(ja.alignParagraphJustified))),ga&&L.bind(c.C,b.CtrlAlt,ga.addAnnotation),L.bind(c.Z,b.Ctrl,P),L.bind(c.Z,b.CtrlShift,aa));sa.setDefault(D(function(a){var b;b=null===a.which||void 0===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(qa.insertText(b),!0)}));sa.bind(c.Enter,b.None,
D(qa.enqueueParagraphSplittingOps))})()};return gui.SessionController}();
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.MemberModel=function(){};ops.MemberModel.prototype.getMemberDetailsAndUpdates=function(e,h){};ops.MemberModel.prototype.unsubscribeMemberDetailsUpdates=function(e,h){};ops.MemberModel.prototype.close=function(e){};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.TrivialMemberModel=function(){this.getMemberDetailsAndUpdates=function(e,h){h(e,{memberid:e,fullname:runtime.tr("Unknown Author"),color:"black",imageurl:"avatar-joe.png"})};this.unsubscribeMemberDetailsUpdates=function(e,h){};this.close=function(e){e()}};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(e){};ops.OperationRouter.prototype.setPlaybackFunction=function(e){};ops.OperationRouter.prototype.push=function(e){};ops.OperationRouter.prototype.close=function(e){};
// Input 82
/*

 Copyright (C) 2012 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.TrivialOperationRouter=function(){var e,h;this.setOperationFactory=function(f){e=f};this.setPlaybackFunction=function(e){h=e};this.push=function(f){f.forEach(function(f){f=f.spec();f.timestamp=(new Date).getTime();f=e.create(f);h(f)})};this.close=function(e){e()}};
// Input 83
gui.EditInfoHandle=function(e){var h=[],f,n=e.ownerDocument,m=n.documentElement.namespaceURI;this.setEdits=function(e){h=e;var c,b,a,d;f.innerHTML="";for(e=0;e<h.length;e+=1)c=n.createElementNS(m,"div"),c.className="editInfo",b=n.createElementNS(m,"span"),b.className="editInfoColor",b.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[e].memberid),a=n.createElementNS(m,"span"),a.className="editInfoAuthor",a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[e].memberid),
d=n.createElementNS(m,"span"),d.className="editInfoTime",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",h[e].memberid),d.innerHTML=h[e].time,c.appendChild(b),c.appendChild(a),c.appendChild(d),f.appendChild(c)};this.show=function(){f.style.display="block"};this.hide=function(){f.style.display="none"};this.destroy=function(h){e.removeChild(f);h()};f=n.createElementNS(m,"div");f.setAttribute("class","editInfoHandle");f.style.display="none";e.appendChild(f)};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(e,h){function f(a,b){return runtime.setTimeout(function(){c.style.opacity=a},b)}var n=this,m,p,c,b,a;this.addEdit=function(d,h){var g=Date.now()-h;e.addEdit(d,h);p.setEdits(e.getSortedEdits());c.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",d);b&&runtime.clearTimeout(b);a&&runtime.clearTimeout(a);1E4>g?(f(1,0),b=f(0.5,1E4-g),a=f(0.2,2E4-g)):1E4<=g&&2E4>g?(f(0.5,0),a=f(0.2,2E4-g)):f(0.2,0)};this.getEdits=function(){return e.getEdits()};this.clearEdits=function(){e.clearEdits();
p.setEdits([]);c.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&c.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return e};this.show=function(){c.style.display="block"};this.hide=function(){n.hideHandle();c.style.display="none"};this.showHandle=function(){p.show()};this.hideHandle=function(){p.hide()};this.destroy=function(a){m.removeChild(c);p.destroy(function(b){b?a(b):e.destroy(a)})};(function(){var a=e.getOdtDocument().getDOM();
c=a.createElementNS(a.documentElement.namespaceURI,"div");c.setAttribute("class","editInfoMarker");c.onmouseover=function(){n.showHandle()};c.onmouseout=function(){n.hideHandle()};m=e.getNode();m.appendChild(c);p=new gui.EditInfoHandle(m);h||n.hide()})()};
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("gui.Caret");runtime.loadClass("ops.TrivialMemberModel");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
gui.SessionView=function(){return function(e,h,f,n,m){function p(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid="'+a+'"]'+e+c;a:{var f=t.firstChild;for(b=b+'[editinfo|memberid="'+a+'"]'+e+"{";f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:t.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',
":before");d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","");d("div.selectionOverlay","{ background-color: "+c+";}","")}function c(a){var b,c;for(c in v)v.hasOwnProperty(c)&&(b=v[c],a?b.show():b.hide())}function b(a){n.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function a(a,b){var c=n.getCaret(a);b?(c&&(c.setAvatarImageUrl(b.imageurl),c.setColor(b.color)),p(a,b.fullname,b.color),h===a&&p("",b.fullname,b.color)):
runtime.log('MemberModel sent undefined data for member "'+a+'".')}function d(b){var c=b.getMemberId(),d=f.getMemberModel();n.registerCursor(b,x,u);m.registerCursor(b,!0);a(c,null);d.getMemberDetailsAndUpdates(c,a);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function k(a){a=a.getMemberId();var b=m.getSelectionView(h),c=m.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),d=n.getCaret(h);a===h?(c.hide(),b.show(),d&&d.show()):a===gui.ShadowCursor.ShadowCursorMemberId&&
(c.show(),b.hide(),d&&d.hide())}function g(b){var c=!1,d;for(d in v)if(v.hasOwnProperty(d)&&v[d].getEditInfo().getEdits().hasOwnProperty(b)){c=!0;break}m.removeSelectionView(b);c||f.getMemberModel().unsubscribeMemberDetailsUpdates(b,a)}function q(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",g=b.getElementsByTagNameNS(w,"editinfo")[0];g?(e=g.getAttributeNS(w,"id"),d=v[e]):(e=Math.random().toString(),d=new ops.EditInfo(b,f.getOdtDocument()),d=new gui.EditInfoMarker(d,y),g=b.getElementsByTagNameNS(w,
"editinfo")[0],g.setAttributeNS(w,"id",e),v[e]=d);d.addEdit(c,new Date(a))}function l(){C=!0}function r(){s=runtime.getWindow().setInterval(function(){C&&(m.rerenderSelectionViews(),C=!1)},200)}var t,w="urn:webodf:names:editinfo",v={},y=void 0!==e.editInfoMarkersInitiallyVisible?Boolean(e.editInfoMarkersInitiallyVisible):!0,x=void 0!==e.caretAvatarsInitiallyVisible?Boolean(e.caretAvatarsInitiallyVisible):!0,u=void 0!==e.caretBlinksOnRangeSelect?Boolean(e.caretBlinksOnRangeSelect):!0,s,C=!1;this.showEditInfoMarkers=
function(){y||(y=!0,c(y))};this.hideEditInfoMarkers=function(){y&&(y=!1,c(y))};this.showCaretAvatars=function(){x||(x=!0,b(x))};this.hideCaretAvatars=function(){x&&(x=!1,b(x))};this.getSession=function(){return f};this.getCaret=function(a){return n.getCaret(a)};this.destroy=function(b){var c=f.getOdtDocument(),e=f.getMemberModel(),h=Object.keys(v).map(function(a){return v[a]});c.unsubscribe(ops.OdtDocument.signalCursorAdded,d);c.unsubscribe(ops.OdtDocument.signalCursorRemoved,g);c.unsubscribe(ops.OdtDocument.signalParagraphChanged,
q);c.unsubscribe(ops.OdtDocument.signalCursorMoved,k);c.unsubscribe(ops.OdtDocument.signalParagraphChanged,l);c.unsubscribe(ops.OdtDocument.signalTableAdded,l);c.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,l);runtime.getWindow().clearInterval(s);n.getCarets().forEach(function(b){e.unsubscribeMemberDetailsUpdates(b.getCursor().getMemberId(),a)});t.parentNode.removeChild(t);(function G(a,c){c?b(c):a<h.length?h[a].destroy(function(b){G(a+1,b)}):b()})(0,void 0)};(function(){var a=f.getOdtDocument(),
b=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,d);a.subscribe(ops.OdtDocument.signalCursorRemoved,g);a.subscribe(ops.OdtDocument.signalParagraphChanged,q);a.subscribe(ops.OdtDocument.signalCursorMoved,k);r();a.subscribe(ops.OdtDocument.signalParagraphChanged,l);a.subscribe(ops.OdtDocument.signalTableAdded,l);a.subscribe(ops.OdtDocument.signalParagraphStyleModified,l);t=document.createElementNS(b.namespaceURI,"style");t.type="text/css";t.media="screen, print, handheld, projection";
t.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));t.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(t)})()}}();
// Input 86
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("gui.Caret");
gui.CaretManager=function(e){function h(a){return q.hasOwnProperty(a)?q[a]:null}function f(){return Object.keys(q).map(function(a){return q[a]})}function n(a){a===e.getInputMemberId()&&e.getSession().getOdtDocument().getOdfCanvas().getElement().removeAttribute("tabindex");delete q[a]}function m(a){a=a.getMemberId();a===e.getInputMemberId()&&(a=h(a))&&a.refreshCursorBlinking()}function p(){var a=h(e.getInputMemberId());r=!1;a&&a.ensureVisible()}function c(){var a=h(e.getInputMemberId());a&&(a.handleUpdate(),
r||(r=!0,runtime.setTimeout(p,50)))}function b(a){a.memberId===e.getInputMemberId()&&c()}function a(){var a=h(e.getInputMemberId());a&&a.setFocus()}function d(){var a=h(e.getInputMemberId());a&&a.removeFocus()}function k(){var a=h(e.getInputMemberId());a&&a.show()}function g(){var a=h(e.getInputMemberId());a&&a.hide()}var q={},l=runtime.getWindow(),r=!1;this.registerCursor=function(a,b,d){var f=a.getMemberId();b=new gui.Caret(a,b,d);q[f]=b;f===e.getInputMemberId()?(runtime.log("Starting to track input on new cursor of "+
f),a.handleUpdate=c,e.getSession().getOdtDocument().getOdfCanvas().getElement().setAttribute("tabindex",-1),e.getEventManager().focus()):a.handleUpdate=b.handleUpdate;return b};this.getCaret=h;this.getCarets=f;this.destroy=function(c){var h=e.getSession().getOdtDocument(),p=e.getEventManager(),r=f();h.unsubscribe(ops.OdtDocument.signalParagraphChanged,b);h.unsubscribe(ops.OdtDocument.signalCursorMoved,m);h.unsubscribe(ops.OdtDocument.signalCursorRemoved,n);p.unsubscribe("focus",a);p.unsubscribe("blur",
d);l.removeEventListener("focus",k,!1);l.removeEventListener("blur",g,!1);(function u(a,b){b?c(b):a<r.length?r[a].destroy(function(b){u(a+1,b)}):c()})(0,void 0);q={}};(function(){var c=e.getSession().getOdtDocument(),f=e.getEventManager();c.subscribe(ops.OdtDocument.signalParagraphChanged,b);c.subscribe(ops.OdtDocument.signalCursorMoved,m);c.subscribe(ops.OdtDocument.signalCursorRemoved,n);f.subscribe("focus",a);f.subscribe("blur",d);l.addEventListener("focus",k,!1);l.addEventListener("blur",g,!1)})()};
// Input 87
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(e,h){};gui.UndoManager.prototype.unsubscribe=function(e,h){};gui.UndoManager.prototype.setOdtDocument=function(e){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(e){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(e){};gui.UndoManager.prototype.moveBackward=function(e){};gui.UndoManager.prototype.onOperationExecuted=function(e){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
// Input 88
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
gui.UndoStateRules=function(){function e(e){return e.spec().optype}function h(f){switch(e(f)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=e;this.isEditOperation=h;this.isPartOfOperationSet=function(f,n){if(h(f)){if(0===n.length)return!0;var m;if(m=h(n[n.length-1]))a:{m=n.filter(h);var p=e(f),c;b:switch(p){case "RemoveText":case "InsertText":c=!0;break b;default:c=!1}if(c&&p===e(m[0])){if(1===m.length){m=!0;break a}p=m[m.length-2].spec().position;
m=m[m.length-1].spec().position;c=f.spec().position;if(m===c-(m-p)){m=!0;break a}}m=!1}return m}return!0}};
// Input 89
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.UndoManager");runtime.loadClass("gui.UndoStateRules");
gui.TrivialUndoManager=function(e){function h(){t.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:c.hasUndoStates(),redoAvailable:c.hasRedoStates()})}function f(){q!==d&&q!==l[l.length-1]&&l.push(q)}function n(a){var c=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);b.normalizeTextNodes(c)}function m(a){return Object.keys(a).map(function(b){return a[b]})}function p(a){function b(a){var g=a.spec();if(e[g.memberid])switch(g.optype){case "AddCursor":c[g.memberid]||(c[g.memberid]=
a,delete e[g.memberid],f-=1);break;case "MoveCursor":d[g.memberid]||(d[g.memberid]=a)}}var c={},d={},e={},f,h=a.pop();g.getCursors().forEach(function(a){e[a.getMemberId()]=!0});for(f=Object.keys(e).length;h&&0<f;)h.reverse(),h.forEach(b),h=a.pop();return m(c).concat(m(d))}var c=this,b=new core.DomUtils,a,d=[],k,g,q=[],l=[],r=[],t=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=e||new gui.UndoStateRules;this.subscribe=function(a,b){t.subscribe(a,b)};this.unsubscribe=function(a,b){t.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<l.length};this.hasRedoStates=function(){return 0<r.length};this.setOdtDocument=function(a){g=a};this.resetInitialState=function(){l.length=0;r.length=0;d.length=0;q.length=0;a=null;h()};this.saveInitialState=function(){var c=g.getOdfCanvas().odfContainer(),e=g.getOdfCanvas().getAnnotationManager();e&&e.forgetAnnotations();a=c.rootElement.cloneNode(!0);
g.getOdfCanvas().refreshAnnotations();c=a;b.getElementsByTagNameNS(c,"urn:webodf:names:cursor","cursor").forEach(n);b.getElementsByTagNameNS(c,"urn:webodf:names:cursor","anchor").forEach(n);f();l.unshift(d);q=d=p(l);l.length=0;r.length=0;h()};this.setPlaybackFunction=function(a){k=a};this.onOperationExecuted=function(a){r.length=0;w.isEditOperation(a)&&q===d||!w.isPartOfOperationSet(a,q)?(f(),q=[a],l.push(q),t.emit(gui.UndoManager.signalUndoStateCreated,{operations:q}),h()):(q.push(a),t.emit(gui.UndoManager.signalUndoStateModified,
{operations:q}))};this.moveForward=function(a){for(var b=0,c;a&&r.length;)c=r.pop(),l.push(c),c.forEach(k),a-=1,b+=1;b&&(q=l[l.length-1],h());return b};this.moveBackward=function(b){for(var c=g.getOdfCanvas(),e=c.odfContainer(),f=0;b&&l.length;)r.push(l.pop()),b-=1,f+=1;f&&(e.setRootElement(a.cloneNode(!0)),c.setOdfContainer(e,!0),t.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),g.getCursors().forEach(function(a){g.removeCursor(a.getMemberId())}),d.forEach(k),l.forEach(function(a){a.forEach(k)}),
c.refreshCSS(),q=l[l.length-1]||d,h());return f}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
// Input 90
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("gui.SelectionMover");
gui.SelectionView=function(e){function h(a){if(A&&a.nodeType===Node.ELEMENT_NODE)return a.getBoundingClientRect();C.selectNode(a);return C.getBoundingClientRect()}function f(a,b){a.style.left=b.left+"px";a.style.top=b.top+"px";a.style.width=b.width+"px";a.style.height=b.height+"px"}function n(a){s=a;w.style.display=v.style.display=y.style.display=!0===a?"block":"none"}function m(a){var b=h(r),c=l.getOdfCanvas().getZoomLevel(),d={};d.top=u.adaptRangeDifferenceToZoomLevel(a.top-b.top,c);d.left=u.adaptRangeDifferenceToZoomLevel(a.left-
b.left,c);d.bottom=u.adaptRangeDifferenceToZoomLevel(a.bottom-b.top,c);d.right=u.adaptRangeDifferenceToZoomLevel(a.right-b.left,c);d.width=u.adaptRangeDifferenceToZoomLevel(a.width,c);d.height=u.adaptRangeDifferenceToZoomLevel(a.height,c);return d}function p(a){a=a.getBoundingClientRect();return Boolean(a&&0!==a.height)}function c(a){var b=x.getTextElements(a,!0,!1),c=a.cloneRange(),d=a.cloneRange();a=a.cloneRange();if(!b.length)return null;var e;a:{e=0;var f=b[e],g=c.startContainer===f?c.startOffset:
0,h=g;c.setStart(f,g);for(c.setEnd(f,h);!p(c);){if(f.nodeType===Node.ELEMENT_NODE&&h<f.childNodes.length)h=f.childNodes.length;else if(f.nodeType===Node.TEXT_NODE&&h<f.length)h+=1;else if(b[e])f=b[e],e+=1,g=h=0;else{e=!1;break a}c.setStart(f,g);c.setEnd(f,h)}e=!0}if(!e)return null;a:{e=b.length-1;f=b[e];h=g=d.endContainer===f?d.endOffset:f.length||f.childNodes.length;d.setStart(f,g);for(d.setEnd(f,h);!p(d);){if(f.nodeType===Node.ELEMENT_NODE&&0<g)g=0;else if(f.nodeType===Node.TEXT_NODE&&0<g)g-=1;
else if(b[e])f=b[e],e-=1,g=h=f.length||f.childNodes.length;else{b=!1;break a}d.setStart(f,g);d.setEnd(f,h)}b=!0}if(!b)return null;a.setStart(c.startContainer,c.startOffset);a.setEnd(d.endContainer,d.endOffset);return{firstRange:c,lastRange:d,fillerRange:a}}function b(a,b){var c={};c.top=Math.min(a.top,b.top);c.left=Math.min(a.left,b.left);c.right=Math.max(a.right,b.right);c.bottom=Math.max(a.bottom,b.bottom);c.width=c.right-c.left;c.height=c.bottom-c.top;return c}function a(a,c){c&&0<c.width&&0<c.height&&
(a=a?b(a,c):c);return a}function d(b){function c(a){B.setUnfilteredPosition(a,0);return w.acceptNode(a)===I&&u.acceptPosition(B)===I?I:z}function d(a){var b=null;c(a)===I&&(b=h(a));return b}var e=b.commonAncestorContainer,f=b.startContainer,g=b.endContainer,k=b.startOffset,m=b.endOffset,n,p,q=null,r,s=t.createRange(),u,w=new odf.OdfNodeFilter,v;if(f===e||g===e)return s=b.cloneRange(),q=s.getBoundingClientRect(),s.detach(),q;for(b=f;b.parentNode!==e;)b=b.parentNode;for(p=g;p.parentNode!==e;)p=p.parentNode;
u=l.createRootFilter(f);for(e=b.nextSibling;e&&e!==p;)r=d(e),q=a(q,r),e=e.nextSibling;if(x.isParagraph(b))q=a(q,h(b));else for(v=t.createTreeWalker(b,NodeFilter.SHOW_TEXT,c),e=v.currentNode=f;e&&e!==g;)s.setStart(e,k),s.setEnd(e,e.length),r=s.getBoundingClientRect(),q=a(q,r),n=e,k=0,e=v.nextNode();n||(n=f);if(x.isParagraph(p))q=a(q,h(b));else for(v=t.createTreeWalker(p,NodeFilter.SHOW_TEXT,c),e=v.currentNode=g;e&&e!==n;)if(s.setStart(e,0),s.setEnd(e,m),r=s.getBoundingClientRect(),q=a(q,r),e=v.previousNode())m=
e.length;return q}function k(a,b){var c=a.getBoundingClientRect(),d={width:0};d.top=c.top;d.bottom=c.bottom;d.height=c.height;d.left=d.right=b?c.right:c.left;return d}function g(){if(e.getSelectionType()===ops.OdtCursor.RangeSelection){n(!0);var a=e.getSelectedRange(),g=c(a),h,l,p,t;a.collapsed||!g?n(!1):(n(!0),a=g.firstRange,h=g.lastRange,g=g.fillerRange,l=m(k(a,!1)),t=m(k(h,!0)),p=(p=d(g))?m(p):b(l,t),f(w,{left:l.left,top:l.top,width:Math.max(0,p.width-(l.left-p.left)),height:l.height}),t.top===
l.top||t.bottom===l.bottom?v.style.display=y.style.display="none":(f(y,{left:p.left,top:t.top,width:Math.max(0,t.right-p.left),height:t.height}),f(v,{left:p.left,top:l.top+l.height,width:Math.max(0,parseFloat(w.style.left)+parseFloat(w.style.width)-parseFloat(y.style.left)),height:Math.max(0,t.top-l.bottom)})),a.detach(),h.detach(),g.detach())}else n(!1)}function q(a){a===e&&g()}var l=e.getOdtDocument(),r=l.getRootNode().parentNode.parentNode,t=l.getDOM(),w=t.createElement("div"),v=t.createElement("div"),
y=t.createElement("div"),x=new odf.OdfUtils,u=new core.DomUtils,s=!0,C=t.createRange(),B=gui.SelectionMover.createPositionIterator(l.getRootNode()),A=u.areRangeRectanglesTransformed(t),I=NodeFilter.FILTER_ACCEPT,z=NodeFilter.FILTER_REJECT;this.show=this.rerender=g;this.hide=function(){n(!1)};this.visible=function(){return s};this.destroy=function(a){r.removeChild(w);r.removeChild(v);r.removeChild(y);e.getOdtDocument().unsubscribe(ops.OdtDocument.signalCursorMoved,q);a()};(function(){var a=e.getMemberId();
r.appendChild(w);r.appendChild(v);r.appendChild(y);w.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);v.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);y.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);w.className=v.className=y.className="selectionOverlay";e.getOdtDocument().subscribe(ops.OdtDocument.signalCursorMoved,q)})()};
// Input 91
/*

 Copyright (C) 2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("gui.SelectionView");
gui.SelectionViewManager=function(){function e(){return Object.keys(h).map(function(e){return h[e]})}var h={};this.getSelectionView=function(e){return h.hasOwnProperty(e)?h[e]:null};this.getSelectionViews=e;this.removeSelectionView=function(e){h.hasOwnProperty(e)&&(h[e].destroy(function(){}),delete h[e])};this.hideSelectionView=function(e){h.hasOwnProperty(e)&&h[e].hide()};this.showSelectionView=function(e){h.hasOwnProperty(e)&&h[e].show()};this.rerenderSelectionViews=function(){Object.keys(h).forEach(function(e){h[e].visible()&&
h[e].rerender()})};this.registerCursor=function(e,n){var m=e.getMemberId(),p=new gui.SelectionView(e);n?p.show():p.hide();return h[m]=p};this.destroy=function(f){var h=e();(function p(c,b){b?f(b):c<h.length?h[c].destroy(function(a){p(c+1,a)}):f()})(0,void 0)}};
// Input 92
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("gui.SelectionMover");runtime.loadClass("core.PositionFilterChain");
ops.OdtDocument=function(e){function h(){var a=e.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function f(a){function b(a){for(;a&&!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var d;d="string"===typeof a?k[a].getNode():a;return b(c)===b(d)?
q:l}}function n(a){var b=gui.SelectionMover.createPositionIterator(h());for(a+=1;0<a&&b.nextPosition();)r.acceptPosition(b)===q&&(a-=1);return b}function m(b){return a.getParagraphElement(b)}function p(a,b){return e.getFormatting().getStyleElement(a,b)}function c(a){return p(a,"paragraph")}var b=this,a,d,k={},g=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,
ops.OdtDocument.signalCommonStyleCreated,ops.OdtDocument.signalCommonStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),q=core.PositionFilter.FilterResult.FILTER_ACCEPT,l=core.PositionFilter.FilterResult.FILTER_REJECT,r;this.getIteratorAtPosition=n;this.getStyleElement=p;this.upgradeWhitespacesAtPosition=function(b){b=n(b);var c,d,e;b.previousPosition();b.previousPosition();for(e=-1;1>=e;e+=1){c=b.container();d=b.unfilteredDomOffset();
if(c.nodeType===Node.TEXT_NODE&&" "===c.data[d]&&a.isSignificantWhitespace(c,d)){runtime.assert(" "===c.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=c.ownerDocument.createElementNS(odf.Namespaces.textns,"text:s");f.appendChild(c.ownerDocument.createTextNode(" "));c.deleteData(d,1);0<d&&(c=c.splitText(d));c.parentNode.insertBefore(f,c);c=f;b.moveToEndOfNode(c)}b.nextPosition()}};this.downgradeWhitespacesAtPosition=function(b){var c=n(b),e;b=c.container();
for(c=c.unfilteredDomOffset();!a.isCharacterElement(b)&&b.childNodes[c];)b=b.childNodes[c],c=0;b.nodeType===Node.TEXT_NODE&&(b=b.parentNode);a.isDowngradableSpaceElement(b)&&(c=b.firstChild,e=b.lastChild,d.mergeIntoParent(b),e!==c&&d.normalizeTextNodes(e),d.normalizeTextNodes(c))};this.getParagraphStyleElement=c;this.getParagraphElement=m;this.getParagraphStyleAttributes=function(a){return(a=c(a))?e.getFormatting().getInheritedStyleAttributes(a):null};this.getPositionInTextNode=function(a,c){var d=
gui.SelectionMover.createPositionIterator(h()),e=null,f,g=0,l=null,l=a;runtime.assert(0<=a,"position must be >= 0");r.acceptPosition(d)===q?(f=d.container(),f.nodeType===Node.TEXT_NODE&&(e=f,g=0)):a+=1;for(;0<a||null===e;){if(!d.nextPosition())return null;if(r.acceptPosition(d)===q)if(a-=1,f=d.container(),f.nodeType===Node.TEXT_NODE)f!==e?(e=f,g=d.unfilteredDomOffset()):g+=1;else if(null!==e){if(0===a){g=e.length;break}e=null}else if(0===a){e=h().ownerDocument.createTextNode("");f.insertBefore(e,
d.rightNode());g=0;break}}if(null===e)return null;if(c&&k[c]&&b.getCursorPosition(c)===l){for(l=k[c].getNode();0===g&&l.nextSibling&&"cursor"===l.nextSibling.localName;)l.parentNode.insertBefore(l,l.nextSibling.nextSibling);0<e.length&&(e=h().ownerDocument.createTextNode(""),g=0,l.parentNode.insertBefore(e,l.nextSibling));for(;0===g&&e.previousSibling&&"cursor"===e.previousSibling.localName&&(f=e.previousSibling,0<e.length&&(e=h().ownerDocument.createTextNode("")),f.parentNode.insertBefore(e,f),l!==
f););}for(;e.previousSibling&&e.previousSibling.nodeType===Node.TEXT_NODE;)e.previousSibling.appendData(e.data),g=e.previousSibling.length,e=e.previousSibling,e.parentNode.removeChild(e.nextSibling);return{textNode:e,offset:g}};this.fixCursorPositions=function(){var a=new core.PositionFilterChain;a.addFilter("BaseFilter",r);Object.keys(k).forEach(function(c){var d=k[c],e=d.getStepCounter(),f,g,h=!1;a.addFilter("RootFilter",b.createRootFilter(c));c=e.countStepsToPosition(d.getAnchorNode(),0,a);e.isPositionWalkable(a)?
0===c&&(h=!0,d.move(0)):(h=!0,f=e.countPositionsToNearestStep(d.getNode(),0,a),g=e.countPositionsToNearestStep(d.getAnchorNode(),0,a),d.move(f),0!==c&&(0<g&&(c+=1),0<f&&(c-=1),e=e.countSteps(c,a),d.move(e),d.move(-e,!0)));h&&b.emit(ops.OdtDocument.signalCursorMoved,d);a.removeFilter("RootFilter")})};this.getWalkableParagraphLength=function(a){var b=n(0),c=0;b.setUnfilteredPosition(a,0);do{if(m(b.container())!==a)break;r.acceptPosition(b)===q&&(c+=1)}while(b.nextPosition());return c};this.getDistanceFromCursor=
function(a,b,c){a=k[a];var d=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,d=a(b,c,r));return d};this.getCursorPosition=function(a){return-b.getDistanceFromCursor(a,h(),0)};this.getCursorSelection=function(a){var b;a=k[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(h(),0,r),b=b(a.getAnchorNode(),0,r));return{position:c+b,length:-b}};this.getPositionFilter=function(){return r};this.getOdfCanvas=
function(){return e};this.getRootNode=h;this.getDOM=function(){return h().ownerDocument};this.getCursor=function(a){return k[a]};this.getCursors=function(){var a=[],b;for(b in k)k.hasOwnProperty(b)&&a.push(k[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countSteps(1,r),c=a.getMemberId();runtime.assert("string"===typeof c,"OdtDocument::addCursor has cursor without memberid");runtime.assert(!k[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+
c);a.move(b);k[c]=a};this.removeCursor=function(a){var c=k[a];return c?(c.removeFromOdtDocument(),delete k[a],b.emit(ops.OdtDocument.signalCursorRemoved,a),!0):!1};this.getMetaData=function(a){for(var b=e.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return e.getFormatting()};this.emit=function(a,
b){g.emit(a,b)};this.subscribe=function(a,b){g.subscribe(a,b)};this.unsubscribe=function(a,b){g.unsubscribe(a,b)};this.createRootFilter=function(a){return new f(a)};this.close=function(a){a()};this.destroy=function(a){a()};r=new function(){function b(c,d,e){var f,g;if(d&&(f=a.lookLeftForCharacter(d),1===f||2===f&&(a.scanRightForAnyCharacter(e)||a.scanRightForAnyCharacter(a.nextNode(c)))))return q;f=null===d&&a.isParagraph(c);g=a.lookRightForCharacter(e);if(f)return g?q:a.scanRightForAnyCharacter(e)?
l:q;if(!g)return l;d=d||a.previousNode(c);return a.scanLeftForAnyCharacter(d)?l:q}this.acceptPosition=function(c){var d=c.container(),e=d.nodeType,f,g,k;if(e!==Node.ELEMENT_NODE&&e!==Node.TEXT_NODE)return l;if(e===Node.TEXT_NODE){if(!a.isGroupingElement(d.parentNode)||a.isWithinTrackedChanges(d.parentNode,h()))return l;e=c.unfilteredDomOffset();f=d.data;runtime.assert(e!==f.length,"Unexpected offset.");if(0<e){c=f.substr(e-1,1);if(!a.isODFWhitespace(c))return q;if(1<e)if(c=f.substr(e-2,1),!a.isODFWhitespace(c))g=
q;else{if(!a.isODFWhitespace(f.substr(0,e)))return l}else k=a.previousNode(d),a.scanLeftForNonWhitespace(k)&&(g=q);if(g===q)return a.isTrailingWhitespace(d,e)?l:q;g=f.substr(e,1);return a.isODFWhitespace(g)?l:a.scanLeftForAnyCharacter(a.previousNode(d))?l:q}k=c.leftNode();g=d;d=d.parentNode;g=b(d,k,g)}else!a.isGroupingElement(d)||a.isWithinTrackedChanges(d,h())?g=l:(k=c.leftNode(),g=c.rightNode(),g=b(d,k,g));return g}};a=new odf.OdfUtils;d=new core.DomUtils};ops.OdtDocument.signalCursorAdded="cursor/added";
ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalCommonStyleCreated="style/created";ops.OdtDocument.signalCommonStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";
(function(){return ops.OdtDocument})();
// Input 93
/*

 Copyright (C) 2012-2013 KO GmbH <copyright@kogmbh.com>

 @licstart
 The JavaScript code in this page is free software: you can redistribute it
 and/or modify it under the terms of the GNU Affero General Public License
 (GNU AGPL) as published by the Free Software Foundation, either version 3 of
 the License, or (at your option) any later version.  The code is distributed
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 FITNESS FOR A PARTICULAR PURPOSE.  See the GNU AGPL for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
runtime.loadClass("ops.TrivialMemberModel");runtime.loadClass("ops.TrivialOperationRouter");runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OdtDocument");
ops.Session=function(e){var h=new ops.OperationFactory,f=new ops.OdtDocument(e),n=new ops.TrivialMemberModel,m=null;this.setMemberModel=function(e){n=e};this.setOperationFactory=function(e){h=e;m&&m.setOperationFactory(h)};this.setOperationRouter=function(e){m=e;e.setPlaybackFunction(function(c){c.execute(f);f.emit(ops.OdtDocument.signalOperationExecuted,c)});e.setOperationFactory(h)};this.getMemberModel=function(){return n};this.getOperationFactory=function(){return h};this.getOdtDocument=function(){return f};
this.enqueue=function(e){m.push(e)};this.close=function(e){m.close(function(c){c?e(c):n.close(function(b){b?e(b):f.close(e)})})};this.destroy=function(e){f.destroy(e)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 94
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let's not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\n.virtualSelections office|document *::selection {\n  background: transparent;\n}\n.virtualSelections office|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    z-index: 15;\n    opacity: 0.2;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n";
