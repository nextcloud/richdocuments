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
function Runtime(){}Runtime.ByteArray=function(h){};Runtime.prototype.getVariable=function(h){};Runtime.prototype.toJson=function(h){};Runtime.prototype.fromJson=function(h){};Runtime.ByteArray.prototype.slice=function(h,m){};Runtime.ByteArray.prototype.length=0;Runtime.prototype.byteArrayFromArray=function(h){};Runtime.prototype.byteArrayFromString=function(h,m){};Runtime.prototype.byteArrayToString=function(h,m){};Runtime.prototype.concatByteArrays=function(h,m){};
Runtime.prototype.read=function(h,m,e,p){};Runtime.prototype.readFile=function(h,m,e){};Runtime.prototype.readFileSync=function(h,m){};Runtime.prototype.loadXML=function(h,m){};Runtime.prototype.writeFile=function(h,m,e){};Runtime.prototype.isFile=function(h,m){};Runtime.prototype.getFileSize=function(h,m){};Runtime.prototype.deleteFile=function(h,m){};Runtime.prototype.log=function(h,m){};Runtime.prototype.setTimeout=function(h,m){};Runtime.prototype.clearTimeout=function(h){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(h){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(h,m,e){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(h,m){function e(e){var a="",d,f=e.length;for(d=0;d<f;d+=1)a+=String.fromCharCode(e[d]&255);return a}function p(e){var a="",d,f=e.length,b,k,c,g;for(d=0;d<f;d+=1)b=e[d],128>b?a+=String.fromCharCode(b):(d+=1,k=e[d],194<=b&&224>b?a+=String.fromCharCode((b&31)<<6|k&63):(d+=1,c=e[d],224<=b&&240>b?a+=String.fromCharCode((b&15)<<12|(k&63)<<6|c&63):(d+=1,g=e[d],240<=b&&245>b&&(b=(b&7)<<18|(k&63)<<12|(c&63)<<6|g&63,b-=65536,a+=String.fromCharCode((b>>10)+55296,(b&1023)+56320)))));
return a}var l;"utf8"===m?l=p(h):("binary"!==m&&this.log("Unsupported encoding: "+m),l=e(h));return l};Runtime.getVariable=function(h){try{return eval(h)}catch(m){}};Runtime.toJson=function(h){return JSON.stringify(h)};Runtime.fromJson=function(h){return JSON.parse(h)};Runtime.getFunctionName=function(h){return void 0===h.name?(h=/function\s+(\w+)/.exec(h))&&h[1]:h.name};
function BrowserRuntime(h){function m(a,d){var f,b,k;void 0!==d?k=a:d=a;h?(b=h.ownerDocument,k&&(f=b.createElement("span"),f.className=k,f.appendChild(b.createTextNode(k)),h.appendChild(f),h.appendChild(b.createTextNode(" "))),f=b.createElement("span"),0<d.length&&"<"===d[0]?f.innerHTML=d:f.appendChild(b.createTextNode(d)),h.appendChild(f),h.appendChild(b.createElement("br"))):console&&console.log(d);"alert"===k&&alert(d)}function e(a,d,f){function b(){var c;4===k.readyState&&(0!==k.status||k.responseText?
200===k.status||0===k.status?(c="binary"===d?null!==k.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(k.responseBody)).toArray():p.byteArrayFromString(k.responseText,"binary"):k.responseText,l[a]=c,f(null,c)):f(k.responseText||k.statusText):f("File "+a+" is empty."))}if(l.hasOwnProperty(a))f(null,l[a]);else{var k=new XMLHttpRequest;k.open("GET",a,!0);k.onreadystatechange=b;k.overrideMimeType&&("binary"!==d?k.overrideMimeType("text/plain; charset="+d):k.overrideMimeType("text/plain; charset=x-user-defined"));
try{k.send(null)}catch(c){f(c.message)}}}var p=this,l={},q=window.ArrayBuffer&&window.Uint8Array;q&&(Uint8Array.prototype.slice=function(a,d){void 0===d&&(void 0===a&&(a=0),d=this.length);var f=this.subarray(a,d),b,k;d-=a;b=new Uint8Array(new ArrayBuffer(d));for(k=0;k<d;k+=1)b[k]=f[k];return b});this.ByteArray=q?function(a){return new Uint8Array(new ArrayBuffer(a))}:function(a){var d=[];d.length=a;return d};this.concatByteArrays=q?function(a,d){var f,b=a.length,k=d.length,c=new this.ByteArray(b+k);
for(f=0;f<b;f+=1)c[f]=a[f];for(f=0;f<k;f+=1)c[f+b]=d[f];return c}:function(a,d){return a.concat(d)};this.byteArrayFromArray=function(a){return a.slice()};this.byteArrayFromString=function(a,d){var f;if("utf8"===d){f=a.length;var b,k,c,g=0;for(k=0;k<f;k+=1)c=a.charCodeAt(k),g+=1+(128<c)+(2048<c);b=new p.ByteArray(g);for(k=g=0;k<f;k+=1)c=a.charCodeAt(k),128>c?(b[g]=c,g+=1):2048>c?(b[g]=192|c>>>6,b[g+1]=128|c&63,g+=2):(b[g]=224|c>>>12&15,b[g+1]=128|c>>>6&63,b[g+2]=128|c&63,g+=3)}else for("binary"!==
d&&p.log("unknown encoding: "+d),f=a.length,b=new p.ByteArray(f),k=0;k<f;k+=1)b[k]=a.charCodeAt(k)&255;return f=b};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=e;this.read=function(a,d,f,b){function k(){var g;4===c.readyState&&(0!==c.status||c.responseText?200===c.status||0===c.status?(c.response?(g=c.response,g=new Uint8Array(g)):g=null!==c.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(c.responseBody)).toArray():p.byteArrayFromString(c.responseText,"binary"),l[a]=g,b(null,g.slice(d,d+f))):b(c.responseText||c.statusText):b("File "+a+" is empty."))}if(l.hasOwnProperty(a))b(null,l[a].slice(d,d+f));else{var c=new XMLHttpRequest;c.open("GET",a,!0);c.onreadystatechange=k;c.overrideMimeType&&c.overrideMimeType("text/plain; charset=x-user-defined");c.responseType="arraybuffer";try{c.send(null)}catch(g){b(g.message)}}};this.readFileSync=function(a,d){var f=new XMLHttpRequest,
b;f.open("GET",a,!1);f.overrideMimeType&&("binary"!==d?f.overrideMimeType("text/plain; charset="+d):f.overrideMimeType("text/plain; charset=x-user-defined"));try{if(f.send(null),200===f.status||0===f.status)b=f.responseText}catch(k){}return b};this.writeFile=function(a,d,f){l[a]=d;var b=new XMLHttpRequest;b.open("PUT",a,!0);b.onreadystatechange=function(){4===b.readyState&&(0!==b.status||b.responseText?200<=b.status&&300>b.status||0===b.status?f(null):f("Status "+String(b.status)+": "+b.responseText||
b.statusText):f("File "+a+" is empty."))};d=d.buffer&&!b.sendAsBinary?d.buffer:p.byteArrayToString(d,"binary");try{b.sendAsBinary?b.sendAsBinary(d):b.send(d)}catch(k){p.log("HUH? "+k+" "+d),f(k.message)}};this.deleteFile=function(a,d){delete l[a];var f=new XMLHttpRequest;f.open("DELETE",a,!0);f.onreadystatechange=function(){4===f.readyState&&(200>f.status&&300<=f.status?d(f.responseText):d(null))};f.send(null)};this.loadXML=function(a,d){var f=new XMLHttpRequest;f.open("GET",a,!0);f.overrideMimeType&&
f.overrideMimeType("text/xml");f.onreadystatechange=function(){4===f.readyState&&(0!==f.status||f.responseText?200===f.status||0===f.status?d(null,f.responseXML):d(f.responseText):d("File "+a+" is empty."))};try{f.send(null)}catch(b){d(b.message)}};this.isFile=function(a,d){p.getFileSize(a,function(a){d(-1!==a)})};this.getFileSize=function(a,d){var f=new XMLHttpRequest;f.open("HEAD",a,!0);f.onreadystatechange=function(){if(4===f.readyState){var b=f.getResponseHeader("Content-Length");b?d(parseInt(b,
10)):e(a,"binary",function(b,c){b?d(-1):d(c.length)})}};f.send(null)};this.log=m;this.assert=function(a,d,f){if(!a)throw m("alert","ASSERTION FAILED:\n"+d),f&&f(),d;};this.setTimeout=function(a,d){return setTimeout(function(){a()},d)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){m("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function h(d,a,b){d=p.resolve(l,d);"binary"!==a?e.readFile(d,a,b):e.readFile(d,null,b)}var m=this,e=require("fs"),p=require("path"),l="",q,a;this.ByteArray=function(d){return new Buffer(d)};this.byteArrayFromArray=function(d){var a=new Buffer(d.length),b,k=d.length;for(b=0;b<k;b+=1)a[b]=d[b];return a};this.concatByteArrays=function(d,a){var b=new Buffer(d.length+a.length);d.copy(b,0,0);a.copy(b,d.length,0);return b};this.byteArrayFromString=function(d,a){return new Buffer(d,
a)};this.byteArrayToString=function(d,a){return d.toString(a)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=h;this.loadXML=function(d,a){h(d,"utf-8",function(b,d){if(b)return a(b);a(null,m.parseXML(d))})};this.writeFile=function(d,a,b){d=p.resolve(l,d);e.writeFile(d,a,"binary",function(d){b(d||null)})};this.deleteFile=function(d,a){d=p.resolve(l,d);e.unlink(d,a)};this.read=function(d,a,b,k){d=p.resolve(l,d);e.open(d,"r+",666,function(c,
g){if(c)k(c);else{var d=new Buffer(b);e.read(g,d,0,b,a,function(c){e.close(g);k(c,d)})}})};this.readFileSync=function(d,a){return a?"binary"===a?e.readFileSync(d,null):e.readFileSync(d,a):""};this.isFile=function(a,f){a=p.resolve(l,a);e.stat(a,function(b,a){f(!b&&a.isFile())})};this.getFileSize=function(a,f){a=p.resolve(l,a);e.stat(a,function(b,a){b?f(-1):f(a.size)})};this.log=function(a,f){var b;void 0!==f?b=a:f=a;"alert"===b&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(f+
"\n");"alert"===b&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,f,b){a||(process.stderr.write("ASSERTION FAILED: "+f),b&&b())};this.setTimeout=function(a,f){return setTimeout(function(){a()},f)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){l=a};this.currentDirectory=function(){return l};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=
function(a){return q.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};q=new (require("xmldom").DOMParser);a=m.parseXML("<a/>").implementation}
function RhinoRuntime(){function h(a,d){var f;void 0!==d?f=a:d=a;"alert"===f&&print("\n!!!!! ALERT !!!!!");print(d);"alert"===f&&print("!!!!! ALERT !!!!!")}var m=this,e=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),p,l,q="";e.setValidating(!1);e.setNamespaceAware(!0);e.setExpandEntityReferences(!1);e.setSchema(null);l=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,d){var f=new Packages.java.io.FileReader(d);return new Packages.org.xml.sax.InputSource(f)}});p=e.newDocumentBuilder();
p.setEntityResolver(l);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,d){var f=[],b,k=a.length;for(b=0;b<k;b+=1)f[b]=a.charCodeAt(b)&255;return f};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,d){return a.concat(d)};this.loadXML=function(a,d){var f=new Packages.java.io.File(a),b;try{b=p.parse(f)}catch(k){print(k);
d(k);return}d(null,b)};this.readFile=function(a,d,f){q&&(a=q+"/"+a);var b=new Packages.java.io.File(a),k="binary"===d?"latin1":d;b.isFile()?(a=readFile(a,k),"binary"===d&&(a=m.byteArrayFromString(a,"binary")),f(null,a)):f(a+" is not a file.")};this.writeFile=function(a,d,f){q&&(a=q+"/"+a);a=new Packages.java.io.FileOutputStream(a);var b,k=d.length;for(b=0;b<k;b+=1)a.write(d[b]);a.close();f(null)};this.deleteFile=function(a,d){q&&(a=q+"/"+a);(new Packages.java.io.File(a))["delete"]()?d(null):d("Could not delete "+
a)};this.read=function(a,d,f,b){q&&(a=q+"/"+a);var k;k=a;var c="binary";(new Packages.java.io.File(k)).isFile()?("binary"===c&&(c="latin1"),k=readFile(k,c)):k=null;k?b(null,this.byteArrayFromString(k.substring(d,d+f),"binary")):b("Cannot read "+a)};this.readFileSync=function(a,d){return d?readFile(a,d):""};this.isFile=function(a,d){q&&(a=q+"/"+a);var f=new Packages.java.io.File(a);d(f.isFile())};this.getFileSize=function(a,d){q&&(a=q+"/"+a);var f=new Packages.java.io.File(a);d(f.length())};this.log=
h;this.assert=function(a,d,f){a||(h("alert","ASSERTION FAILED: "+d),f&&f())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){q=a};this.currentDirectory=function(){return q};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return p.getDOMImplementation()};this.parseXML=function(a){return p.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function h(e){var l=e[0],h;h=eval("if (typeof "+l+" === 'undefined') {eval('"+l+" = {};');}"+l);for(l=1;l<e.length-1;l+=1)h=h.hasOwnProperty(e[l])?h[e[l]]:h[e[l]]={};return h[e[e.length-1]]}var m={},e={};runtime.loadClass=function(p){function l(a){a=a.replace(/\./g,"/")+".js";var b=runtime.libraryPaths(),d,c,g;runtime.currentDirectory&&b.push(runtime.currentDirectory());for(d=0;d<b.length;d+=1){c=b[d];if(!e.hasOwnProperty(c))try{g=runtime.readFileSync(b[d]+"/manifest.js","utf8"),e[c]=
g&&g.length?eval(g):null}catch(n){e[c]=null,runtime.log("Cannot load manifest for "+c+".")}g=null;if((c=e[c])&&c.indexOf&&-1!==c.indexOf(a))return b[d]+"/"+a}return null}function q(a){var b,d;d=l(a);if(!d)throw a+" is not listed in any manifest.js.";try{b=runtime.readFileSync(d,"utf8")}catch(c){throw runtime.log("Error loading "+a+" "+c),c;}if(void 0===b)throw"Cannot load class "+a;b=b+("\n//# sourceURL="+d)+("\n//@ sourceURL="+d);try{b=eval(a+" = eval(code);")}catch(g){throw runtime.log("Error loading "+
a+" "+g),g;}return b}if(!IS_COMPILED_CODE&&!m.hasOwnProperty(p)){var a=p.split("."),d;d=h(a);if(!d&&(d=q(p),!d||Runtime.getFunctionName(d)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];m[p]=!0}}})();(function(){var h=function(){};runtime.getTranslator=function(){return h};runtime.setTranslator=function(m){h=m};runtime.tr=function(m){var e=h(m);return e&&"string"===String(typeof e)?e:m}})();
(function(h){function m(e){if(e.length){var h=e[0];runtime.readFile(h,"utf8",function(l,m){function a(){var b;(b=eval(f))&&runtime.exit(b)}var d="",f=m;-1!==h.indexOf("/")&&(d=h.substring(0,h.indexOf("/")));runtime.setCurrentDirectory(d);l||null===f?(runtime.log(l),runtime.exit(1)):a.apply(null,e)})}}h=h?Array.prototype.slice.call(h):[];"NodeJSRuntime"===runtime.type()?m(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?m(h):m(h.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function h(c){var g=[],b,a=c.length;for(b=0;b<a;b+=1)g[b]=c.charCodeAt(b)&255;return g}function m(c){var g,b="",a,d=c.length-2;for(a=0;a<d;a+=3)g=c[a]<<16|c[a+1]<<8|c[a+2],b+=r[g>>>18],b+=r[g>>>12&63],b+=r[g>>>6&63],b+=r[g&63];a===d+1?(g=c[a]<<4,b+=r[g>>>6],b+=r[g&63],b+="=="):a===d&&(g=c[a]<<10|c[a+1]<<2,b+=r[g>>>12],b+=r[g>>>6&63],b+=r[g&63],b+="=");return b}function e(c){c=c.replace(/[^A-Za-z0-9+\/]+/g,"");var g=[],b=c.length%4,a,d=c.length,n;for(a=0;a<d;a+=4)n=(u[c.charAt(a)]||
0)<<18|(u[c.charAt(a+1)]||0)<<12|(u[c.charAt(a+2)]||0)<<6|(u[c.charAt(a+3)]||0),g.push(n>>16,n>>8&255,n&255);g.length-=[0,0,2,1][b];return g}function p(c){var g=[],b,a=c.length,d;for(b=0;b<a;b+=1)d=c[b],128>d?g.push(d):2048>d?g.push(192|d>>>6,128|d&63):g.push(224|d>>>12&15,128|d>>>6&63,128|d&63);return g}function l(c){var g=[],b,a=c.length,d,n,f;for(b=0;b<a;b+=1)d=c[b],128>d?g.push(d):(b+=1,n=c[b],224>d?g.push((d&31)<<6|n&63):(b+=1,f=c[b],g.push((d&15)<<12|(n&63)<<6|f&63)));return g}function q(c){return m(h(c))}
function a(c){return String.fromCharCode.apply(String,e(c))}function d(c){return l(h(c))}function f(c){c=l(c);for(var g="",b=0;b<c.length;)g+=String.fromCharCode.apply(String,c.slice(b,b+45E3)),b+=45E3;return g}function b(c,g,b){var a="",d,n,f;for(f=g;f<b;f+=1)g=c.charCodeAt(f)&255,128>g?a+=String.fromCharCode(g):(f+=1,d=c.charCodeAt(f)&255,224>g?a+=String.fromCharCode((g&31)<<6|d&63):(f+=1,n=c.charCodeAt(f)&255,a+=String.fromCharCode((g&15)<<12|(d&63)<<6|n&63)));return a}function k(c,g){function a(){var k=
f+d;k>c.length&&(k=c.length);n+=b(c,f,k);f=k;k=f===c.length;g(n,k)&&!k&&runtime.setTimeout(a,0)}var d=1E5,n="",f=0;c.length<d?g(b(c,0,c.length),!0):("string"!==typeof c&&(c=c.slice()),a())}function c(c){return p(h(c))}function g(c){return String.fromCharCode.apply(String,p(c))}function n(c){return String.fromCharCode.apply(String,p(h(c)))}var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",u=function(c){var g={},b,a;b=0;for(a=c.length;b<a;b+=1)g[c.charAt(b)]=b;return g}(r),y,
x,w=runtime.getWindow(),v,t;w&&w.btoa?(v=function(c){return w.btoa(c)},y=function(c){return v(n(c))}):(v=q,y=function(g){return m(c(g))});w&&w.atob?(t=function(c){return w.atob(c)},x=function(c){c=t(c);return b(c,0,c.length)}):(t=a,x=function(c){return f(e(c))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=m;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=e;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=p;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=l;this.convertUTF8StringToBase64=q;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=d;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=f;this.convertUTF8StringToUTF16String=k;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=c;this.convertUTF16ArrayToUTF8String=g;this.convertUTF16StringToUTF8String=n;this.convertUTF16StringToBase64=y;this.convertBase64ToUTF16String=x;this.fromBase64=a;this.toBase64=q;this.atob=
t;this.btoa=v;this.utob=n;this.btou=k;this.encode=y;this.encodeURI=function(c){return y(c).replace(/[+\/]/g,function(c){return"+"===c?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(c){return x(c.replace(/[\-_]/g,function(c){return"-"===c?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function h(){this.dl=this.fc=0}function m(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function e(c,g,b,a){this.good_length=c;this.max_lazy=g;this.nice_length=b;this.max_chain=a}function p(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=l;this.off=0}var l=8192,q,a,d,f,b=null,k,c,g,n,r,u,y,x,w,v,t,s,D,A,C,I,z,M,H,R,Z,ja,E,ka,ba,ga,S,Y,V,N,L,G,Q,O,ca,oa,da,T,P,ra,$,F,U,J,ia,fa,W,ha,B,sa,la,ta=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],ma=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],za=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],va=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],wa;wa=[new e(0,0,0,0),new e(4,4,8,4),new e(4,5,16,8),new e(4,6,32,32),new e(4,4,16,16),new e(8,16,32,32),new e(8,16,128,128),new e(8,32,128,256),new e(32,128,258,1024),new e(32,258,258,4096)];var ea=function(g){b[c+k++]=g;if(c+k===l){var n;if(0!==k){null!==q?(g=q,q=q.next):g=new p;
g.next=null;g.len=g.off=0;null===a?a=d=g:d=d.next=g;g.len=k-c;for(n=0;n<g.len;n++)g.ptr[n]=b[c+n];k=c=0}}},X=function(g){g&=65535;c+k<l-2?(b[c+k++]=g&255,b[c+k++]=g>>>8):(ea(g&255),ea(g>>>8))},pa=function(){t=(t<<5^n[z+3-1]&255)&8191;s=y[32768+t];y[z&32767]=s;y[32768+t]=z},aa=function(c,g){w>16-g?(x|=c<<w,X(x),x=c>>16-w,w+=g-16):(x|=c<<w,w+=g)},K=function(c,g){aa(g[c].fc,g[c].dl)},na=function(c,g,b){return c[g].fc<c[b].fc||c[g].fc===c[b].fc&&da[g]<=da[b]},Aa=function(c,g,b){var a;for(a=0;a<b&&la<
sa.length;a++)c[g+a]=sa.charCodeAt(la++)&255;return a},ua=function(){var c,g,b=65536-R-z;if(-1===b)b--;else if(65274<=z){for(c=0;32768>c;c++)n[c]=n[c+32768];M-=32768;z-=32768;v-=32768;for(c=0;8192>c;c++)g=y[32768+c],y[32768+c]=32768<=g?g-32768:0;for(c=0;32768>c;c++)g=y[c],y[c]=32768<=g?g-32768:0;b+=32768}H||(c=Aa(n,z+R,b),0>=c?H=!0:R+=c)},xa=function(c){var g=Z,b=z,a,d=I,f=32506<z?z-32506:0,k=z+258,e=n[b+d-1],r=n[b+d];I>=ka&&(g>>=2);do if(a=c,n[a+d]===r&&n[a+d-1]===e&&n[a]===n[b]&&n[++a]===n[b+1]){b+=
2;a++;do++b;while(n[b]===n[++a]&&n[++b]===n[++a]&&n[++b]===n[++a]&&n[++b]===n[++a]&&n[++b]===n[++a]&&n[++b]===n[++a]&&n[++b]===n[++a]&&n[++b]===n[++a]&&b<k);a=258-(k-b);b=k-258;if(a>d){M=c;d=a;if(258<=a)break;e=n[b+d-1];r=n[b+d]}c=y[c&32767]}while(c>f&&0!==--g);return d},qa=function(c,g){u[U++]=g;0===c?ba[g].fc++:(c--,ba[T[g]+256+1].fc++,ga[(256>c?P[c]:P[256+(c>>7)])&255].fc++,r[J++]=c,fa|=W);W<<=1;0===(U&7)&&(F[ia++]=fa,fa=0,W=1);if(2<E&&0===(U&4095)){var b=8*U,a=z-v,d;for(d=0;30>d;d++)b+=ga[d].fc*
(5+ma[d]);b>>=3;if(J<parseInt(U/2,10)&&b<parseInt(a/2,10))return!0}return 8191===U||8192===J},ya=function(c,g){for(var b=O[g],a=g<<1;a<=ca;){a<ca&&na(c,O[a+1],O[a])&&a++;if(na(c,b,O[a]))break;O[g]=O[a];g=a;a<<=1}O[g]=b},Da=function(c,g){var b=0;do b|=c&1,c>>=1,b<<=1;while(0<--g);return b>>1},Ea=function(c,g){var b=[];b.length=16;var a=0,d;for(d=1;15>=d;d++)a=a+Q[d-1]<<1,b[d]=a;for(a=0;a<=g;a++)d=c[a].dl,0!==d&&(c[a].fc=Da(b[d]++,d))},Ca=function(c){var g=c.dyn_tree,b=c.static_tree,a=c.elems,d,n=-1,
f=a;ca=0;oa=573;for(d=0;d<a;d++)0!==g[d].fc?(O[++ca]=n=d,da[d]=0):g[d].dl=0;for(;2>ca;)d=O[++ca]=2>n?++n:0,g[d].fc=1,da[d]=0,ha--,null!==b&&(B-=b[d].dl);c.max_code=n;for(d=ca>>1;1<=d;d--)ya(g,d);do d=O[1],O[1]=O[ca--],ya(g,1),b=O[1],O[--oa]=d,O[--oa]=b,g[f].fc=g[d].fc+g[b].fc,da[f]=da[d]>da[b]+1?da[d]:da[b]+1,g[d].dl=g[b].dl=f,O[1]=f++,ya(g,1);while(2<=ca);O[--oa]=O[1];f=c.dyn_tree;d=c.extra_bits;var a=c.extra_base,b=c.max_code,k=c.max_length,e=c.static_tree,r,s,h,C,l=0;for(s=0;15>=s;s++)Q[s]=0;f[O[oa]].dl=
0;for(c=oa+1;573>c;c++)r=O[c],s=f[f[r].dl].dl+1,s>k&&(s=k,l++),f[r].dl=s,r>b||(Q[s]++,h=0,r>=a&&(h=d[r-a]),C=f[r].fc,ha+=C*(s+h),null!==e&&(B+=C*(e[r].dl+h)));if(0!==l){do{for(s=k-1;0===Q[s];)s--;Q[s]--;Q[s+1]+=2;Q[k]--;l-=2}while(0<l);for(s=k;0!==s;s--)for(r=Q[s];0!==r;)d=O[--c],d>b||(f[d].dl!==s&&(ha+=(s-f[d].dl)*f[d].fc,f[d].fc=s),r--)}Ea(g,n)},Fa=function(c,g){var b,a=-1,d,n=c[0].dl,f=0,k=7,e=4;0===n&&(k=138,e=3);c[g+1].dl=65535;for(b=0;b<=g;b++)d=n,n=c[b+1].dl,++f<k&&d===n||(f<e?V[d].fc+=f:0!==
d?(d!==a&&V[d].fc++,V[16].fc++):10>=f?V[17].fc++:V[18].fc++,f=0,a=d,0===n?(k=138,e=3):d===n?(k=6,e=3):(k=7,e=4))},Ga=function(){8<w?X(x):0<w&&ea(x);w=x=0},Ha=function(c,g){var b,a=0,d=0,n=0,f=0,k,e;if(0!==U){do 0===(a&7)&&(f=F[n++]),b=u[a++]&255,0===(f&1)?K(b,c):(k=T[b],K(k+256+1,c),e=ta[k],0!==e&&(b-=ra[k],aa(b,e)),b=r[d++],k=(256>b?P[b]:P[256+(b>>7)])&255,K(k,g),e=ma[k],0!==e&&(b-=$[k],aa(b,e))),f>>=1;while(a<U)}K(256,c)},Ia=function(c,g){var b,a=-1,d,n=c[0].dl,f=0,k=7,e=4;0===n&&(k=138,e=3);for(b=
0;b<=g;b++)if(d=n,n=c[b+1].dl,!(++f<k&&d===n)){if(f<e){do K(d,V);while(0!==--f)}else 0!==d?(d!==a&&(K(d,V),f--),K(16,V),aa(f-3,2)):10>=f?(K(17,V),aa(f-3,3)):(K(18,V),aa(f-11,7));f=0;a=d;0===n?(k=138,e=3):d===n?(k=6,e=3):(k=7,e=4)}},Ja=function(){var c;for(c=0;286>c;c++)ba[c].fc=0;for(c=0;30>c;c++)ga[c].fc=0;for(c=0;19>c;c++)V[c].fc=0;ba[256].fc=1;fa=U=J=ia=ha=B=0;W=1},Ba=function(c){var g,b,a,d;d=z-v;F[ia]=fa;Ca(N);Ca(L);Fa(ba,N.max_code);Fa(ga,L.max_code);Ca(G);for(a=18;3<=a&&0===V[va[a]].dl;a--);
ha+=3*(a+1)+14;g=ha+3+7>>3;b=B+3+7>>3;b<=g&&(g=b);if(d+4<=g&&0<=v)for(aa(0+c,3),Ga(),X(d),X(~d),a=0;a<d;a++)ea(n[v+a]);else if(b===g)aa(2+c,3),Ha(S,Y);else{aa(4+c,3);d=N.max_code+1;g=L.max_code+1;a+=1;aa(d-257,5);aa(g-1,5);aa(a-4,4);for(b=0;b<a;b++)aa(V[va[b]].dl,3);Ia(ba,d-1);Ia(ga,g-1);Ha(ba,ga)}Ja();0!==c&&Ga()},Ka=function(g,d,n){var f,e,r;for(f=0;null!==a&&f<n;){e=n-f;e>a.len&&(e=a.len);for(r=0;r<e;r++)g[d+f+r]=a.ptr[a.off+r];a.off+=e;a.len-=e;f+=e;0===a.len&&(e=a,a=a.next,e.next=q,q=e)}if(f===
n)return f;if(c<k){e=n-f;e>k-c&&(e=k-c);for(r=0;r<e;r++)g[d+f+r]=b[c+r];c+=e;f+=e;k===c&&(k=c=0)}return f},La=function(b,d,e){var r;if(!f){if(!H){w=x=0;var h,l;if(0===Y[0].dl){N.dyn_tree=ba;N.static_tree=S;N.extra_bits=ta;N.extra_base=257;N.elems=286;N.max_length=15;N.max_code=0;L.dyn_tree=ga;L.static_tree=Y;L.extra_bits=ma;L.extra_base=0;L.elems=30;L.max_length=15;L.max_code=0;G.dyn_tree=V;G.static_tree=null;G.extra_bits=za;G.extra_base=0;G.elems=19;G.max_length=7;for(l=h=G.max_code=0;28>l;l++)for(ra[l]=
h,r=0;r<1<<ta[l];r++)T[h++]=l;T[h-1]=l;for(l=h=0;16>l;l++)for($[l]=h,r=0;r<1<<ma[l];r++)P[h++]=l;for(h>>=7;30>l;l++)for($[l]=h<<7,r=0;r<1<<ma[l]-7;r++)P[256+h++]=l;for(r=0;15>=r;r++)Q[r]=0;for(r=0;143>=r;)S[r++].dl=8,Q[8]++;for(;255>=r;)S[r++].dl=9,Q[9]++;for(;279>=r;)S[r++].dl=7,Q[7]++;for(;287>=r;)S[r++].dl=8,Q[8]++;Ea(S,287);for(r=0;30>r;r++)Y[r].dl=5,Y[r].fc=Da(r,5);Ja()}for(r=0;8192>r;r++)y[32768+r]=0;ja=wa[E].max_lazy;ka=wa[E].good_length;Z=wa[E].max_chain;v=z=0;R=Aa(n,0,65536);if(0>=R)H=!0,
R=0;else{for(H=!1;262>R&&!H;)ua();for(r=t=0;2>r;r++)t=(t<<5^n[r]&255)&8191}a=null;c=k=0;3>=E?(I=2,C=0):(C=2,A=0);g=!1}f=!0;if(0===R)return g=!0,0}r=Ka(b,d,e);if(r===e)return e;if(g)return r;if(3>=E)for(;0!==R&&null===a;){pa();0!==s&&32506>=z-s&&(C=xa(s),C>R&&(C=R));if(3<=C)if(l=qa(z-M,C-3),R-=C,C<=ja){C--;do z++,pa();while(0!==--C);z++}else z+=C,C=0,t=n[z]&255,t=(t<<5^n[z+1]&255)&8191;else l=qa(0,n[z]&255),R--,z++;l&&(Ba(0),v=z);for(;262>R&&!H;)ua()}else for(;0!==R&&null===a;){pa();I=C;D=M;C=2;0!==
s&&I<ja&&32506>=z-s&&(C=xa(s),C>R&&(C=R),3===C&&4096<z-M&&C--);if(3<=I&&C<=I){l=qa(z-1-D,I-3);R-=I-1;I-=2;do z++,pa();while(0!==--I);A=0;C=2;z++;l&&(Ba(0),v=z)}else 0!==A?qa(0,n[z-1]&255)&&(Ba(0),v=z):A=1,z++,R--;for(;262>R&&!H;)ua()}0===R&&(0!==A&&qa(0,n[z-1]&255),Ba(1),g=!0);return r+Ka(b,r+d,e-r)};this.deflate=function(c,g){var k,e;sa=c;la=0;"undefined"===String(typeof g)&&(g=6);(k=g)?1>k?k=1:9<k&&(k=9):k=6;E=k;H=f=!1;if(null===b){q=a=d=null;b=[];b.length=l;n=[];n.length=65536;r=[];r.length=8192;
u=[];u.length=32832;y=[];y.length=65536;ba=[];ba.length=573;for(k=0;573>k;k++)ba[k]=new h;ga=[];ga.length=61;for(k=0;61>k;k++)ga[k]=new h;S=[];S.length=288;for(k=0;288>k;k++)S[k]=new h;Y=[];Y.length=30;for(k=0;30>k;k++)Y[k]=new h;V=[];V.length=39;for(k=0;39>k;k++)V[k]=new h;N=new m;L=new m;G=new m;Q=[];Q.length=16;O=[];O.length=573;da=[];da.length=573;T=[];T.length=256;P=[];P.length=512;ra=[];ra.length=29;$=[];$.length=30;F=[];F.length=1024}var s=Array(1024),C=[],p=[];for(k=La(s,0,s.length);0<k;){p.length=
k;for(e=0;e<k;e++)p[e]=String.fromCharCode(s[e]);C[C.length]=p.join("");k=La(s,0,s.length)}sa=null;return C.join("")}};
// Input 4
core.ByteArray=function(h){this.pos=0;this.data=h;this.readUInt32LE=function(){this.pos+=4;var h=this.data,e=this.pos;return h[--e]<<24|h[--e]<<16|h[--e]<<8|h[--e]};this.readUInt16LE=function(){this.pos+=2;var h=this.data,e=this.pos;return h[--e]<<8|h[--e]}};
// Input 5
core.ByteArrayWriter=function(h){var m=this,e=new runtime.ByteArray(0);this.appendByteArrayWriter=function(h){e=runtime.concatByteArrays(e,h.getByteArray())};this.appendByteArray=function(h){e=runtime.concatByteArrays(e,h)};this.appendArray=function(h){e=runtime.concatByteArrays(e,runtime.byteArrayFromArray(h))};this.appendUInt16LE=function(e){m.appendArray([e&255,e>>8&255])};this.appendUInt32LE=function(e){m.appendArray([e&255,e>>8&255,e>>16&255,e>>24&255])};this.appendString=function(m){e=runtime.concatByteArrays(e,
runtime.byteArrayFromString(m,h))};this.getLength=function(){return e.length};this.getByteArray=function(){return e}};
// Input 6
core.RawInflate=function(){var h,m,e=null,p,l,q,a,d,f,b,k,c,g,n,r,u,y,x=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],w=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],v=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],t=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],s=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],D=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],A=function(){this.list=this.next=null},C=function(){this.n=this.b=this.e=0;this.t=null},I=function(c,g,b,a,d,n){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var f=Array(this.BMAX+1),k,e,r,s,h,l,m,p=Array(this.BMAX+1),q,M,x,u=new C,t=Array(this.BMAX);s=Array(this.N_MAX);var v,H=Array(this.BMAX+1),z,I,w;w=this.root=null;for(h=0;h<f.length;h++)f[h]=0;for(h=0;h<p.length;h++)p[h]=0;for(h=0;h<t.length;h++)t[h]=null;for(h=0;h<s.length;h++)s[h]=
0;for(h=0;h<H.length;h++)H[h]=0;k=256<g?c[256]:this.BMAX;q=c;M=0;h=g;do f[q[M]]++,M++;while(0<--h);if(f[0]==g)this.root=null,this.status=this.m=0;else{for(l=1;l<=this.BMAX&&0==f[l];l++);m=l;n<l&&(n=l);for(h=this.BMAX;0!=h&&0==f[h];h--);r=h;n>h&&(n=h);for(z=1<<l;l<h;l++,z<<=1)if(0>(z-=f[l])){this.status=2;this.m=n;return}if(0>(z-=f[h]))this.status=2,this.m=n;else{f[h]+=z;H[1]=l=0;q=f;M=1;for(x=2;0<--h;)H[x++]=l+=q[M++];q=c;h=M=0;do 0!=(l=q[M++])&&(s[H[l]++]=h);while(++h<g);g=H[r];H[0]=h=0;q=s;M=0;
s=-1;v=p[0]=0;x=null;for(I=0;m<=r;m++)for(c=f[m];0<c--;){for(;m>v+p[1+s];){v+=p[1+s];s++;I=(I=r-v)>n?n:I;if((e=1<<(l=m-v))>c+1)for(e-=c+1,x=m;++l<I&&!((e<<=1)<=f[++x]);)e-=f[x];v+l>k&&v<k&&(l=k-v);I=1<<l;p[1+s]=l;x=Array(I);for(e=0;e<I;e++)x[e]=new C;w=null==w?this.root=new A:w.next=new A;w.next=null;w.list=x;t[s]=x;0<s&&(H[s]=h,u.b=p[s],u.e=16+l,u.t=x,l=(h&(1<<v)-1)>>v-p[s],t[s-1][l].e=u.e,t[s-1][l].b=u.b,t[s-1][l].n=u.n,t[s-1][l].t=u.t)}u.b=m-v;M>=g?u.e=99:q[M]<b?(u.e=256>q[M]?16:15,u.n=q[M++]):
(u.e=d[q[M]-b],u.n=a[q[M++]-b]);e=1<<m-v;for(l=h>>v;l<I;l+=e)x[l].e=u.e,x[l].b=u.b,x[l].n=u.n,x[l].t=u.t;for(l=1<<m-1;0!=(h&l);l>>=1)h^=l;for(h^=l;(h&(1<<v)-1)!=H[s];)v-=p[s],s--}this.m=p[1];this.status=0!=z&&1!=r?1:0}}},z=function(c){for(;a<c;){var g=q,b;b=u.length==y?-1:u[y++];q=g|b<<a;a+=8}},M=function(c){return q&x[c]},H=function(c){q>>=c;a-=c},R=function(a,f,e){var l,s,C;if(0==e)return 0;for(C=0;;){z(n);s=c.list[M(n)];for(l=s.e;16<l;){if(99==l)return-1;H(s.b);l-=16;z(l);s=s.t[M(l)];l=s.e}H(s.b);
if(16==l)m&=32767,a[f+C++]=h[m++]=s.n;else{if(15==l)break;z(l);b=s.n+M(l);H(l);z(r);s=g.list[M(r)];for(l=s.e;16<l;){if(99==l)return-1;H(s.b);l-=16;z(l);s=s.t[M(l)];l=s.e}H(s.b);z(l);k=m-s.n-M(l);for(H(l);0<b&&C<e;)b--,k&=32767,m&=32767,a[f+C++]=h[m++]=h[k++]}if(C==e)return e}d=-1;return C},Z,ja=function(b,a,d){var f,k,e,l,h,C,m,p=Array(316);for(f=0;f<p.length;f++)p[f]=0;z(5);C=257+M(5);H(5);z(5);m=1+M(5);H(5);z(4);f=4+M(4);H(4);if(286<C||30<m)return-1;for(k=0;k<f;k++)z(3),p[D[k]]=M(3),H(3);for(;19>
k;k++)p[D[k]]=0;n=7;k=new I(p,19,19,null,null,n);if(0!=k.status)return-1;c=k.root;n=k.m;l=C+m;for(f=e=0;f<l;)if(z(n),h=c.list[M(n)],k=h.b,H(k),k=h.n,16>k)p[f++]=e=k;else if(16==k){z(2);k=3+M(2);H(2);if(f+k>l)return-1;for(;0<k--;)p[f++]=e}else{17==k?(z(3),k=3+M(3),H(3)):(z(7),k=11+M(7),H(7));if(f+k>l)return-1;for(;0<k--;)p[f++]=0;e=0}n=9;k=new I(p,C,257,w,v,n);0==n&&(k.status=1);if(0!=k.status)return-1;c=k.root;n=k.m;for(f=0;f<m;f++)p[f]=p[f+C];r=6;k=new I(p,m,0,t,s,r);g=k.root;r=k.m;return 0==r&&
257<C||0!=k.status?-1:R(b,a,d)};this.inflate=function(C,x){null==h&&(h=Array(65536));a=q=m=0;d=-1;f=!1;b=k=0;c=null;u=C;y=0;var A=new runtime.ByteArray(x);a:{var D,S;for(D=0;D<x&&(!f||-1!=d);){if(0<b){if(0!=d)for(;0<b&&D<x;)b--,k&=32767,m&=32767,A[0+D++]=h[m++]=h[k++];else{for(;0<b&&D<x;)b--,m&=32767,z(8),A[0+D++]=h[m++]=M(8),H(8);0==b&&(d=-1)}if(D==x)break}if(-1==d){if(f)break;z(1);0!=M(1)&&(f=!0);H(1);z(2);d=M(2);H(2);c=null;b=0}switch(d){case 0:S=A;var Y=0+D,V=x-D,N=void 0,N=a&7;H(N);z(16);N=M(16);
H(16);z(16);if(N!=(~q&65535))S=-1;else{H(16);b=N;for(N=0;0<b&&N<V;)b--,m&=32767,z(8),S[Y+N++]=h[m++]=M(8),H(8);0==b&&(d=-1);S=N}break;case 1:if(null!=c)S=R(A,0+D,x-D);else b:{S=A;Y=0+D;V=x-D;if(null==e){for(var L=void 0,N=Array(288),L=void 0,L=0;144>L;L++)N[L]=8;for(;256>L;L++)N[L]=9;for(;280>L;L++)N[L]=7;for(;288>L;L++)N[L]=8;l=7;L=new I(N,288,257,w,v,l);if(0!=L.status){alert("HufBuild error: "+L.status);S=-1;break b}e=L.root;l=L.m;for(L=0;30>L;L++)N[L]=5;Z=5;L=new I(N,30,0,t,s,Z);if(1<L.status){e=
null;alert("HufBuild error: "+L.status);S=-1;break b}p=L.root;Z=L.m}c=e;g=p;n=l;r=Z;S=R(S,Y,V)}break;case 2:S=null!=c?R(A,0+D,x-D):ja(A,0+D,x-D);break;default:S=-1}if(-1==S)break a;D+=S}}u=null;return A}};
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
core.LoopWatchDog=function(h,m){var e=Date.now(),p=0;this.check=function(){var l;if(h&&(l=Date.now(),l-e>h))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<m&&(p+=1,p>m))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){function h(m,e){e&&Array.isArray(e)?m=(m||[]).concat(e.map(function(e){return h({},e)})):e&&"object"===typeof e?(m=m||{},Object.keys(e).forEach(function(p){m[p]=h(m[p],e[p])})):m=e;return m}this.hashString=function(h){var e=0,p,l;p=0;for(l=h.length;p<l;p+=1)e=(e<<5)-e+h.charCodeAt(p),e|=0;return e};this.mergeObjects=h};
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
(function(){function h(e){var h,l,q,a;void 0===m&&(a=e.createElement("div"),a.style.position="absolute",a.style.left="-99999px",a.style.transform="scale(2)",a.style["-webkit-transform"]="scale(2)",q=e.createElement("div"),q.style.width="10px",q.style.height="10px",a.appendChild(q),e.body.appendChild(a),h=q.ownerDocument.createRange(),l=q.getBoundingClientRect(),h.selectNode(q),q=h.getBoundingClientRect(),m=l.height!==q.height,h.detach(),e.body.removeChild(a));return m}var m;core.DomUtils=function(){function e(a,
f){var b=null;a.nodeType===Node.TEXT_NODE&&(0===a.length?(a.parentNode.removeChild(a),f.nodeType===Node.TEXT_NODE&&(b=f)):(f.nodeType===Node.TEXT_NODE&&(a.appendData(f.data),f.parentNode.removeChild(f)),b=a));return b}function m(a){for(var f=a.parentNode;a.firstChild;)f.insertBefore(a.firstChild,a);f.removeChild(a);return f}function l(a,f){for(var b=a.parentNode,k=a.firstChild,c;k;)c=k.nextSibling,l(k,f),k=c;f(a)&&(b=m(a));return b}function q(a,f){for(var b=0,k;a.parentNode!==f;)runtime.assert(null!==
a.parentNode,"parent is null"),a=a.parentNode;for(k=f.firstChild;k!==a;)b+=1,k=k.nextSibling;return b}function a(a,f){return a===f||Boolean(a.compareDocumentPosition(f)&Node.DOCUMENT_POSITION_CONTAINED_BY)}this.splitBoundaries=function(a){var f=[],b;if(a.startContainer.nodeType===Node.TEXT_NODE||a.endContainer.nodeType===Node.TEXT_NODE){b=a.endContainer;var k=a.endOffset;if(k<b.childNodes.length)for(b=b.childNodes[k],k=0;b.firstChild;)b=b.firstChild;else for(;b.lastChild;)b=b.lastChild,k=b.nodeType===
Node.TEXT_NODE?b.textContent.length:b.childNodes.length;a.setEnd(b,k);0!==a.endOffset&&a.endContainer.nodeType===Node.TEXT_NODE&&a.endOffset!==a.endContainer.length&&(f.push(a.endContainer.splitText(a.endOffset)),f.push(a.endContainer));0!==a.startOffset&&a.startContainer.nodeType===Node.TEXT_NODE&&a.startOffset!==a.startContainer.length&&(b=a.startContainer.splitText(a.startOffset),f.push(a.startContainer),f.push(b),a.setStart(b,0))}return f};this.containsRange=function(a,f){return 0>=a.compareBoundaryPoints(a.START_TO_START,
f)&&0<=a.compareBoundaryPoints(a.END_TO_END,f)};this.rangesIntersect=function(a,f){return 0>=a.compareBoundaryPoints(a.END_TO_START,f)&&0<=a.compareBoundaryPoints(a.START_TO_END,f)};this.getNodesInRange=function(a,f){var b=[],k,c,g=a.startContainer.ownerDocument.createTreeWalker(a.commonAncestorContainer,NodeFilter.SHOW_ALL,f,!1);for(k=g.currentNode=a.startContainer;k;){c=f(k);if(c===NodeFilter.FILTER_ACCEPT)b.push(k);else if(c===NodeFilter.FILTER_REJECT)break;k=k.parentNode}b.reverse();for(k=g.nextNode();k;)b.push(k),
k=g.nextNode();return b};this.normalizeTextNodes=function(a){a&&a.nextSibling&&(a=e(a,a.nextSibling));a&&a.previousSibling&&e(a.previousSibling,a)};this.rangeContainsNode=function(a,f){var b=f.ownerDocument.createRange(),k=f.nodeType===Node.TEXT_NODE?f.length:f.childNodes.length;b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset);k=0===b.comparePoint(f,0)&&0===b.comparePoint(f,k);b.detach();return k};this.mergeIntoParent=m;this.removeUnwantedNodes=l;this.getElementsByTagNameNS=
function(a,f,b){return Array.prototype.slice.call(a.getElementsByTagNameNS(f,b))};this.rangeIntersectsNode=function(a,f){var b=f.nodeType===Node.TEXT_NODE?f.length:f.childNodes.length;return 0>=a.comparePoint(f,0)&&0<=a.comparePoint(f,b)};this.containsNode=function(a,f){return a===f||a.contains(f)};this.comparePoints=function(a,f,b,k){if(a===b)return k-f;var c=a.compareDocumentPosition(b);2===c?c=-1:4===c?c=1:10===c?(f=q(a,b),c=f<k?1:-1):(k=q(b,a),c=k<f?-1:1);return c};this.areRangeRectanglesTransformed=
function(a){return!h(a)};this.adaptRangeDifferenceToZoomLevel=function(a,f){var b=runtime.getWindow();return(b=b&&b.document)&&h(b)?a:a/f};(function(d){var f=runtime.getWindow(),b;null!==f&&(b=f.navigator.appVersion.toLowerCase(),f=-1===b.indexOf("chrome")&&(-1!==b.indexOf("applewebkit")||-1!==b.indexOf("safari")),b=b.indexOf("msie"),f||b)&&(d.containsNode=a)})(this)};return core.DomUtils})();
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(h,m){function e(c){c.parentNode&&(d.push(c.previousSibling),d.push(c.nextSibling),c.parentNode.removeChild(c))}function p(c,a,b){if(a.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(a),"putCursorIntoTextNode: invalid container");var f=a.parentNode;runtime.assert(Boolean(f),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=a.length,"putCursorIntoTextNode: offset is out of bounds");0===b?f.insertBefore(c,a):(b!==a.length&&a.splitText(b),f.insertBefore(c,
a.nextSibling))}else a.nodeType===Node.ELEMENT_NODE&&a.insertBefore(c,a.childNodes[b]);d.push(c.previousSibling);d.push(c.nextSibling)}var l=h.createElementNS("urn:webodf:names:cursor","cursor"),q=h.createElementNS("urn:webodf:names:cursor","anchor"),a,d=[],f,b,k=new core.DomUtils;this.getNode=function(){return l};this.getAnchorNode=function(){return q.parentNode?q:l};this.getSelectedRange=function(){b?(f.setStartBefore(l),f.collapse(!0)):(f.setStartAfter(a?q:l),f.setEndBefore(a?l:q));return f};this.setSelectedRange=
function(c,g){f&&f!==c&&f.detach();f=c;a=!1!==g;(b=c.collapsed)?(e(q),e(l),p(l,c.startContainer,c.startOffset)):(e(q),e(l),p(a?l:q,c.endContainer,c.endOffset),p(a?q:l,c.startContainer,c.startOffset));d.forEach(k.normalizeTextNodes);d.length=0};this.hasForwardSelection=function(){return a};this.remove=function(){e(l);d.forEach(k.normalizeTextNodes);d.length=0};l.setAttributeNS("urn:webodf:names:cursor","memberId",m);q.setAttributeNS("urn:webodf:names:cursor","memberId",m)};
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
core.EventNotifier=function(h){var m={};this.emit=function(e,h){var l,q;runtime.assert(m.hasOwnProperty(e),'unknown event fired "'+e+'"');q=m[e];for(l=0;l<q.length;l+=1)q[l](h)};this.subscribe=function(e,h){runtime.assert(m.hasOwnProperty(e),'tried to subscribe to unknown event "'+e+'"');m[e].push(h);runtime.log('event "'+e+'" subscribed.')};this.unsubscribe=function(e,h){var l;runtime.assert(m.hasOwnProperty(e),'tried to unsubscribe from unknown event "'+e+'"');l=m[e].indexOf(h);runtime.assert(-1!==
l,'tried to unsubscribe unknown callback from event "'+e+'"');-1!==l&&m[e].splice(l,1);runtime.log('event "'+e+'" unsubscribed.')};(function(){var e;for(e=0;e<h.length;e+=1)m[h[e]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var h=runtime.getWindow().document,m=h.getElementById("testarea");runtime.assert(!m,'Unclean test environment, found a div with id "testarea".');m=h.createElement("div");m.setAttribute("id","testarea");h.body.appendChild(m);return m};
core.UnitTest.cleanupTestAreaDiv=function(){var h=runtime.getWindow().document,m=h.getElementById("testarea");runtime.assert(!!m&&m.parentNode===h.body,'Test environment broken, found no div with id "testarea" below body.');h.body.removeChild(m)};core.UnitTest.createOdtDocument=function(h,m){var e="<?xml version='1.0' encoding='UTF-8'?>",e=e+"<office:document";Object.keys(m).forEach(function(h){e+=" xmlns:"+h+'="'+m[h]+'"'});e+=">";e+=h;e+="</office:document>";return runtime.parseXML(e)};
core.UnitTestRunner=function(){function h(f){a+=1;runtime.log("fail",f)}function m(a,b){var d;try{if(a.length!==b.length)return h("array of length "+a.length+" should be "+b.length+" long"),!1;for(d=0;d<a.length;d+=1)if(a[d]!==b[d])return h(a[d]+" should be "+b[d]+" at array index "+d),!1}catch(c){return!1}return!0}function e(a,b,d){var c=a.attributes,g=c.length,n,r,l;for(n=0;n<g;n+=1)if(r=c.item(n),"xmlns"!==r.prefix&&"urn:webodf:names:steps"!==r.namespaceURI){l=b.getAttributeNS(r.namespaceURI,r.localName);
if(!b.hasAttributeNS(r.namespaceURI,r.localName))return h("Attribute "+r.localName+" with value "+r.value+" was not present"),!1;if(l!==r.value)return h("Attribute "+r.localName+" was "+l+" should be "+r.value),!1}return d?!0:e(b,a,!0)}function p(a,b){if(a.nodeType!==b.nodeType)return h("Nodetype '"+a.nodeType+"' should be '"+b.nodeType+"'"),!1;if(a.nodeType===Node.TEXT_NODE){if(a.data===b.data)return!0;h("Textnode data '"+a.data+"' should be '"+b.data+"'");return!1}runtime.assert(a.nodeType===Node.ELEMENT_NODE,
"Only textnodes and elements supported.");if(a.namespaceURI!==b.namespaceURI)return h("namespace '"+a.namespaceURI+"' should be '"+b.namespaceURI+"'"),!1;if(a.localName!==b.localName)return h("localName '"+a.localName+"' should be '"+b.localName+"'"),!1;if(!e(a,b,!1))return!1;for(var d=a.firstChild,c=b.firstChild;d;){if(!c)return h("Nodetype '"+d.nodeType+"' is unexpected here."),!1;if(!p(d,c))return!1;d=d.nextSibling;c=c.nextSibling}return c?(h("Nodetype '"+c.nodeType+"' is missing here."),!1):!0}
function l(a,b){return 0===b?a===b&&1/a===1/b:a===b?!0:"number"===typeof b&&isNaN(b)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(b)===Object.prototype.toString.call([])?m(a,b):"object"===typeof b&&"object"===typeof a?b.constructor===Element||b.constructor===Node?p(b,a):d(b,a):!1}function q(a,b,d){"string"===typeof b&&"string"===typeof d||runtime.log("WARN: shouldBe() expects string arguments");var c,g;try{g=eval(b)}catch(n){c=n}a=eval(d);c?h(b+" should be "+a+". Threw exception "+
c):l(g,a)?runtime.log("pass",b+" is "+d):String(typeof g)===String(typeof a)?(d=0===g&&0>1/g?"-0":String(g),h(b+" should be "+a+". Was "+d+".")):h(b+" should be "+a+" (of type "+typeof a+"). Was "+g+" (of type "+typeof g+").")}var a=0,d;d=function(a,b){var d=Object.keys(a),c=Object.keys(b);d.sort();c.sort();return m(d,c)&&Object.keys(a).every(function(c){var d=a[c],k=b[c];return l(d,k)?!0:(h(d+" should be "+k+" for key "+c),!1)})};this.areNodesEqual=p;this.shouldBeNull=function(a,b){q(a,b,"null")};
this.shouldBeNonNull=function(a,b){var d,c;try{c=eval(b)}catch(g){d=g}d?h(b+" should be non-null. Threw exception "+d):null!==c?runtime.log("pass",b+" is non-null."):h(b+" should be non-null. Was "+c)};this.shouldBe=q;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function h(e,h){return"<span style='color:blue;cursor:pointer' onclick='"+h+"'>"+e+"</span>"}var m=0,e={};this.runTests=function(p,l,q){function a(c){if(0===c.length)e[d]=k,m+=f.countFailedTests(),l();else{g=c[0];var n=Runtime.getFunctionName(g);runtime.log("Running "+n);r=f.countFailedTests();b.setUp();g(function(){b.tearDown();k[n]=r===f.countFailedTests();a(c.slice(1))})}}var d=Runtime.getFunctionName(p),f=new core.UnitTestRunner,b=new p(f),k={},c,g,n,r,u="BrowserRuntime"===
runtime.type();if(e.hasOwnProperty(d))runtime.log("Test "+d+" has already run.");else{u?runtime.log("<span>Running "+h(d,'runSuite("'+d+'");')+": "+b.description()+"</span>"):runtime.log("Running "+d+": "+b.description);n=b.tests();for(c=0;c<n.length;c+=1)g=n[c],p=Runtime.getFunctionName(g)||g.testName,q.length&&-1===q.indexOf(p)||(u?runtime.log("<span>Running "+h(p,'runTest("'+d+'","'+p+'")')+"</span>"):runtime.log("Running "+p),r=f.countFailedTests(),b.setUp(),g(),b.tearDown(),k[p]=r===f.countFailedTests());
a(b.asyncTests())}};this.countFailedTests=function(){return m};this.results=function(){return e}};
// Input 13
core.PositionIterator=function(h,m,e,p){function l(){this.acceptNode=function(c){return c.nodeType===Node.TEXT_NODE&&0===c.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function q(c){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:c.acceptNode(a)}}function a(){var c=b.currentNode.nodeType;k=c===Node.TEXT_NODE?b.currentNode.length-1:c===Node.ELEMENT_NODE?1:0}function d(){if(null===b.previousSibling()){if(!b.parentNode()||b.currentNode===
h)return b.firstChild(),!1;k=0}else a();return!0}var f=this,b,k,c;this.nextPosition=function(){if(b.currentNode===h)return!1;if(0===k&&b.currentNode.nodeType===Node.ELEMENT_NODE)null===b.firstChild()&&(k=1);else if(b.currentNode.nodeType===Node.TEXT_NODE&&k+1<b.currentNode.length)k+=1;else if(null!==b.nextSibling())k=0;else if(b.parentNode())k=1;else return!1;return!0};this.previousPosition=function(){var c=!0;0===k?c=d():b.currentNode.nodeType===Node.TEXT_NODE?k-=1:null!==b.lastChild()?a():b.currentNode===
h?c=!1:k=0;return c};this.previousNode=d;this.container=function(){var c=b.currentNode,a=c.nodeType;return 0===k&&a!==Node.TEXT_NODE?c.parentNode:c};this.rightNode=function(){var a=b.currentNode,d=a.nodeType;if(d===Node.TEXT_NODE&&k===a.length)for(a=a.nextSibling;a&&1!==c(a);)a=a.nextSibling;else d===Node.ELEMENT_NODE&&1===k&&(a=null);return a};this.leftNode=function(){var a=b.currentNode;if(0===k)for(a=a.previousSibling;a&&1!==c(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=
a.lastChild;a&&1!==c(a);)a=a.previousSibling;return a};this.getCurrentNode=function(){return b.currentNode};this.unfilteredDomOffset=function(){if(b.currentNode.nodeType===Node.TEXT_NODE)return k;for(var c=0,a=b.currentNode,a=1===k?a.lastChild:a.previousSibling;a;)c+=1,a=a.previousSibling;return c};this.getPreviousSibling=function(){var c=b.currentNode,a=b.previousSibling();b.currentNode=c;return a};this.getNextSibling=function(){var c=b.currentNode,a=b.nextSibling();b.currentNode=c;return a};this.setUnfilteredPosition=
function(a,d){var e,l;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");b.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return k=d,runtime.assert(d<=a.length,"Error in setPosition: "+d+" > "+a.length),runtime.assert(0<=d,"Error in setPosition: "+d+" < 0"),d===a.length&&(k=void 0,b.nextSibling()?k=0:b.parentNode()&&(k=1),runtime.assert(void 0!==k,"Error in setPosition: position not valid.")),!0;e=c(a);for(l=a.parentNode;l&&l!==h&&e===NodeFilter.FILTER_ACCEPT;)e=
c(l),e!==NodeFilter.FILTER_ACCEPT&&(b.currentNode=l),l=l.parentNode;d<a.childNodes.length&&e!==NodeFilter.FILTER_REJECT?(b.currentNode=a.childNodes[d],e=c(b.currentNode),k=0):k=1;e===NodeFilter.FILTER_REJECT&&(k=1);if(e!==NodeFilter.FILTER_ACCEPT)return f.nextPosition();runtime.assert(c(b.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");return!0};this.moveToEnd=function(){b.currentNode=h;k=1};this.moveToEndOfNode=function(c){c.nodeType===
Node.TEXT_NODE?f.setUnfilteredPosition(c,c.length):(b.currentNode=c,k=1)};this.getNodeFilter=function(){return c};c=(e?new q(e):new l).acceptNode;c.acceptNode=c;b=h.ownerDocument.createTreeWalker(h,m||4294967295,c,p);k=0;null===b.firstChild()&&(k=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(h){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var h={},m=core.PositionFilter.FilterResult.FILTER_ACCEPT,e=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(p){for(var l in h)if(h.hasOwnProperty(l)&&h[l].acceptPosition(p)===e)return e;return m};this.addFilter=function(e,l){h[e]=l};this.removeFilter=function(e){delete h[e]}};
// Input 16
core.ScheduledTask=function(h,m){function e(){h();q=!1}function p(){q&&(runtime.clearTimeout(l),q=!1)}var l,q=!1;this.trigger=function(){q||(l=runtime.setTimeout(e,m))};this.triggerImmediate=function(){p();e()};this.processRequests=function(){q&&(p(),e())};this.cancel=p;this.destroy=function(a){p();a()}};
// Input 17
core.Async=function(){this.forEach=function(h,m,e){function p(d){a!==q&&(d?(a=q,e(d)):(a+=1,a===q&&e(null)))}var l,q=h.length,a=0;for(l=0;l<q;l+=1)m(h[l],p)};this.destroyAll=function(h,m){function e(p,l){if(l)m(l);else if(p<h.length)h[p](function(h){e(p+1,h)});else m()}e(0,void 0)}};
// Input 18
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(h,m){function e(c){var a=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,g,d=c.length,n=0,n=0;b=-1;for(g=0;g<d;g+=1)n=(b^c[g])&255,n=a[n],b=b>>>8^n;return b^-1}function p(c){return new Date((c>>25&127)+1980,(c>>21&15)-1,c>>16&31,c>>11&15,c>>5&63,(c&31)<<1)}function l(c){var a=c.getFullYear();return 1980>a?0:a-1980<<
25|c.getMonth()+1<<21|c.getDate()<<16|c.getHours()<<11|c.getMinutes()<<5|c.getSeconds()>>1}function q(c,a){var b,g,d,n,f,k,e,h=this;this.load=function(a){if(void 0!==h.data)a(null,h.data);else{var b=f+34+g+d+256;b+e>r&&(b=r-e);runtime.read(c,e,b,function(b,g){if(b||null===g)a(b,g);else a:{var d=g,e=new core.ByteArray(d),r=e.readUInt32LE(),l;if(67324752!==r)a("File entry signature is wrong."+r.toString()+" "+d.length.toString(),null);else{e.pos+=22;r=e.readUInt16LE();l=e.readUInt16LE();e.pos+=r+l;
if(n){d=d.slice(e.pos,e.pos+f);if(f!==d.length){a("The amount of compressed bytes read was "+d.length.toString()+" instead of "+f.toString()+" for "+h.filename+" in "+c+".",null);break a}d=y(d,k)}else d=d.slice(e.pos,e.pos+k);k!==d.length?a("The amount of bytes read was "+d.length.toString()+" instead of "+k.toString()+" for "+h.filename+" in "+c+".",null):(h.data=d,a(null,d))}}})}};this.set=function(c,a,b,g){h.filename=c;h.data=a;h.compressed=b;h.date=g};this.error=null;a&&(b=a.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(a.pos-4).toString()+' for file "'+c+'": '+a.data.length.toString():(a.pos+=6,n=a.readUInt16LE(),this.date=p(a.readUInt32LE()),a.readUInt32LE(),f=a.readUInt32LE(),k=a.readUInt32LE(),g=a.readUInt16LE(),d=a.readUInt16LE(),b=a.readUInt16LE(),a.pos+=8,e=a.readUInt32LE(),this.filename=runtime.byteArrayToString(a.data.slice(a.pos,a.pos+g),"utf8"),a.pos+=g+d+b))}function a(c,a){if(22!==c.length)a("Central directory length should be 22.",
x);else{var b=new core.ByteArray(c),g;g=b.readUInt32LE();101010256!==g?a("Central directory signature is wrong: "+g.toString(),x):(g=b.readUInt16LE(),0!==g?a("Zip files with non-zero disk numbers are not supported.",x):(g=b.readUInt16LE(),0!==g?a("Zip files with non-zero disk numbers are not supported.",x):(g=b.readUInt16LE(),u=b.readUInt16LE(),g!==u?a("Number of entries is inconsistent.",x):(g=b.readUInt32LE(),b=b.readUInt16LE(),b=r-22-g,runtime.read(h,b,r-b,function(c,b){if(c||null===b)a(c,x);else a:{var g=
new core.ByteArray(b),d,f;n=[];for(d=0;d<u;d+=1){f=new q(h,g);if(f.error){a(f.error,x);break a}n[n.length]=f}a(null,x)}})))))}}function d(c,a){var b=null,g,d;for(d=0;d<n.length;d+=1)if(g=n[d],g.filename===c){b=g;break}b?b.data?a(null,b.data):b.load(a):a(c+" not found.",null)}function f(c){var a=new core.ByteArrayWriter("utf8"),b=0;a.appendArray([80,75,3,4,20,0,0,0,0,0]);c.data&&(b=c.data.length);a.appendUInt32LE(l(c.date));a.appendUInt32LE(e(c.data));a.appendUInt32LE(b);a.appendUInt32LE(b);a.appendUInt16LE(c.filename.length);
a.appendUInt16LE(0);a.appendString(c.filename);c.data&&a.appendByteArray(c.data);return a}function b(c,a){var b=new core.ByteArrayWriter("utf8"),g=0;b.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);c.data&&(g=c.data.length);b.appendUInt32LE(l(c.date));b.appendUInt32LE(e(c.data));b.appendUInt32LE(g);b.appendUInt32LE(g);b.appendUInt16LE(c.filename.length);b.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);b.appendUInt32LE(a);b.appendString(c.filename);return b}function k(c,a){if(c===n.length)a(null);else{var b=n[c];
void 0!==b.data?k(c+1,a):b.load(function(b){b?a(b):k(c+1,a)})}}function c(c,a){k(0,function(g){if(g)a(g);else{g=new core.ByteArrayWriter("utf8");var d,k,e,r=[0];for(d=0;d<n.length;d+=1)g.appendByteArrayWriter(f(n[d])),r.push(g.getLength());e=g.getLength();for(d=0;d<n.length;d+=1)k=n[d],g.appendByteArrayWriter(b(k,r[d]));d=g.getLength()-e;g.appendArray([80,75,5,6,0,0,0,0]);g.appendUInt16LE(n.length);g.appendUInt16LE(n.length);g.appendUInt32LE(d);g.appendUInt32LE(e);g.appendArray([0,0]);c(g.getByteArray())}})}
function g(a,b){c(function(c){runtime.writeFile(a,c,b)},b)}var n,r,u,y=(new core.RawInflate).inflate,x=this,w=new core.Base64;this.load=d;this.save=function(c,a,b,g){var d,f;for(d=0;d<n.length;d+=1)if(f=n[d],f.filename===c){f.set(c,a,b,g);return}f=new q(h);f.set(c,a,b,g);n.push(f)};this.remove=function(c){var a,b;for(a=0;a<n.length;a+=1)if(b=n[a],b.filename===c)return n.splice(a,1),!0;return!1};this.write=function(c){g(h,c)};this.writeAs=g;this.createByteArray=c;this.loadContentXmlAsFragments=function(c,
a){x.loadAsString(c,function(c,b){if(c)return a.rootElementReady(c);a.rootElementReady(null,b,!0)})};this.loadAsString=function(c,a){d(c,function(c,b){if(c||null===b)return a(c,null);var g=runtime.byteArrayToString(b,"utf8");a(null,g)})};this.loadAsDOM=function(c,a){x.loadAsString(c,function(c,b){if(c||null===b)a(c,null);else{var g=(new DOMParser).parseFromString(b,"text/xml");a(null,g)}})};this.loadAsDataURL=function(c,a,b){d(c,function(c,g){if(c)return b(c,null);var d=0,n;a||(a=80===g[1]&&78===
g[2]&&71===g[3]?"image/png":255===g[0]&&216===g[1]&&255===g[2]?"image/jpeg":71===g[0]&&73===g[1]&&70===g[2]?"image/gif":"");for(n="data:"+a+";base64,";d<g.length;)n+=w.convertUTF8ArrayToBase64(g.slice(d,Math.min(d+45E3,g.length))),d+=45E3;b(null,n)})};this.getEntries=function(){return n.slice()};r=-1;null===m?n=[]:runtime.getFileSize(h,function(c){r=c;0>r?m("File '"+h+"' cannot be read.",x):runtime.read(h,r-22,22,function(c,b){c||null===m||null===b?m(c,x):a(b,m)})})};
// Input 19
core.CSSUnits=function(){var h={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(m,e,p){return m*h[p]/h[e]};this.convertMeasure=function(h,e){var p,l;h&&e?(p=parseFloat(h),l=h.replace(p.toString(),""),p=this.convert(p,l,e)):p="";return p.toString()};this.getUnits=function(h){return h.substr(h.length-2,h.length)}};
// Input 20
xmldom.LSSerializerFilter=function(){};
// Input 21
"function"!==typeof Object.create&&(Object.create=function(h){var m=function(){};m.prototype=h;return new m});
xmldom.LSSerializer=function(){function h(e){var h=e||{},a=function(a){var c={},b;for(b in a)a.hasOwnProperty(b)&&(c[a[b]]=b);return c}(e),d=[h],f=[a],b=0;this.push=function(){b+=1;h=d[b]=Object.create(h);a=f[b]=Object.create(a)};this.pop=function(){d[b]=void 0;f[b]=void 0;b-=1;h=d[b];a=f[b]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(b){var c=b.namespaceURI,g=0,d;if(!c)return b.localName;if(d=a[c])return d+":"+b.localName;do{d||!b.prefix?(d="ns"+g,g+=1):d=b.prefix;
if(h[d]===c)break;if(!h[d]){h[d]=c;a[c]=d;break}d=null}while(null===d);return d+":"+b.localName}}function m(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function e(h,q){var a="",d=p.filter?p.filter.acceptNode(q):NodeFilter.FILTER_ACCEPT,f;if(d===NodeFilter.FILTER_ACCEPT&&q.nodeType===Node.ELEMENT_NODE){h.push();f=h.getQName(q);var b,k=q.attributes,c,g,n,r="",u;b="<"+f;c=k.length;for(g=0;g<c;g+=1)n=k.item(g),"http://www.w3.org/2000/xmlns/"!==
n.namespaceURI&&(u=p.filter?p.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,u===NodeFilter.FILTER_ACCEPT&&(u=h.getQName(n),n="string"===typeof n.value?m(n.value):n.value,r+=" "+(u+'="'+n+'"')));c=h.getLocalNamespaceDefinitions();for(g in c)c.hasOwnProperty(g)&&((k=c[g])?"xmlns"!==k&&(b+=" xmlns:"+c[g]+'="'+g+'"'):b+=' xmlns="'+g+'"');a+=b+(r+">")}if(d===NodeFilter.FILTER_ACCEPT||d===NodeFilter.FILTER_SKIP){for(d=q.firstChild;d;)a+=e(h,d),d=d.nextSibling;q.nodeValue&&(a+=m(q.nodeValue))}f&&(a+="</"+
f+">",h.pop());return a}var p=this;this.filter=null;this.writeToString=function(l,m){if(!l)return"";var a=new h(m);return e(a,l)}};
// Input 22
xmldom.RelaxNGParser=function(){function h(a,d){this.message=function(){d&&(a+=1===d.nodeType?" Element ":" Node ",a+=d.nodeName,d.nodeValue&&(a+=" with value '"+d.nodeValue+"'"),a+=".");return a}}function m(a){if(2>=a.e.length)return a;var d={name:a.name,e:a.e.slice(0,2)};return m({name:a.name,e:[d].concat(a.e.slice(2))})}function e(a){a=a.split(":",2);var f="",c;1===a.length?a=["",a[0]]:f=a[0];for(c in d)d[c]===f&&(a[0]=c);return a}function p(a,d){for(var c=0,g,f,h=a.name;a.e&&c<a.e.length;)if(g=
a.e[c],"ref"===g.name){f=d[g.a.name];if(!f)throw g.a.name+" was not defined.";g=a.e.slice(c+1);a.e=a.e.slice(0,c);a.e=a.e.concat(f.e);a.e=a.e.concat(g)}else c+=1,p(g,d);g=a.e;"choice"!==h||g&&g[1]&&"empty"!==g[1].name||(g&&g[0]&&"empty"!==g[0].name?(g[1]=g[0],g[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===h||"interleave"===h)"empty"===g[0].name?"empty"===g[1].name?(delete a.e,a.name="empty"):(h=a.name=g[1].name,a.names=g[1].names,g=a.e=g[1].e):"empty"===g[1].name&&(h=a.name=g[0].name,
a.names=g[0].names,g=a.e=g[0].e);"oneOrMore"===h&&"empty"===g[0].name&&(delete a.e,a.name="empty");if("attribute"===h){f=a.names?a.names.length:0;for(var l,m=[],q=[],c=0;c<f;c+=1)l=e(a.names[c]),q[c]=l[0],m[c]=l[1];a.localnames=m;a.namespaces=q}"interleave"===h&&("interleave"===g[0].name?a.e="interleave"===g[1].name?g[0].e.concat(g[1].e):[g[1]].concat(g[0].e):"interleave"===g[1].name&&(a.e=[g[0]].concat(g[1].e)))}function l(a,d){for(var c=0,g;a.e&&c<a.e.length;)g=a.e[c],"elementref"===g.name?(g.id=
g.id||0,a.e[c]=d[g.id]):"element"!==g.name&&l(g,d),c+=1}var q=this,a,d={"http://www.w3.org/XML/1998/namespace":"xml"},f;f=function(a,k,c){var g=[],n,h,l=a.localName,p=[];n=a.attributes;var q=l,w=p,v={},t,s;for(t=0;t<n.length;t+=1)if(s=n.item(t),s.namespaceURI)"http://www.w3.org/2000/xmlns/"===s.namespaceURI&&(d[s.value]=s.localName);else{"name"!==s.localName||"element"!==q&&"attribute"!==q||w.push(s.value);if("name"===s.localName||"combine"===s.localName||"type"===s.localName){var D=s,A;A=s.value;
A=A.replace(/^\s\s*/,"");for(var C=/\s/,I=A.length-1;C.test(A.charAt(I));)I-=1;A=A.slice(0,I+1);D.value=A}v[s.localName]=s.value}n=v;n.combine=n.combine||void 0;a=a.firstChild;q=g;w=p;for(v="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(t=f(a,k,q))"name"===t.name?w.push(d[t.a.ns]+":"+t.text):"choice"===t.name&&t.names&&t.names.length&&(w=w.concat(t.names),delete t.names),q.push(t)}else a.nodeType===Node.TEXT_NODE&&(v+=a.nodeValue);a=a.nextSibling}a=
v;"value"!==l&&"param"!==l&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===l&&void 0===n.type&&(n.type="token",n.datatypeLibrary="");"attribute"!==l&&"element"!==l||void 0===n.name||(h=e(n.name),g=[{name:"name",text:h[1],a:{ns:h[0]}}].concat(g),delete n.name);"name"===l||"nsName"===l||"value"===l?void 0===n.ns&&(n.ns=""):delete n.ns;"name"===l&&(h=e(a),n.ns=h[0],a=h[1]);1<g.length&&("define"===l||"oneOrMore"===l||"zeroOrMore"===l||"optional"===l||"list"===l||"mixed"===l)&&(g=[{name:"group",e:m({name:"group",
e:g}).e}]);2<g.length&&"element"===l&&(g=[g[0]].concat({name:"group",e:m({name:"group",e:g.slice(1)}).e}));1===g.length&&"attribute"===l&&g.push({name:"text",text:a});1!==g.length||"choice"!==l&&"group"!==l&&"interleave"!==l?2<g.length&&("choice"===l||"group"===l||"interleave"===l)&&(g=m({name:l,e:g}).e):(l=g[0].name,p=g[0].names,n=g[0].a,a=g[0].text,g=g[0].e);"mixed"===l&&(l="interleave",g=[g[0],{name:"text"}]);"optional"===l&&(l="choice",g=[g[0],{name:"empty"}]);"zeroOrMore"===l&&(l="choice",g=
[{name:"oneOrMore",e:[g[0]]},{name:"empty"}]);if("define"===l&&n.combine){a:{q=n.combine;w=n.name;v=g;for(t=0;c&&t<c.length;t+=1)if(s=c[t],"define"===s.name&&s.a&&s.a.name===w){s.e=[{name:q,e:s.e.concat(v)}];c=s;break a}c=null}if(c)return}c={name:l};g&&0<g.length&&(c.e=g);for(h in n)if(n.hasOwnProperty(h)){c.a=n;break}void 0!==a&&(c.text=a);p&&0<p.length&&(c.names=p);"element"===l&&(c.id=k.length,k.push(c),c={name:"elementref",id:c.id});return c};this.parseRelaxNGDOM=function(b,e){var c=[],g=f(b&&
b.documentElement,c,void 0),n,r,m={};for(n=0;n<g.e.length;n+=1)r=g.e[n],"define"===r.name?m[r.a.name]=r:"start"===r.name&&(a=r);if(!a)return[new h("No Relax NG start element was found.")];p(a,m);for(n in m)m.hasOwnProperty(n)&&p(m[n],m);for(n=0;n<c.length;n+=1)p(c[n],m);e&&(q.rootPattern=e(a.e[0],c));l(a,c);for(n=0;n<c.length;n+=1)l(c[n],c);q.start=a;q.elements=c;q.nsmap=d;return null}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function h(a){return function(){var c;return function(){void 0===c&&(c=a());return c}}()}function m(a,c){return function(){var b={},g=0;return function(d){var f=d.hash||d.toString(),n;n=b[f];if(void 0!==n)return n;b[f]=n=c(d);n.hash=a+g.toString();g+=1;return n}}()}function e(a){return function(){var c={};return function(b){var g,d;d=c[b.localName];if(void 0===d)c[b.localName]=d={};else if(g=d[b.namespaceURI],void 0!==g)return g;return d[b.namespaceURI]=g=a(b)}}()}function p(a,
c,b){return function(){var g={},d=0;return function(f,n){var e=c&&c(f,n),k,h;if(void 0!==e)return e;e=f.hash||f.toString();k=n.hash||n.toString();h=g[e];if(void 0===h)g[e]=h={};else if(e=h[k],void 0!==e)return e;h[k]=e=b(f,n);e.hash=a+d.toString();d+=1;return e}}()}function l(a,c){"choice"===c.p1.type?l(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?l(a,c.p2):a[c.p2.hash]=c.p2}function q(a,c){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return t},startTagOpenDeriv:function(b){return a.contains(b)?
n(c,s):t},attDeriv:function(){return t},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return s}}}function d(a,c,g,f){if(c===t)return t;if(f>=g.length)return c;0===f&&(f=0);for(var n=g.item(f);n.namespaceURI===b;){f+=1;if(f>=g.length)return c;n=g.item(f)}return n=d(a,c.attDeriv(a,g.item(f)),g,f+1)}function f(a,c,g){g.e[0].a?(a.push(g.e[0].text),c.push(g.e[0].a.ns)):f(a,c,g.e[0]);g.e[1].a?(a.push(g.e[1].text),c.push(g.e[1].a.ns)):
f(a,c,g.e[1])}var b="http://www.w3.org/2000/xmlns/",k,c,g,n,r,u,y,x,w,v,t={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return t},startTagOpenDeriv:function(){return t},attDeriv:function(){return t},startTagCloseDeriv:function(){return t},endTagDeriv:function(){return t}},s={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return t},startTagOpenDeriv:function(){return t},attDeriv:function(){return t},startTagCloseDeriv:function(){return s},endTagDeriv:function(){return t}},
D={type:"text",nullable:!0,hash:"text",textDeriv:function(){return D},startTagOpenDeriv:function(){return t},attDeriv:function(){return t},startTagCloseDeriv:function(){return D},endTagDeriv:function(){return t}},A,C,I;k=p("choice",function(a,c){if(a===t)return c;if(c===t||a===c)return a},function(a,c){var g={},b;l(g,{p1:a,p2:c});c=a=void 0;for(b in g)g.hasOwnProperty(b)&&(void 0===a?a=g[b]:c=void 0===c?g[b]:k(c,g[b]));return function(a,c){return{type:"choice",p1:a,p2:c,nullable:a.nullable||c.nullable,
textDeriv:function(g,b){return k(a.textDeriv(g,b),c.textDeriv(g,b))},startTagOpenDeriv:e(function(g){return k(a.startTagOpenDeriv(g),c.startTagOpenDeriv(g))}),attDeriv:function(g,b){return k(a.attDeriv(g,b),c.attDeriv(g,b))},startTagCloseDeriv:h(function(){return k(a.startTagCloseDeriv(),c.startTagCloseDeriv())}),endTagDeriv:h(function(){return k(a.endTagDeriv(),c.endTagDeriv())})}}(a,c)});c=function(a,c,g){return function(){var b={},d=0;return function(f,n){var e=c&&c(f,n),k,h;if(void 0!==e)return e;
e=f.hash||f.toString();k=n.hash||n.toString();e<k&&(h=e,e=k,k=h,h=f,f=n,n=h);h=b[e];if(void 0===h)b[e]=h={};else if(e=h[k],void 0!==e)return e;h[k]=e=g(f,n);e.hash=a+d.toString();d+=1;return e}}()}("interleave",function(a,c){if(a===t||c===t)return t;if(a===s)return c;if(c===s)return a},function(a,g){return{type:"interleave",p1:a,p2:g,nullable:a.nullable&&g.nullable,textDeriv:function(b,d){return k(c(a.textDeriv(b,d),g),c(a,g.textDeriv(b,d)))},startTagOpenDeriv:e(function(b){return k(A(function(a){return c(a,
g)},a.startTagOpenDeriv(b)),A(function(g){return c(a,g)},g.startTagOpenDeriv(b)))}),attDeriv:function(b,d){return k(c(a.attDeriv(b,d),g),c(a,g.attDeriv(b,d)))},startTagCloseDeriv:h(function(){return c(a.startTagCloseDeriv(),g.startTagCloseDeriv())})}});g=p("group",function(a,c){if(a===t||c===t)return t;if(a===s)return c;if(c===s)return a},function(a,c){return{type:"group",p1:a,p2:c,nullable:a.nullable&&c.nullable,textDeriv:function(b,d){var f=g(a.textDeriv(b,d),c);return a.nullable?k(f,c.textDeriv(b,
d)):f},startTagOpenDeriv:function(b){var d=A(function(a){return g(a,c)},a.startTagOpenDeriv(b));return a.nullable?k(d,c.startTagOpenDeriv(b)):d},attDeriv:function(b,d){return k(g(a.attDeriv(b,d),c),g(a,c.attDeriv(b,d)))},startTagCloseDeriv:h(function(){return g(a.startTagCloseDeriv(),c.startTagCloseDeriv())})}});n=p("after",function(a,c){if(a===t||c===t)return t},function(a,c){return{type:"after",p1:a,p2:c,nullable:!1,textDeriv:function(g,b){return n(a.textDeriv(g,b),c)},startTagOpenDeriv:e(function(g){return A(function(a){return n(a,
c)},a.startTagOpenDeriv(g))}),attDeriv:function(g,b){return n(a.attDeriv(g,b),c)},startTagCloseDeriv:h(function(){return n(a.startTagCloseDeriv(),c)}),endTagDeriv:h(function(){return a.nullable?c:t})}});r=m("oneormore",function(a){return a===t?t:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(c,b){return g(a.textDeriv(c,b),k(this,s))},startTagOpenDeriv:function(c){var b=this;return A(function(a){return g(a,k(b,s))},a.startTagOpenDeriv(c))},attDeriv:function(c,b){return g(a.attDeriv(c,
b),k(this,s))},startTagCloseDeriv:h(function(){return r(a.startTagCloseDeriv())})}});y=p("attribute",void 0,function(a,c){return{type:"attribute",nullable:!1,nc:a,p:c,attDeriv:function(g,b){return a.contains(b)&&(c.nullable&&/^\s+$/.test(b.nodeValue)||c.textDeriv(g,b.nodeValue).nullable)?s:t},startTagCloseDeriv:function(){return t}}});u=m("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(c,g){return g===a?s:t},attDeriv:function(){return t},startTagCloseDeriv:function(){return this}}});
w=m("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return s},attDeriv:function(){return t},startTagCloseDeriv:function(){return this}}});A=function M(a,c){return"after"===c.type?n(c.p1,a(c.p2)):"choice"===c.type?k(M(a,c.p1),M(a,c.p2)):c};C=function(a,c,g){var b=g.currentNode;c=c.startTagOpenDeriv(b);c=d(a,c,b.attributes,0);var f=c=c.startTagCloseDeriv(),b=g.currentNode;c=g.firstChild();for(var n=[],e;c;)c.nodeType===Node.ELEMENT_NODE?n.push(c):c.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(c.nodeValue)||n.push(c.nodeValue),c=g.nextSibling();0===n.length&&(n=[""]);e=f;for(f=0;e!==t&&f<n.length;f+=1)c=n[f],"string"===typeof c?e=/^\s*$/.test(c)?k(e,e.textDeriv(a,c)):e.textDeriv(a,c):(g.currentNode=c,e=C(a,e,g));g.currentNode=b;return c=e.endTagDeriv()};x=function(a){var c,g,b;if("name"===a.name)c=a.text,g=a.a.ns,a={name:c,ns:g,hash:"{"+g+"}"+c,contains:function(a){return a.namespaceURI===g&&a.localName===c}};else if("choice"===a.name){c=[];g=[];f(c,g,a);a="";for(b=0;b<c.length;b+=
1)a+="{"+g[b]+"}"+c[b]+",";a={hash:a,contains:function(a){var b;for(b=0;b<c.length;b+=1)if(c[b]===a.localName&&g[b]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};v=function H(b,d){var f,n;if("elementref"===b.name){f=b.id||0;b=d[f];if(void 0!==b.name){var e=b;f=d[e.id]={hash:"element"+e.id.toString()};e=q(x(e.e[0]),v(e.e[1],d));for(n in e)e.hasOwnProperty(n)&&(f[n]=e[n]);return f}return b}switch(b.name){case "empty":return s;case "notAllowed":return t;
case "text":return D;case "choice":return k(H(b.e[0],d),H(b.e[1],d));case "interleave":f=H(b.e[0],d);for(n=1;n<b.e.length;n+=1)f=c(f,H(b.e[n],d));return f;case "group":return g(H(b.e[0],d),H(b.e[1],d));case "oneOrMore":return r(H(b.e[0],d));case "attribute":return y(x(b.e[0]),H(b.e[1],d));case "value":return u(b.text);case "data":return f=b.a&&b.a.type,void 0===f&&(f=""),w(f);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,c){var b={},g;for(g in c)c.hasOwnProperty(g)&&
(b[g]=c[g]);return g=v(a,b)};this.validate=function(a,c){var b;a.currentNode=a.root;b=C(null,I,a);b.nullable?c(null):(runtime.log("Error in Relax NG validation: "+b),c(["Error in Relax NG validation: "+b]))};this.init=function(a){I=a}};
// Input 24
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function h(a,d){this.message=function(){d&&(a+=d.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=d.nodeName,d.nodeValue&&(a+=" with value '"+d.nodeValue+"'"),a+=".");return a}}function m(a,d,f,b){return"empty"===a.name?null:l(a,d,f,b)}function e(a,d){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var f=d.currentNode,b=f?f.nodeType:0,e=null;b>Node.ELEMENT_NODE;){if(b!==Node.COMMENT_NODE&&(b!==Node.TEXT_NODE||!/^\s+$/.test(d.currentNode.nodeValue)))return[new h("Not allowed node of type "+
b+".")];b=(f=d.nextSibling())?f.nodeType:0}if(!f)return[new h("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(q[f.namespaceURI]+":"+f.localName))return[new h("Found "+f.nodeName+" instead of "+a.names+".",f)];if(d.firstChild()){for(e=m(a.e[1],d,f);d.nextSibling();)if(b=d.currentNode.nodeType,!(d.currentNode&&d.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(d.currentNode.nodeValue)||b===Node.COMMENT_NODE))return[new h("Spurious content.",d.currentNode)];if(d.parentNode()!==f)return[new h("Implementation error.")]}else e=
m(a.e[1],d,f);d.nextSibling();return e}var p,l,q;l=function(a,d,f,b){var k=a.name,c=null;if("text"===k)a:{for(var g=(a=d.currentNode)?a.nodeType:0;a!==f&&3!==g;){if(1===g){c=[new h("Element not allowed here.",a)];break a}g=(a=d.nextSibling())?a.nodeType:0}d.nextSibling();c=null}else if("data"===k)c=null;else if("value"===k)b!==a.text&&(c=[new h("Wrong value, should be '"+a.text+"', not '"+b+"'",f)]);else if("list"===k)c=null;else if("attribute"===k)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;k=a.localnames.length;for(c=0;c<k;c+=1){b=f.getAttributeNS(a.namespaces[c],a.localnames[c]);""!==b||f.hasAttributeNS(a.namespaces[c],a.localnames[c])||(b=void 0);if(void 0!==g&&void 0!==b){c=[new h("Attribute defined too often.",f)];break a}g=b}c=void 0===g?[new h("Attribute not found: "+a.names,f)]:m(a.e[1],d,f,g)}else if("element"===k)c=e(a,d);else if("oneOrMore"===k){b=0;do g=d.currentNode,k=l(a.e[0],d,f),b+=1;while(!k&&g!==d.currentNode);1<b?(d.currentNode=g,c=null):c=k}else if("choice"===
k){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;g=d.currentNode;if("empty"===a.e[0].name){if(k=l(a.e[1],d,f,b))d.currentNode=g;c=null}else{if(k=m(a.e[0],d,f,b))d.currentNode=g,k=l(a.e[1],d,f,b);c=k}}else if("group"===k){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;c=l(a.e[0],d,f)||l(a.e[1],d,f)}else if("interleave"===k)a:{g=a.e.length;b=[g];for(var n=g,r,p,q,x;0<n;){r=0;p=d.currentNode;for(c=0;c<g;c+=1)q=d.currentNode,!0!==b[c]&&b[c]!==q&&(x=a.e[c],(k=
l(x,d,f))?(d.currentNode=q,void 0===b[c]&&(b[c]=!1)):q===d.currentNode||"oneOrMore"===x.name||"choice"===x.name&&("oneOrMore"===x.e[0].name||"oneOrMore"===x.e[1].name)?(r+=1,b[c]=q):(r+=1,b[c]=!0));if(p===d.currentNode&&r===n){c=null;break a}if(0===r){for(c=0;c<g;c+=1)if(!1===b[c]){c=[new h("Interleave does not match.",f)];break a}c=null;break a}for(c=n=0;c<g;c+=1)!0!==b[c]&&(n+=1)}c=null}else throw k+" not allowed in nonEmptyPattern.";return c};this.validate=function(a,d){a.currentNode=a.root;var f=
m(p.e[0],a,a.root);d(f)};this.init=function(a,d){p=a;q=d}};
// Input 25
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function h(a,b,d){return-1!==a&&(a<b||-1===b)&&(a<d||-1===d)}function m(a){for(var b=[],d=0,f=a.length,e;d<f;){var l=a,m=f,q=b,p="",t=[],s=l.indexOf("[",d),D=l.indexOf("/",d),A=l.indexOf("=",d);h(D,s,A)?(p=l.substring(d,D),d=D+1):h(s,D,A)?(p=l.substring(d,s),d=k(l,s,t)):h(A,D,s)?(p=l.substring(d,A),d=A):(p=l.substring(d,m),d=m);q.push({location:p,predicates:t});if(d<f&&"="===a[d]){e=a.substring(d+1,f);if(2<e.length&&("'"===e[0]||'"'===e[0]))e=e.slice(1,e.length-1);else try{e=
parseInt(e,10)}catch(C){}d=f}}return{steps:b,value:e}}function e(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var d=b?null:a;b=!0;return d}}function p(a,b,d){this.reset=function(){a.reset()};this.next=function(){for(var f=a.next();f&&!(f=f.getAttributeNodeNS(b,d));)f=a.next();return f}}function l(a,b){var d=a.next(),f=null;this.reset=function(){a.reset();d=a.next();f=null};this.next=function(){for(;d;){if(f)if(b&&f.firstChild)f=f.firstChild;else{for(;!f.nextSibling&&
f!==d;)f=f.parentNode;f===d?d=a.next():f=f.nextSibling}else{do(f=d.firstChild)||(d=a.next());while(d&&!f)}if(f&&f.nodeType===Node.ELEMENT_NODE)return f}return null}}function q(a,b){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!b(d);)d=a.next();return d}}function a(a,b,d){b=b.split(":",2);var f=d(b[0]),e=b[1];return new q(a,function(a){return a.localName===e&&a.namespaceURI===f})}function d(a,g,d){var f=new e,k=b(f,g,d),h=g.value;return void 0===h?new q(a,function(a){f.setNode(a);
k.reset();return k.next()}):new q(a,function(a){f.setNode(a);k.reset();return(a=k.next())&&a.nodeValue===h})}function f(a,g,d){var f=a.ownerDocument,k=[],h=null;if(f&&f.evaluate)for(d=f.evaluate(g,a,d,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),h=d.iterateNext();null!==h;)h.nodeType===Node.ELEMENT_NODE&&k.push(h),h=d.iterateNext();else{k=new e;k.setNode(a);a=m(g);k=b(k,a,d);a=[];for(d=k.next();d;)a.push(d),d=k.next();k=a}return k}var b,k;k=function(a,b,d){for(var f=b,e=a.length,k=0;f<e;)"]"===
a[f]?(k-=1,0>=k&&d.push(m(a.substring(b,f)))):"["===a[f]&&(0>=k&&(b=f+1),k+=1),f+=1;return f};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};b=function(c,b,f){var e,k,h,m;for(e=0;e<b.steps.length;e+=1)for(h=b.steps[e],k=h.location,""===k?c=new l(c,!1):"@"===k[0]?(m=k.slice(1).split(":",2),c=new p(c,f(m[0]),m[1])):"."!==k&&(c=new l(c,!1),-1!==k.indexOf(":")&&(c=a(c,k,f))),k=0;k<h.predicates.length;k+=1)m=h.predicates[k],c=d(c,m,f);return c};xmldom.XPath=
function(){this.getODFElementsWithXPath=f};return xmldom.XPath}();
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
gui.AnnotationViewManager=function(h,m,e){function p(a){var g=a.node,d=a.end;a=f.createRange();d&&(a.setStart(g,g.childNodes.length),a.setEnd(d,0),d=b.getTextNodes(a,!1),d.forEach(function(a){var c=f.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",g.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function l(a){var b=h.getSizer();a?(e.style.display="inline-block",b.style.paddingRight=k.getComputedStyle(e).width):
(e.style.display="none",b.style.paddingRight=0);h.refreshSize()}function q(){d.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function a(){var a;for(a=0;a<d.length;a+=1){var b=d[a],n=b.node.parentNode,l=n.nextSibling,m=l.nextSibling,p=n.parentNode,q=0,w=d[d.indexOf(b)-1],v=void 0,b=b.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],q=void 0,q=h.getZoomLevel();n.style.left=(e.getBoundingClientRect().left-p.getBoundingClientRect().left)/
q+"px";n.style.width=e.getBoundingClientRect().width/q+"px";l.style.width=parseFloat(n.style.left)-30+"px";w&&(v=w.node.parentNode.getBoundingClientRect(),20>=(p.getBoundingClientRect().top-v.bottom)/q?n.style.top=Math.abs(p.getBoundingClientRect().top-v.bottom)/q+20+"px":n.style.top="0px");m.style.left=l.getBoundingClientRect().width/q+"px";var l=m.style,p=m.getBoundingClientRect().left/q,w=m.getBoundingClientRect().top/q,v=n.getBoundingClientRect().left/q,t=n.getBoundingClientRect().top/q,s=0,D=
0,s=v-p,s=s*s,D=t-w,D=D*D,p=Math.sqrt(s+D);l.width=p+"px";q=Math.asin((n.getBoundingClientRect().top-m.getBoundingClientRect().top)/(q*parseFloat(m.style.width)));m.style.transform="rotate("+q+"rad)";m.style.MozTransform="rotate("+q+"rad)";m.style.WebkitTransform="rotate("+q+"rad)";m.style.msTransform="rotate("+q+"rad)";b&&(q=k.getComputedStyle(b,":before").content)&&"none"!==q&&(/^["'].*["']$/.test(q)&&(q=q.substring(1,q.length-1)),b.firstChild?b.firstChild.nodeValue=q:b.appendChild(f.createTextNode(q)))}}
var d=[],f=m.ownerDocument,b=new odf.OdfUtils,k=runtime.getWindow();runtime.assert(Boolean(k),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=a;this.addAnnotation=function(c){l(!0);d.push({node:c.node,end:c.end});q();var b=f.createElement("div"),e=f.createElement("div"),k=f.createElement("div"),h=f.createElement("div"),m=f.createElement("div"),x=c.node;b.className="annotationWrapper";x.parentNode.insertBefore(b,x);e.className="annotationNote";
e.appendChild(x);m.className="annotationRemoveButton";e.appendChild(m);k.className="annotationConnector horizontal";h.className="annotationConnector angular";b.appendChild(e);b.appendChild(k);b.appendChild(h);c.end&&p(c);a()};this.forgetAnnotations=function(){for(;d.length;){var a=d[0],b=d.indexOf(a),e=a.node,k=e.parentNode.parentNode;"div"===k.localName&&(k.parentNode.insertBefore(e,k),k.parentNode.removeChild(k));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=f.querySelectorAll('span.annotationHighlight[annotation="'+
a+'"]');k=e=void 0;for(e=0;e<a.length;e+=1){for(k=a[e];k.firstChild;)k.parentNode.insertBefore(k.firstChild,k);k.parentNode.removeChild(k)}-1!==b&&d.splice(b,1);0===d.length&&l(!1)}}};
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
odf.OdfNodeFilter=function(){this.acceptNode=function(h){return"http://www.w3.org/1999/xhtml"===h.namespaceURI?NodeFilter.FILTER_SKIP:h.namespaceURI&&h.namespaceURI.match(/^urn:webodf:/)?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};
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
odf.Namespaces=function(){function h(e){return m[e]||null}var m={db:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",dc:"http://purl.org/dc/elements/1.1/",dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chart:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",form:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},e;h.lookupNamespaceURI=h;e=function(){};e.forEachPrefix=function(e){for(var h in m)m.hasOwnProperty(h)&&
e(h,m[h])};e.resolvePrefix=h;e.namespaceMap=m;e.dbns="urn:oasis:names:tc:opendocument:xmlns:database:1.0";e.dcns="http://purl.org/dc/elements/1.1/";e.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";e.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";e.chartns="urn:oasis:names:tc:opendocument:xmlns:chart:1.0";e.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";e.formns="urn:oasis:names:tc:opendocument:xmlns:form:1.0";e.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
e.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";e.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";e.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";e.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";e.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";e.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";e.xlinkns="http://www.w3.org/1999/xlink";e.xmlns="http://www.w3.org/XML/1998/namespace";return e}();
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
odf.StyleInfo=function(){function h(a,c){for(var b=A[a.localName],g=b&&b[a.namespaceURI],d=g?g.length:0,f,b=0;b<d;b+=1)(f=a.getAttributeNS(g[b].ns,g[b].localname))&&a.setAttributeNS(g[b].ns,D[g[b].ns]+g[b].localname,c+f);for(b=a.firstChild;b;)b.nodeType===Node.ELEMENT_NODE&&(g=b,h(g,c)),b=b.nextSibling}function m(a,c){for(var b=A[a.localName],g=b&&b[a.namespaceURI],d=g?g.length:0,f,b=0;b<d;b+=1)if(f=a.getAttributeNS(g[b].ns,g[b].localname))f=f.replace(c,""),a.setAttributeNS(g[b].ns,D[g[b].ns]+g[b].localname,
f);for(b=a.firstChild;b;)b.nodeType===Node.ELEMENT_NODE&&(g=b,m(g,c)),b=b.nextSibling}function e(a,c){var b=A[a.localName],g=(b=b&&b[a.namespaceURI])?b.length:0,d,f,e;for(e=0;e<g;e+=1)if(d=a.getAttributeNS(b[e].ns,b[e].localname))c=c||{},f=b[e].keyname,f=c[f]=c[f]||{},f[d]=1;return c}function p(a,c){var b,g;e(a,c);for(b=a.firstChild;b;)b.nodeType===Node.ELEMENT_NODE&&(g=b,p(g,c)),b=b.nextSibling}function l(a,c,b){this.key=a;this.name=c;this.family=b;this.requires={}}function q(a,c,b){var g=a+'"'+
c,d=b[g];d||(d=b[g]=new l(g,a,c));return d}function a(c,b,g){var d=A[c.localName],f=(d=d&&d[c.namespaceURI])?d.length:0,e=c.getAttributeNS(v,"name"),k=c.getAttributeNS(v,"family"),h;e&&k&&(b=q(e,k,g));if(b)for(e=0;e<f;e+=1)if(k=c.getAttributeNS(d[e].ns,d[e].localname))h=d[e].keyname,k=q(k,h,g),b.requires[k.key]=k;for(e=c.firstChild;e;)e.nodeType===Node.ELEMENT_NODE&&(c=e,a(c,b,g)),e=e.nextSibling;return g}function d(a,c){var b=c[a.family];b||(b=c[a.family]={});b[a.name]=1;Object.keys(a.requires).forEach(function(b){d(a.requires[b],
c)})}function f(c,b){var g=a(c,null,{});Object.keys(g).forEach(function(a){a=g[a];var c=b[a.family];c&&c.hasOwnProperty(a.name)&&d(a,b)})}function b(a,c){function g(c){(c=f.getAttributeNS(v,c))&&(a[c]=!0)}var d=["font-name","font-name-asian","font-name-complex"],f;if(c)for(f=c.firstChild;f;)f.nodeType===Node.ELEMENT_NODE&&(d.forEach(g),b(a,f)),f=f.nextSibling}function k(a,c){function b(a){var g=d.getAttributeNS(v,a);g&&c.hasOwnProperty(g)&&d.setAttributeNS(v,"style:"+a,c[g])}var g=["font-name","font-name-asian",
"font-name-complex"],d;if(a)for(d=a.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&(g.forEach(b),k(d,c)),d=d.nextSibling}var c=odf.Namespaces.chartns,g=odf.Namespaces.dbns,n=odf.Namespaces.dr3dns,r=odf.Namespaces.drawns,u=odf.Namespaces.formns,y=odf.Namespaces.numberns,x=odf.Namespaces.officens,w=odf.Namespaces.presentationns,v=odf.Namespaces.stylens,t=odf.Namespaces.tablens,s=odf.Namespaces.textns,D={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},c={text:[{ens:v,en:"tab-stop",ans:v,a:"leader-text-style"},{ens:v,en:"drop-cap",ans:v,a:"style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-body-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-style-name"},{ens:s,en:"a",ans:s,a:"style-name"},{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"linenumbering-configuration",
ans:s,a:"style-name"},{ens:s,en:"list-level-style-number",ans:s,a:"style-name"},{ens:s,en:"ruby-text",ans:s,a:"style-name"},{ens:s,en:"span",ans:s,a:"style-name"},{ens:s,en:"a",ans:s,a:"visited-style-name"},{ens:v,en:"text-properties",ans:v,a:"text-line-through-text-style"},{ens:s,en:"alphabetical-index-source",ans:s,a:"main-entry-style-name"},{ens:s,en:"index-entry-bibliography",ans:s,a:"style-name"},{ens:s,en:"index-entry-chapter",ans:s,a:"style-name"},{ens:s,en:"index-entry-link-end",ans:s,a:"style-name"},
{ens:s,en:"index-entry-link-start",ans:s,a:"style-name"},{ens:s,en:"index-entry-page-number",ans:s,a:"style-name"},{ens:s,en:"index-entry-span",ans:s,a:"style-name"},{ens:s,en:"index-entry-tab-stop",ans:s,a:"style-name"},{ens:s,en:"index-entry-text",ans:s,a:"style-name"},{ens:s,en:"index-title-template",ans:s,a:"style-name"},{ens:s,en:"list-level-style-bullet",ans:s,a:"style-name"},{ens:s,en:"outline-level-style",ans:s,a:"style-name"}],paragraph:[{ens:r,en:"caption",ans:r,a:"text-style-name"},{ens:r,
en:"circle",ans:r,a:"text-style-name"},{ens:r,en:"connector",ans:r,a:"text-style-name"},{ens:r,en:"control",ans:r,a:"text-style-name"},{ens:r,en:"custom-shape",ans:r,a:"text-style-name"},{ens:r,en:"ellipse",ans:r,a:"text-style-name"},{ens:r,en:"frame",ans:r,a:"text-style-name"},{ens:r,en:"line",ans:r,a:"text-style-name"},{ens:r,en:"measure",ans:r,a:"text-style-name"},{ens:r,en:"path",ans:r,a:"text-style-name"},{ens:r,en:"polygon",ans:r,a:"text-style-name"},{ens:r,en:"polyline",ans:r,a:"text-style-name"},
{ens:r,en:"rect",ans:r,a:"text-style-name"},{ens:r,en:"regular-polygon",ans:r,a:"text-style-name"},{ens:x,en:"annotation",ans:r,a:"text-style-name"},{ens:u,en:"column",ans:u,a:"text-style-name"},{ens:v,en:"style",ans:v,a:"next-style-name"},{ens:t,en:"body",ans:t,a:"paragraph-style-name"},{ens:t,en:"even-columns",ans:t,a:"paragraph-style-name"},{ens:t,en:"even-rows",ans:t,a:"paragraph-style-name"},{ens:t,en:"first-column",ans:t,a:"paragraph-style-name"},{ens:t,en:"first-row",ans:t,a:"paragraph-style-name"},
{ens:t,en:"last-column",ans:t,a:"paragraph-style-name"},{ens:t,en:"last-row",ans:t,a:"paragraph-style-name"},{ens:t,en:"odd-columns",ans:t,a:"paragraph-style-name"},{ens:t,en:"odd-rows",ans:t,a:"paragraph-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"default-style-name"},{ens:s,en:"alphabetical-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"bibliography-entry-template",ans:s,a:"style-name"},{ens:s,en:"h",ans:s,a:"style-name"},{ens:s,en:"illustration-index-entry-template",ans:s,a:"style-name"},
{ens:s,en:"index-source-style",ans:s,a:"style-name"},{ens:s,en:"object-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"p",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-of-content-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"user-index-entry-template",ans:s,a:"style-name"},{ens:v,en:"page-layout-properties",ans:v,a:"register-truth-ref-style-name"}],chart:[{ens:c,en:"axis",ans:c,
a:"style-name"},{ens:c,en:"chart",ans:c,a:"style-name"},{ens:c,en:"data-label",ans:c,a:"style-name"},{ens:c,en:"data-point",ans:c,a:"style-name"},{ens:c,en:"equation",ans:c,a:"style-name"},{ens:c,en:"error-indicator",ans:c,a:"style-name"},{ens:c,en:"floor",ans:c,a:"style-name"},{ens:c,en:"footer",ans:c,a:"style-name"},{ens:c,en:"grid",ans:c,a:"style-name"},{ens:c,en:"legend",ans:c,a:"style-name"},{ens:c,en:"mean-value",ans:c,a:"style-name"},{ens:c,en:"plot-area",ans:c,a:"style-name"},{ens:c,en:"regression-curve",
ans:c,a:"style-name"},{ens:c,en:"series",ans:c,a:"style-name"},{ens:c,en:"stock-gain-marker",ans:c,a:"style-name"},{ens:c,en:"stock-loss-marker",ans:c,a:"style-name"},{ens:c,en:"stock-range-line",ans:c,a:"style-name"},{ens:c,en:"subtitle",ans:c,a:"style-name"},{ens:c,en:"title",ans:c,a:"style-name"},{ens:c,en:"wall",ans:c,a:"style-name"}],section:[{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"bibliography",ans:s,a:"style-name"},{ens:s,en:"illustration-index",ans:s,a:"style-name"},
{ens:s,en:"index-title",ans:s,a:"style-name"},{ens:s,en:"object-index",ans:s,a:"style-name"},{ens:s,en:"section",ans:s,a:"style-name"},{ens:s,en:"table-of-content",ans:s,a:"style-name"},{ens:s,en:"table-index",ans:s,a:"style-name"},{ens:s,en:"user-index",ans:s,a:"style-name"}],ruby:[{ens:s,en:"ruby",ans:s,a:"style-name"}],table:[{ens:g,en:"query",ans:g,a:"style-name"},{ens:g,en:"table-representation",ans:g,a:"style-name"},{ens:t,en:"background",ans:t,a:"style-name"},{ens:t,en:"table",ans:t,a:"style-name"}],
"table-column":[{ens:g,en:"column",ans:g,a:"style-name"},{ens:t,en:"table-column",ans:t,a:"style-name"}],"table-row":[{ens:g,en:"query",ans:g,a:"default-row-style-name"},{ens:g,en:"table-representation",ans:g,a:"default-row-style-name"},{ens:t,en:"table-row",ans:t,a:"style-name"}],"table-cell":[{ens:g,en:"column",ans:g,a:"default-cell-style-name"},{ens:t,en:"table-column",ans:t,a:"default-cell-style-name"},{ens:t,en:"table-row",ans:t,a:"default-cell-style-name"},{ens:t,en:"body",ans:t,a:"style-name"},
{ens:t,en:"covered-table-cell",ans:t,a:"style-name"},{ens:t,en:"even-columns",ans:t,a:"style-name"},{ens:t,en:"covered-table-cell",ans:t,a:"style-name"},{ens:t,en:"even-columns",ans:t,a:"style-name"},{ens:t,en:"even-rows",ans:t,a:"style-name"},{ens:t,en:"first-column",ans:t,a:"style-name"},{ens:t,en:"first-row",ans:t,a:"style-name"},{ens:t,en:"last-column",ans:t,a:"style-name"},{ens:t,en:"last-row",ans:t,a:"style-name"},{ens:t,en:"odd-columns",ans:t,a:"style-name"},{ens:t,en:"odd-rows",ans:t,a:"style-name"},
{ens:t,en:"table-cell",ans:t,a:"style-name"}],graphic:[{ens:n,en:"cube",ans:r,a:"style-name"},{ens:n,en:"extrude",ans:r,a:"style-name"},{ens:n,en:"rotate",ans:r,a:"style-name"},{ens:n,en:"scene",ans:r,a:"style-name"},{ens:n,en:"sphere",ans:r,a:"style-name"},{ens:r,en:"caption",ans:r,a:"style-name"},{ens:r,en:"circle",ans:r,a:"style-name"},{ens:r,en:"connector",ans:r,a:"style-name"},{ens:r,en:"control",ans:r,a:"style-name"},{ens:r,en:"custom-shape",ans:r,a:"style-name"},{ens:r,en:"ellipse",ans:r,a:"style-name"},
{ens:r,en:"frame",ans:r,a:"style-name"},{ens:r,en:"g",ans:r,a:"style-name"},{ens:r,en:"line",ans:r,a:"style-name"},{ens:r,en:"measure",ans:r,a:"style-name"},{ens:r,en:"page-thumbnail",ans:r,a:"style-name"},{ens:r,en:"path",ans:r,a:"style-name"},{ens:r,en:"polygon",ans:r,a:"style-name"},{ens:r,en:"polyline",ans:r,a:"style-name"},{ens:r,en:"rect",ans:r,a:"style-name"},{ens:r,en:"regular-polygon",ans:r,a:"style-name"},{ens:x,en:"annotation",ans:r,a:"style-name"}],presentation:[{ens:n,en:"cube",ans:w,
a:"style-name"},{ens:n,en:"extrude",ans:w,a:"style-name"},{ens:n,en:"rotate",ans:w,a:"style-name"},{ens:n,en:"scene",ans:w,a:"style-name"},{ens:n,en:"sphere",ans:w,a:"style-name"},{ens:r,en:"caption",ans:w,a:"style-name"},{ens:r,en:"circle",ans:w,a:"style-name"},{ens:r,en:"connector",ans:w,a:"style-name"},{ens:r,en:"control",ans:w,a:"style-name"},{ens:r,en:"custom-shape",ans:w,a:"style-name"},{ens:r,en:"ellipse",ans:w,a:"style-name"},{ens:r,en:"frame",ans:w,a:"style-name"},{ens:r,en:"g",ans:w,a:"style-name"},
{ens:r,en:"line",ans:w,a:"style-name"},{ens:r,en:"measure",ans:w,a:"style-name"},{ens:r,en:"page-thumbnail",ans:w,a:"style-name"},{ens:r,en:"path",ans:w,a:"style-name"},{ens:r,en:"polygon",ans:w,a:"style-name"},{ens:r,en:"polyline",ans:w,a:"style-name"},{ens:r,en:"rect",ans:w,a:"style-name"},{ens:r,en:"regular-polygon",ans:w,a:"style-name"},{ens:x,en:"annotation",ans:w,a:"style-name"}],"drawing-page":[{ens:r,en:"page",ans:r,a:"style-name"},{ens:w,en:"notes",ans:r,a:"style-name"},{ens:v,en:"handout-master",
ans:r,a:"style-name"},{ens:v,en:"master-page",ans:r,a:"style-name"}],"list-style":[{ens:s,en:"list",ans:s,a:"style-name"},{ens:s,en:"numbered-paragraph",ans:s,a:"style-name"},{ens:s,en:"list-item",ans:s,a:"style-override"},{ens:v,en:"style",ans:v,a:"list-style-name"}],data:[{ens:v,en:"style",ans:v,a:"data-style-name"},{ens:v,en:"style",ans:v,a:"percentage-data-style-name"},{ens:w,en:"date-time-decl",ans:v,a:"data-style-name"},{ens:s,en:"creation-date",ans:v,a:"data-style-name"},{ens:s,en:"creation-time",
ans:v,a:"data-style-name"},{ens:s,en:"database-display",ans:v,a:"data-style-name"},{ens:s,en:"date",ans:v,a:"data-style-name"},{ens:s,en:"editing-duration",ans:v,a:"data-style-name"},{ens:s,en:"expression",ans:v,a:"data-style-name"},{ens:s,en:"meta-field",ans:v,a:"data-style-name"},{ens:s,en:"modification-date",ans:v,a:"data-style-name"},{ens:s,en:"modification-time",ans:v,a:"data-style-name"},{ens:s,en:"print-date",ans:v,a:"data-style-name"},{ens:s,en:"print-time",ans:v,a:"data-style-name"},{ens:s,
en:"table-formula",ans:v,a:"data-style-name"},{ens:s,en:"time",ans:v,a:"data-style-name"},{ens:s,en:"user-defined",ans:v,a:"data-style-name"},{ens:s,en:"user-field-get",ans:v,a:"data-style-name"},{ens:s,en:"user-field-input",ans:v,a:"data-style-name"},{ens:s,en:"variable-get",ans:v,a:"data-style-name"},{ens:s,en:"variable-input",ans:v,a:"data-style-name"},{ens:s,en:"variable-set",ans:v,a:"data-style-name"}],"page-layout":[{ens:w,en:"notes",ans:v,a:"page-layout-name"},{ens:v,en:"handout-master",ans:v,
a:"page-layout-name"},{ens:v,en:"master-page",ans:v,a:"page-layout-name"}]},A,C=new xmldom.XPath;this.collectUsedFontFaces=b;this.changeFontFaceNames=k;this.UsedStyleList=function(a,c){var b={};this.uses=function(a){var c=a.localName,g=a.getAttributeNS(r,"name")||a.getAttributeNS(v,"name");a="style"===c?a.getAttributeNS(v,"family"):a.namespaceURI===y?"data":c;return(a=b[a])?0<a[g]:!1};p(a,b);c&&f(c,b)};this.hasDerivedStyles=function(a,c,b){var g=c("style"),d=b.getAttributeNS(g,"name");b=b.getAttributeNS(g,
"family");return C.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+d+"'][@style:family='"+b+"']",c).length?!0:!1};this.prefixStyleNames=function(a,c,b){var g;if(a){for(g=a.firstChild;g;){if(g.nodeType===Node.ELEMENT_NODE){var d=g,f=c,e=d.getAttributeNS(r,"name"),k=void 0;e?k=r:(e=d.getAttributeNS(v,"name"))&&(k=v);k&&d.setAttributeNS(k,D[k]+"name",f+e)}g=g.nextSibling}h(a,c);b&&h(b,c)}};this.removePrefixFromStyleNames=function(a,c,b){var g=RegExp("^"+c);if(a){for(c=a.firstChild;c;){if(c.nodeType===
Node.ELEMENT_NODE){var d=c,f=g,e=d.getAttributeNS(r,"name"),k=void 0;e?k=r:(e=d.getAttributeNS(v,"name"))&&(k=v);k&&(e=e.replace(f,""),d.setAttributeNS(k,D[k]+"name",e))}c=c.nextSibling}m(a,g);b&&m(b,g)}};this.determineStylesForNode=e;A=function(a){var c,b,g,d,f,e={},k;for(c in a)if(a.hasOwnProperty(c))for(d=a[c],g=d.length,b=0;b<g;b+=1)f=d[b],k=e[f.en]=e[f.en]||{},k=k[f.ens]=k[f.ens]||[],k.push({ns:f.ans,localname:f.a,keyname:c});return e}(c)};
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
odf.OdfUtils=function(){function h(a){return"image"===(a&&a.localName)&&a.namespaceURI===s}function m(a){return"frame"===(a&&a.localName)&&a.namespaceURI===s&&"as-char"===a.getAttributeNS(t,"anchor-type")}function e(a){var c=a&&a.localName;return("p"===c||"h"===c)&&a.namespaceURI===t}function p(a){for(;a&&!e(a);)a=a.parentNode;return a}function l(a){return/^[ \t\r\n]+$/.test(a)}function q(a){var c=a&&a.localName;return/^(span|p|h|a|meta)$/.test(c)&&a.namespaceURI===t||"span"===c&&"annotationHighlight"===
a.className?!0:!1}function a(a){var c=a&&a.localName,b;b=!1;c&&(b=a.namespaceURI,b=b===t?"s"===c||"tab"===c||"line-break"===c:m(a));return b}function d(a){var c=a&&a.localName,b=!1;c&&(a=a.namespaceURI,a===t&&(b="s"===c||"tab"===c));return b}function f(a){for(;null!==a.firstChild&&q(a);)a=a.firstChild;return a}function b(a){for(;null!==a.lastChild&&q(a);)a=a.lastChild;return a}function k(a){for(;!e(a)&&null===a.previousSibling;)a=a.parentNode;return e(a)?null:b(a.previousSibling)}function c(a){for(;!e(a)&&
null===a.nextSibling;)a=a.parentNode;return e(a)?null:f(a.nextSibling)}function g(c){for(var b=!1;c;)if(c.nodeType===Node.TEXT_NODE)if(0===c.length)c=k(c);else return!l(c.data.substr(c.length-1,1));else a(c)?(b=!1===d(c),c=null):c=k(c);return b}function n(b){var g=!1;for(b=b&&f(b);b;){if(b.nodeType===Node.TEXT_NODE&&0<b.length&&!l(b.data)){g=!0;break}if(a(b)){g=!0;break}b=c(b)}return g}function r(a,b){return l(a.data.substr(b))?!n(c(a)):!1}function u(c,b){var d=c.data,f;if(!l(d[b])||a(c.parentNode))return!1;
0<b?l(d[b-1])||(f=!0):g(k(c))&&(f=!0);return!0===f?r(c,b)?!1:!0:!1}function y(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?{value:parseFloat(a[1]),unit:a[3]}:null}function x(a){return(a=y(a))&&(0>a.value||"%"===a.unit)?null:a}function w(a){return(a=y(a))&&"%"!==a.unit?null:a}function v(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;
case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var t=odf.Namespaces.textns,s=odf.Namespaces.drawns,D=/^\s*$/,A=new core.DomUtils;this.isImage=h;this.isCharacterFrame=m;this.isTextSpan=function(a){return"span"===(a&&a.localName)&&a.namespaceURI===t};this.isParagraph=e;this.getParagraphElement=p;this.isWithinTrackedChanges=function(a,c){for(;a&&a!==c;){if(a.namespaceURI===
t&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===t};this.isLineBreak=function(a){return"line-break"===(a&&a.localName)&&a.namespaceURI===t};this.isODFWhitespace=l;this.isGroupingElement=q;this.isCharacterElement=a;this.isWhitespaceElement=d;this.firstChild=f;this.lastChild=b;this.previousNode=k;this.nextNode=c;this.scanLeftForNonWhitespace=g;this.lookLeftForCharacter=function(c){var b;b=0;c.nodeType===
Node.TEXT_NODE&&0<c.length?(b=c.data,b=l(b.substr(b.length-1,1))?1===b.length?g(k(c))?2:0:l(b.substr(b.length-2,1))?0:2:1):a(c)&&(b=1);return b};this.lookRightForCharacter=function(c){var b=!1;c&&c.nodeType===Node.TEXT_NODE&&0<c.length?b=!l(c.data.substr(0,1)):a(c)&&(b=!0);return b};this.scanLeftForAnyCharacter=function(c){var g=!1;for(c=c&&b(c);c;){if(c.nodeType===Node.TEXT_NODE&&0<c.length&&!l(c.data)){g=!0;break}if(a(c)){g=!0;break}c=k(c)}return g};this.scanRightForAnyCharacter=n;this.isTrailingWhitespace=
r;this.isSignificantWhitespace=u;this.isDowngradableSpaceElement=function(a){return a.namespaceURI===t&&"s"===a.localName?g(k(a))&&n(c(a)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&D.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=y;this.parseNonNegativeLength=x;this.parseFoFontSize=function(a){var c;c=(c=y(a))&&(0>=c.value||"%"===c.unit)?null:c;return c||w(a)};this.parseFoLineHeight=function(a){return x(a)||w(a)};this.getImpactedParagraphs=
function(a){var c=a.commonAncestorContainer,b=[];for(c.nodeType===Node.ELEMENT_NODE&&(b=A.getElementsByTagNameNS(c,t,"p").concat(A.getElementsByTagNameNS(c,t,"h")));c&&!e(c);)c=c.parentNode;c&&b.push(c);return b.filter(function(c){return A.rangeIntersectsNode(a,c)})};this.getTextNodes=function(a,c){var b=a.startContainer.ownerDocument.createRange(),g;g=A.getNodesInRange(a,function(g){b.selectNodeContents(g);if(g.nodeType===Node.TEXT_NODE){if(c&&A.rangesIntersect(a,b)||A.containsRange(a,b))return Boolean(p(g)&&
(!l(g.textContent)||u(g,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(A.rangesIntersect(a,b)&&v(g))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});b.detach();return g};this.getTextElements=function(c,b,g){var d=c.startContainer.ownerDocument.createRange(),f;f=A.getNodesInRange(c,function(f){d.selectNodeContents(f);if(a(f.parentNode))return NodeFilter.FILTER_REJECT;if(f.nodeType===Node.TEXT_NODE){if(b&&A.rangesIntersect(c,d)||A.containsRange(c,d))if(g||Boolean(p(f)&&
(!l(f.textContent)||u(f,0))))return NodeFilter.FILTER_ACCEPT}else if(a(f)){if(b&&A.rangesIntersect(c,d)||A.containsRange(c,d))return NodeFilter.FILTER_ACCEPT}else if(v(f)||q(f))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});d.detach();return f};this.getParagraphElements=function(a){var c=a.startContainer.ownerDocument.createRange(),b;b=A.getNodesInRange(a,function(b){c.selectNodeContents(b);if(e(b)){if(A.rangesIntersect(a,c))return NodeFilter.FILTER_ACCEPT}else if(v(b)||q(b))return NodeFilter.FILTER_SKIP;
return NodeFilter.FILTER_REJECT});c.detach();return b};this.getImageElements=function(a){var c=a.startContainer.ownerDocument.createRange(),b;b=A.getNodesInRange(a,function(b){c.selectNodeContents(b);return h(b)&&A.containsRange(a,c)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});c.detach();return b}};
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
odf.TextSerializer=function(){function h(p){var l="",q=m.filter?m.filter.acceptNode(p):NodeFilter.FILTER_ACCEPT,a=p.nodeType,d;if(q===NodeFilter.FILTER_ACCEPT||q===NodeFilter.FILTER_SKIP)for(d=p.firstChild;d;)l+=h(d),d=d.nextSibling;q===NodeFilter.FILTER_ACCEPT&&(a===Node.ELEMENT_NODE&&e.isParagraph(p)?l+="\n":a===Node.TEXT_NODE&&p.textContent&&(l+=p.textContent));return l}var m=this,e=new odf.OdfUtils;this.filter=null;this.writeToString=function(e){if(!e)return"";e=h(e);"\n"===e[e.length-1]&&(e=
e.substr(0,e.length-1));return e}};
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
odf.TextStyleApplicator=function(h,m,e){function p(a){function d(a,b){return"object"===typeof a&&"object"===typeof b?Object.keys(a).every(function(f){return d(a[f],b[f])}):a===b}this.isStyleApplied=function(c){c=m.getAppliedStylesForElement(c);return d(a,c)}}function l(a){var k={};this.applyStyleToContainer=function(c){var g;g=c.getAttributeNS(d,"style-name");var n=c.ownerDocument;g=g||"";if(!k.hasOwnProperty(g)){var l=g,q;q=g?m.createDerivedStyleObject(g,"text",a):a;n=n.createElementNS(f,"style:style");
m.updateStyle(n,q);n.setAttributeNS(f,"style:name",h.generateStyleName());n.setAttributeNS(f,"style:family","text");n.setAttributeNS("urn:webodf:names:scope","scope","document-content");e.appendChild(n);k[l]=n}g=k[g].getAttributeNS(f,"name");c.setAttributeNS(d,"text:style-name",g)}}function q(b,f){var c=b.ownerDocument,g=b.parentNode,e,h,l=new core.LoopWatchDog(1E4);h=[];"span"!==g.localName||g.namespaceURI!==d?(e=c.createElementNS(d,"text:span"),g.insertBefore(e,b),g=!1):(b.previousSibling&&!a.rangeContainsNode(f,
g.firstChild)?(e=g.cloneNode(!1),g.parentNode.insertBefore(e,g.nextSibling)):e=g,g=!0);h.push(b);for(c=b.nextSibling;c&&a.rangeContainsNode(f,c);)l.check(),h.push(c),c=c.nextSibling;h.forEach(function(a){a.parentNode!==e&&e.appendChild(a)});if(c&&g)for(h=e.cloneNode(!1),e.parentNode.insertBefore(h,e.nextSibling);c;)l.check(),g=c.nextSibling,h.appendChild(c),c=g;return e}var a=new core.DomUtils,d=odf.Namespaces.textns,f=odf.Namespaces.stylens;this.applyStyle=function(a,d,c){var g={},f,e,h,m;runtime.assert(c&&
c["style:text-properties"],"applyStyle without any text properties");g["style:text-properties"]=c["style:text-properties"];h=new l(g);m=new p(g);a.forEach(function(a){f=m.isStyleApplied(a);!1===f&&(e=q(a,d),h.applyStyleToContainer(e))})}};
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
odf.Style2CSS=function(){function h(a){var c={},b,g;if(!a)return c;for(a=a.firstChild;a;){if(g=a.namespaceURI!==r||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===x&&"list-style"===a.localName?"list":a.namespaceURI!==r||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(r,"family"))(b=a.getAttributeNS&&a.getAttributeNS(r,"name"))||(b=""),g=c[g]=c[g]||{},g[b]=a;a=a.nextSibling}return c}function m(a,c){if(!c||!a)return null;if(a[c])return a[c];
var b,g;for(b in a)if(a.hasOwnProperty(b)&&(g=m(a[b].derivedStyles,c)))return g;return null}function e(a,c,b){var g=c[a],d,f;g&&(d=g.getAttributeNS(r,"parent-style-name"),f=null,d&&(f=m(b,d),!f&&c[d]&&(e(d,c,b),f=c[d],c[d]=null)),f?(f.derivedStyles||(f.derivedStyles={}),f.derivedStyles[a]=g):b[a]=g)}function p(a,c){for(var b in a)a.hasOwnProperty(b)&&(e(b,a,c),a[b]=null)}function l(a,c){var b=t[a],g;if(null===b)return null;g=c?"["+b+'|style-name="'+c+'"]':"";"presentation"===b&&(b="draw",g=c?'[presentation|style-name="'+
c+'"]':"");return b+"|"+s[a].join(g+","+b+"|")+g}function q(a,c,b){var g=[],d,f;g.push(l(a,c));for(d in b.derivedStyles)if(b.derivedStyles.hasOwnProperty(d))for(f in c=q(a,d,b.derivedStyles[d]),c)c.hasOwnProperty(f)&&g.push(c[f]);return g}function a(a,c,b){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===c&&a.localName===b)return c=a;a=a.nextSibling}return null}function d(a,c){var b="",g,d;for(g in c)if(c.hasOwnProperty(g)&&(g=c[g],d=a.getAttributeNS(g[0],g[1]))){d=d.trim();if(E.hasOwnProperty(g[1])){var f=
d.indexOf(" "),e=void 0,k=void 0;-1!==f?(e=d.substring(0,f),k=d.substring(f)):(e=d,k="");(e=ba.parseLength(e))&&"pt"===e.unit&&0.75>e.value&&(d="0.75pt"+k)}g[2]&&(b+=g[2]+":"+d+";")}return b}function f(c){return(c=a(c,r,"text-properties"))?ba.parseFoFontSize(c.getAttributeNS(n,"font-size")):null}function b(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,c,b,g){return c+c+b+b+g+g});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],
16)}:null}function k(a,c,b,g){c='text|list[text|style-name="'+c+'"]';var d=b.getAttributeNS(x,"level"),f;b=ba.getFirstNonWhitespaceChild(b);b=ba.getFirstNonWhitespaceChild(b);var e;b&&(f=b.attributes,e=f["fo:text-indent"]?f["fo:text-indent"].value:void 0,f=f["fo:margin-left"]?f["fo:margin-left"].value:void 0);e||(e="-0.6cm");b="-"===e.charAt(0)?e.substring(1):"-"+e;for(d=d&&parseInt(d,10);1<d;)c+=" > text|list-item > text|list",d-=1;d=c+" > text|list-item > *:not(text|list):first-child";void 0!==
f&&(f=d+"{margin-left:"+f+";}",a.insertRule(f,a.cssRules.length));g=c+" > text|list-item > *:not(text|list):first-child:before{"+g+";";g+="counter-increment:list;";g+="margin-left:"+e+";";g+="width:"+b+";";g+="display:inline-block}";try{a.insertRule(g,a.cssRules.length)}catch(k){throw k;}}function c(e,h,l,m){if("list"===h)for(var s=m.firstChild,p,u;s;){if(s.namespaceURI===x)if(p=s,"list-level-style-number"===s.localName){var t=p;u=t.getAttributeNS(r,"num-format");var P=t.getAttributeNS(r,"num-suffix"),
E={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},t=t.getAttributeNS(r,"num-prefix")||"",t=E.hasOwnProperty(u)?t+(" counter(list, "+E[u]+")"):u?t+("'"+u+"';"):t+" ''";P&&(t+=" '"+P+"'");u="content: "+t+";";k(e,l,p,u)}else"list-level-style-image"===s.localName?(u="content: none;",k(e,l,p,u)):"list-level-style-bullet"===s.localName&&(u="content: '"+p.getAttributeNS(x,"bullet-char")+"';",k(e,l,p,u));s=s.nextSibling}else if("page"===h)if(P=p=l="",s=m.getElementsByTagNameNS(r,
"page-layout-properties")[0],p=s.parentNode.parentNode.parentNode.masterStyles,P="",l+=d(s,Z),u=s.getElementsByTagNameNS(r,"background-image"),0<u.length&&(P=u.item(0).getAttributeNS(w,"href"))&&(l+="background-image: url('odfkit:"+P+"');",u=u.item(0),l+=d(u,A)),"presentation"===ga){if(p)for(u=p.getElementsByTagNameNS(r,"master-page"),E=0;E<u.length;E+=1)if(u[E].getAttributeNS(r,"page-layout-name")===s.parentNode.getAttributeNS(r,"name")){P=u[E].getAttributeNS(r,"name");p="draw|page[draw|master-page-name="+
P+"] {"+l+"}";P="office|body, draw|page[draw|master-page-name="+P+"] {"+d(s,ja)+" }";try{e.insertRule(p,e.cssRules.length),e.insertRule(P,e.cssRules.length)}catch($){throw $;}}}else{if("text"===ga){p="office|text {"+l+"}";P="office|body {width: "+s.getAttributeNS(n,"page-width")+";}";try{e.insertRule(p,e.cssRules.length),e.insertRule(P,e.cssRules.length)}catch(F){throw F;}}}else{l=q(h,l,m).join(",");s="";if(p=a(m,r,"text-properties")){var E=p,U;u=U="";P=1;p=""+d(E,D);t=E.getAttributeNS(r,"text-underline-style");
"solid"===t&&(U+=" underline");t=E.getAttributeNS(r,"text-line-through-style");"solid"===t&&(U+=" line-through");U.length&&(p+="text-decoration:"+U+";");if(U=E.getAttributeNS(r,"font-name")||E.getAttributeNS(n,"font-family"))t=ka[U],p+="font-family: "+(t||U)+";";t=E.parentNode;if(E=f(t)){for(;t;){if(E=f(t)){if("%"!==E.unit){u="font-size: "+E.value*P+E.unit+";";break}P*=E.value/100}E=t;U=t="";t=null;"default-style"===E.localName?t=null:(t=E.getAttributeNS(r,"parent-style-name"),U=E.getAttributeNS(r,
"family"),t=V.getODFElementsWithXPath(S,t?"//style:*[@style:name='"+t+"'][@style:family='"+U+"']":"//style:default-style[@style:family='"+U+"']",odf.Namespaces.resolvePrefix)[0])}u||(u="font-size: "+parseFloat(Y)*P+N.getUnits(Y)+";");p+=u}s+=p}if(p=a(m,r,"paragraph-properties"))u=p,p=""+d(u,C),P=u.getElementsByTagNameNS(r,"background-image"),0<P.length&&(E=P.item(0).getAttributeNS(w,"href"))&&(p+="background-image: url('odfkit:"+E+"');",P=P.item(0),p+=d(P,A)),(u=u.getAttributeNS(n,"line-height"))&&
"normal"!==u&&(u=ba.parseFoLineHeight(u),p="%"!==u.unit?p+("line-height: "+u.value+u.unit+";"):p+("line-height: "+u.value/100+";")),s+=p;if(p=a(m,r,"graphic-properties"))E=p,p=""+d(E,I),u=E.getAttributeNS(g,"opacity"),P=E.getAttributeNS(g,"fill"),E=E.getAttributeNS(g,"fill-color"),"solid"===P||"hatch"===P?E&&"none"!==E?(u=isNaN(parseFloat(u))?1:parseFloat(u)/100,(E=b(E))&&(p+="background-color: rgba("+E.r+","+E.g+","+E.b+","+u+");")):p+="background: none;":"none"===P&&(p+="background: none;"),s+=
p;if(p=a(m,r,"drawing-page-properties"))u=""+d(p,I),"true"===p.getAttributeNS(v,"background-visible")&&(u+="background: none;"),s+=u;if(p=a(m,r,"table-cell-properties"))p=""+d(p,z),s+=p;if(p=a(m,r,"table-row-properties"))p=""+d(p,H),s+=p;if(p=a(m,r,"table-column-properties"))p=""+d(p,M),s+=p;if(p=a(m,r,"table-properties"))u=p,p=""+d(u,R),u=u.getAttributeNS(y,"border-model"),"collapsing"===u?p+="border-collapse:collapse;":"separating"===u&&(p+="border-collapse:separate;"),s+=p;if(0!==s.length)try{e.insertRule(l+
"{"+s+"}",e.cssRules.length)}catch(J){throw J;}}for(var ia in m.derivedStyles)m.derivedStyles.hasOwnProperty(ia)&&c(e,h,ia,m.derivedStyles[ia])}var g=odf.Namespaces.drawns,n=odf.Namespaces.fons,r=odf.Namespaces.stylens,u=odf.Namespaces.svgns,y=odf.Namespaces.tablens,x=odf.Namespaces.textns,w=odf.Namespaces.xlinkns,v=odf.Namespaces.presentationns,t={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},D=[[n,"color","color"],[n,"background-color","background-color"],[n,"font-weight","font-weight"],[n,"font-style","font-style"]],A=[[r,"repeat",
"background-repeat"]],C=[[n,"background-color","background-color"],[n,"text-align","text-align"],[n,"text-indent","text-indent"],[n,"padding","padding"],[n,"padding-left","padding-left"],[n,"padding-right","padding-right"],[n,"padding-top","padding-top"],[n,"padding-bottom","padding-bottom"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"margin","margin"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],
[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"],[n,"border","border"]],I=[[n,"background-color","background-color"],[n,"min-height","min-height"],[g,"stroke","border"],[u,"stroke-color","border-color"],[u,"stroke-width","border-width"],[n,"border","border"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"]],z=[[n,"background-color","background-color"],[n,"border-left","border-left"],[n,"border-right",
"border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"border","border"]],M=[[r,"column-width","width"]],H=[[r,"row-height","height"],[n,"keep-together",null]],R=[[r,"width","width"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"]],Z=[[n,"background-color","background-color"],[n,"padding","padding"],[n,"padding-left","padding-left"],[n,"padding-right","padding-right"],[n,"padding-top",
"padding-top"],[n,"padding-bottom","padding-bottom"],[n,"border","border"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"margin","margin"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"]],ja=[[n,"page-width","width"],[n,"page-height","height"]],E={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,
"stroke-width":!0},ka={},ba=new odf.OdfUtils,ga,S,Y,V=new xmldom.XPath,N=new core.CSSUnits;this.style2css=function(a,b,g,d,f){for(var e,k,l,n;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);e=null;d&&(e=d.ownerDocument,S=d.parentNode);f&&(e=f.ownerDocument,S=f.parentNode);if(e)for(n in odf.Namespaces.forEachPrefix(function(a,c){l="@namespace "+a+" url("+c+");";try{b.insertRule(l,b.cssRules.length)}catch(g){}}),ka=g,ga=a,Y=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||
"12pt",a=h(d),d=h(f),f={},t)if(t.hasOwnProperty(n))for(k in g=f[n]={},p(a[n],g),p(d[n],g),g)g.hasOwnProperty(k)&&c(b,n,k,g[k])}};
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
odf.OdfContainer=function(){function h(a,c,b){for(a=a?a.firstChild:null;a;){if(a.localName===b&&a.namespaceURI===c)return a;a=a.nextSibling}return null}function m(a){var c,d=b.length;for(c=0;c<d;c+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&a.localName===b[c])return c;return-1}function e(a,c){var b=new d.UsedStyleList(a,c),f=new odf.OdfNodeFilter;this.acceptNode=function(a){var g=f.acceptNode(a);g===NodeFilter.FILTER_ACCEPT&&a.parentNode===c&&a.nodeType===Node.ELEMENT_NODE&&
(g=b.uses(a)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return g}}function p(a,c){var b=new e(a,c);this.acceptNode=function(a){var c=b.acceptNode(a);c!==NodeFilter.FILTER_ACCEPT||!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName||(c=NodeFilter.FILTER_REJECT);return c}}function l(a,c){if(c){var b=m(c),d,f=a.firstChild;if(-1!==b){for(;f;){d=m(f);if(-1!==d&&d>b)break;f=f.nextSibling}a.insertBefore(c,f)}}}function q(a){this.OdfContainer=
a}function a(a,c,b,d){var f=this;this.size=0;this.type=null;this.name=a;this.container=b;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=c,d.loadAsDataURL(a,c,function(a,c){a&&runtime.log(a);f.url=c;if(f.onchange)f.onchange(f);if(f.onstatereadychange)f.onstatereadychange(f)}))}}var d=new odf.StyleInfo,f=odf.Namespaces.stylens,b="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),
k=(new Date).getTime()+"_webodf_",c=new core.Base64;q.prototype=new function(){};q.prototype.constructor=q;q.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";q.localName="document";a.prototype.load=function(){};a.prototype.getUrl=function(){return this.data?"data:;base64,"+c.toBase64(this.data):null};odf.OdfContainer=function n(b,m){function y(a){for(var c=a.firstChild,b;c;)b=c.nextSibling,c.nodeType===Node.ELEMENT_NODE?y(c):c.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(c),
c=b}function x(a,c){for(var b=a&&a.firstChild;b;)b.nodeType===Node.ELEMENT_NODE&&b.setAttributeNS("urn:webodf:names:scope","scope",c),b=b.nextSibling}function w(a,c){function b(a,c,d){var f=0,e;for(e=a=a.replace(/\d+$/,"");c.hasOwnProperty(e)||d.hasOwnProperty(e);)f+=1,e=a+f;return e}function d(a){var c={};for(a=a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&a.namespaceURI===f&&"font-face"===a.localName&&(h=a.getAttributeNS(f,"name"),c[h]=a),a=a.nextSibling;return c}var e,k,h,l,n,m,s={};n=d(a);m=
d(c);for(e=c.firstChild;e;)k=e.nextSibling,e.nodeType===Node.ELEMENT_NODE&&e.namespaceURI===f&&"font-face"===e.localName&&(h=e.getAttributeNS(f,"name"),n.hasOwnProperty(h)?e.isEqualNode(n[h])||(l=b(h,n,m),e.setAttributeNS(f,"style:name",l),a.appendChild(e),n[l]=e,delete m[h],s[h]=l):(a.appendChild(e),n[h]=e,delete m[h])),e=k;return s}function v(a,c){var b=null,d,f,e;if(a)for(b=a.cloneNode(!0),d=b.firstChild;d;)f=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(e=d.getAttributeNS("urn:webodf:names:scope",
"scope"))&&e!==c&&b.removeChild(d),d=f;return b}function t(a,c){var b=null,e,k,h,l={};if(a)for(c.forEach(function(a){d.collectUsedFontFaces(l,a)}),b=a.cloneNode(!0),e=b.firstChild;e;)k=e.nextSibling,e.nodeType===Node.ELEMENT_NODE&&(h=e.getAttributeNS(f,"name"),l[h]||b.removeChild(e)),e=k;return b}function s(a){var c=G.rootElement.ownerDocument,b;if(a){y(a.documentElement);try{b=c.importNode(a.documentElement,!0)}catch(d){}}return b}function D(a){G.state=a;if(G.onchange)G.onchange(G);if(G.onstatereadychange)G.onstatereadychange(G)}
function A(a){ca=null;G.rootElement=a;a.fontFaceDecls=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");a.styles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");a.automaticStyles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");a.masterStyles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");a.body=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");a.meta=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta")}function C(a){a=s(a);var c=G.rootElement;a&&"document-styles"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI?(c.fontFaceDecls=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),l(c,c.fontFaceDecls),c.styles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),l(c,c.styles),c.automaticStyles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),x(c.automaticStyles,"document-styles"),l(c,c.automaticStyles),
c.masterStyles=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),l(c,c.masterStyles),d.prefixStyleNames(c.automaticStyles,k,c.masterStyles)):D(n.INVALID)}function I(a){a=s(a);var c,b,f;if(a&&"document-content"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI){c=G.rootElement;b=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");c.fontFaceDecls&&b?f=w(c.fontFaceDecls,b):b&&(c.fontFaceDecls=b,l(c,b));b=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"automatic-styles");x(b,"document-content");f&&d.changeFontFaceNames(b,f);if(c.automaticStyles&&b)for(f=b.firstChild;f;)c.automaticStyles.appendChild(f),f=b.firstChild;else b&&(c.automaticStyles=b,l(c,b));c.body=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");l(c,c.body)}else D(n.INVALID)}function z(a){a=s(a);var c;a&&"document-meta"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(c=G.rootElement,c.meta=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"meta"),l(c,c.meta))}function M(a){a=s(a);var c;a&&"document-settings"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&(c=G.rootElement,c.settings=h(a,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),l(c,c.settings))}function H(a){a=s(a);var c;if(a&&"manifest"===a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI)for(c=G.rootElement,c.manifest=a,a=c.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&"file-entry"===
a.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===a.namespaceURI&&(O[a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),a=a.nextSibling}function R(a){var c=a.shift(),b,d;c?(b=c[0],d=c[1],Q.loadAsDOM(b,function(c,b){d(b);c||G.state===n.INVALID||R(a)})):D(n.DONE)}function Z(a){var c="";odf.Namespaces.forEachPrefix(function(a,b){c+=" xmlns:"+a+'="'+b+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+
a+" "+c+' office:version="1.2">'}function ja(){var a=new xmldom.LSSerializer,c=Z("document-meta");a.filter=new odf.OdfNodeFilter;c+=a.writeToString(G.rootElement.meta,odf.Namespaces.namespaceMap);return c+"</office:document-meta>"}function E(a,c){var b=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");b.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:full-path",a);b.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
"manifest:media-type",c);return b}function ka(){var a=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'),c=h(a,"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest"),b=new xmldom.LSSerializer,d;for(d in O)O.hasOwnProperty(d)&&c.appendChild(E(d,O[d]));b.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+b.writeToString(a,odf.Namespaces.namespaceMap)}
function ba(){var a=new xmldom.LSSerializer,c=Z("document-settings");a.filter=new odf.OdfNodeFilter;c+=a.writeToString(G.rootElement.settings,odf.Namespaces.namespaceMap);return c+"</office:document-settings>"}function ga(){var a=odf.Namespaces.namespaceMap,c=new xmldom.LSSerializer,b,f,h,l=Z("document-styles");f=v(G.rootElement.automaticStyles,"document-styles");h=G.rootElement.masterStyles&&G.rootElement.masterStyles.cloneNode(!0);b=t(G.rootElement.fontFaceDecls,[h,G.rootElement.styles,f]);d.removePrefixFromStyleNames(f,
k,h);c.filter=new e(h,f);l+=c.writeToString(b,a);l+=c.writeToString(G.rootElement.styles,a);l+=c.writeToString(f,a);l+=c.writeToString(h,a);return l+"</office:document-styles>"}function S(){var a=odf.Namespaces.namespaceMap,c=new xmldom.LSSerializer,b,d,f=Z("document-content");d=v(G.rootElement.automaticStyles,"document-content");b=t(G.rootElement.fontFaceDecls,[d]);c.filter=new p(G.rootElement.body,d);f+=c.writeToString(b,a);f+=c.writeToString(d,a);f+=c.writeToString(G.rootElement.body,a);return f+
"</office:document-content>"}function Y(a,c){runtime.loadXML(a,function(a,b){if(a)c(a);else{var d=s(b);d&&"document"===d.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===d.namespaceURI?(A(d),D(n.DONE)):D(n.INVALID)}})}function V(){function a(c,b){var f;b||(b=c);f=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",b);d[c]=f;d.appendChild(f)}var c=new core.Zip("",null),b=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),d=G.rootElement,
f=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","text");c.save("mimetype",b,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");d.body.appendChild(f);D(n.DONE);return c}function N(){var a,c=new Date;a=runtime.byteArrayFromString(ba(),"utf8");Q.save("settings.xml",a,!0,c);a=runtime.byteArrayFromString(ja(),"utf8");Q.save("meta.xml",a,!0,c);
a=runtime.byteArrayFromString(ga(),"utf8");Q.save("styles.xml",a,!0,c);a=runtime.byteArrayFromString(S(),"utf8");Q.save("content.xml",a,!0,c);a=runtime.byteArrayFromString(ka(),"utf8");Q.save("META-INF/manifest.xml",a,!0,c)}function L(a,c){N();Q.writeAs(a,function(a){c(a)})}var G=this,Q,O={},ca;this.onstatereadychange=m;this.rootElement=this.state=this.onchange=null;this.setRootElement=A;this.getContentElement=function(){var a;ca||(a=G.rootElement.body,ca=a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"text")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","presentation")[0]||a.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet")[0]);return ca};this.getDocumentType=function(){var a=G.getContentElement();return a&&a.localName};this.getPart=function(c){return new a(c,O[c],G,Q)};this.getPartData=function(a,c){Q.load(a,c)};this.createByteArray=function(a,c){N();Q.createByteArray(a,c)};this.saveAs=L;this.save=function(a){L(b,a)};this.getUrl=
function(){return b};this.setBlob=function(a,b,d){d=c.convertBase64ToByteArray(d);Q.save(a,d,!1,new Date);O.hasOwnProperty(a)&&runtime.log(a+" has been overwritten.");O[a]=b};this.removeBlob=function(a){var c=Q.remove(a);runtime.assert(c,"file is not found: "+a);delete O[a]};this.state=n.LOADING;this.rootElement=function(a){var c=document.createElementNS(a.namespaceURI,a.localName),b;a=new a;for(b in a)a.hasOwnProperty(b)&&(c[b]=a[b]);return c}(q);Q=b?new core.Zip(b,function(a,c){Q=c;a?Y(b,function(c){a&&
(Q.error=a+"\n"+c,D(n.INVALID))}):R([["styles.xml",C],["content.xml",I],["meta.xml",z],["settings.xml",M],["META-INF/manifest.xml",H]])}):V()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(a){return new odf.OdfContainer(a,null)};return odf.OdfContainer}();
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
odf.FontLoader=function(){function h(m,l,q,a,d){var f,b=0,k;for(k in m)if(m.hasOwnProperty(k)){if(b===q){f=k;break}b+=1}f?l.getPartData(m[f].href,function(c,b){if(c)runtime.log(c);else{var k="@font-face { font-family: '"+(m[f].family||f)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+e.convertUTF8ArrayToBase64(b)+') format("truetype"); }';try{a.insertRule(k,a.cssRules.length)}catch(r){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(r)+"\nRule: "+k)}}h(m,l,q+1,a,d)}):
d&&d()}var m=new xmldom.XPath,e=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(e,l){for(var q=e.rootElement.fontFaceDecls;l.cssRules.length;)l.deleteRule(l.cssRules.length-1);if(q){var a={},d,f,b,k;if(q)for(q=m.getODFElementsWithXPath(q,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),d=0;d<q.length;d+=1)f=q[d],b=f.getAttributeNS(odf.Namespaces.stylens,"name"),k=f.getAttributeNS(odf.Namespaces.svgns,"font-family"),f=m.getODFElementsWithXPath(f,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<f.length&&(f=f[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),a[b]={href:f,family:k});h(a,e,0,l)}}};return odf.FontLoader}();
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
odf.ObjectNameGenerator=function(h,m){function e(a,c){var b={};this.generateName=function(){var d=c(),g=0,f;do f=a+g,g+=1;while(b[f]||d[f]);b[f]=!0;return f}}function p(){var a,c={};[h.rootElement.automaticStyles,h.rootElement.styles].forEach(function(b){for(a=b.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&a.namespaceURI===l&&"style"===a.localName&&(c[a.getAttributeNS(l,"name")]=!0),a=a.nextSibling});return c}var l=odf.Namespaces.stylens,q=odf.Namespaces.drawns,a=odf.Namespaces.xlinkns,d=new core.DomUtils,
f=(new core.Utils).hashString(m),b=null,k=null,c=null,g={},n={};this.generateStyleName=function(){null===b&&(b=new e("auto"+f+"_",function(){return p()}));return b.generateName()};this.generateFrameName=function(){null===k&&(d.getElementsByTagNameNS(h.rootElement.body,q,"frame").forEach(function(a){g[a.getAttributeNS(q,"name")]=!0}),k=new e("fr"+f+"_",function(){return g}));return k.generateName()};this.generateImageName=function(){null===c&&(d.getElementsByTagNameNS(h.rootElement.body,q,"image").forEach(function(c){c=
c.getAttributeNS(a,"href");c=c.substring(9,c.lastIndexOf("."));n[c]=!0}),c=new e("img"+f+"_",function(){return n}));return c.generateName()}};
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
odf.Formatting=function(){function h(){for(var a=k.rootElement.fontFaceDecls,c={},b,d,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(b=a.getAttributeNS(n,"name"))&&((d=a.getAttributeNS(g,"font-family"))||a.getElementsByTagNameNS(g,"font-face-uri")[0])&&(c[b]=d),a=a.nextSibling;return c}function m(a){for(var c=k.rootElement.styles.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===n&&"default-style"===c.localName&&c.getAttributeNS(n,"family")===a)return c;c=c.nextSibling}return null}
function e(a,c,b){var d,g;b=b||[k.rootElement.automaticStyles,k.rootElement.styles];for(d=b.shift();d;){for(d=d.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE&&(g=d.getAttributeNS(n,"name"),d.namespaceURI===n&&"style"===d.localName&&d.getAttributeNS(n,"family")===c&&g===a||"list-style"===c&&d.namespaceURI===r&&"list-style"===d.localName&&g===a||"data"===c&&d.namespaceURI===u&&g===a))return d;d=d.nextSibling}d=b.shift()}return null}function p(a){for(var c,b={},d=a.firstChild;d;){if(d.nodeType===
Node.ELEMENT_NODE&&d.namespaceURI===n)for(b[d.nodeName]={},c=0;c<d.attributes.length;c+=1)b[d.nodeName][d.attributes[c].name]=d.attributes[c].value;d=d.nextSibling}for(c=0;c<a.attributes.length;c+=1)b[a.attributes[c].name]=a.attributes[c].value;return b}function l(a,c){Object.keys(c).forEach(function(b){var d=b.split(":"),g=d[1],f=odf.Namespaces.resolvePrefix(d[0]),d=c[b];"object"===typeof d&&Object.keys(d).length?(b=a.getElementsByTagNameNS(f,g)[0]||a.ownerDocument.createElementNS(f,b),a.appendChild(b),
l(b,d)):f&&a.setAttributeNS(f,b,d)})}function q(a,c){for(var b=k.rootElement.styles,d,g={},f=a.getAttributeNS(n,"family"),h=a;h;)d=p(h),g=v.mergeObjects(d,g),h=(d=h.getAttributeNS(n,"parent-style-name"))?e(d,f,[b]):null;if(h=m(f))d=p(h),g=v.mergeObjects(d,g);c&&(d=(b=t[f])?v.mergeObjects({},b):null)&&(g=v.mergeObjects(d,g));return g}function a(a,b){for(var d=a.nodeType===Node.TEXT_NODE?a.parentNode:a,g,f=[],e="",k=!1;d;)!k&&x.isGroupingElement(d)&&(k=!0),(g=c.determineStylesForNode(d))&&f.push(g),
d=d.parentNode;k&&(f.forEach(function(a){Object.keys(a).forEach(function(c){Object.keys(a[c]).forEach(function(a){e+="|"+c+":"+a+"|"})})}),b&&(b[e]=f));return k?f:void 0}function d(a){var c={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(b){var d=Object.keys(a[b])[0],g,f;(g=e(d,b))?(f=q(g),c=v.mergeObjects(f,c),f=g.getAttributeNS(n,"display-name")):runtime.log("No style element found for '"+d+"' of family '"+b+"'");c.orderedStyles.push({name:d,family:b,displayName:f})})});
return c}function f(a,c){var b=x.parseLength(a),d=c;if(b)switch(b.unit){case "cm":d=b.value;break;case "mm":d=0.1*b.value;break;case "in":d=2.54*b.value;break;case "pt":d=0.035277778*b.value;break;case "pc":case "px":case "em":break;default:runtime.log("Unit identifier: "+b.unit+" is not supported.")}return d}var b=this,k,c=new odf.StyleInfo,g=odf.Namespaces.svgns,n=odf.Namespaces.stylens,r=odf.Namespaces.textns,u=odf.Namespaces.numberns,y=odf.Namespaces.fons,x=new odf.OdfUtils,w=new core.DomUtils,
v=new core.Utils,t={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.setOdfContainer=function(a){k=a};this.getFontMap=h;this.getAvailableParagraphStyles=function(){for(var a=k.rootElement.styles&&k.rootElement.styles.firstChild,c,b,d=[];a;)a.nodeType===Node.ELEMENT_NODE&&"style"===a.localName&&a.namespaceURI===n&&(b=a,c=b.getAttributeNS(n,"family"),"paragraph"===c&&(c=b.getAttributeNS(n,"name"),b=b.getAttributeNS(n,"display-name")||c,c&&b&&d.push({name:c,displayName:b}))),a=
a.nextSibling;return d};this.isStyleUsed=function(a){var b;b=c.hasDerivedStyles(k.rootElement,odf.Namespaces.resolvePrefix,a);a=(new c.UsedStyleList(k.rootElement.styles)).uses(a)||(new c.UsedStyleList(k.rootElement.automaticStyles)).uses(a)||(new c.UsedStyleList(k.rootElement.body)).uses(a);return b||a};this.getDefaultStyleElement=m;this.getStyleElement=e;this.getStyleAttributes=p;this.getInheritedStyleAttributes=q;this.getFirstCommonParentStyleNameOrSelf=function(a){var c=k.rootElement.automaticStyles,
b=k.rootElement.styles,d;for(d=e(a,"paragraph",[c]);d;)a=d.getAttributeNS(n,"parent-style-name"),d=e(a,"paragraph",[c]);return(d=e(a,"paragraph",[b]))?a:null};this.hasParagraphStyle=function(a){return Boolean(e(a,"paragraph"))};this.getAppliedStyles=function(c){var b={},g=[];c.forEach(function(c){a(c,b)});Object.keys(b).forEach(function(a){g.push(d(b[a]))});return g};this.getAppliedStylesForElement=function(c){return(c=a(c))?d(c):void 0};this.applyStyle=function(a,c,d,g){(new odf.TextStyleApplicator(new odf.ObjectNameGenerator(k,
a),b,k.rootElement.automaticStyles)).applyStyle(c,d,g)};this.updateStyle=function(a,c){var b,d;l(a,c);(b=c["style:text-properties"]&&c["style:text-properties"]["style:font-name"])&&!h().hasOwnProperty(b)&&(d=a.ownerDocument.createElementNS(n,"style:font-face"),d.setAttributeNS(n,"style:name",b),d.setAttributeNS(g,"svg:font-family",b),k.rootElement.fontFaceDecls.appendChild(d))};this.createDerivedStyleObject=function(a,c,b){var d=e(a,c);runtime.assert(Boolean(d),"No style element found for '"+a+"' of family '"+
c+"'");a=d.parentNode===k.rootElement.automaticStyles?p(d):{"style:parent-style-name":a};a["style:family"]=c;v.mergeObjects(a,b);return a};this.getDefaultTabStopDistance=function(){var a=m("paragraph");(a=(a=a&&a.getAttributeNS(n,"paragraph-properties"))&&a.getAttributeNS(n,"tab-stop-distance"))||(a="1.25cm");return x.parseNonNegativeLength(a)};this.getContentSize=function(a,c){var b,d,g,h,l,m,p,q,r,x,u,t;a:{b=e(a,c);var v,S,Y;runtime.assert("paragraph"===c||"table"===c,"styleFamily has to be either paragraph or table");
if(b){v=b.getAttributeNS(n,"master-page-name")||"Standard";for(b=k.rootElement.masterStyles.lastChild;b&&b.previousSibling&&b.getAttributeNS(n,"name")!==v;)b=b.previousSibling;v=b.getAttributeNS(n,"page-layout-name");S=w.getElementsByTagNameNS(k.rootElement.automaticStyles,n,"page-layout");for(Y=0;Y<S.length;Y+=1)if(b=S[Y],b.getAttributeNS(n,"name")===v)break a}b=null}b||(b=k.rootElement.styles.getElementsByTagNameNS(n,"default-page-layout")[0]);b&&(d=b.getElementsByTagNameNS(n,"page-layout-properties")[0]);
d&&(g=d.getAttributeNS(n,"print-orientation")||"portrait","portrait"===g?(g=21.001,h=29.7):(g=29.7,h=21.001),g=f(d.getAttributeNS(y,"page-width"),g),h=f(d.getAttributeNS(y,"page-height"),h),l=f(d.getAttributeNS(y,"margin"),null),null===l?(l=f(d.getAttributeNS(y,"margin-left"),2),m=f(d.getAttributeNS(y,"margin-right"),2),p=f(d.getAttributeNS(y,"margin-top"),2),q=f(d.getAttributeNS(y,"margin-bottom"),2)):l=m=p=q=l,r=f(d.getAttributeNS(y,"padding"),null),null===r?(r=f(d.getAttributeNS(y,"padding-left"),
0),x=f(d.getAttributeNS(y,"padding-right"),0),u=f(d.getAttributeNS(y,"padding-top"),0),t=f(d.getAttributeNS(y,"padding-bottom"),0)):r=x=u=t=r);return{width:g-l-m-r-x,height:h-p-q-u-t}}};
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
odf.OdfCanvas=function(){function h(){function a(d){b=!0;runtime.setTimeout(function(){try{d()}catch(g){runtime.log(g)}b=!1;0<c.length&&a(c.pop())},10)}var c=[],b=!1;this.clearQueue=function(){c.length=0};this.addToQueue=function(d){if(0===c.length&&!b)return a(d);c.push(d)}}function m(a){function c(){for(;0<b.cssRules.length;)b.deleteRule(0);b.insertRule("#shadowContent draw|page {display:none;}",0);b.insertRule("office|presentation draw|page {display:none;}",1);b.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);b.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var b=a.sheet,d=1;this.showFirstPage=function(){d=1;c()};this.showNextPage=function(){d+=1;c()};this.showPreviousPage=function(){1<d&&(d-=1,c())};this.showPage=function(a){0<a&&(d=a,c())};this.css=a;this.destroy=function(c){a.parentNode.removeChild(a);c()}}function e(a,c,b){a.addEventListener?a.addEventListener(c,b,!1):a.attachEvent?a.attachEvent("on"+c,b):a["on"+c]=b}function p(a,c,b){var d=
"on"+c;a.removeEventListener?a.removeEventListener(c,b,!1):a.detachEvent?a.detachEvent(d,b):a[d]===b&&(a[d]=null)}function l(a){function c(a,b){for(;b;){if(b===a)return!0;b=b.parentNode}return!1}function b(){var f=[],e=runtime.getWindow().getSelection(),k,h;for(k=0;k<e.rangeCount;k+=1)h=e.getRangeAt(k),null!==h&&c(a,h.startContainer)&&c(a,h.endContainer)&&f.push(h);if(f.length===d.length){for(e=0;e<f.length&&(k=f[e],h=d[e],k=k===h?!1:null===k||null===h?!0:k.startContainer!==h.startContainer||k.startOffset!==
h.startOffset||k.endContainer!==h.endContainer||k.endOffset!==h.endOffset,!k);e+=1);if(e===f.length)return}d=f;var e=[f.length],l,n=a.ownerDocument;for(k=0;k<f.length;k+=1)h=f[k],l=n.createRange(),l.setStart(h.startContainer,h.startOffset),l.setEnd(h.endContainer,h.endOffset),e[k]=l;d=e;e=g.length;for(f=0;f<e;f+=1)g[f](a,d)}var d=[],g=[];this.addListener=function(a,c){var b,d=g.length;for(b=0;b<d;b+=1)if(g[b]===c)return;g.push(c)};this.destroy=function(c){p(a,"mouseup",b);p(a,"keyup",b);p(a,"keydown",
b);c()};e(a,"mouseup",b);e(a,"keyup",b);e(a,"keydown",b)}function q(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function a(a,c,b){(new odf.Style2CSS).style2css(a.getDocumentType(),b.sheet,c.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function d(a,c,b){var d=null;a=a.rootElement.body.getElementsByTagNameNS(H,b+"-decl");if((b=c.getAttributeNS(H,"use-"+b+"-name"))&&0<a.length)for(c=0;c<a.length;c+=1)if(a[c].getAttributeNS(H,"name")===b){d=a[c].textContent;break}return d}function f(a,
c,b,d){var g=a.ownerDocument;c=a.getElementsByTagNameNS(c,b);for(a=0;a<c.length;a+=1)q(c[a]),d&&c[a].appendChild(g.createTextNode(d))}function b(a,c,b){c.setAttributeNS("urn:webodf:names:helper","styleid",a);var d,g=c.getAttributeNS(I,"anchor-type"),f=c.getAttributeNS(A,"x"),e=c.getAttributeNS(A,"y"),k=c.getAttributeNS(A,"width"),h=c.getAttributeNS(A,"height"),l=c.getAttributeNS(t,"min-height"),n=c.getAttributeNS(t,"min-width");if("as-char"===g)d="display: inline-block;";else if(g||f||e)d="position: absolute;";
else if(k||h||l||n)d="display: block;";f&&(d+="left: "+f+";");e&&(d+="top: "+e+";");k&&(d+="width: "+k+";");h&&(d+="height: "+h+";");l&&(d+="min-height: "+l+";");n&&(d+="min-width: "+n+";");d&&(d="draw|"+c.localName+'[webodfhelper|styleid="'+a+'"] {'+d+"}",b.insertRule(d,b.cssRules.length))}function k(a){for(a=a.firstChild;a;){if(a.namespaceURI===s&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function c(a,c,b,d){function g(c){c&&
(c='draw|image[webodfhelper|styleid="'+a+'"] {'+("background-image: url("+c+");")+"}",d.insertRule(c,d.cssRules.length))}b.setAttributeNS("urn:webodf:names:helper","styleid",a);var f=b.getAttributeNS(z,"href"),e;if(f)try{e=c.getPart(f),e.onchange=function(a){g(a.url)},e.load()}catch(h){runtime.log("slight problem: "+h)}else f=k(b),g(f)}function g(a){function c(b){var d,g;b.hasAttributeNS(z,"href")&&(d=b.getAttributeNS(z,"href"),"#"===d[0]?(d=d.substring(1),g=function(){var c=Z.getODFElementsWithXPath(a,
"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===c.length&&(c=Z.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));0<c.length&&c[0].scrollIntoView(!0);return!1}):g=function(){R.open(d)},b.onclick=g)}var b,d,g;d=a.getElementsByTagNameNS(I,"a");for(b=0;b<d.length;b+=1)g=d.item(b),c(g)}function n(a){var c=a.ownerDocument;E.getElementsByTagNameNS(a,I,"line-break").forEach(function(a){a.hasChildNodes()||a.appendChild(c.createElement("br"))})}
function r(a){var c=a.ownerDocument;E.getElementsByTagNameNS(a,I,"s").forEach(function(a){for(var b,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(c.createTextNode(" "));d=parseInt(a.getAttributeNS(I,"c"),10);if(1<d)for(a.removeAttributeNS(I,"c"),b=1;b<d;b+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function u(a){E.getElementsByTagNameNS(a,I,"tab").forEach(function(a){a.textContent="\t"})}function y(a,c){function b(a,f){var k=e.documentElement.namespaceURI;"video/"===f.substr(0,6)?
(d=e.createElementNS(k,"video"),d.setAttribute("controls","controls"),g=e.createElementNS(k,"source"),g.setAttribute("src",a),g.setAttribute("type",f),d.appendChild(g),c.parentNode.appendChild(d)):c.innerHtml="Unrecognised Plugin"}var d,g,f,e=c.ownerDocument,h;if(f=c.getAttributeNS(z,"href"))try{h=a.getPart(f),h.onchange=function(a){b(a.url,a.mimetype)},h.load()}catch(l){runtime.log("slight problem: "+l)}else runtime.log("using MP4 data fallback"),f=k(c),b(f,"video/mp4")}function x(a){var c=a.getElementsByTagName("head")[0],
b;"undefined"!==String(typeof webodf_css)?(b=a.createElementNS(c.namespaceURI,"style"),b.setAttribute("media","screen, print, handheld, projection"),b.appendChild(a.createTextNode(webodf_css))):(b=a.createElementNS(c.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),b.setAttribute("href",a),b.setAttribute("rel","stylesheet"));b.setAttribute("type","text/css");c.appendChild(b);return b}function w(a){var c=a.getElementsByTagName("head")[0],b=a.createElementNS(c.namespaceURI,
"style"),d="";b.setAttribute("type","text/css");b.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,c){d+="@namespace "+a+" url("+c+");\n"});d+="@namespace webodfhelper url(urn:webodf:names:helper);\n";b.appendChild(a.createTextNode(d));c.appendChild(b);return b}var v=odf.Namespaces.drawns,t=odf.Namespaces.fons,s=odf.Namespaces.officens,D=odf.Namespaces.stylens,A=odf.Namespaces.svgns,C=odf.Namespaces.tablens,I=odf.Namespaces.textns,z=odf.Namespaces.xlinkns,
M=odf.Namespaces.xmlns,H=odf.Namespaces.presentationns,R=runtime.getWindow(),Z=new xmldom.XPath,ja=new odf.OdfUtils,E=new core.DomUtils;odf.OdfCanvas=function(k){function p(a,b,d){function g(a,b,d,f){B.addToQueue(function(){c(a,b,d,f)})}var f,e;f=b.getElementsByTagNameNS(v,"image");for(b=0;b<f.length;b+=1)e=f.item(b),g("image"+String(b),a,e,d)}function t(a,c){function b(a,c){B.addToQueue(function(){y(a,c)})}var d,g,f;g=c.getElementsByTagNameNS(v,"plugin");for(d=0;d<g.length;d+=1)f=g.item(d),b(a,f)}
function A(){T.firstChild&&(1<W?(T.style.MozTransformOrigin="center top",T.style.WebkitTransformOrigin="center top",T.style.OTransformOrigin="center top",T.style.msTransformOrigin="center top"):(T.style.MozTransformOrigin="left top",T.style.WebkitTransformOrigin="left top",T.style.OTransformOrigin="left top",T.style.msTransformOrigin="left top"),T.style.WebkitTransform="scale("+W+")",T.style.MozTransform="scale("+W+")",T.style.OTransform="scale("+W+")",T.style.msTransform="scale("+W+")",k.style.width=
Math.round(W*T.offsetWidth)+"px",k.style.height=Math.round(W*T.offsetHeight)+"px")}function z(a){function c(a){return d===a.getAttributeNS(s,"name")}var b=E.getElementsByTagNameNS(a,s,"annotation");a=E.getElementsByTagNameNS(a,s,"annotation-end");var d,g;for(g=0;g<b.length;g+=1)d=b[g].getAttributeNS(s,"name"),$.addAnnotation({node:b[g],end:a.filter(c)[0]||null});$.rerenderAnnotations()}function V(a){ra?(P.parentNode||(T.appendChild(P),A()),$&&$.forgetAnnotations(),$=new gui.AnnotationViewManager(G,
a.body,P),z(a.body)):P.parentNode&&(T.removeChild(P),$.forgetAnnotations(),A())}function N(c){function e(){q(k);k.style.display="inline-block";var h=O.rootElement;k.ownerDocument.importNode(h,!0);ca.setOdfContainer(O);var l=O,m=U;(new odf.FontLoader).loadFonts(l,m.sheet);a(O,ca,J);m=O;l=ia.sheet;q(k);T=Q.createElementNS(k.namespaceURI,"div");T.style.display="inline-block";T.style.background="white";T.appendChild(h);k.appendChild(T);P=Q.createElementNS(k.namespaceURI,"div");P.id="annotationsPane";
fa=Q.createElementNS(k.namespaceURI,"div");fa.id="shadowContent";fa.style.position="absolute";fa.style.top=0;fa.style.left=0;m.getContentElement().appendChild(fa);var x=h.body,w,y,z;y=[];for(w=x.firstChild;w&&w!==x;)if(w.namespaceURI===v&&(y[y.length]=w),w.firstChild)w=w.firstChild;else{for(;w&&w!==x&&!w.nextSibling;)w=w.parentNode;w&&w.nextSibling&&(w=w.nextSibling)}for(z=0;z<y.length;z+=1)w=y[z],b("frame"+String(z),w,l);y=Z.getODFElementsWithXPath(x,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);
for(w=0;w<y.length;w+=1)x=y[w],x.setAttributeNS&&x.setAttributeNS("urn:webodf:names:helper","containsparagraphanchor",!0);var x=fa,E,B,K;K=0;var F,N;y=m.rootElement.ownerDocument;if((w=h.body.firstElementChild)&&w.namespaceURI===s&&("presentation"===w.localName||"drawing"===w.localName))for(w=w.firstElementChild;w;){z=w.getAttributeNS(v,"master-page-name");if(z){E=m.rootElement.masterStyles.getElementsByTagNameNS(D,"master-page");B=null;K=void 0;for(K=0;K<E.length;K+=1)if(E[K].getAttributeNS(D,"name")===
z){B=E[K];break}z=B}else z=null;if(z){E=w.getAttributeNS("urn:webodf:names:helper","styleid");B=y.createElementNS(v,"draw:page");N=z.firstElementChild;for(F=0;N;)"true"!==N.getAttributeNS(H,"placeholder")&&(K=N.cloneNode(!0),B.appendChild(K),b(E+"_"+F,K,l)),N=N.nextElementSibling,F+=1;N=F=K=void 0;var L=B.getElementsByTagNameNS(v,"frame");for(K=0;K<L.length;K+=1)F=L[K],(N=F.getAttributeNS(H,"class"))&&!/^(date-time|footer|header|page-number')$/.test(N)&&F.parentNode.removeChild(F);x.appendChild(B);
K=String(x.getElementsByTagNameNS(v,"page").length);f(B,I,"page-number",K);f(B,H,"header",d(m,w,"header"));f(B,H,"footer",d(m,w,"footer"));b(E,B,l);B.setAttributeNS(v,"draw:master-page-name",z.getAttributeNS(D,"name"))}w=w.nextElementSibling}w=h.body.getElementsByTagNameNS(C,"table-cell");for(x=0;x<w.length;x+=1)y=w.item(x),y.hasAttributeNS(C,"number-columns-spanned")&&y.setAttribute("colspan",y.getAttributeNS(C,"number-columns-spanned")),y.hasAttributeNS(C,"number-rows-spanned")&&y.setAttribute("rowspan",
y.getAttributeNS(C,"number-rows-spanned"));g(h.body);n(h.body);r(h.body);u(h.body);p(m,h.body,l);t(m,h.body);y=h.body;x={};w={};var G;z=R.document.getElementsByTagNameNS(I,"list-style");for(m=0;m<z.length;m+=1)K=z.item(m),(F=K.getAttributeNS(D,"name"))&&(w[F]=K);y=y.getElementsByTagNameNS(I,"list");for(m=0;m<y.length;m+=1)if(K=y.item(m),z=K.getAttributeNS(M,"id")){E=K.getAttributeNS(I,"continue-list");K.setAttribute("id",z);B="text|list#"+z+" > text|list-item > *:first-child:before {";if(F=K.getAttributeNS(I,
"style-name"))K=w[F],G=ja.getFirstNonWhitespaceChild(K),K=void 0,G&&("list-level-style-number"===G.localName?(K=G.getAttributeNS(D,"num-format"),F=G.getAttributeNS(D,"num-suffix"),N="",N={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},L=void 0,L=G.getAttributeNS(D,"num-prefix")||"",L=N.hasOwnProperty(K)?L+(" counter(list, "+N[K]+")"):K?L+("'"+K+"';"):L+" ''",F&&(L+=" '"+F+"'"),K=N="content: "+L+";"):"list-level-style-image"===G.localName?K="content: none;":"list-level-style-bullet"===
G.localName&&(K="content: '"+G.getAttributeNS(I,"bullet-char")+"';")),G=K;if(E){for(K=x[E];K;)E=K,K=x[E];B+="counter-increment:"+E+";";G?(G=G.replace("list",E),B+=G):B+="content:counter("+E+");"}else E="",G?(G=G.replace("list",z),B+=G):B+="content: counter("+z+");",B+="counter-increment:"+z+";",l.insertRule("text|list#"+z+" {counter-reset:"+z+"}",l.cssRules.length);B+="}";x[z]=E;B&&l.insertRule(B,l.cssRules.length)}T.insertBefore(fa,T.firstChild);A();V(h);if(!c&&(h=[O],ha.hasOwnProperty("statereadychange")))for(l=
ha.statereadychange,G=0;G<l.length;G+=1)l[G].apply(null,h)}O.state===odf.OdfContainer.DONE?e():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function ma(){O.state===odf.OdfContainer.DONE?e():(runtime.log("will be back later..."),runtime.setTimeout(ma,500))},100))}function L(a){B.clearQueue();k.innerHTML=runtime.tr("Loading")+" "+a+"...";k.removeAttribute("style");O=new odf.OdfContainer(a,function(a){O=a;N(!1)})}runtime.assert(null!==k&&void 0!==k,"odf.OdfCanvas constructor needs DOM element");
runtime.assert(null!==k.ownerDocument&&void 0!==k.ownerDocument,"odf.OdfCanvas constructor needs DOM");var G=this,Q=k.ownerDocument,O,ca=new odf.Formatting,oa=new l(k),da,T,P,ra=!1,$,F,U,J,ia,fa,W=1,ha={},B=new h;this.refreshCSS=function(){a(O,ca,J);A()};this.refreshSize=function(){A()};this.odfContainer=function(){return O};this.slidevisibilitycss=function(){return da.css};this.setOdfContainer=function(a,c){O=a;N(!0===c)};this.load=this.load=L;this.save=function(a){O.save(a)};this.addListener=function(a,
c){switch(a){case "selectionchange":oa.addListener(a,c);break;case "click":e(k,a,c);break;default:var b=ha[a];void 0===b&&(b=ha[a]=[]);c&&-1===b.indexOf(c)&&b.push(c)}};this.getFormatting=function(){return ca};this.getAnnotationManager=function(){return $};this.refreshAnnotations=function(){V(O.rootElement)};this.rerenderAnnotations=function(){$&&$.rerenderAnnotations()};this.getSizer=function(){return T};this.enableAnnotations=function(a){a!==ra&&(ra=a,O&&V(O.rootElement))};this.addAnnotation=function(a){$&&
$.addAnnotation(a)};this.forgetAnnotations=function(){$&&$.forgetAnnotations()};this.setZoomLevel=function(a){W=a;A()};this.getZoomLevel=function(){return W};this.fitToContainingElement=function(a,c){var b=k.offsetHeight/W;W=a/(k.offsetWidth/W);c/b<W&&(W=c/b);A()};this.fitToWidth=function(a){W=a/(k.offsetWidth/W);A()};this.fitSmart=function(a,c){var b,d;b=k.offsetWidth/W;d=k.offsetHeight/W;b=a/b;void 0!==c&&c/d<b&&(b=c/d);W=Math.min(1,b);A()};this.fitToHeight=function(a){W=a/(k.offsetHeight/W);A()};
this.showFirstPage=function(){da.showFirstPage()};this.showNextPage=function(){da.showNextPage()};this.showPreviousPage=function(){da.showPreviousPage()};this.showPage=function(a){da.showPage(a);A()};this.getElement=function(){return k};this.addCssForFrameWithImage=function(a){var d=a.getAttributeNS(v,"name");b(d,a,ia.sheet);c(d+"img",O,a.firstChild,ia.sheet)};this.destroy=function(a){var c=Q.getElementsByTagName("head")[0];P&&P.parentNode&&P.parentNode.removeChild(P);T&&k.removeChild(T);c.removeChild(F);
c.removeChild(U);c.removeChild(J);c.removeChild(ia);oa.destroy(function(c){c?a(c):da.destroy(a)})};F=x(Q);da=new m(w(Q));U=w(Q);J=w(Q);ia=w(Q)};return odf.OdfCanvas}();
// Input 39
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(h,m,e){return new odf.OdfContainer(h,function(p){if(p.state===odf.OdfContainer.INVALID)return e("Document "+h+" is invalid.");p.state===odf.OdfContainer.DONE?p.saveAs(m,function(h){e(h)}):e("Document was not completely loaded.")})};this.render=function(h,m,e){for(m=m.getElementsByTagName("body")[0];m.firstChild;)m.removeChild(m.firstChild);m=new odf.OdfCanvas(m);m.addListener("statereadychange",function(h){e(h)});m.load(h)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(h,m){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(h,m,e,p){};ops.Server.prototype.joinSession=function(h,m,e,p){};ops.Server.prototype.leaveSession=function(h,m,e,p){};ops.Server.prototype.getGenesisUrl=function(h){};
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
ops.Operation=function(){};ops.Operation.prototype.init=function(h){};ops.Operation.prototype.execute=function(h){};ops.Operation.prototype.spec=function(){};
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
ops.OpAddCursor=function(){var h,m;this.init=function(e){h=e.memberid;m=e.timestamp};this.execute=function(e){var m=e.getCursor(h);if(m)return!1;m=new ops.OdtCursor(h,e);e.addCursor(m);e.emit(ops.OdtDocument.signalCursorAdded,m);return!0};this.spec=function(){return{optype:"AddCursor",memberid:h,timestamp:m}}};
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
gui.StyleHelper=function(h){function m(a,d,f){var b=!0,e;for(e=0;e<a.length&&!(b=a[e]["style:text-properties"],b=!b||b[d]!==f);e+=1);return!b}function e(a,d,f){a=l.getParagraphElements(a);for(var b={},e=!1,c,g;0<a.length;){(c=a[0].getAttributeNS(q,"style-name"))?b[c]||(g=h.getStyleElement(c,"paragraph"),b[c]=!0):e?g=void 0:(e=!0,g=h.getDefaultStyleElement("paragraph"));if(g&&(c=h.getInheritedStyleAttributes(g,!0),(c=c["style:paragraph-properties"])&&-1===f.indexOf(c[d])))return!1;a.pop()}return!0}
var p=new core.DomUtils,l=new odf.OdfUtils,q=odf.Namespaces.textns;this.getAppliedStyles=function(a){var d;a.collapsed?(d=a.startContainer,d.hasChildNodes()&&a.startOffset<d.childNodes.length&&(d=d.childNodes[a.startOffset]),a=[d]):a=l.getTextNodes(a,!0);return h.getAppliedStyles(a)};this.applyStyle=function(a,d,f){var b=p.splitBoundaries(d),e=l.getTextNodes(d,!1);h.applyStyle(a,e,{startContainer:d.startContainer,startOffset:d.startOffset,endContainer:d.endContainer,endOffset:d.endOffset},f);b.forEach(p.normalizeTextNodes)};
this.isBold=function(a){return m(a,"fo:font-weight","bold")};this.isItalic=function(a){return m(a,"fo:font-style","italic")};this.hasUnderline=function(a){return m(a,"style:text-underline-style","solid")};this.hasStrikeThrough=function(a){return m(a,"style:text-line-through-style","solid")};this.isAlignedLeft=function(a){return e(a,"fo:text-align",["left","start"])};this.isAlignedCenter=function(a){return e(a,"fo:text-align",["center"])};this.isAlignedRight=function(a){return e(a,"fo:text-align",
["right","end"])};this.isAlignedJustified=function(a){return e(a,"fo:text-align",["justify"])}};
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
ops.OpApplyDirectStyling=function(){function h(a){var f=0<=l?p+l:p,b=a.getIteratorAtPosition(0<=l?p:p+l),f=l?a.getIteratorAtPosition(f):b;a=a.getDOM().createRange();a.setStart(b.container(),b.unfilteredDomOffset());a.setEnd(f.container(),f.unfilteredDomOffset());return a}var m,e,p,l,q,a=new odf.OdfUtils;this.init=function(a){m=a.memberid;e=a.timestamp;p=parseInt(a.position,10);l=parseInt(a.length,10);q=a.setProperties};this.execute=function(d){var f=h(d),b=a.getImpactedParagraphs(f);(new gui.StyleHelper(d.getFormatting())).applyStyle(m,
f,q);f.detach();d.getOdfCanvas().refreshCSS();d.fixCursorPositions();b.forEach(function(a){d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:m,timeStamp:e})});d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:m,timestamp:e,position:p,length:l,setProperties:q}}};
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
ops.OpRemoveCursor=function(){var h,m;this.init=function(e){h=e.memberid;m=e.timestamp};this.execute=function(e){return e.removeCursor(h)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:h,timestamp:m}}};
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
ops.OpMoveCursor=function(){var h,m,e,p,l;this.init=function(q){h=q.memberid;m=q.timestamp;e=q.position;p=q.length||0;l=q.selectionType||ops.OdtCursor.RangeSelection};this.execute=function(m){var a=m.getCursor(h),d;if(!a)return!1;d=m.convertCursorToDomRange(e,p);a.setSelectedRange(d,0<=p);a.setSelectionType(l);m.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:h,timestamp:m,position:e,length:p,selectionType:l}}};
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
ops.OpSetBlob=function(){var h,m,e,p,l;this.init=function(q){h=q.memberid;m=q.timestamp;e=q.filename;p=q.mimetype;l=q.content};this.execute=function(h){h.getOdfCanvas().odfContainer().setBlob(e,p,l);return!0};this.spec=function(){return{optype:"SetBlob",memberid:h,timestamp:m,filename:e,mimetype:p,content:l}}};
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
ops.OpRemoveBlob=function(){var h,m,e;this.init=function(p){h=p.memberid;m=p.timestamp;e=p.filename};this.execute=function(h){h.getOdfCanvas().odfContainer().removeBlob(e);return!0};this.spec=function(){return{optype:"RemoveBlob",memberid:h,timestamp:m,filename:e}}};
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
ops.OpInsertImage=function(){var h,m,e,p,l,q,a,d,f=odf.Namespaces.drawns,b=odf.Namespaces.svgns,k=odf.Namespaces.textns,c=odf.Namespaces.xlinkns;this.init=function(c){h=c.memberid;m=c.timestamp;e=c.position;p=c.filename;l=c.frameWidth;q=c.frameHeight;a=c.frameStyleName;d=c.frameName};this.execute=function(g){var n=g.getOdfCanvas(),r=g.getTextNodeAtStep(e,h),u,y;if(!r)return!1;u=r.textNode;y=g.getParagraphElement(u);var r=r.offset!==u.length?u.splitText(r.offset):u.nextSibling,x=g.getDOM(),w=x.createElementNS(f,
"draw:image"),x=x.createElementNS(f,"draw:frame");w.setAttributeNS(c,"xlink:href",p);w.setAttributeNS(c,"xlink:type","simple");w.setAttributeNS(c,"xlink:show","embed");w.setAttributeNS(c,"xlink:actuate","onLoad");x.setAttributeNS(f,"draw:style-name",a);x.setAttributeNS(f,"draw:name",d);x.setAttributeNS(k,"text:anchor-type","as-char");x.setAttributeNS(b,"svg:width",l);x.setAttributeNS(b,"svg:height",q);x.appendChild(w);u.parentNode.insertBefore(x,r);g.emit(ops.OdtDocument.signalStepsInserted,{position:e,
length:1});0===u.length&&u.parentNode.removeChild(u);n.addCssForFrameWithImage(x);n.refreshCSS();g.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:y,memberId:h,timeStamp:m});n.rerenderAnnotations();return!0};this.spec=function(){return{optype:"InsertImage",memberid:h,timestamp:m,filename:p,position:e,frameWidth:l,frameHeight:q,frameStyleName:a,frameName:d}}};
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
ops.OpInsertTable=function(){function h(a,c){var d;if(1===b.length)d=b[0];else if(3===b.length)switch(a){case 0:d=b[0];break;case p-1:d=b[2];break;default:d=b[1]}else d=b[a];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case l-1:return d[2];default:return d[1]}return d[c]}var m,e,p,l,q,a,d,f,b;this.init=function(k){m=k.memberid;e=k.timestamp;q=k.position;p=k.initialRows;l=k.initialColumns;a=k.tableName;d=k.tableStyleName;f=k.tableColumnStyleName;b=k.tableCellStyleMatrix};
this.execute=function(b){var c=b.getTextNodeAtStep(q),g=b.getRootNode();if(c){var n=b.getDOM(),r=n.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),u=n.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),y,x,w,v;d&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);a&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",a);u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:number-columns-repeated",l);f&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",f);r.appendChild(u);for(w=0;w<p;w+=1){u=n.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(v=0;v<l;v+=1)y=n.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(x=h(w,v))&&y.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",x),x=n.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"text:p"),y.appendChild(x),u.appendChild(y);r.appendChild(u)}c=b.getParagraphElement(c.textNode);g.insertBefore(r,c.nextSibling);b.emit(ops.OdtDocument.signalStepsInserted,{position:q,length:l*p+1});b.getOdfCanvas().refreshSize();b.emit(ops.OdtDocument.signalTableAdded,{tableElement:r,memberId:m,timeStamp:e});b.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:m,timestamp:e,position:q,initialRows:p,initialColumns:l,tableName:a,tableStyleName:d,
tableColumnStyleName:f,tableCellStyleMatrix:b}}};
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
ops.OpInsertText=function(){var h,m,e,p;this.init=function(l){h=l.memberid;m=l.timestamp;e=l.position;p=l.text};this.execute=function(l){var q,a,d,f=null,b=l.getDOM(),k,c=0,g,n;l.upgradeWhitespacesAtPosition(e);if(q=l.getTextNodeAtStep(e,h)){a=q.textNode;f=a.nextSibling;d=a.parentNode;k=l.getParagraphElement(a);for(n=0;n<p.length;n+=1)if(" "===p[n]&&(0===n||n===p.length-1||" "===p[n-1])||"\t"===p[n])0===c?(q.offset!==a.length&&(f=a.splitText(q.offset)),0<n&&a.appendData(p.substring(0,n))):c<n&&(c=
p.substring(c,n),d.insertBefore(b.createTextNode(c),f)),c=n+1,g=" "===p[n]?"text:s":"text:tab",g=b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",g),g.appendChild(b.createTextNode(p[n])),d.insertBefore(g,f);0===c?a.insertData(q.offset,p):c<p.length&&(q=p.substring(c),d.insertBefore(b.createTextNode(q),f));d=a.parentNode;f=a.nextSibling;d.removeChild(a);d.insertBefore(a,f);0===a.length&&a.parentNode.removeChild(a);l.emit(ops.OdtDocument.signalStepsInserted,{position:e,length:p.length});
0<e&&(1<e&&l.downgradeWhitespacesAtPosition(e-2),l.downgradeWhitespacesAtPosition(e-1));l.downgradeWhitespacesAtPosition(e);l.downgradeWhitespacesAtPosition(e+p.length-1);l.downgradeWhitespacesAtPosition(e+p.length);l.getOdfCanvas().refreshSize();l.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:h,timeStamp:m});l.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:h,timestamp:m,position:e,text:p}}};
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
ops.OpRemoveText=function(){function h(f){function b(a){return d.hasOwnProperty(a.namespaceURI)||"br"===a.localName&&q.isLineBreak(a.parentNode)||a.nodeType===Node.TEXT_NODE&&d.hasOwnProperty(a.parentNode.namespaceURI)}function e(a){if(q.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(d.hasOwnProperty(a.namespaceURI)||!e(a))return!1;a=a.nextSibling}return!0}function c(d){var h;d.nodeType===Node.TEXT_NODE?(h=d.parentNode,h.removeChild(d)):
h=a.removeUnwantedNodes(d,b);return!q.isParagraph(h)&&h!==f&&e(h)?c(h):h}this.isEmpty=e;this.mergeChildrenIntoParent=c}var m,e,p,l,q,a,d={};this.init=function(f){runtime.assert(0<=f.length,"OpRemoveText only supports positive lengths");m=f.memberid;e=f.timestamp;p=parseInt(f.position,10);l=parseInt(f.length,10);q=new odf.OdfUtils;a=new core.DomUtils;d[odf.Namespaces.dbns]=!0;d[odf.Namespaces.dcns]=!0;d[odf.Namespaces.dr3dns]=!0;d[odf.Namespaces.drawns]=!0;d[odf.Namespaces.chartns]=!0;d[odf.Namespaces.formns]=
!0;d[odf.Namespaces.numberns]=!0;d[odf.Namespaces.officens]=!0;d[odf.Namespaces.presentationns]=!0;d[odf.Namespaces.stylens]=!0;d[odf.Namespaces.svgns]=!0;d[odf.Namespaces.tablens]=!0;d[odf.Namespaces.textns]=!0};this.execute=function(d){var b,k,c,g,n=d.getCursor(m),r=new h(d.getRootNode());d.upgradeWhitespacesAtPosition(p);d.upgradeWhitespacesAtPosition(p+l);k=d.convertCursorToDomRange(p,l);a.splitBoundaries(k);b=d.getParagraphElement(k.startContainer);c=q.getTextElements(k,!1,!0);g=q.getParagraphElements(k);
k.detach();c.forEach(function(a){r.mergeChildrenIntoParent(a)});k=g.reduce(function(a,c){var b,d=!1,g=a,f=c,e,k=null;r.isEmpty(a)&&(d=!0,c.parentNode!==a.parentNode&&(e=c.parentNode,a.parentNode.insertBefore(c,a.nextSibling)),f=a,g=c,k=g.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||g.firstChild);for(;f.hasChildNodes();)b=d?f.lastChild:f.firstChild,f.removeChild(b),"editinfo"!==b.localName&&g.insertBefore(b,k);e&&r.isEmpty(e)&&r.mergeChildrenIntoParent(e);r.mergeChildrenIntoParent(f);
return g});d.emit(ops.OdtDocument.signalStepsRemoved,{position:p,length:l});d.downgradeWhitespacesAtPosition(p);d.fixCursorPositions();d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k||b,memberId:m,timeStamp:e});n&&(n.resetSelectionType(),d.emit(ops.OdtDocument.signalCursorMoved,n));d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:m,timestamp:e,position:p,length:l}}};
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
ops.OpSplitParagraph=function(){var h,m,e,p;this.init=function(l){h=l.memberid;m=l.timestamp;e=l.position;p=new odf.OdfUtils};this.execute=function(l){var q,a,d,f,b,k,c;l.upgradeWhitespacesAtPosition(e);q=l.getTextNodeAtStep(e,h);if(!q)return!1;a=l.getParagraphElement(q.textNode);if(!a)return!1;d=p.isListItem(a.parentNode)?a.parentNode:a;0===q.offset?(c=q.textNode.previousSibling,k=null):(c=q.textNode,k=q.offset>=q.textNode.length?null:q.textNode.splitText(q.offset));for(f=q.textNode;f!==d;){f=f.parentNode;
b=f.cloneNode(!1);k&&b.appendChild(k);if(c)for(;c&&c.nextSibling;)b.appendChild(c.nextSibling);else for(;f.firstChild;)b.appendChild(f.firstChild);f.parentNode.insertBefore(b,f.nextSibling);c=f;k=b}p.isListItem(k)&&(k=k.childNodes[0]);0===q.textNode.length&&q.textNode.parentNode.removeChild(q.textNode);l.emit(ops.OdtDocument.signalStepsInserted,{position:e,length:1});l.fixCursorPositions();l.getOdfCanvas().refreshSize();l.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:h,
timeStamp:m});l.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:h,timeStamp:m});l.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:h,timestamp:m,position:e}}};
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
ops.OpSetParagraphStyle=function(){var h,m,e,p;this.init=function(l){h=l.memberid;m=l.timestamp;e=l.position;p=l.styleName};this.execute=function(l){var q;q=l.getIteratorAtPosition(e);return(q=l.getParagraphElement(q.container()))?(""!==p?q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",p):q.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","style-name"),l.getOdfCanvas().refreshSize(),l.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:q,
timeStamp:m,memberId:h}),l.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:h,timestamp:m,position:e,styleName:p}}};
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
ops.OpUpdateParagraphStyle=function(){function h(a,f){var b,e,c=f?f.split(","):[];for(b=0;b<c.length;b+=1)e=c[b].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(e[0]),e[1])}var m,e,p,l,q,a=odf.Namespaces.stylens;this.init=function(a){m=a.memberid;e=a.timestamp;p=a.styleName;l=a.setProperties;q=a.removedProperties};this.execute=function(d){var f=d.getFormatting(),b,e,c;return(b=""!==p?d.getParagraphStyleElement(p):f.getDefaultStyleElement("paragraph"))?(e=b.getElementsByTagNameNS(a,"paragraph-properties")[0],
c=b.getElementsByTagNameNS(a,"text-properties")[0],l&&f.updateStyle(b,l),q&&(q["style:paragraph-properties"]&&(h(e,q["style:paragraph-properties"].attributes),0===e.attributes.length&&b.removeChild(e)),q["style:text-properties"]&&(h(c,q["style:text-properties"].attributes),0===c.attributes.length&&b.removeChild(c)),h(b,q.attributes)),d.getOdfCanvas().refreshCSS(),d.emit(ops.OdtDocument.signalParagraphStyleModified,p),d.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",
memberid:m,timestamp:e,styleName:p,setProperties:l,removedProperties:q}}};
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
ops.OpAddStyle=function(){var h,m,e,p,l,q,a=odf.Namespaces.stylens;this.init=function(a){h=a.memberid;m=a.timestamp;e=a.styleName;p=a.styleFamily;l="true"===a.isAutomaticStyle||!0===a.isAutomaticStyle;q=a.setProperties};this.execute=function(d){var f=d.getOdfCanvas().odfContainer(),b=d.getFormatting(),h=d.getDOM().createElementNS(a,"style:style");if(!h)return!1;q&&b.updateStyle(h,q);h.setAttributeNS(a,"style:family",p);h.setAttributeNS(a,"style:name",e);l?f.rootElement.automaticStyles.appendChild(h):f.rootElement.styles.appendChild(h);
d.getOdfCanvas().refreshCSS();l||d.emit(ops.OdtDocument.signalCommonStyleCreated,{name:e,family:p});return!0};this.spec=function(){return{optype:"AddStyle",memberid:h,timestamp:m,styleName:e,styleFamily:p,isAutomaticStyle:l,setProperties:q}}};
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
ops.OpRemoveStyle=function(){var h,m,e,p;this.init=function(l){h=l.memberid;m=l.timestamp;e=l.styleName;p=l.styleFamily};this.execute=function(h){var m=h.getStyleElement(e,p);if(!m)return!1;m.parentNode.removeChild(m);h.getOdfCanvas().refreshCSS();h.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:e,family:p});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:h,timestamp:m,styleName:e,styleFamily:p}}};
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
ops.OpAddAnnotation=function(){function h(a,d,f){var b=a.getTextNodeAtStep(f,m);b&&(a=b.textNode,f=a.parentNode,b.offset!==a.length&&a.splitText(b.offset),f.insertBefore(d,a.nextSibling),0===a.length&&f.removeChild(a))}var m,e,p,l,q;this.init=function(a){m=a.memberid;e=parseInt(a.timestamp,10);p=parseInt(a.position,10);l=parseInt(a.length,10)||0;q=a.name};this.execute=function(a){var d={},f=a.getPositionFilter(),b=a.getCursor(m),k=a.getCursorPosition(m),k=p-k-1,c=new Date(e),g,n,r,u,y;y=a.getDOM();
g=y.createElementNS(odf.Namespaces.officens,"office:annotation");g.setAttributeNS(odf.Namespaces.officens,"office:name",q);n=y.createElementNS(odf.Namespaces.dcns,"dc:creator");n.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m);r=y.createElementNS(odf.Namespaces.dcns,"dc:date");r.appendChild(y.createTextNode(c.toISOString()));c=y.createElementNS(odf.Namespaces.textns,"text:list");u=y.createElementNS(odf.Namespaces.textns,"text:list-item");y=y.createElementNS(odf.Namespaces.textns,
"text:p");u.appendChild(y);c.appendChild(u);g.appendChild(n);g.appendChild(r);g.appendChild(c);d.node=g;if(!d.node)return!1;if(l){g=a.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");g.setAttributeNS(odf.Namespaces.officens,"office:name",q);d.end=g;if(!d.end)return!1;h(a,d.end,p+l)}h(a,d.node,p);a.emit(ops.OdtDocument.signalStepsInserted,{position:p,length:l});b&&(f=b.getStepCounter().countSteps(k,f),b.move(f),b.resetSelectionType(),a.emit(ops.OdtDocument.signalCursorMoved,
b));a.getOdfCanvas().addAnnotation(d);a.fixCursorPositions();return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:m,timestamp:e,position:p,length:l,name:q}}};
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
ops.OpRemoveAnnotation=function(){var h,m,e,p,l;this.init=function(q){h=q.memberid;m=q.timestamp;e=parseInt(q.position,10);p=parseInt(q.length,10);l=new core.DomUtils};this.execute=function(h){for(var a=h.getIteratorAtPosition(e).container(),d,f,b;a.namespaceURI!==odf.Namespaces.officens||"annotation"!==a.localName;)a=a.parentNode;if(null===a)return!1;(d=a.getAttributeNS(odf.Namespaces.officens,"name"))&&(f=l.getElementsByTagNameNS(h.getRootNode(),odf.Namespaces.officens,"annotation-end").filter(function(a){return d===
a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);h.getOdfCanvas().forgetAnnotations();for(b=l.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor");b.length;)a.parentNode.insertBefore(b.pop(),a);a.parentNode.removeChild(a);f&&f.parentNode.removeChild(f);h.emit(ops.OdtDocument.signalStepsRemoved,{position:0<e?e-1:e,length:p});h.fixCursorPositions();h.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:h,timestamp:m,position:e,
length:p}}};
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
ops.OperationFactory=function(){function h(e){return function(){return new e}}var m;this.register=function(e,h){m[e]=h};this.create=function(e){var h=null,l=m[e.optype];l&&(h=l(e),h.init(e));return h};m={AddCursor:h(ops.OpAddCursor),ApplyDirectStyling:h(ops.OpApplyDirectStyling),SetBlob:h(ops.OpSetBlob),RemoveBlob:h(ops.OpRemoveBlob),InsertImage:h(ops.OpInsertImage),InsertTable:h(ops.OpInsertTable),InsertText:h(ops.OpInsertText),RemoveText:h(ops.OpRemoveText),SplitParagraph:h(ops.OpSplitParagraph),
SetParagraphStyle:h(ops.OpSetParagraphStyle),UpdateParagraphStyle:h(ops.OpUpdateParagraphStyle),AddStyle:h(ops.OpAddStyle),RemoveStyle:h(ops.OpRemoveStyle),MoveCursor:h(ops.OpMoveCursor),RemoveCursor:h(ops.OpRemoveCursor),AddAnnotation:h(ops.OpAddAnnotation),RemoveAnnotation:h(ops.OpRemoveAnnotation)}};
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
gui.SelectionMover=function(h,m){function e(){x.setUnfilteredPosition(h.getNode(),0);return x}function p(a,c){var b,d=null;a&&(b=c?a[a.length-1]:a[0]);b&&(d={top:b.top,left:c?b.right:b.left,bottom:b.bottom});return d}function l(a,c,b,d){var g=a.nodeType;b.setStart(a,c);b.collapse(!d);d=p(b.getClientRects(),!0===d);!d&&0<c&&(b.setStart(a,c-1),b.setEnd(a,c),d=p(b.getClientRects(),!0));d||(g===Node.ELEMENT_NODE&&a.childNodes[c-1]?d=l(a,c-1,b,!0):a.nodeType===Node.TEXT_NODE&&0<c?d=l(a,c-1,b,!0):a.previousSibling?
d=l(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,b,!0):a.parentNode&&a.parentNode!==m?d=l(a.parentNode,0,b,!1):(b.selectNode(m),d=p(b.getClientRects(),!1)));runtime.assert(Boolean(d),"No visible rectangle found");return d}function q(a,c,b){var d=a,g=e(),f,k=m.ownerDocument.createRange(),n=h.getSelectedRange()?h.getSelectedRange().cloneRange():m.ownerDocument.createRange(),p;for(f=l(g.container(),g.unfilteredDomOffset(),
k);0<d&&b();)d-=1;c?(c=g.container(),g=g.unfilteredDomOffset(),-1===n.comparePoint(c,g)?(n.setStart(c,g),p=!1):n.setEnd(c,g)):(n.setStart(g.container(),g.unfilteredDomOffset()),n.collapse(!0));h.setSelectedRange(n,p);g=e();n=l(g.container(),g.unfilteredDomOffset(),k);if(n.top===f.top||void 0===w)w=n.left;runtime.clearTimeout(v);v=runtime.setTimeout(function(){w=void 0},2E3);k.detach();return a-d}function a(a){var c=e();return a.acceptPosition(c)===t&&(c.setUnfilteredPosition(h.getAnchorNode(),0),
a.acceptPosition(c)===t)?!0:!1}function d(a,c,b){for(var d=new core.LoopWatchDog(1E4),g=0,f=0,e=0<=c?1:-1,h=0<=c?a.nextPosition:a.previousPosition;0!==c&&h();)d.check(),f+=e,b.acceptPosition(a)===t&&(c-=e,g+=f,f=0);return g}function f(a,c,b){for(var d=e(),g=new core.LoopWatchDog(1E4),f=0,h=0;0<a&&d.nextPosition();)g.check(),b.acceptPosition(d)===t&&(f+=1,c.acceptPosition(d)===t&&(h+=f,f=0,a-=1));return h}function b(a,c,b){for(var d=e(),g=new core.LoopWatchDog(1E4),f=0,h=0;0<a&&d.previousPosition();)g.check(),
b.acceptPosition(d)===t&&(f+=1,c.acceptPosition(d)===t&&(h+=f,f=0,a-=1));return h}function k(a,c){var b=e();return d(b,a,c)}function c(a,c,b){var g=e(),f=u.getParagraphElement(g.getCurrentNode()),h=0;g.setUnfilteredPosition(a,c);b.acceptPosition(g)!==t&&(h=d(g,-1,b),0===h||f&&f!==u.getParagraphElement(g.getCurrentNode()))&&(g.setUnfilteredPosition(a,c),h=d(g,1,b));return h}function g(a,c){var b=e(),d=0,g=0,f=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var h=c,k=f,n=b,p=n.container(),r=0,q=null,x=void 0,
u=10,v=void 0,y=0,Y=void 0,V=void 0,N=void 0,v=void 0,L=m.ownerDocument.createRange(),G=new core.LoopWatchDog(1E4),v=l(p,n.unfilteredDomOffset(),L),Y=v.top,V=void 0===w?v.left:w,N=Y;!0===(0>k?n.previousPosition():n.nextPosition());)if(G.check(),h.acceptPosition(n)===t&&(r+=1,p=n.container(),v=l(p,n.unfilteredDomOffset(),L),v.top!==Y)){if(v.top!==N&&N!==Y)break;N=v.top;v=Math.abs(V-v.left);if(null===q||v<u)q=p,x=n.unfilteredDomOffset(),u=v,y=r}null!==q?(n.setUnfilteredPosition(q,x),r=y):r=0;L.detach();
d+=r;if(0===d)break;g+=d;a-=1}return g*f}function n(a,c){var b,d,g,f,h=e(),k=u.getParagraphElement(h.getCurrentNode()),n=0,p=m.ownerDocument.createRange();0>a?(b=h.previousPosition,d=-1):(b=h.nextPosition,d=1);for(g=l(h.container(),h.unfilteredDomOffset(),p);b.call(h);)if(c.acceptPosition(h)===t){if(u.getParagraphElement(h.getCurrentNode())!==k)break;f=l(h.container(),h.unfilteredDomOffset(),p);if(f.bottom!==g.bottom&&(g=f.top>=g.top&&f.bottom<g.bottom||f.top<=g.top&&f.bottom>g.bottom,!g))break;n+=
d;g=f}p.detach();return n}function r(a,c,b){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=e(),g=d.container(),f=d.unfilteredDomOffset(),h=0,k=new core.LoopWatchDog(1E4);for(d.setUnfilteredPosition(a,c);b.acceptPosition(d)!==t&&d.previousPosition();)k.check();a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");c=d.unfilteredDomOffset();for(d.setUnfilteredPosition(g,f);b.acceptPosition(d)!==
t&&d.previousPosition();)k.check();g=y.comparePoints(a,c,d.container(),d.unfilteredDomOffset());if(0>g)for(;d.nextPosition()&&(k.check(),b.acceptPosition(d)===t&&(h+=1),d.container()!==a||d.unfilteredDomOffset()!==c););else if(0<g)for(;d.previousPosition()&&(k.check(),b.acceptPosition(d)!==t||(h-=1,d.container()!==a||d.unfilteredDomOffset()!==c)););return h}var u,y,x,w,v,t=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,c){return q(a,c||!1,x.nextPosition)};this.movePointBackward=
function(a,c){return q(a,c||!1,x.previousPosition)};this.getStepCounter=function(){return{countSteps:k,convertForwardStepsBetweenFilters:f,convertBackwardStepsBetweenFilters:b,countLinesSteps:g,countStepsToLineBoundary:n,countStepsToPosition:r,isPositionWalkable:a,countPositionsToNearestStep:c}};(function(){u=new odf.OdfUtils;y=new core.DomUtils;x=gui.SelectionMover.createPositionIterator(m);var a=m.ownerDocument.createRange();a.setStart(x.container(),x.unfilteredDomOffset());a.collapse(!0);h.setSelectedRange(a)})()};
gui.SelectionMover.createPositionIterator=function(h){var m=new function(){this.acceptNode=function(e){return"urn:webodf:names:cursor"===e.namespaceURI||"urn:webodf:names:editinfo"===e.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(h,5,m,!1)};(function(){return gui.SelectionMover})();
// Input 62
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
(function(){function h(e,h,l){function q(a,c){function b(a){for(var c=0;a&&a.previousSibling;)c+=1,a=a.previousSibling;return c}this.steps=a;this.node=c;this.setIteratorPosition=function(a){a.setUnfilteredPosition(c.parentNode,b(c));do if(h.acceptPosition(a)===u)break;while(a.nextPosition())}}function a(a){return a.nodeType===Node.ELEMENT_NODE&&a.getAttributeNS(b,"nodeId")}function d(a){var c=m;a.setAttributeNS(b,"nodeId",c.toString());m+=1;return c}function f(d,g){var f,h=null;for(d=d.childNodes[g]||
d;!h&&d&&d!==e;)(f=a(d))&&(h=c[f])&&h.node!==d&&(runtime.log("Cloned node detected. Creating new bookmark"),h=null,d.removeAttributeNS(b,"nodeId")),d=d.parentNode;return h}var b="urn:webodf:names:steps",k={},c={},g=new odf.OdfUtils,n=new core.DomUtils,r,u=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.updateCache=function(b,f,e,h){var n;0===e&&g.isParagraph(f)?(n=!0,h||(b+=1)):f.hasChildNodes()&&f.childNodes[e]&&(f=f.childNodes[e],(n=g.isParagraph(f))&&(b+=1));n&&(e=a(f)||d(f),(h=c[e])?h.node===
f?h.steps=b:(runtime.log("Cloned node detected. Creating new bookmark"),e=d(f),h=c[e]=new q(b,f)):h=c[e]=new q(b,f),e=h,b=Math.ceil(e.steps/l)*l,f=k[b],!f||e.steps>f.steps)&&(k[b]=e)};this.setToClosestStep=function(a,c){for(var b=Math.floor(a/l)*l,d;!d&&0!==b;)d=k[b],b-=l;d=d||r;d.setIteratorPosition(c);return d.steps};this.setToClosestDomPoint=function(a,c,b){var d;if(a===e&&0===c)d=r;else if(a===e&&c===e.childNodes.length)d=Object.keys(k).map(function(a){return k[a]}).reduce(function(a,c){return c.steps>
a.steps?c:a},r);else if(d=f(a,c),!d)for(b.setUnfilteredPosition(a,c);!d&&b.previousNode();)d=f(b.container(),b.unfilteredDomOffset());d=d||r;d.setIteratorPosition(b);return d.steps};this.updateCacheAtPoint=function(b,d){var g={};Object.keys(c).map(function(a){return c[a]}).filter(function(a){return a.steps>b}).forEach(function(b){var f=Math.ceil(b.steps/l)*l,h,m;if(n.containsNode(e,b.node)){if(d(b),h=Math.ceil(b.steps/l)*l,m=g[h],!m||b.steps>m.steps)g[h]=b}else delete c[a(b.node)];k[f]===b&&delete k[f]});
Object.keys(g).forEach(function(a){k[a]=g[a]})};r=new function(a,c){this.steps=a;this.node=c;this.setIteratorPosition=function(a){a.setUnfilteredPosition(c,0);do if(h.acceptPosition(a)===u)break;while(a.nextPosition())}}(0,e)}var m=0;ops.StepsTranslator=function(e,m,l,q){function a(){var a=e();a!==d&&(runtime.log("Undo detected. Resetting steps cache"),d=a,f=new h(d,l,q),k=m(d))}var d=e(),f=new h(d,l,q),b=new core.DomUtils,k=m(e()),c=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.convertStepsToDomPoint=
function(b){var d,e;0>b&&(runtime.log("warn","Requested steps were negative ("+b+")"),b=0);a();for(d=f.setToClosestStep(b,k);d<b&&k.nextPosition();)(e=l.acceptPosition(k)===c)&&(d+=1),f.updateCache(d,k.container(),k.unfilteredDomOffset(),e);d!==b&&runtime.log("warn","Requested "+b+" steps but only "+d+" are available");return{node:k.container(),offset:k.unfilteredDomOffset()}};this.convertDomPointToSteps=function(g,e,h){var m,p,q=0;a();b.containsNode(d,g)||(m=0>b.comparePoints(d,0,g,e),g=d,e=m?0:
d.childNodes.length);k.setUnfilteredPosition(g,e);m=k.container();p=k.unfilteredDomOffset();h&&l.acceptPosition(k)!==c&&(q=1);g=f.setToClosestDomPoint(g,e,k);if(0>b.comparePoints(k.container(),k.unfilteredDomOffset(),m,p))return 0<g&&!h?g-1:g;for(;(k.container()!==m||k.unfilteredDomOffset()!==p)&&k.nextPosition();)(h=l.acceptPosition(k)===c)&&(g+=1),f.updateCache(g,k.container(),k.unfilteredDomOffset(),h);return g+q};this.prime=function(){var b,d;a();for(b=f.setToClosestStep(0,k);k.nextPosition();)(d=
l.acceptPosition(k)===c)&&(b+=1),f.updateCache(b,k.container(),k.unfilteredDomOffset(),d)};this.handleStepsInserted=function(c){a();f.updateCacheAtPoint(c.position,function(a){a.steps+=c.length})};this.handleStepsRemoved=function(c){a();f.updateCacheAtPoint(c.position,function(a){a.steps-=c.length;0>a.steps&&(a.steps=0)})}};return ops.StepsTranslator})();
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
ops.TextPositionFilter=function(h){function m(h,a,d){var f,b;if(a&&(f=e.lookLeftForCharacter(a),1===f||2===f&&(e.scanRightForAnyCharacter(d)||e.scanRightForAnyCharacter(e.nextNode(h)))))return p;f=null===a&&e.isParagraph(h);b=e.lookRightForCharacter(d);if(f)return b?p:e.scanRightForAnyCharacter(d)?l:p;if(!b)return l;a=a||e.previousNode(h);return e.scanLeftForAnyCharacter(a)?l:p}var e=new odf.OdfUtils,p=core.PositionFilter.FilterResult.FILTER_ACCEPT,l=core.PositionFilter.FilterResult.FILTER_REJECT;
this.acceptPosition=function(q){var a=q.container(),d=a.nodeType,f,b,k;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return l;if(d===Node.TEXT_NODE){if(!e.isGroupingElement(a.parentNode)||e.isWithinTrackedChanges(a.parentNode,h()))return l;d=q.unfilteredDomOffset();f=a.data;runtime.assert(d!==f.length,"Unexpected offset.");if(0<d){q=f.substr(d-1,1);if(!e.isODFWhitespace(q))return p;if(1<d)if(q=f.substr(d-2,1),!e.isODFWhitespace(q))b=p;else{if(!e.isODFWhitespace(f.substr(0,d)))return l}else k=e.previousNode(a),
e.scanLeftForNonWhitespace(k)&&(b=p);if(b===p)return e.isTrailingWhitespace(a,d)?l:p;b=f.substr(d,1);return e.isODFWhitespace(b)?l:e.scanLeftForAnyCharacter(e.previousNode(a))?l:p}k=q.leftNode();b=a;a=a.parentNode;b=m(a,k,b)}else!e.isGroupingElement(a)||e.isWithinTrackedChanges(a,h())?b=l:(k=q.leftNode(),b=q.rightNode(),b=m(a,k,b));return b}};
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
ops.OperationTransformMatrix=function(){function h(a){a.position+=a.length;a.length*=-1}function m(a){var b=0>a.length;b&&h(a);return b}function e(a,b){var d=[];a&&["style:parent-style-name","style:next-style-name"].forEach(function(f){a[f]===b&&d.push(f)});return d}function p(a,b){a&&["style:parent-style-name","style:next-style-name"].forEach(function(d){a[d]===b&&delete a[d]})}function l(a){var b={};Object.keys(a).forEach(function(d){b[d]="object"===typeof a[d]?l(a[d]):a[d]});return b}function q(a,
b,d,f){var e,h,k=!1,l=!1,m,p,q=f&&f.attributes?f.attributes.split(","):[];a&&(d||0<q.length)&&Object.keys(a).forEach(function(b){e=a[b];"object"!==typeof e&&(m=d&&d[b],void 0!==m?(delete a[b],l=!0,m===e&&(delete d[b],k=!0)):q&&-1!==q.indexOf(b)&&(delete a[b],l=!0))});if(b&&b.attributes&&(d||0<q.length)){p=b.attributes.split(",");for(f=0;f<p.length;f+=1)if(h=p[f],d&&void 0!==d[h]||q&&-1!==q.indexOf(h))p.splice(f,1),f-=1,l=!0;0<p.length?b.attributes=p.join(","):delete b.attributes}return{majorChanged:k,
minorChanged:l}}function a(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function d(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function f(c,b,f){var e=c.setProperties?c.setProperties[f]:null,h=c.removedProperties?c.removedProperties[f]:null,k=b.setProperties?b.setProperties[f]:null,l=b.removedProperties?b.removedProperties[f]:null,m;m=q(e,h,k,l);e&&!a(e)&&delete c.setProperties[f];h&&!d(h)&&delete c.removedProperties[f];k&&!a(k)&&
delete b.setProperties[f];l&&!d(l)&&delete b.removedProperties[f];return m}function b(a,b){return{opSpecsA:[a],opSpecsB:[b]}}var k={AddCursor:{AddCursor:b,AddStyle:b,ApplyDirectStyling:b,InsertText:b,MoveCursor:b,RemoveCursor:b,RemoveStyle:b,RemoveText:b,SetParagraphStyle:b,SplitParagraph:b,UpdateParagraphStyle:b},AddStyle:{AddStyle:b,ApplyDirectStyling:b,InsertText:b,MoveCursor:b,RemoveCursor:b,RemoveStyle:function(a,b){var d,f=[a],h=[b];a.styleFamily===b.styleFamily&&(d=e(a.setProperties,b.styleName),
0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:b.memberid,timestamp:b.timestamp,styleName:a.styleName,removedProperties:{attributes:d.join(",")}},h.unshift(d)),p(a.setProperties,b.styleName));return{opSpecsA:f,opSpecsB:h}},RemoveText:b,SetParagraphStyle:b,SplitParagraph:b,UpdateParagraphStyle:b},ApplyDirectStyling:{ApplyDirectStyling:function(c,b,d){var e,h,k,m,p,q,t,s;m=[c];k=[b];if(!(c.position+c.length<=b.position||c.position>=b.position+b.length)){e=d?c:b;h=d?b:c;if(c.position!==b.position||
c.length!==b.length)q=l(e),t=l(h);b=f(h,e,"style:text-properties");if(b.majorChanged||b.minorChanged)k=[],c=[],m=e.position+e.length,p=h.position+h.length,h.position<e.position?b.minorChanged&&(s=l(t),s.length=e.position-h.position,c.push(s),h.position=e.position,h.length=p-h.position):e.position<h.position&&b.majorChanged&&(s=l(q),s.length=h.position-e.position,k.push(s),e.position=h.position,e.length=m-e.position),p>m?b.minorChanged&&(q=t,q.position=m,q.length=p-m,c.push(q),h.length=m-h.position):
m>p&&b.majorChanged&&(q.position=p,q.length=m-p,k.push(q),e.length=p-e.position),e.setProperties&&a(e.setProperties)&&k.push(e),h.setProperties&&a(h.setProperties)&&c.push(h),d?(m=k,k=c):m=c}return{opSpecsA:m,opSpecsB:k}},InsertText:function(a,b){b.position<=a.position?a.position+=b.text.length:b.position<=a.position+a.length&&(a.length+=b.text.length);return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:b,RemoveCursor:b,RemoveStyle:b,RemoveText:function(a,b){var d=a.position+a.length,f=b.position+b.length,
e=[a],h=[b];f<=a.position?a.position-=b.length:b.position<d&&(a.position<b.position?a.length=f<d?a.length-b.length:b.position-a.position:(a.position=b.position,f<d?a.length=d-f:e=[]));return{opSpecsA:e,opSpecsB:h}},SetParagraphStyle:b,SplitParagraph:function(a,b){b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateParagraphStyle:b},InsertText:{InsertText:function(a,b,d){if(a.position<b.position)b.position+=a.text.length;else if(a.position>
b.position)a.position+=b.text.length;else return d?b.position+=a.text.length:a.position+=b.text.length,null;return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:function(a,b){var d=m(b);a.position<b.position?b.position+=a.text.length:a.position<b.position+b.length&&(b.length+=a.text.length);d&&h(b);return{opSpecsA:[a],opSpecsB:[b]}},RemoveCursor:b,RemoveStyle:b,RemoveText:function(a,b){var d;d=b.position+b.length;var f=[a],e=[b];d<=a.position?a.position-=b.length:a.position<=b.position?b.position+=a.text.length:
(b.length=a.position-b.position,d={optype:"RemoveText",memberid:b.memberid,timestamp:b.timestamp,position:a.position+a.text.length,length:d-a.position},e.unshift(d),a.position=b.position);return{opSpecsA:f,opSpecsB:e}},SplitParagraph:function(a,b,d){if(a.position<b.position)b.position+=a.text.length;else if(a.position>b.position)a.position+=1;else return d?b.position+=a.text.length:a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateParagraphStyle:b},MoveCursor:{MoveCursor:b,RemoveCursor:function(a,
b){return{opSpecsA:a.memberid===b.memberid?[]:[a],opSpecsB:[b]}},RemoveStyle:b,RemoveText:function(a,b){var d=m(a),f=a.position+a.length,e=b.position+b.length;e<=a.position?a.position-=b.length:b.position<f&&(a.position<b.position?a.length=e<f?a.length-b.length:b.position-a.position:(a.position=b.position,a.length=e<f?f-e:0));d&&h(a);return{opSpecsA:[a],opSpecsB:[b]}},SetParagraphStyle:b,SplitParagraph:function(a,b){var d=m(a);b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=
1);d&&h(a);return{opSpecsA:[a],opSpecsB:[b]}},UpdateParagraphStyle:b},RemoveCursor:{RemoveCursor:function(a,b){var d=a.memberid===b.memberid;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveStyle:b,RemoveText:b,SetParagraphStyle:b,SplitParagraph:b,UpdateParagraphStyle:b},RemoveStyle:{RemoveStyle:function(a,b){var d=a.styleName===b.styleName&&a.styleFamily===b.styleFamily;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveText:b,SetParagraphStyle:function(a,b){var d,f=[a],e=[b];"paragraph"===a.styleFamily&&
a.styleName===b.styleName&&(d={optype:"SetParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,position:b.position,styleName:""},f.unshift(d),b.styleName="");return{opSpecsA:f,opSpecsB:e}},SplitParagraph:b,UpdateParagraphStyle:function(a,b){var d,f=[a],h=[b];"paragraph"===a.styleFamily&&(d=e(b.setProperties,a.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,styleName:b.styleName,removedProperties:{attributes:d.join(",")}},f.unshift(d)),a.styleName===
b.styleName?h=[]:p(b.setProperties,a.styleName));return{opSpecsA:f,opSpecsB:h}}},RemoveText:{RemoveText:function(a,b){var d=a.position+a.length,f=b.position+b.length,e=[a],h=[b];f<=a.position?a.position-=b.length:d<=b.position?b.position-=a.length:b.position<d&&(a.position<b.position?(a.length=f<d?a.length-b.length:b.position-a.position,d<f?(b.position=a.position,b.length=f-d):h=[]):(d<f?b.length-=a.length:b.position<a.position?b.length=a.position-b.position:h=[],f<d?(a.position=b.position,a.length=
d-f):e=[]));return{opSpecsA:e,opSpecsB:h}},SplitParagraph:function(a,b){var d=a.position+a.length,f=[a],e=[b];b.position<=a.position?a.position+=1:b.position<d&&(a.length=b.position-a.position,d={optype:"RemoveText",memberid:a.memberid,timestamp:a.timestamp,position:b.position+1,length:d-b.position},f.unshift(d));a.position+a.length<=b.position?b.position-=a.length:a.position<b.position&&(b.position=a.position);return{opSpecsA:f,opSpecsB:e}},UpdateParagraphStyle:b},SetParagraphStyle:{UpdateParagraphStyle:b},
SplitParagraph:{SplitParagraph:function(a,b,d){if(a.position<b.position)b.position+=1;else if(a.position>b.position)a.position+=1;else if(a.position===b.position)return d?b.position+=1:a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateParagraphStyle:b},UpdateParagraphStyle:{UpdateParagraphStyle:function(b,e,h){var k,l=[b],m=[e];b.styleName===e.styleName&&(k=h?b:e,b=h?e:b,f(b,k,"style:paragraph-properties"),f(b,k,"style:text-properties"),q(b.setProperties||null,b.removedProperties||null,
k.setProperties||null,k.removedProperties||null),k.setProperties&&a(k.setProperties)||k.removedProperties&&d(k.removedProperties)||(h?l=[]:m=[]),b.setProperties&&a(b.setProperties)||b.removedProperties&&d(b.removedProperties)||(h?m=[]:l=[]));return{opSpecsA:l,opSpecsB:m}}}};this.passUnchanged=b;this.extendTransformations=function(a){Object.keys(a).forEach(function(b){var d=a[b],f,e=k.hasOwnProperty(b);runtime.log((e?"Extending":"Adding")+" map for optypeA: "+b);e||(k[b]={});f=k[b];Object.keys(d).forEach(function(a){var c=
f.hasOwnProperty(a);runtime.assert(b<=a,"Wrong order:"+b+", "+a);runtime.log("  "+(c?"Overwriting":"Adding")+" entry for optypeB: "+a);f[a]=d[a]})})};this.transformOpspecVsOpspec=function(a,b){var d=a.optype<=b.optype,f;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(a));runtime.log(runtime.toJson(b));d||(f=a,a=b,b=f);(f=(f=k[a.optype])&&f[b.optype])?(f=f(a,b,!d),d||null===f||(f={opSpecsA:f.opSpecsB,opSpecsB:f.opSpecsA})):f=null;runtime.log("result:");f?(runtime.log(runtime.toJson(f.opSpecsA)),
runtime.log(runtime.toJson(f.opSpecsB))):runtime.log("null");return f}};
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
runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OperationTransformMatrix");
ops.OperationTransformer=function(){function h(h){var m=[];h.forEach(function(a){m.push(e.create(a))});return m}function m(e,h){for(var a,d,f=[],b=[];0<e.length&&h;){a=e.shift();a=p.transformOpspecVsOpspec(a,h);if(!a)return null;f=f.concat(a.opSpecsA);if(0===a.opSpecsB.length){f=f.concat(e);h=null;break}for(;1<a.opSpecsB.length;){d=m(e,a.opSpecsB.shift());if(!d)return null;b=b.concat(d.opSpecsB);e=d.opSpecsA}h=a.opSpecsB.pop()}h&&b.push(h);return{opSpecsA:f,opSpecsB:b}}var e,p=new ops.OperationTransformMatrix;
this.setOperationFactory=function(h){e=h};this.getOperationTransformMatrix=function(){return p};this.transform=function(e,p){for(var a,d=[];0<p.length;){a=m(e,p.shift());if(!a)return null;e=a.opSpecsA;d=d.concat(a.opSpecsB)}return{opsA:h(e),opsB:h(d)}}};
// Input 66
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(h,m){var e=this,p={},l,q,a;this.removeFromOdtDocument=function(){a.remove()};this.move=function(a,f){var b=0;0<a?b=q.movePointForward(a,f):0>=a&&(b=-q.movePointBackward(-a,f));e.handleUpdate();return b};this.handleUpdate=function(){};this.getStepCounter=function(){return q.getStepCounter()};this.getMemberId=function(){return h};this.getNode=function(){return a.getNode()};this.getAnchorNode=function(){return a.getAnchorNode()};this.getSelectedRange=function(){return a.getSelectedRange()};
this.setSelectedRange=function(d,f){a.setSelectedRange(d,f);e.handleUpdate()};this.hasForwardSelection=function(){return a.hasForwardSelection()};this.getOdtDocument=function(){return m};this.getSelectionType=function(){return l};this.setSelectionType=function(a){p.hasOwnProperty(a)?l=a:runtime.log("Invalid selection type: "+a)};this.resetSelectionType=function(){e.setSelectionType(ops.OdtCursor.RangeSelection)};a=new core.Cursor(m.getDOM(),h);q=new gui.SelectionMover(a,m.getRootNode());p[ops.OdtCursor.RangeSelection]=
!0;p[ops.OdtCursor.RegionSelection]=!0;e.resetSelectionType()};ops.OdtCursor.RangeSelection="Range";ops.OdtCursor.RegionSelection="Region";(function(){return ops.OdtCursor})();
// Input 67
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
ops.EditInfo=function(h,m){function e(){var e=[],a;for(a in l)l.hasOwnProperty(a)&&e.push({memberid:a,time:l[a].time});e.sort(function(a,f){return a.time-f.time});return e}var p,l={};this.getNode=function(){return p};this.getOdtDocument=function(){return m};this.getEdits=function(){return l};this.getSortedEdits=function(){return e()};this.addEdit=function(e,a){l[e]={time:a}};this.clearEdits=function(){l={}};this.destroy=function(e){h.parentNode&&h.removeChild(p);e()};p=m.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");h.insertBefore(p,h.firstChild)};
// Input 68
runtime.loadClass("gui.SelectionMover");gui.ShadowCursor=function(h){var m=h.getDOM().createRange(),e=!0;this.removeFromOdtDocument=function(){};this.getMemberId=function(){return gui.ShadowCursor.ShadowCursorMemberId};this.getSelectedRange=function(){return m};this.setSelectedRange=function(h,l){m=h;e=!1!==l};this.hasForwardSelection=function(){return e};this.getOdtDocument=function(){return h};this.getSelectionType=function(){return ops.OdtCursor.RangeSelection};m.setStart(h.getRootNode(),0)};
gui.ShadowCursor.ShadowCursorMemberId="";(function(){return gui.ShadowCursor})();
// Input 69
gui.Avatar=function(h,m){var e=this,p,l,q;this.setColor=function(a){l.style.borderColor=a};this.setImageUrl=function(a){e.isVisible()?l.src=a:q=a};this.isVisible=function(){return"block"===p.style.display};this.show=function(){q&&(l.src=q,q=void 0);p.style.display="block"};this.hide=function(){p.style.display="none"};this.markAsFocussed=function(a){p.className=a?"active":""};this.destroy=function(a){h.removeChild(p);a()};(function(){var a=h.ownerDocument,d=a.documentElement.namespaceURI;p=a.createElementNS(d,
"div");l=a.createElementNS(d,"img");l.width=64;l.height=64;p.appendChild(l);p.style.width="64px";p.style.height="70px";p.style.position="absolute";p.style.top="-80px";p.style.left="-34px";p.style.display=m?"block":"none";h.appendChild(p)})()};
// Input 70
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(h,m,e){function p(b){k&&f.parentNode&&(!c||b)&&(b&&void 0!==g&&runtime.clearTimeout(g),c=!0,a.style.opacity=b||"0"===a.style.opacity?"1":"0",g=runtime.setTimeout(function(){c=!1;p(!1)},500))}function l(a,b){var c=a.getBoundingClientRect(),d=0,f=0;c&&b&&(d=Math.max(c.top,b.top),f=Math.min(c.bottom,b.bottom));return f-d}function q(){var c;c=h.getSelectedRange().cloneRange();var d=h.getNode(),f,e=null;d.previousSibling&&(f=d.previousSibling.nodeType===Node.TEXT_NODE?d.previousSibling.textContent.length:
d.previousSibling.childNodes.length,c.setStart(d.previousSibling,0<f?f-1:0),c.setEnd(d.previousSibling,f),(f=c.getBoundingClientRect())&&f.height&&(e=f));d.nextSibling&&(c.setStart(d.nextSibling,0),c.setEnd(d.nextSibling,0<(d.nextSibling.nodeType===Node.TEXT_NODE?d.nextSibling.textContent.length:d.nextSibling.childNodes.length)?1:0),(f=c.getBoundingClientRect())&&f.height&&(!e||l(d,f)>l(d,e))&&(e=f));c=e;d=h.getOdtDocument().getOdfCanvas().getZoomLevel();b&&h.getSelectionType()===ops.OdtCursor.RangeSelection?
a.style.visibility="visible":a.style.visibility="hidden";c?(a.style.top="0",e=a.ownerDocument.createRange(),e.selectNode(a),f=e.getBoundingClientRect(),e.detach(),8>c.height&&(c={top:c.top-(8-c.height)/2,height:8}),a.style.height=n.adaptRangeDifferenceToZoomLevel(c.height,d)+"px",a.style.top=n.adaptRangeDifferenceToZoomLevel(c.top-f.top,d)+"px"):(a.style.height="1em",a.style.top="5%")}var a,d,f,b=!0,k=!1,c=!1,g,n=new core.DomUtils;this.handleUpdate=q;this.refreshCursorBlinking=function(){e||h.getSelectedRange().collapsed?
(k=!0,p(!0)):(k=!1,a.style.opacity="0")};this.setFocus=function(){k=!0;d.markAsFocussed(!0);p(!0)};this.removeFocus=function(){k=!1;d.markAsFocussed(!1);a.style.opacity="1"};this.show=function(){b=!0;q();d.markAsFocussed(!0)};this.hide=function(){b=!1;q();d.markAsFocussed(!1)};this.setAvatarImageUrl=function(a){d.setImageUrl(a)};this.setColor=function(b){a.style.borderColor=b;d.setColor(b)};this.getCursor=function(){return h};this.getFocusElement=function(){return a};this.toggleHandleVisibility=function(){d.isVisible()?
d.hide():d.show()};this.showHandle=function(){d.show()};this.hideHandle=function(){d.hide()};this.ensureVisible=function(){var b,c,d,f,e=h.getOdtDocument().getOdfCanvas().getElement().parentNode,g;d=e.offsetWidth-e.clientWidth+5;f=e.offsetHeight-e.clientHeight+5;g=a.getBoundingClientRect();b=g.left-d;c=g.top-f;d=g.right+d;f=g.bottom+f;g=e.getBoundingClientRect();c<g.top?e.scrollTop-=g.top-c:f>g.bottom&&(e.scrollTop+=f-g.bottom);b<g.left?e.scrollLeft-=g.left-b:d>g.right&&(e.scrollLeft+=d-g.right);
q()};this.destroy=function(b){d.destroy(function(c){c?b(c):(f.removeChild(a),b())})};(function(){var b=h.getOdtDocument().getDOM();a=b.createElementNS(b.documentElement.namespaceURI,"span");a.style.top="5%";f=h.getNode();f.appendChild(a);d=new gui.Avatar(f,m);q()})()};
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
gui.PlainTextPasteboard=function(h,m){function e(e,h){e.init(h);return e}this.createPasteOps=function(p){var l=h.getCursorPosition(m),q=l,a=[];p.replace(/\r/g,"").split("\n").forEach(function(d){a.push(e(new ops.OpSplitParagraph,{memberid:m,position:q}));q+=1;a.push(e(new ops.OpInsertText,{memberid:m,position:q,text:d}));q+=d.length});a.push(e(new ops.OpRemoveText,{memberid:m,position:l,length:1}));return a}};
// Input 72
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
gui.Clipboard=function(){var h,m,e;this.setDataFromRange=function(e,l){var q=!0,a,d=e.clipboardData;a=runtime.getWindow();var f=l.startContainer.ownerDocument;!d&&a&&(d=a.clipboardData);d?(f=f.createElement("span"),f.appendChild(l.cloneContents()),a=d.setData("text/plain",m.writeToString(f)),q=q&&a,a=d.setData("text/html",h.writeToString(f,odf.Namespaces.namespaceMap)),q=q&&a,e.preventDefault()):q=!1;return q};h=new xmldom.LSSerializer;m=new odf.TextSerializer;e=new odf.OdfNodeFilter;h.filter=e;m.filter=
e};
// Input 73
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
gui.DirectTextStyler=function(h,m){function e(a,b){for(var c=0,d=b[c];d&&a;)a=a[d],c+=1,d=b[c];return b.length===c?a:void 0}function p(a,b){var c=e(a[0],b);return a.every(function(a){return c===e(a,b)})?c:void 0}function l(){var a=t.getCursor(m),a=(a=a&&a.getSelectedRange())&&s.getAppliedStyles(a)||[];a[0]&&A&&(a[0]=v.mergeObjects(a[0],A));return a}function q(){function a(b,d,f){b!==d&&(void 0===c&&(c={}),c[f]=d);return d}var b,c;C=l();I=a(I,C?s.isBold(C):!1,"isBold");z=a(z,C?s.isItalic(C):!1,"isItalic");
M=a(M,C?s.hasUnderline(C):!1,"hasUnderline");H=a(H,C?s.hasStrikeThrough(C):!1,"hasStrikeThrough");b=C&&p(C,["style:text-properties","fo:font-size"]);R=a(R,b&&parseFloat(b),"fontSize");Z=a(Z,C&&p(C,["style:text-properties","style:font-name"]),"fontName");c&&D.emit(gui.DirectTextStyler.textStylingChanged,c)}function a(a){a.getMemberId()===m&&q()}function d(a){a===m&&q()}function f(a){a.getMemberId()===m&&q()}function b(){q()}function k(a){var b=t.getCursor(m);b&&t.getParagraphElement(b.getNode())===
a.paragraphElement&&q()}function c(a,b){var c=t.getCursor(m);if(!c)return!1;c=s.getAppliedStyles(c.getSelectedRange());b(!a(c));return!0}function g(a){var b=t.getCursorSelection(m),c={"style:text-properties":a};0!==b.length?(a=new ops.OpApplyDirectStyling,a.init({memberid:m,position:b.position,length:b.length,setProperties:c}),h.enqueue([a])):(A=v.mergeObjects(A||{},c),q())}function n(a,b){var c={};c[a]=b;g(c)}function r(a){a=a.spec();A&&a.memberid===m&&"SplitParagraph"!==a.optype&&(A=null,q())}function u(a){n("fo:font-weight",
a?"bold":"normal")}function y(a){n("fo:font-style",a?"italic":"normal")}function x(a){n("style:text-underline-style",a?"solid":"none")}function w(a){n("style:text-line-through-style",a?"solid":"none")}var v=new core.Utils,t=h.getOdtDocument(),s=new gui.StyleHelper(t.getFormatting()),D=new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]),A,C=[],I=!1,z=!1,M=!1,H=!1,R,Z;this.formatTextSelection=g;this.createCursorStyleOp=function(a,b){var c=null;A&&(c=new ops.OpApplyDirectStyling,c.init({memberid:m,
position:a,length:b,setProperties:A}),A=null,q());return c};this.setBold=u;this.setItalic=y;this.setHasUnderline=x;this.setHasStrikethrough=w;this.setFontSize=function(a){n("fo:font-size",a+"pt")};this.setFontName=function(a){n("style:font-name",a)};this.getAppliedStyles=function(){return C};this.toggleBold=c.bind(this,s.isBold,u);this.toggleItalic=c.bind(this,s.isItalic,y);this.toggleUnderline=c.bind(this,s.hasUnderline,x);this.toggleStrikethrough=c.bind(this,s.hasStrikeThrough,w);this.isBold=function(){return I};
this.isItalic=function(){return z};this.hasUnderline=function(){return M};this.hasStrikeThrough=function(){return H};this.fontSize=function(){return R};this.fontName=function(){return Z};this.subscribe=function(a,b){D.subscribe(a,b)};this.unsubscribe=function(a,b){D.unsubscribe(a,b)};this.destroy=function(c){t.unsubscribe(ops.OdtDocument.signalCursorAdded,a);t.unsubscribe(ops.OdtDocument.signalCursorRemoved,d);t.unsubscribe(ops.OdtDocument.signalCursorMoved,f);t.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,
b);t.unsubscribe(ops.OdtDocument.signalParagraphChanged,k);t.unsubscribe(ops.OdtDocument.signalOperationExecuted,r);c()};t.subscribe(ops.OdtDocument.signalCursorAdded,a);t.subscribe(ops.OdtDocument.signalCursorRemoved,d);t.subscribe(ops.OdtDocument.signalCursorMoved,f);t.subscribe(ops.OdtDocument.signalParagraphStyleModified,b);t.subscribe(ops.OdtDocument.signalParagraphChanged,k);t.subscribe(ops.OdtDocument.signalOperationExecuted,r);q()};gui.DirectTextStyler.textStylingChanged="textStyling/changed";
(function(){return gui.DirectTextStyler})();
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
gui.DirectParagraphStyler=function(h,m,e){function p(){function a(b,d,f){b!==d&&(void 0===c&&(c={}),c[f]=d);return d}var b=n.getCursor(m),b=b&&b.getSelectedRange(),c;w=a(w,b?y.isAlignedLeft(b):!1,"isAlignedLeft");v=a(v,b?y.isAlignedCenter(b):!1,"isAlignedCenter");t=a(t,b?y.isAlignedRight(b):!1,"isAlignedRight");s=a(s,b?y.isAlignedJustified(b):!1,"isAlignedJustified");c&&x.emit(gui.DirectParagraphStyler.paragraphStylingChanged,c)}function l(a){a.getMemberId()===m&&p()}function q(a){a===m&&p()}function a(a){a.getMemberId()===
m&&p()}function d(){p()}function f(a){var b=n.getCursor(m);b&&n.getParagraphElement(b.getNode())===a.paragraphElement&&p()}function b(a){var b=n.getCursor(m).getSelectedRange(),c=n.getCursorPosition(m),b=u.getParagraphElements(b),d=n.getFormatting();b.forEach(function(b){var f=c+n.getDistanceFromCursor(m,b,0),g=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=e.generateStyleName();var k,f=f+1;g&&(k=d.createDerivedStyleObject(g,"paragraph",{}));k=a(k||{});g=new ops.OpAddStyle;g.init({memberid:m,
styleName:b,styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:k});k=new ops.OpSetParagraphStyle;k.init({memberid:m,styleName:b,position:f});h.enqueue([g,k])})}function k(a){b(function(b){return r.mergeObjects(b,a)})}function c(a){k({"style:paragraph-properties":{"fo:text-align":a}})}function g(a,b){var c=n.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&u.parseLength(d);return r.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var n=h.getOdtDocument(),r=new core.Utils,u=new odf.OdfUtils,y=new gui.StyleHelper(n.getFormatting()),x=new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]),w,v,t,s;this.isAlignedLeft=function(){return w};this.isAlignedCenter=function(){return v};this.isAlignedRight=function(){return t};this.isAlignedJustified=function(){return s};this.alignParagraphLeft=function(){c("left");return!0};this.alignParagraphCenter=function(){c("center");
return!0};this.alignParagraphRight=function(){c("right");return!0};this.alignParagraphJustified=function(){c("justify");return!0};this.indent=function(){b(g.bind(null,1));return!0};this.outdent=function(){b(g.bind(null,-1));return!0};this.subscribe=function(a,b){x.subscribe(a,b)};this.unsubscribe=function(a,b){x.unsubscribe(a,b)};this.destroy=function(b){n.unsubscribe(ops.OdtDocument.signalCursorAdded,l);n.unsubscribe(ops.OdtDocument.signalCursorRemoved,q);n.unsubscribe(ops.OdtDocument.signalCursorMoved,
a);n.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,d);n.unsubscribe(ops.OdtDocument.signalParagraphChanged,f);b()};n.subscribe(ops.OdtDocument.signalCursorAdded,l);n.subscribe(ops.OdtDocument.signalCursorRemoved,q);n.subscribe(ops.OdtDocument.signalCursorMoved,a);n.subscribe(ops.OdtDocument.signalParagraphStyleModified,d);n.subscribe(ops.OdtDocument.signalParagraphChanged,f);p()};gui.DirectParagraphStyler.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectParagraphStyler})();
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
gui.KeyboardHandler=function(){function h(e,h){h||(h=m.None);return e+":"+h}var m=gui.KeyboardHandler.Modifier,e=null,p={};this.setDefault=function(h){e=h};this.bind=function(e,m,a){e=h(e,m);runtime.assert(!1===p.hasOwnProperty(e),"tried to overwrite the callback handler of key combo: "+e);p[e]=a};this.unbind=function(e,m){var a=h(e,m);delete p[a]};this.reset=function(){e=null;p={}};this.handleEvent=function(l){var q=l.keyCode,a=m.None;l.metaKey&&(a|=m.Meta);l.ctrlKey&&(a|=m.Ctrl);l.altKey&&(a|=m.Alt);
l.shiftKey&&(a|=m.Shift);q=h(q,a);q=p[q];a=!1;q?a=q():null!==e&&(a=e(l));a&&(l.preventDefault?l.preventDefault():l.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,CtrlAlt:6,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
// Input 76
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.ObjectNameGenerator");
gui.ImageManager=function(h,m,e){var p={"image/gif":".gif","image/jpeg":".jpg","image/png":".png"},l=odf.Namespaces.textns,q=h.getOdtDocument(),a=q.getFormatting(),d={};this.insertImage=function(f,b,k,c){var g;runtime.assert(0<k&&0<c,"Both width and height of the image should be greater than 0px.");g=q.getParagraphElement(q.getCursor(m).getNode()).getAttributeNS(l,"style-name");d.hasOwnProperty(g)||(d[g]=a.getContentSize(g,"paragraph"));g=d[g];k*=0.0264583333333334;c*=0.0264583333333334;var n=1,r=
1;k>g.width&&(n=g.width/k);c>g.height&&(r=g.height/c);n=Math.min(n,r);g=k*n;k=c*n;r=q.getOdfCanvas().odfContainer().rootElement.styles;c=f.toLowerCase();var n=p.hasOwnProperty(c)?p[c]:null,u;c=[];runtime.assert(null!==n,"Image type is not supported: "+f);n="Pictures/"+e.generateImageName()+n;u=new ops.OpSetBlob;u.init({memberid:m,filename:n,mimetype:f,content:b});c.push(u);a.getStyleElement("Graphics","graphic",[r])||(f=new ops.OpAddStyle,f.init({memberid:m,styleName:"Graphics",styleFamily:"graphic",
isAutomaticStyle:!1,setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph","svg:x":"0cm","svg:y":"0cm","style:wrap":"dynamic","style:number-wrapped-paragraphs":"no-limit","style:wrap-contour":"false","style:vertical-pos":"top","style:vertical-rel":"paragraph","style:horizontal-pos":"center","style:horizontal-rel":"paragraph"}}}),c.push(f));f=e.generateStyleName();b=new ops.OpAddStyle;b.init({memberid:m,styleName:f,styleFamily:"graphic",isAutomaticStyle:!0,setProperties:{"style:parent-style-name":"Graphics",
"style:graphic-properties":{"style:vertical-pos":"top","style:vertical-rel":"baseline","style:horizontal-pos":"center","style:horizontal-rel":"paragraph","fo:background-color":"transparent","style:background-transparency":"100%","style:shadow":"none","style:mirror":"none","fo:clip":"rect(0cm, 0cm, 0cm, 0cm)","draw:luminance":"0%","draw:contrast":"0%","draw:red":"0%","draw:green":"0%","draw:blue":"0%","draw:gamma":"100%","draw:color-inversion":"false","draw:image-opacity":"100%","draw:color-mode":"standard"}}});
c.push(b);u=new ops.OpInsertImage;u.init({memberid:m,position:q.getCursorPosition(m),filename:n,frameWidth:g+"cm",frameHeight:k+"cm",frameStyleName:f,frameName:e.generateFrameName()});c.push(u);h.enqueue(c)}};
// Input 77
runtime.loadClass("odf.Namespaces");
gui.ImageSelector=function(h){function m(){var a=h.getSizer(),d,f;d=l.createElement("div");d.id="imageSelector";d.style.borderWidth="1px";a.appendChild(d);p.forEach(function(a){f=l.createElement("div");f.className=a;d.appendChild(f)});return d}var e=odf.Namespaces.svgns,p="topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(" "),l=h.getElement().ownerDocument,q=!1;this.select=function(a){var d,f,b=l.getElementById("imageSelector");b||(b=m());q=!0;d=b.parentNode;
f=a.getBoundingClientRect();var k=d.getBoundingClientRect(),c=h.getZoomLevel();d=(f.left-k.left)/c-1;f=(f.top-k.top)/c-1;b.style.display="block";b.style.left=d+"px";b.style.top=f+"px";b.style.width=a.getAttributeNS(e,"width");b.style.height=a.getAttributeNS(e,"height")};this.clearSelection=function(){var a;q&&(a=l.getElementById("imageSelector"))&&(a.style.display="none");q=!1};this.isSelectorElement=function(a){var d=l.getElementById("imageSelector");return d?a===d||a.parentNode===d:!1}};
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
runtime.loadClass("core.PositionFilter");
gui.TextManipulator=function(h,m,e){function p(a){var b=new ops.OpRemoveText;b.init({memberid:m,position:a.position,length:a.length});return b}function l(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function q(f,b){var e=new core.PositionFilterChain,c=gui.SelectionMover.createPositionIterator(a.getRootElement(f)),g=b?c.nextPosition:c.previousPosition;e.addFilter("BaseFilter",a.getPositionFilter());e.addFilter("RootFilter",a.createRootFilter(m));for(c.setUnfilteredPosition(f,0);g();)if(e.acceptPosition(c)===
d)return!0;return!1}var a=h.getOdtDocument(),d=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.enqueueParagraphSplittingOps=function(){var d=l(a.getCursorSelection(m)),b,e=[];0<d.length&&(b=p(d),e.push(b));b=new ops.OpSplitParagraph;b.init({memberid:m,position:d.position});e.push(b);h.enqueue(e);return!0};this.removeTextByBackspaceKey=function(){var d=a.getCursor(m),b=l(a.getCursorSelection(m)),e=null;0===b.length?q(d.getNode(),!1)&&(e=new ops.OpRemoveText,e.init({memberid:m,position:b.position-
1,length:1}),h.enqueue([e])):(e=p(b),h.enqueue([e]));return null!==e};this.removeTextByDeleteKey=function(){var d=a.getCursor(m),b=l(a.getCursorSelection(m)),e=null;0===b.length?q(d.getNode(),!0)&&(e=new ops.OpRemoveText,e.init({memberid:m,position:b.position,length:1}),h.enqueue([e])):(e=p(b),h.enqueue([e]));return null!==e};this.removeCurrentSelection=function(){var d=l(a.getCursorSelection(m));0!==d.length&&(d=p(d),h.enqueue([d]));return!0};this.insertText=function(d){var b=l(a.getCursorSelection(m)),
k,c=[];0<b.length&&(k=p(b),c.push(k));k=new ops.OpInsertText;k.init({memberid:m,position:b.position,text:d});c.push(k);e&&(d=e(b.position,d.length))&&c.push(d);h.enqueue(c)}};(function(){return gui.TextManipulator})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.PositionFilter");runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.SelectionMover");
gui.AnnotationManager=function(h,m){function e(){var e=a.getCursor(m),e=e&&e.getNode(),c;if(c=e){a:{for(c=a.getRootNode();e&&e!==c;){if(e.namespaceURI===b&&"annotation"===e.localName){e=!0;break a}e=e.parentNode}e=!1}c=!e}e=c;e!==d&&(d=e,f.emit(gui.AnnotationManager.annotatableChanged,d))}function p(a){a.getMemberId()===m&&e()}function l(a){a===m&&e()}function q(a){a.getMemberId()===m&&e()}var a=h.getOdtDocument(),d=!1,f=new core.EventNotifier([gui.AnnotationManager.annotatableChanged]),b=odf.Namespaces.officens;
this.isAnnotatable=function(){return d};this.addAnnotation=function(){var b=new ops.OpAddAnnotation,c=a.getCursorSelection(m),f=c.length,c=c.position;d&&(c=0<=f?c:c+f,f=Math.abs(f),b.init({memberid:m,position:c,length:f,name:m+Date.now()}),h.enqueue([b]))};this.removeAnnotation=function(b){var c,d;c=a.convertDomPointToCursorStep(b,0)+1;d=a.convertDomPointToCursorStep(b,b.childNodes.length);b=new ops.OpRemoveAnnotation;b.init({memberid:m,position:c,length:d-c});d=new ops.OpMoveCursor;d.init({memberid:m,
position:0<c?c-1:c,length:0});h.enqueue([b,d])};this.subscribe=function(a,b){f.subscribe(a,b)};this.unsubscribe=function(a,b){f.unsubscribe(a,b)};this.destroy=function(b){a.unsubscribe(ops.OdtDocument.signalCursorAdded,p);a.unsubscribe(ops.OdtDocument.signalCursorRemoved,l);a.unsubscribe(ops.OdtDocument.signalCursorMoved,q);b()};a.subscribe(ops.OdtDocument.signalCursorAdded,p);a.subscribe(ops.OdtDocument.signalCursorRemoved,l);a.subscribe(ops.OdtDocument.signalCursorMoved,q);e()};
gui.AnnotationManager.annotatableChanged="annotatable/changed";(function(){return gui.AnnotationManager})();
// Input 80
gui.EventManager=function(h){function m(a){var b=a.scrollX,d=a.scrollY;this.restore=function(){a.scrollX===b&&a.scrollY===d||a.scrollTo(b,d)}}function e(a){var b=a.scrollTop,d=a.scrollLeft;this.restore=function(){if(a.scrollTop!==b||a.scrollLeft!==d)a.scrollTop=b,a.scrollLeft=d}}function p(){return h.getDOM().activeElement===l}var l=h.getOdfCanvas().getElement(),q=runtime.getWindow(),a={beforecut:!0,beforepaste:!0},d={mousedown:!0,mouseup:!0};this.subscribe=function(f,b){var e=l;d[f]&&q&&(e=q);var c=
"on"+f,g=!1;e.attachEvent&&(g=e.attachEvent(c,b));!g&&e.addEventListener&&(e.addEventListener(f,b,!1),g=!0);g&&!a[f]||!e.hasOwnProperty(c)||(e[c]=b)};this.unsubscribe=function(a,b){var e=l;d[a]&&q&&(e=q);var c="on"+a;e.detachEvent&&e.detachEvent(c,b);e.removeEventListener&&e.removeEventListener(a,b,!1);e[c]===b&&(e[c]=null)};this.hasFocus=p;this.focus=function(){var a;if(!p()){for(a=l;a&&!a.scrollTop&&!a.scrollLeft;)a=a.parentNode;a=a?new e(a):q?new m(q):null;l.focus();a&&a.restore()}}};
// Input 81
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Async");runtime.loadClass("core.ScheduledTask");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.ObjectNameGenerator");runtime.loadClass("ops.OdtCursor");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.DirectTextStyler");runtime.loadClass("gui.DirectParagraphStyler");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.ImageManager");
runtime.loadClass("gui.ImageSelector");runtime.loadClass("gui.TextManipulator");runtime.loadClass("gui.AnnotationManager");runtime.loadClass("gui.EventManager");runtime.loadClass("gui.PlainTextPasteboard");
gui.SessionController=function(){var h=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(m,e,p,l){function q(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function a(a,b,c){var d=new ops.OpMoveCursor;d.init({memberid:e,position:a,length:b||0,selectionType:c});return d}function d(b){b=J.getDistanceFromCursor(e,b,0);var c=null!==b?b+1:null,d;if(c||b)d=J.getCursorPosition(e),b=a(d+b,c-b,ops.OdtCursor.RegionSelection),m.enqueue([b]);X.focus()}function f(b,c){var d,
f,g,h;f=J.getOdfCanvas().getElement();d=c.detail;if(b){if(!b.anchorNode&&!b.focusNode){g=c.clientX;h=c.clientY;var k=J.getDOM();k.caretRangeFromPoint?(g=k.caretRangeFromPoint(g,h),g={container:g.startContainer,offset:g.startOffset}):k.caretPositionFromPoint?(g=k.caretPositionFromPoint(g,h),g={container:g.offsetNode,offset:g.offset}):g=null;if(!g)return;b.anchorNode=g.container;b.anchorOffset=g.offset;b.focusNode=b.anchorNode;b.focusOffset=b.anchorOffset}runtime.assert(null!==b.anchorNode&&null!==
b.focusNode,"anchorNode or focusNode is null");g=fa.containsNode(f,b.anchorNode);f=fa.containsNode(f,b.focusNode);if(g||f){if(g&&f)if(2===d){var k=/[A-Za-z0-9]/,l=gui.SelectionMover.createPositionIterator(J.getRootNode()),n=0<fa.comparePoints(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset),p;n?(g=b.anchorNode,h=b.anchorOffset,d=b.focusNode,f=b.focusOffset):(g=b.focusNode,h=b.focusOffset,d=b.anchorNode,f=b.anchorOffset);for(l.setUnfilteredPosition(g,h);l.previousPosition();){p=l.getCurrentNode();
if(p.nodeType===Node.TEXT_NODE){if(p=p.data[l.unfilteredDomOffset()],!k.test(p))break}else if(!W.isTextSpan(p))break;g=l.container();h=l.unfilteredDomOffset()}l.setUnfilteredPosition(d,f);do if(p=l.getCurrentNode(),p.nodeType===Node.TEXT_NODE){if(p=p.data[l.unfilteredDomOffset()],!k.test(p))break}else if(!W.isTextSpan(p))break;while(l.nextPosition());d=l.container();f=l.unfilteredDomOffset();n?(b.anchorNode=g,b.anchorOffset=h,b.focusNode=d,b.focusOffset=f):(b.focusNode=g,b.focusOffset=h,b.anchorNode=
d,b.anchorOffset=f)}else 3<=d&&(d=J.getParagraphElement(b.anchorNode),f=J.getParagraphElement(b.focusNode),d&&(b.anchorNode=d,b.anchorOffset=0),f&&(b.focusNode=f,b.focusOffset=f.childNodes.length));f=J.convertDomToCursorRange(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset);d=J.getCursorSelection(e);if(f.position!==d.position||f.length!==d.length)d=a(f.position,f.length,ops.OdtCursor.RangeSelection),m.enqueue([d]);X.focus()}}}function b(b){var c=J.getCursorSelection(e),d=J.getCursor(e).getStepCounter();
0!==b&&(b=0<b?d.convertForwardStepsBetweenFilters(b,la,ta):-d.convertBackwardStepsBetweenFilters(-b,la,ta),b=c.length+b,m.enqueue([a(c.position,b)]))}function k(b){var c=J.getCursorPosition(e),d=J.getCursor(e).getStepCounter();0!==b&&(b=0<b?d.convertForwardStepsBetweenFilters(b,la,ta):-d.convertBackwardStepsBetweenFilters(-b,la,ta),m.enqueue([a(c+b,0)]))}function c(){k(-1);return!0}function g(){k(1);return!0}function n(){b(-1);return!0}function r(){b(1);return!0}function u(a,c){var d=J.getParagraphElement(J.getCursor(e).getNode());
runtime.assert(Boolean(d),"SessionController: Cursor outside paragraph");d=J.getCursor(e).getStepCounter().countLinesSteps(a,la);c?b(d):k(d)}function y(){u(-1,!1);return!0}function x(){u(1,!1);return!0}function w(){u(-1,!0);return!0}function v(){u(1,!0);return!0}function t(a,c){var d=J.getCursor(e).getStepCounter().countStepsToLineBoundary(a,la);c?b(d):k(d)}function s(){t(-1,!1);return!0}function D(){t(1,!1);return!0}function A(){t(-1,!0);return!0}function C(){t(1,!0);return!0}function I(){var a=
J.getParagraphElement(J.getCursor(e).getNode()),c,d;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");d=J.getDistanceFromCursor(e,a,0);c=gui.SelectionMover.createPositionIterator(J.getRootNode());for(c.setUnfilteredPosition(a,0);0===d&&c.previousPosition();)a=c.getCurrentNode(),W.isParagraph(a)&&(d=J.getDistanceFromCursor(e,a,0));b(d);return!0}function z(){var a=J.getParagraphElement(J.getCursor(e).getNode()),c,d;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");
c=gui.SelectionMover.createPositionIterator(J.getRootNode());c.moveToEndOfNode(a);for(d=J.getDistanceFromCursor(e,c.container(),c.unfilteredDomOffset());0===d&&c.nextPosition();)a=c.getCurrentNode(),W.isParagraph(a)&&(c.moveToEndOfNode(a),d=J.getDistanceFromCursor(e,c.container(),c.unfilteredDomOffset()));b(d);return!0}function M(a,c){var d=gui.SelectionMover.createPositionIterator(J.getRootNode());0<a&&d.moveToEnd();d=J.getDistanceFromCursor(e,d.container(),d.unfilteredDomOffset());c?b(d):k(d)}function H(){M(-1,
!1);return!0}function R(){M(1,!1);return!0}function Z(){M(-1,!0);return!0}function ja(){M(1,!0);return!0}function E(){var b=J.getRootNode(),b=J.convertDomPointToCursorStep(b,b.childNodes.length);m.enqueue([a(0,b)]);return!0}function ka(){var a=J.getCursor(e),b=U.getSelection(),c;a?(ua.clearSelection(),a.getSelectionType()===ops.OdtCursor.RegionSelection&&(c=W.getImageElements(a.getSelectedRange())[0])&&ua.select(c.parentNode),X.hasFocus()&&(c=a.getSelectedRange(),b.extend?a.hasForwardSelection()?
(b.collapse(c.startContainer,c.startOffset),b.extend(c.endContainer,c.endOffset)):(b.collapse(c.endContainer,c.endOffset),b.extend(c.startContainer,c.startOffset)):(b.removeAllRanges(),b.addRange(c.cloneRange())))):ua.clearSelection()}function ba(){runtime.setTimeout(ka,0)}function ga(a){var b=J.getCursor(e);b.getSelectedRange().collapsed||(ha.setDataFromRange(a,b.getSelectedRange())?na.removeCurrentSelection():runtime.log("Cut operation failed"))}function S(){return!1!==J.getCursor(e).getSelectedRange().collapsed}
function Y(a){var b=J.getCursor(e);b.getSelectedRange().collapsed||ha.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function V(a){var b;U.clipboardData&&U.clipboardData.getData?b=U.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(na.removeCurrentSelection(),m.enqueue(ya.createPasteOps(b)),a.preventDefault?a.preventDefault():a.returnValue=!1)}function N(){return!1}function L(a){if(ea)ea.onOperationExecuted(a)}
function G(a){J.emit(ops.OdtDocument.signalUndoStackChanged,a)}function Q(){return ea?(ea.moveBackward(1),ka(),!0):!1}function O(){return ea?(ea.moveForward(1),ka(),!0):!1}function ca(a){if(ma=(a=a.target||a.srcElement)&&fa.containsNode(J.getOdfCanvas().getElement(),a))va=!1,wa=J.createRootFilter(a)}function oa(a){var b=a.getSelectedRange();return a.hasForwardSelection()?{anchorNode:b.startContainer,anchorOffset:b.startOffset,focusNode:b.endContainer,focusOffset:b.endOffset}:{anchorNode:b.endContainer,
anchorOffset:b.endOffset,focusNode:b.startContainer,focusOffset:b.startOffset}}function da(a){var b=a.target||a.srcElement,c={detail:a.detail,clientX:a.clientX,clientY:a.clientY,target:b};qa.processRequests();W.isImage(b)&&W.isCharacterFrame(b.parentNode)?d(b.parentNode):ma&&!ua.isSelectorElement(b)&&(va?f(oa(p),a):runtime.setTimeout(function(){var a;a=(a=U.getSelection())?{anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}:null;f(a,c)},0));va=ma=
!1}function T(a){da(a)}function P(a){var b=a.target||a.srcElement,c=null;"annotationRemoveButton"===b.className?(c=fa.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0],pa.removeAnnotation(c)):da(a)}function ra(){var a=U.getSelection(),b;ma&&0<a.rangeCount&&(va=!0,ua.clearSelection(),xa.setUnfilteredPosition(a.focusNode,a.focusOffset),wa.acceptPosition(xa)===h&&(b=a.getRangeAt(0).cloneRange(),a=a.anchorNode===b.startContainer&&a.anchorOffset===b.startOffset,p.setSelectedRange(b,
a),J.emit(ops.OdtDocument.signalCursorMoved,p)))}function $(a){return function(){a();return!0}}function F(a){return function(b){return J.getCursor(e).getSelectionType()===ops.OdtCursor.RangeSelection?a(b):!0}}var U=runtime.getWindow(),J=m.getOdtDocument(),ia=new core.Async,fa=new core.DomUtils,W=new odf.OdfUtils,ha=new gui.Clipboard,B=new gui.KeyboardHandler,sa=new gui.KeyboardHandler,la=new core.PositionFilterChain,ta=J.getPositionFilter(),ma=!1,za=new odf.ObjectNameGenerator(J.getOdfCanvas().odfContainer(),
e),va=!1,wa=null,ea=null,X=new gui.EventManager(J),pa=new gui.AnnotationManager(m,e),aa=new gui.DirectTextStyler(m,e),K=l&&l.directParagraphStylingEnabled?new gui.DirectParagraphStyler(m,e,za):null,na=new gui.TextManipulator(m,e,aa.createCursorStyleOp),Aa=new gui.ImageManager(m,e,za),ua=new gui.ImageSelector(J.getOdfCanvas()),xa=gui.SelectionMover.createPositionIterator(J.getRootNode()),qa,ya=new gui.PlainTextPasteboard(J,e);runtime.assert(null!==U,"Expected to be run in an environment which has a global window, like a browser.");
la.addFilter("BaseFilter",ta);la.addFilter("RootFilter",J.createRootFilter(e));this.selectRange=f;this.moveCursorToLeft=c;this.moveCursorToDocumentBoundary=M;this.extendSelectionToEntireDocument=E;this.startEditing=function(){var a;J.getOdfCanvas().getElement().classList.add("virtualSelections");X.subscribe("keydown",B.handleEvent);X.subscribe("keypress",sa.handleEvent);X.subscribe("keyup",q);X.subscribe("beforecut",S);X.subscribe("cut",ga);X.subscribe("copy",Y);X.subscribe("beforepaste",N);X.subscribe("paste",
V);X.subscribe("mousedown",ca);X.subscribe("mousemove",qa.trigger);X.subscribe("mouseup",P);X.subscribe("contextmenu",T);X.subscribe("focus",ba);J.subscribe(ops.OdtDocument.signalOperationExecuted,ka);J.subscribe(ops.OdtDocument.signalOperationExecuted,L);a=new ops.OpAddCursor;a.init({memberid:e});m.enqueue([a]);ea&&ea.saveInitialState()};this.endEditing=function(){var a;a=new ops.OpRemoveCursor;a.init({memberid:e});m.enqueue([a]);ea&&ea.resetInitialState();J.unsubscribe(ops.OdtDocument.signalOperationExecuted,
L);J.unsubscribe(ops.OdtDocument.signalOperationExecuted,ka);X.unsubscribe("keydown",B.handleEvent);X.unsubscribe("keypress",sa.handleEvent);X.unsubscribe("keyup",q);X.unsubscribe("cut",ga);X.unsubscribe("beforecut",S);X.unsubscribe("copy",Y);X.unsubscribe("paste",V);X.unsubscribe("beforepaste",N);X.unsubscribe("mousemove",qa.trigger);X.unsubscribe("mousedown",ca);X.unsubscribe("mouseup",P);X.unsubscribe("contextmenu",T);X.unsubscribe("focus",ba);J.getOdfCanvas().getElement().classList.remove("virtualSelections")};
this.getInputMemberId=function(){return e};this.getSession=function(){return m};this.setUndoManager=function(a){ea&&ea.unsubscribe(gui.UndoManager.signalUndoStackChanged,G);if(ea=a)ea.setOdtDocument(J),ea.setPlaybackFunction(function(a){a.execute(J)}),ea.subscribe(gui.UndoManager.signalUndoStackChanged,G)};this.getUndoManager=function(){return ea};this.getAnnotationManager=function(){return pa};this.getDirectTextStyler=function(){return aa};this.getDirectParagraphStyler=function(){return K};this.getImageManager=
function(){return Aa};this.getTextManipulator=function(){return na};this.getEventManager=function(){return X};this.getKeyboardHandlers=function(){return{keydown:B,keypress:sa}};this.destroy=function(a){var b=[qa.destroy,aa.destroy];K&&b.push(K.destroy);ia.destroyAll(b,a)};(function(){var a=-1!==U.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,d=gui.KeyboardHandler.KeyCode;qa=new core.ScheduledTask(ra,0);B.bind(d.Tab,b.None,F(function(){na.insertText("\t");return!0}));
B.bind(d.Left,b.None,F(c));B.bind(d.Right,b.None,F(g));B.bind(d.Up,b.None,F(y));B.bind(d.Down,b.None,F(x));B.bind(d.Backspace,b.None,$(na.removeTextByBackspaceKey));B.bind(d.Delete,b.None,na.removeTextByDeleteKey);B.bind(d.Left,b.Shift,F(n));B.bind(d.Right,b.Shift,F(r));B.bind(d.Up,b.Shift,F(w));B.bind(d.Down,b.Shift,F(v));B.bind(d.Home,b.None,F(s));B.bind(d.End,b.None,F(D));B.bind(d.Home,b.Ctrl,F(H));B.bind(d.End,b.Ctrl,F(R));B.bind(d.Home,b.Shift,F(A));B.bind(d.End,b.Shift,F(C));B.bind(d.Up,b.CtrlShift,
F(I));B.bind(d.Down,b.CtrlShift,F(z));B.bind(d.Home,b.CtrlShift,F(Z));B.bind(d.End,b.CtrlShift,F(ja));a?(B.bind(d.Clear,b.None,na.removeCurrentSelection),B.bind(d.Left,b.Meta,F(s)),B.bind(d.Right,b.Meta,F(D)),B.bind(d.Home,b.Meta,F(H)),B.bind(d.End,b.Meta,F(R)),B.bind(d.Left,b.MetaShift,F(A)),B.bind(d.Right,b.MetaShift,F(C)),B.bind(d.Up,b.AltShift,F(I)),B.bind(d.Down,b.AltShift,F(z)),B.bind(d.Up,b.MetaShift,F(Z)),B.bind(d.Down,b.MetaShift,F(ja)),B.bind(d.A,b.Meta,F(E)),B.bind(d.B,b.Meta,F(aa.toggleBold)),
B.bind(d.I,b.Meta,F(aa.toggleItalic)),B.bind(d.U,b.Meta,F(aa.toggleUnderline)),K&&(B.bind(d.L,b.MetaShift,F(K.alignParagraphLeft)),B.bind(d.E,b.MetaShift,F(K.alignParagraphCenter)),B.bind(d.R,b.MetaShift,F(K.alignParagraphRight)),B.bind(d.J,b.MetaShift,F(K.alignParagraphJustified))),pa&&B.bind(d.C,b.MetaShift,pa.addAnnotation),B.bind(d.Z,b.Meta,Q),B.bind(d.Z,b.MetaShift,O)):(B.bind(d.A,b.Ctrl,F(E)),B.bind(d.B,b.Ctrl,F(aa.toggleBold)),B.bind(d.I,b.Ctrl,F(aa.toggleItalic)),B.bind(d.U,b.Ctrl,F(aa.toggleUnderline)),
K&&(B.bind(d.L,b.CtrlShift,F(K.alignParagraphLeft)),B.bind(d.E,b.CtrlShift,F(K.alignParagraphCenter)),B.bind(d.R,b.CtrlShift,F(K.alignParagraphRight)),B.bind(d.J,b.CtrlShift,F(K.alignParagraphJustified))),pa&&B.bind(d.C,b.CtrlAlt,pa.addAnnotation),B.bind(d.Z,b.Ctrl,Q),B.bind(d.Z,b.CtrlShift,O));sa.setDefault(F(function(a){var b;b=null===a.which||void 0===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:
(na.insertText(b),!0)}));sa.bind(d.Enter,b.None,F(na.enqueueParagraphSplittingOps))})()};return gui.SessionController}();
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
ops.MemberModel=function(){};ops.MemberModel.prototype.getMemberDetailsAndUpdates=function(h,m){};ops.MemberModel.prototype.unsubscribeMemberDetailsUpdates=function(h,m){};ops.MemberModel.prototype.close=function(h){};
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
ops.TrivialMemberModel=function(){this.getMemberDetailsAndUpdates=function(h,m){m(h,{memberid:h,fullname:runtime.tr("Unknown Author"),color:"black",imageurl:"avatar-joe.png"})};this.unsubscribeMemberDetailsUpdates=function(h,m){};this.close=function(h){h()}};
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(h){};ops.OperationRouter.prototype.setPlaybackFunction=function(h){};ops.OperationRouter.prototype.push=function(h){};ops.OperationRouter.prototype.close=function(h){};
// Input 85
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
ops.TrivialOperationRouter=function(){var h,m;this.setOperationFactory=function(e){h=e};this.setPlaybackFunction=function(e){m=e};this.push=function(e){e.forEach(function(e){e=e.spec();e.timestamp=(new Date).getTime();e=h.create(e);m(e)})};this.close=function(e){e()}};
// Input 86
gui.EditInfoHandle=function(h){var m=[],e,p=h.ownerDocument,l=p.documentElement.namespaceURI;this.setEdits=function(h){m=h;var a,d,f,b;e.innerHTML="";for(h=0;h<m.length;h+=1)a=p.createElementNS(l,"div"),a.className="editInfo",d=p.createElementNS(l,"span"),d.className="editInfoColor",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[h].memberid),f=p.createElementNS(l,"span"),f.className="editInfoAuthor",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[h].memberid),
b=p.createElementNS(l,"span"),b.className="editInfoTime",b.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",m[h].memberid),b.innerHTML=m[h].time,a.appendChild(d),a.appendChild(f),a.appendChild(b),e.appendChild(a)};this.show=function(){e.style.display="block"};this.hide=function(){e.style.display="none"};this.destroy=function(l){h.removeChild(e);l()};e=p.createElementNS(l,"div");e.setAttribute("class","editInfoHandle");e.style.display="none";h.appendChild(e)};
// Input 87
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
gui.EditInfoMarker=function(h,m){function e(b,d){return runtime.setTimeout(function(){a.style.opacity=b},d)}var p=this,l,q,a,d,f;this.addEdit=function(b,k){var c=Date.now()-k;h.addEdit(b,k);q.setEdits(h.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);d&&runtime.clearTimeout(d);f&&runtime.clearTimeout(f);1E4>c?(e(1,0),d=e(0.5,1E4-c),f=e(0.2,2E4-c)):1E4<=c&&2E4>c?(e(0.5,0),f=e(0.2,2E4-c)):e(0.2,0)};this.getEdits=function(){return h.getEdits()};this.clearEdits=function(){h.clearEdits();
q.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return h};this.show=function(){a.style.display="block"};this.hide=function(){p.hideHandle();a.style.display="none"};this.showHandle=function(){q.show()};this.hideHandle=function(){q.hide()};this.destroy=function(b){l.removeChild(a);q.destroy(function(a){a?b(a):h.destroy(b)})};(function(){var b=h.getOdtDocument().getDOM();
a=b.createElementNS(b.documentElement.namespaceURI,"div");a.setAttribute("class","editInfoMarker");a.onmouseover=function(){p.showHandle()};a.onmouseout=function(){p.hideHandle()};l=h.getNode();l.appendChild(a);q=new gui.EditInfoHandle(l);m||p.hide()})()};
// Input 88
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
gui.SessionView=function(){return function(h,m,e,p,l){function q(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid="'+a+'"]'+e+c;a:{var f=u.firstChild;for(b=b+'[editinfo|memberid="'+a+'"]'+e+"{";f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:u.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',
":before");d("dc|creator",'{ content: "'+b+'"; display: none;}',":before");d("dc|creator","{ background-color: "+c+"; }","");d("div.selectionOverlay","{ background-color: "+c+";}","")}function a(a){var b,c;for(c in x)x.hasOwnProperty(c)&&(b=x[c],a?b.show():b.hide())}function d(a){p.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function f(a,b){var c=p.getCaret(a);b?(c&&(c.setAvatarImageUrl(b.imageurl),c.setColor(b.color)),q(a,b.fullname,b.color),m===a&&q("",b.fullname,b.color)):
runtime.log('MemberModel sent undefined data for member "'+a+'".')}function b(a){var b=a.getMemberId(),c=e.getMemberModel();p.registerCursor(a,v,t);l.registerCursor(a,!0);f(b,null);c.getMemberDetailsAndUpdates(b,f);runtime.log("+++ View here +++ eagerly created an Caret for '"+b+"'! +++")}function k(a){a=a.getMemberId();var b=l.getSelectionView(m),c=l.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),d=p.getCaret(m);a===m?(c.hide(),b.show(),d&&d.show()):a===gui.ShadowCursor.ShadowCursorMemberId&&
(c.show(),b.hide(),d&&d.hide())}function c(a){var b=!1,c;for(c in x)if(x.hasOwnProperty(c)&&x[c].getEditInfo().getEdits().hasOwnProperty(a)){b=!0;break}l.removeSelectionView(a);b||e.getMemberModel().unsubscribeMemberDetailsUpdates(a,f)}function g(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,f="",g=b.getElementsByTagNameNS(y,"editinfo")[0];g?(f=g.getAttributeNS(y,"id"),d=x[f]):(f=Math.random().toString(),d=new ops.EditInfo(b,e.getOdtDocument()),d=new gui.EditInfoMarker(d,w),g=b.getElementsByTagNameNS(y,
"editinfo")[0],g.setAttributeNS(y,"id",f),x[f]=d);d.addEdit(c,new Date(a))}function n(){D=!0}function r(){s=runtime.getWindow().setInterval(function(){D&&(l.rerenderSelectionViews(),D=!1)},200)}var u,y="urn:webodf:names:editinfo",x={},w=void 0!==h.editInfoMarkersInitiallyVisible?Boolean(h.editInfoMarkersInitiallyVisible):!0,v=void 0!==h.caretAvatarsInitiallyVisible?Boolean(h.caretAvatarsInitiallyVisible):!0,t=void 0!==h.caretBlinksOnRangeSelect?Boolean(h.caretBlinksOnRangeSelect):!0,s,D=!1;this.showEditInfoMarkers=
function(){w||(w=!0,a(w))};this.hideEditInfoMarkers=function(){w&&(w=!1,a(w))};this.showCaretAvatars=function(){v||(v=!0,d(v))};this.hideCaretAvatars=function(){v&&(v=!1,d(v))};this.getSession=function(){return e};this.getCaret=function(a){return p.getCaret(a)};this.destroy=function(a){var d=e.getOdtDocument(),h=e.getMemberModel(),l=Object.keys(x).map(function(a){return x[a]});d.unsubscribe(ops.OdtDocument.signalCursorAdded,b);d.unsubscribe(ops.OdtDocument.signalCursorRemoved,c);d.unsubscribe(ops.OdtDocument.signalParagraphChanged,
g);d.unsubscribe(ops.OdtDocument.signalCursorMoved,k);d.unsubscribe(ops.OdtDocument.signalParagraphChanged,n);d.unsubscribe(ops.OdtDocument.signalTableAdded,n);d.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,n);runtime.getWindow().clearInterval(s);p.getCarets().forEach(function(a){h.unsubscribeMemberDetailsUpdates(a.getCursor().getMemberId(),f)});u.parentNode.removeChild(u);(function H(b,c){c?a(c):b<l.length?l[b].destroy(function(a){H(b+1,a)}):a()})(0,void 0)};(function(){var a=e.getOdtDocument(),
d=document.getElementsByTagName("head")[0];a.subscribe(ops.OdtDocument.signalCursorAdded,b);a.subscribe(ops.OdtDocument.signalCursorRemoved,c);a.subscribe(ops.OdtDocument.signalParagraphChanged,g);a.subscribe(ops.OdtDocument.signalCursorMoved,k);r();a.subscribe(ops.OdtDocument.signalParagraphChanged,n);a.subscribe(ops.OdtDocument.signalTableAdded,n);a.subscribe(ops.OdtDocument.signalParagraphStyleModified,n);u=document.createElementNS(d.namespaceURI,"style");u.type="text/css";u.media="screen, print, handheld, projection";
u.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));u.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));d.appendChild(u)})()}}();
// Input 89
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
gui.CaretManager=function(h){function m(a){return g.hasOwnProperty(a)?g[a]:null}function e(){return Object.keys(g).map(function(a){return g[a]})}function p(a){a===h.getInputMemberId()&&h.getSession().getOdtDocument().getOdfCanvas().getElement().removeAttribute("tabindex");delete g[a]}function l(a){a=a.getMemberId();a===h.getInputMemberId()&&(a=m(a))&&a.refreshCursorBlinking()}function q(){var a=m(h.getInputMemberId());r=!1;a&&a.ensureVisible()}function a(){var a=m(h.getInputMemberId());a&&(a.handleUpdate(),
r||(r=!0,runtime.setTimeout(q,50)))}function d(b){b.memberId===h.getInputMemberId()&&a()}function f(){var a=m(h.getInputMemberId());a&&a.setFocus()}function b(){var a=m(h.getInputMemberId());a&&a.removeFocus()}function k(){var a=m(h.getInputMemberId());a&&a.show()}function c(){var a=m(h.getInputMemberId());a&&a.hide()}var g={},n=runtime.getWindow(),r=!1;this.registerCursor=function(b,c,d){var e=b.getMemberId();c=new gui.Caret(b,c,d);g[e]=c;e===h.getInputMemberId()?(runtime.log("Starting to track input on new cursor of "+
e),b.handleUpdate=a,h.getSession().getOdtDocument().getOdfCanvas().getElement().setAttribute("tabindex",-1),h.getEventManager().focus()):b.handleUpdate=c.handleUpdate;return c};this.getCaret=m;this.getCarets=e;this.destroy=function(a){var m=h.getSession().getOdtDocument(),q=h.getEventManager(),r=e();m.unsubscribe(ops.OdtDocument.signalParagraphChanged,d);m.unsubscribe(ops.OdtDocument.signalCursorMoved,l);m.unsubscribe(ops.OdtDocument.signalCursorRemoved,p);q.unsubscribe("focus",f);q.unsubscribe("blur",
b);n.removeEventListener("focus",k,!1);n.removeEventListener("blur",c,!1);(function t(b,c){c?a(c):b<r.length?r[b].destroy(function(a){t(b+1,a)}):a()})(0,void 0);g={}};(function(){var a=h.getSession().getOdtDocument(),e=h.getEventManager();a.subscribe(ops.OdtDocument.signalParagraphChanged,d);a.subscribe(ops.OdtDocument.signalCursorMoved,l);a.subscribe(ops.OdtDocument.signalCursorRemoved,p);e.subscribe("focus",f);e.subscribe("blur",b);n.addEventListener("focus",k,!1);n.addEventListener("blur",c,!1)})()};
// Input 90
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(h,m){};gui.UndoManager.prototype.unsubscribe=function(h,m){};gui.UndoManager.prototype.setOdtDocument=function(h){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(h){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(h){};gui.UndoManager.prototype.moveBackward=function(h){};gui.UndoManager.prototype.onOperationExecuted=function(h){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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
gui.UndoStateRules=function(){function h(e){return e.spec().optype}function m(e){switch(h(e)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=h;this.isEditOperation=m;this.isPartOfOperationSet=function(e,p){if(m(e)){if(0===p.length)return!0;var l;if(l=m(p[p.length-1]))a:{l=p.filter(m);var q=h(e),a;b:switch(q){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&q===h(l[0])){if(1===l.length){l=!0;break a}q=l[l.length-2].spec().position;
l=l[l.length-1].spec().position;a=e.spec().position;if(l===a-(l-q)){l=!0;break a}}l=!1}return l}return!0}};
// Input 92
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
gui.TrivialUndoManager=function(h){function m(){u.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:a.hasUndoStates(),redoAvailable:a.hasRedoStates()})}function e(){g!==b&&g!==n[n.length-1]&&n.push(g)}function p(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);d.normalizeTextNodes(b)}function l(a){return Object.keys(a).map(function(b){return a[b]})}function q(a){function b(a){var c=a.spec();if(f[c.memberid])switch(c.optype){case "AddCursor":d[c.memberid]||(d[c.memberid]=
a,delete f[c.memberid],g-=1);break;case "MoveCursor":e[c.memberid]||(e[c.memberid]=a)}}var d={},e={},f={},g,h=a.pop();c.getCursors().forEach(function(a){f[a.getMemberId()]=!0});for(g=Object.keys(f).length;h&&0<g;)h.reverse(),h.forEach(b),h=a.pop();return l(d).concat(l(e))}var a=this,d=new core.DomUtils,f,b=[],k,c,g=[],n=[],r=[],u=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
y=h||new gui.UndoStateRules;this.subscribe=function(a,b){u.subscribe(a,b)};this.unsubscribe=function(a,b){u.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<n.length};this.hasRedoStates=function(){return 0<r.length};this.setOdtDocument=function(a){c=a};this.resetInitialState=function(){n.length=0;r.length=0;b.length=0;g.length=0;f=null;m()};this.saveInitialState=function(){var a=c.getOdfCanvas().odfContainer(),h=c.getOdfCanvas().getAnnotationManager();h&&h.forgetAnnotations();f=a.rootElement.cloneNode(!0);
c.getOdfCanvas().refreshAnnotations();a=f;d.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(p);d.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(p);e();n.unshift(b);g=b=q(n);n.length=0;r.length=0;m()};this.setPlaybackFunction=function(a){k=a};this.onOperationExecuted=function(a){r.length=0;y.isEditOperation(a)&&g===b||!y.isPartOfOperationSet(a,g)?(e(),g=[a],n.push(g),u.emit(gui.UndoManager.signalUndoStateCreated,{operations:g}),m()):(g.push(a),u.emit(gui.UndoManager.signalUndoStateModified,
{operations:g}))};this.moveForward=function(a){for(var b=0,c;a&&r.length;)c=r.pop(),n.push(c),c.forEach(k),a-=1,b+=1;b&&(g=n[n.length-1],m());return b};this.moveBackward=function(a){for(var d=c.getOdfCanvas(),e=d.odfContainer(),h=0;a&&n.length;)r.push(n.pop()),a-=1,h+=1;h&&(e.setRootElement(f.cloneNode(!0)),d.setOdfContainer(e,!0),u.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),c.getCursors().forEach(function(a){c.removeCursor(a.getMemberId())}),b.forEach(k),n.forEach(function(a){a.forEach(k)}),
d.refreshCSS(),g=n[n.length-1]||b,m());return h}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
// Input 93
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("gui.SelectionMover");
gui.SelectionView=function(h){function m(a){if(C&&a.nodeType===Node.ELEMENT_NODE)return a.getBoundingClientRect();D.selectNode(a);return D.getBoundingClientRect()}function e(a,b){a.style.left=b.left+"px";a.style.top=b.top+"px";a.style.width=b.width+"px";a.style.height=b.height+"px"}function p(a){s=a;y.style.display=x.style.display=w.style.display=!0===a?"block":"none"}function l(a){var b=m(r),c=n.getOdfCanvas().getZoomLevel(),d={};d.top=t.adaptRangeDifferenceToZoomLevel(a.top-b.top,c);d.left=t.adaptRangeDifferenceToZoomLevel(a.left-
b.left,c);d.bottom=t.adaptRangeDifferenceToZoomLevel(a.bottom-b.top,c);d.right=t.adaptRangeDifferenceToZoomLevel(a.right-b.left,c);d.width=t.adaptRangeDifferenceToZoomLevel(a.width,c);d.height=t.adaptRangeDifferenceToZoomLevel(a.height,c);return d}function q(a){a=a.getBoundingClientRect();return Boolean(a&&0!==a.height)}function a(a){var b=v.getTextElements(a,!0,!1),c=a.cloneRange(),d=a.cloneRange();a=a.cloneRange();if(!b.length)return null;var e;a:{e=0;var f=b[e],g=c.startContainer===f?c.startOffset:
0,h=g;c.setStart(f,g);for(c.setEnd(f,h);!q(c);){if(f.nodeType===Node.ELEMENT_NODE&&h<f.childNodes.length)h=f.childNodes.length;else if(f.nodeType===Node.TEXT_NODE&&h<f.length)h+=1;else if(b[e])f=b[e],e+=1,g=h=0;else{e=!1;break a}c.setStart(f,g);c.setEnd(f,h)}e=!0}if(!e)return null;a:{e=b.length-1;f=b[e];h=g=d.endContainer===f?d.endOffset:f.length||f.childNodes.length;d.setStart(f,g);for(d.setEnd(f,h);!q(d);){if(f.nodeType===Node.ELEMENT_NODE&&0<g)g=0;else if(f.nodeType===Node.TEXT_NODE&&0<g)g-=1;
else if(b[e])f=b[e],e-=1,g=h=f.length||f.childNodes.length;else{b=!1;break a}d.setStart(f,g);d.setEnd(f,h)}b=!0}if(!b)return null;a.setStart(c.startContainer,c.startOffset);a.setEnd(d.endContainer,d.endOffset);return{firstRange:c,lastRange:d,fillerRange:a}}function d(a,b){var c={};c.top=Math.min(a.top,b.top);c.left=Math.min(a.left,b.left);c.right=Math.max(a.right,b.right);c.bottom=Math.max(a.bottom,b.bottom);c.width=c.right-c.left;c.height=c.bottom-c.top;return c}function f(a,b){b&&0<b.width&&0<b.height&&
(a=a?d(a,b):b);return a}function b(a){function b(a){A.setUnfilteredPosition(a,0);return x.acceptNode(a)===I&&t.acceptPosition(A)===I?I:z}function c(a){var d=null;b(a)===I&&(d=m(a));return d}var d=a.commonAncestorContainer,e=a.startContainer,g=a.endContainer,h=a.startOffset,k=a.endOffset,l,p,q=null,r,s=u.createRange(),t,x=new odf.OdfNodeFilter,w;if(e===d||g===d)return s=a.cloneRange(),q=s.getBoundingClientRect(),s.detach(),q;for(a=e;a.parentNode!==d;)a=a.parentNode;for(p=g;p.parentNode!==d;)p=p.parentNode;
t=n.createRootFilter(e);for(d=a.nextSibling;d&&d!==p;)r=c(d),q=f(q,r),d=d.nextSibling;if(v.isParagraph(a))q=f(q,m(a));else for(w=u.createTreeWalker(a,NodeFilter.SHOW_TEXT,b),d=w.currentNode=e;d&&d!==g;)s.setStart(d,h),s.setEnd(d,d.length),r=s.getBoundingClientRect(),q=f(q,r),l=d,h=0,d=w.nextNode();l||(l=e);if(v.isParagraph(p))q=f(q,m(a));else for(w=u.createTreeWalker(p,NodeFilter.SHOW_TEXT,b),d=w.currentNode=g;d&&d!==l;)if(s.setStart(d,0),s.setEnd(d,k),r=s.getBoundingClientRect(),q=f(q,r),d=w.previousNode())k=
d.length;return q}function k(a,b){var c=a.getBoundingClientRect(),d={width:0};d.top=c.top;d.bottom=c.bottom;d.height=c.height;d.left=d.right=b?c.right:c.left;return d}function c(){if(h.getSelectionType()===ops.OdtCursor.RangeSelection){p(!0);var c=h.getSelectedRange(),f=a(c),g,m,n,q;c.collapsed||!f?p(!1):(p(!0),c=f.firstRange,g=f.lastRange,f=f.fillerRange,m=l(k(c,!1)),q=l(k(g,!0)),n=(n=b(f))?l(n):d(m,q),e(y,{left:m.left,top:m.top,width:Math.max(0,n.width-(m.left-n.left)),height:m.height}),q.top===
m.top||q.bottom===m.bottom?x.style.display=w.style.display="none":(e(w,{left:n.left,top:q.top,width:Math.max(0,q.right-n.left),height:q.height}),e(x,{left:n.left,top:m.top+m.height,width:Math.max(0,parseFloat(y.style.left)+parseFloat(y.style.width)-parseFloat(w.style.left)),height:Math.max(0,q.top-m.bottom)})),c.detach(),g.detach(),f.detach())}else p(!1)}function g(a){a===h&&c()}var n=h.getOdtDocument(),r=n.getRootNode().parentNode.parentNode,u=n.getDOM(),y=u.createElement("div"),x=u.createElement("div"),
w=u.createElement("div"),v=new odf.OdfUtils,t=new core.DomUtils,s=!0,D=u.createRange(),A=gui.SelectionMover.createPositionIterator(n.getRootNode()),C=t.areRangeRectanglesTransformed(u),I=NodeFilter.FILTER_ACCEPT,z=NodeFilter.FILTER_REJECT;this.show=this.rerender=c;this.hide=function(){p(!1)};this.visible=function(){return s};this.destroy=function(a){r.removeChild(y);r.removeChild(x);r.removeChild(w);h.getOdtDocument().unsubscribe(ops.OdtDocument.signalCursorMoved,g);a()};(function(){var a=h.getMemberId();
r.appendChild(y);r.appendChild(x);r.appendChild(w);y.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);x.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);w.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);y.className=x.className=w.className="selectionOverlay";h.getOdtDocument().subscribe(ops.OdtDocument.signalCursorMoved,g)})()};
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
runtime.loadClass("gui.SelectionView");
gui.SelectionViewManager=function(){function h(){return Object.keys(m).map(function(e){return m[e]})}var m={};this.getSelectionView=function(e){return m.hasOwnProperty(e)?m[e]:null};this.getSelectionViews=h;this.removeSelectionView=function(e){m.hasOwnProperty(e)&&(m[e].destroy(function(){}),delete m[e])};this.hideSelectionView=function(e){m.hasOwnProperty(e)&&m[e].hide()};this.showSelectionView=function(e){m.hasOwnProperty(e)&&m[e].show()};this.rerenderSelectionViews=function(){Object.keys(m).forEach(function(e){m[e].visible()&&
m[e].rerender()})};this.registerCursor=function(e,h){var l=e.getMemberId(),q=new gui.SelectionView(e);h?q.show():q.hide();return m[l]=q};this.destroy=function(e){var m=h();(function q(a,d){d?e(d):a<m.length?m[a].destroy(function(d){q(a+1,d)}):e()})(0,void 0)}};
// Input 95
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("gui.SelectionMover");runtime.loadClass("core.PositionFilterChain");runtime.loadClass("ops.StepsTranslator");runtime.loadClass("ops.TextPositionFilter");
ops.OdtDocument=function(h){function m(){var a=h.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"' for OdtDocument");return a}function e(){return m().ownerDocument}function p(a){for(;a&&!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}function l(a){this.acceptPosition=function(b){b=b.container();var d;d="string"===typeof a?
c[a].getNode():a;return p(b)===p(d)?n:r}}function q(a){var b=gui.SelectionMover.createPositionIterator(m());a=y.convertStepsToDomPoint(a);b.setUnfilteredPosition(a.node,a.offset);return b}function a(a,b){return h.getFormatting().getStyleElement(a,b)}function d(b){return a(b,"paragraph")}var f=this,b,k,c={},g=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,
ops.OdtDocument.signalCommonStyleCreated,ops.OdtDocument.signalCommonStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged,ops.OdtDocument.signalStepsInserted,ops.OdtDocument.signalStepsRemoved]),n=core.PositionFilter.FilterResult.FILTER_ACCEPT,r=core.PositionFilter.FilterResult.FILTER_REJECT,u,y;this.getDOM=e;this.getRootElement=p;this.getIteratorAtPosition=q;this.convertDomPointToCursorStep=function(a,b){return y.convertDomPointToSteps(a,
b)};this.convertDomToCursorRange=function(a,b,c,d){var e;e=y.convertDomPointToSteps(a,b);a=a===c&&b===d?e:y.convertDomPointToSteps(c,d);return{position:e,length:a-e}};this.convertCursorToDomRange=function(a,b){var c=e().createRange(),d,f;d=y.convertStepsToDomPoint(a);b?(f=y.convertStepsToDomPoint(a+b),0<b?(c.setStart(d.node,d.offset),c.setEnd(f.node,f.offset)):(c.setStart(f.node,f.offset),c.setEnd(d.node,d.offset))):c.setStart(d.node,d.offset);return c};this.getStyleElement=a;this.upgradeWhitespacesAtPosition=
function(a){a=q(a);var c,d,e;a.previousPosition();a.previousPosition();for(e=-1;1>=e;e+=1){c=a.container();d=a.unfilteredDomOffset();if(c.nodeType===Node.TEXT_NODE&&" "===c.data[d]&&b.isSignificantWhitespace(c,d)){runtime.assert(" "===c.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=c.ownerDocument.createElementNS(odf.Namespaces.textns,"text:s");f.appendChild(c.ownerDocument.createTextNode(" "));c.deleteData(d,1);0<d&&(c=c.splitText(d));c.parentNode.insertBefore(f,
c);c=f;a.moveToEndOfNode(c)}a.nextPosition()}};this.downgradeWhitespacesAtPosition=function(a){var c=q(a),d;a=c.container();for(c=c.unfilteredDomOffset();!b.isCharacterElement(a)&&a.childNodes[c];)a=a.childNodes[c],c=0;a.nodeType===Node.TEXT_NODE&&(a=a.parentNode);b.isDowngradableSpaceElement(a)&&(c=a.firstChild,d=a.lastChild,k.mergeIntoParent(a),d!==c&&k.normalizeTextNodes(d),k.normalizeTextNodes(c))};this.getParagraphStyleElement=d;this.getParagraphElement=function(a){return b.getParagraphElement(a)};
this.getParagraphStyleAttributes=function(a){return(a=d(a))?h.getFormatting().getInheritedStyleAttributes(a):null};this.getTextNodeAtStep=function(a,b){var d=q(a),g=d.container(),h,k=0,l=null;g.nodeType===Node.TEXT_NODE?(h=g,k=d.unfilteredDomOffset()):(h=e().createTextNode(""),k=0,g.insertBefore(h,d.rightNode()));if(b&&c[b]&&f.getCursorPosition(b)===a){for(l=c[b].getNode();l.nextSibling&&"cursor"===l.nextSibling.localName;)l.parentNode.insertBefore(l.nextSibling,l);0<h.length&&h.nextSibling!==l&&
(h=e().createTextNode(""),k=0);l.parentNode.insertBefore(h,l)}for(;h.previousSibling&&h.previousSibling.nodeType===Node.TEXT_NODE;)h.previousSibling.appendData(h.data),k=h.previousSibling.length,h=h.previousSibling,h.parentNode.removeChild(h.nextSibling);return{textNode:h,offset:k}};this.fixCursorPositions=function(){var a=new core.PositionFilterChain;a.addFilter("BaseFilter",u);Object.keys(c).forEach(function(b){var d=c[b],e=d.getStepCounter(),g,h,k=!1;a.addFilter("RootFilter",f.createRootFilter(b));
b=e.countStepsToPosition(d.getAnchorNode(),0,a);e.isPositionWalkable(a)?0===b&&(k=!0,d.move(0)):(k=!0,g=e.countPositionsToNearestStep(d.getNode(),0,a),h=e.countPositionsToNearestStep(d.getAnchorNode(),0,a),d.move(g),0!==b&&(0<h&&(b+=1),0<g&&(b-=1),e=e.countSteps(b,a),d.move(e),d.move(-e,!0)));k&&f.emit(ops.OdtDocument.signalCursorMoved,d);a.removeFilter("RootFilter")})};this.getDistanceFromCursor=function(a,b,d){a=c[a];var e,f;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");
a&&(e=y.convertDomPointToSteps(a.getNode(),0),f=y.convertDomPointToSteps(b,d));return f-e};this.getCursorPosition=function(a){return(a=c[a])?y.convertDomPointToSteps(a.getNode(),0):0};this.getCursorSelection=function(a){a=c[a];var b=0,d=0;a&&(b=y.convertDomPointToSteps(a.getNode(),0),d=y.convertDomPointToSteps(a.getAnchorNode(),0));return{position:d,length:b-d}};this.getPositionFilter=function(){return u};this.getOdfCanvas=function(){return h};this.getRootNode=m;this.getCursor=function(a){return c[a]};
this.getCursors=function(){var a=[],b;for(b in c)c.hasOwnProperty(b)&&a.push(c[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");var b=a.getStepCounter().countSteps(1,u),d=a.getMemberId();runtime.assert("string"===typeof d,"OdtDocument::addCursor has cursor without memberid");runtime.assert(!c[d],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+d);a.move(b);c[d]=a};this.removeCursor=function(a){var b=c[a];return b?(b.removeFromOdtDocument(),
delete c[a],f.emit(ops.OdtDocument.signalCursorRemoved,a),!0):!1};this.getMetaData=function(a){for(var b=h.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return h.getFormatting()};this.emit=function(a,b){g.emit(a,b)};this.subscribe=function(a,b){g.subscribe(a,b)};this.unsubscribe=function(a,
b){g.unsubscribe(a,b)};this.createRootFilter=function(a){return new l(a)};this.close=function(a){a()};this.destroy=function(a){a()};u=new ops.TextPositionFilter(m);b=new odf.OdfUtils;k=new core.DomUtils;y=new ops.StepsTranslator(m,gui.SelectionMover.createPositionIterator,u,500);g.subscribe(ops.OdtDocument.signalStepsInserted,y.handleStepsInserted);g.subscribe(ops.OdtDocument.signalStepsRemoved,y.handleStepsRemoved)};ops.OdtDocument.signalCursorAdded="cursor/added";
ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalCommonStyleCreated="style/created";ops.OdtDocument.signalCommonStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";
ops.OdtDocument.signalStepsInserted="steps/inserted";ops.OdtDocument.signalStepsRemoved="steps/removed";(function(){return ops.OdtDocument})();
// Input 96
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
ops.Session=function(h){var m=new ops.OperationFactory,e=new ops.OdtDocument(h),p=new ops.TrivialMemberModel,l=null;this.setMemberModel=function(e){p=e};this.setOperationFactory=function(e){m=e;l&&l.setOperationFactory(m)};this.setOperationRouter=function(h){l=h;h.setPlaybackFunction(function(a){a.execute(e);e.emit(ops.OdtDocument.signalOperationExecuted,a)});h.setOperationFactory(m)};this.getMemberModel=function(){return p};this.getOperationFactory=function(){return m};this.getOdtDocument=function(){return e};
this.enqueue=function(e){l.push(e)};this.close=function(h){l.close(function(a){a?h(a):p.close(function(a){a?h(a):e.close(h)})})};this.destroy=function(h){e.destroy(h)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 97
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let's not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\n.virtualSelections office|document *::selection {\n  background: transparent;\n}\n.virtualSelections office|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    z-index: 15;\n    opacity: 0.2;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n";
