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
Runtime.prototype.read=function(k,l,h,e){};Runtime.prototype.readFile=function(k,l,h){};Runtime.prototype.readFileSync=function(k,l){};Runtime.prototype.loadXML=function(k,l){};Runtime.prototype.writeFile=function(k,l,h){};Runtime.prototype.isFile=function(k,l){};Runtime.prototype.getFileSize=function(k,l){};Runtime.prototype.deleteFile=function(k,l){};Runtime.prototype.log=function(k,l){};Runtime.prototype.setTimeout=function(k,l){};Runtime.prototype.clearTimeout=function(k){};
Runtime.prototype.libraryPaths=function(){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};Runtime.prototype.parseXML=function(k){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(k,l,h){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(k,l){function h(b){var a="",f,d=b.length;for(f=0;f<d;f+=1)a+=String.fromCharCode(b[f]&255);return a}function e(b){var a="",f,d=b.length,c,e,m,q;for(f=0;f<d;f+=1)c=b[f],128>c?a+=String.fromCharCode(c):(f+=1,e=b[f],194<=c&&224>c?a+=String.fromCharCode((c&31)<<6|e&63):(f+=1,m=b[f],224<=c&&240>c?a+=String.fromCharCode((c&15)<<12|(e&63)<<6|m&63):(f+=1,q=b[f],240<=c&&245>c&&(c=(c&7)<<18|(e&63)<<12|(m&63)<<6|q&63,c-=65536,a+=String.fromCharCode((c>>10)+55296,(c&1023)+56320)))));
return a}var b;"utf8"===l?b=e(k):("binary"!==l&&this.log("Unsupported encoding: "+l),b=h(k));return b};Runtime.getVariable=function(k){try{return eval(k)}catch(l){}};Runtime.toJson=function(k){return JSON.stringify(k)};Runtime.fromJson=function(k){return JSON.parse(k)};Runtime.getFunctionName=function(k){return void 0===k.name?(k=/function\s+(\w+)/.exec(k))&&k[1]:k.name};
function BrowserRuntime(k){function l(a,f){var d,c,b;void 0!==f?b=a:f=a;k?(c=k.ownerDocument,b&&(d=c.createElement("span"),d.className=b,d.appendChild(c.createTextNode(b)),k.appendChild(d),k.appendChild(c.createTextNode(" "))),d=c.createElement("span"),0<f.length&&"<"===f[0]?d.innerHTML=f:d.appendChild(c.createTextNode(f)),k.appendChild(d),k.appendChild(c.createElement("br"))):console&&console.log(f);"alert"===b&&alert(f)}function h(a,f,d){function c(){var c;4===g.readyState&&(0!==g.status||g.responseText?
200===g.status||0===g.status?(c="binary"===f?null!==g.responseBody&&"undefined"!==String(typeof VBArray)?(new VBArray(g.responseBody)).toArray():e.byteArrayFromString(g.responseText,"binary"):g.responseText,b[a]=c,d(null,c)):d(g.responseText||g.statusText):d("File "+a+" is empty."))}if(b.hasOwnProperty(a))d(null,b[a]);else{var g=new XMLHttpRequest;g.open("GET",a,!0);g.onreadystatechange=c;g.overrideMimeType&&("binary"!==f?g.overrideMimeType("text/plain; charset="+f):g.overrideMimeType("text/plain; charset=x-user-defined"));
try{g.send(null)}catch(m){d(m.message)}}}var e=this,b={},g=window.ArrayBuffer&&window.Uint8Array;g&&(Uint8Array.prototype.slice=function(a,f){void 0===f&&(void 0===a&&(a=0),f=this.length);var d=this.subarray(a,f),c,b;f-=a;c=new Uint8Array(new ArrayBuffer(f));for(b=0;b<f;b+=1)c[b]=d[b];return c});this.ByteArray=g?function(a){return new Uint8Array(new ArrayBuffer(a))}:function(a){var f=[];f.length=a;return f};this.concatByteArrays=g?function(a,f){var d,c=a.length,b=f.length,m=new this.ByteArray(c+b);
for(d=0;d<c;d+=1)m[d]=a[d];for(d=0;d<b;d+=1)m[d+c]=f[d];return m}:function(a,f){return a.concat(f)};this.byteArrayFromArray=function(a){return a.slice()};this.byteArrayFromString=function(a,f){var d;if("utf8"===f){d=a.length;var c,b,m,q=0;for(b=0;b<d;b+=1)m=a.charCodeAt(b),q+=1+(128<m)+(2048<m);c=new e.ByteArray(q);for(b=q=0;b<d;b+=1)m=a.charCodeAt(b),128>m?(c[q]=m,q+=1):2048>m?(c[q]=192|m>>>6,c[q+1]=128|m&63,q+=2):(c[q]=224|m>>>12&15,c[q+1]=128|m>>>6&63,c[q+2]=128|m&63,q+=3)}else for("binary"!==
f&&e.log("unknown encoding: "+f),d=a.length,c=new e.ByteArray(d),b=0;b<d;b+=1)c[b]=a.charCodeAt(b)&255;return d=c};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=h;this.read=function(a,f,d,c){function g(){var n;4===m.readyState&&(0!==m.status||m.responseText?200===m.status||0===m.status?(m.response?(n=m.response,n=new Uint8Array(n)):n=null!==m.responseBody&&"undefined"!==String(typeof VBArray)?
(new VBArray(m.responseBody)).toArray():e.byteArrayFromString(m.responseText,"binary"),b[a]=n,c(null,n.slice(f,f+d))):c(m.responseText||m.statusText):c("File "+a+" is empty."))}if(b.hasOwnProperty(a))c(null,b[a].slice(f,f+d));else{var m=new XMLHttpRequest;m.open("GET",a,!0);m.onreadystatechange=g;m.overrideMimeType&&m.overrideMimeType("text/plain; charset=x-user-defined");m.responseType="arraybuffer";try{m.send(null)}catch(q){c(q.message)}}};this.readFileSync=function(a,f){var d=new XMLHttpRequest,
c;d.open("GET",a,!1);d.overrideMimeType&&("binary"!==f?d.overrideMimeType("text/plain; charset="+f):d.overrideMimeType("text/plain; charset=x-user-defined"));try{if(d.send(null),200===d.status||0===d.status)c=d.responseText}catch(b){}return c};this.writeFile=function(a,f,d){b[a]=f;var c=new XMLHttpRequest;c.open("PUT",a,!0);c.onreadystatechange=function(){4===c.readyState&&(0!==c.status||c.responseText?200<=c.status&&300>c.status||0===c.status?d(null):d("Status "+String(c.status)+": "+c.responseText||
c.statusText):d("File "+a+" is empty."))};f=f.buffer&&!c.sendAsBinary?f.buffer:e.byteArrayToString(f,"binary");try{c.sendAsBinary?c.sendAsBinary(f):c.send(f)}catch(g){e.log("HUH? "+g+" "+f),d(g.message)}};this.deleteFile=function(a,f){delete b[a];var d=new XMLHttpRequest;d.open("DELETE",a,!0);d.onreadystatechange=function(){4===d.readyState&&(200>d.status&&300<=d.status?f(d.responseText):f(null))};d.send(null)};this.loadXML=function(a,f){var d=new XMLHttpRequest;d.open("GET",a,!0);d.overrideMimeType&&
d.overrideMimeType("text/xml");d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200===d.status||0===d.status?f(null,d.responseXML):f(d.responseText):f("File "+a+" is empty."))};try{d.send(null)}catch(c){f(c.message)}};this.isFile=function(a,f){e.getFileSize(a,function(a){f(-1!==a)})};this.getFileSize=function(a,f){var d=new XMLHttpRequest;d.open("HEAD",a,!0);d.onreadystatechange=function(){if(4===d.readyState){var c=d.getResponseHeader("Content-Length");c?f(parseInt(c,
10)):h(a,"binary",function(c,a){c?f(-1):f(a.length)})}};d.send(null)};this.log=l;this.assert=function(a,f,d){if(!a)throw l("alert","ASSERTION FAILED:\n"+f),d&&d(),f;};this.setTimeout=function(a,f){return setTimeout(function(){a()},f)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(a){return(new DOMParser).parseFromString(a,
"text/xml")};this.exit=function(a){l("Calling exit with code "+String(a)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function k(f,a,c){f=e.resolve(b,f);"binary"!==a?h.readFile(f,a,c):h.readFile(f,null,c)}var l=this,h=require("fs"),e=require("path"),b="",g,a;this.ByteArray=function(a){return new Buffer(a)};this.byteArrayFromArray=function(a){var d=new Buffer(a.length),c,b=a.length;for(c=0;c<b;c+=1)d[c]=a[c];return d};this.concatByteArrays=function(a,d){var c=new Buffer(a.length+d.length);a.copy(c,0,0);d.copy(c,a.length,0);return c};this.byteArrayFromString=function(a,d){return new Buffer(a,
d)};this.byteArrayToString=function(a,d){return a.toString(d)};this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=k;this.loadXML=function(a,d){k(a,"utf-8",function(c,a){if(c)return d(c);d(null,l.parseXML(a))})};this.writeFile=function(a,d,c){a=e.resolve(b,a);h.writeFile(a,d,"binary",function(a){c(a||null)})};this.deleteFile=function(a,d){a=e.resolve(b,a);h.unlink(a,d)};this.read=function(a,d,c,g){a=e.resolve(b,a);h.open(a,"r+",666,function(a,
f){if(a)g(a);else{var b=new Buffer(c);h.read(f,b,0,c,d,function(c){h.close(f);g(c,b)})}})};this.readFileSync=function(a,d){return d?"binary"===d?h.readFileSync(a,null):h.readFileSync(a,d):""};this.isFile=function(a,d){a=e.resolve(b,a);h.stat(a,function(c,a){d(!c&&a.isFile())})};this.getFileSize=function(a,d){a=e.resolve(b,a);h.stat(a,function(c,a){c?d(-1):d(a.size)})};this.log=function(a,d){var c;void 0!==d?c=a:d=a;"alert"===c&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(d+
"\n");"alert"===c&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(a,d,c){a||(process.stderr.write("ASSERTION FAILED: "+d),c&&c())};this.setTimeout=function(a,d){return setTimeout(function(){a()},d)};this.clearTimeout=function(a){clearTimeout(a)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(a){b=a};this.currentDirectory=function(){return b};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return a};this.parseXML=
function(a){return g.parseFromString(a,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};g=new (require("xmldom").DOMParser);a=l.parseXML("<a/>").implementation}
function RhinoRuntime(){function k(a,b){var d;void 0!==b?d=a:b=a;"alert"===d&&print("\n!!!!! ALERT !!!!!");print(b);"alert"===d&&print("!!!!! ALERT !!!!!")}var l=this,h=Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(),e,b,g="";h.setValidating(!1);h.setNamespaceAware(!0);h.setExpandEntityReferences(!1);h.setSchema(null);b=Packages.org.xml.sax.EntityResolver({resolveEntity:function(a,b){var d=new Packages.java.io.FileReader(b);return new Packages.org.xml.sax.InputSource(d)}});e=h.newDocumentBuilder();
e.setEntityResolver(b);this.ByteArray=function(a){return[a]};this.byteArrayFromArray=function(a){return a};this.byteArrayFromString=function(a,b){var d=[],c,g=a.length;for(c=0;c<g;c+=1)d[c]=a.charCodeAt(c)&255;return d};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.concatByteArrays=function(a,b){return a.concat(b)};this.loadXML=function(a,b){var d=new Packages.java.io.File(a),c;try{c=e.parse(d)}catch(g){print(g);
b(g);return}b(null,c)};this.readFile=function(a,b,d){g&&(a=g+"/"+a);var c=new Packages.java.io.File(a),e="binary"===b?"latin1":b;c.isFile()?(a=readFile(a,e),"binary"===b&&(a=l.byteArrayFromString(a,"binary")),d(null,a)):d(a+" is not a file.")};this.writeFile=function(a,b,d){g&&(a=g+"/"+a);a=new Packages.java.io.FileOutputStream(a);var c,e=b.length;for(c=0;c<e;c+=1)a.write(b[c]);a.close();d(null)};this.deleteFile=function(a,b){g&&(a=g+"/"+a);(new Packages.java.io.File(a))["delete"]()?b(null):b("Could not delete "+
a)};this.read=function(a,b,d,c){g&&(a=g+"/"+a);var e;e=a;var m="binary";(new Packages.java.io.File(e)).isFile()?("binary"===m&&(m="latin1"),e=readFile(e,m)):e=null;e?c(null,this.byteArrayFromString(e.substring(b,b+d),"binary")):c("Cannot read "+a)};this.readFileSync=function(a,b){return b?readFile(a,b):""};this.isFile=function(a,b){g&&(a=g+"/"+a);var d=new Packages.java.io.File(a);b(d.isFile())};this.getFileSize=function(a,b){g&&(a=g+"/"+a);var d=new Packages.java.io.File(a);b(d.length())};this.log=
k;this.assert=function(a,b,d){a||(k("alert","ASSERTION FAILED: "+b),d&&d())};this.setTimeout=function(a){a();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(a){g=a};this.currentDirectory=function(){return g};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return e.getDOMImplementation()};this.parseXML=function(a){return e.parse(a)};this.exit=quit;this.getWindow=function(){return null}}
var runtime=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime}();
(function(){function k(e){var b=e[0],g;g=eval("if (typeof "+b+" === 'undefined') {eval('"+b+" = {};');}"+b);for(b=1;b<e.length-1;b+=1)g=g.hasOwnProperty(e[b])?g[e[b]]:g[e[b]]={};return g[e[e.length-1]]}var l={},h={};runtime.loadClass=function(e){function b(a){a=a.replace(/\./g,"/")+".js";var c=runtime.libraryPaths(),b,m,f;runtime.currentDirectory&&c.push(runtime.currentDirectory());for(b=0;b<c.length;b+=1){m=c[b];if(!h.hasOwnProperty(m))try{f=runtime.readFileSync(c[b]+"/manifest.js","utf8"),h[m]=
f&&f.length?eval(f):null}catch(n){h[m]=null,runtime.log("Cannot load manifest for "+m+".")}f=null;if((m=h[m])&&m.indexOf&&-1!==m.indexOf(a))return c[b]+"/"+a}return null}function g(a){var c,f;f=b(a);if(!f)throw a+" is not listed in any manifest.js.";try{c=runtime.readFileSync(f,"utf8")}catch(m){throw runtime.log("Error loading "+a+" "+m),m;}if(void 0===c)throw"Cannot load class "+a;c=c+("\n//# sourceURL="+f)+("\n//@ sourceURL="+f);try{c=eval(a+" = eval(code);")}catch(g){throw runtime.log("Error loading "+
a+" "+g),g;}return c}if(!IS_COMPILED_CODE&&!l.hasOwnProperty(e)){var a=e.split("."),f;f=k(a);if(!f&&(f=g(e),!f||Runtime.getFunctionName(f)!==a[a.length-1]))throw runtime.log("Loaded code is not for "+a[a.length-1]),"Loaded code is not for "+a[a.length-1];l[e]=!0}}})();
(function(k){function l(h){if(h.length){var e=h[0];runtime.readFile(e,"utf8",function(b,g){function a(){var c;(c=eval(d))&&runtime.exit(c)}var f="",d=g;-1!==e.indexOf("/")&&(f=e.substring(0,e.indexOf("/")));runtime.setCurrentDirectory(f);b||null===d?(runtime.log(b),runtime.exit(1)):a.apply(null,h)})}}k=k?Array.prototype.slice.call(k):[];"NodeJSRuntime"===runtime.type()?l(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?l(k):l(k.slice(1))})("undefined"!==String(typeof arguments)&&arguments);
// Input 2
core.Base64=function(){function k(c){var a=[],b,m=c.length;for(b=0;b<m;b+=1)a[b]=c.charCodeAt(b)&255;return a}function l(c){var a,b="",m,d=c.length-2;for(m=0;m<d;m+=3)a=c[m]<<16|c[m+1]<<8|c[m+2],b+=p[a>>>18],b+=p[a>>>12&63],b+=p[a>>>6&63],b+=p[a&63];m===d+1?(a=c[m]<<4,b+=p[a>>>6],b+=p[a&63],b+="=="):m===d&&(a=c[m]<<10|c[m+1]<<2,b+=p[a>>>12],b+=p[a>>>6&63],b+=p[a&63],b+="=");return b}function h(c){c=c.replace(/[^A-Za-z0-9+\/]+/g,"");var a=[],b=c.length%4,m,d=c.length,f;for(m=0;m<d;m+=4)f=(r[c.charAt(m)]||
0)<<18|(r[c.charAt(m+1)]||0)<<12|(r[c.charAt(m+2)]||0)<<6|(r[c.charAt(m+3)]||0),a.push(f>>16,f>>8&255,f&255);a.length-=[0,0,2,1][b];return a}function e(c){var a=[],b,m=c.length,d;for(b=0;b<m;b+=1)d=c[b],128>d?a.push(d):2048>d?a.push(192|d>>>6,128|d&63):a.push(224|d>>>12&15,128|d>>>6&63,128|d&63);return a}function b(c){var a=[],b,m=c.length,d,f,n;for(b=0;b<m;b+=1)d=c[b],128>d?a.push(d):(b+=1,f=c[b],224>d?a.push((d&31)<<6|f&63):(b+=1,n=c[b],a.push((d&15)<<12|(f&63)<<6|n&63)));return a}function g(c){return l(k(c))}
function a(c){return String.fromCharCode.apply(String,h(c))}function f(c){return b(k(c))}function d(c){c=b(c);for(var a="",m=0;m<c.length;)a+=String.fromCharCode.apply(String,c.slice(m,m+45E3)),m+=45E3;return a}function c(c,a,b){var m="",d,f,n;for(n=a;n<b;n+=1)a=c.charCodeAt(n)&255,128>a?m+=String.fromCharCode(a):(n+=1,d=c.charCodeAt(n)&255,224>a?m+=String.fromCharCode((a&31)<<6|d&63):(n+=1,f=c.charCodeAt(n)&255,m+=String.fromCharCode((a&15)<<12|(d&63)<<6|f&63)));return m}function t(a,b){function m(){var g=
n+d;g>a.length&&(g=a.length);f+=c(a,n,g);n=g;g=n===a.length;b(f,g)&&!g&&runtime.setTimeout(m,0)}var d=1E5,f="",n=0;a.length<d?b(c(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),m())}function m(c){return e(k(c))}function q(c){return String.fromCharCode.apply(String,e(c))}function n(c){return String.fromCharCode.apply(String,e(k(c)))}var p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r=function(c){var a={},b,m;b=0;for(m=c.length;b<m;b+=1)a[c.charAt(b)]=b;return a}(p),w,
u,y=runtime.getWindow(),x,s;y&&y.btoa?(x=function(c){return y.btoa(c)},w=function(c){return x(n(c))}):(x=g,w=function(c){return l(m(c))});y&&y.atob?(s=function(c){return y.atob(c)},u=function(a){a=s(a);return c(a,0,a.length)}):(s=a,u=function(c){return d(h(c))});return function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=l;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=h;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=e;this.convertByteArrayToUTF16Array=
this.convertUTF8ArrayToUTF16Array=b;this.convertUTF8StringToBase64=g;this.convertBase64ToUTF8String=a;this.convertUTF8StringToUTF16Array=f;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=d;this.convertUTF8StringToUTF16String=t;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=m;this.convertUTF16ArrayToUTF8String=q;this.convertUTF16StringToUTF8String=n;this.convertUTF16StringToBase64=w;this.convertBase64ToUTF16String=u;this.fromBase64=a;this.toBase64=g;this.atob=
s;this.btoa=x;this.utob=n;this.btou=t;this.encode=w;this.encodeURI=function(c){return w(c).replace(/[+\/]/g,function(c){return"+"===c?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(c){return u(c.replace(/[\-_]/g,function(c){return"-"===c?"+":"/"}))}}}();
// Input 3
core.RawDeflate=function(){function k(){this.dl=this.fc=0}function l(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function h(c,a,b,m){this.good_length=c;this.max_lazy=a;this.nice_length=b;this.max_chain=m}function e(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=b;this.off=0}var b=8192,g,a,f,d,c=null,t,m,q,n,p,r,w,u,y,x,s,v,A,F,D,O,B,P,z,J,X,da,V,qa,aa,ca,Q,Y,T,N,E,K,R,L,S,ha,ea,fa,M,G,na,ia,H,ga,Z,ja,ra,W,C,la,va,wa=[0,
0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],oa=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],I=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],ta=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],sa;sa=[new h(0,0,0,0),new h(4,4,8,4),new h(4,5,16,8),new h(4,6,32,32),new h(4,4,16,16),new h(8,16,32,32),new h(8,16,128,128),new h(8,32,128,256),new h(32,128,258,1024),new h(32,258,258,4096)];var ka=function(d){c[m+t++]=d;if(m+t===b){var n;if(0!==t){null!==g?(d=g,g=g.next):d=new e;
d.next=null;d.len=d.off=0;null===a?a=f=d:f=f.next=d;d.len=t-m;for(n=0;n<d.len;n++)d.ptr[n]=c[m+n];t=m=0}}},ma=function(a){a&=65535;m+t<b-2?(c[m+t++]=a&255,c[m+t++]=a>>>8):(ka(a&255),ka(a>>>8))},ba=function(){s=(s<<5^n[B+3-1]&255)&8191;v=w[32768+s];w[B&32767]=v;w[32768+s]=B},U=function(c,a){y>16-a?(u|=c<<y,ma(u),u=c>>16-y,y+=a-16):(u|=c<<y,y+=a)},$=function(c,a){U(a[c].fc,a[c].dl)},ua=function(c,a,b){return c[a].fc<c[b].fc||c[a].fc===c[b].fc&&ea[a]<=ea[b]},pa=function(c,a,b){var m;for(m=0;m<b&&va<
la.length;m++)c[a+m]=la.charCodeAt(va++)&255;return m},za=function(){var c,a,b=65536-J-B;if(-1===b)b--;else if(65274<=B){for(c=0;32768>c;c++)n[c]=n[c+32768];P-=32768;B-=32768;x-=32768;for(c=0;8192>c;c++)a=w[32768+c],w[32768+c]=32768<=a?a-32768:0;for(c=0;32768>c;c++)a=w[c],w[c]=32768<=a?a-32768:0;b+=32768}z||(c=pa(n,B+J,b),0>=c?z=!0:J+=c)},Ca=function(c){var a=X,b=B,m,d=O,f=32506<B?B-32506:0,g=B+258,q=n[b+d-1],e=n[b+d];O>=qa&&(a>>=2);do if(m=c,n[m+d]===e&&n[m+d-1]===q&&n[m]===n[b]&&n[++m]===n[b+1]){b+=
2;m++;do++b;while(n[b]===n[++m]&&n[++b]===n[++m]&&n[++b]===n[++m]&&n[++b]===n[++m]&&n[++b]===n[++m]&&n[++b]===n[++m]&&n[++b]===n[++m]&&n[++b]===n[++m]&&b<g);m=258-(g-b);b=g-258;if(m>d){P=c;d=m;if(258<=m)break;q=n[b+d-1];e=n[b+d]}c=w[c&32767]}while(c>f&&0!==--a);return d},xa=function(c,a){r[H++]=a;0===c?aa[a].fc++:(c--,aa[fa[a]+256+1].fc++,ca[(256>c?M[c]:M[256+(c>>7)])&255].fc++,p[ga++]=c,ja|=ra);ra<<=1;0===(H&7)&&(ia[Z++]=ja,ja=0,ra=1);if(2<V&&0===(H&4095)){var b=8*H,m=B-x,d;for(d=0;30>d;d++)b+=ca[d].fc*
(5+oa[d]);b>>=3;if(ga<parseInt(H/2,10)&&b<parseInt(m/2,10))return!0}return 8191===H||8192===ga},Aa=function(c,a){for(var b=L[a],m=a<<1;m<=S;){m<S&&ua(c,L[m+1],L[m])&&m++;if(ua(c,b,L[m]))break;L[a]=L[m];a=m;m<<=1}L[a]=b},Da=function(c,a){var b=0;do b|=c&1,c>>=1,b<<=1;while(0<--a);return b>>1},Ea=function(c,a){var b=[];b.length=16;var m=0,d;for(d=1;15>=d;d++)m=m+R[d-1]<<1,b[d]=m;for(m=0;m<=a;m++)d=c[m].dl,0!==d&&(c[m].fc=Da(b[d]++,d))},Ba=function(c){var a=c.dyn_tree,b=c.static_tree,m=c.elems,d,n=-1,
f=m;S=0;ha=573;for(d=0;d<m;d++)0!==a[d].fc?(L[++S]=n=d,ea[d]=0):a[d].dl=0;for(;2>S;)d=L[++S]=2>n?++n:0,a[d].fc=1,ea[d]=0,W--,null!==b&&(C-=b[d].dl);c.max_code=n;for(d=S>>1;1<=d;d--)Aa(a,d);do d=L[1],L[1]=L[S--],Aa(a,1),b=L[1],L[--ha]=d,L[--ha]=b,a[f].fc=a[d].fc+a[b].fc,ea[f]=ea[d]>ea[b]+1?ea[d]:ea[b]+1,a[d].dl=a[b].dl=f,L[1]=f++,Aa(a,1);while(2<=S);L[--ha]=L[1];f=c.dyn_tree;d=c.extra_bits;var m=c.extra_base,b=c.max_code,g=c.max_length,q=c.static_tree,e,p,s,h,r=0;for(p=0;15>=p;p++)R[p]=0;f[L[ha]].dl=
0;for(c=ha+1;573>c;c++)e=L[c],p=f[f[e].dl].dl+1,p>g&&(p=g,r++),f[e].dl=p,e>b||(R[p]++,s=0,e>=m&&(s=d[e-m]),h=f[e].fc,W+=h*(p+s),null!==q&&(C+=h*(q[e].dl+s)));if(0!==r){do{for(p=g-1;0===R[p];)p--;R[p]--;R[p+1]+=2;R[g]--;r-=2}while(0<r);for(p=g;0!==p;p--)for(e=R[p];0!==e;)d=L[--c],d>b||(f[d].dl!==p&&(W+=(p-f[d].dl)*f[d].fc,f[d].fc=p),e--)}Ea(a,n)},Fa=function(c,a){var b,m=-1,d,f=c[0].dl,n=0,g=7,e=4;0===f&&(g=138,e=3);c[a+1].dl=65535;for(b=0;b<=a;b++)d=f,f=c[b+1].dl,++n<g&&d===f||(n<e?T[d].fc+=n:0!==
d?(d!==m&&T[d].fc++,T[16].fc++):10>=n?T[17].fc++:T[18].fc++,n=0,m=d,0===f?(g=138,e=3):d===f?(g=6,e=3):(g=7,e=4))},Ga=function(){8<y?ma(u):0<y&&ka(u);y=u=0},Ha=function(c,a){var b,m=0,d=0,f=0,n=0,g,e;if(0!==H){do 0===(m&7)&&(n=ia[f++]),b=r[m++]&255,0===(n&1)?$(b,c):(g=fa[b],$(g+256+1,c),e=wa[g],0!==e&&(b-=G[g],U(b,e)),b=p[d++],g=(256>b?M[b]:M[256+(b>>7)])&255,$(g,a),e=oa[g],0!==e&&(b-=na[g],U(b,e))),n>>=1;while(m<H)}$(256,c)},Ia=function(c,a){var b,m=-1,d,f=c[0].dl,n=0,g=7,e=4;0===f&&(g=138,e=3);for(b=
0;b<=a;b++)if(d=f,f=c[b+1].dl,!(++n<g&&d===f)){if(n<e){do $(d,T);while(0!==--n)}else 0!==d?(d!==m&&($(d,T),n--),$(16,T),U(n-3,2)):10>=n?($(17,T),U(n-3,3)):($(18,T),U(n-11,7));n=0;m=d;0===f?(g=138,e=3):d===f?(g=6,e=3):(g=7,e=4)}},Ja=function(){var c;for(c=0;286>c;c++)aa[c].fc=0;for(c=0;30>c;c++)ca[c].fc=0;for(c=0;19>c;c++)T[c].fc=0;aa[256].fc=1;ja=H=ga=Z=W=C=0;ra=1},ya=function(c){var a,b,m,d;d=B-x;ia[Z]=ja;Ba(N);Ba(E);Fa(aa,N.max_code);Fa(ca,E.max_code);Ba(K);for(m=18;3<=m&&0===T[ta[m]].dl;m--);W+=
3*(m+1)+14;a=W+3+7>>3;b=C+3+7>>3;b<=a&&(a=b);if(d+4<=a&&0<=x)for(U(0+c,3),Ga(),ma(d),ma(~d),m=0;m<d;m++)ka(n[x+m]);else if(b===a)U(2+c,3),Ha(Q,Y);else{U(4+c,3);d=N.max_code+1;a=E.max_code+1;m+=1;U(d-257,5);U(a-1,5);U(m-4,4);for(b=0;b<m;b++)U(T[ta[b]].dl,3);Ia(aa,d-1);Ia(ca,a-1);Ha(aa,ca)}Ja();0!==c&&Ga()},Ka=function(b,d,f){var n,e,p;for(n=0;null!==a&&n<f;){e=f-n;e>a.len&&(e=a.len);for(p=0;p<e;p++)b[d+n+p]=a.ptr[a.off+p];a.off+=e;a.len-=e;n+=e;0===a.len&&(e=a,a=a.next,e.next=g,g=e)}if(n===f)return n;
if(m<t){e=f-n;e>t-m&&(e=t-m);for(p=0;p<e;p++)b[d+n+p]=c[m+p];m+=e;n+=e;t===m&&(t=m=0)}return n},La=function(c,b,f){var e;if(!d){if(!z){y=u=0;var g,p;if(0===Y[0].dl){N.dyn_tree=aa;N.static_tree=Q;N.extra_bits=wa;N.extra_base=257;N.elems=286;N.max_length=15;N.max_code=0;E.dyn_tree=ca;E.static_tree=Y;E.extra_bits=oa;E.extra_base=0;E.elems=30;E.max_length=15;E.max_code=0;K.dyn_tree=T;K.static_tree=null;K.extra_bits=I;K.extra_base=0;K.elems=19;K.max_length=7;for(p=g=K.max_code=0;28>p;p++)for(G[p]=g,e=
0;e<1<<wa[p];e++)fa[g++]=p;fa[g-1]=p;for(p=g=0;16>p;p++)for(na[p]=g,e=0;e<1<<oa[p];e++)M[g++]=p;for(g>>=7;30>p;p++)for(na[p]=g<<7,e=0;e<1<<oa[p]-7;e++)M[256+g++]=p;for(e=0;15>=e;e++)R[e]=0;for(e=0;143>=e;)Q[e++].dl=8,R[8]++;for(;255>=e;)Q[e++].dl=9,R[9]++;for(;279>=e;)Q[e++].dl=7,R[7]++;for(;287>=e;)Q[e++].dl=8,R[8]++;Ea(Q,287);for(e=0;30>e;e++)Y[e].dl=5,Y[e].fc=Da(e,5);Ja()}for(e=0;8192>e;e++)w[32768+e]=0;da=sa[V].max_lazy;qa=sa[V].good_length;X=sa[V].max_chain;x=B=0;J=pa(n,0,65536);if(0>=J)z=!0,
J=0;else{for(z=!1;262>J&&!z;)za();for(e=s=0;2>e;e++)s=(s<<5^n[e]&255)&8191}a=null;m=t=0;3>=V?(O=2,D=0):(D=2,F=0);q=!1}d=!0;if(0===J)return q=!0,0}e=Ka(c,b,f);if(e===f)return f;if(q)return e;if(3>=V)for(;0!==J&&null===a;){ba();0!==v&&32506>=B-v&&(D=Ca(v),D>J&&(D=J));if(3<=D)if(p=xa(B-P,D-3),J-=D,D<=da){D--;do B++,ba();while(0!==--D);B++}else B+=D,D=0,s=n[B]&255,s=(s<<5^n[B+1]&255)&8191;else p=xa(0,n[B]&255),J--,B++;p&&(ya(0),x=B);for(;262>J&&!z;)za()}else for(;0!==J&&null===a;){ba();O=D;A=P;D=2;0!==
v&&(O<da&&32506>=B-v)&&(D=Ca(v),D>J&&(D=J),3===D&&4096<B-P&&D--);if(3<=O&&D<=O){p=xa(B-1-A,O-3);J-=O-1;O-=2;do B++,ba();while(0!==--O);F=0;D=2;B++;p&&(ya(0),x=B)}else 0!==F?xa(0,n[B-1]&255)&&(ya(0),x=B):F=1,B++,J--;for(;262>J&&!z;)za()}0===J&&(0!==F&&xa(0,n[B-1]&255),ya(1),q=!0);return e+Ka(c,e+b,f-e)};this.deflate=function(m,e){var q,s;la=m;va=0;"undefined"===String(typeof e)&&(e=6);(q=e)?1>q?q=1:9<q&&(q=9):q=6;V=q;z=d=!1;if(null===c){g=a=f=null;c=[];c.length=b;n=[];n.length=65536;p=[];p.length=
8192;r=[];r.length=32832;w=[];w.length=65536;aa=[];aa.length=573;for(q=0;573>q;q++)aa[q]=new k;ca=[];ca.length=61;for(q=0;61>q;q++)ca[q]=new k;Q=[];Q.length=288;for(q=0;288>q;q++)Q[q]=new k;Y=[];Y.length=30;for(q=0;30>q;q++)Y[q]=new k;T=[];T.length=39;for(q=0;39>q;q++)T[q]=new k;N=new l;E=new l;K=new l;R=[];R.length=16;L=[];L.length=573;ea=[];ea.length=573;fa=[];fa.length=256;M=[];M.length=512;G=[];G.length=29;na=[];na.length=30;ia=[];ia.length=1024}var h=Array(1024),u=[],v=[];for(q=La(h,0,h.length);0<
q;){v.length=q;for(s=0;s<q;s++)v[s]=String.fromCharCode(h[s]);u[u.length]=v.join("");q=La(h,0,h.length)}la=null;return u.join("")}};
// Input 4
core.ByteArray=function(k){this.pos=0;this.data=k;this.readUInt32LE=function(){this.pos+=4;var l=this.data,h=this.pos;return l[--h]<<24|l[--h]<<16|l[--h]<<8|l[--h]};this.readUInt16LE=function(){this.pos+=2;var l=this.data,h=this.pos;return l[--h]<<8|l[--h]}};
// Input 5
core.ByteArrayWriter=function(k){var l=this,h=new runtime.ByteArray(0);this.appendByteArrayWriter=function(e){h=runtime.concatByteArrays(h,e.getByteArray())};this.appendByteArray=function(e){h=runtime.concatByteArrays(h,e)};this.appendArray=function(e){h=runtime.concatByteArrays(h,runtime.byteArrayFromArray(e))};this.appendUInt16LE=function(e){l.appendArray([e&255,e>>8&255])};this.appendUInt32LE=function(e){l.appendArray([e&255,e>>8&255,e>>16&255,e>>24&255])};this.appendString=function(e){h=runtime.concatByteArrays(h,
runtime.byteArrayFromString(e,k))};this.getLength=function(){return h.length};this.getByteArray=function(){return h}};
// Input 6
core.RawInflate=function(){var k,l,h=null,e,b,g,a,f,d,c,t,m,q,n,p,r,w,u=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],y=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],x=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],s=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],v=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],A=[16,17,18,
0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],F=function(){this.list=this.next=null},D=function(){this.n=this.b=this.e=0;this.t=null},O=function(c,a,b,m,d,n){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var f=Array(this.BMAX+1),e,g,p,q,s,h,r,l=Array(this.BMAX+1),k,u,v,t=new D,w=Array(this.BMAX);q=Array(this.N_MAX);var x,y=Array(this.BMAX+1),A,B,z;z=this.root=null;for(s=0;s<f.length;s++)f[s]=0;for(s=0;s<l.length;s++)l[s]=0;for(s=0;s<w.length;s++)w[s]=null;for(s=0;s<q.length;s++)q[s]=
0;for(s=0;s<y.length;s++)y[s]=0;e=256<a?c[256]:this.BMAX;k=c;u=0;s=a;do f[k[u]]++,u++;while(0<--s);if(f[0]==a)this.root=null,this.status=this.m=0;else{for(h=1;h<=this.BMAX&&0==f[h];h++);r=h;n<h&&(n=h);for(s=this.BMAX;0!=s&&0==f[s];s--);p=s;n>s&&(n=s);for(A=1<<h;h<s;h++,A<<=1)if(0>(A-=f[h])){this.status=2;this.m=n;return}if(0>(A-=f[s]))this.status=2,this.m=n;else{f[s]+=A;y[1]=h=0;k=f;u=1;for(v=2;0<--s;)y[v++]=h+=k[u++];k=c;s=u=0;do 0!=(h=k[u++])&&(q[y[h]++]=s);while(++s<a);a=y[p];y[0]=s=0;k=q;u=0;
q=-1;x=l[0]=0;v=null;for(B=0;r<=p;r++)for(c=f[r];0<c--;){for(;r>x+l[1+q];){x+=l[1+q];q++;B=(B=p-x)>n?n:B;if((g=1<<(h=r-x))>c+1)for(g-=c+1,v=r;++h<B&&!((g<<=1)<=f[++v]);)g-=f[v];x+h>e&&x<e&&(h=e-x);B=1<<h;l[1+q]=h;v=Array(B);for(g=0;g<B;g++)v[g]=new D;z=null==z?this.root=new F:z.next=new F;z.next=null;z.list=v;w[q]=v;0<q&&(y[q]=s,t.b=l[q],t.e=16+h,t.t=v,h=(s&(1<<x)-1)>>x-l[q],w[q-1][h].e=t.e,w[q-1][h].b=t.b,w[q-1][h].n=t.n,w[q-1][h].t=t.t)}t.b=r-x;u>=a?t.e=99:k[u]<b?(t.e=256>k[u]?16:15,t.n=k[u++]):
(t.e=d[k[u]-b],t.n=m[k[u++]-b]);g=1<<r-x;for(h=s>>x;h<B;h+=g)v[h].e=t.e,v[h].b=t.b,v[h].n=t.n,v[h].t=t.t;for(h=1<<r-1;0!=(s&h);h>>=1)s^=h;for(s^=h;(s&(1<<x)-1)!=y[q];)x-=l[q],q--}this.m=l[1];this.status=0!=A&&1!=p?1:0}}},B=function(c){for(;a<c;){var b=g,m;m=r.length==w?-1:r[w++];g=b|m<<a;a+=8}},P=function(c){return g&u[c]},z=function(c){g>>=c;a-=c},J=function(a,b,d){var e,g,s;if(0==d)return 0;for(s=0;;){B(n);g=m.list[P(n)];for(e=g.e;16<e;){if(99==e)return-1;z(g.b);e-=16;B(e);g=g.t[P(e)];e=g.e}z(g.b);
if(16==e)l&=32767,a[b+s++]=k[l++]=g.n;else{if(15==e)break;B(e);c=g.n+P(e);z(e);B(p);g=q.list[P(p)];for(e=g.e;16<e;){if(99==e)return-1;z(g.b);e-=16;B(e);g=g.t[P(e)];e=g.e}z(g.b);B(e);t=l-g.n-P(e);for(z(e);0<c&&s<d;)c--,t&=32767,l&=32767,a[b+s++]=k[l++]=k[t++]}if(s==d)return d}f=-1;return s},X,da=function(c,a,b){var d,f,e,g,h,r,l,k=Array(316);for(d=0;d<k.length;d++)k[d]=0;B(5);r=257+P(5);z(5);B(5);l=1+P(5);z(5);B(4);d=4+P(4);z(4);if(286<r||30<l)return-1;for(f=0;f<d;f++)B(3),k[A[f]]=P(3),z(3);for(;19>
f;f++)k[A[f]]=0;n=7;f=new O(k,19,19,null,null,n);if(0!=f.status)return-1;m=f.root;n=f.m;g=r+l;for(d=e=0;d<g;)if(B(n),h=m.list[P(n)],f=h.b,z(f),f=h.n,16>f)k[d++]=e=f;else if(16==f){B(2);f=3+P(2);z(2);if(d+f>g)return-1;for(;0<f--;)k[d++]=e}else{17==f?(B(3),f=3+P(3),z(3)):(B(7),f=11+P(7),z(7));if(d+f>g)return-1;for(;0<f--;)k[d++]=0;e=0}n=9;f=new O(k,r,257,y,x,n);0==n&&(f.status=1);if(0!=f.status)return-1;m=f.root;n=f.m;for(d=0;d<l;d++)k[d]=k[d+r];p=6;f=new O(k,l,0,s,v,p);q=f.root;p=f.m;return 0==p&&
257<r||0!=f.status?-1:J(c,a,b)};this.inflate=function(u,A){null==k&&(k=Array(65536));a=g=l=0;f=-1;d=!1;c=t=0;m=null;r=u;w=0;var F=new runtime.ByteArray(A);a:{var D,Q;for(D=0;D<A&&(!d||-1!=f);){if(0<c){if(0!=f)for(;0<c&&D<A;)c--,t&=32767,l&=32767,F[0+D++]=k[l++]=k[t++];else{for(;0<c&&D<A;)c--,l&=32767,B(8),F[0+D++]=k[l++]=P(8),z(8);0==c&&(f=-1)}if(D==A)break}if(-1==f){if(d)break;B(1);0!=P(1)&&(d=!0);z(1);B(2);f=P(2);z(2);m=null;c=0}switch(f){case 0:Q=F;var Y=0+D,T=A-D,N=void 0,N=a&7;z(N);B(16);N=P(16);
z(16);B(16);if(N!=(~g&65535))Q=-1;else{z(16);c=N;for(N=0;0<c&&N<T;)c--,l&=32767,B(8),Q[Y+N++]=k[l++]=P(8),z(8);0==c&&(f=-1);Q=N}break;case 1:if(null!=m)Q=J(F,0+D,A-D);else b:{Q=F;Y=0+D;T=A-D;if(null==h){for(var E=void 0,N=Array(288),E=void 0,E=0;144>E;E++)N[E]=8;for(;256>E;E++)N[E]=9;for(;280>E;E++)N[E]=7;for(;288>E;E++)N[E]=8;b=7;E=new O(N,288,257,y,x,b);if(0!=E.status){alert("HufBuild error: "+E.status);Q=-1;break b}h=E.root;b=E.m;for(E=0;30>E;E++)N[E]=5;X=5;E=new O(N,30,0,s,v,X);if(1<E.status){h=
null;alert("HufBuild error: "+E.status);Q=-1;break b}e=E.root;X=E.m}m=h;q=e;n=b;p=X;Q=J(Q,Y,T)}break;case 2:Q=null!=m?J(F,0+D,A-D):da(F,0+D,A-D);break;default:Q=-1}if(-1==Q)break a;D+=Q}}r=null;return F}};
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
core.LoopWatchDog=function(k,l){var h=Date.now(),e=0;this.check=function(){var b;if(k&&(b=Date.now(),b-h>k))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<l&&(e+=1,e>l))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 8
core.Utils=function(){this.hashString=function(k){var l=0,h,e;h=0;for(e=k.length;h<e;h+=1)l=(l<<5)-l+k.charCodeAt(h),l|=0;return l}};
// Input 9
core.DomUtils=function(){function k(h,e){if(h.nodeType===Node.TEXT_NODE)if(0===h.length)h.parentNode.removeChild(h);else if(e.nodeType===Node.TEXT_NODE)return e.insertData(0,h.data),h.parentNode.removeChild(h),e;return h}function l(h,e){return h===e||Boolean(h.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_CONTAINED_BY)}this.splitBoundaries=function(h){var e=[],b;if(h.startContainer.nodeType===Node.TEXT_NODE||h.endContainer.nodeType===Node.TEXT_NODE){b=h.endContainer;var g=h.endOffset;if(g<b.childNodes.length)for(b=
b.childNodes[g],g=0;b.firstChild;)b=b.firstChild;else for(;b.lastChild;)b=b.lastChild,g=b.nodeType===Node.TEXT_NODE?b.textContent.length:b.childNodes.length;h.setEnd(b,g);0!==h.endOffset&&(h.endContainer.nodeType===Node.TEXT_NODE&&h.endOffset!==h.endContainer.length)&&(e.push(h.endContainer.splitText(h.endOffset)),e.push(h.endContainer));0!==h.startOffset&&(h.startContainer.nodeType===Node.TEXT_NODE&&h.startOffset!==h.startContainer.length)&&(b=h.startContainer.splitText(h.startOffset),e.push(h.startContainer),
e.push(b),h.setStart(b,0))}return e};this.containsRange=function(h,e){return 0>=h.compareBoundaryPoints(h.START_TO_START,e)&&0<=h.compareBoundaryPoints(h.END_TO_END,e)};this.rangesIntersect=function(h,e){return 0>=h.compareBoundaryPoints(h.END_TO_START,e)&&0<=h.compareBoundaryPoints(h.START_TO_END,e)};this.getNodesInRange=function(h,e){runtime.assert(Boolean(h.startContainer),"Expected to get a range with a startContainer in getNodesInRange().");var b=[],g,a=h.startContainer.ownerDocument.createTreeWalker(h.commonAncestorContainer,
NodeFilter.SHOW_ALL,e,!1);for(g=a.currentNode=h.startContainer;g;){if(e(g)===NodeFilter.FILTER_ACCEPT)b.push(g);else if(e(g)===NodeFilter.FILTER_REJECT)break;g=g.parentNode}b.reverse();for(g=a.nextNode();g;)b.push(g),g=a.nextNode();return b};this.normalizeTextNodes=function(h){h&&h.nextSibling&&(h=k(h,h.nextSibling));h&&h.previousSibling&&k(h.previousSibling,h)};this.rangeContainsNode=function(h,e){runtime.assert(Boolean(e),"Expected to get a node in rangeContainsNode()");var b=e.ownerDocument.createRange(),
g=e.nodeType===Node.TEXT_NODE?e.length:e.childNodes.length;b.setStart(h.startContainer,h.startOffset);b.setEnd(h.endContainer,h.endOffset);g=0===b.comparePoint(e,0)&&0===b.comparePoint(e,g);b.detach();return g};this.mergeIntoParent=function(h){for(var e=h.parentNode;h.firstChild;)e.insertBefore(h.firstChild,h);e.removeChild(h);return e};this.getElementsByTagNameNS=function(h,e,b){return Array.prototype.slice.call(h.getElementsByTagNameNS(e,b))};this.rangeIntersectsNode=function(h,e){var b=e.nodeType===
Node.TEXT_NODE?e.length:e.childNodes.length;return 0>=h.comparePoint(e,0)&&0<=h.comparePoint(e,b)};this.containsNode=function(h,e){return h===e||h.contains(e)};(function(h){var e=runtime.getWindow();null!==e&&(e=e.navigator.appVersion.toLowerCase(),e=-1===e.indexOf("chrome")&&(-1!==e.indexOf("applewebkit")||-1!==e.indexOf("safari")))&&(h.containsNode=l)})(this)};
// Input 10
runtime.loadClass("core.DomUtils");
core.Cursor=function(k,l){function h(c){c.parentNode&&(f.push(c.previousSibling),f.push(c.nextSibling),c.parentNode.removeChild(c))}function e(c,a,b){if(a.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(a),"putCursorIntoTextNode: invalid container");var d=a.parentNode;runtime.assert(Boolean(d),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=a.length,"putCursorIntoTextNode: offset is out of bounds");0===b?d.insertBefore(c,a):(b!==a.length&&a.splitText(b),d.insertBefore(c,
a.nextSibling))}else if(a.nodeType===Node.ELEMENT_NODE){runtime.assert(Boolean(a),"putCursorIntoContainer: invalid container");for(d=a.firstChild;null!==d&&0<b;)d=d.nextSibling,b-=1;a.insertBefore(c,d)}f.push(c.previousSibling);f.push(c.nextSibling)}var b=k.createElementNS("urn:webodf:names:cursor","cursor"),g=k.createElementNS("urn:webodf:names:cursor","anchor"),a,f=[],d,c,t=new core.DomUtils;this.getNode=function(){return b};this.getAnchorNode=function(){return g.parentNode?g:b};this.getSelectedRange=
function(){c?(d.setStartBefore(b),d.collapse(!0)):(d.setStartAfter(a?g:b),d.setEndBefore(a?b:g));return d};this.setSelectedRange=function(m,q){d&&d!==m&&d.detach();d=m;a=!1!==q;(c=m.collapsed)?(h(g),h(b),e(b,m.startContainer,m.startOffset)):(h(g),h(b),e(a?b:g,m.endContainer,m.endOffset),e(a?g:b,m.startContainer,m.startOffset));f.forEach(t.normalizeTextNodes);f.length=0};this.remove=function(){h(b);f.forEach(t.normalizeTextNodes);f.length=0};b.setAttributeNS("urn:webodf:names:cursor","memberId",l);
g.setAttributeNS("urn:webodf:names:cursor","memberId",l)};
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
core.EventNotifier=function(k){var l={};this.emit=function(h,e){var b,g;runtime.assert(l.hasOwnProperty(h),'unknown event fired "'+h+'"');g=l[h];for(b=0;b<g.length;b+=1)g[b](e)};this.subscribe=function(h,e){runtime.assert(l.hasOwnProperty(h),'tried to subscribe to unknown event "'+h+'"');l[h].push(e);runtime.log('event "'+h+'" subscribed.')};this.unsubscribe=function(h,e){var b;runtime.assert(l.hasOwnProperty(h),'tried to unsubscribe from unknown event "'+h+'"');b=l[h].indexOf(e);runtime.assert(-1!==
b,'tried to unsubscribe unknown callback from event "'+h+'"');-1!==b&&l[h].splice(b,1);runtime.log('event "'+h+'" unsubscribed.')};(function(){var h;for(h=0;h<k.length;h+=1)l[k[h]]=[]})()};
// Input 12
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var k=runtime.getWindow().document,l=k.getElementById("testarea");runtime.assert(!l,'Unclean test environment, found a div with id "testarea".');l=k.createElement("div");l.setAttribute("id","testarea");k.body.appendChild(l);return l};
core.UnitTest.cleanupTestAreaDiv=function(){var k=runtime.getWindow().document,l=k.getElementById("testarea");runtime.assert(!!l&&l.parentNode===k.body,'Test environment broken, found no div with id "testarea" below body.');k.body.removeChild(l)};
core.UnitTestRunner=function(){function k(b){a+=1;runtime.log("fail",b)}function l(a,c){var b;try{if(a.length!==c.length)return k("array of length "+a.length+" should be "+c.length+" long"),!1;for(b=0;b<a.length;b+=1)if(a[b]!==c[b])return k(a[b]+" should be "+c[b]+" at array index "+b),!1}catch(m){return!1}return!0}function h(a,c,b){var m=a.attributes,f=m.length,e,g,r;for(e=0;e<f;e+=1)if(g=m.item(e),"xmlns"!==g.prefix){r=c.getAttributeNS(g.namespaceURI,g.localName);if(!c.hasAttributeNS(g.namespaceURI,
g.localName))return k("Attribute "+g.localName+" with value "+g.value+" was not present"),!1;if(r!==g.value)return k("Attribute "+g.localName+" was "+r+" should be "+g.value),!1}return b?!0:h(c,a,!0)}function e(a,c){if(a.nodeType!==c.nodeType)return k(a.nodeType+" should be "+c.nodeType),!1;if(a.nodeType===Node.TEXT_NODE)return a.data===c.data;runtime.assert(a.nodeType===Node.ELEMENT_NODE,"Only textnodes and elements supported.");if(a.namespaceURI!==c.namespaceURI||a.localName!==c.localName)return k(a.namespaceURI+
" should be "+c.namespaceURI),!1;if(!h(a,c,!1))return!1;for(var b=a.firstChild,m=c.firstChild;b;){if(!m||!e(b,m))return!1;b=b.nextSibling;m=m.nextSibling}return m?!1:!0}function b(a,c){return 0===c?a===c&&1/a===1/c:a===c?!0:"number"===typeof c&&isNaN(c)?"number"===typeof a&&isNaN(a):Object.prototype.toString.call(c)===Object.prototype.toString.call([])?l(a,c):"object"===typeof c&&"object"===typeof a?c.constructor===Element||c.constructor===Node?e(c,a):f(c,a):!1}function g(a,c,f){"string"===typeof c&&
"string"===typeof f||runtime.log("WARN: shouldBe() expects string arguments");var m,e;try{e=eval(c)}catch(n){m=n}a=eval(f);m?k(c+" should be "+a+". Threw exception "+m):b(e,a)?runtime.log("pass",c+" is "+f):String(typeof e)===String(typeof a)?(f=0===e&&0>1/e?"-0":String(e),k(c+" should be "+a+". Was "+f+".")):k(c+" should be "+a+" (of type "+typeof a+"). Was "+e+" (of type "+typeof e+").")}var a=0,f;f=function(a,c){var f=Object.keys(a),m=Object.keys(c);f.sort();m.sort();return l(f,m)&&Object.keys(a).every(function(m){var f=
a[m],e=c[m];return b(f,e)?!0:(k(f+" should be "+e+" for key "+m),!1)})};this.areNodesEqual=e;this.shouldBeNull=function(a,c){g(a,c,"null")};this.shouldBeNonNull=function(a,c){var b,m;try{m=eval(c)}catch(f){b=f}b?k(c+" should be non-null. Threw exception "+b):null!==m?runtime.log("pass",c+" is non-null."):k(c+" should be non-null. Was "+m)};this.shouldBe=g;this.countFailedTests=function(){return a}};
core.UnitTester=function(){function k(e,b){return"<span style='color:blue;cursor:pointer' onclick='"+b+"'>"+e+"</span>"}var l=0,h={};this.runTests=function(e,b,g){function a(m){if(0===m.length)h[f]=t,l+=d.countFailedTests(),b();else{q=m[0];var e=Runtime.getFunctionName(q);runtime.log("Running "+e);p=d.countFailedTests();c.setUp();q(function(){c.tearDown();t[e]=p===d.countFailedTests();a(m.slice(1))})}}var f=Runtime.getFunctionName(e),d=new core.UnitTestRunner,c=new e(d),t={},m,q,n,p,r="BrowserRuntime"===
runtime.type();if(h.hasOwnProperty(f))runtime.log("Test "+f+" has already run.");else{r?runtime.log("<span>Running "+k(f,'runSuite("'+f+'");')+": "+c.description()+"</span>"):runtime.log("Running "+f+": "+c.description);n=c.tests();for(m=0;m<n.length;m+=1)q=n[m],e=Runtime.getFunctionName(q)||q.testName,g.length&&-1===g.indexOf(e)||(r?runtime.log("<span>Running "+k(e,'runTest("'+f+'","'+e+'")')+"</span>"):runtime.log("Running "+e),p=d.countFailedTests(),c.setUp(),q(),c.tearDown(),t[e]=p===d.countFailedTests());
a(c.asyncTests())}};this.countFailedTests=function(){return l};this.results=function(){return h}};
// Input 13
core.PositionIterator=function(k,l,h,e){function b(){this.acceptNode=function(c){return c.nodeType===Node.TEXT_NODE&&0===c.length?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}function g(c){this.acceptNode=function(a){return a.nodeType===Node.TEXT_NODE&&0===a.length?NodeFilter.FILTER_REJECT:c.acceptNode(a)}}function a(){var a=d.currentNode.nodeType;c=a===Node.TEXT_NODE?d.currentNode.length-1:a===Node.ELEMENT_NODE?1:0}var f=this,d,c,t;this.nextPosition=function(){if(d.currentNode===k)return!1;
if(0===c&&d.currentNode.nodeType===Node.ELEMENT_NODE)null===d.firstChild()&&(c=1);else if(d.currentNode.nodeType===Node.TEXT_NODE&&c+1<d.currentNode.length)c+=1;else if(null!==d.nextSibling())c=0;else if(d.parentNode())c=1;else return!1;return!0};this.previousPosition=function(){var b=!0;if(0===c)if(null===d.previousSibling()){if(!d.parentNode()||d.currentNode===k)return d.firstChild(),!1;c=0}else a();else d.currentNode.nodeType===Node.TEXT_NODE?c-=1:null!==d.lastChild()?a():d.currentNode===k?b=!1:
c=0;return b};this.container=function(){var a=d.currentNode,b=a.nodeType;return 0===c&&b!==Node.TEXT_NODE?a.parentNode:a};this.rightNode=function(){var a=d.currentNode,b=a.nodeType;if(b===Node.TEXT_NODE&&c===a.length)for(a=a.nextSibling;a&&1!==t(a);)a=a.nextSibling;else b===Node.ELEMENT_NODE&&1===c&&(a=null);return a};this.leftNode=function(){var a=d.currentNode;if(0===c)for(a=a.previousSibling;a&&1!==t(a);)a=a.previousSibling;else if(a.nodeType===Node.ELEMENT_NODE)for(a=a.lastChild;a&&1!==t(a);)a=
a.previousSibling;return a};this.getCurrentNode=function(){return d.currentNode};this.domOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return c;var a=0,b=d.currentNode,f;for(f=1===c?d.lastChild():d.previousSibling();f;)a+=1,f=d.previousSibling();d.currentNode=b;return a};this.unfilteredDomOffset=function(){if(d.currentNode.nodeType===Node.TEXT_NODE)return c;for(var a=0,b=d.currentNode,b=1===c?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=
function(){var a=d.currentNode,c=d.previousSibling();d.currentNode=a;return c};this.getNextSibling=function(){var a=d.currentNode,c=d.nextSibling();d.currentNode=a;return c};this.setUnfilteredPosition=function(a,b){var e;runtime.assert(null!==a&&void 0!==a,"PositionIterator.setUnfilteredPosition called without container");d.currentNode=a;if(a.nodeType===Node.TEXT_NODE)return c=b,runtime.assert(b<=a.length,"Error in setPosition: "+b+" > "+a.length),runtime.assert(0<=b,"Error in setPosition: "+b+" < 0"),
b===a.length&&(c=void 0,d.nextSibling()?c=0:d.parentNode()&&(c=1),runtime.assert(void 0!==c,"Error in setPosition: position not valid.")),!0;e=t(a);b<a.childNodes.length&&e!==NodeFilter.FILTER_REJECT?(d.currentNode=a.childNodes[b],e=t(d.currentNode),c=0):c=0===b?0:1;e===NodeFilter.FILTER_REJECT&&(c=1);if(e!==NodeFilter.FILTER_ACCEPT)return f.nextPosition();runtime.assert(t(d.currentNode)===NodeFilter.FILTER_ACCEPT,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
return!0};this.moveToEnd=function(){d.currentNode=k;c=1};this.moveToEndOfNode=function(a){a.nodeType===Node.TEXT_NODE?f.setUnfilteredPosition(a,a.length):(d.currentNode=a,c=1)};this.getNodeFilter=function(){return t};t=(h?new g(h):new b).acceptNode;t.acceptNode=t;d=k.ownerDocument.createTreeWalker(k,l||4294967295,t,e);c=0;null===d.firstChild()&&(c=1)};
// Input 14
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(k){};(function(){return core.PositionFilter})();
// Input 15
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var k={},l=core.PositionFilter.FilterResult.FILTER_ACCEPT,h=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(e){for(var b in k)if(k.hasOwnProperty(b)&&k[b].acceptPosition(e)===h)return h;return l};this.addFilter=function(e,b){k[e]=b};this.removeFilter=function(e){delete k[e]}};
// Input 16
core.Async=function(){this.forEach=function(k,l,h){function e(b){a!==g&&(b?(a=g,h(b)):(a+=1,a===g&&h(null)))}var b,g=k.length,a=0;for(b=0;b<g;b+=1)l(k[b],e)}};
// Input 17
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(k,l){function h(a){var c=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,d,f=a.length,m=0,m=0;b=-1;for(d=0;d<f;d+=1)m=(b^a[d])&255,m=c[m],b=b>>>8^m;return b^-1}function e(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function b(a){var c=a.getFullYear();return 1980>c?0:c-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function g(a,c){var b,d,f,m,g,n,h,q=this;this.load=function(c){if(void 0!==q.data)c(null,q.data);else{var b=g+34+d+f+256;b+h>p&&(b=p-h);runtime.read(a,h,b,function(b,d){if(b||null===d)c(b,d);else a:{var f=d,e=new core.ByteArray(f),p=e.readUInt32LE(),s;if(67324752!==p)c("File entry signature is wrong."+p.toString()+" "+f.length.toString(),null);else{e.pos+=22;p=e.readUInt16LE();s=e.readUInt16LE();e.pos+=p+s;
if(m){f=f.slice(e.pos,e.pos+g);if(g!==f.length){c("The amount of compressed bytes read was "+f.length.toString()+" instead of "+g.toString()+" for "+q.filename+" in "+a+".",null);break a}f=w(f,n)}else f=f.slice(e.pos,e.pos+n);n!==f.length?c("The amount of bytes read was "+f.length.toString()+" instead of "+n.toString()+" for "+q.filename+" in "+a+".",null):(q.data=f,c(null,f))}}})}};this.set=function(a,c,b,d){q.filename=a;q.data=c;q.compressed=b;q.date=d};this.error=null;c&&(b=c.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+a+'": '+c.data.length.toString():(c.pos+=6,m=c.readUInt16LE(),this.date=e(c.readUInt32LE()),c.readUInt32LE(),g=c.readUInt32LE(),n=c.readUInt32LE(),d=c.readUInt16LE(),f=c.readUInt16LE(),b=c.readUInt16LE(),c.pos+=8,h=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.slice(c.pos,c.pos+d),"utf8"),c.pos+=d+f+b))}function a(a,c){if(22!==a.length)c("Central directory length should be 22.",
u);else{var b=new core.ByteArray(a),d;d=b.readUInt32LE();101010256!==d?c("Central directory signature is wrong: "+d.toString(),u):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",u):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",u):(d=b.readUInt16LE(),r=b.readUInt16LE(),d!==r?c("Number of entries is inconsistent.",u):(d=b.readUInt32LE(),b=b.readUInt16LE(),b=p-22-d,runtime.read(k,b,p-b,function(a,b){if(a||null===b)c(a,u);else a:{var d=
new core.ByteArray(b),f,m;n=[];for(f=0;f<r;f+=1){m=new g(k,d);if(m.error){c(m.error,u);break a}n[n.length]=m}c(null,u)}})))))}}function f(a,c){var b=null,d,f;for(f=0;f<n.length;f+=1)if(d=n[f],d.filename===a){b=d;break}b?b.data?c(null,b.data):b.load(c):c(a+" not found.",null)}function d(a){var c=new core.ByteArrayWriter("utf8"),d=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(d=a.data.length);c.appendUInt32LE(b(a.date));c.appendUInt32LE(h(a.data));c.appendUInt32LE(d);c.appendUInt32LE(d);c.appendUInt16LE(a.filename.length);
c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function c(a,c){var d=new core.ByteArrayWriter("utf8"),f=0;d.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(f=a.data.length);d.appendUInt32LE(b(a.date));d.appendUInt32LE(h(a.data));d.appendUInt32LE(f);d.appendUInt32LE(f);d.appendUInt16LE(a.filename.length);d.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);d.appendUInt32LE(c);d.appendString(a.filename);return d}function t(a,c){if(a===n.length)c(null);else{var b=n[a];
void 0!==b.data?t(a+1,c):b.load(function(b){b?c(b):t(a+1,c)})}}function m(a,b){t(0,function(f){if(f)b(f);else{f=new core.ByteArrayWriter("utf8");var m,e,g,p=[0];for(m=0;m<n.length;m+=1)f.appendByteArrayWriter(d(n[m])),p.push(f.getLength());g=f.getLength();for(m=0;m<n.length;m+=1)e=n[m],f.appendByteArrayWriter(c(e,p[m]));m=f.getLength()-g;f.appendArray([80,75,5,6,0,0,0,0]);f.appendUInt16LE(n.length);f.appendUInt16LE(n.length);f.appendUInt32LE(m);f.appendUInt32LE(g);f.appendArray([0,0]);a(f.getByteArray())}})}
function q(a,c){m(function(b){runtime.writeFile(a,b,c)},c)}var n,p,r,w=(new core.RawInflate).inflate,u=this,y=new core.Base64;this.load=f;this.save=function(a,c,b,d){var f,m;for(f=0;f<n.length;f+=1)if(m=n[f],m.filename===a){m.set(a,c,b,d);return}m=new g(k);m.set(a,c,b,d);n.push(m)};this.write=function(a){q(k,a)};this.writeAs=q;this.createByteArray=m;this.loadContentXmlAsFragments=function(a,c){u.loadAsString(a,function(a,b){if(a)return c.rootElementReady(a);c.rootElementReady(null,b,!0)})};this.loadAsString=
function(a,c){f(a,function(a,b){if(a||null===b)return c(a,null);var d=runtime.byteArrayToString(b,"utf8");c(null,d)})};this.loadAsDOM=function(a,c){u.loadAsString(a,function(a,b){if(a||null===b)c(a,null);else{var d=(new DOMParser).parseFromString(b,"text/xml");c(null,d)}})};this.loadAsDataURL=function(a,c,b){f(a,function(a,d){if(a)return b(a,null);var f=0,m;c||(c=80===d[1]&&78===d[2]&&71===d[3]?"image/png":255===d[0]&&216===d[1]&&255===d[2]?"image/jpeg":71===d[0]&&73===d[1]&&70===d[2]?"image/gif":
"");for(m="data:"+c+";base64,";f<d.length;)m+=y.convertUTF8ArrayToBase64(d.slice(f,Math.min(f+45E3,d.length))),f+=45E3;b(null,m)})};this.getEntries=function(){return n.slice()};p=-1;null===l?n=[]:runtime.getFileSize(k,function(c){p=c;0>p?l("File '"+k+"' cannot be read.",u):runtime.read(k,p-22,22,function(c,b){c||null===l||null===b?l(c,u):a(b,l)})})};
// Input 18
core.CSSUnits=function(){var k={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(l,h,e){return l*k[e]/k[h]};this.convertMeasure=function(k,h){var e,b;k&&h?(e=parseFloat(k),b=k.replace(e.toString(),""),e=this.convert(e,b,h)):e="";return e.toString()};this.getUnits=function(k){return k.substr(k.length-2,k.length)}};
// Input 19
xmldom.LSSerializerFilter=function(){};
// Input 20
"function"!==typeof Object.create&&(Object.create=function(k){var l=function(){};l.prototype=k;return new l});
xmldom.LSSerializer=function(){function k(b){var e=b||{},a=function(a){var c={},b;for(b in a)a.hasOwnProperty(b)&&(c[a[b]]=b);return c}(b),f=[e],d=[a],c=0;this.push=function(){c+=1;e=f[c]=Object.create(e);a=d[c]=Object.create(a)};this.pop=function(){f[c]=void 0;d[c]=void 0;c-=1;e=f[c];a=d[c]};this.getLocalNamespaceDefinitions=function(){return a};this.getQName=function(c){var b=c.namespaceURI,d=0,f;if(!b)return c.localName;if(f=a[b])return f+":"+c.localName;do{f||!c.prefix?(f="ns"+d,d+=1):f=c.prefix;
if(e[f]===b)break;if(!e[f]){e[f]=b;a[b]=f;break}f=null}while(null===f);return f+":"+c.localName}}function l(b){return b.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function h(b,g){var a="",f=e.filter?e.filter.acceptNode(g):NodeFilter.FILTER_ACCEPT,d;if(f===NodeFilter.FILTER_ACCEPT&&g.nodeType===Node.ELEMENT_NODE){b.push();d=b.getQName(g);var c,k=g.attributes,m,q,n,p="",r;c="<"+d;m=k.length;for(q=0;q<m;q+=1)n=k.item(q),"http://www.w3.org/2000/xmlns/"!==
n.namespaceURI&&(r=e.filter?e.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,r===NodeFilter.FILTER_ACCEPT&&(r=b.getQName(n),n="string"===typeof n.value?l(n.value):n.value,p+=" "+(r+'="'+n+'"')));m=b.getLocalNamespaceDefinitions();for(q in m)m.hasOwnProperty(q)&&((k=m[q])?"xmlns"!==k&&(c+=" xmlns:"+m[q]+'="'+q+'"'):c+=' xmlns="'+q+'"');a+=c+(p+">")}if(f===NodeFilter.FILTER_ACCEPT||f===NodeFilter.FILTER_SKIP){for(f=g.firstChild;f;)a+=h(b,f),f=f.nextSibling;g.nodeValue&&(a+=l(g.nodeValue))}d&&(a+="</"+
d+">",b.pop());return a}var e=this;this.filter=null;this.writeToString=function(b,e){if(!b)return"";var a=new k(e);return h(a,b)}};
// Input 21
xmldom.RelaxNGParser=function(){function k(a,b){this.message=function(){b&&(a+=1===b.nodeType?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function l(a){if(2>=a.e.length)return a;var b={name:a.name,e:a.e.slice(0,2)};return l({name:a.name,e:[b].concat(a.e.slice(2))})}function h(a){a=a.split(":",2);var b="",d;1===a.length?a=["",a[0]]:b=a[0];for(d in f)f[d]===b&&(a[0]=d);return a}function e(a,b){for(var d=0,f,g,p=a.name;a.e&&d<a.e.length;)if(f=
a.e[d],"ref"===f.name){g=b[f.a.name];if(!g)throw f.a.name+" was not defined.";f=a.e.slice(d+1);a.e=a.e.slice(0,d);a.e=a.e.concat(g.e);a.e=a.e.concat(f)}else d+=1,e(f,b);f=a.e;"choice"!==p||f&&f[1]&&"empty"!==f[1].name||(f&&f[0]&&"empty"!==f[0].name?(f[1]=f[0],f[0]={name:"empty"}):(delete a.e,a.name="empty"));if("group"===p||"interleave"===p)"empty"===f[0].name?"empty"===f[1].name?(delete a.e,a.name="empty"):(p=a.name=f[1].name,a.names=f[1].names,f=a.e=f[1].e):"empty"===f[1].name&&(p=a.name=f[0].name,
a.names=f[0].names,f=a.e=f[0].e);"oneOrMore"===p&&"empty"===f[0].name&&(delete a.e,a.name="empty");if("attribute"===p){g=a.names?a.names.length:0;for(var r,k=[],l=[],d=0;d<g;d+=1)r=h(a.names[d]),l[d]=r[0],k[d]=r[1];a.localnames=k;a.namespaces=l}"interleave"===p&&("interleave"===f[0].name?a.e="interleave"===f[1].name?f[0].e.concat(f[1].e):[f[1]].concat(f[0].e):"interleave"===f[1].name&&(a.e=[f[0]].concat(f[1].e)))}function b(a,d){for(var f=0,e;a.e&&f<a.e.length;)e=a.e[f],"elementref"===e.name?(e.id=
e.id||0,a.e[f]=d[e.id]):"element"!==e.name&&b(e,d),f+=1}var g=this,a,f={"http://www.w3.org/XML/1998/namespace":"xml"},d;d=function(a,b,e){var g=[],n,p,r=a.localName,k=[];n=a.attributes;var u=r,y=k,x={},s,v;for(s=0;s<n.length;s+=1)if(v=n.item(s),v.namespaceURI)"http://www.w3.org/2000/xmlns/"===v.namespaceURI&&(f[v.value]=v.localName);else{"name"!==v.localName||"element"!==u&&"attribute"!==u||y.push(v.value);if("name"===v.localName||"combine"===v.localName||"type"===v.localName){var A=v,F;F=v.value;
F=F.replace(/^\s\s*/,"");for(var D=/\s/,O=F.length-1;D.test(F.charAt(O));)O-=1;F=F.slice(0,O+1);A.value=F}x[v.localName]=v.value}n=x;n.combine=n.combine||void 0;a=a.firstChild;u=g;y=k;for(x="";a;){if(a.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===a.namespaceURI){if(s=d(a,b,u))"name"===s.name?y.push(f[s.a.ns]+":"+s.text):"choice"===s.name&&(s.names&&s.names.length)&&(y=y.concat(s.names),delete s.names),u.push(s)}else a.nodeType===Node.TEXT_NODE&&(x+=a.nodeValue);a=a.nextSibling}a=
x;"value"!==r&&"param"!==r&&(a=/^\s*([\s\S]*\S)?\s*$/.exec(a)[1]);"value"===r&&void 0===n.type&&(n.type="token",n.datatypeLibrary="");"attribute"!==r&&"element"!==r||void 0===n.name||(p=h(n.name),g=[{name:"name",text:p[1],a:{ns:p[0]}}].concat(g),delete n.name);"name"===r||"nsName"===r||"value"===r?void 0===n.ns&&(n.ns=""):delete n.ns;"name"===r&&(p=h(a),n.ns=p[0],a=p[1]);1<g.length&&("define"===r||"oneOrMore"===r||"zeroOrMore"===r||"optional"===r||"list"===r||"mixed"===r)&&(g=[{name:"group",e:l({name:"group",
e:g}).e}]);2<g.length&&"element"===r&&(g=[g[0]].concat({name:"group",e:l({name:"group",e:g.slice(1)}).e}));1===g.length&&"attribute"===r&&g.push({name:"text",text:a});1!==g.length||"choice"!==r&&"group"!==r&&"interleave"!==r?2<g.length&&("choice"===r||"group"===r||"interleave"===r)&&(g=l({name:r,e:g}).e):(r=g[0].name,k=g[0].names,n=g[0].a,a=g[0].text,g=g[0].e);"mixed"===r&&(r="interleave",g=[g[0],{name:"text"}]);"optional"===r&&(r="choice",g=[g[0],{name:"empty"}]);"zeroOrMore"===r&&(r="choice",g=
[{name:"oneOrMore",e:[g[0]]},{name:"empty"}]);if("define"===r&&n.combine){a:{u=n.combine;y=n.name;x=g;for(s=0;e&&s<e.length;s+=1)if(v=e[s],"define"===v.name&&v.a&&v.a.name===y){v.e=[{name:u,e:v.e.concat(x)}];e=v;break a}e=null}if(e)return}e={name:r};g&&0<g.length&&(e.e=g);for(p in n)if(n.hasOwnProperty(p)){e.a=n;break}void 0!==a&&(e.text=a);k&&0<k.length&&(e.names=k);"element"===r&&(e.id=b.length,b.push(e),e={name:"elementref",id:e.id});return e};this.parseRelaxNGDOM=function(c,h){var m=[],q=d(c&&
c.documentElement,m,void 0),n,p,r={};for(n=0;n<q.e.length;n+=1)p=q.e[n],"define"===p.name?r[p.a.name]=p:"start"===p.name&&(a=p);if(!a)return[new k("No Relax NG start element was found.")];e(a,r);for(n in r)r.hasOwnProperty(n)&&e(r[n],r);for(n=0;n<m.length;n+=1)e(m[n],r);h&&(g.rootPattern=h(a.e[0],m));b(a,m);for(n=0;n<m.length;n+=1)b(m[n],m);g.start=a;g.elements=m;g.nsmap=f;return null}};
// Input 22
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function k(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function l(a,b){return function(){var c={},d=0;return function(f){var e=f.hash||f.toString(),m;m=c[e];if(void 0!==m)return m;c[e]=m=b(f);m.hash=a+d.toString();d+=1;return m}}()}function h(a){return function(){var b={};return function(c){var d,f;f=b[c.localName];if(void 0===f)b[c.localName]=f={};else if(d=f[c.namespaceURI],void 0!==d)return d;return f[c.namespaceURI]=d=a(c)}}()}function e(a,
b,c){return function(){var d={},f=0;return function(e,m){var g=b&&b(e,m),n,p;if(void 0!==g)return g;g=e.hash||e.toString();n=m.hash||m.toString();p=d[g];if(void 0===p)d[g]=p={};else if(g=p[n],void 0!==g)return g;p[n]=g=c(e,m);g.hash=a+f.toString();f+=1;return g}}()}function b(a,c){"choice"===c.p1.type?b(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?b(a,c.p2):a[c.p2.hash]=c.p2}function g(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return s},startTagOpenDeriv:function(c){return a.contains(c)?
n(b,v):s},attDeriv:function(){return s},startTagCloseDeriv:function(){return this}}}function a(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return v}}}function f(a,b,d,e){if(b===s)return s;if(e>=d.length)return b;0===e&&(e=0);for(var m=d.item(e);m.namespaceURI===c;){e+=1;if(e>=d.length)return b;m=d.item(e)}return m=f(a,b.attDeriv(a,d.item(e)),d,e+1)}function d(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):d(a,b,c.e[0]);c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):
d(a,b,c.e[1])}var c="http://www.w3.org/2000/xmlns/",t,m,q,n,p,r,w,u,y,x,s={type:"notAllowed",nullable:!1,hash:"notAllowed",textDeriv:function(){return s},startTagOpenDeriv:function(){return s},attDeriv:function(){return s},startTagCloseDeriv:function(){return s},endTagDeriv:function(){return s}},v={type:"empty",nullable:!0,hash:"empty",textDeriv:function(){return s},startTagOpenDeriv:function(){return s},attDeriv:function(){return s},startTagCloseDeriv:function(){return v},endTagDeriv:function(){return s}},
A={type:"text",nullable:!0,hash:"text",textDeriv:function(){return A},startTagOpenDeriv:function(){return s},attDeriv:function(){return s},startTagCloseDeriv:function(){return A},endTagDeriv:function(){return s}},F,D,O;t=e("choice",function(a,b){if(a===s)return b;if(b===s||a===b)return a},function(a,c){var d={},f;b(d,{p1:a,p2:c});c=a=void 0;for(f in d)d.hasOwnProperty(f)&&(void 0===a?a=d[f]:c=void 0===c?d[f]:t(c,d[f]));return function(a,b){return{type:"choice",p1:a,p2:b,nullable:a.nullable||b.nullable,
textDeriv:function(c,d){return t(a.textDeriv(c,d),b.textDeriv(c,d))},startTagOpenDeriv:h(function(c){return t(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,d){return t(a.attDeriv(c,d),b.attDeriv(c,d))},startTagCloseDeriv:k(function(){return t(a.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:k(function(){return t(a.endTagDeriv(),b.endTagDeriv())})}}(a,c)});m=function(a,b,c){return function(){var d={},f=0;return function(e,m){var g=b&&b(e,m),n,p;if(void 0!==g)return g;
g=e.hash||e.toString();n=m.hash||m.toString();g<n&&(p=g,g=n,n=p,p=e,e=m,m=p);p=d[g];if(void 0===p)d[g]=p={};else if(g=p[n],void 0!==g)return g;p[n]=g=c(e,m);g.hash=a+f.toString();f+=1;return g}}()}("interleave",function(a,b){if(a===s||b===s)return s;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"interleave",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){return t(m(a.textDeriv(c,d),b),m(a,b.textDeriv(c,d)))},startTagOpenDeriv:h(function(c){return t(F(function(a){return m(a,
b)},a.startTagOpenDeriv(c)),F(function(b){return m(a,b)},b.startTagOpenDeriv(c)))}),attDeriv:function(c,d){return t(m(a.attDeriv(c,d),b),m(a,b.attDeriv(c,d)))},startTagCloseDeriv:k(function(){return m(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});q=e("group",function(a,b){if(a===s||b===s)return s;if(a===v)return b;if(b===v)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(c,d){var f=q(a.textDeriv(c,d),b);return a.nullable?t(f,b.textDeriv(c,
d)):f},startTagOpenDeriv:function(c){var d=F(function(a){return q(a,b)},a.startTagOpenDeriv(c));return a.nullable?t(d,b.startTagOpenDeriv(c)):d},attDeriv:function(c,d){return t(q(a.attDeriv(c,d),b),q(a,b.attDeriv(c,d)))},startTagCloseDeriv:k(function(){return q(a.startTagCloseDeriv(),b.startTagCloseDeriv())})}});n=e("after",function(a,b){if(a===s||b===s)return s},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,d){return n(a.textDeriv(c,d),b)},startTagOpenDeriv:h(function(c){return F(function(a){return n(a,
b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,d){return n(a.attDeriv(c,d),b)},startTagCloseDeriv:k(function(){return n(a.startTagCloseDeriv(),b)}),endTagDeriv:k(function(){return a.nullable?b:s})}});p=l("oneormore",function(a){return a===s?s:{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,c){return q(a.textDeriv(b,c),t(this,v))},startTagOpenDeriv:function(b){var c=this;return F(function(a){return q(a,t(c,v))},a.startTagOpenDeriv(b))},attDeriv:function(b,c){return q(a.attDeriv(b,
c),t(this,v))},startTagCloseDeriv:k(function(){return p(a.startTagCloseDeriv())})}});w=e("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,nc:a,p:b,attDeriv:function(c,d){return a.contains(d)&&(b.nullable&&/^\s+$/.test(d.nodeValue)||b.textDeriv(c,d.nodeValue).nullable)?v:s},startTagCloseDeriv:function(){return s}}});r=l("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?v:s},attDeriv:function(){return s},startTagCloseDeriv:function(){return this}}});
y=l("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return v},attDeriv:function(){return s},startTagCloseDeriv:function(){return this}}});F=function P(a,b){return"after"===b.type?n(b.p1,a(b.p2)):"choice"===b.type?t(P(a,b.p1),P(a,b.p2)):b};D=function(a,b,c){var d=c.currentNode;b=b.startTagOpenDeriv(d);b=f(a,b,d.attributes,0);var e=b=b.startTagCloseDeriv(),d=c.currentNode;b=c.firstChild();for(var m=[],g;b;)b.nodeType===Node.ELEMENT_NODE?m.push(b):b.nodeType!==Node.TEXT_NODE||
/^\s*$/.test(b.nodeValue)||m.push(b.nodeValue),b=c.nextSibling();0===m.length&&(m=[""]);g=e;for(e=0;g!==s&&e<m.length;e+=1)b=m[e],"string"===typeof b?g=/^\s*$/.test(b)?t(g,g.textDeriv(a,b)):g.textDeriv(a,b):(c.currentNode=b,g=D(a,g,c));c.currentNode=d;return b=g.endTagDeriv()};u=function(a){var b,c,f;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];d(b,c,a);a="";for(f=0;f<b.length;f+=
1)a+="{"+c[f]+"}"+b[f]+",";a={hash:a,contains:function(a){var d;for(d=0;d<b.length;d+=1)if(b[d]===a.localName&&c[d]===a.namespaceURI)return!0;return!1}}}else a={hash:"anyName",contains:function(){return!0}};return a};x=function z(b,c){var d,f;if("elementref"===b.name){d=b.id||0;b=c[d];if(void 0!==b.name){var e=b;d=c[e.id]={hash:"element"+e.id.toString()};e=g(u(e.e[0]),x(e.e[1],c));for(f in e)e.hasOwnProperty(f)&&(d[f]=e[f]);return d}return b}switch(b.name){case "empty":return v;case "notAllowed":return s;
case "text":return A;case "choice":return t(z(b.e[0],c),z(b.e[1],c));case "interleave":d=z(b.e[0],c);for(f=1;f<b.e.length;f+=1)d=m(d,z(b.e[f],c));return d;case "group":return q(z(b.e[0],c),z(b.e[1],c));case "oneOrMore":return p(z(b.e[0],c));case "attribute":return w(u(b.e[0]),z(b.e[1],c));case "value":return r(b.text);case "data":return d=b.a&&b.a.type,void 0===d&&(d=""),y(d);case "list":return a()}throw"No support for "+b.name;};this.makePattern=function(a,b){var c={},d;for(d in b)b.hasOwnProperty(d)&&
(c[d]=b[d]);return d=x(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=D(null,O,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){O=a}};
// Input 23
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function k(a,b){this.message=function(){b&&(a+=b.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",a+=b.nodeName,b.nodeValue&&(a+=" with value '"+b.nodeValue+"'"),a+=".");return a}}function l(a,f,d,c){return"empty"===a.name?null:b(a,f,d,c)}function h(a,b){if(2!==a.e.length)throw"Element with wrong # of elements: "+a.e.length;for(var d=b.currentNode,c=d?d.nodeType:0,e=null;c>Node.ELEMENT_NODE;){if(c!==Node.COMMENT_NODE&&(c!==Node.TEXT_NODE||!/^\s+$/.test(b.currentNode.nodeValue)))return[new k("Not allowed node of type "+
c+".")];c=(d=b.nextSibling())?d.nodeType:0}if(!d)return[new k("Missing element "+a.names)];if(a.names&&-1===a.names.indexOf(g[d.namespaceURI]+":"+d.localName))return[new k("Found "+d.nodeName+" instead of "+a.names+".",d)];if(b.firstChild()){for(e=l(a.e[1],b,d);b.nextSibling();)if(c=b.currentNode.nodeType,!(b.currentNode&&b.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(b.currentNode.nodeValue)||c===Node.COMMENT_NODE))return[new k("Spurious content.",b.currentNode)];if(b.parentNode()!==d)return[new k("Implementation error.")]}else e=
l(a.e[1],b,d);b.nextSibling();return e}var e,b,g;b=function(a,f,d,c){var e=a.name,g=null;if("text"===e)a:{for(var q=(a=f.currentNode)?a.nodeType:0;a!==d&&3!==q;){if(1===q){g=[new k("Element not allowed here.",a)];break a}q=(a=f.nextSibling())?a.nodeType:0}f.nextSibling();g=null}else if("data"===e)g=null;else if("value"===e)c!==a.text&&(g=[new k("Wrong value, should be '"+a.text+"', not '"+c+"'",d)]);else if("list"===e)g=null;else if("attribute"===e)a:{if(2!==a.e.length)throw"Attribute with wrong # of elements: "+
a.e.length;e=a.localnames.length;for(g=0;g<e;g+=1){c=d.getAttributeNS(a.namespaces[g],a.localnames[g]);""!==c||d.hasAttributeNS(a.namespaces[g],a.localnames[g])||(c=void 0);if(void 0!==q&&void 0!==c){g=[new k("Attribute defined too often.",d)];break a}q=c}g=void 0===q?[new k("Attribute not found: "+a.names,d)]:l(a.e[1],f,d,q)}else if("element"===e)g=h(a,f);else if("oneOrMore"===e){c=0;do q=f.currentNode,e=b(a.e[0],f,d),c+=1;while(!e&&q!==f.currentNode);1<c?(f.currentNode=q,g=null):g=e}else if("choice"===
e){if(2!==a.e.length)throw"Choice with wrong # of options: "+a.e.length;q=f.currentNode;if("empty"===a.e[0].name){if(e=b(a.e[1],f,d,c))f.currentNode=q;g=null}else{if(e=l(a.e[0],f,d,c))f.currentNode=q,e=b(a.e[1],f,d,c);g=e}}else if("group"===e){if(2!==a.e.length)throw"Group with wrong # of members: "+a.e.length;g=b(a.e[0],f,d)||b(a.e[1],f,d)}else if("interleave"===e)a:{q=a.e.length;c=[q];for(var n=q,p,r,w,u;0<n;){p=0;r=f.currentNode;for(g=0;g<q;g+=1)w=f.currentNode,!0!==c[g]&&c[g]!==w&&(u=a.e[g],(e=
b(u,f,d))?(f.currentNode=w,void 0===c[g]&&(c[g]=!1)):w===f.currentNode||"oneOrMore"===u.name||"choice"===u.name&&("oneOrMore"===u.e[0].name||"oneOrMore"===u.e[1].name)?(p+=1,c[g]=w):(p+=1,c[g]=!0));if(r===f.currentNode&&p===n){g=null;break a}if(0===p){for(g=0;g<q;g+=1)if(!1===c[g]){g=[new k("Interleave does not match.",d)];break a}g=null;break a}for(g=n=0;g<q;g+=1)!0!==c[g]&&(n+=1)}g=null}else throw e+" not allowed in nonEmptyPattern.";return g};this.validate=function(a,b){a.currentNode=a.root;var d=
l(e.e[0],a,a.root);b(d)};this.init=function(a,b){e=a;g=b}};
// Input 24
xmldom.XPathIterator=function(){};
xmldom.XPath=function(){function k(a,b,c){return-1!==a&&(a<b||-1===b)&&(a<c||-1===c)}function l(a){for(var b=[],c=0,d=a.length,f;c<d;){var e=a,g=d,h=b,l="",s=[],v=e.indexOf("[",c),A=e.indexOf("/",c),F=e.indexOf("=",c);k(A,v,F)?(l=e.substring(c,A),c=A+1):k(v,A,F)?(l=e.substring(c,v),c=t(e,v,s)):k(F,A,v)?(l=e.substring(c,F),c=F):(l=e.substring(c,g),c=g);h.push({location:l,predicates:s});if(c<d&&"="===a[c]){f=a.substring(c+1,d);if(2<f.length&&("'"===f[0]||'"'===f[0]))f=f.slice(1,f.length-1);else try{f=
parseInt(f,10)}catch(D){}c=d}}return{steps:b,value:f}}function h(){var a,b=!1;this.setNode=function(b){a=b};this.reset=function(){b=!1};this.next=function(){var c=b?null:a;b=!0;return c}}function e(a,b,c){this.reset=function(){a.reset()};this.next=function(){for(var d=a.next();d&&!(d=d.getAttributeNodeNS(b,c));)d=a.next();return d}}function b(a,b){var c=a.next(),d=null;this.reset=function(){a.reset();c=a.next();d=null};this.next=function(){for(;c;){if(d)if(b&&d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&
d!==c;)d=d.parentNode;d===c?c=a.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=a.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function g(a,b){this.reset=function(){a.reset()};this.next=function(){for(var c=a.next();c&&!b(c);)c=a.next();return c}}function a(a,b,c){b=b.split(":",2);var d=c(b[0]),f=b[1];return new g(a,function(a){return a.localName===f&&a.namespaceURI===d})}function f(a,b,d){var f=new h,e=c(f,b,d),k=b.value;return void 0===k?new g(a,function(a){f.setNode(a);
e.reset();return e.next()}):new g(a,function(a){f.setNode(a);e.reset();return(a=e.next())&&a.nodeValue===k})}function d(a,b,d){runtime.assert(Boolean(a),"Expected to get a node in getODFElementsWithXPath()");var f=a.ownerDocument,e=[],g=null;if(f&&f.evaluate)for(d=f.evaluate(b,a,d,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),g=d.iterateNext();null!==g;)g.nodeType===Node.ELEMENT_NODE&&e.push(g),g=d.iterateNext();else{e=new h;e.setNode(a);a=l(b);e=c(e,a,d);a=[];for(d=e.next();d;)a.push(d),d=e.next();
e=a}return e}var c,t;t=function(a,b,c){for(var d=b,f=a.length,e=0;d<f;)"]"===a[d]?(e-=1,0>=e&&c.push(l(a.substring(b,d)))):"["===a[d]&&(0>=e&&(b=d+1),e+=1),d+=1;return d};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};c=function(c,d,g){var h,k,l,u;for(h=0;h<d.steps.length;h+=1)for(l=d.steps[h],k=l.location,""===k?c=new b(c,!1):"@"===k[0]?(u=k.slice(1).split(":",2),c=new e(c,g(u[0]),u[1])):"."!==k&&(c=new b(c,!1),-1!==k.indexOf(":")&&(c=a(c,k,g))),
k=0;k<l.predicates.length;k+=1)u=l.predicates[k],c=f(c,u,g);return c};xmldom.XPath=function(){this.getODFElementsWithXPath=d};return xmldom.XPath}();
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
gui.AnnotationViewManager=function(k,l,h){function e(a){var b=a.node,c=a.end;a=f.createRange();c&&(a.setStart(b,b.childNodes.length),a.setEnd(c,0),c=d.getTextNodes(a,!1),c.forEach(function(a){var c=f.createElement("span");c.className="annotationHighlight";c.setAttribute("annotation",b.getAttributeNS(odf.Namespaces.officens,"name"));a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function b(){a.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?
-1:1})}function g(){var b;for(b=0;b<a.length;b+=1){var d=a[b],e=d.node.parentNode,g=e.nextSibling,p=g.nextSibling,l=e.parentNode,w=0,u=a[a.indexOf(d)-1],y=void 0,d=d.node.getElementsByTagNameNS(odf.Namespaces.dcns,"creator")[0],w=void 0,w=k.getZoomLevel();e.style.left=(h.getBoundingClientRect().left-l.getBoundingClientRect().left)/w+"px";e.style.width=h.getBoundingClientRect().width/w+"px";g.style.width=parseFloat(e.style.left)-30+"px";u&&(y=u.node.parentNode.getBoundingClientRect(),20>=(l.getBoundingClientRect().top-
y.bottom)/w?e.style.top=Math.abs(l.getBoundingClientRect().top-y.bottom)/w+20+"px":e.style.top="0px");p.style.left=g.getBoundingClientRect().width/w+"px";var g=p.style,l=p.getBoundingClientRect().left/w,u=p.getBoundingClientRect().top/w,y=e.getBoundingClientRect().left/w,x=e.getBoundingClientRect().top/w,s=0,v=0,s=y-l,s=s*s,v=x-u,v=v*v,l=Math.sqrt(s+v);g.width=l+"px";w=Math.asin((e.getBoundingClientRect().top-p.getBoundingClientRect().top)/(w*parseFloat(p.style.width)));p.style.transform="rotate("+
w+"rad)";p.style.MozTransform="rotate("+w+"rad)";p.style.WebkitTransform="rotate("+w+"rad)";p.style.msTransform="rotate("+w+"rad)";d&&(w=c.getComputedStyle(d,":before").content)&&"none"!==w&&(w=w.substring(1,w.length-1),d.firstChild?d.firstChild.nodeValue=w:d.appendChild(f.createTextNode(w)))}}runtime.assert(Boolean(l),"Expected to get an odfFragment");var a=[],f=l.ownerDocument,d=new odf.OdfUtils,c=runtime.getWindow();runtime.assert(Boolean(c),"Expected to be run in an environment which has a global window, like a browser.");
this.rerenderAnnotations=g;this.addAnnotation=function(c){a.push({node:c.node,end:c.end});b();var d=f.createElement("div"),h=f.createElement("div"),n=f.createElement("div"),p=f.createElement("div"),k=f.createElement("div"),l=c.node;d.className="annotationWrapper";l.parentNode.insertBefore(d,l);h.className="annotationNote";h.appendChild(l);k.className="annotationRemoveButton";h.appendChild(k);n.className="annotationConnector horizontal";p.className="annotationConnector angular";d.appendChild(h);d.appendChild(n);
d.appendChild(p);c.end&&e(c);g()};this.forgetAnnotations=function(){for(;a.length;){var b=a[0],c=a.indexOf(b),d=b.node,e=d.parentNode.parentNode;"div"===e.localName&&(e.parentNode.insertBefore(d,e),e.parentNode.removeChild(e));b=b.node.getAttributeNS(odf.Namespaces.officens,"name");b=f.querySelectorAll('span.annotationHighlight[annotation="'+b+'"]');e=d=void 0;for(d=0;d<b.length;d+=1){for(e=b[d];e.firstChild;)e.parentNode.insertBefore(e.firstChild,e);e.parentNode.removeChild(e)}-1!==c&&a.splice(c,
1)}}};
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
odf.Namespaces=function(){function k(e){return l[e]||null}var l={draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",
dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",dc:"http://purl.org/dc/elements/1.1/",webodf:"urn:webodf"},h;k.lookupNamespaceURI=k;h=function(){};h.forEachPrefix=function(e){for(var b in l)l.hasOwnProperty(b)&&e(b,l[b])};h.resolvePrefix=k;h.namespaceMap=l;h.drawns="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0";h.fons="urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0";
h.officens="urn:oasis:names:tc:opendocument:xmlns:office:1.0";h.presentationns="urn:oasis:names:tc:opendocument:xmlns:presentation:1.0";h.stylens="urn:oasis:names:tc:opendocument:xmlns:style:1.0";h.svgns="urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0";h.tablens="urn:oasis:names:tc:opendocument:xmlns:table:1.0";h.textns="urn:oasis:names:tc:opendocument:xmlns:text:1.0";h.dr3dns="urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0";h.numberns="urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0";
h.xlinkns="http://www.w3.org/1999/xlink";h.xmlns="http://www.w3.org/XML/1998/namespace";h.dcns="http://purl.org/dc/elements/1.1/";h.webodfns="urn:webodf";return h}();
// Input 28
runtime.loadClass("xmldom.XPath");
odf.StyleInfo=function(){function k(a,b){for(var c=q[a.localName],d=c&&c[a.namespaceURI],f=d?d.length:0,e,c=0;c<f;c+=1)(e=a.getAttributeNS(d[c].ns,d[c].localname))&&a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,b+e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,k(d,b)),c=c.nextSibling}function l(a,b){for(var c=q[a.localName],d=c&&c[a.namespaceURI],f=d?d.length:0,e,c=0;c<f;c+=1)if(e=a.getAttributeNS(d[c].ns,d[c].localname))e=e.replace(b,""),a.setAttributeNS(d[c].ns,t[d[c].ns]+d[c].localname,
e);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,l(d,b)),c=c.nextSibling}function h(a,b){var c=q[a.localName],d=(c=c&&c[a.namespaceURI])?c.length:0,f,e,g;for(g=0;g<d;g+=1)if(f=a.getAttributeNS(c[g].ns,c[g].localname))b=b||{},e=c[g].keyname,e=b[e]=b[e]||{},e[f]=1;return b}function e(a,b){var c,d;h(a,b);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,e(d,b)),c=c.nextSibling}function b(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function g(a,c,d){var f=a+'"'+
c,e=d[f];e||(e=d[f]=new b(f,a,c));return e}function a(b,d,f){var e=q[b.localName],m=(e=e&&e[b.namespaceURI])?e.length:0,h=b.getAttributeNS(c,"name"),n=b.getAttributeNS(c,"family"),k;h&&n&&(d=g(h,n,f));if(d)for(h=0;h<m;h+=1)if(n=b.getAttributeNS(e[h].ns,e[h].localname))k=e[h].keyname,n=g(n,k,f),d.requires[n.key]=n;for(h=b.firstChild;h;)h.nodeType===Node.ELEMENT_NODE&&(b=h,a(b,d,f)),h=h.nextSibling;return f}function f(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){f(a.requires[c],
b)})}function d(b,c){var d=a(b,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&f(a,c)})}var c="urn:oasis:names:tc:opendocument:xmlns:style:1.0",t={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:","urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:",
"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:","urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},m={text:[{ens:c,
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
a:"page-layout-name"}]},q,n=new xmldom.XPath;this.UsedStyleList=function(a,b){var f={};this.uses=function(a){var b=a.localName,d=a.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name")||a.getAttributeNS(c,"name");a="style"===b?a.getAttributeNS(c,"family"):"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0"===a.namespaceURI?"data":b;return(a=f[a])?0<a[d]:!1};e(a,f);b&&d(b,f)};this.hasDerivedStyles=function(a,b,c){var d=b("style"),f=c.getAttributeNS(d,"name");c=c.getAttributeNS(d,
"family");return n.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+f+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,d){var f;if(a){for(f=a.firstChild;f;){if(f.nodeType===Node.ELEMENT_NODE){var e=f,g=b,m=e.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),h=void 0;m?h="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(m=e.getAttributeNS(c,"name"))&&(h=c);h&&e.setAttributeNS(h,t[h]+"name",g+m)}f=f.nextSibling}k(a,b);d&&k(d,
b)}};this.removePrefixFromStyleNames=function(a,b,d){var f=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE){var e=b,g=f,m=e.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:drawing:1.0","name"),h=void 0;m?h="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":(m=e.getAttributeNS(c,"name"))&&(h=c);h&&(m=m.replace(g,""),e.setAttributeNS(h,t[h]+"name",m))}b=b.nextSibling}l(a,f);d&&l(d,f)}};this.determineStylesForNode=h;q=function(a){var b,c,d,f,e,g={},m;for(b in a)if(a.hasOwnProperty(b))for(f=
a[b],d=f.length,c=0;c<d;c+=1)e=f[c],m=g[e.en]=g[e.en]||{},m=m[e.ens]=m[e.ens]||[],m.push({ns:e.ans,localname:e.a,keyname:b});return g}(m)};
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
odf.OdfUtils=function(){function k(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===w}function l(a){for(;a&&!k(a);)a=a.parentNode;return a}function h(a){return/^[ \t\r\n]+$/.test(a)}function e(a){var b=a&&a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===w||"span"===b&&"annotationHighlight"===a.className?!0:!1}function b(a){var b=a&&a.localName,c,d=!1;b&&(c=a.namespaceURI,c===w?d="s"===b||"tab"===b||"line-break"===b:c===u&&(d="frame"===b&&"as-char"===a.getAttributeNS(w,
"anchor-type")));return d}function g(a){for(;null!==a.firstChild&&e(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&e(a);)a=a.lastChild;return a}function f(b){for(;!k(b)&&null===b.previousSibling;)b=b.parentNode;return k(b)?null:a(b.previousSibling)}function d(a){for(;!k(a)&&null===a.nextSibling;)a=a.parentNode;return k(a)?null:g(a.nextSibling)}function c(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=f(a);else return!h(a.data.substr(a.length-1,1));else b(a)?
(c=!0,a=null):a=f(a);return c}function t(a){var c=!1;for(a=a&&g(a);a;){if(a.nodeType===Node.TEXT_NODE&&0<a.length&&!h(a.data)){c=!0;break}if(b(a)){c=!0;break}a=d(a)}return c}function m(a,b){return h(a.data.substr(b))?!t(d(a)):!1}function q(a,d){var e=a.data,g;if(!h(e[d])||b(a.parentNode))return!1;0<d?h(e[d-1])||(g=!0):c(f(a))&&(g=!0);return!0===g?m(a,d)?!1:!0:!1}function n(a){return(a=/-?([0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function p(a){return(a=n(a))&&"%"!==a.unit?null:a}function r(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var w=
"urn:oasis:names:tc:opendocument:xmlns:text:1.0",u="urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",y=/^\s*$/,x=new core.DomUtils;this.isParagraph=k;this.getParagraphElement=l;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===w&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===w};this.isODFWhitespace=h;this.isGroupingElement=e;this.isCharacterElement=b;this.firstChild=
g;this.lastChild=a;this.previousNode=f;this.nextNode=d;this.scanLeftForNonWhitespace=c;this.lookLeftForCharacter=function(a){var d;d=0;a.nodeType===Node.TEXT_NODE&&0<a.length?(d=a.data,d=h(d.substr(d.length-1,1))?1===d.length?c(f(a))?2:0:h(d.substr(d.length-2,1))?0:2:1):b(a)&&(d=1);return d};this.lookRightForCharacter=function(a){var c=!1;a&&a.nodeType===Node.TEXT_NODE&&0<a.length?c=!h(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(c){var d=!1;for(c=c&&a(c);c;){if(c.nodeType===
Node.TEXT_NODE&&0<c.length&&!h(c.data)){d=!0;break}if(b(c)){d=!0;break}c=f(c)}return d};this.scanRightForAnyCharacter=t;this.isTrailingWhitespace=m;this.isSignificantWhitespace=q;this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&y.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=n;this.parseFoFontSize=function(a){var b;b=(b=n(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||p(a)};this.parseFoLineHeight=function(a){var b;b=(b=n(a))&&(0>b.value||
"%"===b.unit)?null:b;return b||p(a)};this.getImpactedParagraphs=function(a){var b=a.commonAncestorContainer,c=[];for(b.nodeType===Node.ELEMENT_NODE&&(c=x.getElementsByTagNameNS(b,w,"p").concat(x.getElementsByTagNameNS(b,w,"h")));b&&!k(b);)b=b.parentNode;b&&c.push(b);return c.filter(function(b){return x.rangeIntersectsNode(a,b)})};this.getTextNodes=function(a,b){runtime.assert(Boolean(a.startContainer),"Expected to get a range with a startContainer in getTextNodes().");var c=a.startContainer.ownerDocument.createRange(),
d;d=x.getNodesInRange(a,function(d){c.selectNodeContents(d);if(d.nodeType===Node.TEXT_NODE){if(b&&x.rangesIntersect(a,c)||x.containsRange(a,c))return Boolean(l(d)&&(!h(d.textContent)||q(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(x.rangesIntersect(a,c)&&r(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return d};this.getTextElements=function(a,c){runtime.assert(Boolean(a.startContainer),"Expected to get a range with a startContainer in getTextElements().");
var d=a.startContainer.ownerDocument.createRange(),f;f=x.getNodesInRange(a,function(f){var g=f.nodeType;d.selectNodeContents(f);if(g===Node.TEXT_NODE){if(x.containsRange(a,d)&&(c||Boolean(l(f)&&(!h(f.textContent)||q(f,0)))))return NodeFilter.FILTER_ACCEPT}else if(b(f)){if(x.containsRange(a,d))return NodeFilter.FILTER_ACCEPT}else if(r(f)||e(f))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});d.detach();return f};this.getParagraphElements=function(a){runtime.assert(Boolean(a.startContainer),
"Expected to get a range with a startContainer in getParagraphElements().");var b=a.startContainer.ownerDocument.createRange(),c;c=x.getNodesInRange(a,function(c){b.selectNodeContents(c);if(k(c)){if(x.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(r(c)||e(c))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});b.detach();return c}};
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
odf.TextSerializer=function(){function k(e){var b="",g=l.filter?l.filter.acceptNode(e):NodeFilter.FILTER_ACCEPT,a=e.nodeType,f;if(g===NodeFilter.FILTER_ACCEPT||g===NodeFilter.FILTER_SKIP)for(f=e.firstChild;f;)b+=k(f),f=f.nextSibling;g===NodeFilter.FILTER_ACCEPT&&(a===Node.ELEMENT_NODE&&h.isParagraph(e)?b+="\n":a===Node.TEXT_NODE&&e.textContent&&(b+=e.textContent));return b}var l=this,h=new odf.OdfUtils;this.filter=null;this.writeToString=function(e){return e?k(e):""}};
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
odf.TextStyleApplicator=function(k,l,h){function e(a){function b(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(d){return b(a[d],c[d])}):a===c}this.isStyleApplied=function(d){d=l.getAppliedStylesForElement(d);return b(a,d)}}function b(b){var e={};this.applyStyleToContainer=function(g){var q;q=g.getAttributeNS(a,"style-name");var n=g.ownerDocument;q=q||"";if(!e.hasOwnProperty(q)){var p=q,r=q,w;r?(w=l.getStyleElement(r,"text"),w.parentNode===h?n=w.cloneNode(!0):(n=
n.createElementNS(f,"style:style"),n.setAttributeNS(f,"style:parent-style-name",r),n.setAttributeNS(f,"style:family","text"),n.setAttributeNS(d,"scope","document-content"))):(n=n.createElementNS(f,"style:style"),n.setAttributeNS(f,"style:family","text"),n.setAttributeNS(d,"scope","document-content"));l.updateStyle(n,b,k);h.appendChild(n);e[p]=n}q=e[q].getAttributeNS(f,"name");g.setAttributeNS(a,"text:style-name",q)}}var g=new core.DomUtils,a=odf.Namespaces.textns,f=odf.Namespaces.stylens,d="urn:webodf:names:scope";
this.applyStyle=function(c,d,f){var h={},n,k,l,w;runtime.assert(f&&f["style:text-properties"],"applyStyle without any text properties");h["style:text-properties"]=f["style:text-properties"];l=new b(h);w=new e(h);c.forEach(function(b){n=w.isStyleApplied(b);if(!1===n){var c=b.ownerDocument,f=b.parentNode,e,h=b,m=new core.LoopWatchDog(1E3);"span"===f.localName&&f.namespaceURI===a?(b.previousSibling&&!g.rangeContainsNode(d,b.previousSibling)?(c=f.cloneNode(!1),f.parentNode.insertBefore(c,f.nextSibling)):
c=f,e=!0):(c=c.createElementNS(a,"text:span"),f.insertBefore(c,b),e=!1);for(;h&&(h===b||g.rangeContainsNode(d,h));)m.check(),f=h.nextSibling,h.parentNode!==c&&c.appendChild(h),h=f;if(h&&e)for(b=c.cloneNode(!1),c.parentNode.insertBefore(b,c.nextSibling);h;)m.check(),f=h.nextSibling,b.appendChild(h),h=f;k=c;l.applyStyleToContainer(k)}})}};
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
odf.Style2CSS=function(){function k(a){var b={},c,d;if(!a)return b;for(a=a.firstChild;a;){if(d=a.namespaceURI!==p||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===u&&"list-style"===a.localName?"list":a.namespaceURI!==p||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(p,"family"))(c=a.getAttributeNS&&a.getAttributeNS(p,"name"))||(c=""),d=b[d]=b[d]||{},d[c]=a;a=a.nextSibling}return b}function l(a,b){if(!b||!a)return null;if(a[b])return a[b];
var c,d;for(c in a)if(a.hasOwnProperty(c)&&(d=l(a[c].derivedStyles,b)))return d;return null}function h(a,b,c){var d=b[a],f,e;d&&(f=d.getAttributeNS(p,"parent-style-name"),e=null,f&&(e=l(c,f),!e&&b[f]&&(h(f,b,c),e=b[f],b[f]=null)),e?(e.derivedStyles||(e.derivedStyles={}),e.derivedStyles[a]=d):c[a]=d)}function e(a,b){for(var c in a)a.hasOwnProperty(c)&&(h(c,a,b),a[c]=null)}function b(a,b){var c=s[a],d;if(null===c)return null;d=b?"["+c+'|style-name="'+b+'"]':"["+c+"|style-name]";"presentation"===c&&
(c="draw",d=b?'[presentation|style-name="'+b+'"]':"[presentation|style-name]");return c+"|"+v[a].join(d+","+c+"|")+d}function g(a,c,d){var f=[],e,h;f.push(b(a,c));for(e in d.derivedStyles)if(d.derivedStyles.hasOwnProperty(e))for(h in c=g(a,e,d.derivedStyles[e]),c)c.hasOwnProperty(h)&&f.push(c[h]);return f}function a(a,b,c){if(!a)return null;for(a=a.firstChild;a;){if(a.namespaceURI===b&&a.localName===c)return b=a;a=a.nextSibling}return null}function f(a,b){var c="",d,f;for(d in b)if(b.hasOwnProperty(d)&&
(d=b[d],f=a.getAttributeNS(d[0],d[1]))){f=f.trim();if(V.hasOwnProperty(d[1])){var e=f.indexOf(" "),g=void 0,h=void 0;-1!==e?(g=f.substring(0,e),h=f.substring(e)):(g=f,h="");(g=aa.parseLength(g))&&("pt"===g.unit&&0.75>g.value)&&(f="0.75pt"+h)}d[2]&&(c+=d[2]+":"+f+";")}return c}function d(b){return(b=a(b,p,"text-properties"))?aa.parseFoFontSize(b.getAttributeNS(n,"font-size")):null}function c(a){a=a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,function(a,b,c,d){return b+b+c+c+d+d});return(a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a))?
{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:null}function t(a,b,c,d){b='text|list[text|style-name="'+b+'"]';var f=c.getAttributeNS(u,"level"),e;c=aa.getFirstNonWhitespaceChild(c);c=aa.getFirstNonWhitespaceChild(c);var g;c&&(e=c.attributes,g=e["fo:text-indent"]?e["fo:text-indent"].value:void 0,e=e["fo:margin-left"]?e["fo:margin-left"].value:void 0);g||(g="-0.6cm");c="-"===g.charAt(0)?g.substring(1):"-"+g;for(f=f&&parseInt(f,10);1<f;)b+=" > text|list-item > text|list",f-=1;f=b+" > text|list-item > *:not(text|list):first-child";
void 0!==e&&(e=f+"{margin-left:"+e+";}",a.insertRule(e,a.cssRules.length));d=b+" > text|list-item > *:not(text|list):first-child:before{"+d+";";d+="counter-increment:list;";d+="margin-left:"+g+";";d+="width:"+c+";";d+="display:inline-block}";try{a.insertRule(d,a.cssRules.length)}catch(h){throw h;}}function m(b,e,h,k){if("list"===e)for(var l=k.firstChild,r,s;l;){if(l.namespaceURI===u)if(r=l,"list-level-style-number"===l.localName){var v=r;s=v.getAttributeNS(p,"num-format");var M=v.getAttributeNS(p,
"num-suffix"),G={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},v=v.getAttributeNS(p,"num-prefix")||"",v=G.hasOwnProperty(s)?v+(" counter(list, "+G[s]+")"):s?v+("'"+s+"';"):v+" ''";M&&(v+=" '"+M+"'");s="content: "+v+";";t(b,h,r,s)}else"list-level-style-image"===l.localName?(s="content: none;",t(b,h,r,s)):"list-level-style-bullet"===l.localName&&(s="content: '"+r.getAttributeNS(u,"bullet-char")+"';",t(b,h,r,s));l=l.nextSibling}else if("page"===e)if(M=r=h="",l=k.getElementsByTagNameNS(p,
"page-layout-properties")[0],r=l.parentNode.parentNode.parentNode.masterStyles,M="",h+=f(l,X),s=l.getElementsByTagNameNS(p,"background-image"),0<s.length&&(M=s.item(0).getAttributeNS(y,"href"))&&(h+="background-image: url('odfkit:"+M+"');",s=s.item(0),h+=f(s,F)),"presentation"===ca){if(r)for(s=r.getElementsByTagNameNS(p,"master-page"),G=0;G<s.length;G+=1)if(s[G].getAttributeNS(p,"page-layout-name")===l.parentNode.getAttributeNS(p,"name")){M=s[G].getAttributeNS(p,"name");r="draw|page[draw|master-page-name="+
M+"] {"+h+"}";M="office|body, draw|page[draw|master-page-name="+M+"] {"+f(l,da)+" }";try{b.insertRule(r,b.cssRules.length),b.insertRule(M,b.cssRules.length)}catch(V){throw V;}}}else{if("text"===ca){r="office|text {"+h+"}";M="office|body {width: "+l.getAttributeNS(n,"page-width")+";}";try{b.insertRule(r,b.cssRules.length),b.insertRule(M,b.cssRules.length)}catch(ia){throw ia;}}}else{h=g(e,h,k).join(",");l="";if(r=a(k,p,"text-properties")){var G=r,H;s=H="";M=1;r=""+f(G,A);v=G.getAttributeNS(p,"text-underline-style");
"solid"===v&&(H+=" underline");v=G.getAttributeNS(p,"text-line-through-style");"solid"===v&&(H+=" line-through");H.length&&(r+="text-decoration:"+H+";");if(H=G.getAttributeNS(p,"font-name")||G.getAttributeNS(n,"font-family"))v=qa[H],r+="font-family: "+(v||H)+", sans-serif;";v=G.parentNode;if(G=d(v)){for(;v;){if(G=d(v)){if("%"!==G.unit){s="font-size: "+G.value*M+G.unit+";";break}M*=G.value/100}G=v;H=v="";v=null;"default-style"===G.localName?v=null:(v=G.getAttributeNS(p,"parent-style-name"),H=G.getAttributeNS(p,
"family"),v=T.getODFElementsWithXPath(Q,v?"//style:*[@style:name='"+v+"'][@style:family='"+H+"']":"//style:default-style[@style:family='"+H+"']",odf.Namespaces.resolvePrefix)[0])}s||(s="font-size: "+parseFloat(Y)*M+N.getUnits(Y)+";");r+=s}l+=r}if(r=a(k,p,"paragraph-properties"))s=r,r=""+f(s,D),M=s.getElementsByTagNameNS(p,"background-image"),0<M.length&&(G=M.item(0).getAttributeNS(y,"href"))&&(r+="background-image: url('odfkit:"+G+"');",M=M.item(0),r+=f(M,F)),(s=s.getAttributeNS(n,"line-height"))&&
"normal"!==s&&(s=aa.parseFoLineHeight(s),r="%"!==s.unit?r+("line-height: "+s.value+s.unit+";"):r+("line-height: "+s.value/100+";")),l+=r;if(r=a(k,p,"graphic-properties"))G=r,r=""+f(G,O),s=G.getAttributeNS(q,"opacity"),M=G.getAttributeNS(q,"fill"),G=G.getAttributeNS(q,"fill-color"),"solid"===M||"hatch"===M?G&&"none"!==G?(s=isNaN(parseFloat(s))?1:parseFloat(s)/100,(G=c(G))&&(r+="background-color: rgba("+G.r+","+G.g+","+G.b+","+s+");")):r+="background: none;":"none"===M&&(r+="background: none;"),l+=
r;if(r=a(k,p,"drawing-page-properties"))s=""+f(r,O),"true"===r.getAttributeNS(x,"background-visible")&&(s+="background: none;"),l+=s;if(r=a(k,p,"table-cell-properties"))r=""+f(r,B),l+=r;if(r=a(k,p,"table-row-properties"))r=""+f(r,z),l+=r;if(r=a(k,p,"table-column-properties"))r=""+f(r,P),l+=r;if(r=a(k,p,"table-properties"))s=r,r=""+f(s,J),s=s.getAttributeNS(w,"border-model"),"collapsing"===s?r+="border-collapse:collapse;":"separating"===s&&(r+="border-collapse:separate;"),l+=r;if(0!==l.length)try{b.insertRule(h+
"{"+l+"}",b.cssRules.length)}catch(ga){throw ga;}}for(var Z in k.derivedStyles)k.derivedStyles.hasOwnProperty(Z)&&m(b,e,Z,k.derivedStyles[Z])}var q=odf.Namespaces.drawns,n=odf.Namespaces.fons,p=odf.Namespaces.stylens,r=odf.Namespaces.svgns,w=odf.Namespaces.tablens,u=odf.Namespaces.textns,y=odf.Namespaces.xlinkns,x=odf.Namespaces.presentationns,s={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table",
"table-row":"table",text:"text",list:"text",page:"office"},v={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),
"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),list:["list-item"]},A=[[n,"color","color"],[n,"background-color","background-color"],[n,"font-weight","font-weight"],[n,"font-style","font-style"]],F=[[p,"repeat",
"background-repeat"]],D=[[n,"background-color","background-color"],[n,"text-align","text-align"],[n,"text-indent","text-indent"],[n,"padding","padding"],[n,"padding-left","padding-left"],[n,"padding-right","padding-right"],[n,"padding-top","padding-top"],[n,"padding-bottom","padding-bottom"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"margin","margin"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],
[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"],[n,"border","border"]],O=[[n,"background-color","background-color"],[n,"min-height","min-height"],[q,"stroke","border"],[r,"stroke-color","border-color"],[r,"stroke-width","border-width"]],B=[[n,"background-color","background-color"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top","border-top"],[n,"border-bottom","border-bottom"],[n,"border","border"]],P=[[p,"column-width","width"]],z=[[p,"row-height",
"height"],[n,"keep-together",null]],J=[[p,"width","width"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"]],X=[[n,"background-color","background-color"],[n,"padding","padding"],[n,"padding-left","padding-left"],[n,"padding-right","padding-right"],[n,"padding-top","padding-top"],[n,"padding-bottom","padding-bottom"],[n,"border","border"],[n,"border-left","border-left"],[n,"border-right","border-right"],[n,"border-top",
"border-top"],[n,"border-bottom","border-bottom"],[n,"margin","margin"],[n,"margin-left","margin-left"],[n,"margin-right","margin-right"],[n,"margin-top","margin-top"],[n,"margin-bottom","margin-bottom"]],da=[[n,"page-width","width"],[n,"page-height","height"]],V={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,"stroke-width":!0},qa={},aa=new odf.OdfUtils,ca,Q,Y,T=new xmldom.XPath,N=new core.CSSUnits;this.style2css=function(a,b,c,d,f){for(var g,h,n,l;b.cssRules.length;)b.deleteRule(b.cssRules.length-
1);g=null;d&&(g=d.ownerDocument,Q=d.parentNode);f&&(g=f.ownerDocument,Q=f.parentNode);if(g)for(l in odf.Namespaces.forEachPrefix(function(a,c){n="@namespace "+a+" url("+c+");";try{b.insertRule(n,b.cssRules.length)}catch(d){}}),qa=c,ca=a,Y=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=k(d),d=k(f),f={},s)if(s.hasOwnProperty(l))for(h in c=f[l]={},e(a[l],c),e(d[l],c),c)c.hasOwnProperty(h)&&m(b,l,h,c[h])}};
// Input 33
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
odf.OdfContainer=function(){function k(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function l(a){var b,c=m.length;for(b=0;b<c;b+=1)if(a.namespaceURI===d&&a.localName===m[b])return b;return-1}function h(a,b){var c=new f.UsedStyleList(a,b),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var f=d.acceptNode(a);f===NodeFilter.FILTER_ACCEPT&&(a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE)&&(f=c.uses(a)?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT);return f}}function e(a,b){var c=new h(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||(!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName)||(b=NodeFilter.FILTER_REJECT);return b}}function b(a,b){if(b){var c=l(b),d,f=a.firstChild;if(-1!==c){for(;f;){d=l(f);if(-1!==d&&d>c)break;f=f.nextSibling}a.insertBefore(b,f)}}}function g(a){this.OdfContainer=a}function a(a,
b,c,d){var f=this;this.size=0;this.type=null;this.name=a;this.container=c;this.onchange=this.onreadystatechange=this.document=this.mimetype=this.url=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);f.url=b;if(f.onchange)f.onchange(f);if(f.onstatereadychange)f.onstatereadychange(f)}))}}var f=new odf.StyleInfo,d="urn:oasis:names:tc:opendocument:xmlns:office:1.0",c="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
t="urn:webodf:names:scope",m="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),q=(new Date).getTime()+"_webodf_",n=new core.Base64;g.prototype=new function(){};g.prototype.constructor=g;g.namespaceURI=d;g.localName="document";a.prototype.load=function(){};a.prototype.getUrl=function(){return this.data?"data:;base64,"+n.toBase64(this.data):null};odf.OdfContainer=function r(m,n){function l(a){for(var b=a.firstChild,c;b;)c=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?
l(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&a.removeChild(b),b=c}function x(a,b){for(var c=a&&a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.setAttributeNS(t,"scope",b),c=c.nextSibling}function s(a,b){var c=null,d,f,e;if(a)for(c=a.cloneNode(!0),d=c.firstChild;d;)f=d.nextSibling,d.nodeType===Node.ELEMENT_NODE&&(e=d.getAttributeNS(t,"scope"))&&e!==b&&c.removeChild(d),d=f;return c}function v(a){var b=K.rootElement.ownerDocument,c;if(a){l(a.documentElement);try{c=b.importNode(a.documentElement,
!0)}catch(d){}}return c}function A(a){K.state=a;if(K.onchange)K.onchange(K);if(K.onstatereadychange)K.onstatereadychange(K)}function F(a){S=null;K.rootElement=a;a.fontFaceDecls=k(a,d,"font-face-decls");a.styles=k(a,d,"styles");a.automaticStyles=k(a,d,"automatic-styles");a.masterStyles=k(a,d,"master-styles");a.body=k(a,d,"body");a.meta=k(a,d,"meta")}function D(a){a=v(a);var c=K.rootElement;a&&"document-styles"===a.localName&&a.namespaceURI===d?(c.fontFaceDecls=k(a,d,"font-face-decls"),b(c,c.fontFaceDecls),
c.styles=k(a,d,"styles"),b(c,c.styles),c.automaticStyles=k(a,d,"automatic-styles"),x(c.automaticStyles,"document-styles"),b(c,c.automaticStyles),c.masterStyles=k(a,d,"master-styles"),b(c,c.masterStyles),f.prefixStyleNames(c.automaticStyles,q,c.masterStyles)):A(r.INVALID)}function O(a){a=v(a);var c,f,e;if(a&&"document-content"===a.localName&&a.namespaceURI===d){c=K.rootElement;f=k(a,d,"font-face-decls");if(c.fontFaceDecls&&f)for(e=f.firstChild;e;)c.fontFaceDecls.appendChild(e),e=f.firstChild;else f&&
(c.fontFaceDecls=f,b(c,f));f=k(a,d,"automatic-styles");x(f,"document-content");if(c.automaticStyles&&f)for(e=f.firstChild;e;)c.automaticStyles.appendChild(e),e=f.firstChild;else f&&(c.automaticStyles=f,b(c,f));c.body=k(a,d,"body");b(c,c.body)}else A(r.INVALID)}function B(a){a=v(a);var c;a&&("document-meta"===a.localName&&a.namespaceURI===d)&&(c=K.rootElement,c.meta=k(a,d,"meta"),b(c,c.meta))}function P(a){a=v(a);var c;a&&("document-settings"===a.localName&&a.namespaceURI===d)&&(c=K.rootElement,c.settings=
k(a,d,"settings"),b(c,c.settings))}function z(a){a=v(a);var b;if(a&&"manifest"===a.localName&&a.namespaceURI===c)for(b=K.rootElement,b.manifest=a,a=b.manifest.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&("file-entry"===a.localName&&a.namespaceURI===c)&&(L[a.getAttributeNS(c,"full-path")]=a.getAttributeNS(c,"media-type")),a=a.nextSibling}function J(a){var b=a.shift(),c,d;b?(c=b[0],d=b[1],R.loadAsDOM(c,function(b,c){d(c);b||K.state===r.INVALID||J(a)})):A(r.DONE)}function X(a){var b="";odf.Namespaces.forEachPrefix(function(a,
c){b+=" xmlns:"+a+'="'+c+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+a+" "+b+' office:version="1.2">'}function da(){var a=new xmldom.LSSerializer,b=X("document-meta");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(K.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function V(a,b){var d=document.createElementNS(c,"manifest:file-entry");d.setAttributeNS(c,"manifest:full-path",a);d.setAttributeNS(c,"manifest:media-type",b);return d}function qa(){var a=
runtime.parseXML('<manifest:manifest xmlns:manifest="'+c+'"></manifest:manifest>'),b=k(a,c,"manifest"),d=new xmldom.LSSerializer,f;for(f in L)L.hasOwnProperty(f)&&b.appendChild(V(f,L[f]));d.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+d.writeToString(a,odf.Namespaces.namespaceMap)}function aa(){var a=new xmldom.LSSerializer,b=X("document-settings");a.filter=new odf.OdfNodeFilter;b+=a.writeToString(K.rootElement.settings,odf.Namespaces.namespaceMap);
return b+"</office:document-settings>"}function ca(){var a=odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=s(K.rootElement.automaticStyles,"document-styles"),d=K.rootElement.masterStyles&&K.rootElement.masterStyles.cloneNode(!0),e=X("document-styles");f.removePrefixFromStyleNames(c,q,d);b.filter=new h(d,c);e+=b.writeToString(K.rootElement.fontFaceDecls,a);e+=b.writeToString(K.rootElement.styles,a);e+=b.writeToString(c,a);e+=b.writeToString(d,a);return e+"</office:document-styles>"}function Q(){var a=
odf.Namespaces.namespaceMap,b=new xmldom.LSSerializer,c=s(K.rootElement.automaticStyles,"document-content"),d=X("document-content");b.filter=new e(K.rootElement.body,c);d+=b.writeToString(c,a);d+=b.writeToString(K.rootElement.body,a);return d+"</office:document-content>"}function Y(a,b){runtime.loadXML(a,function(a,c){if(a)b(a);else{var f=v(c);f&&"document"===f.localName&&f.namespaceURI===d?(F(f),A(r.DONE)):A(r.INVALID)}})}function T(){function a(b,c){var e;c||(c=b);e=document.createElementNS(d,c);
f[b]=e;f.appendChild(e)}var b=new core.Zip("",null),c=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),f=K.rootElement,e=document.createElementNS(d,"text");b.save("mimetype",c,!1,new Date);a("meta");a("settings");a("scripts");a("fontFaceDecls","font-face-decls");a("styles");a("automaticStyles","automatic-styles");a("masterStyles","master-styles");a("body");f.body.appendChild(e);A(r.DONE);return b}function N(){var a,b=new Date;a=runtime.byteArrayFromString(aa(),"utf8");
R.save("settings.xml",a,!0,b);a=runtime.byteArrayFromString(da(),"utf8");R.save("meta.xml",a,!0,b);a=runtime.byteArrayFromString(ca(),"utf8");R.save("styles.xml",a,!0,b);a=runtime.byteArrayFromString(Q(),"utf8");R.save("content.xml",a,!0,b);a=runtime.byteArrayFromString(qa(),"utf8");R.save("META-INF/manifest.xml",a,!0,b)}function E(a,b){N();R.writeAs(a,function(a){b(a)})}var K=this,R,L={},S;this.onstatereadychange=n;this.rootElement=this.state=this.onchange=null;this.setRootElement=F;this.getContentElement=
function(){var a;S||(a=K.rootElement.body,S=a.getElementsByTagNameNS(d,"text")[0]||a.getElementsByTagNameNS(d,"presentation")[0]||a.getElementsByTagNameNS(d,"spreadsheet")[0]);return S};this.getDocumentType=function(){var a=K.getContentElement();return a&&a.localName};this.getPart=function(b){return new a(b,L[b],K,R)};this.getPartData=function(a,b){R.load(a,b)};this.createByteArray=function(a,b){N();R.createByteArray(a,b)};this.saveAs=E;this.save=function(a){E(m,a)};this.getUrl=function(){return m};
this.state=r.LOADING;this.rootElement=function(a){var b=document.createElementNS(a.namespaceURI,a.localName),c;a=new a;for(c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}(g);R=m?new core.Zip(m,function(a,b){R=b;a?Y(m,function(b){a&&(R.error=a+"\n"+b,A(r.INVALID))}):J([["styles.xml",D],["content.xml",O],["meta.xml",B],["settings.xml",P],["META-INF/manifest.xml",z]])}):T()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=
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
odf.FontLoader=function(){function k(e,b,g,a,f){var d,c=0,l;for(l in e)if(e.hasOwnProperty(l)){if(c===g){d=l;break}c+=1}d?b.getPartData(e[d].href,function(c,l){if(c)runtime.log(c);else{var n="@font-face { font-family: '"+(e[d].family||d)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+h.convertUTF8ArrayToBase64(l)+') format("truetype"); }';try{a.insertRule(n,a.cssRules.length)}catch(p){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(p)+"\nRule: "+n)}}k(e,b,g+1,a,f)}):
f&&f()}var l=new xmldom.XPath,h=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(e,b){for(var g=e.rootElement.fontFaceDecls;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);if(g){var a={},f,d,c,h;if(g)for(g=l.getODFElementsWithXPath(g,"style:font-face[svg:font-face-src]",odf.Namespaces.resolvePrefix),f=0;f<g.length;f+=1)d=g[f],c=d.getAttributeNS(odf.Namespaces.stylens,"name"),h=d.getAttributeNS(odf.Namespaces.svgns,"font-family"),d=l.getODFElementsWithXPath(d,"svg:font-face-src/svg:font-face-uri",
odf.Namespaces.resolvePrefix),0<d.length&&(d=d[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),a[c]={href:d,family:h});k(a,e,0,b)}}};return odf.FontLoader}();
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
odf.Formatting=function(){function k(a,b){Object.keys(b).forEach(function(c){try{a[c]=b[c].constructor===Object?k(a[c],b[c]):b[c]}catch(d){a[c]=b[c]}});return a}function l(a,b,d){var f,e;d=d||[c.rootElement.automaticStyles,c.rootElement.styles];for(f=d.shift();f;){for(f=f.firstChild;f;){if(f.nodeType===Node.ELEMENT_NODE&&(e=f.getAttributeNS(q,"name"),f.namespaceURI===q&&"style"===f.localName&&f.getAttributeNS(q,"family")===b&&e===a||"list-style"===b&&f.namespaceURI===n&&"list-style"===f.localName&&
e===a||"data"===b&&f.namespaceURI===p&&e===a))return f;f=f.nextSibling}f=d.shift()}return null}function h(a){for(var b={},c=a.firstChild;c;){if(c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===q)for(b[c.nodeName]={},a=0;a<c.attributes.length;a+=1)b[c.nodeName][c.attributes[a].name]=c.attributes[a].value;c=c.nextSibling}return b}function e(a,b){Object.keys(b).forEach(function(c){var d=c.split(":"),f=d[1],g=odf.Namespaces.resolvePrefix(d[0]),d=b[c];"object"===typeof d&&Object.keys(d).length?(c=a.getElementsByTagNameNS(g,
f)[0]||a.ownerDocument.createElementNS(g,c),a.appendChild(c),e(c,d)):a.setAttributeNS(g,c,d)})}function b(a){var b=c.rootElement.styles,d;d={};for(var f={},e=a;e;)d=h(e),f=k(d,f),e=(d=e.getAttributeNS(q,"parent-style-name"))?l(d,a.getAttributeNS(q,"family"),[b]):null;a:{a=a.getAttributeNS(q,"family");for(b=c.rootElement.styles.firstChild;b;){if(b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===q&&"default-style"===b.localName&&b.getAttributeNS(q,"family")===a){e=b;break a}b=b.nextSibling}e=null}e&&
(d=h(e),f=k(d,f));return f}function g(a,b){for(var c=a.nodeType===Node.TEXT_NODE?a.parentNode:a,d,f=[],e="",g=!1;c;)!g&&r.isGroupingElement(c)&&(g=!0),(d=t.determineStylesForNode(c))&&f.push(d),c=c.parentNode;g&&(f.forEach(function(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){e+="|"+b+":"+a+"|"})})}),b&&(b[e]=f));return g?f:void 0}function a(a){var c={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(d){var f=Object.keys(a[d])[0],e,g;(e=l(f,d))?
(g=b(e),c=k(g,c),g=e.getAttributeNS(q,"display-name")):runtime.log("No style element found for '"+f+"' of family '"+d+"'");c.orderedStyles.push({name:f,family:d,displayName:g})})});return c}function f(){var a,b=[];[c.rootElement.automaticStyles,c.rootElement.styles].forEach(function(c){for(a=c.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(a.namespaceURI===q&&"style"===a.localName||a.namespaceURI===n&&"list-style"===a.localName)&&b.push(a.getAttributeNS(q,"name")),a=a.nextSibling});return b}var d=
this,c,t=new odf.StyleInfo,m=odf.Namespaces.svgns,q=odf.Namespaces.stylens,n=odf.Namespaces.textns,p=odf.Namespaces.numberns,r=new odf.OdfUtils,w=new core.Utils;this.setOdfContainer=function(a){c=a};this.getFontMap=function(){for(var a=c.rootElement.fontFaceDecls,b={},d,f,a=a&&a.firstChild;a;)a.nodeType===Node.ELEMENT_NODE&&(d=a.getAttributeNS(q,"name"))&&((f=a.getAttributeNS(m,"font-family"))||a.getElementsByTagNameNS(m,"font-face-uri")[0])&&(b[d]=f),a=a.nextSibling;return b};this.getAvailableParagraphStyles=
function(){for(var a=c.rootElement.styles&&c.rootElement.styles.firstChild,b,d,f=[];a;)a.nodeType===Node.ELEMENT_NODE&&("style"===a.localName&&a.namespaceURI===q)&&(d=a,b=d.getAttributeNS(q,"family"),"paragraph"===b&&(b=d.getAttributeNS(q,"name"),d=d.getAttributeNS(q,"display-name")||b,b&&d&&f.push({name:b,displayName:d}))),a=a.nextSibling;return f};this.isStyleUsed=function(a){var b;b=t.hasDerivedStyles(c.rootElement,odf.Namespaces.resolvePrefix,a);a=(new t.UsedStyleList(c.rootElement.styles)).uses(a)||
(new t.UsedStyleList(c.rootElement.automaticStyles)).uses(a)||(new t.UsedStyleList(c.rootElement.body)).uses(a);return b||a};this.getStyleElement=l;this.getStyleAttributes=h;this.getInheritedStyleAttributes=b;this.getFirstNamedParentStyleNameOrSelf=function(a){var b=c.rootElement.automaticStyles,d=c.rootElement.styles,f;for(f=l(a,"paragraph",[b]);f;)a=f.getAttributeNS(q,"parent-style-name"),f=l(a,"paragraph",[b]);return(f=l(a,"paragraph",[d]))?a:null};this.hasParagraphStyle=function(a){return Boolean(l(a,
"paragraph"))};this.getAppliedStyles=function(b){var c={},d=[];b.forEach(function(a){g(a,c)});Object.keys(c).forEach(function(b){d.push(a(c[b]))});return d};this.getAppliedStylesForElement=function(b){return(b=g(b))?a(b):void 0};this.applyStyle=function(a,b,f,e){(new odf.TextStyleApplicator("auto"+w.hashString(a)+"_",d,c.rootElement.automaticStyles)).applyStyle(b,f,e)};this.updateStyle=function(a,b,c){var d,g;e(a,b);if(c){a.getAttributeNS(q,"name");d=f();g=0;do b=c+g,g+=1;while(-1!==d.indexOf(b));
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
odf.OdfCanvas=function(){function k(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(f){runtime.log(f)}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function l(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a}function h(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function e(a){function b(a,c){for(;c;){if(c===a)return!0;c=c.parentNode}return!1}
function c(){var e=[],g=runtime.getWindow().getSelection(),h,m;for(h=0;h<g.rangeCount;h+=1)m=g.getRangeAt(h),null!==m&&(b(a,m.startContainer)&&b(a,m.endContainer))&&e.push(m);if(e.length===d.length){for(g=0;g<e.length&&(h=e[g],m=d[g],h=h===m?!1:null===h||null===m?!0:h.startContainer!==m.startContainer||h.startOffset!==m.startOffset||h.endContainer!==m.endContainer||h.endOffset!==m.endOffset,!h);g+=1);if(g===e.length)return}d=e;var g=[e.length],n,l=a.ownerDocument;for(h=0;h<e.length;h+=1)m=e[h],n=
l.createRange(),n.setStart(m.startContainer,m.startOffset),n.setEnd(m.endContainer,m.endOffset),g[h]=n;d=g;g=f.length;for(e=0;e<g;e+=1)f[e](a,d)}var d=[],f=[];this.addListener=function(a,b){var c,d=f.length;for(c=0;c<d;c+=1)if(f[c]===b)return;f.push(b)};h(a,"mouseup",c);h(a,"keyup",c);h(a,"keydown",c)}function b(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function g(a,b,c,d){c.setAttribute("styleid",b);var f,e=
c.getAttributeNS(v,"anchor-type"),h=c.getAttributeNS(x,"x"),m=c.getAttributeNS(x,"y"),n=c.getAttributeNS(x,"width"),l=c.getAttributeNS(x,"height"),k=c.getAttributeNS(w,"min-height"),p=c.getAttributeNS(w,"min-width"),q=c.getAttributeNS(r,"master-page-name"),s=null,t,u;t=0;var A,F=a.rootElement.ownerDocument;if(q){s=a.rootElement.masterStyles.getElementsByTagNameNS(y,"master-page");t=null;for(u=0;u<s.length;u+=1)if(s[u].getAttributeNS(y,"name")===q){t=s[u];break}s=t}else s=null;if(s){q=F.createElementNS(r,
"draw:page");A=s.firstElementChild;for(t=0;A;)"true"!==A.getAttributeNS(D,"placeholder")&&(u=A.cloneNode(!0),q.appendChild(u),g(a,b+"_"+t,u,d)),A=A.nextElementSibling,t+=1;J.appendChild(q);t=J.getElementsByTagNameNS(r,"page").length;if(u=q.getElementsByTagNameNS(v,"page-number")[0]){for(;u.firstChild;)u.removeChild(u.firstChild);u.appendChild(F.createTextNode(t))}g(a,b,q,d);q.setAttributeNS(r,"draw:master-page-name",s.getAttributeNS(y,"name"))}if("as-char"===e)f="display: inline-block;";else if(e||
h||m)f="position: absolute;";else if(n||l||k||p)f="display: block;";h&&(f+="left: "+h+";");m&&(f+="top: "+m+";");n&&(f+="width: "+n+";");l&&(f+="height: "+l+";");k&&(f+="min-height: "+k+";");p&&(f+="min-width: "+p+";");f&&(f="draw|"+c.localName+'[styleid="'+b+'"] {'+f+"}",d.insertRule(f,d.cssRules.length))}function a(a){for(a=a.firstChild;a;){if(a.namespaceURI===u&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function f(b,
c,d,f){function e(a){a&&(a='draw|image[styleid="'+b+'"] {'+("background-image: url("+a+");")+"}",f.insertRule(a,f.cssRules.length))}d.setAttribute("styleid",b);var g=d.getAttributeNS(A,"href"),h;if(g)try{h=c.getPart(g),h.onchange=function(a){e(a.url)},h.load()}catch(m){runtime.log("slight problem: "+m)}else g=a(d),e(g)}function d(a){function b(a){return d===a.getAttributeNS(u,"name")}var c=z.getElementsByTagNameNS(a,u,"annotation");a=z.getElementsByTagNameNS(a,u,"annotation-end");var d,f;for(f=0;f<
c.length;f+=1)d=c[f].getAttributeNS(u,"name"),V.addAnnotation({node:c[f],end:a.filter(b)[0]||null});V.rerenderAnnotations()}function c(a){function b(c){var d,f;c.hasAttributeNS(A,"href")&&(d=c.getAttributeNS(A,"href"),"#"===d[0]?(d=d.substring(1),f=function(){var b=B.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.resolvePrefix);0===b.length&&(b=B.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.resolvePrefix));0<b.length&&b[0].scrollIntoView(!0);
return!1}):f=function(){O.open(d)},c.onclick=f)}var c,d,f;d=a.getElementsByTagNameNS(v,"a");for(c=0;c<d.length;c+=1)f=d.item(c),b(f)}function t(a){var b=a.ownerDocument;z.getElementsByTagNameNS(a,v,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));d=parseInt(a.getAttributeNS(v,"c"),10);if(1<d)for(a.removeAttributeNS(v,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function m(a){z.getElementsByTagNameNS(a,v,"tab").forEach(function(a){a.textContent=
"\t"})}function q(b,c){function d(a,b){var g=h.documentElement.namespaceURI;"video/"===b.substr(0,6)?(f=h.createElementNS(g,"video"),f.setAttribute("controls","controls"),e=h.createElementNS(g,"source"),e.setAttribute("src",a),e.setAttribute("type",b),f.appendChild(e),c.parentNode.appendChild(f)):c.innerHtml="Unrecognised Plugin"}var f,e,g,h=c.ownerDocument,m;if(g=c.getAttributeNS(A,"href"))try{m=b.getPart(g),m.onchange=function(a){d(a.url,a.mimetype)},m.load()}catch(n){runtime.log("slight problem: "+
n)}else runtime.log("using MP4 data fallback"),g=a(c),d(g,"video/mp4")}function n(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));
c.setAttribute("type","text/css");b.appendChild(c);return c}function p(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+a+" url("+b+");\n"});c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var r=odf.Namespaces.drawns,w=odf.Namespaces.fons,u=odf.Namespaces.officens,y=odf.Namespaces.stylens,
x=odf.Namespaces.svgns,s=odf.Namespaces.tablens,v=odf.Namespaces.textns,A=odf.Namespaces.xlinkns,F=odf.Namespaces.xmlns,D=odf.Namespaces.presentationns,O=runtime.getWindow(),B=new xmldom.XPath,P=new odf.OdfUtils,z=new core.DomUtils,J,X,da=!1,V;odf.OdfCanvas=function(a){function u(a,b,c){function d(a,b,c,e){ja.addToQueue(function(){f(a,b,c,e)})}var e,g;e=b.getElementsByTagNameNS(r,"image");for(b=0;b<e.length;b+=1)g=e.item(b),d("image"+String(b),a,g,c)}function w(a,b){function c(a,b){ja.addToQueue(function(){q(a,
b)})}var d,f,e;f=b.getElementsByTagNameNS(r,"plugin");for(d=0;d<f.length;d+=1)e=f.item(d),c(a,e)}function x(){var b=a.firstChild;b.firstChild&&(1<H?(b.style.MozTransformOrigin="center top",b.style.WebkitTransformOrigin="center top",b.style.OTransformOrigin="center top",b.style.msTransformOrigin="center top"):(b.style.MozTransformOrigin="left top",b.style.WebkitTransformOrigin="left top",b.style.OTransformOrigin="left top",b.style.msTransformOrigin="left top"),b.style.WebkitTransform="scale("+H+")",
b.style.MozTransform="scale("+H+")",b.style.OTransform="scale("+H+")",b.style.msTransform="scale("+H+")",a.style.width=Math.round(H*b.offsetWidth)+"px",a.style.height=Math.round(H*b.offsetHeight)+"px")}function D(a){var b=L.getElementById("sizer");da?(X.parentNode||(b.appendChild(X),b.style.paddingRight=O.getComputedStyle(X).width,x()),V&&V.forgetAnnotations(),V=new gui.AnnotationViewManager(R,a.body,X),d(a.body)):X.parentNode&&(b.removeChild(X),b.style.paddingRight=0,V.forgetAnnotations(),x())}function A(d){function f(){for(var e=
a;e.firstChild;)e.removeChild(e.firstChild);a.style.display="inline-block";e=S.rootElement;a.ownerDocument.importNode(e,!0);ha.setOdfContainer(S);var h=S,n=M;(new odf.FontLoader).loadFonts(h,n.sheet);b(S,ha,G);for(var l=S,h=na.sheet,n=a;n.firstChild;)n.removeChild(n.firstChild);n=L.createElementNS(a.namespaceURI,"div");n.style.display="inline-block";n.style.background="white";n.id="sizer";n.appendChild(e);a.appendChild(n);X=L.createElementNS(a.namespaceURI,"div");X.id="annotationsPane";J=L.createElementNS(a.namespaceURI,
"div");J.id="shadowContent";J.style.position="absolute";J.style.top=0;J.style.left=0;l.getContentElement().appendChild(J);var k=e.body,p,q,A;q=[];for(p=k.firstChild;p&&p!==k;)if(p.namespaceURI===r&&(q[q.length]=p),p.firstChild)p=p.firstChild;else{for(;p&&p!==k&&!p.nextSibling;)p=p.parentNode;p&&p.nextSibling&&(p=p.nextSibling)}for(A=0;A<q.length;A+=1)p=q[A],g(l,"frame"+String(A),p,h);q=B.getODFElementsWithXPath(k,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.resolvePrefix);for(p=0;p<q.length;p+=
1)k=q[p],k.setAttributeNS&&k.setAttributeNS("urn:webodf","containsparagraphanchor",!0);p=e.body.getElementsByTagNameNS(s,"table-cell");for(k=0;k<p.length;k+=1)q=p.item(k),q.hasAttributeNS(s,"number-columns-spanned")&&q.setAttribute("colspan",q.getAttributeNS(s,"number-columns-spanned")),q.hasAttributeNS(s,"number-rows-spanned")&&q.setAttribute("rowspan",q.getAttributeNS(s,"number-rows-spanned"));c(e.body);t(e.body);m(e.body);u(l,e.body,h);w(l,e.body);q=e.body;var z,E,W,U,k={};p={};var $;A=O.document.getElementsByTagNameNS(v,
"list-style");for(l=0;l<A.length;l+=1)z=A.item(l),(W=z.getAttributeNS(y,"name"))&&(p[W]=z);q=q.getElementsByTagNameNS(v,"list");for(l=0;l<q.length;l+=1)if(z=q.item(l),A=z.getAttributeNS(F,"id")){E=z.getAttributeNS(v,"continue-list");z.setAttribute("id",A);U="text|list#"+A+" > text|list-item > *:first-child:before {";if(W=z.getAttributeNS(v,"style-name")){z=p[W];$=P.getFirstNonWhitespaceChild(z);z=void 0;if($)if("list-level-style-number"===$.localName){z=$.getAttributeNS(y,"num-format");W=$.getAttributeNS(y,
"num-suffix");var ua="",ua={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},pa=void 0,pa=$.getAttributeNS(y,"num-prefix")||"",pa=ua.hasOwnProperty(z)?pa+(" counter(list, "+ua[z]+")"):z?pa+("'"+z+"';"):pa+" ''";W&&(pa+=" '"+W+"'");z=ua="content: "+pa+";"}else"list-level-style-image"===$.localName?z="content: none;":"list-level-style-bullet"===$.localName&&(z="content: '"+$.getAttributeNS(v,"bullet-char")+"';");$=z}if(E){for(z=k[E];z;)E=z,z=k[E];U+="counter-increment:"+
E+";";$?($=$.replace("list",E),U+=$):U+="content:counter("+E+");"}else E="",$?($=$.replace("list",A),U+=$):U+="content: counter("+A+");",U+="counter-increment:"+A+";",h.insertRule("text|list#"+A+" {counter-reset:"+A+"}",h.cssRules.length);U+="}";k[A]=E;U&&h.insertRule(U,h.cssRules.length)}n.insertBefore(J,n.firstChild);x();D(e);if(!d&&(e=[S],ga.hasOwnProperty("statereadychange")))for(h=ga.statereadychange,n=0;n<h.length;n+=1)h[n].apply(null,e)}S.state===odf.OdfContainer.DONE?f():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),
runtime.setTimeout(function la(){S.state===odf.OdfContainer.DONE?f():(runtime.log("will be back later..."),runtime.setTimeout(la,500))},100))}function z(b){ja.clearQueue();a.innerHTML="loading "+b;a.removeAttribute("style");S=new odf.OdfContainer(b,function(a){S=a;A(!1)})}function E(){if(Z){for(var a=Z.ownerDocument.createDocumentFragment();Z.firstChild;)a.insertBefore(Z.firstChild,null);Z.parentNode.replaceChild(a,Z)}}function K(a){a=a||O.event;for(var b=a.target,c=O.getSelection(),d=0<c.rangeCount?
c.getRangeAt(0):null,f=d&&d.startContainer,e=d&&d.startOffset,g=d&&d.endContainer,h=d&&d.endOffset,m,n;b&&("p"!==b.localName&&"h"!==b.localName||b.namespaceURI!==v);)b=b.parentNode;ia&&(b&&b.parentNode!==Z)&&(m=b.ownerDocument,n=m.documentElement.namespaceURI,Z?Z.parentNode&&E():(Z=m.createElementNS(n,"p"),Z.style.margin="0px",Z.style.padding="0px",Z.style.border="0px",Z.setAttribute("contenteditable",!0)),b.parentNode.replaceChild(Z,b),Z.appendChild(b),Z.focus(),d&&(c.removeAllRanges(),d=b.ownerDocument.createRange(),
d.setStart(f,e),d.setEnd(g,h),c.addRange(d)),a.preventDefault?(a.preventDefault(),a.stopPropagation()):(a.returnValue=!1,a.cancelBubble=!0))}runtime.assert(null!==a&&void 0!==a,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==a.ownerDocument&&void 0!==a.ownerDocument,"odf.OdfCanvas constructor needs DOM");var R=this,L=a.ownerDocument,S,ha=new odf.Formatting,ea=new e(a),fa,M,G,na,ia=!1,H=1,ga={},Z,ja=new k;n(L);fa=new l(p(L));M=p(L);G=p(L);na=p(L);this.refreshCSS=function(){b(S,
ha,G);x()};this.refreshSize=function(){x()};this.odfContainer=function(){return S};this.slidevisibilitycss=function(){return fa.css};this.setOdfContainer=function(a,b){S=a;A(!0===b)};this.load=this.load=z;this.save=function(a){E();S.save(a)};this.setEditable=function(b){h(a,"click",K);(ia=b)||E()};this.addListener=function(b,c){switch(b){case "selectionchange":ea.addListener(b,c);break;case "click":h(a,b,c);break;default:var d=ga[b];void 0===d&&(d=ga[b]=[]);c&&-1===d.indexOf(c)&&d.push(c)}};this.getFormatting=
function(){return ha};this.getAnnotationManager=function(){return V};this.refreshAnnotations=function(){D(S.rootElement)};this.rerenderAnnotations=function(){V&&V.rerenderAnnotations()};this.enableAnnotations=function(a){a!==da&&(da=a,D(S.rootElement))};this.addAnnotation=function(a){V&&V.addAnnotation(a)};this.forgetAnnotations=function(){V&&V.forgetAnnotations()};this.setZoomLevel=function(a){H=a;x()};this.getZoomLevel=function(){return H};this.fitToContainingElement=function(b,c){var d=a.offsetHeight/
H;H=b/(a.offsetWidth/H);c/d<H&&(H=c/d);x()};this.fitToWidth=function(b){H=b/(a.offsetWidth/H);x()};this.fitSmart=function(b,c){var d,f;d=a.offsetWidth/H;f=a.offsetHeight/H;d=b/d;void 0!==c&&c/f<d&&(d=c/f);H=Math.min(1,d);x()};this.fitToHeight=function(b){H=b/(a.offsetHeight/H);x()};this.showFirstPage=function(){fa.showFirstPage()};this.showNextPage=function(){fa.showNextPage()};this.showPreviousPage=function(){fa.showPreviousPage()};this.showPage=function(a){fa.showPage(a);x()};this.getElement=function(){return a}};
return odf.OdfCanvas}();
// Input 37
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(k,l,h){return new odf.OdfContainer(k,function(e){if(e.state===odf.OdfContainer.INVALID)return h("Document "+k+" is invalid.");e.state===odf.OdfContainer.DONE?e.saveAs(l,function(b){h(b)}):h("Document was not completely loaded.")})};this.render=function(k,l,h){for(l=l.getElementsByTagName("body")[0];l.firstChild;)l.removeChild(l.firstChild);l=new odf.OdfCanvas(l);l.addListener("statereadychange",function(e){h(e)});l.load(k)}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(k,l){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(k,l,h,e){};ops.Server.prototype.joinSession=function(k,l,h,e){};ops.Server.prototype.getGenesisUrl=function(k){};
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
ops.NowjsServer=function(){var k;this.getNowObject=function(){return k};this.getGenesisUrl=function(l){return"/session/"+l+"/genesis"};this.connect=function(l,h){function e(){"unavailable"===k.networkStatus?(runtime.log("connection to server unavailable."),h("unavailable")):"ready"!==k.networkStatus?b>l?(runtime.log("connection to server timed out."),h("timeout")):(b+=100,runtime.getWindow().setTimeout(e,100)):(runtime.log("connection to collaboration server established."),h("ready"))}var b=0;k||
(k=runtime.getVariable("now"),void 0===k&&(k={networkStatus:"unavailable"}),e())};this.networkStatus=function(){return k?k.networkStatus:"unavailable"};this.login=function(l,h,e,b){k?k.login(l,h,e,b):b("Not connected to server")};this.joinSession=function(l,h,e,b){k.joinSession(l,h,function(b){k.memberid=b;e(b)},b)}};
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
ops.PullBoxServer=function(k){function l(b,a){var f=new XMLHttpRequest,d=new core.ByteArrayWriter("utf8"),c=JSON.stringify(b);runtime.log("Sending message to server: "+c);d.appendString(c);d=d.getByteArray();f.open("POST",k.url,!0);f.onreadystatechange=function(){4===f.readyState&&((200>f.status||300<=f.status)&&0===f.status&&runtime.log("Status "+String(f.status)+": "+f.responseText||f.statusText),a(f.responseText))};d=d.buffer&&!f.sendAsBinary?d.buffer:runtime.byteArrayToString(d,"binary");try{f.sendAsBinary?
f.sendAsBinary(d):f.send(d)}catch(e){runtime.log("Problem with calling server: "+e+" "+d),a(e.message)}}var h=this,e,b=new core.Base64;k=k||{};k.url=k.url||"/WSER";this.getGenesisUrl=function(b){return"/session/"+b+"/genesis"};this.call=l;this.getToken=function(){return e};this.setToken=function(b){e=b};this.connect=function(b,a){a("ready")};this.networkStatus=function(){return"ready"};this.login=function(g,a,f,d){l({command:"login",args:{login:b.toBase64(g),password:b.toBase64(a)}},function(a){var b=
runtime.fromJson(a);runtime.log("Login reply: "+a);b.hasOwnProperty("token")?(e=b.token,runtime.log("Caching token: "+h.getToken()),f(b)):d(a)})};this.joinSession=function(b,a,f,d){l({command:"join_session",args:{user_id:b,es_id:a}},function(a){var b=runtime.fromJson(a);runtime.log("join_session reply: "+a);b.hasOwnProperty("success")&&b.success?f(b.member_id):d&&d()})}};
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
ops.OpAddCursor=function(){var k=this,l,h;this.init=function(e){l=e.memberid;h=e.timestamp};this.transform=function(e,b){return[k]};this.execute=function(e){var b=e.getCursor(l);if(b)return!1;b=new ops.OdtCursor(l,e);e.addCursor(b);e.emit(ops.OdtDocument.signalCursorAdded,b);return!0};this.spec=function(){return{optype:"AddCursor",memberid:l,timestamp:h}}};
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
gui.StyleHelper=function(k){function l(b,g,a){var f=!0,d;b.collapsed?(d=b.startContainer,d.hasChildNodes()&&b.startOffset<d.childNodes.length&&(d=d.childNodes[b.startOffset]),b=[d]):b=e.getTextNodes(b,!0);b=k.getAppliedStyles(b);for(d=0;d<b.length&&!(f=b[d]["style:text-properties"],f=!f||f[g]!==a);d+=1);return!f}var h=new core.DomUtils,e=new odf.OdfUtils;this.getAppliedStyles=function(b){b=e.getTextNodes(b,!0);return k.getAppliedStyles(b)};this.applyStyle=function(b,g,a){var f=h.splitBoundaries(g),
d=e.getTextNodes(g,!1);k.applyStyle(b,d,{startContainer:g.startContainer,startOffset:g.startOffset,endContainer:g.endContainer,endOffset:g.endOffset},a);f.forEach(h.normalizeTextNodes)};this.isBold=function(b){return l(b,"fo:font-weight","bold")};this.isItalic=function(b){return l(b,"fo:font-style","italic")};this.hasUnderline=function(b){return l(b,"style:text-underline-style","solid")};this.hasStrikeThrough=function(b){return l(b,"style:text-line-through-style","solid")}};
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
ops.OpApplyDirectStyling=function(){function k(a){var d=0<=b?e+b:e,c=a.getIteratorAtPosition(0<=b?e:e+b),d=b?a.getIteratorAtPosition(d):c;a=a.getDOM().createRange();a.setStart(c.container(),c.unfilteredDomOffset());a.setEnd(d.container(),d.unfilteredDomOffset());return a}var l,h,e,b,g,a=new odf.OdfUtils;this.init=function(a){l=a.memberid;h=a.timestamp;e=parseInt(a.position,10);b=parseInt(a.length,10);g=a.setProperties};this.transform=function(a,b){return null};this.execute=function(b){var d=k(b),
c=a.getImpactedParagraphs(d);(new gui.StyleHelper(b.getFormatting())).applyStyle(l,d,g);d.detach();b.getOdfCanvas().refreshCSS();c.forEach(function(a){b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:l,timeStamp:h})});b.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:l,timestamp:h,position:e,length:b,setProperties:g}}};
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
ops.OpRemoveCursor=function(){var k=this,l,h;this.init=function(e){l=e.memberid;h=e.timestamp};this.transform=function(e,b){var g=e.spec(),a=[k];"RemoveCursor"===g.optype&&g.memberid===l&&(a=[]);return a};this.execute=function(e){return e.removeCursor(l)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:l,timestamp:h}}};
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
ops.OpMoveCursor=function(){var k=this,l,h,e,b;this.init=function(g){l=g.memberid;h=g.timestamp;e=parseInt(g.position,10);b=void 0!==g.length?parseInt(g.length,10):0};this.merge=function(g){return"MoveCursor"===g.optype&&g.memberid===l?(e=g.position,b=g.length,h=g.timestamp,!0):!1};this.transform=function(g,a){var f=g.spec(),d=e+b,c,h=[k];switch(f.optype){case "RemoveText":c=f.position+f.length;c<=e?e-=f.length:f.position<d&&(e<f.position?b=c<d?b-f.length:f.position-e:(e=f.position,b=c<d?d-c:0));
break;case "SplitParagraph":f.position<e?e+=1:f.position<=d&&(b+=1);break;case "AddAnnotation":f.position<e?e+=1:f.position<d&&(b+=1);break;case "InsertText":f.position<e?e+=f.text.length:f.position<=d&&(b+=f.text.length);break;case "RemoveCursor":f.memberid===l&&(h=[]);break;case "InsertTable":h=null}return h};this.execute=function(g){var a=g.getCursor(l),f=g.getCursorPosition(l),d=g.getPositionFilter(),c=e-f;if(!a)return!1;f=a.getStepCounter();c=0<c?f.countForwardSteps(c,d):0>c?-f.countBackwardSteps(-c,
d):0;a.move(c);b&&(d=0<b?f.countForwardSteps(b,d):0>b?-f.countBackwardSteps(-b,d):0,a.move(d,!0));g.emit(ops.OdtDocument.signalCursorMoved,a);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:l,timestamp:h,position:e,length:b}}};
// Input 47
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
ops.OpInsertTable=function(){function k(a,c){var d;if(1===t.length)d=t[0];else if(3===t.length)switch(a){case 0:d=t[0];break;case b-1:d=t[2];break;default:d=t[1]}else d=t[a];if(1===d.length)return d[0];if(3===d.length)switch(c){case 0:return d[0];case g-1:return d[2];default:return d[1]}return d[c]}var l=this,h,e,b,g,a,f,d,c,t;this.init=function(m){h=m.memberid;e=m.timestamp;a=parseInt(m.position,10);b=parseInt(m.initialRows,10);g=parseInt(m.initialColumns,10);f=m.tableName;d=m.tableStyleName;c=m.tableColumnStyleName;
t=m.tableCellStyleMatrix};this.transform=function(b,c){var d=b.spec(),f=[l];switch(d.optype){case "InsertTable":f=null;break;case "AddAnnotation":d.position<a&&(a+=1);break;case "SplitParagraph":d.position<a?a+=1:d.position!==a||c||(a+=1,f=null);break;case "InsertText":d.position<a?a+=d.text.length:d.position!==a||c||(a+=d.text.length,f=null);break;case "RemoveText":d.position+d.length<=a?a-=d.length:d.position<a&&(a=d.position)}return f};this.execute=function(m){var l=m.getPositionInTextNode(a),
n=m.getRootNode();if(l){var p=m.getDOM(),r=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),u,y,x,s;d&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);f&&r.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",f);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:number-columns-repeated",
g);c&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",c);r.appendChild(t);for(x=0;x<b;x+=1){t=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(s=0;s<g;s+=1)u=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(y=k(x,s))&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",y),y=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:p"),
u.appendChild(y),t.appendChild(u);r.appendChild(t)}l=m.getParagraphElement(l.textNode);n.insertBefore(r,l?l.nextSibling:void 0);m.getOdfCanvas().refreshSize();m.emit(ops.OdtDocument.signalTableAdded,{tableElement:r,memberId:h,timeStamp:e});m.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:h,timestamp:e,position:a,initialRows:b,initialColumns:g,tableName:f,tableStyleName:d,tableColumnStyleName:c,tableCellStyleMatrix:t}}};
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
ops.OpInsertText=function(){function k(a,b){var d=b.parentNode,c=b.nextSibling,e=[];a.getCursors().forEach(function(a){var c=a.getSelectedRange();!c||c.startContainer!==b&&c.endContainer!==b||e.push({cursor:a,startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset})});d.removeChild(b);d.insertBefore(b,c);e.forEach(function(a){var b=a.cursor.getSelectedRange();b.setStart(a.startContainer,a.startOffset);b.setEnd(a.endContainer,a.endOffset)})}var l=
this,h,e,b,g;this.init=function(a){h=a.memberid;e=a.timestamp;b=parseInt(a.position,10);g=a.text};this.merge=function(a){return"InsertText"===a.optype&&a.memberid===h&&a.position===b+g.length?(g+=a.text,e=a.timestamp,!0):!1};this.transform=function(a,f){var d=a.spec(),c=[l];switch(d.optype){case "InsertText":d.position<b?b+=d.text.length:d.position!==b||f||(b+=d.text.length,c=null);break;case "AddAnnotation":d.position<b&&(b+=1);break;case "SplitParagraph":d.position<b?b+=1:d.position!==b||f||(b+=
1,c=null);break;case "InsertTable":c=null;break;case "RemoveText":d.position+d.length<=b?b-=d.length:d.position<b&&(b=d.position)}return c};this.execute=function(a){var f,d,c,l,m=a.getDOM(),q,n=!0,p=0,r;if(f=a.getPositionInTextNode(b,h)){d=f.textNode;c=d.parentNode;l=d.nextSibling;q=a.getParagraphElement(d);f.offset!==d.length&&(l=d.splitText(f.offset));for(f=0;f<g.length;f+=1)if(" "===g[f]||"\t"===g[f])p<f&&(p=g.substring(p,f),n?d.appendData(p):c.insertBefore(m.createTextNode(p),l)),p=f+1,n=!1,r=
" "===g[f]?"text:s":"text:tab",r=m.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",r),r.appendChild(m.createTextNode(g[f])),c.insertBefore(r,l);p=g.substring(p);0<p.length&&(n?d.appendData(p):c.insertBefore(m.createTextNode(p),l));k(a,d);0===d.length&&d.parentNode.removeChild(d);a.getOdfCanvas().refreshSize();a.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:q,memberId:h,timeStamp:e});a.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",
memberid:h,timestamp:e,position:b,text:g}}};
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
ops.OpRemoveText=function(){function k(a){function b(a){if(f.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(!b(a))return!1;a=a.nextSibling}return!0}function e(g){g=d.mergeIntoParent(g);return!f.isParagraph(g)&&g!==a&&b(g)?e(g):g}this.isEmpty=b;this.mergeChildrenIntoParent=e}function l(b){var f=b.getPositionFilter(),e,h,n,l,k=a,w=b.getDOM().createRange();b=b.getIteratorAtPosition(g);e=b.container();for(h=b.unfilteredDomOffset();k&&
b.nextPosition();)n=b.container(),l=b.unfilteredDomOffset(),f.acceptPosition(b)===NodeFilter.FILTER_ACCEPT&&(k-=1);w.setStart(e,h);w.setEnd(n,l);d.splitBoundaries(w);return w}var h=this,e,b,g,a,f,d;this.init=function(c){runtime.assert(0<=c.length,"OpRemoveText only supports positive lengths");e=c.memberid;b=c.timestamp;g=parseInt(c.position,10);a=parseInt(c.length,10);f=new odf.OdfUtils;d=new core.DomUtils};this.transform=function(c,d){var f=c.spec(),l=g+a,n,k=[h];switch(f.optype){case "RemoveText":n=
f.position+f.length;n<=g?g-=f.length:f.position<l&&(g<f.position?a=n<l?a-f.length:f.position-g:n<l?(g=f.position,a=l-n):k=[]);break;case "InsertText":f.position<=g?g+=f.text.length:f.position<l&&(a=f.position-g,n=new ops.OpRemoveText,n.init({memberid:e,timestamp:b,position:f.position+f.text.length,length:l-f.position}),k=[n,h]);break;case "SplitParagraph":f.position<=g?g+=1:f.position<l&&(a=f.position-g,n=new ops.OpRemoveText,n.init({memberid:e,timestamp:b,position:f.position+1,length:l-f.position}),
k=[n,h]);break;case "InsertTable":k=null;break;case "AddAnnotation":case "RemoveAnnotation":k=null;break;case "ApplyDirectStyling":k=null}return k};this.execute=function(c){var d,f,h,n,p=new k(c.getRootNode());c.upgradeWhitespacesAtPosition(g);c.upgradeWhitespacesAtPosition(g+a);f=l(c);d=c.getParagraphElement(f.startContainer);h=c.getTextElements(f,!0);n=c.getParagraphElements(f);f.detach();h.forEach(function(a){p.mergeChildrenIntoParent(a)});f=n.reduce(function(a,b){var c,d,f=a,e=b,g,h;p.isEmpty(a)&&
(d=!0,b.parentNode!==a.parentNode&&(g=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),e=a,f=b,h=f.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||f.firstChild);for(;e.hasChildNodes();)c=d?e.lastChild:e.firstChild,e.removeChild(c),"editinfo"!==c.localName&&f.insertBefore(c,h);g&&p.isEmpty(g)&&p.mergeChildrenIntoParent(g);p.mergeChildrenIntoParent(e);return f});c.fixCursorPositions();c.getOdfCanvas().refreshSize();c.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f||
d,memberId:e,timeStamp:b});c.emit(ops.OdtDocument.signalCursorMoved,c.getCursor(e));c.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:e,timestamp:b,position:g,length:a}}};
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
ops.OpSplitParagraph=function(){var k=this,l,h,e,b=new odf.OdfUtils;this.init=function(b){l=b.memberid;h=b.timestamp;e=parseInt(b.position,10)};this.transform=function(b,a){var f=b.spec(),d=[k];switch(f.optype){case "SplitParagraph":f.position<e?e+=1:f.position!==e||a||(e+=1,d=null);break;case "AddAnnotation":f.position<e&&(e+=1);break;case "InsertText":f.position<e?e+=f.text.length:f.position!==e||a||(e+=f.text.length,d=null);break;case "InsertTable":d=null;break;case "RemoveText":f.position+f.length<=
e?e-=f.length:f.position<e&&(e=f.position)}return d};this.execute=function(g){var a,f,d,c,k,m;g.upgradeWhitespacesAtPosition(e);a=g.getPositionInTextNode(e,l);if(!a)return!1;f=g.getParagraphElement(a.textNode);if(!f)return!1;d=b.isListItem(f.parentNode)?f.parentNode:f;0===a.offset?(m=a.textNode.previousSibling,k=null):(m=a.textNode,k=a.offset>=a.textNode.length?null:a.textNode.splitText(a.offset));for(a=a.textNode;a!==d;)if(a=a.parentNode,c=a.cloneNode(!1),m){for(k&&c.appendChild(k);m.nextSibling;)c.appendChild(m.nextSibling);
a.parentNode.insertBefore(c,a.nextSibling);m=a;k=c}else a.parentNode.insertBefore(c,a),m=c,k=a;b.isListItem(k)&&(k=k.childNodes[0]);g.fixCursorPositions(l);g.getOdfCanvas().refreshSize();g.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f,memberId:l,timeStamp:h});g.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:k,memberId:l,timeStamp:h});g.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:l,timestamp:h,position:e}}};
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
ops.OpSetParagraphStyle=function(){var k=this,l,h,e,b;this.init=function(g){l=g.memberid;h=g.timestamp;e=g.position;b=g.styleName};this.transform=function(e,a){var f=e.spec(),d=[k];switch(f.optype){case "RemoveParagraphStyle":f.styleName===b&&(b="")}return d};this.execute=function(g){var a;if(a=g.getPositionInTextNode(e))if(a=g.getParagraphElement(a.textNode))return""!==b?a.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",b):a.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"style-name"),g.getOdfCanvas().refreshSize(),g.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,timeStamp:h,memberId:l}),g.getOdfCanvas().rerenderAnnotations(),!0;return!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:l,timestamp:h,position:e,styleName:b}}};
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
ops.OpUpdateParagraphStyle=function(){function k(a,b){var c,d,f=b?b.split(","):[];for(c=0;c<f.length;c+=1)d=f[c].split(":"),a.removeAttributeNS(odf.Namespaces.resolvePrefix(d[0]),d[1])}function l(a,b,c,d){var f,e,g,h=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<h.length)&&Object.keys(a).forEach(function(b){f=a[b];(c&&void 0!==c[b]||h&&-1!==h.indexOf(b))&&"object"!==typeof f&&delete a[b]});if(b&&b.attributes&&(c||0<h.length)){g=b.attributes.split(",");for(d=0;d<g.length;d+=1)if(e=g[d],c&&void 0!==
c[e]||h&&-1!==h.indexOf(e))g.splice(d,1),d-=1;0<g.length?b.attributes=g.join(","):delete b.attributes}}function h(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function e(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function b(a,b){var c=t?t[b]:null,d=m?m[b]:null;l(c,d,a.setProperties?a.setProperties[b]:null,a.removedProperties?a.removedProperties[b]:null);c&&!h(c)&&delete t[b];d&&!e(d)&&delete m[b]}function g(a){t&&["style:parent-style-name",
"style:next-style-name"].forEach(function(b){t[b]===a&&delete t[b]})}var a=this,f,d,c,t,m;this.init=function(a){f=a.memberid;d=a.timestamp;c=a.styleName;t=a.setProperties;m=a.removedProperties};this.transform=function(d,f){var k=d.spec(),r=[a];switch(k.optype){case "UpdateParagraphStyle":k.styleName!==c||f||(b(k,"style:paragraph-properties"),b(k,"style:text-properties"),l(t||null,m||null,k.setProperties||null,k.removedProperties||null),t&&h(t)||m&&e(m)||(r=[]));break;case "RemoveParagraphStyle":k.styleName===
c?r=[]:g(k.styleName)}return r};this.execute=function(a){var b=a.getFormatting(),d=a.getDOM(),f=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:style"),e,g,h,l,s;return(f=a.getParagraphStyleElement(c))?(e=f.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","paragraph-properties")[0],g=f.getElementsByTagNameNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","text-properties")[0],t&&Object.keys(t).forEach(function(c){switch(c){case "style:paragraph-properties":void 0===
e&&(e=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:paragraph-properties"),f.appendChild(e));b.updateStyle(e,t["style:paragraph-properties"]);break;case "style:text-properties":void 0===g&&(g=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:text-properties"),f.appendChild(g));(l=t["style:text-properties"]["style:font-name"])&&!b.getFontMap().hasOwnProperty(l)&&(h=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:font-face"),
h.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:style:1.0","style:name",l),h.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0","svg:font-family",l),a.getOdfCanvas().odfContainer().rootElement.fontFaceDecls.appendChild(h));b.updateStyle(g,t["style:text-properties"]);break;default:"object"!==typeof t[c]&&(s=odf.Namespaces.resolvePrefix(c.substr(0,c.indexOf(":"))),f.setAttributeNS(s,c,t[c]))}}),m&&(m["style:paragraph-properties"]&&(k(e,m["style:paragraph-properties"].attributes),
0===e.attributes.length&&f.removeChild(e)),m["style:text-properties"]&&(k(g,m["style:text-properties"].attributes),0===g.attributes.length&&f.removeChild(g)),k(f,m.attributes)),a.getOdfCanvas().refreshCSS(),a.emit(ops.OdtDocument.signalParagraphStyleModified,c),a.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"UpdateParagraphStyle",memberid:f,timestamp:d,styleName:c,setProperties:t,removedProperties:m}}};
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
ops.OpAddParagraphStyle=function(){function k(a){g&&["style:parent-style-name","style:next-style-name"].forEach(function(b){g[b]===a&&delete g[b]})}var l=this,h,e,b,g,a=odf.Namespaces.svgns,f=odf.Namespaces.stylens;this.init=function(a){h=a.memberid;e=a.timestamp;b=a.styleName;g=a.setProperties};this.transform=function(a,b){var f=a.spec();"RemoveParagraphStyle"===f.optype&&k(f.styleName);return[l]};this.execute=function(d){var c=d.getOdfCanvas().odfContainer(),e=d.getFormatting(),h=d.getDOM(),k=h.createElementNS(f,
"style:style"),l,p,r,w,u;if(!k)return!1;k.setAttributeNS(f,"style:family","paragraph");k.setAttributeNS(f,"style:name",b);g&&Object.keys(g).forEach(function(b){switch(b){case "style:paragraph-properties":l=h.createElementNS(f,"style:paragraph-properties");k.appendChild(l);e.updateStyle(l,g["style:paragraph-properties"]);break;case "style:text-properties":p=h.createElementNS(f,"style:text-properties");k.appendChild(p);(w=g["style:text-properties"]["style:font-name"])&&!e.getFontMap().hasOwnProperty(w)&&
(r=h.createElementNS(f,"style:font-face"),r.setAttributeNS(f,"style:name",w),r.setAttributeNS(a,"svg:font-family",w),c.rootElement.fontFaceDecls.appendChild(r));e.updateStyle(p,g["style:text-properties"]);break;default:"object"!==typeof g[b]&&(u=odf.Namespaces.resolvePrefix(b.substr(0,b.indexOf(":"))),k.setAttributeNS(u,b,g[b]))}});c.rootElement.styles.appendChild(k);d.getOdfCanvas().refreshCSS();d.emit(ops.OdtDocument.signalStyleCreated,b);return!0};this.spec=function(){return{optype:"AddParagraphStyle",
memberid:h,timestamp:e,styleName:b,setProperties:g}}};
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
ops.OpRemoveParagraphStyle=function(){function k(e){var a=[];e&&["style:parent-style-name","style:next-style-name"].forEach(function(f){e[f]===b&&a.push(f)});return a}var l=this,h,e,b;this.init=function(g){h=g.memberid;e=g.timestamp;b=g.styleName};this.transform=function(e,a){var f=e.spec(),d,c;d=[l];switch(f.optype){case "RemoveParagraphStyle":f.styleName===b&&(d=[]);break;case "AddParagraphStyle":case "UpdateParagraphStyle":c=k(f.setProperties);0<c.length&&(d=new ops.OpUpdateParagraphStyle,d.init({styleName:f.styleName,
removedProperties:{attributes:c.join(",")}}),d=[d,l]);break;case "SetParagraphStyle":f.styleName===b&&(f.styleName="",d=new ops.OpSetParagraphStyle,d.init(f),d=[d,l])}return d};this.execute=function(e){var a=e.getParagraphStyleElement(b);if(!a)return!1;a.parentNode.removeChild(a);e.getOdfCanvas().refreshCSS();e.emit(ops.OdtDocument.signalStyleDeleted,b);return!0};this.spec=function(){return{optype:"RemoveParagraphStyle",memberid:h,timestamp:e,styleName:b}}};
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
ops.OpAddAnnotation=function(){function k(a,b,c){if(c=a.getPositionInTextNode(c,h))a=c.textNode,c.offset!==a.length&&a.splitText(c.offset),a.parentNode.insertBefore(b,a.nextSibling)}var l=this,h,e,b,g,a;this.init=function(f){h=f.memberid;e=parseInt(f.timestamp,10);b=parseInt(f.position,10);g=parseInt(f.length,10)||0;a=f.name};this.transform=function(a,d){var c=a.spec(),e=b+g,h=[l];switch(c.optype){case "AddAnnotation":c.position<b?b+=1:c.position!==b||d||(b+=1,h=null);break;case "InsertText":c.position<=
b?b+=c.text.length:c.position<=e&&(g+=c.text.length);break;case "SplitParagraph":c.position<=b?b+=1:c.position<=e&&(g+=1);break;case "InsertTable":h=null;break;case "RemoveText":c.position+c.length<=b?b-=c.length:c.position<b&&(b=c.position)}return h};this.execute=function(f){var d={},c=f.getPositionFilter(),l=f.getCursor(h),m=f.getCursorPosition(h),m=b-m-1,q=new Date(e),n,p,r,w,u;u=f.getDOM();n=u.createElementNS(odf.Namespaces.officens,"office:annotation");n.setAttributeNS(odf.Namespaces.officens,
"office:name",a);p=u.createElementNS(odf.Namespaces.dcns,"dc:creator");p.setAttributeNS(odf.Namespaces.webodfns+":names:editinfo","editinfo:memberid",h);r=u.createElementNS(odf.Namespaces.dcns,"dc:date");r.appendChild(u.createTextNode(q.toISOString()));q=u.createElementNS(odf.Namespaces.textns,"text:list");w=u.createElementNS(odf.Namespaces.textns,"text:list-item");u=u.createElementNS(odf.Namespaces.textns,"text:p");w.appendChild(u);q.appendChild(w);n.appendChild(p);n.appendChild(r);n.appendChild(q);
d.node=n;if(!d.node)return!1;if(g){n=f.getDOM().createElementNS(odf.Namespaces.officens,"office:annotation-end");n.setAttributeNS(odf.Namespaces.officens,"office:name",a);d.end=n;if(!d.end)return!1;k(f,d.end,b+g)}k(f,d.node,b);l&&(n=l.getStepCounter(),c=0<m?n.countForwardSteps(m,c):0>m?-n.countBackwardSteps(-m,c):0,l.move(c),f.emit(ops.OdtDocument.signalCursorMoved,l));f.getOdfCanvas().addAnnotation(d);return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:h,timestamp:e,position:b,
length:g,name:a}}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("core.DomUtils");
ops.OpRemoveAnnotation=function(){var k,l,h,e,b;this.init=function(g){k=g.memberid;l=g.timestamp;h=parseInt(g.position,10);e=parseInt(g.length,10);b=new core.DomUtils};this.transform=function(b,a){return null};this.execute=function(e){for(var a=e.getIteratorAtPosition(h).container(),f,d=null,c=null;a.namespaceURI!==odf.Namespaces.officens||"annotation"!==a.localName;)a=a.parentNode;if(null===a)return!1;d=a;(f=d.getAttributeNS(odf.Namespaces.officens,"name"))&&(c=b.getElementsByTagNameNS(e.getRootNode(),
odf.Namespaces.officens,"annotation-end").filter(function(a){return f===a.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);e.getOdfCanvas().forgetAnnotations();for(a=b.getElementsByTagNameNS(d,odf.Namespaces.webodfns+":names:cursor","cursor");a.length;)d.parentNode.insertBefore(a.pop(),d);d.parentNode.removeChild(d);c&&c.parentNode.removeChild(c);e.fixCursorPositions();e.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:k,timestamp:l,
position:h,length:e}}};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
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
ops.OperationFactory=function(){function k(h){return function(){return new h}}var l;this.register=function(h,e){l[h]=e};this.create=function(h){var e=null,b=l[h.optype];b&&(e=b(h),e.init(h));return e};l={AddCursor:k(ops.OpAddCursor),ApplyDirectStyling:k(ops.OpApplyDirectStyling),InsertTable:k(ops.OpInsertTable),InsertText:k(ops.OpInsertText),RemoveText:k(ops.OpRemoveText),SplitParagraph:k(ops.OpSplitParagraph),SetParagraphStyle:k(ops.OpSetParagraphStyle),UpdateParagraphStyle:k(ops.OpUpdateParagraphStyle),
AddParagraphStyle:k(ops.OpAddParagraphStyle),RemoveParagraphStyle:k(ops.OpRemoveParagraphStyle),MoveCursor:k(ops.OpMoveCursor),RemoveCursor:k(ops.OpRemoveCursor),AddAnnotation:k(ops.OpAddAnnotation),RemoveAnnotation:k(ops.OpRemoveAnnotation)}};
// Input 58
runtime.loadClass("core.Cursor");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(k,l){function h(){u.setUnfilteredPosition(k.getNode(),0);return u}function e(a,b){var c,d=null;a&&(c=b?a[a.length-1]:a[0]);c&&(d={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return d}function b(a,c,d,f){var g=a.nodeType;d.setStart(a,c);d.collapse(!f);f=e(d.getClientRects(),!0===f);!f&&0<c&&(d.setStart(a,c-1),d.setEnd(a,c),f=e(d.getClientRects(),!0));f||(g===Node.ELEMENT_NODE&&a.childNodes[c-1]?f=b(a,c-1,d,!0):a.nodeType===Node.TEXT_NODE&&0<c?f=b(a,c-1,d,!0):a.previousSibling?
f=b(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,d,!0):a.parentNode&&a.parentNode!==l?f=b(a.parentNode,0,d,!1):(d.selectNode(l),f=e(d.getClientRects(),!1)));runtime.assert(Boolean(f),"No visible rectangle found");return f}function g(a,c,d){var f=a,e=h(),g,m=l.ownerDocument.createRange(),n=k.getSelectedRange()?k.getSelectedRange().cloneRange():l.ownerDocument.createRange(),p,r=runtime.getWindow();for(g=b(e.container(),
e.unfilteredDomOffset(),m);0<f&&d();)f-=1;c?(c=e.container(),e=e.unfilteredDomOffset(),-1===n.comparePoint(c,e)?(n.setStart(c,e),p=!1):n.setEnd(c,e)):(n.setStart(e.container(),e.unfilteredDomOffset()),n.collapse(!0));k.setSelectedRange(n,p);e=h();n=b(e.container(),e.unfilteredDomOffset(),m);if(n.top===g.top||void 0===y)y=n.left;r.clearTimeout(x);x=r.setTimeout(function(){y=void 0},2E3);m.detach();return a-f}function a(a){var b=h();return a.acceptPosition(b)===s?!0:!1}function f(a,b){for(var c=h(),
d=new core.LoopWatchDog(1E3),f=0,e=0;0<a&&c.nextPosition();)f+=1,d.check(),b.acceptPosition(c)===s&&(e+=f,f=0,a-=1);return e}function d(a,b,c){for(var d=h(),f=new core.LoopWatchDog(1E3),e=0,g=0;0<a&&d.nextPosition();)f.check(),c.acceptPosition(d)===s&&(e+=1,b.acceptPosition(d)===s&&(g+=e,e=0,a-=1));return g}function c(a,b,c){for(var d=h(),f=new core.LoopWatchDog(1E3),e=0,g=0;0<a&&d.previousPosition();)f.check(),c.acceptPosition(d)===s&&(e+=1,b.acceptPosition(d)===s&&(g+=e,e=0,a-=1));return g}function t(a,
b){for(var c=h(),d=new core.LoopWatchDog(1E3),f=0,e=0;0<a&&c.previousPosition();)f+=1,d.check(),b.acceptPosition(c)===s&&(e+=f,f=0,a-=1);return e}function m(a){var b=h(),c=w.getParagraphElement(b.getCurrentNode()),d;d=-t(1,a);if(0===d||c&&c!==w.getParagraphElement(b.getCurrentNode()))d=f(1,a);return d}function q(a,c){var d=h(),f=0,e=0,g=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var k=c,m=g,n=d,p=n.container(),r=0,q=null,u=void 0,t=10,w=void 0,x=0,Y=void 0,T=void 0,N=void 0,w=void 0,E=l.ownerDocument.createRange(),
K=new core.LoopWatchDog(1E3),w=b(p,n.unfilteredDomOffset(),E),Y=w.top,T=void 0===y?w.left:y,N=Y;!0===(0>m?n.previousPosition():n.nextPosition());)if(K.check(),k.acceptPosition(n)===s&&(r+=1,p=n.container(),w=b(p,n.unfilteredDomOffset(),E),w.top!==Y)){if(w.top!==N&&N!==Y)break;N=w.top;w=Math.abs(T-w.left);if(null===q||w<t)q=p,u=n.unfilteredDomOffset(),t=w,x=r}null!==q?(n.setUnfilteredPosition(q,u),r=x):r=0;E.detach();f+=r;if(0===f)break;e+=f;a-=1}return e*g}function n(a,c){var d,f,e,g,k=h(),m=w.getParagraphElement(k.getCurrentNode()),
n=0,p=l.ownerDocument.createRange();0>a?(d=k.previousPosition,f=-1):(d=k.nextPosition,f=1);for(e=b(k.container(),k.unfilteredDomOffset(),p);d.call(k);)if(c.acceptPosition(k)===s){if(w.getParagraphElement(k.getCurrentNode())!==m)break;g=b(k.container(),k.unfilteredDomOffset(),p);if(g.bottom!==e.bottom&&(e=g.top>=e.top&&g.bottom<e.bottom||g.top<=e.top&&g.bottom>e.bottom,!e))break;n+=f;e=g}p.detach();return n}function p(a,b){for(var c=0,d;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),
a=a.parentNode;for(d=b.firstChild;d!==a;)c+=1,d=d.nextSibling;return c}function r(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=h(),f=d.container(),e=d.unfilteredDomOffset(),g=0,k=new core.LoopWatchDog(1E3);d.setUnfilteredPosition(a,b);a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();d.setUnfilteredPosition(f,e);var f=a,e=b,l=d.container(),
m=d.unfilteredDomOffset();if(f===l)f=m-e;else{var n=f.compareDocumentPosition(l);2===n?n=-1:4===n?n=1:10===n?(e=p(f,l),n=e<m?1:-1):(m=p(l,f),n=m<e?-1:1);f=n}if(0>f)for(;d.nextPosition()&&(k.check(),c.acceptPosition(d)===s&&(g+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<f)for(;d.previousPosition()&&(k.check(),c.acceptPosition(d)===s&&(g-=1),d.container()!==a||d.unfilteredDomOffset()!==b););return g}runtime.assert(Boolean(l),"Expected to get a rootNode for gui.SelectionMover.");
var w,u,y,x,s=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,b){return g(a,b,u.nextPosition)};this.movePointBackward=function(a,b){return g(a,b,u.previousPosition)};this.getStepCounter=function(){return{countForwardSteps:f,countBackwardSteps:t,convertForwardStepsBetweenFilters:d,convertBackwardStepsBetweenFilters:c,countLinesSteps:q,countStepsToLineBoundary:n,countStepsToPosition:r,isPositionWalkable:a,countStepsToValidPosition:m}};(function(){w=new odf.OdfUtils;u=
gui.SelectionMover.createPositionIterator(l);var a=l.ownerDocument.createRange();a.setStart(u.container(),u.unfilteredDomOffset());a.collapse(!0);k.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(k){var l=new function(){this.acceptNode=function(h){return"urn:webodf:names:cursor"===h.namespaceURI||"urn:webodf:names:editinfo"===h.namespaceURI?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}};return new core.PositionIterator(k,5,l,!1)};(function(){return gui.SelectionMover})();
// Input 59
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
ops.OperationTransformer=function(){function k(h,e){for(var b,g,a,f=[],d=[];0<h.length&&e;){b=h.shift();g=e;var c=void 0;a=c=void 0;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(b.spec()));runtime.log(runtime.toJson(g.spec()));c=l.create(g.spec());a=g.transform(b,!0);g=(c=b.transform(c,!1))&&a?{opsA:c,opsB:a}:null;if(!g)return null;f=f.concat(g.opsA);if(0===g.opsB.length){f=f.concat(h);e=null;break}if(1<g.opsB.length)for(b=0;b<g.opsB.length-1;b+=1){a=k(h,g.opsB[b]);if(!a)return null;
d=d.concat(a.opsB);h=a.opsA}e=g.opsB.pop()}e&&d.push(e);return{opsA:f,opsB:d}}var l;this.setOperationFactory=function(h){l=h};this.transform=function(h,e){var b,g=[],a,f=[];for(b=0;b<h.length;b+=1){a=l.create(h[b]);if(!a)return null;g.push(a)}for(b=0;b<e.length;b+=1){a=l.create(e[b]);a=k(g,a);if(!a)return null;g=a.opsA;f=f.concat(a.opsB)}return{opsA:g,opsB:f}}};
// Input 60
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(k,l){var h=this,e,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,a){var f=0;0<b?f=e.movePointForward(b,a):0>=b&&(f=-e.movePointBackward(-b,a));h.handleUpdate();return f};this.handleUpdate=function(){};this.getStepCounter=function(){return e.getStepCounter()};this.getMemberId=function(){return k};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.getOdtDocument=function(){return l};b=new core.Cursor(l.getDOM(),k);e=new gui.SelectionMover(b,l.getRootNode())};
// Input 61
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
ops.EditInfo=function(k,l){function h(){var e=[],a;for(a in b)b.hasOwnProperty(a)&&e.push({memberid:a,time:b[a].time});e.sort(function(a,b){return a.time-b.time});return e}var e,b={};this.getNode=function(){return e};this.getOdtDocument=function(){return l};this.getEdits=function(){return b};this.getSortedEdits=function(){return h()};this.addEdit=function(e,a){b[e]={time:a}};this.clearEdits=function(){b={}};e=l.getDOM().createElementNS("urn:webodf:names:editinfo","editinfo");k.insertBefore(e,k.firstChild)};
// Input 62
gui.Avatar=function(k,l){var h=this,e,b,g;this.setColor=function(a){b.style.borderColor=a};this.setImageUrl=function(a){h.isVisible()?b.src=a:g=a};this.isVisible=function(){return"block"===e.style.display};this.show=function(){g&&(b.src=g,g=void 0);e.style.display="block"};this.hide=function(){e.style.display="none"};this.markAsFocussed=function(a){e.className=a?"active":""};(function(){var a=k.ownerDocument,f=a.documentElement.namespaceURI;e=a.createElementNS(f,"div");b=a.createElementNS(f,"img");
b.width=64;b.height=64;e.appendChild(b);e.style.width="64px";e.style.height="70px";e.style.position="absolute";e.style.top="-80px";e.style.left="-34px";e.style.display=l?"block":"none";k.appendChild(e)})()};
// Input 63
runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(k,l,h){function e(g){f&&a.parentNode&&(!d||g)&&(g&&void 0!==c&&runtime.clearTimeout(c),d=!0,b.style.opacity=g||"0"===b.style.opacity?"1":"0",c=runtime.setTimeout(function(){d=!1;e(!1)},500))}var b,g,a,f=!1,d=!1,c;this.refreshCursorBlinking=function(){h||k.getSelectedRange().collapsed?(f=!0,e(!0)):(f=!1,b.style.opacity="0")};this.setFocus=function(){f=!0;g.markAsFocussed(!0);e(!0)};this.removeFocus=function(){f=!1;g.markAsFocussed(!1);b.style.opacity="0"};this.setAvatarImageUrl=
function(a){g.setImageUrl(a)};this.setColor=function(a){b.style.borderColor=a;g.setColor(a)};this.getCursor=function(){return k};this.getFocusElement=function(){return b};this.toggleHandleVisibility=function(){g.isVisible()?g.hide():g.show()};this.showHandle=function(){g.show()};this.hideHandle=function(){g.hide()};this.ensureVisible=function(){var a,c,d,f,e=k.getOdtDocument().getOdfCanvas().getElement().parentNode,g;d=e.offsetWidth-e.clientWidth+5;f=e.offsetHeight-e.clientHeight+5;g=b.getBoundingClientRect();
a=g.left-d;c=g.top-f;d=g.right+d;f=g.bottom+f;g=e.getBoundingClientRect();c<g.top?e.scrollTop-=g.top-c:f>g.bottom&&(e.scrollTop+=f-g.bottom);a<g.left?e.scrollLeft-=g.left-a:d>g.right&&(e.scrollLeft+=d-g.right)};(function(){var c=k.getOdtDocument().getDOM();b=c.createElementNS(c.documentElement.namespaceURI,"span");a=k.getNode();a.appendChild(b);g=new gui.Avatar(a,l)})()};
// Input 64
runtime.loadClass("core.EventNotifier");
gui.ClickHandler=function(){function k(){h=0;e=null}var l,h=0,e=null,b=new core.EventNotifier([gui.ClickHandler.signalSingleClick,gui.ClickHandler.signalDoubleClick,gui.ClickHandler.signalTripleClick]);this.subscribe=function(e,a){b.subscribe(e,a)};this.handleMouseUp=function(g){var a=runtime.getWindow();e&&e.x===g.screenX&&e.y===g.screenY?(h+=1,1===h?b.emit(gui.ClickHandler.signalSingleClick,g):2===h?b.emit(gui.ClickHandler.signalDoubleClick,void 0):3===h&&(a.clearTimeout(l),b.emit(gui.ClickHandler.signalTripleClick,
void 0),k())):(b.emit(gui.ClickHandler.signalSingleClick,g),h=1,e={x:g.screenX,y:g.screenY},a.clearTimeout(l),l=a.setTimeout(k,400))}};gui.ClickHandler.signalSingleClick="click";gui.ClickHandler.signalDoubleClick="doubleClick";gui.ClickHandler.signalTripleClick="tripleClick";(function(){return gui.ClickHandler})();
// Input 65
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
gui.KeyboardHandler=function(){function k(b,e){e||(e=l.None);return b+":"+e}var l=gui.KeyboardHandler.Modifier,h=null,e={};this.setDefault=function(b){h=b};this.bind=function(b,g,a){b=k(b,g);runtime.assert(!1===e.hasOwnProperty(b),"tried to overwrite the callback handler of key combo: "+b);e[b]=a};this.unbind=function(b,g){var a=k(b,g);delete e[a]};this.reset=function(){h=null;e={}};this.handleEvent=function(b){var g=b.keyCode,a=l.None;b.metaKey&&(a|=l.Meta);b.ctrlKey&&(a|=l.Ctrl);b.altKey&&(a|=l.Alt);
b.shiftKey&&(a|=l.Shift);g=k(g,a);g=e[g];a=!1;g?a=g():null!==h&&(a=h(b));a&&(b.preventDefault?b.preventDefault():b.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,I:73,U:85,Z:90};(function(){return gui.KeyboardHandler})();
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("odf.TextSerializer");
gui.Clipboard=function(){var k,l,h;this.setDataFromRange=function(e,b){var g=!0,a,f=e.clipboardData;a=runtime.getWindow();var d=b.startContainer.ownerDocument;!f&&a&&(f=a.clipboardData);f?(d=d.createElement("span"),d.appendChild(b.cloneContents()),a=f.setData("text/plain",l.writeToString(d)),g=g&&a,a=f.setData("text/html",k.writeToString(d,odf.Namespaces.namespaceMap)),g=g&&a,e.preventDefault()):g=!1;return g};k=new xmldom.LSSerializer;l=new odf.TextSerializer;h=new odf.OdfNodeFilter;k.filter=h;l.filter=
h};
// Input 67
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.ClickHandler");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.KeyboardHandler");
runtime.loadClass("gui.StyleHelper");
gui.SessionController=function(){gui.SessionController=function(k,l){function h(a,b,c,d){var f="on"+b,e=!1;a.attachEvent&&(e=a.attachEvent(f,c));!e&&a.addEventListener&&(a.addEventListener(b,c,!1),e=!0);e&&!d||!a.hasOwnProperty(f)||(a[f]=c)}function e(a,b,c){var d="on"+b;a.detachEvent&&a.detachEvent(d,c);a.removeEventListener&&a.removeEventListener(b,c,!1);a[d]===c&&(a[d]=null)}function b(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function g(a,b){var c=new ops.OpMoveCursor;c.init({memberid:l,
position:a,length:b||0});return c}function a(a,b){var c=gui.SelectionMover.createPositionIterator(C.getRootNode()),d=C.getOdfCanvas().getElement(),f;f=a;if(!f)return null;for(;f!==d&&!("urn:webodf:names:cursor"===f.namespaceURI&&"cursor"===f.localName||"urn:webodf:names:editinfo"===f.namespaceURI&&"editinfo"===f.localName);)if(f=f.parentNode,!f)return null;f!==d&&a!==f&&(a=f.parentNode,b=Array.prototype.indexOf.call(a.childNodes,f));c.setUnfilteredPosition(a,b);return C.getDistanceFromCursor(l,c.container(),
c.unfilteredDomOffset())}function f(a){var b=C.getOdfCanvas().getElement(),c=C.getRootNode(),d=0;b.compareDocumentPosition(a)&Node.DOCUMENT_POSITION_PRECEDING||(a=gui.SelectionMover.createPositionIterator(c),a.moveToEnd(),c=a.container(),d=a.unfilteredDomOffset());return{node:c,offset:d}}function d(b){runtime.setTimeout(function(){var c;a:{var d=C.getOdfCanvas().getElement(),e=W.getSelection(),h,m,n,p;if(null===e.anchorNode&&null===e.focusNode){c=b.clientX;h=b.clientY;m=C.getDOM();m.caretRangeFromPoint?
(c=m.caretRangeFromPoint(c,h),h={container:c.startContainer,offset:c.startOffset}):m.caretPositionFromPoint?(c=m.caretPositionFromPoint(c,h),h={container:c.offsetNode,offset:c.offset}):h=null;if(!h){c=null;break a}c=h.container;h=h.offset;m=c;e=h}else c=e.anchorNode,h=e.anchorOffset,m=e.focusNode,e=e.focusOffset;runtime.assert(null!==c&&null!==m,"anchorNode is null or focusNode is null");n=la.containsNode(d,c);p=la.containsNode(d,m);n||p?(n||(n=f(c),c=n.node,h=n.offset),p||(n=f(m),m=n.node,e=n.offset),
d.focus(),c={anchorNode:c,anchorOffset:h,focusNode:m,focusOffset:e}):c=null}null!==c&&(d=a(c.anchorNode,c.anchorOffset),h=c.focusNode===c.anchorNode&&c.focusOffset===c.anchorOffset?d:a(c.focusNode,c.focusOffset),null!==h&&0!==h||null!==d&&0!==d)&&(c=C.getCursorPosition(l),d=g(c+d,h-d),k.enqueue(d))},0)}function c(a){d(a)}function t(){var a=C.getOdfCanvas().getElement(),b=/[A-Za-z0-9]/,c=0,d=0,f,e,h,m;if(la.containsNode(a,W.getSelection().focusNode)){a=gui.SelectionMover.createPositionIterator(C.getRootNode());
f=C.getCursor(l).getNode();a.setUnfilteredPosition(f,0);if(a.previousPosition()&&(e=a.getCurrentNode(),e.nodeType===Node.TEXT_NODE))for(h=e.data.length-1;0<=h;h-=1){m=e.data[h];if(!b.test(m))break;c-=1}a.setUnfilteredPosition(f,0);if(a.nextPosition()&&(e=a.getCurrentNode(),e.nodeType===Node.TEXT_NODE))for(h=0;h<e.data.length;h+=1){m=e.data[h];if(!b.test(m))break;d+=1}if(0!==c||0!==d)b=C.getCursorPosition(l),c=g(b+c,Math.abs(c)+Math.abs(d)),k.enqueue(c)}}function m(){var a=C.getOdfCanvas().getElement(),
b,c;la.containsNode(a,W.getSelection().focusNode)&&(c=C.getParagraphElement(C.getCursor(l).getNode()),a=C.getDistanceFromCursor(l,c,0),b=gui.SelectionMover.createPositionIterator(C.getRootNode()),b.moveToEndOfNode(c),c=C.getDistanceFromCursor(l,c,b.unfilteredDomOffset()),0!==a||0!==c)&&(b=C.getCursorPosition(l),a=g(b+a,Math.abs(a)+Math.abs(c)),k.enqueue(a))}function q(a){var b=C.getCursorSelection(l),c=C.getCursor(l).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,ka,ma):-c.convertBackwardStepsBetweenFilters(-a,
ka,ma),a=b.length+a,k.enqueue(g(b.position,a)))}function n(a){var b=C.getCursorPosition(l),c=C.getCursor(l).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,ka,ma):-c.convertBackwardStepsBetweenFilters(-a,ka,ma),k.enqueue(g(b+a,0)))}function p(){n(-1);return!0}function r(){n(1);return!0}function w(){q(-1);return!0}function u(){q(1);return!0}function y(a,b){var c=C.getParagraphElement(C.getCursor(l).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");
c=C.getCursor(l).getStepCounter().countLinesSteps(a,ka);b?q(c):n(c)}function x(){y(-1,!1);return!0}function s(){y(1,!1);return!0}function v(){y(-1,!0);return!0}function A(){y(1,!0);return!0}function F(a,b){var c=C.getCursor(l).getStepCounter().countStepsToLineBoundary(a,ka);b?q(c):n(c)}function D(){F(-1,!1);return!0}function O(){F(1,!1);return!0}function B(){F(-1,!0);return!0}function P(){F(1,!0);return!0}function z(){var a=C.getParagraphElement(C.getCursor(l).getNode()),b,c;runtime.assert(Boolean(a),
"SessionController: Cursor outside paragraph");c=C.getDistanceFromCursor(l,a,0);b=gui.SelectionMover.createPositionIterator(C.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),va.isParagraph(a)&&(c=C.getDistanceFromCursor(l,a,0));q(c);return!0}function J(){var a=C.getParagraphElement(C.getCursor(l).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(C.getRootNode());b.moveToEndOfNode(a);
for(c=C.getDistanceFromCursor(l,b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),va.isParagraph(a)&&(b.moveToEndOfNode(a),c=C.getDistanceFromCursor(l,b.container(),b.unfilteredDomOffset()));q(c);return!0}function X(a,b){var c=gui.SelectionMover.createPositionIterator(C.getRootNode());0<a&&c.moveToEnd();c=C.getDistanceFromCursor(l,c.container(),c.unfilteredDomOffset());b?q(c):n(c)}function da(){X(-1,!1);return!0}function V(){X(1,!1);return!0}function qa(){X(-1,!0);
return!0}function aa(){X(1,!0);return!0}function ca(){var a=gui.SelectionMover.createPositionIterator(C.getRootNode()),b;b=-C.getDistanceFromCursor(l,a.container(),a.unfilteredDomOffset());a.moveToEnd();b+=C.getDistanceFromCursor(l,a.container(),a.unfilteredDomOffset());k.enqueue(g(0,b));return!0}function Q(a){0>a.length&&(a.position+=a.length,a.length=-a.length);return a}function Y(a){var b=new ops.OpRemoveText;b.init({memberid:l,position:a.position,length:a.length});return b}function T(){var a=
Q(C.getCursorSelection(l)),b=null;0===a.length?0<a.position&&C.getPositionInTextNode(a.position-1)&&(b=new ops.OpRemoveText,b.init({memberid:l,position:a.position-1,length:1}),k.enqueue(b)):(b=Y(a),k.enqueue(b));return!0}function N(){var a=Q(C.getCursorSelection(l)),b=null;0===a.length?C.getPositionInTextNode(a.position+1)&&(b=new ops.OpRemoveText,b.init({memberid:l,position:a.position,length:1}),k.enqueue(b)):(b=Y(a),k.enqueue(b));return null!==b}function E(){var a=Q(C.getCursorSelection(l));0!==
a.length&&k.enqueue(Y(a));return!0}function K(a){var b=Q(C.getCursorSelection(l)),c=null;0<b.length&&(c=Y(b),k.enqueue(c));c=new ops.OpInsertText;c.init({memberid:l,position:b.position,text:a});k.enqueue(c)}function R(){var a=C.getCursorPosition(l),b;b=new ops.OpSplitParagraph;b.init({memberid:l,position:a});k.enqueue(b);return!0}function L(){var a=C.getCursor(l),b=W.getSelection();a&&(b.removeAllRanges(),b.addRange(a.getSelectedRange().cloneRange()))}function S(a){var b=C.getCursor(l);b.getSelectedRange().collapsed||
(wa.setDataFromRange(a,b.getSelectedRange())?(b=new ops.OpRemoveText,a=Q(k.getOdtDocument().getCursorSelection(l)),b.init({memberid:l,position:a.position,length:a.length}),k.enqueue(b)):runtime.log("Cut operation failed"))}function ha(){return!1!==C.getCursor(l).getSelectedRange().collapsed}function ea(a){var b=C.getCursor(l);b.getSelectedRange().collapsed||wa.setDataFromRange(a,b.getSelectedRange())||runtime.log("Cut operation failed")}function fa(a){var b;W.clipboardData&&W.clipboardData.getData?
b=W.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(K(b),a.preventDefault?a.preventDefault():a.returnValue=!1)}function M(){return!1}function G(a){if(ba)ba.onOperationExecuted(a)}function na(a){C.emit(ops.OdtDocument.signalUndoStackChanged,a)}function ia(){return ba?(ba.moveBackward(1),L(),!0):!1}function H(){return ba?(ba.moveForward(1),L(),!0):!1}function ga(a,b){var c=C.getCursorSelection(l),d=new ops.OpApplyDirectStyling,f=
{};f[a]=b;d.init({memberid:l,position:c.position,length:c.length,setProperties:{"style:text-properties":f}});k.enqueue(d)}function Z(){var a=C.getCursor(l).getSelectedRange(),a=sa.isBold(a)?"normal":"bold";ga("fo:font-weight",a);return!0}function ja(){var a=C.getCursor(l).getSelectedRange(),a=sa.isItalic(a)?"normal":"italic";ga("fo:font-style",a);return!0}function ra(){var a=C.getCursor(l).getSelectedRange(),a=sa.hasUnderline(a)?"none":"solid";ga("style:text-underline-style",a);return!0}var W=runtime.getWindow(),
C=k.getOdtDocument(),la=new core.DomUtils,va=new odf.OdfUtils,wa=new gui.Clipboard,oa=new gui.ClickHandler,I=new gui.KeyboardHandler,ta=new gui.KeyboardHandler,sa=new gui.StyleHelper(C.getFormatting()),ka=new core.PositionFilterChain,ma=C.getPositionFilter(),ba=null;runtime.assert(null!==W,"Expected to be run in an environment which has a global window, like a browser.");ka.addFilter("BaseFilter",ma);ka.addFilter("RootFilter",C.createRootFilter(l));this.startEditing=function(){var a;a=C.getOdfCanvas().getElement();
h(a,"keydown",I.handleEvent);h(a,"keypress",ta.handleEvent);h(a,"keyup",b);h(a,"beforecut",ha,!0);h(a,"cut",S);h(a,"copy",ea);h(a,"beforepaste",M,!0);h(a,"paste",fa);h(W,"mouseup",oa.handleMouseUp);h(a,"contextmenu",c);C.subscribe(ops.OdtDocument.signalOperationExecuted,L);C.subscribe(ops.OdtDocument.signalOperationExecuted,G);a=new ops.OpAddCursor;a.init({memberid:l});k.enqueue(a);ba&&ba.saveInitialState()};this.endEditing=function(){var a;C.unsubscribe(ops.OdtDocument.signalOperationExecuted,G);
C.unsubscribe(ops.OdtDocument.signalOperationExecuted,L);a=C.getOdfCanvas().getElement();e(a,"keydown",I.handleEvent);e(a,"keypress",ta.handleEvent);e(a,"keyup",b);e(a,"cut",S);e(a,"beforecut",ha);e(a,"copy",ea);e(a,"paste",fa);e(a,"beforepaste",M);e(W,"mouseup",oa.handleMouseUp);e(a,"contextmenu",c);a=new ops.OpRemoveCursor;a.init({memberid:l});k.enqueue(a);ba&&ba.resetInitialState()};this.getInputMemberId=function(){return l};this.getSession=function(){return k};this.setUndoManager=function(a){ba&&
ba.unsubscribe(gui.UndoManager.signalUndoStackChanged,na);if(ba=a)ba.setOdtDocument(C),ba.setPlaybackFunction(function(a){a.execute(C)}),ba.subscribe(gui.UndoManager.signalUndoStackChanged,na)};this.getUndoManager=function(){return ba};(function(){var a=-1!==W.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;I.bind(c.Tab,b.None,function(){K("\t");return!0});I.bind(c.Left,b.None,p);I.bind(c.Right,b.None,r);I.bind(c.Up,b.None,x);I.bind(c.Down,
b.None,s);I.bind(c.Backspace,b.None,T);I.bind(c.Delete,b.None,N);I.bind(c.Left,b.Shift,w);I.bind(c.Right,b.Shift,u);I.bind(c.Up,b.Shift,v);I.bind(c.Down,b.Shift,A);I.bind(c.Home,b.None,D);I.bind(c.End,b.None,O);I.bind(c.Home,b.Ctrl,da);I.bind(c.End,b.Ctrl,V);I.bind(c.Home,b.Shift,B);I.bind(c.End,b.Shift,P);I.bind(c.Up,b.CtrlShift,z);I.bind(c.Down,b.CtrlShift,J);I.bind(c.Home,b.CtrlShift,qa);I.bind(c.End,b.CtrlShift,aa);a?(I.bind(c.Clear,b.None,E),I.bind(c.Left,b.Meta,D),I.bind(c.Right,b.Meta,O),I.bind(c.Home,
b.Meta,da),I.bind(c.End,b.Meta,V),I.bind(c.Left,b.MetaShift,B),I.bind(c.Right,b.MetaShift,P),I.bind(c.Up,b.AltShift,z),I.bind(c.Down,b.AltShift,J),I.bind(c.Up,b.MetaShift,qa),I.bind(c.Down,b.MetaShift,aa),I.bind(c.A,b.Meta,ca),I.bind(c.B,b.Meta,Z),I.bind(c.I,b.Meta,ja),I.bind(c.U,b.Meta,ra),I.bind(c.Z,b.Meta,ia),I.bind(c.Z,b.MetaShift,H)):(I.bind(c.A,b.Ctrl,ca),I.bind(c.B,b.Ctrl,Z),I.bind(c.I,b.Ctrl,ja),I.bind(c.U,b.Ctrl,ra),I.bind(c.Z,b.Ctrl,ia),I.bind(c.Z,b.CtrlShift,H));ta.setDefault(function(a){var b;
b=null===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(K(b),!0)});ta.bind(c.Enter,b.None,R);oa.subscribe(gui.ClickHandler.signalSingleClick,function(a){var b=a.target,c=null;if("annotationRemoveButton"===b.className){a=c=la.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0];for(var b=0,c=gui.SelectionMover.createPositionIterator(C.getRootNode()),f=new core.LoopWatchDog(1E3),
e=!1;c.nextPosition();)if(f.check(),e=Boolean(a.compareDocumentPosition(c.container())&Node.DOCUMENT_POSITION_CONTAINED_BY),1===ma.acceptPosition(c)){if(e)break;b+=1}c=0;f=gui.SelectionMover.createPositionIterator(C.getRootNode());e=!1;f.setUnfilteredPosition(a,0);do{e=Boolean(a.compareDocumentPosition(f.container())&Node.DOCUMENT_POSITION_CONTAINED_BY);if(!e&&a!==f.container())break;1===ma.acceptPosition(f)&&(c+=1)}while(f.nextPosition());a=c;c=new ops.OpRemoveAnnotation;c.init({memberid:l,position:b,
length:a});k.enqueue(c)}else d(a)});oa.subscribe(gui.ClickHandler.signalDoubleClick,t);oa.subscribe(gui.ClickHandler.signalTripleClick,m)})()};return gui.SessionController}();
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
ops.MemberModel=function(){};ops.MemberModel.prototype.getMemberDetailsAndUpdates=function(k,l){};ops.MemberModel.prototype.unsubscribeMemberDetailsUpdates=function(k,l){};ops.MemberModel.prototype.shutdown=function(){};
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
ops.TrivialMemberModel=function(){this.getMemberDetailsAndUpdates=function(k,l){l(k,null)};this.unsubscribeMemberDetailsUpdates=function(k,l){};this.shutdown=function(){}};
// Input 70
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
ops.NowjsMemberModel=function(k){var l={},h={},e=k.getNowObject();this.getMemberDetailsAndUpdates=function(b,g){var a=b.split("___")[0],f=l[a],d=h[a]||[],c;h[a]=d;runtime.assert(void 0!==g,"missing callback");for(c=0;c<d.length&&(d[c].subscriber!==g||d[c].memberId!==b);c+=1);c<d.length?runtime.log("double subscription request for "+b+" in NowjsMemberModel::getMemberDetailsAndUpdates"):(d.push({memberId:b,subscriber:g}),1===d.length&&e.subscribeUserDetailsUpdates(a));f&&g(b,f)};this.unsubscribeMemberDetailsUpdates=
function(b,g){var a,f=b.split("___")[0],d=h[f];runtime.assert(void 0!==g,"missing subscriber parameter or null");runtime.assert(d,"tried to unsubscribe when no one is subscribed ('"+b+"')");if(d){for(a=0;a<d.length&&(d[a].subscriber!==g||d[a].memberId!==b);a+=1);runtime.assert(a<d.length,"tried to unsubscribe when not subscribed for memberId '"+b+"'");d.splice(a,1);0===d.length&&(runtime.log("no more subscribers for: "+b),delete h[f],delete l[f],e.unsubscribeUserDetailsUpdates(f))}};this.shutdown=
function(){};e.updateUserDetails=function(b,e){var a=e?{userid:e.uid,fullname:e.fullname,imageurl:"/user/"+e.avatarId+"/avatar.png",color:e.color}:null,f,d;if(f=h[b])for(l[b]=a,d=0;d<f.length;d+=1)f[d].subscriber(f[d].memberId,a)};runtime.assert("ready"===e.networkStatus,"network not ready")};
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
ops.PullBoxMemberModel=function(k,l){function h(){var a,d=Object.keys(g);runtime.log("member-list request for : "+d.join(","));l.call({command:"query_memberdata_list",args:{es_id:k,member_ids:d}},function(c){var d=runtime.fromJson(c),e;runtime.log("member-list reply: "+c);if(d.hasOwnProperty("memberdata_list"))for(c=d.memberdata_list,a=0;a<c.length;a+=1){if(d={memberid:c[a].member_id,fullname:c[a].display_name,imageurl:c[a].avatar_url,color:c[a].color},e=b.hasOwnProperty(d.memberid)?b[d.memberid]:
null,!e||e.fullname!==d.fullname||e.imageurl!==d.imageurl||e.color!==d.color){var h=e=void 0;if(e=g[d.memberid])for(b[d.memberid]=d,h=0;h<e.length;h+=1)e[h](d.memberid,d)}}else runtime.log("Meh, memberdata list broken: "+c)})}function e(){a&&(h(),runtime.setTimeout(e,2E4))}var b={},g={},a=!1;this.getMemberDetailsAndUpdates=function(f,d){var c=b[f],k=g[f]||[],l;g[f]=k;runtime.assert(void 0!==d,"missing callback");for(l=0;l<k.length&&k[l]!==d;l+=1);l<k.length?runtime.log("double subscription request for "+
f+" in PullBoxMemberModel::getMemberDetailsAndUpdates"):(k.push(d),1===k.length&&h());c&&d(f,c);a||(a=!0,runtime.setTimeout(e,2E4))};this.unsubscribeMemberDetailsUpdates=function(f,d){var c,e=g[f];runtime.assert(void 0!==d,"missing subscriber parameter or null");runtime.assert(e,"tried to unsubscribe when no one is subscribed ('"+f+"')");if(e){for(c=0;c<e.length&&e[c]!==d;c+=1);runtime.assert(c<e.length,"tried to unsubscribe when not subscribed for memberId '"+f+"'");e.splice(c,1);if(0===e.length){runtime.log("no more subscribers for: "+
f);delete g[f];delete b[f];a:{var h;if(a){for(h in g)if(g.hasOwnProperty(h))break a;a=!1}}}}};this.shutdown=function(){};runtime.assert("ready"===l.networkStatus(),"network not ready")};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: http://gitorious.org/webodf/webodf/
*/
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(k){};ops.OperationRouter.prototype.setPlaybackFunction=function(k){};ops.OperationRouter.prototype.push=function(k){};ops.OperationRouter.prototype.shutdown=function(k){};
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
ops.TrivialOperationRouter=function(){var k,l;this.setOperationFactory=function(h){k=h};this.setPlaybackFunction=function(h){l=h};this.push=function(h){h=h.spec();h.timestamp=(new Date).getTime();h=k.create(h);l(h)};this.shutdown=function(h){h()}};
// Input 74
ops.NowjsOperationRouter=function(k,l,h){function e(a){var e;e=b.create(a);runtime.log(" op in: "+runtime.toJson(a));if(null!==e)if(a=Number(a.server_seq),runtime.assert(!isNaN(a),"server seq is not a number"),a===f+1)for(g(e),f=a,c=0,e=f+1;d.hasOwnProperty(e);e+=1)g(d[e]),delete d[e],runtime.log("op with server seq "+a+" taken from hold (reordered)");else runtime.assert(a!==f+1,"received incorrect order from server"),runtime.assert(!d.hasOwnProperty(a),"reorder_queue has incoming op"),runtime.log("op with server seq "+
a+" put on hold"),d[a]=e;else runtime.log("ignoring invalid incoming opspec: "+a)}var b,g,a=h.getNowObject(),f=-1,d={},c=0,t=1E3;this.setOperationFactory=function(a){b=a};this.setPlaybackFunction=function(a){g=a};a.ping=function(a){null!==l&&a(l)};a.receiveOp=function(a,b){a===k&&e(b)};this.push=function(b){b=b.spec();runtime.assert(null!==l,"Router sequence N/A without memberid");t+=1;b.client_nonce="C:"+l+":"+t;b.parent_op=f+"+"+c;c+=1;runtime.log("op out: "+runtime.toJson(b));a.deliverOp(k,b)};
this.requestReplay=function(b){a.requestReplay(k,function(a){runtime.log("replaying: "+runtime.toJson(a));e(a)},function(a){runtime.log("replay done ("+a+" ops).");b&&b()})};this.shutdown=function(a){}};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
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
ops.PullBoxOperationRouter=function(k,l,h){function e(a){var b,c,e,f=[];for(b=0;b<a.length;)if(e=d.create(a[b]),null!==e&&e.merge){for(c=b+1;c<a.length&&e.merge(a[c]);c+=1)runtime.log("Merged: "+a[b].optype+" with "+a[c].optype);f.push(e.spec());b=c}else f.push(a[b]),b+=1;runtime.log("Merged: from "+a.length+" to "+f.length+" specs");return f}function b(){function a(){var b,e,f;n=!1;for(f=(new Date).getTime();0<y.length&&!(500<(new Date).getTime()-f);)b=y.shift(),e=d.create(b),runtime.log(" op in: "+
runtime.toJson(b)),null!==e?t(e):runtime.log("ignoring invalid incoming opspec: "+b);0<y.length?(n=!0,runtime.getWindow().setTimeout(a,1)):c&&(c(),c=null)}n||a()}function g(a){var b;if(!a)return runtime.assert(!1,"no opspecs received!"),!1;b=x.transform(u,a);if(!b)return!1;for(a=0;a<b.opsB.length;a+=1)y.push(b.opsB[a].spec());u=[];for(a=0;a<b.opsA.length;a+=1)u.push(b.opsA[a].spec());return!0}function a(){function c(){var b={active:!0};m=b;runtime.getWindow().setTimeout(function(){runtime.log("Pulling activated:"+
b.active);m=null;b.active&&a()},8E3)}function d(){var a;p||r||(p=!0,a=u,u=[],h.call({command:"sync_ops",args:{es_id:k,member_id:l,seq_head:String(w),client_ops:a}},function(f){var h=!1,k=runtime.fromJson(f);runtime.log("sync-ops reply: "+f);"new_ops"===k.result?0<k.ops.length&&(0===u.length?(f=e(k.ops),y=y.concat(f)):(runtime.log("meh, have new ops locally meanwhile, have to do transformations."),r=!g(e(k.ops))),w=k.head_seq):"added"===k.result?(runtime.log("All added to server"),w=k.head_seq):"conflict"===
k.result?(u=a.concat(u),runtime.log("meh, server has new ops meanwhile, have to do transformations."),r=!g(e(k.ops)),w=k.head_seq,r||(h=!0)):runtime.assert(!1,"Unexpected result on sync-ops call: "+k.result);p=!1;r?runtime.assert(!1,"Sorry to tell:\nwe hit a pair of operations in a state which yet need to be supported for transformation against each other.\nClient disconnected from session, no further editing accepted.\n\nPlease reconnect manually for now."):(h?d():(runtime.log("Preparing next: "+
(0===u.length)),0===u.length&&c()),b())}))}d()}function f(){p||q||(q=!0,m&&(m.active=!1),runtime.getWindow().setTimeout(function(){runtime.log("Pushing activated");q=!1;a()},3E3))}var d,c,t,m=null,q=!1,n=!1,p=!1,r=!1,w="",u=[],y=[],x=new ops.OperationTransformer;this.requestReplay=function(b){c=b;a()};this.setOperationFactory=function(a){d=a;x.setOperationFactory(a)};this.setPlaybackFunction=function(a){t=a};this.push=function(a){var b=a.spec();r||0<y.length||(b.timestamp=(new Date).getTime(),a=d.create(b),
t(a),u.push(b),f())};this.shutdown=function(b){a();runtime.getWindow().setTimeout(b,2E3)}};
// Input 76
gui.EditInfoHandle=function(k){var l=[],h,e=k.ownerDocument,b=e.documentElement.namespaceURI;this.setEdits=function(g){l=g;var a,f,d,c;h.innerHTML="";for(g=0;g<l.length;g+=1)a=e.createElementNS(b,"div"),a.className="editInfo",f=e.createElementNS(b,"span"),f.className="editInfoColor",f.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),d=e.createElementNS(b,"span"),d.className="editInfoAuthor",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),
c=e.createElementNS(b,"span"),c.className="editInfoTime",c.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),c.innerHTML=l[g].time,a.appendChild(f),a.appendChild(d),a.appendChild(c),h.appendChild(a)};this.show=function(){h.style.display="block"};this.hide=function(){h.style.display="none"};h=e.createElementNS(b,"div");h.setAttribute("class","editInfoHandle");h.style.display="none";k.appendChild(h)};
// Input 77
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(k,l){function h(b,d){return runtime.getWindow().setTimeout(function(){a.style.opacity=b},d)}var e=this,b,g,a,f,d;this.addEdit=function(b,e){var l=Date.now()-e;k.addEdit(b,e);g.setEdits(k.getSortedEdits());a.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",b);if(f){var q=f;runtime.getWindow().clearTimeout(q)}d&&(q=d,runtime.getWindow().clearTimeout(q));1E4>l?(h(1,0),f=h(0.5,1E4-l),d=h(0.2,2E4-l)):1E4<=l&&2E4>l?(h(0.5,0),d=h(0.2,2E4-l)):h(0.2,0)};this.getEdits=
function(){return k.getEdits()};this.clearEdits=function(){k.clearEdits();g.setEdits([]);a.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&a.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return k};this.show=function(){a.style.display="block"};this.hide=function(){e.hideHandle();a.style.display="none"};this.showHandle=function(){g.show()};this.hideHandle=function(){g.hide()};(function(){var c=k.getOdtDocument().getDOM();a=c.createElementNS(c.documentElement.namespaceURI,
"div");a.setAttribute("class","editInfoMarker");a.onmouseover=function(){e.showHandle()};a.onmouseout=function(){e.hideHandle()};b=k.getNode();b.appendChild(a);g=new gui.EditInfoHandle(b);l||e.hide()})()};
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
runtime.loadClass("gui.Caret");runtime.loadClass("ops.TrivialMemberModel");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
gui.SessionView=function(){return function(k,l,h){function e(a,b,d){function e(b,d,f){d=b+'[editinfo|memberid^="'+a+'"]'+f+d;a:{var g=c.firstChild;for(b=b+'[editinfo|memberid^="'+a+'"]'+f;g;){if(g.nodeType===Node.TEXT_NODE&&0===g.data.indexOf(b)){b=g;break a}g=g.nextSibling}b=null}b?b.data=d:c.appendChild(document.createTextNode(d))}e("div.editInfoMarker","{ background-color: "+d+"; }","");e("span.editInfoColor","{ background-color: "+d+"; }","");e("span.editInfoAuthor",'{ content: "'+b+'"; }',":before");
e("dc|creator",'{ content: "'+b+'"; display: none;}',":before");e("dc|creator","{ background-color: "+d+"; }","")}function b(a){var b,c;for(c in t)t.hasOwnProperty(c)&&(b=t[c],a?b.show():b.hide())}function g(a){h.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function a(a,b){var c=h.getCaret(a);void 0===b?runtime.log('MemberModel sent undefined data for member "'+a+'".'):(null===b&&(b={memberid:a,fullname:"Unknown Identity",color:"black",imageurl:"avatar-joe.png"}),c&&(c.setAvatarImageUrl(b.imageurl),
c.setColor(b.color)),e(a,b.fullname,b.color))}function f(b){var c=b.getMemberId(),d=l.getMemberModel();h.registerCursor(b,q,n);a(c,null);d.getMemberDetailsAndUpdates(c,a);runtime.log("+++ View here +++ eagerly created an Caret for '"+c+"'! +++")}function d(b){var c=!1,d;for(d in t)if(t.hasOwnProperty(d)&&t[d].getEditInfo().getEdits().hasOwnProperty(b)){c=!0;break}c||l.getMemberModel().unsubscribeMemberDetailsUpdates(b,a)}var c,t={},m=void 0!==k.editInfoMarkersInitiallyVisible?Boolean(k.editInfoMarkersInitiallyVisible):
!0,q=void 0!==k.caretAvatarsInitiallyVisible?Boolean(k.caretAvatarsInitiallyVisible):!0,n=void 0!==k.caretBlinksOnRangeSelect?Boolean(k.caretBlinksOnRangeSelect):!0;this.showEditInfoMarkers=function(){m||(m=!0,b(m))};this.hideEditInfoMarkers=function(){m&&(m=!1,b(m))};this.showCaretAvatars=function(){q||(q=!0,g(q))};this.hideCaretAvatars=function(){q&&(q=!1,g(q))};this.getSession=function(){return l};this.getCaret=function(a){return h.getCaret(a)};(function(){var a=l.getOdtDocument(),b=document.getElementsByTagName("head")[0];
a.subscribe(ops.OdtDocument.signalCursorAdded,f);a.subscribe(ops.OdtDocument.signalCursorRemoved,d);a.subscribe(ops.OdtDocument.signalParagraphChanged,function(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;var d,e="",f=b.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0];f?(e=f.getAttributeNS("urn:webodf:names:editinfo","id"),d=t[e]):(e=Math.random().toString(),d=new ops.EditInfo(b,l.getOdtDocument()),d=new gui.EditInfoMarker(d,m),f=b.getElementsByTagNameNS("urn:webodf:names:editinfo",
"editinfo")[0],f.setAttributeNS("urn:webodf:names:editinfo","id",e),t[e]=d);d.addEdit(c,new Date(a))});c=document.createElementNS(b.namespaceURI,"style");c.type="text/css";c.media="screen, print, handheld, projection";c.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));c.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));b.appendChild(c)})()}}();
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
runtime.loadClass("gui.Caret");
gui.CaretManager=function(k){function l(a){return d.hasOwnProperty(a)?d[a]:null}function h(){return k.getSession().getOdtDocument().getOdfCanvas().getElement()}function e(a){a===k.getInputMemberId()&&h().removeAttribute("tabindex");delete d[a]}function b(a){a=a.getMemberId();a===k.getInputMemberId()&&(a=l(a))&&a.refreshCursorBlinking()}function g(a){a.memberId===k.getInputMemberId()&&(a=l(a.memberId))&&a.ensureVisible()}function a(){var a=l(k.getInputMemberId());a&&a.setFocus()}function f(){var a=
l(k.getInputMemberId());a&&a.removeFocus()}var d={};this.registerCursor=function(a,b,e){var f=a.getMemberId(),g=h();b=new gui.Caret(a,b,e);d[f]=b;f===k.getInputMemberId()&&(runtime.log("Starting to track input on new cursor of "+f),a.handleUpdate=b.ensureVisible,g.setAttribute("tabindex",0),g.focus());return b};this.getCaret=l;this.getCarets=function(){return Object.keys(d).map(function(a){return d[a]})};(function(){var c=k.getSession().getOdtDocument(),d=h();c.subscribe(ops.OdtDocument.signalParagraphChanged,
g);c.subscribe(ops.OdtDocument.signalCursorMoved,b);c.subscribe(ops.OdtDocument.signalCursorRemoved,e);d.onfocus=a;d.onblur=f})()};
// Input 80
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
gui.PresenterUI=function(){var k=new xmldom.XPath,l=runtime.getWindow();return function(h){var e=this;e.setInitialSlideMode=function(){e.startSlideMode("single")};e.keyDownHandler=function(b){if(!b.target.isContentEditable&&"input"!==b.target.nodeName)switch(b.keyCode){case 84:e.toggleToolbar();break;case 37:case 8:e.prevSlide();break;case 39:case 32:e.nextSlide();break;case 36:e.firstSlide();break;case 35:e.lastSlide()}};e.root=function(){return e.odf_canvas.odfContainer().rootElement};e.firstSlide=
function(){e.slideChange(function(b,e){return 0})};e.lastSlide=function(){e.slideChange(function(b,e){return e-1})};e.nextSlide=function(){e.slideChange(function(b,e){return b+1<e?b+1:-1})};e.prevSlide=function(){e.slideChange(function(b,e){return 1>b?-1:b-1})};e.slideChange=function(b){var g=e.getPages(e.odf_canvas.odfContainer().rootElement),a=-1,f=0;g.forEach(function(b){b=b[1];b.hasAttribute("slide_current")&&(a=f,b.removeAttribute("slide_current"));f+=1});b=b(a,g.length);-1===b&&(b=a);g[b][1].setAttribute("slide_current",
"1");document.getElementById("pagelist").selectedIndex=b;"cont"===e.slide_mode&&l.scrollBy(0,g[b][1].getBoundingClientRect().top-30)};e.selectSlide=function(b){e.slideChange(function(e,a){return b>=a||0>b?-1:b})};e.scrollIntoContView=function(b){var g=e.getPages(e.odf_canvas.odfContainer().rootElement);0!==g.length&&l.scrollBy(0,g[b][1].getBoundingClientRect().top-30)};e.getPages=function(b){b=b.getElementsByTagNameNS(odf.Namespaces.drawns,"page");var e=[],a;for(a=0;a<b.length;a+=1)e.push([b[a].getAttribute("draw:name"),
b[a]]);return e};e.fillPageList=function(b,g){for(var a=e.getPages(b),f,d,c;g.firstChild;)g.removeChild(g.firstChild);for(f=0;f<a.length;f+=1)d=document.createElement("option"),c=k.getODFElementsWithXPath(a[f][1],'./draw:frame[@presentation:class="title"]//draw:text-box/text:p',xmldom.XPath),c=0<c.length?c[0].textContent:a[f][0],d.textContent=f+1+": "+c,g.appendChild(d)};e.startSlideMode=function(b){var g=document.getElementById("pagelist"),a=e.odf_canvas.slidevisibilitycss().sheet;for(e.slide_mode=
b;0<a.cssRules.length;)a.deleteRule(0);e.selectSlide(0);"single"===e.slide_mode?(a.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }",0),a.insertRule("draw|page[slide_current]  { z-index:2;}",1),a.insertRule("draw|page  { -webkit-transform: scale(1);}",2),e.fitToWindow(),l.addEventListener("resize",e.fitToWindow,!1)):"cont"===e.slide_mode&&l.removeEventListener("resize",e.fitToWindow,!1);e.fillPageList(e.odf_canvas.odfContainer().rootElement,g)};e.toggleToolbar=function(){var b,
g,a;b=e.odf_canvas.slidevisibilitycss().sheet;g=-1;for(a=0;a<b.cssRules.length;a+=1)if(".toolbar"===b.cssRules[a].cssText.substring(0,8)){g=a;break}-1<g?b.deleteRule(g):b.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }",0)};e.fitToWindow=function(){var b=e.getPages(e.root()),g=(l.innerHeight-40)/b[0][1].clientHeight,b=(l.innerWidth-10)/b[0][1].clientWidth,g=g<b?g:b,b=e.odf_canvas.slidevisibilitycss().sheet;b.deleteRule(2);b.insertRule("draw|page { \n-moz-transform: scale("+
g+"); \n-moz-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -webkit-transform: scale("+g+"); -o-transform-origin: 0% 0%; -o-transform: scale("+g+"); -ms-transform-origin: 0% 0%; -ms-transform: scale("+g+"); }",2)};e.load=function(b){e.odf_canvas.load(b)};e.odf_element=h;e.odf_canvas=new odf.OdfCanvas(e.odf_element);e.odf_canvas.addListener("statereadychange",e.setInitialSlideMode);e.slide_mode="undefined";document.addEventListener("keydown",e.keyDownHandler,!1)}}();
// Input 81
runtime.loadClass("core.PositionIterator");runtime.loadClass("core.Cursor");
gui.XMLEdit=function(k,l){function h(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):a["on"+b]=c}function e(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(){var a=k.ownerDocument.defaultView.getSelection();!a||(0>=a.rangeCount||!p)||(a=a.getRangeAt(0),p.setPoint(a.startContainer,a.startOffset))}function g(){var a=k.ownerDocument.defaultView.getSelection(),b,c;a.removeAllRanges();p&&p.node()&&(b=p.node(),c=b.ownerDocument.createRange(),
c.setStart(b,p.position()),c.collapse(!0),a.addRange(c))}function a(a){var c=a.charCode||a.keyCode;if(p=null,p&&37===c)b(),p.stepBackward(),g();else if(16<=c&&20>=c||33<=c&&40>=c)return;e(a)}function f(a){e(a)}function d(a){for(var b=a.firstChild;b&&b!==a;)b.nodeType===Node.ELEMENT_NODE&&d(b),b=b.nextSibling||b.parentNode;var c,e,f,b=a.attributes;c="";for(f=b.length-1;0<=f;f-=1)e=b.item(f),c=c+" "+e.nodeName+'="'+e.nodeValue+'"';a.setAttribute("customns_name",a.nodeName);a.setAttribute("customns_atts",
c);b=a.firstChild;for(e=/^\s*$/;b&&b!==a;)c=b,b=b.nextSibling||b.parentNode,c.nodeType===Node.TEXT_NODE&&e.test(c.nodeValue)&&c.parentNode.removeChild(c)}function c(a,b){for(var d=a.firstChild,e,f,g;d&&d!==a;){if(d.nodeType===Node.ELEMENT_NODE)for(c(d,b),e=d.attributes,g=e.length-1;0<=g;g-=1)f=e.item(g),"http://www.w3.org/2000/xmlns/"!==f.namespaceURI||b[f.nodeValue]||(b[f.nodeValue]=f.localName);d=d.nextSibling||d.parentNode}}function t(){var a=k.ownerDocument.createElement("style"),b;b={};c(k,b);
var d={},e,f,g=0;for(e in b)if(b.hasOwnProperty(e)&&e){f=b[e];if(!f||d.hasOwnProperty(f)||"xmlns"===f){do f="ns"+g,g+=1;while(d.hasOwnProperty(f));b[e]=f}d[f]=!0}a.type="text/css";b="@namespace customns url(customns);\n"+m;a.appendChild(k.ownerDocument.createTextNode(b));l=l.parentNode.replaceChild(a,l)}var m,q,n,p=null;k.id||(k.id="xml"+String(Math.random()).substring(2));q="#"+k.id+" ";m=q+"*,"+q+":visited, "+q+":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n"+
q+":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n"+q+":after {color: blue; content: '</' attr(customns_name) '>';}\n"+q+"{overflow: auto;}\n";(function(b){h(b,"click",f);h(b,"keydown",a);h(b,"drop",e);h(b,"dragend",e);h(b,"beforepaste",e);h(b,"paste",e)})(k);this.updateCSS=t;this.setXML=function(a){a=a.documentElement||a;n=a=k.ownerDocument.importNode(a,!0);for(d(a);k.lastChild;)k.removeChild(k.lastChild);k.appendChild(a);t();p=new core.PositionIterator(a)};this.getXML=
function(){return n}};
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(k,l){};gui.UndoManager.prototype.unsubscribe=function(k,l){};gui.UndoManager.prototype.setOdtDocument=function(k){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(k){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(k){};gui.UndoManager.prototype.moveBackward=function(k){};gui.UndoManager.prototype.onOperationExecuted=function(k){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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
gui.UndoStateRules=function(){function k(h){return h.spec().optype}function l(h){switch(k(h)){case "MoveCursor":case "AddCursor":case "RemoveCursor":return!1;default:return!0}}this.getOpType=k;this.isEditOperation=l;this.isPartOfOperationSet=function(h,e){if(l(h)){if(0===e.length)return!0;var b;if(b=l(e[e.length-1]))a:{b=e.filter(l);var g=k(h),a;b:switch(g){case "RemoveText":case "InsertText":a=!0;break b;default:a=!1}if(a&&g===k(b[0])){if(1===b.length){b=!0;break a}g=b[b.length-2].spec().position;
b=b[b.length-1].spec().position;a=h.spec().position;if(b===a-(b-g)){b=!0;break a}}b=!1}return b}return!0}};
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
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
gui.TrivialUndoManager=function(k){function l(){r.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:a.hasUndoStates(),redoAvailable:a.hasRedoStates()})}function h(){q!==c&&q!==n[n.length-1]&&n.push(q)}function e(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);f.normalizeTextNodes(b)}function b(a){return Object.keys(a).map(function(b){return a[b]})}function g(a){function c(a){var b=a.spec();if(f[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete f[b.memberid],g-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},f={},g,h=a.pop();m.getCursors().forEach(function(a){f[a.getMemberId()]=!0});for(g=Object.keys(f).length;h&&0<g;)h.reverse(),h.forEach(c),h=a.pop();return b(d).concat(b(e))}var a=this,f=new core.DomUtils,d,c=[],t,m,q=[],n=[],p=[],r=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
w=k||new gui.UndoStateRules;this.subscribe=function(a,b){r.subscribe(a,b)};this.unsubscribe=function(a,b){r.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<n.length};this.hasRedoStates=function(){return 0<p.length};this.setOdtDocument=function(a){m=a};this.resetInitialState=function(){n.length=0;p.length=0;c.length=0;q.length=0;d=null;l()};this.saveInitialState=function(){var a=m.getOdfCanvas().odfContainer(),b=m.getOdfCanvas().getAnnotationManager();b&&b.forgetAnnotations();d=a.rootElement.cloneNode(!0);
m.getOdfCanvas().refreshAnnotations();a=d;f.getElementsByTagNameNS(a,"urn:webodf:names:cursor","cursor").forEach(e);f.getElementsByTagNameNS(a,"urn:webodf:names:cursor","anchor").forEach(e);h();n.unshift(c);q=c=g(n);n.length=0;p.length=0;l()};this.setPlaybackFunction=function(a){t=a};this.onOperationExecuted=function(a){p.length=0;w.isEditOperation(a)&&q===c||!w.isPartOfOperationSet(a,q)?(h(),q=[a],n.push(q),r.emit(gui.UndoManager.signalUndoStateCreated,{operations:q}),l()):(q.push(a),r.emit(gui.UndoManager.signalUndoStateModified,
{operations:q}))};this.moveForward=function(a){for(var b=0,c;a&&p.length;)c=p.pop(),n.push(c),c.forEach(t),a-=1,b+=1;b&&(q=n[n.length-1],l());return b};this.moveBackward=function(a){for(var b=m.getOdfCanvas(),e=b.odfContainer(),f=0;a&&n.length;)p.push(n.pop()),a-=1,f+=1;f&&(e.setRootElement(d.cloneNode(!0)),b.setOdfContainer(e,!0),r.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),m.getCursors().forEach(function(a){m.removeCursor(a.getMemberId())}),c.forEach(t),n.forEach(function(a){a.forEach(t)}),
b.refreshCSS(),q=n[n.length-1]||c,l());return f}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("odf.OdfUtils");runtime.loadClass("gui.SelectionMover");runtime.loadClass("gui.StyleHelper");runtime.loadClass("core.PositionFilterChain");
ops.OdtDocument=function(k){function l(){var a=k.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"'for OdtDocument");return a}function h(a){function b(a){for(;!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}this.acceptPosition=function(c){c=c.container();var e=d[a].getNode();return b(c)===b(e)?t:m}}function e(a){var b=
gui.SelectionMover.createPositionIterator(l());for(a+=1;0<a&&b.nextPosition();)1===q.acceptPosition(b)&&(a-=1);return b}function b(a){return f.getParagraphElement(a)}function g(a){return k.getFormatting().getStyleElement(a,"paragraph")}var a=this,f,d={},c=new core.EventNotifier([ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalStyleCreated,
ops.OdtDocument.signalStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged]),t=core.PositionFilter.FilterResult.FILTER_ACCEPT,m=core.PositionFilter.FilterResult.FILTER_REJECT,q;this.getIteratorAtPosition=e;this.upgradeWhitespacesAtPosition=function(a){a=e(a);var b,c,d;a.previousPosition();a.previousPosition();for(d=-1;1>=d;d+=1){b=a.container();c=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[c]&&f.isSignificantWhitespace(b,
c)){runtime.assert(" "===b.data[c],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var g=b.ownerDocument.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:s");g.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(c,1);0<c&&(b=b.splitText(c));b.parentNode.insertBefore(g,b);b=g;a.moveToEndOfNode(b)}a.nextPosition()}};this.getParagraphStyleElement=g;this.getParagraphElement=b;this.getParagraphStyleAttributes=function(a){return(a=g(a))?k.getFormatting().getInheritedStyleAttributes(a):
null};this.getPositionInTextNode=function(a,b){var c=gui.SelectionMover.createPositionIterator(l()),e=null,f,g=0,h=null;runtime.assert(0<=a,"position must be >= 0");1===q.acceptPosition(c)?(f=c.container(),f.nodeType===Node.TEXT_NODE&&(e=f,g=0)):a+=1;for(;0<a||null===e;){if(!c.nextPosition())return null;if(1===q.acceptPosition(c))if(a-=1,f=c.container(),f.nodeType===Node.TEXT_NODE)f!==e?(e=f,g=c.domOffset()):g+=1;else if(null!==e){if(0===a){g=e.length;break}e=null}else if(0===a){e=l().ownerDocument.createTextNode("");
f.insertBefore(e,c.rightNode());g=0;break}}if(null===e)return null;if(b&&d[b]){for(h=d[b].getNode();0===g&&h.nextSibling&&"cursor"===h.nextSibling.localName;)h.parentNode.insertBefore(h,h.nextSibling.nextSibling);h&&0<e.length&&(e=l().ownerDocument.createTextNode(""),g=0,h.parentNode.insertBefore(e,h.nextSibling))}for(;0===g&&(e.previousSibling&&"cursor"===e.previousSibling.localName)&&(f=e.previousSibling,0<e.length&&(e=l().ownerDocument.createTextNode("")),f.parentNode.insertBefore(e,f),h!==f););
for(;e.previousSibling&&e.previousSibling.nodeType===Node.TEXT_NODE;)e.previousSibling.appendData(e.data),g=e.length+e.previousSibling.length,e=e.previousSibling,e.parentNode.removeChild(e.nextSibling);return{textNode:e,offset:g}};this.fixCursorPositions=function(b){var c=a.getPositionFilter(),e,f,g;for(e in d)d.hasOwnProperty(e)&&(f=d[e],g=f.getStepCounter(),g.isPositionWalkable(c)?0===a.getCursorSelection(e).length&&f.move(0):(g=g.countStepsToValidPosition(c),f.move(g),e===b&&a.emit(ops.OdtDocument.signalCursorMoved,
f)))};this.getWalkableParagraphLength=function(a){var c=e(0),d=0;c.setUnfilteredPosition(a,0);do{if(b(c.container())!==a)break;1===q.acceptPosition(c)&&(d+=1)}while(c.nextPosition());return d};this.getDistanceFromCursor=function(a,b,c){a=d[a];var e=0;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");a&&(a=a.getStepCounter().countStepsToPosition,e=a(b,c,q));return e};this.getCursorPosition=function(b){return-a.getDistanceFromCursor(b,l(),0)};this.getCursorSelection=
function(a){var b;a=d[a];var c=0;b=0;a&&(b=a.getStepCounter().countStepsToPosition,c=-b(l(),0,q),b=b(a.getAnchorNode(),0,q));return{position:c+b,length:-b}};this.getPositionFilter=function(){return q};this.getOdfCanvas=function(){return k};this.getRootNode=l;this.getDOM=function(){return l().ownerDocument};this.getCursor=function(a){return d[a]};this.getCursors=function(){var a=[],b;for(b in d)d.hasOwnProperty(b)&&a.push(d[b]);return a};this.addCursor=function(a){runtime.assert(Boolean(a),"OdtDocument::addCursor without cursor");
var b=a.getStepCounter().countForwardSteps(1,q),c=a.getMemberId();runtime.assert(Boolean(c),"OdtDocument::addCursor has cursor without memberid");runtime.assert(!d[c],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+c);a.move(b);d[c]=a};this.removeCursor=function(b){var c=d[b];return c?(c.removeFromOdtDocument(),delete d[b],a.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.getMetaData=function(a){for(var b=k.odfContainer().rootElement.firstChild;b&&"meta"!==b.localName;)b=
b.nextSibling;for(b=b&&b.firstChild;b&&b.localName!==a;)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;return b?b.data:null};this.getFormatting=function(){return k.getFormatting()};this.getTextElements=function(a,b){return f.getTextElements(a,b)};this.getParagraphElements=function(a){return f.getParagraphElements(a)};this.emit=function(a,b){c.emit(a,b)};this.subscribe=function(a,b){c.subscribe(a,b)};this.unsubscribe=function(a,b){c.unsubscribe(a,b)};this.createRootFilter=
function(a){return new h(a)};q=new function(){function a(b,c,d){var e,g;if(c&&(e=f.lookLeftForCharacter(c),1===e||2===e&&(f.scanRightForAnyCharacter(d)||f.scanRightForAnyCharacter(f.nextNode(b)))))return t;e=null===c&&f.isParagraph(b);g=f.lookRightForCharacter(d);if(e)return g?t:f.scanRightForAnyCharacter(d)?m:t;if(!g)return m;c=c||f.previousNode(b);return f.scanLeftForAnyCharacter(c)?m:t}this.acceptPosition=function(b){var c=b.container(),d=c.nodeType,e,g,h;if(d!==Node.ELEMENT_NODE&&d!==Node.TEXT_NODE)return m;
if(d===Node.TEXT_NODE){if(!f.isGroupingElement(c.parentNode)||f.isWithinTrackedChanges(c.parentNode,l()))return m;d=b.unfilteredDomOffset();e=c.data;runtime.assert(d!==e.length,"Unexpected offset.");if(0<d){b=e.substr(d-1,1);if(!f.isODFWhitespace(b))return t;if(1<d)if(b=e.substr(d-2,1),!f.isODFWhitespace(b))g=t;else{if(!f.isODFWhitespace(e.substr(0,d)))return m}else h=f.previousNode(c),f.scanLeftForNonWhitespace(h)&&(g=t);if(g===t)return f.isTrailingWhitespace(c,d)?m:t;g=e.substr(d,1);return f.isODFWhitespace(g)?
m:f.scanLeftForAnyCharacter(f.previousNode(c))?m:t}h=b.leftNode();g=c;c=c.parentNode;g=a(c,h,g)}else!f.isGroupingElement(c)||f.isWithinTrackedChanges(c,l())?g=m:(h=b.leftNode(),g=b.rightNode(),g=a(c,h,g));return g}};f=new odf.OdfUtils};ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";
ops.OdtDocument.signalStyleCreated="style/created";ops.OdtDocument.signalStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";(function(){return ops.OdtDocument})();
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

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
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
ops.Session=function(k){var l=new ops.OperationFactory,h=new ops.OdtDocument(k),e=new ops.TrivialMemberModel,b=null;this.setMemberModel=function(b){e=b};this.setOperationFactory=function(e){l=e;b&&b.setOperationFactory(l)};this.setOperationRouter=function(e){b=e;e.setPlaybackFunction(function(a){a.execute(h);h.emit(ops.OdtDocument.signalOperationExecuted,a)});e.setOperationFactory(l)};this.getMemberModel=function(){return e};this.getOperationFactory=function(){return l};this.getOdtDocument=function(){return h};
this.enqueue=function(e){b.push(e)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 87
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n    /** Let's not draw selection highlight that overflows into the office|text\n     * node when selecting content across several paragraphs\n     */\n    background: transparent;\n}\n\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: inline-block;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n";
