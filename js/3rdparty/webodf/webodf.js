// Input 0
var webodf_version="0.4.2-1556-gf8a94ee";
// Input 1
function Runtime(){}Runtime.prototype.getVariable=function(g){};Runtime.prototype.toJson=function(g){};Runtime.prototype.fromJson=function(g){};Runtime.prototype.byteArrayFromString=function(g,k){};Runtime.prototype.byteArrayToString=function(g,k){};Runtime.prototype.read=function(g,k,e,n){};Runtime.prototype.readFile=function(g,k,e){};Runtime.prototype.readFileSync=function(g,k){};Runtime.prototype.loadXML=function(g,k){};Runtime.prototype.writeFile=function(g,k,e){};
Runtime.prototype.isFile=function(g,k){};Runtime.prototype.getFileSize=function(g,k){};Runtime.prototype.deleteFile=function(g,k){};Runtime.prototype.log=function(g,k){};Runtime.prototype.setTimeout=function(g,k){};Runtime.prototype.clearTimeout=function(g){};Runtime.prototype.libraryPaths=function(){};Runtime.prototype.currentDirectory=function(){};Runtime.prototype.setCurrentDirectory=function(g){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};
Runtime.prototype.parseXML=function(g){};Runtime.prototype.exit=function(g){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(g,k,e){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(g,k){function e(e){var b="",h,r=e.length;for(h=0;h<r;h+=1)b+=String.fromCharCode(e[h]&255);return b}function n(e){var b="",h,r=e.length,d=[],f,a,c,p;for(h=0;h<r;h+=1)f=e[h],128>f?d.push(f):(h+=1,a=e[h],194<=f&&224>f?d.push((f&31)<<6|a&63):(h+=1,c=e[h],224<=f&&240>f?d.push((f&15)<<12|(a&63)<<6|c&63):(h+=1,p=e[h],240<=f&&245>f&&(f=(f&7)<<18|(a&63)<<12|(c&63)<<6|p&63,f-=65536,d.push((f>>10)+55296,(f&1023)+56320))))),1E3===d.length&&(b+=String.fromCharCode.apply(null,
d),d.length=0);return b+String.fromCharCode.apply(null,d)}var m;"utf8"===k?m=n(g):("binary"!==k&&this.log("Unsupported encoding: "+k),m=e(g));return m};Runtime.getVariable=function(g){try{return eval(g)}catch(k){}};Runtime.toJson=function(g){return JSON.stringify(g)};Runtime.fromJson=function(g){return JSON.parse(g)};Runtime.getFunctionName=function(g){return void 0===g.name?(g=/function\s+(\w+)/.exec(g))&&g[1]:g.name};
function BrowserRuntime(g){function k(h,b){var d,f,a;void 0!==b?a=h:b=h;g?(f=g.ownerDocument,a&&(d=f.createElement("span"),d.className=a,d.appendChild(f.createTextNode(a)),g.appendChild(d),g.appendChild(f.createTextNode(" "))),d=f.createElement("span"),0<b.length&&"<"===b[0]?d.innerHTML=b:d.appendChild(f.createTextNode(b)),g.appendChild(d),g.appendChild(f.createElement("br"))):console&&console.log(b);"alert"===a&&alert(b)}function e(h,r,d){if(0!==d.status||d.responseText)if(200===d.status||0===d.status){if(d.response&&
"string"!==typeof d.response)"binary"===r?(r=d.response,r=new Uint8Array(r)):r=String(d.response);else if("binary"===r)if(null!==d.responseBody&&"undefined"!==String(typeof VBArray)){r=(new VBArray(d.responseBody)).toArray();d=r.length;var f,a=new Uint8Array(new ArrayBuffer(d));for(f=0;f<d;f+=1)a[f]=r[f];r=a}else r=q.byteArrayFromString(d.responseText,"binary");else r=d.responseText;b[h]=r;h={err:null,data:r}}else h={err:d.responseText||d.statusText,data:null};else h={err:"File "+h+" is empty.",data:null};
return h}function n(h,b,d){var f=new XMLHttpRequest;f.open("GET",h,d);f.overrideMimeType&&("binary"!==b?f.overrideMimeType("text/plain; charset="+b):f.overrideMimeType("text/plain; charset=x-user-defined"));return f}function m(h,r,d){function f(){var c;4===a.readyState&&(c=e(h,r,a),d(c.err,c.data))}if(b.hasOwnProperty(h))d(null,b[h]);else{var a=n(h,r,!0);a.onreadystatechange=f;try{a.send(null)}catch(c){d(c.message,null)}}}var q=this,b={};this.byteArrayFromString=function(b,e){var d;if("utf8"===e){d=
b.length;var f,a,c,p=0;for(a=0;a<d;a+=1)c=b.charCodeAt(a),p+=1+(128<c)+(2048<c);f=new Uint8Array(new ArrayBuffer(p));for(a=p=0;a<d;a+=1)c=b.charCodeAt(a),128>c?(f[p]=c,p+=1):2048>c?(f[p]=192|c>>>6,f[p+1]=128|c&63,p+=2):(f[p]=224|c>>>12&15,f[p+1]=128|c>>>6&63,f[p+2]=128|c&63,p+=3)}else for("binary"!==e&&q.log("unknown encoding: "+e),d=b.length,f=new Uint8Array(new ArrayBuffer(d)),a=0;a<d;a+=1)f[a]=b.charCodeAt(a)&255;return d=f};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;
this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=m;this.read=function(b,e,d,f){m(b,"binary",function(a,c){var p=null;if(c){if("string"===typeof c)throw"This should not happen.";p=c.subarray(e,e+d)}f(a,p)})};this.readFileSync=function(b,r){var d=n(b,r,!1),f;try{d.send(null);f=e(b,r,d);if(f.err)throw f.err;if(null===f.data)throw"No data read from "+b+".";}catch(a){throw a;}return f.data};this.writeFile=function(h,e,d){b[h]=e;var f=new XMLHttpRequest,a;f.open("PUT",h,!0);f.onreadystatechange=
function(){4===f.readyState&&(0!==f.status||f.responseText?200<=f.status&&300>f.status||0===f.status?d(null):d("Status "+String(f.status)+": "+f.responseText||f.statusText):d("File "+h+" is empty."))};a=e.buffer&&!f.sendAsBinary?e.buffer:q.byteArrayToString(e,"binary");try{f.sendAsBinary?f.sendAsBinary(a):f.send(a)}catch(c){q.log("HUH? "+c+" "+e),d(c.message)}};this.deleteFile=function(h,e){delete b[h];var d=new XMLHttpRequest;d.open("DELETE",h,!0);d.onreadystatechange=function(){4===d.readyState&&
(200>d.status&&300<=d.status?e(d.responseText):e(null))};d.send(null)};this.loadXML=function(b,e){var d=new XMLHttpRequest;d.open("GET",b,!0);d.overrideMimeType&&d.overrideMimeType("text/xml");d.onreadystatechange=function(){4===d.readyState&&(0!==d.status||d.responseText?200===d.status||0===d.status?e(null,d.responseXML):e(d.responseText,null):e("File "+b+" is empty.",null))};try{d.send(null)}catch(f){e(f.message,null)}};this.isFile=function(b,e){q.getFileSize(b,function(d){e(-1!==d)})};this.getFileSize=
function(h,e){if(b.hasOwnProperty(h)&&"string"!==typeof b[h])e(b[h].length);else{var d=new XMLHttpRequest;d.open("HEAD",h,!0);d.onreadystatechange=function(){if(4===d.readyState){var f=d.getResponseHeader("Content-Length");f?e(parseInt(f,10)):m(h,"binary",function(a,c){a?e(-1):e(c.length)})}};d.send(null)}};this.log=k;this.assert=function(b,e,d){if(!b)throw k("alert","ASSERTION FAILED:\n"+e),d&&d(),e;};this.setTimeout=function(b,e){return setTimeout(function(){b()},e)};this.clearTimeout=function(b){clearTimeout(b)};
this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.currentDirectory=function(){return""};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(b){return(new DOMParser).parseFromString(b,"text/xml")};this.exit=function(b){k("Calling exit with code "+String(b)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function g(b){var d=b.length,f,a=new Uint8Array(new ArrayBuffer(d));for(f=0;f<d;f+=1)a[f]=b[f];return a}function k(b,d,f){function a(a,d){if(a)return f(a,null);if(!d)return f("No data for "+b+".",null);if("string"===typeof d)return f(a,d);f(a,g(d))}b=m.resolve(q,b);"binary"!==d?n.readFile(b,d,a):n.readFile(b,null,a)}var e=this,n=require("fs"),m=require("path"),q="",b,h;this.byteArrayFromString=function(b,d){var f=new Buffer(b,d),a,c=f.length,p=new Uint8Array(new ArrayBuffer(c));
for(a=0;a<c;a+=1)p[a]=f[a];return p};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=k;this.loadXML=function(b,d){k(b,"utf-8",function(f,a){if(f)return d(f,null);if(!a)return d("No data for "+b+".",null);d(null,e.parseXML(a))})};this.writeFile=function(b,d,f){d=new Buffer(d);b=m.resolve(q,b);n.writeFile(b,d,"binary",function(a){f(a||null)})};this.deleteFile=function(b,d){b=m.resolve(q,b);
n.unlink(b,d)};this.read=function(b,d,f,a){b=m.resolve(q,b);n.open(b,"r+",666,function(c,p){if(c)a(c,null);else{var l=new Buffer(f);n.read(p,l,0,f,d,function(c){n.close(p);a(c,g(l))})}})};this.readFileSync=function(b,d){var f;f=n.readFileSync(b,"binary"===d?null:d);if(null===f)throw"File "+b+" could not be read.";"binary"===d&&(f=g(f));return f};this.isFile=function(b,d){b=m.resolve(q,b);n.stat(b,function(f,a){d(!f&&a.isFile())})};this.getFileSize=function(b,d){b=m.resolve(q,b);n.stat(b,function(f,
a){f?d(-1):d(a.size)})};this.log=function(b,d){var f;void 0!==d?f=b:d=b;"alert"===f&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(d+"\n");"alert"===f&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(b,d,f){b||(process.stderr.write("ASSERTION FAILED: "+d),f&&f())};this.setTimeout=function(b,d){return setTimeout(function(){b()},d)};this.clearTimeout=function(b){clearTimeout(b)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(b){q=
b};this.currentDirectory=function(){return q};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return h};this.parseXML=function(e){return b.parseFromString(e,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};b=new (require("xmldom").DOMParser);h=e.parseXML("<a/>").implementation}
function RhinoRuntime(){function g(b,e){var d;void 0!==e?d=b:e=b;"alert"===d&&print("\n!!!!! ALERT !!!!!");print(e);"alert"===d&&print("!!!!! ALERT !!!!!")}var k=this,e={},n=e.javax.xml.parsers.DocumentBuilderFactory.newInstance(),m,q,b="";n.setValidating(!1);n.setNamespaceAware(!0);n.setExpandEntityReferences(!1);n.setSchema(null);q=e.org.xml.sax.EntityResolver({resolveEntity:function(b,m){var d=new e.java.io.FileReader(m);return new e.org.xml.sax.InputSource(d)}});m=n.newDocumentBuilder();m.setEntityResolver(q);
this.byteArrayFromString=function(b,e){var d,f=b.length,a=new Uint8Array(new ArrayBuffer(f));for(d=0;d<f;d+=1)a[d]=b.charCodeAt(d)&255;return a};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.loadXML=function(b,g){var d=new e.java.io.File(b),f=null;try{f=m.parse(d)}catch(a){return print(a),g(a,null)}g(null,f)};this.readFile=function(h,m,d){b&&(h=b+"/"+h);var f=new e.java.io.File(h),a="binary"===m?
"latin1":m;f.isFile()?((h=readFile(h,a))&&"binary"===m&&(h=k.byteArrayFromString(h,"binary")),d(null,h)):d(h+" is not a file.",null)};this.writeFile=function(h,m,d){b&&(h=b+"/"+h);h=new e.java.io.FileOutputStream(h);var f,a=m.length;for(f=0;f<a;f+=1)h.write(m[f]);h.close();d(null)};this.deleteFile=function(h,m){b&&(h=b+"/"+h);var d=new e.java.io.File(h),f=h+Math.random(),f=new e.java.io.File(f);d.rename(f)?(f.deleteOnExit(),m(null)):m("Could not delete "+h)};this.read=function(h,m,d,f){b&&(h=b+"/"+
h);var a;a=h;var c="binary";(new e.java.io.File(a)).isFile()?("binary"===c&&(c="latin1"),a=readFile(a,c)):a=null;a?f(null,this.byteArrayFromString(a.substring(m,m+d),"binary")):f("Cannot read "+h,null)};this.readFileSync=function(b,e){if(!e)return"";var d=readFile(b,e);if(null===d)throw"File could not be read.";return d};this.isFile=function(h,m){b&&(h=b+"/"+h);var d=new e.java.io.File(h);m(d.isFile())};this.getFileSize=function(h,m){b&&(h=b+"/"+h);var d=new e.java.io.File(h);m(d.length())};this.log=
g;this.assert=function(b,e,d){b||(g("alert","ASSERTION FAILED: "+e),d&&d())};this.setTimeout=function(b){b();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(e){b=e};this.currentDirectory=function(){return b};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return m.getDOMImplementation()};this.parseXML=function(b){b=new e.java.io.StringReader(b);b=new e.org.xml.sax.InputSource(b);return m.parse(b)};
this.exit=quit;this.getWindow=function(){return null}}Runtime.create=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime};var runtime=Runtime.create(),core={},gui={},xmldom={},odf={},ops={};
(function(){function g(b,e){var m=b+"/manifest.json",d,f;if(!q.hasOwnProperty(m)){q[m]=1;try{d=runtime.readFileSync(m,"utf-8")}catch(a){console.log(String(a));return}m=JSON.parse(d);for(f in m)m.hasOwnProperty(f)&&(e[f]={dir:b,deps:m[f]})}}function k(b,e,m){var d=e[b].deps,f={};m[b]=f;d.forEach(function(a){f[a]=1});d.forEach(function(a){m[a]||k(a,e,m)});d.forEach(function(a){Object.keys(m[a]).forEach(function(a){f[a]=1})})}function e(b,e){function m(a,c){var d,l=e[a];if(-1===f.indexOf(a)&&-1===c.indexOf(a)){c.push(a);
for(d=0;d<b.length;d+=1)l[b[d]]&&m(b[d],c);c.pop();f.push(a)}}var d,f=[];for(d=0;d<b.length;d+=1)m(b[d],[]);return f}function n(b,e){for(var m=0;m<b.length&&void 0!==e[m];)null!==e[m]&&(eval(e[m]),e[m]=null),m+=1}var m={},q={};runtime.loadClass=function(b){if(!IS_COMPILED_CODE){var h=b.replace(".","/")+".js";if(!q.hasOwnProperty(h)){if(!(0<Object.keys(m).length)){var r=runtime.libraryPaths(),h={},d;runtime.currentDirectory()&&g(runtime.currentDirectory(),h);for(d=0;d<r.length;d+=1)g(r[d],h);var f;
d={};for(f in h)h.hasOwnProperty(f)&&k(f,h,d);for(f in h)h.hasOwnProperty(f)&&(r=Object.keys(d[f]),h[f].deps=e(r,d),h[f].deps.push(f));m=h}f=b.replace(".","/")+".js";b=[];f=m[f].deps;for(h=0;h<f.length;h+=1)q.hasOwnProperty(f[h])||b.push(f[h]);f=[];f.length=b.length;for(h=b.length-1;0<=h;h-=1)q[b[h]]=1,void 0===f[h]&&(r=b[h],r=m[r].dir+"/"+r,d=runtime.readFileSync(r,"utf-8"),d+="\n//# sourceURL="+r,d+="\n//@ sourceURL="+r,f[h]=d);n(b,f)}}}})();
(function(){var g=function(g){return g};runtime.getTranslator=function(){return g};runtime.setTranslator=function(k){g=k};runtime.tr=function(k){var e=g(k);return e&&"string"===String(typeof e)?e:k}})();
(function(g){function k(e){if(e.length){var g=e[0];runtime.readFile(g,"utf8",function(m,k){function b(){var d;(d=eval(r))&&runtime.exit(d)}var h="",r=k;-1!==g.indexOf("/")&&(h=g.substring(0,g.indexOf("/")));runtime.setCurrentDirectory(h);m?(runtime.log(m),runtime.exit(1)):null===r?(runtime.log("No code found for "+g),runtime.exit(1)):b.apply(null,e)})}}g=g?Array.prototype.slice.call(g):[];"NodeJSRuntime"===runtime.type()?k(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?k(g):k(g.slice(1))})("undefined"!==
String(typeof arguments)&&arguments);
// Input 2
core.Async=function(){this.forEach=function(g,k,e){function n(h){b!==q&&(h?(b=q,e(h)):(b+=1,b===q&&e(null)))}var m,q=g.length,b=0;for(m=0;m<q;m+=1)k(g[m],n)};this.destroyAll=function(g,k){function e(n,m){if(m)k(m);else if(n<g.length)g[n](function(m){e(n+1,m)});else k()}e(0,void 0)}};
// Input 3
function makeBase64(){function g(a){var c,d=a.length,b=new Uint8Array(new ArrayBuffer(d));for(c=0;c<d;c+=1)b[c]=a.charCodeAt(c)&255;return b}function k(a){var c,d="",b,f=a.length-2;for(b=0;b<f;b+=3)c=a[b]<<16|a[b+1]<<8|a[b+2],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>18],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12&63],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&
63];b===f+1?(c=a[b]<<4,d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],d+="=="):b===f&&(c=a[b]<<10|a[b+1]<<2,d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>12],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c>>>6&63],d+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[c&63],d+="=");return d}function e(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,
"");var c=a.length,d=new Uint8Array(new ArrayBuffer(3*c)),b=a.length%4,f=0,p,e;for(p=0;p<c;p+=4)e=(l[a.charAt(p)]||0)<<18|(l[a.charAt(p+1)]||0)<<12|(l[a.charAt(p+2)]||0)<<6|(l[a.charAt(p+3)]||0),d[f]=e>>16,d[f+1]=e>>8&255,d[f+2]=e&255,f+=3;c=3*c-[0,0,2,1][b];return d.subarray(0,c)}function n(a){var c,d,b=a.length,f=0,p=new Uint8Array(new ArrayBuffer(3*b));for(c=0;c<b;c+=1)d=a[c],128>d?p[f++]=d:(2048>d?p[f++]=192|d>>>6:(p[f++]=224|d>>>12&15,p[f++]=128|d>>>6&63),p[f++]=128|d&63);return p.subarray(0,
f)}function m(a){var c,d,b,f,p=a.length,l=new Uint8Array(new ArrayBuffer(p)),e=0;for(c=0;c<p;c+=1)d=a[c],128>d?l[e++]=d:(c+=1,b=a[c],224>d?l[e++]=(d&31)<<6|b&63:(c+=1,f=a[c],l[e++]=(d&15)<<12|(b&63)<<6|f&63));return l.subarray(0,e)}function q(a){return k(g(a))}function b(a){return String.fromCharCode.apply(String,e(a))}function h(a){return m(g(a))}function r(a){a=m(a);for(var c="",d=0;d<a.length;)c+=String.fromCharCode.apply(String,a.subarray(d,d+45E3)),d+=45E3;return c}function d(a,c,d){var b,f,
p,l="";for(p=c;p<d;p+=1)c=a.charCodeAt(p)&255,128>c?l+=String.fromCharCode(c):(p+=1,b=a.charCodeAt(p)&255,224>c?l+=String.fromCharCode((c&31)<<6|b&63):(p+=1,f=a.charCodeAt(p)&255,l+=String.fromCharCode((c&15)<<12|(b&63)<<6|f&63)));return l}function f(a,c){function b(){var l=p+1E5;l>a.length&&(l=a.length);f+=d(a,p,l);p=l;l=p===a.length;c(f,l)&&!l&&runtime.setTimeout(b,0)}var f="",p=0;1E5>a.length?c(d(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),b())}function a(a){return n(g(a))}function c(a){return String.fromCharCode.apply(String,
n(a))}function p(a){return String.fromCharCode.apply(String,n(g(a)))}var l=function(a){var c={},d,b;d=0;for(b=a.length;d<b;d+=1)c[a.charAt(d)]=d;return c}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),u,B,w=runtime.getWindow(),y,v;w&&w.btoa?(y=w.btoa,u=function(a){return y(p(a))}):(y=q,u=function(c){return k(a(c))});w&&w.atob?(v=w.atob,B=function(a){a=v(a);return d(a,0,a.length)}):(v=b,B=function(a){return r(e(a))});core.Base64=function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=
k;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=e;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=n;this.convertByteArrayToUTF16Array=this.convertUTF8ArrayToUTF16Array=m;this.convertUTF8StringToBase64=q;this.convertBase64ToUTF8String=b;this.convertUTF8StringToUTF16Array=h;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=r;this.convertUTF8StringToUTF16String=f;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=a;this.convertUTF16ArrayToUTF8String=
c;this.convertUTF16StringToUTF8String=p;this.convertUTF16StringToBase64=u;this.convertBase64ToUTF16String=B;this.fromBase64=b;this.toBase64=q;this.atob=v;this.btoa=y;this.utob=p;this.btou=f;this.encode=u;this.encodeURI=function(a){return u(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return B(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))};return this};return core.Base64}core.Base64=makeBase64();
// Input 4
core.ByteArray=function(g){this.pos=0;this.data=g;this.readUInt32LE=function(){this.pos+=4;var g=this.data,e=this.pos;return g[--e]<<24|g[--e]<<16|g[--e]<<8|g[--e]};this.readUInt16LE=function(){this.pos+=2;var g=this.data,e=this.pos;return g[--e]<<8|g[--e]}};
// Input 5
core.ByteArrayWriter=function(g){function k(b){b>m-n&&(m=Math.max(2*m,n+b),b=new Uint8Array(new ArrayBuffer(m)),b.set(q),q=b)}var e=this,n=0,m=1024,q=new Uint8Array(new ArrayBuffer(m));this.appendByteArrayWriter=function(b){e.appendByteArray(b.getByteArray())};this.appendByteArray=function(b){var e=b.length;k(e);q.set(b,n);n+=e};this.appendArray=function(b){var e=b.length;k(e);q.set(b,n);n+=e};this.appendUInt16LE=function(b){e.appendArray([b&255,b>>8&255])};this.appendUInt32LE=function(b){e.appendArray([b&
255,b>>8&255,b>>16&255,b>>24&255])};this.appendString=function(b){e.appendByteArray(runtime.byteArrayFromString(b,g))};this.getLength=function(){return n};this.getByteArray=function(){var b=new Uint8Array(new ArrayBuffer(n));b.set(q.subarray(0,n));return b}};
// Input 6
core.CSSUnits=function(){var g=this,k={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(e,g,m){return e*k[m]/k[g]};this.convertMeasure=function(e,k){var m,q;e&&k?(m=parseFloat(e),q=e.replace(m.toString(),""),m=g.convert(m,q,k).toString()):m="";return m};this.getUnits=function(e){return e.substr(e.length-2,e.length)}};
// Input 7
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
(function(){function g(){var e,g,m,q,b;void 0===k&&(b=(e=runtime.getWindow())&&e.document,k={rangeBCRIgnoresElementBCR:!1,unscaledRangeClientRects:!1},b&&(q=b.createElement("div"),q.style.position="absolute",q.style.left="-99999px",q.style.transform="scale(2)",q.style["-webkit-transform"]="scale(2)",g=b.createElement("div"),q.appendChild(g),b.body.appendChild(q),e=b.createRange(),e.selectNode(g),k.rangeBCRIgnoresElementBCR=0===e.getClientRects().length,g.appendChild(b.createTextNode("Rect transform test")),
g=g.getBoundingClientRect(),m=e.getBoundingClientRect(),k.unscaledRangeClientRects=2<Math.abs(g.height-m.height),e.detach(),b.body.removeChild(q),e=Object.keys(k).map(function(b){return b+":"+String(k[b])}).join(", "),runtime.log("Detected browser quirks - "+e)));return k}var k;core.DomUtils=function(){function e(a,c){return 0>=a.compareBoundaryPoints(Range.START_TO_START,c)&&0<=a.compareBoundaryPoints(Range.END_TO_END,c)}function k(a,c){return 0>=a.compareBoundaryPoints(Range.END_TO_START,c)&&0<=
a.compareBoundaryPoints(Range.START_TO_END,c)}function m(a,c){var d=null;a.nodeType===Node.TEXT_NODE&&(0===a.length?(a.parentNode.removeChild(a),c.nodeType===Node.TEXT_NODE&&(d=c)):(c.nodeType===Node.TEXT_NODE&&(a.appendData(c.data),c.parentNode.removeChild(c)),d=a));return d}function q(a){for(var c=a.parentNode;a.firstChild;)c.insertBefore(a.firstChild,a);c.removeChild(a);return c}function b(a,c){for(var d=a.parentNode,f=a.firstChild,e;f;)e=f.nextSibling,b(f,c),f=e;c(a)&&(d=q(a));return d}function h(a,
c){return a===c||Boolean(a.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY)}function r(a,c){for(var d=0,b;a.parentNode!==c;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(b=c.firstChild;b!==a;)d+=1,b=b.nextSibling;return d}function d(a,c,b){Object.keys(c).forEach(function(f){var e=f.split(":"),h=e[1],m=b(e[0]),e=c[f];"object"===typeof e&&Object.keys(e).length?(f=m?a.getElementsByTagNameNS(m,h)[0]||a.ownerDocument.createElementNS(m,f):a.getElementsByTagName(h)[0]||
a.ownerDocument.createElement(f),a.appendChild(f),d(f,e,b)):m&&a.setAttributeNS(m,f,String(e))})}var f=null;this.splitBoundaries=function(a){var c=[],d,b;if(a.startContainer.nodeType===Node.TEXT_NODE||a.endContainer.nodeType===Node.TEXT_NODE){if(d=a.endContainer){d=a.endOffset;b=a.endContainer;if(d<b.childNodes.length)for(b=b.childNodes.item(d),d=0;b.firstChild;)b=b.firstChild;else for(;b.lastChild;)b=b.lastChild,d=b.nodeType===Node.TEXT_NODE?b.textContent.length:b.childNodes.length;d={container:b,
offset:d}}a.setEnd(d.container,d.offset);d=a.endContainer;0!==a.endOffset&&d.nodeType===Node.TEXT_NODE&&(b=d,a.endOffset!==b.length&&(c.push(b.splitText(a.endOffset)),c.push(b)));d=a.startContainer;0!==a.startOffset&&d.nodeType===Node.TEXT_NODE&&(b=d,a.startOffset!==b.length&&(d=b.splitText(a.startOffset),c.push(b),c.push(d),a.setStart(d,0)))}return c};this.containsRange=e;this.rangesIntersect=k;this.getNodesInRange=function(a,c){for(var d=[],b=a.commonAncestorContainer,f,e=a.startContainer.ownerDocument.createTreeWalker(b.nodeType===
Node.TEXT_NODE?b.parentNode:b,NodeFilter.SHOW_ALL,c,!1),b=e.currentNode=a.startContainer;b;){f=c(b);if(f===NodeFilter.FILTER_ACCEPT)d.push(b);else if(f===NodeFilter.FILTER_REJECT)break;b=b.parentNode}d.reverse();for(b=e.nextNode();b;)d.push(b),b=e.nextNode();return d};this.normalizeTextNodes=function(a){a&&a.nextSibling&&(a=m(a,a.nextSibling));a&&a.previousSibling&&m(a.previousSibling,a)};this.rangeContainsNode=function(a,c){var d=c.ownerDocument.createRange(),b=c.ownerDocument.createRange(),f;d.setStart(a.startContainer,
a.startOffset);d.setEnd(a.endContainer,a.endOffset);b.selectNodeContents(c);f=e(d,b);d.detach();b.detach();return f};this.mergeIntoParent=q;this.removeUnwantedNodes=b;this.getElementsByTagNameNS=function(a,c,d){var b=[];a=a.getElementsByTagNameNS(c,d);b.length=d=a.length;for(c=0;c<d;c+=1)b[c]=a.item(c);return b};this.rangeIntersectsNode=function(a,c){var d=c.ownerDocument.createRange(),b;d.selectNodeContents(c);b=k(a,d);d.detach();return b};this.containsNode=function(a,c){return a===c||a.contains(c)};
this.comparePoints=function(a,c,d,b){if(a===d)return b-c;var f=a.compareDocumentPosition(d);2===f?f=-1:4===f?f=1:10===f?(c=r(a,d),f=c<b?1:-1):(b=r(d,a),f=b<c?-1:1);return f};this.adaptRangeDifferenceToZoomLevel=function(a,c){return g().unscaledRangeClientRects?a:a/c};this.getBoundingClientRect=function(a){var c=a.ownerDocument,d=g();if((!1===d.unscaledRangeClientRects||d.rangeBCRIgnoresElementBCR)&&a.nodeType===Node.ELEMENT_NODE)return a.getBoundingClientRect();var b;f?b=f:f=b=c.createRange();c=b;
c.selectNode(a);return c.getBoundingClientRect()};this.mapKeyValObjOntoNode=function(a,c,d){Object.keys(c).forEach(function(b){var f=b.split(":"),e=f[1],f=d(f[0]),h=c[b];f?(e=a.getElementsByTagNameNS(f,e)[0],e||(e=a.ownerDocument.createElementNS(f,b),a.appendChild(e)),e.textContent=h):runtime.log("Key ignored: "+b)})};this.removeKeyElementsFromNode=function(a,c,d){c.forEach(function(c){var b=c.split(":"),f=b[1];(b=d(b[0]))?(f=a.getElementsByTagNameNS(b,f)[0])?f.parentNode.removeChild(f):runtime.log("Element for "+
c+" not found."):runtime.log("Property Name ignored: "+c)})};this.getKeyValRepresentationOfNode=function(a,c){for(var d={},b=a.firstElementChild,f;b;){if(f=c(b.namespaceURI))d[f+":"+b.localName]=b.textContent;b=b.nextElementSibling}return d};this.mapObjOntoNode=d;(function(a){var c,d;d=runtime.getWindow();null!==d&&(c=d.navigator.appVersion.toLowerCase(),d=-1===c.indexOf("chrome")&&(-1!==c.indexOf("applewebkit")||-1!==c.indexOf("safari")),c=c.indexOf("msie"),d||c)&&(a.containsNode=h)})(this)};return core.DomUtils})();
// Input 8
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
core.EventNotifier=function(g){var k={};this.emit=function(e,g){var m,q;runtime.assert(k.hasOwnProperty(e),'unknown event fired "'+e+'"');q=k[e];for(m=0;m<q.length;m+=1)q[m](g)};this.subscribe=function(e,g){runtime.assert(k.hasOwnProperty(e),'tried to subscribe to unknown event "'+e+'"');k[e].push(g);runtime.log('event "'+e+'" subscribed.')};this.unsubscribe=function(e,g){var m;runtime.assert(k.hasOwnProperty(e),'tried to unsubscribe from unknown event "'+e+'"');m=k[e].indexOf(g);runtime.assert(-1!==
m,'tried to unsubscribe unknown callback from event "'+e+'"');-1!==m&&k[e].splice(m,1);runtime.log('event "'+e+'" unsubscribed.')};(function(){var e,n;for(e=0;e<g.length;e+=1)n=g[e],runtime.assert(!k.hasOwnProperty(n),'Duplicated event ids: "'+n+'" registered more than once.'),k[n]=[]})()};
// Input 9
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
core.LoopWatchDog=function(g,k){var e=Date.now(),n=0;this.check=function(){var m;if(g&&(m=Date.now(),m-e>g))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<k&&(n+=1,n>k))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 10
core.PositionIterator=function(g,k,e,n){function m(){this.acceptNode=function(a){return!a||a.nodeType===c&&0===a.length?u:l}}function q(a){this.acceptNode=function(d){return!d||d.nodeType===c&&0===d.length?u:a.acceptNode(d)}}function b(){var a=d.currentNode,b=a.nodeType;f=b===c?a.length-1:b===p?1:0}function h(){if(null===d.previousSibling()){if(!d.parentNode()||d.currentNode===g)return d.firstChild(),!1;f=0}else b();return!0}var r=this,d,f,a,c=Node.TEXT_NODE,p=Node.ELEMENT_NODE,l=NodeFilter.FILTER_ACCEPT,
u=NodeFilter.FILTER_REJECT;this.nextPosition=function(){var a=d.currentNode,b=a.nodeType;if(a===g)return!1;if(0===f&&b===p)null===d.firstChild()&&(f=1);else if(b===c&&f+1<a.length)f+=1;else if(null!==d.nextSibling())f=0;else if(d.parentNode())f=1;else return!1;return!0};this.previousPosition=function(){var a=!0,e=d.currentNode;0===f?a=h():e.nodeType===c?f-=1:null!==d.lastChild()?b():e===g?a=!1:f=0;return a};this.previousNode=h;this.container=function(){var a=d.currentNode,b=a.nodeType;0===f&&b!==
c&&(a=a.parentNode);return a};this.rightNode=function(){var b=d.currentNode,e=b.nodeType;if(e===c&&f===b.length)for(b=b.nextSibling;b&&a(b)!==l;)b=b.nextSibling;else e===p&&1===f&&(b=null);return b};this.leftNode=function(){var c=d.currentNode;if(0===f)for(c=c.previousSibling;c&&a(c)!==l;)c=c.previousSibling;else if(c.nodeType===p)for(c=c.lastChild;c&&a(c)!==l;)c=c.previousSibling;return c};this.getCurrentNode=function(){return d.currentNode};this.unfilteredDomOffset=function(){if(d.currentNode.nodeType===
c)return f;for(var a=0,b=d.currentNode,b=1===f?b.lastChild:b.previousSibling;b;)a+=1,b=b.previousSibling;return a};this.getPreviousSibling=function(){var a=d.currentNode,c=d.previousSibling();d.currentNode=a;return c};this.getNextSibling=function(){var a=d.currentNode,c=d.nextSibling();d.currentNode=a;return c};this.setUnfilteredPosition=function(b,e){var p,h;runtime.assert(null!==b&&void 0!==b,"PositionIterator.setUnfilteredPosition called without container");d.currentNode=b;if(b.nodeType===c)return f=
e,runtime.assert(e<=b.length,"Error in setPosition: "+e+" > "+b.length),runtime.assert(0<=e,"Error in setPosition: "+e+" < 0"),e===b.length&&(d.nextSibling()?f=0:d.parentNode()?f=1:runtime.assert(!1,"Error in setUnfilteredPosition: position not valid.")),!0;p=a(b);for(h=b.parentNode;h&&h!==g&&p===l;)p=a(h),p!==l&&(d.currentNode=h),h=h.parentNode;e<b.childNodes.length&&p!==NodeFilter.FILTER_REJECT?(d.currentNode=b.childNodes.item(e),p=a(d.currentNode),f=0):f=1;p===NodeFilter.FILTER_REJECT&&(f=1);if(p!==
l)return r.nextPosition();runtime.assert(a(d.currentNode)===l,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");return!0};this.moveToEnd=function(){d.currentNode=g;f=1};this.moveToEndOfNode=function(a){a.nodeType===c?r.setUnfilteredPosition(a,a.length):(d.currentNode=a,f=1)};this.getNodeFilter=function(){return a};a=(e?new q(e):new m).acceptNode;a.acceptNode=a;k=k||4294967295;runtime.assert(g.nodeType!==Node.TEXT_NODE,"Internet Explorer doesn't allow tree walker roots to be text nodes");
d=g.ownerDocument.createTreeWalker(g,k,a,n);f=0;null===d.firstChild()&&(f=1)};
// Input 11
core.zip_HuftNode=function(){this.n=this.b=this.e=0;this.t=null};core.zip_HuftList=function(){this.list=this.next=null};
core.RawInflate=function(){function g(a,c,d,b,f,e){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var p=Array(this.BMAX+1),l,h,m,g,x,k,n,r=Array(this.BMAX+1),v,q,s,F=new core.zip_HuftNode,u=Array(this.BMAX);g=Array(this.N_MAX);var t,z=Array(this.BMAX+1),A,U,P;P=this.root=null;for(x=0;x<p.length;x++)p[x]=0;for(x=0;x<r.length;x++)r[x]=0;for(x=0;x<u.length;x++)u[x]=null;for(x=0;x<g.length;x++)g[x]=0;for(x=0;x<z.length;x++)z[x]=0;l=256<c?a[256]:this.BMAX;v=a;q=0;x=c;do p[v[q]]++,q++;
while(0<--x);if(p[0]===c)this.root=null,this.status=this.m=0;else{for(k=1;k<=this.BMAX&&0===p[k];k++);n=k;e<k&&(e=k);for(x=this.BMAX;0!==x&&0===p[x];x--);m=x;e>x&&(e=x);for(A=1<<k;k<x;k++,A<<=1)if(A-=p[k],0>A){this.status=2;this.m=e;return}A-=p[x];if(0>A)this.status=2,this.m=e;else{p[x]+=A;z[1]=k=0;v=p;q=1;for(s=2;0<--x;)k+=v[q++],z[s++]=k;v=a;x=q=0;do k=v[q++],0!==k&&(g[z[k]++]=x);while(++x<c);c=z[m];z[0]=x=0;v=g;q=0;g=-1;t=r[0]=0;s=null;U=0;for(n=n-1+1;n<=m;n++)for(a=p[n];0<a--;){for(;n>t+r[1+g];){t+=
r[1+g];g++;U=m-t;U=U>e?e:U;k=n-t;h=1<<k;if(h>a+1)for(h-=a+1,s=n;++k<U;){h<<=1;if(h<=p[++s])break;h-=p[s]}t+k>l&&t<l&&(k=l-t);U=1<<k;r[1+g]=k;s=Array(U);for(h=0;h<U;h++)s[h]=new core.zip_HuftNode;P=null===P?this.root=new core.zip_HuftList:P.next=new core.zip_HuftList;P.next=null;P.list=s;u[g]=s;0<g&&(z[g]=x,F.b=r[g],F.e=16+k,F.t=s,k=(x&(1<<t)-1)>>t-r[g],u[g-1][k].e=F.e,u[g-1][k].b=F.b,u[g-1][k].n=F.n,u[g-1][k].t=F.t)}F.b=n-t;q>=c?F.e=99:v[q]<d?(F.e=256>v[q]?16:15,F.n=v[q++]):(F.e=f[v[q]-d],F.n=b[v[q++]-
d]);h=1<<n-t;for(k=x>>t;k<U;k+=h)s[k].e=F.e,s[k].b=F.b,s[k].n=F.n,s[k].t=F.t;for(k=1<<n-1;0!==(x&k);k>>=1)x^=k;for(x^=k;(x&(1<<t)-1)!==z[g];)t-=r[g],g--}this.m=r[1];this.status=0!==A&&1!==m?1:0}}}function k(d){for(;c<d;){var b=a,f;f=s.length===N?-1:s[N++];a=b|f<<c;c+=8}}function e(c){return a&z[c]}function n(d){a>>=d;c-=d}function m(a,c,d){var f,l,m;if(0===d)return 0;for(m=0;;){k(v);l=w.list[e(v)];for(f=l.e;16<f;){if(99===f)return-1;n(l.b);f-=16;k(f);l=l.t[e(f)];f=l.e}n(l.b);if(16===f)h&=32767,a[c+
m++]=b[h++]=l.n;else{if(15===f)break;k(f);u=l.n+e(f);n(f);k(t);l=y.list[e(t)];for(f=l.e;16<f;){if(99===f)return-1;n(l.b);f-=16;k(f);l=l.t[e(f)];f=l.e}n(l.b);k(f);B=h-l.n-e(f);for(n(f);0<u&&m<d;)u--,B&=32767,h&=32767,a[c+m++]=b[h++]=b[B++]}if(m===d)return d}p=-1;return m}function q(a,c,d){var b,f,p,l,h,r,q,s=Array(316);for(b=0;b<s.length;b++)s[b]=0;k(5);r=257+e(5);n(5);k(5);q=1+e(5);n(5);k(4);b=4+e(4);n(4);if(286<r||30<q)return-1;for(f=0;f<b;f++)k(3),s[P[f]]=e(3),n(3);for(f=b;19>f;f++)s[P[f]]=0;v=
7;f=new g(s,19,19,null,null,v);if(0!==f.status)return-1;w=f.root;v=f.m;l=r+q;for(b=p=0;b<l;)if(k(v),h=w.list[e(v)],f=h.b,n(f),f=h.n,16>f)s[b++]=p=f;else if(16===f){k(2);f=3+e(2);n(2);if(b+f>l)return-1;for(;0<f--;)s[b++]=p}else{17===f?(k(3),f=3+e(3),n(3)):(k(7),f=11+e(7),n(7));if(b+f>l)return-1;for(;0<f--;)s[b++]=0;p=0}v=9;f=new g(s,r,257,x,R,v);0===v&&(f.status=1);if(0!==f.status)return-1;w=f.root;v=f.m;for(b=0;b<q;b++)s[b]=s[b+r];t=6;f=new g(s,q,0,F,U,t);y=f.root;t=f.m;return 0===t&&257<r||0!==f.status?
-1:m(a,c,d)}var b=[],h,r=null,d,f,a,c,p,l,u,B,w,y,v,t,s,N,z=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],x=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],R=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],F=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],U=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],P=[16,17,18,0,8,7,9,6,
10,5,11,4,12,3,13,2,14,1,15],A;this.inflate=function(z,P){b.length=65536;c=a=h=0;p=-1;l=!1;u=B=0;w=null;s=z;N=0;var G=new Uint8Array(new ArrayBuffer(P));a:for(var Z=0,O;Z<P&&(!l||-1!==p);){if(0<u){if(0!==p)for(;0<u&&Z<P;)u--,B&=32767,h&=32767,G[0+Z]=b[h]=b[B],Z+=1,h+=1,B+=1;else{for(;0<u&&Z<P;)u-=1,h&=32767,k(8),G[0+Z]=b[h]=e(8),Z+=1,h+=1,n(8);0===u&&(p=-1)}if(Z===P)break}if(-1===p){if(l)break;k(1);0!==e(1)&&(l=!0);n(1);k(2);p=e(2);n(2);w=null;u=0}switch(p){case 0:O=G;var ba=0+Z,K=P-Z,I=void 0,I=
c&7;n(I);k(16);I=e(16);n(16);k(16);if(I!==(~a&65535))O=-1;else{n(16);u=I;for(I=0;0<u&&I<K;)u--,h&=32767,k(8),O[ba+I++]=b[h++]=e(8),n(8);0===u&&(p=-1);O=I}break;case 1:if(null!==w)O=m(G,0+Z,P-Z);else b:{O=G;ba=0+Z;K=P-Z;if(null===r){for(var C=void 0,I=Array(288),C=void 0,C=0;144>C;C++)I[C]=8;for(C=144;256>C;C++)I[C]=9;for(C=256;280>C;C++)I[C]=7;for(C=280;288>C;C++)I[C]=8;f=7;C=new g(I,288,257,x,R,f);if(0!==C.status){alert("HufBuild error: "+C.status);O=-1;break b}r=C.root;f=C.m;for(C=0;30>C;C++)I[C]=
5;A=5;C=new g(I,30,0,F,U,A);if(1<C.status){r=null;alert("HufBuild error: "+C.status);O=-1;break b}d=C.root;A=C.m}w=r;y=d;v=f;t=A;O=m(O,ba,K)}break;case 2:O=null!==w?m(G,0+Z,P-Z):q(G,0+Z,P-Z);break;default:O=-1}if(-1===O)break a;Z+=O}s=new Uint8Array(new ArrayBuffer(0));return G}};
// Input 12
core.ScheduledTask=function(g,k){function e(){q&&(runtime.clearTimeout(m),q=!1)}function n(){e();g.apply(void 0,b);b=null}var m,q=!1,b=[];this.trigger=function(){b=Array.prototype.slice.call(arguments);q||(q=!0,m=runtime.setTimeout(n,k))};this.triggerImmediate=function(){b=Array.prototype.slice.call(arguments);n()};this.processRequests=function(){q&&n()};this.cancel=e;this.destroy=function(b){e();b()}};
// Input 13
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var g=runtime.getWindow().document,k=g.getElementById("testarea");runtime.assert(!k,'Unclean test environment, found a div with id "testarea".');k=g.createElement("div");k.setAttribute("id","testarea");g.body.appendChild(k);return k};
core.UnitTest.cleanupTestAreaDiv=function(){var g=runtime.getWindow().document,k=g.getElementById("testarea");runtime.assert(!!k&&k.parentNode===g.body,'Test environment broken, found no div with id "testarea" below body.');g.body.removeChild(k)};core.UnitTest.createOdtDocument=function(g,k){var e="<?xml version='1.0' encoding='UTF-8'?>",e=e+"<office:document";Object.keys(k).forEach(function(g){e+=" xmlns:"+g+'="'+k[g]+'"'});e+=">";e+=g;e+="</office:document>";return runtime.parseXML(e)};
core.UnitTestRunner=function(){function g(e){b+=1;runtime.log("fail",e)}function k(b,d){var f;try{if(b.length!==d.length)return g("array of length "+b.length+" should be "+d.length+" long"),!1;for(f=0;f<b.length;f+=1)if(b[f]!==d[f])return g(b[f]+" should be "+d[f]+" at array index "+f),!1}catch(a){return!1}return!0}function e(b,d,f){var a=b.attributes,c=a.length,p,l,h;for(p=0;p<c;p+=1)if(l=a.item(p),"xmlns"!==l.prefix&&"urn:webodf:names:steps"!==l.namespaceURI){h=d.getAttributeNS(l.namespaceURI,l.localName);
if(!d.hasAttributeNS(l.namespaceURI,l.localName))return g("Attribute "+l.localName+" with value "+l.value+" was not present"),!1;if(h!==l.value)return g("Attribute "+l.localName+" was "+h+" should be "+l.value),!1}return f?!0:e(d,b,!0)}function n(b,d){var f,a;f=b.nodeType;a=d.nodeType;if(f!==a)return g("Nodetype '"+f+"' should be '"+a+"'"),!1;if(f===Node.TEXT_NODE){if(b.data===d.data)return!0;g("Textnode data '"+b.data+"' should be '"+d.data+"'");return!1}runtime.assert(f===Node.ELEMENT_NODE,"Only textnodes and elements supported.");
if(b.namespaceURI!==d.namespaceURI)return g("namespace '"+b.namespaceURI+"' should be '"+d.namespaceURI+"'"),!1;if(b.localName!==d.localName)return g("localName '"+b.localName+"' should be '"+d.localName+"'"),!1;if(!e(b,d,!1))return!1;f=b.firstChild;for(a=d.firstChild;f;){if(!a)return g("Nodetype '"+f.nodeType+"' is unexpected here."),!1;if(!n(f,a))return!1;f=f.nextSibling;a=a.nextSibling}return a?(g("Nodetype '"+a.nodeType+"' is missing here."),!1):!0}function m(b,d){return 0===d?b===d&&1/b===1/
d:b===d?!0:"number"===typeof d&&isNaN(d)?"number"===typeof b&&isNaN(b):Object.prototype.toString.call(d)===Object.prototype.toString.call([])?k(b,d):"object"===typeof d&&"object"===typeof b?d.constructor===Element||d.constructor===Node?n(d,b):h(d,b):!1}function q(b,d,f){"string"===typeof d&&"string"===typeof f||runtime.log("WARN: shouldBe() expects string arguments");var a,c;try{c=eval(d)}catch(e){a=e}b=eval(f);a?g(d+" should be "+b+". Threw exception "+a):m(c,b)?runtime.log("pass",d+" is "+f):String(typeof c)===
String(typeof b)?(f=0===c&&0>1/c?"-0":String(c),g(d+" should be "+b+". Was "+f+".")):g(d+" should be "+b+" (of type "+typeof b+"). Was "+c+" (of type "+typeof c+").")}var b=0,h;h=function(b,d){var f=Object.keys(b),a=Object.keys(d);f.sort();a.sort();return k(f,a)&&Object.keys(b).every(function(a){var f=b[a],e=d[a];return m(f,e)?!0:(g(f+" should be "+e+" for key "+a),!1)})};this.areNodesEqual=n;this.shouldBeNull=function(b,d){q(b,d,"null")};this.shouldBeNonNull=function(b,d){var f,a;try{a=eval(d)}catch(c){f=
c}f?g(d+" should be non-null. Threw exception "+f):null!==a?runtime.log("pass",d+" is non-null."):g(d+" should be non-null. Was "+a)};this.shouldBe=q;this.countFailedTests=function(){return b};this.name=function(b){var d,f,a=[],c=b.length;a.length=c;for(d=0;d<c;d+=1){f=Runtime.getFunctionName(b[d])||"";if(""===f)throw"Found a function without a name.";a[d]={f:b[d],name:f}}return a}};
core.UnitTester=function(){function g(e,m){return"<span style='color:blue;cursor:pointer' onclick='"+m+"'>"+e+"</span>"}var k=0,e={};this.runTests=function(n,m,q){function b(a){if(0===a.length)e[h]=f,k+=r.countFailedTests(),m();else{c=a[0].f;var p=a[0].name;runtime.log("Running "+p);l=r.countFailedTests();d.setUp();c(function(){d.tearDown();f[p]=l===r.countFailedTests();b(a.slice(1))})}}var h=Runtime.getFunctionName(n)||"",r=new core.UnitTestRunner,d=new n(r),f={},a,c,p,l,u="BrowserRuntime"===runtime.type();
if(e.hasOwnProperty(h))runtime.log("Test "+h+" has already run.");else{u?runtime.log("<span>Running "+g(h,'runSuite("'+h+'");')+": "+d.description()+"</span>"):runtime.log("Running "+h+": "+d.description);p=d.tests();for(a=0;a<p.length;a+=1)c=p[a].f,n=p[a].name,q.length&&-1===q.indexOf(n)||(u?runtime.log("<span>Running "+g(n,'runTest("'+h+'","'+n+'")')+"</span>"):runtime.log("Running "+n),l=r.countFailedTests(),d.setUp(),c(),d.tearDown(),f[n]=l===r.countFailedTests());b(d.asyncTests())}};this.countFailedTests=
function(){return k};this.results=function(){return e}};
// Input 14
core.Utils=function(){function g(k,e){if(e&&Array.isArray(e)){k=k||[];if(!Array.isArray(k))throw"Destination is not an array.";k=k.concat(e.map(function(e){return g(null,e)}))}else if(e&&"object"===typeof e){k=k||{};if("object"!==typeof k)throw"Destination is not an object.";Object.keys(e).forEach(function(n){k[n]=g(k[n],e[n])})}else k=e;return k}this.hashString=function(g){var e=0,n,m;n=0;for(m=g.length;n<m;n+=1)e=(e<<5)-e+g.charCodeAt(n),e|=0;return e};this.mergeObjects=function(k,e){Object.keys(e).forEach(function(n){k[n]=
g(k[n],e[n])});return k}};
// Input 15
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(g,k){function e(a){var c=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],b,d,f=a.length,e=0,e=0;b=-1;for(d=0;d<f;d+=1)e=(b^a[d])&255,e=c[e],b=b>>>8^e;return b^-1}function n(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function m(a){var c=a.getFullYear();return 1980>c?0:c-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function q(a,c){var b,d,f,e,p,h,m,g=this;this.load=function(c){if(null!==g.data)c(null,g.data);else{var b=p+34+d+f+256;b+m>l&&(b=l-m);runtime.read(a,m,b,function(b,d){if(b||null===d)c(b,d);else a:{var f=d,l=new core.ByteArray(f),m=l.readUInt32LE(),k;if(67324752!==m)c("File entry signature is wrong."+m.toString()+" "+f.length.toString(),null);else{l.pos+=22;m=l.readUInt16LE();k=l.readUInt16LE();l.pos+=m+k;if(e){f=
f.subarray(l.pos,l.pos+p);if(p!==f.length){c("The amount of compressed bytes read was "+f.length.toString()+" instead of "+p.toString()+" for "+g.filename+" in "+a+".",null);break a}f=B(f,h)}else f=f.subarray(l.pos,l.pos+h);h!==f.length?c("The amount of bytes read was "+f.length.toString()+" instead of "+h.toString()+" for "+g.filename+" in "+a+".",null):(g.data=f,c(null,f))}}})}};this.set=function(a,c,b,d){g.filename=a;g.data=c;g.compressed=b;g.date=d};this.error=null;c&&(b=c.readUInt32LE(),33639248!==
b?this.error="Central directory entry has wrong signature at position "+(c.pos-4).toString()+' for file "'+a+'": '+c.data.length.toString():(c.pos+=6,e=c.readUInt16LE(),this.date=n(c.readUInt32LE()),c.readUInt32LE(),p=c.readUInt32LE(),h=c.readUInt32LE(),d=c.readUInt16LE(),f=c.readUInt16LE(),b=c.readUInt16LE(),c.pos+=8,m=c.readUInt32LE(),this.filename=runtime.byteArrayToString(c.data.subarray(c.pos,c.pos+d),"utf8"),this.data=null,c.pos+=d+f+b))}function b(a,c){if(22!==a.length)c("Central directory length should be 22.",
w);else{var b=new core.ByteArray(a),d;d=b.readUInt32LE();101010256!==d?c("Central directory signature is wrong: "+d.toString(),w):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",w):(d=b.readUInt16LE(),0!==d?c("Zip files with non-zero disk numbers are not supported.",w):(d=b.readUInt16LE(),u=b.readUInt16LE(),d!==u?c("Number of entries is inconsistent.",w):(d=b.readUInt32LE(),b=b.readUInt16LE(),b=l-22-d,runtime.read(g,b,l-b,function(a,b){if(a||null===b)c(a,w);else a:{var d=
new core.ByteArray(b),f,e;p=[];for(f=0;f<u;f+=1){e=new q(g,d);if(e.error){c(e.error,w);break a}p[p.length]=e}c(null,w)}})))))}}function h(a,c){var b=null,d,f;for(f=0;f<p.length;f+=1)if(d=p[f],d.filename===a){b=d;break}b?b.data?c(null,b.data):b.load(c):c(a+" not found.",null)}function r(a){var c=new core.ByteArrayWriter("utf8"),b=0;c.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(b=a.data.length);c.appendUInt32LE(m(a.date));c.appendUInt32LE(a.data?e(a.data):0);c.appendUInt32LE(b);c.appendUInt32LE(b);
c.appendUInt16LE(a.filename.length);c.appendUInt16LE(0);c.appendString(a.filename);a.data&&c.appendByteArray(a.data);return c}function d(a,c){var b=new core.ByteArrayWriter("utf8"),d=0;b.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(d=a.data.length);b.appendUInt32LE(m(a.date));b.appendUInt32LE(a.data?e(a.data):0);b.appendUInt32LE(d);b.appendUInt32LE(d);b.appendUInt16LE(a.filename.length);b.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);b.appendUInt32LE(c);b.appendString(a.filename);return b}function f(a,
c){if(a===p.length)c(null);else{var b=p[a];null!==b.data?f(a+1,c):b.load(function(b){b?c(b):f(a+1,c)})}}function a(a,c){f(0,function(b){if(b)c(b);else{var f,e,l=new core.ByteArrayWriter("utf8"),h=[0];for(f=0;f<p.length;f+=1)l.appendByteArrayWriter(r(p[f])),h.push(l.getLength());b=l.getLength();for(f=0;f<p.length;f+=1)e=p[f],l.appendByteArrayWriter(d(e,h[f]));f=l.getLength()-b;l.appendArray([80,75,5,6,0,0,0,0]);l.appendUInt16LE(p.length);l.appendUInt16LE(p.length);l.appendUInt32LE(f);l.appendUInt32LE(b);
l.appendArray([0,0]);a(l.getByteArray())}})}function c(c,b){a(function(a){runtime.writeFile(c,a,b)},b)}var p,l,u,B=(new core.RawInflate).inflate,w=this,y=new core.Base64;this.load=h;this.save=function(a,c,b,d){var f,e;for(f=0;f<p.length;f+=1)if(e=p[f],e.filename===a){e.set(a,c,b,d);return}e=new q(g);e.set(a,c,b,d);p.push(e)};this.remove=function(a){var c,b;for(c=0;c<p.length;c+=1)if(b=p[c],b.filename===a)return p.splice(c,1),!0;return!1};this.write=function(a){c(g,a)};this.writeAs=c;this.createByteArray=
a;this.loadContentXmlAsFragments=function(a,c){w.loadAsString(a,function(a,b){if(a)return c.rootElementReady(a);c.rootElementReady(null,b,!0)})};this.loadAsString=function(a,c){h(a,function(a,b){if(a||null===b)return c(a,null);var d=runtime.byteArrayToString(b,"utf8");c(null,d)})};this.loadAsDOM=function(a,c){w.loadAsString(a,function(a,b){if(a||null===b)c(a,null);else{var d=(new DOMParser).parseFromString(b,"text/xml");c(null,d)}})};this.loadAsDataURL=function(a,c,b){h(a,function(a,d){if(a||!d)return b(a,
null);var f=0,e;c||(c=80===d[1]&&78===d[2]&&71===d[3]?"image/png":255===d[0]&&216===d[1]&&255===d[2]?"image/jpeg":71===d[0]&&73===d[1]&&70===d[2]?"image/gif":"");for(e="data:"+c+";base64,";f<d.length;)e+=y.convertUTF8ArrayToBase64(d.subarray(f,Math.min(f+45E3,d.length))),f+=45E3;b(null,e)})};this.getEntries=function(){return p.slice()};l=-1;null===k?p=[]:runtime.getFileSize(g,function(a){l=a;0>l?k("File '"+g+"' cannot be read.",w):runtime.read(g,l-22,22,function(a,c){a||null===k||null===c?k(a,w):
b(c,k)})})};
// Input 16
gui.Avatar=function(g,k){var e=this,n,m,q;this.setColor=function(b){m.style.borderColor=b};this.setImageUrl=function(b){e.isVisible()?m.src=b:q=b};this.isVisible=function(){return"block"===n.style.display};this.show=function(){q&&(m.src=q,q=void 0);n.style.display="block"};this.hide=function(){n.style.display="none"};this.markAsFocussed=function(b){n.className=b?"active":""};this.destroy=function(b){g.removeChild(n);b()};(function(){var b=g.ownerDocument,e=b.documentElement.namespaceURI;n=b.createElementNS(e,
"div");m=b.createElementNS(e,"img");m.width=64;m.height=64;n.appendChild(m);n.style.width="64px";n.style.height="70px";n.style.position="absolute";n.style.top="-80px";n.style.left="-34px";n.style.display=k?"block":"none";g.appendChild(n)})()};
// Input 17
gui.EditInfoHandle=function(g){var k=[],e,n=g.ownerDocument,m=n.documentElement.namespaceURI;this.setEdits=function(g){k=g;var b,h,r,d;e.innerHTML="";for(g=0;g<k.length;g+=1)b=n.createElementNS(m,"div"),b.className="editInfo",h=n.createElementNS(m,"span"),h.className="editInfoColor",h.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",k[g].memberid),r=n.createElementNS(m,"span"),r.className="editInfoAuthor",r.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",k[g].memberid),
d=n.createElementNS(m,"span"),d.className="editInfoTime",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",k[g].memberid),d.innerHTML=k[g].time,b.appendChild(h),b.appendChild(r),b.appendChild(d),e.appendChild(b)};this.show=function(){e.style.display="block"};this.hide=function(){e.style.display="none"};this.destroy=function(m){g.removeChild(e);m()};e=n.createElementNS(m,"div");e.setAttribute("class","editInfoHandle");e.style.display="none";g.appendChild(e)};
// Input 18
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
gui.KeyboardHandler=function(){function g(e,g){g||(g=k.None);return e+":"+g}var k=gui.KeyboardHandler.Modifier,e=null,n={};this.setDefault=function(g){e=g};this.bind=function(e,k,b){e=g(e,k);runtime.assert(!1===n.hasOwnProperty(e),"tried to overwrite the callback handler of key combo: "+e);n[e]=b};this.unbind=function(e,k){var b=g(e,k);delete n[b]};this.reset=function(){e=null;n={}};this.handleEvent=function(m){var q=m.keyCode,b=k.None;m.metaKey&&(b|=k.Meta);m.ctrlKey&&(b|=k.Ctrl);m.altKey&&(b|=k.Alt);
m.shiftKey&&(b|=k.Shift);q=g(q,b);q=n[q];b=!1;q?b=q():null!==e&&(b=e(m));b&&(m.preventDefault?m.preventDefault():m.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,CtrlAlt:6,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
// Input 19
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
odf.Namespaces={namespaceMap:{db:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",dc:"http://purl.org/dc/elements/1.1/",dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chart:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",form:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",meta:"urn:oasis:names:tc:opendocument:xmlns:meta:1.0",number:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",
office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace"},prefixMap:{},dbns:"urn:oasis:names:tc:opendocument:xmlns:database:1.0",
dcns:"http://purl.org/dc/elements/1.1/",dr3dns:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",drawns:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chartns:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fons:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",formns:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",officens:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",presentationns:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",
stylens:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svgns:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",tablens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",textns:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlinkns:"http://www.w3.org/1999/xlink",xmlns:"http://www.w3.org/XML/1998/namespace"};(function(){var g=odf.Namespaces.namespaceMap,k=odf.Namespaces.prefixMap,e;for(e in g)g.hasOwnProperty(e)&&(k[g[e]]=e)})();
odf.Namespaces.forEachPrefix=function(g){var k=odf.Namespaces.namespaceMap,e;for(e in k)k.hasOwnProperty(e)&&g(e,k[e])};odf.Namespaces.lookupNamespaceURI=function(g){var k=null;odf.Namespaces.namespaceMap.hasOwnProperty(g)&&(k=odf.Namespaces.namespaceMap[g]);return k};odf.Namespaces.lookupPrefix=function(g){var k=odf.Namespaces.prefixMap;return k.hasOwnProperty(g)?k[g]:null};odf.Namespaces.lookupNamespaceURI.lookupNamespaceURI=odf.Namespaces.lookupNamespaceURI;
// Input 20
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
odf.OdfUtils=function(){function g(a){return"image"===(a&&a.localName)&&a.namespaceURI===s}function k(a){return null!==a&&a.nodeType===Node.ELEMENT_NODE&&"frame"===a.localName&&a.namespaceURI===s&&"as-char"===a.getAttributeNS(t,"anchor-type")}function e(a){var c=a&&a.localName;return("p"===c||"h"===c)&&a.namespaceURI===t}function n(a){for(;a&&!e(a);)a=a.parentNode;return a}function m(a){return/^[ \t\r\n]+$/.test(a)}function q(a){if(null===a||a.nodeType!==Node.ELEMENT_NODE)return!1;var c=a.localName;
return/^(span|p|h|a|meta)$/.test(c)&&a.namespaceURI===t||"span"===c&&"annotationHighlight"===a.className}function b(a){var c=a&&a.localName,b;b=!1;c&&(b=a.namespaceURI,b=b===t?"s"===c||"tab"===c||"line-break"===c:k(a));return b}function h(a){var c=a&&a.localName,b=!1;c&&(a=a.namespaceURI,a===t&&(b="s"===c));return b}function r(a){for(;null!==a.firstChild&&q(a);)a=a.firstChild;return a}function d(a){for(;null!==a.lastChild&&q(a);)a=a.lastChild;return a}function f(a){for(;!e(a)&&null===a.previousSibling;)a=
a.parentNode;return e(a)?null:d(a.previousSibling)}function a(a){for(;!e(a)&&null===a.nextSibling;)a=a.parentNode;return e(a)?null:r(a.nextSibling)}function c(a){for(var c=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=f(a);else return!m(a.data.substr(a.length-1,1));else b(a)?(c=!1===h(a),a=null):a=f(a);return c}function p(c){var d=!1,f;for(c=c&&r(c);c;){f=c.nodeType===Node.TEXT_NODE?c.length:0;if(0<f&&!m(c.data)){d=!0;break}if(b(c)){d=!0;break}c=a(c)}return d}function l(c,b){return m(c.data.substr(b))?
!p(a(c)):!1}function u(a,d){var e=a.data,p;if(!m(e[d])||b(a.parentNode))return!1;0<d?m(e[d-1])||(p=!0):c(f(a))&&(p=!0);return!0===p?l(a,d)?!1:!0:!1}function B(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?{value:parseFloat(a[1]),unit:a[3]}:null}function w(a){return(a=B(a))&&(0>a.value||"%"===a.unit)?null:a}function y(a){return(a=B(a))&&"%"!==a.unit?null:a}function v(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;
case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}var t=odf.Namespaces.textns,s=odf.Namespaces.drawns,N=/^\s*$/,z=new core.DomUtils;this.isImage=g;this.isCharacterFrame=k;this.isTextSpan=function(a){return"span"===(a&&a.localName)&&a.namespaceURI===t};this.isParagraph=
e;this.getParagraphElement=n;this.isWithinTrackedChanges=function(a,c){for(;a&&a!==c;){if(a.namespaceURI===t&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===t};this.isLineBreak=function(a){return"line-break"===(a&&a.localName)&&a.namespaceURI===t};this.isODFWhitespace=m;this.isGroupingElement=q;this.isCharacterElement=b;this.isSpaceElement=h;this.firstChild=r;this.lastChild=d;this.previousNode=f;
this.nextNode=a;this.scanLeftForNonSpace=c;this.lookLeftForCharacter=function(a){var d,e=d=0;a.nodeType===Node.TEXT_NODE&&(e=a.length);0<e?(d=a.data,d=m(d.substr(e-1,1))?1===e?c(f(a))?2:0:m(d.substr(e-2,1))?0:2:1):b(a)&&(d=1);return d};this.lookRightForCharacter=function(a){var c=!1,d=0;a&&a.nodeType===Node.TEXT_NODE&&(d=a.length);0<d?c=!m(a.data.substr(0,1)):b(a)&&(c=!0);return c};this.scanLeftForAnyCharacter=function(a){var c=!1,e;for(a=a&&d(a);a;){e=a.nodeType===Node.TEXT_NODE?a.length:0;if(0<
e&&!m(a.data)){c=!0;break}if(b(a)){c=!0;break}a=f(a)}return c};this.scanRightForAnyCharacter=p;this.isTrailingWhitespace=l;this.isSignificantWhitespace=u;this.isDowngradableSpaceElement=function(b){return b.namespaceURI===t&&"s"===b.localName?c(f(b))&&p(a(b)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&N.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=B;this.parseNonNegativeLength=w;this.parseFoFontSize=function(a){var c;c=(c=
B(a))&&(0>=c.value||"%"===c.unit)?null:c;return c||y(a)};this.parseFoLineHeight=function(a){return w(a)||y(a)};this.getImpactedParagraphs=function(a){var c,b,d;c=a.commonAncestorContainer;var f=[],p=[];for(c.nodeType===Node.ELEMENT_NODE&&(f=z.getElementsByTagNameNS(c,t,"p").concat(z.getElementsByTagNameNS(c,t,"h")));c&&!e(c);)c=c.parentNode;c&&f.push(c);b=f.length;for(c=0;c<b;c+=1)d=f[c],z.rangeIntersectsNode(a,d)&&p.push(d);return p};this.getTextNodes=function(a,c){var b=a.startContainer.ownerDocument.createRange(),
d;d=z.getNodesInRange(a,function(d){b.selectNodeContents(d);if(d.nodeType===Node.TEXT_NODE){if(c&&z.rangesIntersect(a,b)||z.containsRange(a,b))return Boolean(n(d)&&(!m(d.textContent)||u(d,0)))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}else if(z.rangesIntersect(a,b)&&v(d))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});b.detach();return d};this.getTextElements=function(a,c,d){var f=a.startContainer.ownerDocument.createRange(),e;e=z.getNodesInRange(a,function(e){f.selectNodeContents(e);
if(b(e.parentNode))return NodeFilter.FILTER_REJECT;if(e.nodeType===Node.TEXT_NODE){if(c&&z.rangesIntersect(a,f)||z.containsRange(a,f))if(d||Boolean(n(e)&&(!m(e.textContent)||u(e,0))))return NodeFilter.FILTER_ACCEPT}else if(b(e)){if(c&&z.rangesIntersect(a,f)||z.containsRange(a,f))return NodeFilter.FILTER_ACCEPT}else if(v(e)||q(e))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});f.detach();return e};this.getParagraphElements=function(a){var c=a.startContainer.ownerDocument.createRange(),
b;b=z.getNodesInRange(a,function(b){c.selectNodeContents(b);if(e(b)){if(z.rangesIntersect(a,c))return NodeFilter.FILTER_ACCEPT}else if(v(b)||q(b))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return b};this.getImageElements=function(a){var c=a.startContainer.ownerDocument.createRange(),b;b=z.getNodesInRange(a,function(b){c.selectNodeContents(b);return g(b)&&z.containsRange(a,c)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});c.detach();return b}};
// Input 21
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
ops.Server=function(){};ops.Server.prototype.connect=function(g,k){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(g,k,e,n){};ops.Server.prototype.joinSession=function(g,k,e,n){};ops.Server.prototype.leaveSession=function(g,k,e,n){};ops.Server.prototype.getGenesisUrl=function(g){};
// Input 22
xmldom.LSSerializerFilter=function(){};xmldom.LSSerializerFilter.prototype.acceptNode=function(g){};
// Input 23
xmldom.XPathIterator=function(){};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};
function createXPathSingleton(){function g(b,a,c){return-1!==b&&(b<a||-1===a)&&(b<c||-1===c)}function k(b){for(var a=[],c=0,e=b.length,l;c<e;){var h=b,m=e,k=a,n="",q=[],r=h.indexOf("[",c),s=h.indexOf("/",c),N=h.indexOf("=",c);g(s,r,N)?(n=h.substring(c,s),c=s+1):g(r,s,N)?(n=h.substring(c,r),c=d(h,r,q)):g(N,s,r)?(n=h.substring(c,N),c=N):(n=h.substring(c,m),c=m);k.push({location:n,predicates:q});if(c<e&&"="===b[c]){l=b.substring(c+1,e);if(2<l.length&&("'"===l[0]||'"'===l[0]))l=l.slice(1,l.length-1);
else try{l=parseInt(l,10)}catch(z){}c=e}}return{steps:a,value:l}}function e(){var b=null,a=!1;this.setNode=function(a){b=a};this.reset=function(){a=!1};this.next=function(){var c=a?null:b;a=!0;return c}}function n(b,a,c){this.reset=function(){b.reset()};this.next=function(){for(var d=b.next();d;){d.nodeType===Node.ELEMENT_NODE&&(d=d.getAttributeNodeNS(a,c));if(d)break;d=b.next()}return d}}function m(b,a){var c=b.next(),d=null;this.reset=function(){b.reset();c=b.next();d=null};this.next=function(){for(;c;){if(d)if(a&&
d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&d!==c;)d=d.parentNode;d===c?c=b.next():d=d.nextSibling}else{do(d=c.firstChild)||(c=b.next());while(c&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function q(b,a){this.reset=function(){b.reset()};this.next=function(){for(var c=b.next();c&&!a(c);)c=b.next();return c}}function b(b,a,c){a=a.split(":",2);var d=c(a[0]),e=a[1];return new q(b,function(a){return a.localName===e&&a.namespaceURI===d})}function h(b,a,c){var d=new e,l=r(d,
a,c),h=a.value;return void 0===h?new q(b,function(a){d.setNode(a);l.reset();return null!==l.next()}):new q(b,function(a){d.setNode(a);l.reset();return(a=l.next())?a.nodeValue===h:!1})}var r,d;d=function(b,a,c){for(var d=a,e=b.length,h=0;d<e;)"]"===b[d]?(h-=1,0>=h&&c.push(k(b.substring(a,d)))):"["===b[d]&&(0>=h&&(a=d+1),h+=1),d+=1;return d};r=function(d,a,c){var e,l,g,k;for(e=0;e<a.steps.length;e+=1){g=a.steps[e];l=g.location;if(""===l)d=new m(d,!1);else if("@"===l[0]){l=l.substr(1).split(":",2);k=
c(l[0]);if(!k)throw"No namespace associated with the prefix "+l[0];d=new n(d,k,l[1])}else"."!==l&&(d=new m(d,!1),-1!==l.indexOf(":")&&(d=b(d,l,c)));for(l=0;l<g.predicates.length;l+=1)k=g.predicates[l],d=h(d,k,c)}return d};return{getODFElementsWithXPath:function(b,a,c){var d=b.ownerDocument,l=[],h=null;if(d&&"function"===typeof d.evaluate)for(c=d.evaluate(a,b,c,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),h=c.iterateNext();null!==h;)h.nodeType===Node.ELEMENT_NODE&&l.push(h),h=c.iterateNext();else{l=
new e;l.setNode(b);b=k(a);l=r(l,b,c);b=[];for(c=l.next();c;)b.push(c),c=l.next();l=b}return l}}}xmldom.XPath=createXPathSingleton();
// Input 24
runtime.loadClass("core.DomUtils");
core.Cursor=function(g,k){function e(a){a.parentNode&&(h.push(a.previousSibling),h.push(a.nextSibling),a.parentNode.removeChild(a))}function n(a,c,b){if(c.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(c),"putCursorIntoTextNode: invalid container");var d=c.parentNode;runtime.assert(Boolean(d),"putCursorIntoTextNode: container without parent");runtime.assert(0<=b&&b<=c.length,"putCursorIntoTextNode: offset is out of bounds");0===b?d.insertBefore(a,c):(b!==c.length&&c.splitText(b),d.insertBefore(a,
c.nextSibling))}else c.nodeType===Node.ELEMENT_NODE&&c.insertBefore(a,c.childNodes.item(b));h.push(a.previousSibling);h.push(a.nextSibling)}var m=g.createElementNS("urn:webodf:names:cursor","cursor"),q=g.createElementNS("urn:webodf:names:cursor","anchor"),b,h=[],r=g.createRange(),d,f=new core.DomUtils;this.getNode=function(){return m};this.getAnchorNode=function(){return q.parentNode?q:m};this.getSelectedRange=function(){d?(r.setStartBefore(m),r.collapse(!0)):(r.setStartAfter(b?q:m),r.setEndBefore(b?
m:q));return r};this.setSelectedRange=function(a,c){r&&r!==a&&r.detach();r=a;b=!1!==c;(d=a.collapsed)?(e(q),e(m),n(m,a.startContainer,a.startOffset)):(e(q),e(m),n(b?m:q,a.endContainer,a.endOffset),n(b?q:m,a.startContainer,a.startOffset));h.forEach(f.normalizeTextNodes);h.length=0};this.hasForwardSelection=function(){return b};this.remove=function(){e(m);h.forEach(f.normalizeTextNodes);h.length=0};m.setAttributeNS("urn:webodf:names:cursor","memberId",k);q.setAttributeNS("urn:webodf:names:cursor","memberId",
k)};
// Input 25
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(g){};(function(){return core.PositionFilter})();
// Input 26
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var g={},k=core.PositionFilter.FilterResult.FILTER_ACCEPT,e=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(n){for(var m in g)if(g.hasOwnProperty(m)&&g[m].acceptPosition(n)===e)return e;return k};this.addFilter=function(e,m){g[e]=m};this.removeFilter=function(e){delete g[e]}};
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
gui.AnnotatableCanvas=function(){};gui.AnnotatableCanvas.prototype.refreshSize=function(){};gui.AnnotatableCanvas.prototype.getZoomLevel=function(){};gui.AnnotatableCanvas.prototype.getSizer=function(){};
gui.AnnotationViewManager=function(g,k,e){function n(a){var c=a.node,b=a.end;a=r.createRange();b&&(a.setStart(c,c.childNodes.length),a.setEnd(b,0),b=d.getTextNodes(a,!1),b.forEach(function(a){var b=r.createElement("span"),d=c.getAttributeNS(odf.Namespaces.officens,"name");b.className="annotationHighlight";b.setAttribute("annotation",d);a.parentNode.insertBefore(b,a);b.appendChild(a)}));a.detach()}function m(a){var c=g.getSizer();a?(e.style.display="inline-block",c.style.paddingRight=f.getComputedStyle(e).width):
(e.style.display="none",c.style.paddingRight=0);g.refreshSize()}function q(){h.sort(function(a,c){return a.node.compareDocumentPosition(c.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function b(){var a;for(a=0;a<h.length;a+=1){var c=h[a],b=c.node.parentElement,d=b.nextElementSibling,f=d.nextElementSibling,m=b.parentElement,k=0,k=h[h.indexOf(c)-1],n=void 0,c=g.getZoomLevel();b.style.left=(e.getBoundingClientRect().left-m.getBoundingClientRect().left)/c+"px";b.style.width=e.getBoundingClientRect().width/
c+"px";d.style.width=parseFloat(b.style.left)-30+"px";k&&(n=k.node.parentElement.getBoundingClientRect(),20>=(m.getBoundingClientRect().top-n.bottom)/c?b.style.top=Math.abs(m.getBoundingClientRect().top-n.bottom)/c+20+"px":b.style.top="0px");f.style.left=d.getBoundingClientRect().width/c+"px";var d=f.style,m=f.getBoundingClientRect().left/c,k=f.getBoundingClientRect().top/c,n=b.getBoundingClientRect().left/c,q=b.getBoundingClientRect().top/c,r=0,s=0,r=n-m,r=r*r,s=q-k,s=s*s,m=Math.sqrt(r+s);d.width=
m+"px";k=Math.asin((b.getBoundingClientRect().top-f.getBoundingClientRect().top)/(c*parseFloat(f.style.width)));f.style.transform="rotate("+k+"rad)";f.style.MozTransform="rotate("+k+"rad)";f.style.WebkitTransform="rotate("+k+"rad)";f.style.msTransform="rotate("+k+"rad)"}}var h=[],r=k.ownerDocument,d=new odf.OdfUtils,f=runtime.getWindow();runtime.assert(Boolean(f),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=b;this.addAnnotation=function(a){m(!0);
h.push({node:a.node,end:a.end});q();var c=r.createElement("div"),d=r.createElement("div"),f=r.createElement("div"),e=r.createElement("div"),g=r.createElement("div"),k=a.node;c.className="annotationWrapper";k.parentNode.insertBefore(c,k);d.className="annotationNote";d.appendChild(k);g.className="annotationRemoveButton";d.appendChild(g);f.className="annotationConnector horizontal";e.className="annotationConnector angular";c.appendChild(d);c.appendChild(f);c.appendChild(e);a.end&&n(a);b()};this.forgetAnnotations=
function(){for(;h.length;){var a=h[0],c=h.indexOf(a),b=a.node,d=b.parentNode.parentNode;"div"===d.localName&&(d.parentNode.insertBefore(b,d),d.parentNode.removeChild(d));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=r.querySelectorAll('span.annotationHighlight[annotation="'+a+'"]');d=b=void 0;for(b=0;b<a.length;b+=1){for(d=a.item(b);d.firstChild;)d.parentNode.insertBefore(d.firstChild,d);d.parentNode.removeChild(d)}-1!==c&&h.splice(c,1);0===h.length&&m(!1)}}};
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
runtime.loadClass("core.Cursor");runtime.loadClass("core.DomUtils");runtime.loadClass("core.PositionIterator");runtime.loadClass("core.PositionFilter");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.OdfUtils");
gui.SelectionMover=function(g,k){function e(){w.setUnfilteredPosition(g.getNode(),0);return w}function n(a,c){var b,d=null;a&&0<a.length&&(b=c?a.item(a.length-1):a.item(0));b&&(d={top:b.top,left:c?b.right:b.left,bottom:b.bottom});return d}function m(a,c,b,d){var f=a.nodeType;b.setStart(a,c);b.collapse(!d);d=n(b.getClientRects(),!0===d);!d&&0<c&&(b.setStart(a,c-1),b.setEnd(a,c),d=n(b.getClientRects(),!0));d||(f===Node.ELEMENT_NODE&&0<c&&a.childNodes.length>=c?d=m(a,c-1,b,!0):a.nodeType===Node.TEXT_NODE&&
0<c?d=m(a,c-1,b,!0):a.previousSibling?d=m(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,b,!0):a.parentNode&&a.parentNode!==k?d=m(a.parentNode,0,b,!1):(b.selectNode(k),d=n(b.getClientRects(),!1)));runtime.assert(Boolean(d),"No visible rectangle found");return d}function q(a,c,b){var d=a,f=e(),l,h=k.ownerDocument.createRange(),p=g.getSelectedRange().cloneRange(),n;for(l=m(f.container(),f.unfilteredDomOffset(),h);0<
d&&b();)d-=1;c?(c=f.container(),f=f.unfilteredDomOffset(),-1===B.comparePoints(p.startContainer,p.startOffset,c,f)?(p.setStart(c,f),n=!1):p.setEnd(c,f)):(p.setStart(f.container(),f.unfilteredDomOffset()),p.collapse(!0));g.setSelectedRange(p,n);f=e();p=m(f.container(),f.unfilteredDomOffset(),h);if(p.top===l.top||void 0===y)y=p.left;runtime.clearTimeout(v);v=runtime.setTimeout(function(){y=void 0},2E3);h.detach();return a-d}function b(a){var c=e();return a.acceptPosition(c)===t&&(c.setUnfilteredPosition(g.getAnchorNode(),
0),a.acceptPosition(c)===t)?!0:!1}function h(a,c,b){for(var d=new core.LoopWatchDog(1E4),f=0,e=0,l=0<=c?1:-1,h=0<=c?a.nextPosition:a.previousPosition;0!==c&&h();)d.check(),e+=l,b.acceptPosition(a)===t&&(c-=l,f+=e,e=0);return f}function r(a,c,b){for(var d=e(),f=new core.LoopWatchDog(1E4),l=0,h=0;0<a&&d.nextPosition();)f.check(),b.acceptPosition(d)===t&&(l+=1,c.acceptPosition(d)===t&&(h+=l,l=0,a-=1));return h}function d(a,c,b){for(var d=e(),f=new core.LoopWatchDog(1E4),l=0,h=0;0<a&&d.previousPosition();)f.check(),
b.acceptPosition(d)===t&&(l+=1,c.acceptPosition(d)===t&&(h+=l,l=0,a-=1));return h}function f(a,c){var b=e();return h(b,a,c)}function a(a,c,b){var d=e(),f=u.getParagraphElement(d.getCurrentNode()),l=0;d.setUnfilteredPosition(a,c);b.acceptPosition(d)!==t&&(l=h(d,-1,b),0===l||f&&f!==u.getParagraphElement(d.getCurrentNode()))&&(d.setUnfilteredPosition(a,c),l=h(d,1,b));return l}function c(a,c){var b=e(),d=0,f=0,l=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var h=c,p=l,g=b,n=g.container(),q=0,r=null,v=void 0,
u=10,w=void 0,B=0,I=void 0,C=void 0,Y=void 0,w=void 0,H=k.ownerDocument.createRange(),X=new core.LoopWatchDog(1E4),w=m(n,g.unfilteredDomOffset(),H),I=w.top,C=void 0===y?w.left:y,Y=I;!0===(0>p?g.previousPosition():g.nextPosition());)if(X.check(),h.acceptPosition(g)===t&&(q+=1,n=g.container(),w=m(n,g.unfilteredDomOffset(),H),w.top!==I)){if(w.top!==Y&&Y!==I)break;Y=w.top;w=Math.abs(C-w.left);if(null===r||w<u)r=n,v=g.unfilteredDomOffset(),u=w,B=q}null!==r?(g.setUnfilteredPosition(r,v),q=B):q=0;H.detach();
d+=q;if(0===d)break;f+=d;a-=1}return f*l}function p(a,c){var b,d,f,l,h=e(),p=u.getParagraphElement(h.getCurrentNode()),g=0,n=k.ownerDocument.createRange();0>a?(b=h.previousPosition,d=-1):(b=h.nextPosition,d=1);for(f=m(h.container(),h.unfilteredDomOffset(),n);b.call(h);)if(c.acceptPosition(h)===t){if(u.getParagraphElement(h.getCurrentNode())!==p)break;l=m(h.container(),h.unfilteredDomOffset(),n);if(l.bottom!==f.bottom&&(f=l.top>=f.top&&l.bottom<f.bottom||l.top<=f.top&&l.bottom>f.bottom,!f))break;g+=
d;f=l}n.detach();return g}function l(a,c,b){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=e(),f=d.container(),l=d.unfilteredDomOffset(),h=0,p=new core.LoopWatchDog(1E4);for(d.setUnfilteredPosition(a,c);b.acceptPosition(d)!==t&&d.previousPosition();)p.check();a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");c=d.unfilteredDomOffset();for(d.setUnfilteredPosition(f,l);b.acceptPosition(d)!==
t&&d.previousPosition();)p.check();f=B.comparePoints(a,c,d.container(),d.unfilteredDomOffset());if(0>f)for(;d.nextPosition()&&(p.check(),b.acceptPosition(d)===t&&(h+=1),d.container()!==a||d.unfilteredDomOffset()!==c););else if(0<f)for(;d.previousPosition()&&(p.check(),b.acceptPosition(d)!==t||(h-=1,d.container()!==a||d.unfilteredDomOffset()!==c)););return h}var u=new odf.OdfUtils,B=new core.DomUtils,w,y,v,t=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,c){return q(a,
c||!1,w.nextPosition)};this.movePointBackward=function(a,c){return q(a,c||!1,w.previousPosition)};this.getStepCounter=function(){return{countSteps:f,convertForwardStepsBetweenFilters:r,convertBackwardStepsBetweenFilters:d,countLinesSteps:c,countStepsToLineBoundary:p,countStepsToPosition:l,isPositionWalkable:b,countPositionsToNearestStep:a}};(function(){w=gui.SelectionMover.createPositionIterator(k);var a=k.ownerDocument.createRange();a.setStart(w.container(),w.unfilteredDomOffset());a.collapse(!0);
g.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(g){var k=new function(){this.acceptNode=function(e){return e&&"urn:webodf:names:cursor"!==e.namespaceURI&&"urn:webodf:names:editinfo"!==e.namespaceURI?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}};return new core.PositionIterator(g,5,k,!1)};(function(){return gui.SelectionMover})();
// Input 29
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
odf.MetadataManager=function(g){function k(m,k){m&&(Object.keys(m).forEach(function(b){n[b]=m[b]}),e.mapKeyValObjOntoNode(g,m,odf.Namespaces.lookupNamespaceURI));k&&(k.forEach(function(b){delete n[b]}),e.removeKeyElementsFromNode(g,k,odf.Namespaces.lookupNamespaceURI))}var e=new core.DomUtils,n={};this.setMetadata=k;this.incrementEditingCycles=function(){var e=parseInt(n["meta:editing-cycles"]||0,10)+1;k({"meta:editing-cycles":e},null)};n=e.getKeyValRepresentationOfNode(g,odf.Namespaces.lookupPrefix)};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("xmldom.XPath");runtime.loadClass("core.CSSUnits");odf.StyleTreeNode=function(g){this.derivedStyles={};this.element=g};
odf.Style2CSS=function(){function g(a){var c,b,d,f={};if(!a)return f;for(a=a.firstElementChild;a;){if(b=a.namespaceURI!==l||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===w&&"list-style"===a.localName?"list":a.namespaceURI!==l||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(l,"family"))(c=a.getAttributeNS(l,"name"))||(c=""),f.hasOwnProperty(b)?d=f[b]:f[b]=d={},d[c]=a;a=a.nextElementSibling}return f}function k(a,c){if(a.hasOwnProperty(c))return a[c];
var b,d=null;for(b in a)if(a.hasOwnProperty(b)&&(d=k(a[b].derivedStyles,c)))break;return d}function e(a,c,b){var d,f,h;if(!c.hasOwnProperty(a))return null;d=new odf.StyleTreeNode(c[a]);f=d.element.getAttributeNS(l,"parent-style-name");h=null;f&&(h=k(b,f)||e(f,c,b));h?h.derivedStyles[a]=d:b[a]=d;delete c[a];return d}function n(a,c){for(var b in a)a.hasOwnProperty(b)&&e(b,a,c)}function m(a,c,b){var d=[];b=b.derivedStyles;var f;var e=t[a],l;void 0===e?c=null:(l=c?"["+e+'|style-name="'+c+'"]':"","presentation"===
e&&(e="draw",l=c?'[presentation|style-name="'+c+'"]':""),c=e+"|"+s[a].join(l+","+e+"|")+l);null!==c&&d.push(c);for(f in b)b.hasOwnProperty(f)&&(c=m(a,f,b[f]),d=d.concat(c));return d}function q(a,c,b){for(a=a&&a.firstElementChild;a&&(a.namespaceURI!==c||a.localName!==b);)a=a.nextElementSibling;return a}function b(a,c){var b="",d,f,e;for(d=0;d<c.length;d+=1)if(f=c[d],e=a.getAttributeNS(f[0],f[1])){e=e.trim();if(G.hasOwnProperty(f[1])){var l=e.indexOf(" "),h=void 0,p=void 0;-1!==l?(h=e.substring(0,l),
p=e.substring(l)):(h=e,p="");(h=O.parseLength(h))&&"pt"===h.unit&&0.75>h.value&&(e="0.75pt"+p)}f[2]&&(b+=f[2]+":"+e+";")}return b}function h(a){return(a=q(a,l,"text-properties"))?O.parseFoFontSize(a.getAttributeNS(c,"font-size")):null}function r(a,c,b,d){return c+c+b+b+d+d}function d(a,b,d,f){b='text|list[text|style-name="'+b+'"]';var e=d.getAttributeNS(w,"level");d=q(d,l,"list-level-properties");d=q(d,l,"list-level-label-alignment");var h,p;d&&(h=d.getAttributeNS(c,"text-indent"),p=d.getAttributeNS(c,
"margin-left"));h||(h="-0.6cm");d="-"===h.charAt(0)?h.substring(1):"-"+h;for(e=e&&parseInt(e,10);1<e;)b+=" > text|list-item > text|list",e-=1;if(p){e=b+" > text|list-item > *:not(text|list):first-child";e+="{";e=e+("margin-left:"+p+";")+"}";try{a.insertRule(e,a.cssRules.length)}catch(g){runtime.log("cannot load rule: "+e)}}f=b+" > text|list-item > *:not(text|list):first-child:before{"+f+";";f=f+"counter-increment:list;"+("margin-left:"+h+";");f+="width:"+d+";";f+="display:inline-block}";try{a.insertRule(f,
a.cssRules.length)}catch(m){runtime.log("cannot load rule: "+f)}}function f(e,g,k,n){if("list"===g)for(var u=n.element.firstChild,s,t;u;){if(u.namespaceURI===w)if(s=u,"list-level-style-number"===u.localName){var G=s;t=G.getAttributeNS(l,"num-format");var T=G.getAttributeNS(l,"num-suffix")||"",G=G.getAttributeNS(l,"num-prefix")||"",$={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},W="";G&&(W+=' "'+G+'"');W=$.hasOwnProperty(t)?W+(" counter(list, "+$[t]+")"):t?W+(' "'+t+
'"'):W+" ''";t="content:"+W+' "'+T+'"';d(e,k,s,t)}else"list-level-style-image"===u.localName?(t="content: none;",d(e,k,s,t)):"list-level-style-bullet"===u.localName&&(t="content: '"+s.getAttributeNS(w,"bullet-char")+"';",d(e,k,s,t));u=u.nextSibling}else if("page"===g){if(t=n.element,G=T=k="",u=q(t,l,"page-layout-properties"))if(s=t.getAttributeNS(l,"name"),k+=b(u,ja),(T=q(u,l,"background-image"))&&(G=T.getAttributeNS(y,"href"))&&(k=k+("background-image: url('odfkit:"+G+"');")+b(T,z)),"presentation"===
ba)for(t=(t=q(t.parentNode.parentElement,p,"master-styles"))&&t.firstElementChild;t;){if(t.namespaceURI===l&&"master-page"===t.localName&&t.getAttributeNS(l,"page-layout-name")===s){G=t.getAttributeNS(l,"name");T="draw|page[draw|master-page-name="+G+"] {"+k+"}";G="office|body, draw|page[draw|master-page-name="+G+"] {"+b(u,ka)+" }";try{e.insertRule(T,e.cssRules.length),e.insertRule(G,e.cssRules.length)}catch(da){throw da;}}t=t.nextElementSibling}else if("text"===ba){T="office|text {"+k+"}";G="office|body {width: "+
u.getAttributeNS(c,"page-width")+";}";try{e.insertRule(T,e.cssRules.length),e.insertRule(G,e.cssRules.length)}catch(S){throw S;}}}else{k=m(g,k,n).join(",");u="";if(s=q(n.element,l,"text-properties")){G=s;t=W="";T=1;s=""+b(G,N);$=G.getAttributeNS(l,"text-underline-style");"solid"===$&&(W+=" underline");$=G.getAttributeNS(l,"text-line-through-style");"solid"===$&&(W+=" line-through");W.length&&(s+="text-decoration:"+W+";");if(W=G.getAttributeNS(l,"font-name")||G.getAttributeNS(c,"font-family"))$=Z[W],
s+="font-family: "+($||W)+";";$=G.parentElement;if(G=h($)){for(;$;){if(G=h($)){if("%"!==G.unit){t="font-size: "+G.value*T+G.unit+";";break}T*=G.value/100}G=$;W=$="";$=null;"default-style"===G.localName?$=null:($=G.getAttributeNS(l,"parent-style-name"),W=G.getAttributeNS(l,"family"),$=C.getODFElementsWithXPath(K,$?"//style:*[@style:name='"+$+"'][@style:family='"+W+"']":"//style:default-style[@style:family='"+W+"']",odf.Namespaces.lookupNamespaceURI)[0])}t||(t="font-size: "+parseFloat(I)*T+Y.getUnits(I)+
";");s+=t}u+=s}if(s=q(n.element,l,"paragraph-properties"))t=s,s=""+b(t,x),(T=q(t,l,"background-image"))&&(G=T.getAttributeNS(y,"href"))&&(s=s+("background-image: url('odfkit:"+G+"');")+b(T,z)),(t=t.getAttributeNS(c,"line-height"))&&"normal"!==t&&(t=O.parseFoLineHeight(t),s="%"!==t.unit?s+("line-height: "+t.value+t.unit+";"):s+("line-height: "+t.value/100+";")),u+=s;if(s=q(n.element,l,"graphic-properties"))G=s,s=""+b(G,R),t=G.getAttributeNS(a,"opacity"),T=G.getAttributeNS(a,"fill"),G=G.getAttributeNS(a,
"fill-color"),"solid"===T||"hatch"===T?G&&"none"!==G?(t=isNaN(parseFloat(t))?1:parseFloat(t)/100,T=G.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,r),(G=(T=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(T))?{r:parseInt(T[1],16),g:parseInt(T[2],16),b:parseInt(T[3],16)}:null)&&(s+="background-color: rgba("+G.r+","+G.g+","+G.b+","+t+");")):s+="background: none;":"none"===T&&(s+="background: none;"),u+=s;if(s=q(n.element,l,"drawing-page-properties"))t=""+b(s,R),"true"===s.getAttributeNS(v,"background-visible")&&
(t+="background: none;"),u+=t;if(s=q(n.element,l,"table-cell-properties"))s=""+b(s,F),u+=s;if(s=q(n.element,l,"table-row-properties"))s=""+b(s,P),u+=s;if(s=q(n.element,l,"table-column-properties"))s=""+b(s,U),u+=s;if(s=q(n.element,l,"table-properties"))t=s,s=""+b(t,A),t=t.getAttributeNS(B,"border-model"),"collapsing"===t?s+="border-collapse:collapse;":"separating"===t&&(s+="border-collapse:separate;"),u+=s;if(0!==u.length)try{e.insertRule(k+"{"+u+"}",e.cssRules.length)}catch(ga){throw ga;}}for(var D in n.derivedStyles)n.derivedStyles.hasOwnProperty(D)&&
f(e,g,D,n.derivedStyles[D])}var a=odf.Namespaces.drawns,c=odf.Namespaces.fons,p=odf.Namespaces.officens,l=odf.Namespaces.stylens,u=odf.Namespaces.svgns,B=odf.Namespaces.tablens,w=odf.Namespaces.textns,y=odf.Namespaces.xlinkns,v=odf.Namespaces.presentationns,t={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),
paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},N=[[c,"color","color"],[c,"background-color","background-color"],[c,"font-weight","font-weight"],[c,"font-style","font-style"]],z=[[l,"repeat","background-repeat"]],x=[[c,"background-color","background-color"],[c,"text-align","text-align"],[c,"text-indent","text-indent"],[c,"padding","padding"],[c,"padding-left","padding-left"],[c,"padding-right","padding-right"],[c,"padding-top","padding-top"],[c,"padding-bottom","padding-bottom"],[c,"border-left","border-left"],[c,"border-right",
"border-right"],[c,"border-top","border-top"],[c,"border-bottom","border-bottom"],[c,"margin","margin"],[c,"margin-left","margin-left"],[c,"margin-right","margin-right"],[c,"margin-top","margin-top"],[c,"margin-bottom","margin-bottom"],[c,"border","border"]],R=[[c,"background-color","background-color"],[c,"min-height","min-height"],[a,"stroke","border"],[u,"stroke-color","border-color"],[u,"stroke-width","border-width"],[c,"border","border"],[c,"border-left","border-left"],[c,"border-right","border-right"],
[c,"border-top","border-top"],[c,"border-bottom","border-bottom"]],F=[[c,"background-color","background-color"],[c,"border-left","border-left"],[c,"border-right","border-right"],[c,"border-top","border-top"],[c,"border-bottom","border-bottom"],[c,"border","border"]],U=[[l,"column-width","width"]],P=[[l,"row-height","height"],[c,"keep-together",null]],A=[[l,"width","width"],[c,"margin-left","margin-left"],[c,"margin-right","margin-right"],[c,"margin-top","margin-top"],[c,"margin-bottom","margin-bottom"]],
ja=[[c,"background-color","background-color"],[c,"padding","padding"],[c,"padding-left","padding-left"],[c,"padding-right","padding-right"],[c,"padding-top","padding-top"],[c,"padding-bottom","padding-bottom"],[c,"border","border"],[c,"border-left","border-left"],[c,"border-right","border-right"],[c,"border-top","border-top"],[c,"border-bottom","border-bottom"],[c,"margin","margin"],[c,"margin-left","margin-left"],[c,"margin-right","margin-right"],[c,"margin-top","margin-top"],[c,"margin-bottom",
"margin-bottom"]],ka=[[c,"page-width","width"],[c,"page-height","height"]],G={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,"stroke-width":!0},Z={},O=new odf.OdfUtils,ba,K,I,C=xmldom.XPath,Y=new core.CSSUnits;this.style2css=function(a,c,b,d,e){for(var l,h,p,k;c.cssRules.length;)c.deleteRule(c.cssRules.length-1);l=null;d&&(l=d.ownerDocument,K=d.parentNode);e&&(l=e.ownerDocument,K=e.parentNode);if(l)for(k in odf.Namespaces.forEachPrefix(function(a,b){h="@namespace "+
a+" url("+b+");";try{c.insertRule(h,c.cssRules.length)}catch(d){}}),Z=b,ba=a,I=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=g(d),d=g(e),e={},t)if(t.hasOwnProperty(k))for(p in b=e[k]={},n(a[k],b),n(d[k],b),b)b.hasOwnProperty(p)&&f(c,k,p,b[p])}};
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
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
odf.StyleInfo=function(){function g(a,c){var b,d,f,e,l,h=0;if(b=x[a.localName])if(f=b[a.namespaceURI])h=f.length;for(b=0;b<h;b+=1)d=f[b],e=d.ns,l=d.localname,(d=a.getAttributeNS(e,l))&&a.setAttributeNS(e,N[e]+l,c+d);for(f=a.firstElementChild;f;)g(f,c),f=f.nextElementSibling}function k(a,c){var b,d,f,e,l,h=0;if(b=x[a.localName])if(f=b[a.namespaceURI])h=f.length;for(b=0;b<h;b+=1)if(d=f[b],e=d.ns,l=d.localname,d=a.getAttributeNS(e,l))d=d.replace(c,""),a.setAttributeNS(e,N[e]+l,d);for(f=a.firstElementChild;f;)k(f,
c),f=f.nextElementSibling}function e(a,c){var b,d,f,e,l,h=0;if(b=x[a.localName])if(f=b[a.namespaceURI])h=f.length;for(b=0;b<h;b+=1)if(e=f[b],d=e.ns,l=e.localname,d=a.getAttributeNS(d,l))c=c||{},e=e.keyname,c.hasOwnProperty(e)?c[e][d]=1:(l={},l[d]=1,c[e]=l);return c}function n(a,c){var b,d;e(a,c);for(b=a.firstChild;b;)b.nodeType===Node.ELEMENT_NODE&&(d=b,n(d,c)),b=b.nextSibling}function m(a,c,b){this.key=a;this.name=c;this.family=b;this.requires={}}function q(a,c,b){var d=a+'"'+c,f=b[d];f||(f=b[d]=
new m(d,a,c));return f}function b(a,c,d){var f,e,l,h,p,g=0;f=a.getAttributeNS(v,"name");h=a.getAttributeNS(v,"family");f&&h&&(c=q(f,h,d));if(c){if(f=x[a.localName])if(l=f[a.namespaceURI])g=l.length;for(f=0;f<g;f+=1)if(h=l[f],e=h.ns,p=h.localname,e=a.getAttributeNS(e,p))h=h.keyname,h=q(e,h,d),c.requires[h.key]=h}for(a=a.firstElementChild;a;)b(a,c,d),a=a.nextElementSibling;return d}function h(a,c){var b=c[a.family];b||(b=c[a.family]={});b[a.name]=1;Object.keys(a.requires).forEach(function(b){h(a.requires[b],
c)})}function r(a,c){var d=b(a,null,{});Object.keys(d).forEach(function(a){a=d[a];var b=c[a.family];b&&b.hasOwnProperty(a.name)&&h(a,c)})}function d(a,c){function b(c){(c=h.getAttributeNS(v,c))&&(a[c]=!0)}var f=["font-name","font-name-asian","font-name-complex"],e,h;for(e=c&&c.firstElementChild;e;)h=e,f.forEach(b),d(a,h),e=e.nextElementSibling}function f(a,c){function b(a){var d=h.getAttributeNS(v,a);d&&c.hasOwnProperty(d)&&h.setAttributeNS(v,"style:"+a,c[d])}var d=["font-name","font-name-asian",
"font-name-complex"],e,h;for(e=a&&a.firstElementChild;e;)h=e,d.forEach(b),f(h,c),e=e.nextElementSibling}var a=odf.Namespaces.chartns,c=odf.Namespaces.dbns,p=odf.Namespaces.dr3dns,l=odf.Namespaces.drawns,u=odf.Namespaces.formns,B=odf.Namespaces.numberns,w=odf.Namespaces.officens,y=odf.Namespaces.presentationns,v=odf.Namespaces.stylens,t=odf.Namespaces.tablens,s=odf.Namespaces.textns,N={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},z={text:[{ens:v,en:"tab-stop",ans:v,a:"leader-text-style"},{ens:v,en:"drop-cap",ans:v,a:"style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-body-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-style-name"},{ens:s,en:"a",ans:s,a:"style-name"},{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"linenumbering-configuration",
ans:s,a:"style-name"},{ens:s,en:"list-level-style-number",ans:s,a:"style-name"},{ens:s,en:"ruby-text",ans:s,a:"style-name"},{ens:s,en:"span",ans:s,a:"style-name"},{ens:s,en:"a",ans:s,a:"visited-style-name"},{ens:v,en:"text-properties",ans:v,a:"text-line-through-text-style"},{ens:s,en:"alphabetical-index-source",ans:s,a:"main-entry-style-name"},{ens:s,en:"index-entry-bibliography",ans:s,a:"style-name"},{ens:s,en:"index-entry-chapter",ans:s,a:"style-name"},{ens:s,en:"index-entry-link-end",ans:s,a:"style-name"},
{ens:s,en:"index-entry-link-start",ans:s,a:"style-name"},{ens:s,en:"index-entry-page-number",ans:s,a:"style-name"},{ens:s,en:"index-entry-span",ans:s,a:"style-name"},{ens:s,en:"index-entry-tab-stop",ans:s,a:"style-name"},{ens:s,en:"index-entry-text",ans:s,a:"style-name"},{ens:s,en:"index-title-template",ans:s,a:"style-name"},{ens:s,en:"list-level-style-bullet",ans:s,a:"style-name"},{ens:s,en:"outline-level-style",ans:s,a:"style-name"}],paragraph:[{ens:l,en:"caption",ans:l,a:"text-style-name"},{ens:l,
en:"circle",ans:l,a:"text-style-name"},{ens:l,en:"connector",ans:l,a:"text-style-name"},{ens:l,en:"control",ans:l,a:"text-style-name"},{ens:l,en:"custom-shape",ans:l,a:"text-style-name"},{ens:l,en:"ellipse",ans:l,a:"text-style-name"},{ens:l,en:"frame",ans:l,a:"text-style-name"},{ens:l,en:"line",ans:l,a:"text-style-name"},{ens:l,en:"measure",ans:l,a:"text-style-name"},{ens:l,en:"path",ans:l,a:"text-style-name"},{ens:l,en:"polygon",ans:l,a:"text-style-name"},{ens:l,en:"polyline",ans:l,a:"text-style-name"},
{ens:l,en:"rect",ans:l,a:"text-style-name"},{ens:l,en:"regular-polygon",ans:l,a:"text-style-name"},{ens:w,en:"annotation",ans:l,a:"text-style-name"},{ens:u,en:"column",ans:u,a:"text-style-name"},{ens:v,en:"style",ans:v,a:"next-style-name"},{ens:t,en:"body",ans:t,a:"paragraph-style-name"},{ens:t,en:"even-columns",ans:t,a:"paragraph-style-name"},{ens:t,en:"even-rows",ans:t,a:"paragraph-style-name"},{ens:t,en:"first-column",ans:t,a:"paragraph-style-name"},{ens:t,en:"first-row",ans:t,a:"paragraph-style-name"},
{ens:t,en:"last-column",ans:t,a:"paragraph-style-name"},{ens:t,en:"last-row",ans:t,a:"paragraph-style-name"},{ens:t,en:"odd-columns",ans:t,a:"paragraph-style-name"},{ens:t,en:"odd-rows",ans:t,a:"paragraph-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"default-style-name"},{ens:s,en:"alphabetical-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"bibliography-entry-template",ans:s,a:"style-name"},{ens:s,en:"h",ans:s,a:"style-name"},{ens:s,en:"illustration-index-entry-template",ans:s,a:"style-name"},
{ens:s,en:"index-source-style",ans:s,a:"style-name"},{ens:s,en:"object-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"p",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-of-content-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"user-index-entry-template",ans:s,a:"style-name"},{ens:v,en:"page-layout-properties",ans:v,a:"register-truth-ref-style-name"}],chart:[{ens:a,en:"axis",ans:a,
a:"style-name"},{ens:a,en:"chart",ans:a,a:"style-name"},{ens:a,en:"data-label",ans:a,a:"style-name"},{ens:a,en:"data-point",ans:a,a:"style-name"},{ens:a,en:"equation",ans:a,a:"style-name"},{ens:a,en:"error-indicator",ans:a,a:"style-name"},{ens:a,en:"floor",ans:a,a:"style-name"},{ens:a,en:"footer",ans:a,a:"style-name"},{ens:a,en:"grid",ans:a,a:"style-name"},{ens:a,en:"legend",ans:a,a:"style-name"},{ens:a,en:"mean-value",ans:a,a:"style-name"},{ens:a,en:"plot-area",ans:a,a:"style-name"},{ens:a,en:"regression-curve",
ans:a,a:"style-name"},{ens:a,en:"series",ans:a,a:"style-name"},{ens:a,en:"stock-gain-marker",ans:a,a:"style-name"},{ens:a,en:"stock-loss-marker",ans:a,a:"style-name"},{ens:a,en:"stock-range-line",ans:a,a:"style-name"},{ens:a,en:"subtitle",ans:a,a:"style-name"},{ens:a,en:"title",ans:a,a:"style-name"},{ens:a,en:"wall",ans:a,a:"style-name"}],section:[{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"bibliography",ans:s,a:"style-name"},{ens:s,en:"illustration-index",ans:s,a:"style-name"},
{ens:s,en:"index-title",ans:s,a:"style-name"},{ens:s,en:"object-index",ans:s,a:"style-name"},{ens:s,en:"section",ans:s,a:"style-name"},{ens:s,en:"table-of-content",ans:s,a:"style-name"},{ens:s,en:"table-index",ans:s,a:"style-name"},{ens:s,en:"user-index",ans:s,a:"style-name"}],ruby:[{ens:s,en:"ruby",ans:s,a:"style-name"}],table:[{ens:c,en:"query",ans:c,a:"style-name"},{ens:c,en:"table-representation",ans:c,a:"style-name"},{ens:t,en:"background",ans:t,a:"style-name"},{ens:t,en:"table",ans:t,a:"style-name"}],
"table-column":[{ens:c,en:"column",ans:c,a:"style-name"},{ens:t,en:"table-column",ans:t,a:"style-name"}],"table-row":[{ens:c,en:"query",ans:c,a:"default-row-style-name"},{ens:c,en:"table-representation",ans:c,a:"default-row-style-name"},{ens:t,en:"table-row",ans:t,a:"style-name"}],"table-cell":[{ens:c,en:"column",ans:c,a:"default-cell-style-name"},{ens:t,en:"table-column",ans:t,a:"default-cell-style-name"},{ens:t,en:"table-row",ans:t,a:"default-cell-style-name"},{ens:t,en:"body",ans:t,a:"style-name"},
{ens:t,en:"covered-table-cell",ans:t,a:"style-name"},{ens:t,en:"even-columns",ans:t,a:"style-name"},{ens:t,en:"covered-table-cell",ans:t,a:"style-name"},{ens:t,en:"even-columns",ans:t,a:"style-name"},{ens:t,en:"even-rows",ans:t,a:"style-name"},{ens:t,en:"first-column",ans:t,a:"style-name"},{ens:t,en:"first-row",ans:t,a:"style-name"},{ens:t,en:"last-column",ans:t,a:"style-name"},{ens:t,en:"last-row",ans:t,a:"style-name"},{ens:t,en:"odd-columns",ans:t,a:"style-name"},{ens:t,en:"odd-rows",ans:t,a:"style-name"},
{ens:t,en:"table-cell",ans:t,a:"style-name"}],graphic:[{ens:p,en:"cube",ans:l,a:"style-name"},{ens:p,en:"extrude",ans:l,a:"style-name"},{ens:p,en:"rotate",ans:l,a:"style-name"},{ens:p,en:"scene",ans:l,a:"style-name"},{ens:p,en:"sphere",ans:l,a:"style-name"},{ens:l,en:"caption",ans:l,a:"style-name"},{ens:l,en:"circle",ans:l,a:"style-name"},{ens:l,en:"connector",ans:l,a:"style-name"},{ens:l,en:"control",ans:l,a:"style-name"},{ens:l,en:"custom-shape",ans:l,a:"style-name"},{ens:l,en:"ellipse",ans:l,a:"style-name"},
{ens:l,en:"frame",ans:l,a:"style-name"},{ens:l,en:"g",ans:l,a:"style-name"},{ens:l,en:"line",ans:l,a:"style-name"},{ens:l,en:"measure",ans:l,a:"style-name"},{ens:l,en:"page-thumbnail",ans:l,a:"style-name"},{ens:l,en:"path",ans:l,a:"style-name"},{ens:l,en:"polygon",ans:l,a:"style-name"},{ens:l,en:"polyline",ans:l,a:"style-name"},{ens:l,en:"rect",ans:l,a:"style-name"},{ens:l,en:"regular-polygon",ans:l,a:"style-name"},{ens:w,en:"annotation",ans:l,a:"style-name"}],presentation:[{ens:p,en:"cube",ans:y,
a:"style-name"},{ens:p,en:"extrude",ans:y,a:"style-name"},{ens:p,en:"rotate",ans:y,a:"style-name"},{ens:p,en:"scene",ans:y,a:"style-name"},{ens:p,en:"sphere",ans:y,a:"style-name"},{ens:l,en:"caption",ans:y,a:"style-name"},{ens:l,en:"circle",ans:y,a:"style-name"},{ens:l,en:"connector",ans:y,a:"style-name"},{ens:l,en:"control",ans:y,a:"style-name"},{ens:l,en:"custom-shape",ans:y,a:"style-name"},{ens:l,en:"ellipse",ans:y,a:"style-name"},{ens:l,en:"frame",ans:y,a:"style-name"},{ens:l,en:"g",ans:y,a:"style-name"},
{ens:l,en:"line",ans:y,a:"style-name"},{ens:l,en:"measure",ans:y,a:"style-name"},{ens:l,en:"page-thumbnail",ans:y,a:"style-name"},{ens:l,en:"path",ans:y,a:"style-name"},{ens:l,en:"polygon",ans:y,a:"style-name"},{ens:l,en:"polyline",ans:y,a:"style-name"},{ens:l,en:"rect",ans:y,a:"style-name"},{ens:l,en:"regular-polygon",ans:y,a:"style-name"},{ens:w,en:"annotation",ans:y,a:"style-name"}],"drawing-page":[{ens:l,en:"page",ans:l,a:"style-name"},{ens:y,en:"notes",ans:l,a:"style-name"},{ens:v,en:"handout-master",
ans:l,a:"style-name"},{ens:v,en:"master-page",ans:l,a:"style-name"}],"list-style":[{ens:s,en:"list",ans:s,a:"style-name"},{ens:s,en:"numbered-paragraph",ans:s,a:"style-name"},{ens:s,en:"list-item",ans:s,a:"style-override"},{ens:v,en:"style",ans:v,a:"list-style-name"}],data:[{ens:v,en:"style",ans:v,a:"data-style-name"},{ens:v,en:"style",ans:v,a:"percentage-data-style-name"},{ens:y,en:"date-time-decl",ans:v,a:"data-style-name"},{ens:s,en:"creation-date",ans:v,a:"data-style-name"},{ens:s,en:"creation-time",
ans:v,a:"data-style-name"},{ens:s,en:"database-display",ans:v,a:"data-style-name"},{ens:s,en:"date",ans:v,a:"data-style-name"},{ens:s,en:"editing-duration",ans:v,a:"data-style-name"},{ens:s,en:"expression",ans:v,a:"data-style-name"},{ens:s,en:"meta-field",ans:v,a:"data-style-name"},{ens:s,en:"modification-date",ans:v,a:"data-style-name"},{ens:s,en:"modification-time",ans:v,a:"data-style-name"},{ens:s,en:"print-date",ans:v,a:"data-style-name"},{ens:s,en:"print-time",ans:v,a:"data-style-name"},{ens:s,
en:"table-formula",ans:v,a:"data-style-name"},{ens:s,en:"time",ans:v,a:"data-style-name"},{ens:s,en:"user-defined",ans:v,a:"data-style-name"},{ens:s,en:"user-field-get",ans:v,a:"data-style-name"},{ens:s,en:"user-field-input",ans:v,a:"data-style-name"},{ens:s,en:"variable-get",ans:v,a:"data-style-name"},{ens:s,en:"variable-input",ans:v,a:"data-style-name"},{ens:s,en:"variable-set",ans:v,a:"data-style-name"}],"page-layout":[{ens:y,en:"notes",ans:v,a:"page-layout-name"},{ens:v,en:"handout-master",ans:v,
a:"page-layout-name"},{ens:v,en:"master-page",ans:v,a:"page-layout-name"}]},x,R=xmldom.XPath;this.collectUsedFontFaces=d;this.changeFontFaceNames=f;this.UsedStyleList=function(a,c){var b={};this.uses=function(a){var c=a.localName,d=a.getAttributeNS(l,"name")||a.getAttributeNS(v,"name");a="style"===c?a.getAttributeNS(v,"family"):a.namespaceURI===B?"data":c;return(a=b[a])?0<a[d]:!1};n(a,b);c&&r(c,b)};this.hasDerivedStyles=function(a,c,b){var d=b.getAttributeNS(v,"name");b=b.getAttributeNS(v,"family");
return R.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+d+"'][@style:family='"+b+"']",c).length?!0:!1};this.prefixStyleNames=function(a,c,b){var d;if(a){for(d=a.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE){var f=d,e=c,h=f.getAttributeNS(l,"name"),p=void 0;h?p=l:(h=f.getAttributeNS(v,"name"))&&(p=v);p&&f.setAttributeNS(p,N[p]+"name",e+h)}d=d.nextSibling}g(a,c);b&&g(b,c)}};this.removePrefixFromStyleNames=function(a,c,b){var d=RegExp("^"+c);if(a){for(c=a.firstChild;c;){if(c.nodeType===
Node.ELEMENT_NODE){var f=c,e=d,h=f.getAttributeNS(l,"name"),p=void 0;h?p=l:(h=f.getAttributeNS(v,"name"))&&(p=v);p&&(h=h.replace(e,""),f.setAttributeNS(p,N[p]+"name",h))}c=c.nextSibling}k(a,d);b&&k(b,d)}};this.determineStylesForNode=e;x=function(){var a,c,b,d,f,e={},h,l,p,g;for(b in z)if(z.hasOwnProperty(b))for(d=z[b],c=d.length,a=0;a<c;a+=1)f=d[a],p=f.en,g=f.ens,e.hasOwnProperty(p)?h=e[p]:e[p]=h={},h.hasOwnProperty(g)?l=h[g]:h[g]=l=[],l.push({ns:f.ans,localname:f.a,keyname:b});return e}()};
// Input 33
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
odf.TextSerializer=function(){function g(n){var m="",q=k.filter?k.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,b=n.nodeType,h;if(q===NodeFilter.FILTER_ACCEPT||q===NodeFilter.FILTER_SKIP)for(h=n.firstChild;h;)m+=g(h),h=h.nextSibling;q===NodeFilter.FILTER_ACCEPT&&(b===Node.ELEMENT_NODE&&e.isParagraph(n)?m+="\n":b===Node.TEXT_NODE&&n.textContent&&(m+=n.textContent));return m}var k=this,e=new odf.OdfUtils;this.filter=null;this.writeToString=function(e){if(!e)return"";e=g(e);"\n"===e[e.length-1]&&(e=
e.substr(0,e.length-1));return e}};
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
runtime.loadClass("core.PositionFilter");runtime.loadClass("odf.OdfUtils");
ops.TextPositionFilter=function(g){function k(h,g,d){var f,a;if(g&&(f=e.lookLeftForCharacter(g),1===f||2===f&&(e.scanRightForAnyCharacter(d)||e.scanRightForAnyCharacter(e.nextNode(h)))))return q;f=null===g&&e.isParagraph(h);a=e.lookRightForCharacter(d);if(f)return a?q:e.scanRightForAnyCharacter(d)?b:q;if(!a)return b;g=g||e.previousNode(h);return e.scanLeftForAnyCharacter(g)?b:q}var e=new odf.OdfUtils,n=Node.ELEMENT_NODE,m=Node.TEXT_NODE,q=core.PositionFilter.FilterResult.FILTER_ACCEPT,b=core.PositionFilter.FilterResult.FILTER_REJECT;
this.acceptPosition=function(h){var r=h.container(),d=r.nodeType,f,a,c;if(d!==n&&d!==m)return b;if(d===m){if(!e.isGroupingElement(r.parentNode)||e.isWithinTrackedChanges(r.parentNode,g()))return b;d=h.unfilteredDomOffset();f=r.data;runtime.assert(d!==f.length,"Unexpected offset.");if(0<d){h=f[d-1];if(!e.isODFWhitespace(h))return q;if(1<d)if(h=f[d-2],!e.isODFWhitespace(h))a=q;else{if(!e.isODFWhitespace(f.substr(0,d)))return b}else c=e.previousNode(r),e.scanLeftForNonSpace(c)&&(a=q);if(a===q)return e.isTrailingWhitespace(r,
d)?b:q;a=f[d];return e.isODFWhitespace(a)?b:e.scanLeftForAnyCharacter(e.previousNode(r))?b:q}c=h.leftNode();a=r;r=r.parentNode;a=k(r,c,a)}else!e.isGroupingElement(r)||e.isWithinTrackedChanges(r,g())?a=b:(c=h.leftNode(),a=h.rightNode(),a=k(r,c,a));return a}};
// Input 35
"function"!==typeof Object.create&&(Object.create=function(g){var k=function(){};k.prototype=g;return new k});
xmldom.LSSerializer=function(){function g(e){var g=e||{},b=function(b){var a={},c;for(c in b)b.hasOwnProperty(c)&&(a[b[c]]=c);return a}(e),h=[g],k=[b],d=0;this.push=function(){d+=1;g=h[d]=Object.create(g);b=k[d]=Object.create(b)};this.pop=function(){h.pop();k.pop();d-=1;g=h[d];b=k[d]};this.getLocalNamespaceDefinitions=function(){return b};this.getQName=function(d){var a=d.namespaceURI,c=0,e;if(!a)return d.localName;if(e=b[a])return e+":"+d.localName;do{e||!d.prefix?(e="ns"+c,c+=1):e=d.prefix;if(g[e]===
a)break;if(!g[e]){g[e]=a;b[a]=e;break}e=null}while(null===e);return e+":"+d.localName}}function k(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function e(g,q){var b="",h=n.filter?n.filter.acceptNode(q):NodeFilter.FILTER_ACCEPT,r;if(h===NodeFilter.FILTER_ACCEPT&&q.nodeType===Node.ELEMENT_NODE){g.push();r=g.getQName(q);var d,f=q.attributes,a,c,p,l="",u;d="<"+r;a=f.length;for(c=0;c<a;c+=1)p=f.item(c),"http://www.w3.org/2000/xmlns/"!==
p.namespaceURI&&(u=n.filter?n.filter.acceptNode(p):NodeFilter.FILTER_ACCEPT,u===NodeFilter.FILTER_ACCEPT&&(u=g.getQName(p),p="string"===typeof p.value?k(p.value):p.value,l+=" "+(u+'="'+p+'"')));a=g.getLocalNamespaceDefinitions();for(c in a)a.hasOwnProperty(c)&&((f=a[c])?"xmlns"!==f&&(d+=" xmlns:"+a[c]+'="'+c+'"'):d+=' xmlns="'+c+'"');b+=d+(l+">")}if(h===NodeFilter.FILTER_ACCEPT||h===NodeFilter.FILTER_SKIP){for(h=q.firstChild;h;)b+=e(g,h),h=h.nextSibling;q.nodeValue&&(b+=k(q.nodeValue))}r&&(b+="</"+
r+">",g.pop());return b}var n=this;this.filter=null;this.writeToString=function(k,n){if(!k)return"";var b=new g(n);return e(b,k)}};
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
gui.Clipboard=function(){var g,k,e;this.setDataFromRange=function(e,m){var q=!0,b,h=e.clipboardData;b=runtime.getWindow();var r=m.startContainer.ownerDocument;!h&&b&&(h=b.clipboardData);h?(r=r.createElement("span"),r.appendChild(m.cloneContents()),b=h.setData("text/plain",k.writeToString(r)),q=q&&b,b=h.setData("text/html",g.writeToString(r,odf.Namespaces.namespaceMap)),q=q&&b,e.preventDefault()):q=!1;return q};g=new xmldom.LSSerializer;k=new odf.TextSerializer;e=new odf.OdfNodeFilter;g.filter=e;k.filter=
e};
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
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("odf.MetadataManager");
(function(){function g(a,c,b){for(a=a?a.firstChild:null;a;){if(a.localName===b&&a.namespaceURI===c)return a;a=a.nextSibling}return null}function k(a){var c,b=r.length;for(c=0;c<b;c+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&a.localName===r[c])return c;return-1}function e(a,c){var b=new q.UsedStyleList(a,c),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var f=d.acceptNode(a);f===NodeFilter.FILTER_ACCEPT&&a.parentNode===c&&a.nodeType===Node.ELEMENT_NODE&&(f=b.uses(a)?
NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return f}}function n(a,c){var b=new e(a,c);this.acceptNode=function(a){var c=b.acceptNode(a);c!==NodeFilter.FILTER_ACCEPT||!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName||(c=NodeFilter.FILTER_REJECT);return c}}function m(a,c){if(c){var b=k(c),d,f=a.firstChild;if(-1!==b){for(;f;){d=k(f);if(-1!==d&&d>b)break;f=f.nextSibling}a.insertBefore(c,f)}}}var q=new odf.StyleInfo,
b,h=odf.Namespaces.stylens,r="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),d=(new Date).getTime()+"_webodf_",f=new core.Base64;odf.ODFElement=function(){};odf.ODFDocumentElement=function(){};odf.ODFDocumentElement.prototype=new odf.ODFElement;odf.ODFDocumentElement.prototype.constructor=odf.ODFDocumentElement;odf.ODFDocumentElement.prototype.fontFaceDecls=null;odf.ODFDocumentElement.prototype.manifest=null;odf.ODFDocumentElement.prototype.settings=null;
odf.ODFDocumentElement.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";odf.ODFDocumentElement.localName="document";odf.OdfPart=function(a,c,b,d){var f=this;this.size=0;this.type=null;this.name=a;this.container=b;this.url=null;this.mimetype=c;this.onstatereadychange=this.document=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.data="";this.load=function(){null!==d&&(this.mimetype=c,d.loadAsDataURL(a,c,function(a,c){a&&runtime.log(a);f.url=c;if(f.onchange)f.onchange(f);
if(f.onstatereadychange)f.onstatereadychange(f)}))}};odf.OdfPart.prototype.load=function(){};odf.OdfPart.prototype.getUrl=function(){return this.data?"data:;base64,"+f.toBase64(this.data):null};odf.OdfContainer=function c(p,l){function k(c){for(var b=c.firstChild,d;b;)d=b.nextSibling,b.nodeType===Node.ELEMENT_NODE?k(b):b.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&c.removeChild(b),b=d}function r(c,b){for(var d=c&&c.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&d.setAttributeNS("urn:webodf:names:scope",
"scope",b),d=d.nextSibling}function w(c){var b={},d;for(c=c.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&c.namespaceURI===h&&"font-face"===c.localName&&(d=c.getAttributeNS(h,"name"),b[d]=c),c=c.nextSibling;return b}function y(c,b){var d=null,f,e,h;if(c)for(d=c.cloneNode(!0),f=d.firstElementChild;f;)e=f.nextElementSibling,(h=f.getAttributeNS("urn:webodf:names:scope","scope"))&&h!==b&&d.removeChild(f),f=e;return d}function v(c,b){var d,f,e,l=null,g={};if(c)for(b.forEach(function(c){q.collectUsedFontFaces(g,
c)}),l=c.cloneNode(!0),d=l.firstElementChild;d;)f=d.nextElementSibling,e=d.getAttributeNS(h,"name"),g[e]||l.removeChild(d),d=f;return l}function t(c){var b=H.rootElement.ownerDocument,d;if(c){k(c.documentElement);try{d=b.importNode(c.documentElement,!0)}catch(f){}}return d}function s(c){H.state=c;if(H.onchange)H.onchange(H);if(H.onstatereadychange)H.onstatereadychange(H)}function N(c){L=null;H.rootElement=c;c.fontFaceDecls=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");
c.styles=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");c.automaticStyles=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");c.masterStyles=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");c.body=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");c.meta=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta")}function z(b){var f=t(b),e=H.rootElement,h;f&&"document-styles"===f.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===
f.namespaceURI?(e.fontFaceDecls=g(f,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),m(e,e.fontFaceDecls),h=g(f,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),e.styles=h||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),m(e,e.styles),h=g(f,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),e.automaticStyles=h||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),r(e.automaticStyles,
"document-styles"),m(e,e.automaticStyles),f=g(f,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),e.masterStyles=f||b.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),m(e,e.masterStyles),q.prefixStyleNames(e.automaticStyles,d,e.masterStyles)):s(c.INVALID)}function x(b){b=t(b);var d,f,e,l;if(b&&"document-content"===b.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI){d=H.rootElement;e=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"font-face-decls");if(d.fontFaceDecls&&e){l=d.fontFaceDecls;var p,k,n,v,u={};f=w(l);v=w(e);for(e=e.firstElementChild;e;){p=e.nextElementSibling;if(e.namespaceURI===h&&"font-face"===e.localName)if(k=e.getAttributeNS(h,"name"),f.hasOwnProperty(k)){if(!e.isEqualNode(f[k])){n=k;for(var z=f,F=v,x=0,A=void 0,A=n=n.replace(/\d+$/,"");z.hasOwnProperty(A)||F.hasOwnProperty(A);)x+=1,A=n+x;n=A;e.setAttributeNS(h,"style:name",n);l.appendChild(e);f[n]=e;delete v[k];u[k]=n}}else l.appendChild(e),f[k]=e,delete v[k];
e=p}l=u}else e&&(d.fontFaceDecls=e,m(d,e));f=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");r(f,"document-content");l&&q.changeFontFaceNames(f,l);if(d.automaticStyles&&f)for(l=f.firstChild;l;)d.automaticStyles.appendChild(l),l=f.firstChild;else f&&(d.automaticStyles=f,m(d,f));b=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");if(null===b)throw"<office:body/> tag is mising.";d.body=b;m(d,d.body)}else s(c.INVALID)}function R(c){var d=t(c),f;d&&"document-meta"===
d.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===d.namespaceURI&&(f=H.rootElement,d=g(d,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),f.meta=d||c.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),m(f,f.meta),b=new odf.MetadataManager(f.meta))}function F(c){c=t(c);var b;c&&"document-settings"===c.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===c.namespaceURI&&(b=H.rootElement,b.settings=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"settings"),m(b,b.settings))}function U(c){c=t(c);var b;if(c&&"manifest"===c.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===c.namespaceURI)for(b=H.rootElement,b.manifest=c,c=b.manifest.firstElementChild;c;)"file-entry"===c.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===c.namespaceURI&&(Q[c.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=c.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),c=c.nextElementSibling}
function P(b){var d=b.shift();d?X.loadAsDOM(d.path,function(f,e){d.handler(e);f||H.state===c.INVALID||P(b)}):s(c.DONE)}function A(c){var b="";odf.Namespaces.forEachPrefix(function(c,d){b+=" xmlns:"+c+'="'+d+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+c+" "+b+' office:version="1.2">'}function ja(){var c=new xmldom.LSSerializer,b=A("document-meta");c.filter=new odf.OdfNodeFilter;b+=c.writeToString(H.rootElement.meta,odf.Namespaces.namespaceMap);return b+"</office:document-meta>"}function ka(c,
b){var d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:full-path",c);d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:media-type",b);return d}function G(){var c=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'),b=g(c,"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
"manifest"),d=new xmldom.LSSerializer,f;for(f in Q)Q.hasOwnProperty(f)&&b.appendChild(ka(f,Q[f]));d.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+d.writeToString(c,odf.Namespaces.namespaceMap)}function Z(){var c=new xmldom.LSSerializer,b=A("document-settings");c.filter=new odf.OdfNodeFilter;b+=c.writeToString(H.rootElement.settings,odf.Namespaces.namespaceMap);return b+"</office:document-settings>"}function O(){var c,b,f,h=odf.Namespaces.namespaceMap,
l=new xmldom.LSSerializer,g=A("document-styles");b=y(H.rootElement.automaticStyles,"document-styles");f=H.rootElement.masterStyles.cloneNode(!0);c=v(H.rootElement.fontFaceDecls,[f,H.rootElement.styles,b]);q.removePrefixFromStyleNames(b,d,f);l.filter=new e(f,b);g+=l.writeToString(c,h);g+=l.writeToString(H.rootElement.styles,h);g+=l.writeToString(b,h);g+=l.writeToString(f,h);return g+"</office:document-styles>"}function ba(){var c,b,d=odf.Namespaces.namespaceMap,f=new xmldom.LSSerializer,e=A("document-content");
b=y(H.rootElement.automaticStyles,"document-content");c=v(H.rootElement.fontFaceDecls,[b]);f.filter=new n(H.rootElement.body,b);e+=f.writeToString(c,d);e+=f.writeToString(b,d);e+=f.writeToString(H.rootElement.body,d);return e+"</office:document-content>"}function K(b,d){runtime.loadXML(b,function(b,f){if(b)d(b);else{var e=t(f);e&&"document"===e.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===e.namespaceURI?(N(e),s(c.DONE)):s(c.INVALID)}})}function I(){function d(c,b){var f;b||(b=c);
f=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",b);h[c]=f;h.appendChild(f)}var f=new core.Zip("",null),e=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),h=H.rootElement,l=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","text");f.save("mimetype",e,!1,new Date);d("meta");d("settings");d("scripts");d("fontFaceDecls","font-face-decls");d("styles");d("automaticStyles","automatic-styles");d("masterStyles","master-styles");
d("body");h.body.appendChild(l);b=new odf.MetadataManager(h.meta);s(c.DONE);return f}function C(){var c,d=new Date,f=runtime.getWindow();c="WebODF/"+("undefined"!==String(typeof webodf_version)?webodf_version:"FromSource");f&&(c=c+" "+f.navigator.userAgent);b.setMetadata({"meta:generator":c},null);c=runtime.byteArrayFromString(Z(),"utf8");X.save("settings.xml",c,!0,d);c=runtime.byteArrayFromString(ja(),"utf8");X.save("meta.xml",c,!0,d);c=runtime.byteArrayFromString(O(),"utf8");X.save("styles.xml",
c,!0,d);c=runtime.byteArrayFromString(ba(),"utf8");X.save("content.xml",c,!0,d);c=runtime.byteArrayFromString(G(),"utf8");X.save("META-INF/manifest.xml",c,!0,d)}function Y(c,b){C();X.writeAs(c,function(c){b(c)})}var H=this,X,Q={},L;this.onstatereadychange=l;this.state=this.onchange=null;this.setRootElement=N;this.getContentElement=function(){var c;L||(c=H.rootElement.body,L=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","text")||g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","presentation")||
g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet"));if(!L)throw"Could not find content element in <office:body/>.";return L};this.getDocumentType=function(){var c=H.getContentElement();return c&&c.localName};this.getMetadataManager=function(){return b};this.getPart=function(c){return new odf.OdfPart(c,Q[c],H,X)};this.getPartData=function(c,b){X.load(c,b)};this.createByteArray=function(c,b){C();X.createByteArray(c,b)};this.saveAs=Y;this.save=function(c){Y(p,c)};this.getUrl=function(){return p};
this.setBlob=function(c,b,d){d=f.convertBase64ToByteArray(d);X.save(c,d,!1,new Date);Q.hasOwnProperty(c)&&runtime.log(c+" has been overwritten.");Q[c]=b};this.removeBlob=function(c){var b=X.remove(c);runtime.assert(b,"file is not found: "+c);delete Q[c]};this.state=c.LOADING;this.rootElement=function(c){var b=document.createElementNS(c.namespaceURI,c.localName),d;c=new c.Type;for(d in c)c.hasOwnProperty(d)&&(b[d]=c[d]);return b}({Type:odf.ODFDocumentElement,namespaceURI:odf.ODFDocumentElement.namespaceURI,
localName:odf.ODFDocumentElement.localName});X=p?new core.Zip(p,function(b,d){X=d;b?K(p,function(d){b&&(X.error=b+"\n"+d,s(c.INVALID))}):P([{path:"styles.xml",handler:z},{path:"content.xml",handler:x},{path:"meta.xml",handler:R},{path:"settings.xml",handler:F},{path:"META-INF/manifest.xml",handler:U}])}):I()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(c){return new odf.OdfContainer(c,
null)};return odf.OdfContainer})();
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
runtime.loadClass("core.Base64");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.OdfContainer");
(function(){function g(k,m,q,b,h){var r,d=0,f;for(f in k)if(k.hasOwnProperty(f)){if(d===q){r=f;break}d+=1}r?m.getPartData(k[r].href,function(a,c){if(a)runtime.log(a);else if(c){var d="@font-face { font-family: '"+(k[r].family||r)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+e.convertUTF8ArrayToBase64(c)+') format("truetype"); }';try{b.insertRule(d,b.cssRules.length)}catch(f){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(f)+"\nRule: "+d)}}else runtime.log("missing font data for "+
k[r].href);g(k,m,q+1,b,h)}):h&&h()}var k=xmldom.XPath,e=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(e,m){for(var q=e.rootElement.fontFaceDecls;m.cssRules.length;)m.deleteRule(m.cssRules.length-1);if(q){var b={},h,r,d,f;if(q)for(q=k.getODFElementsWithXPath(q,"style:font-face[svg:font-face-src]",odf.Namespaces.lookupNamespaceURI),h=0;h<q.length;h+=1)r=q[h],d=r.getAttributeNS(odf.Namespaces.stylens,"name"),f=r.getAttributeNS(odf.Namespaces.svgns,"font-family"),r=k.getODFElementsWithXPath(r,
"svg:font-face-src/svg:font-face-uri",odf.Namespaces.lookupNamespaceURI),0<r.length&&(r=r[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),b[d]={href:r,family:f});g(b,e,0,m)}}};return odf.FontLoader})();
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
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Utils");
odf.ObjectNameGenerator=function(g,k){function e(a,c){var b={};this.generateName=function(){var d=c(),f=0,e;do e=a+f,f+=1;while(b[e]||d[e]);b[e]=!0;return e}}function n(){var a={};[g.rootElement.automaticStyles,g.rootElement.styles].forEach(function(c){for(c=c.firstElementChild;c;)c.namespaceURI===m&&"style"===c.localName&&(a[c.getAttributeNS(m,"name")]=!0),c=c.nextElementSibling});return a}var m=odf.Namespaces.stylens,q=odf.Namespaces.drawns,b=odf.Namespaces.xlinkns,h=new core.DomUtils,r=(new core.Utils).hashString(k),
d=null,f=null,a=null,c={},p={};this.generateStyleName=function(){null===d&&(d=new e("auto"+r+"_",function(){return n()}));return d.generateName()};this.generateFrameName=function(){null===f&&(h.getElementsByTagNameNS(g.rootElement.body,q,"frame").forEach(function(a){c[a.getAttributeNS(q,"name")]=!0}),f=new e("fr"+r+"_",function(){return c}));return f.generateName()};this.generateImageName=function(){null===a&&(h.getElementsByTagNameNS(g.rootElement.body,q,"image").forEach(function(a){a=a.getAttributeNS(b,
"href");a=a.substring(9,a.lastIndexOf("."));p[a]=!0}),a=new e("img"+r+"_",function(){return p}));return a.generateName()}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.Namespaces");odf.TextStyleApplicatorFormatting=function(){};odf.TextStyleApplicatorFormatting.prototype.getAppliedStylesForElement=function(g){};odf.TextStyleApplicatorFormatting.prototype.createDerivedStyleObject=function(g,k,e){};odf.TextStyleApplicatorFormatting.prototype.updateStyle=function(g,k){};
odf.TextStyleApplicator=function(g,k,e){function n(b){function f(a,c){return"object"===typeof a&&"object"===typeof c?Object.keys(a).every(function(b){return f(a[b],c[b])}):a===c}this.isStyleApplied=function(a){a=k.getAppliedStylesForElement(a);return f(b,a)}}function m(b){var f={};this.applyStyleToContainer=function(a){var c;c=a.getAttributeNS(h,"style-name");var p=a.ownerDocument;c=c||"";if(!f.hasOwnProperty(c)){var l=c,m;m=c?k.createDerivedStyleObject(c,"text",b):b;p=p.createElementNS(r,"style:style");
k.updateStyle(p,m);p.setAttributeNS(r,"style:name",g.generateStyleName());p.setAttributeNS(r,"style:family","text");p.setAttributeNS("urn:webodf:names:scope","scope","document-content");e.appendChild(p);f[l]=p}c=f[c].getAttributeNS(r,"name");a.setAttributeNS(h,"text:style-name",c)}}function q(d,f){var a=d.ownerDocument,c=d.parentNode,e,l,g=new core.LoopWatchDog(1E4);l=[];"span"!==c.localName||c.namespaceURI!==h?(e=a.createElementNS(h,"text:span"),c.insertBefore(e,d),c=!1):(d.previousSibling&&!b.rangeContainsNode(f,
c.firstChild)?(e=c.cloneNode(!1),c.parentNode.insertBefore(e,c.nextSibling)):e=c,c=!0);l.push(d);for(a=d.nextSibling;a&&b.rangeContainsNode(f,a);)g.check(),l.push(a),a=a.nextSibling;l.forEach(function(a){a.parentNode!==e&&e.appendChild(a)});if(a&&c)for(l=e.cloneNode(!1),e.parentNode.insertBefore(l,e.nextSibling);a;)g.check(),c=a.nextSibling,l.appendChild(a),a=c;return e}var b=new core.DomUtils,h=odf.Namespaces.textns,r=odf.Namespaces.stylens;this.applyStyle=function(b,f,a){var c={},e,h,g,k;runtime.assert(a&&
a.hasOwnProperty("style:text-properties"),"applyStyle without any text properties");c["style:text-properties"]=a["style:text-properties"];g=new m(c);k=new n(c);b.forEach(function(a){e=k.isStyleApplied(a);!1===e&&(h=q(a,f),g.applyStyleToContainer(h))})}};
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
runtime.loadClass("core.Utils");runtime.loadClass("odf.ObjectNameGenerator");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.TextStyleApplicator");
odf.Formatting=function(){function g(a){return(a=s[a])?t.mergeObjects({},a):{}}function k(a,c,b){for(a=a&&a.firstElementChild;a&&(a.namespaceURI!==c||a.localName!==b);)a=a.nextElementSibling;return a}function e(){for(var c=a.rootElement.fontFaceDecls,b={},d,f,c=c&&c.firstElementChild;c;){if(d=c.getAttributeNS(l,"name"))if((f=c.getAttributeNS(p,"font-family"))||0<c.getElementsByTagNameNS(p,"font-face-uri").length)b[d]=f;c=c.nextElementSibling}return b}function n(c){for(var b=a.rootElement.styles.firstElementChild;b;){if(b.namespaceURI===
l&&"default-style"===b.localName&&b.getAttributeNS(l,"family")===c)return b;b=b.nextElementSibling}return null}function m(c,b,d){var f,e,h;d=d||[a.rootElement.automaticStyles,a.rootElement.styles];for(h=0;h<d.length;h+=1)for(f=d[h],f=f.firstElementChild;f;){e=f.getAttributeNS(l,"name");if(f.namespaceURI===l&&"style"===f.localName&&f.getAttributeNS(l,"family")===b&&e===c||"list-style"===b&&f.namespaceURI===u&&"list-style"===f.localName&&e===c||"data"===b&&f.namespaceURI===B&&e===c)return f;f=f.nextElementSibling}return null}
function q(a){for(var c,b,d,f,e={},h=a.firstElementChild;h;){if(h.namespaceURI===l)for(d=e[h.nodeName]={},b=h.attributes,c=0;c<b.length;c+=1)f=b.item(c),d[f.name]=f.value;h=h.nextElementSibling}b=a.attributes;for(c=0;c<b.length;c+=1)f=b.item(c),e[f.name]=f.value;return e}function b(c,b){for(var d=a.rootElement.styles,f,e={},h=c.getAttributeNS(l,"family"),k=c;k;)f=q(k),e=t.mergeObjects(f,e),k=(f=k.getAttributeNS(l,"parent-style-name"))?m(f,h,[d]):null;if(k=n(h))f=q(k),e=t.mergeObjects(f,e);b&&(f=g(h))&&
(e=t.mergeObjects(f,e));return e}function h(a,b){function d(a){Object.keys(a).forEach(function(c){Object.keys(a[c]).forEach(function(a){l+="|"+c+":"+a+"|"})})}for(var f=a.nodeType===Node.TEXT_NODE?a.parentNode:a,e,h=[],l="",g=!1;f;)!g&&y.isGroupingElement(f)&&(g=!0),(e=c.determineStylesForNode(f))&&h.push(e),f=f.parentElement;g&&(h.forEach(d),b&&(b[l]=h));return g?h:void 0}function r(a){var c={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(d){var f=Object.keys(a[d])[0],e,
h;(e=m(f,d))?(h=b(e),c=t.mergeObjects(h,c),h=e.getAttributeNS(l,"display-name")):runtime.log("No style element found for '"+f+"' of family '"+d+"'");c.orderedStyles.push({name:f,family:d,displayName:h})})});return c}function d(a,c){var b=y.parseLength(a),d=c;if(b)switch(b.unit){case "cm":d=b.value;break;case "mm":d=0.1*b.value;break;case "in":d=2.54*b.value;break;case "pt":d=0.035277778*b.value;break;case "pc":case "px":case "em":break;default:runtime.log("Unit identifier: "+b.unit+" is not supported.")}return d}
var f=this,a,c=new odf.StyleInfo,p=odf.Namespaces.svgns,l=odf.Namespaces.stylens,u=odf.Namespaces.textns,B=odf.Namespaces.numberns,w=odf.Namespaces.fons,y=new odf.OdfUtils,v=new core.DomUtils,t=new core.Utils,s={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.getSystemDefaultStyleAttributes=g;this.setOdfContainer=function(c){a=c};this.getFontMap=e;this.getAvailableParagraphStyles=function(){for(var c=a.rootElement.styles,b,d,f=[],c=c&&c.firstElementChild;c;)"style"===c.localName&&
c.namespaceURI===l&&(b=c.getAttributeNS(l,"family"),"paragraph"===b&&(b=c.getAttributeNS(l,"name"),d=c.getAttributeNS(l,"display-name")||b,b&&d&&f.push({name:b,displayName:d}))),c=c.nextElementSibling;return f};this.isStyleUsed=function(b){var d,f=a.rootElement;d=c.hasDerivedStyles(f,odf.Namespaces.lookupNamespaceURI,b);b=(new c.UsedStyleList(f.styles)).uses(b)||(new c.UsedStyleList(f.automaticStyles)).uses(b)||(new c.UsedStyleList(f.body)).uses(b);return d||b};this.getDefaultStyleElement=n;this.getStyleElement=
m;this.getStyleAttributes=q;this.getInheritedStyleAttributes=b;this.getFirstCommonParentStyleNameOrSelf=function(c){var b=a.rootElement.automaticStyles,d=a.rootElement.styles,f;for(f=m(c,"paragraph",[b]);f;)c=f.getAttributeNS(l,"parent-style-name"),f=m(c,"paragraph",[b]);return(f=m(c,"paragraph",[d]))?c:null};this.hasParagraphStyle=function(a){return Boolean(m(a,"paragraph"))};this.getAppliedStyles=function(a){var c={},b=[];a.forEach(function(a){h(a,c)});Object.keys(c).forEach(function(a){b.push(r(c[a]))});
return b};this.getAppliedStylesForElement=function(a){return(a=h(a))?r(a):void 0};this.applyStyle=function(c,b,d,e){(new odf.TextStyleApplicator(new odf.ObjectNameGenerator(a,c),f,a.rootElement.automaticStyles)).applyStyle(b,d,e)};this.updateStyle=function(c,b){var d,f;v.mapObjOntoNode(c,b,odf.Namespaces.lookupNamespaceURI);(d=b["style:text-properties"]&&b["style:text-properties"]["style:font-name"])&&!e().hasOwnProperty(d)&&(f=c.ownerDocument.createElementNS(l,"style:font-face"),f.setAttributeNS(l,
"style:name",d),f.setAttributeNS(p,"svg:font-family",d),a.rootElement.fontFaceDecls.appendChild(f))};this.createDerivedStyleObject=function(c,b,d){var f=m(c,b);runtime.assert(Boolean(f),"No style element found for '"+c+"' of family '"+b+"'");c=f.parentNode===a.rootElement.automaticStyles?q(f):{"style:parent-style-name":c};c["style:family"]=b;t.mergeObjects(c,d);return c};this.getDefaultTabStopDistance=function(){for(var a=n("paragraph"),a=a&&a.firstElementChild,c;a;)a.namespaceURI===l&&"paragraph-properties"===
a.localName&&(c=a.getAttributeNS(l,"tab-stop-distance")),a=a.nextElementSibling;c||(c="1.25cm");return y.parseNonNegativeLength(c)};this.getContentSize=function(c,b){var f,e,h,g,p,n,q,r,s,t,u;a:{var B,y,I;f=m(c,b);runtime.assert("paragraph"===b||"table"===b,"styleFamily has to be either paragraph or table");if(f){B=f.getAttributeNS(l,"master-page-name")||"Standard";for(f=a.rootElement.masterStyles.lastElementChild;f&&f.getAttributeNS(l,"name")!==B;)f=f.previousElementSibling;B=f.getAttributeNS(l,
"page-layout-name");y=v.getElementsByTagNameNS(a.rootElement.automaticStyles,l,"page-layout");for(I=0;I<y.length;I+=1)if(f=y[I],f.getAttributeNS(l,"name")===B)break a}f=null}f||(f=k(a.rootElement.styles,l,"default-page-layout"));if(f=k(f,l,"page-layout-properties"))e=f.getAttributeNS(l,"print-orientation")||"portrait","portrait"===e?(e=21.001,h=29.7):(e=29.7,h=21.001),e=d(f.getAttributeNS(w,"page-width"),e),h=d(f.getAttributeNS(w,"page-height"),h),g=d(f.getAttributeNS(w,"margin"),null),null===g?(g=
d(f.getAttributeNS(w,"margin-left"),2),p=d(f.getAttributeNS(w,"margin-right"),2),n=d(f.getAttributeNS(w,"margin-top"),2),q=d(f.getAttributeNS(w,"margin-bottom"),2)):g=p=n=q=g,r=d(f.getAttributeNS(w,"padding"),null),null===r?(r=d(f.getAttributeNS(w,"padding-left"),0),s=d(f.getAttributeNS(w,"padding-right"),0),t=d(f.getAttributeNS(w,"padding-top"),0),u=d(f.getAttributeNS(w,"padding-bottom"),0)):r=s=t=u=r;return{width:e-g-p-r-s,height:h-n-q-t-u}}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.Formatting");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.FontLoader");runtime.loadClass("odf.Style2CSS");runtime.loadClass("odf.OdfUtils");runtime.loadClass("gui.AnnotationViewManager");
(function(){function g(){function a(d){b=!0;runtime.setTimeout(function(){try{d()}catch(f){runtime.log(String(f))}b=!1;0<c.length&&a(c.pop())},10)}var c=[],b=!1;this.clearQueue=function(){c.length=0};this.addToQueue=function(d){if(0===c.length&&!b)return a(d);c.push(d)}}function k(a){function c(){for(;0<b.cssRules.length;)b.deleteRule(0);b.insertRule("#shadowContent draw|page {display:none;}",0);b.insertRule("office|presentation draw|page {display:none;}",1);b.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);b.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var b=a.sheet,d=1;this.showFirstPage=function(){d=1;c()};this.showNextPage=function(){d+=1;c()};this.showPreviousPage=function(){1<d&&(d-=1,c())};this.showPage=function(a){0<a&&(d=a,c())};this.css=a;this.destroy=function(c){a.parentNode.removeChild(a);c()}}function e(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function n(a,c,b){(new odf.Style2CSS).style2css(a.getDocumentType(),b.sheet,
c.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function m(a,c,b){var d=null;a=a.rootElement.body.getElementsByTagNameNS(R,b+"-decl");b=c.getAttributeNS(R,"use-"+b+"-name");var f;if(b&&0<a.length)for(c=0;c<a.length;c+=1)if(f=a[c],f.getAttributeNS(R,"name")===b){d=f.textContent;break}return d}function q(a,c,b,d){var f=a.ownerDocument;c=a.getElementsByTagNameNS(c,b);for(a=0;a<c.length;a+=1)e(c[a]),d&&(b=c[a],b.appendChild(f.createTextNode(d)))}function b(a,c,b){c.setAttributeNS("urn:webodf:names:helper",
"styleid",a);var d,f=c.getAttributeNS(N,"anchor-type"),e=c.getAttributeNS(t,"x"),h=c.getAttributeNS(t,"y"),l=c.getAttributeNS(t,"width"),g=c.getAttributeNS(t,"height"),k=c.getAttributeNS(w,"min-height"),p=c.getAttributeNS(w,"min-width");if("as-char"===f)d="display: inline-block;";else if(f||e||h)d="position: absolute;";else if(l||g||k||p)d="display: block;";e&&(d+="left: "+e+";");h&&(d+="top: "+h+";");l&&(d+="width: "+l+";");g&&(d+="height: "+g+";");k&&(d+="min-height: "+k+";");p&&(d+="min-width: "+
p+";");d&&(d="draw|"+c.localName+'[webodfhelper|styleid="'+a+'"] {'+d+"}",b.insertRule(d,b.cssRules.length))}function h(a){for(a=a.firstChild;a;){if(a.namespaceURI===y&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function r(a,c,b,d){function f(c){c&&(c='draw|image[webodfhelper|styleid="'+a+'"] {'+("background-image: url("+c+");")+"}",d.insertRule(c,d.cssRules.length))}function e(a){f(a.url)}b.setAttributeNS("urn:webodf:names:helper",
"styleid",a);var l=b.getAttributeNS(z,"href"),g;if(l)try{g=c.getPart(l),g.onchange=e,g.load()}catch(k){runtime.log("slight problem: "+String(k))}else l=h(b),f(l)}function d(a){function c(b){var d,f;b.hasAttributeNS(z,"href")&&(d=b.getAttributeNS(z,"href"),"#"===d[0]?(d=d.substring(1),f=function(){var c=U.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.lookupNamespaceURI);0===c.length&&(c=U.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.lookupNamespaceURI));
0<c.length&&c[0].scrollIntoView(!0);return!1}):f=function(){F.open(d)},b.onclick=f)}var b,d,f;d=a.getElementsByTagNameNS(N,"a");for(b=0;b<d.length;b+=1)f=d.item(b),c(f)}function f(a){var c=a.ownerDocument;A.getElementsByTagNameNS(a,N,"line-break").forEach(function(a){a.hasChildNodes()||a.appendChild(c.createElement("br"))})}function a(a){var c=a.ownerDocument;A.getElementsByTagNameNS(a,N,"s").forEach(function(a){for(var b,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(c.createTextNode(" "));
d=parseInt(a.getAttributeNS(N,"c"),10);if(1<d)for(a.removeAttributeNS(N,"c"),b=1;b<d;b+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function c(a){A.getElementsByTagNameNS(a,N,"tab").forEach(function(a){a.textContent="\t"})}function p(a,c){function b(a,d){var h=g.documentElement.namespaceURI;"video/"===d.substr(0,6)?(f=g.createElementNS(h,"video"),f.setAttribute("controls","controls"),e=g.createElementNS(h,"source"),a&&e.setAttribute("src",a),e.setAttribute("type",d),f.appendChild(e),c.parentNode.appendChild(f)):
c.innerHtml="Unrecognised Plugin"}function d(a){b(a.url,a.mimetype)}var f,e,l,g=c.ownerDocument,k;if(l=c.getAttributeNS(z,"href"))try{k=a.getPart(l),k.onchange=d,k.load()}catch(p){runtime.log("slight problem: "+String(p))}else runtime.log("using MP4 data fallback"),l=h(c),b(l,"video/mp4")}function l(a){var c=a.getElementsByTagName("head")[0],b;"undefined"!==String(typeof webodf_css)?(b=a.createElementNS(c.namespaceURI,"style"),b.setAttribute("media","screen, print, handheld, projection"),b.appendChild(a.createTextNode(webodf_css))):
(b=a.createElementNS(c.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),b.setAttribute("href",a),b.setAttribute("rel","stylesheet"));b.setAttribute("type","text/css");c.appendChild(b);return b}function u(a){var c=a.getElementsByTagName("head")[0],b=a.createElementNS(c.namespaceURI,"style"),d="";b.setAttribute("type","text/css");b.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,c){d+="@namespace "+
a+" url("+c+");\n"});d+="@namespace webodfhelper url(urn:webodf:names:helper);\n";b.appendChild(a.createTextNode(d));c.appendChild(b);return b}var B=odf.Namespaces.drawns,w=odf.Namespaces.fons,y=odf.Namespaces.officens,v=odf.Namespaces.stylens,t=odf.Namespaces.svgns,s=odf.Namespaces.tablens,N=odf.Namespaces.textns,z=odf.Namespaces.xlinkns,x=odf.Namespaces.xmlns,R=odf.Namespaces.presentationns,F=runtime.getWindow(),U=xmldom.XPath,P=new odf.OdfUtils,A=new core.DomUtils;odf.OdfCanvas=function(h){function t(a,
c,b){function d(a,c,b,f){D.addToQueue(function(){r(a,c,b,f)})}var f,e;f=c.getElementsByTagNameNS(B,"image");for(c=0;c<f.length;c+=1)e=f.item(c),d("image"+String(c),a,e,b)}function w(a,c){function b(a,c){D.addToQueue(function(){p(a,c)})}var d,f,e;f=c.getElementsByTagNameNS(B,"plugin");for(d=0;d<f.length;d+=1)e=f.item(d),b(a,e)}function z(){L.firstChild&&(1<S?(L.style.MozTransformOrigin="center top",L.style.WebkitTransformOrigin="center top",L.style.OTransformOrigin="center top",L.style.msTransformOrigin=
"center top"):(L.style.MozTransformOrigin="left top",L.style.WebkitTransformOrigin="left top",L.style.OTransformOrigin="left top",L.style.msTransformOrigin="left top"),L.style.WebkitTransform="scale("+S+")",L.style.MozTransform="scale("+S+")",L.style.OTransform="scale("+S+")",L.style.msTransform="scale("+S+")",h.style.width=Math.round(S*L.offsetWidth)+"px",h.style.height=Math.round(S*L.offsetHeight)+"px")}function O(a){function c(a){return d===a.getAttributeNS(y,"name")}var b=A.getElementsByTagNameNS(a,
y,"annotation");a=A.getElementsByTagNameNS(a,y,"annotation-end");var d,f;for(f=0;f<b.length;f+=1)d=b[f].getAttributeNS(y,"name"),aa.addAnnotation({node:b[f],end:a.filter(c)[0]||null});aa.rerenderAnnotations()}function ba(a){la?(ca.parentNode||(L.appendChild(ca),z()),aa&&aa.forgetAnnotations(),aa=new gui.AnnotationViewManager(C,a.body,ca),O(a.body)):ca.parentNode&&(L.removeChild(ca),aa.forgetAnnotations(),z())}function K(l){function g(){e(h);h.style.display="inline-block";var k=H.rootElement;h.ownerDocument.importNode(k,
!0);X.setOdfContainer(H);var p=H,r=T;(new odf.FontLoader).loadFonts(p,r.sheet);n(H,X,$);r=H;p=W.sheet;e(h);L=Y.createElementNS(h.namespaceURI,"div");L.style.display="inline-block";L.style.background="white";L.appendChild(k);h.appendChild(L);ca=Y.createElementNS(h.namespaceURI,"div");ca.id="annotationsPane";da=Y.createElementNS(h.namespaceURI,"div");da.id="shadowContent";da.style.position="absolute";da.style.top=0;da.style.left=0;r.getContentElement().appendChild(da);var u=k.body,A,E=[],C;for(A=u.firstElementChild;A&&
A!==u;)if(A.namespaceURI===B&&(E[E.length]=A),A.firstElementChild)A=A.firstElementChild;else{for(;A&&A!==u&&!A.nextElementSibling;)A=A.parentElement;A&&A.nextElementSibling&&(A=A.nextElementSibling)}for(C=0;C<E.length;C+=1)A=E[C],b("frame"+String(C),A,p);E=U.getODFElementsWithXPath(u,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.lookupNamespaceURI);for(A=0;A<E.length;A+=1)u=E[A],u.setAttributeNS&&u.setAttributeNS("urn:webodf:names:helper","containsparagraphanchor",!0);var u=da,O,I,D;D=0;
var K,Q,E=r.rootElement.ownerDocument;if((A=k.body.firstElementChild)&&A.namespaceURI===y&&("presentation"===A.localName||"drawing"===A.localName))for(A=A.firstElementChild;A;){C=A.getAttributeNS(B,"master-page-name");if(C){for(O=r.rootElement.masterStyles.firstElementChild;O&&(O.getAttributeNS(v,"name")!==C||"master-page"!==O.localName||O.namespaceURI!==v););C=O}else C=null;if(C){O=A.getAttributeNS("urn:webodf:names:helper","styleid");I=E.createElementNS(B,"draw:page");Q=C.firstElementChild;for(K=
0;Q;)"true"!==Q.getAttributeNS(R,"placeholder")&&(D=Q.cloneNode(!0),I.appendChild(D),b(O+"_"+K,D,p)),Q=Q.nextElementSibling,K+=1;Q=K=D=void 0;var V=I.getElementsByTagNameNS(B,"frame");for(D=0;D<V.length;D+=1)K=V[D],(Q=K.getAttributeNS(R,"class"))&&!/^(date-time|footer|header|page-number')$/.test(Q)&&K.parentNode.removeChild(K);u.appendChild(I);D=String(u.getElementsByTagNameNS(B,"page").length);q(I,N,"page-number",D);q(I,R,"header",m(r,A,"header"));q(I,R,"footer",m(r,A,"footer"));b(O,I,p);I.setAttributeNS(B,
"draw:master-page-name",C.getAttributeNS(v,"name"))}A=A.nextElementSibling}u=h.namespaceURI;E=k.body.getElementsByTagNameNS(s,"table-cell");for(A=0;A<E.length;A+=1)C=E.item(A),C.hasAttributeNS(s,"number-columns-spanned")&&C.setAttributeNS(u,"colspan",C.getAttributeNS(s,"number-columns-spanned")),C.hasAttributeNS(s,"number-rows-spanned")&&C.setAttributeNS(u,"rowspan",C.getAttributeNS(s,"number-rows-spanned"));d(k.body);f(k.body);a(k.body);c(k.body);t(r,k.body,p);w(r,k.body);C=k.body;r=h.namespaceURI;
A={};var E={},J;O=F.document.getElementsByTagNameNS(N,"list-style");for(u=0;u<O.length;u+=1)K=O.item(u),(Q=K.getAttributeNS(v,"name"))&&(E[Q]=K);C=C.getElementsByTagNameNS(N,"list");for(u=0;u<C.length;u+=1)if(K=C.item(u),O=K.getAttributeNS(x,"id")){I=K.getAttributeNS(N,"continue-list");K.setAttributeNS(r,"id",O);D="text|list#"+O+" > text|list-item > *:first-child:before {";if(Q=K.getAttributeNS(N,"style-name")){K=E[Q];J=P.getFirstNonWhitespaceChild(K);K=void 0;if(J)if("list-level-style-number"===
J.localName){K=J.getAttributeNS(v,"num-format");Q=J.getAttributeNS(v,"num-suffix")||"";var V="",V={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},S=void 0,S=J.getAttributeNS(v,"num-prefix")||"",S=V.hasOwnProperty(K)?S+(" counter(list, "+V[K]+")"):K?S+("'"+K+"';"):S+" ''";Q&&(S+=" '"+Q+"'");K=V="content: "+S+";"}else"list-level-style-image"===J.localName?K="content: none;":"list-level-style-bullet"===J.localName&&(K="content: '"+J.getAttributeNS(N,"bullet-char")+"';");
J=K}if(I){for(K=A[I];K;)K=A[K];D+="counter-increment:"+I+";";J?(J=J.replace("list",I),D+=J):D+="content:counter("+I+");"}else I="",J?(J=J.replace("list",O),D+=J):D+="content: counter("+O+");",D+="counter-increment:"+O+";",p.insertRule("text|list#"+O+" {counter-reset:"+O+"}",p.cssRules.length);D+="}";A[O]=I;D&&p.insertRule(D,p.cssRules.length)}L.insertBefore(da,L.firstChild);z();ba(k);if(!l&&(k=[H],ga.hasOwnProperty("statereadychange")))for(p=ga.statereadychange,J=0;J<p.length;J+=1)p[J].apply(null,
k)}H.state===odf.OdfContainer.DONE?g():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function ha(){H.state===odf.OdfContainer.DONE?g():(runtime.log("will be back later..."),runtime.setTimeout(ha,500))},100))}function I(a){D.clearQueue();h.innerHTML=runtime.tr("Loading")+" "+a+"...";h.removeAttribute("style");H=new odf.OdfContainer(a,function(a){H=a;K(!1)})}runtime.assert(null!==h&&void 0!==h,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==
h.ownerDocument&&void 0!==h.ownerDocument,"odf.OdfCanvas constructor needs DOM");var C=this,Y=h.ownerDocument,H,X=new odf.Formatting,Q,L=null,ca=null,la=!1,aa=null,ma,T,$,W,da,S=1,ga={},D=new g;this.refreshCSS=function(){n(H,X,$);z()};this.refreshSize=function(){z()};this.odfContainer=function(){return H};this.setOdfContainer=function(a,c){H=a;K(!0===c)};this.load=this.load=I;this.save=function(a){H.save(a)};this.addListener=function(a,c){switch(a){case "click":var b=h,d=a;b.addEventListener?b.addEventListener(d,
c,!1):b.attachEvent?b.attachEvent("on"+d,c):b["on"+d]=c;break;default:b=ga.hasOwnProperty(a)?ga[a]:ga[a]=[],c&&-1===b.indexOf(c)&&b.push(c)}};this.getFormatting=function(){return X};this.getAnnotationViewManager=function(){return aa};this.refreshAnnotations=function(){ba(H.rootElement)};this.rerenderAnnotations=function(){aa&&aa.rerenderAnnotations()};this.getSizer=function(){return L};this.enableAnnotations=function(a){a!==la&&(la=a,H&&ba(H.rootElement))};this.addAnnotation=function(a){aa&&aa.addAnnotation(a)};
this.forgetAnnotations=function(){aa&&aa.forgetAnnotations()};this.setZoomLevel=function(a){S=a;z()};this.getZoomLevel=function(){return S};this.fitToContainingElement=function(a,c){var b=h.offsetHeight/S;S=a/(h.offsetWidth/S);c/b<S&&(S=c/b);z()};this.fitToWidth=function(a){S=a/(h.offsetWidth/S);z()};this.fitSmart=function(a,c){var b,d;b=h.offsetWidth/S;d=h.offsetHeight/S;b=a/b;void 0!==c&&c/d<b&&(b=c/d);S=Math.min(1,b);z()};this.fitToHeight=function(a){S=a/(h.offsetHeight/S);z()};this.showFirstPage=
function(){Q.showFirstPage()};this.showNextPage=function(){Q.showNextPage()};this.showPreviousPage=function(){Q.showPreviousPage()};this.showPage=function(a){Q.showPage(a);z()};this.getElement=function(){return h};this.addCssForFrameWithImage=function(a){var c=a.getAttributeNS(B,"name"),d=a.firstElementChild;b(c,a,W.sheet);d&&r(c+"img",H,d,W.sheet)};this.destroy=function(a){var c=Y.getElementsByTagName("head")[0];ca&&ca.parentNode&&ca.parentNode.removeChild(ca);L&&(h.removeChild(L),L=null);c.removeChild(ma);
c.removeChild(T);c.removeChild($);c.removeChild(W);Q.destroy(a)};ma=l(Y);Q=new k(u(Y));T=u(Y);$=u(Y);W=u(Y)}})();
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
gui.StyleHelper=function(g){function k(b,e,g){var d=!0,f;for(f=0;f<b.length&&!(d=b[f]["style:text-properties"],d=!d||d[e]!==g);f+=1);return!d}function e(b,e,k){function d(){p=!0;(a=g.getDefaultStyleElement("paragraph"))||(a=null)}var f,a;b=m.getParagraphElements(b);for(var c={},p=!1;0<b.length;){(f=b[0].getAttributeNS(q,"style-name"))?c[f]||(a=g.getStyleElement(f,"paragraph"),c[f]=!0,a||p||d()):p?a=void 0:d();if(void 0!==a&&(f=null===a?g.getSystemDefaultStyleAttributes("paragraph"):g.getInheritedStyleAttributes(a,
!0),(f=f["style:paragraph-properties"])&&-1===k.indexOf(f[e])))return!1;b.pop()}return!0}var n=new core.DomUtils,m=new odf.OdfUtils,q=odf.Namespaces.textns;this.getAppliedStyles=function(b){var e;b.collapsed?(e=b.startContainer,e.hasChildNodes()&&b.startOffset<e.childNodes.length&&(e=e.childNodes.item(b.startOffset)),b=[e]):b=m.getTextNodes(b,!0);return g.getAppliedStyles(b)};this.applyStyle=function(b,e,k){var d=n.splitBoundaries(e),f=m.getTextNodes(e,!1);g.applyStyle(b,f,{startContainer:e.startContainer,
startOffset:e.startOffset,endContainer:e.endContainer,endOffset:e.endOffset},k);d.forEach(n.normalizeTextNodes)};this.isBold=function(b){return k(b,"fo:font-weight","bold")};this.isItalic=function(b){return k(b,"fo:font-style","italic")};this.hasUnderline=function(b){return k(b,"style:text-underline-style","solid")};this.hasStrikeThrough=function(b){return k(b,"style:text-line-through-style","solid")};this.isAlignedLeft=function(b){return e(b,"fo:text-align",["left","start"])};this.isAlignedCenter=
function(b){return e(b,"fo:text-align",["center"])};this.isAlignedRight=function(b){return e(b,"fo:text-align",["right","end"])};this.isAlignedJustified=function(b){return e(b,"fo:text-align",["justify"])}};
// Input 44
core.RawDeflate=function(){function g(){this.dl=this.fc=0}function k(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function e(a,c,b,d){this.good_length=a;this.max_lazy=c;this.nice_length=b;this.max_chain=d}function n(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=m;this.off=0}var m=8192,q,b,h,r,d=null,f,a,c,p,l,u,B,w,y,v,t,s,N,z,x,R,F,U,P,A,ja,ka,G,Z,O,ba,K,I,C,Y,H,X,Q,L,ca,la,aa,ma,T,$,W,da,S,ga,D,fa,E,pa,ha,ia,Ea,M=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],qa=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],ra=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],wa=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],sa;sa=[new e(0,0,0,0),new e(4,4,8,4),new e(4,5,16,8),new e(4,6,32,32),new e(4,4,16,16),new e(8,16,32,32),new e(8,16,128,128),new e(8,32,128,256),new e(32,128,258,1024),new e(32,258,258,4096)];var Aa=function(c){d[a+f++]=c;if(a+f===m){var e;if(0!==f){null!==q?(c=q,q=q.next):c=new n;
c.next=null;c.len=c.off=0;null===b?b=h=c:h=h.next=c;c.len=f-a;for(e=0;e<c.len;e++)c.ptr[e]=d[a+e];f=a=0}}},ta=function(c){c&=65535;a+f<m-2?(d[a+f++]=c&255,d[a+f++]=c>>>8):(Aa(c&255),Aa(c>>>8))},Ba=function(){t=(t<<5^p[F+3-1]&255)&8191;s=B[32768+t];B[F&32767]=s;B[32768+t]=F},V=function(a,c){y>16-c?(w|=a<<y,ta(w),w=a>>16-y,y+=c-16):(w|=a<<y,y+=c)},J=function(a,c){V(c[a].fc,c[a].dl)},ua=function(a,c,b){return a[c].fc<a[b].fc||a[c].fc===a[b].fc&&aa[c]<=aa[b]},na=function(a,c,b){var d;for(d=0;d<b&&Ea<
ia.length;d++)a[c+d]=ia.charCodeAt(Ea++)&255;return d},ea=function(){var a,c,b=65536-A-F;if(-1===b)b--;else if(65274<=F){for(a=0;32768>a;a++)p[a]=p[a+32768];U-=32768;F-=32768;v-=32768;for(a=0;8192>a;a++)c=B[32768+a],B[32768+a]=32768<=c?c-32768:0;for(a=0;32768>a;a++)c=B[a],B[a]=32768<=c?c-32768:0;b+=32768}P||(a=na(p,F+A,b),0>=a?P=!0:A+=a)},oa=function(a){var c=ja,b=F,d,f=R,e=32506<F?F-32506:0,h=F+258,l=p[b+f-1],g=p[b+f];R>=Z&&(c>>=2);do if(d=a,p[d+f]===g&&p[d+f-1]===l&&p[d]===p[b]&&p[++d]===p[b+1]){b+=
2;d++;do++b;while(p[b]===p[++d]&&p[++b]===p[++d]&&p[++b]===p[++d]&&p[++b]===p[++d]&&p[++b]===p[++d]&&p[++b]===p[++d]&&p[++b]===p[++d]&&p[++b]===p[++d]&&b<h);d=258-(h-b);b=h-258;if(d>f){U=a;f=d;if(258<=d)break;l=p[b+f-1];g=p[b+f]}a=B[a&32767]}while(a>e&&0!==--c);return f},Ca=function(a,c){u[S++]=c;0===a?O[c].fc++:(a--,O[ma[c]+256+1].fc++,ba[(256>a?T[a]:T[256+(a>>7)])&255].fc++,l[ga++]=a,fa|=E);E<<=1;0===(S&7)&&(da[D++]=fa,fa=0,E=1);if(2<G&&0===(S&4095)){var b=8*S,d=F-v,f;for(f=0;30>f;f++)b+=ba[f].fc*
(5+qa[f]);b>>=3;if(ga<parseInt(S/2,10)&&b<parseInt(d/2,10))return!0}return 8191===S||8192===ga},va=function(a,c){for(var b=L[c],d=c<<1;d<=ca;){d<ca&&ua(a,L[d+1],L[d])&&d++;if(ua(a,b,L[d]))break;L[c]=L[d];c=d;d<<=1}L[c]=b},Fa=function(a,c){var b=0;do b|=a&1,a>>=1,b<<=1;while(0<--c);return b>>1},xa=function(a,c){var b=[];b.length=16;var d=0,f;for(f=1;15>=f;f++)d=d+Q[f-1]<<1,b[f]=d;for(d=0;d<=c;d++)f=a[d].dl,0!==f&&(a[d].fc=Fa(b[f]++,f))},Da=function(a){var c=a.dyn_tree,b=a.static_tree,d=a.elems,f,e=
-1,h=d;ca=0;la=573;for(f=0;f<d;f++)0!==c[f].fc?(L[++ca]=e=f,aa[f]=0):c[f].dl=0;for(;2>ca;)f=L[++ca]=2>e?++e:0,c[f].fc=1,aa[f]=0,pa--,null!==b&&(ha-=b[f].dl);a.max_code=e;for(f=ca>>1;1<=f;f--)va(c,f);do f=L[1],L[1]=L[ca--],va(c,1),b=L[1],L[--la]=f,L[--la]=b,c[h].fc=c[f].fc+c[b].fc,aa[h]=aa[f]>aa[b]+1?aa[f]:aa[b]+1,c[f].dl=c[b].dl=h,L[1]=h++,va(c,1);while(2<=ca);L[--la]=L[1];h=a.dyn_tree;f=a.extra_bits;var d=a.extra_base,b=a.max_code,l=a.max_length,g=a.static_tree,k,p,m,n,r=0;for(p=0;15>=p;p++)Q[p]=
0;h[L[la]].dl=0;for(a=la+1;573>a;a++)k=L[a],p=h[h[k].dl].dl+1,p>l&&(p=l,r++),h[k].dl=p,k>b||(Q[p]++,m=0,k>=d&&(m=f[k-d]),n=h[k].fc,pa+=n*(p+m),null!==g&&(ha+=n*(g[k].dl+m)));if(0!==r){do{for(p=l-1;0===Q[p];)p--;Q[p]--;Q[p+1]+=2;Q[l]--;r-=2}while(0<r);for(p=l;0!==p;p--)for(k=Q[p];0!==k;)f=L[--a],f>b||(h[f].dl!==p&&(pa+=(p-h[f].dl)*h[f].fc,h[f].fc=p),k--)}xa(c,e)},ya=function(a,c){var b,d=-1,f,e=a[0].dl,h=0,l=7,g=4;0===e&&(l=138,g=3);a[c+1].dl=65535;for(b=0;b<=c;b++)f=e,e=a[b+1].dl,++h<l&&f===e||(h<
g?C[f].fc+=h:0!==f?(f!==d&&C[f].fc++,C[16].fc++):10>=h?C[17].fc++:C[18].fc++,h=0,d=f,0===e?(l=138,g=3):f===e?(l=6,g=3):(l=7,g=4))},Ga=function(){8<y?ta(w):0<y&&Aa(w);y=w=0},za=function(a,c){var b,d=0,f=0,e=0,h=0,g,k;if(0!==S){do 0===(d&7)&&(h=da[e++]),b=u[d++]&255,0===(h&1)?J(b,a):(g=ma[b],J(g+256+1,a),k=M[g],0!==k&&(b-=$[g],V(b,k)),b=l[f++],g=(256>b?T[b]:T[256+(b>>7)])&255,J(g,c),k=qa[g],0!==k&&(b-=W[g],V(b,k))),h>>=1;while(d<S)}J(256,a)},Ia=function(a,c){var b,d=-1,f,e=a[0].dl,h=0,l=7,g=4;0===e&&
(l=138,g=3);for(b=0;b<=c;b++)if(f=e,e=a[b+1].dl,!(++h<l&&f===e)){if(h<g){do J(f,C);while(0!==--h)}else 0!==f?(f!==d&&(J(f,C),h--),J(16,C),V(h-3,2)):10>=h?(J(17,C),V(h-3,3)):(J(18,C),V(h-11,7));h=0;d=f;0===e?(l=138,g=3):f===e?(l=6,g=3):(l=7,g=4)}},Ja=function(){var a;for(a=0;286>a;a++)O[a].fc=0;for(a=0;30>a;a++)ba[a].fc=0;for(a=0;19>a;a++)C[a].fc=0;O[256].fc=1;fa=S=ga=D=pa=ha=0;E=1},Ha=function(a){var c,b,d,f;f=F-v;da[D]=fa;Da(Y);Da(H);ya(O,Y.max_code);ya(ba,H.max_code);Da(X);for(d=18;3<=d&&0===C[wa[d]].dl;d--);
pa+=3*(d+1)+14;c=pa+3+7>>3;b=ha+3+7>>3;b<=c&&(c=b);if(f+4<=c&&0<=v)for(V(0+a,3),Ga(),ta(f),ta(~f),d=0;d<f;d++)Aa(p[v+d]);else if(b===c)V(2+a,3),za(K,I);else{V(4+a,3);f=Y.max_code+1;c=H.max_code+1;d+=1;V(f-257,5);V(c-1,5);V(d-4,4);for(b=0;b<d;b++)V(C[wa[b]].dl,3);Ia(O,f-1);Ia(ba,c-1);za(O,ba)}Ja();0!==a&&Ga()},Ka=function(c,e,h){var l,g,k;for(l=0;null!==b&&l<h;){g=h-l;g>b.len&&(g=b.len);for(k=0;k<g;k++)c[e+l+k]=b.ptr[b.off+k];b.off+=g;b.len-=g;l+=g;0===b.len&&(g=b,b=b.next,g.next=q,q=g)}if(l===h)return l;
if(a<f){g=h-l;g>f-a&&(g=f-a);for(k=0;k<g;k++)c[e+l+k]=d[a+k];a+=g;l+=g;f===a&&(f=a=0)}return l},La=function(d,e,h){var l;if(!r){if(!P){y=w=0;var g,k;if(0===I[0].dl){Y.dyn_tree=O;Y.static_tree=K;Y.extra_bits=M;Y.extra_base=257;Y.elems=286;Y.max_length=15;Y.max_code=0;H.dyn_tree=ba;H.static_tree=I;H.extra_bits=qa;H.extra_base=0;H.elems=30;H.max_length=15;H.max_code=0;X.dyn_tree=C;X.static_tree=null;X.extra_bits=ra;X.extra_base=0;X.elems=19;X.max_length=7;for(k=g=X.max_code=0;28>k;k++)for($[k]=g,l=0;l<
1<<M[k];l++)ma[g++]=k;ma[g-1]=k;for(k=g=0;16>k;k++)for(W[k]=g,l=0;l<1<<qa[k];l++)T[g++]=k;for(g>>=7;30>k;k++)for(W[k]=g<<7,l=0;l<1<<qa[k]-7;l++)T[256+g++]=k;for(l=0;15>=l;l++)Q[l]=0;for(l=0;143>=l;)K[l++].dl=8,Q[8]++;for(;255>=l;)K[l++].dl=9,Q[9]++;for(;279>=l;)K[l++].dl=7,Q[7]++;for(;287>=l;)K[l++].dl=8,Q[8]++;xa(K,287);for(l=0;30>l;l++)I[l].dl=5,I[l].fc=Fa(l,5);Ja()}for(l=0;8192>l;l++)B[32768+l]=0;ka=sa[G].max_lazy;Z=sa[G].good_length;ja=sa[G].max_chain;v=F=0;A=na(p,0,65536);if(0>=A)P=!0,A=0;else{for(P=
!1;262>A&&!P;)ea();for(l=t=0;2>l;l++)t=(t<<5^p[l]&255)&8191}b=null;a=f=0;3>=G?(R=2,x=0):(x=2,z=0);c=!1}r=!0;if(0===A)return c=!0,0}l=Ka(d,e,h);if(l===h)return h;if(c)return l;if(3>=G)for(;0!==A&&null===b;){Ba();0!==s&&32506>=F-s&&(x=oa(s),x>A&&(x=A));if(3<=x)if(k=Ca(F-U,x-3),A-=x,x<=ka){x--;do F++,Ba();while(0!==--x);F++}else F+=x,x=0,t=p[F]&255,t=(t<<5^p[F+1]&255)&8191;else k=Ca(0,p[F]&255),A--,F++;k&&(Ha(0),v=F);for(;262>A&&!P;)ea()}else for(;0!==A&&null===b;){Ba();R=x;N=U;x=2;0!==s&&R<ka&&32506>=
F-s&&(x=oa(s),x>A&&(x=A),3===x&&4096<F-U&&x--);if(3<=R&&x<=R){k=Ca(F-1-N,R-3);A-=R-1;R-=2;do F++,Ba();while(0!==--R);z=0;x=2;F++;k&&(Ha(0),v=F)}else 0!==z?Ca(0,p[F-1]&255)&&(Ha(0),v=F):z=1,F++,A--;for(;262>A&&!P;)ea()}0===A&&(0!==z&&Ca(0,p[F-1]&255),Ha(1),c=!0);return l+Ka(d,l+e,h-l)};this.deflate=function(a,c){var f,e;ia=a;Ea=0;"undefined"===String(typeof c)&&(c=6);(f=c)?1>f?f=1:9<f&&(f=9):f=6;G=f;P=r=!1;if(null===d){q=b=h=null;d=[];d.length=m;p=[];p.length=65536;l=[];l.length=8192;u=[];u.length=
32832;B=[];B.length=65536;O=[];O.length=573;for(f=0;573>f;f++)O[f]=new g;ba=[];ba.length=61;for(f=0;61>f;f++)ba[f]=new g;K=[];K.length=288;for(f=0;288>f;f++)K[f]=new g;I=[];I.length=30;for(f=0;30>f;f++)I[f]=new g;C=[];C.length=39;for(f=0;39>f;f++)C[f]=new g;Y=new k;H=new k;X=new k;Q=[];Q.length=16;L=[];L.length=573;aa=[];aa.length=573;ma=[];ma.length=256;T=[];T.length=512;$=[];$.length=29;W=[];W.length=30;da=[];da.length=1024}var n=Array(1024),v=[],s=[];for(f=La(n,0,n.length);0<f;){s.length=f;for(e=
0;e<f;e++)s[e]=String.fromCharCode(n[e]);v[v.length]=s.join("");f=La(n,0,n.length)}ia="";return v.join("")}};
// Input 45
runtime.loadClass("odf.Namespaces");
gui.ImageSelector=function(g){function k(){var b=g.getSizer(),e,k;e=m.createElement("div");e.id="imageSelector";e.style.borderWidth="1px";b.appendChild(e);n.forEach(function(b){k=m.createElement("div");k.className=b;e.appendChild(k)});return e}var e=odf.Namespaces.svgns,n="topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(" "),m=g.getElement().ownerDocument,q=!1;this.select=function(b){var h,n,d=m.getElementById("imageSelector");d||(d=k());q=!0;h=d.parentNode;
n=b.getBoundingClientRect();var f=h.getBoundingClientRect(),a=g.getZoomLevel();h=(n.left-f.left)/a-1;n=(n.top-f.top)/a-1;d.style.display="block";d.style.left=h+"px";d.style.top=n+"px";d.style.width=b.getAttributeNS(e,"width");d.style.height=b.getAttributeNS(e,"height")};this.clearSelection=function(){var b;q&&(b=m.getElementById("imageSelector"))&&(b.style.display="none");q=!1};this.isSelectorElement=function(b){var e=m.getElementById("imageSelector");return e?b===e||b.parentNode===e:!1}};
// Input 46
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(g,k,e){return new odf.OdfContainer(g,function(n){if(n.state===odf.OdfContainer.INVALID)return e("Document "+g+" is invalid.");n.state===odf.OdfContainer.DONE?n.saveAs(k,function(g){e(g)}):e("Document was not completely loaded.")})};this.render=function(g,k,e){for(k=k.getElementsByTagName("body")[0];k.firstChild;)k.removeChild(k.firstChild);k=new odf.OdfCanvas(k);k.addListener("statereadychange",function(g){e(g)});k.load(g)}};
// Input 47
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
ops.Member=function(g,k){var e={};this.getMemberId=function(){return g};this.getProperties=function(){return e};this.setProperties=function(g){Object.keys(g).forEach(function(k){e[k]=g[k]})};this.removeProperties=function(g){delete g.fullName;delete g.color;delete g.imageUrl;Object.keys(g).forEach(function(g){e.hasOwnProperty(g)&&delete e[g]})};runtime.assert(Boolean(g),"No memberId was supplied!");k.fullName||(k.fullName=runtime.tr("Unknown Author"));k.color||(k.color="black");k.imageUrl||(k.imageUrl=
"avatar-joe.png");e=k};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("core.PositionFilter");runtime.loadClass("odf.OdfUtils");
(function(){function g(e,g,m){function q(a,c){function b(a){for(var c=0;a&&a.previousSibling;)c+=1,a=a.previousSibling;return c}this.steps=a;this.node=c;this.setIteratorPosition=function(a){a.setUnfilteredPosition(c.parentNode,b(c));do if(g.acceptPosition(a)===u)break;while(a.nextPosition())}}function b(a){return a.nodeType===Node.ELEMENT_NODE&&a.getAttributeNS(d,"nodeId")}function h(a){var c=k;a.setAttributeNS(d,"nodeId",c.toString());k+=1;return c}function r(c,f){var h,l=null;for(c=c.childNodes[f]||
c;!l&&c&&c!==e;)(h=b(c))&&(l=a[h])&&l.node!==c&&(runtime.log("Cloned node detected. Creating new bookmark"),l=null,c.removeAttributeNS(d,"nodeId")),c=c.parentNode;return l}var d="urn:webodf:names:steps",f={},a={},c=new odf.OdfUtils,p=new core.DomUtils,l,u=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.updateCache=function(d,e,l,g){var k;0===l&&c.isParagraph(e)?(k=!0,g||(d+=1)):e.hasChildNodes()&&e.childNodes[l]&&(e=e.childNodes[l],(k=c.isParagraph(e))&&(d+=1));k&&(l=b(e)||h(e),(g=a[l])?g.node===
e?g.steps=d:(runtime.log("Cloned node detected. Creating new bookmark"),l=h(e),g=a[l]=new q(d,e)):g=a[l]=new q(d,e),l=g,d=Math.ceil(l.steps/m)*m,e=f[d],!e||l.steps>e.steps)&&(f[d]=l)};this.setToClosestStep=function(a,c){for(var b=Math.floor(a/m)*m,d;!d&&0!==b;)d=f[b],b-=m;d=d||l;d.setIteratorPosition(c);return d.steps};this.setToClosestDomPoint=function(a,c,b){var d;if(a===e&&0===c)d=l;else if(a===e&&c===e.childNodes.length)d=Object.keys(f).map(function(a){return f[a]}).reduce(function(a,c){return c.steps>
a.steps?c:a},l);else if(d=r(a,c),!d)for(b.setUnfilteredPosition(a,c);!d&&b.previousNode();)d=r(b.container(),b.unfilteredDomOffset());d=d||l;d.setIteratorPosition(b);return d.steps};this.updateCacheAtPoint=function(c,d){var h={};Object.keys(a).map(function(c){return a[c]}).filter(function(a){return a.steps>c}).forEach(function(c){var l=Math.ceil(c.steps/m)*m,g,k;if(p.containsNode(e,c.node)){if(d(c),g=Math.ceil(c.steps/m)*m,k=h[g],!k||c.steps>k.steps)h[g]=c}else delete a[b(c.node)];f[l]===c&&delete f[l]});
Object.keys(h).forEach(function(a){f[a]=h[a]})};l=new function(a,c){this.steps=a;this.node=c;this.setIteratorPosition=function(a){a.setUnfilteredPosition(c,0);do if(g.acceptPosition(a)===u)break;while(a.nextPosition())}}(0,e)}var k=0;ops.StepsTranslator=function(e,k,m,q){function b(){var c=e();c!==r&&(runtime.log("Undo detected. Resetting steps cache"),r=c,d=new g(r,m,q),a=k(r))}function h(a,b){if(!b||m.acceptPosition(a)===c)return!0;for(;a.previousPosition();)if(m.acceptPosition(a)===c){if(b(0,a.container(),
a.unfilteredDomOffset()))return!0;break}for(;a.nextPosition();)if(m.acceptPosition(a)===c){if(b(1,a.container(),a.unfilteredDomOffset()))return!0;break}return!1}var r=e(),d=new g(r,m,q),f=new core.DomUtils,a=k(e()),c=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.convertStepsToDomPoint=function(f){var e,h;0>f&&(runtime.log("warn","Requested steps were negative ("+f+")"),f=0);b();for(e=d.setToClosestStep(f,a);e<f&&a.nextPosition();)(h=m.acceptPosition(a)===c)&&(e+=1),d.updateCache(e,a.container(),
a.unfilteredDomOffset(),h);e!==f&&runtime.log("warn","Requested "+f+" steps but only "+e+" are available");return{node:a.container(),offset:a.unfilteredDomOffset()}};this.convertDomPointToSteps=function(e,l,g){var k;b();f.containsNode(r,e)||(l=0>f.comparePoints(r,0,e,l),e=r,l=l?0:r.childNodes.length);a.setUnfilteredPosition(e,l);h(a,g)||a.setUnfilteredPosition(e,l);g=a.container();l=a.unfilteredDomOffset();e=d.setToClosestDomPoint(g,l,a);if(0>f.comparePoints(a.container(),a.unfilteredDomOffset(),
g,l))return 0<e?e-1:e;for(;(a.container()!==g||a.unfilteredDomOffset()!==l)&&a.nextPosition();)(k=m.acceptPosition(a)===c)&&(e+=1),d.updateCache(e,a.container(),a.unfilteredDomOffset(),k);return e+0};this.prime=function(){var f,e;b();for(f=d.setToClosestStep(0,a);a.nextPosition();)(e=m.acceptPosition(a)===c)&&(f+=1),d.updateCache(f,a.container(),a.unfilteredDomOffset(),e)};this.handleStepsInserted=function(a){b();d.updateCacheAtPoint(a.position,function(c){c.steps+=a.length})};this.handleStepsRemoved=
function(a){b();d.updateCacheAtPoint(a.position,function(c){c.steps-=a.length;0>c.steps&&(c.steps=0)})}};ops.StepsTranslator.PREVIOUS_STEP=0;ops.StepsTranslator.NEXT_STEP=1;return ops.StepsTranslator})();
// Input 49
xmldom.RNG={};
xmldom.RelaxNGParser=function(){function g(b,f){this.message=function(){f&&(b+=1===f.nodeType?" Element ":" Node ",b+=f.nodeName,f.nodeValue&&(b+=" with value '"+f.nodeValue+"'"),b+=".");return b}}function k(b){if(2>=b.e.length)return b;var f={name:b.name,e:b.e.slice(0,2)};return k({name:b.name,e:[f].concat(b.e.slice(2))})}function e(b){b=b.split(":",2);var f="",a;1===b.length?b=["",b[0]]:f=b[0];for(a in h)h[a]===f&&(b[0]=a);return b}function n(b,f){for(var a=0,c,h,l=b.name;b.e&&a<b.e.length;)if(c=b.e[a],
"ref"===c.name){h=f[c.a.name];if(!h)throw c.a.name+" was not defined.";c=b.e.slice(a+1);b.e=b.e.slice(0,a);b.e=b.e.concat(h.e);b.e=b.e.concat(c)}else a+=1,n(c,f);c=b.e;"choice"!==l||c&&c[1]&&"empty"!==c[1].name||(c&&c[0]&&"empty"!==c[0].name?(c[1]=c[0],c[0]={name:"empty"}):(delete b.e,b.name="empty"));if("group"===l||"interleave"===l)"empty"===c[0].name?"empty"===c[1].name?(delete b.e,b.name="empty"):(l=b.name=c[1].name,b.names=c[1].names,c=b.e=c[1].e):"empty"===c[1].name&&(l=b.name=c[0].name,b.names=
c[0].names,c=b.e=c[0].e);"oneOrMore"===l&&"empty"===c[0].name&&(delete b.e,b.name="empty");if("attribute"===l){h=b.names?b.names.length:0;for(var g,k=[],m=[],a=0;a<h;a+=1)g=e(b.names[a]),m[a]=g[0],k[a]=g[1];b.localnames=k;b.namespaces=m}"interleave"===l&&("interleave"===c[0].name?b.e="interleave"===c[1].name?c[0].e.concat(c[1].e):[c[1]].concat(c[0].e):"interleave"===c[1].name&&(b.e=[c[0]].concat(c[1].e)))}function m(b,f){for(var a=0,c;b.e&&a<b.e.length;)c=b.e[a],"elementref"===c.name?(c.id=c.id||
0,b.e[a]=f[c.id]):"element"!==c.name&&m(c,f),a+=1}var q=this,b,h={"http://www.w3.org/XML/1998/namespace":"xml"},r;r=function(b,f,a){var c=[],g,l,m=b.localName,n=[];g=b.attributes;var q=m,y=n,v={},t,s;for(t=0;g&&t<g.length;t+=1)if(s=g.item(t),s.namespaceURI)"http://www.w3.org/2000/xmlns/"===s.namespaceURI&&(h[s.value]=s.localName);else{"name"!==s.localName||"element"!==q&&"attribute"!==q||y.push(s.value);if("name"===s.localName||"combine"===s.localName||"type"===s.localName){var N=s,z;z=s.value;z=
z.replace(/^\s\s*/,"");for(var x=/\s/,R=z.length-1;x.test(z.charAt(R));)R-=1;z=z.slice(0,R+1);N.value=z}v[s.localName]=s.value}g=v;g.combine=g.combine||void 0;b=b.firstChild;q=c;y=n;for(v="";b;){if(b.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===b.namespaceURI){if(t=r(b,f,q))"name"===t.name?y.push(h[t.a.ns]+":"+t.text):"choice"===t.name&&t.names&&t.names.length&&(y=y.concat(t.names),delete t.names),q.push(t)}else b.nodeType===Node.TEXT_NODE&&(v+=b.nodeValue);b=b.nextSibling}b=
v;"value"!==m&&"param"!==m&&(b=/^\s*([\s\S]*\S)?\s*$/.exec(b)[1]);"value"===m&&void 0===g.type&&(g.type="token",g.datatypeLibrary="");"attribute"!==m&&"element"!==m||void 0===g.name||(l=e(g.name),c=[{name:"name",text:l[1],a:{ns:l[0]}}].concat(c),delete g.name);"name"===m||"nsName"===m||"value"===m?void 0===g.ns&&(g.ns=""):delete g.ns;"name"===m&&(l=e(b),g.ns=l[0],b=l[1]);1<c.length&&("define"===m||"oneOrMore"===m||"zeroOrMore"===m||"optional"===m||"list"===m||"mixed"===m)&&(c=[{name:"group",e:k({name:"group",
e:c}).e}]);2<c.length&&"element"===m&&(c=[c[0]].concat({name:"group",e:k({name:"group",e:c.slice(1)}).e}));1===c.length&&"attribute"===m&&c.push({name:"text",text:b});1!==c.length||"choice"!==m&&"group"!==m&&"interleave"!==m?2<c.length&&("choice"===m||"group"===m||"interleave"===m)&&(c=k({name:m,e:c}).e):(m=c[0].name,n=c[0].names,g=c[0].a,b=c[0].text,c=c[0].e);"mixed"===m&&(m="interleave",c=[c[0],{name:"text"}]);"optional"===m&&(m="choice",c=[c[0],{name:"empty"}]);"zeroOrMore"===m&&(m="choice",c=
[{name:"oneOrMore",e:[c[0]]},{name:"empty"}]);if("define"===m&&g.combine){a:{q=g.combine;y=g.name;v=c;for(t=0;a&&t<a.length;t+=1)if(s=a[t],"define"===s.name&&s.a&&s.a.name===y){s.e=[{name:q,e:s.e.concat(v)}];a=s;break a}a=null}if(a)return null}a={name:m};c&&0<c.length&&(a.e=c);for(l in g)if(g.hasOwnProperty(l)){a.a=g;break}void 0!==b&&(a.text=b);n&&0<n.length&&(a.names=n);"element"===m&&(a.id=f.length,f.push(a),a={name:"elementref",id:a.id});return a};this.parseRelaxNGDOM=function(d,f){var a=[],c=
r(d&&d.documentElement,a,void 0),e,l,k={};for(e=0;e<c.e.length;e+=1)l=c.e[e],"define"===l.name?k[l.a.name]=l:"start"===l.name&&(b=l);if(!b)return[new g("No Relax NG start element was found.")];n(b,k);for(e in k)k.hasOwnProperty(e)&&n(k[e],k);for(e=0;e<a.length;e+=1)n(a[e],k);f&&(q.rootPattern=f(b.e[0],a));m(b,a);for(e=0;e<a.length;e+=1)m(a[e],a);q.start=b;q.elements=a;q.nsmap=h;return null}};
// Input 50
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(g,k){var e=this,n={},m,q,b;this.removeFromOdtDocument=function(){b.remove()};this.move=function(b,g){var d=0;0<b?d=q.movePointForward(b,g):0>=b&&(d=-q.movePointBackward(-b,g));e.handleUpdate();return d};this.handleUpdate=function(){};this.getStepCounter=function(){return q.getStepCounter()};this.getMemberId=function(){return g};this.getNode=function(){return b.getNode()};this.getAnchorNode=function(){return b.getAnchorNode()};this.getSelectedRange=function(){return b.getSelectedRange()};
this.setSelectedRange=function(h,g){b.setSelectedRange(h,g);e.handleUpdate()};this.hasForwardSelection=function(){return b.hasForwardSelection()};this.getOdtDocument=function(){return k};this.getSelectionType=function(){return m};this.setSelectionType=function(b){n.hasOwnProperty(b)?m=b:runtime.log("Invalid selection type: "+b)};this.resetSelectionType=function(){e.setSelectionType(ops.OdtCursor.RangeSelection)};b=new core.Cursor(k.getDOM(),g);q=new gui.SelectionMover(b,k.getRootNode());n[ops.OdtCursor.RangeSelection]=
!0;n[ops.OdtCursor.RegionSelection]=!0;e.resetSelectionType()};ops.OdtCursor.RangeSelection="Range";ops.OdtCursor.RegionSelection="Region";(function(){return ops.OdtCursor})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("gui.SelectionMover");runtime.loadClass("core.PositionFilterChain");runtime.loadClass("ops.StepsTranslator");runtime.loadClass("ops.TextPositionFilter");runtime.loadClass("ops.Member");
ops.OdtDocument=function(g){function k(){var a=g.odfContainer().getContentElement(),c=a&&a.localName;runtime.assert("text"===c,"Unsupported content element type '"+c+"' for OdtDocument");return a}function e(){return k().ownerDocument}function n(a){for(;a&&!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}function m(c){this.acceptPosition=function(b){b=b.container();var d;d="string"===typeof c?
a[c].getNode():c;return n(b)===n(d)?l:u}}function q(a){var c=gui.SelectionMover.createPositionIterator(k());a=w.convertStepsToDomPoint(a);c.setUnfilteredPosition(a.node,a.offset);return c}function b(a,c){return g.getFormatting().getStyleElement(a,c)}function h(a){return b(a,"paragraph")}var r=this,d,f,a={},c={},p=new core.EventNotifier([ops.OdtDocument.signalMemberAdded,ops.OdtDocument.signalMemberUpdated,ops.OdtDocument.signalMemberRemoved,ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,
ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonStyleCreated,ops.OdtDocument.signalCommonStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged,ops.OdtDocument.signalStepsInserted,ops.OdtDocument.signalStepsRemoved]),l=core.PositionFilter.FilterResult.FILTER_ACCEPT,u=core.PositionFilter.FilterResult.FILTER_REJECT,B,w,y;this.getDOM=
e;this.getRootElement=n;this.getIteratorAtPosition=q;this.convertDomPointToCursorStep=function(a,c,b){return w.convertDomPointToSteps(a,c,b)};this.convertDomToCursorRange=function(a,c){var b,d;b=c(a.anchorNode,a.anchorOffset);b=w.convertDomPointToSteps(a.anchorNode,a.anchorOffset,b);c||a.anchorNode!==a.focusNode||a.anchorOffset!==a.focusOffset?(d=c(a.focusNode,a.focusOffset),d=w.convertDomPointToSteps(a.focusNode,a.focusOffset,d)):d=b;return{position:b,length:d-b}};this.convertCursorToDomRange=function(a,
c){var b=e().createRange(),d,f;d=w.convertStepsToDomPoint(a);c?(f=w.convertStepsToDomPoint(a+c),0<c?(b.setStart(d.node,d.offset),b.setEnd(f.node,f.offset)):(b.setStart(f.node,f.offset),b.setEnd(d.node,d.offset))):b.setStart(d.node,d.offset);return b};this.getStyleElement=b;this.upgradeWhitespacesAtPosition=function(a){a=q(a);var c,b,f;a.previousPosition();a.previousPosition();for(f=-1;1>=f;f+=1){c=a.container();b=a.unfilteredDomOffset();if(c.nodeType===Node.TEXT_NODE&&" "===c.data[b]&&d.isSignificantWhitespace(c,
b)){runtime.assert(" "===c.data[b],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var e=c.ownerDocument.createElementNS(odf.Namespaces.textns,"text:s");e.appendChild(c.ownerDocument.createTextNode(" "));c.deleteData(b,1);0<b&&(c=c.splitText(b));c.parentNode.insertBefore(e,c);c=e;a.moveToEndOfNode(c)}a.nextPosition()}};this.downgradeWhitespacesAtPosition=function(a){var c=q(a),b;a=c.container();for(c=c.unfilteredDomOffset();!d.isCharacterElement(a)&&a.childNodes[c];)a=
a.childNodes[c],c=0;a.nodeType===Node.TEXT_NODE&&(a=a.parentNode);d.isDowngradableSpaceElement(a)&&(c=a.firstChild,b=a.lastChild,f.mergeIntoParent(a),b!==c&&f.normalizeTextNodes(b),f.normalizeTextNodes(c))};this.getParagraphStyleElement=h;this.getParagraphElement=function(a){return d.getParagraphElement(a)};this.getParagraphStyleAttributes=function(a){return(a=h(a))?g.getFormatting().getInheritedStyleAttributes(a):null};this.getTextNodeAtStep=function(c,b){var d=q(c),f=d.container(),h,g=0,l=null;
f.nodeType===Node.TEXT_NODE?(h=f,g=d.unfilteredDomOffset()):(h=e().createTextNode(""),g=0,f.insertBefore(h,d.rightNode()));if(b&&a[b]&&r.getCursorPosition(b)===c){for(l=a[b].getNode();l.nextSibling&&"cursor"===l.nextSibling.localName;)l.parentNode.insertBefore(l.nextSibling,l);0<h.length&&h.nextSibling!==l&&(h=e().createTextNode(""),g=0);l.parentNode.insertBefore(h,l)}for(;h.previousSibling&&h.previousSibling.nodeType===Node.TEXT_NODE;)h.previousSibling.appendData(h.data),g=h.previousSibling.length,
h=h.previousSibling,h.parentNode.removeChild(h.nextSibling);return{textNode:h,offset:g}};this.fixCursorPositions=function(){var c=new core.PositionFilterChain;c.addFilter("BaseFilter",B);Object.keys(a).forEach(function(b){var d=a[b],f=d.getStepCounter(),e,h,g=!1;c.addFilter("RootFilter",r.createRootFilter(b));b=f.countStepsToPosition(d.getAnchorNode(),0,c);f.isPositionWalkable(c)?0===b&&(g=!0,d.move(0)):(g=!0,e=f.countPositionsToNearestStep(d.getNode(),0,c),h=f.countPositionsToNearestStep(d.getAnchorNode(),
0,c),d.move(e),0!==b&&(0<h&&(b+=1),0<e&&(b-=1),f=f.countSteps(b,c),d.move(f),d.move(-f,!0)));g&&r.emit(ops.OdtDocument.signalCursorMoved,d);c.removeFilter("RootFilter")})};this.getDistanceFromCursor=function(c,b,d){c=a[c];var f,e;runtime.assert(null!==b&&void 0!==b,"OdtDocument.getDistanceFromCursor called without node");c&&(f=w.convertDomPointToSteps(c.getNode(),0),e=w.convertDomPointToSteps(b,d));return e-f};this.getCursorPosition=function(c){return(c=a[c])?w.convertDomPointToSteps(c.getNode(),
0):0};this.getCursorSelection=function(c){c=a[c];var b=0,d=0;c&&(b=w.convertDomPointToSteps(c.getNode(),0),d=w.convertDomPointToSteps(c.getAnchorNode(),0));return{position:d,length:b-d}};this.getPositionFilter=function(){return B};this.getOdfCanvas=function(){return g};this.getRootNode=k;this.addMember=function(a){runtime.assert(void 0===c[a.getMemberId()],"This member already exists");c[a.getMemberId()]=a};this.getMember=function(a){return c.hasOwnProperty(a)?c[a]:null};this.removeMember=function(a){delete c[a]};
this.getCursor=function(c){return a[c]};this.getCursors=function(){var c=[],b;for(b in a)a.hasOwnProperty(b)&&c.push(a[b]);return c};this.addCursor=function(c){runtime.assert(Boolean(c),"OdtDocument::addCursor without cursor");var b=c.getStepCounter().countSteps(1,B),d=c.getMemberId();runtime.assert("string"===typeof d,"OdtDocument::addCursor has cursor without memberid");runtime.assert(!a[d],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+d);c.move(b);a[d]=c};this.removeCursor=
function(c){var b=a[c];return b?(b.removeFromOdtDocument(),delete a[c],r.emit(ops.OdtDocument.signalCursorRemoved,c),!0):!1};this.getFormatting=function(){return g.getFormatting()};this.emit=function(a,c){p.emit(a,c)};this.subscribe=function(a,c){p.subscribe(a,c)};this.unsubscribe=function(a,c){p.unsubscribe(a,c)};this.createRootFilter=function(a){return new m(a)};this.close=function(a){a()};this.destroy=function(a){a()};B=new ops.TextPositionFilter(k);d=new odf.OdfUtils;f=new core.DomUtils;w=new ops.StepsTranslator(k,
gui.SelectionMover.createPositionIterator,B,500);p.subscribe(ops.OdtDocument.signalStepsInserted,w.handleStepsInserted);p.subscribe(ops.OdtDocument.signalStepsRemoved,w.handleStepsRemoved);p.subscribe(ops.OdtDocument.signalOperationExecuted,function(a){var c=a.spec(),b=c.memberid,c=(new Date(c.timestamp)).toISOString(),d=g.odfContainer().getMetadataManager();a.isEdit&&(b=r.getMember(b).getProperties().fullName,d.setMetadata({"dc:creator":b,"dc:date":c},null),y||(d.incrementEditingCycles(),d.setMetadata(null,
["meta:editing-duration","meta:document-statistic"])),y=a)})};ops.OdtDocument.signalMemberAdded="member/added";ops.OdtDocument.signalMemberUpdated="member/updated";ops.OdtDocument.signalMemberRemoved="member/removed";ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";
ops.OdtDocument.signalCommonStyleCreated="style/created";ops.OdtDocument.signalCommonStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";ops.OdtDocument.signalStepsInserted="steps/inserted";ops.OdtDocument.signalStepsRemoved="steps/removed";(function(){return ops.OdtDocument})();
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
ops.Operation=function(){};ops.Operation.prototype.init=function(g){};ops.Operation.prototype.execute=function(g){};ops.Operation.prototype.spec=function(){};
// Input 53
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function g(a){return function(){var c;return function(){void 0===c&&(c=a());return c}}()}function k(a,c){return function(){var b={},d=0;return function(f){var e=f.hash||f.toString();if(b.hasOwnProperty(e))return b[e];b[e]=f=c(f);f.hash=a+d.toString();d+=1;return f}}()}function e(a){return function(){var c={};return function(b){var d,f;if(c.hasOwnProperty(b.localName)){if(f=c[b.localName],d=f[b.namespaceURI],void 0!==d)return d}else c[b.localName]=f={};return f[b.namespaceURI]=
d=a(b)}}()}function n(a,c,b){return function(){var d={},f=0;return function(e,h){var g=c&&c(e,h),l;if(void 0!==g)return g;l=e.hash||e.toString();g=h.hash||h.toString();if(d.hasOwnProperty(l)){if(l=d[l],l.hasOwnProperty(g))return l[g]}else d[l]=l={};l[g]=g=b(e,h);g.hash=a+f.toString();f+=1;return g}}()}function m(a,c){"choice"===c.p1.type?m(a,c.p1):a[c.p1.hash]=c.p1;"choice"===c.p2.type?m(a,c.p2):a[c.p2.hash]=c.p2}function q(a,c){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return z},
startTagOpenDeriv:function(b){return a.contains(b)?p(c,x):z},attDeriv:function(){return z},startTagCloseDeriv:function(){return this}}}function b(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return x}}}function h(a,c,b,f){if(c===z)return z;if(f>=b.length)return c;0===f&&(f=0);for(var e=b.item(f);e.namespaceURI===d;){f+=1;if(f>=b.length)return c;e=b.item(f)}return e=h(a,c.attDeriv(a,b.item(f)),b,f+1)}function r(a,c,b){b.e[0].a?(a.push(b.e[0].text),c.push(b.e[0].a.ns)):r(a,c,b.e[0]);
b.e[1].a?(a.push(b.e[1].text),c.push(b.e[1].a.ns)):r(a,c,b.e[1])}var d="http://www.w3.org/2000/xmlns/",f,a,c,p,l,u,B,w,y,v,t,s,N,z={type:"notAllowed",nullable:!1,hash:"notAllowed",nc:void 0,p:void 0,p1:void 0,p2:void 0,textDeriv:function(){return z},startTagOpenDeriv:function(){return z},attDeriv:function(){return z},startTagCloseDeriv:function(){return z},endTagDeriv:function(){return z}},x={type:"empty",nullable:!0,hash:"empty",nc:void 0,p:void 0,p1:void 0,p2:void 0,textDeriv:function(){return z},
startTagOpenDeriv:function(){return z},attDeriv:function(){return z},startTagCloseDeriv:function(){return x},endTagDeriv:function(){return z}},R={type:"text",nullable:!0,hash:"text",nc:void 0,p:void 0,p1:void 0,p2:void 0,textDeriv:function(){return R},startTagOpenDeriv:function(){return z},attDeriv:function(){return z},startTagCloseDeriv:function(){return R},endTagDeriv:function(){return z}};f=n("choice",function(a,c){if(a===z)return c;if(c===z||a===c)return a},function(a,c){var b={},d;m(b,{p1:a,
p2:c});c=a=void 0;for(d in b)b.hasOwnProperty(d)&&(void 0===a?a=b[d]:c=void 0===c?b[d]:f(c,b[d]));return function(a,c){return{type:"choice",nullable:a.nullable||c.nullable,hash:void 0,nc:void 0,p:void 0,p1:a,p2:c,textDeriv:function(b,d){return f(a.textDeriv(b,d),c.textDeriv(b,d))},startTagOpenDeriv:e(function(b){return f(a.startTagOpenDeriv(b),c.startTagOpenDeriv(b))}),attDeriv:function(b,d){return f(a.attDeriv(b,d),c.attDeriv(b,d))},startTagCloseDeriv:g(function(){return f(a.startTagCloseDeriv(),
c.startTagCloseDeriv())}),endTagDeriv:g(function(){return f(a.endTagDeriv(),c.endTagDeriv())})}}(a,c)});a=function(a,c,b){return function(){var d={},f=0;return function(e,h){var g=c&&c(e,h),l,k;if(void 0!==g)return g;l=e.hash||e.toString();g=h.hash||h.toString();l<g&&(k=l,l=g,g=k,k=e,e=h,h=k);if(d.hasOwnProperty(l)){if(l=d[l],l.hasOwnProperty(g))return l[g]}else d[l]=l={};l[g]=g=b(e,h);g.hash=a+f.toString();f+=1;return g}}()}("interleave",function(a,c){if(a===z||c===z)return z;if(a===x)return c;if(c===
x)return a},function(c,b){return{type:"interleave",nullable:c.nullable&&b.nullable,hash:void 0,p1:c,p2:b,textDeriv:function(d,e){return f(a(c.textDeriv(d,e),b),a(c,b.textDeriv(d,e)))},startTagOpenDeriv:e(function(d){return f(t(function(c){return a(c,b)},c.startTagOpenDeriv(d)),t(function(b){return a(c,b)},b.startTagOpenDeriv(d)))}),attDeriv:function(d,e){return f(a(c.attDeriv(d,e),b),a(c,b.attDeriv(d,e)))},startTagCloseDeriv:g(function(){return a(c.startTagCloseDeriv(),b.startTagCloseDeriv())}),endTagDeriv:void 0}});
c=n("group",function(a,c){if(a===z||c===z)return z;if(a===x)return c;if(c===x)return a},function(a,b){return{type:"group",p1:a,p2:b,nullable:a.nullable&&b.nullable,textDeriv:function(d,e){var h=c(a.textDeriv(d,e),b);return a.nullable?f(h,b.textDeriv(d,e)):h},startTagOpenDeriv:function(d){var e=t(function(a){return c(a,b)},a.startTagOpenDeriv(d));return a.nullable?f(e,b.startTagOpenDeriv(d)):e},attDeriv:function(d,e){return f(c(a.attDeriv(d,e),b),c(a,b.attDeriv(d,e)))},startTagCloseDeriv:g(function(){return c(a.startTagCloseDeriv(),
b.startTagCloseDeriv())})}});p=n("after",function(a,c){if(a===z||c===z)return z},function(a,c){return{type:"after",p1:a,p2:c,nullable:!1,textDeriv:function(b,d){return p(a.textDeriv(b,d),c)},startTagOpenDeriv:e(function(b){return t(function(a){return p(a,c)},a.startTagOpenDeriv(b))}),attDeriv:function(b,d){return p(a.attDeriv(b,d),c)},startTagCloseDeriv:g(function(){return p(a.startTagCloseDeriv(),c)}),endTagDeriv:g(function(){return a.nullable?c:z})}});l=k("oneormore",function(a){return a===z?z:
{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(b,d){return c(a.textDeriv(b,d),f(this,x))},startTagOpenDeriv:function(b){var d=this;return t(function(a){return c(a,f(d,x))},a.startTagOpenDeriv(b))},attDeriv:function(b,d){return c(a.attDeriv(b,d),f(this,x))},startTagCloseDeriv:g(function(){return l(a.startTagCloseDeriv())})}});B=n("attribute",void 0,function(a,c){return{type:"attribute",nullable:!1,hash:void 0,nc:a,p:c,p1:void 0,p2:void 0,textDeriv:void 0,startTagOpenDeriv:void 0,attDeriv:function(b,
d){return a.contains(d)&&(c.nullable&&/^\s+$/.test(d.nodeValue)||c.textDeriv(b,d.nodeValue).nullable)?x:z},startTagCloseDeriv:function(){return z},endTagDeriv:void 0}});u=k("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(c,b){return b===a?x:z},attDeriv:function(){return z},startTagCloseDeriv:function(){return this}}});y=k("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return x},attDeriv:function(){return z},startTagCloseDeriv:function(){return this}}});
t=function U(a,c){return"after"===c.type?p(c.p1,a(c.p2)):"choice"===c.type?f(U(a,c.p1),U(a,c.p2)):c};s=function(a,c,b){var d=b.currentNode;c=c.startTagOpenDeriv(d);c=h(a,c,d.attributes,0);var e=c=c.startTagCloseDeriv(),d=b.currentNode;c=b.firstChild();for(var g=[],l;c;)c.nodeType===Node.ELEMENT_NODE?g.push(c):c.nodeType!==Node.TEXT_NODE||/^\s*$/.test(c.nodeValue)||g.push(c.nodeValue),c=b.nextSibling();0===g.length&&(g=[""]);l=e;for(e=0;l!==z&&e<g.length;e+=1)c=g[e],"string"===typeof c?l=/^\s*$/.test(c)?
f(l,l.textDeriv(a,c)):l.textDeriv(a,c):(b.currentNode=c,l=s(a,l,b));b.currentNode=d;return c=l.endTagDeriv()};w=function(a){var c,b,d;if("name"===a.name)c=a.text,b=a.a.ns,a={name:c,ns:b,hash:"{"+b+"}"+c,contains:function(a){return a.namespaceURI===b&&a.localName===c}};else if("choice"===a.name){c=[];b=[];r(c,b,a);a="";for(d=0;d<c.length;d+=1)a+="{"+b[d]+"}"+c[d]+",";a={hash:a,contains:function(a){var d;for(d=0;d<c.length;d+=1)if(c[d]===a.localName&&b[d]===a.namespaceURI)return!0;return!1}}}else a=
{hash:"anyName",contains:function(){return!0}};return a};v=function P(d,e){var h,g;if("elementref"===d.name){h=d.id||0;d=e[h];if(void 0!==d.name){var k=d;h=e[k.id]={hash:"element"+k.id.toString()};k=q(w(k.e[0]),v(k.e[1],e));for(g in k)k.hasOwnProperty(g)&&(h[g]=k[g]);return h}return d}switch(d.name){case "empty":return x;case "notAllowed":return z;case "text":return R;case "choice":return f(P(d.e[0],e),P(d.e[1],e));case "interleave":h=P(d.e[0],e);for(g=1;g<d.e.length;g+=1)h=a(h,P(d.e[g],e));return h;
case "group":return c(P(d.e[0],e),P(d.e[1],e));case "oneOrMore":return l(P(d.e[0],e));case "attribute":return B(w(d.e[0]),P(d.e[1],e));case "value":return u(d.text);case "data":return h=d.a&&d.a.type,void 0===h&&(h=""),y(h);case "list":return b()}throw"No support for "+d.name;};this.makePattern=function(a,c){var b={},d;for(d in c)c.hasOwnProperty(d)&&(b[d]=c[d]);return d=v(a,b)};this.validate=function(a,c){var b;a.currentNode=a.root;b=s(null,N,a);b.nullable?c(null):(runtime.log("Error in Relax NG validation: "+
b),c(["Error in Relax NG validation: "+b]))};this.init=function(a){N=a}};
// Input 54
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function g(b,e){this.message=function(){e&&(b+=e.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",b+=e.nodeName,e.nodeValue&&(b+=" with value '"+e.nodeValue+"'"),b+=".");return b}}function k(b,e,g,d){return"empty"===b.name?null:m(b,e,g,d)}function e(b,e){if(2!==b.e.length)throw"Element with wrong # of elements: "+b.e.length;for(var m=e.currentNode,d=m?m.nodeType:0,f=null;d>Node.ELEMENT_NODE;){if(d!==Node.COMMENT_NODE&&(d!==Node.TEXT_NODE||!/^\s+$/.test(e.currentNode.nodeValue)))return[new g("Not allowed node of type "+
d+".")];d=(m=e.nextSibling())?m.nodeType:0}if(!m)return[new g("Missing element "+b.names)];if(b.names&&-1===b.names.indexOf(q[m.namespaceURI]+":"+m.localName))return[new g("Found "+m.nodeName+" instead of "+b.names+".",m)];if(e.firstChild()){for(f=k(b.e[1],e,m);e.nextSibling();)if(d=e.currentNode.nodeType,!(e.currentNode&&e.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(e.currentNode.nodeValue)||d===Node.COMMENT_NODE))return[new g("Spurious content.",e.currentNode)];if(e.parentNode()!==m)return[new g("Implementation error.")]}else f=
k(b.e[1],e,m);e.nextSibling();return f}var n,m,q;m=function(b,h,n,d){var f=b.name,a=null;if("text"===f)a:{for(var c=(b=h.currentNode)?b.nodeType:0;b!==n&&3!==c;){if(1===c){a=[new g("Element not allowed here.",b)];break a}c=(b=h.nextSibling())?b.nodeType:0}h.nextSibling();a=null}else if("data"===f)a=null;else if("value"===f)d!==b.text&&(a=[new g("Wrong value, should be '"+b.text+"', not '"+d+"'",n)]);else if("list"===f)a=null;else if("attribute"===f)a:{if(2!==b.e.length)throw"Attribute with wrong # of elements: "+
b.e.length;f=b.localnames.length;for(a=0;a<f;a+=1){d=n.getAttributeNS(b.namespaces[a],b.localnames[a]);""!==d||n.hasAttributeNS(b.namespaces[a],b.localnames[a])||(d=void 0);if(void 0!==c&&void 0!==d){a=[new g("Attribute defined too often.",n)];break a}c=d}a=void 0===c?[new g("Attribute not found: "+b.names,n)]:k(b.e[1],h,n,c)}else if("element"===f)a=e(b,h);else if("oneOrMore"===f){d=0;do c=h.currentNode,f=m(b.e[0],h,n),d+=1;while(!f&&c!==h.currentNode);1<d?(h.currentNode=c,a=null):a=f}else if("choice"===
f){if(2!==b.e.length)throw"Choice with wrong # of options: "+b.e.length;c=h.currentNode;if("empty"===b.e[0].name){if(f=m(b.e[1],h,n,d))h.currentNode=c;a=null}else{if(f=k(b.e[0],h,n,d))h.currentNode=c,f=m(b.e[1],h,n,d);a=f}}else if("group"===f){if(2!==b.e.length)throw"Group with wrong # of members: "+b.e.length;a=m(b.e[0],h,n)||m(b.e[1],h,n)}else if("interleave"===f)a:{c=b.e.length;d=[c];for(var p=c,l,q,B,w;0<p;){l=0;q=h.currentNode;for(a=0;a<c;a+=1)B=h.currentNode,!0!==d[a]&&d[a]!==B&&(w=b.e[a],(f=
m(w,h,n))?(h.currentNode=B,void 0===d[a]&&(d[a]=!1)):B===h.currentNode||"oneOrMore"===w.name||"choice"===w.name&&("oneOrMore"===w.e[0].name||"oneOrMore"===w.e[1].name)?(l+=1,d[a]=B):(l+=1,d[a]=!0));if(q===h.currentNode&&l===p){a=null;break a}if(0===l){for(a=0;a<c;a+=1)if(!1===d[a]){a=[new g("Interleave does not match.",n)];break a}a=null;break a}for(a=p=0;a<c;a+=1)!0!==d[a]&&(p+=1)}a=null}else throw f+" not allowed in nonEmptyPattern.";return a};this.validate=function(b,e){b.currentNode=b.root;var g=
k(n.e[0],b,b.root);e(g)};this.init=function(b,e){n=b;q=e}};
// Input 55
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(g,k,e){function n(d){f&&r.parentNode&&(!a||d)&&(d&&void 0!==c&&runtime.clearTimeout(c),a=!0,b.style.opacity=d||"0"===b.style.opacity?"1":"0",c=runtime.setTimeout(function(){a=!1;n(!1)},500))}function m(a,c){var b=a.getBoundingClientRect(),d=0,f=0;b&&c&&(d=Math.max(b.top,c.top),f=Math.min(b.bottom,c.bottom));return f-d}function q(){var a;a=g.getSelectedRange().cloneRange();var c=g.getNode(),f,e=null;c.previousSibling&&(f=c.previousSibling.nodeType===Node.TEXT_NODE?c.previousSibling.textContent.length:
c.previousSibling.childNodes.length,a.setStart(c.previousSibling,0<f?f-1:0),a.setEnd(c.previousSibling,f),(f=a.getBoundingClientRect())&&f.height&&(e=f));c.nextSibling&&(a.setStart(c.nextSibling,0),a.setEnd(c.nextSibling,0<(c.nextSibling.nodeType===Node.TEXT_NODE?c.nextSibling.textContent.length:c.nextSibling.childNodes.length)?1:0),(f=a.getBoundingClientRect())&&f.height&&(!e||m(c,f)>m(c,e))&&(e=f));a=e;c=g.getOdtDocument().getOdfCanvas().getZoomLevel();d&&g.getSelectionType()===ops.OdtCursor.RangeSelection?
b.style.visibility="visible":b.style.visibility="hidden";a?(b.style.top="0",e=p.getBoundingClientRect(b),8>a.height&&(a={top:a.top-(8-a.height)/2,height:8}),b.style.height=p.adaptRangeDifferenceToZoomLevel(a.height,c)+"px",b.style.top=p.adaptRangeDifferenceToZoomLevel(a.top-e.top,c)+"px"):(b.style.height="1em",b.style.top="5%")}var b,h,r,d=!0,f=!1,a=!1,c,p=new core.DomUtils;this.handleUpdate=q;this.refreshCursorBlinking=function(){e||g.getSelectedRange().collapsed?(f=!0,n(!0)):(f=!1,b.style.opacity=
"0")};this.setFocus=function(){f=!0;h.markAsFocussed(!0);n(!0)};this.removeFocus=function(){f=!1;h.markAsFocussed(!1);b.style.opacity="1"};this.show=function(){d=!0;q();h.markAsFocussed(!0)};this.hide=function(){d=!1;q();h.markAsFocussed(!1)};this.setAvatarImageUrl=function(a){h.setImageUrl(a)};this.setColor=function(a){b.style.borderColor=a;h.setColor(a)};this.getCursor=function(){return g};this.getFocusElement=function(){return b};this.toggleHandleVisibility=function(){h.isVisible()?h.hide():h.show()};
this.showHandle=function(){h.show()};this.hideHandle=function(){h.hide()};this.ensureVisible=function(){var a,c,d,f,e=g.getOdtDocument().getOdfCanvas().getElement().parentNode,h;d=e.offsetWidth-e.clientWidth+5;f=e.offsetHeight-e.clientHeight+5;h=b.getBoundingClientRect();a=h.left-d;c=h.top-f;d=h.right+d;f=h.bottom+f;h=e.getBoundingClientRect();c<h.top?e.scrollTop-=h.top-c:f>h.bottom&&(e.scrollTop+=f-h.bottom);a<h.left?e.scrollLeft-=h.left-a:d>h.right&&(e.scrollLeft+=d-h.right);q()};this.destroy=function(a){h.destroy(function(c){c?
a(c):(r.removeChild(b),a())})};(function(){var a=g.getOdtDocument().getDOM();b=a.createElementNS(a.documentElement.namespaceURI,"span");b.style.top="5%";r=g.getNode();r.appendChild(b);h=new gui.Avatar(r,k);q()})()};
// Input 56
gui.EventManager=function(g){function k(){var b=this,a=[];this.handlers=[];this.isSubscribed=!1;this.handleEvent=function(c){-1===a.indexOf(c)&&(a.push(c),b.handlers.forEach(function(a){a(c)}),runtime.setTimeout(function(){a.splice(a.indexOf(c),1)},0))}}function e(b){var a=b.scrollX,c=b.scrollY;this.restore=function(){b.scrollX===a&&b.scrollY===c||b.scrollTo(a,c)}}function n(b){var a=b.scrollTop,c=b.scrollLeft;this.restore=function(){if(b.scrollTop!==a||b.scrollLeft!==c)b.scrollTop=a,b.scrollLeft=
c}}function m(b,a,c){var d="on"+a,e=!1;b.attachEvent&&(e=b.attachEvent(d,c));!e&&b.addEventListener&&(b.addEventListener(a,c,!1),e=!0);e&&!r[a]||!b.hasOwnProperty(d)||(b[d]=c)}function q(){return g.getDOM().activeElement===b}var b=g.getOdfCanvas().getElement(),h=runtime.getWindow(),r={beforecut:!0,beforepaste:!0},d;this.subscribe=function(f,a){var c=h&&d[f];c?(c.handlers.push(a),c.isSubscribed||(c.isSubscribed=!0,m(h,f,c.handleEvent),m(b,f,c.handleEvent))):m(b,f,a)};this.unsubscribe=function(f,a){var c=
h&&d[f],e=c&&c.handlers.indexOf(a);c?-1!==e&&c.handlers.splice(e,1):(c=b,e="on"+f,c.detachEvent&&c.detachEvent(e,a),c.removeEventListener&&c.removeEventListener(f,a,!1),c[e]===a&&(c[e]=null))};this.hasFocus=q;this.focus=function(){var d;if(!q()){for(d=b;d&&!d.scrollTop&&!d.scrollLeft;)d=d.parentNode;d=d?new n(d):h?new e(h):null;b.focus();d&&d.restore()}};d={mousedown:new k,mouseup:new k}};
// Input 57
runtime.loadClass("gui.SelectionMover");gui.ShadowCursor=function(g){var k=g.getDOM().createRange(),e=!0;this.removeFromOdtDocument=function(){};this.getMemberId=function(){return gui.ShadowCursor.ShadowCursorMemberId};this.getSelectedRange=function(){return k};this.setSelectedRange=function(g,m){k=g;e=!1!==m};this.hasForwardSelection=function(){return e};this.getOdtDocument=function(){return g};this.getSelectionType=function(){return ops.OdtCursor.RangeSelection};k.setStart(g.getRootNode(),0)};
gui.ShadowCursor.ShadowCursorMemberId="";(function(){return gui.ShadowCursor})();
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
gui.UndoManager=function(){};gui.UndoManager.prototype.subscribe=function(g,k){};gui.UndoManager.prototype.unsubscribe=function(g,k){};gui.UndoManager.prototype.setOdtDocument=function(g){};gui.UndoManager.prototype.saveInitialState=function(){};gui.UndoManager.prototype.resetInitialState=function(){};gui.UndoManager.prototype.setPlaybackFunction=function(g){};gui.UndoManager.prototype.hasUndoStates=function(){};gui.UndoManager.prototype.hasRedoStates=function(){};
gui.UndoManager.prototype.moveForward=function(g){};gui.UndoManager.prototype.moveBackward=function(g){};gui.UndoManager.prototype.onOperationExecuted=function(g){};gui.UndoManager.signalUndoStackChanged="undoStackChanged";gui.UndoManager.signalUndoStateCreated="undoStateCreated";gui.UndoManager.signalUndoStateModified="undoStateModified";(function(){return gui.UndoManager})();
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
gui.UndoStateRules=function(){function g(e){return e.spec().optype}function k(e){return e.isEdit}this.getOpType=g;this.isEditOperation=k;this.isPartOfOperationSet=function(e,n){if(e.isEdit){if(0===n.length)return!0;var m;if(m=n[n.length-1].isEdit)a:{m=n.filter(k);var q=g(e),b;b:switch(q){case "RemoveText":case "InsertText":b=!0;break b;default:b=!1}if(b&&q===g(m[0])){if(1===m.length){m=!0;break a}q=m[m.length-2].spec().position;m=m[m.length-1].spec().position;b=e.spec().position;if(m===b-(m-q)){m=
!0;break a}}m=!1}return m}return!0}};
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
ops.EditInfo=function(g,k){function e(){var e=[],b;for(b in m)m.hasOwnProperty(b)&&e.push({memberid:b,time:m[b].time});e.sort(function(b,e){return b.time-e.time});return e}var n,m={};this.getNode=function(){return n};this.getOdtDocument=function(){return k};this.getEdits=function(){return m};this.getSortedEdits=function(){return e()};this.addEdit=function(e,b){m[e]={time:b}};this.clearEdits=function(){m={}};this.destroy=function(e){g.parentNode&&g.removeChild(n);e()};n=k.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");g.insertBefore(n,g.firstChild)};
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
runtime.loadClass("core.DomUtils");
ops.OpAddAnnotation=function(){function g(b,e,d){var f=b.getTextNodeAtStep(d,k);f&&(b=f.textNode,d=b.parentNode,f.offset!==b.length&&b.splitText(f.offset),d.insertBefore(e,b.nextSibling),0===b.length&&d.removeChild(b))}var k,e,n,m,q,b;this.init=function(b){k=b.memberid;e=parseInt(b.timestamp,10);n=parseInt(b.position,10);m=parseInt(b.length,10)||0;q=b.name};this.isEdit=!0;this.execute=function(h){var r={},d=h.getCursor(k),f,a;a=new core.DomUtils;b=h.getDOM();var c=new Date(e),p,l,u,B;f=b.createElementNS(odf.Namespaces.officens,
"office:annotation");f.setAttributeNS(odf.Namespaces.officens,"office:name",q);p=b.createElementNS(odf.Namespaces.dcns,"dc:creator");p.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",k);p.textContent=h.getMember(k).getProperties().fullName;l=b.createElementNS(odf.Namespaces.dcns,"dc:date");l.appendChild(b.createTextNode(c.toISOString()));c=b.createElementNS(odf.Namespaces.textns,"text:list");u=b.createElementNS(odf.Namespaces.textns,"text:list-item");B=b.createElementNS(odf.Namespaces.textns,
"text:p");u.appendChild(B);c.appendChild(u);f.appendChild(p);f.appendChild(l);f.appendChild(c);r.node=f;if(!r.node)return!1;if(m){f=b.createElementNS(odf.Namespaces.officens,"office:annotation-end");f.setAttributeNS(odf.Namespaces.officens,"office:name",q);r.end=f;if(!r.end)return!1;g(h,r.end,n+m)}g(h,r.node,n);h.emit(ops.OdtDocument.signalStepsInserted,{position:n,length:m});d&&(f=b.createRange(),a=a.getElementsByTagNameNS(r.node,odf.Namespaces.textns,"p")[0],f.selectNodeContents(a),d.setSelectedRange(f),
h.emit(ops.OdtDocument.signalCursorMoved,d));h.getOdfCanvas().addAnnotation(r);h.fixCursorPositions();return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:k,timestamp:e,position:n,length:m,name:q}}};
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
ops.OpAddCursor=function(){var g,k;this.init=function(e){g=e.memberid;k=e.timestamp};this.isEdit=!1;this.execute=function(e){var k=e.getCursor(g);if(k)return!1;k=new ops.OdtCursor(g,e);e.addCursor(k);e.emit(ops.OdtDocument.signalCursorAdded,k);return!0};this.spec=function(){return{optype:"AddCursor",memberid:g,timestamp:k}}};
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
runtime.loadClass("ops.Member");ops.OpAddMember=function(){var g,k,e;this.init=function(n){g=n.memberid;k=parseInt(n.timestamp,10);e=n.setProperties};this.isEdit=!1;this.execute=function(k){if(k.getMember(g))return!1;var m=new ops.Member(g,e);k.addMember(m);k.emit(ops.OdtDocument.signalMemberAdded,m);return!0};this.spec=function(){return{optype:"AddMember",memberid:g,timestamp:k,setProperties:e}}};
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
ops.OpAddStyle=function(){var g,k,e,n,m,q,b=odf.Namespaces.stylens;this.init=function(b){g=b.memberid;k=b.timestamp;e=b.styleName;n=b.styleFamily;m="true"===b.isAutomaticStyle||!0===b.isAutomaticStyle;q=b.setProperties};this.isEdit=!0;this.execute=function(g){var k=g.getOdfCanvas().odfContainer(),d=g.getFormatting(),f=g.getDOM().createElementNS(b,"style:style");if(!f)return!1;q&&d.updateStyle(f,q);f.setAttributeNS(b,"style:family",n);f.setAttributeNS(b,"style:name",e);m?k.rootElement.automaticStyles.appendChild(f):
k.rootElement.styles.appendChild(f);g.getOdfCanvas().refreshCSS();m||g.emit(ops.OdtDocument.signalCommonStyleCreated,{name:e,family:n});return!0};this.spec=function(){return{optype:"AddStyle",memberid:g,timestamp:k,styleName:e,styleFamily:n,isAutomaticStyle:m,setProperties:q}}};
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
ops.OpApplyDirectStyling=function(){function g(b){var e=0<=m?n+m:n,d=b.getIteratorAtPosition(0<=m?n:n+m),e=m?b.getIteratorAtPosition(e):d;b=b.getDOM().createRange();b.setStart(d.container(),d.unfilteredDomOffset());b.setEnd(e.container(),e.unfilteredDomOffset());return b}var k,e,n,m,q,b=new odf.OdfUtils;this.init=function(b){k=b.memberid;e=b.timestamp;n=parseInt(b.position,10);m=parseInt(b.length,10);q=b.setProperties};this.isEdit=!0;this.execute=function(h){var m=g(h),d=b.getImpactedParagraphs(m);
(new gui.StyleHelper(h.getFormatting())).applyStyle(k,m,q);m.detach();h.getOdfCanvas().refreshCSS();h.fixCursorPositions();d.forEach(function(b){h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:b,memberId:k,timeStamp:e})});h.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:k,timestamp:e,position:n,length:m,setProperties:q}}};
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
ops.OpInsertImage=function(){var g,k,e,n,m,q,b,h,r=odf.Namespaces.drawns,d=odf.Namespaces.svgns,f=odf.Namespaces.textns,a=odf.Namespaces.xlinkns;this.init=function(a){g=a.memberid;k=a.timestamp;e=a.position;n=a.filename;m=a.frameWidth;q=a.frameHeight;b=a.frameStyleName;h=a.frameName};this.isEdit=!0;this.execute=function(c){var p=c.getOdfCanvas(),l=c.getTextNodeAtStep(e,g),u,B;if(!l)return!1;u=l.textNode;B=c.getParagraphElement(u);var l=l.offset!==u.length?u.splitText(l.offset):u.nextSibling,w=c.getDOM(),
y=w.createElementNS(r,"draw:image"),w=w.createElementNS(r,"draw:frame");y.setAttributeNS(a,"xlink:href",n);y.setAttributeNS(a,"xlink:type","simple");y.setAttributeNS(a,"xlink:show","embed");y.setAttributeNS(a,"xlink:actuate","onLoad");w.setAttributeNS(r,"draw:style-name",b);w.setAttributeNS(r,"draw:name",h);w.setAttributeNS(f,"text:anchor-type","as-char");w.setAttributeNS(d,"svg:width",m);w.setAttributeNS(d,"svg:height",q);w.appendChild(y);u.parentNode.insertBefore(w,l);c.emit(ops.OdtDocument.signalStepsInserted,
{position:e,length:1});0===u.length&&u.parentNode.removeChild(u);p.addCssForFrameWithImage(w);p.refreshCSS();c.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:B,memberId:g,timeStamp:k});p.rerenderAnnotations();return!0};this.spec=function(){return{optype:"InsertImage",memberid:g,timestamp:k,filename:n,position:e,frameWidth:m,frameHeight:q,frameStyleName:b,frameName:h}}};
// Input 67
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
ops.OpInsertTable=function(){function g(b,a){var c;if(1===d.length)c=d[0];else if(3===d.length)switch(b){case 0:c=d[0];break;case n-1:c=d[2];break;default:c=d[1]}else c=d[b];if(1===c.length)return c[0];if(3===c.length)switch(a){case 0:return c[0];case m-1:return c[2];default:return c[1]}return c[a]}var k,e,n,m,q,b,h,r,d;this.init=function(f){k=f.memberid;e=f.timestamp;q=f.position;n=f.initialRows;m=f.initialColumns;b=f.tableName;h=f.tableStyleName;r=f.tableColumnStyleName;d=f.tableCellStyleMatrix};
this.isEdit=!0;this.execute=function(d){var a=d.getTextNodeAtStep(q),c=d.getRootNode();if(a){var p=d.getDOM(),l=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),u=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),B,w,y,v;h&&l.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",h);b&&l.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",b);u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:number-columns-repeated",m);r&&u.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",r);l.appendChild(u);for(y=0;y<n;y+=1){u=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(v=0;v<m;v+=1)B=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(w=g(y,v))&&B.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",w),w=p.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"text:p"),B.appendChild(w),u.appendChild(B);l.appendChild(u)}a=d.getParagraphElement(a.textNode);c.insertBefore(l,a.nextSibling);d.emit(ops.OdtDocument.signalStepsInserted,{position:q,length:m*n+1});d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalTableAdded,{tableElement:l,memberId:k,timeStamp:e});d.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:k,timestamp:e,position:q,initialRows:n,initialColumns:m,tableName:b,tableStyleName:h,
tableColumnStyleName:r,tableCellStyleMatrix:d}}};
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
ops.OpInsertText=function(){var g,k,e,n;this.init=function(m){g=m.memberid;k=m.timestamp;e=m.position;n=m.text};this.isEdit=!0;this.execute=function(m){var q,b,h,r=null,d=m.getDOM(),f,a=0,c,p;m.upgradeWhitespacesAtPosition(e);if(q=m.getTextNodeAtStep(e,g)){b=q.textNode;r=b.nextSibling;h=b.parentNode;f=m.getParagraphElement(b);for(p=0;p<n.length;p+=1)if(" "===n[p]&&(0===p||p===n.length-1||" "===n[p-1])||"\t"===n[p])0===a?(q.offset!==b.length&&(r=b.splitText(q.offset)),0<p&&b.appendData(n.substring(0,
p))):a<p&&(a=n.substring(a,p),h.insertBefore(d.createTextNode(a),r)),a=p+1,c=" "===n[p]?"text:s":"text:tab",c=d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",c),c.appendChild(d.createTextNode(n[p])),h.insertBefore(c,r);0===a?b.insertData(q.offset,n):a<n.length&&(q=n.substring(a),h.insertBefore(d.createTextNode(q),r));h=b.parentNode;r=b.nextSibling;h.removeChild(b);h.insertBefore(b,r);0===b.length&&b.parentNode.removeChild(b);m.emit(ops.OdtDocument.signalStepsInserted,{position:e,
length:n.length});0<e&&(1<e&&m.downgradeWhitespacesAtPosition(e-2),m.downgradeWhitespacesAtPosition(e-1));m.downgradeWhitespacesAtPosition(e);m.downgradeWhitespacesAtPosition(e+n.length-1);m.downgradeWhitespacesAtPosition(e+n.length);m.getOdfCanvas().refreshSize();m.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f,memberId:g,timeStamp:k});m.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:g,timestamp:k,position:e,text:n}}};
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
ops.OpMoveCursor=function(){var g,k,e,n,m;this.init=function(q){g=q.memberid;k=q.timestamp;e=q.position;n=q.length||0;m=q.selectionType||ops.OdtCursor.RangeSelection};this.isEdit=!1;this.execute=function(k){var b=k.getCursor(g),h;if(!b)return!1;h=k.convertCursorToDomRange(e,n);b.setSelectedRange(h,0<=n);b.setSelectionType(m);k.emit(ops.OdtDocument.signalCursorMoved,b);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:g,timestamp:k,position:e,length:n,selectionType:m}}};
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
ops.OpRemoveAnnotation=function(){var g,k,e,n,m;this.init=function(q){g=q.memberid;k=q.timestamp;e=parseInt(q.position,10);n=parseInt(q.length,10);m=new core.DomUtils};this.isEdit=!0;this.execute=function(g){for(var b=g.getIteratorAtPosition(e).container(),h,k,d;b.namespaceURI!==odf.Namespaces.officens||"annotation"!==b.localName;)b=b.parentNode;if(null===b)return!1;(h=b.getAttributeNS(odf.Namespaces.officens,"name"))&&(k=m.getElementsByTagNameNS(g.getRootNode(),odf.Namespaces.officens,"annotation-end").filter(function(b){return h===
b.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);g.getOdfCanvas().forgetAnnotations();for(d=m.getElementsByTagNameNS(b,"urn:webodf:names:cursor","cursor");d.length;)b.parentNode.insertBefore(d.pop(),b);b.parentNode.removeChild(b);k&&k.parentNode.removeChild(k);g.emit(ops.OdtDocument.signalStepsRemoved,{position:0<e?e-1:e,length:n});g.fixCursorPositions();g.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:g,timestamp:k,position:e,
length:n}}};
// Input 71
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
ops.OpRemoveBlob=function(){var g,k,e;this.init=function(n){g=n.memberid;k=n.timestamp;e=n.filename};this.isEdit=!0;this.execute=function(g){g.getOdfCanvas().odfContainer().removeBlob(e);return!0};this.spec=function(){return{optype:"RemoveBlob",memberid:g,timestamp:k,filename:e}}};
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
ops.OpRemoveCursor=function(){var g,k;this.init=function(e){g=e.memberid;k=e.timestamp};this.isEdit=!1;this.execute=function(e){return e.removeCursor(g)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:g,timestamp:k}}};
// Input 73
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
runtime.loadClass("ops.Member");ops.OpRemoveMember=function(){var g,k;this.init=function(e){g=e.memberid;k=parseInt(e.timestamp,10)};this.isEdit=!1;this.execute=function(e){if(!e.getMember(g))return!1;e.removeMember(g);e.emit(ops.OdtDocument.signalMemberRemoved,g);return!0};this.spec=function(){return{optype:"RemoveMember",memberid:g,timestamp:k}}};
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
ops.OpRemoveStyle=function(){var g,k,e,n;this.init=function(m){g=m.memberid;k=m.timestamp;e=m.styleName;n=m.styleFamily};this.isEdit=!0;this.execute=function(g){var k=g.getStyleElement(e,n);if(!k)return!1;k.parentNode.removeChild(k);g.getOdfCanvas().refreshCSS();g.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:e,family:n});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:g,timestamp:k,styleName:e,styleFamily:n}}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("core.DomUtils");
ops.OpRemoveText=function(){function g(e){function d(a){return h.hasOwnProperty(a.namespaceURI)||"br"===a.localName&&q.isLineBreak(a.parentNode)||a.nodeType===Node.TEXT_NODE&&h.hasOwnProperty(a.parentNode.namespaceURI)}function f(a){if(q.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(h.hasOwnProperty(a.namespaceURI)||!f(a))return!1;a=a.nextSibling}return!0}function a(c){var g;c.nodeType===Node.TEXT_NODE?(g=c.parentNode,g.removeChild(c)):
g=b.removeUnwantedNodes(c,d);return!q.isParagraph(g)&&g!==e&&f(g)?a(g):g}this.isEmpty=f;this.mergeChildrenIntoParent=a}var k,e,n,m,q,b,h={};this.init=function(g){runtime.assert(0<=g.length,"OpRemoveText only supports positive lengths");k=g.memberid;e=g.timestamp;n=parseInt(g.position,10);m=parseInt(g.length,10);q=new odf.OdfUtils;b=new core.DomUtils;h[odf.Namespaces.dbns]=!0;h[odf.Namespaces.dcns]=!0;h[odf.Namespaces.dr3dns]=!0;h[odf.Namespaces.drawns]=!0;h[odf.Namespaces.chartns]=!0;h[odf.Namespaces.formns]=
!0;h[odf.Namespaces.numberns]=!0;h[odf.Namespaces.officens]=!0;h[odf.Namespaces.presentationns]=!0;h[odf.Namespaces.stylens]=!0;h[odf.Namespaces.svgns]=!0;h[odf.Namespaces.tablens]=!0;h[odf.Namespaces.textns]=!0};this.isEdit=!0;this.execute=function(h){var d,f,a,c,p=h.getCursor(k),l=new g(h.getRootNode());h.upgradeWhitespacesAtPosition(n);h.upgradeWhitespacesAtPosition(n+m);f=h.convertCursorToDomRange(n,m);b.splitBoundaries(f);d=h.getParagraphElement(f.startContainer);a=q.getTextElements(f,!1,!0);
c=q.getParagraphElements(f);f.detach();a.forEach(function(a){l.mergeChildrenIntoParent(a)});f=c.reduce(function(a,c){var b,d=!1,f=a,e=c,g,h=null;l.isEmpty(a)&&(d=!0,c.parentNode!==a.parentNode&&(g=c.parentNode,a.parentNode.insertBefore(c,a.nextSibling)),e=a,f=c,h=f.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||f.firstChild);for(;e.hasChildNodes();)b=d?e.lastChild:e.firstChild,e.removeChild(b),"editinfo"!==b.localName&&f.insertBefore(b,h);g&&l.isEmpty(g)&&l.mergeChildrenIntoParent(g);
l.mergeChildrenIntoParent(e);return f});h.emit(ops.OdtDocument.signalStepsRemoved,{position:n,length:m});h.downgradeWhitespacesAtPosition(n);h.fixCursorPositions();h.getOdfCanvas().refreshSize();h.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f||d,memberId:k,timeStamp:e});p&&(p.resetSelectionType(),h.emit(ops.OdtDocument.signalCursorMoved,p));h.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:k,timestamp:e,position:n,length:m}}};
// Input 76
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
ops.OpSetBlob=function(){var g,k,e,n,m;this.init=function(q){g=q.memberid;k=q.timestamp;e=q.filename;n=q.mimetype;m=q.content};this.isEdit=!0;this.execute=function(g){g.getOdfCanvas().odfContainer().setBlob(e,n,m);return!0};this.spec=function(){return{optype:"SetBlob",memberid:g,timestamp:k,filename:e,mimetype:n,content:m}}};
// Input 77
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
ops.OpSetParagraphStyle=function(){var g,k,e,n;this.init=function(m){g=m.memberid;k=m.timestamp;e=m.position;n=m.styleName};this.isEdit=!0;this.execute=function(m){var q;q=m.getIteratorAtPosition(e);return(q=m.getParagraphElement(q.container()))?(""!==n?q.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",n):q.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","style-name"),m.getOdfCanvas().refreshSize(),m.emit(ops.OdtDocument.signalParagraphChanged,
{paragraphElement:q,timeStamp:k,memberId:g}),m.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:g,timestamp:k,position:e,styleName:n}}};
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
ops.OpSplitParagraph=function(){var g,k,e,n;this.init=function(m){g=m.memberid;k=m.timestamp;e=m.position;n=new odf.OdfUtils};this.isEdit=!0;this.execute=function(m){var q,b,h,r,d,f,a;m.upgradeWhitespacesAtPosition(e);q=m.getTextNodeAtStep(e,g);if(!q)return!1;b=m.getParagraphElement(q.textNode);if(!b)return!1;h=n.isListItem(b.parentNode)?b.parentNode:b;0===q.offset?(a=q.textNode.previousSibling,f=null):(a=q.textNode,f=q.offset>=q.textNode.length?null:q.textNode.splitText(q.offset));for(r=q.textNode;r!==
h;){r=r.parentNode;d=r.cloneNode(!1);f&&d.appendChild(f);if(a)for(;a&&a.nextSibling;)d.appendChild(a.nextSibling);else for(;r.firstChild;)d.appendChild(r.firstChild);r.parentNode.insertBefore(d,r.nextSibling);a=r;f=d}n.isListItem(f)&&(f=f.childNodes[0]);0===q.textNode.length&&q.textNode.parentNode.removeChild(q.textNode);m.emit(ops.OdtDocument.signalStepsInserted,{position:e,length:1});m.fixCursorPositions();m.getOdfCanvas().refreshSize();m.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:b,
memberId:g,timeStamp:k});m.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:f,memberId:g,timeStamp:k});m.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:g,timestamp:k,position:e}}};
// Input 79
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
ops.OpUpdateMember=function(){function g(){var b="//dc:creator[@editinfo:memberid='"+k+"']",b=xmldom.XPath.getODFElementsWithXPath(q.getRootNode(),b,function(b){return"editinfo"===b?"urn:webodf:names:editinfo":odf.Namespaces.lookupNamespaceURI(b)}),e;for(e=0;e<b.length;e+=1)b[e].textContent=n.fullName}var k,e,n,m,q;this.init=function(b){k=b.memberid;e=parseInt(b.timestamp,10);n=b.setProperties;m=b.removedProperties};this.isEdit=!1;this.execute=function(b){q=b;var e=b.getMember(k);if(!e)return!1;m&&
e.removeProperties(m);n&&(e.setProperties(n),n.fullName&&g());b.emit(ops.OdtDocument.signalMemberUpdated,e);return!0};this.spec=function(){return{optype:"UpdateMember",memberid:k,timestamp:e,setProperties:n,removedProperties:m}}};
// Input 80
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
ops.OpUpdateMetadata=function(){var g,k,e,n;this.init=function(m){g=m.memberid;k=parseInt(m.timestamp,10);e=m.setProperties;n=m.removedProperties};this.isEdit=!0;this.execute=function(g){g=g.getOdfCanvas().odfContainer().getMetadataManager();var k=[],b=["dc:date","dc:creator","meta:editing-cycles"];e&&b.forEach(function(b){if(e[b])return!1});n&&(b.forEach(function(b){if(-1!==k.indexOf(b))return!1}),k=n.attributes.split(","));g.setMetadata(e,k);return!0};this.spec=function(){return{optype:"UpdateMetadata",
memberid:g,timestamp:k,setProperties:e,removedProperties:n}}};
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
runtime.loadClass("odf.Namespaces");
ops.OpUpdateParagraphStyle=function(){function g(b,e){var d,f,a=e?e.split(","):[];for(d=0;d<a.length;d+=1)f=a[d].split(":"),b.removeAttributeNS(odf.Namespaces.lookupNamespaceURI(f[0]),f[1])}var k,e,n,m,q,b=odf.Namespaces.stylens;this.init=function(b){k=b.memberid;e=b.timestamp;n=b.styleName;m=b.setProperties;q=b.removedProperties};this.isEdit=!0;this.execute=function(e){var k=e.getFormatting(),d,f,a;return(d=""!==n?e.getParagraphStyleElement(n):k.getDefaultStyleElement("paragraph"))?(f=d.getElementsByTagNameNS(b,
"paragraph-properties")[0],a=d.getElementsByTagNameNS(b,"text-properties")[0],m&&k.updateStyle(d,m),q&&(q["style:paragraph-properties"]&&(g(f,q["style:paragraph-properties"].attributes),0===f.attributes.length&&d.removeChild(f)),q["style:text-properties"]&&(g(a,q["style:text-properties"].attributes),0===a.attributes.length&&d.removeChild(a)),g(d,q.attributes)),e.getOdfCanvas().refreshCSS(),e.emit(ops.OdtDocument.signalParagraphStyleModified,n),e.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=
function(){return{optype:"UpdateParagraphStyle",memberid:k,timestamp:e,styleName:n,setProperties:m,removedProperties:q}}};
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
runtime.loadClass("ops.OpAddMember");runtime.loadClass("ops.OpUpdateMember");runtime.loadClass("ops.OpRemoveMember");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpSetBlob");runtime.loadClass("ops.OpRemoveBlob");runtime.loadClass("ops.OpInsertImage");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");
runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpAddStyle");runtime.loadClass("ops.OpRemoveStyle");runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("ops.OpUpdateMetadata");
ops.OperationFactory=function(){function g(e){return function(){return new e}}var k;this.register=function(e,g){k[e]=g};this.create=function(e){var g=null,m=k[e.optype];m&&(g=m(e),g.init(e));return g};k={AddMember:g(ops.OpAddMember),UpdateMember:g(ops.OpUpdateMember),RemoveMember:g(ops.OpRemoveMember),AddCursor:g(ops.OpAddCursor),ApplyDirectStyling:g(ops.OpApplyDirectStyling),SetBlob:g(ops.OpSetBlob),RemoveBlob:g(ops.OpRemoveBlob),InsertImage:g(ops.OpInsertImage),InsertTable:g(ops.OpInsertTable),
InsertText:g(ops.OpInsertText),RemoveText:g(ops.OpRemoveText),SplitParagraph:g(ops.OpSplitParagraph),SetParagraphStyle:g(ops.OpSetParagraphStyle),UpdateParagraphStyle:g(ops.OpUpdateParagraphStyle),AddStyle:g(ops.OpAddStyle),RemoveStyle:g(ops.OpRemoveStyle),MoveCursor:g(ops.OpMoveCursor),RemoveCursor:g(ops.OpRemoveCursor),AddAnnotation:g(ops.OpAddAnnotation),RemoveAnnotation:g(ops.OpRemoveAnnotation),UpdateMetadata:g(ops.OpUpdateMetadata)}};
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(g){};ops.OperationRouter.prototype.setPlaybackFunction=function(g){};ops.OperationRouter.prototype.push=function(g){};ops.OperationRouter.prototype.close=function(g){};ops.OperationRouter.prototype.subscribe=function(g,k){};ops.OperationRouter.prototype.unsubscribe=function(g,k){};ops.OperationRouter.prototype.hasLocalUnsyncedOps=function(){};ops.OperationRouter.prototype.hasSessionHostConnection=function(){};
// Input 84
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
ops.OperationTransformMatrix=function(){function g(a){a.position+=a.length;a.length*=-1}function k(a){var c=0>a.length;c&&g(a);return c}function e(a,c){var b=[];a&&["style:parent-style-name","style:next-style-name"].forEach(function(d){a[d]===c&&b.push(d)});return b}function n(a,c){a&&["style:parent-style-name","style:next-style-name"].forEach(function(b){a[b]===c&&delete a[b]})}function m(a){var c={};Object.keys(a).forEach(function(b){c[b]="object"===typeof a[b]?m(a[b]):a[b]});return c}function q(a,
c,b,d){var f,e,g=!1,h=!1,k,m,n=d&&d.attributes?d.attributes.split(","):[];a&&(b||0<n.length)&&Object.keys(a).forEach(function(c){f=a[c];"object"!==typeof f&&(k=b&&b[c],void 0!==k?(delete a[c],h=!0,k===f&&(delete b[c],g=!0)):n&&-1!==n.indexOf(c)&&(delete a[c],h=!0))});if(c&&c.attributes&&(b||0<n.length)){m=c.attributes.split(",");for(d=0;d<m.length;d+=1)if(e=m[d],b&&void 0!==b[e]||n&&-1!==n.indexOf(e))m.splice(d,1),d-=1,h=!0;0<m.length?c.attributes=m.join(","):delete c.attributes}return{majorChanged:g,
minorChanged:h}}function b(a){for(var c in a)if(a.hasOwnProperty(c))return!0;return!1}function h(a){for(var c in a)if(a.hasOwnProperty(c)&&("attributes"!==c||0<a.attributes.length))return!0;return!1}function r(a,c,d){var f=a.setProperties?a.setProperties[d]:null,e=a.removedProperties?a.removedProperties[d]:null,g=c.setProperties?c.setProperties[d]:null,k=c.removedProperties?c.removedProperties[d]:null,m;m=q(f,e,g,k);f&&!b(f)&&delete a.setProperties[d];e&&!h(e)&&delete a.removedProperties[d];g&&!b(g)&&
delete c.setProperties[d];k&&!h(k)&&delete c.removedProperties[d];return m}function d(a,c){return{opSpecsA:[a],opSpecsB:[c]}}var f={AddCursor:{AddCursor:d,AddMember:d,AddStyle:d,ApplyDirectStyling:d,InsertText:d,MoveCursor:d,RemoveCursor:d,RemoveMember:d,RemoveStyle:d,RemoveText:d,SetParagraphStyle:d,SplitParagraph:d,UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},AddMember:{AddStyle:d,InsertText:d,MoveCursor:d,RemoveCursor:d,RemoveStyle:d,RemoveText:d,SetParagraphStyle:d,SplitParagraph:d,
UpdateMetadata:d,UpdateParagraphStyle:d},AddStyle:{AddStyle:d,ApplyDirectStyling:d,InsertText:d,MoveCursor:d,RemoveCursor:d,RemoveMember:d,RemoveStyle:function(a,c){var b,d=[a],f=[c];a.styleFamily===c.styleFamily&&(b=e(a.setProperties,c.styleName),0<b.length&&(b={optype:"UpdateParagraphStyle",memberid:c.memberid,timestamp:c.timestamp,styleName:a.styleName,removedProperties:{attributes:b.join(",")}},f.unshift(b)),n(a.setProperties,c.styleName));return{opSpecsA:d,opSpecsB:f}},RemoveText:d,SetParagraphStyle:d,
SplitParagraph:d,UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},ApplyDirectStyling:{ApplyDirectStyling:function(a,c,d){var f,e,g,h,k,n,q,s;h=[a];g=[c];if(!(a.position+a.length<=c.position||a.position>=c.position+c.length)){f=d?a:c;e=d?c:a;if(a.position!==c.position||a.length!==c.length)n=m(f),q=m(e);c=r(e,f,"style:text-properties");if(c.majorChanged||c.minorChanged)g=[],a=[],h=f.position+f.length,k=e.position+e.length,e.position<f.position?c.minorChanged&&(s=m(q),s.length=f.position-e.position,
a.push(s),e.position=f.position,e.length=k-e.position):f.position<e.position&&c.majorChanged&&(s=m(n),s.length=e.position-f.position,g.push(s),f.position=e.position,f.length=h-f.position),k>h?c.minorChanged&&(n=q,n.position=h,n.length=k-h,a.push(n),e.length=h-e.position):h>k&&c.majorChanged&&(n.position=k,n.length=h-k,g.push(n),f.length=k-f.position),f.setProperties&&b(f.setProperties)&&g.push(f),e.setProperties&&b(e.setProperties)&&a.push(e),d?(h=g,g=a):h=a}return{opSpecsA:h,opSpecsB:g}},InsertText:function(a,
c){c.position<=a.position?a.position+=c.text.length:c.position<=a.position+a.length&&(a.length+=c.text.length);return{opSpecsA:[a],opSpecsB:[c]}},MoveCursor:d,RemoveCursor:d,RemoveStyle:d,RemoveText:function(a,c){var b=a.position+a.length,d=c.position+c.length,f=[a],e=[c];d<=a.position?a.position-=c.length:c.position<b&&(a.position<c.position?a.length=d<b?a.length-c.length:c.position-a.position:(a.position=c.position,d<b?a.length=b-d:f=[]));return{opSpecsA:f,opSpecsB:e}},SetParagraphStyle:d,SplitParagraph:function(a,
c){c.position<a.position?a.position+=1:c.position<a.position+a.length&&(a.length+=1);return{opSpecsA:[a],opSpecsB:[c]}},UpdateMetadata:d,UpdateParagraphStyle:d},InsertText:{InsertText:function(a,c,b){if(a.position<c.position)c.position+=a.text.length;else if(a.position>c.position)a.position+=c.text.length;else return b?c.position+=a.text.length:a.position+=c.text.length,null;return{opSpecsA:[a],opSpecsB:[c]}},MoveCursor:function(a,c){var b=k(c);a.position<c.position?c.position+=a.text.length:a.position<
c.position+c.length&&(c.length+=a.text.length);b&&g(c);return{opSpecsA:[a],opSpecsB:[c]}},RemoveCursor:d,RemoveMember:d,RemoveStyle:d,RemoveText:function(a,c){var b;b=c.position+c.length;var d=[a],f=[c];b<=a.position?a.position-=c.length:a.position<=c.position?c.position+=a.text.length:(c.length=a.position-c.position,b={optype:"RemoveText",memberid:c.memberid,timestamp:c.timestamp,position:a.position+a.text.length,length:b-a.position},f.unshift(b),a.position=c.position);return{opSpecsA:d,opSpecsB:f}},
SplitParagraph:function(a,c,b){if(a.position<c.position)c.position+=a.text.length;else if(a.position>c.position)a.position+=1;else return b?c.position+=a.text.length:a.position+=1,null;return{opSpecsA:[a],opSpecsB:[c]}},UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},MoveCursor:{MoveCursor:d,RemoveCursor:function(a,c){return{opSpecsA:a.memberid===c.memberid?[]:[a],opSpecsB:[c]}},RemoveMember:d,RemoveStyle:d,RemoveText:function(a,c){var b=k(a),d=a.position+a.length,f=c.position+c.length;f<=
a.position?a.position-=c.length:c.position<d&&(a.position<c.position?a.length=f<d?a.length-c.length:c.position-a.position:(a.position=c.position,a.length=f<d?d-f:0));b&&g(a);return{opSpecsA:[a],opSpecsB:[c]}},SetParagraphStyle:d,SplitParagraph:function(a,b){var d=k(a);b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);d&&g(a);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},RemoveCursor:{RemoveCursor:function(a,b){var d=a.memberid===
b.memberid;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveMember:d,RemoveStyle:d,RemoveText:d,SetParagraphStyle:d,SplitParagraph:d,UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},RemoveMember:{RemoveStyle:d,RemoveText:d,SetParagraphStyle:d,SplitParagraph:d,UpdateMetadata:d,UpdateParagraphStyle:d},RemoveStyle:{RemoveStyle:function(a,b){var d=a.styleName===b.styleName&&a.styleFamily===b.styleFamily;return{opSpecsA:d?[]:[a],opSpecsB:d?[]:[b]}},RemoveText:d,SetParagraphStyle:function(a,b){var d,
f=[a],e=[b];"paragraph"===a.styleFamily&&a.styleName===b.styleName&&(d={optype:"SetParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,position:b.position,styleName:""},f.unshift(d),b.styleName="");return{opSpecsA:f,opSpecsB:e}},SplitParagraph:d,UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:function(a,b){var d,f=[a],g=[b];"paragraph"===a.styleFamily&&(d=e(b.setProperties,a.styleName),0<d.length&&(d={optype:"UpdateParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,styleName:b.styleName,
removedProperties:{attributes:d.join(",")}},f.unshift(d)),a.styleName===b.styleName?g=[]:n(b.setProperties,a.styleName));return{opSpecsA:f,opSpecsB:g}}},RemoveText:{RemoveText:function(a,b){var d=a.position+a.length,f=b.position+b.length,e=[a],g=[b];f<=a.position?a.position-=b.length:d<=b.position?b.position-=a.length:b.position<d&&(a.position<b.position?(a.length=f<d?a.length-b.length:b.position-a.position,d<f?(b.position=a.position,b.length=f-d):g=[]):(d<f?b.length-=a.length:b.position<a.position?
b.length=a.position-b.position:g=[],f<d?(a.position=b.position,a.length=d-f):e=[]));return{opSpecsA:e,opSpecsB:g}},SplitParagraph:function(a,b){var d=a.position+a.length,f=[a],e=[b];b.position<=a.position?a.position+=1:b.position<d&&(a.length=b.position-a.position,d={optype:"RemoveText",memberid:a.memberid,timestamp:a.timestamp,position:b.position+1,length:d-b.position},f.unshift(d));a.position+a.length<=b.position?b.position-=a.length:a.position<b.position&&(b.position=a.position);return{opSpecsA:f,
opSpecsB:e}},UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},SetParagraphStyle:{UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},SplitParagraph:{SplitParagraph:function(a,b,d){if(a.position<b.position)b.position+=1;else if(a.position>b.position)a.position+=1;else if(a.position===b.position)return d?b.position+=1:a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:d,UpdateMetadata:d,UpdateParagraphStyle:d},UpdateMember:{UpdateMetadata:d,UpdateParagraphStyle:d},UpdateMetadata:{UpdateMetadata:function(a,
c,d){var f,e=[a],g=[c];f=d?a:c;a=d?c:a;q(a.setProperties||null,a.removedProperties||null,f.setProperties||null,f.removedProperties||null);f.setProperties&&b(f.setProperties)||f.removedProperties&&h(f.removedProperties)||(d?e=[]:g=[]);a.setProperties&&b(a.setProperties)||a.removedProperties&&h(a.removedProperties)||(d?g=[]:e=[]);return{opSpecsA:e,opSpecsB:g}},UpdateParagraphStyle:d},UpdateParagraphStyle:{UpdateParagraphStyle:function(a,c,d){var f,e=[a],g=[c];a.styleName===c.styleName&&(f=d?a:c,a=d?
c:a,r(a,f,"style:paragraph-properties"),r(a,f,"style:text-properties"),q(a.setProperties||null,a.removedProperties||null,f.setProperties||null,f.removedProperties||null),f.setProperties&&b(f.setProperties)||f.removedProperties&&h(f.removedProperties)||(d?e=[]:g=[]),a.setProperties&&b(a.setProperties)||a.removedProperties&&h(a.removedProperties)||(d?g=[]:e=[]));return{opSpecsA:e,opSpecsB:g}}}};this.passUnchanged=d;this.extendTransformations=function(a){Object.keys(a).forEach(function(b){var d=a[b],
e,g=f.hasOwnProperty(b);runtime.log((g?"Extending":"Adding")+" map for optypeA: "+b);g||(f[b]={});e=f[b];Object.keys(d).forEach(function(a){var f=e.hasOwnProperty(a);runtime.assert(b<=a,"Wrong order:"+b+", "+a);runtime.log("  "+(f?"Overwriting":"Adding")+" entry for optypeB: "+a);e[a]=d[a]})})};this.transformOpspecVsOpspec=function(a,b){var d=a.optype<=b.optype,e;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(a));runtime.log(runtime.toJson(b));d||(e=a,a=b,b=e);(e=(e=f[a.optype])&&e[b.optype])?
(e=e(a,b,!d),d||null===e||(e={opSpecsA:e.opSpecsB,opSpecsB:e.opSpecsA})):e=null;runtime.log("result:");e?(runtime.log(runtime.toJson(e.opSpecsA)),runtime.log(runtime.toJson(e.opSpecsB))):runtime.log("null");return e}};
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
runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OperationTransformMatrix");
ops.OperationTransformer=function(){function g(g){var k=[];g.forEach(function(b){k.push(e.create(b))});return k}function k(e,g){for(var b,h,r=[],d=[];0<e.length&&g;){b=e.shift();b=n.transformOpspecVsOpspec(b,g);if(!b)return null;r=r.concat(b.opSpecsA);if(0===b.opSpecsB.length){r=r.concat(e);g=null;break}for(;1<b.opSpecsB.length;){h=k(e,b.opSpecsB.shift());if(!h)return null;d=d.concat(h.opSpecsB);e=h.opSpecsA}g=b.opSpecsB.pop()}g&&d.push(g);return{opSpecsA:r,opSpecsB:d}}var e,n=new ops.OperationTransformMatrix;
this.setOperationFactory=function(g){e=g};this.getOperationTransformMatrix=function(){return n};this.transform=function(e,n){for(var b,h=[];0<n.length;){b=k(e,n.shift());if(!b)return null;e=b.opSpecsA;h=h.concat(b.opSpecsB)}return{opsA:g(e),opsB:g(h)}}};
// Input 86
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
ops.TrivialOperationRouter=function(){var g,k;this.setOperationFactory=function(e){g=e};this.setPlaybackFunction=function(e){k=e};this.push=function(e){e.forEach(function(e){e=e.spec();e.timestamp=(new Date).getTime();e=g.create(e);k(e)})};this.close=function(e){e()};this.subscribe=function(e,g){};this.unsubscribe=function(e,g){};this.hasLocalUnsyncedOps=function(){return!1};this.hasSessionHostConnection=function(){return!0}};
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
gui.EditInfoMarker=function(g,k){function e(d,f){return runtime.setTimeout(function(){b.style.opacity=d},f)}var n=this,m,q,b,h,r;this.addEdit=function(d,f){var a=Date.now()-f;g.addEdit(d,f);q.setEdits(g.getSortedEdits());b.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",d);h&&runtime.clearTimeout(h);r&&runtime.clearTimeout(r);1E4>a?(e(1,0),h=e(0.5,1E4-a),r=e(0.2,2E4-a)):1E4<=a&&2E4>a?(e(0.5,0),r=e(0.2,2E4-a)):e(0.2,0)};this.getEdits=function(){return g.getEdits()};this.clearEdits=function(){g.clearEdits();
q.setEdits([]);b.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&b.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return g};this.show=function(){b.style.display="block"};this.hide=function(){n.hideHandle();b.style.display="none"};this.showHandle=function(){q.show()};this.hideHandle=function(){q.hide()};this.destroy=function(d){m.removeChild(b);q.destroy(function(b){b?d(b):g.destroy(d)})};(function(){var d=g.getOdtDocument().getDOM();
b=d.createElementNS(d.documentElement.namespaceURI,"div");b.setAttribute("class","editInfoMarker");b.onmouseover=function(){n.showHandle()};b.onmouseout=function(){n.hideHandle()};m=g.getNode();m.appendChild(b);q=new gui.EditInfoHandle(m);k||n.hide()})()};
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
gui.PlainTextPasteboard=function(g,k){function e(e,g){e.init(g);return e}this.createPasteOps=function(n){var m=g.getCursorPosition(k),q=m,b=[];n.replace(/\r/g,"").split("\n").forEach(function(g){b.push(e(new ops.OpSplitParagraph,{memberid:k,position:q}));q+=1;b.push(e(new ops.OpInsertText,{memberid:k,position:q,text:g}));q+=g.length});b.push(e(new ops.OpRemoveText,{memberid:k,position:m,length:1}));return b}};
// Input 89
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("gui.SelectionMover");
gui.SelectionView=function(g){function k(){var a=p.getRootNode();l!==a&&(l=a,u=l.parentNode.parentNode.parentNode,u.appendChild(w),u.appendChild(y),u.appendChild(v))}function e(a,b){a.style.left=b.left+"px";a.style.top=b.top+"px";a.style.width=b.width+"px";a.style.height=b.height+"px"}function n(a){N=a;w.style.display=y.style.display=v.style.display=!0===a?"block":"none"}function m(a){var b=s.getBoundingClientRect(u),c=p.getOdfCanvas().getZoomLevel(),d={};d.top=s.adaptRangeDifferenceToZoomLevel(a.top-
b.top,c);d.left=s.adaptRangeDifferenceToZoomLevel(a.left-b.left,c);d.bottom=s.adaptRangeDifferenceToZoomLevel(a.bottom-b.top,c);d.right=s.adaptRangeDifferenceToZoomLevel(a.right-b.left,c);d.width=s.adaptRangeDifferenceToZoomLevel(a.width,c);d.height=s.adaptRangeDifferenceToZoomLevel(a.height,c);return d}function q(a){a=a.getBoundingClientRect();return Boolean(a&&0!==a.height)}function b(a){var b=t.getTextElements(a,!0,!1),c=a.cloneRange(),d=a.cloneRange();a=a.cloneRange();if(!b.length)return null;
var f;a:{f=0;var e=b[f],g=c.startContainer===e?c.startOffset:0,h=g;c.setStart(e,g);for(c.setEnd(e,h);!q(c);){if(e.nodeType===Node.ELEMENT_NODE&&h<e.childNodes.length)h=e.childNodes.length;else if(e.nodeType===Node.TEXT_NODE&&h<e.length)h+=1;else if(b[f])e=b[f],f+=1,g=h=0;else{f=!1;break a}c.setStart(e,g);c.setEnd(e,h)}f=!0}if(!f)return null;a:{f=b.length-1;e=b[f];h=g=d.endContainer===e?d.endOffset:e.length||e.childNodes.length;d.setStart(e,g);for(d.setEnd(e,h);!q(d);){if(e.nodeType===Node.ELEMENT_NODE&&
0<g)g=0;else if(e.nodeType===Node.TEXT_NODE&&0<g)g-=1;else if(b[f])e=b[f],f-=1,g=h=e.length||e.childNodes.length;else{b=!1;break a}d.setStart(e,g);d.setEnd(e,h)}b=!0}if(!b)return null;a.setStart(c.startContainer,c.startOffset);a.setEnd(d.endContainer,d.endOffset);return{firstRange:c,lastRange:d,fillerRange:a}}function h(a,b){var c={};c.top=Math.min(a.top,b.top);c.left=Math.min(a.left,b.left);c.right=Math.max(a.right,b.right);c.bottom=Math.max(a.bottom,b.bottom);c.width=c.right-c.left;c.height=c.bottom-
c.top;return c}function r(a,b){b&&0<b.width&&0<b.height&&(a=a?h(a,b):b);return a}function d(a){function b(a){z.setUnfilteredPosition(a,0);return w.acceptNode(a)===x&&u.acceptPosition(z)===x?x:R}function c(a){var d=null;b(a)===x&&(d=s.getBoundingClientRect(a));return d}var d=a.commonAncestorContainer,f=a.startContainer,e=a.endContainer,g=a.startOffset,h=a.endOffset,k,l,m=null,n,q=B.createRange(),u,w=new odf.OdfNodeFilter,v;if(f===d||e===d)return q=a.cloneRange(),m=q.getBoundingClientRect(),q.detach(),
m;for(a=f;a.parentNode!==d;)a=a.parentNode;for(l=e;l.parentNode!==d;)l=l.parentNode;u=p.createRootFilter(f);for(d=a.nextSibling;d&&d!==l;)n=c(d),m=r(m,n),d=d.nextSibling;if(t.isParagraph(a))m=r(m,s.getBoundingClientRect(a));else if(a.nodeType===Node.TEXT_NODE)d=a,q.setStart(d,g),q.setEnd(d,d===l?h:d.length),n=q.getBoundingClientRect(),m=r(m,n);else for(v=B.createTreeWalker(a,NodeFilter.SHOW_TEXT,b,!1),d=v.currentNode=f;d&&d!==e;)q.setStart(d,g),q.setEnd(d,d.length),n=q.getBoundingClientRect(),m=r(m,
n),k=d,g=0,d=v.nextNode();k||(k=f);if(t.isParagraph(l))m=r(m,s.getBoundingClientRect(l));else if(l.nodeType===Node.TEXT_NODE)d=l,q.setStart(d,d===a?g:0),q.setEnd(d,h),n=q.getBoundingClientRect(),m=r(m,n);else for(v=B.createTreeWalker(l,NodeFilter.SHOW_TEXT,b,!1),d=v.currentNode=e;d&&d!==k;)if(q.setStart(d,0),q.setEnd(d,h),n=q.getBoundingClientRect(),m=r(m,n),d=v.previousNode())h=d.length;return m}function f(a,b){var c=a.getBoundingClientRect(),d={width:0};d.top=c.top;d.bottom=c.bottom;d.height=c.height;
d.left=d.right=b?c.right:c.left;return d}function a(){k();if(g.getSelectionType()===ops.OdtCursor.RangeSelection){n(!0);var a=g.getSelectedRange(),c=b(a),l,p,q,r;a.collapsed||!c?n(!1):(n(!0),a=c.firstRange,l=c.lastRange,c=c.fillerRange,p=m(f(a,!1)),r=m(f(l,!0)),q=(q=d(c))?m(q):h(p,r),e(w,{left:p.left,top:p.top,width:Math.max(0,q.width-(p.left-q.left)),height:p.height}),r.top===p.top||r.bottom===p.bottom?y.style.display=v.style.display="none":(e(v,{left:q.left,top:r.top,width:Math.max(0,r.right-q.left),
height:r.height}),e(y,{left:q.left,top:p.top+p.height,width:Math.max(0,parseFloat(w.style.left)+parseFloat(w.style.width)-parseFloat(v.style.left)),height:Math.max(0,r.top-p.bottom)})),a.detach(),l.detach(),c.detach())}else n(!1)}function c(b){b===g&&a()}var p=g.getOdtDocument(),l,u,B=p.getDOM(),w=B.createElement("div"),y=B.createElement("div"),v=B.createElement("div"),t=new odf.OdfUtils,s=new core.DomUtils,N=!0,z=gui.SelectionMover.createPositionIterator(p.getRootNode()),x=NodeFilter.FILTER_ACCEPT,
R=NodeFilter.FILTER_REJECT;this.show=this.rerender=a;this.hide=function(){n(!1)};this.visible=function(){return N};this.destroy=function(a){u.removeChild(w);u.removeChild(y);u.removeChild(v);g.getOdtDocument().unsubscribe(ops.OdtDocument.signalCursorMoved,c);a()};(function(){var a=g.getMemberId();k();w.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);y.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);v.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",
a);w.className=y.className=v.className="selectionOverlay";g.getOdtDocument().subscribe(ops.OdtDocument.signalCursorMoved,c)})()};
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
runtime.loadClass("gui.SelectionView");
gui.SelectionViewManager=function(){function g(){return Object.keys(k).map(function(e){return k[e]})}var k={};this.getSelectionView=function(e){return k.hasOwnProperty(e)?k[e]:null};this.getSelectionViews=g;this.removeSelectionView=function(e){k.hasOwnProperty(e)&&(k[e].destroy(function(){}),delete k[e])};this.hideSelectionView=function(e){k.hasOwnProperty(e)&&k[e].hide()};this.showSelectionView=function(e){k.hasOwnProperty(e)&&k[e].show()};this.rerenderSelectionViews=function(){Object.keys(k).forEach(function(e){k[e].visible()&&
k[e].rerender()})};this.registerCursor=function(e,g){var m=e.getMemberId(),q=new gui.SelectionView(e);g?q.show():q.hide();return k[m]=q};this.destroy=function(e){var k=g();(function q(b,g){g?e(g):b<k.length?k[b].destroy(function(e){q(b+1,e)}):e()})(0,void 0)}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.UndoManager");runtime.loadClass("gui.UndoStateRules");
gui.TrivialUndoManager=function(g){function k(){u.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:b.hasUndoStates(),redoAvailable:b.hasRedoStates()})}function e(){c!==d&&c!==p[p.length-1]&&p.push(c)}function n(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);h.normalizeTextNodes(b)}function m(a){return Object.keys(a).map(function(b){return a[b]})}function q(b){function c(a){var b=a.spec();if(e[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete e[b.memberid],g-=1);break;case "MoveCursor":f[b.memberid]||(f[b.memberid]=a)}}var d={},f={},e={},g,h=b.pop();a.getCursors().forEach(function(a){e[a.getMemberId()]=!0});for(g=Object.keys(e).length;h&&0<g;)h.reverse(),h.forEach(c),h=b.pop();return m(d).concat(m(f))}var b=this,h=new core.DomUtils,r,d=[],f,a,c=[],p=[],l=[],u=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
B=g||new gui.UndoStateRules;this.subscribe=function(a,b){u.subscribe(a,b)};this.unsubscribe=function(a,b){u.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<p.length};this.hasRedoStates=function(){return 0<l.length};this.setOdtDocument=function(b){a=b};this.resetInitialState=function(){p.length=0;l.length=0;d.length=0;c.length=0;r=null;k()};this.saveInitialState=function(){var b=a.getOdfCanvas().odfContainer(),f=a.getOdfCanvas().getAnnotationViewManager();f&&f.forgetAnnotations();r=b.rootElement.cloneNode(!0);
a.getOdfCanvas().refreshAnnotations();b=r;h.getElementsByTagNameNS(b,"urn:webodf:names:cursor","cursor").forEach(n);h.getElementsByTagNameNS(b,"urn:webodf:names:cursor","anchor").forEach(n);e();p.unshift(d);c=d=q(p);p.length=0;l.length=0;k()};this.setPlaybackFunction=function(a){f=a};this.onOperationExecuted=function(a){l.length=0;B.isEditOperation(a)&&c===d||!B.isPartOfOperationSet(a,c)?(e(),c=[a],p.push(c),u.emit(gui.UndoManager.signalUndoStateCreated,{operations:c}),k()):(c.push(a),u.emit(gui.UndoManager.signalUndoStateModified,
{operations:c}))};this.moveForward=function(a){for(var b=0,d;a&&l.length;)d=l.pop(),p.push(d),d.forEach(f),a-=1,b+=1;b&&(c=p[p.length-1],k());return b};this.moveBackward=function(b){for(var e=a.getOdfCanvas(),g=e.odfContainer(),h=0;b&&p.length;)l.push(p.pop()),b-=1,h+=1;h&&(g.setRootElement(r.cloneNode(!0)),e.setOdfContainer(g,!0),u.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),a.getCursors().forEach(function(b){a.removeCursor(b.getMemberId())}),d.forEach(f),p.forEach(function(a){a.forEach(f)}),
e.refreshCSS(),c=p[p.length-1]||d,k());return h}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
runtime.loadClass("ops.TrivialOperationRouter");runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OdtDocument");
ops.Session=function(g){var k=new ops.OperationFactory,e=new ops.OdtDocument(g),n=null;this.setOperationFactory=function(e){k=e;n&&n.setOperationFactory(k)};this.setOperationRouter=function(g){n=g;g.setPlaybackFunction(function(g){return g.execute(e)?(e.emit(ops.OdtDocument.signalOperationExecuted,g),!0):!1});g.setOperationFactory(k)};this.getOperationFactory=function(){return k};this.getOdtDocument=function(){return e};this.enqueue=function(e){n.push(e)};this.close=function(g){n.close(function(k){k?
g(k):e.close(g)})};this.destroy=function(g){e.destroy(g)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 93
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.PositionFilter");runtime.loadClass("ops.Session");runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("gui.SelectionMover");
gui.AnnotationController=function(g,k){function e(){var f=b.getCursor(k),f=f&&f.getNode(),a=!1;if(f){a:{for(a=b.getRootNode();f&&f!==a;){if(f.namespaceURI===d&&"annotation"===f.localName){f=!0;break a}f=f.parentNode}f=!1}a=!f}a!==h&&(h=a,r.emit(gui.AnnotationController.annotatableChanged,h))}function n(b){b.getMemberId()===k&&e()}function m(b){b===k&&e()}function q(b){b.getMemberId()===k&&e()}var b=g.getOdtDocument(),h=!1,r=new core.EventNotifier([gui.AnnotationController.annotatableChanged]),d=odf.Namespaces.officens;
this.isAnnotatable=function(){return h};this.addAnnotation=function(){var d=new ops.OpAddAnnotation,a=b.getCursorSelection(k),c=a.length,a=a.position;h&&(a=0<=c?a:a+c,c=Math.abs(c),d.init({memberid:k,position:a,length:c,name:k+Date.now()}),g.enqueue([d]))};this.removeAnnotation=function(d){var a,c;a=b.convertDomPointToCursorStep(d,0)+1;c=b.convertDomPointToCursorStep(d,d.childNodes.length);d=new ops.OpRemoveAnnotation;d.init({memberid:k,position:a,length:c-a});c=new ops.OpMoveCursor;c.init({memberid:k,
position:0<a?a-1:a,length:0});g.enqueue([d,c])};this.subscribe=function(b,a){r.subscribe(b,a)};this.unsubscribe=function(b,a){r.unsubscribe(b,a)};this.destroy=function(d){b.unsubscribe(ops.OdtDocument.signalCursorAdded,n);b.unsubscribe(ops.OdtDocument.signalCursorRemoved,m);b.unsubscribe(ops.OdtDocument.signalCursorMoved,q);d()};b.subscribe(ops.OdtDocument.signalCursorAdded,n);b.subscribe(ops.OdtDocument.signalCursorRemoved,m);b.subscribe(ops.OdtDocument.signalCursorMoved,q);e()};
gui.AnnotationController.annotatableChanged="annotatable/changed";(function(){return gui.AnnotationController})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.Utils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("ops.OpAddStyle");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("gui.StyleHelper");
gui.DirectParagraphStyler=function(g,k,e){function n(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b=l.getCursor(k),b=b&&b.getSelectedRange(),c;v=a(v,b?w.isAlignedLeft(b):!1,"isAlignedLeft");t=a(t,b?w.isAlignedCenter(b):!1,"isAlignedCenter");s=a(s,b?w.isAlignedRight(b):!1,"isAlignedRight");N=a(N,b?w.isAlignedJustified(b):!1,"isAlignedJustified");c&&y.emit(gui.DirectParagraphStyler.paragraphStylingChanged,c)}function m(a){a.getMemberId()===k&&n()}function q(a){a===k&&n()}function b(a){a.getMemberId()===
k&&n()}function h(){n()}function r(a){var b=l.getCursor(k);b&&l.getParagraphElement(b.getNode())===a.paragraphElement&&n()}function d(a){return a===ops.StepsTranslator.NEXT_STEP}function f(a){var b=l.getCursor(k).getSelectedRange(),b=B.getParagraphElements(b),c=l.getFormatting();b.forEach(function(b){var f=l.convertDomPointToCursorStep(b,0,d),h=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=e.generateStyleName();var m;h&&(m=c.createDerivedStyleObject(h,"paragraph",{}));m=a(m||{});h=new ops.OpAddStyle;
h.init({memberid:k,styleName:b,styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:m});m=new ops.OpSetParagraphStyle;m.init({memberid:k,styleName:b,position:f});g.enqueue([h,m])})}function a(a){f(function(b){return u.mergeObjects(b,a)})}function c(b){a({"style:paragraph-properties":{"fo:text-align":b}})}function p(a,b){var c=l.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&B.parseLength(d);return u.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var l=g.getOdtDocument(),u=new core.Utils,B=new odf.OdfUtils,w=new gui.StyleHelper(l.getFormatting()),y=new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]),v,t,s,N;this.isAlignedLeft=function(){return v};this.isAlignedCenter=function(){return t};this.isAlignedRight=function(){return s};this.isAlignedJustified=function(){return N};this.alignParagraphLeft=function(){c("left");return!0};this.alignParagraphCenter=function(){c("center");
return!0};this.alignParagraphRight=function(){c("right");return!0};this.alignParagraphJustified=function(){c("justify");return!0};this.indent=function(){f(p.bind(null,1));return!0};this.outdent=function(){f(p.bind(null,-1));return!0};this.subscribe=function(a,b){y.subscribe(a,b)};this.unsubscribe=function(a,b){y.unsubscribe(a,b)};this.destroy=function(a){l.unsubscribe(ops.OdtDocument.signalCursorAdded,m);l.unsubscribe(ops.OdtDocument.signalCursorRemoved,q);l.unsubscribe(ops.OdtDocument.signalCursorMoved,
b);l.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,h);l.unsubscribe(ops.OdtDocument.signalParagraphChanged,r);a()};l.subscribe(ops.OdtDocument.signalCursorAdded,m);l.subscribe(ops.OdtDocument.signalCursorRemoved,q);l.subscribe(ops.OdtDocument.signalCursorMoved,b);l.subscribe(ops.OdtDocument.signalParagraphStyleModified,h);l.subscribe(ops.OdtDocument.signalParagraphChanged,r);n()};gui.DirectParagraphStyler.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectParagraphStyler})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.Utils");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("gui.StyleHelper");
gui.DirectTextStyler=function(g,k){function e(a,b){for(var c=0,d=b[c];d&&a;)a=a[d],c+=1,d=b[c];return b.length===c?a:void 0}function n(a,b){var c=e(a[0],b);return a.every(function(a){return c===e(a,b)})?c:void 0}function m(){var a=t.getCursor(k),a=(a=a&&a.getSelectedRange())&&s.getAppliedStyles(a)||[];a[0]&&z&&(a[0]=v.mergeObjects(a[0],z));return a}function q(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b,c;x=m();R=a(R,x?s.isBold(x):!1,"isBold");F=a(F,x?s.isItalic(x):!1,"isItalic");
U=a(U,x?s.hasUnderline(x):!1,"hasUnderline");P=a(P,x?s.hasStrikeThrough(x):!1,"hasStrikeThrough");b=x&&n(x,["style:text-properties","fo:font-size"]);A=a(A,b&&parseFloat(b),"fontSize");ja=a(ja,x&&n(x,["style:text-properties","style:font-name"]),"fontName");c&&N.emit(gui.DirectTextStyler.textStylingChanged,c)}function b(a){a.getMemberId()===k&&q()}function h(a){a===k&&q()}function r(a){a.getMemberId()===k&&q()}function d(){q()}function f(a){var b=t.getCursor(k);b&&t.getParagraphElement(b.getNode())===
a.paragraphElement&&q()}function a(a,b){var c=t.getCursor(k);if(!c)return!1;c=s.getAppliedStyles(c.getSelectedRange());b(!a(c));return!0}function c(a){var b=t.getCursorSelection(k),c={"style:text-properties":a};0!==b.length?(a=new ops.OpApplyDirectStyling,a.init({memberid:k,position:b.position,length:b.length,setProperties:c}),g.enqueue([a])):(z=v.mergeObjects(z||{},c),q())}function p(a,b){var d={};d[a]=b;c(d)}function l(a){a=a.spec();z&&a.memberid===k&&"SplitParagraph"!==a.optype&&(z=null,q())}function u(a){p("fo:font-weight",
a?"bold":"normal")}function B(a){p("fo:font-style",a?"italic":"normal")}function w(a){p("style:text-underline-style",a?"solid":"none")}function y(a){p("style:text-line-through-style",a?"solid":"none")}var v=new core.Utils,t=g.getOdtDocument(),s=new gui.StyleHelper(t.getFormatting()),N=new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]),z,x=[],R=!1,F=!1,U=!1,P=!1,A,ja;this.formatTextSelection=c;this.createCursorStyleOp=function(a,b){var c=null;z&&(c=new ops.OpApplyDirectStyling,c.init({memberid:k,
position:a,length:b,setProperties:z}),z=null,q());return c};this.setBold=u;this.setItalic=B;this.setHasUnderline=w;this.setHasStrikethrough=y;this.setFontSize=function(a){p("fo:font-size",a+"pt")};this.setFontName=function(a){p("style:font-name",a)};this.getAppliedStyles=function(){return x};this.toggleBold=a.bind(this,s.isBold,u);this.toggleItalic=a.bind(this,s.isItalic,B);this.toggleUnderline=a.bind(this,s.hasUnderline,w);this.toggleStrikethrough=a.bind(this,s.hasStrikeThrough,y);this.isBold=function(){return R};
this.isItalic=function(){return F};this.hasUnderline=function(){return U};this.hasStrikeThrough=function(){return P};this.fontSize=function(){return A};this.fontName=function(){return ja};this.subscribe=function(a,b){N.subscribe(a,b)};this.unsubscribe=function(a,b){N.unsubscribe(a,b)};this.destroy=function(a){t.unsubscribe(ops.OdtDocument.signalCursorAdded,b);t.unsubscribe(ops.OdtDocument.signalCursorRemoved,h);t.unsubscribe(ops.OdtDocument.signalCursorMoved,r);t.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,
d);t.unsubscribe(ops.OdtDocument.signalParagraphChanged,f);t.unsubscribe(ops.OdtDocument.signalOperationExecuted,l);a()};t.subscribe(ops.OdtDocument.signalCursorAdded,b);t.subscribe(ops.OdtDocument.signalCursorRemoved,h);t.subscribe(ops.OdtDocument.signalCursorMoved,r);t.subscribe(ops.OdtDocument.signalParagraphStyleModified,d);t.subscribe(ops.OdtDocument.signalParagraphChanged,f);t.subscribe(ops.OdtDocument.signalOperationExecuted,l);q()};gui.DirectTextStyler.textStylingChanged="textStyling/changed";
(function(){return gui.DirectTextStyler})();
// Input 96
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.ObjectNameGenerator");
gui.ImageManager=function(g,k,e){var n={"image/gif":".gif","image/jpeg":".jpg","image/png":".png"},m=odf.Namespaces.textns,q=g.getOdtDocument(),b=q.getFormatting(),h={};this.insertImage=function(r,d,f,a){var c;runtime.assert(0<f&&0<a,"Both width and height of the image should be greater than 0px.");c=q.getParagraphElement(q.getCursor(k).getNode()).getAttributeNS(m,"style-name");h.hasOwnProperty(c)||(h[c]=b.getContentSize(c,"paragraph"));c=h[c];f*=0.0264583333333334;a*=0.0264583333333334;var p=1,l=
1;f>c.width&&(p=c.width/f);a>c.height&&(l=c.height/a);p=Math.min(p,l);c=f*p;f=a*p;l=q.getOdfCanvas().odfContainer().rootElement.styles;a=r.toLowerCase();var p=n.hasOwnProperty(a)?n[a]:null,u;a=[];runtime.assert(null!==p,"Image type is not supported: "+r);p="Pictures/"+e.generateImageName()+p;u=new ops.OpSetBlob;u.init({memberid:k,filename:p,mimetype:r,content:d});a.push(u);b.getStyleElement("Graphics","graphic",[l])||(r=new ops.OpAddStyle,r.init({memberid:k,styleName:"Graphics",styleFamily:"graphic",
isAutomaticStyle:!1,setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph","svg:x":"0cm","svg:y":"0cm","style:wrap":"dynamic","style:number-wrapped-paragraphs":"no-limit","style:wrap-contour":"false","style:vertical-pos":"top","style:vertical-rel":"paragraph","style:horizontal-pos":"center","style:horizontal-rel":"paragraph"}}}),a.push(r));r=e.generateStyleName();d=new ops.OpAddStyle;d.init({memberid:k,styleName:r,styleFamily:"graphic",isAutomaticStyle:!0,setProperties:{"style:parent-style-name":"Graphics",
"style:graphic-properties":{"style:vertical-pos":"top","style:vertical-rel":"baseline","style:horizontal-pos":"center","style:horizontal-rel":"paragraph","fo:background-color":"transparent","style:background-transparency":"100%","style:shadow":"none","style:mirror":"none","fo:clip":"rect(0cm, 0cm, 0cm, 0cm)","draw:luminance":"0%","draw:contrast":"0%","draw:red":"0%","draw:green":"0%","draw:blue":"0%","draw:gamma":"100%","draw:color-inversion":"false","draw:image-opacity":"100%","draw:color-mode":"standard"}}});
a.push(d);u=new ops.OpInsertImage;u.init({memberid:k,position:q.getCursorPosition(k),filename:p,frameWidth:c+"cm",frameHeight:f+"cm",frameStyleName:r,frameName:e.generateFrameName()});a.push(u);g.enqueue(a)}};
// Input 97
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
gui.TextManipulator=function(g,k,e){function n(b){var d=new ops.OpRemoveText;d.init({memberid:k,position:b.position,length:b.length});return d}function m(b){0>b.length&&(b.position+=b.length,b.length=-b.length);return b}function q(e,d){var f=new core.PositionFilterChain,a=gui.SelectionMover.createPositionIterator(b.getRootElement(e)),c=d?a.nextPosition:a.previousPosition;f.addFilter("BaseFilter",b.getPositionFilter());f.addFilter("RootFilter",b.createRootFilter(k));for(a.setUnfilteredPosition(e,0);c();)if(f.acceptPosition(a)===
h)return!0;return!1}var b=g.getOdtDocument(),h=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.enqueueParagraphSplittingOps=function(){var e=m(b.getCursorSelection(k)),d,f=[];0<e.length&&(d=n(e),f.push(d));d=new ops.OpSplitParagraph;d.init({memberid:k,position:e.position});f.push(d);g.enqueue(f);return!0};this.removeTextByBackspaceKey=function(){var e=b.getCursor(k),d=m(b.getCursorSelection(k)),f=null;0===d.length?q(e.getNode(),!1)&&(f=new ops.OpRemoveText,f.init({memberid:k,position:d.position-
1,length:1}),g.enqueue([f])):(f=n(d),g.enqueue([f]));return null!==f};this.removeTextByDeleteKey=function(){var e=b.getCursor(k),d=m(b.getCursorSelection(k)),f=null;0===d.length?q(e.getNode(),!0)&&(f=new ops.OpRemoveText,f.init({memberid:k,position:d.position,length:1}),g.enqueue([f])):(f=n(d),g.enqueue([f]));return null!==f};this.removeCurrentSelection=function(){var e=m(b.getCursorSelection(k));0!==e.length&&(e=n(e),g.enqueue([e]));return!0};this.insertText=function(h){var d=m(b.getCursorSelection(k)),
f,a=[];0<d.length&&(f=n(d),a.push(f));f=new ops.OpInsertText;f.init({memberid:k,position:d.position,text:h});a.push(f);e&&(h=e(d.position,h.length))&&a.push(h);g.enqueue(a)}};(function(){return gui.TextManipulator})();
// Input 98
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Async");runtime.loadClass("core.ScheduledTask");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.ObjectNameGenerator");runtime.loadClass("ops.OdtCursor");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.DirectTextStyler");runtime.loadClass("gui.DirectParagraphStyler");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.ImageManager");
runtime.loadClass("gui.ImageSelector");runtime.loadClass("gui.TextManipulator");runtime.loadClass("gui.AnnotationController");runtime.loadClass("gui.EventManager");runtime.loadClass("gui.PlainTextPasteboard");
gui.SessionController=function(){var g=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(k,e,n,m){function q(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function b(a,b,c){var d=new ops.OpMoveCursor;d.init({memberid:e,position:a,length:b||0,selectionType:c});return d}function h(a){var b=/[A-Za-z0-9]/,c=gui.SelectionMover.createPositionIterator(E.getRootNode()),d;for(c.setUnfilteredPosition(a.startContainer,a.startOffset);c.previousPosition();){d=c.getCurrentNode();
if(d.nodeType===Node.TEXT_NODE){if(d=d.data[c.unfilteredDomOffset()],!b.test(d))break}else if(!ia.isTextSpan(d))break;a.setStart(c.container(),c.unfilteredDomOffset())}c.setUnfilteredPosition(a.endContainer,a.endOffset);do if(d=c.getCurrentNode(),d.nodeType===Node.TEXT_NODE){if(d=d.data[c.unfilteredDomOffset()],!b.test(d))break}else if(!ia.isTextSpan(d))break;while(c.nextPosition());a.setEnd(c.container(),c.unfilteredDomOffset())}function r(a){var b=E.getParagraphElement(a.startContainer),c=E.getParagraphElement(a.endContainer);
b&&a.setStart(b,0);c&&(ia.isParagraph(a.endContainer)&&0===a.endOffset?a.setEndBefore(c):a.setEnd(c,c.childNodes.length))}function d(a){a=E.getDistanceFromCursor(e,a,0);var c=null!==a?a+1:null,d;if(c||a)d=E.getCursorPosition(e),a=b(d+a,c-a,ops.OdtCursor.RegionSelection),k.enqueue([a]);J.focus()}function f(a){var b=0<=ha.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset),c=a.focusNode.ownerDocument.createRange();b?(c.setStart(a.anchorNode,a.anchorOffset),c.setEnd(a.focusNode,a.focusOffset)):
(c.setStart(a.focusNode,a.focusOffset),c.setEnd(a.anchorNode,a.anchorOffset));return{range:c,hasForwardSelection:b}}function a(a){return function(b){var c=a(b);return function(b,d){return a(d)===c}}}function c(c,d,f){var g=E.getOdfCanvas().getElement(),l;l=ha.containsNode(g,c.startContainer);g=ha.containsNode(g,c.endContainer);if(l||g){l&&g&&(2===f?h(c):3<=f&&r(c));c=d?{anchorNode:c.startContainer,anchorOffset:c.startOffset,focusNode:c.endContainer,focusOffset:c.endOffset}:{anchorNode:c.endContainer,
anchorOffset:c.endOffset,focusNode:c.startContainer,focusOffset:c.startOffset};d=E.convertDomToCursorRange(c,a(ia.getParagraphElement));c=E.getCursorSelection(e);if(d.position!==c.position||d.length!==c.length)c=b(d.position,d.length,ops.OdtCursor.RangeSelection),k.enqueue([c]);J.focus()}}function p(a){var c=E.getCursorSelection(e),d=E.getCursor(e).getStepCounter();0!==a&&(a=0<a?d.convertForwardStepsBetweenFilters(a,ra,wa):-d.convertBackwardStepsBetweenFilters(-a,ra,wa),a=c.length+a,k.enqueue([b(c.position,
a)]))}function l(a){var c=E.getCursorPosition(e),d=E.getCursor(e).getStepCounter();0!==a&&(a=0<a?d.convertForwardStepsBetweenFilters(a,ra,wa):-d.convertBackwardStepsBetweenFilters(-a,ra,wa),k.enqueue([b(c+a,0)]))}function u(){l(-1);return!0}function B(){l(1);return!0}function w(){p(-1);return!0}function y(){p(1);return!0}function v(a,b){var c=E.getParagraphElement(E.getCursor(e).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=E.getCursor(e).getStepCounter().countLinesSteps(a,
ra);b?p(c):l(c)}function t(){v(-1,!1);return!0}function s(){v(1,!1);return!0}function N(){v(-1,!0);return!0}function z(){v(1,!0);return!0}function x(a,b){var c=E.getCursor(e).getStepCounter().countStepsToLineBoundary(a,ra);b?p(c):l(c)}function R(){x(-1,!1);return!0}function F(){x(1,!1);return!0}function U(){x(-1,!0);return!0}function P(){x(1,!0);return!0}function A(){var a=E.getParagraphElement(E.getCursor(e).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");
c=E.getDistanceFromCursor(e,a,0);b=gui.SelectionMover.createPositionIterator(E.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),ia.isParagraph(a)&&(c=E.getDistanceFromCursor(e,a,0));p(c);return!0}function ja(){var a=E.getParagraphElement(E.getCursor(e).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(E.getRootNode());b.moveToEndOfNode(a);for(c=E.getDistanceFromCursor(e,
b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),ia.isParagraph(a)&&(b.moveToEndOfNode(a),c=E.getDistanceFromCursor(e,b.container(),b.unfilteredDomOffset()));p(c);return!0}function ka(a,b){var c=gui.SelectionMover.createPositionIterator(E.getRootNode());0<a&&c.moveToEnd();c=E.getDistanceFromCursor(e,c.container(),c.unfilteredDomOffset());b?p(c):l(c)}function G(){ka(-1,!1);return!0}function Z(){ka(1,!1);return!0}function O(){ka(-1,!0);return!0}function ba(){ka(1,
!0);return!0}function K(){var a=E.getRootNode(),a=E.convertDomPointToCursorStep(a,a.childNodes.length);k.enqueue([b(0,a)]);return!0}function I(){var a=E.getCursor(e),b=fa.getSelection(),c;a?(va.clearSelection(),a.getSelectionType()===ops.OdtCursor.RegionSelection&&(c=a.getSelectedRange(),(c=ia.getImageElements(c)[0])&&va.select(c.parentNode)),J.hasFocus()&&(c=a.getSelectedRange(),b.extend?a.hasForwardSelection()?(b.collapse(c.startContainer,c.startOffset),b.extend(c.endContainer,c.endOffset)):(b.collapse(c.endContainer,
c.endOffset),b.extend(c.startContainer,c.startOffset)):(Da=!0,b.removeAllRanges(),b.addRange(c.cloneRange()),E.getOdfCanvas().getElement().setActive(),runtime.setTimeout(function(){Da=!1},0)))):va.clearSelection()}function C(){!1===Da&&runtime.setTimeout(I,0)}function Y(a){var b=E.getCursor(e).getSelectedRange();b.collapsed||(Ea.setDataFromRange(a,b)?oa.removeCurrentSelection():runtime.log("Cut operation failed"))}function H(){return!1!==E.getCursor(e).getSelectedRange().collapsed}function X(a){var b=
E.getCursor(e).getSelectedRange();b.collapsed||Ea.setDataFromRange(a,b)||runtime.log("Cut operation failed")}function Q(a){var b;fa.clipboardData&&fa.clipboardData.getData?b=fa.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(oa.removeCurrentSelection(),k.enqueue(Ga.createPasteOps(b)),a.preventDefault?a.preventDefault():a.returnValue=!1)}function L(){return!1}function ca(a){if(V)V.onOperationExecuted(a)}function la(a){E.emit(ops.OdtDocument.signalUndoStackChanged,
a)}function aa(){return V?(V.moveBackward(1),ya.trigger(),!0):!1}function ma(){return V?(V.moveForward(1),ya.trigger(),!0):!1}function T(){var a=fa.getSelection(),b=0<a.rangeCount&&f(a);sa&&b&&(ta=!0,va.clearSelection(),Fa.setUnfilteredPosition(a.focusNode,a.focusOffset),Ba.acceptPosition(Fa)===g&&(2===za?h(b.range):3<=za&&r(b.range),n.setSelectedRange(b.range,b.hasForwardSelection),E.emit(ops.OdtDocument.signalCursorMoved,n)))}function $(a){var b=a.target||a.srcElement,c=E.getCursor(e);if(sa=b&&
ha.containsNode(E.getOdfCanvas().getElement(),b))ta=!1,Ba=E.createRootFilter(b),za=a.detail,c&&a.shiftKey&&fa.getSelection().collapse(c.getAnchorNode(),0),1<za&&T()}function W(a){var b=a.target||a.srcElement,e=a.detail,g=a.clientX,h=a.clientY;xa.processRequests();ia.isImage(b)&&ia.isCharacterFrame(b.parentNode)?d(b.parentNode):sa&&!va.isSelectorElement(b)&&(ta?c(n.getSelectedRange(),n.hasForwardSelection(),a.detail):runtime.setTimeout(function(){var a;a=(a=fa.getSelection())?{anchorNode:a.anchorNode,
anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}:null;var b;if(!a.anchorNode&&!a.focusNode){var d=E.getDOM();b=null;d.caretRangeFromPoint?(d=d.caretRangeFromPoint(g,h),b={container:d.startContainer,offset:d.startOffset}):d.caretPositionFromPoint&&(d=d.caretPositionFromPoint(g,h))&&d.offsetNode&&(b={container:d.offsetNode,offset:d.offset});if(!b)return;a.anchorNode=b.container;a.anchorOffset=b.offset;a.focusNode=a.anchorNode;a.focusOffset=a.anchorOffset}a=f(a);c(a.range,
a.hasForwardSelection,e)},0));za=0;ta=sa=!1}function da(a){W(a)}function S(a){var b=a.target||a.srcElement,c=null;"annotationRemoveButton"===b.className?(c=ha.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0],ua.removeAnnotation(c)):W(a)}function ga(a){return function(){a();return!0}}function D(a){return function(b){return E.getCursor(e).getSelectionType()===ops.OdtCursor.RangeSelection?a(b):!0}}var fa=runtime.getWindow(),E=k.getOdtDocument(),pa=new core.Async,ha=new core.DomUtils,
ia=new odf.OdfUtils,Ea=new gui.Clipboard,M=new gui.KeyboardHandler,qa=new gui.KeyboardHandler,ra=new core.PositionFilterChain,wa=E.getPositionFilter(),sa=!1,Aa=new odf.ObjectNameGenerator(E.getOdfCanvas().odfContainer(),e),ta=!1,Ba=null,V=null,J=new gui.EventManager(E),ua=new gui.AnnotationController(k,e),na=new gui.DirectTextStyler(k,e),ea=m&&m.directParagraphStylingEnabled?new gui.DirectParagraphStyler(k,e,Aa):null,oa=new gui.TextManipulator(k,e,na.createCursorStyleOp),Ca=new gui.ImageManager(k,
e,Aa),va=new gui.ImageSelector(E.getOdfCanvas()),Fa=gui.SelectionMover.createPositionIterator(E.getRootNode()),xa,Da=!1,ya,Ga=new gui.PlainTextPasteboard(E,e),za=0;runtime.assert(null!==fa,"Expected to be run in an environment which has a global window, like a browser.");ra.addFilter("BaseFilter",wa);ra.addFilter("RootFilter",E.createRootFilter(e));this.selectRange=c;this.moveCursorToLeft=u;this.moveCursorToDocumentBoundary=ka;this.extendSelectionToEntireDocument=K;this.startEditing=function(){var a;
E.getOdfCanvas().getElement().classList.add("virtualSelections");J.subscribe("keydown",M.handleEvent);J.subscribe("keypress",qa.handleEvent);J.subscribe("keyup",q);J.subscribe("beforecut",H);J.subscribe("cut",Y);J.subscribe("copy",X);J.subscribe("beforepaste",L);J.subscribe("paste",Q);J.subscribe("mousedown",$);J.subscribe("mousemove",xa.trigger);J.subscribe("mouseup",S);J.subscribe("contextmenu",da);J.subscribe("focus",C);E.subscribe(ops.OdtDocument.signalOperationExecuted,ya.trigger);E.subscribe(ops.OdtDocument.signalOperationExecuted,
ca);a=new ops.OpAddCursor;a.init({memberid:e});k.enqueue([a]);V&&V.saveInitialState()};this.endEditing=function(){var a;a=new ops.OpRemoveCursor;a.init({memberid:e});k.enqueue([a]);V&&V.resetInitialState();E.unsubscribe(ops.OdtDocument.signalOperationExecuted,ca);E.unsubscribe(ops.OdtDocument.signalOperationExecuted,ya.trigger);J.unsubscribe("keydown",M.handleEvent);J.unsubscribe("keypress",qa.handleEvent);J.unsubscribe("keyup",q);J.unsubscribe("cut",Y);J.unsubscribe("beforecut",H);J.unsubscribe("copy",
X);J.unsubscribe("paste",Q);J.unsubscribe("beforepaste",L);J.unsubscribe("mousemove",xa.trigger);J.unsubscribe("mousedown",$);J.unsubscribe("mouseup",S);J.unsubscribe("contextmenu",da);J.unsubscribe("focus",C);E.getOdfCanvas().getElement().classList.remove("virtualSelections")};this.getInputMemberId=function(){return e};this.getSession=function(){return k};this.setUndoManager=function(a){V&&V.unsubscribe(gui.UndoManager.signalUndoStackChanged,la);if(V=a)V.setOdtDocument(E),V.setPlaybackFunction(function(a){a.execute(E)}),
V.subscribe(gui.UndoManager.signalUndoStackChanged,la)};this.getUndoManager=function(){return V};this.getAnnotationController=function(){return ua};this.getDirectTextStyler=function(){return na};this.getDirectParagraphStyler=function(){return ea};this.getImageManager=function(){return Ca};this.getTextManipulator=function(){return oa};this.getEventManager=function(){return J};this.getKeyboardHandlers=function(){return{keydown:M,keypress:qa}};this.destroy=function(a){var b=[xa.destroy,na.destroy];ea&&
b.push(ea.destroy);pa.destroyAll(b,a)};(function(){var a=-1!==fa.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;xa=new core.ScheduledTask(T,0);ya=new core.ScheduledTask(I,0);M.bind(c.Tab,b.None,D(function(){oa.insertText("\t");return!0}));M.bind(c.Left,b.None,D(u));M.bind(c.Right,b.None,D(B));M.bind(c.Up,b.None,D(t));M.bind(c.Down,b.None,D(s));M.bind(c.Backspace,b.None,ga(oa.removeTextByBackspaceKey));M.bind(c.Delete,b.None,oa.removeTextByDeleteKey);
M.bind(c.Left,b.Shift,D(w));M.bind(c.Right,b.Shift,D(y));M.bind(c.Up,b.Shift,D(N));M.bind(c.Down,b.Shift,D(z));M.bind(c.Home,b.None,D(R));M.bind(c.End,b.None,D(F));M.bind(c.Home,b.Ctrl,D(G));M.bind(c.End,b.Ctrl,D(Z));M.bind(c.Home,b.Shift,D(U));M.bind(c.End,b.Shift,D(P));M.bind(c.Up,b.CtrlShift,D(A));M.bind(c.Down,b.CtrlShift,D(ja));M.bind(c.Home,b.CtrlShift,D(O));M.bind(c.End,b.CtrlShift,D(ba));a?(M.bind(c.Clear,b.None,oa.removeCurrentSelection),M.bind(c.Left,b.Meta,D(R)),M.bind(c.Right,b.Meta,D(F)),
M.bind(c.Home,b.Meta,D(G)),M.bind(c.End,b.Meta,D(Z)),M.bind(c.Left,b.MetaShift,D(U)),M.bind(c.Right,b.MetaShift,D(P)),M.bind(c.Up,b.AltShift,D(A)),M.bind(c.Down,b.AltShift,D(ja)),M.bind(c.Up,b.MetaShift,D(O)),M.bind(c.Down,b.MetaShift,D(ba)),M.bind(c.A,b.Meta,D(K)),M.bind(c.B,b.Meta,D(na.toggleBold)),M.bind(c.I,b.Meta,D(na.toggleItalic)),M.bind(c.U,b.Meta,D(na.toggleUnderline)),ea&&(M.bind(c.L,b.MetaShift,D(ea.alignParagraphLeft)),M.bind(c.E,b.MetaShift,D(ea.alignParagraphCenter)),M.bind(c.R,b.MetaShift,
D(ea.alignParagraphRight)),M.bind(c.J,b.MetaShift,D(ea.alignParagraphJustified))),ua&&M.bind(c.C,b.MetaShift,ua.addAnnotation),M.bind(c.Z,b.Meta,aa),M.bind(c.Z,b.MetaShift,ma)):(M.bind(c.A,b.Ctrl,D(K)),M.bind(c.B,b.Ctrl,D(na.toggleBold)),M.bind(c.I,b.Ctrl,D(na.toggleItalic)),M.bind(c.U,b.Ctrl,D(na.toggleUnderline)),ea&&(M.bind(c.L,b.CtrlShift,D(ea.alignParagraphLeft)),M.bind(c.E,b.CtrlShift,D(ea.alignParagraphCenter)),M.bind(c.R,b.CtrlShift,D(ea.alignParagraphRight)),M.bind(c.J,b.CtrlShift,D(ea.alignParagraphJustified))),
ua&&M.bind(c.C,b.CtrlAlt,ua.addAnnotation),M.bind(c.Z,b.Ctrl,aa),M.bind(c.Z,b.CtrlShift,ma));qa.setDefault(D(function(a){var b;b=null===a.which||void 0===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(oa.insertText(b),!0)}));qa.bind(c.Enter,b.None,D(oa.enqueueParagraphSplittingOps))})()};return gui.SessionController}();
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
runtime.loadClass("gui.Caret");
gui.CaretManager=function(g){function k(a){return c.hasOwnProperty(a)?c[a]:null}function e(){return Object.keys(c).map(function(a){return c[a]})}function n(a){a===g.getInputMemberId()&&g.getSession().getOdtDocument().getOdfCanvas().getElement().removeAttribute("tabindex");delete c[a]}function m(a){a=a.getMemberId();a===g.getInputMemberId()&&(a=k(a))&&a.refreshCursorBlinking()}function q(){var a=k(g.getInputMemberId());l=!1;a&&a.ensureVisible()}function b(){var a=k(g.getInputMemberId());a&&(a.handleUpdate(),
l||(l=!0,runtime.setTimeout(q,50)))}function h(a){a.memberId===g.getInputMemberId()&&b()}function r(){var a=k(g.getInputMemberId());a&&a.setFocus()}function d(){var a=k(g.getInputMemberId());a&&a.removeFocus()}function f(){var a=k(g.getInputMemberId());a&&a.show()}function a(){var a=k(g.getInputMemberId());a&&a.hide()}var c={},p=runtime.getWindow(),l=!1;this.registerCursor=function(a,d,e){var f=a.getMemberId();d=new gui.Caret(a,d,e);c[f]=d;f===g.getInputMemberId()?(runtime.log("Starting to track input on new cursor of "+
f),a.handleUpdate=b,g.getSession().getOdtDocument().getOdfCanvas().getElement().setAttribute("tabindex",-1),g.getEventManager().focus()):a.handleUpdate=d.handleUpdate;return d};this.getCaret=k;this.getCarets=e;this.destroy=function(b){var k=g.getSession().getOdtDocument(),l=g.getEventManager(),q=e();k.unsubscribe(ops.OdtDocument.signalParagraphChanged,h);k.unsubscribe(ops.OdtDocument.signalCursorMoved,m);k.unsubscribe(ops.OdtDocument.signalCursorRemoved,n);l.unsubscribe("focus",r);l.unsubscribe("blur",
d);p.removeEventListener("focus",f,!1);p.removeEventListener("blur",a,!1);(function t(a,c){c?b(c):a<q.length?q[a].destroy(function(b){t(a+1,b)}):b()})(0,void 0);c={}};(function(){var b=g.getSession().getOdtDocument(),c=g.getEventManager();b.subscribe(ops.OdtDocument.signalParagraphChanged,h);b.subscribe(ops.OdtDocument.signalCursorMoved,m);b.subscribe(ops.OdtDocument.signalCursorRemoved,n);c.subscribe("focus",r);c.subscribe("blur",d);p.addEventListener("focus",f,!1);p.addEventListener("blur",a,!1)})()};
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
runtime.loadClass("gui.Caret");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
gui.SessionView=function(){return function(g,k,e,n,m){function q(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid="'+a+'"]'+e+c;a:{var f=u.firstChild;for(b=b+'[editinfo|memberid="'+a+'"]'+e+"{";f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:u.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',
":before");d("dc|creator","{ background-color: "+c+"; }","");d("div.selectionOverlay","{ background-color: "+c+";}","")}function b(a){var b,c;for(c in w)w.hasOwnProperty(c)&&(b=w[c],a?b.show():b.hide())}function h(a){n.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function r(a){var b=a.getMemberId();a=a.getProperties();q(b,a.fullName,a.color);k===b&&q("","",a.color)}function d(a){var b=a.getMemberId(),c=e.getOdtDocument().getMember(b).getProperties();n.registerCursor(a,v,t);m.registerCursor(a,
!0);if(a=n.getCaret(b))a.setAvatarImageUrl(c.imageUrl),a.setColor(c.color);runtime.log("+++ View here +++ eagerly created an Caret for '"+b+"'! +++")}function f(a){a=a.getMemberId();var b=m.getSelectionView(k),c=m.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),d=n.getCaret(k);a===k?(c.hide(),b&&b.show(),d&&d.show()):a===gui.ShadowCursor.ShadowCursorMemberId&&(c.show(),b&&b.hide(),d&&d.hide())}function a(a){m.removeSelectionView(a)}function c(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;
var d,f="",g=b.getElementsByTagNameNS(B,"editinfo")[0];g?(f=g.getAttributeNS(B,"id"),d=w[f]):(f=Math.random().toString(),d=new ops.EditInfo(b,e.getOdtDocument()),d=new gui.EditInfoMarker(d,y),g=b.getElementsByTagNameNS(B,"editinfo")[0],g.setAttributeNS(B,"id",f),w[f]=d);d.addEdit(c,new Date(a))}function p(){N=!0}function l(){s=runtime.getWindow().setInterval(function(){N&&(m.rerenderSelectionViews(),N=!1)},200)}var u,B="urn:webodf:names:editinfo",w={},y=void 0!==g.editInfoMarkersInitiallyVisible?
Boolean(g.editInfoMarkersInitiallyVisible):!0,v=void 0!==g.caretAvatarsInitiallyVisible?Boolean(g.caretAvatarsInitiallyVisible):!0,t=void 0!==g.caretBlinksOnRangeSelect?Boolean(g.caretBlinksOnRangeSelect):!0,s,N=!1;this.showEditInfoMarkers=function(){y||(y=!0,b(y))};this.hideEditInfoMarkers=function(){y&&(y=!1,b(y))};this.showCaretAvatars=function(){v||(v=!0,h(v))};this.hideCaretAvatars=function(){v&&(v=!1,h(v))};this.getSession=function(){return e};this.getCaret=function(a){return n.getCaret(a)};
this.destroy=function(b){var g=e.getOdtDocument(),h=Object.keys(w).map(function(a){return w[a]});g.unsubscribe(ops.OdtDocument.signalMemberAdded,r);g.unsubscribe(ops.OdtDocument.signalMemberUpdated,r);g.unsubscribe(ops.OdtDocument.signalCursorAdded,d);g.unsubscribe(ops.OdtDocument.signalCursorRemoved,a);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,c);g.unsubscribe(ops.OdtDocument.signalCursorMoved,f);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,p);g.unsubscribe(ops.OdtDocument.signalTableAdded,
p);g.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,p);runtime.getWindow().clearInterval(s);u.parentNode.removeChild(u);(function U(a,c){c?b(c):a<h.length?h[a].destroy(function(b){U(a+1,b)}):b()})(0,void 0)};(function(){var b=e.getOdtDocument(),g=document.getElementsByTagName("head")[0];b.subscribe(ops.OdtDocument.signalMemberAdded,r);b.subscribe(ops.OdtDocument.signalMemberUpdated,r);b.subscribe(ops.OdtDocument.signalCursorAdded,d);b.subscribe(ops.OdtDocument.signalCursorRemoved,a);b.subscribe(ops.OdtDocument.signalParagraphChanged,
c);b.subscribe(ops.OdtDocument.signalCursorMoved,f);l();b.subscribe(ops.OdtDocument.signalParagraphChanged,p);b.subscribe(ops.OdtDocument.signalTableAdded,p);b.subscribe(ops.OdtDocument.signalParagraphStyleModified,p);u=document.createElementNS(g.namespaceURI,"style");u.type="text/css";u.media="screen, print, handheld, projection";u.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));u.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));
g.appendChild(u)})()}}();
// Input 101
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let's not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\n.virtualSelections office|document *::selection {\n  background: transparent;\n}\n.virtualSelections office|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    z-index: 15;\n    opacity: 0.2;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n";
