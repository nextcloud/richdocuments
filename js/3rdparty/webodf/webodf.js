// Input 0
var webodf_version="0.4.2-1579-gfc3a4e6";
// Input 1
function Runtime(){}Runtime.prototype.getVariable=function(g){};Runtime.prototype.toJson=function(g){};Runtime.prototype.fromJson=function(g){};Runtime.prototype.byteArrayFromString=function(g,l){};Runtime.prototype.byteArrayToString=function(g,l){};Runtime.prototype.read=function(g,l,f,p){};Runtime.prototype.readFile=function(g,l,f){};Runtime.prototype.readFileSync=function(g,l){};Runtime.prototype.loadXML=function(g,l){};Runtime.prototype.writeFile=function(g,l,f){};
Runtime.prototype.isFile=function(g,l){};Runtime.prototype.getFileSize=function(g,l){};Runtime.prototype.deleteFile=function(g,l){};Runtime.prototype.log=function(g,l){};Runtime.prototype.setTimeout=function(g,l){};Runtime.prototype.clearTimeout=function(g){};Runtime.prototype.libraryPaths=function(){};Runtime.prototype.currentDirectory=function(){};Runtime.prototype.setCurrentDirectory=function(g){};Runtime.prototype.type=function(){};Runtime.prototype.getDOMImplementation=function(){};
Runtime.prototype.parseXML=function(g){};Runtime.prototype.exit=function(g){};Runtime.prototype.getWindow=function(){};Runtime.prototype.assert=function(g,l,f){};var IS_COMPILED_CODE=!0;
Runtime.byteArrayToString=function(g,l){function f(f){var h="",d,m=f.length;for(d=0;d<m;d+=1)h+=String.fromCharCode(f[d]&255);return h}function p(f){var h="",d,m=f.length,c=[],e,a,b,q;for(d=0;d<m;d+=1)e=f[d],128>e?c.push(e):(d+=1,a=f[d],194<=e&&224>e?c.push((e&31)<<6|a&63):(d+=1,b=f[d],224<=e&&240>e?c.push((e&15)<<12|(a&63)<<6|b&63):(d+=1,q=f[d],240<=e&&245>e&&(e=(e&7)<<18|(a&63)<<12|(b&63)<<6|q&63,e-=65536,c.push((e>>10)+55296,(e&1023)+56320))))),1E3===c.length&&(h+=String.fromCharCode.apply(null,
c),c.length=0);return h+String.fromCharCode.apply(null,c)}var r;"utf8"===l?r=p(g):("binary"!==l&&this.log("Unsupported encoding: "+l),r=f(g));return r};Runtime.getVariable=function(g){try{return eval(g)}catch(l){}};Runtime.toJson=function(g){return JSON.stringify(g)};Runtime.fromJson=function(g){return JSON.parse(g)};Runtime.getFunctionName=function(g){return void 0===g.name?(g=/function\s+(\w+)/.exec(g))&&g[1]:g.name};
function BrowserRuntime(g){function l(d,m){var c,e,a;void 0!==m?a=d:m=d;g?(e=g.ownerDocument,a&&(c=e.createElement("span"),c.className=a,c.appendChild(e.createTextNode(a)),g.appendChild(c),g.appendChild(e.createTextNode(" "))),c=e.createElement("span"),0<m.length&&"<"===m[0]?c.innerHTML=m:c.appendChild(e.createTextNode(m)),g.appendChild(c),g.appendChild(e.createElement("br"))):console&&console.log(m);"alert"===a&&alert(m)}function f(d,m,c){if(0!==c.status||c.responseText)if(200===c.status||0===c.status){if(c.response&&
"string"!==typeof c.response)"binary"===m?(m=c.response,m=new Uint8Array(m)):m=String(c.response);else if("binary"===m)if(null!==c.responseBody&&"undefined"!==String(typeof VBArray)){m=(new VBArray(c.responseBody)).toArray();c=m.length;var e,a=new Uint8Array(new ArrayBuffer(c));for(e=0;e<c;e+=1)a[e]=m[e];m=a}else m=n.byteArrayFromString(c.responseText,"binary");else m=c.responseText;h[d]=m;d={err:null,data:m}}else d={err:c.responseText||c.statusText,data:null};else d={err:"File "+d+" is empty.",data:null};
return d}function p(d,m,c){var e=new XMLHttpRequest;e.open("GET",d,c);e.overrideMimeType&&("binary"!==m?e.overrideMimeType("text/plain; charset="+m):e.overrideMimeType("text/plain; charset=x-user-defined"));return e}function r(d,m,c){function e(){var b;4===a.readyState&&(b=f(d,m,a),c(b.err,b.data))}if(h.hasOwnProperty(d))c(null,h[d]);else{var a=p(d,m,!0);a.onreadystatechange=e;try{a.send(null)}catch(b){c(b.message,null)}}}var n=this,h={};this.byteArrayFromString=function(d,m){var c;if("utf8"===m){c=
d.length;var e,a,b,q=0;for(a=0;a<c;a+=1)b=d.charCodeAt(a),q+=1+(128<b)+(2048<b);e=new Uint8Array(new ArrayBuffer(q));for(a=q=0;a<c;a+=1)b=d.charCodeAt(a),128>b?(e[q]=b,q+=1):2048>b?(e[q]=192|b>>>6,e[q+1]=128|b&63,q+=2):(e[q]=224|b>>>12&15,e[q+1]=128|b>>>6&63,e[q+2]=128|b&63,q+=3)}else for("binary"!==m&&n.log("unknown encoding: "+m),c=d.length,e=new Uint8Array(new ArrayBuffer(c)),a=0;a<c;a+=1)e[a]=d.charCodeAt(a)&255;return c=e};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;
this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=r;this.read=function(d,m,c,e){r(d,"binary",function(a,b){var q=null;if(b){if("string"===typeof b)throw"This should not happen.";q=b.subarray(m,m+c)}e(a,q)})};this.readFileSync=function(d,m){var c=p(d,m,!1),e;try{c.send(null);e=f(d,m,c);if(e.err)throw e.err;if(null===e.data)throw"No data read from "+d+".";}catch(a){throw a;}return e.data};this.writeFile=function(d,m,c){h[d]=m;var e=new XMLHttpRequest,a;e.open("PUT",d,!0);e.onreadystatechange=
function(){4===e.readyState&&(0!==e.status||e.responseText?200<=e.status&&300>e.status||0===e.status?c(null):c("Status "+String(e.status)+": "+e.responseText||e.statusText):c("File "+d+" is empty."))};a=m.buffer&&!e.sendAsBinary?m.buffer:n.byteArrayToString(m,"binary");try{e.sendAsBinary?e.sendAsBinary(a):e.send(a)}catch(b){n.log("HUH? "+b+" "+m),c(b.message)}};this.deleteFile=function(d,m){delete h[d];var c=new XMLHttpRequest;c.open("DELETE",d,!0);c.onreadystatechange=function(){4===c.readyState&&
(200>c.status&&300<=c.status?m(c.responseText):m(null))};c.send(null)};this.loadXML=function(d,m){var c=new XMLHttpRequest;c.open("GET",d,!0);c.overrideMimeType&&c.overrideMimeType("text/xml");c.onreadystatechange=function(){4===c.readyState&&(0!==c.status||c.responseText?200===c.status||0===c.status?m(null,c.responseXML):m(c.responseText,null):m("File "+d+" is empty.",null))};try{c.send(null)}catch(e){m(e.message,null)}};this.isFile=function(d,m){n.getFileSize(d,function(c){m(-1!==c)})};this.getFileSize=
function(d,m){if(h.hasOwnProperty(d)&&"string"!==typeof h[d])m(h[d].length);else{var c=new XMLHttpRequest;c.open("HEAD",d,!0);c.onreadystatechange=function(){if(4===c.readyState){var e=c.getResponseHeader("Content-Length");e?m(parseInt(e,10)):r(d,"binary",function(a,b){a?m(-1):m(b.length)})}};c.send(null)}};this.log=l;this.assert=function(d,m,c){if(!d)throw l("alert","ASSERTION FAILED:\n"+m),c&&c(),m;};this.setTimeout=function(d,m){return setTimeout(function(){d()},m)};this.clearTimeout=function(d){clearTimeout(d)};
this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(){};this.currentDirectory=function(){return""};this.type=function(){return"BrowserRuntime"};this.getDOMImplementation=function(){return window.document.implementation};this.parseXML=function(d){return(new DOMParser).parseFromString(d,"text/xml")};this.exit=function(d){l("Calling exit with code "+String(d)+", but exit() is not implemented.")};this.getWindow=function(){return window}}
function NodeJSRuntime(){function g(d){var c=d.length,e,a=new Uint8Array(new ArrayBuffer(c));for(e=0;e<c;e+=1)a[e]=d[e];return a}function l(d,c,e){function a(a,c){if(a)return e(a,null);if(!c)return e("No data for "+d+".",null);if("string"===typeof c)return e(a,c);e(a,g(c))}d=r.resolve(n,d);"binary"!==c?p.readFile(d,c,a):p.readFile(d,null,a)}var f=this,p=require("fs"),r=require("path"),n="",h,d;this.byteArrayFromString=function(d,c){var e=new Buffer(d,c),a,b=e.length,q=new Uint8Array(new ArrayBuffer(b));
for(a=0;a<b;a+=1)q[a]=e[a];return q};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.readFile=l;this.loadXML=function(d,c){l(d,"utf-8",function(e,a){if(e)return c(e,null);if(!a)return c("No data for "+d+".",null);c(null,f.parseXML(a))})};this.writeFile=function(d,c,e){c=new Buffer(c);d=r.resolve(n,d);p.writeFile(d,c,"binary",function(a){e(a||null)})};this.deleteFile=function(d,c){d=r.resolve(n,d);
p.unlink(d,c)};this.read=function(d,c,e,a){d=r.resolve(n,d);p.open(d,"r+",666,function(b,q){if(b)a(b,null);else{var k=new Buffer(e);p.read(q,k,0,e,c,function(b){p.close(q);a(b,g(k))})}})};this.readFileSync=function(d,c){var e;e=p.readFileSync(d,"binary"===c?null:c);if(null===e)throw"File "+d+" could not be read.";"binary"===c&&(e=g(e));return e};this.isFile=function(d,c){d=r.resolve(n,d);p.stat(d,function(e,a){c(!e&&a.isFile())})};this.getFileSize=function(d,c){d=r.resolve(n,d);p.stat(d,function(e,
a){e?c(-1):c(a.size)})};this.log=function(d,c){var e;void 0!==c?e=d:c=d;"alert"===e&&process.stderr.write("\n!!!!! ALERT !!!!!\n");process.stderr.write(c+"\n");"alert"===e&&process.stderr.write("!!!!! ALERT !!!!!\n")};this.assert=function(d,c,e){d||(process.stderr.write("ASSERTION FAILED: "+c),e&&e())};this.setTimeout=function(d,c){return setTimeout(function(){d()},c)};this.clearTimeout=function(d){clearTimeout(d)};this.libraryPaths=function(){return[__dirname]};this.setCurrentDirectory=function(d){n=
d};this.currentDirectory=function(){return n};this.type=function(){return"NodeJSRuntime"};this.getDOMImplementation=function(){return d};this.parseXML=function(d){return h.parseFromString(d,"text/xml")};this.exit=process.exit;this.getWindow=function(){return null};h=new (require("xmldom").DOMParser);d=f.parseXML("<a/>").implementation}
function RhinoRuntime(){function g(d,h){var c;void 0!==h?c=d:h=d;"alert"===c&&print("\n!!!!! ALERT !!!!!");print(h);"alert"===c&&print("!!!!! ALERT !!!!!")}var l=this,f={},p=f.javax.xml.parsers.DocumentBuilderFactory.newInstance(),r,n,h="";p.setValidating(!1);p.setNamespaceAware(!0);p.setExpandEntityReferences(!1);p.setSchema(null);n=f.org.xml.sax.EntityResolver({resolveEntity:function(d,h){var c=new f.java.io.FileReader(h);return new f.org.xml.sax.InputSource(c)}});r=p.newDocumentBuilder();r.setEntityResolver(n);
this.byteArrayFromString=function(d,h){var c,e=d.length,a=new Uint8Array(new ArrayBuffer(e));for(c=0;c<e;c+=1)a[c]=d.charCodeAt(c)&255;return a};this.byteArrayToString=Runtime.byteArrayToString;this.getVariable=Runtime.getVariable;this.fromJson=Runtime.fromJson;this.toJson=Runtime.toJson;this.loadXML=function(d,h){var c=new f.java.io.File(d),e=null;try{e=r.parse(c)}catch(a){return print(a),h(a,null)}h(null,e)};this.readFile=function(d,m,c){h&&(d=h+"/"+d);var e=new f.java.io.File(d),a="binary"===m?
"latin1":m;e.isFile()?((d=readFile(d,a))&&"binary"===m&&(d=l.byteArrayFromString(d,"binary")),c(null,d)):c(d+" is not a file.",null)};this.writeFile=function(d,m,c){h&&(d=h+"/"+d);d=new f.java.io.FileOutputStream(d);var e,a=m.length;for(e=0;e<a;e+=1)d.write(m[e]);d.close();c(null)};this.deleteFile=function(d,m){h&&(d=h+"/"+d);var c=new f.java.io.File(d),e=d+Math.random(),e=new f.java.io.File(e);c.rename(e)?(e.deleteOnExit(),m(null)):m("Could not delete "+d)};this.read=function(d,m,c,e){h&&(d=h+"/"+
d);var a;a=d;var b="binary";(new f.java.io.File(a)).isFile()?("binary"===b&&(b="latin1"),a=readFile(a,b)):a=null;a?e(null,this.byteArrayFromString(a.substring(m,m+c),"binary")):e("Cannot read "+d,null)};this.readFileSync=function(d,h){if(!h)return"";var c=readFile(d,h);if(null===c)throw"File could not be read.";return c};this.isFile=function(d,m){h&&(d=h+"/"+d);var c=new f.java.io.File(d);m(c.isFile())};this.getFileSize=function(d,m){h&&(d=h+"/"+d);var c=new f.java.io.File(d);m(c.length())};this.log=
g;this.assert=function(d,h,c){d||(g("alert","ASSERTION FAILED: "+h),c&&c())};this.setTimeout=function(d){d();return 0};this.clearTimeout=function(){};this.libraryPaths=function(){return["lib"]};this.setCurrentDirectory=function(d){h=d};this.currentDirectory=function(){return h};this.type=function(){return"RhinoRuntime"};this.getDOMImplementation=function(){return r.getDOMImplementation()};this.parseXML=function(d){d=new f.java.io.StringReader(d);d=new f.org.xml.sax.InputSource(d);return r.parse(d)};
this.exit=quit;this.getWindow=function(){return null}}Runtime.create=function(){return"undefined"!==String(typeof window)?new BrowserRuntime(window.document.getElementById("logoutput")):"undefined"!==String(typeof require)?new NodeJSRuntime:new RhinoRuntime};var runtime=Runtime.create(),core={},gui={},xmldom={},odf={},ops={};
(function(){function g(h,d){var f=h+"/manifest.json",c,e;if(!n.hasOwnProperty(f)){n[f]=1;try{c=runtime.readFileSync(f,"utf-8")}catch(a){console.log(String(a));return}f=JSON.parse(c);for(e in f)f.hasOwnProperty(e)&&(d[e]={dir:h,deps:f[e]})}}function l(h,d,f){var c=d[h].deps,e={};f[h]=e;c.forEach(function(a){e[a]=1});c.forEach(function(a){f[a]||l(a,d,f)});c.forEach(function(a){Object.keys(f[a]).forEach(function(a){e[a]=1})})}function f(h,d){function f(a,b){var c,k=d[a];if(-1===e.indexOf(a)&&-1===b.indexOf(a)){b.push(a);
for(c=0;c<h.length;c+=1)k[h[c]]&&f(h[c],b);b.pop();e.push(a)}}var c,e=[];for(c=0;c<h.length;c+=1)f(h[c],[]);return e}function p(h,d){for(var f=0;f<h.length&&void 0!==d[f];)null!==d[f]&&(eval(d[f]),d[f]=null),f+=1}var r={},n={};runtime.loadClass=function(h){if(!IS_COMPILED_CODE){var d=h.replace(".","/")+".js";if(!n.hasOwnProperty(d)){if(!(0<Object.keys(r).length)){var m=runtime.libraryPaths(),d={},c;runtime.currentDirectory()&&g(runtime.currentDirectory(),d);for(c=0;c<m.length;c+=1)g(m[c],d);var e;
c={};for(e in d)d.hasOwnProperty(e)&&l(e,d,c);for(e in d)d.hasOwnProperty(e)&&(m=Object.keys(c[e]),d[e].deps=f(m,c),d[e].deps.push(e));r=d}e=h.replace(".","/")+".js";h=[];e=r[e].deps;for(d=0;d<e.length;d+=1)n.hasOwnProperty(e[d])||h.push(e[d]);e=[];e.length=h.length;for(d=h.length-1;0<=d;d-=1)n[h[d]]=1,void 0===e[d]&&(m=h[d],m=r[m].dir+"/"+m,c=runtime.readFileSync(m,"utf-8"),c+="\n//# sourceURL="+m,c+="\n//@ sourceURL="+m,e[d]=c);p(h,e)}}}})();
(function(){var g=function(g){return g};runtime.getTranslator=function(){return g};runtime.setTranslator=function(l){g=l};runtime.tr=function(l){var f=g(l);return f&&"string"===String(typeof f)?f:l}})();
(function(g){function l(f){if(f.length){var g=f[0];runtime.readFile(g,"utf8",function(l,n){function h(){var c;(c=eval(m))&&runtime.exit(c)}var d="",m=n;-1!==g.indexOf("/")&&(d=g.substring(0,g.indexOf("/")));runtime.setCurrentDirectory(d);l?(runtime.log(l),runtime.exit(1)):null===m?(runtime.log("No code found for "+g),runtime.exit(1)):h.apply(null,f)})}}g=g?Array.prototype.slice.call(g):[];"NodeJSRuntime"===runtime.type()?l(process.argv.slice(2)):"RhinoRuntime"===runtime.type()?l(g):l(g.slice(1))})("undefined"!==
String(typeof arguments)&&arguments);
// Input 2
core.Async=function(){this.forEach=function(g,l,f){function p(d){h!==n&&(d?(h=n,f(d)):(h+=1,h===n&&f(null)))}var r,n=g.length,h=0;for(r=0;r<n;r+=1)l(g[r],p)};this.destroyAll=function(g,l){function f(p,r){if(r)l(r);else if(p<g.length)g[p](function(g){f(p+1,g)});else l()}f(0,void 0)}};
// Input 3
function makeBase64(){function g(a){var b,c=a.length,e=new Uint8Array(new ArrayBuffer(c));for(b=0;b<c;b+=1)e[b]=a.charCodeAt(b)&255;return e}function l(a){var b,c="",e,q=a.length-2;for(e=0;e<q;e+=3)b=a[e]<<16|a[e+1]<<8|a[e+2],c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b>>>18],c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b>>>12&63],c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b>>>6&63],c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b&
63];e===q+1?(b=a[e]<<4,c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b>>>6],c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b&63],c+="=="):e===q&&(b=a[e]<<10|a[e+1]<<2,c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b>>>12],c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b>>>6&63],c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[b&63],c+="=");return c}function f(a){a=a.replace(/[^A-Za-z0-9+\/]+/g,
"");var b=a.length,c=new Uint8Array(new ArrayBuffer(3*b)),e=a.length%4,q=0,d,f;for(d=0;d<b;d+=4)f=(k[a.charAt(d)]||0)<<18|(k[a.charAt(d+1)]||0)<<12|(k[a.charAt(d+2)]||0)<<6|(k[a.charAt(d+3)]||0),c[q]=f>>16,c[q+1]=f>>8&255,c[q+2]=f&255,q+=3;b=3*b-[0,0,2,1][e];return c.subarray(0,b)}function p(a){var b,c,e=a.length,q=0,k=new Uint8Array(new ArrayBuffer(3*e));for(b=0;b<e;b+=1)c=a[b],128>c?k[q++]=c:(2048>c?k[q++]=192|c>>>6:(k[q++]=224|c>>>12&15,k[q++]=128|c>>>6&63),k[q++]=128|c&63);return k.subarray(0,
q)}function r(a){var b,c,e,q,k=a.length,d=new Uint8Array(new ArrayBuffer(k)),f=0;for(b=0;b<k;b+=1)c=a[b],128>c?d[f++]=c:(b+=1,e=a[b],224>c?d[f++]=(c&31)<<6|e&63:(b+=1,q=a[b],d[f++]=(c&15)<<12|(e&63)<<6|q&63));return d.subarray(0,f)}function n(a){return l(g(a))}function h(a){return String.fromCharCode.apply(String,f(a))}function d(a){return r(g(a))}function m(a){a=r(a);for(var b="",c=0;c<a.length;)b+=String.fromCharCode.apply(String,a.subarray(c,c+45E3)),c+=45E3;return b}function c(a,b,c){var e,q,
k,d="";for(k=b;k<c;k+=1)b=a.charCodeAt(k)&255,128>b?d+=String.fromCharCode(b):(k+=1,e=a.charCodeAt(k)&255,224>b?d+=String.fromCharCode((b&31)<<6|e&63):(k+=1,q=a.charCodeAt(k)&255,d+=String.fromCharCode((b&15)<<12|(e&63)<<6|q&63)));return d}function e(a,b){function e(){var d=k+1E5;d>a.length&&(d=a.length);q+=c(a,k,d);k=d;d=k===a.length;b(q,d)&&!d&&runtime.setTimeout(e,0)}var q="",k=0;1E5>a.length?b(c(a,0,a.length),!0):("string"!==typeof a&&(a=a.slice()),e())}function a(a){return p(g(a))}function b(a){return String.fromCharCode.apply(String,
p(a))}function q(a){return String.fromCharCode.apply(String,p(g(a)))}var k=function(a){var b={},c,e;c=0;for(e=a.length;c<e;c+=1)b[a.charAt(c)]=c;return b}("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"),t,A,w=runtime.getWindow(),x,v;w&&w.btoa?(x=w.btoa,t=function(a){return x(q(a))}):(x=n,t=function(b){return l(a(b))});w&&w.atob?(v=w.atob,A=function(a){a=v(a);return c(a,0,a.length)}):(v=h,A=function(a){return m(f(a))});core.Base64=function(){this.convertByteArrayToBase64=this.convertUTF8ArrayToBase64=
l;this.convertBase64ToByteArray=this.convertBase64ToUTF8Array=f;this.convertUTF16ArrayToByteArray=this.convertUTF16ArrayToUTF8Array=p;this.convertByteArrayToUTF16Array=this.convertUTF8ArrayToUTF16Array=r;this.convertUTF8StringToBase64=n;this.convertBase64ToUTF8String=h;this.convertUTF8StringToUTF16Array=d;this.convertByteArrayToUTF16String=this.convertUTF8ArrayToUTF16String=m;this.convertUTF8StringToUTF16String=e;this.convertUTF16StringToByteArray=this.convertUTF16StringToUTF8Array=a;this.convertUTF16ArrayToUTF8String=
b;this.convertUTF16StringToUTF8String=q;this.convertUTF16StringToBase64=t;this.convertBase64ToUTF16String=A;this.fromBase64=h;this.toBase64=n;this.atob=v;this.btoa=x;this.utob=q;this.btou=e;this.encode=t;this.encodeURI=function(a){return t(a).replace(/[+\/]/g,function(a){return"+"===a?"-":"_"}).replace(/\\=+$/,"")};this.decode=function(a){return A(a.replace(/[\-_]/g,function(a){return"-"===a?"+":"/"}))};return this};return core.Base64}core.Base64=makeBase64();
// Input 4
core.ByteArray=function(g){this.pos=0;this.data=g;this.readUInt32LE=function(){this.pos+=4;var g=this.data,f=this.pos;return g[--f]<<24|g[--f]<<16|g[--f]<<8|g[--f]};this.readUInt16LE=function(){this.pos+=2;var g=this.data,f=this.pos;return g[--f]<<8|g[--f]}};
// Input 5
core.ByteArrayWriter=function(g){function l(f){f>r-p&&(r=Math.max(2*r,p+f),f=new Uint8Array(new ArrayBuffer(r)),f.set(n),n=f)}var f=this,p=0,r=1024,n=new Uint8Array(new ArrayBuffer(r));this.appendByteArrayWriter=function(h){f.appendByteArray(h.getByteArray())};this.appendByteArray=function(f){var d=f.length;l(d);n.set(f,p);p+=d};this.appendArray=function(f){var d=f.length;l(d);n.set(f,p);p+=d};this.appendUInt16LE=function(h){f.appendArray([h&255,h>>8&255])};this.appendUInt32LE=function(h){f.appendArray([h&
255,h>>8&255,h>>16&255,h>>24&255])};this.appendString=function(h){f.appendByteArray(runtime.byteArrayFromString(h,g))};this.getLength=function(){return p};this.getByteArray=function(){var f=new Uint8Array(new ArrayBuffer(p));f.set(n.subarray(0,p));return f}};
// Input 6
core.CSSUnits=function(){var g=this,l={"in":1,cm:2.54,mm:25.4,pt:72,pc:12};this.convert=function(f,g,r){return f*l[r]/l[g]};this.convertMeasure=function(f,l){var r,n;f&&l?(r=parseFloat(f),n=f.replace(r.toString(),""),r=g.convert(r,n,l).toString()):r="";return r};this.getUnits=function(f){return f.substr(f.length-2,f.length)}};
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
(function(){function g(){var f,g,r,n,h;void 0===l&&(h=(f=runtime.getWindow())&&f.document,l={rangeBCRIgnoresElementBCR:!1,unscaledRangeClientRects:!1},h&&(n=h.createElement("div"),n.style.position="absolute",n.style.left="-99999px",n.style.transform="scale(2)",n.style["-webkit-transform"]="scale(2)",g=h.createElement("div"),n.appendChild(g),h.body.appendChild(n),f=h.createRange(),f.selectNode(g),l.rangeBCRIgnoresElementBCR=0===f.getClientRects().length,g.appendChild(h.createTextNode("Rect transform test")),
g=g.getBoundingClientRect(),r=f.getBoundingClientRect(),l.unscaledRangeClientRects=2<Math.abs(g.height-r.height),f.detach(),h.body.removeChild(n),f=Object.keys(l).map(function(d){return d+":"+String(l[d])}).join(", "),runtime.log("Detected browser quirks - "+f)));return l}var l;core.DomUtils=function(){function f(a,b){return 0>=a.compareBoundaryPoints(Range.START_TO_START,b)&&0<=a.compareBoundaryPoints(Range.END_TO_END,b)}function l(a,b){return 0>=a.compareBoundaryPoints(Range.END_TO_START,b)&&0<=
a.compareBoundaryPoints(Range.START_TO_END,b)}function r(a,b){var c=null;a.nodeType===Node.TEXT_NODE&&(0===a.length?(a.parentNode.removeChild(a),b.nodeType===Node.TEXT_NODE&&(c=b)):(b.nodeType===Node.TEXT_NODE&&(a.appendData(b.data),b.parentNode.removeChild(b)),c=a));return c}function n(a){for(var b=a.parentNode;a.firstChild;)b.insertBefore(a.firstChild,a);b.removeChild(a);return b}function h(a,b){for(var c=a.parentNode,e=a.firstChild,d;e;)d=e.nextSibling,h(e,b),e=d;b(a)&&(c=n(a));return c}function d(a,
b){return a===b||Boolean(a.compareDocumentPosition(b)&Node.DOCUMENT_POSITION_CONTAINED_BY)}function m(a,b){for(var c=0,e;a.parentNode!==b;)runtime.assert(null!==a.parentNode,"parent is null"),a=a.parentNode;for(e=b.firstChild;e!==a;)c+=1,e=e.nextSibling;return c}function c(a,b,e){Object.keys(b).forEach(function(k){var d=k.split(":"),f=d[1],h=e(d[0]),d=b[k];"object"===typeof d&&Object.keys(d).length?(k=h?a.getElementsByTagNameNS(h,f)[0]||a.ownerDocument.createElementNS(h,k):a.getElementsByTagName(f)[0]||
a.ownerDocument.createElement(k),a.appendChild(k),c(k,d,e)):h&&a.setAttributeNS(h,k,String(d))})}var e=null;this.splitBoundaries=function(a){var b=[],c,e;if(a.startContainer.nodeType===Node.TEXT_NODE||a.endContainer.nodeType===Node.TEXT_NODE){if(c=a.endContainer){c=a.endOffset;e=a.endContainer;if(c<e.childNodes.length)for(e=e.childNodes.item(c),c=0;e.firstChild;)e=e.firstChild;else for(;e.lastChild;)e=e.lastChild,c=e.nodeType===Node.TEXT_NODE?e.textContent.length:e.childNodes.length;c={container:e,
offset:c}}a.setEnd(c.container,c.offset);c=a.endContainer;0!==a.endOffset&&c.nodeType===Node.TEXT_NODE&&(e=c,a.endOffset!==e.length&&(b.push(e.splitText(a.endOffset)),b.push(e)));c=a.startContainer;0!==a.startOffset&&c.nodeType===Node.TEXT_NODE&&(e=c,a.startOffset!==e.length&&(c=e.splitText(a.startOffset),b.push(e),b.push(c),a.setStart(c,0)))}return b};this.containsRange=f;this.rangesIntersect=l;this.getNodesInRange=function(a,b){for(var c=[],e=a.commonAncestorContainer,d,f=a.startContainer.ownerDocument.createTreeWalker(e.nodeType===
Node.TEXT_NODE?e.parentNode:e,NodeFilter.SHOW_ALL,b,!1),e=f.currentNode=a.startContainer;e;){d=b(e);if(d===NodeFilter.FILTER_ACCEPT)c.push(e);else if(d===NodeFilter.FILTER_REJECT)break;e=e.parentNode}c.reverse();for(e=f.nextNode();e;)c.push(e),e=f.nextNode();return c};this.normalizeTextNodes=function(a){a&&a.nextSibling&&(a=r(a,a.nextSibling));a&&a.previousSibling&&r(a.previousSibling,a)};this.rangeContainsNode=function(a,b){var c=b.ownerDocument.createRange(),e=b.ownerDocument.createRange(),d;c.setStart(a.startContainer,
a.startOffset);c.setEnd(a.endContainer,a.endOffset);e.selectNodeContents(b);d=f(c,e);c.detach();e.detach();return d};this.mergeIntoParent=n;this.removeUnwantedNodes=h;this.getElementsByTagNameNS=function(a,b,c){var e=[];a=a.getElementsByTagNameNS(b,c);e.length=c=a.length;for(b=0;b<c;b+=1)e[b]=a.item(b);return e};this.rangeIntersectsNode=function(a,b){var c=b.ownerDocument.createRange(),e;c.selectNodeContents(b);e=l(a,c);c.detach();return e};this.containsNode=function(a,b){return a===b||a.contains(b)};
this.comparePoints=function(a,b,c,e){if(a===c)return e-b;var d=a.compareDocumentPosition(c);2===d?d=-1:4===d?d=1:10===d?(b=m(a,c),d=b<e?1:-1):(e=m(c,a),d=e<b?-1:1);return d};this.adaptRangeDifferenceToZoomLevel=function(a,b){return g().unscaledRangeClientRects?a:a/b};this.getBoundingClientRect=function(a){var b=a.ownerDocument,c=g();if((!1===c.unscaledRangeClientRects||c.rangeBCRIgnoresElementBCR)&&a.nodeType===Node.ELEMENT_NODE)return a.getBoundingClientRect();var d;e?d=e:e=d=b.createRange();b=d;
b.selectNode(a);return b.getBoundingClientRect()};this.mapKeyValObjOntoNode=function(a,b,c){Object.keys(b).forEach(function(e){var d=e.split(":"),f=d[1],d=c(d[0]),h=b[e];d?(f=a.getElementsByTagNameNS(d,f)[0],f||(f=a.ownerDocument.createElementNS(d,e),a.appendChild(f)),f.textContent=h):runtime.log("Key ignored: "+e)})};this.removeKeyElementsFromNode=function(a,b,c){b.forEach(function(b){var e=b.split(":"),d=e[1];(e=c(e[0]))?(d=a.getElementsByTagNameNS(e,d)[0])?d.parentNode.removeChild(d):runtime.log("Element for "+
b+" not found."):runtime.log("Property Name ignored: "+b)})};this.getKeyValRepresentationOfNode=function(a,b){for(var c={},e=a.firstElementChild,d;e;){if(d=b(e.namespaceURI))c[d+":"+e.localName]=e.textContent;e=e.nextElementSibling}return c};this.mapObjOntoNode=c;(function(a){var b,c;c=runtime.getWindow();null!==c&&(b=c.navigator.appVersion.toLowerCase(),c=-1===b.indexOf("chrome")&&(-1!==b.indexOf("applewebkit")||-1!==b.indexOf("safari")),b=b.indexOf("msie"),c||b)&&(a.containsNode=d)})(this)};return core.DomUtils})();
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
core.EventNotifier=function(g){var l={};this.emit=function(f,g){var r,n;runtime.assert(l.hasOwnProperty(f),'unknown event fired "'+f+'"');n=l[f];for(r=0;r<n.length;r+=1)n[r](g)};this.subscribe=function(f,g){runtime.assert(l.hasOwnProperty(f),'tried to subscribe to unknown event "'+f+'"');l[f].push(g);runtime.log('event "'+f+'" subscribed.')};this.unsubscribe=function(f,g){var r;runtime.assert(l.hasOwnProperty(f),'tried to unsubscribe from unknown event "'+f+'"');r=l[f].indexOf(g);runtime.assert(-1!==
r,'tried to unsubscribe unknown callback from event "'+f+'"');-1!==r&&l[f].splice(r,1);runtime.log('event "'+f+'" unsubscribed.')};(function(){var f,p;for(f=0;f<g.length;f+=1)p=g[f],runtime.assert(!l.hasOwnProperty(p),'Duplicated event ids: "'+p+'" registered more than once.'),l[p]=[]})()};
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
core.LoopWatchDog=function(g,l){var f=Date.now(),p=0;this.check=function(){var r;if(g&&(r=Date.now(),r-f>g))throw runtime.log("alert","watchdog timeout"),"timeout!";if(0<l&&(p+=1,p>l))throw runtime.log("alert","watchdog loop overflow"),"loop overflow";}};
// Input 10
core.PositionIterator=function(g,l,f,p){function r(){this.acceptNode=function(a){return!a||a.nodeType===b&&0===a.length?t:k}}function n(a){this.acceptNode=function(c){return!c||c.nodeType===b&&0===c.length?t:a.acceptNode(c)}}function h(){var a=c.currentNode,d=a.nodeType;e=d===b?a.length-1:d===q?1:0}function d(){if(null===c.previousSibling()){if(!c.parentNode()||c.currentNode===g)return c.firstChild(),!1;e=0}else h();return!0}var m=this,c,e,a,b=Node.TEXT_NODE,q=Node.ELEMENT_NODE,k=NodeFilter.FILTER_ACCEPT,
t=NodeFilter.FILTER_REJECT;this.nextPosition=function(){var a=c.currentNode,d=a.nodeType;if(a===g)return!1;if(0===e&&d===q)null===c.firstChild()&&(e=1);else if(d===b&&e+1<a.length)e+=1;else if(null!==c.nextSibling())e=0;else if(c.parentNode())e=1;else return!1;return!0};this.previousPosition=function(){var a=!0,q=c.currentNode;0===e?a=d():q.nodeType===b?e-=1:null!==c.lastChild()?h():q===g?a=!1:e=0;return a};this.previousNode=d;this.container=function(){var a=c.currentNode,d=a.nodeType;0===e&&d!==
b&&(a=a.parentNode);return a};this.rightNode=function(){var d=c.currentNode,f=d.nodeType;if(f===b&&e===d.length)for(d=d.nextSibling;d&&a(d)!==k;)d=d.nextSibling;else f===q&&1===e&&(d=null);return d};this.leftNode=function(){var b=c.currentNode;if(0===e)for(b=b.previousSibling;b&&a(b)!==k;)b=b.previousSibling;else if(b.nodeType===q)for(b=b.lastChild;b&&a(b)!==k;)b=b.previousSibling;return b};this.getCurrentNode=function(){return c.currentNode};this.unfilteredDomOffset=function(){if(c.currentNode.nodeType===
b)return e;for(var a=0,d=c.currentNode,d=1===e?d.lastChild:d.previousSibling;d;)a+=1,d=d.previousSibling;return a};this.getPreviousSibling=function(){var a=c.currentNode,b=c.previousSibling();c.currentNode=a;return b};this.getNextSibling=function(){var a=c.currentNode,b=c.nextSibling();c.currentNode=a;return b};this.setUnfilteredPosition=function(d,q){var f,h;runtime.assert(null!==d&&void 0!==d,"PositionIterator.setUnfilteredPosition called without container");c.currentNode=d;if(d.nodeType===b)return e=
q,runtime.assert(q<=d.length,"Error in setPosition: "+q+" > "+d.length),runtime.assert(0<=q,"Error in setPosition: "+q+" < 0"),q===d.length&&(c.nextSibling()?e=0:c.parentNode()?e=1:runtime.assert(!1,"Error in setUnfilteredPosition: position not valid.")),!0;f=a(d);for(h=d.parentNode;h&&h!==g&&f===k;)f=a(h),f!==k&&(c.currentNode=h),h=h.parentNode;q<d.childNodes.length&&f!==NodeFilter.FILTER_REJECT?(c.currentNode=d.childNodes.item(q),f=a(c.currentNode),e=0):e=1;f===NodeFilter.FILTER_REJECT&&(e=1);if(f!==
k)return m.nextPosition();runtime.assert(a(c.currentNode)===k,"PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");return!0};this.moveToEnd=function(){c.currentNode=g;e=1};this.moveToEndOfNode=function(a){a.nodeType===b?m.setUnfilteredPosition(a,a.length):(c.currentNode=a,e=1)};this.getNodeFilter=function(){return a};a=(f?new n(f):new r).acceptNode;a.acceptNode=a;l=l||4294967295;runtime.assert(g.nodeType!==Node.TEXT_NODE,"Internet Explorer doesn't allow tree walker roots to be text nodes");
c=g.ownerDocument.createTreeWalker(g,l,a,p);e=0;null===c.firstChild()&&(e=1)};
// Input 11
core.zip_HuftNode=function(){this.n=this.b=this.e=0;this.t=null};core.zip_HuftList=function(){this.list=this.next=null};
core.RawInflate=function(){function g(a,b,c,e,d,q){this.BMAX=16;this.N_MAX=288;this.status=0;this.root=null;this.m=0;var f=Array(this.BMAX+1),k,h,I,g,m,s,l,n=Array(this.BMAX+1),r,p,v,t=new core.zip_HuftNode,W=Array(this.BMAX);g=Array(this.N_MAX);var u,y=Array(this.BMAX+1),z,Q,B;B=this.root=null;for(m=0;m<f.length;m++)f[m]=0;for(m=0;m<n.length;m++)n[m]=0;for(m=0;m<W.length;m++)W[m]=null;for(m=0;m<g.length;m++)g[m]=0;for(m=0;m<y.length;m++)y[m]=0;k=256<b?a[256]:this.BMAX;r=a;p=0;m=b;do f[r[p]]++,p++;
while(0<--m);if(f[0]===b)this.root=null,this.status=this.m=0;else{for(s=1;s<=this.BMAX&&0===f[s];s++);l=s;q<s&&(q=s);for(m=this.BMAX;0!==m&&0===f[m];m--);I=m;q>m&&(q=m);for(z=1<<s;s<m;s++,z<<=1)if(z-=f[s],0>z){this.status=2;this.m=q;return}z-=f[m];if(0>z)this.status=2,this.m=q;else{f[m]+=z;y[1]=s=0;r=f;p=1;for(v=2;0<--m;)s+=r[p++],y[v++]=s;r=a;m=p=0;do s=r[p++],0!==s&&(g[y[s]++]=m);while(++m<b);b=y[I];y[0]=m=0;r=g;p=0;g=-1;u=n[0]=0;v=null;Q=0;for(l=l-1+1;l<=I;l++)for(a=f[l];0<a--;){for(;l>u+n[1+g];){u+=
n[1+g];g++;Q=I-u;Q=Q>q?q:Q;s=l-u;h=1<<s;if(h>a+1)for(h-=a+1,v=l;++s<Q;){h<<=1;if(h<=f[++v])break;h-=f[v]}u+s>k&&u<k&&(s=k-u);Q=1<<s;n[1+g]=s;v=Array(Q);for(h=0;h<Q;h++)v[h]=new core.zip_HuftNode;B=null===B?this.root=new core.zip_HuftList:B.next=new core.zip_HuftList;B.next=null;B.list=v;W[g]=v;0<g&&(y[g]=m,t.b=n[g],t.e=16+s,t.t=v,s=(m&(1<<u)-1)>>u-n[g],W[g-1][s].e=t.e,W[g-1][s].b=t.b,W[g-1][s].n=t.n,W[g-1][s].t=t.t)}t.b=l-u;p>=b?t.e=99:r[p]<c?(t.e=256>r[p]?16:15,t.n=r[p++]):(t.e=d[r[p]-c],t.n=e[r[p++]-
c]);h=1<<l-u;for(s=m>>u;s<Q;s+=h)v[s].e=t.e,v[s].b=t.b,v[s].n=t.n,v[s].t=t.t;for(s=1<<l-1;0!==(m&s);s>>=1)m^=s;for(m^=s;(m&(1<<u)-1)!==y[g];)u-=n[g],g--}this.m=n[1];this.status=0!==z&&1!==I?1:0}}}function l(c){for(;b<c;){var e=a,d;d=s.length===H?-1:s[H++];a=e|d<<b;b+=8}}function f(b){return a&y[b]}function p(c){a>>=c;b-=c}function r(a,b,c){var e,k,I;if(0===c)return 0;for(I=0;;){l(v);k=w.list[f(v)];for(e=k.e;16<e;){if(99===e)return-1;p(k.b);e-=16;l(e);k=k.t[f(e)];e=k.e}p(k.b);if(16===e)d&=32767,a[b+
I++]=h[d++]=k.n;else{if(15===e)break;l(e);t=k.n+f(e);p(e);l(u);k=x.list[f(u)];for(e=k.e;16<e;){if(99===e)return-1;p(k.b);e-=16;l(e);k=k.t[f(e)];e=k.e}p(k.b);l(e);A=d-k.n-f(e);for(p(e);0<t&&I<c;)t--,A&=32767,d&=32767,a[b+I++]=h[d++]=h[A++]}if(I===c)return c}q=-1;return I}function n(a,b,c){var e,d,q,k,h,m,s,n=Array(316);for(e=0;e<n.length;e++)n[e]=0;l(5);m=257+f(5);p(5);l(5);s=1+f(5);p(5);l(4);e=4+f(4);p(4);if(286<m||30<s)return-1;for(d=0;d<e;d++)l(3),n[Q[d]]=f(3),p(3);for(d=e;19>d;d++)n[Q[d]]=0;v=
7;d=new g(n,19,19,null,null,v);if(0!==d.status)return-1;w=d.root;v=d.m;k=m+s;for(e=q=0;e<k;)if(l(v),h=w.list[f(v)],d=h.b,p(d),d=h.n,16>d)n[e++]=q=d;else if(16===d){l(2);d=3+f(2);p(2);if(e+d>k)return-1;for(;0<d--;)n[e++]=q}else{17===d?(l(3),d=3+f(3),p(3)):(l(7),d=11+f(7),p(7));if(e+d>k)return-1;for(;0<d--;)n[e++]=0;q=0}v=9;d=new g(n,m,257,B,L,v);0===v&&(d.status=1);if(0!==d.status)return-1;w=d.root;v=d.m;for(e=0;e<s;e++)n[e]=n[e+m];u=6;d=new g(n,s,0,I,W,u);x=d.root;u=d.m;return 0===u&&257<m||0!==d.status?
-1:r(a,b,c)}var h=[],d,m=null,c,e,a,b,q,k,t,A,w,x,v,u,s,H,y=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],B=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],L=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,99,99],I=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],W=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],Q=[16,17,18,0,8,7,9,6,
10,5,11,4,12,3,13,2,14,1,15],z;this.inflate=function(y,Q){h.length=65536;b=a=d=0;q=-1;k=!1;t=A=0;w=null;s=y;H=0;var G=new Uint8Array(new ArrayBuffer(Q));a:for(var Z=0,O;Z<Q&&(!k||-1!==q);){if(0<t){if(0!==q)for(;0<t&&Z<Q;)t--,A&=32767,d&=32767,G[0+Z]=h[d]=h[A],Z+=1,d+=1,A+=1;else{for(;0<t&&Z<Q;)t-=1,d&=32767,l(8),G[0+Z]=h[d]=f(8),Z+=1,d+=1,p(8);0===t&&(q=-1)}if(Z===Q)break}if(-1===q){if(k)break;l(1);0!==f(1)&&(k=!0);p(1);l(2);q=f(2);p(2);w=null;t=0}switch(q){case 0:O=G;var aa=0+Z,J=Q-Z,F=void 0,F=
b&7;p(F);l(16);F=f(16);p(16);l(16);if(F!==(~a&65535))O=-1;else{p(16);t=F;for(F=0;0<t&&F<J;)t--,d&=32767,l(8),O[aa+F++]=h[d++]=f(8),p(8);0===t&&(q=-1);O=F}break;case 1:if(null!==w)O=r(G,0+Z,Q-Z);else b:{O=G;aa=0+Z;J=Q-Z;if(null===m){for(var C=void 0,F=Array(288),C=void 0,C=0;144>C;C++)F[C]=8;for(C=144;256>C;C++)F[C]=9;for(C=256;280>C;C++)F[C]=7;for(C=280;288>C;C++)F[C]=8;e=7;C=new g(F,288,257,B,L,e);if(0!==C.status){alert("HufBuild error: "+C.status);O=-1;break b}m=C.root;e=C.m;for(C=0;30>C;C++)F[C]=
5;z=5;C=new g(F,30,0,I,W,z);if(1<C.status){m=null;alert("HufBuild error: "+C.status);O=-1;break b}c=C.root;z=C.m}w=m;x=c;v=e;u=z;O=r(O,aa,J)}break;case 2:O=null!==w?r(G,0+Z,Q-Z):n(G,0+Z,Q-Z);break;default:O=-1}if(-1===O)break a;Z+=O}s=new Uint8Array(new ArrayBuffer(0));return G}};
// Input 12
core.ScheduledTask=function(g,l){function f(){n&&(runtime.clearTimeout(r),n=!1)}function p(){f();g.apply(void 0,h);h=null}var r,n=!1,h=[];this.trigger=function(){h=Array.prototype.slice.call(arguments);n||(n=!0,r=runtime.setTimeout(p,l))};this.triggerImmediate=function(){h=Array.prototype.slice.call(arguments);p()};this.processRequests=function(){n&&p()};this.cancel=f;this.destroy=function(d){f();d()}};
// Input 13
core.UnitTest=function(){};core.UnitTest.prototype.setUp=function(){};core.UnitTest.prototype.tearDown=function(){};core.UnitTest.prototype.description=function(){};core.UnitTest.prototype.tests=function(){};core.UnitTest.prototype.asyncTests=function(){};
core.UnitTest.provideTestAreaDiv=function(){var g=runtime.getWindow().document,l=g.getElementById("testarea");runtime.assert(!l,'Unclean test environment, found a div with id "testarea".');l=g.createElement("div");l.setAttribute("id","testarea");g.body.appendChild(l);return l};
core.UnitTest.cleanupTestAreaDiv=function(){var g=runtime.getWindow().document,l=g.getElementById("testarea");runtime.assert(!!l&&l.parentNode===g.body,'Test environment broken, found no div with id "testarea" below body.');g.body.removeChild(l)};core.UnitTest.createOdtDocument=function(g,l){var f="<?xml version='1.0' encoding='UTF-8'?>",f=f+"<office:document";Object.keys(l).forEach(function(g){f+=" xmlns:"+g+'="'+l[g]+'"'});f+=">";f+=g;f+="</office:document>";return runtime.parseXML(f)};
core.UnitTestRunner=function(){function g(d){h+=1;runtime.log("fail",d)}function l(d,c){var e;try{if(d.length!==c.length)return g("array of length "+d.length+" should be "+c.length+" long"),!1;for(e=0;e<d.length;e+=1)if(d[e]!==c[e])return g(d[e]+" should be "+c[e]+" at array index "+e),!1}catch(a){return!1}return!0}function f(d,c,e){var a=d.attributes,b=a.length,q,k,h;for(q=0;q<b;q+=1)if(k=a.item(q),"xmlns"!==k.prefix&&"urn:webodf:names:steps"!==k.namespaceURI){h=c.getAttributeNS(k.namespaceURI,k.localName);
if(!c.hasAttributeNS(k.namespaceURI,k.localName))return g("Attribute "+k.localName+" with value "+k.value+" was not present"),!1;if(h!==k.value)return g("Attribute "+k.localName+" was "+h+" should be "+k.value),!1}return e?!0:f(c,d,!0)}function p(d,c){var e,a;e=d.nodeType;a=c.nodeType;if(e!==a)return g("Nodetype '"+e+"' should be '"+a+"'"),!1;if(e===Node.TEXT_NODE){if(d.data===c.data)return!0;g("Textnode data '"+d.data+"' should be '"+c.data+"'");return!1}runtime.assert(e===Node.ELEMENT_NODE,"Only textnodes and elements supported.");
if(d.namespaceURI!==c.namespaceURI)return g("namespace '"+d.namespaceURI+"' should be '"+c.namespaceURI+"'"),!1;if(d.localName!==c.localName)return g("localName '"+d.localName+"' should be '"+c.localName+"'"),!1;if(!f(d,c,!1))return!1;e=d.firstChild;for(a=c.firstChild;e;){if(!a)return g("Nodetype '"+e.nodeType+"' is unexpected here."),!1;if(!p(e,a))return!1;e=e.nextSibling;a=a.nextSibling}return a?(g("Nodetype '"+a.nodeType+"' is missing here."),!1):!0}function r(f,c){return 0===c?f===c&&1/f===1/
c:f===c?!0:"number"===typeof c&&isNaN(c)?"number"===typeof f&&isNaN(f):Object.prototype.toString.call(c)===Object.prototype.toString.call([])?l(f,c):"object"===typeof c&&"object"===typeof f?c.constructor===Element||c.constructor===Node?p(c,f):d(c,f):!1}function n(d,c,e){"string"===typeof c&&"string"===typeof e||runtime.log("WARN: shouldBe() expects string arguments");var a,b;try{b=eval(c)}catch(q){a=q}d=eval(e);a?g(c+" should be "+d+". Threw exception "+a):r(b,d)?runtime.log("pass",c+" is "+e):String(typeof b)===
String(typeof d)?(e=0===b&&0>1/b?"-0":String(b),g(c+" should be "+d+". Was "+e+".")):g(c+" should be "+d+" (of type "+typeof d+"). Was "+b+" (of type "+typeof b+").")}var h=0,d;d=function(d,c){var e=Object.keys(d),a=Object.keys(c);e.sort();a.sort();return l(e,a)&&Object.keys(d).every(function(a){var e=d[a],f=c[a];return r(e,f)?!0:(g(e+" should be "+f+" for key "+a),!1)})};this.areNodesEqual=p;this.shouldBeNull=function(d,c){n(d,c,"null")};this.shouldBeNonNull=function(d,c){var e,a;try{a=eval(c)}catch(b){e=
b}e?g(c+" should be non-null. Threw exception "+e):null!==a?runtime.log("pass",c+" is non-null."):g(c+" should be non-null. Was "+a)};this.shouldBe=n;this.countFailedTests=function(){return h};this.name=function(d){var c,e,a=[],b=d.length;a.length=b;for(c=0;c<b;c+=1){e=Runtime.getFunctionName(d[c])||"";if(""===e)throw"Found a function without a name.";a[c]={f:d[c],name:e}}return a}};
core.UnitTester=function(){function g(f,g){return"<span style='color:blue;cursor:pointer' onclick='"+g+"'>"+f+"</span>"}var l=0,f={};this.runTests=function(p,r,n){function h(a){if(0===a.length)f[d]=e,l+=m.countFailedTests(),r();else{b=a[0].f;var q=a[0].name;runtime.log("Running "+q);k=m.countFailedTests();c.setUp();b(function(){c.tearDown();e[q]=k===m.countFailedTests();h(a.slice(1))})}}var d=Runtime.getFunctionName(p)||"",m=new core.UnitTestRunner,c=new p(m),e={},a,b,q,k,t="BrowserRuntime"===runtime.type();
if(f.hasOwnProperty(d))runtime.log("Test "+d+" has already run.");else{t?runtime.log("<span>Running "+g(d,'runSuite("'+d+'");')+": "+c.description()+"</span>"):runtime.log("Running "+d+": "+c.description);q=c.tests();for(a=0;a<q.length;a+=1)b=q[a].f,p=q[a].name,n.length&&-1===n.indexOf(p)||(t?runtime.log("<span>Running "+g(p,'runTest("'+d+'","'+p+'")')+"</span>"):runtime.log("Running "+p),k=m.countFailedTests(),c.setUp(),b(),c.tearDown(),e[p]=k===m.countFailedTests());h(c.asyncTests())}};this.countFailedTests=
function(){return l};this.results=function(){return f}};
// Input 14
core.Utils=function(){function g(l,f){if(f&&Array.isArray(f)){l=l||[];if(!Array.isArray(l))throw"Destination is not an array.";l=l.concat(f.map(function(f){return g(null,f)}))}else if(f&&"object"===typeof f){l=l||{};if("object"!==typeof l)throw"Destination is not an object.";Object.keys(f).forEach(function(p){l[p]=g(l[p],f[p])})}else l=f;return l}this.hashString=function(g){var f=0,p,r;p=0;for(r=g.length;p<r;p+=1)f=(f<<5)-f+g.charCodeAt(p),f|=0;return f};this.mergeObjects=function(l,f){Object.keys(f).forEach(function(p){l[p]=
g(l[p],f[p])});return l}};
// Input 15
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
runtime.loadClass("core.RawInflate");runtime.loadClass("core.ByteArray");runtime.loadClass("core.ByteArrayWriter");runtime.loadClass("core.Base64");
core.Zip=function(g,l){function f(a){var b=[0,1996959894,3993919788,2567524794,124634137,1886057615,3915621685,2657392035,249268274,2044508324,3772115230,2547177864,162941995,2125561021,3887607047,2428444049,498536548,1789927666,4089016648,2227061214,450548861,1843258603,4107580753,2211677639,325883990,1684777152,4251122042,2321926636,335633487,1661365465,4195302755,2366115317,997073096,1281953886,3579855332,2724688242,1006888145,1258607687,3524101629,2768942443,901097722,1119000684,3686517206,2898065728,
853044451,1172266101,3705015759,2882616665,651767980,1373503546,3369554304,3218104598,565507253,1454621731,3485111705,3099436303,671266974,1594198024,3322730930,2970347812,795835527,1483230225,3244367275,3060149565,1994146192,31158534,2563907772,4023717930,1907459465,112637215,2680153253,3904427059,2013776290,251722036,2517215374,3775830040,2137656763,141376813,2439277719,3865271297,1802195444,476864866,2238001368,4066508878,1812370925,453092731,2181625025,4111451223,1706088902,314042704,2344532202,
4240017532,1658658271,366619977,2362670323,4224994405,1303535960,984961486,2747007092,3569037538,1256170817,1037604311,2765210733,3554079995,1131014506,879679996,2909243462,3663771856,1141124467,855842277,2852801631,3708648649,1342533948,654459306,3188396048,3373015174,1466479909,544179635,3110523913,3462522015,1591671054,702138776,2966460450,3352799412,1504918807,783551873,3082640443,3233442989,3988292384,2596254646,62317068,1957810842,3939845945,2647816111,81470997,1943803523,3814918930,2489596804,
225274430,2053790376,3826175755,2466906013,167816743,2097651377,4027552580,2265490386,503444072,1762050814,4150417245,2154129355,426522225,1852507879,4275313526,2312317920,282753626,1742555852,4189708143,2394877945,397917763,1622183637,3604390888,2714866558,953729732,1340076626,3518719985,2797360999,1068828381,1219638859,3624741850,2936675148,906185462,1090812512,3747672003,2825379669,829329135,1181335161,3412177804,3160834842,628085408,1382605366,3423369109,3138078467,570562233,1426400815,3317316542,
2998733608,733239954,1555261956,3268935591,3050360625,752459403,1541320221,2607071920,3965973030,1969922972,40735498,2617837225,3943577151,1913087877,83908371,2512341634,3803740692,2075208622,213261112,2463272603,3855990285,2094854071,198958881,2262029012,4057260610,1759359992,534414190,2176718541,4139329115,1873836001,414664567,2282248934,4279200368,1711684554,285281116,2405801727,4167216745,1634467795,376229701,2685067896,3608007406,1308918612,956543938,2808555105,3495958263,1231636301,1047427035,
2932959818,3654703836,1088359270,936918E3,2847714899,3736837829,1202900863,817233897,3183342108,3401237130,1404277552,615818150,3134207493,3453421203,1423857449,601450431,3009837614,3294710456,1567103746,711928724,3020668471,3272380065,1510334235,755167117],c,e,d=a.length,q=0,q=0;c=-1;for(e=0;e<d;e+=1)q=(c^a[e])&255,q=b[q],c=c>>>8^q;return c^-1}function p(a){return new Date((a>>25&127)+1980,(a>>21&15)-1,a>>16&31,a>>11&15,a>>5&63,(a&31)<<1)}function r(a){var b=a.getFullYear();return 1980>b?0:b-1980<<
25|a.getMonth()+1<<21|a.getDate()<<16|a.getHours()<<11|a.getMinutes()<<5|a.getSeconds()>>1}function n(a,b){var c,e,d,q,f,h,g,m=this;this.load=function(b){if(null!==m.data)b(null,m.data);else{var c=f+34+e+d+256;c+g>k&&(c=k-g);runtime.read(a,g,c,function(c,e){if(c||null===e)b(c,e);else a:{var d=e,k=new core.ByteArray(d),g=k.readUInt32LE(),s;if(67324752!==g)b("File entry signature is wrong."+g.toString()+" "+d.length.toString(),null);else{k.pos+=22;g=k.readUInt16LE();s=k.readUInt16LE();k.pos+=g+s;if(q){d=
d.subarray(k.pos,k.pos+f);if(f!==d.length){b("The amount of compressed bytes read was "+d.length.toString()+" instead of "+f.toString()+" for "+m.filename+" in "+a+".",null);break a}d=A(d,h)}else d=d.subarray(k.pos,k.pos+h);h!==d.length?b("The amount of bytes read was "+d.length.toString()+" instead of "+h.toString()+" for "+m.filename+" in "+a+".",null):(m.data=d,b(null,d))}}})}};this.set=function(a,b,c,e){m.filename=a;m.data=b;m.compressed=c;m.date=e};this.error=null;b&&(c=b.readUInt32LE(),33639248!==
c?this.error="Central directory entry has wrong signature at position "+(b.pos-4).toString()+' for file "'+a+'": '+b.data.length.toString():(b.pos+=6,q=b.readUInt16LE(),this.date=p(b.readUInt32LE()),b.readUInt32LE(),f=b.readUInt32LE(),h=b.readUInt32LE(),e=b.readUInt16LE(),d=b.readUInt16LE(),c=b.readUInt16LE(),b.pos+=8,g=b.readUInt32LE(),this.filename=runtime.byteArrayToString(b.data.subarray(b.pos,b.pos+e),"utf8"),this.data=null,b.pos+=e+d+c))}function h(a,b){if(22!==a.length)b("Central directory length should be 22.",
w);else{var c=new core.ByteArray(a),e;e=c.readUInt32LE();101010256!==e?b("Central directory signature is wrong: "+e.toString(),w):(e=c.readUInt16LE(),0!==e?b("Zip files with non-zero disk numbers are not supported.",w):(e=c.readUInt16LE(),0!==e?b("Zip files with non-zero disk numbers are not supported.",w):(e=c.readUInt16LE(),t=c.readUInt16LE(),e!==t?b("Number of entries is inconsistent.",w):(e=c.readUInt32LE(),c=c.readUInt16LE(),c=k-22-e,runtime.read(g,c,k-c,function(a,c){if(a||null===c)b(a,w);else a:{var e=
new core.ByteArray(c),d,f;q=[];for(d=0;d<t;d+=1){f=new n(g,e);if(f.error){b(f.error,w);break a}q[q.length]=f}b(null,w)}})))))}}function d(a,b){var c=null,e,d;for(d=0;d<q.length;d+=1)if(e=q[d],e.filename===a){c=e;break}c?c.data?b(null,c.data):c.load(b):b(a+" not found.",null)}function m(a){var b=new core.ByteArrayWriter("utf8"),c=0;b.appendArray([80,75,3,4,20,0,0,0,0,0]);a.data&&(c=a.data.length);b.appendUInt32LE(r(a.date));b.appendUInt32LE(a.data?f(a.data):0);b.appendUInt32LE(c);b.appendUInt32LE(c);
b.appendUInt16LE(a.filename.length);b.appendUInt16LE(0);b.appendString(a.filename);a.data&&b.appendByteArray(a.data);return b}function c(a,b){var c=new core.ByteArrayWriter("utf8"),e=0;c.appendArray([80,75,1,2,20,0,20,0,0,0,0,0]);a.data&&(e=a.data.length);c.appendUInt32LE(r(a.date));c.appendUInt32LE(a.data?f(a.data):0);c.appendUInt32LE(e);c.appendUInt32LE(e);c.appendUInt16LE(a.filename.length);c.appendArray([0,0,0,0,0,0,0,0,0,0,0,0]);c.appendUInt32LE(b);c.appendString(a.filename);return c}function e(a,
b){if(a===q.length)b(null);else{var c=q[a];null!==c.data?e(a+1,b):c.load(function(c){c?b(c):e(a+1,b)})}}function a(a,b){e(0,function(e){if(e)b(e);else{var d,f,k=new core.ByteArrayWriter("utf8"),h=[0];for(d=0;d<q.length;d+=1)k.appendByteArrayWriter(m(q[d])),h.push(k.getLength());e=k.getLength();for(d=0;d<q.length;d+=1)f=q[d],k.appendByteArrayWriter(c(f,h[d]));d=k.getLength()-e;k.appendArray([80,75,5,6,0,0,0,0]);k.appendUInt16LE(q.length);k.appendUInt16LE(q.length);k.appendUInt32LE(d);k.appendUInt32LE(e);
k.appendArray([0,0]);a(k.getByteArray())}})}function b(b,c){a(function(a){runtime.writeFile(b,a,c)},c)}var q,k,t,A=(new core.RawInflate).inflate,w=this,x=new core.Base64;this.load=d;this.save=function(a,b,c,e){var d,f;for(d=0;d<q.length;d+=1)if(f=q[d],f.filename===a){f.set(a,b,c,e);return}f=new n(g);f.set(a,b,c,e);q.push(f)};this.remove=function(a){var b,c;for(b=0;b<q.length;b+=1)if(c=q[b],c.filename===a)return q.splice(b,1),!0;return!1};this.write=function(a){b(g,a)};this.writeAs=b;this.createByteArray=
a;this.loadContentXmlAsFragments=function(a,b){w.loadAsString(a,function(a,c){if(a)return b.rootElementReady(a);b.rootElementReady(null,c,!0)})};this.loadAsString=function(a,b){d(a,function(a,c){if(a||null===c)return b(a,null);var e=runtime.byteArrayToString(c,"utf8");b(null,e)})};this.loadAsDOM=function(a,b){w.loadAsString(a,function(a,c){if(a||null===c)b(a,null);else{var e=(new DOMParser).parseFromString(c,"text/xml");b(null,e)}})};this.loadAsDataURL=function(a,b,c){d(a,function(a,e){if(a||!e)return c(a,
null);var d=0,f;b||(b=80===e[1]&&78===e[2]&&71===e[3]?"image/png":255===e[0]&&216===e[1]&&255===e[2]?"image/jpeg":71===e[0]&&73===e[1]&&70===e[2]?"image/gif":"");for(f="data:"+b+";base64,";d<e.length;)f+=x.convertUTF8ArrayToBase64(e.subarray(d,Math.min(d+45E3,e.length))),d+=45E3;c(null,f)})};this.getEntries=function(){return q.slice()};k=-1;null===l?q=[]:runtime.getFileSize(g,function(a){k=a;0>k?l("File '"+g+"' cannot be read.",w):runtime.read(g,k-22,22,function(a,b){a||null===l||null===b?l(a,w):
h(b,l)})})};
// Input 16
gui.Avatar=function(g,l){var f=this,p,r,n;this.setColor=function(f){r.style.borderColor=f};this.setImageUrl=function(h){f.isVisible()?r.src=h:n=h};this.isVisible=function(){return"block"===p.style.display};this.show=function(){n&&(r.src=n,n=void 0);p.style.display="block"};this.hide=function(){p.style.display="none"};this.markAsFocussed=function(f){p.className=f?"active":""};this.destroy=function(f){g.removeChild(p);f()};(function(){var f=g.ownerDocument,d=f.documentElement.namespaceURI;p=f.createElementNS(d,
"div");r=f.createElementNS(d,"img");r.width=64;r.height=64;p.appendChild(r);p.style.width="64px";p.style.height="70px";p.style.position="absolute";p.style.top="-80px";p.style.left="-34px";p.style.display=l?"block":"none";g.appendChild(p)})()};
// Input 17
gui.EditInfoHandle=function(g){var l=[],f,p=g.ownerDocument,r=p.documentElement.namespaceURI;this.setEdits=function(g){l=g;var h,d,m,c;f.innerHTML="";for(g=0;g<l.length;g+=1)h=p.createElementNS(r,"div"),h.className="editInfo",d=p.createElementNS(r,"span"),d.className="editInfoColor",d.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),m=p.createElementNS(r,"span"),m.className="editInfoAuthor",m.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),
c=p.createElementNS(r,"span"),c.className="editInfoTime",c.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l[g].memberid),c.innerHTML=l[g].time,h.appendChild(d),h.appendChild(m),h.appendChild(c),f.appendChild(h)};this.show=function(){f.style.display="block"};this.hide=function(){f.style.display="none"};this.destroy=function(l){g.removeChild(f);l()};f=p.createElementNS(r,"div");f.setAttribute("class","editInfoHandle");f.style.display="none";g.appendChild(f)};
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
gui.KeyboardHandler=function(){function g(f,g){g||(g=l.None);return f+":"+g}var l=gui.KeyboardHandler.Modifier,f=null,p={};this.setDefault=function(g){f=g};this.bind=function(f,l,h){f=g(f,l);runtime.assert(!1===p.hasOwnProperty(f),"tried to overwrite the callback handler of key combo: "+f);p[f]=h};this.unbind=function(f,l){var h=g(f,l);delete p[h]};this.reset=function(){f=null;p={}};this.handleEvent=function(r){var n=r.keyCode,h=l.None;r.metaKey&&(h|=l.Meta);r.ctrlKey&&(h|=l.Ctrl);r.altKey&&(h|=l.Alt);
r.shiftKey&&(h|=l.Shift);n=g(n,h);n=p[n];h=!1;n?h=n():null!==f&&(h=f(r));h&&(r.preventDefault?r.preventDefault():r.returnValue=!1)}};gui.KeyboardHandler.Modifier={None:0,Meta:1,Ctrl:2,Alt:4,CtrlAlt:6,Shift:8,MetaShift:9,CtrlShift:10,AltShift:12};gui.KeyboardHandler.KeyCode={Backspace:8,Tab:9,Clear:12,Enter:13,End:35,Home:36,Left:37,Up:38,Right:39,Down:40,Delete:46,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90};(function(){return gui.KeyboardHandler})();
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
dcns:"http://purl.org/dc/elements/1.1/",dr3dns:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0",drawns:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0",chartns:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0",fons:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0",formns:"urn:oasis:names:tc:opendocument:xmlns:form:1.0",metans:"urn:oasis:names:tc:opendocument:xmlns:meta:1.0",numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0",officens:"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
presentationns:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0",stylens:"urn:oasis:names:tc:opendocument:xmlns:style:1.0",svgns:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0",tablens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0",textns:"urn:oasis:names:tc:opendocument:xmlns:text:1.0",xlinkns:"http://www.w3.org/1999/xlink",xmlns:"http://www.w3.org/XML/1998/namespace"};
(function(){var g=odf.Namespaces.namespaceMap,l=odf.Namespaces.prefixMap,f;for(f in g)g.hasOwnProperty(f)&&(l[g[f]]=f)})();odf.Namespaces.forEachPrefix=function(g){var l=odf.Namespaces.namespaceMap,f;for(f in l)l.hasOwnProperty(f)&&g(f,l[f])};odf.Namespaces.lookupNamespaceURI=function(g){var l=null;odf.Namespaces.namespaceMap.hasOwnProperty(g)&&(l=odf.Namespaces.namespaceMap[g]);return l};odf.Namespaces.lookupPrefix=function(g){var l=odf.Namespaces.prefixMap;return l.hasOwnProperty(g)?l[g]:null};
odf.Namespaces.lookupNamespaceURI.lookupNamespaceURI=odf.Namespaces.lookupNamespaceURI;
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
odf.OdfUtils=function(){function g(a){return"image"===(a&&a.localName)&&a.namespaceURI===y}function l(a){return null!==a&&a.nodeType===Node.ELEMENT_NODE&&"frame"===a.localName&&a.namespaceURI===y&&"as-char"===a.getAttributeNS(H,"anchor-type")}function f(a){var b;(b="annotation"===(a&&a.localName)&&a.namespaceURI===odf.Namespaces.officens)||(b="div"===(a&&a.localName)&&"annotationWrapper"===a.className);return b}function p(a){var b=a&&a.localName;return("p"===b||"h"===b)&&a.namespaceURI===H}function r(a){for(;a&&
!p(a);)a=a.parentNode;return a}function n(a){return/^[ \t\r\n]+$/.test(a)}function h(a){if(null===a||a.nodeType!==Node.ELEMENT_NODE)return!1;var b=a.localName;return/^(span|p|h|a|meta)$/.test(b)&&a.namespaceURI===H||"span"===b&&"annotationHighlight"===a.className}function d(a){var b=a&&a.localName,c=!1;b&&(a=a.namespaceURI,a===H&&(c="s"===b||"tab"===b||"line-break"===b));return c}function m(a){return d(a)||l(a)||f(a)}function c(a){var b=a&&a.localName,c=!1;b&&(a=a.namespaceURI,a===H&&(c="s"===b));
return c}function e(a){for(;null!==a.firstChild&&h(a);)a=a.firstChild;return a}function a(a){for(;null!==a.lastChild&&h(a);)a=a.lastChild;return a}function b(b){for(;!p(b)&&null===b.previousSibling;)b=b.parentNode;return p(b)?null:a(b.previousSibling)}function q(a){for(;!p(a)&&null===a.nextSibling;)a=a.parentNode;return p(a)?null:e(a.nextSibling)}function k(a){for(var e=!1;a;)if(a.nodeType===Node.TEXT_NODE)if(0===a.length)a=b(a);else return!n(a.data.substr(a.length-1,1));else m(a)?(e=!1===c(a),a=
null):a=b(a);return e}function t(a){var b=!1,c;for(a=a&&e(a);a;){c=a.nodeType===Node.TEXT_NODE?a.length:0;if(0<c&&!n(a.data)){b=!0;break}if(m(a)){b=!0;break}a=q(a)}return b}function A(a,b){return n(a.data.substr(b))?!t(q(a)):!1}function w(a,c){var e=a.data,d;if(!n(e[c])||m(a.parentNode))return!1;0<c?n(e[c-1])||(d=!0):k(b(a))&&(d=!0);return!0===d?A(a,c)?!1:!0:!1}function x(a){return(a=/(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/.exec(a))?
{value:parseFloat(a[1]),unit:a[3]}:null}function v(a){return(a=x(a))&&(0>a.value||"%"===a.unit)?null:a}function u(a){return(a=x(a))&&"%"!==a.unit?null:a}function s(a){switch(a.namespaceURI){case odf.Namespaces.drawns:case odf.Namespaces.svgns:case odf.Namespaces.dr3dns:return!1;case odf.Namespaces.textns:switch(a.localName){case "note-body":case "ruby-text":return!1}break;case odf.Namespaces.officens:switch(a.localName){case "annotation":case "binary-data":case "event-listeners":return!1}break;default:switch(a.localName){case "editinfo":return!1}}return!0}
var H=odf.Namespaces.textns,y=odf.Namespaces.drawns,B=/^\s*$/,L=new core.DomUtils;this.isImage=g;this.isCharacterFrame=l;this.isInlineRoot=f;this.isTextSpan=function(a){return"span"===(a&&a.localName)&&a.namespaceURI===H};this.isParagraph=p;this.getParagraphElement=r;this.isWithinTrackedChanges=function(a,b){for(;a&&a!==b;){if(a.namespaceURI===H&&"tracked-changes"===a.localName)return!0;a=a.parentNode}return!1};this.isListItem=function(a){return"list-item"===(a&&a.localName)&&a.namespaceURI===H};
this.isLineBreak=function(a){return"line-break"===(a&&a.localName)&&a.namespaceURI===H};this.isODFWhitespace=n;this.isGroupingElement=h;this.isCharacterElement=d;this.isAnchoredAsCharacterElement=m;this.isSpaceElement=c;this.firstChild=e;this.lastChild=a;this.previousNode=b;this.nextNode=q;this.scanLeftForNonSpace=k;this.lookLeftForCharacter=function(a){var c,e=c=0;a.nodeType===Node.TEXT_NODE&&(e=a.length);0<e?(c=a.data,c=n(c.substr(e-1,1))?1===e?k(b(a))?2:0:n(c.substr(e-2,1))?0:2:1):m(a)&&(c=1);
return c};this.lookRightForCharacter=function(a){var b=!1,c=0;a&&a.nodeType===Node.TEXT_NODE&&(c=a.length);0<c?b=!n(a.data.substr(0,1)):m(a)&&(b=!0);return b};this.scanLeftForAnyCharacter=function(c){var e=!1,d;for(c=c&&a(c);c;){d=c.nodeType===Node.TEXT_NODE?c.length:0;if(0<d&&!n(c.data)){e=!0;break}if(m(c)){e=!0;break}c=b(c)}return e};this.scanRightForAnyCharacter=t;this.isTrailingWhitespace=A;this.isSignificantWhitespace=w;this.isDowngradableSpaceElement=function(a){return a.namespaceURI===H&&"s"===
a.localName?k(b(a))&&t(q(a)):!1};this.getFirstNonWhitespaceChild=function(a){for(a=a&&a.firstChild;a&&a.nodeType===Node.TEXT_NODE&&B.test(a.nodeValue);)a=a.nextSibling;return a};this.parseLength=x;this.parseNonNegativeLength=v;this.parseFoFontSize=function(a){var b;b=(b=x(a))&&(0>=b.value||"%"===b.unit)?null:b;return b||u(a)};this.parseFoLineHeight=function(a){return v(a)||u(a)};this.getImpactedParagraphs=function(a){var b,c,e;b=a.commonAncestorContainer;var d=[],f=[];for(b.nodeType===Node.ELEMENT_NODE&&
(d=L.getElementsByTagNameNS(b,H,"p").concat(L.getElementsByTagNameNS(b,H,"h")));b&&!p(b);)b=b.parentNode;b&&d.push(b);c=d.length;for(b=0;b<c;b+=1)e=d[b],L.rangeIntersectsNode(a,e)&&f.push(e);return f};this.getTextNodes=function(a,b){var c=a.startContainer.ownerDocument.createRange(),e;e=L.getNodesInRange(a,function(e){c.selectNodeContents(e);if(e.nodeType===Node.TEXT_NODE){if(b&&L.rangesIntersect(a,c)||L.containsRange(a,c))return Boolean(r(e)&&(!n(e.textContent)||w(e,0)))?NodeFilter.FILTER_ACCEPT:
NodeFilter.FILTER_REJECT}else if(L.rangesIntersect(a,c)&&s(e))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});c.detach();return e};this.getTextElements=function(a,b,c){var e=a.startContainer.ownerDocument.createRange(),f;f=L.getNodesInRange(a,function(f){e.selectNodeContents(f);if(d(f.parentNode))return NodeFilter.FILTER_REJECT;if(f.nodeType===Node.TEXT_NODE){if(b&&L.rangesIntersect(a,e)||L.containsRange(a,e))if(c||Boolean(r(f)&&(!n(f.textContent)||w(f,0))))return NodeFilter.FILTER_ACCEPT}else if(m(f)){if(b&&
L.rangesIntersect(a,e)||L.containsRange(a,e))return NodeFilter.FILTER_ACCEPT}else if(s(f)||h(f))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});e.detach();return f};this.getParagraphElements=function(a){var b=a.startContainer.ownerDocument.createRange(),c;c=L.getNodesInRange(a,function(c){b.selectNodeContents(c);if(p(c)){if(L.rangesIntersect(a,b))return NodeFilter.FILTER_ACCEPT}else if(s(c)||h(c))return NodeFilter.FILTER_SKIP;return NodeFilter.FILTER_REJECT});b.detach();return c};
this.getImageElements=function(a){var b=a.startContainer.ownerDocument.createRange(),c;c=L.getNodesInRange(a,function(c){b.selectNodeContents(c);return g(c)&&L.containsRange(a,b)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});b.detach();return c}};
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
ops.Server=function(){};ops.Server.prototype.connect=function(g,l){};ops.Server.prototype.networkStatus=function(){};ops.Server.prototype.login=function(g,l,f,p){};ops.Server.prototype.joinSession=function(g,l,f,p){};ops.Server.prototype.leaveSession=function(g,l,f,p){};ops.Server.prototype.getGenesisUrl=function(g){};
// Input 22
xmldom.LSSerializerFilter=function(){};xmldom.LSSerializerFilter.prototype.acceptNode=function(g){};
// Input 23
xmldom.XPathIterator=function(){};xmldom.XPathIterator.prototype.next=function(){};xmldom.XPathIterator.prototype.reset=function(){};
function createXPathSingleton(){function g(c,a,b){return-1!==c&&(c<a||-1===a)&&(c<b||-1===b)}function l(e){for(var a=[],b=0,d=e.length,f;b<d;){var h=e,m=d,l=a,n="",p=[],r=h.indexOf("[",b),s=h.indexOf("/",b),H=h.indexOf("=",b);g(s,r,H)?(n=h.substring(b,s),b=s+1):g(r,s,H)?(n=h.substring(b,r),b=c(h,r,p)):g(H,s,r)?(n=h.substring(b,H),b=H):(n=h.substring(b,m),b=m);l.push({location:n,predicates:p});if(b<d&&"="===e[b]){f=e.substring(b+1,d);if(2<f.length&&("'"===f[0]||'"'===f[0]))f=f.slice(1,f.length-1);
else try{f=parseInt(f,10)}catch(y){}b=d}}return{steps:a,value:f}}function f(){var c=null,a=!1;this.setNode=function(a){c=a};this.reset=function(){a=!1};this.next=function(){var b=a?null:c;a=!0;return b}}function p(c,a,b){this.reset=function(){c.reset()};this.next=function(){for(var d=c.next();d;){d.nodeType===Node.ELEMENT_NODE&&(d=d.getAttributeNodeNS(a,b));if(d)break;d=c.next()}return d}}function r(c,a){var b=c.next(),d=null;this.reset=function(){c.reset();b=c.next();d=null};this.next=function(){for(;b;){if(d)if(a&&
d.firstChild)d=d.firstChild;else{for(;!d.nextSibling&&d!==b;)d=d.parentNode;d===b?b=c.next():d=d.nextSibling}else{do(d=b.firstChild)||(b=c.next());while(b&&!d)}if(d&&d.nodeType===Node.ELEMENT_NODE)return d}return null}}function n(c,a){this.reset=function(){c.reset()};this.next=function(){for(var b=c.next();b&&!a(b);)b=c.next();return b}}function h(c,a,b){a=a.split(":",2);var d=b(a[0]),f=a[1];return new n(c,function(a){return a.localName===f&&a.namespaceURI===d})}function d(c,a,b){var d=new f,k=m(d,
a,b),h=a.value;return void 0===h?new n(c,function(a){d.setNode(a);k.reset();return null!==k.next()}):new n(c,function(a){d.setNode(a);k.reset();return(a=k.next())?a.nodeValue===h:!1})}var m,c;c=function(c,a,b){for(var d=a,f=c.length,h=0;d<f;)"]"===c[d]?(h-=1,0>=h&&b.push(l(c.substring(a,d)))):"["===c[d]&&(0>=h&&(a=d+1),h+=1),d+=1;return d};m=function(c,a,b){var f,k,g,m;for(f=0;f<a.steps.length;f+=1){g=a.steps[f];k=g.location;if(""===k)c=new r(c,!1);else if("@"===k[0]){k=k.substr(1).split(":",2);m=
b(k[0]);if(!m)throw"No namespace associated with the prefix "+k[0];c=new p(c,m,k[1])}else"."!==k&&(c=new r(c,!1),-1!==k.indexOf(":")&&(c=h(c,k,b)));for(k=0;k<g.predicates.length;k+=1)m=g.predicates[k],c=d(c,m,b)}return c};return{getODFElementsWithXPath:function(c,a,b){var d=c.ownerDocument,k=[],h=null;if(d&&"function"===typeof d.evaluate)for(b=d.evaluate(a,c,b,XPathResult.UNORDERED_NODE_ITERATOR_TYPE,null),h=b.iterateNext();null!==h;)h.nodeType===Node.ELEMENT_NODE&&k.push(h),h=b.iterateNext();else{k=
new f;k.setNode(c);c=l(a);k=m(k,c,b);c=[];for(b=k.next();b;)c.push(b),b=k.next();k=c}return k}}}xmldom.XPath=createXPathSingleton();
// Input 24
runtime.loadClass("core.DomUtils");
core.Cursor=function(g,l){function f(a){a.parentNode&&(d.push(a.previousSibling),d.push(a.nextSibling),a.parentNode.removeChild(a))}function p(a,b,c){if(b.nodeType===Node.TEXT_NODE){runtime.assert(Boolean(b),"putCursorIntoTextNode: invalid container");var e=b.parentNode;runtime.assert(Boolean(e),"putCursorIntoTextNode: container without parent");runtime.assert(0<=c&&c<=b.length,"putCursorIntoTextNode: offset is out of bounds");0===c?e.insertBefore(a,b):(c!==b.length&&b.splitText(c),e.insertBefore(a,
b.nextSibling))}else b.nodeType===Node.ELEMENT_NODE&&b.insertBefore(a,b.childNodes.item(c));d.push(a.previousSibling);d.push(a.nextSibling)}var r=g.createElementNS("urn:webodf:names:cursor","cursor"),n=g.createElementNS("urn:webodf:names:cursor","anchor"),h,d=[],m=g.createRange(),c,e=new core.DomUtils;this.getNode=function(){return r};this.getAnchorNode=function(){return n.parentNode?n:r};this.getSelectedRange=function(){c?(m.setStartBefore(r),m.collapse(!0)):(m.setStartAfter(h?n:r),m.setEndBefore(h?
r:n));return m};this.setSelectedRange=function(a,b){m&&m!==a&&m.detach();m=a;h=!1!==b;(c=a.collapsed)?(f(n),f(r),p(r,a.startContainer,a.startOffset)):(f(n),f(r),p(h?r:n,a.endContainer,a.endOffset),p(h?n:r,a.startContainer,a.startOffset));d.forEach(e.normalizeTextNodes);d.length=0};this.hasForwardSelection=function(){return h};this.remove=function(){f(r);d.forEach(e.normalizeTextNodes);d.length=0};r.setAttributeNS("urn:webodf:names:cursor","memberId",l);n.setAttributeNS("urn:webodf:names:cursor","memberId",
l)};
// Input 25
runtime.loadClass("core.PositionIterator");core.PositionFilter=function(){};core.PositionFilter.FilterResult={FILTER_ACCEPT:1,FILTER_REJECT:2,FILTER_SKIP:3};core.PositionFilter.prototype.acceptPosition=function(g){};(function(){return core.PositionFilter})();
// Input 26
runtime.loadClass("core.PositionFilter");core.PositionFilterChain=function(){var g={},l=core.PositionFilter.FilterResult.FILTER_ACCEPT,f=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(p){for(var r in g)if(g.hasOwnProperty(r)&&g[r].acceptPosition(p)===f)return f;return l};this.addFilter=function(f,l){g[f]=l};this.removeFilter=function(f){delete g[f]}};
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
gui.AnnotationViewManager=function(g,l,f){function p(a){var b=a.node,d=a.end;a=m.createRange();d&&(a.setStart(b,b.childNodes.length),a.setEnd(d,0),d=c.getTextNodes(a,!1),d.forEach(function(a){var c=m.createElement("span"),d=b.getAttributeNS(odf.Namespaces.officens,"name");c.className="annotationHighlight";c.setAttribute("annotation",d);a.parentNode.insertBefore(c,a);c.appendChild(a)}));a.detach()}function r(a){var b=g.getSizer();a?(f.style.display="inline-block",b.style.paddingRight=e.getComputedStyle(f).width):
(f.style.display="none",b.style.paddingRight=0);g.refreshSize()}function n(){d.sort(function(a,b){return a.node.compareDocumentPosition(b.node)===Node.DOCUMENT_POSITION_FOLLOWING?-1:1})}function h(){var a;for(a=0;a<d.length;a+=1){var b=d[a],c=b.node.parentElement,e=c.nextElementSibling,h=e.nextElementSibling,m=c.parentElement,l=0,l=d[d.indexOf(b)-1],n=void 0,b=g.getZoomLevel();c.style.left=(f.getBoundingClientRect().left-m.getBoundingClientRect().left)/b+"px";c.style.width=f.getBoundingClientRect().width/
b+"px";e.style.width=parseFloat(c.style.left)-30+"px";l&&(n=l.node.parentElement.getBoundingClientRect(),20>=(m.getBoundingClientRect().top-n.bottom)/b?c.style.top=Math.abs(m.getBoundingClientRect().top-n.bottom)/b+20+"px":c.style.top="0px");h.style.left=e.getBoundingClientRect().width/b+"px";var e=h.style,m=h.getBoundingClientRect().left/b,l=h.getBoundingClientRect().top/b,n=c.getBoundingClientRect().left/b,r=c.getBoundingClientRect().top/b,p=0,s=0,p=n-m,p=p*p,s=r-l,s=s*s,m=Math.sqrt(p+s);e.width=
m+"px";l=Math.asin((c.getBoundingClientRect().top-h.getBoundingClientRect().top)/(b*parseFloat(h.style.width)));h.style.transform="rotate("+l+"rad)";h.style.MozTransform="rotate("+l+"rad)";h.style.WebkitTransform="rotate("+l+"rad)";h.style.msTransform="rotate("+l+"rad)"}}var d=[],m=l.ownerDocument,c=new odf.OdfUtils,e=runtime.getWindow();runtime.assert(Boolean(e),"Expected to be run in an environment which has a global window, like a browser.");this.rerenderAnnotations=h;this.addAnnotation=function(a){r(!0);
d.push({node:a.node,end:a.end});n();var b=m.createElement("div"),c=m.createElement("div"),e=m.createElement("div"),f=m.createElement("div"),g=m.createElement("div"),l=a.node;b.className="annotationWrapper";l.parentNode.insertBefore(b,l);c.className="annotationNote";c.appendChild(l);g.className="annotationRemoveButton";c.appendChild(g);e.className="annotationConnector horizontal";f.className="annotationConnector angular";b.appendChild(c);b.appendChild(e);b.appendChild(f);a.end&&p(a);h()};this.forgetAnnotations=
function(){for(;d.length;){var a=d[0],b=d.indexOf(a),c=a.node,e=c.parentNode.parentNode;"div"===e.localName&&(e.parentNode.insertBefore(c,e),e.parentNode.removeChild(e));a=a.node.getAttributeNS(odf.Namespaces.officens,"name");a=m.querySelectorAll('span.annotationHighlight[annotation="'+a+'"]');e=c=void 0;for(c=0;c<a.length;c+=1){for(e=a.item(c);e.firstChild;)e.parentNode.insertBefore(e.firstChild,e);e.parentNode.removeChild(e)}-1!==b&&d.splice(b,1);0===d.length&&r(!1)}}};
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
gui.SelectionMover=function(g,l){function f(){w.setUnfilteredPosition(g.getNode(),0);return w}function p(a,b){var c,d=null;a&&0<a.length&&(c=b?a.item(a.length-1):a.item(0));c&&(d={top:c.top,left:b?c.right:c.left,bottom:c.bottom});return d}function r(a,b,c,d){var e=a.nodeType;c.setStart(a,b);c.collapse(!d);d=p(c.getClientRects(),!0===d);!d&&0<b&&(c.setStart(a,b-1),c.setEnd(a,b),d=p(c.getClientRects(),!0));d||(e===Node.ELEMENT_NODE&&0<b&&a.childNodes.length>=b?d=r(a,b-1,c,!0):a.nodeType===Node.TEXT_NODE&&
0<b?d=r(a,b-1,c,!0):a.previousSibling?d=r(a.previousSibling,a.previousSibling.nodeType===Node.TEXT_NODE?a.previousSibling.textContent.length:a.previousSibling.childNodes.length,c,!0):a.parentNode&&a.parentNode!==l?d=r(a.parentNode,0,c,!1):(c.selectNode(l),d=p(c.getClientRects(),!1)));runtime.assert(Boolean(d),"No visible rectangle found");return d}function n(a,b,c){var d=a,e=f(),h,k=l.ownerDocument.createRange(),q=g.getSelectedRange().cloneRange(),m;for(h=r(e.container(),e.unfilteredDomOffset(),k);0<
d&&c();)d-=1;b?(b=e.container(),e=e.unfilteredDomOffset(),-1===A.comparePoints(q.startContainer,q.startOffset,b,e)?(q.setStart(b,e),m=!1):q.setEnd(b,e)):(q.setStart(e.container(),e.unfilteredDomOffset()),q.collapse(!0));g.setSelectedRange(q,m);e=f();q=r(e.container(),e.unfilteredDomOffset(),k);if(q.top===h.top||void 0===x)x=q.left;runtime.clearTimeout(v);v=runtime.setTimeout(function(){x=void 0},2E3);k.detach();return a-d}function h(a){var b=f();return a.acceptPosition(b)===u&&(b.setUnfilteredPosition(g.getAnchorNode(),
0),a.acceptPosition(b)===u)?!0:!1}function d(a,b,c){for(var d=new core.LoopWatchDog(1E4),e=0,f=0,h=0<=b?1:-1,k=0<=b?a.nextPosition:a.previousPosition;0!==b&&k();)d.check(),f+=h,c.acceptPosition(a)===u&&(b-=h,e+=f,f=0);return e}function m(a,b,c){for(var d=f(),e=new core.LoopWatchDog(1E4),h=0,k=0;0<a&&d.nextPosition();)e.check(),c.acceptPosition(d)===u&&(h+=1,b.acceptPosition(d)===u&&(k+=h,h=0,a-=1));return k}function c(a,b,c){for(var d=f(),e=new core.LoopWatchDog(1E4),h=0,k=0;0<a&&d.previousPosition();)e.check(),
c.acceptPosition(d)===u&&(h+=1,b.acceptPosition(d)===u&&(k+=h,h=0,a-=1));return k}function e(a,b){var c=f();return d(c,a,b)}function a(a,b,c){var e=f(),h=t.getParagraphElement(e.getCurrentNode()),k=0;e.setUnfilteredPosition(a,b);c.acceptPosition(e)!==u&&(k=d(e,-1,c),0===k||h&&h!==t.getParagraphElement(e.getCurrentNode()))&&(e.setUnfilteredPosition(a,b),k=d(e,1,c));return k}function b(a,b){var c=f(),d=0,e=0,h=0>a?-1:1;for(a=Math.abs(a);0<a;){for(var k=b,q=h,g=c,m=g.container(),n=0,p=null,v=void 0,
t=10,w=void 0,A=0,F=void 0,C=void 0,Y=void 0,w=void 0,U=l.ownerDocument.createRange(),R=new core.LoopWatchDog(1E4),w=r(m,g.unfilteredDomOffset(),U),F=w.top,C=void 0===x?w.left:x,Y=F;!0===(0>q?g.previousPosition():g.nextPosition());)if(R.check(),k.acceptPosition(g)===u&&(n+=1,m=g.container(),w=r(m,g.unfilteredDomOffset(),U),w.top!==F)){if(w.top!==Y&&Y!==F)break;Y=w.top;w=Math.abs(C-w.left);if(null===p||w<t)p=m,v=g.unfilteredDomOffset(),t=w,A=n}null!==p?(g.setUnfilteredPosition(p,v),n=A):n=0;U.detach();
d+=n;if(0===d)break;e+=d;a-=1}return e*h}function q(a,b){var c,d,e,h,k=f(),q=t.getParagraphElement(k.getCurrentNode()),g=0,m=l.ownerDocument.createRange();0>a?(c=k.previousPosition,d=-1):(c=k.nextPosition,d=1);for(e=r(k.container(),k.unfilteredDomOffset(),m);c.call(k);)if(b.acceptPosition(k)===u){if(t.getParagraphElement(k.getCurrentNode())!==q)break;h=r(k.container(),k.unfilteredDomOffset(),m);if(h.bottom!==e.bottom&&(e=h.top>=e.top&&h.bottom<e.bottom||h.top<=e.top&&h.bottom>e.bottom,!e))break;g+=
d;e=h}m.detach();return g}function k(a,b,c){runtime.assert(null!==a,"SelectionMover.countStepsToPosition called with element===null");var d=f(),e=d.container(),h=d.unfilteredDomOffset(),k=0,q=new core.LoopWatchDog(1E4);for(d.setUnfilteredPosition(a,b);c.acceptPosition(d)!==u&&d.previousPosition();)q.check();a=d.container();runtime.assert(Boolean(a),"SelectionMover.countStepsToPosition: positionIterator.container() returned null");b=d.unfilteredDomOffset();for(d.setUnfilteredPosition(e,h);c.acceptPosition(d)!==
u&&d.previousPosition();)q.check();e=A.comparePoints(a,b,d.container(),d.unfilteredDomOffset());if(0>e)for(;d.nextPosition()&&(q.check(),c.acceptPosition(d)===u&&(k+=1),d.container()!==a||d.unfilteredDomOffset()!==b););else if(0<e)for(;d.previousPosition()&&(q.check(),c.acceptPosition(d)!==u||(k-=1,d.container()!==a||d.unfilteredDomOffset()!==b)););return k}var t=new odf.OdfUtils,A=new core.DomUtils,w,x,v,u=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.movePointForward=function(a,b){return n(a,
b||!1,w.nextPosition)};this.movePointBackward=function(a,b){return n(a,b||!1,w.previousPosition)};this.getStepCounter=function(){return{countSteps:e,convertForwardStepsBetweenFilters:m,convertBackwardStepsBetweenFilters:c,countLinesSteps:b,countStepsToLineBoundary:q,countStepsToPosition:k,isPositionWalkable:h,countPositionsToNearestStep:a}};(function(){w=gui.SelectionMover.createPositionIterator(l);var a=l.ownerDocument.createRange();a.setStart(w.container(),w.unfilteredDomOffset());a.collapse(!0);
g.setSelectedRange(a)})()};gui.SelectionMover.createPositionIterator=function(g){var l=new function(){this.acceptNode=function(f){return f&&"urn:webodf:names:cursor"!==f.namespaceURI&&"urn:webodf:names:editinfo"!==f.namespaceURI?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}};return new core.PositionIterator(g,5,l,!1)};(function(){return gui.SelectionMover})();
// Input 29
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("xmldom.XPath");runtime.loadClass("core.CSSUnits");odf.StyleTreeNode=function(g){this.derivedStyles={};this.element=g};
odf.Style2CSS=function(){function g(a){var b,c,d,e={};if(!a)return e;for(a=a.firstElementChild;a;){if(c=a.namespaceURI!==k||"style"!==a.localName&&"default-style"!==a.localName?a.namespaceURI===w&&"list-style"===a.localName?"list":a.namespaceURI!==k||"page-layout"!==a.localName&&"default-page-layout"!==a.localName?void 0:"page":a.getAttributeNS(k,"family"))(b=a.getAttributeNS(k,"name"))||(b=""),e.hasOwnProperty(c)?d=e[c]:e[c]=d={},d[b]=a;a=a.nextElementSibling}return e}function l(a,b){if(a.hasOwnProperty(b))return a[b];
var c,d=null;for(c in a)if(a.hasOwnProperty(c)&&(d=l(a[c].derivedStyles,b)))break;return d}function f(a,b,c){var d,e,h;if(!b.hasOwnProperty(a))return null;d=new odf.StyleTreeNode(b[a]);e=d.element.getAttributeNS(k,"parent-style-name");h=null;e&&(h=l(c,e)||f(e,b,c));h?h.derivedStyles[a]=d:c[a]=d;delete b[a];return d}function p(a,b){for(var c in a)a.hasOwnProperty(c)&&f(c,a,b)}function r(a,b,c){var d=[];c=c.derivedStyles;var e;var f=u[a],h;void 0===f?b=null:(h=b?"["+f+'|style-name="'+b+'"]':"","presentation"===
f&&(f="draw",h=b?'[presentation|style-name="'+b+'"]':""),b=f+"|"+s[a].join(h+","+f+"|")+h);null!==b&&d.push(b);for(e in c)c.hasOwnProperty(e)&&(b=r(a,e,c[e]),d=d.concat(b));return d}function n(a,b,c){for(a=a&&a.firstElementChild;a&&(a.namespaceURI!==b||a.localName!==c);)a=a.nextElementSibling;return a}function h(a,b){var c="",d,e,f;for(d=0;d<b.length;d+=1)if(e=b[d],f=a.getAttributeNS(e[0],e[1])){f=f.trim();if(G.hasOwnProperty(e[1])){var h=f.indexOf(" "),k=void 0,q=void 0;-1!==h?(k=f.substring(0,h),
q=f.substring(h)):(k=f,q="");(k=O.parseLength(k))&&"pt"===k.unit&&0.75>k.value&&(f="0.75pt"+q)}e[2]&&(c+=e[2]+":"+f+";")}return c}function d(a){return(a=n(a,k,"text-properties"))?O.parseFoFontSize(a.getAttributeNS(b,"font-size")):null}function m(a,b,c,d){return b+b+c+c+d+d}function c(a,c,d,e){c='text|list[text|style-name="'+c+'"]';var f=d.getAttributeNS(w,"level");d=n(d,k,"list-level-properties");d=n(d,k,"list-level-label-alignment");var h,q;d&&(h=d.getAttributeNS(b,"text-indent"),q=d.getAttributeNS(b,
"margin-left"));h||(h="-0.6cm");d="-"===h.charAt(0)?h.substring(1):"-"+h;for(f=f&&parseInt(f,10);1<f;)c+=" > text|list-item > text|list",f-=1;if(q){f=c+" > text|list-item > *:not(text|list):first-child";f+="{";f=f+("margin-left:"+q+";")+"}";try{a.insertRule(f,a.cssRules.length)}catch(g){runtime.log("cannot load rule: "+f)}}e=c+" > text|list-item > *:not(text|list):first-child:before{"+e+";";e=e+"counter-increment:list;"+("margin-left:"+h+";");e+="width:"+d+";";e+="display:inline-block}";try{a.insertRule(e,
a.cssRules.length)}catch(m){runtime.log("cannot load rule: "+e)}}function e(f,g,l,p){if("list"===g)for(var s=p.element.firstChild,t,u;s;){if(s.namespaceURI===w)if(t=s,"list-level-style-number"===s.localName){var G=t;u=G.getAttributeNS(k,"num-format");var T=G.getAttributeNS(k,"num-suffix")||"",G=G.getAttributeNS(k,"num-prefix")||"",$={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},X="";G&&(X+=' "'+G+'"');X=$.hasOwnProperty(u)?X+(" counter(list, "+$[u]+")"):u?X+(' "'+u+
'"'):X+" ''";u="content:"+X+' "'+T+'"';c(f,l,t,u)}else"list-level-style-image"===s.localName?(u="content: none;",c(f,l,t,u)):"list-level-style-bullet"===s.localName&&(u="content: '"+t.getAttributeNS(w,"bullet-char")+"';",c(f,l,t,u));s=s.nextSibling}else if("page"===g){if(u=p.element,G=T=l="",s=n(u,k,"page-layout-properties"))if(t=u.getAttributeNS(k,"name"),l+=h(s,ja),(T=n(s,k,"background-image"))&&(G=T.getAttributeNS(x,"href"))&&(l=l+("background-image: url('odfkit:"+G+"');")+h(T,y)),"presentation"===
aa)for(u=(u=n(u.parentNode.parentElement,q,"master-styles"))&&u.firstElementChild;u;){if(u.namespaceURI===k&&"master-page"===u.localName&&u.getAttributeNS(k,"page-layout-name")===t){G=u.getAttributeNS(k,"name");T="draw|page[draw|master-page-name="+G+"] {"+l+"}";G="office|body, draw|page[draw|master-page-name="+G+"] {"+h(s,ka)+" }";try{f.insertRule(T,f.cssRules.length),f.insertRule(G,f.cssRules.length)}catch(da){throw da;}}u=u.nextElementSibling}else if("text"===aa){T="office|text {"+l+"}";G="office|body {width: "+
s.getAttributeNS(b,"page-width")+";}";try{f.insertRule(T,f.cssRules.length),f.insertRule(G,f.cssRules.length)}catch(S){throw S;}}}else{l=r(g,l,p).join(",");s="";if(t=n(p.element,k,"text-properties")){G=t;u=X="";T=1;t=""+h(G,H);$=G.getAttributeNS(k,"text-underline-style");"solid"===$&&(X+=" underline");$=G.getAttributeNS(k,"text-line-through-style");"solid"===$&&(X+=" line-through");X.length&&(t+="text-decoration:"+X+";");if(X=G.getAttributeNS(k,"font-name")||G.getAttributeNS(b,"font-family"))$=Z[X],
t+="font-family: "+($||X)+";";$=G.parentElement;if(G=d($)){for(;$;){if(G=d($)){if("%"!==G.unit){u="font-size: "+G.value*T+G.unit+";";break}T*=G.value/100}G=$;X=$="";$=null;"default-style"===G.localName?$=null:($=G.getAttributeNS(k,"parent-style-name"),X=G.getAttributeNS(k,"family"),$=C.getODFElementsWithXPath(J,$?"//style:*[@style:name='"+$+"'][@style:family='"+X+"']":"//style:default-style[@style:family='"+X+"']",odf.Namespaces.lookupNamespaceURI)[0])}u||(u="font-size: "+parseFloat(F)*T+Y.getUnits(F)+
";");t+=u}s+=t}if(t=n(p.element,k,"paragraph-properties"))u=t,t=""+h(u,B),(T=n(u,k,"background-image"))&&(G=T.getAttributeNS(x,"href"))&&(t=t+("background-image: url('odfkit:"+G+"');")+h(T,y)),(u=u.getAttributeNS(b,"line-height"))&&"normal"!==u&&(u=O.parseFoLineHeight(u),t="%"!==u.unit?t+("line-height: "+u.value+u.unit+";"):t+("line-height: "+u.value/100+";")),s+=t;if(t=n(p.element,k,"graphic-properties"))G=t,t=""+h(G,L),u=G.getAttributeNS(a,"opacity"),T=G.getAttributeNS(a,"fill"),G=G.getAttributeNS(a,
"fill-color"),"solid"===T||"hatch"===T?G&&"none"!==G?(u=isNaN(parseFloat(u))?1:parseFloat(u)/100,T=G.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,m),(G=(T=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(T))?{r:parseInt(T[1],16),g:parseInt(T[2],16),b:parseInt(T[3],16)}:null)&&(t+="background-color: rgba("+G.r+","+G.g+","+G.b+","+u+");")):t+="background: none;":"none"===T&&(t+="background: none;"),s+=t;if(t=n(p.element,k,"drawing-page-properties"))u=""+h(t,L),"true"===t.getAttributeNS(v,"background-visible")&&
(u+="background: none;"),s+=u;if(t=n(p.element,k,"table-cell-properties"))t=""+h(t,I),s+=t;if(t=n(p.element,k,"table-row-properties"))t=""+h(t,Q),s+=t;if(t=n(p.element,k,"table-column-properties"))t=""+h(t,W),s+=t;if(t=n(p.element,k,"table-properties"))u=t,t=""+h(u,z),u=u.getAttributeNS(A,"border-model"),"collapsing"===u?t+="border-collapse:collapse;":"separating"===u&&(t+="border-collapse:separate;"),s+=t;if(0!==s.length)try{f.insertRule(l+"{"+s+"}",f.cssRules.length)}catch(ga){throw ga;}}for(var E in p.derivedStyles)p.derivedStyles.hasOwnProperty(E)&&
e(f,g,E,p.derivedStyles[E])}var a=odf.Namespaces.drawns,b=odf.Namespaces.fons,q=odf.Namespaces.officens,k=odf.Namespaces.stylens,t=odf.Namespaces.svgns,A=odf.Namespaces.tablens,w=odf.Namespaces.textns,x=odf.Namespaces.xlinkns,v=odf.Namespaces.presentationns,u={graphic:"draw","drawing-page":"draw",paragraph:"text",presentation:"presentation",ruby:"text",section:"text",table:"table","table-cell":"table","table-column":"table","table-row":"table",text:"text",list:"text",page:"office"},s={graphic:"circle connected control custom-shape ellipse frame g line measure page page-thumbnail path polygon polyline rect regular-polygon".split(" "),
paragraph:"alphabetical-index-entry-template h illustration-index-entry-template index-source-style object-index-entry-template p table-index-entry-template table-of-content-entry-template user-index-entry-template".split(" "),presentation:"caption circle connector control custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),"drawing-page":"caption circle connector control page custom-shape ellipse frame g line measure page-thumbnail path polygon polyline rect regular-polygon".split(" "),
ruby:["ruby","ruby-text"],section:"alphabetical-index bibliography illustration-index index-title object-index section table-of-content table-index user-index".split(" "),table:["background","table"],"table-cell":"body covered-table-cell even-columns even-rows first-column first-row last-column last-row odd-columns odd-rows table-cell".split(" "),"table-column":["table-column"],"table-row":["table-row"],text:"a index-entry-chapter index-entry-link-end index-entry-link-start index-entry-page-number index-entry-span index-entry-tab-stop index-entry-text index-title-template linenumbering-configuration list-level-style-number list-level-style-bullet outline-level-style span".split(" "),
list:["list-item"]},H=[[b,"color","color"],[b,"background-color","background-color"],[b,"font-weight","font-weight"],[b,"font-style","font-style"]],y=[[k,"repeat","background-repeat"]],B=[[b,"background-color","background-color"],[b,"text-align","text-align"],[b,"text-indent","text-indent"],[b,"padding","padding"],[b,"padding-left","padding-left"],[b,"padding-right","padding-right"],[b,"padding-top","padding-top"],[b,"padding-bottom","padding-bottom"],[b,"border-left","border-left"],[b,"border-right",
"border-right"],[b,"border-top","border-top"],[b,"border-bottom","border-bottom"],[b,"margin","margin"],[b,"margin-left","margin-left"],[b,"margin-right","margin-right"],[b,"margin-top","margin-top"],[b,"margin-bottom","margin-bottom"],[b,"border","border"]],L=[[b,"background-color","background-color"],[b,"min-height","min-height"],[a,"stroke","border"],[t,"stroke-color","border-color"],[t,"stroke-width","border-width"],[b,"border","border"],[b,"border-left","border-left"],[b,"border-right","border-right"],
[b,"border-top","border-top"],[b,"border-bottom","border-bottom"]],I=[[b,"background-color","background-color"],[b,"border-left","border-left"],[b,"border-right","border-right"],[b,"border-top","border-top"],[b,"border-bottom","border-bottom"],[b,"border","border"]],W=[[k,"column-width","width"]],Q=[[k,"row-height","height"],[b,"keep-together",null]],z=[[k,"width","width"],[b,"margin-left","margin-left"],[b,"margin-right","margin-right"],[b,"margin-top","margin-top"],[b,"margin-bottom","margin-bottom"]],
ja=[[b,"background-color","background-color"],[b,"padding","padding"],[b,"padding-left","padding-left"],[b,"padding-right","padding-right"],[b,"padding-top","padding-top"],[b,"padding-bottom","padding-bottom"],[b,"border","border"],[b,"border-left","border-left"],[b,"border-right","border-right"],[b,"border-top","border-top"],[b,"border-bottom","border-bottom"],[b,"margin","margin"],[b,"margin-left","margin-left"],[b,"margin-right","margin-right"],[b,"margin-top","margin-top"],[b,"margin-bottom",
"margin-bottom"]],ka=[[b,"page-width","width"],[b,"page-height","height"]],G={border:!0,"border-left":!0,"border-right":!0,"border-top":!0,"border-bottom":!0,"stroke-width":!0},Z={},O=new odf.OdfUtils,aa,J,F,C=xmldom.XPath,Y=new core.CSSUnits;this.style2css=function(a,b,c,d,f){for(var h,k,q,m;b.cssRules.length;)b.deleteRule(b.cssRules.length-1);h=null;d&&(h=d.ownerDocument,J=d.parentNode);f&&(h=f.ownerDocument,J=f.parentNode);if(h)for(m in odf.Namespaces.forEachPrefix(function(a,c){k="@namespace "+
a+" url("+c+");";try{b.insertRule(k,b.cssRules.length)}catch(d){}}),Z=c,aa=a,F=runtime.getWindow().getComputedStyle(document.body,null).getPropertyValue("font-size")||"12pt",a=g(d),d=g(f),f={},u)if(u.hasOwnProperty(m))for(q in c=f[m]={},p(a[m],c),p(d[m],c),c)c.hasOwnProperty(q)&&e(b,m,q,c[q])}};
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
runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.Namespaces");
odf.StyleInfo=function(){function g(a,b){var c,d,e,f,h,k=0;if(c=B[a.localName])if(e=c[a.namespaceURI])k=e.length;for(c=0;c<k;c+=1)d=e[c],f=d.ns,h=d.localname,(d=a.getAttributeNS(f,h))&&a.setAttributeNS(f,H[f]+h,b+d);for(e=a.firstElementChild;e;)g(e,b),e=e.nextElementSibling}function l(a,b){var c,d,e,f,h,k=0;if(c=B[a.localName])if(e=c[a.namespaceURI])k=e.length;for(c=0;c<k;c+=1)if(d=e[c],f=d.ns,h=d.localname,d=a.getAttributeNS(f,h))d=d.replace(b,""),a.setAttributeNS(f,H[f]+h,d);for(e=a.firstElementChild;e;)l(e,
b),e=e.nextElementSibling}function f(a,b){var c,d,e,f,h,k=0;if(c=B[a.localName])if(e=c[a.namespaceURI])k=e.length;for(c=0;c<k;c+=1)if(f=e[c],d=f.ns,h=f.localname,d=a.getAttributeNS(d,h))b=b||{},f=f.keyname,b.hasOwnProperty(f)?b[f][d]=1:(h={},h[d]=1,b[f]=h);return b}function p(a,b){var c,d;f(a,b);for(c=a.firstChild;c;)c.nodeType===Node.ELEMENT_NODE&&(d=c,p(d,b)),c=c.nextSibling}function r(a,b,c){this.key=a;this.name=b;this.family=c;this.requires={}}function n(a,b,c){var d=a+'"'+b,e=c[d];e||(e=c[d]=
new r(d,a,b));return e}function h(a,b,c){var d,e,f,k,q,g=0;d=a.getAttributeNS(v,"name");k=a.getAttributeNS(v,"family");d&&k&&(b=n(d,k,c));if(b){if(d=B[a.localName])if(f=d[a.namespaceURI])g=f.length;for(d=0;d<g;d+=1)if(k=f[d],e=k.ns,q=k.localname,e=a.getAttributeNS(e,q))k=k.keyname,k=n(e,k,c),b.requires[k.key]=k}for(a=a.firstElementChild;a;)h(a,b,c),a=a.nextElementSibling;return c}function d(a,b){var c=b[a.family];c||(c=b[a.family]={});c[a.name]=1;Object.keys(a.requires).forEach(function(c){d(a.requires[c],
b)})}function m(a,b){var c=h(a,null,{});Object.keys(c).forEach(function(a){a=c[a];var e=b[a.family];e&&e.hasOwnProperty(a.name)&&d(a,b)})}function c(a,b){function d(b){(b=h.getAttributeNS(v,b))&&(a[b]=!0)}var e=["font-name","font-name-asian","font-name-complex"],f,h;for(f=b&&b.firstElementChild;f;)h=f,e.forEach(d),c(a,h),f=f.nextElementSibling}function e(a,b){function c(a){var d=h.getAttributeNS(v,a);d&&b.hasOwnProperty(d)&&h.setAttributeNS(v,"style:"+a,b[d])}var d=["font-name","font-name-asian",
"font-name-complex"],f,h;for(f=a&&a.firstElementChild;f;)h=f,d.forEach(c),e(h,b),f=f.nextElementSibling}var a=odf.Namespaces.chartns,b=odf.Namespaces.dbns,q=odf.Namespaces.dr3dns,k=odf.Namespaces.drawns,t=odf.Namespaces.formns,A=odf.Namespaces.numberns,w=odf.Namespaces.officens,x=odf.Namespaces.presentationns,v=odf.Namespaces.stylens,u=odf.Namespaces.tablens,s=odf.Namespaces.textns,H={"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:","urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:",
"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:","urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:","urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:","urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:","urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:","urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:","urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:","urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:","urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:",
"urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:","urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:","http://www.w3.org/XML/1998/namespace":"xml:"},y={text:[{ens:v,en:"tab-stop",ans:v,a:"leader-text-style"},{ens:v,en:"drop-cap",ans:v,a:"style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-body-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"citation-style-name"},{ens:s,en:"a",ans:s,a:"style-name"},{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"linenumbering-configuration",
ans:s,a:"style-name"},{ens:s,en:"list-level-style-number",ans:s,a:"style-name"},{ens:s,en:"ruby-text",ans:s,a:"style-name"},{ens:s,en:"span",ans:s,a:"style-name"},{ens:s,en:"a",ans:s,a:"visited-style-name"},{ens:v,en:"text-properties",ans:v,a:"text-line-through-text-style"},{ens:s,en:"alphabetical-index-source",ans:s,a:"main-entry-style-name"},{ens:s,en:"index-entry-bibliography",ans:s,a:"style-name"},{ens:s,en:"index-entry-chapter",ans:s,a:"style-name"},{ens:s,en:"index-entry-link-end",ans:s,a:"style-name"},
{ens:s,en:"index-entry-link-start",ans:s,a:"style-name"},{ens:s,en:"index-entry-page-number",ans:s,a:"style-name"},{ens:s,en:"index-entry-span",ans:s,a:"style-name"},{ens:s,en:"index-entry-tab-stop",ans:s,a:"style-name"},{ens:s,en:"index-entry-text",ans:s,a:"style-name"},{ens:s,en:"index-title-template",ans:s,a:"style-name"},{ens:s,en:"list-level-style-bullet",ans:s,a:"style-name"},{ens:s,en:"outline-level-style",ans:s,a:"style-name"}],paragraph:[{ens:k,en:"caption",ans:k,a:"text-style-name"},{ens:k,
en:"circle",ans:k,a:"text-style-name"},{ens:k,en:"connector",ans:k,a:"text-style-name"},{ens:k,en:"control",ans:k,a:"text-style-name"},{ens:k,en:"custom-shape",ans:k,a:"text-style-name"},{ens:k,en:"ellipse",ans:k,a:"text-style-name"},{ens:k,en:"frame",ans:k,a:"text-style-name"},{ens:k,en:"line",ans:k,a:"text-style-name"},{ens:k,en:"measure",ans:k,a:"text-style-name"},{ens:k,en:"path",ans:k,a:"text-style-name"},{ens:k,en:"polygon",ans:k,a:"text-style-name"},{ens:k,en:"polyline",ans:k,a:"text-style-name"},
{ens:k,en:"rect",ans:k,a:"text-style-name"},{ens:k,en:"regular-polygon",ans:k,a:"text-style-name"},{ens:w,en:"annotation",ans:k,a:"text-style-name"},{ens:t,en:"column",ans:t,a:"text-style-name"},{ens:v,en:"style",ans:v,a:"next-style-name"},{ens:u,en:"body",ans:u,a:"paragraph-style-name"},{ens:u,en:"even-columns",ans:u,a:"paragraph-style-name"},{ens:u,en:"even-rows",ans:u,a:"paragraph-style-name"},{ens:u,en:"first-column",ans:u,a:"paragraph-style-name"},{ens:u,en:"first-row",ans:u,a:"paragraph-style-name"},
{ens:u,en:"last-column",ans:u,a:"paragraph-style-name"},{ens:u,en:"last-row",ans:u,a:"paragraph-style-name"},{ens:u,en:"odd-columns",ans:u,a:"paragraph-style-name"},{ens:u,en:"odd-rows",ans:u,a:"paragraph-style-name"},{ens:s,en:"notes-configuration",ans:s,a:"default-style-name"},{ens:s,en:"alphabetical-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"bibliography-entry-template",ans:s,a:"style-name"},{ens:s,en:"h",ans:s,a:"style-name"},{ens:s,en:"illustration-index-entry-template",ans:s,a:"style-name"},
{ens:s,en:"index-source-style",ans:s,a:"style-name"},{ens:s,en:"object-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"p",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-of-content-entry-template",ans:s,a:"style-name"},{ens:s,en:"table-index-entry-template",ans:s,a:"style-name"},{ens:s,en:"user-index-entry-template",ans:s,a:"style-name"},{ens:v,en:"page-layout-properties",ans:v,a:"register-truth-ref-style-name"}],chart:[{ens:a,en:"axis",ans:a,
a:"style-name"},{ens:a,en:"chart",ans:a,a:"style-name"},{ens:a,en:"data-label",ans:a,a:"style-name"},{ens:a,en:"data-point",ans:a,a:"style-name"},{ens:a,en:"equation",ans:a,a:"style-name"},{ens:a,en:"error-indicator",ans:a,a:"style-name"},{ens:a,en:"floor",ans:a,a:"style-name"},{ens:a,en:"footer",ans:a,a:"style-name"},{ens:a,en:"grid",ans:a,a:"style-name"},{ens:a,en:"legend",ans:a,a:"style-name"},{ens:a,en:"mean-value",ans:a,a:"style-name"},{ens:a,en:"plot-area",ans:a,a:"style-name"},{ens:a,en:"regression-curve",
ans:a,a:"style-name"},{ens:a,en:"series",ans:a,a:"style-name"},{ens:a,en:"stock-gain-marker",ans:a,a:"style-name"},{ens:a,en:"stock-loss-marker",ans:a,a:"style-name"},{ens:a,en:"stock-range-line",ans:a,a:"style-name"},{ens:a,en:"subtitle",ans:a,a:"style-name"},{ens:a,en:"title",ans:a,a:"style-name"},{ens:a,en:"wall",ans:a,a:"style-name"}],section:[{ens:s,en:"alphabetical-index",ans:s,a:"style-name"},{ens:s,en:"bibliography",ans:s,a:"style-name"},{ens:s,en:"illustration-index",ans:s,a:"style-name"},
{ens:s,en:"index-title",ans:s,a:"style-name"},{ens:s,en:"object-index",ans:s,a:"style-name"},{ens:s,en:"section",ans:s,a:"style-name"},{ens:s,en:"table-of-content",ans:s,a:"style-name"},{ens:s,en:"table-index",ans:s,a:"style-name"},{ens:s,en:"user-index",ans:s,a:"style-name"}],ruby:[{ens:s,en:"ruby",ans:s,a:"style-name"}],table:[{ens:b,en:"query",ans:b,a:"style-name"},{ens:b,en:"table-representation",ans:b,a:"style-name"},{ens:u,en:"background",ans:u,a:"style-name"},{ens:u,en:"table",ans:u,a:"style-name"}],
"table-column":[{ens:b,en:"column",ans:b,a:"style-name"},{ens:u,en:"table-column",ans:u,a:"style-name"}],"table-row":[{ens:b,en:"query",ans:b,a:"default-row-style-name"},{ens:b,en:"table-representation",ans:b,a:"default-row-style-name"},{ens:u,en:"table-row",ans:u,a:"style-name"}],"table-cell":[{ens:b,en:"column",ans:b,a:"default-cell-style-name"},{ens:u,en:"table-column",ans:u,a:"default-cell-style-name"},{ens:u,en:"table-row",ans:u,a:"default-cell-style-name"},{ens:u,en:"body",ans:u,a:"style-name"},
{ens:u,en:"covered-table-cell",ans:u,a:"style-name"},{ens:u,en:"even-columns",ans:u,a:"style-name"},{ens:u,en:"covered-table-cell",ans:u,a:"style-name"},{ens:u,en:"even-columns",ans:u,a:"style-name"},{ens:u,en:"even-rows",ans:u,a:"style-name"},{ens:u,en:"first-column",ans:u,a:"style-name"},{ens:u,en:"first-row",ans:u,a:"style-name"},{ens:u,en:"last-column",ans:u,a:"style-name"},{ens:u,en:"last-row",ans:u,a:"style-name"},{ens:u,en:"odd-columns",ans:u,a:"style-name"},{ens:u,en:"odd-rows",ans:u,a:"style-name"},
{ens:u,en:"table-cell",ans:u,a:"style-name"}],graphic:[{ens:q,en:"cube",ans:k,a:"style-name"},{ens:q,en:"extrude",ans:k,a:"style-name"},{ens:q,en:"rotate",ans:k,a:"style-name"},{ens:q,en:"scene",ans:k,a:"style-name"},{ens:q,en:"sphere",ans:k,a:"style-name"},{ens:k,en:"caption",ans:k,a:"style-name"},{ens:k,en:"circle",ans:k,a:"style-name"},{ens:k,en:"connector",ans:k,a:"style-name"},{ens:k,en:"control",ans:k,a:"style-name"},{ens:k,en:"custom-shape",ans:k,a:"style-name"},{ens:k,en:"ellipse",ans:k,a:"style-name"},
{ens:k,en:"frame",ans:k,a:"style-name"},{ens:k,en:"g",ans:k,a:"style-name"},{ens:k,en:"line",ans:k,a:"style-name"},{ens:k,en:"measure",ans:k,a:"style-name"},{ens:k,en:"page-thumbnail",ans:k,a:"style-name"},{ens:k,en:"path",ans:k,a:"style-name"},{ens:k,en:"polygon",ans:k,a:"style-name"},{ens:k,en:"polyline",ans:k,a:"style-name"},{ens:k,en:"rect",ans:k,a:"style-name"},{ens:k,en:"regular-polygon",ans:k,a:"style-name"},{ens:w,en:"annotation",ans:k,a:"style-name"}],presentation:[{ens:q,en:"cube",ans:x,
a:"style-name"},{ens:q,en:"extrude",ans:x,a:"style-name"},{ens:q,en:"rotate",ans:x,a:"style-name"},{ens:q,en:"scene",ans:x,a:"style-name"},{ens:q,en:"sphere",ans:x,a:"style-name"},{ens:k,en:"caption",ans:x,a:"style-name"},{ens:k,en:"circle",ans:x,a:"style-name"},{ens:k,en:"connector",ans:x,a:"style-name"},{ens:k,en:"control",ans:x,a:"style-name"},{ens:k,en:"custom-shape",ans:x,a:"style-name"},{ens:k,en:"ellipse",ans:x,a:"style-name"},{ens:k,en:"frame",ans:x,a:"style-name"},{ens:k,en:"g",ans:x,a:"style-name"},
{ens:k,en:"line",ans:x,a:"style-name"},{ens:k,en:"measure",ans:x,a:"style-name"},{ens:k,en:"page-thumbnail",ans:x,a:"style-name"},{ens:k,en:"path",ans:x,a:"style-name"},{ens:k,en:"polygon",ans:x,a:"style-name"},{ens:k,en:"polyline",ans:x,a:"style-name"},{ens:k,en:"rect",ans:x,a:"style-name"},{ens:k,en:"regular-polygon",ans:x,a:"style-name"},{ens:w,en:"annotation",ans:x,a:"style-name"}],"drawing-page":[{ens:k,en:"page",ans:k,a:"style-name"},{ens:x,en:"notes",ans:k,a:"style-name"},{ens:v,en:"handout-master",
ans:k,a:"style-name"},{ens:v,en:"master-page",ans:k,a:"style-name"}],"list-style":[{ens:s,en:"list",ans:s,a:"style-name"},{ens:s,en:"numbered-paragraph",ans:s,a:"style-name"},{ens:s,en:"list-item",ans:s,a:"style-override"},{ens:v,en:"style",ans:v,a:"list-style-name"}],data:[{ens:v,en:"style",ans:v,a:"data-style-name"},{ens:v,en:"style",ans:v,a:"percentage-data-style-name"},{ens:x,en:"date-time-decl",ans:v,a:"data-style-name"},{ens:s,en:"creation-date",ans:v,a:"data-style-name"},{ens:s,en:"creation-time",
ans:v,a:"data-style-name"},{ens:s,en:"database-display",ans:v,a:"data-style-name"},{ens:s,en:"date",ans:v,a:"data-style-name"},{ens:s,en:"editing-duration",ans:v,a:"data-style-name"},{ens:s,en:"expression",ans:v,a:"data-style-name"},{ens:s,en:"meta-field",ans:v,a:"data-style-name"},{ens:s,en:"modification-date",ans:v,a:"data-style-name"},{ens:s,en:"modification-time",ans:v,a:"data-style-name"},{ens:s,en:"print-date",ans:v,a:"data-style-name"},{ens:s,en:"print-time",ans:v,a:"data-style-name"},{ens:s,
en:"table-formula",ans:v,a:"data-style-name"},{ens:s,en:"time",ans:v,a:"data-style-name"},{ens:s,en:"user-defined",ans:v,a:"data-style-name"},{ens:s,en:"user-field-get",ans:v,a:"data-style-name"},{ens:s,en:"user-field-input",ans:v,a:"data-style-name"},{ens:s,en:"variable-get",ans:v,a:"data-style-name"},{ens:s,en:"variable-input",ans:v,a:"data-style-name"},{ens:s,en:"variable-set",ans:v,a:"data-style-name"}],"page-layout":[{ens:x,en:"notes",ans:v,a:"page-layout-name"},{ens:v,en:"handout-master",ans:v,
a:"page-layout-name"},{ens:v,en:"master-page",ans:v,a:"page-layout-name"}]},B,L=xmldom.XPath;this.collectUsedFontFaces=c;this.changeFontFaceNames=e;this.UsedStyleList=function(a,b){var c={};this.uses=function(a){var b=a.localName,d=a.getAttributeNS(k,"name")||a.getAttributeNS(v,"name");a="style"===b?a.getAttributeNS(v,"family"):a.namespaceURI===A?"data":b;return(a=c[a])?0<a[d]:!1};p(a,c);b&&m(b,c)};this.hasDerivedStyles=function(a,b,c){var d=c.getAttributeNS(v,"name");c=c.getAttributeNS(v,"family");
return L.getODFElementsWithXPath(a,"//style:*[@style:parent-style-name='"+d+"'][@style:family='"+c+"']",b).length?!0:!1};this.prefixStyleNames=function(a,b,c){var d;if(a){for(d=a.firstChild;d;){if(d.nodeType===Node.ELEMENT_NODE){var e=d,f=b,h=e.getAttributeNS(k,"name"),q=void 0;h?q=k:(h=e.getAttributeNS(v,"name"))&&(q=v);q&&e.setAttributeNS(q,H[q]+"name",f+h)}d=d.nextSibling}g(a,b);c&&g(c,b)}};this.removePrefixFromStyleNames=function(a,b,c){var d=RegExp("^"+b);if(a){for(b=a.firstChild;b;){if(b.nodeType===
Node.ELEMENT_NODE){var e=b,f=d,h=e.getAttributeNS(k,"name"),q=void 0;h?q=k:(h=e.getAttributeNS(v,"name"))&&(q=v);q&&(h=h.replace(f,""),e.setAttributeNS(q,H[q]+"name",h))}b=b.nextSibling}l(a,d);c&&l(c,d)}};this.determineStylesForNode=f;B=function(){var a,b,c,d,e,f={},h,k,q,g;for(c in y)if(y.hasOwnProperty(c))for(d=y[c],b=d.length,a=0;a<b;a+=1)e=d[a],q=e.en,g=e.ens,f.hasOwnProperty(q)?h=f[q]:f[q]=h={},h.hasOwnProperty(g)?k=h[g]:h[g]=k=[],k.push({ns:e.ans,localname:e.a,keyname:c});return f}()};
// Input 32
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
odf.TextSerializer=function(){function g(p){var r="",n=l.filter?l.filter.acceptNode(p):NodeFilter.FILTER_ACCEPT,h=p.nodeType,d;if(n===NodeFilter.FILTER_ACCEPT||n===NodeFilter.FILTER_SKIP)for(d=p.firstChild;d;)r+=g(d),d=d.nextSibling;n===NodeFilter.FILTER_ACCEPT&&(h===Node.ELEMENT_NODE&&f.isParagraph(p)?r+="\n":h===Node.TEXT_NODE&&p.textContent&&(r+=p.textContent));return r}var l=this,f=new odf.OdfUtils;this.filter=null;this.writeToString=function(f){if(!f)return"";f=g(f);"\n"===f[f.length-1]&&(f=
f.substr(0,f.length-1));return f}};
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
runtime.loadClass("core.PositionFilter");runtime.loadClass("odf.OdfUtils");
ops.TextPositionFilter=function(g){function l(d,g,c){var e,a;if(g){if(f.isInlineRoot(g)&&f.isGroupingElement(c))return h;e=f.lookLeftForCharacter(g);if(1===e||2===e&&(f.scanRightForAnyCharacter(c)||f.scanRightForAnyCharacter(f.nextNode(d))))return n}e=null===g&&f.isParagraph(d);a=f.lookRightForCharacter(c);if(e)return a?n:f.scanRightForAnyCharacter(c)?h:n;if(!a)return h;g=g||f.previousNode(d);return f.scanLeftForAnyCharacter(g)?h:n}var f=new odf.OdfUtils,p=Node.ELEMENT_NODE,r=Node.TEXT_NODE,n=core.PositionFilter.FilterResult.FILTER_ACCEPT,
h=core.PositionFilter.FilterResult.FILTER_REJECT;this.acceptPosition=function(d){var m=d.container(),c=m.nodeType,e,a,b;if(c!==p&&c!==r)return h;if(c===r){if(!f.isGroupingElement(m.parentNode)||f.isWithinTrackedChanges(m.parentNode,g()))return h;c=d.unfilteredDomOffset();e=m.data;runtime.assert(c!==e.length,"Unexpected offset.");if(0<c){d=e[c-1];if(!f.isODFWhitespace(d))return n;if(1<c)if(d=e[c-2],!f.isODFWhitespace(d))a=n;else{if(!f.isODFWhitespace(e.substr(0,c)))return h}else b=f.previousNode(m),
f.scanLeftForNonSpace(b)&&(a=n);if(a===n)return f.isTrailingWhitespace(m,c)?h:n;a=e[c];return f.isODFWhitespace(a)?h:f.scanLeftForAnyCharacter(f.previousNode(m))?h:n}b=d.leftNode();a=m;m=m.parentNode;a=l(m,b,a)}else!f.isGroupingElement(m)||f.isWithinTrackedChanges(m,g())?a=h:(b=d.leftNode(),a=d.rightNode(),a=l(m,b,a));return a}};
// Input 34
"function"!==typeof Object.create&&(Object.create=function(g){var l=function(){};l.prototype=g;return new l});
xmldom.LSSerializer=function(){function g(f){var g=f||{},h=function(c){var a={},b;for(b in c)c.hasOwnProperty(b)&&(a[c[b]]=b);return a}(f),d=[g],m=[h],c=0;this.push=function(){c+=1;g=d[c]=Object.create(g);h=m[c]=Object.create(h)};this.pop=function(){d.pop();m.pop();c-=1;g=d[c];h=m[c]};this.getLocalNamespaceDefinitions=function(){return h};this.getQName=function(c){var a=c.namespaceURI,b=0,d;if(!a)return c.localName;if(d=h[a])return d+":"+c.localName;do{d||!c.prefix?(d="ns"+b,b+=1):d=c.prefix;if(g[d]===
a)break;if(!g[d]){g[d]=a;h[a]=d;break}d=null}while(null===d);return d+":"+c.localName}}function l(f){return f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&apos;").replace(/"/g,"&quot;")}function f(g,n){var h="",d=p.filter?p.filter.acceptNode(n):NodeFilter.FILTER_ACCEPT,m;if(d===NodeFilter.FILTER_ACCEPT&&n.nodeType===Node.ELEMENT_NODE){g.push();m=g.getQName(n);var c,e=n.attributes,a,b,q,k="",t;c="<"+m;a=e.length;for(b=0;b<a;b+=1)q=e.item(b),"http://www.w3.org/2000/xmlns/"!==
q.namespaceURI&&(t=p.filter?p.filter.acceptNode(q):NodeFilter.FILTER_ACCEPT,t===NodeFilter.FILTER_ACCEPT&&(t=g.getQName(q),q="string"===typeof q.value?l(q.value):q.value,k+=" "+(t+'="'+q+'"')));a=g.getLocalNamespaceDefinitions();for(b in a)a.hasOwnProperty(b)&&((e=a[b])?"xmlns"!==e&&(c+=" xmlns:"+a[b]+'="'+b+'"'):c+=' xmlns="'+b+'"');h+=c+(k+">")}if(d===NodeFilter.FILTER_ACCEPT||d===NodeFilter.FILTER_SKIP){for(d=n.firstChild;d;)h+=f(g,d),d=d.nextSibling;n.nodeValue&&(h+=l(n.nodeValue))}m&&(h+="</"+
m+">",g.pop());return h}var p=this;this.filter=null;this.writeToString=function(l,n){if(!l)return"";var h=new g(n);return f(h,l)}};
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
gui.Clipboard=function(){var g,l,f;this.setDataFromRange=function(f,r){var n=!0,h,d=f.clipboardData;h=runtime.getWindow();var m=r.startContainer.ownerDocument;!d&&h&&(d=h.clipboardData);d?(m=m.createElement("span"),m.appendChild(r.cloneContents()),h=d.setData("text/plain",l.writeToString(m)),n=n&&h,h=d.setData("text/html",g.writeToString(m,odf.Namespaces.namespaceMap)),n=n&&h,f.preventDefault()):n=!1;return n};g=new xmldom.LSSerializer;l=new odf.TextSerializer;f=new odf.OdfNodeFilter;g.filter=f;l.filter=
f};
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
runtime.loadClass("core.Base64");runtime.loadClass("core.Zip");runtime.loadClass("core.DomUtils");runtime.loadClass("xmldom.LSSerializer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfNodeFilter");
(function(){function g(a,b,c){for(a=a?a.firstChild:null;a;){if(a.localName===c&&a.namespaceURI===b)return a;a=a.nextSibling}return null}function l(a){var b,c=m.length;for(b=0;b<c;b+=1)if("urn:oasis:names:tc:opendocument:xmlns:office:1.0"===a.namespaceURI&&a.localName===m[b])return b;return-1}function f(a,b){var c=new n.UsedStyleList(a,b),d=new odf.OdfNodeFilter;this.acceptNode=function(a){var e=d.acceptNode(a);e===NodeFilter.FILTER_ACCEPT&&a.parentNode===b&&a.nodeType===Node.ELEMENT_NODE&&(e=c.uses(a)?
NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);return e}}function p(a,b){var c=new f(a,b);this.acceptNode=function(a){var b=c.acceptNode(a);b!==NodeFilter.FILTER_ACCEPT||!a.parentNode||a.parentNode.namespaceURI!==odf.Namespaces.textns||"s"!==a.parentNode.localName&&"tab"!==a.parentNode.localName||(b=NodeFilter.FILTER_REJECT);return b}}function r(a,b){if(b){var c=l(b),d,e=a.firstChild;if(-1!==c){for(;e;){d=l(e);if(-1!==d&&d>c)break;e=e.nextSibling}a.insertBefore(b,e)}}}var n=new odf.StyleInfo,
h=new core.DomUtils,d=odf.Namespaces.stylens,m="meta settings scripts font-face-decls styles automatic-styles master-styles body".split(" "),c=(new Date).getTime()+"_webodf_",e=new core.Base64;odf.ODFElement=function(){};odf.ODFDocumentElement=function(){};odf.ODFDocumentElement.prototype=new odf.ODFElement;odf.ODFDocumentElement.prototype.constructor=odf.ODFDocumentElement;odf.ODFDocumentElement.prototype.fontFaceDecls=null;odf.ODFDocumentElement.prototype.manifest=null;odf.ODFDocumentElement.prototype.settings=
null;odf.ODFDocumentElement.namespaceURI="urn:oasis:names:tc:opendocument:xmlns:office:1.0";odf.ODFDocumentElement.localName="document";odf.OdfPart=function(a,b,c,d){var e=this;this.size=0;this.type=null;this.name=a;this.container=c;this.url=null;this.mimetype=b;this.onstatereadychange=this.document=null;this.EMPTY=0;this.LOADING=1;this.DONE=2;this.state=this.EMPTY;this.data="";this.load=function(){null!==d&&(this.mimetype=b,d.loadAsDataURL(a,b,function(a,b){a&&runtime.log(a);e.url=b;if(e.onchange)e.onchange(e);
if(e.onstatereadychange)e.onstatereadychange(e)}))}};odf.OdfPart.prototype.load=function(){};odf.OdfPart.prototype.getUrl=function(){return this.data?"data:;base64,"+e.toBase64(this.data):null};odf.OdfContainer=function b(q,k){function m(b){for(var c=b.firstChild,d;c;)d=c.nextSibling,c.nodeType===Node.ELEMENT_NODE?m(c):c.nodeType===Node.PROCESSING_INSTRUCTION_NODE&&b.removeChild(c),c=d}function l(b,c){for(var d=b&&b.firstChild;d;)d.nodeType===Node.ELEMENT_NODE&&d.setAttributeNS("urn:webodf:names:scope",
"scope",c),d=d.nextSibling}function w(b){var c={},e;for(b=b.firstChild;b;)b.nodeType===Node.ELEMENT_NODE&&b.namespaceURI===d&&"font-face"===b.localName&&(e=b.getAttributeNS(d,"name"),c[e]=b),b=b.nextSibling;return c}function x(b,c){var d=null,e,f,h;if(b)for(d=b.cloneNode(!0),e=d.firstElementChild;e;)f=e.nextElementSibling,(h=e.getAttributeNS("urn:webodf:names:scope","scope"))&&h!==c&&d.removeChild(e),e=f;return d}function v(b,c){var e,f,h,k=null,g={};if(b)for(c.forEach(function(b){n.collectUsedFontFaces(g,
b)}),k=b.cloneNode(!0),e=k.firstElementChild;e;)f=e.nextElementSibling,h=e.getAttributeNS(d,"name"),g[h]||k.removeChild(e),e=f;return k}function u(b){var c=R.rootElement.ownerDocument,d;if(b){m(b.documentElement);try{d=c.importNode(b.documentElement,!0)}catch(e){}}return d}function s(b){R.state=b;if(R.onchange)R.onchange(R);if(R.onstatereadychange)R.onstatereadychange(R)}function H(b){ba=null;R.rootElement=b;b.fontFaceDecls=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls");
b.styles=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles");b.automaticStyles=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");b.masterStyles=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles");b.body=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");b.meta=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta")}function y(d){var e=u(d),f=R.rootElement,h;e&&"document-styles"===e.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===
e.namespaceURI?(f.fontFaceDecls=g(e,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","font-face-decls"),r(f,f.fontFaceDecls),h=g(e,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),f.styles=h||d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","styles"),r(f,f.styles),h=g(e,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),f.automaticStyles=h||d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles"),l(f.automaticStyles,
"document-styles"),r(f,f.automaticStyles),e=g(e,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),f.masterStyles=e||d.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","master-styles"),r(f,f.masterStyles),n.prefixStyleNames(f.automaticStyles,c,f.masterStyles)):s(b.INVALID)}function B(c){c=u(c);var e,f,h,k;if(c&&"document-content"===c.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===c.namespaceURI){e=R.rootElement;h=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"font-face-decls");if(e.fontFaceDecls&&h){k=e.fontFaceDecls;var q,m,p,t,v={};f=w(k);t=w(h);for(h=h.firstElementChild;h;){q=h.nextElementSibling;if(h.namespaceURI===d&&"font-face"===h.localName)if(m=h.getAttributeNS(d,"name"),f.hasOwnProperty(m)){if(!h.isEqualNode(f[m])){p=m;for(var y=f,I=t,z=0,B=void 0,B=p=p.replace(/\d+$/,"");y.hasOwnProperty(B)||I.hasOwnProperty(B);)z+=1,B=p+z;p=B;h.setAttributeNS(d,"style:name",p);k.appendChild(h);f[p]=h;delete t[m];v[m]=p}}else k.appendChild(h),f[m]=h,delete t[m];
h=q}k=v}else h&&(e.fontFaceDecls=h,r(e,h));f=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","automatic-styles");l(f,"document-content");k&&n.changeFontFaceNames(f,k);if(e.automaticStyles&&f)for(k=f.firstChild;k;)e.automaticStyles.appendChild(k),k=f.firstChild;else f&&(e.automaticStyles=f,r(e,f));c=g(c,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","body");if(null===c)throw"<office:body/> tag is mising.";e.body=c;r(e,e.body)}else s(b.INVALID)}function L(b){b=u(b);var c;b&&"document-meta"===
b.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI&&(c=R.rootElement,c.meta=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),r(c,c.meta))}function I(b){b=u(b);var c;b&&"document-settings"===b.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===b.namespaceURI&&(c=R.rootElement,c.settings=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","settings"),r(c,c.settings))}function W(b){b=u(b);var c;if(b&&"manifest"===b.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===
b.namespaceURI)for(c=R.rootElement,c.manifest=b,b=c.manifest.firstElementChild;b;)"file-entry"===b.localName&&"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0"===b.namespaceURI&&(M[b.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","full-path")]=b.getAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","media-type")),b=b.nextElementSibling}function Q(c){var d=c.shift();d?P.loadAsDOM(d.path,function(e,f){d.handler(f);e||R.state===b.INVALID||Q(c)}):s(b.DONE)}function z(b){var c=
"";odf.Namespaces.forEachPrefix(function(b,d){c+=" xmlns:"+b+'="'+d+'"'});return'<?xml version="1.0" encoding="UTF-8"?><office:'+b+" "+c+' office:version="1.2">'}function ja(){var b=new xmldom.LSSerializer,c=z("document-meta");b.filter=new odf.OdfNodeFilter;c+=b.writeToString(R.rootElement.meta,odf.Namespaces.namespaceMap);return c+"</office:document-meta>"}function ka(b,c){var d=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:file-entry");d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0",
"manifest:full-path",b);d.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest:media-type",c);return d}function G(){var b=runtime.parseXML('<manifest:manifest xmlns:manifest="urn:oasis:names:tc:opendocument:xmlns:manifest:1.0" manifest:version="1.2"></manifest:manifest>'),c=g(b,"urn:oasis:names:tc:opendocument:xmlns:manifest:1.0","manifest"),d=new xmldom.LSSerializer,e;for(e in M)M.hasOwnProperty(e)&&c.appendChild(ka(e,M[e]));d.filter=new odf.OdfNodeFilter;return'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n'+
d.writeToString(b,odf.Namespaces.namespaceMap)}function Z(){var b=new xmldom.LSSerializer,c=z("document-settings");b.filter=new odf.OdfNodeFilter;c+=b.writeToString(R.rootElement.settings,odf.Namespaces.namespaceMap);return c+"</office:document-settings>"}function O(){var b,d,e,h=odf.Namespaces.namespaceMap,k=new xmldom.LSSerializer,g=z("document-styles");d=x(R.rootElement.automaticStyles,"document-styles");e=R.rootElement.masterStyles.cloneNode(!0);b=v(R.rootElement.fontFaceDecls,[e,R.rootElement.styles,
d]);n.removePrefixFromStyleNames(d,c,e);k.filter=new f(e,d);g+=k.writeToString(b,h);g+=k.writeToString(R.rootElement.styles,h);g+=k.writeToString(d,h);g+=k.writeToString(e,h);return g+"</office:document-styles>"}function aa(){var b,c,d=odf.Namespaces.namespaceMap,e=new xmldom.LSSerializer,f=z("document-content");c=x(R.rootElement.automaticStyles,"document-content");b=v(R.rootElement.fontFaceDecls,[c]);e.filter=new p(R.rootElement.body,c);f+=e.writeToString(b,d);f+=e.writeToString(c,d);f+=e.writeToString(R.rootElement.body,
d);return f+"</office:document-content>"}function J(c,d){runtime.loadXML(c,function(c,e){if(c)d(c);else{var f=u(e);f&&"document"===f.localName&&"urn:oasis:names:tc:opendocument:xmlns:office:1.0"===f.namespaceURI?(H(f),s(b.DONE)):s(b.INVALID)}})}function F(b,c){var d;d=R.rootElement;var e=d.meta;e||(d.meta=e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","meta"),r(d,e));d=e;b&&h.mapKeyValObjOntoNode(d,b,odf.Namespaces.lookupNamespaceURI);c&&h.removeKeyElementsFromNode(d,
c,odf.Namespaces.lookupNamespaceURI)}function C(){function c(b,d){var e;d||(d=b);e=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0",d);f[b]=e;f.appendChild(e)}var d=new core.Zip("",null),e=runtime.byteArrayFromString("application/vnd.oasis.opendocument.text","utf8"),f=R.rootElement,h=document.createElementNS("urn:oasis:names:tc:opendocument:xmlns:office:1.0","text");d.save("mimetype",e,!1,new Date);c("meta");c("settings");c("scripts");c("fontFaceDecls","font-face-decls");
c("styles");c("automaticStyles","automatic-styles");c("masterStyles","master-styles");c("body");f.body.appendChild(h);s(b.DONE);return d}function Y(){var b,c=new Date,d=runtime.getWindow();b="WebODF/"+("undefined"!==String(typeof webodf_version)?webodf_version:"FromSource");d&&(b=b+" "+d.navigator.userAgent);F({"meta:generator":b},null);b=runtime.byteArrayFromString(Z(),"utf8");P.save("settings.xml",b,!0,c);b=runtime.byteArrayFromString(ja(),"utf8");P.save("meta.xml",b,!0,c);b=runtime.byteArrayFromString(O(),
"utf8");P.save("styles.xml",b,!0,c);b=runtime.byteArrayFromString(aa(),"utf8");P.save("content.xml",b,!0,c);b=runtime.byteArrayFromString(G(),"utf8");P.save("META-INF/manifest.xml",b,!0,c)}function U(b,c){Y();P.writeAs(b,function(b){c(b)})}var R=this,P,M={},ba;this.onstatereadychange=k;this.state=this.onchange=null;this.setRootElement=H;this.getContentElement=function(){var b;ba||(b=R.rootElement.body,ba=g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","text")||g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0",
"presentation")||g(b,"urn:oasis:names:tc:opendocument:xmlns:office:1.0","spreadsheet"));if(!ba)throw"Could not find content element in <office:body/>.";return ba};this.getDocumentType=function(){var b=R.getContentElement();return b&&b.localName};this.getPart=function(b){return new odf.OdfPart(b,M[b],R,P)};this.getPartData=function(b,c){P.load(b,c)};this.setMetadata=F;this.incrementEditingCycles=function(){var b;for(b=(b=R.rootElement.meta)&&b.firstChild;b&&(b.namespaceURI!==odf.Namespaces.metans||
"editing-cycles"!==b.localName);)b=b.nextSibling;for(b=b&&b.firstChild;b&&b.nodeType!==Node.TEXT_NODE;)b=b.nextSibling;b=b?b.data:null;b=b?parseInt(b,10):0;isNaN(b)&&(b=0);F({"meta:editing-cycles":b+1},null)};this.createByteArray=function(b,c){Y();P.createByteArray(b,c)};this.saveAs=U;this.save=function(b){U(q,b)};this.getUrl=function(){return q};this.setBlob=function(b,c,d){d=e.convertBase64ToByteArray(d);P.save(b,d,!1,new Date);M.hasOwnProperty(b)&&runtime.log(b+" has been overwritten.");M[b]=c};
this.removeBlob=function(b){var c=P.remove(b);runtime.assert(c,"file is not found: "+b);delete M[b]};this.state=b.LOADING;this.rootElement=function(b){var c=document.createElementNS(b.namespaceURI,b.localName),d;b=new b.Type;for(d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);return c}({Type:odf.ODFDocumentElement,namespaceURI:odf.ODFDocumentElement.namespaceURI,localName:odf.ODFDocumentElement.localName});P=q?new core.Zip(q,function(c,d){P=d;c?J(q,function(d){c&&(P.error=c+"\n"+d,s(b.INVALID))}):Q([{path:"styles.xml",
handler:y},{path:"content.xml",handler:B},{path:"meta.xml",handler:L},{path:"settings.xml",handler:I},{path:"META-INF/manifest.xml",handler:W}])}):C()};odf.OdfContainer.EMPTY=0;odf.OdfContainer.LOADING=1;odf.OdfContainer.DONE=2;odf.OdfContainer.INVALID=3;odf.OdfContainer.SAVING=4;odf.OdfContainer.MODIFIED=5;odf.OdfContainer.getContainer=function(b){return new odf.OdfContainer(b,null)};return odf.OdfContainer})();
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
runtime.loadClass("core.Base64");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.OdfContainer");
(function(){function g(l,r,n,h,d){var m,c=0,e;for(e in l)if(l.hasOwnProperty(e)){if(c===n){m=e;break}c+=1}m?r.getPartData(l[m].href,function(a,b){if(a)runtime.log(a);else if(b){var c="@font-face { font-family: '"+(l[m].family||m)+"'; src: url(data:application/x-font-ttf;charset=binary;base64,"+f.convertUTF8ArrayToBase64(b)+') format("truetype"); }';try{h.insertRule(c,h.cssRules.length)}catch(e){runtime.log("Problem inserting rule in CSS: "+runtime.toJson(e)+"\nRule: "+c)}}else runtime.log("missing font data for "+
l[m].href);g(l,r,n+1,h,d)}):d&&d()}var l=xmldom.XPath,f=new core.Base64;odf.FontLoader=function(){this.loadFonts=function(f,r){for(var n=f.rootElement.fontFaceDecls;r.cssRules.length;)r.deleteRule(r.cssRules.length-1);if(n){var h={},d,m,c,e;if(n)for(n=l.getODFElementsWithXPath(n,"style:font-face[svg:font-face-src]",odf.Namespaces.lookupNamespaceURI),d=0;d<n.length;d+=1)m=n[d],c=m.getAttributeNS(odf.Namespaces.stylens,"name"),e=m.getAttributeNS(odf.Namespaces.svgns,"font-family"),m=l.getODFElementsWithXPath(m,
"svg:font-face-src/svg:font-face-uri",odf.Namespaces.lookupNamespaceURI),0<m.length&&(m=m[0].getAttributeNS(odf.Namespaces.xlinkns,"href"),h[c]={href:m,family:e});g(h,f,0,r)}}};return odf.FontLoader})();
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
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Utils");
odf.ObjectNameGenerator=function(g,l){function f(a,b){var c={};this.generateName=function(){var d=b(),e=0,f;do f=a+e,e+=1;while(c[f]||d[f]);c[f]=!0;return f}}function p(){var a={};[g.rootElement.automaticStyles,g.rootElement.styles].forEach(function(b){for(b=b.firstElementChild;b;)b.namespaceURI===r&&"style"===b.localName&&(a[b.getAttributeNS(r,"name")]=!0),b=b.nextElementSibling});return a}var r=odf.Namespaces.stylens,n=odf.Namespaces.drawns,h=odf.Namespaces.xlinkns,d=new core.DomUtils,m=(new core.Utils).hashString(l),
c=null,e=null,a=null,b={},q={};this.generateStyleName=function(){null===c&&(c=new f("auto"+m+"_",function(){return p()}));return c.generateName()};this.generateFrameName=function(){null===e&&(d.getElementsByTagNameNS(g.rootElement.body,n,"frame").forEach(function(a){b[a.getAttributeNS(n,"name")]=!0}),e=new f("fr"+m+"_",function(){return b}));return e.generateName()};this.generateImageName=function(){null===a&&(d.getElementsByTagNameNS(g.rootElement.body,n,"image").forEach(function(a){a=a.getAttributeNS(h,
"href");a=a.substring(9,a.lastIndexOf("."));q[a]=!0}),a=new f("img"+m+"_",function(){return q}));return a.generateName()}};
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
runtime.loadClass("core.Utils");runtime.loadClass("odf.ObjectNameGenerator");runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.StyleInfo");runtime.loadClass("odf.OdfUtils");
odf.Formatting=function(){function g(a){return(a=u[a])?v.mergeObjects({},a):{}}function l(a,b,c){for(a=a&&a.firstElementChild;a&&(a.namespaceURI!==b||a.localName!==c);)a=a.nextElementSibling;return a}function f(){for(var a=e.rootElement.fontFaceDecls,c={},d,f,a=a&&a.firstElementChild;a;){if(d=a.getAttributeNS(q,"name"))if((f=a.getAttributeNS(b,"font-family"))||0<a.getElementsByTagNameNS(b,"font-face-uri").length)c[d]=f;a=a.nextElementSibling}return c}function p(a){for(var b=e.rootElement.styles.firstElementChild;b;){if(b.namespaceURI===
q&&"default-style"===b.localName&&b.getAttributeNS(q,"family")===a)return b;b=b.nextElementSibling}return null}function r(a,b,c){var d,f,h;c=c||[e.rootElement.automaticStyles,e.rootElement.styles];for(h=0;h<c.length;h+=1)for(d=c[h],d=d.firstElementChild;d;){f=d.getAttributeNS(q,"name");if(d.namespaceURI===q&&"style"===d.localName&&d.getAttributeNS(q,"family")===b&&f===a||"list-style"===b&&d.namespaceURI===k&&"list-style"===d.localName&&f===a||"data"===b&&d.namespaceURI===t&&f===a)return d;d=d.nextElementSibling}return null}
function n(a){for(var b,c,d,e,f={},h=a.firstElementChild;h;){if(h.namespaceURI===q)for(d=f[h.nodeName]={},c=h.attributes,b=0;b<c.length;b+=1)e=c.item(b),d[e.name]=e.value;h=h.nextElementSibling}c=a.attributes;for(b=0;b<c.length;b+=1)e=c.item(b),f[e.name]=e.value;return f}function h(a,b){for(var c=e.rootElement.styles,d,f={},h=a.getAttributeNS(q,"family"),k=a;k;)d=n(k),f=v.mergeObjects(d,f),k=(d=k.getAttributeNS(q,"parent-style-name"))?r(d,h,[c]):null;if(k=p(h))d=n(k),f=v.mergeObjects(d,f);b&&(d=g(h))&&
(f=v.mergeObjects(d,f));return f}function d(b,c){function d(a){Object.keys(a).forEach(function(b){Object.keys(a[b]).forEach(function(a){k+="|"+b+":"+a+"|"})})}for(var e=b.nodeType===Node.TEXT_NODE?b.parentNode:b,f,h=[],k="",g=!1;e;)!g&&w.isGroupingElement(e)&&(g=!0),(f=a.determineStylesForNode(e))&&h.push(f),e=e.parentElement;g&&(h.forEach(d),c&&(c[k]=h));return g?h:void 0}function m(a){var b={orderedStyles:[]};a.forEach(function(a){Object.keys(a).forEach(function(c){var d=Object.keys(a[c])[0],e,
f;(e=r(d,c))?(f=h(e),b=v.mergeObjects(f,b),f=e.getAttributeNS(q,"display-name")):runtime.log("No style element found for '"+d+"' of family '"+c+"'");b.orderedStyles.push({name:d,family:c,displayName:f})})});return b}function c(a,b){var c=w.parseLength(a),d=b;if(c)switch(c.unit){case "cm":d=c.value;break;case "mm":d=0.1*c.value;break;case "in":d=2.54*c.value;break;case "pt":d=0.035277778*c.value;break;case "pc":case "px":case "em":break;default:runtime.log("Unit identifier: "+c.unit+" is not supported.")}return d}
var e,a=new odf.StyleInfo,b=odf.Namespaces.svgns,q=odf.Namespaces.stylens,k=odf.Namespaces.textns,t=odf.Namespaces.numberns,A=odf.Namespaces.fons,w=new odf.OdfUtils,x=new core.DomUtils,v=new core.Utils,u={paragraph:{"style:paragraph-properties":{"fo:text-align":"left"}}};this.getSystemDefaultStyleAttributes=g;this.setOdfContainer=function(a){e=a};this.getFontMap=f;this.getAvailableParagraphStyles=function(){for(var a=e.rootElement.styles,b,c,d=[],a=a&&a.firstElementChild;a;)"style"===a.localName&&
a.namespaceURI===q&&(b=a.getAttributeNS(q,"family"),"paragraph"===b&&(b=a.getAttributeNS(q,"name"),c=a.getAttributeNS(q,"display-name")||b,b&&c&&d.push({name:b,displayName:c}))),a=a.nextElementSibling;return d};this.isStyleUsed=function(b){var c,d=e.rootElement;c=a.hasDerivedStyles(d,odf.Namespaces.lookupNamespaceURI,b);b=(new a.UsedStyleList(d.styles)).uses(b)||(new a.UsedStyleList(d.automaticStyles)).uses(b)||(new a.UsedStyleList(d.body)).uses(b);return c||b};this.getDefaultStyleElement=p;this.getStyleElement=
r;this.getStyleAttributes=n;this.getInheritedStyleAttributes=h;this.getFirstCommonParentStyleNameOrSelf=function(a){var b=e.rootElement.automaticStyles,c=e.rootElement.styles,d;for(d=r(a,"paragraph",[b]);d;)a=d.getAttributeNS(q,"parent-style-name"),d=r(a,"paragraph",[b]);return(d=r(a,"paragraph",[c]))?a:null};this.hasParagraphStyle=function(a){return Boolean(r(a,"paragraph"))};this.getAppliedStyles=function(a){var b={},c=[];a.forEach(function(a){d(a,b)});Object.keys(b).forEach(function(a){c.push(m(b[a]))});
return c};this.getAppliedStylesForElement=function(a){return(a=d(a))?m(a):void 0};this.updateStyle=function(a,c){var d,h;x.mapObjOntoNode(a,c,odf.Namespaces.lookupNamespaceURI);(d=c["style:text-properties"]&&c["style:text-properties"]["style:font-name"])&&!f().hasOwnProperty(d)&&(h=a.ownerDocument.createElementNS(q,"style:font-face"),h.setAttributeNS(q,"style:name",d),h.setAttributeNS(b,"svg:font-family",d),e.rootElement.fontFaceDecls.appendChild(h))};this.createDerivedStyleObject=function(a,b,c){var d=
r(a,b);runtime.assert(Boolean(d),"No style element found for '"+a+"' of family '"+b+"'");a=d.parentNode===e.rootElement.automaticStyles?n(d):{"style:parent-style-name":a};a["style:family"]=b;v.mergeObjects(a,c);return a};this.getDefaultTabStopDistance=function(){for(var a=p("paragraph"),a=a&&a.firstElementChild,b;a;)a.namespaceURI===q&&"paragraph-properties"===a.localName&&(b=a.getAttributeNS(q,"tab-stop-distance")),a=a.nextElementSibling;b||(b="1.25cm");return w.parseNonNegativeLength(b)};this.getContentSize=
function(a,b){var d,f,h,k,g,m,n,p,t,v,u;a:{var w,aa,J;d=r(a,b);runtime.assert("paragraph"===b||"table"===b,"styleFamily has to be either paragraph or table");if(d){w=d.getAttributeNS(q,"master-page-name")||"Standard";for(d=e.rootElement.masterStyles.lastElementChild;d&&d.getAttributeNS(q,"name")!==w;)d=d.previousElementSibling;w=d.getAttributeNS(q,"page-layout-name");aa=x.getElementsByTagNameNS(e.rootElement.automaticStyles,q,"page-layout");for(J=0;J<aa.length;J+=1)if(d=aa[J],d.getAttributeNS(q,"name")===
w)break a}d=null}d||(d=l(e.rootElement.styles,q,"default-page-layout"));if(d=l(d,q,"page-layout-properties"))f=d.getAttributeNS(q,"print-orientation")||"portrait","portrait"===f?(f=21.001,h=29.7):(f=29.7,h=21.001),f=c(d.getAttributeNS(A,"page-width"),f),h=c(d.getAttributeNS(A,"page-height"),h),k=c(d.getAttributeNS(A,"margin"),null),null===k?(k=c(d.getAttributeNS(A,"margin-left"),2),g=c(d.getAttributeNS(A,"margin-right"),2),m=c(d.getAttributeNS(A,"margin-top"),2),n=c(d.getAttributeNS(A,"margin-bottom"),
2)):k=g=m=n=k,p=c(d.getAttributeNS(A,"padding"),null),null===p?(p=c(d.getAttributeNS(A,"padding-left"),0),t=c(d.getAttributeNS(A,"padding-right"),0),v=c(d.getAttributeNS(A,"padding-top"),0),u=c(d.getAttributeNS(A,"padding-bottom"),0)):p=t=v=u=p;return{width:f-k-g-p-t,height:h-m-n-v-u}}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfContainer");runtime.loadClass("odf.Formatting");runtime.loadClass("xmldom.XPath");runtime.loadClass("odf.FontLoader");runtime.loadClass("odf.Style2CSS");runtime.loadClass("odf.OdfUtils");runtime.loadClass("gui.AnnotationViewManager");
(function(){function g(){function a(d){c=!0;runtime.setTimeout(function(){try{d()}catch(e){runtime.log(String(e))}c=!1;0<b.length&&a(b.pop())},10)}var b=[],c=!1;this.clearQueue=function(){b.length=0};this.addToQueue=function(d){if(0===b.length&&!c)return a(d);b.push(d)}}function l(a){function b(){for(;0<c.cssRules.length;)c.deleteRule(0);c.insertRule("#shadowContent draw|page {display:none;}",0);c.insertRule("office|presentation draw|page {display:none;}",1);c.insertRule("#shadowContent draw|page:nth-of-type("+
d+") {display:block;}",2);c.insertRule("office|presentation draw|page:nth-of-type("+d+") {display:block;}",3)}var c=a.sheet,d=1;this.showFirstPage=function(){d=1;b()};this.showNextPage=function(){d+=1;b()};this.showPreviousPage=function(){1<d&&(d-=1,b())};this.showPage=function(a){0<a&&(d=a,b())};this.css=a;this.destroy=function(b){a.parentNode.removeChild(a);b()}}function f(a){for(;a.firstChild;)a.removeChild(a.firstChild)}function p(a,b,c){(new odf.Style2CSS).style2css(a.getDocumentType(),c.sheet,
b.getFontMap(),a.rootElement.styles,a.rootElement.automaticStyles)}function r(a,b,c){var d=null;a=a.rootElement.body.getElementsByTagNameNS(L,c+"-decl");c=b.getAttributeNS(L,"use-"+c+"-name");var e;if(c&&0<a.length)for(b=0;b<a.length;b+=1)if(e=a[b],e.getAttributeNS(L,"name")===c){d=e.textContent;break}return d}function n(a,b,c,d){var e=a.ownerDocument;b=a.getElementsByTagNameNS(b,c);for(a=0;a<b.length;a+=1)f(b[a]),d&&(c=b[a],c.appendChild(e.createTextNode(d)))}function h(a,b,c){b.setAttributeNS("urn:webodf:names:helper",
"styleid",a);var d,e=b.getAttributeNS(H,"anchor-type"),f=b.getAttributeNS(u,"x"),h=b.getAttributeNS(u,"y"),k=b.getAttributeNS(u,"width"),g=b.getAttributeNS(u,"height"),q=b.getAttributeNS(w,"min-height"),m=b.getAttributeNS(w,"min-width");if("as-char"===e)d="display: inline-block;";else if(e||f||h)d="position: absolute;";else if(k||g||q||m)d="display: block;";f&&(d+="left: "+f+";");h&&(d+="top: "+h+";");k&&(d+="width: "+k+";");g&&(d+="height: "+g+";");q&&(d+="min-height: "+q+";");m&&(d+="min-width: "+
m+";");d&&(d="draw|"+b.localName+'[webodfhelper|styleid="'+a+'"] {'+d+"}",c.insertRule(d,c.cssRules.length))}function d(a){for(a=a.firstChild;a;){if(a.namespaceURI===x&&"binary-data"===a.localName)return"data:image/png;base64,"+a.textContent.replace(/[\r\n\s]/g,"");a=a.nextSibling}return""}function m(a,b,c,e){function f(b){b&&(b='draw|image[webodfhelper|styleid="'+a+'"] {'+("background-image: url("+b+");")+"}",e.insertRule(b,e.cssRules.length))}function h(a){f(a.url)}c.setAttributeNS("urn:webodf:names:helper",
"styleid",a);var k=c.getAttributeNS(y,"href"),g;if(k)try{g=b.getPart(k),g.onchange=h,g.load()}catch(q){runtime.log("slight problem: "+String(q))}else k=d(c),f(k)}function c(a){function b(c){var d,e;c.hasAttributeNS(y,"href")&&(d=c.getAttributeNS(y,"href"),"#"===d[0]?(d=d.substring(1),e=function(){var b=W.getODFElementsWithXPath(a,"//text:bookmark-start[@text:name='"+d+"']",odf.Namespaces.lookupNamespaceURI);0===b.length&&(b=W.getODFElementsWithXPath(a,"//text:bookmark[@text:name='"+d+"']",odf.Namespaces.lookupNamespaceURI));
0<b.length&&b[0].scrollIntoView(!0);return!1}):e=function(){I.open(d)},c.onclick=e)}var c,d,e;d=a.getElementsByTagNameNS(H,"a");for(c=0;c<d.length;c+=1)e=d.item(c),b(e)}function e(a){var b=a.ownerDocument;z.getElementsByTagNameNS(a,H,"line-break").forEach(function(a){a.hasChildNodes()||a.appendChild(b.createElement("br"))})}function a(a){var b=a.ownerDocument;z.getElementsByTagNameNS(a,H,"s").forEach(function(a){for(var c,d;a.firstChild;)a.removeChild(a.firstChild);a.appendChild(b.createTextNode(" "));
d=parseInt(a.getAttributeNS(H,"c"),10);if(1<d)for(a.removeAttributeNS(H,"c"),c=1;c<d;c+=1)a.parentNode.insertBefore(a.cloneNode(!0),a)})}function b(a){z.getElementsByTagNameNS(a,H,"tab").forEach(function(a){a.textContent="\t"})}function q(a,b){function c(a,d){var e=g.documentElement.namespaceURI;"video/"===d.substr(0,6)?(f=g.createElementNS(e,"video"),f.setAttribute("controls","controls"),h=g.createElementNS(e,"source"),a&&h.setAttribute("src",a),h.setAttribute("type",d),f.appendChild(h),b.parentNode.appendChild(f)):
b.innerHtml="Unrecognised Plugin"}function e(a){c(a.url,a.mimetype)}var f,h,k,g=b.ownerDocument,q;if(k=b.getAttributeNS(y,"href"))try{q=a.getPart(k),q.onchange=e,q.load()}catch(m){runtime.log("slight problem: "+String(m))}else runtime.log("using MP4 data fallback"),k=d(b),c(k,"video/mp4")}function k(a){var b=a.getElementsByTagName("head")[0],c;"undefined"!==String(typeof webodf_css)?(c=a.createElementNS(b.namespaceURI,"style"),c.setAttribute("media","screen, print, handheld, projection"),c.appendChild(a.createTextNode(webodf_css))):
(c=a.createElementNS(b.namespaceURI,"link"),a="webodf.css",runtime.currentDirectory&&(a=runtime.currentDirectory()+"/../"+a),c.setAttribute("href",a),c.setAttribute("rel","stylesheet"));c.setAttribute("type","text/css");b.appendChild(c);return c}function t(a){var b=a.getElementsByTagName("head")[0],c=a.createElementNS(b.namespaceURI,"style"),d="";c.setAttribute("type","text/css");c.setAttribute("media","screen, print, handheld, projection");odf.Namespaces.forEachPrefix(function(a,b){d+="@namespace "+
a+" url("+b+");\n"});d+="@namespace webodfhelper url(urn:webodf:names:helper);\n";c.appendChild(a.createTextNode(d));b.appendChild(c);return c}var A=odf.Namespaces.drawns,w=odf.Namespaces.fons,x=odf.Namespaces.officens,v=odf.Namespaces.stylens,u=odf.Namespaces.svgns,s=odf.Namespaces.tablens,H=odf.Namespaces.textns,y=odf.Namespaces.xlinkns,B=odf.Namespaces.xmlns,L=odf.Namespaces.presentationns,I=runtime.getWindow(),W=xmldom.XPath,Q=new odf.OdfUtils,z=new core.DomUtils;odf.OdfCanvas=function(d){function u(a,
b,c){function d(a,b,c,e){E.addToQueue(function(){m(a,b,c,e)})}var e,f;e=b.getElementsByTagNameNS(A,"image");for(b=0;b<e.length;b+=1)f=e.item(b),d("image"+String(b),a,f,c)}function w(a,b){function c(a,b){E.addToQueue(function(){q(a,b)})}var d,e,f;e=b.getElementsByTagNameNS(A,"plugin");for(d=0;d<e.length;d+=1)f=e.item(d),c(a,f)}function y(){M.firstChild&&(1<S?(M.style.MozTransformOrigin="center top",M.style.WebkitTransformOrigin="center top",M.style.OTransformOrigin="center top",M.style.msTransformOrigin=
"center top"):(M.style.MozTransformOrigin="left top",M.style.WebkitTransformOrigin="left top",M.style.OTransformOrigin="left top",M.style.msTransformOrigin="left top"),M.style.WebkitTransform="scale("+S+")",M.style.MozTransform="scale("+S+")",M.style.OTransform="scale("+S+")",M.style.msTransform="scale("+S+")",d.style.width=Math.round(S*M.offsetWidth)+"px",d.style.height=Math.round(S*M.offsetHeight)+"px")}function O(a){function b(a){return d===a.getAttributeNS(x,"name")}var c=z.getElementsByTagNameNS(a,
x,"annotation");a=z.getElementsByTagNameNS(a,x,"annotation-end");var d,e;for(e=0;e<c.length;e+=1)d=c[e].getAttributeNS(x,"name"),ca.addAnnotation({node:c[e],end:a.filter(b)[0]||null});ca.rerenderAnnotations()}function aa(a){la?(ba.parentNode||(M.appendChild(ba),y()),ca&&ca.forgetAnnotations(),ca=new gui.AnnotationViewManager(C,a.body,ba),O(a.body)):ba.parentNode&&(M.removeChild(ba),ca.forgetAnnotations(),y())}function J(k){function g(){f(d);d.style.display="inline-block";var q=U.rootElement;d.ownerDocument.importNode(q,
!0);R.setOdfContainer(U);var m=U,l=T;(new odf.FontLoader).loadFonts(m,l.sheet);p(U,R,$);l=U;m=X.sheet;f(d);M=Y.createElementNS(d.namespaceURI,"div");M.style.display="inline-block";M.style.background="white";M.appendChild(q);d.appendChild(M);ba=Y.createElementNS(d.namespaceURI,"div");ba.id="annotationsPane";da=Y.createElementNS(d.namespaceURI,"div");da.id="shadowContent";da.style.position="absolute";da.style.top=0;da.style.left=0;l.getContentElement().appendChild(da);var t=q.body,z,D=[],C;for(z=t.firstElementChild;z&&
z!==t;)if(z.namespaceURI===A&&(D[D.length]=z),z.firstElementChild)z=z.firstElementChild;else{for(;z&&z!==t&&!z.nextElementSibling;)z=z.parentElement;z&&z.nextElementSibling&&(z=z.nextElementSibling)}for(C=0;C<D.length;C+=1)z=D[C],h("frame"+String(C),z,m);D=W.getODFElementsWithXPath(t,".//*[*[@text:anchor-type='paragraph']]",odf.Namespaces.lookupNamespaceURI);for(z=0;z<D.length;z+=1)t=D[z],t.setAttributeNS&&t.setAttributeNS("urn:webodf:names:helper","containsparagraphanchor",!0);var t=da,O,E,F;F=0;
var J,P,D=l.rootElement.ownerDocument;if((z=q.body.firstElementChild)&&z.namespaceURI===x&&("presentation"===z.localName||"drawing"===z.localName))for(z=z.firstElementChild;z;){C=z.getAttributeNS(A,"master-page-name");if(C){for(O=l.rootElement.masterStyles.firstElementChild;O&&(O.getAttributeNS(v,"name")!==C||"master-page"!==O.localName||O.namespaceURI!==v););C=O}else C=null;if(C){O=z.getAttributeNS("urn:webodf:names:helper","styleid");E=D.createElementNS(A,"draw:page");P=C.firstElementChild;for(J=
0;P;)"true"!==P.getAttributeNS(L,"placeholder")&&(F=P.cloneNode(!0),E.appendChild(F),h(O+"_"+J,F,m)),P=P.nextElementSibling,J+=1;P=J=F=void 0;var V=E.getElementsByTagNameNS(A,"frame");for(F=0;F<V.length;F+=1)J=V[F],(P=J.getAttributeNS(L,"class"))&&!/^(date-time|footer|header|page-number')$/.test(P)&&J.parentNode.removeChild(J);t.appendChild(E);F=String(t.getElementsByTagNameNS(A,"page").length);n(E,H,"page-number",F);n(E,L,"header",r(l,z,"header"));n(E,L,"footer",r(l,z,"footer"));h(O,E,m);E.setAttributeNS(A,
"draw:master-page-name",C.getAttributeNS(v,"name"))}z=z.nextElementSibling}t=d.namespaceURI;D=q.body.getElementsByTagNameNS(s,"table-cell");for(z=0;z<D.length;z+=1)C=D.item(z),C.hasAttributeNS(s,"number-columns-spanned")&&C.setAttributeNS(t,"colspan",C.getAttributeNS(s,"number-columns-spanned")),C.hasAttributeNS(s,"number-rows-spanned")&&C.setAttributeNS(t,"rowspan",C.getAttributeNS(s,"number-rows-spanned"));c(q.body);e(q.body);a(q.body);b(q.body);u(l,q.body,m);w(l,q.body);C=q.body;l=d.namespaceURI;
z={};var D={},K;O=I.document.getElementsByTagNameNS(H,"list-style");for(t=0;t<O.length;t+=1)J=O.item(t),(P=J.getAttributeNS(v,"name"))&&(D[P]=J);C=C.getElementsByTagNameNS(H,"list");for(t=0;t<C.length;t+=1)if(J=C.item(t),O=J.getAttributeNS(B,"id")){E=J.getAttributeNS(H,"continue-list");J.setAttributeNS(l,"id",O);F="text|list#"+O+" > text|list-item > *:first-child:before {";if(P=J.getAttributeNS(H,"style-name")){J=D[P];K=Q.getFirstNonWhitespaceChild(J);J=void 0;if(K)if("list-level-style-number"===
K.localName){J=K.getAttributeNS(v,"num-format");P=K.getAttributeNS(v,"num-suffix")||"";var V="",V={1:"decimal",a:"lower-latin",A:"upper-latin",i:"lower-roman",I:"upper-roman"},S=void 0,S=K.getAttributeNS(v,"num-prefix")||"",S=V.hasOwnProperty(J)?S+(" counter(list, "+V[J]+")"):J?S+("'"+J+"';"):S+" ''";P&&(S+=" '"+P+"'");J=V="content: "+S+";"}else"list-level-style-image"===K.localName?J="content: none;":"list-level-style-bullet"===K.localName&&(J="content: '"+K.getAttributeNS(H,"bullet-char")+"';");
K=J}if(E){for(J=z[E];J;)J=z[J];F+="counter-increment:"+E+";";K?(K=K.replace("list",E),F+=K):F+="content:counter("+E+");"}else E="",K?(K=K.replace("list",O),F+=K):F+="content: counter("+O+");",F+="counter-increment:"+O+";",m.insertRule("text|list#"+O+" {counter-reset:"+O+"}",m.cssRules.length);F+="}";z[O]=E;F&&m.insertRule(F,m.cssRules.length)}M.insertBefore(da,M.firstChild);y();aa(q);if(!k&&(q=[U],ga.hasOwnProperty("statereadychange")))for(m=ga.statereadychange,K=0;K<m.length;K+=1)m[K].apply(null,
q)}U.state===odf.OdfContainer.DONE?g():(runtime.log("WARNING: refreshOdf called but ODF was not DONE."),runtime.setTimeout(function ha(){U.state===odf.OdfContainer.DONE?g():(runtime.log("will be back later..."),runtime.setTimeout(ha,500))},100))}function F(a){E.clearQueue();d.innerHTML=runtime.tr("Loading")+" "+a+"...";d.removeAttribute("style");U=new odf.OdfContainer(a,function(a){U=a;J(!1)})}runtime.assert(null!==d&&void 0!==d,"odf.OdfCanvas constructor needs DOM element");runtime.assert(null!==
d.ownerDocument&&void 0!==d.ownerDocument,"odf.OdfCanvas constructor needs DOM");var C=this,Y=d.ownerDocument,U,R=new odf.Formatting,P,M=null,ba=null,la=!1,ca=null,ma,T,$,X,da,S=1,ga={},E=new g;this.refreshCSS=function(){p(U,R,$);y()};this.refreshSize=function(){y()};this.odfContainer=function(){return U};this.setOdfContainer=function(a,b){U=a;J(!0===b)};this.load=this.load=F;this.save=function(a){U.save(a)};this.addListener=function(a,b){switch(a){case "click":var c=d,e=a;c.addEventListener?c.addEventListener(e,
b,!1):c.attachEvent?c.attachEvent("on"+e,b):c["on"+e]=b;break;default:c=ga.hasOwnProperty(a)?ga[a]:ga[a]=[],b&&-1===c.indexOf(b)&&c.push(b)}};this.getFormatting=function(){return R};this.getAnnotationViewManager=function(){return ca};this.refreshAnnotations=function(){aa(U.rootElement)};this.rerenderAnnotations=function(){ca&&ca.rerenderAnnotations()};this.getSizer=function(){return M};this.enableAnnotations=function(a){a!==la&&(la=a,U&&aa(U.rootElement))};this.addAnnotation=function(a){ca&&ca.addAnnotation(a)};
this.forgetAnnotations=function(){ca&&ca.forgetAnnotations()};this.setZoomLevel=function(a){S=a;y()};this.getZoomLevel=function(){return S};this.fitToContainingElement=function(a,b){var c=d.offsetHeight/S;S=a/(d.offsetWidth/S);b/c<S&&(S=b/c);y()};this.fitToWidth=function(a){S=a/(d.offsetWidth/S);y()};this.fitSmart=function(a,b){var c,e;c=d.offsetWidth/S;e=d.offsetHeight/S;c=a/c;void 0!==b&&b/e<c&&(c=b/e);S=Math.min(1,c);y()};this.fitToHeight=function(a){S=a/(d.offsetHeight/S);y()};this.showFirstPage=
function(){P.showFirstPage()};this.showNextPage=function(){P.showNextPage()};this.showPreviousPage=function(){P.showPreviousPage()};this.showPage=function(a){P.showPage(a);y()};this.getElement=function(){return d};this.addCssForFrameWithImage=function(a){var b=a.getAttributeNS(A,"name"),c=a.firstElementChild;h(b,a,X.sheet);c&&m(b+"img",U,c,X.sheet)};this.destroy=function(a){var b=Y.getElementsByTagName("head")[0];ba&&ba.parentNode&&ba.parentNode.removeChild(ba);M&&(d.removeChild(M),M=null);b.removeChild(ma);
b.removeChild(T);b.removeChild($);b.removeChild(X);P.destroy(a)};ma=k(Y);P=new l(t(Y));T=t(Y);$=t(Y);X=t(Y)}})();
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
runtime.loadClass("core.DomUtils");runtime.loadClass("core.LoopWatchDog");runtime.loadClass("odf.Namespaces");
odf.TextStyleApplicator=function(g,l,f){function p(c){function d(a,b){return"object"===typeof a&&"object"===typeof b?Object.keys(a).every(function(c){return d(a[c],b[c])}):a===b}this.isStyleApplied=function(a){a=l.getAppliedStylesForElement(a);return d(c,a)}}function r(c){var e={};this.applyStyleToContainer=function(a){var b;b=a.getAttributeNS(d,"style-name");var h=a.ownerDocument;b=b||"";if(!e.hasOwnProperty(b)){var k=b,n;n=b?l.createDerivedStyleObject(b,"text",c):c;h=h.createElementNS(m,"style:style");
l.updateStyle(h,n);h.setAttributeNS(m,"style:name",g.generateStyleName());h.setAttributeNS(m,"style:family","text");h.setAttributeNS("urn:webodf:names:scope","scope","document-content");f.appendChild(h);e[k]=h}b=e[b].getAttributeNS(m,"name");a.setAttributeNS(d,"text:style-name",b)}}function n(c,e){var a=c.ownerDocument,b=c.parentNode,f,k,g=new core.LoopWatchDog(1E4);k=[];"span"!==b.localName||b.namespaceURI!==d?(f=a.createElementNS(d,"text:span"),b.insertBefore(f,c),b=!1):(c.previousSibling&&!h.rangeContainsNode(e,
b.firstChild)?(f=b.cloneNode(!1),b.parentNode.insertBefore(f,b.nextSibling)):f=b,b=!0);k.push(c);for(a=c.nextSibling;a&&h.rangeContainsNode(e,a);)g.check(),k.push(a),a=a.nextSibling;k.forEach(function(a){a.parentNode!==f&&f.appendChild(a)});if(a&&b)for(k=f.cloneNode(!1),f.parentNode.insertBefore(k,f.nextSibling);a;)g.check(),b=a.nextSibling,k.appendChild(a),a=b;return f}var h=new core.DomUtils,d=odf.Namespaces.textns,m=odf.Namespaces.stylens;this.applyStyle=function(c,d,a){var b={},f,h,g,m;runtime.assert(a&&
a.hasOwnProperty("style:text-properties"),"applyStyle without any text properties");b["style:text-properties"]=a["style:text-properties"];g=new r(b);m=new p(b);c.forEach(function(a){f=m.isStyleApplied(a);!1===f&&(h=n(a,d),g.applyStyleToContainer(h))})}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");
gui.StyleHelper=function(g){function l(f,h,d){var g=!0,c;for(c=0;c<f.length&&!(g=f[c]["style:text-properties"],g=!g||g[h]!==d);c+=1);return!g}function f(f,h,d){function m(){b=!0;(e=g.getDefaultStyleElement("paragraph"))||(e=null)}var c,e;f=p.getParagraphElements(f);for(var a={},b=!1;0<f.length;){(c=f[0].getAttributeNS(r,"style-name"))?a[c]||(e=g.getStyleElement(c,"paragraph"),a[c]=!0,e||b||m()):b?e=void 0:m();if(void 0!==e&&(c=null===e?g.getSystemDefaultStyleAttributes("paragraph"):g.getInheritedStyleAttributes(e,
!0),(c=c["style:paragraph-properties"])&&-1===d.indexOf(c[h])))return!1;f.pop()}return!0}var p=new odf.OdfUtils,r=odf.Namespaces.textns;this.getAppliedStyles=function(f){var h;f.collapsed?(h=f.startContainer,h.hasChildNodes()&&f.startOffset<h.childNodes.length&&(h=h.childNodes.item(f.startOffset)),f=[h]):f=p.getTextNodes(f,!0);return g.getAppliedStyles(f)};this.isBold=function(f){return l(f,"fo:font-weight","bold")};this.isItalic=function(f){return l(f,"fo:font-style","italic")};this.hasUnderline=
function(f){return l(f,"style:text-underline-style","solid")};this.hasStrikeThrough=function(f){return l(f,"style:text-line-through-style","solid")};this.isAlignedLeft=function(g){return f(g,"fo:text-align",["left","start"])};this.isAlignedCenter=function(g){return f(g,"fo:text-align",["center"])};this.isAlignedRight=function(g){return f(g,"fo:text-align",["right","end"])};this.isAlignedJustified=function(g){return f(g,"fo:text-align",["justify"])}};
// Input 43
core.RawDeflate=function(){function g(){this.dl=this.fc=0}function l(){this.extra_bits=this.static_tree=this.dyn_tree=null;this.max_code=this.max_length=this.elems=this.extra_base=0}function f(a,b,c,d){this.good_length=a;this.max_lazy=b;this.nice_length=c;this.max_chain=d}function p(){this.next=null;this.len=0;this.ptr=[];this.ptr.length=r;this.off=0}var r=8192,n,h,d,m,c=null,e,a,b,q,k,t,A,w,x,v,u,s,H,y,B,L,I,W,Q,z,ja,ka,G,Z,O,aa,J,F,C,Y,U,R,P,M,ba,la,ca,ma,T,$,X,da,S,ga,E,fa,D,pa,ha,ia,Da,N=[0,0,
0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],qa=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],sa=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],xa=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],ra;ra=[new f(0,0,0,0),new f(4,4,8,4),new f(4,5,16,8),new f(4,6,32,32),new f(4,4,16,16),new f(8,16,32,32),new f(8,16,128,128),new f(8,32,128,256),new f(32,128,258,1024),new f(32,258,258,4096)];var Aa=function(b){c[a+e++]=b;if(a+e===r){var f;if(0!==e){null!==n?(b=n,n=n.next):b=new p;
b.next=null;b.len=b.off=0;null===h?h=d=b:d=d.next=b;b.len=e-a;for(f=0;f<b.len;f++)b.ptr[f]=c[a+f];e=a=0}}},ta=function(b){b&=65535;a+e<r-2?(c[a+e++]=b&255,c[a+e++]=b>>>8):(Aa(b&255),Aa(b>>>8))},Ba=function(){u=(u<<5^q[I+3-1]&255)&8191;s=A[32768+u];A[I&32767]=s;A[32768+u]=I},V=function(a,b){x>16-b?(w|=a<<x,ta(w),w=a>>16-x,x+=b-16):(w|=a<<x,x+=b)},K=function(a,b){V(b[a].fc,b[a].dl)},ua=function(a,b,c){return a[b].fc<a[c].fc||a[b].fc===a[c].fc&&ca[b]<=ca[c]},na=function(a,b,c){var d;for(d=0;d<c&&Da<
ia.length;d++)a[b+d]=ia.charCodeAt(Da++)&255;return d},ea=function(){var a,b,c=65536-z-I;if(-1===c)c--;else if(65274<=I){for(a=0;32768>a;a++)q[a]=q[a+32768];W-=32768;I-=32768;v-=32768;for(a=0;8192>a;a++)b=A[32768+a],A[32768+a]=32768<=b?b-32768:0;for(a=0;32768>a;a++)b=A[a],A[a]=32768<=b?b-32768:0;c+=32768}Q||(a=na(q,I+z,c),0>=a?Q=!0:z+=a)},oa=function(a){var b=ja,c=I,d,e=L,f=32506<I?I-32506:0,h=I+258,k=q[c+e-1],g=q[c+e];L>=Z&&(b>>=2);do if(d=a,q[d+e]===g&&q[d+e-1]===k&&q[d]===q[c]&&q[++d]===q[c+1]){c+=
2;d++;do++c;while(q[c]===q[++d]&&q[++c]===q[++d]&&q[++c]===q[++d]&&q[++c]===q[++d]&&q[++c]===q[++d]&&q[++c]===q[++d]&&q[++c]===q[++d]&&q[++c]===q[++d]&&c<h);d=258-(h-c);c=h-258;if(d>e){W=a;e=d;if(258<=d)break;k=q[c+e-1];g=q[c+e]}a=A[a&32767]}while(a>f&&0!==--b);return e},Ca=function(a,b){t[S++]=b;0===a?O[b].fc++:(a--,O[ma[b]+256+1].fc++,aa[(256>a?T[a]:T[256+(a>>7)])&255].fc++,k[ga++]=a,fa|=D);D<<=1;0===(S&7)&&(da[E++]=fa,fa=0,D=1);if(2<G&&0===(S&4095)){var c=8*S,d=I-v,e;for(e=0;30>e;e++)c+=aa[e].fc*
(5+qa[e]);c>>=3;if(ga<parseInt(S/2,10)&&c<parseInt(d/2,10))return!0}return 8191===S||8192===ga},ya=function(a,b){for(var c=M[b],d=b<<1;d<=ba;){d<ba&&ua(a,M[d+1],M[d])&&d++;if(ua(a,c,M[d]))break;M[b]=M[d];b=d;d<<=1}M[b]=c},Ea=function(a,b){var c=0;do c|=a&1,a>>=1,c<<=1;while(0<--b);return c>>1},za=function(a,b){var c=[];c.length=16;var d=0,e;for(e=1;15>=e;e++)d=d+P[e-1]<<1,c[e]=d;for(d=0;d<=b;d++)e=a[d].dl,0!==e&&(a[d].fc=Ea(c[e]++,e))},va=function(a){var b=a.dyn_tree,c=a.static_tree,d=a.elems,e,f=
-1,h=d;ba=0;la=573;for(e=0;e<d;e++)0!==b[e].fc?(M[++ba]=f=e,ca[e]=0):b[e].dl=0;for(;2>ba;)e=M[++ba]=2>f?++f:0,b[e].fc=1,ca[e]=0,pa--,null!==c&&(ha-=c[e].dl);a.max_code=f;for(e=ba>>1;1<=e;e--)ya(b,e);do e=M[1],M[1]=M[ba--],ya(b,1),c=M[1],M[--la]=e,M[--la]=c,b[h].fc=b[e].fc+b[c].fc,ca[h]=ca[e]>ca[c]+1?ca[e]:ca[c]+1,b[e].dl=b[c].dl=h,M[1]=h++,ya(b,1);while(2<=ba);M[--la]=M[1];h=a.dyn_tree;e=a.extra_bits;var d=a.extra_base,c=a.max_code,k=a.max_length,g=a.static_tree,q,m,l,p,n=0;for(m=0;15>=m;m++)P[m]=
0;h[M[la]].dl=0;for(a=la+1;573>a;a++)q=M[a],m=h[h[q].dl].dl+1,m>k&&(m=k,n++),h[q].dl=m,q>c||(P[m]++,l=0,q>=d&&(l=e[q-d]),p=h[q].fc,pa+=p*(m+l),null!==g&&(ha+=p*(g[q].dl+l)));if(0!==n){do{for(m=k-1;0===P[m];)m--;P[m]--;P[m+1]+=2;P[k]--;n-=2}while(0<n);for(m=k;0!==m;m--)for(q=P[m];0!==q;)e=M[--a],e>c||(h[e].dl!==m&&(pa+=(m-h[e].dl)*h[e].fc,h[e].fc=m),q--)}za(b,f)},Fa=function(a,b){var c,d=-1,e,f=a[0].dl,h=0,k=7,g=4;0===f&&(k=138,g=3);a[b+1].dl=65535;for(c=0;c<=b;c++)e=f,f=a[c+1].dl,++h<k&&e===f||(h<
g?C[e].fc+=h:0!==e?(e!==d&&C[e].fc++,C[16].fc++):10>=h?C[17].fc++:C[18].fc++,h=0,d=e,0===f?(k=138,g=3):e===f?(k=6,g=3):(k=7,g=4))},wa=function(){8<x?ta(w):0<x&&Aa(w);x=w=0},Ha=function(a,b){var c,d=0,e=0,f=0,h=0,g,q;if(0!==S){do 0===(d&7)&&(h=da[f++]),c=t[d++]&255,0===(h&1)?K(c,a):(g=ma[c],K(g+256+1,a),q=N[g],0!==q&&(c-=$[g],V(c,q)),c=k[e++],g=(256>c?T[c]:T[256+(c>>7)])&255,K(g,b),q=qa[g],0!==q&&(c-=X[g],V(c,q))),h>>=1;while(d<S)}K(256,a)},Ia=function(a,b){var c,d=-1,e,f=a[0].dl,h=0,k=7,g=4;0===f&&
(k=138,g=3);for(c=0;c<=b;c++)if(e=f,f=a[c+1].dl,!(++h<k&&e===f)){if(h<g){do K(e,C);while(0!==--h)}else 0!==e?(e!==d&&(K(e,C),h--),K(16,C),V(h-3,2)):10>=h?(K(17,C),V(h-3,3)):(K(18,C),V(h-11,7));h=0;d=e;0===f?(k=138,g=3):e===f?(k=6,g=3):(k=7,g=4)}},Ja=function(){var a;for(a=0;286>a;a++)O[a].fc=0;for(a=0;30>a;a++)aa[a].fc=0;for(a=0;19>a;a++)C[a].fc=0;O[256].fc=1;fa=S=ga=E=pa=ha=0;D=1},Ga=function(a){var b,c,d,e;e=I-v;da[E]=fa;va(Y);va(U);Fa(O,Y.max_code);Fa(aa,U.max_code);va(R);for(d=18;3<=d&&0===C[xa[d]].dl;d--);
pa+=3*(d+1)+14;b=pa+3+7>>3;c=ha+3+7>>3;c<=b&&(b=c);if(e+4<=b&&0<=v)for(V(0+a,3),wa(),ta(e),ta(~e),d=0;d<e;d++)Aa(q[v+d]);else if(c===b)V(2+a,3),Ha(J,F);else{V(4+a,3);e=Y.max_code+1;b=U.max_code+1;d+=1;V(e-257,5);V(b-1,5);V(d-4,4);for(c=0;c<d;c++)V(C[xa[c]].dl,3);Ia(O,e-1);Ia(aa,b-1);Ha(O,aa)}Ja();0!==a&&wa()},Ka=function(b,d,f){var k,g,q;for(k=0;null!==h&&k<f;){g=f-k;g>h.len&&(g=h.len);for(q=0;q<g;q++)b[d+k+q]=h.ptr[h.off+q];h.off+=g;h.len-=g;k+=g;0===h.len&&(g=h,h=h.next,g.next=n,n=g)}if(k===f)return k;
if(a<e){g=f-k;g>e-a&&(g=e-a);for(q=0;q<g;q++)b[d+k+q]=c[a+q];a+=g;k+=g;e===a&&(e=a=0)}return k},La=function(c,d,f){var k;if(!m){if(!Q){x=w=0;var g,l;if(0===F[0].dl){Y.dyn_tree=O;Y.static_tree=J;Y.extra_bits=N;Y.extra_base=257;Y.elems=286;Y.max_length=15;Y.max_code=0;U.dyn_tree=aa;U.static_tree=F;U.extra_bits=qa;U.extra_base=0;U.elems=30;U.max_length=15;U.max_code=0;R.dyn_tree=C;R.static_tree=null;R.extra_bits=sa;R.extra_base=0;R.elems=19;R.max_length=7;for(l=g=R.max_code=0;28>l;l++)for($[l]=g,k=0;k<
1<<N[l];k++)ma[g++]=l;ma[g-1]=l;for(l=g=0;16>l;l++)for(X[l]=g,k=0;k<1<<qa[l];k++)T[g++]=l;for(g>>=7;30>l;l++)for(X[l]=g<<7,k=0;k<1<<qa[l]-7;k++)T[256+g++]=l;for(k=0;15>=k;k++)P[k]=0;for(k=0;143>=k;)J[k++].dl=8,P[8]++;for(;255>=k;)J[k++].dl=9,P[9]++;for(;279>=k;)J[k++].dl=7,P[7]++;for(;287>=k;)J[k++].dl=8,P[8]++;za(J,287);for(k=0;30>k;k++)F[k].dl=5,F[k].fc=Ea(k,5);Ja()}for(k=0;8192>k;k++)A[32768+k]=0;ka=ra[G].max_lazy;Z=ra[G].good_length;ja=ra[G].max_chain;v=I=0;z=na(q,0,65536);if(0>=z)Q=!0,z=0;else{for(Q=
!1;262>z&&!Q;)ea();for(k=u=0;2>k;k++)u=(u<<5^q[k]&255)&8191}h=null;a=e=0;3>=G?(L=2,B=0):(B=2,y=0);b=!1}m=!0;if(0===z)return b=!0,0}k=Ka(c,d,f);if(k===f)return f;if(b)return k;if(3>=G)for(;0!==z&&null===h;){Ba();0!==s&&32506>=I-s&&(B=oa(s),B>z&&(B=z));if(3<=B)if(l=Ca(I-W,B-3),z-=B,B<=ka){B--;do I++,Ba();while(0!==--B);I++}else I+=B,B=0,u=q[I]&255,u=(u<<5^q[I+1]&255)&8191;else l=Ca(0,q[I]&255),z--,I++;l&&(Ga(0),v=I);for(;262>z&&!Q;)ea()}else for(;0!==z&&null===h;){Ba();L=B;H=W;B=2;0!==s&&L<ka&&32506>=
I-s&&(B=oa(s),B>z&&(B=z),3===B&&4096<I-W&&B--);if(3<=L&&B<=L){l=Ca(I-1-H,L-3);z-=L-1;L-=2;do I++,Ba();while(0!==--L);y=0;B=2;I++;l&&(Ga(0),v=I)}else 0!==y?Ca(0,q[I-1]&255)&&(Ga(0),v=I):y=1,I++,z--;for(;262>z&&!Q;)ea()}0===z&&(0!==y&&Ca(0,q[I-1]&255),Ga(1),b=!0);return k+Ka(c,k+d,f-k)};this.deflate=function(a,b){var e,f;ia=a;Da=0;"undefined"===String(typeof b)&&(b=6);(e=b)?1>e?e=1:9<e&&(e=9):e=6;G=e;Q=m=!1;if(null===c){n=h=d=null;c=[];c.length=r;q=[];q.length=65536;k=[];k.length=8192;t=[];t.length=
32832;A=[];A.length=65536;O=[];O.length=573;for(e=0;573>e;e++)O[e]=new g;aa=[];aa.length=61;for(e=0;61>e;e++)aa[e]=new g;J=[];J.length=288;for(e=0;288>e;e++)J[e]=new g;F=[];F.length=30;for(e=0;30>e;e++)F[e]=new g;C=[];C.length=39;for(e=0;39>e;e++)C[e]=new g;Y=new l;U=new l;R=new l;P=[];P.length=16;M=[];M.length=573;ca=[];ca.length=573;ma=[];ma.length=256;T=[];T.length=512;$=[];$.length=29;X=[];X.length=30;da=[];da.length=1024}var p=Array(1024),v=[],s=[];for(e=La(p,0,p.length);0<e;){s.length=e;for(f=
0;f<e;f++)s[f]=String.fromCharCode(p[f]);v[v.length]=s.join("");e=La(p,0,p.length)}ia="";return v.join("")}};
// Input 44
runtime.loadClass("odf.Namespaces");
gui.ImageSelector=function(g){function l(){var f=g.getSizer(),d,m;d=r.createElement("div");d.id="imageSelector";d.style.borderWidth="1px";f.appendChild(d);p.forEach(function(c){m=r.createElement("div");m.className=c;d.appendChild(m)});return d}var f=odf.Namespaces.svgns,p="topLeft topRight bottomRight bottomLeft topMiddle rightMiddle bottomMiddle leftMiddle".split(" "),r=g.getElement().ownerDocument,n=!1;this.select=function(h){var d,m,c=r.getElementById("imageSelector");c||(c=l());n=!0;d=c.parentNode;
m=h.getBoundingClientRect();var e=d.getBoundingClientRect(),a=g.getZoomLevel();d=(m.left-e.left)/a-1;m=(m.top-e.top)/a-1;c.style.display="block";c.style.left=d+"px";c.style.top=m+"px";c.style.width=h.getAttributeNS(f,"width");c.style.height=h.getAttributeNS(f,"height")};this.clearSelection=function(){var f;n&&(f=r.getElementById("imageSelector"))&&(f.style.display="none");n=!1};this.isSelectorElement=function(f){var d=r.getElementById("imageSelector");return d?f===d||f.parentNode===d:!1}};
// Input 45
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools=function(){this.roundTrip=function(g,l,f){return new odf.OdfContainer(g,function(p){if(p.state===odf.OdfContainer.INVALID)return f("Document "+g+" is invalid.");p.state===odf.OdfContainer.DONE?p.saveAs(l,function(g){f(g)}):f("Document was not completely loaded.")})};this.render=function(g,l,f){for(l=l.getElementsByTagName("body")[0];l.firstChild;)l.removeChild(l.firstChild);l=new odf.OdfCanvas(l);l.addListener("statereadychange",function(g){f(g)});l.load(g)}};
// Input 46
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
ops.Member=function(g,l){var f={};this.getMemberId=function(){return g};this.getProperties=function(){return f};this.setProperties=function(g){Object.keys(g).forEach(function(l){f[l]=g[l]})};this.removeProperties=function(g){delete g.fullName;delete g.color;delete g.imageUrl;Object.keys(g).forEach(function(g){f.hasOwnProperty(g)&&delete f[g]})};runtime.assert(Boolean(g),"No memberId was supplied!");l.fullName||(l.fullName=runtime.tr("Unknown Author"));l.color||(l.color="black");l.imageUrl||(l.imageUrl=
"avatar-joe.png");f=l};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("core.PositionFilter");runtime.loadClass("odf.OdfUtils");
(function(){function g(f,g,r){function n(a,b){function c(a){for(var b=0;a&&a.previousSibling;)b+=1,a=a.previousSibling;return b}this.steps=a;this.node=b;this.setIteratorPosition=function(a){a.setUnfilteredPosition(b.parentNode,c(b));do if(g.acceptPosition(a)===t)break;while(a.nextPosition())}}function h(a){return a.nodeType===Node.ELEMENT_NODE&&a.getAttributeNS(c,"nodeId")}function d(a){var b=l;a.setAttributeNS(c,"nodeId",b.toString());l+=1;return b}function m(b,d){var e,k=null;for(b=b.childNodes[d]||
b;!k&&b&&b!==f;)(e=h(b))&&(k=a[e])&&k.node!==b&&(runtime.log("Cloned node detected. Creating new bookmark"),k=null,b.removeAttributeNS(c,"nodeId")),b=b.parentNode;return k}var c="urn:webodf:names:steps",e={},a={},b=new odf.OdfUtils,q=new core.DomUtils,k,t=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.updateCache=function(c,f,k,g){var q;0===k&&b.isParagraph(f)?(q=!0,g||(c+=1)):f.hasChildNodes()&&f.childNodes[k]&&(f=f.childNodes[k],(q=b.isParagraph(f))&&(c+=1));q&&(k=h(f)||d(f),(g=a[k])?g.node===
f?g.steps=c:(runtime.log("Cloned node detected. Creating new bookmark"),k=d(f),g=a[k]=new n(c,f)):g=a[k]=new n(c,f),k=g,c=Math.ceil(k.steps/r)*r,f=e[c],!f||k.steps>f.steps)&&(e[c]=k)};this.setToClosestStep=function(a,b){for(var c=Math.floor(a/r)*r,d;!d&&0!==c;)d=e[c],c-=r;d=d||k;d.setIteratorPosition(b);return d.steps};this.setToClosestDomPoint=function(a,b,c){var d;if(a===f&&0===b)d=k;else if(a===f&&b===f.childNodes.length)d=Object.keys(e).map(function(a){return e[a]}).reduce(function(a,b){return b.steps>
a.steps?b:a},k);else if(d=m(a,b),!d)for(c.setUnfilteredPosition(a,b);!d&&c.previousNode();)d=m(c.container(),c.unfilteredDomOffset());d=d||k;d.setIteratorPosition(c);return d.steps};this.updateCacheAtPoint=function(b,c){var d={};Object.keys(a).map(function(b){return a[b]}).filter(function(a){return a.steps>b}).forEach(function(b){var k=Math.ceil(b.steps/r)*r,g,m;if(q.containsNode(f,b.node)){if(c(b),g=Math.ceil(b.steps/r)*r,m=d[g],!m||b.steps>m.steps)d[g]=b}else delete a[h(b.node)];e[k]===b&&delete e[k]});
Object.keys(d).forEach(function(a){e[a]=d[a]})};k=new function(a,b){this.steps=a;this.node=b;this.setIteratorPosition=function(a){a.setUnfilteredPosition(b,0);do if(g.acceptPosition(a)===t)break;while(a.nextPosition())}}(0,f)}var l=0;ops.StepsTranslator=function(f,l,r,n){function h(){var b=f();b!==m&&(runtime.log("Undo detected. Resetting steps cache"),m=b,c=new g(m,r,n),a=l(m))}function d(a,c){if(!c||r.acceptPosition(a)===b)return!0;for(;a.previousPosition();)if(r.acceptPosition(a)===b){if(c(0,a.container(),
a.unfilteredDomOffset()))return!0;break}for(;a.nextPosition();)if(r.acceptPosition(a)===b){if(c(1,a.container(),a.unfilteredDomOffset()))return!0;break}return!1}var m=f(),c=new g(m,r,n),e=new core.DomUtils,a=l(f()),b=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.convertStepsToDomPoint=function(d){var e,f;0>d&&(runtime.log("warn","Requested steps were negative ("+d+")"),d=0);h();for(e=c.setToClosestStep(d,a);e<d&&a.nextPosition();)(f=r.acceptPosition(a)===b)&&(e+=1),c.updateCache(e,a.container(),
a.unfilteredDomOffset(),f);e!==d&&runtime.log("warn","Requested "+d+" steps but only "+e+" are available");return{node:a.container(),offset:a.unfilteredDomOffset()}};this.convertDomPointToSteps=function(f,k,g){var l;h();e.containsNode(m,f)||(k=0>e.comparePoints(m,0,f,k),f=m,k=k?0:m.childNodes.length);a.setUnfilteredPosition(f,k);d(a,g)||a.setUnfilteredPosition(f,k);g=a.container();k=a.unfilteredDomOffset();f=c.setToClosestDomPoint(g,k,a);if(0>e.comparePoints(a.container(),a.unfilteredDomOffset(),
g,k))return 0<f?f-1:f;for(;(a.container()!==g||a.unfilteredDomOffset()!==k)&&a.nextPosition();)(l=r.acceptPosition(a)===b)&&(f+=1),c.updateCache(f,a.container(),a.unfilteredDomOffset(),l);return f+0};this.prime=function(){var d,e;h();for(d=c.setToClosestStep(0,a);a.nextPosition();)(e=r.acceptPosition(a)===b)&&(d+=1),c.updateCache(d,a.container(),a.unfilteredDomOffset(),e)};this.handleStepsInserted=function(a){h();c.updateCacheAtPoint(a.position,function(b){b.steps+=a.length})};this.handleStepsRemoved=
function(a){h();c.updateCacheAtPoint(a.position,function(b){b.steps-=a.length;0>b.steps&&(b.steps=0)})}};ops.StepsTranslator.PREVIOUS_STEP=0;ops.StepsTranslator.NEXT_STEP=1;return ops.StepsTranslator})();
// Input 48
xmldom.RNG={};
xmldom.RelaxNGParser=function(){function g(c,d){this.message=function(){d&&(c+=1===d.nodeType?" Element ":" Node ",c+=d.nodeName,d.nodeValue&&(c+=" with value '"+d.nodeValue+"'"),c+=".");return c}}function l(c){if(2>=c.e.length)return c;var d={name:c.name,e:c.e.slice(0,2)};return l({name:c.name,e:[d].concat(c.e.slice(2))})}function f(c){c=c.split(":",2);var e="",a;1===c.length?c=["",c[0]]:e=c[0];for(a in d)d[a]===e&&(c[0]=a);return c}function p(c,d){for(var a=0,b,h,k=c.name;c.e&&a<c.e.length;)if(b=c.e[a],
"ref"===b.name){h=d[b.a.name];if(!h)throw b.a.name+" was not defined.";b=c.e.slice(a+1);c.e=c.e.slice(0,a);c.e=c.e.concat(h.e);c.e=c.e.concat(b)}else a+=1,p(b,d);b=c.e;"choice"!==k||b&&b[1]&&"empty"!==b[1].name||(b&&b[0]&&"empty"!==b[0].name?(b[1]=b[0],b[0]={name:"empty"}):(delete c.e,c.name="empty"));if("group"===k||"interleave"===k)"empty"===b[0].name?"empty"===b[1].name?(delete c.e,c.name="empty"):(k=c.name=b[1].name,c.names=b[1].names,b=c.e=b[1].e):"empty"===b[1].name&&(k=c.name=b[0].name,c.names=
b[0].names,b=c.e=b[0].e);"oneOrMore"===k&&"empty"===b[0].name&&(delete c.e,c.name="empty");if("attribute"===k){h=c.names?c.names.length:0;for(var g,m=[],l=[],a=0;a<h;a+=1)g=f(c.names[a]),l[a]=g[0],m[a]=g[1];c.localnames=m;c.namespaces=l}"interleave"===k&&("interleave"===b[0].name?c.e="interleave"===b[1].name?b[0].e.concat(b[1].e):[b[1]].concat(b[0].e):"interleave"===b[1].name&&(c.e=[b[0]].concat(b[1].e)))}function r(c,d){for(var a=0,b;c.e&&a<c.e.length;)b=c.e[a],"elementref"===b.name?(b.id=b.id||
0,c.e[a]=d[b.id]):"element"!==b.name&&r(b,d),a+=1}var n=this,h,d={"http://www.w3.org/XML/1998/namespace":"xml"},m;m=function(c,e,a){var b=[],h,g,n=c.localName,p=[];h=c.attributes;var r=n,x=p,v={},u,s;for(u=0;h&&u<h.length;u+=1)if(s=h.item(u),s.namespaceURI)"http://www.w3.org/2000/xmlns/"===s.namespaceURI&&(d[s.value]=s.localName);else{"name"!==s.localName||"element"!==r&&"attribute"!==r||x.push(s.value);if("name"===s.localName||"combine"===s.localName||"type"===s.localName){var H=s,y;y=s.value;y=
y.replace(/^\s\s*/,"");for(var B=/\s/,L=y.length-1;B.test(y.charAt(L));)L-=1;y=y.slice(0,L+1);H.value=y}v[s.localName]=s.value}h=v;h.combine=h.combine||void 0;c=c.firstChild;r=b;x=p;for(v="";c;){if(c.nodeType===Node.ELEMENT_NODE&&"http://relaxng.org/ns/structure/1.0"===c.namespaceURI){if(u=m(c,e,r))"name"===u.name?x.push(d[u.a.ns]+":"+u.text):"choice"===u.name&&u.names&&u.names.length&&(x=x.concat(u.names),delete u.names),r.push(u)}else c.nodeType===Node.TEXT_NODE&&(v+=c.nodeValue);c=c.nextSibling}c=
v;"value"!==n&&"param"!==n&&(c=/^\s*([\s\S]*\S)?\s*$/.exec(c)[1]);"value"===n&&void 0===h.type&&(h.type="token",h.datatypeLibrary="");"attribute"!==n&&"element"!==n||void 0===h.name||(g=f(h.name),b=[{name:"name",text:g[1],a:{ns:g[0]}}].concat(b),delete h.name);"name"===n||"nsName"===n||"value"===n?void 0===h.ns&&(h.ns=""):delete h.ns;"name"===n&&(g=f(c),h.ns=g[0],c=g[1]);1<b.length&&("define"===n||"oneOrMore"===n||"zeroOrMore"===n||"optional"===n||"list"===n||"mixed"===n)&&(b=[{name:"group",e:l({name:"group",
e:b}).e}]);2<b.length&&"element"===n&&(b=[b[0]].concat({name:"group",e:l({name:"group",e:b.slice(1)}).e}));1===b.length&&"attribute"===n&&b.push({name:"text",text:c});1!==b.length||"choice"!==n&&"group"!==n&&"interleave"!==n?2<b.length&&("choice"===n||"group"===n||"interleave"===n)&&(b=l({name:n,e:b}).e):(n=b[0].name,p=b[0].names,h=b[0].a,c=b[0].text,b=b[0].e);"mixed"===n&&(n="interleave",b=[b[0],{name:"text"}]);"optional"===n&&(n="choice",b=[b[0],{name:"empty"}]);"zeroOrMore"===n&&(n="choice",b=
[{name:"oneOrMore",e:[b[0]]},{name:"empty"}]);if("define"===n&&h.combine){a:{r=h.combine;x=h.name;v=b;for(u=0;a&&u<a.length;u+=1)if(s=a[u],"define"===s.name&&s.a&&s.a.name===x){s.e=[{name:r,e:s.e.concat(v)}];a=s;break a}a=null}if(a)return null}a={name:n};b&&0<b.length&&(a.e=b);for(g in h)if(h.hasOwnProperty(g)){a.a=h;break}void 0!==c&&(a.text=c);p&&0<p.length&&(a.names=p);"element"===n&&(a.id=e.length,e.push(a),a={name:"elementref",id:a.id});return a};this.parseRelaxNGDOM=function(c,e){var a=[],b=
m(c&&c.documentElement,a,void 0),f,k,l={};for(f=0;f<b.e.length;f+=1)k=b.e[f],"define"===k.name?l[k.a.name]=k:"start"===k.name&&(h=k);if(!h)return[new g("No Relax NG start element was found.")];p(h,l);for(f in l)l.hasOwnProperty(f)&&p(l[f],l);for(f=0;f<a.length;f+=1)p(a[f],l);e&&(n.rootPattern=e(h.e[0],a));r(h,a);for(f=0;f<a.length;f+=1)r(a[f],a);n.start=h;n.elements=a;n.nsmap=d;return null}};
// Input 49
runtime.loadClass("core.Cursor");runtime.loadClass("gui.SelectionMover");
ops.OdtCursor=function(g,l){var f=this,p={},r,n,h;this.removeFromOdtDocument=function(){h.remove()};this.move=function(d,h){var c=0;0<d?c=n.movePointForward(d,h):0>=d&&(c=-n.movePointBackward(-d,h));f.handleUpdate();return c};this.handleUpdate=function(){};this.getStepCounter=function(){return n.getStepCounter()};this.getMemberId=function(){return g};this.getNode=function(){return h.getNode()};this.getAnchorNode=function(){return h.getAnchorNode()};this.getSelectedRange=function(){return h.getSelectedRange()};
this.setSelectedRange=function(d,g){h.setSelectedRange(d,g);f.handleUpdate()};this.hasForwardSelection=function(){return h.hasForwardSelection()};this.getOdtDocument=function(){return l};this.getSelectionType=function(){return r};this.setSelectionType=function(d){p.hasOwnProperty(d)?r=d:runtime.log("Invalid selection type: "+d)};this.resetSelectionType=function(){f.setSelectionType(ops.OdtCursor.RangeSelection)};h=new core.Cursor(l.getDOM(),g);n=new gui.SelectionMover(h,l.getRootNode());p[ops.OdtCursor.RangeSelection]=
!0;p[ops.OdtCursor.RegionSelection]=!0;f.resetSelectionType()};ops.OdtCursor.RangeSelection="Range";ops.OdtCursor.RegionSelection="Region";(function(){return ops.OdtCursor})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.Namespaces");runtime.loadClass("gui.SelectionMover");runtime.loadClass("core.PositionFilterChain");runtime.loadClass("ops.StepsTranslator");runtime.loadClass("ops.TextPositionFilter");runtime.loadClass("ops.Member");
ops.OdtDocument=function(g){function l(){var a=g.odfContainer().getContentElement(),b=a&&a.localName;runtime.assert("text"===b,"Unsupported content element type '"+b+"' for OdtDocument");return a}function f(){return l().ownerDocument}function p(a){for(;a&&!(a.namespaceURI===odf.Namespaces.officens&&"text"===a.localName||a.namespaceURI===odf.Namespaces.officens&&"annotation"===a.localName);)a=a.parentNode;return a}function r(b){this.acceptPosition=function(c){c=c.container();var d;d="string"===typeof b?
a[b].getNode():b;return p(c)===p(d)?k:t}}function n(a){var b=gui.SelectionMover.createPositionIterator(l());a=w.convertStepsToDomPoint(a);b.setUnfilteredPosition(a.node,a.offset);return b}function h(a,b){return g.getFormatting().getStyleElement(a,b)}function d(a){return h(a,"paragraph")}var m=this,c,e,a={},b={},q=new core.EventNotifier([ops.OdtDocument.signalMemberAdded,ops.OdtDocument.signalMemberUpdated,ops.OdtDocument.signalMemberRemoved,ops.OdtDocument.signalCursorAdded,ops.OdtDocument.signalCursorRemoved,
ops.OdtDocument.signalCursorMoved,ops.OdtDocument.signalParagraphChanged,ops.OdtDocument.signalParagraphStyleModified,ops.OdtDocument.signalCommonStyleCreated,ops.OdtDocument.signalCommonStyleDeleted,ops.OdtDocument.signalTableAdded,ops.OdtDocument.signalOperationExecuted,ops.OdtDocument.signalUndoStackChanged,ops.OdtDocument.signalStepsInserted,ops.OdtDocument.signalStepsRemoved]),k=core.PositionFilter.FilterResult.FILTER_ACCEPT,t=core.PositionFilter.FilterResult.FILTER_REJECT,A,w,x;this.getDOM=
f;this.getRootElement=p;this.getIteratorAtPosition=n;this.convertDomPointToCursorStep=function(a,b,c){return w.convertDomPointToSteps(a,b,c)};this.convertDomToCursorRange=function(a,b){var c,d;c=b(a.anchorNode,a.anchorOffset);c=w.convertDomPointToSteps(a.anchorNode,a.anchorOffset,c);b||a.anchorNode!==a.focusNode||a.anchorOffset!==a.focusOffset?(d=b(a.focusNode,a.focusOffset),d=w.convertDomPointToSteps(a.focusNode,a.focusOffset,d)):d=c;return{position:c,length:d-c}};this.convertCursorToDomRange=function(a,
b){var c=f().createRange(),d,e;d=w.convertStepsToDomPoint(a);b?(e=w.convertStepsToDomPoint(a+b),0<b?(c.setStart(d.node,d.offset),c.setEnd(e.node,e.offset)):(c.setStart(e.node,e.offset),c.setEnd(d.node,d.offset))):c.setStart(d.node,d.offset);return c};this.getStyleElement=h;this.upgradeWhitespacesAtPosition=function(a){a=n(a);var b,d,e;a.previousPosition();a.previousPosition();for(e=-1;1>=e;e+=1){b=a.container();d=a.unfilteredDomOffset();if(b.nodeType===Node.TEXT_NODE&&" "===b.data[d]&&c.isSignificantWhitespace(b,
d)){runtime.assert(" "===b.data[d],"upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");var f=b.ownerDocument.createElementNS(odf.Namespaces.textns,"text:s");f.appendChild(b.ownerDocument.createTextNode(" "));b.deleteData(d,1);0<d&&(b=b.splitText(d));b.parentNode.insertBefore(f,b);b=f;a.moveToEndOfNode(b)}a.nextPosition()}};this.downgradeWhitespacesAtPosition=function(a){var b=n(a),d;a=b.container();for(b=b.unfilteredDomOffset();!c.isSpaceElement(a)&&a.childNodes[b];)a=a.childNodes[b],
b=0;a.nodeType===Node.TEXT_NODE&&(a=a.parentNode);c.isDowngradableSpaceElement(a)&&(b=a.firstChild,d=a.lastChild,e.mergeIntoParent(a),d!==b&&e.normalizeTextNodes(d),e.normalizeTextNodes(b))};this.getParagraphStyleElement=d;this.getParagraphElement=function(a){return c.getParagraphElement(a)};this.getParagraphStyleAttributes=function(a){return(a=d(a))?g.getFormatting().getInheritedStyleAttributes(a):null};this.getTextNodeAtStep=function(b,c){var d=n(b),e=d.container(),h,g=0,k=null;e.nodeType===Node.TEXT_NODE?
(h=e,g=d.unfilteredDomOffset(),0<h.length&&(0<g&&(h=h.splitText(g)),h.parentNode.insertBefore(f().createTextNode(""),h),h=h.previousSibling,g=0)):(h=f().createTextNode(""),g=0,e.insertBefore(h,d.rightNode()));if(c){if(a[c]&&m.getCursorPosition(c)===b){for(k=a[c].getNode();k.nextSibling&&"cursor"===k.nextSibling.localName;)k.parentNode.insertBefore(k.nextSibling,k);0<h.length&&h.nextSibling!==k&&(h=f().createTextNode(""),g=0);k.parentNode.insertBefore(h,k)}}else for(;h.nextSibling&&"cursor"===h.nextSibling.localName;)h.parentNode.insertBefore(h.nextSibling,
h);for(;h.previousSibling&&h.previousSibling.nodeType===Node.TEXT_NODE;)h.previousSibling.appendData(h.data),g=h.previousSibling.length,h=h.previousSibling,h.parentNode.removeChild(h.nextSibling);for(;h.nextSibling&&h.nextSibling.nodeType===Node.TEXT_NODE;)h.appendData(h.nextSibling.data),h.parentNode.removeChild(h.nextSibling);return{textNode:h,offset:g}};this.fixCursorPositions=function(){var b=new core.PositionFilterChain;b.addFilter("BaseFilter",A);Object.keys(a).forEach(function(c){var d=a[c],
e=d.getStepCounter(),f,h,g=!1;b.addFilter("RootFilter",m.createRootFilter(c));c=e.countStepsToPosition(d.getAnchorNode(),0,b);e.isPositionWalkable(b)?0===c&&(g=!0,d.move(0)):(g=!0,f=e.countPositionsToNearestStep(d.getNode(),0,b),h=e.countPositionsToNearestStep(d.getAnchorNode(),0,b),d.move(f),0!==c&&(0<h&&(c+=1),0<f&&(c-=1),e=e.countSteps(c,b),d.move(e),d.move(-e,!0)));g&&m.emit(ops.OdtDocument.signalCursorMoved,d);b.removeFilter("RootFilter")})};this.getDistanceFromCursor=function(b,c,d){b=a[b];
var e,f;runtime.assert(null!==c&&void 0!==c,"OdtDocument.getDistanceFromCursor called without node");b&&(e=w.convertDomPointToSteps(b.getNode(),0),f=w.convertDomPointToSteps(c,d));return f-e};this.getCursorPosition=function(b){return(b=a[b])?w.convertDomPointToSteps(b.getNode(),0):0};this.getCursorSelection=function(b){b=a[b];var c=0,d=0;b&&(c=w.convertDomPointToSteps(b.getNode(),0),d=w.convertDomPointToSteps(b.getAnchorNode(),0));return{position:d,length:c-d}};this.getPositionFilter=function(){return A};
this.getOdfCanvas=function(){return g};this.getRootNode=l;this.addMember=function(a){runtime.assert(void 0===b[a.getMemberId()],"This member already exists");b[a.getMemberId()]=a};this.getMember=function(a){return b.hasOwnProperty(a)?b[a]:null};this.removeMember=function(a){delete b[a]};this.getCursor=function(b){return a[b]};this.getCursors=function(){var b=[],c;for(c in a)a.hasOwnProperty(c)&&b.push(a[c]);return b};this.addCursor=function(b){runtime.assert(Boolean(b),"OdtDocument::addCursor without cursor");
var c=b.getStepCounter().countSteps(1,A),d=b.getMemberId();runtime.assert("string"===typeof d,"OdtDocument::addCursor has cursor without memberid");runtime.assert(!a[d],"OdtDocument::addCursor is adding a duplicate cursor with memberid "+d);b.move(c);a[d]=b};this.removeCursor=function(b){var c=a[b];return c?(c.removeFromOdtDocument(),delete a[b],m.emit(ops.OdtDocument.signalCursorRemoved,b),!0):!1};this.moveCursor=function(b,c,d,e){b=a[b];c=m.convertCursorToDomRange(c,d);b&&c&&(b.setSelectedRange(c,
0<=d),b.setSelectionType(e||ops.OdtCursor.RangeSelection))};this.getFormatting=function(){return g.getFormatting()};this.emit=function(a,b){q.emit(a,b)};this.subscribe=function(a,b){q.subscribe(a,b)};this.unsubscribe=function(a,b){q.unsubscribe(a,b)};this.createRootFilter=function(a){return new r(a)};this.close=function(a){a()};this.destroy=function(a){a()};A=new ops.TextPositionFilter(l);c=new odf.OdfUtils;e=new core.DomUtils;w=new ops.StepsTranslator(l,gui.SelectionMover.createPositionIterator,
A,500);q.subscribe(ops.OdtDocument.signalStepsInserted,w.handleStepsInserted);q.subscribe(ops.OdtDocument.signalStepsRemoved,w.handleStepsRemoved);q.subscribe(ops.OdtDocument.signalOperationExecuted,function(a){var b=a.spec(),c=b.memberid,b=(new Date(b.timestamp)).toISOString(),d=g.odfContainer();a.isEdit&&(c=m.getMember(c).getProperties().fullName,d.setMetadata({"dc:creator":c,"dc:date":b},null),x||(d.incrementEditingCycles(),d.setMetadata(null,["meta:editing-duration","meta:document-statistic"])),
x=a)})};ops.OdtDocument.signalMemberAdded="member/added";ops.OdtDocument.signalMemberUpdated="member/updated";ops.OdtDocument.signalMemberRemoved="member/removed";ops.OdtDocument.signalCursorAdded="cursor/added";ops.OdtDocument.signalCursorRemoved="cursor/removed";ops.OdtDocument.signalCursorMoved="cursor/moved";ops.OdtDocument.signalParagraphChanged="paragraph/changed";ops.OdtDocument.signalTableAdded="table/added";ops.OdtDocument.signalCommonStyleCreated="style/created";
ops.OdtDocument.signalCommonStyleDeleted="style/deleted";ops.OdtDocument.signalParagraphStyleModified="paragraphstyle/modified";ops.OdtDocument.signalOperationExecuted="operation/executed";ops.OdtDocument.signalUndoStackChanged="undo/changed";ops.OdtDocument.signalStepsInserted="steps/inserted";ops.OdtDocument.signalStepsRemoved="steps/removed";(function(){return ops.OdtDocument})();
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
ops.Operation=function(){};ops.Operation.prototype.init=function(g){};ops.Operation.prototype.execute=function(g){};ops.Operation.prototype.spec=function(){};
// Input 52
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG=function(){function g(a){return function(){var b;return function(){void 0===b&&(b=a());return b}}()}function l(a,b){return function(){var c={},d=0;return function(e){var f=e.hash||e.toString();if(c.hasOwnProperty(f))return c[f];c[f]=e=b(e);e.hash=a+d.toString();d+=1;return e}}()}function f(a){return function(){var b={};return function(c){var d,e;if(b.hasOwnProperty(c.localName)){if(e=b[c.localName],d=e[c.namespaceURI],void 0!==d)return d}else b[c.localName]=e={};return e[c.namespaceURI]=
d=a(c)}}()}function p(a,b,c){return function(){var d={},e=0;return function(f,h){var g=b&&b(f,h),k;if(void 0!==g)return g;k=f.hash||f.toString();g=h.hash||h.toString();if(d.hasOwnProperty(k)){if(k=d[k],k.hasOwnProperty(g))return k[g]}else d[k]=k={};k[g]=g=c(f,h);g.hash=a+e.toString();e+=1;return g}}()}function r(a,b){"choice"===b.p1.type?r(a,b.p1):a[b.p1.hash]=b.p1;"choice"===b.p2.type?r(a,b.p2):a[b.p2.hash]=b.p2}function n(a,b){return{type:"element",nc:a,nullable:!1,textDeriv:function(){return y},
startTagOpenDeriv:function(c){return a.contains(c)?q(b,B):y},attDeriv:function(){return y},startTagCloseDeriv:function(){return this}}}function h(){return{type:"list",nullable:!1,hash:"list",textDeriv:function(){return B}}}function d(a,b,e,f){if(b===y)return y;if(f>=e.length)return b;0===f&&(f=0);for(var h=e.item(f);h.namespaceURI===c;){f+=1;if(f>=e.length)return b;h=e.item(f)}return h=d(a,b.attDeriv(a,e.item(f)),e,f+1)}function m(a,b,c){c.e[0].a?(a.push(c.e[0].text),b.push(c.e[0].a.ns)):m(a,b,c.e[0]);
c.e[1].a?(a.push(c.e[1].text),b.push(c.e[1].a.ns)):m(a,b,c.e[1])}var c="http://www.w3.org/2000/xmlns/",e,a,b,q,k,t,A,w,x,v,u,s,H,y={type:"notAllowed",nullable:!1,hash:"notAllowed",nc:void 0,p:void 0,p1:void 0,p2:void 0,textDeriv:function(){return y},startTagOpenDeriv:function(){return y},attDeriv:function(){return y},startTagCloseDeriv:function(){return y},endTagDeriv:function(){return y}},B={type:"empty",nullable:!0,hash:"empty",nc:void 0,p:void 0,p1:void 0,p2:void 0,textDeriv:function(){return y},
startTagOpenDeriv:function(){return y},attDeriv:function(){return y},startTagCloseDeriv:function(){return B},endTagDeriv:function(){return y}},L={type:"text",nullable:!0,hash:"text",nc:void 0,p:void 0,p1:void 0,p2:void 0,textDeriv:function(){return L},startTagOpenDeriv:function(){return y},attDeriv:function(){return y},startTagCloseDeriv:function(){return L},endTagDeriv:function(){return y}};e=p("choice",function(a,b){if(a===y)return b;if(b===y||a===b)return a},function(a,b){var c={},d;r(c,{p1:a,
p2:b});b=a=void 0;for(d in c)c.hasOwnProperty(d)&&(void 0===a?a=c[d]:b=void 0===b?c[d]:e(b,c[d]));return function(a,b){return{type:"choice",nullable:a.nullable||b.nullable,hash:void 0,nc:void 0,p:void 0,p1:a,p2:b,textDeriv:function(c,d){return e(a.textDeriv(c,d),b.textDeriv(c,d))},startTagOpenDeriv:f(function(c){return e(a.startTagOpenDeriv(c),b.startTagOpenDeriv(c))}),attDeriv:function(c,d){return e(a.attDeriv(c,d),b.attDeriv(c,d))},startTagCloseDeriv:g(function(){return e(a.startTagCloseDeriv(),
b.startTagCloseDeriv())}),endTagDeriv:g(function(){return e(a.endTagDeriv(),b.endTagDeriv())})}}(a,b)});a=function(a,b,c){return function(){var d={},e=0;return function(f,h){var g=b&&b(f,h),k,m;if(void 0!==g)return g;k=f.hash||f.toString();g=h.hash||h.toString();k<g&&(m=k,k=g,g=m,m=f,f=h,h=m);if(d.hasOwnProperty(k)){if(k=d[k],k.hasOwnProperty(g))return k[g]}else d[k]=k={};k[g]=g=c(f,h);g.hash=a+e.toString();e+=1;return g}}()}("interleave",function(a,b){if(a===y||b===y)return y;if(a===B)return b;if(b===
B)return a},function(b,c){return{type:"interleave",nullable:b.nullable&&c.nullable,hash:void 0,p1:b,p2:c,textDeriv:function(d,f){return e(a(b.textDeriv(d,f),c),a(b,c.textDeriv(d,f)))},startTagOpenDeriv:f(function(d){return e(u(function(b){return a(b,c)},b.startTagOpenDeriv(d)),u(function(c){return a(b,c)},c.startTagOpenDeriv(d)))}),attDeriv:function(d,f){return e(a(b.attDeriv(d,f),c),a(b,c.attDeriv(d,f)))},startTagCloseDeriv:g(function(){return a(b.startTagCloseDeriv(),c.startTagCloseDeriv())}),endTagDeriv:void 0}});
b=p("group",function(a,b){if(a===y||b===y)return y;if(a===B)return b;if(b===B)return a},function(a,c){return{type:"group",p1:a,p2:c,nullable:a.nullable&&c.nullable,textDeriv:function(d,f){var h=b(a.textDeriv(d,f),c);return a.nullable?e(h,c.textDeriv(d,f)):h},startTagOpenDeriv:function(d){var f=u(function(a){return b(a,c)},a.startTagOpenDeriv(d));return a.nullable?e(f,c.startTagOpenDeriv(d)):f},attDeriv:function(d,f){return e(b(a.attDeriv(d,f),c),b(a,c.attDeriv(d,f)))},startTagCloseDeriv:g(function(){return b(a.startTagCloseDeriv(),
c.startTagCloseDeriv())})}});q=p("after",function(a,b){if(a===y||b===y)return y},function(a,b){return{type:"after",p1:a,p2:b,nullable:!1,textDeriv:function(c,d){return q(a.textDeriv(c,d),b)},startTagOpenDeriv:f(function(c){return u(function(a){return q(a,b)},a.startTagOpenDeriv(c))}),attDeriv:function(c,d){return q(a.attDeriv(c,d),b)},startTagCloseDeriv:g(function(){return q(a.startTagCloseDeriv(),b)}),endTagDeriv:g(function(){return a.nullable?b:y})}});k=l("oneormore",function(a){return a===y?y:
{type:"oneOrMore",p:a,nullable:a.nullable,textDeriv:function(c,d){return b(a.textDeriv(c,d),e(this,B))},startTagOpenDeriv:function(c){var d=this;return u(function(a){return b(a,e(d,B))},a.startTagOpenDeriv(c))},attDeriv:function(c,d){return b(a.attDeriv(c,d),e(this,B))},startTagCloseDeriv:g(function(){return k(a.startTagCloseDeriv())})}});A=p("attribute",void 0,function(a,b){return{type:"attribute",nullable:!1,hash:void 0,nc:a,p:b,p1:void 0,p2:void 0,textDeriv:void 0,startTagOpenDeriv:void 0,attDeriv:function(c,
d){return a.contains(d)&&(b.nullable&&/^\s+$/.test(d.nodeValue)||b.textDeriv(c,d.nodeValue).nullable)?B:y},startTagCloseDeriv:function(){return y},endTagDeriv:void 0}});t=l("value",function(a){return{type:"value",nullable:!1,value:a,textDeriv:function(b,c){return c===a?B:y},attDeriv:function(){return y},startTagCloseDeriv:function(){return this}}});x=l("data",function(a){return{type:"data",nullable:!1,dataType:a,textDeriv:function(){return B},attDeriv:function(){return y},startTagCloseDeriv:function(){return this}}});
u=function W(a,b){return"after"===b.type?q(b.p1,a(b.p2)):"choice"===b.type?e(W(a,b.p1),W(a,b.p2)):b};s=function(a,b,c){var f=c.currentNode;b=b.startTagOpenDeriv(f);b=d(a,b,f.attributes,0);var h=b=b.startTagCloseDeriv(),f=c.currentNode;b=c.firstChild();for(var g=[],k;b;)b.nodeType===Node.ELEMENT_NODE?g.push(b):b.nodeType!==Node.TEXT_NODE||/^\s*$/.test(b.nodeValue)||g.push(b.nodeValue),b=c.nextSibling();0===g.length&&(g=[""]);k=h;for(h=0;k!==y&&h<g.length;h+=1)b=g[h],"string"===typeof b?k=/^\s*$/.test(b)?
e(k,k.textDeriv(a,b)):k.textDeriv(a,b):(c.currentNode=b,k=s(a,k,c));c.currentNode=f;return b=k.endTagDeriv()};w=function(a){var b,c,d;if("name"===a.name)b=a.text,c=a.a.ns,a={name:b,ns:c,hash:"{"+c+"}"+b,contains:function(a){return a.namespaceURI===c&&a.localName===b}};else if("choice"===a.name){b=[];c=[];m(b,c,a);a="";for(d=0;d<b.length;d+=1)a+="{"+c[d]+"}"+b[d]+",";a={hash:a,contains:function(a){var d;for(d=0;d<b.length;d+=1)if(b[d]===a.localName&&c[d]===a.namespaceURI)return!0;return!1}}}else a=
{hash:"anyName",contains:function(){return!0}};return a};v=function Q(c,d){var f,g;if("elementref"===c.name){f=c.id||0;c=d[f];if(void 0!==c.name){var m=c;f=d[m.id]={hash:"element"+m.id.toString()};m=n(w(m.e[0]),v(m.e[1],d));for(g in m)m.hasOwnProperty(g)&&(f[g]=m[g]);return f}return c}switch(c.name){case "empty":return B;case "notAllowed":return y;case "text":return L;case "choice":return e(Q(c.e[0],d),Q(c.e[1],d));case "interleave":f=Q(c.e[0],d);for(g=1;g<c.e.length;g+=1)f=a(f,Q(c.e[g],d));return f;
case "group":return b(Q(c.e[0],d),Q(c.e[1],d));case "oneOrMore":return k(Q(c.e[0],d));case "attribute":return A(w(c.e[0]),Q(c.e[1],d));case "value":return t(c.text);case "data":return f=c.a&&c.a.type,void 0===f&&(f=""),x(f);case "list":return h()}throw"No support for "+c.name;};this.makePattern=function(a,b){var c={},d;for(d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);return d=v(a,c)};this.validate=function(a,b){var c;a.currentNode=a.root;c=s(null,H,a);c.nullable?b(null):(runtime.log("Error in Relax NG validation: "+
c),b(["Error in Relax NG validation: "+c]))};this.init=function(a){H=a}};
// Input 53
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2=function(){function g(f,d){this.message=function(){d&&(f+=d.nodeType===Node.ELEMENT_NODE?" Element ":" Node ",f+=d.nodeName,d.nodeValue&&(f+=" with value '"+d.nodeValue+"'"),f+=".");return f}}function l(f,d,g,c){return"empty"===f.name?null:r(f,d,g,c)}function f(f,d){if(2!==f.e.length)throw"Element with wrong # of elements: "+f.e.length;for(var m=d.currentNode,c=m?m.nodeType:0,e=null;c>Node.ELEMENT_NODE;){if(c!==Node.COMMENT_NODE&&(c!==Node.TEXT_NODE||!/^\s+$/.test(d.currentNode.nodeValue)))return[new g("Not allowed node of type "+
c+".")];c=(m=d.nextSibling())?m.nodeType:0}if(!m)return[new g("Missing element "+f.names)];if(f.names&&-1===f.names.indexOf(n[m.namespaceURI]+":"+m.localName))return[new g("Found "+m.nodeName+" instead of "+f.names+".",m)];if(d.firstChild()){for(e=l(f.e[1],d,m);d.nextSibling();)if(c=d.currentNode.nodeType,!(d.currentNode&&d.currentNode.nodeType===Node.TEXT_NODE&&/^\s+$/.test(d.currentNode.nodeValue)||c===Node.COMMENT_NODE))return[new g("Spurious content.",d.currentNode)];if(d.parentNode()!==m)return[new g("Implementation error.")]}else e=
l(f.e[1],d,m);d.nextSibling();return e}var p,r,n;r=function(h,d,m,c){var e=h.name,a=null;if("text"===e)a:{for(var b=(h=d.currentNode)?h.nodeType:0;h!==m&&3!==b;){if(1===b){a=[new g("Element not allowed here.",h)];break a}b=(h=d.nextSibling())?h.nodeType:0}d.nextSibling();a=null}else if("data"===e)a=null;else if("value"===e)c!==h.text&&(a=[new g("Wrong value, should be '"+h.text+"', not '"+c+"'",m)]);else if("list"===e)a=null;else if("attribute"===e)a:{if(2!==h.e.length)throw"Attribute with wrong # of elements: "+
h.e.length;e=h.localnames.length;for(a=0;a<e;a+=1){c=m.getAttributeNS(h.namespaces[a],h.localnames[a]);""!==c||m.hasAttributeNS(h.namespaces[a],h.localnames[a])||(c=void 0);if(void 0!==b&&void 0!==c){a=[new g("Attribute defined too often.",m)];break a}b=c}a=void 0===b?[new g("Attribute not found: "+h.names,m)]:l(h.e[1],d,m,b)}else if("element"===e)a=f(h,d);else if("oneOrMore"===e){c=0;do b=d.currentNode,e=r(h.e[0],d,m),c+=1;while(!e&&b!==d.currentNode);1<c?(d.currentNode=b,a=null):a=e}else if("choice"===
e){if(2!==h.e.length)throw"Choice with wrong # of options: "+h.e.length;b=d.currentNode;if("empty"===h.e[0].name){if(e=r(h.e[1],d,m,c))d.currentNode=b;a=null}else{if(e=l(h.e[0],d,m,c))d.currentNode=b,e=r(h.e[1],d,m,c);a=e}}else if("group"===e){if(2!==h.e.length)throw"Group with wrong # of members: "+h.e.length;a=r(h.e[0],d,m)||r(h.e[1],d,m)}else if("interleave"===e)a:{b=h.e.length;c=[b];for(var q=b,k,n,p,w;0<q;){k=0;n=d.currentNode;for(a=0;a<b;a+=1)p=d.currentNode,!0!==c[a]&&c[a]!==p&&(w=h.e[a],(e=
r(w,d,m))?(d.currentNode=p,void 0===c[a]&&(c[a]=!1)):p===d.currentNode||"oneOrMore"===w.name||"choice"===w.name&&("oneOrMore"===w.e[0].name||"oneOrMore"===w.e[1].name)?(k+=1,c[a]=p):(k+=1,c[a]=!0));if(n===d.currentNode&&k===q){a=null;break a}if(0===k){for(a=0;a<b;a+=1)if(!1===c[a]){a=[new g("Interleave does not match.",m)];break a}a=null;break a}for(a=q=0;a<b;a+=1)!0!==c[a]&&(q+=1)}a=null}else throw e+" not allowed in nonEmptyPattern.";return a};this.validate=function(f,d){f.currentNode=f.root;var g=
l(p.e[0],f,f.root);d(g)};this.init=function(f,d){p=f;n=d}};
// Input 54
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.Avatar");runtime.loadClass("ops.OdtCursor");
gui.Caret=function(g,l,f){function p(c){e&&m.parentNode&&(!a||c)&&(c&&void 0!==b&&runtime.clearTimeout(b),a=!0,h.style.opacity=c||"0"===h.style.opacity?"1":"0",b=runtime.setTimeout(function(){a=!1;p(!1)},500))}function r(a,b){var c=a.getBoundingClientRect(),d=0,e=0;c&&b&&(d=Math.max(c.top,b.top),e=Math.min(c.bottom,b.bottom));return e-d}function n(){var a;a=g.getSelectedRange().cloneRange();var b=g.getNode(),d,e=null;b.previousSibling&&(d=b.previousSibling.nodeType===Node.TEXT_NODE?b.previousSibling.textContent.length:
b.previousSibling.childNodes.length,a.setStart(b.previousSibling,0<d?d-1:0),a.setEnd(b.previousSibling,d),(d=a.getBoundingClientRect())&&d.height&&(e=d));b.nextSibling&&(a.setStart(b.nextSibling,0),a.setEnd(b.nextSibling,0<(b.nextSibling.nodeType===Node.TEXT_NODE?b.nextSibling.textContent.length:b.nextSibling.childNodes.length)?1:0),(d=a.getBoundingClientRect())&&d.height&&(!e||r(b,d)>r(b,e))&&(e=d));a=e;b=g.getOdtDocument().getOdfCanvas().getZoomLevel();c&&g.getSelectionType()===ops.OdtCursor.RangeSelection?
h.style.visibility="visible":h.style.visibility="hidden";a?(h.style.top="0",e=q.getBoundingClientRect(h),8>a.height&&(a={top:a.top-(8-a.height)/2,height:8}),h.style.height=q.adaptRangeDifferenceToZoomLevel(a.height,b)+"px",h.style.top=q.adaptRangeDifferenceToZoomLevel(a.top-e.top,b)+"px"):(h.style.height="1em",h.style.top="5%")}var h,d,m,c=!0,e=!1,a=!1,b,q=new core.DomUtils;this.handleUpdate=n;this.refreshCursorBlinking=function(){f||g.getSelectedRange().collapsed?(e=!0,p(!0)):(e=!1,h.style.opacity=
"0")};this.setFocus=function(){e=!0;d.markAsFocussed(!0);p(!0)};this.removeFocus=function(){e=!1;d.markAsFocussed(!1);h.style.opacity="1"};this.show=function(){c=!0;n();d.markAsFocussed(!0)};this.hide=function(){c=!1;n();d.markAsFocussed(!1)};this.setAvatarImageUrl=function(a){d.setImageUrl(a)};this.setColor=function(a){h.style.borderColor=a;d.setColor(a)};this.getCursor=function(){return g};this.getFocusElement=function(){return h};this.toggleHandleVisibility=function(){d.isVisible()?d.hide():d.show()};
this.showHandle=function(){d.show()};this.hideHandle=function(){d.hide()};this.ensureVisible=function(){var a,b,c,d,e=g.getOdtDocument().getOdfCanvas().getElement().parentNode,f;c=e.offsetWidth-e.clientWidth+5;d=e.offsetHeight-e.clientHeight+5;f=h.getBoundingClientRect();a=f.left-c;b=f.top-d;c=f.right+c;d=f.bottom+d;f=e.getBoundingClientRect();b<f.top?e.scrollTop-=f.top-b:d>f.bottom&&(e.scrollTop+=d-f.bottom);a<f.left?e.scrollLeft-=f.left-a:c>f.right&&(e.scrollLeft+=c-f.right);n()};this.destroy=function(a){d.destroy(function(b){b?
a(b):(m.removeChild(h),a())})};(function(){var a=g.getOdtDocument().getDOM();h=a.createElementNS(a.documentElement.namespaceURI,"span");h.style.top="5%";m=g.getNode();m.appendChild(h);d=new gui.Avatar(m,l);n()})()};
// Input 55
gui.EventManager=function(g){function l(){return g.getOdfCanvas().getElement()}function f(){var c=this,a=[];this.handlers=[];this.isSubscribed=!1;this.handleEvent=function(b){-1===a.indexOf(b)&&(a.push(b),c.handlers.forEach(function(a){a(b)}),runtime.setTimeout(function(){a.splice(a.indexOf(b),1)},0))}}function p(c){var a=c.scrollX,b=c.scrollY;this.restore=function(){c.scrollX===a&&c.scrollY===b||c.scrollTo(a,b)}}function r(c){var a=c.scrollTop,b=c.scrollLeft;this.restore=function(){if(c.scrollTop!==
a||c.scrollLeft!==b)c.scrollTop=a,c.scrollLeft=b}}function n(c,a,b){var f="on"+a,h=!1;c.attachEvent&&(h=c.attachEvent(f,b));!h&&c.addEventListener&&(c.addEventListener(a,b,!1),h=!0);h&&!d[a]||!c.hasOwnProperty(f)||(c[f]=b)}var h=runtime.getWindow(),d={beforecut:!0,beforepaste:!0},m,c;this.subscribe=function(d,a){var b=m[d],f=l();b?(b.handlers.push(a),b.isSubscribed||(b.isSubscribed=!0,n(h,d,b.handleEvent),n(f,d,b.handleEvent),n(c,d,b.handleEvent))):n(f,d,a)};this.unsubscribe=function(c,a){var b=m[c],
d=b&&b.handlers.indexOf(a),f=l();b?-1!==d&&b.handlers.splice(d,1):(b="on"+c,f.detachEvent&&f.detachEvent(b,a),f.removeEventListener&&f.removeEventListener(c,a,!1),f[b]===a&&(f[b]=null))};this.focus=function(){var d,a=l(),b=h.getSelection();if(g.getDOM().activeElement!==l()){for(d=a;d&&!d.scrollTop&&!d.scrollLeft;)d=d.parentNode;d=d?new r(d):new p(h);a.focus();d&&d.restore()}b&&b.extend&&(c.parentNode!==a&&a.appendChild(c),b.collapse(c.firstChild,0),b.extend(c,c.childNodes.length))};(function(){var d=
l(),a=d.ownerDocument;runtime.assert(Boolean(h),"EventManager requires a window object to operate correctly");m={mousedown:new f,mouseup:new f,focus:new f};c=a.createElement("div");c.id="eventTrap";c.setAttribute("contenteditable","true");c.style.position="absolute";c.style.left="-10000px";c.appendChild(a.createTextNode("dummy content"));d.appendChild(c)})()};
// Input 56
runtime.loadClass("gui.SelectionMover");gui.ShadowCursor=function(g){var l=g.getDOM().createRange(),f=!0;this.removeFromOdtDocument=function(){};this.getMemberId=function(){return gui.ShadowCursor.ShadowCursorMemberId};this.getSelectedRange=function(){return l};this.setSelectedRange=function(g,r){l=g;f=!1!==r};this.hasForwardSelection=function(){return f};this.getOdtDocument=function(){return g};this.getSelectionType=function(){return ops.OdtCursor.RangeSelection};l.setStart(g.getRootNode(),0)};
gui.ShadowCursor.ShadowCursorMemberId="";(function(){return gui.ShadowCursor})();
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
gui.UndoStateRules=function(){function g(f){return f.spec().optype}function l(f){return f.isEdit}this.getOpType=g;this.isEditOperation=l;this.isPartOfOperationSet=function(f,p){if(f.isEdit){if(0===p.length)return!0;var r;if(r=p[p.length-1].isEdit)a:{r=p.filter(l);var n=g(f),h;b:switch(n){case "RemoveText":case "InsertText":h=!0;break b;default:h=!1}if(h&&n===g(r[0])){if(1===r.length){r=!0;break a}n=r[r.length-2].spec().position;r=r[r.length-1].spec().position;h=f.spec().position;if(r===h-(r-n)){r=
!0;break a}}r=!1}return r}return!0}};
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
ops.EditInfo=function(g,l){function f(){var f=[],h;for(h in r)r.hasOwnProperty(h)&&f.push({memberid:h,time:r[h].time});f.sort(function(d,f){return d.time-f.time});return f}var p,r={};this.getNode=function(){return p};this.getOdtDocument=function(){return l};this.getEdits=function(){return r};this.getSortedEdits=function(){return f()};this.addEdit=function(f,h){r[f]={time:h}};this.clearEdits=function(){r={}};this.destroy=function(f){g.parentNode&&g.removeChild(p);f()};p=l.getDOM().createElementNS("urn:webodf:names:editinfo",
"editinfo");g.insertBefore(p,g.firstChild)};
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
runtime.loadClass("core.DomUtils");
ops.OpAddAnnotation=function(){function g(d,f,c){var e=d.getTextNodeAtStep(c,l);e&&(d=e.textNode,c=d.parentNode,e.offset!==d.length&&d.splitText(e.offset),c.insertBefore(f,d.nextSibling),0===d.length&&c.removeChild(d))}var l,f,p,r,n,h;this.init=function(d){l=d.memberid;f=parseInt(d.timestamp,10);p=parseInt(d.position,10);r=parseInt(d.length,10)||0;n=d.name};this.isEdit=!0;this.execute=function(d){var m={},c=d.getCursor(l),e,a;a=new core.DomUtils;h=d.getDOM();var b=new Date(f),q,k,t,A;e=h.createElementNS(odf.Namespaces.officens,
"office:annotation");e.setAttributeNS(odf.Namespaces.officens,"office:name",n);q=h.createElementNS(odf.Namespaces.dcns,"dc:creator");q.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",l);q.textContent=d.getMember(l).getProperties().fullName;k=h.createElementNS(odf.Namespaces.dcns,"dc:date");k.appendChild(h.createTextNode(b.toISOString()));b=h.createElementNS(odf.Namespaces.textns,"text:list");t=h.createElementNS(odf.Namespaces.textns,"text:list-item");A=h.createElementNS(odf.Namespaces.textns,
"text:p");t.appendChild(A);b.appendChild(t);e.appendChild(q);e.appendChild(k);e.appendChild(b);m.node=e;if(!m.node)return!1;if(r){e=h.createElementNS(odf.Namespaces.officens,"office:annotation-end");e.setAttributeNS(odf.Namespaces.officens,"office:name",n);m.end=e;if(!m.end)return!1;g(d,m.end,p+r)}g(d,m.node,p);d.emit(ops.OdtDocument.signalStepsInserted,{position:p,length:r});c&&(e=h.createRange(),a=a.getElementsByTagNameNS(m.node,odf.Namespaces.textns,"p")[0],e.selectNodeContents(a),c.setSelectedRange(e),
d.emit(ops.OdtDocument.signalCursorMoved,c));d.getOdfCanvas().addAnnotation(m);d.fixCursorPositions();return!0};this.spec=function(){return{optype:"AddAnnotation",memberid:l,timestamp:f,position:p,length:r,name:n}}};
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
ops.OpAddCursor=function(){var g,l;this.init=function(f){g=f.memberid;l=f.timestamp};this.isEdit=!1;this.execute=function(f){var l=f.getCursor(g);if(l)return!1;l=new ops.OdtCursor(g,f);f.addCursor(l);f.emit(ops.OdtDocument.signalCursorAdded,l);return!0};this.spec=function(){return{optype:"AddCursor",memberid:g,timestamp:l}}};
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
runtime.loadClass("ops.Member");ops.OpAddMember=function(){var g,l,f;this.init=function(p){g=p.memberid;l=parseInt(p.timestamp,10);f=p.setProperties};this.isEdit=!1;this.execute=function(l){if(l.getMember(g))return!1;var r=new ops.Member(g,f);l.addMember(r);l.emit(ops.OdtDocument.signalMemberAdded,r);return!0};this.spec=function(){return{optype:"AddMember",memberid:g,timestamp:l,setProperties:f}}};
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
runtime.loadClass("odf.Namespaces");
ops.OpAddStyle=function(){var g,l,f,p,r,n,h=odf.Namespaces.stylens;this.init=function(d){g=d.memberid;l=d.timestamp;f=d.styleName;p=d.styleFamily;r="true"===d.isAutomaticStyle||!0===d.isAutomaticStyle;n=d.setProperties};this.isEdit=!0;this.execute=function(d){var g=d.getOdfCanvas().odfContainer(),c=d.getFormatting(),e=d.getDOM().createElementNS(h,"style:style");if(!e)return!1;n&&c.updateStyle(e,n);e.setAttributeNS(h,"style:family",p);e.setAttributeNS(h,"style:name",f);r?g.rootElement.automaticStyles.appendChild(e):
g.rootElement.styles.appendChild(e);d.getOdfCanvas().refreshCSS();r||d.emit(ops.OdtDocument.signalCommonStyleCreated,{name:f,family:p});return!0};this.spec=function(){return{optype:"AddStyle",memberid:g,timestamp:l,styleName:f,styleFamily:p,isAutomaticStyle:r,setProperties:n}}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.TextStyleApplicator");
ops.OpApplyDirectStyling=function(){function g(f,c,e){var a=f.getOdfCanvas().odfContainer(),b=d.splitBoundaries(c),g=h.getTextNodes(c,!1);c={startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset};(new odf.TextStyleApplicator(new odf.ObjectNameGenerator(a,l),f.getFormatting(),a.rootElement.automaticStyles)).applyStyle(g,c,e);b.forEach(d.normalizeTextNodes)}var l,f,p,r,n,h=new odf.OdfUtils,d=new core.DomUtils;this.init=function(d){l=d.memberid;f=
d.timestamp;p=parseInt(d.position,10);r=parseInt(d.length,10);n=d.setProperties};this.isEdit=!0;this.execute=function(d){var c=d.convertCursorToDomRange(p,r),e=h.getImpactedParagraphs(c);g(d,c,n);c.detach();d.getOdfCanvas().refreshCSS();d.fixCursorPositions();e.forEach(function(a){d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:l,timeStamp:f})});d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"ApplyDirectStyling",memberid:l,timestamp:f,
position:p,length:r,setProperties:n}}};
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
ops.OpInsertImage=function(){var g,l,f,p,r,n,h,d,m=odf.Namespaces.drawns,c=odf.Namespaces.svgns,e=odf.Namespaces.textns,a=odf.Namespaces.xlinkns;this.init=function(a){g=a.memberid;l=a.timestamp;f=a.position;p=a.filename;r=a.frameWidth;n=a.frameHeight;h=a.frameStyleName;d=a.frameName};this.isEdit=!0;this.execute=function(b){var q=b.getOdfCanvas(),k=b.getTextNodeAtStep(f,g),t,A;if(!k)return!1;t=k.textNode;A=b.getParagraphElement(t);var k=k.offset!==t.length?t.splitText(k.offset):t.nextSibling,w=b.getDOM(),
x=w.createElementNS(m,"draw:image"),w=w.createElementNS(m,"draw:frame");x.setAttributeNS(a,"xlink:href",p);x.setAttributeNS(a,"xlink:type","simple");x.setAttributeNS(a,"xlink:show","embed");x.setAttributeNS(a,"xlink:actuate","onLoad");w.setAttributeNS(m,"draw:style-name",h);w.setAttributeNS(m,"draw:name",d);w.setAttributeNS(e,"text:anchor-type","as-char");w.setAttributeNS(c,"svg:width",r);w.setAttributeNS(c,"svg:height",n);w.appendChild(x);t.parentNode.insertBefore(w,k);b.emit(ops.OdtDocument.signalStepsInserted,
{position:f,length:1});0===t.length&&t.parentNode.removeChild(t);q.addCssForFrameWithImage(w);q.refreshCSS();b.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:A,memberId:g,timeStamp:l});q.rerenderAnnotations();return!0};this.spec=function(){return{optype:"InsertImage",memberid:g,timestamp:l,filename:p,position:f,frameWidth:r,frameHeight:n,frameStyleName:h,frameName:d}}};
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
ops.OpInsertTable=function(){function g(d,a){var b;if(1===c.length)b=c[0];else if(3===c.length)switch(d){case 0:b=c[0];break;case p-1:b=c[2];break;default:b=c[1]}else b=c[d];if(1===b.length)return b[0];if(3===b.length)switch(a){case 0:return b[0];case r-1:return b[2];default:return b[1]}return b[a]}var l,f,p,r,n,h,d,m,c;this.init=function(e){l=e.memberid;f=e.timestamp;n=e.position;p=e.initialRows;r=e.initialColumns;h=e.tableName;d=e.tableStyleName;m=e.tableColumnStyleName;c=e.tableCellStyleMatrix};
this.isEdit=!0;this.execute=function(c){var a=c.getTextNodeAtStep(n),b=c.getRootNode();if(a){var q=c.getDOM(),k=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table"),t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-column"),A,w,x,v;d&&k.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",d);h&&k.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:name",h);t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0",
"table:number-columns-repeated",r);m&&t.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",m);k.appendChild(t);for(x=0;x<p;x+=1){t=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-row");for(v=0;v<r;v+=1)A=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:table-cell"),(w=g(x,v))&&A.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:table:1.0","table:style-name",w),w=q.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",
"text:p"),A.appendChild(w),t.appendChild(A);k.appendChild(t)}a=c.getParagraphElement(a.textNode);b.insertBefore(k,a.nextSibling);c.emit(ops.OdtDocument.signalStepsInserted,{position:n,length:r*p+1});c.getOdfCanvas().refreshSize();c.emit(ops.OdtDocument.signalTableAdded,{tableElement:k,memberId:l,timeStamp:f});c.getOdfCanvas().rerenderAnnotations();return!0}return!1};this.spec=function(){return{optype:"InsertTable",memberid:l,timestamp:f,position:n,initialRows:p,initialColumns:r,tableName:h,tableStyleName:d,
tableColumnStyleName:m,tableCellStyleMatrix:c}}};
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
ops.OpInsertText=function(){var g,l,f,p,r;this.init=function(n){g=n.memberid;l=n.timestamp;f=n.position;p=n.text;r="true"===n.moveCursor||!0===n.moveCursor};this.isEdit=!0;this.execute=function(n){var h,d,m,c=null,e=n.getDOM(),a,b=0,q,k=n.getCursor(g),t;n.upgradeWhitespacesAtPosition(f);if(h=n.getTextNodeAtStep(f)){d=h.textNode;c=d.nextSibling;m=d.parentNode;a=n.getParagraphElement(d);for(t=0;t<p.length;t+=1)if(" "===p[t]&&(0===t||t===p.length-1||" "===p[t-1])||"\t"===p[t])0===b?(h.offset!==d.length&&
(c=d.splitText(h.offset)),0<t&&d.appendData(p.substring(0,t))):b<t&&(b=p.substring(b,t),m.insertBefore(e.createTextNode(b),c)),b=t+1,q=" "===p[t]?"text:s":"text:tab",q=e.createElementNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0",q),q.appendChild(e.createTextNode(p[t])),m.insertBefore(q,c);0===b?d.insertData(h.offset,p):b<p.length&&(h=p.substring(b),m.insertBefore(e.createTextNode(h),c));m=d.parentNode;c=d.nextSibling;m.removeChild(d);m.insertBefore(d,c);0===d.length&&d.parentNode.removeChild(d);
n.emit(ops.OdtDocument.signalStepsInserted,{position:f,length:p.length});k&&r&&(n.moveCursor(g,f+p.length,0),n.emit(ops.OdtDocument.signalCursorMoved,k));0<f&&(1<f&&n.downgradeWhitespacesAtPosition(f-2),n.downgradeWhitespacesAtPosition(f-1));n.downgradeWhitespacesAtPosition(f);n.downgradeWhitespacesAtPosition(f+p.length-1);n.downgradeWhitespacesAtPosition(f+p.length);n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:g,timeStamp:l});n.getOdfCanvas().rerenderAnnotations();
return!0}return!1};this.spec=function(){return{optype:"InsertText",memberid:g,timestamp:l,position:f,text:p,moveCursor:r}}};
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
ops.OpMoveCursor=function(){var g,l,f,p,r;this.init=function(n){g=n.memberid;l=n.timestamp;f=n.position;p=n.length||0;r=n.selectionType||ops.OdtCursor.RangeSelection};this.isEdit=!1;this.execute=function(l){var h=l.getCursor(g),d;if(!h)return!1;d=l.convertCursorToDomRange(f,p);h.setSelectedRange(d,0<=p);h.setSelectionType(r);l.emit(ops.OdtDocument.signalCursorMoved,h);return!0};this.spec=function(){return{optype:"MoveCursor",memberid:g,timestamp:l,position:f,length:p,selectionType:r}}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("core.DomUtils");
ops.OpRemoveAnnotation=function(){var g,l,f,p,r;this.init=function(n){g=n.memberid;l=n.timestamp;f=parseInt(n.position,10);p=parseInt(n.length,10);r=new core.DomUtils};this.isEdit=!0;this.execute=function(g){for(var h=g.getIteratorAtPosition(f).container(),d,l,c;h.namespaceURI!==odf.Namespaces.officens||"annotation"!==h.localName;)h=h.parentNode;if(null===h)return!1;(d=h.getAttributeNS(odf.Namespaces.officens,"name"))&&(l=r.getElementsByTagNameNS(g.getRootNode(),odf.Namespaces.officens,"annotation-end").filter(function(c){return d===
c.getAttributeNS(odf.Namespaces.officens,"name")})[0]||null);g.getOdfCanvas().forgetAnnotations();for(c=r.getElementsByTagNameNS(h,"urn:webodf:names:cursor","cursor");c.length;)h.parentNode.insertBefore(c.pop(),h);h.parentNode.removeChild(h);l&&l.parentNode.removeChild(l);g.emit(ops.OdtDocument.signalStepsRemoved,{position:0<f?f-1:f,length:p});g.fixCursorPositions();g.getOdfCanvas().refreshAnnotations();return!0};this.spec=function(){return{optype:"RemoveAnnotation",memberid:g,timestamp:l,position:f,
length:p}}};
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
ops.OpRemoveBlob=function(){var g,l,f;this.init=function(p){g=p.memberid;l=p.timestamp;f=p.filename};this.isEdit=!0;this.execute=function(g){g.getOdfCanvas().odfContainer().removeBlob(f);return!0};this.spec=function(){return{optype:"RemoveBlob",memberid:g,timestamp:l,filename:f}}};
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
ops.OpRemoveCursor=function(){var g,l;this.init=function(f){g=f.memberid;l=f.timestamp};this.isEdit=!1;this.execute=function(f){return f.removeCursor(g)?!0:!1};this.spec=function(){return{optype:"RemoveCursor",memberid:g,timestamp:l}}};
// Input 72
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
runtime.loadClass("ops.Member");ops.OpRemoveMember=function(){var g,l;this.init=function(f){g=f.memberid;l=parseInt(f.timestamp,10)};this.isEdit=!1;this.execute=function(f){if(!f.getMember(g))return!1;f.removeMember(g);f.emit(ops.OdtDocument.signalMemberRemoved,g);return!0};this.spec=function(){return{optype:"RemoveMember",memberid:g,timestamp:l}}};
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
ops.OpRemoveStyle=function(){var g,l,f,p;this.init=function(r){g=r.memberid;l=r.timestamp;f=r.styleName;p=r.styleFamily};this.isEdit=!0;this.execute=function(g){var l=g.getStyleElement(f,p);if(!l)return!1;l.parentNode.removeChild(l);g.getOdfCanvas().refreshCSS();g.emit(ops.OdtDocument.signalCommonStyleDeleted,{name:f,family:p});return!0};this.spec=function(){return{optype:"RemoveStyle",memberid:g,timestamp:l,styleName:f,styleFamily:p}}};
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
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.OdfUtils");runtime.loadClass("core.DomUtils");
ops.OpRemoveText=function(){function g(f){function c(a){return d.hasOwnProperty(a.namespaceURI)||"br"===a.localName&&n.isLineBreak(a.parentNode)||a.nodeType===Node.TEXT_NODE&&d.hasOwnProperty(a.parentNode.namespaceURI)}function e(a){if(n.isCharacterElement(a))return!1;if(a.nodeType===Node.TEXT_NODE)return 0===a.textContent.length;for(a=a.firstChild;a;){if(d.hasOwnProperty(a.namespaceURI)||!e(a))return!1;a=a.nextSibling}return!0}function a(b){var d;b.nodeType===Node.TEXT_NODE?(d=b.parentNode,d.removeChild(b)):
d=h.removeUnwantedNodes(b,c);return!n.isParagraph(d)&&d!==f&&e(d)?a(d):d}this.isEmpty=e;this.mergeChildrenIntoParent=a}var l,f,p,r,n,h,d={};this.init=function(g){runtime.assert(0<=g.length,"OpRemoveText only supports positive lengths");l=g.memberid;f=g.timestamp;p=parseInt(g.position,10);r=parseInt(g.length,10);n=new odf.OdfUtils;h=new core.DomUtils;d[odf.Namespaces.dbns]=!0;d[odf.Namespaces.dcns]=!0;d[odf.Namespaces.dr3dns]=!0;d[odf.Namespaces.drawns]=!0;d[odf.Namespaces.chartns]=!0;d[odf.Namespaces.formns]=
!0;d[odf.Namespaces.numberns]=!0;d[odf.Namespaces.officens]=!0;d[odf.Namespaces.presentationns]=!0;d[odf.Namespaces.stylens]=!0;d[odf.Namespaces.svgns]=!0;d[odf.Namespaces.tablens]=!0;d[odf.Namespaces.textns]=!0};this.isEdit=!0;this.execute=function(d){var c,e,a,b,q=d.getCursor(l),k=new g(d.getRootNode());d.upgradeWhitespacesAtPosition(p);d.upgradeWhitespacesAtPosition(p+r);e=d.convertCursorToDomRange(p,r);h.splitBoundaries(e);c=d.getParagraphElement(e.startContainer);a=n.getTextElements(e,!1,!0);
b=n.getParagraphElements(e);e.detach();a.forEach(function(a){k.mergeChildrenIntoParent(a)});e=b.reduce(function(a,b){var c,d=!1,e=a,f=b,h,g=null;k.isEmpty(a)&&(d=!0,b.parentNode!==a.parentNode&&(h=b.parentNode,a.parentNode.insertBefore(b,a.nextSibling)),f=a,e=b,g=e.getElementsByTagNameNS("urn:webodf:names:editinfo","editinfo")[0]||e.firstChild);for(;f.hasChildNodes();)c=d?f.lastChild:f.firstChild,f.removeChild(c),"editinfo"!==c.localName&&e.insertBefore(c,g);h&&k.isEmpty(h)&&k.mergeChildrenIntoParent(h);
k.mergeChildrenIntoParent(f);return e});d.emit(ops.OdtDocument.signalStepsRemoved,{position:p,length:r});d.downgradeWhitespacesAtPosition(p);d.fixCursorPositions();d.getOdfCanvas().refreshSize();d.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:e||c,memberId:l,timeStamp:f});q&&(q.resetSelectionType(),d.emit(ops.OdtDocument.signalCursorMoved,q));d.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"RemoveText",memberid:l,timestamp:f,position:p,length:r}}};
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
ops.OpSetBlob=function(){var g,l,f,p,r;this.init=function(n){g=n.memberid;l=n.timestamp;f=n.filename;p=n.mimetype;r=n.content};this.isEdit=!0;this.execute=function(g){g.getOdfCanvas().odfContainer().setBlob(f,p,r);return!0};this.spec=function(){return{optype:"SetBlob",memberid:g,timestamp:l,filename:f,mimetype:p,content:r}}};
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
ops.OpSetParagraphStyle=function(){var g,l,f,p;this.init=function(r){g=r.memberid;l=r.timestamp;f=r.position;p=r.styleName};this.isEdit=!0;this.execute=function(r){var n;n=r.getIteratorAtPosition(f);return(n=r.getParagraphElement(n.container()))?(""!==p?n.setAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","text:style-name",p):n.removeAttributeNS("urn:oasis:names:tc:opendocument:xmlns:text:1.0","style-name"),r.getOdfCanvas().refreshSize(),r.emit(ops.OdtDocument.signalParagraphChanged,
{paragraphElement:n,timeStamp:l,memberId:g}),r.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=function(){return{optype:"SetParagraphStyle",memberid:g,timestamp:l,position:f,styleName:p}}};
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
ops.OpSplitParagraph=function(){var g,l,f,p,r;this.init=function(n){g=n.memberid;l=n.timestamp;f=n.position;p="true"===n.moveCursor||!0===n.moveCursor;r=new odf.OdfUtils};this.isEdit=!0;this.execute=function(n){var h,d,m,c,e,a,b,q=n.getCursor(g);n.upgradeWhitespacesAtPosition(f);h=n.getTextNodeAtStep(f);if(!h)return!1;d=n.getParagraphElement(h.textNode);if(!d)return!1;m=r.isListItem(d.parentNode)?d.parentNode:d;0===h.offset?(b=h.textNode.previousSibling,a=null):(b=h.textNode,a=h.offset>=h.textNode.length?
null:h.textNode.splitText(h.offset));for(c=h.textNode;c!==m;){c=c.parentNode;e=c.cloneNode(!1);a&&e.appendChild(a);if(b)for(;b&&b.nextSibling;)e.appendChild(b.nextSibling);else for(;c.firstChild;)e.appendChild(c.firstChild);c.parentNode.insertBefore(e,c.nextSibling);b=c;a=e}r.isListItem(a)&&(a=a.childNodes[0]);0===h.textNode.length&&h.textNode.parentNode.removeChild(h.textNode);n.emit(ops.OdtDocument.signalStepsInserted,{position:f,length:1});q&&p&&(n.moveCursor(g,f+1,0),n.emit(ops.OdtDocument.signalCursorMoved,
q));n.fixCursorPositions();n.getOdfCanvas().refreshSize();n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:d,memberId:g,timeStamp:l});n.emit(ops.OdtDocument.signalParagraphChanged,{paragraphElement:a,memberId:g,timeStamp:l});n.getOdfCanvas().rerenderAnnotations();return!0};this.spec=function(){return{optype:"SplitParagraph",memberid:g,timestamp:l,position:f,moveCursor:p}}};
// Input 78
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
ops.OpUpdateMember=function(){function g(){var f="//dc:creator[@editinfo:memberid='"+l+"']",f=xmldom.XPath.getODFElementsWithXPath(n.getRootNode(),f,function(d){return"editinfo"===d?"urn:webodf:names:editinfo":odf.Namespaces.lookupNamespaceURI(d)}),d;for(d=0;d<f.length;d+=1)f[d].textContent=p.fullName}var l,f,p,r,n;this.init=function(h){l=h.memberid;f=parseInt(h.timestamp,10);p=h.setProperties;r=h.removedProperties};this.isEdit=!1;this.execute=function(f){n=f;var d=f.getMember(l);if(!d)return!1;r&&
d.removeProperties(r);p&&(d.setProperties(p),p.fullName&&g());f.emit(ops.OdtDocument.signalMemberUpdated,d);return!0};this.spec=function(){return{optype:"UpdateMember",memberid:l,timestamp:f,setProperties:p,removedProperties:r}}};
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
ops.OpUpdateMetadata=function(){var g,l,f,p;this.init=function(r){g=r.memberid;l=parseInt(r.timestamp,10);f=r.setProperties;p=r.removedProperties};this.isEdit=!0;this.execute=function(g){g=g.getOdfCanvas().odfContainer();var l=[],h=["dc:date","dc:creator","meta:editing-cycles"];f&&h.forEach(function(d){if(f[d])return!1});p&&(h.forEach(function(d){if(-1!==l.indexOf(d))return!1}),l=p.attributes.split(","));g.setMetadata(f,l);return!0};this.spec=function(){return{optype:"UpdateMetadata",memberid:g,timestamp:l,
setProperties:f,removedProperties:p}}};
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
runtime.loadClass("odf.Namespaces");
ops.OpUpdateParagraphStyle=function(){function g(d,f){var c,e,a=f?f.split(","):[];for(c=0;c<a.length;c+=1)e=a[c].split(":"),d.removeAttributeNS(odf.Namespaces.lookupNamespaceURI(e[0]),e[1])}var l,f,p,r,n,h=odf.Namespaces.stylens;this.init=function(d){l=d.memberid;f=d.timestamp;p=d.styleName;r=d.setProperties;n=d.removedProperties};this.isEdit=!0;this.execute=function(d){var f=d.getFormatting(),c,e,a;return(c=""!==p?d.getParagraphStyleElement(p):f.getDefaultStyleElement("paragraph"))?(e=c.getElementsByTagNameNS(h,
"paragraph-properties")[0],a=c.getElementsByTagNameNS(h,"text-properties")[0],r&&f.updateStyle(c,r),n&&(n["style:paragraph-properties"]&&(g(e,n["style:paragraph-properties"].attributes),0===e.attributes.length&&c.removeChild(e)),n["style:text-properties"]&&(g(a,n["style:text-properties"].attributes),0===a.attributes.length&&c.removeChild(a)),g(c,n.attributes)),d.getOdfCanvas().refreshCSS(),d.emit(ops.OdtDocument.signalParagraphStyleModified,p),d.getOdfCanvas().rerenderAnnotations(),!0):!1};this.spec=
function(){return{optype:"UpdateParagraphStyle",memberid:l,timestamp:f,styleName:p,setProperties:r,removedProperties:n}}};
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
runtime.loadClass("ops.OpAddMember");runtime.loadClass("ops.OpUpdateMember");runtime.loadClass("ops.OpRemoveMember");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("ops.OpMoveCursor");runtime.loadClass("ops.OpSetBlob");runtime.loadClass("ops.OpRemoveBlob");runtime.loadClass("ops.OpInsertImage");runtime.loadClass("ops.OpInsertTable");runtime.loadClass("ops.OpInsertText");runtime.loadClass("ops.OpRemoveText");
runtime.loadClass("ops.OpSplitParagraph");runtime.loadClass("ops.OpSetParagraphStyle");runtime.loadClass("ops.OpUpdateParagraphStyle");runtime.loadClass("ops.OpAddStyle");runtime.loadClass("ops.OpRemoveStyle");runtime.loadClass("ops.OpAddAnnotation");runtime.loadClass("ops.OpRemoveAnnotation");runtime.loadClass("ops.OpUpdateMetadata");
ops.OperationFactory=function(){function g(f){return function(){return new f}}var l;this.register=function(f,g){l[f]=g};this.create=function(f){var g=null,r=l[f.optype];r&&(g=r(f),g.init(f));return g};l={AddMember:g(ops.OpAddMember),UpdateMember:g(ops.OpUpdateMember),RemoveMember:g(ops.OpRemoveMember),AddCursor:g(ops.OpAddCursor),ApplyDirectStyling:g(ops.OpApplyDirectStyling),SetBlob:g(ops.OpSetBlob),RemoveBlob:g(ops.OpRemoveBlob),InsertImage:g(ops.OpInsertImage),InsertTable:g(ops.OpInsertTable),
InsertText:g(ops.OpInsertText),RemoveText:g(ops.OpRemoveText),SplitParagraph:g(ops.OpSplitParagraph),SetParagraphStyle:g(ops.OpSetParagraphStyle),UpdateParagraphStyle:g(ops.OpUpdateParagraphStyle),AddStyle:g(ops.OpAddStyle),RemoveStyle:g(ops.OpRemoveStyle),MoveCursor:g(ops.OpMoveCursor),RemoveCursor:g(ops.OpRemoveCursor),AddAnnotation:g(ops.OpAddAnnotation),RemoveAnnotation:g(ops.OpRemoveAnnotation),UpdateMetadata:g(ops.OpUpdateMetadata)}};
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
ops.OperationRouter=function(){};ops.OperationRouter.prototype.setOperationFactory=function(g){};ops.OperationRouter.prototype.setPlaybackFunction=function(g){};ops.OperationRouter.prototype.push=function(g){};ops.OperationRouter.prototype.close=function(g){};ops.OperationRouter.prototype.subscribe=function(g,l){};ops.OperationRouter.prototype.unsubscribe=function(g,l){};ops.OperationRouter.prototype.hasLocalUnsyncedOps=function(){};ops.OperationRouter.prototype.hasSessionHostConnection=function(){};
// Input 83
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
ops.OperationTransformMatrix=function(){function g(a){a.position+=a.length;a.length*=-1}function l(a){var b=0>a.length;b&&g(a);return b}function f(a,b){var c=[];a&&["style:parent-style-name","style:next-style-name"].forEach(function(d){a[d]===b&&c.push(d)});return c}function p(a,b){a&&["style:parent-style-name","style:next-style-name"].forEach(function(c){a[c]===b&&delete a[c]})}function r(a){var b={};Object.keys(a).forEach(function(c){b[c]="object"===typeof a[c]?r(a[c]):a[c]});return b}function n(a,
b,c,d){var e,f,h=!1,g=!1,l,m,n=d&&d.attributes?d.attributes.split(","):[];a&&(c||0<n.length)&&Object.keys(a).forEach(function(b){e=a[b];"object"!==typeof e&&(l=c&&c[b],void 0!==l?(delete a[b],g=!0,l===e&&(delete c[b],h=!0)):n&&-1!==n.indexOf(b)&&(delete a[b],g=!0))});if(b&&b.attributes&&(c||0<n.length)){m=b.attributes.split(",");for(d=0;d<m.length;d+=1)if(f=m[d],c&&void 0!==c[f]||n&&-1!==n.indexOf(f))m.splice(d,1),d-=1,g=!0;0<m.length?b.attributes=m.join(","):delete b.attributes}return{majorChanged:h,
minorChanged:g}}function h(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1}function d(a){for(var b in a)if(a.hasOwnProperty(b)&&("attributes"!==b||0<a.attributes.length))return!0;return!1}function m(a,b,c){var e=a.setProperties?a.setProperties[c]:null,f=a.removedProperties?a.removedProperties[c]:null,g=b.setProperties?b.setProperties[c]:null,l=b.removedProperties?b.removedProperties[c]:null,m;m=n(e,f,g,l);e&&!h(e)&&delete a.setProperties[c];f&&!d(f)&&delete a.removedProperties[c];g&&!h(g)&&
delete b.setProperties[c];l&&!d(l)&&delete b.removedProperties[c];return m}function c(a,b){return{opSpecsA:[a],opSpecsB:[b]}}var e={AddCursor:{AddCursor:c,AddMember:c,AddStyle:c,ApplyDirectStyling:c,InsertText:c,MoveCursor:c,RemoveCursor:c,RemoveMember:c,RemoveStyle:c,RemoveText:c,SetParagraphStyle:c,SplitParagraph:c,UpdateMember:c,UpdateMetadata:c,UpdateParagraphStyle:c},AddMember:{AddStyle:c,InsertText:c,MoveCursor:c,RemoveCursor:c,RemoveStyle:c,RemoveText:c,SetParagraphStyle:c,SplitParagraph:c,
UpdateMetadata:c,UpdateParagraphStyle:c},AddStyle:{AddStyle:c,ApplyDirectStyling:c,InsertText:c,MoveCursor:c,RemoveCursor:c,RemoveMember:c,RemoveStyle:function(a,b){var c,d=[a],e=[b];a.styleFamily===b.styleFamily&&(c=f(a.setProperties,b.styleName),0<c.length&&(c={optype:"UpdateParagraphStyle",memberid:b.memberid,timestamp:b.timestamp,styleName:a.styleName,removedProperties:{attributes:c.join(",")}},e.unshift(c)),p(a.setProperties,b.styleName));return{opSpecsA:d,opSpecsB:e}},RemoveText:c,SetParagraphStyle:c,
SplitParagraph:c,UpdateMember:c,UpdateMetadata:c,UpdateParagraphStyle:c},ApplyDirectStyling:{ApplyDirectStyling:function(a,b,c){var d,e,f,g,l,n,p,s;g=[a];f=[b];if(!(a.position+a.length<=b.position||a.position>=b.position+b.length)){d=c?a:b;e=c?b:a;if(a.position!==b.position||a.length!==b.length)n=r(d),p=r(e);b=m(e,d,"style:text-properties");if(b.majorChanged||b.minorChanged)f=[],a=[],g=d.position+d.length,l=e.position+e.length,e.position<d.position?b.minorChanged&&(s=r(p),s.length=d.position-e.position,
a.push(s),e.position=d.position,e.length=l-e.position):d.position<e.position&&b.majorChanged&&(s=r(n),s.length=e.position-d.position,f.push(s),d.position=e.position,d.length=g-d.position),l>g?b.minorChanged&&(n=p,n.position=g,n.length=l-g,a.push(n),e.length=g-e.position):g>l&&b.majorChanged&&(n.position=l,n.length=g-l,f.push(n),d.length=l-d.position),d.setProperties&&h(d.setProperties)&&f.push(d),e.setProperties&&h(e.setProperties)&&a.push(e),c?(g=f,f=a):g=a}return{opSpecsA:g,opSpecsB:f}},InsertText:function(a,
b){b.position<=a.position?a.position+=b.text.length:b.position<=a.position+a.length&&(a.length+=b.text.length);return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:c,RemoveCursor:c,RemoveStyle:c,RemoveText:function(a,b){var c=a.position+a.length,d=b.position+b.length,e=[a],f=[b];d<=a.position?a.position-=b.length:b.position<c&&(a.position<b.position?a.length=d<c?a.length-b.length:b.position-a.position:(a.position=b.position,d<c?a.length=c-d:e=[]));return{opSpecsA:e,opSpecsB:f}},SetParagraphStyle:c,SplitParagraph:function(a,
b){b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMetadata:c,UpdateParagraphStyle:c},InsertText:{InsertText:function(a,b,c){a.position<b.position?b.position+=a.text.length:a.position>b.position?a.position+=b.text.length:c?b.position+=a.text.length:a.position+=b.text.length;return{opSpecsA:[a],opSpecsB:[b]}},MoveCursor:function(a,b){var c=l(b);a.position<b.position?b.position+=a.text.length:a.position<b.position+b.length&&
(b.length+=a.text.length);c&&g(b);return{opSpecsA:[a],opSpecsB:[b]}},RemoveCursor:c,RemoveMember:c,RemoveStyle:c,RemoveText:function(a,b){var c;c=b.position+b.length;var d=[a],e=[b];c<=a.position?a.position-=b.length:a.position<=b.position?b.position+=a.text.length:(b.length=a.position-b.position,c={optype:"RemoveText",memberid:b.memberid,timestamp:b.timestamp,position:a.position+a.text.length,length:c-a.position},e.unshift(c),a.position=b.position);return{opSpecsA:d,opSpecsB:e}},SplitParagraph:function(a,
b,c){if(a.position<b.position)b.position+=a.text.length;else if(a.position>b.position)a.position+=1;else return c?b.position+=a.text.length:a.position+=1,null;return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:c,UpdateMetadata:c,UpdateParagraphStyle:c},MoveCursor:{MoveCursor:c,RemoveCursor:function(a,b){return{opSpecsA:a.memberid===b.memberid?[]:[a],opSpecsB:[b]}},RemoveMember:c,RemoveStyle:c,RemoveText:function(a,b){var c=l(a),d=a.position+a.length,e=b.position+b.length;e<=a.position?a.position-=b.length:
b.position<d&&(a.position<b.position?a.length=e<d?a.length-b.length:b.position-a.position:(a.position=b.position,a.length=e<d?d-e:0));c&&g(a);return{opSpecsA:[a],opSpecsB:[b]}},SetParagraphStyle:c,SplitParagraph:function(a,b){var c=l(a);b.position<a.position?a.position+=1:b.position<a.position+a.length&&(a.length+=1);c&&g(a);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:c,UpdateMetadata:c,UpdateParagraphStyle:c},RemoveCursor:{RemoveCursor:function(a,b){var c=a.memberid===b.memberid;return{opSpecsA:c?
[]:[a],opSpecsB:c?[]:[b]}},RemoveMember:c,RemoveStyle:c,RemoveText:c,SetParagraphStyle:c,SplitParagraph:c,UpdateMember:c,UpdateMetadata:c,UpdateParagraphStyle:c},RemoveMember:{RemoveStyle:c,RemoveText:c,SetParagraphStyle:c,SplitParagraph:c,UpdateMetadata:c,UpdateParagraphStyle:c},RemoveStyle:{RemoveStyle:function(a,b){var c=a.styleName===b.styleName&&a.styleFamily===b.styleFamily;return{opSpecsA:c?[]:[a],opSpecsB:c?[]:[b]}},RemoveText:c,SetParagraphStyle:function(a,b){var c,d=[a],e=[b];"paragraph"===
a.styleFamily&&a.styleName===b.styleName&&(c={optype:"SetParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,position:b.position,styleName:""},d.unshift(c),b.styleName="");return{opSpecsA:d,opSpecsB:e}},SplitParagraph:c,UpdateMember:c,UpdateMetadata:c,UpdateParagraphStyle:function(a,b){var c,d=[a],e=[b];"paragraph"===a.styleFamily&&(c=f(b.setProperties,a.styleName),0<c.length&&(c={optype:"UpdateParagraphStyle",memberid:a.memberid,timestamp:a.timestamp,styleName:b.styleName,removedProperties:{attributes:c.join(",")}},
d.unshift(c)),a.styleName===b.styleName?e=[]:p(b.setProperties,a.styleName));return{opSpecsA:d,opSpecsB:e}}},RemoveText:{RemoveText:function(a,b){var c=a.position+a.length,d=b.position+b.length,e=[a],f=[b];d<=a.position?a.position-=b.length:c<=b.position?b.position-=a.length:b.position<c&&(a.position<b.position?(a.length=d<c?a.length-b.length:b.position-a.position,c<d?(b.position=a.position,b.length=d-c):f=[]):(c<d?b.length-=a.length:b.position<a.position?b.length=a.position-b.position:f=[],d<c?(a.position=
b.position,a.length=c-d):e=[]));return{opSpecsA:e,opSpecsB:f}},SplitParagraph:function(a,b){var c=a.position+a.length,d=[a],e=[b];b.position<=a.position?a.position+=1:b.position<c&&(a.length=b.position-a.position,c={optype:"RemoveText",memberid:a.memberid,timestamp:a.timestamp,position:b.position+1,length:c-b.position},d.unshift(c));a.position+a.length<=b.position?b.position-=a.length:a.position<b.position&&(b.position=a.position);return{opSpecsA:d,opSpecsB:e}},UpdateMember:c,UpdateMetadata:c,UpdateParagraphStyle:c},
SetParagraphStyle:{UpdateMember:c,UpdateMetadata:c,UpdateParagraphStyle:c},SplitParagraph:{SplitParagraph:function(a,b,c){a.position<b.position?b.position+=1:a.position>b.position?a.position+=1:a.position===b.position&&(c?b.position+=1:a.position+=1);return{opSpecsA:[a],opSpecsB:[b]}},UpdateMember:c,UpdateMetadata:c,UpdateParagraphStyle:c},UpdateMember:{UpdateMetadata:c,UpdateParagraphStyle:c},UpdateMetadata:{UpdateMetadata:function(a,b,c){var e,f=[a],g=[b];e=c?a:b;a=c?b:a;n(a.setProperties||null,
a.removedProperties||null,e.setProperties||null,e.removedProperties||null);e.setProperties&&h(e.setProperties)||e.removedProperties&&d(e.removedProperties)||(c?f=[]:g=[]);a.setProperties&&h(a.setProperties)||a.removedProperties&&d(a.removedProperties)||(c?g=[]:f=[]);return{opSpecsA:f,opSpecsB:g}},UpdateParagraphStyle:c},UpdateParagraphStyle:{UpdateParagraphStyle:function(a,b,c){var e,f=[a],g=[b];a.styleName===b.styleName&&(e=c?a:b,a=c?b:a,m(a,e,"style:paragraph-properties"),m(a,e,"style:text-properties"),
n(a.setProperties||null,a.removedProperties||null,e.setProperties||null,e.removedProperties||null),e.setProperties&&h(e.setProperties)||e.removedProperties&&d(e.removedProperties)||(c?f=[]:g=[]),a.setProperties&&h(a.setProperties)||a.removedProperties&&d(a.removedProperties)||(c?g=[]:f=[]));return{opSpecsA:f,opSpecsB:g}}}};this.passUnchanged=c;this.extendTransformations=function(a){Object.keys(a).forEach(function(b){var c=a[b],d,f=e.hasOwnProperty(b);runtime.log((f?"Extending":"Adding")+" map for optypeA: "+
b);f||(e[b]={});d=e[b];Object.keys(c).forEach(function(a){var e=d.hasOwnProperty(a);runtime.assert(b<=a,"Wrong order:"+b+", "+a);runtime.log("  "+(e?"Overwriting":"Adding")+" entry for optypeB: "+a);d[a]=c[a]})})};this.transformOpspecVsOpspec=function(a,b){var c=a.optype<=b.optype,d;runtime.log("Crosstransforming:");runtime.log(runtime.toJson(a));runtime.log(runtime.toJson(b));c||(d=a,a=b,b=d);(d=(d=e[a.optype])&&d[b.optype])?(d=d(a,b,!c),c||null===d||(d={opSpecsA:d.opSpecsB,opSpecsB:d.opSpecsA})):
d=null;runtime.log("result:");d?(runtime.log(runtime.toJson(d.opSpecsA)),runtime.log(runtime.toJson(d.opSpecsB))):runtime.log("null");return d}};
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
runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OperationTransformMatrix");
ops.OperationTransformer=function(){function g(g){var l=[];g.forEach(function(h){l.push(f.create(h))});return l}function l(f,g){for(var h,d,m=[],c=[];0<f.length&&g;){h=f.shift();h=p.transformOpspecVsOpspec(h,g);if(!h)return null;m=m.concat(h.opSpecsA);if(0===h.opSpecsB.length){m=m.concat(f);g=null;break}for(;1<h.opSpecsB.length;){d=l(f,h.opSpecsB.shift());if(!d)return null;c=c.concat(d.opSpecsB);f=d.opSpecsA}g=h.opSpecsB.pop()}g&&c.push(g);return{opSpecsA:m,opSpecsB:c}}var f,p=new ops.OperationTransformMatrix;
this.setOperationFactory=function(g){f=g};this.getOperationTransformMatrix=function(){return p};this.transform=function(f,n){for(var h,d=[];0<n.length;){h=l(f,n.shift());if(!h)return null;f=h.opSpecsA;d=d.concat(h.opSpecsB)}return{opsA:g(f),opsB:g(d)}}};
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
ops.TrivialOperationRouter=function(){var g,l;this.setOperationFactory=function(f){g=f};this.setPlaybackFunction=function(f){l=f};this.push=function(f){f.forEach(function(f){f=f.spec();f.timestamp=(new Date).getTime();f=g.create(f);l(f)})};this.close=function(f){f()};this.subscribe=function(f,g){};this.unsubscribe=function(f,g){};this.hasLocalUnsyncedOps=function(){return!1};this.hasSessionHostConnection=function(){return!0}};
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
runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker=function(g,l){function f(c,d){return runtime.setTimeout(function(){h.style.opacity=c},d)}var p=this,r,n,h,d,m;this.addEdit=function(c,e){var a=Date.now()-e;g.addEdit(c,e);n.setEdits(g.getSortedEdits());h.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",c);d&&runtime.clearTimeout(d);m&&runtime.clearTimeout(m);1E4>a?(f(1,0),d=f(0.5,1E4-a),m=f(0.2,2E4-a)):1E4<=a&&2E4>a?(f(0.5,0),m=f(0.2,2E4-a)):f(0.2,0)};this.getEdits=function(){return g.getEdits()};this.clearEdits=function(){g.clearEdits();
n.setEdits([]);h.hasAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")&&h.removeAttributeNS("urn:webodf:names:editinfo","editinfo:memberid")};this.getEditInfo=function(){return g};this.show=function(){h.style.display="block"};this.hide=function(){p.hideHandle();h.style.display="none"};this.showHandle=function(){n.show()};this.hideHandle=function(){n.hide()};this.destroy=function(c){r.removeChild(h);n.destroy(function(d){d?c(d):g.destroy(c)})};(function(){var c=g.getOdtDocument().getDOM();
h=c.createElementNS(c.documentElement.namespaceURI,"div");h.setAttribute("class","editInfoMarker");h.onmouseover=function(){p.showHandle()};h.onmouseout=function(){p.hideHandle()};r=g.getNode();r.appendChild(h);n=new gui.EditInfoHandle(r);l||p.hide()})()};
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
gui.PlainTextPasteboard=function(g,l){function f(f,g){f.init(g);return f}this.createPasteOps=function(p){var r=g.getCursorPosition(l),n=r,h=[];p.replace(/\r/g,"").split("\n").forEach(function(d){h.push(f(new ops.OpSplitParagraph,{memberid:l,position:n,moveCursor:!0}));n+=1;h.push(f(new ops.OpInsertText,{memberid:l,position:n,text:d,moveCursor:!0}));n+=d.length});h.push(f(new ops.OpRemoveText,{memberid:l,position:r,length:1}));return h}};
// Input 88
runtime.loadClass("core.DomUtils");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.OdfNodeFilter");runtime.loadClass("gui.SelectionMover");
gui.SelectionView=function(g){function l(){var a=q.getRootNode();k!==a&&(k=a,t=k.parentNode.parentNode.parentNode,t.appendChild(w),t.appendChild(x),t.appendChild(v))}function f(a,b){a.style.left=b.left+"px";a.style.top=b.top+"px";a.style.width=b.width+"px";a.style.height=b.height+"px"}function p(a){H=a;w.style.display=x.style.display=v.style.display=!0===a?"block":"none"}function r(a){var b=s.getBoundingClientRect(t),c=q.getOdfCanvas().getZoomLevel(),d={};d.top=s.adaptRangeDifferenceToZoomLevel(a.top-
b.top,c);d.left=s.adaptRangeDifferenceToZoomLevel(a.left-b.left,c);d.bottom=s.adaptRangeDifferenceToZoomLevel(a.bottom-b.top,c);d.right=s.adaptRangeDifferenceToZoomLevel(a.right-b.left,c);d.width=s.adaptRangeDifferenceToZoomLevel(a.width,c);d.height=s.adaptRangeDifferenceToZoomLevel(a.height,c);return d}function n(a){a=a.getBoundingClientRect();return Boolean(a&&0!==a.height)}function h(a){var b=u.getTextElements(a,!0,!1),c=a.cloneRange(),d=a.cloneRange();a=a.cloneRange();if(!b.length)return null;
var e;a:{e=0;var f=b[e],g=c.startContainer===f?c.startOffset:0,h=g;c.setStart(f,g);for(c.setEnd(f,h);!n(c);){if(f.nodeType===Node.ELEMENT_NODE&&h<f.childNodes.length)h=f.childNodes.length;else if(f.nodeType===Node.TEXT_NODE&&h<f.length)h+=1;else if(b[e])f=b[e],e+=1,g=h=0;else{e=!1;break a}c.setStart(f,g);c.setEnd(f,h)}e=!0}if(!e)return null;a:{e=b.length-1;f=b[e];h=g=d.endContainer===f?d.endOffset:f.length||f.childNodes.length;d.setStart(f,g);for(d.setEnd(f,h);!n(d);){if(f.nodeType===Node.ELEMENT_NODE&&
0<g)g=0;else if(f.nodeType===Node.TEXT_NODE&&0<g)g-=1;else if(b[e])f=b[e],e-=1,g=h=f.length||f.childNodes.length;else{b=!1;break a}d.setStart(f,g);d.setEnd(f,h)}b=!0}if(!b)return null;a.setStart(c.startContainer,c.startOffset);a.setEnd(d.endContainer,d.endOffset);return{firstRange:c,lastRange:d,fillerRange:a}}function d(a,b){var c={};c.top=Math.min(a.top,b.top);c.left=Math.min(a.left,b.left);c.right=Math.max(a.right,b.right);c.bottom=Math.max(a.bottom,b.bottom);c.width=c.right-c.left;c.height=c.bottom-
c.top;return c}function m(a,b){b&&0<b.width&&0<b.height&&(a=a?d(a,b):b);return a}function c(a){function b(a){y.setUnfilteredPosition(a,0);return w.acceptNode(a)===B&&t.acceptPosition(y)===B?B:L}function c(a){var d=null;b(a)===B&&(d=s.getBoundingClientRect(a));return d}var d=a.commonAncestorContainer,e=a.startContainer,f=a.endContainer,g=a.startOffset,h=a.endOffset,k,l,n=null,p,r=A.createRange(),t,w=new odf.OdfNodeFilter,v;if(e===d||f===d)return r=a.cloneRange(),n=r.getBoundingClientRect(),r.detach(),
n;for(a=e;a.parentNode!==d;)a=a.parentNode;for(l=f;l.parentNode!==d;)l=l.parentNode;t=q.createRootFilter(e);for(d=a.nextSibling;d&&d!==l;)p=c(d),n=m(n,p),d=d.nextSibling;if(u.isParagraph(a))n=m(n,s.getBoundingClientRect(a));else if(a.nodeType===Node.TEXT_NODE)d=a,r.setStart(d,g),r.setEnd(d,d===l?h:d.length),p=r.getBoundingClientRect(),n=m(n,p);else for(v=A.createTreeWalker(a,NodeFilter.SHOW_TEXT,b,!1),d=v.currentNode=e;d&&d!==f;)r.setStart(d,g),r.setEnd(d,d.length),p=r.getBoundingClientRect(),n=m(n,
p),k=d,g=0,d=v.nextNode();k||(k=e);if(u.isParagraph(l))n=m(n,s.getBoundingClientRect(l));else if(l.nodeType===Node.TEXT_NODE)d=l,r.setStart(d,d===a?g:0),r.setEnd(d,h),p=r.getBoundingClientRect(),n=m(n,p);else for(v=A.createTreeWalker(l,NodeFilter.SHOW_TEXT,b,!1),d=v.currentNode=f;d&&d!==k;)if(r.setStart(d,0),r.setEnd(d,h),p=r.getBoundingClientRect(),n=m(n,p),d=v.previousNode())h=d.length;return n}function e(a,b){var c=a.getBoundingClientRect(),d={width:0};d.top=c.top;d.bottom=c.bottom;d.height=c.height;
d.left=d.right=b?c.right:c.left;return d}function a(){l();if(g.getSelectionType()===ops.OdtCursor.RangeSelection){p(!0);var a=g.getSelectedRange(),b=h(a),k,m,n,q;a.collapsed||!b?p(!1):(p(!0),a=b.firstRange,k=b.lastRange,b=b.fillerRange,m=r(e(a,!1)),q=r(e(k,!0)),n=(n=c(b))?r(n):d(m,q),f(w,{left:m.left,top:m.top,width:Math.max(0,n.width-(m.left-n.left)),height:m.height}),q.top===m.top||q.bottom===m.bottom?x.style.display=v.style.display="none":(f(v,{left:n.left,top:q.top,width:Math.max(0,q.right-n.left),
height:q.height}),f(x,{left:n.left,top:m.top+m.height,width:Math.max(0,parseFloat(w.style.left)+parseFloat(w.style.width)-parseFloat(v.style.left)),height:Math.max(0,q.top-m.bottom)})),a.detach(),k.detach(),b.detach())}else p(!1)}function b(b){b===g&&a()}var q=g.getOdtDocument(),k,t,A=q.getDOM(),w=A.createElement("div"),x=A.createElement("div"),v=A.createElement("div"),u=new odf.OdfUtils,s=new core.DomUtils,H=!0,y=gui.SelectionMover.createPositionIterator(q.getRootNode()),B=NodeFilter.FILTER_ACCEPT,
L=NodeFilter.FILTER_REJECT;this.show=this.rerender=a;this.hide=function(){p(!1)};this.visible=function(){return H};this.destroy=function(a){t.removeChild(w);t.removeChild(x);t.removeChild(v);g.getOdtDocument().unsubscribe(ops.OdtDocument.signalCursorMoved,b);a()};(function(){var a=g.getMemberId();l();w.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);x.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",a);v.setAttributeNS("urn:webodf:names:editinfo","editinfo:memberid",
a);w.className=x.className=v.className="selectionOverlay";g.getOdtDocument().subscribe(ops.OdtDocument.signalCursorMoved,b)})()};
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
runtime.loadClass("gui.SelectionView");
gui.SelectionViewManager=function(){function g(){return Object.keys(l).map(function(f){return l[f]})}var l={};this.getSelectionView=function(f){return l.hasOwnProperty(f)?l[f]:null};this.getSelectionViews=g;this.removeSelectionView=function(f){l.hasOwnProperty(f)&&(l[f].destroy(function(){}),delete l[f])};this.hideSelectionView=function(f){l.hasOwnProperty(f)&&l[f].hide()};this.showSelectionView=function(f){l.hasOwnProperty(f)&&l[f].show()};this.rerenderSelectionViews=function(){Object.keys(l).forEach(function(f){l[f].visible()&&
l[f].rerender()})};this.registerCursor=function(f,g){var r=f.getMemberId(),n=new gui.SelectionView(f);g?n.show():n.hide();return l[r]=n};this.destroy=function(f){var l=g();(function n(g,d){d?f(d):g<l.length?l[g].destroy(function(d){n(g+1,d)}):f()})(0,void 0)}};
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
runtime.loadClass("core.DomUtils");runtime.loadClass("gui.UndoManager");runtime.loadClass("gui.UndoStateRules");
gui.TrivialUndoManager=function(g){function l(){t.emit(gui.UndoManager.signalUndoStackChanged,{undoAvailable:h.hasUndoStates(),redoAvailable:h.hasRedoStates()})}function f(){b!==c&&b!==q[q.length-1]&&q.push(b)}function p(a){var b=a.previousSibling||a.nextSibling;a.parentNode.removeChild(a);d.normalizeTextNodes(b)}function r(a){return Object.keys(a).map(function(b){return a[b]})}function n(b){function c(a){var b=a.spec();if(f[b.memberid])switch(b.optype){case "AddCursor":d[b.memberid]||(d[b.memberid]=
a,delete f[b.memberid],g-=1);break;case "MoveCursor":e[b.memberid]||(e[b.memberid]=a)}}var d={},e={},f={},g,h=b.pop();a.getCursors().forEach(function(a){f[a.getMemberId()]=!0});for(g=Object.keys(f).length;h&&0<g;)h.reverse(),h.forEach(c),h=b.pop();return r(d).concat(r(e))}var h=this,d=new core.DomUtils,m,c=[],e,a,b=[],q=[],k=[],t=new core.EventNotifier([gui.UndoManager.signalUndoStackChanged,gui.UndoManager.signalUndoStateCreated,gui.UndoManager.signalUndoStateModified,gui.TrivialUndoManager.signalDocumentRootReplaced]),
A=g||new gui.UndoStateRules;this.subscribe=function(a,b){t.subscribe(a,b)};this.unsubscribe=function(a,b){t.unsubscribe(a,b)};this.hasUndoStates=function(){return 0<q.length};this.hasRedoStates=function(){return 0<k.length};this.setOdtDocument=function(b){a=b};this.resetInitialState=function(){q.length=0;k.length=0;c.length=0;b.length=0;m=null;l()};this.saveInitialState=function(){var e=a.getOdfCanvas().odfContainer(),g=a.getOdfCanvas().getAnnotationViewManager();g&&g.forgetAnnotations();m=e.rootElement.cloneNode(!0);
a.getOdfCanvas().refreshAnnotations();e=m;d.getElementsByTagNameNS(e,"urn:webodf:names:cursor","cursor").forEach(p);d.getElementsByTagNameNS(e,"urn:webodf:names:cursor","anchor").forEach(p);f();q.unshift(c);b=c=n(q);q.length=0;k.length=0;l()};this.setPlaybackFunction=function(a){e=a};this.onOperationExecuted=function(a){k.length=0;A.isEditOperation(a)&&b===c||!A.isPartOfOperationSet(a,b)?(f(),b=[a],q.push(b),t.emit(gui.UndoManager.signalUndoStateCreated,{operations:b}),l()):(b.push(a),t.emit(gui.UndoManager.signalUndoStateModified,
{operations:b}))};this.moveForward=function(a){for(var c=0,d;a&&k.length;)d=k.pop(),q.push(d),d.forEach(e),a-=1,c+=1;c&&(b=q[q.length-1],l());return c};this.moveBackward=function(d){for(var f=a.getOdfCanvas(),g=f.odfContainer(),h=0;d&&q.length;)k.push(q.pop()),d-=1,h+=1;h&&(g.setRootElement(m.cloneNode(!0)),f.setOdfContainer(g,!0),t.emit(gui.TrivialUndoManager.signalDocumentRootReplaced,{}),a.getCursors().forEach(function(b){a.removeCursor(b.getMemberId())}),c.forEach(e),q.forEach(function(a){a.forEach(e)}),
f.refreshCSS(),b=q[q.length-1]||c,l());return h}};gui.TrivialUndoManager.signalDocumentRootReplaced="documentRootReplaced";(function(){return gui.TrivialUndoManager})();
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
runtime.loadClass("ops.TrivialOperationRouter");runtime.loadClass("ops.OperationFactory");runtime.loadClass("ops.OdtDocument");
ops.Session=function(g){var l=new ops.OperationFactory,f=new ops.OdtDocument(g),p=null;this.setOperationFactory=function(f){l=f;p&&p.setOperationFactory(l)};this.setOperationRouter=function(g){p=g;g.setPlaybackFunction(function(g){return g.execute(f)?(f.emit(ops.OdtDocument.signalOperationExecuted,g),!0):!1});g.setOperationFactory(l)};this.getOperationFactory=function(){return l};this.getOdtDocument=function(){return f};this.enqueue=function(f){p.push(f)};this.close=function(g){p.close(function(l){l?
g(l):f.close(g)})};this.destroy=function(g){f.destroy(g)};this.setOperationRouter(new ops.TrivialOperationRouter)};
// Input 92
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
gui.AnnotationController=function(g,l){function f(){var e=h.getCursor(l),e=e&&e.getNode(),a=!1;if(e){a:{for(a=h.getRootNode();e&&e!==a;){if(e.namespaceURI===c&&"annotation"===e.localName){e=!0;break a}e=e.parentNode}e=!1}a=!e}a!==d&&(d=a,m.emit(gui.AnnotationController.annotatableChanged,d))}function p(c){c.getMemberId()===l&&f()}function r(c){c===l&&f()}function n(c){c.getMemberId()===l&&f()}var h=g.getOdtDocument(),d=!1,m=new core.EventNotifier([gui.AnnotationController.annotatableChanged]),c=odf.Namespaces.officens;
this.isAnnotatable=function(){return d};this.addAnnotation=function(){var c=new ops.OpAddAnnotation,a=h.getCursorSelection(l),b=a.length,a=a.position;d&&(a=0<=b?a:a+b,b=Math.abs(b),c.init({memberid:l,position:a,length:b,name:l+Date.now()}),g.enqueue([c]))};this.removeAnnotation=function(c){var a,b;a=h.convertDomPointToCursorStep(c,0)+1;b=h.convertDomPointToCursorStep(c,c.childNodes.length);c=new ops.OpRemoveAnnotation;c.init({memberid:l,position:a,length:b-a});b=new ops.OpMoveCursor;b.init({memberid:l,
position:0<a?a-1:a,length:0});g.enqueue([c,b])};this.subscribe=function(c,a){m.subscribe(c,a)};this.unsubscribe=function(c,a){m.unsubscribe(c,a)};this.destroy=function(c){h.unsubscribe(ops.OdtDocument.signalCursorAdded,p);h.unsubscribe(ops.OdtDocument.signalCursorRemoved,r);h.unsubscribe(ops.OdtDocument.signalCursorMoved,n);c()};h.subscribe(ops.OdtDocument.signalCursorAdded,p);h.subscribe(ops.OdtDocument.signalCursorRemoved,r);h.subscribe(ops.OdtDocument.signalCursorMoved,n);f()};
gui.AnnotationController.annotatableChanged="annotatable/changed";(function(){return gui.AnnotationController})();
// Input 93
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
gui.DirectParagraphStyler=function(g,l,f){function p(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b=k.getCursor(l),b=b&&b.getSelectedRange(),c;v=a(v,b?w.isAlignedLeft(b):!1,"isAlignedLeft");u=a(u,b?w.isAlignedCenter(b):!1,"isAlignedCenter");s=a(s,b?w.isAlignedRight(b):!1,"isAlignedRight");H=a(H,b?w.isAlignedJustified(b):!1,"isAlignedJustified");c&&x.emit(gui.DirectParagraphStyler.paragraphStylingChanged,c)}function r(a){a.getMemberId()===l&&p()}function n(a){a===l&&p()}function h(a){a.getMemberId()===
l&&p()}function d(){p()}function m(a){var b=k.getCursor(l);b&&k.getParagraphElement(b.getNode())===a.paragraphElement&&p()}function c(a){return a===ops.StepsTranslator.NEXT_STEP}function e(a){var b=k.getCursor(l).getSelectedRange(),b=A.getParagraphElements(b),d=k.getFormatting();b.forEach(function(b){var e=k.convertDomPointToCursorStep(b,0,c),h=b.getAttributeNS(odf.Namespaces.textns,"style-name");b=f.generateStyleName();var m;h&&(m=d.createDerivedStyleObject(h,"paragraph",{}));m=a(m||{});h=new ops.OpAddStyle;
h.init({memberid:l,styleName:b,styleFamily:"paragraph",isAutomaticStyle:!0,setProperties:m});m=new ops.OpSetParagraphStyle;m.init({memberid:l,styleName:b,position:e});g.enqueue([h,m])})}function a(a){e(function(b){return t.mergeObjects(b,a)})}function b(b){a({"style:paragraph-properties":{"fo:text-align":b}})}function q(a,b){var c=k.getFormatting().getDefaultTabStopDistance(),d=b["style:paragraph-properties"],d=(d=d&&d["fo:margin-left"])&&A.parseLength(d);return t.mergeObjects(b,{"style:paragraph-properties":{"fo:margin-left":d&&
d.unit===c.unit?d.value+a*c.value+d.unit:a*c.value+c.unit}})}var k=g.getOdtDocument(),t=new core.Utils,A=new odf.OdfUtils,w=new gui.StyleHelper(k.getFormatting()),x=new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]),v,u,s,H;this.isAlignedLeft=function(){return v};this.isAlignedCenter=function(){return u};this.isAlignedRight=function(){return s};this.isAlignedJustified=function(){return H};this.alignParagraphLeft=function(){b("left");return!0};this.alignParagraphCenter=function(){b("center");
return!0};this.alignParagraphRight=function(){b("right");return!0};this.alignParagraphJustified=function(){b("justify");return!0};this.indent=function(){e(q.bind(null,1));return!0};this.outdent=function(){e(q.bind(null,-1));return!0};this.subscribe=function(a,b){x.subscribe(a,b)};this.unsubscribe=function(a,b){x.unsubscribe(a,b)};this.destroy=function(a){k.unsubscribe(ops.OdtDocument.signalCursorAdded,r);k.unsubscribe(ops.OdtDocument.signalCursorRemoved,n);k.unsubscribe(ops.OdtDocument.signalCursorMoved,
h);k.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,d);k.unsubscribe(ops.OdtDocument.signalParagraphChanged,m);a()};k.subscribe(ops.OdtDocument.signalCursorAdded,r);k.subscribe(ops.OdtDocument.signalCursorRemoved,n);k.subscribe(ops.OdtDocument.signalCursorMoved,h);k.subscribe(ops.OdtDocument.signalParagraphStyleModified,d);k.subscribe(ops.OdtDocument.signalParagraphChanged,m);p()};gui.DirectParagraphStyler.paragraphStylingChanged="paragraphStyling/changed";(function(){return gui.DirectParagraphStyler})();
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
runtime.loadClass("core.EventNotifier");runtime.loadClass("core.Utils");runtime.loadClass("ops.OpApplyDirectStyling");runtime.loadClass("gui.StyleHelper");
gui.DirectTextStyler=function(g,l){function f(a,b){for(var c=0,d=b[c];d&&a;)a=a[d],c+=1,d=b[c];return b.length===c?a:void 0}function p(a,b){var c=f(a[0],b);return a.every(function(a){return c===f(a,b)})?c:void 0}function r(){var a=u.getCursor(l),a=(a=a&&a.getSelectedRange())&&s.getAppliedStyles(a)||[];a[0]&&y&&(a[0]=v.mergeObjects(a[0],y));return a}function n(){function a(b,d,e){b!==d&&(void 0===c&&(c={}),c[e]=d);return d}var b,c;B=r();L=a(L,B?s.isBold(B):!1,"isBold");I=a(I,B?s.isItalic(B):!1,"isItalic");
W=a(W,B?s.hasUnderline(B):!1,"hasUnderline");Q=a(Q,B?s.hasStrikeThrough(B):!1,"hasStrikeThrough");b=B&&p(B,["style:text-properties","fo:font-size"]);z=a(z,b&&parseFloat(b),"fontSize");ja=a(ja,B&&p(B,["style:text-properties","style:font-name"]),"fontName");c&&H.emit(gui.DirectTextStyler.textStylingChanged,c)}function h(a){a.getMemberId()===l&&n()}function d(a){a===l&&n()}function m(a){a.getMemberId()===l&&n()}function c(){n()}function e(a){var b=u.getCursor(l);b&&u.getParagraphElement(b.getNode())===
a.paragraphElement&&n()}function a(a,b){var c=u.getCursor(l);if(!c)return!1;c=s.getAppliedStyles(c.getSelectedRange());b(!a(c));return!0}function b(a){var b=u.getCursorSelection(l),c={"style:text-properties":a};0!==b.length?(a=new ops.OpApplyDirectStyling,a.init({memberid:l,position:b.position,length:b.length,setProperties:c}),g.enqueue([a])):(y=v.mergeObjects(y||{},c),n())}function q(a,c){var d={};d[a]=c;b(d)}function k(a){a=a.spec();y&&a.memberid===l&&"SplitParagraph"!==a.optype&&(y=null,n())}function t(a){q("fo:font-weight",
a?"bold":"normal")}function A(a){q("fo:font-style",a?"italic":"normal")}function w(a){q("style:text-underline-style",a?"solid":"none")}function x(a){q("style:text-line-through-style",a?"solid":"none")}var v=new core.Utils,u=g.getOdtDocument(),s=new gui.StyleHelper(u.getFormatting()),H=new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]),y,B=[],L=!1,I=!1,W=!1,Q=!1,z,ja;this.formatTextSelection=b;this.createCursorStyleOp=function(a,b){var c=null;y&&(c=new ops.OpApplyDirectStyling,c.init({memberid:l,
position:a,length:b,setProperties:y}),y=null,n());return c};this.setBold=t;this.setItalic=A;this.setHasUnderline=w;this.setHasStrikethrough=x;this.setFontSize=function(a){q("fo:font-size",a+"pt")};this.setFontName=function(a){q("style:font-name",a)};this.getAppliedStyles=function(){return B};this.toggleBold=a.bind(this,s.isBold,t);this.toggleItalic=a.bind(this,s.isItalic,A);this.toggleUnderline=a.bind(this,s.hasUnderline,w);this.toggleStrikethrough=a.bind(this,s.hasStrikeThrough,x);this.isBold=function(){return L};
this.isItalic=function(){return I};this.hasUnderline=function(){return W};this.hasStrikeThrough=function(){return Q};this.fontSize=function(){return z};this.fontName=function(){return ja};this.subscribe=function(a,b){H.subscribe(a,b)};this.unsubscribe=function(a,b){H.unsubscribe(a,b)};this.destroy=function(a){u.unsubscribe(ops.OdtDocument.signalCursorAdded,h);u.unsubscribe(ops.OdtDocument.signalCursorRemoved,d);u.unsubscribe(ops.OdtDocument.signalCursorMoved,m);u.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,
c);u.unsubscribe(ops.OdtDocument.signalParagraphChanged,e);u.unsubscribe(ops.OdtDocument.signalOperationExecuted,k);a()};u.subscribe(ops.OdtDocument.signalCursorAdded,h);u.subscribe(ops.OdtDocument.signalCursorRemoved,d);u.subscribe(ops.OdtDocument.signalCursorMoved,m);u.subscribe(ops.OdtDocument.signalParagraphStyleModified,c);u.subscribe(ops.OdtDocument.signalParagraphChanged,e);u.subscribe(ops.OdtDocument.signalOperationExecuted,k);n()};gui.DirectTextStyler.textStylingChanged="textStyling/changed";
(function(){return gui.DirectTextStyler})();
// Input 95
runtime.loadClass("odf.Namespaces");runtime.loadClass("odf.ObjectNameGenerator");
gui.ImageManager=function(g,l,f){var p={"image/gif":".gif","image/jpeg":".jpg","image/png":".png"},r=odf.Namespaces.textns,n=g.getOdtDocument(),h=n.getFormatting(),d={};this.insertImage=function(m,c,e,a){var b;runtime.assert(0<e&&0<a,"Both width and height of the image should be greater than 0px.");b=n.getParagraphElement(n.getCursor(l).getNode()).getAttributeNS(r,"style-name");d.hasOwnProperty(b)||(d[b]=h.getContentSize(b,"paragraph"));b=d[b];e*=0.0264583333333334;a*=0.0264583333333334;var q=1,k=
1;e>b.width&&(q=b.width/e);a>b.height&&(k=b.height/a);q=Math.min(q,k);b=e*q;e=a*q;k=n.getOdfCanvas().odfContainer().rootElement.styles;a=m.toLowerCase();var q=p.hasOwnProperty(a)?p[a]:null,t;a=[];runtime.assert(null!==q,"Image type is not supported: "+m);q="Pictures/"+f.generateImageName()+q;t=new ops.OpSetBlob;t.init({memberid:l,filename:q,mimetype:m,content:c});a.push(t);h.getStyleElement("Graphics","graphic",[k])||(m=new ops.OpAddStyle,m.init({memberid:l,styleName:"Graphics",styleFamily:"graphic",
isAutomaticStyle:!1,setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph","svg:x":"0cm","svg:y":"0cm","style:wrap":"dynamic","style:number-wrapped-paragraphs":"no-limit","style:wrap-contour":"false","style:vertical-pos":"top","style:vertical-rel":"paragraph","style:horizontal-pos":"center","style:horizontal-rel":"paragraph"}}}),a.push(m));m=f.generateStyleName();c=new ops.OpAddStyle;c.init({memberid:l,styleName:m,styleFamily:"graphic",isAutomaticStyle:!0,setProperties:{"style:parent-style-name":"Graphics",
"style:graphic-properties":{"style:vertical-pos":"top","style:vertical-rel":"baseline","style:horizontal-pos":"center","style:horizontal-rel":"paragraph","fo:background-color":"transparent","style:background-transparency":"100%","style:shadow":"none","style:mirror":"none","fo:clip":"rect(0cm, 0cm, 0cm, 0cm)","draw:luminance":"0%","draw:contrast":"0%","draw:red":"0%","draw:green":"0%","draw:blue":"0%","draw:gamma":"100%","draw:color-inversion":"false","draw:image-opacity":"100%","draw:color-mode":"standard"}}});
a.push(c);t=new ops.OpInsertImage;t.init({memberid:l,position:n.getCursorPosition(l),filename:q,frameWidth:b+"cm",frameHeight:e+"cm",frameStyleName:m,frameName:f.generateFrameName()});a.push(t);g.enqueue(a)}};
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
runtime.loadClass("core.PositionFilter");
gui.TextManipulator=function(g,l,f){function p(d){var c=new ops.OpRemoveText;c.init({memberid:l,position:d.position,length:d.length});return c}function r(d){0>d.length&&(d.position+=d.length,d.length=-d.length);return d}function n(f,c){var e=new core.PositionFilterChain,a=gui.SelectionMover.createPositionIterator(h.getRootElement(f)),b=c?a.nextPosition:a.previousPosition;e.addFilter("BaseFilter",h.getPositionFilter());e.addFilter("RootFilter",h.createRootFilter(l));for(a.setUnfilteredPosition(f,0);b();)if(e.acceptPosition(a)===
d)return!0;return!1}var h=g.getOdtDocument(),d=core.PositionFilter.FilterResult.FILTER_ACCEPT;this.enqueueParagraphSplittingOps=function(){var d=r(h.getCursorSelection(l)),c,e=[];0<d.length&&(c=p(d),e.push(c));c=new ops.OpSplitParagraph;c.init({memberid:l,position:d.position,moveCursor:!0});e.push(c);g.enqueue(e);return!0};this.removeTextByBackspaceKey=function(){var d=h.getCursor(l),c=r(h.getCursorSelection(l)),e=null;0===c.length?n(d.getNode(),!1)&&(e=new ops.OpRemoveText,e.init({memberid:l,position:c.position-
1,length:1}),g.enqueue([e])):(e=p(c),g.enqueue([e]));return null!==e};this.removeTextByDeleteKey=function(){var d=h.getCursor(l),c=r(h.getCursorSelection(l)),e=null;0===c.length?n(d.getNode(),!0)&&(e=new ops.OpRemoveText,e.init({memberid:l,position:c.position,length:1}),g.enqueue([e])):(e=p(c),g.enqueue([e]));return null!==e};this.removeCurrentSelection=function(){var d=r(h.getCursorSelection(l));0!==d.length&&(d=p(d),g.enqueue([d]));return!0};this.insertText=function(d){var c=r(h.getCursorSelection(l)),
e,a=[];0<c.length&&(e=p(c),a.push(e));e=new ops.OpInsertText;e.init({memberid:l,position:c.position,text:d,moveCursor:!0});a.push(e);f&&(d=f(c.position,d.length))&&a.push(d);g.enqueue(a)}};(function(){return gui.TextManipulator})();
// Input 97
runtime.loadClass("core.DomUtils");runtime.loadClass("core.Async");runtime.loadClass("core.ScheduledTask");runtime.loadClass("odf.OdfUtils");runtime.loadClass("odf.ObjectNameGenerator");runtime.loadClass("ops.OdtCursor");runtime.loadClass("ops.OpAddCursor");runtime.loadClass("ops.OpRemoveCursor");runtime.loadClass("gui.Clipboard");runtime.loadClass("gui.DirectTextStyler");runtime.loadClass("gui.DirectParagraphStyler");runtime.loadClass("gui.KeyboardHandler");runtime.loadClass("gui.ImageManager");
runtime.loadClass("gui.ImageSelector");runtime.loadClass("gui.TextManipulator");runtime.loadClass("gui.AnnotationController");runtime.loadClass("gui.EventManager");runtime.loadClass("gui.PlainTextPasteboard");
gui.SessionController=function(){var g=core.PositionFilter.FilterResult.FILTER_ACCEPT;gui.SessionController=function(l,f,p,r){function n(a){a.preventDefault?a.preventDefault():a.returnValue=!1}function h(a,b,c){var d=new ops.OpMoveCursor;d.init({memberid:f,position:a,length:b||0,selectionType:c});return d}function d(a){var b=/[A-Za-z0-9]/,c=gui.SelectionMover.createPositionIterator(D.getRootNode()),d;for(c.setUnfilteredPosition(a.startContainer,a.startOffset);c.previousPosition();){d=c.getCurrentNode();
if(d.nodeType===Node.TEXT_NODE){if(d=d.data[c.unfilteredDomOffset()],!b.test(d))break}else if(!ia.isTextSpan(d))break;a.setStart(c.container(),c.unfilteredDomOffset())}c.setUnfilteredPosition(a.endContainer,a.endOffset);do if(d=c.getCurrentNode(),d.nodeType===Node.TEXT_NODE){if(d=d.data[c.unfilteredDomOffset()],!b.test(d))break}else if(!ia.isTextSpan(d))break;while(c.nextPosition());a.setEnd(c.container(),c.unfilteredDomOffset())}function m(a){var b=D.getParagraphElement(a.startContainer),c=D.getParagraphElement(a.endContainer);
b&&a.setStart(b,0);c&&(ia.isParagraph(a.endContainer)&&0===a.endOffset?a.setEndBefore(c):a.setEnd(c,c.childNodes.length))}function c(a){a=D.getDistanceFromCursor(f,a,0);var b=null!==a?a+1:null,c;if(b||a)c=D.getCursorPosition(f),a=h(c+a,b-a,ops.OdtCursor.RegionSelection),l.enqueue([a]);K.focus()}function e(a){var b=0<=ha.comparePoints(a.anchorNode,a.anchorOffset,a.focusNode,a.focusOffset),c=a.focusNode.ownerDocument.createRange();b?(c.setStart(a.anchorNode,a.anchorOffset),c.setEnd(a.focusNode,a.focusOffset)):
(c.setStart(a.focusNode,a.focusOffset),c.setEnd(a.anchorNode,a.anchorOffset));return{range:c,hasForwardSelection:b}}function a(a){return function(b){var c=a(b);return function(b,d){return a(d)===c}}}function b(b,c,e){var g=D.getOdfCanvas().getElement(),k;k=ha.containsNode(g,b.startContainer);g=ha.containsNode(g,b.endContainer);if(k||g)if(k&&g&&(2===e?d(b):3<=e&&m(b)),b=c?{anchorNode:b.startContainer,anchorOffset:b.startOffset,focusNode:b.endContainer,focusOffset:b.endOffset}:{anchorNode:b.endContainer,
anchorOffset:b.endOffset,focusNode:b.startContainer,focusOffset:b.startOffset},c=D.convertDomToCursorRange(b,a(ia.getParagraphElement)),b=D.getCursorSelection(f),c.position!==b.position||c.length!==b.length)b=h(c.position,c.length,ops.OdtCursor.RangeSelection),l.enqueue([b])}function q(a){var b=D.getCursorSelection(f),c=D.getCursor(f).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,sa,xa):-c.convertBackwardStepsBetweenFilters(-a,sa,xa),a=b.length+a,l.enqueue([h(b.position,a)]))}
function k(a){var b=D.getCursorPosition(f),c=D.getCursor(f).getStepCounter();0!==a&&(a=0<a?c.convertForwardStepsBetweenFilters(a,sa,xa):-c.convertBackwardStepsBetweenFilters(-a,sa,xa),l.enqueue([h(b+a,0)]))}function t(){k(-1);return!0}function A(){k(1);return!0}function w(){q(-1);return!0}function x(){q(1);return!0}function v(a,b){var c=D.getParagraphElement(D.getCursor(f).getNode());runtime.assert(Boolean(c),"SessionController: Cursor outside paragraph");c=D.getCursor(f).getStepCounter().countLinesSteps(a,
sa);b?q(c):k(c)}function u(){v(-1,!1);return!0}function s(){v(1,!1);return!0}function H(){v(-1,!0);return!0}function y(){v(1,!0);return!0}function B(a,b){var c=D.getCursor(f).getStepCounter().countStepsToLineBoundary(a,sa);b?q(c):k(c)}function L(){B(-1,!1);return!0}function I(){B(1,!1);return!0}function W(){B(-1,!0);return!0}function Q(){B(1,!0);return!0}function z(){var a=D.getParagraphElement(D.getCursor(f).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");
c=D.getDistanceFromCursor(f,a,0);b=gui.SelectionMover.createPositionIterator(D.getRootNode());for(b.setUnfilteredPosition(a,0);0===c&&b.previousPosition();)a=b.getCurrentNode(),ia.isParagraph(a)&&(c=D.getDistanceFromCursor(f,a,0));q(c);return!0}function ja(){var a=D.getParagraphElement(D.getCursor(f).getNode()),b,c;runtime.assert(Boolean(a),"SessionController: Cursor outside paragraph");b=gui.SelectionMover.createPositionIterator(D.getRootNode());b.moveToEndOfNode(a);for(c=D.getDistanceFromCursor(f,
b.container(),b.unfilteredDomOffset());0===c&&b.nextPosition();)a=b.getCurrentNode(),ia.isParagraph(a)&&(b.moveToEndOfNode(a),c=D.getDistanceFromCursor(f,b.container(),b.unfilteredDomOffset()));q(c);return!0}function ka(a,b){var c=gui.SelectionMover.createPositionIterator(D.getRootNode());0<a&&c.moveToEnd();c=D.getDistanceFromCursor(f,c.container(),c.unfilteredDomOffset());b?q(c):k(c)}function G(){ka(-1,!1);return!0}function Z(){ka(1,!1);return!0}function O(){ka(-1,!0);return!0}function aa(){ka(1,
!0);return!0}function J(){var a=D.getRootNode(),a=D.convertDomPointToCursorStep(a,a.childNodes.length);l.enqueue([h(0,a)]);return!0}function F(){var a=D.getCursor(f);if(a&&a.getSelectionType()===ops.OdtCursor.RegionSelection&&(a=ia.getImageElements(a.getSelectedRange())[0])){ya.select(a.parentNode);return}ya.clearSelection()}function C(a){var b=D.getCursor(f).getSelectedRange();b.collapsed?a.preventDefault():Da.setDataFromRange(a,b)?oa.removeCurrentSelection():runtime.log("Cut operation failed")}
function Y(){return!1!==D.getCursor(f).getSelectedRange().collapsed}function U(a){var b=D.getCursor(f).getSelectedRange();b.collapsed?a.preventDefault():Da.setDataFromRange(a,b)||runtime.log("Copy operation failed")}function R(a){var b;fa.clipboardData&&fa.clipboardData.getData?b=fa.clipboardData.getData("Text"):a.clipboardData&&a.clipboardData.getData&&(b=a.clipboardData.getData("text/plain"));b&&(oa.removeCurrentSelection(),l.enqueue(Fa.createPasteOps(b)));a.preventDefault?a.preventDefault():a.returnValue=
!1}function P(){return!1}function M(a){if(V)V.onOperationExecuted(a)}function ba(a){D.emit(ops.OdtDocument.signalUndoStackChanged,a)}function la(){return V?(V.moveBackward(1),va.trigger(),!0):!1}function ca(){return V?(V.moveForward(1),va.trigger(),!0):!1}function ma(){var a=fa.getSelection(),b=0<a.rangeCount&&e(a);ra&&b&&(ta=!0,ya.clearSelection(),Ea.setUnfilteredPosition(a.focusNode,a.focusOffset),Ba.acceptPosition(Ea)===g&&(2===wa?d(b.range):3<=wa&&m(b.range),p.setSelectedRange(b.range,b.hasForwardSelection),
D.emit(ops.OdtDocument.signalCursorMoved,p)))}function T(a){var b=a.target||a.srcElement,c=D.getCursor(f);if(ra=b&&ha.containsNode(D.getOdfCanvas().getElement(),b))ta=!1,Ba=D.createRootFilter(b),wa=a.detail,c&&a.shiftKey?fa.getSelection().collapse(c.getAnchorNode(),0):(a=fa.getSelection(),b=c.getSelectedRange(),a.extend?c.hasForwardSelection()?(a.collapse(b.startContainer,b.startOffset),a.extend(b.endContainer,b.endOffset)):(a.collapse(b.endContainer,b.endOffset),a.extend(b.startContainer,b.startOffset)):
(a.removeAllRanges(),a.addRange(b.cloneRange()),D.getOdfCanvas().getElement().setActive())),1<wa&&ma()}function $(a){var d=a.target||a.srcElement,f=a.detail,g=a.clientX,h=a.clientY;za.processRequests();ia.isImage(d)&&ia.isCharacterFrame(d.parentNode)?(c(d.parentNode),K.focus()):ra&&!ya.isSelectorElement(d)&&(ta?(b(p.getSelectedRange(),p.hasForwardSelection(),a.detail),K.focus()):runtime.setTimeout(function(){var a;a=(a=fa.getSelection())?{anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,
focusOffset:a.focusOffset}:null;var c;if(!a.anchorNode&&!a.focusNode){var d=D.getDOM();c=null;d.caretRangeFromPoint?(d=d.caretRangeFromPoint(g,h),c={container:d.startContainer,offset:d.startOffset}):d.caretPositionFromPoint&&(d=d.caretPositionFromPoint(g,h))&&d.offsetNode&&(c={container:d.offsetNode,offset:d.offset});c&&(a.anchorNode=c.container,a.anchorOffset=c.offset,a.focusNode=a.anchorNode,a.focusOffset=a.anchorOffset)}a.anchorNode&&a.focusNode&&(a=e(a),b(a.range,a.hasForwardSelection,f));K.focus()},
0));wa=0;ta=ra=!1}function X(){ra&&K.focus();wa=0;ta=ra=!1}function da(a){$(a)}function S(a){var b=a.target||a.srcElement,c=null;"annotationRemoveButton"===b.className?(c=ha.getElementsByTagNameNS(b.parentNode,odf.Namespaces.officens,"annotation")[0],ua.removeAnnotation(c)):$(a)}function ga(a){return function(){a();return!0}}function E(a){return function(b){return D.getCursor(f).getSelectionType()===ops.OdtCursor.RangeSelection?a(b):!0}}var fa=runtime.getWindow(),D=l.getOdtDocument(),pa=new core.Async,
ha=new core.DomUtils,ia=new odf.OdfUtils,Da=new gui.Clipboard,N=new gui.KeyboardHandler,qa=new gui.KeyboardHandler,sa=new core.PositionFilterChain,xa=D.getPositionFilter(),ra=!1,Aa=new odf.ObjectNameGenerator(D.getOdfCanvas().odfContainer(),f),ta=!1,Ba=null,V=null,K=new gui.EventManager(D),ua=new gui.AnnotationController(l,f),na=new gui.DirectTextStyler(l,f),ea=r&&r.directParagraphStylingEnabled?new gui.DirectParagraphStyler(l,f,Aa):null,oa=new gui.TextManipulator(l,f,na.createCursorStyleOp),Ca=new gui.ImageManager(l,
f,Aa),ya=new gui.ImageSelector(D.getOdfCanvas()),Ea=gui.SelectionMover.createPositionIterator(D.getRootNode()),za,va,Fa=new gui.PlainTextPasteboard(D,f),wa=0;runtime.assert(null!==fa,"Expected to be run in an environment which has a global window, like a browser.");sa.addFilter("BaseFilter",xa);sa.addFilter("RootFilter",D.createRootFilter(f));this.selectRange=b;this.moveCursorToLeft=t;this.moveCursorToDocumentBoundary=ka;this.extendSelectionToEntireDocument=J;this.startEditing=function(){var a;D.getOdfCanvas().getElement().classList.add("virtualSelections");
K.subscribe("keydown",N.handleEvent);K.subscribe("keypress",qa.handleEvent);K.subscribe("keyup",n);K.subscribe("beforecut",Y);K.subscribe("cut",C);K.subscribe("copy",U);K.subscribe("beforepaste",P);K.subscribe("paste",R);K.subscribe("mousedown",T);K.subscribe("mousemove",za.trigger);K.subscribe("mouseup",S);K.subscribe("contextmenu",da);K.subscribe("dragend",X);D.subscribe(ops.OdtDocument.signalOperationExecuted,va.trigger);D.subscribe(ops.OdtDocument.signalOperationExecuted,M);a=new ops.OpAddCursor;
a.init({memberid:f});l.enqueue([a]);V&&V.saveInitialState()};this.endEditing=function(){var a;a=new ops.OpRemoveCursor;a.init({memberid:f});l.enqueue([a]);V&&V.resetInitialState();D.unsubscribe(ops.OdtDocument.signalOperationExecuted,M);D.unsubscribe(ops.OdtDocument.signalOperationExecuted,va.trigger);K.unsubscribe("keydown",N.handleEvent);K.unsubscribe("keypress",qa.handleEvent);K.unsubscribe("keyup",n);K.unsubscribe("cut",C);K.unsubscribe("beforecut",Y);K.unsubscribe("copy",U);K.unsubscribe("paste",
R);K.unsubscribe("beforepaste",P);K.unsubscribe("mousemove",za.trigger);K.unsubscribe("mousedown",T);K.unsubscribe("mouseup",S);K.unsubscribe("contextmenu",da);K.unsubscribe("dragend",X);D.getOdfCanvas().getElement().classList.remove("virtualSelections")};this.getInputMemberId=function(){return f};this.getSession=function(){return l};this.setUndoManager=function(a){V&&V.unsubscribe(gui.UndoManager.signalUndoStackChanged,ba);if(V=a)V.setOdtDocument(D),V.setPlaybackFunction(function(a){a.execute(D)}),
V.subscribe(gui.UndoManager.signalUndoStackChanged,ba)};this.getUndoManager=function(){return V};this.getAnnotationController=function(){return ua};this.getDirectTextStyler=function(){return na};this.getDirectParagraphStyler=function(){return ea};this.getImageManager=function(){return Ca};this.getTextManipulator=function(){return oa};this.getEventManager=function(){return K};this.getKeyboardHandlers=function(){return{keydown:N,keypress:qa}};this.destroy=function(a){var b=[za.destroy,na.destroy];ea&&
b.push(ea.destroy);pa.destroyAll(b,a)};(function(){var a=-1!==fa.navigator.appVersion.toLowerCase().indexOf("mac"),b=gui.KeyboardHandler.Modifier,c=gui.KeyboardHandler.KeyCode;za=new core.ScheduledTask(ma,0);va=new core.ScheduledTask(F,0);N.bind(c.Tab,b.None,E(function(){oa.insertText("\t");return!0}));N.bind(c.Left,b.None,E(t));N.bind(c.Right,b.None,E(A));N.bind(c.Up,b.None,E(u));N.bind(c.Down,b.None,E(s));N.bind(c.Backspace,b.None,ga(oa.removeTextByBackspaceKey));N.bind(c.Delete,b.None,oa.removeTextByDeleteKey);
N.bind(c.Left,b.Shift,E(w));N.bind(c.Right,b.Shift,E(x));N.bind(c.Up,b.Shift,E(H));N.bind(c.Down,b.Shift,E(y));N.bind(c.Home,b.None,E(L));N.bind(c.End,b.None,E(I));N.bind(c.Home,b.Ctrl,E(G));N.bind(c.End,b.Ctrl,E(Z));N.bind(c.Home,b.Shift,E(W));N.bind(c.End,b.Shift,E(Q));N.bind(c.Up,b.CtrlShift,E(z));N.bind(c.Down,b.CtrlShift,E(ja));N.bind(c.Home,b.CtrlShift,E(O));N.bind(c.End,b.CtrlShift,E(aa));a?(N.bind(c.Clear,b.None,oa.removeCurrentSelection),N.bind(c.Left,b.Meta,E(L)),N.bind(c.Right,b.Meta,E(I)),
N.bind(c.Home,b.Meta,E(G)),N.bind(c.End,b.Meta,E(Z)),N.bind(c.Left,b.MetaShift,E(W)),N.bind(c.Right,b.MetaShift,E(Q)),N.bind(c.Up,b.AltShift,E(z)),N.bind(c.Down,b.AltShift,E(ja)),N.bind(c.Up,b.MetaShift,E(O)),N.bind(c.Down,b.MetaShift,E(aa)),N.bind(c.A,b.Meta,E(J)),N.bind(c.B,b.Meta,E(na.toggleBold)),N.bind(c.I,b.Meta,E(na.toggleItalic)),N.bind(c.U,b.Meta,E(na.toggleUnderline)),ea&&(N.bind(c.L,b.MetaShift,E(ea.alignParagraphLeft)),N.bind(c.E,b.MetaShift,E(ea.alignParagraphCenter)),N.bind(c.R,b.MetaShift,
E(ea.alignParagraphRight)),N.bind(c.J,b.MetaShift,E(ea.alignParagraphJustified))),ua&&N.bind(c.C,b.MetaShift,ua.addAnnotation),N.bind(c.Z,b.Meta,la),N.bind(c.Z,b.MetaShift,ca)):(N.bind(c.A,b.Ctrl,E(J)),N.bind(c.B,b.Ctrl,E(na.toggleBold)),N.bind(c.I,b.Ctrl,E(na.toggleItalic)),N.bind(c.U,b.Ctrl,E(na.toggleUnderline)),ea&&(N.bind(c.L,b.CtrlShift,E(ea.alignParagraphLeft)),N.bind(c.E,b.CtrlShift,E(ea.alignParagraphCenter)),N.bind(c.R,b.CtrlShift,E(ea.alignParagraphRight)),N.bind(c.J,b.CtrlShift,E(ea.alignParagraphJustified))),
ua&&N.bind(c.C,b.CtrlAlt,ua.addAnnotation),N.bind(c.Z,b.Ctrl,la),N.bind(c.Z,b.CtrlShift,ca));qa.setDefault(E(function(a){var b;b=null===a.which||void 0===a.which?String.fromCharCode(a.keyCode):0!==a.which&&0!==a.charCode?String.fromCharCode(a.which):null;return!b||a.altKey||a.ctrlKey||a.metaKey?!1:(oa.insertText(b),!0)}));qa.bind(c.Enter,b.None,E(oa.enqueueParagraphSplittingOps))})()};return gui.SessionController}();
// Input 98
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
gui.CaretManager=function(g){function l(a){return b.hasOwnProperty(a)?b[a]:null}function f(){return Object.keys(b).map(function(a){return b[a]})}function p(a){a===g.getInputMemberId()&&g.getSession().getOdtDocument().getOdfCanvas().getElement().removeAttribute("tabindex");delete b[a]}function r(a){a=a.getMemberId();a===g.getInputMemberId()&&(a=l(a))&&a.refreshCursorBlinking()}function n(){var a=l(g.getInputMemberId());k=!1;a&&a.ensureVisible()}function h(){var a=l(g.getInputMemberId());a&&(a.handleUpdate(),
k||(k=!0,runtime.setTimeout(n,50)))}function d(a){a.memberId===g.getInputMemberId()&&h()}function m(){var a=l(g.getInputMemberId());a&&a.setFocus()}function c(){var a=l(g.getInputMemberId());a&&a.removeFocus()}function e(){var a=l(g.getInputMemberId());a&&a.show()}function a(){var a=l(g.getInputMemberId());a&&a.hide()}var b={},q=runtime.getWindow(),k=!1;this.registerCursor=function(a,c,d){var e=a.getMemberId();c=new gui.Caret(a,c,d);b[e]=c;e===g.getInputMemberId()?(runtime.log("Starting to track input on new cursor of "+
e),a.handleUpdate=h,g.getSession().getOdtDocument().getOdfCanvas().getElement().setAttribute("tabindex",-1),g.getEventManager().focus()):a.handleUpdate=c.handleUpdate;return c};this.getCaret=l;this.getCarets=f;this.destroy=function(h){var k=g.getSession().getOdtDocument(),l=g.getEventManager(),n=f();k.unsubscribe(ops.OdtDocument.signalParagraphChanged,d);k.unsubscribe(ops.OdtDocument.signalCursorMoved,r);k.unsubscribe(ops.OdtDocument.signalCursorRemoved,p);l.unsubscribe("focus",m);l.unsubscribe("blur",
c);q.removeEventListener("focus",e,!1);q.removeEventListener("blur",a,!1);(function u(a,b){b?h(b):a<n.length?n[a].destroy(function(b){u(a+1,b)}):h()})(0,void 0);b={}};(function(){var b=g.getSession().getOdtDocument(),f=g.getEventManager();b.subscribe(ops.OdtDocument.signalParagraphChanged,d);b.subscribe(ops.OdtDocument.signalCursorMoved,r);b.subscribe(ops.OdtDocument.signalCursorRemoved,p);f.subscribe("focus",m);f.subscribe("blur",c);q.addEventListener("focus",e,!1);q.addEventListener("blur",a,!1)})()};
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
runtime.loadClass("gui.Caret");runtime.loadClass("ops.EditInfo");runtime.loadClass("gui.EditInfoMarker");gui.SessionViewOptions=function(){this.caretBlinksOnRangeSelect=this.caretAvatarsInitiallyVisible=this.editInfoMarkersInitiallyVisible=!0};
gui.SessionView=function(){return function(g,l,f,p,r){function n(a,b,c){function d(b,c,e){c=b+'[editinfo|memberid="'+a+'"]'+e+c;a:{var f=t.firstChild;for(b=b+'[editinfo|memberid="'+a+'"]'+e+"{";f;){if(f.nodeType===Node.TEXT_NODE&&0===f.data.indexOf(b)){b=f;break a}f=f.nextSibling}b=null}b?b.data=c:t.appendChild(document.createTextNode(c))}d("div.editInfoMarker","{ background-color: "+c+"; }","");d("span.editInfoColor","{ background-color: "+c+"; }","");d("span.editInfoAuthor",'{ content: "'+b+'"; }',
":before");d("dc|creator","{ background-color: "+c+"; }","");d("div.selectionOverlay","{ background-color: "+c+";}","")}function h(a){var b,c;for(c in w)w.hasOwnProperty(c)&&(b=w[c],a?b.show():b.hide())}function d(a){p.getCarets().forEach(function(b){a?b.showHandle():b.hideHandle()})}function m(a){var b=a.getMemberId();a=a.getProperties();n(b,a.fullName,a.color);l===b&&n("","",a.color)}function c(a){var b=a.getMemberId(),c=f.getOdtDocument().getMember(b).getProperties();p.registerCursor(a,v,u);r.registerCursor(a,
!0);if(a=p.getCaret(b))a.setAvatarImageUrl(c.imageUrl),a.setColor(c.color);runtime.log("+++ View here +++ eagerly created an Caret for '"+b+"'! +++")}function e(a){a=a.getMemberId();var b=r.getSelectionView(l),c=r.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId),d=p.getCaret(l);a===l?(c.hide(),b&&b.show(),d&&d.show()):a===gui.ShadowCursor.ShadowCursorMemberId&&(c.show(),b&&b.hide(),d&&d.hide())}function a(a){r.removeSelectionView(a)}function b(a){var b=a.paragraphElement,c=a.memberId;a=a.timeStamp;
var d,e="",g=b.getElementsByTagNameNS(A,"editinfo")[0];g?(e=g.getAttributeNS(A,"id"),d=w[e]):(e=Math.random().toString(),d=new ops.EditInfo(b,f.getOdtDocument()),d=new gui.EditInfoMarker(d,x),g=b.getElementsByTagNameNS(A,"editinfo")[0],g.setAttributeNS(A,"id",e),w[e]=d);d.addEdit(c,new Date(a))}function q(){H=!0}function k(){s=runtime.getWindow().setInterval(function(){H&&(r.rerenderSelectionViews(),H=!1)},200)}var t,A="urn:webodf:names:editinfo",w={},x=void 0!==g.editInfoMarkersInitiallyVisible?
Boolean(g.editInfoMarkersInitiallyVisible):!0,v=void 0!==g.caretAvatarsInitiallyVisible?Boolean(g.caretAvatarsInitiallyVisible):!0,u=void 0!==g.caretBlinksOnRangeSelect?Boolean(g.caretBlinksOnRangeSelect):!0,s,H=!1;this.showEditInfoMarkers=function(){x||(x=!0,h(x))};this.hideEditInfoMarkers=function(){x&&(x=!1,h(x))};this.showCaretAvatars=function(){v||(v=!0,d(v))};this.hideCaretAvatars=function(){v&&(v=!1,d(v))};this.getSession=function(){return f};this.getCaret=function(a){return p.getCaret(a)};
this.destroy=function(d){var g=f.getOdtDocument(),h=Object.keys(w).map(function(a){return w[a]});g.unsubscribe(ops.OdtDocument.signalMemberAdded,m);g.unsubscribe(ops.OdtDocument.signalMemberUpdated,m);g.unsubscribe(ops.OdtDocument.signalCursorAdded,c);g.unsubscribe(ops.OdtDocument.signalCursorRemoved,a);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,b);g.unsubscribe(ops.OdtDocument.signalCursorMoved,e);g.unsubscribe(ops.OdtDocument.signalParagraphChanged,q);g.unsubscribe(ops.OdtDocument.signalTableAdded,
q);g.unsubscribe(ops.OdtDocument.signalParagraphStyleModified,q);runtime.getWindow().clearInterval(s);t.parentNode.removeChild(t);(function W(a,b){b?d(b):a<h.length?h[a].destroy(function(b){W(a+1,b)}):d()})(0,void 0)};(function(){var d=f.getOdtDocument(),g=document.getElementsByTagName("head")[0];d.subscribe(ops.OdtDocument.signalMemberAdded,m);d.subscribe(ops.OdtDocument.signalMemberUpdated,m);d.subscribe(ops.OdtDocument.signalCursorAdded,c);d.subscribe(ops.OdtDocument.signalCursorRemoved,a);d.subscribe(ops.OdtDocument.signalParagraphChanged,
b);d.subscribe(ops.OdtDocument.signalCursorMoved,e);k();d.subscribe(ops.OdtDocument.signalParagraphChanged,q);d.subscribe(ops.OdtDocument.signalTableAdded,q);d.subscribe(ops.OdtDocument.signalParagraphStyleModified,q);t=document.createElementNS(g.namespaceURI,"style");t.type="text/css";t.media="screen, print, handheld, projection";t.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));t.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));
g.appendChild(t)})()}}();
// Input 100
var webodf_css="@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let's not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\n.virtualSelections office|document *::selection {\n  background: transparent;\n}\n.virtualSelections office|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    z-index: 15;\n    opacity: 0.2;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n";
