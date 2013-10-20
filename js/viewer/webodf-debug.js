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
var core = {};
var gui = {};
var xmldom = {};
var odf = {};
var ops = {};
function Runtime() {
}
Runtime.ByteArray = function(size) {
};
Runtime.prototype.getVariable = function(name) {
};
Runtime.prototype.toJson = function(anything) {
};
Runtime.prototype.fromJson = function(jsonstr) {
};
Runtime.ByteArray.prototype.slice = function(start, end) {
};
Runtime.ByteArray.prototype.length = 0;
Runtime.prototype.byteArrayFromArray = function(array) {
};
Runtime.prototype.byteArrayFromString = function(string, encoding) {
};
Runtime.prototype.byteArrayToString = function(bytearray, encoding) {
};
Runtime.prototype.concatByteArrays = function(bytearray1, bytearray2) {
};
Runtime.prototype.read = function(path, offset, length, callback) {
};
Runtime.prototype.readFile = function(path, encoding, callback) {
};
Runtime.prototype.readFileSync = function(path, encoding) {
};
Runtime.prototype.loadXML = function(path, callback) {
};
Runtime.prototype.writeFile = function(path, data, callback) {
};
Runtime.prototype.isFile = function(path, callback) {
};
Runtime.prototype.getFileSize = function(path, callback) {
};
Runtime.prototype.deleteFile = function(path, callback) {
};
Runtime.prototype.log = function(msgOrCategory, msg) {
};
Runtime.prototype.setTimeout = function(callback, milliseconds) {
};
Runtime.prototype.libraryPaths = function() {
};
Runtime.prototype.type = function() {
};
Runtime.prototype.getDOMImplementation = function() {
};
Runtime.prototype.parseXML = function(xml) {
};
Runtime.prototype.getWindow = function() {
};
Runtime.prototype.assert = function(condition, message, callback) {
};
var IS_COMPILED_CODE = false;
Runtime.byteArrayToString = function(bytearray, encoding) {
  function byteArrayToString(bytearray) {
    var s = "", i, l = bytearray.length;
    for(i = 0;i < l;i += 1) {
      s += String.fromCharCode(bytearray[i] & 255)
    }
    return s
  }
  function utf8ByteArrayToString(bytearray) {
    var s = "", i, l = bytearray.length, c0, c1, c2;
    for(i = 0;i < l;i += 1) {
      c0 = bytearray[i];
      if(c0 < 128) {
        s += String.fromCharCode(c0)
      }else {
        i += 1;
        c1 = bytearray[i];
        if(c0 < 224) {
          s += String.fromCharCode((c0 & 31) << 6 | c1 & 63)
        }else {
          i += 1;
          c2 = bytearray[i];
          s += String.fromCharCode((c0 & 15) << 12 | (c1 & 63) << 6 | c2 & 63)
        }
      }
    }
    return s
  }
  var result;
  if(encoding === "utf8") {
    result = utf8ByteArrayToString(bytearray)
  }else {
    if(encoding !== "binary") {
      this.log("Unsupported encoding: " + encoding)
    }
    result = byteArrayToString(bytearray)
  }
  return result
};
Runtime.getVariable = function(name) {
  try {
    return eval(name)
  }catch(e) {
    return undefined
  }
};
Runtime.toJson = function(anything) {
  return JSON.stringify(anything)
};
Runtime.fromJson = function(jsonstr) {
  return JSON.parse(jsonstr)
};
Runtime.getFunctionName = function getFunctionName(f) {
  var m;
  if(f.name === undefined) {
    m = (new RegExp("function\\s+(\\w+)")).exec(f);
    return m && m[1]
  }
  return f.name
};
function BrowserRuntime(logoutput) {
  var self = this, cache = {}, useNativeArray = window.ArrayBuffer && window.Uint8Array;
  this.ByteArray = useNativeArray ? function ByteArray(size) {
    Uint8Array.prototype.slice = function(begin, end) {
      if(end === undefined) {
        if(begin === undefined) {
          begin = 0
        }
        end = this.length
      }
      var view = this.subarray(begin, end), array, i;
      end -= begin;
      array = new Uint8Array(new ArrayBuffer(end));
      for(i = 0;i < end;i += 1) {
        array[i] = view[i]
      }
      return array
    };
    return new Uint8Array(new ArrayBuffer(size))
  } : function ByteArray(size) {
    var a = [];
    a.length = size;
    return a
  };
  this.concatByteArrays = useNativeArray ? function(bytearray1, bytearray2) {
    var i, l1 = bytearray1.length, l2 = bytearray2.length, a = new this.ByteArray(l1 + l2);
    for(i = 0;i < l1;i += 1) {
      a[i] = bytearray1[i]
    }
    for(i = 0;i < l2;i += 1) {
      a[i + l1] = bytearray2[i]
    }
    return a
  } : function(bytearray1, bytearray2) {
    return bytearray1.concat(bytearray2)
  };
  function utf8ByteArrayFromString(string) {
    var l = string.length, bytearray, i, n, j = 0;
    for(i = 0;i < l;i += 1) {
      n = string.charCodeAt(i);
      j += 1 + (n > 128) + (n > 2048)
    }
    bytearray = new self.ByteArray(j);
    j = 0;
    for(i = 0;i < l;i += 1) {
      n = string.charCodeAt(i);
      if(n < 128) {
        bytearray[j] = n;
        j += 1
      }else {
        if(n < 2048) {
          bytearray[j] = 192 | n >>> 6;
          bytearray[j + 1] = 128 | n & 63;
          j += 2
        }else {
          bytearray[j] = 224 | n >>> 12 & 15;
          bytearray[j + 1] = 128 | n >>> 6 & 63;
          bytearray[j + 2] = 128 | n & 63;
          j += 3
        }
      }
    }
    return bytearray
  }
  function byteArrayFromString(string) {
    var l = string.length, a = new self.ByteArray(l), i;
    for(i = 0;i < l;i += 1) {
      a[i] = string.charCodeAt(i) & 255
    }
    return a
  }
  this.byteArrayFromArray = function(array) {
    return array.slice()
  };
  this.byteArrayFromString = function(string, encoding) {
    var result;
    if(encoding === "utf8") {
      result = utf8ByteArrayFromString(string)
    }else {
      if(encoding !== "binary") {
        self.log("unknown encoding: " + encoding)
      }
      result = byteArrayFromString(string)
    }
    return result
  };
  this.byteArrayToString = Runtime.byteArrayToString;
  this.getVariable = Runtime.getVariable;
  this.fromJson = Runtime.fromJson;
  this.toJson = Runtime.toJson;
  function log(msgOrCategory, msg) {
    var node, doc, category;
    if(msg !== undefined) {
      category = msgOrCategory
    }else {
      msg = msgOrCategory
    }
    if(logoutput) {
      doc = logoutput.ownerDocument;
      if(category) {
        node = doc.createElement("span");
        node.className = category;
        node.appendChild(doc.createTextNode(category));
        logoutput.appendChild(node);
        logoutput.appendChild(doc.createTextNode(" "))
      }
      node = doc.createElement("span");
      node.appendChild(doc.createTextNode(msg));
      logoutput.appendChild(node);
      logoutput.appendChild(doc.createElement("br"))
    }else {
      if(console) {
        console.log(msg)
      }
    }
    if(category === "alert") {
      alert(msg)
    }
  }
  function assert(condition, message, callback) {
    if(!condition) {
      log("alert", "ASSERTION FAILED:\n" + message);
      if(callback) {
        callback()
      }
      throw message;
    }
  }
  function readFile(path, encoding, callback) {
    if(cache.hasOwnProperty(path)) {
      callback(null, cache[path]);
      return
    }
    var xhr = new XMLHttpRequest;
    function handleResult() {
      var data;
      if(xhr.readyState === 4) {
        if(xhr.status === 0 && !xhr.responseText) {
          callback("File " + path + " is empty.")
        }else {
          if(xhr.status === 200 || xhr.status === 0) {
            if(encoding === "binary") {
              if(String(typeof VBArray) !== "undefined") {
                data = (new VBArray(xhr.responseBody)).toArray()
              }else {
                data = self.byteArrayFromString(xhr.responseText, "binary")
              }
            }else {
              data = xhr.responseText
            }
            cache[path] = data;
            callback(null, data)
          }else {
            callback(xhr.responseText || xhr.statusText)
          }
        }
      }
    }
    xhr.open("GET", path, true);
    xhr.onreadystatechange = handleResult;
    if(xhr.overrideMimeType) {
      if(encoding !== "binary") {
        xhr.overrideMimeType("text/plain; charset=" + encoding)
      }else {
        xhr.overrideMimeType("text/plain; charset=x-user-defined")
      }
    }
    try {
      xhr.send(null)
    }catch(e) {
      callback(e.message)
    }
  }
  function read(path, offset, length, callback) {
    if(cache.hasOwnProperty(path)) {
      callback(null, cache[path].slice(offset, offset + length));
      return
    }
    var xhr = new XMLHttpRequest;
    function handleResult() {
      var data;
      if(xhr.readyState === 4) {
        if(xhr.status === 0 && !xhr.responseText) {
          callback("File " + path + " is empty.")
        }else {
          if(xhr.status === 200 || xhr.status === 0) {
            if(String(typeof VBArray) !== "undefined") {
              data = (new VBArray(xhr.responseBody)).toArray()
            }else {
              data = self.byteArrayFromString(xhr.responseText, "binary")
            }
            cache[path] = data;
            callback(null, data.slice(offset, offset + length))
          }else {
            callback(xhr.responseText || xhr.statusText)
          }
        }
      }
    }
    xhr.open("GET", path, true);
    xhr.onreadystatechange = handleResult;
    if(xhr.overrideMimeType) {
      xhr.overrideMimeType("text/plain; charset=x-user-defined")
    }
    try {
      xhr.send(null)
    }catch(e) {
      callback(e.message)
    }
  }
  function readFileSync(path, encoding) {
    var xhr = new XMLHttpRequest, result;
    xhr.open("GET", path, false);
    if(xhr.overrideMimeType) {
      if(encoding !== "binary") {
        xhr.overrideMimeType("text/plain; charset=" + encoding)
      }else {
        xhr.overrideMimeType("text/plain; charset=x-user-defined")
      }
    }
    try {
      xhr.send(null);
      if(xhr.status === 200 || xhr.status === 0) {
        result = xhr.responseText
      }
    }catch(e) {
    }
    return result
  }
  function writeFile(path, data, callback) {
    cache[path] = data;
    var xhr = new XMLHttpRequest;
    function handleResult() {
      if(xhr.readyState === 4) {
        if(xhr.status === 0 && !xhr.responseText) {
          callback("File " + path + " is empty.")
        }else {
          if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 0) {
            callback(null)
          }else {
            callback("Status " + String(xhr.status) + ": " + xhr.responseText || xhr.statusText)
          }
        }
      }
    }
    xhr.open("PUT", path, true);
    xhr.onreadystatechange = handleResult;
    if(data.buffer && !xhr.sendAsBinary) {
      data = data.buffer
    }else {
      data = self.byteArrayToString(data, "binary")
    }
    try {
      if(xhr.sendAsBinary) {
        xhr.sendAsBinary(data)
      }else {
        xhr.send(data)
      }
    }catch(e) {
      self.log("HUH? " + e + " " + data);
      callback(e.message)
    }
  }
  function deleteFile(path, callback) {
    delete cache[path];
    var xhr = new XMLHttpRequest;
    xhr.open("DELETE", path, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status < 200 && xhr.status >= 300) {
          callback(xhr.responseText)
        }else {
          callback(null)
        }
      }
    };
    xhr.send(null)
  }
  function loadXML(path, callback) {
    var xhr = new XMLHttpRequest;
    function handleResult() {
      if(xhr.readyState === 4) {
        if(xhr.status === 0 && !xhr.responseText) {
          callback("File " + path + " is empty.")
        }else {
          if(xhr.status === 200 || xhr.status === 0) {
            callback(null, xhr.responseXML)
          }else {
            callback(xhr.responseText)
          }
        }
      }
    }
    xhr.open("GET", path, true);
    if(xhr.overrideMimeType) {
      xhr.overrideMimeType("text/xml")
    }
    xhr.onreadystatechange = handleResult;
    try {
      xhr.send(null)
    }catch(e) {
      callback(e.message)
    }
  }
  function isFile(path, callback) {
    self.getFileSize(path, function(size) {
      callback(size !== -1)
    })
  }
  function getFileSize(path, callback) {
    var xhr = new XMLHttpRequest;
    xhr.open("HEAD", path, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState !== 4) {
        return
      }
      var cl = xhr.getResponseHeader("Content-Length");
      if(cl) {
        callback(parseInt(cl, 10))
      }else {
        callback(-1)
      }
    };
    xhr.send(null)
  }
  function wrap(nativeFunction, nargs) {
    if(!nativeFunction) {
      return null
    }
    return function() {
      cache = {};
      var callback = arguments[nargs], args = Array.prototype.slice.call(arguments, 0, nargs), callbackname = "callback" + String(Math.random()).substring(2);
      window[callbackname] = function() {
        delete window[callbackname];
        callback.apply(this, arguments)
      };
      args.push(callbackname);
      nativeFunction.apply(this, args)
    }
  }
  this.readFile = readFile;
  this.read = read;
  this.readFileSync = readFileSync;
  this.writeFile = writeFile;
  this.deleteFile = deleteFile;
  this.loadXML = loadXML;
  this.isFile = isFile;
  this.getFileSize = getFileSize;
  this.log = log;
  this.assert = assert;
  this.setTimeout = function(f, msec) {
    setTimeout(function() {
      f()
    }, msec)
  };
  this.libraryPaths = function() {
    return["lib"]
  };
  this.setCurrentDirectory = function(dir) {
  };
  this.type = function() {
    return"BrowserRuntime"
  };
  this.getDOMImplementation = function() {
    return window.document.implementation
  };
  this.parseXML = function(xml) {
    var parser = new DOMParser;
    return parser.parseFromString(xml, "text/xml")
  };
  this.exit = function(exitCode) {
    log("Calling exit with code " + String(exitCode) + ", but exit() is not implemented.")
  };
  this.getWindow = function() {
    return window
  };
  this.getNetwork = function() {
    var now = this.getVariable("now");
    if(now === undefined) {
      return{networkStatus:"unavailable"}
    }
    return now
  }
}
function NodeJSRuntime() {
  var self = this, fs = require("fs"), pathmod = require("path"), currentDirectory = "", parser, domImplementation;
  this.ByteArray = function(size) {
    return new Buffer(size)
  };
  this.byteArrayFromArray = function(array) {
    var ba = new Buffer(array.length), i, l = array.length;
    for(i = 0;i < l;i += 1) {
      ba[i] = array[i]
    }
    return ba
  };
  this.concatByteArrays = function(a, b) {
    var ba = new Buffer(a.length + b.length);
    a.copy(ba, 0, 0);
    b.copy(ba, a.length, 0);
    return ba
  };
  this.byteArrayFromString = function(string, encoding) {
    return new Buffer(string, encoding)
  };
  this.byteArrayToString = function(bytearray, encoding) {
    return bytearray.toString(encoding)
  };
  this.getVariable = Runtime.getVariable;
  this.fromJson = Runtime.fromJson;
  this.toJson = Runtime.toJson;
  function isFile(path, callback) {
    path = pathmod.resolve(currentDirectory, path);
    fs.stat(path, function(err, stats) {
      callback(!err && stats.isFile())
    })
  }
  function readFile(path, encoding, callback) {
    path = pathmod.resolve(currentDirectory, path);
    if(encoding !== "binary") {
      fs.readFile(path, encoding, callback)
    }else {
      fs.readFile(path, null, callback)
    }
  }
  this.readFile = readFile;
  function loadXML(path, callback) {
    readFile(path, "utf-8", function(err, data) {
      if(err) {
        return callback(err)
      }
      callback(null, self.parseXML(data))
    })
  }
  this.loadXML = loadXML;
  this.writeFile = function(path, data, callback) {
    path = pathmod.resolve(currentDirectory, path);
    fs.writeFile(path, data, "binary", function(err) {
      callback(err || null)
    })
  };
  this.deleteFile = function(path, callback) {
    path = pathmod.resolve(currentDirectory, path);
    fs.unlink(path, callback)
  };
  this.read = function(path, offset, length, callback) {
    path = pathmod.resolve(currentDirectory, path);
    fs.open(path, "r+", 666, function(err, fd) {
      if(err) {
        callback(err);
        return
      }
      var buffer = new Buffer(length);
      fs.read(fd, buffer, 0, length, offset, function(err, bytesRead) {
        fs.close(fd);
        callback(err, buffer)
      })
    })
  };
  this.readFileSync = function(path, encoding) {
    if(!encoding) {
      return""
    }
    if(encoding === "binary") {
      return fs.readFileSync(path, null)
    }
    return fs.readFileSync(path, encoding)
  };
  this.isFile = isFile;
  this.getFileSize = function(path, callback) {
    path = pathmod.resolve(currentDirectory, path);
    fs.stat(path, function(err, stats) {
      if(err) {
        callback(-1)
      }else {
        callback(stats.size)
      }
    })
  };
  function log(msgOrCategory, msg) {
    var category;
    if(msg !== undefined) {
      category = msgOrCategory
    }else {
      msg = msgOrCategory
    }
    if(category === "alert") {
      process.stderr.write("\n!!!!! ALERT !!!!!" + "\n")
    }
    process.stderr.write(msg + "\n");
    if(category === "alert") {
      process.stderr.write("!!!!! ALERT !!!!!" + "\n")
    }
  }
  this.log = log;
  function assert(condition, message, callback) {
    if(!condition) {
      process.stderr.write("ASSERTION FAILED: " + message);
      if(callback) {
        callback()
      }
    }
  }
  this.assert = assert;
  this.setTimeout = function(f, msec) {
    setTimeout(function() {
      f()
    }, msec)
  };
  this.libraryPaths = function() {
    return[__dirname]
  };
  this.setCurrentDirectory = function(dir) {
    currentDirectory = dir
  };
  this.currentDirectory = function() {
    return currentDirectory
  };
  this.type = function() {
    return"NodeJSRuntime"
  };
  this.getDOMImplementation = function() {
    return domImplementation
  };
  this.parseXML = function(xml) {
    return parser.parseFromString(xml, "text/xml")
  };
  this.exit = process.exit;
  this.getWindow = function() {
    return null
  };
  this.getNetwork = function() {
    return{networkStatus:"unavailable"}
  };
  function init() {
    var DOMParser = require("xmldom").DOMParser;
    parser = new DOMParser;
    domImplementation = self.parseXML("<a/>").implementation
  }
  init()
}
function RhinoRuntime() {
  var self = this, dom = Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(), builder, entityresolver, currentDirectory = "";
  dom.setValidating(false);
  dom.setNamespaceAware(true);
  dom.setExpandEntityReferences(false);
  dom.setSchema(null);
  entityresolver = Packages.org.xml.sax.EntityResolver({resolveEntity:function(publicId, systemId) {
    var file, open = function(path) {
      var reader = new Packages.java.io.FileReader(path), source = new Packages.org.xml.sax.InputSource(reader);
      return source
    };
    file = systemId;
    return open(file)
  }});
  builder = dom.newDocumentBuilder();
  builder.setEntityResolver(entityresolver);
  this.ByteArray = function ByteArray(size) {
    return[size]
  };
  this.byteArrayFromArray = function(array) {
    return array
  };
  this.byteArrayFromString = function(string, encoding) {
    var a = [], i, l = string.length;
    for(i = 0;i < l;i += 1) {
      a[i] = string.charCodeAt(i) & 255
    }
    return a
  };
  this.byteArrayToString = Runtime.byteArrayToString;
  this.getVariable = Runtime.getVariable;
  this.fromJson = Runtime.fromJson;
  this.toJson = Runtime.toJson;
  this.concatByteArrays = function(bytearray1, bytearray2) {
    return bytearray1.concat(bytearray2)
  };
  function loadXML(path, callback) {
    var file = new Packages.java.io.File(path), document;
    try {
      document = builder.parse(file)
    }catch(err) {
      print(err);
      callback(err);
      return
    }
    callback(null, document)
  }
  function runtimeReadFile(path, encoding, callback) {
    if(currentDirectory) {
      path = currentDirectory + "/" + path
    }
    var file = new Packages.java.io.File(path), data, rhinoencoding = encoding === "binary" ? "latin1" : encoding;
    if(!file.isFile()) {
      callback(path + " is not a file.")
    }else {
      data = readFile(path, rhinoencoding);
      if(encoding === "binary") {
        data = self.byteArrayFromString(data, "binary")
      }
      callback(null, data)
    }
  }
  function runtimeReadFileSync(path, encoding) {
    var file = new Packages.java.io.File(path), data, i;
    if(!file.isFile()) {
      return null
    }
    if(encoding === "binary") {
      encoding = "latin1"
    }
    return readFile(path, encoding)
  }
  function isFile(path, callback) {
    if(currentDirectory) {
      path = currentDirectory + "/" + path
    }
    var file = new Packages.java.io.File(path);
    callback(file.isFile())
  }
  this.loadXML = loadXML;
  this.readFile = runtimeReadFile;
  this.writeFile = function(path, data, callback) {
    if(currentDirectory) {
      path = currentDirectory + "/" + path
    }
    var out = new Packages.java.io.FileOutputStream(path), i, l = data.length;
    for(i = 0;i < l;i += 1) {
      out.write(data[i])
    }
    out.close();
    callback(null)
  };
  this.deleteFile = function(path, callback) {
    if(currentDirectory) {
      path = currentDirectory + "/" + path
    }
    var file = new Packages.java.io.File(path);
    if(file["delete"]()) {
      callback(null)
    }else {
      callback("Could not delete " + path)
    }
  };
  this.read = function(path, offset, length, callback) {
    if(currentDirectory) {
      path = currentDirectory + "/" + path
    }
    var data = runtimeReadFileSync(path, "binary");
    if(data) {
      callback(null, this.byteArrayFromString(data.substring(offset, offset + length), "binary"))
    }else {
      callback("Cannot read " + path)
    }
  };
  this.readFileSync = function(path, encoding) {
    if(!encoding) {
      return""
    }
    return readFile(path, encoding)
  };
  this.isFile = isFile;
  this.getFileSize = function(path, callback) {
    if(currentDirectory) {
      path = currentDirectory + "/" + path
    }
    var file = new Packages.java.io.File(path);
    callback(file.length())
  };
  function log(msgOrCategory, msg) {
    var category;
    if(msg !== undefined) {
      category = msgOrCategory
    }else {
      msg = msgOrCategory
    }
    if(category === "alert") {
      print("\n!!!!! ALERT !!!!!")
    }
    print(msg);
    if(category === "alert") {
      print("!!!!! ALERT !!!!!")
    }
  }
  this.log = log;
  function assert(condition, message, callback) {
    if(!condition) {
      log("alert", "ASSERTION FAILED: " + message);
      if(callback) {
        callback()
      }
    }
  }
  this.assert = assert;
  this.setTimeout = function(f, msec) {
    f()
  };
  this.libraryPaths = function() {
    return["lib"]
  };
  this.setCurrentDirectory = function(dir) {
    currentDirectory = dir
  };
  this.currentDirectory = function() {
    return currentDirectory
  };
  this.type = function() {
    return"RhinoRuntime"
  };
  this.getDOMImplementation = function() {
    return builder.getDOMImplementation()
  };
  this.parseXML = function(xml) {
    return builder.parse(xml)
  };
  this.exit = quit;
  this.getWindow = function() {
    return null
  };
  this.getNetwork = function() {
    return{networkStatus:"unavailable"}
  }
}
var runtime = function() {
  var result;
  if(String(typeof window) !== "undefined") {
    result = new BrowserRuntime(window.document.getElementById("logoutput"))
  }else {
    if(String(typeof require) !== "undefined") {
      result = new NodeJSRuntime
    }else {
      result = new RhinoRuntime
    }
  }
  return result
}();
(function() {
  var cache = {}, dircontents = {};
  function getOrDefinePackage(packageNameComponents) {
    var topname = packageNameComponents[0], i, pkg;
    pkg = eval("if (typeof " + topname + " === 'undefined') {" + "eval('" + topname + " = {};');}" + topname);
    for(i = 1;i < packageNameComponents.length - 1;i += 1) {
      if(!pkg.hasOwnProperty(packageNameComponents[i])) {
        pkg = pkg[packageNameComponents[i]] = {}
      }
    }
    return pkg[packageNameComponents[packageNameComponents.length - 1]]
  }
  runtime.loadClass = function(classpath) {
    if(IS_COMPILED_CODE) {
      return
    }
    if(cache.hasOwnProperty(classpath)) {
      return
    }
    var names = classpath.split("."), impl;
    impl = getOrDefinePackage(names);
    if(impl) {
      cache[classpath] = true;
      return
    }
    function getPathFromManifests(classpath) {
      var path = classpath.replace(".", "/") + ".js", dirs = runtime.libraryPaths(), i, dir, code;
      if(runtime.currentDirectory) {
        dirs.push(runtime.currentDirectory())
      }
      for(i = 0;i < dirs.length;i += 1) {
        dir = dirs[i];
        if(!dircontents.hasOwnProperty(dir)) {
          code = runtime.readFileSync(dirs[i] + "/manifest.js", "utf8");
          if(code && code.length) {
            try {
              dircontents[dir] = eval(code)
            }catch(e1) {
              dircontents[dir] = null;
              runtime.log("Cannot load manifest for " + dir + ".")
            }
          }else {
            dircontents[dir] = null
          }
        }
        code = null;
        dir = dircontents[dir];
        if(dir && dir.indexOf && dir.indexOf(path) !== -1) {
          return dirs[i] + "/" + path
        }
      }
      return null
    }
    function load(classpath) {
      var code, path;
      path = getPathFromManifests(classpath);
      if(!path) {
        throw classpath + " is not listed in any manifest.js.";
      }
      try {
        code = runtime.readFileSync(path, "utf8")
      }catch(e2) {
        runtime.log("Error loading " + classpath + " " + e2);
        throw e2;
      }
      if(code === undefined) {
        throw"Cannot load class " + classpath;
      }
      try {
        code = eval(classpath + " = eval(code);")
      }catch(e4) {
        runtime.log("Error loading " + classpath + " " + e4);
        throw e4;
      }
      return code
    }
    impl = load(classpath);
    if(!impl || Runtime.getFunctionName(impl) !== names[names.length - 1]) {
      runtime.log("Loaded code is not for " + names[names.length - 1]);
      throw"Loaded code is not for " + names[names.length - 1];
    }
    cache[classpath] = true
  }
})();
(function(args) {
  if(args) {
    args = Array.prototype.slice.call(args)
  }else {
    args = []
  }
  function run(argv) {
    if(!argv.length) {
      return
    }
    var script = argv[0];
    runtime.readFile(script, "utf8", function(err, code) {
      var path = "", paths = runtime.libraryPaths(), codestring = code;
      if(script.indexOf("/") !== -1) {
        path = script.substring(0, script.indexOf("/"))
      }
      runtime.setCurrentDirectory(path);
      function run() {
        var script, path, paths, args, argv, result;
        result = eval(codestring);
        if(result) {
          runtime.exit(result)
        }
        return
      }
      if(err || codestring === null) {
        runtime.log(err);
        runtime.exit(1)
      }else {
        run.apply(null, argv)
      }
    })
  }
  if(runtime.type() === "NodeJSRuntime") {
    run(process.argv.slice(2))
  }else {
    if(runtime.type() === "RhinoRuntime") {
      run(args)
    }else {
      run(args.slice(1))
    }
  }
})(String(typeof arguments) !== "undefined" && arguments);
core.Base64 = function() {
  var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", b64charcodes = function() {
    var a = [], i, codeA = "A".charCodeAt(0), codea = "a".charCodeAt(0), code0 = "0".charCodeAt(0);
    for(i = 0;i < 26;i += 1) {
      a.push(codeA + i)
    }
    for(i = 0;i < 26;i += 1) {
      a.push(codea + i)
    }
    for(i = 0;i < 10;i += 1) {
      a.push(code0 + i)
    }
    a.push("+".charCodeAt(0));
    a.push("/".charCodeAt(0));
    return a
  }(), b64tab = function(bin) {
    var t = {}, i, l;
    for(i = 0, l = bin.length;i < l;i += 1) {
      t[bin.charAt(i)] = i
    }
    return t
  }(b64chars), convertUTF16StringToBase64, convertBase64ToUTF16String, window = runtime.getWindow(), btoa, atob;
  function stringToArray(s) {
    var a = [], i, l = s.length;
    for(i = 0;i < l;i += 1) {
      a[i] = s.charCodeAt(i) & 255
    }
    return a
  }
  function convertUTF8ArrayToBase64(bin) {
    var n, b64 = "", i, l = bin.length - 2;
    for(i = 0;i < l;i += 3) {
      n = bin[i] << 16 | bin[i + 1] << 8 | bin[i + 2];
      b64 += b64chars[n >>> 18];
      b64 += b64chars[n >>> 12 & 63];
      b64 += b64chars[n >>> 6 & 63];
      b64 += b64chars[n & 63]
    }
    if(i === l + 1) {
      n = bin[i] << 4;
      b64 += b64chars[n >>> 6];
      b64 += b64chars[n & 63];
      b64 += "=="
    }else {
      if(i === l) {
        n = bin[i] << 10 | bin[i + 1] << 2;
        b64 += b64chars[n >>> 12];
        b64 += b64chars[n >>> 6 & 63];
        b64 += b64chars[n & 63];
        b64 += "="
      }
    }
    return b64
  }
  function convertBase64ToUTF8Array(b64) {
    b64 = b64.replace(/[^A-Za-z0-9+\/]+/g, "");
    var bin = [], padlen = b64.length % 4, i, l = b64.length, n;
    for(i = 0;i < l;i += 4) {
      n = (b64tab[b64.charAt(i)] || 0) << 18 | (b64tab[b64.charAt(i + 1)] || 0) << 12 | (b64tab[b64.charAt(i + 2)] || 0) << 6 | (b64tab[b64.charAt(i + 3)] || 0);
      bin.push(n >> 16, n >> 8 & 255, n & 255)
    }
    bin.length -= [0, 0, 2, 1][padlen];
    return bin
  }
  function convertUTF16ArrayToUTF8Array(uni) {
    var bin = [], i, l = uni.length, n;
    for(i = 0;i < l;i += 1) {
      n = uni[i];
      if(n < 128) {
        bin.push(n)
      }else {
        if(n < 2048) {
          bin.push(192 | n >>> 6, 128 | n & 63)
        }else {
          bin.push(224 | n >>> 12 & 15, 128 | n >>> 6 & 63, 128 | n & 63)
        }
      }
    }
    return bin
  }
  function convertUTF8ArrayToUTF16Array(bin) {
    var uni = [], i, l = bin.length, c0, c1, c2;
    for(i = 0;i < l;i += 1) {
      c0 = bin[i];
      if(c0 < 128) {
        uni.push(c0)
      }else {
        i += 1;
        c1 = bin[i];
        if(c0 < 224) {
          uni.push((c0 & 31) << 6 | c1 & 63)
        }else {
          i += 1;
          c2 = bin[i];
          uni.push((c0 & 15) << 12 | (c1 & 63) << 6 | c2 & 63)
        }
      }
    }
    return uni
  }
  function convertUTF8StringToBase64(bin) {
    return convertUTF8ArrayToBase64(stringToArray(bin))
  }
  function convertBase64ToUTF8String(b64) {
    return String.fromCharCode.apply(String, convertBase64ToUTF8Array(b64))
  }
  function convertUTF8StringToUTF16Array(bin) {
    return convertUTF8ArrayToUTF16Array(stringToArray(bin))
  }
  function convertUTF8ArrayToUTF16String(bin) {
    var b = convertUTF8ArrayToUTF16Array(bin), r = "", i = 0, chunksize = 45E3;
    while(i < b.length) {
      r += String.fromCharCode.apply(String, b.slice(i, i + chunksize));
      i += chunksize
    }
    return r
  }
  function convertUTF8StringToUTF16String_internal(bin, i, end) {
    var str = "", c0, c1, c2, j;
    for(j = i;j < end;j += 1) {
      c0 = bin.charCodeAt(j) & 255;
      if(c0 < 128) {
        str += String.fromCharCode(c0)
      }else {
        j += 1;
        c1 = bin.charCodeAt(j) & 255;
        if(c0 < 224) {
          str += String.fromCharCode((c0 & 31) << 6 | c1 & 63)
        }else {
          j += 1;
          c2 = bin.charCodeAt(j) & 255;
          str += String.fromCharCode((c0 & 15) << 12 | (c1 & 63) << 6 | c2 & 63)
        }
      }
    }
    return str
  }
  function convertUTF8StringToUTF16String(bin, callback) {
    var partsize = 1E5, numparts = bin.length / partsize, str = "", pos = 0;
    if(bin.length < partsize) {
      callback(convertUTF8StringToUTF16String_internal(bin, 0, bin.length), true);
      return
    }
    if(typeof bin !== "string") {
      bin = bin.slice()
    }
    function f() {
      var end = pos + partsize;
      if(end > bin.length) {
        end = bin.length
      }
      str += convertUTF8StringToUTF16String_internal(bin, pos, end);
      pos = end;
      end = pos === bin.length;
      if(callback(str, end) && !end) {
        runtime.setTimeout(f, 0)
      }
    }
    f()
  }
  function convertUTF16StringToUTF8Array(uni) {
    return convertUTF16ArrayToUTF8Array(stringToArray(uni))
  }
  function convertUTF16ArrayToUTF8String(uni) {
    return String.fromCharCode.apply(String, convertUTF16ArrayToUTF8Array(uni))
  }
  function convertUTF16StringToUTF8String(uni) {
    return String.fromCharCode.apply(String, convertUTF16ArrayToUTF8Array(stringToArray(uni)))
  }
  if(window && window.btoa) {
    btoa = function(b) {
      return window.btoa(b)
    };
    convertUTF16StringToBase64 = function(uni) {
      return btoa(convertUTF16StringToUTF8String(uni))
    }
  }else {
    btoa = convertUTF8StringToBase64;
    convertUTF16StringToBase64 = function(uni) {
      return convertUTF8ArrayToBase64(convertUTF16StringToUTF8Array(uni))
    }
  }
  if(window && window.atob) {
    atob = function(a) {
      return window.atob(a)
    };
    convertBase64ToUTF16String = function(b64) {
      var b = atob(b64);
      return convertUTF8StringToUTF16String_internal(b, 0, b.length)
    }
  }else {
    atob = convertBase64ToUTF8String;
    convertBase64ToUTF16String = function(b64) {
      return convertUTF8ArrayToUTF16String(convertBase64ToUTF8Array(b64))
    }
  }
  function Base64() {
    this.convertUTF8ArrayToBase64 = convertUTF8ArrayToBase64;
    this.convertByteArrayToBase64 = convertUTF8ArrayToBase64;
    this.convertBase64ToUTF8Array = convertBase64ToUTF8Array;
    this.convertBase64ToByteArray = convertBase64ToUTF8Array;
    this.convertUTF16ArrayToUTF8Array = convertUTF16ArrayToUTF8Array;
    this.convertUTF16ArrayToByteArray = convertUTF16ArrayToUTF8Array;
    this.convertUTF8ArrayToUTF16Array = convertUTF8ArrayToUTF16Array;
    this.convertByteArrayToUTF16Array = convertUTF8ArrayToUTF16Array;
    this.convertUTF8StringToBase64 = convertUTF8StringToBase64;
    this.convertBase64ToUTF8String = convertBase64ToUTF8String;
    this.convertUTF8StringToUTF16Array = convertUTF8StringToUTF16Array;
    this.convertUTF8ArrayToUTF16String = convertUTF8ArrayToUTF16String;
    this.convertByteArrayToUTF16String = convertUTF8ArrayToUTF16String;
    this.convertUTF8StringToUTF16String = convertUTF8StringToUTF16String;
    this.convertUTF16StringToUTF8Array = convertUTF16StringToUTF8Array;
    this.convertUTF16StringToByteArray = convertUTF16StringToUTF8Array;
    this.convertUTF16ArrayToUTF8String = convertUTF16ArrayToUTF8String;
    this.convertUTF16StringToUTF8String = convertUTF16StringToUTF8String;
    this.convertUTF16StringToBase64 = convertUTF16StringToBase64;
    this.convertBase64ToUTF16String = convertBase64ToUTF16String;
    this.fromBase64 = convertBase64ToUTF8String;
    this.toBase64 = convertUTF8StringToBase64;
    this.atob = atob;
    this.btoa = btoa;
    this.utob = convertUTF16StringToUTF8String;
    this.btou = convertUTF8StringToUTF16String;
    this.encode = convertUTF16StringToBase64;
    this.encodeURI = function(u) {
      return convertUTF16StringToBase64(u).replace(/[+\/]/g, function(m0) {
        return m0 === "+" ? "-" : "_"
      }).replace(/\\=+$/, "")
    };
    this.decode = function(a) {
      return convertBase64ToUTF16String(a.replace(/[\-_]/g, function(m0) {
        return m0 === "-" ? "+" : "/"
      }))
    }
  }
  return Base64
}();
core.RawDeflate = function() {
  var zip_WSIZE = 32768, zip_STORED_BLOCK = 0, zip_STATIC_TREES = 1, zip_DYN_TREES = 2, zip_DEFAULT_LEVEL = 6, zip_FULL_SEARCH = true, zip_INBUFSIZ = 32768, zip_INBUF_EXTRA = 64, zip_OUTBUFSIZ = 1024 * 8, zip_window_size = 2 * zip_WSIZE, zip_MIN_MATCH = 3, zip_MAX_MATCH = 258, zip_BITS = 16, zip_LIT_BUFSIZE = 8192, zip_HASH_BITS = 13, zip_DIST_BUFSIZE = zip_LIT_BUFSIZE, zip_HASH_SIZE = 1 << zip_HASH_BITS, zip_HASH_MASK = zip_HASH_SIZE - 1, zip_WMASK = zip_WSIZE - 1, zip_NIL = 0, zip_TOO_FAR = 4096, 
  zip_MIN_LOOKAHEAD = zip_MAX_MATCH + zip_MIN_MATCH + 1, zip_MAX_DIST = zip_WSIZE - zip_MIN_LOOKAHEAD, zip_SMALLEST = 1, zip_MAX_BITS = 15, zip_MAX_BL_BITS = 7, zip_LENGTH_CODES = 29, zip_LITERALS = 256, zip_END_BLOCK = 256, zip_L_CODES = zip_LITERALS + 1 + zip_LENGTH_CODES, zip_D_CODES = 30, zip_BL_CODES = 19, zip_REP_3_6 = 16, zip_REPZ_3_10 = 17, zip_REPZ_11_138 = 18, zip_HEAP_SIZE = 2 * zip_L_CODES + 1, zip_H_SHIFT = parseInt((zip_HASH_BITS + zip_MIN_MATCH - 1) / zip_MIN_MATCH, 10), zip_free_queue, 
  zip_qhead, zip_qtail, zip_initflag, zip_outbuf = null, zip_outcnt, zip_outoff, zip_complete, zip_window, zip_d_buf, zip_l_buf, zip_prev, zip_bi_buf, zip_bi_valid, zip_block_start, zip_ins_h, zip_hash_head, zip_prev_match, zip_match_available, zip_match_length, zip_prev_length, zip_strstart, zip_match_start, zip_eofile, zip_lookahead, zip_max_chain_length, zip_max_lazy_match, zip_compr_level, zip_good_match, zip_nice_match, zip_dyn_ltree, zip_dyn_dtree, zip_static_ltree, zip_static_dtree, zip_bl_tree, 
  zip_l_desc, zip_d_desc, zip_bl_desc, zip_bl_count, zip_heap, zip_heap_len, zip_heap_max, zip_depth, zip_length_code, zip_dist_code, zip_base_length, zip_base_dist, zip_flag_buf, zip_last_lit, zip_last_dist, zip_last_flags, zip_flags, zip_flag_bit, zip_opt_len, zip_static_len, zip_deflate_data, zip_deflate_pos, zip_extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], zip_extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 
  9, 10, 10, 11, 11, 12, 12, 13, 13], zip_extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], zip_bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], zip_configuration_table;
  if(zip_LIT_BUFSIZE > zip_INBUFSIZ) {
    runtime.log("error: zip_INBUFSIZ is too small")
  }
  if(zip_WSIZE << 1 > 1 << zip_BITS) {
    runtime.log("error: zip_WSIZE is too large")
  }
  if(zip_HASH_BITS > zip_BITS - 1) {
    runtime.log("error: zip_HASH_BITS is too large")
  }
  if(zip_HASH_BITS < 8 || zip_MAX_MATCH !== 258) {
    runtime.log("error: Code too clever")
  }
  function Zip_DeflateCT() {
    this.fc = 0;
    this.dl = 0
  }
  function Zip_DeflateTreeDesc() {
    this.dyn_tree = null;
    this.static_tree = null;
    this.extra_bits = null;
    this.extra_base = 0;
    this.elems = 0;
    this.max_length = 0;
    this.max_code = 0
  }
  function Zip_DeflateConfiguration(a, b, c, d) {
    this.good_length = a;
    this.max_lazy = b;
    this.nice_length = c;
    this.max_chain = d
  }
  function Zip_DeflateBuffer() {
    this.next = null;
    this.len = 0;
    this.ptr = [];
    this.ptr.length = zip_OUTBUFSIZ;
    this.off = 0
  }
  zip_configuration_table = [new Zip_DeflateConfiguration(0, 0, 0, 0), new Zip_DeflateConfiguration(4, 4, 8, 4), new Zip_DeflateConfiguration(4, 5, 16, 8), new Zip_DeflateConfiguration(4, 6, 32, 32), new Zip_DeflateConfiguration(4, 4, 16, 16), new Zip_DeflateConfiguration(8, 16, 32, 32), new Zip_DeflateConfiguration(8, 16, 128, 128), new Zip_DeflateConfiguration(8, 32, 128, 256), new Zip_DeflateConfiguration(32, 128, 258, 1024), new Zip_DeflateConfiguration(32, 258, 258, 4096)];
  function zip_deflate_start(level) {
    var i;
    if(!level) {
      level = zip_DEFAULT_LEVEL
    }else {
      if(level < 1) {
        level = 1
      }else {
        if(level > 9) {
          level = 9
        }
      }
    }
    zip_compr_level = level;
    zip_initflag = false;
    zip_eofile = false;
    if(zip_outbuf !== null) {
      return
    }
    zip_free_queue = zip_qhead = zip_qtail = null;
    zip_outbuf = [];
    zip_outbuf.length = zip_OUTBUFSIZ;
    zip_window = [];
    zip_window.length = zip_window_size;
    zip_d_buf = [];
    zip_d_buf.length = zip_DIST_BUFSIZE;
    zip_l_buf = [];
    zip_l_buf.length = zip_INBUFSIZ + zip_INBUF_EXTRA;
    zip_prev = [];
    zip_prev.length = 1 << zip_BITS;
    zip_dyn_ltree = [];
    zip_dyn_ltree.length = zip_HEAP_SIZE;
    for(i = 0;i < zip_HEAP_SIZE;i++) {
      zip_dyn_ltree[i] = new Zip_DeflateCT
    }
    zip_dyn_dtree = [];
    zip_dyn_dtree.length = 2 * zip_D_CODES + 1;
    for(i = 0;i < 2 * zip_D_CODES + 1;i++) {
      zip_dyn_dtree[i] = new Zip_DeflateCT
    }
    zip_static_ltree = [];
    zip_static_ltree.length = zip_L_CODES + 2;
    for(i = 0;i < zip_L_CODES + 2;i++) {
      zip_static_ltree[i] = new Zip_DeflateCT
    }
    zip_static_dtree = [];
    zip_static_dtree.length = zip_D_CODES;
    for(i = 0;i < zip_D_CODES;i++) {
      zip_static_dtree[i] = new Zip_DeflateCT
    }
    zip_bl_tree = [];
    zip_bl_tree.length = 2 * zip_BL_CODES + 1;
    for(i = 0;i < 2 * zip_BL_CODES + 1;i++) {
      zip_bl_tree[i] = new Zip_DeflateCT
    }
    zip_l_desc = new Zip_DeflateTreeDesc;
    zip_d_desc = new Zip_DeflateTreeDesc;
    zip_bl_desc = new Zip_DeflateTreeDesc;
    zip_bl_count = [];
    zip_bl_count.length = zip_MAX_BITS + 1;
    zip_heap = [];
    zip_heap.length = 2 * zip_L_CODES + 1;
    zip_depth = [];
    zip_depth.length = 2 * zip_L_CODES + 1;
    zip_length_code = [];
    zip_length_code.length = zip_MAX_MATCH - zip_MIN_MATCH + 1;
    zip_dist_code = [];
    zip_dist_code.length = 512;
    zip_base_length = [];
    zip_base_length.length = zip_LENGTH_CODES;
    zip_base_dist = [];
    zip_base_dist.length = zip_D_CODES;
    zip_flag_buf = [];
    zip_flag_buf.length = parseInt(zip_LIT_BUFSIZE / 8, 10)
  }
  var zip_deflate_end = function() {
    zip_free_queue = zip_qhead = zip_qtail = null;
    zip_outbuf = null;
    zip_window = null;
    zip_d_buf = null;
    zip_l_buf = null;
    zip_prev = null;
    zip_dyn_ltree = null;
    zip_dyn_dtree = null;
    zip_static_ltree = null;
    zip_static_dtree = null;
    zip_bl_tree = null;
    zip_l_desc = null;
    zip_d_desc = null;
    zip_bl_desc = null;
    zip_bl_count = null;
    zip_heap = null;
    zip_depth = null;
    zip_length_code = null;
    zip_dist_code = null;
    zip_base_length = null;
    zip_base_dist = null;
    zip_flag_buf = null
  };
  var zip_reuse_queue = function(p) {
    p.next = zip_free_queue;
    zip_free_queue = p
  };
  var zip_new_queue = function() {
    var p;
    if(zip_free_queue !== null) {
      p = zip_free_queue;
      zip_free_queue = zip_free_queue.next
    }else {
      p = new Zip_DeflateBuffer
    }
    p.next = null;
    p.len = p.off = 0;
    return p
  };
  var zip_head1 = function(i) {
    return zip_prev[zip_WSIZE + i]
  };
  var zip_head2 = function(i, val) {
    zip_prev[zip_WSIZE + i] = val;
    return val
  };
  var zip_qoutbuf = function() {
    var q, i;
    if(zip_outcnt !== 0) {
      q = zip_new_queue();
      if(zip_qhead === null) {
        zip_qhead = zip_qtail = q
      }else {
        zip_qtail = zip_qtail.next = q
      }
      q.len = zip_outcnt - zip_outoff;
      for(i = 0;i < q.len;i++) {
        q.ptr[i] = zip_outbuf[zip_outoff + i]
      }
      zip_outcnt = zip_outoff = 0
    }
  };
  var zip_put_byte = function(c) {
    zip_outbuf[zip_outoff + zip_outcnt++] = c;
    if(zip_outoff + zip_outcnt === zip_OUTBUFSIZ) {
      zip_qoutbuf()
    }
  };
  var zip_put_short = function(w) {
    w &= 65535;
    if(zip_outoff + zip_outcnt < zip_OUTBUFSIZ - 2) {
      zip_outbuf[zip_outoff + zip_outcnt++] = w & 255;
      zip_outbuf[zip_outoff + zip_outcnt++] = w >>> 8
    }else {
      zip_put_byte(w & 255);
      zip_put_byte(w >>> 8)
    }
  };
  var zip_INSERT_STRING = function() {
    zip_ins_h = (zip_ins_h << zip_H_SHIFT ^ zip_window[zip_strstart + zip_MIN_MATCH - 1] & 255) & zip_HASH_MASK;
    zip_hash_head = zip_head1(zip_ins_h);
    zip_prev[zip_strstart & zip_WMASK] = zip_hash_head;
    zip_head2(zip_ins_h, zip_strstart)
  };
  var zip_Buf_size = 16;
  var zip_send_bits = function(value, length) {
    if(zip_bi_valid > zip_Buf_size - length) {
      zip_bi_buf |= value << zip_bi_valid;
      zip_put_short(zip_bi_buf);
      zip_bi_buf = value >> zip_Buf_size - zip_bi_valid;
      zip_bi_valid += length - zip_Buf_size
    }else {
      zip_bi_buf |= value << zip_bi_valid;
      zip_bi_valid += length
    }
  };
  var zip_SEND_CODE = function(c, tree) {
    zip_send_bits(tree[c].fc, tree[c].dl)
  };
  var zip_D_CODE = function(dist) {
    return(dist < 256 ? zip_dist_code[dist] : zip_dist_code[256 + (dist >> 7)]) & 255
  };
  var zip_SMALLER = function(tree, n, m) {
    return tree[n].fc < tree[m].fc || tree[n].fc === tree[m].fc && zip_depth[n] <= zip_depth[m]
  };
  var zip_read_buff = function(buff, offset, n) {
    var i;
    for(i = 0;i < n && zip_deflate_pos < zip_deflate_data.length;i++) {
      buff[offset + i] = zip_deflate_data.charCodeAt(zip_deflate_pos++) & 255
    }
    return i
  };
  var zip_fill_window = function() {
    var n, m;
    var more = zip_window_size - zip_lookahead - zip_strstart;
    if(more === -1) {
      more--
    }else {
      if(zip_strstart >= zip_WSIZE + zip_MAX_DIST) {
        for(n = 0;n < zip_WSIZE;n++) {
          zip_window[n] = zip_window[n + zip_WSIZE]
        }
        zip_match_start -= zip_WSIZE;
        zip_strstart -= zip_WSIZE;
        zip_block_start -= zip_WSIZE;
        for(n = 0;n < zip_HASH_SIZE;n++) {
          m = zip_head1(n);
          zip_head2(n, m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL)
        }
        for(n = 0;n < zip_WSIZE;n++) {
          m = zip_prev[n];
          zip_prev[n] = m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL
        }
        more += zip_WSIZE
      }
    }
    if(!zip_eofile) {
      n = zip_read_buff(zip_window, zip_strstart + zip_lookahead, more);
      if(n <= 0) {
        zip_eofile = true
      }else {
        zip_lookahead += n
      }
    }
  };
  var zip_lm_init = function() {
    var j;
    for(j = 0;j < zip_HASH_SIZE;j++) {
      zip_prev[zip_WSIZE + j] = 0
    }
    zip_max_lazy_match = zip_configuration_table[zip_compr_level].max_lazy;
    zip_good_match = zip_configuration_table[zip_compr_level].good_length;
    if(!zip_FULL_SEARCH) {
      zip_nice_match = zip_configuration_table[zip_compr_level].nice_length
    }
    zip_max_chain_length = zip_configuration_table[zip_compr_level].max_chain;
    zip_strstart = 0;
    zip_block_start = 0;
    zip_lookahead = zip_read_buff(zip_window, 0, 2 * zip_WSIZE);
    if(zip_lookahead <= 0) {
      zip_eofile = true;
      zip_lookahead = 0;
      return
    }
    zip_eofile = false;
    while(zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile) {
      zip_fill_window()
    }
    zip_ins_h = 0;
    for(j = 0;j < zip_MIN_MATCH - 1;j++) {
      zip_ins_h = (zip_ins_h << zip_H_SHIFT ^ zip_window[j] & 255) & zip_HASH_MASK
    }
  };
  var zip_longest_match = function(cur_match) {
    var chain_length = zip_max_chain_length;
    var scanp = zip_strstart;
    var matchp;
    var len;
    var best_len = zip_prev_length;
    var limit = zip_strstart > zip_MAX_DIST ? zip_strstart - zip_MAX_DIST : zip_NIL;
    var strendp = zip_strstart + zip_MAX_MATCH;
    var scan_end1 = zip_window[scanp + best_len - 1];
    var scan_end = zip_window[scanp + best_len];
    if(zip_prev_length >= zip_good_match) {
      chain_length >>= 2
    }
    do {
      matchp = cur_match;
      if(zip_window[matchp + best_len] !== scan_end || zip_window[matchp + best_len - 1] !== scan_end1 || zip_window[matchp] !== zip_window[scanp] || zip_window[++matchp] !== zip_window[scanp + 1]) {
        continue
      }
      scanp += 2;
      matchp++;
      do {
        ++scanp
      }while(zip_window[scanp] === zip_window[++matchp] && zip_window[++scanp] === zip_window[++matchp] && zip_window[++scanp] === zip_window[++matchp] && zip_window[++scanp] === zip_window[++matchp] && zip_window[++scanp] === zip_window[++matchp] && zip_window[++scanp] === zip_window[++matchp] && zip_window[++scanp] === zip_window[++matchp] && zip_window[++scanp] === zip_window[++matchp] && scanp < strendp);
      len = zip_MAX_MATCH - (strendp - scanp);
      scanp = strendp - zip_MAX_MATCH;
      if(len > best_len) {
        zip_match_start = cur_match;
        best_len = len;
        if(zip_FULL_SEARCH) {
          if(len >= zip_MAX_MATCH) {
            break
          }
        }else {
          if(len >= zip_nice_match) {
            break
          }
        }
        scan_end1 = zip_window[scanp + best_len - 1];
        scan_end = zip_window[scanp + best_len]
      }
    }while((cur_match = zip_prev[cur_match & zip_WMASK]) > limit && --chain_length !== 0);
    return best_len
  };
  var zip_ct_tally = function(dist, lc) {
    zip_l_buf[zip_last_lit++] = lc;
    if(dist === 0) {
      zip_dyn_ltree[lc].fc++
    }else {
      dist--;
      zip_dyn_ltree[zip_length_code[lc] + zip_LITERALS + 1].fc++;
      zip_dyn_dtree[zip_D_CODE(dist)].fc++;
      zip_d_buf[zip_last_dist++] = dist;
      zip_flags |= zip_flag_bit
    }
    zip_flag_bit <<= 1;
    if((zip_last_lit & 7) === 0) {
      zip_flag_buf[zip_last_flags++] = zip_flags;
      zip_flags = 0;
      zip_flag_bit = 1
    }
    if(zip_compr_level > 2 && (zip_last_lit & 4095) === 0) {
      var out_length = zip_last_lit * 8;
      var in_length = zip_strstart - zip_block_start;
      var dcode;
      for(dcode = 0;dcode < zip_D_CODES;dcode++) {
        out_length += zip_dyn_dtree[dcode].fc * (5 + zip_extra_dbits[dcode])
      }
      out_length >>= 3;
      if(zip_last_dist < parseInt(zip_last_lit / 2, 10) && out_length < parseInt(in_length / 2, 10)) {
        return true
      }
    }
    return zip_last_lit === zip_LIT_BUFSIZE - 1 || zip_last_dist === zip_DIST_BUFSIZE
  };
  var zip_pqdownheap = function(tree, k) {
    var v = zip_heap[k];
    var j = k << 1;
    while(j <= zip_heap_len) {
      if(j < zip_heap_len && zip_SMALLER(tree, zip_heap[j + 1], zip_heap[j])) {
        j++
      }
      if(zip_SMALLER(tree, v, zip_heap[j])) {
        break
      }
      zip_heap[k] = zip_heap[j];
      k = j;
      j <<= 1
    }
    zip_heap[k] = v
  };
  var zip_gen_bitlen = function(desc) {
    var tree = desc.dyn_tree;
    var extra = desc.extra_bits;
    var base = desc.extra_base;
    var max_code = desc.max_code;
    var max_length = desc.max_length;
    var stree = desc.static_tree;
    var h;
    var n, m;
    var bits;
    var xbits;
    var f;
    var overflow = 0;
    for(bits = 0;bits <= zip_MAX_BITS;bits++) {
      zip_bl_count[bits] = 0
    }
    tree[zip_heap[zip_heap_max]].dl = 0;
    for(h = zip_heap_max + 1;h < zip_HEAP_SIZE;h++) {
      n = zip_heap[h];
      bits = tree[tree[n].dl].dl + 1;
      if(bits > max_length) {
        bits = max_length;
        overflow++
      }
      tree[n].dl = bits;
      if(n > max_code) {
        continue
      }
      zip_bl_count[bits]++;
      xbits = 0;
      if(n >= base) {
        xbits = extra[n - base]
      }
      f = tree[n].fc;
      zip_opt_len += f * (bits + xbits);
      if(stree !== null) {
        zip_static_len += f * (stree[n].dl + xbits)
      }
    }
    if(overflow === 0) {
      return
    }
    do {
      bits = max_length - 1;
      while(zip_bl_count[bits] === 0) {
        bits--
      }
      zip_bl_count[bits]--;
      zip_bl_count[bits + 1] += 2;
      zip_bl_count[max_length]--;
      overflow -= 2
    }while(overflow > 0);
    for(bits = max_length;bits !== 0;bits--) {
      n = zip_bl_count[bits];
      while(n !== 0) {
        m = zip_heap[--h];
        if(m > max_code) {
          continue
        }
        if(tree[m].dl !== bits) {
          zip_opt_len += (bits - tree[m].dl) * tree[m].fc;
          tree[m].fc = bits
        }
        n--
      }
    }
  };
  var zip_bi_reverse = function(code, len) {
    var res = 0;
    do {
      res |= code & 1;
      code >>= 1;
      res <<= 1
    }while(--len > 0);
    return res >> 1
  };
  var zip_gen_codes = function(tree, max_code) {
    var next_code = [];
    next_code.length = zip_MAX_BITS + 1;
    var code = 0;
    var bits;
    var n;
    for(bits = 1;bits <= zip_MAX_BITS;bits++) {
      code = code + zip_bl_count[bits - 1] << 1;
      next_code[bits] = code
    }
    for(n = 0;n <= max_code;n++) {
      var len = tree[n].dl;
      if(len === 0) {
        continue
      }
      tree[n].fc = zip_bi_reverse(next_code[len]++, len)
    }
  };
  var zip_build_tree = function(desc) {
    var tree = desc.dyn_tree;
    var stree = desc.static_tree;
    var elems = desc.elems;
    var n, m;
    var max_code = -1;
    var node = elems;
    zip_heap_len = 0;
    zip_heap_max = zip_HEAP_SIZE;
    for(n = 0;n < elems;n++) {
      if(tree[n].fc !== 0) {
        zip_heap[++zip_heap_len] = max_code = n;
        zip_depth[n] = 0
      }else {
        tree[n].dl = 0
      }
    }
    while(zip_heap_len < 2) {
      var xnew = zip_heap[++zip_heap_len] = max_code < 2 ? ++max_code : 0;
      tree[xnew].fc = 1;
      zip_depth[xnew] = 0;
      zip_opt_len--;
      if(stree !== null) {
        zip_static_len -= stree[xnew].dl
      }
    }
    desc.max_code = max_code;
    for(n = zip_heap_len >> 1;n >= 1;n--) {
      zip_pqdownheap(tree, n)
    }
    do {
      n = zip_heap[zip_SMALLEST];
      zip_heap[zip_SMALLEST] = zip_heap[zip_heap_len--];
      zip_pqdownheap(tree, zip_SMALLEST);
      m = zip_heap[zip_SMALLEST];
      zip_heap[--zip_heap_max] = n;
      zip_heap[--zip_heap_max] = m;
      tree[node].fc = tree[n].fc + tree[m].fc;
      if(zip_depth[n] > zip_depth[m] + 1) {
        zip_depth[node] = zip_depth[n]
      }else {
        zip_depth[node] = zip_depth[m] + 1
      }
      tree[n].dl = tree[m].dl = node;
      zip_heap[zip_SMALLEST] = node++;
      zip_pqdownheap(tree, zip_SMALLEST)
    }while(zip_heap_len >= 2);
    zip_heap[--zip_heap_max] = zip_heap[zip_SMALLEST];
    zip_gen_bitlen(desc);
    zip_gen_codes(tree, max_code)
  };
  var zip_scan_tree = function(tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0].dl;
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if(nextlen === 0) {
      max_count = 138;
      min_count = 3
    }
    tree[max_code + 1].dl = 65535;
    for(n = 0;n <= max_code;n++) {
      curlen = nextlen;
      nextlen = tree[n + 1].dl;
      if(++count < max_count && curlen === nextlen) {
        continue
      }else {
        if(count < min_count) {
          zip_bl_tree[curlen].fc += count
        }else {
          if(curlen !== 0) {
            if(curlen !== prevlen) {
              zip_bl_tree[curlen].fc++
            }
            zip_bl_tree[zip_REP_3_6].fc++
          }else {
            if(count <= 10) {
              zip_bl_tree[zip_REPZ_3_10].fc++
            }else {
              zip_bl_tree[zip_REPZ_11_138].fc++
            }
          }
        }
      }
      count = 0;
      prevlen = curlen;
      if(nextlen === 0) {
        max_count = 138;
        min_count = 3
      }else {
        if(curlen === nextlen) {
          max_count = 6;
          min_count = 3
        }else {
          max_count = 7;
          min_count = 4
        }
      }
    }
  };
  var zip_build_bl_tree = function() {
    var max_blindex;
    zip_scan_tree(zip_dyn_ltree, zip_l_desc.max_code);
    zip_scan_tree(zip_dyn_dtree, zip_d_desc.max_code);
    zip_build_tree(zip_bl_desc);
    for(max_blindex = zip_BL_CODES - 1;max_blindex >= 3;max_blindex--) {
      if(zip_bl_tree[zip_bl_order[max_blindex]].dl !== 0) {
        break
      }
    }
    zip_opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
    return max_blindex
  };
  var zip_bi_windup = function() {
    if(zip_bi_valid > 8) {
      zip_put_short(zip_bi_buf)
    }else {
      if(zip_bi_valid > 0) {
        zip_put_byte(zip_bi_buf)
      }
    }
    zip_bi_buf = 0;
    zip_bi_valid = 0
  };
  var zip_compress_block = function(ltree, dtree) {
    var dist;
    var lc;
    var lx = 0;
    var dx = 0;
    var fx = 0;
    var flag = 0;
    var code;
    var extra;
    if(zip_last_lit !== 0) {
      do {
        if((lx & 7) === 0) {
          flag = zip_flag_buf[fx++]
        }
        lc = zip_l_buf[lx++] & 255;
        if((flag & 1) === 0) {
          zip_SEND_CODE(lc, ltree)
        }else {
          code = zip_length_code[lc];
          zip_SEND_CODE(code + zip_LITERALS + 1, ltree);
          extra = zip_extra_lbits[code];
          if(extra !== 0) {
            lc -= zip_base_length[code];
            zip_send_bits(lc, extra)
          }
          dist = zip_d_buf[dx++];
          code = zip_D_CODE(dist);
          zip_SEND_CODE(code, dtree);
          extra = zip_extra_dbits[code];
          if(extra !== 0) {
            dist -= zip_base_dist[code];
            zip_send_bits(dist, extra)
          }
        }
        flag >>= 1
      }while(lx < zip_last_lit)
    }
    zip_SEND_CODE(zip_END_BLOCK, ltree)
  };
  var zip_send_tree = function(tree, max_code) {
    var n;
    var prevlen = -1;
    var curlen;
    var nextlen = tree[0].dl;
    var count = 0;
    var max_count = 7;
    var min_count = 4;
    if(nextlen === 0) {
      max_count = 138;
      min_count = 3
    }
    for(n = 0;n <= max_code;n++) {
      curlen = nextlen;
      nextlen = tree[n + 1].dl;
      if(++count < max_count && curlen === nextlen) {
        continue
      }else {
        if(count < min_count) {
          do {
            zip_SEND_CODE(curlen, zip_bl_tree)
          }while(--count !== 0)
        }else {
          if(curlen !== 0) {
            if(curlen !== prevlen) {
              zip_SEND_CODE(curlen, zip_bl_tree);
              count--
            }
            zip_SEND_CODE(zip_REP_3_6, zip_bl_tree);
            zip_send_bits(count - 3, 2)
          }else {
            if(count <= 10) {
              zip_SEND_CODE(zip_REPZ_3_10, zip_bl_tree);
              zip_send_bits(count - 3, 3)
            }else {
              zip_SEND_CODE(zip_REPZ_11_138, zip_bl_tree);
              zip_send_bits(count - 11, 7)
            }
          }
        }
      }
      count = 0;
      prevlen = curlen;
      if(nextlen === 0) {
        max_count = 138;
        min_count = 3
      }else {
        if(curlen === nextlen) {
          max_count = 6;
          min_count = 3
        }else {
          max_count = 7;
          min_count = 4
        }
      }
    }
  };
  var zip_send_all_trees = function(lcodes, dcodes, blcodes) {
    var rank;
    zip_send_bits(lcodes - 257, 5);
    zip_send_bits(dcodes - 1, 5);
    zip_send_bits(blcodes - 4, 4);
    for(rank = 0;rank < blcodes;rank++) {
      zip_send_bits(zip_bl_tree[zip_bl_order[rank]].dl, 3)
    }
    zip_send_tree(zip_dyn_ltree, lcodes - 1);
    zip_send_tree(zip_dyn_dtree, dcodes - 1)
  };
  var zip_init_block = function() {
    var n;
    for(n = 0;n < zip_L_CODES;n++) {
      zip_dyn_ltree[n].fc = 0
    }
    for(n = 0;n < zip_D_CODES;n++) {
      zip_dyn_dtree[n].fc = 0
    }
    for(n = 0;n < zip_BL_CODES;n++) {
      zip_bl_tree[n].fc = 0
    }
    zip_dyn_ltree[zip_END_BLOCK].fc = 1;
    zip_opt_len = zip_static_len = 0;
    zip_last_lit = zip_last_dist = zip_last_flags = 0;
    zip_flags = 0;
    zip_flag_bit = 1
  };
  var zip_flush_block = function(eof) {
    var opt_lenb, static_lenb;
    var max_blindex;
    var stored_len;
    stored_len = zip_strstart - zip_block_start;
    zip_flag_buf[zip_last_flags] = zip_flags;
    zip_build_tree(zip_l_desc);
    zip_build_tree(zip_d_desc);
    max_blindex = zip_build_bl_tree();
    opt_lenb = zip_opt_len + 3 + 7 >> 3;
    static_lenb = zip_static_len + 3 + 7 >> 3;
    if(static_lenb <= opt_lenb) {
      opt_lenb = static_lenb
    }
    if(stored_len + 4 <= opt_lenb && zip_block_start >= 0) {
      var i;
      zip_send_bits((zip_STORED_BLOCK << 1) + eof, 3);
      zip_bi_windup();
      zip_put_short(stored_len);
      zip_put_short(~stored_len);
      for(i = 0;i < stored_len;i++) {
        zip_put_byte(zip_window[zip_block_start + i])
      }
    }else {
      if(static_lenb === opt_lenb) {
        zip_send_bits((zip_STATIC_TREES << 1) + eof, 3);
        zip_compress_block(zip_static_ltree, zip_static_dtree)
      }else {
        zip_send_bits((zip_DYN_TREES << 1) + eof, 3);
        zip_send_all_trees(zip_l_desc.max_code + 1, zip_d_desc.max_code + 1, max_blindex + 1);
        zip_compress_block(zip_dyn_ltree, zip_dyn_dtree)
      }
    }
    zip_init_block();
    if(eof !== 0) {
      zip_bi_windup()
    }
  };
  var zip_deflate_fast = function() {
    while(zip_lookahead !== 0 && zip_qhead === null) {
      var flush;
      zip_INSERT_STRING();
      if(zip_hash_head !== zip_NIL && zip_strstart - zip_hash_head <= zip_MAX_DIST) {
        zip_match_length = zip_longest_match(zip_hash_head);
        if(zip_match_length > zip_lookahead) {
          zip_match_length = zip_lookahead
        }
      }
      if(zip_match_length >= zip_MIN_MATCH) {
        flush = zip_ct_tally(zip_strstart - zip_match_start, zip_match_length - zip_MIN_MATCH);
        zip_lookahead -= zip_match_length;
        if(zip_match_length <= zip_max_lazy_match) {
          zip_match_length--;
          do {
            zip_strstart++;
            zip_INSERT_STRING()
          }while(--zip_match_length !== 0);
          zip_strstart++
        }else {
          zip_strstart += zip_match_length;
          zip_match_length = 0;
          zip_ins_h = zip_window[zip_strstart] & 255;
          zip_ins_h = (zip_ins_h << zip_H_SHIFT ^ zip_window[zip_strstart + 1] & 255) & zip_HASH_MASK
        }
      }else {
        flush = zip_ct_tally(0, zip_window[zip_strstart] & 255);
        zip_lookahead--;
        zip_strstart++
      }
      if(flush) {
        zip_flush_block(0);
        zip_block_start = zip_strstart
      }
      while(zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile) {
        zip_fill_window()
      }
    }
  };
  var zip_deflate_better = function() {
    while(zip_lookahead !== 0 && zip_qhead === null) {
      zip_INSERT_STRING();
      zip_prev_length = zip_match_length;
      zip_prev_match = zip_match_start;
      zip_match_length = zip_MIN_MATCH - 1;
      if(zip_hash_head !== zip_NIL && zip_prev_length < zip_max_lazy_match && zip_strstart - zip_hash_head <= zip_MAX_DIST) {
        zip_match_length = zip_longest_match(zip_hash_head);
        if(zip_match_length > zip_lookahead) {
          zip_match_length = zip_lookahead
        }
        if(zip_match_length === zip_MIN_MATCH && zip_strstart - zip_match_start > zip_TOO_FAR) {
          zip_match_length--
        }
      }
      if(zip_prev_length >= zip_MIN_MATCH && zip_match_length <= zip_prev_length) {
        var flush;
        flush = zip_ct_tally(zip_strstart - 1 - zip_prev_match, zip_prev_length - zip_MIN_MATCH);
        zip_lookahead -= zip_prev_length - 1;
        zip_prev_length -= 2;
        do {
          zip_strstart++;
          zip_INSERT_STRING()
        }while(--zip_prev_length !== 0);
        zip_match_available = 0;
        zip_match_length = zip_MIN_MATCH - 1;
        zip_strstart++;
        if(flush) {
          zip_flush_block(0);
          zip_block_start = zip_strstart
        }
      }else {
        if(zip_match_available !== 0) {
          if(zip_ct_tally(0, zip_window[zip_strstart - 1] & 255)) {
            zip_flush_block(0);
            zip_block_start = zip_strstart
          }
          zip_strstart++;
          zip_lookahead--
        }else {
          zip_match_available = 1;
          zip_strstart++;
          zip_lookahead--
        }
      }
      while(zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile) {
        zip_fill_window()
      }
    }
  };
  var zip_ct_init = function() {
    var n;
    var bits;
    var length;
    var code;
    var dist;
    if(zip_static_dtree[0].dl !== 0) {
      return
    }
    zip_l_desc.dyn_tree = zip_dyn_ltree;
    zip_l_desc.static_tree = zip_static_ltree;
    zip_l_desc.extra_bits = zip_extra_lbits;
    zip_l_desc.extra_base = zip_LITERALS + 1;
    zip_l_desc.elems = zip_L_CODES;
    zip_l_desc.max_length = zip_MAX_BITS;
    zip_l_desc.max_code = 0;
    zip_d_desc.dyn_tree = zip_dyn_dtree;
    zip_d_desc.static_tree = zip_static_dtree;
    zip_d_desc.extra_bits = zip_extra_dbits;
    zip_d_desc.extra_base = 0;
    zip_d_desc.elems = zip_D_CODES;
    zip_d_desc.max_length = zip_MAX_BITS;
    zip_d_desc.max_code = 0;
    zip_bl_desc.dyn_tree = zip_bl_tree;
    zip_bl_desc.static_tree = null;
    zip_bl_desc.extra_bits = zip_extra_blbits;
    zip_bl_desc.extra_base = 0;
    zip_bl_desc.elems = zip_BL_CODES;
    zip_bl_desc.max_length = zip_MAX_BL_BITS;
    zip_bl_desc.max_code = 0;
    length = 0;
    for(code = 0;code < zip_LENGTH_CODES - 1;code++) {
      zip_base_length[code] = length;
      for(n = 0;n < 1 << zip_extra_lbits[code];n++) {
        zip_length_code[length++] = code
      }
    }
    zip_length_code[length - 1] = code;
    dist = 0;
    for(code = 0;code < 16;code++) {
      zip_base_dist[code] = dist;
      for(n = 0;n < 1 << zip_extra_dbits[code];n++) {
        zip_dist_code[dist++] = code
      }
    }
    dist >>= 7;
    n = code;
    for(code = n;code < zip_D_CODES;code++) {
      zip_base_dist[code] = dist << 7;
      for(n = 0;n < 1 << zip_extra_dbits[code] - 7;n++) {
        zip_dist_code[256 + dist++] = code
      }
    }
    for(bits = 0;bits <= zip_MAX_BITS;bits++) {
      zip_bl_count[bits] = 0
    }
    n = 0;
    while(n <= 143) {
      zip_static_ltree[n++].dl = 8;
      zip_bl_count[8]++
    }
    while(n <= 255) {
      zip_static_ltree[n++].dl = 9;
      zip_bl_count[9]++
    }
    while(n <= 279) {
      zip_static_ltree[n++].dl = 7;
      zip_bl_count[7]++
    }
    while(n <= 287) {
      zip_static_ltree[n++].dl = 8;
      zip_bl_count[8]++
    }
    zip_gen_codes(zip_static_ltree, zip_L_CODES + 1);
    for(n = 0;n < zip_D_CODES;n++) {
      zip_static_dtree[n].dl = 5;
      zip_static_dtree[n].fc = zip_bi_reverse(n, 5)
    }
    zip_init_block()
  };
  var zip_init_deflate = function() {
    if(zip_eofile) {
      return
    }
    zip_bi_buf = 0;
    zip_bi_valid = 0;
    zip_ct_init();
    zip_lm_init();
    zip_qhead = null;
    zip_outcnt = 0;
    zip_outoff = 0;
    if(zip_compr_level <= 3) {
      zip_prev_length = zip_MIN_MATCH - 1;
      zip_match_length = 0
    }else {
      zip_match_length = zip_MIN_MATCH - 1;
      zip_match_available = 0
    }
    zip_complete = false
  };
  var zip_qcopy = function(buff, off, buff_size) {
    var n, i, j;
    n = 0;
    while(zip_qhead !== null && n < buff_size) {
      i = buff_size - n;
      if(i > zip_qhead.len) {
        i = zip_qhead.len
      }
      for(j = 0;j < i;j++) {
        buff[off + n + j] = zip_qhead.ptr[zip_qhead.off + j]
      }
      zip_qhead.off += i;
      zip_qhead.len -= i;
      n += i;
      if(zip_qhead.len === 0) {
        var p;
        p = zip_qhead;
        zip_qhead = zip_qhead.next;
        zip_reuse_queue(p)
      }
    }
    if(n === buff_size) {
      return n
    }
    if(zip_outoff < zip_outcnt) {
      i = buff_size - n;
      if(i > zip_outcnt - zip_outoff) {
        i = zip_outcnt - zip_outoff
      }
      for(j = 0;j < i;j++) {
        buff[off + n + j] = zip_outbuf[zip_outoff + j]
      }
      zip_outoff += i;
      n += i;
      if(zip_outcnt === zip_outoff) {
        zip_outcnt = zip_outoff = 0
      }
    }
    return n
  };
  var zip_deflate_internal = function(buff, off, buff_size) {
    var n;
    if(!zip_initflag) {
      zip_init_deflate();
      zip_initflag = true;
      if(zip_lookahead === 0) {
        zip_complete = true;
        return 0
      }
    }
    if((n = zip_qcopy(buff, off, buff_size)) === buff_size) {
      return buff_size
    }
    if(zip_complete) {
      return n
    }
    if(zip_compr_level <= 3) {
      zip_deflate_fast()
    }else {
      zip_deflate_better()
    }
    if(zip_lookahead === 0) {
      if(zip_match_available !== 0) {
        zip_ct_tally(0, zip_window[zip_strstart - 1] & 255)
      }
      zip_flush_block(1);
      zip_complete = true
    }
    return n + zip_qcopy(buff, n + off, buff_size - n)
  };
  var zip_deflate = function(str, level) {
    var i, j;
    zip_deflate_data = str;
    zip_deflate_pos = 0;
    if(String(typeof level) === "undefined") {
      level = zip_DEFAULT_LEVEL
    }
    zip_deflate_start(level);
    var buff = new Array(1024);
    var aout = [];
    while((i = zip_deflate_internal(buff, 0, buff.length)) > 0) {
      var cbuf = [];
      cbuf.length = i;
      for(j = 0;j < i;j++) {
        cbuf[j] = String.fromCharCode(buff[j])
      }
      aout[aout.length] = cbuf.join("")
    }
    zip_deflate_data = null;
    return aout.join("")
  };
  this.deflate = zip_deflate
};
core.ByteArray = function ByteArray(data) {
  this.pos = 0;
  this.data = data;
  this.readUInt32LE = function() {
    var data = this.data, pos = this.pos += 4;
    return data[--pos] << 24 | data[--pos] << 16 | data[--pos] << 8 | data[--pos]
  };
  this.readUInt16LE = function() {
    var data = this.data, pos = this.pos += 2;
    return data[--pos] << 8 | data[--pos]
  }
};
core.ByteArrayWriter = function ByteArrayWriter(encoding) {
  var self = this, data = new runtime.ByteArray(0);
  this.appendByteArrayWriter = function(writer) {
    data = runtime.concatByteArrays(data, writer.getByteArray())
  };
  this.appendByteArray = function(array) {
    data = runtime.concatByteArrays(data, array)
  };
  this.appendArray = function(array) {
    data = runtime.concatByteArrays(data, runtime.byteArrayFromArray(array))
  };
  this.appendUInt16LE = function(value) {
    self.appendArray([value & 255, value >> 8 & 255])
  };
  this.appendUInt32LE = function(value) {
    self.appendArray([value & 255, value >> 8 & 255, value >> 16 & 255, value >> 24 & 255])
  };
  this.appendString = function(string) {
    data = runtime.concatByteArrays(data, runtime.byteArrayFromString(string, encoding))
  };
  this.getLength = function() {
    return data.length
  };
  this.getByteArray = function() {
    return data
  }
};
core.RawInflate = function RawInflate() {
  var zip_WSIZE = 32768;
  var zip_STORED_BLOCK = 0;
  var zip_STATIC_TREES = 1;
  var zip_DYN_TREES = 2;
  var zip_lbits = 9;
  var zip_dbits = 6;
  var zip_INBUFSIZ = 32768;
  var zip_INBUF_EXTRA = 64;
  var zip_slide;
  var zip_wp;
  var zip_fixed_tl = null;
  var zip_fixed_td;
  var zip_fixed_bl, fixed_bd;
  var zip_bit_buf;
  var zip_bit_len;
  var zip_method;
  var zip_eof;
  var zip_copy_leng;
  var zip_copy_dist;
  var zip_tl, zip_td;
  var zip_bl, zip_bd;
  var zip_inflate_data;
  var zip_inflate_pos;
  var zip_MASK_BITS = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535);
  var zip_cplens = new Array(3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0);
  var zip_cplext = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99);
  var zip_cpdist = new Array(1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577);
  var zip_cpdext = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13);
  var zip_border = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);
  var zip_HuftList = function() {
    this.next = null;
    this.list = null
  };
  var zip_HuftNode = function() {
    this.e = 0;
    this.b = 0;
    this.n = 0;
    this.t = null
  };
  var zip_HuftBuild = function(b, n, s, d, e, mm) {
    this.BMAX = 16;
    this.N_MAX = 288;
    this.status = 0;
    this.root = null;
    this.m = 0;
    var a;
    var c = new Array(this.BMAX + 1);
    var el;
    var f;
    var g;
    var h;
    var i;
    var j;
    var k;
    var lx = new Array(this.BMAX + 1);
    var p;
    var pidx;
    var q;
    var r = new zip_HuftNode;
    var u = new Array(this.BMAX);
    var v = new Array(this.N_MAX);
    var w;
    var x = new Array(this.BMAX + 1);
    var xp;
    var y;
    var z;
    var o;
    var tail;
    tail = this.root = null;
    for(i = 0;i < c.length;i++) {
      c[i] = 0
    }
    for(i = 0;i < lx.length;i++) {
      lx[i] = 0
    }
    for(i = 0;i < u.length;i++) {
      u[i] = null
    }
    for(i = 0;i < v.length;i++) {
      v[i] = 0
    }
    for(i = 0;i < x.length;i++) {
      x[i] = 0
    }
    el = n > 256 ? b[256] : this.BMAX;
    p = b;
    pidx = 0;
    i = n;
    do {
      c[p[pidx]]++;
      pidx++
    }while(--i > 0);
    if(c[0] == n) {
      this.root = null;
      this.m = 0;
      this.status = 0;
      return
    }
    for(j = 1;j <= this.BMAX;j++) {
      if(c[j] != 0) {
        break
      }
    }
    k = j;
    if(mm < j) {
      mm = j
    }
    for(i = this.BMAX;i != 0;i--) {
      if(c[i] != 0) {
        break
      }
    }
    g = i;
    if(mm > i) {
      mm = i
    }
    for(y = 1 << j;j < i;j++, y <<= 1) {
      if((y -= c[j]) < 0) {
        this.status = 2;
        this.m = mm;
        return
      }
    }
    if((y -= c[i]) < 0) {
      this.status = 2;
      this.m = mm;
      return
    }
    c[i] += y;
    x[1] = j = 0;
    p = c;
    pidx = 1;
    xp = 2;
    while(--i > 0) {
      x[xp++] = j += p[pidx++]
    }
    p = b;
    pidx = 0;
    i = 0;
    do {
      if((j = p[pidx++]) != 0) {
        v[x[j]++] = i
      }
    }while(++i < n);
    n = x[g];
    x[0] = i = 0;
    p = v;
    pidx = 0;
    h = -1;
    w = lx[0] = 0;
    q = null;
    z = 0;
    for(;k <= g;k++) {
      a = c[k];
      while(a-- > 0) {
        while(k > w + lx[1 + h]) {
          w += lx[1 + h];
          h++;
          z = (z = g - w) > mm ? mm : z;
          if((f = 1 << (j = k - w)) > a + 1) {
            f -= a + 1;
            xp = k;
            while(++j < z) {
              if((f <<= 1) <= c[++xp]) {
                break
              }
              f -= c[xp]
            }
          }
          if(w + j > el && w < el) {
            j = el - w
          }
          z = 1 << j;
          lx[1 + h] = j;
          q = new Array(z);
          for(o = 0;o < z;o++) {
            q[o] = new zip_HuftNode
          }
          if(tail == null) {
            tail = this.root = new zip_HuftList
          }else {
            tail = tail.next = new zip_HuftList
          }
          tail.next = null;
          tail.list = q;
          u[h] = q;
          if(h > 0) {
            x[h] = i;
            r.b = lx[h];
            r.e = 16 + j;
            r.t = q;
            j = (i & (1 << w) - 1) >> w - lx[h];
            u[h - 1][j].e = r.e;
            u[h - 1][j].b = r.b;
            u[h - 1][j].n = r.n;
            u[h - 1][j].t = r.t
          }
        }
        r.b = k - w;
        if(pidx >= n) {
          r.e = 99
        }else {
          if(p[pidx] < s) {
            r.e = p[pidx] < 256 ? 16 : 15;
            r.n = p[pidx++]
          }else {
            r.e = e[p[pidx] - s];
            r.n = d[p[pidx++] - s]
          }
        }
        f = 1 << k - w;
        for(j = i >> w;j < z;j += f) {
          q[j].e = r.e;
          q[j].b = r.b;
          q[j].n = r.n;
          q[j].t = r.t
        }
        for(j = 1 << k - 1;(i & j) != 0;j >>= 1) {
          i ^= j
        }
        i ^= j;
        while((i & (1 << w) - 1) != x[h]) {
          w -= lx[h];
          h--
        }
      }
    }
    this.m = lx[1];
    this.status = y != 0 && g != 1 ? 1 : 0
  };
  var zip_GET_BYTE = function() {
    if(zip_inflate_data.length == zip_inflate_pos) {
      return-1
    }
    return zip_inflate_data[zip_inflate_pos++]
  };
  var zip_NEEDBITS = function(n) {
    while(zip_bit_len < n) {
      zip_bit_buf |= zip_GET_BYTE() << zip_bit_len;
      zip_bit_len += 8
    }
  };
  var zip_GETBITS = function(n) {
    return zip_bit_buf & zip_MASK_BITS[n]
  };
  var zip_DUMPBITS = function(n) {
    zip_bit_buf >>= n;
    zip_bit_len -= n
  };
  var zip_inflate_codes = function(buff, off, size) {
    var e;
    var t;
    var n;
    if(size == 0) {
      return 0
    }
    n = 0;
    for(;;) {
      zip_NEEDBITS(zip_bl);
      t = zip_tl.list[zip_GETBITS(zip_bl)];
      e = t.e;
      while(e > 16) {
        if(e == 99) {
          return-1
        }
        zip_DUMPBITS(t.b);
        e -= 16;
        zip_NEEDBITS(e);
        t = t.t[zip_GETBITS(e)];
        e = t.e
      }
      zip_DUMPBITS(t.b);
      if(e == 16) {
        zip_wp &= zip_WSIZE - 1;
        buff[off + n++] = zip_slide[zip_wp++] = t.n;
        if(n == size) {
          return size
        }
        continue
      }
      if(e == 15) {
        break
      }
      zip_NEEDBITS(e);
      zip_copy_leng = t.n + zip_GETBITS(e);
      zip_DUMPBITS(e);
      zip_NEEDBITS(zip_bd);
      t = zip_td.list[zip_GETBITS(zip_bd)];
      e = t.e;
      while(e > 16) {
        if(e == 99) {
          return-1
        }
        zip_DUMPBITS(t.b);
        e -= 16;
        zip_NEEDBITS(e);
        t = t.t[zip_GETBITS(e)];
        e = t.e
      }
      zip_DUMPBITS(t.b);
      zip_NEEDBITS(e);
      zip_copy_dist = zip_wp - t.n - zip_GETBITS(e);
      zip_DUMPBITS(e);
      while(zip_copy_leng > 0 && n < size) {
        zip_copy_leng--;
        zip_copy_dist &= zip_WSIZE - 1;
        zip_wp &= zip_WSIZE - 1;
        buff[off + n++] = zip_slide[zip_wp++] = zip_slide[zip_copy_dist++]
      }
      if(n == size) {
        return size
      }
    }
    zip_method = -1;
    return n
  };
  var zip_inflate_stored = function(buff, off, size) {
    var n;
    n = zip_bit_len & 7;
    zip_DUMPBITS(n);
    zip_NEEDBITS(16);
    n = zip_GETBITS(16);
    zip_DUMPBITS(16);
    zip_NEEDBITS(16);
    if(n != (~zip_bit_buf & 65535)) {
      return-1
    }
    zip_DUMPBITS(16);
    zip_copy_leng = n;
    n = 0;
    while(zip_copy_leng > 0 && n < size) {
      zip_copy_leng--;
      zip_wp &= zip_WSIZE - 1;
      zip_NEEDBITS(8);
      buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
      zip_DUMPBITS(8)
    }
    if(zip_copy_leng == 0) {
      zip_method = -1
    }
    return n
  };
  var zip_fixed_bd;
  var zip_inflate_fixed = function(buff, off, size) {
    if(zip_fixed_tl == null) {
      var i;
      var l = new Array(288);
      var h;
      for(i = 0;i < 144;i++) {
        l[i] = 8
      }
      for(;i < 256;i++) {
        l[i] = 9
      }
      for(;i < 280;i++) {
        l[i] = 7
      }
      for(;i < 288;i++) {
        l[i] = 8
      }
      zip_fixed_bl = 7;
      h = new zip_HuftBuild(l, 288, 257, zip_cplens, zip_cplext, zip_fixed_bl);
      if(h.status != 0) {
        alert("HufBuild error: " + h.status);
        return-1
      }
      zip_fixed_tl = h.root;
      zip_fixed_bl = h.m;
      for(i = 0;i < 30;i++) {
        l[i] = 5
      }
      zip_fixed_bd = 5;
      h = new zip_HuftBuild(l, 30, 0, zip_cpdist, zip_cpdext, zip_fixed_bd);
      if(h.status > 1) {
        zip_fixed_tl = null;
        alert("HufBuild error: " + h.status);
        return-1
      }
      zip_fixed_td = h.root;
      zip_fixed_bd = h.m
    }
    zip_tl = zip_fixed_tl;
    zip_td = zip_fixed_td;
    zip_bl = zip_fixed_bl;
    zip_bd = zip_fixed_bd;
    return zip_inflate_codes(buff, off, size)
  };
  var zip_inflate_dynamic = function(buff, off, size) {
    var i;
    var j;
    var l;
    var n;
    var t;
    var nb;
    var nl;
    var nd;
    var ll = new Array(286 + 30);
    var h;
    for(i = 0;i < ll.length;i++) {
      ll[i] = 0
    }
    zip_NEEDBITS(5);
    nl = 257 + zip_GETBITS(5);
    zip_DUMPBITS(5);
    zip_NEEDBITS(5);
    nd = 1 + zip_GETBITS(5);
    zip_DUMPBITS(5);
    zip_NEEDBITS(4);
    nb = 4 + zip_GETBITS(4);
    zip_DUMPBITS(4);
    if(nl > 286 || nd > 30) {
      return-1
    }
    for(j = 0;j < nb;j++) {
      zip_NEEDBITS(3);
      ll[zip_border[j]] = zip_GETBITS(3);
      zip_DUMPBITS(3)
    }
    for(;j < 19;j++) {
      ll[zip_border[j]] = 0
    }
    zip_bl = 7;
    h = new zip_HuftBuild(ll, 19, 19, null, null, zip_bl);
    if(h.status != 0) {
      return-1
    }
    zip_tl = h.root;
    zip_bl = h.m;
    n = nl + nd;
    i = l = 0;
    while(i < n) {
      zip_NEEDBITS(zip_bl);
      t = zip_tl.list[zip_GETBITS(zip_bl)];
      j = t.b;
      zip_DUMPBITS(j);
      j = t.n;
      if(j < 16) {
        ll[i++] = l = j
      }else {
        if(j == 16) {
          zip_NEEDBITS(2);
          j = 3 + zip_GETBITS(2);
          zip_DUMPBITS(2);
          if(i + j > n) {
            return-1
          }
          while(j-- > 0) {
            ll[i++] = l
          }
        }else {
          if(j == 17) {
            zip_NEEDBITS(3);
            j = 3 + zip_GETBITS(3);
            zip_DUMPBITS(3);
            if(i + j > n) {
              return-1
            }
            while(j-- > 0) {
              ll[i++] = 0
            }
            l = 0
          }else {
            zip_NEEDBITS(7);
            j = 11 + zip_GETBITS(7);
            zip_DUMPBITS(7);
            if(i + j > n) {
              return-1
            }
            while(j-- > 0) {
              ll[i++] = 0
            }
            l = 0
          }
        }
      }
    }
    zip_bl = zip_lbits;
    h = new zip_HuftBuild(ll, nl, 257, zip_cplens, zip_cplext, zip_bl);
    if(zip_bl == 0) {
      h.status = 1
    }
    if(h.status != 0) {
      return-1
    }
    zip_tl = h.root;
    zip_bl = h.m;
    for(i = 0;i < nd;i++) {
      ll[i] = ll[i + nl]
    }
    zip_bd = zip_dbits;
    h = new zip_HuftBuild(ll, nd, 0, zip_cpdist, zip_cpdext, zip_bd);
    zip_td = h.root;
    zip_bd = h.m;
    if(zip_bd == 0 && nl > 257) {
      return-1
    }
    if(h.status != 0) {
      return-1
    }
    return zip_inflate_codes(buff, off, size)
  };
  var zip_inflate_start = function() {
    var i;
    if(zip_slide == null) {
      zip_slide = new Array(2 * zip_WSIZE)
    }
    zip_wp = 0;
    zip_bit_buf = 0;
    zip_bit_len = 0;
    zip_method = -1;
    zip_eof = false;
    zip_copy_leng = zip_copy_dist = 0;
    zip_tl = null
  };
  var zip_inflate_internal = function(buff, off, size) {
    var n, i;
    n = 0;
    while(n < size) {
      if(zip_eof && zip_method == -1) {
        return n
      }
      if(zip_copy_leng > 0) {
        if(zip_method != zip_STORED_BLOCK) {
          while(zip_copy_leng > 0 && n < size) {
            zip_copy_leng--;
            zip_copy_dist &= zip_WSIZE - 1;
            zip_wp &= zip_WSIZE - 1;
            buff[off + n++] = zip_slide[zip_wp++] = zip_slide[zip_copy_dist++]
          }
        }else {
          while(zip_copy_leng > 0 && n < size) {
            zip_copy_leng--;
            zip_wp &= zip_WSIZE - 1;
            zip_NEEDBITS(8);
            buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
            zip_DUMPBITS(8)
          }
          if(zip_copy_leng == 0) {
            zip_method = -1
          }
        }
        if(n == size) {
          return n
        }
      }
      if(zip_method == -1) {
        if(zip_eof) {
          break
        }
        zip_NEEDBITS(1);
        if(zip_GETBITS(1) != 0) {
          zip_eof = true
        }
        zip_DUMPBITS(1);
        zip_NEEDBITS(2);
        zip_method = zip_GETBITS(2);
        zip_DUMPBITS(2);
        zip_tl = null;
        zip_copy_leng = 0
      }
      switch(zip_method) {
        case 0:
          i = zip_inflate_stored(buff, off + n, size - n);
          break;
        case 1:
          if(zip_tl != null) {
            i = zip_inflate_codes(buff, off + n, size - n)
          }else {
            i = zip_inflate_fixed(buff, off + n, size - n)
          }
          break;
        case 2:
          if(zip_tl != null) {
            i = zip_inflate_codes(buff, off + n, size - n)
          }else {
            i = zip_inflate_dynamic(buff, off + n, size - n)
          }
          break;
        default:
          i = -1;
          break
      }
      if(i == -1) {
        if(zip_eof) {
          return 0
        }
        return-1
      }
      n += i
    }
    return n
  };
  var zip_inflate = function(data, size) {
    var i, j;
    zip_inflate_start();
    zip_inflate_data = data;
    zip_inflate_pos = 0;
    var buff = new runtime.ByteArray(size);
    zip_inflate_internal(buff, 0, size);
    zip_inflate_data = null;
    return buff
  };
  this.inflate = zip_inflate
};
core.Selection = function Selection(domDocument) {
  var self = this, ranges = [];
  this.getRangeAt = function(i) {
    return ranges[i]
  };
  this.addRange = function(range) {
    if(ranges.length === 0) {
      self.focusNode = range.startContainer;
      self.focusOffset = range.startOffset
    }
    ranges.push(range);
    self.rangeCount += 1
  };
  this.removeAllRanges = function() {
    ranges = [];
    self.rangeCount = 0;
    self.focusNode = null;
    self.focusOffset = 0
  };
  this.collapse = function(node, offset) {
    runtime.assert(offset >= 0, "invalid offset " + offset + " in Selection.collapse");
    ranges.length = self.rangeCount = 1;
    var range = ranges[0];
    if(!range) {
      ranges[0] = range = domDocument.createRange()
    }
    range.setStart(node, offset);
    range.collapse(true);
    self.focusNode = node;
    self.focusOffset = offset
  };
  this.extend = function(node, offset) {
  };
  this.rangeCount = 0;
  this.focusNode = null;
  this.focusOffset = 0
};
core.LoopWatchDog = function LoopWatchDog(timeout, maxChecks) {
  var startTime = Date.now(), checks = 0;
  function check() {
    var t;
    if(timeout) {
      t = Date.now();
      if(t - startTime > timeout) {
        runtime.log("alert", "watchdog timeout");
        throw"timeout!";
      }
    }
    if(maxChecks > 0) {
      checks += 1;
      if(checks > maxChecks) {
        runtime.log("alert", "watchdog loop overflow");
        throw"loop overflow";
      }
    }
  }
  this.check = check
};
runtime.loadClass("core.Selection");
core.Cursor = function Cursor(selection, document) {
  var self = this, cursorNode, cursorTextNode;
  function putCursorIntoTextNode(container, offset) {
    var parent = container.parentNode;
    if(offset > 0) {
      cursorTextNode.data = container.substringData(0, offset);
      container.deleteData(0, offset);
      parent.insertBefore(cursorTextNode, container)
    }
    parent.insertBefore(cursorNode, container)
  }
  function putCursorIntoContainer(container, offset) {
    var node = container.firstChild;
    while(node !== null && offset > 0) {
      node = node.nextSibling;
      offset -= 1
    }
    container.insertBefore(cursorNode, node)
  }
  function removeCursor(onCursorRemove) {
    var t = cursorNode.nextSibling, textNodeIncrease = 0;
    if(cursorTextNode.parentNode) {
      cursorTextNode.parentNode.removeChild(cursorTextNode);
      if(t && t.nodeType === 3) {
        t.insertData(0, cursorTextNode.nodeValue);
        textNodeIncrease = cursorTextNode.length
      }
    }
    onCursorRemove(t, textNodeIncrease);
    if(cursorNode.parentNode) {
      cursorNode.parentNode.removeChild(cursorNode)
    }
  }
  function putCursor(container, offset, onCursorAdd) {
    var text, element;
    if(container.nodeType === 3) {
      text = container;
      putCursorIntoTextNode(text, offset);
      onCursorAdd(cursorNode.nextSibling, offset)
    }else {
      if(container.nodeType === 1) {
        element = container;
        putCursorIntoContainer(element, offset);
        onCursorAdd(cursorNode.nextSibling, 0)
      }
    }
  }
  this.getNode = function() {
    return cursorNode
  };
  this.getSelection = function() {
    return selection
  };
  this.updateToSelection = function(onCursorRemove, onCursorAdd) {
    var range;
    removeCursor(onCursorRemove);
    if(selection.focusNode) {
      putCursor(selection.focusNode, selection.focusOffset, onCursorAdd)
    }
  };
  this.remove = function(onCursorRemove) {
    removeCursor(onCursorRemove)
  };
  function init() {
    var cursorns = "urn:webodf:names:cursor";
    cursorNode = document.createElementNS(cursorns, "cursor");
    cursorTextNode = document.createTextNode("")
  }
  init()
};
core.EditInfo = function EditInfo(container, odtDocument) {
  var self = this, editInfoNode, editHistory = {};
  function sortEdits() {
    var arr = [], memberid;
    for(memberid in editHistory) {
      if(editHistory.hasOwnProperty(memberid)) {
        arr.push({"memberid":memberid, "time":editHistory[memberid].time})
      }
    }
    arr.sort(function(a, b) {
      return a.time - b.time
    });
    return arr
  }
  this.getNode = function() {
    return editInfoNode
  };
  this.getOdtDocument = function() {
    return odtDocument
  };
  this.getEdits = function() {
    return editHistory
  };
  this.getSortedEdits = function() {
    return sortEdits()
  };
  this.addEdit = function(memberid, timestamp) {
    var id, userid = memberid.split("___")[0];
    if(!editHistory[memberid]) {
      for(id in editHistory) {
        if(editHistory.hasOwnProperty(id)) {
          if(id.split("___")[0] === userid) {
            delete editHistory[id];
            break
          }
        }
      }
    }
    editHistory[memberid] = {time:timestamp}
  };
  this.clearEdits = function() {
    editHistory = {}
  };
  function init() {
    var editInfons = "urn:webodf:names:editinfo", dom = odtDocument.getDOM();
    editInfoNode = dom.createElementNS(editInfons, "editinfo");
    container.insertBefore(editInfoNode, container.firstChild)
  }
  init()
};
core.UnitTest = function UnitTest() {
};
core.UnitTest.prototype.setUp = function() {
};
core.UnitTest.prototype.tearDown = function() {
};
core.UnitTest.prototype.description = function() {
};
core.UnitTest.prototype.tests = function() {
};
core.UnitTest.prototype.asyncTests = function() {
};
core.UnitTest.provideTestAreaDiv = function() {
  var maindoc = runtime.getWindow().document, testarea = maindoc.getElementById("testarea");
  runtime.assert(!testarea, 'Unclean test environment, found a div with id "testarea".');
  testarea = maindoc.createElement("div");
  testarea.setAttribute("id", "testarea");
  maindoc.body.appendChild(testarea);
  return testarea
};
core.UnitTest.cleanupTestAreaDiv = function() {
  var maindoc = runtime.getWindow().document, testarea = maindoc.getElementById("testarea");
  runtime.assert(!!testarea && testarea.parentNode === maindoc.body, 'Test environment broken, found no div with id "testarea" below body.');
  maindoc.body.removeChild(testarea)
};
core.UnitTestRunner = function UnitTestRunner() {
  var failedTests = 0;
  function debug(msg) {
    runtime.log(msg)
  }
  function testFailed(msg) {
    failedTests += 1;
    runtime.log("fail", msg)
  }
  function testPassed(msg) {
    runtime.log("pass", msg)
  }
  function areArraysEqual(a, b) {
    var i;
    try {
      if(a.length !== b.length) {
        return false
      }
      for(i = 0;i < a.length;i += 1) {
        if(a[i] !== b[i]) {
          return false
        }
      }
    }catch(ex) {
      return false
    }
    return true
  }
  function isResultCorrect(actual, expected) {
    if(expected === 0) {
      return actual === expected && 1 / actual === 1 / expected
    }
    if(actual === expected) {
      return true
    }
    if(typeof expected === "number" && isNaN(expected)) {
      return typeof actual === "number" && isNaN(actual)
    }
    if(Object.prototype.toString.call(expected) === Object.prototype.toString.call([])) {
      return areArraysEqual(actual, expected)
    }
    return false
  }
  function stringify(v) {
    if(v === 0 && 1 / v < 0) {
      return"-0"
    }
    return String(v)
  }
  function shouldBe(t, a, b) {
    if(typeof a !== "string" || typeof b !== "string") {
      debug("WARN: shouldBe() expects string arguments")
    }
    var exception, av, bv;
    try {
      av = eval(a)
    }catch(e) {
      exception = e
    }
    bv = eval(b);
    if(exception) {
      testFailed(a + " should be " + bv + ". Threw exception " + exception)
    }else {
      if(isResultCorrect(av, bv)) {
        testPassed(a + " is " + b)
      }else {
        if(String(typeof av) === String(typeof bv)) {
          testFailed(a + " should be " + bv + ". Was " + stringify(av) + ".")
        }else {
          testFailed(a + " should be " + bv + " (of type " + typeof bv + "). Was " + av + " (of type " + typeof av + ").")
        }
      }
    }
  }
  function shouldBeNonNull(t, a) {
    var exception, av;
    try {
      av = eval(a)
    }catch(e) {
      exception = e
    }
    if(exception) {
      testFailed(a + " should be non-null. Threw exception " + exception)
    }else {
      if(av !== null) {
        testPassed(a + " is non-null.")
      }else {
        testFailed(a + " should be non-null. Was " + av)
      }
    }
  }
  function shouldBeNull(t, a) {
    shouldBe(t, a, "null")
  }
  this.shouldBeNull = shouldBeNull;
  this.shouldBeNonNull = shouldBeNonNull;
  this.shouldBe = shouldBe;
  this.countFailedTests = function() {
    return failedTests
  }
};
core.UnitTester = function UnitTester() {
  var failedTests = 0, results = {};
  this.runTests = function(TestClass, callback) {
    var testName = Runtime.getFunctionName(TestClass), tname, runner = new core.UnitTestRunner, test = new TestClass(runner), testResults = {}, i, t, tests, lastFailCount;
    if(results.hasOwnProperty(testName)) {
      runtime.log("Test " + testName + " has already run.");
      return
    }
    runtime.log("Running " + testName + ": " + test.description());
    tests = test.tests();
    for(i = 0;i < tests.length;i += 1) {
      t = tests[i];
      tname = Runtime.getFunctionName(t);
      runtime.log("Running " + tname);
      lastFailCount = runner.countFailedTests();
      test.setUp();
      t();
      test.tearDown();
      testResults[tname] = lastFailCount === runner.countFailedTests()
    }
    function runAsyncTests(todo) {
      if(todo.length === 0) {
        results[testName] = testResults;
        failedTests += runner.countFailedTests();
        callback();
        return
      }
      t = todo[0];
      var tname = Runtime.getFunctionName(t);
      runtime.log("Running " + tname);
      lastFailCount = runner.countFailedTests();
      test.setUp();
      t(function() {
        test.tearDown();
        testResults[tname] = lastFailCount === runner.countFailedTests();
        runAsyncTests(todo.slice(1))
      })
    }
    runAsyncTests(test.asyncTests())
  };
  this.countFailedTests = function() {
    return failedTests
  };
  this.results = function() {
    return results
  }
};
core.PositionIterator = function PositionIterator(root, whatToShow, filter, expandEntityReferences) {
  function EmptyTextNodeFilter() {
    this.acceptNode = function(node) {
      if(node.nodeType === 3 && node.length === 0) {
        return 2
      }
      return 1
    }
  }
  function FilteredEmptyTextNodeFilter(filter) {
    this.acceptNode = function(node) {
      if(node.nodeType === 3 && node.length === 0) {
        return 2
      }
      return filter.acceptNode(node)
    }
  }
  var self = this, walker, currentPos;
  this.nextPosition = function() {
    if(walker.currentNode === root) {
      return false
    }
    if(currentPos === 0 && walker.currentNode.nodeType === 1) {
      if(walker.firstChild() === null) {
        currentPos = 1
      }
    }else {
      if(walker.currentNode.nodeType === 3 && currentPos + 1 < walker.currentNode.length) {
        currentPos += 1
      }else {
        if(walker.nextSibling() !== null) {
          currentPos = 0
        }else {
          walker.parentNode();
          currentPos = 1
        }
      }
    }
    return true
  };
  function setAtEnd() {
    var type = walker.currentNode.nodeType;
    if(type === 3) {
      currentPos = walker.currentNode.length - 1
    }else {
      currentPos = type === 1 ? 1 : 0
    }
  }
  this.previousPosition = function() {
    var moved = true;
    if(currentPos === 0) {
      if(walker.previousSibling() === null) {
        walker.parentNode();
        if(walker.currentNode === root) {
          walker.firstChild();
          return false
        }
        currentPos = 0
      }else {
        setAtEnd()
      }
    }else {
      if(walker.currentNode.nodeType === 3) {
        currentPos -= 1
      }else {
        if(walker.lastChild() !== null) {
          setAtEnd()
        }else {
          if(walker.currentNode === root) {
            moved = false
          }else {
            currentPos = 0
          }
        }
      }
    }
    return moved
  };
  this.container = function() {
    var n = walker.currentNode, t = n.nodeType;
    if(currentPos === 0 && t !== 3) {
      return n.parentNode
    }
    return n
  };
  this.offset = function() {
    if(walker.currentNode.nodeType === 3) {
      return currentPos
    }
    var c = 0, startNode = walker.currentNode, n, nextNode;
    if(currentPos === 1) {
      n = walker.lastChild()
    }else {
      n = walker.previousSibling()
    }
    while(n) {
      if(n.nodeType !== 3 || n.nextSibling !== nextNode || nextNode.nodeType !== 3) {
        c += 1
      }
      nextNode = n;
      n = walker.previousSibling()
    }
    walker.currentNode = startNode;
    return c
  };
  this.domOffset = function() {
    if(walker.currentNode.nodeType === 3) {
      return currentPos
    }
    var c = 0, startNode = walker.currentNode, n;
    if(currentPos === 1) {
      n = walker.lastChild()
    }else {
      n = walker.previousSibling()
    }
    while(n) {
      c += 1;
      n = walker.previousSibling()
    }
    walker.currentNode = startNode;
    return c
  };
  this.unfilteredDomOffset = function() {
    if(walker.currentNode.nodeType === 3) {
      return currentPos
    }
    var c = 0, n = walker.currentNode;
    if(currentPos === 1) {
      n = n.lastChild
    }else {
      n = n.previousSibling
    }
    while(n) {
      c += 1;
      n = n.previousSibling
    }
    return c
  };
  this.textOffset = function() {
    if(walker.currentNode.nodeType !== 3) {
      return 0
    }
    var offset = currentPos, n = walker.currentNode;
    while(walker.previousSibling() && walker.currentNode.nodeType === 3) {
      offset += walker.currentNode.length
    }
    walker.currentNode = n;
    return offset
  };
  this.substr = function(start, length) {
    var n = walker.currentNode, t, data = "";
    if(n.nodeType !== 3) {
      return data
    }
    while(walker.previousSibling()) {
      if(walker.currentNode.nodeType !== 3) {
        walker.nextSibling();
        break
      }
    }
    do {
      data += walker.currentNode.data
    }while(walker.nextSibling() && walker.currentNode.nodeType === 3);
    walker.currentNode = n;
    return data.substr(start, length)
  };
  this.setPosition = function(container, offset) {
    runtime.assert(container !== null, "PositionIterator.setPosition called with container===null");
    walker.currentNode = container;
    if(container.nodeType === 3) {
      currentPos = offset;
      if(offset > container.length) {
        throw"Error in setPosition: " + offset + " > " + container.length;
      }else {
        if(offset < 0) {
          throw"Error in setPosition: " + offset + " < 0";
        }
      }
      if(offset === container.length) {
        if(walker.nextSibling()) {
          currentPos = 0
        }else {
          if(walker.parentNode()) {
            currentPos = 1
          }else {
            throw"Error in setPosition: position not valid.";
          }
        }
      }
      return true
    }
    var o = offset, n = walker.firstChild(), prevNode;
    while(offset > 0 && n) {
      offset -= 1;
      prevNode = n;
      n = walker.nextSibling();
      while(n && n.nodeType === 3 && prevNode.nodeType === 3 && n.previousSibling === prevNode) {
        prevNode = n;
        n = walker.nextSibling()
      }
    }
    if(offset !== 0) {
      throw"Error in setPosition: offset " + o + " is out of range.";
    }
    if(n === null) {
      walker.currentNode = container;
      currentPos = 1
    }else {
      currentPos = 0
    }
    return true
  };
  this.moveToEnd = function() {
    walker.currentNode = root;
    currentPos = 1
  };
  function init() {
    var f, acceptNode;
    if(filter) {
      f = new FilteredEmptyTextNodeFilter(filter)
    }else {
      f = new EmptyTextNodeFilter
    }
    acceptNode = f.acceptNode;
    acceptNode.acceptNode = acceptNode;
    whatToShow = whatToShow || 4294967295;
    walker = root.ownerDocument.createTreeWalker(root, whatToShow, acceptNode, expandEntityReferences);
    currentPos = 0;
    if(walker.firstChild() === null) {
      currentPos = 1
    }
  }
  init()
};
runtime.loadClass("core.PositionIterator");
core.PositionFilter = function PositionFilter() {
};
core.PositionFilter.FilterResult = {FILTER_ACCEPT:1, FILTER_REJECT:2, FILTER_SKIP:3};
core.PositionFilter.prototype.acceptPosition = function(point) {
};
(function() {
  return core.PositionFilter
})();
core.Async = function Async() {
  this.forEach = function(items, f, callback) {
    var i, l = items.length, itemsDone = 0;
    function end(err) {
      if(itemsDone !== l) {
        if(err) {
          itemsDone = l;
          callback(err)
        }else {
          itemsDone += 1;
          if(itemsDone === l) {
            callback(null)
          }
        }
      }
    }
    for(i = 0;i < l;i += 1) {
      f(items[i], end)
    }
  }
};
runtime.loadClass("core.RawInflate");
runtime.loadClass("core.ByteArray");
runtime.loadClass("core.ByteArrayWriter");
runtime.loadClass("core.Base64");
core.Zip = function Zip(url, entriesReadCallback) {
  var entries, filesize, nEntries, inflate = (new core.RawInflate).inflate, zip = this, base64 = new core.Base64;
  function crc32(data) {
    var table = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 
    3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 
    453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 
    3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 
    1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 
    1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117], crc = 
    0, i, iTop = data.length, x = 0, y = 0;
    crc = crc ^ -1;
    for(i = 0;i < iTop;i += 1) {
      y = (crc ^ data[i]) & 255;
      x = table[y];
      crc = crc >>> 8 ^ x
    }
    return crc ^ -1
  }
  function dosTime2Date(dostime) {
    var year = (dostime >> 25 & 127) + 1980, month = (dostime >> 21 & 15) - 1, mday = dostime >> 16 & 31, hour = dostime >> 11 & 15, min = dostime >> 5 & 63, sec = (dostime & 31) << 1, d = new Date(year, month, mday, hour, min, sec);
    return d
  }
  function date2DosTime(date) {
    var y = date.getFullYear();
    return y < 1980 ? 0 : y - 1980 << 25 | date.getMonth() + 1 << 21 | date.getDate() << 16 | date.getHours() << 11 | date.getMinutes() << 5 | date.getSeconds() >> 1
  }
  function ZipEntry(url, stream) {
    var sig, namelen, extralen, commentlen, compressionMethod, compressedSize, uncompressedSize, offset, crc, entry = this;
    function handleEntryData(data, callback) {
      var stream = new core.ByteArray(data), sig = stream.readUInt32LE(), filenamelen, extralen;
      if(sig !== 67324752) {
        callback("File entry signature is wrong." + sig.toString() + " " + data.length.toString(), null);
        return
      }
      stream.pos += 22;
      filenamelen = stream.readUInt16LE();
      extralen = stream.readUInt16LE();
      stream.pos += filenamelen + extralen;
      if(compressionMethod) {
        data = data.slice(stream.pos, stream.pos + compressedSize);
        if(compressedSize !== data.length) {
          callback("The amount of compressed bytes read was " + data.length.toString() + " instead of " + compressedSize.toString() + " for " + entry.filename + " in " + url + ".", null);
          return
        }
        data = inflate(data, uncompressedSize)
      }else {
        data = data.slice(stream.pos, stream.pos + uncompressedSize)
      }
      if(uncompressedSize !== data.length) {
        callback("The amount of bytes read was " + data.length.toString() + " instead of " + uncompressedSize.toString() + " for " + entry.filename + " in " + url + ".", null);
        return
      }
      entry.data = data;
      callback(null, data)
    }
    function load(callback) {
      if(entry.data !== undefined) {
        callback(null, entry.data);
        return
      }
      var size = compressedSize + 34 + namelen + extralen + 256;
      if(size + offset > filesize) {
        size = filesize - offset
      }
      runtime.read(url, offset, size, function(err, data) {
        if(err || data === null) {
          callback(err, data)
        }else {
          handleEntryData(data, callback)
        }
      })
    }
    this.load = load;
    function set(filename, data, compressed, date) {
      entry.filename = filename;
      entry.data = data;
      entry.compressed = compressed;
      entry.date = date
    }
    this.set = set;
    this.error = null;
    if(!stream) {
      return
    }
    sig = stream.readUInt32LE();
    if(sig !== 33639248) {
      this.error = "Central directory entry has wrong signature at position " + (stream.pos - 4).toString() + ' for file "' + url + '": ' + stream.data.length.toString();
      return
    }
    stream.pos += 6;
    compressionMethod = stream.readUInt16LE();
    this.date = dosTime2Date(stream.readUInt32LE());
    crc = stream.readUInt32LE();
    compressedSize = stream.readUInt32LE();
    uncompressedSize = stream.readUInt32LE();
    namelen = stream.readUInt16LE();
    extralen = stream.readUInt16LE();
    commentlen = stream.readUInt16LE();
    stream.pos += 8;
    offset = stream.readUInt32LE();
    this.filename = runtime.byteArrayToString(stream.data.slice(stream.pos, stream.pos + namelen), "utf8");
    stream.pos += namelen + extralen + commentlen
  }
  function handleCentralDirectory(data, callback) {
    var stream = new core.ByteArray(data), i, e;
    entries = [];
    for(i = 0;i < nEntries;i += 1) {
      e = new ZipEntry(url, stream);
      if(e.error) {
        callback(e.error, zip);
        return
      }
      entries[entries.length] = e
    }
    callback(null, zip)
  }
  function handleCentralDirectoryEnd(data, callback) {
    if(data.length !== 22) {
      callback("Central directory length should be 22.", zip);
      return
    }
    var stream = new core.ByteArray(data), sig, disk, cddisk, diskNEntries, cdsSize, cdsOffset;
    sig = stream.readUInt32LE();
    if(sig !== 101010256) {
      callback("Central directory signature is wrong: " + sig.toString(), zip);
      return
    }
    disk = stream.readUInt16LE();
    if(disk !== 0) {
      callback("Zip files with non-zero disk numbers are not supported.", zip);
      return
    }
    cddisk = stream.readUInt16LE();
    if(cddisk !== 0) {
      callback("Zip files with non-zero disk numbers are not supported.", zip);
      return
    }
    diskNEntries = stream.readUInt16LE();
    nEntries = stream.readUInt16LE();
    if(diskNEntries !== nEntries) {
      callback("Number of entries is inconsistent.", zip);
      return
    }
    cdsSize = stream.readUInt32LE();
    cdsOffset = stream.readUInt16LE();
    cdsOffset = filesize - 22 - cdsSize;
    runtime.read(url, cdsOffset, filesize - cdsOffset, function(err, data) {
      if(err || data === null) {
        callback(err, zip)
      }else {
        handleCentralDirectory(data, callback)
      }
    })
  }
  function load(filename, callback) {
    var entry = null, end = filesize, e, i;
    for(i = 0;i < entries.length;i += 1) {
      e = entries[i];
      if(e.filename === filename) {
        entry = e;
        break
      }
    }
    if(entry) {
      if(entry.data) {
        callback(null, entry.data)
      }else {
        entry.load(callback)
      }
    }else {
      callback(filename + " not found.", null)
    }
  }
  function loadAsString(filename, callback) {
    load(filename, function(err, data) {
      if(err || data === null) {
        return callback(err, null)
      }
      var d = runtime.byteArrayToString(data, "utf8");
      callback(null, d)
    })
  }
  function loadContentXmlAsFragments(filename, handler) {
    zip.loadAsString(filename, function(err, data) {
      if(err) {
        return handler.rootElementReady(err)
      }
      handler.rootElementReady(null, data, true)
    })
  }
  function loadAsDataURL(filename, mimetype, callback) {
    load(filename, function(err, data) {
      if(err) {
        return callback(err, null)
      }
      var p = data, chunksize = 45E3, i = 0, url;
      if(!mimetype) {
        if(p[1] === 80 && p[2] === 78 && p[3] === 71) {
          mimetype = "image/png"
        }else {
          if(p[0] === 255 && p[1] === 216 && p[2] === 255) {
            mimetype = "image/jpeg"
          }else {
            if(p[0] === 71 && p[1] === 73 && p[2] === 70) {
              mimetype = "image/gif"
            }else {
              mimetype = ""
            }
          }
        }
      }
      url = "data:" + mimetype + ";base64,";
      while(i < data.length) {
        url += base64.convertUTF8ArrayToBase64(p.slice(i, Math.min(i + chunksize, p.length)));
        i += chunksize
      }
      callback(null, url)
    })
  }
  function loadAsDOM(filename, callback) {
    zip.loadAsString(filename, function(err, xmldata) {
      if(err || xmldata === null) {
        callback(err, null);
        return
      }
      var parser = new DOMParser, dom = parser.parseFromString(xmldata, "text/xml");
      callback(null, dom)
    })
  }
  function save(filename, data, compressed, date) {
    var i, entry;
    for(i = 0;i < entries.length;i += 1) {
      entry = entries[i];
      if(entry.filename === filename) {
        entry.set(filename, data, compressed, date);
        return
      }
    }
    entry = new ZipEntry(url);
    entry.set(filename, data, compressed, date);
    entries.push(entry)
  }
  function writeEntry(entry) {
    var data = new core.ByteArrayWriter("utf8"), length = 0;
    data.appendArray([80, 75, 3, 4, 20, 0, 0, 0, 0, 0]);
    if(entry.data) {
      length = entry.data.length
    }
    data.appendUInt32LE(date2DosTime(entry.date));
    data.appendUInt32LE(crc32(entry.data));
    data.appendUInt32LE(length);
    data.appendUInt32LE(length);
    data.appendUInt16LE(entry.filename.length);
    data.appendUInt16LE(0);
    data.appendString(entry.filename);
    if(entry.data) {
      data.appendByteArray(entry.data)
    }
    return data
  }
  function writeCODEntry(entry, offset) {
    var data = new core.ByteArrayWriter("utf8"), length = 0;
    data.appendArray([80, 75, 1, 2, 20, 0, 20, 0, 0, 0, 0, 0]);
    if(entry.data) {
      length = entry.data.length
    }
    data.appendUInt32LE(date2DosTime(entry.date));
    data.appendUInt32LE(crc32(entry.data));
    data.appendUInt32LE(length);
    data.appendUInt32LE(length);
    data.appendUInt16LE(entry.filename.length);
    data.appendArray([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    data.appendUInt32LE(offset);
    data.appendString(entry.filename);
    return data
  }
  function loadAllEntries(position, callback) {
    if(position === entries.length) {
      callback(null);
      return
    }
    var entry = entries[position];
    if(entry.data !== undefined) {
      loadAllEntries(position + 1, callback);
      return
    }
    entry.load(function(err) {
      if(err) {
        callback(err);
        return
      }
      loadAllEntries(position + 1, callback)
    })
  }
  function createByteArray(successCallback, errorCallback) {
    loadAllEntries(0, function(err) {
      if(err) {
        errorCallback(err);
        return
      }
      var data = new core.ByteArrayWriter("utf8"), i, e, codoffset, codsize, offsets = [0];
      for(i = 0;i < entries.length;i += 1) {
        data.appendByteArrayWriter(writeEntry(entries[i]));
        offsets.push(data.getLength())
      }
      codoffset = data.getLength();
      for(i = 0;i < entries.length;i += 1) {
        e = entries[i];
        data.appendByteArrayWriter(writeCODEntry(e, offsets[i]))
      }
      codsize = data.getLength() - codoffset;
      data.appendArray([80, 75, 5, 6, 0, 0, 0, 0]);
      data.appendUInt16LE(entries.length);
      data.appendUInt16LE(entries.length);
      data.appendUInt32LE(codsize);
      data.appendUInt32LE(codoffset);
      data.appendArray([0, 0]);
      successCallback(data.getByteArray())
    })
  }
  function writeAs(newurl, callback) {
    createByteArray(function(data) {
      runtime.writeFile(newurl, data, callback)
    }, callback)
  }
  function write(callback) {
    writeAs(url, callback)
  }
  this.load = load;
  this.save = save;
  this.write = write;
  this.writeAs = writeAs;
  this.createByteArray = createByteArray;
  this.loadContentXmlAsFragments = loadContentXmlAsFragments;
  this.loadAsString = loadAsString;
  this.loadAsDOM = loadAsDOM;
  this.loadAsDataURL = loadAsDataURL;
  this.getEntries = function() {
    return entries.slice()
  };
  filesize = -1;
  if(entriesReadCallback === null) {
    entries = [];
    return
  }
  runtime.getFileSize(url, function(size) {
    filesize = size;
    if(filesize < 0) {
      entriesReadCallback("File '" + url + "' cannot be read.", zip)
    }else {
      runtime.read(url, filesize - 22, 22, function(err, data) {
        if(err || entriesReadCallback === null || data === null) {
          entriesReadCallback(err, zip)
        }else {
          handleCentralDirectoryEnd(data, entriesReadCallback)
        }
      })
    }
  })
};
core.CSSUnits = function CSSUnits() {
  var sizemap = {"in":1, "cm":2.54, "mm":25.4, "pt":72, "pc":12};
  this.convert = function(value, oldUnit, newUnit) {
    return value * sizemap[newUnit] / sizemap[oldUnit]
  };
  this.convertMeasure = function(measure, newUnit) {
    var value, oldUnit, newMeasure;
    if(measure && newUnit) {
      value = parseFloat(measure);
      oldUnit = measure.replace(value.toString(), "");
      newMeasure = this.convert(value, oldUnit, newUnit)
    }else {
      newMeasure = ""
    }
    return newMeasure.toString()
  }
};
xmldom.LSSerializerFilter = function LSSerializerFilter() {
};
if(typeof Object.create !== "function") {
  Object["create"] = function(o) {
    var F = function() {
    };
    F.prototype = o;
    return new F
  }
}
xmldom.LSSerializer = function LSSerializer() {
  var self = this;
  function serializeAttribute(prefix, attr) {
    var s = prefix + attr.localName + '="' + attr.nodeValue + '"';
    return s
  }
  function attributePrefix(nsmap, prefix, ns) {
    if(nsmap.hasOwnProperty(ns)) {
      return nsmap[ns] + ":"
    }
    if(nsmap[ns] !== prefix) {
      nsmap[ns] = prefix
    }
    return prefix + ":"
  }
  function startNode(nsmap, node) {
    var s = "", atts = node.attributes, length, i, attr, attstr = "", accept, prefix;
    if(atts) {
      if(node.namespaceURI && nsmap[node.namespaceURI] !== node.prefix) {
        nsmap[node.namespaceURI] = node.prefix
      }
      s += "<" + node.nodeName;
      length = atts.length;
      for(i = 0;i < length;i += 1) {
        attr = atts.item(i);
        if(attr.namespaceURI !== "http://www.w3.org/2000/xmlns/") {
          accept = self.filter ? self.filter.acceptNode(attr) : 1;
          if(accept === 1) {
            if(attr.namespaceURI) {
              prefix = attributePrefix(nsmap, attr.prefix, attr.namespaceURI)
            }else {
              prefix = ""
            }
            attstr += " " + serializeAttribute(prefix, attr)
          }
        }
      }
      for(i in nsmap) {
        if(nsmap.hasOwnProperty(i)) {
          prefix = nsmap[i];
          if(!prefix) {
            s += ' xmlns="' + i + '"'
          }else {
            if(prefix !== "xmlns") {
              s += " xmlns:" + nsmap[i] + '="' + i + '"'
            }
          }
        }
      }
      s += attstr + ">"
    }
    return s
  }
  function endNode(node) {
    var s = "";
    if(node.nodeType === 1) {
      s += "</" + node.nodeName + ">"
    }
    return s
  }
  function serializeNode(parentnsmap, node) {
    var s = "", nsmap = Object.create(parentnsmap), accept = self.filter ? self.filter.acceptNode(node) : 1, child;
    if(accept === 1) {
      s += startNode(nsmap, node)
    }
    if(accept === 1 || accept === 3) {
      child = node.firstChild;
      while(child) {
        s += serializeNode(nsmap, child);
        child = child.nextSibling
      }
      if(node.nodeValue) {
        s += node.nodeValue
      }
    }
    if(accept === 1) {
      s += endNode(node)
    }
    return s
  }
  function invertMap(map) {
    var m = {}, i;
    for(i in map) {
      if(map.hasOwnProperty(i)) {
        m[map[i]] = i
      }
    }
    return m
  }
  this.filter = null;
  this.writeToString = function(node, nsmap) {
    if(!node) {
      return""
    }
    nsmap = nsmap ? invertMap(nsmap) : {};
    return serializeNode(nsmap, node)
  }
};
xmldom.RelaxNGParser = function RelaxNGParser() {
  var self = this, rngns = "http://relaxng.org/ns/structure/1.0", xmlnsns = "http://www.w3.org/2000/xmlns/", start, nsmap = {"http://www.w3.org/XML/1998/namespace":"xml"}, parse;
  function RelaxNGParseError(error, context) {
    this.message = function() {
      if(context) {
        error += context.nodeType === 1 ? " Element " : " Node ";
        error += context.nodeName;
        if(context.nodeValue) {
          error += " with value '" + context.nodeValue + "'"
        }
        error += "."
      }
      return error
    }
  }
  function splitToDuos(e) {
    if(e.e.length <= 2) {
      return e
    }
    var o = {name:e.name, e:e.e.slice(0, 2)};
    return splitToDuos({name:e.name, e:[o].concat(e.e.slice(2))})
  }
  function splitQName(name) {
    var r = name.split(":", 2), prefix = "", i;
    if(r.length === 1) {
      r = ["", r[0]]
    }else {
      prefix = r[0]
    }
    for(i in nsmap) {
      if(nsmap[i] === prefix) {
        r[0] = i
      }
    }
    return r
  }
  function splitQNames(def) {
    var i, l = def.names ? def.names.length : 0, name, localnames = def.localnames = [l], namespaces = def.namespaces = [l];
    for(i = 0;i < l;i += 1) {
      name = splitQName(def.names[i]);
      namespaces[i] = name[0];
      localnames[i] = name[1]
    }
  }
  function trim(str) {
    str = str.replace(/^\s\s*/, "");
    var ws = /\s/, i = str.length - 1;
    while(ws.test(str.charAt(i))) {
      i -= 1
    }
    return str.slice(0, i + 1)
  }
  function copyAttributes(atts, name, names) {
    var a = {}, i, att;
    for(i = 0;i < atts.length;i += 1) {
      att = atts.item(i);
      if(!att.namespaceURI) {
        if(att.localName === "name" && (name === "element" || name === "attribute")) {
          names.push(att.value)
        }
        if(att.localName === "name" || att.localName === "combine" || att.localName === "type") {
          att.value = trim(att.value)
        }
        a[att.localName] = att.value
      }else {
        if(att.namespaceURI === xmlnsns) {
          nsmap[att.value] = att.localName
        }
      }
    }
    return a
  }
  function parseChildren(c, e, elements, names) {
    var text = "", ce;
    while(c) {
      if(c.nodeType === 1 && c.namespaceURI === rngns) {
        ce = parse(c, elements, e);
        if(ce) {
          if(ce.name === "name") {
            names.push(nsmap[ce.a.ns] + ":" + ce.text);
            e.push(ce)
          }else {
            if(ce.name === "choice" && ce.names && ce.names.length) {
              names = names.concat(ce.names);
              delete ce.names;
              e.push(ce)
            }else {
              e.push(ce)
            }
          }
        }
      }else {
        if(c.nodeType === 3) {
          text += c.nodeValue
        }
      }
      c = c.nextSibling
    }
    return text
  }
  function combineDefines(combine, name, e, siblings) {
    var i, ce;
    for(i = 0;siblings && i < siblings.length;i += 1) {
      ce = siblings[i];
      if(ce.name === "define" && ce.a && ce.a.name === name) {
        ce.e = [{name:combine, e:ce.e.concat(e)}];
        return ce
      }
    }
    return null
  }
  parse = function parse(element, elements, siblings) {
    var e = [], a, ce, i, text, name = element.localName, names = [];
    a = copyAttributes(element.attributes, name, names);
    a.combine = a.combine || undefined;
    text = parseChildren(element.firstChild, e, elements, names);
    if(name !== "value" && name !== "param") {
      text = /^\s*([\s\S]*\S)?\s*$/.exec(text)[1]
    }
    if(name === "value" && a.type === undefined) {
      a.type = "token";
      a.datatypeLibrary = ""
    }
    if((name === "attribute" || name === "element") && a.name !== undefined) {
      i = splitQName(a.name);
      e = [{name:"name", text:i[1], a:{ns:i[0]}}].concat(e);
      delete a.name
    }
    if(name === "name" || name === "nsName" || name === "value") {
      if(a.ns === undefined) {
        a.ns = ""
      }
    }else {
      delete a.ns
    }
    if(name === "name") {
      i = splitQName(text);
      a.ns = i[0];
      text = i[1]
    }
    if(e.length > 1 && (name === "define" || name === "oneOrMore" || name === "zeroOrMore" || name === "optional" || name === "list" || name === "mixed")) {
      e = [{name:"group", e:splitToDuos({name:"group", e:e}).e}]
    }
    if(e.length > 2 && name === "element") {
      e = [e[0]].concat({name:"group", e:splitToDuos({name:"group", e:e.slice(1)}).e})
    }
    if(e.length === 1 && name === "attribute") {
      e.push({name:"text", text:text})
    }
    if(e.length === 1 && (name === "choice" || name === "group" || name === "interleave")) {
      name = e[0].name;
      names = e[0].names;
      a = e[0].a;
      text = e[0].text;
      e = e[0].e
    }else {
      if(e.length > 2 && (name === "choice" || name === "group" || name === "interleave")) {
        e = splitToDuos({name:name, e:e}).e
      }
    }
    if(name === "mixed") {
      name = "interleave";
      e = [e[0], {name:"text"}]
    }
    if(name === "optional") {
      name = "choice";
      e = [e[0], {name:"empty"}]
    }
    if(name === "zeroOrMore") {
      name = "choice";
      e = [{name:"oneOrMore", e:[e[0]]}, {name:"empty"}]
    }
    if(name === "define" && a.combine) {
      ce = combineDefines(a.combine, a.name, e, siblings);
      if(ce) {
        return
      }
    }
    ce = {name:name};
    if(e && e.length > 0) {
      ce.e = e
    }
    for(i in a) {
      if(a.hasOwnProperty(i)) {
        ce.a = a;
        break
      }
    }
    if(text !== undefined) {
      ce.text = text
    }
    if(names && names.length > 0) {
      ce.names = names
    }
    if(name === "element") {
      ce.id = elements.length;
      elements.push(ce);
      ce = {name:"elementref", id:ce.id}
    }
    return ce
  };
  function resolveDefines(def, defines) {
    var i = 0, e, defs, end, name = def.name;
    while(def.e && i < def.e.length) {
      e = def.e[i];
      if(e.name === "ref") {
        defs = defines[e.a.name];
        if(!defs) {
          throw e.a.name + " was not defined.";
        }
        end = def.e.slice(i + 1);
        def.e = def.e.slice(0, i);
        def.e = def.e.concat(defs.e);
        def.e = def.e.concat(end)
      }else {
        i += 1;
        resolveDefines(e, defines)
      }
    }
    e = def.e;
    if(name === "choice") {
      if(!e || !e[1] || e[1].name === "empty") {
        if(!e || !e[0] || e[0].name === "empty") {
          delete def.e;
          def.name = "empty"
        }else {
          e[1] = e[0];
          e[0] = {name:"empty"}
        }
      }
    }
    if(name === "group" || name === "interleave") {
      if(e[0].name === "empty") {
        if(e[1].name === "empty") {
          delete def.e;
          def.name = "empty"
        }else {
          name = def.name = e[1].name;
          def.names = e[1].names;
          e = def.e = e[1].e
        }
      }else {
        if(e[1].name === "empty") {
          name = def.name = e[0].name;
          def.names = e[0].names;
          e = def.e = e[0].e
        }
      }
    }
    if(name === "oneOrMore" && e[0].name === "empty") {
      delete def.e;
      def.name = "empty"
    }
    if(name === "attribute") {
      splitQNames(def)
    }
    if(name === "interleave") {
      if(e[0].name === "interleave") {
        if(e[1].name === "interleave") {
          e = def.e = e[0].e.concat(e[1].e)
        }else {
          e = def.e = [e[1]].concat(e[0].e)
        }
      }else {
        if(e[1].name === "interleave") {
          e = def.e = [e[0]].concat(e[1].e)
        }
      }
    }
  }
  function resolveElements(def, elements) {
    var i = 0, e, name;
    while(def.e && i < def.e.length) {
      e = def.e[i];
      if(e.name === "elementref") {
        e.id = e.id || 0;
        def.e[i] = elements[e.id]
      }else {
        if(e.name !== "element") {
          resolveElements(e, elements)
        }
      }
      i += 1
    }
  }
  function main(dom, callback) {
    var elements = [], grammar = parse(dom && dom.documentElement, elements, undefined), i, e, defines = {};
    for(i = 0;i < grammar.e.length;i += 1) {
      e = grammar.e[i];
      if(e.name === "define") {
        defines[e.a.name] = e
      }else {
        if(e.name === "start") {
          start = e
        }
      }
    }
    if(!start) {
      return[new RelaxNGParseError("No Relax NG start element was found.")]
    }
    resolveDefines(start, defines);
    for(i in defines) {
      if(defines.hasOwnProperty(i)) {
        resolveDefines(defines[i], defines)
      }
    }
    for(i = 0;i < elements.length;i += 1) {
      resolveDefines(elements[i], defines)
    }
    if(callback) {
      self.rootPattern = callback(start.e[0], elements)
    }
    resolveElements(start, elements);
    for(i = 0;i < elements.length;i += 1) {
      resolveElements(elements[i], elements)
    }
    self.start = start;
    self.elements = elements;
    self.nsmap = nsmap;
    return null
  }
  this.parseRelaxNGDOM = main
};
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG = function RelaxNG() {
  var xmlnsns = "http://www.w3.org/2000/xmlns/", createChoice, createInterleave, createGroup, createAfter, createOneOrMore, createValue, createAttribute, createNameClass, createData, makePattern, notAllowed = {type:"notAllowed", nullable:false, hash:"notAllowed", textDeriv:function() {
    return notAllowed
  }, startTagOpenDeriv:function() {
    return notAllowed
  }, attDeriv:function() {
    return notAllowed
  }, startTagCloseDeriv:function() {
    return notAllowed
  }, endTagDeriv:function() {
    return notAllowed
  }}, empty = {type:"empty", nullable:true, hash:"empty", textDeriv:function() {
    return notAllowed
  }, startTagOpenDeriv:function() {
    return notAllowed
  }, attDeriv:function(context, attribute) {
    return notAllowed
  }, startTagCloseDeriv:function() {
    return empty
  }, endTagDeriv:function() {
    return notAllowed
  }}, text = {type:"text", nullable:true, hash:"text", textDeriv:function() {
    return text
  }, startTagOpenDeriv:function() {
    return notAllowed
  }, attDeriv:function() {
    return notAllowed
  }, startTagCloseDeriv:function() {
    return text
  }, endTagDeriv:function() {
    return notAllowed
  }}, applyAfter, childDeriv, rootPattern;
  function memoize0arg(func) {
    return function() {
      var cache;
      return function() {
        if(cache === undefined) {
          cache = func()
        }
        return cache
      }
    }()
  }
  function memoize1arg(type, func) {
    return function() {
      var cache = {}, cachecount = 0;
      return function(a) {
        var ahash = a.hash || a.toString(), v;
        v = cache[ahash];
        if(v !== undefined) {
          return v
        }
        cache[ahash] = v = func(a);
        v.hash = type + cachecount.toString();
        cachecount += 1;
        return v
      }
    }()
  }
  function memoizeNode(func) {
    return function() {
      var cache = {};
      return function(node) {
        var v, m;
        m = cache[node.localName];
        if(m === undefined) {
          cache[node.localName] = m = {}
        }else {
          v = m[node.namespaceURI];
          if(v !== undefined) {
            return v
          }
        }
        m[node.namespaceURI] = v = func(node);
        return v
      }
    }()
  }
  function memoize2arg(type, fastfunc, func) {
    return function() {
      var cache = {}, cachecount = 0;
      return function(a, b) {
        var v = fastfunc && fastfunc(a, b), ahash, bhash, m;
        if(v !== undefined) {
          return v
        }
        ahash = a.hash || a.toString();
        bhash = b.hash || b.toString();
        m = cache[ahash];
        if(m === undefined) {
          cache[ahash] = m = {}
        }else {
          v = m[bhash];
          if(v !== undefined) {
            return v
          }
        }
        m[bhash] = v = func(a, b);
        v.hash = type + cachecount.toString();
        cachecount += 1;
        return v
      }
    }()
  }
  function unorderedMemoize2arg(type, fastfunc, func) {
    return function() {
      var cache = {}, cachecount = 0;
      return function(a, b) {
        var v = fastfunc && fastfunc(a, b), ahash, bhash, m;
        if(v !== undefined) {
          return v
        }
        ahash = a.hash || a.toString();
        bhash = b.hash || b.toString();
        if(ahash < bhash) {
          m = ahash;
          ahash = bhash;
          bhash = m;
          m = a;
          a = b;
          b = m
        }
        m = cache[ahash];
        if(m === undefined) {
          cache[ahash] = m = {}
        }else {
          v = m[bhash];
          if(v !== undefined) {
            return v
          }
        }
        m[bhash] = v = func(a, b);
        v.hash = type + cachecount.toString();
        cachecount += 1;
        return v
      }
    }()
  }
  function getUniqueLeaves(leaves, pattern) {
    if(pattern.p1.type === "choice") {
      getUniqueLeaves(leaves, pattern.p1)
    }else {
      leaves[pattern.p1.hash] = pattern.p1
    }
    if(pattern.p2.type === "choice") {
      getUniqueLeaves(leaves, pattern.p2)
    }else {
      leaves[pattern.p2.hash] = pattern.p2
    }
  }
  createChoice = memoize2arg("choice", function(p1, p2) {
    if(p1 === notAllowed) {
      return p2
    }
    if(p2 === notAllowed) {
      return p1
    }
    if(p1 === p2) {
      return p1
    }
  }, function(p1, p2) {
    function makeChoice(p1, p2) {
      return{type:"choice", p1:p1, p2:p2, nullable:p1.nullable || p2.nullable, textDeriv:function(context, text) {
        return createChoice(p1.textDeriv(context, text), p2.textDeriv(context, text))
      }, startTagOpenDeriv:memoizeNode(function(node) {
        return createChoice(p1.startTagOpenDeriv(node), p2.startTagOpenDeriv(node))
      }), attDeriv:function(context, attribute) {
        return createChoice(p1.attDeriv(context, attribute), p2.attDeriv(context, attribute))
      }, startTagCloseDeriv:memoize0arg(function() {
        return createChoice(p1.startTagCloseDeriv(), p2.startTagCloseDeriv())
      }), endTagDeriv:memoize0arg(function() {
        return createChoice(p1.endTagDeriv(), p2.endTagDeriv())
      })}
    }
    var leaves = {}, i;
    getUniqueLeaves(leaves, {p1:p1, p2:p2});
    p1 = undefined;
    p2 = undefined;
    for(i in leaves) {
      if(leaves.hasOwnProperty(i)) {
        if(p1 === undefined) {
          p1 = leaves[i]
        }else {
          if(p2 === undefined) {
            p2 = leaves[i]
          }else {
            p2 = createChoice(p2, leaves[i])
          }
        }
      }
    }
    return makeChoice(p1, p2)
  });
  createInterleave = unorderedMemoize2arg("interleave", function(p1, p2) {
    if(p1 === notAllowed || p2 === notAllowed) {
      return notAllowed
    }
    if(p1 === empty) {
      return p2
    }
    if(p2 === empty) {
      return p1
    }
  }, function(p1, p2) {
    return{type:"interleave", p1:p1, p2:p2, nullable:p1.nullable && p2.nullable, textDeriv:function(context, text) {
      return createChoice(createInterleave(p1.textDeriv(context, text), p2), createInterleave(p1, p2.textDeriv(context, text)))
    }, startTagOpenDeriv:memoizeNode(function(node) {
      return createChoice(applyAfter(function(p) {
        return createInterleave(p, p2)
      }, p1.startTagOpenDeriv(node)), applyAfter(function(p) {
        return createInterleave(p1, p)
      }, p2.startTagOpenDeriv(node)))
    }), attDeriv:function(context, attribute) {
      return createChoice(createInterleave(p1.attDeriv(context, attribute), p2), createInterleave(p1, p2.attDeriv(context, attribute)))
    }, startTagCloseDeriv:memoize0arg(function() {
      return createInterleave(p1.startTagCloseDeriv(), p2.startTagCloseDeriv())
    })}
  });
  createGroup = memoize2arg("group", function(p1, p2) {
    if(p1 === notAllowed || p2 === notAllowed) {
      return notAllowed
    }
    if(p1 === empty) {
      return p2
    }
    if(p2 === empty) {
      return p1
    }
  }, function(p1, p2) {
    return{type:"group", p1:p1, p2:p2, nullable:p1.nullable && p2.nullable, textDeriv:function(context, text) {
      var p = createGroup(p1.textDeriv(context, text), p2);
      if(p1.nullable) {
        return createChoice(p, p2.textDeriv(context, text))
      }
      return p
    }, startTagOpenDeriv:function(node) {
      var x = applyAfter(function(p) {
        return createGroup(p, p2)
      }, p1.startTagOpenDeriv(node));
      if(p1.nullable) {
        return createChoice(x, p2.startTagOpenDeriv(node))
      }
      return x
    }, attDeriv:function(context, attribute) {
      return createChoice(createGroup(p1.attDeriv(context, attribute), p2), createGroup(p1, p2.attDeriv(context, attribute)))
    }, startTagCloseDeriv:memoize0arg(function() {
      return createGroup(p1.startTagCloseDeriv(), p2.startTagCloseDeriv())
    })}
  });
  createAfter = memoize2arg("after", function(p1, p2) {
    if(p1 === notAllowed || p2 === notAllowed) {
      return notAllowed
    }
  }, function(p1, p2) {
    return{type:"after", p1:p1, p2:p2, nullable:false, textDeriv:function(context, text) {
      return createAfter(p1.textDeriv(context, text), p2)
    }, startTagOpenDeriv:memoizeNode(function(node) {
      return applyAfter(function(p) {
        return createAfter(p, p2)
      }, p1.startTagOpenDeriv(node))
    }), attDeriv:function(context, attribute) {
      return createAfter(p1.attDeriv(context, attribute), p2)
    }, startTagCloseDeriv:memoize0arg(function() {
      return createAfter(p1.startTagCloseDeriv(), p2)
    }), endTagDeriv:memoize0arg(function() {
      return p1.nullable ? p2 : notAllowed
    })}
  });
  createOneOrMore = memoize1arg("oneormore", function(p) {
    if(p === notAllowed) {
      return notAllowed
    }
    return{type:"oneOrMore", p:p, nullable:p.nullable, textDeriv:function(context, text) {
      return createGroup(p.textDeriv(context, text), createChoice(this, empty))
    }, startTagOpenDeriv:function(node) {
      var oneOrMore = this;
      return applyAfter(function(pf) {
        return createGroup(pf, createChoice(oneOrMore, empty))
      }, p.startTagOpenDeriv(node))
    }, attDeriv:function(context, attribute) {
      var oneOrMore = this;
      return createGroup(p.attDeriv(context, attribute), createChoice(oneOrMore, empty))
    }, startTagCloseDeriv:memoize0arg(function() {
      return createOneOrMore(p.startTagCloseDeriv())
    })}
  });
  function createElement(nc, p) {
    return{type:"element", nc:nc, nullable:false, textDeriv:function() {
      return notAllowed
    }, startTagOpenDeriv:function(node) {
      if(nc.contains(node)) {
        return createAfter(p, empty)
      }
      return notAllowed
    }, attDeriv:function(context, attribute) {
      return notAllowed
    }, startTagCloseDeriv:function() {
      return this
    }}
  }
  function valueMatch(context, pattern, text) {
    return pattern.nullable && /^\s+$/.test(text) || pattern.textDeriv(context, text).nullable
  }
  createAttribute = memoize2arg("attribute", undefined, function(nc, p) {
    return{type:"attribute", nullable:false, nc:nc, p:p, attDeriv:function(context, attribute) {
      if(nc.contains(attribute) && valueMatch(context, p, attribute.nodeValue)) {
        return empty
      }
      return notAllowed
    }, startTagCloseDeriv:function() {
      return notAllowed
    }}
  });
  function createList() {
    return{type:"list", nullable:false, hash:"list", textDeriv:function(context, text) {
      return empty
    }}
  }
  createValue = memoize1arg("value", function(value) {
    return{type:"value", nullable:false, value:value, textDeriv:function(context, text) {
      return text === value ? empty : notAllowed
    }, attDeriv:function() {
      return notAllowed
    }, startTagCloseDeriv:function() {
      return this
    }}
  });
  createData = memoize1arg("data", function(type) {
    return{type:"data", nullable:false, dataType:type, textDeriv:function() {
      return empty
    }, attDeriv:function() {
      return notAllowed
    }, startTagCloseDeriv:function() {
      return this
    }}
  });
  function createDataExcept() {
    return{type:"dataExcept", nullable:false, hash:"dataExcept"}
  }
  applyAfter = function applyAfter(f, p) {
    var result;
    if(p.type === "after") {
      result = createAfter(p.p1, f(p.p2))
    }else {
      if(p.type === "choice") {
        result = createChoice(applyAfter(f, p.p1), applyAfter(f, p.p2))
      }else {
        result = p
      }
    }
    return result
  };
  function attsDeriv(context, pattern, attributes, position) {
    if(pattern === notAllowed) {
      return notAllowed
    }
    if(position >= attributes.length) {
      return pattern
    }
    if(position === 0) {
      position = 0
    }
    var a = attributes.item(position);
    while(a.namespaceURI === xmlnsns) {
      position += 1;
      if(position >= attributes.length) {
        return pattern
      }
      a = attributes.item(position)
    }
    a = attsDeriv(context, pattern.attDeriv(context, attributes.item(position)), attributes, position + 1);
    return a
  }
  function childrenDeriv(context, pattern, walker) {
    var element = walker.currentNode, childNode = walker.firstChild(), numberOfTextNodes = 0, childNodes = [], i, p;
    while(childNode) {
      if(childNode.nodeType === 1) {
        childNodes.push(childNode)
      }else {
        if(childNode.nodeType === 3 && !/^\s*$/.test(childNode.nodeValue)) {
          childNodes.push(childNode.nodeValue);
          numberOfTextNodes += 1
        }
      }
      childNode = walker.nextSibling()
    }
    if(childNodes.length === 0) {
      childNodes = [""]
    }
    p = pattern;
    for(i = 0;p !== notAllowed && i < childNodes.length;i += 1) {
      childNode = childNodes[i];
      if(typeof childNode === "string") {
        if(/^\s*$/.test(childNode)) {
          p = createChoice(p, p.textDeriv(context, childNode))
        }else {
          p = p.textDeriv(context, childNode)
        }
      }else {
        walker.currentNode = childNode;
        p = childDeriv(context, p, walker)
      }
    }
    walker.currentNode = element;
    return p
  }
  childDeriv = function childDeriv(context, pattern, walker) {
    var childNode = walker.currentNode, p;
    p = pattern.startTagOpenDeriv(childNode);
    p = attsDeriv(context, p, childNode.attributes, 0);
    p = p.startTagCloseDeriv();
    p = childrenDeriv(context, p, walker);
    p = p.endTagDeriv();
    return p
  };
  function addNames(name, ns, pattern) {
    if(pattern.e[0].a) {
      name.push(pattern.e[0].text);
      ns.push(pattern.e[0].a.ns)
    }else {
      addNames(name, ns, pattern.e[0])
    }
    if(pattern.e[1].a) {
      name.push(pattern.e[1].text);
      ns.push(pattern.e[1].a.ns)
    }else {
      addNames(name, ns, pattern.e[1])
    }
  }
  createNameClass = function createNameClass(pattern) {
    var name, ns, hash, i, result;
    if(pattern.name === "name") {
      name = pattern.text;
      ns = pattern.a.ns;
      result = {name:name, ns:ns, hash:"{" + ns + "}" + name, contains:function(node) {
        return node.namespaceURI === ns && node.localName === name
      }}
    }else {
      if(pattern.name === "choice") {
        name = [];
        ns = [];
        addNames(name, ns, pattern);
        hash = "";
        for(i = 0;i < name.length;i += 1) {
          hash += "{" + ns[i] + "}" + name[i] + ","
        }
        result = {hash:hash, contains:function(node) {
          var i;
          for(i = 0;i < name.length;i += 1) {
            if(name[i] === node.localName && ns[i] === node.namespaceURI) {
              return true
            }
          }
          return false
        }}
      }else {
        result = {hash:"anyName", contains:function() {
          return true
        }}
      }
    }
    return result
  };
  function resolveElement(pattern, elements) {
    var element, p, i, hash;
    hash = "element" + pattern.id.toString();
    p = elements[pattern.id] = {hash:hash};
    element = createElement(createNameClass(pattern.e[0]), makePattern(pattern.e[1], elements));
    for(i in element) {
      if(element.hasOwnProperty(i)) {
        p[i] = element[i]
      }
    }
    return p
  }
  makePattern = function makePattern(pattern, elements) {
    var p, i;
    if(pattern.name === "elementref") {
      p = pattern.id || 0;
      pattern = elements[p];
      if(pattern.name !== undefined) {
        return resolveElement(pattern, elements)
      }
      return pattern
    }
    switch(pattern.name) {
      case "empty":
        return empty;
      case "notAllowed":
        return notAllowed;
      case "text":
        return text;
      case "choice":
        return createChoice(makePattern(pattern.e[0], elements), makePattern(pattern.e[1], elements));
      case "interleave":
        p = makePattern(pattern.e[0], elements);
        for(i = 1;i < pattern.e.length;i += 1) {
          p = createInterleave(p, makePattern(pattern.e[i], elements))
        }
        return p;
      case "group":
        return createGroup(makePattern(pattern.e[0], elements), makePattern(pattern.e[1], elements));
      case "oneOrMore":
        return createOneOrMore(makePattern(pattern.e[0], elements));
      case "attribute":
        return createAttribute(createNameClass(pattern.e[0]), makePattern(pattern.e[1], elements));
      case "value":
        return createValue(pattern.text);
      case "data":
        p = pattern.a && pattern.a.type;
        if(p === undefined) {
          p = ""
        }
        return createData(p);
      case "list":
        return createList()
    }
    throw"No support for " + pattern.name;
  };
  this.makePattern = function(pattern, elements) {
    var copy = {}, i;
    for(i in elements) {
      if(elements.hasOwnProperty(i)) {
        copy[i] = elements[i]
      }
    }
    i = makePattern(pattern, copy);
    return i
  };
  this.validate = function validate(walker, callback) {
    var errors;
    walker.currentNode = walker.root;
    errors = childDeriv(null, rootPattern, walker);
    if(!errors.nullable) {
      runtime.log("Error in Relax NG validation: " + errors);
      callback(["Error in Relax NG validation: " + errors])
    }else {
      callback(null)
    }
  };
  this.init = function init(rootPattern1) {
    rootPattern = rootPattern1
  }
};
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNG2 = function RelaxNG2() {
  var start, validateNonEmptyPattern, nsmap, depth = 0, p = "                                                                ";
  function RelaxNGParseError(error, context) {
    this.message = function() {
      if(context) {
        error += context.nodeType === 1 ? " Element " : " Node ";
        error += context.nodeName;
        if(context.nodeValue) {
          error += " with value '" + context.nodeValue + "'"
        }
        error += "."
      }
      return error
    }
  }
  function validateOneOrMore(elementdef, walker, element) {
    var node, i = 0, err;
    do {
      node = walker.currentNode;
      err = validateNonEmptyPattern(elementdef.e[0], walker, element);
      i += 1
    }while(!err && node !== walker.currentNode);
    if(i > 1) {
      walker.currentNode = node;
      return null
    }
    return err
  }
  function qName(node) {
    return nsmap[node.namespaceURI] + ":" + node.localName
  }
  function isWhitespace(node) {
    return node && node.nodeType === 3 && /^\s+$/.test(node.nodeValue)
  }
  function validatePattern(elementdef, walker, element, data) {
    if(elementdef.name === "empty") {
      return null
    }
    return validateNonEmptyPattern(elementdef, walker, element, data)
  }
  function validateAttribute(elementdef, walker, element) {
    if(elementdef.e.length !== 2) {
      throw"Attribute with wrong # of elements: " + elementdef.e.length;
    }
    var att, a, l = elementdef.localnames.length, i;
    for(i = 0;i < l;i += 1) {
      a = element.getAttributeNS(elementdef.namespaces[i], elementdef.localnames[i]);
      if(a === "" && !element.hasAttributeNS(elementdef.namespaces[i], elementdef.localnames[i])) {
        a = undefined
      }
      if(att !== undefined && a !== undefined) {
        return[new RelaxNGParseError("Attribute defined too often.", element)]
      }
      att = a
    }
    if(att === undefined) {
      return[new RelaxNGParseError("Attribute not found: " + elementdef.names, element)]
    }
    return validatePattern(elementdef.e[1], walker, element, att)
  }
  function validateTop(elementdef, walker, element) {
    return validatePattern(elementdef, walker, element)
  }
  function validateElement(elementdef, walker, element) {
    if(elementdef.e.length !== 2) {
      throw"Element with wrong # of elements: " + elementdef.e.length;
    }
    depth += 1;
    var node = walker.currentNode, type = node ? node.nodeType : 0, error = null;
    while(type > 1) {
      if(type !== 8 && (type !== 3 || !/^\s+$/.test(walker.currentNode.nodeValue))) {
        depth -= 1;
        return[new RelaxNGParseError("Not allowed node of type " + type + ".")]
      }
      node = walker.nextSibling();
      type = node ? node.nodeType : 0
    }
    if(!node) {
      depth -= 1;
      return[new RelaxNGParseError("Missing element " + elementdef.names)]
    }
    if(elementdef.names && elementdef.names.indexOf(qName(node)) === -1) {
      depth -= 1;
      return[new RelaxNGParseError("Found " + node.nodeName + " instead of " + elementdef.names + ".", node)]
    }
    if(walker.firstChild()) {
      error = validateTop(elementdef.e[1], walker, node);
      while(walker.nextSibling()) {
        type = walker.currentNode.nodeType;
        if(!isWhitespace(walker.currentNode) && type !== 8) {
          depth -= 1;
          return[new RelaxNGParseError("Spurious content.", walker.currentNode)]
        }
      }
      if(walker.parentNode() !== node) {
        depth -= 1;
        return[new RelaxNGParseError("Implementation error.")]
      }
    }else {
      error = validateTop(elementdef.e[1], walker, node)
    }
    depth -= 1;
    node = walker.nextSibling();
    return error
  }
  function validateChoice(elementdef, walker, element, data) {
    if(elementdef.e.length !== 2) {
      throw"Choice with wrong # of options: " + elementdef.e.length;
    }
    var node = walker.currentNode, err;
    if(elementdef.e[0].name === "empty") {
      err = validateNonEmptyPattern(elementdef.e[1], walker, element, data);
      if(err) {
        walker.currentNode = node
      }
      return null
    }
    err = validatePattern(elementdef.e[0], walker, element, data);
    if(err) {
      walker.currentNode = node;
      err = validateNonEmptyPattern(elementdef.e[1], walker, element, data)
    }
    return err
  }
  function validateInterleave(elementdef, walker, element) {
    var l = elementdef.e.length, n = [l], err, i, todo = l, donethisround, node, subnode, e;
    while(todo > 0) {
      donethisround = 0;
      node = walker.currentNode;
      for(i = 0;i < l;i += 1) {
        subnode = walker.currentNode;
        if(n[i] !== true && n[i] !== subnode) {
          e = elementdef.e[i];
          err = validateNonEmptyPattern(e, walker, element);
          if(err) {
            walker.currentNode = subnode;
            if(n[i] === undefined) {
              n[i] = false
            }
          }else {
            if(subnode === walker.currentNode || e.name === "oneOrMore" || e.name === "choice" && (e.e[0].name === "oneOrMore" || e.e[1].name === "oneOrMore")) {
              donethisround += 1;
              n[i] = subnode
            }else {
              donethisround += 1;
              n[i] = true
            }
          }
        }
      }
      if(node === walker.currentNode && donethisround === todo) {
        return null
      }
      if(donethisround === 0) {
        for(i = 0;i < l;i += 1) {
          if(n[i] === false) {
            return[new RelaxNGParseError("Interleave does not match.", element)]
          }
        }
        return null
      }
      todo = 0;
      for(i = 0;i < l;i += 1) {
        if(n[i] !== true) {
          todo += 1
        }
      }
    }
    return null
  }
  function validateGroup(elementdef, walker, element) {
    if(elementdef.e.length !== 2) {
      throw"Group with wrong # of members: " + elementdef.e.length;
    }
    return validateNonEmptyPattern(elementdef.e[0], walker, element) || validateNonEmptyPattern(elementdef.e[1], walker, element)
  }
  function validateText(elementdef, walker, element) {
    var node = walker.currentNode, type = node ? node.nodeType : 0, error = null;
    while(node !== element && type !== 3) {
      if(type === 1) {
        return[new RelaxNGParseError("Element not allowed here.", node)]
      }
      node = walker.nextSibling();
      type = node ? node.nodeType : 0
    }
    walker.nextSibling();
    return null
  }
  validateNonEmptyPattern = function validateNonEmptyPattern(elementdef, walker, element, data) {
    var name = elementdef.name, err = null;
    if(name === "text") {
      err = validateText(elementdef, walker, element)
    }else {
      if(name === "data") {
        err = null
      }else {
        if(name === "value") {
          if(data !== elementdef.text) {
            err = [new RelaxNGParseError("Wrong value, should be '" + elementdef.text + "', not '" + data + "'", element)]
          }
        }else {
          if(name === "list") {
            err = null
          }else {
            if(name === "attribute") {
              err = validateAttribute(elementdef, walker, element)
            }else {
              if(name === "element") {
                err = validateElement(elementdef, walker, element)
              }else {
                if(name === "oneOrMore") {
                  err = validateOneOrMore(elementdef, walker, element)
                }else {
                  if(name === "choice") {
                    err = validateChoice(elementdef, walker, element, data)
                  }else {
                    if(name === "group") {
                      err = validateGroup(elementdef, walker, element)
                    }else {
                      if(name === "interleave") {
                        err = validateInterleave(elementdef, walker, element)
                      }else {
                        throw name + " not allowed in nonEmptyPattern.";
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return err
  };
  this.validate = function validate(walker, callback) {
    walker.currentNode = walker.root;
    var errors = validatePattern(start.e[0], walker, walker.root);
    callback(errors)
  };
  this.init = function init(start1, nsmap1) {
    start = start1;
    nsmap = nsmap1
  }
};
xmldom.OperationalTransformInterface = function() {
};
xmldom.OperationalTransformInterface.prototype.retain = function(amount) {
};
xmldom.OperationalTransformInterface.prototype.insertCharacters = function(chars) {
};
xmldom.OperationalTransformInterface.prototype.insertElementStart = function(tagname, attributes) {
};
xmldom.OperationalTransformInterface.prototype.insertElementEnd = function() {
};
xmldom.OperationalTransformInterface.prototype.deleteCharacters = function(amount) {
};
xmldom.OperationalTransformInterface.prototype.deleteElementStart = function() {
};
xmldom.OperationalTransformInterface.prototype.deleteElementEnd = function() {
};
xmldom.OperationalTransformInterface.prototype.replaceAttributes = function(atts) {
};
xmldom.OperationalTransformInterface.prototype.updateAttributes = function(atts) {
};
xmldom.OperationalTransformDOM = function OperationalTransformDOM(root, serializer) {
  var pos, length;
  function retain(amount) {
  }
  function insertCharacters(chars) {
  }
  function insertElementStart(tagname, attributes) {
  }
  function insertElementEnd() {
  }
  function deleteCharacters(amount) {
  }
  function deleteElementStart() {
  }
  function deleteElementEnd() {
  }
  function replaceAttributes(atts) {
  }
  function updateAttributes(atts) {
  }
  function atEnd() {
    return pos === length
  }
  this.retain = retain;
  this.insertCharacters = insertCharacters;
  this.insertElementStart = insertElementStart;
  this.insertElementEnd = insertElementEnd;
  this.deleteCharacters = deleteCharacters;
  this.deleteElementStart = deleteElementStart;
  this.deleteElementEnd = deleteElementEnd;
  this.replaceAttributes = replaceAttributes;
  this.updateAttributes = updateAttributes;
  this.atEnd = atEnd
};
xmldom.XPath = function() {
  var createXPathPathIterator, parsePredicates;
  function isSmallestPositive(a, b, c) {
    return a !== -1 && (a < b || b === -1) && (a < c || c === -1)
  }
  function parseXPathStep(xpath, pos, end, steps) {
    var location = "", predicates = [], value, brapos = xpath.indexOf("[", pos), slapos = xpath.indexOf("/", pos), eqpos = xpath.indexOf("=", pos), depth = 0, start = 0;
    if(isSmallestPositive(slapos, brapos, eqpos)) {
      location = xpath.substring(pos, slapos);
      pos = slapos + 1
    }else {
      if(isSmallestPositive(brapos, slapos, eqpos)) {
        location = xpath.substring(pos, brapos);
        pos = parsePredicates(xpath, brapos, predicates)
      }else {
        if(isSmallestPositive(eqpos, slapos, brapos)) {
          location = xpath.substring(pos, eqpos);
          pos = eqpos
        }else {
          location = xpath.substring(pos, end);
          pos = end
        }
      }
    }
    steps.push({location:location, predicates:predicates});
    return pos
  }
  function parseXPath(xpath) {
    var steps = [], p = 0, end = xpath.length, value;
    while(p < end) {
      p = parseXPathStep(xpath, p, end, steps);
      if(p < end && xpath[p] === "=") {
        value = xpath.substring(p + 1, end);
        if(value.length > 2 && (value[0] === "'" || value[0] === '"')) {
          value = value.slice(1, value.length - 1)
        }else {
          try {
            value = parseInt(value, 10)
          }catch(e) {
          }
        }
        p = end
      }
    }
    return{steps:steps, value:value}
  }
  parsePredicates = function parsePredicates(xpath, start, predicates) {
    var pos = start, l = xpath.length, selector, depth = 0;
    while(pos < l) {
      if(xpath[pos] === "]") {
        depth -= 1;
        if(depth <= 0) {
          predicates.push(parseXPath(xpath.substring(start, pos)))
        }
      }else {
        if(xpath[pos] === "[") {
          if(depth <= 0) {
            start = pos + 1
          }
          depth += 1
        }
      }
      pos += 1
    }
    return pos
  };
  function XPathIterator() {
  }
  XPathIterator.prototype.next = function() {
  };
  XPathIterator.prototype.reset = function() {
  };
  function XPathNodeIterator() {
    var node, done = false;
    this.setNode = function setNode(n) {
      node = n
    };
    this.reset = function() {
      done = false
    };
    this.next = function next() {
      var val = done ? null : node;
      done = true;
      return val
    }
  }
  function AttributeIterator(it, namespace, localName) {
    this.reset = function reset() {
      it.reset()
    };
    this.next = function next() {
      var node = it.next(), attr;
      while(node) {
        node = node.getAttributeNodeNS(namespace, localName);
        if(node) {
          return node
        }
        node = it.next()
      }
      return node
    }
  }
  function AllChildElementIterator(it, recurse) {
    var root = it.next(), node = null;
    this.reset = function reset() {
      it.reset();
      root = it.next();
      node = null
    };
    this.next = function next() {
      while(root) {
        if(node) {
          if(recurse && node.firstChild) {
            node = node.firstChild
          }else {
            while(!node.nextSibling && node !== root) {
              node = node.parentNode
            }
            if(node === root) {
              root = it.next()
            }else {
              node = node.nextSibling
            }
          }
        }else {
          do {
            node = root.firstChild;
            if(!node) {
              root = it.next()
            }
          }while(root && !node)
        }
        if(node && node.nodeType === 1) {
          return node
        }
      }
      return null
    }
  }
  function ConditionIterator(it, condition) {
    this.reset = function reset() {
      it.reset()
    };
    this.next = function next() {
      var n = it.next();
      while(n && !condition(n)) {
        n = it.next()
      }
      return n
    }
  }
  function createNodenameFilter(it, name, namespaceResolver) {
    var s = name.split(":", 2), namespace = namespaceResolver(s[0]), localName = s[1];
    return new ConditionIterator(it, function(node) {
      return node.localName === localName && node.namespaceURI === namespace
    })
  }
  function createPredicateFilteredIterator(it, p, namespaceResolver) {
    var nit = new XPathNodeIterator, pit = createXPathPathIterator(nit, p, namespaceResolver), value = p.value;
    if(value === undefined) {
      return new ConditionIterator(it, function(node) {
        nit.setNode(node);
        pit.reset();
        return pit.next()
      })
    }
    return new ConditionIterator(it, function(node) {
      nit.setNode(node);
      pit.reset();
      var n = pit.next();
      return n && n.nodeValue === value
    })
  }
  createXPathPathIterator = function createXPathPathIterator(it, xpath, namespaceResolver) {
    var i, j, step, location, namespace, localName, prefix, p;
    for(i = 0;i < xpath.steps.length;i += 1) {
      step = xpath.steps[i];
      location = step.location;
      if(location === "") {
        it = new AllChildElementIterator(it, false)
      }else {
        if(location[0] === "@") {
          p = location.slice(1).split(":", 2);
          it = new AttributeIterator(it, namespaceResolver(p[0]), p[1])
        }else {
          if(location !== ".") {
            it = new AllChildElementIterator(it, false);
            if(location.indexOf(":") !== -1) {
              it = createNodenameFilter(it, location, namespaceResolver)
            }
          }
        }
      }
      for(j = 0;j < step.predicates.length;j += 1) {
        p = step.predicates[j];
        it = createPredicateFilteredIterator(it, p, namespaceResolver)
      }
    }
    return it
  };
  function fallback(node, xpath, namespaceResolver) {
    var it = new XPathNodeIterator, i, nodelist, parsedXPath, pos;
    it.setNode(node);
    parsedXPath = parseXPath(xpath);
    it = createXPathPathIterator(it, parsedXPath, namespaceResolver);
    nodelist = [];
    i = it.next();
    while(i) {
      nodelist.push(i);
      i = it.next()
    }
    return nodelist
  }
  function getODFElementsWithXPath(node, xpath, namespaceResolver) {
    var doc = node.ownerDocument, nodes, elements = [], n = null;
    if(!doc || !doc.evaluate) {
      elements = fallback(node, xpath, namespaceResolver)
    }else {
      nodes = doc.evaluate(xpath, node, namespaceResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      n = nodes.iterateNext();
      while(n !== null) {
        if(n.nodeType === 1) {
          elements.push(n)
        }
        n = nodes.iterateNext()
      }
    }
    return elements
  }
  xmldom.XPath = function XPath() {
    this.getODFElementsWithXPath = getODFElementsWithXPath
  };
  return xmldom.XPath
}();
runtime.loadClass("xmldom.XPath");
odf.StyleInfo = function StyleInfo() {
  var chartns = "urn:oasis:names:tc:opendocument:xmlns:chart:1.0", dbns = "urn:oasis:names:tc:opendocument:xmlns:database:1.0", dr3dns = "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0", drawns = "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0", fons = "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0", formns = "urn:oasis:names:tc:opendocument:xmlns:form:1.0", numberns = "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0", officens = "urn:oasis:names:tc:opendocument:xmlns:office:1.0", 
  presentationns = "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0", stylens = "urn:oasis:names:tc:opendocument:xmlns:style:1.0", svgns = "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0", tablens = "urn:oasis:names:tc:opendocument:xmlns:table:1.0", textns = "urn:oasis:names:tc:opendocument:xmlns:text:1.0", xmlns = "http://www.w3.org/XML/1998/namespace", elementstyles = {"text":[{ens:stylens, en:"tab-stop", ans:stylens, a:"leader-text-style"}, {ens:stylens, en:"drop-cap", ans:stylens, 
  a:"style-name"}, {ens:textns, en:"notes-configuration", ans:textns, a:"citation-body-style-name"}, {ens:textns, en:"notes-configuration", ans:textns, a:"citation-style-name"}, {ens:textns, en:"a", ans:textns, a:"style-name"}, {ens:textns, en:"alphabetical-index", ans:textns, a:"style-name"}, {ens:textns, en:"linenumbering-configuration", ans:textns, a:"style-name"}, {ens:textns, en:"list-level-style-number", ans:textns, a:"style-name"}, {ens:textns, en:"ruby-text", ans:textns, a:"style-name"}, 
  {ens:textns, en:"span", ans:textns, a:"style-name"}, {ens:textns, en:"a", ans:textns, a:"visited-style-name"}, {ens:stylens, en:"text-properties", ans:stylens, a:"text-line-through-text-style"}, {ens:textns, en:"alphabetical-index-source", ans:textns, a:"main-entry-style-name"}, {ens:textns, en:"index-entry-bibliography", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-chapter", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-link-end", ans:textns, a:"style-name"}, {ens:textns, 
  en:"index-entry-link-start", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-page-number", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-span", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-tab-stop", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-text", ans:textns, a:"style-name"}, {ens:textns, en:"index-title-template", ans:textns, a:"style-name"}, {ens:textns, en:"list-level-style-bullet", ans:textns, a:"style-name"}, {ens:textns, en:"outline-level-style", 
  ans:textns, a:"style-name"}], "paragraph":[{ens:drawns, en:"caption", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"circle", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"connector", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"control", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"custom-shape", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"ellipse", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"frame", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"line", ans:drawns, 
  a:"text-style-name"}, {ens:drawns, en:"measure", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"path", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"polygon", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"polyline", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"rect", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"regular-polygon", ans:drawns, a:"text-style-name"}, {ens:officens, en:"annotation", ans:drawns, a:"text-style-name"}, {ens:formns, en:"column", ans:formns, a:"text-style-name"}, 
  {ens:stylens, en:"style", ans:stylens, a:"next-style-name"}, {ens:tablens, en:"body", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"even-columns", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"even-rows", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"first-column", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"first-row", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"last-column", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"last-row", 
  ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"odd-columns", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"odd-rows", ans:tablens, a:"paragraph-style-name"}, {ens:textns, en:"notes-configuration", ans:textns, a:"default-style-name"}, {ens:textns, en:"alphabetical-index-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"bibliography-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"h", ans:textns, a:"style-name"}, {ens:textns, en:"illustration-index-entry-template", 
  ans:textns, a:"style-name"}, {ens:textns, en:"index-source-style", ans:textns, a:"style-name"}, {ens:textns, en:"object-index-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"p", ans:textns, a:"style-name"}, {ens:textns, en:"table-index-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"table-of-content-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"table-index-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"user-index-entry-template", ans:textns, 
  a:"style-name"}, {ens:stylens, en:"page-layout-properties", ans:stylens, a:"register-truth-ref-style-name"}], "chart":[{ens:chartns, en:"axis", ans:chartns, a:"style-name"}, {ens:chartns, en:"chart", ans:chartns, a:"style-name"}, {ens:chartns, en:"data-label", ans:chartns, a:"style-name"}, {ens:chartns, en:"data-point", ans:chartns, a:"style-name"}, {ens:chartns, en:"equation", ans:chartns, a:"style-name"}, {ens:chartns, en:"error-indicator", ans:chartns, a:"style-name"}, {ens:chartns, en:"floor", 
  ans:chartns, a:"style-name"}, {ens:chartns, en:"footer", ans:chartns, a:"style-name"}, {ens:chartns, en:"grid", ans:chartns, a:"style-name"}, {ens:chartns, en:"legend", ans:chartns, a:"style-name"}, {ens:chartns, en:"mean-value", ans:chartns, a:"style-name"}, {ens:chartns, en:"plot-area", ans:chartns, a:"style-name"}, {ens:chartns, en:"regression-curve", ans:chartns, a:"style-name"}, {ens:chartns, en:"series", ans:chartns, a:"style-name"}, {ens:chartns, en:"stock-gain-marker", ans:chartns, a:"style-name"}, 
  {ens:chartns, en:"stock-loss-marker", ans:chartns, a:"style-name"}, {ens:chartns, en:"stock-range-line", ans:chartns, a:"style-name"}, {ens:chartns, en:"subtitle", ans:chartns, a:"style-name"}, {ens:chartns, en:"title", ans:chartns, a:"style-name"}, {ens:chartns, en:"wall", ans:chartns, a:"style-name"}], "section":[{ens:textns, en:"alphabetical-index", ans:textns, a:"style-name"}, {ens:textns, en:"bibliography", ans:textns, a:"style-name"}, {ens:textns, en:"illustration-index", ans:textns, a:"style-name"}, 
  {ens:textns, en:"index-title", ans:textns, a:"style-name"}, {ens:textns, en:"object-index", ans:textns, a:"style-name"}, {ens:textns, en:"section", ans:textns, a:"style-name"}, {ens:textns, en:"table-of-content", ans:textns, a:"style-name"}, {ens:textns, en:"table-index", ans:textns, a:"style-name"}, {ens:textns, en:"user-index", ans:textns, a:"style-name"}], "ruby":[{ens:textns, en:"ruby", ans:textns, a:"style-name"}], "table":[{ens:dbns, en:"query", ans:dbns, a:"style-name"}, {ens:dbns, en:"table-representation", 
  ans:dbns, a:"style-name"}, {ens:tablens, en:"background", ans:tablens, a:"style-name"}, {ens:tablens, en:"table", ans:tablens, a:"style-name"}], "table-column":[{ens:dbns, en:"column", ans:dbns, a:"style-name"}, {ens:tablens, en:"table-column", ans:tablens, a:"style-name"}], "table-row":[{ens:dbns, en:"query", ans:dbns, a:"default-row-style-name"}, {ens:dbns, en:"table-representation", ans:dbns, a:"default-row-style-name"}, {ens:tablens, en:"table-row", ans:tablens, a:"style-name"}], "table-cell":[{ens:dbns, 
  en:"column", ans:dbns, a:"default-cell-style-name"}, {ens:tablens, en:"table-column", ans:tablens, a:"default-cell-style-name"}, {ens:tablens, en:"table-row", ans:tablens, a:"default-cell-style-name"}, {ens:tablens, en:"body", ans:tablens, a:"style-name"}, {ens:tablens, en:"covered-table-cell", ans:tablens, a:"style-name"}, {ens:tablens, en:"even-columns", ans:tablens, a:"style-name"}, {ens:tablens, en:"covered-table-cell", ans:tablens, a:"style-name"}, {ens:tablens, en:"even-columns", ans:tablens, 
  a:"style-name"}, {ens:tablens, en:"even-rows", ans:tablens, a:"style-name"}, {ens:tablens, en:"first-column", ans:tablens, a:"style-name"}, {ens:tablens, en:"first-row", ans:tablens, a:"style-name"}, {ens:tablens, en:"last-column", ans:tablens, a:"style-name"}, {ens:tablens, en:"last-row", ans:tablens, a:"style-name"}, {ens:tablens, en:"odd-columns", ans:tablens, a:"style-name"}, {ens:tablens, en:"odd-rows", ans:tablens, a:"style-name"}, {ens:tablens, en:"table-cell", ans:tablens, a:"style-name"}], 
  "graphic":[{ens:dr3dns, en:"cube", ans:drawns, a:"style-name"}, {ens:dr3dns, en:"extrude", ans:drawns, a:"style-name"}, {ens:dr3dns, en:"rotate", ans:drawns, a:"style-name"}, {ens:dr3dns, en:"scene", ans:drawns, a:"style-name"}, {ens:dr3dns, en:"sphere", ans:drawns, a:"style-name"}, {ens:drawns, en:"caption", ans:drawns, a:"style-name"}, {ens:drawns, en:"circle", ans:drawns, a:"style-name"}, {ens:drawns, en:"connector", ans:drawns, a:"style-name"}, {ens:drawns, en:"control", ans:drawns, a:"style-name"}, 
  {ens:drawns, en:"custom-shape", ans:drawns, a:"style-name"}, {ens:drawns, en:"ellipse", ans:drawns, a:"style-name"}, {ens:drawns, en:"frame", ans:drawns, a:"style-name"}, {ens:drawns, en:"g", ans:drawns, a:"style-name"}, {ens:drawns, en:"line", ans:drawns, a:"style-name"}, {ens:drawns, en:"measure", ans:drawns, a:"style-name"}, {ens:drawns, en:"page-thumbnail", ans:drawns, a:"style-name"}, {ens:drawns, en:"path", ans:drawns, a:"style-name"}, {ens:drawns, en:"polygon", ans:drawns, a:"style-name"}, 
  {ens:drawns, en:"polyline", ans:drawns, a:"style-name"}, {ens:drawns, en:"rect", ans:drawns, a:"style-name"}, {ens:drawns, en:"regular-polygon", ans:drawns, a:"style-name"}, {ens:officens, en:"annotation", ans:drawns, a:"style-name"}], "presentation":[{ens:dr3dns, en:"cube", ans:presentationns, a:"style-name"}, {ens:dr3dns, en:"extrude", ans:presentationns, a:"style-name"}, {ens:dr3dns, en:"rotate", ans:presentationns, a:"style-name"}, {ens:dr3dns, en:"scene", ans:presentationns, a:"style-name"}, 
  {ens:dr3dns, en:"sphere", ans:presentationns, a:"style-name"}, {ens:drawns, en:"caption", ans:presentationns, a:"style-name"}, {ens:drawns, en:"circle", ans:presentationns, a:"style-name"}, {ens:drawns, en:"connector", ans:presentationns, a:"style-name"}, {ens:drawns, en:"control", ans:presentationns, a:"style-name"}, {ens:drawns, en:"custom-shape", ans:presentationns, a:"style-name"}, {ens:drawns, en:"ellipse", ans:presentationns, a:"style-name"}, {ens:drawns, en:"frame", ans:presentationns, a:"style-name"}, 
  {ens:drawns, en:"g", ans:presentationns, a:"style-name"}, {ens:drawns, en:"line", ans:presentationns, a:"style-name"}, {ens:drawns, en:"measure", ans:presentationns, a:"style-name"}, {ens:drawns, en:"page-thumbnail", ans:presentationns, a:"style-name"}, {ens:drawns, en:"path", ans:presentationns, a:"style-name"}, {ens:drawns, en:"polygon", ans:presentationns, a:"style-name"}, {ens:drawns, en:"polyline", ans:presentationns, a:"style-name"}, {ens:drawns, en:"rect", ans:presentationns, a:"style-name"}, 
  {ens:drawns, en:"regular-polygon", ans:presentationns, a:"style-name"}, {ens:officens, en:"annotation", ans:presentationns, a:"style-name"}], "drawing-page":[{ens:drawns, en:"page", ans:drawns, a:"style-name"}, {ens:presentationns, en:"notes", ans:drawns, a:"style-name"}, {ens:stylens, en:"handout-master", ans:drawns, a:"style-name"}, {ens:stylens, en:"master-page", ans:drawns, a:"style-name"}], "list-style":[{ens:textns, en:"list", ans:textns, a:"style-name"}, {ens:textns, en:"numbered-paragraph", 
  ans:textns, a:"style-name"}, {ens:textns, en:"list-item", ans:textns, a:"style-override"}, {ens:stylens, en:"style", ans:stylens, a:"list-style-name"}, {ens:stylens, en:"style", ans:stylens, a:"data-style-name"}, {ens:stylens, en:"style", ans:stylens, a:"percentage-data-style-name"}, {ens:presentationns, en:"date-time-decl", ans:stylens, a:"data-style-name"}, {ens:textns, en:"creation-date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"creation-time", ans:stylens, a:"data-style-name"}, {ens:textns, 
  en:"database-display", ans:stylens, a:"data-style-name"}, {ens:textns, en:"date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"editing-duration", ans:stylens, a:"data-style-name"}, {ens:textns, en:"expression", ans:stylens, a:"data-style-name"}, {ens:textns, en:"meta-field", ans:stylens, a:"data-style-name"}, {ens:textns, en:"modification-date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"modification-time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"print-date", ans:stylens, 
  a:"data-style-name"}, {ens:textns, en:"print-time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"table-formula", ans:stylens, a:"data-style-name"}, {ens:textns, en:"time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"user-defined", ans:stylens, a:"data-style-name"}, {ens:textns, en:"user-field-get", ans:stylens, a:"data-style-name"}, {ens:textns, en:"user-field-input", ans:stylens, a:"data-style-name"}, {ens:textns, en:"variable-get", ans:stylens, a:"data-style-name"}, {ens:textns, 
  en:"variable-input", ans:stylens, a:"data-style-name"}, {ens:textns, en:"variable-set", ans:stylens, a:"data-style-name"}], "data":[{ens:stylens, en:"style", ans:stylens, a:"data-style-name"}, {ens:stylens, en:"style", ans:stylens, a:"percentage-data-style-name"}, {ens:presentationns, en:"date-time-decl", ans:stylens, a:"data-style-name"}, {ens:textns, en:"creation-date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"creation-time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"database-display", 
  ans:stylens, a:"data-style-name"}, {ens:textns, en:"date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"editing-duration", ans:stylens, a:"data-style-name"}, {ens:textns, en:"expression", ans:stylens, a:"data-style-name"}, {ens:textns, en:"meta-field", ans:stylens, a:"data-style-name"}, {ens:textns, en:"modification-date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"modification-time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"print-date", ans:stylens, a:"data-style-name"}, 
  {ens:textns, en:"print-time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"table-formula", ans:stylens, a:"data-style-name"}, {ens:textns, en:"time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"user-defined", ans:stylens, a:"data-style-name"}, {ens:textns, en:"user-field-get", ans:stylens, a:"data-style-name"}, {ens:textns, en:"user-field-input", ans:stylens, a:"data-style-name"}, {ens:textns, en:"variable-get", ans:stylens, a:"data-style-name"}, {ens:textns, en:"variable-input", 
  ans:stylens, a:"data-style-name"}, {ens:textns, en:"variable-set", ans:stylens, a:"data-style-name"}], "page-layout":[{ens:presentationns, en:"notes", ans:stylens, a:"page-layout-name"}, {ens:stylens, en:"handout-master", ans:stylens, a:"page-layout-name"}, {ens:stylens, en:"master-page", ans:stylens, a:"page-layout-name"}]}, elements, xpath = new xmldom.XPath;
  function hasDerivedStyles(odfbody, nsResolver, styleElement) {
    var nodes, xp, stylens = nsResolver("style"), styleName = styleElement.getAttributeNS(stylens, "name"), styleFamily = styleElement.getAttributeNS(stylens, "family");
    xp = "//style:*[@style:parent-style-name='" + styleName + "'][@style:family='" + styleFamily + "']";
    nodes = xpath.getODFElementsWithXPath(odfbody, xp, nsResolver);
    if(nodes.length) {
      return true
    }
    return false
  }
  function canElementHaveStyle(family, element) {
    var elname = elements[element.localName], elns = elname && elname[element.namespaceURI], length = elns ? elns.length : 0, i;
    return length > 0
  }
  function getStyleRef(family, element) {
    var elname = elements[element.localName], elns = elname && elname[element.namespaceURI], length = elns ? elns.length : 0, i, attr;
    for(i = 0;i < length;i += 1) {
      attr = element.getAttributeNS(elns[i].ns, elns[i].localname)
    }
    return null
  }
  function determineUsedStyles(styleUsingElementsRoot, usedStyles) {
    var elname = elements[styleUsingElementsRoot.localName], elns = elname && elname[styleUsingElementsRoot.namespaceURI], length = elns ? elns.length : 0, i, stylename, keyname, map, e;
    for(i = 0;i < length;i += 1) {
      stylename = styleUsingElementsRoot.getAttributeNS(elns[i].ns, elns[i].localname);
      if(stylename) {
        keyname = elns[i].keyname;
        map = usedStyles[keyname] = usedStyles[keyname] || {};
        map[stylename] = 1
      }
    }
    i = styleUsingElementsRoot.firstChild;
    while(i) {
      if(i.nodeType === 1) {
        e = i;
        determineUsedStyles(e, usedStyles)
      }
      i = i.nextSibling
    }
  }
  function inverse(elementstyles) {
    var keyname, i, l, list, item, elements = {}, map, array;
    for(keyname in elementstyles) {
      if(elementstyles.hasOwnProperty(keyname)) {
        list = elementstyles[keyname];
        l = list.length;
        for(i = 0;i < l;i += 1) {
          item = list[i];
          map = elements[item.en] = elements[item.en] || {};
          array = map[item.ens] = map[item.ens] || [];
          array.push({ns:item.ans, localname:item.a, keyname:keyname})
        }
      }
    }
    return elements
  }
  this.UsedStyleList = function(styleUsingElementsRoot) {
    var usedStyles = {};
    this.uses = function(element) {
      var localName = element.localName, name = element.getAttributeNS(drawns, "name") || element.getAttributeNS(stylens, "name"), keyName, map;
      if(localName === "style") {
        keyName = element.getAttributeNS(stylens, "family")
      }else {
        if(element.namespaceURI === numberns) {
          keyName = "data"
        }else {
          keyName = localName
        }
      }
      map = usedStyles[keyName];
      return map ? map[name] > 0 : false
    };
    determineUsedStyles(styleUsingElementsRoot, usedStyles)
  };
  this.canElementHaveStyle = canElementHaveStyle;
  this.hasDerivedStyles = hasDerivedStyles;
  elements = inverse(elementstyles)
};
odf.Style2CSS = function Style2CSS() {
  var xlinkns = "http://www.w3.org/1999/xlink", drawns = "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0", fons = "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0", officens = "urn:oasis:names:tc:opendocument:xmlns:office:1.0", presentationns = "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0", stylens = "urn:oasis:names:tc:opendocument:xmlns:style:1.0", svgns = "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0", tablens = "urn:oasis:names:tc:opendocument:xmlns:table:1.0", 
  textns = "urn:oasis:names:tc:opendocument:xmlns:text:1.0", xmlns = "http://www.w3.org/XML/1998/namespace", namespaces = {"draw":drawns, "fo":fons, "office":officens, "presentation":presentationns, "style":stylens, "svg":svgns, "table":tablens, "text":textns, "xlink":xlinkns, "xml":xmlns}, familynamespaceprefixes = {"graphic":"draw", "paragraph":"text", "presentation":"presentation", "ruby":"text", "section":"text", "table":"table", "table-cell":"table", "table-column":"table", "table-row":"table", 
  "text":"text", "list":"text"}, familytagnames = {"graphic":["circle", "connected", "control", "custom-shape", "ellipse", "frame", "g", "line", "measure", "page", "page-thumbnail", "path", "polygon", "polyline", "rect", "regular-polygon"], "paragraph":["alphabetical-index-entry-template", "h", "illustration-index-entry-template", "index-source-style", "object-index-entry-template", "p", "table-index-entry-template", "table-of-content-entry-template", "user-index-entry-template"], "presentation":["caption", 
  "circle", "connector", "control", "custom-shape", "ellipse", "frame", "g", "line", "measure", "page-thumbnail", "path", "polygon", "polyline", "rect", "regular-polygon"], "ruby":["ruby", "ruby-text"], "section":["alphabetical-index", "bibliography", "illustration-index", "index-title", "object-index", "section", "table-of-content", "table-index", "user-index"], "table":["background", "table"], "table-cell":["body", "covered-table-cell", "even-columns", "even-rows", "first-column", "first-row", 
  "last-column", "last-row", "odd-columns", "odd-rows", "table-cell"], "table-column":["table-column"], "table-row":["table-row"], "text":["a", "index-entry-chapter", "index-entry-link-end", "index-entry-link-start", "index-entry-page-number", "index-entry-span", "index-entry-tab-stop", "index-entry-text", "index-title-template", "linenumbering-configuration", "list-level-style-number", "list-level-style-bullet", "outline-level-style", "span"], "list":["list-item"]}, textPropertySimpleMapping = [[fons, 
  "color", "color"], [fons, "background-color", "background-color"], [fons, "font-weight", "font-weight"], [fons, "font-style", "font-style"], [fons, "font-size", "font-size"]], bgImageSimpleMapping = [[stylens, "repeat", "background-repeat"]], paragraphPropertySimpleMapping = [[fons, "background-color", "background-color"], [fons, "text-align", "text-align"], [fons, "padding-left", "padding-left"], [fons, "padding-right", "padding-right"], [fons, "padding-top", "padding-top"], [fons, "padding-bottom", 
  "padding-bottom"], [fons, "border-left", "border-left"], [fons, "border-right", "border-right"], [fons, "border-top", "border-top"], [fons, "border-bottom", "border-bottom"], [fons, "margin-left", "margin-left"], [fons, "margin-right", "margin-right"], [fons, "margin-top", "margin-top"], [fons, "margin-bottom", "margin-bottom"], [fons, "border", "border"]], graphicPropertySimpleMapping = [[drawns, "fill-color", "background-color"], [drawns, "fill", "background"], [fons, "min-height", "min-height"], 
  [drawns, "stroke", "border"], [svgns, "stroke-color", "border-color"]], tablecellPropertySimpleMapping = [[fons, "background-color", "background-color"], [fons, "border-left", "border-left"], [fons, "border-right", "border-right"], [fons, "border-top", "border-top"], [fons, "border-bottom", "border-bottom"], [fons, "border", "border"]], tablecolumnPropertySimpleMapping = [[stylens, "column-width", "width"]], tablerowPropertySimpleMapping = [[stylens, "row-height", "height"], [fons, "keep-together", 
  null]], tablePropertySimpleMapping = [[stylens, "width", "width"], [fons, "margin-left", "margin-left"], [fons, "margin-right", "margin-right"], [fons, "margin-top", "margin-top"], [fons, "margin-bottom", "margin-bottom"]], fontFaceDeclsMap = {};
  function namespaceResolver(prefix) {
    return namespaces[prefix] || null
  }
  function getStyleMap(doc, stylesnode) {
    var stylemap = {}, node, name, family, style;
    if(!stylesnode) {
      return stylemap
    }
    node = stylesnode.firstChild;
    while(node) {
      if(node.namespaceURI === stylens && (node.localName === "style" || node.localName === "default-style")) {
        family = node.getAttributeNS(stylens, "family")
      }else {
        if(node.namespaceURI === textns && node.localName === "list-style") {
          family = "list"
        }else {
          family = undefined
        }
      }
      if(family) {
        name = node.getAttributeNS && node.getAttributeNS(stylens, "name");
        if(!name) {
          name = ""
        }
        style = stylemap[family] = stylemap[family] || {};
        style[name] = node
      }
      node = node.nextSibling
    }
    return stylemap
  }
  function findStyle(stylestree, name) {
    if(!name || !stylestree) {
      return null
    }
    if(stylestree[name]) {
      return stylestree[name]
    }
    var derivedStyles = stylestree.derivedStyles, n, style;
    for(n in stylestree) {
      if(stylestree.hasOwnProperty(n)) {
        style = findStyle(stylestree[n].derivedStyles, name);
        if(style) {
          return style
        }
      }
    }
    return null
  }
  function addStyleToStyleTree(stylename, stylesmap, stylestree) {
    var style = stylesmap[stylename], parentname, parentstyle;
    if(!style) {
      return
    }
    parentname = style.getAttributeNS(stylens, "parent-style-name");
    parentstyle = null;
    if(parentname) {
      parentstyle = findStyle(stylestree, parentname);
      if(!parentstyle && stylesmap[parentname]) {
        addStyleToStyleTree(parentname, stylesmap, stylestree);
        parentstyle = stylesmap[parentname];
        stylesmap[parentname] = null
      }
    }
    if(parentstyle) {
      if(!parentstyle.derivedStyles) {
        parentstyle.derivedStyles = {}
      }
      parentstyle.derivedStyles[stylename] = style
    }else {
      stylestree[stylename] = style
    }
  }
  function addStyleMapToStyleTree(stylesmap, stylestree) {
    var name;
    for(name in stylesmap) {
      if(stylesmap.hasOwnProperty(name)) {
        addStyleToStyleTree(name, stylesmap, stylestree);
        stylesmap[name] = null
      }
    }
  }
  function createSelector(family, name) {
    var prefix = familynamespaceprefixes[family], namepart, selector = "", first = true;
    if(prefix === null) {
      return null
    }
    if(name) {
      namepart = "[" + prefix + '|style-name="' + name + '"]'
    }else {
      namepart = "[" + prefix + "|style-name]"
    }
    if(prefix === "presentation") {
      prefix = "draw";
      if(name) {
        namepart = '[presentation|style-name="' + name + '"]'
      }else {
        namepart = "[presentation|style-name]"
      }
    }
    selector = prefix + "|" + familytagnames[family].join(namepart + "," + prefix + "|") + namepart;
    return selector
  }
  function getSelectors(family, name, node) {
    var selectors = [], n, ss, s;
    selectors.push(createSelector(family, name));
    for(n in node.derivedStyles) {
      if(node.derivedStyles.hasOwnProperty(n)) {
        ss = getSelectors(family, n, node.derivedStyles[n]);
        for(s in ss) {
          if(ss.hasOwnProperty(s)) {
            selectors.push(ss[s])
          }
        }
      }
    }
    return selectors
  }
  function getDirectChild(node, ns, name) {
    if(!node) {
      return null
    }
    var c = node.firstChild, e;
    while(c) {
      if(c.namespaceURI === ns && c.localName === name) {
        e = c;
        return e
      }
      c = c.nextSibling
    }
    return null
  }
  function applySimpleMapping(props, mapping) {
    var rule = "", r, value;
    for(r in mapping) {
      if(mapping.hasOwnProperty(r)) {
        r = mapping[r];
        value = props.getAttributeNS(r[0], r[1]);
        if(value) {
          rule += r[2] + ":" + value + ";"
        }
      }
    }
    return rule
  }
  function makeFontFaceDeclsMap(doc, fontFaceDeclsNode) {
    var fontFaceDeclsMap = {}, node, name, family, map;
    if(!fontFaceDeclsNode) {
      return fontFaceDeclsNode
    }
    node = fontFaceDeclsNode.firstChild;
    while(node) {
      if(node.nodeType === 1) {
        family = node.getAttributeNS(svgns, "font-family");
        name = node.getAttributeNS(stylens, "name");
        if(family || node.getElementsByTagNameNS(svgns, "font-face-uri")[0]) {
          if(name) {
            if(!fontFaceDeclsMap[name]) {
              fontFaceDeclsMap[name] = {}
            }
            fontFaceDeclsMap[name] = family
          }
        }
      }
      node = node.nextSibling
    }
    return fontFaceDeclsMap
  }
  function getFontDeclaration(name) {
    return fontFaceDeclsMap[name]
  }
  function getTextProperties(props) {
    var rule = "", fontName, value, textDecoration = "";
    rule += applySimpleMapping(props, textPropertySimpleMapping);
    value = props.getAttributeNS(stylens, "text-underline-style");
    if(value === "solid") {
      textDecoration += " underline"
    }
    value = props.getAttributeNS(stylens, "text-line-through-style");
    if(value === "solid") {
      textDecoration += " line-through"
    }
    if(textDecoration.length) {
      textDecoration = "text-decoration:" + textDecoration + ";";
      rule += textDecoration
    }
    fontName = props.getAttributeNS(stylens, "font-name");
    if(fontName) {
      value = getFontDeclaration(fontName);
      rule += "font-family: " + (value || fontName) + ";"
    }
    return rule
  }
  function getParagraphProperties(props) {
    var rule = "", imageProps, url, element;
    rule += applySimpleMapping(props, paragraphPropertySimpleMapping);
    imageProps = props.getElementsByTagNameNS(stylens, "background-image");
    if(imageProps.length > 0) {
      url = imageProps.item(0).getAttributeNS(xlinkns, "href");
      if(url) {
        rule += "background-image: url('odfkit:" + url + "');";
        element = imageProps.item(0);
        rule += applySimpleMapping(element, bgImageSimpleMapping)
      }
    }
    return rule
  }
  function getGraphicProperties(props) {
    var rule = "";
    rule += applySimpleMapping(props, graphicPropertySimpleMapping);
    return rule
  }
  function getTableCellProperties(props) {
    var rule = "";
    rule += applySimpleMapping(props, tablecellPropertySimpleMapping);
    return rule
  }
  function getTableRowProperties(props) {
    var rule = "";
    rule += applySimpleMapping(props, tablerowPropertySimpleMapping);
    return rule
  }
  function getTableColumnProperties(props) {
    var rule = "";
    rule += applySimpleMapping(props, tablecolumnPropertySimpleMapping);
    return rule
  }
  function getTableProperties(props) {
    var rule = "";
    rule += applySimpleMapping(props, tablePropertySimpleMapping);
    return rule
  }
  function addStyleRule(sheet, family, name, node) {
    var selectors = getSelectors(family, name, node), selector = selectors.join(","), rule = "", properties = getDirectChild(node, stylens, "text-properties");
    if(properties) {
      rule += getTextProperties(properties)
    }
    properties = getDirectChild(node, stylens, "paragraph-properties");
    if(properties) {
      rule += getParagraphProperties(properties)
    }
    properties = getDirectChild(node, stylens, "graphic-properties");
    if(properties) {
      rule += getGraphicProperties(properties)
    }
    properties = getDirectChild(node, stylens, "table-cell-properties");
    if(properties) {
      rule += getTableCellProperties(properties)
    }
    properties = getDirectChild(node, stylens, "table-row-properties");
    if(properties) {
      rule += getTableRowProperties(properties)
    }
    properties = getDirectChild(node, stylens, "table-column-properties");
    if(properties) {
      rule += getTableColumnProperties(properties)
    }
    properties = getDirectChild(node, stylens, "table-properties");
    if(properties) {
      rule += getTableProperties(properties)
    }
    if(family === "table") {
      runtime.log(rule)
    }
    if(rule.length === 0) {
      return
    }
    rule = selector + "{" + rule + "}";
    try {
      sheet.insertRule(rule, sheet.cssRules.length)
    }catch(e) {
      throw e;
    }
  }
  function getNumberRule(node) {
    var style = node.getAttributeNS(stylens, "num-format"), suffix = node.getAttributeNS(stylens, "num-suffix"), prefix = node.getAttributeNS(stylens, "num-prefix"), rule = "", stylemap = {1:"decimal", "a":"lower-latin", "A":"upper-latin", "i":"lower-roman", "I":"upper-roman"}, content = "";
    content = prefix || "";
    if(stylemap.hasOwnProperty(style)) {
      content += " counter(list, " + stylemap[style] + ")"
    }else {
      if(style) {
        content += "'" + style + "';"
      }else {
        content += " ''"
      }
    }
    if(suffix) {
      content += " '" + suffix + "'"
    }
    rule = "content: " + content + ";";
    return rule
  }
  function getImageRule(node) {
    var rule = "content: none;";
    return rule
  }
  function getBulletRule(node) {
    var rule = "", bulletChar = node.getAttributeNS(textns, "bullet-char");
    return"content: '" + bulletChar + "';"
  }
  function addListStyleRule(sheet, name, node, itemrule) {
    var selector = 'text|list[text|style-name="' + name + '"]', level = node.getAttributeNS(textns, "level"), itemSelector, listItemRule, listLevelProps = node.firstChild, listLevelLabelAlign = listLevelProps.firstChild, labelAlignAttr, bulletIndent, listIndent, bulletWidth, rule = "";
    if(listLevelLabelAlign) {
      labelAlignAttr = listLevelLabelAlign.attributes;
      bulletIndent = labelAlignAttr["fo:text-indent"].value;
      listIndent = labelAlignAttr["fo:margin-left"].value
    }
    if(!bulletIndent) {
      bulletIndent = "-0.6cm"
    }
    if(bulletIndent.charAt(0) === "-") {
      bulletWidth = bulletIndent.substring(1)
    }else {
      bulletWidth = "-" + bulletIndent
    }
    level = level && parseInt(level, 10);
    while(level > 1) {
      selector += " > text|list-item > text|list";
      level -= 1
    }
    itemSelector = selector;
    itemSelector += " > text|list-item > *:not(text|list):first-child";
    if(listIndent !== undefined) {
      listItemRule = itemSelector + "{margin-left:" + listIndent + ";}";
      sheet.insertRule(listItemRule, sheet.cssRules.length)
    }
    selector += " > text|list-item > *:not(text|list):first-child:before";
    rule = itemrule;
    rule = selector + "{" + rule + ";";
    rule += "counter-increment:list;";
    rule += "margin-left:" + bulletIndent + ";";
    rule += "width:" + bulletWidth + ";";
    rule += "display:inline-block}";
    try {
      sheet.insertRule(rule, sheet.cssRules.length)
    }catch(e) {
      throw e;
    }
  }
  function addListStyleRules(sheet, name, node) {
    var n = node.firstChild, e, itemrule;
    while(n) {
      if(n.namespaceURI === textns) {
        e = n;
        if(n.localName === "list-level-style-number") {
          itemrule = getNumberRule(e);
          addListStyleRule(sheet, name, e, itemrule)
        }else {
          if(n.localName === "list-level-style-image") {
            itemrule = getImageRule(e);
            addListStyleRule(sheet, name, e, itemrule)
          }else {
            if(n.localName === "list-level-style-bullet") {
              itemrule = getBulletRule(e);
              addListStyleRule(sheet, name, e, itemrule)
            }
          }
        }
      }
      n = n.nextSibling
    }
  }
  function addRule(sheet, family, name, node) {
    if(family === "list") {
      addListStyleRules(sheet, name, node)
    }else {
      addStyleRule(sheet, family, name, node)
    }
  }
  function addRules(sheet, family, name, node) {
    addRule(sheet, family, name, node);
    var n;
    for(n in node.derivedStyles) {
      if(node.derivedStyles.hasOwnProperty(n)) {
        addRules(sheet, family, n, node.derivedStyles[n])
      }
    }
  }
  this.namespaces = namespaces;
  this.namespaceResolver = namespaceResolver;
  this.namespaceResolver.lookupNamespaceURI = this.namespaceResolver;
  this.makeFontFaceDeclsMap = makeFontFaceDeclsMap;
  this.style2css = function(stylesheet, fontFaceDecls, styles, autostyles) {
    var doc, prefix, styletree, tree, name, rule, family, stylenodes, styleautonodes;
    while(stylesheet.cssRules.length) {
      stylesheet.deleteRule(stylesheet.cssRules.length - 1)
    }
    doc = null;
    if(styles) {
      doc = styles.ownerDocument
    }
    if(autostyles) {
      doc = autostyles.ownerDocument
    }
    if(!doc) {
      return
    }
    for(prefix in namespaces) {
      if(namespaces.hasOwnProperty(prefix)) {
        rule = "@namespace " + prefix + " url(" + namespaces[prefix] + ");";
        try {
          stylesheet.insertRule(rule, stylesheet.cssRules.length)
        }catch(e) {
        }
      }
    }
    fontFaceDeclsMap = makeFontFaceDeclsMap(doc, fontFaceDecls);
    stylenodes = getStyleMap(doc, styles);
    styleautonodes = getStyleMap(doc, autostyles);
    styletree = {};
    for(family in familynamespaceprefixes) {
      if(familynamespaceprefixes.hasOwnProperty(family)) {
        tree = styletree[family] = {};
        addStyleMapToStyleTree(stylenodes[family], tree);
        addStyleMapToStyleTree(styleautonodes[family], tree);
        for(name in tree) {
          if(tree.hasOwnProperty(name)) {
            addRules(stylesheet, family, name, tree[name])
          }
        }
      }
    }
  }
};
runtime.loadClass("core.Base64");
runtime.loadClass("xmldom.XPath");
runtime.loadClass("odf.Style2CSS");
odf.FontLoader = function() {
  var style2CSS = new odf.Style2CSS, xpath = new xmldom.XPath, base64 = new core.Base64;
  function getEmbeddedFontDeclarations(fontFaceDecls) {
    var decls = {}, fonts, i, font, name, uris, href, family;
    if(!fontFaceDecls) {
      return decls
    }
    fonts = xpath.getODFElementsWithXPath(fontFaceDecls, "style:font-face[svg:font-face-src]", style2CSS.namespaceResolver);
    for(i = 0;i < fonts.length;i += 1) {
      font = fonts[i];
      name = font.getAttributeNS(style2CSS.namespaces.style, "name");
      family = font.getAttributeNS(style2CSS.namespaces.svg, "font-family");
      uris = xpath.getODFElementsWithXPath(font, "svg:font-face-src/svg:font-face-uri", style2CSS.namespaceResolver);
      if(uris.length > 0) {
        href = uris[0].getAttributeNS(style2CSS.namespaces["xlink"], "href");
        decls[name] = {href:href, family:family}
      }
    }
    return decls
  }
  function addFontToCSS(name, font, fontdata, stylesheet) {
    if(!stylesheet) {
      stylesheet = document.styleSheets[0]
    }
    var cssFamily = font.family || name, rule = "@font-face { font-family: '" + cssFamily + "'; src: " + "url(data:application/x-font-ttf;charset=binary;base64," + base64.convertUTF8ArrayToBase64(fontdata) + ') format("truetype"); }';
    try {
      stylesheet.insertRule(rule, stylesheet.cssRules.length)
    }catch(e) {
      runtime.log("Problem inserting rule in CSS: " + rule)
    }
  }
  function loadFontIntoCSS(embeddedFontDeclarations, zip, pos, stylesheet, callback) {
    var name, i = 0, n;
    for(n in embeddedFontDeclarations) {
      if(embeddedFontDeclarations.hasOwnProperty(n)) {
        if(i === pos) {
          name = n
        }
        i += 1
      }
    }
    if(!name) {
      return callback()
    }
    zip.load(embeddedFontDeclarations[name].href, function(err, fontdata) {
      if(err) {
        runtime.log(err)
      }else {
        addFontToCSS(name, embeddedFontDeclarations[name], fontdata, stylesheet)
      }
      return loadFontIntoCSS(embeddedFontDeclarations, zip, pos + 1, stylesheet, callback)
    })
  }
  function loadFontsIntoCSS(embeddedFontDeclarations, zip, stylesheet) {
    loadFontIntoCSS(embeddedFontDeclarations, zip, 0, stylesheet, function() {
    })
  }
  odf.FontLoader = function FontLoader() {
    var self = this;
    this.loadFonts = function(fontFaceDecls, zip, stylesheet) {
      var embeddedFontDeclarations = getEmbeddedFontDeclarations(fontFaceDecls);
      loadFontsIntoCSS(embeddedFontDeclarations, zip, stylesheet)
    }
  };
  return odf.FontLoader
}();
runtime.loadClass("core.Base64");
runtime.loadClass("core.Zip");
runtime.loadClass("xmldom.LSSerializer");
runtime.loadClass("odf.StyleInfo");
runtime.loadClass("odf.Style2CSS");
runtime.loadClass("odf.FontLoader");
odf.OdfContainer = function() {
  var styleInfo = new odf.StyleInfo, style2CSS = new odf.Style2CSS, namespaces = style2CSS.namespaces, officens = "urn:oasis:names:tc:opendocument:xmlns:office:1.0", manifestns = "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0", webodfns = "urn:webodf:names:origin", nodeorder = ["meta", "settings", "scripts", "font-face-decls", "styles", "automatic-styles", "master-styles", "body"], base64 = new core.Base64, fontLoader = new odf.FontLoader, partMimetypes = {};
  function getDirectChild(node, ns, name) {
    node = node ? node.firstChild : null;
    while(node) {
      if(node.localName === name && node.namespaceURI === ns) {
        return node
      }
      node = node.nextSibling
    }
    return null
  }
  function getNodePosition(child) {
    var childpos = 0, i, l = nodeorder.length;
    for(i = 0;i < l;i += 1) {
      if(child.namespaceURI === officens && child.localName === nodeorder[i]) {
        return i
      }
    }
    return-1
  }
  function OdfNodeFilter(odfroot, styleUsingElementsRoot) {
    var automaticStyles = odfroot.automaticStyles, usedStyleList;
    if(styleUsingElementsRoot) {
      usedStyleList = new styleInfo.UsedStyleList(styleUsingElementsRoot)
    }
    this.acceptNode = function(node) {
      var styleName, styleFamily, result;
      if(node.namespaceURI === "http://www.w3.org/1999/xhtml") {
        result = 3
      }else {
        if(node.namespaceURI && node.namespaceURI.match(/^urn:webodf:/)) {
          result = 2
        }else {
          if(usedStyleList && node.parentNode === automaticStyles && node.nodeType === 1) {
            if(usedStyleList.uses(node)) {
              result = 1
            }else {
              result = 2
            }
          }else {
            result = 1
          }
        }
      }
      return result
    }
  }
  function setChild(node, child) {
    if(!child) {
      return
    }
    var childpos = getNodePosition(child), pos, c = node.firstChild;
    if(childpos === -1) {
      return
    }
    while(c) {
      pos = getNodePosition(c);
      if(pos !== -1 && pos > childpos) {
        break
      }
      c = c.nextSibling
    }
    node.insertBefore(child, c)
  }
  function ODFElement() {
  }
  function ODFDocumentElement(odfcontainer) {
    this.OdfContainer = odfcontainer
  }
  ODFDocumentElement.prototype = new ODFElement;
  ODFDocumentElement.prototype.constructor = ODFDocumentElement;
  ODFDocumentElement.namespaceURI = officens;
  ODFDocumentElement.localName = "document";
  function OdfPart(name, container, zip) {
    var self = this, privatedata;
    this.size = 0;
    this.type = null;
    this.name = name;
    this.container = container;
    this.url = null;
    this.mimetype = null;
    this.document = null;
    this.onreadystatechange = null;
    this.onchange = null;
    this.EMPTY = 0;
    this.LOADING = 1;
    this.DONE = 2;
    this.state = this.EMPTY;
    this.load = function() {
      if(zip === null) {
        return
      }
      var mimetype = partMimetypes[name];
      this.mimetype = mimetype;
      zip.loadAsDataURL(name, mimetype, function(err, url) {
        self.url = url;
        if(self.onchange) {
          self.onchange(self)
        }
        if(self.onstatereadychange) {
          self.onstatereadychange(self)
        }
      })
    };
    this.abort = function() {
    }
  }
  OdfPart.prototype.load = function() {
  };
  OdfPart.prototype.getUrl = function() {
    if(this.data) {
      return"data:;base64," + base64.toBase64(this.data)
    }
    return null
  };
  function OdfPartList(odfcontainer) {
    var self = this;
    this.length = 0;
    this.item = function(index) {
    }
  }
  odf.OdfContainer = function OdfContainer(url, onstatereadychange) {
    var self = this, zip, contentXmlCompletelyLoaded = false;
    this.onstatereadychange = onstatereadychange;
    this.onchange = null;
    this.state = null;
    this.rootElement = null;
    this.parts = null;
    function removeProcessingInstructions(element) {
      var n = element.firstChild, next, e;
      while(n) {
        next = n.nextSibling;
        if(n.nodeType === 1) {
          e = n;
          removeProcessingInstructions(e)
        }else {
          if(n.nodeType === 7) {
            element.removeChild(n)
          }
        }
        n = next
      }
    }
    function tagAutomaticStylesOrigin(stylesRootElement, origin) {
      var n = stylesRootElement && stylesRootElement.firstChild;
      while(n) {
        if(n.nodeType === 1) {
          n.setAttributeNS(webodfns, "origin", origin)
        }
        n = n.nextSibling
      }
    }
    function cloneStylesByOrigin(stylesRootElement, origin) {
      var copy = null, n, s;
      if(stylesRootElement) {
        copy = stylesRootElement.cloneNode(true);
        n = copy.firstChild;
        while(n) {
          s = n.nextSibling;
          if(n.nodeType === 1) {
            if(n.getAttributeNS(webodfns, "origin") !== origin) {
              copy.removeChild(n)
            }
          }
          n = s
        }
      }
      return copy
    }
    function importRootNode(xmldoc) {
      var doc = self.rootElement.ownerDocument, node;
      if(xmldoc) {
        removeProcessingInstructions(xmldoc.documentElement);
        try {
          node = doc.importNode(xmldoc.documentElement, true)
        }catch(e) {
        }
      }
      return node
    }
    function setState(state) {
      self.state = state;
      if(self.onchange) {
        self.onchange(self)
      }
      if(self.onstatereadychange) {
        self.onstatereadychange(self)
      }
    }
    function handleFlatXml(xmldoc) {
      var root = importRootNode(xmldoc);
      if(!root || root.localName !== "document" || root.namespaceURI !== officens) {
        setState(OdfContainer.INVALID);
        return
      }
      self.rootElement = root;
      root.fontFaceDecls = getDirectChild(root, officens, "font-face-decls");
      root.styles = getDirectChild(root, officens, "styles");
      root.automaticStyles = getDirectChild(root, officens, "automatic-styles");
      root.masterStyles = getDirectChild(root, officens, "master-styles");
      root.body = getDirectChild(root, officens, "body");
      root.meta = getDirectChild(root, officens, "meta");
      setState(OdfContainer.DONE)
    }
    function handleStylesXml(xmldoc) {
      var node = importRootNode(xmldoc), root = self.rootElement;
      if(!node || node.localName !== "document-styles" || node.namespaceURI !== officens) {
        setState(OdfContainer.INVALID);
        return
      }
      root.fontFaceDecls = getDirectChild(node, officens, "font-face-decls");
      setChild(root, root.fontFaceDecls);
      root.styles = getDirectChild(node, officens, "styles");
      setChild(root, root.styles);
      root.automaticStyles = getDirectChild(node, officens, "automatic-styles");
      tagAutomaticStylesOrigin(root.automaticStyles, "styles.xml");
      setChild(root, root.automaticStyles);
      root.masterStyles = getDirectChild(node, officens, "master-styles");
      setChild(root, root.masterStyles);
      if(root.fontFaceDecls) {
        fontLoader.loadFonts(root.fontFaceDecls, zip, null)
      }
    }
    function handleContentXml(xmldoc) {
      var node = importRootNode(xmldoc), root, automaticStyles, fontFaceDecls, c;
      if(!node || node.localName !== "document-content" || node.namespaceURI !== officens) {
        setState(OdfContainer.INVALID);
        return
      }
      root = self.rootElement;
      fontFaceDecls = getDirectChild(node, officens, "font-face-decls");
      if(root.fontFaceDecls && fontFaceDecls) {
        c = fontFaceDecls.firstChild;
        while(c) {
          root.fontFaceDecls.appendChild(c);
          c = fontFaceDecls.firstChild
        }
      }else {
        if(fontFaceDecls) {
          root.fontFaceDecls = fontFaceDecls;
          setChild(root, fontFaceDecls)
        }
      }
      automaticStyles = getDirectChild(node, officens, "automatic-styles");
      tagAutomaticStylesOrigin(automaticStyles, "content.xml");
      if(root.automaticStyles && automaticStyles) {
        c = automaticStyles.firstChild;
        while(c) {
          root.automaticStyles.appendChild(c);
          c = automaticStyles.firstChild
        }
      }else {
        if(automaticStyles) {
          root.automaticStyles = automaticStyles;
          setChild(root, automaticStyles)
        }
      }
      root.body = getDirectChild(node, officens, "body");
      setChild(root, root.body)
    }
    function handleMetaXml(xmldoc) {
      var node = importRootNode(xmldoc), root;
      if(!node || node.localName !== "document-meta" || node.namespaceURI !== officens) {
        return
      }
      root = self.rootElement;
      root.meta = getDirectChild(node, officens, "meta");
      setChild(root, root.meta)
    }
    function handleSettingsXml(xmldoc) {
      var node = importRootNode(xmldoc), root;
      if(!node || node.localName !== "document-settings" || node.namespaceURI !== officens) {
        return
      }
      root = self.rootElement;
      root.settings = getDirectChild(node, officens, "settings");
      setChild(root, root.settings)
    }
    function handleManifestXml(xmldoc) {
      var node = importRootNode(xmldoc), root, n;
      if(!node || node.localName !== "manifest" || node.namespaceURI !== manifestns) {
        return
      }
      root = self.rootElement;
      root.manifest = node;
      n = root.manifest.firstChild;
      while(n) {
        if(n.nodeType === 1 && n.localName === "file-entry" && n.namespaceURI === manifestns) {
          partMimetypes[n.getAttributeNS(manifestns, "full-path")] = n.getAttributeNS(manifestns, "media-type")
        }
        n = n.nextSibling
      }
    }
    function getContentXmlNode(callback) {
      var handler = {rootElementReady:function(err, rootxml, done) {
        contentXmlCompletelyLoaded = err || done;
        if(err) {
          return callback(err, null)
        }
        var parser = new DOMParser;
        rootxml = parser.parseFromString(rootxml, "text/xml");
        callback(null, rootxml)
      }, bodyChildElementsReady:function(err, nodes, done) {
      }};
      zip.loadContentXmlAsFragments("content.xml", handler)
    }
    function getXmlNode(filepath, callback) {
      zip.loadAsDOM(filepath, callback)
    }
    function loadComponents() {
      getXmlNode("styles.xml", function(err, xmldoc) {
        handleStylesXml(xmldoc);
        if(self.state === OdfContainer.INVALID) {
          return
        }
        getXmlNode("content.xml", function(err, xmldoc) {
          handleContentXml(xmldoc);
          if(self.state === OdfContainer.INVALID) {
            return
          }
          getXmlNode("meta.xml", function(err, xmldoc) {
            handleMetaXml(xmldoc);
            if(self.state === OdfContainer.INVALID) {
              return
            }
            getXmlNode("settings.xml", function(err, xmldoc) {
              if(xmldoc) {
                handleSettingsXml(xmldoc)
              }
              getXmlNode("META-INF/manifest.xml", function(err, xmldoc) {
                if(xmldoc) {
                  handleManifestXml(xmldoc)
                }
                if(self.state !== OdfContainer.INVALID) {
                  setState(OdfContainer.DONE)
                }
              })
            })
          })
        })
      })
    }
    function documentElement(name, map) {
      var s = "", i;
      for(i in map) {
        if(map.hasOwnProperty(i)) {
          s += " xmlns:" + i + '="' + map[i] + '"'
        }
      }
      return'<?xml version="1.0" encoding="UTF-8"?><office:' + name + " " + s + ' office:version="1.2">'
    }
    function serializeMetaXml() {
      var nsmap = style2CSS.namespaces, serializer = new xmldom.LSSerializer, s = documentElement("document-meta", nsmap);
      serializer.filter = new OdfNodeFilter(self.rootElement);
      s += serializer.writeToString(self.rootElement.meta, nsmap);
      s += "</office:document-meta>";
      return s
    }
    function serializeManifestXml() {
      var xml = "<manifest:manifest xmlns:manifest='urn:oasis:names:tc:opendocument:xmlns:manifest:1.0' manifest:version='1.2'><manifest:file-entry manifest:media-type='application/vnd.oasis.opendocument.text' manifest:full-path='/'/>" + "<manifest:file-entry manifest:media-type='text/xml' manifest:full-path='content.xml'/>" + "<manifest:file-entry manifest:media-type='text/xml' manifest:full-path='styles.xml'/>" + "<manifest:file-entry manifest:media-type='text/xml' manifest:full-path='meta.xml'/>" + 
      "<manifest:file-entry manifest:media-type='text/xml' manifest:full-path='settings.xml'/>" + "</manifest:manifest>", manifest = runtime.parseXML(xml), serializer = new xmldom.LSSerializer;
      serializer.filter = new OdfNodeFilter(self.rootElement);
      return serializer.writeToString(manifest, style2CSS.namespaces)
    }
    function serializeSettingsXml() {
      var nsmap = style2CSS.namespaces, serializer = new xmldom.LSSerializer, s = documentElement("document-settings", nsmap);
      serializer.filter = new OdfNodeFilter(self.rootElement);
      s += serializer.writeToString(self.rootElement.settings, nsmap);
      s += "</office:document-settings>";
      return s
    }
    function serializeStylesXml() {
      var nsmap = style2CSS.namespaces, serializer = new xmldom.LSSerializer, automaticStyles = cloneStylesByOrigin(self.rootElement.automaticStyles, "styles.xml"), s = documentElement("document-styles", nsmap);
      serializer.filter = new OdfNodeFilter(self.rootElement);
      s += serializer.writeToString(self.rootElement.fontFaceDecls, nsmap);
      s += serializer.writeToString(self.rootElement.styles, nsmap);
      s += serializer.writeToString(automaticStyles, nsmap);
      s += serializer.writeToString(self.rootElement.masterStyles, nsmap);
      s += "</office:document-styles>";
      return s
    }
    function serializeContentXml() {
      var nsmap = style2CSS.namespaces, serializer = new xmldom.LSSerializer, automaticStyles = cloneStylesByOrigin(self.rootElement.automaticStyles, "content.xml"), s = documentElement("document-content", nsmap);
      serializer.filter = new OdfNodeFilter(self.rootElement);
      s += serializer.writeToString(automaticStyles, nsmap);
      s += serializer.writeToString(self.rootElement.body, nsmap);
      s += "</office:document-content>";
      return s
    }
    function createElement(Type) {
      var original = document.createElementNS(Type.namespaceURI, Type.localName), method, iface = new Type;
      for(method in iface) {
        if(iface.hasOwnProperty(method)) {
          original[method] = iface[method]
        }
      }
      return original
    }
    function loadFromXML(url, callback) {
      runtime.loadXML(url, function(err, dom) {
        if(err) {
          callback(err)
        }else {
          handleFlatXml(dom)
        }
      })
    }
    this.getPart = function(partname) {
      return new OdfPart(partname, self, zip)
    };
    function createEmptyTextDocument() {
      var zip = new core.Zip("", null), data = runtime.byteArrayFromString("application/vnd.oasis.opendocument.text", "utf8"), root = self.rootElement, text = document.createElementNS(officens, "text");
      zip.save("mimetype", data, false, new Date);
      root.body = document.createElementNS(officens, "body");
      root.body.appendChild(text);
      root.appendChild(root.body);
      setState(OdfContainer.DONE);
      return zip
    }
    function fillZip() {
      var data, date = new Date;
      data = runtime.byteArrayFromString(serializeSettingsXml(), "utf8");
      zip.save("settings.xml", data, true, date);
      data = runtime.byteArrayFromString(serializeMetaXml(), "utf8");
      zip.save("meta.xml", data, true, date);
      data = runtime.byteArrayFromString(serializeStylesXml(), "utf8");
      zip.save("styles.xml", data, true, date);
      data = runtime.byteArrayFromString(serializeContentXml(), "utf8");
      zip.save("content.xml", data, true, date);
      data = runtime.byteArrayFromString(serializeManifestXml(), "utf8");
      zip.save("META-INF/manifest.xml", data, true, date)
    }
    function createByteArray(successCallback, errorCallback) {
      fillZip();
      zip.createByteArray(successCallback, errorCallback)
    }
    this.createByteArray = createByteArray;
    function saveAs(newurl, callback) {
      fillZip();
      zip.writeAs(newurl, function(err) {
        callback(err)
      })
    }
    this.saveAs = saveAs;
    this.save = function(callback) {
      saveAs(url, callback)
    };
    this.getUrl = function() {
      return url
    };
    this.state = OdfContainer.LOADING;
    this.rootElement = createElement(ODFDocumentElement);
    this.parts = new OdfPartList(this);
    if(url) {
      zip = new core.Zip(url, function(err, zipobject) {
        zip = zipobject;
        if(err) {
          loadFromXML(url, function(xmlerr) {
            if(err) {
              zip.error = err + "\n" + xmlerr;
              setState(OdfContainer.INVALID)
            }
          })
        }else {
          loadComponents()
        }
      })
    }else {
      zip = createEmptyTextDocument()
    }
  };
  odf.OdfContainer.EMPTY = 0;
  odf.OdfContainer.LOADING = 1;
  odf.OdfContainer.DONE = 2;
  odf.OdfContainer.INVALID = 3;
  odf.OdfContainer.SAVING = 4;
  odf.OdfContainer.MODIFIED = 5;
  odf.OdfContainer.getContainer = function(url) {
    return new odf.OdfContainer(url, null)
  };
  return odf.OdfContainer
}();
odf.Formatting = function Formatting() {
  var odfContainer, styleInfo = new odf.StyleInfo, style2CSS = new odf.Style2CSS, namespaces = style2CSS.namespaces;
  function RangeElementIterator(range) {
    function getNthChild(parent, n) {
      var c = parent && parent.firstChild;
      while(c && n) {
        c = c.nextSibling;
        n -= 1
      }
      return c
    }
    var start = getNthChild(range.startContainer, range.startOffset), end = getNthChild(range.endContainer, range.endOffset), current = start;
    this.next = function() {
      var c = current;
      if(c === null) {
        return c
      }
      return null
    }
  }
  function mergeRecursive(obj1, obj2) {
    var p;
    for(p in obj2) {
      if(obj2.hasOwnProperty(p)) {
        try {
          if(obj2[p].constructor === Object) {
            obj1[p] = mergeRecursive(obj1[p], obj2[p])
          }else {
            obj1[p] = obj2[p]
          }
        }catch(e) {
          obj1[p] = obj2[p]
        }
      }
    }
    return obj1
  }
  function getParentStyle(element) {
    var n = element.firstChild, e;
    if(n.nodeType === 1) {
      e = n;
      return e
    }
    return null
  }
  function getParagraphStyles(range) {
    var iter = new RangeElementIterator(range), e, styles = [];
    e = iter.next();
    while(e) {
      if(styleInfo.canElementHaveStyle("paragraph", e)) {
        styles.push(e)
      }
    }
    return styles
  }
  this.setOdfContainer = function(odfcontainer) {
    odfContainer = odfcontainer
  };
  this.getFontMap = function() {
    var doc = odfContainer.rootElement.ownerDocument, fontFaceDecls = odfContainer.rootElement.fontFaceDecls;
    return style2CSS.makeFontFaceDeclsMap(doc, fontFaceDecls)
  };
  this.isCompletelyBold = function(selection) {
    return false
  };
  this.getAlignment = function(selection) {
    var styles = this.getParagraphStyles(selection), i, l = styles.length;
    return undefined
  };
  this.getParagraphStyles = function(selection) {
    var i, j, s, styles = [];
    for(i = 0;i < selection.length;i += 1) {
      s = getParagraphStyles(selection[i]);
      for(j = 0;j < s.length;j += 1) {
        if(styles.indexOf(s[j]) === -1) {
          styles.push(s[j])
        }
      }
    }
    return styles
  };
  this.getAvailableParagraphStyles = function() {
    var node = odfContainer.rootElement.styles && odfContainer.rootElement.styles.firstChild, p_family, p_name, p_displayName, paragraphStyles = [], style;
    while(node) {
      if(node.nodeType === 1 && node.localName === "style" && node.namespaceURI === namespaces.style) {
        style = node;
        p_family = style.getAttributeNS(namespaces.style, "family");
        if(p_family === "paragraph") {
          p_name = style.getAttributeNS(namespaces.style, "name");
          p_displayName = style.getAttributeNS(namespaces.style, "display-name") || p_name;
          if(p_name && p_displayName) {
            paragraphStyles.push({name:p_name, displayName:p_displayName})
          }
        }
      }
      node = node.nextSibling
    }
    return paragraphStyles
  };
  this.isStyleUsed = function(styleElement) {
    var hasDerivedStyles, isUsed;
    hasDerivedStyles = styleInfo.hasDerivedStyles(odfContainer.rootElement, style2CSS.namespaceResolver, styleElement);
    isUsed = (new styleInfo.UsedStyleList(odfContainer.rootElement.styles)).uses(styleElement) || (new styleInfo.UsedStyleList(odfContainer.rootElement.automaticStyles)).uses(styleElement) || (new styleInfo.UsedStyleList(odfContainer.rootElement.body)).uses(styleElement);
    return hasDerivedStyles || isUsed
  };
  function getDefaultStyleElement(styleListElement, family) {
    var node = styleListElement.firstChild;
    while(node) {
      if(node.nodeType === 1 && node.namespaceURI === namespaces.style && node.localName === "default-style" && node.getAttributeNS(namespaces.style, "family") === family) {
        return node
      }
      node = node.nextSibling
    }
    return null
  }
  function getStyleElement(styleListElement, styleName, family) {
    var node = styleListElement.firstChild;
    while(node) {
      if(node.nodeType === 1 && node.namespaceURI === namespaces.style && node.localName === "style" && node.getAttributeNS(namespaces.style, "family") === family && node.getAttributeNS(namespaces.style, "name") === styleName) {
        return node
      }
      node = node.nextSibling
    }
    return null
  }
  this.getStyleElement = getStyleElement;
  function getStyleAttributes(styleNode) {
    var i, propertiesMap = {}, propertiesNode = styleNode.firstChild;
    while(propertiesNode) {
      if(propertiesNode.nodeType === 1 && propertiesNode.namespaceURI === namespaces.style) {
        propertiesMap[propertiesNode.nodeName] = {};
        for(i = 0;i < propertiesNode.attributes.length;i += 1) {
          propertiesMap[propertiesNode.nodeName][propertiesNode.attributes[i].name] = propertiesNode.attributes[i].value
        }
      }
      propertiesNode = propertiesNode.nextSibling
    }
    return propertiesMap
  }
  this.getStyleAttributes = getStyleAttributes;
  function getInheritedStyleAttributes(styleListElement, styleNode) {
    var i, parentStyleName, propertiesMap = {}, inheritedPropertiesMap = {}, node = styleNode;
    while(node) {
      propertiesMap = getStyleAttributes(node);
      inheritedPropertiesMap = mergeRecursive(propertiesMap, inheritedPropertiesMap);
      parentStyleName = node.getAttributeNS(namespaces.style, "parent-style-name");
      if(parentStyleName) {
        node = getStyleElement(styleListElement, parentStyleName, styleNode.getAttributeNS(namespaces.style, "family"))
      }else {
        node = null
      }
    }
    propertiesMap = getStyleAttributes(getDefaultStyleElement(styleListElement, styleNode.getAttributeNS(namespaces.style, "family")));
    inheritedPropertiesMap = mergeRecursive(propertiesMap, inheritedPropertiesMap);
    return inheritedPropertiesMap
  }
  this.getInheritedStyleAttributes = getInheritedStyleAttributes;
  this.getFirstNamedParentStyleNameOrSelf = function(styleName) {
    var automaticStyleElementList = odfContainer.rootElement.automaticStyles, styleElementList = odfContainer.rootElement.styles, styleElement;
    while((styleElement = getStyleElement(automaticStyleElementList, styleName, "paragraph")) !== null) {
      styleName = styleElement.getAttributeNS(namespaces.style, "parent-style-name")
    }
    styleElement = getStyleElement(styleElementList, styleName, "paragraph");
    if(!styleElement) {
      return null
    }
    return styleName
  };
  this.hasParagraphStyle = function(styleName) {
    return getStyleElement(odfContainer.rootElement.automaticStyles, styleName, "paragraph") || getStyleElement(odfContainer.rootElement.styles, styleName, "paragraph")
  };
  this.getParagraphStyleAttribute = function(styleName, attributeNameNS, attributeName) {
    var automaticStyleElementList = odfContainer.rootElement.automaticStyles, styleElementList = odfContainer.rootElement.styles, styleElement, attributeValue;
    while((styleElement = getStyleElement(automaticStyleElementList, styleName, "paragraph")) !== null) {
      attributeValue = styleElement.getAttributeNS(attributeNameNS, attributeName);
      if(attributeValue) {
        return attributeValue
      }
      styleName = styleElement.getAttributeNS(namespaces.style, "parent-style-name")
    }
    while((styleElement = getStyleElement(styleElementList, styleName, "paragraph")) !== null) {
      attributeValue = styleElement.getAttributeNS(attributeNameNS, attributeName);
      if(attributeValue) {
        return attributeValue
      }
      styleName = styleElement.getAttributeNS(namespaces.style, "parent-style-name")
    }
    return null
  };
  this.getTextStyles = function(selection) {
    return[]
  }
};
runtime.loadClass("odf.OdfContainer");
runtime.loadClass("odf.Formatting");
runtime.loadClass("xmldom.XPath");
odf.OdfCanvas = function() {
  function LoadingQueue() {
    var queue = [], taskRunning = false;
    function run(task) {
      taskRunning = true;
      runtime.setTimeout(function() {
        try {
          task()
        }catch(e) {
          runtime.log(e)
        }
        taskRunning = false;
        if(queue.length > 0) {
          run(queue.pop())
        }
      }, 10)
    }
    this.clearQueue = function() {
      queue.length = 0
    };
    this.addToQueue = function(loadingTask) {
      if(queue.length === 0 && !taskRunning) {
        return run(loadingTask)
      }
      queue.push(loadingTask)
    }
  }
  function PageSwitcher(css) {
    var sheet = css.sheet, position = 1;
    function updateCSS() {
      while(sheet.cssRules.length > 0) {
        sheet.deleteRule(0)
      }
      sheet.insertRule("office|presentation draw|page {display:none;}", 0);
      sheet.insertRule("office|presentation draw|page:nth-child(" + position + ") {display:block;}", 1)
    }
    this.showFirstPage = function() {
      position = 1;
      updateCSS()
    };
    this.showNextPage = function() {
      position += 1;
      updateCSS()
    };
    this.showPreviousPage = function() {
      if(position > 1) {
        position -= 1;
        updateCSS()
      }
    };
    this.showPage = function(n) {
      if(n > 0) {
        position = n;
        updateCSS()
      }
    };
    this.css = css
  }
  function listenEvent(eventTarget, eventType, eventHandler) {
    if(eventTarget.addEventListener) {
      eventTarget.addEventListener(eventType, eventHandler, false)
    }else {
      if(eventTarget.attachEvent) {
        eventType = "on" + eventType;
        eventTarget.attachEvent(eventType, eventHandler)
      }else {
        eventTarget["on" + eventType] = eventHandler
      }
    }
  }
  function SelectionWatcher(element) {
    var selection = [], count = 0, listeners = [];
    function isAncestorOf(ancestor, descendant) {
      while(descendant) {
        if(descendant === ancestor) {
          return true
        }
        descendant = descendant.parentNode
      }
      return false
    }
    function fallsWithin(element, range) {
      return isAncestorOf(element, range.startContainer) && isAncestorOf(element, range.endContainer)
    }
    function getCurrentSelection() {
      var s = [], selection = runtime.getWindow().getSelection(), i, r;
      for(i = 0;i < selection.rangeCount;i += 1) {
        r = selection.getRangeAt(i);
        if(r !== null && fallsWithin(element, r)) {
          s.push(r)
        }
      }
      return s
    }
    function rangesNotEqual(rangeA, rangeB) {
      if(rangeA === rangeB) {
        return false
      }
      if(rangeA === null || rangeB === null) {
        return true
      }
      return rangeA.startContainer !== rangeB.startContainer || rangeA.startOffset !== rangeB.startOffset || rangeA.endContainer !== rangeB.endContainer || rangeA.endOffset !== rangeB.endOffset
    }
    function emitNewSelection() {
      var i, l = listeners.length;
      for(i = 0;i < l;i += 1) {
        listeners[i](element, selection)
      }
    }
    function copySelection(selection) {
      var s = [selection.length], i, oldr, r, doc = element.ownerDocument;
      for(i = 0;i < selection.length;i += 1) {
        oldr = selection[i];
        r = doc.createRange();
        r.setStart(oldr.startContainer, oldr.startOffset);
        r.setEnd(oldr.endContainer, oldr.endOffset);
        s[i] = r
      }
      return s
    }
    function checkSelection() {
      var s = getCurrentSelection(), i;
      if(s.length === selection.length) {
        for(i = 0;i < s.length;i += 1) {
          if(rangesNotEqual(s[i], selection[i])) {
            break
          }
        }
        if(i === s.length) {
          return
        }
      }
      selection = s;
      selection = copySelection(s);
      emitNewSelection()
    }
    this.addListener = function(eventName, handler) {
      var i, l = listeners.length;
      for(i = 0;i < l;i += 1) {
        if(listeners[i] === handler) {
          return
        }
      }
      listeners.push(handler)
    };
    listenEvent(element, "mouseup", checkSelection);
    listenEvent(element, "keyup", checkSelection);
    listenEvent(element, "keydown", checkSelection)
  }
  var style2CSS = new odf.Style2CSS, namespaces = style2CSS.namespaces, drawns = namespaces.draw, fons = namespaces.fo, officens = namespaces.office, stylens = namespaces.style, svgns = namespaces.svg, tablens = namespaces.table, textns = namespaces.text, xlinkns = namespaces.xlink, xmlns = namespaces.xml, window = runtime.getWindow(), xpath = new xmldom.XPath;
  function clear(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }
  function handleStyles(odfelement, stylesxmlcss) {
    var style2css = new odf.Style2CSS;
    style2css.style2css(stylesxmlcss.sheet, odfelement.fontFaceDecls, odfelement.styles, odfelement.automaticStyles)
  }
  function setFramePosition(id, frame, stylesheet) {
    frame.setAttribute("styleid", id);
    var rule, anchor = frame.getAttributeNS(textns, "anchor-type"), x = frame.getAttributeNS(svgns, "x"), y = frame.getAttributeNS(svgns, "y"), width = frame.getAttributeNS(svgns, "width"), height = frame.getAttributeNS(svgns, "height"), minheight = frame.getAttributeNS(fons, "min-height"), minwidth = frame.getAttributeNS(fons, "min-width");
    if(anchor === "as-char") {
      rule = "display: inline-block;"
    }else {
      if(anchor || x || y) {
        rule = "position: absolute;"
      }else {
        if(width || height || minheight || minwidth) {
          rule = "display: block;"
        }
      }
    }
    if(x) {
      rule += "left: " + x + ";"
    }
    if(y) {
      rule += "top: " + y + ";"
    }
    if(width) {
      rule += "width: " + width + ";"
    }
    if(height) {
      rule += "height: " + height + ";"
    }
    if(minheight) {
      rule += "min-height: " + minheight + ";"
    }
    if(minwidth) {
      rule += "min-width: " + minwidth + ";"
    }
    if(rule) {
      rule = "draw|" + frame.localName + '[styleid="' + id + '"] {' + rule + "}";
      stylesheet.insertRule(rule, stylesheet.cssRules.length)
    }
  }
  function getUrlFromBinaryDataElement(image) {
    var node = image.firstChild;
    while(node) {
      if(node.namespaceURI === officens && node.localName === "binary-data") {
        return"data:image/png;base64," + node.textContent
      }
      node = node.nextSibling
    }
    return""
  }
  function setImage(id, container, image, stylesheet) {
    image.setAttribute("styleid", id);
    var url = image.getAttributeNS(xlinkns, "href"), part, node;
    function callback(url) {
      var rule = "background-image: url(" + url + ");";
      rule = 'draw|image[styleid="' + id + '"] {' + rule + "}";
      stylesheet.insertRule(rule, stylesheet.cssRules.length)
    }
    if(url) {
      try {
        if(container.getPartUrl) {
          url = container.getPartUrl(url);
          callback(url)
        }else {
          part = container.getPart(url);
          part.onchange = function(part) {
            callback(part.url)
          };
          part.load()
        }
      }catch(e) {
        runtime.log("slight problem: " + e)
      }
    }else {
      url = getUrlFromBinaryDataElement(image);
      callback(url)
    }
  }
  function formatParagraphAnchors(odfbody) {
    var runtimens = "urn:webodf", n, i, nodes = xpath.getODFElementsWithXPath(odfbody, ".//*[*[@text:anchor-type='paragraph']]", style2CSS.namespaceResolver);
    for(i = 0;i < nodes.length;i += 1) {
      n = nodes[i];
      if(n.setAttributeNS) {
        n.setAttributeNS(runtimens, "containsparagraphanchor", true)
      }
    }
  }
  function modifyTables(container, odffragment, stylesheet) {
    var i, tableCells, node;
    function modifyTableCell(container, node, stylesheet) {
      if(node.hasAttributeNS(tablens, "number-columns-spanned")) {
        node.setAttribute("colspan", node.getAttributeNS(tablens, "number-columns-spanned"))
      }
      if(node.hasAttributeNS(tablens, "number-rows-spanned")) {
        node.setAttribute("rowspan", node.getAttributeNS(tablens, "number-rows-spanned"))
      }
    }
    tableCells = odffragment.getElementsByTagNameNS(tablens, "table-cell");
    for(i = 0;i < tableCells.length;i += 1) {
      node = tableCells.item(i);
      modifyTableCell(container, node, stylesheet)
    }
  }
  function modifyLinks(container, odffragment, stylesheet) {
    var i, links, node;
    function modifyLink(container, node, stylesheet) {
      if(node.hasAttributeNS(xlinkns, "href")) {
        node.onclick = function() {
          window.open(node.getAttributeNS(xlinkns, "href"))
        }
      }
    }
    links = odffragment.getElementsByTagNameNS(textns, "a");
    for(i = 0;i < links.length;i += 1) {
      node = links.item(i);
      modifyLink(container, node, stylesheet)
    }
  }
  function modifyImages(container, odfbody, stylesheet) {
    var node, frames, i, images;
    function namespaceResolver(prefix) {
      return namespaces[prefix]
    }
    frames = [];
    node = odfbody.firstChild;
    while(node && node !== odfbody) {
      if(node.namespaceURI === drawns) {
        frames[frames.length] = node
      }
      if(node.firstChild) {
        node = node.firstChild
      }else {
        while(node && node !== odfbody && !node.nextSibling) {
          node = node.parentNode
        }
        if(node && node.nextSibling) {
          node = node.nextSibling
        }
      }
    }
    for(i = 0;i < frames.length;i += 1) {
      node = frames[i];
      setFramePosition("frame" + String(i), node, stylesheet)
    }
    formatParagraphAnchors(odfbody)
  }
  function setVideo(id, container, plugin, stylesheet) {
    var video, source, url, videoType, doc = plugin.ownerDocument, part, node;
    url = plugin.getAttributeNS(xlinkns, "href");
    function callback(url, mimetype) {
      var ns = doc.documentElement.namespaceURI;
      if(mimetype.substr(0, 6) === "video/") {
        video = doc.createElementNS(ns, "video");
        video.setAttribute("controls", "controls");
        source = doc.createElementNS(ns, "source");
        source.setAttribute("src", url);
        source.setAttribute("type", mimetype);
        video.appendChild(source);
        plugin.parentNode.appendChild(video)
      }else {
        plugin.innerHtml = "Unrecognised Plugin"
      }
    }
    if(url) {
      try {
        if(container.getPartUrl) {
          url = container.getPartUrl(url);
          callback(url, "video/mp4")
        }else {
          part = container.getPart(url);
          part.onchange = function(part) {
            callback(part.url, part.mimetype)
          };
          part.load()
        }
      }catch(e) {
        runtime.log("slight problem: " + e)
      }
    }else {
      runtime.log("using MP4 data fallback");
      url = getUrlFromBinaryDataElement(plugin);
      callback(url, "video/mp4")
    }
  }
  function getNumberRule(node) {
    var style = node.getAttributeNS(stylens, "num-format"), suffix = node.getAttributeNS(stylens, "num-suffix"), prefix = node.getAttributeNS(stylens, "num-prefix"), rule = "", stylemap = {1:"decimal", "a":"lower-latin", "A":"upper-latin", "i":"lower-roman", "I":"upper-roman"}, content;
    content = prefix || "";
    if(stylemap.hasOwnProperty(style)) {
      content += " counter(list, " + stylemap[style] + ")"
    }else {
      if(style) {
        content += "'" + style + "';"
      }else {
        content += " ''"
      }
    }
    if(suffix) {
      content += " '" + suffix + "'"
    }
    rule = "content: " + content + ";";
    return rule
  }
  function getImageRule(node) {
    var rule = "content: none;";
    return rule
  }
  function getBulletRule(node) {
    var rule = "", bulletChar = node.getAttributeNS(textns, "bullet-char");
    return"content: '" + bulletChar + "';"
  }
  function getBulletsRule(node) {
    var itemrule;
    if(node.localName === "list-level-style-number") {
      itemrule = getNumberRule(node)
    }else {
      if(node.localName === "list-level-style-image") {
        itemrule = getImageRule(node)
      }else {
        if(node.localName === "list-level-style-bullet") {
          itemrule = getBulletRule(node)
        }
      }
    }
    return itemrule
  }
  function loadLists(container, odffragment, stylesheet) {
    var i, lists, svgns = namespaces.svg, node, id, continueList, styleName, rule, listMap = {}, parentList, listStyles, listStyle, listStyleMap = {}, bulletRule;
    listStyles = window.document.getElementsByTagNameNS(textns, "list-style");
    for(i = 0;i < listStyles.length;i += 1) {
      node = listStyles.item(i);
      styleName = node.getAttributeNS(stylens, "name");
      if(styleName) {
        listStyleMap[styleName] = node
      }
    }
    lists = odffragment.getElementsByTagNameNS(textns, "list");
    for(i = 0;i < lists.length;i += 1) {
      node = lists.item(i);
      id = node.getAttributeNS(xmlns, "id");
      if(id) {
        continueList = node.getAttributeNS(textns, "continue-list");
        node.setAttribute("id", id);
        rule = "text|list#" + id + " > text|list-item > *:first-child:before {";
        styleName = node.getAttributeNS(textns, "style-name");
        if(styleName) {
          node = listStyleMap[styleName];
          bulletRule = getBulletsRule(node.firstChild)
        }
        if(continueList) {
          parentList = listMap[continueList];
          while(parentList) {
            continueList = parentList;
            parentList = listMap[continueList]
          }
          rule += "counter-increment:" + continueList + ";";
          if(bulletRule) {
            bulletRule = bulletRule.replace("list", continueList);
            rule += bulletRule
          }else {
            rule += "content:counter(" + continueList + ");"
          }
        }else {
          continueList = "";
          if(bulletRule) {
            bulletRule = bulletRule.replace("list", id);
            rule += bulletRule
          }else {
            rule += "content: counter(" + id + ");"
          }
          rule += "counter-increment:" + id + ";";
          stylesheet.insertRule("text|list#" + id + " {counter-reset:" + id + "}", stylesheet.cssRules.length)
        }
        rule += "}";
        listMap[id] = continueList;
        if(rule) {
          stylesheet.insertRule(rule, stylesheet.cssRules.length)
        }
      }
    }
  }
  function addWebODFStyleSheet(document) {
    var head = document.getElementsByTagName("head")[0], style, href;
    if(String(typeof webodf_css) !== "undefined") {
      style = document.createElementNS(head.namespaceURI, "style");
      style.setAttribute("media", "screen, print, handheld, projection");
      style.appendChild(document.createTextNode(webodf_css))
    }else {
      style = document.createElementNS(head.namespaceURI, "link");
      href = "webodf.css";
      if(runtime.currentDirectory) {
        href = runtime.currentDirectory() + "/../" + href
      }
      style.setAttribute("href", href);
      style.setAttribute("rel", "stylesheet")
    }
    style.setAttribute("type", "text/css");
    head.appendChild(style);
    return style
  }
  function addStyleSheet(document) {
    var head = document.getElementsByTagName("head")[0], style = document.createElementNS(head.namespaceURI, "style"), text = "", prefix;
    style.setAttribute("type", "text/css");
    style.setAttribute("media", "screen, print, handheld, projection");
    for(prefix in namespaces) {
      if(namespaces.hasOwnProperty(prefix) && prefix) {
        text += "@namespace " + prefix + " url(" + namespaces[prefix] + ");\n"
      }
    }
    style.appendChild(document.createTextNode(text));
    head.appendChild(style);
    return style
  }
  odf.OdfCanvas = function OdfCanvas(element) {
    var self = this, doc = element.ownerDocument, odfcontainer, formatting = new odf.Formatting, selectionWatcher = new SelectionWatcher(element), slidecssindex = 0, pageSwitcher, stylesxmlcss, positioncss, editable = false, zoomLevel = 1, eventHandlers = {}, editparagraph, loadingQueue = new LoadingQueue;
    addWebODFStyleSheet(doc);
    pageSwitcher = new PageSwitcher(addStyleSheet(doc));
    stylesxmlcss = addStyleSheet(doc);
    positioncss = addStyleSheet(doc);
    function loadImages(container, odffragment, stylesheet) {
      var i, images, node;
      function loadImage(name, container, node, stylesheet) {
        loadingQueue.addToQueue(function() {
          setImage(name, container, node, stylesheet)
        })
      }
      images = odffragment.getElementsByTagNameNS(drawns, "image");
      for(i = 0;i < images.length;i += 1) {
        node = images.item(i);
        loadImage("image" + String(i), container, node, stylesheet)
      }
    }
    function loadVideos(container, odffragment, stylesheet) {
      var i, plugins, node;
      function loadVideo(name, container, node, stylesheet) {
        loadingQueue.addToQueue(function() {
          setVideo(name, container, node, stylesheet)
        })
      }
      plugins = odffragment.getElementsByTagNameNS(drawns, "plugin");
      for(i = 0;i < plugins.length;i += 1) {
        node = plugins.item(i);
        loadVideo("video" + String(i), container, node, stylesheet)
      }
    }
    function addEventListener(eventType, eventHandler) {
      var handlers = eventHandlers[eventType];
      if(handlers === undefined) {
        handlers = eventHandlers[eventType] = []
      }
      if(eventHandler && handlers.indexOf(eventHandler) === -1) {
        handlers.push(eventHandler)
      }
    }
    function fireEvent(eventType, args) {
      if(!eventHandlers.hasOwnProperty(eventType)) {
        return
      }
      var handlers = eventHandlers[eventType], i;
      for(i = 0;i < handlers.length;i += 1) {
        handlers[i].apply(null, args)
      }
    }
    function fixContainerSize() {
      var sizer = element.firstChild, odfdoc = sizer.firstChild;
      if(!odfdoc) {
        return
      }
      if(zoomLevel > 1) {
        sizer.style.MozTransformOrigin = "center top";
        sizer.style.WebkitTransformOrigin = "center top";
        sizer.style.OTransformOrigin = "center top";
        sizer.style.msTransformOrigin = "center top"
      }else {
        sizer.style.MozTransformOrigin = "left top";
        sizer.style.WebkitTransformOrigin = "left top";
        sizer.style.OTransformOrigin = "left top";
        sizer.style.msTransformOrigin = "left top"
      }
      sizer.style.WebkitTransform = "scale(" + zoomLevel + ")";
      sizer.style.MozTransform = "scale(" + zoomLevel + ")";
      sizer.style.OTransform = "scale(" + zoomLevel + ")";
      sizer.style.msTransform = "scale(" + zoomLevel + ")";
      element.style.width = Math.round(zoomLevel * sizer.offsetWidth) + "px";
      element.style.height = Math.round(zoomLevel * sizer.offsetHeight) + "px"
    }
    function handleContent(container, odfnode) {
      var css = positioncss.sheet, sizer;
      modifyImages(container, odfnode.body, css);
      css.insertRule("draw|page { background-color:#fff; }", css.cssRules.length);
      clear(element);
      sizer = doc.createElementNS(element.namespaceURI, "div");
      sizer.style.display = "inline-block";
      sizer.style.background = "white";
      sizer.appendChild(odfnode);
      element.appendChild(sizer);
      modifyTables(container, odfnode.body, css);
      modifyLinks(container, odfnode.body, css);
      loadImages(container, odfnode.body, css);
      loadVideos(container, odfnode.body, css);
      loadLists(container, odfnode.body, css);
      fixContainerSize()
    }
    function refreshOdf() {
      function callback() {
        clear(element);
        element.style.display = "inline-block";
        var odfnode = odfcontainer.rootElement;
        element.ownerDocument.importNode(odfnode, true);
        formatting.setOdfContainer(odfcontainer);
        handleStyles(odfnode, stylesxmlcss);
        handleContent(odfcontainer, odfnode);
        fireEvent("statereadychange", [odfcontainer])
      }
      if(odfcontainer.state === odf.OdfContainer.DONE) {
        callback()
      }else {
        runtime.log("WARNING: refreshOdf called but ODF was not DONE.");
        runtime.setTimeout(function later_cb() {
          if(odfcontainer.state === odf.OdfContainer.DONE) {
            callback()
          }else {
            runtime.log("will be back later...");
            runtime.setTimeout(later_cb, 500)
          }
        }, 100)
      }
    }
    this.refreshCSS = function() {
      handleStyles(odfcontainer.rootElement, stylesxmlcss)
    };
    this.odfContainer = function() {
      return odfcontainer
    };
    this.slidevisibilitycss = function() {
      return pageSwitcher.css
    };
    this.setOdfContainer = function(container) {
      odfcontainer = container;
      refreshOdf()
    };
    this["load"] = this.load = function(url) {
      loadingQueue.clearQueue();
      element.innerHTML = "loading " + url;
      element.removeAttribute("style");
      odfcontainer = new odf.OdfContainer(url, function(container) {
        odfcontainer = container;
        refreshOdf()
      })
    };
    function stopEditing() {
      if(!editparagraph) {
        return
      }
      var fragment = editparagraph.ownerDocument.createDocumentFragment();
      while(editparagraph.firstChild) {
        fragment.insertBefore(editparagraph.firstChild, null)
      }
      editparagraph.parentNode.replaceChild(fragment, editparagraph)
    }
    this.save = function(callback) {
      stopEditing();
      odfcontainer.save(callback)
    };
    function cancelPropagation(event) {
      if(event.stopPropagation) {
        event.stopPropagation()
      }else {
        event.cancelBubble = true
      }
    }
    function cancelEvent(event) {
      if(event.preventDefault) {
        event.preventDefault();
        event.stopPropagation()
      }else {
        event.returnValue = false;
        event.cancelBubble = true
      }
    }
    this.setEditable = function(iseditable) {
      editable = iseditable;
      if(!editable) {
        stopEditing()
      }
    };
    function processClick(evt) {
      evt = evt || window.event;
      var e = evt.target, selection = window.getSelection(), range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null, startContainer = range && range.startContainer, startOffset = range && range.startOffset, endContainer = range && range.endContainer, endOffset = range && range.endOffset, doc, ns;
      while(e && !((e.localName === "p" || e.localName === "h") && e.namespaceURI === textns)) {
        e = e.parentNode
      }
      if(!editable) {
        return
      }
      if(!e || e.parentNode === editparagraph) {
        return
      }
      doc = e.ownerDocument;
      ns = doc.documentElement.namespaceURI;
      if(!editparagraph) {
        editparagraph = doc.createElementNS(ns, "p");
        editparagraph.style.margin = "0px";
        editparagraph.style.padding = "0px";
        editparagraph.style.border = "0px";
        editparagraph.setAttribute("contenteditable", true)
      }else {
        if(editparagraph.parentNode) {
          stopEditing()
        }
      }
      e.parentNode.replaceChild(editparagraph, e);
      editparagraph.appendChild(e);
      editparagraph.focus();
      if(range) {
        selection.removeAllRanges();
        range = e.ownerDocument.createRange();
        range.setStart(startContainer, startOffset);
        range.setEnd(endContainer, endOffset);
        selection.addRange(range)
      }
      cancelEvent(evt)
    }
    this.addListener = function(eventName, handler) {
      switch(eventName) {
        case "selectionchange":
          selectionWatcher.addListener(eventName, handler);
          break;
        case "click":
          listenEvent(element, eventName, handler);
          break;
        default:
          addEventListener(eventName, handler);
          break
      }
    };
    this.getFormatting = function() {
      return formatting
    };
    this.setZoomLevel = function(zoom) {
      zoomLevel = zoom;
      fixContainerSize()
    };
    this.getZoomLevel = function() {
      return zoomLevel
    };
    this.fitToContainingElement = function(width, height) {
      var realWidth = element.offsetWidth / zoomLevel, realHeight = element.offsetHeight / zoomLevel;
      zoomLevel = width / realWidth;
      if(height / realHeight < zoomLevel) {
        zoomLevel = height / realHeight
      }
      fixContainerSize()
    };
    this.fitToWidth = function(width) {
      var realWidth = element.offsetWidth / zoomLevel;
      zoomLevel = width / realWidth;
      fixContainerSize()
    };
    this.fitSmart = function(width, height) {
      var realWidth, realHeight, newScale;
      realWidth = element.offsetWidth / zoomLevel;
      realHeight = element.offsetHeight / zoomLevel;
      newScale = width / realWidth;
      if(height !== undefined) {
        if(height / realHeight < newScale) {
          newScale = height / realHeight
        }
      }
      zoomLevel = Math.min(1, newScale);
      fixContainerSize()
    };
    this.fitToHeight = function(height) {
      var realHeight = element.offsetHeight / zoomLevel;
      zoomLevel = height / realHeight;
      fixContainerSize()
    };
    this.showFirstPage = function() {
      pageSwitcher.showFirstPage()
    };
    this.showNextPage = function() {
      pageSwitcher.showNextPage()
    };
    this.showPreviousPage = function() {
      pageSwitcher.showPreviousPage()
    };
    this.showPage = function(n) {
      pageSwitcher.showPage(n)
    };
    this.showAllPages = function() {
    };
    this.getElement = function() {
      return element
    }
  };
  return odf.OdfCanvas
}();
runtime.loadClass("odf.OdfCanvas");
odf.CommandLineTools = function CommandLineTools() {
  this.roundTrip = function(inputfilepath, outputfilepath, callback) {
    function onready(odfcontainer) {
      if(odfcontainer.state === odf.OdfContainer.INVALID) {
        return callback("Document " + inputfilepath + " is invalid.")
      }
      if(odfcontainer.state === odf.OdfContainer.DONE) {
        odfcontainer.saveAs(outputfilepath, function(err) {
          callback(err)
        })
      }else {
        callback("Document was not completely loaded.")
      }
    }
    var odfcontainer = new odf.OdfContainer(inputfilepath, onready)
  };
  this.render = function(inputfilepath, document, callback) {
    var body = document.getElementsByTagName("body")[0], odfcanvas;
    while(body.firstChild) {
      body.removeChild(body.firstChild)
    }
    odfcanvas = new odf.OdfCanvas(body);
    odfcanvas.addListener("statereadychange", function(err) {
      callback(err)
    });
    odfcanvas.load(inputfilepath)
  }
};
ops.Operation = function Operation(session) {
};
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
ops.OpAddCursor = function OpAddCursor(session) {
  var memberid, timestamp;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp
  };
  this.execute = function(rootNode) {
    var odtDocument = session.getOdtDocument(), cursor = new ops.OdtCursor(memberid, odtDocument);
    odtDocument.addCursor(cursor);
    session.emit(ops.Session.signalCursorAdded, cursor)
  };
  this.spec = function() {
    return{optype:"AddCursor", memberid:memberid, timestamp:timestamp}
  }
};
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
ops.OpRemoveCursor = function OpRemoveCursor(session) {
  var memberid, timestamp, cursorns = "urn:webodf:names:cursor";
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp
  };
  this.execute = function(domroot) {
    session.getOdtDocument().removeCursor(memberid);
    session.emit(ops.Session.signalCursorRemoved, memberid)
  };
  this.spec = function() {
    return{optype:"RemoveCursor", memberid:memberid, timestamp:timestamp}
  }
};
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
ops.OpMoveCursor = function OpMoveCursor(session) {
  var memberid, timestamp, number;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    number = data.number
  };
  this.execute = function(domroot) {
    var odtDocument = session.getOdtDocument(), cursor = odtDocument.getCursor(memberid), positionFilter = odtDocument.getPositionFilter(), stepCounter, steps;
    runtime.assert(cursor !== undefined, "cursor for [" + memberid + "] not found (MoveCursor).");
    stepCounter = cursor.getStepCounter();
    if(number > 0) {
      steps = stepCounter.countForwardSteps(number, positionFilter)
    }else {
      if(number < 0) {
        steps = -stepCounter.countBackwardSteps(-number, positionFilter)
      }else {
        return
      }
    }
    cursor.move(steps);
    session.emit(ops.Session.signalCursorMoved, cursor)
  };
  this.spec = function() {
    return{optype:"MoveCursor", memberid:memberid, timestamp:timestamp, number:number}
  }
};
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
ops.OpInsertText = function OpInsertText(session) {
  var memberid, timestamp, position, text;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    text = data.text
  };
  this.execute = function(domroot) {
    session.getOdtDocument().insertText(memberid, timestamp, position, text)
  };
  this.spec = function() {
    return{optype:"InsertText", memberid:memberid, timestamp:timestamp, position:position, text:text}
  }
};
ops.OpRemoveText = function OpRemoveText(session) {
  var memberid, timestamp, position, length, text;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    length = data.length;
    text = data.text
  };
  this.execute = function(domroot) {
    session.getOdtDocument().removeText(memberid, timestamp, position, length)
  };
  this.spec = function() {
    return{optype:"RemoveText", memberid:memberid, timestamp:timestamp, position:position, length:length, text:text}
  }
};
ops.OpSplitParagraph = function OpSplitParagraph(session) {
  var memberid, timestamp, position;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position
  };
  this.execute = function(rootNode) {
    var odtDocument = session.getOdtDocument(), domPosition, paragraphNode, textNodeCopy, node, splitNode, splitChildNode, keptChildNode;
    domPosition = odtDocument.getPositionInTextNode(position);
    if(domPosition) {
      paragraphNode = odtDocument.getParagraphElement(domPosition.textNode);
      if(paragraphNode) {
        if(domPosition.offset === 0) {
          keptChildNode = domPosition.textNode.previousSibling;
          splitChildNode = null
        }else {
          if(domPosition.textNode.nextSibling && domPosition.textNode.nextSibling.namespaceURI === "urn:webodf:names:cursor" && domPosition.textNode.nextSibling.localName === "cursor") {
            textNodeCopy = domPosition.textNode.cloneNode(false);
            domPosition.textNode.parentNode.insertBefore(textNodeCopy, domPosition.textNode);
            domPosition.textNode.parentNode.removeChild(domPosition.textNode);
            domPosition.textNode = "";
            domPosition.textNode = textNodeCopy
          }
          keptChildNode = domPosition.textNode;
          if(domPosition.offset >= domPosition.textNode.length) {
            splitChildNode = null
          }else {
            splitChildNode = domPosition.textNode.splitText(domPosition.offset)
          }
        }
        node = domPosition.textNode;
        while(node !== paragraphNode) {
          node = node.parentNode;
          splitNode = node.cloneNode(false);
          if(!keptChildNode) {
            node.parentNode.insertBefore(splitNode, node);
            keptChildNode = splitNode;
            splitChildNode = node
          }else {
            if(splitChildNode) {
              splitNode.appendChild(splitChildNode)
            }
            while(keptChildNode.nextSibling) {
              splitNode.appendChild(keptChildNode.nextSibling)
            }
            node.parentNode.insertBefore(splitNode, node.nextSibling);
            keptChildNode = node;
            splitChildNode = splitNode
          }
        }
        odtDocument.emit("paragraphEdited", {element:paragraphNode, memberId:memberid, timeStamp:timestamp});
        odtDocument.emit("paragraphEdited", {element:splitChildNode, memberId:memberid, timeStamp:timestamp})
      }
    }
  };
  this.spec = function() {
    return{optype:"SplitParagraph", memberid:memberid, timestamp:timestamp, position:position}
  }
};
ops.OpSetParagraphStyle = function OpSetParagraphStyle(session) {
  var memberid, timestamp, position, styleNameBefore, styleNameAfter;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    styleNameBefore = data.styleNameBefore;
    styleNameAfter = data.styleNameAfter
  };
  this.execute = function(domroot) {
    var domPosition, paragraphNode, odtDocument = session.getOdtDocument();
    odtDocument.setParagraphStyle(memberid, timestamp, position, styleNameBefore, styleNameAfter);
    domPosition = odtDocument.getPositionInTextNode(position);
    if(domPosition) {
      paragraphNode = odtDocument.getParagraphElement(domPosition.textNode);
      session.emit(ops.Session.signalParagraphChanged, paragraphNode)
    }
  };
  this.spec = function() {
    return{optype:"SetParagraphStyle", memberid:memberid, timestamp:timestamp, position:position, styleNameBefore:styleNameBefore, styleNameAfter:styleNameAfter}
  }
};
ops.OpUpdateParagraphStyle = function OpUpdateParagraphStyle(session) {
  var memberid, timestamp, position, styleName, info;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    styleName = data.styleName;
    info = data.info
  };
  this.execute = function(domroot) {
    var odtDocument = session.getOdtDocument();
    odtDocument.updateParagraphStyle(styleName, info);
    session.emit(ops.Session.signalParagraphStyleModified, styleName)
  };
  this.spec = function() {
    return{optype:"UpdateParagraphStyle", memberid:memberid, timestamp:timestamp, position:position, styleName:styleName, info:info}
  }
};
ops.OpCloneStyle = function OpCloneStyle(session) {
  var memberid, timestamp, styleName, newStyleName, newStyleDisplayName, stylens = "urn:oasis:names:tc:opendocument:xmlns:style:1.0";
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    styleName = data.styleName;
    newStyleName = data.newStyleName;
    newStyleDisplayName = data.newStyleDisplayName
  };
  this.execute = function(domroot) {
    var odtDocument = session.getOdtDocument(), styleNode = odtDocument.getParagraphStyleElement(styleName), newStyleNode = styleNode.cloneNode(true);
    newStyleNode.setAttributeNS(stylens, "style:name", newStyleName);
    newStyleNode.setAttributeNS(stylens, "style:display-name", newStyleDisplayName);
    styleNode.parentNode.appendChild(newStyleNode);
    odtDocument.getOdfCanvas().refreshCSS();
    session.emit(ops.Session.signalStyleCreated, newStyleName)
  };
  this.spec = function() {
    return{optype:"CloneStyle", memberid:memberid, timestamp:timestamp, styleName:styleName, newStyleName:newStyleName, newStyleDisplayName:newStyleDisplayName}
  }
};
ops.OpDeleteStyle = function OpDeleteStyle(session) {
  var memberid, timestamp, styleName;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    styleName = data.styleName
  };
  this.execute = function(domroot) {
    var odtDocument = session.getOdtDocument();
    odtDocument.deleteStyle(styleName);
    session.emit(ops.Session.signalStyleDeleted, styleName)
  };
  this.spec = function() {
    return{optype:"DeleteStyle", memberid:memberid, timestamp:timestamp, styleName:styleName}
  }
};
runtime.loadClass("ops.OpAddCursor");
runtime.loadClass("ops.OpRemoveCursor");
runtime.loadClass("ops.OpMoveCursor");
runtime.loadClass("ops.OpInsertText");
runtime.loadClass("ops.OpRemoveText");
runtime.loadClass("ops.OpSplitParagraph");
runtime.loadClass("ops.OpSetParagraphStyle");
runtime.loadClass("ops.OpUpdateParagraphStyle");
runtime.loadClass("ops.OpCloneStyle");
runtime.loadClass("ops.OpDeleteStyle");
ops.OperationFactory = function OperationFactory(session) {
  var self = this;
  this.create = function(spec) {
    var op = null;
    if(spec.optype === "AddCursor") {
      op = new ops.OpAddCursor(session)
    }else {
      if(spec.optype === "InsertText") {
        op = new ops.OpInsertText(session)
      }else {
        if(spec.optype === "RemoveText") {
          op = new ops.OpRemoveText(session)
        }else {
          if(spec.optype === "SplitParagraph") {
            op = new ops.OpSplitParagraph(session)
          }else {
            if(spec.optype === "SetParagraphStyle") {
              op = new ops.OpSetParagraphStyle(session)
            }else {
              if(spec.optype === "UpdateParagraphStyle") {
                op = new ops.OpUpdateParagraphStyle(session)
              }else {
                if(spec.optype === "CloneStyle") {
                  op = new ops.OpCloneStyle(session)
                }else {
                  if(spec.optype === "DeleteStyle") {
                    op = new ops.OpDeleteStyle(session)
                  }else {
                    if(spec.optype === "MoveCursor") {
                      op = new ops.OpMoveCursor(session)
                    }else {
                      if(spec.optype === "RemoveCursor") {
                        op = new ops.OpRemoveCursor(session)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if(op) {
      op.init(spec)
    }
    return op
  }
};
runtime.loadClass("core.Cursor");
ops.OdtCursor = function OdtCursor(memberId, odtDocument) {
  var self = this, selectionMover, cursor;
  this.removeFromOdtDocument = function() {
    cursor.remove(function(nodeAfterCursor, textNodeIncrease) {
    })
  };
  this.move = function(number) {
    var moved = 0;
    if(number > 0) {
      moved = selectionMover.movePointForward(number)
    }else {
      if(number <= 0) {
        moved = -selectionMover.movePointBackward(-number)
      }
    }
    self.handleUpdate();
    return moved
  };
  this.handleUpdate = function() {
  };
  this.getStepCounter = function() {
    return selectionMover.getStepCounter()
  };
  this.getMemberId = function() {
    return memberId
  };
  this.getNode = function() {
    return cursor.getNode()
  };
  this.getSelection = function() {
    return cursor.getSelection()
  };
  this.getOdtDocument = function() {
    return odtDocument
  };
  function init() {
    var distanceToFirstTextNode, selection;
    selection = new core.Selection(odtDocument.getDOM());
    cursor = new core.Cursor(selection, odtDocument.getDOM());
    cursor.getNode().setAttributeNS("urn:webodf:names:cursor", "memberId", memberId);
    selectionMover = odtDocument.getSelectionManager().createSelectionMover(cursor)
  }
  init()
};
runtime.loadClass("core.Cursor");
runtime.loadClass("core.PositionIterator");
runtime.loadClass("core.PositionFilter");
runtime.loadClass("core.LoopWatchDog");
gui.SelectionMover = function SelectionMover(cursor, rootNode, onCursorAdd, onCursorRemove) {
  var self = this, selection = cursor.getSelection(), positionIterator;
  function doMove(steps, extend, move) {
    var left = steps;
    onCursorRemove = onCursorRemove || self.adaptToCursorRemoval;
    onCursorAdd = onCursorAdd || self.adaptToInsertedCursor;
    cursor.remove(onCursorRemove);
    while(left > 0 && move()) {
      left -= 1
    }
    if(steps - left > 0) {
      selection.collapse(positionIterator.container(), positionIterator.unfilteredDomOffset())
    }
    cursor.updateToSelection(onCursorRemove, onCursorAdd);
    return steps - left
  }
  this.movePointForward = function(steps, extend) {
    return doMove(steps, extend, positionIterator.nextPosition)
  };
  this.movePointBackward = function(steps, extend) {
    return doMove(steps, extend, positionIterator.previousPosition)
  };
  function countForwardSteps(steps, filter) {
    var c = positionIterator.container(), o = positionIterator.offset(), watch = new core.LoopWatchDog(1E3), stepCount = 0, count = 0;
    while(steps > 0 && positionIterator.nextPosition()) {
      stepCount += 1;
      watch.check();
      if(filter.acceptPosition(positionIterator) === 1) {
        count += stepCount;
        stepCount = 0;
        steps -= 1
      }
    }
    positionIterator.setPosition(c, o);
    return count
  }
  function countBackwardSteps(steps, filter) {
    var c = positionIterator.container(), o = positionIterator.offset(), watch = new core.LoopWatchDog(1E3), stepCount = 0, count = 0;
    while(steps > 0 && positionIterator.previousPosition()) {
      stepCount += 1;
      watch.check();
      if(filter.acceptPosition(positionIterator) === 1) {
        count += stepCount;
        stepCount = 0;
        steps -= 1
      }
    }
    positionIterator.setPosition(c, o);
    return count
  }
  function getOffset(el) {
    var x = 0, y = 0;
    while(el && el.nodeType === 1) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.parentNode
    }
    return{top:y, left:x}
  }
  function countLineUpSteps(range, filter) {
    var c = positionIterator.container(), o = positionIterator.offset(), stepCount = 0, count = 0, bestc = null, besto, bestXDiff, bestCount = 0, rect, top, left, newTop, xDiff;
    range.setStart(c, o);
    rect = range.getClientRects()[0];
    newTop = top = rect.top;
    left = rect.left;
    while(positionIterator.previousPosition()) {
      stepCount += 1;
      if(filter.acceptPosition(positionIterator) === 1) {
        count += stepCount;
        stepCount = 0;
        c = positionIterator.container();
        o = positionIterator.offset();
        range.setStart(c, o);
        rect = range.getClientRects()[0];
        if(rect.top !== top) {
          if(rect.top !== newTop) {
            break
          }
          newTop = top;
          xDiff = Math.abs(left - rect.left);
          if(bestc === null || xDiff < bestXDiff) {
            bestc = c;
            besto = o;
            bestXDiff = xDiff;
            bestCount = count
          }
        }
      }
    }
    if(bestc !== null) {
      positionIterator.setPosition(bestc, besto);
      count = bestCount
    }else {
      count = 0
    }
    return count
  }
  function countLinesUpSteps(lines, filter) {
    var c = positionIterator.container(), o = positionIterator.offset(), stepCount, count = 0, range = c.ownerDocument.createRange();
    while(lines > 0) {
      stepCount += countLineUpSteps(range, filter);
      if(stepCount === 0) {
        break
      }
      count += stepCount;
      lines -= 1
    }
    range.detach();
    positionIterator.setPosition(c, o);
    return count
  }
  function countLineDownSteps(lines, filter) {
    var c = positionIterator.container(), o = positionIterator.offset(), span = cursor.getNode().firstChild, watch = new core.LoopWatchDog(1E3), stepCount = 0, count = 0, offset = span.offsetTop, i;
    onCursorRemove = onCursorRemove || self.adaptToCursorRemoval;
    onCursorAdd = onCursorAdd || self.adaptToInsertedCursor;
    while(lines > 0 && positionIterator.nextPosition()) {
      watch.check();
      stepCount += 1;
      if(filter.acceptPosition(positionIterator) === 1) {
        offset = span.offsetTop;
        selection.collapse(positionIterator.container(), positionIterator.offset());
        cursor.updateToSelection(onCursorRemove, onCursorAdd);
        offset = span.offsetTop;
        if(offset !== span.offsetTop) {
          count += stepCount;
          stepCount = 0;
          lines -= 1
        }
      }
    }
    positionIterator.setPosition(c, o);
    selection.collapse(positionIterator.container(), positionIterator.offset());
    cursor.updateToSelection(onCursorRemove, onCursorAdd);
    return count
  }
  function getPositionInContainingNode(node, container) {
    var offset = 0, n;
    while(node.parentNode !== container) {
      runtime.assert(node.parentNode !== null, "parent is null");
      node = node.parentNode
    }
    n = container.firstChild;
    while(n !== node) {
      offset += 1;
      n = n.nextSibling
    }
    return offset
  }
  function comparePoints(c1, o1, c2, o2) {
    if(c1 === c2) {
      return o2 - o1
    }
    var comparison = c1.compareDocumentPosition(c2);
    if(comparison === 2) {
      comparison = -1
    }else {
      if(comparison === 4) {
        comparison = 1
      }else {
        if(comparison === 10) {
          o1 = getPositionInContainingNode(c1, c2);
          comparison = o1 < o2 ? 1 : -1
        }else {
          o2 = getPositionInContainingNode(c2, c1);
          comparison = o2 < o1 ? -1 : 1
        }
      }
    }
    return comparison
  }
  function countStepsToPosition(element, offset, filter) {
    runtime.assert(element !== null, "SelectionMover.countStepsToPosition called with element===null");
    var c = positionIterator.container(), o = positionIterator.offset(), steps = 0, watch = new core.LoopWatchDog(1E3), comparison;
    positionIterator.setPosition(element, offset);
    element = positionIterator.container();
    runtime.assert(element !== null, "SelectionMover.countStepsToPosition: positionIterator.container() returned null");
    offset = positionIterator.offset();
    positionIterator.setPosition(c, o);
    comparison = comparePoints(element, offset, c, o);
    if(comparison < 0) {
      while(positionIterator.nextPosition()) {
        watch.check();
        if(filter.acceptPosition(positionIterator) === 1) {
          steps += 1
        }
        if(positionIterator.container() === element) {
          if(positionIterator.offset() === offset) {
            positionIterator.setPosition(c, o);
            return steps
          }
        }
      }
      positionIterator.setPosition(c, o)
    }else {
      if(comparison > 0) {
        while(positionIterator.previousPosition()) {
          watch.check();
          if(filter.acceptPosition(positionIterator) === 1) {
            steps -= 1
          }
          if(positionIterator.container() === element) {
            if(positionIterator.offset() === offset) {
              positionIterator.setPosition(c, o);
              return steps
            }
          }
        }
        positionIterator.setPosition(c, o)
      }
    }
    return steps
  }
  this.getStepCounter = function() {
    return{countForwardSteps:countForwardSteps, countBackwardSteps:countBackwardSteps, countLineDownSteps:countLineDownSteps, countLinesUpSteps:countLinesUpSteps, countStepsToPosition:countStepsToPosition}
  };
  this.adaptToCursorRemoval = function(nodeAfterCursor, textNodeIncrease) {
    if(textNodeIncrease === 0 || nodeAfterCursor === null || nodeAfterCursor.nodeType !== 3) {
      return
    }
    var c = positionIterator.container();
    if(c === nodeAfterCursor) {
      positionIterator.setPosition(c, positionIterator.offset() + textNodeIncrease)
    }
  };
  this.adaptToInsertedCursor = function(nodeAfterCursor, textNodeDecrease) {
    if(textNodeDecrease === 0 || nodeAfterCursor === null || nodeAfterCursor.nodeType !== 3) {
      return
    }
    var c = positionIterator.container(), oldOffset = positionIterator.offset();
    if(c === nodeAfterCursor) {
      if(oldOffset < textNodeDecrease) {
        do {
          c = c.previousSibling
        }while(c && c.nodeType !== 3);
        if(c) {
          positionIterator.setPosition(c, oldOffset)
        }
      }else {
        positionIterator.setPosition(c, positionIterator.offset() - textNodeDecrease)
      }
    }
  };
  function init() {
    positionIterator = gui.SelectionMover.createPositionIterator(rootNode);
    selection.collapse(positionIterator.container(), positionIterator.offset());
    onCursorRemove = onCursorRemove || self.adaptToCursorRemoval;
    onCursorAdd = onCursorAdd || self.adaptToInsertedCursor;
    cursor.updateToSelection(onCursorRemove, onCursorAdd)
  }
  init()
};
gui.SelectionMover.createPositionIterator = function(rootNode) {
  function CursorFilter() {
    this.acceptNode = function(node) {
      if(node.namespaceURI === "urn:webodf:names:cursor" || node.namespaceURI === "urn:webodf:names:editinfo") {
        return 2
      }
      return 1
    }
  }
  var filter = new CursorFilter;
  return new core.PositionIterator(rootNode, 5, filter, false)
};
(function() {
  return gui.SelectionMover
})();
gui.Avatar = function Avatar(parentElement) {
  var handle, image, displayShown = "block", displayHidden = "none";
  this.setColor = function(color) {
    image.style.borderColor = color
  };
  this.setImageUrl = function(url) {
    image.src = url
  };
  this.isVisible = function() {
    return handle.style.display === displayShown
  };
  this.show = function() {
    handle.style.display = displayShown
  };
  this.hide = function() {
    handle.style.display = displayHidden
  };
  this.markAsFocussed = function(isFocussed) {
    handle.className = isFocussed ? "active" : ""
  };
  function init() {
    var document = parentElement.ownerDocument, htmlns = document.documentElement.namespaceURI;
    handle = document.createElementNS(htmlns, "div");
    image = document.createElementNS(htmlns, "img");
    image.width = 64;
    image.height = 64;
    handle.appendChild(image);
    handle.style.width = "64px";
    handle.style.height = "70px";
    handle.style.position = "absolute";
    handle.style.top = "-80px";
    handle.style.left = "-34px";
    handle.style.display = displayShown;
    parentElement.appendChild(handle)
  }
  init()
};
runtime.loadClass("gui.Avatar");
runtime.loadClass("ops.OdtCursor");
gui.Caret = function Caret(cursor) {
  function clearNode(node) {
    while(node.firstChild !== null) {
      node.removeNode(node.firstChild)
    }
  }
  var self = this, span, avatar, cursorNode, focussed = false, blinking = false, color = "";
  function blink() {
    if(!focussed || !cursorNode.parentNode) {
      return
    }
    if(!blinking) {
      blinking = true;
      span.style.borderColor = span.style.borderColor === "transparent" ? color : "transparent";
      runtime.setTimeout(function() {
        blinking = false;
        blink()
      }, 500)
    }
  }
  function pixelCount(size) {
    var match;
    if(typeof size === "string") {
      if(size === "") {
        return 0
      }
      match = /^(\d+)(\.\d+)?px$/.exec(size);
      runtime.assert(match !== null, "size [" + size + "] does not have unit px.");
      return parseFloat(match[1])
    }
    return size
  }
  function getOffsetBaseElement(element) {
    var anchorElement = element, nodeStyle, window = runtime.getWindow();
    runtime.assert(window !== null, "Expected to be run in an environment which has a global window, like a browser.");
    do {
      anchorElement = anchorElement.parentElement;
      if(!anchorElement) {
        break
      }
      nodeStyle = window.getComputedStyle(anchorElement, null)
    }while(nodeStyle.display !== "block");
    return anchorElement
  }
  function getRelativeOffsetTopLeftBySpacing(element, containerElement) {
    var x = 0, y = 0, elementStyle, window = runtime.getWindow();
    runtime.assert(window !== null, "Expected to be run in an environment which has a global window, like a browser.");
    while(element && element !== containerElement) {
      elementStyle = window.getComputedStyle(element, null);
      x += pixelCount(elementStyle.marginLeft) + pixelCount(elementStyle.borderLeftWidth) + pixelCount(elementStyle.paddingLeft);
      y += pixelCount(elementStyle.marginTop) + pixelCount(elementStyle.borderTopWidth) + pixelCount(elementStyle.paddingTop);
      element = element.parentElement
    }
    return{x:x, y:y}
  }
  function getRelativeOffsetTopLeft(element, containerElement) {
    var reachedContainerElement, offsetParent, e, x = 0, y = 0, resultBySpacing;
    if(!element || !containerElement) {
      return{x:0, y:0}
    }
    reachedContainerElement = false;
    do {
      offsetParent = element.offsetParent;
      e = element.parentNode;
      while(e !== offsetParent) {
        if(e === containerElement) {
          resultBySpacing = getRelativeOffsetTopLeftBySpacing(element, containerElement);
          x += resultBySpacing.x;
          y += resultBySpacing.y;
          reachedContainerElement = true;
          break
        }
        e = e.parentNode
      }
      if(reachedContainerElement) {
        break
      }
      x += pixelCount(element.offsetLeft);
      y += pixelCount(element.offsetTop);
      element = offsetParent
    }while(element && element !== containerElement);
    return{x:x, y:y}
  }
  function getRelativeCaretOffsetRect(caretElement, containerElement, margin) {
    var caretOffsetTopLeft, offsetBaseNode;
    offsetBaseNode = getOffsetBaseElement(caretElement);
    caretOffsetTopLeft = getRelativeOffsetTopLeft(offsetBaseNode, containerElement);
    caretOffsetTopLeft.x += caretElement.offsetLeft;
    caretOffsetTopLeft.y += caretElement.offsetTop;
    return{left:caretOffsetTopLeft.x - margin, top:caretOffsetTopLeft.y - margin, right:caretOffsetTopLeft.x + caretElement.scrollWidth - 1 + margin, bottom:caretOffsetTopLeft.y + caretElement.scrollHeight - 1 + margin}
  }
  this.setFocus = function() {
    focussed = true;
    avatar.markAsFocussed(true);
    blink()
  };
  this.removeFocus = function() {
    focussed = false;
    avatar.markAsFocussed(false);
    span.style.borderColor = color
  };
  this.setAvatarImageUrl = function(url) {
    avatar.setImageUrl(url)
  };
  this.setColor = function(newColor) {
    if(color === newColor) {
      return
    }
    color = newColor;
    if(span.style.borderColor !== "transparent") {
      span.style.borderColor = color
    }
    avatar.setColor(color)
  };
  this.getCursor = function() {
    return cursor
  };
  this.getFocusElement = function() {
    return span
  };
  this.toggleHandleVisibility = function() {
    if(avatar.isVisible()) {
      avatar.hide()
    }else {
      avatar.show()
    }
  };
  this.showHandle = function() {
    avatar.show()
  };
  this.hideHandle = function() {
    avatar.hide()
  };
  this.ensureVisible = function() {
    var canvasElement = cursor.getOdtDocument().getOdfCanvas().getElement(), canvasContainerElement = canvasElement.parentNode, caretOffsetRect, caretMargin = 5;
    caretOffsetRect = getRelativeCaretOffsetRect(span, canvasContainerElement, caretMargin);
    if(caretOffsetRect.top < canvasContainerElement.scrollTop) {
      canvasContainerElement.scrollTop = caretOffsetRect.top
    }else {
      if(caretOffsetRect.bottom > canvasContainerElement.scrollTop + canvasContainerElement.clientHeight - 1) {
        canvasContainerElement.scrollTop = caretOffsetRect.bottom - canvasContainerElement.clientHeight + 1
      }
    }
    if(caretOffsetRect.left < canvasContainerElement.scrollLeft) {
      canvasContainerElement.scrollLeft = caretOffsetRect.left
    }else {
      if(caretOffsetRect.right > canvasContainerElement.scrollLeft + canvasContainerElement.clientWidth - 1) {
        canvasContainerElement.scrollLeft = caretOffsetRect.right - canvasContainerElement.clientWidth + 1
      }
    }
  };
  function init() {
    var dom = cursor.getOdtDocument().getDOM(), htmlns = dom.documentElement.namespaceURI;
    span = dom.createElementNS(htmlns, "span");
    cursorNode = cursor.getNode();
    cursorNode.appendChild(span);
    avatar = new gui.Avatar(cursorNode)
  }
  init()
};
runtime.loadClass("ops.OpAddCursor");
runtime.loadClass("ops.OpRemoveCursor");
runtime.loadClass("ops.OpMoveCursor");
runtime.loadClass("ops.OpInsertText");
runtime.loadClass("ops.OpRemoveText");
runtime.loadClass("ops.OpSplitParagraph");
runtime.loadClass("ops.OpSetParagraphStyle");
gui.SessionController = function() {
  gui.SessionController = function SessionController(session, inputMemberId) {
    var self = this, namespaces = (new odf.Style2CSS).namespaces;
    function listenEvent(eventTarget, eventType, eventHandler) {
      if(eventTarget.addEventListener) {
        eventTarget.addEventListener(eventType, eventHandler, false)
      }else {
        if(eventTarget.attachEvent) {
          eventType = "on" + eventType;
          eventTarget.attachEvent(eventType, eventHandler)
        }else {
          eventTarget["on" + eventType] = eventHandler
        }
      }
    }
    function cancelEvent(event) {
      if(event.preventDefault) {
        event.preventDefault()
      }else {
        event.returnValue = false
      }
    }
    function dummyHandler(e) {
      cancelEvent(e)
    }
    function handleMouseClick(e) {
      var selection = runtime.getWindow().getSelection(), steps, op, node, odtDocument = session.getOdtDocument(), canvasElement = odtDocument.getOdfCanvas().getElement();
      node = selection.focusNode;
      while(node !== canvasElement) {
        if(node.namespaceURI === "urn:webodf:names:cursor" && node.localName === "cursor") {
          return
        }
        node = node.parentNode
      }
      steps = odtDocument.getDistanceFromCursor(inputMemberId, selection.focusNode, selection.focusOffset);
      if(steps !== 0) {
        op = new ops.OpMoveCursor(session);
        op.init({memberid:inputMemberId, number:steps});
        session.enqueue(op)
      }
    }
    function createOpMoveCursor(number) {
      var op = new ops.OpMoveCursor(session);
      op.init({memberid:inputMemberId, number:number});
      return op
    }
    function createOpMoveCursorByHomeKey() {
      var odtDocument = session.getOdtDocument(), steps, paragraphNode, op = null;
      paragraphNode = odtDocument.getParagraphElement(odtDocument.getCursor(inputMemberId).getNode());
      steps = odtDocument.getDistanceFromCursor(inputMemberId, paragraphNode, 0);
      if(steps !== 0) {
        op = new ops.OpMoveCursor(session);
        op.init({memberid:inputMemberId, number:steps})
      }
      return op
    }
    function createOpRemoveTextByBackspaceKey() {
      var odtDocument = session.getOdtDocument(), position = odtDocument.getCursorPosition(inputMemberId), domPosition = odtDocument.getPositionInTextNode(position - 1), op = null;
      if(domPosition) {
        op = new ops.OpRemoveText(session);
        op.init({memberid:inputMemberId, position:position, length:-1})
      }
      return op
    }
    function createOpRemoveTextByDeleteKey() {
      var odtDocument = session.getOdtDocument(), position = odtDocument.getCursorPosition(inputMemberId), domPosition = odtDocument.getPositionInTextNode(position + 1), op = null;
      if(domPosition) {
        op = new ops.OpRemoveText(session);
        op.init({memberid:inputMemberId, position:position, length:1})
      }
      return op
    }
    function enqueueParagraphSplittingOps() {
      var odtDocument = session.getOdtDocument(), position = odtDocument.getCursorPosition(inputMemberId), isAtEndOfParagraph = false, paragraphNode, styleName, nextStyleName, op;
      op = new ops.OpSplitParagraph(session);
      op.init({memberid:inputMemberId, position:position});
      session.enqueue(op)
    }
    function handleKeyDown(e) {
      var keyCode = e.keyCode, op = null, handled = false;
      if(keyCode === 37) {
        op = createOpMoveCursor(-1);
        handled = true
      }else {
        if(keyCode === 39) {
          op = createOpMoveCursor(1);
          handled = true
        }else {
          if(keyCode === 38) {
            op = createOpMoveCursor(-10);
            handled = true
          }else {
            if(keyCode === 40) {
              op = createOpMoveCursor(10);
              handled = true
            }else {
              if(keyCode === 36) {
                op = createOpMoveCursorByHomeKey();
                handled = true
              }else {
                if(keyCode === 35) {
                  handled = true
                }else {
                  if(keyCode === 8) {
                    op = createOpRemoveTextByBackspaceKey();
                    handled = op !== null
                  }else {
                    if(keyCode === 46) {
                      op = createOpRemoveTextByDeleteKey();
                      handled = op !== null
                    }
                  }
                }
              }
            }
          }
        }
      }
      if(op) {
        session.enqueue(op)
      }
      if(handled) {
        cancelEvent(e)
      }
    }
    function stringFromKeyPress(event) {
      if(event.which === null) {
        return String.fromCharCode(event.keyCode)
      }
      if(event.which !== 0 && event.charCode !== 0) {
        return String.fromCharCode(event.which)
      }
      return null
    }
    function handleKeyPress(e) {
      var op, text = stringFromKeyPress(e);
      if(e.keyCode === 13) {
        enqueueParagraphSplittingOps();
        cancelEvent(e)
      }else {
        if(text && !(e.altKey || e.ctrlKey || e.metaKey)) {
          op = new ops.OpInsertText(session);
          op.init({memberid:inputMemberId, position:session.getOdtDocument().getCursorPosition(inputMemberId), text:text});
          session.enqueue(op);
          cancelEvent(e)
        }
      }
    }
    this.startListening = function() {
      var canvasElement = session.getOdtDocument().getOdfCanvas().getElement();
      listenEvent(canvasElement, "keydown", handleKeyDown);
      listenEvent(canvasElement, "keypress", handleKeyPress);
      listenEvent(canvasElement, "keyup", dummyHandler);
      listenEvent(canvasElement, "copy", dummyHandler);
      listenEvent(canvasElement, "cut", dummyHandler);
      listenEvent(canvasElement, "paste", dummyHandler);
      listenEvent(canvasElement, "click", handleMouseClick)
    };
    this.startEditing = function() {
      var op = new ops.OpAddCursor(session);
      op.init({memberid:inputMemberId});
      session.enqueue(op)
    };
    this.endEditing = function() {
      var op = new ops.OpRemoveCursor(session);
      op.init({memberid:inputMemberId});
      session.enqueue(op)
    };
    this.getInputMemberId = function() {
      return inputMemberId
    };
    this.getSession = function() {
      return session
    }
  };
  return gui.SessionController
}();
runtime.loadClass("gui.SelectionMover");
gui.SelectionManager = function SelectionManager(rootNode) {
  var movers = [];
  function onCursorRemove(nodeAfterCursor, textNodeIncrease) {
    var i;
    for(i = 0;i < movers.length;i += 1) {
      movers[i].adaptToCursorRemoval(nodeAfterCursor, textNodeIncrease)
    }
  }
  function onCursorAdd(nodeAfterCursor, textNodeIncrease) {
    var i;
    for(i = 0;i < movers.length;i += 1) {
      movers[i].adaptToInsertedCursor(nodeAfterCursor, textNodeIncrease)
    }
  }
  this.createSelectionMover = function(cursor) {
    var selectionMover = new gui.SelectionMover(cursor, rootNode, onCursorAdd, onCursorRemove);
    movers.push(selectionMover);
    return selectionMover
  }
};
ops.UserModel = function UserModel() {
};
ops.UserModel.prototype.getUserDetailsAndUpdates = function(memberId, subscriber) {
};
ops.UserModel.prototype.unsubscribeUserDetailsUpdates = function(memberId, subscriber) {
};
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
ops.TrivialUserModel = function TrivialUserModel() {
  var users = {};
  users.bob = {memberid:"bob", fullname:"Bob Pigeon", color:"red", imageurl:"avatar-pigeon.png"};
  users.alice = {memberid:"alice", fullname:"Alice Bee", color:"green", imageurl:"avatar-flower.png"};
  users.you = {memberid:"you", fullname:"I, Robot", color:"blue", imageurl:"avatar-joe.png"};
  this.getUserDetailsAndUpdates = function(memberId, subscriber) {
    var userid = memberId.split("___")[0];
    subscriber(memberId, users[userid] || null)
  };
  this.unsubscribeUserDetailsUpdates = function(memberId, subscriber) {
  }
};
ops.NowjsUserModel = function NowjsUserModel() {
  var cachedUserData = {}, memberDataSubscribers = {}, net = runtime.getNetwork();
  function userIdFromMemberId(memberId) {
    return memberId.split("___")[0]
  }
  function cacheUserDatum(userId, userData) {
    var subscribers, i;
    cachedUserData[userId] = userData;
    subscribers = memberDataSubscribers[userId];
    if(subscribers) {
      for(i = 0;i < subscribers.length;i += 1) {
        subscribers[i].subscriber(subscribers[i].memberId, userData)
      }
    }
    runtime.log("data for user [" + userId + "] cached.")
  }
  this.getUserDetailsAndUpdates = function(memberId, subscriber) {
    var userId = userIdFromMemberId(memberId), userData = cachedUserData[userId], subscribers = memberDataSubscribers[userId] = memberDataSubscribers[userId] || [], i;
    runtime.assert(subscriber !== undefined, "missing callback");
    for(i = 0;i < subscribers.length;i += 1) {
      if(subscribers[i].subscriber === subscriber && subscribers[i].memberId === memberId) {
        break
      }
    }
    if(i < subscribers.length) {
      runtime.log("double subscription request for " + memberId + " in NowjsUserModel::getUserDetailsAndUpdates")
    }else {
      subscribers.push({memberId:memberId, subscriber:subscriber})
    }
    if(userData === undefined) {
      net.getUserData(userId, function(udata) {
        cacheUserDatum(userId, udata ? {userid:udata.uid, fullname:udata.fullname, imageurl:"/user/" + udata.uid + "/avatar.png", color:udata.color} : null)
      })
    }else {
      subscriber(memberId, userData)
    }
  };
  this.unsubscribeUserDetailsUpdates = function(memberId, subscriber) {
    var i, userId = userIdFromMemberId(memberId), subscribers = memberDataSubscribers[userId];
    runtime.assert(subscriber !== undefined, "missing subscriber parameter or null");
    runtime.assert(subscribers, "tried to unsubscribe when no one is subscribed ('" + memberId + "')");
    if(subscribers) {
      for(i = 0;i < subscribers.length;i += 1) {
        if(subscribers[i].subscriber === subscriber && subscribers[i].memberId === memberId) {
          break
        }
      }
      runtime.assert(i < subscribers.length, "tried to unsubscribe when not subscribed for memberId '" + memberId + "'");
      subscribers.splice(i, 1)
    }
  };
  runtime.assert(net.networkStatus === "ready", "network not ready")
};
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
ops.TrivialOperationRouter = function TrivialOperationRouter() {
  var self = this;
  this.setOperationFactory = function(f) {
    self.op_factory = f
  };
  this.setPlaybackFunction = function(playback_func) {
    self.playback_func = playback_func
  };
  this.push = function(op) {
    var timedOp, opspec = op.spec();
    opspec.timestamp = (new Date).getTime();
    timedOp = self.op_factory.create(opspec);
    self.playback_func(timedOp)
  }
};
ops.NowjsOperationRouter = function NowjsOperationRouter(sessionId, memberid) {
  var self = this, net = runtime.getNetwork(), last_server_seq = -1, reorder_queue = {}, sends_since_server_op = 0, router_sequence = 1E3;
  function nextNonce() {
    runtime.assert(memberid !== null, "Router sequence N/A without memberid");
    router_sequence += 1;
    return"C:" + memberid + ":" + router_sequence
  }
  this.setOperationFactory = function(f) {
    self.op_factory = f
  };
  this.setPlaybackFunction = function(playback_func) {
    self.playback_func = playback_func
  };
  function receiveOpFromNetwork(opspec) {
    var idx, seq, op = self.op_factory.create(opspec);
    runtime.log(" op in: " + runtime.toJson(opspec));
    if(op !== null) {
      seq = Number(opspec.server_seq);
      runtime.assert(!isNaN(seq), "server seq is not a number");
      if(seq === last_server_seq + 1) {
        self.playback_func(op);
        last_server_seq = seq;
        sends_since_server_op = 0;
        for(idx = last_server_seq + 1;reorder_queue.hasOwnProperty(idx);idx += 1) {
          self.playback_func(reorder_queue[idx]);
          delete reorder_queue[idx];
          runtime.log("op with server seq " + seq + " taken from hold (reordered)")
        }
      }else {
        runtime.assert(seq !== last_server_seq + 1, "received incorrect order from server");
        runtime.assert(!reorder_queue.hasOwnProperty(seq), "reorder_queue has incoming op");
        runtime.log("op with server seq " + seq + " put on hold");
        reorder_queue[seq] = op
      }
    }else {
      runtime.log("ignoring invalid incoming opspec: " + opspec)
    }
  }
  net.ping = function(pong) {
    if(memberid !== null) {
      pong(memberid)
    }
  };
  net.receiveOp = function(op_session_id, opspec) {
    if(op_session_id === sessionId) {
      receiveOpFromNetwork(opspec)
    }
  };
  this.push = function(op) {
    var opspec = op.spec();
    opspec.client_nonce = nextNonce();
    opspec.parent_op = last_server_seq + "+" + sends_since_server_op;
    sends_since_server_op += 1;
    runtime.log("op out: " + runtime.toJson(opspec));
    net.deliverOp(sessionId, opspec)
  };
  this.requestReplay = function(done_cb) {
    net.requestReplay(sessionId, function(opspec) {
      runtime.log("replaying: " + runtime.toJson(opspec));
      receiveOpFromNetwork(opspec)
    }, function(count) {
      runtime.log("replay done (" + count + " ops).");
      if(done_cb) {
        done_cb()
      }
    })
  };
  function init() {
    var sessionJoinSuccess;
    net.memberid = memberid;
    sessionJoinSuccess = net.joinSession(sessionId, function(sessionJoinSuccess) {
      runtime.assert(sessionJoinSuccess, "Trying to join a session which does not exists or where we are already in")
    })
  }
  init()
};
gui.EditInfoHandle = function EditInfoHandle(parentElement) {
  var edits = [], handle, document = parentElement.ownerDocument, htmlns = document.documentElement.namespaceURI, editinfons = "urn:webodf:names:editinfo";
  function renderEdits() {
    var i, infoDiv, colorSpan, authorSpan, timeSpan;
    handle.innerHTML = "";
    for(i = 0;i < edits.length;i += 1) {
      infoDiv = document.createElementNS(htmlns, "div");
      infoDiv.className = "editInfo";
      colorSpan = document.createElementNS(htmlns, "span");
      colorSpan.className = "editInfoColor";
      colorSpan.setAttributeNS(editinfons, "editinfo:memberid", edits[i].memberid);
      authorSpan = document.createElementNS(htmlns, "span");
      authorSpan.className = "editInfoAuthor";
      authorSpan.setAttributeNS(editinfons, "editinfo:memberid", edits[i].memberid);
      timeSpan = document.createElementNS(htmlns, "span");
      timeSpan.className = "editInfoTime";
      timeSpan.setAttributeNS(editinfons, "editinfo:memberid", edits[i].memberid);
      timeSpan.innerHTML = edits[i].time;
      infoDiv.appendChild(colorSpan);
      infoDiv.appendChild(authorSpan);
      infoDiv.appendChild(timeSpan);
      handle.appendChild(infoDiv)
    }
  }
  this.setEdits = function(editArray) {
    edits = editArray;
    renderEdits()
  };
  this.show = function() {
    handle.style.display = "block"
  };
  this.hide = function() {
    handle.style.display = "none"
  };
  function init() {
    handle = document.createElementNS(htmlns, "div");
    handle.setAttribute("class", "editInfoHandle");
    handle.style.display = "none";
    parentElement.appendChild(handle)
  }
  init()
};
runtime.loadClass("core.EditInfo");
runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker = function EditInfoMarker(editInfo) {
  var self = this, editInfoNode, handle, marker, editinfons = "urn:webodf:names:editinfo", decay1, decay2, decayTimeStep = 1E4;
  function applyDecay(opacity, delay) {
    return window.setTimeout(function() {
      marker.style.opacity = opacity
    }, delay)
  }
  function deleteDecay(timer) {
    window.clearTimeout(timer)
  }
  function setLastAuthor(memberid) {
    marker.setAttributeNS(editinfons, "editinfo:memberid", memberid)
  }
  this.addEdit = function(memberid, timestamp) {
    var age = Date.now() - timestamp;
    editInfo.addEdit(memberid, timestamp);
    handle.setEdits(editInfo.getSortedEdits());
    setLastAuthor(memberid);
    if(decay1) {
      deleteDecay(decay1)
    }
    if(decay2) {
      deleteDecay(decay2)
    }
    if(age < decayTimeStep) {
      applyDecay(1, 0);
      decay1 = applyDecay(0.5, decayTimeStep - age);
      decay2 = applyDecay(0.2, decayTimeStep * 2 - age)
    }else {
      if(age >= decayTimeStep && age < decayTimeStep * 2) {
        applyDecay(0.5, 0);
        decay2 = applyDecay(0.2, decayTimeStep * 2 - age)
      }else {
        applyDecay(0.2, 0)
      }
    }
  };
  this.getEdits = function() {
    return editInfo.getEdits()
  };
  this.clearEdits = function() {
    editInfo.clearEdits();
    handle.setEdits([]);
    if(marker.hasAttributeNS(editinfons, "editinfo:memberid")) {
      marker.removeAttributeNS(editinfons, "editinfo:memberid")
    }
  };
  this.getEditInfo = function() {
    return editInfo
  };
  this.showHandle = function() {
    handle.show()
  };
  this.hideHandle = function() {
    handle.hide()
  };
  function init() {
    var dom = editInfo.getOdtDocument().getDOM(), htmlns = dom.documentElement.namespaceURI;
    marker = dom.createElementNS(htmlns, "div");
    marker.setAttribute("class", "editInfoMarker");
    marker.onmouseover = function() {
      self.showHandle()
    };
    marker.onmouseout = function() {
      self.hideHandle()
    };
    editInfoNode = editInfo.getNode();
    editInfoNode.appendChild(marker);
    handle = new gui.EditInfoHandle(editInfoNode)
  }
  init()
};
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
runtime.loadClass("gui.Caret");
runtime.loadClass("ops.TrivialUserModel");
runtime.loadClass("core.EditInfo");
runtime.loadClass("gui.EditInfoMarker");
gui.SessionView = function() {
  function SessionView(session, caretFactory) {
    var carets = {}, avatarInfoStyles, headlineNodeName = "text|h", paragraphNodeName = "text|p", editHighlightingEnabled = true, editInfons = "urn:webodf:names:editinfo", editInfoMap = {};
    function createAvatarInfoNodeMatch(nodeName, className, memberId) {
      var userId = memberId.split("___")[0];
      return nodeName + "." + className + '[editinfo|memberid^="' + userId + '"]'
    }
    function getAvatarInfoStyle(nodeName, className, memberId) {
      var node = avatarInfoStyles.firstChild, nodeMatch = createAvatarInfoNodeMatch(nodeName, className, memberId);
      while(node) {
        if(node.nodeType === 3 && node.data.indexOf(nodeMatch) === 0) {
          return node
        }
        node = node.nextSibling
      }
      return null
    }
    function setAvatarInfoStyle(memberId, name, color) {
      function setStyle(nodeName, className, rule) {
        var styleRule = createAvatarInfoNodeMatch(nodeName, className, memberId) + rule, styleNode = getAvatarInfoStyle(nodeName, className, memberId);
        if(styleNode) {
          styleNode.data = styleRule
        }else {
          avatarInfoStyles.appendChild(document.createTextNode(styleRule))
        }
      }
      setStyle("div", "editInfoMarker", "{ background-color: " + color + "; }");
      setStyle("span", "editInfoColor", "{ background-color: " + color + "; }");
      setStyle("span", "editInfoAuthor", ':before { content: "' + name + '"; }')
    }
    function removeAvatarInfoStyle(nodeName, className, memberId) {
      var styleNode = getAvatarInfoStyle(nodeName, className, memberId);
      if(styleNode) {
        avatarInfoStyles.removeChild(styleNode)
      }
    }
    function highlightEdit(element, memberId, timestamp) {
      var editInfo, editInfoMarker, id = "", userModel = session.getUserModel(), editInfoNode = element.getElementsByTagNameNS(editInfons, "editinfo")[0];
      if(editInfoNode) {
        id = editInfoNode.getAttributeNS(editInfons, "id");
        editInfoMarker = editInfoMap[id]
      }else {
        id = Math.random().toString();
        editInfo = new core.EditInfo(element, session.getOdtDocument());
        editInfoMarker = new gui.EditInfoMarker(editInfo);
        editInfoNode = element.getElementsByTagNameNS(editInfons, "editinfo")[0];
        editInfoNode.setAttributeNS(editInfons, "id", id);
        editInfoMap[id] = editInfoMarker
      }
      editInfoMarker.addEdit(memberId, new Date(timestamp))
    }
    session.getOdtDocument().subscribe("paragraphEdited", function(info) {
      highlightEdit(info.element, info.memberId, info.timeStamp)
    });
    this.enableEditHighlighting = function() {
      if(editHighlightingEnabled) {
        return
      }
      editHighlightingEnabled = true
    };
    this.disableEditHighlighting = function() {
      if(!editHighlightingEnabled) {
        return
      }
      editHighlightingEnabled = false
    };
    this.getSession = function() {
      return session
    };
    this.getCaret = function(memberid) {
      return carets[memberid]
    };
    function renderMemberData(memberId, userData) {
      var caret = carets[memberId];
      if(userData === undefined) {
        runtime.log('UserModel sent undefined data for member "' + memberId + '".');
        return
      }
      if(userData === null) {
        userData = {memberid:memberId, fullname:"Unknown Identity", color:"black", imageurl:"avatar-joe.png"}
      }
      if(caret) {
        caret.setAvatarImageUrl(userData.imageurl);
        caret.setColor(userData.color)
      }
      if(editHighlightingEnabled) {
        setAvatarInfoStyle(memberId, userData.fullname, userData.color)
      }
    }
    function onCursorAdded(cursor) {
      var caret = caretFactory.createCaret(cursor), memberId = cursor.getMemberId(), userModel = session.getUserModel();
      carets[memberId] = caret;
      renderMemberData(memberId, null);
      userModel.getUserDetailsAndUpdates(memberId, renderMemberData);
      runtime.log("+++ View here +++ eagerly created an Caret for '" + memberId + "'! +++")
    }
    function onCursorRemoved(memberid) {
      delete carets[memberid]
    }
    function init() {
      var head = document.getElementsByTagName("head")[0];
      session.subscribe(ops.Session.signalCursorAdded, onCursorAdded);
      session.subscribe(ops.Session.signalCursorRemoved, onCursorRemoved);
      avatarInfoStyles = document.createElementNS(head.namespaceURI, "style");
      avatarInfoStyles.type = "text/css";
      avatarInfoStyles.media = "screen, print, handheld, projection";
      avatarInfoStyles.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));
      head.appendChild(avatarInfoStyles)
    }
    init()
  }
  return SessionView
}();
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
runtime.loadClass("gui.Caret");
gui.CaretFactory = function CaretFactory(sessionController) {
  this.createCaret = function(cursor) {
    var memberid = cursor.getMemberId(), odtDocument = sessionController.getSession().getOdtDocument(), canvasElement = odtDocument.getOdfCanvas().getElement(), caret = new gui.Caret(cursor);
    if(memberid === sessionController.getInputMemberId()) {
      runtime.log("Starting to track input on new cursor of " + memberid);
      odtDocument.subscribe("paragraphEdited", function(info) {
        if(info.memberId === memberid) {
          caret.ensureVisible()
        }
      });
      cursor.handleUpdate = caret.ensureVisible;
      canvasElement.setAttribute("tabindex", 0);
      canvasElement.onfocus = caret.setFocus;
      canvasElement.onblur = caret.removeFocus;
      canvasElement.focus();
      sessionController.startListening()
    }
    return caret
  }
};
runtime.loadClass("xmldom.XPath");
runtime.loadClass("odf.Style2CSS");
gui.PresenterUI = function() {
  var s2css = new odf.Style2CSS, xpath = new xmldom.XPath, nsResolver = s2css.namespaceResolver;
  return function PresenterUI(odf_element) {
    var self = this;
    self.setInitialSlideMode = function() {
      self.startSlideMode("single")
    };
    self.keyDownHandler = function(ev) {
      if(ev.target.isContentEditable) {
        return
      }
      if(ev.target.nodeName === "input") {
        return
      }
      switch(ev.keyCode) {
        case 84:
          self.toggleToolbar();
          break;
        case 37:
        ;
        case 8:
          self.prevSlide();
          break;
        case 39:
        ;
        case 32:
          self.nextSlide();
          break;
        case 36:
          self.firstSlide();
          break;
        case 35:
          self.lastSlide();
          break
      }
    };
    self.root = function() {
      return self.odf_canvas.odfContainer().rootElement
    };
    self.firstSlide = function() {
      self.slideChange(function(old, pc) {
        return 0
      })
    };
    self.lastSlide = function() {
      self.slideChange(function(old, pc) {
        return pc - 1
      })
    };
    self.nextSlide = function() {
      self.slideChange(function(old, pc) {
        return old + 1 < pc ? old + 1 : -1
      })
    };
    self.prevSlide = function() {
      self.slideChange(function(old, pc) {
        return old < 1 ? -1 : old - 1
      })
    };
    self.slideChange = function(indexChanger) {
      var pages = self.getPages(self.odf_canvas.odfContainer().rootElement), last = -1, i = 0, newidx, pagelist;
      pages.forEach(function(tuple) {
        var name = tuple[0], node = tuple[1];
        if(node.hasAttribute("slide_current")) {
          last = i;
          node.removeAttribute("slide_current")
        }
        i += 1
      });
      newidx = indexChanger(last, pages.length);
      if(newidx === -1) {
        newidx = last
      }
      pages[newidx][1].setAttribute("slide_current", "1");
      pagelist = document.getElementById("pagelist");
      pagelist.selectedIndex = newidx;
      if(self.slide_mode === "cont") {
        window.scrollBy(0, pages[newidx][1].getBoundingClientRect().top - 30)
      }
    };
    self.selectSlide = function(idx) {
      self.slideChange(function(old, pc) {
        if(idx >= pc) {
          return-1
        }
        if(idx < 0) {
          return-1
        }
        return idx
      })
    };
    self.scrollIntoContView = function(idx) {
      var pages = self.getPages(self.odf_canvas.odfContainer().rootElement);
      if(pages.length === 0) {
        return
      }
      window.scrollBy(0, pages[idx][1].getBoundingClientRect().top - 30)
    };
    self.getPages = function(root) {
      var pagenodes = root.getElementsByTagNameNS(nsResolver("draw"), "page"), pages = [], i;
      for(i = 0;i < pagenodes.length;i += 1) {
        pages.push([pagenodes[i].getAttribute("draw:name"), pagenodes[i]])
      }
      return pages
    };
    self.fillPageList = function(odfdom_root, html_select) {
      var pages = self.getPages(odfdom_root), i, html_option, res, page_denom;
      while(html_select.firstChild) {
        html_select.removeChild(html_select.firstChild)
      }
      for(i = 0;i < pages.length;i += 1) {
        html_option = document.createElement("option");
        res = xpath.getODFElementsWithXPath(pages[i][1], './draw:frame[@presentation:class="title"]//draw:text-box/text:p', xmldom.XPath);
        page_denom = res.length > 0 ? res[0].textContent : pages[i][0];
        html_option.textContent = i + 1 + ": " + page_denom;
        html_select.appendChild(html_option)
      }
    };
    self.startSlideMode = function(mode) {
      var pagelist = document.getElementById("pagelist"), css = self.odf_canvas.slidevisibilitycss().sheet;
      self.slide_mode = mode;
      while(css.cssRules.length > 0) {
        css.deleteRule(0)
      }
      self.selectSlide(0);
      if(self.slide_mode === "single") {
        css.insertRule("draw|page { position:fixed; left:0px;top:30px; z-index:1; }", 0);
        css.insertRule("draw|page[slide_current]  { z-index:2;}", 1);
        css.insertRule("draw|page  { -webkit-transform: scale(1);}", 2);
        self.fitToWindow();
        window.addEventListener("resize", self.fitToWindow, false)
      }else {
        if(self.slide_mode === "cont") {
          window.removeEventListener("resize", self.fitToWindow, false)
        }
      }
      self.fillPageList(self.odf_canvas.odfContainer().rootElement, pagelist)
    };
    self.toggleToolbar = function() {
      var css, found, i;
      css = self.odf_canvas.slidevisibilitycss().sheet;
      found = -1;
      for(i = 0;i < css.cssRules.length;i += 1) {
        if(css.cssRules[i].cssText.substring(0, 8) === ".toolbar") {
          found = i;
          break
        }
      }
      if(found > -1) {
        css.deleteRule(found)
      }else {
        css.insertRule(".toolbar { position:fixed; left:0px;top:-200px; z-index:0; }", 0)
      }
    };
    self.fitToWindow = function() {
      function ruleByFactor(f) {
        return"draw|page { \n" + "-moz-transform: scale(" + f + "); \n" + "-moz-transform-origin: 0% 0%; " + "-webkit-transform-origin: 0% 0%; -webkit-transform: scale(" + f + "); " + "-o-transform-origin: 0% 0%; -o-transform: scale(" + f + "); " + "-ms-transform-origin: 0% 0%; -ms-transform: scale(" + f + "); " + "}"
      }
      var pages = self.getPages(self.root()), factorVert = (window.innerHeight - 40) / pages[0][1].clientHeight, factorHoriz = (window.innerWidth - 10) / pages[0][1].clientWidth, factor = factorVert < factorHoriz ? factorVert : factorHoriz, css = self.odf_canvas.slidevisibilitycss().sheet;
      css.deleteRule(2);
      css.insertRule(ruleByFactor(factor), 2)
    };
    self.load = function(url) {
      self.odf_canvas.load(url)
    };
    self.odf_element = odf_element;
    self.odf_canvas = new odf.OdfCanvas(self.odf_element);
    self.odf_canvas.addListener("statereadychange", self.setInitialSlideMode);
    self.slide_mode = "undefined";
    document.addEventListener("keydown", self.keyDownHandler, false)
  }
}();
runtime.loadClass("core.PositionIterator");
runtime.loadClass("core.Cursor");
gui.XMLEdit = function XMLEdit(element, stylesheet) {
  var simplecss, cssprefix, documentElement, customNS = "customns", walker = null;
  if(!element.id) {
    element.id = "xml" + String(Math.random()).substring(2)
  }
  cssprefix = "#" + element.id + " ";
  function installHandlers() {
  }
  simplecss = cssprefix + "*," + cssprefix + ":visited, " + cssprefix + ":link {display:block; margin: 0px; margin-left: 10px; font-size: medium; color: black; background: white; font-variant: normal; font-weight: normal; font-style: normal; font-family: sans-serif; text-decoration: none; white-space: pre-wrap; height: auto; width: auto}\n" + cssprefix + ":before {color: blue; content: '<' attr(customns_name) attr(customns_atts) '>';}\n" + cssprefix + ":after {color: blue; content: '</' attr(customns_name) '>';}\n" + 
  cssprefix + "{overflow: auto;}\n";
  function listenEvent(eventTarget, eventType, eventHandler) {
    if(eventTarget.addEventListener) {
      eventTarget.addEventListener(eventType, eventHandler, false)
    }else {
      if(eventTarget.attachEvent) {
        eventType = "on" + eventType;
        eventTarget.attachEvent(eventType, eventHandler)
      }else {
        eventTarget["on" + eventType] = eventHandler
      }
    }
  }
  function cancelEvent(event) {
    if(event.preventDefault) {
      event.preventDefault()
    }else {
      event.returnValue = false
    }
  }
  function isCaretMoveCommand(charCode) {
    if(charCode >= 16 && charCode <= 20) {
      return true
    }
    if(charCode >= 33 && charCode <= 40) {
      return true
    }
    return false
  }
  function syncSelectionWithWalker() {
    var sel = element.ownerDocument.defaultView.getSelection(), r;
    if(!sel || sel.rangeCount <= 0 || !walker) {
      return
    }
    r = sel.getRangeAt(0);
    walker.setPoint(r.startContainer, r.startOffset)
  }
  function syncWalkerWithSelection() {
    var sel = element.ownerDocument.defaultView.getSelection(), n, r;
    sel.removeAllRanges();
    if(!walker || !walker.node()) {
      return
    }
    n = walker.node();
    r = n.ownerDocument.createRange();
    r.setStart(n, walker.position());
    r.collapse(true);
    sel.addRange(r)
  }
  function handleKeyDown(event) {
    var charCode = event.charCode || event.keyCode;
    walker = null;
    if(walker && charCode === 39) {
      syncSelectionWithWalker();
      walker.stepForward();
      syncWalkerWithSelection()
    }else {
      if(walker && charCode === 37) {
        syncSelectionWithWalker();
        walker.stepBackward();
        syncWalkerWithSelection()
      }else {
        if(isCaretMoveCommand(charCode)) {
          return
        }
      }
    }
    cancelEvent(event)
  }
  function handleKeyPress(event) {
  }
  function handleClick(event) {
    var sel = element.ownerDocument.defaultView.getSelection(), r = sel.getRangeAt(0), n = r.startContainer;
    cancelEvent(event)
  }
  function initElement(element) {
    listenEvent(element, "click", handleClick);
    listenEvent(element, "keydown", handleKeyDown);
    listenEvent(element, "keypress", handleKeyPress);
    listenEvent(element, "drop", cancelEvent);
    listenEvent(element, "dragend", cancelEvent);
    listenEvent(element, "beforepaste", cancelEvent);
    listenEvent(element, "paste", cancelEvent)
  }
  function cleanWhitespace(node) {
    var n = node.firstChild, p, re = /^\s*$/;
    while(n && n !== node) {
      p = n;
      n = n.nextSibling || n.parentNode;
      if(p.nodeType === 3 && re.test(p.nodeValue)) {
        p.parentNode.removeChild(p)
      }
    }
  }
  function setCssHelperAttributes(node) {
    var atts, attsv, a, i;
    atts = node.attributes;
    attsv = "";
    for(i = atts.length - 1;i >= 0;i -= 1) {
      a = atts.item(i);
      attsv = attsv + " " + a.nodeName + '="' + a.nodeValue + '"'
    }
    node.setAttribute("customns_name", node.nodeName);
    node.setAttribute("customns_atts", attsv)
  }
  function addExplicitAttributes(node) {
    var n = node.firstChild;
    while(n && n !== node) {
      if(n.nodeType === 1) {
        addExplicitAttributes(n)
      }
      n = n.nextSibling || n.parentNode
    }
    setCssHelperAttributes(node);
    cleanWhitespace(node)
  }
  function getNamespacePrefixes(node, prefixes) {
    var n = node.firstChild, atts, att, i;
    while(n && n !== node) {
      if(n.nodeType === 1) {
        getNamespacePrefixes(n, prefixes);
        atts = n.attributes;
        for(i = atts.length - 1;i >= 0;i -= 1) {
          att = atts.item(i);
          if(att.namespaceURI === "http://www.w3.org/2000/xmlns/") {
            if(!prefixes[att.nodeValue]) {
              prefixes[att.nodeValue] = att.localName
            }
          }
        }
      }
      n = n.nextSibling || n.parentNode
    }
  }
  function generateUniquePrefixes(prefixes) {
    var taken = {}, ns, p, n = 0;
    for(ns in prefixes) {
      if(prefixes.hasOwnProperty(ns) && ns) {
        p = prefixes[ns];
        if(!p || taken.hasOwnProperty(p) || p === "xmlns") {
          do {
            p = "ns" + n;
            n += 1
          }while(taken.hasOwnProperty(p));
          prefixes[ns] = p
        }
        taken[p] = true
      }
    }
  }
  function createCssFromXmlInstance(node) {
    var prefixes = {}, css = "@namespace customns url(customns);\n", name, pre, ns, names, csssel;
    getNamespacePrefixes(node, prefixes);
    generateUniquePrefixes(prefixes);
    return css
  }
  function updateCSS() {
    var css = element.ownerDocument.createElement("style"), text = createCssFromXmlInstance(element);
    css.type = "text/css";
    text = text + simplecss;
    css.appendChild(element.ownerDocument.createTextNode(text));
    stylesheet = stylesheet.parentNode.replaceChild(css, stylesheet)
  }
  function getXML() {
    return documentElement
  }
  function setXML(xml) {
    var node = xml.documentElement || xml;
    node = element.ownerDocument.importNode(node, true);
    documentElement = node;
    addExplicitAttributes(node);
    while(element.lastChild) {
      element.removeChild(element.lastChild)
    }
    element.appendChild(node);
    updateCSS();
    walker = new core.PositionIterator(node)
  }
  initElement(element);
  this.updateCSS = updateCSS;
  this.setXML = setXML;
  this.getXML = getXML
};
ops.SessionPointFilter = function SessionPointFilter() {
  this.acceptNode = function(node) {
    return 1
  }
};
runtime.loadClass("ops.TrivialOperationRouter");
runtime.loadClass("gui.SelectionManager");
ops.OdtDocument = function OdtDocument(odfCanvas) {
  var self = this, textns = "urn:oasis:names:tc:opendocument:xmlns:text:1.0", fons = "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0", stylens = "urn:oasis:names:tc:opendocument:xmlns:style:1.0", svgns = "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0", rootNode, selectionManager, filter, cursors = {}, eventListener = {};
  eventListener.paragraphEdited = [];
  function TextPositionFilter() {
    var accept = core.PositionFilter.FilterResult.FILTER_ACCEPT, reject = core.PositionFilter.FilterResult.FILTER_REJECT;
    this.acceptPosition = function(iterator) {
      var n = iterator.container(), p, o, d;
      if(n.nodeType !== 3) {
        if(n.localName !== "p" && n.localName !== "h" && n.localName !== "span") {
          return reject
        }
        return accept
      }
      if(n.length === 0) {
        return reject
      }
      p = n.parentNode;
      o = p && p.localName;
      if(o !== "p" && o !== "span" && o !== "h") {
        return reject
      }
      o = iterator.textOffset();
      if(o > 0 && iterator.substr(o - 1, 2) === "  ") {
        return reject
      }
      return accept
    }
  }
  function findTextRoot(odfcontainer) {
    var root = odfcontainer.rootElement.firstChild;
    while(root && root.localName !== "body") {
      root = root.nextSibling
    }
    root = root && root.firstChild;
    while(root && root.localName !== "text") {
      root = root.nextSibling
    }
    return root
  }
  function getPositionInTextNode(position) {
    var iterator = gui.SelectionMover.createPositionIterator(rootNode), lastTextNode = null, node, nodeOffset = 0;
    position += 1;
    if(filter.acceptPosition(iterator) === 1) {
      node = iterator.container();
      if(node.nodeType === 3) {
        lastTextNode = node;
        nodeOffset = 0
      }else {
        if(position === 0) {
          lastTextNode = rootNode.ownerDocument.createTextNode("");
          node.insertBefore(lastTextNode, null);
          nodeOffset = 0
        }
      }
    }
    while(position > 0 || lastTextNode === null) {
      if(!iterator.nextPosition()) {
        return null
      }
      if(filter.acceptPosition(iterator) === 1) {
        position -= 1;
        node = iterator.container();
        if(node.nodeType === 3) {
          if(node !== lastTextNode) {
            lastTextNode = node;
            nodeOffset = 0
          }else {
            nodeOffset += 1
          }
        }else {
          if(lastTextNode !== null) {
            if(position === 0) {
              nodeOffset = lastTextNode.length;
              break
            }
            lastTextNode = null
          }else {
            if(position === 0) {
              lastTextNode = node.ownerDocument.createTextNode("");
              node.appendChild(lastTextNode);
              nodeOffset = 0;
              break
            }
          }
        }
      }
    }
    if(lastTextNode === null) {
      return null
    }
    while(nodeOffset === 0 && lastTextNode.previousSibling && lastTextNode.previousSibling.localName === "cursor") {
      node = lastTextNode.previousSibling.previousSibling;
      while(node && node.nodeType !== 3) {
        node = node.previousSibling
      }
      if(node === null) {
        node = rootNode.ownerDocument.createTextNode("");
        lastTextNode.parentNode.insertBefore(node, lastTextNode.parentNode.firstChild)
      }
      lastTextNode = node;
      nodeOffset = lastTextNode.length
    }
    return{textNode:lastTextNode, offset:nodeOffset}
  }
  function getParagraphElement(node) {
    while(node && !((node.localName === "p" || node.localName === "h") && node.namespaceURI === textns)) {
      node = node.parentNode
    }
    return node
  }
  function getParagraphStyleElement(styleName) {
    var node;
    node = odfCanvas.getFormatting().getStyleElement(odfCanvas.odfContainer().rootElement.styles, styleName, "paragraph");
    return node
  }
  function getParagraphStyleAttributes(styleName) {
    var node = getParagraphStyleElement(styleName);
    if(node) {
      return odfCanvas.getFormatting().getInheritedStyleAttributes(odfCanvas.odfContainer().rootElement.styles, node)
    }
    return null
  }
  this.getParagraphStyleElement = getParagraphStyleElement;
  this.getParagraphElement = getParagraphElement;
  this.getParagraphStyleAttributes = getParagraphStyleAttributes;
  this.getPositionInTextNode = getPositionInTextNode;
  this.getDistanceFromCursor = function(memberid, node, offset) {
    var counter, cursor = cursors[memberid], steps = 0;
    runtime.assert(node !== null, "OdtDocument.getDistanceFromCursor called with node===null");
    if(cursor) {
      counter = cursor.getStepCounter().countStepsToPosition;
      steps = counter(node, offset, filter)
    }
    return steps
  };
  this.getCursorPosition = function(memberid) {
    return-self.getDistanceFromCursor(memberid, rootNode, 0)
  };
  this.getPositionFilter = function() {
    return filter
  };
  this.getOdfCanvas = function() {
    return odfCanvas
  };
  this.getRootNode = function() {
    return rootNode
  };
  this.getDOM = function() {
    return rootNode.ownerDocument
  };
  this.getSelectionManager = function() {
    return selectionManager
  };
  function triggerLayoutInWebkit(textNode) {
    var parent = textNode.parentNode, next = textNode.nextSibling;
    parent.removeChild(textNode);
    parent.insertBefore(textNode, next)
  }
  this.insertText = function(memberid, timestamp, position, text) {
    var domPosition, textNode;
    domPosition = getPositionInTextNode(position);
    if(domPosition) {
      textNode = domPosition.textNode;
      textNode.insertData(domPosition.offset, text);
      triggerLayoutInWebkit(textNode);
      self.emit("paragraphEdited", {element:getParagraphElement(domPosition.textNode), memberId:memberid, timeStamp:timestamp});
      return true
    }
    return false
  };
  this.removeText = function(memberid, timestamp, position, length) {
    var domPosition;
    if(length < 0) {
      length = -length;
      position -= length;
      domPosition = getPositionInTextNode(position)
    }else {
      domPosition = getPositionInTextNode(position + 1);
      if(domPosition.offset !== 1) {
        runtime.log("unexpected!");
        return false
      }
      domPosition.offset -= 1
    }
    if(domPosition) {
      domPosition.textNode.deleteData(domPosition.offset, length);
      self.emit("paragraphEdited", {element:getParagraphElement(domPosition.textNode), memberId:memberid, timeStamp:timestamp});
      return true
    }
    return false
  };
  this.setParagraphStyle = function(memberid, timestamp, position, styleNameBefore, styleNameAfter) {
    var domPosition, paragraphNode;
    domPosition = getPositionInTextNode(position);
    runtime.log("Setting paragraph style:" + domPosition + " -- " + position + " " + styleNameBefore + "->" + styleNameAfter);
    if(domPosition) {
      paragraphNode = getParagraphElement(domPosition.textNode);
      if(paragraphNode) {
        paragraphNode.setAttributeNS(textns, "text:style-name", styleNameAfter);
        self.emit("paragraphEdited", {element:paragraphNode, timeStamp:timestamp, memberId:memberid});
        return true
      }
    }
    return false
  };
  function setRealAttributeNS(node, ns, prefixedAttribute, value, unit) {
    if(value !== undefined) {
      if(unit !== undefined) {
        node.setAttributeNS(ns, prefixedAttribute, value + unit)
      }else {
        node.setAttributeNS(ns, prefixedAttribute, value)
      }
    }
  }
  function isFontDeclared(fontName) {
    var fontMap = odfCanvas.getFormatting().getFontMap();
    if(fontMap.hasOwnProperty(fontName)) {
      return true
    }
    return false
  }
  function declareFont(name, family) {
    var declaration;
    if(!name || !family) {
      return
    }
    declaration = rootNode.ownerDocument.createElementNS(stylens, "style:font-face");
    declaration.setAttributeNS(stylens, "style:name", name);
    declaration.setAttributeNS(svgns, "svg:font-family", family);
    odfCanvas.odfContainer().rootElement.fontFaceDecls.appendChild(declaration)
  }
  this.updateParagraphStyle = function(styleName, info) {
    var styleNode, paragraphPropertiesNode, textPropertiesNode;
    styleNode = getParagraphStyleElement(styleName);
    if(styleNode) {
      paragraphPropertiesNode = styleNode.getElementsByTagNameNS(stylens, "paragraph-properties")[0];
      textPropertiesNode = styleNode.getElementsByTagNameNS(stylens, "text-properties")[0];
      if(paragraphPropertiesNode === undefined && info.paragraphProperties) {
        paragraphPropertiesNode = rootNode.ownerDocument.createElementNS(stylens, "style:paragraph-properties");
        styleNode.appendChild(paragraphPropertiesNode)
      }
      if(textPropertiesNode === undefined && info.textProperties) {
        textPropertiesNode = rootNode.ownerDocument.createElementNS(stylens, "style:text-properties");
        styleNode.appendChild(textPropertiesNode)
      }
      if(info.paragraphProperties) {
        setRealAttributeNS(paragraphPropertiesNode, fons, "fo:margin-top", info.paragraphProperties.topMargin, "mm");
        setRealAttributeNS(paragraphPropertiesNode, fons, "fo:margin-bottom", info.paragraphProperties.bottomMargin, "mm");
        setRealAttributeNS(paragraphPropertiesNode, fons, "fo:margin-left", info.paragraphProperties.leftMargin, "mm");
        setRealAttributeNS(paragraphPropertiesNode, fons, "fo:margin-right", info.paragraphProperties.rightMargin, "mm");
        setRealAttributeNS(paragraphPropertiesNode, fons, "fo:text-align", info.paragraphProperties.textAlign)
      }
      if(info.textProperties) {
        setRealAttributeNS(textPropertiesNode, fons, "fo:font-size", info.textProperties.fontSize, "pt");
        if(!isFontDeclared(info.textProperties.fontName)) {
          declareFont(info.textProperties.fontName, info.textProperties.fontName)
        }
        setRealAttributeNS(textPropertiesNode, stylens, "style:font-name", info.textProperties.fontName);
        setRealAttributeNS(textPropertiesNode, fons, "fo:color", info.textProperties.color);
        setRealAttributeNS(textPropertiesNode, fons, "fo:background-color", info.textProperties.backgroundColor);
        setRealAttributeNS(textPropertiesNode, fons, "fo:font-weight", info.textProperties.fontWeight);
        setRealAttributeNS(textPropertiesNode, fons, "fo:font-style", info.textProperties.fontStyle);
        setRealAttributeNS(textPropertiesNode, stylens, "style:text-underline-style", info.textProperties.underline);
        setRealAttributeNS(textPropertiesNode, stylens, "style:text-line-through-style", info.textProperties.strikethrough)
      }
      odfCanvas.refreshCSS();
      return true
    }
    return false
  };
  this.deleteStyle = function(styleName) {
    var styleNode = getParagraphStyleElement(styleName);
    styleNode.parentNode.removeChild(styleNode);
    odfCanvas.refreshCSS()
  };
  this.getCursor = function(memberid) {
    return cursors[memberid]
  };
  this.getCursors = function() {
    var list = [], i;
    for(i in cursors) {
      if(cursors.hasOwnProperty(i)) {
        list.push(cursors[i])
      }
    }
    return list
  };
  this.addCursor = function(cursor) {
    var distanceToFirstTextNode = cursor.getStepCounter().countForwardSteps(1, filter);
    cursor.move(distanceToFirstTextNode);
    cursors[cursor.getMemberId()] = cursor
  };
  this.removeCursor = function(memberid) {
    var cursor = cursors[memberid], cursorNode;
    if(cursor) {
      cursor.removeFromOdtDocument();
      delete cursors[memberid]
    }
  };
  this.getMetaData = function(metadataId) {
    var node = odfCanvas.odfContainer().rootElement.firstChild;
    while(node && node.localName !== "meta") {
      node = node.nextSibling
    }
    node = node && node.firstChild;
    while(node && node.localName !== metadataId) {
      node = node.nextSibling
    }
    node = node && node.firstChild;
    while(node && node.nodeType !== 3) {
      node = node.nextSibling
    }
    return node ? node.data : null
  };
  this.getFormatting = function() {
    return odfCanvas.getFormatting()
  };
  this.emit = function(eventid, args) {
    var i, subscribers;
    runtime.assert(eventListener.hasOwnProperty(eventid), 'unknown event fired "' + eventid + '"');
    subscribers = eventListener[eventid];
    for(i = 0;i < subscribers.length;i += 1) {
      subscribers[i](args)
    }
  };
  this.subscribe = function(eventid, cb) {
    runtime.assert(eventListener.hasOwnProperty(eventid), 'tried to subscribe to unknown event "' + eventid + '"');
    eventListener[eventid].push(cb);
    runtime.log('event "' + eventid + '" subscribed.')
  };
  function init() {
    filter = new TextPositionFilter;
    rootNode = findTextRoot(odfCanvas.odfContainer());
    selectionManager = new gui.SelectionManager(rootNode)
  }
  init()
};
runtime.loadClass("ops.TrivialUserModel");
runtime.loadClass("ops.TrivialOperationRouter");
runtime.loadClass("ops.OperationFactory");
runtime.loadClass("gui.SelectionManager");
runtime.loadClass("ops.OdtDocument");
ops.Session = function Session(odfCanvas) {
  var self = this, odtDocument = new ops.OdtDocument(odfCanvas), style2CSS = new odf.Style2CSS, namespaces = style2CSS.namespaces, m_user_model = null, m_operation_router = null, m_event_listener = {};
  m_event_listener[ops.Session.signalCursorAdded] = [];
  m_event_listener[ops.Session.signalCursorRemoved] = [];
  m_event_listener[ops.Session.signalCursorMoved] = [];
  m_event_listener[ops.Session.signalParagraphChanged] = [];
  m_event_listener[ops.Session.signalStyleCreated] = [];
  m_event_listener[ops.Session.signalStyleDeleted] = [];
  m_event_listener[ops.Session.signalParagraphStyleModified] = [];
  function setUserModel(userModel) {
    m_user_model = userModel
  }
  this.setUserModel = setUserModel;
  function setOperationRouter(opRouter) {
    m_operation_router = opRouter;
    opRouter.setPlaybackFunction(self.playOperation);
    opRouter.setOperationFactory(new ops.OperationFactory(self))
  }
  this.setOperationRouter = setOperationRouter;
  function getUserModel() {
    return m_user_model
  }
  this.getUserModel = getUserModel;
  this.getOdtDocument = function() {
    return odtDocument
  };
  this.emit = function(eventid, args) {
    var i, subscribers;
    runtime.assert(m_event_listener.hasOwnProperty(eventid), 'unknown event fired "' + eventid + '"');
    subscribers = m_event_listener[eventid];
    for(i = 0;i < subscribers.length;i += 1) {
      subscribers[i](args)
    }
  };
  this.subscribe = function(eventid, cb) {
    runtime.assert(m_event_listener.hasOwnProperty(eventid), 'tried to subscribe to unknown event "' + eventid + '"');
    m_event_listener[eventid].push(cb);
    runtime.log('event "' + eventid + '" subscribed.')
  };
  this.enqueue = function(operation) {
    m_operation_router.push(operation)
  };
  this.playOperation = function(op) {
    op.execute(odtDocument.getRootNode())
  };
  function init() {
    setUserModel(new ops.TrivialUserModel);
    setOperationRouter(new ops.TrivialOperationRouter)
  }
  init()
};
ops.Session.signalCursorAdded = "cursor/added";
ops.Session.signalCursorRemoved = "cursor/removed";
ops.Session.signalCursorMoved = "cursor/moved";
ops.Session.signalParagraphChanged = "paragraph/changed";
ops.Session.signalStyleCreated = "style/created";
ops.Session.signalStyleDeleted = "style/deleted";
ops.Session.signalParagraphStyleModified = "paragraphstyle/modified";
(function() {
  return ops.Session
})();
var webodf_css = "@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace runtimens url(urn:webodf); /* namespace for runtime only */\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n}\n*[runtimens|containsparagraphanchor] {\n  position: relative;\n}\ntext|s:before { /* this needs to be the number of spaces given by text:c */\n  content: ' ';\n}\ntext|tab:before {\n  display: inline;\n  content: '        ';\n}\ntext|line-break {\n  content: \" \";\n  display: block;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  width: 216mm; /* default to A4 width */\n  min-height: 279mm;\n  padding-left: 32mm;\n  padding-right: 32mm;\n  padding-top: 25mm;\n  padding-bottom: 13mm;\n  margin: 2px;\n  text-align: left;\n  overflow: hidden;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  height: 21cm;\n  width: 28cm;\n  margin: 3px;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n}\ncursor|cursor > span {\n    display: inline;\n    position: absolute;\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n";

