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
function Runtime(){}Runtime.prototype.getVariable=function(g){};Runtime.prototype.toJson=function(g){};Runtime.prototype.fromJson=function(g){};Runtime.prototype.byteArrayFromString=function(g,l){};Runtime.prototype.byteArrayToString=function(g,l){};Runtime.prototype.read=function(g,l,c,m){};Runtime.prototype.readFile=function(g,l,c){};Runtime.prototype.readFileSync=function(g,l){};Runtime.prototype.loadXML=function(g,l){};Runtime.prototype.writeFile=function(g,l,c){};
Runtime.prototype.isFile=function(g,l){};Runtime.prototype.getFileSize=function(g,l){};Runtime.prototype.deleteFile=function(g,l){};Runtime.prototype.log=function(g,l){};Runtime.prototype.setTimeout=function(g,l){};Runtime.prototype.clearTimeout=function(g){};Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(g){};Runtime.prototype.getWindow=function(){};
Runtime.prototype.assert=function(g,l,c){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(g,l){function c(c){var b="",p,r=c.length;for(p=0;p<r;p+=1)b+=String.fromCharCode(c[p]&255);return b}function m(c){var b="",p,r=c.length,d=[],k,a,e,h;for(p=0;p<r;p+=1)k=c[p],128>k?d.push(k):(p+=1,a=c[p],194<=k&&224>k?d.push((k&31)<<6|a&63):(p+=1,e=c[p],224<=k&&240>k?d.push((k&15)<<12|(a&63)<<6|e&63):(p+=1,h=c[p],240<=k&&245>k&&(k=(k&7)<<18|(a&63)<<12|(e&63)<<6|h&63,k-=65536,d.push((k>>10)+55296,(k&1023)+56320))))),1E3===d.length&&(b+=String.fromCharCode.apply(null,
d),d.length=0);return b+String.fromCharCode.apply(null,d)}var f;"utf8"===l?f=m(g):("binary"!==l&&this.log("Unsupported encoding: "+l),f=c(g));return f};Runtime.getVariable=function(g){try{return eval(g)}catch(l){}};Runtime.toJson=function(g){return JSON.stringify(g)};Runtime.fromJson=function(g){return JSON.parse(g)};Runtime.getFunctionName=function(g){return void 0===g.name?(g=/function\s+(\w+)/.exec(g))&&g[1]:g.name};
function BrowserRuntime(g){function l(b,r){var d,k,a;void 0!==r?a=b:r=b;g?(k=g.ownerDocument,a&&(d=k.createElement("span"),d.className=a,d.appendChild(k.createTextNode(a)),g.appendChild(d),g.appendChild(k.createTextNode(" "))),d=k.createElement("span"),0<r.length&&"<"===r[0]?d.innerHTML=r:d.appendChild(k.createTextNode(r)),g.appendChild(d),g.appendChild(k.createElement("br"))):console&&console.log(r);"alert"===a&&alert(r)}function c(c,r,d){if(0!==d.status||d.responseText)if(200===d.status||0===d.status){if(d.response&&
"string"!==typeof d.response)"binary"===r?(r=d.response,r=new Uint8Array(r)):r=String(d.response);else if("binary"===r)if(null!==d.responseBody&&"undefined"!==String(typeof VBArray)){r=(new VBArray(d.responseBody)).toArray();d=r.length;var k,a=new Uint8Array(new ArrayBuffer(d));for(k=0;k<d;k+=1)a[k]=r[k];r=a}else r=n.byteArrayFromString(d.responseText,"binary");else r=d.responseText;b[c]=r;c={err:null,data:r}}else c={err:d.responseText||d.statusText,data:null};else c={err:"File "+c+" is empty.",data:null};
return c}function m(b,c,d){var k=new XMLHttpRequest;k.open("GET",b,d);k.overrideMimeType&&("binary"!==c?k.overrideMimeType("text/plain; charset="+c):k.overrideMimeType("text/plain; charset=x-user-defined"));return k}function f(p,r,d){function k(){var e;4===a.readyState&&(e=c(p,r,a),d(e.err,e.data))}if(b.hasOwnProperty(p))d(null,b[p]);else{var a=m(p,r,!0);a.onreadystatechange=k;try{a.send(null)}catch(e){d(e.message,null)}}}var n=this,b={};this.byteArrayFromString=function(b,c){var d;if("utf8"===c){d=
b.length;var k,a,e,h=0;for(a=0;a<d;a+=1)e=b.charCodeAt(a),h+=1+(128<e)+(2048<e);k=new Uint8Array(new ArrayBuffer(h));for(a=h=0;a<d;a+=1)e=b.charCodeAt(a),128>e?(k[h]=e,h+=1):2048>e?(k[h]=192|e>>>6,k[h+1]=128|e&63,h+=2):(k[h]=224|e>>>12&15,k[h+1]=128|e>>>6&63,k[h+2]=128|e&63,h+=3)}else for("binary"!==c&&n.log("unknown encoding: "+c),d=b.length,k=new Uint8Array(new ArrayBuffer(d)),a=0;a<d;a+=1)k[a]=b.charCodeAt(a)&255;return d=k};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;
this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=f;this.read=function(b,c,d,k){f(b,"binary",function(a,e){var h=null;if(e){if("string"===typeof e)throw"This should not happen.";h=e.subarray(c,c+d)}k(a,h)})};this.readFileSync=function(b,r){var d=m(b,r,!1),k;try{d.send(null);k=c(b,r,d);if(k.err)throw k.err;if(null===k.data)throw"No data read from "+b+".";}catch(a){throw a;}return k.data};this.writeFile=function(c,r,d){b[c]=r;var k=new XMLHttpRequest,a;k.open("PUT",c,!0);k.onreadystatechange=
function(){4===k.readyState&&(0!==k.status||k.responseText?200<=k.status&&300>k.status||0===k.status?d(null):d("Status "+String(k.status)+": "+k.responseText||k.statusText):d("File "+c+" is empty."))};a=r.buffer&&!k.sendAsBinary?r.buffer:n.byteArrayToString(r,"binary");try{k.sendAsBinary?k.sendAsBinary(a):k.send(a)}catch(e){n.log("HUH? "+e+" "+r),d(e.message)}};this.deleteFile=function(c,r){delete b[c];var d=new XMLHttpRequest;d.open("DELETE",c,!0);d.onreadystatechange=function(){4===d.readyState&&
(200>d.status&&300<=d.status?r(d.responseText):r(null))};d.send(null)};this.loadXML=function(b,c){var d=new XMLHttpRequest;d.open("GET",b,!0);d.overrideMimeType&&d.overrideMimeType("text/xml");d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200===d.status||0===d.status?c(null,d.responseXML):c(d.responseText,null):c("File "+b+" is empty.",null))};try{d.send(null)}catch(k){c(k.message,null)}};this.isFile=function(b,c){n.getFileSize(b,function(d){c(-1!==d)})};this.getFileSize=
function(c,r){if(b.hasOwnProperty(c)&&"string"!==typeof b[c])r(b[c].length);else{var d=new XMLHttpRequest;d.open("HEAD",c,!0);d.onreadystatechange=function(){if(4===d.readyState){var b=d.getResponseHeader("Content-Length");b?r(parseInt(b,10)):f(c,"binary",function(a,e){a?r(-1):r(e.length)})}};d.send(null)}};this.log=l;this.assert=function(b,c,d){if(!b)throw l("alert","ASSERTION FAILED:\n"+c),d&&d(),c;};this.setTimeout=function(b,c){return setTimeout(function(){b()},c)};this.clearTimeout=function(b){clearTimeout(b)};
this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(b){return(new DOMParser).parseFromString(b,"text/xml")};this.exit=function(b){l("Calling exit with code "+String(b)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function g(b){var d=b.length,k,a=new Uint8Array(new ArrayBuffer(d));for(k=0;k<d;k+=1)a[k]=b[k];return a}function l(b,d,k){function a(a,h){if(a)return k(a,null);if(!h)return k("No data for "+b+".",null);if("string"===typeof h)return k(a,h);k(a,g(h))}b=f.resolve(n,b);"binary"!==d?m.readFile(b,d,a):m.readFile(b,null,a)}var c=this,m=require("fs"),f=require("path"),n="",b,p;this.byteArrayFromString=function(b,d){var k=new Buffer(b,d),a,e=k.length,h=new Uint8Array(new ArrayBuffer(e));
for(a=0;a<e;a+=1)h[a]=k[a];return h};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=l;this.loadXML=function(b,d){l(b,"utf-8",function(k,a){if(k)return d(k,null);if(!a)return d("No data for "+b+".",null);d(null,c.parseXML(a))})};this.writeFile=function(b,d,k){d=new Buffer(d);b=f.resolve(n,b);m.writeFile(b,d,"binary",function(a){k(a||null)})};this.deleteFile=function(b,d){b=f.resolve(n,b);
m.unlink(b,d)};this.read=function(b,d,k,a){b=f.resolve(n,b);m.open(b,"r+",666,function(e,h){if(e)a(e,null);else{var b=new Buffer(k);m.read(h,b,0,k,d,function(e){m.close(h);a(e,g(b))})}})};this.readFileSync=function(b,d){var k=m.readFileSync(b,"binary"===d?null:d);if(null===k)throw"File "+b+" could not be read.";"binary"===d&&(k=g(k));return k};this.isFile=function(b,d){b=f.resolve(n,b);m.stat(b,function(b,a){d(!b&&a.isFile())})};this.getFileSize=function(b,d){b=f.resolve(n,b);m.stat(b,function(b,
a){b?d(-1):d(a.size)})};this.log=function(b,d){var k;void 0!==d?k=b:d=b;"alert"===k&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(d+"\n");"alert"===k&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(b,d,k){b||(process.stderr.write("ASSERTION FAILED: "+d),k&&k())};this.setTimeout=function(b,d){return setTimeout(function(){b()},d)};this.clearTimeout=function(b){clearTimeout(b)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(b){n=
b};this.currentDirectory=function(){return n};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return p};this.parseXML=function(c){return b.parseFromString(c,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};b=new (require("xmldom").DOMParser);p=c.parseXML("<a/>").implementation}
function RhinoRuntime(){function g(b,c){var f;void 0!==c?f=b:c=b;"alert"===f&&print("\n!!!!! ALERT !!!!!");print(c);"alert"===f&&print("!!!!! ALERT !!!!!")}var l=this,c=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),m,f,n="";c.setValidating(!1);c.setNamespaceAware(!0);c.setExpandEntityReferences(!1);c.setSchema(null);f=Packages.org.xml.sax.EntityResolver({resolveEntity:function(b,c){var f=new Packages.java.io.FileReader(c);return new Packages.org.xml.sax.InputSource(f)}});m=c.newDocumentBuilder();
m.setEntityResolver(f);this.byteArrayFromString=function(b,c){var f=[],d,k=b.length;for(d=0;d<k;d+=1)f[d]=b.charCodeAt(d)&255;return f};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.loadXML=function(b,c){var f=new Packages.java.io.File(b),d;try{d=m.parse(f)}catch(k){print(k);c(k);return}c(null,d)};this.readFile=function(b,c,f){n&&(b=n+"/"+b);var d=new Packages.java.io.File(b),k="binary"===c?"latin1":
c;d.isFile()?(b=readFile(b,k),"binary"===c&&(b=l.byteArrayFromString(b,"binary")),f(null,b)):f(b+" is not a file.")};this.writeFile=function(b,c,f){n&&(b=n+"/"+b);b=new Packages.java.io.FileOutputStream(b);var d,k=c.length;for(d=0;d<k;d+=1)b.write(c[d]);b.close();f(null)};this.deleteFile=function(b,c){n&&(b=n+"/"+b);(new Packages.java.io.File(b))["delete"]()?c(null):c("Could not delete "+b)};this.read=function(b,c,f,d){n&&(b=n+"/"+b);var k;k=b;var a="binary";(new Packages.java.io.File(k)).isFile()?
("binary"===a&&(a="latin1"),k=readFile(k,a)):k=null;k?d(null,this.byteArrayFromString(k.substring(c,c+f),"binary")):d("Cannot read "+b)};this.readFileSync=function(b,c){if(!c)return"";var f=readFile(b,c);if(null===f)throw"File could not be read.";return f};this.isFile=function(b,c){n&&(b=n+"/"+b);var f=new Packages.java.io.File(b);c(f.isFile())};this.getFileSize=function(b,c){n&&(b=n+"/"+b);var f=new Packages.java.io.File(b);c(f.length())};this.log=g;this.assert=function(b,c,f){b||(g("alert","ASSERTION FAILED: "+
c),f&&f())};this.setTimeout=function(b){b();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(b){n=b};this.currentDirectory=function(){return n};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return m.getDOMImplementation()};this.parseXML=function(b){return m.parse(b)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function g(c){var f=c[0],g;g=eval("if (typeof "+f+" === 'undefined') {eval('"+f+" = {};');}"+f);for(f=1;f<c.length-1;f+=1)g=g.hasOwnProperty(c[f])?g[c[f]]:g[c[f]]={};return g[c[c.length-1]]}var l={},c={};runtime.loadClass=function(m){function f(b){b=b.replace(/\./g,"/")+".js";var d=runtime.libraryPaths(),k,a,e,h;runtime.currentDirectory&&d.push(runtime.currentDirectory());for(k=0;k<d.length;k+=1){a=d[k];if(!c.hasOwnProperty(a))try{(e=runtime.readFileSync(d[k]+"/manifest.js","utf8"))&&
e.length?(h=e,c[a]=eval(h)):c[a]=null}catch(q){c[a]=null,runtime.log("Cannot load manifest for "+a+".")}e=null;if((a=c[a])&&a.indexOf&&-1!==a.indexOf(b))return d[k]+"/"+b}return null}function n(b){var d,c;c=f(b);if(!c)throw b+" is not listed in any manifest.js.";try{d=runtime.readFileSync(c,"utf8")}catch(a){throw runtime.log("Error loading "+b+" "+a),a;}if(void 0===d)throw"Cannot load class "+b;d=d+("\n//# sourceURL="+c)+("\n//@ sourceURL="+c);try{d=eval(b+" = eval(code);")}catch(e){throw runtime.log("Error loading "+
b+" "+e),e;}return d}if(!IS_COMPILED_CODE&&!l.hasOwnProperty(m)){var b=m.split("."),p;p=g(b);if(!p&&(p=n(m),!p||Runtime.getFunctionName(p)!==b[b.length-1]))throw runtime.log("Loaded code is not for "+b[b.length-1]),"Loaded code is not for "+b[b.length-1];l[m]=!0}}})();(function(){var g=function(){};runtime.getTranslator=function(){return g};runtime.setTranslator=function(l){g=l};runtime.tr=function(l){var c=g(l);return c&&"string"===String(typeof c)?c:l}})();
(function(g){function l(c){if(c.length){var g=c[0];runtime.readFile(g,"utf8",function(f,l){function b(){var b;(b=eval(r))&&runtime.exit(b)}var p="",r=l;-1!==g.indexOf("/")&&(p=g.substring(0,g.indexOf("/")));runtime.setCurrentDirectory(p);f?(runtime.log(f),runtime.exit(1)):null===r?(runtime.log("No code found for "+g),runtime.exit(1)):b.apply(null,c)})}}g=g?Array.prototype.slice.call(g):[];"NodeJSRuntime"===runtime.type()?l(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?l(g):l(g.slice(1))})("undefined"!==
String(typeof arguments)&&arguments);
// Input 2
function makeBase64(){function g(a){var e,h=a.length,b=new Uint8Array(new ArrayBuffer(h));for(e=0;e<h;e+=1)b[e]=a.charCodeAt(e)&255;return b}function l(a){var e,h="",b,d=a.length-2;for(b=0;b<d;b+=3)e=a[b]<<16|a[b+1]<<8|a[b+2],h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e>>>18],h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e>>>12&63],h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e>>>6&63],h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e&
63];b===d+1?(e=a[b]<<4,h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e>>>6],h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e&63],h+="=="):b===d&&(e=a[b]<<10|a[b+1]<<2,h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e>>>12],h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e>>>6&63],h+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[e&63],h+="=");return h}function c(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,
"");var e=a.length,h=new Uint8Array(new ArrayBuffer(3*e)),b=a.length%4,d=0,c,k;for(c=0;c<e;c+=4)k=(q[a.charAt(c)]||0)<<18|(q[a.charAt(c+1)]||0)<<12|(q[a.charAt(c+2)]||0)<<6|(q[a.charAt(c+3)]||0),h[d]=k>>16,h[d+1]=k>>8&255,h[d+2]=k&255,d+=3;e=3*e-[0,0,2,1][b];return h.subarray(0,e)}function m(a){var e,h,b=a.length,d=0,c=new Uint8Array(new ArrayBuffer(3*b));for(e=0;e<b;e+=1)h=a[e],128>h?c[d++]=h:(2048>h?c[d++]=192|h>>>6:(c[d++]=224|h>>>12&15,c[d++]=128|h>>>6&63),c[d++]=128|h&63);return c.subarray(0,
d)}function f(a){var e,h,b,d,c=a.length,k=new Uint8Array(new ArrayBuffer(c)),q=0;for(e=0;e<c;e+=1)h=a[e],128>h?k[q++]=h:(e+=1,b=a[e],224>h?k[q++]=(h&31)<<6|b&63:(e+=1,d=a[e],k[q++]=(h&15)<<12|(b&63)<<6|d&63));return k.subarray(0,q)}function n(a){return l(g(a))}function b(a){return String.fromCharCode.apply(String,c(a))}function p(a){return f(g(a))}function r(a){a=f(a);for(var e="",h=0;h<a.length;)e+=String.fromCharCode.apply(String,a.subarray(h,h+45E3)),h+=45E3;return e}function d(a,e,h){var b,d,
c,k="";for(c=e;c<h;c+=1)e=a.charCodeAt(c)&255,128>e?k+=String.fromCharCode(e):(c+=1,b=a.charCodeAt(c)&255,224>e?k+=String.fromCharCode((e&31)<<6|b&63):(c+=1,d=a.charCodeAt(c)&255,k+=String.fromCharCode((e&15)<<12|(b&63)<<6|d&63)));return k}function k(a,e){function h(){var k=c+1E5;k>a.length&&(k=a.length);b+=d(a,c,k);c=k;k=c===a.length;e(b,k)&&!k&&runtime.setTimeout(h,0)}var b="",c=0;1E5>a.length?e(d(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),h())}function a(a){return m(g(a))}function e(a){return String.fromCharCode.apply(String,
m(a))}function h(a){return String.fromCharCode.apply(String,m(g(a)))}var q=function(a){var e={},h,b;h=0;for(b=a.length;h<b;h+=1)e[a.charAt(h)]=h;return e}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),u,x,v=runtime.getWindow(),y,w;v&&v.btoa?(y=v.btoa,u=function(a){return y(h(a))}):(y=n,u=function(e){return l(a(e))});v&&v.atob?(w=v.atob,x=function(a){a=w(a);return d(a,0,a.length)}):(w=b,x=function(a){return r(c(a))});core.Base64=function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=
l;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=c;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=m;this.convertByteArrayToUTF16Array=this.convertUTF8ArrayToUTF16Array=f;this.convertUTF8StringToBase64=n;this.convertBase64ToUTF8String=b;this.convertUTF8StringToUTF16Array=p;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=r;this.convertUTF8StringToUTF16String=k;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=a;this.convertUTF16ArrayToUTF8String=
e;this.convertUTF16StringToUTF8String=h;this.convertUTF16StringToBase64=u;this.convertBase64ToUTF16String=x;this.fromBase64=b;this.toBase64=n;this.atob=w;this.btoa=y;this.utob=h;this.btou=k;this.encode=u;this.encodeURI=function(a){return u(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return x(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))};return this};return core.Base64}core.Base64=makeBase64();
// Input 3
core.RawDeflate=function(){function g(){this.dl=this.fc=0}function l(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function c(a,e,h,b){this.good_length=a;this.max_lazy=e;this.nice_length=h;this.max_chain=b}function m(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=f;this.off=0}var f=8192,n,b,p,r,d=null,k,a,e,h,q,u,x,v,y,w,t,s,D,A,B,M,z,K,F,Q,$,ia,R,ma,ba,ga,S,Y,V,G,I,ha,N,O,Z,ka,ca,T,P,L,ea,E,U,H,la,fa,W,ja,C,sa,na,ta=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],oa=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],za=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],va=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],wa;wa=[new c(0,0,0,0),new c(4,4,8,4),new c(4,5,16,8),new c(4,6,32,32),new c(4,4,16,16),new c(8,16,32,32),new c(8,16,128,128),new c(8,32,128,256),new c(32,128,258,1024),new c(32,258,258,4096)];var da=function(e){d[a+k++]=e;if(a+k===f){var h;if(0!==k){null!==n?(e=n,n=n.next):e=new m;
e.next=null;e.len=e.off=0;null===b?b=p=e:p=p.next=e;e.len=k-a;for(h=0;h<e.len;h++)e.ptr[h]=d[a+h];k=a=0}}},X=function(e){e&=65535;a+k<f-2?(d[a+k++]=e&255,d[a+k++]=e>>>8):(da(e&255),da(e>>>8))},qa=function(){t=(t<<5^h[z+3-1]&255)&8191;s=x[32768+t];x[z&32767]=s;x[32768+t]=z},aa=function(a,e){y>16-e?(v|=a<<y,X(v),v=a>>16-y,y+=e-16):(v|=a<<y,y+=e)},J=function(a,e){aa(e[a].fc,e[a].dl)},pa=function(a,e,h){return a[e].fc<a[h].fc||a[e].fc===a[h].fc&&ca[e]<=ca[h]},Aa=function(a,e,h){var b;for(b=0;b<h&&na<
sa.length;b++)a[e+b]=sa.charCodeAt(na++)&255;return b},ua=function(){var a,e,b=65536-Q-z;if(-1===b)b--;else if(65274<=z){for(a=0;32768>a;a++)h[a]=h[a+32768];K-=32768;z-=32768;w-=32768;for(a=0;8192>a;a++)e=x[32768+a],x[32768+a]=32768<=e?e-32768:0;for(a=0;32768>a;a++)e=x[a],x[a]=32768<=e?e-32768:0;b+=32768}F||(a=Aa(h,z+Q,b),0>=a?F=!0:Q+=a)},ya=function(a){var e=$,b=z,d,c=M,k=32506<z?z-32506:0,q=z+258,f=h[b+c-1],s=h[b+c];M>=ma&&(e>>=2);do if(d=a,h[d+c]===s&&h[d+c-1]===f&&h[d]===h[b]&&h[++d]===h[b+1]){b+=
2;d++;do++b;while(h[b]===h[++d]&&h[++b]===h[++d]&&h[++b]===h[++d]&&h[++b]===h[++d]&&h[++b]===h[++d]&&h[++b]===h[++d]&&h[++b]===h[++d]&&h[++b]===h[++d]&&b<q);d=258-(q-b);b=q-258;if(d>c){K=a;c=d;if(258<=d)break;f=h[b+c-1];s=h[b+c]}a=x[a&32767]}while(a>k&&0!==--e);return c},ra=function(a,e){u[U++]=e;0===a?ba[e].fc++:(a--,ba[T[e]+256+1].fc++,ga[(256>a?P[a]:P[256+(a>>7)])&255].fc++,q[H++]=a,fa|=W);W<<=1;0===(U&7)&&(E[la++]=fa,fa=0,W=1);if(2<R&&0===(U&4095)){var h=8*U,b=z-w,d;for(d=0;30>d;d++)h+=ga[d].fc*
(5+oa[d]);h>>=3;if(H<parseInt(U/2,10)&&h<parseInt(b/2,10))return!0}return 8191===U||8192===H},xa=function(a,e){for(var h=O[e],b=e<<1;b<=Z;){b<Z&&pa(a,O[b+1],O[b])&&b++;if(pa(a,h,O[b]))break;O[e]=O[b];e=b;b<<=1}O[e]=h},Ba=function(a,e){var h=0;do h|=a&1,a>>=1,h<<=1;while(0<--e);return h>>1},Ea=function(a,e){var h=[];h.length=16;var b=0,d;for(d=1;15>=d;d++)b=b+N[d-1]<<1,h[d]=b;for(b=0;b<=e;b++)d=a[b].dl,0!==d&&(a[b].fc=Ba(h[d]++,d))},Da=function(a){var e=a.dyn_tree,h=a.static_tree,b=a.elems,d,c=-1,
k=b;Z=0;ka=573;for(d=0;d<b;d++)0!==e[d].fc?(O[++Z]=c=d,ca[d]=0):e[d].dl=0;for(;2>Z;)d=O[++Z]=2>c?++c:0,e[d].fc=1,ca[d]=0,ja--,null!==h&&(C-=h[d].dl);a.max_code=c;for(d=Z>>1;1<=d;d--)xa(e,d);do d=O[1],O[1]=O[Z--],xa(e,1),h=O[1],O[--ka]=d,O[--ka]=h,e[k].fc=e[d].fc+e[h].fc,ca[k]=ca[d]>ca[h]+1?ca[d]:ca[h]+1,e[d].dl=e[h].dl=k,O[1]=k++,xa(e,1);while(2<=Z);O[--ka]=O[1];k=a.dyn_tree;d=a.extra_bits;var b=a.extra_base,h=a.max_code,q=a.max_length,f=a.static_tree,s,g,l,p,B=0;for(g=0;15>=g;g++)N[g]=0;k[O[ka]].dl=
0;for(a=ka+1;573>a;a++)s=O[a],g=k[k[s].dl].dl+1,g>q&&(g=q,B++),k[s].dl=g,s>h||(N[g]++,l=0,s>=b&&(l=d[s-b]),p=k[s].fc,ja+=p*(g+l),null!==f&&(C+=p*(f[s].dl+l)));if(0!==B){do{for(g=q-1;0===N[g];)g--;N[g]--;N[g+1]+=2;N[q]--;B-=2}while(0<B);for(g=q;0!==g;g--)for(s=N[g];0!==s;)d=O[--a],d>h||(k[d].dl!==g&&(ja+=(g-k[d].dl)*k[d].fc,k[d].fc=g),s--)}Ea(e,c)},Fa=function(a,e){var h,b=-1,d,c=a[0].dl,k=0,q=7,f=4;0===c&&(q=138,f=3);a[e+1].dl=65535;for(h=0;h<=e;h++)d=c,c=a[h+1].dl,++k<q&&d===c||(k<f?V[d].fc+=k:0!==
d?(d!==b&&V[d].fc++,V[16].fc++):10>=k?V[17].fc++:V[18].fc++,k=0,b=d,0===c?(q=138,f=3):d===c?(q=6,f=3):(q=7,f=4))},Ga=function(){8<y?X(v):0<y&&da(v);y=v=0},Ha=function(a,e){var h,b=0,d=0,c=0,k=0,f,g;if(0!==U){do 0===(b&7)&&(k=E[c++]),h=u[b++]&255,0===(k&1)?J(h,a):(f=T[h],J(f+256+1,a),g=ta[f],0!==g&&(h-=L[f],aa(h,g)),h=q[d++],f=(256>h?P[h]:P[256+(h>>7)])&255,J(f,e),g=oa[f],0!==g&&(h-=ea[f],aa(h,g))),k>>=1;while(b<U)}J(256,a)},Ia=function(a,e){var h,b=-1,d,c=a[0].dl,k=0,q=7,f=4;0===c&&(q=138,f=3);for(h=
0;h<=e;h++)if(d=c,c=a[h+1].dl,!(++k<q&&d===c)){if(k<f){do J(d,V);while(0!==--k)}else 0!==d?(d!==b&&(J(d,V),k--),J(16,V),aa(k-3,2)):10>=k?(J(17,V),aa(k-3,3)):(J(18,V),aa(k-11,7));k=0;b=d;0===c?(q=138,f=3):d===c?(q=6,f=3):(q=7,f=4)}},Ja=function(){var a;for(a=0;286>a;a++)ba[a].fc=0;for(a=0;30>a;a++)ga[a].fc=0;for(a=0;19>a;a++)V[a].fc=0;ba[256].fc=1;fa=U=H=la=ja=C=0;W=1},Ca=function(a){var e,b,d,c;c=z-w;E[la]=fa;Da(G);Da(I);Fa(ba,G.max_code);Fa(ga,I.max_code);Da(ha);for(d=18;3<=d&&0===V[va[d]].dl;d--);
ja+=3*(d+1)+14;e=ja+3+7>>3;b=C+3+7>>3;b<=e&&(e=b);if(c+4<=e&&0<=w)for(aa(0+a,3),Ga(),X(c),X(~c),d=0;d<c;d++)da(h[w+d]);else if(b===e)aa(2+a,3),Ha(S,Y);else{aa(4+a,3);c=G.max_code+1;e=I.max_code+1;d+=1;aa(c-257,5);aa(e-1,5);aa(d-4,4);for(b=0;b<d;b++)aa(V[va[b]].dl,3);Ia(ba,c-1);Ia(ga,e-1);Ha(ba,ga)}Ja();0!==a&&Ga()},Ka=function(e,h,c){var q,f,g;for(q=0;null!==b&&q<c;){f=c-q;f>b.len&&(f=b.len);for(g=0;g<f;g++)e[h+q+g]=b.ptr[b.off+g];b.off+=f;b.len-=f;q+=f;0===b.len&&(f=b,b=b.next,f.next=n,n=f)}if(q===
c)return q;if(a<k){f=c-q;f>k-a&&(f=k-a);for(g=0;g<f;g++)e[h+q+g]=d[a+g];a+=f;q+=f;k===a&&(k=a=0)}return q},La=function(d,c,q){var f;if(!r){if(!F){y=v=0;var g,l;if(0===Y[0].dl){G.dyn_tree=ba;G.static_tree=S;G.extra_bits=ta;G.extra_base=257;G.elems=286;G.max_length=15;G.max_code=0;I.dyn_tree=ga;I.static_tree=Y;I.extra_bits=oa;I.extra_base=0;I.elems=30;I.max_length=15;I.max_code=0;ha.dyn_tree=V;ha.static_tree=null;ha.extra_bits=za;ha.extra_base=0;ha.elems=19;ha.max_length=7;for(l=g=ha.max_code=0;28>
l;l++)for(L[l]=g,f=0;f<1<<ta[l];f++)T[g++]=l;T[g-1]=l;for(l=g=0;16>l;l++)for(ea[l]=g,f=0;f<1<<oa[l];f++)P[g++]=l;for(g>>=7;30>l;l++)for(ea[l]=g<<7,f=0;f<1<<oa[l]-7;f++)P[256+g++]=l;for(f=0;15>=f;f++)N[f]=0;for(f=0;143>=f;)S[f++].dl=8,N[8]++;for(;255>=f;)S[f++].dl=9,N[9]++;for(;279>=f;)S[f++].dl=7,N[7]++;for(;287>=f;)S[f++].dl=8,N[8]++;Ea(S,287);for(f=0;30>f;f++)Y[f].dl=5,Y[f].fc=Ba(f,5);Ja()}for(f=0;8192>f;f++)x[32768+f]=0;ia=wa[R].max_lazy;ma=wa[R].good_length;$=wa[R].max_chain;w=z=0;Q=Aa(h,0,65536);
if(0>=Q)F=!0,Q=0;else{for(F=!1;262>Q&&!F;)ua();for(f=t=0;2>f;f++)t=(t<<5^h[f]&255)&8191}b=null;a=k=0;3>=R?(M=2,B=0):(B=2,A=0);e=!1}r=!0;if(0===Q)return e=!0,0}f=Ka(d,c,q);if(f===q)return q;if(e)return f;if(3>=R)for(;0!==Q&&null===b;){qa();0!==s&&32506>=z-s&&(B=ya(s),B>Q&&(B=Q));if(3<=B)if(l=ra(z-K,B-3),Q-=B,B<=ia){B--;do z++,qa();while(0!==--B);z++}else z+=B,B=0,t=h[z]&255,t=(t<<5^h[z+1]&255)&8191;else l=ra(0,h[z]&255),Q--,z++;l&&(Ca(0),w=z);for(;262>Q&&!F;)ua()}else for(;0!==Q&&null===b;){qa();M=
B;D=K;B=2;0!==s&&M<ia&&32506>=z-s&&(B=ya(s),B>Q&&(B=Q),3===B&&4096<z-K&&B--);if(3<=M&&B<=M){l=ra(z-1-D,M-3);Q-=M-1;M-=2;do z++,qa();while(0!==--M);A=0;B=2;z++;l&&(Ca(0),w=z)}else 0!==A?ra(0,h[z-1]&255)&&(Ca(0),w=z):A=1,z++,Q--;for(;262>Q&&!F;)ua()}0===Q&&(0!==A&&ra(0,h[z-1]&255),Ca(1),e=!0);return f+Ka(d,f+c,q-f)};this.deflate=function(a,e){var c,k;sa=a;na=0;"undefined"===String(typeof e)&&(e=6);(c=e)?1>c?c=1:9<c&&(c=9):c=6;R=c;F=r=!1;if(null===d){n=b=p=null;d=[];d.length=f;h=[];h.length=65536;q=
[];q.length=8192;u=[];u.length=32832;x=[];x.length=65536;ba=[];ba.length=573;for(c=0;573>c;c++)ba[c]=new g;ga=[];ga.length=61;for(c=0;61>c;c++)ga[c]=new g;S=[];S.length=288;for(c=0;288>c;c++)S[c]=new g;Y=[];Y.length=30;for(c=0;30>c;c++)Y[c]=new g;V=[];V.length=39;for(c=0;39>c;c++)V[c]=new g;G=new l;I=new l;ha=new l;N=[];N.length=16;O=[];O.length=573;ca=[];ca.length=573;T=[];T.length=256;P=[];P.length=512;L=[];L.length=29;ea=[];ea.length=30;E=[];E.length=1024}var s=Array(1024),B=[],m=[];for(c=La(s,
0,s.length);0<c;){m.length=c;for(k=0;k<c;k++)m[k]=String.fromCharCode(s[k]);B[B.length]=m.join("");c=La(s,0,s.length)}sa="";return B.join("")}};
// Input 4
core.ByteArray=function(g){this.pos=0;this.data=g;this.readUInt32LE=function(){this.pos+=4;var g=this.data,c=this.pos;return g[--c]<<24|g[--c]<<16|g[--c]<<8|g[--c]};this.readUInt16LE=function(){this.pos+=2;var g=this.data,c=this.pos;return g[--c]<<8|g[--c]}};
// Input 5
core.ByteArrayWriter=function(g){function l(b){b>f-m&&(f=Math.max(2*f,m+b),b=new Uint8Array(new ArrayBuffer(f)),b.set(n),n=b)}var c=this,m=0,f=1024,n=new Uint8Array(new ArrayBuffer(f));this.appendByteArrayWriter=function(b){c.appendByteArray(b.getByteArray())};this.appendByteArray=function(b){var c=b.length;l(c);n.set(b,m);m+=c};this.appendArray=function(b){var c=b.length;l(c);n.set(b,m);m+=c};this.appendUInt16LE=function(b){c.appendArray([b&255,b>>8&255])};this.appendUInt32LE=function(b){c.appendArray([b&
255,b>>8&255,b>>16&255,b>>24&255])};this.appendString=function(b){c.appendByteArray(runtime.byteArrayFromString(b,g))};this.getLength=function(){return m};this.getByteArray=function(){var b=new Uint8Array(new ArrayBuffer(m));b.set(n.subarray(0,m));return b}};
// Input 6
core.RawInflate=function(){var g,l,c=null,m,f,n,b,p,r,d,k,a,e,h,q,u,x,v=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],y=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],t=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],s=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],A=function(){this.list=this.next=null},B=function(){this.n=this.b=this.e=0;this.t=null},M=function(a,e,h,b,d,c){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var k=Array(this.BMAX+1),q,f,g,s,l,p,m,r=Array(this.BMAX+1),n,w,u,t=new B,z=Array(this.BMAX);s=Array(this.N_MAX);var K,x=Array(this.BMAX+1),v,F,M;M=this.root=null;for(l=0;l<k.length;l++)k[l]=0;for(l=0;l<r.length;l++)r[l]=0;for(l=0;l<z.length;l++)z[l]=null;for(l=0;l<s.length;l++)s[l]=
0;for(l=0;l<x.length;l++)x[l]=0;q=256<e?a[256]:this.BMAX;n=a;w=0;l=e;do k[n[w]]++,w++;while(0<--l);if(k[0]==e)this.root=null,this.status=this.m=0;else{for(p=1;p<=this.BMAX&&0==k[p];p++);m=p;c<p&&(c=p);for(l=this.BMAX;0!=l&&0==k[l];l--);g=l;c>l&&(c=l);for(v=1<<p;p<l;p++,v<<=1)if(0>(v-=k[p])){this.status=2;this.m=c;return}if(0>(v-=k[l]))this.status=2,this.m=c;else{k[l]+=v;x[1]=p=0;n=k;w=1;for(u=2;0<--l;)x[u++]=p+=n[w++];n=a;l=w=0;do 0!=(p=n[w++])&&(s[x[p]++]=l);while(++l<e);e=x[g];x[0]=l=0;n=s;w=0;
s=-1;K=r[0]=0;u=null;for(F=0;m<=g;m++)for(a=k[m];0<a--;){for(;m>K+r[1+s];){K+=r[1+s];s++;F=(F=g-K)>c?c:F;if((f=1<<(p=m-K))>a+1)for(f-=a+1,u=m;++p<F&&!((f<<=1)<=k[++u]);)f-=k[u];K+p>q&&K<q&&(p=q-K);F=1<<p;r[1+s]=p;u=Array(F);for(f=0;f<F;f++)u[f]=new B;M=null==M?this.root=new A:M.next=new A;M.next=null;M.list=u;z[s]=u;0<s&&(x[s]=l,t.b=r[s],t.e=16+p,t.t=u,p=(l&(1<<K)-1)>>K-r[s],z[s-1][p].e=t.e,z[s-1][p].b=t.b,z[s-1][p].n=t.n,z[s-1][p].t=t.t)}t.b=m-K;w>=e?t.e=99:n[w]<h?(t.e=256>n[w]?16:15,t.n=n[w++]):
(t.e=d[n[w]-h],t.n=b[n[w++]-h]);f=1<<m-K;for(p=l>>K;p<F;p+=f)u[p].e=t.e,u[p].b=t.b,u[p].n=t.n,u[p].t=t.t;for(p=1<<m-1;0!=(l&p);p>>=1)l^=p;for(l^=p;(l&(1<<K)-1)!=x[s];)K-=r[s],s--}this.m=r[1];this.status=0!=v&&1!=g?1:0}}},z=function(a){for(;b<a;){var e=n,h;h=u.length==x?-1:u[x++];n=e|h<<b;b+=8}},K=function(a){return n&v[a]},F=function(a){n>>=a;b-=a},Q=function(b,c,f){var s,B,m;if(0==f)return 0;for(m=0;;){z(h);B=a.list[K(h)];for(s=B.e;16<s;){if(99==s)return-1;F(B.b);s-=16;z(s);B=B.t[K(s)];s=B.e}F(B.b);
if(16==s)l&=32767,b[c+m++]=g[l++]=B.n;else{if(15==s)break;z(s);d=B.n+K(s);F(s);z(q);B=e.list[K(q)];for(s=B.e;16<s;){if(99==s)return-1;F(B.b);s-=16;z(s);B=B.t[K(s)];s=B.e}F(B.b);z(s);k=l-B.n-K(s);for(F(s);0<d&&m<f;)d--,k&=32767,l&=32767,b[c+m++]=g[l++]=g[k++]}if(m==f)return f}p=-1;return m},$,ia=function(b,d,c){var k,f,g,l,p,B,m,r=Array(316);for(k=0;k<r.length;k++)r[k]=0;z(5);B=257+K(5);F(5);z(5);m=1+K(5);F(5);z(4);k=4+K(4);F(4);if(286<B||30<m)return-1;for(f=0;f<k;f++)z(3),r[D[f]]=K(3),F(3);for(;19>
f;f++)r[D[f]]=0;h=7;f=new M(r,19,19,null,null,h);if(0!=f.status)return-1;a=f.root;h=f.m;l=B+m;for(k=g=0;k<l;)if(z(h),p=a.list[K(h)],f=p.b,F(f),f=p.n,16>f)r[k++]=g=f;else if(16==f){z(2);f=3+K(2);F(2);if(k+f>l)return-1;for(;0<f--;)r[k++]=g}else{17==f?(z(3),f=3+K(3),F(3)):(z(7),f=11+K(7),F(7));if(k+f>l)return-1;for(;0<f--;)r[k++]=0;g=0}h=9;f=new M(r,B,257,y,w,h);0==h&&(f.status=1);if(0!=f.status)return-1;a=f.root;h=f.m;for(k=0;k<m;k++)r[k]=r[k+B];q=6;f=new M(r,m,0,t,s,q);e=f.root;q=f.m;return 0==q&&
257<B||0!=f.status?-1:Q(b,d,c)};this.inflate=function(B,v){null==g&&(g=Array(65536));b=n=l=0;p=-1;r=!1;d=k=0;a=null;u=B;x=0;var A=new Uint8Array(new ArrayBuffer(v));a:{var D,S;for(D=0;D<v&&(!r||-1!=p);){if(0<d){if(0!=p)for(;0<d&&D<v;)d--,k&=32767,l&=32767,A[0+D++]=g[l++]=g[k++];else{for(;0<d&&D<v;)d--,l&=32767,z(8),A[0+D++]=g[l++]=K(8),F(8);0==d&&(p=-1)}if(D==v)break}if(-1==p){if(r)break;z(1);0!=K(1)&&(r=!0);F(1);z(2);p=K(2);F(2);a=null;d=0}switch(p){case 0:S=A;var Y=0+D,V=v-D,G=void 0,G=b&7;F(G);
z(16);G=K(16);F(16);z(16);if(G!=(~n&65535))S=-1;else{F(16);d=G;for(G=0;0<d&&G<V;)d--,l&=32767,z(8),S[Y+G++]=g[l++]=K(8),F(8);0==d&&(p=-1);S=G}break;case 1:if(null!=a)S=Q(A,0+D,v-D);else b:{S=A;Y=0+D;V=v-D;if(null==c){for(var I=void 0,G=Array(288),I=void 0,I=0;144>I;I++)G[I]=8;for(;256>I;I++)G[I]=9;for(;280>I;I++)G[I]=7;for(;288>I;I++)G[I]=8;f=7;I=new M(G,288,257,y,w,f);if(0!=I.status){alert("HufBuild error: "+I.status);S=-1;break b}c=I.root;f=I.m;for(I=0;30>I;I++)G[I]=5;$=5;I=new M(G,30,0,t,s,$);
if(1<I.status){c=null;alert("HufBuild error: "+I.status);S=-1;break b}m=I.root;$=I.m}a=c;e=m;h=f;q=$;S=Q(S,Y,V)}break;case 2:S=null!=a?Q(A,0+D,v-D):ia(A,0+D,v-D);break;default:S=-1}if(-1==S)break a;D+=S}}u=null;return A}};
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
core.LoopWatchDog=function(g,l){var c=Date.now(),m=0;this.check=function(){var f;if(g&&(f=Date.now(),f-c>g))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<l&&(m+=1,m>l))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){function g(l,c){c&&Array.isArray(c)?l=(l||[]).concat(c.map(function(c){return g({},c)})):c&&"object"===typeof c?(l=l||{},Object.keys(c).forEach(function(m){l[m]=g(l[m],c[m])})):l=c;return l}this.hashString=function(g){var c=0,m,f;m=0;for(f=g.length;m<f;m+=1)c=(c<<5)-c+g.charCodeAt(m),c|=0;return c};this.mergeObjects=g};
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
(function(){function g(){var c,g,f,n,b;void 0===l&&(b=(c=runtime.getWindow())&&c.document,l={rangeBCRIgnoresElementBCR:!1,unscaledRangeClientRects:!1},b&&(n=b.createElement("div"),n.style.position="absolute",n.style.left="-99999px",n.style.transform="scale(2)",n.style["-webkit-transform"]="scale(2)",g=b.createElement("div"),n.appendChild(g),b.body.appendChild(n),c=b.createRange(),c.selectNode(g),l.rangeBCRIgnoresElementBCR=0===c.getClientRects().length,g.appendChild(b.createTextNode("Rect transform test")),
g=g.getBoundingClientRect(),f=c.getBoundingClientRect(),l.unscaledRangeClientRects=2<Math.abs(g.height-f.height),c.detach(),b.body.removeChild(n),c=Object.keys(l).map(function(b){return b+":"+String(l[b])}).join(", "),runtime.log("Detected browser quirks - "+c)));return l}var l;core.DomUtils=function(){function c(a,e){return 0>=a.compareBoundaryPoints(Range.START_TO_START,e)&&0<=a.compareBoundaryPoints(Range.END_TO_END,e)}function l(a,e){return 0>=a.compareBoundaryPoints(Range.END_TO_START,e)&&0<=
a.compareBoundaryPoints(Range.START_TO_END,e)}function f(a,e){var h=null;a.nodeType===Node.TEXT_NODE&&(0===a.length?(a.parentNode.removeChild(a),e.nodeType===Node.TEXT_NODE&&(h=e)):(e.nodeType===Node.TEXT_NODE&&(a.appendData(e.data),e.parentNode.removeChild(e)),h=a));return h}function n(a){for(var e=a.parentNode;a.firstChild;)e.insertBefore(a.firstChild,a);e.removeChild(a);return e}function b(a,e){for(var h=a.parentNode,d=a.firstChild,c;d;)c=d.nextSibling,b(d,e),d=c;e(a)&&(h=n(a));return h}function p(a,
e){return a===e||Boolean(a.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY)}function r(a,e){for(var h=0,b;a.parentNode!==e;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(b=e.firstChild;b!==a;)h+=1,b=b.nextSibling;return h}function d(a,e,h){Object.keys(e).forEach(function(b){var c=b.split(":"),k=c[1],f=h(c[0]),c=e[b];"object"===typeof c&&Object.keys(c).length?(b=a.getElementsByTagNameNS(f,k)[0]||a.ownerDocument.createElementNS(f,b),a.appendChild(b),d(b,c,h)):
f&&a.setAttributeNS(f,b,c)})}var k=null;this.splitBoundaries=function(a){var e=[],h,b;if(a.startContainer.nodeType===Node.TEXT_NODE||a.endContainer.nodeType===Node.TEXT_NODE){if(h=a.endContainer){h=a.endOffset;b=a.endContainer;if(h<b.childNodes.length)for(b=b.childNodes.item(h),h=0;b.firstChild;)b=b.firstChild;else for(;b.lastChild;)b=b.lastChild,h=b.nodeType===Node.TEXT_NODE?b.textContent.length:b.childNodes.length;h={container:b,offset:h}}a.setEnd(h.container,h.offset);h=a.endContainer;0!==a.endOffset&&
h.nodeType===Node.TEXT_NODE&&(b=h,a.endOffset!==b.length&&(e.push(b.splitText(a.endOffset)),e.push(b)));h=a.startContainer;0!==a.startOffset&&h.nodeType===Node.TEXT_NODE&&(b=h,a.startOffset!==b.length&&(h=b.splitText(a.startOffset),e.push(b),e.push(h),a.setStart(h,0)))}return e};this.containsRange=c;this.rangesIntersect=l;this.getNodesInRange=function(a,e){for(var h=[],b=a.commonAncestorContainer,d,c=a.startContainer.ownerDocument.createTreeWalker(b.nodeType===Node.TEXT_NODE?b.parentNode:b,NodeFilter.SHOW_ALL,
e,!1),b=c.currentNode=a.startContainer;b;){d=e(b);if(d===NodeFilter.FILTER_ACCEPT)h.push(b);else if(d===NodeFilter.FILTER_REJECT)break;b=b.parentNode}h.reverse();for(b=c.nextNode();b;)h.push(b),b=c.nextNode();return h};this.normalizeTextNodes=function(a){a&&a.nextSibling&&(a=f(a,a.nextSibling));a&&a.previousSibling&&f(a.previousSibling,a)};this.rangeContainsNode=function(a,e){var h=e.ownerDocument.createRange(),b=e.ownerDocument.createRange(),d;h.setStart(a.startContainer,a.startOffset);h.setEnd(a.endContainer,
a.endOffset);b.selectNodeContents(e);d=c(h,b);h.detach();b.detach();return d};this.mergeIntoParent=n;this.removeUnwantedNodes=b;this.getElementsByTagNameNS=function(a,e,b){return Array.prototype.slice.call(a.getElementsByTagNameNS(e,b))};this.rangeIntersectsNode=function(a,e){var b=e.ownerDocument.createRange(),d;b.selectNodeContents(e);d=l(a,b);b.detach();return d};this.containsNode=function(a,e){return a===e||a.contains(e)};this.comparePoints=function(a,e,b,d){if(a===b)return d-e;var c=a.compareDocumentPosition(b);
2===c?c=-1:4===c?c=1:10===c?(e=r(a,b),c=e<d?1:-1):(d=r(b,a),c=d<e?-1:1);return c};this.adaptRangeDifferenceToZoomLevel=function(a,e){return g().unscaledRangeClientRects?a:a/e};this.getBoundingClientRect=function(a){var e=a.ownerDocument,b=g();if((!1===b.unscaledRangeClientRects||b.rangeBCRIgnoresElementBCR)&&a.nodeType===Node.ELEMENT_NODE)return a.getBoundingClientRect();var d;k?d=k:k=d=e.createRange();e=d;e.selectNode(a);return e.getBoundingClientRect()};this.mapKeyValObjOntoNode=function(a,e,b){Object.keys(e).forEach(function(d){var c=
d.split(":"),k=c[1],c=b(c[0]),f=e[d];c?(k=a.getElementsByTagNameNS(c,k)[0],k||(k=a.ownerDocument.createElementNS(c,d),a.appendChild(k)),k.textContent=f):runtime.log("Key ignored: "+d)})};this.removeKeyElementsFromNode=function(a,e,b){e.forEach(function(e){var d=e.split(":"),c=d[1];(d=b(d[0]))?(c=a.getElementsByTagNameNS(d,c)[0])?c.parentNode.removeChild(c):runtime.log("Element for "+e+" not found."):runtime.log("Property Name ignored: "+e)})};this.getKeyValRepresentationOfNode=function(a,e){for(var b=
{},d=a.firstElementChild,c;d;){if(c=e(d.namespaceURI))b[c+":"+d.localName]=d.textContent;d=d.nextElementSibling}return b};this.mapObjOntoNode=d;(function(a){var e,b;b=runtime.getWindow();null!==b&&(e=b.navigator.appVersion.toLowerCase(),b=-1===e.indexOf("chrome")&&(-1!==e.indexOf("applewebkit")||-1!==e.indexOf("safari")),e=e.indexOf("msie"),b||e)&&(a.containsNode=p)})(this)};return core.DomUtils})();
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(g,l){function c(a){a.parentNode&&(p.push(a.previousSibling),p.push(a.nextSibling),a.parentNode.removeChild(a))}function m(a,e,b){if(e.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(e),"putCursorIntoTextNode: invalid container");var d=e.parentNode;runtime.assert(Boolean(d),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=e.length,"putCursorIntoTextNode: offset is out of bounds");0===b?d.insertBefore(a,e):(b!==e.length&&e.splitText(b),d.insertBefore(a,
e.nextSibling))}else e.nodeType===Node.ELEMENT_NODE&&e.insertBefore(a,e.childNodes.item(b));p.push(a.previousSibling);p.push(a.nextSibling)}var f=g.createElementNS("urn:webodf:names:cursor","cursor"),n=g.createElementNS("urn:webodf:names:cursor","anchor"),b,p=[],r=null,d,k=new core.DomUtils;this.getNode=function(){return f};this.getAnchorNode=function(){return n.parentNode?n:f};this.getSelectedRange=function(){d?(r.setStartBefore(f),r.collapse(!0)):(r.setStartAfter(b?n:f),r.setEndBefore(b?f:n));return r};
this.setSelectedRange=function(a,e){r&&r!==a&&r.detach();r=a;b=!1!==e;(d=a.collapsed)?(c(n),c(f),m(f,a.startContainer,a.startOffset)):(c(n),c(f),m(b?f:n,a.endContainer,a.endOffset),m(b?n:f,a.startContainer,a.startOffset));p.forEach(k.normalizeTextNodes);p.length=0};this.hasForwardSelection=function(){return b};this.remove=function(){c(f);p.forEach(k.normalizeTextNodes);p.length=0};f.setAttributeNS("urn:webodf:names:cursor","memberId",l);n.setAttributeNS("urn:webodf:names:cursor","memberId",l)};
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
core.EventNotifier=function(g){var l={};this.emit=function(c,g){var f,n;runtime.assert(l.hasOwnProperty(c),'unknown event fired "'+c+'"');n=l[c];for(f=0;f<n.length;f+=1)n[f](g)};this.subscribe=function(c,g){runtime.assert(l.hasOwnProperty(c),'tried to subscribe to unknown event "'+c+'"');l[c].push(g);runtime.log('event "'+c+'" subscribed.')};this.unsubscribe=function(c,g){var f;runtime.assert(l.hasOwnProperty(c),'tried to unsubscribe from unknown event "'+c+'"');f=l[c].indexOf(g);runtime.assert(-1!==
f,'tried to unsubscribe unknown callback from event "'+c+'"');-1!==f&&l[c].splice(f,1);runtime.log('event "'+c+'" unsubscribed.')};(function(){var c,m;for(c=0;c<g.length;c+=1)m=g[c],runtime.assert(!l.hasOwnProperty(m),'Duplicated event ids: "'+m+'" registered more than once.'),l[m]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var g=runtime.getWindow().document,l=g.getElementById("testarea");runtime.assert(!l,'Unclean test environment, found a div with id "testarea".');l=g.createElement("div");l.setAttribute("id","testarea");g.body.appendChild(l);return l};
core.UnitTest.cleanupTestAreaDiv=function(){var g=runtime.getWindow().document,l=g.getElementById("testarea");runtime.assert(!!l&&l.parentNode===g.body,'Test environment broken, found no div with id "testarea" below body.');g.body.removeChild(l)};core.UnitTest.createOdtDocument=function(g,l){var c="<?xml version='1.0' encoding='UTF-8'?>",c=c+"<office:document";Object.keys(l).forEach(function(g){c+=" xmlns:"+g+'="'+l[g]+'"'});c+=">";c+=g;c+="</office:document>";return runtime.parseXML(c)};
core.UnitTestRunner=function(){function g(c){b+=1;runtime.log("fail",c)}function l(b,d){var c;try{if(b.length!==d.length)return g("array of length "+b.length+" should be "+d.length+" long"),!1;for(c=0;c<b.length;c+=1)if(b[c]!==d[c])return g(b[c]+" should be "+d[c]+" at array index "+c),!1}catch(a){return!1}return!0}function c(b,d,k){var a=b.attributes,e=a.length,h,f,l;for(h=0;h<e;h+=1)if(f=a.item(h),"xmlns"!==f.prefix&&"urn:webodf:names:steps"!==f.namespaceURI){l=d.getAttributeNS(f.namespaceURI,f.localName);
if(!d.hasAttributeNS(f.namespaceURI,f.localName))return g("Attribute "+f.localName+" with value "+f.value+" was not present"),!1;if(l!==f.value)return g("Attribute "+f.localName+" was "+l+" should be "+f.value),!1}return k?!0:c(d,b,!0)}function m(b,d){if(b.nodeType!==d.nodeType)return g("Nodetype '"+b.nodeType+"' should be '"+d.nodeType+"'"),!1;if(b.nodeType===Node.TEXT_NODE){if(b.data===d.data)return!0;g("Textnode data '"+b.data+"' should be '"+d.data+"'");return!1}runtime.assert(b.nodeType===Node.ELEMENT_NODE,
"Only textnodes and elements supported.");if(b.namespaceURI!==d.namespaceURI)return g("namespace '"+b.namespaceURI+"' should be '"+d.namespaceURI+"'"),!1;if(b.localName!==d.localName)return g("localName '"+b.localName+"' should be '"+d.localName+"'"),!1;if(!c(b,d,!1))return!1;for(var k=b.firstChild,a=d.firstChild;k;){if(!a)return g("Nodetype '"+k.nodeType+"' is unexpected here."),!1;if(!m(k,a))return!1;k=k.nextSibling;a=a.nextSibling}return a?(g("Nodetype '"+a.nodeType+"' is missing here."),!1):!0}
function f(b,d){return 0===d?b===d&&1/b===1/d:b===d?!0:"number"===typeof d&&isNaN(d)?"number"===typeof b&&isNaN(b):Object.prototype.toString.call(d)===Object.prototype.toString.call([])?l(b,d):"object"===typeof d&&"object"===typeof b?d.constructor===Element||d.constructor===Node?m(d,b):p(d,b):!1}function n(b,d,c){"string"===typeof d&&"string"===typeof c||runtime.log("WARN: shouldBe() expects string arguments");var a,e;try{e=eval(d)}catch(h){a=h}b=eval(c);a?g(d+" should be "+b+". Threw exception "+
a):f(e,b)?runtime.log("pass",d+" is "+c):String(typeof e)===String(typeof b)?(c=0===e&&0>1/e?"-0":String(e),g(d+" should be "+b+". Was "+c+".")):g(d+" should be "+b+" (of type "+typeof b+"). Was "+e+" (of type "+typeof e+").")}var b=0,p;p=function(b,d){var c=Object.keys(b),a=Object.keys(d);c.sort();a.sort();return l(c,a)&&Object.keys(b).every(function(a){var h=b[a],c=d[a];return f(h,c)?!0:(g(h+" should be "+c+" for key "+a),!1)})};this.areNodesEqual=m;this.shouldBeNull=function(b,d){n(b,d,"null")};
this.shouldBeNonNull=function(b,d){var c,a;try{a=eval(d)}catch(e){c=e}c?g(d+" should be non-null. Threw exception "+c):null!==a?runtime.log("pass",d+" is non-null."):g(d+" should be non-null. Was "+a)};this.shouldBe=n;this.countFailedTests=function(){return b}};
core.UnitTester=function(){function g(c,f){return"<span style='color:blue;cursor:pointer' onclick='"+f+"'>"+c+"</span>"}var l=0,c={};this.runTests=function(m,f,n){function b(a){if(0===a.length)c[p]=k,l+=r.countFailedTests(),f();else{e=a[0];var h=Runtime.getFunctionName(e);runtime.log("Running "+h);q=r.countFailedTests();d.setUp();e(function(){d.tearDown();k[h]=q===r.countFailedTests();b(a.slice(1))})}}var p=Runtime.getFunctionName(m)||"",r=new core.UnitTestRunner,d=new m(r),k={},a,e,h,q,u="BrowserRuntime"===
runtime.type();if(c.hasOwnProperty(p))runtime.log("Test "+p+" has already run.");else{u?runtime.log("<span>Running "+g(p,'runSuite("'+p+'");')+": "+d.description()+"</span>"):runtime.log("Running "+p+": "+d.description);h=d.tests();for(a=0;a<h.length;a+=1)e=h[a],m=Runtime.getFunctionName(e)||e.testName,n.length&&-1===n.indexOf(m)||(u?runtime.log("<span>Running "+g(m,'runTest("'+p+'","'+m+'")')+"</span>"):runtime.log("Running "+m),q=r.countFailedTests(),d.setUp(),e(),d.tearDown(),k[m]=q===r.countFailedTests());
b(d.asyncTests())}};this.countFailedTests=function(){return l};this.results=function(){return c}};
// Input 13
core.PositionIterator=function(g,l,c,m){function f(){this.acceptNode=function(a){return!a||a.nodeType===e&&0===a.length?u:q}}function n(a){this.acceptNode=function(b){return!b||b.nodeType===e&&0===b.length?u:a.acceptNode(b)}}function b(){var a=d.currentNode,b=a.nodeType;k=b===e?a.length-1:b===h?1:0}function p(){if(null===d.previousSibling()){if(!d.parentNode()||d.currentNode===g)return d.firstChild(),!1;k=0}else b();return!0}var r=this,d,k,a,e=Node.TEXT_NODE,h=Node.ELEMENT_NODE,q=NodeFilter.FILTER_ACCEPT,
u=NodeFilter.FILTER_REJECT;this.nextPosition=function(){var a=d.currentNode,b=a.nodeType;if(a===g)return!1;if(0===k&&b===h)null===d.firstChild()&&(k=1);else if(b===e&&k+1<a.length)k+=1;else if(null!==d.nextSibling())k=0;else if(d.parentNode())k=1;else return!1;return!0};this.previousPosition=function(){var a=!0,h=d.currentNode;0===k?a=p():h.nodeType===e?k-=1:null!==d.lastChild()?b():h===g?a=!1:k=0;return a};this.previousNode=p;this.container=function(){var a=d.currentNode,b=a.nodeType;0===k&&b!==
e&&(a=a.parentNode);return a};this.rightNode=function(){var b=d.currentNode,c=b.nodeType;if(c===e&&k===b.length)for(b=b.nextSibling;b&&a(b)!==q;)b=b.nextSibling;else c===h&&1===k&&(b=null);return b};this.leftNode=function(){var b=d.currentNode;if(0===k)for(b=b.previousSibling;b&&a(b)!==q;)b=b.previousSibling;else if(b.nodeType===h)for(b=b.lastChild;b&&a(b)!==q;)b=b.previousSibling;return b};this.getCurrentNode=function(){return d.currentNode};this.unfilteredDomOffset=function(){if(d.currentNode.nodeType===
e)return k;for(var a=0,b=d.currentNode,b=1===k?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=function(){var a=d.currentNode,b=d.previousSibling();d.currentNode=a;return b};this.getNextSibling=function(){var a=d.currentNode,b=d.nextSibling();d.currentNode=a;return b};this.setUnfilteredPosition=function(b,h){var c,f;runtime.assert(null!==b&&void 0!==b,"PositionIterator.setUnfilteredPosition called without container");d.currentNode=b;if(b.nodeType===e)return k=
h,runtime.assert(h<=b.length,"Error in setPosition: "+h+" > "+b.length),runtime.assert(0<=h,"Error in setPosition: "+h+" < 0"),h===b.length&&(d.nextSibling()?k=0:d.parentNode()?k=1:runtime.assert(!1,"Error in setUnfilteredPosition: position not valid.")),!0;c=a(b);for(f=b.parentNode;f&&f!==g&&c===q;)c=a(f),c!==q&&(d.currentNode=f),f=f.parentNode;h<b.childNodes.length&&c!==NodeFilter.FILTER_REJECT?(d.currentNode=b.childNodes.item(h),c=a(d.currentNode),k=0):k=1;c===NodeFilter.FILTER_REJECT&&(k=1);if(c!==
q)return r.nextPosition();runtime.assert(a(d.currentNode)===q,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");return!0};this.moveToEnd=function(){d.currentNode=g;k=1};this.moveToEndOfNode=function(a){a.nodeType===e?r.setUnfilteredPosition(a,a.length):(d.currentNode=a,k=1)};this.getNodeFilter=function(){return a};a=(c?new n(c):new f).acceptNode;a.acceptNode=a;l=l||4294967295;runtime.assert(g.nodeType!==Node.TEXT_NODE,"Internet Explorer doesn't allow tree walker roots to be text nodes");
d=g.ownerDocument.createTreeWalker(g,l,a,m);k=0;null===d.firstChild()&&(k=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(g){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var g={},l=core.PositionFilter.FilterResult.FILTER_ACCEPT,c=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(m){for(var f in g)if(g.hasOwnProperty(f)&&g[f].acceptPosition(m)===c)return c;return l};this.addFilter=function(c,f){g[c]=f};this.removeFilter=function(c){delete g[c]}};
// Input 16
core.ScheduledTask=function(g,l){function c(){g();n=!1}function m(){n&&(runtime.clearTimeout(f),n=!1)}var f,n=!1;this.trigger=function(){n||(f=runtime.setTimeout(c,l))};this.triggerImmediate=function(){m();c()};this.processRequests=function(){n&&(m(),c())};this.cancel=m;this.destroy=function(b){m();b()}};
// Input 17
core.Async=function(){this.forEach=function(g,l,c){function m(f){b!==n&&(f?(b=n,c(f)):(b+=1,b===n&&c(null)))}var f,n=g.length,b=0;for(f=0;f<n;f+=1)l(g[f],m)};this.destroyAll=function(g,l){function c(m,f){if(f)l(f);else if(m<g.length)g[m](function(f){c(m+1,f)});else l()}c(0,void 0)}};
// Input 18
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(g,l){function c(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],e,h,d=a.length,c=0,c=0;e=-1;for(h=0;h<d;h+=1)c=(e^a[h])&255,c=b[c],e=e>>>8^c;return e^-1}function m(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function f(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function n(a,b){var e,h,d,c,k,f,g,l=this;this.load=function(b){if(void 0!==l.data)b(null,l.data);else{var e=k+34+h+d+256;e+g>q&&(e=q-g);runtime.read(a,g,e,function(e,h){if(e||null===h)b(e,h);else a:{var d=h,g=new core.ByteArray(d),q=g.readUInt32LE(),s;if(67324752!==q)b("File entry signature is wrong."+q.toString()+" "+d.length.toString(),null);else{g.pos+=22;q=g.readUInt16LE();s=g.readUInt16LE();g.pos+=q+s;
if(c){d=d.subarray(g.pos,g.pos+k);if(k!==d.length){b("The amount of compressed bytes read was "+d.length.toString()+" instead of "+k.toString()+" for "+l.filename+" in "+a+".",null);break a}d=x(d,f)}else d=d.subarray(g.pos,g.pos+f);f!==d.length?b("The amount of bytes read was "+d.length.toString()+" instead of "+f.toString()+" for "+l.filename+" in "+a+".",null):(l.data=d,b(null,d))}}})}};this.set=function(a,b,e,d){l.filename=a;l.data=b;l.compressed=e;l.date=d};this.error=null;b&&(e=b.readUInt32LE(),
33639248!==e?this.error="Central directory entry has wrong signature at position "+(b.pos-4).toString()+' for file "'+a+'": '+b.data.length.toString():(b.pos+=6,c=b.readUInt16LE(),this.date=m(b.readUInt32LE()),b.readUInt32LE(),k=b.readUInt32LE(),f=b.readUInt32LE(),h=b.readUInt16LE(),d=b.readUInt16LE(),e=b.readUInt16LE(),b.pos+=8,g=b.readUInt32LE(),this.filename=runtime.byteArrayToString(b.data.subarray(b.pos,b.pos+h),"utf8"),b.pos+=h+d+e))}function b(a,b){if(22!==a.length)b("Central directory length should be 22.",
v);else{var e=new core.ByteArray(a),d;d=e.readUInt32LE();101010256!==d?b("Central directory signature is wrong: "+d.toString(),v):(d=e.readUInt16LE(),0!==d?b("Zip files with non-zero disk numbers are not supported.",v):(d=e.readUInt16LE(),0!==d?b("Zip files with non-zero disk numbers are not supported.",v):(d=e.readUInt16LE(),u=e.readUInt16LE(),d!==u?b("Number of entries is inconsistent.",v):(d=e.readUInt32LE(),e=e.readUInt16LE(),e=q-22-d,runtime.read(g,e,q-e,function(a,e){if(a||null===e)b(a,v);else a:{var d=
new core.ByteArray(e),c,k;h=[];for(c=0;c<u;c+=1){k=new n(g,d);if(k.error){b(k.error,v);break a}h[h.length]=k}b(null,v)}})))))}}function p(a,b){var e=null,d,c;for(c=0;c<h.length;c+=1)if(d=h[c],d.filename===a){e=d;break}e?e.data?b(null,e.data):e.load(b):b(a+" not found.",null)}function r(a){var b=new core.ByteArrayWriter("utf8"),e=0;b.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(e=a.data.length);b.appendUInt32LE(f(a.date));b.appendUInt32LE(c(a.data));b.appendUInt32LE(e);b.appendUInt32LE(e);b.appendUInt16LE(a.filename.length);
b.appendUInt16LE(0);b.appendString(a.filename);a.data&&b.appendByteArray(a.data);return b}function d(a,b){var e=new core.ByteArrayWriter("utf8"),d=0;e.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(d=a.data.length);e.appendUInt32LE(f(a.date));e.appendUInt32LE(c(a.data));e.appendUInt32LE(d);e.appendUInt32LE(d);e.appendUInt16LE(a.filename.length);e.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);e.appendUInt32LE(b);e.appendString(a.filename);return e}function k(a,b){if(a===h.length)b(null);else{var e=h[a];
void 0!==e.data?k(a+1,b):e.load(function(e){e?b(e):k(a+1,b)})}}function a(a,b){k(0,function(e){if(e)b(e);else{e=new core.ByteArrayWriter("utf8");var c,k,f,g=[0];for(c=0;c<h.length;c+=1)e.appendByteArrayWriter(r(h[c])),g.push(e.getLength());f=e.getLength();for(c=0;c<h.length;c+=1)k=h[c],e.appendByteArrayWriter(d(k,g[c]));c=e.getLength()-f;e.appendArray([80,75,5,6,0,0,0,0]);e.appendUInt16LE(h.length);e.appendUInt16LE(h.length);e.appendUInt32LE(c);e.appendUInt32LE(f);e.appendArray([0,0]);a(e.getByteArray())}})}
function e(b,e){a(function(a){runtime.writeFile(b,a,e)},e)}var h,q,u,x=(new core.RawInflate).inflate,v=this,y=new core.Base64;this.load=p;this.save=function(a,b,e,d){var c,k;for(c=0;c<h.length;c+=1)if(k=h[c],k.filename===a){k.set(a,b,e,d);return}k=new n(g);k.set(a,b,e,d);h.push(k)};this.remove=function(a){var b,e;for(b=0;b<h.length;b+=1)if(e=h[b],e.filename===a)return h.splice(b,1),!0;return!1};this.write=function(a){e(g,a)};this.writeAs=e;this.createByteArray=a;this.loadContentXmlAsFragments=function(a,
b){v.loadAsString(a,function(a,e){if(a)return b.rootElementReady(a);b.rootElementReady(null,e,!0)})};this.loadAsString=function(a,b){p(a,function(a,e){if(a||null===e)return b(a,null);var d=runtime.byteArrayToString(e,"utf8");b(null,d)})};this.loadAsDOM=function(a,b){v.loadAsString(a,function(a,e){if(a||null===e)b(a,null);else{var d=(new DOMParser).parseFromString(e,"text/xml");b(null,d)}})};this.loadAsDataURL=function(a,b,e){p(a,function(a,d){if(a||!d)return e(a,null);var h=0,c;b||(b=80===d[1]&&78===
d[2]&&71===d[3]?"image/png":255===d[0]&&216===d[1]&&255===d[2]?"image/jpeg":71===d[0]&&73===d[1]&&70===d[2]?"image/gif":"");for(c="data:"+b+";base64,";h<d.length;)c+=y.convertUTF8ArrayToBase64(d.subarray(h,Math.min(h+45E3,d.length))),h+=45E3;e(null,c)})};this.getEntries=function(){return h.slice()};q=-1;null===l?h=[]:runtime.getFileSize(g,function(a){q=a;0>q?l("File '"+g+"' cannot be read.",v):runtime.read(g,q-22,22,function(a,e){a||null===l||null===e?l(a,v):b(e,l)})})};
// Input 19
core.CSSUnits=function(){var g=this,l={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(c,g,f){return c*l[f]/l[g]};this.convertMeasure=function(c,l){var f,n;c&&l?(f=parseFloat(c),n=c.replace(f.toString(),""),f=g.convert(f,n,l).toString()):f="";return f};this.getUnits=function(c){return c.substr(c.length-2,c.length)}};
// Input 20
xmldom.LSSerializerFilter=function(){};
// Input 21
"function"!==typeof Object.create&&(Object.create=function(g){var l=function(){};l.prototype=g;return new l});
xmldom.LSSerializer=function(){function g(c){var g=c||{},b=function(b){var a={},e;for(e in b)b.hasOwnProperty(e)&&(a[b[e]]=e);return a}(c),l=[g],m=[b],d=0;this.push=function(){d+=1;g=l[d]=Object.create(g);b=m[d]=Object.create(b)};this.pop=function(){l[d]=void 0;m[d]=void 0;d-=1;g=l[d];b=m[d]};this.getLocalNamespaceDefinitions=function(){return b};this.getQName=function(d){var a=d.namespaceURI,e=0,h;if(!a)return d.localName;if(h=b[a])return h+":"+d.localName;do{h||!d.prefix?(h="ns"+e,e+=1):h=d.prefix;
if(g[h]===a)break;if(!g[h]){g[h]=a;b[a]=h;break}h=null}while(null===h);return h+":"+d.localName}}function l(c){return c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function c(f,g){var b="",p=m.filter?m.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,r;if(p===NodeFilter.FILTER_ACCEPT&&g.nodeType===Node.ELEMENT_NODE){f.push();r=f.getQName(g);var d,k=g.attributes,a,e,h,q="",u;d="<"+r;a=k.length;for(e=0;e<a;e+=1)h=k.item(e),"http://www.w3.org/2000/xmlns/"!==
h.namespaceURI&&(u=m.filter?m.filter.acceptNode(h):NodeFilter.FILTER_ACCEPT,u===NodeFilter.FILTER_ACCEPT&&(u=f.getQName(h),h="string"===typeof h.value?l(h.value):h.value,q+=" "+(u+'="'+h+'"')));a=f.getLocalNamespaceDefinitions();for(e in a)a.hasOwnProperty(e)&&((k=a[e])?"xmlns"!==k&&(d+=" xmlns:"+a[e]+'="'+e+'"'):d+=' xmlns="'+e+'"');b+=d+(q+">")}if(p===NodeFilter.FILTER_ACCEPT||p===NodeFilter.FILTER_SKIP){for(p=g.firstChild;p;)b+=c(f,p),p=p.nextSibling;g.nodeValue&&(b+=l(g.nodeValue))}r&&(b+="</"+
r+">",f.pop());return b}var m=this;this.filter=null;this.writeToString=function(f,l){if(!f)return"";var b=new g(l);return c(b,f)}};
// Input 22
xmldom.RelaxNGParser=function(){function g(b,c){this.message=function(){c&&(b+=1===c.nodeType?" Element ":" Node ",b+=c.nodeName,c.nodeValue&&(b+=" with value '"+c.nodeValue+"'"),b+=".");return b}}function l(b){if(2>=b.e.length)return b;var c={name:b.name,e:b.e.slice(0,2)};return l({name:b.name,e:[c].concat(b.e.slice(2))})}function c(b){b=b.split(":",2);var c="",a;1===b.length?b=["",b[0]]:c=b[0];for(a in p)p[a]===c&&(b[0]=a);return b}function m(b,k){for(var a=0,e,h,f=b.name;b.e&&a<b.e.length;)if(e=
b.e[a],"ref"===e.name){h=k[e.a.name];if(!h)throw e.a.name+" was not defined.";e=b.e.slice(a+1);b.e=b.e.slice(0,a);b.e=b.e.concat(h.e);b.e=b.e.concat(e)}else a+=1,m(e,k);e=b.e;"choice"!==f||e&&e[1]&&"empty"!==e[1].name||(e&&e[0]&&"empty"!==e[0].name?(e[1]=e[0],e[0]={name:"empty"}):(delete b.e,b.name="empty"));if("group"===f||"interleave"===f)"empty"===e[0].name?"empty"===e[1].name?(delete b.e,b.name="empty"):(f=b.name=e[1].name,b.names=e[1].names,e=b.e=e[1].e):"empty"===e[1].name&&(f=b.name=e[0].name,
b.names=e[0].names,e=b.e=e[0].e);"oneOrMore"===f&&"empty"===e[0].name&&(delete b.e,b.name="empty");if("attribute"===f){h=b.names?b.names.length:0;for(var g,l=[],p=[],a=0;a<h;a+=1)g=c(b.names[a]),p[a]=g[0],l[a]=g[1];b.localnames=l;b.namespaces=p}"interleave"===f&&("interleave"===e[0].name?b.e="interleave"===e[1].name?e[0].e.concat(e[1].e):[e[1]].concat(e[0].e):"interleave"===e[1].name&&(b.e=[e[0]].concat(e[1].e)))}function f(b,c){for(var a=0,e;b.e&&a<b.e.length;)e=b.e[a],"elementref"===e.name?(e.id=
e.id||0,b.e[a]=c[e.id]):"element"!==e.name&&f(e,c),a+=1}var n=this,b,p={"http://www.w3.org/XML/1998/namespace":"xml"},r;r=function(b,k,a){var e=[],h,f,g=b.localName,m=[];h=b.attributes;var n=g,y=m,w={},t,s;for(t=0;t<h.length;t+=1)if(s=h.item(t),s.namespaceURI)"http://www.w3.org/2000/xmlns/"===s.namespaceURI&&(p[s.value]=s.localName);else{"name"!==s.localName||"element"!==n&&"attribute"!==n||y.push(s.value);if("name"===s.localName||"combine"===s.localName||"type"===s.localName){var D=s,A;A=s.value;
A=A.replace(/^\s\s*/,"");for(var B=/\s/,M=A.length-1;B.test(A.charAt(M));)M-=1;A=A.slice(0,M+1);D.value=A}w[s.localName]=s.value}h=w;h.combine=h.combine||void 0;b=b.firstChild;n=e;y=m;for(w="";b;){if(b.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===b.namespaceURI){if(t=r(b,k,n))"name"===t.name?y.push(p[t.a.ns]+":"+t.text):"choice"===t.name&&t.names&&t.names.length&&(y=y.concat(t.names),delete t.names),n.push(t)}else b.nodeType===Node.TEXT_NODE&&(w+=b.nodeValue);b=b.nextSibling}b=
w;"value"!==g&&"param"!==g&&(b=/^\s*([\s\S]*\S)?\s*$/.exec(b)[1]);"value"===g&&void 0===h.type&&(h.type="token",h.datatypeLibrary="");"attribute"!==g&&"element"!==g||void 0===h.name||(f=c(h.name),e=[{name:"name",text:f[1],a:{ns:f[0]}}].concat(e),delete h.name);"name"===g||"nsName"===g||"value"===g?void 0===h.ns&&(h.ns=""):delete h.ns;"name"===g&&(f=c(b),h.ns=f[0],b=f[1]);1<e.length&&("define"===g||"oneOrMore"===g||"zeroOrMore"===g||"optional"===g||"list"===g||"mixed"===g)&&(e=[{name:"group",e:l({name:"group",
e:e}).e}]);2<e.length&&"element"===g&&(e=[e[0]].concat({name:"group",e:l({name:"group",e:e.slice(1)}).e}));1===e.length&&"attribute"===g&&e.push({name:"text",text:b});1!==e.length||"choice"!==g&&"group"!==g&&"interleave"!==g?2<e.length&&("choice"===g||"group"===g||"interleave"===g)&&(e=l({name:g,e:e}).e):(g=e[0].name,m=e[0].names,h=e[0].a,b=e[0].text,e=e[0].e);"mixed"===g&&(g="interleave",e=[e[0],{name:"text"}]);"optional"===g&&(g="choice",e=[e[0],{name:"empty"}]);"zeroOrMore"===g&&(g="choice",e=
[{name:"oneOrMore",e:[e[0]]},{name:"empty"}]);if("define"===g&&h.combine){a:{n=h.combine;y=h.name;w=e;for(t=0;a&&t<a.length;t+=1)if(s=a[t],"define"===s.name&&s.a&&s.a.name===y){s.e=[{name:n,e:s.e.concat(w)}];a=s;break a}a=null}if(a)return}a={name:g};e&&0<e.length&&(a.e=e);for(f in h)if(h.hasOwnProperty(f)){a.a=h;break}void 0!==b&&(a.text=b);m&&0<m.length&&(a.names=m);"element"===g&&(a.id=k.length,k.push(a),a={name:"elementref",id:a.id});return a};this.parseRelaxNGDOM=function(c,k){var a=[],e=r(c&&
c.documentElement,a,void 0),h,l,u={};for(h=0;h<e.e.length;h+=1)l=e.e[h],"define"===l.name?u[l.a.name]=l:"start"===l.name&&(b=l);if(!b)return[new g("No Relax NG start element was found.")];m(b,u);for(h in u)u.hasOwnProperty(h)&&m(u[h],u);for(h=0;h<a.length;h+=1)m(a[h],u);k&&(n.rootPattern=k(b.e[0],a));f(b,a);for(h=0;h<a.length;h+=1)f(a[h],a);n.start=b;n.elements=a;n.nsmap=p;return null}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function g(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function l(a,b){return function(){var e={},c=0;return function(h){var d=h.hash||h.toString(),k;k=e[d];if(void 0!==k)return k;e[d]=k=b(h);k.hash=a+c.toString();c+=1;return k}}()}function c(a){return function(){var b={};return function(e){var c,h;h=b[e.localName];if(void 0===h)b[e.localName]=h={};else if(c=h[e.namespaceURI],void 0!==c)return c;return h[e.namespaceURI]=c=a(e)}}()}function m(a,
b,e){return function(){var c={},h=0;return function(d,k){var f=b&&b(d,k),g,l;if(void 0!==f)return f;f=d.hash||d.toString();g=k.hash||k.toString();l=c[f];if(void 0===l)c[f]=l={};else if(f=l[g],void 0!==f)return f;l[g]=f=e(d,k);f.hash=a+h.toString();h+=1;return f}}()}function f(a,b){"choice"===b.p1.type?f(a,b.p1):a[b.p1.hash]=b.p1;"choice"===b.p2.type?f(a,b.p2):a[b.p2.hash]=b.p2}function n(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return t},startTagOpenDeriv:function(e){return a.contains(e)?
h(b,s):t},attDeriv:function(){return t},startTagCloseDeriv:function(){return this}}}function b(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return s}}}function p(a,b,e,c){if(b===t)return t;if(c>=e.length)return b;0===c&&(c=0);for(var h=e.item(c);h.namespaceURI===d;){c+=1;if(c>=e.length)return b;h=e.item(c)}return h=p(a,b.attDeriv(a,e.item(c)),e,c+1)}function r(a,b,e){e.e[0].a?(a.push(e.e[0].text),b.push(e.e[0].a.ns)):r(a,b,e.e[0]);e.e[1].a?(a.push(e.e[1].text),b.push(e.e[1].a.ns)):
r(a,b,e.e[1])}var d="http://www.w3.org/2000/xmlns/",k,a,e,h,q,u,x,v,y,w,t={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return t},startTagOpenDeriv:function(){return t},attDeriv:function(){return t},startTagCloseDeriv:function(){return t},endTagDeriv:function(){return t}},s={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return t},startTagOpenDeriv:function(){return t},attDeriv:function(){return t},startTagCloseDeriv:function(){return s},endTagDeriv:function(){return t}},
D={type:"text",nullable:!0,hash:"text",textDeriv:function(){return D},startTagOpenDeriv:function(){return t},attDeriv:function(){return t},startTagCloseDeriv:function(){return D},endTagDeriv:function(){return t}},A,B,M;k=m("choice",function(a,b){if(a===t)return b;if(b===t||a===b)return a},function(a,b){var e={},h;f(e,{p1:a,p2:b});b=a=void 0;for(h in e)e.hasOwnProperty(h)&&(void 0===a?a=e[h]:b=void 0===b?e[h]:k(b,e[h]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(e,c){return k(a.textDeriv(e,c),b.textDeriv(e,c))},startTagOpenDeriv:c(function(e){return k(a.startTagOpenDeriv(e),b.startTagOpenDeriv(e))}),attDeriv:function(e,c){return k(a.attDeriv(e,c),b.attDeriv(e,c))},startTagCloseDeriv:g(function(){return k(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:g(function(){return k(a.endTagDeriv(),b.endTagDeriv())})}}(a,b)});a=function(a,b,e){return function(){var c={},h=0;return function(d,k){var f=b&&b(d,k),g,l;if(void 0!==f)return f;
f=d.hash||d.toString();g=k.hash||k.toString();f<g&&(l=f,f=g,g=l,l=d,d=k,k=l);l=c[f];if(void 0===l)c[f]=l={};else if(f=l[g],void 0!==f)return f;l[g]=f=e(d,k);f.hash=a+h.toString();h+=1;return f}}()}("interleave",function(a,b){if(a===t||b===t)return t;if(a===s)return b;if(b===s)return a},function(b,e){return{type:"interleave",p1:b,p2:e,nullable:b.nullable&&e.nullable,textDeriv:function(c,h){return k(a(b.textDeriv(c,h),e),a(b,e.textDeriv(c,h)))},startTagOpenDeriv:c(function(c){return k(A(function(b){return a(b,
e)},b.startTagOpenDeriv(c)),A(function(e){return a(b,e)},e.startTagOpenDeriv(c)))}),attDeriv:function(c,h){return k(a(b.attDeriv(c,h),e),a(b,e.attDeriv(c,h)))},startTagCloseDeriv:g(function(){return a(b.startTagCloseDeriv(),e.startTagCloseDeriv())})}});e=m("group",function(a,b){if(a===t||b===t)return t;if(a===s)return b;if(b===s)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,h){var d=e(a.textDeriv(c,h),b);return a.nullable?k(d,b.textDeriv(c,
h)):d},startTagOpenDeriv:function(c){var h=A(function(a){return e(a,b)},a.startTagOpenDeriv(c));return a.nullable?k(h,b.startTagOpenDeriv(c)):h},attDeriv:function(c,h){return k(e(a.attDeriv(c,h),b),e(a,b.attDeriv(c,h)))},startTagCloseDeriv:g(function(){return e(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});h=m("after",function(a,b){if(a===t||b===t)return t},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(e,c){return h(a.textDeriv(e,c),b)},startTagOpenDeriv:c(function(e){return A(function(a){return h(a,
b)},a.startTagOpenDeriv(e))}),attDeriv:function(e,c){return h(a.attDeriv(e,c),b)},startTagCloseDeriv:g(function(){return h(a.startTagCloseDeriv(),b)}),endTagDeriv:g(function(){return a.nullable?b:t})}});q=l("oneormore",function(a){return a===t?t:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return e(a.textDeriv(b,c),k(this,s))},startTagOpenDeriv:function(b){var c=this;return A(function(a){return e(a,k(c,s))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return e(a.attDeriv(b,
c),k(this,s))},startTagCloseDeriv:g(function(){return q(a.startTagCloseDeriv())})}});x=m("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(e,c){return a.contains(c)&&(b.nullable&&/^\s+$/.test(c.nodeValue)||b.textDeriv(e,c.nodeValue).nullable)?s:t},startTagCloseDeriv:function(){return t}}});u=l("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,e){return e===a?s:t},attDeriv:function(){return t},startTagCloseDeriv:function(){return this}}});
y=l("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return s},attDeriv:function(){return t},startTagCloseDeriv:function(){return this}}});A=function K(a,b){return"after"===b.type?h(b.p1,a(b.p2)):"choice"===b.type?k(K(a,b.p1),K(a,b.p2)):b};B=function(a,b,e){var c=e.currentNode;b=b.startTagOpenDeriv(c);b=p(a,b,c.attributes,0);var h=b=b.startTagCloseDeriv(),c=e.currentNode;b=e.firstChild();for(var d=[],f;b;)b.nodeType===Node.ELEMENT_NODE?d.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||d.push(b.nodeValue),b=e.nextSibling();0===d.length&&(d=[""]);f=h;for(h=0;f!==t&&h<d.length;h+=1)b=d[h],"string"===typeof b?f=/^\s*$/.test(b)?k(f,f.textDeriv(a,b)):f.textDeriv(a,b):(e.currentNode=b,f=B(a,f,e));e.currentNode=c;return b=f.endTagDeriv()};v=function(a){var b,e,c;if("name"===a.name)b=a.text,e=a.a.ns,a={name:b,ns:e,hash:"{"+e+"}"+b,contains:function(a){return a.namespaceURI===e&&a.localName===b}};else if("choice"===a.name){b=[];e=[];r(b,e,a);a="";for(c=0;c<b.length;c+=
1)a+="{"+e[c]+"}"+b[c]+",";a={hash:a,contains:function(a){var c;for(c=0;c<b.length;c+=1)if(b[c]===a.localName&&e[c]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};w=function F(c,h){var d,f;if("elementref"===c.name){d=c.id||0;c=h[d];if(void 0!==c.name){var g=c;d=h[g.id]={hash:"element"+g.id.toString()};g=n(v(g.e[0]),w(g.e[1],h));for(f in g)g.hasOwnProperty(f)&&(d[f]=g[f]);return d}return c}switch(c.name){case "empty":return s;case "notAllowed":return t;
case "text":return D;case "choice":return k(F(c.e[0],h),F(c.e[1],h));case "interleave":d=F(c.e[0],h);for(f=1;f<c.e.length;f+=1)d=a(d,F(c.e[f],h));return d;case "group":return e(F(c.e[0],h),F(c.e[1],h));case "oneOrMore":return q(F(c.e[0],h));case "attribute":return x(v(c.e[0]),F(c.e[1],h));case "value":return u(c.text);case "data":return d=c.a&&c.a.type,void 0===d&&(d=""),y(d);case "list":return b()}throw"No support for "+c.name;};this.makePattern=function(a,b){var e={},c;for(c in b)b.hasOwnProperty(c)&&
(e[c]=b[c]);return c=w(a,e)};this.validate=function(a,b){var e;a.currentNode=a.root;e=B(null,M,a);e.nullable?b(null):(runtime.log("Error in Relax NG validation: "+e),b(["Error in Relax NG validation: "+e]))};this.init=function(a){M=a}};
// Input 24
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function g(b,c){this.message=function(){c&&(b+=c.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",b+=c.nodeName,c.nodeValue&&(b+=" with value '"+c.nodeValue+"'"),b+=".");return b}}function l(b,c,g,d){return"empty"===b.name?null:f(b,c,g,d)}function c(b,c){if(2!==b.e.length)throw"Element with wrong # of elements: "+b.e.length;for(var f=c.currentNode,d=f?f.nodeType:0,k=null;d>Node.ELEMENT_NODE;){if(d!==Node.COMMENT_NODE&&(d!==Node.TEXT_NODE||!/^\s+$/.test(c.currentNode.nodeValue)))return[new g("Not allowed node of type "+
d+".")];d=(f=c.nextSibling())?f.nodeType:0}if(!f)return[new g("Missing element "+b.names)];if(b.names&&-1===b.names.indexOf(n[f.namespaceURI]+":"+f.localName))return[new g("Found "+f.nodeName+" instead of "+b.names+".",f)];if(c.firstChild()){for(k=l(b.e[1],c,f);c.nextSibling();)if(d=c.currentNode.nodeType,!(c.currentNode&&c.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(c.currentNode.nodeValue)||d===Node.COMMENT_NODE))return[new g("Spurious content.",c.currentNode)];if(c.parentNode()!==f)return[new g("Implementation error.")]}else k=
l(b.e[1],c,f);c.nextSibling();return k}var m,f,n;f=function(b,p,m,d){var k=b.name,a=null;if("text"===k)a:{for(var e=(b=p.currentNode)?b.nodeType:0;b!==m&&3!==e;){if(1===e){a=[new g("Element not allowed here.",b)];break a}e=(b=p.nextSibling())?b.nodeType:0}p.nextSibling();a=null}else if("data"===k)a=null;else if("value"===k)d!==b.text&&(a=[new g("Wrong value, should be '"+b.text+"', not '"+d+"'",m)]);else if("list"===k)a=null;else if("attribute"===k)a:{if(2!==b.e.length)throw"Attribute with wrong # of elements: "+
b.e.length;k=b.localnames.length;for(a=0;a<k;a+=1){d=m.getAttributeNS(b.namespaces[a],b.localnames[a]);""!==d||m.hasAttributeNS(b.namespaces[a],b.localnames[a])||(d=void 0);if(void 0!==e&&void 0!==d){a=[new g("Attribute defined too often.",m)];break a}e=d}a=void 0===e?[new g("Attribute not found: "+b.names,m)]:l(b.e[1],p,m,e)}else if("element"===k)a=c(b,p);else if("oneOrMore"===k){d=0;do e=p.currentNode,k=f(b.e[0],p,m),d+=1;while(!k&&e!==p.currentNode);1<d?(p.currentNode=e,a=null):a=k}else if("choice"===
k){if(2!==b.e.length)throw"Choice with wrong # of options: "+b.e.length;e=p.currentNode;if("empty"===b.e[0].name){if(k=f(b.e[1],p,m,d))p.currentNode=e;a=null}else{if(k=l(b.e[0],p,m,d))p.currentNode=e,k=f(b.e[1],p,m,d);a=k}}else if("group"===k){if(2!==b.e.length)throw"Group with wrong # of members: "+b.e.length;a=f(b.e[0],p,m)||f(b.e[1],p,m)}else if("interleave"===k)a:{e=b.e.length;d=[e];for(var h=e,q,n,x,v;0<h;){q=0;n=p.currentNode;for(a=0;a<e;a+=1)x=p.currentNode,!0!==d[a]&&d[a]!==x&&(v=b.e[a],(k=
f(v,p,m))?(p.currentNode=x,void 0===d[a]&&(d[a]=!1)):x===p.currentNode||"oneOrMore"===v.name||"choice"===v.name&&("oneOrMore"===v.e[0].name||"oneOrMore"===v.e[1].name)?(q+=1,d[a]=x):(q+=1,d[a]=!0));if(n===p.currentNode&&q===h){a=null;break a}if(0===q){for(a=0;a<e;a+=1)if(!1===d[a]){a=[new g("Interleave does not match.",m)];break a}a=null;break a}for(a=h=0;a<e;a+=1)!0!==d[a]&&(h+=1)}a=null}else throw k+" not allowed in nonEmptyPattern.";return a};this.validate=function(b,c){b.currentNode=b.root;var f=
l(m.e[0],b,b.root);c(f)};this.init=function(b,c){m=b;n=c}};
// Input 25
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function g(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function l(a){for(var b=[],c=0,d=a.length,f;c<d;){var l=a,m=d,p=b,n="",r=[],s=l.indexOf("[",c),D=l.indexOf("/",c),A=l.indexOf("=",c);g(D,s,A)?(n=l.substring(c,D),c=D+1):g(s,D,A)?(n=l.substring(c,s),c=k(l,s,r)):g(A,D,s)?(n=l.substring(c,A),c=A):(n=l.substring(c,m),c=m);p.push({location:n,predicates:r});if(c<d&&"="===a[c]){f=a.substring(c+1,d);if(2<f.length&&("'"===f[0]||'"'===f[0]))f=f.slice(1,f.length-1);else try{f=
parseInt(f,10)}catch(B){}c=d}}return{steps:b,value:f}}function c(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function m(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function f(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function n(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function b(a,b,c){b=b.split(":",2);var d=c(b[0]),f=b[1];return new n(a,function(a){return a.localName===f&&a.namespaceURI===d})}function p(a,b,h){var f=new c,k=d(f,b,h),g=b.value;return void 0===g?new n(a,function(a){f.setNode(a);
k.reset();return k.next()}):new n(a,function(a){f.setNode(a);k.reset();return(a=k.next())&&a.nodeValue===g})}function r(a,b,h){var f=a.ownerDocument,k=[],g=null;if(f&&f.evaluate)for(h=f.evaluate(b,a,h,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),g=h.iterateNext();null!==g;)g.nodeType===Node.ELEMENT_NODE&&k.push(g),g=h.iterateNext();else{k=new c;k.setNode(a);a=l(b);k=d(k,a,h);a=[];for(h=k.next();h;)a.push(h),h=k.next();k=a}return k}var d,k;k=function(a,b,c){for(var d=b,f=a.length,k=0;d<f;)"]"===
a[d]?(k-=1,0>=k&&c.push(l(a.substring(b,d)))):"["===a[d]&&(0>=k&&(b=d+1),k+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};d=function(a,e,c){var d,k,g,l;for(d=0;d<e.steps.length;d+=1)for(g=e.steps[d],k=g.location,""===k?a=new f(a,!1):"@"===k[0]?(l=k.slice(1).split(":",2),a=new m(a,c(l[0]),l[1])):"."!==k&&(a=new f(a,!1),-1!==k.indexOf(":")&&(a=b(a,k,c))),k=0;k<g.predicates.length;k+=1)l=g.predicates[k],a=p(a,l,c);return a};xmldom.XPath=
function(){this.getODFElementsWithXPath=r};return xmldom.XPath}();
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
gui.AnnotationViewManager=function(g,l,c){function m(a){var b=a.node,c=a.end;a=r.createRange();c&&(a.setStart(b,b.childNodes.length),a.setEnd(c,0),c=d.getTextNodes(a,!1),c.forEach(function(a){var c=r.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function f(a){var b=g.getSizer();a?(c.style.display="inline-block",b.style.paddingRight=k.getComputedStyle(c).width):
(c.style.display="none",b.style.paddingRight=0);g.refreshSize()}function n(){p.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function b(){var a;for(a=0;a<p.length;a+=1){var b=p[a],d=b.node.parentNode,f=d.nextSibling,k=f.nextSibling,l=d.parentNode,m=0,m=p[p.indexOf(b)-1],n=void 0,b=g.getZoomLevel();d.style.left=(c.getBoundingClientRect().left-l.getBoundingClientRect().left)/b+"px";d.style.width=c.getBoundingClientRect().width/b+"px";f.style.width=
parseFloat(d.style.left)-30+"px";m&&(n=m.node.parentNode.getBoundingClientRect(),20>=(l.getBoundingClientRect().top-n.bottom)/b?d.style.top=Math.abs(l.getBoundingClientRect().top-n.bottom)/b+20+"px":d.style.top="0px");k.style.left=f.getBoundingClientRect().width/b+"px";var f=k.style,l=k.getBoundingClientRect().left/b,m=k.getBoundingClientRect().top/b,n=d.getBoundingClientRect().left/b,r=d.getBoundingClientRect().top/b,t=0,s=0,t=n-l,t=t*t,s=r-m,s=s*s,l=Math.sqrt(t+s);f.width=l+"px";m=Math.asin((d.getBoundingClientRect().top-
k.getBoundingClientRect().top)/(b*parseFloat(k.style.width)));k.style.transform="rotate("+m+"rad)";k.style.MozTransform="rotate("+m+"rad)";k.style.WebkitTransform="rotate("+m+"rad)";k.style.msTransform="rotate("+m+"rad)"}}var p=[],r=l.ownerDocument,d=new odf.OdfUtils,k=runtime.getWindow();runtime.assert(Boolean(k),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=b;this.addAnnotation=function(a){f(!0);p.push({node:a.node,end:a.end});n();var e=
r.createElement("div"),c=r.createElement("div"),d=r.createElement("div"),k=r.createElement("div"),g=r.createElement("div"),l=a.node;e.className="annotationWrapper";l.parentNode.insertBefore(e,l);c.className="annotationNote";c.appendChild(l);g.className="annotationRemoveButton";c.appendChild(g);d.className="annotationConnector horizontal";k.className="annotationConnector angular";e.appendChild(c);e.appendChild(d);e.appendChild(k);a.end&&m(a);b()};this.forgetAnnotations=function(){for(;p.length;){var a=
p[0],b=p.indexOf(a),c=a.node,d=c.parentNode.parentNode;"div"===d.localName&&(d.parentNode.insertBefore(c,d),d.parentNode.removeChild(d));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=r.querySelectorAll('span.annotationHighlight[annotation="'+a+'"]');d=c=void 0;for(c=0;c<a.length;c+=1){for(d=a[c];d.firstChild;)d.parentNode.insertBefore(d.firstChild,d);d.parentNode.removeChild(d)}-1!==b&&p.splice(b,1);0===p.length&&f(!1)}}};
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
odf.OdfNodeFilter=function(){this.acceptNode=function(g){return"http://www.w3.org/1999/xhtml"===g.namespaceURI?NodeFilter.FILTER_SKIP:g.namespaceURI&&g.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
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
odf.Namespaces=function(){function g(c){return l[c]||null}var l={db:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",dc:"http://purl.org/dc/elements/1.1/",meta:"urn:oasis:names:tc:opendocument:xmlns:meta:1.0",dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chart:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",form:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},c;g.lookupNamespaceURI=g;c=function(){};c.forEachPrefix=function(c){for(var f in l)l.hasOwnProperty(f)&&
c(f,l[f])};c.resolvePrefix=g;c.lookupPrefix=function(c){var f,g;for(g in l)if(l.hasOwnProperty(g)&&l[g]===c){f=g;break}return f};c.namespaceMap=l;c.dbns="urn:oasis:names:tc:opendocument:xmlns:database:1.0";c.dcns="http://purl.org/dc/elements/1.1/";c.metans="urn:oasis:names:tc:opendocument:xmlns:meta:1.0";c.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";c.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";c.chartns="urn:oasis:names:tc:opendocument:xmlns:chart:1.0";c.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
c.formns="urn:oasis:names:tc:opendocument:xmlns:form:1.0";c.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";c.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";c.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";c.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";c.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";c.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";c.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";
c.xlinkns="http://www.w3.org/1999/xlink";c.xmlns="http://www.w3.org/XML/1998/namespace";return c}();
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
odf.StyleInfo=function(){function g(a,b){for(var c=A[a.localName],e=c&&c[a.namespaceURI],d=e?e.length:0,h,c=0;c<d;c+=1)(h=a.getAttributeNS(e[c].ns,e[c].localname))&&a.setAttributeNS(e[c].ns,D[e[c].ns]+e[c].localname,b+h);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(e=c,g(e,b)),c=c.nextSibling}function l(a,b){for(var c=A[a.localName],e=c&&c[a.namespaceURI],d=e?e.length:0,h,c=0;c<d;c+=1)if(h=a.getAttributeNS(e[c].ns,e[c].localname))h=h.replace(b,""),a.setAttributeNS(e[c].ns,D[e[c].ns]+e[c].localname,
h);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(e=c,l(e,b)),c=c.nextSibling}function c(a,b){var c=A[a.localName],e=(c=c&&c[a.namespaceURI])?c.length:0,d,h,f;for(f=0;f<e;f+=1)if(d=a.getAttributeNS(c[f].ns,c[f].localname))b=b||{},h=c[f].keyname,h=b[h]=b[h]||{},h[d]=1;return b}function m(a,b){var e,d;c(a,b);for(e=a.firstChild;e;)e.nodeType===Node.ELEMENT_NODE&&(d=e,m(d,b)),e=e.nextSibling}function f(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function n(a,b,c){var e=a+'"'+
b,d=c[e];d||(d=c[e]=new f(e,a,b));return d}function b(a,c,e){var d=A[a.localName],h=(d=d&&d[a.namespaceURI])?d.length:0,f=a.getAttributeNS(w,"name"),k=a.getAttributeNS(w,"family"),g;f&&k&&(c=n(f,k,e));if(c)for(f=0;f<h;f+=1)if(k=a.getAttributeNS(d[f].ns,d[f].localname))g=d[f].keyname,k=n(k,g,e),c.requires[k.key]=k;for(f=a.firstChild;f;)f.nodeType===Node.ELEMENT_NODE&&(a=f,b(a,c,e)),f=f.nextSibling;return e}function p(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){p(a.requires[c],
b)})}function r(a,c){var e=b(a,null,{});Object.keys(e).forEach(function(a){a=e[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&p(a,c)})}function d(a,b){function c(b){(b=h.getAttributeNS(w,b))&&(a[b]=!0)}var e=["font-name","font-name-asian","font-name-complex"],h;if(b)for(h=b.firstChild;h;)h.nodeType===Node.ELEMENT_NODE&&(e.forEach(c),d(a,h)),h=h.nextSibling}function k(a,b){function c(a){var e=d.getAttributeNS(w,a);e&&b.hasOwnProperty(e)&&d.setAttributeNS(w,"style:"+a,b[e])}var e=["font-name","font-name-asian",
"font-name-complex"],d;if(a)for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(e.forEach(c),k(d,b)),d=d.nextSibling}var a=odf.Namespaces.chartns,e=odf.Namespaces.dbns,h=odf.Namespaces.dr3dns,q=odf.Namespaces.drawns,u=odf.Namespaces.formns,x=odf.Namespaces.numberns,v=odf.Namespaces.officens,y=odf.Namespaces.presentationns,w=odf.Namespaces.stylens,t=odf.Namespaces.tablens,s=odf.Namespaces.textns,D={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},a={text:[{ens:w,en:"tab-stop",ans:w,a:"leader-text-style"},{ens:w,en:"drop-cap",ans:w,a:"style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-body-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-style-name"},{ens:s,en:"a",ans:s,a:"style-name"},{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"linenumbering-configuration",
ans:s,a:"style-name"},{ens:s,en:"list-level-style-number",ans:s,a:"style-name"},{ens:s,en:"ruby-text",ans:s,a:"style-name"},{ens:s,en:"span",ans:s,a:"style-name"},{ens:s,en:"a",ans:s,a:"visited-style-name"},{ens:w,en:"text-properties",ans:w,a:"text-line-through-text-style"},{ens:s,en:"alphabetical-index-source",ans:s,a:"main-entry-style-name"},{ens:s,en:"index-entry-bibliography",ans:s,a:"style-name"},{ens:s,en:"index-entry-chapter",ans:s,a:"style-name"},{ens:s,en:"index-entry-link-end",ans:s,a:"style-name"},
{ens:s,en:"index-entry-link-start",ans:s,a:"style-name"},{ens:s,en:"index-entry-page-number",ans:s,a:"style-name"},{ens:s,en:"index-entry-span",ans:s,a:"style-name"},{ens:s,en:"index-entry-tab-stop",ans:s,a:"style-name"},{ens:s,en:"index-entry-text",ans:s,a:"style-name"},{ens:s,en:"index-title-template",ans:s,a:"style-name"},{ens:s,en:"list-level-style-bullet",ans:s,a:"style-name"},{ens:s,en:"outline-level-style",ans:s,a:"style-name"}],paragraph:[{ens:q,en:"caption",ans:q,a:"text-style-name"},{ens:q,
en:"circle",ans:q,a:"text-style-name"},{ens:q,en:"connector",ans:q,a:"text-style-name"},{ens:q,en:"control",ans:q,a:"text-style-name"},{ens:q,en:"custom-shape",ans:q,a:"text-style-name"},{ens:q,en:"ellipse",ans:q,a:"text-style-name"},{ens:q,en:"frame",ans:q,a:"text-style-name"},{ens:q,en:"line",ans:q,a:"text-style-name"},{ens:q,en:"measure",ans:q,a:"text-style-name"},{ens:q,en:"path",ans:q,a:"text-style-name"},{ens:q,en:"polygon",ans:q,a:"text-style-name"},{ens:q,en:"polyline",ans:q,a:"text-style-name"},
{ens:q,en:"rect",ans:q,a:"text-style-name"},{ens:q,en:"regular-polygon",ans:q,a:"text-style-name"},{ens:v,en:"annotation",ans:q,a:"text-style-name"},{ens:u,en:"column",ans:u,a:"text-style-name"},{ens:w,en:"style",ans:w,a:"next-style-name"},{ens:t,en:"body",ans:t,a:"paragraph-style-name"},{ens:t,en:"even-columns",ans:t,a:"paragraph-style-name"},{ens:t,en:"even-rows",ans:t,a:"paragraph-style-name"},{ens:t,en:"first-column",ans:t,a:"paragraph-style-name"},{ens:t,en:"first-row",ans:t,a:"paragraph-style-name"},
{ens:t,en:"last-column",ans:t,a:"paragraph-style-name"},{ens:t,en:"last-row",ans:t,a:"paragraph-style-name"},{ens:t,en:"odd-columns",ans:t,a:"paragraph-style-name"},{ens:t,en:"odd-rows",ans:t,a:"paragraph-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"default-style-name"},{ens:s,en:"alphabetical-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"bibliography-entry-template",ans:s,a:"style-name"},{ens:s,en:"h",ans:s,a:"style-name"},{ens:s,en:"illustration-index-entry-template",ans:s,a:"style-name"},
{ens:s,en:"index-source-style",ans:s,a:"style-name"},{ens:s,en:"object-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"p",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-of-content-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"user-index-entry-template",ans:s,a:"style-name"},{ens:w,en:"page-layout-properties",ans:w,a:"register-truth-ref-style-name"}],chart:[{ens:a,en:"axis",ans:a,
a:"style-name"},{ens:a,en:"chart",ans:a,a:"style-name"},{ens:a,en:"data-label",ans:a,a:"style-name"},{ens:a,en:"data-point",ans:a,a:"style-name"},{ens:a,en:"equation",ans:a,a:"style-name"},{ens:a,en:"error-indicator",ans:a,a:"style-name"},{ens:a,en:"floor",ans:a,a:"style-name"},{ens:a,en:"footer",ans:a,a:"style-name"},{ens:a,en:"grid",ans:a,a:"style-name"},{ens:a,en:"legend",ans:a,a:"style-name"},{ens:a,en:"mean-value",ans:a,a:"style-name"},{ens:a,en:"plot-area",ans:a,a:"style-name"},{ens:a,en:"regression-curve",
ans:a,a:"style-name"},{ens:a,en:"series",ans:a,a:"style-name"},{ens:a,en:"stock-gain-marker",ans:a,a:"style-name"},{ens:a,en:"stock-loss-marker",ans:a,a:"style-name"},{ens:a,en:"stock-range-line",ans:a,a:"style-name"},{ens:a,en:"subtitle",ans:a,a:"style-name"},{ens:a,en:"title",ans:a,a:"style-name"},{ens:a,en:"wall",ans:a,a:"style-name"}],section:[{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"bibliography",ans:s,a:"style-name"},{ens:s,en:"illustration-index",ans:s,a:"style-name"},
{ens:s,en:"index-title",ans:s,a:"style-name"},{ens:s,en:"object-index",ans:s,a:"style-name"},{ens:s,en:"section",ans:s,a:"style-name"},{ens:s,en:"table-of-content",ans:s,a:"style-name"},{ens:s,en:"table-index",ans:s,a:"style-name"},{ens:s,en:"user-index",ans:s,a:"style-name"}],ruby:[{ens:s,en:"ruby",ans:s,a:"style-name"}],table:[{ens:e,en:"query",ans:e,a:"style-name"},{ens:e,en:"table-representation",ans:e,a:"style-name"},{ens:t,en:"background",ans:t,a:"style-name"},{ens:t,en:"table",ans:t,a:"style-name"}],
"table-column":[{ens:e,en:"column",ans:e,a:"style-name"},{ens:t,en:"table-column",ans:t,a:"style-name"}],"table-row":[{ens:e,en:"query",ans:e,a:"default-row-style-name"},{ens:e,en:"table-representation",ans:e,a:"default-row-style-name"},{ens:t,en:"table-row",ans:t,a:"style-name"}],"table-cell":[{ens:e,en:"column",ans:e,a:"default-cell-style-name"},{ens:t,en:"table-column",ans:t,a:"default-cell-style-name"},{ens:t,en:"table-row",ans:t,a:"default-cell-style-name"},{ens:t,en:"body",ans:t,a:"style-name"},
{ens:t,en:"covered-table-cell",ans:t,a:"style-name"},{ens:t,en:"even-columns",ans:t,a:"style-name"},{ens:t,en:"covered-table-cell",ans:t,a:"style-name"},{ens:t,en:"even-columns",ans:t,a:"style-name"},{ens:t,en:"even-rows",ans:t,a:"style-name"},{ens:t,en:"first-column",ans:t,a:"style-name"},{ens:t,en:"first-row",ans:t,a:"style-name"},{ens:t,en:"last-column",ans:t,a:"style-name"},{ens:t,en:"last-row",ans:t,a:"style-name"},{ens:t,en:"odd-columns",ans:t,a:"style-name"},{ens:t,en:"odd-rows",ans:t,a:"style-name"},
{ens:t,en:"table-cell",ans:t,a:"style-name"}],graphic:[{ens:h,en:"cube",ans:q,a:"style-name"},{ens:h,en:"extrude",ans:q,a:"style-name"},{ens:h,en:"rotate",ans:q,a:"style-name"},{ens:h,en:"scene",ans:q,a:"style-name"},{ens:h,en:"sphere",ans:q,a:"style-name"},{ens:q,en:"caption",ans:q,a:"style-name"},{ens:q,en:"circle",ans:q,a:"style-name"},{ens:q,en:"connector",ans:q,a:"style-name"},{ens:q,en:"control",ans:q,a:"style-name"},{ens:q,en:"custom-shape",ans:q,a:"style-name"},{ens:q,en:"ellipse",ans:q,a:"style-name"},
{ens:q,en:"frame",ans:q,a:"style-name"},{ens:q,en:"g",ans:q,a:"style-name"},{ens:q,en:"line",ans:q,a:"style-name"},{ens:q,en:"measure",ans:q,a:"style-name"},{ens:q,en:"page-thumbnail",ans:q,a:"style-name"},{ens:q,en:"path",ans:q,a:"style-name"},{ens:q,en:"polygon",ans:q,a:"style-name"},{ens:q,en:"polyline",ans:q,a:"style-name"},{ens:q,en:"rect",ans:q,a:"style-name"},{ens:q,en:"regular-polygon",ans:q,a:"style-name"},{ens:v,en:"annotation",ans:q,a:"style-name"}],presentation:[{ens:h,en:"cube",ans:y,
a:"style-name"},{ens:h,en:"extrude",ans:y,a:"style-name"},{ens:h,en:"rotate",ans:y,a:"style-name"},{ens:h,en:"scene",ans:y,a:"style-name"},{ens:h,en:"sphere",ans:y,a:"style-name"},{ens:q,en:"caption",ans:y,a:"style-name"},{ens:q,en:"circle",ans:y,a:"style-name"},{ens:q,en:"connector",ans:y,a:"style-name"},{ens:q,en:"control",ans:y,a:"style-name"},{ens:q,en:"custom-shape",ans:y,a:"style-name"},{ens:q,en:"ellipse",ans:y,a:"style-name"},{ens:q,en:"frame",ans:y,a:"style-name"},{ens:q,en:"g",ans:y,a:"style-name"},
{ens:q,en:"line",ans:y,a:"style-name"},{ens:q,en:"measure",ans:y,a:"style-name"},{ens:q,en:"page-thumbnail",ans:y,a:"style-name"},{ens:q,en:"path",ans:y,a:"style-name"},{ens:q,en:"polygon",ans:y,a:"style-name"},{ens:q,en:"polyline",ans:y,a:"style-name"},{ens:q,en:"rect",ans:y,a:"style-name"},{ens:q,en:"regular-polygon",ans:y,a:"style-name"},{ens:v,en:"annotation",ans:y,a:"style-name"}],"drawing-page":[{ens:q,en:"page",ans:q,a:"style-name"},{ens:y,en:"notes",ans:q,a:"style-name"},{ens:w,en:"handout-master",
ans:q,a:"style-name"},{ens:w,en:"master-page",ans:q,a:"style-name"}],"list-style":[{ens:s,en:"list",ans:s,a:"style-name"},{ens:s,en:"numbered-paragraph",ans:s,a:"style-name"},{ens:s,en:"list-item",ans:s,a:"style-override"},{ens:w,en:"style",ans:w,a:"list-style-name"}],data:[{ens:w,en:"style",ans:w,a:"data-style-name"},{ens:w,en:"style",ans:w,a:"percentage-data-style-name"},{ens:y,en:"date-time-decl",ans:w,a:"data-style-name"},{ens:s,en:"creation-date",ans:w,a:"data-style-name"},{ens:s,en:"creation-time",
ans:w,a:"data-style-name"},{ens:s,en:"database-display",ans:w,a:"data-style-name"},{ens:s,en:"date",ans:w,a:"data-style-name"},{ens:s,en:"editing-duration",ans:w,a:"data-style-name"},{ens:s,en:"expression",ans:w,a:"data-style-name"},{ens:s,en:"meta-field",ans:w,a:"data-style-name"},{ens:s,en:"modification-date",ans:w,a:"data-style-name"},{ens:s,en:"modification-time",ans:w,a:"data-style-name"},{ens:s,en:"print-date",ans:w,a:"data-style-name"},{ens:s,en:"print-time",ans:w,a:"data-style-name"},{ens:s,
en:"table-formula",ans:w,a:"data-style-name"},{ens:s,en:"time",ans:w,a:"data-style-name"},{ens:s,en:"user-defined",ans:w,a:"data-style-name"},{ens:s,en:"user-field-get",ans:w,a:"data-style-name"},{ens:s,en:"user-field-input",ans:w,a:"data-style-name"},{ens:s,en:"variable-get",ans:w,a:"data-style-name"},{ens:s,en:"variable-input",ans:w,a:"data-style-name"},{ens:s,en:"variable-set",ans:w,a:"data-style-name"}],"page-layout":[{ens:y,en:"notes",ans:w,a:"page-layout-name"},{ens:w,en:"handout-master",ans:w,
a:"page-layout-name"},{ens:w,en:"master-page",ans:w,a:"page-layout-name"}]},A,B=new xmldom.XPath;this.collectUsedFontFaces=d;this.changeFontFaceNames=k;this.UsedStyleList=function(a,b){var c={};this.uses=function(a){var b=a.localName,e=a.getAttributeNS(q,"name")||a.getAttributeNS(w,"name");a="style"===b?a.getAttributeNS(w,"family"):a.namespaceURI===x?"data":b;return(a=c[a])?0<a[e]:!1};m(a,c);b&&r(b,c)};this.hasDerivedStyles=function(a,b,c){var e=b("style"),d=c.getAttributeNS(e,"name");c=c.getAttributeNS(e,
"family");return B.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+d+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,c){var e;if(a){for(e=a.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE){var d=e,h=b,f=d.getAttributeNS(q,"name"),k=void 0;f?k=q:(f=d.getAttributeNS(w,"name"))&&(k=w);k&&d.setAttributeNS(k,D[k]+"name",h+f)}e=e.nextSibling}g(a,b);c&&g(c,b)}};this.removePrefixFromStyleNames=function(a,b,c){var e=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===
Node.ELEMENT_NODE){var d=b,h=e,f=d.getAttributeNS(q,"name"),k=void 0;f?k=q:(f=d.getAttributeNS(w,"name"))&&(k=w);k&&(f=f.replace(h,""),d.setAttributeNS(k,D[k]+"name",f))}b=b.nextSibling}l(a,e);c&&l(c,e)}};this.determineStylesForNode=c;A=function(a){var b,c,e,d,h,f={},k;for(b in a)if(a.hasOwnProperty(b))for(d=a[b],e=d.length,c=0;c<e;c+=1)h=d[c],k=f[h.en]=f[h.en]||{},k=k[h.ens]=k[h.ens]||[],k.push({ns:h.ans,localname:h.a,keyname:b});return f}(a)};
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
odf.OdfUtils=function(){function g(a){return"image"===(a&&a.localName)&&a.namespaceURI===s}function l(a){return"frame"===(a&&a.localName)&&a.namespaceURI===s&&"as-char"===a.getAttributeNS(t,"anchor-type")}function c(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===t}function m(a){for(;a&&!c(a);)a=a.parentNode;return a}function f(a){return/^[ \t\r\n]+$/.test(a)}function n(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===t||"span"===b&&"annotationHighlight"===
a.className?!0:!1}function b(a){var b=a&&a.localName,c;c=!1;b&&(c=a.namespaceURI,c=c===t?"s"===b||"tab"===b||"line-break"===b:l(a));return c}function p(a){var b=a&&a.localName,c=!1;b&&(a=a.namespaceURI,a===t&&(c="s"===b));return c}function r(a){for(;null!==a.firstChild&&n(a);)a=a.firstChild;return a}function d(a){for(;null!==a.lastChild&&n(a);)a=a.lastChild;return a}function k(a){for(;!c(a)&&null===a.previousSibling;)a=a.parentNode;return c(a)?null:d(a.previousSibling)}function a(a){for(;!c(a)&&null===
a.nextSibling;)a=a.parentNode;return c(a)?null:r(a.nextSibling)}function e(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=k(a);else return!f(a.data.substr(a.length-1,1));else b(a)?(c=!1===p(a),a=null):a=k(a);return c}function h(c){var e=!1;for(c=c&&r(c);c;){if(c.nodeType===Node.TEXT_NODE&&0<c.length&&!f(c.data)){e=!0;break}if(b(c)){e=!0;break}c=a(c)}return e}function q(b,c){return f(b.data.substr(c))?!h(a(b)):!1}function u(a,c){var d=a.data,h;if(!f(d[c])||b(a.parentNode))return!1;
0<c?f(d[c-1])||(h=!0):e(k(a))&&(h=!0);return!0===h?q(a,c)?!1:!0:!1}function x(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?{value:parseFloat(a[1]),unit:a[3]}:null}function v(a){return(a=x(a))&&(0>a.value||"%"===a.unit)?null:a}function y(a){return(a=x(a))&&"%"!==a.unit?null:a}function w(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;
case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var t=odf.Namespaces.textns,s=odf.Namespaces.drawns,D=/^\s*$/,A=new core.DomUtils;this.isImage=g;this.isCharacterFrame=l;this.isTextSpan=function(a){return"span"===(a&&a.localName)&&a.namespaceURI===t};this.isParagraph=c;this.getParagraphElement=m;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===
t&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===t};this.isLineBreak=function(a){return"line-break"===(a&&a.localName)&&a.namespaceURI===t};this.isODFWhitespace=f;this.isGroupingElement=n;this.isCharacterElement=b;this.isSpaceElement=p;this.firstChild=r;this.lastChild=d;this.previousNode=k;this.nextNode=a;this.scanLeftForNonSpace=e;this.lookLeftForCharacter=function(a){var c;c=0;a.nodeType===Node.TEXT_NODE&&
0<a.length?(c=a.data,c=f(c.substr(c.length-1,1))?1===c.length?e(k(a))?2:0:f(c.substr(c.length-2,1))?0:2:1):b(a)&&(c=1);return c};this.lookRightForCharacter=function(a){var c=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?c=!f(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(a){var c=!1;for(a=a&&d(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!f(a.data)){c=!0;break}if(b(a)){c=!0;break}a=k(a)}return c};this.scanRightForAnyCharacter=h;this.isTrailingWhitespace=q;this.isSignificantWhitespace=
u;this.isDowngradableSpaceElement=function(b){return b.namespaceURI===t&&"s"===b.localName?e(k(b))&&h(a(b)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&D.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=x;this.parseNonNegativeLength=v;this.parseFoFontSize=function(a){var b;b=(b=x(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||y(a)};this.parseFoLineHeight=function(a){return v(a)||y(a)};this.getImpactedParagraphs=function(a){var b=
a.commonAncestorContainer,e=[];for(b.nodeType===Node.ELEMENT_NODE&&(e=A.getElementsByTagNameNS(b,t,"p").concat(A.getElementsByTagNameNS(b,t,"h")));b&&!c(b);)b=b.parentNode;b&&e.push(b);return e.filter(function(b){return A.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),e;e=A.getNodesInRange(a,function(e){c.selectNodeContents(e);if(e.nodeType===Node.TEXT_NODE){if(b&&A.rangesIntersect(a,c)||A.containsRange(a,c))return Boolean(m(e)&&(!f(e.textContent)||
u(e,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(A.rangesIntersect(a,c)&&w(e))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return e};this.getTextElements=function(a,c,e){var d=a.startContainer.ownerDocument.createRange(),h;h=A.getNodesInRange(a,function(h){d.selectNodeContents(h);if(b(h.parentNode))return NodeFilter.FILTER_REJECT;if(h.nodeType===Node.TEXT_NODE){if(c&&A.rangesIntersect(a,d)||A.containsRange(a,d))if(e||Boolean(m(h)&&(!f(h.textContent)||
u(h,0))))return NodeFilter.FILTER_ACCEPT}else if(b(h)){if(c&&A.rangesIntersect(a,d)||A.containsRange(a,d))return NodeFilter.FILTER_ACCEPT}else if(w(h)||n(h))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});d.detach();return h};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),e;e=A.getNodesInRange(a,function(e){b.selectNodeContents(e);if(c(e)){if(A.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(w(e)||n(e))return NodeFilter.FILTER_SKIP;
return NodeFilter.FILTER_REJECT});b.detach();return e};this.getImageElements=function(a){var b=a.startContainer.ownerDocument.createRange(),c;c=A.getNodesInRange(a,function(c){b.selectNodeContents(c);return g(c)&&A.containsRange(a,b)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});b.detach();return c}};
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
odf.TextSerializer=function(){function g(m){var f="",n=l.filter?l.filter.acceptNode(m):NodeFilter.FILTER_ACCEPT,b=m.nodeType,p;if(n===NodeFilter.FILTER_ACCEPT||n===NodeFilter.FILTER_SKIP)for(p=m.firstChild;p;)f+=g(p),p=p.nextSibling;n===NodeFilter.FILTER_ACCEPT&&(b===Node.ELEMENT_NODE&&c.isParagraph(m)?f+="\n":b===Node.TEXT_NODE&&m.textContent&&(f+=m.textContent));return f}var l=this,c=new odf.OdfUtils;this.filter=null;this.writeToString=function(c){if(!c)return"";c=g(c);"\n"===c[c.length-1]&&(c=
c.substr(0,c.length-1));return c}};
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
odf.TextStyleApplicator=function(g,l,c){function m(b){function c(a,b){return"object"===typeof a&&"object"===typeof b?Object.keys(a).every(function(d){return c(a[d],b[d])}):a===b}this.isStyleApplied=function(a){a=l.getAppliedStylesForElement(a);return c(b,a)}}function f(b){var f={};this.applyStyleToContainer=function(a){var e;e=a.getAttributeNS(p,"style-name");var h=a.ownerDocument;e=e||"";if(!f.hasOwnProperty(e)){var m=e,n;n=e?l.createDerivedStyleObject(e,"text",b):b;h=h.createElementNS(r,"style:style");
l.updateStyle(h,n);h.setAttributeNS(r,"style:name",g.generateStyleName());h.setAttributeNS(r,"style:family","text");h.setAttributeNS("urn:webodf:names:scope","scope","document-content");c.appendChild(h);f[m]=h}e=f[e].getAttributeNS(r,"name");a.setAttributeNS(p,"text:style-name",e)}}function n(c,f){var a=c.ownerDocument,e=c.parentNode,h,g,l=new core.LoopWatchDog(1E4);g=[];"span"!==e.localName||e.namespaceURI!==p?(h=a.createElementNS(p,"text:span"),e.insertBefore(h,c),e=!1):(c.previousSibling&&!b.rangeContainsNode(f,
e.firstChild)?(h=e.cloneNode(!1),e.parentNode.insertBefore(h,e.nextSibling)):h=e,e=!0);g.push(c);for(a=c.nextSibling;a&&b.rangeContainsNode(f,a);)l.check(),g.push(a),a=a.nextSibling;g.forEach(function(a){a.parentNode!==h&&h.appendChild(a)});if(a&&e)for(g=h.cloneNode(!1),h.parentNode.insertBefore(g,h.nextSibling);a;)l.check(),e=a.nextSibling,g.appendChild(a),a=e;return h}var b=new core.DomUtils,p=odf.Namespaces.textns,r=odf.Namespaces.stylens;this.applyStyle=function(b,c,a){var e={},h,g,l,p;runtime.assert(a&&
a["style:text-properties"],"applyStyle without any text properties");e["style:text-properties"]=a["style:text-properties"];l=new f(e);p=new m(e);b.forEach(function(a){h=p.isStyleApplied(a);!1===h&&(g=n(a,c),l.applyStyleToContainer(g))})}};
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
odf.Style2CSS=function(){function g(a){var b={},c,e;if(!a)return b;for(a=a.firstChild;a;){if(e=a.namespaceURI!==q||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===v&&"list-style"===a.localName?"list":a.namespaceURI!==q||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(q,"family"))(c=a.getAttributeNS&&a.getAttributeNS(q,"name"))||(c=""),e=b[e]=b[e]||{},e[c]=a;a=a.nextSibling}return b}function l(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,e;for(c in a)if(a.hasOwnProperty(c)&&(e=l(a[c].derivedStyles,b)))return e;return null}function c(a,b,e){var d=b[a],h,f;d&&(h=d.getAttributeNS(q,"parent-style-name"),f=null,h&&(f=l(e,h),!f&&b[h]&&(c(h,b,e),f=b[h],b[h]=null)),f?(f.derivedStyles||(f.derivedStyles={}),f.derivedStyles[a]=d):e[a]=d)}function m(a,b){for(var e in a)a.hasOwnProperty(e)&&(c(e,a,b),a[e]=null)}function f(a,b){var c=t[a],e;if(null===c)return null;e=b?"["+c+'|style-name="'+b+'"]':"";"presentation"===c&&(c="draw",e=b?'[presentation|style-name="'+
b+'"]':"");return c+"|"+s[a].join(e+","+c+"|")+e}function n(a,b,c){var e=[],d,h;e.push(f(a,b));for(d in c.derivedStyles)if(c.derivedStyles.hasOwnProperty(d))for(h in b=n(a,d,c.derivedStyles[d]),b)b.hasOwnProperty(h)&&e.push(b[h]);return e}function b(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function p(a,b){var c="",e,d;for(e in b)if(b.hasOwnProperty(e)&&(e=b[e],d=a.getAttributeNS(e[0],e[1]))){d=d.trim();if(R.hasOwnProperty(e[1])){var h=
d.indexOf(" "),f=void 0,k=void 0;-1!==h?(f=d.substring(0,h),k=d.substring(h)):(f=d,k="");(f=ba.parseLength(f))&&"pt"===f.unit&&0.75>f.value&&(d="0.75pt"+k)}e[2]&&(c+=e[2]+":"+d+";")}return c}function r(a){return(a=b(a,q,"text-properties"))?ba.parseFoFontSize(a.getAttributeNS(h,"font-size")):null}function d(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,e){return b+b+c+c+e+e});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],
16)}:null}function k(a,b,c,e){b='text|list[text|style-name="'+b+'"]';var d=c.getAttributeNS(v,"level"),h;c=ba.getFirstNonWhitespaceChild(c);c=ba.getFirstNonWhitespaceChild(c);var f;c&&(h=c.attributes,f=h["fo:text-indent"]?h["fo:text-indent"].value:void 0,h=h["fo:margin-left"]?h["fo:margin-left"].value:void 0);f||(f="-0.6cm");c="-"===f.charAt(0)?f.substring(1):"-"+f;for(d=d&&parseInt(d,10);1<d;)b+=" > text|list-item > text|list",d-=1;d=b+" > text|list-item > *:not(text|list):first-child";void 0!==
h&&(h=d+"{margin-left:"+h+";}",a.insertRule(h,a.cssRules.length));e=b+" > text|list-item > *:not(text|list):first-child:before{"+e+";";e+="counter-increment:list;";e+="margin-left:"+f+";";e+="width:"+c+";";e+="display:inline-block}";try{a.insertRule(e,a.cssRules.length)}catch(k){throw k;}}function a(c,f,g,l){if("list"===f)for(var s=l.firstChild,m,t;s;){if(s.namespaceURI===v)if(m=s,"list-level-style-number"===s.localName){var u=m;t=u.getAttributeNS(q,"num-format");var P=u.getAttributeNS(q,"num-suffix"),
L={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},u=u.getAttributeNS(q,"num-prefix")||"",u=L.hasOwnProperty(t)?u+(" counter(list, "+L[t]+")"):t?u+("'"+t+"';"):u+" ''";P&&(u+=" '"+P+"'");t="content: "+u+";";k(c,g,m,t)}else"list-level-style-image"===s.localName?(t="content: none;",k(c,g,m,t)):"list-level-style-bullet"===s.localName&&(t="content: '"+m.getAttributeNS(v,"bullet-char")+"';",k(c,g,m,t));s=s.nextSibling}else if("page"===f)if(P=m=g="",s=l.getElementsByTagNameNS(q,
"page-layout-properties")[0],m=s.parentNode.parentNode.parentNode.masterStyles,P="",g+=p(s,$),t=s.getElementsByTagNameNS(q,"background-image"),0<t.length&&(P=t.item(0).getAttributeNS(y,"href"))&&(g+="background-image: url('odfkit:"+P+"');",t=t.item(0),g+=p(t,A)),"presentation"===ga){if(m)for(t=m.getElementsByTagNameNS(q,"master-page"),L=0;L<t.length;L+=1)if(t[L].getAttributeNS(q,"page-layout-name")===s.parentNode.getAttributeNS(q,"name")){P=t[L].getAttributeNS(q,"name");m="draw|page[draw|master-page-name="+
P+"] {"+g+"}";P="office|body, draw|page[draw|master-page-name="+P+"] {"+p(s,ia)+" }";try{c.insertRule(m,c.cssRules.length),c.insertRule(P,c.cssRules.length)}catch(R){throw R;}}}else{if("text"===ga){m="office|text {"+g+"}";P="office|body {width: "+s.getAttributeNS(h,"page-width")+";}";try{c.insertRule(m,c.cssRules.length),c.insertRule(P,c.cssRules.length)}catch(E){throw E;}}}else{g=n(f,g,l).join(",");s="";if(m=b(l,q,"text-properties")){var L=m,U;t=U="";P=1;m=""+p(L,D);u=L.getAttributeNS(q,"text-underline-style");
"solid"===u&&(U+=" underline");u=L.getAttributeNS(q,"text-line-through-style");"solid"===u&&(U+=" line-through");U.length&&(m+="text-decoration:"+U+";");if(U=L.getAttributeNS(q,"font-name")||L.getAttributeNS(h,"font-family"))u=ma[U],m+="font-family: "+(u||U)+";";u=L.parentNode;if(L=r(u)){for(;u;){if(L=r(u)){if("%"!==L.unit){t="font-size: "+L.value*P+L.unit+";";break}P*=L.value/100}L=u;U=u="";u=null;"default-style"===L.localName?u=null:(u=L.getAttributeNS(q,"parent-style-name"),U=L.getAttributeNS(q,
"family"),u=V.getODFElementsWithXPath(S,u?"//style:*[@style:name='"+u+"'][@style:family='"+U+"']":"//style:default-style[@style:family='"+U+"']",odf.Namespaces.resolvePrefix)[0])}t||(t="font-size: "+parseFloat(Y)*P+G.getUnits(Y)+";");m+=t}s+=m}if(m=b(l,q,"paragraph-properties"))t=m,m=""+p(t,B),P=t.getElementsByTagNameNS(q,"background-image"),0<P.length&&(L=P.item(0).getAttributeNS(y,"href"))&&(m+="background-image: url('odfkit:"+L+"');",P=P.item(0),m+=p(P,A)),(t=t.getAttributeNS(h,"line-height"))&&
"normal"!==t&&(t=ba.parseFoLineHeight(t),m="%"!==t.unit?m+("line-height: "+t.value+t.unit+";"):m+("line-height: "+t.value/100+";")),s+=m;if(m=b(l,q,"graphic-properties"))L=m,m=""+p(L,M),t=L.getAttributeNS(e,"opacity"),P=L.getAttributeNS(e,"fill"),L=L.getAttributeNS(e,"fill-color"),"solid"===P||"hatch"===P?L&&"none"!==L?(t=isNaN(parseFloat(t))?1:parseFloat(t)/100,(L=d(L))&&(m+="background-color: rgba("+L.r+","+L.g+","+L.b+","+t+");")):m+="background: none;":"none"===P&&(m+="background: none;"),s+=
m;if(m=b(l,q,"drawing-page-properties"))t=""+p(m,M),"true"===m.getAttributeNS(w,"background-visible")&&(t+="background: none;"),s+=t;if(m=b(l,q,"table-cell-properties"))m=""+p(m,z),s+=m;if(m=b(l,q,"table-row-properties"))m=""+p(m,F),s+=m;if(m=b(l,q,"table-column-properties"))m=""+p(m,K),s+=m;if(m=b(l,q,"table-properties"))t=m,m=""+p(t,Q),t=t.getAttributeNS(x,"border-model"),"collapsing"===t?m+="border-collapse:collapse;":"separating"===t&&(m+="border-collapse:separate;"),s+=m;if(0!==s.length)try{c.insertRule(g+
"{"+s+"}",c.cssRules.length)}catch(H){throw H;}}for(var la in l.derivedStyles)l.derivedStyles.hasOwnProperty(la)&&a(c,f,la,l.derivedStyles[la])}var e=odf.Namespaces.drawns,h=odf.Namespaces.fons,q=odf.Namespaces.stylens,u=odf.Namespaces.svgns,x=odf.Namespaces.tablens,v=odf.Namespaces.textns,y=odf.Namespaces.xlinkns,w=odf.Namespaces.presentationns,t={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},D=[[h,"color","color"],[h,"background-color","background-color"],[h,"font-weight","font-weight"],[h,"font-style","font-style"]],A=[[q,"repeat",
"background-repeat"]],B=[[h,"background-color","background-color"],[h,"text-align","text-align"],[h,"text-indent","text-indent"],[h,"padding","padding"],[h,"padding-left","padding-left"],[h,"padding-right","padding-right"],[h,"padding-top","padding-top"],[h,"padding-bottom","padding-bottom"],[h,"border-left","border-left"],[h,"border-right","border-right"],[h,"border-top","border-top"],[h,"border-bottom","border-bottom"],[h,"margin","margin"],[h,"margin-left","margin-left"],[h,"margin-right","margin-right"],
[h,"margin-top","margin-top"],[h,"margin-bottom","margin-bottom"],[h,"border","border"]],M=[[h,"background-color","background-color"],[h,"min-height","min-height"],[e,"stroke","border"],[u,"stroke-color","border-color"],[u,"stroke-width","border-width"],[h,"border","border"],[h,"border-left","border-left"],[h,"border-right","border-right"],[h,"border-top","border-top"],[h,"border-bottom","border-bottom"]],z=[[h,"background-color","background-color"],[h,"border-left","border-left"],[h,"border-right",
"border-right"],[h,"border-top","border-top"],[h,"border-bottom","border-bottom"],[h,"border","border"]],K=[[q,"column-width","width"]],F=[[q,"row-height","height"],[h,"keep-together",null]],Q=[[q,"width","width"],[h,"margin-left","margin-left"],[h,"margin-right","margin-right"],[h,"margin-top","margin-top"],[h,"margin-bottom","margin-bottom"]],$=[[h,"background-color","background-color"],[h,"padding","padding"],[h,"padding-left","padding-left"],[h,"padding-right","padding-right"],[h,"padding-top",
"padding-top"],[h,"padding-bottom","padding-bottom"],[h,"border","border"],[h,"border-left","border-left"],[h,"border-right","border-right"],[h,"border-top","border-top"],[h,"border-bottom","border-bottom"],[h,"margin","margin"],[h,"margin-left","margin-left"],[h,"margin-right","margin-right"],[h,"margin-top","margin-top"],[h,"margin-bottom","margin-bottom"]],ia=[[h,"page-width","width"],[h,"page-height","height"]],R={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},ma={},ba=new odf.OdfUtils,ga,S,Y,V=new xmldom.XPath,G=new core.CSSUnits;this.style2css=function(b,c,e,d,h){for(var f,k,l,s;c.cssRules.length;)c.deleteRule(c.cssRules.length-1);f=null;d&&(f=d.ownerDocument,S=d.parentNode);h&&(f=h.ownerDocument,S=h.parentNode);if(f)for(s in odf.Namespaces.forEachPrefix(function(a,b){l="@namespace "+a+" url("+b+");";try{c.insertRule(l,c.cssRules.length)}catch(e){}}),ma=e,ga=b,Y=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",b=g(d),d=g(h),h={},t)if(t.hasOwnProperty(s))for(k in e=h[s]={},m(b[s],e),m(d[s],e),e)e.hasOwnProperty(k)&&a(c,s,k,e[k])}};
// Input 34
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("core.DomUtils");
odf.MetadataManager=function(g){function l(f,l){f&&(Object.keys(f).forEach(function(b){m[b]=f[b]}),c.mapKeyValObjOntoNode(g,f,odf.Namespaces.resolvePrefix));l&&(l.forEach(function(b){delete m[b]}),c.removeKeyElementsFromNode(g,l,odf.Namespaces.resolvePrefix))}var c=new core.DomUtils,m={};this.setMetadata=l;this.incrementEditingCycles=function(){var c=parseInt(m["meta:editing-cycles"]||0,10)+1;l({"meta:editing-cycles":c},null)};m=c.getKeyValRepresentationOfNode(g,odf.Namespaces.lookupPrefix)};
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
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("odf.MetadataManager");
odf.OdfContainer=function(){function g(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function l(a){var b,c=k.length;for(b=0;b<c;b+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&a.localName===k[b])return b;return-1}function c(a,b){var c=new p.UsedStyleList(a,b),e=new odf.OdfNodeFilter;this.acceptNode=function(a){var d=e.acceptNode(a);d===NodeFilter.FILTER_ACCEPT&&a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE&&
(d=c.uses(a)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return d}}function m(a,b){var e=new c(a,b);this.acceptNode=function(a){var b=e.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName||(b=NodeFilter.FILTER_REJECT);return b}}function f(a,b){if(b){var c=l(b),e,d=a.firstChild;if(-1!==c){for(;d;){e=l(d);if(-1!==e&&e>c)break;d=d.nextSibling}a.insertBefore(b,d)}}}function n(a){this.OdfContainer=
a}function b(a,b,c,e){var d=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==e&&(this.mimetype=b,e.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);d.url=b;if(d.onchange)d.onchange(d);if(d.onstatereadychange)d.onstatereadychange(d)}))}}var p=new odf.StyleInfo,r,d=odf.Namespaces.stylens,k="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),
a=(new Date).getTime()+"_webodf_",e=new core.Base64;n.prototype=new function(){};n.prototype.constructor=n;n.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";n.localName="document";b.prototype.load=function(){};b.prototype.getUrl=function(){return this.data?"data:;base64,"+e.toBase64(this.data):null};odf.OdfContainer=function q(k,l){function v(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?v(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),
b=c}function y(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS("urn:webodf:names:scope","scope",b),c=c.nextSibling}function w(a,b){function c(a,b,e){var d=0,f;for(f=a=a.replace(/\d+$/,"");b.hasOwnProperty(f)||e.hasOwnProperty(f);)d+=1,f=a+d;return f}function e(a){var b={};for(a=a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&a.namespaceURI===d&&"font-face"===a.localName&&(g=a.getAttributeNS(d,"name"),b[g]=a),a=a.nextSibling;return b}var f,k,g,l,m,s,p={};m=e(a);s=
e(b);for(f=b.firstChild;f;)k=f.nextSibling,f.nodeType===Node.ELEMENT_NODE&&f.namespaceURI===d&&"font-face"===f.localName&&(g=f.getAttributeNS(d,"name"),m.hasOwnProperty(g)?f.isEqualNode(m[g])||(l=c(g,m,s),f.setAttributeNS(d,"style:name",l),a.appendChild(f),m[l]=f,delete s[g],p[g]=l):(a.appendChild(f),m[g]=f,delete s[g])),f=k;return p}function t(a,b){var c=null,e,d,f;if(a)for(c=a.cloneNode(!0),e=c.firstChild;e;)d=e.nextSibling,e.nodeType===Node.ELEMENT_NODE&&(f=e.getAttributeNS("urn:webodf:names:scope",
"scope"))&&f!==b&&c.removeChild(e),e=d;return c}function s(a,b){var c=null,e,f,k,g={};if(a)for(b.forEach(function(a){p.collectUsedFontFaces(g,a)}),c=a.cloneNode(!0),e=c.firstChild;e;)f=e.nextSibling,e.nodeType===Node.ELEMENT_NODE&&(k=e.getAttributeNS(d,"name"),g[k]||c.removeChild(e)),e=f;return c}function D(a){var b=N.rootElement.ownerDocument,c;if(a){v(a.documentElement);try{c=b.importNode(a.documentElement,!0)}catch(e){}}return c}function A(a){N.state=a;if(N.onchange)N.onchange(N);if(N.onstatereadychange)N.onstatereadychange(N)}
function B(a){ka=null;N.rootElement=a;a.fontFaceDecls=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");a.styles=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");a.automaticStyles=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");a.masterStyles=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");a.body=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");a.meta=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta")}function M(b){b=D(b);var c=N.rootElement;b&&"document-styles"===b.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI?(c.fontFaceDecls=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),f(c,c.fontFaceDecls),c.styles=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),f(c,c.styles),c.automaticStyles=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),y(c.automaticStyles,"document-styles"),f(c,c.automaticStyles),
c.masterStyles=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),f(c,c.masterStyles),p.prefixStyleNames(c.automaticStyles,a,c.masterStyles)):A(q.INVALID)}function z(a){a=D(a);var b,c,e;if(a&&"document-content"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI){b=N.rootElement;c=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");b.fontFaceDecls&&c?e=w(b.fontFaceDecls,c):c&&(b.fontFaceDecls=c,f(b,c));c=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"automatic-styles");y(c,"document-content");e&&p.changeFontFaceNames(c,e);if(b.automaticStyles&&c)for(e=c.firstChild;e;)b.automaticStyles.appendChild(e),e=c.firstChild;else c&&(b.automaticStyles=c,f(b,c));b.body=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");f(b,b.body)}else A(q.INVALID)}function K(a){a=D(a);var b;a&&"document-meta"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(b=N.rootElement,b.meta=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta"),f(b,b.meta),r=new odf.MetadataManager(b.meta))}function F(a){a=D(a);var b;a&&"document-settings"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(b=N.rootElement,b.settings=g(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),f(b,b.settings))}function Q(a){a=D(a);var b;if(a&&"manifest"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI)for(b=N.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===
Node.ELEMENT_NODE&&"file-entry"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI&&(Z[a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),a=a.nextSibling}function $(a){var b=a.shift(),c,e;b?(c=b[0],e=b[1],O.loadAsDOM(c,function(b,c){e(c);b||N.state===q.INVALID||$(a)})):A(q.DONE)}function ia(a){var b="";odf.Namespaces.forEachPrefix(function(a,c){b+=
" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function R(){var a=new xmldom.LSSerializer,b=ia("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(N.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function ma(a,b){var c=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
"manifest:full-path",a);c.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:media-type",b);return c}function ba(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'),b=g(a,"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest"),c=new xmldom.LSSerializer,e;for(e in Z)Z.hasOwnProperty(e)&&b.appendChild(ma(e,Z[e]));c.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+
c.writeToString(a,odf.Namespaces.namespaceMap)}function ga(){var a=new xmldom.LSSerializer,b=ia("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(N.rootElement.settings,odf.Namespaces.namespaceMap);return b+"</office:document-settings>"}function S(){var b=odf.Namespaces.namespaceMap,e=new xmldom.LSSerializer,d,f,k,g=ia("document-styles");f=t(N.rootElement.automaticStyles,"document-styles");k=N.rootElement.masterStyles&&N.rootElement.masterStyles.cloneNode(!0);d=s(N.rootElement.fontFaceDecls,
[k,N.rootElement.styles,f]);p.removePrefixFromStyleNames(f,a,k);e.filter=new c(k,f);g+=e.writeToString(d,b);g+=e.writeToString(N.rootElement.styles,b);g+=e.writeToString(f,b);g+=e.writeToString(k,b);return g+"</office:document-styles>"}function Y(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c,e,d=ia("document-content");e=t(N.rootElement.automaticStyles,"document-content");c=s(N.rootElement.fontFaceDecls,[e]);b.filter=new m(N.rootElement.body,e);d+=b.writeToString(c,a);d+=b.writeToString(e,
a);d+=b.writeToString(N.rootElement.body,a);return d+"</office:document-content>"}function V(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var e=D(c);e&&"document"===e.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===e.namespaceURI?(B(e),A(q.DONE)):A(q.INVALID)}})}function G(){function a(b,c){var d;c||(c=b);d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",c);e[b]=d;e.appendChild(d)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text",
"utf8"),e=N.rootElement,d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");e.body.appendChild(d);r=new odf.MetadataManager(e.meta);A(q.DONE);return b}function I(){var a,b=new Date,c=runtime.getWindow();a="WebODF/"+("undefined"!==String(typeof webodf_version)?webodf_version:
"FromSource");c&&(a=a+" "+c.navigator.userAgent);r.setMetadata({"meta:generator":a});a=runtime.byteArrayFromString(ga(),"utf8");O.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(R(),"utf8");O.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(S(),"utf8");O.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(Y(),"utf8");O.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(ba(),"utf8");O.save("META-INF/manifest.xml",a,!0,b)}function ha(a,b){I();O.writeAs(a,function(a){b(a)})}
var N=this,O,Z={},ka;this.onstatereadychange=l;this.rootElement=this.state=this.onchange=null;this.setRootElement=B;this.getContentElement=function(){var a;ka||(a=N.rootElement.body,ka=a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","text")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","presentation")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet")[0]);return ka};this.getDocumentType=function(){var a=
N.getContentElement();return a&&a.localName};this.getMetadataManager=function(){return r};this.getPart=function(a){return new b(a,Z[a],N,O)};this.getPartData=function(a,b){O.load(a,b)};this.createByteArray=function(a,b){I();O.createByteArray(a,b)};this.saveAs=ha;this.save=function(a){ha(k,a)};this.getUrl=function(){return k};this.setBlob=function(a,b,c){c=e.convertBase64ToByteArray(c);O.save(a,c,!1,new Date);Z.hasOwnProperty(a)&&runtime.log(a+" has been overwritten.");Z[a]=b};this.removeBlob=function(a){var b=
O.remove(a);runtime.assert(b,"file is not found: "+a);delete Z[a]};this.state=q.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(n);O=k?new core.Zip(k,function(a,b){O=b;a?V(k,function(b){a&&(O.error=a+"\n"+b,A(q.INVALID))}):$([["styles.xml",M],["content.xml",z],["meta.xml",K],["settings.xml",F],["META-INF/manifest.xml",Q]])}):G()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=
2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,null)};return odf.OdfContainer}();
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
runtime.loadClass("core.Base64");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.OdfContainer");
odf.FontLoader=function(){function g(l,f,n,b,p){var r,d=0,k;for(k in l)if(l.hasOwnProperty(k)){if(d===n){r=k;break}d+=1}r?f.getPartData(l[r].href,function(a,e){if(a)runtime.log(a);else if(e){var d="@font-face { font-family: '"+(l[r].family||r)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+c.convertUTF8ArrayToBase64(e)+') format("truetype"); }';try{b.insertRule(d,b.cssRules.length)}catch(k){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(k)+"\nRule: "+d)}}else runtime.log("missing font data for "+
l[r].href);g(l,f,n+1,b,p)}):p&&p()}var l=new xmldom.XPath,c=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(c,f){for(var n=c.rootElement.fontFaceDecls;f.cssRules.length;)f.deleteRule(f.cssRules.length-1);if(n){var b={},p,r,d,k;if(n)for(n=l.getODFElementsWithXPath(n,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),p=0;p<n.length;p+=1)r=n[p],d=r.getAttributeNS(odf.Namespaces.stylens,"name"),k=r.getAttributeNS(odf.Namespaces.svgns,"font-family"),r=l.getODFElementsWithXPath(r,
"svg:font-face-src/svg:font-face-uri",odf.Namespaces.resolvePrefix),0<r.length&&(r=r[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),b[d]={href:r,family:k});g(b,c,0,f)}}};return odf.FontLoader}();
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
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Utils");
odf.ObjectNameGenerator=function(g,l){function c(a,b){var c={};this.generateName=function(){var e=b(),d=0,h;do h=a+d,d+=1;while(c[h]||e[h]);c[h]=!0;return h}}function m(){var a,b={};[g.rootElement.automaticStyles,g.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&a.namespaceURI===f&&"style"===a.localName&&(b[a.getAttributeNS(f,"name")]=!0),a=a.nextSibling});return b}var f=odf.Namespaces.stylens,n=odf.Namespaces.drawns,b=odf.Namespaces.xlinkns,p=new core.DomUtils,
r=(new core.Utils).hashString(l),d=null,k=null,a=null,e={},h={};this.generateStyleName=function(){null===d&&(d=new c("auto"+r+"_",function(){return m()}));return d.generateName()};this.generateFrameName=function(){null===k&&(p.getElementsByTagNameNS(g.rootElement.body,n,"frame").forEach(function(a){e[a.getAttributeNS(n,"name")]=!0}),k=new c("fr"+r+"_",function(){return e}));return k.generateName()};this.generateImageName=function(){null===a&&(p.getElementsByTagNameNS(g.rootElement.body,n,"image").forEach(function(a){a=
a.getAttributeNS(b,"href");a=a.substring(9,a.lastIndexOf("."));h[a]=!0}),a=new c("img"+r+"_",function(){return h}));return a.generateName()}};
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
runtime.loadClass("core.Utils");runtime.loadClass("odf.ObjectNameGenerator");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.TextStyleApplicator");
odf.Formatting=function(){function g(a){return(a=t[a])?w.mergeObjects({},a):null}function l(){for(var a=k.rootElement.fontFaceDecls,b={},c,d,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(c=a.getAttributeNS(h,"name"))&&((d=a.getAttributeNS(e,"font-family"))||a.getElementsByTagNameNS(e,"font-face-uri")[0])&&(b[c]=d),a=a.nextSibling;return b}function c(a){for(var b=k.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===h&&"default-style"===b.localName&&b.getAttributeNS(h,
"family")===a)return b;b=b.nextSibling}return null}function m(a,b,c){var e,d;c=c||[k.rootElement.automaticStyles,k.rootElement.styles];for(e=c.shift();e;){for(e=e.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&(d=e.getAttributeNS(h,"name"),e.namespaceURI===h&&"style"===e.localName&&e.getAttributeNS(h,"family")===b&&d===a||"list-style"===b&&e.namespaceURI===q&&"list-style"===e.localName&&d===a||"data"===b&&e.namespaceURI===u&&d===a))return e;e=e.nextSibling}e=c.shift()}return null}function f(a){for(var b,
c={},e=a.firstChild;e;){if(e.nodeType===Node.ELEMENT_NODE&&e.namespaceURI===h)for(c[e.nodeName]={},b=0;b<e.attributes.length;b+=1)c[e.nodeName][e.attributes[b].name]=e.attributes[b].value;e=e.nextSibling}for(b=0;b<a.attributes.length;b+=1)c[a.attributes[b].name]=a.attributes[b].value;return c}function n(a,b){for(var e=k.rootElement.styles,d,l={},p=a.getAttributeNS(h,"family"),n=a;n;)d=f(n),l=w.mergeObjects(d,l),n=(d=n.getAttributeNS(h,"parent-style-name"))?m(d,p,[e]):null;if(n=c(p))d=f(n),l=w.mergeObjects(d,
l);b&&(d=g(p))&&(l=w.mergeObjects(d,l));return l}function b(b,c){for(var e=b.nodeType===Node.TEXT_NODE?b.parentNode:b,d,h=[],f="",k=!1;e;)!k&&v.isGroupingElement(e)&&(k=!0),(d=a.determineStylesForNode(e))&&h.push(d),e=e.parentNode;k&&(h.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){f+="|"+b+":"+a+"|"})})}),c&&(c[f]=h));return k?h:void 0}function p(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var e=Object.keys(a[c])[0],
d,f;(d=m(e,c))?(f=n(d),b=w.mergeObjects(f,b),f=d.getAttributeNS(h,"display-name")):runtime.log("No style element found for '"+e+"' of family '"+c+"'");b.orderedStyles.push({name:e,family:c,displayName:f})})});return b}function r(a,b){var c=v.parseLength(a),e=b;if(c)switch(c.unit){case "cm":e=c.value;break;case "mm":e=0.1*c.value;break;case "in":e=2.54*c.value;break;case "pt":e=0.035277778*c.value;break;case "pc":case "px":case "em":break;default:runtime.log("Unit identifier: "+c.unit+" is not supported.")}return e}
var d=this,k,a=new odf.StyleInfo,e=odf.Namespaces.svgns,h=odf.Namespaces.stylens,q=odf.Namespaces.textns,u=odf.Namespaces.numberns,x=odf.Namespaces.fons,v=new odf.OdfUtils,y=new core.DomUtils,w=new core.Utils,t={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.getSystemDefaultStyleAttributes=g;this.setOdfContainer=function(a){k=a};this.getFontMap=l;this.getAvailableParagraphStyles=function(){for(var a=k.rootElement.styles&&k.rootElement.styles.firstChild,b,c,e=[];a;)a.nodeType===
Node.ELEMENT_NODE&&"style"===a.localName&&a.namespaceURI===h&&(c=a,b=c.getAttributeNS(h,"family"),"paragraph"===b&&(b=c.getAttributeNS(h,"name"),c=c.getAttributeNS(h,"display-name")||b,b&&c&&e.push({name:b,displayName:c}))),a=a.nextSibling;return e};this.isStyleUsed=function(b){var c;c=a.hasDerivedStyles(k.rootElement,odf.Namespaces.resolvePrefix,b);b=(new a.UsedStyleList(k.rootElement.styles)).uses(b)||(new a.UsedStyleList(k.rootElement.automaticStyles)).uses(b)||(new a.UsedStyleList(k.rootElement.body)).uses(b);
return c||b};this.getDefaultStyleElement=c;this.getStyleElement=m;this.getStyleAttributes=f;this.getInheritedStyleAttributes=n;this.getFirstCommonParentStyleNameOrSelf=function(a){var b=k.rootElement.automaticStyles,c=k.rootElement.styles,e;for(e=m(a,"paragraph",[b]);e;)a=e.getAttributeNS(h,"parent-style-name"),e=m(a,"paragraph",[b]);return(e=m(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(m(a,"paragraph"))};this.getAppliedStyles=function(a){var c={},e=[];a.forEach(function(a){b(a,
c)});Object.keys(c).forEach(function(a){e.push(p(c[a]))});return e};this.getAppliedStylesForElement=function(a){return(a=b(a))?p(a):void 0};this.applyStyle=function(a,b,c,e){(new odf.TextStyleApplicator(new odf.ObjectNameGenerator(k,a),d,k.rootElement.automaticStyles)).applyStyle(b,c,e)};this.updateStyle=function(a,b){var c,d;y.mapObjOntoNode(a,b,odf.Namespaces.resolvePrefix);(c=b["style:text-properties"]&&b["style:text-properties"]["style:font-name"])&&!l().hasOwnProperty(c)&&(d=a.ownerDocument.createElementNS(h,
"style:font-face"),d.setAttributeNS(h,"style:name",c),d.setAttributeNS(e,"svg:font-family",c),k.rootElement.fontFaceDecls.appendChild(d))};this.createDerivedStyleObject=function(a,b,c){var e=m(a,b);runtime.assert(Boolean(e),"No style element found for '"+a+"' of family '"+b+"'");a=e.parentNode===k.rootElement.automaticStyles?f(e):{"style:parent-style-name":a};a["style:family"]=b;w.mergeObjects(a,c);return a};this.getDefaultTabStopDistance=function(){var a=c("paragraph");(a=(a=a&&a.getAttributeNS(h,
"paragraph-properties"))&&a.getAttributeNS(h,"tab-stop-distance"))||(a="1.25cm");return v.parseNonNegativeLength(a)};this.getContentSize=function(a,b){var c,e,d,f,g,l,p,n,q,t,w,u;a:{c=m(a,b);var v,S,Y;runtime.assert("paragraph"===b||"table"===b,"styleFamily has to be either paragraph or table");if(c){v=c.getAttributeNS(h,"master-page-name")||"Standard";for(c=k.rootElement.masterStyles.lastChild;c&&c.previousSibling&&c.getAttributeNS(h,"name")!==v;)c=c.previousSibling;v=c.getAttributeNS(h,"page-layout-name");
S=y.getElementsByTagNameNS(k.rootElement.automaticStyles,h,"page-layout");for(Y=0;Y<S.length;Y+=1)if(c=S[Y],c.getAttributeNS(h,"name")===v)break a}c=null}c||(c=k.rootElement.styles.getElementsByTagNameNS(h,"default-page-layout")[0]);c&&(e=c.getElementsByTagNameNS(h,"page-layout-properties")[0]);e&&(d=e.getAttributeNS(h,"print-orientation")||"portrait","portrait"===d?(d=21.001,f=29.7):(d=29.7,f=21.001),d=r(e.getAttributeNS(x,"page-width"),d),f=r(e.getAttributeNS(x,"page-height"),f),g=r(e.getAttributeNS(x,
"margin"),null),null===g?(g=r(e.getAttributeNS(x,"margin-left"),2),l=r(e.getAttributeNS(x,"margin-right"),2),p=r(e.getAttributeNS(x,"margin-top"),2),n=r(e.getAttributeNS(x,"margin-bottom"),2)):g=l=p=n=g,q=r(e.getAttributeNS(x,"padding"),null),null===q?(q=r(e.getAttributeNS(x,"padding-left"),0),t=r(e.getAttributeNS(x,"padding-right"),0),w=r(e.getAttributeNS(x,"padding-top"),0),u=r(e.getAttributeNS(x,"padding-bottom"),0)):q=t=w=u=q);return{width:d-g-l-q-t,height:f-p-n-w-u}}};
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
odf.OdfCanvas=function(){function g(){function a(e){c=!0;runtime.setTimeout(function(){try{e()}catch(d){runtime.log(d)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(e){if(0===b.length&&!c)return a(e);b.push(e)}}function l(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
e+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+e+") {display:block;}",3)}var c=a.sheet,e=1;this.showFirstPage=function(){e=1;b()};this.showNextPage=function(){e+=1;b()};this.showPreviousPage=function(){1<e&&(e-=1,b())};this.showPage=function(a){0<a&&(e=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function c(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function m(a,b,c){var e=
"on"+b;a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent?a.detachEvent(e,c):a[e]===c&&(a[e]=null)}function f(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}function e(){var c=[],f=runtime.getWindow().getSelection(),k,g;for(k=0;k<f.rangeCount;k+=1)g=f.getRangeAt(k),null!==g&&b(a,g.startContainer)&&b(a,g.endContainer)&&c.push(g);if(c.length===d.length){for(f=0;f<c.length&&(k=c[f],g=d[f],k=k===g?!1:null===k||null===g?!0:k.startContainer!==g.startContainer||k.startOffset!==
g.startOffset||k.endContainer!==g.endContainer||k.endOffset!==g.endOffset,!k);f+=1);if(f===c.length)return}d=c;var f=[c.length],l,m=a.ownerDocument;for(k=0;k<c.length;k+=1)g=c[k],l=m.createRange(),l.setStart(g.startContainer,g.startOffset),l.setEnd(g.endContainer,g.endOffset),f[k]=l;d=f;f=h.length;for(c=0;c<f;c+=1)h[c](a,d)}var d=[],h=[];this.addListener=function(a,b){var c,e=h.length;for(c=0;c<e;c+=1)if(h[c]===b)return;h.push(b)};this.destroy=function(b){m(a,"mouseup",e);m(a,"keyup",e);m(a,"keydown",
e);b()};c(a,"mouseup",e);c(a,"keyup",e);c(a,"keydown",e)}function n(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function b(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function p(a,b,c){var e=null;a=a.rootElement.body.getElementsByTagNameNS(F,c+"-decl");if((c=b.getAttributeNS(F,"use-"+c+"-name"))&&0<a.length)for(b=0;b<a.length;b+=1)if(a[b].getAttributeNS(F,"name")===c){e=a[b].textContent;break}return e}function r(a,
b,c,e){var d=a.ownerDocument;b=a.getElementsByTagNameNS(b,c);for(a=0;a<b.length;a+=1)n(b[a]),e&&b[a].appendChild(d.createTextNode(e))}function d(a,b,c){b.setAttributeNS("urn:webodf:names:helper","styleid",a);var e,d=b.getAttributeNS(M,"anchor-type"),h=b.getAttributeNS(A,"x"),f=b.getAttributeNS(A,"y"),k=b.getAttributeNS(A,"width"),g=b.getAttributeNS(A,"height"),l=b.getAttributeNS(t,"min-height"),m=b.getAttributeNS(t,"min-width");if("as-char"===d)e="display: inline-block;";else if(d||h||f)e="position: absolute;";
else if(k||g||l||m)e="display: block;";h&&(e+="left: "+h+";");f&&(e+="top: "+f+";");k&&(e+="width: "+k+";");g&&(e+="height: "+g+";");l&&(e+="min-height: "+l+";");m&&(e+="min-width: "+m+";");e&&(e="draw|"+b.localName+'[webodfhelper|styleid="'+a+'"] {'+e+"}",c.insertRule(e,c.cssRules.length))}function k(a){for(a=a.firstChild;a;){if(a.namespaceURI===s&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function a(a,b,c,e){function d(b){b&&
(b='draw|image[webodfhelper|styleid="'+a+'"] {'+("background-image: url("+b+");")+"}",e.insertRule(b,e.cssRules.length))}c.setAttributeNS("urn:webodf:names:helper","styleid",a);var h=c.getAttributeNS(z,"href"),f;if(h)try{f=b.getPart(h),f.onchange=function(a){d(a.url)},f.load()}catch(g){runtime.log("slight problem: "+g)}else h=k(c),d(h)}function e(a){function b(c){var e,d;c.hasAttributeNS(z,"href")&&(e=c.getAttributeNS(z,"href"),"#"===e[0]?(e=e.substring(1),d=function(){var b=$.getODFElementsWithXPath(a,
"//text:bookmark-start[@text:name='"+e+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=$.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+e+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);return!1}):d=function(){Q.open(e)},c.onclick=d)}var c,e,d;e=a.getElementsByTagNameNS(M,"a");for(c=0;c<e.length;c+=1)d=e.item(c),b(d)}function h(a){var b=a.ownerDocument;R.getElementsByTagNameNS(a,M,"line-break").forEach(function(a){a.hasChildNodes()||a.appendChild(b.createElement("br"))})}
function q(a){var b=a.ownerDocument;R.getElementsByTagNameNS(a,M,"s").forEach(function(a){for(var c,e;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));e=parseInt(a.getAttributeNS(M,"c"),10);if(1<e)for(a.removeAttributeNS(M,"c"),c=1;c<e;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function u(a){R.getElementsByTagNameNS(a,M,"tab").forEach(function(a){a.textContent="\t"})}function x(a,b){function c(a,h){var k=f.documentElement.namespaceURI;"video/"===h.substr(0,6)?
(e=f.createElementNS(k,"video"),e.setAttribute("controls","controls"),d=f.createElementNS(k,"source"),d.setAttribute("src",a),d.setAttribute("type",h),e.appendChild(d),b.parentNode.appendChild(e)):b.innerHtml="Unrecognised Plugin"}var e,d,h,f=b.ownerDocument,g;if(h=b.getAttributeNS(z,"href"))try{g=a.getPart(h),g.onchange=function(a){c(a.url,a.mimetype)},g.load()}catch(l){runtime.log("slight problem: "+l)}else runtime.log("using MP4 data fallback"),h=k(b),c(h,"video/mp4")}function v(a){var b=a.getElementsByTagName("head")[0],
c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function y(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,
"style"),e="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){e+="@namespace "+a+" url("+b+");\n"});e+="@namespace webodfhelper url(urn:webodf:names:helper);\n";c.appendChild(a.createTextNode(e));b.appendChild(c);return c}var w=odf.Namespaces.drawns,t=odf.Namespaces.fons,s=odf.Namespaces.officens,D=odf.Namespaces.stylens,A=odf.Namespaces.svgns,B=odf.Namespaces.tablens,M=odf.Namespaces.textns,z=odf.Namespaces.xlinkns,
K=odf.Namespaces.xmlns,F=odf.Namespaces.presentationns,Q=runtime.getWindow(),$=new xmldom.XPath,ia=new odf.OdfUtils,R=new core.DomUtils;odf.OdfCanvas=function(k){function m(b,c,e){function d(b,c,e,h){C.addToQueue(function(){a(b,c,e,h)})}var h,f;h=c.getElementsByTagNameNS(w,"image");for(c=0;c<h.length;c+=1)f=h.item(c),d("image"+String(c),b,f,e)}function t(a,b){function c(a,b){C.addToQueue(function(){x(a,b)})}var e,d,h;d=b.getElementsByTagNameNS(w,"plugin");for(e=0;e<d.length;e+=1)h=d.item(e),c(a,h)}
function A(){T.firstChild&&(1<W?(T.style.MozTransformOrigin="center top",T.style.WebkitTransformOrigin="center top",T.style.OTransformOrigin="center top",T.style.msTransformOrigin="center top"):(T.style.MozTransformOrigin="left top",T.style.WebkitTransformOrigin="left top",T.style.OTransformOrigin="left top",T.style.msTransformOrigin="left top"),T.style.WebkitTransform="scale("+W+")",T.style.MozTransform="scale("+W+")",T.style.OTransform="scale("+W+")",T.style.msTransform="scale("+W+")",k.style.width=
Math.round(W*T.offsetWidth)+"px",k.style.height=Math.round(W*T.offsetHeight)+"px")}function z(a){function b(a){return e===a.getAttributeNS(s,"name")}var c=R.getElementsByTagNameNS(a,s,"annotation");a=R.getElementsByTagNameNS(a,s,"annotation-end");var e,d;for(d=0;d<c.length;d+=1)e=c[d].getAttributeNS(s,"name"),ea.addAnnotation({node:c[d],end:a.filter(b)[0]||null});ea.rerenderAnnotations()}function V(a){L?(P.parentNode||(T.appendChild(P),A()),ea&&ea.forgetAnnotations(),ea=new gui.AnnotationViewManager(ha,
a.body,P),z(a.body)):P.parentNode&&(T.removeChild(P),ea.forgetAnnotations(),A())}function G(a){function c(){n(k);k.style.display="inline-block";var f=O.rootElement;k.ownerDocument.importNode(f,!0);Z.setOdfContainer(O);var g=O,l=U;(new odf.FontLoader).loadFonts(g,l.sheet);b(O,Z,H);l=O;g=la.sheet;n(k);T=N.createElementNS(k.namespaceURI,"div");T.style.display="inline-block";T.style.background="white";T.appendChild(f);k.appendChild(T);P=N.createElementNS(k.namespaceURI,"div");P.id="annotationsPane";fa=
N.createElementNS(k.namespaceURI,"div");fa.id="shadowContent";fa.style.position="absolute";fa.style.top=0;fa.style.left=0;l.getContentElement().appendChild(fa);var v=f.body,x,y,z;y=[];for(x=v.firstChild;x&&x!==v;)if(x.namespaceURI===w&&(y[y.length]=x),x.firstChild)x=x.firstChild;else{for(;x&&x!==v&&!x.nextSibling;)x=x.parentNode;x&&x.nextSibling&&(x=x.nextSibling)}for(z=0;z<y.length;z+=1)x=y[z],d("frame"+String(z),x,g);y=$.getODFElementsWithXPath(v,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);
for(x=0;x<y.length;x+=1)v=y[x],v.setAttributeNS&&v.setAttributeNS("urn:webodf:names:helper","containsparagraphanchor",!0);var v=fa,R,C,J;J=0;var E,I;y=l.rootElement.ownerDocument;if((x=f.body.firstElementChild)&&x.namespaceURI===s&&("presentation"===x.localName||"drawing"===x.localName))for(x=x.firstElementChild;x;){z=x.getAttributeNS(w,"master-page-name");if(z){R=l.rootElement.masterStyles.getElementsByTagNameNS(D,"master-page");C=null;J=void 0;for(J=0;J<R.length;J+=1)if(R[J].getAttributeNS(D,"name")===
z){C=R[J];break}z=C}else z=null;if(z){R=x.getAttributeNS("urn:webodf:names:helper","styleid");C=y.createElementNS(w,"draw:page");I=z.firstElementChild;for(E=0;I;)"true"!==I.getAttributeNS(F,"placeholder")&&(J=I.cloneNode(!0),C.appendChild(J),d(R+"_"+E,J,g)),I=I.nextElementSibling,E+=1;I=E=J=void 0;var L=C.getElementsByTagNameNS(w,"frame");for(J=0;J<L.length;J+=1)E=L[J],(I=E.getAttributeNS(F,"class"))&&!/^(date-time|footer|header|page-number')$/.test(I)&&E.parentNode.removeChild(E);v.appendChild(C);
J=String(v.getElementsByTagNameNS(w,"page").length);r(C,M,"page-number",J);r(C,F,"header",p(l,x,"header"));r(C,F,"footer",p(l,x,"footer"));d(R,C,g);C.setAttributeNS(w,"draw:master-page-name",z.getAttributeNS(D,"name"))}x=x.nextElementSibling}x=f.body.getElementsByTagNameNS(B,"table-cell");for(v=0;v<x.length;v+=1)y=x.item(v),y.hasAttributeNS(B,"number-columns-spanned")&&y.setAttribute("colspan",y.getAttributeNS(B,"number-columns-spanned")),y.hasAttributeNS(B,"number-rows-spanned")&&y.setAttribute("rowspan",
y.getAttributeNS(B,"number-rows-spanned"));e(f.body);h(f.body);q(f.body);u(f.body);m(l,f.body,g);t(l,f.body);y=f.body;v={};x={};var G;z=Q.document.getElementsByTagNameNS(M,"list-style");for(l=0;l<z.length;l+=1)J=z.item(l),(E=J.getAttributeNS(D,"name"))&&(x[E]=J);y=y.getElementsByTagNameNS(M,"list");for(l=0;l<y.length;l+=1)if(J=y.item(l),z=J.getAttributeNS(K,"id")){R=J.getAttributeNS(M,"continue-list");J.setAttribute("id",z);C="text|list#"+z+" > text|list-item > *:first-child:before {";if(E=J.getAttributeNS(M,
"style-name"))J=x[E],G=ia.getFirstNonWhitespaceChild(J),J=void 0,G&&("list-level-style-number"===G.localName?(J=G.getAttributeNS(D,"num-format"),E=G.getAttributeNS(D,"num-suffix"),I="",I={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},L=void 0,L=G.getAttributeNS(D,"num-prefix")||"",L=I.hasOwnProperty(J)?L+(" counter(list, "+I[J]+")"):J?L+("'"+J+"';"):L+" ''",E&&(L+=" '"+E+"'"),J=I="content: "+L+";"):"list-level-style-image"===G.localName?J="content: none;":"list-level-style-bullet"===
G.localName&&(J="content: '"+G.getAttributeNS(M,"bullet-char")+"';")),G=J;if(R){for(J=v[R];J;)R=J,J=v[R];C+="counter-increment:"+R+";";G?(G=G.replace("list",R),C+=G):C+="content:counter("+R+");"}else R="",G?(G=G.replace("list",z),C+=G):C+="content: counter("+z+");",C+="counter-increment:"+z+";",g.insertRule("text|list#"+z+" {counter-reset:"+z+"}",g.cssRules.length);C+="}";v[z]=R;C&&g.insertRule(C,g.cssRules.length)}T.insertBefore(fa,T.firstChild);A();V(f);if(!a&&(f=[O],ja.hasOwnProperty("statereadychange")))for(g=
ja.statereadychange,G=0;G<g.length;G+=1)g[G].apply(null,f)}O.state===odf.OdfContainer.DONE?c():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function oa(){O.state===odf.OdfContainer.DONE?c():(runtime.log("will be back later..."),runtime.setTimeout(oa,500))},100))}function I(a){C.clearQueue();k.innerHTML=runtime.tr("Loading")+" "+a+"...";k.removeAttribute("style");O=new odf.OdfContainer(a,function(a){O=a;G(!1)})}runtime.assert(null!==k&&void 0!==k,"odf.OdfCanvas constructor needs DOM element");
runtime.assert(null!==k.ownerDocument&&void 0!==k.ownerDocument,"odf.OdfCanvas constructor needs DOM");var ha=this,N=k.ownerDocument,O,Z=new odf.Formatting,ka=new f(k),ca,T,P,L=!1,ea,E,U,H,la,fa,W=1,ja={},C=new g;this.refreshCSS=function(){b(O,Z,H);A()};this.refreshSize=function(){A()};this.odfContainer=function(){return O};this.slidevisibilitycss=function(){return ca.css};this.setOdfContainer=function(a,b){O=a;G(!0===b)};this.load=this.load=I;this.save=function(a){O.save(a)};this.addListener=function(a,
b){switch(a){case "selectionchange":ka.addListener(a,b);break;case "click":c(k,a,b);break;default:var e=ja[a];void 0===e&&(e=ja[a]=[]);b&&-1===e.indexOf(b)&&e.push(b)}};this.getFormatting=function(){return Z};this.getAnnotationViewManager=function(){return ea};this.refreshAnnotations=function(){V(O.rootElement)};this.rerenderAnnotations=function(){ea&&ea.rerenderAnnotations()};this.getSizer=function(){return T};this.enableAnnotations=function(a){a!==L&&(L=a,O&&V(O.rootElement))};this.addAnnotation=
function(a){ea&&ea.addAnnotation(a)};this.forgetAnnotations=function(){ea&&ea.forgetAnnotations()};this.setZoomLevel=function(a){W=a;A()};this.getZoomLevel=function(){return W};this.fitToContainingElement=function(a,b){var c=k.offsetHeight/W;W=a/(k.offsetWidth/W);b/c<W&&(W=b/c);A()};this.fitToWidth=function(a){W=a/(k.offsetWidth/W);A()};this.fitSmart=function(a,b){var c,e;c=k.offsetWidth/W;e=k.offsetHeight/W;c=a/c;void 0!==b&&b/e<c&&(c=b/e);W=Math.min(1,c);A()};this.fitToHeight=function(a){W=a/(k.offsetHeight/
W);A()};this.showFirstPage=function(){ca.showFirstPage()};this.showNextPage=function(){ca.showNextPage()};this.showPreviousPage=function(){ca.showPreviousPage()};this.showPage=function(a){ca.showPage(a);A()};this.getElement=function(){return k};this.addCssForFrameWithImage=function(b){var c=b.getAttributeNS(w,"name");d(c,b,la.sheet);a(c+"img",O,b.firstChild,la.sheet)};this.destroy=function(a){var b=N.getElementsByTagName("head")[0];P&&P.parentNode&&P.parentNode.removeChild(P);T&&k.removeChild(T);
b.removeChild(E);b.removeChild(U);b.removeChild(H);b.removeChild(la);ka.destroy(function(b){b?a(b):ca.destroy(a)})};E=v(N);ca=new l(y(N));U=y(N);H=y(N);la=y(N)};return odf.OdfCanvas}();
// Input 40
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(g,l,c){return new odf.OdfContainer(g,function(m){if(m.state===odf.OdfContainer.INVALID)return c("Document "+g+" is invalid.");m.state===odf.OdfContainer.DONE?m.saveAs(l,function(f){c(f)}):c("Document was not completely loaded.")})};this.render=function(g,l,c){for(l=l.getElementsByTagName("body")[0];l.firstChild;)l.removeChild(l.firstChild);l=new odf.OdfCanvas(l);l.addListener("statereadychange",function(g){c(g)});l.load(g)}};
// Input 41
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
ops.Member=function(g,l){var c={};this.getMemberId=function(){return g};this.getProperties=function(){return c};this.setProperties=function(g){Object.keys(g).forEach(function(f){c[f]=g[f]})};this.removeProperties=function(g){delete g.fullName;delete g.color;delete g.imageUrl;Object.keys(g).forEach(function(f){c.hasOwnProperty(f)&&delete c[f]})};runtime.assert(Boolean(g),"No memberId was supplied!");l.fullName||(l.fullName=runtime.tr("Unknown Author"));l.color||(l.color="black");l.imageUrl||(l.imageUrl=
"avatar-joe.png");c=l};
// Input 42
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
ops.Server=function(){};ops.Server.prototype.connect=function(g,l){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(g,l,c,m){};ops.Server.prototype.joinSession=function(g,l,c,m){};ops.Server.prototype.leaveSession=function(g,l,c,m){};ops.Server.prototype.getGenesisUrl=function(g){};
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
ops.Operation=function(){};ops.Operation.prototype.init=function(g){};ops.Operation.prototype.execute=function(g){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var g,l;this.init=function(c){g=c.memberid;l=c.timestamp};this.isEdit=!1;this.execute=function(c){var l=c.getCursor(g);if(l)return!1;l=new ops.OdtCursor(g,c);c.addCursor(l);c.emit(ops.OdtDocument.signalCursorAdded,l);return!0};this.spec=function(){return{optype:"AddCursor",memberid:g,timestamp:l}}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");
gui.StyleHelper=function(g){function l(b,c,f){var d=!0,k;for(k=0;k<b.length&&!(d=b[k]["style:text-properties"],d=!d||d[c]!==f);k+=1);return!d}function c(b,c,l){function d(){a=!0;(h=g.getDefaultStyleElement("paragraph"))||(h=null)}b=f.getParagraphElements(b);for(var k={},a=!1,e,h;0<b.length;){(e=b[0].getAttributeNS(n,"style-name"))?k[e]||(h=g.getStyleElement(e,"paragraph"),k[e]=!0,h||a||d()):a?h=void 0:d();if(void 0!==h&&(e=null===h?g.getSystemDefaultStyleAttributes("paragraph"):g.getInheritedStyleAttributes(h,
!0),(e=e["style:paragraph-properties"])&&-1===l.indexOf(e[c])))return!1;b.pop()}return!0}var m=new core.DomUtils,f=new odf.OdfUtils,n=odf.Namespaces.textns;this.getAppliedStyles=function(b){var c;b.collapsed?(c=b.startContainer,c.hasChildNodes()&&b.startOffset<c.childNodes.length&&(c=c.childNodes[b.startOffset]),b=[c]):b=f.getTextNodes(b,!0);return g.getAppliedStyles(b)};this.applyStyle=function(b,c,l){var d=m.splitBoundaries(c),k=f.getTextNodes(c,!1);g.applyStyle(b,k,{startContainer:c.startContainer,
startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset},l);d.forEach(m.normalizeTextNodes)};this.isBold=function(b){return l(b,"fo:font-weight","bold")};this.isItalic=function(b){return l(b,"fo:font-style","italic")};this.hasUnderline=function(b){return l(b,"style:text-underline-style","solid")};this.hasStrikeThrough=function(b){return l(b,"style:text-line-through-style","solid")};this.isAlignedLeft=function(b){return c(b,"fo:text-align",["left","start"])};this.isAlignedCenter=
function(b){return c(b,"fo:text-align",["center"])};this.isAlignedRight=function(b){return c(b,"fo:text-align",["right","end"])};this.isAlignedJustified=function(b){return c(b,"fo:text-align",["justify"])}};
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
runtime.loadClass("gui.StyleHelper");runtime.loadClass("odf.OdfUtils");
ops.OpApplyDirectStyling=function(){function g(b){var c=0<=f?m+f:m,d=b.getIteratorAtPosition(0<=f?m:m+f),c=f?b.getIteratorAtPosition(c):d;b=b.getDOM().createRange();b.setStart(d.container(),d.unfilteredDomOffset());b.setEnd(c.container(),c.unfilteredDomOffset());return b}var l,c,m,f,n,b=new odf.OdfUtils;this.init=function(b){l=b.memberid;c=b.timestamp;m=parseInt(b.position,10);f=parseInt(b.length,10);n=b.setProperties};this.isEdit=!0;this.execute=function(f){var m=g(f),d=b.getImpactedParagraphs(m);
(new gui.StyleHelper(f.getFormatting())).applyStyle(l,m,n);m.detach();f.getOdfCanvas().refreshCSS();f.fixCursorPositions();d.forEach(function(b){f.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:b,memberId:l,timeStamp:c})});f.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:l,timestamp:c,position:m,length:f,setProperties:n}}};
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
ops.OpRemoveCursor=function(){var g,l;this.init=function(c){g=c.memberid;l=c.timestamp};this.isEdit=!1;this.execute=function(c){return c.removeCursor(g)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:g,timestamp:l}}};
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
ops.OpMoveCursor=function(){var g,l,c,m,f;this.init=function(n){g=n.memberid;l=n.timestamp;c=n.position;m=n.length||0;f=n.selectionType||ops.OdtCursor.RangeSelection};this.isEdit=!1;this.execute=function(l){var b=l.getCursor(g),p;if(!b)return!1;p=l.convertCursorToDomRange(c,m);b.setSelectedRange(p,0<=m);b.setSelectionType(f);l.emit(ops.OdtDocument.signalCursorMoved,b);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:g,timestamp:l,position:c,length:m,selectionType:f}}};
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
ops.OpSetBlob=function(){var g,l,c,m,f;this.init=function(n){g=n.memberid;l=n.timestamp;c=n.filename;m=n.mimetype;f=n.content};this.isEdit=!0;this.execute=function(g){g.getOdfCanvas().odfContainer().setBlob(c,m,f);return!0};this.spec=function(){return{optype:"SetBlob",memberid:g,timestamp:l,filename:c,mimetype:m,content:f}}};
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
ops.OpRemoveBlob=function(){var g,l,c;this.init=function(m){g=m.memberid;l=m.timestamp;c=m.filename};this.isEdit=!0;this.execute=function(g){g.getOdfCanvas().odfContainer().removeBlob(c);return!0};this.spec=function(){return{optype:"RemoveBlob",memberid:g,timestamp:l,filename:c}}};
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
ops.OpInsertImage=function(){var g,l,c,m,f,n,b,p,r=odf.Namespaces.drawns,d=odf.Namespaces.svgns,k=odf.Namespaces.textns,a=odf.Namespaces.xlinkns;this.init=function(a){g=a.memberid;l=a.timestamp;c=a.position;m=a.filename;f=a.frameWidth;n=a.frameHeight;b=a.frameStyleName;p=a.frameName};this.isEdit=!0;this.execute=function(e){var h=e.getOdfCanvas(),q=e.getTextNodeAtStep(c,g),u,x;if(!q)return!1;u=q.textNode;x=e.getParagraphElement(u);var q=q.offset!==u.length?u.splitText(q.offset):u.nextSibling,v=e.getDOM(),
y=v.createElementNS(r,"draw:image"),v=v.createElementNS(r,"draw:frame");y.setAttributeNS(a,"xlink:href",m);y.setAttributeNS(a,"xlink:type","simple");y.setAttributeNS(a,"xlink:show","embed");y.setAttributeNS(a,"xlink:actuate","onLoad");v.setAttributeNS(r,"draw:style-name",b);v.setAttributeNS(r,"draw:name",p);v.setAttributeNS(k,"text:anchor-type","as-char");v.setAttributeNS(d,"svg:width",f);v.setAttributeNS(d,"svg:height",n);v.appendChild(y);u.parentNode.insertBefore(v,q);e.emit(ops.OdtDocument.signalStepsInserted,
{position:c,length:1});0===u.length&&u.parentNode.removeChild(u);h.addCssForFrameWithImage(v);h.refreshCSS();e.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:x,memberId:g,timeStamp:l});h.rerenderAnnotations();return!0};this.spec=function(){return{optype:"InsertImage",memberid:g,timestamp:l,filename:m,position:c,frameWidth:f,frameHeight:n,frameStyleName:b,frameName:p}}};
// Input 52
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
ops.OpInsertTable=function(){function g(b,a){var c;if(1===d.length)c=d[0];else if(3===d.length)switch(b){case 0:c=d[0];break;case m-1:c=d[2];break;default:c=d[1]}else c=d[b];if(1===c.length)return c[0];if(3===c.length)switch(a){case 0:return c[0];case f-1:return c[2];default:return c[1]}return c[a]}var l,c,m,f,n,b,p,r,d;this.init=function(k){l=k.memberid;c=k.timestamp;n=k.position;m=k.initialRows;f=k.initialColumns;b=k.tableName;p=k.tableStyleName;r=k.tableColumnStyleName;d=k.tableCellStyleMatrix};
this.isEdit=!0;this.execute=function(d){var a=d.getTextNodeAtStep(n),e=d.getRootNode();if(a){var h=d.getDOM(),q=h.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),u=h.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),x,v,y,w;p&&q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",p);b&&q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",b);u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:number-columns-repeated",f);r&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",r);q.appendChild(u);for(y=0;y<m;y+=1){u=h.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(w=0;w<f;w+=1)x=h.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(v=g(y,w))&&x.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",v),v=h.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"text:p"),x.appendChild(v),u.appendChild(x);q.appendChild(u)}a=d.getParagraphElement(a.textNode);e.insertBefore(q,a.nextSibling);d.emit(ops.OdtDocument.signalStepsInserted,{position:n,length:f*m+1});d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalTableAdded,{tableElement:q,memberId:l,timeStamp:c});d.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:l,timestamp:c,position:n,initialRows:m,initialColumns:f,tableName:b,tableStyleName:p,
tableColumnStyleName:r,tableCellStyleMatrix:d}}};
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
ops.OpInsertText=function(){var g,l,c,m;this.init=function(f){g=f.memberid;l=f.timestamp;c=f.position;m=f.text};this.isEdit=!0;this.execute=function(f){var n,b,p,r=null,d=f.getDOM(),k,a=0,e,h;f.upgradeWhitespacesAtPosition(c);if(n=f.getTextNodeAtStep(c,g)){b=n.textNode;r=b.nextSibling;p=b.parentNode;k=f.getParagraphElement(b);for(h=0;h<m.length;h+=1)if(" "===m[h]&&(0===h||h===m.length-1||" "===m[h-1])||"\t"===m[h])0===a?(n.offset!==b.length&&(r=b.splitText(n.offset)),0<h&&b.appendData(m.substring(0,
h))):a<h&&(a=m.substring(a,h),p.insertBefore(d.createTextNode(a),r)),a=h+1,e=" "===m[h]?"text:s":"text:tab",e=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",e),e.appendChild(d.createTextNode(m[h])),p.insertBefore(e,r);0===a?b.insertData(n.offset,m):a<m.length&&(n=m.substring(a),p.insertBefore(d.createTextNode(n),r));p=b.parentNode;r=b.nextSibling;p.removeChild(b);p.insertBefore(b,r);0===b.length&&b.parentNode.removeChild(b);f.emit(ops.OdtDocument.signalStepsInserted,{position:c,
length:m.length});0<c&&(1<c&&f.downgradeWhitespacesAtPosition(c-2),f.downgradeWhitespacesAtPosition(c-1));f.downgradeWhitespacesAtPosition(c);f.downgradeWhitespacesAtPosition(c+m.length-1);f.downgradeWhitespacesAtPosition(c+m.length);f.getOdfCanvas().refreshSize();f.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:g,timeStamp:l});f.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:g,timestamp:l,position:c,text:m}}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("core.DomUtils");
ops.OpRemoveText=function(){function g(c){function d(a){return p.hasOwnProperty(a.namespaceURI)||"br"===a.localName&&n.isLineBreak(a.parentNode)||a.nodeType===Node.TEXT_NODE&&p.hasOwnProperty(a.parentNode.namespaceURI)}function f(a){if(n.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(p.hasOwnProperty(a.namespaceURI)||!f(a))return!1;a=a.nextSibling}return!0}function a(e){var h;e.nodeType===Node.TEXT_NODE?(h=e.parentNode,h.removeChild(e)):
h=b.removeUnwantedNodes(e,d);return!n.isParagraph(h)&&h!==c&&f(h)?a(h):h}this.isEmpty=f;this.mergeChildrenIntoParent=a}var l,c,m,f,n,b,p={};this.init=function(g){runtime.assert(0<=g.length,"OpRemoveText only supports positive lengths");l=g.memberid;c=g.timestamp;m=parseInt(g.position,10);f=parseInt(g.length,10);n=new odf.OdfUtils;b=new core.DomUtils;p[odf.Namespaces.dbns]=!0;p[odf.Namespaces.dcns]=!0;p[odf.Namespaces.dr3dns]=!0;p[odf.Namespaces.drawns]=!0;p[odf.Namespaces.chartns]=!0;p[odf.Namespaces.formns]=
!0;p[odf.Namespaces.numberns]=!0;p[odf.Namespaces.officens]=!0;p[odf.Namespaces.presentationns]=!0;p[odf.Namespaces.stylens]=!0;p[odf.Namespaces.svgns]=!0;p[odf.Namespaces.tablens]=!0;p[odf.Namespaces.textns]=!0};this.isEdit=!0;this.execute=function(p){var d,k,a,e,h=p.getCursor(l),q=new g(p.getRootNode());p.upgradeWhitespacesAtPosition(m);p.upgradeWhitespacesAtPosition(m+f);k=p.convertCursorToDomRange(m,f);b.splitBoundaries(k);d=p.getParagraphElement(k.startContainer);a=n.getTextElements(k,!1,!0);
e=n.getParagraphElements(k);k.detach();a.forEach(function(a){q.mergeChildrenIntoParent(a)});k=e.reduce(function(a,b){var c,e=!1,d=a,h=b,f,k=null;q.isEmpty(a)&&(e=!0,b.parentNode!==a.parentNode&&(f=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),h=a,d=b,k=d.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||d.firstChild);for(;h.hasChildNodes();)c=e?h.lastChild:h.firstChild,h.removeChild(c),"editinfo"!==c.localName&&d.insertBefore(c,k);f&&q.isEmpty(f)&&q.mergeChildrenIntoParent(f);
q.mergeChildrenIntoParent(h);return d});p.emit(ops.OdtDocument.signalStepsRemoved,{position:m,length:f});p.downgradeWhitespacesAtPosition(m);p.fixCursorPositions();p.getOdfCanvas().refreshSize();p.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k||d,memberId:l,timeStamp:c});h&&(h.resetSelectionType(),p.emit(ops.OdtDocument.signalCursorMoved,h));p.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:l,timestamp:c,position:m,length:f}}};
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
ops.OpSplitParagraph=function(){var g,l,c,m;this.init=function(f){g=f.memberid;l=f.timestamp;c=f.position;m=new odf.OdfUtils};this.isEdit=!0;this.execute=function(f){var n,b,p,r,d,k,a;f.upgradeWhitespacesAtPosition(c);n=f.getTextNodeAtStep(c,g);if(!n)return!1;b=f.getParagraphElement(n.textNode);if(!b)return!1;p=m.isListItem(b.parentNode)?b.parentNode:b;0===n.offset?(a=n.textNode.previousSibling,k=null):(a=n.textNode,k=n.offset>=n.textNode.length?null:n.textNode.splitText(n.offset));for(r=n.textNode;r!==
p;){r=r.parentNode;d=r.cloneNode(!1);k&&d.appendChild(k);if(a)for(;a&&a.nextSibling;)d.appendChild(a.nextSibling);else for(;r.firstChild;)d.appendChild(r.firstChild);r.parentNode.insertBefore(d,r.nextSibling);a=r;k=d}m.isListItem(k)&&(k=k.childNodes[0]);0===n.textNode.length&&n.textNode.parentNode.removeChild(n.textNode);f.emit(ops.OdtDocument.signalStepsInserted,{position:c,length:1});f.fixCursorPositions();f.getOdfCanvas().refreshSize();f.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:b,
memberId:g,timeStamp:l});f.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:g,timeStamp:l});f.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:g,timestamp:l,position:c}}};
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
ops.OpSetParagraphStyle=function(){var g,l,c,m;this.init=function(f){g=f.memberid;l=f.timestamp;c=f.position;m=f.styleName};this.isEdit=!0;this.execute=function(f){var n;n=f.getIteratorAtPosition(c);return(n=f.getParagraphElement(n.container()))?(""!==m?n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",m):n.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","style-name"),f.getOdfCanvas().refreshSize(),f.emit(ops.OdtDocument.signalParagraphChanged,
{paragraphElement:n,timeStamp:l,memberId:g}),f.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:g,timestamp:l,position:c,styleName:m}}};
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
runtime.loadClass("odf.Namespaces");
ops.OpUpdateParagraphStyle=function(){function g(b,c){var d,f,a=c?c.split(","):[];for(d=0;d<a.length;d+=1)f=a[d].split(":"),b.removeAttributeNS(odf.Namespaces.resolvePrefix(f[0]),f[1])}var l,c,m,f,n,b=odf.Namespaces.stylens;this.init=function(b){l=b.memberid;c=b.timestamp;m=b.styleName;f=b.setProperties;n=b.removedProperties};this.isEdit=!0;this.execute=function(c){var l=c.getFormatting(),d,k,a;return(d=""!==m?c.getParagraphStyleElement(m):l.getDefaultStyleElement("paragraph"))?(k=d.getElementsByTagNameNS(b,
"paragraph-properties")[0],a=d.getElementsByTagNameNS(b,"text-properties")[0],f&&l.updateStyle(d,f),n&&(n["style:paragraph-properties"]&&(g(k,n["style:paragraph-properties"].attributes),0===k.attributes.length&&d.removeChild(k)),n["style:text-properties"]&&(g(a,n["style:text-properties"].attributes),0===a.attributes.length&&d.removeChild(a)),g(d,n.attributes)),c.getOdfCanvas().refreshCSS(),c.emit(ops.OdtDocument.signalParagraphStyleModified,m),c.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=
function(){return{optype:"UpdateParagraphStyle",memberid:l,timestamp:c,styleName:m,setProperties:f,removedProperties:n}}};
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
runtime.loadClass("odf.Namespaces");
ops.OpAddStyle=function(){var g,l,c,m,f,n,b=odf.Namespaces.stylens;this.init=function(b){g=b.memberid;l=b.timestamp;c=b.styleName;m=b.styleFamily;f="true"===b.isAutomaticStyle||!0===b.isAutomaticStyle;n=b.setProperties};this.isEdit=!0;this.execute=function(g){var l=g.getOdfCanvas().odfContainer(),d=g.getFormatting(),k=g.getDOM().createElementNS(b,"style:style");if(!k)return!1;n&&d.updateStyle(k,n);k.setAttributeNS(b,"style:family",m);k.setAttributeNS(b,"style:name",c);f?l.rootElement.automaticStyles.appendChild(k):
l.rootElement.styles.appendChild(k);g.getOdfCanvas().refreshCSS();f||g.emit(ops.OdtDocument.signalCommonStyleCreated,{name:c,family:m});return!0};this.spec=function(){return{optype:"AddStyle",memberid:g,timestamp:l,styleName:c,styleFamily:m,isAutomaticStyle:f,setProperties:n}}};
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
ops.OpRemoveStyle=function(){var g,l,c,m;this.init=function(f){g=f.memberid;l=f.timestamp;c=f.styleName;m=f.styleFamily};this.isEdit=!0;this.execute=function(f){var g=f.getStyleElement(c,m);if(!g)return!1;g.parentNode.removeChild(g);f.getOdfCanvas().refreshCSS();f.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:c,family:m});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:g,timestamp:l,styleName:c,styleFamily:m}}};
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
ops.OpAddAnnotation=function(){function g(b,c,f){var d=b.getTextNodeAtStep(f,l);d&&(b=d.textNode,f=b.parentNode,d.offset!==b.length&&b.splitText(d.offset),f.insertBefore(c,b.nextSibling),0===b.length&&f.removeChild(b))}var l,c,m,f,n;this.init=function(b){l=b.memberid;c=parseInt(b.timestamp,10);m=parseInt(b.position,10);f=parseInt(b.length,10)||0;n=b.name};this.isEdit=!0;this.execute=function(b){var p={},r=b.getPositionFilter(),d=b.getCursor(l),k=b.getCursorPosition(l),k=m-k-1,a=new Date(c),e,h,q,
u,x;x=b.getDOM();e=x.createElementNS(odf.Namespaces.officens,"office:annotation");e.setAttributeNS(odf.Namespaces.officens,"office:name",n);h=x.createElementNS(odf.Namespaces.dcns,"dc:creator");h.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l);h.textContent=b.getMember(l).getProperties().fullName;q=x.createElementNS(odf.Namespaces.dcns,"dc:date");q.appendChild(x.createTextNode(a.toISOString()));a=x.createElementNS(odf.Namespaces.textns,"text:list");u=x.createElementNS(odf.Namespaces.textns,
"text:list-item");x=x.createElementNS(odf.Namespaces.textns,"text:p");u.appendChild(x);a.appendChild(u);e.appendChild(h);e.appendChild(q);e.appendChild(a);p.node=e;if(!p.node)return!1;if(f){e=b.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");e.setAttributeNS(odf.Namespaces.officens,"office:name",n);p.end=e;if(!p.end)return!1;g(b,p.end,m+f)}g(b,p.node,m);b.emit(ops.OdtDocument.signalStepsInserted,{position:m,length:f});d&&(r=d.getStepCounter().countSteps(k,r),d.move(r),d.resetSelectionType(),
b.emit(ops.OdtDocument.signalCursorMoved,d));b.getOdfCanvas().addAnnotation(p);b.fixCursorPositions();return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:l,timestamp:c,position:m,length:f,name:n}}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("core.DomUtils");
ops.OpRemoveAnnotation=function(){var g,l,c,m,f;this.init=function(n){g=n.memberid;l=n.timestamp;c=parseInt(n.position,10);m=parseInt(n.length,10);f=new core.DomUtils};this.isEdit=!0;this.execute=function(g){for(var b=g.getIteratorAtPosition(c).container(),l,r,d;b.namespaceURI!==odf.Namespaces.officens||"annotation"!==b.localName;)b=b.parentNode;if(null===b)return!1;(l=b.getAttributeNS(odf.Namespaces.officens,"name"))&&(r=f.getElementsByTagNameNS(g.getRootNode(),odf.Namespaces.officens,"annotation-end").filter(function(b){return l===
b.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);g.getOdfCanvas().forgetAnnotations();for(d=f.getElementsByTagNameNS(b,"urn:webodf:names:cursor","cursor");d.length;)b.parentNode.insertBefore(d.pop(),b);b.parentNode.removeChild(b);r&&r.parentNode.removeChild(r);g.emit(ops.OdtDocument.signalStepsRemoved,{position:0<c?c-1:c,length:m});g.fixCursorPositions();g.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:g,timestamp:l,position:c,
length:m}}};
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
runtime.loadClass("ops.Member");ops.OpAddMember=function(){var g,l,c;this.init=function(m){g=m.memberid;l=parseInt(m.timestamp,10);c=m.setProperties};this.isEdit=!1;this.execute=function(l){if(l.getMember(g))return!1;var f=new ops.Member(g,c);l.addMember(f);l.emit(ops.OdtDocument.signalMemberAdded,f);return!0};this.spec=function(){return{optype:"AddMember",memberid:g,timestamp:l,setProperties:c}}};
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
runtime.loadClass("ops.Member");runtime.loadClass("xmldom.XPath");
ops.OpUpdateMember=function(){function g(){for(var b=new xmldom.XPath,c="//dc:creator[@editinfo:memberid='"+l+"']",b=b.getODFElementsWithXPath(n.getRootNode(),c,function(b){return"editinfo"===b?"urn:webodf:names:editinfo":odf.Namespaces.resolvePrefix(b)}),c=0;c<b.length;c+=1)b[c].textContent=m.fullName}var l,c,m,f,n;this.init=function(b){l=b.memberid;c=parseInt(b.timestamp,10);m=b.setProperties;f=b.removedProperties};this.isEdit=!1;this.execute=function(b){n=b;var c=b.getMember(l);if(!c)return!1;
f&&c.removeProperties(f);m&&(c.setProperties(m),m.fullName&&g());b.emit(ops.OdtDocument.signalMemberUpdated,c);return!0};this.spec=function(){return{optype:"UpdateMember",memberid:l,timestamp:c,setProperties:m,removedProperties:f}}};
// Input 64
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
runtime.loadClass("ops.Member");ops.OpRemoveMember=function(){var g,l;this.init=function(c){g=c.memberid;l=parseInt(c.timestamp,10)};this.isEdit=!1;this.execute=function(c){if(!c.getMember(g))return!1;c.removeMember(g);c.emit(ops.OdtDocument.signalMemberRemoved,g);return!0};this.spec=function(){return{optype:"RemoveMember",memberid:g,timestamp:l}}};
// Input 65
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
ops.OpUpdateMetadata=function(){var g,l,c,m;this.init=function(f){g=f.memberid;l=parseInt(f.timestamp,10);c=f.setProperties;m=f.removedProperties};this.isEdit=!0;this.execute=function(f){f=f.getOdfCanvas().odfContainer().getMetadataManager();var g=[],b=["dc:date","dc:creator","meta:editing-cycles"];c&&b.forEach(function(b){if(c[b])return!1});m&&(b.forEach(function(b){if(-1!==g.indexOf(b))return!1}),g=m.attributes.split(","));f.setMetadata(c,g);return!0};this.spec=function(){return{optype:"UpdateMetadata",
memberid:g,timestamp:l,setProperties:c,removedProperties:m}}};
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
runtime.loadClass("ops.OpAddMember");runtime.loadClass("ops.OpUpdateMember");runtime.loadClass("ops.OpRemoveMember");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpSetBlob");runtime.loadClass("ops.OpRemoveBlob");runtime.loadClass("ops.OpInsertImage");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");
runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpAddStyle");runtime.loadClass("ops.OpRemoveStyle");runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("ops.OpUpdateMetadata");
ops.OperationFactory=function(){function g(c){return function(){return new c}}var l;this.register=function(c,g){l[c]=g};this.create=function(c){var g=null,f=l[c.optype];f&&(g=f(c),g.init(c));return g};l={AddMember:g(ops.OpAddMember),UpdateMember:g(ops.OpUpdateMember),RemoveMember:g(ops.OpRemoveMember),AddCursor:g(ops.OpAddCursor),ApplyDirectStyling:g(ops.OpApplyDirectStyling),SetBlob:g(ops.OpSetBlob),RemoveBlob:g(ops.OpRemoveBlob),InsertImage:g(ops.OpInsertImage),InsertTable:g(ops.OpInsertTable),
InsertText:g(ops.OpInsertText),RemoveText:g(ops.OpRemoveText),SplitParagraph:g(ops.OpSplitParagraph),SetParagraphStyle:g(ops.OpSetParagraphStyle),UpdateParagraphStyle:g(ops.OpUpdateParagraphStyle),AddStyle:g(ops.OpAddStyle),RemoveStyle:g(ops.OpRemoveStyle),MoveCursor:g(ops.OpMoveCursor),RemoveCursor:g(ops.OpRemoveCursor),AddAnnotation:g(ops.OpAddAnnotation),RemoveAnnotation:g(ops.OpRemoveAnnotation),UpdateMetadata:g(ops.OpUpdateMetadata)}};
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
gui.SelectionMover=function(g,l){function c(){v.setUnfilteredPosition(g.getNode(),0);return v}function m(a,b){var c,e=null;a&&(c=b?a[a.length-1]:a[0]);c&&(e={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return e}function f(a,b,c,e){var d=a.nodeType;c.setStart(a,b);c.collapse(!e);e=m(c.getClientRects(),!0===e);!e&&0<b&&(c.setStart(a,b-1),c.setEnd(a,b),e=m(c.getClientRects(),!0));e||(d===Node.ELEMENT_NODE&&a.childNodes[b-1]?e=f(a,b-1,c,!0):a.nodeType===Node.TEXT_NODE&&0<b?e=f(a,b-1,c,!0):a.previousSibling?
e=f(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,c,!0):a.parentNode&&a.parentNode!==l?e=f(a.parentNode,0,c,!1):(c.selectNode(l),e=m(c.getClientRects(),!1)));runtime.assert(Boolean(e),"No visible rectangle found");return e}function n(a,b,e){var d=a,h=c(),k,m=l.ownerDocument.createRange(),q=g.getSelectedRange()?g.getSelectedRange().cloneRange():l.ownerDocument.createRange(),n;for(k=f(h.container(),h.unfilteredDomOffset(),
m);0<d&&e();)d-=1;b?(b=h.container(),h=h.unfilteredDomOffset(),-1===x.comparePoints(q.startContainer,q.startOffset,b,h)?(q.setStart(b,h),n=!1):q.setEnd(b,h)):(q.setStart(h.container(),h.unfilteredDomOffset()),q.collapse(!0));g.setSelectedRange(q,n);h=c();q=f(h.container(),h.unfilteredDomOffset(),m);if(q.top===k.top||void 0===y)y=q.left;runtime.clearTimeout(w);w=runtime.setTimeout(function(){y=void 0},2E3);m.detach();return a-d}function b(a){var b=c();return a.acceptPosition(b)===t&&(b.setUnfilteredPosition(g.getAnchorNode(),
0),a.acceptPosition(b)===t)?!0:!1}function p(a,b,c){for(var e=new core.LoopWatchDog(1E4),d=0,h=0,f=0<=b?1:-1,k=0<=b?a.nextPosition:a.previousPosition;0!==b&&k();)e.check(),h+=f,c.acceptPosition(a)===t&&(b-=f,d+=h,h=0);return d}function r(a,b,e){for(var d=c(),h=new core.LoopWatchDog(1E4),f=0,k=0;0<a&&d.nextPosition();)h.check(),e.acceptPosition(d)===t&&(f+=1,b.acceptPosition(d)===t&&(k+=f,f=0,a-=1));return k}function d(a,b,e){for(var d=c(),h=new core.LoopWatchDog(1E4),f=0,k=0;0<a&&d.previousPosition();)h.check(),
e.acceptPosition(d)===t&&(f+=1,b.acceptPosition(d)===t&&(k+=f,f=0,a-=1));return k}function k(a,b){var e=c();return p(e,a,b)}function a(a,b,e){var d=c(),h=u.getParagraphElement(d.getCurrentNode()),f=0;d.setUnfilteredPosition(a,b);e.acceptPosition(d)!==t&&(f=p(d,-1,e),0===f||h&&h!==u.getParagraphElement(d.getCurrentNode()))&&(d.setUnfilteredPosition(a,b),f=p(d,1,e));return f}function e(a,b){var e=c(),d=0,h=0,k=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var g=b,m=k,q=e,n=q.container(),p=0,r=null,w=void 0,
u=10,v=void 0,x=0,Y=void 0,V=void 0,G=void 0,v=void 0,I=l.ownerDocument.createRange(),ha=new core.LoopWatchDog(1E4),v=f(n,q.unfilteredDomOffset(),I),Y=v.top,V=void 0===y?v.left:y,G=Y;!0===(0>m?q.previousPosition():q.nextPosition());)if(ha.check(),g.acceptPosition(q)===t&&(p+=1,n=q.container(),v=f(n,q.unfilteredDomOffset(),I),v.top!==Y)){if(v.top!==G&&G!==Y)break;G=v.top;v=Math.abs(V-v.left);if(null===r||v<u)r=n,w=q.unfilteredDomOffset(),u=v,x=p}null!==r?(q.setUnfilteredPosition(r,w),p=x):p=0;I.detach();
d+=p;if(0===d)break;h+=d;a-=1}return h*k}function h(a,b){var e,d,h,k,g=c(),m=u.getParagraphElement(g.getCurrentNode()),q=0,n=l.ownerDocument.createRange();0>a?(e=g.previousPosition,d=-1):(e=g.nextPosition,d=1);for(h=f(g.container(),g.unfilteredDomOffset(),n);e.call(g);)if(b.acceptPosition(g)===t){if(u.getParagraphElement(g.getCurrentNode())!==m)break;k=f(g.container(),g.unfilteredDomOffset(),n);if(k.bottom!==h.bottom&&(h=k.top>=h.top&&k.bottom<h.bottom||k.top<=h.top&&k.bottom>h.bottom,!h))break;q+=
d;h=k}n.detach();return q}function q(a,b,e){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=c(),h=d.container(),f=d.unfilteredDomOffset(),k=0,g=new core.LoopWatchDog(1E4);for(d.setUnfilteredPosition(a,b);e.acceptPosition(d)!==t&&d.previousPosition();)g.check();a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();for(d.setUnfilteredPosition(h,f);e.acceptPosition(d)!==
t&&d.previousPosition();)g.check();h=x.comparePoints(a,b,d.container(),d.unfilteredDomOffset());if(0>h)for(;d.nextPosition()&&(g.check(),e.acceptPosition(d)===t&&(k+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<h)for(;d.previousPosition()&&(g.check(),e.acceptPosition(d)!==t||(k-=1,d.container()!==a||d.unfilteredDomOffset()!==b)););return k}var u,x,v,y,w,t=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,b){return n(a,b||!1,v.nextPosition)};this.movePointBackward=
function(a,b){return n(a,b||!1,v.previousPosition)};this.getStepCounter=function(){return{countSteps:k,convertForwardStepsBetweenFilters:r,convertBackwardStepsBetweenFilters:d,countLinesSteps:e,countStepsToLineBoundary:h,countStepsToPosition:q,isPositionWalkable:b,countPositionsToNearestStep:a}};(function(){u=new odf.OdfUtils;x=new core.DomUtils;v=gui.SelectionMover.createPositionIterator(l);var a=l.ownerDocument.createRange();a.setStart(v.container(),v.unfilteredDomOffset());a.collapse(!0);g.setSelectedRange(a)})()};
gui.SelectionMover.createPositionIterator=function(g){var l=new function(){this.acceptNode=function(c){return c&&"urn:webodf:names:cursor"!==c.namespaceURI&&"urn:webodf:names:editinfo"!==c.namespaceURI?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}};return new core.PositionIterator(g,5,l,!1)};(function(){return gui.SelectionMover})();
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
runtime.loadClass("core.DomUtils");runtime.loadClass("core.PositionFilter");runtime.loadClass("odf.OdfUtils");
(function(){function g(c,g,f){function n(a,b){function c(a){for(var b=0;a&&a.previousSibling;)b+=1,a=a.previousSibling;return b}this.steps=a;this.node=b;this.setIteratorPosition=function(a){a.setUnfilteredPosition(b.parentNode,c(b));do if(g.acceptPosition(a)===u)break;while(a.nextPosition())}}function b(a){return a.nodeType===Node.ELEMENT_NODE&&a.getAttributeNS(d,"nodeId")}function p(a){var b=l;a.setAttributeNS(d,"nodeId",b.toString());l+=1;return b}function r(e,h){var f,k=null;for(e=e.childNodes[h]||
e;!k&&e&&e!==c;)(f=b(e))&&(k=a[f])&&k.node!==e&&(runtime.log("Cloned node detected. Creating new bookmark"),k=null,e.removeAttributeNS(d,"nodeId")),e=e.parentNode;return k}var d="urn:webodf:names:steps",k={},a={},e=new odf.OdfUtils,h=new core.DomUtils,q,u=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.updateCache=function(c,d,h,g){var l;0===h&&e.isParagraph(d)?(l=!0,g||(c+=1)):d.hasChildNodes()&&d.childNodes[h]&&(d=d.childNodes[h],(l=e.isParagraph(d))&&(c+=1));l&&(h=b(d)||p(d),(g=a[h])?g.node===
d?g.steps=c:(runtime.log("Cloned node detected. Creating new bookmark"),h=p(d),g=a[h]=new n(c,d)):g=a[h]=new n(c,d),h=g,c=Math.ceil(h.steps/f)*f,d=k[c],!d||h.steps>d.steps)&&(k[c]=h)};this.setToClosestStep=function(a,b){for(var c=Math.floor(a/f)*f,e;!e&&0!==c;)e=k[c],c-=f;e=e||q;e.setIteratorPosition(b);return e.steps};this.setToClosestDomPoint=function(a,b,e){var d;if(a===c&&0===b)d=q;else if(a===c&&b===c.childNodes.length)d=Object.keys(k).map(function(a){return k[a]}).reduce(function(a,b){return b.steps>
a.steps?b:a},q);else if(d=r(a,b),!d)for(e.setUnfilteredPosition(a,b);!d&&e.previousNode();)d=r(e.container(),e.unfilteredDomOffset());d=d||q;d.setIteratorPosition(e);return d.steps};this.updateCacheAtPoint=function(e,d){var g={};Object.keys(a).map(function(b){return a[b]}).filter(function(a){return a.steps>e}).forEach(function(e){var l=Math.ceil(e.steps/f)*f,m,q;if(h.containsNode(c,e.node)){if(d(e),m=Math.ceil(e.steps/f)*f,q=g[m],!q||e.steps>q.steps)g[m]=e}else delete a[b(e.node)];k[l]===e&&delete k[l]});
Object.keys(g).forEach(function(a){k[a]=g[a]})};q=new function(a,b){this.steps=a;this.node=b;this.setIteratorPosition=function(a){a.setUnfilteredPosition(b,0);do if(g.acceptPosition(a)===u)break;while(a.nextPosition())}}(0,c)}var l=0;ops.StepsTranslator=function(c,l,f,n){function b(){var a=c();a!==p&&(runtime.log("Undo detected. Resetting steps cache"),p=a,r=new g(p,f,n),k=l(p))}var p=c(),r=new g(p,f,n),d=new core.DomUtils,k=l(c()),a=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.convertStepsToDomPoint=
function(c){var d,g;0>c&&(runtime.log("warn","Requested steps were negative ("+c+")"),c=0);b();for(d=r.setToClosestStep(c,k);d<c&&k.nextPosition();)(g=f.acceptPosition(k)===a)&&(d+=1),r.updateCache(d,k.container(),k.unfilteredDomOffset(),g);d!==c&&runtime.log("warn","Requested "+c+" steps but only "+d+" are available");return{node:k.container(),offset:k.unfilteredDomOffset()}};this.convertDomPointToSteps=function(c,h,g){var l,m,n=0;b();d.containsNode(p,c)||(l=0>d.comparePoints(p,0,c,h),c=p,h=l?0:
p.childNodes.length);k.setUnfilteredPosition(c,h);l=k.container();m=k.unfilteredDomOffset();g&&f.acceptPosition(k)!==a&&(n=1);c=r.setToClosestDomPoint(c,h,k);if(0>d.comparePoints(k.container(),k.unfilteredDomOffset(),l,m))return 0<c&&!g?c-1:c;for(;(k.container()!==l||k.unfilteredDomOffset()!==m)&&k.nextPosition();)(g=f.acceptPosition(k)===a)&&(c+=1),r.updateCache(c,k.container(),k.unfilteredDomOffset(),g);return c+n};this.prime=function(){var c,d;b();for(c=r.setToClosestStep(0,k);k.nextPosition();)(d=
f.acceptPosition(k)===a)&&(c+=1),r.updateCache(c,k.container(),k.unfilteredDomOffset(),d)};this.handleStepsInserted=function(a){b();r.updateCacheAtPoint(a.position,function(b){b.steps+=a.length})};this.handleStepsRemoved=function(a){b();r.updateCacheAtPoint(a.position,function(b){b.steps-=a.length;0>b.steps&&(b.steps=0)})}};return ops.StepsTranslator})();
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
runtime.loadClass("core.PositionFilter");runtime.loadClass("odf.OdfUtils");
ops.TextPositionFilter=function(g){function l(f,g,d){var k,a;if(g&&(k=c.lookLeftForCharacter(g),1===k||2===k&&(c.scanRightForAnyCharacter(d)||c.scanRightForAnyCharacter(c.nextNode(f)))))return n;k=null===g&&c.isParagraph(f);a=c.lookRightForCharacter(d);if(k)return a?n:c.scanRightForAnyCharacter(d)?b:n;if(!a)return b;g=g||c.previousNode(f);return c.scanLeftForAnyCharacter(g)?b:n}var c=new odf.OdfUtils,m=Node.ELEMENT_NODE,f=Node.TEXT_NODE,n=core.PositionFilter.FilterResult.FILTER_ACCEPT,b=core.PositionFilter.FilterResult.FILTER_REJECT;
this.acceptPosition=function(p){var r=p.container(),d=r.nodeType,k,a,e;if(d!==m&&d!==f)return b;if(d===f){if(!c.isGroupingElement(r.parentNode)||c.isWithinTrackedChanges(r.parentNode,g()))return b;d=p.unfilteredDomOffset();k=r.data;runtime.assert(d!==k.length,"Unexpected offset.");if(0<d){p=k[d-1];if(!c.isODFWhitespace(p))return n;if(1<d)if(p=k[d-2],!c.isODFWhitespace(p))a=n;else{if(!c.isODFWhitespace(k.substr(0,d)))return b}else e=c.previousNode(r),c.scanLeftForNonSpace(e)&&(a=n);if(a===n)return c.isTrailingWhitespace(r,
d)?b:n;a=k[d];return c.isODFWhitespace(a)?b:c.scanLeftForAnyCharacter(c.previousNode(r))?b:n}e=p.leftNode();a=r;r=r.parentNode;a=l(r,e,a)}else!c.isGroupingElement(r)||c.isWithinTrackedChanges(r,g())?a=b:(e=p.leftNode(),a=p.rightNode(),a=l(r,e,a));return a}};
// Input 70
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
ops.OperationTransformMatrix=function(){function g(a){a.position+=a.length;a.length*=-1}function l(a){var b=0>a.length;b&&g(a);return b}function c(a,b){var c=[];a&&["style:parent-style-name","style:next-style-name"].forEach(function(d){a[d]===b&&c.push(d)});return c}function m(a,b){a&&["style:parent-style-name","style:next-style-name"].forEach(function(c){a[c]===b&&delete a[c]})}function f(a){var b={};Object.keys(a).forEach(function(c){b[c]="object"===typeof a[c]?f(a[c]):a[c]});return b}function n(a,
b,c,d){var f,k,g=!1,l=!1,m,n,p=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<p.length)&&Object.keys(a).forEach(function(b){f=a[b];"object"!==typeof f&&(m=c&&c[b],void 0!==m?(delete a[b],l=!0,m===f&&(delete c[b],g=!0)):p&&-1!==p.indexOf(b)&&(delete a[b],l=!0))});if(b&&b.attributes&&(c||0<p.length)){n=b.attributes.split(",");for(d=0;d<n.length;d+=1)if(k=n[d],c&&void 0!==c[k]||p&&-1!==p.indexOf(k))n.splice(d,1),d-=1,l=!0;0<n.length?b.attributes=n.join(","):delete b.attributes}return{majorChanged:g,
minorChanged:l}}function b(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function p(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function r(a,c,d){var f=a.setProperties?a.setProperties[d]:null,k=a.removedProperties?a.removedProperties[d]:null,g=c.setProperties?c.setProperties[d]:null,l=c.removedProperties?c.removedProperties[d]:null,m;m=n(f,k,g,l);f&&!b(f)&&delete a.setProperties[d];k&&!p(k)&&delete a.removedProperties[d];g&&!b(g)&&
delete c.setProperties[d];l&&!p(l)&&delete c.removedProperties[d];return m}function d(a,b){return{opSpecsA:[a],opSpecsB:[b]}}var k={AddCursor:{AddCursor:d,AddMember:d,AddStyle:d,ApplyDirectStyling:d,InsertText:d,MoveCursor:d,RemoveCursor:d,RemoveMember:d,RemoveStyle:d,RemoveText:d,SetParagraphStyle:d,SplitParagraph:d,UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},AddMember:{AddStyle:d,InsertText:d,MoveCursor:d,RemoveCursor:d,RemoveStyle:d,RemoveText:d,SetParagraphStyle:d,SplitParagraph:d,
UpdateMetadata:d,UpdateParagraphStyle:d},AddStyle:{AddStyle:d,ApplyDirectStyling:d,InsertText:d,MoveCursor:d,RemoveCursor:d,RemoveMember:d,RemoveStyle:function(a,b){var d,f=[a],k=[b];a.styleFamily===b.styleFamily&&(d=c(a.setProperties,b.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:b.memberid,timestamp:b.timestamp,styleName:a.styleName,removedProperties:{attributes:d.join(",")}},k.unshift(d)),m(a.setProperties,b.styleName));return{opSpecsA:f,opSpecsB:k}},RemoveText:d,SetParagraphStyle:d,
SplitParagraph:d,UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},ApplyDirectStyling:{ApplyDirectStyling:function(a,c,d){var k,g,l,m,n,p,t,s;m=[a];l=[c];if(!(a.position+a.length<=c.position||a.position>=c.position+c.length)){k=d?a:c;g=d?c:a;if(a.position!==c.position||a.length!==c.length)p=f(k),t=f(g);c=r(g,k,"style:text-properties");if(c.majorChanged||c.minorChanged)l=[],a=[],m=k.position+k.length,n=g.position+g.length,g.position<k.position?c.minorChanged&&(s=f(t),s.length=k.position-g.position,
a.push(s),g.position=k.position,g.length=n-g.position):k.position<g.position&&c.majorChanged&&(s=f(p),s.length=g.position-k.position,l.push(s),k.position=g.position,k.length=m-k.position),n>m?c.minorChanged&&(p=t,p.position=m,p.length=n-m,a.push(p),g.length=m-g.position):m>n&&c.majorChanged&&(p.position=n,p.length=m-n,l.push(p),k.length=n-k.position),k.setProperties&&b(k.setProperties)&&l.push(k),g.setProperties&&b(g.setProperties)&&a.push(g),d?(m=l,l=a):m=a}return{opSpecsA:m,opSpecsB:l}},InsertText:function(a,
b){b.position<=a.position?a.position+=b.text.length:b.position<=a.position+a.length&&(a.length+=b.text.length);return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:d,RemoveCursor:d,RemoveStyle:d,RemoveText:function(a,b){var c=a.position+a.length,d=b.position+b.length,f=[a],k=[b];d<=a.position?a.position-=b.length:b.position<c&&(a.position<b.position?a.length=d<c?a.length-b.length:b.position-a.position:(a.position=b.position,d<c?a.length=c-d:f=[]));return{opSpecsA:f,opSpecsB:k}},SetParagraphStyle:d,SplitParagraph:function(a,
b){b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMetadata:d,UpdateParagraphStyle:d},InsertText:{InsertText:function(a,b,c){if(a.position<b.position)b.position+=a.text.length;else if(a.position>b.position)a.position+=b.text.length;else return c?b.position+=a.text.length:a.position+=b.text.length,null;return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:function(a,b){var c=l(b);a.position<b.position?b.position+=a.text.length:a.position<
b.position+b.length&&(b.length+=a.text.length);c&&g(b);return{opSpecsA:[a],opSpecsB:[b]}},RemoveCursor:d,RemoveMember:d,RemoveStyle:d,RemoveText:function(a,b){var c;c=b.position+b.length;var d=[a],f=[b];c<=a.position?a.position-=b.length:a.position<=b.position?b.position+=a.text.length:(b.length=a.position-b.position,c={optype:"RemoveText",memberid:b.memberid,timestamp:b.timestamp,position:a.position+a.text.length,length:c-a.position},f.unshift(c),a.position=b.position);return{opSpecsA:d,opSpecsB:f}},
SplitParagraph:function(a,b,c){if(a.position<b.position)b.position+=a.text.length;else if(a.position>b.position)a.position+=1;else return c?b.position+=a.text.length:a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},MoveCursor:{MoveCursor:d,RemoveCursor:function(a,b){return{opSpecsA:a.memberid===b.memberid?[]:[a],opSpecsB:[b]}},RemoveMember:d,RemoveStyle:d,RemoveText:function(a,b){var c=l(a),d=a.position+a.length,f=b.position+b.length;f<=
a.position?a.position-=b.length:b.position<d&&(a.position<b.position?a.length=f<d?a.length-b.length:b.position-a.position:(a.position=b.position,a.length=f<d?d-f:0));c&&g(a);return{opSpecsA:[a],opSpecsB:[b]}},SetParagraphStyle:d,SplitParagraph:function(a,b){var c=l(a);b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);c&&g(a);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},RemoveCursor:{RemoveCursor:function(a,b){var c=a.memberid===
b.memberid;return{opSpecsA:c?[]:[a],opSpecsB:c?[]:[b]}},RemoveMember:d,RemoveStyle:d,RemoveText:d,SetParagraphStyle:d,SplitParagraph:d,UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},RemoveMember:{RemoveStyle:d,RemoveText:d,SetParagraphStyle:d,SplitParagraph:d,UpdateMetadata:d,UpdateParagraphStyle:d},RemoveStyle:{RemoveStyle:function(a,b){var c=a.styleName===b.styleName&&a.styleFamily===b.styleFamily;return{opSpecsA:c?[]:[a],opSpecsB:c?[]:[b]}},RemoveText:d,SetParagraphStyle:function(a,b){var c,
d=[a],f=[b];"paragraph"===a.styleFamily&&a.styleName===b.styleName&&(c={optype:"SetParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,position:b.position,styleName:""},d.unshift(c),b.styleName="");return{opSpecsA:d,opSpecsB:f}},SplitParagraph:d,UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:function(a,b){var d,f=[a],k=[b];"paragraph"===a.styleFamily&&(d=c(b.setProperties,a.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,styleName:b.styleName,
removedProperties:{attributes:d.join(",")}},f.unshift(d)),a.styleName===b.styleName?k=[]:m(b.setProperties,a.styleName));return{opSpecsA:f,opSpecsB:k}}},RemoveText:{RemoveText:function(a,b){var c=a.position+a.length,d=b.position+b.length,f=[a],k=[b];d<=a.position?a.position-=b.length:c<=b.position?b.position-=a.length:b.position<c&&(a.position<b.position?(a.length=d<c?a.length-b.length:b.position-a.position,c<d?(b.position=a.position,b.length=d-c):k=[]):(c<d?b.length-=a.length:b.position<a.position?
b.length=a.position-b.position:k=[],d<c?(a.position=b.position,a.length=c-d):f=[]));return{opSpecsA:f,opSpecsB:k}},SplitParagraph:function(a,b){var c=a.position+a.length,d=[a],f=[b];b.position<=a.position?a.position+=1:b.position<c&&(a.length=b.position-a.position,c={optype:"RemoveText",memberid:a.memberid,timestamp:a.timestamp,position:b.position+1,length:c-b.position},d.unshift(c));a.position+a.length<=b.position?b.position-=a.length:a.position<b.position&&(b.position=a.position);return{opSpecsA:d,
opSpecsB:f}},UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},SetParagraphStyle:{UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},SplitParagraph:{SplitParagraph:function(a,b,c){if(a.position<b.position)b.position+=1;else if(a.position>b.position)a.position+=1;else if(a.position===b.position)return c?b.position+=1:a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},UpdateMember:{UpdateMetadata:d,UpdateParagraphStyle:d},UpdateMetadata:{UpdateMetadata:function(a,
c,d){var f,k=[a],g=[c];f=d?a:c;a=d?c:a;n(a.setProperties||null,a.removedProperties||null,f.setProperties||null,f.removedProperties||null);f.setProperties&&b(f.setProperties)||f.removedProperties&&p(f.removedProperties)||(d?k=[]:g=[]);a.setProperties&&b(a.setProperties)||a.removedProperties&&p(a.removedProperties)||(d?g=[]:k=[]);return{opSpecsA:k,opSpecsB:g}},UpdateParagraphStyle:d},UpdateParagraphStyle:{UpdateParagraphStyle:function(a,c,d){var f,k=[a],g=[c];a.styleName===c.styleName&&(f=d?a:c,a=d?
c:a,r(a,f,"style:paragraph-properties"),r(a,f,"style:text-properties"),n(a.setProperties||null,a.removedProperties||null,f.setProperties||null,f.removedProperties||null),f.setProperties&&b(f.setProperties)||f.removedProperties&&p(f.removedProperties)||(d?k=[]:g=[]),a.setProperties&&b(a.setProperties)||a.removedProperties&&p(a.removedProperties)||(d?g=[]:k=[]));return{opSpecsA:k,opSpecsB:g}}}};this.passUnchanged=d;this.extendTransformations=function(a){Object.keys(a).forEach(function(b){var c=a[b],
d,f=k.hasOwnProperty(b);runtime.log((f?"Extending":"Adding")+" map for optypeA: "+b);f||(k[b]={});d=k[b];Object.keys(c).forEach(function(a){var f=d.hasOwnProperty(a);runtime.assert(b<=a,"Wrong order:"+b+", "+a);runtime.log("  "+(f?"Overwriting":"Adding")+" entry for optypeB: "+a);d[a]=c[a]})})};this.transformOpspecVsOpspec=function(a,b){var c=a.optype<=b.optype,d;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(a));runtime.log(runtime.toJson(b));c||(d=a,a=b,b=d);(d=(d=k[a.optype])&&d[b.optype])?
(d=d(a,b,!c),c||null===d||(d={opSpecsA:d.opSpecsB,opSpecsB:d.opSpecsA})):d=null;runtime.log("result:");d?(runtime.log(runtime.toJson(d.opSpecsA)),runtime.log(runtime.toJson(d.opSpecsB))):runtime.log("null");return d}};
// Input 71
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
ops.OperationTransformer=function(){function g(f){var g=[];f.forEach(function(b){g.push(c.create(b))});return g}function l(c,g){for(var b,p,r=[],d=[];0<c.length&&g;){b=c.shift();b=m.transformOpspecVsOpspec(b,g);if(!b)return null;r=r.concat(b.opSpecsA);if(0===b.opSpecsB.length){r=r.concat(c);g=null;break}for(;1<b.opSpecsB.length;){p=l(c,b.opSpecsB.shift());if(!p)return null;d=d.concat(p.opSpecsB);c=p.opSpecsA}g=b.opSpecsB.pop()}g&&d.push(g);return{opSpecsA:r,opSpecsB:d}}var c,m=new ops.OperationTransformMatrix;
this.setOperationFactory=function(f){c=f};this.getOperationTransformMatrix=function(){return m};this.transform=function(c,m){for(var b,p=[];0<m.length;){b=l(c,m.shift());if(!b)return null;c=b.opSpecsA;p=p.concat(b.opSpecsB)}return{opsA:g(c),opsB:g(p)}}};
// Input 72
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(g,l){var c=this,m={},f,n,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,f){var d=0;0<b?d=n.movePointForward(b,f):0>=b&&(d=-n.movePointBackward(-b,f));c.handleUpdate();return d};this.handleUpdate=function(){};this.getStepCounter=function(){return n.getStepCounter()};this.getMemberId=function(){return g};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.setSelectedRange=function(f,g){b.setSelectedRange(f,g);c.handleUpdate()};this.hasForwardSelection=function(){return b.hasForwardSelection()};this.getOdtDocument=function(){return l};this.getSelectionType=function(){return f};this.setSelectionType=function(b){m.hasOwnProperty(b)?f=b:runtime.log("Invalid selection type: "+b)};this.resetSelectionType=function(){c.setSelectionType(ops.OdtCursor.RangeSelection)};b=new core.Cursor(l.getDOM(),g);n=new gui.SelectionMover(b,l.getRootNode());m[ops.OdtCursor.RangeSelection]=
!0;m[ops.OdtCursor.RegionSelection]=!0;c.resetSelectionType()};ops.OdtCursor.RangeSelection="Range";ops.OdtCursor.RegionSelection="Region";(function(){return ops.OdtCursor})();
// Input 73
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
ops.EditInfo=function(g,l){function c(){var c=[],b;for(b in f)f.hasOwnProperty(b)&&c.push({memberid:b,time:f[b].time});c.sort(function(b,c){return b.time-c.time});return c}var m,f={};this.getNode=function(){return m};this.getOdtDocument=function(){return l};this.getEdits=function(){return f};this.getSortedEdits=function(){return c()};this.addEdit=function(c,b){f[c]={time:b}};this.clearEdits=function(){f={}};this.destroy=function(c){g.parentNode&&g.removeChild(m);c()};m=l.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");g.insertBefore(m,g.firstChild)};
// Input 74
runtime.loadClass("gui.SelectionMover");gui.ShadowCursor=function(g){var l=g.getDOM().createRange(),c=!0;this.removeFromOdtDocument=function(){};this.getMemberId=function(){return gui.ShadowCursor.ShadowCursorMemberId};this.getSelectedRange=function(){return l};this.setSelectedRange=function(g,f){l=g;c=!1!==f};this.hasForwardSelection=function(){return c};this.getOdtDocument=function(){return g};this.getSelectionType=function(){return ops.OdtCursor.RangeSelection};l.setStart(g.getRootNode(),0)};
gui.ShadowCursor.ShadowCursorMemberId="";(function(){return gui.ShadowCursor})();
// Input 75
gui.Avatar=function(g,l){var c=this,m,f,n;this.setColor=function(b){f.style.borderColor=b};this.setImageUrl=function(b){c.isVisible()?f.src=b:n=b};this.isVisible=function(){return"block"===m.style.display};this.show=function(){n&&(f.src=n,n=void 0);m.style.display="block"};this.hide=function(){m.style.display="none"};this.markAsFocussed=function(b){m.className=b?"active":""};this.destroy=function(b){g.removeChild(m);b()};(function(){var b=g.ownerDocument,c=b.documentElement.namespaceURI;m=b.createElementNS(c,
"div");f=b.createElementNS(c,"img");f.width=64;f.height=64;m.appendChild(f);m.style.width="64px";m.style.height="70px";m.style.position="absolute";m.style.top="-80px";m.style.left="-34px";m.style.display=l?"block":"none";g.appendChild(m)})()};
// Input 76
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(g,l,c){function m(c){k&&r.parentNode&&(!a||c)&&(c&&void 0!==e&&runtime.clearTimeout(e),a=!0,b.style.opacity=c||"0"===b.style.opacity?"1":"0",e=runtime.setTimeout(function(){a=!1;m(!1)},500))}function f(a,b){var c=a.getBoundingClientRect(),d=0,e=0;c&&b&&(d=Math.max(c.top,b.top),e=Math.min(c.bottom,b.bottom));return e-d}function n(){var a;a=g.getSelectedRange().cloneRange();var c=g.getNode(),e,k=null;c.previousSibling&&(e=c.previousSibling.nodeType===Node.TEXT_NODE?c.previousSibling.textContent.length:
c.previousSibling.childNodes.length,a.setStart(c.previousSibling,0<e?e-1:0),a.setEnd(c.previousSibling,e),(e=a.getBoundingClientRect())&&e.height&&(k=e));c.nextSibling&&(a.setStart(c.nextSibling,0),a.setEnd(c.nextSibling,0<(c.nextSibling.nodeType===Node.TEXT_NODE?c.nextSibling.textContent.length:c.nextSibling.childNodes.length)?1:0),(e=a.getBoundingClientRect())&&e.height&&(!k||f(c,e)>f(c,k))&&(k=e));a=k;c=g.getOdtDocument().getOdfCanvas().getZoomLevel();d&&g.getSelectionType()===ops.OdtCursor.RangeSelection?
b.style.visibility="visible":b.style.visibility="hidden";a?(b.style.top="0",k=h.getBoundingClientRect(b),8>a.height&&(a={top:a.top-(8-a.height)/2,height:8}),b.style.height=h.adaptRangeDifferenceToZoomLevel(a.height,c)+"px",b.style.top=h.adaptRangeDifferenceToZoomLevel(a.top-k.top,c)+"px"):(b.style.height="1em",b.style.top="5%")}var b,p,r,d=!0,k=!1,a=!1,e,h=new core.DomUtils;this.handleUpdate=n;this.refreshCursorBlinking=function(){c||g.getSelectedRange().collapsed?(k=!0,m(!0)):(k=!1,b.style.opacity=
"0")};this.setFocus=function(){k=!0;p.markAsFocussed(!0);m(!0)};this.removeFocus=function(){k=!1;p.markAsFocussed(!1);b.style.opacity="1"};this.show=function(){d=!0;n();p.markAsFocussed(!0)};this.hide=function(){d=!1;n();p.markAsFocussed(!1)};this.setAvatarImageUrl=function(a){p.setImageUrl(a)};this.setColor=function(a){b.style.borderColor=a;p.setColor(a)};this.getCursor=function(){return g};this.getFocusElement=function(){return b};this.toggleHandleVisibility=function(){p.isVisible()?p.hide():p.show()};
this.showHandle=function(){p.show()};this.hideHandle=function(){p.hide()};this.ensureVisible=function(){var a,c,d,e,f=g.getOdtDocument().getOdfCanvas().getElement().parentNode,k;d=f.offsetWidth-f.clientWidth+5;e=f.offsetHeight-f.clientHeight+5;k=b.getBoundingClientRect();a=k.left-d;c=k.top-e;d=k.right+d;e=k.bottom+e;k=f.getBoundingClientRect();c<k.top?f.scrollTop-=k.top-c:e>k.bottom&&(f.scrollTop+=e-k.bottom);a<k.left?f.scrollLeft-=k.left-a:d>k.right&&(f.scrollLeft+=d-k.right);n()};this.destroy=function(a){p.destroy(function(c){c?
a(c):(r.removeChild(b),a())})};(function(){var a=g.getOdtDocument().getDOM();b=a.createElementNS(a.documentElement.namespaceURI,"span");b.style.top="5%";r=g.getNode();r.appendChild(b);p=new gui.Avatar(r,l);n()})()};
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
gui.PlainTextPasteboard=function(g,l){function c(c,f){c.init(f);return c}this.createPasteOps=function(m){var f=g.getCursorPosition(l),n=f,b=[];m.replace(/\r/g,"").split("\n").forEach(function(f){b.push(c(new ops.OpSplitParagraph,{memberid:l,position:n}));n+=1;b.push(c(new ops.OpInsertText,{memberid:l,position:n,text:f}));n+=f.length});b.push(c(new ops.OpRemoveText,{memberid:l,position:f,length:1}));return b}};
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
gui.Clipboard=function(){var g,l,c;this.setDataFromRange=function(c,f){var n=!0,b,p=c.clipboardData;b=runtime.getWindow();var r=f.startContainer.ownerDocument;!p&&b&&(p=b.clipboardData);p?(r=r.createElement("span"),r.appendChild(f.cloneContents()),b=p.setData("text/plain",l.writeToString(r)),n=n&&b,b=p.setData("text/html",g.writeToString(r,odf.Namespaces.namespaceMap)),n=n&&b,c.preventDefault()):n=!1;return n};g=new xmldom.LSSerializer;l=new odf.TextSerializer;c=new odf.OdfNodeFilter;g.filter=c;l.filter=
c};
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
gui.DirectTextStyler=function(g,l){function c(a,b){for(var c=0,d=b[c];d&&a;)a=a[d],c+=1,d=b[c];return b.length===c?a:void 0}function m(a,b){var d=c(a[0],b);return a.every(function(a){return d===c(a,b)})?d:void 0}function f(){var a=t.getCursor(l),a=(a=a&&a.getSelectedRange())&&s.getAppliedStyles(a)||[];a[0]&&A&&(a[0]=w.mergeObjects(a[0],A));return a}function n(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b,c;B=f();M=a(M,B?s.isBold(B):!1,"isBold");z=a(z,B?s.isItalic(B):!1,"isItalic");
K=a(K,B?s.hasUnderline(B):!1,"hasUnderline");F=a(F,B?s.hasStrikeThrough(B):!1,"hasStrikeThrough");b=B&&m(B,["style:text-properties","fo:font-size"]);Q=a(Q,b&&parseFloat(b),"fontSize");$=a($,B&&m(B,["style:text-properties","style:font-name"]),"fontName");c&&D.emit(gui.DirectTextStyler.textStylingChanged,c)}function b(a){a.getMemberId()===l&&n()}function p(a){a===l&&n()}function r(a){a.getMemberId()===l&&n()}function d(){n()}function k(a){var b=t.getCursor(l);b&&t.getParagraphElement(b.getNode())===
a.paragraphElement&&n()}function a(a,b){var c=t.getCursor(l);if(!c)return!1;c=s.getAppliedStyles(c.getSelectedRange());b(!a(c));return!0}function e(a){var b=t.getCursorSelection(l),c={"style:text-properties":a};0!==b.length?(a=new ops.OpApplyDirectStyling,a.init({memberid:l,position:b.position,length:b.length,setProperties:c}),g.enqueue([a])):(A=w.mergeObjects(A||{},c),n())}function h(a,b){var c={};c[a]=b;e(c)}function q(a){a=a.spec();A&&a.memberid===l&&"SplitParagraph"!==a.optype&&(A=null,n())}function u(a){h("fo:font-weight",
a?"bold":"normal")}function x(a){h("fo:font-style",a?"italic":"normal")}function v(a){h("style:text-underline-style",a?"solid":"none")}function y(a){h("style:text-line-through-style",a?"solid":"none")}var w=new core.Utils,t=g.getOdtDocument(),s=new gui.StyleHelper(t.getFormatting()),D=new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]),A,B=[],M=!1,z=!1,K=!1,F=!1,Q,$;this.formatTextSelection=e;this.createCursorStyleOp=function(a,b){var c=null;A&&(c=new ops.OpApplyDirectStyling,c.init({memberid:l,
position:a,length:b,setProperties:A}),A=null,n());return c};this.setBold=u;this.setItalic=x;this.setHasUnderline=v;this.setHasStrikethrough=y;this.setFontSize=function(a){h("fo:font-size",a+"pt")};this.setFontName=function(a){h("style:font-name",a)};this.getAppliedStyles=function(){return B};this.toggleBold=a.bind(this,s.isBold,u);this.toggleItalic=a.bind(this,s.isItalic,x);this.toggleUnderline=a.bind(this,s.hasUnderline,v);this.toggleStrikethrough=a.bind(this,s.hasStrikeThrough,y);this.isBold=function(){return M};
this.isItalic=function(){return z};this.hasUnderline=function(){return K};this.hasStrikeThrough=function(){return F};this.fontSize=function(){return Q};this.fontName=function(){return $};this.subscribe=function(a,b){D.subscribe(a,b)};this.unsubscribe=function(a,b){D.unsubscribe(a,b)};this.destroy=function(a){t.unsubscribe(ops.OdtDocument.signalCursorAdded,b);t.unsubscribe(ops.OdtDocument.signalCursorRemoved,p);t.unsubscribe(ops.OdtDocument.signalCursorMoved,r);t.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,
d);t.unsubscribe(ops.OdtDocument.signalParagraphChanged,k);t.unsubscribe(ops.OdtDocument.signalOperationExecuted,q);a()};t.subscribe(ops.OdtDocument.signalCursorAdded,b);t.subscribe(ops.OdtDocument.signalCursorRemoved,p);t.subscribe(ops.OdtDocument.signalCursorMoved,r);t.subscribe(ops.OdtDocument.signalParagraphStyleModified,d);t.subscribe(ops.OdtDocument.signalParagraphChanged,k);t.subscribe(ops.OdtDocument.signalOperationExecuted,q);n()};gui.DirectTextStyler.textStylingChanged="textStyling/changed";
(function(){return gui.DirectTextStyler})();
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
gui.DirectParagraphStyler=function(g,l,c){function m(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b=h.getCursor(l),b=b&&b.getSelectedRange(),c;y=a(y,b?x.isAlignedLeft(b):!1,"isAlignedLeft");w=a(w,b?x.isAlignedCenter(b):!1,"isAlignedCenter");t=a(t,b?x.isAlignedRight(b):!1,"isAlignedRight");s=a(s,b?x.isAlignedJustified(b):!1,"isAlignedJustified");c&&v.emit(gui.DirectParagraphStyler.paragraphStylingChanged,c)}function f(a){a.getMemberId()===l&&m()}function n(a){a===l&&m()}function b(a){a.getMemberId()===
l&&m()}function p(){m()}function r(a){var b=h.getCursor(l);b&&h.getParagraphElement(b.getNode())===a.paragraphElement&&m()}function d(a){var b=h.getCursor(l).getSelectedRange(),d=h.getCursorPosition(l),b=u.getParagraphElements(b),e=h.getFormatting();b.forEach(function(b){var f=d+h.getDistanceFromCursor(l,b,0),k=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=c.generateStyleName();var m,f=f+1;k&&(m=e.createDerivedStyleObject(k,"paragraph",{}));m=a(m||{});k=new ops.OpAddStyle;k.init({memberid:l,
styleName:b,styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:m});m=new ops.OpSetParagraphStyle;m.init({memberid:l,styleName:b,position:f});g.enqueue([k,m])})}function k(a){d(function(b){return q.mergeObjects(b,a)})}function a(a){k({"style:paragraph-properties":{"fo:text-align":a}})}function e(a,b){var c=h.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&u.parseLength(d);return q.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var h=g.getOdtDocument(),q=new core.Utils,u=new odf.OdfUtils,x=new gui.StyleHelper(h.getFormatting()),v=new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]),y,w,t,s;this.isAlignedLeft=function(){return y};this.isAlignedCenter=function(){return w};this.isAlignedRight=function(){return t};this.isAlignedJustified=function(){return s};this.alignParagraphLeft=function(){a("left");return!0};this.alignParagraphCenter=function(){a("center");
return!0};this.alignParagraphRight=function(){a("right");return!0};this.alignParagraphJustified=function(){a("justify");return!0};this.indent=function(){d(e.bind(null,1));return!0};this.outdent=function(){d(e.bind(null,-1));return!0};this.subscribe=function(a,b){v.subscribe(a,b)};this.unsubscribe=function(a,b){v.unsubscribe(a,b)};this.destroy=function(a){h.unsubscribe(ops.OdtDocument.signalCursorAdded,f);h.unsubscribe(ops.OdtDocument.signalCursorRemoved,n);h.unsubscribe(ops.OdtDocument.signalCursorMoved,
b);h.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,p);h.unsubscribe(ops.OdtDocument.signalParagraphChanged,r);a()};h.subscribe(ops.OdtDocument.signalCursorAdded,f);h.subscribe(ops.OdtDocument.signalCursorRemoved,n);h.subscribe(ops.OdtDocument.signalCursorMoved,b);h.subscribe(ops.OdtDocument.signalParagraphStyleModified,p);h.subscribe(ops.OdtDocument.signalParagraphChanged,r);m()};gui.DirectParagraphStyler.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectParagraphStyler})();
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
gui.KeyboardHandler=function(){function g(c,g){g||(g=l.None);return c+":"+g}var l=gui.KeyboardHandler.Modifier,c=null,m={};this.setDefault=function(f){c=f};this.bind=function(c,l,b){c=g(c,l);runtime.assert(!1===m.hasOwnProperty(c),"tried to overwrite the callback handler of key combo: "+c);m[c]=b};this.unbind=function(c,l){var b=g(c,l);delete m[b]};this.reset=function(){c=null;m={}};this.handleEvent=function(f){var n=f.keyCode,b=l.None;f.metaKey&&(b|=l.Meta);f.ctrlKey&&(b|=l.Ctrl);f.altKey&&(b|=l.Alt);
f.shiftKey&&(b|=l.Shift);n=g(n,b);n=m[n];b=!1;n?b=n():null!==c&&(b=c(f));b&&(f.preventDefault?f.preventDefault():f.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,CtrlAlt:6,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
// Input 82
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.ObjectNameGenerator");
gui.ImageManager=function(g,l,c){var m={"image/gif":".gif","image/jpeg":".jpg","image/png":".png"},f=odf.Namespaces.textns,n=g.getOdtDocument(),b=n.getFormatting(),p={};this.insertImage=function(r,d,k,a){var e;runtime.assert(0<k&&0<a,"Both width and height of the image should be greater than 0px.");e=n.getParagraphElement(n.getCursor(l).getNode()).getAttributeNS(f,"style-name");p.hasOwnProperty(e)||(p[e]=b.getContentSize(e,"paragraph"));e=p[e];k*=0.0264583333333334;a*=0.0264583333333334;var h=1,q=
1;k>e.width&&(h=e.width/k);a>e.height&&(q=e.height/a);h=Math.min(h,q);e=k*h;k=a*h;q=n.getOdfCanvas().odfContainer().rootElement.styles;a=r.toLowerCase();var h=m.hasOwnProperty(a)?m[a]:null,u;a=[];runtime.assert(null!==h,"Image type is not supported: "+r);h="Pictures/"+c.generateImageName()+h;u=new ops.OpSetBlob;u.init({memberid:l,filename:h,mimetype:r,content:d});a.push(u);b.getStyleElement("Graphics","graphic",[q])||(r=new ops.OpAddStyle,r.init({memberid:l,styleName:"Graphics",styleFamily:"graphic",
isAutomaticStyle:!1,setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph","svg:x":"0cm","svg:y":"0cm","style:wrap":"dynamic","style:number-wrapped-paragraphs":"no-limit","style:wrap-contour":"false","style:vertical-pos":"top","style:vertical-rel":"paragraph","style:horizontal-pos":"center","style:horizontal-rel":"paragraph"}}}),a.push(r));r=c.generateStyleName();d=new ops.OpAddStyle;d.init({memberid:l,styleName:r,styleFamily:"graphic",isAutomaticStyle:!0,setProperties:{"style:parent-style-name":"Graphics",
"style:graphic-properties":{"style:vertical-pos":"top","style:vertical-rel":"baseline","style:horizontal-pos":"center","style:horizontal-rel":"paragraph","fo:background-color":"transparent","style:background-transparency":"100%","style:shadow":"none","style:mirror":"none","fo:clip":"rect(0cm, 0cm, 0cm, 0cm)","draw:luminance":"0%","draw:contrast":"0%","draw:red":"0%","draw:green":"0%","draw:blue":"0%","draw:gamma":"100%","draw:color-inversion":"false","draw:image-opacity":"100%","draw:color-mode":"standard"}}});
a.push(d);u=new ops.OpInsertImage;u.init({memberid:l,position:n.getCursorPosition(l),filename:h,frameWidth:e+"cm",frameHeight:k+"cm",frameStyleName:r,frameName:c.generateFrameName()});a.push(u);g.enqueue(a)}};
// Input 83
runtime.loadClass("odf.Namespaces");
gui.ImageSelector=function(g){function l(){var b=g.getSizer(),c,l;c=f.createElement("div");c.id="imageSelector";c.style.borderWidth="1px";b.appendChild(c);m.forEach(function(b){l=f.createElement("div");l.className=b;c.appendChild(l)});return c}var c=odf.Namespaces.svgns,m="topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(" "),f=g.getElement().ownerDocument,n=!1;this.select=function(b){var m,r,d=f.getElementById("imageSelector");d||(d=l());n=!0;m=d.parentNode;
r=b.getBoundingClientRect();var k=m.getBoundingClientRect(),a=g.getZoomLevel();m=(r.left-k.left)/a-1;r=(r.top-k.top)/a-1;d.style.display="block";d.style.left=m+"px";d.style.top=r+"px";d.style.width=b.getAttributeNS(c,"width");d.style.height=b.getAttributeNS(c,"height")};this.clearSelection=function(){var b;n&&(b=f.getElementById("imageSelector"))&&(b.style.display="none");n=!1};this.isSelectorElement=function(b){var c=f.getElementById("imageSelector");return c?b===c||b.parentNode===c:!1}};
// Input 84
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
runtime.loadClass("core.PositionFilter");
gui.TextManipulator=function(g,l,c){function m(b){var c=new ops.OpRemoveText;c.init({memberid:l,position:b.position,length:b.length});return c}function f(b){0>b.length&&(b.position+=b.length,b.length=-b.length);return b}function n(c,d){var f=new core.PositionFilterChain,a=gui.SelectionMover.createPositionIterator(b.getRootElement(c)),e=d?a.nextPosition:a.previousPosition;f.addFilter("BaseFilter",b.getPositionFilter());f.addFilter("RootFilter",b.createRootFilter(l));for(a.setUnfilteredPosition(c,0);e();)if(f.acceptPosition(a)===
p)return!0;return!1}var b=g.getOdtDocument(),p=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.enqueueParagraphSplittingOps=function(){var c=f(b.getCursorSelection(l)),d,k=[];0<c.length&&(d=m(c),k.push(d));d=new ops.OpSplitParagraph;d.init({memberid:l,position:c.position});k.push(d);g.enqueue(k);return!0};this.removeTextByBackspaceKey=function(){var c=b.getCursor(l),d=f(b.getCursorSelection(l)),k=null;0===d.length?n(c.getNode(),!1)&&(k=new ops.OpRemoveText,k.init({memberid:l,position:d.position-
1,length:1}),g.enqueue([k])):(k=m(d),g.enqueue([k]));return null!==k};this.removeTextByDeleteKey=function(){var c=b.getCursor(l),d=f(b.getCursorSelection(l)),k=null;0===d.length?n(c.getNode(),!0)&&(k=new ops.OpRemoveText,k.init({memberid:l,position:d.position,length:1}),g.enqueue([k])):(k=m(d),g.enqueue([k]));return null!==k};this.removeCurrentSelection=function(){var c=f(b.getCursorSelection(l));0!==c.length&&(c=m(c),g.enqueue([c]));return!0};this.insertText=function(n){var d=f(b.getCursorSelection(l)),
k,a=[];0<d.length&&(k=m(d),a.push(k));k=new ops.OpInsertText;k.init({memberid:l,position:d.position,text:n});a.push(k);c&&(n=c(d.position,n.length))&&a.push(n);g.enqueue(a)}};(function(){return gui.TextManipulator})();
// Input 85
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.PositionFilter");runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.SelectionMover");
gui.AnnotationController=function(g,l){function c(){var c=b.getCursor(l),c=c&&c.getNode(),a;if(a=c){a:{for(a=b.getRootNode();c&&c!==a;){if(c.namespaceURI===d&&"annotation"===c.localName){c=!0;break a}c=c.parentNode}c=!1}a=!c}c=a;c!==p&&(p=c,r.emit(gui.AnnotationController.annotatableChanged,p))}function m(b){b.getMemberId()===l&&c()}function f(b){b===l&&c()}function n(b){b.getMemberId()===l&&c()}var b=g.getOdtDocument(),p=!1,r=new core.EventNotifier([gui.AnnotationController.annotatableChanged]),
d=odf.Namespaces.officens;this.isAnnotatable=function(){return p};this.addAnnotation=function(){var c=new ops.OpAddAnnotation,a=b.getCursorSelection(l),d=a.length,a=a.position;p&&(a=0<=d?a:a+d,d=Math.abs(d),c.init({memberid:l,position:a,length:d,name:l+Date.now()}),g.enqueue([c]))};this.removeAnnotation=function(c){var a,d;a=b.convertDomPointToCursorStep(c,0)+1;d=b.convertDomPointToCursorStep(c,c.childNodes.length);c=new ops.OpRemoveAnnotation;c.init({memberid:l,position:a,length:d-a});d=new ops.OpMoveCursor;
d.init({memberid:l,position:0<a?a-1:a,length:0});g.enqueue([c,d])};this.subscribe=function(b,a){r.subscribe(b,a)};this.unsubscribe=function(b,a){r.unsubscribe(b,a)};this.destroy=function(c){b.unsubscribe(ops.OdtDocument.signalCursorAdded,m);b.unsubscribe(ops.OdtDocument.signalCursorRemoved,f);b.unsubscribe(ops.OdtDocument.signalCursorMoved,n);c()};b.subscribe(ops.OdtDocument.signalCursorAdded,m);b.subscribe(ops.OdtDocument.signalCursorRemoved,f);b.subscribe(ops.OdtDocument.signalCursorMoved,n);c()};
gui.AnnotationController.annotatableChanged="annotatable/changed";(function(){return gui.AnnotationController})();
// Input 86
gui.EventManager=function(g){function l(){var b=this,a=[];this.handlers=[];this.isSubscribed=!1;this.handleEvent=function(c){-1===a.indexOf(c)&&(a.push(c),b.handlers.forEach(function(a){a(c)}),runtime.setTimeout(function(){a.splice(a.indexOf(c),1)},0))}}function c(b){var a=b.scrollX,c=b.scrollY;this.restore=function(){b.scrollX===a&&b.scrollY===c||b.scrollTo(a,c)}}function m(b){var a=b.scrollTop,c=b.scrollLeft;this.restore=function(){if(b.scrollTop!==a||b.scrollLeft!==c)b.scrollTop=a,b.scrollLeft=
c}}function f(b,a,c){var d="on"+a,f=!1;b.attachEvent&&(f=b.attachEvent(d,c));!f&&b.addEventListener&&(b.addEventListener(a,c,!1),f=!0);f&&!r[a]||!b.hasOwnProperty(d)||(b[d]=c)}function n(){return g.getDOM().activeElement===b}var b=g.getOdfCanvas().getElement(),p=runtime.getWindow(),r={beforecut:!0,beforepaste:!0},d;this.subscribe=function(c,a){var e=p&&d[c];e?(e.handlers.push(a),e.isSubscribed||(e.isSubscribed=!0,f(p,c,e.handleEvent),f(b,c,e.handleEvent))):f(b,c,a)};this.unsubscribe=function(c,a){var e=
p&&d[c],f=e&&e.handlers.indexOf(a);e?-1!==f&&e.handlers.splice(f,1):(e=b,f="on"+c,e.detachEvent&&e.detachEvent(f,a),e.removeEventListener&&e.removeEventListener(c,a,!1),e[f]===a&&(e[f]=null))};this.hasFocus=n;this.focus=function(){var d;if(!n()){for(d=b;d&&!d.scrollTop&&!d.scrollLeft;)d=d.parentNode;d=d?new m(d):p?new c(p):null;b.focus();d&&d.restore()}};d={mousedown:new l,mouseup:new l}};
// Input 87
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Async");runtime.loadClass("core.ScheduledTask");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.ObjectNameGenerator");runtime.loadClass("ops.OdtCursor");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.DirectTextStyler");runtime.loadClass("gui.DirectParagraphStyler");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.ImageManager");
runtime.loadClass("gui.ImageSelector");runtime.loadClass("gui.TextManipulator");runtime.loadClass("gui.AnnotationController");runtime.loadClass("gui.EventManager");runtime.loadClass("gui.PlainTextPasteboard");
gui.SessionController=function(){var g=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(l,c,m,f){function n(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(a,b,d){var e=new ops.OpMoveCursor;e.init({memberid:c,position:a,length:b||0,selectionType:d});return e}function p(a){a=H.getDistanceFromCursor(c,a,0);var d=null!==a?a+1:null,e;if(d||a)e=H.getCursorPosition(c),a=b(e+a,d-a,ops.OdtCursor.RegionSelection),l.enqueue([a]);X.focus()}function r(a,d){var e,
f,g,h;f=H.getOdfCanvas().getElement();e=d.detail;if(a){if(!a.anchorNode&&!a.focusNode){g=d.clientX;h=d.clientY;var k=H.getDOM();k.caretRangeFromPoint?(g=k.caretRangeFromPoint(g,h),g={container:g.startContainer,offset:g.startOffset}):k.caretPositionFromPoint?(g=k.caretPositionFromPoint(g,h),g={container:g.offsetNode,offset:g.offset}):g=null;if(!g)return;a.anchorNode=g.container;a.anchorOffset=g.offset;a.focusNode=a.anchorNode;a.focusOffset=a.anchorOffset}runtime.assert(null!==a.anchorNode&&null!==
a.focusNode,"anchorNode or focusNode is null");g=fa.containsNode(f,a.anchorNode);f=fa.containsNode(f,a.focusNode);if(g||f){if(g&&f)if(2===e){var k=/[A-Za-z0-9]/,m=gui.SelectionMover.createPositionIterator(H.getRootNode()),n=0<fa.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset),p;n?(g=a.anchorNode,h=a.anchorOffset,e=a.focusNode,f=a.focusOffset):(g=a.focusNode,h=a.focusOffset,e=a.anchorNode,f=a.anchorOffset);for(m.setUnfilteredPosition(g,h);m.previousPosition();){p=m.getCurrentNode();
if(p.nodeType===Node.TEXT_NODE){if(p=p.data[m.unfilteredDomOffset()],!k.test(p))break}else if(!W.isTextSpan(p))break;g=m.container();h=m.unfilteredDomOffset()}m.setUnfilteredPosition(e,f);do if(p=m.getCurrentNode(),p.nodeType===Node.TEXT_NODE){if(p=p.data[m.unfilteredDomOffset()],!k.test(p))break}else if(!W.isTextSpan(p))break;while(m.nextPosition());e=m.container();f=m.unfilteredDomOffset();n?(a.anchorNode=g,a.anchorOffset=h,a.focusNode=e,a.focusOffset=f):(a.focusNode=g,a.focusOffset=h,a.anchorNode=
e,a.anchorOffset=f)}else 3<=e&&(e=H.getParagraphElement(a.anchorNode),f=H.getParagraphElement(a.focusNode),e&&(a.anchorNode=e,a.anchorOffset=0),f&&(a.focusNode=f,a.focusOffset=f.childNodes.length));f=H.convertDomToCursorRange(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset);e=H.getCursorSelection(c);if(f.position!==e.position||f.length!==e.length)e=b(f.position,f.length,ops.OdtCursor.RangeSelection),l.enqueue([e]);X.focus()}}}function d(a){var d=H.getCursorSelection(c),e=H.getCursor(c).getStepCounter();
0!==a&&(a=0<a?e.convertForwardStepsBetweenFilters(a,na,ta):-e.convertBackwardStepsBetweenFilters(-a,na,ta),a=d.length+a,l.enqueue([b(d.position,a)]))}function k(a){var d=H.getCursorPosition(c),e=H.getCursor(c).getStepCounter();0!==a&&(a=0<a?e.convertForwardStepsBetweenFilters(a,na,ta):-e.convertBackwardStepsBetweenFilters(-a,na,ta),l.enqueue([b(d+a,0)]))}function a(){k(-1);return!0}function e(){k(1);return!0}function h(){d(-1);return!0}function q(){d(1);return!0}function u(a,b){var e=H.getParagraphElement(H.getCursor(c).getNode());
runtime.assert(Boolean(e),"SessionController: Cursor outside paragraph");e=H.getCursor(c).getStepCounter().countLinesSteps(a,na);b?d(e):k(e)}function x(){u(-1,!1);return!0}function v(){u(1,!1);return!0}function y(){u(-1,!0);return!0}function w(){u(1,!0);return!0}function t(a,b){var e=H.getCursor(c).getStepCounter().countStepsToLineBoundary(a,na);b?d(e):k(e)}function s(){t(-1,!1);return!0}function D(){t(1,!1);return!0}function A(){t(-1,!0);return!0}function B(){t(1,!0);return!0}function M(){var a=
H.getParagraphElement(H.getCursor(c).getNode()),b,e;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");e=H.getDistanceFromCursor(c,a,0);b=gui.SelectionMover.createPositionIterator(H.getRootNode());for(b.setUnfilteredPosition(a,0);0===e&&b.previousPosition();)a=b.getCurrentNode(),W.isParagraph(a)&&(e=H.getDistanceFromCursor(c,a,0));d(e);return!0}function z(){var a=H.getParagraphElement(H.getCursor(c).getNode()),b,e;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");
b=gui.SelectionMover.createPositionIterator(H.getRootNode());b.moveToEndOfNode(a);for(e=H.getDistanceFromCursor(c,b.container(),b.unfilteredDomOffset());0===e&&b.nextPosition();)a=b.getCurrentNode(),W.isParagraph(a)&&(b.moveToEndOfNode(a),e=H.getDistanceFromCursor(c,b.container(),b.unfilteredDomOffset()));d(e);return!0}function K(a,b){var e=gui.SelectionMover.createPositionIterator(H.getRootNode());0<a&&e.moveToEnd();e=H.getDistanceFromCursor(c,e.container(),e.unfilteredDomOffset());b?d(e):k(e)}function F(){K(-1,
!1);return!0}function Q(){K(1,!1);return!0}function $(){K(-1,!0);return!0}function ia(){K(1,!0);return!0}function R(){var a=H.getRootNode(),a=H.convertDomPointToCursorStep(a,a.childNodes.length);l.enqueue([b(0,a)]);return!0}function ma(){var a=H.getCursor(c),b=U.getSelection(),d;a?(ua.clearSelection(),a.getSelectionType()===ops.OdtCursor.RegionSelection&&(d=W.getImageElements(a.getSelectedRange())[0])&&ua.select(d.parentNode),X.hasFocus()&&(d=a.getSelectedRange(),b.extend?a.hasForwardSelection()?
(b.collapse(d.startContainer,d.startOffset),b.extend(d.endContainer,d.endOffset)):(b.collapse(d.endContainer,d.endOffset),b.extend(d.startContainer,d.startOffset)):(xa=!0,b.removeAllRanges(),b.addRange(d.cloneRange()),H.getOdfCanvas().getElement().setActive(),runtime.setTimeout(function(){xa=!1},0)))):ua.clearSelection()}function ba(){!1===xa&&runtime.setTimeout(ma,0)}function ga(a){var b=H.getCursor(c);b.getSelectedRange().collapsed||(ja.setDataFromRange(a,b.getSelectedRange())?pa.removeCurrentSelection():
runtime.log("Cut operation failed"))}function S(){return!1!==H.getCursor(c).getSelectedRange().collapsed}function Y(a){var b=H.getCursor(c);b.getSelectedRange().collapsed||ja.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function V(a){var b;U.clipboardData&&U.clipboardData.getData?b=U.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(pa.removeCurrentSelection(),l.enqueue(Ba.createPasteOps(b)),a.preventDefault?
a.preventDefault():a.returnValue=!1)}function G(){return!1}function I(a){if(da)da.onOperationExecuted(a)}function ha(a){H.emit(ops.OdtDocument.signalUndoStackChanged,a)}function N(){return da?(da.moveBackward(1),ma(),!0):!1}function O(){return da?(da.moveForward(1),ma(),!0):!1}function Z(a){if(oa=(a=a.target||a.srcElement)&&fa.containsNode(H.getOdfCanvas().getElement(),a))va=!1,wa=H.createRootFilter(a)}function ka(a){var b=a.getSelectedRange();return a.hasForwardSelection()?{anchorNode:b.startContainer,
anchorOffset:b.startOffset,focusNode:b.endContainer,focusOffset:b.endOffset}:{anchorNode:b.endContainer,anchorOffset:b.endOffset,focusNode:b.startContainer,focusOffset:b.startOffset}}function ca(a){var b=a.target||a.srcElement,c={detail:a.detail,clientX:a.clientX,clientY:a.clientY,target:b};ra.processRequests();W.isImage(b)&&W.isCharacterFrame(b.parentNode)?p(b.parentNode):oa&&!ua.isSelectorElement(b)&&(va?r(ka(m),a):runtime.setTimeout(function(){var a;a=(a=U.getSelection())?{anchorNode:a.anchorNode,
anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}:null;r(a,c)},0));va=oa=!1}function T(a){ca(a)}function P(a){var b=a.target||a.srcElement,c=null;"annotationRemoveButton"===b.className?(c=fa.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0],qa.removeAnnotation(c)):ca(a)}function L(){var a=U.getSelection(),b;oa&&0<a.rangeCount&&(va=!0,ua.clearSelection(),ya.setUnfilteredPosition(a.focusNode,a.focusOffset),wa.acceptPosition(ya)===g&&(b=a.getRangeAt(0).cloneRange(),
a=a.anchorNode===b.startContainer&&a.anchorOffset===b.startOffset,m.setSelectedRange(b,a),H.emit(ops.OdtDocument.signalCursorMoved,m)))}function ea(a){return function(){a();return!0}}function E(a){return function(b){return H.getCursor(c).getSelectionType()===ops.OdtCursor.RangeSelection?a(b):!0}}var U=runtime.getWindow(),H=l.getOdtDocument(),la=new core.Async,fa=new core.DomUtils,W=new odf.OdfUtils,ja=new gui.Clipboard,C=new gui.KeyboardHandler,sa=new gui.KeyboardHandler,na=new core.PositionFilterChain,
ta=H.getPositionFilter(),oa=!1,za=new odf.ObjectNameGenerator(H.getOdfCanvas().odfContainer(),c),va=!1,wa=null,da=null,X=new gui.EventManager(H),qa=new gui.AnnotationController(l,c),aa=new gui.DirectTextStyler(l,c),J=f&&f.directParagraphStylingEnabled?new gui.DirectParagraphStyler(l,c,za):null,pa=new gui.TextManipulator(l,c,aa.createCursorStyleOp),Aa=new gui.ImageManager(l,c,za),ua=new gui.ImageSelector(H.getOdfCanvas()),ya=gui.SelectionMover.createPositionIterator(H.getRootNode()),ra,xa=!1,Ba=new gui.PlainTextPasteboard(H,
c);runtime.assert(null!==U,"Expected to be run in an environment which has a global window, like a browser.");na.addFilter("BaseFilter",ta);na.addFilter("RootFilter",H.createRootFilter(c));this.selectRange=r;this.moveCursorToLeft=a;this.moveCursorToDocumentBoundary=K;this.extendSelectionToEntireDocument=R;this.startEditing=function(){var a;H.getOdfCanvas().getElement().classList.add("virtualSelections");X.subscribe("keydown",C.handleEvent);X.subscribe("keypress",sa.handleEvent);X.subscribe("keyup",
n);X.subscribe("beforecut",S);X.subscribe("cut",ga);X.subscribe("copy",Y);X.subscribe("beforepaste",G);X.subscribe("paste",V);X.subscribe("mousedown",Z);X.subscribe("mousemove",ra.trigger);X.subscribe("mouseup",P);X.subscribe("contextmenu",T);X.subscribe("focus",ba);H.subscribe(ops.OdtDocument.signalOperationExecuted,ma);H.subscribe(ops.OdtDocument.signalOperationExecuted,I);a=new ops.OpAddCursor;a.init({memberid:c});l.enqueue([a]);da&&da.saveInitialState()};this.endEditing=function(){var a;a=new ops.OpRemoveCursor;
a.init({memberid:c});l.enqueue([a]);da&&da.resetInitialState();H.unsubscribe(ops.OdtDocument.signalOperationExecuted,I);H.unsubscribe(ops.OdtDocument.signalOperationExecuted,ma);X.unsubscribe("keydown",C.handleEvent);X.unsubscribe("keypress",sa.handleEvent);X.unsubscribe("keyup",n);X.unsubscribe("cut",ga);X.unsubscribe("beforecut",S);X.unsubscribe("copy",Y);X.unsubscribe("paste",V);X.unsubscribe("beforepaste",G);X.unsubscribe("mousemove",ra.trigger);X.unsubscribe("mousedown",Z);X.unsubscribe("mouseup",
P);X.unsubscribe("contextmenu",T);X.unsubscribe("focus",ba);H.getOdfCanvas().getElement().classList.remove("virtualSelections")};this.getInputMemberId=function(){return c};this.getSession=function(){return l};this.setUndoManager=function(a){da&&da.unsubscribe(gui.UndoManager.signalUndoStackChanged,ha);if(da=a)da.setOdtDocument(H),da.setPlaybackFunction(function(a){a.execute(H)}),da.subscribe(gui.UndoManager.signalUndoStackChanged,ha)};this.getUndoManager=function(){return da};this.getAnnotationController=
function(){return qa};this.getDirectTextStyler=function(){return aa};this.getDirectParagraphStyler=function(){return J};this.getImageManager=function(){return Aa};this.getTextManipulator=function(){return pa};this.getEventManager=function(){return X};this.getKeyboardHandlers=function(){return{keydown:C,keypress:sa}};this.destroy=function(a){var b=[ra.destroy,aa.destroy];J&&b.push(J.destroy);la.destroyAll(b,a)};(function(){var b=-1!==U.navigator.appVersion.toLowerCase().indexOf("mac"),c=gui.KeyboardHandler.Modifier,
d=gui.KeyboardHandler.KeyCode;ra=new core.ScheduledTask(L,0);C.bind(d.Tab,c.None,E(function(){pa.insertText("\t");return!0}));C.bind(d.Left,c.None,E(a));C.bind(d.Right,c.None,E(e));C.bind(d.Up,c.None,E(x));C.bind(d.Down,c.None,E(v));C.bind(d.Backspace,c.None,ea(pa.removeTextByBackspaceKey));C.bind(d.Delete,c.None,pa.removeTextByDeleteKey);C.bind(d.Left,c.Shift,E(h));C.bind(d.Right,c.Shift,E(q));C.bind(d.Up,c.Shift,E(y));C.bind(d.Down,c.Shift,E(w));C.bind(d.Home,c.None,E(s));C.bind(d.End,c.None,E(D));
C.bind(d.Home,c.Ctrl,E(F));C.bind(d.End,c.Ctrl,E(Q));C.bind(d.Home,c.Shift,E(A));C.bind(d.End,c.Shift,E(B));C.bind(d.Up,c.CtrlShift,E(M));C.bind(d.Down,c.CtrlShift,E(z));C.bind(d.Home,c.CtrlShift,E($));C.bind(d.End,c.CtrlShift,E(ia));b?(C.bind(d.Clear,c.None,pa.removeCurrentSelection),C.bind(d.Left,c.Meta,E(s)),C.bind(d.Right,c.Meta,E(D)),C.bind(d.Home,c.Meta,E(F)),C.bind(d.End,c.Meta,E(Q)),C.bind(d.Left,c.MetaShift,E(A)),C.bind(d.Right,c.MetaShift,E(B)),C.bind(d.Up,c.AltShift,E(M)),C.bind(d.Down,
c.AltShift,E(z)),C.bind(d.Up,c.MetaShift,E($)),C.bind(d.Down,c.MetaShift,E(ia)),C.bind(d.A,c.Meta,E(R)),C.bind(d.B,c.Meta,E(aa.toggleBold)),C.bind(d.I,c.Meta,E(aa.toggleItalic)),C.bind(d.U,c.Meta,E(aa.toggleUnderline)),J&&(C.bind(d.L,c.MetaShift,E(J.alignParagraphLeft)),C.bind(d.E,c.MetaShift,E(J.alignParagraphCenter)),C.bind(d.R,c.MetaShift,E(J.alignParagraphRight)),C.bind(d.J,c.MetaShift,E(J.alignParagraphJustified))),qa&&C.bind(d.C,c.MetaShift,qa.addAnnotation),C.bind(d.Z,c.Meta,N),C.bind(d.Z,
c.MetaShift,O)):(C.bind(d.A,c.Ctrl,E(R)),C.bind(d.B,c.Ctrl,E(aa.toggleBold)),C.bind(d.I,c.Ctrl,E(aa.toggleItalic)),C.bind(d.U,c.Ctrl,E(aa.toggleUnderline)),J&&(C.bind(d.L,c.CtrlShift,E(J.alignParagraphLeft)),C.bind(d.E,c.CtrlShift,E(J.alignParagraphCenter)),C.bind(d.R,c.CtrlShift,E(J.alignParagraphRight)),C.bind(d.J,c.CtrlShift,E(J.alignParagraphJustified))),qa&&C.bind(d.C,c.CtrlAlt,qa.addAnnotation),C.bind(d.Z,c.Ctrl,N),C.bind(d.Z,c.CtrlShift,O));sa.setDefault(E(function(a){var b;b=null===a.which||
void 0===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(pa.insertText(b),!0)}));sa.bind(d.Enter,c.None,E(pa.enqueueParagraphSplittingOps))})()};return gui.SessionController}();
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(g){};ops.OperationRouter.prototype.setPlaybackFunction=function(g){};ops.OperationRouter.prototype.push=function(g){};ops.OperationRouter.prototype.close=function(g){};
// Input 89
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
ops.TrivialOperationRouter=function(){var g,l;this.setOperationFactory=function(c){g=c};this.setPlaybackFunction=function(c){l=c};this.push=function(c){c.forEach(function(c){c=c.spec();c.timestamp=(new Date).getTime();c=g.create(c);l(c)})};this.close=function(c){c()}};
// Input 90
gui.EditInfoHandle=function(g){var l=[],c,m=g.ownerDocument,f=m.documentElement.namespaceURI;this.setEdits=function(g){l=g;var b,p,r,d;c.innerHTML="";for(g=0;g<l.length;g+=1)b=m.createElementNS(f,"div"),b.className="editInfo",p=m.createElementNS(f,"span"),p.className="editInfoColor",p.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),r=m.createElementNS(f,"span"),r.className="editInfoAuthor",r.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),
d=m.createElementNS(f,"span"),d.className="editInfoTime",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),d.innerHTML=l[g].time,b.appendChild(p),b.appendChild(r),b.appendChild(d),c.appendChild(b)};this.show=function(){c.style.display="block"};this.hide=function(){c.style.display="none"};this.destroy=function(f){g.removeChild(c);f()};c=m.createElementNS(f,"div");c.setAttribute("class","editInfoHandle");c.style.display="none";g.appendChild(c)};
// Input 91
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
gui.EditInfoMarker=function(g,l){function c(c,f){return runtime.setTimeout(function(){b.style.opacity=c},f)}var m=this,f,n,b,p,r;this.addEdit=function(d,f){var a=Date.now()-f;g.addEdit(d,f);n.setEdits(g.getSortedEdits());b.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",d);p&&runtime.clearTimeout(p);r&&runtime.clearTimeout(r);1E4>a?(c(1,0),p=c(0.5,1E4-a),r=c(0.2,2E4-a)):1E4<=a&&2E4>a?(c(0.5,0),r=c(0.2,2E4-a)):c(0.2,0)};this.getEdits=function(){return g.getEdits()};this.clearEdits=function(){g.clearEdits();
n.setEdits([]);b.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&b.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return g};this.show=function(){b.style.display="block"};this.hide=function(){m.hideHandle();b.style.display="none"};this.showHandle=function(){n.show()};this.hideHandle=function(){n.hide()};this.destroy=function(c){f.removeChild(b);n.destroy(function(b){b?c(b):g.destroy(c)})};(function(){var c=g.getOdtDocument().getDOM();
b=c.createElementNS(c.documentElement.namespaceURI,"div");b.setAttribute("class","editInfoMarker");b.onmouseover=function(){m.showHandle()};b.onmouseout=function(){m.hideHandle()};f=g.getNode();f.appendChild(b);n=new gui.EditInfoHandle(f);l||m.hide()})()};
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
runtime.loadClass("gui.Caret");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
gui.SessionView=function(){return function(g,l,c,m,f){function n(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid="'+a+'"]'+e+c;a:{var f=u.firstChild;for(b=b+'[editinfo|memberid="'+a+'"]'+e+"{";f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:u.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',
":before");d("dc|creator","{ background-color: "+c+"; }","");d("div.selectionOverlay","{ background-color: "+c+";}","")}function b(a){var b,c;for(c in v)v.hasOwnProperty(c)&&(b=v[c],a?b.show():b.hide())}function p(a){m.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function r(a){var b=a.getMemberId();a=a.getProperties();n(b,a.fullName,a.color);l===b&&n("","",a.color)}function d(a){var b=a.getMemberId(),d=c.getOdtDocument().getMember(b).getProperties();m.registerCursor(a,w,t);f.registerCursor(a,
!0);if(a=m.getCaret(b))a.setAvatarImageUrl(d.imageUrl),a.setColor(d.color);runtime.log("+++ View here +++ eagerly created an Caret for '"+b+"'! +++")}function k(a){a=a.getMemberId();var b=f.getSelectionView(l),c=f.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),d=m.getCaret(l);a===l?(c.hide(),b.show(),d&&d.show()):a===gui.ShadowCursor.ShadowCursorMemberId&&(c.show(),b.hide(),d&&d.hide())}function a(a){f.removeSelectionView(a)}function e(a){var b=a.paragraphElement,d=a.memberId;a=a.timeStamp;
var e,f="",g=b.getElementsByTagNameNS(x,"editinfo")[0];g?(f=g.getAttributeNS(x,"id"),e=v[f]):(f=Math.random().toString(),e=new ops.EditInfo(b,c.getOdtDocument()),e=new gui.EditInfoMarker(e,y),g=b.getElementsByTagNameNS(x,"editinfo")[0],g.setAttributeNS(x,"id",f),v[f]=e);e.addEdit(d,new Date(a))}function h(){D=!0}function q(){s=runtime.getWindow().setInterval(function(){D&&(f.rerenderSelectionViews(),D=!1)},200)}var u,x="urn:webodf:names:editinfo",v={},y=void 0!==g.editInfoMarkersInitiallyVisible?
Boolean(g.editInfoMarkersInitiallyVisible):!0,w=void 0!==g.caretAvatarsInitiallyVisible?Boolean(g.caretAvatarsInitiallyVisible):!0,t=void 0!==g.caretBlinksOnRangeSelect?Boolean(g.caretBlinksOnRangeSelect):!0,s,D=!1;this.showEditInfoMarkers=function(){y||(y=!0,b(y))};this.hideEditInfoMarkers=function(){y&&(y=!1,b(y))};this.showCaretAvatars=function(){w||(w=!0,p(w))};this.hideCaretAvatars=function(){w&&(w=!1,p(w))};this.getSession=function(){return c};this.getCaret=function(a){return m.getCaret(a)};
this.destroy=function(b){var f=c.getOdtDocument(),g=Object.keys(v).map(function(a){return v[a]});f.unsubscribe(ops.OdtDocument.signalMemberAdded,r);f.unsubscribe(ops.OdtDocument.signalMemberUpdated,r);f.unsubscribe(ops.OdtDocument.signalCursorAdded,d);f.unsubscribe(ops.OdtDocument.signalCursorRemoved,a);f.unsubscribe(ops.OdtDocument.signalParagraphChanged,e);f.unsubscribe(ops.OdtDocument.signalCursorMoved,k);f.unsubscribe(ops.OdtDocument.signalParagraphChanged,h);f.unsubscribe(ops.OdtDocument.signalTableAdded,
h);f.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,h);runtime.getWindow().clearInterval(s);u.parentNode.removeChild(u);(function K(a,c){c?b(c):a<g.length?g[a].destroy(function(b){K(a+1,b)}):b()})(0,void 0)};(function(){var b=c.getOdtDocument(),f=document.getElementsByTagName("head")[0];b.subscribe(ops.OdtDocument.signalMemberAdded,r);b.subscribe(ops.OdtDocument.signalMemberUpdated,r);b.subscribe(ops.OdtDocument.signalCursorAdded,d);b.subscribe(ops.OdtDocument.signalCursorRemoved,a);b.subscribe(ops.OdtDocument.signalParagraphChanged,
e);b.subscribe(ops.OdtDocument.signalCursorMoved,k);q();b.subscribe(ops.OdtDocument.signalParagraphChanged,h);b.subscribe(ops.OdtDocument.signalTableAdded,h);b.subscribe(ops.OdtDocument.signalParagraphStyleModified,h);u=document.createElementNS(f.namespaceURI,"style");u.type="text/css";u.media="screen, print, handheld, projection";u.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));u.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));
f.appendChild(u)})()}}();
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
runtime.loadClass("gui.Caret");
gui.CaretManager=function(g){function l(a){return e.hasOwnProperty(a)?e[a]:null}function c(){return Object.keys(e).map(function(a){return e[a]})}function m(a){a===g.getInputMemberId()&&g.getSession().getOdtDocument().getOdfCanvas().getElement().removeAttribute("tabindex");delete e[a]}function f(a){a=a.getMemberId();a===g.getInputMemberId()&&(a=l(a))&&a.refreshCursorBlinking()}function n(){var a=l(g.getInputMemberId());q=!1;a&&a.ensureVisible()}function b(){var a=l(g.getInputMemberId());a&&(a.handleUpdate(),
q||(q=!0,runtime.setTimeout(n,50)))}function p(a){a.memberId===g.getInputMemberId()&&b()}function r(){var a=l(g.getInputMemberId());a&&a.setFocus()}function d(){var a=l(g.getInputMemberId());a&&a.removeFocus()}function k(){var a=l(g.getInputMemberId());a&&a.show()}function a(){var a=l(g.getInputMemberId());a&&a.hide()}var e={},h=runtime.getWindow(),q=!1;this.registerCursor=function(a,c,d){var f=a.getMemberId();c=new gui.Caret(a,c,d);e[f]=c;f===g.getInputMemberId()?(runtime.log("Starting to track input on new cursor of "+
f),a.handleUpdate=b,g.getSession().getOdtDocument().getOdfCanvas().getElement().setAttribute("tabindex",-1),g.getEventManager().focus()):a.handleUpdate=c.handleUpdate;return c};this.getCaret=l;this.getCarets=c;this.destroy=function(b){var l=g.getSession().getOdtDocument(),n=g.getEventManager(),q=c();l.unsubscribe(ops.OdtDocument.signalParagraphChanged,p);l.unsubscribe(ops.OdtDocument.signalCursorMoved,f);l.unsubscribe(ops.OdtDocument.signalCursorRemoved,m);n.unsubscribe("focus",r);n.unsubscribe("blur",
d);h.removeEventListener("focus",k,!1);h.removeEventListener("blur",a,!1);(function t(a,c){c?b(c):a<q.length?q[a].destroy(function(b){t(a+1,b)}):b()})(0,void 0);e={}};(function(){var b=g.getSession().getOdtDocument(),c=g.getEventManager();b.subscribe(ops.OdtDocument.signalParagraphChanged,p);b.subscribe(ops.OdtDocument.signalCursorMoved,f);b.subscribe(ops.OdtDocument.signalCursorRemoved,m);c.subscribe("focus",r);c.subscribe("blur",d);h.addEventListener("focus",k,!1);h.addEventListener("blur",a,!1)})()};
// Input 94
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(g,l){};gui.UndoManager.prototype.unsubscribe=function(g,l){};gui.UndoManager.prototype.setOdtDocument=function(g){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(g){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(g){};gui.UndoManager.prototype.moveBackward=function(g){};gui.UndoManager.prototype.onOperationExecuted=function(g){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
// Input 95
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
gui.UndoStateRules=function(){function g(c){return c.spec().optype}function l(c){return c.isEdit}this.getOpType=g;this.isEditOperation=l;this.isPartOfOperationSet=function(c,m){if(c.isEdit){if(0===m.length)return!0;var f;if(f=m[m.length-1].isEdit)a:{f=m.filter(l);var n=g(c),b;b:switch(n){case "RemoveText":case "InsertText":b=!0;break b;default:b=!1}if(b&&n===g(f[0])){if(1===f.length){f=!0;break a}n=f[f.length-2].spec().position;f=f[f.length-1].spec().position;b=c.spec().position;if(f===b-(f-n)){f=
!0;break a}}f=!1}return f}return!0}};
// Input 96
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
gui.TrivialUndoManager=function(g){function l(){u.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:b.hasUndoStates(),redoAvailable:b.hasRedoStates()})}function c(){e!==d&&e!==h[h.length-1]&&h.push(e)}function m(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);p.normalizeTextNodes(b)}function f(a){return Object.keys(a).map(function(b){return a[b]})}function n(b){function c(a){var b=a.spec();if(g[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete g[b.memberid],h-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},g={},h,k=b.pop();a.getCursors().forEach(function(a){g[a.getMemberId()]=!0});for(h=Object.keys(g).length;k&&0<h;)k.reverse(),k.forEach(c),k=b.pop();return f(d).concat(f(e))}var b=this,p=new core.DomUtils,r,d=[],k,a,e=[],h=[],q=[],u=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
x=g||new gui.UndoStateRules;this.subscribe=function(a,b){u.subscribe(a,b)};this.unsubscribe=function(a,b){u.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<h.length};this.hasRedoStates=function(){return 0<q.length};this.setOdtDocument=function(b){a=b};this.resetInitialState=function(){h.length=0;q.length=0;d.length=0;e.length=0;r=null;l()};this.saveInitialState=function(){var b=a.getOdfCanvas().odfContainer(),f=a.getOdfCanvas().getAnnotationViewManager();f&&f.forgetAnnotations();r=b.rootElement.cloneNode(!0);
a.getOdfCanvas().refreshAnnotations();b=r;p.getElementsByTagNameNS(b,"urn:webodf:names:cursor","cursor").forEach(m);p.getElementsByTagNameNS(b,"urn:webodf:names:cursor","anchor").forEach(m);c();h.unshift(d);e=d=n(h);h.length=0;q.length=0;l()};this.setPlaybackFunction=function(a){k=a};this.onOperationExecuted=function(a){q.length=0;x.isEditOperation(a)&&e===d||!x.isPartOfOperationSet(a,e)?(c(),e=[a],h.push(e),u.emit(gui.UndoManager.signalUndoStateCreated,{operations:e}),l()):(e.push(a),u.emit(gui.UndoManager.signalUndoStateModified,
{operations:e}))};this.moveForward=function(a){for(var b=0,c;a&&q.length;)c=q.pop(),h.push(c),c.forEach(k),a-=1,b+=1;b&&(e=h[h.length-1],l());return b};this.moveBackward=function(b){for(var c=a.getOdfCanvas(),f=c.odfContainer(),g=0;b&&h.length;)q.push(h.pop()),b-=1,g+=1;g&&(f.setRootElement(r.cloneNode(!0)),c.setOdfContainer(f,!0),u.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),a.getCursors().forEach(function(b){a.removeCursor(b.getMemberId())}),d.forEach(k),h.forEach(function(a){a.forEach(k)}),
c.refreshCSS(),e=h[h.length-1]||d,l());return g}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
// Input 97
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("gui.SelectionMover");
gui.SelectionView=function(g){function l(){var a=h.getRootNode();q!==a&&(q=a,u=q.parentNode.parentNode.parentNode,u.appendChild(v),u.appendChild(y),u.appendChild(w))}function c(a,b){a.style.left=b.left+"px";a.style.top=b.top+"px";a.style.width=b.width+"px";a.style.height=b.height+"px"}function m(a){D=a;v.style.display=y.style.display=w.style.display=!0===a?"block":"none"}function f(a){var b=s.getBoundingClientRect(u),c=h.getOdfCanvas().getZoomLevel(),d={};d.top=s.adaptRangeDifferenceToZoomLevel(a.top-
b.top,c);d.left=s.adaptRangeDifferenceToZoomLevel(a.left-b.left,c);d.bottom=s.adaptRangeDifferenceToZoomLevel(a.bottom-b.top,c);d.right=s.adaptRangeDifferenceToZoomLevel(a.right-b.left,c);d.width=s.adaptRangeDifferenceToZoomLevel(a.width,c);d.height=s.adaptRangeDifferenceToZoomLevel(a.height,c);return d}function n(a){a=a.getBoundingClientRect();return Boolean(a&&0!==a.height)}function b(a){var b=t.getTextElements(a,!0,!1),c=a.cloneRange(),d=a.cloneRange();a=a.cloneRange();if(!b.length)return null;
var e;a:{e=0;var f=b[e],g=c.startContainer===f?c.startOffset:0,h=g;c.setStart(f,g);for(c.setEnd(f,h);!n(c);){if(f.nodeType===Node.ELEMENT_NODE&&h<f.childNodes.length)h=f.childNodes.length;else if(f.nodeType===Node.TEXT_NODE&&h<f.length)h+=1;else if(b[e])f=b[e],e+=1,g=h=0;else{e=!1;break a}c.setStart(f,g);c.setEnd(f,h)}e=!0}if(!e)return null;a:{e=b.length-1;f=b[e];h=g=d.endContainer===f?d.endOffset:f.length||f.childNodes.length;d.setStart(f,g);for(d.setEnd(f,h);!n(d);){if(f.nodeType===Node.ELEMENT_NODE&&
0<g)g=0;else if(f.nodeType===Node.TEXT_NODE&&0<g)g-=1;else if(b[e])f=b[e],e-=1,g=h=f.length||f.childNodes.length;else{b=!1;break a}d.setStart(f,g);d.setEnd(f,h)}b=!0}if(!b)return null;a.setStart(c.startContainer,c.startOffset);a.setEnd(d.endContainer,d.endOffset);return{firstRange:c,lastRange:d,fillerRange:a}}function p(a,b){var c={};c.top=Math.min(a.top,b.top);c.left=Math.min(a.left,b.left);c.right=Math.max(a.right,b.right);c.bottom=Math.max(a.bottom,b.bottom);c.width=c.right-c.left;c.height=c.bottom-
c.top;return c}function r(a,b){b&&0<b.width&&0<b.height&&(a=a?p(a,b):b);return a}function d(a){function b(a){A.setUnfilteredPosition(a,0);return v.acceptNode(a)===B&&w.acceptPosition(A)===B?B:M}function c(a){var d=null;b(a)===B&&(d=s.getBoundingClientRect(a));return d}var d=a.commonAncestorContainer,e=a.startContainer,f=a.endContainer,g=a.startOffset,k=a.endOffset,l,m,n=null,p,q=x.createRange(),w,v=new odf.OdfNodeFilter,u;if(e===d||f===d)return q=a.cloneRange(),n=q.getBoundingClientRect(),q.detach(),
n;for(a=e;a.parentNode!==d;)a=a.parentNode;for(m=f;m.parentNode!==d;)m=m.parentNode;w=h.createRootFilter(e);for(d=a.nextSibling;d&&d!==m;)p=c(d),n=r(n,p),d=d.nextSibling;if(t.isParagraph(a))n=r(n,s.getBoundingClientRect(a));else if(a.nodeType===Node.TEXT_NODE)d=a,q.setStart(d,g),q.setEnd(d,d===m?k:d.length),p=q.getBoundingClientRect(),n=r(n,p);else for(u=x.createTreeWalker(a,NodeFilter.SHOW_TEXT,b,!1),d=u.currentNode=e;d&&d!==f;)q.setStart(d,g),q.setEnd(d,d.length),p=q.getBoundingClientRect(),n=r(n,
p),l=d,g=0,d=u.nextNode();l||(l=e);if(t.isParagraph(m))n=r(n,s.getBoundingClientRect(m));else if(m.nodeType===Node.TEXT_NODE)d=m,q.setStart(d,d===a?g:0),q.setEnd(d,k),p=q.getBoundingClientRect(),n=r(n,p);else for(u=x.createTreeWalker(m,NodeFilter.SHOW_TEXT,b,!1),d=u.currentNode=f;d&&d!==l;)if(q.setStart(d,0),q.setEnd(d,k),p=q.getBoundingClientRect(),n=r(n,p),d=u.previousNode())k=d.length;return n}function k(a,b){var c=a.getBoundingClientRect(),d={width:0};d.top=c.top;d.bottom=c.bottom;d.height=c.height;
d.left=d.right=b?c.right:c.left;return d}function a(){l();if(g.getSelectionType()===ops.OdtCursor.RangeSelection){m(!0);var a=g.getSelectedRange(),e=b(a),h,n,s,t;a.collapsed||!e?m(!1):(m(!0),a=e.firstRange,h=e.lastRange,e=e.fillerRange,n=f(k(a,!1)),t=f(k(h,!0)),s=(s=d(e))?f(s):p(n,t),c(v,{left:n.left,top:n.top,width:Math.max(0,s.width-(n.left-s.left)),height:n.height}),t.top===n.top||t.bottom===n.bottom?y.style.display=w.style.display="none":(c(w,{left:s.left,top:t.top,width:Math.max(0,t.right-s.left),
height:t.height}),c(y,{left:s.left,top:n.top+n.height,width:Math.max(0,parseFloat(v.style.left)+parseFloat(v.style.width)-parseFloat(w.style.left)),height:Math.max(0,t.top-n.bottom)})),a.detach(),h.detach(),e.detach())}else m(!1)}function e(b){b===g&&a()}var h=g.getOdtDocument(),q,u,x=h.getDOM(),v=x.createElement("div"),y=x.createElement("div"),w=x.createElement("div"),t=new odf.OdfUtils,s=new core.DomUtils,D=!0,A=gui.SelectionMover.createPositionIterator(h.getRootNode()),B=NodeFilter.FILTER_ACCEPT,
M=NodeFilter.FILTER_REJECT;this.show=this.rerender=a;this.hide=function(){m(!1)};this.visible=function(){return D};this.destroy=function(a){u.removeChild(v);u.removeChild(y);u.removeChild(w);g.getOdtDocument().unsubscribe(ops.OdtDocument.signalCursorMoved,e);a()};(function(){var a=g.getMemberId();l();v.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);y.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);w.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",
a);v.className=y.className=w.className="selectionOverlay";g.getOdtDocument().subscribe(ops.OdtDocument.signalCursorMoved,e)})()};
// Input 98
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
gui.SelectionViewManager=function(){function g(){return Object.keys(l).map(function(c){return l[c]})}var l={};this.getSelectionView=function(c){return l.hasOwnProperty(c)?l[c]:null};this.getSelectionViews=g;this.removeSelectionView=function(c){l.hasOwnProperty(c)&&(l[c].destroy(function(){}),delete l[c])};this.hideSelectionView=function(c){l.hasOwnProperty(c)&&l[c].hide()};this.showSelectionView=function(c){l.hasOwnProperty(c)&&l[c].show()};this.rerenderSelectionViews=function(){Object.keys(l).forEach(function(c){l[c].visible()&&
l[c].rerender()})};this.registerCursor=function(c,g){var f=c.getMemberId(),n=new gui.SelectionView(c);g?n.show():n.hide();return l[f]=n};this.destroy=function(c){var l=g();(function n(b,g){g?c(g):b<l.length?l[b].destroy(function(c){n(b+1,c)}):c()})(0,void 0)}};
// Input 99
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("gui.SelectionMover");runtime.loadClass("core.PositionFilterChain");runtime.loadClass("ops.StepsTranslator");runtime.loadClass("ops.TextPositionFilter");runtime.loadClass("ops.Member");
ops.OdtDocument=function(g){function l(){var a=g.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"' for OdtDocument");return a}function c(){return l().ownerDocument}function m(a){for(;a&&!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}function f(b){this.acceptPosition=function(c){c=c.container();var d;d="string"===typeof b?
a[b].getNode():b;return m(c)===m(d)?q:u}}function n(a){var b=gui.SelectionMover.createPositionIterator(l());a=v.convertStepsToDomPoint(a);b.setUnfilteredPosition(a.node,a.offset);return b}function b(a,b){return g.getFormatting().getStyleElement(a,b)}function p(a){return b(a,"paragraph")}var r=this,d,k,a={},e={},h=new core.EventNotifier([ops.OdtDocument.signalMemberAdded,ops.OdtDocument.signalMemberUpdated,ops.OdtDocument.signalMemberRemoved,ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,
ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonStyleCreated,ops.OdtDocument.signalCommonStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged,ops.OdtDocument.signalStepsInserted,ops.OdtDocument.signalStepsRemoved]),q=core.PositionFilter.FilterResult.FILTER_ACCEPT,u=core.PositionFilter.FilterResult.FILTER_REJECT,x,v,y;this.getDOM=
c;this.getRootElement=m;this.getIteratorAtPosition=n;this.convertDomPointToCursorStep=function(a,b){return v.convertDomPointToSteps(a,b)};this.convertDomToCursorRange=function(a,b,c,d){var e;e=v.convertDomPointToSteps(a,b);a=a===c&&b===d?e:v.convertDomPointToSteps(c,d);return{position:e,length:a-e}};this.convertCursorToDomRange=function(a,b){var d=c().createRange(),e,f;e=v.convertStepsToDomPoint(a);b?(f=v.convertStepsToDomPoint(a+b),0<b?(d.setStart(e.node,e.offset),d.setEnd(f.node,f.offset)):(d.setStart(f.node,
f.offset),d.setEnd(e.node,e.offset))):d.setStart(e.node,e.offset);return d};this.getStyleElement=b;this.upgradeWhitespacesAtPosition=function(a){a=n(a);var b,c,e;a.previousPosition();a.previousPosition();for(e=-1;1>=e;e+=1){b=a.container();c=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[c]&&d.isSignificantWhitespace(b,c)){runtime.assert(" "===b.data[c],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=b.ownerDocument.createElementNS(odf.Namespaces.textns,
"text:s");f.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(c,1);0<c&&(b=b.splitText(c));b.parentNode.insertBefore(f,b);b=f;a.moveToEndOfNode(b)}a.nextPosition()}};this.downgradeWhitespacesAtPosition=function(a){var b=n(a),c;a=b.container();for(b=b.unfilteredDomOffset();!d.isCharacterElement(a)&&a.childNodes[b];)a=a.childNodes[b],b=0;a.nodeType===Node.TEXT_NODE&&(a=a.parentNode);d.isDowngradableSpaceElement(a)&&(b=a.firstChild,c=a.lastChild,k.mergeIntoParent(a),c!==b&&k.normalizeTextNodes(c),
k.normalizeTextNodes(b))};this.getParagraphStyleElement=p;this.getParagraphElement=function(a){return d.getParagraphElement(a)};this.getParagraphStyleAttributes=function(a){return(a=p(a))?g.getFormatting().getInheritedStyleAttributes(a):null};this.getTextNodeAtStep=function(b,d){var e=n(b),f=e.container(),g,h=0,k=null;f.nodeType===Node.TEXT_NODE?(g=f,h=e.unfilteredDomOffset()):(g=c().createTextNode(""),h=0,f.insertBefore(g,e.rightNode()));if(d&&a[d]&&r.getCursorPosition(d)===b){for(k=a[d].getNode();k.nextSibling&&
"cursor"===k.nextSibling.localName;)k.parentNode.insertBefore(k.nextSibling,k);0<g.length&&g.nextSibling!==k&&(g=c().createTextNode(""),h=0);k.parentNode.insertBefore(g,k)}for(;g.previousSibling&&g.previousSibling.nodeType===Node.TEXT_NODE;)g.previousSibling.appendData(g.data),h=g.previousSibling.length,g=g.previousSibling,g.parentNode.removeChild(g.nextSibling);return{textNode:g,offset:h}};this.fixCursorPositions=function(){var b=new core.PositionFilterChain;b.addFilter("BaseFilter",x);Object.keys(a).forEach(function(c){var d=
a[c],e=d.getStepCounter(),f,g,h=!1;b.addFilter("RootFilter",r.createRootFilter(c));c=e.countStepsToPosition(d.getAnchorNode(),0,b);e.isPositionWalkable(b)?0===c&&(h=!0,d.move(0)):(h=!0,f=e.countPositionsToNearestStep(d.getNode(),0,b),g=e.countPositionsToNearestStep(d.getAnchorNode(),0,b),d.move(f),0!==c&&(0<g&&(c+=1),0<f&&(c-=1),e=e.countSteps(c,b),d.move(e),d.move(-e,!0)));h&&r.emit(ops.OdtDocument.signalCursorMoved,d);b.removeFilter("RootFilter")})};this.getDistanceFromCursor=function(b,c,d){b=
a[b];var e,f;runtime.assert(null!==c&&void 0!==c,"OdtDocument.getDistanceFromCursor called without node");b&&(e=v.convertDomPointToSteps(b.getNode(),0),f=v.convertDomPointToSteps(c,d));return f-e};this.getCursorPosition=function(b){return(b=a[b])?v.convertDomPointToSteps(b.getNode(),0):0};this.getCursorSelection=function(b){b=a[b];var c=0,d=0;b&&(c=v.convertDomPointToSteps(b.getNode(),0),d=v.convertDomPointToSteps(b.getAnchorNode(),0));return{position:d,length:c-d}};this.getPositionFilter=function(){return x};
this.getOdfCanvas=function(){return g};this.getRootNode=l;this.addMember=function(a){runtime.assert(void 0===e[a.getMemberId()],"This member already exists");e[a.getMemberId()]=a};this.getMember=function(a){return e.hasOwnProperty(a)?e[a]:null};this.removeMember=function(a){delete e[a]};this.getCursor=function(b){return a[b]};this.getCursors=function(){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(a[c]);return b};this.addCursor=function(b){runtime.assert(Boolean(b),"OdtDocument::addCursor without cursor");
var c=b.getStepCounter().countSteps(1,x),d=b.getMemberId();runtime.assert("string"===typeof d,"OdtDocument::addCursor has cursor without memberid");runtime.assert(!a[d],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+d);b.move(c);a[d]=b};this.removeCursor=function(b){var c=a[b];return c?(c.removeFromOdtDocument(),delete a[b],r.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getFormatting=function(){return g.getFormatting()};this.emit=function(a,b){h.emit(a,b)};this.subscribe=
function(a,b){h.subscribe(a,b)};this.unsubscribe=function(a,b){h.unsubscribe(a,b)};this.createRootFilter=function(a){return new f(a)};this.close=function(a){a()};this.destroy=function(a){a()};x=new ops.TextPositionFilter(l);d=new odf.OdfUtils;k=new core.DomUtils;v=new ops.StepsTranslator(l,gui.SelectionMover.createPositionIterator,x,500);h.subscribe(ops.OdtDocument.signalStepsInserted,v.handleStepsInserted);h.subscribe(ops.OdtDocument.signalStepsRemoved,v.handleStepsRemoved);h.subscribe(ops.OdtDocument.signalOperationExecuted,
function(a){var b=a.spec(),c=b.memberid,b=(new Date(b.timestamp)).toISOString(),d=g.odfContainer().getMetadataManager();a.isEdit&&(c=r.getMember(c).getProperties().fullName,d.setMetadata({"dc:creator":c,"dc:date":b},null),y||(d.incrementEditingCycles(),d.setMetadata(null,["meta:editing-duration","meta:document-statistic"])),y=a)})};ops.OdtDocument.signalMemberAdded="member/added";ops.OdtDocument.signalMemberUpdated="member/updated";ops.OdtDocument.signalMemberRemoved="member/removed";
ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalCommonStyleCreated="style/created";ops.OdtDocument.signalCommonStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";
ops.OdtDocument.signalUndoStackChanged="undo/changed";ops.OdtDocument.signalStepsInserted="steps/inserted";ops.OdtDocument.signalStepsRemoved="steps/removed";(function(){return ops.OdtDocument})();
// Input 100
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
runtime.loadClass("ops.TrivialOperationRouter");runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OdtDocument");
ops.Session=function(g){var l=new ops.OperationFactory,c=new ops.OdtDocument(g),m=null;this.setOperationFactory=function(c){l=c;m&&m.setOperationFactory(l)};this.setOperationRouter=function(f){m=f;f.setPlaybackFunction(function(f){f.execute(c);c.emit(ops.OdtDocument.signalOperationExecuted,f)});f.setOperationFactory(l)};this.getOperationFactory=function(){return l};this.getOdtDocument=function(){return c};this.enqueue=function(c){m.push(c)};this.close=function(f){m.close(function(g){g?f(g):c.close(f)})};
this.destroy=function(f){c.destroy(f)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 101
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let's not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\n.virtualSelections office|document *::selection {\n  background: transparent;\n}\n.virtualSelections office|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    z-index: 15;\n    opacity: 0.2;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n";
// Input 102
var webodf_version="0.4.2-1451-gc9cf878";
