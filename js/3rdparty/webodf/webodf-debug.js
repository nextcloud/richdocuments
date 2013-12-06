var webodf_version = "0.4.2-1579-gfc3a4e6";
function Runtime() {
}
Runtime.prototype.getVariable = function(name) {
};
Runtime.prototype.toJson = function(anything) {
};
Runtime.prototype.fromJson = function(jsonstr) {
};
Runtime.prototype.byteArrayFromString = function(string, encoding) {
};
Runtime.prototype.byteArrayToString = function(bytearray, encoding) {
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
Runtime.prototype.clearTimeout = function(timeoutID) {
};
Runtime.prototype.libraryPaths = function() {
};
Runtime.prototype.currentDirectory = function() {
};
Runtime.prototype.setCurrentDirectory = function(dir) {
};
Runtime.prototype.type = function() {
};
Runtime.prototype.getDOMImplementation = function() {
};
Runtime.prototype.parseXML = function(xml) {
};
Runtime.prototype.exit = function(exitCode) {
};
Runtime.prototype.getWindow = function() {
};
Runtime.prototype.assert = function(condition, message, callback) {
};
var IS_COMPILED_CODE = true;
Runtime.byteArrayToString = function(bytearray, encoding) {
  function byteArrayToString(bytearray) {
    var s = "", i, l = bytearray.length;
    for(i = 0;i < l;i += 1) {
      s += String.fromCharCode(bytearray[i] & 255)
    }
    return s
  }
  function utf8ByteArrayToString(bytearray) {
    var s = "", i, l = bytearray.length, chars = [], c0, c1, c2, c3, codepoint;
    for(i = 0;i < l;i += 1) {
      c0 = (bytearray[i]);
      if(c0 < 128) {
        chars.push(c0)
      }else {
        i += 1;
        c1 = (bytearray[i]);
        if(c0 >= 194 && c0 < 224) {
          chars.push((c0 & 31) << 6 | c1 & 63)
        }else {
          i += 1;
          c2 = (bytearray[i]);
          if(c0 >= 224 && c0 < 240) {
            chars.push((c0 & 15) << 12 | (c1 & 63) << 6 | c2 & 63)
          }else {
            i += 1;
            c3 = (bytearray[i]);
            if(c0 >= 240 && c0 < 245) {
              codepoint = (c0 & 7) << 18 | (c1 & 63) << 12 | (c2 & 63) << 6 | c3 & 63;
              codepoint -= 65536;
              chars.push((codepoint >> 10) + 55296, (codepoint & 1023) + 56320)
            }
          }
        }
      }
      if(chars.length === 1E3) {
        s += String.fromCharCode.apply(null, chars);
        chars.length = 0
      }
    }
    return s + String.fromCharCode.apply(null, chars)
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
  var self = this, cache = {};
  function utf8ByteArrayFromString(string) {
    var l = string.length, bytearray, i, n, j = 0;
    for(i = 0;i < l;i += 1) {
      n = string.charCodeAt(i);
      j += 1 + (n > 128) + (n > 2048)
    }
    bytearray = new Uint8Array(new ArrayBuffer(j));
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
    var l = string.length, a = new Uint8Array(new ArrayBuffer(l)), i;
    for(i = 0;i < l;i += 1) {
      a[i] = string.charCodeAt(i) & 255
    }
    return a
  }
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
      if(msg.length > 0 && msg[0] === "<") {
        node.innerHTML = msg
      }else {
        node.appendChild(doc.createTextNode(msg))
      }
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
  function arrayToUint8Array(buffer) {
    var l = buffer.length, i, a = new Uint8Array(new ArrayBuffer(l));
    for(i = 0;i < l;i += 1) {
      a[i] = buffer[i]
    }
    return a
  }
  function handleXHRResult(path, encoding, xhr) {
    var data, r, d, a;
    if(xhr.status === 0 && !xhr.responseText) {
      r = {err:"File " + path + " is empty.", data:null}
    }else {
      if(xhr.status === 200 || xhr.status === 0) {
        if(xhr.response && typeof xhr.response !== "string") {
          if(encoding === "binary") {
            d = (xhr.response);
            data = new Uint8Array(d)
          }else {
            data = String(xhr.response)
          }
        }else {
          if(encoding === "binary") {
            if(xhr.responseBody !== null && String(typeof VBArray) !== "undefined") {
              a = (new VBArray(xhr.responseBody)).toArray();
              data = arrayToUint8Array(a)
            }else {
              data = self.byteArrayFromString(xhr.responseText, "binary")
            }
          }else {
            data = xhr.responseText
          }
        }
        cache[path] = data;
        r = {err:null, data:data}
      }else {
        r = {err:xhr.responseText || xhr.statusText, data:null}
      }
    }
    return r
  }
  function createXHR(path, encoding, async) {
    var xhr = new XMLHttpRequest;
    xhr.open("GET", path, async);
    if(xhr.overrideMimeType) {
      if(encoding !== "binary") {
        xhr.overrideMimeType("text/plain; charset=" + encoding)
      }else {
        xhr.overrideMimeType("text/plain; charset=x-user-defined")
      }
    }
    return xhr
  }
  function readFile(path, encoding, callback) {
    if(cache.hasOwnProperty(path)) {
      callback(null, cache[path]);
      return
    }
    var xhr = createXHR(path, encoding, true);
    function handleResult() {
      var r;
      if(xhr.readyState === 4) {
        r = handleXHRResult(path, encoding, xhr);
        callback(r.err, r.data)
      }
    }
    xhr.onreadystatechange = handleResult;
    try {
      xhr.send(null)
    }catch(e) {
      callback(e.message, null)
    }
  }
  function read(path, offset, length, callback) {
    readFile(path, "binary", function(err, result) {
      var r = null;
      if(result) {
        if(typeof result === "string") {
          throw"This should not happen.";
        }
        r = (result.subarray(offset, offset + length))
      }
      callback(err, r)
    })
  }
  function readFileSync(path, encoding) {
    var xhr = createXHR(path, encoding, false), r;
    try {
      xhr.send(null);
      r = handleXHRResult(path, encoding, xhr);
      if(r.err) {
        throw r.err;
      }
      if(r.data === null) {
        throw"No data read from " + path + ".";
      }
    }catch(e) {
      throw e;
    }
    return r.data
  }
  function writeFile(path, data, callback) {
    cache[path] = data;
    var xhr = new XMLHttpRequest, d;
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
      d = data.buffer
    }else {
      d = self.byteArrayToString(data, "binary")
    }
    try {
      if(xhr.sendAsBinary) {
        xhr.sendAsBinary(d)
      }else {
        xhr.send(d)
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
          callback("File " + path + " is empty.", null)
        }else {
          if(xhr.status === 200 || xhr.status === 0) {
            callback(null, xhr.responseXML)
          }else {
            callback(xhr.responseText, null)
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
      callback(e.message, null)
    }
  }
  function isFile(path, callback) {
    self.getFileSize(path, function(size) {
      callback(size !== -1)
    })
  }
  function getFileSize(path, callback) {
    if(cache.hasOwnProperty(path) && typeof cache[path] !== "string") {
      callback(cache[path].length);
      return
    }
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
        readFile(path, "binary", function(err, data) {
          if(!err) {
            callback(data.length)
          }else {
            callback(-1)
          }
        })
      }
    };
    xhr.send(null)
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
    return setTimeout(function() {
      f()
    }, msec)
  };
  this.clearTimeout = function(timeoutID) {
    clearTimeout(timeoutID)
  };
  this.libraryPaths = function() {
    return["lib"]
  };
  this.setCurrentDirectory = function() {
  };
  this.currentDirectory = function() {
    return""
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
  }
}
function NodeJSRuntime() {
  var self = this, fs = require("fs"), pathmod = require("path"), currentDirectory = "", parser, domImplementation;
  function bufferToUint8Array(buffer) {
    var l = buffer.length, i, a = new Uint8Array(new ArrayBuffer(l));
    for(i = 0;i < l;i += 1) {
      a[i] = buffer[i]
    }
    return a
  }
  this.byteArrayFromString = function(string, encoding) {
    var buf = new Buffer(string, encoding), i, l = buf.length, a = new Uint8Array(new ArrayBuffer(l));
    for(i = 0;i < l;i += 1) {
      a[i] = buf[i]
    }
    return a
  };
  this.byteArrayToString = Runtime.byteArrayToString;
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
    function convert(err, data) {
      if(err) {
        return callback(err, null)
      }
      if(!data) {
        return callback("No data for " + path + ".", null)
      }
      var d;
      if(typeof data === "string") {
        d = (data);
        return callback(err, d)
      }
      d = (data);
      callback(err, bufferToUint8Array(d))
    }
    path = pathmod.resolve(currentDirectory, path);
    if(encoding !== "binary") {
      fs.readFile(path, encoding, convert)
    }else {
      fs.readFile(path, null, convert)
    }
  }
  this.readFile = readFile;
  function loadXML(path, callback) {
    readFile(path, "utf-8", function(err, data) {
      if(err) {
        return callback(err, null)
      }
      if(!data) {
        return callback("No data for " + path + ".", null)
      }
      var d = (data);
      callback(null, self.parseXML(d))
    })
  }
  this.loadXML = loadXML;
  this.writeFile = function(path, data, callback) {
    var buf = new Buffer(data);
    path = pathmod.resolve(currentDirectory, path);
    fs.writeFile(path, buf, "binary", function(err) {
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
        callback(err, null);
        return
      }
      var buffer = new Buffer(length);
      fs.read(fd, buffer, 0, length, offset, function(err) {
        fs.close(fd);
        callback(err, bufferToUint8Array(buffer))
      })
    })
  };
  this.readFileSync = function(path, encoding) {
    var s, enc = encoding === "binary" ? null : encoding, r = fs.readFileSync(path, enc);
    if(r === null) {
      throw"File " + path + " could not be read.";
    }
    if(encoding === "binary") {
      s = (r);
      s = bufferToUint8Array(s)
    }else {
      s = (r)
    }
    return s
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
    return setTimeout(function() {
      f()
    }, msec)
  };
  this.clearTimeout = function(timeoutID) {
    clearTimeout(timeoutID)
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
  function init() {
    var DOMParser = require("xmldom").DOMParser;
    parser = new DOMParser;
    domImplementation = self.parseXML("<a/>").implementation
  }
  init()
}
function RhinoRuntime() {
  var self = this, Packages = {}, dom = Packages.javax.xml.parsers.DocumentBuilderFactory.newInstance(), builder, entityresolver, currentDirectory = "";
  dom.setValidating(false);
  dom.setNamespaceAware(true);
  dom.setExpandEntityReferences(false);
  dom.setSchema(null);
  entityresolver = Packages.org.xml.sax.EntityResolver({resolveEntity:function(publicId, systemId) {
    var file;
    function open(path) {
      var reader = new Packages.java.io.FileReader(path), source = new Packages.org.xml.sax.InputSource(reader);
      return source
    }
    file = systemId;
    return open(file)
  }});
  builder = dom.newDocumentBuilder();
  builder.setEntityResolver(entityresolver);
  this.byteArrayFromString = function(string, encoding) {
    var i, l = string.length, a = new Uint8Array(new ArrayBuffer(l));
    for(i = 0;i < l;i += 1) {
      a[i] = string.charCodeAt(i) & 255
    }
    return a
  };
  this.byteArrayToString = Runtime.byteArrayToString;
  this.getVariable = Runtime.getVariable;
  this.fromJson = Runtime.fromJson;
  this.toJson = Runtime.toJson;
  function loadXML(path, callback) {
    var file = new Packages.java.io.File(path), xmlDocument = null;
    try {
      xmlDocument = builder.parse(file)
    }catch(err) {
      print(err);
      return callback(err, null)
    }
    callback(null, xmlDocument)
  }
  function runtimeReadFile(path, encoding, callback) {
    if(currentDirectory) {
      path = currentDirectory + "/" + path
    }
    var file = new Packages.java.io.File(path), data, rhinoencoding = encoding === "binary" ? "latin1" : encoding;
    if(!file.isFile()) {
      callback(path + " is not a file.", null)
    }else {
      data = readFile(path, rhinoencoding);
      if(data && encoding === "binary") {
        data = self.byteArrayFromString(data, "binary")
      }
      callback(null, data)
    }
  }
  function runtimeReadFileSync(path, encoding) {
    var file = new Packages.java.io.File(path);
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
    var file = new Packages.java.io.File(path), otherPath = path + Math.random(), other = new Packages.java.io.File(otherPath);
    if(file.rename(other)) {
      other.deleteOnExit();
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
      callback("Cannot read " + path, null)
    }
  };
  this.readFileSync = function(path, encoding) {
    if(!encoding) {
      return""
    }
    var s = readFile(path, encoding);
    if(s === null) {
      throw"File could not be read.";
    }
    return s
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
  this.setTimeout = function(f) {
    f();
    return 0
  };
  this.clearTimeout = function() {
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
    var reader = new Packages.java.io.StringReader(xml), source = new Packages.org.xml.sax.InputSource(reader);
    return builder.parse(source)
  };
  this.exit = quit;
  this.getWindow = function() {
    return null
  }
}
Runtime.create = function create() {
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
};
var runtime = Runtime.create();
var core = {};
var gui = {};
var xmldom = {};
var odf = {};
var ops = {};
(function() {
  var dependencies = {}, loadedFiles = {};
  function loadManifest(dir, manifests) {
    var path = dir + "/manifest.json", content, list, manifest, m;
    if(loadedFiles.hasOwnProperty(path)) {
      return
    }
    loadedFiles[path] = 1;
    try {
      content = runtime.readFileSync(path, "utf-8")
    }catch(e) {
      console.log(String(e));
      return
    }
    list = JSON.parse((content));
    manifest = (list);
    for(m in manifest) {
      if(manifest.hasOwnProperty(m)) {
        manifests[m] = {dir:dir, deps:manifest[m]}
      }
    }
  }
  function expandPathDependencies(path, manifests, allDeps) {
    var d = manifests[path].deps, deps = {};
    allDeps[path] = deps;
    d.forEach(function(dp) {
      deps[dp] = 1
    });
    d.forEach(function(dp) {
      if(!allDeps[dp]) {
        expandPathDependencies(dp, manifests, allDeps)
      }
    });
    d.forEach(function(dp) {
      Object.keys(allDeps[dp]).forEach(function(k) {
        deps[k] = 1
      })
    })
  }
  function sortDeps(deps, allDeps) {
    var i, sorted = [];
    function add(path, stack) {
      var j, d = allDeps[path];
      if(sorted.indexOf(path) === -1 && stack.indexOf(path) === -1) {
        stack.push(path);
        for(j = 0;j < deps.length;j += 1) {
          if(d[deps[j]]) {
            add(deps[j], stack)
          }
        }
        stack.pop();
        sorted.push(path)
      }
    }
    for(i = 0;i < deps.length;i += 1) {
      add(deps[i], [])
    }
    return sorted
  }
  function expandDependencies(manifests) {
    var path, deps, allDeps = {};
    for(path in manifests) {
      if(manifests.hasOwnProperty(path)) {
        expandPathDependencies(path, manifests, allDeps)
      }
    }
    for(path in manifests) {
      if(manifests.hasOwnProperty(path)) {
        deps = (Object.keys(allDeps[path]));
        manifests[path].deps = sortDeps(deps, allDeps);
        manifests[path].deps.push(path)
      }
    }
    dependencies = manifests
  }
  function loadManifests() {
    if(Object.keys(dependencies).length > 0) {
      return
    }
    var paths = runtime.libraryPaths(), manifests = {}, i;
    if(runtime.currentDirectory()) {
      loadManifest(runtime.currentDirectory(), manifests)
    }
    for(i = 0;i < paths.length;i += 1) {
      loadManifest(paths[i], manifests)
    }
    expandDependencies(manifests)
  }
  function classPath(classname) {
    return classname.replace(".", "/") + ".js"
  }
  function getDependencies(classname) {
    var classpath = classPath(classname), deps = [], d = dependencies[classpath].deps, i;
    for(i = 0;i < d.length;i += 1) {
      if(!loadedFiles.hasOwnProperty(d[i])) {
        deps.push(d[i])
      }
    }
    return deps
  }
  function evalArray(paths, contents) {
    var i = 0;
    while(i < paths.length && contents[i] !== undefined) {
      if(contents[i] !== null) {
        eval((contents[i]));
        contents[i] = null
      }
      i += 1
    }
  }
  function loadFiles(paths) {
    var contents = [], i, p, c, async = false;
    contents.length = paths.length;
    function addContent(pos, path, content) {
      content += "\n//# sourceURL=" + path;
      content += "\n//@ sourceURL=" + path;
      contents[pos] = content
    }
    function loadFile(pos) {
      var path = dependencies[paths[pos]].dir + "/" + paths[pos];
      runtime.readFile(path, "utf8", function(err, content) {
        if(err) {
          throw err;
        }
        if(contents[pos] === undefined) {
          addContent(pos, path, (content))
        }
      })
    }
    if(async) {
      for(i = 0;i < paths.length;i += 1) {
        loadedFiles[paths[i]] = 1;
        loadFile(i)
      }
    }
    for(i = paths.length - 1;i >= 0;i -= 1) {
      loadedFiles[paths[i]] = 1;
      if(contents[i] === undefined) {
        p = paths[i];
        p = dependencies[p].dir + "/" + p;
        c = runtime.readFileSync(p, "utf-8");
        addContent(i, p, (c))
      }
    }
    evalArray(paths, contents)
  }
  runtime.loadClass = function(classname) {
    if(IS_COMPILED_CODE) {
      return
    }
    var classpath = classPath(classname), paths;
    if(loadedFiles.hasOwnProperty(classpath)) {
      return
    }
    loadManifests();
    paths = getDependencies(classname);
    loadFiles(paths)
  }
})();
(function() {
  var translator = function(string) {
    return string
  };
  function tr(original) {
    var result = translator(original);
    if(!result || String(typeof result) !== "string") {
      return original
    }
    return result
  }
  runtime.getTranslator = function() {
    return translator
  };
  runtime.setTranslator = function(translatorFunction) {
    translator = translatorFunction
  };
  runtime.tr = tr
})();
(function(args) {
  if(args) {
    args = Array.prototype.slice.call((args))
  }else {
    args = []
  }
  function run(argv) {
    if(!argv.length) {
      return
    }
    var script = argv[0];
    runtime.readFile(script, "utf8", function(err, code) {
      var path = "", codestring = (code);
      if(script.indexOf("/") !== -1) {
        path = script.substring(0, script.indexOf("/"))
      }
      runtime.setCurrentDirectory(path);
      function inner_run() {
        var script, path, args, argv, result;
        result = (eval(codestring));
        if(result) {
          runtime.exit(result)
        }
        return
      }
      if(err) {
        runtime.log(err);
        runtime.exit(1)
      }else {
        if(codestring === null) {
          runtime.log("No code found for " + script);
          runtime.exit(1)
        }else {
          inner_run.apply(null, argv)
        }
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
  };
  this.destroyAll = function(items, callback) {
    function destroy(itemIndex, err) {
      if(err) {
        callback(err)
      }else {
        if(itemIndex < items.length) {
          items[itemIndex](function(err) {
            destroy(itemIndex + 1, err)
          })
        }else {
          callback()
        }
      }
    }
    destroy(0, undefined)
  }
};
function makeBase64() {
  function makeB64tab(bin) {
    var t = {}, i, l;
    for(i = 0, l = bin.length;i < l;i += 1) {
      t[bin.charAt(i)] = i
    }
    return t
  }
  var b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", b64tab = makeB64tab(b64chars), convertUTF16StringToBase64, convertBase64ToUTF16String, window = runtime.getWindow(), btoa, atob;
  function stringToArray(s) {
    var i, l = s.length, a = new Uint8Array(new ArrayBuffer(l));
    for(i = 0;i < l;i += 1) {
      a[i] = s.charCodeAt(i) & 255
    }
    return a
  }
  function convertUTF8ArrayToBase64(bin) {
    var n, b64 = "", i, l = bin.length - 2;
    for(i = 0;i < l;i += 3) {
      n = bin[i] << 16 | bin[i + 1] << 8 | bin[i + 2];
      b64 += (b64chars[n >>> 18]);
      b64 += (b64chars[n >>> 12 & 63]);
      b64 += (b64chars[n >>> 6 & 63]);
      b64 += (b64chars[n & 63])
    }
    if(i === l + 1) {
      n = bin[i] << 4;
      b64 += (b64chars[n >>> 6]);
      b64 += (b64chars[n & 63]);
      b64 += "=="
    }else {
      if(i === l) {
        n = bin[i] << 10 | bin[i + 1] << 2;
        b64 += (b64chars[n >>> 12]);
        b64 += (b64chars[n >>> 6 & 63]);
        b64 += (b64chars[n & 63]);
        b64 += "="
      }
    }
    return b64
  }
  function convertBase64ToUTF8Array(b64) {
    b64 = b64.replace(/[^A-Za-z0-9+\/]+/g, "");
    var l = b64.length, bin = new Uint8Array(new ArrayBuffer(3 * l)), padlen = b64.length % 4, o = 0, i, n;
    for(i = 0;i < l;i += 4) {
      n = (b64tab[b64.charAt(i)] || 0) << 18 | (b64tab[b64.charAt(i + 1)] || 0) << 12 | (b64tab[b64.charAt(i + 2)] || 0) << 6 | (b64tab[b64.charAt(i + 3)] || 0);
      bin[o] = n >> 16;
      bin[o + 1] = n >> 8 & 255;
      bin[o + 2] = n & 255;
      o += 3
    }
    l = 3 * l - [0, 0, 2, 1][padlen];
    return bin.subarray(0, l)
  }
  function convertUTF16ArrayToUTF8Array(uni) {
    var i, n, l = uni.length, o = 0, bin = new Uint8Array(new ArrayBuffer(3 * l));
    for(i = 0;i < l;i += 1) {
      n = (uni[i]);
      if(n < 128) {
        bin[o++] = n
      }else {
        if(n < 2048) {
          bin[o++] = 192 | n >>> 6;
          bin[o++] = 128 | n & 63
        }else {
          bin[o++] = 224 | n >>> 12 & 15;
          bin[o++] = 128 | n >>> 6 & 63;
          bin[o++] = 128 | n & 63
        }
      }
    }
    return bin.subarray(0, o)
  }
  function convertUTF8ArrayToUTF16Array(bin) {
    var i, c0, c1, c2, l = bin.length, uni = new Uint8Array(new ArrayBuffer(l)), o = 0;
    for(i = 0;i < l;i += 1) {
      c0 = (bin[i]);
      if(c0 < 128) {
        uni[o++] = c0
      }else {
        i += 1;
        c1 = (bin[i]);
        if(c0 < 224) {
          uni[o++] = (c0 & 31) << 6 | c1 & 63
        }else {
          i += 1;
          c2 = (bin[i]);
          uni[o++] = (c0 & 15) << 12 | (c1 & 63) << 6 | c2 & 63
        }
      }
    }
    return uni.subarray(0, o)
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
      r += String.fromCharCode.apply(String, b.subarray(i, i + chunksize));
      i += chunksize
    }
    return r
  }
  function convertUTF8StringToUTF16String_internal(bin, i, end) {
    var c0, c1, c2, j, str = "";
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
    var partsize = 1E5, str = "", pos = 0;
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
    btoa = window.btoa;
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
    atob = window.atob;
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
  core.Base64 = function Base64() {
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
    };
    return this
  };
  return core.Base64
}
core.Base64 = makeBase64();
core.ByteArray = function ByteArray(data) {
  this.pos = 0;
  this.data = data;
  this.readUInt32LE = function() {
    this.pos += 4;
    var d = this.data, pos = this.pos;
    return d[--pos] << 24 | d[--pos] << 16 | d[--pos] << 8 | d[--pos]
  };
  this.readUInt16LE = function() {
    this.pos += 2;
    var d = this.data, pos = this.pos;
    return d[--pos] << 8 | d[--pos]
  }
};
core.ByteArrayWriter = function ByteArrayWriter(encoding) {
  var self = this, length = 0, bufferSize = 1024, data = new Uint8Array(new ArrayBuffer(bufferSize));
  function expand(extraLength) {
    var newData;
    if(extraLength > bufferSize - length) {
      bufferSize = Math.max(2 * bufferSize, length + extraLength);
      newData = new Uint8Array(new ArrayBuffer(bufferSize));
      newData.set(data);
      data = newData
    }
  }
  this.appendByteArrayWriter = function(writer) {
    self.appendByteArray(writer.getByteArray())
  };
  this.appendByteArray = function(array) {
    var l = array.length;
    expand(l);
    data.set(array, length);
    length += l
  };
  this.appendArray = function(array) {
    var l = array.length;
    expand(l);
    data.set(array, length);
    length += l
  };
  this.appendUInt16LE = function(value) {
    self.appendArray([value & 255, value >> 8 & 255])
  };
  this.appendUInt32LE = function(value) {
    self.appendArray([value & 255, value >> 8 & 255, value >> 16 & 255, value >> 24 & 255])
  };
  this.appendString = function(string) {
    self.appendByteArray(runtime.byteArrayFromString(string, encoding))
  };
  this.getLength = function() {
    return length
  };
  this.getByteArray = function() {
    var a = new Uint8Array(new ArrayBuffer(length));
    a.set(data.subarray(0, length));
    return a
  }
};
core.CSSUnits = function CSSUnits() {
  var self = this, sizemap = {"in":1, "cm":2.54, "mm":25.4, "pt":72, "pc":12};
  this.convert = function(value, oldUnit, newUnit) {
    return value * sizemap[newUnit] / sizemap[oldUnit]
  };
  this.convertMeasure = function(measure, newUnit) {
    var value, oldUnit, newMeasure;
    if(measure && newUnit) {
      value = parseFloat(measure);
      oldUnit = measure.replace(value.toString(), "");
      newMeasure = self.convert(value, oldUnit, newUnit).toString()
    }else {
      newMeasure = ""
    }
    return newMeasure
  };
  this.getUnits = function(measure) {
    return measure.substr(measure.length - 2, measure.length)
  }
};
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
(function() {
  var browserQuirks;
  function getBrowserQuirks() {
    var range, directBoundingRect, rangeBoundingRect, testContainer, testElement, detectedQuirks, window, document;
    if(browserQuirks === undefined) {
      window = runtime.getWindow();
      document = window && window.document;
      browserQuirks = {rangeBCRIgnoresElementBCR:false, unscaledRangeClientRects:false};
      if(document) {
        testContainer = document.createElement("div");
        testContainer.style.position = "absolute";
        testContainer.style.left = "-99999px";
        testContainer.style.transform = "scale(2)";
        testContainer.style["-webkit-transform"] = "scale(2)";
        testElement = document.createElement("div");
        testContainer.appendChild(testElement);
        document.body.appendChild(testContainer);
        range = document.createRange();
        range.selectNode(testElement);
        browserQuirks.rangeBCRIgnoresElementBCR = range.getClientRects().length === 0;
        testElement.appendChild(document.createTextNode("Rect transform test"));
        directBoundingRect = testElement.getBoundingClientRect();
        rangeBoundingRect = range.getBoundingClientRect();
        browserQuirks.unscaledRangeClientRects = Math.abs(directBoundingRect.height - rangeBoundingRect.height) > 2;
        range.detach();
        document.body.removeChild(testContainer);
        detectedQuirks = Object.keys(browserQuirks).map(function(quirk) {
          return quirk + ":" + String(browserQuirks[quirk])
        }).join(", ");
        runtime.log("Detected browser quirks - " + detectedQuirks)
      }
    }
    return browserQuirks
  }
  core.DomUtils = function DomUtils() {
    var sharedRange = null;
    function getSharedRange(doc) {
      var range;
      if(sharedRange) {
        range = sharedRange
      }else {
        sharedRange = range = (doc.createRange())
      }
      return range
    }
    function findStablePoint(container, offset) {
      var c = container;
      if(offset < c.childNodes.length) {
        c = c.childNodes.item(offset);
        offset = 0;
        while(c.firstChild) {
          c = c.firstChild
        }
      }else {
        while(c.lastChild) {
          c = c.lastChild;
          offset = c.nodeType === Node.TEXT_NODE ? c.textContent.length : c.childNodes.length
        }
      }
      return{container:c, offset:offset}
    }
    function splitBoundaries(range) {
      var modifiedNodes = [], end, splitStart, node, text;
      if(range.startContainer.nodeType === Node.TEXT_NODE || range.endContainer.nodeType === Node.TEXT_NODE) {
        end = range.endContainer && findStablePoint(range.endContainer, range.endOffset);
        range.setEnd(end.container, end.offset);
        node = range.endContainer;
        if(range.endOffset !== 0 && node.nodeType === Node.TEXT_NODE) {
          text = (node);
          if(range.endOffset !== text.length) {
            modifiedNodes.push(text.splitText(range.endOffset));
            modifiedNodes.push(text)
          }
        }
        node = range.startContainer;
        if(range.startOffset !== 0 && node.nodeType === Node.TEXT_NODE) {
          text = (node);
          if(range.startOffset !== text.length) {
            splitStart = text.splitText(range.startOffset);
            modifiedNodes.push(text);
            modifiedNodes.push(splitStart);
            range.setStart(splitStart, 0)
          }
        }
      }
      return modifiedNodes
    }
    this.splitBoundaries = splitBoundaries;
    function containsRange(container, insideRange) {
      return container.compareBoundaryPoints(Range.START_TO_START, insideRange) <= 0 && container.compareBoundaryPoints(Range.END_TO_END, insideRange) >= 0
    }
    this.containsRange = containsRange;
    function rangesIntersect(range1, range2) {
      return range1.compareBoundaryPoints(Range.END_TO_START, range2) <= 0 && range1.compareBoundaryPoints(Range.START_TO_END, range2) >= 0
    }
    this.rangesIntersect = rangesIntersect;
    function getNodesInRange(range, nodeFilter) {
      var document = range.startContainer.ownerDocument, elements = [], rangeRoot = range.commonAncestorContainer, root = (rangeRoot.nodeType === Node.TEXT_NODE ? rangeRoot.parentNode : rangeRoot), n, filterResult, treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_ALL, nodeFilter, false);
      treeWalker.currentNode = range.startContainer;
      n = range.startContainer;
      while(n) {
        filterResult = nodeFilter(n);
        if(filterResult === NodeFilter.FILTER_ACCEPT) {
          elements.push(n)
        }else {
          if(filterResult === NodeFilter.FILTER_REJECT) {
            break
          }
        }
        n = n.parentNode
      }
      elements.reverse();
      n = treeWalker.nextNode();
      while(n) {
        elements.push(n);
        n = treeWalker.nextNode()
      }
      return elements
    }
    this.getNodesInRange = getNodesInRange;
    function mergeTextNodes(node, nextNode) {
      var mergedNode = null, text, nextText;
      if(node.nodeType === Node.TEXT_NODE) {
        text = (node);
        if(text.length === 0) {
          text.parentNode.removeChild(text);
          if(nextNode.nodeType === Node.TEXT_NODE) {
            mergedNode = nextNode
          }
        }else {
          if(nextNode.nodeType === Node.TEXT_NODE) {
            nextText = (nextNode);
            text.appendData(nextText.data);
            nextNode.parentNode.removeChild(nextNode)
          }
          mergedNode = node
        }
      }
      return mergedNode
    }
    function normalizeTextNodes(node) {
      if(node && node.nextSibling) {
        node = mergeTextNodes(node, node.nextSibling)
      }
      if(node && node.previousSibling) {
        mergeTextNodes(node.previousSibling, node)
      }
    }
    this.normalizeTextNodes = normalizeTextNodes;
    function rangeContainsNode(limits, node) {
      var range = node.ownerDocument.createRange(), nodeRange = node.ownerDocument.createRange(), result;
      range.setStart(limits.startContainer, limits.startOffset);
      range.setEnd(limits.endContainer, limits.endOffset);
      nodeRange.selectNodeContents(node);
      result = containsRange(range, nodeRange);
      range.detach();
      nodeRange.detach();
      return result
    }
    this.rangeContainsNode = rangeContainsNode;
    function mergeIntoParent(targetNode) {
      var parent = targetNode.parentNode;
      while(targetNode.firstChild) {
        parent.insertBefore(targetNode.firstChild, targetNode)
      }
      parent.removeChild(targetNode);
      return parent
    }
    this.mergeIntoParent = mergeIntoParent;
    function removeUnwantedNodes(targetNode, shouldRemove) {
      var parent = targetNode.parentNode, node = targetNode.firstChild, next;
      while(node) {
        next = node.nextSibling;
        removeUnwantedNodes(node, shouldRemove);
        node = next
      }
      if(shouldRemove(targetNode)) {
        parent = mergeIntoParent(targetNode)
      }
      return parent
    }
    this.removeUnwantedNodes = removeUnwantedNodes;
    function getElementsByTagNameNS(node, namespace, tagName) {
      var e = [], list, i, l;
      list = node.getElementsByTagNameNS(namespace, tagName);
      e.length = l = list.length;
      for(i = 0;i < l;i += 1) {
        e[i] = (list.item(i))
      }
      return e
    }
    this.getElementsByTagNameNS = getElementsByTagNameNS;
    function rangeIntersectsNode(range, node) {
      var nodeRange = node.ownerDocument.createRange(), result;
      nodeRange.selectNodeContents(node);
      result = rangesIntersect(range, nodeRange);
      nodeRange.detach();
      return result
    }
    this.rangeIntersectsNode = rangeIntersectsNode;
    function containsNode(parent, descendant) {
      return parent === descendant || (parent).contains((descendant))
    }
    this.containsNode = containsNode;
    function containsNodeForBrokenWebKit(parent, descendant) {
      return parent === descendant || Boolean(parent.compareDocumentPosition(descendant) & Node.DOCUMENT_POSITION_CONTAINED_BY)
    }
    function getPositionInContainingNode(node, container) {
      var offset = 0, n;
      while(node.parentNode !== container) {
        runtime.assert(node.parentNode !== null, "parent is null");
        node = (node.parentNode)
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
    this.comparePoints = comparePoints;
    function adaptRangeDifferenceToZoomLevel(inputNumber, zoomLevel) {
      if(getBrowserQuirks().unscaledRangeClientRects) {
        return inputNumber
      }
      return inputNumber / zoomLevel
    }
    this.adaptRangeDifferenceToZoomLevel = adaptRangeDifferenceToZoomLevel;
    function getBoundingClientRect(node) {
      var doc = (node.ownerDocument), quirks = getBrowserQuirks(), range, element;
      if(quirks.unscaledRangeClientRects === false || quirks.rangeBCRIgnoresElementBCR) {
        if(node.nodeType === Node.ELEMENT_NODE) {
          element = (node);
          return element.getBoundingClientRect()
        }
      }
      range = getSharedRange(doc);
      range.selectNode(node);
      return range.getBoundingClientRect()
    }
    this.getBoundingClientRect = getBoundingClientRect;
    function mapKeyValObjOntoNode(node, properties, nsResolver) {
      Object.keys(properties).forEach(function(key) {
        var parts = key.split(":"), prefix = parts[0], localName = parts[1], ns = nsResolver(prefix), value = properties[key], element;
        if(ns) {
          element = (node.getElementsByTagNameNS(ns, localName)[0]);
          if(!element) {
            element = node.ownerDocument.createElementNS(ns, key);
            node.appendChild(element)
          }
          element.textContent = value
        }else {
          runtime.log("Key ignored: " + key)
        }
      })
    }
    this.mapKeyValObjOntoNode = mapKeyValObjOntoNode;
    function removeKeyElementsFromNode(node, propertyNames, nsResolver) {
      propertyNames.forEach(function(propertyName) {
        var parts = propertyName.split(":"), prefix = parts[0], localName = parts[1], ns = nsResolver(prefix), element;
        if(ns) {
          element = (node.getElementsByTagNameNS(ns, localName)[0]);
          if(element) {
            element.parentNode.removeChild(element)
          }else {
            runtime.log("Element for " + propertyName + " not found.")
          }
        }else {
          runtime.log("Property Name ignored: " + propertyName)
        }
      })
    }
    this.removeKeyElementsFromNode = removeKeyElementsFromNode;
    function getKeyValRepresentationOfNode(node, prefixResolver) {
      var properties = {}, currentSibling = node.firstElementChild, prefix;
      while(currentSibling) {
        prefix = prefixResolver(currentSibling.namespaceURI);
        if(prefix) {
          properties[prefix + ":" + currentSibling.localName] = currentSibling.textContent
        }
        currentSibling = currentSibling.nextElementSibling
      }
      return properties
    }
    this.getKeyValRepresentationOfNode = getKeyValRepresentationOfNode;
    function mapObjOntoNode(node, properties, nsResolver) {
      Object.keys(properties).forEach(function(key) {
        var parts = key.split(":"), prefix = parts[0], localName = parts[1], ns = nsResolver(prefix), value = properties[key], element;
        if(typeof value === "object" && Object.keys((value)).length) {
          if(ns) {
            element = (node.getElementsByTagNameNS(ns, localName)[0]) || node.ownerDocument.createElementNS(ns, key)
          }else {
            element = (node.getElementsByTagName(localName)[0]) || node.ownerDocument.createElement(key)
          }
          node.appendChild(element);
          mapObjOntoNode(element, (value), nsResolver)
        }else {
          if(ns) {
            node.setAttributeNS(ns, key, String(value))
          }
        }
      })
    }
    this.mapObjOntoNode = mapObjOntoNode;
    function init(self) {
      var appVersion, webKitOrSafari, ie, window = runtime.getWindow();
      if(window === null) {
        return
      }
      appVersion = window.navigator.appVersion.toLowerCase();
      webKitOrSafari = appVersion.indexOf("chrome") === -1 && (appVersion.indexOf("applewebkit") !== -1 || appVersion.indexOf("safari") !== -1);
      ie = appVersion.indexOf("msie");
      if(webKitOrSafari || ie) {
        self.containsNode = containsNodeForBrokenWebKit
      }
    }
    init(this)
  };
  return core.DomUtils
})();
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
core.EventNotifier = function EventNotifier(eventIds) {
  var eventListener = {};
  this.emit = function(eventId, args) {
    var i, subscribers;
    runtime.assert(eventListener.hasOwnProperty(eventId), 'unknown event fired "' + eventId + '"');
    subscribers = eventListener[eventId];
    for(i = 0;i < subscribers.length;i += 1) {
      subscribers[i](args)
    }
  };
  this.subscribe = function(eventId, cb) {
    runtime.assert(eventListener.hasOwnProperty(eventId), 'tried to subscribe to unknown event "' + eventId + '"');
    eventListener[eventId].push(cb);
    runtime.log('event "' + eventId + '" subscribed.')
  };
  this.unsubscribe = function(eventId, cb) {
    var cbIndex;
    runtime.assert(eventListener.hasOwnProperty(eventId), 'tried to unsubscribe from unknown event "' + eventId + '"');
    cbIndex = eventListener[eventId].indexOf(cb);
    runtime.assert(cbIndex !== -1, 'tried to unsubscribe unknown callback from event "' + eventId + '"');
    if(cbIndex !== -1) {
      eventListener[eventId].splice(cbIndex, 1)
    }
    runtime.log('event "' + eventId + '" unsubscribed.')
  };
  function init() {
    var i, eventId;
    for(i = 0;i < eventIds.length;i += 1) {
      eventId = eventIds[i];
      runtime.assert(!eventListener.hasOwnProperty(eventId), 'Duplicated event ids: "' + eventId + '" registered more than once.');
      eventListener[eventId] = []
    }
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
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
core.PositionIterator = function PositionIterator(root, whatToShow, filter, expandEntityReferences) {
  var self = this, walker, currentPos, nodeFilter, TEXT_NODE = Node.TEXT_NODE, ELEMENT_NODE = Node.ELEMENT_NODE, FILTER_ACCEPT = NodeFilter.FILTER_ACCEPT, FILTER_REJECT = NodeFilter.FILTER_REJECT;
  function EmptyTextNodeFilter() {
    this.acceptNode = function(node) {
      var text = (node);
      if(!node || node.nodeType === TEXT_NODE && text.length === 0) {
        return FILTER_REJECT
      }
      return FILTER_ACCEPT
    }
  }
  function FilteredEmptyTextNodeFilter(filter) {
    this.acceptNode = function(node) {
      var text = (node);
      if(!node || node.nodeType === TEXT_NODE && text.length === 0) {
        return FILTER_REJECT
      }
      return filter.acceptNode(node)
    }
  }
  this.nextPosition = function() {
    var currentNode = walker.currentNode, nodeType = currentNode.nodeType, text = (currentNode);
    if(currentNode === root) {
      return false
    }
    if(currentPos === 0 && nodeType === ELEMENT_NODE) {
      if(walker.firstChild() === null) {
        currentPos = 1
      }
    }else {
      if(nodeType === TEXT_NODE && currentPos + 1 < text.length) {
        currentPos += 1
      }else {
        if(walker.nextSibling() !== null) {
          currentPos = 0
        }else {
          if(walker.parentNode()) {
            currentPos = 1
          }else {
            return false
          }
        }
      }
    }
    return true
  };
  function setAtEnd() {
    var text = (walker.currentNode), type = text.nodeType;
    if(type === TEXT_NODE) {
      currentPos = text.length - 1
    }else {
      currentPos = type === ELEMENT_NODE ? 1 : 0
    }
  }
  function previousNode() {
    if(walker.previousSibling() === null) {
      if(!walker.parentNode() || walker.currentNode === root) {
        walker.firstChild();
        return false
      }
      currentPos = 0
    }else {
      setAtEnd()
    }
    return true
  }
  this.previousPosition = function() {
    var moved = true, currentNode = walker.currentNode;
    if(currentPos === 0) {
      moved = previousNode()
    }else {
      if(currentNode.nodeType === TEXT_NODE) {
        currentPos -= 1
      }else {
        if(walker.lastChild() !== null) {
          setAtEnd()
        }else {
          if(currentNode === root) {
            moved = false
          }else {
            currentPos = 0
          }
        }
      }
    }
    return moved
  };
  this.previousNode = previousNode;
  this.container = function() {
    var n = (walker.currentNode), t = n.nodeType;
    if(currentPos === 0 && t !== TEXT_NODE) {
      n = (n.parentNode)
    }
    return n
  };
  this.rightNode = function() {
    var n = walker.currentNode, text = (n), nodeType = n.nodeType;
    if(nodeType === TEXT_NODE && currentPos === text.length) {
      n = n.nextSibling;
      while(n && nodeFilter(n) !== FILTER_ACCEPT) {
        n = n.nextSibling
      }
    }else {
      if(nodeType === ELEMENT_NODE && currentPos === 1) {
        n = null
      }
    }
    return n
  };
  this.leftNode = function() {
    var n = walker.currentNode;
    if(currentPos === 0) {
      n = n.previousSibling;
      while(n && nodeFilter(n) !== FILTER_ACCEPT) {
        n = n.previousSibling
      }
    }else {
      if(n.nodeType === ELEMENT_NODE) {
        n = n.lastChild;
        while(n && nodeFilter(n) !== FILTER_ACCEPT) {
          n = n.previousSibling
        }
      }
    }
    return n
  };
  this.getCurrentNode = function() {
    var n = (walker.currentNode);
    return n
  };
  this.unfilteredDomOffset = function() {
    if(walker.currentNode.nodeType === TEXT_NODE) {
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
  this.getPreviousSibling = function() {
    var currentNode = walker.currentNode, sibling = walker.previousSibling();
    walker.currentNode = currentNode;
    return sibling
  };
  this.getNextSibling = function() {
    var currentNode = walker.currentNode, sibling = walker.nextSibling();
    walker.currentNode = currentNode;
    return sibling
  };
  this.setUnfilteredPosition = function(container, offset) {
    var filterResult, node, text;
    runtime.assert(container !== null && container !== undefined, "PositionIterator.setUnfilteredPosition called without container");
    walker.currentNode = container;
    if(container.nodeType === TEXT_NODE) {
      currentPos = offset;
      text = (container);
      runtime.assert(offset <= text.length, "Error in setPosition: " + offset + " > " + text.length);
      runtime.assert(offset >= 0, "Error in setPosition: " + offset + " < 0");
      if(offset === text.length) {
        if(walker.nextSibling()) {
          currentPos = 0
        }else {
          if(walker.parentNode()) {
            currentPos = 1
          }else {
            runtime.assert(false, "Error in setUnfilteredPosition: position not valid.")
          }
        }
      }
      return true
    }
    filterResult = nodeFilter(container);
    node = container.parentNode;
    while(node && (node !== root && filterResult === FILTER_ACCEPT)) {
      filterResult = nodeFilter(node);
      if(filterResult !== FILTER_ACCEPT) {
        walker.currentNode = node
      }
      node = node.parentNode
    }
    if(offset < container.childNodes.length && filterResult !== NodeFilter.FILTER_REJECT) {
      walker.currentNode = (container.childNodes.item(offset));
      filterResult = nodeFilter(walker.currentNode);
      currentPos = 0
    }else {
      currentPos = 1
    }
    if(filterResult === NodeFilter.FILTER_REJECT) {
      currentPos = 1
    }
    if(filterResult !== FILTER_ACCEPT) {
      return self.nextPosition()
    }
    runtime.assert(nodeFilter(walker.currentNode) === FILTER_ACCEPT, "PositionIterater.setUnfilteredPosition call resulted in an non-visible node being set");
    return true
  };
  this.moveToEnd = function() {
    walker.currentNode = root;
    currentPos = 1
  };
  this.moveToEndOfNode = function(node) {
    var text;
    if(node.nodeType === TEXT_NODE) {
      text = (node);
      self.setUnfilteredPosition(text, text.length)
    }else {
      walker.currentNode = node;
      currentPos = 1
    }
  };
  this.getNodeFilter = function() {
    return nodeFilter
  };
  function init() {
    var f;
    if(filter) {
      f = new FilteredEmptyTextNodeFilter(filter)
    }else {
      f = new EmptyTextNodeFilter
    }
    nodeFilter = (f.acceptNode);
    nodeFilter.acceptNode = nodeFilter;
    whatToShow = whatToShow || 4294967295;
    runtime.assert(root.nodeType !== Node.TEXT_NODE, "Internet Explorer doesn't allow tree walker roots to be text nodes");
    walker = root.ownerDocument.createTreeWalker(root, whatToShow, nodeFilter, expandEntityReferences);
    currentPos = 0;
    if(walker.firstChild() === null) {
      currentPos = 1
    }
  }
  init()
};
core.zip_HuftNode = function() {
  this.e = 0;
  this.b = 0;
  this.n = 0;
  this.t = null
};
core.zip_HuftList = function() {
  this.next = null;
  this.list = null
};
core.RawInflate = function RawInflate() {
  var zip_WSIZE = 32768;
  var zip_STORED_BLOCK = 0;
  var zip_lbits = 9;
  var zip_dbits = 6;
  var zip_slide = [];
  var zip_wp;
  var zip_fixed_tl = null;
  var zip_fixed_td;
  var zip_fixed_bl;
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
  var zip_MASK_BITS = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535];
  var zip_cplens = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
  var zip_cplext = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99];
  var zip_cpdist = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
  var zip_cpdext = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
  var zip_border = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
  function Zip_HuftBuild(b, n, s, d, e, mm) {
    this.BMAX = 16;
    this.N_MAX = 288;
    this.status = 0;
    this.root = null;
    this.m = 0;
    var a, c = new Array(this.BMAX + 1), el, f, g, h, i, j, k, lx = new Array(this.BMAX + 1), p, pidx, q, r = new core.zip_HuftNode, u = new Array(this.BMAX), v = new Array(this.N_MAX), w, x = new Array(this.BMAX + 1), xp, y, z, o, tail;
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
    if(c[0] === n) {
      this.root = null;
      this.m = 0;
      this.status = 0;
      return
    }
    for(j = 1;j <= this.BMAX;j++) {
      if(c[j] !== 0) {
        break
      }
    }
    k = j;
    if(mm < j) {
      mm = j
    }
    for(i = this.BMAX;i !== 0;i--) {
      if(c[i] !== 0) {
        break
      }
    }
    g = i;
    if(mm > i) {
      mm = i
    }
    for(y = 1 << j;j < i;j++, y <<= 1) {
      y -= c[j];
      if(y < 0) {
        this.status = 2;
        this.m = mm;
        return
      }
    }
    y -= c[i];
    if(y < 0) {
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
      j += p[pidx++];
      x[xp++] = j
    }
    p = b;
    pidx = 0;
    i = 0;
    do {
      j = p[pidx++];
      if(j !== 0) {
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
    k -= 1;
    for(k += 1;k <= g;k++) {
      a = c[k];
      while(a-- > 0) {
        while(k > w + lx[1 + h]) {
          w += lx[1 + h];
          h++;
          z = g - w;
          z = z > mm ? mm : z;
          j = k - w;
          f = 1 << j;
          if(f > a + 1) {
            f -= a + 1;
            xp = k;
            while(++j < z) {
              f <<= 1;
              if(f <= c[++xp]) {
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
            q[o] = new core.zip_HuftNode
          }
          if(tail === null) {
            tail = this.root = new core.zip_HuftList
          }else {
            tail = tail.next = new core.zip_HuftList
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
            u[h - 1][j].n = (r).n;
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
          q[j].n = (r).n;
          q[j].t = r.t
        }
        for(j = 1 << k - 1;(i & j) !== 0;j >>= 1) {
          i ^= j
        }
        i ^= j;
        while((i & (1 << w) - 1) !== x[h]) {
          w -= lx[h];
          h--
        }
      }
    }
    this.m = lx[1];
    this.status = y !== 0 && g !== 1 ? 1 : 0
  }
  function zip_GET_BYTE() {
    if(zip_inflate_data.length === zip_inflate_pos) {
      return-1
    }
    return zip_inflate_data[zip_inflate_pos++]
  }
  function zip_NEEDBITS(n) {
    while(zip_bit_len < n) {
      zip_bit_buf |= zip_GET_BYTE() << zip_bit_len;
      zip_bit_len += 8
    }
  }
  function zip_GETBITS(n) {
    return zip_bit_buf & zip_MASK_BITS[n]
  }
  function zip_DUMPBITS(n) {
    zip_bit_buf >>= n;
    zip_bit_len -= n
  }
  function zip_inflate_codes(buff, off, size) {
    var e, t, n;
    if(size === 0) {
      return 0
    }
    n = 0;
    for(;;) {
      zip_NEEDBITS(zip_bl);
      t = zip_tl.list[zip_GETBITS(zip_bl)];
      e = t.e;
      while(e > 16) {
        if(e === 99) {
          return-1
        }
        zip_DUMPBITS(t.b);
        e -= 16;
        zip_NEEDBITS(e);
        t = t.t[zip_GETBITS(e)];
        e = t.e
      }
      zip_DUMPBITS(t.b);
      if(e === 16) {
        zip_wp &= zip_WSIZE - 1;
        buff[off + n++] = zip_slide[zip_wp++] = t.n;
        if(n === size) {
          return size
        }
      }else {
        if(e === 15) {
          break
        }
        zip_NEEDBITS(e);
        zip_copy_leng = t.n + zip_GETBITS(e);
        zip_DUMPBITS(e);
        zip_NEEDBITS(zip_bd);
        t = zip_td.list[zip_GETBITS(zip_bd)];
        e = t.e;
        while(e > 16) {
          if(e === 99) {
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
        if(n === size) {
          return size
        }
      }
    }
    zip_method = -1;
    return n
  }
  function zip_inflate_stored(buff, off, size) {
    var n;
    n = zip_bit_len & 7;
    zip_DUMPBITS(n);
    zip_NEEDBITS(16);
    n = zip_GETBITS(16);
    zip_DUMPBITS(16);
    zip_NEEDBITS(16);
    if(n !== (~zip_bit_buf & 65535)) {
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
    if(zip_copy_leng === 0) {
      zip_method = -1
    }
    return n
  }
  var zip_fixed_bd;
  function zip_inflate_fixed(buff, off, size) {
    if(zip_fixed_tl === null) {
      var i;
      var l = new Array(288);
      var h;
      for(i = 0;i < 144;i++) {
        l[i] = 8
      }
      for(i = 144;i < 256;i++) {
        l[i] = 9
      }
      for(i = 256;i < 280;i++) {
        l[i] = 7
      }
      for(i = 280;i < 288;i++) {
        l[i] = 8
      }
      zip_fixed_bl = 7;
      h = new Zip_HuftBuild(l, 288, 257, zip_cplens, zip_cplext, zip_fixed_bl);
      if(h.status !== 0) {
        alert("HufBuild error: " + h.status);
        return-1
      }
      zip_fixed_tl = h.root;
      zip_fixed_bl = h.m;
      for(i = 0;i < 30;i++) {
        l[i] = 5
      }
      zip_fixed_bd = 5;
      h = new Zip_HuftBuild(l, 30, 0, zip_cpdist, zip_cpdext, zip_fixed_bd);
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
  }
  function zip_inflate_dynamic(buff, off, size) {
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
    for(j = nb;j < 19;j++) {
      ll[zip_border[j]] = 0
    }
    zip_bl = 7;
    h = new Zip_HuftBuild(ll, 19, 19, null, null, zip_bl);
    if(h.status !== 0) {
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
        if(j === 16) {
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
          if(j === 17) {
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
    h = new Zip_HuftBuild(ll, nl, 257, zip_cplens, zip_cplext, zip_bl);
    if(zip_bl === 0) {
      h.status = 1
    }
    if(h.status !== 0) {
      return-1
    }
    zip_tl = h.root;
    zip_bl = h.m;
    for(i = 0;i < nd;i++) {
      ll[i] = ll[i + nl]
    }
    zip_bd = zip_dbits;
    h = new Zip_HuftBuild(ll, nd, 0, zip_cpdist, zip_cpdext, zip_bd);
    zip_td = h.root;
    zip_bd = h.m;
    if(zip_bd === 0 && nl > 257) {
      return-1
    }
    if(h.status !== 0) {
      return-1
    }
    return zip_inflate_codes(buff, off, size)
  }
  function zip_inflate_start() {
    zip_slide.length = 2 * zip_WSIZE;
    zip_wp = 0;
    zip_bit_buf = 0;
    zip_bit_len = 0;
    zip_method = -1;
    zip_eof = false;
    zip_copy_leng = zip_copy_dist = 0;
    zip_tl = null
  }
  function zip_inflate_internal(buff, off, size) {
    var n = 0, i;
    while(n < size) {
      if(zip_eof && zip_method === -1) {
        return n
      }
      if(zip_copy_leng > 0) {
        if(zip_method !== zip_STORED_BLOCK) {
          while(zip_copy_leng > 0 && n < size) {
            zip_copy_leng--;
            zip_copy_dist &= zip_WSIZE - 1;
            zip_wp &= zip_WSIZE - 1;
            buff[off + n] = zip_slide[zip_wp] = zip_slide[zip_copy_dist];
            n += 1;
            zip_wp += 1;
            zip_copy_dist += 1
          }
        }else {
          while(zip_copy_leng > 0 && n < size) {
            zip_copy_leng -= 1;
            zip_wp &= zip_WSIZE - 1;
            zip_NEEDBITS(8);
            buff[off + n] = zip_slide[zip_wp] = zip_GETBITS(8);
            n += 1;
            zip_wp += 1;
            zip_DUMPBITS(8)
          }
          if(zip_copy_leng === 0) {
            zip_method = -1
          }
        }
        if(n === size) {
          return n
        }
      }
      if(zip_method === -1) {
        if(zip_eof) {
          break
        }
        zip_NEEDBITS(1);
        if(zip_GETBITS(1) !== 0) {
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
          if(zip_tl !== null) {
            i = zip_inflate_codes(buff, off + n, size - n)
          }else {
            i = zip_inflate_fixed(buff, off + n, size - n)
          }
          break;
        case 2:
          if(zip_tl !== null) {
            i = zip_inflate_codes(buff, off + n, size - n)
          }else {
            i = zip_inflate_dynamic(buff, off + n, size - n)
          }
          break;
        default:
          i = -1;
          break
      }
      if(i === -1) {
        if(zip_eof) {
          return 0
        }
        return-1
      }
      n += i
    }
    return n
  }
  function zip_inflate(data, size) {
    zip_inflate_start();
    zip_inflate_data = data;
    zip_inflate_pos = 0;
    var buff = new Uint8Array(new ArrayBuffer(size));
    zip_inflate_internal(buff, 0, size);
    zip_inflate_data = new Uint8Array(new ArrayBuffer(0));
    return buff
  }
  this.inflate = zip_inflate
};
core.ScheduledTask = function ScheduledTask(fn, delay) {
  var timeoutId, scheduled = false, args = [];
  function cancel() {
    if(scheduled) {
      runtime.clearTimeout(timeoutId);
      scheduled = false
    }
  }
  function execute() {
    cancel();
    fn.apply(undefined, args);
    args = null
  }
  this.trigger = function() {
    args = Array.prototype.slice.call(arguments);
    if(!scheduled) {
      scheduled = true;
      timeoutId = runtime.setTimeout(execute, delay)
    }
  };
  this.triggerImmediate = function() {
    args = Array.prototype.slice.call(arguments);
    execute()
  };
  this.processRequests = function() {
    if(scheduled) {
      execute()
    }
  };
  this.cancel = cancel;
  this.destroy = function(callback) {
    cancel();
    callback()
  }
};
core.NamedFunction;
core.NamedAsyncFunction;
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
  return(testarea)
};
core.UnitTest.cleanupTestAreaDiv = function() {
  var maindoc = runtime.getWindow().document, testarea = maindoc.getElementById("testarea");
  runtime.assert(!!testarea && testarea.parentNode === maindoc.body, 'Test environment broken, found no div with id "testarea" below body.');
  maindoc.body.removeChild(testarea)
};
core.UnitTest.createOdtDocument = function(xml, namespaceMap) {
  var xmlDoc = "<?xml version='1.0' encoding='UTF-8'?>";
  xmlDoc += "<office:document";
  Object.keys(namespaceMap).forEach(function(key) {
    xmlDoc += " xmlns:" + key + '="' + namespaceMap[key] + '"'
  });
  xmlDoc += ">";
  xmlDoc += xml;
  xmlDoc += "</office:document>";
  return runtime.parseXML(xmlDoc)
};
core.UnitTestRunner = function UnitTestRunner() {
  var failedTests = 0, areObjectsEqual;
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
        testFailed("array of length " + a.length + " should be " + b.length + " long");
        return false
      }
      for(i = 0;i < a.length;i += 1) {
        if(a[i] !== b[i]) {
          testFailed(a[i] + " should be " + b[i] + " at array index " + i);
          return false
        }
      }
    }catch(ex) {
      return false
    }
    return true
  }
  function areAttributesEqual(a, b, skipReverseCheck) {
    var aatts = a.attributes, n = aatts.length, i, att, v;
    for(i = 0;i < n;i += 1) {
      att = (aatts.item(i));
      if(att.prefix !== "xmlns" && att.namespaceURI !== "urn:webodf:names:steps") {
        v = b.getAttributeNS(att.namespaceURI, att.localName);
        if(!b.hasAttributeNS(att.namespaceURI, att.localName)) {
          testFailed("Attribute " + att.localName + " with value " + att.value + " was not present");
          return false
        }
        if(v !== att.value) {
          testFailed("Attribute " + att.localName + " was " + v + " should be " + att.value);
          return false
        }
      }
    }
    return skipReverseCheck ? true : areAttributesEqual(b, a, true)
  }
  function areNodesEqual(a, b) {
    var an, bn, atype = a.nodeType, btype = b.nodeType;
    if(atype !== btype) {
      testFailed("Nodetype '" + atype + "' should be '" + btype + "'");
      return false
    }
    if(atype === Node.TEXT_NODE) {
      if((a).data === (b).data) {
        return true
      }
      testFailed("Textnode data '" + (a).data + "' should be '" + (b).data + "'");
      return false
    }
    runtime.assert(atype === Node.ELEMENT_NODE, "Only textnodes and elements supported.");
    if(a.namespaceURI !== b.namespaceURI) {
      testFailed("namespace '" + a.namespaceURI + "' should be '" + b.namespaceURI + "'");
      return false
    }
    if(a.localName !== b.localName) {
      testFailed("localName '" + a.localName + "' should be '" + b.localName + "'");
      return false
    }
    if(!areAttributesEqual((a), (b), false)) {
      return false
    }
    an = a.firstChild;
    bn = b.firstChild;
    while(an) {
      if(!bn) {
        testFailed("Nodetype '" + an.nodeType + "' is unexpected here.");
        return false
      }
      if(!areNodesEqual(an, bn)) {
        return false
      }
      an = an.nextSibling;
      bn = bn.nextSibling
    }
    if(bn) {
      testFailed("Nodetype '" + bn.nodeType + "' is missing here.");
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
      return areArraysEqual((actual), (expected))
    }
    if(typeof expected === "object" && typeof actual === "object") {
      if((expected).constructor === Element || (expected).constructor === Node) {
        return areNodesEqual((expected), (actual))
      }
      return areObjectsEqual((expected), (actual))
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
  areObjectsEqual = function(a, b) {
    var akeys = Object.keys(a), bkeys = Object.keys(b);
    akeys.sort();
    bkeys.sort();
    return areArraysEqual(akeys, bkeys) && Object.keys(a).every(function(key) {
      var aval = a[key], bval = b[key];
      if(!isResultCorrect(aval, bval)) {
        testFailed(aval + " should be " + bval + " for key " + key);
        return false
      }
      return true
    })
  };
  this.areNodesEqual = areNodesEqual;
  this.shouldBeNull = shouldBeNull;
  this.shouldBeNonNull = shouldBeNonNull;
  this.shouldBe = shouldBe;
  this.countFailedTests = function() {
    return failedTests
  };
  this.name = function(functions) {
    var i, fname, nf = [], l = functions.length;
    nf.length = l;
    for(i = 0;i < l;i += 1) {
      fname = Runtime.getFunctionName(functions[i]) || "";
      if(fname === "") {
        throw"Found a function without a name.";
      }
      nf[i] = {f:functions[i], name:fname}
    }
    return nf
  }
};
core.UnitTester = function UnitTester() {
  var failedTests = 0, results = {};
  function link(text, code) {
    return"<span style='color:blue;cursor:pointer' onclick='" + code + "'>" + text + "</span>"
  }
  this.runTests = function(TestClass, callback, testNames) {
    var testName = Runtime.getFunctionName(TestClass) || "", tname, runner = new core.UnitTestRunner, test = new TestClass(runner), testResults = {}, i, t, tests, lastFailCount, inBrowser = runtime.type() === "BrowserRuntime";
    if(results.hasOwnProperty(testName)) {
      runtime.log("Test " + testName + " has already run.");
      return
    }
    if(inBrowser) {
      runtime.log("<span>Running " + link(testName, 'runSuite("' + testName + '");') + ": " + test.description() + "</span>")
    }else {
      runtime.log("Running " + testName + ": " + test.description)
    }
    tests = test.tests();
    for(i = 0;i < tests.length;i += 1) {
      t = tests[i].f;
      tname = tests[i].name;
      if(testNames.length && testNames.indexOf(tname) === -1) {
        continue
      }
      if(inBrowser) {
        runtime.log("<span>Running " + link(tname, 'runTest("' + testName + '","' + tname + '")') + "</span>")
      }else {
        runtime.log("Running " + tname)
      }
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
      t = todo[0].f;
      var fname = todo[0].name;
      runtime.log("Running " + fname);
      lastFailCount = runner.countFailedTests();
      test.setUp();
      t(function() {
        test.tearDown();
        testResults[fname] = lastFailCount === runner.countFailedTests();
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
core.Utils = function Utils() {
  function hashString(value) {
    var hash = 0, i, l;
    for(i = 0, l = value.length;i < l;i += 1) {
      hash = (hash << 5) - hash + value.charCodeAt(i);
      hash |= 0
    }
    return hash
  }
  this.hashString = hashString;
  var mergeObjects;
  function mergeItems(destination, source) {
    if(source && Array.isArray(source)) {
      destination = destination || [];
      if(!Array.isArray(destination)) {
        throw"Destination is not an array.";
      }
      destination = (destination).concat((source).map(function(obj) {
        return mergeItems(null, obj)
      }))
    }else {
      if(source && typeof source === "object") {
        destination = destination || {};
        if(typeof destination !== "object") {
          throw"Destination is not an object.";
        }
        Object.keys((source)).forEach(function(p) {
          destination[p] = mergeItems(destination[p], source[p])
        })
      }else {
        destination = source
      }
    }
    return destination
  }
  mergeObjects = function(destination, source) {
    Object.keys(source).forEach(function(p) {
      destination[p] = mergeItems(destination[p], source[p])
    });
    return destination
  };
  this.mergeObjects = mergeObjects
};
/*

 WebODF
 Copyright (c) 2010 Jos van den Oever
 Licensed under the ... License:

 Project home: http://www.webodf.org/
*/
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
    var sig, namelen, extralen, commentlen, compressionMethod, compressedSize, uncompressedSize, offset, entry = this;
    function handleEntryData(data, callback) {
      var estream = new core.ByteArray(data), esig = estream.readUInt32LE(), filenamelen, eextralen;
      if(esig !== 67324752) {
        callback("File entry signature is wrong." + esig.toString() + " " + data.length.toString(), null);
        return
      }
      estream.pos += 22;
      filenamelen = estream.readUInt16LE();
      eextralen = estream.readUInt16LE();
      estream.pos += filenamelen + eextralen;
      if(compressionMethod) {
        data = data.subarray(estream.pos, estream.pos + compressedSize);
        if(compressedSize !== data.length) {
          callback("The amount of compressed bytes read was " + data.length.toString() + " instead of " + compressedSize.toString() + " for " + entry.filename + " in " + url + ".", null);
          return
        }
        data = inflate(data, uncompressedSize)
      }else {
        data = data.subarray(estream.pos, estream.pos + uncompressedSize)
      }
      if(uncompressedSize !== data.length) {
        callback("The amount of bytes read was " + data.length.toString() + " instead of " + uncompressedSize.toString() + " for " + entry.filename + " in " + url + ".", null);
        return
      }
      entry.data = data;
      callback(null, data)
    }
    function load(callback) {
      if(entry.data !== null) {
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
    stream.readUInt32LE();
    compressedSize = stream.readUInt32LE();
    uncompressedSize = stream.readUInt32LE();
    namelen = stream.readUInt16LE();
    extralen = stream.readUInt16LE();
    commentlen = stream.readUInt16LE();
    stream.pos += 8;
    offset = stream.readUInt32LE();
    this.filename = runtime.byteArrayToString(stream.data.subarray(stream.pos, stream.pos + namelen), "utf8");
    this.data = null;
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
    var entry = null, e, i;
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
      if(err || !data) {
        return callback(err, null)
      }
      var p = data, chunksize = 45E3, i = 0, dataurl;
      if(!mimetype) {
        if(p[1] === 80 && (p[2] === 78 && p[3] === 71)) {
          mimetype = "image/png"
        }else {
          if(p[0] === 255 && (p[1] === 216 && p[2] === 255)) {
            mimetype = "image/jpeg"
          }else {
            if(p[0] === 71 && (p[1] === 73 && p[2] === 70)) {
              mimetype = "image/gif"
            }else {
              mimetype = ""
            }
          }
        }
      }
      dataurl = "data:" + mimetype + ";base64,";
      while(i < data.length) {
        dataurl += base64.convertUTF8ArrayToBase64(p.subarray(i, Math.min(i + chunksize, p.length)));
        i += chunksize
      }
      callback(null, dataurl)
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
  function remove(filename) {
    var i, entry;
    for(i = 0;i < entries.length;i += 1) {
      entry = entries[i];
      if(entry.filename === filename) {
        entries.splice(i, 1);
        return true
      }
    }
    return false
  }
  function writeEntry(entry) {
    var data = new core.ByteArrayWriter("utf8"), length = 0;
    data.appendArray([80, 75, 3, 4, 20, 0, 0, 0, 0, 0]);
    if(entry.data) {
      length = entry.data.length
    }
    data.appendUInt32LE(date2DosTime(entry.date));
    data.appendUInt32LE(entry.data ? crc32(entry.data) : 0);
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
    data.appendUInt32LE(entry.data ? crc32(entry.data) : 0);
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
    if(entry.data !== null) {
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
      var i, e, codoffset, codsize, data = new core.ByteArrayWriter("utf8"), offsets = [0];
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
  this.remove = remove;
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
        if(err || (entriesReadCallback === null || data === null)) {
          entriesReadCallback(err, zip)
        }else {
          handleCentralDirectoryEnd(data, entriesReadCallback)
        }
      })
    }
  })
};
gui.Avatar = function Avatar(parentElement, avatarInitiallyVisible) {
  var self = this, handle, image, pendingImageUrl, displayShown = "block", displayHidden = "none";
  this.setColor = function(color) {
    image.style.borderColor = color
  };
  this.setImageUrl = function(url) {
    if(self.isVisible()) {
      image.src = url
    }else {
      pendingImageUrl = url
    }
  };
  this.isVisible = function() {
    return handle.style.display === displayShown
  };
  this.show = function() {
    if(pendingImageUrl) {
      image.src = pendingImageUrl;
      pendingImageUrl = undefined
    }
    handle.style.display = displayShown
  };
  this.hide = function() {
    handle.style.display = displayHidden
  };
  this.markAsFocussed = function(isFocussed) {
    handle.className = isFocussed ? "active" : ""
  };
  this.destroy = function(callback) {
    parentElement.removeChild(handle);
    callback()
  };
  function init() {
    var document = (parentElement.ownerDocument), htmlns = document.documentElement.namespaceURI;
    handle = (document.createElementNS(htmlns, "div"));
    image = (document.createElementNS(htmlns, "img"));
    image.width = 64;
    image.height = 64;
    handle.appendChild(image);
    handle.style.width = "64px";
    handle.style.height = "70px";
    handle.style.position = "absolute";
    handle.style.top = "-80px";
    handle.style.left = "-34px";
    handle.style.display = avatarInitiallyVisible ? displayShown : displayHidden;
    parentElement.appendChild(handle)
  }
  init()
};
gui.EditInfoHandle = function EditInfoHandle(parentElement) {
  var edits = [], handle, document = (parentElement.ownerDocument), htmlns = document.documentElement.namespaceURI, editinfons = "urn:webodf:names:editinfo";
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
  this.destroy = function(callback) {
    parentElement.removeChild(handle);
    callback()
  };
  function init() {
    handle = (document.createElementNS(htmlns, "div"));
    handle.setAttribute("class", "editInfoHandle");
    handle.style.display = "none";
    parentElement.appendChild(handle)
  }
  init()
};
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
gui.KeyboardHandler = function KeyboardHandler() {
  var modifier = gui.KeyboardHandler.Modifier, defaultBinding = null, bindings = {};
  function getModifiers(e) {
    var modifiers = modifier.None;
    if(e.metaKey) {
      modifiers |= modifier.Meta
    }
    if(e.ctrlKey) {
      modifiers |= modifier.Ctrl
    }
    if(e.altKey) {
      modifiers |= modifier.Alt
    }
    if(e.shiftKey) {
      modifiers |= modifier.Shift
    }
    return modifiers
  }
  function getKeyCombo(keyCode, modifiers) {
    if(!modifiers) {
      modifiers = modifier.None
    }
    return keyCode + ":" + modifiers
  }
  this.setDefault = function(callback) {
    defaultBinding = callback
  };
  this.bind = function(keyCode, modifiers, callback) {
    var keyCombo = getKeyCombo(keyCode, modifiers);
    runtime.assert(bindings.hasOwnProperty(keyCombo) === false, "tried to overwrite the callback handler of key combo: " + keyCombo);
    bindings[keyCombo] = callback
  };
  this.unbind = function(keyCode, modifiers) {
    var keyCombo = getKeyCombo(keyCode, modifiers);
    delete bindings[keyCombo]
  };
  this.reset = function() {
    defaultBinding = null;
    bindings = {}
  };
  this.handleEvent = function(e) {
    var keyCombo = getKeyCombo(e.keyCode, getModifiers(e)), callback = bindings[keyCombo], handled = false;
    if(callback) {
      handled = callback()
    }else {
      if(defaultBinding !== null) {
        handled = defaultBinding(e)
      }
    }
    if(handled) {
      if(e.preventDefault) {
        e.preventDefault()
      }else {
        e.returnValue = false
      }
    }
  }
};
gui.KeyboardHandler.Modifier = {None:0, Meta:1, Ctrl:2, Alt:4, CtrlAlt:6, Shift:8, MetaShift:9, CtrlShift:10, AltShift:12};
gui.KeyboardHandler.KeyCode = {Backspace:8, Tab:9, Clear:12, Enter:13, End:35, Home:36, Left:37, Up:38, Right:39, Down:40, Delete:46, A:65, B:66, C:67, D:68, E:69, F:70, G:71, H:72, I:73, J:74, K:75, L:76, M:77, N:78, O:79, P:80, Q:81, R:82, S:83, T:84, U:85, V:86, W:87, X:88, Y:89, Z:90};
(function() {
  return gui.KeyboardHandler
})();
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
odf.Namespaces = {namespaceMap:{db:"urn:oasis:names:tc:opendocument:xmlns:database:1.0", dc:"http://purl.org/dc/elements/1.1/", dr3d:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0", draw:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0", chart:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0", fo:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0", form:"urn:oasis:names:tc:opendocument:xmlns:form:1.0", meta:"urn:oasis:names:tc:opendocument:xmlns:meta:1.0", number:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0", 
office:"urn:oasis:names:tc:opendocument:xmlns:office:1.0", presentation:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0", style:"urn:oasis:names:tc:opendocument:xmlns:style:1.0", svg:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0", table:"urn:oasis:names:tc:opendocument:xmlns:table:1.0", text:"urn:oasis:names:tc:opendocument:xmlns:text:1.0", xlink:"http://www.w3.org/1999/xlink", xml:"http://www.w3.org/XML/1998/namespace"}, prefixMap:{}, dbns:"urn:oasis:names:tc:opendocument:xmlns:database:1.0", 
dcns:"http://purl.org/dc/elements/1.1/", dr3dns:"urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0", drawns:"urn:oasis:names:tc:opendocument:xmlns:drawing:1.0", chartns:"urn:oasis:names:tc:opendocument:xmlns:chart:1.0", fons:"urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0", formns:"urn:oasis:names:tc:opendocument:xmlns:form:1.0", metans:"urn:oasis:names:tc:opendocument:xmlns:meta:1.0", numberns:"urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0", officens:"urn:oasis:names:tc:opendocument:xmlns:office:1.0", 
presentationns:"urn:oasis:names:tc:opendocument:xmlns:presentation:1.0", stylens:"urn:oasis:names:tc:opendocument:xmlns:style:1.0", svgns:"urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0", tablens:"urn:oasis:names:tc:opendocument:xmlns:table:1.0", textns:"urn:oasis:names:tc:opendocument:xmlns:text:1.0", xlinkns:"http://www.w3.org/1999/xlink", xmlns:"http://www.w3.org/XML/1998/namespace"};
(function() {
  var map = odf.Namespaces.namespaceMap, pmap = odf.Namespaces.prefixMap, prefix;
  for(prefix in map) {
    if(map.hasOwnProperty(prefix)) {
      pmap[map[prefix]] = prefix
    }
  }
})();
odf.Namespaces.forEachPrefix = function forEachPrefix(cb) {
  var ns = odf.Namespaces.namespaceMap, prefix;
  for(prefix in ns) {
    if(ns.hasOwnProperty(prefix)) {
      cb(prefix, ns[prefix])
    }
  }
};
odf.Namespaces.lookupNamespaceURI = function lookupNamespaceURI(prefix) {
  var r = null;
  if(odf.Namespaces.namespaceMap.hasOwnProperty(prefix)) {
    r = (odf.Namespaces.namespaceMap[prefix])
  }
  return r
};
odf.Namespaces.lookupPrefix = function lookupPrefix(namespaceURI) {
  var map = odf.Namespaces.prefixMap;
  return map.hasOwnProperty(namespaceURI) ? map[namespaceURI] : null
};
odf.Namespaces.lookupNamespaceURI.lookupNamespaceURI = odf.Namespaces.lookupNamespaceURI;
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
runtime.loadClass("odf.Namespaces");
odf.OdfUtils = function OdfUtils() {
  var textns = odf.Namespaces.textns, drawns = odf.Namespaces.drawns, whitespaceOnly = /^\s*$/, domUtils = new core.DomUtils;
  function isImage(e) {
    var name = e && e.localName;
    return name === "image" && e.namespaceURI === drawns
  }
  this.isImage = isImage;
  function isCharacterFrame(e) {
    return e !== null && (e.nodeType === Node.ELEMENT_NODE && (e.localName === "frame" && (e.namespaceURI === drawns && (e).getAttributeNS(textns, "anchor-type") === "as-char")))
  }
  this.isCharacterFrame = isCharacterFrame;
  function isAnnotation(e) {
    var name = e && e.localName;
    return name === "annotation" && e.namespaceURI === odf.Namespaces.officens
  }
  function isAnnotationWrapper(e) {
    var name = e && e.localName;
    return name === "div" && (e).className === "annotationWrapper"
  }
  function isInlineRoot(e) {
    return isAnnotation(e) || isAnnotationWrapper(e)
  }
  this.isInlineRoot = isInlineRoot;
  this.isTextSpan = function(e) {
    var name = e && e.localName;
    return name === "span" && e.namespaceURI === textns
  };
  function isParagraph(e) {
    var name = e && e.localName;
    return(name === "p" || name === "h") && e.namespaceURI === textns
  }
  this.isParagraph = isParagraph;
  function getParagraphElement(node) {
    while(node && !isParagraph(node)) {
      node = node.parentNode
    }
    return node
  }
  this.getParagraphElement = getParagraphElement;
  this.isWithinTrackedChanges = function(node, container) {
    while(node && node !== container) {
      if(node.namespaceURI === textns && node.localName === "tracked-changes") {
        return true
      }
      node = node.parentNode
    }
    return false
  };
  this.isListItem = function(e) {
    var name = e && e.localName;
    return name === "list-item" && e.namespaceURI === textns
  };
  this.isLineBreak = function(e) {
    var name = e && e.localName;
    return name === "line-break" && e.namespaceURI === textns
  };
  function isODFWhitespace(text) {
    return/^[ \t\r\n]+$/.test(text)
  }
  this.isODFWhitespace = isODFWhitespace;
  function isGroupingElement(n) {
    if(n === null || n.nodeType !== Node.ELEMENT_NODE) {
      return false
    }
    var e = (n), localName = e.localName;
    return/^(span|p|h|a|meta)$/.test(localName) && e.namespaceURI === textns || localName === "span" && e.className === "annotationHighlight"
  }
  this.isGroupingElement = isGroupingElement;
  function isCharacterElement(e) {
    var n = e && e.localName, ns, r = false;
    if(n) {
      ns = e.namespaceURI;
      if(ns === textns) {
        r = n === "s" || (n === "tab" || n === "line-break")
      }
    }
    return r
  }
  this.isCharacterElement = isCharacterElement;
  function isAnchoredAsCharacterElement(e) {
    return isCharacterElement(e) || (isCharacterFrame(e) || isInlineRoot(e))
  }
  this.isAnchoredAsCharacterElement = isAnchoredAsCharacterElement;
  function isSpaceElement(e) {
    var n = e && e.localName, ns, r = false;
    if(n) {
      ns = e.namespaceURI;
      if(ns === textns) {
        r = n === "s"
      }
    }
    return r
  }
  this.isSpaceElement = isSpaceElement;
  function firstChild(node) {
    while(node.firstChild !== null && isGroupingElement(node)) {
      node = node.firstChild
    }
    return node
  }
  this.firstChild = firstChild;
  function lastChild(node) {
    while(node.lastChild !== null && isGroupingElement(node)) {
      node = node.lastChild
    }
    return node
  }
  this.lastChild = lastChild;
  function previousNode(node) {
    while(!isParagraph(node) && node.previousSibling === null) {
      node = (node.parentNode)
    }
    return isParagraph(node) ? null : lastChild((node.previousSibling))
  }
  this.previousNode = previousNode;
  function nextNode(node) {
    while(!isParagraph(node) && node.nextSibling === null) {
      node = (node.parentNode)
    }
    return isParagraph(node) ? null : firstChild((node.nextSibling))
  }
  this.nextNode = nextNode;
  function scanLeftForNonSpace(node) {
    var r = false, text;
    while(node) {
      if(node.nodeType === Node.TEXT_NODE) {
        text = (node);
        if(text.length === 0) {
          node = previousNode(text)
        }else {
          return!isODFWhitespace(text.data.substr(text.length - 1, 1))
        }
      }else {
        if(isAnchoredAsCharacterElement(node)) {
          r = isSpaceElement(node) === false;
          node = null
        }else {
          node = previousNode(node)
        }
      }
    }
    return r
  }
  this.scanLeftForNonSpace = scanLeftForNonSpace;
  function lookLeftForCharacter(node) {
    var text, r = 0, tl = 0;
    if(node.nodeType === Node.TEXT_NODE) {
      tl = (node).length
    }
    if(tl > 0) {
      text = (node).data;
      if(!isODFWhitespace(text.substr(tl - 1, 1))) {
        r = 1
      }else {
        if(tl === 1) {
          r = scanLeftForNonSpace(previousNode(node)) ? 2 : 0
        }else {
          r = isODFWhitespace(text.substr(tl - 2, 1)) ? 0 : 2
        }
      }
    }else {
      if(isAnchoredAsCharacterElement(node)) {
        r = 1
      }
    }
    return r
  }
  this.lookLeftForCharacter = lookLeftForCharacter;
  function lookRightForCharacter(node) {
    var r = false, l = 0;
    if(node && node.nodeType === Node.TEXT_NODE) {
      l = (node).length
    }
    if(l > 0) {
      r = !isODFWhitespace((node).data.substr(0, 1))
    }else {
      if(isAnchoredAsCharacterElement(node)) {
        r = true
      }
    }
    return r
  }
  this.lookRightForCharacter = lookRightForCharacter;
  function scanLeftForAnyCharacter(node) {
    var r = false, l;
    node = node && lastChild(node);
    while(node) {
      if(node.nodeType === Node.TEXT_NODE) {
        l = (node).length
      }else {
        l = 0
      }
      if(l > 0 && !isODFWhitespace((node).data)) {
        r = true;
        break
      }
      if(isAnchoredAsCharacterElement(node)) {
        r = true;
        break
      }
      node = previousNode(node)
    }
    return r
  }
  this.scanLeftForAnyCharacter = scanLeftForAnyCharacter;
  function scanRightForAnyCharacter(node) {
    var r = false, l;
    node = node && firstChild(node);
    while(node) {
      if(node.nodeType === Node.TEXT_NODE) {
        l = (node).length
      }else {
        l = 0
      }
      if(l > 0 && !isODFWhitespace((node).data)) {
        r = true;
        break
      }
      if(isAnchoredAsCharacterElement(node)) {
        r = true;
        break
      }
      node = nextNode(node)
    }
    return r
  }
  this.scanRightForAnyCharacter = scanRightForAnyCharacter;
  function isTrailingWhitespace(textnode, offset) {
    if(!isODFWhitespace(textnode.data.substr(offset))) {
      return false
    }
    return!scanRightForAnyCharacter(nextNode(textnode))
  }
  this.isTrailingWhitespace = isTrailingWhitespace;
  function isSignificantWhitespace(textNode, offset) {
    var text = textNode.data, result;
    if(!isODFWhitespace(text[offset])) {
      return false
    }
    if(isAnchoredAsCharacterElement(textNode.parentNode)) {
      return false
    }
    if(offset > 0) {
      if(!isODFWhitespace(text[offset - 1])) {
        result = true
      }
    }else {
      if(scanLeftForNonSpace(previousNode(textNode))) {
        result = true
      }
    }
    if(result === true) {
      return isTrailingWhitespace(textNode, offset) ? false : true
    }
    return false
  }
  this.isSignificantWhitespace = isSignificantWhitespace;
  this.isDowngradableSpaceElement = function(node) {
    if(node.namespaceURI === textns && node.localName === "s") {
      return scanLeftForNonSpace(previousNode(node)) && scanRightForAnyCharacter(nextNode(node))
    }
    return false
  };
  function getFirstNonWhitespaceChild(node) {
    var child = node && node.firstChild;
    while(child && (child.nodeType === Node.TEXT_NODE && whitespaceOnly.test(child.nodeValue))) {
      child = child.nextSibling
    }
    return child
  }
  this.getFirstNonWhitespaceChild = getFirstNonWhitespaceChild;
  function parseLength(length) {
    var re = /(-?[0-9]*[0-9][0-9]*(\.[0-9]*)?|0+\.[0-9]*[1-9][0-9]*|\.[0-9]*[1-9][0-9]*)((cm)|(mm)|(in)|(pt)|(pc)|(px)|(%))/, m = re.exec(length);
    if(!m) {
      return null
    }
    return{value:parseFloat(m[1]), unit:m[3]}
  }
  this.parseLength = parseLength;
  function parsePositiveLength(length) {
    var result = parseLength(length);
    if(result && (result.value <= 0 || result.unit === "%")) {
      return null
    }
    return result
  }
  function parseNonNegativeLength(length) {
    var result = parseLength(length);
    if(result && (result.value < 0 || result.unit === "%")) {
      return null
    }
    return result
  }
  this.parseNonNegativeLength = parseNonNegativeLength;
  function parsePercentage(length) {
    var result = parseLength(length);
    if(result && result.unit !== "%") {
      return null
    }
    return result
  }
  function parseFoFontSize(fontSize) {
    return parsePositiveLength(fontSize) || parsePercentage(fontSize)
  }
  this.parseFoFontSize = parseFoFontSize;
  function parseFoLineHeight(lineHeight) {
    return parseNonNegativeLength(lineHeight) || parsePercentage(lineHeight)
  }
  this.parseFoLineHeight = parseFoLineHeight;
  function item(a, i) {
    return a[i]
  }
  function getImpactedParagraphs(range) {
    var i, l, e, outerContainer = (range.commonAncestorContainer), impactedParagraphs = [], filtered = [];
    if(outerContainer.nodeType === Node.ELEMENT_NODE) {
      impactedParagraphs = domUtils.getElementsByTagNameNS(outerContainer, textns, "p").concat(domUtils.getElementsByTagNameNS(outerContainer, textns, "h"))
    }
    while(outerContainer && !isParagraph(outerContainer)) {
      outerContainer = outerContainer.parentNode
    }
    if(outerContainer) {
      impactedParagraphs.push(outerContainer)
    }
    l = impactedParagraphs.length;
    for(i = 0;i < l;i += 1) {
      e = item(impactedParagraphs, i);
      if(domUtils.rangeIntersectsNode(range, e)) {
        filtered.push(e)
      }
    }
    return filtered
  }
  this.getImpactedParagraphs = getImpactedParagraphs;
  function isAcceptedNode(node) {
    switch(node.namespaceURI) {
      case odf.Namespaces.drawns:
      ;
      case odf.Namespaces.svgns:
      ;
      case odf.Namespaces.dr3dns:
        return false;
      case odf.Namespaces.textns:
        switch(node.localName) {
          case "note-body":
          ;
          case "ruby-text":
            return false
        }
        break;
      case odf.Namespaces.officens:
        switch(node.localName) {
          case "annotation":
          ;
          case "binary-data":
          ;
          case "event-listeners":
            return false
        }
        break;
      default:
        switch(node.localName) {
          case "editinfo":
            return false
        }
        break
    }
    return true
  }
  function isSignificantTextContent(textNode) {
    return Boolean(getParagraphElement(textNode) && (!isODFWhitespace(textNode.textContent) || isSignificantWhitespace(textNode, 0)))
  }
  function includeNode(range, nodeRange, includePartial) {
    return includePartial && domUtils.rangesIntersect(range, nodeRange) || domUtils.containsRange(range, nodeRange)
  }
  function getTextNodes(range, includePartial) {
    var document = range.startContainer.ownerDocument, nodeRange = document.createRange(), textNodes;
    function nodeFilter(node) {
      nodeRange.selectNodeContents(node);
      if(node.nodeType === Node.TEXT_NODE) {
        if(includeNode(range, nodeRange, includePartial)) {
          return isSignificantTextContent((node)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
        }
      }else {
        if(domUtils.rangesIntersect(range, nodeRange)) {
          if(isAcceptedNode(node)) {
            return NodeFilter.FILTER_SKIP
          }
        }
      }
      return NodeFilter.FILTER_REJECT
    }
    textNodes = domUtils.getNodesInRange(range, nodeFilter);
    nodeRange.detach();
    return textNodes
  }
  this.getTextNodes = getTextNodes;
  this.getTextElements = function(range, includePartial, includeInsignificantWhitespace) {
    var document = range.startContainer.ownerDocument, nodeRange = document.createRange(), elements;
    function nodeFilter(node) {
      nodeRange.selectNodeContents(node);
      if(isCharacterElement(node.parentNode)) {
        return NodeFilter.FILTER_REJECT
      }
      if(node.nodeType === Node.TEXT_NODE) {
        if(includeNode(range, nodeRange, includePartial)) {
          if(includeInsignificantWhitespace || isSignificantTextContent((node))) {
            return NodeFilter.FILTER_ACCEPT
          }
        }
      }else {
        if(isAnchoredAsCharacterElement(node)) {
          if(includeNode(range, nodeRange, includePartial)) {
            return NodeFilter.FILTER_ACCEPT
          }
        }else {
          if(isAcceptedNode(node) || isGroupingElement(node)) {
            return NodeFilter.FILTER_SKIP
          }
        }
      }
      return NodeFilter.FILTER_REJECT
    }
    elements = domUtils.getNodesInRange(range, nodeFilter);
    nodeRange.detach();
    return elements
  };
  this.getParagraphElements = function(range) {
    var document = range.startContainer.ownerDocument, nodeRange = document.createRange(), elements;
    function nodeFilter(node) {
      nodeRange.selectNodeContents(node);
      if(isParagraph(node)) {
        if(domUtils.rangesIntersect(range, nodeRange)) {
          return NodeFilter.FILTER_ACCEPT
        }
      }else {
        if(isAcceptedNode(node) || isGroupingElement(node)) {
          return NodeFilter.FILTER_SKIP
        }
      }
      return NodeFilter.FILTER_REJECT
    }
    elements = domUtils.getNodesInRange(range, nodeFilter);
    nodeRange.detach();
    return elements
  };
  this.getImageElements = function(range) {
    var document = range.startContainer.ownerDocument, nodeRange = document.createRange(), elements;
    function nodeFilter(node) {
      nodeRange.selectNodeContents(node);
      if(isImage(node) && domUtils.containsRange(range, nodeRange)) {
        return NodeFilter.FILTER_ACCEPT
      }
      return NodeFilter.FILTER_SKIP
    }
    elements = domUtils.getNodesInRange(range, nodeFilter);
    nodeRange.detach();
    return elements
  }
};
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
ops.Server = function Server() {
};
ops.Server.prototype.connect = function(timeout, cb) {
};
ops.Server.prototype.networkStatus = function() {
};
ops.Server.prototype.login = function(login, password, successCb, failCb) {
};
ops.Server.prototype.joinSession = function(userId, sessionId, successCb, failCb) {
};
ops.Server.prototype.leaveSession = function(sessionId, memberId, successCb, failCb) {
};
ops.Server.prototype.getGenesisUrl = function(sessionId) {
};
xmldom.LSSerializerFilter = function LSSerializerFilter() {
};
xmldom.LSSerializerFilter.prototype.acceptNode = function(node) {
};
xmldom.XPathIterator = function XPathIterator() {
};
xmldom.XPathIterator.prototype.next = function() {
};
xmldom.XPathIterator.prototype.reset = function() {
};
xmldom.XPathAtom;
function createXPathSingleton() {
  var createXPathPathIterator, parsePredicates;
  function isSmallestPositive(a, b, c) {
    return a !== -1 && ((a < b || b === -1) && (a < c || c === -1))
  }
  function parseXPathStep(xpath, pos, end, steps) {
    var location = "", predicates = [], brapos = xpath.indexOf("[", pos), slapos = xpath.indexOf("/", pos), eqpos = xpath.indexOf("=", pos);
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
          }catch(ignore) {
          }
        }
        p = end
      }
    }
    return{steps:steps, value:value}
  }
  parsePredicates = function parsePredicates(xpath, start, predicates) {
    var pos = start, l = xpath.length, depth = 0;
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
  function XPathNodeIterator() {
    var node = null, done = false;
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
      var node = it.next();
      while(node) {
        if(node.nodeType === Node.ELEMENT_NODE) {
          node = (node).getAttributeNodeNS(namespace, localName)
        }
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
        if(node && node.nodeType === Node.ELEMENT_NODE) {
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
        return pit.next() !== null
      })
    }
    return new ConditionIterator(it, function(node) {
      nit.setNode(node);
      pit.reset();
      var n = pit.next();
      return n ? n.nodeValue === value : false
    })
  }
  function item(p, i) {
    return p[i]
  }
  createXPathPathIterator = function createXPathPathIterator(it, xpath, namespaceResolver) {
    var i, j, step, location, s, p, ns;
    for(i = 0;i < xpath.steps.length;i += 1) {
      step = xpath.steps[i];
      location = step.location;
      if(location === "") {
        it = new AllChildElementIterator(it, false)
      }else {
        if(location[0] === "@") {
          s = location.substr(1).split(":", 2);
          ns = namespaceResolver(s[0]);
          if(!ns) {
            throw"No namespace associated with the prefix " + s[0];
          }
          it = new AttributeIterator(it, ns, s[1])
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
        p = item(step.predicates, j);
        it = createPredicateFilteredIterator(it, p, namespaceResolver)
      }
    }
    return it
  };
  function fallback(node, xpath, namespaceResolver) {
    var it = new XPathNodeIterator, i, nodelist, parsedXPath;
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
    if(!doc || typeof doc.evaluate !== "function") {
      elements = fallback(node, xpath, namespaceResolver)
    }else {
      nodes = doc.evaluate(xpath, node, namespaceResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
      n = nodes.iterateNext();
      while(n !== null) {
        if(n.nodeType === Node.ELEMENT_NODE) {
          elements.push(n)
        }
        n = nodes.iterateNext()
      }
    }
    return elements
  }
  return{getODFElementsWithXPath:getODFElementsWithXPath}
}
xmldom.XPath = createXPathSingleton();
runtime.loadClass("core.DomUtils");
core.Cursor = function Cursor(document, memberId) {
  var cursorns = "urn:webodf:names:cursor", cursorNode = document.createElementNS(cursorns, "cursor"), anchorNode = document.createElementNS(cursorns, "anchor"), forwardSelection, recentlyModifiedNodes = [], selectedRange = (document.createRange()), isCollapsed, domUtils = new core.DomUtils;
  function putIntoTextNode(node, container, offset) {
    runtime.assert(Boolean(container), "putCursorIntoTextNode: invalid container");
    var parent = container.parentNode;
    runtime.assert(Boolean(parent), "putCursorIntoTextNode: container without parent");
    runtime.assert(offset >= 0 && offset <= container.length, "putCursorIntoTextNode: offset is out of bounds");
    if(offset === 0) {
      parent.insertBefore(node, container)
    }else {
      if(offset === container.length) {
        parent.insertBefore(node, container.nextSibling)
      }else {
        container.splitText(offset);
        parent.insertBefore(node, container.nextSibling)
      }
    }
  }
  function removeNode(node) {
    if(node.parentNode) {
      recentlyModifiedNodes.push(node.previousSibling);
      recentlyModifiedNodes.push(node.nextSibling);
      node.parentNode.removeChild(node)
    }
  }
  function putNode(node, container, offset) {
    if(container.nodeType === Node.TEXT_NODE) {
      putIntoTextNode(node, (container), offset)
    }else {
      if(container.nodeType === Node.ELEMENT_NODE) {
        container.insertBefore(node, container.childNodes.item(offset))
      }
    }
    recentlyModifiedNodes.push(node.previousSibling);
    recentlyModifiedNodes.push(node.nextSibling)
  }
  function getStartNode() {
    return forwardSelection ? anchorNode : cursorNode
  }
  function getEndNode() {
    return forwardSelection ? cursorNode : anchorNode
  }
  this.getNode = function() {
    return cursorNode
  };
  this.getAnchorNode = function() {
    return anchorNode.parentNode ? anchorNode : cursorNode
  };
  this.getSelectedRange = function() {
    if(isCollapsed) {
      selectedRange.setStartBefore(cursorNode);
      selectedRange.collapse(true)
    }else {
      selectedRange.setStartAfter(getStartNode());
      selectedRange.setEndBefore(getEndNode())
    }
    return selectedRange
  };
  this.setSelectedRange = function(range, isForwardSelection) {
    if(selectedRange && selectedRange !== range) {
      selectedRange.detach()
    }
    selectedRange = range;
    forwardSelection = isForwardSelection !== false;
    isCollapsed = range.collapsed;
    if(range.collapsed) {
      removeNode(anchorNode);
      removeNode(cursorNode);
      putNode(cursorNode, (range.startContainer), range.startOffset)
    }else {
      removeNode(anchorNode);
      removeNode(cursorNode);
      putNode(getEndNode(), (range.endContainer), range.endOffset);
      putNode(getStartNode(), (range.startContainer), range.startOffset)
    }
    recentlyModifiedNodes.forEach(domUtils.normalizeTextNodes);
    recentlyModifiedNodes.length = 0
  };
  this.hasForwardSelection = function() {
    return forwardSelection
  };
  this.remove = function() {
    removeNode(cursorNode);
    recentlyModifiedNodes.forEach(domUtils.normalizeTextNodes);
    recentlyModifiedNodes.length = 0
  };
  function init() {
    cursorNode.setAttributeNS(cursorns, "memberId", memberId);
    anchorNode.setAttributeNS(cursorns, "memberId", memberId)
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
runtime.loadClass("core.PositionFilter");
core.PositionFilterChain = function PositionFilterChain() {
  var filterChain = {}, FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT, FILTER_REJECT = core.PositionFilter.FilterResult.FILTER_REJECT;
  this.acceptPosition = function(iterator) {
    var filterName;
    for(filterName in filterChain) {
      if(filterChain.hasOwnProperty(filterName)) {
        if(filterChain[filterName].acceptPosition(iterator) === FILTER_REJECT) {
          return FILTER_REJECT
        }
      }
    }
    return FILTER_ACCEPT
  };
  this.addFilter = function(filterName, filterInstance) {
    filterChain[filterName] = filterInstance
  };
  this.removeFilter = function(filterName) {
    delete filterChain[filterName]
  }
};
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
gui.AnnotatableCanvas = function AnnotatableCanvas() {
};
gui.AnnotatableCanvas.prototype.refreshSize = function() {
};
gui.AnnotatableCanvas.prototype.getZoomLevel = function() {
};
gui.AnnotatableCanvas.prototype.getSizer = function() {
};
gui.AnnotationViewManager = function AnnotationViewManager(canvas, odfFragment, annotationsPane) {
  var annotations = [], doc = odfFragment.ownerDocument, odfUtils = new odf.OdfUtils, CONNECTOR_MARGIN = 30, NOTE_MARGIN = 20, window = runtime.getWindow();
  runtime.assert(Boolean(window), "Expected to be run in an environment which has a global window, like a browser.");
  function wrapAnnotation(annotation) {
    var annotationWrapper = doc.createElement("div"), annotationNote = doc.createElement("div"), connectorHorizontal = doc.createElement("div"), connectorAngular = doc.createElement("div"), removeButton = doc.createElement("div"), annotationNode = annotation.node;
    annotationWrapper.className = "annotationWrapper";
    annotationNode.parentNode.insertBefore(annotationWrapper, annotationNode);
    annotationNote.className = "annotationNote";
    annotationNote.appendChild(annotationNode);
    removeButton.className = "annotationRemoveButton";
    annotationNote.appendChild(removeButton);
    connectorHorizontal.className = "annotationConnector horizontal";
    connectorAngular.className = "annotationConnector angular";
    annotationWrapper.appendChild(annotationNote);
    annotationWrapper.appendChild(connectorHorizontal);
    annotationWrapper.appendChild(connectorAngular)
  }
  function unwrapAnnotation(annotation) {
    var annotationNode = annotation.node, annotationWrapper = annotationNode.parentNode.parentNode;
    if(annotationWrapper.localName === "div") {
      annotationWrapper.parentNode.insertBefore(annotationNode, annotationWrapper);
      annotationWrapper.parentNode.removeChild(annotationWrapper)
    }
  }
  function highlightAnnotation(annotation) {
    var annotationNode = annotation.node, annotationEnd = annotation.end, range = doc.createRange(), textNodes;
    if(annotationEnd) {
      range.setStart(annotationNode, annotationNode.childNodes.length);
      range.setEnd(annotationEnd, 0);
      textNodes = odfUtils.getTextNodes(range, false);
      textNodes.forEach(function(n) {
        var container = doc.createElement("span"), v = annotationNode.getAttributeNS(odf.Namespaces.officens, "name");
        container.className = "annotationHighlight";
        container.setAttribute("annotation", v);
        n.parentNode.insertBefore(container, n);
        container.appendChild(n)
      })
    }
    range.detach()
  }
  function unhighlightAnnotation(annotation) {
    var annotationName = annotation.node.getAttributeNS(odf.Namespaces.officens, "name"), highlightSpans = doc.querySelectorAll('span.annotationHighlight[annotation="' + annotationName + '"]'), i, container;
    for(i = 0;i < highlightSpans.length;i += 1) {
      container = highlightSpans.item(i);
      while(container.firstChild) {
        container.parentNode.insertBefore(container.firstChild, container)
      }
      container.parentNode.removeChild(container)
    }
  }
  function lineDistance(point1, point2) {
    var xs = 0, ys = 0;
    xs = point2.x - point1.x;
    xs = xs * xs;
    ys = point2.y - point1.y;
    ys = ys * ys;
    return Math.sqrt(xs + ys)
  }
  function renderAnnotation(annotation) {
    var annotationNote = annotation.node.parentElement, connectorHorizontal = annotationNote.nextElementSibling, connectorAngular = connectorHorizontal.nextElementSibling, annotationWrapper = annotationNote.parentElement, connectorAngle = 0, previousAnnotation = annotations[annotations.indexOf(annotation) - 1], previousRect, zoomLevel = canvas.getZoomLevel();
    annotationNote.style.left = (annotationsPane.getBoundingClientRect().left - annotationWrapper.getBoundingClientRect().left) / zoomLevel + "px";
    annotationNote.style.width = annotationsPane.getBoundingClientRect().width / zoomLevel + "px";
    connectorHorizontal.style.width = parseFloat(annotationNote.style.left) - CONNECTOR_MARGIN + "px";
    if(previousAnnotation) {
      previousRect = previousAnnotation.node.parentElement.getBoundingClientRect();
      if((annotationWrapper.getBoundingClientRect().top - previousRect.bottom) / zoomLevel <= NOTE_MARGIN) {
        annotationNote.style.top = Math.abs(annotationWrapper.getBoundingClientRect().top - previousRect.bottom) / zoomLevel + NOTE_MARGIN + "px"
      }else {
        annotationNote.style.top = "0px"
      }
    }
    connectorAngular.style.left = connectorHorizontal.getBoundingClientRect().width / zoomLevel + "px";
    connectorAngular.style.width = lineDistance({x:connectorAngular.getBoundingClientRect().left / zoomLevel, y:connectorAngular.getBoundingClientRect().top / zoomLevel}, {x:annotationNote.getBoundingClientRect().left / zoomLevel, y:annotationNote.getBoundingClientRect().top / zoomLevel}) + "px";
    connectorAngle = Math.asin((annotationNote.getBoundingClientRect().top - connectorAngular.getBoundingClientRect().top) / (zoomLevel * parseFloat(connectorAngular.style.width)));
    connectorAngular.style.transform = "rotate(" + connectorAngle + "rad)";
    connectorAngular.style.MozTransform = "rotate(" + connectorAngle + "rad)";
    connectorAngular.style.WebkitTransform = "rotate(" + connectorAngle + "rad)";
    connectorAngular.style.msTransform = "rotate(" + connectorAngle + "rad)"
  }
  function showAnnotationsPane(show) {
    var sizer = canvas.getSizer();
    if(show) {
      annotationsPane.style.display = "inline-block";
      sizer.style.paddingRight = window.getComputedStyle(annotationsPane).width
    }else {
      annotationsPane.style.display = "none";
      sizer.style.paddingRight = 0
    }
    canvas.refreshSize()
  }
  function sortAnnotations() {
    annotations.sort(function(a, b) {
      if(a.node.compareDocumentPosition(b.node) === Node.DOCUMENT_POSITION_FOLLOWING) {
        return-1
      }
      return 1
    })
  }
  function rerenderAnnotations() {
    var i;
    for(i = 0;i < annotations.length;i += 1) {
      renderAnnotation(annotations[i])
    }
  }
  this.rerenderAnnotations = rerenderAnnotations;
  function addAnnotation(annotation) {
    showAnnotationsPane(true);
    annotations.push({node:annotation.node, end:annotation.end});
    sortAnnotations();
    wrapAnnotation(annotation);
    if(annotation.end) {
      highlightAnnotation(annotation)
    }
    rerenderAnnotations()
  }
  this.addAnnotation = addAnnotation;
  function forgetAnnotation(annotation) {
    var index = annotations.indexOf(annotation);
    unwrapAnnotation(annotation);
    unhighlightAnnotation(annotation);
    if(index !== -1) {
      annotations.splice(index, 1)
    }
    if(annotations.length === 0) {
      showAnnotationsPane(false)
    }
  }
  function forgetAnnotations() {
    while(annotations.length) {
      forgetAnnotation(annotations[0])
    }
  }
  this.forgetAnnotations = forgetAnnotations
};
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
runtime.loadClass("core.Cursor");
runtime.loadClass("core.DomUtils");
runtime.loadClass("core.PositionIterator");
runtime.loadClass("core.PositionFilter");
runtime.loadClass("core.LoopWatchDog");
runtime.loadClass("odf.OdfUtils");
gui.SelectionMover = function SelectionMover(cursor, rootNode) {
  var odfUtils = new odf.OdfUtils, domUtils = new core.DomUtils, positionIterator, cachedXOffset, timeoutHandle, FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT;
  function getIteratorAtCursor() {
    positionIterator.setUnfilteredPosition(cursor.getNode(), 0);
    return positionIterator
  }
  function getMaximumNodePosition(node) {
    return node.nodeType === Node.TEXT_NODE ? node.textContent.length : node.childNodes.length
  }
  function getClientRect(clientRectangles, useRightEdge) {
    var rectangle, simplifiedRectangle = null;
    if(clientRectangles && clientRectangles.length > 0) {
      rectangle = useRightEdge ? clientRectangles.item(clientRectangles.length - 1) : clientRectangles.item(0)
    }
    if(rectangle) {
      simplifiedRectangle = {top:rectangle.top, left:useRightEdge ? rectangle.right : rectangle.left, bottom:rectangle.bottom}
    }
    return simplifiedRectangle
  }
  function getVisibleRect(container, offset, range, useRightEdge) {
    var rectangle, nodeType = container.nodeType;
    range.setStart(container, offset);
    range.collapse(!useRightEdge);
    rectangle = getClientRect(range.getClientRects(), useRightEdge === true);
    if(!rectangle && offset > 0) {
      range.setStart(container, offset - 1);
      range.setEnd(container, offset);
      rectangle = getClientRect(range.getClientRects(), true)
    }
    if(!rectangle) {
      if(nodeType === Node.ELEMENT_NODE && (offset > 0 && (container).childNodes.length >= offset)) {
        rectangle = getVisibleRect(container, offset - 1, range, true)
      }else {
        if(container.nodeType === Node.TEXT_NODE && offset > 0) {
          rectangle = getVisibleRect(container, offset - 1, range, true)
        }else {
          if(container.previousSibling) {
            rectangle = getVisibleRect(container.previousSibling, getMaximumNodePosition(container.previousSibling), range, true)
          }else {
            if(container.parentNode && container.parentNode !== rootNode) {
              rectangle = getVisibleRect(container.parentNode, 0, range, false)
            }else {
              range.selectNode(rootNode);
              rectangle = getClientRect(range.getClientRects(), false)
            }
          }
        }
      }
    }
    runtime.assert(Boolean(rectangle), "No visible rectangle found");
    return(rectangle)
  }
  function doMove(positions, extend, move) {
    var left = positions, iterator = getIteratorAtCursor(), initialRect, range = (rootNode.ownerDocument.createRange()), selectionRange = cursor.getSelectedRange().cloneRange(), newRect, horizontalMovement, o, c, isForwardSelection;
    initialRect = getVisibleRect(iterator.container(), iterator.unfilteredDomOffset(), range);
    while(left > 0 && move()) {
      left -= 1
    }
    if(extend) {
      c = iterator.container();
      o = iterator.unfilteredDomOffset();
      if(domUtils.comparePoints((selectionRange.startContainer), selectionRange.startOffset, c, o) === -1) {
        selectionRange.setStart(c, o);
        isForwardSelection = false
      }else {
        selectionRange.setEnd(c, o)
      }
    }else {
      selectionRange.setStart(iterator.container(), iterator.unfilteredDomOffset());
      selectionRange.collapse(true)
    }
    cursor.setSelectedRange(selectionRange, isForwardSelection);
    iterator = getIteratorAtCursor();
    newRect = getVisibleRect(iterator.container(), iterator.unfilteredDomOffset(), range);
    horizontalMovement = newRect.top === initialRect.top ? true : false;
    if(horizontalMovement || cachedXOffset === undefined) {
      cachedXOffset = newRect.left
    }
    runtime.clearTimeout(timeoutHandle);
    timeoutHandle = runtime.setTimeout(function() {
      cachedXOffset = undefined
    }, 2E3);
    range.detach();
    return positions - left
  }
  this.movePointForward = function(positions, extend) {
    return doMove(positions, extend || false, positionIterator.nextPosition)
  };
  this.movePointBackward = function(positions, extend) {
    return doMove(positions, extend || false, positionIterator.previousPosition)
  };
  function isPositionWalkable(filter) {
    var iterator = getIteratorAtCursor();
    if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
      iterator.setUnfilteredPosition(cursor.getAnchorNode(), 0);
      if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
        return true
      }
    }
    return false
  }
  function countSteps(iterator, steps, filter) {
    var watch = new core.LoopWatchDog(1E4), positions = 0, positionsCount = 0, increment = steps >= 0 ? 1 : -1, delegate = (steps >= 0 ? iterator.nextPosition : iterator.previousPosition);
    while(steps !== 0 && delegate()) {
      watch.check();
      positionsCount += increment;
      if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
        steps -= increment;
        positions += positionsCount;
        positionsCount = 0
      }
    }
    return positions
  }
  function convertForwardStepsBetweenFilters(stepsFilter1, filter1, filter2) {
    var iterator = getIteratorAtCursor(), watch = new core.LoopWatchDog(1E4), pendingStepsFilter2 = 0, stepsFilter2 = 0;
    while(stepsFilter1 > 0 && iterator.nextPosition()) {
      watch.check();
      if(filter2.acceptPosition(iterator) === FILTER_ACCEPT) {
        pendingStepsFilter2 += 1;
        if(filter1.acceptPosition(iterator) === FILTER_ACCEPT) {
          stepsFilter2 += pendingStepsFilter2;
          pendingStepsFilter2 = 0;
          stepsFilter1 -= 1
        }
      }
    }
    return stepsFilter2
  }
  function convertBackwardStepsBetweenFilters(stepsFilter1, filter1, filter2) {
    var iterator = getIteratorAtCursor(), watch = new core.LoopWatchDog(1E4), pendingStepsFilter2 = 0, stepsFilter2 = 0;
    while(stepsFilter1 > 0 && iterator.previousPosition()) {
      watch.check();
      if(filter2.acceptPosition(iterator) === FILTER_ACCEPT) {
        pendingStepsFilter2 += 1;
        if(filter1.acceptPosition(iterator) === FILTER_ACCEPT) {
          stepsFilter2 += pendingStepsFilter2;
          pendingStepsFilter2 = 0;
          stepsFilter1 -= 1
        }
      }
    }
    return stepsFilter2
  }
  function countStepsPublic(steps, filter) {
    var iterator = getIteratorAtCursor();
    return countSteps(iterator, steps, filter)
  }
  function countPositionsToClosestStep(container, offset, filter) {
    var iterator = getIteratorAtCursor(), paragraphNode = odfUtils.getParagraphElement(iterator.getCurrentNode()), count = 0;
    iterator.setUnfilteredPosition(container, offset);
    if(filter.acceptPosition(iterator) !== FILTER_ACCEPT) {
      count = countSteps(iterator, -1, filter);
      if(count === 0 || paragraphNode && paragraphNode !== odfUtils.getParagraphElement(iterator.getCurrentNode())) {
        iterator.setUnfilteredPosition(container, offset);
        count = countSteps(iterator, 1, filter)
      }
    }
    return count
  }
  function countLineSteps(filter, direction, iterator) {
    var c = iterator.container(), steps = 0, bestContainer = null, bestOffset, bestXDiff = 10, xDiff, bestCount = 0, top, left, lastTop, rect, range = (rootNode.ownerDocument.createRange()), watch = new core.LoopWatchDog(1E4);
    rect = getVisibleRect(c, iterator.unfilteredDomOffset(), range);
    top = rect.top;
    if(cachedXOffset === undefined) {
      left = rect.left
    }else {
      left = cachedXOffset
    }
    lastTop = top;
    while((direction < 0 ? iterator.previousPosition() : iterator.nextPosition()) === true) {
      watch.check();
      if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
        steps += 1;
        c = iterator.container();
        rect = getVisibleRect(c, iterator.unfilteredDomOffset(), range);
        if(rect.top !== top) {
          if(rect.top !== lastTop && lastTop !== top) {
            break
          }
          lastTop = rect.top;
          xDiff = Math.abs(left - rect.left);
          if(bestContainer === null || xDiff < bestXDiff) {
            bestContainer = c;
            bestOffset = iterator.unfilteredDomOffset();
            bestXDiff = xDiff;
            bestCount = steps
          }
        }
      }
    }
    if(bestContainer !== null) {
      iterator.setUnfilteredPosition(bestContainer, (bestOffset));
      steps = bestCount
    }else {
      steps = 0
    }
    range.detach();
    return steps
  }
  function countLinesSteps(lines, filter) {
    var iterator = getIteratorAtCursor(), stepCount = 0, steps = 0, direction = lines < 0 ? -1 : 1;
    lines = Math.abs(lines);
    while(lines > 0) {
      stepCount += countLineSteps(filter, direction, iterator);
      if(stepCount === 0) {
        break
      }
      steps += stepCount;
      lines -= 1
    }
    return steps * direction
  }
  function countStepsToLineBoundary(direction, filter) {
    var fnNextPos, increment, lastRect, rect, onSameLine, iterator = getIteratorAtCursor(), paragraphNode = odfUtils.getParagraphElement(iterator.getCurrentNode()), steps = 0, range = (rootNode.ownerDocument.createRange());
    if(direction < 0) {
      fnNextPos = iterator.previousPosition;
      increment = -1
    }else {
      fnNextPos = iterator.nextPosition;
      increment = 1
    }
    lastRect = getVisibleRect(iterator.container(), iterator.unfilteredDomOffset(), range);
    while(fnNextPos.call(iterator)) {
      if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
        if(odfUtils.getParagraphElement(iterator.getCurrentNode()) !== paragraphNode) {
          break
        }
        rect = getVisibleRect(iterator.container(), iterator.unfilteredDomOffset(), range);
        if(rect.bottom !== lastRect.bottom) {
          onSameLine = rect.top >= lastRect.top && rect.bottom < lastRect.bottom || rect.top <= lastRect.top && rect.bottom > lastRect.bottom;
          if(!onSameLine) {
            break
          }
        }
        steps += increment;
        lastRect = rect
      }
    }
    range.detach();
    return steps
  }
  function countStepsToPosition(targetNode, targetOffset, filter) {
    runtime.assert(targetNode !== null, "SelectionMover.countStepsToPosition called with element===null");
    var iterator = getIteratorAtCursor(), c = iterator.container(), o = iterator.unfilteredDomOffset(), steps = 0, watch = new core.LoopWatchDog(1E4), comparison;
    iterator.setUnfilteredPosition(targetNode, targetOffset);
    while(filter.acceptPosition(iterator) !== FILTER_ACCEPT && iterator.previousPosition()) {
      watch.check()
    }
    targetNode = iterator.container();
    runtime.assert(Boolean(targetNode), "SelectionMover.countStepsToPosition: positionIterator.container() returned null");
    targetOffset = iterator.unfilteredDomOffset();
    iterator.setUnfilteredPosition(c, o);
    while(filter.acceptPosition(iterator) !== FILTER_ACCEPT && iterator.previousPosition()) {
      watch.check()
    }
    comparison = domUtils.comparePoints(targetNode, targetOffset, iterator.container(), iterator.unfilteredDomOffset());
    if(comparison < 0) {
      while(iterator.nextPosition()) {
        watch.check();
        if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
          steps += 1
        }
        if(iterator.container() === targetNode && iterator.unfilteredDomOffset() === targetOffset) {
          return steps
        }
      }
    }else {
      if(comparison > 0) {
        while(iterator.previousPosition()) {
          watch.check();
          if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
            steps -= 1;
            if(iterator.container() === targetNode && iterator.unfilteredDomOffset() === targetOffset) {
              break
            }
          }
        }
      }
    }
    return steps
  }
  this.getStepCounter = function() {
    return{countSteps:countStepsPublic, convertForwardStepsBetweenFilters:convertForwardStepsBetweenFilters, convertBackwardStepsBetweenFilters:convertBackwardStepsBetweenFilters, countLinesSteps:countLinesSteps, countStepsToLineBoundary:countStepsToLineBoundary, countStepsToPosition:countStepsToPosition, isPositionWalkable:isPositionWalkable, countPositionsToNearestStep:countPositionsToClosestStep}
  };
  function init() {
    positionIterator = gui.SelectionMover.createPositionIterator(rootNode);
    var range = rootNode.ownerDocument.createRange();
    range.setStart(positionIterator.container(), positionIterator.unfilteredDomOffset());
    range.collapse(true);
    cursor.setSelectedRange(range)
  }
  init()
};
gui.SelectionMover.createPositionIterator = function(rootNode) {
  function CursorFilter() {
    this.acceptNode = function(node) {
      if(!node || (node.namespaceURI === "urn:webodf:names:cursor" || node.namespaceURI === "urn:webodf:names:editinfo")) {
        return NodeFilter.FILTER_REJECT
      }
      return NodeFilter.FILTER_ACCEPT
    }
  }
  var filter = new CursorFilter;
  return new core.PositionIterator(rootNode, 5, filter, false)
};
(function() {
  return gui.SelectionMover
})();
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
odf.OdfNodeFilter = function OdfNodeFilter() {
  this.acceptNode = function(node) {
    var result;
    if(node.namespaceURI === "http://www.w3.org/1999/xhtml") {
      result = NodeFilter.FILTER_SKIP
    }else {
      if(node.namespaceURI && node.namespaceURI.match(/^urn:webodf:/)) {
        result = NodeFilter.FILTER_REJECT
      }else {
        result = NodeFilter.FILTER_ACCEPT
      }
    }
    return result
  }
};
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
runtime.loadClass("odf.OdfUtils");
runtime.loadClass("xmldom.XPath");
runtime.loadClass("core.CSSUnits");
odf.StyleTreeNode = function StyleTreeNode(element) {
  this.derivedStyles = {};
  this.element = element
};
odf.Style2CSS = function Style2CSS() {
  var drawns = odf.Namespaces.drawns, fons = odf.Namespaces.fons, officens = odf.Namespaces.officens, stylens = odf.Namespaces.stylens, svgns = odf.Namespaces.svgns, tablens = odf.Namespaces.tablens, textns = odf.Namespaces.textns, xlinkns = odf.Namespaces.xlinkns, presentationns = odf.Namespaces.presentationns, familynamespaceprefixes = {"graphic":"draw", "drawing-page":"draw", "paragraph":"text", "presentation":"presentation", "ruby":"text", "section":"text", "table":"table", "table-cell":"table", 
  "table-column":"table", "table-row":"table", "text":"text", "list":"text", "page":"office"}, familytagnames = {"graphic":["circle", "connected", "control", "custom-shape", "ellipse", "frame", "g", "line", "measure", "page", "page-thumbnail", "path", "polygon", "polyline", "rect", "regular-polygon"], "paragraph":["alphabetical-index-entry-template", "h", "illustration-index-entry-template", "index-source-style", "object-index-entry-template", "p", "table-index-entry-template", "table-of-content-entry-template", 
  "user-index-entry-template"], "presentation":["caption", "circle", "connector", "control", "custom-shape", "ellipse", "frame", "g", "line", "measure", "page-thumbnail", "path", "polygon", "polyline", "rect", "regular-polygon"], "drawing-page":["caption", "circle", "connector", "control", "page", "custom-shape", "ellipse", "frame", "g", "line", "measure", "page-thumbnail", "path", "polygon", "polyline", "rect", "regular-polygon"], "ruby":["ruby", "ruby-text"], "section":["alphabetical-index", "bibliography", 
  "illustration-index", "index-title", "object-index", "section", "table-of-content", "table-index", "user-index"], "table":["background", "table"], "table-cell":["body", "covered-table-cell", "even-columns", "even-rows", "first-column", "first-row", "last-column", "last-row", "odd-columns", "odd-rows", "table-cell"], "table-column":["table-column"], "table-row":["table-row"], "text":["a", "index-entry-chapter", "index-entry-link-end", "index-entry-link-start", "index-entry-page-number", "index-entry-span", 
  "index-entry-tab-stop", "index-entry-text", "index-title-template", "linenumbering-configuration", "list-level-style-number", "list-level-style-bullet", "outline-level-style", "span"], "list":["list-item"]}, textPropertySimpleMapping = [[fons, "color", "color"], [fons, "background-color", "background-color"], [fons, "font-weight", "font-weight"], [fons, "font-style", "font-style"]], bgImageSimpleMapping = [[stylens, "repeat", "background-repeat"]], paragraphPropertySimpleMapping = [[fons, "background-color", 
  "background-color"], [fons, "text-align", "text-align"], [fons, "text-indent", "text-indent"], [fons, "padding", "padding"], [fons, "padding-left", "padding-left"], [fons, "padding-right", "padding-right"], [fons, "padding-top", "padding-top"], [fons, "padding-bottom", "padding-bottom"], [fons, "border-left", "border-left"], [fons, "border-right", "border-right"], [fons, "border-top", "border-top"], [fons, "border-bottom", "border-bottom"], [fons, "margin", "margin"], [fons, "margin-left", "margin-left"], 
  [fons, "margin-right", "margin-right"], [fons, "margin-top", "margin-top"], [fons, "margin-bottom", "margin-bottom"], [fons, "border", "border"]], graphicPropertySimpleMapping = [[fons, "background-color", "background-color"], [fons, "min-height", "min-height"], [drawns, "stroke", "border"], [svgns, "stroke-color", "border-color"], [svgns, "stroke-width", "border-width"], [fons, "border", "border"], [fons, "border-left", "border-left"], [fons, "border-right", "border-right"], [fons, "border-top", 
  "border-top"], [fons, "border-bottom", "border-bottom"]], tablecellPropertySimpleMapping = [[fons, "background-color", "background-color"], [fons, "border-left", "border-left"], [fons, "border-right", "border-right"], [fons, "border-top", "border-top"], [fons, "border-bottom", "border-bottom"], [fons, "border", "border"]], tablecolumnPropertySimpleMapping = [[stylens, "column-width", "width"]], tablerowPropertySimpleMapping = [[stylens, "row-height", "height"], [fons, "keep-together", null]], tablePropertySimpleMapping = 
  [[stylens, "width", "width"], [fons, "margin-left", "margin-left"], [fons, "margin-right", "margin-right"], [fons, "margin-top", "margin-top"], [fons, "margin-bottom", "margin-bottom"]], pageContentPropertySimpleMapping = [[fons, "background-color", "background-color"], [fons, "padding", "padding"], [fons, "padding-left", "padding-left"], [fons, "padding-right", "padding-right"], [fons, "padding-top", "padding-top"], [fons, "padding-bottom", "padding-bottom"], [fons, "border", "border"], [fons, 
  "border-left", "border-left"], [fons, "border-right", "border-right"], [fons, "border-top", "border-top"], [fons, "border-bottom", "border-bottom"], [fons, "margin", "margin"], [fons, "margin-left", "margin-left"], [fons, "margin-right", "margin-right"], [fons, "margin-top", "margin-top"], [fons, "margin-bottom", "margin-bottom"]], pageSizePropertySimpleMapping = [[fons, "page-width", "width"], [fons, "page-height", "height"]], borderPropertyMap = {"border":true, "border-left":true, "border-right":true, 
  "border-top":true, "border-bottom":true, "stroke-width":true}, fontFaceDeclsMap = {}, utils = new odf.OdfUtils, documentType, odfRoot, defaultFontSize, xpath = xmldom.XPath, cssUnits = new core.CSSUnits;
  function getStyleMap(stylesnode) {
    var node, name, family, style, stylemap = {};
    if(!stylesnode) {
      return stylemap
    }
    node = stylesnode.firstElementChild;
    while(node) {
      if(node.namespaceURI === stylens && (node.localName === "style" || node.localName === "default-style")) {
        family = node.getAttributeNS(stylens, "family")
      }else {
        if(node.namespaceURI === textns && node.localName === "list-style") {
          family = "list"
        }else {
          if(node.namespaceURI === stylens && (node.localName === "page-layout" || node.localName === "default-page-layout")) {
            family = "page"
          }else {
            family = undefined
          }
        }
      }
      if(family) {
        name = node.getAttributeNS(stylens, "name");
        if(!name) {
          name = ""
        }
        if(stylemap.hasOwnProperty(family)) {
          style = stylemap[family]
        }else {
          stylemap[family] = style = {}
        }
        style[name] = node
      }
      node = node.nextElementSibling
    }
    return stylemap
  }
  function findStyle(stylestree, name) {
    if(stylestree.hasOwnProperty(name)) {
      return stylestree[name]
    }
    var n, style = null;
    for(n in stylestree) {
      if(stylestree.hasOwnProperty(n)) {
        style = findStyle(stylestree[n].derivedStyles, name);
        if(style) {
          break
        }
      }
    }
    return style
  }
  function addStyleToStyleTree(stylename, stylesmap, stylestree) {
    var style, parentname, parentstyle;
    if(!stylesmap.hasOwnProperty(stylename)) {
      return null
    }
    style = new odf.StyleTreeNode(stylesmap[stylename]);
    parentname = style.element.getAttributeNS(stylens, "parent-style-name");
    parentstyle = null;
    if(parentname) {
      parentstyle = findStyle(stylestree, parentname) || addStyleToStyleTree(parentname, stylesmap, stylestree)
    }
    if(parentstyle) {
      parentstyle.derivedStyles[stylename] = style
    }else {
      stylestree[stylename] = style
    }
    delete stylesmap[stylename];
    return style
  }
  function addStyleMapToStyleTree(stylesmap, stylestree) {
    var name;
    for(name in stylesmap) {
      if(stylesmap.hasOwnProperty(name)) {
        addStyleToStyleTree(name, stylesmap, stylestree)
      }
    }
  }
  function createSelector(family, name) {
    var prefix = familynamespaceprefixes[family], namepart, selector;
    if(prefix === undefined) {
      return null
    }
    if(name) {
      namepart = "[" + prefix + '|style-name="' + name + '"]'
    }else {
      namepart = ""
    }
    if(prefix === "presentation") {
      prefix = "draw";
      if(name) {
        namepart = '[presentation|style-name="' + name + '"]'
      }else {
        namepart = ""
      }
    }
    selector = prefix + "|" + familytagnames[family].join(namepart + "," + prefix + "|") + namepart;
    return selector
  }
  function getSelectors(family, name, node) {
    var selectors = [], ss, derivedStyles = node.derivedStyles, n;
    ss = createSelector(family, name);
    if(ss !== null) {
      selectors.push(ss)
    }
    for(n in derivedStyles) {
      if(derivedStyles.hasOwnProperty(n)) {
        ss = getSelectors(family, n, derivedStyles[n]);
        selectors = selectors.concat(ss)
      }
    }
    return selectors
  }
  function getDirectChild(node, ns, name) {
    var e = node && node.firstElementChild;
    while(e) {
      if(e.namespaceURI === ns && e.localName === name) {
        break
      }
      e = e.nextElementSibling
    }
    return e
  }
  function fixBorderWidth(value) {
    var index = value.indexOf(" "), width, theRestOfBorderAttributes;
    if(index !== -1) {
      width = value.substring(0, index);
      theRestOfBorderAttributes = value.substring(index)
    }else {
      width = value;
      theRestOfBorderAttributes = ""
    }
    width = utils.parseLength(width);
    if(width && (width.unit === "pt" && width.value < 0.75)) {
      value = "0.75pt" + theRestOfBorderAttributes
    }
    return value
  }
  function applySimpleMapping(props, mapping) {
    var rule = "", i, r, value;
    for(i = 0;i < mapping.length;i += 1) {
      r = mapping[i];
      value = props.getAttributeNS(r[0], r[1]);
      if(value) {
        value = value.trim();
        if(borderPropertyMap.hasOwnProperty(r[1])) {
          value = fixBorderWidth(value)
        }
        if(r[2]) {
          rule += r[2] + ":" + value + ";"
        }
      }
    }
    return rule
  }
  function getFontSize(styleNode) {
    var props = getDirectChild(styleNode, stylens, "text-properties");
    if(props) {
      return utils.parseFoFontSize(props.getAttributeNS(fons, "font-size"))
    }
    return null
  }
  function getParentStyleNode(styleNode) {
    var parentStyleName = "", parentStyleFamily = "", parentStyleNode = null, xp;
    if(styleNode.localName === "default-style") {
      return null
    }
    parentStyleName = styleNode.getAttributeNS(stylens, "parent-style-name");
    parentStyleFamily = styleNode.getAttributeNS(stylens, "family");
    if(parentStyleName) {
      xp = "//style:*[@style:name='" + parentStyleName + "'][@style:family='" + parentStyleFamily + "']"
    }else {
      xp = "//style:default-style[@style:family='" + parentStyleFamily + "']"
    }
    parentStyleNode = xpath.getODFElementsWithXPath((odfRoot), xp, odf.Namespaces.lookupNamespaceURI)[0];
    return parentStyleNode
  }
  function getTextProperties(props) {
    var rule = "", fontName, fontSize, value, textDecoration = "", fontSizeRule = "", sizeMultiplier = 1, parentStyle;
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
    fontName = props.getAttributeNS(stylens, "font-name") || props.getAttributeNS(fons, "font-family");
    if(fontName) {
      value = fontFaceDeclsMap[fontName];
      rule += "font-family: " + (value || fontName) + ";"
    }
    parentStyle = props.parentElement;
    fontSize = getFontSize(parentStyle);
    if(!fontSize) {
      return rule
    }
    while(parentStyle) {
      fontSize = getFontSize(parentStyle);
      if(fontSize) {
        if(fontSize.unit !== "%") {
          fontSizeRule = "font-size: " + fontSize.value * sizeMultiplier + fontSize.unit + ";";
          break
        }
        sizeMultiplier *= fontSize.value / 100
      }
      parentStyle = getParentStyleNode(parentStyle)
    }
    if(!fontSizeRule) {
      fontSizeRule = "font-size: " + parseFloat(defaultFontSize) * sizeMultiplier + cssUnits.getUnits(defaultFontSize) + ";"
    }
    rule += fontSizeRule;
    return rule
  }
  function getParagraphProperties(props) {
    var rule = "", bgimage, url, lineHeight;
    rule += applySimpleMapping(props, paragraphPropertySimpleMapping);
    bgimage = getDirectChild(props, stylens, "background-image");
    if(bgimage) {
      url = bgimage.getAttributeNS(xlinkns, "href");
      if(url) {
        rule += "background-image: url('odfkit:" + url + "');";
        rule += applySimpleMapping(bgimage, bgImageSimpleMapping)
      }
    }
    lineHeight = props.getAttributeNS(fons, "line-height");
    if(lineHeight && lineHeight !== "normal") {
      lineHeight = utils.parseFoLineHeight(lineHeight);
      if(lineHeight.unit !== "%") {
        rule += "line-height: " + lineHeight.value + lineHeight.unit + ";"
      }else {
        rule += "line-height: " + lineHeight.value / 100 + ";"
      }
    }
    return rule
  }
  function matchToRgb(m, r, g, b) {
    return r + r + g + g + b + b
  }
  function hexToRgb(hex) {
    var result, shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, matchToRgb);
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {r:parseInt(result[1], 16), g:parseInt(result[2], 16), b:parseInt(result[3], 16)} : null
  }
  function isNumber(n) {
    return!isNaN(parseFloat(n))
  }
  function getGraphicProperties(props) {
    var rule = "", alpha, bgcolor, fill;
    rule += applySimpleMapping(props, graphicPropertySimpleMapping);
    alpha = props.getAttributeNS(drawns, "opacity");
    fill = props.getAttributeNS(drawns, "fill");
    bgcolor = props.getAttributeNS(drawns, "fill-color");
    if(fill === "solid" || fill === "hatch") {
      if(bgcolor && bgcolor !== "none") {
        alpha = isNumber(alpha) ? parseFloat(alpha) / 100 : 1;
        bgcolor = hexToRgb(bgcolor);
        if(bgcolor) {
          rule += "background-color: rgba(" + bgcolor.r + "," + bgcolor.g + "," + bgcolor.b + "," + alpha + ");"
        }
      }else {
        rule += "background: none;"
      }
    }else {
      if(fill === "none") {
        rule += "background: none;"
      }
    }
    return rule
  }
  function getDrawingPageProperties(props) {
    var rule = "";
    rule += applySimpleMapping(props, graphicPropertySimpleMapping);
    if(props.getAttributeNS(presentationns, "background-visible") === "true") {
      rule += "background: none;"
    }
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
    var rule = "", borderModel;
    rule += applySimpleMapping(props, tablePropertySimpleMapping);
    borderModel = props.getAttributeNS(tablens, "border-model");
    if(borderModel === "collapsing") {
      rule += "border-collapse:collapse;"
    }else {
      if(borderModel === "separating") {
        rule += "border-collapse:separate;"
      }
    }
    return rule
  }
  function addStyleRule(sheet, family, name, node) {
    var selectors = getSelectors(family, name, node), selector = selectors.join(","), rule = "", properties;
    properties = getDirectChild(node.element, stylens, "text-properties");
    if(properties) {
      rule += getTextProperties(properties)
    }
    properties = getDirectChild(node.element, stylens, "paragraph-properties");
    if(properties) {
      rule += getParagraphProperties(properties)
    }
    properties = getDirectChild(node.element, stylens, "graphic-properties");
    if(properties) {
      rule += getGraphicProperties(properties)
    }
    properties = getDirectChild(node.element, stylens, "drawing-page-properties");
    if(properties) {
      rule += getDrawingPageProperties(properties)
    }
    properties = getDirectChild(node.element, stylens, "table-cell-properties");
    if(properties) {
      rule += getTableCellProperties(properties)
    }
    properties = getDirectChild(node.element, stylens, "table-row-properties");
    if(properties) {
      rule += getTableRowProperties(properties)
    }
    properties = getDirectChild(node.element, stylens, "table-column-properties");
    if(properties) {
      rule += getTableColumnProperties(properties)
    }
    properties = getDirectChild(node.element, stylens, "table-properties");
    if(properties) {
      rule += getTableProperties(properties)
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
    var style = node.getAttributeNS(stylens, "num-format"), suffix = node.getAttributeNS(stylens, "num-suffix") || "", prefix = node.getAttributeNS(stylens, "num-prefix") || "", stylemap = {1:"decimal", "a":"lower-latin", "A":"upper-latin", "i":"lower-roman", "I":"upper-roman"}, content = "";
    if(prefix) {
      content += ' "' + prefix + '"'
    }
    if(stylemap.hasOwnProperty(style)) {
      content += " counter(list, " + stylemap[style] + ")"
    }else {
      if(style) {
        content += ' "' + style + '"'
      }else {
        content += " ''"
      }
    }
    return"content:" + content + ' "' + suffix + '"'
  }
  function getImageRule() {
    return"content: none;"
  }
  function getBulletRule(node) {
    var bulletChar = node.getAttributeNS(textns, "bullet-char");
    return"content: '" + bulletChar + "';"
  }
  function addListStyleRule(sheet, name, node, itemrule) {
    var selector = 'text|list[text|style-name="' + name + '"]', level = node.getAttributeNS(textns, "level"), itemSelector, listItemRule, listLevelProps = getDirectChild(node, stylens, "list-level-properties"), listLevelLabelAlign = getDirectChild(listLevelProps, stylens, "list-level-label-alignment"), bulletIndent, listIndent, bulletWidth, rule;
    if(listLevelLabelAlign) {
      bulletIndent = listLevelLabelAlign.getAttributeNS(fons, "text-indent");
      listIndent = listLevelLabelAlign.getAttributeNS(fons, "margin-left")
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
    if(listIndent) {
      itemSelector = selector;
      itemSelector += " > text|list-item > *:not(text|list):first-child";
      listItemRule = itemSelector + "{";
      listItemRule += "margin-left:" + listIndent + ";";
      listItemRule += "}";
      try {
        sheet.insertRule(listItemRule, sheet.cssRules.length)
      }catch(e1) {
        runtime.log("cannot load rule: " + listItemRule)
      }
    }
    selector += " > text|list-item > *:not(text|list):first-child:before";
    rule = selector + "{" + itemrule + ";";
    rule += "counter-increment:list;";
    rule += "margin-left:" + bulletIndent + ";";
    rule += "width:" + bulletWidth + ";";
    rule += "display:inline-block}";
    try {
      sheet.insertRule(rule, sheet.cssRules.length)
    }catch(e2) {
      runtime.log("cannot load rule: " + rule)
    }
  }
  function addPageStyleRules(sheet, node) {
    var rule = "", imageProps, url, contentLayoutRule = "", pageSizeRule = "", props = getDirectChild(node, stylens, "page-layout-properties"), stylename, masterStyles, e, masterStyleName;
    if(!props) {
      return
    }
    stylename = node.getAttributeNS(stylens, "name");
    rule += applySimpleMapping(props, pageContentPropertySimpleMapping);
    imageProps = getDirectChild(props, stylens, "background-image");
    if(imageProps) {
      url = imageProps.getAttributeNS(xlinkns, "href");
      if(url) {
        rule += "background-image: url('odfkit:" + url + "');";
        rule += applySimpleMapping(imageProps, bgImageSimpleMapping)
      }
    }
    if(documentType === "presentation") {
      masterStyles = getDirectChild(node.parentNode.parentElement, officens, "master-styles");
      e = masterStyles && masterStyles.firstElementChild;
      while(e) {
        if(e.namespaceURI === stylens && (e.localName === "master-page" && e.getAttributeNS(stylens, "page-layout-name") === stylename)) {
          masterStyleName = e.getAttributeNS(stylens, "name");
          contentLayoutRule = "draw|page[draw|master-page-name=" + masterStyleName + "] {" + rule + "}";
          pageSizeRule = "office|body, draw|page[draw|master-page-name=" + masterStyleName + "] {" + applySimpleMapping(props, pageSizePropertySimpleMapping) + " }";
          try {
            sheet.insertRule(contentLayoutRule, sheet.cssRules.length);
            sheet.insertRule(pageSizeRule, sheet.cssRules.length)
          }catch(e1) {
            throw e1;
          }
        }
        e = e.nextElementSibling
      }
    }else {
      if(documentType === "text") {
        contentLayoutRule = "office|text {" + rule + "}";
        rule = "";
        pageSizeRule = "office|body {" + "width: " + props.getAttributeNS(fons, "page-width") + ";" + "}";
        try {
          sheet.insertRule(contentLayoutRule, sheet.cssRules.length);
          sheet.insertRule(pageSizeRule, sheet.cssRules.length)
        }catch(e2) {
          throw e2;
        }
      }
    }
  }
  function addListStyleRules(sheet, name, node) {
    var n = node.firstChild, e, itemrule;
    while(n) {
      if(n.namespaceURI === textns) {
        e = (n);
        if(n.localName === "list-level-style-number") {
          itemrule = getNumberRule(e);
          addListStyleRule(sheet, name, e, itemrule)
        }else {
          if(n.localName === "list-level-style-image") {
            itemrule = getImageRule();
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
      addListStyleRules(sheet, name, node.element)
    }else {
      if(family === "page") {
        addPageStyleRules(sheet, node.element)
      }else {
        addStyleRule(sheet, family, name, node)
      }
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
  this.style2css = function(doctype, stylesheet, fontFaceMap, styles, autostyles) {
    var doc, styletree, tree, rule, name, family, stylenodes, styleautonodes;
    while(stylesheet.cssRules.length) {
      stylesheet.deleteRule(stylesheet.cssRules.length - 1)
    }
    doc = null;
    if(styles) {
      doc = styles.ownerDocument;
      odfRoot = styles.parentNode
    }
    if(autostyles) {
      doc = autostyles.ownerDocument;
      odfRoot = autostyles.parentNode
    }
    if(!doc) {
      return
    }
    odf.Namespaces.forEachPrefix(function(prefix, ns) {
      rule = "@namespace " + prefix + " url(" + ns + ");";
      try {
        stylesheet.insertRule(rule, stylesheet.cssRules.length)
      }catch(ignore) {
      }
    });
    fontFaceDeclsMap = fontFaceMap;
    documentType = doctype;
    defaultFontSize = runtime.getWindow().getComputedStyle(document.body, null).getPropertyValue("font-size") || "12pt";
    stylenodes = getStyleMap(styles);
    styleautonodes = getStyleMap(autostyles);
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
runtime.loadClass("xmldom.XPath");
runtime.loadClass("odf.Namespaces");
odf.StyleInfo = function StyleInfo() {
  var chartns = odf.Namespaces.chartns, dbns = odf.Namespaces.dbns, dr3dns = odf.Namespaces.dr3dns, drawns = odf.Namespaces.drawns, formns = odf.Namespaces.formns, numberns = odf.Namespaces.numberns, officens = odf.Namespaces.officens, presentationns = odf.Namespaces.presentationns, stylens = odf.Namespaces.stylens, tablens = odf.Namespaces.tablens, textns = odf.Namespaces.textns, nsprefixes = {"urn:oasis:names:tc:opendocument:xmlns:chart:1.0":"chart:", "urn:oasis:names:tc:opendocument:xmlns:database:1.0":"db:", 
  "urn:oasis:names:tc:opendocument:xmlns:dr3d:1.0":"dr3d:", "urn:oasis:names:tc:opendocument:xmlns:drawing:1.0":"draw:", "urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0":"fo:", "urn:oasis:names:tc:opendocument:xmlns:form:1.0":"form:", "urn:oasis:names:tc:opendocument:xmlns:datastyle:1.0":"number:", "urn:oasis:names:tc:opendocument:xmlns:office:1.0":"office:", "urn:oasis:names:tc:opendocument:xmlns:presentation:1.0":"presentation:", "urn:oasis:names:tc:opendocument:xmlns:style:1.0":"style:", 
  "urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0":"svg:", "urn:oasis:names:tc:opendocument:xmlns:table:1.0":"table:", "urn:oasis:names:tc:opendocument:xmlns:text:1.0":"chart:", "http://www.w3.org/XML/1998/namespace":"xml:"}, elementstyles = {"text":[{ens:stylens, en:"tab-stop", ans:stylens, a:"leader-text-style"}, {ens:stylens, en:"drop-cap", ans:stylens, a:"style-name"}, {ens:textns, en:"notes-configuration", ans:textns, a:"citation-body-style-name"}, {ens:textns, en:"notes-configuration", 
  ans:textns, a:"citation-style-name"}, {ens:textns, en:"a", ans:textns, a:"style-name"}, {ens:textns, en:"alphabetical-index", ans:textns, a:"style-name"}, {ens:textns, en:"linenumbering-configuration", ans:textns, a:"style-name"}, {ens:textns, en:"list-level-style-number", ans:textns, a:"style-name"}, {ens:textns, en:"ruby-text", ans:textns, a:"style-name"}, {ens:textns, en:"span", ans:textns, a:"style-name"}, {ens:textns, en:"a", ans:textns, a:"visited-style-name"}, {ens:stylens, en:"text-properties", 
  ans:stylens, a:"text-line-through-text-style"}, {ens:textns, en:"alphabetical-index-source", ans:textns, a:"main-entry-style-name"}, {ens:textns, en:"index-entry-bibliography", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-chapter", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-link-end", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-link-start", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-page-number", ans:textns, a:"style-name"}, {ens:textns, 
  en:"index-entry-span", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-tab-stop", ans:textns, a:"style-name"}, {ens:textns, en:"index-entry-text", ans:textns, a:"style-name"}, {ens:textns, en:"index-title-template", ans:textns, a:"style-name"}, {ens:textns, en:"list-level-style-bullet", ans:textns, a:"style-name"}, {ens:textns, en:"outline-level-style", ans:textns, a:"style-name"}], "paragraph":[{ens:drawns, en:"caption", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"circle", ans:drawns, 
  a:"text-style-name"}, {ens:drawns, en:"connector", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"control", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"custom-shape", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"ellipse", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"frame", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"line", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"measure", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"path", ans:drawns, a:"text-style-name"}, 
  {ens:drawns, en:"polygon", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"polyline", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"rect", ans:drawns, a:"text-style-name"}, {ens:drawns, en:"regular-polygon", ans:drawns, a:"text-style-name"}, {ens:officens, en:"annotation", ans:drawns, a:"text-style-name"}, {ens:formns, en:"column", ans:formns, a:"text-style-name"}, {ens:stylens, en:"style", ans:stylens, a:"next-style-name"}, {ens:tablens, en:"body", ans:tablens, a:"paragraph-style-name"}, 
  {ens:tablens, en:"even-columns", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"even-rows", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"first-column", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"first-row", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"last-column", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"last-row", ans:tablens, a:"paragraph-style-name"}, {ens:tablens, en:"odd-columns", ans:tablens, a:"paragraph-style-name"}, 
  {ens:tablens, en:"odd-rows", ans:tablens, a:"paragraph-style-name"}, {ens:textns, en:"notes-configuration", ans:textns, a:"default-style-name"}, {ens:textns, en:"alphabetical-index-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"bibliography-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"h", ans:textns, a:"style-name"}, {ens:textns, en:"illustration-index-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"index-source-style", ans:textns, a:"style-name"}, 
  {ens:textns, en:"object-index-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"p", ans:textns, a:"style-name"}, {ens:textns, en:"table-index-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"table-of-content-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"table-index-entry-template", ans:textns, a:"style-name"}, {ens:textns, en:"user-index-entry-template", ans:textns, a:"style-name"}, {ens:stylens, en:"page-layout-properties", ans:stylens, a:"register-truth-ref-style-name"}], 
  "chart":[{ens:chartns, en:"axis", ans:chartns, a:"style-name"}, {ens:chartns, en:"chart", ans:chartns, a:"style-name"}, {ens:chartns, en:"data-label", ans:chartns, a:"style-name"}, {ens:chartns, en:"data-point", ans:chartns, a:"style-name"}, {ens:chartns, en:"equation", ans:chartns, a:"style-name"}, {ens:chartns, en:"error-indicator", ans:chartns, a:"style-name"}, {ens:chartns, en:"floor", ans:chartns, a:"style-name"}, {ens:chartns, en:"footer", ans:chartns, a:"style-name"}, {ens:chartns, en:"grid", 
  ans:chartns, a:"style-name"}, {ens:chartns, en:"legend", ans:chartns, a:"style-name"}, {ens:chartns, en:"mean-value", ans:chartns, a:"style-name"}, {ens:chartns, en:"plot-area", ans:chartns, a:"style-name"}, {ens:chartns, en:"regression-curve", ans:chartns, a:"style-name"}, {ens:chartns, en:"series", ans:chartns, a:"style-name"}, {ens:chartns, en:"stock-gain-marker", ans:chartns, a:"style-name"}, {ens:chartns, en:"stock-loss-marker", ans:chartns, a:"style-name"}, {ens:chartns, en:"stock-range-line", 
  ans:chartns, a:"style-name"}, {ens:chartns, en:"subtitle", ans:chartns, a:"style-name"}, {ens:chartns, en:"title", ans:chartns, a:"style-name"}, {ens:chartns, en:"wall", ans:chartns, a:"style-name"}], "section":[{ens:textns, en:"alphabetical-index", ans:textns, a:"style-name"}, {ens:textns, en:"bibliography", ans:textns, a:"style-name"}, {ens:textns, en:"illustration-index", ans:textns, a:"style-name"}, {ens:textns, en:"index-title", ans:textns, a:"style-name"}, {ens:textns, en:"object-index", 
  ans:textns, a:"style-name"}, {ens:textns, en:"section", ans:textns, a:"style-name"}, {ens:textns, en:"table-of-content", ans:textns, a:"style-name"}, {ens:textns, en:"table-index", ans:textns, a:"style-name"}, {ens:textns, en:"user-index", ans:textns, a:"style-name"}], "ruby":[{ens:textns, en:"ruby", ans:textns, a:"style-name"}], "table":[{ens:dbns, en:"query", ans:dbns, a:"style-name"}, {ens:dbns, en:"table-representation", ans:dbns, a:"style-name"}, {ens:tablens, en:"background", ans:tablens, 
  a:"style-name"}, {ens:tablens, en:"table", ans:tablens, a:"style-name"}], "table-column":[{ens:dbns, en:"column", ans:dbns, a:"style-name"}, {ens:tablens, en:"table-column", ans:tablens, a:"style-name"}], "table-row":[{ens:dbns, en:"query", ans:dbns, a:"default-row-style-name"}, {ens:dbns, en:"table-representation", ans:dbns, a:"default-row-style-name"}, {ens:tablens, en:"table-row", ans:tablens, a:"style-name"}], "table-cell":[{ens:dbns, en:"column", ans:dbns, a:"default-cell-style-name"}, {ens:tablens, 
  en:"table-column", ans:tablens, a:"default-cell-style-name"}, {ens:tablens, en:"table-row", ans:tablens, a:"default-cell-style-name"}, {ens:tablens, en:"body", ans:tablens, a:"style-name"}, {ens:tablens, en:"covered-table-cell", ans:tablens, a:"style-name"}, {ens:tablens, en:"even-columns", ans:tablens, a:"style-name"}, {ens:tablens, en:"covered-table-cell", ans:tablens, a:"style-name"}, {ens:tablens, en:"even-columns", ans:tablens, a:"style-name"}, {ens:tablens, en:"even-rows", ans:tablens, a:"style-name"}, 
  {ens:tablens, en:"first-column", ans:tablens, a:"style-name"}, {ens:tablens, en:"first-row", ans:tablens, a:"style-name"}, {ens:tablens, en:"last-column", ans:tablens, a:"style-name"}, {ens:tablens, en:"last-row", ans:tablens, a:"style-name"}, {ens:tablens, en:"odd-columns", ans:tablens, a:"style-name"}, {ens:tablens, en:"odd-rows", ans:tablens, a:"style-name"}, {ens:tablens, en:"table-cell", ans:tablens, a:"style-name"}], "graphic":[{ens:dr3dns, en:"cube", ans:drawns, a:"style-name"}, {ens:dr3dns, 
  en:"extrude", ans:drawns, a:"style-name"}, {ens:dr3dns, en:"rotate", ans:drawns, a:"style-name"}, {ens:dr3dns, en:"scene", ans:drawns, a:"style-name"}, {ens:dr3dns, en:"sphere", ans:drawns, a:"style-name"}, {ens:drawns, en:"caption", ans:drawns, a:"style-name"}, {ens:drawns, en:"circle", ans:drawns, a:"style-name"}, {ens:drawns, en:"connector", ans:drawns, a:"style-name"}, {ens:drawns, en:"control", ans:drawns, a:"style-name"}, {ens:drawns, en:"custom-shape", ans:drawns, a:"style-name"}, {ens:drawns, 
  en:"ellipse", ans:drawns, a:"style-name"}, {ens:drawns, en:"frame", ans:drawns, a:"style-name"}, {ens:drawns, en:"g", ans:drawns, a:"style-name"}, {ens:drawns, en:"line", ans:drawns, a:"style-name"}, {ens:drawns, en:"measure", ans:drawns, a:"style-name"}, {ens:drawns, en:"page-thumbnail", ans:drawns, a:"style-name"}, {ens:drawns, en:"path", ans:drawns, a:"style-name"}, {ens:drawns, en:"polygon", ans:drawns, a:"style-name"}, {ens:drawns, en:"polyline", ans:drawns, a:"style-name"}, {ens:drawns, en:"rect", 
  ans:drawns, a:"style-name"}, {ens:drawns, en:"regular-polygon", ans:drawns, a:"style-name"}, {ens:officens, en:"annotation", ans:drawns, a:"style-name"}], "presentation":[{ens:dr3dns, en:"cube", ans:presentationns, a:"style-name"}, {ens:dr3dns, en:"extrude", ans:presentationns, a:"style-name"}, {ens:dr3dns, en:"rotate", ans:presentationns, a:"style-name"}, {ens:dr3dns, en:"scene", ans:presentationns, a:"style-name"}, {ens:dr3dns, en:"sphere", ans:presentationns, a:"style-name"}, {ens:drawns, en:"caption", 
  ans:presentationns, a:"style-name"}, {ens:drawns, en:"circle", ans:presentationns, a:"style-name"}, {ens:drawns, en:"connector", ans:presentationns, a:"style-name"}, {ens:drawns, en:"control", ans:presentationns, a:"style-name"}, {ens:drawns, en:"custom-shape", ans:presentationns, a:"style-name"}, {ens:drawns, en:"ellipse", ans:presentationns, a:"style-name"}, {ens:drawns, en:"frame", ans:presentationns, a:"style-name"}, {ens:drawns, en:"g", ans:presentationns, a:"style-name"}, {ens:drawns, en:"line", 
  ans:presentationns, a:"style-name"}, {ens:drawns, en:"measure", ans:presentationns, a:"style-name"}, {ens:drawns, en:"page-thumbnail", ans:presentationns, a:"style-name"}, {ens:drawns, en:"path", ans:presentationns, a:"style-name"}, {ens:drawns, en:"polygon", ans:presentationns, a:"style-name"}, {ens:drawns, en:"polyline", ans:presentationns, a:"style-name"}, {ens:drawns, en:"rect", ans:presentationns, a:"style-name"}, {ens:drawns, en:"regular-polygon", ans:presentationns, a:"style-name"}, {ens:officens, 
  en:"annotation", ans:presentationns, a:"style-name"}], "drawing-page":[{ens:drawns, en:"page", ans:drawns, a:"style-name"}, {ens:presentationns, en:"notes", ans:drawns, a:"style-name"}, {ens:stylens, en:"handout-master", ans:drawns, a:"style-name"}, {ens:stylens, en:"master-page", ans:drawns, a:"style-name"}], "list-style":[{ens:textns, en:"list", ans:textns, a:"style-name"}, {ens:textns, en:"numbered-paragraph", ans:textns, a:"style-name"}, {ens:textns, en:"list-item", ans:textns, a:"style-override"}, 
  {ens:stylens, en:"style", ans:stylens, a:"list-style-name"}], "data":[{ens:stylens, en:"style", ans:stylens, a:"data-style-name"}, {ens:stylens, en:"style", ans:stylens, a:"percentage-data-style-name"}, {ens:presentationns, en:"date-time-decl", ans:stylens, a:"data-style-name"}, {ens:textns, en:"creation-date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"creation-time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"database-display", ans:stylens, a:"data-style-name"}, {ens:textns, 
  en:"date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"editing-duration", ans:stylens, a:"data-style-name"}, {ens:textns, en:"expression", ans:stylens, a:"data-style-name"}, {ens:textns, en:"meta-field", ans:stylens, a:"data-style-name"}, {ens:textns, en:"modification-date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"modification-time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"print-date", ans:stylens, a:"data-style-name"}, {ens:textns, en:"print-time", ans:stylens, 
  a:"data-style-name"}, {ens:textns, en:"table-formula", ans:stylens, a:"data-style-name"}, {ens:textns, en:"time", ans:stylens, a:"data-style-name"}, {ens:textns, en:"user-defined", ans:stylens, a:"data-style-name"}, {ens:textns, en:"user-field-get", ans:stylens, a:"data-style-name"}, {ens:textns, en:"user-field-input", ans:stylens, a:"data-style-name"}, {ens:textns, en:"variable-get", ans:stylens, a:"data-style-name"}, {ens:textns, en:"variable-input", ans:stylens, a:"data-style-name"}, {ens:textns, 
  en:"variable-set", ans:stylens, a:"data-style-name"}], "page-layout":[{ens:presentationns, en:"notes", ans:stylens, a:"page-layout-name"}, {ens:stylens, en:"handout-master", ans:stylens, a:"page-layout-name"}, {ens:stylens, en:"master-page", ans:stylens, a:"page-layout-name"}]}, elements, xpath = xmldom.XPath;
  function hasDerivedStyles(odfbody, nsResolver, styleElement) {
    var nodes, xp, styleName = styleElement.getAttributeNS(stylens, "name"), styleFamily = styleElement.getAttributeNS(stylens, "family");
    xp = "//style:*[@style:parent-style-name='" + styleName + "'][@style:family='" + styleFamily + "']";
    nodes = xpath.getODFElementsWithXPath(odfbody, xp, nsResolver);
    if(nodes.length) {
      return true
    }
    return false
  }
  function prefixUsedStyleNames(element, prefix) {
    var i, stylename, a, e, ns, elname, elns, localName, length = 0;
    elname = elements[element.localName];
    if(elname) {
      elns = elname[element.namespaceURI];
      if(elns) {
        length = elns.length
      }
    }
    for(i = 0;i < length;i += 1) {
      a = (elns[i]);
      ns = a.ns;
      localName = a.localname;
      stylename = element.getAttributeNS(ns, localName);
      if(stylename) {
        element.setAttributeNS(ns, nsprefixes[ns] + localName, prefix + stylename)
      }
    }
    e = element.firstElementChild;
    while(e) {
      prefixUsedStyleNames(e, prefix);
      e = e.nextElementSibling
    }
  }
  function prefixStyleName(styleElement, prefix) {
    var stylename = styleElement.getAttributeNS(drawns, "name"), ns;
    if(stylename) {
      ns = drawns
    }else {
      stylename = styleElement.getAttributeNS(stylens, "name");
      if(stylename) {
        ns = stylens
      }
    }
    if(ns) {
      styleElement.setAttributeNS(ns, nsprefixes[ns] + "name", prefix + stylename)
    }
  }
  function prefixStyleNames(styleElementsRoot, prefix, styleUsingElementsRoot) {
    var s;
    if(styleElementsRoot) {
      s = styleElementsRoot.firstChild;
      while(s) {
        if(s.nodeType === Node.ELEMENT_NODE) {
          prefixStyleName((s), prefix)
        }
        s = s.nextSibling
      }
      prefixUsedStyleNames(styleElementsRoot, prefix);
      if(styleUsingElementsRoot) {
        prefixUsedStyleNames(styleUsingElementsRoot, prefix)
      }
    }
  }
  function removeRegExpFromUsedStyleNames(element, regExp) {
    var i, stylename, e, elname, elns, a, ns, localName, length = 0;
    elname = elements[element.localName];
    if(elname) {
      elns = elname[element.namespaceURI];
      if(elns) {
        length = elns.length
      }
    }
    for(i = 0;i < length;i += 1) {
      a = (elns[i]);
      ns = a.ns;
      localName = a.localname;
      stylename = element.getAttributeNS(ns, localName);
      if(stylename) {
        stylename = stylename.replace(regExp, "");
        element.setAttributeNS(ns, nsprefixes[ns] + localName, stylename)
      }
    }
    e = element.firstElementChild;
    while(e) {
      removeRegExpFromUsedStyleNames(e, regExp);
      e = e.nextElementSibling
    }
  }
  function removeRegExpFromStyleName(styleElement, regExp) {
    var stylename = styleElement.getAttributeNS(drawns, "name"), ns;
    if(stylename) {
      ns = drawns
    }else {
      stylename = styleElement.getAttributeNS(stylens, "name");
      if(stylename) {
        ns = stylens
      }
    }
    if(ns) {
      stylename = stylename.replace(regExp, "");
      styleElement.setAttributeNS(ns, nsprefixes[ns] + "name", stylename)
    }
  }
  function removePrefixFromStyleNames(styleElementsRoot, prefix, styleUsingElementsRoot) {
    var s, regExp = new RegExp("^" + prefix);
    if(styleElementsRoot) {
      s = styleElementsRoot.firstChild;
      while(s) {
        if(s.nodeType === Node.ELEMENT_NODE) {
          removeRegExpFromStyleName((s), regExp)
        }
        s = s.nextSibling
      }
      removeRegExpFromUsedStyleNames(styleElementsRoot, regExp);
      if(styleUsingElementsRoot) {
        removeRegExpFromUsedStyleNames(styleUsingElementsRoot, regExp)
      }
    }
  }
  function determineStylesForNode(element, usedStyles) {
    var i, stylename, elname, elns, a, ns, localName, keyname, length = 0, map;
    elname = elements[element.localName];
    if(elname) {
      elns = elname[element.namespaceURI];
      if(elns) {
        length = elns.length
      }
    }
    for(i = 0;i < length;i += 1) {
      a = (elns[i]);
      ns = a.ns;
      localName = a.localname;
      stylename = element.getAttributeNS(ns, localName);
      if(stylename) {
        usedStyles = usedStyles || {};
        keyname = a.keyname;
        if(usedStyles.hasOwnProperty(keyname)) {
          usedStyles[keyname][stylename] = 1
        }else {
          map = {};
          map[stylename] = 1;
          usedStyles[keyname] = map
        }
      }
    }
    return usedStyles
  }
  function determineUsedStyles(styleUsingElementsRoot, usedStyles) {
    var i, e;
    determineStylesForNode(styleUsingElementsRoot, usedStyles);
    i = styleUsingElementsRoot.firstChild;
    while(i) {
      if(i.nodeType === Node.ELEMENT_NODE) {
        e = (i);
        determineUsedStyles(e, usedStyles)
      }
      i = i.nextSibling
    }
  }
  function StyleDefinition(key, name, family) {
    this.key = key;
    this.name = name;
    this.family = family;
    this.requires = {}
  }
  function getStyleDefinition(stylename, stylefamily, knownStyles) {
    var styleKey = stylename + '"' + stylefamily, styleDefinition = knownStyles[styleKey];
    if(!styleDefinition) {
      styleDefinition = knownStyles[styleKey] = new StyleDefinition(styleKey, stylename, stylefamily)
    }
    return styleDefinition
  }
  function determineDependentStyles(element, styleScope, knownStyles) {
    var i, stylename, elname, elns, a, ns, localName, e, referencedStyleFamily, referencedStyleDef, length = 0, newScopeName = element.getAttributeNS(stylens, "name"), newScopeFamily = element.getAttributeNS(stylens, "family");
    if(newScopeName && newScopeFamily) {
      styleScope = getStyleDefinition(newScopeName, newScopeFamily, knownStyles)
    }
    if(styleScope) {
      elname = elements[element.localName];
      if(elname) {
        elns = elname[element.namespaceURI];
        if(elns) {
          length = elns.length
        }
      }
      for(i = 0;i < length;i += 1) {
        a = (elns[i]);
        ns = a.ns;
        localName = a.localname;
        stylename = element.getAttributeNS(ns, localName);
        if(stylename) {
          referencedStyleFamily = a.keyname;
          referencedStyleDef = getStyleDefinition(stylename, referencedStyleFamily, knownStyles);
          styleScope.requires[referencedStyleDef.key] = referencedStyleDef
        }
      }
    }
    e = element.firstElementChild;
    while(e) {
      determineDependentStyles(e, styleScope, knownStyles);
      e = e.nextElementSibling
    }
    return knownStyles
  }
  function inverse() {
    var i, l, keyname, list, item, e = {}, map, array, en, ens;
    for(keyname in elementstyles) {
      if(elementstyles.hasOwnProperty(keyname)) {
        list = elementstyles[keyname];
        l = list.length;
        for(i = 0;i < l;i += 1) {
          item = list[i];
          en = item.en;
          ens = item.ens;
          if(e.hasOwnProperty(en)) {
            map = e[en]
          }else {
            e[en] = map = {}
          }
          if(map.hasOwnProperty(ens)) {
            array = map[ens]
          }else {
            map[ens] = array = []
          }
          array.push({ns:item.ans, localname:item.a, keyname:keyname})
        }
      }
    }
    return e
  }
  function mergeRequiredStyles(styleDependency, usedStyles) {
    var family = usedStyles[styleDependency.family];
    if(!family) {
      family = usedStyles[styleDependency.family] = {}
    }
    family[styleDependency.name] = 1;
    Object.keys((styleDependency.requires)).forEach(function(requiredStyleKey) {
      mergeRequiredStyles((styleDependency.requires[requiredStyleKey]), usedStyles)
    })
  }
  function mergeUsedAutomaticStyles(automaticStylesRoot, usedStyles) {
    var automaticStyles = determineDependentStyles(automaticStylesRoot, null, {});
    Object.keys(automaticStyles).forEach(function(styleKey) {
      var automaticStyleDefinition = automaticStyles[styleKey], usedFamily = usedStyles[automaticStyleDefinition.family];
      if(usedFamily && usedFamily.hasOwnProperty(automaticStyleDefinition.name)) {
        mergeRequiredStyles(automaticStyleDefinition, usedStyles)
      }
    })
  }
  function collectUsedFontFaces(usedFontFaceDeclMap, styleElement) {
    var localNames = ["font-name", "font-name-asian", "font-name-complex"], e, currentElement;
    function collectByAttribute(localName) {
      var fontFaceName = currentElement.getAttributeNS(stylens, localName);
      if(fontFaceName) {
        usedFontFaceDeclMap[fontFaceName] = true
      }
    }
    e = styleElement && styleElement.firstElementChild;
    while(e) {
      currentElement = e;
      localNames.forEach(collectByAttribute);
      collectUsedFontFaces(usedFontFaceDeclMap, currentElement);
      e = e.nextElementSibling
    }
  }
  this.collectUsedFontFaces = collectUsedFontFaces;
  function changeFontFaceNames(styleElement, fontFaceNameChangeMap) {
    var localNames = ["font-name", "font-name-asian", "font-name-complex"], e, currentElement;
    function changeFontFaceNameByAttribute(localName) {
      var fontFaceName = currentElement.getAttributeNS(stylens, localName);
      if(fontFaceName && fontFaceNameChangeMap.hasOwnProperty(fontFaceName)) {
        currentElement.setAttributeNS(stylens, "style:" + localName, fontFaceNameChangeMap[fontFaceName])
      }
    }
    e = styleElement && styleElement.firstElementChild;
    while(e) {
      currentElement = e;
      localNames.forEach(changeFontFaceNameByAttribute);
      changeFontFaceNames(currentElement, fontFaceNameChangeMap);
      e = e.nextElementSibling
    }
  }
  this.changeFontFaceNames = changeFontFaceNames;
  this.UsedStyleList = function(styleUsingElementsRoot, automaticStylesRoot) {
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
    determineUsedStyles(styleUsingElementsRoot, usedStyles);
    if(automaticStylesRoot) {
      mergeUsedAutomaticStyles(automaticStylesRoot, usedStyles)
    }
  };
  this.hasDerivedStyles = hasDerivedStyles;
  this.prefixStyleNames = prefixStyleNames;
  this.removePrefixFromStyleNames = removePrefixFromStyleNames;
  this.determineStylesForNode = determineStylesForNode;
  elements = inverse()
};
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
odf.TextSerializer = function TextSerializer() {
  var self = this, odfUtils = new odf.OdfUtils;
  function serializeNode(node) {
    var s = "", accept = self.filter ? self.filter.acceptNode(node) : NodeFilter.FILTER_ACCEPT, nodeType = node.nodeType, child;
    if(accept === NodeFilter.FILTER_ACCEPT || accept === NodeFilter.FILTER_SKIP) {
      child = node.firstChild;
      while(child) {
        s += serializeNode(child);
        child = child.nextSibling
      }
    }
    if(accept === NodeFilter.FILTER_ACCEPT) {
      if(nodeType === Node.ELEMENT_NODE && odfUtils.isParagraph(node)) {
        s += "\n"
      }else {
        if(nodeType === Node.TEXT_NODE && node.textContent) {
          s += node.textContent
        }
      }
    }
    return s
  }
  this.filter = null;
  this.writeToString = function(node) {
    var plainText;
    if(!node) {
      return""
    }
    plainText = serializeNode(node);
    if(plainText[plainText.length - 1] === "\n") {
      plainText = plainText.substr(0, plainText.length - 1)
    }
    return plainText
  }
};
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
runtime.loadClass("core.PositionFilter");
runtime.loadClass("odf.OdfUtils");
ops.TextPositionFilter = function TextPositionFilter(getRootNode) {
  var odfUtils = new odf.OdfUtils, ELEMENT_NODE = Node.ELEMENT_NODE, TEXT_NODE = Node.TEXT_NODE, FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT, FILTER_REJECT = core.PositionFilter.FilterResult.FILTER_REJECT;
  function checkLeftRight(container, leftNode, rightNode) {
    var r, firstPos, rightOfChar;
    if(leftNode) {
      if(odfUtils.isInlineRoot(leftNode) && odfUtils.isGroupingElement(rightNode)) {
        return FILTER_REJECT
      }
      r = odfUtils.lookLeftForCharacter(leftNode);
      if(r === 1) {
        return FILTER_ACCEPT
      }
      if(r === 2 && (odfUtils.scanRightForAnyCharacter(rightNode) || odfUtils.scanRightForAnyCharacter(odfUtils.nextNode(container)))) {
        return FILTER_ACCEPT
      }
    }
    firstPos = leftNode === null && odfUtils.isParagraph(container);
    rightOfChar = odfUtils.lookRightForCharacter(rightNode);
    if(firstPos) {
      if(rightOfChar) {
        return FILTER_ACCEPT
      }
      return odfUtils.scanRightForAnyCharacter(rightNode) ? FILTER_REJECT : FILTER_ACCEPT
    }
    if(!rightOfChar) {
      return FILTER_REJECT
    }
    leftNode = leftNode || odfUtils.previousNode(container);
    return odfUtils.scanLeftForAnyCharacter(leftNode) ? FILTER_REJECT : FILTER_ACCEPT
  }
  this.acceptPosition = function(iterator) {
    var container = iterator.container(), nodeType = container.nodeType, offset, text, leftChar, rightChar, leftNode, rightNode, r;
    if(nodeType !== ELEMENT_NODE && nodeType !== TEXT_NODE) {
      return FILTER_REJECT
    }
    if(nodeType === TEXT_NODE) {
      if(!odfUtils.isGroupingElement(container.parentNode) || odfUtils.isWithinTrackedChanges(container.parentNode, getRootNode())) {
        return FILTER_REJECT
      }
      offset = iterator.unfilteredDomOffset();
      text = container.data;
      runtime.assert(offset !== text.length, "Unexpected offset.");
      if(offset > 0) {
        leftChar = (text[offset - 1]);
        if(!odfUtils.isODFWhitespace(leftChar)) {
          return FILTER_ACCEPT
        }
        if(offset > 1) {
          leftChar = (text[offset - 2]);
          if(!odfUtils.isODFWhitespace(leftChar)) {
            r = FILTER_ACCEPT
          }else {
            if(!odfUtils.isODFWhitespace(text.substr(0, offset))) {
              return FILTER_REJECT
            }
          }
        }else {
          leftNode = odfUtils.previousNode(container);
          if(odfUtils.scanLeftForNonSpace(leftNode)) {
            r = FILTER_ACCEPT
          }
        }
        if(r === FILTER_ACCEPT) {
          return odfUtils.isTrailingWhitespace((container), offset) ? FILTER_REJECT : FILTER_ACCEPT
        }
        rightChar = (text[offset]);
        if(odfUtils.isODFWhitespace(rightChar)) {
          return FILTER_REJECT
        }
        return odfUtils.scanLeftForAnyCharacter(odfUtils.previousNode(container)) ? FILTER_REJECT : FILTER_ACCEPT
      }
      leftNode = iterator.leftNode();
      rightNode = container;
      container = (container.parentNode);
      r = checkLeftRight(container, leftNode, rightNode)
    }else {
      if(!odfUtils.isGroupingElement(container) || odfUtils.isWithinTrackedChanges(container, getRootNode())) {
        r = FILTER_REJECT
      }else {
        leftNode = iterator.leftNode();
        rightNode = iterator.rightNode();
        r = checkLeftRight(container, leftNode, rightNode)
      }
    }
    return r
  }
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
  function Namespaces(nsmap) {
    function invertMap(map) {
      var m = {}, i;
      for(i in map) {
        if(map.hasOwnProperty(i)) {
          m[map[i]] = i
        }
      }
      return m
    }
    var current = nsmap || {}, currentrev = invertMap(nsmap), levels = [current], levelsrev = [currentrev], level = 0;
    this.push = function() {
      level += 1;
      current = levels[level] = Object.create(current);
      currentrev = levelsrev[level] = Object.create(currentrev)
    };
    this.pop = function() {
      levels.pop();
      levelsrev.pop();
      level -= 1;
      current = levels[level];
      currentrev = levelsrev[level]
    };
    this.getLocalNamespaceDefinitions = function() {
      return currentrev
    };
    this.getQName = function(node) {
      var ns = node.namespaceURI, i = 0, p;
      if(!ns) {
        return node.localName
      }
      p = currentrev[ns];
      if(p) {
        return p + ":" + node.localName
      }
      do {
        if(p || !node.prefix) {
          p = "ns" + i;
          i += 1
        }else {
          p = node.prefix
        }
        if(current[p] === ns) {
          break
        }
        if(!current[p]) {
          current[p] = ns;
          currentrev[ns] = p;
          break
        }
        p = null
      }while(p === null);
      return p + ":" + node.localName
    }
  }
  function escapeContent(value) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;").replace(/"/g, "&quot;")
  }
  function serializeAttribute(qname, attr) {
    var escapedValue = typeof attr.value === "string" ? escapeContent(attr.value) : attr.value, s = qname + '="' + escapedValue + '"';
    return s
  }
  function startElement(ns, qname, element) {
    var s = "", atts = (element.attributes), length, i, attr, attstr = "", accept, prefix, nsmap;
    s += "<" + qname;
    length = atts.length;
    for(i = 0;i < length;i += 1) {
      attr = (atts.item(i));
      if(attr.namespaceURI !== "http://www.w3.org/2000/xmlns/") {
        accept = self.filter ? self.filter.acceptNode(attr) : NodeFilter.FILTER_ACCEPT;
        if(accept === NodeFilter.FILTER_ACCEPT) {
          attstr += " " + serializeAttribute(ns.getQName(attr), attr)
        }
      }
    }
    nsmap = ns.getLocalNamespaceDefinitions();
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
    s += attstr + ">";
    return s
  }
  function serializeNode(ns, node) {
    var s = "", accept = self.filter ? self.filter.acceptNode(node) : NodeFilter.FILTER_ACCEPT, child, qname;
    if(accept === NodeFilter.FILTER_ACCEPT && node.nodeType === Node.ELEMENT_NODE) {
      ns.push();
      qname = ns.getQName(node);
      s += startElement(ns, qname, node)
    }
    if(accept === NodeFilter.FILTER_ACCEPT || accept === NodeFilter.FILTER_SKIP) {
      child = node.firstChild;
      while(child) {
        s += serializeNode(ns, child);
        child = child.nextSibling
      }
      if(node.nodeValue) {
        s += escapeContent(node.nodeValue)
      }
    }
    if(qname) {
      s += "</" + qname + ">";
      ns.pop()
    }
    return s
  }
  this.filter = null;
  this.writeToString = function(node, nsmap) {
    if(!node) {
      return""
    }
    var ns = new Namespaces(nsmap);
    return serializeNode(ns, node)
  }
};
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
runtime.loadClass("odf.Namespaces");
runtime.loadClass("xmldom.LSSerializer");
runtime.loadClass("odf.OdfNodeFilter");
runtime.loadClass("odf.TextSerializer");
gui.Clipboard = function Clipboard() {
  var xmlSerializer, textSerializer, filter;
  this.setDataFromRange = function(e, range) {
    var result = true, setDataResult, clipboard = e.clipboardData, window = runtime.getWindow(), document = range.startContainer.ownerDocument, fragmentContainer;
    if(!clipboard && window) {
      clipboard = window.clipboardData
    }
    if(clipboard) {
      fragmentContainer = document.createElement("span");
      fragmentContainer.appendChild(range.cloneContents());
      setDataResult = clipboard.setData("text/plain", textSerializer.writeToString(fragmentContainer));
      result = result && setDataResult;
      setDataResult = clipboard.setData("text/html", xmlSerializer.writeToString(fragmentContainer, odf.Namespaces.namespaceMap));
      result = result && setDataResult;
      e.preventDefault()
    }else {
      result = false
    }
    return result
  };
  function init() {
    xmlSerializer = new xmldom.LSSerializer;
    textSerializer = new odf.TextSerializer;
    filter = new odf.OdfNodeFilter;
    xmlSerializer.filter = filter;
    textSerializer.filter = filter
  }
  init()
};
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
runtime.loadClass("core.Base64");
runtime.loadClass("core.Zip");
runtime.loadClass("core.DomUtils");
runtime.loadClass("xmldom.LSSerializer");
runtime.loadClass("odf.StyleInfo");
runtime.loadClass("odf.Namespaces");
runtime.loadClass("odf.OdfNodeFilter");
(function() {
  var styleInfo = new odf.StyleInfo, domUtils = new core.DomUtils, officens = "urn:oasis:names:tc:opendocument:xmlns:office:1.0", manifestns = "urn:oasis:names:tc:opendocument:xmlns:manifest:1.0", webodfns = "urn:webodf:names:scope", stylens = odf.Namespaces.stylens, nodeorder = ["meta", "settings", "scripts", "font-face-decls", "styles", "automatic-styles", "master-styles", "body"], automaticStylePrefix = (new Date).getTime() + "_webodf_", base64 = new core.Base64, documentStylesScope = "document-styles", 
  documentContentScope = "document-content";
  function getDirectChild(node, ns, name) {
    node = node ? node.firstChild : null;
    while(node) {
      if(node.localName === name && node.namespaceURI === ns) {
        return(node)
      }
      node = node.nextSibling
    }
    return null
  }
  function getNodePosition(child) {
    var i, l = nodeorder.length;
    for(i = 0;i < l;i += 1) {
      if(child.namespaceURI === officens && child.localName === nodeorder[i]) {
        return i
      }
    }
    return-1
  }
  function OdfStylesFilter(styleUsingElementsRoot, automaticStyles) {
    var usedStyleList = new styleInfo.UsedStyleList(styleUsingElementsRoot, automaticStyles), odfNodeFilter = new odf.OdfNodeFilter;
    this.acceptNode = function(node) {
      var result = odfNodeFilter.acceptNode(node);
      if(result === NodeFilter.FILTER_ACCEPT && (node.parentNode === automaticStyles && node.nodeType === Node.ELEMENT_NODE)) {
        if(usedStyleList.uses((node))) {
          result = NodeFilter.FILTER_ACCEPT
        }else {
          result = NodeFilter.FILTER_REJECT
        }
      }
      return result
    }
  }
  function OdfContentFilter(styleUsingElementsRoot, automaticStyles) {
    var odfStylesFilter = new OdfStylesFilter(styleUsingElementsRoot, automaticStyles);
    this.acceptNode = function(node) {
      var result = odfStylesFilter.acceptNode(node);
      if(result === NodeFilter.FILTER_ACCEPT && (node.parentNode && (node.parentNode.namespaceURI === odf.Namespaces.textns && (node.parentNode.localName === "s" || node.parentNode.localName === "tab")))) {
        result = NodeFilter.FILTER_REJECT
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
  odf.ODFElement = function ODFElement() {
  };
  odf.ODFDocumentElement = function ODFDocumentElement() {
  };
  odf.ODFDocumentElement.prototype = new odf.ODFElement;
  odf.ODFDocumentElement.prototype.constructor = odf.ODFDocumentElement;
  odf.ODFDocumentElement.prototype.automaticStyles;
  odf.ODFDocumentElement.prototype.body;
  odf.ODFDocumentElement.prototype.fontFaceDecls = null;
  odf.ODFDocumentElement.prototype.manifest = null;
  odf.ODFDocumentElement.prototype.masterStyles;
  odf.ODFDocumentElement.prototype.meta;
  odf.ODFDocumentElement.prototype.settings = null;
  odf.ODFDocumentElement.prototype.styles;
  odf.ODFDocumentElement.namespaceURI = officens;
  odf.ODFDocumentElement.localName = "document";
  odf.OdfPart = function OdfPart(name, mimetype, container, zip) {
    var self = this;
    this.size = 0;
    this.type = null;
    this.name = name;
    this.container = container;
    this.url = null;
    this.mimetype = mimetype;
    this.document = null;
    this.onstatereadychange = null;
    this.onchange;
    this.EMPTY = 0;
    this.LOADING = 1;
    this.DONE = 2;
    this.state = this.EMPTY;
    this.data = "";
    this.load = function() {
      if(zip === null) {
        return
      }
      this.mimetype = mimetype;
      zip.loadAsDataURL(name, mimetype, function(err, url) {
        if(err) {
          runtime.log(err)
        }
        self.url = url;
        if(self.onchange) {
          self.onchange(self)
        }
        if(self.onstatereadychange) {
          self.onstatereadychange(self)
        }
      })
    }
  };
  odf.OdfPart.prototype.load = function() {
  };
  odf.OdfPart.prototype.getUrl = function() {
    if(this.data) {
      return"data:;base64," + base64.toBase64(this.data)
    }
    return null
  };
  odf.OdfContainer = function OdfContainer(url, onstatereadychange) {
    var self = this, zip, partMimetypes = {}, contentElement;
    this.onstatereadychange = onstatereadychange;
    this.onchange = null;
    this.state = null;
    this.rootElement;
    function removeProcessingInstructions(element) {
      var n = element.firstChild, next, e;
      while(n) {
        next = n.nextSibling;
        if(n.nodeType === Node.ELEMENT_NODE) {
          e = (n);
          removeProcessingInstructions(e)
        }else {
          if(n.nodeType === Node.PROCESSING_INSTRUCTION_NODE) {
            element.removeChild(n)
          }
        }
        n = next
      }
    }
    function setAutomaticStylesScope(stylesRootElement, scope) {
      var n = stylesRootElement && stylesRootElement.firstChild;
      while(n) {
        if(n.nodeType === Node.ELEMENT_NODE) {
          (n).setAttributeNS(webodfns, "scope", scope)
        }
        n = n.nextSibling
      }
    }
    function getEnsuredMetaElement() {
      var root = self.rootElement, meta = root.meta;
      if(!meta) {
        root.meta = meta = document.createElementNS(officens, "meta");
        setChild(root, meta)
      }
      return meta
    }
    function getMetaData(metadataNs, metadataLocalName) {
      var node = self.rootElement.meta, textNode;
      node = node && node.firstChild;
      while(node && (node.namespaceURI !== metadataNs || node.localName !== metadataLocalName)) {
        node = node.nextSibling
      }
      node = node && node.firstChild;
      while(node && node.nodeType !== Node.TEXT_NODE) {
        node = node.nextSibling
      }
      if(node) {
        textNode = (node);
        return textNode.data
      }
      return null
    }
    function unusedKey(key, map1, map2) {
      var i = 0, postFixedKey;
      key = key.replace(/\d+$/, "");
      postFixedKey = key;
      while(map1.hasOwnProperty(postFixedKey) || map2.hasOwnProperty(postFixedKey)) {
        i += 1;
        postFixedKey = key + i
      }
      return postFixedKey
    }
    function mapByFontFaceName(fontFaceDecls) {
      var fn, result = {}, fontname;
      fn = fontFaceDecls.firstChild;
      while(fn) {
        if(fn.nodeType === Node.ELEMENT_NODE && (fn.namespaceURI === stylens && fn.localName === "font-face")) {
          fontname = (fn).getAttributeNS(stylens, "name");
          result[fontname] = fn
        }
        fn = fn.nextSibling
      }
      return result
    }
    function mergeFontFaceDecls(targetFontFaceDeclsRootElement, sourceFontFaceDeclsRootElement) {
      var e, s, fontFaceName, newFontFaceName, targetFontFaceDeclsMap, sourceFontFaceDeclsMap, fontFaceNameChangeMap = {};
      targetFontFaceDeclsMap = mapByFontFaceName(targetFontFaceDeclsRootElement);
      sourceFontFaceDeclsMap = mapByFontFaceName(sourceFontFaceDeclsRootElement);
      e = sourceFontFaceDeclsRootElement.firstElementChild;
      while(e) {
        s = e.nextElementSibling;
        if(e.namespaceURI === stylens && e.localName === "font-face") {
          fontFaceName = e.getAttributeNS(stylens, "name");
          if(targetFontFaceDeclsMap.hasOwnProperty(fontFaceName)) {
            if(!e.isEqualNode(targetFontFaceDeclsMap[fontFaceName])) {
              newFontFaceName = unusedKey(fontFaceName, targetFontFaceDeclsMap, sourceFontFaceDeclsMap);
              e.setAttributeNS(stylens, "style:name", newFontFaceName);
              targetFontFaceDeclsRootElement.appendChild(e);
              targetFontFaceDeclsMap[newFontFaceName] = e;
              delete sourceFontFaceDeclsMap[fontFaceName];
              fontFaceNameChangeMap[fontFaceName] = newFontFaceName
            }
          }else {
            targetFontFaceDeclsRootElement.appendChild(e);
            targetFontFaceDeclsMap[fontFaceName] = e;
            delete sourceFontFaceDeclsMap[fontFaceName]
          }
        }
        e = s
      }
      return fontFaceNameChangeMap
    }
    function cloneStylesInScope(stylesRootElement, scope) {
      var copy = null, e, s, scopeAttrValue;
      if(stylesRootElement) {
        copy = stylesRootElement.cloneNode(true);
        e = copy.firstElementChild;
        while(e) {
          s = e.nextElementSibling;
          scopeAttrValue = e.getAttributeNS(webodfns, "scope");
          if(scopeAttrValue && scopeAttrValue !== scope) {
            copy.removeChild(e)
          }
          e = s
        }
      }
      return copy
    }
    function cloneFontFaceDeclsUsedInStyles(fontFaceDeclsRootElement, stylesRootElementList) {
      var e, nextSibling, fontFaceName, copy = null, usedFontFaceDeclMap = {};
      if(fontFaceDeclsRootElement) {
        stylesRootElementList.forEach(function(stylesRootElement) {
          styleInfo.collectUsedFontFaces(usedFontFaceDeclMap, stylesRootElement)
        });
        copy = fontFaceDeclsRootElement.cloneNode(true);
        e = copy.firstElementChild;
        while(e) {
          nextSibling = e.nextElementSibling;
          fontFaceName = e.getAttributeNS(stylens, "name");
          if(!usedFontFaceDeclMap[fontFaceName]) {
            copy.removeChild(e)
          }
          e = nextSibling
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
        }catch(ignore) {
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
    function setRootElement(root) {
      contentElement = null;
      self.rootElement = (root);
      root.fontFaceDecls = getDirectChild(root, officens, "font-face-decls");
      root.styles = getDirectChild(root, officens, "styles");
      root.automaticStyles = getDirectChild(root, officens, "automatic-styles");
      root.masterStyles = getDirectChild(root, officens, "master-styles");
      root.body = getDirectChild(root, officens, "body");
      root.meta = getDirectChild(root, officens, "meta")
    }
    function handleFlatXml(xmldoc) {
      var root = importRootNode(xmldoc);
      if(!root || (root.localName !== "document" || root.namespaceURI !== officens)) {
        setState(OdfContainer.INVALID);
        return
      }
      setRootElement((root));
      setState(OdfContainer.DONE)
    }
    function handleStylesXml(xmldoc) {
      var node = importRootNode(xmldoc), root = self.rootElement, n;
      if(!node || (node.localName !== "document-styles" || node.namespaceURI !== officens)) {
        setState(OdfContainer.INVALID);
        return
      }
      root.fontFaceDecls = getDirectChild(node, officens, "font-face-decls");
      setChild(root, root.fontFaceDecls);
      n = getDirectChild(node, officens, "styles");
      root.styles = n || xmldoc.createElementNS(officens, "styles");
      setChild(root, root.styles);
      n = getDirectChild(node, officens, "automatic-styles");
      root.automaticStyles = n || xmldoc.createElementNS(officens, "automatic-styles");
      setAutomaticStylesScope(root.automaticStyles, documentStylesScope);
      setChild(root, root.automaticStyles);
      node = getDirectChild(node, officens, "master-styles");
      root.masterStyles = node || xmldoc.createElementNS(officens, "master-styles");
      setChild(root, root.masterStyles);
      styleInfo.prefixStyleNames(root.automaticStyles, automaticStylePrefix, root.masterStyles)
    }
    function handleContentXml(xmldoc) {
      var node = importRootNode(xmldoc), root, automaticStyles, fontFaceDecls, fontFaceNameChangeMap, c;
      if(!node || (node.localName !== "document-content" || node.namespaceURI !== officens)) {
        setState(OdfContainer.INVALID);
        return
      }
      root = self.rootElement;
      fontFaceDecls = getDirectChild(node, officens, "font-face-decls");
      if(root.fontFaceDecls && fontFaceDecls) {
        fontFaceNameChangeMap = mergeFontFaceDecls(root.fontFaceDecls, fontFaceDecls)
      }else {
        if(fontFaceDecls) {
          root.fontFaceDecls = fontFaceDecls;
          setChild(root, fontFaceDecls)
        }
      }
      automaticStyles = getDirectChild(node, officens, "automatic-styles");
      setAutomaticStylesScope(automaticStyles, documentContentScope);
      if(fontFaceNameChangeMap) {
        styleInfo.changeFontFaceNames(automaticStyles, fontFaceNameChangeMap)
      }
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
      node = getDirectChild(node, officens, "body");
      if(node === null) {
        throw"<office:body/> tag is mising.";
      }
      root.body = node;
      setChild(root, root.body)
    }
    function handleMetaXml(xmldoc) {
      var node = importRootNode(xmldoc), root;
      if(!node || (node.localName !== "document-meta" || node.namespaceURI !== officens)) {
        return
      }
      root = self.rootElement;
      root.meta = getDirectChild(node, officens, "meta");
      setChild(root, root.meta)
    }
    function handleSettingsXml(xmldoc) {
      var node = importRootNode(xmldoc), root;
      if(!node || (node.localName !== "document-settings" || node.namespaceURI !== officens)) {
        return
      }
      root = self.rootElement;
      root.settings = getDirectChild(node, officens, "settings");
      setChild(root, root.settings)
    }
    function handleManifestXml(xmldoc) {
      var node = importRootNode(xmldoc), root, e;
      if(!node || (node.localName !== "manifest" || node.namespaceURI !== manifestns)) {
        return
      }
      root = self.rootElement;
      root.manifest = (node);
      e = root.manifest.firstElementChild;
      while(e) {
        if(e.localName === "file-entry" && e.namespaceURI === manifestns) {
          partMimetypes[e.getAttributeNS(manifestns, "full-path")] = e.getAttributeNS(manifestns, "media-type")
        }
        e = e.nextElementSibling
      }
    }
    function loadNextComponent(remainingComponents) {
      var component = remainingComponents.shift();
      if(component) {
        zip.loadAsDOM(component.path, function(err, xmldoc) {
          component.handler(xmldoc);
          if(err || self.state === OdfContainer.INVALID) {
            return
          }
          loadNextComponent(remainingComponents)
        })
      }else {
        setState(OdfContainer.DONE)
      }
    }
    function loadComponents() {
      var componentOrder = [{path:"styles.xml", handler:handleStylesXml}, {path:"content.xml", handler:handleContentXml}, {path:"meta.xml", handler:handleMetaXml}, {path:"settings.xml", handler:handleSettingsXml}, {path:"META-INF/manifest.xml", handler:handleManifestXml}];
      loadNextComponent(componentOrder)
    }
    function createDocumentElement(name) {
      var s = "";
      function defineNamespace(prefix, ns) {
        s += " xmlns:" + prefix + '="' + ns + '"'
      }
      odf.Namespaces.forEachPrefix(defineNamespace);
      return'<?xml version="1.0" encoding="UTF-8"?><office:' + name + " " + s + ' office:version="1.2">'
    }
    function serializeMetaXml() {
      var serializer = new xmldom.LSSerializer, s = createDocumentElement("document-meta");
      serializer.filter = new odf.OdfNodeFilter;
      s += serializer.writeToString(self.rootElement.meta, odf.Namespaces.namespaceMap);
      s += "</office:document-meta>";
      return s
    }
    function createManifestEntry(fullPath, mediaType) {
      var element = document.createElementNS(manifestns, "manifest:file-entry");
      element.setAttributeNS(manifestns, "manifest:full-path", fullPath);
      element.setAttributeNS(manifestns, "manifest:media-type", mediaType);
      return element
    }
    function serializeManifestXml() {
      var header = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n', xml = '<manifest:manifest xmlns:manifest="' + manifestns + '" manifest:version="1.2"></manifest:manifest>', manifest = (runtime.parseXML(xml)), manifestRoot = getDirectChild(manifest, manifestns, "manifest"), serializer = new xmldom.LSSerializer, fullPath;
      for(fullPath in partMimetypes) {
        if(partMimetypes.hasOwnProperty(fullPath)) {
          manifestRoot.appendChild(createManifestEntry(fullPath, partMimetypes[fullPath]))
        }
      }
      serializer.filter = new odf.OdfNodeFilter;
      return header + serializer.writeToString(manifest, odf.Namespaces.namespaceMap)
    }
    function serializeSettingsXml() {
      var serializer = new xmldom.LSSerializer, s = createDocumentElement("document-settings");
      serializer.filter = new odf.OdfNodeFilter;
      s += serializer.writeToString(self.rootElement.settings, odf.Namespaces.namespaceMap);
      s += "</office:document-settings>";
      return s
    }
    function serializeStylesXml() {
      var fontFaceDecls, automaticStyles, masterStyles, nsmap = odf.Namespaces.namespaceMap, serializer = new xmldom.LSSerializer, s = createDocumentElement("document-styles");
      automaticStyles = cloneStylesInScope(self.rootElement.automaticStyles, documentStylesScope);
      masterStyles = (self.rootElement.masterStyles.cloneNode(true));
      fontFaceDecls = cloneFontFaceDeclsUsedInStyles(self.rootElement.fontFaceDecls, [masterStyles, self.rootElement.styles, automaticStyles]);
      styleInfo.removePrefixFromStyleNames(automaticStyles, automaticStylePrefix, masterStyles);
      serializer.filter = new OdfStylesFilter(masterStyles, automaticStyles);
      s += serializer.writeToString(fontFaceDecls, nsmap);
      s += serializer.writeToString(self.rootElement.styles, nsmap);
      s += serializer.writeToString(automaticStyles, nsmap);
      s += serializer.writeToString(masterStyles, nsmap);
      s += "</office:document-styles>";
      return s
    }
    function serializeContentXml() {
      var fontFaceDecls, automaticStyles, nsmap = odf.Namespaces.namespaceMap, serializer = new xmldom.LSSerializer, s = createDocumentElement("document-content");
      automaticStyles = cloneStylesInScope(self.rootElement.automaticStyles, documentContentScope);
      fontFaceDecls = cloneFontFaceDeclsUsedInStyles(self.rootElement.fontFaceDecls, [automaticStyles]);
      serializer.filter = new OdfContentFilter(self.rootElement.body, automaticStyles);
      s += serializer.writeToString(fontFaceDecls, nsmap);
      s += serializer.writeToString(automaticStyles, nsmap);
      s += serializer.writeToString(self.rootElement.body, nsmap);
      s += "</office:document-content>";
      return s
    }
    function createElement(type) {
      var original = document.createElementNS(type.namespaceURI, type.localName), method, iface = new type.Type;
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
    this.setRootElement = setRootElement;
    this.getContentElement = function() {
      var body;
      if(!contentElement) {
        body = self.rootElement.body;
        contentElement = getDirectChild(body, officens, "text") || (getDirectChild(body, officens, "presentation") || getDirectChild(body, officens, "spreadsheet"))
      }
      if(!contentElement) {
        throw"Could not find content element in <office:body/>.";
      }
      return contentElement
    };
    this.getDocumentType = function() {
      var content = self.getContentElement();
      return content && content.localName
    };
    this.getPart = function(partname) {
      return new odf.OdfPart(partname, partMimetypes[partname], self, zip)
    };
    this.getPartData = function(url, callback) {
      zip.load(url, callback)
    };
    function setMetadata(setProperties, removedPropertyNames) {
      var metaElement = getEnsuredMetaElement();
      if(setProperties) {
        domUtils.mapKeyValObjOntoNode(metaElement, setProperties, odf.Namespaces.lookupNamespaceURI)
      }
      if(removedPropertyNames) {
        domUtils.removeKeyElementsFromNode(metaElement, removedPropertyNames, odf.Namespaces.lookupNamespaceURI)
      }
    }
    this.setMetadata = setMetadata;
    this.incrementEditingCycles = function() {
      var currentValueString = getMetaData(odf.Namespaces.metans, "editing-cycles"), currentCycles = currentValueString ? parseInt(currentValueString, 10) : 0;
      if(isNaN(currentCycles)) {
        currentCycles = 0
      }
      setMetadata({"meta:editing-cycles":currentCycles + 1}, null)
    };
    function updateMetadataForSaving() {
      var generatorString, window = runtime.getWindow();
      generatorString = "WebODF/" + (String(typeof webodf_version) !== "undefined" ? webodf_version : "FromSource");
      if(window) {
        generatorString = generatorString + " " + window.navigator.userAgent
      }
      setMetadata({"meta:generator":generatorString}, null)
    }
    function createEmptyTextDocument() {
      var emptyzip = new core.Zip("", null), data = runtime.byteArrayFromString("application/vnd.oasis.opendocument.text", "utf8"), root = self.rootElement, text = document.createElementNS(officens, "text");
      emptyzip.save("mimetype", data, false, new Date);
      function addToplevelElement(memberName, realLocalName) {
        var element;
        if(!realLocalName) {
          realLocalName = memberName
        }
        element = document.createElementNS(officens, realLocalName);
        root[memberName] = element;
        root.appendChild(element)
      }
      addToplevelElement("meta");
      addToplevelElement("settings");
      addToplevelElement("scripts");
      addToplevelElement("fontFaceDecls", "font-face-decls");
      addToplevelElement("styles");
      addToplevelElement("automaticStyles", "automatic-styles");
      addToplevelElement("masterStyles", "master-styles");
      addToplevelElement("body");
      root.body.appendChild(text);
      setState(OdfContainer.DONE);
      return emptyzip
    }
    function fillZip() {
      var data, date = new Date;
      updateMetadataForSaving();
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
    this.setBlob = function(filename, mimetype, content) {
      var data = base64.convertBase64ToByteArray(content), date = new Date;
      zip.save(filename, data, false, date);
      if(partMimetypes.hasOwnProperty(filename)) {
        runtime.log(filename + " has been overwritten.")
      }
      partMimetypes[filename] = mimetype
    };
    this.removeBlob = function(filename) {
      var foundAndRemoved = zip.remove(filename);
      runtime.assert(foundAndRemoved, "file is not found: " + filename);
      delete partMimetypes[filename]
    };
    this.state = OdfContainer.LOADING;
    this.rootElement = (createElement({Type:odf.ODFDocumentElement, namespaceURI:odf.ODFDocumentElement.namespaceURI, localName:odf.ODFDocumentElement.localName}));
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
})();
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
runtime.loadClass("core.Base64");
runtime.loadClass("xmldom.XPath");
runtime.loadClass("odf.OdfContainer");
(function() {
  var xpath = xmldom.XPath, base64 = new core.Base64;
  function getEmbeddedFontDeclarations(fontFaceDecls) {
    var decls = {}, fonts, i, font, name, uris, href, family;
    if(!fontFaceDecls) {
      return decls
    }
    fonts = xpath.getODFElementsWithXPath(fontFaceDecls, "style:font-face[svg:font-face-src]", odf.Namespaces.lookupNamespaceURI);
    for(i = 0;i < fonts.length;i += 1) {
      font = fonts[i];
      name = font.getAttributeNS(odf.Namespaces.stylens, "name");
      family = font.getAttributeNS(odf.Namespaces.svgns, "font-family");
      uris = xpath.getODFElementsWithXPath(font, "svg:font-face-src/svg:font-face-uri", odf.Namespaces.lookupNamespaceURI);
      if(uris.length > 0) {
        href = uris[0].getAttributeNS(odf.Namespaces.xlinkns, "href");
        decls[name] = {href:href, family:family}
      }
    }
    return decls
  }
  function addFontToCSS(name, font, fontdata, stylesheet) {
    var cssFamily = font.family || name, rule = "@font-face { font-family: '" + cssFamily + "'; src: " + "url(data:application/x-font-ttf;charset=binary;base64," + base64.convertUTF8ArrayToBase64(fontdata) + ') format("truetype"); }';
    try {
      stylesheet.insertRule(rule, stylesheet.cssRules.length)
    }catch(e) {
      runtime.log("Problem inserting rule in CSS: " + runtime.toJson(e) + "\nRule: " + rule)
    }
  }
  function loadFontIntoCSS(embeddedFontDeclarations, odfContainer, pos, stylesheet, callback) {
    var name, i = 0, n;
    for(n in embeddedFontDeclarations) {
      if(embeddedFontDeclarations.hasOwnProperty(n)) {
        if(i === pos) {
          name = n;
          break
        }
        i += 1
      }
    }
    if(!name) {
      if(callback) {
        callback()
      }
      return
    }
    odfContainer.getPartData(embeddedFontDeclarations[name].href, function(err, fontdata) {
      if(err) {
        runtime.log(err)
      }else {
        if(!fontdata) {
          runtime.log("missing font data for " + embeddedFontDeclarations[name].href)
        }else {
          addFontToCSS(name, embeddedFontDeclarations[name], fontdata, stylesheet)
        }
      }
      loadFontIntoCSS(embeddedFontDeclarations, odfContainer, pos + 1, stylesheet, callback)
    })
  }
  function loadFontsIntoCSS(embeddedFontDeclarations, odfContainer, stylesheet) {
    loadFontIntoCSS(embeddedFontDeclarations, odfContainer, 0, stylesheet)
  }
  odf.FontLoader = function FontLoader() {
    this.loadFonts = function(odfContainer, stylesheet) {
      var embeddedFontDeclarations, fontFaceDecls = odfContainer.rootElement.fontFaceDecls;
      while(stylesheet.cssRules.length) {
        stylesheet.deleteRule(stylesheet.cssRules.length - 1)
      }
      if(fontFaceDecls) {
        embeddedFontDeclarations = getEmbeddedFontDeclarations(fontFaceDecls);
        loadFontsIntoCSS(embeddedFontDeclarations, odfContainer, stylesheet)
      }
    }
  };
  return odf.FontLoader
})();
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
runtime.loadClass("core.Utils");
odf.ObjectNameGenerator = function ObjectNameGenerator(odfContainer, memberId) {
  var stylens = odf.Namespaces.stylens, drawns = odf.Namespaces.drawns, xlinkns = odf.Namespaces.xlinkns, domUtils = new core.DomUtils, utils = new core.Utils, memberIdHash = utils.hashString(memberId), styleNameGenerator = null, frameNameGenerator = null, imageNameGenerator = null, existingFrameNames = {}, existingImageNames = {};
  function NameGenerator(prefix, findExistingNames) {
    var reportedNames = {};
    this.generateName = function() {
      var existingNames = findExistingNames(), startIndex = 0, name;
      do {
        name = prefix + startIndex;
        startIndex += 1
      }while(reportedNames[name] || existingNames[name]);
      reportedNames[name] = true;
      return name
    }
  }
  function getAllStyleNames() {
    var styleElements = [odfContainer.rootElement.automaticStyles, odfContainer.rootElement.styles], styleNames = {};
    function getStyleNames(styleListElement) {
      var e = styleListElement.firstElementChild;
      while(e) {
        if(e.namespaceURI === stylens && e.localName === "style") {
          styleNames[e.getAttributeNS(stylens, "name")] = true
        }
        e = e.nextElementSibling
      }
    }
    styleElements.forEach(getStyleNames);
    return styleNames
  }
  this.generateStyleName = function() {
    if(styleNameGenerator === null) {
      styleNameGenerator = new NameGenerator("auto" + memberIdHash + "_", function() {
        return getAllStyleNames()
      })
    }
    return styleNameGenerator.generateName()
  };
  this.generateFrameName = function() {
    if(frameNameGenerator === null) {
      var nodes = domUtils.getElementsByTagNameNS(odfContainer.rootElement.body, drawns, "frame");
      nodes.forEach(function(frame) {
        existingFrameNames[frame.getAttributeNS(drawns, "name")] = true
      });
      frameNameGenerator = new NameGenerator("fr" + memberIdHash + "_", function() {
        return existingFrameNames
      })
    }
    return frameNameGenerator.generateName()
  };
  this.generateImageName = function() {
    if(imageNameGenerator === null) {
      var nodes = domUtils.getElementsByTagNameNS(odfContainer.rootElement.body, drawns, "image");
      nodes.forEach(function(image) {
        var path = image.getAttributeNS(xlinkns, "href");
        path = path.substring("Pictures/".length, path.lastIndexOf("."));
        existingImageNames[path] = true
      });
      imageNameGenerator = new NameGenerator("img" + memberIdHash + "_", function() {
        return existingImageNames
      })
    }
    return imageNameGenerator.generateName()
  }
};
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
runtime.loadClass("core.Utils");
runtime.loadClass("odf.ObjectNameGenerator");
runtime.loadClass("odf.Namespaces");
runtime.loadClass("odf.OdfContainer");
runtime.loadClass("odf.StyleInfo");
runtime.loadClass("odf.OdfUtils");
odf.Formatting = function Formatting() {
  var odfContainer, styleInfo = new odf.StyleInfo, svgns = odf.Namespaces.svgns, stylens = odf.Namespaces.stylens, textns = odf.Namespaces.textns, numberns = odf.Namespaces.numberns, fons = odf.Namespaces.fons, odfUtils = new odf.OdfUtils, domUtils = new core.DomUtils, utils = new core.Utils, builtInDefaultStyleAttributesByFamily = {"paragraph":{"style:paragraph-properties":{"fo:text-align":"left"}}}, defaultPageFormatSettings = {width:21.001, height:29.7, margin:2, padding:0};
  function getSystemDefaultStyleAttributes(styleFamily) {
    var result, builtInDefaultStyleAttributes = builtInDefaultStyleAttributesByFamily[styleFamily];
    if(builtInDefaultStyleAttributes) {
      result = utils.mergeObjects({}, builtInDefaultStyleAttributes)
    }else {
      result = {}
    }
    return result
  }
  this.getSystemDefaultStyleAttributes = getSystemDefaultStyleAttributes;
  this.setOdfContainer = function(odfcontainer) {
    odfContainer = odfcontainer
  };
  function getDirectChild(node, ns, name) {
    var e = node && node.firstElementChild;
    while(e) {
      if(e.namespaceURI === ns && e.localName === name) {
        break
      }
      e = e.nextElementSibling
    }
    return e
  }
  function getFontMap() {
    var fontFaceDecls = odfContainer.rootElement.fontFaceDecls, fontFaceDeclsMap = {}, node, name, family;
    node = fontFaceDecls && fontFaceDecls.firstElementChild;
    while(node) {
      name = node.getAttributeNS(stylens, "name");
      if(name) {
        family = node.getAttributeNS(svgns, "font-family");
        if(family || node.getElementsByTagNameNS(svgns, "font-face-uri").length > 0) {
          fontFaceDeclsMap[name] = family
        }
      }
      node = node.nextElementSibling
    }
    return fontFaceDeclsMap
  }
  this.getFontMap = getFontMap;
  this.getAvailableParagraphStyles = function() {
    var node = odfContainer.rootElement.styles, p_family, p_name, p_displayName, paragraphStyles = [];
    node = node && node.firstElementChild;
    while(node) {
      if(node.localName === "style" && node.namespaceURI === stylens) {
        p_family = node.getAttributeNS(stylens, "family");
        if(p_family === "paragraph") {
          p_name = node.getAttributeNS(stylens, "name");
          p_displayName = node.getAttributeNS(stylens, "display-name") || p_name;
          if(p_name && p_displayName) {
            paragraphStyles.push({name:p_name, displayName:p_displayName})
          }
        }
      }
      node = node.nextElementSibling
    }
    return paragraphStyles
  };
  this.isStyleUsed = function(styleElement) {
    var hasDerivedStyles, isUsed, root = odfContainer.rootElement;
    hasDerivedStyles = styleInfo.hasDerivedStyles(root, odf.Namespaces.lookupNamespaceURI, styleElement);
    isUsed = (new styleInfo.UsedStyleList(root.styles)).uses(styleElement) || ((new styleInfo.UsedStyleList(root.automaticStyles)).uses(styleElement) || (new styleInfo.UsedStyleList(root.body)).uses(styleElement));
    return hasDerivedStyles || isUsed
  };
  function getDefaultStyleElement(family) {
    var node = odfContainer.rootElement.styles.firstElementChild;
    while(node) {
      if(node.namespaceURI === stylens && (node.localName === "default-style" && node.getAttributeNS(stylens, "family") === family)) {
        return node
      }
      node = node.nextElementSibling
    }
    return null
  }
  this.getDefaultStyleElement = getDefaultStyleElement;
  function getStyleElement(styleName, family, styleElements) {
    var node, nodeStyleName, styleListElement, i;
    styleElements = styleElements || [odfContainer.rootElement.automaticStyles, odfContainer.rootElement.styles];
    for(i = 0;i < styleElements.length;i += 1) {
      styleListElement = (styleElements[i]);
      node = styleListElement.firstElementChild;
      while(node) {
        nodeStyleName = node.getAttributeNS(stylens, "name");
        if(node.namespaceURI === stylens && (node.localName === "style" && (node.getAttributeNS(stylens, "family") === family && nodeStyleName === styleName))) {
          return node
        }
        if(family === "list-style" && (node.namespaceURI === textns && (node.localName === "list-style" && nodeStyleName === styleName))) {
          return node
        }
        if(family === "data" && (node.namespaceURI === numberns && nodeStyleName === styleName)) {
          return node
        }
        node = node.nextElementSibling
      }
    }
    return null
  }
  this.getStyleElement = getStyleElement;
  function getStyleAttributes(styleNode) {
    var i, a, map, ai, propertiesMap = {}, propertiesNode = styleNode.firstElementChild;
    while(propertiesNode) {
      if(propertiesNode.namespaceURI === stylens) {
        map = propertiesMap[propertiesNode.nodeName] = {};
        a = propertiesNode.attributes;
        for(i = 0;i < a.length;i += 1) {
          ai = (a.item(i));
          map[ai.name] = ai.value
        }
      }
      propertiesNode = propertiesNode.nextElementSibling
    }
    a = styleNode.attributes;
    for(i = 0;i < a.length;i += 1) {
      ai = (a.item(i));
      propertiesMap[ai.name] = ai.value
    }
    return propertiesMap
  }
  this.getStyleAttributes = getStyleAttributes;
  function getInheritedStyleAttributes(styleNode, includeSystemDefault) {
    var styleListElement = odfContainer.rootElement.styles, parentStyleName, propertiesMap, inheritedPropertiesMap = {}, styleFamily = styleNode.getAttributeNS(stylens, "family"), node = styleNode;
    while(node) {
      propertiesMap = getStyleAttributes(node);
      inheritedPropertiesMap = utils.mergeObjects(propertiesMap, inheritedPropertiesMap);
      parentStyleName = node.getAttributeNS(stylens, "parent-style-name");
      if(parentStyleName) {
        node = getStyleElement(parentStyleName, styleFamily, [styleListElement])
      }else {
        node = null
      }
    }
    node = getDefaultStyleElement(styleFamily);
    if(node) {
      propertiesMap = getStyleAttributes(node);
      inheritedPropertiesMap = utils.mergeObjects(propertiesMap, inheritedPropertiesMap)
    }
    if(includeSystemDefault) {
      propertiesMap = getSystemDefaultStyleAttributes(styleFamily);
      if(propertiesMap) {
        inheritedPropertiesMap = utils.mergeObjects(propertiesMap, inheritedPropertiesMap)
      }
    }
    return inheritedPropertiesMap
  }
  this.getInheritedStyleAttributes = getInheritedStyleAttributes;
  this.getFirstCommonParentStyleNameOrSelf = function(styleName) {
    var automaticStyleElementList = odfContainer.rootElement.automaticStyles, styleElementList = odfContainer.rootElement.styles, styleElement;
    styleElement = getStyleElement(styleName, "paragraph", [automaticStyleElementList]);
    while(styleElement) {
      styleName = styleElement.getAttributeNS(stylens, "parent-style-name");
      styleElement = getStyleElement(styleName, "paragraph", [automaticStyleElementList])
    }
    styleElement = getStyleElement(styleName, "paragraph", [styleElementList]);
    if(!styleElement) {
      return null
    }
    return styleName
  };
  this.hasParagraphStyle = function(styleName) {
    return Boolean(getStyleElement(styleName, "paragraph"))
  };
  function buildStyleChain(node, collectedChains) {
    var parent = (node.nodeType === Node.TEXT_NODE ? node.parentNode : node), nodeStyles, appliedStyles = [], chainKey = "", foundContainer = false;
    while(parent) {
      if(!foundContainer && odfUtils.isGroupingElement(parent)) {
        foundContainer = true
      }
      nodeStyles = styleInfo.determineStylesForNode(parent);
      if(nodeStyles) {
        appliedStyles.push(nodeStyles)
      }
      parent = parent.parentElement
    }
    function chainStyles(usedStyleMap) {
      Object.keys(usedStyleMap).forEach(function(styleFamily) {
        Object.keys(usedStyleMap[styleFamily]).forEach(function(styleName) {
          chainKey += "|" + styleFamily + ":" + styleName + "|"
        })
      })
    }
    if(foundContainer) {
      appliedStyles.forEach(chainStyles);
      if(collectedChains) {
        collectedChains[chainKey] = appliedStyles
      }
    }
    return foundContainer ? appliedStyles : undefined
  }
  function calculateAppliedStyle(styleChain) {
    var mergedChildStyle = {orderedStyles:[]};
    styleChain.forEach(function(elementStyleSet) {
      Object.keys((elementStyleSet)).forEach(function(styleFamily) {
        var styleName = Object.keys(elementStyleSet[styleFamily])[0], styleElement, parentStyle, displayName;
        styleElement = getStyleElement(styleName, styleFamily);
        if(styleElement) {
          parentStyle = getInheritedStyleAttributes((styleElement));
          mergedChildStyle = utils.mergeObjects(parentStyle, mergedChildStyle);
          displayName = styleElement.getAttributeNS(stylens, "display-name")
        }else {
          runtime.log("No style element found for '" + styleName + "' of family '" + styleFamily + "'")
        }
        mergedChildStyle.orderedStyles.push({name:styleName, family:styleFamily, displayName:displayName})
      })
    });
    return mergedChildStyle
  }
  this.getAppliedStyles = function(textNodes) {
    var styleChains = {}, styles = [];
    textNodes.forEach(function(n) {
      buildStyleChain(n, styleChains)
    });
    Object.keys(styleChains).forEach(function(key) {
      styles.push(calculateAppliedStyle(styleChains[key]))
    });
    return styles
  };
  this.getAppliedStylesForElement = function(node) {
    var styleChain;
    styleChain = buildStyleChain(node);
    return styleChain ? calculateAppliedStyle(styleChain) : undefined
  };
  this.updateStyle = function(styleNode, properties) {
    var fontName, fontFaceNode;
    domUtils.mapObjOntoNode(styleNode, properties, odf.Namespaces.lookupNamespaceURI);
    fontName = properties["style:text-properties"] && properties["style:text-properties"]["style:font-name"];
    if(fontName && !getFontMap().hasOwnProperty(fontName)) {
      fontFaceNode = styleNode.ownerDocument.createElementNS(stylens, "style:font-face");
      fontFaceNode.setAttributeNS(stylens, "style:name", fontName);
      fontFaceNode.setAttributeNS(svgns, "svg:font-family", fontName);
      odfContainer.rootElement.fontFaceDecls.appendChild(fontFaceNode)
    }
  };
  function isAutomaticStyleElement(styleNode) {
    return styleNode.parentNode === odfContainer.rootElement.automaticStyles
  }
  this.createDerivedStyleObject = function(parentStyleName, family, overrides) {
    var originalStyleElement = (getStyleElement(parentStyleName, family)), newStyleObject;
    runtime.assert(Boolean(originalStyleElement), "No style element found for '" + parentStyleName + "' of family '" + family + "'");
    if(isAutomaticStyleElement(originalStyleElement)) {
      newStyleObject = getStyleAttributes(originalStyleElement)
    }else {
      newStyleObject = {"style:parent-style-name":parentStyleName}
    }
    newStyleObject["style:family"] = family;
    utils.mergeObjects(newStyleObject, overrides);
    return newStyleObject
  };
  this.getDefaultTabStopDistance = function() {
    var defaultParagraph = getDefaultStyleElement("paragraph"), paragraphProperties = defaultParagraph && defaultParagraph.firstElementChild, tabStopDistance;
    while(paragraphProperties) {
      if(paragraphProperties.namespaceURI === stylens && paragraphProperties.localName === "paragraph-properties") {
        tabStopDistance = paragraphProperties.getAttributeNS(stylens, "tab-stop-distance")
      }
      paragraphProperties = paragraphProperties.nextElementSibling
    }
    if(!tabStopDistance) {
      tabStopDistance = "1.25cm"
    }
    return odfUtils.parseNonNegativeLength(tabStopDistance)
  };
  function getPageLayoutStyleElement(styleName, styleFamily) {
    var masterPageName, layoutName, pageLayoutElements, node, i, styleElement = getStyleElement(styleName, styleFamily);
    runtime.assert(styleFamily === "paragraph" || styleFamily === "table", "styleFamily has to be either paragraph or table");
    if(styleElement) {
      masterPageName = styleElement.getAttributeNS(stylens, "master-page-name") || "Standard";
      node = odfContainer.rootElement.masterStyles.lastElementChild;
      while(node) {
        if(node.getAttributeNS(stylens, "name") === masterPageName) {
          break
        }
        node = node.previousElementSibling
      }
      layoutName = node.getAttributeNS(stylens, "page-layout-name");
      pageLayoutElements = domUtils.getElementsByTagNameNS(odfContainer.rootElement.automaticStyles, stylens, "page-layout");
      for(i = 0;i < pageLayoutElements.length;i += 1) {
        node = pageLayoutElements[i];
        if(node.getAttributeNS(stylens, "name") === layoutName) {
          return(node)
        }
      }
    }
    return null
  }
  function lengthInCm(length, defaultValue) {
    var result = odfUtils.parseLength(length), value = defaultValue;
    if(result) {
      switch(result.unit) {
        case "cm":
          value = result.value;
          break;
        case "mm":
          value = result.value * 0.1;
          break;
        case "in":
          value = result.value * 2.54;
          break;
        case "pt":
          value = result.value * 0.035277778;
          break;
        case "pc":
        ;
        case "px":
        ;
        case "em":
          break;
        default:
          runtime.log("Unit identifier: " + result.unit + " is not supported.");
          break
      }
    }
    return value
  }
  this.getContentSize = function(styleName, styleFamily) {
    var pageLayoutElement, props, printOrientation, defaultOrientedPageWidth, defaultOrientedPageHeight, pageWidth, pageHeight, margin, marginLeft, marginRight, marginTop, marginBottom, padding, paddingLeft, paddingRight, paddingTop, paddingBottom;
    pageLayoutElement = getPageLayoutStyleElement(styleName, styleFamily);
    if(!pageLayoutElement) {
      pageLayoutElement = getDirectChild(odfContainer.rootElement.styles, stylens, "default-page-layout")
    }
    props = getDirectChild(pageLayoutElement, stylens, "page-layout-properties");
    if(props) {
      printOrientation = props.getAttributeNS(stylens, "print-orientation") || "portrait";
      if(printOrientation === "portrait") {
        defaultOrientedPageWidth = defaultPageFormatSettings.width;
        defaultOrientedPageHeight = defaultPageFormatSettings.height
      }else {
        defaultOrientedPageWidth = defaultPageFormatSettings.height;
        defaultOrientedPageHeight = defaultPageFormatSettings.width
      }
      pageWidth = lengthInCm(props.getAttributeNS(fons, "page-width"), defaultOrientedPageWidth);
      pageHeight = lengthInCm(props.getAttributeNS(fons, "page-height"), defaultOrientedPageHeight);
      margin = lengthInCm(props.getAttributeNS(fons, "margin"), null);
      if(margin === null) {
        marginLeft = lengthInCm(props.getAttributeNS(fons, "margin-left"), defaultPageFormatSettings.margin);
        marginRight = lengthInCm(props.getAttributeNS(fons, "margin-right"), defaultPageFormatSettings.margin);
        marginTop = lengthInCm(props.getAttributeNS(fons, "margin-top"), defaultPageFormatSettings.margin);
        marginBottom = lengthInCm(props.getAttributeNS(fons, "margin-bottom"), defaultPageFormatSettings.margin)
      }else {
        marginLeft = marginRight = marginTop = marginBottom = margin
      }
      padding = lengthInCm(props.getAttributeNS(fons, "padding"), null);
      if(padding === null) {
        paddingLeft = lengthInCm(props.getAttributeNS(fons, "padding-left"), defaultPageFormatSettings.padding);
        paddingRight = lengthInCm(props.getAttributeNS(fons, "padding-right"), defaultPageFormatSettings.padding);
        paddingTop = lengthInCm(props.getAttributeNS(fons, "padding-top"), defaultPageFormatSettings.padding);
        paddingBottom = lengthInCm(props.getAttributeNS(fons, "padding-bottom"), defaultPageFormatSettings.padding)
      }else {
        paddingLeft = paddingRight = paddingTop = paddingBottom = padding
      }
    }
    return{width:pageWidth - marginLeft - marginRight - paddingLeft - paddingRight, height:pageHeight - marginTop - marginBottom - paddingTop - paddingBottom}
  }
};
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
runtime.loadClass("odf.OdfContainer");
runtime.loadClass("odf.Formatting");
runtime.loadClass("xmldom.XPath");
runtime.loadClass("odf.FontLoader");
runtime.loadClass("odf.Style2CSS");
runtime.loadClass("odf.OdfUtils");
runtime.loadClass("gui.AnnotationViewManager");
(function() {
  function LoadingQueue() {
    var queue = [], taskRunning = false;
    function run(task) {
      taskRunning = true;
      runtime.setTimeout(function() {
        try {
          task()
        }catch(e) {
          runtime.log(String(e))
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
    var sheet = (css.sheet), position = 1;
    function updateCSS() {
      while(sheet.cssRules.length > 0) {
        sheet.deleteRule(0)
      }
      sheet.insertRule("#shadowContent draw|page {display:none;}", 0);
      sheet.insertRule("office|presentation draw|page {display:none;}", 1);
      sheet.insertRule("#shadowContent draw|page:nth-of-type(" + position + ") {display:block;}", 2);
      sheet.insertRule("office|presentation draw|page:nth-of-type(" + position + ") {display:block;}", 3)
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
    this.css = css;
    this.destroy = function(callback) {
      css.parentNode.removeChild(css);
      callback()
    }
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
  var drawns = odf.Namespaces.drawns, fons = odf.Namespaces.fons, officens = odf.Namespaces.officens, stylens = odf.Namespaces.stylens, svgns = odf.Namespaces.svgns, tablens = odf.Namespaces.tablens, textns = odf.Namespaces.textns, xlinkns = odf.Namespaces.xlinkns, xmlns = odf.Namespaces.xmlns, presentationns = odf.Namespaces.presentationns, webodfhelperns = "urn:webodf:names:helper", window = runtime.getWindow(), xpath = xmldom.XPath, odfUtils = new odf.OdfUtils, domUtils = new core.DomUtils;
  function clear(element) {
    while(element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }
  function handleStyles(odfcontainer, formatting, stylesxmlcss) {
    var style2css = new odf.Style2CSS;
    style2css.style2css(odfcontainer.getDocumentType(), (stylesxmlcss.sheet), formatting.getFontMap(), odfcontainer.rootElement.styles, odfcontainer.rootElement.automaticStyles)
  }
  function handleFonts(odfContainer, fontcss) {
    var fontLoader = new odf.FontLoader;
    fontLoader.loadFonts(odfContainer, (fontcss.sheet))
  }
  function getMasterPageElement(odfContainer, masterPageName) {
    if(!masterPageName) {
      return null
    }
    var masterStyles = odfContainer.rootElement.masterStyles, masterPageElement = masterStyles.firstElementChild;
    while(masterPageElement) {
      if(masterPageElement.getAttributeNS(stylens, "name") === masterPageName && (masterPageElement.localName === "master-page" && masterPageElement.namespaceURI === stylens)) {
        break
      }
    }
    return masterPageElement
  }
  function dropTemplateDrawFrames(clonedNode) {
    var i, element, presentationClass, clonedDrawFrameElements = clonedNode.getElementsByTagNameNS(drawns, "frame");
    for(i = 0;i < clonedDrawFrameElements.length;i += 1) {
      element = (clonedDrawFrameElements[i]);
      presentationClass = element.getAttributeNS(presentationns, "class");
      if(presentationClass && !/^(date-time|footer|header|page-number')$/.test(presentationClass)) {
        element.parentNode.removeChild(element)
      }
    }
  }
  function getHeaderFooter(odfContainer, frame, headerFooterId) {
    var headerFooter = null, i, declElements = odfContainer.rootElement.body.getElementsByTagNameNS(presentationns, headerFooterId + "-decl"), headerFooterName = frame.getAttributeNS(presentationns, "use-" + headerFooterId + "-name"), element;
    if(headerFooterName && declElements.length > 0) {
      for(i = 0;i < declElements.length;i += 1) {
        element = (declElements[i]);
        if(element.getAttributeNS(presentationns, "name") === headerFooterName) {
          headerFooter = element.textContent;
          break
        }
      }
    }
    return headerFooter
  }
  function setContainerValue(rootElement, ns, localName, value) {
    var i, containerList, document = rootElement.ownerDocument, e;
    containerList = rootElement.getElementsByTagNameNS(ns, localName);
    for(i = 0;i < containerList.length;i += 1) {
      clear(containerList[i]);
      if(value) {
        e = (containerList[i]);
        e.appendChild(document.createTextNode(value))
      }
    }
  }
  function setDrawElementPosition(styleid, frame, stylesheet) {
    frame.setAttributeNS(webodfhelperns, "styleid", styleid);
    var rule, anchor = frame.getAttributeNS(textns, "anchor-type"), x = frame.getAttributeNS(svgns, "x"), y = frame.getAttributeNS(svgns, "y"), width = frame.getAttributeNS(svgns, "width"), height = frame.getAttributeNS(svgns, "height"), minheight = frame.getAttributeNS(fons, "min-height"), minwidth = frame.getAttributeNS(fons, "min-width");
    if(anchor === "as-char") {
      rule = "display: inline-block;"
    }else {
      if(anchor || (x || y)) {
        rule = "position: absolute;"
      }else {
        if(width || (height || (minheight || minwidth))) {
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
      rule = "draw|" + frame.localName + '[webodfhelper|styleid="' + styleid + '"] {' + rule + "}";
      stylesheet.insertRule(rule, stylesheet.cssRules.length)
    }
  }
  function getUrlFromBinaryDataElement(image) {
    var node = image.firstChild;
    while(node) {
      if(node.namespaceURI === officens && node.localName === "binary-data") {
        return"data:image/png;base64," + node.textContent.replace(/[\r\n\s]/g, "")
      }
      node = node.nextSibling
    }
    return""
  }
  function setImage(id, container, image, stylesheet) {
    image.setAttributeNS(webodfhelperns, "styleid", id);
    var url = image.getAttributeNS(xlinkns, "href"), part;
    function callback(url) {
      var rule;
      if(url) {
        rule = "background-image: url(" + url + ");";
        rule = 'draw|image[webodfhelper|styleid="' + id + '"] {' + rule + "}";
        stylesheet.insertRule(rule, stylesheet.cssRules.length)
      }
    }
    function onchange(p) {
      callback(p.url)
    }
    if(url) {
      try {
        part = container.getPart(url);
        part.onchange = onchange;
        part.load()
      }catch(e) {
        runtime.log("slight problem: " + String(e))
      }
    }else {
      url = getUrlFromBinaryDataElement(image);
      callback(url)
    }
  }
  function formatParagraphAnchors(odfbody) {
    var n, i, nodes = xpath.getODFElementsWithXPath(odfbody, ".//*[*[@text:anchor-type='paragraph']]", odf.Namespaces.lookupNamespaceURI);
    for(i = 0;i < nodes.length;i += 1) {
      n = nodes[i];
      if(n.setAttributeNS) {
        n.setAttributeNS(webodfhelperns, "containsparagraphanchor", true)
      }
    }
  }
  function modifyTables(odffragment, documentns) {
    var i, tableCells, node;
    function modifyTableCell(node) {
      if(node.hasAttributeNS(tablens, "number-columns-spanned")) {
        node.setAttributeNS(documentns, "colspan", node.getAttributeNS(tablens, "number-columns-spanned"))
      }
      if(node.hasAttributeNS(tablens, "number-rows-spanned")) {
        node.setAttributeNS(documentns, "rowspan", node.getAttributeNS(tablens, "number-rows-spanned"))
      }
    }
    tableCells = odffragment.getElementsByTagNameNS(tablens, "table-cell");
    for(i = 0;i < tableCells.length;i += 1) {
      node = (tableCells.item(i));
      modifyTableCell(node)
    }
  }
  function modifyLinks(odffragment) {
    var i, links, node;
    function modifyLink(node) {
      var url, clickHandler;
      if(!node.hasAttributeNS(xlinkns, "href")) {
        return
      }
      url = node.getAttributeNS(xlinkns, "href");
      if(url[0] === "#") {
        url = url.substring(1);
        clickHandler = function() {
          var bookmarks = xpath.getODFElementsWithXPath(odffragment, "//text:bookmark-start[@text:name='" + url + "']", odf.Namespaces.lookupNamespaceURI);
          if(bookmarks.length === 0) {
            bookmarks = xpath.getODFElementsWithXPath(odffragment, "//text:bookmark[@text:name='" + url + "']", odf.Namespaces.lookupNamespaceURI)
          }
          if(bookmarks.length > 0) {
            bookmarks[0].scrollIntoView(true)
          }
          return false
        }
      }else {
        clickHandler = function() {
          window.open(url)
        }
      }
      node.onclick = clickHandler
    }
    links = odffragment.getElementsByTagNameNS(textns, "a");
    for(i = 0;i < links.length;i += 1) {
      node = (links.item(i));
      modifyLink(node)
    }
  }
  function modifyLineBreakElements(odffragment) {
    var document = odffragment.ownerDocument, lineBreakElements = domUtils.getElementsByTagNameNS(odffragment, textns, "line-break");
    lineBreakElements.forEach(function(lineBreak) {
      if(!lineBreak.hasChildNodes()) {
        lineBreak.appendChild(document.createElement("br"))
      }
    })
  }
  function expandSpaceElements(odffragment) {
    var spaces, doc = odffragment.ownerDocument;
    function expandSpaceElement(space) {
      var j, count;
      while(space.firstChild) {
        space.removeChild(space.firstChild)
      }
      space.appendChild(doc.createTextNode(" "));
      count = parseInt(space.getAttributeNS(textns, "c"), 10);
      if(count > 1) {
        space.removeAttributeNS(textns, "c");
        for(j = 1;j < count;j += 1) {
          space.parentNode.insertBefore(space.cloneNode(true), space)
        }
      }
    }
    spaces = domUtils.getElementsByTagNameNS(odffragment, textns, "s");
    spaces.forEach(expandSpaceElement)
  }
  function expandTabElements(odffragment) {
    var tabs;
    tabs = domUtils.getElementsByTagNameNS(odffragment, textns, "tab");
    tabs.forEach(function(tab) {
      tab.textContent = "\t"
    })
  }
  function modifyDrawElements(odfbody, stylesheet) {
    var node, drawElements = [], i;
    node = odfbody.firstElementChild;
    while(node && node !== odfbody) {
      if(node.namespaceURI === drawns) {
        drawElements[drawElements.length] = node
      }
      if(node.firstElementChild) {
        node = node.firstElementChild
      }else {
        while(node && (node !== odfbody && !node.nextElementSibling)) {
          node = node.parentElement
        }
        if(node && node.nextElementSibling) {
          node = node.nextElementSibling
        }
      }
    }
    for(i = 0;i < drawElements.length;i += 1) {
      node = drawElements[i];
      setDrawElementPosition("frame" + String(i), node, stylesheet)
    }
    formatParagraphAnchors(odfbody)
  }
  function cloneMasterPages(odfContainer, shadowContent, odfbody, stylesheet) {
    var masterPageName, masterPageElement, styleId, clonedPageElement, clonedElement, pageNumber = 0, i, element, elementToClone, document = odfContainer.rootElement.ownerDocument;
    element = odfbody.firstElementChild;
    if(!(element && (element.namespaceURI === officens && (element.localName === "presentation" || element.localName === "drawing")))) {
      return
    }
    element = element.firstElementChild;
    while(element) {
      masterPageName = element.getAttributeNS(drawns, "master-page-name");
      masterPageElement = getMasterPageElement(odfContainer, masterPageName);
      if(masterPageElement) {
        styleId = element.getAttributeNS(webodfhelperns, "styleid");
        clonedPageElement = document.createElementNS(drawns, "draw:page");
        elementToClone = masterPageElement.firstElementChild;
        i = 0;
        while(elementToClone) {
          if(elementToClone.getAttributeNS(presentationns, "placeholder") !== "true") {
            clonedElement = (elementToClone.cloneNode(true));
            clonedPageElement.appendChild(clonedElement);
            setDrawElementPosition(styleId + "_" + i, clonedElement, stylesheet)
          }
          elementToClone = elementToClone.nextElementSibling;
          i += 1
        }
        dropTemplateDrawFrames(clonedPageElement);
        shadowContent.appendChild(clonedPageElement);
        pageNumber = String(shadowContent.getElementsByTagNameNS(drawns, "page").length);
        setContainerValue(clonedPageElement, textns, "page-number", pageNumber);
        setContainerValue(clonedPageElement, presentationns, "header", getHeaderFooter(odfContainer, (element), "header"));
        setContainerValue(clonedPageElement, presentationns, "footer", getHeaderFooter(odfContainer, (element), "footer"));
        setDrawElementPosition(styleId, clonedPageElement, stylesheet);
        clonedPageElement.setAttributeNS(drawns, "draw:master-page-name", masterPageElement.getAttributeNS(stylens, "name"))
      }
      element = element.nextElementSibling
    }
  }
  function setVideo(container, plugin) {
    var video, source, url, doc = plugin.ownerDocument, part;
    url = plugin.getAttributeNS(xlinkns, "href");
    function callback(url, mimetype) {
      var ns = doc.documentElement.namespaceURI;
      if(mimetype.substr(0, 6) === "video/") {
        video = doc.createElementNS(ns, "video");
        video.setAttribute("controls", "controls");
        source = doc.createElementNS(ns, "source");
        if(url) {
          source.setAttribute("src", url)
        }
        source.setAttribute("type", mimetype);
        video.appendChild(source);
        plugin.parentNode.appendChild(video)
      }else {
        plugin.innerHtml = "Unrecognised Plugin"
      }
    }
    function onchange(p) {
      callback(p.url, p.mimetype)
    }
    if(url) {
      try {
        part = container.getPart(url);
        part.onchange = onchange;
        part.load()
      }catch(e) {
        runtime.log("slight problem: " + String(e))
      }
    }else {
      runtime.log("using MP4 data fallback");
      url = getUrlFromBinaryDataElement(plugin);
      callback(url, "video/mp4")
    }
  }
  function getNumberRule(node) {
    var style = node.getAttributeNS(stylens, "num-format"), suffix = node.getAttributeNS(stylens, "num-suffix") || "", prefix = node.getAttributeNS(stylens, "num-prefix") || "", rule = "", stylemap = {1:"decimal", "a":"lower-latin", "A":"upper-latin", "i":"lower-roman", "I":"upper-roman"}, content;
    content = prefix;
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
  function getImageRule() {
    var rule = "content: none;";
    return rule
  }
  function getBulletRule(node) {
    var bulletChar = node.getAttributeNS(textns, "bullet-char");
    return"content: '" + bulletChar + "';"
  }
  function getBulletsRule(node) {
    var itemrule;
    if(node) {
      if(node.localName === "list-level-style-number") {
        itemrule = getNumberRule(node)
      }else {
        if(node.localName === "list-level-style-image") {
          itemrule = getImageRule()
        }else {
          if(node.localName === "list-level-style-bullet") {
            itemrule = getBulletRule(node)
          }
        }
      }
    }
    return itemrule
  }
  function loadLists(odffragment, stylesheet, documentns) {
    var i, lists, node, id, continueList, styleName, rule, listMap = {}, parentList, listStyles, listStyleMap = {}, bulletRule;
    listStyles = window.document.getElementsByTagNameNS(textns, "list-style");
    for(i = 0;i < listStyles.length;i += 1) {
      node = (listStyles.item(i));
      styleName = node.getAttributeNS(stylens, "name");
      if(styleName) {
        listStyleMap[styleName] = node
      }
    }
    lists = odffragment.getElementsByTagNameNS(textns, "list");
    for(i = 0;i < lists.length;i += 1) {
      node = (lists.item(i));
      id = node.getAttributeNS(xmlns, "id");
      if(id) {
        continueList = node.getAttributeNS(textns, "continue-list");
        node.setAttributeNS(documentns, "id", id);
        rule = "text|list#" + id + " > text|list-item > *:first-child:before {";
        styleName = node.getAttributeNS(textns, "style-name");
        if(styleName) {
          node = listStyleMap[styleName];
          bulletRule = getBulletsRule((odfUtils.getFirstNonWhitespaceChild(node)))
        }
        if(continueList) {
          parentList = listMap[continueList];
          while(parentList) {
            parentList = listMap[parentList]
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
    var head = (document.getElementsByTagName("head")[0]), style, href;
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
    return(style)
  }
  function addStyleSheet(document) {
    var head = (document.getElementsByTagName("head")[0]), style = document.createElementNS(head.namespaceURI, "style"), text = "";
    style.setAttribute("type", "text/css");
    style.setAttribute("media", "screen, print, handheld, projection");
    odf.Namespaces.forEachPrefix(function(prefix, ns) {
      text += "@namespace " + prefix + " url(" + ns + ");\n"
    });
    text += "@namespace webodfhelper url(" + webodfhelperns + ");\n";
    style.appendChild(document.createTextNode(text));
    head.appendChild(style);
    return(style)
  }
  odf.OdfCanvas = function OdfCanvas(element) {
    runtime.assert(element !== null && element !== undefined, "odf.OdfCanvas constructor needs DOM element");
    runtime.assert(element.ownerDocument !== null && element.ownerDocument !== undefined, "odf.OdfCanvas constructor needs DOM");
    var self = this, doc = (element.ownerDocument), odfcontainer, formatting = new odf.Formatting, pageSwitcher, sizer = null, annotationsPane = null, allowAnnotations = false, annotationViewManager = null, webodfcss, fontcss, stylesxmlcss, positioncss, shadowContent, zoomLevel = 1, eventHandlers = {}, loadingQueue = new LoadingQueue;
    function loadImages(container, odffragment, stylesheet) {
      var i, images, node;
      function loadImage(name, container, node, stylesheet) {
        loadingQueue.addToQueue(function() {
          setImage(name, container, node, stylesheet)
        })
      }
      images = odffragment.getElementsByTagNameNS(drawns, "image");
      for(i = 0;i < images.length;i += 1) {
        node = (images.item(i));
        loadImage("image" + String(i), container, node, stylesheet)
      }
    }
    function loadVideos(container, odffragment) {
      var i, plugins, node;
      function loadVideo(container, node) {
        loadingQueue.addToQueue(function() {
          setVideo(container, node)
        })
      }
      plugins = odffragment.getElementsByTagNameNS(drawns, "plugin");
      for(i = 0;i < plugins.length;i += 1) {
        node = (plugins.item(i));
        loadVideo(container, node)
      }
    }
    function addEventListener(eventType, eventHandler) {
      var handlers;
      if(eventHandlers.hasOwnProperty(eventType)) {
        handlers = eventHandlers[eventType]
      }else {
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
      var odfdoc = sizer.firstChild;
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
      var css = (positioncss.sheet);
      clear(element);
      sizer = (doc.createElementNS(element.namespaceURI, "div"));
      sizer.style.display = "inline-block";
      sizer.style.background = "white";
      sizer.appendChild(odfnode);
      element.appendChild(sizer);
      annotationsPane = (doc.createElementNS(element.namespaceURI, "div"));
      annotationsPane.id = "annotationsPane";
      shadowContent = doc.createElementNS(element.namespaceURI, "div");
      shadowContent.id = "shadowContent";
      shadowContent.style.position = "absolute";
      shadowContent.style.top = 0;
      shadowContent.style.left = 0;
      container.getContentElement().appendChild(shadowContent);
      modifyDrawElements(odfnode.body, css);
      cloneMasterPages(container, shadowContent, odfnode.body, css);
      modifyTables(odfnode.body, element.namespaceURI);
      modifyLinks(odfnode.body);
      modifyLineBreakElements(odfnode.body);
      expandSpaceElements(odfnode.body);
      expandTabElements(odfnode.body);
      loadImages(container, odfnode.body, css);
      loadVideos(container, odfnode.body);
      loadLists(odfnode.body, css, element.namespaceURI);
      sizer.insertBefore(shadowContent, sizer.firstChild);
      fixContainerSize()
    }
    function modifyAnnotations(odffragment) {
      var annotationNodes = domUtils.getElementsByTagNameNS(odffragment, officens, "annotation"), annotationEnds = domUtils.getElementsByTagNameNS(odffragment, officens, "annotation-end"), currentAnnotationName, i;
      function matchAnnotationEnd(element) {
        return currentAnnotationName === element.getAttributeNS(officens, "name")
      }
      for(i = 0;i < annotationNodes.length;i += 1) {
        currentAnnotationName = annotationNodes[i].getAttributeNS(officens, "name");
        annotationViewManager.addAnnotation({node:annotationNodes[i], end:annotationEnds.filter(matchAnnotationEnd)[0] || null})
      }
      annotationViewManager.rerenderAnnotations()
    }
    function handleAnnotations(odfnode) {
      if(allowAnnotations) {
        if(!annotationsPane.parentNode) {
          sizer.appendChild(annotationsPane);
          fixContainerSize()
        }
        if(annotationViewManager) {
          annotationViewManager.forgetAnnotations()
        }
        annotationViewManager = new gui.AnnotationViewManager(self, odfnode.body, annotationsPane);
        modifyAnnotations(odfnode.body)
      }else {
        if(annotationsPane.parentNode) {
          sizer.removeChild(annotationsPane);
          annotationViewManager.forgetAnnotations();
          fixContainerSize()
        }
      }
    }
    function refreshOdf(suppressEvent) {
      function callback() {
        clear(element);
        element.style.display = "inline-block";
        var odfnode = odfcontainer.rootElement;
        element.ownerDocument.importNode(odfnode, true);
        formatting.setOdfContainer(odfcontainer);
        handleFonts(odfcontainer, fontcss);
        handleStyles(odfcontainer, formatting, stylesxmlcss);
        handleContent(odfcontainer, odfnode);
        handleAnnotations(odfnode);
        if(!suppressEvent) {
          fireEvent("statereadychange", [odfcontainer])
        }
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
      handleStyles(odfcontainer, formatting, stylesxmlcss);
      fixContainerSize()
    };
    this.refreshSize = function() {
      fixContainerSize()
    };
    this.odfContainer = function() {
      return odfcontainer
    };
    this.setOdfContainer = function(container, suppressEvent) {
      odfcontainer = container;
      refreshOdf(suppressEvent === true)
    };
    function load(url) {
      loadingQueue.clearQueue();
      element.innerHTML = runtime.tr("Loading") + " " + url + "...";
      element.removeAttribute("style");
      odfcontainer = new odf.OdfContainer(url, function(container) {
        odfcontainer = container;
        refreshOdf(false)
      })
    }
    this["load"] = load;
    this.load = load;
    this.save = function(callback) {
      odfcontainer.save(callback)
    };
    this.addListener = function(eventName, handler) {
      switch(eventName) {
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
    this.getAnnotationViewManager = function() {
      return annotationViewManager
    };
    this.refreshAnnotations = function() {
      handleAnnotations(odfcontainer.rootElement)
    };
    this.rerenderAnnotations = function() {
      if(annotationViewManager) {
        annotationViewManager.rerenderAnnotations()
      }
    };
    this.getSizer = function() {
      return sizer
    };
    this.enableAnnotations = function(allow) {
      if(allow !== allowAnnotations) {
        allowAnnotations = allow;
        if(odfcontainer) {
          handleAnnotations(odfcontainer.rootElement)
        }
      }
    };
    this.addAnnotation = function(annotation) {
      if(annotationViewManager) {
        annotationViewManager.addAnnotation(annotation)
      }
    };
    this.forgetAnnotations = function() {
      if(annotationViewManager) {
        annotationViewManager.forgetAnnotations()
      }
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
      pageSwitcher.showPage(n);
      fixContainerSize()
    };
    this.getElement = function() {
      return element
    };
    this.addCssForFrameWithImage = function(frame) {
      var frameName = frame.getAttributeNS(drawns, "name"), fc = frame.firstElementChild;
      setDrawElementPosition(frameName, frame, (positioncss.sheet));
      if(fc) {
        setImage(frameName + "img", odfcontainer, fc, (positioncss.sheet))
      }
    };
    this.destroy = function(callback) {
      var head = (doc.getElementsByTagName("head")[0]);
      if(annotationsPane && annotationsPane.parentNode) {
        annotationsPane.parentNode.removeChild(annotationsPane)
      }
      if(sizer) {
        element.removeChild(sizer);
        sizer = null
      }
      head.removeChild(webodfcss);
      head.removeChild(fontcss);
      head.removeChild(stylesxmlcss);
      head.removeChild(positioncss);
      pageSwitcher.destroy(callback)
    };
    function init() {
      webodfcss = addWebODFStyleSheet(doc);
      pageSwitcher = new PageSwitcher(addStyleSheet(doc));
      fontcss = addStyleSheet(doc);
      stylesxmlcss = addStyleSheet(doc);
      positioncss = addStyleSheet(doc)
    }
    init()
  }
})();
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
runtime.loadClass("core.LoopWatchDog");
runtime.loadClass("odf.Namespaces");
odf.TextStyleApplicator = function TextStyleApplicator(objectNameGenerator, formatting, automaticStyles) {
  var domUtils = new core.DomUtils, textns = odf.Namespaces.textns, stylens = odf.Namespaces.stylens, textProperties = "style:text-properties", webodfns = "urn:webodf:names:scope";
  function StyleLookup(info) {
    function compare(expected, actual) {
      if(typeof expected === "object" && typeof actual === "object") {
        return Object.keys(expected).every(function(key) {
          return compare(expected[key], actual[key])
        })
      }
      return expected === actual
    }
    this.isStyleApplied = function(textNode) {
      var appliedStyle = formatting.getAppliedStylesForElement(textNode);
      return compare(info, appliedStyle)
    }
  }
  function StyleManager(info) {
    var createdStyles = {};
    function createDirectFormat(existingStyleName, document) {
      var derivedStyleInfo, derivedStyleNode;
      derivedStyleInfo = existingStyleName ? formatting.createDerivedStyleObject(existingStyleName, "text", info) : info;
      derivedStyleNode = document.createElementNS(stylens, "style:style");
      formatting.updateStyle(derivedStyleNode, derivedStyleInfo);
      derivedStyleNode.setAttributeNS(stylens, "style:name", objectNameGenerator.generateStyleName());
      derivedStyleNode.setAttributeNS(stylens, "style:family", "text");
      derivedStyleNode.setAttributeNS(webodfns, "scope", "document-content");
      automaticStyles.appendChild(derivedStyleNode);
      return derivedStyleNode
    }
    function getDirectStyle(existingStyleName, document) {
      existingStyleName = existingStyleName || "";
      if(!createdStyles.hasOwnProperty(existingStyleName)) {
        createdStyles[existingStyleName] = createDirectFormat(existingStyleName, document)
      }
      return createdStyles[existingStyleName].getAttributeNS(stylens, "name")
    }
    this.applyStyleToContainer = function(container) {
      var name = getDirectStyle(container.getAttributeNS(textns, "style-name"), container.ownerDocument);
      container.setAttributeNS(textns, "text:style-name", name)
    }
  }
  function isTextSpan(node) {
    return node.localName === "span" && node.namespaceURI === textns
  }
  function moveToNewSpan(startNode, limits) {
    var document = startNode.ownerDocument, originalContainer = (startNode.parentNode), styledContainer, trailingContainer, moveTrailing, node, nextNode, loopGuard = new core.LoopWatchDog(1E4), styledNodes = [];
    if(!isTextSpan(originalContainer)) {
      styledContainer = document.createElementNS(textns, "text:span");
      originalContainer.insertBefore(styledContainer, startNode);
      moveTrailing = false
    }else {
      if(startNode.previousSibling && !domUtils.rangeContainsNode(limits, (originalContainer.firstChild))) {
        styledContainer = originalContainer.cloneNode(false);
        originalContainer.parentNode.insertBefore(styledContainer, originalContainer.nextSibling);
        moveTrailing = true
      }else {
        styledContainer = originalContainer;
        moveTrailing = true
      }
    }
    styledNodes.push(startNode);
    node = startNode.nextSibling;
    while(node && domUtils.rangeContainsNode(limits, node)) {
      loopGuard.check();
      styledNodes.push(node);
      node = node.nextSibling
    }
    styledNodes.forEach(function(n) {
      if(n.parentNode !== styledContainer) {
        styledContainer.appendChild(n)
      }
    });
    if(node && moveTrailing) {
      trailingContainer = styledContainer.cloneNode(false);
      styledContainer.parentNode.insertBefore(trailingContainer, styledContainer.nextSibling);
      while(node) {
        loopGuard.check();
        nextNode = node.nextSibling;
        trailingContainer.appendChild(node);
        node = nextNode
      }
    }
    return(styledContainer)
  }
  this.applyStyle = function(textNodes, limits, info) {
    var textPropsOnly = {}, isStyled, container, styleCache, styleLookup;
    runtime.assert(info && info.hasOwnProperty(textProperties), "applyStyle without any text properties");
    textPropsOnly[textProperties] = info[textProperties];
    styleCache = new StyleManager(textPropsOnly);
    styleLookup = new StyleLookup(textPropsOnly);
    function apply(n) {
      isStyled = styleLookup.isStyleApplied(n);
      if(isStyled === false) {
        container = moveToNewSpan(n, limits);
        styleCache.applyStyleToContainer(container)
      }
    }
    textNodes.forEach(apply)
  }
};
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
runtime.loadClass("odf.OdfUtils");
gui.StyleHelper = function StyleHelper(formatting) {
  var odfUtils = new odf.OdfUtils, textns = odf.Namespaces.textns;
  function getAppliedStyles(range) {
    var container, nodes;
    if(range.collapsed) {
      container = range.startContainer;
      if(container.hasChildNodes() && range.startOffset < container.childNodes.length) {
        container = container.childNodes.item(range.startOffset)
      }
      nodes = [container]
    }else {
      nodes = odfUtils.getTextNodes(range, true)
    }
    return formatting.getAppliedStyles(nodes)
  }
  this.getAppliedStyles = getAppliedStyles;
  function hasTextPropertyValue(appliedStyles, propertyName, propertyValue) {
    var hasOtherValue = true, properties, i;
    for(i = 0;i < appliedStyles.length;i += 1) {
      properties = appliedStyles[i]["style:text-properties"];
      hasOtherValue = !properties || properties[propertyName] !== propertyValue;
      if(hasOtherValue) {
        break
      }
    }
    return!hasOtherValue
  }
  this.isBold = function(appliedStyles) {
    return hasTextPropertyValue(appliedStyles, "fo:font-weight", "bold")
  };
  this.isItalic = function(appliedStyles) {
    return hasTextPropertyValue(appliedStyles, "fo:font-style", "italic")
  };
  this.hasUnderline = function(appliedStyles) {
    return hasTextPropertyValue(appliedStyles, "style:text-underline-style", "solid")
  };
  this.hasStrikeThrough = function(appliedStyles) {
    return hasTextPropertyValue(appliedStyles, "style:text-line-through-style", "solid")
  };
  function hasParagraphPropertyValue(range, propertyName, propertyValues) {
    var paragraphStyleName, paragraphStyleElement, paragraphStyleAttributes, properties, nodes = odfUtils.getParagraphElements(range), isStyleChecked = {}, isDefaultParagraphStyleChecked = false;
    function pickDefaultParagraphStyleElement() {
      isDefaultParagraphStyleChecked = true;
      paragraphStyleElement = formatting.getDefaultStyleElement("paragraph");
      if(!paragraphStyleElement) {
        paragraphStyleElement = null
      }
    }
    while(nodes.length > 0) {
      paragraphStyleName = nodes[0].getAttributeNS(textns, "style-name");
      if(paragraphStyleName) {
        if(!isStyleChecked[paragraphStyleName]) {
          paragraphStyleElement = formatting.getStyleElement(paragraphStyleName, "paragraph");
          isStyleChecked[paragraphStyleName] = true;
          if(!paragraphStyleElement && !isDefaultParagraphStyleChecked) {
            pickDefaultParagraphStyleElement()
          }
        }
      }else {
        if(!isDefaultParagraphStyleChecked) {
          pickDefaultParagraphStyleElement()
        }else {
          paragraphStyleElement = undefined
        }
      }
      if(paragraphStyleElement !== undefined) {
        if(paragraphStyleElement === null) {
          paragraphStyleAttributes = formatting.getSystemDefaultStyleAttributes("paragraph")
        }else {
          paragraphStyleAttributes = formatting.getInheritedStyleAttributes((paragraphStyleElement), true)
        }
        properties = paragraphStyleAttributes["style:paragraph-properties"];
        if(properties && propertyValues.indexOf(properties[propertyName]) === -1) {
          return false
        }
      }
      nodes.pop()
    }
    return true
  }
  this.isAlignedLeft = function(range) {
    return hasParagraphPropertyValue(range, "fo:text-align", ["left", "start"])
  };
  this.isAlignedCenter = function(range) {
    return hasParagraphPropertyValue(range, "fo:text-align", ["center"])
  };
  this.isAlignedRight = function(range) {
    return hasParagraphPropertyValue(range, "fo:text-align", ["right", "end"])
  };
  this.isAlignedJustified = function(range) {
    return hasParagraphPropertyValue(range, "fo:text-align", ["justify"])
  }
};
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
      if(zip_window[matchp + best_len] !== scan_end || (zip_window[matchp + best_len - 1] !== scan_end1 || (zip_window[matchp] !== zip_window[scanp] || zip_window[++matchp] !== zip_window[scanp + 1]))) {
        continue
      }
      scanp += 2;
      matchp++;
      do {
        ++scanp
      }while(zip_window[scanp] === zip_window[++matchp] && (zip_window[++scanp] === zip_window[++matchp] && (zip_window[++scanp] === zip_window[++matchp] && (zip_window[++scanp] === zip_window[++matchp] && (zip_window[++scanp] === zip_window[++matchp] && (zip_window[++scanp] === zip_window[++matchp] && (zip_window[++scanp] === zip_window[++matchp] && (zip_window[++scanp] === zip_window[++matchp] && scanp < strendp))))))));
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
      cur_match = zip_prev[cur_match & zip_WMASK]
    }while(cur_match > limit && --chain_length !== 0);
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
    var len;
    for(n = 0;n <= max_code;n++) {
      len = tree[n].dl;
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
    var xnew;
    while(zip_heap_len < 2) {
      xnew = zip_heap[++zip_heap_len] = max_code < 2 ? ++max_code : 0;
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
      }
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
      }
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
    var flush;
    while(zip_lookahead !== 0 && zip_qhead === null) {
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
    var flush;
    while(zip_lookahead !== 0 && zip_qhead === null) {
      zip_INSERT_STRING();
      zip_prev_length = zip_match_length;
      zip_prev_match = zip_match_start;
      zip_match_length = zip_MIN_MATCH - 1;
      if(zip_hash_head !== zip_NIL && (zip_prev_length < zip_max_lazy_match && zip_strstart - zip_hash_head <= zip_MAX_DIST)) {
        zip_match_length = zip_longest_match(zip_hash_head);
        if(zip_match_length > zip_lookahead) {
          zip_match_length = zip_lookahead
        }
        if(zip_match_length === zip_MIN_MATCH && zip_strstart - zip_match_start > zip_TOO_FAR) {
          zip_match_length--
        }
      }
      if(zip_prev_length >= zip_MIN_MATCH && zip_match_length <= zip_prev_length) {
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
    var n, i, j, p;
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
    n = zip_qcopy(buff, off, buff_size);
    if(n === buff_size) {
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
    var aout = [], cbuf = [];
    i = zip_deflate_internal(buff, 0, buff.length);
    while(i > 0) {
      cbuf.length = i;
      for(j = 0;j < i;j++) {
        cbuf[j] = String.fromCharCode(buff[j])
      }
      aout[aout.length] = cbuf.join("");
      i = zip_deflate_internal(buff, 0, buff.length)
    }
    zip_deflate_data = "";
    return aout.join("")
  };
  this.deflate = zip_deflate
};
runtime.loadClass("odf.Namespaces");
gui.ImageSelector = function ImageSelector(odfCanvas) {
  var svgns = odf.Namespaces.svgns, imageSelectorId = "imageSelector", selectorBorderWidth = 1, squareClassNames = ["topLeft", "topRight", "bottomRight", "bottomLeft", "topMiddle", "rightMiddle", "bottomMiddle", "leftMiddle"], document = odfCanvas.getElement().ownerDocument, hasSelection = false;
  function createSelectorElement() {
    var sizerElement = odfCanvas.getSizer(), selectorElement, squareElement;
    selectorElement = document.createElement("div");
    selectorElement.id = "imageSelector";
    selectorElement.style.borderWidth = selectorBorderWidth + "px";
    sizerElement.appendChild(selectorElement);
    squareClassNames.forEach(function(className) {
      squareElement = document.createElement("div");
      squareElement.className = className;
      selectorElement.appendChild(squareElement)
    });
    return selectorElement
  }
  function getPosition(element, referenceElement) {
    var rect = element.getBoundingClientRect(), refRect = referenceElement.getBoundingClientRect(), zoomLevel = odfCanvas.getZoomLevel();
    return{left:(rect.left - refRect.left) / zoomLevel - selectorBorderWidth, top:(rect.top - refRect.top) / zoomLevel - selectorBorderWidth}
  }
  this.select = function(frameElement) {
    var selectorElement = document.getElementById(imageSelectorId), position;
    if(!selectorElement) {
      selectorElement = createSelectorElement()
    }
    hasSelection = true;
    position = getPosition(frameElement, (selectorElement.parentNode));
    selectorElement.style.display = "block";
    selectorElement.style.left = position.left + "px";
    selectorElement.style.top = position.top + "px";
    selectorElement.style.width = frameElement.getAttributeNS(svgns, "width");
    selectorElement.style.height = frameElement.getAttributeNS(svgns, "height")
  };
  this.clearSelection = function() {
    var selectorElement;
    if(hasSelection) {
      selectorElement = document.getElementById(imageSelectorId);
      if(selectorElement) {
        selectorElement.style.display = "none"
      }
    }
    hasSelection = false
  };
  this.isSelectorElement = function(node) {
    var selectorElement = document.getElementById(imageSelectorId);
    if(!selectorElement) {
      return false
    }
    return node === selectorElement || node.parentNode === selectorElement
  }
};
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
    var odfcontainer = new odf.OdfContainer(inputfilepath, onready);
    return odfcontainer
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
ops.Member = function Member(memberId, properties) {
  var props = {};
  function getMemberId() {
    return memberId
  }
  function getProperties() {
    return props
  }
  function setProperties(newProperties) {
    Object.keys(newProperties).forEach(function(key) {
      props[key] = newProperties[key]
    })
  }
  function removeProperties(removedProperties) {
    delete removedProperties.fullName;
    delete removedProperties.color;
    delete removedProperties.imageUrl;
    Object.keys(removedProperties).forEach(function(key) {
      if(props.hasOwnProperty(key)) {
        delete props[key]
      }
    })
  }
  this.getMemberId = getMemberId;
  this.getProperties = getProperties;
  this.setProperties = setProperties;
  this.removeProperties = removeProperties;
  function init() {
    runtime.assert(Boolean(memberId), "No memberId was supplied!");
    if(!properties.fullName) {
      properties.fullName = runtime.tr("Unknown Author")
    }
    if(!properties.color) {
      properties.color = "black"
    }
    if(!properties.imageUrl) {
      properties.imageUrl = "avatar-joe.png"
    }
    props = properties
  }
  init()
};
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
runtime.loadClass("core.PositionFilter");
runtime.loadClass("odf.OdfUtils");
(function() {
  var nextNodeId = 0, PREVIOUS_STEP = 0, NEXT_STEP = 1;
  function StepsCache(rootNode, filter, bucketSize) {
    var coordinatens = "urn:webodf:names:steps", stepToDomPoint = {}, nodeToBookmark = {}, odfUtils = new odf.OdfUtils, domUtils = new core.DomUtils, basePoint, FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT;
    function ParagraphBookmark(steps, paragraphNode) {
      this.steps = steps;
      this.node = paragraphNode;
      function positionInContainer(node) {
        var position = 0;
        while(node && node.previousSibling) {
          position += 1;
          node = node.previousSibling
        }
        return position
      }
      this.setIteratorPosition = function(iterator) {
        iterator.setUnfilteredPosition(paragraphNode.parentNode, positionInContainer(paragraphNode));
        do {
          if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
            break
          }
        }while(iterator.nextPosition())
      }
    }
    function RootBookmark(steps, rootNode) {
      this.steps = steps;
      this.node = rootNode;
      this.setIteratorPosition = function(iterator) {
        iterator.setUnfilteredPosition(rootNode, 0);
        do {
          if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
            break
          }
        }while(iterator.nextPosition())
      }
    }
    function getBucket(steps) {
      return Math.floor(steps / bucketSize) * bucketSize
    }
    function getDestinationBucket(steps) {
      return Math.ceil(steps / bucketSize) * bucketSize
    }
    function clearNodeId(node) {
      node.removeAttributeNS(coordinatens, "nodeId")
    }
    function getNodeId(node) {
      return node.nodeType === Node.ELEMENT_NODE && node.getAttributeNS(coordinatens, "nodeId")
    }
    function setNodeId(node) {
      var nodeId = nextNodeId;
      node.setAttributeNS(coordinatens, "nodeId", nodeId.toString());
      nextNodeId += 1;
      return nodeId
    }
    function isValidBookmarkForNode(node, bookmark) {
      return bookmark.node === node
    }
    function getNodeBookmark(node, steps) {
      var nodeId = getNodeId(node) || setNodeId(node), existingBookmark;
      existingBookmark = nodeToBookmark[nodeId];
      if(!existingBookmark) {
        existingBookmark = nodeToBookmark[nodeId] = new ParagraphBookmark(steps, node)
      }else {
        if(!isValidBookmarkForNode(node, existingBookmark)) {
          runtime.log("Cloned node detected. Creating new bookmark");
          nodeId = setNodeId(node);
          existingBookmark = nodeToBookmark[nodeId] = new ParagraphBookmark(steps, node)
        }else {
          existingBookmark.steps = steps
        }
      }
      return existingBookmark
    }
    function isFirstPositionInParagraph(node, offset) {
      return offset === 0 && odfUtils.isParagraph(node)
    }
    this.updateCache = function(steps, node, offset, isWalkable) {
      var stablePoint, cacheBucket, existingCachePoint, bookmark;
      if(isFirstPositionInParagraph(node, offset)) {
        stablePoint = true;
        if(!isWalkable) {
          steps += 1
        }
      }else {
        if(node.hasChildNodes() && node.childNodes[offset]) {
          node = node.childNodes[offset];
          offset = 0;
          stablePoint = isFirstPositionInParagraph(node, offset);
          if(stablePoint) {
            steps += 1
          }
        }
      }
      if(stablePoint) {
        bookmark = getNodeBookmark(node, steps);
        cacheBucket = getDestinationBucket(bookmark.steps);
        existingCachePoint = stepToDomPoint[cacheBucket];
        if(!existingCachePoint || bookmark.steps > existingCachePoint.steps) {
          stepToDomPoint[cacheBucket] = bookmark
        }
      }
    };
    this.setToClosestStep = function(steps, iterator) {
      var cacheBucket = getBucket(steps), cachePoint;
      while(!cachePoint && cacheBucket !== 0) {
        cachePoint = stepToDomPoint[cacheBucket];
        cacheBucket -= bucketSize
      }
      cachePoint = cachePoint || basePoint;
      cachePoint.setIteratorPosition(iterator);
      return cachePoint.steps
    };
    function findBookmarkedAncestor(node, offset) {
      var nodeId, bookmark = null;
      node = node.childNodes[offset] || node;
      while(!bookmark && (node && node !== rootNode)) {
        nodeId = getNodeId(node);
        if(nodeId) {
          bookmark = nodeToBookmark[nodeId];
          if(bookmark && !isValidBookmarkForNode(node, bookmark)) {
            runtime.log("Cloned node detected. Creating new bookmark");
            bookmark = null;
            clearNodeId(node)
          }
        }
        node = node.parentNode
      }
      return bookmark
    }
    this.setToClosestDomPoint = function(node, offset, iterator) {
      var bookmark;
      if(node === rootNode && offset === 0) {
        bookmark = basePoint
      }else {
        if(node === rootNode && offset === rootNode.childNodes.length) {
          bookmark = Object.keys(stepToDomPoint).map(function(cacheBucket) {
            return stepToDomPoint[cacheBucket]
          }).reduce(function(largestBookmark, bookmark) {
            return bookmark.steps > largestBookmark.steps ? bookmark : largestBookmark
          }, basePoint)
        }else {
          bookmark = findBookmarkedAncestor(node, offset);
          if(!bookmark) {
            iterator.setUnfilteredPosition(node, offset);
            while(!bookmark && iterator.previousNode()) {
              bookmark = findBookmarkedAncestor(iterator.container(), iterator.unfilteredDomOffset())
            }
          }
        }
      }
      bookmark = bookmark || basePoint;
      bookmark.setIteratorPosition(iterator);
      return bookmark.steps
    };
    this.updateCacheAtPoint = function(inflectionStep, doUpdate) {
      var affectedBookmarks, updatedBuckets = {};
      affectedBookmarks = Object.keys(nodeToBookmark).map(function(nodeId) {
        return nodeToBookmark[nodeId]
      }).filter(function(bookmark) {
        return bookmark.steps > inflectionStep
      });
      affectedBookmarks.forEach(function(bookmark) {
        var originalCacheBucket = getDestinationBucket(bookmark.steps), newCacheBucket, existingBookmark;
        if(domUtils.containsNode(rootNode, bookmark.node)) {
          doUpdate(bookmark);
          newCacheBucket = getDestinationBucket(bookmark.steps);
          existingBookmark = updatedBuckets[newCacheBucket];
          if(!existingBookmark || bookmark.steps > existingBookmark.steps) {
            updatedBuckets[newCacheBucket] = bookmark
          }
        }else {
          delete nodeToBookmark[getNodeId(bookmark.node)]
        }
        if(stepToDomPoint[originalCacheBucket] === bookmark) {
          delete stepToDomPoint[originalCacheBucket]
        }
      });
      Object.keys(updatedBuckets).forEach(function(cacheBucket) {
        stepToDomPoint[cacheBucket] = updatedBuckets[cacheBucket]
      })
    };
    function init() {
      basePoint = new RootBookmark(0, rootNode)
    }
    init()
  }
  ops.StepsTranslator = function StepsTranslator(getRootNode, newIterator, filter, bucketSize) {
    var rootNode = getRootNode(), stepsCache = new StepsCache(rootNode, filter, bucketSize), domUtils = new core.DomUtils, iterator = newIterator(getRootNode()), FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT;
    function verifyRootNode() {
      var currentRootNode = getRootNode();
      if(currentRootNode !== rootNode) {
        runtime.log("Undo detected. Resetting steps cache");
        rootNode = currentRootNode;
        stepsCache = new StepsCache(rootNode, filter, bucketSize);
        iterator = newIterator(rootNode)
      }
    }
    this.convertStepsToDomPoint = function(steps) {
      var stepsFromRoot, isWalkable;
      if(steps < 0) {
        runtime.log("warn", "Requested steps were negative (" + steps + ")");
        steps = 0
      }
      verifyRootNode();
      stepsFromRoot = stepsCache.setToClosestStep(steps, iterator);
      while(stepsFromRoot < steps && iterator.nextPosition()) {
        isWalkable = filter.acceptPosition(iterator) === FILTER_ACCEPT;
        if(isWalkable) {
          stepsFromRoot += 1
        }
        stepsCache.updateCache(stepsFromRoot, iterator.container(), iterator.unfilteredDomOffset(), isWalkable)
      }
      if(stepsFromRoot !== steps) {
        runtime.log("warn", "Requested " + steps + " steps but only " + stepsFromRoot + " are available")
      }
      return{node:iterator.container(), offset:iterator.unfilteredDomOffset()}
    };
    function roundToPreferredStep(iterator, roundDirection) {
      if(!roundDirection || filter.acceptPosition(iterator) === FILTER_ACCEPT) {
        return true
      }
      while(iterator.previousPosition()) {
        if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
          if(roundDirection(PREVIOUS_STEP, iterator.container(), iterator.unfilteredDomOffset())) {
            return true
          }
          break
        }
      }
      while(iterator.nextPosition()) {
        if(filter.acceptPosition(iterator) === FILTER_ACCEPT) {
          if(roundDirection(NEXT_STEP, iterator.container(), iterator.unfilteredDomOffset())) {
            return true
          }
          break
        }
      }
      return false
    }
    this.convertDomPointToSteps = function(node, offset, roundDirection) {
      var stepsFromRoot, beforeRoot, destinationNode, destinationOffset, rounding = 0, isWalkable;
      verifyRootNode();
      if(!domUtils.containsNode(rootNode, node)) {
        beforeRoot = domUtils.comparePoints(rootNode, 0, node, offset) < 0;
        node = rootNode;
        offset = beforeRoot ? 0 : rootNode.childNodes.length
      }
      iterator.setUnfilteredPosition(node, offset);
      if(!roundToPreferredStep(iterator, roundDirection)) {
        iterator.setUnfilteredPosition(node, offset)
      }
      destinationNode = iterator.container();
      destinationOffset = iterator.unfilteredDomOffset();
      stepsFromRoot = stepsCache.setToClosestDomPoint(destinationNode, destinationOffset, iterator);
      if(domUtils.comparePoints(iterator.container(), iterator.unfilteredDomOffset(), destinationNode, destinationOffset) < 0) {
        return stepsFromRoot > 0 ? stepsFromRoot - 1 : stepsFromRoot
      }
      while(!(iterator.container() === destinationNode && iterator.unfilteredDomOffset() === destinationOffset) && iterator.nextPosition()) {
        isWalkable = filter.acceptPosition(iterator) === FILTER_ACCEPT;
        if(isWalkable) {
          stepsFromRoot += 1
        }
        stepsCache.updateCache(stepsFromRoot, iterator.container(), iterator.unfilteredDomOffset(), isWalkable)
      }
      return stepsFromRoot + rounding
    };
    this.prime = function() {
      var stepsFromRoot, isWalkable;
      verifyRootNode();
      stepsFromRoot = stepsCache.setToClosestStep(0, iterator);
      while(iterator.nextPosition()) {
        isWalkable = filter.acceptPosition(iterator) === FILTER_ACCEPT;
        if(isWalkable) {
          stepsFromRoot += 1
        }
        stepsCache.updateCache(stepsFromRoot, iterator.container(), iterator.unfilteredDomOffset(), isWalkable)
      }
    };
    this.handleStepsInserted = function(eventArgs) {
      verifyRootNode();
      stepsCache.updateCacheAtPoint(eventArgs.position, function(bucket) {
        bucket.steps += eventArgs.length
      })
    };
    this.handleStepsRemoved = function(eventArgs) {
      verifyRootNode();
      stepsCache.updateCacheAtPoint(eventArgs.position, function(bucket) {
        bucket.steps -= eventArgs.length;
        if(bucket.steps < 0) {
          bucket.steps = 0
        }
      })
    }
  };
  ops.StepsTranslator.PREVIOUS_STEP = PREVIOUS_STEP;
  ops.StepsTranslator.NEXT_STEP = NEXT_STEP;
  return ops.StepsTranslator
})();
xmldom.RNG = {};
xmldom.RNG.Name;
xmldom.RNG.Attr;
xmldom.RNG.Element;
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
    var i, l = def.names ? def.names.length : 0, name, localnames = [], namespaces = [];
    for(i = 0;i < l;i += 1) {
      name = splitQName(def.names[i]);
      namespaces[i] = name[0];
      localnames[i] = name[1]
    }
    def.localnames = localnames;
    def.namespaces = namespaces
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
    for(i = 0;atts && i < atts.length;i += 1) {
      att = (atts.item(i));
      if(!att.namespaceURI) {
        if(att.localName === "name" && (name === "element" || name === "attribute")) {
          names.push(att.value)
        }
        if(att.localName === "name" || (att.localName === "combine" || att.localName === "type")) {
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
      if(c.nodeType === Node.ELEMENT_NODE && c.namespaceURI === rngns) {
        ce = parse((c), elements, e);
        if(ce) {
          if(ce.name === "name") {
            names.push(nsmap[ce.a.ns] + ":" + ce.text);
            e.push(ce)
          }else {
            if(ce.name === "choice" && (ce.names && ce.names.length)) {
              names = names.concat(ce.names);
              delete ce.names;
              e.push(ce)
            }else {
              e.push(ce)
            }
          }
        }
      }else {
        if(c.nodeType === Node.TEXT_NODE) {
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
      if(ce.name === "define" && (ce.a && ce.a.name === name)) {
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
    if(name === "name" || (name === "nsName" || name === "value")) {
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
    if(e.length > 1 && (name === "define" || (name === "oneOrMore" || (name === "zeroOrMore" || (name === "optional" || (name === "list" || name === "mixed")))))) {
      e = [{name:"group", e:splitToDuos({name:"group", e:e}).e}]
    }
    if(e.length > 2 && name === "element") {
      e = [e[0]].concat({name:"group", e:splitToDuos({name:"group", e:e.slice(1)}).e})
    }
    if(e.length === 1 && name === "attribute") {
      e.push({name:"text", text:text})
    }
    if(e.length === 1 && (name === "choice" || (name === "group" || name === "interleave"))) {
      name = e[0].name;
      names = e[0].names;
      a = e[0].a;
      text = e[0].text;
      e = e[0].e
    }else {
      if(e.length > 2 && (name === "choice" || (name === "group" || name === "interleave"))) {
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
        return null
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
      if(!e || (!e[1] || e[1].name === "empty")) {
        if(!e || (!e[0] || e[0].name === "empty")) {
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
    var i = 0, e;
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
runtime.loadClass("core.Cursor");
runtime.loadClass("gui.SelectionMover");
ops.OdtCursor = function OdtCursor(memberId, odtDocument) {
  var self = this, validSelectionTypes = {}, selectionType, selectionMover, cursor;
  this.removeFromOdtDocument = function() {
    cursor.remove()
  };
  this.move = function(number, extend) {
    var moved = 0;
    if(number > 0) {
      moved = selectionMover.movePointForward(number, extend)
    }else {
      if(number <= 0) {
        moved = -selectionMover.movePointBackward(-number, extend)
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
  this.getAnchorNode = function() {
    return cursor.getAnchorNode()
  };
  this.getSelectedRange = function() {
    return cursor.getSelectedRange()
  };
  this.setSelectedRange = function(range, isForwardSelection) {
    cursor.setSelectedRange(range, isForwardSelection);
    self.handleUpdate()
  };
  this.hasForwardSelection = function() {
    return cursor.hasForwardSelection()
  };
  this.getOdtDocument = function() {
    return odtDocument
  };
  this.getSelectionType = function() {
    return selectionType
  };
  this.setSelectionType = function(value) {
    if(validSelectionTypes.hasOwnProperty(value)) {
      selectionType = value
    }else {
      runtime.log("Invalid selection type: " + value)
    }
  };
  this.resetSelectionType = function() {
    self.setSelectionType(ops.OdtCursor.RangeSelection)
  };
  function init() {
    cursor = new core.Cursor(odtDocument.getDOM(), memberId);
    selectionMover = new gui.SelectionMover(cursor, odtDocument.getRootNode());
    validSelectionTypes[ops.OdtCursor.RangeSelection] = true;
    validSelectionTypes[ops.OdtCursor.RegionSelection] = true;
    self.resetSelectionType()
  }
  init()
};
ops.OdtCursor.RangeSelection = "Range";
ops.OdtCursor.RegionSelection = "Region";
(function() {
  return ops.OdtCursor
})();
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
runtime.loadClass("core.EventNotifier");
runtime.loadClass("core.DomUtils");
runtime.loadClass("odf.OdfUtils");
runtime.loadClass("odf.Namespaces");
runtime.loadClass("gui.SelectionMover");
runtime.loadClass("core.PositionFilterChain");
runtime.loadClass("ops.StepsTranslator");
runtime.loadClass("ops.TextPositionFilter");
runtime.loadClass("ops.Member");
ops.OdtDocument = function OdtDocument(odfCanvas) {
  var self = this, odfUtils, domUtils, cursors = {}, members = {}, eventNotifier = new core.EventNotifier([ops.OdtDocument.signalMemberAdded, ops.OdtDocument.signalMemberUpdated, ops.OdtDocument.signalMemberRemoved, ops.OdtDocument.signalCursorAdded, ops.OdtDocument.signalCursorRemoved, ops.OdtDocument.signalCursorMoved, ops.OdtDocument.signalParagraphChanged, ops.OdtDocument.signalParagraphStyleModified, ops.OdtDocument.signalCommonStyleCreated, ops.OdtDocument.signalCommonStyleDeleted, ops.OdtDocument.signalTableAdded, 
  ops.OdtDocument.signalOperationExecuted, ops.OdtDocument.signalUndoStackChanged, ops.OdtDocument.signalStepsInserted, ops.OdtDocument.signalStepsRemoved]), FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT, FILTER_REJECT = core.PositionFilter.FilterResult.FILTER_REJECT, filter, stepsTranslator, lastEditingOp, unsupportedMetadataRemoved = false;
  function getRootNode() {
    var element = odfCanvas.odfContainer().getContentElement(), localName = element && element.localName;
    runtime.assert(localName === "text", "Unsupported content element type '" + localName + "' for OdtDocument");
    return element
  }
  function getDOM() {
    return(getRootNode().ownerDocument)
  }
  this.getDOM = getDOM;
  function isRoot(node) {
    if(node.namespaceURI === odf.Namespaces.officens && node.localName === "text" || node.namespaceURI === odf.Namespaces.officens && node.localName === "annotation") {
      return true
    }
    return false
  }
  function getRoot(node) {
    while(node && !isRoot(node)) {
      node = (node.parentNode)
    }
    return node
  }
  this.getRootElement = getRoot;
  function RootFilter(anchor) {
    this.acceptPosition = function(iterator) {
      var node = iterator.container(), anchorNode;
      if(typeof anchor === "string") {
        anchorNode = cursors[anchor].getNode()
      }else {
        anchorNode = anchor
      }
      if(getRoot(node) === getRoot(anchorNode)) {
        return FILTER_ACCEPT
      }
      return FILTER_REJECT
    }
  }
  function getIteratorAtPosition(position) {
    var iterator = gui.SelectionMover.createPositionIterator(getRootNode()), point = stepsTranslator.convertStepsToDomPoint(position);
    iterator.setUnfilteredPosition(point.node, point.offset);
    return iterator
  }
  this.getIteratorAtPosition = getIteratorAtPosition;
  this.convertDomPointToCursorStep = function(node, offset, roundDirection) {
    return stepsTranslator.convertDomPointToSteps(node, offset, roundDirection)
  };
  this.convertDomToCursorRange = function(selection, constraint) {
    var point1, point2, anchorConstraint = constraint(selection.anchorNode, selection.anchorOffset), focusConstraint;
    point1 = stepsTranslator.convertDomPointToSteps(selection.anchorNode, selection.anchorOffset, anchorConstraint);
    if(!constraint && (selection.anchorNode === selection.focusNode && selection.anchorOffset === selection.focusOffset)) {
      point2 = point1
    }else {
      focusConstraint = constraint(selection.focusNode, selection.focusOffset);
      point2 = stepsTranslator.convertDomPointToSteps(selection.focusNode, selection.focusOffset, focusConstraint)
    }
    return{position:point1, length:point2 - point1}
  };
  this.convertCursorToDomRange = function(position, length) {
    var range = getDOM().createRange(), point1, point2;
    point1 = stepsTranslator.convertStepsToDomPoint(position);
    if(length) {
      point2 = stepsTranslator.convertStepsToDomPoint(position + length);
      if(length > 0) {
        range.setStart(point1.node, point1.offset);
        range.setEnd(point2.node, point2.offset)
      }else {
        range.setStart(point2.node, point2.offset);
        range.setEnd(point1.node, point1.offset)
      }
    }else {
      range.setStart(point1.node, point1.offset)
    }
    return range
  };
  function getTextNodeAtStep(steps, memberid) {
    var iterator = getIteratorAtPosition(steps), node = iterator.container(), lastTextNode, nodeOffset = 0, cursorNode = null;
    if(node.nodeType === Node.TEXT_NODE) {
      lastTextNode = (node);
      nodeOffset = (iterator.unfilteredDomOffset());
      if(lastTextNode.length > 0) {
        if(nodeOffset > 0) {
          lastTextNode = lastTextNode.splitText(nodeOffset)
        }
        lastTextNode.parentNode.insertBefore(getDOM().createTextNode(""), lastTextNode);
        lastTextNode = (lastTextNode.previousSibling);
        nodeOffset = 0
      }
    }else {
      lastTextNode = getDOM().createTextNode("");
      nodeOffset = 0;
      node.insertBefore(lastTextNode, iterator.rightNode())
    }
    if(memberid) {
      if(cursors[memberid] && self.getCursorPosition(memberid) === steps) {
        cursorNode = cursors[memberid].getNode();
        while(cursorNode.nextSibling && cursorNode.nextSibling.localName === "cursor") {
          cursorNode.parentNode.insertBefore(cursorNode.nextSibling, cursorNode)
        }
        if(lastTextNode.length > 0 && lastTextNode.nextSibling !== cursorNode) {
          lastTextNode = getDOM().createTextNode("");
          nodeOffset = 0
        }
        cursorNode.parentNode.insertBefore(lastTextNode, cursorNode)
      }
    }else {
      while(lastTextNode.nextSibling && lastTextNode.nextSibling.localName === "cursor") {
        lastTextNode.parentNode.insertBefore(lastTextNode.nextSibling, lastTextNode)
      }
    }
    while(lastTextNode.previousSibling && lastTextNode.previousSibling.nodeType === Node.TEXT_NODE) {
      lastTextNode.previousSibling.appendData(lastTextNode.data);
      nodeOffset = (lastTextNode.previousSibling.length);
      lastTextNode = (lastTextNode.previousSibling);
      lastTextNode.parentNode.removeChild(lastTextNode.nextSibling)
    }
    while(lastTextNode.nextSibling && lastTextNode.nextSibling.nodeType === Node.TEXT_NODE) {
      lastTextNode.appendData(lastTextNode.nextSibling.data);
      lastTextNode.parentNode.removeChild(lastTextNode.nextSibling)
    }
    return{textNode:lastTextNode, offset:nodeOffset}
  }
  function getParagraphElement(node) {
    return odfUtils.getParagraphElement(node)
  }
  function getStyleElement(styleName, styleFamily) {
    return odfCanvas.getFormatting().getStyleElement(styleName, styleFamily)
  }
  this.getStyleElement = getStyleElement;
  function getParagraphStyleElement(styleName) {
    return getStyleElement(styleName, "paragraph")
  }
  function getParagraphStyleAttributes(styleName) {
    var node = getParagraphStyleElement(styleName);
    if(node) {
      return odfCanvas.getFormatting().getInheritedStyleAttributes(node)
    }
    return null
  }
  function handleOperationExecuted(op) {
    var spec = op.spec(), memberId = spec.memberid, date = (new Date(spec.timestamp)).toISOString(), odfContainer = odfCanvas.odfContainer(), fullName;
    if(op.isEdit) {
      fullName = self.getMember(memberId).getProperties().fullName;
      odfContainer.setMetadata({"dc:creator":fullName, "dc:date":date}, null);
      if(!lastEditingOp) {
        odfContainer.incrementEditingCycles();
        if(!unsupportedMetadataRemoved) {
          odfContainer.setMetadata(null, ["meta:editing-duration", "meta:document-statistic"])
        }
      }
      lastEditingOp = op
    }
  }
  function upgradeWhitespaceToElement(textNode, offset) {
    runtime.assert(textNode.data[offset] === " ", "upgradeWhitespaceToElement: textNode.data[offset] should be a literal space");
    var space = textNode.ownerDocument.createElementNS(odf.Namespaces.textns, "text:s");
    space.appendChild(textNode.ownerDocument.createTextNode(" "));
    textNode.deleteData(offset, 1);
    if(offset > 0) {
      textNode = (textNode.splitText(offset))
    }
    textNode.parentNode.insertBefore(space, textNode);
    return space
  }
  function upgradeWhitespacesAtPosition(position) {
    var iterator = getIteratorAtPosition(position), container, offset, i;
    iterator.previousPosition();
    iterator.previousPosition();
    for(i = -1;i <= 1;i += 1) {
      container = iterator.container();
      offset = iterator.unfilteredDomOffset();
      if(container.nodeType === Node.TEXT_NODE && (container.data[offset] === " " && odfUtils.isSignificantWhitespace(container, offset))) {
        container = upgradeWhitespaceToElement((container), offset);
        iterator.moveToEndOfNode(container)
      }
      iterator.nextPosition()
    }
  }
  this.upgradeWhitespacesAtPosition = upgradeWhitespacesAtPosition;
  this.downgradeWhitespacesAtPosition = function(position) {
    var iterator = getIteratorAtPosition(position), container, offset, firstSpaceElementChild, lastSpaceElementChild;
    container = iterator.container();
    offset = iterator.unfilteredDomOffset();
    while(!odfUtils.isSpaceElement(container) && container.childNodes[offset]) {
      container = container.childNodes[offset];
      offset = 0
    }
    if(container.nodeType === Node.TEXT_NODE) {
      container = container.parentNode
    }
    if(odfUtils.isDowngradableSpaceElement(container)) {
      firstSpaceElementChild = container.firstChild;
      lastSpaceElementChild = container.lastChild;
      domUtils.mergeIntoParent(container);
      if(lastSpaceElementChild !== firstSpaceElementChild) {
        domUtils.normalizeTextNodes(lastSpaceElementChild)
      }
      domUtils.normalizeTextNodes(firstSpaceElementChild)
    }
  };
  this.getParagraphStyleElement = getParagraphStyleElement;
  this.getParagraphElement = getParagraphElement;
  this.getParagraphStyleAttributes = getParagraphStyleAttributes;
  this.getTextNodeAtStep = getTextNodeAtStep;
  this.fixCursorPositions = function() {
    var rootConstrainedFilter = new core.PositionFilterChain;
    rootConstrainedFilter.addFilter("BaseFilter", filter);
    Object.keys(cursors).forEach(function(memberId) {
      var cursor = cursors[memberId], stepCounter = cursor.getStepCounter(), stepsSelectionLength, positionsToAdjustFocus, positionsToAdjustAnchor, positionsToAnchor, cursorMoved = false;
      rootConstrainedFilter.addFilter("RootFilter", self.createRootFilter(memberId));
      stepsSelectionLength = stepCounter.countStepsToPosition(cursor.getAnchorNode(), 0, rootConstrainedFilter);
      if(!stepCounter.isPositionWalkable(rootConstrainedFilter)) {
        cursorMoved = true;
        positionsToAdjustFocus = stepCounter.countPositionsToNearestStep(cursor.getNode(), 0, rootConstrainedFilter);
        positionsToAdjustAnchor = stepCounter.countPositionsToNearestStep(cursor.getAnchorNode(), 0, rootConstrainedFilter);
        cursor.move(positionsToAdjustFocus);
        if(stepsSelectionLength !== 0) {
          if(positionsToAdjustAnchor > 0) {
            stepsSelectionLength += 1
          }
          if(positionsToAdjustFocus > 0) {
            stepsSelectionLength -= 1
          }
          positionsToAnchor = stepCounter.countSteps(stepsSelectionLength, rootConstrainedFilter);
          cursor.move(positionsToAnchor);
          cursor.move(-positionsToAnchor, true)
        }
      }else {
        if(stepsSelectionLength === 0) {
          cursorMoved = true;
          cursor.move(0)
        }
      }
      if(cursorMoved) {
        self.emit(ops.OdtDocument.signalCursorMoved, cursor)
      }
      rootConstrainedFilter.removeFilter("RootFilter")
    })
  };
  this.getDistanceFromCursor = function(memberid, node, offset) {
    var cursor = cursors[memberid], focusPosition, targetPosition;
    runtime.assert(node !== null && node !== undefined, "OdtDocument.getDistanceFromCursor called without node");
    if(cursor) {
      focusPosition = stepsTranslator.convertDomPointToSteps(cursor.getNode(), 0);
      targetPosition = stepsTranslator.convertDomPointToSteps(node, offset)
    }
    return targetPosition - focusPosition
  };
  this.getCursorPosition = function(memberid) {
    var cursor = cursors[memberid];
    return cursor ? stepsTranslator.convertDomPointToSteps(cursor.getNode(), 0) : 0
  };
  this.getCursorSelection = function(memberid) {
    var cursor = cursors[memberid], focusPosition = 0, anchorPosition = 0;
    if(cursor) {
      focusPosition = stepsTranslator.convertDomPointToSteps(cursor.getNode(), 0);
      anchorPosition = stepsTranslator.convertDomPointToSteps(cursor.getAnchorNode(), 0)
    }
    return{position:anchorPosition, length:focusPosition - anchorPosition}
  };
  this.getPositionFilter = function() {
    return filter
  };
  this.getOdfCanvas = function() {
    return odfCanvas
  };
  this.getRootNode = getRootNode;
  this.addMember = function(member) {
    runtime.assert(members[member.getMemberId()] === undefined, "This member already exists");
    members[member.getMemberId()] = member
  };
  this.getMember = function(memberId) {
    return members.hasOwnProperty(memberId) ? members[memberId] : null
  };
  this.removeMember = function(memberId) {
    delete members[memberId]
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
    runtime.assert(Boolean(cursor), "OdtDocument::addCursor without cursor");
    var distanceToFirstTextNode = cursor.getStepCounter().countSteps(1, filter), memberid = cursor.getMemberId();
    runtime.assert(typeof memberid === "string", "OdtDocument::addCursor has cursor without memberid");
    runtime.assert(!cursors[memberid], "OdtDocument::addCursor is adding a duplicate cursor with memberid " + memberid);
    cursor.move(distanceToFirstTextNode);
    cursors[memberid] = cursor
  };
  this.removeCursor = function(memberid) {
    var cursor = cursors[memberid];
    if(cursor) {
      cursor.removeFromOdtDocument();
      delete cursors[memberid];
      self.emit(ops.OdtDocument.signalCursorRemoved, memberid);
      return true
    }
    return false
  };
  this.moveCursor = function(memberid, position, length, selectionType) {
    var cursor = cursors[memberid], selectionRange = self.convertCursorToDomRange(position, length);
    if(cursor && selectionRange) {
      cursor.setSelectedRange(selectionRange, length >= 0);
      cursor.setSelectionType(selectionType || ops.OdtCursor.RangeSelection)
    }
  };
  this.getFormatting = function() {
    return odfCanvas.getFormatting()
  };
  this.emit = function(eventid, args) {
    eventNotifier.emit(eventid, args)
  };
  this.subscribe = function(eventid, cb) {
    eventNotifier.subscribe(eventid, cb)
  };
  this.unsubscribe = function(eventid, cb) {
    eventNotifier.unsubscribe(eventid, cb)
  };
  this.createRootFilter = function(inputMemberId) {
    return new RootFilter(inputMemberId)
  };
  this.close = function(callback) {
    callback()
  };
  this.destroy = function(callback) {
    callback()
  };
  function init() {
    filter = new ops.TextPositionFilter(getRootNode);
    odfUtils = new odf.OdfUtils;
    domUtils = new core.DomUtils;
    stepsTranslator = new ops.StepsTranslator(getRootNode, gui.SelectionMover.createPositionIterator, filter, 500);
    eventNotifier.subscribe(ops.OdtDocument.signalStepsInserted, stepsTranslator.handleStepsInserted);
    eventNotifier.subscribe(ops.OdtDocument.signalStepsRemoved, stepsTranslator.handleStepsRemoved);
    eventNotifier.subscribe(ops.OdtDocument.signalOperationExecuted, handleOperationExecuted)
  }
  init()
};
ops.OdtDocument.signalMemberAdded = "member/added";
ops.OdtDocument.signalMemberUpdated = "member/updated";
ops.OdtDocument.signalMemberRemoved = "member/removed";
ops.OdtDocument.signalCursorAdded = "cursor/added";
ops.OdtDocument.signalCursorRemoved = "cursor/removed";
ops.OdtDocument.signalCursorMoved = "cursor/moved";
ops.OdtDocument.signalParagraphChanged = "paragraph/changed";
ops.OdtDocument.signalTableAdded = "table/added";
ops.OdtDocument.signalCommonStyleCreated = "style/created";
ops.OdtDocument.signalCommonStyleDeleted = "style/deleted";
ops.OdtDocument.signalParagraphStyleModified = "paragraphstyle/modified";
ops.OdtDocument.signalOperationExecuted = "operation/executed";
ops.OdtDocument.signalUndoStackChanged = "undo/changed";
ops.OdtDocument.signalStepsInserted = "steps/inserted";
ops.OdtDocument.signalStepsRemoved = "steps/removed";
(function() {
  return ops.OdtDocument
})();
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
ops.Operation = function Operation() {
};
ops.Operation.prototype.init = function(data) {
};
ops.Operation.prototype.isEdit;
ops.Operation.prototype.execute = function(odtDocument) {
};
ops.Operation.prototype.spec = function() {
};
runtime.loadClass("xmldom.RelaxNGParser");
xmldom.RelaxNGItem;
xmldom.RelaxNG = function RelaxNG() {
  var xmlnsns = "http://www.w3.org/2000/xmlns/", createChoice, createInterleave, createGroup, createAfter, createOneOrMore, createValue, createAttribute, createNameClass, createData, makePattern, applyAfter, childDeriv, rootPattern, notAllowed = {type:"notAllowed", nullable:false, hash:"notAllowed", nc:undefined, p:undefined, p1:undefined, p2:undefined, textDeriv:function() {
    return notAllowed
  }, startTagOpenDeriv:function() {
    return notAllowed
  }, attDeriv:function() {
    return notAllowed
  }, startTagCloseDeriv:function() {
    return notAllowed
  }, endTagDeriv:function() {
    return notAllowed
  }}, empty = {type:"empty", nullable:true, hash:"empty", nc:undefined, p:undefined, p1:undefined, p2:undefined, textDeriv:function() {
    return notAllowed
  }, startTagOpenDeriv:function() {
    return notAllowed
  }, attDeriv:function() {
    return notAllowed
  }, startTagCloseDeriv:function() {
    return empty
  }, endTagDeriv:function() {
    return notAllowed
  }}, text = {type:"text", nullable:true, hash:"text", nc:undefined, p:undefined, p1:undefined, p2:undefined, textDeriv:function() {
    return text
  }, startTagOpenDeriv:function() {
    return notAllowed
  }, attDeriv:function() {
    return notAllowed
  }, startTagCloseDeriv:function() {
    return text
  }, endTagDeriv:function() {
    return notAllowed
  }};
  function memoize0arg(func) {
    function f() {
      var cache;
      function g() {
        if(cache === undefined) {
          cache = func()
        }
        return cache
      }
      return g
    }
    return f()
  }
  function memoize1arg(type, func) {
    function f() {
      var cache = {}, cachecount = 0;
      function g(a) {
        var ahash = a.hash || a.toString(), v;
        if(cache.hasOwnProperty(ahash)) {
          return cache[ahash]
        }
        cache[ahash] = v = func(a);
        v.hash = type + cachecount.toString();
        cachecount += 1;
        return v
      }
      return g
    }
    return f()
  }
  function memoizeNode(func) {
    function f() {
      var cache = {};
      function g(node) {
        var v, m;
        if(!cache.hasOwnProperty(node.localName)) {
          cache[node.localName] = m = {}
        }else {
          m = cache[node.localName];
          v = m[node.namespaceURI];
          if(v !== undefined) {
            return v
          }
        }
        m[node.namespaceURI] = v = func(node);
        return v
      }
      return g
    }
    return f()
  }
  function memoize2arg(type, fastfunc, func) {
    function f() {
      var cache = {}, cachecount = 0;
      function g(a, b) {
        var v = fastfunc && fastfunc(a, b), ahash, bhash, m;
        if(v !== undefined) {
          return v
        }
        ahash = a.hash || a.toString();
        bhash = b.hash || b.toString();
        if(!cache.hasOwnProperty(ahash)) {
          cache[ahash] = m = {}
        }else {
          m = cache[ahash];
          if(m.hasOwnProperty(bhash)) {
            return m[bhash]
          }
        }
        m[bhash] = v = func(a, b);
        v.hash = type + cachecount.toString();
        cachecount += 1;
        return v
      }
      return g
    }
    return f()
  }
  function unorderedMemoize2arg(type, fastfunc, func) {
    function f() {
      var cache = {}, cachecount = 0;
      function g(a, b) {
        var v = fastfunc && fastfunc(a, b), ahash, bhash, hash, m;
        if(v !== undefined) {
          return v
        }
        ahash = a.hash || a.toString();
        bhash = b.hash || b.toString();
        if(ahash < bhash) {
          hash = ahash;
          ahash = bhash;
          bhash = hash;
          hash = a;
          a = b;
          b = hash
        }
        if(!cache.hasOwnProperty(ahash)) {
          cache[ahash] = m = {}
        }else {
          m = cache[ahash];
          if(m.hasOwnProperty(bhash)) {
            return m[bhash]
          }
        }
        m[bhash] = v = func(a, b);
        v.hash = type + cachecount.toString();
        cachecount += 1;
        return v
      }
      return g
    }
    return f()
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
      return{type:"choice", nullable:p1.nullable || p2.nullable, hash:undefined, nc:undefined, p:undefined, p1:p1, p2:p2, textDeriv:function(context, text) {
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
    return{type:"interleave", nullable:p1.nullable && p2.nullable, hash:undefined, p1:p1, p2:p2, textDeriv:function(context, text) {
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
    }), endTagDeriv:undefined}
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
    }, attDeriv:function() {
      return notAllowed
    }, startTagCloseDeriv:function() {
      return this
    }}
  }
  function valueMatch(context, pattern, text) {
    return pattern.nullable && /^\s+$/.test(text) || pattern.textDeriv(context, text).nullable
  }
  createAttribute = memoize2arg("attribute", undefined, function(nc, p) {
    return{type:"attribute", nullable:false, hash:undefined, nc:nc, p:p, p1:undefined, p2:undefined, textDeriv:undefined, startTagOpenDeriv:undefined, attDeriv:function(context, attribute) {
      if(nc.contains(attribute) && valueMatch(context, p, attribute.nodeValue)) {
        return empty
      }
      return notAllowed
    }, startTagCloseDeriv:function() {
      return notAllowed
    }, endTagDeriv:undefined}
  });
  function createList() {
    return{type:"list", nullable:false, hash:"list", textDeriv:function() {
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
    var element = walker.currentNode, childNode = walker.firstChild(), childNodes = [], i, p;
    while(childNode) {
      if(childNode.nodeType === Node.ELEMENT_NODE) {
        childNodes.push(childNode)
      }else {
        if(childNode.nodeType === Node.TEXT_NODE && !/^\s*$/.test(childNode.nodeValue)) {
          childNodes.push(childNode.nodeValue)
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
          var j;
          for(j = 0;j < name.length;j += 1) {
            if(name[j] === node.localName && ns[j] === node.namespaceURI) {
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
  var start, validateNonEmptyPattern, nsmap;
  function RelaxNGParseError(error, context) {
    this.message = function() {
      if(context) {
        error += context.nodeType === Node.ELEMENT_NODE ? " Element " : " Node ";
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
    return node && (node.nodeType === Node.TEXT_NODE && /^\s+$/.test(node.nodeValue))
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
  function validateElement(elementdef, walker) {
    if(elementdef.e.length !== 2) {
      throw"Element with wrong # of elements: " + elementdef.e.length;
    }
    var node = walker.currentNode, type = node ? node.nodeType : 0, error = null;
    while(type > Node.ELEMENT_NODE) {
      if(type !== Node.COMMENT_NODE && (type !== Node.TEXT_NODE || !/^\s+$/.test(walker.currentNode.nodeValue))) {
        return[new RelaxNGParseError("Not allowed node of type " + type + ".")]
      }
      node = walker.nextSibling();
      type = node ? node.nodeType : 0
    }
    if(!node) {
      return[new RelaxNGParseError("Missing element " + elementdef.names)]
    }
    if(elementdef.names && elementdef.names.indexOf(qName(node)) === -1) {
      return[new RelaxNGParseError("Found " + node.nodeName + " instead of " + elementdef.names + ".", node)]
    }
    if(walker.firstChild()) {
      error = validateTop(elementdef.e[1], walker, node);
      while(walker.nextSibling()) {
        type = walker.currentNode.nodeType;
        if(!isWhitespace(walker.currentNode) && type !== Node.COMMENT_NODE) {
          return[new RelaxNGParseError("Spurious content.", walker.currentNode)]
        }
      }
      if(walker.parentNode() !== node) {
        return[new RelaxNGParseError("Implementation error.")]
      }
    }else {
      error = validateTop(elementdef.e[1], walker, node)
    }
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
            if(subnode === walker.currentNode || (e.name === "oneOrMore" || e.name === "choice" && (e.e[0].name === "oneOrMore" || e.e[1].name === "oneOrMore"))) {
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
    var node = walker.currentNode, type = node ? node.nodeType : 0;
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
                err = validateElement(elementdef, walker)
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
    var errors = validatePattern(start.e[0], walker, (walker.root));
    callback(errors)
  };
  this.init = function init(start1, nsmap1) {
    start = start1;
    nsmap = nsmap1
  }
};
runtime.loadClass("core.DomUtils");
runtime.loadClass("gui.Avatar");
runtime.loadClass("ops.OdtCursor");
gui.Caret = function Caret(cursor, avatarInitiallyVisible, blinkOnRangeSelect) {
  var MIN_CARET_HEIGHT_PX = 8, DEFAULT_CARET_TOP = "5%", DEFAULT_CARET_HEIGHT = "1em", span, avatar, cursorNode, isShown = true, shouldBlink = false, blinking = false, blinkTimeout, domUtils = new core.DomUtils;
  function blink(reset) {
    if(!shouldBlink || !cursorNode.parentNode) {
      return
    }
    if(!blinking || reset) {
      if(reset && blinkTimeout !== undefined) {
        runtime.clearTimeout(blinkTimeout)
      }
      blinking = true;
      span.style.opacity = reset || span.style.opacity === "0" ? "1" : "0";
      blinkTimeout = runtime.setTimeout(function() {
        blinking = false;
        blink(false)
      }, 500)
    }
  }
  function getCaretClientRectWithMargin(caretElement, margin) {
    var caretRect = caretElement.getBoundingClientRect();
    return{left:caretRect.left - margin.left, top:caretRect.top - margin.top, right:caretRect.right + margin.right, bottom:caretRect.bottom + margin.bottom}
  }
  function length(node) {
    return node.nodeType === Node.TEXT_NODE ? node.textContent.length : node.childNodes.length
  }
  function verticalOverlap(cursorNode, rangeRect) {
    var cursorRect = cursorNode.getBoundingClientRect(), intersectTop = 0, intersectBottom = 0;
    if(cursorRect && rangeRect) {
      intersectTop = Math.max(cursorRect.top, rangeRect.top);
      intersectBottom = Math.min(cursorRect.bottom, rangeRect.bottom)
    }
    return intersectBottom - intersectTop
  }
  function getSelectionRect() {
    var range = cursor.getSelectedRange().cloneRange(), node = cursor.getNode(), nextRectangle, selectionRectangle = null, nodeLength;
    if(node.previousSibling) {
      nodeLength = length(node.previousSibling);
      range.setStart(node.previousSibling, nodeLength > 0 ? nodeLength - 1 : 0);
      range.setEnd(node.previousSibling, nodeLength);
      nextRectangle = range.getBoundingClientRect();
      if(nextRectangle && nextRectangle.height) {
        selectionRectangle = nextRectangle
      }
    }
    if(node.nextSibling) {
      range.setStart(node.nextSibling, 0);
      range.setEnd(node.nextSibling, length(node.nextSibling) > 0 ? 1 : 0);
      nextRectangle = range.getBoundingClientRect();
      if(nextRectangle && nextRectangle.height) {
        if(!selectionRectangle || verticalOverlap(node, nextRectangle) > verticalOverlap(node, selectionRectangle)) {
          selectionRectangle = nextRectangle
        }
      }
    }
    return selectionRectangle
  }
  function handleUpdate() {
    var selectionRect = getSelectionRect(), zoomLevel = cursor.getOdtDocument().getOdfCanvas().getZoomLevel(), caretRect;
    if(isShown && cursor.getSelectionType() === ops.OdtCursor.RangeSelection) {
      span.style.visibility = "visible"
    }else {
      span.style.visibility = "hidden"
    }
    if(selectionRect) {
      span.style.top = "0";
      caretRect = domUtils.getBoundingClientRect(span);
      if(selectionRect.height < MIN_CARET_HEIGHT_PX) {
        selectionRect = {top:selectionRect.top - (MIN_CARET_HEIGHT_PX - selectionRect.height) / 2, height:MIN_CARET_HEIGHT_PX}
      }
      span.style.height = domUtils.adaptRangeDifferenceToZoomLevel(selectionRect.height, zoomLevel) + "px";
      span.style.top = domUtils.adaptRangeDifferenceToZoomLevel(selectionRect.top - caretRect.top, zoomLevel) + "px"
    }else {
      span.style.height = DEFAULT_CARET_HEIGHT;
      span.style.top = DEFAULT_CARET_TOP
    }
  }
  this.handleUpdate = handleUpdate;
  this.refreshCursorBlinking = function() {
    if(blinkOnRangeSelect || cursor.getSelectedRange().collapsed) {
      shouldBlink = true;
      blink(true)
    }else {
      shouldBlink = false;
      span.style.opacity = "0"
    }
  };
  this.setFocus = function() {
    shouldBlink = true;
    avatar.markAsFocussed(true);
    blink(true)
  };
  this.removeFocus = function() {
    shouldBlink = false;
    avatar.markAsFocussed(false);
    span.style.opacity = "1"
  };
  this.show = function() {
    isShown = true;
    handleUpdate();
    avatar.markAsFocussed(true)
  };
  this.hide = function() {
    isShown = false;
    handleUpdate();
    avatar.markAsFocussed(false)
  };
  this.setAvatarImageUrl = function(url) {
    avatar.setImageUrl(url)
  };
  this.setColor = function(newColor) {
    span.style.borderColor = newColor;
    avatar.setColor(newColor)
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
    var canvasElement = cursor.getOdtDocument().getOdfCanvas().getElement(), canvasContainerElement = canvasElement.parentNode, caretRect, canvasContainerRect, horizontalMargin = canvasContainerElement.offsetWidth - canvasContainerElement.clientWidth + 5, verticalMargin = canvasContainerElement.offsetHeight - canvasContainerElement.clientHeight + 5;
    caretRect = getCaretClientRectWithMargin(span, {top:verticalMargin, left:horizontalMargin, bottom:verticalMargin, right:horizontalMargin});
    canvasContainerRect = canvasContainerElement.getBoundingClientRect();
    if(caretRect.top < canvasContainerRect.top) {
      canvasContainerElement.scrollTop -= canvasContainerRect.top - caretRect.top
    }else {
      if(caretRect.bottom > canvasContainerRect.bottom) {
        canvasContainerElement.scrollTop += caretRect.bottom - canvasContainerRect.bottom
      }
    }
    if(caretRect.left < canvasContainerRect.left) {
      canvasContainerElement.scrollLeft -= canvasContainerRect.left - caretRect.left
    }else {
      if(caretRect.right > canvasContainerRect.right) {
        canvasContainerElement.scrollLeft += caretRect.right - canvasContainerRect.right
      }
    }
    handleUpdate()
  };
  this.destroy = function(callback) {
    avatar.destroy(function(err) {
      if(err) {
        callback(err)
      }else {
        cursorNode.removeChild(span);
        callback()
      }
    })
  };
  function init() {
    var dom = cursor.getOdtDocument().getDOM(), htmlns = dom.documentElement.namespaceURI;
    span = (dom.createElementNS(htmlns, "span"));
    span.style.top = DEFAULT_CARET_TOP;
    cursorNode = cursor.getNode();
    cursorNode.appendChild(span);
    avatar = new gui.Avatar(cursorNode, avatarInitiallyVisible);
    handleUpdate()
  }
  init()
};
gui.EventManager = function EventManager(odtDocument) {
  var window = (runtime.getWindow()), bindToDirectHandler = {"beforecut":true, "beforepaste":true}, bindToWindow, eventTrap;
  function getCanvasElement() {
    return odtDocument.getOdfCanvas().getElement()
  }
  function EventDelegate() {
    var self = this, recentEvents = [];
    this.handlers = [];
    this.isSubscribed = false;
    this.handleEvent = function(e) {
      if(recentEvents.indexOf(e) === -1) {
        recentEvents.push(e);
        self.handlers.forEach(function(handler) {
          handler(e)
        });
        runtime.setTimeout(function() {
          recentEvents.splice(recentEvents.indexOf(e), 1)
        }, 0)
      }
    }
  }
  function WindowScrollState(window) {
    var x = window.scrollX, y = window.scrollY;
    this.restore = function() {
      if(window.scrollX !== x || window.scrollY !== y) {
        window.scrollTo(x, y)
      }
    }
  }
  function ElementScrollState(element) {
    var top = element.scrollTop, left = element.scrollLeft;
    this.restore = function() {
      if(element.scrollTop !== top || element.scrollLeft !== left) {
        element.scrollTop = top;
        element.scrollLeft = left
      }
    }
  }
  function listenEvent(eventTarget, eventType, eventHandler) {
    var onVariant = "on" + eventType, bound = false;
    if(eventTarget.attachEvent) {
      bound = eventTarget.attachEvent(onVariant, eventHandler)
    }
    if(!bound && eventTarget.addEventListener) {
      eventTarget.addEventListener(eventType, eventHandler, false);
      bound = true
    }
    if((!bound || bindToDirectHandler[eventType]) && eventTarget.hasOwnProperty(onVariant)) {
      eventTarget[onVariant] = eventHandler
    }
  }
  function removeEvent(eventTarget, eventType, eventHandler) {
    var onVariant = "on" + eventType;
    if(eventTarget.detachEvent) {
      eventTarget.detachEvent(onVariant, eventHandler)
    }
    if(eventTarget.removeEventListener) {
      eventTarget.removeEventListener(eventType, eventHandler, false)
    }
    if(eventTarget[onVariant] === eventHandler) {
      eventTarget[onVariant] = null
    }
  }
  this.subscribe = function(eventName, handler) {
    var delegate = bindToWindow[eventName], canvasElement = getCanvasElement();
    if(delegate) {
      delegate.handlers.push(handler);
      if(!delegate.isSubscribed) {
        delegate.isSubscribed = true;
        listenEvent((window), eventName, delegate.handleEvent);
        listenEvent(canvasElement, eventName, delegate.handleEvent);
        listenEvent(eventTrap, eventName, delegate.handleEvent)
      }
    }else {
      listenEvent(canvasElement, eventName, handler)
    }
  };
  this.unsubscribe = function(eventName, handler) {
    var delegate = bindToWindow[eventName], handlerIndex = delegate && delegate.handlers.indexOf(handler), canvasElement = getCanvasElement();
    if(delegate) {
      if(handlerIndex !== -1) {
        delegate.handlers.splice(handlerIndex, 1)
      }
    }else {
      removeEvent(canvasElement, eventName, handler)
    }
  };
  function hasFocus() {
    return odtDocument.getDOM().activeElement === getCanvasElement()
  }
  function findScrollableParent(element) {
    while(element && (!element.scrollTop && !element.scrollLeft)) {
      element = (element.parentNode)
    }
    if(element) {
      return new ElementScrollState(element)
    }
    return new WindowScrollState(window)
  }
  this.focus = function() {
    var scrollParent, canvasElement = getCanvasElement(), selection = window.getSelection();
    if(!hasFocus()) {
      scrollParent = findScrollableParent(canvasElement);
      canvasElement.focus();
      if(scrollParent) {
        scrollParent.restore()
      }
    }
    if(selection && selection.extend) {
      if(eventTrap.parentNode !== canvasElement) {
        canvasElement.appendChild(eventTrap)
      }
      selection.collapse(eventTrap.firstChild, 0);
      selection.extend(eventTrap, eventTrap.childNodes.length)
    }
  };
  function init() {
    var canvasElement = getCanvasElement(), doc = canvasElement.ownerDocument;
    runtime.assert(Boolean(window), "EventManager requires a window object to operate correctly");
    bindToWindow = {"mousedown":new EventDelegate, "mouseup":new EventDelegate, "focus":new EventDelegate};
    eventTrap = doc.createElement("div");
    eventTrap.id = "eventTrap";
    eventTrap.setAttribute("contenteditable", "true");
    eventTrap.style.position = "absolute";
    eventTrap.style.left = "-10000px";
    eventTrap.appendChild(doc.createTextNode("dummy content"));
    canvasElement.appendChild(eventTrap)
  }
  init()
};
runtime.loadClass("gui.SelectionMover");
gui.ShadowCursor = function ShadowCursor(odtDocument) {
  var selectedRange = (odtDocument.getDOM().createRange()), forwardSelection = true;
  this.removeFromOdtDocument = function() {
  };
  this.getMemberId = function() {
    return gui.ShadowCursor.ShadowCursorMemberId
  };
  this.getSelectedRange = function() {
    return selectedRange
  };
  this.setSelectedRange = function(range, isForwardSelection) {
    selectedRange = range;
    forwardSelection = isForwardSelection !== false
  };
  this.hasForwardSelection = function() {
    return forwardSelection
  };
  this.getOdtDocument = function() {
    return odtDocument
  };
  this.getSelectionType = function() {
    return ops.OdtCursor.RangeSelection
  };
  function init() {
    selectedRange.setStart(odtDocument.getRootNode(), 0)
  }
  init()
};
gui.ShadowCursor.ShadowCursorMemberId = "";
(function() {
  return gui.ShadowCursor
})();
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
gui.UndoManager = function UndoManager() {
};
gui.UndoManager.prototype.subscribe = function(signal, callback) {
};
gui.UndoManager.prototype.unsubscribe = function(signal, callback) {
};
gui.UndoManager.prototype.setOdtDocument = function(newDocument) {
};
gui.UndoManager.prototype.saveInitialState = function() {
};
gui.UndoManager.prototype.resetInitialState = function() {
};
gui.UndoManager.prototype.setPlaybackFunction = function(playback_func) {
};
gui.UndoManager.prototype.hasUndoStates = function() {
};
gui.UndoManager.prototype.hasRedoStates = function() {
};
gui.UndoManager.prototype.moveForward = function(states) {
};
gui.UndoManager.prototype.moveBackward = function(states) {
};
gui.UndoManager.prototype.onOperationExecuted = function(op) {
};
gui.UndoManager.signalUndoStackChanged = "undoStackChanged";
gui.UndoManager.signalUndoStateCreated = "undoStateCreated";
gui.UndoManager.signalUndoStateModified = "undoStateModified";
(function() {
  return gui.UndoManager
})();
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
gui.UndoStateRules = function UndoStateRules() {
  function getOpType(op) {
    return op.spec().optype
  }
  this.getOpType = getOpType;
  function getOpPosition(op) {
    return op.spec().position
  }
  function isEditOperation(op) {
    return op.isEdit
  }
  this.isEditOperation = isEditOperation;
  function canAggregateOperation(optype) {
    switch(optype) {
      case "RemoveText":
      ;
      case "InsertText":
        return true;
      default:
        return false
    }
  }
  function isSameDirectionOfTravel(recentEditOps, thisOp) {
    var existing1 = getOpPosition(recentEditOps[recentEditOps.length - 2]), existing2 = getOpPosition(recentEditOps[recentEditOps.length - 1]), thisPos = getOpPosition(thisOp), direction = existing2 - existing1;
    return existing2 === thisPos - direction
  }
  function isContinuousOperation(recentEditOps, thisOp) {
    var optype = getOpType(thisOp);
    if(canAggregateOperation(optype) && optype === getOpType(recentEditOps[0])) {
      if(recentEditOps.length === 1) {
        return true
      }
      if(isSameDirectionOfTravel(recentEditOps, thisOp)) {
        return true
      }
    }
    return false
  }
  function isPartOfOperationSet(operation, lastOperations) {
    if(isEditOperation(operation)) {
      if(lastOperations.length === 0) {
        return true
      }
      return isEditOperation(lastOperations[lastOperations.length - 1]) && isContinuousOperation(lastOperations.filter(isEditOperation), operation)
    }
    return true
  }
  this.isPartOfOperationSet = isPartOfOperationSet
};
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
ops.EditInfo = function EditInfo(container, odtDocument) {
  var editInfoNode, editHistory = {};
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
    editHistory[memberid] = {time:timestamp}
  };
  this.clearEdits = function() {
    editHistory = {}
  };
  this.destroy = function(callback) {
    if(container.parentNode) {
      container.removeChild(editInfoNode)
    }
    callback()
  };
  function init() {
    var editInfons = "urn:webodf:names:editinfo", dom = odtDocument.getDOM();
    editInfoNode = dom.createElementNS(editInfons, "editinfo");
    container.insertBefore(editInfoNode, container.firstChild)
  }
  init()
};
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
ops.OpAddAnnotation = function OpAddAnnotation() {
  var memberid, timestamp, position, length, name, doc;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = parseInt(data.timestamp, 10);
    position = parseInt(data.position, 10);
    length = parseInt(data.length, 10) || 0;
    name = data.name
  };
  this.isEdit = true;
  function createAnnotationNode(odtDocument, date) {
    var annotationNode, creatorNode, dateNode, listNode, listItemNode, paragraphNode;
    annotationNode = doc.createElementNS(odf.Namespaces.officens, "office:annotation");
    annotationNode.setAttributeNS(odf.Namespaces.officens, "office:name", name);
    creatorNode = doc.createElementNS(odf.Namespaces.dcns, "dc:creator");
    creatorNode.setAttributeNS("urn:webodf:names:editinfo", "editinfo:memberid", memberid);
    creatorNode.textContent = odtDocument.getMember(memberid).getProperties().fullName;
    dateNode = doc.createElementNS(odf.Namespaces.dcns, "dc:date");
    dateNode.appendChild(doc.createTextNode(date.toISOString()));
    listNode = doc.createElementNS(odf.Namespaces.textns, "text:list");
    listItemNode = doc.createElementNS(odf.Namespaces.textns, "text:list-item");
    paragraphNode = doc.createElementNS(odf.Namespaces.textns, "text:p");
    listItemNode.appendChild(paragraphNode);
    listNode.appendChild(listItemNode);
    annotationNode.appendChild(creatorNode);
    annotationNode.appendChild(dateNode);
    annotationNode.appendChild(listNode);
    return annotationNode
  }
  function createAnnotationEnd() {
    var annotationEnd;
    annotationEnd = doc.createElementNS(odf.Namespaces.officens, "office:annotation-end");
    annotationEnd.setAttributeNS(odf.Namespaces.officens, "office:name", name);
    return annotationEnd
  }
  function insertNodeAtPosition(odtDocument, node, insertPosition) {
    var previousNode, parentNode, domPosition = odtDocument.getTextNodeAtStep(insertPosition, memberid);
    if(domPosition) {
      previousNode = domPosition.textNode;
      parentNode = previousNode.parentNode;
      if(domPosition.offset !== previousNode.length) {
        previousNode.splitText(domPosition.offset)
      }
      parentNode.insertBefore(node, previousNode.nextSibling);
      if(previousNode.length === 0) {
        parentNode.removeChild(previousNode)
      }
    }
  }
  this.execute = function(odtDocument) {
    var annotation = {}, cursor = odtDocument.getCursor(memberid), selectedRange, paragraphElement, domUtils = new core.DomUtils;
    doc = odtDocument.getDOM();
    annotation.node = createAnnotationNode(odtDocument, new Date(timestamp));
    if(!annotation.node) {
      return false
    }
    if(length) {
      annotation.end = createAnnotationEnd();
      if(!annotation.end) {
        return false
      }
      insertNodeAtPosition(odtDocument, annotation.end, position + length)
    }
    insertNodeAtPosition(odtDocument, annotation.node, position);
    odtDocument.emit(ops.OdtDocument.signalStepsInserted, {position:position, length:length});
    if(cursor) {
      selectedRange = doc.createRange();
      paragraphElement = domUtils.getElementsByTagNameNS(annotation.node, odf.Namespaces.textns, "p")[0];
      selectedRange.selectNodeContents(paragraphElement);
      cursor.setSelectedRange(selectedRange);
      odtDocument.emit(ops.OdtDocument.signalCursorMoved, cursor)
    }
    odtDocument.getOdfCanvas().addAnnotation(annotation);
    odtDocument.fixCursorPositions();
    return true
  };
  this.spec = function() {
    return{optype:"AddAnnotation", memberid:memberid, timestamp:timestamp, position:position, length:length, name:name}
  }
};
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
ops.OpAddCursor = function OpAddCursor() {
  var memberid, timestamp;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp
  };
  this.isEdit = false;
  this.execute = function(odtDocument) {
    var cursor = odtDocument.getCursor(memberid);
    if(cursor) {
      return false
    }
    cursor = new ops.OdtCursor(memberid, odtDocument);
    odtDocument.addCursor(cursor);
    odtDocument.emit(ops.OdtDocument.signalCursorAdded, cursor);
    return true
  };
  this.spec = function() {
    return{optype:"AddCursor", memberid:memberid, timestamp:timestamp}
  }
};
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
runtime.loadClass("ops.Member");
ops.OpAddMember = function OpAddMember() {
  var memberid, timestamp, setProperties;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = parseInt(data.timestamp, 10);
    setProperties = data.setProperties
  };
  this.isEdit = false;
  this.execute = function(odtDocument) {
    if(odtDocument.getMember(memberid)) {
      return false
    }
    var member = new ops.Member(memberid, setProperties);
    odtDocument.addMember(member);
    odtDocument.emit(ops.OdtDocument.signalMemberAdded, member);
    return true
  };
  this.spec = function() {
    return{optype:"AddMember", memberid:memberid, timestamp:timestamp, setProperties:setProperties}
  }
};
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
ops.OpAddStyle = function OpAddStyle() {
  var memberid, timestamp, styleName, styleFamily, isAutomaticStyle, setProperties, stylens = odf.Namespaces.stylens;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    styleName = data.styleName;
    styleFamily = data.styleFamily;
    isAutomaticStyle = data.isAutomaticStyle === "true" || data.isAutomaticStyle === true;
    setProperties = data.setProperties
  };
  this.isEdit = true;
  this.execute = function(odtDocument) {
    var odfContainer = odtDocument.getOdfCanvas().odfContainer(), formatting = odtDocument.getFormatting(), dom = odtDocument.getDOM(), styleNode = dom.createElementNS(stylens, "style:style");
    if(!styleNode) {
      return false
    }
    if(setProperties) {
      formatting.updateStyle(styleNode, setProperties)
    }
    styleNode.setAttributeNS(stylens, "style:family", styleFamily);
    styleNode.setAttributeNS(stylens, "style:name", styleName);
    if(isAutomaticStyle) {
      odfContainer.rootElement.automaticStyles.appendChild(styleNode)
    }else {
      odfContainer.rootElement.styles.appendChild(styleNode)
    }
    odtDocument.getOdfCanvas().refreshCSS();
    if(!isAutomaticStyle) {
      odtDocument.emit(ops.OdtDocument.signalCommonStyleCreated, {name:styleName, family:styleFamily})
    }
    return true
  };
  this.spec = function() {
    return{optype:"AddStyle", memberid:memberid, timestamp:timestamp, styleName:styleName, styleFamily:styleFamily, isAutomaticStyle:isAutomaticStyle, setProperties:setProperties}
  }
};
ops.OpAddStyle.Spec;
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
runtime.loadClass("odf.OdfUtils");
runtime.loadClass("odf.TextStyleApplicator");
ops.OpApplyDirectStyling = function OpApplyDirectStyling() {
  var memberid, timestamp, position, length, setProperties, odfUtils = new odf.OdfUtils, domUtils = new core.DomUtils;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = parseInt(data.position, 10);
    length = parseInt(data.length, 10);
    setProperties = data.setProperties
  };
  this.isEdit = true;
  function applyStyle(odtDocument, range, info) {
    var odfCanvas = odtDocument.getOdfCanvas(), odfContainer = odfCanvas.odfContainer(), nextTextNodes = domUtils.splitBoundaries(range), textNodes = odfUtils.getTextNodes(range, false), limits, textStyles;
    limits = {startContainer:range.startContainer, startOffset:range.startOffset, endContainer:range.endContainer, endOffset:range.endOffset};
    textStyles = new odf.TextStyleApplicator(new odf.ObjectNameGenerator((odfContainer), memberid), odtDocument.getFormatting(), odfContainer.rootElement.automaticStyles);
    textStyles.applyStyle(textNodes, limits, info);
    nextTextNodes.forEach(domUtils.normalizeTextNodes)
  }
  this.execute = function(odtDocument) {
    var range = odtDocument.convertCursorToDomRange(position, length), impactedParagraphs = odfUtils.getImpactedParagraphs(range);
    applyStyle(odtDocument, range, setProperties);
    range.detach();
    odtDocument.getOdfCanvas().refreshCSS();
    odtDocument.fixCursorPositions();
    impactedParagraphs.forEach(function(n) {
      odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:n, memberId:memberid, timeStamp:timestamp})
    });
    odtDocument.getOdfCanvas().rerenderAnnotations();
    return true
  };
  this.spec = function() {
    return{optype:"ApplyDirectStyling", memberid:memberid, timestamp:timestamp, position:position, length:length, setProperties:setProperties}
  }
};
ops.OpApplyDirectStyling.Spec;
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
ops.OpInsertImage = function OpInsertImage() {
  var memberid, timestamp, position, filename, frameWidth, frameHeight, frameStyleName, frameName, drawns = odf.Namespaces.drawns, svgns = odf.Namespaces.svgns, textns = odf.Namespaces.textns, xlinkns = odf.Namespaces.xlinkns;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    filename = data.filename;
    frameWidth = data.frameWidth;
    frameHeight = data.frameHeight;
    frameStyleName = data.frameStyleName;
    frameName = data.frameName
  };
  this.isEdit = true;
  function createFrameElement(document) {
    var imageNode = document.createElementNS(drawns, "draw:image"), frameNode = document.createElementNS(drawns, "draw:frame");
    imageNode.setAttributeNS(xlinkns, "xlink:href", filename);
    imageNode.setAttributeNS(xlinkns, "xlink:type", "simple");
    imageNode.setAttributeNS(xlinkns, "xlink:show", "embed");
    imageNode.setAttributeNS(xlinkns, "xlink:actuate", "onLoad");
    frameNode.setAttributeNS(drawns, "draw:style-name", frameStyleName);
    frameNode.setAttributeNS(drawns, "draw:name", frameName);
    frameNode.setAttributeNS(textns, "text:anchor-type", "as-char");
    frameNode.setAttributeNS(svgns, "svg:width", frameWidth);
    frameNode.setAttributeNS(svgns, "svg:height", frameHeight);
    frameNode.appendChild(imageNode);
    return frameNode
  }
  this.execute = function(odtDocument) {
    var odfCanvas = odtDocument.getOdfCanvas(), domPosition = odtDocument.getTextNodeAtStep(position, memberid), textNode, refNode, paragraphElement, frameElement;
    if(!domPosition) {
      return false
    }
    textNode = domPosition.textNode;
    paragraphElement = odtDocument.getParagraphElement(textNode);
    refNode = domPosition.offset !== textNode.length ? textNode.splitText(domPosition.offset) : textNode.nextSibling;
    frameElement = createFrameElement(odtDocument.getDOM());
    textNode.parentNode.insertBefore(frameElement, refNode);
    odtDocument.emit(ops.OdtDocument.signalStepsInserted, {position:position, length:1});
    if(textNode.length === 0) {
      textNode.parentNode.removeChild(textNode)
    }
    odfCanvas.addCssForFrameWithImage(frameElement);
    odfCanvas.refreshCSS();
    odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:paragraphElement, memberId:memberid, timeStamp:timestamp});
    odfCanvas.rerenderAnnotations();
    return true
  };
  this.spec = function() {
    return{optype:"InsertImage", memberid:memberid, timestamp:timestamp, filename:filename, position:position, frameWidth:frameWidth, frameHeight:frameHeight, frameStyleName:frameStyleName, frameName:frameName}
  }
};
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
ops.OpInsertTable = function OpInsertTable() {
  var memberid, timestamp, initialRows, initialColumns, position, tableName, tableStyleName, tableColumnStyleName, tableCellStyleMatrix, tablens = "urn:oasis:names:tc:opendocument:xmlns:table:1.0", textns = "urn:oasis:names:tc:opendocument:xmlns:text:1.0";
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    initialRows = data.initialRows;
    initialColumns = data.initialColumns;
    tableName = data.tableName;
    tableStyleName = data.tableStyleName;
    tableColumnStyleName = data.tableColumnStyleName;
    tableCellStyleMatrix = data.tableCellStyleMatrix
  };
  this.isEdit = true;
  function getCellStyleName(row, column) {
    var rowStyles;
    if(tableCellStyleMatrix.length === 1) {
      rowStyles = tableCellStyleMatrix[0]
    }else {
      if(tableCellStyleMatrix.length === 3) {
        switch(row) {
          case 0:
            rowStyles = tableCellStyleMatrix[0];
            break;
          case initialRows - 1:
            rowStyles = tableCellStyleMatrix[2];
            break;
          default:
            rowStyles = tableCellStyleMatrix[1];
            break
        }
      }else {
        rowStyles = tableCellStyleMatrix[row]
      }
    }
    if(rowStyles.length === 1) {
      return rowStyles[0]
    }
    if(rowStyles.length === 3) {
      switch(column) {
        case 0:
          return rowStyles[0];
        case initialColumns - 1:
          return rowStyles[2];
        default:
          return rowStyles[1]
      }
    }
    return rowStyles[column]
  }
  function createTableNode(document) {
    var tableNode = document.createElementNS(tablens, "table:table"), columns = document.createElementNS(tablens, "table:table-column"), row, cell, paragraph, rowCounter, columnCounter, cellStyleName;
    if(tableStyleName) {
      tableNode.setAttributeNS(tablens, "table:style-name", tableStyleName)
    }
    if(tableName) {
      tableNode.setAttributeNS(tablens, "table:name", tableName)
    }
    columns.setAttributeNS(tablens, "table:number-columns-repeated", initialColumns);
    if(tableColumnStyleName) {
      columns.setAttributeNS(tablens, "table:style-name", tableColumnStyleName)
    }
    tableNode.appendChild(columns);
    for(rowCounter = 0;rowCounter < initialRows;rowCounter += 1) {
      row = document.createElementNS(tablens, "table:table-row");
      for(columnCounter = 0;columnCounter < initialColumns;columnCounter += 1) {
        cell = document.createElementNS(tablens, "table:table-cell");
        cellStyleName = getCellStyleName(rowCounter, columnCounter);
        if(cellStyleName) {
          cell.setAttributeNS(tablens, "table:style-name", cellStyleName)
        }
        paragraph = document.createElementNS(textns, "text:p");
        cell.appendChild(paragraph);
        row.appendChild(cell)
      }
      tableNode.appendChild(row)
    }
    return tableNode
  }
  this.execute = function(odtDocument) {
    var domPosition = odtDocument.getTextNodeAtStep(position), rootNode = odtDocument.getRootNode(), previousSibling, tableNode;
    if(domPosition) {
      tableNode = createTableNode(odtDocument.getDOM());
      previousSibling = odtDocument.getParagraphElement(domPosition.textNode);
      rootNode.insertBefore(tableNode, previousSibling.nextSibling);
      odtDocument.emit(ops.OdtDocument.signalStepsInserted, {position:position, length:initialColumns * initialRows + 1});
      odtDocument.getOdfCanvas().refreshSize();
      odtDocument.emit(ops.OdtDocument.signalTableAdded, {tableElement:tableNode, memberId:memberid, timeStamp:timestamp});
      odtDocument.getOdfCanvas().rerenderAnnotations();
      return true
    }
    return false
  };
  this.spec = function() {
    return{optype:"InsertTable", memberid:memberid, timestamp:timestamp, position:position, initialRows:initialRows, initialColumns:initialColumns, tableName:tableName, tableStyleName:tableStyleName, tableColumnStyleName:tableColumnStyleName, tableCellStyleMatrix:tableCellStyleMatrix}
  }
};
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
ops.OpInsertText = function OpInsertText() {
  var space = " ", tab = "\t", memberid, timestamp, position, text, moveCursor;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    text = data.text;
    moveCursor = data.moveCursor === "true" || data.moveCursor === true
  };
  this.isEdit = true;
  function triggerLayoutInWebkit(textNode) {
    var parent = textNode.parentNode, next = textNode.nextSibling;
    parent.removeChild(textNode);
    parent.insertBefore(textNode, next)
  }
  function requiresSpaceElement(text, index) {
    return text[index] === space && (index === 0 || (index === text.length - 1 || text[index - 1] === space))
  }
  this.execute = function(odtDocument) {
    var domPosition, previousNode, parentElement, nextNode = null, ownerDocument = odtDocument.getDOM(), paragraphElement, textns = "urn:oasis:names:tc:opendocument:xmlns:text:1.0", toInsertIndex = 0, spaceTag, spaceElement, cursor = odtDocument.getCursor(memberid), i;
    function insertTextNode(toInsertText) {
      parentElement.insertBefore(ownerDocument.createTextNode(toInsertText), nextNode)
    }
    odtDocument.upgradeWhitespacesAtPosition(position);
    domPosition = odtDocument.getTextNodeAtStep(position);
    if(domPosition) {
      previousNode = domPosition.textNode;
      nextNode = previousNode.nextSibling;
      parentElement = previousNode.parentNode;
      paragraphElement = odtDocument.getParagraphElement(previousNode);
      for(i = 0;i < text.length;i += 1) {
        if(requiresSpaceElement(text, i) || text[i] === tab) {
          if(toInsertIndex === 0) {
            if(domPosition.offset !== previousNode.length) {
              nextNode = previousNode.splitText(domPosition.offset)
            }
            if(0 < i) {
              previousNode.appendData(text.substring(0, i))
            }
          }else {
            if(toInsertIndex < i) {
              insertTextNode(text.substring(toInsertIndex, i))
            }
          }
          toInsertIndex = i + 1;
          spaceTag = text[i] === space ? "text:s" : "text:tab";
          spaceElement = ownerDocument.createElementNS(textns, spaceTag);
          spaceElement.appendChild(ownerDocument.createTextNode(text[i]));
          parentElement.insertBefore(spaceElement, nextNode)
        }
      }
      if(toInsertIndex === 0) {
        previousNode.insertData(domPosition.offset, text)
      }else {
        if(toInsertIndex < text.length) {
          insertTextNode(text.substring(toInsertIndex))
        }
      }
      triggerLayoutInWebkit(previousNode);
      if(previousNode.length === 0) {
        previousNode.parentNode.removeChild(previousNode)
      }
      odtDocument.emit(ops.OdtDocument.signalStepsInserted, {position:position, length:text.length});
      if(cursor && moveCursor) {
        odtDocument.moveCursor(memberid, position + text.length, 0);
        odtDocument.emit(ops.OdtDocument.signalCursorMoved, cursor)
      }
      if(position > 0) {
        if(position > 1) {
          odtDocument.downgradeWhitespacesAtPosition(position - 2)
        }
        odtDocument.downgradeWhitespacesAtPosition(position - 1)
      }
      odtDocument.downgradeWhitespacesAtPosition(position);
      odtDocument.downgradeWhitespacesAtPosition(position + text.length - 1);
      odtDocument.downgradeWhitespacesAtPosition(position + text.length);
      odtDocument.getOdfCanvas().refreshSize();
      odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:paragraphElement, memberId:memberid, timeStamp:timestamp});
      odtDocument.getOdfCanvas().rerenderAnnotations();
      return true
    }
    return false
  };
  this.spec = function() {
    return{optype:"InsertText", memberid:memberid, timestamp:timestamp, position:position, text:text, moveCursor:moveCursor}
  }
};
ops.OpInsertText.Spec;
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
ops.OpMoveCursor = function OpMoveCursor() {
  var memberid, timestamp, position, length, selectionType;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    length = data.length || 0;
    selectionType = data.selectionType || ops.OdtCursor.RangeSelection
  };
  this.isEdit = false;
  this.execute = function(odtDocument) {
    var cursor = odtDocument.getCursor(memberid), selectedRange;
    if(!cursor) {
      return false
    }
    selectedRange = odtDocument.convertCursorToDomRange(position, length);
    cursor.setSelectedRange(selectedRange, length >= 0);
    cursor.setSelectionType(selectionType);
    odtDocument.emit(ops.OdtDocument.signalCursorMoved, cursor);
    return true
  };
  this.spec = function() {
    return{optype:"MoveCursor", memberid:memberid, timestamp:timestamp, position:position, length:length, selectionType:selectionType}
  }
};
ops.OpMoveCursor.Spec;
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
runtime.loadClass("core.DomUtils");
ops.OpRemoveAnnotation = function OpRemoveAnnotation() {
  var memberid, timestamp, position, length, domUtils;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = parseInt(data.position, 10);
    length = parseInt(data.length, 10);
    domUtils = new core.DomUtils
  };
  this.isEdit = true;
  this.execute = function(odtDocument) {
    var iterator = odtDocument.getIteratorAtPosition(position), container = iterator.container(), annotationName, annotationNode, annotationEnd, cursors;
    while(!(container.namespaceURI === odf.Namespaces.officens && container.localName === "annotation")) {
      container = container.parentNode
    }
    if(container === null) {
      return false
    }
    annotationNode = container;
    annotationName = annotationNode.getAttributeNS(odf.Namespaces.officens, "name");
    if(annotationName) {
      annotationEnd = domUtils.getElementsByTagNameNS(odtDocument.getRootNode(), odf.Namespaces.officens, "annotation-end").filter(function(element) {
        return annotationName === element.getAttributeNS(odf.Namespaces.officens, "name")
      })[0] || null
    }
    odtDocument.getOdfCanvas().forgetAnnotations();
    cursors = domUtils.getElementsByTagNameNS(annotationNode, "urn:webodf:names:cursor", "cursor");
    while(cursors.length) {
      annotationNode.parentNode.insertBefore(cursors.pop(), annotationNode)
    }
    annotationNode.parentNode.removeChild(annotationNode);
    if(annotationEnd) {
      annotationEnd.parentNode.removeChild(annotationEnd)
    }
    odtDocument.emit(ops.OdtDocument.signalStepsRemoved, {position:position > 0 ? position - 1 : position, length:length});
    odtDocument.fixCursorPositions();
    odtDocument.getOdfCanvas().refreshAnnotations();
    return true
  };
  this.spec = function() {
    return{optype:"RemoveAnnotation", memberid:memberid, timestamp:timestamp, position:position, length:length}
  }
};
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
ops.OpRemoveBlob = function OpRemoveBlob() {
  var memberid, timestamp, filename;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    filename = data.filename
  };
  this.isEdit = true;
  this.execute = function(odtDocument) {
    odtDocument.getOdfCanvas().odfContainer().removeBlob(filename);
    return true
  };
  this.spec = function() {
    return{optype:"RemoveBlob", memberid:memberid, timestamp:timestamp, filename:filename}
  }
};
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
ops.OpRemoveCursor = function OpRemoveCursor() {
  var memberid, timestamp;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp
  };
  this.isEdit = false;
  this.execute = function(odtDocument) {
    if(!odtDocument.removeCursor(memberid)) {
      return false
    }
    return true
  };
  this.spec = function() {
    return{optype:"RemoveCursor", memberid:memberid, timestamp:timestamp}
  }
};
ops.OpRemoveCursor.Spec;
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
runtime.loadClass("ops.Member");
ops.OpRemoveMember = function OpRemoveMember() {
  var memberid, timestamp;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = parseInt(data.timestamp, 10)
  };
  this.isEdit = false;
  this.execute = function(odtDocument) {
    if(!odtDocument.getMember(memberid)) {
      return false
    }
    odtDocument.removeMember(memberid);
    odtDocument.emit(ops.OdtDocument.signalMemberRemoved, memberid);
    return true
  };
  this.spec = function() {
    return{optype:"RemoveMember", memberid:memberid, timestamp:timestamp}
  }
};
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
ops.OpRemoveStyle = function OpRemoveStyle() {
  var memberid, timestamp, styleName, styleFamily;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    styleName = data.styleName;
    styleFamily = data.styleFamily
  };
  this.isEdit = true;
  this.execute = function(odtDocument) {
    var styleNode = odtDocument.getStyleElement(styleName, styleFamily);
    if(!styleNode) {
      return false
    }
    styleNode.parentNode.removeChild(styleNode);
    odtDocument.getOdfCanvas().refreshCSS();
    odtDocument.emit(ops.OdtDocument.signalCommonStyleDeleted, {name:styleName, family:styleFamily});
    return true
  };
  this.spec = function() {
    return{optype:"RemoveStyle", memberid:memberid, timestamp:timestamp, styleName:styleName, styleFamily:styleFamily}
  }
};
ops.OpRemoveStyle.Spec;
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
runtime.loadClass("odf.OdfUtils");
runtime.loadClass("core.DomUtils");
ops.OpRemoveText = function OpRemoveText() {
  var memberid, timestamp, position, length, odfUtils, domUtils, editinfons = "urn:webodf:names:editinfo", odfNodeNamespaceMap = {};
  this.init = function(data) {
    runtime.assert(data.length >= 0, "OpRemoveText only supports positive lengths");
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = parseInt(data.position, 10);
    length = parseInt(data.length, 10);
    odfUtils = new odf.OdfUtils;
    domUtils = new core.DomUtils;
    odfNodeNamespaceMap[odf.Namespaces.dbns] = true;
    odfNodeNamespaceMap[odf.Namespaces.dcns] = true;
    odfNodeNamespaceMap[odf.Namespaces.dr3dns] = true;
    odfNodeNamespaceMap[odf.Namespaces.drawns] = true;
    odfNodeNamespaceMap[odf.Namespaces.chartns] = true;
    odfNodeNamespaceMap[odf.Namespaces.formns] = true;
    odfNodeNamespaceMap[odf.Namespaces.numberns] = true;
    odfNodeNamespaceMap[odf.Namespaces.officens] = true;
    odfNodeNamespaceMap[odf.Namespaces.presentationns] = true;
    odfNodeNamespaceMap[odf.Namespaces.stylens] = true;
    odfNodeNamespaceMap[odf.Namespaces.svgns] = true;
    odfNodeNamespaceMap[odf.Namespaces.tablens] = true;
    odfNodeNamespaceMap[odf.Namespaces.textns] = true
  };
  this.isEdit = true;
  function CollapsingRules(rootNode) {
    function isOdfNode(node) {
      return odfNodeNamespaceMap.hasOwnProperty(node.namespaceURI)
    }
    function shouldRemove(node) {
      return isOdfNode(node) || (node.localName === "br" && odfUtils.isLineBreak(node.parentNode) || node.nodeType === Node.TEXT_NODE && isOdfNode((node.parentNode)))
    }
    function isEmpty(node) {
      var childNode;
      if(odfUtils.isCharacterElement(node)) {
        return false
      }
      if(node.nodeType === Node.TEXT_NODE) {
        return node.textContent.length === 0
      }
      childNode = node.firstChild;
      while(childNode) {
        if(isOdfNode(childNode) || !isEmpty(childNode)) {
          return false
        }
        childNode = childNode.nextSibling
      }
      return true
    }
    this.isEmpty = isEmpty;
    function isCollapsibleContainer(node) {
      return!odfUtils.isParagraph(node) && (node !== rootNode && isEmpty(node))
    }
    function mergeChildrenIntoParent(targetNode) {
      var parent;
      if(targetNode.nodeType === Node.TEXT_NODE) {
        parent = targetNode.parentNode;
        parent.removeChild(targetNode)
      }else {
        parent = domUtils.removeUnwantedNodes(targetNode, shouldRemove)
      }
      if(isCollapsibleContainer(parent)) {
        return mergeChildrenIntoParent(parent)
      }
      return parent
    }
    this.mergeChildrenIntoParent = mergeChildrenIntoParent
  }
  function mergeParagraphs(first, second, collapseRules) {
    var child, mergeForward = false, destination = first, source = second, secondParent, insertionPoint = null;
    if(collapseRules.isEmpty(first)) {
      mergeForward = true;
      if(second.parentNode !== first.parentNode) {
        secondParent = second.parentNode;
        first.parentNode.insertBefore(second, first.nextSibling)
      }
      source = first;
      destination = second;
      insertionPoint = destination.getElementsByTagNameNS(editinfons, "editinfo")[0] || destination.firstChild
    }
    while(source.hasChildNodes()) {
      child = mergeForward ? source.lastChild : source.firstChild;
      source.removeChild(child);
      if(child.localName !== "editinfo") {
        destination.insertBefore(child, insertionPoint)
      }
    }
    if(secondParent && collapseRules.isEmpty(secondParent)) {
      collapseRules.mergeChildrenIntoParent(secondParent)
    }
    collapseRules.mergeChildrenIntoParent(source);
    return destination
  }
  this.execute = function(odtDocument) {
    var paragraphElement, destinationParagraph, range, textNodes, paragraphs, cursor = odtDocument.getCursor(memberid), collapseRules = new CollapsingRules(odtDocument.getRootNode());
    odtDocument.upgradeWhitespacesAtPosition(position);
    odtDocument.upgradeWhitespacesAtPosition(position + length);
    range = odtDocument.convertCursorToDomRange(position, length);
    domUtils.splitBoundaries(range);
    paragraphElement = odtDocument.getParagraphElement(range.startContainer);
    textNodes = odfUtils.getTextElements(range, false, true);
    paragraphs = odfUtils.getParagraphElements(range);
    range.detach();
    textNodes.forEach(function(element) {
      collapseRules.mergeChildrenIntoParent(element)
    });
    destinationParagraph = paragraphs.reduce(function(destination, paragraph) {
      return mergeParagraphs(destination, paragraph, collapseRules)
    });
    odtDocument.emit(ops.OdtDocument.signalStepsRemoved, {position:position, length:length});
    odtDocument.downgradeWhitespacesAtPosition(position);
    odtDocument.fixCursorPositions();
    odtDocument.getOdfCanvas().refreshSize();
    odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:destinationParagraph || paragraphElement, memberId:memberid, timeStamp:timestamp});
    if(cursor) {
      cursor.resetSelectionType();
      odtDocument.emit(ops.OdtDocument.signalCursorMoved, cursor)
    }
    odtDocument.getOdfCanvas().rerenderAnnotations();
    return true
  };
  this.spec = function() {
    return{optype:"RemoveText", memberid:memberid, timestamp:timestamp, position:position, length:length}
  }
};
ops.OpRemoveText.Spec;
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
ops.OpSetBlob = function OpSetBlob() {
  var memberid, timestamp, filename, mimetype, content;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    filename = data.filename;
    mimetype = data.mimetype;
    content = data.content
  };
  this.isEdit = true;
  this.execute = function(odtDocument) {
    odtDocument.getOdfCanvas().odfContainer().setBlob(filename, mimetype, content);
    return true
  };
  this.spec = function() {
    return{optype:"SetBlob", memberid:memberid, timestamp:timestamp, filename:filename, mimetype:mimetype, content:content}
  }
};
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
ops.OpSetParagraphStyle = function OpSetParagraphStyle() {
  var memberid, timestamp, position, styleName, textns = "urn:oasis:names:tc:opendocument:xmlns:text:1.0";
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    styleName = data.styleName
  };
  this.isEdit = true;
  this.execute = function(odtDocument) {
    var iterator, paragraphNode;
    iterator = odtDocument.getIteratorAtPosition(position);
    paragraphNode = odtDocument.getParagraphElement(iterator.container());
    if(paragraphNode) {
      if(styleName !== "") {
        paragraphNode.setAttributeNS(textns, "text:style-name", styleName)
      }else {
        paragraphNode.removeAttributeNS(textns, "style-name")
      }
      odtDocument.getOdfCanvas().refreshSize();
      odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:paragraphNode, timeStamp:timestamp, memberId:memberid});
      odtDocument.getOdfCanvas().rerenderAnnotations();
      return true
    }
    return false
  };
  this.spec = function() {
    return{optype:"SetParagraphStyle", memberid:memberid, timestamp:timestamp, position:position, styleName:styleName}
  }
};
ops.OpSetParagraphStyle.Spec;
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
ops.OpSplitParagraph = function OpSplitParagraph() {
  var memberid, timestamp, position, moveCursor, odfUtils;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    position = data.position;
    moveCursor = data.moveCursor === "true" || data.moveCursor === true;
    odfUtils = new odf.OdfUtils
  };
  this.isEdit = true;
  this.execute = function(odtDocument) {
    var domPosition, paragraphNode, targetNode, node, splitNode, splitChildNode, keptChildNode, cursor = odtDocument.getCursor(memberid);
    odtDocument.upgradeWhitespacesAtPosition(position);
    domPosition = odtDocument.getTextNodeAtStep(position);
    if(!domPosition) {
      return false
    }
    paragraphNode = odtDocument.getParagraphElement(domPosition.textNode);
    if(!paragraphNode) {
      return false
    }
    if(odfUtils.isListItem(paragraphNode.parentNode)) {
      targetNode = paragraphNode.parentNode
    }else {
      targetNode = paragraphNode
    }
    if(domPosition.offset === 0) {
      keptChildNode = domPosition.textNode.previousSibling;
      splitChildNode = null
    }else {
      keptChildNode = domPosition.textNode;
      if(domPosition.offset >= domPosition.textNode.length) {
        splitChildNode = null
      }else {
        splitChildNode = (domPosition.textNode.splitText(domPosition.offset))
      }
    }
    node = domPosition.textNode;
    while(node !== targetNode) {
      node = node.parentNode;
      splitNode = node.cloneNode(false);
      if(splitChildNode) {
        splitNode.appendChild(splitChildNode)
      }
      if(keptChildNode) {
        while(keptChildNode && keptChildNode.nextSibling) {
          splitNode.appendChild(keptChildNode.nextSibling)
        }
      }else {
        while(node.firstChild) {
          splitNode.appendChild(node.firstChild)
        }
      }
      node.parentNode.insertBefore(splitNode, node.nextSibling);
      keptChildNode = node;
      splitChildNode = splitNode
    }
    if(odfUtils.isListItem(splitChildNode)) {
      splitChildNode = splitChildNode.childNodes[0]
    }
    if(domPosition.textNode.length === 0) {
      domPosition.textNode.parentNode.removeChild(domPosition.textNode)
    }
    odtDocument.emit(ops.OdtDocument.signalStepsInserted, {position:position, length:1});
    if(cursor && moveCursor) {
      odtDocument.moveCursor(memberid, position + 1, 0);
      odtDocument.emit(ops.OdtDocument.signalCursorMoved, cursor)
    }
    odtDocument.fixCursorPositions();
    odtDocument.getOdfCanvas().refreshSize();
    odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:paragraphNode, memberId:memberid, timeStamp:timestamp});
    odtDocument.emit(ops.OdtDocument.signalParagraphChanged, {paragraphElement:splitChildNode, memberId:memberid, timeStamp:timestamp});
    odtDocument.getOdfCanvas().rerenderAnnotations();
    return true
  };
  this.spec = function() {
    return{optype:"SplitParagraph", memberid:memberid, timestamp:timestamp, position:position, moveCursor:moveCursor}
  }
};
ops.OpSplitParagraph.Spec;
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
runtime.loadClass("ops.Member");
runtime.loadClass("xmldom.XPath");
ops.OpUpdateMember = function OpUpdateMember() {
  var memberid, timestamp, setProperties, removedProperties, doc;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = parseInt(data.timestamp, 10);
    setProperties = data.setProperties;
    removedProperties = data.removedProperties
  };
  this.isEdit = false;
  function updateCreators() {
    var xpath = xmldom.XPath, xp = "//dc:creator[@editinfo:memberid='" + memberid + "']", creators = xpath.getODFElementsWithXPath(doc.getRootNode(), xp, function(prefix) {
      if(prefix === "editinfo") {
        return"urn:webodf:names:editinfo"
      }
      return odf.Namespaces.lookupNamespaceURI(prefix)
    }), i;
    for(i = 0;i < creators.length;i += 1) {
      creators[i].textContent = setProperties.fullName
    }
  }
  this.execute = function(odtDocument) {
    doc = odtDocument;
    var member = odtDocument.getMember(memberid);
    if(!member) {
      return false
    }
    if(removedProperties) {
      member.removeProperties(removedProperties)
    }
    if(setProperties) {
      member.setProperties(setProperties);
      if(setProperties.fullName) {
        updateCreators()
      }
    }
    odtDocument.emit(ops.OdtDocument.signalMemberUpdated, member);
    return true
  };
  this.spec = function() {
    return{optype:"UpdateMember", memberid:memberid, timestamp:timestamp, setProperties:setProperties, removedProperties:removedProperties}
  }
};
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
ops.OpUpdateMetadata = function OpUpdateMetadata() {
  var memberid, timestamp, setProperties, removedProperties;
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = parseInt(data.timestamp, 10);
    setProperties = data.setProperties;
    removedProperties = data.removedProperties
  };
  this.isEdit = true;
  this.execute = function(odtDocument) {
    var odfContainer = odtDocument.getOdfCanvas().odfContainer(), removedPropertiesArray = [], blockedProperties = ["dc:date", "dc:creator", "meta:editing-cycles"];
    if(setProperties) {
      blockedProperties.forEach(function(el) {
        if(setProperties[el]) {
          return false
        }
      })
    }
    if(removedProperties) {
      blockedProperties.forEach(function(el) {
        if(removedPropertiesArray.indexOf(el) !== -1) {
          return false
        }
      });
      removedPropertiesArray = removedProperties.attributes.split(",")
    }
    odfContainer.setMetadata(setProperties, removedPropertiesArray);
    return true
  };
  this.spec = function() {
    return{optype:"UpdateMetadata", memberid:memberid, timestamp:timestamp, setProperties:setProperties, removedProperties:removedProperties}
  }
};
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
ops.OpUpdateParagraphStyle = function OpUpdateParagraphStyle() {
  var memberid, timestamp, styleName, setProperties, removedProperties, paragraphPropertiesName = "style:paragraph-properties", textPropertiesName = "style:text-properties", stylens = odf.Namespaces.stylens;
  function removedAttributesFromStyleNode(node, removedAttributeNames) {
    var i, attributeNameParts, attributeNameList = removedAttributeNames ? removedAttributeNames.split(",") : [];
    for(i = 0;i < attributeNameList.length;i += 1) {
      attributeNameParts = attributeNameList[i].split(":");
      node.removeAttributeNS(odf.Namespaces.lookupNamespaceURI(attributeNameParts[0]), attributeNameParts[1])
    }
  }
  this.init = function(data) {
    memberid = data.memberid;
    timestamp = data.timestamp;
    styleName = data.styleName;
    setProperties = data.setProperties;
    removedProperties = data.removedProperties
  };
  this.isEdit = true;
  this.execute = function(odtDocument) {
    var formatting = odtDocument.getFormatting(), styleNode, paragraphPropertiesNode, textPropertiesNode;
    if(styleName !== "") {
      styleNode = odtDocument.getParagraphStyleElement(styleName)
    }else {
      styleNode = formatting.getDefaultStyleElement("paragraph")
    }
    if(styleNode) {
      paragraphPropertiesNode = styleNode.getElementsByTagNameNS(stylens, "paragraph-properties")[0];
      textPropertiesNode = styleNode.getElementsByTagNameNS(stylens, "text-properties")[0];
      if(setProperties) {
        formatting.updateStyle(styleNode, setProperties)
      }
      if(removedProperties) {
        if(removedProperties[paragraphPropertiesName]) {
          removedAttributesFromStyleNode(paragraphPropertiesNode, removedProperties[paragraphPropertiesName].attributes);
          if(paragraphPropertiesNode.attributes.length === 0) {
            styleNode.removeChild(paragraphPropertiesNode)
          }
        }
        if(removedProperties[textPropertiesName]) {
          removedAttributesFromStyleNode(textPropertiesNode, removedProperties[textPropertiesName].attributes);
          if(textPropertiesNode.attributes.length === 0) {
            styleNode.removeChild(textPropertiesNode)
          }
        }
        removedAttributesFromStyleNode(styleNode, removedProperties.attributes)
      }
      odtDocument.getOdfCanvas().refreshCSS();
      odtDocument.emit(ops.OdtDocument.signalParagraphStyleModified, styleName);
      odtDocument.getOdfCanvas().rerenderAnnotations();
      return true
    }
    return false
  };
  this.spec = function() {
    return{optype:"UpdateParagraphStyle", memberid:memberid, timestamp:timestamp, styleName:styleName, setProperties:setProperties, removedProperties:removedProperties}
  }
};
ops.OpUpdateParagraphStyle.Spec;
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
runtime.loadClass("ops.OpAddMember");
runtime.loadClass("ops.OpUpdateMember");
runtime.loadClass("ops.OpRemoveMember");
runtime.loadClass("ops.OpAddCursor");
runtime.loadClass("ops.OpApplyDirectStyling");
runtime.loadClass("ops.OpRemoveCursor");
runtime.loadClass("ops.OpMoveCursor");
runtime.loadClass("ops.OpSetBlob");
runtime.loadClass("ops.OpRemoveBlob");
runtime.loadClass("ops.OpInsertImage");
runtime.loadClass("ops.OpInsertTable");
runtime.loadClass("ops.OpInsertText");
runtime.loadClass("ops.OpRemoveText");
runtime.loadClass("ops.OpSplitParagraph");
runtime.loadClass("ops.OpSetParagraphStyle");
runtime.loadClass("ops.OpUpdateParagraphStyle");
runtime.loadClass("ops.OpAddStyle");
runtime.loadClass("ops.OpRemoveStyle");
runtime.loadClass("ops.OpAddAnnotation");
runtime.loadClass("ops.OpRemoveAnnotation");
runtime.loadClass("ops.OpUpdateMetadata");
ops.OperationFactory = function OperationFactory() {
  var specs;
  this.register = function(specName, specConstructor) {
    specs[specName] = specConstructor
  };
  this.create = function(spec) {
    var op = null, specConstructor = specs[spec.optype];
    if(specConstructor) {
      op = specConstructor(spec);
      op.init(spec)
    }
    return op
  };
  function constructor(OperationType) {
    return function() {
      return new OperationType
    }
  }
  function init() {
    specs = {AddMember:constructor(ops.OpAddMember), UpdateMember:constructor(ops.OpUpdateMember), RemoveMember:constructor(ops.OpRemoveMember), AddCursor:constructor(ops.OpAddCursor), ApplyDirectStyling:constructor(ops.OpApplyDirectStyling), SetBlob:constructor(ops.OpSetBlob), RemoveBlob:constructor(ops.OpRemoveBlob), InsertImage:constructor(ops.OpInsertImage), InsertTable:constructor(ops.OpInsertTable), InsertText:constructor(ops.OpInsertText), RemoveText:constructor(ops.OpRemoveText), SplitParagraph:constructor(ops.OpSplitParagraph), 
    SetParagraphStyle:constructor(ops.OpSetParagraphStyle), UpdateParagraphStyle:constructor(ops.OpUpdateParagraphStyle), AddStyle:constructor(ops.OpAddStyle), RemoveStyle:constructor(ops.OpRemoveStyle), MoveCursor:constructor(ops.OpMoveCursor), RemoveCursor:constructor(ops.OpRemoveCursor), AddAnnotation:constructor(ops.OpAddAnnotation), RemoveAnnotation:constructor(ops.OpRemoveAnnotation), UpdateMetadata:constructor(ops.OpUpdateMetadata)}
  }
  init()
};
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
ops.OperationRouter = function OperationRouter() {
};
ops.OperationRouter.prototype.setOperationFactory = function(f) {
};
ops.OperationRouter.prototype.setPlaybackFunction = function(playback_func) {
};
ops.OperationRouter.prototype.push = function(operations) {
};
ops.OperationRouter.prototype.close = function(callback) {
};
ops.OperationRouter.prototype.subscribe = function(eventId, cb) {
};
ops.OperationRouter.prototype.unsubscribe = function(eventId, cb) {
};
ops.OperationRouter.prototype.hasLocalUnsyncedOps = function() {
};
ops.OperationRouter.prototype.hasSessionHostConnection = function() {
};
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
ops.OperationTransformMatrix = function OperationTransformMatrix() {
  function invertMoveCursorSpecRange(moveCursorSpec) {
    moveCursorSpec.position = moveCursorSpec.position + moveCursorSpec.length;
    moveCursorSpec.length *= -1
  }
  function invertMoveCursorSpecRangeOnNegativeLength(moveCursorSpec) {
    var isBackwards = moveCursorSpec.length < 0;
    if(isBackwards) {
      invertMoveCursorSpecRange(moveCursorSpec)
    }
    return isBackwards
  }
  function getStyleReferencingAttributes(setProperties, styleName) {
    var attributes = [];
    if(setProperties) {
      ["style:parent-style-name", "style:next-style-name"].forEach(function(attributeName) {
        if(setProperties[attributeName] === styleName) {
          attributes.push(attributeName)
        }
      })
    }
    return attributes
  }
  function dropStyleReferencingAttributes(setProperties, deletedStyleName) {
    if(setProperties) {
      ["style:parent-style-name", "style:next-style-name"].forEach(function(attributeName) {
        if(setProperties[attributeName] === deletedStyleName) {
          delete setProperties[attributeName]
        }
      })
    }
  }
  function cloneOpspec(opspec) {
    var result = {};
    Object.keys(opspec).forEach(function(key) {
      if(typeof opspec[key] === "object") {
        result[key] = cloneOpspec(opspec[key])
      }else {
        result[key] = opspec[key]
      }
    });
    return result
  }
  function dropOverruledAndUnneededAttributes(minorSetProperties, minorRemovedProperties, majorSetProperties, majorRemovedProperties) {
    var value, i, name, majorChanged = false, minorChanged = false, overrulingPropertyValue, removedPropertyNames, majorRemovedPropertyNames = majorRemovedProperties && majorRemovedProperties.attributes ? majorRemovedProperties.attributes.split(",") : [];
    if(minorSetProperties && (majorSetProperties || majorRemovedPropertyNames.length > 0)) {
      Object.keys(minorSetProperties).forEach(function(key) {
        value = minorSetProperties[key];
        if(typeof value !== "object") {
          overrulingPropertyValue = majorSetProperties && majorSetProperties[key];
          if(overrulingPropertyValue !== undefined) {
            delete minorSetProperties[key];
            minorChanged = true;
            if(overrulingPropertyValue === value) {
              delete majorSetProperties[key];
              majorChanged = true
            }
          }else {
            if(majorRemovedPropertyNames && majorRemovedPropertyNames.indexOf(key) !== -1) {
              delete minorSetProperties[key];
              minorChanged = true
            }
          }
        }
      })
    }
    if(minorRemovedProperties && (minorRemovedProperties.attributes && (majorSetProperties || majorRemovedPropertyNames.length > 0))) {
      removedPropertyNames = minorRemovedProperties.attributes.split(",");
      for(i = 0;i < removedPropertyNames.length;i += 1) {
        name = removedPropertyNames[i];
        if(majorSetProperties && majorSetProperties[name] !== undefined || majorRemovedPropertyNames && majorRemovedPropertyNames.indexOf(name) !== -1) {
          removedPropertyNames.splice(i, 1);
          i -= 1;
          minorChanged = true
        }
      }
      if(removedPropertyNames.length > 0) {
        minorRemovedProperties.attributes = removedPropertyNames.join(",")
      }else {
        delete minorRemovedProperties.attributes
      }
    }
    return{majorChanged:majorChanged, minorChanged:minorChanged}
  }
  function hasProperties(properties) {
    var key;
    for(key in properties) {
      if(properties.hasOwnProperty(key)) {
        return true
      }
    }
    return false
  }
  function hasRemovedProperties(properties) {
    var key;
    for(key in properties) {
      if(properties.hasOwnProperty(key)) {
        if(key !== "attributes" || properties.attributes.length > 0) {
          return true
        }
      }
    }
    return false
  }
  function dropOverruledAndUnneededProperties(minorOpspec, majorOpspec, propertiesName) {
    var minorSP = minorOpspec.setProperties ? minorOpspec.setProperties[propertiesName] : null, minorRP = minorOpspec.removedProperties ? minorOpspec.removedProperties[propertiesName] : null, majorSP = majorOpspec.setProperties ? majorOpspec.setProperties[propertiesName] : null, majorRP = majorOpspec.removedProperties ? majorOpspec.removedProperties[propertiesName] : null, result;
    result = dropOverruledAndUnneededAttributes(minorSP, minorRP, majorSP, majorRP);
    if(minorSP && !hasProperties(minorSP)) {
      delete minorOpspec.setProperties[propertiesName]
    }
    if(minorRP && !hasRemovedProperties(minorRP)) {
      delete minorOpspec.removedProperties[propertiesName]
    }
    if(majorSP && !hasProperties(majorSP)) {
      delete majorOpspec.setProperties[propertiesName]
    }
    if(majorRP && !hasRemovedProperties(majorRP)) {
      delete majorOpspec.removedProperties[propertiesName]
    }
    return result
  }
  function transformAddStyleRemoveStyle(addStyleSpec, removeStyleSpec) {
    var setAttributes, helperOpspec, addStyleSpecResult = [addStyleSpec], removeStyleSpecResult = [removeStyleSpec];
    if(addStyleSpec.styleFamily === removeStyleSpec.styleFamily) {
      setAttributes = getStyleReferencingAttributes(addStyleSpec.setProperties, removeStyleSpec.styleName);
      if(setAttributes.length > 0) {
        helperOpspec = {optype:"UpdateParagraphStyle", memberid:removeStyleSpec.memberid, timestamp:removeStyleSpec.timestamp, styleName:addStyleSpec.styleName, removedProperties:{attributes:setAttributes.join(",")}};
        removeStyleSpecResult.unshift(helperOpspec)
      }
      dropStyleReferencingAttributes(addStyleSpec.setProperties, removeStyleSpec.styleName)
    }
    return{opSpecsA:addStyleSpecResult, opSpecsB:removeStyleSpecResult}
  }
  function transformApplyDirectStylingApplyDirectStyling(applyDirectStylingSpecA, applyDirectStylingSpecB, hasAPriority) {
    var majorSpec, minorSpec, majorSpecResult, minorSpecResult, majorSpecEnd, minorSpecEnd, dropResult, originalMajorSpec, originalMinorSpec, helperOpspecBefore, helperOpspecAfter, applyDirectStylingSpecAResult = [applyDirectStylingSpecA], applyDirectStylingSpecBResult = [applyDirectStylingSpecB];
    if(!(applyDirectStylingSpecA.position + applyDirectStylingSpecA.length <= applyDirectStylingSpecB.position || applyDirectStylingSpecA.position >= applyDirectStylingSpecB.position + applyDirectStylingSpecB.length)) {
      majorSpec = hasAPriority ? applyDirectStylingSpecA : applyDirectStylingSpecB;
      minorSpec = hasAPriority ? applyDirectStylingSpecB : applyDirectStylingSpecA;
      if(applyDirectStylingSpecA.position !== applyDirectStylingSpecB.position || applyDirectStylingSpecA.length !== applyDirectStylingSpecB.length) {
        originalMajorSpec = cloneOpspec(majorSpec);
        originalMinorSpec = cloneOpspec(minorSpec)
      }
      dropResult = dropOverruledAndUnneededProperties(minorSpec, majorSpec, "style:text-properties");
      if(dropResult.majorChanged || dropResult.minorChanged) {
        majorSpecResult = [];
        minorSpecResult = [];
        majorSpecEnd = majorSpec.position + majorSpec.length;
        minorSpecEnd = minorSpec.position + minorSpec.length;
        if(minorSpec.position < majorSpec.position) {
          if(dropResult.minorChanged) {
            helperOpspecBefore = cloneOpspec((originalMinorSpec));
            helperOpspecBefore.length = majorSpec.position - minorSpec.position;
            minorSpecResult.push(helperOpspecBefore);
            minorSpec.position = majorSpec.position;
            minorSpec.length = minorSpecEnd - minorSpec.position
          }
        }else {
          if(majorSpec.position < minorSpec.position) {
            if(dropResult.majorChanged) {
              helperOpspecBefore = cloneOpspec((originalMajorSpec));
              helperOpspecBefore.length = minorSpec.position - majorSpec.position;
              majorSpecResult.push(helperOpspecBefore);
              majorSpec.position = minorSpec.position;
              majorSpec.length = majorSpecEnd - majorSpec.position
            }
          }
        }
        if(minorSpecEnd > majorSpecEnd) {
          if(dropResult.minorChanged) {
            helperOpspecAfter = originalMinorSpec;
            helperOpspecAfter.position = majorSpecEnd;
            helperOpspecAfter.length = minorSpecEnd - majorSpecEnd;
            minorSpecResult.push(helperOpspecAfter);
            minorSpec.length = majorSpecEnd - minorSpec.position
          }
        }else {
          if(majorSpecEnd > minorSpecEnd) {
            if(dropResult.majorChanged) {
              helperOpspecAfter = originalMajorSpec;
              helperOpspecAfter.position = minorSpecEnd;
              helperOpspecAfter.length = majorSpecEnd - minorSpecEnd;
              majorSpecResult.push(helperOpspecAfter);
              majorSpec.length = minorSpecEnd - majorSpec.position
            }
          }
        }
        if(majorSpec.setProperties && hasProperties(majorSpec.setProperties)) {
          majorSpecResult.push(majorSpec)
        }
        if(minorSpec.setProperties && hasProperties(minorSpec.setProperties)) {
          minorSpecResult.push(minorSpec)
        }
        if(hasAPriority) {
          applyDirectStylingSpecAResult = majorSpecResult;
          applyDirectStylingSpecBResult = minorSpecResult
        }else {
          applyDirectStylingSpecAResult = minorSpecResult;
          applyDirectStylingSpecBResult = majorSpecResult
        }
      }
    }
    return{opSpecsA:applyDirectStylingSpecAResult, opSpecsB:applyDirectStylingSpecBResult}
  }
  function transformApplyDirectStylingInsertText(applyDirectStylingSpec, insertTextSpec) {
    if(insertTextSpec.position <= applyDirectStylingSpec.position) {
      applyDirectStylingSpec.position += insertTextSpec.text.length
    }else {
      if(insertTextSpec.position <= applyDirectStylingSpec.position + applyDirectStylingSpec.length) {
        applyDirectStylingSpec.length += insertTextSpec.text.length
      }
    }
    return{opSpecsA:[applyDirectStylingSpec], opSpecsB:[insertTextSpec]}
  }
  function transformApplyDirectStylingRemoveText(applyDirectStylingSpec, removeTextSpec) {
    var applyDirectStylingSpecEnd = applyDirectStylingSpec.position + applyDirectStylingSpec.length, removeTextSpecEnd = removeTextSpec.position + removeTextSpec.length, applyDirectStylingSpecResult = [applyDirectStylingSpec], removeTextSpecResult = [removeTextSpec];
    if(removeTextSpecEnd <= applyDirectStylingSpec.position) {
      applyDirectStylingSpec.position -= removeTextSpec.length
    }else {
      if(removeTextSpec.position < applyDirectStylingSpecEnd) {
        if(applyDirectStylingSpec.position < removeTextSpec.position) {
          if(removeTextSpecEnd < applyDirectStylingSpecEnd) {
            applyDirectStylingSpec.length -= removeTextSpec.length
          }else {
            applyDirectStylingSpec.length = removeTextSpec.position - applyDirectStylingSpec.position
          }
        }else {
          applyDirectStylingSpec.position = removeTextSpec.position;
          if(removeTextSpecEnd < applyDirectStylingSpecEnd) {
            applyDirectStylingSpec.length = applyDirectStylingSpecEnd - removeTextSpecEnd
          }else {
            applyDirectStylingSpecResult = []
          }
        }
      }
    }
    return{opSpecsA:applyDirectStylingSpecResult, opSpecsB:removeTextSpecResult}
  }
  function transformApplyDirectStylingSplitParagraph(applyDirectStylingSpec, splitParagraphSpec) {
    if(splitParagraphSpec.position < applyDirectStylingSpec.position) {
      applyDirectStylingSpec.position += 1
    }else {
      if(splitParagraphSpec.position < applyDirectStylingSpec.position + applyDirectStylingSpec.length) {
        applyDirectStylingSpec.length += 1
      }
    }
    return{opSpecsA:[applyDirectStylingSpec], opSpecsB:[splitParagraphSpec]}
  }
  function transformInsertTextInsertText(insertTextSpecA, insertTextSpecB, hasAPriority) {
    if(insertTextSpecA.position < insertTextSpecB.position) {
      insertTextSpecB.position += insertTextSpecA.text.length
    }else {
      if(insertTextSpecA.position > insertTextSpecB.position) {
        insertTextSpecA.position += insertTextSpecB.text.length
      }else {
        if(hasAPriority) {
          insertTextSpecB.position += insertTextSpecA.text.length
        }else {
          insertTextSpecA.position += insertTextSpecB.text.length
        }
      }
    }
    return{opSpecsA:[insertTextSpecA], opSpecsB:[insertTextSpecB]}
  }
  function transformInsertTextMoveCursor(insertTextSpec, moveCursorSpec) {
    var isMoveCursorSpecRangeInverted = invertMoveCursorSpecRangeOnNegativeLength(moveCursorSpec);
    if(insertTextSpec.position < moveCursorSpec.position) {
      moveCursorSpec.position += insertTextSpec.text.length
    }else {
      if(insertTextSpec.position < moveCursorSpec.position + moveCursorSpec.length) {
        moveCursorSpec.length += insertTextSpec.text.length
      }
    }
    if(isMoveCursorSpecRangeInverted) {
      invertMoveCursorSpecRange(moveCursorSpec)
    }
    return{opSpecsA:[insertTextSpec], opSpecsB:[moveCursorSpec]}
  }
  function transformInsertTextRemoveText(insertTextSpec, removeTextSpec) {
    var helperOpspec, removeTextSpecEnd = removeTextSpec.position + removeTextSpec.length, insertTextSpecResult = [insertTextSpec], removeTextSpecResult = [removeTextSpec];
    if(removeTextSpecEnd <= insertTextSpec.position) {
      insertTextSpec.position -= removeTextSpec.length
    }else {
      if(insertTextSpec.position <= removeTextSpec.position) {
        removeTextSpec.position += insertTextSpec.text.length
      }else {
        removeTextSpec.length = insertTextSpec.position - removeTextSpec.position;
        helperOpspec = {optype:"RemoveText", memberid:removeTextSpec.memberid, timestamp:removeTextSpec.timestamp, position:insertTextSpec.position + insertTextSpec.text.length, length:removeTextSpecEnd - insertTextSpec.position};
        removeTextSpecResult.unshift(helperOpspec);
        insertTextSpec.position = removeTextSpec.position
      }
    }
    return{opSpecsA:insertTextSpecResult, opSpecsB:removeTextSpecResult}
  }
  function transformInsertTextSplitParagraph(insertTextSpec, splitParagraphSpec, hasAPriority) {
    if(insertTextSpec.position < splitParagraphSpec.position) {
      splitParagraphSpec.position += insertTextSpec.text.length
    }else {
      if(insertTextSpec.position > splitParagraphSpec.position) {
        insertTextSpec.position += 1
      }else {
        if(hasAPriority) {
          splitParagraphSpec.position += insertTextSpec.text.length
        }else {
          insertTextSpec.position += 1
        }
        return null
      }
    }
    return{opSpecsA:[insertTextSpec], opSpecsB:[splitParagraphSpec]}
  }
  function transformUpdateParagraphStyleUpdateParagraphStyle(updateParagraphStyleSpecA, updateParagraphStyleSpecB, hasAPriority) {
    var majorSpec, minorSpec, updateParagraphStyleSpecAResult = [updateParagraphStyleSpecA], updateParagraphStyleSpecBResult = [updateParagraphStyleSpecB];
    if(updateParagraphStyleSpecA.styleName === updateParagraphStyleSpecB.styleName) {
      majorSpec = hasAPriority ? updateParagraphStyleSpecA : updateParagraphStyleSpecB;
      minorSpec = hasAPriority ? updateParagraphStyleSpecB : updateParagraphStyleSpecA;
      dropOverruledAndUnneededProperties(minorSpec, majorSpec, "style:paragraph-properties");
      dropOverruledAndUnneededProperties(minorSpec, majorSpec, "style:text-properties");
      dropOverruledAndUnneededAttributes(minorSpec.setProperties || null, minorSpec.removedProperties || null, majorSpec.setProperties || null, majorSpec.removedProperties || null);
      if(!(majorSpec.setProperties && hasProperties(majorSpec.setProperties)) && !(majorSpec.removedProperties && hasRemovedProperties(majorSpec.removedProperties))) {
        if(hasAPriority) {
          updateParagraphStyleSpecAResult = []
        }else {
          updateParagraphStyleSpecBResult = []
        }
      }
      if(!(minorSpec.setProperties && hasProperties(minorSpec.setProperties)) && !(minorSpec.removedProperties && hasRemovedProperties(minorSpec.removedProperties))) {
        if(hasAPriority) {
          updateParagraphStyleSpecBResult = []
        }else {
          updateParagraphStyleSpecAResult = []
        }
      }
    }
    return{opSpecsA:updateParagraphStyleSpecAResult, opSpecsB:updateParagraphStyleSpecBResult}
  }
  function transformUpdateMetadataUpdateMetadata(updateMetadataSpecA, updateMetadataSpecB, hasAPriority) {
    var majorSpec, minorSpec, updateMetadataSpecAResult = [updateMetadataSpecA], updateMetadataSpecBResult = [updateMetadataSpecB];
    majorSpec = hasAPriority ? updateMetadataSpecA : updateMetadataSpecB;
    minorSpec = hasAPriority ? updateMetadataSpecB : updateMetadataSpecA;
    dropOverruledAndUnneededAttributes(minorSpec.setProperties || null, minorSpec.removedProperties || null, majorSpec.setProperties || null, majorSpec.removedProperties || null);
    if(!(majorSpec.setProperties && hasProperties(majorSpec.setProperties)) && !(majorSpec.removedProperties && hasRemovedProperties(majorSpec.removedProperties))) {
      if(hasAPriority) {
        updateMetadataSpecAResult = []
      }else {
        updateMetadataSpecBResult = []
      }
    }
    if(!(minorSpec.setProperties && hasProperties(minorSpec.setProperties)) && !(minorSpec.removedProperties && hasRemovedProperties(minorSpec.removedProperties))) {
      if(hasAPriority) {
        updateMetadataSpecBResult = []
      }else {
        updateMetadataSpecAResult = []
      }
    }
    return{opSpecsA:updateMetadataSpecAResult, opSpecsB:updateMetadataSpecBResult}
  }
  function transformSplitParagraphSplitParagraph(splitParagraphSpecA, splitParagraphSpecB, hasAPriority) {
    if(splitParagraphSpecA.position < splitParagraphSpecB.position) {
      splitParagraphSpecB.position += 1
    }else {
      if(splitParagraphSpecA.position > splitParagraphSpecB.position) {
        splitParagraphSpecA.position += 1
      }else {
        if(splitParagraphSpecA.position === splitParagraphSpecB.position) {
          if(hasAPriority) {
            splitParagraphSpecB.position += 1
          }else {
            splitParagraphSpecA.position += 1
          }
        }
      }
    }
    return{opSpecsA:[splitParagraphSpecA], opSpecsB:[splitParagraphSpecB]}
  }
  function transformMoveCursorRemoveCursor(moveCursorSpec, removeCursorSpec) {
    var isSameCursorRemoved = moveCursorSpec.memberid === removeCursorSpec.memberid;
    return{opSpecsA:isSameCursorRemoved ? [] : [moveCursorSpec], opSpecsB:[removeCursorSpec]}
  }
  function transformMoveCursorRemoveText(moveCursorSpec, removeTextSpec) {
    var isMoveCursorSpecRangeInverted = invertMoveCursorSpecRangeOnNegativeLength(moveCursorSpec), moveCursorSpecEnd = moveCursorSpec.position + moveCursorSpec.length, removeTextSpecEnd = removeTextSpec.position + removeTextSpec.length;
    if(removeTextSpecEnd <= moveCursorSpec.position) {
      moveCursorSpec.position -= removeTextSpec.length
    }else {
      if(removeTextSpec.position < moveCursorSpecEnd) {
        if(moveCursorSpec.position < removeTextSpec.position) {
          if(removeTextSpecEnd < moveCursorSpecEnd) {
            moveCursorSpec.length -= removeTextSpec.length
          }else {
            moveCursorSpec.length = removeTextSpec.position - moveCursorSpec.position
          }
        }else {
          moveCursorSpec.position = removeTextSpec.position;
          if(removeTextSpecEnd < moveCursorSpecEnd) {
            moveCursorSpec.length = moveCursorSpecEnd - removeTextSpecEnd
          }else {
            moveCursorSpec.length = 0
          }
        }
      }
    }
    if(isMoveCursorSpecRangeInverted) {
      invertMoveCursorSpecRange(moveCursorSpec)
    }
    return{opSpecsA:[moveCursorSpec], opSpecsB:[removeTextSpec]}
  }
  function transformMoveCursorSplitParagraph(moveCursorSpec, splitParagraphSpec) {
    var isMoveCursorSpecRangeInverted = invertMoveCursorSpecRangeOnNegativeLength(moveCursorSpec);
    if(splitParagraphSpec.position < moveCursorSpec.position) {
      moveCursorSpec.position += 1
    }else {
      if(splitParagraphSpec.position < moveCursorSpec.position + moveCursorSpec.length) {
        moveCursorSpec.length += 1
      }
    }
    if(isMoveCursorSpecRangeInverted) {
      invertMoveCursorSpecRange(moveCursorSpec)
    }
    return{opSpecsA:[moveCursorSpec], opSpecsB:[splitParagraphSpec]}
  }
  function transformRemoveCursorRemoveCursor(removeCursorSpecA, removeCursorSpecB) {
    var isSameMemberid = removeCursorSpecA.memberid === removeCursorSpecB.memberid;
    return{opSpecsA:isSameMemberid ? [] : [removeCursorSpecA], opSpecsB:isSameMemberid ? [] : [removeCursorSpecB]}
  }
  function transformRemoveStyleRemoveStyle(removeStyleSpecA, removeStyleSpecB) {
    var isSameStyle = removeStyleSpecA.styleName === removeStyleSpecB.styleName && removeStyleSpecA.styleFamily === removeStyleSpecB.styleFamily;
    return{opSpecsA:isSameStyle ? [] : [removeStyleSpecA], opSpecsB:isSameStyle ? [] : [removeStyleSpecB]}
  }
  function transformRemoveStyleSetParagraphStyle(removeStyleSpec, setParagraphStyleSpec) {
    var helperOpspec, removeStyleSpecResult = [removeStyleSpec], setParagraphStyleSpecResult = [setParagraphStyleSpec];
    if(removeStyleSpec.styleFamily === "paragraph" && removeStyleSpec.styleName === setParagraphStyleSpec.styleName) {
      helperOpspec = {optype:"SetParagraphStyle", memberid:removeStyleSpec.memberid, timestamp:removeStyleSpec.timestamp, position:setParagraphStyleSpec.position, styleName:""};
      removeStyleSpecResult.unshift(helperOpspec);
      setParagraphStyleSpec.styleName = ""
    }
    return{opSpecsA:removeStyleSpecResult, opSpecsB:setParagraphStyleSpecResult}
  }
  function transformRemoveStyleUpdateParagraphStyle(removeStyleSpec, updateParagraphStyleSpec) {
    var setAttributes, helperOpspec, removeStyleSpecResult = [removeStyleSpec], updateParagraphStyleSpecResult = [updateParagraphStyleSpec];
    if(removeStyleSpec.styleFamily === "paragraph") {
      setAttributes = getStyleReferencingAttributes(updateParagraphStyleSpec.setProperties, removeStyleSpec.styleName);
      if(setAttributes.length > 0) {
        helperOpspec = {optype:"UpdateParagraphStyle", memberid:removeStyleSpec.memberid, timestamp:removeStyleSpec.timestamp, styleName:updateParagraphStyleSpec.styleName, removedProperties:{attributes:setAttributes.join(",")}};
        removeStyleSpecResult.unshift(helperOpspec)
      }
      if(removeStyleSpec.styleName === updateParagraphStyleSpec.styleName) {
        updateParagraphStyleSpecResult = []
      }else {
        dropStyleReferencingAttributes(updateParagraphStyleSpec.setProperties, removeStyleSpec.styleName)
      }
    }
    return{opSpecsA:removeStyleSpecResult, opSpecsB:updateParagraphStyleSpecResult}
  }
  function transformRemoveTextRemoveText(removeTextSpecA, removeTextSpecB) {
    var removeTextSpecAEnd = removeTextSpecA.position + removeTextSpecA.length, removeTextSpecBEnd = removeTextSpecB.position + removeTextSpecB.length, removeTextSpecAResult = [removeTextSpecA], removeTextSpecBResult = [removeTextSpecB];
    if(removeTextSpecBEnd <= removeTextSpecA.position) {
      removeTextSpecA.position -= removeTextSpecB.length
    }else {
      if(removeTextSpecAEnd <= removeTextSpecB.position) {
        removeTextSpecB.position -= removeTextSpecA.length
      }else {
        if(removeTextSpecB.position < removeTextSpecAEnd) {
          if(removeTextSpecA.position < removeTextSpecB.position) {
            if(removeTextSpecBEnd < removeTextSpecAEnd) {
              removeTextSpecA.length = removeTextSpecA.length - removeTextSpecB.length
            }else {
              removeTextSpecA.length = removeTextSpecB.position - removeTextSpecA.position
            }
            if(removeTextSpecAEnd < removeTextSpecBEnd) {
              removeTextSpecB.position = removeTextSpecA.position;
              removeTextSpecB.length = removeTextSpecBEnd - removeTextSpecAEnd
            }else {
              removeTextSpecBResult = []
            }
          }else {
            if(removeTextSpecAEnd < removeTextSpecBEnd) {
              removeTextSpecB.length = removeTextSpecB.length - removeTextSpecA.length
            }else {
              if(removeTextSpecB.position < removeTextSpecA.position) {
                removeTextSpecB.length = removeTextSpecA.position - removeTextSpecB.position
              }else {
                removeTextSpecBResult = []
              }
            }
            if(removeTextSpecBEnd < removeTextSpecAEnd) {
              removeTextSpecA.position = removeTextSpecB.position;
              removeTextSpecA.length = removeTextSpecAEnd - removeTextSpecBEnd
            }else {
              removeTextSpecAResult = []
            }
          }
        }
      }
    }
    return{opSpecsA:removeTextSpecAResult, opSpecsB:removeTextSpecBResult}
  }
  function transformRemoveTextSplitParagraph(removeTextSpec, splitParagraphSpec) {
    var removeTextSpecEnd = removeTextSpec.position + removeTextSpec.length, helperOpspec, removeTextSpecResult = [removeTextSpec], splitParagraphSpecResult = [splitParagraphSpec];
    if(splitParagraphSpec.position <= removeTextSpec.position) {
      removeTextSpec.position += 1
    }else {
      if(splitParagraphSpec.position < removeTextSpecEnd) {
        removeTextSpec.length = splitParagraphSpec.position - removeTextSpec.position;
        helperOpspec = {optype:"RemoveText", memberid:removeTextSpec.memberid, timestamp:removeTextSpec.timestamp, position:splitParagraphSpec.position + 1, length:removeTextSpecEnd - splitParagraphSpec.position};
        removeTextSpecResult.unshift(helperOpspec)
      }
    }
    if(removeTextSpec.position + removeTextSpec.length <= splitParagraphSpec.position) {
      splitParagraphSpec.position -= removeTextSpec.length
    }else {
      if(removeTextSpec.position < splitParagraphSpec.position) {
        splitParagraphSpec.position = removeTextSpec.position
      }
    }
    return{opSpecsA:removeTextSpecResult, opSpecsB:splitParagraphSpecResult}
  }
  function passUnchanged(opSpecA, opSpecB) {
    return{opSpecsA:[opSpecA], opSpecsB:[opSpecB]}
  }
  var transformations = {"AddCursor":{"AddCursor":passUnchanged, "AddMember":passUnchanged, "AddStyle":passUnchanged, "ApplyDirectStyling":passUnchanged, "InsertText":passUnchanged, "MoveCursor":passUnchanged, "RemoveCursor":passUnchanged, "RemoveMember":passUnchanged, "RemoveStyle":passUnchanged, "RemoveText":passUnchanged, "SetParagraphStyle":passUnchanged, "SplitParagraph":passUnchanged, "UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "AddMember":{"AddStyle":passUnchanged, 
  "InsertText":passUnchanged, "MoveCursor":passUnchanged, "RemoveCursor":passUnchanged, "RemoveStyle":passUnchanged, "RemoveText":passUnchanged, "SetParagraphStyle":passUnchanged, "SplitParagraph":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "AddStyle":{"AddStyle":passUnchanged, "ApplyDirectStyling":passUnchanged, "InsertText":passUnchanged, "MoveCursor":passUnchanged, "RemoveCursor":passUnchanged, "RemoveMember":passUnchanged, "RemoveStyle":transformAddStyleRemoveStyle, 
  "RemoveText":passUnchanged, "SetParagraphStyle":passUnchanged, "SplitParagraph":passUnchanged, "UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "ApplyDirectStyling":{"ApplyDirectStyling":transformApplyDirectStylingApplyDirectStyling, "InsertText":transformApplyDirectStylingInsertText, "MoveCursor":passUnchanged, "RemoveCursor":passUnchanged, "RemoveStyle":passUnchanged, "RemoveText":transformApplyDirectStylingRemoveText, "SetParagraphStyle":passUnchanged, 
  "SplitParagraph":transformApplyDirectStylingSplitParagraph, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "InsertText":{"InsertText":transformInsertTextInsertText, "MoveCursor":transformInsertTextMoveCursor, "RemoveCursor":passUnchanged, "RemoveMember":passUnchanged, "RemoveStyle":passUnchanged, "RemoveText":transformInsertTextRemoveText, "SplitParagraph":transformInsertTextSplitParagraph, "UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, 
  "MoveCursor":{"MoveCursor":passUnchanged, "RemoveCursor":transformMoveCursorRemoveCursor, "RemoveMember":passUnchanged, "RemoveStyle":passUnchanged, "RemoveText":transformMoveCursorRemoveText, "SetParagraphStyle":passUnchanged, "SplitParagraph":transformMoveCursorSplitParagraph, "UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "RemoveCursor":{"RemoveCursor":transformRemoveCursorRemoveCursor, "RemoveMember":passUnchanged, "RemoveStyle":passUnchanged, 
  "RemoveText":passUnchanged, "SetParagraphStyle":passUnchanged, "SplitParagraph":passUnchanged, "UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "RemoveMember":{"RemoveStyle":passUnchanged, "RemoveText":passUnchanged, "SetParagraphStyle":passUnchanged, "SplitParagraph":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "RemoveStyle":{"RemoveStyle":transformRemoveStyleRemoveStyle, "RemoveText":passUnchanged, "SetParagraphStyle":transformRemoveStyleSetParagraphStyle, 
  "SplitParagraph":passUnchanged, "UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":transformRemoveStyleUpdateParagraphStyle}, "RemoveText":{"RemoveText":transformRemoveTextRemoveText, "SplitParagraph":transformRemoveTextSplitParagraph, "UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "SetParagraphStyle":{"UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "SplitParagraph":{"SplitParagraph":transformSplitParagraphSplitParagraph, 
  "UpdateMember":passUnchanged, "UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "UpdateMember":{"UpdateMetadata":passUnchanged, "UpdateParagraphStyle":passUnchanged}, "UpdateMetadata":{"UpdateMetadata":transformUpdateMetadataUpdateMetadata, "UpdateParagraphStyle":passUnchanged}, "UpdateParagraphStyle":{"UpdateParagraphStyle":transformUpdateParagraphStyleUpdateParagraphStyle}};
  this.passUnchanged = passUnchanged;
  this.extendTransformations = function(moreTransformations) {
    Object.keys(moreTransformations).forEach(function(optypeA) {
      var moreTransformationsOptypeAMap = moreTransformations[optypeA], optypeAMap, isExtendingOptypeAMap = transformations.hasOwnProperty(optypeA);
      runtime.log((isExtendingOptypeAMap ? "Extending" : "Adding") + " map for optypeA: " + optypeA);
      if(!isExtendingOptypeAMap) {
        transformations[optypeA] = {}
      }
      optypeAMap = transformations[optypeA];
      Object.keys(moreTransformationsOptypeAMap).forEach(function(optypeB) {
        var isOverwritingOptypeBEntry = optypeAMap.hasOwnProperty(optypeB);
        runtime.assert(optypeA <= optypeB, "Wrong order:" + optypeA + ", " + optypeB);
        runtime.log("  " + (isOverwritingOptypeBEntry ? "Overwriting" : "Adding") + " entry for optypeB: " + optypeB);
        optypeAMap[optypeB] = moreTransformationsOptypeAMap[optypeB]
      })
    })
  };
  this.transformOpspecVsOpspec = function(opSpecA, opSpecB) {
    var isOptypeAAlphaNumericSmaller = opSpecA.optype <= opSpecB.optype, helper, transformationFunctionMap, transformationFunction, result;
    runtime.log("Crosstransforming:");
    runtime.log(runtime.toJson(opSpecA));
    runtime.log(runtime.toJson(opSpecB));
    if(!isOptypeAAlphaNumericSmaller) {
      helper = opSpecA;
      opSpecA = opSpecB;
      opSpecB = helper
    }
    transformationFunctionMap = transformations[opSpecA.optype];
    transformationFunction = transformationFunctionMap && transformationFunctionMap[opSpecB.optype];
    if(transformationFunction) {
      result = transformationFunction(opSpecA, opSpecB, !isOptypeAAlphaNumericSmaller);
      if(!isOptypeAAlphaNumericSmaller && result !== null) {
        result = {opSpecsA:result.opSpecsB, opSpecsB:result.opSpecsA}
      }
    }else {
      result = null
    }
    runtime.log("result:");
    if(result) {
      runtime.log(runtime.toJson(result.opSpecsA));
      runtime.log(runtime.toJson(result.opSpecsB))
    }else {
      runtime.log("null")
    }
    return result
  }
};
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
runtime.loadClass("ops.OperationFactory");
runtime.loadClass("ops.OperationTransformMatrix");
ops.OperationTransformer = function OperationTransformer() {
  var operationFactory, operationTransformMatrix = new ops.OperationTransformMatrix;
  function operations(opspecs) {
    var ops = [];
    opspecs.forEach(function(opspec) {
      ops.push(operationFactory.create(opspec))
    });
    return ops
  }
  function transformOpVsOp(opSpecA, opSpecB) {
    return operationTransformMatrix.transformOpspecVsOpspec(opSpecA, opSpecB)
  }
  function transformOpListVsOp(opSpecsA, opSpecB) {
    var transformResult, transformListResult, transformedOpspecsA = [], transformedOpspecsB = [];
    while(opSpecsA.length > 0 && opSpecB) {
      transformResult = transformOpVsOp(opSpecsA.shift(), (opSpecB));
      if(!transformResult) {
        return null
      }
      transformedOpspecsA = transformedOpspecsA.concat(transformResult.opSpecsA);
      if(transformResult.opSpecsB.length === 0) {
        transformedOpspecsA = transformedOpspecsA.concat(opSpecsA);
        opSpecB = null;
        break
      }
      while(transformResult.opSpecsB.length > 1) {
        transformListResult = transformOpListVsOp(opSpecsA, transformResult.opSpecsB.shift());
        if(!transformListResult) {
          return null
        }
        transformedOpspecsB = transformedOpspecsB.concat(transformListResult.opSpecsB);
        opSpecsA = transformListResult.opSpecsA
      }
      opSpecB = transformResult.opSpecsB.pop()
    }
    if(opSpecB) {
      transformedOpspecsB.push(opSpecB)
    }
    return{opSpecsA:transformedOpspecsA, opSpecsB:transformedOpspecsB}
  }
  this.setOperationFactory = function(f) {
    operationFactory = f
  };
  this.getOperationTransformMatrix = function() {
    return operationTransformMatrix
  };
  this.transform = function(opSpecsA, opSpecsB) {
    var transformResult, transformedOpspecsB = [];
    while(opSpecsB.length > 0) {
      transformResult = transformOpListVsOp(opSpecsA, opSpecsB.shift());
      if(!transformResult) {
        return null
      }
      opSpecsA = transformResult.opSpecsA;
      transformedOpspecsB = transformedOpspecsB.concat(transformResult.opSpecsB)
    }
    return{opsA:operations(opSpecsA), opsB:operations(transformedOpspecsB)}
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

 You should have received a copy of the GNU Affero General Public License
 along with this code.  If not, see <http://www.gnu.org/licenses/>.

 As additional permission under GNU AGPL version 3 section 7, you
 may distribute non-source (e.g., minimized or compacted) forms of
 that code without the copy of the GNU GPL normally required by
 section 4, provided you include this license notice and a URL
 through which recipients can access the Corresponding Source.

 As a special exception to the AGPL, any HTML file which merely makes function
 calls to this code, and for that purpose includes it by reference shall be
 deemed a separate work for copyright law purposes. In addition, the copyright
 holders of this code give you permission to combine this code with free
 software libraries that are released under the GNU LGPL. You may copy and
 distribute such a system following the terms of the GNU AGPL for this code
 and the LGPL for the libraries. If you modify this code, you may extend this
 exception to your version of the code, but you are not obligated to do so.
 If you do not wish to do so, delete this exception statement from your
 version.

 This license applies to this entire compilation.
 @licend
 @source: http://www.webodf.org/
 @source: https://github.com/kogmbh/WebODF/
*/
ops.TrivialOperationRouter = function TrivialOperationRouter() {
  var operationFactory, playbackFunction;
  this.setOperationFactory = function(f) {
    operationFactory = f
  };
  this.setPlaybackFunction = function(playback_func) {
    playbackFunction = playback_func
  };
  this.push = function(operations) {
    operations.forEach(function(op) {
      var timedOp, opspec = op.spec();
      opspec.timestamp = (new Date).getTime();
      timedOp = operationFactory.create(opspec);
      playbackFunction(timedOp)
    })
  };
  this.close = function(cb) {
    cb()
  };
  this.subscribe = function(eventId, cb) {
  };
  this.unsubscribe = function(eventId, cb) {
  };
  this.hasLocalUnsyncedOps = function() {
    return false
  };
  this.hasSessionHostConnection = function() {
    return true
  }
};
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
runtime.loadClass("ops.EditInfo");
runtime.loadClass("gui.EditInfoHandle");
gui.EditInfoMarker = function EditInfoMarker(editInfo, initialVisibility) {
  var self = this, editInfoNode, handle, marker, editinfons = "urn:webodf:names:editinfo", decay1, decay2, decayTimeStep = 1E4;
  function applyDecay(opacity, delay) {
    return runtime.setTimeout(function() {
      marker.style.opacity = opacity
    }, delay)
  }
  function deleteDecay(timer) {
    runtime.clearTimeout(timer)
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
  this.show = function() {
    marker.style.display = "block"
  };
  this.hide = function() {
    self.hideHandle();
    marker.style.display = "none"
  };
  this.showHandle = function() {
    handle.show()
  };
  this.hideHandle = function() {
    handle.hide()
  };
  this.destroy = function(callback) {
    editInfoNode.removeChild(marker);
    handle.destroy(function(err) {
      if(err) {
        callback(err)
      }else {
        editInfo.destroy(callback)
      }
    })
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
    handle = new gui.EditInfoHandle(editInfoNode);
    if(!initialVisibility) {
      self.hide()
    }
  }
  init()
};
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
gui.PlainTextPasteboard = function PlainTextPasteboard(odtDocument, inputMemberId) {
  function createOp(op, data) {
    op.init(data);
    return op
  }
  this.createPasteOps = function(data) {
    var originalCursorPosition = odtDocument.getCursorPosition(inputMemberId), cursorPosition = originalCursorPosition, operations = [], paragraphs;
    paragraphs = data.replace(/\r/g, "").split("\n");
    paragraphs.forEach(function(text) {
      operations.push(createOp(new ops.OpSplitParagraph, {memberid:inputMemberId, position:cursorPosition, moveCursor:true}));
      cursorPosition += 1;
      operations.push(createOp(new ops.OpInsertText, {memberid:inputMemberId, position:cursorPosition, text:text, moveCursor:true}));
      cursorPosition += text.length
    });
    operations.push(createOp(new ops.OpRemoveText, {memberid:inputMemberId, position:originalCursorPosition, length:1}));
    return operations
  }
};
runtime.loadClass("core.DomUtils");
runtime.loadClass("odf.OdfUtils");
runtime.loadClass("odf.OdfNodeFilter");
runtime.loadClass("gui.SelectionMover");
gui.SelectionView = function SelectionView(cursor) {
  var odtDocument = cursor.getOdtDocument(), documentRoot, root, doc = odtDocument.getDOM(), overlayTop = doc.createElement("div"), overlayMiddle = doc.createElement("div"), overlayBottom = doc.createElement("div"), odfUtils = new odf.OdfUtils, domUtils = new core.DomUtils, isVisible = true, positionIterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootNode()), FILTER_ACCEPT = NodeFilter.FILTER_ACCEPT, FILTER_REJECT = NodeFilter.FILTER_REJECT;
  function addOverlays() {
    var newDocumentRoot = odtDocument.getRootNode();
    if(documentRoot !== newDocumentRoot) {
      documentRoot = newDocumentRoot;
      root = (documentRoot.parentNode.parentNode.parentNode);
      root.appendChild(overlayTop);
      root.appendChild(overlayMiddle);
      root.appendChild(overlayBottom)
    }
  }
  function setRect(div, rect) {
    div.style.left = rect.left + "px";
    div.style.top = rect.top + "px";
    div.style.width = rect.width + "px";
    div.style.height = rect.height + "px"
  }
  function showOverlays(choice) {
    var display;
    isVisible = choice;
    display = choice === true ? "block" : "none";
    overlayTop.style.display = overlayMiddle.style.display = overlayBottom.style.display = display
  }
  function translateRect(rect) {
    var rootRect = domUtils.getBoundingClientRect(root), zoomLevel = odtDocument.getOdfCanvas().getZoomLevel(), resultRect = {};
    resultRect.top = domUtils.adaptRangeDifferenceToZoomLevel(rect.top - rootRect.top, zoomLevel);
    resultRect.left = domUtils.adaptRangeDifferenceToZoomLevel(rect.left - rootRect.left, zoomLevel);
    resultRect.bottom = domUtils.adaptRangeDifferenceToZoomLevel(rect.bottom - rootRect.top, zoomLevel);
    resultRect.right = domUtils.adaptRangeDifferenceToZoomLevel(rect.right - rootRect.left, zoomLevel);
    resultRect.width = domUtils.adaptRangeDifferenceToZoomLevel(rect.width, zoomLevel);
    resultRect.height = domUtils.adaptRangeDifferenceToZoomLevel(rect.height, zoomLevel);
    return resultRect
  }
  function isRangeVisible(range) {
    var bcr = range.getBoundingClientRect();
    return Boolean(bcr && bcr.height !== 0)
  }
  function lastVisibleRect(range, nodes) {
    var nextNodeIndex = nodes.length - 1, node = nodes[nextNodeIndex], startOffset = range.endContainer === node ? range.endOffset : node.length || node.childNodes.length, endOffset = startOffset;
    range.setStart(node, startOffset);
    range.setEnd(node, endOffset);
    while(!isRangeVisible(range)) {
      if(node.nodeType === Node.ELEMENT_NODE && startOffset > 0) {
        startOffset = 0
      }else {
        if(node.nodeType === Node.TEXT_NODE && startOffset > 0) {
          startOffset -= 1
        }else {
          if(nodes[nextNodeIndex]) {
            node = nodes[nextNodeIndex];
            nextNodeIndex -= 1;
            startOffset = endOffset = node.length || node.childNodes.length
          }else {
            return false
          }
        }
      }
      range.setStart(node, startOffset);
      range.setEnd(node, endOffset)
    }
    return true
  }
  function firstVisibleRect(range, nodes) {
    var nextNodeIndex = 0, node = nodes[nextNodeIndex], startOffset = range.startContainer === node ? range.startOffset : 0, endOffset = startOffset;
    range.setStart(node, startOffset);
    range.setEnd(node, endOffset);
    while(!isRangeVisible(range)) {
      if(node.nodeType === Node.ELEMENT_NODE && endOffset < node.childNodes.length) {
        endOffset = node.childNodes.length
      }else {
        if(node.nodeType === Node.TEXT_NODE && endOffset < node.length) {
          endOffset += 1
        }else {
          if(nodes[nextNodeIndex]) {
            node = nodes[nextNodeIndex];
            nextNodeIndex += 1;
            startOffset = endOffset = 0
          }else {
            return false
          }
        }
      }
      range.setStart(node, startOffset);
      range.setEnd(node, endOffset)
    }
    return true
  }
  function getExtremeRanges(range) {
    var nodes = odfUtils.getTextElements(range, true, false), firstRange = (range.cloneRange()), lastRange = (range.cloneRange()), fillerRange = range.cloneRange();
    if(!nodes.length) {
      return null
    }
    if(!firstVisibleRect(firstRange, nodes)) {
      return null
    }
    if(!lastVisibleRect(lastRange, nodes)) {
      return null
    }
    fillerRange.setStart(firstRange.startContainer, firstRange.startOffset);
    fillerRange.setEnd(lastRange.endContainer, lastRange.endOffset);
    return{firstRange:firstRange, lastRange:lastRange, fillerRange:fillerRange}
  }
  function getBoundingRect(rect1, rect2) {
    var resultRect = {};
    resultRect.top = Math.min(rect1.top, rect2.top);
    resultRect.left = Math.min(rect1.left, rect2.left);
    resultRect.right = Math.max(rect1.right, rect2.right);
    resultRect.bottom = Math.max(rect1.bottom, rect2.bottom);
    resultRect.width = resultRect.right - resultRect.left;
    resultRect.height = resultRect.bottom - resultRect.top;
    return resultRect
  }
  function checkAndGrowOrCreateRect(originalRect, newRect) {
    if(newRect && (newRect.width > 0 && newRect.height > 0)) {
      if(!originalRect) {
        originalRect = newRect
      }else {
        originalRect = getBoundingRect(originalRect, newRect)
      }
    }
    return originalRect
  }
  function getFillerRect(fillerRange) {
    var containerNode = fillerRange.commonAncestorContainer, firstNode = (fillerRange.startContainer), lastNode = (fillerRange.endContainer), firstOffset = fillerRange.startOffset, lastOffset = fillerRange.endOffset, currentNode, lastMeasuredNode, firstSibling, lastSibling, grownRect = null, currentRect, range = doc.createRange(), rootFilter, odfNodeFilter = new odf.OdfNodeFilter, treeWalker;
    function acceptNode(node) {
      positionIterator.setUnfilteredPosition(node, 0);
      if(odfNodeFilter.acceptNode(node) === FILTER_ACCEPT && rootFilter.acceptPosition(positionIterator) === FILTER_ACCEPT) {
        return FILTER_ACCEPT
      }
      return FILTER_REJECT
    }
    function getRectFromNodeAfterFiltering(node) {
      var rect = null;
      if(acceptNode(node) === FILTER_ACCEPT) {
        rect = domUtils.getBoundingClientRect(node)
      }
      return rect
    }
    if(firstNode === containerNode || lastNode === containerNode) {
      range = fillerRange.cloneRange();
      grownRect = range.getBoundingClientRect();
      range.detach();
      return grownRect
    }
    firstSibling = firstNode;
    while(firstSibling.parentNode !== containerNode) {
      firstSibling = firstSibling.parentNode
    }
    lastSibling = lastNode;
    while(lastSibling.parentNode !== containerNode) {
      lastSibling = lastSibling.parentNode
    }
    rootFilter = odtDocument.createRootFilter(firstNode);
    currentNode = firstSibling.nextSibling;
    while(currentNode && currentNode !== lastSibling) {
      currentRect = getRectFromNodeAfterFiltering(currentNode);
      grownRect = checkAndGrowOrCreateRect(grownRect, currentRect);
      currentNode = currentNode.nextSibling
    }
    if(odfUtils.isParagraph(firstSibling)) {
      grownRect = checkAndGrowOrCreateRect(grownRect, domUtils.getBoundingClientRect(firstSibling))
    }else {
      if(firstSibling.nodeType === Node.TEXT_NODE) {
        currentNode = firstSibling;
        range.setStart(currentNode, firstOffset);
        range.setEnd(currentNode, currentNode === lastSibling ? lastOffset : currentNode.length);
        currentRect = range.getBoundingClientRect();
        grownRect = checkAndGrowOrCreateRect(grownRect, currentRect)
      }else {
        treeWalker = doc.createTreeWalker(firstSibling, NodeFilter.SHOW_TEXT, acceptNode, false);
        currentNode = treeWalker.currentNode = firstNode;
        while(currentNode && currentNode !== lastNode) {
          range.setStart(currentNode, firstOffset);
          range.setEnd(currentNode, currentNode.length);
          currentRect = range.getBoundingClientRect();
          grownRect = checkAndGrowOrCreateRect(grownRect, currentRect);
          lastMeasuredNode = currentNode;
          firstOffset = 0;
          currentNode = treeWalker.nextNode()
        }
      }
    }
    if(!lastMeasuredNode) {
      lastMeasuredNode = firstNode
    }
    if(odfUtils.isParagraph(lastSibling)) {
      grownRect = checkAndGrowOrCreateRect(grownRect, domUtils.getBoundingClientRect(lastSibling))
    }else {
      if(lastSibling.nodeType === Node.TEXT_NODE) {
        currentNode = lastSibling;
        range.setStart(currentNode, currentNode === firstSibling ? firstOffset : 0);
        range.setEnd(currentNode, lastOffset);
        currentRect = range.getBoundingClientRect();
        grownRect = checkAndGrowOrCreateRect(grownRect, currentRect)
      }else {
        treeWalker = doc.createTreeWalker(lastSibling, NodeFilter.SHOW_TEXT, acceptNode, false);
        currentNode = treeWalker.currentNode = lastNode;
        while(currentNode && currentNode !== lastMeasuredNode) {
          range.setStart(currentNode, 0);
          range.setEnd(currentNode, lastOffset);
          currentRect = range.getBoundingClientRect();
          grownRect = checkAndGrowOrCreateRect(grownRect, currentRect);
          currentNode = treeWalker.previousNode();
          if(currentNode) {
            lastOffset = currentNode.length
          }
        }
      }
    }
    return grownRect
  }
  function getCollapsedRectOfTextRange(range, useRightEdge) {
    var clientRect = range.getBoundingClientRect(), collapsedRect = {};
    collapsedRect.width = 0;
    collapsedRect.top = clientRect.top;
    collapsedRect.bottom = clientRect.bottom;
    collapsedRect.height = clientRect.height;
    collapsedRect.left = collapsedRect.right = useRightEdge ? clientRect.right : clientRect.left;
    return collapsedRect
  }
  function repositionOverlays(selectedRange) {
    var extremes = getExtremeRanges(selectedRange), firstRange, lastRange, fillerRange, firstRect, fillerRect, lastRect;
    if(selectedRange.collapsed || !extremes) {
      showOverlays(false)
    }else {
      showOverlays(true);
      firstRange = extremes.firstRange;
      lastRange = extremes.lastRange;
      fillerRange = extremes.fillerRange;
      firstRect = translateRect(getCollapsedRectOfTextRange(firstRange, false));
      lastRect = translateRect(getCollapsedRectOfTextRange(lastRange, true));
      fillerRect = getFillerRect(fillerRange);
      if(!fillerRect) {
        fillerRect = getBoundingRect(firstRect, lastRect)
      }else {
        fillerRect = translateRect(fillerRect)
      }
      setRect(overlayTop, {left:firstRect.left, top:firstRect.top, width:Math.max(0, fillerRect.width - (firstRect.left - fillerRect.left)), height:firstRect.height});
      if(lastRect.top === firstRect.top || lastRect.bottom === firstRect.bottom) {
        overlayMiddle.style.display = overlayBottom.style.display = "none"
      }else {
        setRect(overlayBottom, {left:fillerRect.left, top:lastRect.top, width:Math.max(0, lastRect.right - fillerRect.left), height:lastRect.height});
        setRect(overlayMiddle, {left:fillerRect.left, top:firstRect.top + firstRect.height, width:Math.max(0, parseFloat(overlayTop.style.left) + parseFloat(overlayTop.style.width) - parseFloat(overlayBottom.style.left)), height:Math.max(0, lastRect.top - firstRect.bottom)})
      }
      firstRange.detach();
      lastRange.detach();
      fillerRange.detach()
    }
  }
  function rerender() {
    addOverlays();
    if(cursor.getSelectionType() === ops.OdtCursor.RangeSelection) {
      showOverlays(true);
      repositionOverlays(cursor.getSelectedRange())
    }else {
      showOverlays(false)
    }
  }
  this.rerender = rerender;
  this.show = rerender;
  this.hide = function() {
    showOverlays(false)
  };
  this.visible = function() {
    return isVisible
  };
  function handleCursorMove(movedCursor) {
    if(movedCursor === cursor) {
      rerender()
    }
  }
  this.destroy = function(callback) {
    root.removeChild(overlayTop);
    root.removeChild(overlayMiddle);
    root.removeChild(overlayBottom);
    cursor.getOdtDocument().unsubscribe(ops.OdtDocument.signalCursorMoved, handleCursorMove);
    callback()
  };
  function init() {
    var editinfons = "urn:webodf:names:editinfo", memberid = cursor.getMemberId();
    addOverlays();
    overlayTop.setAttributeNS(editinfons, "editinfo:memberid", memberid);
    overlayMiddle.setAttributeNS(editinfons, "editinfo:memberid", memberid);
    overlayBottom.setAttributeNS(editinfons, "editinfo:memberid", memberid);
    overlayTop.className = overlayMiddle.className = overlayBottom.className = "selectionOverlay";
    cursor.getOdtDocument().subscribe(ops.OdtDocument.signalCursorMoved, handleCursorMove)
  }
  init()
};
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
gui.SelectionViewManager = function SelectionViewManager() {
  var selectionViews = {};
  function getSelectionView(memberId) {
    return selectionViews.hasOwnProperty(memberId) ? selectionViews[memberId] : null
  }
  this.getSelectionView = getSelectionView;
  function getSelectionViews() {
    return Object.keys(selectionViews).map(function(memberid) {
      return selectionViews[memberid]
    })
  }
  this.getSelectionViews = getSelectionViews;
  function removeSelectionView(memberId) {
    if(selectionViews.hasOwnProperty(memberId)) {
      selectionViews[memberId].destroy(function() {
      });
      delete selectionViews[memberId]
    }
  }
  this.removeSelectionView = removeSelectionView;
  function hideSelectionView(memberId) {
    if(selectionViews.hasOwnProperty(memberId)) {
      selectionViews[memberId].hide()
    }
  }
  this.hideSelectionView = hideSelectionView;
  function showSelectionView(memberId) {
    if(selectionViews.hasOwnProperty(memberId)) {
      selectionViews[memberId].show()
    }
  }
  this.showSelectionView = showSelectionView;
  this.rerenderSelectionViews = function() {
    Object.keys(selectionViews).forEach(function(memberId) {
      if(selectionViews[memberId].visible()) {
        selectionViews[memberId].rerender()
      }
    })
  };
  this.registerCursor = function(cursor, virtualSelectionsInitiallyVisible) {
    var memberId = cursor.getMemberId(), selectionView = new gui.SelectionView(cursor);
    if(virtualSelectionsInitiallyVisible) {
      selectionView.show()
    }else {
      selectionView.hide()
    }
    selectionViews[memberId] = selectionView;
    return selectionView
  };
  this.destroy = function(callback) {
    var selectionViewArray = getSelectionViews();
    (function destroySelectionView(i, err) {
      if(err) {
        callback(err)
      }else {
        if(i < selectionViewArray.length) {
          selectionViewArray[i].destroy(function(err) {
            destroySelectionView(i + 1, err)
          })
        }else {
          callback()
        }
      }
    })(0, undefined)
  }
};
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
runtime.loadClass("core.DomUtils");
runtime.loadClass("gui.UndoManager");
runtime.loadClass("gui.UndoStateRules");
gui.TrivialUndoManager = function TrivialUndoManager(defaultRules) {
  var self = this, cursorns = "urn:webodf:names:cursor", domUtils = new core.DomUtils, initialDoc, initialState = [], playFunc, odtDocument, currentUndoState = [], undoStates = [], redoStates = [], eventNotifier = new core.EventNotifier([gui.UndoManager.signalUndoStackChanged, gui.UndoManager.signalUndoStateCreated, gui.UndoManager.signalUndoStateModified, gui.TrivialUndoManager.signalDocumentRootReplaced]), undoRules = defaultRules || new gui.UndoStateRules;
  function emitStackChange() {
    eventNotifier.emit(gui.UndoManager.signalUndoStackChanged, {undoAvailable:self.hasUndoStates(), redoAvailable:self.hasRedoStates()})
  }
  function mostRecentUndoState() {
    return undoStates[undoStates.length - 1]
  }
  function completeCurrentUndoState() {
    if(currentUndoState !== initialState && currentUndoState !== mostRecentUndoState()) {
      undoStates.push(currentUndoState)
    }
  }
  function removeNode(node) {
    var sibling = node.previousSibling || node.nextSibling;
    node.parentNode.removeChild(node);
    domUtils.normalizeTextNodes(sibling)
  }
  function removeCursors(root) {
    domUtils.getElementsByTagNameNS(root, cursorns, "cursor").forEach(removeNode);
    domUtils.getElementsByTagNameNS(root, cursorns, "anchor").forEach(removeNode)
  }
  function values(obj) {
    return Object.keys(obj).map(function(key) {
      return obj[key]
    })
  }
  function extractCursorStates(undoStates) {
    var addCursor = {}, moveCursor = {}, requiredAddOps = {}, remainingAddOps, operations = undoStates.pop();
    odtDocument.getCursors().forEach(function(cursor) {
      requiredAddOps[cursor.getMemberId()] = true
    });
    remainingAddOps = Object.keys(requiredAddOps).length;
    function processOp(op) {
      var spec = op.spec();
      if(!requiredAddOps[spec.memberid]) {
        return
      }
      switch(spec.optype) {
        case "AddCursor":
          if(!addCursor[spec.memberid]) {
            addCursor[spec.memberid] = op;
            delete requiredAddOps[spec.memberid];
            remainingAddOps -= 1
          }
          break;
        case "MoveCursor":
          if(!moveCursor[spec.memberid]) {
            moveCursor[spec.memberid] = op
          }
          break
      }
    }
    while(operations && remainingAddOps > 0) {
      operations.reverse();
      operations.forEach(processOp);
      operations = undoStates.pop()
    }
    return values(addCursor).concat(values(moveCursor))
  }
  this.subscribe = function(signal, callback) {
    eventNotifier.subscribe(signal, callback)
  };
  this.unsubscribe = function(signal, callback) {
    eventNotifier.unsubscribe(signal, callback)
  };
  this.hasUndoStates = function() {
    return undoStates.length > 0
  };
  this.hasRedoStates = function() {
    return redoStates.length > 0
  };
  this.setOdtDocument = function(newDocument) {
    odtDocument = newDocument
  };
  this.resetInitialState = function() {
    undoStates.length = 0;
    redoStates.length = 0;
    initialState.length = 0;
    currentUndoState.length = 0;
    initialDoc = null;
    emitStackChange()
  };
  this.saveInitialState = function() {
    var odfContainer = odtDocument.getOdfCanvas().odfContainer(), annotationViewManager = odtDocument.getOdfCanvas().getAnnotationViewManager();
    if(annotationViewManager) {
      annotationViewManager.forgetAnnotations()
    }
    initialDoc = odfContainer.rootElement.cloneNode(true);
    odtDocument.getOdfCanvas().refreshAnnotations();
    removeCursors(initialDoc);
    completeCurrentUndoState();
    undoStates.unshift(initialState);
    currentUndoState = initialState = extractCursorStates(undoStates);
    undoStates.length = 0;
    redoStates.length = 0;
    emitStackChange()
  };
  this.setPlaybackFunction = function(playback_func) {
    playFunc = playback_func
  };
  this.onOperationExecuted = function(op) {
    redoStates.length = 0;
    if(undoRules.isEditOperation(op) && currentUndoState === initialState || !undoRules.isPartOfOperationSet(op, currentUndoState)) {
      completeCurrentUndoState();
      currentUndoState = [op];
      undoStates.push(currentUndoState);
      eventNotifier.emit(gui.UndoManager.signalUndoStateCreated, {operations:currentUndoState});
      emitStackChange()
    }else {
      currentUndoState.push(op);
      eventNotifier.emit(gui.UndoManager.signalUndoStateModified, {operations:currentUndoState})
    }
  };
  this.moveForward = function(states) {
    var moved = 0, redoOperations;
    while(states && redoStates.length) {
      redoOperations = redoStates.pop();
      undoStates.push(redoOperations);
      redoOperations.forEach(playFunc);
      states -= 1;
      moved += 1
    }
    if(moved) {
      currentUndoState = mostRecentUndoState();
      emitStackChange()
    }
    return moved
  };
  this.moveBackward = function(states) {
    var odfCanvas = odtDocument.getOdfCanvas(), odfContainer = odfCanvas.odfContainer(), moved = 0;
    while(states && undoStates.length) {
      redoStates.push(undoStates.pop());
      states -= 1;
      moved += 1
    }
    if(moved) {
      odfContainer.setRootElement(initialDoc.cloneNode(true));
      odfCanvas.setOdfContainer(odfContainer, true);
      eventNotifier.emit(gui.TrivialUndoManager.signalDocumentRootReplaced, {});
      odtDocument.getCursors().forEach(function(cursor) {
        odtDocument.removeCursor(cursor.getMemberId())
      });
      initialState.forEach(playFunc);
      undoStates.forEach(function(ops) {
        ops.forEach(playFunc)
      });
      odfCanvas.refreshCSS();
      currentUndoState = mostRecentUndoState() || initialState;
      emitStackChange()
    }
    return moved
  }
};
gui.TrivialUndoManager.signalDocumentRootReplaced = "documentRootReplaced";
(function() {
  return gui.TrivialUndoManager
})();
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
runtime.loadClass("ops.TrivialOperationRouter");
runtime.loadClass("ops.OperationFactory");
runtime.loadClass("ops.OdtDocument");
ops.Session = function Session(odfCanvas) {
  var self = this, operationFactory = new ops.OperationFactory, odtDocument = new ops.OdtDocument(odfCanvas), operationRouter = null;
  this.setOperationFactory = function(opFactory) {
    operationFactory = opFactory;
    if(operationRouter) {
      operationRouter.setOperationFactory(operationFactory)
    }
  };
  this.setOperationRouter = function(opRouter) {
    operationRouter = opRouter;
    opRouter.setPlaybackFunction(function(op) {
      if(op.execute(odtDocument)) {
        odtDocument.emit(ops.OdtDocument.signalOperationExecuted, op);
        return true
      }
      return false
    });
    opRouter.setOperationFactory(operationFactory)
  };
  this.getOperationFactory = function() {
    return operationFactory
  };
  this.getOdtDocument = function() {
    return odtDocument
  };
  this.enqueue = function(ops) {
    operationRouter.push(ops)
  };
  this.close = function(callback) {
    operationRouter.close(function(err) {
      if(err) {
        callback(err)
      }else {
        odtDocument.close(callback)
      }
    })
  };
  this.destroy = function(callback) {
    odtDocument.destroy(callback)
  };
  function init() {
    self.setOperationRouter(new ops.TrivialOperationRouter)
  }
  init()
};
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
runtime.loadClass("core.EventNotifier");
runtime.loadClass("core.PositionFilter");
runtime.loadClass("ops.Session");
runtime.loadClass("ops.OpAddAnnotation");
runtime.loadClass("ops.OpRemoveAnnotation");
runtime.loadClass("gui.SelectionMover");
gui.AnnotationController = function AnnotationController(session, inputMemberId) {
  var odtDocument = session.getOdtDocument(), isAnnotatable = false, eventNotifier = new core.EventNotifier([gui.AnnotationController.annotatableChanged]), officens = odf.Namespaces.officens;
  function isWithinAnnotation(node, container) {
    while(node && node !== container) {
      if(node.namespaceURI === officens && node.localName === "annotation") {
        return true
      }
      node = node.parentNode
    }
    return false
  }
  function updatedCachedValues() {
    var cursor = odtDocument.getCursor(inputMemberId), cursorNode = cursor && cursor.getNode(), newIsAnnotatable = false;
    if(cursorNode) {
      newIsAnnotatable = !isWithinAnnotation(cursorNode, odtDocument.getRootNode())
    }
    if(newIsAnnotatable !== isAnnotatable) {
      isAnnotatable = newIsAnnotatable;
      eventNotifier.emit(gui.AnnotationController.annotatableChanged, isAnnotatable)
    }
  }
  function onCursorAdded(cursor) {
    if(cursor.getMemberId() === inputMemberId) {
      updatedCachedValues()
    }
  }
  function onCursorRemoved(memberId) {
    if(memberId === inputMemberId) {
      updatedCachedValues()
    }
  }
  function onCursorMoved(cursor) {
    if(cursor.getMemberId() === inputMemberId) {
      updatedCachedValues()
    }
  }
  this.isAnnotatable = function() {
    return isAnnotatable
  };
  this.addAnnotation = function() {
    var op = new ops.OpAddAnnotation, selection = odtDocument.getCursorSelection(inputMemberId), length = selection.length, position = selection.position;
    if(!isAnnotatable) {
      return
    }
    position = length >= 0 ? position : position + length;
    length = Math.abs(length);
    op.init({memberid:inputMemberId, position:position, length:length, name:inputMemberId + Date.now()});
    session.enqueue([op])
  };
  this.removeAnnotation = function(annotationNode) {
    var startStep, endStep, op, moveCursor;
    startStep = odtDocument.convertDomPointToCursorStep(annotationNode, 0) + 1;
    endStep = odtDocument.convertDomPointToCursorStep(annotationNode, annotationNode.childNodes.length);
    op = new ops.OpRemoveAnnotation;
    op.init({memberid:inputMemberId, position:startStep, length:endStep - startStep});
    moveCursor = new ops.OpMoveCursor;
    moveCursor.init({memberid:inputMemberId, position:startStep > 0 ? startStep - 1 : startStep, length:0});
    session.enqueue([op, moveCursor])
  };
  this.subscribe = function(eventid, cb) {
    eventNotifier.subscribe(eventid, cb)
  };
  this.unsubscribe = function(eventid, cb) {
    eventNotifier.unsubscribe(eventid, cb)
  };
  this.destroy = function(callback) {
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorAdded, onCursorAdded);
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorRemoved, onCursorRemoved);
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorMoved, onCursorMoved);
    callback()
  };
  function init() {
    odtDocument.subscribe(ops.OdtDocument.signalCursorAdded, onCursorAdded);
    odtDocument.subscribe(ops.OdtDocument.signalCursorRemoved, onCursorRemoved);
    odtDocument.subscribe(ops.OdtDocument.signalCursorMoved, onCursorMoved);
    updatedCachedValues()
  }
  init()
};
gui.AnnotationController.annotatableChanged = "annotatable/changed";
(function() {
  return gui.AnnotationController
})();
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
runtime.loadClass("core.EventNotifier");
runtime.loadClass("core.Utils");
runtime.loadClass("odf.OdfUtils");
runtime.loadClass("ops.OpAddStyle");
runtime.loadClass("ops.OpSetParagraphStyle");
runtime.loadClass("gui.StyleHelper");
gui.DirectParagraphStyler = function DirectParagraphStyler(session, inputMemberId, objectNameGenerator) {
  var odtDocument = session.getOdtDocument(), utils = new core.Utils, odfUtils = new odf.OdfUtils, styleHelper = new gui.StyleHelper(odtDocument.getFormatting()), eventNotifier = new core.EventNotifier([gui.DirectParagraphStyler.paragraphStylingChanged]), isAlignedLeftValue, isAlignedCenterValue, isAlignedRightValue, isAlignedJustifiedValue;
  function updatedCachedValues() {
    var cursor = odtDocument.getCursor(inputMemberId), range = cursor && cursor.getSelectedRange(), diffMap;
    function noteChange(oldValue, newValue, id) {
      if(oldValue !== newValue) {
        if(diffMap === undefined) {
          diffMap = {}
        }
        diffMap[id] = newValue
      }
      return newValue
    }
    isAlignedLeftValue = noteChange(isAlignedLeftValue, range ? styleHelper.isAlignedLeft(range) : false, "isAlignedLeft");
    isAlignedCenterValue = noteChange(isAlignedCenterValue, range ? styleHelper.isAlignedCenter(range) : false, "isAlignedCenter");
    isAlignedRightValue = noteChange(isAlignedRightValue, range ? styleHelper.isAlignedRight(range) : false, "isAlignedRight");
    isAlignedJustifiedValue = noteChange(isAlignedJustifiedValue, range ? styleHelper.isAlignedJustified(range) : false, "isAlignedJustified");
    if(diffMap) {
      eventNotifier.emit(gui.DirectParagraphStyler.paragraphStylingChanged, diffMap)
    }
  }
  function onCursorAdded(cursor) {
    if(cursor.getMemberId() === inputMemberId) {
      updatedCachedValues()
    }
  }
  function onCursorRemoved(memberId) {
    if(memberId === inputMemberId) {
      updatedCachedValues()
    }
  }
  function onCursorMoved(cursor) {
    if(cursor.getMemberId() === inputMemberId) {
      updatedCachedValues()
    }
  }
  function onParagraphStyleModified() {
    updatedCachedValues()
  }
  function onParagraphChanged(args) {
    var cursor = odtDocument.getCursor(inputMemberId);
    if(cursor && odtDocument.getParagraphElement(cursor.getNode()) === args.paragraphElement) {
      updatedCachedValues()
    }
  }
  this.isAlignedLeft = function() {
    return isAlignedLeftValue
  };
  this.isAlignedCenter = function() {
    return isAlignedCenterValue
  };
  this.isAlignedRight = function() {
    return isAlignedRightValue
  };
  this.isAlignedJustified = function() {
    return isAlignedJustifiedValue
  };
  function roundUp(step) {
    return step === ops.StepsTranslator.NEXT_STEP
  }
  function applyParagraphDirectStyling(applyDirectStyling) {
    var range = odtDocument.getCursor(inputMemberId).getSelectedRange(), paragraphs = odfUtils.getParagraphElements(range), formatting = odtDocument.getFormatting();
    paragraphs.forEach(function(paragraph) {
      var paragraphStartPoint = odtDocument.convertDomPointToCursorStep(paragraph, 0, roundUp), paragraphStyleName = paragraph.getAttributeNS(odf.Namespaces.textns, "style-name"), newParagraphStyleName = objectNameGenerator.generateStyleName(), opAddStyle, opSetParagraphStyle, paragraphProperties;
      if(paragraphStyleName) {
        paragraphProperties = formatting.createDerivedStyleObject(paragraphStyleName, "paragraph", {})
      }
      paragraphProperties = applyDirectStyling(paragraphProperties || {});
      opAddStyle = new ops.OpAddStyle;
      opAddStyle.init({memberid:inputMemberId, styleName:newParagraphStyleName, styleFamily:"paragraph", isAutomaticStyle:true, setProperties:paragraphProperties});
      opSetParagraphStyle = new ops.OpSetParagraphStyle;
      opSetParagraphStyle.init({memberid:inputMemberId, styleName:newParagraphStyleName, position:paragraphStartPoint});
      session.enqueue([opAddStyle, opSetParagraphStyle])
    })
  }
  function applySimpleParagraphDirectStyling(styleOverrides) {
    applyParagraphDirectStyling(function(paragraphStyle) {
      return utils.mergeObjects(paragraphStyle, styleOverrides)
    })
  }
  function alignParagraph(alignment) {
    applySimpleParagraphDirectStyling({"style:paragraph-properties":{"fo:text-align":alignment}})
  }
  this.alignParagraphLeft = function() {
    alignParagraph("left");
    return true
  };
  this.alignParagraphCenter = function() {
    alignParagraph("center");
    return true
  };
  this.alignParagraphRight = function() {
    alignParagraph("right");
    return true
  };
  this.alignParagraphJustified = function() {
    alignParagraph("justify");
    return true
  };
  function modifyParagraphIndent(direction, paragraphStyle) {
    var tabStopDistance = odtDocument.getFormatting().getDefaultTabStopDistance(), paragraphProperties = paragraphStyle["style:paragraph-properties"], indentValue = paragraphProperties && paragraphProperties["fo:margin-left"], indent = indentValue && odfUtils.parseLength(indentValue), newIndent;
    if(indent && indent.unit === tabStopDistance.unit) {
      newIndent = indent.value + direction * tabStopDistance.value + indent.unit
    }else {
      newIndent = direction * tabStopDistance.value + tabStopDistance.unit
    }
    return utils.mergeObjects(paragraphStyle, {"style:paragraph-properties":{"fo:margin-left":newIndent}})
  }
  this.indent = function() {
    applyParagraphDirectStyling(modifyParagraphIndent.bind(null, 1));
    return true
  };
  this.outdent = function() {
    applyParagraphDirectStyling(modifyParagraphIndent.bind(null, -1));
    return true
  };
  this.subscribe = function(eventid, cb) {
    eventNotifier.subscribe(eventid, cb)
  };
  this.unsubscribe = function(eventid, cb) {
    eventNotifier.unsubscribe(eventid, cb)
  };
  this.destroy = function(callback) {
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorAdded, onCursorAdded);
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorRemoved, onCursorRemoved);
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorMoved, onCursorMoved);
    odtDocument.unsubscribe(ops.OdtDocument.signalParagraphStyleModified, onParagraphStyleModified);
    odtDocument.unsubscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
    callback()
  };
  function init() {
    odtDocument.subscribe(ops.OdtDocument.signalCursorAdded, onCursorAdded);
    odtDocument.subscribe(ops.OdtDocument.signalCursorRemoved, onCursorRemoved);
    odtDocument.subscribe(ops.OdtDocument.signalCursorMoved, onCursorMoved);
    odtDocument.subscribe(ops.OdtDocument.signalParagraphStyleModified, onParagraphStyleModified);
    odtDocument.subscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
    updatedCachedValues()
  }
  init()
};
gui.DirectParagraphStyler.paragraphStylingChanged = "paragraphStyling/changed";
(function() {
  return gui.DirectParagraphStyler
})();
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
runtime.loadClass("core.EventNotifier");
runtime.loadClass("core.Utils");
runtime.loadClass("ops.OpApplyDirectStyling");
runtime.loadClass("gui.StyleHelper");
gui.DirectTextStyler = function DirectTextStyler(session, inputMemberId) {
  var self = this, utils = new core.Utils, odtDocument = session.getOdtDocument(), styleHelper = new gui.StyleHelper(odtDocument.getFormatting()), eventNotifier = new core.EventNotifier([gui.DirectTextStyler.textStylingChanged]), directCursorStyleProperties, currentSelectionStyles = [], isBoldValue = false, isItalicValue = false, hasUnderlineValue = false, hasStrikeThroughValue = false, fontSizeValue, fontNameValue;
  function get(obj, keys) {
    var i = 0, key = keys[i];
    while(key && obj) {
      obj = obj[key];
      i += 1;
      key = keys[i]
    }
    return keys.length === i ? obj : undefined
  }
  function getCommonValue(objArray, keys) {
    var value = get(objArray[0], keys);
    return objArray.every(function(obj) {
      return value === get(obj, keys)
    }) ? value : undefined
  }
  function getAppliedStyles() {
    var cursor = odtDocument.getCursor(inputMemberId), range = cursor && cursor.getSelectedRange(), selectionStyles = range && styleHelper.getAppliedStyles(range) || [];
    if(selectionStyles[0] && directCursorStyleProperties) {
      selectionStyles[0] = utils.mergeObjects(selectionStyles[0], (directCursorStyleProperties))
    }
    return selectionStyles
  }
  function updatedCachedValues() {
    var fontSize, diffMap;
    currentSelectionStyles = getAppliedStyles();
    function noteChange(oldValue, newValue, id) {
      if(oldValue !== newValue) {
        if(diffMap === undefined) {
          diffMap = {}
        }
        diffMap[id] = newValue
      }
      return newValue
    }
    isBoldValue = noteChange(isBoldValue, currentSelectionStyles ? styleHelper.isBold(currentSelectionStyles) : false, "isBold");
    isItalicValue = noteChange(isItalicValue, currentSelectionStyles ? styleHelper.isItalic(currentSelectionStyles) : false, "isItalic");
    hasUnderlineValue = noteChange(hasUnderlineValue, currentSelectionStyles ? styleHelper.hasUnderline(currentSelectionStyles) : false, "hasUnderline");
    hasStrikeThroughValue = noteChange(hasStrikeThroughValue, currentSelectionStyles ? styleHelper.hasStrikeThrough(currentSelectionStyles) : false, "hasStrikeThrough");
    fontSize = currentSelectionStyles && getCommonValue(currentSelectionStyles, ["style:text-properties", "fo:font-size"]);
    fontSizeValue = noteChange(fontSizeValue, fontSize && parseFloat(fontSize), "fontSize");
    fontNameValue = noteChange(fontNameValue, currentSelectionStyles && getCommonValue(currentSelectionStyles, ["style:text-properties", "style:font-name"]), "fontName");
    if(diffMap) {
      eventNotifier.emit(gui.DirectTextStyler.textStylingChanged, diffMap)
    }
  }
  function onCursorAdded(cursor) {
    if(cursor.getMemberId() === inputMemberId) {
      updatedCachedValues()
    }
  }
  function onCursorRemoved(memberId) {
    if(memberId === inputMemberId) {
      updatedCachedValues()
    }
  }
  function onCursorMoved(cursor) {
    if(cursor.getMemberId() === inputMemberId) {
      updatedCachedValues()
    }
  }
  function onParagraphStyleModified() {
    updatedCachedValues()
  }
  function onParagraphChanged(args) {
    var cursor = odtDocument.getCursor(inputMemberId);
    if(cursor && odtDocument.getParagraphElement(cursor.getNode()) === args.paragraphElement) {
      updatedCachedValues()
    }
  }
  function toggle(predicate, toggleMethod) {
    var cursor = odtDocument.getCursor(inputMemberId), appliedStyles;
    if(!cursor) {
      return false
    }
    appliedStyles = styleHelper.getAppliedStyles(cursor.getSelectedRange());
    toggleMethod(!predicate(appliedStyles));
    return true
  }
  function formatTextSelection(textProperties) {
    var selection = odtDocument.getCursorSelection(inputMemberId), op, properties = {"style:text-properties":textProperties};
    if(selection.length !== 0) {
      op = new ops.OpApplyDirectStyling;
      op.init({memberid:inputMemberId, position:selection.position, length:selection.length, setProperties:properties});
      session.enqueue([op])
    }else {
      directCursorStyleProperties = utils.mergeObjects(directCursorStyleProperties || {}, properties);
      updatedCachedValues()
    }
  }
  this.formatTextSelection = formatTextSelection;
  function applyTextPropertyToSelection(propertyName, propertyValue) {
    var textProperties = {};
    textProperties[propertyName] = propertyValue;
    formatTextSelection(textProperties)
  }
  this.createCursorStyleOp = function(position, length) {
    var styleOp = null;
    if(directCursorStyleProperties) {
      styleOp = new ops.OpApplyDirectStyling;
      styleOp.init({memberid:inputMemberId, position:position, length:length, setProperties:directCursorStyleProperties});
      directCursorStyleProperties = null;
      updatedCachedValues()
    }
    return styleOp
  };
  function clearCursorStyle(op) {
    var spec = op.spec();
    if(directCursorStyleProperties && spec.memberid === inputMemberId) {
      if(spec.optype !== "SplitParagraph") {
        directCursorStyleProperties = null;
        updatedCachedValues()
      }
    }
  }
  function setBold(checked) {
    var value = checked ? "bold" : "normal";
    applyTextPropertyToSelection("fo:font-weight", value)
  }
  this.setBold = setBold;
  function setItalic(checked) {
    var value = checked ? "italic" : "normal";
    applyTextPropertyToSelection("fo:font-style", value)
  }
  this.setItalic = setItalic;
  function setHasUnderline(checked) {
    var value = checked ? "solid" : "none";
    applyTextPropertyToSelection("style:text-underline-style", value)
  }
  this.setHasUnderline = setHasUnderline;
  function setHasStrikethrough(checked) {
    var value = checked ? "solid" : "none";
    applyTextPropertyToSelection("style:text-line-through-style", value)
  }
  this.setHasStrikethrough = setHasStrikethrough;
  function setFontSize(value) {
    applyTextPropertyToSelection("fo:font-size", value + "pt")
  }
  this.setFontSize = setFontSize;
  function setFontName(value) {
    applyTextPropertyToSelection("style:font-name", value)
  }
  this.setFontName = setFontName;
  this.getAppliedStyles = function() {
    return currentSelectionStyles
  };
  this.toggleBold = toggle.bind(self, styleHelper.isBold, setBold);
  this.toggleItalic = toggle.bind(self, styleHelper.isItalic, setItalic);
  this.toggleUnderline = toggle.bind(self, styleHelper.hasUnderline, setHasUnderline);
  this.toggleStrikethrough = toggle.bind(self, styleHelper.hasStrikeThrough, setHasStrikethrough);
  this.isBold = function() {
    return isBoldValue
  };
  this.isItalic = function() {
    return isItalicValue
  };
  this.hasUnderline = function() {
    return hasUnderlineValue
  };
  this.hasStrikeThrough = function() {
    return hasStrikeThroughValue
  };
  this.fontSize = function() {
    return fontSizeValue
  };
  this.fontName = function() {
    return fontNameValue
  };
  this.subscribe = function(eventid, cb) {
    eventNotifier.subscribe(eventid, cb)
  };
  this.unsubscribe = function(eventid, cb) {
    eventNotifier.unsubscribe(eventid, cb)
  };
  this.destroy = function(callback) {
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorAdded, onCursorAdded);
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorRemoved, onCursorRemoved);
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorMoved, onCursorMoved);
    odtDocument.unsubscribe(ops.OdtDocument.signalParagraphStyleModified, onParagraphStyleModified);
    odtDocument.unsubscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
    odtDocument.unsubscribe(ops.OdtDocument.signalOperationExecuted, clearCursorStyle);
    callback()
  };
  function init() {
    odtDocument.subscribe(ops.OdtDocument.signalCursorAdded, onCursorAdded);
    odtDocument.subscribe(ops.OdtDocument.signalCursorRemoved, onCursorRemoved);
    odtDocument.subscribe(ops.OdtDocument.signalCursorMoved, onCursorMoved);
    odtDocument.subscribe(ops.OdtDocument.signalParagraphStyleModified, onParagraphStyleModified);
    odtDocument.subscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
    odtDocument.subscribe(ops.OdtDocument.signalOperationExecuted, clearCursorStyle);
    updatedCachedValues()
  }
  init()
};
gui.DirectTextStyler.textStylingChanged = "textStyling/changed";
(function() {
  return gui.DirectTextStyler
})();
runtime.loadClass("odf.Namespaces");
runtime.loadClass("odf.ObjectNameGenerator");
gui.ImageManager = function ImageManager(session, inputMemberId, objectNameGenerator) {
  var cmPerPixel = 0.0264583333333334, fileExtensionByMimetype = {"image/gif":".gif", "image/jpeg":".jpg", "image/png":".png"}, textns = odf.Namespaces.textns, odtDocument = session.getOdtDocument(), formatting = odtDocument.getFormatting(), paragraphStyleToPageContentSizeMap = {};
  function createAddGraphicsStyleOp(name) {
    var op = new ops.OpAddStyle;
    op.init({memberid:inputMemberId, styleName:name, styleFamily:"graphic", isAutomaticStyle:false, setProperties:{"style:graphic-properties":{"text:anchor-type":"paragraph", "svg:x":"0cm", "svg:y":"0cm", "style:wrap":"dynamic", "style:number-wrapped-paragraphs":"no-limit", "style:wrap-contour":"false", "style:vertical-pos":"top", "style:vertical-rel":"paragraph", "style:horizontal-pos":"center", "style:horizontal-rel":"paragraph"}}});
    return op
  }
  function createAddFrameStyleOp(styleName, parentStyleName) {
    var op = new ops.OpAddStyle;
    op.init({memberid:inputMemberId, styleName:styleName, styleFamily:"graphic", isAutomaticStyle:true, setProperties:{"style:parent-style-name":parentStyleName, "style:graphic-properties":{"style:vertical-pos":"top", "style:vertical-rel":"baseline", "style:horizontal-pos":"center", "style:horizontal-rel":"paragraph", "fo:background-color":"transparent", "style:background-transparency":"100%", "style:shadow":"none", "style:mirror":"none", "fo:clip":"rect(0cm, 0cm, 0cm, 0cm)", "draw:luminance":"0%", 
    "draw:contrast":"0%", "draw:red":"0%", "draw:green":"0%", "draw:blue":"0%", "draw:gamma":"100%", "draw:color-inversion":"false", "draw:image-opacity":"100%", "draw:color-mode":"standard"}}});
    return op
  }
  function getFileExtension(mimetype) {
    mimetype = mimetype.toLowerCase();
    return fileExtensionByMimetype.hasOwnProperty(mimetype) ? fileExtensionByMimetype[mimetype] : null
  }
  function insertImageInternal(mimetype, content, widthInCm, heightInCm) {
    var graphicsStyleName = "Graphics", stylesElement = odtDocument.getOdfCanvas().odfContainer().rootElement.styles, fileExtension = getFileExtension(mimetype), fileName, graphicsStyleElement, frameStyleName, op, operations = [];
    runtime.assert(fileExtension !== null, "Image type is not supported: " + mimetype);
    fileName = "Pictures/" + objectNameGenerator.generateImageName() + fileExtension;
    op = new ops.OpSetBlob;
    op.init({memberid:inputMemberId, filename:fileName, mimetype:mimetype, content:content});
    operations.push(op);
    graphicsStyleElement = formatting.getStyleElement(graphicsStyleName, "graphic", [stylesElement]);
    if(!graphicsStyleElement) {
      op = createAddGraphicsStyleOp(graphicsStyleName);
      operations.push(op)
    }
    frameStyleName = objectNameGenerator.generateStyleName();
    op = createAddFrameStyleOp(frameStyleName, graphicsStyleName);
    operations.push(op);
    op = new ops.OpInsertImage;
    op.init({memberid:inputMemberId, position:odtDocument.getCursorPosition(inputMemberId), filename:fileName, frameWidth:widthInCm + "cm", frameHeight:heightInCm + "cm", frameStyleName:frameStyleName, frameName:objectNameGenerator.generateFrameName()});
    operations.push(op);
    session.enqueue(operations)
  }
  function trimmedSize(originalSize, pageContentSize) {
    var widthRatio = 1, heightRatio = 1, ratio;
    if(originalSize.width > pageContentSize.width) {
      widthRatio = pageContentSize.width / originalSize.width
    }
    if(originalSize.height > pageContentSize.height) {
      heightRatio = pageContentSize.height / originalSize.height
    }
    ratio = Math.min(widthRatio, heightRatio);
    return{width:originalSize.width * ratio, height:originalSize.height * ratio}
  }
  this.insertImage = function(mimetype, content, widthInPx, heightInPx) {
    var paragraphElement, styleName, pageContentSize, originalSize, newSize;
    runtime.assert(widthInPx > 0 && heightInPx > 0, "Both width and height of the image should be greater than 0px.");
    paragraphElement = odtDocument.getParagraphElement(odtDocument.getCursor(inputMemberId).getNode());
    styleName = paragraphElement.getAttributeNS(textns, "style-name");
    if(!paragraphStyleToPageContentSizeMap.hasOwnProperty(styleName)) {
      paragraphStyleToPageContentSizeMap[styleName] = formatting.getContentSize(styleName, "paragraph")
    }
    pageContentSize = paragraphStyleToPageContentSizeMap[styleName];
    originalSize = {width:widthInPx * cmPerPixel, height:heightInPx * cmPerPixel};
    newSize = trimmedSize(originalSize, pageContentSize);
    insertImageInternal(mimetype, content, newSize.width, newSize.height)
  }
};
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
gui.TextManipulator = function TextManipulator(session, inputMemberId, directStyleOp) {
  var odtDocument = session.getOdtDocument(), FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT;
  function createOpRemoveSelection(selection) {
    var op = new ops.OpRemoveText;
    op.init({memberid:inputMemberId, position:selection.position, length:selection.length});
    return op
  }
  function toForwardSelection(selection) {
    if(selection.length < 0) {
      selection.position += selection.length;
      selection.length = -selection.length
    }
    return selection
  }
  this.enqueueParagraphSplittingOps = function() {
    var selection = toForwardSelection(odtDocument.getCursorSelection(inputMemberId)), op, operations = [];
    if(selection.length > 0) {
      op = createOpRemoveSelection(selection);
      operations.push(op)
    }
    op = new ops.OpSplitParagraph;
    op.init({memberid:inputMemberId, position:selection.position, moveCursor:true});
    operations.push(op);
    session.enqueue(operations);
    return true
  };
  function hasPositionInDirection(cursorNode, forward) {
    var rootConstrainedFilter = new core.PositionFilterChain, iterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootElement(cursorNode)), nextPosition = (forward ? iterator.nextPosition : iterator.previousPosition);
    rootConstrainedFilter.addFilter("BaseFilter", odtDocument.getPositionFilter());
    rootConstrainedFilter.addFilter("RootFilter", odtDocument.createRootFilter(inputMemberId));
    iterator.setUnfilteredPosition(cursorNode, 0);
    while(nextPosition()) {
      if(rootConstrainedFilter.acceptPosition(iterator) === FILTER_ACCEPT) {
        return true
      }
    }
    return false
  }
  this.removeTextByBackspaceKey = function() {
    var cursor = odtDocument.getCursor(inputMemberId), selection = toForwardSelection(odtDocument.getCursorSelection(inputMemberId)), op = null;
    if(selection.length === 0) {
      if(hasPositionInDirection(cursor.getNode(), false)) {
        op = new ops.OpRemoveText;
        op.init({memberid:inputMemberId, position:selection.position - 1, length:1});
        session.enqueue([op])
      }
    }else {
      op = createOpRemoveSelection(selection);
      session.enqueue([op])
    }
    return op !== null
  };
  this.removeTextByDeleteKey = function() {
    var cursor = odtDocument.getCursor(inputMemberId), selection = toForwardSelection(odtDocument.getCursorSelection(inputMemberId)), op = null;
    if(selection.length === 0) {
      if(hasPositionInDirection(cursor.getNode(), true)) {
        op = new ops.OpRemoveText;
        op.init({memberid:inputMemberId, position:selection.position, length:1});
        session.enqueue([op])
      }
    }else {
      op = createOpRemoveSelection(selection);
      session.enqueue([op])
    }
    return op !== null
  };
  this.removeCurrentSelection = function() {
    var selection = toForwardSelection(odtDocument.getCursorSelection(inputMemberId)), op;
    if(selection.length !== 0) {
      op = createOpRemoveSelection(selection);
      session.enqueue([op])
    }
    return true
  };
  function insertText(text) {
    var selection = toForwardSelection(odtDocument.getCursorSelection(inputMemberId)), op, stylingOp, operations = [];
    if(selection.length > 0) {
      op = createOpRemoveSelection(selection);
      operations.push(op)
    }
    op = new ops.OpInsertText;
    op.init({memberid:inputMemberId, position:selection.position, text:text, moveCursor:true});
    operations.push(op);
    if(directStyleOp) {
      stylingOp = directStyleOp(selection.position, text.length);
      if(stylingOp) {
        operations.push(stylingOp)
      }
    }
    session.enqueue(operations)
  }
  this.insertText = insertText
};
(function() {
  return gui.TextManipulator
})();
runtime.loadClass("core.DomUtils");
runtime.loadClass("core.Async");
runtime.loadClass("core.ScheduledTask");
runtime.loadClass("odf.OdfUtils");
runtime.loadClass("odf.ObjectNameGenerator");
runtime.loadClass("ops.OdtCursor");
runtime.loadClass("ops.OpAddCursor");
runtime.loadClass("ops.OpRemoveCursor");
runtime.loadClass("gui.Clipboard");
runtime.loadClass("gui.DirectTextStyler");
runtime.loadClass("gui.DirectParagraphStyler");
runtime.loadClass("gui.KeyboardHandler");
runtime.loadClass("gui.ImageManager");
runtime.loadClass("gui.ImageSelector");
runtime.loadClass("gui.TextManipulator");
runtime.loadClass("gui.AnnotationController");
runtime.loadClass("gui.EventManager");
runtime.loadClass("gui.PlainTextPasteboard");
gui.SessionController = function() {
  var FILTER_ACCEPT = core.PositionFilter.FilterResult.FILTER_ACCEPT;
  gui.SessionController = function SessionController(session, inputMemberId, shadowCursor, args) {
    var window = (runtime.getWindow()), odtDocument = session.getOdtDocument(), async = new core.Async, domUtils = new core.DomUtils, odfUtils = new odf.OdfUtils, clipboard = new gui.Clipboard, keyDownHandler = new gui.KeyboardHandler, keyPressHandler = new gui.KeyboardHandler, keyboardMovementsFilter = new core.PositionFilterChain, baseFilter = odtDocument.getPositionFilter(), clickStartedWithinContainer = false, objectNameGenerator = new odf.ObjectNameGenerator(odtDocument.getOdfCanvas().odfContainer(), 
    inputMemberId), isMouseMoved = false, mouseDownRootFilter = null, undoManager = null, eventManager = new gui.EventManager(odtDocument), annotationController = new gui.AnnotationController(session, inputMemberId), directTextStyler = new gui.DirectTextStyler(session, inputMemberId), directParagraphStyler = args && args.directParagraphStylingEnabled ? new gui.DirectParagraphStyler(session, inputMemberId, objectNameGenerator) : null, createCursorStyleOp = (directTextStyler.createCursorStyleOp), textManipulator = 
    new gui.TextManipulator(session, inputMemberId, createCursorStyleOp), imageManager = new gui.ImageManager(session, inputMemberId, objectNameGenerator), imageSelector = new gui.ImageSelector(odtDocument.getOdfCanvas()), shadowCursorIterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootNode()), drawShadowCursorTask, redrawRegionSelectionTask, pasteHandler = new gui.PlainTextPasteboard(odtDocument, inputMemberId), clickCount = 0;
    runtime.assert(window !== null, "Expected to be run in an environment which has a global window, like a browser.");
    keyboardMovementsFilter.addFilter("BaseFilter", baseFilter);
    keyboardMovementsFilter.addFilter("RootFilter", odtDocument.createRootFilter(inputMemberId));
    function getTarget(e) {
      return e.target || e.srcElement
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
    function createOpMoveCursor(position, length, selectionType) {
      var op = new ops.OpMoveCursor;
      op.init({memberid:inputMemberId, position:position, length:length || 0, selectionType:selectionType});
      return op
    }
    function caretPositionFromPoint(x, y) {
      var doc = odtDocument.getDOM(), c, result = null;
      if(doc.caretRangeFromPoint) {
        c = doc.caretRangeFromPoint(x, y);
        result = {container:c.startContainer, offset:c.startOffset}
      }else {
        if(doc.caretPositionFromPoint) {
          c = doc.caretPositionFromPoint(x, y);
          if(c && c.offsetNode) {
            result = {container:c.offsetNode, offset:c.offset}
          }
        }
      }
      return result
    }
    function expandToWordBoundaries(range) {
      var alphaNumeric = /[A-Za-z0-9]/, iterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootNode()), currentNode, c;
      iterator.setUnfilteredPosition((range.startContainer), range.startOffset);
      while(iterator.previousPosition()) {
        currentNode = iterator.getCurrentNode();
        if(currentNode.nodeType === Node.TEXT_NODE) {
          c = currentNode.data[iterator.unfilteredDomOffset()];
          if(!alphaNumeric.test(c)) {
            break
          }
        }else {
          if(!odfUtils.isTextSpan(currentNode)) {
            break
          }
        }
        range.setStart(iterator.container(), iterator.unfilteredDomOffset())
      }
      iterator.setUnfilteredPosition((range.endContainer), range.endOffset);
      do {
        currentNode = iterator.getCurrentNode();
        if(currentNode.nodeType === Node.TEXT_NODE) {
          c = currentNode.data[iterator.unfilteredDomOffset()];
          if(!alphaNumeric.test(c)) {
            break
          }
        }else {
          if(!odfUtils.isTextSpan(currentNode)) {
            break
          }
        }
      }while(iterator.nextPosition());
      range.setEnd(iterator.container(), iterator.unfilteredDomOffset())
    }
    function expandToParagraphBoundaries(range) {
      var startParagraph = odtDocument.getParagraphElement(range.startContainer), endParagraph = odtDocument.getParagraphElement(range.endContainer);
      if(startParagraph) {
        range.setStart(startParagraph, 0)
      }
      if(endParagraph) {
        if(odfUtils.isParagraph(range.endContainer) && range.endOffset === 0) {
          range.setEndBefore(endParagraph)
        }else {
          range.setEnd(endParagraph, endParagraph.childNodes.length)
        }
      }
    }
    function selectImage(frameNode) {
      var stepsToAnchor = odtDocument.getDistanceFromCursor(inputMemberId, frameNode, 0), stepsToFocus = stepsToAnchor !== null ? stepsToAnchor + 1 : null, oldPosition, op;
      if(stepsToFocus || stepsToAnchor) {
        oldPosition = odtDocument.getCursorPosition(inputMemberId);
        op = createOpMoveCursor(oldPosition + stepsToAnchor, stepsToFocus - stepsToAnchor, ops.OdtCursor.RegionSelection);
        session.enqueue([op])
      }
      eventManager.focus()
    }
    function selectionToRange(selection) {
      var hasForwardSelection = domUtils.comparePoints((selection.anchorNode), selection.anchorOffset, (selection.focusNode), selection.focusOffset) >= 0, range = selection.focusNode.ownerDocument.createRange();
      if(hasForwardSelection) {
        range.setStart(selection.anchorNode, selection.anchorOffset);
        range.setEnd(selection.focusNode, selection.focusOffset)
      }else {
        range.setStart(selection.focusNode, selection.focusOffset);
        range.setEnd(selection.anchorNode, selection.anchorOffset)
      }
      return{range:range, hasForwardSelection:hasForwardSelection}
    }
    function rangeToSelection(range, hasForwardSelection) {
      if(hasForwardSelection) {
        return{anchorNode:(range.startContainer), anchorOffset:range.startOffset, focusNode:(range.endContainer), focusOffset:range.endOffset}
      }
      return{anchorNode:(range.endContainer), anchorOffset:range.endOffset, focusNode:(range.startContainer), focusOffset:range.startOffset}
    }
    function constrain(lookup) {
      return function(originalNode) {
        var originalContainer = lookup(originalNode);
        return function(step, node) {
          return lookup(node) === originalContainer
        }
      }
    }
    function selectRange(range, hasForwardSelection, clickCount) {
      var canvasElement = odtDocument.getOdfCanvas().getElement(), validSelection, startInsideCanvas, endInsideCanvas, existingSelection, newSelection, op;
      startInsideCanvas = domUtils.containsNode(canvasElement, range.startContainer);
      endInsideCanvas = domUtils.containsNode(canvasElement, range.endContainer);
      if(!startInsideCanvas && !endInsideCanvas) {
        return
      }
      if(startInsideCanvas && endInsideCanvas) {
        if(clickCount === 2) {
          expandToWordBoundaries(range)
        }else {
          if(clickCount >= 3) {
            expandToParagraphBoundaries(range)
          }
        }
      }
      validSelection = rangeToSelection(range, hasForwardSelection);
      newSelection = odtDocument.convertDomToCursorRange(validSelection, constrain(odfUtils.getParagraphElement));
      existingSelection = odtDocument.getCursorSelection(inputMemberId);
      if(newSelection.position !== existingSelection.position || newSelection.length !== existingSelection.length) {
        op = createOpMoveCursor(newSelection.position, newSelection.length, ops.OdtCursor.RangeSelection);
        session.enqueue([op])
      }
    }
    this.selectRange = selectRange;
    function extendCursorByAdjustment(lengthAdjust) {
      var selection = odtDocument.getCursorSelection(inputMemberId), stepCounter = odtDocument.getCursor(inputMemberId).getStepCounter(), newLength;
      if(lengthAdjust !== 0) {
        lengthAdjust = lengthAdjust > 0 ? stepCounter.convertForwardStepsBetweenFilters(lengthAdjust, keyboardMovementsFilter, baseFilter) : -stepCounter.convertBackwardStepsBetweenFilters(-lengthAdjust, keyboardMovementsFilter, baseFilter);
        newLength = selection.length + lengthAdjust;
        session.enqueue([createOpMoveCursor(selection.position, newLength)])
      }
    }
    function moveCursorByAdjustment(positionAdjust) {
      var position = odtDocument.getCursorPosition(inputMemberId), stepCounter = odtDocument.getCursor(inputMemberId).getStepCounter();
      if(positionAdjust !== 0) {
        positionAdjust = positionAdjust > 0 ? stepCounter.convertForwardStepsBetweenFilters(positionAdjust, keyboardMovementsFilter, baseFilter) : -stepCounter.convertBackwardStepsBetweenFilters(-positionAdjust, keyboardMovementsFilter, baseFilter);
        position = position + positionAdjust;
        session.enqueue([createOpMoveCursor(position, 0)])
      }
    }
    function moveCursorToLeft() {
      moveCursorByAdjustment(-1);
      return true
    }
    this.moveCursorToLeft = moveCursorToLeft;
    function moveCursorToRight() {
      moveCursorByAdjustment(1);
      return true
    }
    function extendSelectionToLeft() {
      extendCursorByAdjustment(-1);
      return true
    }
    function extendSelectionToRight() {
      extendCursorByAdjustment(1);
      return true
    }
    function moveCursorByLine(direction, extend) {
      var paragraphNode = odtDocument.getParagraphElement(odtDocument.getCursor(inputMemberId).getNode()), steps;
      runtime.assert(Boolean(paragraphNode), "SessionController: Cursor outside paragraph");
      steps = odtDocument.getCursor(inputMemberId).getStepCounter().countLinesSteps(direction, keyboardMovementsFilter);
      if(extend) {
        extendCursorByAdjustment(steps)
      }else {
        moveCursorByAdjustment(steps)
      }
    }
    function moveCursorUp() {
      moveCursorByLine(-1, false);
      return true
    }
    function moveCursorDown() {
      moveCursorByLine(1, false);
      return true
    }
    function extendSelectionUp() {
      moveCursorByLine(-1, true);
      return true
    }
    function extendSelectionDown() {
      moveCursorByLine(1, true);
      return true
    }
    function moveCursorToLineBoundary(direction, extend) {
      var steps = odtDocument.getCursor(inputMemberId).getStepCounter().countStepsToLineBoundary(direction, keyboardMovementsFilter);
      if(extend) {
        extendCursorByAdjustment(steps)
      }else {
        moveCursorByAdjustment(steps)
      }
    }
    function moveCursorToLineStart() {
      moveCursorToLineBoundary(-1, false);
      return true
    }
    function moveCursorToLineEnd() {
      moveCursorToLineBoundary(1, false);
      return true
    }
    function extendSelectionToLineStart() {
      moveCursorToLineBoundary(-1, true);
      return true
    }
    function extendSelectionToLineEnd() {
      moveCursorToLineBoundary(1, true);
      return true
    }
    function extendSelectionToParagraphStart() {
      var paragraphNode = (odtDocument.getParagraphElement(odtDocument.getCursor(inputMemberId).getNode())), iterator, node, steps;
      runtime.assert(Boolean(paragraphNode), "SessionController: Cursor outside paragraph");
      steps = odtDocument.getDistanceFromCursor(inputMemberId, paragraphNode, 0);
      iterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootNode());
      iterator.setUnfilteredPosition(paragraphNode, 0);
      while(steps === 0 && iterator.previousPosition()) {
        node = iterator.getCurrentNode();
        if(odfUtils.isParagraph(node)) {
          steps = odtDocument.getDistanceFromCursor(inputMemberId, node, 0)
        }
      }
      extendCursorByAdjustment(steps);
      return true
    }
    function extendSelectionToParagraphEnd() {
      var paragraphNode = (odtDocument.getParagraphElement(odtDocument.getCursor(inputMemberId).getNode())), iterator, node, steps;
      runtime.assert(Boolean(paragraphNode), "SessionController: Cursor outside paragraph");
      iterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootNode());
      iterator.moveToEndOfNode(paragraphNode);
      steps = odtDocument.getDistanceFromCursor(inputMemberId, iterator.container(), iterator.unfilteredDomOffset());
      while(steps === 0 && iterator.nextPosition()) {
        node = iterator.getCurrentNode();
        if(odfUtils.isParagraph(node)) {
          iterator.moveToEndOfNode(node);
          steps = odtDocument.getDistanceFromCursor(inputMemberId, iterator.container(), iterator.unfilteredDomOffset())
        }
      }
      extendCursorByAdjustment(steps);
      return true
    }
    function moveCursorToDocumentBoundary(direction, extend) {
      var iterator = gui.SelectionMover.createPositionIterator(odtDocument.getRootNode()), steps;
      if(direction > 0) {
        iterator.moveToEnd()
      }
      steps = odtDocument.getDistanceFromCursor(inputMemberId, iterator.container(), iterator.unfilteredDomOffset());
      if(extend) {
        extendCursorByAdjustment(steps)
      }else {
        moveCursorByAdjustment(steps)
      }
    }
    this.moveCursorToDocumentBoundary = moveCursorToDocumentBoundary;
    function moveCursorToDocumentStart() {
      moveCursorToDocumentBoundary(-1, false);
      return true
    }
    function moveCursorToDocumentEnd() {
      moveCursorToDocumentBoundary(1, false);
      return true
    }
    function extendSelectionToDocumentStart() {
      moveCursorToDocumentBoundary(-1, true);
      return true
    }
    function extendSelectionToDocumentEnd() {
      moveCursorToDocumentBoundary(1, true);
      return true
    }
    function extendSelectionToEntireDocument() {
      var rootNode = odtDocument.getRootNode(), lastWalkableStep = odtDocument.convertDomPointToCursorStep(rootNode, rootNode.childNodes.length);
      session.enqueue([createOpMoveCursor(0, lastWalkableStep)]);
      return true
    }
    this.extendSelectionToEntireDocument = extendSelectionToEntireDocument;
    function redrawRegionSelection() {
      var cursor = odtDocument.getCursor(inputMemberId), imageElement;
      if(cursor && cursor.getSelectionType() === ops.OdtCursor.RegionSelection) {
        imageElement = odfUtils.getImageElements(cursor.getSelectedRange())[0];
        if(imageElement) {
          imageSelector.select((imageElement.parentNode));
          return
        }
      }
      imageSelector.clearSelection()
    }
    function stringFromKeyPress(event) {
      if(event.which === null || event.which === undefined) {
        return String.fromCharCode(event.keyCode)
      }
      if(event.which !== 0 && event.charCode !== 0) {
        return String.fromCharCode(event.which)
      }
      return null
    }
    function handleCut(e) {
      var cursor = odtDocument.getCursor(inputMemberId), selectedRange = cursor.getSelectedRange();
      if(selectedRange.collapsed) {
        e.preventDefault();
        return
      }
      if(clipboard.setDataFromRange(e, selectedRange)) {
        textManipulator.removeCurrentSelection()
      }else {
        runtime.log("Cut operation failed")
      }
    }
    function handleBeforeCut() {
      var cursor = odtDocument.getCursor(inputMemberId), selectedRange = cursor.getSelectedRange();
      return selectedRange.collapsed !== false
    }
    function handleCopy(e) {
      var cursor = odtDocument.getCursor(inputMemberId), selectedRange = cursor.getSelectedRange();
      if(selectedRange.collapsed) {
        e.preventDefault();
        return
      }
      if(!clipboard.setDataFromRange(e, selectedRange)) {
        runtime.log("Copy operation failed")
      }
    }
    function handlePaste(e) {
      var plainText;
      if(window.clipboardData && window.clipboardData.getData) {
        plainText = window.clipboardData.getData("Text")
      }else {
        if(e.clipboardData && e.clipboardData.getData) {
          plainText = e.clipboardData.getData("text/plain")
        }
      }
      if(plainText) {
        textManipulator.removeCurrentSelection();
        session.enqueue(pasteHandler.createPasteOps(plainText))
      }
      cancelEvent(e)
    }
    function handleBeforePaste() {
      return false
    }
    function updateUndoStack(op) {
      if(undoManager) {
        undoManager.onOperationExecuted(op)
      }
    }
    function forwardUndoStackChange(e) {
      odtDocument.emit(ops.OdtDocument.signalUndoStackChanged, e)
    }
    function undo() {
      if(undoManager) {
        undoManager.moveBackward(1);
        redrawRegionSelectionTask.trigger();
        return true
      }
      return false
    }
    function redo() {
      if(undoManager) {
        undoManager.moveForward(1);
        redrawRegionSelectionTask.trigger();
        return true
      }
      return false
    }
    function updateShadowCursor() {
      var selection = window.getSelection(), selectionRange = selection.rangeCount > 0 && selectionToRange(selection);
      if(clickStartedWithinContainer && selectionRange) {
        isMouseMoved = true;
        imageSelector.clearSelection();
        shadowCursorIterator.setUnfilteredPosition((selection.focusNode), selection.focusOffset);
        if(mouseDownRootFilter.acceptPosition(shadowCursorIterator) === FILTER_ACCEPT) {
          if(clickCount === 2) {
            expandToWordBoundaries(selectionRange.range)
          }else {
            if(clickCount >= 3) {
              expandToParagraphBoundaries(selectionRange.range)
            }
          }
          shadowCursor.setSelectedRange(selectionRange.range, selectionRange.hasForwardSelection);
          odtDocument.emit(ops.OdtDocument.signalCursorMoved, shadowCursor)
        }
      }
    }
    function synchronizeWindowSelection(cursor) {
      var selection = window.getSelection(), range = cursor.getSelectedRange();
      if(selection.extend) {
        if(cursor.hasForwardSelection()) {
          selection.collapse(range.startContainer, range.startOffset);
          selection.extend(range.endContainer, range.endOffset)
        }else {
          selection.collapse(range.endContainer, range.endOffset);
          selection.extend(range.startContainer, range.startOffset)
        }
      }else {
        selection.removeAllRanges();
        selection.addRange(range.cloneRange());
        (odtDocument.getOdfCanvas().getElement()).setActive()
      }
    }
    function handleMouseDown(e) {
      var target = getTarget(e), cursor = odtDocument.getCursor(inputMemberId);
      clickStartedWithinContainer = target && domUtils.containsNode(odtDocument.getOdfCanvas().getElement(), target);
      if(clickStartedWithinContainer) {
        isMouseMoved = false;
        mouseDownRootFilter = odtDocument.createRootFilter(target);
        clickCount = e.detail;
        if(cursor && e.shiftKey) {
          window.getSelection().collapse(cursor.getAnchorNode(), 0)
        }else {
          synchronizeWindowSelection(cursor)
        }
        if(clickCount > 1) {
          updateShadowCursor()
        }
      }
    }
    function mutableSelection(selection) {
      if(selection) {
        return{anchorNode:selection.anchorNode, anchorOffset:selection.anchorOffset, focusNode:selection.focusNode, focusOffset:selection.focusOffset}
      }
      return null
    }
    function handleMouseClickEvent(event) {
      var target = getTarget(event), eventDetails = {detail:event.detail, clientX:event.clientX, clientY:event.clientY, target:target};
      drawShadowCursorTask.processRequests();
      if(odfUtils.isImage(target) && odfUtils.isCharacterFrame(target.parentNode)) {
        selectImage(target.parentNode);
        eventManager.focus()
      }else {
        if(clickStartedWithinContainer && !imageSelector.isSelectorElement(target)) {
          if(isMouseMoved) {
            selectRange(shadowCursor.getSelectedRange(), shadowCursor.hasForwardSelection(), event.detail);
            eventManager.focus()
          }else {
            runtime.setTimeout(function() {
              var selection = mutableSelection(window.getSelection()), selectionRange, caretPos;
              if(!selection.anchorNode && !selection.focusNode) {
                caretPos = caretPositionFromPoint(eventDetails.clientX, eventDetails.clientY);
                if(caretPos) {
                  selection.anchorNode = (caretPos.container);
                  selection.anchorOffset = caretPos.offset;
                  selection.focusNode = selection.anchorNode;
                  selection.focusOffset = selection.anchorOffset
                }
              }
              if(selection.anchorNode && selection.focusNode) {
                selectionRange = selectionToRange(selection);
                selectRange(selectionRange.range, selectionRange.hasForwardSelection, eventDetails.detail)
              }
              eventManager.focus()
            }, 0)
          }
        }
      }
      clickCount = 0;
      clickStartedWithinContainer = false;
      isMouseMoved = false
    }
    function handleDragEnd() {
      if(clickStartedWithinContainer) {
        eventManager.focus()
      }
      clickCount = 0;
      clickStartedWithinContainer = false;
      isMouseMoved = false
    }
    function handleContextMenu(e) {
      handleMouseClickEvent(e)
    }
    function handleMouseUp(event) {
      var target = getTarget(event), annotationNode = null;
      if(target.className === "annotationRemoveButton") {
        annotationNode = domUtils.getElementsByTagNameNS(target.parentNode, odf.Namespaces.officens, "annotation")[0];
        annotationController.removeAnnotation(annotationNode)
      }else {
        handleMouseClickEvent(event)
      }
    }
    this.startEditing = function() {
      var op;
      odtDocument.getOdfCanvas().getElement().classList.add("virtualSelections");
      eventManager.subscribe("keydown", keyDownHandler.handleEvent);
      eventManager.subscribe("keypress", keyPressHandler.handleEvent);
      eventManager.subscribe("keyup", dummyHandler);
      eventManager.subscribe("beforecut", handleBeforeCut);
      eventManager.subscribe("cut", handleCut);
      eventManager.subscribe("copy", handleCopy);
      eventManager.subscribe("beforepaste", handleBeforePaste);
      eventManager.subscribe("paste", handlePaste);
      eventManager.subscribe("mousedown", handleMouseDown);
      eventManager.subscribe("mousemove", drawShadowCursorTask.trigger);
      eventManager.subscribe("mouseup", handleMouseUp);
      eventManager.subscribe("contextmenu", handleContextMenu);
      eventManager.subscribe("dragend", handleDragEnd);
      odtDocument.subscribe(ops.OdtDocument.signalOperationExecuted, redrawRegionSelectionTask.trigger);
      odtDocument.subscribe(ops.OdtDocument.signalOperationExecuted, updateUndoStack);
      op = new ops.OpAddCursor;
      op.init({memberid:inputMemberId});
      session.enqueue([op]);
      if(undoManager) {
        undoManager.saveInitialState()
      }
    };
    this.endEditing = function() {
      var op;
      op = new ops.OpRemoveCursor;
      op.init({memberid:inputMemberId});
      session.enqueue([op]);
      if(undoManager) {
        undoManager.resetInitialState()
      }
      odtDocument.unsubscribe(ops.OdtDocument.signalOperationExecuted, updateUndoStack);
      odtDocument.unsubscribe(ops.OdtDocument.signalOperationExecuted, redrawRegionSelectionTask.trigger);
      eventManager.unsubscribe("keydown", keyDownHandler.handleEvent);
      eventManager.unsubscribe("keypress", keyPressHandler.handleEvent);
      eventManager.unsubscribe("keyup", dummyHandler);
      eventManager.unsubscribe("cut", handleCut);
      eventManager.unsubscribe("beforecut", handleBeforeCut);
      eventManager.unsubscribe("copy", handleCopy);
      eventManager.unsubscribe("paste", handlePaste);
      eventManager.unsubscribe("beforepaste", handleBeforePaste);
      eventManager.unsubscribe("mousemove", drawShadowCursorTask.trigger);
      eventManager.unsubscribe("mousedown", handleMouseDown);
      eventManager.unsubscribe("mouseup", handleMouseUp);
      eventManager.unsubscribe("contextmenu", handleContextMenu);
      eventManager.unsubscribe("dragend", handleDragEnd);
      odtDocument.getOdfCanvas().getElement().classList.remove("virtualSelections")
    };
    this.getInputMemberId = function() {
      return inputMemberId
    };
    this.getSession = function() {
      return session
    };
    this.setUndoManager = function(manager) {
      if(undoManager) {
        undoManager.unsubscribe(gui.UndoManager.signalUndoStackChanged, forwardUndoStackChange)
      }
      undoManager = manager;
      if(undoManager) {
        undoManager.setOdtDocument(odtDocument);
        undoManager.setPlaybackFunction(function(op) {
          op.execute(odtDocument)
        });
        undoManager.subscribe(gui.UndoManager.signalUndoStackChanged, forwardUndoStackChange)
      }
    };
    this.getUndoManager = function() {
      return undoManager
    };
    this.getAnnotationController = function() {
      return annotationController
    };
    this.getDirectTextStyler = function() {
      return directTextStyler
    };
    this.getDirectParagraphStyler = function() {
      return directParagraphStyler
    };
    this.getImageManager = function() {
      return imageManager
    };
    this.getTextManipulator = function() {
      return textManipulator
    };
    this.getEventManager = function() {
      return eventManager
    };
    this.getKeyboardHandlers = function() {
      return{keydown:keyDownHandler, keypress:keyPressHandler}
    };
    this.destroy = function(callback) {
      var destroyCallbacks = [drawShadowCursorTask.destroy, directTextStyler.destroy];
      if(directParagraphStyler) {
        destroyCallbacks.push(directParagraphStyler.destroy)
      }
      async.destroyAll(destroyCallbacks, callback)
    };
    function returnTrue(fn) {
      return function() {
        fn();
        return true
      }
    }
    function rangeSelectionOnly(fn) {
      return function(e) {
        var selectionType = odtDocument.getCursor(inputMemberId).getSelectionType();
        if(selectionType === ops.OdtCursor.RangeSelection) {
          return fn(e)
        }
        return true
      }
    }
    function init() {
      var isMacOS = window.navigator.appVersion.toLowerCase().indexOf("mac") !== -1, modifier = gui.KeyboardHandler.Modifier, keyCode = gui.KeyboardHandler.KeyCode;
      drawShadowCursorTask = new core.ScheduledTask(updateShadowCursor, 0);
      redrawRegionSelectionTask = new core.ScheduledTask(redrawRegionSelection, 0);
      keyDownHandler.bind(keyCode.Tab, modifier.None, rangeSelectionOnly(function() {
        textManipulator.insertText("\t");
        return true
      }));
      keyDownHandler.bind(keyCode.Left, modifier.None, rangeSelectionOnly(moveCursorToLeft));
      keyDownHandler.bind(keyCode.Right, modifier.None, rangeSelectionOnly(moveCursorToRight));
      keyDownHandler.bind(keyCode.Up, modifier.None, rangeSelectionOnly(moveCursorUp));
      keyDownHandler.bind(keyCode.Down, modifier.None, rangeSelectionOnly(moveCursorDown));
      keyDownHandler.bind(keyCode.Backspace, modifier.None, returnTrue(textManipulator.removeTextByBackspaceKey));
      keyDownHandler.bind(keyCode.Delete, modifier.None, textManipulator.removeTextByDeleteKey);
      keyDownHandler.bind(keyCode.Left, modifier.Shift, rangeSelectionOnly(extendSelectionToLeft));
      keyDownHandler.bind(keyCode.Right, modifier.Shift, rangeSelectionOnly(extendSelectionToRight));
      keyDownHandler.bind(keyCode.Up, modifier.Shift, rangeSelectionOnly(extendSelectionUp));
      keyDownHandler.bind(keyCode.Down, modifier.Shift, rangeSelectionOnly(extendSelectionDown));
      keyDownHandler.bind(keyCode.Home, modifier.None, rangeSelectionOnly(moveCursorToLineStart));
      keyDownHandler.bind(keyCode.End, modifier.None, rangeSelectionOnly(moveCursorToLineEnd));
      keyDownHandler.bind(keyCode.Home, modifier.Ctrl, rangeSelectionOnly(moveCursorToDocumentStart));
      keyDownHandler.bind(keyCode.End, modifier.Ctrl, rangeSelectionOnly(moveCursorToDocumentEnd));
      keyDownHandler.bind(keyCode.Home, modifier.Shift, rangeSelectionOnly(extendSelectionToLineStart));
      keyDownHandler.bind(keyCode.End, modifier.Shift, rangeSelectionOnly(extendSelectionToLineEnd));
      keyDownHandler.bind(keyCode.Up, modifier.CtrlShift, rangeSelectionOnly(extendSelectionToParagraphStart));
      keyDownHandler.bind(keyCode.Down, modifier.CtrlShift, rangeSelectionOnly(extendSelectionToParagraphEnd));
      keyDownHandler.bind(keyCode.Home, modifier.CtrlShift, rangeSelectionOnly(extendSelectionToDocumentStart));
      keyDownHandler.bind(keyCode.End, modifier.CtrlShift, rangeSelectionOnly(extendSelectionToDocumentEnd));
      if(isMacOS) {
        keyDownHandler.bind(keyCode.Clear, modifier.None, textManipulator.removeCurrentSelection);
        keyDownHandler.bind(keyCode.Left, modifier.Meta, rangeSelectionOnly(moveCursorToLineStart));
        keyDownHandler.bind(keyCode.Right, modifier.Meta, rangeSelectionOnly(moveCursorToLineEnd));
        keyDownHandler.bind(keyCode.Home, modifier.Meta, rangeSelectionOnly(moveCursorToDocumentStart));
        keyDownHandler.bind(keyCode.End, modifier.Meta, rangeSelectionOnly(moveCursorToDocumentEnd));
        keyDownHandler.bind(keyCode.Left, modifier.MetaShift, rangeSelectionOnly(extendSelectionToLineStart));
        keyDownHandler.bind(keyCode.Right, modifier.MetaShift, rangeSelectionOnly(extendSelectionToLineEnd));
        keyDownHandler.bind(keyCode.Up, modifier.AltShift, rangeSelectionOnly(extendSelectionToParagraphStart));
        keyDownHandler.bind(keyCode.Down, modifier.AltShift, rangeSelectionOnly(extendSelectionToParagraphEnd));
        keyDownHandler.bind(keyCode.Up, modifier.MetaShift, rangeSelectionOnly(extendSelectionToDocumentStart));
        keyDownHandler.bind(keyCode.Down, modifier.MetaShift, rangeSelectionOnly(extendSelectionToDocumentEnd));
        keyDownHandler.bind(keyCode.A, modifier.Meta, rangeSelectionOnly(extendSelectionToEntireDocument));
        keyDownHandler.bind(keyCode.B, modifier.Meta, rangeSelectionOnly(directTextStyler.toggleBold));
        keyDownHandler.bind(keyCode.I, modifier.Meta, rangeSelectionOnly(directTextStyler.toggleItalic));
        keyDownHandler.bind(keyCode.U, modifier.Meta, rangeSelectionOnly(directTextStyler.toggleUnderline));
        if(directParagraphStyler) {
          keyDownHandler.bind(keyCode.L, modifier.MetaShift, rangeSelectionOnly(directParagraphStyler.alignParagraphLeft));
          keyDownHandler.bind(keyCode.E, modifier.MetaShift, rangeSelectionOnly(directParagraphStyler.alignParagraphCenter));
          keyDownHandler.bind(keyCode.R, modifier.MetaShift, rangeSelectionOnly(directParagraphStyler.alignParagraphRight));
          keyDownHandler.bind(keyCode.J, modifier.MetaShift, rangeSelectionOnly(directParagraphStyler.alignParagraphJustified))
        }
        if(annotationController) {
          keyDownHandler.bind(keyCode.C, modifier.MetaShift, annotationController.addAnnotation)
        }
        keyDownHandler.bind(keyCode.Z, modifier.Meta, undo);
        keyDownHandler.bind(keyCode.Z, modifier.MetaShift, redo)
      }else {
        keyDownHandler.bind(keyCode.A, modifier.Ctrl, rangeSelectionOnly(extendSelectionToEntireDocument));
        keyDownHandler.bind(keyCode.B, modifier.Ctrl, rangeSelectionOnly(directTextStyler.toggleBold));
        keyDownHandler.bind(keyCode.I, modifier.Ctrl, rangeSelectionOnly(directTextStyler.toggleItalic));
        keyDownHandler.bind(keyCode.U, modifier.Ctrl, rangeSelectionOnly(directTextStyler.toggleUnderline));
        if(directParagraphStyler) {
          keyDownHandler.bind(keyCode.L, modifier.CtrlShift, rangeSelectionOnly(directParagraphStyler.alignParagraphLeft));
          keyDownHandler.bind(keyCode.E, modifier.CtrlShift, rangeSelectionOnly(directParagraphStyler.alignParagraphCenter));
          keyDownHandler.bind(keyCode.R, modifier.CtrlShift, rangeSelectionOnly(directParagraphStyler.alignParagraphRight));
          keyDownHandler.bind(keyCode.J, modifier.CtrlShift, rangeSelectionOnly(directParagraphStyler.alignParagraphJustified))
        }
        if(annotationController) {
          keyDownHandler.bind(keyCode.C, modifier.CtrlAlt, annotationController.addAnnotation)
        }
        keyDownHandler.bind(keyCode.Z, modifier.Ctrl, undo);
        keyDownHandler.bind(keyCode.Z, modifier.CtrlShift, redo)
      }
      keyPressHandler.setDefault(rangeSelectionOnly(function(e) {
        var text = stringFromKeyPress(e);
        if(text && !(e.altKey || (e.ctrlKey || e.metaKey))) {
          textManipulator.insertText(text);
          return true
        }
        return false
      }));
      keyPressHandler.bind(keyCode.Enter, modifier.None, rangeSelectionOnly(textManipulator.enqueueParagraphSplittingOps))
    }
    init()
  };
  return gui.SessionController
}();
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
gui.CaretManager = function CaretManager(sessionController) {
  var carets = {}, window = runtime.getWindow(), scrollIntoViewScheduled = false;
  function getCaret(memberId) {
    return carets.hasOwnProperty(memberId) ? carets[memberId] : null
  }
  function getCarets() {
    return Object.keys(carets).map(function(memberid) {
      return carets[memberid]
    })
  }
  function getCanvasElement() {
    return sessionController.getSession().getOdtDocument().getOdfCanvas().getElement()
  }
  function removeCaret(memberId) {
    if(memberId === sessionController.getInputMemberId()) {
      getCanvasElement().removeAttribute("tabindex")
    }
    delete carets[memberId]
  }
  function refreshLocalCaretBlinking(cursor) {
    var caret, memberId = cursor.getMemberId();
    if(memberId === sessionController.getInputMemberId()) {
      caret = getCaret(memberId);
      if(caret) {
        caret.refreshCursorBlinking()
      }
    }
  }
  function executeEnsureCaretVisible() {
    var caret = getCaret(sessionController.getInputMemberId());
    scrollIntoViewScheduled = false;
    if(caret) {
      caret.ensureVisible()
    }
  }
  function scheduleCaretVisibilityCheck() {
    var caret = getCaret(sessionController.getInputMemberId());
    if(caret) {
      caret.handleUpdate();
      if(!scrollIntoViewScheduled) {
        scrollIntoViewScheduled = true;
        runtime.setTimeout(executeEnsureCaretVisible, 50)
      }
    }
  }
  function ensureLocalCaretVisible(info) {
    if(info.memberId === sessionController.getInputMemberId()) {
      scheduleCaretVisibilityCheck()
    }
  }
  function focusLocalCaret() {
    var caret = getCaret(sessionController.getInputMemberId());
    if(caret) {
      caret.setFocus()
    }
  }
  function blurLocalCaret() {
    var caret = getCaret(sessionController.getInputMemberId());
    if(caret) {
      caret.removeFocus()
    }
  }
  function showLocalCaret() {
    var caret = getCaret(sessionController.getInputMemberId());
    if(caret) {
      caret.show()
    }
  }
  function hideLocalCaret() {
    var caret = getCaret(sessionController.getInputMemberId());
    if(caret) {
      caret.hide()
    }
  }
  this.registerCursor = function(cursor, caretAvatarInitiallyVisible, blinkOnRangeSelect) {
    var memberid = cursor.getMemberId(), caret = new gui.Caret(cursor, caretAvatarInitiallyVisible, blinkOnRangeSelect);
    carets[memberid] = caret;
    if(memberid === sessionController.getInputMemberId()) {
      runtime.log("Starting to track input on new cursor of " + memberid);
      cursor.handleUpdate = scheduleCaretVisibilityCheck;
      getCanvasElement().setAttribute("tabindex", -1);
      sessionController.getEventManager().focus()
    }else {
      cursor.handleUpdate = caret.handleUpdate
    }
    return caret
  };
  this.getCaret = getCaret;
  this.getCarets = getCarets;
  this.destroy = function(callback) {
    var odtDocument = sessionController.getSession().getOdtDocument(), eventManager = sessionController.getEventManager(), caretArray = getCarets();
    odtDocument.unsubscribe(ops.OdtDocument.signalParagraphChanged, ensureLocalCaretVisible);
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorMoved, refreshLocalCaretBlinking);
    odtDocument.unsubscribe(ops.OdtDocument.signalCursorRemoved, removeCaret);
    eventManager.unsubscribe("focus", focusLocalCaret);
    eventManager.unsubscribe("blur", blurLocalCaret);
    window.removeEventListener("focus", showLocalCaret, false);
    window.removeEventListener("blur", hideLocalCaret, false);
    (function destroyCaret(i, err) {
      if(err) {
        callback(err)
      }else {
        if(i < caretArray.length) {
          caretArray[i].destroy(function(err) {
            destroyCaret(i + 1, err)
          })
        }else {
          callback()
        }
      }
    })(0, undefined);
    carets = {}
  };
  function init() {
    var odtDocument = sessionController.getSession().getOdtDocument(), eventManager = sessionController.getEventManager();
    odtDocument.subscribe(ops.OdtDocument.signalParagraphChanged, ensureLocalCaretVisible);
    odtDocument.subscribe(ops.OdtDocument.signalCursorMoved, refreshLocalCaretBlinking);
    odtDocument.subscribe(ops.OdtDocument.signalCursorRemoved, removeCaret);
    eventManager.subscribe("focus", focusLocalCaret);
    eventManager.subscribe("blur", blurLocalCaret);
    window.addEventListener("focus", showLocalCaret, false);
    window.addEventListener("blur", hideLocalCaret, false)
  }
  init()
};
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
runtime.loadClass("ops.EditInfo");
runtime.loadClass("gui.EditInfoMarker");
gui.SessionViewOptions = function() {
  this.editInfoMarkersInitiallyVisible = true;
  this.caretAvatarsInitiallyVisible = true;
  this.caretBlinksOnRangeSelect = true
};
gui.SessionView = function() {
  function configOption(userValue, defaultValue) {
    return userValue !== undefined ? Boolean(userValue) : defaultValue
  }
  function SessionView(viewOptions, localMemberId, session, caretManager, selectionViewManager) {
    var avatarInfoStyles, editInfons = "urn:webodf:names:editinfo", editInfoMap = {}, showEditInfoMarkers = configOption(viewOptions.editInfoMarkersInitiallyVisible, true), showCaretAvatars = configOption(viewOptions.caretAvatarsInitiallyVisible, true), blinkOnRangeSelect = configOption(viewOptions.caretBlinksOnRangeSelect, true), rerenderIntervalId, rerenderSelectionViews = false, RERENDER_INTERVAL = 200;
    function createAvatarInfoNodeMatch(nodeName, memberId, pseudoClass) {
      return nodeName + '[editinfo|memberid="' + memberId + '"]' + pseudoClass
    }
    function getAvatarInfoStyle(nodeName, memberId, pseudoClass) {
      var node = avatarInfoStyles.firstChild, nodeMatch = createAvatarInfoNodeMatch(nodeName, memberId, pseudoClass) + "{";
      while(node) {
        if(node.nodeType === Node.TEXT_NODE && node.data.indexOf(nodeMatch) === 0) {
          return node
        }
        node = node.nextSibling
      }
      return null
    }
    function setAvatarInfoStyle(memberId, name, color) {
      function setStyle(nodeName, rule, pseudoClass) {
        var styleRule = createAvatarInfoNodeMatch(nodeName, memberId, pseudoClass) + rule, styleNode = getAvatarInfoStyle(nodeName, memberId, pseudoClass);
        if(styleNode) {
          styleNode.data = styleRule
        }else {
          avatarInfoStyles.appendChild(document.createTextNode(styleRule))
        }
      }
      setStyle("div.editInfoMarker", "{ background-color: " + color + "; }", "");
      setStyle("span.editInfoColor", "{ background-color: " + color + "; }", "");
      setStyle("span.editInfoAuthor", '{ content: "' + name + '"; }', ":before");
      setStyle("dc|creator", "{ background-color: " + color + "; }", "");
      setStyle("div.selectionOverlay", "{ background-color: " + color + ";}", "")
    }
    function highlightEdit(element, memberId, timestamp) {
      var editInfo, editInfoMarker, id = "", editInfoNode = element.getElementsByTagNameNS(editInfons, "editinfo")[0];
      if(editInfoNode) {
        id = editInfoNode.getAttributeNS(editInfons, "id");
        editInfoMarker = editInfoMap[id]
      }else {
        id = Math.random().toString();
        editInfo = new ops.EditInfo(element, session.getOdtDocument());
        editInfoMarker = new gui.EditInfoMarker(editInfo, showEditInfoMarkers);
        editInfoNode = element.getElementsByTagNameNS(editInfons, "editinfo")[0];
        editInfoNode.setAttributeNS(editInfons, "id", id);
        editInfoMap[id] = editInfoMarker
      }
      editInfoMarker.addEdit(memberId, new Date(timestamp))
    }
    function setEditInfoMarkerVisibility(visible) {
      var editInfoMarker, keyname;
      for(keyname in editInfoMap) {
        if(editInfoMap.hasOwnProperty(keyname)) {
          editInfoMarker = editInfoMap[keyname];
          if(visible) {
            editInfoMarker.show()
          }else {
            editInfoMarker.hide()
          }
        }
      }
    }
    function setCaretAvatarVisibility(visible) {
      caretManager.getCarets().forEach(function(caret) {
        if(visible) {
          caret.showHandle()
        }else {
          caret.hideHandle()
        }
      })
    }
    this.showEditInfoMarkers = function() {
      if(showEditInfoMarkers) {
        return
      }
      showEditInfoMarkers = true;
      setEditInfoMarkerVisibility(showEditInfoMarkers)
    };
    this.hideEditInfoMarkers = function() {
      if(!showEditInfoMarkers) {
        return
      }
      showEditInfoMarkers = false;
      setEditInfoMarkerVisibility(showEditInfoMarkers)
    };
    this.showCaretAvatars = function() {
      if(showCaretAvatars) {
        return
      }
      showCaretAvatars = true;
      setCaretAvatarVisibility(showCaretAvatars)
    };
    this.hideCaretAvatars = function() {
      if(!showCaretAvatars) {
        return
      }
      showCaretAvatars = false;
      setCaretAvatarVisibility(showCaretAvatars)
    };
    this.getSession = function() {
      return session
    };
    this.getCaret = function(memberid) {
      return caretManager.getCaret(memberid)
    };
    function renderMemberData(member) {
      var memberId = member.getMemberId(), properties = member.getProperties();
      setAvatarInfoStyle(memberId, properties.fullName, properties.color);
      if(localMemberId === memberId) {
        setAvatarInfoStyle("", "", properties.color)
      }
    }
    function onCursorAdded(cursor) {
      var memberId = cursor.getMemberId(), properties = session.getOdtDocument().getMember(memberId).getProperties(), caret;
      caretManager.registerCursor(cursor, showCaretAvatars, blinkOnRangeSelect);
      selectionViewManager.registerCursor(cursor, true);
      caret = caretManager.getCaret(memberId);
      if(caret) {
        caret.setAvatarImageUrl(properties.imageUrl);
        caret.setColor(properties.color)
      }
      runtime.log("+++ View here +++ eagerly created an Caret for '" + memberId + "'! +++")
    }
    function onCursorMoved(cursor) {
      var memberId = cursor.getMemberId(), localSelectionView = selectionViewManager.getSelectionView(localMemberId), shadowSelectionView = selectionViewManager.getSelectionView(gui.ShadowCursor.ShadowCursorMemberId), localCaret = caretManager.getCaret(localMemberId);
      if(memberId === localMemberId) {
        shadowSelectionView.hide();
        if(localSelectionView) {
          localSelectionView.show()
        }
        if(localCaret) {
          localCaret.show()
        }
      }else {
        if(memberId === gui.ShadowCursor.ShadowCursorMemberId) {
          shadowSelectionView.show();
          if(localSelectionView) {
            localSelectionView.hide()
          }
          if(localCaret) {
            localCaret.hide()
          }
        }
      }
    }
    function onCursorRemoved(memberid) {
      selectionViewManager.removeSelectionView(memberid)
    }
    function onParagraphChanged(info) {
      highlightEdit(info.paragraphElement, info.memberId, info.timeStamp)
    }
    function requestRerenderOfSelectionViews() {
      rerenderSelectionViews = true
    }
    function startRerenderLoop() {
      rerenderIntervalId = runtime.getWindow().setInterval(function() {
        if(rerenderSelectionViews) {
          selectionViewManager.rerenderSelectionViews();
          rerenderSelectionViews = false
        }
      }, RERENDER_INTERVAL)
    }
    function stopRerenderLoop() {
      runtime.getWindow().clearInterval(rerenderIntervalId)
    }
    this.destroy = function(callback) {
      var odtDocument = session.getOdtDocument(), editInfoArray = Object.keys(editInfoMap).map(function(keyname) {
        return editInfoMap[keyname]
      });
      odtDocument.unsubscribe(ops.OdtDocument.signalMemberAdded, renderMemberData);
      odtDocument.unsubscribe(ops.OdtDocument.signalMemberUpdated, renderMemberData);
      odtDocument.unsubscribe(ops.OdtDocument.signalCursorAdded, onCursorAdded);
      odtDocument.unsubscribe(ops.OdtDocument.signalCursorRemoved, onCursorRemoved);
      odtDocument.unsubscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
      odtDocument.unsubscribe(ops.OdtDocument.signalCursorMoved, onCursorMoved);
      odtDocument.unsubscribe(ops.OdtDocument.signalParagraphChanged, requestRerenderOfSelectionViews);
      odtDocument.unsubscribe(ops.OdtDocument.signalTableAdded, requestRerenderOfSelectionViews);
      odtDocument.unsubscribe(ops.OdtDocument.signalParagraphStyleModified, requestRerenderOfSelectionViews);
      stopRerenderLoop();
      avatarInfoStyles.parentNode.removeChild(avatarInfoStyles);
      (function destroyEditInfo(i, err) {
        if(err) {
          callback(err)
        }else {
          if(i < editInfoArray.length) {
            editInfoArray[i].destroy(function(err) {
              destroyEditInfo(i + 1, err)
            })
          }else {
            callback()
          }
        }
      })(0, undefined)
    };
    function init() {
      var odtDocument = session.getOdtDocument(), head = document.getElementsByTagName("head")[0];
      odtDocument.subscribe(ops.OdtDocument.signalMemberAdded, renderMemberData);
      odtDocument.subscribe(ops.OdtDocument.signalMemberUpdated, renderMemberData);
      odtDocument.subscribe(ops.OdtDocument.signalCursorAdded, onCursorAdded);
      odtDocument.subscribe(ops.OdtDocument.signalCursorRemoved, onCursorRemoved);
      odtDocument.subscribe(ops.OdtDocument.signalParagraphChanged, onParagraphChanged);
      odtDocument.subscribe(ops.OdtDocument.signalCursorMoved, onCursorMoved);
      startRerenderLoop();
      odtDocument.subscribe(ops.OdtDocument.signalParagraphChanged, requestRerenderOfSelectionViews);
      odtDocument.subscribe(ops.OdtDocument.signalTableAdded, requestRerenderOfSelectionViews);
      odtDocument.subscribe(ops.OdtDocument.signalParagraphStyleModified, requestRerenderOfSelectionViews);
      avatarInfoStyles = document.createElementNS(head.namespaceURI, "style");
      avatarInfoStyles.type = "text/css";
      avatarInfoStyles.media = "screen, print, handheld, projection";
      avatarInfoStyles.appendChild(document.createTextNode("@namespace editinfo url(urn:webodf:names:editinfo);"));
      avatarInfoStyles.appendChild(document.createTextNode("@namespace dc url(http://purl.org/dc/elements/1.1/);"));
      head.appendChild(avatarInfoStyles)
    }
    init()
  }
  return SessionView
}();
var webodf_css = "@namespace draw url(urn:oasis:names:tc:opendocument:xmlns:drawing:1.0);\n@namespace fo url(urn:oasis:names:tc:opendocument:xmlns:xsl-fo-compatible:1.0);\n@namespace office url(urn:oasis:names:tc:opendocument:xmlns:office:1.0);\n@namespace presentation url(urn:oasis:names:tc:opendocument:xmlns:presentation:1.0);\n@namespace style url(urn:oasis:names:tc:opendocument:xmlns:style:1.0);\n@namespace svg url(urn:oasis:names:tc:opendocument:xmlns:svg-compatible:1.0);\n@namespace table url(urn:oasis:names:tc:opendocument:xmlns:table:1.0);\n@namespace text url(urn:oasis:names:tc:opendocument:xmlns:text:1.0);\n@namespace webodfhelper url(urn:webodf:names:helper);\n@namespace cursor url(urn:webodf:names:cursor);\n@namespace editinfo url(urn:webodf:names:editinfo);\n@namespace annotation url(urn:webodf:names:annotation);\n@namespace dc url(http://purl.org/dc/elements/1.1/);\n\noffice|document > *, office|document-content > * {\n  display: none;\n}\noffice|body, office|document {\n  display: inline-block;\n  position: relative;\n}\n\ntext|p, text|h {\n  display: block;\n  padding: 0;\n  margin: 0;\n  line-height: normal;\n  position: relative;\n  min-height: 1.3em; /* prevent empty paragraphs and headings from collapsing if they are empty */\n}\n*[webodfhelper|containsparagraphanchor] {\n  position: relative;\n}\ntext|s {\n    white-space: pre;\n}\ntext|tab {\n  display: inline;\n  white-space: pre;\n}\ntext|tracked-changes {\n  /*Consumers that do not support change tracking, should ignore changes.*/\n  display: none;\n}\noffice|binary-data {\n  display: none;\n}\noffice|text {\n  display: block;\n  text-align: left;\n  overflow: visible;\n  word-wrap: break-word;\n}\n\noffice|text::selection {\n  /** Let's not draw selection highlight that overflows into the office|text\n   * node when selecting content across several paragraphs\n   */\n  background: transparent;\n}\n\n.virtualSelections office|document *::selection {\n  background: transparent;\n}\n.virtualSelections office|document *::-moz-selection {\n  background: transparent;\n}\n\noffice|text * draw|text-box {\n/** only for text documents */\n    display: block;\n    border: 1px solid #d3d3d3;\n}\noffice|spreadsheet {\n  display: block;\n  border-collapse: collapse;\n  empty-cells: show;\n  font-family: sans-serif;\n  font-size: 10pt;\n  text-align: left;\n  page-break-inside: avoid;\n  overflow: hidden;\n}\noffice|presentation {\n  display: inline-block;\n  text-align: left;\n}\n#shadowContent {\n  display: inline-block;\n  text-align: left;\n}\ndraw|page {\n  display: block;\n  position: relative;\n  overflow: hidden;\n}\npresentation|notes, presentation|footer-decl, presentation|date-time-decl {\n    display: none;\n}\n@media print {\n  draw|page {\n    border: 1pt solid black;\n    page-break-inside: avoid;\n  }\n  presentation|notes {\n    /*TODO*/\n  }\n}\noffice|spreadsheet text|p {\n  border: 0px;\n  padding: 1px;\n  margin: 0px;\n}\noffice|spreadsheet table|table {\n  margin: 3px;\n}\noffice|spreadsheet table|table:after {\n  /* show sheet name the end of the sheet */\n  /*content: attr(table|name);*/ /* gives parsing error in opera */\n}\noffice|spreadsheet table|table-row {\n  counter-increment: row;\n}\noffice|spreadsheet table|table-row:before {\n  width: 3em;\n  background: #cccccc;\n  border: 1px solid black;\n  text-align: center;\n  content: counter(row);\n  display: table-cell;\n}\noffice|spreadsheet table|table-cell {\n  border: 1px solid #cccccc;\n}\ntable|table {\n  display: table;\n}\ndraw|frame table|table {\n  width: 100%;\n  height: 100%;\n  background: white;\n}\ntable|table-header-rows {\n  display: table-header-group;\n}\ntable|table-row {\n  display: table-row;\n}\ntable|table-column {\n  display: table-column;\n}\ntable|table-cell {\n  width: 0.889in;\n  display: table-cell;\n  word-break: break-all; /* prevent long words from extending out the table cell */\n}\ndraw|frame {\n  display: block;\n}\ndraw|image {\n  display: block;\n  width: 100%;\n  height: 100%;\n  top: 0px;\n  left: 0px;\n  background-repeat: no-repeat;\n  background-size: 100% 100%;\n  -moz-background-size: 100% 100%;\n}\n/* only show the first image in frame */\ndraw|frame > draw|image:nth-of-type(n+2) {\n  display: none;\n}\ntext|list:before {\n    display: none;\n    content:\"\";\n}\ntext|list {\n    counter-reset: list;\n}\ntext|list-item {\n    display: block;\n}\ntext|number {\n    display:none;\n}\n\ntext|a {\n    color: blue;\n    text-decoration: underline;\n    cursor: pointer;\n}\ntext|note-citation {\n    vertical-align: super;\n    font-size: smaller;\n}\ntext|note-body {\n    display: none;\n}\ntext|note:hover text|note-citation {\n    background: #dddddd;\n}\ntext|note:hover text|note-body {\n    display: block;\n    left:1em;\n    max-width: 80%;\n    position: absolute;\n    background: #ffffaa;\n}\nsvg|title, svg|desc {\n    display: none;\n}\nvideo {\n    width: 100%;\n    height: 100%\n}\n\n/* below set up the cursor */\ncursor|cursor {\n    display: inline;\n    width: 0px;\n    height: 1em;\n    /* making the position relative enables the avatar to use\n       the cursor as reference for its absolute position */\n    position: relative;\n    z-index: 1;\n}\ncursor|cursor > span {\n    /* IMPORTANT: when changing these values ensure DEFAULT_CARET_TOP and DEFAULT_CARET_HEIGHT\n        in Caret.js remain in sync */\n    display: inline;\n    position: absolute;\n    top: 5%; /* push down the caret; 0px can do the job, 5% looks better, 10% is a bit over */\n    height: 1em;\n    border-left: 2px solid black;\n    outline: none;\n}\n\ncursor|cursor > div {\n    padding: 3px;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    border: none !important;\n    border-radius: 5px;\n    opacity: 0.3;\n}\n\ncursor|cursor > div > img {\n    border-radius: 5px;\n}\n\ncursor|cursor > div.active {\n    opacity: 0.8;\n}\n\ncursor|cursor > div:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 43%;\n}\n\n\n.editInfoMarker {\n    position: absolute;\n    width: 10px;\n    height: 100%;\n    left: -20px;\n    opacity: 0.8;\n    top: 0;\n    border-radius: 5px;\n    background-color: transparent;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n}\n.editInfoMarker:hover {\n    box-shadow: 0px 0px 8px rgba(0, 0, 0, 1);\n}\n\n.editInfoHandle {\n    position: absolute;\n    background-color: black;\n    padding: 5px;\n    border-radius: 5px;\n    opacity: 0.8;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    bottom: 100%;\n    margin-bottom: 10px;\n    z-index: 3;\n    left: -25px;\n}\n.editInfoHandle:after {\n    content: ' ';\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: black transparent transparent transparent;\n\n    top: 100%;\n    left: 5px;\n}\n.editInfo {\n    font-family: sans-serif;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    color: white;\n    width: 100%;\n    height: 12pt;\n}\n.editInfoColor {\n    float: left;\n    width: 10pt;\n    height: 10pt;\n    border: 1px solid white;\n}\n.editInfoAuthor {\n    float: left;\n    margin-left: 5pt;\n    font-size: 10pt;\n    text-align: left;\n    height: 12pt;\n    line-height: 12pt;\n}\n.editInfoTime {\n    float: right;\n    margin-left: 30pt;\n    font-size: 8pt;\n    font-style: italic;\n    color: yellow;\n    height: 12pt;\n    line-height: 12pt;\n}\n\n.annotationWrapper {\n    display: inline;\n    position: relative;\n}\n\n.annotationRemoveButton:before {\n    content: '\u00d7';\n    color: white;\n    padding: 5px;\n    line-height: 1em;\n}\n\n.annotationRemoveButton {\n    width: 20px;\n    height: 20px;\n    border-radius: 10px;\n    background-color: black;\n    box-shadow: 0px 0px 5px rgba(50, 50, 50, 0.75);\n    position: absolute;\n    top: -10px;\n    left: -10px;\n    z-index: 3;\n    text-align: center;\n    font-family: sans-serif;\n    font-style: normal;\n    font-weight: normal;\n    text-decoration: none;\n    font-size: 15px;\n}\n.annotationRemoveButton:hover {\n    cursor: pointer;\n    box-shadow: 0px 0px 5px rgba(0, 0, 0, 1);\n}\n\n.annotationNote {\n    width: 4cm;\n    position: absolute;\n    display: inline;\n    z-index: 10;\n}\n.annotationNote > office|annotation {\n    display: block;\n    text-align: left;\n}\n\n.annotationConnector {\n    position: absolute;\n    display: inline;\n    z-index: 2;\n    border-top: 1px dashed brown;\n}\n.annotationConnector.angular {\n    -moz-transform-origin: left top;\n    -webkit-transform-origin: left top;\n    -ms-transform-origin: left top;\n    transform-origin: left top;\n}\n.annotationConnector.horizontal {\n    left: 0;\n}\n.annotationConnector.horizontal:before {\n    content: '';\n    display: inline;\n    position: absolute;\n    width: 0px;\n    height: 0px;\n    border-style: solid;\n    border-width: 8.7px 5px 0 5px;\n    border-color: brown transparent transparent transparent;\n    top: -1px;\n    left: -5px;\n}\n\noffice|annotation {\n    width: 100%;\n    height: 100%;\n    display: none;\n    background: rgb(198, 238, 184);\n    background: -moz-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -webkit-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -o-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: -ms-linear-gradient(90deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    background: linear-gradient(180deg, rgb(198, 238, 184) 30%, rgb(180, 196, 159) 100%);\n    box-shadow: 0 3px 4px -3px #ccc;\n}\n\noffice|annotation > dc|creator {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    color: white;\n    background-color: brown;\n    padding: 4px;\n}\noffice|annotation > dc|date {\n    display: block;\n    font-size: 10pt;\n    font-weight: normal;\n    font-style: normal;\n    font-family: sans-serif;\n    border: 4px solid transparent;\n}\noffice|annotation > text|list {\n    display: block;\n    padding: 5px;\n}\n\n/* This is very temporary CSS. This must go once\n * we start bundling webodf-default ODF styles for annotations.\n */\noffice|annotation text|p {\n    font-size: 10pt;\n    color: black;\n    font-weight: normal;\n    font-style: normal;\n    text-decoration: none;\n    font-family: sans-serif;\n}\n\ndc|*::selection {\n    background: transparent;\n}\ndc|*::-moz-selection {\n    background: transparent;\n}\n\n#annotationsPane {\n    background-color: #EAEAEA;\n    width: 4cm;\n    height: 100%;\n    display: none;\n    position: absolute;\n    outline: 1px solid #ccc;\n}\n\n.annotationHighlight {\n    background-color: yellow;\n    position: relative;\n}\n\n.selectionOverlay {\n    position: absolute;\n    z-index: 15;\n    opacity: 0.2;\n    pointer-events: none;\n    top: 0;\n    left: 0;\n    width: 0;\n    height: 0;\n}\n\n#imageSelector {\n    display: none;\n    position: absolute;\n    border-style: solid;\n    border-color: black;\n}\n\n#imageSelector > div {\n    width: 5px;\n    height: 5px;\n    display: block;\n    position: absolute;\n    border: 1px solid black;\n    background-color: #ffffff;\n}\n\n#imageSelector > .topLeft {\n    top: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topRight {\n    top: -4px;\n    right: -4px;\n}\n\n#imageSelector > .bottomRight {\n    right: -4px;\n    bottom: -4px;\n}\n\n#imageSelector > .bottomLeft {\n    bottom: -4px;\n    left: -4px;\n}\n\n#imageSelector > .topMiddle {\n    top: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .rightMiddle {\n    top: 50%;\n    right: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n\n#imageSelector > .bottomMiddle {\n    bottom: -4px;\n    left: 50%;\n    margin-left: -2.5px; /* half of the width defined in #imageSelector > div */\n}\n\n#imageSelector > .leftMiddle {\n    top: 50%;\n    left: -4px;\n    margin-top: -2.5px; /* half of the height defined in #imageSelector > div */\n}\n";

